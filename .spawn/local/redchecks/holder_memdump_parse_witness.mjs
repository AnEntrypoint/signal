import http from 'node:http';
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
const require = createRequire('/config/.gmnew/pw/node_modules/');
const { WebSocketServer } = require('ws');
const readerPath = process.argv[2] || '/workspace/signal/world/signal-stage/.spawn/local/holder-memdump.mjs';
const MB = 1048576;
const hexOf = (n) => n.toString(16);
const alloc = (bytes) => ({ attrs: { size: { type: 'scalar', units: 'bytes', value: hexOf(bytes) } } });
const dumpFor = (pid, id, scale, name) => ({ ph: 'v', pid, id, name, cat: 'disabled-by-default-memory-infra', args: { dumps: {
  allocators: {
    'partition_alloc/partitions/fast_malloc': alloc(300 * MB * scale),
    'partition_alloc/partitions/blink_gc': alloc(200 * MB * scale),
    'partition_alloc/partitions/array_buffer': alloc(50 * MB * scale),
    'partition_alloc/allocated_objects': alloc(1 * MB * scale),
    'v8/isolate_1/heap_spaces': alloc(80 * MB * scale),
  },
  process_totals: { attrs: { resident_set_bytes: { type: 'scalar', units: 'bytes', value: hexOf(5800000000 * scale) } } },
} } });
const PERIODIC = { args: { dumps: { level_of_detail: 'detailed', process_totals: { is_peak_rss_resettable: true, peak_resident_set_size: 'd62a000', private_footprint_bytes: '279d000' } } }, cat: 'disabled-by-default-memory-infra', id: '0x0', name: 'periodic_interval', ph: 'v', pid: 4242, tid: -1, ts: 44449750854 };
const CASES = {
  'requested-present': { events: () => [PERIODIC, dumpFor(4242, 'G42', 1, 'explicitly_triggered'), dumpFor(9999, 'G42', 10, 'explicitly_triggered'), dumpFor(4242, 'OTHER', 3, 'explicitly_triggered')] },
  'only-periodic': { events: () => [PERIODIC] },
  'name-mismatch': { events: () => [dumpFor(4242, 'G42', 1, 'periodic_interval')] },
};
const runCase = async (name) => {
  const cfg = CASES[name];
  const server = http.createServer((req, res) => {
    if (req.url !== '/json/version') { res.statusCode = 404; res.end(); return; }
    res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify({ webSocketDebuggerUrl: 'ws://127.0.0.1:' + server.address().port + '/devtools/browser/fake' }));
  });
  const wss = new WebSocketServer({ server });
  const sendIf = (sock, msg) => { if (sock.readyState === 1) sock.send(JSON.stringify(msg)); };
  wss.on('connection', (sock) => sock.on('message', (raw) => {
    const m = JSON.parse(String(raw));
    if (m.method === 'Tracing.requestMemoryDump') { sendIf(sock, { id: m.id, result: { dumpGuid: 'G42', success: true } }); return; }
    if (m.method === 'Tracing.end') {
      sendIf(sock, { id: m.id, result: {} });
      setTimeout(() => { sendIf(sock, { method: 'Tracing.dataCollected', params: { value: cfg.events() } }); sendIf(sock, { method: 'Tracing.tracingComplete', params: {} }); }, 200);
      return;
    }
    sendIf(sock, { id: m.id, result: {} });
  }));
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const port = server.address().port;
  const rr = await new Promise((resolve) => { const c = spawn('node', [readerPath, String(port), '4242']); let o = ''; c.stdout.on('data', (d) => { o += d; }); c.on('exit', (code) => { server.close(); server.closeAllConnections?.(); wss.close(); resolve({ status: code, stdout: o }); }); });
  const line = (rr.stdout || '').split('\n').find((l) => l.startsWith('HOLDER_MEMDUMP '));
  let h = null;
  try { h = line ? JSON.parse(line.slice('HOLDER_MEMDUMP '.length)) : null; } catch { h = null; }
  const checks = [];
  const check = (n, ok, got) => checks.push({ n: name + ': ' + n, ok: Boolean(ok), got: String(JSON.stringify(got) ?? 'absent').slice(0, 160) });
  check('reader exit 0 and HOLDER_MEMDUMP line', rr.status === 0 && h !== null, rr.status);
  const IDS_BY_CASE = { 'requested-present': ['0x0', 'G42', 'OTHER'], 'only-periodic': ['0x0'], 'name-mismatch': ['G42'] };
  check('dumpEventIds lists the ids of the holder v events in order (fixture ids for the requested dump are assumptions)', !!h && JSON.stringify(h.dumpEventIds) === JSON.stringify(IDS_BY_CASE[name]), h && h.dumpEventIds);
  check('error absent (the reply and tracingComplete arrived)', !!h && h.error === null, h && h.error);
  if (name === 'requested-present') {
    check('requestedEvents 1: only the explicitly_triggered event with the requested guid', !!h && h.requestedEvents === 1, h && h.requestedEvents);
    check('matchedDump true', !!h && h.matchedDump === true, h && h.matchedDump);
    check('residentSetBytes is the requested holder dump (5.8 GB), not the periodic total, the other guid, or the other pid', !!h && h.residentSetBytes === 5800000000, h && h.residentSetBytes);
    check('partitionAlloc total 550 MB from the requested dump', !!h && !!h.partitionAlloc && h.partitionAlloc.totalBytes === 550 * MB, h && h.partitionAlloc && h.partitionAlloc.totalBytes);
    check('dumpNames counts the holder events by name (1 periodic, 2 explicit)', !!h && JSON.stringify(h.dumpNames) === JSON.stringify({ periodic_interval: 1, explicitly_triggered: 2 }), h && h.dumpNames);
  } else if (name === 'only-periodic') {
    check('no requested event: matchedDump false, requestedEvents 0', !!h && h.matchedDump === false && h.requestedEvents === 0, h && [h.matchedDump, h.requestedEvents]);
    check('no fallback to the periodic total: residentSetBytes and partitionAlloc null', !!h && h.residentSetBytes === null && h.partitionAlloc === null, h && [h.residentSetBytes, h.partitionAlloc]);
    check('dumpNames shows the periodic event only', !!h && JSON.stringify(h.dumpNames) === JSON.stringify({ periodic_interval: 1 }), h && h.dumpNames);
  } else {
    check('same guid under the periodic name is not the requested dump', !!h && h.requestedEvents === 0 && h.matchedDump === false, h && [h.requestedEvents, h.matchedDump]);
    check('no partitions taken from the periodic-named event', !!h && h.partitionAlloc === null, h && h.partitionAlloc);
  }
  return checks;
};
const all = [];
for (const name of Object.keys(CASES)) all.push(...await runCase(name));
for (const c of all) console.log((c.ok ? 'PASS ' : 'FAIL ') + c.n + ' got=' + c.got);
const red = all.filter((c) => !c.ok).length;
console.log('HOLDER MEMDUMP PARSE WITNESS (' + readerPath + '): ' + (red === 0 ? 'GREEN' : 'RED'));
process.exit(red === 0 ? 0 : 1);
