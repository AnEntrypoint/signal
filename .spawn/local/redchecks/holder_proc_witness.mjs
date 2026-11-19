import fs from 'node:fs';
import { spawnSync } from 'node:child_process';
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
const writeProc = (pid, maps, roll) => {
  const dir = procRoot + '/' + pid;
  fs.mkdirSync(dir, { recursive: true });
  let smaps = '';
  for (const m of maps) {
    const start = m.base.toString(16).padStart(12, '0');
    const end = (m.base + m.sizeKb * KB).toString(16).padStart(12, '0');
    smaps += start + '-' + end + ' ' + m.perms + ' 00000000 00:00 ' + m.inode + ' ' + m.path + '\n';
    smaps += 'Size: ' + m.sizeKb + ' kB\nKernelPageSize: 4 kB\nRss: ' + m.rssKb + ' kB\nAnonymous: ' + m.anonKb + ' kB\nPrivate_Dirty: 0 kB\nVmFlags: rd wr mr mw me ac\n';
  }
  fs.writeFileSync(dir + '/smaps', smaps);
  const sumRss = maps.reduce((s, m) => s + m.rssKb, 0);
  const sumAnon = maps.reduce((s, m) => s + m.anonKb, 0);
  fs.writeFileSync(dir + '/smaps_rollup', '00400000-7fff00000000 ---p 00000000 00:00 0 [rollup]\nRss: ' + sumRss + ' kB\nShared_Clean: ' + roll.sc + ' kB\nShared_Dirty: ' + roll.sd + ' kB\nPrivate_Clean: 0 kB\nPrivate_Dirty: ' + roll.pd + ' kB\nAnonymous: ' + sumAnon + ' kB\n');
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
const f1 = writeProc(4242, fixture1, { sc: 1000, sd: 200, pd: 900 });
const f2 = writeProc(5151, fixture2, { sc: 0, sd: 0, pd: 0 });
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
const expAnon1 = fixture1.filter((m) => m.inode === '0').reduce((s, m) => s + m.rssKb, 0) * KB;
const expFile1 = fixture1.filter((m) => m.inode !== '0').reduce((s, m) => s + m.rssKb, 0) * KB;
check('F1 totals counts', !!t1 && t1.mappingCount === 50 && t1.anonCount === 25 && t1.fileCount === 25, t1);
check('F1 totals anonRssBytes and fileRssBytes', !!t1 && t1.anonRssBytes === expAnon1 && t1.fileRssBytes === expFile1, t1 && [t1.anonRssBytes, t1.fileRssBytes]);
check('F1 sum rule: anonRss + fileRss equals rollup Rss', !!t1 && !!ru1 && t1.anonRssBytes + t1.fileRssBytes === ru1.Rss, t1 && ru1 && [t1.anonRssBytes + t1.fileRssBytes, ru1.Rss]);
check('F1 sum rule: anonymousBytes equals rollup Anonymous', !!t1 && !!ru1 && t1.anonymousBytes === ru1.Anonymous, t1 && ru1 && [t1.anonymousBytes, ru1.Anonymous]);
const at1 = h1 && h1.anonTop20;
check('F1 anonTop20 has 20 entries', Array.isArray(at1) && at1.length === 20, at1 && at1.length);
check('F1 anonTop20 sorted by rssBytes, size present in each entry', nonIncreasing(at1, 'rssBytes') && allNumeric(at1, 'sizeBytes') && typeof (at1 && at1[0] && at1[0].range) === 'string', at1 && at1[0]);
check('F1 anonTop20 first is the 400 kB mapping (largest RSS)', !!at1 && at1[0].sizeBytes === 400 * KB && at1[0].rssBytes === 200 * KB, at1 && at1[0]);
const ft1 = h1 && h1.fileTop20;
check('F1 fileTop20 has 20 entries, sorted by rssBytes, size present', Array.isArray(ft1) && ft1.length === 20 && nonIncreasing(ft1, 'rssBytes') && allNumeric(ft1, 'sizeBytes'), ft1 && ft1.length);
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
const at2 = h2 && h2.anonTop20;
check('F2 anonTop20 order is by RSS: partition_alloc 40 MB, v8 1 MB, v8-sandbox 0 MB', Array.isArray(at2) && JSON.stringify(at2.map((x) => x.path)) === JSON.stringify(['[anon:partition_alloc]', '[anon:v8]', '[anon:v8-sandbox]']), at2 && at2.map((x) => x.path));
check('F2 anonTop20 first holds 40 MB RSS with size 64 MB kept as field', !!at2 && at2[0].rssBytes === 40 * MB && at2[0].sizeBytes === 64 * MB, at2 && at2[0]);
check('F2 largest-by-size mapping (512 MB, 0 RSS) sits last in the RSS list', !!at2 && at2[2].sizeBytes === 512 * MB && at2[2].rssBytes === 0, at2 && at2[2]);
const ft2 = h2 && h2.fileTop20;
check('F2 fileTop20 first is chromium.real at 98 MB RSS', Array.isArray(ft2) && ft2[0].path === '/usr/lib/chromium/chromium.real' && ft2[0].rssBytes === 98 * MB && ft2[0].sizeBytes === 257 * MB, ft2 && ft2[0]);
const ru2 = h2 && h2.rollup;
check('F2 rollup Rss equal to fixture sum', !!ru2 && ru2.Rss === f2.sumRss * KB, ru2 && ru2.Rss);
for (const c of checks) console.log((c.ok ? 'PASS ' : 'FAIL ') + c.name + ' got=' + c.got);
const green = checks.every((c) => c.ok);
console.log('HOLDER PROC WITNESS (' + readerPath + '): ' + (green ? 'GREEN' : 'RED'));
process.exit(green ? 0 : 1);
