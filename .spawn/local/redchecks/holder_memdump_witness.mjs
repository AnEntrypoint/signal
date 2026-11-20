import http from 'node:http';
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
const require = createRequire('/config/.gmnew/pw/node_modules/');
const { WebSocketServer } = require('ws');
const readerPath = process.argv[2] || '/workspace/signal/world/signal-stage/.spawn/local/holder-memdump.mjs';
const MB = 1024 * 1024;
const hexOf = (n) => n.toString(16);
const alloc = (bytes) => ({ attrs: { size: { type: 'scalar', units: 'bytes', value: hexOf(bytes) }, effective_size: { type: 'scalar', units: 'bytes', value: hexOf(bytes) } } });
const dumpFor = (pid, id, scale) => ({ ph: 'v', pid, id, name: 'explicitly_triggered', args: { dumps: {
  allocators: {
    'partition_alloc/partitions/fast_malloc': alloc(300 * MB * scale),
    'partition_alloc/partitions/fast_malloc/buckets': alloc(100 * MB * scale),
    'partition_alloc/partitions/blink_gc': alloc(200 * MB * scale),
    'partition_alloc/partitions/array_buffer': alloc(50 * MB * scale),
    'partition_alloc/allocated_objects': alloc(1 * MB * scale),
    'v8/isolate_1/heap_spaces': alloc(80 * MB * scale),
    'skia/gpu': alloc(20 * MB * scale),
  },
  process_totals: { attrs: { resident_set_bytes: { type: 'scalar', units: 'bytes', value: hexOf(5800000000 * scale) } } },
} } });
const EVENTS = [dumpFor(4242, 'G42', 1), dumpFor(9999, 'G42', 10), dumpFor(4242, 'OTHER', 3)];
const server = http.createServer((req, res) => {
  if (req.url !== '/json/version') { res.statusCode = 404; res.end(); return; }
  res.setHeader('content-type', 'application/json');
  res.end(JSON.stringify({ webSocketDebuggerUrl: 'ws://127.0.0.1:' + server.address().port + '/devtools/browser/fake' }));
});
const wss = new WebSocketServer({ server });
wss.on('connection', (sock) => sock.on('message', (raw) => {
  const m = JSON.parse(String(raw));
  if (m.method === 'Tracing.requestMemoryDump') { sock.send(JSON.stringify({ id: m.id, result: { success: true, dumpGuid: 'G42' } })); return; }
  if (m.method === 'Tracing.end') {
    sock.send(JSON.stringify({ id: m.id, result: {} }));
    sock.send(JSON.stringify({ method: 'Tracing.dataCollected', params: { value: EVENTS } }));
    sock.send(JSON.stringify({ method: 'Tracing.tracingComplete', params: {} }));
    return;
  }
  sock.send(JSON.stringify({ id: m.id, result: {} }));
}));
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const port = server.address().port;
const rr = await new Promise((resolve) => { const c = spawn('node', [readerPath, String(port), '4242']); let o = ''; c.stdout.on('data', (d) => { o += d; }); c.on('exit', (code) => resolve({ status: code, stdout: o })); });
const line = (rr.stdout || '').split('\n').find((l) => l.startsWith('HOLDER_MEMDUMP '));
let h = null;
try { h = line ? JSON.parse(line.slice('HOLDER_MEMDUMP '.length)) : null; } catch { h = null; }
const checks = [];
const check = (name, ok, got) => checks.push({ name, ok: Boolean(ok), got: String(JSON.stringify(got) ?? 'absent').slice(0, 160) });
check('reader exit 0 and HOLDER_MEMDUMP line', rr.status === 0 && h !== null, rr.status);
check('field pid present and equal', h && h.pid === 4242, h && h.pid);
check('field error absent', h && h.error === null, h && h.error);
check('field dumpGuid and dumpSuccess present', h && h.dumpGuid === 'G42' && h.dumpSuccess === true, h && [h.dumpGuid, h.dumpSuccess]);
check('field requestedAtMs and completedAtMs present in order', h && typeof h.requestedAtMs === 'number' && typeof h.completedAtMs === 'number' && h.completedAtMs >= h.requestedAtMs, h && [h.requestedAtMs, h.completedAtMs]);
check('field eventsSeen present (3)', h && h.eventsSeen === 3, h && h.eventsSeen);
check('matchedDump true: the dump with the requested id was used', h && h.matchedDump === true, h && h.matchedDump);
check('residentSetBytes equals the holder process total (5.8 GB), not the other pid', h && h.residentSetBytes === 5800000000, h && h.residentSetBytes);
const pa = h && h.partitionAlloc;
check('partitionAlloc total is the three partitions (550 MB): child and allocated_objects excluded, other pid and other id ignored', !!pa && pa.totalBytes === 550 * MB, pa && pa.totalBytes);
check('partitions listed by size: fast_malloc 300 MB, blink_gc 200 MB, array_buffer 50 MB', !!pa && JSON.stringify(pa.partitions) === JSON.stringify([{ name: 'fast_malloc', sizeBytes: 300 * MB }, { name: 'blink_gc', sizeBytes: 200 * MB }, { name: 'array_buffer', sizeBytes: 50 * MB }]), pa && pa.partitions);
check('topAllocators present and includes v8 heap spaces at 80 MB', h && Array.isArray(h.topAllocators) && h.topAllocators.some((x) => x.name === 'v8/isolate_1/heap_spaces' && x.sizeBytes === 80 * MB), h && h.topAllocators);
for (const c of checks) console.log((c.ok ? 'PASS ' : 'FAIL ') + c.name + ' got=' + c.got);
const green = checks.every((c) => c.ok);
console.log('HOLDER MEMDUMP WITNESS (' + readerPath + '): ' + (green ? 'GREEN' : 'RED'));
server.close();
process.exit(green ? 0 : 1);
