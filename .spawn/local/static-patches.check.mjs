import { pathToFileURL } from 'node:url';

const { createPatcher, staticPatches } = await import(pathToFileURL(process.argv[2]).href);
const TICK = String.fromCharCode(96);
const FIXTURE = [
  'w=!c&&Gt()',
  'var r=decodeURIComponent(n.pathname.split("/")[2]||"")',
  'var t=e.ok?e.headers.get("x-spawn-manifest"):null',
  '&&!aUQ(e,t)&&$Xi(e,t,' + TICK + 'boundless|$' + '{cQ2(n)}' + TICK + '))RI$(e,{level:"warn"',
  'if(S.bare==="3d")RI$(e,{level:"warn"',
  ...staticPatches('/signal/', 'a'.repeat(64)).slice(5).map(([from]) => from),
].join('\n');
const manifest = 'a'.repeat(64);
const fail = (message) => { console.log('PATCHES_FAILED ' + message); process.exit(1); };

const patcher = createPatcher(staticPatches('/signal/', manifest));
const out = patcher.patch(FIXTURE);
const files = new Map([['/x', { body: Buffer.from(out, 'utf8') }]]);
patcher.verify(files);
for (const wanted of ['w=!c\n', 'split("/")[3]', manifest, 'startsWith("engine-warm|")', 'pa_0+$']) if (!out.includes(wanted)) fail('missing in output: ' + wanted);

const twice = createPatcher(staticPatches('/signal/', manifest));
let doubled = false;
try { twice.patch(FIXTURE + '\n' + FIXTURE); } catch (error) { doubled = /matched 2 times/.test(error.message); }
if (!doubled) fail('a pattern matched twice in one file without an error');

const partial = createPatcher(staticPatches('/signal/', manifest));
partial.patch(FIXTURE.split('\n').slice(0, 4).join('\n'));
let silent = true;
try { partial.verify(new Map()); } catch (error) { silent = !/not found in any file/.test(error.message); }
if (silent) fail('a pattern absent from every file did not fail the export');

console.log('PATCHES_OK');
