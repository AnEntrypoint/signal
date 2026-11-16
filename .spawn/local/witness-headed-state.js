const origin = 'http://127.0.0.1:4173';
const T0 = Date.now();
const step = (name, extra = '') => console.log(`STEP ${name} t=${Date.now() - T0}ms ${extra}`.trim());
const p = await context.newPage();
let plateHits = 0;
await p.route((u) => new URL(u).pathname === '/ready-plate', (r) => {
  plateHits += 1;
  r.fulfill({ status: 200, contentType: 'text/html', body: '' });
});
await p.goto(origin + '/', { waitUntil: 'load', timeout: 90000 });
step('kernel-load');
await new Promise((r) => setTimeout(r, 25000));
step('settled', 'plateHits=' + plateHits);
const frames = [];
const resources = [];
for (const f of p.frames()) {
  const s = await f.evaluate(() => {
    const names = performance.getEntriesByType('resource').map((e) => e.name.split('/').pop());
    return {
      url: location.href.slice(-36),
      worldShown: document.documentElement.classList.contains('spawn-world-shown'),
      stood: document.documentElement.hasAttribute('data-spawn-stood'),
      wallPresent: !!document.querySelector('[data-compat-wall]'),
      restartText: (document.documentElement?.textContent || '').includes('Restart Chrome to play'),
      canvases: document.querySelectorAll('canvas').length,
      hudFrames: document.querySelectorAll('iframe[data-tome-realm="game"]').length,
      renderer: names.filter((n) => /stand|film|pipeline|renderer|world/.test(n)),
      resources: names.length,
    };
  }).catch((e) => ({ error: String(e.message).slice(0, 80) }));
  frames.push(s);
}
step('state-read', JSON.stringify(frames));
const a = await p.screenshot({ path: '/tmp/verify/headed-world-a.png' });
await new Promise((r) => setTimeout(r, 3000));
const b = await p.screenshot({ path: '/tmp/verify/headed-world-b.png' });
const sum = (buf) => { let h = 0; for (const x of buf) h = (h * 31 + x) >>> 0; return h; };
step('screenshots', 'sizeA=' + a.length + ' sizeB=' + b.length + ' hashA=' + sum(a) + ' hashB=' + sum(b) + ' identical=' + (sum(a) === sum(b) && a.length === b.length));
console.log('STATE ' + JSON.stringify({ plateHits, frames }));
await p.close();
