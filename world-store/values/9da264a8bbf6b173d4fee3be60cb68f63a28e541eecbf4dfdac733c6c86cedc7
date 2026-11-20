// THE LOTUS GATE's stems (params.n 1..4): round opaque bodies rising in depth through the petals.
// Skin uv mode, dealt per worm by the roll (1..3 always one of each): 0 rides the body (stripes travel with it, a real worm's),
// 1 pinned to the path (the body slides through its stripes), 2 reversed (skin runs back by the distance travelled).
import { MeshBasicNodeMaterial, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, mix, atan2 } from "builtin/tsl";
import { tripClock, visionShown, visionU, stripes, inv, is, ioU } from "./lib/trip.js";

const TAU = 6.28318, LEN = 120;
export function material(ctx) {
  const n = Math.max(1, Math.round(ctx.params.n ?? 1)), sg = n % 2 ? 1 : -1, pair = n > 2 ? 1 : 0;
  const c = tripClock(ctx), hold = ctx.param("hold", -1), u = hold.greaterThan(-0.5).select(hold, visionU(ctx, c)), live = visionShown(ctx, c, 0);
  const io = ioU(u), low = ctx.quality === "low";
  const rn = (k) => c.rnd(420 + k), pk = (k, m) => c.pick(420 + k, m);
  const fam = pk(0, 3), hot = pk(17, 3);
  const blue = vec3(0.05, 0.12, 1.0), violet = vec3(0.45, 0.05, 1.0), mag = vec3(1.0, 0.05, 0.6), W = vec3(1, 1, 1);
  const A = blue.mul(is(fam, 0)).add(violet.mul(is(fam, 1))).add(violet.mul(is(fam, 2)));
  const B = violet.mul(is(fam, 0)).add(blue.mul(is(fam, 1))).add(mag.mul(is(fam, 2)));
  const H = mag.mul(is(hot, 0)).add(vec3(1.0, 0.85, 0.05).mul(is(hot, 1))).add(vec3(0.1, 1.0, 0.15).mul(is(hot, 2)));

  const uu = positionGeometry.y, ca = positionGeometry.x, sa = positionGeometry.z;
  const r0 = pair ? 2.2 : 3.4;
  const grow = io(0.55 + pair * 0.06, 0.8, 0.93, 0.962 - pair * 0.01);
  const exists = pair ? step(0.4, rn(7)).mul(n === 4 ? step(0.7, rn(7)).max(step(rn(7), 0.4)) : float(1)) : float(1);
  const tip = inv(smoothstep(grow.sub(0.07), grow, uu));
  const rad = inv(uu.mul(0.85)).max(0).pow(0.6).mul(r0).mul(tip.sqrt()).mul(live).mul(exists).mul(step(0.002, grow));
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
  { const S = float(uu).clamp(0, 1), dz = step(0.5, c.rnd(391 + n)).mul(2).sub(1).mul(c.rnd(395 + n).mul(5).add(11));
    const turns = c.rnd(399 + n).mul(1.6).add(1.4).mul(3.14159);
    const weave = S.mul(turns).add(c.rnd(403 + n).mul(6.283)).add(c.real.mul(0.21 + 0.04 * n)).sin().mul(S.mul(float(1).sub(S)).mul(4)).mul(dz);
    m.positionNode = m.positionNode.add(vec3(0, 0, weave)); }

  const mode = n < 4 ? c.pick(722, 3).add(n - 1).mod(3) : c.pick(723, 3);
  const trav = grow.mul(LEN).add(c.real.mul(c.rnd(723 + n).mul(3).add(4)));
  const ang = atan2(sa, ca), s = uu.mul(LEN).sub(trav.mul(is(mode, 0))).add(trav.mul(is(mode, 2))), rf = inv(uu.mul(0.85)).max(0).pow(0.6).mul(r0);
  const cStr = mix(A, W, s.mul(0.3).add(ang.div(TAU).mul(2)).floor().mod(3).step(0.5).mul(0.6)).mul(stripes(s.mul(0.3).add(ang.div(TAU).mul(2)), 1, 0.05));
  const row = s.div(2.6).floor();
  const hd = vec2(s.div(2.6).fract().sub(0.5).mul(2.6), ang.div(TAU).mul(7).add(row.mul(0.5)).fract().sub(0.5).mul(rf.mul(TAU / 7))).length();
  const hr = rf.mul(0.36).min(0.75);
  const cHo = B.mul(float(1).sub(smoothstep(0.04, 0.14, hd.sub(hr).abs()))).add(mix(H, W, step(row.mod(4), 0.5).mul(0.5)).mul(inv(smoothstep(hr.mul(0.4), hr.mul(0.5), hd))));
  const t = ang.div(TAU).mul(4);
  const cSc = mix(B, W, 0.2).mul(stripes(s.mul(0.32).add(t), 1, 0.07).mul(stripes(s.mul(0.32).sub(t), 1, 0.07)));
  const swap = pair ? inv(step(0.5, rn(8))) : step(0.5, rn(8));
  const t1 = 0.8 + pair * 0.03;
  const skin = mix(cStr, (low ? cSc : mix(cHo, cSc, swap)), step(uu, smoothstep(t1, t1 + 0.08, u).mul(1.02)));
  const run = low ? float(0) : float(1).sub(smoothstep(0, 0.05, uu.sub(c.beat.fract()).abs())).mul(step(0.001, c.kick));
  const edge = ca.abs();
  const lit = skin.mul(sa.abs().mul(0.45).add(0.55)).add(mix(A, W, 0.4).mul(smoothstep(0.86, 1, edge)).mul(run.add(0.45)));
  const dark = is(float(n), step(0.5, rn(13)).add(1)).mul(step(uu, smoothstep(0.85, 0.91, u).mul(1.02)));
  m.colorNode = mix(lit, mix(A, W, 0.5).mul(smoothstep(0.95, 1, edge)).mul(0.7), dark);
  return m;
}
