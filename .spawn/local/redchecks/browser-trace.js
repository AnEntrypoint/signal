const fs = require('fs');
const OUT = '__OUT__';
const reqs = [];
const consoles = [];
const errs = [];
const failed = [];
const page = await context.newPage();
page.on('request', (r) => { if (reqs.length < 50000) reqs.push({ m: r.method(), t: r.resourceType(), u: r.url().slice(0, 240), pd: r.method() === "POST" ? String(r.postData() || "").slice(0, 20000) : undefined }); });
page.on('console', (m) => { if (consoles.length < 5000) consoles.push(m.type() + ' ' + m.location().url.slice(0, 120) + ': ' + m.text().slice(0, 240)); });
page.on('pageerror', (e) => { if (errs.length < 2000) errs.push(String(e.message).slice(0, 300)); });
page.on('response', (r) => { if (r.status() >= 400 && reqs.length < 50000) reqs.push({ s: r.status(), u: r.url().slice(0, 240) }); });
page.on('requestfailed', (r) => { if (failed.length < 2000) failed.push({ u: r.url().slice(0, 240), err: String(r.failure() && r.failure().errorText) }); });
await page.setViewportSize({ width: 1280, height: 800 });
await page.goto('http://127.0.0.1:__PORT__/signal/', { waitUntil: 'load', timeout: 150000 }).catch((e) => errs.push('NAV ' + String(e.message).slice(0, 200)));
await new Promise((r) => setTimeout(r, 60000));
const out = [];
for (const f of page.frames()) {
  const info = await f.evaluate(() => { let n = 0; const t0 = performance.now(); return new Promise((res) => { const cv = [...document.querySelectorAll('canvas')].map((c) => c.width + 'x' + c.height); const g = () => { n += 1; if (performance.now() - t0 < 3000) requestAnimationFrame(g); else res({ canvases: cv, frames3s: n, title: document.title.slice(0, 60), body: (document.body && document.body.innerText || '').length, shown: document.documentElement.classList.contains('spawn-world-shown') }); }; requestAnimationFrame(g); }); }).catch((e) => ({ err: String(e.message).slice(0, 120) }));
  out.push({ url: f.url().slice(0, 140), info });
}
fs.writeFileSync(OUT + '/trace.json', JSON.stringify({ reqs, consoles, errs, failed, frames: out }, null, 1));
await page.screenshot({ path: OUT + '/shot.png' }).catch(() => {});
console.log(JSON.stringify({ reqN: reqs.length, errs: errs.length, consoles: consoles.length, frames: out.map((f) => ({ u: f.url.slice(0, 60), i: f.info })) }));
await page.close();
