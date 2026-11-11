// The CPU side of the same clock: camera, director and HUD ask here.
import SCORE from './data/score.yml'
import SHOTS from './data/shots.yml'
import { visionAt, visionShot } from './visions.js'
import { KICK_RUNS } from './trip.js'
import { dealDeck, sceneTime } from './deck.js'
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
  // a vision being joins the scene (stage.js brings it into view): the camera never cuts away to it
  const deal = dealDeck(seed)
  const c = glideIn(t, deal, seed)
  if (!seed) return c
  const side = rollRnd(seed, 1) < 0.5 ? -1 : 1, rs = (rollRnd(seed, 2) < 0.5 ? -1 : 1) * (0.6 + rollRnd(seed, 3) * 0.9)
  const lift = 0.8 + rollRnd(seed, 4) * 0.5, wide = 0.92 + rollRnd(seed, 5) * 0.18
  const y = (v) => 15 + (v - 15) * lift
  return { eye: { x: c.eye.x * side, y: y(c.eye.y), z: c.eye.z }, aim: { x: c.aim.x * side, y: c.aim.y, z: c.aim.z }, fov: c.fov * wide, roll: c.roll * rs }
}
// NO CUTS (lanmower: sudden camera changes break the effect). At a drop the old scene's flight carries on and
// eases into the new scene's over GLIDE seconds, so the new element arrives first and the view follows it in.
const GLIDE = 6
const ss = (x) => { x = Math.min(1, Math.max(0, x)); return x * x * x * (x * (x * 6 - 15) + 10) }
// the stretches of a roll, the opening and the return included, cached per deal (no per-frame garbage)
const SPANS = new WeakMap()
function spans(deal) {
  let sp = SPANS.get(deal); if (sp) return sp
  const last = deal[deal.length - 1].b
  sp = [{ a: 0, b: deal[0].a, src: 0, rate: 1, gi: -1 }, ...deal.map((g, gi) => ({ ...g, gi })), { a: last, b: SCORE.duration + 1, src: last, rate: 1, gi: -1 }]
  SPANS.set(deal, sp); return sp
}
function poseAt(st, g, t, deal, seed) {
  const c = cameraRaw(g.src + (st - g.a) * g.rate)
  return seed && g.gi >= 0 ? shotMove(c, t, deal, seed, g.gi) : c
}
// past its own end a stretch's shot coasts on its last velocity, slowing (it never runs into the next written scene)
const COAST = 1.5
function coast(g, t, deal, seed) {
  const end = g.b - 0.02, h = 0.1
  const p = poseAt(end, g, end, deal, seed), q = poseAt(end - h, g, end - h, deal, seed)
  const k = COAST * (1 - Math.exp(-(t - end) / COAST)) / h
  const v = (A, B) => ({ x: A.x + (A.x - B.x) * k, y: A.y + (A.y - B.y) * k, z: A.z + (A.z - B.z) * k })
  return { eye: v(p.eye, q.eye), aim: v(p.aim, q.aim), fov: p.fov, roll: p.roll }
}
function mixPose(p, q, e) {
  const l = (a, b) => a + (b - a) * e, v = (a, b) => ({ x: l(a.x, b.x), y: l(a.y, b.y), z: l(a.z, b.z) })
  return { eye: v(p.eye, q.eye), aim: v(p.aim, q.aim), fov: l(p.fov, q.fov), roll: l(p.roll, q.roll) }
}
function glideIn(t, deal, seed) {
  const sp = spans(deal)
  let i = sp.findIndex((g) => t >= g.a && t < g.b); if (i < 0) i = sp.length - 1
  const now = poseAt(t, sp[i], t, deal, seed)
  if (i === 0 || t - sp[i].a >= GLIDE) return now
  return mixPose(coast(sp[i - 1], t, deal, seed), now, ss((t - sp[i].a) / GLIDE))
}
// THE SHOT DECK: each drop stretch flies one of five moves over its scene's written path, dealt by the roll:
// 0 as written, 1 a slow orbit round what it looks at, 2 a push in, 3 a pull out, 4 low and looking up.
// The move eases in from nothing at the stretch's start, so the cut on the drop still lands on the written frame.
function shotMove(c, t, deal, seed, gi = deal.findIndex((g) => t >= g.a && t < g.b)) {
  if (gi < 0) return c
  const g = deal[gi], u = Math.min(1, (t - g.a) / (g.b - g.a)), e = u * u * (3 - 2 * u)
  // inside the tunnel, the pupil and the chamber the eye must stay on the axis: only push, pull or as written
  const inside = g.name === 'flight' || g.name === 'deep' || g.name === 'hex'
  const kind = inside ? [0, 2, 3][Math.floor(rollRnd(seed, 30 + gi) * 3)] : Math.floor(rollRnd(seed, 30 + gi) * 5)
  const d = { x: c.eye.x - c.aim.x, y: c.eye.y - c.aim.y, z: c.eye.z - c.aim.z }
  let eye = c.eye, fov = c.fov
  if (kind === 1) {
    const a = (rollRnd(seed, 40 + gi) < 0.5 ? -1 : 1) * 0.9 * e, ca = Math.cos(a), sa = Math.sin(a)
    eye = { x: c.aim.x + d.x * ca - d.z * sa, y: c.eye.y, z: c.aim.z + d.x * sa + d.z * ca }
  } else if (kind === 2) {
    const k = 1 - 0.35 * e; eye = { x: c.aim.x + d.x * k, y: c.aim.y + d.y * k, z: c.aim.z + d.z * k }; fov = c.fov * (1 + 0.1 * e)
  } else if (kind === 3) {
    const k = 1 + 0.4 * e; eye = { x: c.aim.x + d.x * k, y: c.aim.y + d.y * k, z: c.aim.z + d.z * k }; fov = c.fov * (1 - 0.12 * e)
  } else if (kind === 4) {
    eye = { x: c.eye.x, y: c.eye.y - 6 * e, z: c.eye.z }; fov = c.fov * (1 + 0.08 * e)
  }
  return { eye, aim: c.aim, fov, roll: c.roll }
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
