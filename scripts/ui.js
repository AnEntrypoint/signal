// The HUD: a roll button when idle; letterbox, a thin progress line and a cut button while rolling.
import { CINE, cineTime, sectionAt } from './lib/cine.js'
import { dealDeck, sceneTime } from './lib/deck.js'
import { trackOf, CANON } from './lib/tracks.js'

const STYLE = `<style>
@keyframes cine-grow { from { width: 0 } to { width: 100% } }
@keyframes cine-bar { from { height: 0 } to { height: 9vh } }
.cine-top { position:absolute; right:calc(var(--spawn-chrome-reservation-right-inset,50px) + 24px); top:3vh; display:flex; gap:8px; align-items:flex-start; flex-wrap:wrap; justify-content:flex-end }
.cine-line { position:absolute; left:24px; bottom:3vh }
@media (max-width: 640px) { .cine-top { left:12px; right:12px; top:8px; justify-content:flex-start } .cine-line { top:64px; bottom:auto; left:12px; right:12px } }
</style>`

export default function render(ctx, player) {
  const t = cineTime(ctx)
  const key = ctx.world.inputs?.actions?.cine?.label
  if (t == null) {
    return `${STYLE}<div style="position:absolute;left:24px;top:24px;display:flex;gap:12px;align-items:center;font-family:inherit">
      <button onclick="sendAction('cine')" style="pointer-events:auto;background:#07040f;border:1px solid #ff3fb4;color:#ffd0f0;padding:10px 18px;font-size:18px;letter-spacing:.2em;box-shadow:0 0 18px #ff3fb455;cursor:pointer">▶ ROLL${key ? ` <span style="opacity:.6">[${key}]</span>` : ''}</button>
      ${songButton('padding:10px 18px;font-size:18px')}
    </div>`
  }
  // the same text for half a second at a time: the page only restyles when something visibly changes
  const bars = t < 0.6 ? `animation:cine-bar .6s ease-out ${-Math.floor(t * 10) / 10}s forwards` : 'height:9vh'
  const trk = trackOf(ctx.world.state.cine), own = ctx.world.state.cine?.track ? ctx.world.state.cine : null
  const pct = Math.min(100, Math.floor((t / CINE.duration) * 400) / 4)
  return `${STYLE}
    <div style="position:absolute;left:0;right:0;top:0;background:#000;${bars}"></div>
    <div style="position:absolute;left:0;right:0;bottom:0;background:#000;${bars}"></div>
    <div style="position:absolute;left:0;bottom:0;height:2px;background:#ff3fb4;box-shadow:0 0 10px #ff3fb4;width:${pct}%;transition:width .5s linear"></div>
    <div class="cine-line" style="color:#9a8fc0;font-size:12px;letter-spacing:.4em;text-transform:uppercase">${sectionAt(sceneTime(t, dealDeck(ctx.world.state.cine?.seed ?? 0)))}<span style="opacity:.6;letter-spacing:.2em;margin-left:18px;text-transform:none">${own ? `♪ ${esc(own.who)} plays · ` : ''}${esc(trk.name)} · ${trk.bpm} bpm</span></div>
    <div class="cine-top">${songButton('padding:4px 10px;font-size:13px')}<button onclick="sendAction('cine')" style="pointer-events:auto;background:none;border:1px solid #ff3fb466;color:#ff9fdc;padding:4px 10px;font-size:13px;letter-spacing:.2em">↻ NEW ROLL${key ? ` [${key}]` : ''}</button></div>`
}

// ---- PLAY YOUR SONG (buyables.own-track, 50 Spoins) ----
// The player picks an audio file; this browser decodes it and measures it the way tools/analyse-track.py does:
// tempo from the onset autocorrelation, the first beat's phase, then per bar its loudness, bass and highs (0..1).
// Its two climbs into a drop are found where the bass comes back hardest, 32 bars before. The file goes up as
// the player's upload; player.js keeps the measurement on their body and opens the checkout; the purchase
// (scripts/buyables/own-track.js) makes it the room's next roll, heard by everyone.
let SONG = ''   // the line under the button, this machine's
const esc = (x) => String(x ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])
function songButton(style) {
  return `<span style="display:inline-flex;flex-direction:column;gap:4px;${style.includes('absolute') ? style.split(';').filter((r) => /position|right|top/.test(r)).join(';') : ''}">
    <label data-interactive style="pointer-events:auto;cursor:pointer;background:#07040f;border:1px solid #19ff26aa;color:#c8ffcc;letter-spacing:.2em;box-shadow:0 0 14px #19ff2633;${style.split(';').filter((r) => /padding|font-size/.test(r)).join(';')}">♪ PLAY YOUR SONG
      <input type="file" accept="audio/*" onchange="pickSong(this)" style="display:none"></label>
    <span id="own-song-line" style="color:#9fe8a6;font-size:11px;letter-spacing:.12em;max-width:260px">${esc(SONG)}</span></span>`
}
function say(t) { SONG = t; const el = document.getElementById('own-song-line'); if (el) el.textContent = t }

