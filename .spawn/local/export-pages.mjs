#!/usr/bin/env node
import { execFileSync, spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import net from 'node:net';
import { tmpdir } from 'node:os';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const SNAPSHOT_ROOT = resolve(process.env.SNAPSHOT_ROOT || '/workspace/signal');
const OUT = resolve(process.env.PAGES_OUT || join(SNAPSHOT_ROOT, 'pages-export'));
const BASE_PATH = process.env.PAGES_BASE || '/signal/';
const SERVER = resolve(process.env.EXPORT_SERVER || fileURLToPath(new URL('./serve-local.mjs', import.meta.url)));
const REPLACEMENTS = join(dirname(SERVER), 'replacements', 'map.json');
const FILE_LIMIT = 100 * 1024 * 1024;
const CONCURRENCY = 16;
const STATIC_PREFIXES = ['/_next/', '/_ready/', '/ground/', '/fonts/', '/datadog/'];
const SESSION_MODULE_EXTENSIONS = ['.mjs', '.json', '.html'];
const TEXT_TYPES = ['text/html', 'text/javascript', 'text/css', 'application/json'];
const REF = /\/(?:__local|_next|_ready|ground|fonts|datadog|session|world-store)\/[^\s"'<>(){}\\,;]*/g;
const POOL = '/v4/client/pool/';
const LOG_FILES = ['state/fetch-log.jsonl', 'state/local-engine-fetch.jsonl', 'state/local-engine-runtime.jsonl'];

const sleep = (ms) => new Promise((done) => setTimeout(done, ms));
const sha256 = (buffer) => createHash('sha256').update(buffer).digest('hex');

const ROOT_REF = /(?<=["'\x60(=\s+,])\/(?=(?:__local|_next|_ready|ground|fonts|datadog|session|world-store)\/)/g;

function rebase(text) {
  return BASE_PATH === '/' ? text : text.replace(ROOT_REF, () => BASE_PATH);
}

function mappingUrls() {
  const urls = [];
  for (const name of LOG_FILES) {
    const file = join(SNAPSHOT_ROOT, name);
    if (!existsSync(file)) continue;
    for (const line of readFileSync(file, 'utf8').split('\n')) {
      let record;
      try {
        record = JSON.parse(line);
      } catch {
        continue;
      }
      if (record.file && (record.status === undefined || record.status === 200)) urls.push(record.url);
    }
  }
  if (existsSync(REPLACEMENTS)) for (const entry of JSON.parse(readFileSync(REPLACEMENTS, 'utf8'))) urls.push(entry.url);
  return urls;
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

function isText(path, type, body) {
  if (TEXT_TYPES.includes(type)) return true;
  if (body.subarray(0, 8192).includes(0)) return false;
  return path.endsWith('/') || extname(path) === '' || /\.(html|htm|js|mjs|css|json)$/.test(path);
}

async function crawl(base, seeds) {
  const files = new Map();
  const misses = [];
  const seen = new Set();
  let frontier = Array.from(new Set(seeds));
  while (frontier.length > 0) {
    const batch = frontier.filter((path) => !seen.has(path));
    batch.forEach((path) => seen.add(path));
    frontier = [];
    await mapLimit(batch, async (path) => {
      const response = await fetch(base + path);
      const body = Buffer.from(await response.arrayBuffer());
      if (response.status !== 200) {
        misses.push(response.status + ' ' + path);
        return;
      }
      const type = (response.headers.get('content-type') || '').split(';')[0].trim();
      if (!isText(path, type, body)) {
        files.set(path, { body, type });
        return;
      }
      const text = body.toString('utf8').split(base).join('');
      for (const match of text.matchAll(REF)) frontier.push(match[0].split('?')[0]);
      files.set(path, { body: Buffer.from(rebase(text), 'utf8'), type });
    });
  }
  return { files, misses };
}

function relFor(path, type) {
  const trimmed = path.replace(/^\/+/, '').replace(/\/+$/, '');
  if (trimmed === '' || path.endsWith('/')) return join(trimmed, 'index.html');
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
    const rel = rels.get(path);
    const abs = join(OUT, rel);
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

async function freePort() {
  return new Promise((ok, fail) => {
    const probe = net.createServer();
    probe.once('error', fail);
    probe.listen(0, '127.0.0.1', () => {
      const port = probe.address().port;
      probe.close(() => ok(port));
    });
  });
}

async function startServer(port) {
  const child = spawn(process.execPath, [SERVER], {
    env: Object.assign({}, process.env, { SNAPSHOT_ROOT, PORT: String(port), HOST: '127.0.0.1' }),
    stdio: ['ignore', 'ignore', 'inherit'],
  });
  for (let attempt = 0; attempt < 300; attempt += 1) {
    if (child.exitCode !== null) throw new Error('serve-local exited with ' + child.exitCode);
    try {
      const health = await fetch('http://127.0.0.1:' + port + '/__health');
      if (health.ok) return child;
    } catch {
      await sleep(100);
      continue;
    }
    await sleep(100);
  }
  child.kill('SIGTERM');
  throw new Error('serve-local did not answer /__health');
}

async function stopServer(child) {
  if (child.exitCode !== null) return;
  const exited = new Promise((done) => child.once('exit', done));
  child.kill('SIGTERM');
  await exited;
}

async function exportSite() {
  const port = await freePort();
  const base = 'http://127.0.0.1:' + port;
  const child = await startServer(port);
  let crawled;
  try {
    const seeds = ['/'];
    for (const url of mappingUrls()) seeds.push(...seedsFor(url));
    crawled = await crawl(base, seeds);
  } finally {
    await stopServer(child);
  }
  const pages = writeSite(crawled.files);
  const bytes = pages.reduce((sum, page) => sum + page.bytes, 0);
  const largest = pages.reduce((best, page) => (page.bytes > best.bytes ? page : best), { rel: '', bytes: 0 });
  writeFileSync(join(SNAPSHOT_ROOT, 'pages-export.sha256'), pages.map((page) => page.sha256 + '  ' + page.rel).join('\n') + '\n');
  const summary = {
    out: OUT,
    files: pages.length + 1,
    bytes,
    largest: { rel: largest.rel, bytes: largest.bytes },
    base: BASE_PATH,
    misses: crawled.misses.length,
    missPaths: crawled.misses.map((miss) => miss.slice(miss.indexOf(' ') + 1)),
    missSample: crawled.misses.slice(0, 10),
    pages,
  };
  writeFileSync(join(SNAPSHOT_ROOT, 'pages-export.summary.json'), JSON.stringify(summary, null, 2) + '\n');
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
