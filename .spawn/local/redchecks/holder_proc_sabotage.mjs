import fs from 'node:fs';
const L = '/workspace/signal/world/signal-stage/.spawn/local/';
const src = fs.readFileSync(L + 'holder-proc.mjs', 'utf8');
const outDir = process.argv[2] || '/tmp/verify';
const cases = [
  ['no-dedupe', 'const uniq = dedupe(maps);', 'const uniq = maps;'],
  ['overlap-check', 'overlaps: snap.overlaps,', 'overlaps: 0,'],
  ['anon-diff', 'anonRollupDiffBytes: diff(anonymousBytes, rollup.Anonymous),', ''],
  ['pid', 'const out = { pid: Number(holderPid), error: null };', 'const out = { error: null };'],
  ['rollup', '  out.rollup = rollup;', ''],
  ['rollup-Rss', "'Rss', ", ''],
  ['rollup-Anonymous', "'Anonymous', ", ''],
  ['rollup-Shared_Clean', "'Shared_Clean', ", ''],
  ['rollup-Shared_Dirty', "'Shared_Dirty', ", ''],
  ['rollup-Private_Dirty', ", 'Private_Dirty'", ''],
  ['totals', '  out.totals = totals;', ''],
  ['anonTop20', '  out.anonTop20 = top(anon);', ''],
  ['fileTop20', '  out.fileTop20 = top(file);', ''],
  ['shmDir', '  out.shmDir = shmDirInfo;', ''],
  ['rendererShm', '  out.rendererShm = rendererShm;', ''],
  ['file-sum', 'const fileRssBytes = toBytes(sumBy(file, (m) => m.rssKb));', 'const fileRssBytes = 0;'],
  ['sort-size', '.sort((a, b) => b.rssKb - a.rssKb || b.sizeKb - a.sizeKb)', '.sort((a, b) => b.sizeKb - a.sizeKb)'],
];
const made = [];
for (const [name, text, repl] of cases) {
  const n = src.split(text).length - 1;
  if (n !== 1) throw new Error('anchor ' + name + ' count ' + n);
  const out = src.replace(text, () => repl);
  if (out === src) throw new Error('no change ' + name);
  const p = outDir + '/holder-proc-sab-' + name + '.mjs';
  fs.writeFileSync(p, out);
  made.push(p);
}
console.log(made.join('\n'));
