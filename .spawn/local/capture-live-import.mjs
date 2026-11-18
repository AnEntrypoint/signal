#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const ROOT = resolve(process.env.SNAPSHOT_ROOT || '/workspace/signal');
const CAPTURE = resolve(process.argv[2] || '/tmp/verify/live-capture');
const LOG = join(ROOT, 'state/fetch-log.jsonl');
const sha256 = (buf) => createHash('sha256').update(buf).digest('hex');
const index = JSON.parse(readFileSync(join(CAPTURE, 'index.json'), 'utf8'));
const logged = new Set(readFileSync(LOG, 'utf8').split('\n').filter(Boolean).map((line) => { const r = JSON.parse(line); return r.url + ' ' + r.sha256; }));
mkdirSync(join(ROOT, 'assets/play.spawn.co/cache'), { recursive: true });
mkdirSync(join(ROOT, 'assets/play.spawn.co/values'), { recursive: true });

const out = { imported: [], same: [], differs: [], unverified: [], logged: 0, skipped: 0 };
for (const rec of index.records) {
  if (rec.status !== 200 || !rec.file) continue;
  const body = readFileSync(rec.file);
  if (sha256(body) !== rec.sha256) { out.unverified.push(rec.url); continue; }
  const path = new URL(rec.url).pathname;
  const pool = path.match(/^\/v4\/client\/pool\/([^/]+)$/);
  const value = path.match(/^\/world-store\/values\/([0-9a-f]{64})$/);
  let rel;
  if (pool) rel = 'assets/play.spawn.co/_v4_client_pool_' + pool[1];
  else if (value) {
    if (value[1] !== rec.sha256) { out.unverified.push(rec.url); continue; }
    rel = 'assets/play.spawn.co/values/' + rec.sha256 + '.bin';
  } else rel = 'assets/play.spawn.co/cache/' + rec.sha256 + '.bin';
  const dest = join(ROOT, rel);
  if (existsSync(dest)) {
    const local = sha256(readFileSync(dest));
    if (local !== rec.sha256) { out.differs.push({ url: rec.url, local, live: rec.sha256 }); continue; }
    out.same.push(rec.url);
  } else {
    writeFileSync(dest, body);
    out.imported.push({ url: rec.url, file: rel, size: body.length, sha256: rec.sha256 });
  }
  const key = rec.url + ' ' + rec.sha256;
  if (logged.has(key)) { out.skipped += 1; continue; }
  const entry = {
    url: rec.url,
    file: rel,
    status: 200,
    content_type: rec.content_type,
    size: body.length,
    sha256: rec.sha256,
    raw_body: null,
    headers_file: null,
    served: true,
    purpose: 'live-capture-playwriter: the page\'s own request, captured through the playwriter session',
    captured_from: rec.page,
  };
  if (rec.request_sha256) entry.request_sha256 = rec.request_sha256;
  if (rec.method) entry.method = rec.method;
  appendFileSync(LOG, JSON.stringify(entry) + '\n');
  logged.add(key);
  out.logged += 1;
}
console.log(JSON.stringify({ imported: out.imported.length, same: out.same.length, differs: out.differs.length, unverified: out.unverified.length, logged: out.logged, skipped: out.skipped }));
writeFileSync(join(CAPTURE, 'import.json'), JSON.stringify(out, null, 1));
