import { mkdtempSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { summarize } from '../probe-steps.mjs';

const here = dirname(fileURLToPath(import.meta.url));
let passed = 0;
const failed = [];
function check(name, ok) {
  if (ok) passed += 1;
  else failed.push(name);
  console.log((ok ? 'ok   ' : 'FAIL ') + name);
}
const marks = [{ label: 'a', t: 1000 }, { label: 'b', t: 3000 }].map((m) => JSON.stringify(m)).join('\n');
const samples = [
  { t: 900, elapsed: 0, playwriterKb: 11, tree: { groupId: 9, count: 1, totalKb: 100, byType: { browser: 100 } } },
  { t: 2900, elapsed: 2, playwriterKb: 12, tree: { groupId: 9, count: 3, totalKb: 500, byType: { browser: 200, renderer: 300 } } },
  { t: 3800, elapsed: 3, playwriterKb: 13, tree: { groupId: 9, count: 3, totalKb: 900, byType: { browser: 200, renderer: 700 } } },
  { t: 4800, elapsed: 4, playwriterKb: 14, tree: null },
].map((s) => JSON.stringify(s)).join('\n');
const s = summarize(marks, samples);
check('one step per mark', s.steps.length === 2);
check('step a reads the nearest sample (100 KB tree)', s.steps[0].browserTreeKb === 100 && s.steps[0].label === 'a');
check('step b reads the nearest sample (500 KB tree, renderer 300)', s.steps[1].browserTreeKb === 500 && s.steps[1].byType.renderer === 300);
check('step b carries the playwriter footprint of its sample (12 KB)', s.steps[1].playwriterKb === 12);
check('elapsed is counted from the first mark', s.steps[0].elapsedS === 0 && s.steps[1].elapsedS === 2);
check('the peak is the largest tree total (900 KB at elapsed 3)', s.peak.browserTreeKb === 900 && s.peak.elapsedS === 3 && s.peak.byType.renderer === 700);
check('a sample without a tree is skipped', s.samples === 3);
const dir = mkdtempSync('/tmp/steps-');
writeFileSync(join(dir, 'steps.log'), marks + '\n');
writeFileSync(join(dir, 'tree-rss.jsonl'), samples + '\n');
const cli = JSON.parse(execFileSync('node', [join(here, '..', 'probe-steps.mjs'), dir], { encoding: 'utf8' }));
check('the CLI prints the same summary as the function', cli.steps.length === 2 && cli.peak.browserTreeKb === 900);
if (failed.length === 0) console.log('GREEN ' + passed + ' checks');
else console.log('RED ' + failed.length + ' failed: ' + failed.join('; '));
process.exitCode = failed.length === 0 ? 0 : 1;
