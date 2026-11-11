// THE OUROBOROS's hatchlings (params.n 1..4): round opaque serpents spiralling round the ring in depth.
// Skin uv mode, dealt per worm by the roll (1..3 always one of each): 0 rides the body (stripes travel with it, a real worm's),
// 1 pinned to the path (the body slides through its stripes), 2 reversed (skin runs back by the distance travelled).
import { MeshBasicNodeMaterial, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, mix, atan2, select } from "builtin/tsl";
import { tripClock, visionShown, visionU, stripes, inv, is, ioU, sgn } from "./lib/trip.js";

const TAU = 6.28318, LEN = 120;
export function material(ctx) {
  const n = Math.max(1, Math.round(ctx.params.n ?? 1)), sg = n % 2 ? 1 : -1, pair = n > 2 ? 1 : 0;
  const c = tripClock(ctx), uh = ctx.param("hold", -1), u = select(uh.greaterThanEqual(0), uh, visionU(ctx, c)), live = visionShown(ctx, c, 0);
  const io = ioU(u), low = ctx.quality === "low";
  const rn = (k) => c.rnd(280 + k), pk = (k, m) => c.pick(280 + k, m);
  const fam = pk(0, 3), hot = pk(19, 3);
  const blue = vec3(0.05, 0.12, 1.0), violet = vec3(0.45, 0.05, 1.0), pink = vec3(1.0, 0.05, 0.6), orange = vec3(1.0, 0.38, 0.02),
    yellow = vec3(1.0, 0.85, 0.05), green = vec3(0.1, 1.0, 0.15), W = vec3(1, 1, 1);
  const A = blue.mul(is(fam, 0)).add(violet.mul(is(fam, 1))).add(blue.mul(is(fam, 2)));
  const B = pink.mul(is(fam, 0)).add(green.mul(is(fam, 1))).add(orange.mul(is(fam, 2)));
  const H = pink.mul(is(hot, 0)).add(yellow.mul(is(hot, 1))).add(green.mul(is(hot, 2)));

  const uu = positionGeometry.y, ca = positionGeometry.x, sa = positionGeometry.z;
  const r0 = pair ? 2.6 : 3.8;
  const exists = pair ? step(0.4, rn(8)) : float(1);
  const grow = io(0.55 + pair * 0.04, 0.8, 0.93, 0.955 - pair * 0.008);
  const tip = inv(smoothstep(grow.sub(0.06), grow, uu));
  const head = smoothstep(0.9, 0.97, uu).mul(inv(smoothstep(0.97, 1, uu))).mul(0.5);
  const rad = inv(uu.mul(0.85)).max(0).pow(0.6).mul(r0).add(head.mul(r0)).mul(tip.sqrt()).mul(live).mul(exists).mul(step(0.002, grow));
  const sweep = step(0.5, rn(18)).mul(2).sub(1);
  const th0 = pair ? 1.15 : -0.75, th1 = pair ? 0.35 : 0.22;
  const th = mix(float(th0), float(th1), uu.pow(0.8)).mul(sweep);
  const rA = mix(float(pair ? 82 : 92), float(pair ? 30 : 23), uu.pow(0.9));
  const zA = mix(float(-42), float(pair ? 18 : 28), uu.pow(1.3));
  const ph = n * 1.9, env = uu.mul(0.7).add(0.3);
  const w1 = uu.mul(10).sub(c.real.mul(1.4).mul(sgn(rn(5)))).add(ph).sin().mul(env).mul(4.5);
  const w2 = uu.mul(7).sub(c.real.mul(0.9)).add(ph * 1.3).cos().mul(env).mul(5);
  const rr = rA.add(w1), za = zA.add(w2);
  const k = float(74).sub(za).div(74);
  const spine = vec3(th.cos().mul(rr).mul(sg).mul(k), th.sin().mul(rr).mul(k), za);
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  m.positionNode = spine.add(vec3(ca.mul(rad), sa.mul(rad).mul(0.75), sa.mul(rad).mul(-0.65)));
  { const S = float(uu).clamp(0, 1), dz = step(0.5, c.rnd(391 + n)).mul(2).sub(1).mul(c.rnd(395 + n).mul(5).add(11));
    const turns = c.rnd(399 + n).mul(1.6).add(1.4).mul(3.14159);
    const weave = S.mul(turns).add(c.rnd(403 + n).mul(6.283)).add(c.real.mul(0.21 + 0.04 * n)).sin().mul(S.mul(float(1).sub(S)).mul(4)).mul(dz);
    m.positionNode = m.positionNode.add(vec3(0, 0, weave)); }

  const mode = n < 4 ? c.pick(742, 3).add(n - 1).mod(3) : c.pick(743, 3);
  const trav = grow.mul(LEN).add(c.real.mul(c.rnd(743 + n).mul(3).add(4)));
  const ang = atan2(sa, ca), s = uu.mul(LEN).sub(trav.mul(is(mode, 0))).add(trav.mul(is(mode, 2))), rf = inv(uu.mul(0.85)).max(0).pow(0.6).mul(r0);
  const cStr = mix(W, A, s.mul(0.4).floor().mod(4).mul(0.34).min(1)).mul(stripes(s, 0.4, 0.05));
  const row = s.div(2.6).floor();
  const bd = vec2(s.div(2.6).fract().sub(0.5).mul(2.6), ang.div(TAU).mul(6).add(row.mul(0.5)).fract().sub(0.5).mul(rf.mul(TAU / 6))).length();
  const brad = rf.mul(0.38).min(0.8);
  const cBe = mix(mix(B, W, 0.4), H, step(row.mod(3), 0.5)).mul(inv(smoothstep(brad.sub(0.08), brad, bd)));
  const t = ang.div(TAU).mul(4);
  const dia = stripes(s.mul(0.3).add(t), 1, 0.08).mul(stripes(s.mul(0.3).sub(t), 1, 0.08));
  const cSc = mix(B, A, inv(dia)).mul(dia.mul(0.8).add(0.2));
  const swap = pair ? inv(step(0.5, rn(9))) : step(0.5, rn(9));
  const skin = mix(cStr, (low ? cSc : mix(cBe, cSc, swap)), step(uu, smoothstep(0.74, 0.84, u).mul(1.02)));
  const pulse = low ? float(0) : inv(smoothstep(0, 0.05, uu.sub(c.beat.fract()).abs())).mul(step(0.001, c.kick));
  const edge = ca.abs();
  const lit = skin.mul(sa.abs().mul(0.45).add(0.55)).add(mix(A, W, 0.5).mul(smoothstep(0.85, 1, edge)).mul(pulse.add(0.45)));
  const eye = step(vec2(uu.sub(0.955).mul(LEN), ang.sub(sg > 0 ? 1.2 : 1.9).mul(rf.max(1))).length(), 0.9);
  const dark = is(float(n), step(0.5, rn(10)).add(1)).mul(step(uu, smoothstep(0.85, 0.9, u).mul(1.02)));
  const col = mix(lit, W.mul(1.2), eye.mul(step(0.8, grow)));
  m.colorNode = mix(col, mix(A, W, 0.5).mul(smoothstep(0.95, 1, edge)).mul(0.7), dark);
  return m;
}
