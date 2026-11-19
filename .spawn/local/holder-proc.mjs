import fs from 'node:fs';
const [procRoot, holderPid, shmDir] = process.argv.slice(2);
const ROLLUP_KEYS = ['Rss', 'Anonymous', 'Shared_Clean', 'Shared_Dirty', 'Private_Dirty'];
const HEADER = /^([0-9a-f]+)-([0-9a-f]+) (\S+) (\S+) (\S+) (\S+)\s*(.*)$/;
const TOP = 20;
const KB = 1024;
const toBytes = (kb) => kb * KB;
const sumBy = (arr, f) => arr.reduce((s, m) => s + f(m), 0);
const parseRollup = (txt) => { const o = {}; for (const k of ROLLUP_KEYS) { const m = txt.match(new RegExp('^' + k + ':\\s+(\\d+) kB', 'm')); o[k] = m ? toBytes(Number(m[1])) : null; } return o; };
const parseSmaps = (txt) => {
  const maps = [];
  let cur = null;
  for (const line of txt.split('\n')) {
    const h = line.match(HEADER);
    if (h) { cur = { start: h[1], end: h[2], perms: h[3], inode: h[6], path: h[7].trim() || '[anon]', sizeKb: 0, rssKb: 0, anonKb: 0 }; maps.push(cur); continue; }
    const f = cur && line.match(/^(Size|Rss|Anonymous):\s+(\d+) kB/);
    if (f) { const v = Number(f[2]); if (f[1] === 'Size') cur.sizeKb = v; else if (f[1] === 'Rss') cur.rssKb = v; else cur.anonKb = v; }
  }
  return maps;
};
const isAnon = (m) => m.inode === '0';
const isShm = (m) => m.path.startsWith('/dev/shm/') || m.path.startsWith('/memfd:');
const top = (arr) => [...arr].sort((a, b) => b.rssKb - a.rssKb || b.sizeKb - a.sizeKb).slice(0, TOP).map((m) => ({ range: m.start + '-' + m.end, sizeBytes: toBytes(m.sizeKb), rssBytes: toBytes(m.rssKb), path: m.path }));
const out = { pid: Number(holderPid), error: null };
try {
  const rollup = parseRollup(fs.readFileSync(procRoot + '/' + holderPid + '/smaps_rollup', 'utf8'));
  const maps = parseSmaps(fs.readFileSync(procRoot + '/' + holderPid + '/smaps', 'utf8'));
  const anon = maps.filter(isAnon);
  const file = maps.filter((m) => !isAnon(m));
  const totals = {
    mappingCount: maps.length, anonCount: anon.length, fileCount: file.length,
    anonRssBytes: toBytes(sumBy(anon, (m) => m.rssKb)), fileRssBytes: toBytes(sumBy(file, (m) => m.rssKb)),
    anonymousBytes: toBytes(sumBy(maps, (m) => m.anonKb)),
  };
  const entries = fs.readdirSync(shmDir, { withFileTypes: true }).filter((d) => d.isFile()).map((d) => ({ name: d.name, sizeBytes: fs.statSync(shmDir + '/' + d.name).size })).sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
  const s = fs.statfsSync(shmDir);
  const shmDirInfo = { path: shmDir, totalBytes: s.blocks * s.bsize, freeBytes: s.bfree * s.bsize, usedBytes: (s.blocks - s.bfree) * s.bsize, entries: entries };
  const rendererShm = maps.filter(isShm).map((m) => ({ path: m.path, sizeBytes: toBytes(m.sizeKb), rssBytes: toBytes(m.rssKb) }));
  out.rollup = rollup;
  out.totals = totals;
  out.anonTop20 = top(anon);
  out.fileTop20 = top(file);
  out.shmDir = shmDirInfo;
  out.rendererShm = rendererShm;
} catch (e) {
  out.error = String(e.message).slice(0, 200);
}
console.log('HOLDER_PROC ' + JSON.stringify(out));
