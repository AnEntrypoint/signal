// The CPU side of the same clock: camera, director and HUD ask here.
import SCORE from './data/score.yml'
import SHOTS from './data/shots.yml'
import { visionAt, visionShot } from './visions.js'
import { KICK_RUNS } from './trip.js'
export { SCORE, SHOTS }
export const CINE = { duration: SCORE.duration, bpm: SCORE.bpm, music: SCORE.music, keys: SHOTS.keys }

// Seconds into the roll, or null when nothing is rolling.
export function cineTime(ctx) {
  const c = ctx.world.state.cine
  if (!c) return null
  const t = (ctx.now() - c.start) / 1000
  return t >= 0 && t < SCORE.duration ? t : null
}
export function sectionAt(t) {
  for (const name in SCORE.sections) { const [a, b] = SCORE.sections[name]; if (t >= a && t < b) return name }
  return ''
}
function cr(p0, p1, p2, p3, u) {
  const u2 = u * u, u3 = u2 * u
  return 0.5 * (2 * p1 + (-p0 + p2) * u + (2 * p0 - 5 * p1 + 4 * p2 - p3) * u2 + (-p0 + 3 * p1 - 3 * p2 + p3) * u3)
}
function segment(t) {
  const k = SHOTS.keys
  let i = 0
  while (i < k.length - 2 && t >= k[i + 1].t) i++
  const u = Math.min(1, Math.max(0, (t - k[i].t) / (k[i + 1].t - k[i].t)))
  return { i, u }
}
// The camera at t: a spline through the keys; a key with cut: true starts a new shot (no glide into it).
// A roll's own number 0..1 per channel n, the CPU twin of trip.js c.rnd (not the same values, the same idea).
export function rollRnd(seed, n) { const x = Math.sin((seed + 1) * (n * 12.9898 + 78.233)) * 43758.5453; return x - Math.floor(x) }
// The roll's seed varies the flight without leaving the axis: which side the orbits pass, the roll's sense and
// size, how high the rises go, how wide the lens opens. Seed 0 (idle, old rolls) is the path as written.
export function cameraAt(t, seed = 0) {
  const v = visionAt(t, seed)
  if (v) return visionShot(v, t, seed) // a vision: hard cut to the dealt being on the phrase line, back on the next
  const c = cameraRaw(t)
  if (!seed) return c
  const side = rollRnd(seed, 1) < 0.5 ? -1 : 1, rs = (rollRnd(seed, 2) < 0.5 ? -1 : 1) * (0.6 + rollRnd(seed, 3) * 0.9)
  const lift = 0.8 + rollRnd(seed, 4) * 0.5, wide = 0.92 + rollRnd(seed, 5) * 0.18
  const y = (v) => 15 + (v - 15) * lift
  return { eye: { x: c.eye.x * side, y: y(c.eye.y), z: c.eye.z }, aim: { x: c.aim.x * side, y: c.aim.y, z: c.aim.z }, fov: c.fov * wide, roll: c.roll * rs }
}
function cameraRaw(t) {
  const k = SHOTS.keys
  const { i, u } = segment(t)
  const b = k[i], c = k[i + 1]
  const a = i > 0 && !b.cut ? k[i - 1] : b
  const d = i + 2 < k.length && !k[i + 2].cut ? k[i + 2] : c
  if (c.cut) return { eye: { x: b.eye[0], y: b.eye[1], z: b.eye[2] }, aim: { x: b.aim[0], y: b.aim[1], z: b.aim[2] }, fov: b.fov, roll: b.roll ?? 0 }
  const e = b.ease === 'linear' ? u : u * u * (3 - 2 * u)
  const pt = (f) => ({ x: cr(a[f][0], b[f][0], c[f][0], d[f][0], e), y: cr(a[f][1], b[f][1], c[f][1], d[f][1], e), z: cr(a[f][2], b[f][2], c[f][2], d[f][2], e) })
  return { eye: pt('eye'), aim: pt('aim'), fov: b.fov + (c.fov - b.fov) * e, roll: (b.roll ?? 0) + ((c.roll ?? 0) - (b.roll ?? 0)) * e }
}
export function beatEnv(seconds) {
  const b = (seconds - SCORE.firstBeat) * SCORE.bpm / 60
  return !KICK_RUNS.some(([a, b]) => seconds >= a && seconds < b) ? 0 : Math.exp(-(b - Math.floor(b)) * 4.5)
}
