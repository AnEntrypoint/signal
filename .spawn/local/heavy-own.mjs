import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const COMPILER_NAMES = ['cc1plus', 'cc1', 'rustc', 'cargo', 'zig', 'cmake', 'ninja', 'collect2', 'clang', 'lld', 'mold', 'sccache'];
const TEST_CHECK_VERBS = ['test', 'check', 'nextest'];
const HOT_CPU_PERCENT = 20;
const RENDERER_RSS_KIB = 1048576;

export function parseTop(text) {
  let frame = null;
  for (const line of text.split('\n')) {
    if (/^\s*PID\b/.test(line)) { frame = []; continue; }
    if (frame === null) continue;
    const fields = line.trim().split(/\s+/);
    if (fields.length >= 9 && /^\d+$/.test(fields[0])) frame.push({ pid: Number(fields[0]), cpu: Number(fields[8]) });
  }
  return frame || [];
}

export function parsePs(text) {
  return text.split('\n').map((line) => line.trim()).filter(Boolean).map((line) => {
    const [pid, rss, ...rest] = line.split(/\s+/);
    return { pid: Number(pid), rss: Number(rss), args: rest.join(' ') };
  });
}

export function classify(psRows, topRows) {
  const cpuOf = new Map(topRows.map((row) => [row.pid, row.cpu]));
  const found = [];
  for (const row of psRows) {
    if (row.args.includes('gm-core') && row.args.includes('--handshake')) continue;
    const argv = row.args.split(' ');
    const program = (argv[0] || '').split('/').pop();
    let kind = null;
    if (program === 'cargo' && TEST_CHECK_VERBS.includes(argv[1])) kind = 'test-check';
    else if (COMPILER_NAMES.includes(program)) kind = 'compile';
    else if (row.args.includes('--type=renderer') && row.args.includes('chrom') && row.rss > RENDERER_RSS_KIB) kind = 'chromium-renderer';
    if (kind) found.push({ kind, pid: row.pid, args: row.args });
    const cpu = cpuOf.get(row.pid);
    if (cpu !== undefined && cpu > HOT_CPU_PERCENT && !found.some((item) => item.pid === row.pid)) found.push({ kind: 'hot', pid: row.pid, cpu, args: row.args });
  }
  return found;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const ps = execFileSync('ps', ['-eo', 'pid=,rss=,args='], { encoding: 'utf8' });
  const top = execFileSync('top', ['-b', '-n', '2', '-d', '1', '-w', '200'], { encoding: 'utf8' });
  const found = classify(parsePs(ps), parseTop(top));
  console.log(found.length === 0 ? 'HEAVY_OWN clear' : 'HEAVY_OWN busy n=' + found.length + ' ' + found.map((f) => f.kind + ' pid=' + f.pid).join(' '));
  process.exit(found.length === 0 ? 0 : 1);
}
