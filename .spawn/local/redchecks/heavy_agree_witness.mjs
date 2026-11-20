import { spawnSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
const modPath = process.argv[2] || fileURLToPath(new URL('../heavy-agree.mjs', import.meta.url));
const mod = await import(pathToFileURL(modPath).href);
const CASES = [
  { name: '02:04:23Z (row 293): same busy verdict, checker flags 1998 as well', own: 'HEAVY_OWN busy n=1 hot pid=2061009', checker: 'HEAVY_JOBS busy n=2 hot pid=2061009 cpu=21.0 npm ci hot pid=1998 cpu=26.7 claude --dangerously-skip-permissions', agree: false, pidsSame: false },
  { name: '02:03:49Z (row 293): both busy, different single pid', own: 'HEAVY_OWN busy n=1 hot pid=2109', checker: 'HEAVY_JOBS busy n=1 hot pid=2062149 cpu=78.2 npm ci', agree: false, pidsSame: false },
  { name: 'both clear', own: 'HEAVY_OWN clear', checker: 'HEAVY_JOBS clear', agree: true, pidsSame: true },
  { name: 'both busy on the same pid (02:04:56Z)', own: 'HEAVY_OWN busy n=1 hot pid=2062776', checker: 'HEAVY_JOBS busy n=1 hot pid=2062776 cpu=27.7 grep -rl void_extent', agree: true, pidsSame: true },
  { name: 'verdict differs: own clear, checker busy', own: 'HEAVY_OWN clear', checker: 'HEAVY_JOBS busy n=1 hot pid=2062776', agree: false, pidsSame: false },
  { name: 'same two pids in a different order', own: 'HEAVY_OWN busy n=2 hot pid=1998 hot pid=2061009', checker: 'HEAVY_JOBS busy n=2 hot pid=2061009 cpu=21.0 hot pid=1998 cpu=26.7', agree: true, pidsSame: true },
];
const checks = [];
const check = (n, ok, got) => checks.push({ n, ok: Boolean(ok), got: String(JSON.stringify(got) ?? 'absent').slice(0, 200) });
for (const c of CASES) {
  const res = mod.agree(c.own, c.checker);
  check(c.name + ': agree is ' + c.agree, res.agree === c.agree, res);
  check(c.name + ': pid sets compared', res.pidsSame === c.pidsSame, [res.own.pids, res.checker.pids]);
}
const cli = spawnSync('node', [modPath, CASES[0].own, CASES[0].checker], { encoding: 'utf8' });
check('CLI on the 02:04:23Z case exits 1 and prints NO', cli.status === 1 && cli.stdout.includes('HEAVY_AGREE NO'), [cli.status, cli.stdout.trim()]);
const cliOk = spawnSync('node', [modPath, CASES[2].own, CASES[2].checker], { encoding: 'utf8' });
check('CLI on both clear exits 0 and prints yes', cliOk.status === 0 && cliOk.stdout.includes('HEAVY_AGREE yes'), [cliOk.status, cliOk.stdout.trim()]);
for (const c of checks) console.log((c.ok ? 'PASS ' : 'FAIL ') + c.n + ' got=' + c.got);
const red = checks.filter((c) => !c.ok).length;
console.log('HEAVY AGREE WITNESS (' + modPath + '): ' + (red === 0 ? 'GREEN' : 'RED'));
process.exit(red === 0 ? 0 : 1);
