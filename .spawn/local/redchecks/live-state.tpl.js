const fs = require('fs');
const OUT = '__OUT__';
const STATE = __STATE__;
const page = await context.newPage();
await page.setViewportSize({ width: 1280, height: 800 });
await page.goto('__LIVE__', { waitUntil: 'domcontentloaded', timeout: 150000 }).catch((e) => console.log('nav-error ' + String(e.message).slice(0, 160)));
await new Promise((r) => setTimeout(r, 60000));
const states = [];
for (const f of page.frames()) {
  const st = await f.evaluate(STATE).catch((e) => ({ err: String(e.message).slice(0, 160) }));
  states.push({ frame: f.url().slice(0, 200), state: st });
}
fs.writeFileSync(OUT + '/state.json', JSON.stringify(states, null, 1));
console.log('frames', states.length);
await page.close();
