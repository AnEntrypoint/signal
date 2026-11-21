const fs = require('fs');
const OUT = '__OUT__';
const consoles = [];
const errs = [];
const failed = [];
const responses = [];
const page = await context.newPage();
page.on('console', (m) => { if (consoles.length < 3000) consoles.push(m.type() + ' ' + m.location().url.slice(0, 160) + ': ' + m.text().slice(0, 800)); });
page.on('pageerror', (e) => { if (errs.length < 500) errs.push(String(e.message).slice(0, 300)); });
page.on('requestfailed', (r) => { if (failed.length < 500) failed.push(r.url().slice(0, 200) + ' ' + String(r.failure() && r.failure().errorText)); });
page.on('response', (r) => { if (r.status() >= 400 && responses.length < 500) responses.push(r.status() + ' ' + r.url().slice(0, 200)); });
await page.setViewportSize({ width: 1280, height: 800 });
await page.goto('__LIVE__', { waitUntil: 'domcontentloaded', timeout: 150000 }).catch((e) => errs.push('NAV ' + String(e.message).slice(0, 200)));
await new Promise((r) => setTimeout(r, 60000));
const result = { session: null, info: null };
const sess = page.frames().find((f) => f.url().includes('/session/'));
if (sess) {
  result.session = sess.url().slice(0, 160);
  result.info = await sess.evaluate(() => new Promise((res) => {
    let n = 0;
    const t0 = performance.now();
    const cv = [...document.querySelectorAll('canvas')];
    let pick = -1;
    let best = 0;
    cv.forEach((c, i) => { if (c.width * c.height > best) { best = c.width * c.height; pick = i; } });
    const g = () => {
      n += 1;
      if (performance.now() - t0 < 3000) { requestAnimationFrame(g); return; }
      res({ canvases: cv.map((c) => c.width + 'x' + c.height), frames3s: n, shown: document.documentElement.classList.contains('spawn-world-shown'), pick });
    };
    requestAnimationFrame(g);
  })).catch((e) => ({ err: String(e.message).slice(0, 160) }));
  if (result.info && result.info.pick >= 0) {
    await sess.locator('canvas').nth(result.info.pick).screenshot({ path: OUT + '/canvas-a.png' });
    await new Promise((r) => setTimeout(r, 4000));
    await sess.locator('canvas').nth(result.info.pick).screenshot({ path: OUT + '/canvas-b.png' });
  }
}
result.consoles = consoles;
result.errs = errs;
result.failed = failed;
result.responses = responses;
fs.writeFileSync(OUT + '/deploy-check.json', JSON.stringify(result, null, 1));
console.log(JSON.stringify({ session: result.session, info: result.info, errs: errs.length, failed: failed.length, responses: responses.length, consoles: consoles.length }));
await page.close();
