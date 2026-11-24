import fs from 'node:fs';
import { spawn } from 'node:child_process';
const L = '/workspace/signal/world/signal-stage/.spawn/local/';
const alive = (p) => { try { process.kill(p, 0); return true; } catch { return false; } };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const run = async (label, watchPath) => {
  const OUT = '/workspace/tmp/signal/verify/holder-' + label + '-' + Date.now();
  fs.mkdirSync(OUT, { recursive: true });
  const leader = spawn('bash', ['-c', 'node -e "const b=Buffer.alloc(300<<20).fill(1);setInterval(()=>{},1000)" & sleep 120 & wait'], { detached: true, stdio: 'ignore' });
  leader.unref();
  fs.writeFileSync(OUT + '/browser.pid', String(leader.pid));
  const w = spawn('bash', [watchPath, OUT], { detached: true, stdio: 'ignore', env: { ...process.env, MEM_CAP_KB: '100000', RUN_CAP_S: '99999' } });
  w.unref();
  let reason = null;
  for (let i = 0; i < 80 && reason === null; i += 1) { await sleep(500); if (fs.existsSync(OUT + '/bound.reason')) reason = fs.readFileSync(OUT + '/bound.reason', 'utf8').trim(); }
  await sleep(500);
  const holder = fs.existsSync(OUT + '/bound.holder') ? fs.readFileSync(OUT + '/bound.holder', 'utf8').split('\n').filter(Boolean) : null;
  const res = { label, reason, holderTop: holder ? holder[0] : null, holderRows: holder ? holder.length : 0 };
  try { process.kill(-leader.pid, 'SIGTERM'); } catch {}
  try { process.kill(w.pid, 'SIGTERM'); } catch {}
  await sleep(500);
  res.leaderAlive = alive(leader.pid); res.watchAlive = alive(w.pid);
  return res;
};
const real = await run('real', L + 'bound-watch.sh');
const src = fs.readFileSync(L + 'bound-watch.sh', 'utf8');
const sabSrc = src.split('\n').filter((l) => !l.includes('bound.holder')).join('\n');
if (sabSrc === src) throw new Error('sabotage did not apply');
fs.writeFileSync('/workspace/tmp/signal/verify/bound-sab.sh', sabSrc);
const sab = await run('sabotage', '/workspace/tmp/signal/verify/bound-sab.sh');
console.log(JSON.stringify({ real, sab }, null, 1));
const greenReal = real.reason !== null && real.reason.startsWith('memory') && real.holderTop !== null && real.holderTop.includes('Buffer.alloc');
console.log('HOLDER NAMED ON TRIP: ' + (greenReal ? 'GREEN' : 'RED'));
console.log('SABOTAGE (holder dump removed) goes RED: ' + (sab.holderTop === null ? 'yes' : 'NO'));
