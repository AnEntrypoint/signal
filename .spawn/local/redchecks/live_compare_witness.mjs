import { compareLive, lookupLocal, pagesKey, readManifest } from '../pages-live-compare.mjs';

const BASE = 'https://anentrypoint.github.io/signal/';
let passed = 0;
const failed = [];

function check(name, ok) {
  if (ok) passed += 1;
  else failed.push(name);
  console.log((ok ? 'ok   ' : 'FAIL ') + name);
}

const SESSION = 'session/world%3Abc986e1b-5a08-4b6a-adf3-ef93cd1597b4%40dev?address=%40lanmower%2Fsignal-stage&spawn-page=981331e3';
const VERSION = '__local/https%3A%2F%2Fplay.bigspawn.net%2F__version';
const HASHES = {
  index: 'a'.repeat(64),
  version: 'b'.repeat(64),
  session: 'c'.repeat(64),
  tablet: 'd'.repeat(64),
  css: 'e'.repeat(64),
};
const MANIFEST = [
  HASHES.index + '  index.html',
  HASHES.version + '  __local/https:/play.bigspawn.net/__version',
  HASHES.session + '  session/world:bc986e1b-5a08-4b6a-adf3-ef93cd1597b4@dev/index.html',
  HASHES.tablet + '  ground/v7-276-276-320-112-0/tablet.png',
  HASHES.css + '  _next/static/immutable/chunks/5565s7wxhi.css',
].join('\n') + '\n';
const sums = readManifest(MANIFEST);

check('the entry path is index.html', pagesKey('') === 'index.html');
check('an encoded __local name decodes to the single-slash on-disk name', pagesKey(VERSION) === '__local/https:/play.bigspawn.net/__version');
check('a session request drops its query and decodes', pagesKey(SESSION) === 'session/world:bc986e1b-5a08-4b6a-adf3-ef93cd1597b4@dev');
check('a doubled slash collapses the way Pages looks it up', pagesKey('_next//static/immutable/chunks/5565s7wxhi.css') === '_next/static/immutable/chunks/5565s7wxhi.css');
check('an image optimiser request is looked up without its query', pagesKey('_next/image?url=https%3A%2F%2Fspawnfile.io%2Fa.webp&w=640&q=75') === '_next/image');
check('a directory request without a trailing slash finds its index.html', lookupLocal(sums, SESSION) === HASHES.session);
check('a name with no manifest line finds nothing', lookupLocal(sums, 'missing/file.bin') === null);

const live = {
  served: [
    { url: BASE, status: 200, sha256: HASHES.index },
    { url: BASE + VERSION, status: 200, sha256: HASHES.version },
    { url: BASE + SESSION, status: 200, sha256: HASHES.session },
    { url: BASE + 'ground/v7-276-276-320-112-0/tablet.png', status: 200, sha256: HASHES.tablet },
    { url: BASE + '_next//static/immutable/chunks/5565s7wxhi.css', status: 200, sha256: HASHES.css },
    { url: BASE + '_next/image?url=https%3A%2F%2Fspawnfile.io%2Fa.webp&w=640', status: 404, sha256: 'f'.repeat(64) },
  ],
};
const rows = compareLive(MANIFEST, live, BASE);
check('five of six fixture resources match by hash (' + rows.filter((row) => row.match).length + ')', rows.filter((row) => row.match).length === 5);
check('the unmatched resource is the one with no local copy', rows.at(-1).localSha === null && rows.at(-1).match === false);

if (failed.length === 0) console.log('GREEN ' + passed + ' checks');
else console.log('RED ' + failed.length + ' failed: ' + failed.join('; '));
process.exitCode = failed.length === 0 ? 0 : 1;
