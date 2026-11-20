import fs from 'node:fs';
import path from 'node:path';
const [readerPath, outDir] = process.argv.slice(2);
const src = fs.readFileSync(readerPath, 'utf8');
const muts = {
  'old-guard': ['}, 40000);', '}, 20000);'],
  'summarize-on-success': ['  summarize(events);', '  if (out.dumpSuccess) summarize(events);'],
  'no-wait-complete': ['  await completed;', ''],
  'await-end-reply': ["  send('Tracing.end').then(() => { out.endReplyAtMs = Date.now(); }, () => {});", "  await send('Tracing.end');"],
};
for (const [name, [a, b]] of Object.entries(muts)) {
  if (src.split(a).length - 1 !== 1) throw new Error('anchor count for ' + name);
  const file = path.join(outDir, 'holder-memdump-refusal-' + name + '.mjs');
  fs.writeFileSync(file, src.replace(a, () => b));
  console.log(file);
}
