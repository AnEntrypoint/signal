import http from 'node:http';
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { mkdirSync, readFileSync, rmSync, existsSync } from 'node:fs';
const require = createRequire('/config/.gmnew/pw/node_modules/');
const { WebSocketServer } = require('ws');
const readerPath = process.argv[2] || '/workspace/signal/world/signal-stage/.spawn/local/holder-memdump.mjs';
const OUT = '/tmp/verify/witness-stream';
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
const HOLDER_PID = 4242;
const EARLY = [];
const LATE = [];
for (let i = 0; i < 300; i += 1) EARLY.push({ ph: 'X', pid: 2000 + (i % 7), tid: 1 + (i % 5), ts: 1000000 + i * 400, dur: 40, cat: 'toplevel', name: 'ThreadControllerImpl::RunTask', args: {} });
for (let i = 0; i < 299; i += 1) LATE.push({ ph: 'X', pid: 2000 + (i % 7), tid: 1 + (i % 5), ts: 2000000 + i * 40000, dur: 50, cat: 'toplevel', name: 'ThreadControllerImpl::RunTask', args: {} });
LATE.push({ ph: 'X', pid: HOLDER_PID, tid: HOLDER_PID, ts: 9500000, dur: 2000, cat: 'disabled-by-default-memory-infra', name: 'MemoryDumpManager::FinishAsyncProcessDump', args: {} });
const ALL = [...EARLY, ...LATE];
const TRACE_TEXT = JSON.stringify({ traceEvents: ALL, metadata: {} });
const third = Math.ceil(TRACE_TEXT.length / 3);
const CHUNKS = [TRACE_TEXT.slice(0, third), TRACE_TEXT.slice(third, 2 * third), TRACE_TEXT.slice(2 * third)];
const runScenario = async (name, env, opts) => {
  const seen = { start: null, reads: 0, closes: [], streamFormat: null, streamCompression: null };
  const server = http.createServer((req, res) => {
    if (req.url !== '/json/version') { res.statusCode = 404; res.end(); return; }
    res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify({ webSocketDebuggerUrl: 'ws://127.0.0.1:' + server.address().port + '/devtools/browser/fake' }));
  });
  const wss = new WebSocketServer({ server });
  wss.on('connection', (sock) => sock.on('message', (raw) => {
    const m = JSON.parse(String(raw));
    const reply = (result) => sock.send(JSON.stringify({ id: m.id, result }));
    if (m.method === 'Tracing.start') { seen.start = m.params.transferMode; seen.streamFormat = m.params.streamFormat ?? null; seen.streamCompression = m.params.streamCompression ?? null; reply({}); return; }
    if (m.method === 'Tracing.requestMemoryDump') { reply({ dumpGuid: 'G42', success: false }); return; }
    if (m.method === 'Tracing.end') {
      reply({});
      if (seen.start === 'ReturnAsStream') {
        setTimeout(() => sock.send(JSON.stringify({ method: 'Tracing.tracingComplete', params: { dataLossOccurred: false, stream: 'S7', traceFormat: 'json', streamCompression: 'none' } })), 1000);
      } else {
        sock.send(JSON.stringify({ method: 'Tracing.dataCollected', params: { value: EARLY } }));
        sock.send(JSON.stringify({ method: 'Tracing.tracingComplete', params: { dataLossOccurred: true } }));
      }
      return;
    }
    if (m.method === 'IO.read') { seen.reads += 1; const idx = seen.reads - 1; reply({ data: CHUNKS[idx], eof: idx === CHUNKS.length - 1 }); return; }
    if (m.method === 'IO.close') { seen.closes.push(m.params.handle); reply({}); return; }
    reply({});
  }));
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const port = server.address().port;
  const eventsOut = OUT + '/' + name + '.json';
  const t0 = Date.now();
  const rr = await new Promise((resolve) => {
    const c = spawn('node', [readerPath, String(port), String(HOLDER_PID)], { env: { ...process.env, HOLDER_EVENTS_OUT: eventsOut, ...env } });
    let o = '';
    c.stdout.on('data', (d) => { o += d; });
    c.on('exit', (code) => resolve({ status: code, stdout: o }));
  });
  const wall = Date.now() - t0;
  wss.close(); server.close();
  const line = (rr.stdout || '').split('\n').find((l) => l.startsWith('HOLDER_MEMDUMP '));
  let h = null;
  try { h = line ? JSON.parse(line.slice('HOLDER_MEMDUMP '.length)) : null; } catch { h = null; }
  const saved = existsSync(eventsOut) ? JSON.parse(readFileSync(eventsOut, 'utf8')) : [];
  const holderFinish = saved.filter((e) => e.pid === HOLDER_PID && e.name === 'MemoryDumpManager::FinishAsyncProcessDump');
  return { rr, h, wall, saved, seen, holderFinish };
};
const checks = [];
const check = (name, ok, got) => checks.push({ name, ok: Boolean(ok), got: String(JSON.stringify(got) ?? 'absent').slice(0, 160) });
{
  const s = await runScenario('stream-to-end', {}, {});
  const h = s.h;
  check('stream-to-end: reader exit 0 and HOLDER_MEMDUMP line', s.rr.status === 0 && h !== null, s.rr.status);
  check('stream-to-end: error null', h && h.error === null, h && h.error);
  check('stream-to-end: transferMode ReturnAsStream sent', s.seen.start === 'ReturnAsStream', s.seen.start);
  check('stream-to-end: streamFormat json and streamCompression none sent', s.seen.streamFormat === 'json' && s.seen.streamCompression === 'none', [s.seen.streamFormat, s.seen.streamCompression]);
  check('stream-to-end: saved events equal the whole fixture (600)', s.saved.length === ALL.length, s.saved.length);
  check('stream-to-end: holder late finish present (fixture at 9.5 s, ASSUMED stream shape)', s.holderFinish.length === 1, s.holderFinish.length);
  check('stream-to-end: tracingComplete seen with stream S7 and dataLossOccurred false', h && h.tracingCompleteAtMs !== null && h.streamHandle === 'S7' && h.dataLossOccurred === false, h && [h.streamHandle, h.dataLossOccurred]);
  check('stream-to-end: streamEvents recorded (600)', h && h.streamEvents === ALL.length, h && h.streamEvents);
  check('stream-to-end: IO.read called until eof (3 reads)', s.seen.reads === CHUNKS.length, s.seen.reads);
  check('stream-to-end: IO.close called once with S7', s.seen.closes.length === 1 && s.seen.closes[0] === 'S7', s.seen.closes);
}
{
  const s = await runScenario('events-cut', { HOLDER_TRANSFER: 'events' }, {});
  const h = s.h;
  check('events-cut: reader exit 0 and HOLDER_MEMDUMP line', s.rr.status === 0 && h !== null, s.rr.status);
  check('events-cut: transferMode ReportEvents sent', s.seen.start === 'ReportEvents', s.seen.start);
  check('events-cut: saved events stop at the early cut (300 of 600)', s.saved.length === EARLY.length, s.saved.length);
  check('events-cut: holder late finish absent (the cut)', s.holderFinish.length === 0, s.holderFinish.length);
  check('events-cut: dataLossOccurred true recorded', h && h.dataLossOccurred === true, h && h.dataLossOccurred);
  check('events-cut: no IO.read used', s.seen.reads === 0, s.seen.reads);
}
let fails = 0;
for (const c of checks) { if (!c.ok) fails += 1; console.log((c.ok ? 'PASS ' : 'FAIL ') + c.name + ' got=' + c.got); }
console.log('HOLDER MEMDUMP STREAM WITNESS (' + readerPath + '): ' + (fails === 0 ? 'GREEN' : 'RED ' + fails));
process.exit(fails === 0 ? 0 : 1);
