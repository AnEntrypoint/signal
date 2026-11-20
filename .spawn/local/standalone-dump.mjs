const [port, loadArg] = process.argv.slice(2);
const LOAD_MB = Number(loadArg || 300);
const MB = 1048576;
const LOAD_FRACTION = 0.9;
const SPIN = Number(process.argv[4] || 0);
const GUARD_MS = Number(process.argv[5] || 150) * 1000;
const out = { port: Number(port), loadMb: LOAD_MB, loadAllocatedMb: null, targetId: null, sessionId: null, pageClosed: false, dumpGuid: null, dumpSuccess: false, requestedAtMs: null, requestReplyAtMs: null, endSentAtMs: null, endReplyAtMs: null, tracingCompleteAtMs: null, eventsSeen: 0, dumpedPids: [], loadPid: null, loadPidArrayBufferBytes: null, dumpEventIds: [], allocatorNames: [], spinWorkers: null, sampleDumpEvent: null, triggers: null, dumpNames: {}, eventShapes: {}, guidHitCount: null, guidHitSamples: [], periodicPids: [], requestedPids: [], scope: null, error: null };
const finish = () => { console.log('STANDALONE_DUMP ' + JSON.stringify(out)); process.exit(0); };
const guard = setTimeout(() => { out.error = 'timeout'; finish(); }, GUARD_MS);
const sizeOf = (attrs, key) => (attrs && attrs[key] && attrs[key].units === 'bytes' ? parseInt(attrs[key].value, 16) : null);
const summarize = (events) => {
  out.periodicPids = [...new Set(events.filter((e) => e.ph === 'v' && e.name === 'periodic_interval' && e.args && e.args.dumps).map((e) => e.pid))].sort((a, b) => a - b);
  const latest = new Map();
  for (const e of events) {
    if (e.ph !== 'v' || !e.args || !e.args.dumps) continue;
    if (!(e.name === 'explicitly_triggered' && e.id === out.dumpGuid)) continue;

    latest.set(e.pid, { e, matched: true });
  }
  out.dumpedPids = [...latest.entries()].sort((a, b) => a[0] - b[0]).map(([pid, { e, matched }]) => {
    const rows = Object.entries(e.args.dumps.allocators || {}).map(([name, a]) => ({ name, sizeBytes: sizeOf(a.attrs, 'size') })).filter((r) => r.sizeBytes !== null);
    const partitions = rows.filter((r) => /^partition_alloc\/partitions\/[^/]+$/.test(r.name));
    const arrayBuffer = rows.find((r) => r.name === 'partition_alloc/partitions/array_buffer');
    return { pid, matched, partitionTotalBytes: partitions.reduce((s, p) => s + p.sizeBytes, 0), arrayBufferBytes: arrayBuffer ? arrayBuffer.sizeBytes : null, residentSetBytes: sizeOf((e.args.dumps.process_totals || {}).attrs, 'resident_set_bytes') };
  });
  const sampleEvent = events.find((e) => e.ph === 'v' && e.args && e.args.dumps);
  out.sampleDumpEvent = sampleEvent ? JSON.stringify(sampleEvent).slice(0, 1500) : null;
  out.dumpEventIds = [...new Set(events.filter((e) => e.ph === 'v' && e.args && e.args.dumps).map((e) => String(e.id)))].slice(0, 10);
  out.dumpNames = events.filter((e) => e.ph === 'v' && e.args && e.args.dumps).reduce((acc, e) => ({ ...acc, [e.name]: (acc[e.name] || 0) + 1 }), {});
  out.eventShapes = events.reduce((acc, e) => { const k = [e.ph, e.cat, e.name].join('|'); return { ...acc, [k]: (acc[k] || 0) + 1 }; }, {});
  const guidNeedle = '"' + out.dumpGuid + '"';
  const guidHits = events.filter((e) => JSON.stringify(e).includes(guidNeedle));
  out.guidHitCount = guidHits.length;
  out.guidHitSamples = guidHits.slice(0, 3).map((e) => JSON.stringify(e).slice(0, 400));
  out.allocatorNames = Object.keys(events.find((e) => e.ph === 'v' && e.args && e.args.dumps)?.args.dumps.allocators || {}).slice(0, 40);
  out.requestedPids = out.dumpedPids.map((p) => p.pid);
  const candidates = out.dumpedPids.filter((p) => p.arrayBufferBytes !== null && p.arrayBufferBytes >= LOAD_MB * MB * LOAD_FRACTION);
  const best = candidates.length ? candidates.reduce((a, b) => (b.arrayBufferBytes > a.arrayBufferBytes ? b : a)) : null;
  out.loadPid = best ? best.pid : null;
  out.loadPidArrayBufferBytes = best ? best.arrayBufferBytes : null;
  out.scope = out.dumpSuccess ? (out.dumpedPids.length ? 'none: the dump succeeded' : 'success with no pid events') : (out.dumpedPids.length ? 'per-process: the global request was refused, ' + out.dumpedPids.length + ' processes still dumped' : 'global: refused and no process dumped');
};
const run = async () => {
  const ver = await (await fetch('http://127.0.0.1:' + port + '/json/version')).json();
  const sock = new WebSocket(ver.webSocketDebuggerUrl);
  await new Promise((res, rej) => { sock.onopen = res; sock.onerror = () => rej(new Error('websocket failed')); });
  let seq = 0;
  const waiting = new Map();
  const events = [];
  let complete = null;
  const completed = new Promise((res) => { complete = res; });
  sock.onmessage = (ev) => {
    const m = JSON.parse(String(ev.data));
    if (m.method === 'Tracing.dataCollected') { events.push(...((m.params && m.params.value) || [])); return; }
    if (m.method === 'Tracing.tracingComplete') { out.tracingCompleteAtMs = Date.now(); complete(); return; }
    const w = waiting.get(m.id);
    if (!w) return;
    waiting.delete(m.id);
    if (m.error) w.reject(new Error(m.error.message)); else w.resolve(m.result);
  };
  const send = (method, params, sessionId) => new Promise((resolve, reject) => { const id = ++seq; waiting.set(id, { resolve, reject }); const msg = { id, method, params: params || {} }; if (sessionId) msg.sessionId = sessionId; sock.send(JSON.stringify(msg)); });
  const created = await send('Target.createTarget', { url: 'about:blank' });
  out.targetId = created.targetId;
  const attached = await send('Target.attachToTarget', { targetId: out.targetId, flatten: true });
  out.sessionId = attached.sessionId;
  const loaded = await send('Runtime.evaluate', { expression: '(() => { window.__load = []; for (let i = 0; i < ' + LOAD_MB + '; i++) { const b = new Uint8Array(1048576); b.fill(7); window.__load.push(b); } return window.__load.length; })()', returnByValue: true }, out.sessionId);
  out.loadAllocatedMb = loaded.result && loaded.result.value;
  if (SPIN > 0) {
    const spun = await send('Runtime.evaluate', { expression: '(() => { const url = URL.createObjectURL(new Blob(["for (;;) {}"])); for (let i = 0; i < ' + SPIN + '; i++) new Worker(url); return ' + SPIN + '; })()', returnByValue: true }, out.sessionId);
    out.spinWorkers = spun.result && spun.result.value;
  }
  const TRIGGERS = process.env.STANDALONE_TRIGGERS === 'none' ? 'none' : 'default';
  out.triggers = TRIGGERS;
  const traceConfig = { recordMode: 'recordUntilFull', includedCategories: ['disabled-by-default-memory-infra'] };
  if (TRIGGERS === 'none') traceConfig.memoryDumpConfig = { triggers: [] };
  await send('Tracing.start', { traceConfig, transferMode: 'ReportEvents' });
  out.requestedAtMs = Date.now();
  const dump = await send('Tracing.requestMemoryDump', { deterministic: false, levelOfDetail: 'detailed' });
  out.requestReplyAtMs = Date.now();
  out.dumpGuid = dump.dumpGuid || null;
  out.dumpSuccess = dump.success === true;
  out.endSentAtMs = Date.now();
  send('Tracing.end').then(() => { out.endReplyAtMs = Date.now(); }, () => {});
  await completed;
  out.eventsSeen = events.length;
  summarize(events);
  await send('Target.closeTarget', { targetId: out.targetId }).then(() => { out.pageClosed = true; }, () => {});
  sock.close();
};
run().then(() => { clearTimeout(guard); finish(); }, (e) => { clearTimeout(guard); out.error = String(e.message).slice(0, 200); finish(); });
