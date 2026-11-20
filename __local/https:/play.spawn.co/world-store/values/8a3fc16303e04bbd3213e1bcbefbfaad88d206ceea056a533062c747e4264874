// THE PSYCHE MOTH's caterpillars (params.n 1..4): round opaque bodies swimming a Lissajous course in depth, the body
// following its head's path (so it really turns), a wave and a pulse running down its length.
// Depth: 1 and 3 in front of the moth (z +5, +16), 2 and 4 behind it (z -6, -20).
// Skin: worms 1-2 ride the body (uv static to it, a real worm's); worms 3-4 are locked to world space (the body slides through its stripes).
import { MeshBasicNodeMaterial, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, mix, atan2 as atan2raw } from "builtin/tsl";
import { tripClock, visionShown, visionU, stripes, inv, is, sgn, ioU, NEON } from "./lib/trip.js";
const atan2 = (y, x) => atan2raw(y, x.add(1e-5));

const TAU = 6.28318, LEN = 48, Z = [5, -6, 16, -20];
export function material(ctx) {
  const n = Math.min(4, Math.max(1, Math.round(ctx.params.n ?? 1))), pair = n > 2 ? 1 : 0;
  const c = tripClock(ctx), u = visionU(ctx, c), live = visionShown(ctx, c, 0), t = c.real;
  const io = ioU(u), low = ctx.quality === "low";
  const rn = (k) => c.rnd(1040 + k), pk = (k, q) => c.pick(1040 + k, q);
  const { BLU, VIO, PNK, ORA, YEL, GRN, W } = NEON, ICE = vec3(0.3, 0.5, 1);
  const fam = pk(0, 3), hot = pk(1, 4);
  const A = mix(BLU, VIO, is(fam, 1)), B = VIO.mul(is(fam, 0)).add(BLU.mul(is(fam, 1))).add(ICE.mul(is(fam, 2)));
  const hotC = (k) => [PNK, ORA, YEL, GRN].reduce((a, v, i) => a.add(v.mul(is(k, i))), vec3(0));
  const H = hotC(hot), H2 = hotC(hot.add(pk(2, 3)).add(1).mod(4));

  const uu = positionGeometry.y, ca = positionGeometry.x, sa = positionGeometry.z;
  const r0 = pair ? 1.7 : 2.3;
  const grow = io(0.5 + pair * 0.06, 0.72 + pair * 0.04, 0.84, 0.9 - pair * 0.01);
  const exists = n === 4 ? step(0.35, rn(14)) : float(1);
  const tip = inv(smoothstep(grow.sub(0.07), grow, uu));
  const pulse = uu.mul(22).sub(t.mul(4)).sin().mul(0.16).add(1);
  const rad = inv(uu).max(1e-4).sqrt().mul(r0).mul(pulse).mul(tip.clamp(0, 1).max(1e-4).sqrt()).mul(live).mul(exists).mul(step(0.002, grow));
  // the course: head at uu 0, every ring behind it stands where the head was a moment ago
  const fa = 1 + n * 0.13, fb = 1.37 - n * 0.11;
  const tau = t.mul(0.21 - n * 0.015).mul(sgn(rn(15 + n))).add(n * 1.9).sub(uu.mul(1.15));
  const X = 34 - pair * 6, Y = 17;
  const px = tau.mul(fa).sin().mul(X), py = tau.mul(fb).add(n).sin().mul(Y);
  const tx = tau.mul(fa).cos().mul(X * fa), ty = tau.mul(fb).add(n).cos().mul(Y * fb);
  const nl = vec2(ty.negate(), tx).div(vec2(tx, ty).length().max(0.5));
  const wave = uu.mul(16).sub(t.mul(3.2)).add(n).sin().mul(uu.add(0.25)).mul(1.5);
  const sp = vec2(px, py).add(nl.mul(wave));
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  m.positionNode = vec3(sp.add(nl.mul(ca.mul(rad))), tau.mul(0.7).sin().mul(pair ? 3 : 1.5).add(Z[n - 1]).add(sa.mul(rad)));

  const ang = atan2(sa, ca), rf = inv(uu).max(1e-4).sqrt().mul(r0);
  const s = pair ? sp.x.mul(0.8).add(sp.y.mul(0.6)).add(200) : uu.mul(LEN);
  const sk3 = s.mul(0.35).floor().mod(3);
  const cStr = A.mul(is(sk3, 0)).add(B.mul(is(sk3, 1))).add(H2.mul(0.85).mul(is(sk3, 2))).mul(stripes(s, 0.35, 0.04));
  const row = s.div(2.4).floor();
  const bd = vec2(s.div(2.4).fract().sub(0.5).mul(2.4), ang.div(TAU).mul(6).add(row.mul(0.5)).fract().sub(0.5).mul(rf.mul(TAU / 6))).length();
  const brad = rf.mul(0.4).min(0.7);
  const cBe = mix(mix(B, W, 0.3), H, step(row.mod(3), 0.5)).mul(inv(is(row.mod(3), 1))).add(H2.mul(is(row.mod(3), 1))).mul(inv(smoothstep(brad.sub(0.08), brad, bd)));
  // late change: the skin turns from stripes to beads from the head back
  const t1 = 0.74 + pair * 0.03;
  const skin = low ? cStr : mix(cStr, cBe, step(uu, smoothstep(t1, t1 + 0.06, u).mul(1.02)).mul(n % 2 ? 1 : 0));
  const run = low ? float(0) : inv(smoothstep(0, 0.05, uu.sub(c.beat.fract()).abs())).mul(step(0.001, c.kick));
  const edge = ca.abs();
  m.colorNode = skin.mul(sa.abs().mul(0.45).add(0.55)).add(mix(A, W, 0.5).mul(smoothstep(0.86, 1, edge)).mul(run.add(0.5)));
  return m;
}
