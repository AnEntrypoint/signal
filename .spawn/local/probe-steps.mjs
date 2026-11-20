import { readFileSync, existsSync } from 'node:fs';
import { join, basename } from 'node:path';

export function nearest(samples, t) {
  let best = null;
  for (const s of samples) if (best === null || Math.abs(s.t - t) < Math.abs(best.t - t)) best = s;
  return best;
}

export function summarize(marksText, samplesText) {
  const marks = marksText.trim().split('\n').filter(Boolean).map((l) => JSON.parse(l));
  const samples = samplesText.trim().split('\n').filter(Boolean).map((l) => JSON.parse(l)).filter((s) => s.tree);
  const start = marks.length ? marks[0].t : 0;
  const steps = marks.map((m) => {
    const s = nearest(samples, m.t);
    return { label: m.label, elapsedS: Math.round((m.t - start) / 100) / 10, playwriterKb: s ? s.playwriterKb : null, browserTreeKb: s ? s.tree.totalKb : null, byType: s ? s.tree.byType : {} };
  });
  const peak = samples.reduce((a, s) => (a === null || s.tree.totalKb > a.tree.totalKb ? s : a), null);
  return { steps, samples: samples.length, peak: peak ? { elapsedS: peak.elapsed, playwriterKb: peak.playwriterKb, browserTreeKb: peak.tree.totalKb, byType: peak.tree.byType } : null };
}

const invoked = process.argv[1] && basename(process.argv[1]) === 'probe-steps.mjs';
if (invoked) {
  const dir = process.argv[2];
  const read = (name) => (existsSync(join(dir, name)) ? readFileSync(join(dir, name), 'utf8') : '');
  console.log(JSON.stringify(summarize(read('steps.log'), read('tree-rss.jsonl'))));
}
