import http from 'node:http';
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
const require = createRequire('/config/.gmnew/pw/node_modules/');
const { WebSocketServer } = require('ws');
const readerPath = process.argv[2] || '/workspace/signal/world/signal-stage/.spawn/local/holder-memdump.mjs';
const MB = 1048576;
const HOLDER_PID = 4242;
const hexOf = (n) => n.toString(16);
const sizeAttrs = (bytes) => ({ attrs: { size: { type: 'scalar', units: 'bytes', value: hexOf(bytes) } } });
const dumpsFor = (scale) => ({
  allocators: {
    'partition_alloc/partitions/fast_malloc': sizeAttrs(300 * MB * scale),
    'partition_alloc/partitions/blink_gc': sizeAttrs(200 * MB * scale),
    'partition_alloc/partitions/array_buffer': sizeAttrs(50 * MB * scale),
    'partition_alloc/allocated_objects': sizeAttrs(1 * MB * scale),
    'v8/isolate_1/heap_spaces': sizeAttrs(80 * MB * scale),
  },
  process_totals: { attrs: { resident_set_bytes: { type: 'scalar', units: 'bytes', value: hexOf(5800000000 * scale) } } },
});
const PERIODIC = { args: { dumps: { level_of_detail: 'detailed', process_totals: { is_peak_rss_resettable: true, peak_resident_set_size: 'd62a000', private_footprint_bytes: '279d000' } } }, cat: 'disabled-by-default-memory-infra', id: '0x0', name: 'periodic_interval', ph: 'v', pid: HOLDER_PID, tid: -1, ts: 44449750854 };
const memBegin = (pid, guid, name = 'ProcessMemoryDump') => ({ ph: 'b', pid, id: '0x14c', cat: 'disabled-by-default-memory-infra', name, args: { dump_guid: guid } });
const memEnd = (pid, guid, scale, name = 'ProcessMemoryDump') => ({ ph: 'e', pid, id: '0x14c', cat: 'disabled-by-default-memory-infra', name, args: { dump_guid: guid, dumps: dumpsFor(scale) } });
const oldV = (pid, id, scale) => ({ ph: 'v', pid, id, name: 'explicitly_triggered', cat: 'disabled-by-default-memory-infra', args: { dumps: dumpsFor(scale) } });
const periodicAt = (pid, ts, priv) => ({ ...PERIODIC, pid, ts, args: { dumps: { level_of_detail: 'detailed', process_totals: { is_peak_rss_resettable: true, peak_resident_set_size: 'd62a000', private_footprint_bytes: priv } } } });
const CASES = {
  'requested-present': {
    events: () => [PERIODIC, memBegin(HOLDER_PID, 'G42'), memBegin(HOLDER_PID, 'G42', 'GlobalMemoryDump'), memEnd(HOLDER_PID, 'G42', 1), memEnd(9999, 'G42', 10), memEnd(HOLDER_PID, 'OTHER', 3)],
    expect: { residentSetBytes: 5800000000, partitionTotalBytes: 550 * MB, matchedDump: true, requestedEvents: 2, requestedShapes: { 'b|ProcessMemoryDump': 1, 'e|ProcessMemoryDump': 1 }, requestedEndArgKeys: ['dump_guid', 'dumps'], dumpEventIds: ['0x0'], dumpNames: { periodic_interval: 1 }, periodicSamples: 1, periodicProcessTotalsKeys: ['is_peak_rss_resettable', 'peak_resident_set_size', 'private_footprint_bytes'], privateFootprintBytes: parseInt('279d000', 16), peakResidentSetBytes: parseInt('d62a000', 16) },
  },
  'periodic-latest': {
    events: () => [periodicAt(HOLDER_PID, 1, '100'), periodicAt(HOLDER_PID, 5, '200'), periodicAt(9999, 9, 'ff')],
    expect: { residentSetBytes: null, partitionTotalBytes: null, matchedDump: false, requestedEvents: 0, requestedShapes: {}, requestedEndArgKeys: null, dumpEventIds: ['0x0'], dumpNames: { periodic_interval: 2 }, periodicSamples: 2, periodicProcessTotalsKeys: ['is_peak_rss_resettable', 'peak_resident_set_size', 'private_footprint_bytes'], privateFootprintBytes: parseInt('200', 16), peakResidentSetBytes: parseInt('d62a000', 16) },
  },
  'only-periodic': {
    events: () => [PERIODIC],
    expect: { residentSetBytes: null, partitionTotalBytes: null, matchedDump: false, requestedEvents: 0, requestedShapes: {}, requestedEndArgKeys: null, dumpEventIds: ['0x0'], dumpNames: { periodic_interval: 1 }, periodicSamples: 1, periodicProcessTotalsKeys: ['is_peak_rss_resettable', 'peak_resident_set_size', 'private_footprint_bytes'], privateFootprintBytes: parseInt('279d000', 16), peakResidentSetBytes: parseInt('d62a000', 16) },
  },
  'old-v-shape': {
    events: () => [PERIODIC, oldV(HOLDER_PID, 'G42', 1)],
    expect: { residentSetBytes: null, partitionTotalBytes: null, matchedDump: false, requestedEvents: 0, requestedShapes: {}, requestedEndArgKeys: null, dumpEventIds: ['0x0', 'G42'], dumpNames: { periodic_interval: 1, explicitly_triggered: 1 }, periodicSamples: 1, periodicProcessTotalsKeys: ['is_peak_rss_resettable', 'peak_resident_set_size', 'private_footprint_bytes'], privateFootprintBytes: parseInt('279d000', 16), peakResidentSetBytes: parseInt('d62a000', 16) },
  },
  'begin-only': {
    events: () => [PERIODIC, memBegin(HOLDER_PID, 'G42')],
    expect: { residentSetBytes: null, partitionTotalBytes: null, matchedDump: true, requestedEvents: 1, requestedShapes: { 'b|ProcessMemoryDump': 1 }, requestedEndArgKeys: null, dumpEventIds: ['0x0'], dumpNames: { periodic_interval: 1 }, periodicSamples: 1, periodicProcessTotalsKeys: ['is_peak_rss_resettable', 'peak_resident_set_size', 'private_footprint_bytes'], privateFootprintBytes: parseInt('279d000', 16), peakResidentSetBytes: parseInt('d62a000', 16) },
  },
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
  const rr = await new Promise((resolve) => { const c = spawn('node', [readerPath, String(port), String(HOLDER_PID)]); let o = ''; c.stdout.on('data', (d) => { o += d; }); c.on('exit', (code) => { server.close(); server.closeAllConnections?.(); wss.close(); resolve({ status: code, stdout: o }); }); });
  const line = (rr.stdout || '').split('\n').find((l) => l.startsWith('HOLDER_MEMDUMP '));
  let h = null;
  try { h = line ? JSON.parse(line.slice('HOLDER_MEMDUMP '.length)) : null; } catch { h = null; }
  const checks = [];
  const check = (n, ok, got) => checks.push({ n: name + ': ' + n, ok: Boolean(ok), got: String(JSON.stringify(got) ?? 'absent').slice(0, 160) });
  check('reader exit 0 and HOLDER_MEMDUMP line', rr.status === 0 && h !== null, rr.status);
  check('error absent (the reply and tracingComplete arrived)', !!h && h.error === null, h && h.error);
  const got = {
    residentSetBytes: h ? h.residentSetBytes : null,
    partitionTotalBytes: h && h.partitionAlloc ? h.partitionAlloc.totalBytes : null,
    matchedDump: h ? h.matchedDump : null,
    requestedEvents: h ? h.requestedEvents : null,
    requestedShapes: h ? h.requestedShapes : null,
    requestedEndArgKeys: h ? h.requestedEndArgKeys : null,
    dumpEventIds: h ? h.dumpEventIds : null,
    dumpNames: h ? h.dumpNames : null,
    periodicSamples: h ? h.periodicSamples : null,
    periodicProcessTotalsKeys: h ? h.periodicProcessTotalsKeys : null,
    privateFootprintBytes: h ? h.privateFootprintBytes : null,
    peakResidentSetBytes: h ? h.peakResidentSetBytes : null,
  };
  for (const k of Object.keys(cfg.expect)) {
    const label = k === 'residentSetBytes' || k === 'partitionTotalBytes' ? k + ' (from the e-event payload, ASSUMED shape)' : k;
    check(label + ' = ' + JSON.stringify(cfg.expect[k]), JSON.stringify(got[k]) === JSON.stringify(cfg.expect[k]), got[k]);
  }
  return checks;
};
const all = [];
for (const name of Object.keys(CASES)) all.push(...await runCase(name));
for (const c of all) console.log((c.ok ? 'PASS ' : 'FAIL ') + c.n + ' got=' + c.got);
const red = all.filter((c) => !c.ok).length;
console.log('HOLDER MEMDUMP PARSE WITNESS (' + readerPath + '): ' + (red === 0 ? 'GREEN' : 'RED'));
process.exit(red === 0 ? 0 : 1);
