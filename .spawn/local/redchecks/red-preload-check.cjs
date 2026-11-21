const fs = require('fs');
const path = require('path');
const ROOT = process.argv[2] || '/workspace/signal/pages-export';
const DEAD = /rel="preload" as="fetch" crossorigin href="\/signal\/world-store\/git\/[0-9a-f]+\/ui\/b045b55fce1634c701a585b3012693fbc125cc3f0b2039e844b16cfcafecbff6\.css"/;
const walk = (dir, out) => { for (const name of fs.readdirSync(dir)) { const p = path.join(dir, name); if (fs.statSync(p).isDirectory()) walk(p, out); else if (name.endsWith('.html')) out.push(p); } return out; };
const hits = walk(ROOT, []).filter((f) => DEAD.test(fs.readFileSync(f, 'utf8')));
console.log('dead preload pages: ' + hits.length);
if (hits.length) { hits.forEach((f) => console.log('HIT ' + path.relative(ROOT, f))); process.exit(1); }
