import http from 'node:http';
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { mkdirSync, readFileSync, rmSync, existsSync } from 'node:fs';
const require = createRequire('/config/.gmnew/pw/node_modules/');
const { WebSocketServer } = require('ws');
const readerPath = process.argv[2] || '/workspace/signal/world/signal-stage/.spawn/local/holder-memdump.mjs';
const OUT = '/tmp/verify/witness-end';
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
const CHUNK = [{ ph: 'X', pid: 4242, tid: 1, ts: 1, dur: 1, cat: 'disabled-by-default-memory-infra', name: 'MemoryDumpManager::InvokeOnMemoryDump', args: { memory_dump_provider: { name: 'V8Isolate' } } }];
const SCENARIOS = {
  'late-tracing-complete': { guard: 1000, endWait: 3000, completeDelay: 1500, dataLoss: true, expectError: null, expectComplete: true },
  'never-complete': { guard: 5000, endWait: 1000, completeDelay: null, dataLoss: false, expectError: 'timeout', expectComplete: false },
  'prompt-complete': { guard: 5000, endWait: 3000, completeDelay: 0, dataLoss: false, expectError: null, expectComplete: true },
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
    if (m.method === 'Tracing.requestMemoryDump') { reply({ dumpGuid: 'G42', success: false }); return; }
    if (m.method === 'Tracing.end') {
      reply({});
      sock.send(JSON.stringify({ method: 'Tracing.dataCollected', params: { value: CHUNK } }));
      if (sc.completeDelay !== null) setTimeout(() => sock.send(JSON.stringify({ method: 'Tracing.tracingComplete', params: { dataLossOccurred: sc.dataLoss } })), sc.completeDelay);
      return;
    }
    reply({});
  }));
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const port = server.address().port;
  const eventsOut = OUT + '/' + name + '.json';
  const t0 = Date.now();
  const rr = await new Promise((resolve) => {
    const c = spawn('node', [readerPath, String(port), '4242'], { env: { ...process.env, HOLDER_GUARD_MS: String(sc.guard), HOLDER_END_WAIT_MS: String(sc.endWait), HOLDER_EVENTS_OUT: eventsOut } });
    let o = '';
    c.stdout.on('data', (d) => { o += d; });
    c.on('exit', (code) => resolve({ status: code, stdout: o }));
  });
  const wall = Date.now() - t0;
  wss.close(); server.close();
  const line = (rr.stdout || '').split('\n').find((l) => l.startsWith('HOLDER_MEMDUMP '));
  let h = null;
  try { h = line ? JSON.parse(line.slice('HOLDER_MEMDUMP '.length)) : null; } catch { h = null; }
  const savedEvents = existsSync(eventsOut) ? JSON.parse(readFileSync(eventsOut, 'utf8')).length : -1;
  return { rr, h, wall, savedEvents };
};
const checks = [];
const check = (name, ok, got) => checks.push({ name, ok: Boolean(ok), got: String(JSON.stringify(got) ?? 'absent').slice(0, 160) });
for (const [name, sc] of Object.entries(SCENARIOS)) {
  const { rr, h, wall, savedEvents } = await runScenario(name, sc);
  check(name + ': reader exit 0 and HOLDER_MEMDUMP line', rr.status === 0 && h !== null, rr.status);
  check(name + ': error is ' + sc.expectError, h && h.error === sc.expectError, h && h.error);
  check(name + ': reply keys are dumpGuid and success only', h && JSON.stringify(h.dumpReplyKeys) === JSON.stringify(['dumpGuid', 'success']), h && h.dumpReplyKeys);
  check(name + ': dumpSuccess false from the reply', h && h.dumpSuccess === false, h && h.dumpSuccess);
  check(name + ': tracingComplete seen only when expected', h && (h.tracingCompleteAtMs !== null) === sc.expectComplete, h && h.tracingCompleteAtMs);
  check(name + ': dataLossOccurred recorded from tracingComplete', h && h.dataLossOccurred === (sc.expectComplete ? sc.dataLoss : null), h && h.dataLossOccurred);
  check(name + ': raw events saved (the chunk received)', savedEvents === 1, savedEvents);
  if (name === 'late-tracing-complete') check(name + ': reader waited past the start guard (wall >= 1.4 s)', wall >= 1400, wall);
}
let fails = 0;
for (const c of checks) { if (!c.ok) fails += 1; console.log((c.ok ? 'PASS ' : 'FAIL ') + c.name + ' got=' + c.got); }
console.log('HOLDER MEMDUMP END WITNESS (' + readerPath + '): ' + (fails === 0 ? 'GREEN' : 'RED ' + fails));
process.exit(fails === 0 ? 0 : 1);
