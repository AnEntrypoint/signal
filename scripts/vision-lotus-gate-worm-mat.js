// THE LOTUS GATE's STEMS: real round bodies winding in depth through the scene (params.n = 1..4).
// n 1, 2: rise out of the water from below the bottom corners (z -42, behind the world), pass behind the outer petal
// rings (z < 0), cross the being's plane and curl their tips in front of the outermost petals 26 m nearer the camera.
// n 3, 4 (dealt by the seed): thinner root-worms hanging in from the top corners. Opaque black skin with neon on it,
// so a stem hides whatever is behind it. Grows root to tip (slot u .55-.8); skin: op-art spiral stripes, then (.8-.88,
// travelling up the body) lotus-root holes or diamond scales; one stem goes pure black with a thin rim at the
// culmination; all retract tip-first on the exit. Seed channels (K 11): 420 hue, 427 count, 428 second skin,
// 433 which stem goes dark, 437 hot accent.
import { MeshBasicNodeMaterial, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, mix, atan2 } from "builtin/tsl";
import { tripClock, visionShown, visionU, stripes } from "./lib/trip.js";

const TAU = 6.28318, LEN = 120;
export function material(ctx) {
  const n = Math.max(1, Math.round(ctx.params.n ?? 1)), sg = n % 2 ? 1 : -1, pair = n > 2 ? 1 : 0;
  const c = tripClock(ctx), hold = ctx.param("hold", -1), u = hold.greaterThan(-0.5).select(hold, visionU(ctx, c)), live = visionShown(ctx, c, 0);
  const inv = (x) => float(1).sub(x), is = (v, i) => step(v.sub(i).abs(), 0.5);
  const io = (a, b, x, y) => smoothstep(a, b, u).mul(inv(smoothstep(x, y, u)));
  const rn = (k) => c.rnd(420 + k), pk = (k, m) => c.pick(420 + k, m);
  const fam = pk(0, 3), hot = pk(17, 3);
  const blue = vec3(0.05, 0.12, 1.0), violet = vec3(0.45, 0.05, 1.0), mag = vec3(1.0, 0.05, 0.6), W = vec3(1, 1, 1);
  const A = blue.mul(is(fam, 0)).add(violet.mul(is(fam, 1))).add(violet.mul(is(fam, 2)));
  const B = violet.mul(is(fam, 0)).add(blue.mul(is(fam, 1))).add(mag.mul(is(fam, 2)));
  const H = mag.mul(is(hot, 0)).add(vec3(1.0, 0.85, 0.05).mul(is(hot, 1))).add(vec3(0.1, 1.0, 0.15).mul(is(hot, 2)));

  const uu = positionGeometry.y, ca = positionGeometry.x, sa = positionGeometry.z;
  const r0 = pair ? 2.2 : 3.4;
  const grow = io(0.55 + pair * 0.06, 0.8, 0.93, 0.962 - pair * 0.01);        // root to tip in, tip first out
  const exists = pair ? step(0.4, rn(7)).mul(n === 4 ? step(0.7, rn(7)).max(step(rn(7), 0.4)) : float(1)) : float(1);
  const tip = smoothstep(grow, grow.sub(0.07), uu);
  const rad = inv(uu.mul(0.85)).max(0).pow(0.6).mul(r0).mul(tip.sqrt()).mul(live).mul(exists).mul(step(0.002, grow));
  // the spine (being metres, +z toward the camera) and two travelling waves along it: the stem sways as it rises
  const ph = pair * 2.4 + (sg > 0 ? 0 : 1.1), env = uu.mul(0.7).add(0.3);
  const w1 = uu.mul(8).sub(c.real.mul(1.1)).add(ph).sin().mul(env).mul(4.5);
  const w2 = uu.mul(6).sub(c.real.mul(0.75)).add(ph * 1.6).cos().mul(env).mul(3.5);
  const u2 = uu.mul(uu);
  const spine = pair
    ? vec3(float(86).sub(uu.mul(76)).add(u2.mul(20)).mul(sg).add(w1), float(64).sub(uu.mul(52)).add(u2.mul(10)).add(w2.mul(0.6)), uu.mul(61).sub(46).add(w2.mul(0.7)))
    : vec3(float(80).sub(uu.mul(90)).add(u2.mul(32)).mul(sg).add(w1), float(-70).add(uu.mul(100)).sub(u2.mul(16)).add(w2.mul(0.6)), uu.mul(68).sub(42).add(w2.mul(0.7)));
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  m.positionNode = spine.add(vec3(ca.mul(rad), sa.mul(rad).mul(0.8), sa.mul(rad).mul(-0.6)));
  // THE DEPTH WEAVE: the mid-body swings through the canvas planes (ring -12, being 0, veil +10), so one body dips
  // behind the being and comes out in front of it, more than once; the ends stay rooted. Seeded per body: swing, turns, phase.
  { const S = float(uu).clamp(0, 1), dz = step(0.5, c.rnd(391 + n)).mul(2).sub(1).mul(c.rnd(395 + n).mul(5).add(11));
    const turns = c.rnd(399 + n).mul(1.6).add(1.4).mul(3.14159);
    const weave = S.mul(turns).add(c.rnd(403 + n).mul(6.283)).add(c.real.mul(0.21 + 0.04 * n)).sin().mul(S.mul(float(1).sub(S)).mul(4)).mul(dz);
    m.positionNode = m.positionNode.add(vec3(0, 0, weave)); }

  // the skin, by along-length s (metres) and around-angle
  const ang = atan2(sa, ca), s = uu.mul(LEN), rf = inv(uu.mul(0.85)).max(0).pow(0.6).mul(r0);
  const cStr = mix(A, W, s.mul(0.3).add(ang.div(TAU).mul(2)).floor().mod(3).step(0.5).mul(0.6)).mul(stripes(s.mul(0.3).add(ang.div(TAU).mul(2)), 1, 0.05));
  // lotus root: rows of round holes, each a neon ring with a hot core
  const row = s.div(2.6).floor();
  const hd = vec2(s.div(2.6).fract().sub(0.5).mul(2.6), ang.div(TAU).mul(7).add(row.mul(0.5)).fract().sub(0.5).mul(rf.mul(TAU / 7))).length();
  const hr = rf.mul(0.36).min(0.75);
  const cHo = B.mul(float(1).sub(smoothstep(0.04, 0.14, hd.sub(hr).abs()))).add(mix(H, W, step(row.mod(4), 0.5).mul(0.5)).mul(inv(smoothstep(hr.mul(0.4), hr.mul(0.5), hd))));
  const t = ang.div(TAU).mul(4);
  const cSc = mix(B, W, 0.2).mul(stripes(s.mul(0.32).add(t), 1, 0.07).mul(stripes(s.mul(0.32).sub(t), 1, 0.07)));
  const swap = pair ? inv(step(0.5, rn(8))) : step(0.5, rn(8));
  const t1 = 0.8 + pair * 0.03;
  const skin = mix(cStr, mix(cHo, cSc, swap), step(uu, smoothstep(t1, t1 + 0.08, u).mul(1.02)));
  const run = float(1).sub(smoothstep(0, 0.05, uu.sub(c.beat.fract()).abs())).mul(step(0.001, c.kick));   // the kick's light climbs the stem
  const edge = ca.abs();
  const lit = skin.mul(sa.abs().mul(0.45).add(0.55)).add(mix(A, W, 0.4).mul(smoothstep(0.86, 1, edge)).mul(run.add(0.45)));
  const dark = is(float(n), step(0.5, rn(13)).add(1)).mul(step(uu, smoothstep(0.85, 0.91, u).mul(1.02)));
  m.colorNode = mix(lit, mix(A, W, 0.5).mul(smoothstep(0.95, 1, edge)).mul(0.7), dark);
  return m;
}
