import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
const ROLLUP_KEYS = ['Rss', 'Anonymous', 'Shared_Clean', 'Shared_Dirty', 'Private_Dirty'];
const HEADER = /^([0-9a-f]+)-([0-9a-f]+) (\S+) (\S+) (\S+) (\S+)\s*(.*)$/;
const SMAPS_FIELD = { Size: 'sizeKb', Rss: 'rssKb', Anonymous: 'anonKb', Private_Dirty: 'pdKb' };
const TOP = 20;
const PASSES = 3;
const KB = 1024;
const toBytes = (kb) => kb * KB;
const sumBy = (arr, f) => arr.reduce((s, m) => s + f(m), 0);
const diff = (a, b) => (b === null ? null : a - b);
export const parseRollup = (txt) => { const o = {}; for (const k of ROLLUP_KEYS) { const m = txt.match(new RegExp('^' + k + ':\\s+(\\d+) kB', 'm')); o[k] = m ? toBytes(Number(m[1])) : null; } return o; };
export const parseSmaps = (txt) => {
  const maps = [];
  let cur = null;
  for (const line of txt.split('\n')) {
    const h = line.match(HEADER);
    if (h) { cur = { key: h[1] + '-' + h[2], startN: BigInt('0x' + h[1]), endN: BigInt('0x' + h[2]), start: h[1], end: h[2], perms: h[3], inode: h[6], path: h[7].trim() || '[anon]', sizeKb: 0, rssKb: 0, anonKb: 0, pdKb: 0 }; maps.push(cur); continue; }
    const f = cur && line.match(/^(Size|Rss|Anonymous|Private_Dirty):\s+(\d+) kB/);
    if (f) cur[SMAPS_FIELD[f[1]]] = Number(f[2]);
  }
  return maps;
};
const dedupe = (maps) => { const byKey = new Map(); for (const m of maps) if (!byKey.has(m.key)) byKey.set(m.key, m); return [...byKey.values()]; };
const byStartEnd = (a, b) => (a.startN !== b.startN ? (a.startN < b.startN ? -1 : 1) : a.endN < b.endN ? -1 : a.endN > b.endN ? 1 : 0);
const outOfOrderCount = (maps) => maps.reduce((n, m, i) => (i > 0 && m.startN < maps[i - 1].startN ? n + 1 : n), 0);
export const stableRollup = (a, b) => a.Rss === b.Rss && a.Anonymous === b.Anonymous;
export const takeSnapshot = (read, passes = PASSES) => {
  let pass = null;
  let attempts = 0;
  while (attempts < passes) {
    attempts += 1;
    const before = parseRollup(read('smaps_rollup'));
    const raw = parseSmaps(read('smaps'));
    const after = parseRollup(read('smaps_rollup'));
    pass = { before, after, raw };
    if (stableRollup(before, after)) break;
  }
  const stable = stableRollup(pass.before, pass.after);
  const uniq = dedupe(pass.raw).sort(byStartEnd);
  const accounted = [];
  const overlaps = [];
  let maxEnd = null;
  for (const m of uniq) {
    if (maxEnd !== null && m.startN < maxEnd) { overlaps.push(m); continue; }
    accounted.push(m);
    if (maxEnd === null || m.endN > maxEnd) maxEnd = m.endN;
  }
  return { accounted, overlaps, uniq, duplicates: pass.raw.length - uniq.length, outOfOrder: outOfOrderCount(pass.raw), rollup: pass.after, stable, attempts };
};
const isAnon = (m) => m.inode === '0';
const isShm = (m) => m.path.startsWith('/dev/shm/') || m.path.startsWith('/memfd:');
const top = (arr) => [...arr].sort((a, b) => b.rssKb - a.rssKb || b.sizeKb - a.sizeKb).slice(0, TOP).map((m) => ({ range: m.start + '-' + m.end, sizeBytes: toBytes(m.sizeKb), rssBytes: toBytes(m.rssKb), privateDirtyBytes: toBytes(m.pdKb), path: m.path }));
const groupTags = (arr) => {
  const g = new Map();
  for (const m of arr) {
    const e = g.get(m.path) || { tag: m.path, mappings: 0, rssKb: 0, pdKb: 0 };
    e.mappings += 1;
    e.rssKb += m.rssKb;
    e.pdKb += m.pdKb;
    g.set(m.path, e);
  }
  return [...g.values()].sort((a, b) => b.rssKb - a.rssKb || (a.tag < b.tag ? -1 : a.tag > b.tag ? 1 : 0)).map((e) => ({ tag: e.tag, mappings: e.mappings, rssBytes: toBytes(e.rssKb), privateDirtyBytes: toBytes(e.pdKb) }));
};
export const run = (procRoot, holderPid, shmDir) => {
  const out = { pid: Number(holderPid), error: null };
  try {
    const snap = takeSnapshot((name) => fs.readFileSync(procRoot + '/' + holderPid + '/' + name, 'utf8'));
    const rollup = snap.rollup;
    const maps = snap.accounted;
    const overlaps = snap.overlaps;
    const anon = maps.filter(isAnon);
    const file = maps.filter((m) => !isAnon(m));
    const anonRssBytes = toBytes(sumBy(anon, (m) => m.rssKb));
    const fileRssBytes = toBytes(sumBy(file, (m) => m.rssKb));
    const anonymousBytes = toBytes(sumBy(maps, (m) => m.anonKb));
    const rawAnonymousBytes = toBytes(sumBy(snap.uniq, (m) => m.anonKb));
    const overlapAnonymousBytes = toBytes(sumBy(overlaps, (m) => m.anonKb));
    const overlapRssBytes = toBytes(sumBy(overlaps, (m) => m.rssKb));
    const rawAnonRollupDiffBytes = diff(rawAnonymousBytes, rollup.Anonymous);
    const totals = {
      mappingCount: maps.length, duplicatesDropped: snap.duplicates, outOfOrder: snap.outOfOrder, overlaps: overlaps.length, overlapAnonymousBytes, overlapRssBytes, attempts: snap.attempts, stable: snap.stable,
      anonCount: anon.length, fileCount: file.length, anonRssBytes, fileRssBytes, anonymousBytes, rawAnonymousBytes,
      anonRollupDiffBytes: diff(anonymousBytes, rollup.Anonymous),
      rawAnonRollupDiffBytes,
      overlapExplainsExcess: rawAnonRollupDiffBytes !== null && rawAnonRollupDiffBytes === overlapAnonymousBytes,
      rssRollupDiffBytes: diff(anonRssBytes + fileRssBytes, rollup.Rss),
    };
    totals.consistent = snap.stable && totals.anonRollupDiffBytes === 0;
    const anonTags = groupTags(anon);
    totals.tagCount = anonTags.length;
    totals.tagRssDiffBytes = sumBy(anonTags, (g) => g.rssBytes) - anonRssBytes;
    const entries = fs.readdirSync(shmDir, { withFileTypes: true }).filter((d) => d.isFile()).map((d) => ({ name: d.name, sizeBytes: fs.statSync(shmDir + '/' + d.name).size })).sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
    const s = fs.statfsSync(shmDir);
    const shmDirInfo = { path: shmDir, totalBytes: s.blocks * s.bsize, freeBytes: s.bfree * s.bsize, usedBytes: (s.blocks - s.bfree) * s.bsize, entries: entries };
    const rendererShm = maps.filter(isShm).map((m) => ({ path: m.path, sizeBytes: toBytes(m.sizeKb), rssBytes: toBytes(m.rssKb) }));
    out.rollup = rollup;
    out.totals = totals;
    out.anonTags = anonTags;
    out.anonTop20 = top(anon);
    out.fileTop20 = top(file);
    out.overlapTop = overlaps.slice(0, TOP).map((m) => ({ range: m.start + '-' + m.end, sizeBytes: toBytes(m.sizeKb), rssBytes: toBytes(m.rssKb), anonBytes: toBytes(m.anonKb), path: m.path }));
    out.shmDir = shmDirInfo;
    out.rendererShm = rendererShm;
  } catch (e) {
    out.error = String(e.message).slice(0, 200);
  }
  return out;
};
const isMain = process.argv[1] !== undefined && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  const [procRoot, holderPid, shmDir] = process.argv.slice(2);
  console.log('HOLDER_PROC ' + JSON.stringify(run(procRoot, holderPid, shmDir)));
}
