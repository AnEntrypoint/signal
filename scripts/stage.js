// The director: one object moves every shape on the stage, plays the track and sets the title.
// Shapes carry state.motion: { spin: [x, y, z] deg/s, pulse: amount, phase: beats, orbit: { r, speed, y, phase } }.
import { CINE, cineTime, titleAt, beatEnv } from './lib/cine.js'

export function update(ctx, dt) {
  const t = cineTime(ctx)
  const rolling = t != null
  const ses = ctx.self.session
  // the stage runs faster while the camera rolls
  ses.rate = (ses.rate ?? 1) + ((rolling ? 2.4 : 1) - (ses.rate ?? 1)) * (1 - Math.exp(-3 * dt))
  ses.clock = (ses.clock ?? 0) + dt * ses.rate
  const beatClock = rolling ? t : ctx.now() / 1000
  const amp = rolling ? 1 : 0.35

  // the track: one row everyone hears from the same playhead
  const c = ctx.world.state.cine
  if (rolling && ctx.self.state.track !== c.start) {
    ctx.self.state.track = c.start
    ctx.self.audio = { clip: CINE.music, spatial: false, gain: 0.7, bus: 'Music', time: 0, timeAt: c.start }
  } else if (!rolling && ctx.self.state.track) {
    ctx.self.state.track = null
    ctx.self.audio = null
  }

  const title = ctx.getObject('title')
  const line = titleAt(t)
  if (title && title.state.line !== line) title.state.line = line

  for (const o of ctx.query({ tags: ['mg'] })) {
    const m = o.state.motion
    if (!m) continue
    if (m.spin) {
      const s = ses.clock
      o.rotation = { pitch: (m.base?.[0] ?? 0) + m.spin[0] * s, yaw: (m.base?.[1] ?? 0) + m.spin[1] * s, roll: (m.base?.[2] ?? 0) + m.spin[2] * s }
    }
    if (m.pulse) {
      const k = 1 + m.pulse * amp * beatEnv(beatClock, m.phase ?? 0)
      o.scale = (m.size ?? 1) * k
    }
    if (m.orbit) {
      const a = m.orbit.phase + ses.clock * m.orbit.speed
      o.feetPosition = { x: Math.cos(a) * m.orbit.r, y: m.orbit.y + Math.sin(a * 2) * 0.6, z: Math.sin(a) * m.orbit.r }
    }
  }
}
