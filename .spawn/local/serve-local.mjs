#!/usr/bin/env node
import http from 'node:http';
import { createReadStream, existsSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

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
for (const name of ['state/fetch-log.jsonl', 'state/local-engine-fetch.jsonl', 'state/local-engine-runtime.jsonl']) {
  const p = join(ROOT, name);
  if (!existsSync(p)) continue;
  for (const line of readFileSync(p, 'utf8').split('\n')) {
    if (!line.trim()) continue;
    try {
      const r = JSON.parse(line);
      if (r.file) fetchLog.set(r.url, r.file);
    } catch {}
  }
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
function rewrite(text) {
  let out = text.replace(/<base\s+href=["'][^"']*["']\s*\/?>/gi, '');
  const originAlternation = origins.map((o) => o.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  const externalUrl = new RegExp('(?<=["\'`=(\\s])(' + originAlternation + ')(/[^\\\\"\'<>\\s\\)`{}$]*)?', 'g');
  const quotedOrigin = new RegExp('(["\'`])(' + originAlternation + ')\\1(?!:)', 'g');
  out = out.replace(quotedOrigin, (match, quote) => `${quote}${BASE}${quote}`);
  out = out.replace(externalUrl, (match, origin, path = '') => {
    const absolute = origin + path;
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
const LOCALIZER = `<script>(function(){var hosted=['https://play.spawn.co','https://www.spawn.co','https://kiln.spawn.co'];function localize(value){var text=String(value);for(var i=0;i<hosted.length;i++){if(text.indexOf(hosted[i])===0){return location.origin+'/__local/'+encodeURIComponent(text);}}return value;}var descriptor=Object.getOwnPropertyDescriptor(HTMLIFrameElement.prototype,'src');Object.defineProperty(HTMLIFrameElement.prototype,'src',{configurable:true,enumerable:descriptor.enumerable,get:descriptor.get,set:function(value){return descriptor.set.call(this,localize(value));}});var setAttribute=Element.prototype.setAttribute;Element.prototype.setAttribute=function(name,value){return setAttribute.call(this,name,name==='src'&&this instanceof HTMLIFrameElement?localize(value):value);};var nativeFetch=window.fetch;window.fetch=function(input,init){if(typeof input==='string'){input=localize(input);}return nativeFetch.call(this,input,init);};var railStyle=document.createElement('style');railStyle.textContent='[data-rail-group]{display:none!important}';document.documentElement.appendChild(railStyle);})();</script>`;
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

const server = http.createServer((req, res) => {
  const url = new URL(req.url, BASE);
  const pathname = decodeURIComponent(url.pathname);
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
      send(res, 200, rewrite(readFileSync(chunk, 'utf8')), types[chunkExt], IMMUTABLE_CACHE);
      return;
    }
    res.writeHead(200, { 'Content-Type': types[extname(chunk).toLowerCase()] || 'application/octet-stream', 'Access-Control-Allow-Origin': '*', 'Cache-Control': IMMUTABLE_CACHE });
    createReadStream(chunk).pipe(res);
    return;
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
  if (pathname.startsWith('/world-store/')) {
    const external = `https://play.spawn.co${pathname}${url.search}`;
    const found = localPathFor(external);
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
    send(res, 200, JSON.stringify({ ok: true, mappings: fetchLog.size, misses: missing.size }), types['.json']);
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
    res.end(rewrite(readFileSync(target, 'utf8')));
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
