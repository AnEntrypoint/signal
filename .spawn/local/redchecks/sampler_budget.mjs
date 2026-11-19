import fs from 'node:fs';
import vm from 'node:vm';
const L = '/workspace/signal/world/signal-stage/.spawn/local/';
const srcReal = fs.readFileSync(L + 'probe-scene.js', 'utf8');
const pageReal = fs.readFileSync(L + 'probe-page.sh', 'utf8');
const BUDGET_BYTES_PER_MIN = 600e6;
const MAX_CANVAS_CONSTRUCTIONS = 2;
const once = (s, a, b) => { const n = s.split(a).length - 1; if (n !== 1) throw new Error('sabotage anchor count ' + n + ' for ' + a.slice(0, 40)); return s.replace(a, () => b); };
async function measure(src, page) {
  const def = Number(page.match(/\$\{SAMPLE:-(\d)\}/)[1]);
  const rate = Number(src.match(/setInterval\(sample, (\d+)\)/)[1]);
  const start = src.indexOf('  const fnv = (d) =>');
  const endMark = '    } finally { busy = false; }\n  };';
  const end = src.indexOf(endMark, start);
  if (start < 0 || end < 0) throw new Error('sample anchors missing');
  const body = src.slice(start, end + endMark.length);
  let bytes = 0; let made = 0;
  class Canvas {
    constructor() { made += 1; this.width = 0; this.height = 0; this.dataset = { spawnPresentSurface: '2' }; this.isConnected = true; }
    getContext() { return { drawImage() {}, getImageData: (x, y, w, h) => { bytes += w * h * 4; return { data: new Uint8Array(Math.min(w * h * 4, 4096)) }; } }; }
    toDataURL() { bytes += this.width * this.height * 4; return 'data:image/png;base64,AAAA'; }
    toBlob(cb) { bytes += this.width * this.height * 4; cb({ width: this.width, height: this.height }); }
    getBoundingClientRect() { return { left: 0, top: 0, width: 1, height: 1 }; }
  }
  const small = new Canvas(); small.width = 300; small.height = 150;
  const big = new Canvas(); big.width = 1280; big.height = 800;
  made = 0; bytes = 0;
  const document = { querySelector: () => small, querySelectorAll: () => [small, big], createElement: () => new Canvas(), hasFocus: () => false, visibilityState: 'visible' };
  const win = { __sinkCanvases: new Set([big]) };
  const ctx = vm.createContext({ window: win, document, performance: { now: () => Date.now() }, Date, console, createImageBitmap: async (b) => ({ width: b.width, height: b.height }), getComputedStyle: () => ({ display: 'block', visibility: 'visible', opacity: '1' }), requestAnimationFrame: () => 0, setInterval: () => 1, __SAMPLE__: def });
  vm.runInContext('(async () => {\n' + body + '\n;globalThis.__sampler = sample; })' + '();', ctx, { filename: 'probe-scene-sample.js' });
  const sample = ctx.__sampler;
  const ticks = def === 1 ? 1 + Math.floor(60000 / rate) : 0;
  for (let i = 0; i < ticks; i += 1) await sample();
  return { def, rate, ticks, bytes, made };
}
const real = await measure(srcReal, pageReal);
const sabSrc = [
  ['const k = scratch;', "const k = document.createElement('canvas');"],
  ['const q = scratchQ;', "const q = document.createElement('canvas');"],
  ['hash: fnv(d) };', "hash: fnv(d), png: c.width > 0 ? c.toDataURL('image/png').length : 0 };"],
  ['setInterval(sample, 2000)', 'setInterval(sample, 500)'],
].reduce((s, [a, b]) => once(s, a, b), srcReal);
const sabPage = once(pageReal, '${SAMPLE:-0}', '${SAMPLE:-1}');
const sab = await measure(sabSrc, sabPage);
const ok = (m) => m.bytes <= BUDGET_BYTES_PER_MIN * (60000 / 60000) && m.made <= MAX_CANVAS_CONSTRUCTIONS;
const on = await measure(srcReal, once(pageReal, '${SAMPLE:-0}', '${SAMPLE:-1}'));
const green = ok(real) && ok(on);
console.log('real with SAMPLE=1: ' + JSON.stringify(on));
const redOnSab = !ok(sab);
console.log(JSON.stringify({ real, sab }));
console.log('SAMPLER BUDGET (default off, bounded when on): ' + (green ? 'GREEN' : 'RED'));
console.log('SABOTAGE (old sampler values restored) goes RED: ' + (redOnSab ? 'yes' : 'NO'));
