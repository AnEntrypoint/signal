import fs from 'node:fs';
import path from 'node:path';
const [readerPath, outDir] = process.argv.slice(2);
const src = fs.readFileSync(readerPath, 'utf8');
const muts = {
  'first-candidate': [
    ['p.arrayBufferBytes >= LOAD_MB * MB * LOAD_FRACTION', 'p.arrayBufferBytes >= 0'],
    ['candidates.reduce((a, b) => (b.arrayBufferBytes > a.arrayBufferBytes ? b : a))', 'candidates[0]'],
  ],
  'drop-tracing-timing': [["if (m.method === 'Tracing.tracingComplete') { out.tracingCompleteAtMs = Date.now(); complete(); return; }", "if (m.method === 'Tracing.tracingComplete') { complete(); return; }"]],
  'no-page-close': [['{ out.pageClosed = true; }', '{ }']],
  'drop-spin': [['  if (SPIN > 0) {', '  if (false) {']],
  'drop-sample': [['  out.sampleDumpEvent = sampleEvent ? JSON.stringify(sampleEvent).slice(0, 1500) : null;', '  out.sampleDumpEvent = null;']],
  'fallback-any': [["    if (!(e.name === 'explicitly_triggered' && e.id === out.dumpGuid)) continue;", '']],
  'drop-names': [["  out.dumpNames = events.filter((e) => e.ph === 'v' && e.args && e.args.dumps).reduce((acc, e) => ({ ...acc, [e.name]: (acc[e.name] || 0) + 1 }), {});", '']],
  'drop-control-config': [["  if (TRIGGERS === 'none') traceConfig.memoryDumpConfig = { triggers: [] };", '']],
  'always-none': [["  const TRIGGERS = process.env.STANDALONE_TRIGGERS === 'none' ? 'none' : 'default';", "  const TRIGGERS = 'none';"]],
  'drop-shapes': [["  out.eventShapes = events.reduce((acc, e) => { const k = [e.ph, e.cat, e.name].join('|'); return { ...acc, [k]: (acc[k] || 0) + 1 }; }, {});", '']],
  'drop-guid-hits': [["  out.guidHitCount = guidHits.length;", '']],
  'drop-url': [["process.env.STANDALONE_URL || 'about:blank'", "'about:blank'"]],
  'drop-end-sample': [["  out.processEndSample = processEnd.length ? JSON.stringify(processEnd[0]).slice(0, 1500) : null;", '']],
  'drop-event-ids': [["  out.dumpEventIds = [...new Set(events.filter((e) => e.ph === 'v' && e.args && e.args.dumps).map((e) => String(e.id)))].slice(0, 10);", '']],
};
for (const [name, pairs] of Object.entries(muts)) {
  let out = src;
  for (const [a, b] of pairs) {
    if (out.split(a).length - 1 !== 1) throw new Error('anchor count for ' + name + ': ' + a.slice(0, 50));
    out = out.replace(a, () => b);
  }
  const file = path.join(outDir, 'standalone-dump-' + name + '.mjs');
  fs.writeFileSync(file, out);
  console.log(file);
}
