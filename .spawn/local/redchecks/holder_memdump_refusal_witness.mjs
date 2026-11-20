import http from 'node:http';
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
const require = createRequire('/config/.gmnew/pw/node_modules/');
const { WebSocketServer } = require('ws');
const readerPath = process.argv[2] || '/workspace/signal/world/signal-stage/.spawn/local/holder-memdump.mjs';
const MB = 1024 * 1024;
const hexOf = (n) => n.toString(16);
const alloc = (bytes) => ({ attrs: { size: { type: 'scalar', units: 'bytes', value: hexOf(bytes) } } });
const dumpFor = (pid, id) => ({ ph: 'v', pid, id, name: 'explicitly_triggered', args: { dumps: {
  allocators: {
    'partition_alloc/partitions/fast_malloc': alloc(300 * MB),
    'partition_alloc/partitions/blink_gc': alloc(200 * MB),
    'partition_alloc/partitions/array_buffer': alloc(50 * MB),
    'partition_alloc/allocated_objects': alloc(1 * MB),
    'v8/isolate_1/heap_spaces': alloc(80 * MB),
  },
  process_totals: { attrs: { resident_set_bytes: { type: 'scalar', units: 'bytes', value: hexOf(5800000000) } } },
} } });
const EVENTS = [dumpFor(4242, '0x5'), dumpFor(9999, '0x5')];
const REPLY_DELAY_MS = 15000;
const FLUSH_DELAY_MS = 8000;
const MODE = process.env.WITNESS_MODE || 'refusal';
const server = http.createServer((req, res) => {
  if (req.url !== '/json/version') { res.statusCode = 404; res.end(); return; }
  res.setHeader('content-type', 'application/json');
  res.end(JSON.stringify({ webSocketDebuggerUrl: 'ws://127.0.0.1:' + server.address().port + '/devtools/browser/fake' }));
});
const wss = new WebSocketServer({ server });
const sendIf = (sock, msg) => { if (sock.readyState === 1) sock.send(JSON.stringify(msg)); };
wss.on('connection', (sock) => sock.on('message', (raw) => {
  const m = JSON.parse(String(raw));
  if (m.method === 'Tracing.start') { sendIf(sock, { id: m.id, result: {} }); const iv = setInterval(() => sendIf(sock, { method: 'Tracing.bufferUsage', params: { percentFull: 0.1, eventCount: 5000 } }), 300); setTimeout(() => clearInterval(iv), 30000); return; }
  if (m.method === 'Tracing.requestMemoryDump') { setTimeout(() => sendIf(sock, { id: m.id, result: { success: false, dumpGuid: '0x5' } }), REPLY_DELAY_MS); return; }
  if (m.method === 'Tracing.end') {
    if (MODE !== 'blocked-end') sendIf(sock, { id: m.id, result: {} });
    setTimeout(() => { sendIf(sock, { method: 'Tracing.dataCollected', params: { value: EVENTS } }); sendIf(sock, { method: 'Tracing.tracingComplete', params: {} }); }, FLUSH_DELAY_MS);
    return;
  }
  sendIf(sock, { id: m.id, result: {} });
}));
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const port = server.address().port;
const rr = await new Promise((resolve) => { const c = spawn('node', [readerPath, String(port), '4242']); let o = ''; c.stdout.on('data', (d) => { o += d; }); c.on('exit', (code) => { server.close(); wss.close(); resolve({ status: code, stdout: o }); }); });
const line = (rr.stdout || '').split('\n').find((l) => l.startsWith('HOLDER_MEMDUMP '));
let h = null;
try { h = line ? JSON.parse(line.slice('HOLDER_MEMDUMP '.length)) : null; } catch { h = null; }
const checks = [];
const check = (name, ok, got) => checks.push({ name, ok: Boolean(ok), got: String(JSON.stringify(got) ?? 'absent').slice(0, 160) });
check('reader exit 0 and HOLDER_MEMDUMP line', rr.status === 0 && h !== null, rr.status);
check('field pid present and equal', !!h && h.pid === 4242, h && h.pid);
check('field error absent: the reply arrived and tracingComplete was received before the guard', !!h && h.error === null, h && h.error);
check('refusal recorded: dumpGuid 0x5 and dumpSuccess false (not hidden)', !!h && h.dumpGuid === '0x5' && h.dumpSuccess === false, h && [h.dumpGuid, h.dumpSuccess]);
check('eventsSeen 2 (the holder and the other pid events are both collected)', !!h && h.eventsSeen === 2, h && h.eventsSeen);
check('matchedDump true: the holder process dump for the requested guid is present despite the refusal', !!h && h.matchedDump === true, h && h.matchedDump);
check('residentSetBytes equals the holder process total (5.8 GB)', !!h && h.residentSetBytes === 5800000000, h && h.residentSetBytes);
check('buffer usage samples arrived during the wait (the trace kept filling)', !!h && h.bufferUsageSamples >= 1 && !!h.lastBufferUsage && h.lastBufferUsage.eventCount === 5000, h && [h.bufferUsageSamples, h.lastBufferUsage]);
check('tracingCompleteAtMs recorded (the flush finished before the guard)', !!h && typeof h.tracingCompleteAtMs === 'number', h && h.tracingCompleteAtMs);
const pa = h && h.partitionAlloc;
check('partitionAlloc total is the three partitions (550 MB)', !!pa && pa.totalBytes === 550 * MB, pa && pa.totalBytes);
check('topAllocators includes the v8 heap at 80 MB', !!h && Array.isArray(h.topAllocators) && h.topAllocators.some((a) => a.name === 'v8/isolate_1/heap_spaces' && a.sizeBytes === 80 * MB), h && h.topAllocators);
for (const c of checks) console.log((c.ok ? 'PASS ' : 'FAIL ') + c.name + ' got=' + c.got);
const red = checks.filter((c) => !c.ok).length;
console.log('HOLDER MEMDUMP REFUSAL WITNESS [' + MODE + '] (' + readerPath + '): ' + (red === 0 ? 'GREEN' : 'RED'));
process.exit(red === 0 ? 0 : 1);
