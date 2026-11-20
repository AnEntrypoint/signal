import { spawn } from 'node:child_process';
import { readFileSync, mkdtempSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';

const here = dirname(fileURLToPath(import.meta.url));
const sampler = join(here, '..', 'tree-sample.sh');
let passed = 0;
const failed = [];
function check(name, ok) {
  if (ok) passed += 1;
  else failed.push(name);
  console.log((ok ? 'ok   ' : 'FAIL ') + name);
}
const sleep = (ms) => new Promise((done) => setTimeout(done, ms));
const out = mkdtempSync(join(tmpdir(), 'sample-'));
const leader = spawn(process.execPath, ['-e', 'const b = Buffer.alloc(32 * 1024 * 1024, 1); setInterval(() => {}, 1000);'], { stdio: 'ignore', detached: true });
writeFileSync(join(out, 'browser.pid'), String(leader.pid));
await sleep(800);
const sampleProc = spawn('bash', [sampler, out], { stdio: 'ignore', detached: true });
await sleep(6500);
const lines = readFileSync(join(out, 'tree-rss.jsonl'), 'utf8').trim().split('\n').filter(Boolean).map((l) => JSON.parse(l));
check('the sampler writes at least 2 lines in 6.5 s (' + lines.length + ')', lines.length >= 2);
check('each line names the browser group by its PID', lines.length > 0 && lines.every((l) => l.tree && l.tree.groupId === leader.pid));
check('each line has a group total of at least 30000 KB', lines.length > 0 && lines.every((l) => typeof l.tree.totalKb === 'number' && l.tree.totalKb >= 30000));
check('each line has the playwriter footprint as a number', lines.length > 0 && lines.every((l) => typeof l.playwriterKb === 'number'));
check('each line carries an elapsed count that does not go down', lines.every((l, i) => i === 0 || l.elapsed >= lines[i - 1].elapsed));
const fake = spawn(process.execPath, ['-e', 'setInterval(() => {}, 1000)', 'playwriter -s 77 --fake'], { stdio: 'ignore', detached: true });
await sleep(300);
const scoped = mkdtempSync(join(tmpdir(), 'scope-'));
const other = mkdtempSync(join(tmpdir(), 'scope-'));
for (const [dir, id] of [[scoped, '77'], [other, '78']]) {
  writeFileSync(join(dir, 'browser.pid'), String(leader.pid));
  writeFileSync(join(dir, 'session.id'), id);
}
const sA = spawn('bash', [sampler, scoped], { stdio: 'ignore', detached: true });
const sB = spawn('bash', [sampler, other], { stdio: 'ignore', detached: true });
await sleep(4500);
const last = (dir) => JSON.parse(readFileSync(join(dir, 'tree-rss.jsonl'), 'utf8').trim().split('\n').pop());
check('a playwriter process of this session counts (' + last(scoped).playwriterKb + ' KB)', last(scoped).playwriterKb > 0);
check('a playwriter process of another session does not count', last(other).playwriterKb === 0);
for (const p of [sA.pid, sB.pid, fake.pid]) { try { process.kill(p, 'SIGTERM'); } catch { } }
try { process.kill(-leader.pid, 'SIGTERM'); } catch { leader.kill('SIGTERM'); }
await sleep(4500);
let samplerAlive = true;
try { process.kill(sampleProc.pid, 0); } catch { samplerAlive = false; }
if (samplerAlive) { process.kill(sampleProc.pid, 'SIGTERM'); }
check('the sampler exits by itself once the browser group is gone', !samplerAlive);

if (failed.length === 0) console.log('GREEN ' + passed + ' checks');
else console.log('RED ' + failed.length + ' failed: ' + failed.join('; '));
process.exitCode = failed.length === 0 ? 0 : 1;
