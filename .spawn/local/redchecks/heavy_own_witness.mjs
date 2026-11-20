import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
const require = createRequire(import.meta.url);
const ref = require('/workspace/bevy/scripts/lib/heavy-jobs.cjs');
const ownPath = process.argv[2] || fileURLToPath(new URL('../heavy-own.mjs', import.meta.url));
const own = await import(pathToFileURL(ownPath).href);
const PS_TEXT = [
  '101 2048 cargo test --workspace',
  '102 2048 cargo build --release',
  '103 2048 /usr/bin/cc1plus -O2 foo.cc',
  '104 4096 rustc --crate-name x',
  '105 2048 node /x/node_modules/.bin/vitest run',
  '106 2048 node node_modules/jest/bin/jest.js',
  '107 2048 node --test test/',
  '108 1048576 /usr/lib/chromium/chromium.real --type=renderer --enable-crash',
  '109 1048577 /usr/lib/chromium/chromium.real --type=renderer --enable-crash',
  '110 3000000 /usr/lib/other --type=renderer',
  '111 2048 /opt/gm-core --handshake --port 1',
  '112 2048 /opt/gm-core --serve',
  '113 2048 grep cargo test',
  '114 2048 bash -c cargo test',
  '115 2048 sleep 100',
  '116 2048 sleep 200',
].join('\n');
const TOP_TEXT = [
  'top - 00:00:00 up 1 day',
  'Tasks: 3 total',
  '    PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND',
  '    116 u         20   0       1      1      1 R  99.0   0.0   0:01.00 sleep',
  '    115 u         20   0       1      1      1 S   0.0   0.0   0:00.00 sleep',
  '',
  'top - 00:00:01 up 1 day',
  'Tasks: 3 total',
  '    PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND',
  '    116 u         20   0       1      1      1 R  21.0   0.0   0:02.00 sleep',
  '    115 u         20   0       1      1      1 S  20.0   0.0   0:00.00 sleep',
  '    112 u         20   0       1      1      1 S  25.0   0.0   0:00.00 gm-core',
].join('\n');
const EXPECTED = { 101: 'test-check', 102: 'compile', 103: 'compile', 104: 'compile', 109: 'chromium-renderer', 112: 'hot', 116: 'hot' };
const kindsOf = (found) => Object.fromEntries(found.map((f) => [f.pid, f.kind]));
const checks = [];
const check = (name, ok, got) => checks.push({ name, ok: Boolean(ok), got: String(JSON.stringify(got) ?? 'absent').slice(0, 220) });
const ownPs = own.parsePs(PS_TEXT);
const refPs = ref.parsePs(PS_TEXT);
check('parsePs: own rows equal the checker rows', JSON.stringify(ownPs) === JSON.stringify(refPs), ownPs.length);
const ownTop = own.parseTop(TOP_TEXT);
const refTop = ref.parseTop(TOP_TEXT);
check('parseTop: own last frame equals the checker last frame', JSON.stringify(ownTop) === JSON.stringify(refTop), ownTop);
check('parseTop: the last frame gives pid 116 at 21 percent', ownTop.some((r) => r.pid === 116 && r.cpu === 21), ownTop);
const ownFound = own.classify(ownPs, ownTop);
const refFound = ref.classify(refPs, refTop);
const ownKinds = kindsOf(ownFound);
const refKinds = kindsOf(refFound);
check('own classify matches the expected table (vitest, jest, node --test, grep, handshake, exact 1 GiB and 20 percent not counted)', JSON.stringify(ownKinds) === JSON.stringify(EXPECTED), ownKinds);
check('checker classify matches the same expected table (the reference holds)', JSON.stringify(refKinds) === JSON.stringify(EXPECTED), refKinds);
check('own and checker agree on every pid and kind', JSON.stringify(ownKinds) === JSON.stringify(refKinds), [ownKinds, refKinds]);
check('own and checker agree on the count of flagged processes', ownFound.length === refFound.length, [ownFound.length, refFound.length]);
for (const c of checks) console.log((c.ok ? 'PASS ' : 'FAIL ') + c.name + ' got=' + c.got);
const red = checks.filter((c) => !c.ok).length;
console.log('HEAVY OWN WITNESS (' + ownPath + '): ' + (red === 0 ? 'GREEN' : 'RED'));
process.exit(red === 0 ? 0 : 1);
