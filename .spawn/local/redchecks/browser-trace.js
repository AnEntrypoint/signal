const fs = require('fs');
const OUT = '__OUT__';
const t0 = Date.now();
const ev = [];
const reqs = [];
const consoles = [];
const errs = [];
const failed = [];
const okUrls = new Set();
const logEv = (k, o) => { if (ev.length < 30000) ev.push(Object.assign({ ms: Date.now() - t0, k }, o)); };
const page = await context.newPage();
page.on('request', (r) => {
  if (reqs.length < 50000) reqs.push({ m: r.method(), t: r.resourceType(), u: r.url().slice(0, 240), pd: r.method() === 'POST' ? String(r.postData() || '').slice(0, 20000) : undefined });
  logEv('req', { u: r.url().slice(0, 240), type: r.resourceType(), m: r.method(), frame: (r.frame() ? r.frame().url() : '').slice(0, 160) });
});
page.on('console', (m) => {
  const s = m.type() + ' ' + m.location().url.slice(0, 120) + ': ' + m.text().slice(0, 1200);
  if (consoles.length < 5000) consoles.push(s);
  logEv('console', { txt: s.slice(0, 400) });
});
page.on('pageerror', (e) => { const s = String(e.message).slice(0, 300); if (errs.length < 2000) errs.push(s); logEv('pageerror', { txt: s }); });
page.on('response', (r) => {
  if (r.status() >= 400 && reqs.length < 50000) reqs.push({ s: r.status(), u: r.url().slice(0, 240) });
  if (r.status() < 400 && okUrls.size < 50000) okUrls.add(r.url());
  logEv('resp', { u: r.url().slice(0, 240), s: r.status() });
});
page.on('requestfailed', (r) => {
  const f = { u: r.url(), err: String(r.failure() && r.failure().errorText) };
  if (failed.length < 2000) failed.push(f);
  logEv('fail', { u: r.url().slice(0, 240), err: f.err, type: r.resourceType() });
});
page.on('framenavigated', (f) => logEv('nav', { f: f.url().slice(0, 220) }));
page.on('frameattached', (f) => logEv('attach', { f: f.url().slice(0, 220) }));
page.on('framedetached', (f) => logEv('detach', { f: f.url().slice(0, 220) }));
await page.setViewportSize({ width: 1280, height: 800 });
await page.addInitScript({ content: fs.readFileSync('__HERE__/seed-random.js', 'utf8') });
await page.goto('https://anentrypoint.github.io:__PORT__/signal/', { waitUntil: 'load', timeout: 150000 }).catch((e) => errs.push('NAV ' + String(e.message).slice(0, 200)));
await page.bringToFront().catch(() => {});
const cdp = await page.context().newCDPSession(page).catch(() => null);
if (cdp) await cdp.send('Performance.enable').catch(() => {});
const cpu = [];
const sampler = setInterval(async () => {
  const vis = await page.evaluate(() => document.visibilityState).catch(() => 'ERR');
  const m = cdp ? await cdp.send('Performance.getMetrics').catch(() => null) : null;
  const pick = (k) => (m ? (m.metrics.find((x) => x.name === k) || {}).value : null);
  cpu.push({ ms: Date.now() - t0, vis, script: pick('ScriptDuration'), task: pick('TaskDuration') });
}, 2000);
let canvasAtMs = -1;
while (Date.now() - t0 < 150000) {
  await new Promise((r) => setTimeout(r, 2000));
  const sf0 = page.frames().find((f) => f.url().includes('/session/'));
  const n = sf0 ? await sf0.evaluate(() => document.querySelectorAll('canvas').length).catch(() => 0) : 0;
  if (n > 0) { canvasAtMs = Date.now() - t0; break; }
}
await new Promise((r) => setTimeout(r, 60000));
clearInterval(sampler);
const out = [];
for (const f of page.frames()) {
  const info = await f.evaluate(() => {
    let n = 0;
    const t0 = performance.now();
    return new Promise((res) => {
      const cv = [...document.querySelectorAll('canvas')].map((c) => c.width + 'x' + c.height);
      const g = () => {
        n += 1;
        if (performance.now() - t0 < 3000) requestAnimationFrame(g);
        else res({ canvases: cv, frames3s: n, title: document.title, body: document.body ? document.body.innerHTML.length : 0, shown: document.documentElement.classList.contains('spawn-world-shown') });
      };
      requestAnimationFrame(g);
    });
  }).catch((e) => ({ err: String(e.message).slice(0, 160) }));
  out.push({ url: f.url().slice(0, 140), info });
}
const sess = page.frames().find((f) => f.url().includes('/session/'));
const series = [];
if (sess) {
  const list = await sess.evaluate(() => [...document.querySelectorAll('canvas')].map((c, i) => ({ i, w: c.width, h: c.height }))).catch(() => []);
  const order = list.slice().sort((a, b) => b.w * b.h - a.w * a.h).slice(0, 3);
  fs.mkdirSync(OUT + '/shots', { recursive: true });
  for (const c of order) {
    const files = [];
    for (let k = 0; k < 6; k++) {
      if (k > 0) await new Promise((r) => setTimeout(r, 2000));
      const p = OUT + '/shots/c' + c.i + '-' + k + '.png';
      const ok = await sess.locator('canvas').nth(c.i).screenshot({ path: p }).then(() => true, () => false);
      if (ok) files.push(p);
    }
    series.push({ i: c.i, w: c.w, h: c.h, files });
  }
  if (series[0] && series[0].files.length >= 2) {
    fs.copyFileSync(series[0].files[0], OUT + '/canvas-a.png');
    fs.copyFileSync(series[0].files[1], OUT + '/canvas-b.png');
  }
}
const laneBits = sess ? await sess.evaluate(() => window.__spawnArrivalLaneBits ?? null).catch(() => 'ERR') : 'NO_SESSION';
fs.writeFileSync(OUT + '/series.json', JSON.stringify(series, null, 1));
const states = [];
for (const f of page.frames()) states.push({ frame: f.url().slice(0, 200), state: await f.evaluate(() => {
  const keys = Object.keys(window).filter((k) => /spawn|kernel|tome|realm|lane|witness|gpu/i.test(k));
  const globals = {};
  for (const k of keys) {
    try {
      const v = window[k];
      globals[k] = v === null ? 'null' : typeof v === 'function' ? 'fn' : typeof v === 'object' ? Object.prototype.toString.call(v) + (Array.isArray(v) ? ' len ' + v.length : '') : String(v).slice(0, 80);
    } catch (e) { globals[k] = 'ERR'; }
  }
  return {
    url: location.href.slice(0, 260),
    title: document.title,
    cls: document.documentElement.className,
    globals,
    marks: performance.getEntriesByType('mark').map((m) => m.name).slice(0, 120),
    lsKeys: Object.keys(localStorage).slice(0, 60),
    ssKeys: Object.keys(sessionStorage).slice(0, 60),
    body: (document.body ? document.body.innerText : '').slice(0, 600),
    canvases: [...document.querySelectorAll('canvas')].map((c) => c.width + 'x' + c.height + ' ' + c.getBoundingClientRect().width.toFixed(0) + 'x' + c.getBoundingClientRect().height.toFixed(0)),
    gpu: typeof navigator.gpu,
    iframes: [...document.querySelectorAll('iframe')].map((f) => (f.getAttribute('src') || '').slice(0, 160)),
  };
}).catch((e) => ({ err: String(e.message).slice(0, 160) })) });
fs.writeFileSync(OUT + '/state.json', JSON.stringify(states, null, 1));
fs.writeFileSync(OUT + '/trace.json', JSON.stringify({ reqs, consoles, errs, failed, okUrls: [...okUrls], frames: out, ev, canvasAtMs, cpu, laneBits, latencyMs: Number(process.env.WITNESS_LATENCY_MS || 0) }, null, 1));
await page.screenshot({ path: OUT + '/shot.png' }).catch(() => {});
console.log(JSON.stringify({ reqN: reqs.length, errs: errs.length, consoles: consoles.length, series: series.map((s) => ({ i: s.i, n: s.files.length })) }));
await page.close();
