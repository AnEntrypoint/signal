const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const HERE = __dirname;
const REPO = path.resolve(HERE, '..', '..', '..');
const WITNESS = path.join(HERE, 'browser-witness.sh');
const RESULT = path.join(HERE, 'browser-result.cjs');
const PIXEL = path.join(HERE, 'pixel.py');
const LIB = path.join(HERE, 'lib.sh');
const TICK = String.fromCharCode(96);
const DOLLAR = String.fromCharCode(36);
const DEV = 'session/world:bc986e1b-5a08-4b6a-adf3-ef93cd1597b4@dev';
const CHUNK = DEV + '/60d2a80e-a7bd2cc76ec022ef.mjs';
const DEV_INDEX = DEV + '/index.html';
const CENSUS = 'world-store/worlds/bc986e1b5a084b6aadf3ef93cd1597b4/arrival-census/19c1489dab3e655521417de663b683930e2cc29a10f23d859a384885d25cc8b7';
const KERNEL = 'kernel-witness';
const FRAME_URL = 'https://anentrypoint.github.io/signal/session/world:x@dev/';
const SUMMARY_FROM = 'let a=null;if(a===null)return null;';
const SUMMARY_TO = 'let a=v7();if(a===null)return null;';
const REALM_FROM = 'characters' + TICK + ');return null});';
const QQ = String.fromCharCode(34);
const REALM_TO = 'characters' + TICK + ');let r=RiI(e)?.sharedHost??e;if(!TW2(r))return null;let i=tdy.get(r);if(i!==void 0)return' + TICK + DOLLAR + '{t}-' + DOLLAR + '{i}.' + DOLLAR + '{whv}' + TICK + ';return r.includes(' + QQ + '.' + QQ + ')?' + TICK + DOLLAR + '{t}-' + DOLLAR + '{r}' + TICK + ':' + TICK + DOLLAR + '{t}.' + DOLLAR + '{r}' + TICK + '});';
const ALIVE_SCRIPT = '<script>(function(){var r=window.requestAnimationFrame.bind(window);window.requestAnimationFrame=function(cb){return setTimeout(function(){r(cb)},2000)}})();</script>';
const REGION_PY = ['import sys', 'from PIL import Image, ImageDraw', 'a = Image.open(sys.argv[1]).convert("RGB")', 'b = a.copy()', 'ImageDraw.Draw(b).rectangle([4, 4, 51, 61], fill=(255, 0, 0))', 'b.save(sys.argv[2])', ''].join('\n');

const frames = (shown) => ({ reqs: [], consoles: [], errs: [], failed: [], okUrls: [], frames: [{ url: FRAME_URL, info: { canvases: ['1280x800'], frames3s: 180, shown } }] });
const PIXEL_OK = { present: true, w: 1280, h: 800, changed: 5000, changedFrac: 0.004883, bbox: [700, 500, 760, 560], bboxW: 60, bboxH: 60 };
const LIVE_AHEAD = { source: 'live', shown: false, frames3s: 56, pixel: { present: true, changed: 2244, changedFrac: 0.002191, bbox: [639, 493, 713, 585] } };

const sh = (cmd, args, opts) => spawnSync(cmd, args, Object.assign({ encoding: 'utf8', maxBuffer: 1 << 28 }, opts));
const text = (r) => (r.stdout || '') + (r.stderr || '');
const writeJson = (file, value) => { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, JSON.stringify(value)); };
const inTmp = (name, body) => {
  const t = fs.mkdtempSync(path.join(HERE, '.red-' + name + '.'));
  try { return body(t); } finally { fs.rmSync(t, { recursive: true, force: true }); }
};
const copySite = (site, t) => { const dst = path.join(t, 'site'); fs.cpSync(site, dst, { recursive: true }); return dst; };
const witness = (site, seconds, env) => {
  const r = sh('timeout', [String(seconds), 'bash', WITNESS, site], { env: Object.assign({}, process.env, env || {}) });
  return { rc: r.status, log: text(r) };
};
const browserResult = (dir, live) => {
  const r = sh('node', [RESULT, dir], { env: Object.assign({}, process.env, { LIVE_REFERENCE: live }) });
  return { rc: r.status, log: text(r) };
};
const pixelInto = (a, b, out) => { fs.writeFileSync(out, sh('python3', ['-I', PIXEL, a, b]).stdout); };
const mutate = (root, from, to) => {
  let n = 0;
  const walk = (d) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (p.endsWith('.mjs')) {
        const s = fs.readFileSync(p, 'utf8');
        const k = s.split(from).length - 1;
        if (k) { n += k; fs.writeFileSync(p, s.split(from).join(to)); }
      }
    }
  };
  walk(root);
  return n;
};
const liveJson = (liveDir) => path.join(liveDir, 'live-reference.json');

