// The director: starts the track on the shared clock and hands every trip shader the roll's start.
// Nothing here moves per tick: the motion lives in the shaders (scripts/lib/trip.js).
import { SCORE, cineTime, cameraAt } from './lib/cine.js'
import { BEINGS, dealVisions } from './lib/visions.js'
import { KICK_RUNS } from './lib/trip.js'
import { dealDeck } from './lib/deck.js'

// the kick run that holds t, else the next one: [k0, k1] seconds; [-1, -1] idle or past the last
function kickRun(t) {
  if (t == null) return [-1, -1]
  for (const r of KICK_RUNS) if (t < r[1]) return r
  return [-1, -1]
}

function setAll(p, t0, on, seed, k, deal) {
  p.t0 = t0; p.on = on; p.seed = seed; p.k0 = k[0]; p.k1 = k[1]
  deal.forEach((g, i) => { p['ds' + i] = g.src; p['dr' + i] = g.rate })
}
function push(ctx, t0, on, seed, k, vs, t = cineTime(ctx)) {
  const deal = dealDeck(on ? seed : 0)
  for (const o of ctx.query({ tags: ['trip'] })) {
    const h = ctx.getObject(o.id)
    if (h?.material?.params) setAll(h.material.params, t0, on, seed, k, deal)
  }
  // each vision being learns its slot this roll: params.vw0 / vw1 seconds, -1 when not dealt
  const dealt = {}
  for (const v of dealVisions(on ? seed : 0)) dealt[v.being.id] = v.slot
  for (const b of BEINGS) {
    const w = dealt[b.id] ?? [-1, -1]
    for (const o of ctx.query({ tags: ['vision-' + b.id] })) {
      const h = ctx.getObject(o.id)
      if (h?.material?.params) { h.material.params.vw0 = w[0]; h.material.params.vw1 = w[1] }
    }
  }
  stageBeing(ctx, vs, on ? seed : 0, t)
  const a = ctx.place.atmosphere
  if (a.look) { a.look.params ??= {}; setAll(a.look.params, t0, on, seed, k, deal); a.look.params.v0 = vs[0]; a.look.params.v1 = vs[1] }
}

// THE BEING ON STAGE: the dealt being of the slot now playing (or next) rides the camera's view at depth, so it
// draws itself in among the running scene; the scene keeps moving round and through it. Every other being goes
// home to its black above the field and stops drawing.
const DEPTH = 74
// a being's scene, far to near: -world (its ground and sky, fills the frame) / -ring / the being / -veil / -fore
function homeZ(id) { return id.endsWith('-world') ? -30 : id.endsWith('-ring') ? -12 : id.endsWith('-veil') ? 10 : id.endsWith('-fore') ? 22 : 0 }
function stageBeing(ctx, vs, seed, t) {
  // only from 3 s before its slot: earlier, the next being hung cropped over black ~30 s ahead (review, seed 23)
  const cur = seed && t != null && t >= vs[0] - 3 ? dealVisions(seed).find((v) => v.slot[0] === vs[0]) : null
  for (const b of BEINGS) {
    const here = cur && cur.being.id === b.id
    for (const o of ctx.query({ tags: ['vision-' + b.id] })) {
      const h = ctx.getObject(o.id); if (!h) continue
      const z = homeZ(o.id)
      if (ctx.world.state.visionTest?.being === b.id) continue
      if (here) { const f = ctx.self.session.fit ?? 1; h.feetPosition = { attach: 'camera', x: 0, y: 0, depth: (DEPTH - z) * f }; h.scale = f }
      else if (h.feetPosition?.attach || h.visible !== false) { h.feetPosition = { x: 0, y: b.centre.y, z }; h.scale = 1 }
      h.visible = !!here
    }
  }
}
// TEST HOLD (savi's bench): world.state.visionTest = { being, at, seed } stands that being whole at its home,
// its 24 s slot starting at ctx.now() == at, so a camera at centre + (0, 0, 64) watches it build. The roll is untouched.
function holdTest(ctx, vt) {
  const b = BEINGS.find((x) => x.id === vt.being); if (!b) return
  for (const o of ctx.query({ tags: ['vision-' + b.id] })) {
    const h = ctx.getObject(o.id); if (!h) continue
    const p = h.material?.params
    const t0 = (vt.at / 1000) % 3600
    // the whole params row is written, and only when it moves: a second bench hold of the same being used to keep the first one's clock
    if (p && (p.t0 !== t0 || p.on !== 1 || p.vw1 !== 24)) h.material.params = { ...p, t0, on: 1, seed: vt.seed ?? 23, vw0: 0, vw1: 24, k0: 0, k1: 24 }
    h.feetPosition = { x: 0, y: b.centre.y, z: homeZ(o.id) }
    h.visible = true
  }
}
export function update(ctx, dt) {
  const vt = ctx.world.state.visionTest
  if (vt) { holdTest(ctx, vt); if (ctx.now() - vt.at > 30000) ctx.world.state.visionTest = null }
  const t = cineTime(ctx)
  const c = ctx.world.state.cine
  const k = kickRun(t)
  // the vision slot that holds t, else the next one this roll: the look stands still inside it
  let vs = [-1, -1]
  if (t != null) for (const v of dealVisions(c.seed ?? 0)) if (t < v.slot[1]) { vs = v.slot; break }
  const key = (t != null ? c.start : 0) + ':' + k[0] + ':' + vs[0]   // a new roll or the next kick run: push again
  if (ctx.self.session.key !== key || (ctx.self.session.n ?? 0) < 3) {
    // written a few ticks running so late-built materials get it too
    ctx.self.session.n = ctx.self.session.key === key ? (ctx.self.session.n ?? 0) + 1 : 0
    ctx.self.session.key = key
    push(ctx, t != null ? (c.start / 1000) % 3600 : 0, t != null ? 1 : 0, t != null ? (c.seed ?? 0) : 0, k, vs)
  }
  if (t != null && ctx.self.state.track !== c.start) {
    ctx.self.state.track = c.start
    ctx.self.audio = { clip: SCORE.music, spatial: false, gain: 0.8, bus: 'Music', time: 0, timeAt: c.start }
  } else if (t == null && ctx.self.state.track) {
    ctx.self.state.track = null
    ctx.self.audio = null
  }
  // the trip always plays: no roll standing (or the last one over) -> deal the next, 2 s out so every machine starts together
  if (t == null && (!c || ctx.now() - c.start > SCORE.duration * 1000)) {
    ctx.world.state.cine = { start: ctx.now() + 2000, by: 'stage', seed: Math.floor(ctx.random() * 9973) + 1 }
  }
  // the being's whole scene stands in front of what the camera looks at: when the shot's subject comes nearer than
  // the being's far layer, every layer comes in by the same factor and grows by it, so it reads the same size on
  // screen and nothing on the stage (the central eye) ever slices through it
  if (t != null && vs[0] >= 0 && t >= vs[0] - 1) {
    const cam = cameraAt(t, c.seed ?? 0)
    const d = Math.hypot(cam.aim.x - cam.eye.x, cam.aim.y - cam.eye.y, cam.aim.z - cam.eye.z)
    const fit = Math.round(Math.max(0.15, Math.min(1, (0.9 * d) / (DEPTH + 30))) * 100) / 100
    if (fit !== ctx.self.session.fit) { ctx.self.session.fit = fit; stageBeing(ctx, vs, c.seed ?? 0, t) }
  }
  ctx.sleep(0.25)
}
