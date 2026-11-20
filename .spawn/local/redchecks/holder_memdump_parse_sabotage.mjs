import fs from 'node:fs';
import path from 'node:path';
const [readerPath, outDir] = process.argv.slice(2);
const src = fs.readFileSync(readerPath, 'utf8');
const muts = {
  'drop-event-ids': ['  out.dumpEventIds = [...new Set(dumps.map((e) => String(e.id)))].slice(0, 10);', ''],
  'no-pid-filter': ["e.pid === HOLDER && e.name === 'ProcessMemoryDump'", "e.name === 'ProcessMemoryDump'"],
  'no-name-filter': ["e.name === 'ProcessMemoryDump' && (e.ph === 'b' || e.ph === 'e') && ", ''],
  'no-guid-filter': [' && e.args && e.args.dump_guid === out.dumpGuid);', ');'],
  'drop-periodic-pick': ["  const latest = periodic.reduce(", "  const latest = [].reduce("],
  'no-periodic-pid-filter': ["e.ph === 'v' && e.name === 'periodic_interval' && e.pid === HOLDER", "e.ph === 'v' && e.name === 'periodic_interval'"],
  'hex-as-decimal': ['parseInt(v, 16)', 'parseInt(v, 10)'],
  'drop-raw-save': ['if (process.env.HOLDER_EVENTS_OUT) writeFileSync(process.env.HOLDER_EVENTS_OUT, JSON.stringify(events)); ', ''],
  'drop-star-category': ["['-*', 'disabled-by-default-memory-infra', ...EXTRA_CATEGORIES]", "['disabled-by-default-memory-infra', ...EXTRA_CATEGORIES]"],
  'drop-extra-categories': ["'disabled-by-default-memory-infra', ...EXTRA_CATEGORIES]", "'disabled-by-default-memory-infra']"],
  'v-old-shape': ['  out.matchedDump = requested.length > 0;', "  out.matchedDump = requested.length > 0 || dumps.some((e) => e.name === 'explicitly_triggered' && e.id === out.dumpGuid);"],
};
for (const [name, [a, b]] of Object.entries(muts)) {
  if (src.split(a).length - 1 !== 1) throw new Error('anchor count for ' + name);
  const file = path.join(outDir, 'holder-memdump-parse-' + name + '.mjs');
  fs.writeFileSync(file, src.replace(a, () => b));
  console.log(file);
}
