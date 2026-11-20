import fs from 'node:fs';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
const readerPath = process.argv[2] || '/workspace/signal/world/signal-stage/.spawn/local/holder-proc.mjs';
const KB = 1024;
const MB = 1024 * KB;
const base = '/tmp/verify/proc-fixture-' + Date.now();
const procRoot = base + '/proc';
const shmA = base + '/shm';
const shmB = base + '/shm-empty';
fs.mkdirSync(shmA, { recursive: true });
fs.mkdirSync(shmB, { recursive: true });
fs.writeFileSync(shmA + '/gpu-0', Buffer.alloc(4096));
fs.writeFileSync(shmA + '/gpu-1', Buffer.alloc(8192));
const smapsText = (maps) => {
  let smaps = '';
  for (const m of maps) {
    const start = m.base.toString(16).padStart(12, '0');
    const end = (m.base + m.sizeKb * KB).toString(16).padStart(12, '0');
    smaps += start + '-' + end + ' ' + m.perms + ' 00000000 00:00 ' + m.inode + ' ' + m.path + '\n';
    smaps += 'Size: ' + m.sizeKb + ' kB\nKernelPageSize: 4 kB\nRss: ' + m.rssKb + ' kB\nAnonymous: ' + m.anonKb + ' kB\nPrivate_Dirty: ' + (m.pdKb ?? 0) + ' kB\nVmFlags: rd wr mr mw me ac\n';
  }
  return smaps;
};
const rollupText = (roll, sumRss, sumAnon) => '00400000-7fff00000000 ---p 00000000 00:00 0 [rollup]\nRss: ' + sumRss + ' kB\nShared_Clean: ' + roll.sc + ' kB\nShared_Dirty: ' + roll.sd + ' kB\nPrivate_Clean: 0 kB\nPrivate_Dirty: ' + roll.pd + ' kB\nAnonymous: ' + sumAnon + ' kB\n';
const writeProc = (pid, maps, roll, rollupFrom = maps, extraAnonKb = 0) => {
  const dir = procRoot + '/' + pid;
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(dir + '/smaps', smapsText(maps));
  const sumRss = rollupFrom.reduce((s, m) => s + m.rssKb, 0);
  const sumAnon = rollupFrom.reduce((s, m) => s + m.anonKb, 0) + extraAnonKb;
  fs.writeFileSync(dir + '/smaps_rollup', rollupText(roll, sumRss, sumAnon));
  return { sumRss, sumAnon };
};
const fixture1 = [];
for (let i = 0; i < 25; i += 1) fixture1.push({ base: 0x10000000 + i * 0x1000000, sizeKb: (i + 1) * 16, rssKb: Math.floor(((i + 1) * 16) / 2), anonKb: Math.floor(((i + 1) * 16) / 2), inode: '0', path: i % 3 === 0 ? '[heap]' : '', perms: 'rw-p' });
for (let j = 0; j < 25; j += 1) fixture1.push({ base: 0x70000000 + j * 0x1000000, sizeKb: (j + 1) * 32, rssKb: Math.floor(((j + 1) * 32) / 4), anonKb: j === 0 ? 4 : 0, inode: '12345', path: j >= 23 ? '/dev/shm/gpu-' + (j - 23) : '/usr/lib/lib' + j + '.so', perms: 'r--p' });
const fixture2 = [
  { base: 0x200000000000, sizeKb: 512 * 1024, rssKb: 0, anonKb: 0, inode: '0', path: '[anon:v8-sandbox]', perms: 'rw-p' },
  { base: 0x300000000000, sizeKb: 64 * 1024, rssKb: 40 * 1024, anonKb: 40 * 1024, inode: '0', path: '[anon:partition_alloc]', perms: 'rw-p' },
  { base: 0x400000000000, sizeKb: 128 * 1024, rssKb: 1024, anonKb: 1024, inode: '0', path: '[anon:v8]', perms: 'rw-p' },
  { base: 0x500000000000, sizeKb: 257 * 1024, rssKb: 98 * 1024, anonKb: 0, inode: '77', path: '/usr/lib/chromium/chromium.real', perms: 'r-xp' },
  { base: 0x600000000000, sizeKb: 1024, rssKb: 0, anonKb: 0, inode: '77', path: '/usr/lib/locale/x.pak', perms: 'r--p' },
];
const fixture3raw = [...fixture1.slice().reverse(), ...fixture1.slice(0, 5)];
const truth5 = { base: 0x700000000000, sizeKb: 1048576, rssKb: 307200, anonKb: 307200, pdKb: 307200, inode: '0', path: '[anon:partition_alloc]', perms: 'rw-p' };
const stale5 = { base: 0x700000000000, sizeKb: 1258291, rssKb: 654336, anonKb: 654336, pdKb: 654336, inode: '0', path: '[anon:partition_alloc]', perms: 'rw-p' };
const fixture6 = [
  { base: 0x800000000000, sizeKb: 262144, rssKb: 204800, anonKb: 204800, pdKb: 204800, inode: '0', path: '[anon:v8]', perms: 'rw-p' },
  { base: 0x810000000000, sizeKb: 131072, rssKb: 51200, anonKb: 51200, pdKb: 51200, inode: '0', path: '[anon:v8]', perms: 'rw-p' },
  { base: 0x820000000000, sizeKb: 65536, rssKb: 40960, anonKb: 40960, pdKb: 30720, inode: '0', path: '[anon:partition_alloc]', perms: 'rw-p' },
  { base: 0x830000000000, sizeKb: 32768, rssKb: 10240, anonKb: 10240, pdKb: 10240, inode: '0', path: '[anon:v8-sandbox]', perms: 'rw-p' },
  { base: 0x840000000000, sizeKb: 4096, rssKb: 0, anonKb: 0, pdKb: 0, inode: '0', path: '[heap]', perms: 'rw-p' },
  { base: 0x850000000000, sizeKb: 1024, rssKb: 512, anonKb: 512, pdKb: 512, inode: '0', path: '', perms: 'rw-p' },
  { base: 0x860000000000, sizeKb: 2048, rssKb: 1024, anonKb: 0, pdKb: 0, inode: '77', path: '/usr/lib/x.so', perms: 'r-xp' },
];
const roll1 = { sc: 1000, sd: 200, pd: 900 };
const f1 = writeProc(4242, fixture1, roll1);
const f2 = writeProc(5151, fixture2, { sc: 0, sd: 0, pd: 0 });
const f3 = writeProc(6161, fixture3raw, roll1, fixture1);
const f4 = writeProc(7171, fixture1, roll1, fixture1, 2048);
const f5 = writeProc(8181, [truth5, stale5], { sc: 0, sd: 0, pd: 0 }, [truth5]);
const f6 = writeProc(9191, fixture6, roll1);
const run = (pid, shm) => {
  const rr = spawnSync('node', [readerPath, procRoot, String(pid), shm], { encoding: 'utf8' });
  const line = (rr.stdout || '').split('\n').find((l) => l.startsWith('HOLDER_PROC '));
  let h = null;
  try { h = line ? JSON.parse(line.slice('HOLDER_PROC '.length)) : null; } catch { h = null; }
  return { status: rr.status, h };
};
const checks = [];
const check = (name, ok, got) => checks.push({ name, ok: Boolean(ok), got: String(JSON.stringify(got) ?? 'absent').slice(0, 160) });
const nonIncreasing = (arr, key) => Array.isArray(arr) && arr.every((x, i, a) => i === 0 || a[i - 1][key] >= x[key]);
const allNumeric = (arr, key) => Array.isArray(arr) && arr.every((x) => typeof x[key] === 'number');
const uniqueRanges = (arr) => Array.isArray(arr) && new Set(arr.map((x) => x.range)).size === arr.length;
const expAnon1 = fixture1.filter((m) => m.inode === '0').reduce((s, m) => s + m.rssKb, 0) * KB;
const expFile1 = fixture1.filter((m) => m.inode !== '0').reduce((s, m) => s + m.rssKb, 0) * KB;
const mod = await import(pathToFileURL(readerPath).href);
const oneMap = [{ base: 0x900000000000, sizeKb: 1024, rssKb: 512, anonKb: 512, pdKb: 512, inode: '0', path: '[anon:v8]', perms: 'rw-p' }];
const smapsOne = smapsText(oneMap);
let rc = 0;
const seqA = [[100, 50], [101, 50], [101, 50], [101, 50]];
const readA = (name) => { if (name === 'smaps') return smapsOne; const v = seqA[Math.min(rc, seqA.length - 1)]; rc += 1; return rollupText({ sc: 0, sd: 0, pd: 0 }, v[0], v[1]); };
const snapA = mod.takeSnapshot(readA);
check('U1 rollup changed on the first pass: re-read, then stable (attempts 2, stable true)', snapA.attempts === 2 && snapA.stable === true && snapA.rollup.Rss === 101 * KB, { attempts: snapA.attempts, stable: snapA.stable });
let rcB = 0;
const seqB = [[1, 1], [2, 1], [2, 2], [3, 2], [3, 3], [4, 3]];
const readB = (name) => { if (name === 'smaps') return smapsOne; const v = seqB[Math.min(rcB, seqB.length - 1)]; rcB += 1; return rollupText({ sc: 0, sd: 0, pd: 0 }, v[0], v[1]); };
const snapB = mod.takeSnapshot(readB);
check('U2 rollup changes on every pass: 3 attempts, stable false', snapB.attempts === 3 && snapB.stable === false, { attempts: snapB.attempts, stable: snapB.stable });
const r1 = run(4242, shmA);
const h1 = r1.h;
check('F1 reader exit 0 and HOLDER_PROC line', r1.status === 0 && h1 !== null, r1.status);
check('F1 field pid present and equal', h1 && h1.pid === 4242, h1 && h1.pid);
check('F1 field error absent', h1 && (h1.error === null || h1.error === undefined), h1 && h1.error);
const ru1 = h1 && h1.rollup;
check('F1 rollup Rss equal', !!ru1 && ru1.Rss === f1.sumRss * KB, ru1 && ru1.Rss);
check('F1 rollup Anonymous equal', !!ru1 && ru1.Anonymous === f1.sumAnon * KB, ru1 && ru1.Anonymous);
check('F1 rollup Shared_Clean equal', !!ru1 && ru1.Shared_Clean === 1000 * KB, ru1 && ru1.Shared_Clean);
check('F1 rollup Shared_Dirty equal', !!ru1 && ru1.Shared_Dirty === 200 * KB, ru1 && ru1.Shared_Dirty);
check('F1 rollup Private_Dirty equal', !!ru1 && ru1.Private_Dirty === 900 * KB, ru1 && ru1.Private_Dirty);
const t1 = h1 && h1.totals;
check('F1 totals 50/25/25, no duplicates, no overlaps, stable, consistent in one attempt', !!t1 && t1.mappingCount === 50 && t1.anonCount === 25 && t1.fileCount === 25 && t1.duplicatesDropped === 0 && t1.overlaps === 0 && t1.stable === true && t1.consistent === true && t1.attempts === 1, t1);
check('F1 totals anonRssBytes and fileRssBytes', !!t1 && t1.anonRssBytes === expAnon1 && t1.fileRssBytes === expFile1, t1 && [t1.anonRssBytes, t1.fileRssBytes]);
check('F1 sum rule: anonRss + fileRss equals rollup Rss', !!t1 && !!ru1 && t1.anonRssBytes + t1.fileRssBytes === ru1.Rss, t1 && ru1 && [t1.anonRssBytes + t1.fileRssBytes, ru1.Rss]);
check('F1 anonymous sum equals rollup Anonymous, diff field is 0', !!t1 && !!ru1 && t1.anonymousBytes === ru1.Anonymous && t1.anonRollupDiffBytes === 0, t1 && [t1.anonymousBytes, t1.anonRollupDiffBytes]);
check('F1 tag groups: 2 tags and tag RSS sum equals anonRssBytes', !!t1 && t1.tagCount === 2 && t1.tagRssDiffBytes === 0, t1 && [t1.tagCount, t1.tagRssDiffBytes]);
const at1 = h1 && h1.anonTop20;
check('F1 anonTop20 has 20 entries, rss order, size and privateDirty present', Array.isArray(at1) && at1.length === 20 && nonIncreasing(at1, 'rssBytes') && allNumeric(at1, 'sizeBytes') && allNumeric(at1, 'privateDirtyBytes') && uniqueRanges(at1), at1 && at1.length);
check('F1 anonTop20 first is the 400 kB mapping (largest RSS)', !!at1 && at1[0].sizeBytes === 400 * KB && at1[0].rssBytes === 200 * KB, at1 && at1[0]);
const ft1 = h1 && h1.fileTop20;
check('F1 fileTop20 has 20 entries, rss order, size present', Array.isArray(ft1) && ft1.length === 20 && nonIncreasing(ft1, 'rssBytes') && allNumeric(ft1, 'sizeBytes'), ft1 && ft1.length);
check('F1 fileTop20 first is /dev/shm/gpu-1 at 200 kB RSS of 800 kB', !!ft1 && ft1[0].path === '/dev/shm/gpu-1' && ft1[0].rssBytes === 200 * KB && ft1[0].sizeBytes === 800 * KB, ft1 && ft1[0]);
const sd1 = h1 && h1.shmDir;
check('F1 shmDir totals numeric and entries with fixture sizes', !!sd1 && typeof sd1.totalBytes === 'number' && typeof sd1.freeBytes === 'number' && typeof sd1.usedBytes === 'number' && JSON.stringify(sd1.entries) === JSON.stringify([{ name: 'gpu-0', sizeBytes: 4096 }, { name: 'gpu-1', sizeBytes: 8192 }]), sd1 && sd1.entries);
const rs1 = h1 && h1.rendererShm;
check('F1 rendererShm has the two /dev/shm mappings', Array.isArray(rs1) && rs1.length === 2 && rs1[0].path === '/dev/shm/gpu-0' && rs1[1].path === '/dev/shm/gpu-1' && rs1.reduce((s, x) => s + x.rssBytes, 0) === (192 + 200) * KB, rs1);
const r2 = run(5151, shmB);
const h2 = r2.h;
check('F2 reader exit 0 and pid 5151, error null', r2.status === 0 && h2 !== null && h2.pid === 5151 && h2.error === null, h2 && [h2.pid, h2.error]);
const t2 = h2 && h2.totals;
check('F2 totals counts 5/3/2 and RSS split 41 MB anon, 98 MB file', !!t2 && t2.mappingCount === 5 && t2.anonCount === 3 && t2.fileCount === 2 && t2.anonRssBytes === 41 * MB && t2.fileRssBytes === 98 * MB, t2);
check('F2 anonymous diff 0 and rss diff 0', !!t2 && t2.anonRollupDiffBytes === 0 && t2.rssRollupDiffBytes === 0, t2);
check('F2 tag RSS sum equals anonRssBytes', !!t2 && t2.tagRssDiffBytes === 0 && t2.tagCount === 3, t2);
const at2 = h2 && h2.anonTop20;
check('F2 anonTop20 order is by RSS: partition_alloc 40 MB, v8 1 MB, v8-sandbox 0 MB', Array.isArray(at2) && JSON.stringify(at2.map((x) => x.path)) === JSON.stringify(['[anon:partition_alloc]', '[anon:v8]', '[anon:v8-sandbox]']), at2 && at2.map((x) => x.path));
check('F2 anonTop20 first holds 40 MB RSS with size 64 MB kept as field', !!at2 && at2[0].rssBytes === 40 * MB && at2[0].sizeBytes === 64 * MB, at2 && at2[0]);
check('F2 largest-by-size mapping (512 MB, 0 RSS) sits last in the RSS list', !!at2 && at2[2].sizeBytes === 512 * MB && at2[2].rssBytes === 0, at2 && at2[2]);
const ft2 = h2 && h2.fileTop20;
check('F2 fileTop20 first is chromium.real at 98 MB RSS', Array.isArray(ft2) && ft2[0].path === '/usr/lib/chromium/chromium.real' && ft2[0].rssBytes === 98 * MB && ft2[0].sizeBytes === 257 * MB, ft2 && ft2[0]);
const ru2 = h2 && h2.rollup;
check('F2 rollup Rss equal to fixture sum', !!ru2 && ru2.Rss === f2.sumRss * KB, ru2 && ru2.Rss);
const r3 = run(6161, shmA);
const h3 = r3.h;
const t3 = h3 && h3.totals;
check('F3 reader exit 0 and pid 6161', r3.status === 0 && h3 !== null && h3.pid === 6161 && h3.error === null, h3 && [h3.pid, h3.error]);
check('F3 duplicates dropped (5) and out-of-order seen (>0) on the raw read', !!t3 && t3.duplicatesDropped === 5 && t3.outOfOrder > 0, t3 && [t3.duplicatesDropped, t3.outOfOrder]);
check('F3 deduped read: mapping count back to 50, no overlaps, consistent, one attempt', !!t3 && t3.mappingCount === 50 && t3.overlaps === 0 && t3.consistent === true && t3.attempts === 1, t3);
check('F3 sums equal the unique set, rollup diffs 0', !!t3 && t3.anonRssBytes === expAnon1 && t3.fileRssBytes === expFile1 && t3.anonRollupDiffBytes === 0 && t3.rssRollupDiffBytes === 0, t3);
const at3 = h3 && h3.anonTop20;
check('F3 anonTop20 has unique ranges and the same first entry as F1', uniqueRanges(at3) && at3 && at3[0].sizeBytes === 400 * KB && at3[0].rssBytes === 200 * KB, at3 && at3[0]);
const r4 = run(7171, shmA);
const h4 = r4.h;
const t4 = h4 && h4.totals;
check('F4 smaps sum disagrees with rollup Anonymous: -2048 kB reported, not hidden, not consistent', !!t4 && t4.anonRollupDiffBytes === -2048 * KB && t4.rssRollupDiffBytes === 0 && t4.stable === true && t4.consistent === false, t4);
const r5 = run(8181, shmB);
const h5 = r5.h;
const t5 = h5 && h5.totals;
check('F5 stale copy overlapping the truth: 1 overlap, 639 MB attributed, not summed', !!t5 && t5.overlaps === 1 && t5.overlapAnonymousBytes === 639 * MB && t5.mappingCount === 1, t5);
check('F5 raw excess over rollup equals the overlap: overlapExplainsExcess true, accounted diff 0, consistent', !!t5 && t5.rawAnonRollupDiffBytes === 639 * MB && t5.overlapExplainsExcess === true && t5.anonRollupDiffBytes === 0 && t5.consistent === true && t5.stable === true && t5.attempts === 1, t5);
check('F5 tag and overlap list: accounted anon RSS 300 MB, overlap entry 639 MB on partition_alloc', !!h5 && h5.anonTags && h5.anonTags[0].rssBytes === 300 * MB && Array.isArray(h5.overlapTop) && h5.overlapTop[0].rssBytes === 639 * MB && h5.overlapTop[0].path === '[anon:partition_alloc]', h5 && [h5.anonTags && h5.anonTags[0], h5.overlapTop && h5.overlapTop[0]]);
const r6 = run(9191, shmB);
const h6 = r6.h;
const t6 = h6 && h6.totals;
const g6 = h6 && h6.anonTags;
const expPd6 = fixture6.filter((m) => m.inode === '0').reduce((s, m) => s + (m.pdKb || 0), 0) * KB;
check('F6 reader exit 0 and pid 9191, error null', r6.status === 0 && h6 !== null && h6.pid === 9191 && h6.error === null, h6 && [h6.pid, h6.error]);
check('F6 tags listed in RSS order: [anon:v8], [anon:partition_alloc], [anon:v8-sandbox], [anon], [heap]', Array.isArray(g6) && JSON.stringify(g6.map((x) => x.tag)) === JSON.stringify(['[anon:v8]', '[anon:partition_alloc]', '[anon:v8-sandbox]', '[anon]', '[heap]']), g6 && g6.map((x) => x.tag));
check('F6 [anon:v8] group: 2 mappings, 250 MB RSS, 250 MB Private_Dirty', Array.isArray(g6) && g6[0].mappings === 2 && g6[0].rssBytes === 250 * MB && g6[0].privateDirtyBytes === 250 * MB, g6 && g6[0]);
check('F6 [anon:partition_alloc] group: 40 MB RSS of which 30 MB Private_Dirty', Array.isArray(g6) && g6[1].rssBytes === 40 * MB && g6[1].privateDirtyBytes === 30 * MB, g6 && g6[1]);
check('F6 tag groups sum to anonRssBytes from the same read (tagRssDiffBytes 0)', !!t6 && t6.tagRssDiffBytes === 0 && Array.isArray(g6) && g6.reduce((s, x) => s + x.rssBytes, 0) === t6.anonRssBytes, t6 && [t6.tagRssDiffBytes, t6.anonRssBytes]);
check('F6 tag groups cover every anonymous mapping and Private_Dirty sums to the anon Private_Dirty', !!t6 && Array.isArray(g6) && g6.reduce((s, x) => s + x.mappings, 0) === t6.anonCount && g6.reduce((s, x) => s + x.privateDirtyBytes, 0) === expPd6, g6 && [g6.reduce((s, x) => s + x.mappings, 0), t6 && t6.anonCount]);
check('F6 anonTop20 first holds 200 MB RSS and 200 MB Private_Dirty', Array.isArray(h6 && h6.anonTop20) && h6.anonTop20[0].rssBytes === 200 * MB && h6.anonTop20[0].privateDirtyBytes === 200 * MB, h6 && h6.anonTop20 && h6.anonTop20[0]);
for (const c of checks) console.log((c.ok ? 'PASS ' : 'FAIL ') + c.name + ' got=' + c.got);
const green = checks.every((c) => c.ok);
console.log('HOLDER PROC WITNESS (' + readerPath + '): ' + (green ? 'GREEN' : 'RED'));
process.exit(green ? 0 : 1);
