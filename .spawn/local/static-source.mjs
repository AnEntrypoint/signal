import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = fileURLToPath(new URL('.', import.meta.url));
const BASE = '';
const SNAPSHOT_LOGS = ['state/fetch-log.jsonl', 'state/local-engine-fetch.jsonl', 'state/local-engine-runtime.jsonl'];
const POOL_BASE = 'https://play.spawn.co/v4/client/pool/';
const TEXT_EXTENSIONS = ['.html', '.htm', '.js', '.mjs', '.css', '.json'];
const SCRIPT_EXTENSIONS = ['.js', '.mjs', '.css'];
const STATIC_ORIGIN_PREFIXES = ['/_next/', '/_ready/', '/ground/', '/fonts/', '/datadog/'];
const API_VERSION = { version: 711, build: '8569438a50cfc93c29a1a45e88acd3d1' };
const OUTER_BODY = 'raw/http/dev-page.body';
const SESSION_BODY = 'raw/http/session-dev.body';

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

const LOCALIZER = String.raw`<script>(function(){
var hosted=['https://play.spawn.co','https://www.spawn.co','https://kiln.spawn.co'];
function localize(value){
var base=location.pathname.replace(/\/session\/.*$/,'').replace(/\/$/,'');
var text=String(value);
if(text.indexOf(location.origin+'/')===0&&text.indexOf(location.origin+base+'/')!==0)text=text.slice(location.origin.length);
if(text.charAt(0)==='/'&&text.charAt(1)!=='/'&&/^\/(?:world-store\/|kernel-witness|_next\/|savi\/|mark\/|ground\/|fonts\/|datadog\/|_ready\/)/.test(text))return location.origin+base+text;
if(text.indexOf('https://play.spawn.co/session/world%3A')===0)return location.origin+base+'/session/'+text.slice('https://play.spawn.co/session/'.length);
if(/^https:\/\/[a-z0-9-]+\.spawnfile\.io\//.test(text))return location.origin+base+'/__local/'+encodeURIComponent(text);
for(var i=0;i<hosted.length;i++){if(text.indexOf(hosted[i])===0)return location.origin+base+'/__local/'+encodeURIComponent(text);}
return value;
}
var descriptor=Object.getOwnPropertyDescriptor(HTMLIFrameElement.prototype,'src');
Object.defineProperty(HTMLIFrameElement.prototype,'src',{configurable:true,enumerable:descriptor.enumerable,get:descriptor.get,set:function(value){return descriptor.set.call(this,localize(value));}});
var setAttribute=Element.prototype.setAttribute;
Element.prototype.setAttribute=function(name,value){return setAttribute.call(this,name,name==='src'&&this instanceof HTMLIFrameElement?localize(value):value);};
var nativeFetch=window.fetch;
window.fetch=function(input,init){if(typeof input==='string'){input=localize(input);}else if(input instanceof URL){input=localize(String(input));}else if(input instanceof Request){var moved=localize(input.url);if(moved!==input.url)input=new Request(moved,input);}return nativeFetch.call(this,input,init);};
var railStyle=document.createElement('style');railStyle.textContent='[data-rail-group]{display:none!important}';document.documentElement.appendChild(railStyle);
})();</script>`;
const API_GUARD = '<script>(function(){var api=/^(?:https?:\\/\\/[^/]+)?\\/api\\//;var f=window.fetch;window.fetch=function(input,init){var u=typeof input==="string"?input:input&&input.url||"";if(api.test(u))return Promise.reject(new TypeError("static build"));return f.call(this,input,init)};if(navigator.sendBeacon){var b=navigator.sendBeacon.bind(navigator);navigator.sendBeacon=function(u){return api.test(String(u))?false:b.apply(null,arguments)}}})();</script>';

function withLocalizer(html) {
  return html.replace(/<head[^>]*>/, (tag) => tag + API_GUARD + LOCALIZER);
}

function spawnfilePoolAlias(urlText) {
  try {
    const u = new URL(urlText);
    if (/\.spawnfile\.io$/.test(u.hostname) && u.pathname.startsWith('/v4/client/pool/')) return 'https://play.spawn.co' + u.pathname;
  } catch {}
  return null;
}


