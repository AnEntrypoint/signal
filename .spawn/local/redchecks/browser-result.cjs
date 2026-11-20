const fs = require('fs');
const dir = process.argv[2];
const DRAW_PARITY = 0.5;
const TRIVIAL_BOX = 128;
const t = JSON.parse(fs.readFileSync(dir + '/trace.json', 'utf8'));
const reqs = t.reqs || [];
const consoles = t.consoles || [];
const pageErrors = t.errs || [];
const okUrls = new Set(t.okUrls || []);
const failedRequests = (t.failed || []).filter((f) => !okUrls.has(f.u));
const abortedThenLoaded = (t.failed || []).length - failedRequests.length;
const local = /^https:\/\/([a-z0-9-]+\.)*github\.io:\d+\//;
const badStatus = reqs.filter((r) => r.s >= 400).map((r) => 'HTTP ' + r.s + ' ' + r.u);
const failedLoads = failedRequests.map((f) => 'FAILED ' + f.err + ' ' + f.u);
const external = reqs.filter((r) => r.m && !local.test(r.u) && !/^(blob|data|about):/.test(r.u)).map((r) => 'EXTERNAL REQUEST ' + r.u);
const posts = reqs.filter((r) => r.m === 'POST');
const consoleErrs = consoles.filter((c) => /^error /.test(c));
const consoleFlagged = consoles.filter((c) => /^warning /.test(c) && /dynamically imported module|preloaded using link preload|entry did not load/.test(c));
const sandboxAccepted = consoles.filter((c) => /^warning /.test(c) && /can escape its sandbox/.test(c));
const consoleBad = [...consoleErrs, ...consoleFlagged].map((c) => 'CONSOLE ' + c.slice(0, 1200));
const pageBad = pageErrors.map((e) => 'PAGE ERROR ' + e);
const session = (t.frames || []).filter((f) => String(f.url).includes('session'));
const sessionInfo = session.map((f) => f.info || {});
const shown = sessionInfo.some((i) => i.shown === true);
const framesDrawn = sessionInfo.some((i) => (i.frames3s || 0) > 0);
const pixel = fs.existsSync(dir + '/pixel.json') ? JSON.parse(fs.readFileSync(dir + '/pixel.json', 'utf8')) : { present: false, reason: 'pixel.json missing' };
const live = process.env.LIVE_REFERENCE && fs.existsSync(process.env.LIVE_REFERENCE) ? JSON.parse(fs.readFileSync(process.env.LIVE_REFERENCE, 'utf8')) : null;
const draw = [];
if (!framesDrawn) draw.push('FRAMES NOT DRAWN session frame ran no animation frames in 3 s');
if (!pixel.present) draw.push('PIXEL NOT MEASURED ' + (pixel.reason || ''));
else if (pixel.changed === 0) draw.push('PIXEL FROZEN session canvas unchanged over 4 s');
else if (pixel.bboxW <= TRIVIAL_BOX && pixel.bboxH <= TRIVIAL_BOX) draw.push('PIXEL TRIVIAL changes confined to ' + pixel.bboxW + 'x' + pixel.bboxH + ' px');
if (!live) draw.push('NO LIVE REFERENCE set LIVE_REFERENCE');
else {
  if (live.shown !== shown) draw.push('PARITY SHOWN static ' + shown + ' live ' + live.shown);
  if (live.pixel && live.pixel.present && pixel.present && pixel.changedFrac < live.pixel.changedFrac * DRAW_PARITY) draw.push('PARITY DRAW static changedFrac ' + pixel.changedFrac + ' below live ' + live.pixel.changedFrac);
}
const fails = [...badStatus, ...failedLoads, ...external, ...consoleBad, ...pageBad, ...draw];
if (posts.length) fails.push('POST REQUESTS ' + posts.length);
const unique = [...new Set(fails)];
const res = {
  http404: badStatus.filter((l) => l.startsWith('HTTP 404 ')).length,
  http405: badStatus.filter((l) => l.startsWith('HTTP 405 ')).length,
  httpOther: badStatus.filter((l) => !/^HTTP (404|405) /.test(l)).length,
  failedRequests: failedLoads.length,
  abortedThenLoaded,
  externalRequests: external.length,
  consoleErrors: consoleErrs.length,
  consoleWarningsFlagged: consoleFlagged.length,
  sandboxWarningsAccepted: sandboxAccepted.length,
  pageErrors: pageErrors.length,
  postRequests: posts.length,
  sessionCanvases: sessionInfo.map((i) => i.canvases || []),
  shown,
  liveShown: live ? live.shown : null,
  framesDrawn,
  pixel: { present: pixel.present, changed: pixel.changed, changedFrac: pixel.changedFrac, bboxW: pixel.bboxW, bboxH: pixel.bboxH },
  livePixel: live && live.pixel ? { changed: live.pixel.changed, changedFrac: live.pixel.changedFrac, bboxW: live.pixel.bboxW, bboxH: live.pixel.bboxH } : null
};
fs.writeFileSync(dir + '/result.json', JSON.stringify({ ...res, failures: unique }, null, 1));
console.log('RESULT ' + JSON.stringify(res));
for (const l of unique.slice(0, 400)) console.log('FAIL ' + l);
console.log('FAIL COUNT ' + unique.length);
process.exit(unique.length === 0 ? 0 : 1);
