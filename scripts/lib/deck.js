// THE SCENE DECK: a roll deals one scene to each stretch between two drops of the measured track, and that
// scene holds the whole stretch, stretched or tightened to fit (scene time runs at `rate`). The opening (seed)
// and the return stay where they are. Same deal on every machine: it is the roll's seed.
// Shaders get it as params ds0..ds3 (scene start) / dr0..dr3 (rate) from the director (stage.js).
import SCORE from './data/score.yml'
const D = SCORE.deck, S = SCORE.sections
function rnd(seed, n) { const x = Math.sin((seed + 1) * (n * 9.137 + 1.7)) * 24634.6345; return x - Math.floor(x) }
// [{ a, b, src, rate, name }] per drop stretch; seed 0 = the score as written
const DEALT = new Map()   // one deal per seed, built once and reused every frame (no per-frame garbage)
export function dealDeck(seed) {
  let d = DEALT.get(seed); if (d) return d
  d = dealFresh(seed); if (DEALT.size > 8) DEALT.clear(); DEALT.set(seed, d); return d
}
function dealFresh(seed) {
  if (!seed) return D.segments.map(([a, b]) => ({ a, b, src: a, rate: 1, name: null }))
  const long = D.long.map((n, k) => ({ n, r: rnd(seed, 80 + k) })).sort((p, q) => p.r - q.r).map((p) => p.n)
  const short = D.short[Math.min(D.short.length - 1, Math.floor(rnd(seed, 90) * D.short.length))]
  let li = 0
  return D.segments.map(([a, b]) => {
    const name = b - a <= 12.01 ? short : long[li++]
    const [s, e] = S[name]
    return { a, b, src: s, rate: (e - s) / (b - a), name }
  })
}
// track seconds -> scene seconds under a deal
export function sceneTime(t, deal) {
  if (t == null) return t
  for (const g of deal) if (t >= g.a && t < g.b) return g.src + (t - g.a) * g.rate
  return t
}
