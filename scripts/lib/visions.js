// THE VISION DECK: celestial beings, each alone in its own patch of black high above the field.
// A roll deals one being into each of ENERGY.visions: the 8-bar phrase that ends where the measured track
// drops to bass. The being builds as the highs climb (shader: c.high, visionU) and is cut away on the drop. The same deal on every machine:
// the camera (cine.js) flies to the dealt being; the director (stage.js) hands each being's objects
// params.vw0 / params.vw1 = its slot [from, to] in seconds (-1, -1 = not dealt this roll), and
// its shaders show it only then (trip.js visionShown).
import ENERGY from './data/energy.yml' // the track measured bar by bar (tools/analyse-track.py)

// id: the tag every object of that being wears ("vision" + this id). centre: the being's middle.
// The shot: eye at centre + (0, 0, 64) creeping to + (0, 0, 46) across the slot, aim at centre, fov 42:
// the frame holds about 40 m tall by 70 m wide around the centre. Everything faces +Z.
export const BEINGS = [
  { id: 'sun-father',     name: 'the sun father' },
  { id: 'moon-mother',    name: 'the moon mother' },
  { id: 'contour-oracle', name: 'the contour oracle' },
  { id: 'many-armed',     name: 'the many-armed one' },
  { id: 'ouroboros',      name: 'the ouroboros' },
  { id: 'thunderbird',    name: 'the winged eye' },
  { id: 'world-tree',     name: 'the world tree' },
  { id: 'giving-hands',   name: 'the giving hands' },
  { id: 'star-jelly',     name: 'the star medusa' },
  { id: 'star-child',     name: 'the star child' },
].map((b, k) => ({ ...b, k, centre: { x: 0, y: 320 + k * 100, z: 0 } }))

function rnd(seed, n) { const x = Math.sin((seed + 1) * (n * 7.1234 + 3.1)) * 15731.743; return x - Math.floor(x) }

// [{ slot: [a, b], being }] for this roll; [] when idle (seed 0).
export function dealVisions(seed) {
  if (!seed) return []
  const order = BEINGS.map((b) => ({ b, r: rnd(seed, 40 + b.k) })).sort((p, q) => p.r - q.r).map((p) => p.b)
  return ENERGY.visions.map((slot, i) => ({ slot, being: order[i] }))
}
export function visionAt(t, seed) {
  for (const v of dealVisions(seed)) if (t >= v.slot[0] && t < v.slot[1]) return v
  return null
}
// The camera inside a vision: a slow creep straight in, a slight seeded roll, a breath of fov.
export function visionShot(v, t, seed) {
  const u = (t - v.slot[0]) / (v.slot[1] - v.slot[0])
  const e = u * u * (3 - 2 * u), c = v.being.centre
  const roll = (rnd(seed, 60 + v.being.k) - 0.5) * 16 * e
  return { eye: { x: c.x, y: c.y, z: c.z + 64 - 18 * e }, aim: { x: c.x, y: c.y, z: c.z }, fov: 42, roll }
}

// the measured bar at t: { rms, bass, high } 0..1 (CPU side: the HUD, the camera)
export function energyAt(t) {
  const i = Math.floor((t - ENERGY.firstBeat) / ENERGY.bar), b = ENERGY.bars[Math.max(0, Math.min(ENERGY.bars.length - 1, i))]
  return { rms: b[0], bass: b[1], high: b[2] }
}
