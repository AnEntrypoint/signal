const origin = 'http://127.0.0.1:4173';
const variants = {
  baseline: null,
  noNavigatorGpu: () => {
    delete Navigator.prototype.gpu;
  },
  diagnosticStubAdapter: () => {
    const stub = { features: new Set(), limits: {}, info: {}, requestDevice: async () => { throw new Error('diagnostic stub: no device'); } };
    Object.defineProperty(Navigator.prototype, 'gpu', {
      configurable: true,
      get: () => ({ requestAdapter: async () => stub, getPreferredCanvasFormat: () => 'bgra8unorm' }),
    });
  },
};
const out = {};
for (const [name, init] of Object.entries(variants)) {
  const p = await context.newPage();
  const cdp = await context.newCDPSession(p);
  await cdp.send('Network.clearBrowserCache');
  if (init) await p.addInitScript(init);
  let scenario = null;
  let plateHits = 0;
  await p.route((u) => new URL(u).pathname === '/ready-plate', (r) => {
    plateHits += 1;
    const reads = new URL(r.request().url()).searchParams.get('reads');
    try {
      scenario = JSON.parse(reads).scenario;
    } catch {
      scenario = 'unparsed';
    }
    r.fulfill({ status: 200, contentType: 'text/html', body: '' });
  });
  await p.goto(origin + '/', { waitUntil: 'commit', timeout: 60000 });
  let seen = null;
  const t0 = Date.now();
  while (Date.now() - t0 < 25000) {
    const st = await p.evaluate(() => {
      const w = document.querySelector('[data-compat-wall]');
      const cs = w ? getComputedStyle(w) : null;
      return {
        visible: !!(w && cs.display !== 'none' && w.getBoundingClientRect().height > 0),
        restart: (document.documentElement?.textContent || '').includes('Restart Chrome to play'),
      };
    }).catch(() => ({ visible: false, restart: false }));
    if (st.visible && seen === null) seen = { atMs: Date.now() - t0, restart: st.restart };
    await new Promise((r) => setTimeout(r, 1000));
  }
  out[name] = {
    gpuPresent: await p.evaluate(() => 'gpu' in navigator),
    reportedScenario: scenario,
    plateHits,
    wallFirstVisible: seen,
  };
  await p.close();
}
console.log(JSON.stringify(out));
