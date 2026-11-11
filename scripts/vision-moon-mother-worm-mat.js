// THE MOON MOTHER's tide eels (params.n 1..4): round opaque bodies winding in depth through her scene.
// Skin uv mode, dealt per worm by the roll (1..3 always one of each): 0 rides the body (stripes travel with it, a real worm's),
// 1 pinned to the path (the body slides through its stripes), 2 reversed (skin runs back by the distance travelled).
import { MeshBasicNodeMaterial, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, mix, atan2 } from "builtin/tsl";
import { tripClock, visionShown, visionU, stripes, inv, is, ioU } from "./lib/trip.js";

const TAU = 6.28318, LEN = 110;
export function material(ctx) {
  const n = Math.max(1, Math.round(ctx.params.n ?? 1)), sg = n % 2 ? 1 : -1, pair = n > 2 ? 1 : 0;
  const c = tripClock(ctx), u = visionU(ctx, c), live = visionShown(ctx, c, 0);
  const io = ioU(u), low = ctx.quality === "low";
  const rn = (k) => c.rnd(220 + k), pk = (k, m) => c.pick(220 + k, m);
  const fam = pk(0, 3), hot = pk(17, 3);
  const blue = vec3(0.05, 0.12, 1.0), violet = vec3(0.45, 0.05, 1.0), ice = vec3(0.45, 0.6, 1.0), W = vec3(1, 1, 1);
  const A = blue.mul(is(fam, 0)).add(violet.mul(is(fam, 1))).add(blue.mul(is(fam, 2)));
  const B = violet.mul(is(fam, 0)).add(blue.mul(is(fam, 1))).add(ice.mul(is(fam, 2)));
  const H = vec3(1.0, 0.05, 0.6).mul(is(hot, 0)).add(vec3(1.0, 0.85, 0.05).mul(is(hot, 1))).add(vec3(0.1, 1.0, 0.15).mul(is(hot, 2)));

  const uu = positionGeometry.y, ca = positionGeometry.x, sa = positionGeometry.z;
  const r0 = pair ? 2.4 : 3.6;
  const grow = io(0.28 + pair * 0.07, 0.66 + pair * 0.06, 0.93, 0.965 - pair * 0.01);
  const exists = pair ? step(0.45, rn(7)) : float(1);
  const tip = smoothstep(grow, grow.sub(0.07), uu);
  const rad = inv(uu).max(0).pow(0.5).mul(r0).mul(tip.sqrt()).mul(live).mul(exists).mul(step(0.002, grow));
  const ph = pair * 2.1 + (sg > 0 ? 0 : 0.9), env = uu.mul(0.8).add(0.2);
  const w1 = uu.mul(9).sub(c.real.mul(1.3)).add(ph).sin().mul(env).mul(5);
  const w2 = uu.mul(7).sub(c.real.mul(0.9)).add(ph * 1.7).cos().mul(env).mul(4);
  const zArc = smoothstep(0, 0.5, uu).mul(31).sub(40).add(smoothstep(0.8, 0.98, uu).mul(25)).add(w2.mul(0.25));
  const spine = pair
    ? vec3(uu.mul(-110).add(100).mul(sg).add(w1), uu.mul(-60).add(68).add(w2.mul(0.6)), zArc)
    : vec3(uu.mul(-106).add(96).mul(sg).add(w1), uu.mul(62).sub(62).add(w2.mul(0.6)), zArc);
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  m.positionNode = spine.add(vec3(ca.mul(rad), sa.mul(rad).mul(0.8), sa.mul(rad).mul(-0.6)));
  { const S = float(uu).clamp(0, 1), dz = step(0.5, c.rnd(391 + n)).mul(2).sub(1).mul(c.rnd(395 + n).mul(1.5).add(1.5));
    const turns = c.rnd(399 + n).mul(1.6).add(1.4).mul(3.14159);
    const weave = S.mul(turns).add(c.rnd(403 + n).mul(6.283)).add(c.real.mul(0.21 + 0.04 * n)).sin().mul(S.mul(float(1).sub(S)).mul(4)).mul(dz);
    m.positionNode = m.positionNode.add(vec3(0, 0, weave)); }

  const mode = n < 4 ? c.pick(732, 3).add(n - 1).mod(3) : c.pick(733, 3);
  const trav = grow.mul(LEN).add(c.real.mul(c.rnd(733 + n).mul(3).add(4)));
  const ang = atan2(sa, ca), s = uu.mul(LEN).sub(trav.mul(is(mode, 0))).add(trav.mul(is(mode, 2))), rf = inv(uu).max(0).sqrt().mul(r0);
  const cStr = mix(A, B, s.mul(0.35).floor().mod(2)).mul(stripes(s, 0.35, 0.04));
  const row = s.div(2.4).floor();
  const bd = vec2(s.div(2.4).fract().sub(0.5).mul(2.4), ang.div(TAU).mul(6).add(row.mul(0.5)).fract().sub(0.5).mul(rf.mul(TAU / 6))).length();
  const brad = rf.mul(0.4).min(0.7);
  const cBe = mix(mix(B, W, 0.5), H, step(row.mod(3), 0.5)).mul(inv(smoothstep(brad.sub(0.08), brad, bd)));
  const t = ang.div(TAU).mul(3);
  const cSc = mix(B, W, 0.25).mul(stripes(s.mul(0.3).add(t), 1, 0.06).mul(stripes(s.mul(0.3).sub(t), 1, 0.06)));
  const swap = pair ? inv(step(0.5, rn(8))) : step(0.5, rn(8));
  const t1 = 0.8 + pair * 0.03;
  const skin = mix(cStr, (low ? cSc : mix(cBe, cSc, swap)), step(uu, smoothstep(t1, t1 + 0.08, u).mul(1.02)));
  const run = low ? float(0) : smoothstep(0.05, 0, uu.sub(c.beat.fract()).abs()).mul(step(0.001, c.kick));
  const edge = ca.abs();
  const lit = skin.mul(sa.abs().mul(0.45).add(0.55)).add(mix(A, W, 0.5).mul(smoothstep(0.86, 1, edge)).mul(run.add(0.5)));
  const dark = is(float(n), step(0.5, rn(13)).add(1)).mul(step(uu, smoothstep(0.86, 0.92, u).mul(1.02)));
  m.colorNode = mix(lit, mix(A, W, 0.5).mul(smoothstep(0.95, 1, edge)).mul(0.7), dark);
  return m;
}
