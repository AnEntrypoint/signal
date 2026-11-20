// The director: starts the track on the shared clock and hands every trip shader the roll's start.
// Nothing here moves per tick: the motion lives in the shaders (scripts/lib/trip.js).
import { SCORE, cineTime, cameraAt } from './lib/cine.js'
import { trackOf, trackParams, IDENTITY } from './lib/tracks.js'
import { BEINGS, dealVisions } from './lib/visions.js'
import { dealDeck } from './lib/deck.js'
import ROWS from './lib/data/beings.yml'

// A BEING'S ROWS: built for the roll that deals it, struck when the roll moves on. A being whose rows still stand in
// the scene files is left as it stands (state.staged marks the ones built here).
const BLANK = { k0: -1, k1: -1, on: 0, seed: 0, t0: 0, vw0: -1, vw1: -1 }
function ensure(ctx, b) {
  if (!ROWS[b.id] || ctx.query({ tags: ['vision-' + b.id] }).length) return
  for (const r of ROWS[b.id]) ctx.spawn('vision-' + b.id + r.s, { tags: ['trip', 'vision-' + b.id], castShadow: false, receiveShadow: false, visible: false, feetPosition: { x: 0, y: b.centre.y, z: r.z }, primitive: { kind: 'scripted', script: 'scripts/vision-' + r.g + '-geo.js', params: r.p }, material: { kind: 'scripted', script: 'scripts/vision-' + r.m + '-mat.js', params: { ...BLANK, ...r.mp } }, state: { staged: true } })
}
function strike(ctx, b) {
  for (const o of ctx.query({ tags: ['vision-' + b.id] })) if (o.state?.staged) ctx.destroy(o.id)
}

// the kick run that holds t, else the next one: [k0, k1] seconds; [-1, -1] idle or past the last
function kickRun(t, c) {
  if (t == null) return [-1, -1]
  for (const r of trackOf(c).kicks) if (t < r[1]) return r
  return [-1, -1]
}

