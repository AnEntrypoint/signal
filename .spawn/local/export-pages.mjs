#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, extname, join, relative, resolve } from 'node:path';
import { openSource } from './static-source.mjs';
import { createPatcher, staticPatches } from './static-patches.mjs';

const SNAPSHOT_ROOT = resolve(process.env.SNAPSHOT_ROOT || '/workspace/signal');
const OUT = resolve(process.env.PAGES_OUT || join(SNAPSHOT_ROOT, 'pages-export'));
const BASE_PATH = process.env.PAGES_BASE || '/signal/';
const FILE_LIMIT = 100 * 1024 * 1024;
const CONCURRENCY = 16;
const VALUE_HELPER = 'world-store-values.mjs';
const STATIC_PREFIXES = ['/_next/', '/_ready/', '/ground/', '/fonts/', '/datadog/'];
const SESSION_MODULE_EXTENSIONS = ['.mjs', '.json', '.html'];
const TEXT_TYPES = ['text/html', 'text/javascript', 'text/css', 'application/json'];
const REF = /\/(?:__local|_next|_ready|ground|fonts|datadog|session|world-store)\/[^\s"'<>(){}\\,;]*/g;
const MODULE_NAME = /\b((?:[a-z][a-z-]*-)?[0-9a-f]{16}|[0-9a-f]{8}-[0-9a-f]{16}|[a-z][a-z-]*)\.(?:mjs|json)\b/g;
const OUTER_ASSET = /\/(?:savi|mark)\/[^\s"'<>()\\]+|\/(?:favicon\.ico|icon\.png|apple-icon\.png)\?[^\s"'<>()\\]*/g;
const POOL = '/v4/client/pool/';

const sha256 = (buffer) => createHash('sha256').update(buffer).digest('hex');

const ROOT_REF = /(?<=["'\x60(=\s+,}])\/(?=(?:(?:__local|_next|_ready|ground|fonts|datadog|session|world-store|site-tree|savi|mark)\/|favicon\.ico|icon\.png|apple-icon\.png|kernel-witness|manifest\.webmanifest))/g;

function rebase(text) {
  return BASE_PATH === '/' ? text : text.replace(ROOT_REF, () => BASE_PATH);
}


function seedsFor(url) {
  if (!url) return [];
  let target;
  try {
    target = new URL(url);
  } catch {
    return [];
  }
  const seeds = ['/__local/' + encodeURIComponent(url)];
  if (target.search) return seeds;
  const path = target.pathname;
  if (target.origin === 'https://www.spawn.co' && STATIC_PREFIXES.some((prefix) => path.startsWith(prefix))) seeds.push(path);
  if (target.origin === 'https://play.spawn.co') {
    if (path.startsWith(POOL) && SESSION_MODULE_EXTENSIONS.includes(extname(path).toLowerCase())) seeds.push('/session/' + path.slice(POOL.length));
    if (path === '/session' || path.startsWith('/session/') || path.startsWith('/world-store/')) seeds.push(path);
  }
  return seeds;
}

async function mapLimit(items, worker) {
  let next = 0;
  const lanes = Array.from({ length: Math.min(CONCURRENCY, items.length) }, async () => {
    while (next < items.length) {
      const item = items[next];
      next += 1;
      await worker(item);
    }
  });
  await Promise.all(lanes);
}

function isText(type, body) {
  if (TEXT_TYPES.includes(type)) return true;
  if (body.subarray(0, 8192).includes(0)) return false;
  return isUtf8(body);
}

function isUtf8(body) {
  try {
    new TextDecoder('utf-8', { fatal: true }).decode(body);
    return true;
  } catch {
    return false;
  }
}

function moduleRefs(path, text) {
  const bare = path.split('?')[0];
  let base = null;
  if (/\.(?:mjs|json)$/.test(bare)) base = bare.slice(0, bare.lastIndexOf('/') + 1);
  else if (bare.startsWith('/session/')) base = bare.replace(/\/?$/, '/');
  if (base === null) return [];
  return [...new Set(Array.from(text.matchAll(MODULE_NAME), (m) => base + m[0]))];
}

const SEAM = /([\w$]+)=\(\$,Z\)=>([\w$]+)!==null\?\2\(\$,Z\):fetch\(\$,Z\)/g;
const POST_PLACEHOLDER = '__POST_REPLIES__';

const SUMMARY_CALLER = 'function Bk(e,t,r,i,n,l,s=0,o){let a=v7();if(a===null)return null;';
const SUMMARY_CALLER_UNPATCHED = 'let a=v7();if(a===null)return null;';
const PRELOAD_STALE = '<link rel="preload" as="fetch" crossorigin href="/signal/__local/https%3A%2F%2Fplay.spawn.co%2Fworld-store%2F';
const PRELOAD_STALE_RE = /(<link rel="preload" as="fetch" crossorigin href=")\/signal\/__local\/https%3A%2F%2Fplay\.spawn\.co%2Fworld-store%2F([^"]+)"/g;

function patchSummaryBase(text) {
  const count = text.split(SUMMARY_CALLER).length - 1;
  if (count === 0) return text;
  if (count > 1) throw new Error('summary base caller matched ' + count + ' times in one module');
  return text.replace(SUMMARY_CALLER, () => SUMMARY_CALLER.replace('let a=v7();', 'let a=null;'));
}

const REALM_HOST = 'let r=RiI(e)?.sharedHost??e;if(!TW2(r))return null;let i=tdy.get(r);if(i!==void 0)return\x60\x24{t}-\x24{i}.\x24{whv}\x60;return r.includes(".")?\x60\x24{t}-\x24{r}\x60:\x60\x24{t}.\x24{r}\x60});';
const REALM_HOST_PREFIX = 'let r=RiI(e)?.sharedHost??e;if(!TW2(r))return null;let i=tdy.get(r);';

function patchRealmHost(text) {
  const count = text.split(REALM_HOST).length - 1;
  if (count === 0) return text;
  if (count > 1) throw new Error('realm host builder matched ' + count + ' times in one module');
  return text.replace(REALM_HOST, () => 'return null});');
}

function patchPreloads(text) {
  return text.replace(PRELOAD_STALE_RE, (match, head, rest) => head + '/signal/world-store/' + rest.replace(/%2F/g, '/') + '"');
}

function rewriteSeams(text) {
  const matches = [...text.matchAll(SEAM)];
  if (matches.length === 0) return text;
  if (matches.length > 1) throw new Error('transport seam matched ' + matches.length + ' times in one module');
  const replaced = text.replace(SEAM, (match, name, hook) => name + '=($,Z)=>__replayFetch($,Z,' + hook + ')');
  return 'import { replayFetch as __replayFetch } from "' + BASE_PATH + VALUE_HELPER + '";\n' + replaced;
}

function snapshotPostReplies(root) {
  const replies = new Map();
  for (const line of readFileSync(join(root, 'state', 'fetch-log.jsonl'), 'utf8').split('\n')) {
    if (!line.trim()) continue;
    const record = JSON.parse(line);
    if (record.method !== 'POST' || record.served !== true || !record.file || !existsSync(join(root, record.file))) continue;
    const url = new URL(record.url);
    const route = url.pathname + url.search;
    const list = replies.get(record.request_sha256) ?? [];
    const seen = list.find((reply) => reply.route === route);
    if (seen !== undefined) {
      if (seen.file !== record.file) throw new Error('POST body ' + record.request_sha256 + ' has two replies for ' + route);
      continue;
    }
    list.push({ route, file: record.file, type: record.content_type, name: record.request_sha256 + '-' + list.length + '.bin' });
    replies.set(record.request_sha256, list);
  }
  return replies;
}

function snapshotValueHashes(root) {
  const hashes = new Set();
  for (const line of readFileSync(join(root, 'state', 'fetch-log.jsonl'), 'utf8').split('\n')) {
    if (!line.trim()) continue;
    const record = JSON.parse(line);
    const match = /world-store\/values\/([0-9a-f]{64})(?:\?|$)/.exec(record.url || '');
    if (match && record.file && record.served !== false && existsSync(join(root, record.file))) hashes.add(match[1]);
  }
  return [...hashes];
}

async function crawl(source, seeds) {
  const files = new Map();
  const misses = [];
  const seen = new Set();
  let frontier = Array.from(new Set(seeds));
  while (frontier.length > 0) {
    const batch = frontier.filter((path) => !seen.has(path));
    batch.forEach((path) => seen.add(path));
    frontier = [];
    await mapLimit(batch, async (path) => {
      const served = source.serve(path);
      if (served.status !== 200) {
        misses.push(served.status + ' ' + path);
        return;
      }
      const body = served.body;
      const type = served.type.split(';')[0].trim();
      const bare = path.split('?')[0];
      if (bare.startsWith('/world-store/values/')) {
        files.set(bare, { body, type });
        return;
      }
      if (!isText(type, body)) {
        files.set(path, { body, type });
        return;
      }
      const raw = body.toString('utf8');
      const text = rewriteImages(raw);
      for (const name of moduleRefs(path, raw)) frontier.push(name);
      for (const match of text.matchAll(REF)) frontier.push(match[0].split('?')[0]);
      files.set(path, { body: Buffer.from(rewriteSeams(staticPatcher.patch(patchPreloads(patchSummaryBase(patchRealmHost(rebase(text)))))), 'utf8'), type });
    });
  }
  return { files, misses };
}

function safeDecode(text) {
  try {
    return decodeURIComponent(text);
  } catch {
    return text;
  }
}

function rewriteImages(text) {
  return text
    .replace(/\/_next\/image\?url=\x24\{encodeURIComponent\((\w+)\)\}&/g, (match, name) => '/__local/\x24{encodeURIComponent(String(' + name + ').split("?")[0])}?')
    .replace(/\/_next\/image\?url=([^&"'\s<>\\\x60\x24{}()]+)(?:&[^"'\s<>\\\x60]*)?/g, (match, encoded) => '/__local/' + encodeURIComponent(safeDecode(encoded).split('?')[0]));
}

function relFor(path, type) {
  const decoded = safeDecode(path.split('?')[0]);
  const trimmed = decoded.replace(/^\/+/, '').replace(/\/+$/, '');
  if (trimmed.startsWith('world-store/values/')) return trimmed;
  if (trimmed === '' || decoded.endsWith('/')) return join(trimmed, 'index.html');
  const last = trimmed.slice(trimmed.lastIndexOf('/') + 1);
  if (/\.[A-Za-z0-9]{1,8}$/.test(last)) return trimmed;
  return TEXT_TYPES.includes(type) ? trimmed + '/index.html' : trimmed;
}

function finalRels(files) {
  const rels = new Map();
  for (const path of files.keys()) rels.set(path, relFor(path, files.get(path).type));
  const parents = new Set();
  for (const rel of rels.values()) {
    const parts = rel.split('/');
    for (let i = 1; i < parts.length; i += 1) parents.add(parts.slice(0, i).join('/'));
  }
  for (const [path, rel] of rels) if (parents.has(rel)) rels.set(path, rel + '/index.html');
  return rels;
}

function writeSite(files) {
  if (existsSync(join(OUT, '.nojekyll'))) rmSync(OUT, { recursive: true, force: true });
  else if (existsSync(OUT)) throw new Error(OUT + ' exists and is not a previous export; remove it by hand');
  mkdirSync(OUT, { recursive: true });
  writeFileSync(join(OUT, '.nojekyll'), '');
  const byRel = new Map();
  const rels = finalRels(files);
  for (const path of Array.from(files.keys()).sort()) {
    const { body, type } = files.get(path);
    if (body.length > FILE_LIMIT) throw new Error(path + ' is ' + body.length + ' bytes, over the ' + FILE_LIMIT + ' byte per-file limit');
    const abs = join(OUT, rels.get(path));
    const rel = relative(OUT, abs);
    if (existsSync(abs)) {
      if (!readFileSync(abs).equals(body)) throw new Error(path + ' collides with ' + rel + ' holding different bytes');
    } else {
      mkdirSync(dirname(abs), { recursive: true });
      writeFileSync(abs, body);
    }
    if (!byRel.has(rel)) byRel.set(rel, { path, rel, bytes: body.length, sha256: sha256(body) });
  }
  return Array.from(byRel.values()).sort((a, b) => (a.rel < b.rel ? -1 : 1));
}




function poolModuleNames(root) {
  const names = new Set();
  for (const file of readdirSync(join(root, 'assets', 'play.spawn.co'))) {
    const match = /^_v4_client_pool_(.+\.(?:mjs|json))$/.exec(file);
    if (match) names.add(match[1]);
  }
  return names;
}

const BOOT_TREE = { world: 'bc986e1b5a084b6aadf3ef93cd1597b4', ref: 'dev', manifest: '19c1489dab3e655521417de663b683930e2cc29a10f23d859a384885d25cc8b7' };
const EMPTY_SCANS = '{"v":1,"tag":"","hashes":[],"rows":[]}';
const staticPatcher = createPatcher(staticPatches(BASE_PATH, BOOT_TREE.manifest));

function addBootTree(files) {
  staticPatcher.verify(files);
  const manifest = files.get('/world-store/manifests/' + BOOT_TREE.manifest + '/with/ring-priced');
  if (!manifest) throw new Error('boot tree manifest is not in the export: ' + BOOT_TREE.manifest);
  files.set('/site-tree/boot/' + BOOT_TREE.world + '/' + BOOT_TREE.ref + '/with/ring-priced', { body: manifest.body, type: 'application/octet-stream' });
  files.set('/site-tree/scans/' + BOOT_TREE.manifest + '/ring-priced', { body: Buffer.from(EMPTY_SCANS, 'utf8'), type: 'application/octet-stream' });
}

async function exportSite() {
  const source = openSource(SNAPSHOT_ROOT);
  const seeds = ['/', '/kernel-witness'];
  seeds.push(...readFileSync(process.env.PAGES_SEEDS || new URL('./runtime-seeds.txt', import.meta.url), 'utf8').split('\n').filter(Boolean));
  for (const match of source.serve("/").body.toString("utf8").matchAll(OUTER_ASSET)) seeds.push(match[0]);
  const hashes = snapshotValueHashes(SNAPSHOT_ROOT);
  seeds.push(...hashes.map((hash) => '/world-store/values/' + hash));
  const crawled = await crawl(source, seeds);
  const poolNames = poolModuleNames(SNAPSHOT_ROOT);
  const named = new Set();
  for (const [path, file] of crawled.files) {
    if (!/javascript|html/.test(file.type || '')) continue;
    for (const match of file.body.toString('utf8').matchAll(MODULE_NAME)) if (poolNames.has(match[0])) named.add(match[0]);
  }
  const extra = [...named].map((name) => '/__local/' + name).filter((path) => !crawled.files.has(path));
  const extraCrawl = await crawl(source, extra);
  for (const [path, file] of extraCrawl.files) crawled.files.set(path, file);
  crawled.misses.push(...extraCrawl.misses);
  const postReplies = snapshotPostReplies(SNAPSHOT_ROOT);
  const postEntries = [...postReplies.values()].flat();
  for (const reply of postEntries) crawled.files.set('/post-replies/' + reply.name, { body: readFileSync(join(SNAPSHOT_ROOT, reply.file)), type: 'application/octet-stream' });
  const helperTemplate = readFileSync(new URL('./' + VALUE_HELPER, import.meta.url), 'utf8');
  if (helperTemplate.split(POST_PLACEHOLDER).length !== 2) throw new Error(POST_PLACEHOLDER + ' must appear exactly once in ' + VALUE_HELPER);
  const postTable = Object.fromEntries([...postReplies].map(([sha, list]) => [sha, list.map((reply) => ({ route: reply.route, name: reply.name, type: reply.type }))]));
  crawled.files.set('/' + VALUE_HELPER, { body: Buffer.from(helperTemplate.replace(POST_PLACEHOLDER, () => JSON.stringify(postTable)), 'utf8'), type: 'text/javascript' });
  addBootTree(crawled.files);
  for (const file of crawled.files.values()) {
    const text = file.body.toString('utf8');
    if (text.includes(REALM_HOST_PREFIX)) throw new Error('realm host builder still reads the page host');
    if (text.includes(SUMMARY_CALLER_UNPATCHED)) throw new Error('summary base is still wired to the snapshot origin in a module');
    if (text.includes(PRELOAD_STALE)) throw new Error('a preload points at a URL the page does not fetch');
  }
  const pages = writeSite(crawled.files);
  const bytes = pages.reduce((sum, page) => sum + page.bytes, 0);
  const largest = pages.reduce((best, page) => (page.bytes > best.bytes ? page : best), { rel: '', bytes: 0 });
  writeFileSync(join(dirname(OUT), 'pages-export.sha256'), pages.map((page) => page.sha256 + '  ' + page.rel).join('\n') + '\n');
  const exportedValues = pages.filter((page) => /^world-store\/values\/[0-9a-f]{64}$/.test(page.rel)).length;
  const seamFiles = [...crawled.files.values()].filter((file) => file.body.includes('__replayFetch(')).length;
  if (seamFiles === 0) throw new Error('no transport seam found in the export');
  const exportedPosts = pages.filter((page) => /^post-replies\/[0-9a-f]{64}-\d+\.bin$/.test(page.rel)).length;
  if (exportedPosts !== postEntries.length) throw new Error('exported ' + exportedPosts + ' of ' + postEntries.length + ' post replies');
  if (exportedValues !== hashes.length) throw new Error('exported ' + exportedValues + ' of ' + hashes.length + ' snapshot values');
  const summary = {
    out: OUT,
    files: pages.length + 1,
    bytes,
    largest: { rel: largest.rel, bytes: largest.bytes },
    base: BASE_PATH,
    misses: crawled.misses.length,
    missPaths: crawled.misses.map((miss) => miss.slice(miss.indexOf(' ') + 1)),
    missSample: crawled.misses.slice(0, 10),
    values: { snapshot: hashes.length, exported: exportedValues },
    posts: { snapshot: postEntries.length, exported: exportedPosts },
    seams: seamFiles,
    pages,
  };
  writeFileSync(join(dirname(OUT), 'pages-export.summary.json'), JSON.stringify(summary, null, 2) + '\n');
  return summary;
}

function git(repo, args, env) {
  return execFileSync('git', ['-C', repo].concat(args), { env, encoding: 'utf8', maxBuffer: 1 << 28 }).trim();
}

function revOrNull(repo, ref, env) {
  try {
    return git(repo, ['rev-parse', '--verify', '-q', ref], env);
  } catch {
    return null;
  }
}

function publishBranch(repo, out, branch) {
  const scratch = mkdtempSync(join(tmpdir(), 'pages-index-'));
  const env = Object.assign({}, process.env, { GIT_INDEX_FILE: join(scratch, 'index') });
  try {
    const gitDir = git(repo, ['rev-parse', '--absolute-git-dir'], env);
    execFileSync('git', ['--git-dir', gitDir, '--work-tree', out, 'add', '-A', '--', '.'], { env, cwd: out });
    const tree = git(repo, ['write-tree'], env);
    const parent = revOrNull(repo, 'refs/heads/' + branch, env);
    const commitArgs = ['commit-tree', tree, '-m', 'Publish static export of ' + out];
    if (parent) commitArgs.push('-p', parent);
    const commit = git(repo, commitArgs, env);
    git(repo, ['update-ref', 'refs/heads/' + branch, commit].concat(parent ? [parent] : []), env);
    return { branch, commit, tree, parent };
  } finally {
    rmSync(scratch, { recursive: true, force: true });
  }
}

async function main() {
  const flag = process.argv.indexOf('--publish');
  const summary = await exportSite();
  if (flag !== -1) {
    const repo = resolve(process.argv[flag + 1] || '.');
    summary.publish = publishBranch(repo, OUT, 'gh-pages');
  }
  const { pages, ...report } = summary;
  console.log(JSON.stringify(report, null, 2));
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
