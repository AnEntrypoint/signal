import fs from 'node:fs';
import path from 'node:path';
const [readerPath, outDir] = process.argv.slice(2);
const src = fs.readFileSync(readerPath, 'utf8');
const SEL = "e.name === 'explicitly_triggered' && e.id === out.dumpGuid";
const muts = {
  'fallback-to-any': ['const pick = requested.length ? requested[requested.length - 1] : undefined;', 'const pick = requested.length ? requested[requested.length - 1] : dumps[dumps.length - 1];'],
  'id-only': [SEL, 'e.id === out.dumpGuid'],
  'name-only': [SEL, "e.name === 'explicitly_triggered'"],
};
for (const [name, [a, b]] of Object.entries(muts)) {
  if (src.split(a).length - 1 !== 1) throw new Error('anchor count for ' + name);
  const file = path.join(outDir, 'holder-memdump-parse-' + name + '.mjs');
  fs.writeFileSync(file, src.replace(a, () => b));
  console.log(file);
}
