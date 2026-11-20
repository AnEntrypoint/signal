import { execFileSync, spawn } from 'node:child_process';
import { classify, parsePs, summarize } from '../tree-rss.mjs';

let passed = 0;
const failed = [];
function check(name, ok) {
  if (ok) passed += 1;
  else failed.push(name);
  console.log((ok ? 'ok   ' : 'FAIL ') + name);
}

const FIXTURE = [
  '  100   1  100  10000 /usr/lib/chromium/chromium --remote-debugging-port=9333',
  '  101 100  100  50000 /usr/lib/chromium/chromium --type=renderer --crashpad-handler-pid=100',
  '  102 100  100  20000 /usr/lib/chromium/chromium --type=gpu-process',
  '  103 100  100   3000 /usr/lib/chromium/chromium --type=utility --utility-sub-type=network.mojom.NetworkService',
  '  104 100  100   1000 /usr/lib/chromium/chromium --type=zygote',
  '  200   1  200  99999 unrelated process in another group',
  '  201 200  200   7000 unrelated child in another group',
].join('\n');

const rows = parsePs(FIXTURE);
check('parsePs reads every fixture row', rows.length === 7);
check('parsePs reads the pid, ppid, pgid, rss and args fields', rows[1].pid === 101 && rows[1].ppid === 100 && rows[1].pgid === 100 && rows[1].rss === 50000 && rows[1].args.includes('--type=renderer'));
check('the group leader is the browser', classify(rows[0], 100) === 'browser');
check('a --type=renderer member is the renderer', classify(rows[1], 100) === 'renderer');
check('a utility member is keyed by its sub-type', classify(rows[3], 100) === 'utility:network.mojom.NetworkService');
const sum = summarize(rows, 100);
check('the group total counts every member of group 100 (84000 KB)', sum.totalKb === 84000 && sum.count === 5);
check('the group total excludes the other group', sum.totalKb !== 84000 + 99999 + 7000);
check('the renderer total is 50000 KB', sum.byType.renderer === 50000);
check('top lists the largest member first (renderer pid 101)', sum.top.length === 3 && sum.top[0].pid === 101 && sum.top[0].kind === 'renderer' && sum.top[0].rssKb === 50000);
check('the browser total is 10000 KB', sum.byType.browser === 10000);

const leader = spawn(process.execPath, ['-e', 'const b = Buffer.alloc(64 * 1024 * 1024, 1); setInterval(() => {}, 1000);'], { stdio: 'ignore', detached: true });
await new Promise((done) => setTimeout(done, 1500));
const live = summarize(parsePs(execFileSync('ps', ['-eo', 'pid=,ppid=,pgid=,rss=,args='], { encoding: 'utf8' })), leader.pid);
check('a live group holding a 64 MB buffer counts at least 60000 KB (' + live.totalKb + ')', live.totalKb >= 60000);
try {
  process.kill(-leader.pid, 'SIGTERM');
} catch {
  leader.kill('SIGTERM');
}
await new Promise((done) => setTimeout(done, 500));
let alive = true;
try {
  process.kill(leader.pid, 0);
} catch {
  alive = false;
}
check('the live group was stopped by its PID', !alive);

if (failed.length === 0) console.log('GREEN ' + passed + ' checks');
else console.log('RED ' + failed.length + ' failed: ' + failed.join('; '));
process.exitCode = failed.length === 0 ? 0 : 1;
