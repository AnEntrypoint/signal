import { spawnSync } from 'node:child_process';
import { readFileSync, mkdtempSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';

const here = dirname(fileURLToPath(import.meta.url));
const local = join(here, '..');
const render = join(local, 'render-probe.sh');
const scene = join(local, 'probe-scene.js');
const target = 'http://127.0.0.1:4173/';
const D = String.fromCharCode(36);
let passed = 0;
const failed = [];
function check(name, ok) {
  if (ok) passed += 1;
  else failed.push(name);
  console.log((ok ? 'ok   ' : 'FAIL ') + name);
}
function renderWith(env) {
  const out = mkdtempSync(join(tmpdir(), 'render-'));
  const r = spawnSync('bash', [render, scene, out, target], { encoding: 'utf8', env: { PATH: process.env.PATH, ...env } });
  return { code: r.status, text: r.stdout };
}

const dflt = renderWith({});
check('render exits 0 with defaults', dflt.code === 0);
check('default viewport is 1280 x 800', dflt.text.includes('page.setViewportSize({ width: 1280, height: 800 });'));
const small = renderWith({ VIEW_W: '640', VIEW_H: '400' });
check('VIEW_W/VIEW_H set the viewport to 640 x 400', small.text.includes('page.setViewportSize({ width: 640, height: 400 });'));
check('the default 1280 no longer appears in the 640 render', !small.text.includes('width: 1280'));
check('no viewport placeholder is left unsubstituted', !small.text.includes('__VIEW_') && !dflt.text.includes('__VIEW_'));
check('the target is substituted into page.goto', small.text.includes("page.goto(TARGET") && small.text.includes("const TARGET = 'http://127.0.0.1:4173/';"));
check('no __TARGET__ placeholder is left', !small.text.includes('__TARGET__'));
check('the OUT path is substituted', /const OUT = '\/tmp\/render-/.test(small.text));
const marks = ['viewport-set', 'goto-commit', 'wait-15s', 'before-snap-start', 'before-snap-done'];
check('each step mark is in the render', marks.every((m) => small.text.includes("mark('" + m + "');")));
check('mark appends JSON lines to steps.log', small.text.includes("OUT + '/steps.log'") && small.text.includes('JSON.stringify({ label, t: Date.now() })'));
const po = readFileSync(join(local, 'probe-page.sh'), 'utf8');
check('probe-page.sh renders the probe through render-probe.sh', po.includes('bash .spawn/local/render-probe.sh "$PROBE" "$OUT" "$TARGET" > "$OUT/probe.js"'));
check('probe-page.sh passes CHROME_EXTRA to the browser launch', po.includes(' ' + D + '{CHROME_EXTRA:-} about:blank'));
check('probe-page.sh starts the sampler and stops it by PID', po.includes('tree-sample.sh') && po.includes('echo $! > "$OUT/sample.pid"') && po.includes('kill "$(cat $OUT/sample.pid)" 2>/dev/null'));

if (failed.length === 0) console.log('GREEN ' + passed + ' checks');
else console.log('RED ' + failed.length + ' failed: ' + failed.join('; '));
process.exitCode = failed.length === 0 ? 0 : 1;
