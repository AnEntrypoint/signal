const origin = 'http://127.0.0.1:4173';
const T0 = Date.now();
const p = await context.newPage();
const groups = {};
const pageErrors = [];
const note = (k) => { groups[k] = (groups[k] || 0) + 1; };
p.on('response', (r) => {
  const s = r.status();
  if (s < 400) return;
  const u = new URL(r.url());
  const path = decodeURIComponent(u.pathname).replace(/[0-9a-f]{16,}/g, 'H').slice(0, 70);
  note(s + ' ' + u.host + ' ' + path);
});
p.on('pageerror', (e) => pageErrors.push(String(e.message).slice(0, 140)));
await p.route((u) => new URL(u).pathname === '/ready-plate', (r) => r.fulfill({ status: 200, contentType: 'text/html', body: '' }));
await p.goto(origin + '/', { waitUntil: 'load', timeout: 90000 });
await new Promise((r) => setTimeout(r, 30000));
const top = Object.entries(groups).sort((a, b) => b[1] - a[1]).slice(0, 12);
console.log('FAULTS t=' + (Date.now() - T0) + 'ms ' + JSON.stringify({ total: Object.values(groups).reduce((a, b) => a + b, 0), top, pageErrors: pageErrors.slice(0, 5) }));
const boot = await p.evaluate(() => ({
  stood: document.documentElement.getAttribute('data-spawn-stood'),
  shown: document.documentElement.className,
})).catch((e) => ({ error: String(e.message).slice(0, 80) }));
console.log('BOOT ' + JSON.stringify(boot));
await p.close();
