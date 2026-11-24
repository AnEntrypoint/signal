#!/usr/bin/env node
import { createHash } from 'node:crypto';
import http from 'node:http';
import { createReadStream, existsSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { FRAME_GATE_CHUNK, frameGateHookBody } from './frame-gate-hook.mjs';
import { extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { answerLocalGrant, isLoopbackRequest } from './replacements/grant-local.mjs';

const ROOT = resolve(process.env.SNAPSHOT_ROOT || fileURLToPath(new URL('./snapshot', import.meta.url)));
const ASSETS = join(ROOT, 'assets');
const PORT = Number(process.env.PORT || 4173);
const HOST = process.env.HOST || '127.0.0.1';
const BASE = `http://${HOST}:${PORT}`;
const POOL_BASE = 'https://play.spawn.co/v4/client/pool/';

const types = {
  '.html': 'text/html; charset=utf-8', '.htm': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.wasm': 'application/wasm', '.webp': 'image/webp', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.ico': 'image/x-icon',
  '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.ktx2': 'image/ktx2',
  '.glb': 'model/gltf-binary', '.mp3': 'audio/mpeg', '.mp4': 'video/mp4',
  '.dict': 'application/octet-stream', '.bin': 'application/octet-stream',
};

const fetchLog = new Map();
const postReplays = new Map();
const loaded = [];
for (const name of ['state/fetch-log.jsonl', 'state/local-engine-fetch.jsonl', 'state/local-engine-runtime.jsonl']) {
  const p = join(ROOT, name);
  if (!existsSync(p)) {
    loaded.push({ file: name, present: false });
    continue;
  }
  const text = readFileSync(p, 'utf8');
  let lines = 0;
  let mapped = 0;
  for (const line of text.split('\n')) {
    if (!line.trim()) continue;
    lines += 1;
    try {
      const r = JSON.parse(line);
      if (r.file) {
        fetchLog.set(r.url, r.file);
        mapped += 1;
      }
      if (r.file && r.request_sha256 && r.served !== false) postReplays.set(`${r.url}|${r.request_sha256}`, r);
    } catch {}
  }
  loaded.push({ file: name, present: true, lines, mapped, sha256: createHash('sha256').update(text).digest('hex') });
}
const replacementMapPath = fileURLToPath(new URL('./replacements/map.json', import.meta.url));
if (existsSync(replacementMapPath)) {
  const replacementText = readFileSync(replacementMapPath, 'utf8');
  const replacements = JSON.parse(replacementText);
  for (const entry of replacements) fetchLog.set(entry.url, entry.file);
  loaded.push({ file: 'replacements/map.json', present: true, lines: replacements.length, mapped: replacements.length, sha256: createHash('sha256').update(replacementText).digest('hex') });
}
const PINNED_MAPPINGS = fetchLog.size;
const expectMappings = process.env.EXPECT_MAPPINGS;
if (expectMappings !== undefined && Number(expectMappings) !== PINNED_MAPPINGS) {
  console.error(`EXPECT_MAPPINGS=${expectMappings}, but ${PINNED_MAPPINGS} mappings were loaded from ${loaded.map((f) => f.file + (f.present ? ` (${f.lines} lines)` : ' (absent)')).join(', ')}`);
  process.exit(1);
}

function flatten(originalUrl) {
  const u = new URL(originalUrl);
  let path = u.pathname || '/';
  if (path.endsWith('/')) path += 'index';
  if (!extname(path)) path += '.bin';
  let safe = path.replace(/[^A-Za-z0-9._-]/g, '_');
  if (u.search) safe += '__' + u.search.slice(1).replace(/[^A-Za-z0-9._-]/g, '_').slice(0, 100);
  return join(ASSETS, u.hostname.replace(/:/g, '_'), safe);
}

const missing = new Map();
function localPathFor(urlText) {
  const exact = fetchLog.get(urlText);
  if (exact) {
    const p = join(ROOT, exact);
    if (existsSync(p)) return p;
  }
  try {
    const p = flatten(urlText);
    if (existsSync(p)) return p;
  } catch {}
  try {
    const u = new URL(urlText);
    const withoutQuery = u.origin + u.pathname;
    const exactNoQuery = fetchLog.get(withoutQuery);
    if (exactNoQuery) {
      const p = join(ROOT, exactNoQuery);
      if (existsSync(p)) return p;
    }
  } catch {}
  return null;
}

const origins = [
  'https://r7ixd6719-playco.spawnfile.io',
  'https://r2v523fxv-playco.spawnfile.io',
  'https://rsimrealm-playco.spawnfile.io',
  'https://play.bigspawn.net',
  'https://www.spawn.co',
  'https://play.spawn.co',
  'https://spawnfile.io',
  'https://kiln.spawn.co',
  'https://maps.spawnfile.io',
];
function gatedChunk(file) {
  if (!process.env.PROBE_FRAME_GATE || !file.endsWith('/' + FRAME_GATE_CHUNK)) return null;
  return readFileSync(file, 'utf8') + frameGateHookBody();
}
function rewrite(text) {
  let out = text.replace(/<base\s+href=["'][^"']*["']\s*\/?>/gi, '');
  const originAlternation = origins.map((o) => o.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') + '|https://[a-z0-9-]+\\.spawnfile\\.io';
  const externalUrl = new RegExp('(?<=["\'`=(\\s])(' + originAlternation + ')(/[^\\\\"\'<>\\s\\)`{}$]*)?', 'g');
  const quotedOrigin = new RegExp('(["\'`])(' + originAlternation + ')\\1(?!:)', 'g');
  out = out.replace(quotedOrigin, (match, quote) => `${quote}${BASE}${quote}`);
  out = out.replace(externalUrl, (match, origin, path = '') => {
    const absolute = origin + path;
    const sessionWorld = absolute.match(/^https:\/\/play\.spawn\.co\/(session\/world%3A.*)$/);
    if (sessionWorld) return `${BASE}/${sessionWorld[1]}`;
    return `${BASE}/__local/${encodeURIComponent(absolute)}`;
  });
  return out.replace(/only-if-cached/g, 'default');
}

function outerStatic(html) {
  return html
    .replace(/<link rel="preload" as="script"[^>]*>/g, '')
    .replace(/<script\b[^>]*\bsrc="[^"]*\/_next\/[^"]*"[^>]*><\/script>/g, '')
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, (m) => (m.includes('self.__next_f.push') ? '' : m));
}

const IMMUTABLE_CACHE = 'public, max-age=31536000, immutable';
const LOCALIZER = `<script>(function(){var hosted=['https://play.spawn.co','https://www.spawn.co','https://kiln.spawn.co'];function localize(value){var text=String(value);if(text.indexOf('https://play.spawn.co/session/world%3A')===0)return location.origin+'/session/'+text.slice('https://play.spawn.co/session/'.length);if(/^https:\\/\\/[a-z0-9-]+\\.spawnfile\\.io\\//.test(text))return location.origin+'/__local/'+encodeURIComponent(text);for(var i=0;i<hosted.length;i++){if(text.indexOf(hosted[i])===0){return location.origin+'/__local/'+encodeURIComponent(text);}}return value;}var descriptor=Object.getOwnPropertyDescriptor(HTMLIFrameElement.prototype,'src');Object.defineProperty(HTMLIFrameElement.prototype,'src',{configurable:true,enumerable:descriptor.enumerable,get:descriptor.get,set:function(value){return descriptor.set.call(this,localize(value));}});var setAttribute=Element.prototype.setAttribute;Element.prototype.setAttribute=function(name,value){return setAttribute.call(this,name,name==='src'&&this instanceof HTMLIFrameElement?localize(value):value);};var nativeFetch=window.fetch;window.fetch=function(input,init){if(typeof input==='string'){input=localize(input);}return nativeFetch.call(this,input,init);};var railStyle=document.createElement('style');railStyle.textContent='[data-rail-group]{display:none!important}';document.documentElement.appendChild(railStyle);})();</script>`;
function withLocalizer(html) {
  return html.replace(/<head[^>]*>/, (tag) => tag + LOCALIZER);
}
const STATIC_ORIGIN_PREFIXES = ['/_next/', '/_ready/', '/ground/', '/fonts/', '/datadog/'];

function send(res, status, body, contentType = 'text/plain; charset=utf-8', cacheControl = 'no-store') {
  res.writeHead(status, {
    'Content-Type': contentType,
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': cacheControl,
  });
  res.end(body);
}

function spawnfilePoolAlias(urlText) {
  try {
    const u = new URL(urlText);
    if (/\.spawnfile\.io$/.test(u.hostname) && u.pathname.startsWith('/v4/client/pool/')) return 'https://play.spawn.co' + u.pathname;
  } catch {}
  return null;
}

const GRANT_BODY_LIMIT = 4096;
const STUB_BODY = JSON.stringify({ error: 'local snapshot: no session grant or sdk call is answered offline' });

function grantRoute(req, res) {
  const chunks = [];
  let size = 0;
  req.on('data', (chunk) => {
    size += chunk.length;
    if (size <= GRANT_BODY_LIMIT) chunks.push(chunk);
  });
  req.on('end', () => {
    const answer = size <= GRANT_BODY_LIMIT && isLoopbackRequest(req, PORT) ? answerLocalGrant(Buffer.concat(chunks).toString('utf8'), Date.now()) : null;
    if (answer) {
      const headers = { 'Content-Type': types['.json'], 'Cache-Control': 'no-store' };
      if (answer.admitted === undefined) headers['x-spawn-edge-guest'] = 'served';
      res.writeHead(200, headers);
      res.end(JSON.stringify(answer));
      return;
    }
    send(res, 503, STUB_BODY, types['.json']);
  });
}

const POST_BODY_LIMIT = 4 * 1024 * 1024;

function postReplayRoute(req, res, external) {
  const chunks = [];
  let size = 0;
  req.on('data', (chunk) => {
    size += chunk.length;
    if (size <= POST_BODY_LIMIT) chunks.push(chunk);
  });
  req.on('end', () => {
    const bodySha = size <= POST_BODY_LIMIT ? createHash('sha256').update(Buffer.concat(chunks)).digest('hex') : null;
    const record = bodySha ? postReplays.get(`${external}|${bodySha}`) : undefined;
    if (!record && bodySha && new URL(external).pathname === '/world-store/values') {
      const hashes = [...Buffer.concat(chunks).toString('utf8').matchAll(/[0-9a-f]{64}/g)].map((m) => m[0]);
      const parts = [];
      let absent = 0;
      for (const hash of hashes) {
        const file = localPathFor(`https://play.spawn.co/world-store/values/${hash}`);
        if (!file) { absent += 1; continue; }
        const payload = readFileSync(file);
        const length = Buffer.alloc(4);
        length.writeUInt32BE(payload.length, 0);
        parts.push(length, payload);
      }
      res.writeHead(200, { 'Content-Type': 'application/octet-stream', 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'no-store', 'x-local-values-absent': String(absent) });
      res.end(Buffer.concat(parts));
      return;
    }
    if (!record) {
      const key = `POST ${external} body=${bodySha}`;
      missing.set(key, (missing.get(key) || 0) + 1);
      send(res, 404, `world-store POST has no captured reply for this body: ${external}`);
      return;
    }
    res.writeHead(200, { 'Content-Type': record.content_type || 'application/octet-stream', 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'no-store' });
    createReadStream(join(ROOT, record.file)).pipe(res);
  });
}

const server = http.createServer((req, res) => {
  if (process.env.LOCAL_ISOLATION !== 'off') {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  }
  const url = new URL(req.url, BASE);
  const pathname = decodeURIComponent(url.pathname);
  if (req.method === 'POST' && pathname === '/api/session/grant') {
    grantRoute(req, res);
    return;
  }
  if (req.method === 'POST' && pathname === '/session/attach/warm' && isLoopbackRequest(req, PORT)) {
    req.resume();
    res.writeHead(204, { 'Cache-Control': 'no-store' });
    res.end();
    return;
  }
  if (pathname === '/' || pathname === '/index.html' || pathname === '/outer') {
    send(res, 200, withLocalizer(rewrite(outerStatic(readFileSync(join(ROOT, 'raw/http/dev-page.body'), 'utf8')))), types['.html']);
    return;
  }
  if (pathname.startsWith('/api/session/grant') || pathname.startsWith('/api/sdk/')) {
    send(res, 503, JSON.stringify({ error: 'local snapshot: no session grant or sdk call is answered offline' }), types['.json']);
    return;
  }
  if (STATIC_ORIGIN_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    const chunk = localPathFor('https://www.spawn.co' + pathname + url.search);
    if (!chunk) {
      send(res, 404, 'outer chunk miss: ' + pathname);
      return;
    }
    const chunkExt = extname(chunk).toLowerCase();
    if (['.js', '.mjs', '.css'].includes(chunkExt)) {
      send(res, 200, rewrite(gatedChunk(chunk) ?? readFileSync(chunk, 'utf8')), types[chunkExt], IMMUTABLE_CACHE);
      return;
    }
    res.writeHead(200, { 'Content-Type': types[extname(chunk).toLowerCase()] || 'application/octet-stream', 'Access-Control-Allow-Origin': '*', 'Cache-Control': IMMUTABLE_CACHE });
    createReadStream(chunk).pipe(res);
    return;
  }
  if (req.method === 'GET' && /^\/session\/.+\.(mjs|json|html)$/.test(url.pathname)) {
    const module = localPathFor('https://play.spawn.co/v4/client/pool/' + url.pathname.slice('/session/'.length));
    if (module && extname(module).toLowerCase() === '.html') {
      send(res, 200, withLocalizer(rewrite(readFileSync(module, 'utf8'))), types['.html'], IMMUTABLE_CACHE);
      return;
    }
    if (module) {
      res.writeHead(200, { 'Content-Type': types[extname(module).toLowerCase()] || 'application/octet-stream', 'Access-Control-Allow-Origin': '*', 'Cache-Control': IMMUTABLE_CACHE });
      const gated = gatedChunk(module);
      if (gated !== null) res.end(gated);
      else createReadStream(module).pipe(res);
      return;
    }
  }
  if (pathname === '/session' || pathname.startsWith('/session/')) {
    send(res, 200, withLocalizer(rewrite(readFileSync(join(ROOT, 'raw/http/session-dev.body'), 'utf8'))), types['.html'], IMMUTABLE_CACHE);
    return;
  }
  if (pathname === '/favicon.ico') {
    send(res, 204, '');
    return;
  }
  if (pathname === '/ready-plate') {
    send(res, 200, '', types['.html']);
    return;
  }
  if (pathname === '/kernel-witness') {
    send(res, 200, '{}', types['.json']);
    return;
  }
  if (pathname.startsWith('/world-store/') && req.method === 'OPTIONS') {
    res.writeHead(204, { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS', 'Access-Control-Allow-Headers': 'authorization, content-type' });
    res.end();
    return;
  }
  if (pathname.startsWith('/world-store/') && req.method === 'POST') {
    postReplayRoute(req, res, `https://play.spawn.co${pathname}${url.search}`);
    return;
  }
  const manifestBody = /^\/world-store\/manifests\/([0-9a-f]{64})$/.exec(pathname);
  if (manifestBody && req.method === 'GET') {
    const file = join(ASSETS, 'play.spawn.co', 'cache', manifestBody[1] + '.bin');
    if (existsSync(file) && createHash('sha256').update(readFileSync(file)).digest('hex') === manifestBody[1]) {
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'no-store' });
      createReadStream(file).pipe(res);
      return;
    }
  }
  const cut = /^\/world-store\/cuts\/[0-9a-f]{64}\/([0-9a-f]{64})$/.exec(pathname);
  if (cut && req.method === 'GET') {
    const value = localPathFor(`https://play.spawn.co/world-store/values/${cut[1]}`);
    if (value) {
      res.writeHead(200, { 'Content-Type': 'application/octet-stream', 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'no-store' });
      createReadStream(value).pipe(res);
      return;
    }
  }
  if (pathname.startsWith('/world-store/')) {
    const external = `https://play.spawn.co${pathname}${url.search}`;
    const found = localPathFor(external) || localPathFor(`https://play.spawn.co${pathname}`);
    if (found) {
      const ext2 = extname(found).toLowerCase();
      if (['.html', '.htm', '.js', '.mjs', '.css', '.json'].includes(ext2)) {
        send(res, 200, rewrite(readFileSync(found, 'utf8')), types[ext2], IMMUTABLE_CACHE);
      } else {
        res.writeHead(200, { 'Content-Type': types[ext2] || 'application/octet-stream', 'Access-Control-Allow-Origin': '*', 'Cache-Control': IMMUTABLE_CACHE });
        createReadStream(found).pipe(res);
      }
    } else if (pathname.includes('/arrival-census/')) {
      send(res, 200, '{}', types['.json']);
    } else {
      send(res, 404, `world-store snapshot miss: ${external}`);
    }
    return;
  }
  if (pathname === '/api/version') {
    send(res, 200, JSON.stringify({ version: 711, build: '8569438a50cfc93c29a1a45e88acd3d1' }), types['.json']);
    return;
  }
  if (pathname === '/__health') {
    send(res, 200, JSON.stringify({ ok: true, mappings: PINNED_MAPPINGS, loaded, misses: missing.size }), types['.json']);
    return;
  }
  if (pathname === '/__misses') {
    send(res, 200, [...missing.entries()].map(([u, n]) => `${n}\t${u}`).join('\n'), 'text/plain; charset=utf-8');
    return;
  }

  let target = null;
  if (pathname.startsWith('/__local/')) {
    let external = decodeURIComponent(pathname.slice('/__local/'.length));
    if (/^https:\/\/play\.spawn\.co\/session(?:\/|\?|$)/.test(external)) {
      send(res, 200, withLocalizer(rewrite(readFileSync(join(ROOT, 'raw/http/session-dev.body'), 'utf8'))), types['.html'], IMMUTABLE_CACHE);
      return;
    }
    if (!/^https?:\/\//.test(external)) {
      external = `${POOL_BASE}${external.replace(/^\/+/, '')}`;
    }
    target = localPathFor(external);
    if (!target) {
      try {
        const u = new URL(external);
        target = localPathFor(u.origin + u.pathname);
      } catch {}
    }
    if (!target) target = localPathFor(spawnfilePoolAlias(external));
    if (!target) missing.set(external, (missing.get(external) || 0) + 1);
  } else if (pathname.startsWith('/world/')) {
    const local = join(ROOT, pathname);
    if (existsSync(local) && statSync(local).isFile()) target = local;
  } else {
    const local = join(ROOT, pathname);
    if (existsSync(local) && statSync(local).isFile()) target = local;
    if (!target) target = localPathFor('https://www.spawn.co' + pathname + url.search);
    if (!target) {
      const base = pathname.split('/').filter(Boolean).pop() || '';
      const candidates = [...new Set(fetchLog.values())]
        .map((f) => join(ROOT, f))
        .filter((f) => f.endsWith('_' + base) || f.endsWith('/' + base));
      if (candidates.length === 1) target = candidates[0];
    }
  }

  if (!target) {
    send(res, 404, `local snapshot miss: ${pathname}${url.search}`);
    return;
  }
  const ext = extname(target).toLowerCase();
  const contentType = types[ext] || 'application/octet-stream';
  if (['.html', '.htm', '.js', '.mjs', '.css', '.json'].includes(ext)) {
    res.writeHead(200, { 'Content-Type': contentType, 'Access-Control-Allow-Origin': '*', 'Cache-Control': IMMUTABLE_CACHE });
    res.end(rewrite(gatedChunk(target) ?? readFileSync(target, 'utf8')));
    return;
  }
  res.writeHead(200, {
    'Content-Type': contentType,
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': IMMUTABLE_CACHE,
  });
  createReadStream(target).pipe(res);
});

server.listen(PORT, HOST, () => {
  console.log(`local Spawn snapshot: ${BASE}/`);
  console.log(`captured URL mappings: ${fetchLog.size}`);
});
process.on('SIGINT', () => {
  const lines = [...missing.entries()].map(([u, n]) => `${n}\t${u}`);
  writeFileSync(join(ROOT, 'state/local-server-misses.tsv'), lines.join('\n') + (lines.length ? '\n' : ''));
  console.log(`wrote ${lines.length} missing URLs to state/local-server-misses.tsv`);
  server.close(() => process.exit(0));
});