function setAll(p, t0, on, seed, k, deal, tr) {
  p.t0 = t0; p.on = on; p.seed = seed; p.k0 = k[0]; p.k1 = k[1]
  Object.assign(p, on ? trackParams(tr) : IDENTITY)
  deal.forEach((g, i) => { p['ds' + i] = g.src; p['dr' + i] = g.rate })
}
function push(ctx, t0, on, seed, k, vs, t = cineTime(ctx)) {
  const deal = dealDeck(on ? seed : 0)
  const tr = trackOf(ctx.world.state.cine)
  // a bench-held being keeps its own clock: the roll's push used to fight holdTest's, a frame of black each time
  const held = holds(ctx), isHeld = (o) => o.tags?.some((g) => g.startsWith('vision-') && held[g.slice(7)])
  for (const o of ctx.query({ tags: ['trip'] })) {
    if (isHeld(o)) continue
    const h = ctx.getObject(o.id)
    if (h?.material?.params) setAll(h.material.params, t0, on, seed, k, deal, tr)
  }
  // each vision being learns its slot this roll: params.vw0 / vw1 seconds, -1 when not dealt
  const dealt = {}
  for (const v of dealVisions(on ? seed : 0)) dealt[v.being.id] = v.slot
  for (const b of BEINGS) { if (dealt[b.id] || held[b.id]) ensure(ctx, b); else strike(ctx, b) }
  for (const b of BEINGS) {
    if (held[b.id]) continue
    const w = dealt[b.id] ?? [-1, -1]
    for (const o of ctx.query({ tags: ['vision-' + b.id] })) {
      const h = ctx.getObject(o.id)
      if (h?.material?.params) { const p = h.material.params; p.vw0 = w[0]; p.vw1 = w[1]; Object.assign(p, on ? trackParams(tr) : IDENTITY) }
    }
  }
  stageBeing(ctx, vs, on ? seed : 0, t)
  const a = ctx.place.atmosphere
  if (a.look) { a.look.params ??= {}; setAll(a.look.params, t0, on, seed, k, deal, tr); a.look.params.v0 = vs[0]; a.look.params.v1 = vs[1]; a.look.params.vd = DEPTH * (ctx.self.session.fit ?? 1) }
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
  const hd = holds(ctx)
  for (const b of BEINGS) {
    const here = cur && cur.being.id === b.id
    for (const o of ctx.query({ tags: ['vision-' + b.id] })) {
      const h = ctx.getObject(o.id); if (!h) continue
      const z = homeZ(o.id)
      if (hd[b.id]) continue
      if (here) { const f = ctx.self.session.fit ?? 1; h.feetPosition = { attach: 'camera', x: 0, y: 0, depth: (DEPTH - z) * f }; h.scale = f }
      else if (h.feetPosition?.attach || h.visible !== false) { h.feetPosition = { x: 0, y: b.centre.y, z }; h.scale = 1 }
      h.visible = !!here
    }
  }
}
// TEST HOLD (savi's bench): world.state.visionTest = { being, at, seed } stands that being whole at its home,
// its 24 s slot starting at ctx.now() == at, so a camera at centre + (0, 0, 64) watches it build. The roll is untouched.
// every hold now standing: { [being]: { at, seed } }. world.state.visionTests[being] = { at, seed } holds many at once
// (one per helper); the old single world.state.visionTest = { being, at, seed } still works.
function holds(ctx) {
  const m = { ...(ctx.world.state.visionTests ?? {}) }, vt = ctx.world.state.visionTest
  if (vt?.being) m[vt.being] = vt
  return m
}
function holdTest(ctx, vt) {
  const b = BEINGS.find((x) => x.id === vt.being); if (!b) return
  ensure(ctx, b)
  for (const o of ctx.query({ tags: ['vision-' + b.id] })) {
    const h = ctx.getObject(o.id); if (!h) continue
    const p = h.material?.params
    const t0 = (vt.at / 1000) % 3600
    // the whole params row is written, and only when it moves: a second bench hold of the same being used to keep the first one's clock
    if (p && (p.t0 !== t0 || p.on !== 1 || p.vw1 !== 24)) h.material.params = { ...p, ...IDENTITY, t0, on: 1, seed: vt.seed ?? 23, vw0: 0, vw1: 24, k0: 0, k1: 24 }
    h.feetPosition = { x: 0, y: b.centre.y, z: homeZ(o.id) }
    h.visible = true
  }
}
export function update(ctx, dt) {
  const vt = ctx.world.state.visionTest
  if (vt) { holdTest(ctx, vt); if (ctx.now() - vt.at > 30000) ctx.world.state.visionTest = null }
  const vts = ctx.world.state.visionTests
  if (vts) for (const id in vts) { const h = vts[id]; if (!h) continue; holdTest(ctx, { ...h, being: id }); if (ctx.now() - h.at > 30000) { const n = { ...vts }; delete n[id]; ctx.world.state.visionTests = n } }
  const t = cineTime(ctx)
  const c = ctx.world.state.cine
  const k = kickRun(t, c)
  // the vision slot that holds t, else the next one this roll: the look stands still inside it
  let vs = [-1, -1]
  if (t != null) for (const v of dealVisions(c.seed ?? 0)) if (t < v.slot[1]) { vs = v.slot; break }
  const key = (t != null ? c.start + (c.track?.music ?? '') : 0) + ':' + k[0] + ':' + vs[0]   // a new roll or the next kick run: push again
  if (ctx.self.session.key !== key || (ctx.self.session.n ?? 0) < 3) {
    // written a few ticks running so late-built materials get it too
    ctx.self.session.n = ctx.self.session.key === key ? (ctx.self.session.n ?? 0) + 1 : 0
    ctx.self.session.key = key
    push(ctx, t != null ? (c.start / 1000) % 3600 : 0, t != null ? 1 : 0, t != null ? (c.seed ?? 0) : 0, k, vs)
  }
  if (t != null && ctx.self.state.track !== c.start) {
    ctx.self.state.track = c.start
    ctx.self.audio = { clip: trackOf(c).music, spatial: false, gain: 0.8, bus: 'Music', time: 0, timeAt: c.start }
  } else if (t == null && ctx.self.state.track) {
    ctx.self.state.track = null
    ctx.self.audio = null
  }
  // the trip always plays: no roll standing (or the last one over) -> deal the next, 2 s out so every machine starts together
  if (t == null && (!c || ctx.now() - c.start > trackOf(c).duration * 1000)) {
    ctx.world.state.cine = { start: ctx.now() + 2000, by: 'stage', seed: Math.floor(ctx.random() * 9973) + 1 }
  }
  // the being's whole scene stands in front of what the camera looks at: when the shot's subject comes nearer than
  // the being's far layer, every layer comes in by the same factor and grows by it, so it reads the same size on
  // screen and nothing on the stage (the central eye) ever slices through it
  if (t != null && vs[0] >= 0 && t >= vs[0] - 1) {
    const cam = cameraAt(t, c.seed ?? 0)
    const d = Math.hypot(cam.aim.x - cam.eye.x, cam.aim.y - cam.eye.y, cam.aim.z - cam.eye.z)
    const fit = Math.round(Math.max(0.15, Math.min(1, (0.9 * d) / (DEPTH + 30))) * 100) / 100
    if (fit !== ctx.self.session.fit) { ctx.self.session.fit = fit; stageBeing(ctx, vs, c.seed ?? 0, t); const lk = ctx.place.atmosphere.look; if (lk?.params) lk.params.vd = DEPTH * fit } // the look's focus plane: the being's real depth (its additive layers write no depth)
  }
  ctx.sleep(0.25)
}
