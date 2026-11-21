const fs = require('fs');
const OUT = '__OUT__';
const page = await context.newPage();
await page.setViewportSize({ width: 1280, height: 800 });
await page.bringToFront();
await page.addInitScript({ content: fs.readFileSync('__HERE__/seed-random.js', 'utf8') });
await page.goto('__LIVE__', { waitUntil: 'domcontentloaded', timeout: 150000 }).catch((e) => console.log('NAV ' + String(e.message).slice(0, 200)));
await new Promise((r) => setTimeout(r, 60000));
const result = { session: null, info: null };
const sess = page.frames().find((f) => /play\.spawn\.co\/session\//.test(f.url()));
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
if (sess) result.laneBits = await sess.evaluate(() => window.__spawnArrivalLaneBits ?? null).catch(() => 'ERR');
fs.writeFileSync(OUT + '/live-probe.json', JSON.stringify(result, null, 1));
console.log(JSON.stringify(result));
await page.close();
