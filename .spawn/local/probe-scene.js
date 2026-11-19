
const fs = require('fs');
const OUT = '__OUT__';
const TARGET = '__TARGET__';
const KEEP_PREBORN = __KEEP__ === 1;
fs.mkdirSync(OUT, { recursive: true });
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const capped = (p, ms, label) => Promise.race([p, wait(ms).then(() => label)]);
const workerInit = () => {
  const P = (self.__probe = { hasGpu: !!navigator.gpu, gpuAdapter: 0, deviceOk: 0, submit: 0, beginRenderPass: 0, draw: 0, drawIndexed: 0, dispatch: 0, writeBuffer: 0, drawHist: {}, passLog: [], lastFrame: [], bitmapArgs: [], createImageBitmap: 0, frameSamples: [], quiet: false, errors: [], lost: [] });
  const hashBytes = (d) => { let h = 2166136261; for (let i = 0; i < d.length; i += 1) { h ^= d[i]; h = Math.imul(h, 16777619); } return (h >>> 0).toString(16); };
  if (typeof ImageBitmapRenderingContext !== 'undefined' && typeof document !== 'undefined' && __READ__ === 1) {
    window.__displayed = [];
    const tfb = ImageBitmapRenderingContext.prototype.transferFromImageBitmap;
    ImageBitmapRenderingContext.prototype.transferFromImageBitmap = function (b) {
      let entry;
      try {
        const k = new OffscreenCanvas(b.width, b.height);
        const kg = k.getContext('2d', { willReadFrequently: true });
        kg.drawImage(b, 0, 0);
        const d = kg.getImageData(0, 0, b.width, b.height).data;
        let lit = 0;
        for (let i = 0; i < d.length; i += 4) { if (d[i] + d[i + 1] + d[i + 2] > 0) lit += 1; }
        entry = { lit, hash: hashBytes(d), w: b.width, h: b.height };
      } catch (e) { entry = { error: String(e.message).slice(0, 120) }; }
      if (window.__displayed.length < 400) window.__displayed.push(entry);
      return tfb.call(this, b);
    };
  }
  const fnvView = (v) => { const u = new Uint8Array(v.buffer, v.byteOffset, Math.min(v.byteLength, 4096)); let h = 2166136261; for (let i = 0; i < u.length; i += 1) { h ^= u[i]; h = Math.imul(h, 16777619); } return (h >>> 0).toString(16); };
  const frameWrites = [];
  const bufLabel = new WeakMap();
  let lastArrival = null;
  const clockStamp = () => Math.round(performance.now() * 1000) / 1000;
  P.frameClock = [];
  P.framePosts = [];
  const clockPush = (v) => { if (v.k === 'raf') lastArrival = v.t; if (P.frameClock.length < 6000) P.frameClock.push(v); };
  const raf0 = self.requestAnimationFrame.bind(self);
  self.requestAnimationFrame = (cb) => raf0((t) => { clockPush({ k: 'raf', cb: cb.name, t: Math.round(t * 1000) / 1000, now: clockStamp() }); return cb(t); });
  const st0 = self.setTimeout.bind(self);
  self.setTimeout = (cb, ms, ...a) => { if (typeof cb !== 'function') return st0(cb, ms, ...a); return st0((...x) => { if (cb.name === 'dm5') clockPush({ k: 'timer', cb: cb.name, ms, now: clockStamp() }); return cb(...x); }, ms, ...a); };
  const pm0 = self.postMessage.bind(self);
  let lastSubmits = 0;
  self.postMessage = function (m, ...rest) { if (m && m.kind === 'frame-bitmap' && P.framePosts.length < 400) { const big = frameWrites.reduce((a, w) => (a === null || w.n > a.n ? w : a), null); P.framePosts.push({ frameId: m.frameId, now: clockStamp(), submits: P.submit - lastSubmits, writes: frameWrites.length, fps: frameWrites.map((w) => w.fp), fs: frameWrites.map((w) => w.f), hw: frameWrites.map((w) => ({ l: w.label, n: w.n, h: w.hits })), big: big ? { n: big.n, f: big.f } : null }); } if (m && m.kind === 'frame-bitmap') { frameWrites.length = 0; lastSubmits = P.submit; } return pm0(m, ...rest); };
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
  gp.requestAdapter = async function (...args) { P.adapterCalls = (P.adapterCalls || 0) + 1; try { const a = await ra.apply(this, args); if (a) P.gpuAdapter += 1; else P.adapterNull = (P.adapterNull || 0) + 1; return a; } catch (e) { P.adapterErr = String(e.message).slice(0, 160); throw e; } };
  const rd = GPUAdapter.prototype.requestDevice;
  GPUAdapter.prototype.requestDevice = async function (...args) { const d = await rd.apply(this, args); P.deviceOk += 1; d.addEventListener('uncapturederror', (ev) => { if ((P.uncaptured || []).length < 6) P.uncaptured = (P.uncaptured || []).concat([String(ev.error.message).slice(0, 420)]); }); d.lost.then((i) => new BroadcastChannel('spawn-probe').postMessage({ kind: 'lost', reason: i.reason, message: String(i.message).slice(0, 160), t: Date.now() })); if (devices.length < 2) devices.push(d); return d; };
  const cbuf = GPUDevice.prototype.createBuffer;
  GPUDevice.prototype.createBuffer = function (desc) {
    const b = cbuf.call(this, Object.assign({}, desc, { usage: desc.usage & 3 ? desc.usage : desc.usage | 4 }));
    if (!P.quiet && bufs.length < 500) bufs.push({ b, size: desc.size, usage: desc.usage, label: String(desc.label || '').slice(0, 60) });
    bufLabel.set(b, String(desc.label || '').slice(0, 60) + '|' + desc.size + '|' + desc.usage);
    return b;
  };
  const ctex = GPUDevice.prototype.createTexture;
  GPUDevice.prototype.createTexture = function (desc) {
    const t = ctex.call(this, desc);
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
  GPUQueue.prototype.submit = function (...args) { P.submit += 1; if (!P.quiet) { P.lastFrame = P.passLog; P.passLog = []; } const doneAt = performance.now();
    this.onSubmittedWorkDone().then(() => { P.gpuDone = P.gpuDone || []; if (P.gpuDone.length < 400) P.gpuDone.push({ ms: Math.round((performance.now() - doneAt) * 10) / 10, at: Math.round(performance.now() * 10) / 10 }); });
    return sb.apply(this, args); };
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
  GPUQueue.prototype.writeBuffer = function (...args) {
    P.writeBuffer += 1;
    const src = args[2];
    if (src && frameWrites.length < 400) {
      const v = ArrayBuffer.isView(src) ? src : new Uint8Array(src);
      const f = v.byteLength >= 16 && v.byteOffset % 4 === 0 ? Array.from(new Float32Array(v.buffer, v.byteOffset, Math.min(32, Math.floor(v.byteLength / 4)))) : null;
      const hits = [];
      if (lastArrival !== null) {
        const dv = new DataView(v.buffer, v.byteOffset, v.byteLength);
        const A = lastArrival;
        for (let k = 0; k + 4 <= v.byteLength; k += 1) { const x = dv.getFloat32(k, true); const dt = x * 1000 - A; if (dt > -50 && dt < 50) hits.push([k, x, Math.round(dt * 100) / 100]); }
      }
      frameWrites.push({ n: v.byteLength, fp: fnvView(v), f, label: bufLabel.get(args[0]) || '?', hits: hits.slice(0, 40) });
    }
    return wb.apply(this, args);
  };
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
    if ((rec.t.usage & 1) === 0) return { skipped: 'no COPY_SRC', usage: rec.t.usage };
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
    if ((rec.t.usage & 1) === 0) return { skipped: 'no COPY_SRC', usage: rec.t.usage };
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
  const diagNoCopy = async (device, list) => {
    const rec = list.find((r) => r.label === 'lume post picture' && (r.t.usage & 1) === 0) || list.find((r) => (r.t.usage & 1) === 0);
    if (!rec) return null;
    const bytesPerRow = Math.ceil((rec.w * 4) / 256) * 256;
    device.pushErrorScope('validation');
    let thrown = null;
    let st = null;
    try {
      st = cbuf.call(device, { size: bytesPerRow * rec.h, usage: 1 | 8 });
      const enc = device.createCommandEncoder();
      enc.copyTextureToBuffer({ texture: rec.t }, { buffer: st, bytesPerRow }, [rec.w, rec.h, 1]);
      device.queue.submit([enc.finish()]);
    } catch (e) { thrown = String(e.message).slice(0, 200); }
    const scope = await device.popErrorScope();
    let lit = null;
    if (st && !scope && !thrown) {
      try {
        await st.mapAsync(1);
        const u = new Uint8Array(st.getMappedRange().slice(0));
        st.unmap();
        lit = 0;
        for (let y = 0; y < rec.h; y += 1) for (let x = 0; x < rec.w; x += 1) { const o = y * bytesPerRow + x * 4; if (u[o] + u[o + 1] + u[o + 2] > 0) lit += 1; }
      } catch (err) { lit = 'map: ' + String(err.message).slice(0, 120); }
    }
    return { label: rec.label, idx: list.indexOf(rec), usage: rec.t.usage, thrown, error: scope ? String(scope.message).slice(0, 200) : null, lit };
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
    out.noCopyDiag = await diagNoCopy(device, texs);
    for (let i = 0; i < Math.min(texs.length, 80); i++) {
      const rec = texs[i];
      try { out.textures.push({ idx: i, label: rec.label, w: rec.w, h: rec.h, format: rec.format, usage: rec.usage, actualUsage: rec.t.usage, nonzeroBytes: rec.format === 'depth32float' ? await readDepth(device, rec) : await readTexture(device, rec) }); } catch (e) { out.textures.push({ idx: i, label: rec.label, error: String(e.message).slice(0, 120) }); }
    }
    return out;
  };
  const bcPost = BroadcastChannel.prototype.postMessage;
  BroadcastChannel.prototype.postMessage = function (m, ...rest) { if (m && m.kind === 'removed') new BroadcastChannel('spawn-probe').postMessage({ kind: 'posted-removed', names: m.names, t: Date.now(), stack: String(new Error().stack).split('\n').slice(1, 6).join(' | ').slice(0, 400) }); return bcPost.call(this, m, ...rest); };
  const sendBitmap = (b, via) => {
    if (__READ__ === 0) return -1;
    const rs = performance.now();
    const bc = new BroadcastChannel('spawn-probe');
    try {
      const c = new OffscreenCanvas(b.width, b.height);
      const g = c.getContext('2d', { willReadFrequently: true });
      g.drawImage(b, 0, 0);
      const d = g.getImageData(0, 0, b.width, b.height).data;
      let lit = 0;
      let alpha = 0;
      for (let i = 0; i < d.length; i += 4) { if (d[i] + d[i + 1] + d[i + 2] > 0) lit += 1; if (d[i + 3] > 0) alpha += 1; }
      P.bitmapAlpha = alpha;
      P.bitmapHash = hashBytes(d);
      P.bitmapSamples = (P.bitmapSamples || []).concat([{ via, w: b.width, h: b.height, lit, alpha, pixels: b.width * b.height, t: Date.now() }]).slice(-12); return lit;
    } catch (e) { P.bitmapSamples = (P.bitmapSamples || []).concat([{ via, error: String(e.message).slice(0, 80), t: Date.now() }]).slice(-12); return -1; } finally { P.readMs = Math.round(((P.readMs || 0) + performance.now() - rs) * 10) / 10; }
  };
  const ttib = OffscreenCanvas.prototype.transferToImageBitmap;
  const keepRow = (name, row) => { if (!P[name]) P[name] = []; if (P[name].length < 400) P[name].push(row); };
  const ctrlCanvas = new OffscreenCanvas(640, 400);
  const ctrlCtx = ctrlCanvas.getContext('2d', { willReadFrequently: true });
  ctrlCtx.fillStyle = '#ff0000';
  ctrlCtx.fillRect(0, 0, 640, 400);
  const ctrlPre = Array.from(ctrlCtx.getImageData(0, 0, 1, 1).data);
  const ctrlBitmap = ttib.call(ctrlCanvas);
  const ctrlSample = (() => { const k = new OffscreenCanvas(640, 400); const kg = k.getContext('2d', { willReadFrequently: true }); kg.drawImage(ctrlBitmap, 0, 0); return Array.from(kg.getImageData(0, 0, 1, 1).data); })();
  P.control = { pre: ctrlPre, sample: ctrlSample, lit: sendBitmap(ctrlBitmap, 'control'), alpha: P.bitmapAlpha, w: ctrlBitmap.width, h: ctrlBitmap.height };
  const copyCanvas = new OffscreenCanvas(640, 400);
  const copyCtx = copyCanvas.getContext('2d', { willReadFrequently: true });
  copyCtx.fillStyle = '#ff0000';
  copyCtx.fillRect(0, 0, 640, 400);
  Promise.resolve(self.createImageBitmap(copyCanvas)).then((cbm) => { P.control.copy = { lit: sendBitmap(cbm, 'control-copy'), alpha: P.bitmapAlpha, w: cbm.width, h: cbm.height }; }, (err) => { P.control.copy = { error: String(err.message).slice(0, 120) }; });
  let canvasSeq = 0;
  const canvasIds = new WeakMap();
  const canvasId = (c) => { if (!c) return null; if (!canvasIds.has(c)) { canvasSeq += 1; canvasIds.set(c, canvasSeq); } return canvasIds.get(c); };
  OffscreenCanvas.prototype.transferToImageBitmap = function (...a) {
    P.toBitmap = (P.toBitmap || 0) + 1;
    const n = P.toBitmap;
    const d = lastDst;
    const fromCopiedCanvas = d ? d.canvas === this : null;
    const gctBetween = d ? (P.gctCalls || 0) - d.gctAt : null;
    const frames = String(new Error().stack).split('\n').slice(2, 4).map((x) => x.trim().slice(0, 90));
    const pre = d ? readCopy(d.dst) : null;
    const presentedFrom = lastResolved;
    const b = ttib.apply(this, a);
    const lit = sendBitmap(b, 'transferToImageBitmap');
    if (!P.transferLog) P.transferLog = [];
    if (P.transferLog.length < 400) P.transferLog.push({ n, lit, alpha: P.bitmapAlpha, hash: P.bitmapHash, w: b.width, h: b.height, fromCopiedCanvas, copyCanvasId: d ? canvasId(d.canvas) : null, transferCanvasId: canvasId(this), gctBetween, frames, presentedIdx: presentedFrom ? presentedFrom.idx : null, presentedLit: presentedFrom ? presentedFrom.lit : null });
    if (pre) settle({ idx: n, w: d.w, h: d.h }, 'before-transfer', pre).then((row) => keepRow('transferPre', Object.assign(row, { n, fromCopiedCanvas })));
    return b;
  };
  const lastCopies = [];
  let lastResolved = null;
  const texCanvas = new WeakMap();
  let lastDst = null;
  const gct = GPUCanvasContext.prototype.getCurrentTexture;
  GPUCanvasContext.prototype.getCurrentTexture = function () { const tx = gct.call(this); P.gctCalls = (P.gctCalls || 0) + 1; texCanvas.set(tx, this.canvas); return tx; };
  const gcfg = GPUCanvasContext.prototype.configure;
  GPUCanvasContext.prototype.configure = function (c) { P.canvasConfig = { alphaMode: c && c.alphaMode, format: c && c.format, configures: ((P.canvasConfig && P.canvasConfig.configures) || 0) + 1 }; return gcfg.call(this, c); };
  const readCopy = (tex) => {
    try {
      const device = devices[0];
      const bytesPerRow = tex.width * 4;
      const st = cbuf.call(device, { size: bytesPerRow * tex.height, usage: 1 | 8 });
      const enc = device.createCommandEncoder();
      enc.copyTextureToBuffer({ texture: tex }, { buffer: st, bytesPerRow }, [tex.width, tex.height, 1]);
      sb.call(device.queue, [enc.finish()]);
      return { st, bytesPerRow, w: tex.width, h: tex.height };
    } catch (e) {
      return { error: String(e.message).slice(0, 160) };
    }
  };
  const readCopyCmd = (tex) => {
    try {
      const device = devices[0];
      const bytesPerRow = tex.width * 4;
      const st = cbuf.call(device, { size: bytesPerRow * tex.height, usage: 1 | 8 });
      const enc = device.createCommandEncoder();
      enc.copyTextureToBuffer({ texture: tex }, { buffer: st, bytesPerRow }, [tex.width, tex.height, 1]);
      return { st, bytesPerRow, w: tex.width, h: tex.height, cmd: enc.finish() };
    } catch (e) {
      return { error: String(e.message).slice(0, 160) };
    }
  };
  const countLit = async (r) => {
    if (r.error) throw new Error(r.error);
    await r.st.mapAsync(1);
    const d = new Uint8Array(r.st.getMappedRange());
    let lit = 0;
    let alpha = 0;
    for (let y = 0; y < r.h; y += 1) for (let x = 0; x < r.w; x += 1) { const o = y * r.bytesPerRow + x * 4; if (d[o] + d[o + 1] + d[o + 2] > 0) lit += 1; if (d[o + 3] > 0) alpha += 1; }
    r.st.unmap();
    r.alpha = alpha;
    return lit;
  };
  const settle = (c, phase, r) => countLit(r).then((lit) => ({ idx: c.idx, phase, lit, alpha: r.alpha, srcIdx: c.srcIdx ?? null, dstIdx: c.dstIdx ?? null, pixels: c.w * c.h }), (e) => ({ idx: c.idx, phase, error: String(e.message).slice(0, 160) }));
  const cts = GPUCommandEncoder.prototype.copyTextureToTexture;
  GPUCommandEncoder.prototype.copyTextureToTexture = function (src, dst, size) {
    P.copies = (P.copies || 0) + 1;
    lastCopies.push({ idx: P.copies, src: src.texture, dst: dst.texture, canvas: texCanvas.get(dst.texture) || null, gctAt: P.gctCalls || 0, srcIdx: texIdx.get(src.texture) ?? null, dstIdx: texIdx.get(dst.texture) ?? null, w: src.texture.width, h: src.texture.height });
    return cts.call(this, src, dst, size);
  };
  const sq = GPUQueue.prototype.submit;
  GPUQueue.prototype.submit = function (...args) {
    const batch = lastCopies.splice(0);
    const pre = batch.map((c) => ({ c, r: readCopy(c.src) }));
    const dstBefore = batch.map((c) => ({ c, r: readCopy(c.dst) }));
    const post = batch.map((c) => ({ c, r: readCopyCmd(c.dst) }));
    const cmds = post.map((x) => x.r.cmd).filter(Boolean);
    const sameSubmit = cmds.length > 0 && Array.isArray(args[0]);
    const out = sameSubmit ? sq.apply(this, [[...args[0], ...cmds], ...args.slice(1)]) : sq.apply(this, args);
    if (cmds.length && !sameSubmit) sb.call(this, cmds);
    const dstAfter = batch.map((c) => ({ c, r: readCopy(c.dst) }));
    if (batch.length) {
      lastDst = batch[batch.length - 1];
      Promise.all([
        ...pre.map((x) => settle(x.c, 'before', x.r)),
        ...dstBefore.map((x) => settle(x.c, 'dst-before-submit', x.r)),
        ...post.map((x) => settle(x.c, 'after-same-submit', x.r).then((row) => { if (row.lit !== undefined && (!lastResolved || row.idx > lastResolved.idx)) lastResolved = row; return row; })),
        ...dstAfter.map((x) => settle(x.c, 'dst-after-submit', x.r)),
      ]).then((rows) => { P.copyReads = (P.copyReads || []).concat(rows).slice(-800); });
    }
    return out;
  };
  const cib = self.createImageBitmap;
  self.createImageBitmap = async function (...args) {
    const bmp = await cib.apply(this, args);
    sendBitmap(bmp, 'createImageBitmap');
    P.createImageBitmap += 1;
    if (P.bitmapArgs.length < 3) P.bitmapArgs.push(args[0] && args[0].constructor ? args[0].constructor.name : typeof args[0]);
    if (P.createImageBitmap % 3 === 0 && bmp && bmp.width > 0) {
      try {
        const c = new OffscreenCanvas(bmp.width, bmp.height);
        const g = c.getContext('2d', { willReadFrequently: true });
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
const probeInit = (cfg) => {
  const keep = cfg.keep;
  const force = cfg.force;
  const forced = (v) => { const s = String(v); if (!force || !s.includes('/session/world') || s.includes('presentRoad=')) return v; return s + (s.includes('?') ? '&' : '?') + 'presentRoad=' + force; };
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
  Object.defineProperty(HTMLIFrameElement.prototype, 'src', { configurable: true, enumerable: srcDesc.enumerable, get: srcDesc.get, set(v) { const w = forced(v); noteSrc(this, w, 'prop'); return srcDesc.set.call(this, w); } });
  const sattr = Element.prototype.setAttribute;
  Element.prototype.setAttribute = function (n, v) { const w = this instanceof HTMLIFrameElement && n === 'src' ? forced(v) : v; if (this instanceof HTMLIFrameElement && n === 'src') noteSrc(this, w, 'attr'); return sattr.call(this, n, w); };
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
  if (keep) {
    const wt = Worker.prototype.terminate;
    Worker.prototype.terminate = function () {
      const pre = window.__spawnPrebornRendererWorker;
      if (pre && pre.worker === this) return undefined;
      return wt.call(this);
    };
  }
  const fnvBytes = (d) => { let h = 2166136261; for (let i = 0; i < d.length; i += 1) { h ^= d[i]; h = Math.imul(h, 16777619); } return (h >>> 0).toString(16); };
  const litOf = (g, w, h) => { const d = g.getImageData(0, 0, w, h).data; let lit = 0; for (let i = 0; i < d.length; i += 4) { if (d[i] + d[i + 1] + d[i + 2] > 0) lit += 1; } return { w, h, lit, pixels: w * h, hash: fnvBytes(d) }; };
  const sampleSource = (b) => { try { const c = new OffscreenCanvas(b.width, b.height); const g = c.getContext('2d', { willReadFrequently: true }); g.drawImage(b, 0, 0); return litOf(g, b.width, b.height); } catch (e) { return { error: String(e.message).slice(0, 80) }; } };
  const tfibPre = ImageBitmapRenderingContext.prototype.transferFromImageBitmap;
  ImageBitmapRenderingContext.prototype.transferFromImageBitmap = function (bitmap, ...rest) {
    const ctx = this;
    (window.__sinkCanvases ||= new WeakSet()).add(ctx.canvas);
    (window.__transferTimes ||= []).push(Date.now());
    if (bitmap && __READ__ === 1) { const pc = sampleSource(bitmap); P.presentPre = (P.presentPre || []).concat([pc]).slice(-12); (window.__pageCalls ||= []).push(pc); }
    const out = tfibPre.call(this, bitmap, ...rest);
    if (__READ__ === 1) setTimeout(() => { try { const k = new OffscreenCanvas(ctx.canvas.width, ctx.canvas.height); const g = k.getContext('2d', { willReadFrequently: true }); g.drawImage(ctx.canvas, 0, 0); P.presentPost = (P.presentPost || []).concat([litOf(g, ctx.canvas.width, ctx.canvas.height)]).slice(-12); } catch (e) { P.presentPost = (P.presentPost || []).concat([{ error: String(e.message).slice(0, 80) }]).slice(-12); } }, 400);
    return out;
  };
  const WorkerCtor = window.Worker;
  window.Worker = function (url, opts) {
    const w = new WorkerCtor(url, opts);
    w.addEventListener('message', (e) => {
      const d = e.data;
      const kind = d && typeof d === 'object' && typeof d.kind === 'string' ? d.kind : typeof d;
      P.workerKinds = P.workerKinds || {};
      P.workerKinds[kind] = (P.workerKinds[kind] || 0) + 1;
      if (kind === 'adapter-answer') P.adapter = JSON.stringify(d).slice(0, 400);
      if (d && typeof d === 'object') { const ty = String(d.type ?? d.kind ?? ''); if (/road|canvas|readback|present/i.test(ty)) P.typed = (P.typed || []).concat([{ ty, browser: d.browser ?? null, key: d.key ?? null, death: d.death ?? null, road: d.road ?? null }]).slice(-12); }
      if (kind === 'object') { const ks = d && typeof d === 'object' ? Object.keys(d).sort().join(',') : typeof d; P.objKeys = P.objKeys || {}; if (ks in P.objKeys || Object.keys(P.objKeys).length < 12) P.objKeys[ks] = (P.objKeys[ks] || 0) + 1; if (d && typeof d === 'object' && typeof ImageBitmap !== 'undefined' && Object.values(d).some((v) => v instanceof ImageBitmap)) P.objBitmaps = (P.objBitmaps || 0) + 1; }
      if (kind === 'present-road-settled' || kind === 'device-canvas-road-lost') P.roadEvents = (P.roadEvents || []).concat([{ kind, road: d.road ?? null, surfaceGone: d.surfaceGone ?? null, key: d.key ?? null, death: d.death ?? null }]).slice(-6);
      if (kind === 'frame-bitmap' && d.bitmap) P.frameBitmaps = (P.frameBitmaps || []).concat([{ w: d.bitmap.width, h: d.bitmap.height, id: d.frameId }]).slice(-8);
    });
    return w;
  };
  window.Worker.prototype = WorkerCtor.prototype;
  for (const lvl of ['log', 'info', 'debug']) {
    const orig = console[lvl].bind(console);
    console[lvl] = (...args) => { const s = args.map(String).join(' '); if (s.includes('present road')) new BroadcastChannel('spawn-probe').postMessage({ kind: 'road-log', text: s.slice(0, 240), t: Date.now() }); return orig(...args); };
  }
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
const routeHits = [];
const consoleLines = [];
const t0 = Date.now();
await context.addInitScript(probeInit, { keep: KEEP_PREBORN, force: '__FORCE__' });
await context.route(/\.m?js(\?|$)/, async (route) => {
  const req = route.request();
  const u = req.url().replace(/^.*\/pool\//, '');
  const hit = { u: u.slice(0, 60), type: req.resourceType() };
  routeHits.push(hit);
  return route.continue();
});
await context.route(/6d66a223-/, async (route) => {
  const response = await route.fetch();
  const src = await response.text();
  const id = route.request().url().match(/6d66a223-[0-9a-f]+/)[0];
  const needle = 'function vq(e,t,r=rq,i=!1,n=!1,l=null,s=!1){';
  if (src.split(needle).length !== 2) return route.fulfill({ response, body: src });
  const show = (x) => (x === null ? 'null' : typeof x === 'object' ? JSON.stringify(x).slice(0, 80) : String(x));
  const wrapper = 'function vq(...a){const out=vq0(...a);try{new BroadcastChannel("spawn-probe").postMessage({kind:"vq-call",variant:"' + id + '",args:a.map(' + show.toString() + ').slice(0,7),out:out});}catch(_){}return out;}function vq0(e,t,r=rq,i=!1,n=!1,l=null,s=!1){';
  return route.fulfill({ response, body: src.replace(needle, wrapper) });
});
await context.route(/\.m?js(\?|$)/, async (route) => {
  const req = route.request();
  const u = req.url().replace(/^.*\/pool\//, '');
  const hit = { u: u.slice(0, 60), type: req.resourceType() };
  routeHits.push(hit);
  return route.fallback();
});
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
let gestureTries = 0;
let gestureShown = false;
const gestureLog = [];
await page.evaluate(() => { window.__topKeys = 0; window.addEventListener('keydown', () => { window.__topKeys += 1; }, true); }).catch(() => {});
for (let g = 0; g < 20 && !gestureShown; g += 1) {
  gestureTries += 1;
  await page.evaluate(() => { if (document.activeElement) document.activeElement.blur(); document.body.focus(); }).catch(() => {});
  await page.keyboard.press('Space').catch(() => {});
  await wait(2000);
  const gs = await page.evaluate(() => ({ shown: document.documentElement.classList.contains('spawn-world-shown'), keys: window.__topKeys, active: document.activeElement ? document.activeElement.tagName : null, focus: document.hasFocus() })).catch(() => null);
  gestureLog.push(gs);
  gestureShown = !!(gs && gs.shown);
}
const startFrame = () => page.frames().find((f) => f.url().includes('/session/world')) || page;
await capped(startFrame().evaluate(() => {
  const fnv = (d) => { let h = 2166136261; for (let i = 0; i < d.length; i += 1) { h ^= d[i]; h = Math.imul(h, 16777619); } return (h >>> 0).toString(16); };
  const c0 = document.querySelector('canvas[data-spawn-present-surface]');
  window.__displaySamples = [];
  if (!c0) { window.__displayCtx = { found: false }; return; }
  const cs = getComputedStyle(c0);
  const r = c0.getBoundingClientRect();
  window.__displayCtx = { found: true, bitmaprenderer: !!c0.getContext('bitmaprenderer'), w: c0.width, h: c0.height, connected: c0.isConnected, display: cs.display, visibility: cs.visibility, opacity: cs.opacity, rect: [r.left, r.top, r.width, r.height], alphaMode: 'none: bitmaprenderer has no alphaMode' };
  let busy = false;
  const sample = async () => {
    if (busy) return;
    busy = true;
    const costStart = performance.now();
    try {
      const sinks = window.__sinkCanvases;
      const frame = { t: Date.now(), bitmapPresent: (window.__probe && window.__probe.bitmapPresent) || 0, pp: ((window.__probe && window.__probe.presentPost) || []).slice(-1)[0] || null, canvases: [] };
      for (const c of document.querySelectorAll('canvas')) {
        const k = document.createElement('canvas');
        k.width = c.width; k.height = c.height;
        const g = k.getContext('2d', { willReadFrequently: true });
        g.drawImage(c, 0, 0);
        const d = g.getImageData(0, 0, k.width, k.height).data;
        let lit = 0;
        for (let i = 0; i < d.length; i += 4) { if (d[i] + d[i + 1] + d[i + 2] > 0) lit += 1; }
        const entry = { surface: c.dataset.spawnPresentSurface ?? null, w: c.width, h: c.height, sink: !!(sinks && sinks.has(c)), lit, hash: fnv(d), png: c.width > 0 ? c.toDataURL('image/png').length : 0 };
        if (entry.sink && c.width > 0) {
          const blob = await new Promise((res) => c.toBlob(res, 'image/png'));
          const bmp = await createImageBitmap(blob);
          const q = document.createElement('canvas');
          q.width = bmp.width; q.height = bmp.height;
          const qg = q.getContext('2d', { willReadFrequently: true });
          qg.drawImage(bmp, 0, 0);
          const e = qg.getImageData(0, 0, q.width, q.height).data;
          let dl = 0;
          for (let i = 0; i < e.length; i += 4) { if (e[i] + e[i + 1] + e[i + 2] > 0) dl += 1; }
          entry.decodedLit = dl;
          entry.decodedHash = fnv(e);
        }
        frame.canvases.push(entry);
      }
      frame.cost = Math.round((performance.now() - costStart) * 10) / 10;
      frame.vis = document.visibilityState;
      frame.focus = document.hasFocus();
      frame.sessRaf = window.__sessRaf || 0;
      window.__displaySamples.push(frame);
    } finally { busy = false; }
  };
  window.__sessRaf = 0;
  const sessRafTick = () => { window.__sessRaf += 1; requestAnimationFrame(sessRafTick); };
  requestAnimationFrame(sessRafTick);
  if (__SAMPLE__ === 1) sample();
  if (__SAMPLE__ === 1) window.__displayTimer = setInterval(sample, 500);
}).catch((e) => { window.__displayErr = String(e.message).slice(0, 120); }), 60000, 'display-start-timeout');
await wait(150000);
const after = await snap('after-key');
after.gesture = { tries: gestureTries, shown: gestureShown, log: gestureLog };
after.boot = await capped(page.evaluate(() => ({ loading: window.__spawnLastKernelLoadingState ?? null, released: window.__spawnHeldDocumentReleased ?? null, marks: performance.getEntriesByType('mark').map((m) => m.name).slice(0, 120), iframes: [...document.querySelectorAll('iframe')].map((f) => ({ src: (f.getAttribute('src') || '').slice(0, 120), kernel: f.getAttribute('data-spawn-kernel-frame') })) })).catch((e) => 'boot-eval-fail ' + String(e.message).slice(0, 120)), 60000, 'boot-timeout');
after.display = await capped(startFrame().evaluate(() => { clearInterval(window.__displayTimer); return { focus: document.hasFocus(), activation: navigator.userActivation.hasBeenActive, ctx: window.__displayCtx || null, samples: window.__displaySamples || [], hooks: window.__displayed || [], pageCalls: window.__pageCalls || [], transferTimes: window.__transferTimes || [], err: window.__displayErr || null }; }).catch((e) => 'display-eval-fail ' + String(e.message).slice(0, 120)), 60000, 'display-read-timeout');
const sessionFrame = page.frames().find((f) => f.url().includes('/session/world'));
after.presentSample = await capped((sessionFrame || page).evaluate(() => {
  const c = document.querySelector('canvas[data-spawn-present-surface]');
  if (!c) return { found: false };
  const k = document.createElement('canvas');
  k.width = c.width;
  k.height = c.height;
  const g = k.getContext('2d', { willReadFrequently: true });
  g.drawImage(c, 0, 0);
  const d = g.getImageData(0, 0, k.width, k.height).data;
  let lit = 0;
  let sum = 0;
  for (let i = 0; i < d.length; i += 4) { const v = d[i] + d[i + 1] + d[i + 2]; if (v > 0) lit += 1; sum += v; }
  return { found: true, w: k.width, h: k.height, nonBlackPixels: lit, meanBrightness: Math.round((sum / (d.length / 4)) * 100) / 100 };
}).catch((e) => 'eval-fail ' + String(e.message).slice(0, 120)), 60000, 'sample-timeout');
after.presentDom = await capped((sessionFrame || page).evaluate(() => [...document.querySelectorAll('canvas')].map((c) => ({ w: c.width, h: c.height, surface: c.dataset.spawnPresentSurface ?? null, road: c.dataset.spawnPresentRoad ?? null, engine: c.dataset.engine ?? null, display: c.style.display || null, opacity: c.style.opacity || null, connected: c.isConnected, context: c.getAttribute('data-spawn-present-road') ?? null }))).catch((e) => 'eval-fail ' + String(e.message).slice(0, 120)), 60000, 'dom-timeout');
after.env = await capped((sessionFrame || page).evaluate(async () => {
  const adapter = navigator.gpu ? await navigator.gpu.requestAdapter().catch(() => null) : null;
  return { ua: navigator.userAgent, href: location.href.slice(0, 200), presentRoadParam: new URL(location.href).searchParams.get('presentRoad'), cssMoz: typeof CSS !== 'undefined' ? CSS.supports('-moz-appearance', 'none') : 'no-CSS', mozInnerScreenX: typeof window.mozInnerScreenX, hasGpu: !!navigator.gpu, adapterInfo: adapter && adapter.info ? { vendor: adapter.info.vendor, architecture: adapter.info.architecture, isFallbackAdapter: adapter.info.isFallbackAdapter } : null, localStorageKeys: Object.keys(localStorage), sessionStorageKeys: Object.keys(sessionStorage), cookieNames: document.cookie.split('; ').map((c) => c.split('=')[0]), lsAll: Object.fromEntries(Object.keys(localStorage).map((k) => [k, String(localStorage.getItem(k)).slice(0, 200)])), canvasRoadCookie: (document.cookie.split('; ').find((c) => c.startsWith('__Secure-spawn-canvas-road-run=')) || null), sessionRoad: Object.fromEntries(Object.keys(sessionStorage).filter((k) => /spawn|road|canvas|Las/i.test(k)).map((k) => [k, String(sessionStorage.getItem(k)).slice(0, 200)])), roadStorage: Object.fromEntries(Object.keys(localStorage).filter((k) => /device-record|death|road|gpu/i.test(k)).map((k) => [k, String(localStorage.getItem(k)).slice(0, 360)])) };
}).catch((e) => 'eval-fail ' + String(e.message).slice(0, 120)), 60000, 'env-timeout');
after.scene = await sceneSnap();
await page.screenshot({ path: OUT + '/after.png' }).catch(() => {});
fs.writeFileSync(OUT + '/routes.json', JSON.stringify(routeHits, null, 1));
fs.writeFileSync(OUT + '/scene.json', JSON.stringify({ before, after, closes: handles.map((h) => ({ url: h.url, openedMs: h.openedMs, closedMs: h.closedMs, closedAt: h.closedAt || null })), failures, responses, events }, null, 1));
fs.writeFileSync(OUT + '/console.txt', consoleLines.join('\n') + '\n');
console.log(JSON.stringify({ html: after.html, workers: after.workers.length, scene: after.scene.map((s) => ({ url: s.url.slice(0, 60), keys: s.scene && typeof s.scene === 'object' ? Object.keys(s.scene) : String(s.scene) })), closed: handles.filter((h) => h.closedMs !== null).length }));
if (TARGET.startsWith('http://127.0.0.1')) { const misses = await fetch('http://127.0.0.1:4173/__misses').then((x) => x.text()).catch((e) => 'misses-fetch-failed ' + e.message); fs.writeFileSync(OUT + '/misses.txt', misses); }
await page.close();
