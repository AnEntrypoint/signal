import { spawnSync } from 'node:child_process';
import { closeSync, existsSync, mkdirSync, openSync, readFileSync, rmSync, truncateSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const SCRIPT = resolve(process.env.EXPORT_SCRIPT || join(HERE, '..', 'export-pages.mjs'));
const WORK = '/tmp/verify/pages-witness';
const VALUE_HASH = 'ab'.repeat(32);
const POST_SHA = 'cd'.repeat(32);
const SEAM = 'const h=($,Z)=>n!==null?n($,Z):fetch($,Z);\nexport const k=1;\n';
let passed = 0;
const failed = [];

function check(name, ok) {
  if (ok) passed += 1;
  else failed.push(name);
  console.log((ok ? 'ok   ' : 'FAIL ') + name);
}

function makeFixture(root, options) {
  rmSync(root, { recursive: true, force: true });
  for (const dir of ['assets/fixture', 'assets/www.spawn.co', 'assets/play.spawn.co', 'raw/http', 'state']) mkdirSync(join(root, dir), { recursive: true });
  writeFileSync(join(root, 'raw/http/session-dev.body'), '<!DOCTYPE html><html><body>session</body></html>');
  writeFileSync(join(root, 'raw/http/dev-page.body'), '<!DOCTYPE html><html><head></head><body><img src="/fonts/f.woff2"><img src="/_next/image?url=https%3A%2F%2Fwww.spawn.co%2Ffonts%2Ff.woff2"><script>navigator.sendBeacon(i,r)</script></body></html>');
  let chunk = 'const more = "/_next/static/more.js";\nconst pool = "https://play.spawn.co/v4/client/pool/tome-ui/a.html";\nconst gone = "/fonts/absent.woff2";\n';
  chunk += 'const page = "/ground/";\n';
  chunk += 'const img = "/_next/image?url=\x24{encodeURIComponent(l)}&w=\x24{o}&q=\x24{a}";\n';
  chunk += 'const tool = "/fonts/tool.dmg";\n';
  writeFileSync(join(root, 'assets/fixture/chunk.js'), chunk);
  writeFileSync(join(root, 'assets/www.spawn.co/__next_static_more.js'), 'console.log("more");\n');
  writeFileSync(join(root, 'assets/fixture/a.html'), '<html><body>pool</body></html>\n');
  writeFileSync(join(root, 'assets/fixture/ok.txt'), 'ready\n');
  writeFileSync(join(root, 'assets/fixture/f.woff2'), Buffer.alloc(64, 7));
  writeFileSync(join(root, 'assets/fixture/tool.dmg'), Buffer.from([0, 1, 2, 255]));
  writeFileSync(join(root, 'assets/fixture/x.json'), '{"ok":true}\n');
  writeFileSync(join(root, 'assets/fixture/transport.mjs'), SEAM + (options.seams === 2 ? 'const g=($,Z)=>m!==null?m($,Z):fetch($,Z);\n' : ''));
  writeFileSync(join(root, 'assets/play.spawn.co/_world-store_values_' + VALUE_HASH + '.bin'), Buffer.from([1, 2, 3, 4]));
  writeFileSync(join(root, 'assets/fixture/reply.json'), '{"scan":1}\n');
  writeFileSync(join(root, 'assets/fixture/reply-alt.json'), '{"scan":2}\n');
  const log = [
    { url: 'https://www.spawn.co/_next/static/chunk.js', file: 'assets/fixture/chunk.js', status: 200 },
    { url: 'https://play.spawn.co/v4/client/pool/tome-ui/a.html', file: 'assets/fixture/a.html', status: 200 },
    { url: 'https://www.spawn.co/_ready/ok.txt', file: 'assets/fixture/ok.txt', status: 200 },
    { url: 'https://www.spawn.co/_ready/transport.mjs', file: 'assets/fixture/transport.mjs', status: 200 },
    { url: 'https://www.spawn.co/fonts/tool.dmg', file: 'assets/fixture/tool.dmg', status: 200 },
    { url: 'https://www.spawn.co/fonts/f.woff2', file: 'assets/fixture/f.woff2', status: 200 },
    { url: 'https://play.spawn.co/world-store/values/' + VALUE_HASH, file: 'assets/play.spawn.co/_world-store_values_' + VALUE_HASH + '.bin', status: 200, served: true },
    { url: 'https://play.spawn.co/world-store/scans', method: 'POST', request_sha256: POST_SHA, file: 'assets/fixture/reply.json', content_type: 'application/json', status: 200, served: true },
  ];
  if (options.conflict) log.push({ url: 'https://play.spawn.co/world-store/scans', method: 'POST', request_sha256: POST_SHA, file: 'assets/fixture/reply-alt.json', content_type: 'application/json', status: 200, served: true });
  writeFileSync(join(root, 'state/fetch-log.jsonl'), log.map((record) => JSON.stringify(record)).join('\n') + '\n');
}

function runExport(root) {
  return spawnSync(process.execPath, [SCRIPT], {
    encoding: 'utf8',
    maxBuffer: 1 << 28,
    env: Object.assign({}, process.env, { SNAPSHOT_ROOT: root, PAGES_OUT: join(root, 'pages-out') }),
  });
}

function bytes(path) {
  return existsSync(path) ? readFileSync(path) : null;
}

function main() {
  const root = join(WORK, 'fixture');
  makeFixture(root, { seams: 1 });
  const run = runExport(root);
  check('fixture export exits 0', run.status === 0);
  const out = join(root, 'pages-out');
  const summary = existsSync(join(root, 'pages-export.summary.json')) ? JSON.parse(readFileSync(join(root, 'pages-export.summary.json'), 'utf8')) : {};
  check('values exported equal to snapshot values', summary.values && summary.values.snapshot === 1 && summary.values.exported === 1);
  check('post replies exported equal to snapshot replies', summary.posts && summary.posts.snapshot === 1 && summary.posts.exported === 1);
  check('transport seam rewritten in exported modules', summary.seams >= 1);
  const module = readFileSync(join(out, '_ready/transport.mjs'), 'utf8');
  check('seam rewritten to replayFetch with the hook', module.includes('h=($,Z)=>__replayFetch($,Z,n)') && !module.includes('fetch($,Z)'));
  check('seam module imports the helper', module.includes('import { replayFetch as __replayFetch } from "/signal/world-store-values.mjs";'));
  const helper = readFileSync(join(out, 'world-store-values.mjs'), 'utf8');
  check('helper table holds the value-free POST route and body hash', helper.includes(POST_SHA) && helper.includes('/world-store/scans') && !helper.includes('__POST_REPLIES__'));
  check('value bytes match the snapshot file', Buffer.compare(bytes(join(out, 'world-store/values/' + VALUE_HASH)) || Buffer.alloc(0), Buffer.from([1, 2, 3, 4])) === 0);
  check('post reply bytes match the snapshot file', Buffer.compare(bytes(join(out, 'post-replies/' + POST_SHA + '-0.bin')) || Buffer.alloc(0), Buffer.from('{"scan":1}\n')) === 0);

  const red = makeFixture(join(WORK, 'red-seams'), { seams: 2 });
  const redSeams = runExport(join(WORK, 'red-seams'));
  check('red: a module with two transport seams fails the export', redSeams.status !== 0 && redSeams.stderr.includes('matched 2 times'));
  makeFixture(join(WORK, 'red-conflict'), { seams: 1, conflict: true });
  const redConflict = runExport(join(WORK, 'red-conflict'));
  check('red: one POST body with two replies for one route fails the export', redConflict.status !== 0 && redConflict.stderr.includes('has two replies'));
  console.log('passed=' + passed + ' failed=' + failed.length);
  if (failed.length > 0) process.exitCode = 1;
}

main();
