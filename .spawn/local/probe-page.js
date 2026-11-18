
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
  const P2 = window.__probe;
  const tfib = ImageBitmapRenderingContext.prototype.transferFromImageBitmap;
  ImageBitmapRenderingContext.prototype.transferFromImageBitmap = function (...args) { P2.bitmapPresent = (P2.bitmapPresent || 0) + 1; return tfib.apply(this, args); };
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
const workerHandles = [];
const workerInit = () => {
  const P = (self.__probe = { hasGpu: !!navigator.gpu, gpuAdapter: 0, gpuNoAdapter: 0, deviceOk: 0, deviceFail: [], submit: 0, currentTexture: 0, beginRenderPass: 0, beginComputePass: 0, draw: 0, drawIndexed: 0, dispatch: 0, writeBuffer: 0, writeTexture: 0, toBitmap: 0, createImageBitmap: 0, frameSamples: [], errors: [] });
  const push = (list, v) => { if (list.length < 30) list.push(v); };
  const count = (proto, name, key) => { if (!proto || typeof proto[name] !== 'function') return; const f = proto[name]; proto[name] = function (...args) { P[key] += 1; return f.apply(this, args); }; };
  self.addEventListener('error', (e) => push(P.errors, String(e.message || '').slice(0, 200)));
  self.addEventListener('unhandledrejection', (e) => push(P.errors, 'rejection ' + String((e.reason && e.reason.message) || e.reason).slice(0, 200)));
  if (navigator.gpu) {
    const gp = Object.getPrototypeOf(navigator.gpu);
    const ra = gp.requestAdapter;
    gp.requestAdapter = async function (...args) { const a = await ra.apply(this, args); if (a) P.gpuAdapter += 1; else P.gpuNoAdapter += 1; return a; };
    const rd = GPUAdapter.prototype.requestDevice;
    GPUAdapter.prototype.requestDevice = async function (...args) { try { const d = await rd.apply(this, args); P.deviceOk += 1; return d; } catch (e) { push(P.deviceFail, String(e.message).slice(0, 200)); throw e; } };
    count(GPUQueue.prototype, 'submit', 'submit');
    count(GPUCanvasContext.prototype, 'getCurrentTexture', 'currentTexture');
    count(GPUCommandEncoder.prototype, 'beginRenderPass', 'beginRenderPass');
    count(GPUCommandEncoder.prototype, 'beginComputePass', 'beginComputePass');
    count(GPURenderPassEncoder.prototype, 'draw', 'draw');
    count(GPURenderPassEncoder.prototype, 'drawIndexed', 'drawIndexed');
    count(GPUComputePassEncoder.prototype, 'dispatchWorkgroups', 'dispatch');
    count(GPUQueue.prototype, 'writeBuffer', 'writeBuffer');
    count(GPUQueue.prototype, 'writeTexture', 'writeTexture');
  }
  if (self.OffscreenCanvas) count(OffscreenCanvas.prototype, 'transferToImageBitmap', 'toBitmap');
  if (self.createImageBitmap) {
    const cib = self.createImageBitmap;
    self.createImageBitmap = async function (...args) {
      const bmp = await cib.apply(this, args);
      P.createImageBitmap += 1;
      if (P.createImageBitmap % 10 === 0 && bmp && bmp.width > 0) {
        try {
          const c = new OffscreenCanvas(bmp.width, bmp.height);
          const g = c.getContext('2d');
          g.drawImage(bmp, 0, 0);
          const d = g.getImageData(0, 0, bmp.width, bmp.height).data;
          let nonBlack = 0;
          let sum = 0;
          for (let i = 0; i < d.length; i += 4) { const v = d[i] + d[i + 1] + d[i + 2]; if (v > 0) nonBlack += 1; sum += v; }
          P.frameSamples.push({ n: P.createImageBitmap, w: bmp.width, h: bmp.height, nonBlackPixels: nonBlack, meanBrightness: Math.round((sum / (d.length / 4)) * 100) / 100 });
          if (P.frameSamples.length > 12) P.frameSamples.shift();
        } catch (e) { push(P.errors, 'sample ' + String(e.message).slice(0, 120)); }
      }
      return bmp;
    };
  }
};
page.on('worker', (w) => {
  const handle = { url: w.url().slice(0, 140), patch: null, w };
  workerHandles.push(handle);
  w.evaluate(workerInit).then(() => { handle.patch = 'ok'; }, (e) => { handle.patch = 'fail ' + String(e.message).slice(0, 120); });
});
const workerSnap = async () => {
  const out = [];
  for (const h of workerHandles) {
    const probe = await Promise.race([h.w.evaluate(() => (self.__probe ? JSON.parse(JSON.stringify(self.__probe)) : null)).catch((e) => 'eval-fail ' + String(e.message).slice(0, 80)), wait(8000).then(() => 'eval-timeout')]);
    out.push({ url: h.url, patch: h.patch, probe });
  }
  return out;
};
const locksSnap = async () => {
  const out = [];
  for (const f of page.frames()) {
    const v = await Promise.race([f.evaluate(async () => { if (!navigator.locks) return 'no locks'; const q = await navigator.locks.query(); return { held: q.held.map((l) => l.name + ':' + l.mode).slice(0, 20), pending: q.pending.map((l) => l.name + ':' + l.mode).slice(0, 20) }; }).catch((e) => 'eval-fail ' + String(e.message).slice(0, 80)), wait(8000).then(() => 'eval-timeout')]);
    out.push({ url: f.url().slice(0, 80), locks: v });
  }
  return out;
};
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
before.workers = await workerSnap();
before.locks = await locksSnap();
await page.screenshot({ path: OUT + '/before.png' }).catch(() => {});
await page.mouse.click(640, 400).catch(() => {});
await wait(30000);
const after = await snap('after-click');
after.workers = await workerSnap();
after.locks = await locksSnap();
await page.screenshot({ path: OUT + '/after.png' }).catch(() => {});
fs.writeFileSync(OUT + '/probe.json', JSON.stringify({ target: TARGET, before, after, failures, responses }, null, 1));
fs.writeFileSync(OUT + '/console.txt', consoleLines.join('\n') + '\n');
const summary = after.frames.map((f) => ({ url: f.url.slice(0, 70), p: f.probe && typeof f.probe === 'object' ? { gpuAdapter: f.probe.gpuAdapter, deviceOk: f.probe.deviceOk, deviceFail: f.probe.deviceFail.length, submit: f.probe.submit, currentTexture: f.probe.currentTexture, raf: f.probe.raf, workers: f.probe.workers.length, offscreen: f.probe.offscreen, errors: f.probe.errors.length, rejections: f.probe.rejections.length, pointer: f.probe.pointer, contexts: f.probe.contexts.map((c) => c.kind + ':' + (c.ok ? 'ok' : 'null') + ':' + c.w + 'x' + c.h) } : String(f.probe) }));
console.log(JSON.stringify({ html: after.html, summary, failures: failures.length, responses: responses.length }));
await page.close();
