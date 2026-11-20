import { execFileSync, spawn, spawnSync } from 'node:child_process';
import { closeSync, existsSync, mkdirSync, openSync, readFileSync, readdirSync, rmSync, truncateSync, writeFileSync } from 'node:fs';
import net from 'node:net';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const SCRIPT = resolve(process.env.EXPORT_SCRIPT || join(HERE, '..', 'export-pages.mjs'));
const SERVER = resolve(join(HERE, '..', 'serve-local.mjs'));
const WORK = '/tmp/verify/pages-witness';
const TEXT_TYPES = ['text/html', 'text/javascript', 'text/css', 'application/json'];
const sleep = (ms) => new Promise((done) => setTimeout(done, ms));
let passed = 0;
const failed = [];

function check(name, ok) {
  if (ok) passed += 1;
  else failed.push(name);
  console.log((ok ? 'ok   ' : 'FAIL ') + name);
}

function makeFixture(root, oversize) {
  rmSync(root, { recursive: true, force: true });
  for (const dir of ['assets/fixture', 'assets/www.spawn.co', 'raw/http', 'state']) mkdirSync(join(root, dir), { recursive: true });
  writeFileSync(join(root, 'raw/http/session-dev.body'), '<!DOCTYPE html><html><body>session</body></html>');
  writeFileSync(join(root, 'raw/http/dev-page.body'), '<!DOCTYPE html><html><head></head><body><img src="/fonts/f.woff2"><script src="https://www.spawn.co/_ready/ok.txt"></script></body></html>');
  let chunk = 'const more = "/_next/static/more.js";\nconst pool = "https://play.spawn.co/v4/client/pool/tome-ui/a.html";\nconst gone = "/fonts/absent.woff2";\n';
  chunk += 'const tool = "/fonts/tool.dmg";\n';
  if (oversize) chunk += 'const big = "/fonts/big.woff2";\n';
  writeFileSync(join(root, 'assets/fixture/chunk.js'), chunk);
  writeFileSync(join(root, 'assets/www.spawn.co/__next_static_more.js'), 'console.log("more");\n');
  writeFileSync(join(root, 'assets/fixture/a.html'), '<html><body>pool</body></html>\n');
  writeFileSync(join(root, 'assets/fixture/ok.txt'), 'ready\n');
  writeFileSync(join(root, 'assets/fixture/f.woff2'), Buffer.alloc(64, 7));
  writeFileSync(join(root, 'assets/fixture/tool.dmg'), Buffer.from([0, 1, 2, 255]));
  const log = [
    { url: 'https://www.spawn.co/_next/static/chunk.js', file: 'assets/fixture/chunk.js', status: 200 },
    { url: 'https://play.spawn.co/v4/client/pool/tome-ui/a.html', file: 'assets/fixture/a.html', status: 200 },
    { url: 'https://www.spawn.co/_ready/ok.txt', file: 'assets/fixture/ok.txt', status: 200 },
    { url: 'https://www.spawn.co/fonts/tool.dmg', file: 'assets/fixture/tool.dmg', status: 200 },
    { url: 'https://www.spawn.co/fonts/f.woff2', file: 'assets/fixture/f.woff2', status: 200 },
    { url: 'https://(?:p[1-9]', file: 'assets/fixture/missing.bin', status: 0 },
  ];
  writeFileSync(join(root, 'state/fetch-log.jsonl'), log.map((record) => JSON.stringify(record)).join('\n') + '\n');
  if (oversize) {
    closeSync(openSync(join(root, 'assets/www.spawn.co/_fonts_big.woff2'), 'w'));
    truncateSync(join(root, 'assets/www.spawn.co/_fonts_big.woff2'), 101 * 1024 * 1024);
  }
}

function runExport(root, extra) {
  return spawnSync(process.execPath, [SCRIPT, ...extra], {
    encoding: 'utf8',
    maxBuffer: 1 << 28,
    env: Object.assign({}, process.env, { SNAPSHOT_ROOT: root, PAGES_OUT: join(root, 'pages-out'), EXPORT_SERVER: SERVER }),
  });
}

function walk(dir) {
  const found = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) found.push(...walk(full));
    else found.push(full);
  }
  return found;
}

