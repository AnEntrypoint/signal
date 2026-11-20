import fs from 'node:fs';
const L = '/workspace/signal/world/signal-stage/.spawn/local/';
const src = fs.readFileSync(L + 'holder-memdump.mjs', 'utf8');
const outDir = process.argv[2] || '/tmp/verify';
const cases = [
  ['no-pid-filter', [["e.pid === HOLDER && e.name === 'ProcessMemoryDump'", "e.name === 'ProcessMemoryDump'"]]],
  ['no-guid-filter', [[" && e.args && e.args.dump_guid === out.dumpGuid);", ");"]]],
  ['no-name-filter', [["e.name === 'ProcessMemoryDump' && (e.ph === 'b' || e.ph === 'e') && ", '']]],
  ['no-child-exclusion', [['/^partition_alloc\\/partitions\\/[^/]+$/.test(r.name)', '/^partition_alloc\\/partitions\\//.test(r.name)']]],
  ['drop-partition', [['  out.partitionAlloc = { totalBytes: parts.reduce((s, p) => s + p.sizeBytes, 0), partitions: parts };', '']]],
  ['drop-rss', [['  out.residentSetBytes = sizeOf(procTotals.attrs, \'resident_set_bytes\');', '']]],
  ['drop-matched', [['  out.matchedDump = requested.length > 0;', '']]],
];
const made = [];
for (const [name, pairs] of cases) {
  let out = src;
  for (const [text, repl] of pairs) {
    const n = out.split(text).length - 1;
    if (n !== 1) throw new Error('anchor ' + name + ' count ' + n + ': ' + text.slice(0, 60));
    out = out.replace(text, () => repl);
  }
  const p = outDir + '/holder-memdump-sab-' + name + '.mjs';
  fs.writeFileSync(p, out);
  made.push(p);
}
console.log(made.join('\n'));
