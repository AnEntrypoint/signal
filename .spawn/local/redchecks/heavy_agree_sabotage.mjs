import fs from 'node:fs';
import path from 'node:path';
const [modPath, outDir] = process.argv.slice(2);
const src = fs.readFileSync(modPath, 'utf8');
const muts = {
  'verdict-only': ['agree: verdictSame && pidsSame', 'agree: verdictSame'],
  'first-pid-only': ['.map((match) => Number(match[1])))].sort', '.slice(0, 1).map((match) => Number(match[1])))].sort'],
  'cli-always-zero': ['process.exit(res.agree ? 0 : 1);', 'process.exit(0);'],
};
for (const [name, [a, b]] of Object.entries(muts)) {
  if (src.split(a).length - 1 !== 1) throw new Error('anchor count for ' + name);
  const file = path.join(outDir, 'heavy-agree-' + name + '.mjs');
  fs.writeFileSync(file, src.replace(a, () => b));
  console.log(file);
}
