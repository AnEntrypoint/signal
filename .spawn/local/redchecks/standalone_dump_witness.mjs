import http from 'node:http';
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
const require = createRequire('/config/.gmnew/pw/node_modules/');
const { WebSocketServer } = require('ws');
const scriptPath = process.argv[2] || '/workspace/signal/world/signal-stage/.spawn/local/standalone-dump.mjs';
const MB = 1048576;
const LOAD = 300;
const PAGE_PID = 5555;
const HOLDER_PID = 4242;
const REPLY_DELAY_MS = 2000;
const FLUSH_DELAY_MS = 1000;
const SCENARIOS = {
  'refused-some': { success: false, pids: [HOLDER_PID, PAGE_PID], scope: 'per-process' },
  'refused-none': { success: false, pids: [], scope: 'global' },
  'ok': { success: true, pids: [HOLDER_PID, PAGE_PID], scope: 'none' },
  'spin': { success: true, pids: [HOLDER_PID, PAGE_PID], scope: 'none', spin: 2 },
};
const alloc = (bytes) => ({ attrs: { size: { type: 'scalar', units: 'bytes', value: bytes.toString(16) } } });
const dumpFor = (pid) => {
  const sizes = pid === PAGE_PID ? { fast_malloc: 20, blink_gc: 10, array_buffer: 310 } : { fast_malloc: 300, blink_gc: 200, array_buffer: 50 };
  const allocators = {
    'partition_alloc/partitions/fast_malloc': alloc(sizes.fast_malloc * MB),
    'partition_alloc/partitions/blink_gc': alloc(sizes.blink_gc * MB),
    'partition_alloc/partitions/array_buffer': alloc(sizes.array_buffer * MB),
    'partition_alloc/allocated_objects': alloc(1 * MB),
  };
  return { ph: 'v', pid, id: '0xA', name: 'explicitly_triggered', args: { dumps: { allocators, process_totals: { attrs: { resident_set_bytes: { type: 'scalar', units: 'bytes', value: (6144 * MB).toString(16) } } } } } };
};
const periodicFor = (pid) => ({ ph: 'v', pid, id: '0x0', name: 'periodic_interval', args: { dumps: { process_totals: { attrs: { resident_set_bytes: { type: 'scalar', units: 'bytes', value: (6144 * MB).toString(16) } } } } } });
const runScenario = async (name) => {
  const cfg = SCENARIOS[name];
  const server = http.createServer((req, res) => {
    if (req.url !== '/json/version') { res.statusCode = 404; res.end(); return; }
    res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify({ webSocketDebuggerUrl: 'ws://127.0.0.1:' + server.address().port + '/devtools/browser/fake' }));
  });
  const wss = new WebSocketServer({ server });
  const sendIf = (sock, msg) => { if (sock.readyState === 1) sock.send(JSON.stringify(msg)); };
  wss.on('connection', (sock) => sock.on('message', (raw) => {
    const m = JSON.parse(String(raw));
    const reply = (result) => sendIf(sock, { id: m.id, sessionId: m.sessionId, result });
    if (m.method === 'Target.createTarget') { reply({ targetId: 'T1' }); return; }
    if (m.method === 'Target.attachToTarget') { reply({ sessionId: 'S1' }); return; }
    if (m.method === 'Target.closeTarget') { reply({ success: true }); return; }
    if (m.method === 'Runtime.evaluate') { reply({ result: { type: 'number', value: m.params.expression.includes('new Worker') ? 2 : LOAD } }); return; }
    if (m.method === 'Tracing.requestMemoryDump') { setTimeout(() => sendIf(sock, { id: m.id, result: { dumpGuid: '0xA', success: cfg.success } }), REPLY_DELAY_MS); return; }
    if (m.method === 'Tracing.end') {
      reply({});
      setTimeout(() => {
        sendIf(sock, { method: 'Tracing.dataCollected', params: { value: [...cfg.pids.map((p) => dumpFor(p)), ...[4242, 5555].map((p) => periodicFor(p))] } });
        sendIf(sock, { method: 'Tracing.tracingComplete', params: {} });
      }, FLUSH_DELAY_MS);
      return;
    }
    reply({});
  }));
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const port = server.address().port;
  const rr = await new Promise((resolve) => { const c = spawn('node', [scriptPath, String(port), String(LOAD), String(cfg.spin || 0), '60']); let o = ''; c.stdout.on('data', (d) => { o += d; }); c.on('exit', (code) => resolve({ status: code, stdout: o })); });
  server.close();
  server.closeAllConnections?.();
  wss.close();
  const line = (rr.stdout || '').split('\n').find((l) => l.startsWith('STANDALONE_DUMP '));
  let h = null;
  try { h = line ? JSON.parse(line.slice('STANDALONE_DUMP '.length)) : null; } catch { h = null; }
  const checks = [];
  const check = (n, ok, got) => checks.push({ n: name + ': ' + n, ok: Boolean(ok), got: String(JSON.stringify(got) ?? 'absent').slice(0, 160) });
  check('script exit 0 and STANDALONE_DUMP line', rr.status === 0 && h !== null, rr.status);
  check('error absent', !!h && h.error === null, h && h.error);
  check('page load allocated 300 MB in the page', !!h && h.loadAllocatedMb === LOAD, h && h.loadAllocatedMb);
  check('dumpGuid and dumpSuccess as the reply says', !!h && h.dumpGuid === '0xA' && h.dumpSuccess === cfg.success, h && [h.dumpGuid, h.dumpSuccess]);
  check('reply after the request, tracingComplete after the reply', !!h && typeof h.requestReplyAtMs === 'number' && h.requestReplyAtMs >= h.requestedAtMs && typeof h.tracingCompleteAtMs === 'number' && h.tracingCompleteAtMs >= h.requestReplyAtMs, h && [h.requestedAtMs, h.requestReplyAtMs, h.tracingCompleteAtMs]);
  check('Tracing.end sent before tracingComplete', !!h && typeof h.endSentAtMs === 'number' && typeof h.tracingCompleteAtMs === 'number' && h.endSentAtMs <= h.tracingCompleteAtMs, h && [h.endSentAtMs, h.tracingCompleteAtMs]);
  check('page closed after the read', !!h && h.pageClosed === true, h && h.pageClosed);
  check('requestedPids equal the pids that sent explicitly_triggered events', !!h && JSON.stringify(h.requestedPids) === JSON.stringify(cfg.pids), h && h.requestedPids);
  check('periodicPids list the pids that sent periodic totals (both scenarios)', !!h && JSON.stringify(h.periodicPids) === JSON.stringify([4242, 5555]), h && h.periodicPids);
  check('eventsSeen equals the events sent (requested plus two periodic decoys)', !!h && h.eventsSeen === cfg.pids.length + 2, h && h.eventsSeen);
  check('scope names the refusal', !!h && typeof h.scope === 'string' && h.scope.startsWith(cfg.scope), h && h.scope);
  check('spin workers recorded as the spin count (null when not spinning)', !!h && h.spinWorkers === (cfg.spin || null), h && h.spinWorkers);
  if (cfg.pids.length) {
    check('load pid is the page renderer (array_buffer 310 MB)', !!h && h.loadPid === PAGE_PID && h.loadPidArrayBufferBytes === 310 * MB, h && [h.loadPid, h.loadPidArrayBufferBytes]);
    check('a sample dump event is recorded as JSON', !!h && typeof h.sampleDumpEvent === 'string' && h.sampleDumpEvent.includes('"ph":"v"'), h && h.sampleDumpEvent && h.sampleDumpEvent.slice(0, 60));
    check('dump event ids include the requested guid 0xA', !!h && (h.dumpEventIds || []).includes('0xA'), h && h.dumpEventIds);
    check('allocator names include the page array_buffer partition', !!h && (h.allocatorNames || []).includes('partition_alloc/partitions/array_buffer'), h && h.allocatorNames);
    check('holder dump lists 550 MB of partitions', !!h && (h.dumpedPids || []).some((p) => p.pid === HOLDER_PID && p.partitionTotalBytes === 550 * MB), h && h.dumpedPids);
  } else {
    check('no load pid when no process dumped', !!h && h.loadPid === null, h && h.loadPid);
  }
  return checks;
};
const all = [];
for (const name of Object.keys(SCENARIOS)) all.push(...await runScenario(name));
for (const c of all) console.log((c.ok ? 'PASS ' : 'FAIL ') + c.n + ' got=' + c.got);
const red = all.filter((c) => !c.ok).length;
console.log('STANDALONE DUMP WITNESS (' + scriptPath + '): ' + (red === 0 ? 'GREEN' : 'RED'));
process.exit(red === 0 ? 0 : 1);
