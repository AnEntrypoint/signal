const POST_REPLIES = __POST_REPLIES__;
const HERE = new URL('./', import.meta.url);

function frames(payloads) {
  const parts = [];
  for (const payload of payloads) {
    if (payload === null) continue;
    const head = new Uint8Array(4);
    new DataView(head.buffer).setUint32(0, payload.byteLength);
    parts.push(head, new Uint8Array(payload));
  }
  const body = new Uint8Array(parts.reduce((sum, part) => sum + part.byteLength, 0));
  let offset = 0;
  for (const part of parts) {
    body.set(part, offset);
    offset += part.byteLength;
  }
  return new Response(body, { status: 200, headers: { 'content-type': 'application/octet-stream', 'cache-control': 'no-store' } });
}

function digest(text) {
  return crypto.subtle.digest('SHA-256', new TextEncoder().encode(text)).then((buffer) => [...new Uint8Array(buffer)].map((byte) => byte.toString(16).padStart(2, '0')).join(''));
}

function routeOf(url) {
  const target = new URL(url, HERE);
  const path = target.pathname.startsWith(HERE.pathname) ? '/' + target.pathname.slice(HERE.pathname.length) : target.pathname;
  return path + target.search;
}

function replyBytes(name, type) {
  return fetch(new URL('post-replies/' + name, HERE)).then((reply) => reply.arrayBuffer().then((bytes) => new Response(bytes, { status: 200, headers: { 'content-type': type, 'cache-control': 'no-store' } })));
}

function valueFrames(body) {
  const hashes = body.match(/[0-9a-f]{64}/g) ?? [];
  return Promise.all(hashes.map((hash) => fetch(new URL('world-store/values/' + hash, HERE)).then((reply) => (reply.ok ? reply.arrayBuffer() : null), () => null))).then(frames);
}

export function replayFetch(url, init, hook) {
  const next = hook ?? fetch;
  if (typeof url !== 'string') return next(url, init);
  if (!init || String(init.method).toUpperCase() !== 'POST') {
    if (new URL(url, HERE).search === '?absent') return Promise.resolve(new Response('', { status: 404 }));
    return next(url, init);
  }
  const route = routeOf(url);
  const body = String(init.body ?? '');
  return digest(body).then((key) => {
    const entry = (POST_REPLIES[key] ?? []).find((reply) => reply.route === route);
    if (entry !== undefined) return replyBytes(entry.name, entry.type);
    if (route.split('?')[0] === '/world-store/values') return valueFrames(body);
    return new Response('static build: no captured reply for this POST', { status: 404 });
  });
}
