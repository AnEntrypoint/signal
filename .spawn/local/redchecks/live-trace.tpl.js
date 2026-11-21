const fs = require('fs');
const OUT = '__OUT__';
const t0 = Date.now();
const ev = [];
const log = (k, o) => { if (ev.length < 6000) ev.push(Object.assign({ t: Date.now() - t0, k }, o)); };
const page = await context.newPage();
page.on('request', (r) => log('req', { u: r.url().slice(0, 240), type: r.resourceType(), frame: (r.frame() ? r.frame().url() : '').slice(0, 160) }));
page.on('requestfailed', (r) => log('fail', { u: r.url().slice(0, 240), err: String(r.failure() && r.failure().errorText), type: r.resourceType(), frame: (r.frame() ? r.frame().url() : '').slice(0, 160) }));
page.on('response', (r) => log('resp', { u: r.url().slice(0, 240), s: r.status() }));
page.on('framenavigated', (f) => log('nav', { f: f.url().slice(0, 220) }));
page.on('frameattached', (f) => log('attach', { f: f.url().slice(0, 220) }));
page.on('framedetached', (f) => log('detach', { f: f.url().slice(0, 220) }));
page.on('console', (m) => log('console', { txt: (m.type() + ' ' + m.text()).slice(0, 400) }));
page.on('pageerror', (e) => log('pageerror', { txt: String(e.message).slice(0, 300) }));
await page.setViewportSize({ width: 1280, height: 800 });
await page.bringToFront();
await page.addInitScript({ content: fs.readFileSync('__HERE__/seed-random.js', 'utf8') });
await page.goto('__LIVE__', { waitUntil: 'domcontentloaded', timeout: 150000 }).catch((e) => log('nav-error', { txt: String(e.message).slice(0, 200) }));
let canvasAtMs = -1; while (Date.now() - t0 < 150000) { await new Promise((r) => setTimeout(r, 2000)); const sf0 = page.frames().find((f) => f.url().includes('/session/')); const n = sf0 ? await sf0.evaluate(() => document.querySelectorAll('canvas').length).catch(() => 0) : 0; if (n > 0) { canvasAtMs = Date.now() - t0; break; } } await new Promise((r) => setTimeout(r, 5000)); console.log('canvasAtMs ' + canvasAtMs);
const sfL = page.frames().find((fr) => fr.url().includes('/session/'));
const laneBits = sfL ? await sfL.evaluate(() => window.__spawnArrivalLaneBits ?? null).catch(() => 'ERR') : 'NO_SESSION';
const sfC = page.frames().find((fr) => fr.url().includes('/session/'));
const shot = { canvases: [], frames3s: -1, shown: null, pick: -1 };
if (sfC && canvasAtMs >= 0) {
  Object.assign(shot, await sfC.evaluate(() => new Promise((res) => {
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
  })).catch((e) => ({ err: String(e.message).slice(0, 160) })));
  if (shot.pick >= 0) {
    await sfC.locator('canvas').nth(shot.pick).screenshot({ path: OUT + '/canvas-a.png' });
    await new Promise((r) => setTimeout(r, 4000));
    await sfC.locator('canvas').nth(shot.pick).screenshot({ path: OUT + '/canvas-b.png' });
  }
}
console.log('shot ' + JSON.stringify(shot));
fs.writeFileSync(OUT + '/trace-events.json', JSON.stringify({ ev, canvasAtMs, laneBits, shot, frames: page.frames().map((f) => f.url().slice(0, 220)) }, null, 1));
console.log('events', ev.length, 'frames', page.frames().length);
await page.close();
