import { createHash } from 'node:crypto';
import { appendFileSync, existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, extname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(process.env.SNAPSHOT_ROOT || fileURLToPath(new URL('./snapshot', import.meta.url)));
const ASSETS_DIR = join(ROOT, 'assets');
const STATE_DIR = join(ROOT, 'state');
const FETCH_LOG_PATH = join(STATE_DIR, 'fetch-log.jsonl');
const SUMMARY_PATH = join(STATE_DIR, 'capture-summary.json');
const MISS_TSV_PATH = join(STATE_DIR, 'local-server-misses.tsv');
const MAPPING_LOG_NAMES = ['state/fetch-log.jsonl', 'state/local-engine-fetch.jsonl', 'state/local-engine-runtime.jsonl'];
const LIVE_MISS_ENDPOINT = 'http://127.0.0.1:4173/__misses';
const ALLOWED_HOSTS = new Set(['play.spawn.co', 'r7ixd6719-playco.spawnfile.io', 'r2v523fxv-playco.spawnfile.io', 'rsimrealm-playco.spawnfile.io']);
const FETCH_TIMEOUT_MS = 60_000;
const MISS_ENDPOINT_TIMEOUT_MS = 10_000;
const MAX_ATTEMPTS = 3;
const MAX_NETWORK_FETCHES = 2000;
const WAVE_SIZE = 8;
const PURPOSE_MISS = 'miss';
const PURPOSE_CLOSURE = 'module-closure';

const JS_PATHNAME = /\.m?js$/i;
const STATIC_SPECIFIER = /\b(?:import|export)\b[^'"`;]*?\bfrom\s*["']([^"'\n]+)["']/g;
const SIDE_EFFECT_IMPORT = /\bimport\s*["']([^"'\n]+)["']/g;
const DYNAMIC_IMPORT = /\bimport\s*\(\s*["']([^"'\n]+)["']\s*\)/g;
const JS_STRING_LITERAL = /["'`]((?:https:\/\/[^"'`\s]+|\.{1,2}\/[^"'`\s]+|\/[^"'`\s]+|[A-Za-z0-9._~-]+)\.m?js(?:\?[^"'`\s]*)?)["'`]/g;

function isHttpUrl(text) {
  try {
    const { protocol } = new URL(text);
    return protocol === 'https:' || protocol === 'http:';
  } catch {
    return false;
  }
}

function parseMissLines(text) {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.split('\t').pop().trim())
    .filter(isHttpUrl);
}

async function readLiveMissUrls() {
  try {
    const response = await fetch(LIVE_MISS_ENDPOINT, { signal: AbortSignal.timeout(MISS_ENDPOINT_TIMEOUT_MS) });
    return parseMissLines(await response.text());
  } catch (failure) {
    console.log(`live miss list unavailable: ${failure.message}`);
    return [];
  }
}

function readTsvMissUrls() {
  if (!existsSync(MISS_TSV_PATH)) return [];
  return parseMissLines(readFileSync(MISS_TSV_PATH, 'utf8'));
}

function loadMappingLog() {
  const mapping = new Map();
  for (const name of MAPPING_LOG_NAMES) {
    const path = join(ROOT, name);
    if (!existsSync(path)) continue;
    for (const line of readFileSync(path, 'utf8').split('\n')) {
      if (!line.trim()) continue;
      let record;
      try {
        record = JSON.parse(line);
      } catch {
        continue;
      }
      if (record.url && record.file) mapping.set(record.url, record.file);
    }
  }
  return mapping;
}

function flattenTarget(urlText) {
  const parsed = new URL(urlText);
  let path = parsed.pathname || '/';
  if (path.endsWith('/')) path += 'index';
  if (!extname(path)) path += '.bin';
  let safeName = path.replace(/[^A-Za-z0-9._-]/g, '_');
  if (parsed.search) safeName += '__' + parsed.search.slice(1).replace(/[^A-Za-z0-9._-]/g, '_').slice(0, 100);
  return join(ASSETS_DIR, parsed.hostname.replace(/:/g, '_'), safeName);
}

function isNonEmptyFile(path) {
  return existsSync(path) && statSync(path).isFile() && statSync(path).size > 0;
}

function locateExistingCopy(urlText, mappingLog) {
  const candidates = [];
  const mapped = mappingLog.get(urlText);
  if (mapped) candidates.push(join(ROOT, mapped));
  candidates.push(flattenTarget(urlText));
  const parsed = new URL(urlText);
  const mappedWithoutQuery = mappingLog.get(parsed.origin + parsed.pathname);
  if (mappedWithoutQuery) candidates.push(join(ROOT, mappedWithoutQuery));
  return candidates.find(isNonEmptyFile) || null;
}

function toProjectPath(absolutePath) {
  return relative(ROOT, absolutePath).split(sep).join('/');
}

function sha256Hex(buffer) {
  return createHash('sha256').update(buffer).digest('hex');
}

function ensureFetchLogEndsWithNewline() {
  if (!existsSync(FETCH_LOG_PATH)) return;
  const text = readFileSync(FETCH_LOG_PATH, 'utf8');
  if (text.length && !text.endsWith('\n')) appendFileSync(FETCH_LOG_PATH, '\n');
}

function appendFetchRecord(record) {
  appendFileSync(FETCH_LOG_PATH, JSON.stringify(record) + '\n');
}

async function fetchWithRetries(urlText) {
  let outcome = { status: 0, contentType: '', effectiveUrl: urlText, body: Buffer.alloc(0), error: 'not attempted' };
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    try {
      const response = await fetch(urlText, { redirect: 'follow', signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
      const body = Buffer.from(await response.arrayBuffer());
      outcome = {
        status: response.status,
        contentType: response.headers.get('content-type') || '',
        effectiveUrl: response.url || urlText,
        body,
        error: response.ok ? '' : `HTTP ${response.status}`,
      };
    } catch (failure) {
      outcome = { status: 0, contentType: '', effectiveUrl: urlText, body: Buffer.alloc(0), error: failure.message || String(failure) };
    }
    if (outcome.status >= 200 && outcome.status < 300) return outcome;
  }
  return outcome;
}

function resolveFollowableUrl(specifier, moduleUrl) {
  const trimmed = specifier.trim();
  const followable = /^https:\/\//.test(trimmed)
    || /^\.{1,2}\//.test(trimmed)
    || trimmed.startsWith('/')
    || /\.m?js(?:[?#]|$)/.test(trimmed);
  if (!followable) return null;
  let target;
  try {
    target = new URL(trimmed, moduleUrl);
  } catch {
    return null;
  }
  if (target.protocol !== 'https:' || !ALLOWED_HOSTS.has(target.hostname)) return null;
  target.hash = '';
  return target.href;
}

function discoverDependencies(source, moduleUrl) {
  const specifiers = [];
  for (const pattern of [STATIC_SPECIFIER, SIDE_EFFECT_IMPORT, DYNAMIC_IMPORT, JS_STRING_LITERAL]) {
    for (const match of source.matchAll(pattern)) specifiers.push(match[1]);
  }
  const dependencies = new Set();
  for (const specifier of specifiers) {
    const dependency = resolveFollowableUrl(specifier, moduleUrl);
    if (dependency) dependencies.add(dependency);
  }
  return [...dependencies];
}

async function captureOne({ url, purpose }, mappingLog, ledger) {
  const isModule = JS_PATHNAME.test(new URL(url).pathname);
  const existingCopy = locateExistingCopy(url, mappingLog);
  if (existingCopy) {
    ledger.alreadyPresent.push(url);
    return { url, body: isModule ? readFileSync(existingCopy) : null };
  }
  if (ledger.networkFetches >= MAX_NETWORK_FETCHES) {
    ledger.skippedByCap.push(url);
    return { url, body: null };
  }
  ledger.networkFetches += 1;
  const attempt = await fetchWithRetries(url);
  const succeeded = attempt.status >= 200 && attempt.status < 300;
  const target = flattenTarget(url);
  if (succeeded) {
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, attempt.body);
    ledger.filesWritten += 1;
    ledger.fetchedOk.push(url);
  } else {
    ledger.failed.push({ url, status: attempt.status, error: attempt.error });
  }
  appendFetchRecord({
    url,
    file: toProjectPath(target),
    status: attempt.status,
    content_type: attempt.contentType,
    size: attempt.body.length,
    sha256: sha256Hex(attempt.body),
    effective_url: attempt.effectiveUrl,
    error: succeeded ? '' : attempt.error,
    purpose,
  });
  return { url, body: succeeded && isModule ? attempt.body : null };
}

function writeSummary(ledger) {
  const capReached = ledger.networkFetches >= MAX_NETWORK_FETCHES;
  const summary = {
    generatedAt: new Date().toISOString(),
    fetchedOk: ledger.fetchedOk.length,
    alreadyPresent: ledger.alreadyPresent.length,
    closureDiscovered: ledger.closureDiscovered,
    networkFetches: ledger.networkFetches,
    networkFetchCap: MAX_NETWORK_FETCHES,
    capReached,
    skippedByCap: ledger.skippedByCap.length,
    filesWritten: ledger.filesWritten,
    failed: ledger.failed,
    fetchedUrls: ledger.fetchedOk,
  };
  writeFileSync(SUMMARY_PATH, JSON.stringify(summary, null, 2) + '\n');
  console.log(`fetched OK: ${summary.fetchedOk}`);
  console.log(`already present: ${summary.alreadyPresent}`);
  console.log(`closure dependencies discovered: ${summary.closureDiscovered}`);
  console.log(`network fetches: ${summary.networkFetches} of ${MAX_NETWORK_FETCHES} (cap reached: ${capReached ? 'yes' : 'no'})`);
  console.log(`skipped by cap: ${summary.skippedByCap}`);
  console.log(`files written under assets: ${summary.filesWritten}`);
  console.log(`failed: ${ledger.failed.length}`);
  for (const failure of ledger.failed) console.log(`  status ${failure.status} ${failure.url} ${failure.error}`);
}

async function main() {
  ensureFetchLogEndsWithNewline();
  const mappingLog = loadMappingLog();
  const missUrls = [...new Set([...(await readLiveMissUrls()), ...readTsvMissUrls()])];
  const ledger = {
    networkFetches: 0,
    fetchedOk: [],
    alreadyPresent: [],
    failed: [],
    skippedByCap: [],
    closureDiscovered: 0,
    filesWritten: 0,
  };
  const seen = new Set();
  const queue = [];
  const enqueue = (url, purpose) => {
    if (seen.has(url)) return false;
    seen.add(url);
    queue.push({ url, purpose });
    return true;
  };
  for (const url of missUrls) enqueue(url, PURPOSE_MISS);
  console.log(`miss URLs to resolve: ${missUrls.length}`);

  while (queue.length) {
    const wave = queue.splice(0, WAVE_SIZE);
    const outcomes = await Promise.all(wave.map((item) => captureOne(item, mappingLog, ledger)));
    for (const { url, body } of outcomes) {
      if (!body) continue;
      for (const dependency of discoverDependencies(body.toString('utf8'), url)) {
        if (enqueue(dependency, PURPOSE_CLOSURE)) ledger.closureDiscovered += 1;
      }
    }
  }

  writeSummary(ledger);
}

main().catch((failure) => {
  console.error(`capture aborted: ${failure.message}`);
  process.exitCode = 1;
});
