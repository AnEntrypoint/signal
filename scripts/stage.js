// The director: starts the track on the shared clock and hands every trip shader the roll's start.
// Nothing here moves per tick: the motion lives in the shaders (scripts/lib/trip.js).
import { SCORE, cineTime } from './lib/cine.js'
import { BEINGS, dealVisions } from './lib/visions.js'

function push(ctx, t0, on, seed) {
  for (const o of ctx.query({ tags: ['trip'] })) {
    const h = ctx.getObject(o.id)
    if (h?.material?.params) { h.material.params.t0 = t0; h.material.params.on = on; h.material.params.seed = seed }
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
  const a = ctx.place.atmosphere
  if (a.look) { a.look.params ??= {}; a.look.params.t0 = t0; a.look.params.on = on; a.look.params.seed = seed }
}

export function update(ctx, dt) {
  const t = cineTime(ctx)
  const c = ctx.world.state.cine
  const key = t != null ? c.start : 0
  if (ctx.self.session.key !== key || (ctx.self.session.n ?? 0) < 3) {
    // written a few ticks running so late-built materials get it too
    ctx.self.session.n = ctx.self.session.key === key ? (ctx.self.session.n ?? 0) + 1 : 0
    ctx.self.session.key = key
    push(ctx, t != null ? (c.start / 1000) % 3600 : 0, t != null ? 1 : 0, t != null ? (c.seed ?? 0) : 0)
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
  ctx.sleep(0.25)
}
