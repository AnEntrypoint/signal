import fs from 'node:fs';
import http from 'node:http';
import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';
const require = createRequire('/config/.gmnew/pw/node_modules/');
const { WebSocketServer } = require('ws');
const L = '/workspace/signal/world/signal-stage/.spawn/local/';
const readerPath = process.argv[2] || L + 'holder-read.mjs';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const alive = (p) => { try { process.kill(p, 0); return true; } catch { return false; } };
const PAGE = 'http://127.0.0.1:4173/';
const SESSION = 'http://127.0.0.1:4173/session/world%3Afake%40dev';
const WORKER = 'blob:http://127.0.0.1:4173/fake-worker';
const TARGETS = [
  { targetId: 'P1', type: 'page', url: PAGE, title: 'top' },
  { targetId: 'F1', type: 'iframe', url: SESSION, title: 'session' },
  { targetId: 'W1', type: 'worker', url: WORKER, title: 'w' },
  { targetId: 'B0', type: 'browser', url: '', title: '' },
];
const HEAP = { P1: 1111, F1: 2222, W1: 3333 };
const server = http.createServer((req, res) => {
  if (req.url !== '/json/version') { res.statusCode = 404; res.end(); return; }
  res.setHeader('content-type', 'application/json');
  res.end(JSON.stringify({ webSocketDebuggerUrl: 'ws://127.0.0.1:' + server.address().port + '/devtools/browser/fake' }));
});
const wss = new WebSocketServer({ server });
wss.on('connection', (sock) => sock.on('message', (raw) => {
  const m = JSON.parse(String(raw));
  let result = {};
  if (m.method === 'Target.getTargets') result = { targetInfos: TARGETS };
  else if (m.method === 'Target.attachToTarget') result = { sessionId: 'S' + m.params.targetId };
  else if (m.method === 'Runtime.getHeapUsage') { const id = m.sessionId.slice(1); result = { usedSize: HEAP[id], totalSize: HEAP[id] * 2, embedderHeapUsedSize: Math.floor(HEAP[id] / 2), backingStorageSize: Math.floor(HEAP[id] / 4) }; }
  else if (m.method === 'Page.getFrameTree') result = { frameTree: { frame: { url: PAGE }, childFrames: [{ frame: { url: SESSION }, childFrames: [] }] } };
  sock.send(JSON.stringify({ id: m.id, result }));
}));
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const port = server.address().port;
const OUT = '/workspace/tmp/signal/verify/holder-fields-' + Date.now();
fs.mkdirSync(OUT, { recursive: true });
const leader = spawn('bash', ['-c', "exec -a 'chromium.real --type=renderer' node -e \"const b=Buffer.alloc(200<<20).fill(1);setInterval(()=>{},1000)\""], { detached: true, stdio: 'ignore' });
leader.unref();
fs.writeFileSync(OUT + '/browser.pid', String(leader.pid));
await sleep(2000);
const watch = spawn('bash', [L + 'bound-watch.sh', OUT], { detached: true, stdio: 'ignore', env: { ...process.env, MEM_CAP_KB: '100000', RUN_CAP_S: '99999', CDP_PORT: String(port), HOLDER_READER: readerPath } });
watch.unref();
let reason = null;
for (let i = 0; i < 80 && reason === null; i += 1) { await sleep(500); if (fs.existsSync(OUT + '/bound.reason')) reason = fs.readFileSync(OUT + '/bound.reason', 'utf8').trim(); }
await sleep(1500);
const holderTxt = fs.existsSync(OUT + '/bound.holder') ? fs.readFileSync(OUT + '/bound.holder', 'utf8') : '';
const line = holderTxt.split('\n').find((l) => l.startsWith('HOLDER_JSON '));
let h = null; try { h = line ? JSON.parse(line.slice('HOLDER_JSON '.length)) : null; } catch { h = null; }
const expect = {
  pid: leader.pid,
  frameUrls: [PAGE, SESSION],
  workers: [{ targetId: 'W1', type: 'worker', url: WORKER }],
  perTargetHeap: [
    { targetId: 'P1', type: 'page', url: PAGE, usedSize: 1111, totalSize: 2222, embedderHeapUsedSize: 555, backingStorageSize: 277 },
    { targetId: 'F1', type: 'iframe', url: SESSION, usedSize: 2222, totalSize: 4444, embedderHeapUsedSize: 1111, backingStorageSize: 555 },
    { targetId: 'W1', type: 'worker', url: WORKER, usedSize: 3333, totalSize: 6666, embedderHeapUsedSize: 1666, backingStorageSize: 833 },
  ],
};
const checks = [];
const check = (name, ok, got) => checks.push({ name, ok, got: String(JSON.stringify(got) ?? 'absent').slice(0, 220) });
check('reason is memory trip', reason !== null && reason.startsWith('memory'), reason);
check('holder line present', h !== null, line ? 'line' : 'none');
check('field pid present and equal to holder', h !== null && 'pid' in h && h.pid === expect.pid, h && h.pid);
check('field frameUrls present and equal', h !== null && 'frameUrls' in h && JSON.stringify(h.frameUrls) === JSON.stringify(expect.frameUrls), h && h.frameUrls);
check('field workers present and equal', h !== null && 'workers' in h && JSON.stringify(h.workers) === JSON.stringify(expect.workers), h && h.workers);
check('field perTargetHeap present and equal', h !== null && 'perTargetHeap' in h && JSON.stringify(h.perTargetHeap) === JSON.stringify(expect.perTargetHeap), h && h.perTargetHeap);
check('field renderersOverGb present', h !== null && 'renderersOverGb' in h && typeof h.renderersOverGb === 'number', h && h.renderersOverGb);
for (const c of checks) console.log((c.ok ? 'PASS ' : 'FAIL ') + c.name + ' got=' + c.got);
const green = checks.every((c) => c.ok);
console.log('HOLDER FIELDS WITNESS (' + readerPath + '): ' + (green ? 'GREEN' : 'RED'));
try { process.kill(-leader.pid, 'SIGTERM'); } catch {}
try { process.kill(watch.pid, 'SIGTERM'); } catch {}
await sleep(800);
console.log('holder gone=' + !alive(leader.pid) + ' watchdog gone=' + !alive(watch.pid));
wss.close();
server.close();
process.exit(green ? 0 : 1);
