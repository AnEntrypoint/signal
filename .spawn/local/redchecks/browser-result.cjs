const fs = require('fs');
const dir = process.argv[2];
const REGION_MARGIN = 40;
const ALIVE_FRACTION = 0.25;
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
const worldInfo = sessionInfo.filter((i) => (i.canvases || []).some((c) => c !== '0x0'));
const frames = worldInfo.reduce((m, i) => Math.max(m, i.frames3s || 0), 0);
const pixel = fs.existsSync(dir + '/pixel.json') ? JSON.parse(fs.readFileSync(dir + '/pixel.json', 'utf8')) : { present: false, reason: 'pixel.json missing' };
const live = process.env.LIVE_REFERENCE && fs.existsSync(process.env.LIVE_REFERENCE) ? JSON.parse(fs.readFileSync(process.env.LIVE_REFERENCE, 'utf8')) : null;
const overlaps = (a, b) => a[0] < b[2] && a[2] > b[0] && a[1] < b[3] && a[3] > b[1];
const draw = [];
let liveBox = null;
if (!pixel.present) draw.push('PIXEL NOT MEASURED ' + (pixel.reason || ''));
else if (pixel.changedPairs !== undefined ? pixel.changedPairs === 0 : pixel.changed === 0) draw.push('PIXEL FROZEN session canvas unchanged across ' + (pixel.pairCount || 1) + ' consecutive pairs');
const laneBits = t.laneBits === undefined ? null : t.laneBits;
if (!live) draw.push('NO LIVE REFERENCE set LIVE_REFERENCE');
else {
  if (live.shown !== shown) draw.push('PARITY SHOWN static ' + shown + ' live ' + live.shown);
  if (live.laneBits !== undefined && String(live.laneBits) !== String(laneBits)) draw.push('LANE DRAW MISMATCH static ' + laneBits + ' live ' + live.laneBits);
  const rule = live.pixel && live.pixel.regionRule ? live.pixel.regionRule : 'single';
  const lb = live.pixel && live.pixel.present ? live.pixel.bbox : null;
  const sb = pixel.present && pixel.bbox ? pixel.bbox : null;
  if (rule === 'unreliable') {
    liveBox = null;
    if (!sb) draw.push('REGION EMPTY static canvas changed nowhere');
    else if (sb[0] < 0 || sb[1] < 0 || sb[2] > 1280 || sb[3] > 800) draw.push('REGION OUTSIDE CANVAS static ' + JSON.stringify(sb));
  } else {
    liveBox = lb ? [lb[0] - REGION_MARGIN, lb[1] - REGION_MARGIN, lb[2] + REGION_MARGIN, lb[3] + REGION_MARGIN] : null;
    if (!liveBox) draw.push('REGION NO LIVE REGION in the live reference');
    else if (!sb) draw.push('REGION EMPTY static canvas changed nowhere');
    else if (!overlaps(sb, liveBox)) draw.push('REGION OUTSIDE static ' + JSON.stringify(sb) + ' does not overlap live ' + JSON.stringify(liveBox));
  }
  const lf = typeof live.frames3s === 'number' ? live.frames3s : null;
  const need = lf === null ? null : Math.ceil(ALIVE_FRACTION * lf);
  if (lf === null) draw.push('ALIVE NO LIVE FRAME COUNT');
  else if (frames <= 0 || frames < need) draw.push('ALIVE static frames ' + frames + ' below ' + need + ' (25% of live ' + lf + ')');
}
const warmArmEnded = consoles.some((c) => /\[scripts\] the warm arm ran \d+ units/.test(c));
if (!warmArmEnded) draw.push('WARM ARM NEVER ENDED no "[scripts] the warm arm ran" line: the warm loop never reached its tree and is still re-arming');
for (const c of consoles.filter((c) => /\[Tome\].*(renders NOTHING|no renderable bounds)/.test(c))) draw.push('ENGINE NO VISUAL ' + c.slice(0, 220));
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
  alive: { static: frames, live: live ? live.frames3s : null },
  region: { margin: REGION_MARGIN, staticBox: pixel.bbox || null, liveBox: live && live.pixel ? live.pixel.bbox : null, regionRule: live && live.pixel ? live.pixel.regionRule || "single" : null, expandedLiveBox: liveBox },
  laneBits,
  pixel: { present: pixel.present, changed: pixel.changed, changedFrac: pixel.changedFrac },
  livePixel: live && live.pixel ? { changed: live.pixel.changed, changedFrac: live.pixel.changedFrac } : null
};
fs.writeFileSync(dir + '/result.json', JSON.stringify({ ...res, failures: unique }, null, 1));
console.log('RESULT ' + JSON.stringify(res));
for (const l of unique.slice(0, 400)) console.log('FAIL ' + l);
console.log('FAIL COUNT ' + unique.length);
process.exit(unique.length === 0 ? 0 : 1);
