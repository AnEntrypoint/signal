import fs from 'node:fs';
import path from 'node:path';

const root = process.env.SNAPSHOT_ROOT || '/workspace/signal';
const assets = path.join(root, 'assets/play.spawn.co');
const log = fs.readFileSync(path.join(root, 'state/fetch-log.jsonl'), 'utf8').trim().split('\n').map((line) => JSON.parse(line));
const failures = process.argv[2] ? JSON.parse(fs.readFileSync(process.argv[2], 'utf8')) : [];

const manifestFile = fs.readdirSync(assets).find((name) => name.startsWith('_world-store_manifests_') && name.endsWith('ring-priced.bin'));
const manifests = fs.readdirSync(assets).filter((name) => name.startsWith('_world-store_manifests_') && name.endsWith('ring-priced.bin'));

const blobsOf = (text) => {
  const out = [];
  let at = 0;
  while ((at = text.indexOf('{"', at)) !== -1) {
    let depth = 0, end = -1, inString = false, escaped = false;
    for (let i = at; i < text.length; i++) {
      const c = text[i];
      if (inString) { if (escaped) escaped = false; else if (c === '\\') escaped = true; else if (c === '"') inString = false; continue; }
      if (c === '"') inString = true;
      else if (c === '{') depth++;
      else if (c === '}') { depth--; if (depth === 0) { end = i; break; } }
    }
    if (end < 0) break;
    try { out.push(JSON.parse(text.slice(at, end + 1))); } catch {}
    at = end + 1;
  }
  return out;
};

const refs = new Map();
for (const name of manifests) {
  const blobs = blobsOf(fs.readFileSync(path.join(assets, name), 'utf8'));
  const walk = (node, at) => {
    if (typeof node === 'string') {
      if (/^[0-9a-f]{64}$/.test(node)) refs.set(node, [...(refs.get(node) || []), at]);
      return;
    }
    if (Array.isArray(node)) return node.forEach((item, i) => walk(item, at + '[' + i + ']'));
    if (node && typeof node === 'object') for (const [key, value] of Object.entries(node)) walk(value, at + '.' + key);
  };
  blobs.forEach((blob, i) => walk(blob, 'b' + i));
}

const hasRealBody = (hash) => log.some((e) => e.url === 'https://play.spawn.co/world-store/values/' + hash && e.status === 200 && e.saved_is_error_body !== true);
const summary = { manifests: manifests.length, distinctRefs: refs.size, withRealBody: 0, missing: 0 };
const missingByPath = {};
for (const [hash, at] of refs) {
  if (hasRealBody(hash)) { summary.withRealBody++; continue; }
  summary.missing++;
  for (const p of at) { const key = p.replace(/\[\d+\]/g, '[]').replace(/^b\d+\./, '').replace(/^[^.]*\/[^.]*\./, 'REGION.'); missingByPath[key] = (missingByPath[key] || 0) + 1; }
}
console.log('MANIFEST ' + JSON.stringify(summary));
console.log('MISSING_BY_PATH ' + JSON.stringify(missingByPath));

const failed = [...new Map(failures.map((f) => [f.url, f])).values()];
const classes = {};
for (const f of failed) {
  const url = new URL(f.url);
  const hash = (url.pathname.match(/[0-9a-f]{64}/) || [''])[0];
  const isValue = /^\/(world-store\/values\/|cdn\/value\.)/.test(url.pathname) && hash;
  const key = isValue ? 'https://play.spawn.co/world-store/values/' + hash : 'https://' + url.host + url.pathname.replace(/\/$/, '');
  const entries = log.filter((e) => e.url.split('?')[0] === key);
  const localBody = entries.some((e) => e.status === 200 && e.saved_is_error_body !== true);
  const cls = localBody ? 'local-body-present' : entries.length ? 'captured-as-' + [...new Set(entries.map((e) => e.status))].join('/') : 'not-captured';
  classes[cls] = (classes[cls] || 0) + 1;
}
if (failed.length) console.log('FAILED_URLS ' + JSON.stringify({ distinct: failed.length, classes }));
