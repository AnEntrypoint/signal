import http from 'node:http';
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
const require = createRequire('/config/.gmnew/pw/node_modules/');
const { WebSocketServer } = require('ws');
const readerPath = process.argv[2] || '/workspace/signal/world/signal-stage/.spawn/local/holder-memdump.mjs';
const HOLDER_PID = 4242;
const PERIODIC = { args: { dumps: { level_of_detail: 'detailed', process_totals: { is_peak_rss_resettable: true, peak_resident_set_size: 'd62a000', private_footprint_bytes: '279d000' } } }, cat: 'disabled-by-default-memory-infra', id: '0x0', name: 'periodic_interval', ph: 'v', pid: HOLDER_PID, tid: -1, ts: 44449750854 };
const SCENARIOS = {
  dump: { env: '', expectDump: true },
  'no-dump': { env: 'no-dump', expectDump: false },
};
const runScenario = async (name) => {
  const cfg = SCENARIOS[name];
  const methods = [];
  const times = {};
  const server = http.createServer((req, res) => {
    if (req.url !== '/json/version') { res.statusCode = 404; res.end(); return; }
    res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify({ webSocketDebuggerUrl: 'ws://127.0.0.1:' + server.address().port + '/devtools/browser/fake' }));
  });
  const wss = new WebSocketServer({ server });
  const sendIf = (sock, msg) => { if (sock.readyState === 1) sock.send(JSON.stringify(msg)); };
  wss.on('connection', (sock) => sock.on('message', (raw) => {
    const m = JSON.parse(String(raw));
    methods.push(m.method);
    if (m.method === 'Tracing.start' || m.method === 'Tracing.end') times[m.method] = Date.now();
    if (m.method === 'Tracing.requestMemoryDump') { sendIf(sock, { id: m.id, result: { dumpGuid: 'G7', success: true } }); return; }
    if (m.method === 'Tracing.end') {
      sendIf(sock, { id: m.id, result: {} });
      setTimeout(() => { sendIf(sock, { method: 'Tracing.dataCollected', params: { value: [PERIODIC] } }); sendIf(sock, { method: 'Tracing.tracingComplete', params: {} }); }, 200);
      return;
    }
    sendIf(sock, { id: m.id, result: {} });
  }));
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const port = server.address().port;
  const rr = await new Promise((resolve) => { const c = spawn('node', [readerPath, String(port), String(HOLDER_PID)], { env: { ...process.env, HOLDER_MODE: cfg.env } }); let o = ''; c.stdout.on('data', (d) => { o += d; }); c.on('exit', (code) => resolve({ status: code, stdout: o })); });
  server.close();
  server.closeAllConnections?.();
  wss.close();
  const line = (rr.stdout || '').split('\n').find((l) => l.startsWith('HOLDER_MEMDUMP '));
  let h = null;
  try { h = line ? JSON.parse(line.slice('HOLDER_MEMDUMP '.length)) : null; } catch { h = null; }
  const checks = [];
  const check = (n, ok, got) => checks.push({ n: name + ': ' + n, ok: Boolean(ok), got: String(JSON.stringify(got) ?? 'absent').slice(0, 160) });
  check('reader exit 0 and HOLDER_MEMDUMP line', rr.status === 0 && h !== null, rr.status);
  check('Tracing.start is first and Tracing.end is sent', methods[0] === 'Tracing.start' && methods.includes('Tracing.end'), methods);
  check('requestMemoryDump sent only in dump mode (the H2 control)', methods.includes('Tracing.requestMemoryDump') === cfg.expectDump, methods);
  check('mode recorded as dump or no-dump', !!h && h.mode === (cfg.expectDump ? 'dump' : 'no-dump'), h && h.mode);
  check('flush completed: tracingComplete arrived, error absent', !!h && h.tracingCompleteAtMs !== null && h.error === null, h && [h.tracingCompleteAtMs, h.error]);
  check('dataCollected delivered the sent event (eventsSeen 1)', !!h && h.eventsSeen === 1, h && h.eventsSeen);
  check('the periodic event is recorded in dumpNames', !!h && h.dumpNames.periodic_interval === 1, h && h.dumpNames);
  if (!cfg.expectDump) {
    check('no-dump holds the trace open at least 2900 ms before Tracing.end', times['Tracing.end'] - times['Tracing.start'] >= 2900, times['Tracing.end'] - times['Tracing.start']);
    check('no requested guid: dumpGuid and requestedAtMs null', !!h && h.dumpGuid === null && h.requestedAtMs === null, h && [h.dumpGuid, h.requestedAtMs]);
  } else {
    check('dump mode: dumpGuid from the reply and dumpSuccess true', !!h && h.dumpGuid === 'G7' && h.dumpSuccess === true, h && [h.dumpGuid, h.dumpSuccess]);
  }
  return checks;
};
const all = [];
for (const name of Object.keys(SCENARIOS)) all.push(...await runScenario(name));
for (const c of all) console.log((c.ok ? 'PASS ' : 'FAIL ') + c.n + ' got=' + c.got);
const red = all.filter((c) => !c.ok).length;
console.log('HOLDER FLUSH WITNESS (' + readerPath + '): ' + (red === 0 ? 'GREEN' : 'RED'));
process.exit(red === 0 ? 0 : 1);
