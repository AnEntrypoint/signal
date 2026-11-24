import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
const [procRoot, pidArg, durArg, intervalArg, outArg] = process.argv.slice(2);
const pid = Number(pidArg);
const durMs = Number(durArg);
const intervalMs = Number(intervalArg);
const parseStat = (text) => {
  const open = text.indexOf('(');
  const close = text.lastIndexOf(')');
  const rest = text.slice(close + 2).split(' ');
  return { comm: text.slice(open + 1, close), state: rest[0], utime: Number(rest[11]), stime: Number(rest[12]) };
};
const sampleOnce = (t) => readdirSync(procRoot + '/' + pid + '/task').map((tid) => {
  try {
    const st = parseStat(readFileSync(procRoot + '/' + pid + '/task/' + tid + '/stat', 'utf8'));
    return { t, tid: Number(tid), comm: st.comm, state: st.state, utime: st.utime, stime: st.stime };
  } catch {
    return null;
  }
}).filter(Boolean);
const samples = [];
const start = Date.now();
while (Date.now() - start < durMs) {
  samples.push(...sampleOnce(Date.now() - start));
  await new Promise((r) => setTimeout(r, intervalMs));
}
const out = { pid, durMs, intervalMs, samples };
if (outArg) writeFileSync(outArg, JSON.stringify(out));
console.log('HOLDER_SAMPLER ' + JSON.stringify({ pid, tasks: new Set(samples.map((s) => s.tid)).size, samples: samples.length }));
