const [port, holderPid, overGb] = process.argv.slice(2);
const out = { pid: Number(holderPid), renderersOverGb: Number(overGb), mapping: 'site-per-process: frames and workers on the probe origin are taken to share the renderer; renderersOverGb says whether that holds', frameUrls: [], workers: [], perTargetHeap: [], error: null };
const finish = () => { console.log('HOLDER_JSON ' + JSON.stringify(out)); process.exit(0); };
const guard = setTimeout(() => { out.error = 'timeout'; finish(); }, 8000);
const walk = (node) => { out.frameUrls.push(node.frame.url); for (const c of node.childFrames || []) walk(c); };
const run = async () => {
  const ver = await (await fetch('http://127.0.0.1:' + port + '/json/version')).json();
  const sock = new WebSocket(ver.webSocketDebuggerUrl);
  await new Promise((res, rej) => { sock.onopen = res; sock.onerror = () => rej(new Error('websocket failed')); });
  let seq = 0;
  const waiting = new Map();
  sock.onmessage = (ev) => {
    const m = JSON.parse(String(ev.data));
    const w = waiting.get(m.id);
    if (!w) return;
    waiting.delete(m.id);
    if (m.error) w.reject(new Error(m.error.message)); else w.resolve(m.result);
  };
  const send = (method, params, sessionId) => new Promise((resolve, reject) => {
    const id = ++seq;
    waiting.set(id, { resolve, reject });
    sock.send(JSON.stringify(sessionId ? { id, method, params: params || {}, sessionId } : { id, method, params: params || {} }));
  });
  const { targetInfos } = await send('Target.getTargets');
  for (const t of targetInfos) {
    if (t.type === 'browser') continue;
    const { sessionId } = await send('Target.attachToTarget', { targetId: t.targetId, flatten: true });
    const heap = await send('Runtime.getHeapUsage', {}, sessionId);
    out.perTargetHeap.push({ targetId: t.targetId, type: t.type, url: t.url, usedSize: heap.usedSize, totalSize: heap.totalSize });
    if (t.type === 'worker' || t.type === 'shared_worker' || t.type === 'service_worker') out.workers.push({ targetId: t.targetId, type: t.type, url: t.url });
    if (t.type === 'page') walk((await send('Page.getFrameTree', {}, sessionId)).frameTree);
  }
  sock.close();
};
run().then(() => { clearTimeout(guard); finish(); }, (e) => { clearTimeout(guard); out.error = String(e.message).slice(0, 200); finish(); });
