const origin = 'http://127.0.0.1:4173';
const p = await context.newPage();
const cdp = await context.newCDPSession(p);
await cdp.send('Network.clearBrowserCache');
const failures = [];
const pageErrors = [];
const nonLocal = [];
let requests = 0;
p.on('request', (r) => {
  requests += 1;
  const u = r.url();
  if (!u.startsWith(origin) && !u.startsWith('blob:') && !u.startsWith('about:') && !u.startsWith('data:')) nonLocal.push(u);
});
p.on('requestfailed', (r) => failures.push({ url: r.url(), error: r.failure()?.errorText || 'unknown', type: r.resourceType() }));
p.on('pageerror', (e) => pageErrors.push(String(e.message).slice(0, 120)));
await p.goto(origin + '/', { waitUntil: 'commit', timeout: 60000 });
await new Promise((r) => setTimeout(r, 9000));
const info = await p.evaluate(() => ({ text: document.body.innerText.length, canvases: document.querySelectorAll('canvas').length }));
const hostOf = (u) => {
  let s = u;
  if (s.startsWith(origin + '/__local/')) s = decodeURIComponent(s.slice((origin + '/__local/').length));
  try {
    return new URL(s).hostname;
  } catch {
    return 'play.spawn.co (pool module, relative name)';
  }
};
const groups = {};
for (const f of failures) {
  const key = f.error + ' | ' + hostOf(f.url);
  (groups[key] ||= []).push(f);
}
console.log(JSON.stringify({ requests, failedCount: failures.length, info, pageErrors, nonLocal: nonLocal.length }));
if (nonLocal.length) console.log('NONLOCAL ' + nonLocal.slice(0, 5).join(' || '));
for (const [key, list] of Object.entries(groups).sort((a, b) => b[1].length - a[1].length)) {
  console.log(`GROUP ${list.length} ${key}`);
  for (const f of list) console.log('  ' + f.type + ' ' + f.url.replace(origin, '').slice(0, 110));
}
await p.close();
