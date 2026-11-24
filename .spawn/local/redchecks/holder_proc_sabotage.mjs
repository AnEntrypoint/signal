import fs from 'node:fs';
const L = '/workspace/signal/world/signal-stage/.spawn/local/';
const src = fs.readFileSync(L + 'holder-proc.mjs', 'utf8');
const outDir = process.argv[2] || '/workspace/tmp/signal/verify';
const attribution = ['    if (maxEnd !== null && m.startN < maxEnd) { overlaps.push(m); continue; }', '    if (false) { overlaps.push(m); continue; }'];
const noStable = ['    if (stableRollup(before, after)) break;', '    break;'];
const stableFlag = ['  const stable = stableRollup(pass.before, pass.after);', '  const stable = true;'];
const cases = [
  ['no-stable-check', [noStable]],
  ['stable-flag', [stableFlag]],
  ['no-attribution', [attribution]],
  ['no-dedupe', [['  const uniq = dedupe(pass.raw).sort(byStartEnd);', '  const uniq = [...pass.raw].sort(byStartEnd);']]],
  ['drop-rollup-diff', [['    anonRollupDiffBytes: diff(anonymousBytes, rollup.Anonymous),', '']]],
  ['drop-explains-excess', [['      overlapExplainsExcess: rawAnonRollupDiffBytes !== null && rawAnonRollupDiffBytes === overlapAnonymousBytes,', '']]],
  ['drop-overlap-top', [['    out.overlapTop = overlaps.slice(0, TOP).map((m) => ({ range: m.start + \'-\' + m.end, sizeBytes: toBytes(m.sizeKb), rssBytes: toBytes(m.rssKb), anonBytes: toBytes(m.anonKb), path: m.path }));', '']]],
  ['current-behaviour', [attribution, noStable, stableFlag]],
  ['pid', [['const out = { pid: Number(holderPid), error: null };', 'const out = { error: null };']]],
  ['rollup', [['    out.rollup = rollup;', '']]],
  ['rollup-Rss', [["'Rss', ", '']]],
  ['rollup-Anonymous', [["'Anonymous', ", '']]],
  ['rollup-Shared_Clean', [["'Shared_Clean', ", '']]],
  ['rollup-Shared_Dirty', [["'Shared_Dirty', ", '']]],
  ['rollup-Private_Dirty', [[", 'Private_Dirty'", '']]],
  ['totals', [['    out.totals = totals;', '']]],
  ['anonTop20', [['    out.anonTop20 = top(anon);', '']]],
  ['fileTop20', [['    out.fileTop20 = top(file);', '']]],
  ['shmDir', [['    out.shmDir = shmDirInfo;', '']]],
  ['rendererShm', [['    out.rendererShm = rendererShm;', '']]],
  ['file-sum', [['const fileRssBytes = toBytes(sumBy(file, (m) => m.rssKb));', 'const fileRssBytes = 0;']]],
  ['sort-size', [['.sort((a, b) => b.rssKb - a.rssKb || b.sizeKb - a.sizeKb)', '.sort((a, b) => b.sizeKb - a.sizeKb)']]],
  ['drop-grouping', [['    out.anonTags = anonTags;', '']]],
  ['tag-diff', [['  totals.tagRssDiffBytes = sumBy(anonTags, (g) => g.rssBytes) - anonRssBytes;', '']]],
  ['pd-field', [['privateDirtyBytes: toBytes(m.pdKb), path: m.path }));', 'path: m.path }));']]],
];
const made = [];
for (const [name, pairs] of cases) {
  let out = src;
  for (const [text, repl] of pairs) {
    const n = out.split(text).length - 1;
    if (n !== 1) throw new Error('anchor ' + name + ' count ' + n + ': ' + text.slice(0, 60));
    out = out.replace(text, () => repl);
  }
  if (out === src) throw new Error('no change ' + name);
  const p = outDir + '/holder-proc-sab-' + name + '.mjs';
  fs.writeFileSync(p, out);
  made.push(p);
}
console.log(made.join('\n'));
