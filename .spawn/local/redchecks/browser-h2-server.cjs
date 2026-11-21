'use strict';
const fs = require('fs');
const http2 = require('http2');
const path = require('path');
const SITE_HOST = 'anentrypoint.github.io';
const LATENCY = Number(process.env.WITNESS_LATENCY_MS || 0);
const TYPES = {
  html: 'text/html; charset=utf-8', htm: 'text/html; charset=utf-8', js: 'text/javascript', mjs: 'text/javascript', json: 'application/json', css: 'text/css',
  png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', gif: 'image/gif', webp: 'image/webp', svg: 'image/svg+xml', ico: 'image/x-icon',
  woff2: 'font/woff2', woff: 'font/woff', ttf: 'font/ttf', otf: 'font/otf', wasm: 'application/wasm', txt: 'text/plain; charset=utf-8',
  mp3: 'audio/mpeg', ogg: 'audio/ogg', wav: 'audio/wav', mp4: 'video/mp4', webm: 'video/webm', glb: 'model/gltf-binary', gltf: 'model/gltf+json', ktx2: 'image/ktx2',
};
const [port, root, cert, key] = process.argv.slice(2);
const rootReal = path.resolve(root);
const send = (res, status, headers, body) => {
  res.writeHead(status, Object.assign({ 'access-control-allow-origin': '*' }, headers));
  res.end(body);
};
const resolveFile = (urlPath) => {
  const file = path.resolve(rootReal, '.' + path.posix.normalize(urlPath));
  if (file !== rootReal && !file.startsWith(rootReal + path.sep)) return null;
  return file;
};
const handle = (req, res) => {
  const host = String(req.headers[':authority'] || req.headers.host || '').split(':')[0];
  const url = new URL(req.url, 'https://' + SITE_HOST);
  let urlPath;
  try { urlPath = decodeURIComponent(url.pathname); } catch (e) { return send(res, 400, {}, ''); }
  if (host !== SITE_HOST) return send(res, 404, { 'content-length': '0' }, '');
  const file = resolveFile(urlPath);
  if (!file) return send(res, 404, { 'content-length': '0' }, '');
  let st = null;
  try { st = fs.statSync(file); } catch (e) { st = null; }
  if (st && st.isDirectory() && !urlPath.endsWith('/')) {
    const location = urlPath + '/' + (url.search || '');
    return send(res, 301, { location, 'content-length': '0' }, '');
  }
  let target = file;
  if (st && st.isDirectory()) target = path.join(file, 'index.html');
  let data = null;
  try { data = fs.statSync(target).isFile() ? fs.readFileSync(target) : null; } catch (e) { data = null; }
  if (!data) return send(res, 404, { 'content-type': 'text/plain; charset=utf-8', 'content-length': '9' }, 'Not Found');
  const ext = path.extname(target).slice(1).toLowerCase();
  const type = TYPES[ext] || 'application/octet-stream';
  const headers = { 'content-type': type, 'content-length': String(data.length) };
  if (req.method === 'HEAD') return send(res, 200, headers, '');
  return send(res, 200, headers, data);
};
const server = http2.createSecureServer({ cert: fs.readFileSync(cert), key: fs.readFileSync(key), allowHTTP1: true });
server.on('request', (req, res) => {
  const run = () => { try { handle(req, res); } catch (e) { send(res, 500, {}, ''); } };
  if (LATENCY > 0) setTimeout(run, LATENCY); else run();
});
server.listen(Number(port), '127.0.0.1');
