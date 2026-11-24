import http from 'node:http';
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { mkdirSync, rmSync } from 'node:fs';
const require = createRequire('/config/.gmnew/pw/node_modules/');
const { WebSocketServer } = require('ws');
const readerPath = process.argv[2] || '/workspace/signal/world/signal-stage/.spawn/local/holder-memdump.mjs';
const OUT = '/workspace/tmp/signal/verify/witness-reason';
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
const HOLDER_PID = 4242;
const OTHER = { ph: 'X', pid: 2000, tid: 1, ts: 1000000, dur: 40, cat: 'toplevel', name: 'ThreadControllerImpl::RunTask', args: {} };
const OTHER_FINISH = { ph: 'X', pid: 2001, tid: 2001, ts: 4000000, dur: 900, cat: 'disabled-by-default-memory-infra', name: 'MemoryDumpManager::FinishAsyncProcessDump', args: {} };
const HOLDER_FINISH = { ph: 'X', pid: HOLDER_PID, tid: HOLDER_PID, ts: 9500000, dur: 2000, cat: 'disabled-by-default-memory-infra', name: 'MemoryDumpManager::FinishAsyncProcessDump', args: {} };
const SCENARIOS = {
  'trace-stop-never-completed': { reply: { dumpGuid: 'G42', success: false }, events: [OTHER], complete: false, endWait: 800, guard: 40000, expect: { reason: 'trace-stop-never-completed', dumpSuccess: false, holderFinishEvents: 0, error: 'timeout' } },
  'holder-finish-absent': { reply: { dumpGuid: 'G42', success: false }, events: [OTHER, OTHER_FINISH], complete: true, endWait: 5000, guard: 40000, expect: { reason: 'holder-finish-absent', dumpSuccess: false, holderFinishEvents: 0, error: null } },
  'dump-reply-false': { reply: { dumpGuid: 'G42', success: false }, events: [OTHER, HOLDER_FINISH], complete: true, endWait: 5000, guard: 40000, expect: { reason: 'dump-reply-false', dumpSuccess: false, holderFinishEvents: 1, error: null } },
  'dump-finished': { reply: { dumpGuid: 'G42', success: true }, events: [OTHER, HOLDER_FINISH], complete: true, endWait: 5000, guard: 40000, expect: { reason: null, dumpSuccess: true, holderFinishEvents: 1, error: null } },
  'dump-reply-missing': { reply: null, events: [], complete: false, endWait: 5000, guard: 800, expect: { reason: 'dump-reply-missing', dumpSuccess: false, holderFinishEvents: 0, error: 'timeout' } },
};
const runScenario = async (name, sc) => {
  const server = http.createServer((req, res) => {
    if (req.url !== '/json/version') { res.statusCode = 404; res.end(); return; }
    res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify({ webSocketDebuggerUrl: 'ws://127.0.0.1:' + server.address().port + '/devtools/browser/fake' }));
  });
  const wss = new WebSocketServer({ server });
  wss.on('connection', (sock) => sock.on('message', (raw) => {
    const m = JSON.parse(String(raw));
    const reply = (result) => sock.send(JSON.stringify({ id: m.id, result }));
    if (m.method === 'Tracing.requestMemoryDump') { if (sc.reply !== null) reply(sc.reply); return; }
    if (m.method === 'Tracing.end') {
      reply({});
      sock.send(JSON.stringify({ method: 'Tracing.dataCollected', params: { value: sc.events } }));
      if (sc.complete) sock.send(JSON.stringify({ method: 'Tracing.tracingComplete', params: { dataLossOccurred: false } }));
      return;
    }
    reply({});
  }));
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const port = server.address().port;
  const rr = await new Promise((resolve) => {
    const c = spawn('node', [readerPath, String(port), String(HOLDER_PID)], { env: { ...process.env, HOLDER_TRANSFER: 'events', HOLDER_END_WAIT_MS: String(sc.endWait), HOLDER_GUARD_MS: String(sc.guard), HOLDER_EVENTS_OUT: OUT + '/' + name + '.json' } });
    let o = '';
    c.stdout.on('data', (d) => { o += d; });
    c.on('exit', (code) => resolve({ status: code, stdout: o }));
  });
  wss.close(); server.close();
  const line = (rr.stdout || '').split('\n').find((l) => l.startsWith('HOLDER_MEMDUMP '));
  let h = null;
  try { h = line ? JSON.parse(line.slice('HOLDER_MEMDUMP '.length)) : null; } catch { h = null; }
  return { rr, h };
};
const checks = [];
const check = (name, ok, got) => checks.push({ name, ok: Boolean(ok), got: String(JSON.stringify(got) ?? 'absent').slice(0, 160) });
for (const [name, sc] of Object.entries(SCENARIOS)) {
  const { rr, h } = await runScenario(name, sc);
  check(name + ': reader exit 0 and HOLDER_MEMDUMP line', rr.status === 0 && h !== null, rr.status);
  check(name + ': reason field present', h && Object.prototype.hasOwnProperty.call(h, 'reason'), h && h.reason);
  check(name + ': reason is ' + JSON.stringify(sc.expect.reason), h && h.reason === sc.expect.reason, h && h.reason);
  check(name + ': dumpSuccess is ' + sc.expect.dumpSuccess, h && h.dumpSuccess === sc.expect.dumpSuccess, h && h.dumpSuccess);
  check(name + ': holderFinishEvents is ' + sc.expect.holderFinishEvents, h && h.holderFinishEvents === sc.expect.holderFinishEvents, h && h.holderFinishEvents);
  check(name + ': error is ' + sc.expect.error, h && h.error === sc.expect.error, h && h.error);
}
let fails = 0;
for (const c of checks) { if (!c.ok) fails += 1; console.log((c.ok ? 'PASS ' : 'FAIL ') + c.name + ' got=' + c.got); }
console.log('HOLDER MEMDUMP REASON WITNESS (' + readerPath + '): ' + (fails === 0 ? 'GREEN' : 'RED ' + fails));
process.exit(fails === 0 ? 0 : 1);
