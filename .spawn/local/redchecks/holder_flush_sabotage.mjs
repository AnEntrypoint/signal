import fs from 'node:fs';
import path from 'node:path';
const [readerPath, outDir] = process.argv.slice(2);
const src = fs.readFileSync(readerPath, 'utf8');
const muts = {
  'always-dump': [["  out.mode = process.env.HOLDER_MODE === 'no-dump' ? 'no-dump' : 'dump';", "  out.mode = 'dump';"]],
  'skip-hold': [["  if (out.mode === 'no-dump') await new Promise((res) => setTimeout(res, NO_DUMP_HOLD_MS));", '']],
};
for (const [name, pairs] of Object.entries(muts)) {
  let out = src;
  for (const [a, b] of pairs) {
    if (out.split(a).length - 1 !== 1) throw new Error('anchor count for ' + name + ': ' + a.slice(0, 60));
    out = out.replace(a, () => b);
  }
  const file = path.join(outDir, 'holder-memdump-flush-' + name + '.mjs');
  fs.writeFileSync(file, out);
  console.log(file);
}
