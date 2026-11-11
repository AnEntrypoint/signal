// The serpents' shader math: how a body moves (its own seeded clock, mirrored in pairs), its skins and its light.
import { float, vec2, vec3, select, mix, smoothstep, step, hash } from "builtin/tsl";
import { BODIES } from "./serpents-data.js";
import { SEC, win, shown } from "./lib/trip.js";
import { kickAt, colours, shade, roll } from "./field-lib.js";
export const TAU = 6.2831853, D = Math.PI / 180;
const NP = BODIES.length / 2;
// one number per pair from the layout table (col: 0 root angle, 1 root radius, 2 length)
export function pairVal(pair, col) {
  let n = float(BODIES[(NP - 1) * 2][col]);
  for (let k = NP - 2; k >= 0; k--) n = select(pair.lessThan(k + 0.5), float(BODIES[k * 2][col]), n);
  return n;
}
// code = pair*16 + kind*4 + ring*2 + mirror
export function decode(v) {
  const code = float(v).floor();
  return { code, mir: code.mod(2), ring: code.div(2).floor().mod(2), kind: code.div(4).floor().mod(4), pair: code.div(16).floor() };
}
// THE OWN CLOCK of a pair: rate, phase and sense from the roll's seed and the pair; mirrors share it, turned.
export function ownClock(c, b) {
  const h = hash(b.pair.add(c.seed.mul(7.31)).add(3.7));
  const rate = mix(0.55, 1.45, h).mul(mix(0.85, 1.15, c.rnd(52))), sense = select(hash(b.pair.add(c.seed).add(11.1)).greaterThan(0.5), float(1), float(-1)).mul(c.dir);
  return { rate, sense, phase: h.mul(TAU), t: c.sec.mul(rate).mul(sense) };
}
// Moves a point of the body (P at fraction s) the way the whole body moves now. Returns { p, sink, k }.
export function bodyMove(c, b, P, s) {
  const sgn = float(1).sub(b.mir.mul(2));
  const ph = pairVal(b.pair, 0).mul(sgn).mul(D), R = pairVal(b.pair, 1), L = pairVal(b.pair, 2);
  const root = vec3(ph.sin().mul(R), 0, ph.cos().mul(R).negate());
  const rel = P.sub(root), oc = ownClock(c, b);
  // a slow sway, one cycle per 8..20 s on the pair's own clock; a mirror sways as the mirror
  const a = oc.t.mul(TAU / 12).add(oc.phase).sin().mul(0.08).mul(s).mul(sgn);
  const ca = a.cos(), sa = a.sin();
  const rr = vec3(rel.x.mul(ca).add(rel.z.mul(sa)), rel.y, rel.z.mul(ca).sub(rel.x.mul(sa)));
  // the kick ripple reaches the root late by its radius: the body swells 5 %, the curl lifts
  const k = kickAt(c, R);
  // counter-breath: the two rings inhale in antiphase, each on its own phrase-long breath
  const br = c.sec.mul(TAU / 12).add(b.ring.mul(3.14159)).sin().mul(0.5).add(0.5).mul(0.03).add(1);
  const sc = k.mul(0.05).mul(s).add(1).mul(br);
  // the interleave with the field: a slow swell runs up the body and dips it under the floor and out again
  const dip = s.mul(TAU * 1.5).sub(oc.t.mul(TAU / 16)).add(oc.phase).sin().max(0).mul(smoothstep(0.35, 0.0, s)).mul(2.2);
  // rise out of the ground (inner ring first) and sink back at the end
  const g = mix(smoothstep(30.35, 42.35, c.sec), smoothstep(34.35, 46.35, c.sec), b.ring).mul(smoothstep(192, 186, c.sec));
  const sink = float(1).sub(g).mul(L.add(8));
  const p = root.add(rr.mul(sc)).add(vec3(0, k.mul(s).mul(s).mul(0.9).sub(sink).sub(dip), 0));
  return { p, k, R, ph, L, oc };
}
// THE TRAVELLING LIGHT, three ways dealt by the seed: a chase up the body, a clock hand round the field, a radial front.
export function lightOf(c, b, s, wp, oc) {
  const v = c.pick(53, 3);
  const chase = smoothstep(0.32, 0.0, s.sub(oc.t.div(12).add(oc.phase.div(TAU))).fract());
  const am = wp.x.abs().atan2(wp.z.negate()).div(TAU);
  const hand = smoothstep(0.14, 0.0, am.sub(c.sec.div(24).mul(c.dir)).fract());
  const front = smoothstep(0.12, 0.0, wp.xz.length().div(100).sub(c.sec.div(12)).fract());
  const w = select(v.lessThan(0.5), chase, select(v.lessThan(1.5), hand, front));
  return w.max(win(c.sec, SEC.peak, 2));
}
// stripe skin: hard black/white bands scrolling root to tip; every 4th a coloured band of target dots
// the scroll crawls one stripe per 2 bars; only in peak (its one fast thing) it runs half a stripe a beat
export function scroll(c) {
  return c.bar.mul(0.5).add(c.sec.sub(132.35).clamp(0, 47.65).mul(160 / 60 * 0.5));
}
export function skinStripes(c, x, a, K) {
  const n = x.div(1.4).sub(scroll(c)), idx = n.floor(), f = n.fract();
  const white = step(0.5, f);
  const dq = vec2(a.mul(10).fract().sub(0.5), f.sub(0.5).mul(0.8)), r = dq.length();
  const dot = select(r.lessThan(0.17), K.H2, select(r.lessThan(0.27), vec3(0), select(r.lessThan(0.4), K.H, select(idx.mod(2).lessThan(0.5), K.A, K.B))));
  return select(idx.mod(4).lessThan(0.5), dot, vec3(white.mul(0.95)));
}
// diamond lattice: yellow-green cells, black outline, a ring and a dark pupil in each
export function skinDiamond(c, x, a, K) {
  const u = x.div(1.1).sub(c.beat.mul(0.125)), w = a.mul(9);
  const p = vec2(u.add(w), u.sub(w)), q = p.fract().sub(0.5), cell = p.floor();
  const e = q.x.abs().max(q.y.abs()), r = q.length();
  const body = select(cell.x.add(cell.y).mod(2).lessThan(0.5), vec3(0.55, 1.0, 0.03), K.A.mul(0.5).add(vec3(0.3, 0.9, 0.05).mul(0.5)));
  return select(e.greaterThan(0.41), vec3(0), select(r.lessThan(0.08), K.H, select(r.lessThan(0.17), vec3(0.01), body)));
}
// chain: a ladder of white rungs on black between two rails, a hot bead in every 3rd link
export function skinChain(c, x, a, K) {
  const g = x.div(1.3).sub(c.bar.mul(0.5)), f = g.fract(), aa = a.mul(2).fract();
  const rung = step(0.78, f), rail = step(aa.sub(0.5).abs(), 0.06);
  const bead = step(vec2(f.sub(0.39), aa.sub(0.5).mul(1.3)).length(), 0.2).mul(step(g.floor().mod(3), 0.5));
  return select(bead.greaterThan(0.5), K.H, vec3(rung.max(rail).mul(0.95)));
}
// peak: a Truchet weave of quarter arcs across the skin, its tiles flipping each 4 bars
export function truchet(c, x, a) {
  const p = vec2(x.div(1.2), a.mul(8)), cell = p.floor(), q = p.fract();
  const flip = hash(cell.x.add(cell.y.mul(57)).add(c.bar.div(4).floor().mul(13)).add(c.seed)).greaterThan(0.5);
  const qq = select(flip, vec2(float(1).sub(q.x), q.y), q);
  const d = qq.length().sub(0.5).abs().min(vec2(float(1).sub(qq.x), float(1).sub(qq.y)).length().sub(0.5).abs());
  return step(d, 0.07);
}
// THE SELF-CUTOUT, slow and on the bar, one of three by the seed: bands, lattice windows (the layer behind shows
// through the cells: the keyhole), a turning split down the tube.
export function selfCut(c, x, a) {
  const v = c.pick(51, 3);
  const band = select(x.div(2.8).floor().sub(c.bar.div(2).floor()).mod(4).lessThan(0.5), float(1), float(0));
  const u = x.div(1.1), w = a.mul(9), q = vec2(u.add(w), u.sub(w)).fract().sub(0.5);
  const holes = step(q.length(), 0.16).mul(step(c.bar.mod(4), 2));
  const split = step(0.78, a.add(c.bar.div(16)).mul(2).fract());
  return select(v.lessThan(0.5), band, select(v.lessThan(1.5), holes, split));
}
// colour: the hue family of the phrase (the world's), lit or graphite, gold-only in the graphite-and-gold roll
export function finish(c, col, L, x) {
  const gold = c.pick(54, 3).greaterThan(1.5).and(win(c.sec, SEC.peak, 2).lessThan(0.5));
  const chev = step(0.5, x.div(1.6).fract());
  const g = shade(select(gold, vec3(1.0, 0.72, 0.05).mul(chev), col), L);
  const bright = smoothstep(155.5, 157, c.sec).mul(0.5).add(1);
  return roll(c, g.mul(L.mul(bright).mul(1.4).add(1).sub(L)));
}
export { kickAt, colours, shade, roll, shown, win, SEC };
