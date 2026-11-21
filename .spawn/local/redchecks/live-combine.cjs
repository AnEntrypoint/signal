const fs = require('fs');
const out = process.argv[2];
const runs = process.argv.slice(3).map((f) => JSON.parse(fs.readFileSync(f, 'utf8')));
const boxes = runs.map((r) => (r.pixel && r.pixel.present ? r.pixel.bbox : null));
const present = boxes.every(Boolean);
const inter = present ? boxes.reduce((a, b) => [Math.max(a[0], b[0]), Math.max(a[1], b[1]), Math.min(a[2], b[2]), Math.min(a[3], b[3])]) : null;
const common = !!inter && inter[0] < inter[2] && inter[1] < inter[3];
const union = present ? [Math.min(...boxes.map((b) => b[0])), Math.min(...boxes.map((b) => b[1])), Math.max(...boxes.map((b) => b[2])), Math.max(...boxes.map((b) => b[3]))] : null;
const frames = runs.map((r) => r.frames3s);
const shownSet = [...new Set(runs.map((r) => r.shown))];
const combined = {
  source: 'live-x' + runs.length,
  runs: runs.length,
  shown: shownSet.length === 1 ? shownSet[0] : 'mixed',
  shownRuns: runs.map((r) => r.shown),
  frames3s: Math.min(...frames),
  framesRuns: frames,
  pixel: {
    present,
    bbox: common ? inter : union,
    regionRule: common ? 'intersection' : 'union',
    intersection: common ? inter : null,
    union,
    boxes,
    changed: runs.map((r) => (r.pixel ? r.pixel.changed : null)),
  },
};
fs.writeFileSync(out, JSON.stringify(combined, null, 1));
console.log(JSON.stringify({ shown: combined.shown, frames3s: combined.frames3s, framesRuns: frames, regionRule: combined.pixel.regionRule, bbox: combined.pixel.bbox, boxes }));