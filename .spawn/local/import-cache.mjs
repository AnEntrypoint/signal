#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync, appendFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const ROOT = resolve(process.env.SNAPSHOT_ROOT || '/workspace/signal');
const MANIFEST = process.env.WORLD_MANIFEST || '19c1489dab3e655521417de663b683930e2cc29a10f23d859a384885d25cc8b7';
const ORIGIN = 'https://play.spawn.co/world-store/';
const EOF_MAGIC = Buffer.from([0xd8, 0x41, 0x0d, 0x97, 0x45, 0x6f, 0xfa, 0xf4]);
const SIMPLE_MAGIC = Buffer.from([0x30, 0x5c, 0x72, 0xa7, 0x1b, 0x6d, 0xfb, 0xfc]);
const roots = process.argv.slice(2).map((dir) => resolve(dir));
if (roots.length === 0) {
  console.error('usage: import-cache.mjs <CacheStorage dir>... (oldest first; a later root wins for the same URL)');
  process.exit(2);
}

function entries(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) entries(path, out);
    else if (/_0$/.test(name)) out.push(path);
  }
  return out;
}

function readEntry(path) {
  const buf = readFileSync(path);
  if (!buf.subarray(0, 8).equals(SIMPLE_MAGIC)) return null;
  const keyLength = buf.readUInt32LE(12);
  const keyStart = buf.indexOf('https://', 20);
  if (keyStart < 0 || keyStart > 24) return null;
  const url = buf.subarray(keyStart, keyStart + keyLength).toString('utf8');
  const bodyStart = keyStart + keyLength;
  const eof = buf.indexOf(EOF_MAGIC, bodyStart);
  if (eof <= bodyStart) return null;
  return { url, body: buf.subarray(bodyStart, eof) };
}

const picked = new Map();
for (const root of roots) {
  const cache = join(root, 'profile/Default/Service Worker/CacheStorage');
  if (!existsSync(cache)) continue;
  for (const path of entries(cache)) {
    const entry = readEntry(path);
    if (!entry || !entry.url.startsWith(ORIGIN)) continue;
    const kind = entry.url.slice(ORIGIN.length).split('/')[0];
    if (kind === 'heads') {
      let manifest = null;
      try { manifest = JSON.parse(entry.body.toString('utf8')).manifest; } catch {}
      if (manifest !== MANIFEST) continue;
    }
    picked.set(entry.url, { body: entry.body, root, kind });
  }
}

const assetDir = join(ROOT, 'assets/play.spawn.co/cache');
mkdirSync(assetDir, { recursive: true });
const logPath = join(ROOT, 'state/fetch-log.jsonl');
const existing = new Set(existsSync(logPath) ? readFileSync(logPath, 'utf8').split('\n').filter(Boolean).map((l) => { const r = JSON.parse(l); return r.url + ' ' + r.sha256; }) : []);
let written = 0;
let skipped = 0;
for (const [url, { body, root, kind }] of [...picked.entries()].sort()) {
  const sha256 = createHash('sha256').update(body).digest('hex');
  const file = `assets/play.spawn.co/cache/${sha256}.bin`;
  writeFileSync(join(ROOT, file), body);
  const name = url.slice(ORIGIN.length).split('/').pop();
  const record = {
    url,
    file,
    status: 200,
    content_type: kind === 'packs' ? 'application/octet-stream' : 'application/json',
    size: body.length,
    sha256,
    raw_body: null,
    headers_file: null,
    verified_against_name: kind === 'values' ? sha256 === name : false,
    served: true,
    reason: `captured Cache Storage entry from ${root.split('/').slice(-3)[0]}; the world manifest ${MANIFEST.slice(0, 8)} is the one the refreshed session names`,
  };
  if (existing.has(url + ' ' + sha256)) { skipped += 1; continue; }
  appendFileSync(logPath, JSON.stringify(record) + '\n');
  existing.add(url + ' ' + sha256);
  written += 1;
}
console.log(`cache import: urls=${picked.size} written=${written} already=${skipped} manifest=${MANIFEST.slice(0, 8)}`);
