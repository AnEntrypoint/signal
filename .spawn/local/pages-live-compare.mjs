import { readFileSync } from 'node:fs';

export function pagesKey(requestPath) {
  const bare = requestPath.split('?')[0];
  let decoded;
  try {
    decoded = decodeURIComponent(bare);
  } catch {
    decoded = bare;
  }
  const collapsed = decoded.replace(/\/+/g, '/').replace(/^\//, '');
  return collapsed === '' || collapsed.endsWith('/') ? collapsed + 'index.html' : collapsed;
}

export function readManifest(text) {
  const sums = new Map();
  for (const line of text.trim().split('\n')) {
    const at = line.indexOf('  ');
    sums.set(line.slice(at + 2), line.slice(0, at));
  }
  return sums;
}

export function lookupLocal(sums, requestPath) {
  const key = pagesKey(requestPath);
  return sums.get(key) ?? sums.get(key + '/index.html') ?? null;
}

export function compareLive(manifestText, liveResult, base) {
  const sums = readManifest(manifestText);
  return liveResult.served.map((entry) => {
    const requestPath = entry.url.slice(base.length);
    const localSha = lookupLocal(sums, requestPath);
    return { path: requestPath, liveStatus: entry.status, liveSha: entry.sha256, localSha, match: localSha !== null && localSha === entry.sha256 && entry.status === 200 };
  });
}

function parseLiveResult(text) {
  return JSON.parse(text.slice(text.indexOf('{')));
}

const BASE = 'https://anentrypoint.github.io/signal/';

if (process.argv[1] && process.argv[1].endsWith('pages-live-compare.mjs')) {
  const [manifestPath, livePath] = process.argv.slice(2);
  const live = parseLiveResult(readFileSync(livePath, 'utf8'));
  const rows = compareLive(readFileSync(manifestPath, 'utf8'), live.result, BASE);
  for (const row of rows) console.log((row.match ? 'MATCH ' : 'DIFF  ') + row.liveStatus + ' ' + row.path + ' live=' + row.liveSha.slice(0, 16) + ' local=' + (row.localSha ? row.localSha.slice(0, 16) : 'none'));
  console.log('matches ' + rows.filter((row) => row.match).length + ' of ' + rows.length);
}
