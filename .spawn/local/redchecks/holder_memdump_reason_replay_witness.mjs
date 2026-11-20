import http from 'node:http';
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { mkdirSync, readFileSync, rmSync } from 'node:fs';
const require = createRequire('/config/.gmnew/pw/node_modules/');
const { WebSocketServer } = require('ws');
const readerPath = process.argv[2] || '/workspace/signal/world/signal-stage/.spawn/local/holder-memdump.mjs';
const SAMPLE = '/workspace/signal/world/signal-stage/.spawn/local/redchecks/samples/holder_reason_sample_probe-1795160684.json';
const OUT = '/tmp/verify/witness-reason-replay';
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
const HOLDER_PID = 2359201;
const SAVED = JSON.parse(readFileSync(SAMPLE, 'utf8'));
const SCENARIOS = {
  'real-replay-trace-stop': { complete: false, expect: { reason: 'trace-stop-never-completed', dumpSuccess: false, holderFinishEvents: 0, error: 'timeout' } },
  'real-replay-holder-finish-absent': { complete: true, expect: { reason: 'holder-finish-absent', dumpSuccess: false, holderFinishEvents: 0, error: null } },
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
    if (m.method === 'Tracing.requestMemoryDump') { setTimeout(() => reply({ dumpGuid: '0x4', success: false }), 300); return; }
    if (m.method === 'Tracing.end') {
      reply({});
      for (let i = 0; i < SAVED.length; i += 5000) sock.send(JSON.stringify({ method: 'Tracing.dataCollected', params: { value: SAVED.slice(i, i + 5000) } }));
      if (sc.complete) sock.send(JSON.stringify({ method: 'Tracing.tracingComplete', params: { dataLossOccurred: true } }));
      return;
    }
    reply({});
  }));
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const port = server.address().port;
  const rr = await new Promise((resolve) => {
    const c = spawn('node', [readerPath, String(port), String(HOLDER_PID)], { env: { ...process.env, HOLDER_TRANSFER: 'events', HOLDER_END_WAIT_MS: '800', HOLDER_GUARD_MS: '40000', HOLDER_EVENTS_OUT: OUT + '/' + name + '.json' } });
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
  check(name + ': reason is ' + JSON.stringify(sc.expect.reason), h && h.reason === sc.expect.reason, h && h.reason);
  check(name + ': dumpSuccess is ' + sc.expect.dumpSuccess, h && h.dumpSuccess === sc.expect.dumpSuccess, h && h.dumpSuccess);
  check(name + ': holderFinishEvents is ' + sc.expect.holderFinishEvents, h && h.holderFinishEvents === sc.expect.holderFinishEvents, h && h.holderFinishEvents);
  check(name + ': error is ' + JSON.stringify(sc.expect.error), h && h.error === sc.expect.error, h && h.error);
}
let fails = 0;
for (const c of checks) { if (!c.ok) fails += 1; console.log((c.ok ? 'PASS ' : 'FAIL ') + c.name + ' got=' + c.got); }
console.log('HOLDER MEMDUMP REASON REPLAY WITNESS (' + readerPath + '): ' + (fails === 0 ? 'GREEN' : 'RED ' + fails));
process.exit(fails === 0 ? 0 : 1);
