const fs = require('fs');
const path = require('path');
const ROOT = process.argv[2] || '/workspace/signal/pages-export';
const DEAD = /<link rel="preload" as="fetch" crossorigin href="\/signal\/world-store\/git\/[0-9a-f]+\/ui\/b045b55fce1634c701a585b3012693fbc125cc3f0b2039e844b16cfcafecbff6\.css" \/>\n?/g;
const walk = (dir, out) => { for (const name of fs.readdirSync(dir)) { const p = path.join(dir, name); if (fs.statSync(p).isDirectory()) walk(p, out); else if (name.endsWith('.html')) out.push(p); } return out; };
let changed = 0;
for (const f of walk(ROOT, [])) {
  const s = fs.readFileSync(f, 'utf8');
  DEAD.lastIndex = 0;
  if (!DEAD.test(s)) continue;
  DEAD.lastIndex = 0;
  fs.writeFileSync(f, s.replace(DEAD, ''));
  changed += 1;
  console.log('PATCHED ' + path.relative(ROOT, f));
}
console.log('pages-post files changed: ' + changed);
