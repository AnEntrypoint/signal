const [port, holderPid] = process.argv.slice(2);
const HOLDER = Number(holderPid);
const out = { pid: HOLDER, error: null, dumpGuid: null, dumpSuccess: false, requestedAtMs: null, completedAtMs: null, eventsSeen: 0, matchedDump: false, residentSetBytes: null, partitionAlloc: null, topAllocators: [] };
const finish = () => { console.log('HOLDER_MEMDUMP ' + JSON.stringify(out)); process.exit(0); };
const guard = setTimeout(() => { out.error = 'timeout'; finish(); }, 20000);
const sizeOf = (attrs, key) => (attrs && attrs[key] && attrs[key].units === 'bytes' ? parseInt(attrs[key].value, 16) : null);
const summarize = (events) => {
  const dumps = events.filter((e) => e.ph === 'v' && e.pid === HOLDER && e.args && e.args.dumps);
  const matched = dumps.filter((e) => e.id === out.dumpGuid);
  out.matchedDump = matched.length > 0;
  const pick = matched.length ? matched[matched.length - 1] : dumps[dumps.length - 1];
  if (!pick) return;
  const allocators = pick.args.dumps.allocators || {};
  const procTotals = pick.args.dumps.process_totals || {};
  out.residentSetBytes = sizeOf(procTotals.attrs, 'resident_set_bytes');
  const rows = Object.entries(allocators).map(([name, a]) => ({ name, sizeBytes: sizeOf(a.attrs, 'size') })).filter((r) => r.sizeBytes !== null);
  const parts = rows.filter((r) => /^partition_alloc\/partitions\/[^/]+$/.test(r.name)).map((r) => ({ name: r.name.split('/')[2], sizeBytes: r.sizeBytes })).sort((a, b) => b.sizeBytes - a.sizeBytes);
  out.partitionAlloc = { totalBytes: parts.reduce((s, p) => s + p.sizeBytes, 0), partitions: parts };
  out.topAllocators = rows.filter((r) => r.name.split('/').length <= 3).sort((a, b) => b.sizeBytes - a.sizeBytes).slice(0, 20);
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
    if (m.method === 'Tracing.tracingComplete') { complete(); return; }
    const w = waiting.get(m.id);
    if (!w) return;
    waiting.delete(m.id);
    if (m.error) w.reject(new Error(m.error.message)); else w.resolve(m.result);
  };
  const send = (method, params) => new Promise((resolve, reject) => { const id = ++seq; waiting.set(id, { resolve, reject }); sock.send(JSON.stringify({ id, method, params: params || {} })); });
  await send('Tracing.start', { traceConfig: { recordMode: 'recordUntilFull', includedCategories: ['disabled-by-default-memory-infra'] }, transferMode: 'ReportEvents' });
  out.requestedAtMs = Date.now();
  const dump = await send('Tracing.requestMemoryDump', { deterministic: false, levelOfDetail: 'detailed' });
  out.completedAtMs = Date.now();
  out.dumpGuid = dump.dumpGuid || null;
  out.dumpSuccess = dump.success === true;
  await send('Tracing.end');
  await completed;
  out.eventsSeen = events.length;
  summarize(events);
  sock.close();
};
run().then(() => { clearTimeout(guard); finish(); }, (e) => { clearTimeout(guard); out.error = String(e.message).slice(0, 200); finish(); });
