
const fs = require('fs');
const OUT = '__OUT__';
const TARGET = '__TARGET__';
fs.mkdirSync(OUT, { recursive: true });
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const capped = (p, ms, label) => Promise.race([p, wait(ms).then(() => label)]);
const workerInit = () => {
  const P = (self.__probe = { hasGpu: !!navigator.gpu, gpuAdapter: 0, deviceOk: 0, submit: 0, beginRenderPass: 0, draw: 0, drawIndexed: 0, dispatch: 0, writeBuffer: 0, drawHist: {}, passLog: [], lastFrame: [], bitmapArgs: [], createImageBitmap: 0, frameSamples: [], quiet: false, errors: [], lost: [] });
  const bufs = [];
  const texs = [];
  const devices = [];
  const selfClose = self.close;
  self.close = function (...args) { new BroadcastChannel('spawn-probe').postMessage({ kind: 'worker-close-called', t: Date.now(), stack: String(new Error().stack).split('\n').slice(1, 7).join(' | ').slice(0, 500) }); return selfClose.apply(this, args); };
  const texIdx = new WeakMap();
  const viewTex = new WeakMap();
  const push = (list, v) => { if (list.length < 40) list.push(v); };
  self.addEventListener('error', (e) => push(P.errors, String(e.message || '').slice(0, 200)));
  self.addEventListener('unhandledrejection', (e) => push(P.errors, 'rejection ' + String((e.reason && e.reason.message) || e.reason).slice(0, 200)));
  if (!navigator.gpu) return;
  const gp = Object.getPrototypeOf(navigator.gpu);
  const ra = gp.requestAdapter;
  gp.requestAdapter = async function (...args) { const a = await ra.apply(this, args); if (a) P.gpuAdapter += 1; return a; };
  const rd = GPUAdapter.prototype.requestDevice;
  GPUAdapter.prototype.requestDevice = async function (...args) { const d = await rd.apply(this, args); P.deviceOk += 1; d.lost.then((i) => new BroadcastChannel('spawn-probe').postMessage({ kind: 'lost', reason: i.reason, message: String(i.message).slice(0, 160), t: Date.now() })); if (devices.length < 2) devices.push(d); return d; };
  const cbuf = GPUDevice.prototype.createBuffer;
  GPUDevice.prototype.createBuffer = function (desc) {
    const b = cbuf.call(this, Object.assign({}, desc, { usage: desc.usage | 4 }));
    if (!P.quiet && bufs.length < 500) bufs.push({ b, size: desc.size, usage: desc.usage, label: String(desc.label || '').slice(0, 60) });
    return b;
  };
  const ctex = GPUDevice.prototype.createTexture;
  GPUDevice.prototype.createTexture = function (desc) {
    const t = ctex.call(this, Object.assign({}, desc, { usage: desc.usage | 1 }));
    if (!P.quiet && texs.length < 200) {
      const size = Array.isArray(desc.size) ? desc.size : [desc.size.width, desc.size.height || 1];
      texs.push({ t, w: size[0], h: size[1] || 1, format: desc.format, usage: desc.usage, label: String(desc.label || '').slice(0, 60), dim: desc.dimension || '2d', mips: desc.mipLevelCount || 1, samples: desc.sampleCount || 1 });
      texIdx.set(t, texs.length - 1);
    }
    return t;
  };
  const cv = GPUTexture.prototype.createView;
  GPUTexture.prototype.createView = function (...args) { const v = cv.apply(this, args); viewTex.set(v, this); return v; };
  const sb = GPUQueue.prototype.submit;
  GPUQueue.prototype.submit = function (...args) { P.submit += 1; if (!P.quiet) { P.lastFrame = P.passLog; P.passLog = []; } return sb.apply(this, args); };
  const brp = GPUCommandEncoder.prototype.beginRenderPass;
  GPUCommandEncoder.prototype.beginRenderPass = function (desc) {
    P.beginRenderPass += 1;
    const atts = desc.colorAttachments || [];
    if (!P.quiet && P.passLog.length < 400) {
      P.passLog.push({ label: String(desc.label || '').slice(0, 60), targets: atts.map((a) => { const t = a && a.view ? viewTex.get(a.view) : undefined; const i = t ? texIdx.get(t) : undefined; return i === undefined ? '?' : i; }), loads: atts.map((a) => a && a.loadOp), clear: atts.map((a) => (a && a.clearValue ? [a.clearValue.r, a.clearValue.g, a.clearValue.b, a.clearValue.a] : null)) });
    }
    return brp.call(this, desc);
  };
  const dh = GPURenderPassEncoder.prototype.draw;
  GPURenderPassEncoder.prototype.draw = function (vc, ic, ...rest) { P.draw += 1; const k = vc + 'x' + (ic === undefined ? 1 : ic); P.drawHist[k] = (P.drawHist[k] || 0) + 1; return dh.call(this, vc, ic, ...rest); };
  const dix = GPURenderPassEncoder.prototype.drawIndexed;
  GPURenderPassEncoder.prototype.drawIndexed = function (...args) { P.drawIndexed += 1; return dix.apply(this, args); };
  const dsp = GPUComputePassEncoder.prototype.dispatchWorkgroups;
  GPUComputePassEncoder.prototype.dispatchWorkgroups = function (...args) { P.dispatch += 1; return dsp.apply(this, args); };
  const wb = GPUQueue.prototype.writeBuffer;
  GPUQueue.prototype.writeBuffer = function (...args) { P.writeBuffer += 1; return wb.apply(this, args); };
  const BPP = { 'rg11b10ufloat': 4, rgba8unorm: 4, 'rgba8unorm-srgb': 4, bgra8unorm: 4, 'bgra8unorm-srgb': 4, rgba8snorm: 4, rgb10a2unorm: 4, rgba16float: 8, rg32float: 8, rgba32float: 16, r32float: 4, r16float: 2, r8unorm: 1, rg8unorm: 2 };
  const readBuffer = async (device, src, size) => {
    P.quiet = true;
    try {
      const st = cbuf.call(device, { size, usage: 1 | 8 });
      const enc = device.createCommandEncoder();
      enc.copyBufferToBuffer(src, 0, st, 0, size);
      device.queue.submit([enc.finish()]);
      await st.mapAsync(1);
      const bytes = new Uint8Array(st.getMappedRange().slice(0));
      st.unmap();
      st.destroy();
      return bytes;
    } finally { P.quiet = false; }
  };
  const readTexture = async (device, rec) => {
    const bpp = BPP[rec.format];
    if (!bpp || rec.dim !== '2d' || rec.samples !== 1 || rec.mips !== 1) return null;
    const bytesPerRow = Math.ceil((rec.w * bpp) / 256) * 256;
    P.quiet = true;
    try {
      const st = cbuf.call(device, { size: bytesPerRow * rec.h, usage: 1 | 8 });
      const enc = device.createCommandEncoder();
      enc.copyTextureToBuffer({ texture: rec.t }, { buffer: st, bytesPerRow }, [rec.w, rec.h, 1]);
      device.queue.submit([enc.finish()]);
      await st.mapAsync(1);
      const u = new Uint8Array(st.getMappedRange().slice(0));
      st.unmap();
      st.destroy();
      const alphaBytes = rec.format === 'rgba16float' ? [6, 7] : rec.format.startsWith('rgba') ? [3] : [];
      let lit = 0;
      for (let y = 0; y < rec.h; y++) { for (let x = 0; x < rec.w; x++) { const o = y * bytesPerRow + x * bpp; let any = false; for (let c = 0; c < bpp; c++) { if (alphaBytes.includes(c)) continue; if (u[o + c] !== 0) any = true; } if (any) lit += 1; } }
      return { litRGBPixels: lit, pixels: rec.w * rec.h, format: rec.format };
    } finally { P.quiet = false; }
  };
  const readDepth = async (device, rec) => {
    P.quiet = true;
    try {
      const bytesPerRow = Math.ceil((rec.w * 4) / 256) * 256;
      const st = cbuf.call(device, { size: bytesPerRow * rec.h, usage: 1 | 8 });
      const enc = device.createCommandEncoder();
      enc.copyTextureToBuffer({ texture: rec.t, aspect: 'depth-only' }, { buffer: st, bytesPerRow }, [rec.w, rec.h, 1]);
      device.queue.submit([enc.finish()]);
      await st.mapAsync(1);
      const f = new Float32Array(st.getMappedRange().slice(0));
      st.unmap();
      st.destroy();
      const stride = bytesPerRow / 4;
      let nonzero = 0;
      let equalOne = 0;
      let otherNonzero = 0;
      let min = Infinity;
      let max = -Infinity;
      for (let y = 0; y < rec.h; y++) { for (let x = 0; x < rec.w; x++) { const v = f[y * stride + x]; if (v !== 0) nonzero += 1; if (v === 1) equalOne += 1; else if (v !== 0) otherNonzero += 1; if (v < min) min = v; if (v > max) max = v; } }
      return { nonzeroTexels: nonzero, texels: rec.w * rec.h, equalOne, otherNonzero, min, max };
    } finally { P.quiet = false; }
  };
  self.__probeScene = async () => {
    const device = devices[0];
    if (!device) return { error: 'no device recorded' };
    const out = { counts: { buffers: bufs.length, textures: texs.length }, buffers: [], textures: [], lastFrame: P.lastFrame.slice(0, 80) };
    const cands = bufs.filter((r) => r.size % 4 === 0 && r.size <= 8388608 && (r.usage & 0xe0));
    out.bufferCandidates = cands.length;
    for (const r of cands.slice(0, 120)) {
      try {
        const u = await readBuffer(device, r.b, r.size);
        const f = new Float32Array(u.buffer);
        let nz = 0;
        for (let i = 0; i < f.length; i++) { if (f[i] !== 0) nz += 1; }
        out.buffers.push({ label: r.label, size: r.size, usage: r.usage, nonzeroF32: nz, floats: f.length, first8: Array.from(f.slice(0, 8)).map((v) => Math.round(v * 1000) / 1000) });
      } catch (e) { out.buffers.push({ label: r.label, size: r.size, error: String(e.message).slice(0, 120) }); }
    }
    for (let i = 0; i < Math.min(texs.length, 80); i++) {
      const rec = texs[i];
      try { out.textures.push({ idx: i, label: rec.label, w: rec.w, h: rec.h, format: rec.format, usage: rec.usage, nonzeroBytes: rec.format === 'depth32float' ? await readDepth(device, rec) : await readTexture(device, rec) }); } catch (e) { out.textures.push({ idx: i, label: rec.label, error: String(e.message).slice(0, 120) }); }
    }
    return out;
  };
  const bcPost = BroadcastChannel.prototype.postMessage;
  BroadcastChannel.prototype.postMessage = function (m, ...rest) { if (m && m.kind === 'removed') new BroadcastChannel('spawn-probe').postMessage({ kind: 'posted-removed', names: m.names, t: Date.now(), stack: String(new Error().stack).split('\n').slice(1, 6).join(' | ').slice(0, 400) }); return bcPost.call(this, m, ...rest); };
  const ttib = OffscreenCanvas.prototype.transferToImageBitmap;
  OffscreenCanvas.prototype.transferToImageBitmap = function (...a) { P.toBitmap = (P.toBitmap || 0) + 1; return ttib.apply(this, a); };
  const cib = self.createImageBitmap;
  self.createImageBitmap = async function (...args) {
    const bmp = await cib.apply(this, args);
    P.createImageBitmap += 1;
    if (P.bitmapArgs.length < 3) P.bitmapArgs.push(args[0] && args[0].constructor ? args[0].constructor.name : typeof args[0]);
    if (P.createImageBitmap % 3 === 0 && bmp && bmp.width > 0) {
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
};
const probeInit = () => {
  if (window.__probe) return;
  const P = (window.__probe = { href: location.href.slice(0, 140), gpuAdapter: 0, gpuNoAdapter: 0, contexts: [], raf: 0, workers: [], errors: [], rejections: [], pointer: 0, keys: 0, locks: [], lost: [], frameSets: [], msgs: [] });
  const push = (list, v) => { if (list.length < 40) list.push(v); };
  window.addEventListener('error', (e) => push(P.errors, String(e.message || '').slice(0, 220)), true);
  window.addEventListener('unhandledrejection', (e) => push(P.rejections, String((e.reason && e.reason.message) || e.reason).slice(0, 220)));
  window.addEventListener('pointerdown', () => { P.pointer += 1; }, true);
  window.addEventListener('keydown', () => { P.keys += 1; }, true);
  window.addEventListener('message', (e) => { if (P.msgs.length < 80) P.msgs.push({ t: Date.now(), o: String(e.origin).slice(0, 40), s: JSON.stringify(e.data).slice(0, 180) }); });
  const bc = new BroadcastChannel('spawn-probe');
  bc.onmessage = (e) => push(P.lost, e.data);
  const srcDesc = Object.getOwnPropertyDescriptor(HTMLIFrameElement.prototype, 'src');
  const noteSrc = (el, v, via) => push(P.frameSets, { via, v: String(v).slice(0, 140), t: Date.now(), slot: el.getAttribute('data-spawn-kernel-frame') === null ? '' : 'kernel', stack: String(new Error().stack).split('\n').slice(2, 5).join(' | ').slice(0, 300) });
  Object.defineProperty(HTMLIFrameElement.prototype, 'src', { configurable: true, enumerable: srcDesc.enumerable, get: srcDesc.get, set(v) { noteSrc(this, v, 'prop'); return srcDesc.set.call(this, v); } });
  const sattr = Element.prototype.setAttribute;
  Element.prototype.setAttribute = function (n, v) { if (this instanceof HTMLIFrameElement && n === 'src') noteSrc(this, v, 'attr'); return sattr.call(this, n, v); };
  const note = (op, el) => { try { new BroadcastChannel('spawn-probe').postMessage({ kind: 'frame-op', op, tag: el ? el.tagName : '', src: el && el.getAttribute ? String(el.getAttribute('src')).slice(0, 90) : '', href: location.href.slice(0, 90), t: Date.now(), stack: String(new Error().stack).split('\n').slice(2, 5).join(' | ').slice(0, 300) }); } catch (e) {} };
  const wterm = Worker.prototype.terminate;
  Worker.prototype.terminate = function () { note('worker-terminate', null); return wterm.call(this); };
  const raa = Element.prototype.removeAttribute;
  Element.prototype.removeAttribute = function (n) { if (n === 'src' && this.tagName === 'IFRAME') note('removeAttribute-src', this); return raa.call(this, n); };
  const rch = Node.prototype.removeChild;
  Node.prototype.removeChild = function (c) { if (c && c.tagName === 'IFRAME') note('removeChild', c); return rch.call(this, c); };
  const rmv = Element.prototype.remove;
  Element.prototype.remove = function () { if (this.tagName === 'IFRAME') note('remove', this); return rmv.call(this); };
  const dop = Document.prototype.open;
  Document.prototype.open = function (...a) { note('document.open', null); return dop.apply(this, a); };
  const bcp = BroadcastChannel.prototype.postMessage;
  BroadcastChannel.prototype.postMessage = function (m, ...rest) { if (m && m.kind === 'removed') push(P.lost, { kind: 'main-posted-removed', names: m.names, t: Date.now(), stack: String(new Error().stack).split('\n').slice(1, 6).join(' | ').slice(0, 400) }); return bcp.call(this, m, ...rest); };
  const lk = LockManager.prototype.request;
  LockManager.prototype.request = function (name, ...rest) { if (typeof name === 'string' && /play-slot|gpu-pool-slot/.test(name)) push(P.locks, { name, t: Date.now() }); return lk.call(this, name, ...rest); };
  if (navigator.gpu) {
    const gp = Object.getPrototypeOf(navigator.gpu);
    const ra = gp.requestAdapter;
    gp.requestAdapter = async function (...args) { const a = await ra.apply(this, args); if (a) P.gpuAdapter += 1; else P.gpuNoAdapter += 1; return a; };
  }
  const gc = HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext = function (kind, ...rest) { const c = gc.call(this, kind, ...rest); push(P.contexts, { kind, w: this.width, h: this.height, ok: !!c }); return c; };
  const tco = HTMLCanvasElement.prototype.transferControlToOffscreen;
  HTMLCanvasElement.prototype.transferControlToOffscreen = function (...args) { P.offscreen = (P.offscreen || 0) + 1; return tco.apply(this, args); };
  const tfib = ImageBitmapRenderingContext.prototype.transferFromImageBitmap;
  ImageBitmapRenderingContext.prototype.transferFromImageBitmap = function (...args) { P.bitmapPresent = (P.bitmapPresent || 0) + 1; return tfib.apply(this, args); };
};
const closes = [];
const handles = [];
const failures = [];
const responses = [];
const consoleLines = [];
const t0 = Date.now();
await context.addInitScript(probeInit);
if (TARGET.startsWith('http://127.0.0.1')) await context.route((u) => new URL(u).pathname === '/ready-plate', (r) => r.fulfill({ status: 200, contentType: 'text/html', body: '' }));
context.on('requestfailed', (r) => { if (failures.length < 300) failures.push(r.method() + ' ' + r.failure().errorText + ' ' + r.url().slice(0, 200)); });
context.on('response', (res) => { if (res.status() >= 400 && responses.length < 300) responses.push(res.status() + ' ' + res.request().method() + ' ' + res.url().slice(0, 200)); });
const events = [];
const page = await context.newPage();
page.on('framedetached', (f) => events.push({ kind: 'frame-detached', url: f.url().slice(0, 90), t: Date.now() }));
page.on('framenavigated', (f) => events.push({ kind: 'frame-navigated', url: f.url().slice(0, 90), t: Date.now() }));
page.on('close', () => events.push({ kind: 'page-close', t: Date.now() }));
page.on('console', (m) => { if (consoleLines.length < 800) consoleLines.push(m.type() + ' ' + m.location().url.slice(0, 120) + ' :: ' + m.text().slice(0, 300)); });
page.on('pageerror', (e) => { if (consoleLines.length < 800) consoleLines.push('PAGEERROR ' + String(e.message).slice(0, 300)); });
page.on('worker', (w) => {
  const h = { url: w.url().slice(0, 140), patch: null, w, openedMs: Date.now() - t0, closedMs: null };
  handles.push(h);
  w.on('close', () => { h.closedMs = Date.now() - t0; h.closedAt = Date.now(); });
  w.evaluate(workerInit).then(() => { h.patch = 'ok'; }, (e) => { h.patch = 'fail ' + String(e.message).slice(0, 120); });
});
await page.setViewportSize({ width: 1280, height: 800 });
await page.goto(TARGET, { waitUntil: 'commit', timeout: 120000 }).catch((e) => consoleLines.push('NAV ' + String(e.message).slice(0, 200)));
await wait(15000);
const workerSnap = async () => {
  const out = [];
  for (const h of handles) {
    const probe = await capped(h.w.evaluate(() => (self.__probe ? JSON.parse(JSON.stringify(self.__probe)) : null)).catch((e) => 'eval-fail ' + String(e.message).slice(0, 80)), 8000, 'eval-timeout');
    out.push({ url: h.url, patch: h.patch, openedMs: h.openedMs, closedMs: h.closedMs, probe });
  }
  return out;
};
const sceneSnap = async () => {
  const out = [];
  for (const h of handles) {
    if (!h.url.includes('#eye=follows') || h.closedMs !== null) continue;
    const s = await capped(h.w.evaluate(() => (self.__probeScene ? self.__probeScene() : 'no scene fn')).catch((e) => 'eval-fail ' + String(e.message).slice(0, 120)), 150000, 'scene-timeout');
    out.push({ url: h.url, scene: s });
  }
  return out;
};
const snap = async (label) => {
  const frames = [];
  for (const f of page.frames()) {
    const probe = await capped(f.evaluate(() => (window.__probe ? JSON.parse(JSON.stringify(window.__probe)) : null)).catch((e) => 'eval-fail ' + String(e.message).slice(0, 80)), 8000, 'eval-timeout');
    frames.push({ url: f.url().slice(0, 140), probe });
  }
  const html = await capped(page.evaluate(() => ({ shown: document.documentElement.classList.contains('spawn-world-shown'), stood: document.documentElement.hasAttribute('data-spawn-stood'), coi: window.crossOriginIsolated, reason: (window.__spawnHeldDocumentReleased || {}).reason || null, active: document.activeElement ? document.activeElement.tagName : null })).catch((e) => 'eval-fail'), 8000, 'eval-timeout');
  return { label, html, frames, workers: await workerSnap() };
};
const before = await snap('before-click');
await page.screenshot({ path: OUT + '/before.png' }).catch(() => {});
await page.evaluate(() => { if (document.activeElement) document.activeElement.blur(); document.body.focus(); }).catch(() => {});
await page.keyboard.press('Space').catch(() => {});
await wait(30000);
const after = await snap('after-key');
const sessionFrame = page.frames().find((f) => f.url().includes('/session/world'));
after.presentSample = await capped((sessionFrame || page).evaluate(() => {
  const c = document.querySelector('canvas[data-spawn-present-surface]');
  if (!c) return { found: false };
  const k = document.createElement('canvas');
  k.width = c.width;
  k.height = c.height;
  const g = k.getContext('2d');
  g.drawImage(c, 0, 0);
  const d = g.getImageData(0, 0, k.width, k.height).data;
  let lit = 0;
  let sum = 0;
  for (let i = 0; i < d.length; i += 4) { const v = d[i] + d[i + 1] + d[i + 2]; if (v > 0) lit += 1; sum += v; }
  return { found: true, w: k.width, h: k.height, nonBlackPixels: lit, meanBrightness: Math.round((sum / (d.length / 4)) * 100) / 100 };
}).catch((e) => 'eval-fail ' + String(e.message).slice(0, 120)), 60000, 'sample-timeout');
after.scene = await sceneSnap();
await page.screenshot({ path: OUT + '/after.png' }).catch(() => {});
fs.writeFileSync(OUT + '/scene.json', JSON.stringify({ before, after, closes: handles.map((h) => ({ url: h.url, openedMs: h.openedMs, closedMs: h.closedMs, closedAt: h.closedAt || null })), failures, responses, events }, null, 1));
fs.writeFileSync(OUT + '/console.txt', consoleLines.join('\n') + '\n');
console.log(JSON.stringify({ html: after.html, workers: after.workers.length, scene: after.scene.map((s) => ({ url: s.url.slice(0, 60), keys: s.scene && typeof s.scene === 'object' ? Object.keys(s.scene) : String(s.scene) })), closed: handles.filter((h) => h.closedMs !== null).length }));
if (TARGET.startsWith('http://127.0.0.1')) { const misses = await fetch('http://127.0.0.1:4173/__misses').then((x) => x.text()).catch((e) => 'misses-fetch-failed ' + e.message); fs.writeFileSync(OUT + '/misses.txt', misses); }
await page.close();
