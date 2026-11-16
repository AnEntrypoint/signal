const origin = 'http://127.0.0.1:4173';
const p = await context.newPage();
const cdp = await context.newCDPSession(p);
await cdp.send('Network.clearBrowserCache');
const watched = {
  'engine-stand (WebGL2 world renderer)': '08ed00dd',
  'engine-stand-page': '52cbc291',
  'engine-film': 'c268b22d',
  'engine-film-renderer': '3d8ad45e',
  'worker-pipeline-compiler (WebGPU pipelines)': '5ced9a7d',
  'authored-realm loader': '1fd56d4a',
  'world-stand module (9d5c4347)': '9d5c4347',
};
const requested = Object.fromEntries(Object.keys(watched).map((k) => [k, 0]));
const messages = {};
p.on('request', (r) => {
  const u = r.url();
  for (const [name, hash] of Object.entries(watched)) if (u.includes(hash)) requested[name] += 1;
});
p.on('console', (m) => {
  if (m.type() === 'error' || m.type() === 'warning') {
    const k = m.type() + ' ' + m.text().slice(0, 110);
    messages[k] = (messages[k] || 0) + 1;
  }
});
p.on('pageerror', (e) => {
  const k = 'PAGEERR ' + String(e.message).slice(0, 110);
  messages[k] = (messages[k] || 0) + 1;
});
await p.goto(origin + '/', { waitUntil: 'commit', timeout: 60000 });
await new Promise((r) => setTimeout(r, 12000));
const frames = [];
for (const f of p.frames()) {
  try {
    const s = await f.evaluate(() => ({
      canvases: [...document.querySelectorAll('canvas')].map((c) => {
        const ctx = {};
        for (const k of ['webgpu', 'webgl2', '2d']) {
          try { ctx[k] = c.getContext(k) ? true : false; } catch (e) { ctx[k] = 'err'; }
        }
        return c.width + 'x' + c.height + ' ' + JSON.stringify(ctx);
      }),
      text: document.body ? document.body.innerText.length : -1,
    }));
    frames.push(f.url().slice(-32) + ' ' + JSON.stringify(s));
  } catch (e) {
    frames.push(f.url().slice(-32) + ' ERR');
  }
}
console.log('REQUESTED ' + JSON.stringify(requested));
console.log('FRAMES\n' + frames.join('\n'));
console.log('MESSAGES\n' + Object.entries(messages).sort((a, b) => b[1] - a[1]).slice(0, 12).map(([k, v]) => v + 'x ' + k).join('\n'));
await p.close();
