const fs = require('fs');
const out = process.argv[2];
const runs = process.argv.slice(3).map((f) => JSON.parse(fs.readFileSync(f, 'utf8')));
const MIN_FRAMES = 100;
const RATIO_LIMIT = 4;
const valid = runs.filter((r) => typeof r.frames3s === 'number' && r.frames3s >= MIN_FRAMES && r.pixel && r.pixel.present && r.pixel.bbox);
const excluded = runs.filter((r) => !valid.includes(r)).map((r) => ({ frames3s: r.frames3s, box: r.pixel ? r.pixel.bbox : null, laneBits: r.laneBits === undefined ? null : r.laneBits }));
const boxes = valid.map((r) => r.pixel.bbox);
const area = (b) => (b[2] - b[0]) * (b[3] - b[1]);
const overlaps = (a, b) => a[0] < b[2] && a[2] > b[0] && a[1] < b[3] && a[3] > b[1];
const pairwise = boxes.every((a) => boxes.every((b) => overlaps(a, b)));
const ratio = boxes.length ? Math.max(...boxes.map(area)) / Math.min(...boxes.map(area)) : null;
let regionRule = 'none';
let bbox = null;
if (boxes.length === 1) { regionRule = 'single'; bbox = boxes[0]; }
else if (boxes.length >= 2 && pairwise && ratio <= RATIO_LIMIT) {
  regionRule = 'intersection';
  bbox = [Math.max(...boxes.map((b) => b[0])), Math.max(...boxes.map((b) => b[1])), Math.min(...boxes.map((b) => b[2])), Math.min(...boxes.map((b) => b[3]))];
} else if (boxes.length >= 2) regionRule = 'unreliable';
const laneRuns = runs.map((r) => (r.laneBits === undefined ? null : r.laneBits));
const lanesEqual = new Set(laneRuns.map(String)).size === 1;
const shownSet = [...new Set(runs.map((r) => r.shown))];
const combined = {
  source: 'live-x' + runs.length,
  runs: runs.length,
  valid: valid.length,
  excluded,
  shown: shownSet.length === 1 ? shownSet[0] : 'mixed',
  shownRuns: runs.map((r) => r.shown),
  frames3s: valid.length ? Math.min(...valid.map((r) => r.frames3s)) : 0,
  framesRuns: runs.map((r) => r.frames3s),
  laneBits: lanesEqual ? laneRuns[0] : 'MIXED ' + JSON.stringify(laneRuns),
  laneBitsRuns: laneRuns,
  siteTree: Object.fromEntries(['boot', 'scans'].map((kind) => [kind, runs.every((r) => r.siteTree && r.siteTree[kind] === 200) ? 200 : 'MIXED ' + JSON.stringify(runs.map((r) => (r.siteTree ? r.siteTree[kind] : null)))])),
  engineLines: [...new Set(runs.flatMap((r) => r.engineLines || []))].sort(),
  lanesEqual,
  pixel: {
    present: boxes.length > 0,
    bbox: regionRule === 'unreliable' ? null : bbox,
    regionRule,
    areaRatio: ratio,
    boxes,
    changed: valid.map((r) => r.pixel.changed),
  },
};
fs.writeFileSync(out, JSON.stringify(combined, null, 1));
console.log(JSON.stringify({ valid: combined.valid, excluded: excluded.length, regionRule, bbox: combined.pixel.bbox, boxes, areaRatio: ratio, laneBits: combined.laneBits, lanesEqual, frames3s: combined.frames3s }));
