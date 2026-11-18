#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync, appendFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const ROOT = resolve(process.env.SNAPSHOT_ROOT || '/workspace/signal');
const ORIGIN = 'https://play.spawn.co/world-store/values/';
const logPath = join(ROOT, 'state/fetch-log.jsonl');
const records = readFileSync(logPath, 'utf8').split('\n').filter(Boolean).map((line) => JSON.parse(line));
const packs = records.filter((r) => /\/world-store\/packs\//.test(r.url) && r.file && r.file.startsWith('assets/play.spawn.co/cache/'));

const payloads = new Map();
let bundles = 0;
let skipped = 0;
for (const pack of packs) {
  const body = readFileSync(join(ROOT, pack.file));
  if (body[0] === 0x5b || body[0] === 0x7b) { skipped += 1; continue; }
  let pos = 0;
  const found = [];
  while (pos + 4 <= body.length) {
    const length = body.readUInt32BE(pos);
    if (length === 0 || pos + 4 + length > body.length) break;
    found.push(body.subarray(pos + 4, pos + 4 + length));
    pos += 4 + length;
  }
  if (found.length === 0) { skipped += 1; continue; }
  bundles += 1;
  for (const payload of found) {
    const sha256 = createHash('sha256').update(payload).digest('hex');
    if (!payloads.has(sha256)) payloads.set(sha256, payload);
  }
}

const assetDir = join(ROOT, 'assets/play.spawn.co/values');
mkdirSync(assetDir, { recursive: true });
const servable = new Set(records.filter((r) => r.url && r.url.startsWith(ORIGIN) && r.status === 200 && r.served !== false && r.file && existsSync(join(ROOT, r.file))).map((r) => r.url + ' ' + r.sha256));
let written = 0;
let already = 0;
for (const [sha256, payload] of [...payloads.entries()].sort()) {
  const url = ORIGIN + sha256;
  const file = `assets/play.spawn.co/values/${sha256}.bin`;
  writeFileSync(join(ROOT, file), payload);
  if (servable.has(url + ' ' + sha256)) { already += 1; continue; }
  appendFileSync(logPath, JSON.stringify({
    url,
    file,
    status: 200,
    content_type: 'application/octet-stream',
    size: payload.length,
    sha256,
    raw_body: null,
    headers_file: null,
    verified_against_name: true,
    served: true,
    reason: 'length-prefixed payload of a captured world pack (Cache Storage, manifest 19c1489d); its sha256 equals the value name',
  }) + '\n');
  servable.add(url + ' ' + sha256);
  written += 1;
}
console.log(`value import: packs=${packs.length} bundles=${bundles} skipped=${skipped} payloads=${payloads.size} written=${written} already=${already}`);
