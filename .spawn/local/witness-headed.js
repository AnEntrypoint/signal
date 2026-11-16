const origin = 'http://127.0.0.1:4173';
const T0 = Date.now();
const step = (name, extra = '') => console.log(`STEP ${name} t=${Date.now() - T0}ms ${extra}`.trim());
const watched = {
  'engine-stand (WebGL2 world renderer)': '08ed00dd',
  'engine-stand-page': '52cbc291',
  'engine-film': 'c268b22d',
  'engine-film-renderer': '3d8ad45e',
  'worker-pipeline-compiler (WebGPU pipelines)': '5ced9a7d',
  'authored-realm loader': '1fd56d4a',
  'world-stand module (9d5c4347)': '9d5c4347',
};
const requested = Object.fromEntries(Object.keys(watched).map((k) => [k, 0]));
const messages = {};
const p = await context.newPage();
p.on('request', (r) => {
  const u = r.url();
  for (const [name, hash] of Object.entries(watched)) if (u.includes(hash)) requested[name] += 1;
});
p.on('console', (m) => {
  if (m.type() === 'error' || m.type() === 'warning') {
    const k = m.type() + ' ' + m.text().slice(0, 110);
    messages[k] = (messages[k] || 0) + 1;
  }
});
p.on('pageerror', (e) => {
  const k = 'PAGEERR ' + String(e.message).slice(0, 110);
  messages[k] = (messages[k] || 0) + 1;
});
await p.goto(origin + '/__health', { waitUntil: 'load', timeout: 60000 });
step('health-loaded');
const adapter = await p.evaluate(async () => {
  const out = { secureContext: isSecureContext, userAgent: navigator.userAgent.split(" ").find((s) => s.startsWith("Chrome/")) ?? "", gpu: !!navigator.gpu };
  if (!navigator.gpu) return out;
  const t = performance.now();
  const a = await navigator.gpu.requestAdapter({ powerPreference: 'high-performance' }).catch(() => null);
  out.adapterMs = Math.round(performance.now() - t);
  out.adapter = !!a;
  if (a) Object.assign(out, { vendor: a.info?.vendor, architecture: a.info?.architecture, features: a.features.size });
  return out;
});
step('adapter-checked', JSON.stringify(adapter));
let scenario = null;
let plateHits = 0;
await p.route((u) => new URL(u).pathname === '/ready-plate', (r) => {
  plateHits += 1;
  const reads = new URL(r.request().url()).searchParams.get('reads');
  try {
    scenario = JSON.parse(reads).scenario;
  } catch {
    scenario = 'unparsed';
  }
  r.fulfill({ status: 200, contentType: 'text/html', body: '' });
});
await p.goto(origin + '/', { waitUntil: 'commit', timeout: 60000 });
step('kernel-commit');
const probe = () => p.evaluate(() => {
  const w = document.querySelector('[data-compat-wall]');
  const cs = w ? getComputedStyle(w) : null;
  return {
    visible: !!(w && cs.display !== 'none' && w.getBoundingClientRect().height > 0),
    restart: (document.documentElement?.textContent || '').includes('Restart Chrome to play'),
  };
}).catch(() => ({ visible: false, restart: false }));
const transitions = [];
let prev = '';
const tPoll = Date.now();
while (Date.now() - tPoll < 40000) {
  const st = await probe();
  const key = (st.visible ? 'wall' : 'no-wall') + (st.restart ? '+restart' : '');
  if (key !== prev) {
    transitions.push({ atMs: Date.now() - T0, state: key });
    step('wall-state', key);
    prev = key;
  }
  const stood = await p.evaluate(() => document.documentElement.hasAttribute('data-spawn-stood')).catch(() => false);
  if (stood) {
    step('stood', 'after=' + (Date.now() - tPoll) + 'ms');
    break;
  }
  await new Promise((r) => setTimeout(r, 250));
}
step('poll-done', 'plateHits=' + plateHits + ' scenario=' + scenario);
await new Promise((r) => setTimeout(r, 8000));
const canvases = [];
for (const f of p.frames()) {
  const info = await f.evaluate(() => [...document.querySelectorAll('canvas')].map((c) => {
    const r = c.getBoundingClientRect();
    return { x: r.x, y: r.y, w: r.width, h: r.height, bitmap: c.width + 'x' + c.height };
  })).catch(() => []);
  const fe = await f.frameElement().catch(() => null);
  const off = fe ? await fe.boundingBox().catch(() => null) : null;
  for (const c of info) canvases.push({ frame: f.url().slice(-40), ...c, ox: off ? off.x : 0, oy: off ? off.y : 0 });
}
step('canvases-listed', 'count=' + canvases.length);
const d = await context.newPage();
await d.setContent('<html></html>');
const boxes = new Map();
for (const c of canvases) {
  if (c.w < 2 || c.h < 2) continue;
  const key = [c.ox + c.x, c.oy + c.y, c.w, c.h].join(',');
  if (!boxes.has(key)) boxes.set(key, { ...c, bitmaps: [] });
  boxes.get(key).bitmaps.push(c.bitmap);
}
const pixels = [];
for (const c of boxes.values()) {
  const buf = await p.screenshot({ clip: { x: c.ox + c.x, y: c.oy + c.y, width: c.w, height: c.h } });
  const s = await d.evaluate(async (b64) => {
    const img = new Image();
    img.src = 'data:image/png;base64,' + b64;
    await img.decode();
    const cv = document.createElement('canvas');
    cv.width = img.width;
    cv.height = img.height;
    const g = cv.getContext('2d', { willReadFrequently: true });
    g.drawImage(img, 0, 0);
    const px = g.getImageData(0, 0, cv.width, cv.height).data;
    const seen = new Set();
    let lit = 0;
    for (let i = 0; i < px.length; i += 4) {
      seen.add((px[i] << 16) | (px[i + 1] << 8) | px[i + 2]);
      if (px[i] + px[i + 1] + px[i + 2] > 30) lit += 1;
    }
    return { uniqueColors: seen.size, litShare: +(lit / (px.length / 4)).toFixed(3) };
  }, buf.toString('base64'));
  pixels.push({ frame: c.frame, bitmaps: c.bitmaps, box: [Math.round(c.x + c.ox), Math.round(c.y + c.oy), Math.round(c.w), Math.round(c.h)], ...s });
}
step('pixels-read');
const top = Object.entries(messages).sort((a, b) => b[1] - a[1]).slice(0, 12).map(([k, v]) => v + 'x ' + k);
console.log('SUMMARY ' + JSON.stringify({ adapter, scenario, plateHits, transitions, requested, pixels, messages: top }));
await d.close();
await p.close();