const UNAVAILABLE = 'Promise.resolve(new Response(\'{"error":"static build"}\',{status:503,headers:{"content-type":"application/json"}}))';
const API_CALL = /(?:fetch|sendBeacon)\(\s*["']\/api\//g;
const CALLER_PATCHES = [
  ['navigator.sendBeacon(i,r)', 'r'],
];

function callEnd(text, open) {
  let depth = 0;
  let quote = null;
  for (let i = open; i < text.length; i++) {
    const c = text[i];
    if (quote) {
      if (c === '\\') i++;
      else if (c === quote) quote = null;
    } else if (c === '"' || c === "'") quote = c;
    else if (c === '(') depth++;
    else if (c === ')' && --depth === 0) return i + 1;
  }
  throw new Error('unbalanced api call at ' + open);
}

function callStart(text, index) {
  let i = index;
  while (i > 0 && /[\w$.]/.test(text[i - 1])) i--;
  return i;
}

function removeApiCalls(html) {
  let out = '';
  let cursor = 0;
  for (const match of html.matchAll(API_CALL)) {
    if (match.index < cursor) continue;
    const open = html.indexOf('(', match.index);
    const end = callEnd(html, open);
    const replacement = match[0].startsWith('sendBeacon') || match[0].includes('sendBeacon') ? 'false' : UNAVAILABLE;
    const from = callStart(html, match.index);
    out += html.slice(cursor, from) + replacement;
    cursor = end;
  }
  return out + html.slice(cursor);
}

function patchCallers(html) {
  let out = html;
  for (const [from, to] of CALLER_PATCHES) {
    const count = out.split(from).length - 1;
    if (count !== 1) throw new Error('caller patch needle matched ' + count + ' times: ' + from.slice(0, 60));
    out = out.replace(from, () => to);
  }
  const removed = removeApiCalls(out);
  if (/(?:fetch|sendBeacon)\(\s*["']\/api\//.test(removed)) throw new Error('api call left after removal');
  return removed;
}

let moduleAliases = null;

function loadModuleAliases(assets) {
  const dir = join(assets, 'play.spawn.co');
  const map = new Map();
  for (const file of readdirSync(dir)) {
    if (!file.startsWith('_v4_client_pool_') || !file.endsWith('.mjs')) continue;
    const text = readFileSync(join(dir, file), 'utf8');
    if (!text.includes('.mjs":"')) continue;
    for (const match of text.matchAll(/"([a-z][a-z-]*\.mjs)":"([0-9a-f-]+\.mjs)"/g)) if (!map.has(match[1])) map.set(match[1], match[2]);
  }
  return map;
}

export function openSource(root) {
  const assets = join(root, 'assets');
  const fetchLog = new Map();
  const seedUrls = [];
  for (const name of SNAPSHOT_LOGS) {
    const file = join(root, name);
    if (!existsSync(file)) continue;
    for (const line of readFileSync(file, 'utf8').split('\n')) {
      if (!line.trim()) continue;
      let record;
      try {
        record = JSON.parse(line);
      } catch {
        continue;
      }
      if (!record.file) continue;
      fetchLog.set(record.url, record.file);
      if (record.status === undefined || record.status === 200) seedUrls.push(record.url);
    }
  }
  const replacementMap = join(HERE, 'replacements', 'map.json');
  if (existsSync(replacementMap)) {
    for (const entry of JSON.parse(readFileSync(replacementMap, 'utf8'))) {
      fetchLog.set(entry.url, entry.file);
      seedUrls.push(entry.url);
    }
  }
  const missing = new Map();

  function aliasedModule(name) {
    if (!name) return null;
    moduleAliases = moduleAliases || loadModuleAliases(assets);
    const target = moduleAliases.get(name);
    return target ? localPathFor(POOL_BASE + target) : null;
  }

  function flatten(originalUrl) {
    const u = new URL(originalUrl);
    let path = u.pathname || '/';
    if (path.endsWith('/')) path += 'index';
    if (!extname(path)) path += '.bin';
    let safe = path.replace(/[^A-Za-z0-9._-]/g, '_');
    if (u.search) safe += '__' + u.search.slice(1).replace(/[^A-Za-z0-9._-]/g, '_').slice(0, 100);
    return join(assets, u.hostname.replace(/:/g, '_'), safe);
  }

  function localPathFor(urlText) {
    if (!urlText) return null;
    const exact = fetchLog.get(urlText);
    if (exact) {
      const p = join(root, exact);
      if (existsSync(p)) return p;
    }
    try {
      const p = flatten(urlText);
      if (existsSync(p)) return p;
    } catch {}
    try {
      const u = new URL(urlText);
      const exactNoQuery = fetchLog.get(u.origin + u.pathname);
      if (exactNoQuery) {
        const p = join(root, exactNoQuery);
        if (existsSync(p)) return p;
      }
    } catch {}
    return null;
  }

  function ok(type, data) {
    return { status: 200, type, body: Buffer.isBuffer(data) ? data : Buffer.from(data, 'utf8') };
  }

  function miss(status, message) {
    return { status, type: 'text/plain; charset=utf-8', body: Buffer.from(message, 'utf8') };
  }

  function fromFile(file, rewriteExtensions) {
    const ext = extname(file).toLowerCase();
    const type = types[ext] || 'application/octet-stream';
    if (rewriteExtensions.includes(ext)) return ok(type, rewrite(removeApiCalls(readFileSync(file, 'utf8'))));
    return ok(type, readFileSync(file));
  }

  function worldStore(pathname, search) {
    const external = 'https://play.spawn.co' + pathname + search;
    const manifest = /^\/world-store\/manifests\/([0-9a-f]{64})$/.exec(pathname);
    if (manifest) {
      const file = join(assets, 'play.spawn.co', 'cache', manifest[1] + '.bin');
      if (existsSync(file) && createHash('sha256').update(readFileSync(file)).digest('hex') === manifest[1]) {
        return ok(types['.json'], readFileSync(file));
      }
    }
    const cut = /^\/world-store\/cuts\/[0-9a-f]{64}\/([0-9a-f]{64})$/.exec(pathname);
    if (cut) {
      const value = localPathFor('https://play.spawn.co/world-store/values/' + cut[1]);
      if (value) return ok('application/octet-stream', readFileSync(value));
    }
    const found = localPathFor(external) || localPathFor('https://play.spawn.co' + pathname);
    if (found) return fromFile(found, TEXT_EXTENSIONS);
    return miss(404, 'world-store snapshot miss: ' + external);
  }

  function localRoute(pathname) {
    let external = decodeURIComponent(pathname.slice('/__local/'.length));
    if (/^https:\/\/play\.spawn\.co\/session(?:\/|\?|$)/.test(external)) {
      return ok(types['.html'], withLocalizer(rewrite(readFileSync(join(root, SESSION_BODY), 'utf8'))));
    }
    if (!/^https?:\/\//.test(external)) external = POOL_BASE + external.replace(/^\/+/, '');
    let target = localPathFor(external);
    if (!target) {
      try {
        const u = new URL(external);
        target = localPathFor(u.origin + u.pathname);
      } catch {}
    }
    if (!target) target = localPathFor(spawnfilePoolAlias(external));
    if (!target) target = aliasedModule(external.split('/').pop());
    if (!target) {
      missing.set(external, (missing.get(external) || 0) + 1);
      return miss(404, 'local snapshot miss: ' + pathname);
    }
    return fromFile(target, TEXT_EXTENSIONS);
  }

  function serve(requestPath) {
    const url = new URL(requestPath, 'http://local.invalid');
    const pathname = decodeURIComponent(url.pathname);
    if (pathname === '/' || pathname === '/index.html' || pathname === '/outer') {
      return ok(types['.html'], withLocalizer(rewrite(patchCallers(outerStatic(readFileSync(join(root, OUTER_BODY), 'utf8'))))));
    }
    if (STATIC_ORIGIN_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
      const chunk = localPathFor('https://www.spawn.co' + pathname + url.search);
      if (!chunk) return miss(404, 'outer chunk miss: ' + pathname);
      return fromFile(chunk, SCRIPT_EXTENSIONS);
    }
    if (/^\/session\/.+\.(mjs|json|html|js|wasm)$/.test(url.pathname)) {
      const rest = pathname.slice('/session/'.length).replace(/^world:[^/]+\//, '');
      const module = localPathFor(POOL_BASE + rest) || aliasedModule(rest.split('/').pop());
      if (module && extname(module).toLowerCase() === '.html') return ok(types['.html'], withLocalizer(rewrite(readFileSync(module, 'utf8'))));
      if (module) return ok(types[extname(module).toLowerCase()] || 'application/octet-stream', rewrite(removeApiCalls(readFileSync(module, 'utf8'))));
    }
    if (/^\/session(?:\/world:[^/]+)?\/?$/.test(pathname)) return ok(types['.html'], withLocalizer(rewrite(readFileSync(join(root, SESSION_BODY), 'utf8'))));
    if (pathname.startsWith('/session/')) return miss(404, 'session path miss: ' + pathname);
    if (pathname === '/kernel-witness') return ok(types['.json'], '{}');
    if (pathname.startsWith('/world-store/')) return worldStore(pathname, url.search);
    if (pathname === '/api/version') return ok(types['.json'], JSON.stringify(API_VERSION));
    if (pathname.startsWith('/__local/')) return localRoute(pathname);
    const local = join(root, pathname);
    if (pathname.startsWith('/world/')) {
      if (existsSync(local) && statSync(local).isFile()) return fromFile(local, TEXT_EXTENSIONS);
      return miss(404, 'local snapshot miss: ' + pathname);
    }
    let target = existsSync(local) && statSync(local).isFile() ? local : null;
    if (!target) target = localPathFor('https://www.spawn.co' + pathname + url.search);
    if (!target) {
      const base = pathname.split('/').filter(Boolean).pop() || '';
      const candidates = [...new Set(fetchLog.values())]
        .map((f) => join(root, f))
        .filter((f) => f.endsWith('_' + base) || f.endsWith('/' + base));
      if (candidates.length === 1) target = candidates[0];
    }
    if (!target) return miss(404, 'local snapshot miss: ' + pathname + url.search);
    return fromFile(target, TEXT_EXTENSIONS);
  }

  return { serve, urls: () => Array.from(new Set(seedUrls)), missing };
}
