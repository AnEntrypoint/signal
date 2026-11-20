// THE TRACKS (11-11, lanmower: "the setup must adapt to any music it plays", "add them, go ahead").
// A roll deals one track by its seed. The show is written on ONE canonical clock (score.yml, the fromage track's
// 198 s): sections, deck, shots, vision slots. A track is laid onto that clock by its own measured anchors:
// its start, its two vision windows (32 bars climbing into a drop) and its end land on the canonical ones,
// piecewise linear between them, so every scene still culminates on THIS track's drop. The beat and the kick
// stay the track's own (bpm, first beat, the bars with real bass), never stretched.
// A new track: python3 tools/analyse-track.py in a scratch copy, its energy.yml saved to data/tracks/<id>.yml
// with a duration: line, then one import + one row below.
import SCORE from './data/score.yml'
import ENERGY from './data/energy.yml'
import SUN from './data/tracks/where-the-sun-dont-shine.yml'
import HEAR from './data/tracks/can-you-hear-it.yml'
import META from './data/tracks/metamoist.yml'

const CANON = [0, ENERGY.visions[0][0], ENERGY.visions[0][1], ENERGY.visions[1][0], ENERGY.visions[1][1], SCORE.duration]

// two vision windows of the track: the one starting nearest a quarter in, then the last one after it that ends
// before the track does
function pickVisions(e, dur) {
  const v = e.visions.filter(([a, b]) => b < dur - 4)
  let i = 0
  v.forEach(([a], k) => { if (Math.abs(a - dur * 0.25) < Math.abs(v[i][0] - dur * 0.25)) i = k })
  const later = v.filter(([a], k) => k > i && a >= v[i][1])
  return [v[i], later.length ? later[later.length - 1] : v[i]]
}
function kickRuns(e) {
  const r = []; let a = -1
  e.bars.forEach((b, i) => { const on = b[1] >= 0.6; if (on && a < 0) a = i; if (!on && a >= 0) { r.push([e.firstBeat + a * e.bar, e.firstBeat + i * e.bar]); a = -1 } })
  if (a >= 0) r.push([e.firstBeat + a * e.bar, e.firstBeat + e.bars.length * e.bar])
  return r
}
function make(id, name, e, dur) {
  const [v0, v1] = pickVisions(e, dur)
  const anchors = id === 'fromage' ? CANON.slice() : [0, v0[0], v0[1], v1[0], v1[1], dur]
  const t = { id, name, music: e.track, bpm: e.bpm, firstBeat: e.firstBeat, bar: e.bar, duration: dur, bars: e.bars, anchors }
  t.kicks = kickRuns(e).map(([a, b]) => [toCanon(t, a), toCanon(t, b)])   // canonical seconds, what the shaders compare
  return t
}
export const TRACKS = [
  make('fromage', 'fromage · retro synthwave', ENERGY, SCORE.duration),
  make('sun', 'moonshine · where the sun dont shine', SUN, SUN.duration),
  make('hear', 'moonshine · can you hear it', HEAR, HEAR.duration),
  make('meta', 'moonshine · metamoist', META, META.duration),
]
export const trackFor = (seed) => (seed ? TRACKS[seed % TRACKS.length] : TRACKS[0])
// track seconds -> canonical seconds (and back), piecewise linear through the anchors
export function toCanon(t, s) {
  const A = t.anchors
  for (let i = 0; i < 5; i++) if (s < A[i + 1] || i === 4) return CANON[i] + (Math.min(s, A[i + 1]) - A[i]) * (CANON[i + 1] - CANON[i]) / Math.max(1e-3, A[i + 1] - A[i])
}
// the params every trip shader reads to do the same mapping (tripClock in trip.js); identity = the canonical track
export function trackParams(t) {
  const A = t.anchors
  return { ta1: A[1], ta2: A[2], ta3: A[3], ta4: A[4], tdur: t.duration, fb: t.firstBeat, bps: t.bpm / 60 }
}
export const IDENTITY = trackParams(TRACKS[0])
export { CANON }
// the measured bar of this track at canonical t
export function trackEnergyAt(t, canon) {
  const A = t.anchors; let s = canon
  for (let i = 0; i < 5; i++) if (canon < CANON[i + 1] || i === 4) { s = A[i] + (canon - CANON[i]) * (A[i + 1] - A[i]) / Math.max(1e-3, CANON[i + 1] - CANON[i]); break }
  const b = t.bars[Math.max(0, Math.min(t.bars.length - 1, Math.floor((s - t.firstBeat) / t.bar)))]
  return { rms: b[0], bass: b[1], high: b[2] }
}

// A PLAYER'S OWN SONG (paid, buyables.own-track): world.state.cine.track carries the song the buyer's browser
// measured (ui.js analyseSong): { music, name, bpm, firstBeat, bar, duration, bars: [[rms, bass, high]…], anchors }.
// Every machine builds the same track from that row, so everyone hears it and sees the same show.
let OWN = null
const fin = (x, d) => (Number.isFinite(+x) ? +x : d)
export function ownTrack(u) {
  if (OWN && OWN.music === u.music && OWN.duration === u.duration) return OWN
  const duration = Math.max(30, Math.min(900, fin(u.duration, 198)))
  const bpm = Math.max(60, Math.min(200, fin(u.bpm, 120)))
  let A = Array.isArray(u.anchors) && u.anchors.length === 6 ? u.anchors.map((x) => fin(x, 0)) : null
  if (!A || A.some((x, i) => i && x <= A[i - 1]) || A[5] > duration + 0.01) A = CANON.map((c) => (c / CANON[5]) * duration)
  A[0] = 0; A[5] = duration
  const bars = Array.isArray(u.bars) && u.bars.length ? u.bars : [[0.5, 0.5, 0.5]]
  const t = { id: 'own', name: String(u.name ?? 'your song').slice(0, 60), music: String(u.music), bpm: Math.round(bpm * 100) / 100,
    firstBeat: fin(u.firstBeat, 0), bar: 240 / bpm, duration, bars, anchors: A }
  t.kicks = kickRuns(t).map(([a, b]) => [toCanon(t, a), toCanon(t, b)])
  return (OWN = t)
}
// the track this roll plays: the player's own song when one was paid for, else the one its seed deals
export const trackOf = (c) => (c?.track?.music ? ownTrack(c.track) : trackFor(c?.seed ?? 0))
