
const fs = require('fs');
const OUT = '__OUT__';
const TARGET = '__TARGET__';
fs.mkdirSync(OUT, { recursive: true });
const probeInit = () => {
  if (window.__probe) return;
  const P = (window.__probe = { href: location.href.slice(0, 140), gpuAdapter: 0, gpuNoAdapter: 0, deviceOk: 0, deviceFail: [], submit: 0, currentTexture: 0, contexts: [], raf: 0, workers: [], offscreen: 0, errors: [], rejections: [], pointer: 0, keys: 0 });
  const push = (list, v) => { if (list.length < 40) list.push(v); };
  window.addEventListener('error', (e) => push(P.errors, String(e.message || '').slice(0, 220)), true);
  window.addEventListener('unhandledrejection', (e) => push(P.rejections, String((e.reason && e.reason.message) || e.reason).slice(0, 220)));
  window.addEventListener('pointerdown', () => { P.pointer += 1; }, true);
  window.addEventListener('keydown', () => { P.keys += 1; }, true);
  if (navigator.gpu) {
    const gp = Object.getPrototypeOf(navigator.gpu);
    const ra = gp.requestAdapter;
    gp.requestAdapter = async function (...args) { const a = await ra.apply(this, args); if (a) P.gpuAdapter += 1; else P.gpuNoAdapter += 1; return a; };
    const rd = GPUAdapter.prototype.requestDevice;
    GPUAdapter.prototype.requestDevice = async function (...args) { try { const d = await rd.apply(this, args); P.deviceOk += 1; return d; } catch (e) { push(P.deviceFail, String(e.message).slice(0, 200)); throw e; } };
    const sub = GPUQueue.prototype.submit;
    GPUQueue.prototype.submit = function (...args) { P.submit += 1; return sub.apply(this, args); };
    const gct = GPUCanvasContext.prototype.getCurrentTexture;
    GPUCanvasContext.prototype.getCurrentTexture = function (...args) { P.currentTexture += 1; return gct.apply(this, args); };
  }
  const gc = HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext = function (kind, ...rest) { const c = gc.call(this, kind, ...rest); push(P.contexts, { kind, id: this.id || '', w: this.width, h: this.height, ok: !!c, present: this.dataset.spawnPresentSurface || null }); return c; };
  const tco = HTMLCanvasElement.prototype.transferControlToOffscreen;
  if (tco) HTMLCanvasElement.prototype.transferControlToOffscreen = function (...args) { P.offscreen += 1; return tco.apply(this, args); };
  const W = window.Worker;
  window.Worker = function (url, opts) { push(P.workers, String(url).slice(0, 140)); return new W(url, opts); };
  window.Worker.prototype = W.prototype;
  const raf = window.requestAnimationFrame.bind(window);
  window.requestAnimationFrame = (cb) => raf((t) => { P.raf += 1; cb(t); });
};
const consoleLines = [];
const failures = [];
const pending = [];
const responses = [];
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
await context.addInitScript(probeInit);
context.on('requestfailed', (r) => { if (failures.length < 300) failures.push(r.method() + ' ' + r.failure().errorText + ' ' + r.url().slice(0, 200)); });
context.on('response', (res) => { const u = res.url(); if (res.status() >= 400 && responses.length < 300) responses.push(res.status() + ' ' + res.request().method() + ' ' + u.slice(0, 200)); });
const page = await context.newPage();
page.on('console', (m) => { if (consoleLines.length < 800) consoleLines.push(m.type() + ' ' + m.location().url.slice(0, 120) + ' :: ' + m.text().slice(0, 300)); });
page.on('pageerror', (e) => { if (consoleLines.length < 800) consoleLines.push('PAGEERROR ' + String(e.message).slice(0, 300)); });
await page.setViewportSize({ width: 1280, height: 800 });
await page.goto(TARGET, { waitUntil: 'commit', timeout: 120000 }).catch((e) => consoleLines.push('NAV ' + String(e.message).slice(0, 200)));
await wait(15000);
const snap = async (label) => {
  const frames = [];
  for (const f of page.frames()) {
    const probe = await f.evaluate(() => (window.__probe ? JSON.parse(JSON.stringify(window.__probe)) : null)).catch((e) => 'eval-fail ' + String(e.message).slice(0, 80));
    frames.push({ url: f.url().slice(0, 140), probe });
  }
  const html = await page.evaluate(() => ({ shown: document.documentElement.classList.contains('spawn-world-shown'), stood: document.documentElement.hasAttribute('data-spawn-stood'), alert: !!document.querySelector('[role="alert"]'), canvases: [...document.querySelectorAll('canvas')].map((c) => ({ id: c.id, w: c.width, h: c.height, present: c.dataset.spawnPresentSurface || null, op: getComputedStyle(c).opacity })) })).catch((e) => 'eval-fail ' + String(e.message).slice(0, 80));
  return { label, html, frames };
};
const before = await snap('before-click');
await page.screenshot({ path: OUT + '/before.png' }).catch(() => {});
await page.mouse.click(640, 400).catch(() => {});
await wait(30000);
const after = await snap('after-click');
await page.screenshot({ path: OUT + '/after.png' }).catch(() => {});
fs.writeFileSync(OUT + '/probe.json', JSON.stringify({ target: TARGET, before, after, failures, responses }, null, 1));
fs.writeFileSync(OUT + '/console.txt', consoleLines.join('\n') + '\n');
const summary = after.frames.map((f) => ({ url: f.url.slice(0, 70), p: f.probe && typeof f.probe === 'object' ? { gpuAdapter: f.probe.gpuAdapter, deviceOk: f.probe.deviceOk, deviceFail: f.probe.deviceFail.length, submit: f.probe.submit, currentTexture: f.probe.currentTexture, raf: f.probe.raf, workers: f.probe.workers.length, offscreen: f.probe.offscreen, errors: f.probe.errors.length, rejections: f.probe.rejections.length, pointer: f.probe.pointer, contexts: f.probe.contexts.map((c) => c.kind + ':' + (c.ok ? 'ok' : 'null') + ':' + c.w + 'x' + c.h) } : String(f.probe) }));
console.log(JSON.stringify({ html: after.html, summary, failures: failures.length, responses: responses.length }));
await page.close();
