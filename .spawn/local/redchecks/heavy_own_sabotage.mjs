import fs from 'node:fs';
import path from 'node:path';
const [ownPath, outDir] = process.argv.slice(2);
const src = fs.readFileSync(ownPath, 'utf8');
const muts = {
  'count-test-tools': ["    if (program === 'cargo' && TEST_CHECK_VERBS.includes(argv[1])) kind = 'test-check';", "    if ((program === 'cargo' && TEST_CHECK_VERBS.includes(argv[1])) || /vitest|jest|--test/.test(row.args)) kind = 'test-check';"],
  'substring-test': ["    if (program === 'cargo' && TEST_CHECK_VERBS.includes(argv[1])) kind = 'test-check';", "    if (row.args.includes('cargo test')) kind = 'test-check';"],
  'renderer-at-limit': ['row.rss > RENDERER_RSS_KIB', 'row.rss >= RENDERER_RSS_KIB'],
};
for (const [name, [a, b]] of Object.entries(muts)) {
  if (src.split(a).length - 1 !== 1) throw new Error('anchor count for ' + name);
  const file = path.join(outDir, 'heavy-own-' + name + '.mjs');
  fs.writeFileSync(file, src.replace(a, () => b));
  console.log(file);
}
