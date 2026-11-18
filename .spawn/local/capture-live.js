
const fs = require('fs');
const crypto = require('crypto');
const OUT = '/tmp/verify/live-capture';
const LIVE = 'https://www.spawn.co/@lanmower/signal-stage@dev';
const KEEP = /play\.spawn\.co\/(v4\/client\/pool\/|world-store\/)/;
fs.mkdirSync(OUT, { recursive: true });
const sha = (b) => crypto.createHash('sha256').update(b).digest('hex');
const records = [];
const pending = [];
let seq = 0;
const handle = async (res) => {
  const url = res.url();
  if (!KEEP.test(url)) return;
  const req = res.request();
  const status = res.status();
  const headers = await res.allHeaders().catch(() => ({}));
  const rec = { seq: ++seq, url, method: req.method(), status, content_type: headers['content-type'] || '', page: res.frame() ? res.frame().url().slice(0, 160) : '' };
  if (req.method() === 'POST') {
    const reqBody = req.postDataBuffer();
    if (reqBody) { rec.request_sha256 = sha(reqBody); fs.writeFileSync(OUT + '/req-' + rec.seq + '.bin', reqBody); }
  }
  if (status === 200) {
    const body = await res.body().catch(() => null);
    if (body) { rec.size = body.length; rec.sha256 = sha(body); rec.file = OUT + '/' + rec.sha256 + '.bin'; fs.writeFileSync(rec.file, body); }
  }
  records.push(rec);
};
context.on('response', (res) => { pending.push(handle(res)); });
context.on('requestfailed', (r) => { if (KEEP.test(r.url())) records.push({ url: r.url(), method: r.method(), failed: r.failure() ? r.failure().errorText : 'failed' }); });
const page = await context.newPage();
await page.setViewportSize({ width: 1280, height: 800 });
await page.goto(LIVE, { waitUntil: 'commit', timeout: 120000 }).catch((e) => records.push({ navError: String(e.message).slice(0, 200) }));
const shown = await page.waitForSelector('html.spawn-world-shown', { timeout: 150000 }).then(() => true).catch(() => false);
await new Promise((r) => setTimeout(r, 20000));
let settled = 0;
while (settled < pending.length) { settled = pending.length; await Promise.allSettled(pending); await new Promise((r) => setTimeout(r, 2000)); }
fs.writeFileSync(OUT + '/index.json', JSON.stringify({ live: LIVE, shown, records }, null, 1));
const target = records.filter((r) => /73cfc540|2dc8f05b/.test(r.url || '')).map((r) => [r.url, r.status, r.size || 0, r.sha256 || r.failed || '']);
console.log(JSON.stringify({ shown, records: records.length, pool200: records.filter((r) => /pool/.test(r.url || '') && r.status === 200).length, target }));
await page.close();