export async function pickSong(input) {
  const file = input.files?.[0]; input.value = ''
  if (!file) return
  if (file.size > 25e6) return say('that file is over 25 MB')
  try {
    say('listening to it…')
    const bytes = await file.arrayBuffer()
    const buf = await new OfflineAudioContext(1, 44100, 44100).decodeAudioData(bytes.slice(0))
    if (buf.duration < 30) return say('songs need to be 30 s or longer')
    if (buf.duration > 900) return say('songs need to be 15 minutes or shorter')
    const m = measure(buf)
    say(`${m.bpm} bpm · uploading…`)
    const up = await window.spawn.assets.upload({ blob: file, name: file.name })
    const name = file.name.replace(/\.[a-z0-9]+$/i, '').slice(0, 60)
    say(`${m.bpm} bpm · ready. pay to play it for the room`)
    sendAction('ownSong', { music: up.url, name, ...m })
  } catch (e) {
    if (e?.code === 'guest_not_allowed') { say('sign in to play your own song'); window.spawn.user.upgradeGuest?.() }
    else if (e?.code === 'rate_limited') say(`too many uploads, try again in ${Math.ceil(e.retryAfterSeconds ?? 30)} s`)
    else say("couldn't read that file as audio")
  }
}

function measure(buf) {
  const sr = buf.sampleRate, hop = Math.round(sr / 100), F = Math.floor(buf.length / hop)   // 100 frames a second
  const chans = []; for (let c = 0; c < buf.numberOfChannels; c++) chans.push(buf.getChannelData(c))
  const all = new Float32Array(F), low = new Float32Array(F), high = new Float32Array(F)
  const aL = 1 - Math.exp((-2 * Math.PI * 150) / sr), aH = 1 - Math.exp((-2 * Math.PI * 4000) / sr)
  let lp = 0, lp2 = 0, i = 0
  for (let f = 0; f < F; f++) {
    let ea = 0, el = 0, eh = 0
    for (let k = 0; k < hop; k++, i++) {
      let x = 0; for (const ch of chans) x += ch[i]; x /= chans.length
      lp += aL * (x - lp); lp2 += aH * (x - lp2)
      ea += x * x; el += lp * lp; const h = x - lp2; eh += h * h
    }
    all[f] = Math.sqrt(ea / hop); low[f] = Math.sqrt(el / hop); high[f] = Math.sqrt(eh / hop)
  }
  // onsets: the rise of log loudness, weighted to the bass where the kick lives
  const on = new Float32Array(F)
  for (let f = 1; f < F; f++) on[f] = Math.max(0, Math.log(1e-4 + low[f]) - Math.log(1e-4 + low[f - 1])) + 0.5 * Math.max(0, Math.log(1e-4 + all[f]) - Math.log(1e-4 + all[f - 1]))
  const at = (x) => { const a = Math.floor(x), b = x - a; return a + 1 < F ? on[a] * (1 - b) + on[a + 1] * b : 0 }
  let best = 120, bs = -1
  for (let bpm = 85; bpm <= 180; bpm += 0.25) {
    const L = 6000 / bpm; let sc = 0
    for (let f = 0; f + L * 2 < F; f += 2) sc += on[f] * (at(f + L) + 0.5 * at(f + 2 * L))
    sc *= 1 + 0.15 * Math.exp(-((bpm - 128) ** 2) / 800)   // a light pull to dance tempo against halving and doubling
    if (sc > bs) { bs = sc; best = bpm }
  }
  const P = 6000 / best
  let ph = 0, ps = -1
  for (let p = 0; p < P; p += 1) { let sc = 0; for (let x = p; x < Math.min(F, 6000 * 60); x += P) sc += at(x); if (sc > ps) { ps = sc; ph = p } }
  const firstBeat = ph / 100, bar = 240 / best, n = Math.max(1, Math.floor((buf.duration - firstBeat) / bar))
  const rows = []
  for (let b = 0; b < n; b++) {
    const a = Math.floor((firstBeat + b * bar) * 100), z = Math.min(F, Math.floor((firstBeat + (b + 1) * bar) * 100))
    let r = 0, l = 0, h = 0; for (let f = a; f < z; f++) { r += all[f]; l += low[f]; h += high[f] }
    const k = Math.max(1, z - a); rows.push([r / k, l / k, h / k])
  }
  const mx = [0, 1, 2].map((j) => Math.max(1e-6, ...rows.map((r) => r[j])))
  const bars = rows.map((r) => r.map((v, j) => Math.round((v / mx[j]) * 100) / 100))
  // the two drops: bars where the bass comes back hardest after a quieter stretch, one in each half
  const D = buf.duration, drop = (lo, hi) => {
    let bi = -1, bv = 0
    for (let b = 4; b < n; b++) { const t = firstBeat + b * bar; if (t < lo || t > hi) continue
      const before = (bars[b - 1][1] + bars[b - 2][1] + bars[b - 3][1] + bars[b - 4][1]) / 4, v = bars[b][1] - before
      if (v > bv) { bv = v; bi = b } }
    return bi < 0 ? null : firstBeat + bi * bar
  }
  const pro = CANON.map((c) => (c / CANON[5]) * D)
  const d1 = drop(D * 0.2, D * 0.55) ?? pro[2], d2 = drop(Math.max(d1 + 32 * bar + 8, D * 0.5), D - 8) ?? pro[4]
  let A = [0, d1 - 32 * bar, d1, d2 - 32 * bar, d2, D]
  if (A.some((x, i) => i && x <= A[i - 1] + 1)) A = [0, Math.max(1, d1 - (pro[2] - pro[1])), d1, Math.max(d1 + 1, d2 - (pro[4] - pro[3])), d2, D]
  if (A.some((x, i) => i && x <= A[i - 1])) A = pro
  const r2 = (x) => Math.round(x * 100) / 100
  return { bpm: r2(best), firstBeat: r2(firstBeat), bar: r2(bar), duration: r2(D), bars, anchors: A.map(r2) }
}
