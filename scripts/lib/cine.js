// Shared reading of the shot list: the camera, the stage, the HUD all ask the same clock.
import CINE from './data/cinematic.yml'
export { CINE }

// Seconds into the roll, or null when nothing is rolling.
export function cineTime(ctx) {
  const c = ctx.world.state.cine
  if (!c) return null
  const t = (ctx.now() - c.start) / 1000
  return t >= 0 && t < CINE.duration ? t : null
}

function cr(p0, p1, p2, p3, u) {
  const u2 = u * u, u3 = u2 * u
  return 0.5 * (2 * p1 + (-p0 + p2) * u + (2 * p0 - 5 * p1 + 4 * p2 - p3) * u2 + (-p0 + 3 * p1 - 3 * p2 + p3) * u3)
}
function segment(t) {
  const k = CINE.keys
  let i = 0
  while (i < k.length - 2 && t >= k[i + 1].t) i++
  const u = Math.min(1, Math.max(0, (t - k[i].t) / (k[i + 1].t - k[i].t)))
  return { i, u }
}
export function shotAt(t) { return CINE.keys[segment(t).i] }

// The camera at t: a smooth spline through every key.
export function cameraAt(t) {
  const k = CINE.keys
  const { i, u } = segment(t)
  const a = k[Math.max(0, i - 1)], b = k[i], c = k[i + 1], d = k[Math.min(k.length - 1, i + 2)]
  const pt = (f) => ({ x: cr(a[f][0], b[f][0], c[f][0], d[f][0], u), y: cr(a[f][1], b[f][1], c[f][1], d[f][1], u), z: cr(a[f][2], b[f][2], c[f][2], d[f][2], u) })
  const eye = pt('eye'); eye.y = Math.max(0.4, eye.y)
  const s = u * u * (3 - 2 * u)
  return { eye, aim: pt('aim'), fov: b.fov + (c.fov - b.fov) * s }
}

export function titleAt(t) {
  if (t == null) return CINE.idleTitle
  let line = ''
  for (const r of CINE.titles) if (t >= r.t) line = r.text
  return line
}

// 0..1, a kick on every beat that fades before the next.
export function beatEnv(seconds, phase = 0) {
  const b = seconds * CINE.bpm / 60 - phase
  return Math.exp(-(b - Math.floor(b)) * 5)
}
