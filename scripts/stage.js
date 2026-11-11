// The director: starts the track on the shared clock and hands every trip shader the roll's start.
// Nothing here moves per tick: the motion lives in the shaders (scripts/lib/trip.js).
import { SCORE, cineTime } from './lib/cine.js'

function push(ctx, t0, on) {
  for (const o of ctx.query({ tags: ['trip'] })) {
    const h = ctx.getObject(o.id)
    if (h?.material?.params) { h.material.params.t0 = t0; h.material.params.on = on }
  }
  const a = ctx.place.atmosphere
  if (a.look) { a.look.params ??= {}; a.look.params.t0 = t0; a.look.params.on = on }
  a.sky ??= {}; a.sky.params ??= {}; a.sky.params.t0 = t0; a.sky.params.on = on
}

export function update(ctx, dt) {
  const t = cineTime(ctx)
  const c = ctx.world.state.cine
  const key = t != null ? c.start : 0
  if (ctx.self.session.key !== key || (ctx.self.session.n ?? 0) < 3) {
    // written a few ticks running so late-built materials get it too
    ctx.self.session.n = ctx.self.session.key === key ? (ctx.self.session.n ?? 0) + 1 : 0
    ctx.self.session.key = key
    push(ctx, t != null ? (c.start / 1000) % 3600 : 0, t != null ? 1 : 0)
  }
  if (t != null && ctx.self.state.track !== c.start) {
    ctx.self.state.track = c.start
    ctx.self.audio = { clip: SCORE.music, spatial: false, gain: 0.8, bus: 'Music', time: 0, timeAt: c.start }
  } else if (t == null && ctx.self.state.track) {
    ctx.self.state.track = null
    ctx.self.audio = null
    if (c) ctx.world.state.cine = null
  }
  ctx.sleep(0.25)
}