function git(repo, args) {
  return execFileSync('git', ['-C', repo].concat(args), { encoding: 'utf8' }).trim();
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

async function main() {
  const root = join(WORK, 'site');
  makeFixture(root, false);
  const run = runExport(root, []);
  check('export exits 0 on the fixture', run.status === 0);
  if (run.status !== 0) console.log(run.stderr);
  const out = join(root, 'pages-out');
  const summaryPath = join(root, 'pages-export.summary.json');
  const summary = existsSync(summaryPath) ? JSON.parse(readFileSync(summaryPath, 'utf8')) : { pages: [], misses: 0, files: 0, bytes: 0, largest: { rel: '', bytes: 0 } };
  const exists = (rel) => existsSync(join(out, rel));
  check('index.html is the entry page', exists('index.html'));
  check('.nojekyll is written so Pages keeps underscore paths', exists('.nojekyll'));
  check('chunk.js is exported at its path', exists('_next/static/chunk.js'));
  check('more.js is found only by a reference inside chunk.js', exists('_next/static/more.js'));
  check('pool module is exported under /session', exists('session/tome-ui/a.html'));
  check('font is exported', exists('fonts/f.woff2'));
  check('a binary download is a flat file, not an index page', exists('fonts/tool.dmg') && !exists('fonts/tool.dmg/index.html'));
  check('ready file is exported', exists('_ready/ok.txt'));
  check('the page reference to ok.txt is exported under /__local/', exists('__local/' + encodeURIComponent('https://www.spawn.co/_ready/ok.txt')));
  check('a 404 reference is a miss, not a file', summary.misses >= 1 && !exists('fonts/absent.woff2'));
  const files = walk(out);
  const texts = files.filter((file) => /\.(html|js|css|json)$/.test(file));
  check('the export has exported text files', texts.length >= 3);
  check('no exported text carries the export port', texts.every((file) => !readFileSync(file, 'utf8').includes('127.0.0.1')));
  check('summary largest equals the largest page', summary.largest.bytes === Math.max(0, ...summary.pages.map((page) => page.bytes)));
  check('summary counts pages plus .nojekyll', summary.files === summary.pages.length + 1);

  const port = await freePort();
  const base = 'http://127.0.0.1:' + port;
  const child = spawn(process.execPath, [SERVER], { env: Object.assign({}, process.env, { SNAPSHOT_ROOT: root, PORT: String(port), HOST: '127.0.0.1' }), stdio: 'ignore' });
  let healthy = false;
  for (let attempt = 0; attempt < 100 && !healthy; attempt += 1) {
    try {
      healthy = (await fetch(base + '/__health')).ok;
    } catch {
      await sleep(100);
    }
  }
  let equal = 0;
  const differ = [];
  try {
    for (const page of summary.pages) {
      const response = await fetch(base + page.path);
      const served = Buffer.from(await response.arrayBuffer());
      const type = (response.headers.get('content-type') || '').split(';')[0].trim();
      const comparable = TEXT_TYPES.includes(type) ? Buffer.from(served.toString('utf8').split(base).join('')) : served;
      if (comparable.equals(readFileSync(join(out, page.rel)))) equal += 1;
      else differ.push(page.path);
    }
  } finally {
    child.kill('SIGTERM');
  }
  check('the server answered the health check', healthy);
  check('every exported page equals the server response for its path (' + equal + '/' + summary.pages.length + ')', summary.pages.length >= 6 && equal === summary.pages.length);
  if (differ.length) console.log('differ: ' + differ.join(', '));

  const big = join(WORK, 'site-big');
  makeFixture(big, true);
  const bigRun = runExport(big, []);
  check('an export with a 101 MB file is refused and names it', bigRun.status !== 0 && bigRun.stderr.includes('/fonts/big.woff2'));

  const repo = join(WORK, 'repo');
  rmSync(repo, { recursive: true, force: true });
  mkdirSync(repo, { recursive: true });
  execFileSync('git', ['-C', repo, 'init', '-q']);
  execFileSync('git', ['-C', repo, 'config', 'user.name', 'lanmower']);
  execFileSync('git', ['-C', repo, 'config', 'user.email', 'lanmower@example.invalid']);
  const pub = runExport(root, ['--publish', repo]);
  check('publish exits 0', pub.status === 0);
  if (pub.status !== 0) console.log(pub.stderr);
  check('gh-pages points at a commit', /^[0-9a-f]{40}$/.test(git(repo, ['rev-parse', 'refs/heads/gh-pages'])));
  check('gh-pages index.html equals the export', execFileSync('git', ['-C', repo, 'show', 'refs/heads/gh-pages:index.html']).equals(readFileSync(join(out, 'index.html'))));
  const names = git(repo, ['ls-tree', '-r', '--name-only', 'refs/heads/gh-pages']).split('\n').filter(Boolean);
  check('gh-pages holds every exported file plus .nojekyll (' + names.length + ')', names.length === summary.pages.length + 1 && names.includes('.nojekyll'));
  const again = runExport(root, ['--publish', repo]);
  check('second publish exits 0', again.status === 0);
  check('second publish builds on the first', git(repo, ['rev-list', '--count', 'refs/heads/gh-pages']) === '2');
  check('commit author is lanmower', git(repo, ['log', '-1', '--format=%an', 'refs/heads/gh-pages']) === 'lanmower');
  check('commit message has no trailers', !/Co-authored|Signed-off|Reviewed-by/i.test(git(repo, ['log', '-1', '--format=%B', 'refs/heads/gh-pages'])));

  if (failed.length === 0) console.log('GREEN ' + passed + ' checks');
  else console.log('RED ' + failed.length + ' failed: ' + failed.join('; '));
  process.exitCode = failed.length === 0 ? 0 : 1;
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});
