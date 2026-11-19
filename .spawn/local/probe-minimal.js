const fs = require('fs');
const OUT = '__OUT__';
fs.mkdirSync(OUT, { recursive: true });
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
await context.addInitScript(() => {
  if (window !== window.top) return;
  window.__listenerAt = Date.now();
  window.__got = [];
  const bc = new BroadcastChannel('min-probe');
  bc.onmessage = (e) => { window.__got.push({ kind: e.data.kind, postAt: e.data.postAt ?? null, receivedAt: Date.now() }); };
});
const page = await context.newPage();
await page.goto('about:blank');
const closeSync = "const bc = new BroadcastChannel('min-probe'); const postAt = Date.now(); bc.postMessage({ kind: 'close-sync', postAt }); self.close();";
const closeDelay = "const bc = new BroadcastChannel('min-probe'); const postAt = Date.now(); bc.postMessage({ kind: 'close-after-delay', postAt }); setTimeout(() => self.close(), 50);";
const created = await page.evaluate(([a, b]) => {
  const mk = (s) => new Worker(URL.createObjectURL(new Blob([s], { type: 'text/javascript' })));
  const t0 = Date.now();
  mk(a);
  const t1 = Date.now();
  mk(b);
  return { t0, t1, t2: Date.now(), listenerAt: window.__listenerAt };
}, [closeSync, closeDelay]);
await wait(3000);
const got = await page.evaluate(() => window.__got);
const out = { created, got };
fs.writeFileSync(OUT + '/min.json', JSON.stringify(out, null, 1));
console.log('MIN ' + JSON.stringify(out));