const CHECKS = {
  chunk: ['RED_CHUNK', (site) => inTmp('chunk', (t) => {
    const s = copySite(site, t);
    fs.rmSync(path.join(s, CHUNK), { force: true });
    const w = witness(s, 700);
    return w.rc !== 0 && /FAIL HTTP 404 .*60d2a80e-a7bd2cc76ec022ef\.mjs/.test(w.log);
  })],
  preload: ['RED_PRELOAD', (site) => {
    const dead = /rel="preload" as="fetch" crossorigin href="\/signal\/world-store\/git\/[0-9a-f]+\/ui\/b045b55fce1634c701a585b3012693fbc125cc3f0b2039e844b16cfcafecbff6\.css"/;
    const walk = (dir, out) => {
      for (const name of fs.readdirSync(dir)) {
        const p = path.join(dir, name);
        if (fs.statSync(p).isDirectory()) walk(p, out);
        else if (name.endsWith('.html')) out.push(p);
      }
      return out;
    };
    const hits = walk(site, []).filter((f) => dead.test(fs.readFileSync(f, 'utf8')));
    console.log('dead preload pages: ' + hits.length);
    hits.forEach((f) => console.log('HIT ' + path.relative(site, f)));
    return hits.length === 0;
  }],
  summary: ['RED_SUMMARY', (site) => inTmp('summary', (t) => {
    const s = copySite(site, t);
    if (mutate(s, SUMMARY_FROM, SUMMARY_TO) === 0) throw new Error('no summary patch to mutate');
    const w = witness(s, 900);
    return w.rc !== 0 && /FAIL HTTP 404 .*\/summary\//.test(w.log);
  })],
  stale: ['RED_STALE', () => inTmp('stale', (t) => {
    const s = path.join(t, 'site');
    fs.mkdirSync(s);
    sh('sh', ['-c', 'git -C "' + REPO + '" archive ' + (process.env.STALE_REF || 'cf87fbf6f1853fc7263bff217b70f95882d8bed8') + ' | tar -x -C "' + s + '"']);
    const w = witness(s, 700);
    return w.rc !== 0 && /FAIL HTTP 404 .*26ceb10f-49e18729068cd5df\.mjs/.test(w.log);
  })],
  realm: ['RED_REALM', (site) => inTmp('realm', (t) => {
    const s = copySite(site, t);
    if (mutate(s, REALM_FROM, REALM_TO) === 0) throw new Error('no realm rewrite to mutate');
    const w = witness(s, 900);
    return w.rc !== 0 && /FAIL HTTP 404 .*authored-realm-kept-f239caa792d8b017\.html/.test(w.log) && /FAIL HTTP 404 .*kernel-witness-host/.test(w.log);
  })],
  shown: ['RED_SHOWN', () => inTmp('shown', (t) => {
    const match = path.join(t, 'match');
    const ahead = path.join(t, 'ahead');
    const live = path.join(t, 'live.json');
    writeJson(path.join(match, 'trace.json'), frames(false));
    writeJson(path.join(match, 'pixel.json'), PIXEL_OK);
    writeJson(path.join(ahead, 'trace.json'), frames(true));
    writeJson(path.join(ahead, 'pixel.json'), PIXEL_OK);
    fs.writeFileSync(live, JSON.stringify(LIVE_AHEAD));
    return browserResult(match, live).rc === 0 && browserResult(ahead, live).rc !== 0;
  })],
  alive: ['RED_ALIVE', (site) => inTmp('alive', (t) => {
    const s = copySite(site, t);
    const f = path.join(s, DEV_INDEX);
    const html = fs.readFileSync(f, 'utf8');
    const injected = html.indexOf('<head>') >= 0;
    if (injected) fs.writeFileSync(f, html.replace('<head>', '<head>' + ALIVE_SCRIPT));
    const w = witness(s, 900);
    return injected && w.rc !== 0 && /FAIL ALIVE/.test(w.log);
  })],
  census: ['RED_CENSUS', (site) => inTmp('census', (t) => {
    const s = copySite(site, t);
    if (!fs.existsSync(path.join(s, CENSUS, 'index.html'))) return false;
    fs.rmSync(path.join(s, CENSUS), { recursive: true, force: true });
    const w = witness(s, 900);
    return w.rc !== 0 && /FAIL HTTP 404 .*arrival-census/.test(w.log);
  })],
  kernel: ['RED_KERNEL', (site) => inTmp('kernel', (t) => {
    const s = copySite(site, t);
    if (!fs.existsSync(path.join(s, KERNEL, 'index.html'))) return false;
    fs.rmSync(path.join(s, KERNEL), { recursive: true, force: true });
    const w = witness(s, 900);
    return w.rc !== 0 && /FAIL HTTP 404 .*kernel-witness/.test(w.log);
  })],
  leak: ['RED_CHECK', (site) => {
    const w = witness(site, 700, { WITNESS_LEAK: '1' });
    const m = /^LEAK_PID=(\d+)/m.exec(w.log);
    const leaked = m ? m[1] : '';
    if (leaked) {
      sh('kill', ['-TERM', leaked]);
      sh('sleep', ['1']);
      sh('kill', ['-KILL', leaked]);
    }
    const cleanup = sh('bash', [LIB, 'proc_check', 'red-after-cleanup']);
    return w.rc !== 0 && /PROC_CHECK after left=1/.test(w.log) && cleanup.status === 0;
  }],
  lanes: ['RED_LANES', (site, liveDir) => inTmp('lanes', (t) => {
    const live = liveJson(liveDir);
    const bits = JSON.parse(fs.readFileSync(live, 'utf8')).laneBits;
    const trace = (b) => ({ reqs: [], consoles: [], errs: [], failed: [], okUrls: [], frames: [], laneBits: b });
    const same = path.join(t, 'same');
    const diff = path.join(t, 'diff');
    writeJson(path.join(same, 'trace.json'), trace(bits));
    writeJson(path.join(diff, 'trace.json'), trace(Number(bits) ^ 1));
    const sameRes = browserResult(same, live);
    const diffRes = browserResult(diff, live);
    return !/LANE DRAW MISMATCH/.test(sameRes.log) && /LANE DRAW MISMATCH/.test(diffRes.log);
  })],
  pixel: ['RED_PIXEL', (site, liveDir) => inTmp('pixel', (t) => {
    const run = path.join(t, 'run');
    const live = path.join(t, 'live.json');
    const a = path.join(t, 'canvas-a.png');
    const b = path.join(t, 'canvas-b.png');
    writeJson(path.join(run, 'trace.json'), frames(false));
    fs.copyFileSync(liveJson(liveDir), live);
    fs.copyFileSync(path.join(liveDir, 'canvas-a.png'), a);
    fs.copyFileSync(path.join(liveDir, 'canvas-b.png'), b);
    pixelInto(a, b, path.join(run, 'pixel.json'));
    const drawn = browserResult(run, live);
    fs.copyFileSync(a, b);
    pixelInto(a, b, path.join(run, 'pixel.json'));
    const frozen = browserResult(run, live);
    return frozen.rc !== 0 && /PIXEL FROZEN/.test(frozen.log) && !/PIXEL FROZEN/.test(drawn.log);
  })],
  region: ['RED_REGION', (site, liveDir) => inTmp('region', (t) => {
    const run = path.join(t, 'run');
    const live = path.join(t, 'live.json');
    const a = path.join(t, 'canvas-a.png');
    const b = path.join(t, 'canvas-b.png');
    const moved = path.join(t, 'moved.png');
    writeJson(path.join(run, 'trace.json'), frames(false));
    const laneBits = JSON.parse(fs.readFileSync(path.join(liveDir, 'ref', 'live-reference.json'), 'utf8')).laneBits;
    const traceFile = path.join(run, 'trace.json');
    fs.writeFileSync(traceFile, JSON.stringify(Object.assign(JSON.parse(fs.readFileSync(traceFile, 'utf8')), { laneBits })));
    fs.copyFileSync(path.join(liveDir, 'ref', 'live-reference.json'), live);
    fs.copyFileSync(path.join(liveDir, 'ref', 'canvas-a.png'), a);
    fs.copyFileSync(path.join(liveDir, 'ref', 'canvas-b.png'), b);
    pixelInto(a, b, path.join(run, 'pixel.json'));
    const drawn = browserResult(run, live);
    sh('python3', ['-I', '-', a, moved], { input: REGION_PY });
    fs.copyFileSync(moved, b);
    pixelInto(a, b, path.join(run, 'pixel.json'));
    const movedRes = browserResult(run, live);
    return movedRes.rc !== 0 && /REGION OUTSIDE/.test(movedRes.log) && !/REGION/.test(drawn.log);
  })],
};

const [name, site, liveDir] = process.argv.slice(2);
const entry = CHECKS[name];
if (!entry) { console.log('unknown red check: ' + name); process.exit(2); }
const live = liveDir ? path.resolve(liveDir) : '';
if (live) process.env.LIVE_REFERENCE = liveJson(live);
let ok = false;
try { ok = entry[1](path.resolve(site || ''), live); } catch (e) { console.log(String(e.message)); }
console.log(entry[0] + (ok ? '_OK' : '_FAILED'));
process.exit(ok ? 0 : 1);
