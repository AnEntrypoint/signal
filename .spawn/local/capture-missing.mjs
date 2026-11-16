#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { appendFileSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.env.SNAPSHOT_ROOT || '/workspace/signal';
const ASSETS = join(ROOT, 'assets', 'play.spawn.co');
const POOL = 'https://play.spawn.co/v4/client/pool/';
const LOG = join(ROOT, 'state/fetch-log.jsonl');
const POOL_NAME = /\b([0-9a-f]{8}-[0-9a-f]{16}|[0-9a-f]{16})\.mjs\b/g;

const seeds = readFileSync(process.argv[2], 'utf8').split('\n').map((s) => s.trim()).filter(Boolean);
const queue = [...new Set(seeds)];
const seen = new Set(queue);
const report = { fetched: [], present: [], failed: [] };

while (queue.length) {
  const name = queue.shift();
  const file = join(ASSETS, '_v4_client_pool_' + name);
  const rel = 'assets/play.spawn.co/_v4_client_pool_' + name;
  let body;
  if (existsSync(file)) {
    body = readFileSync(file);
    report.present.push(name);
  } else {
    const url = POOL + name;
    const res = await fetch(url, { method: 'GET' });
    if (res.status !== 200) {
      report.failed.push(`${res.status} ${name}`);
      continue;
    }
    body = Buffer.from(await res.arrayBuffer());
    writeFileSync(file, body);
    const sha256 = createHash('sha256').update(body).digest('hex');
    appendFileSync(LOG, JSON.stringify({
      url,
      file: rel,
      status: res.status,
      content_type: res.headers.get('content-type') || '',
      size: body.length,
      sha256,
      effective_url: res.url,
      purpose: 'closure-capture',
    }) + '\n');
    report.fetched.push(name);
  }
  for (const m of body.toString('utf8').matchAll(POOL_NAME)) {
    const dep = m[1] + '.mjs';
    if (!seen.has(dep)) {
      seen.add(dep);
      queue.push(dep);
    }
  }
}

console.log(JSON.stringify({ fetched: report.fetched.length, present: report.present.length, failed: report.failed }));
