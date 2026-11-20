// THE ANTLER GOD's wood-serpents (params.n 1..4): round opaque bodies that follow their own head down a turning path,
// so they truly change heading; an undulation runs down the length. 1 and 3 swim in FRONT of the mask (through the veil's depth),
// 2 and 4 BEHIND it (through the wreath's). Skin: 1-2 ride the body (a real worm's uv); 3-4 are locked to world space (the body slides through its pattern).
import { MeshBasicNodeMaterial, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, mix, atan2 as atan2raw } from "builtin/tsl";
import { tripClock, visionShown, visionU, stripes, inv, is, sgn, ioU, NEON } from "./lib/trip.js";
const atan2 = (y, x) => atan2raw(y, x.add(1e-5));
const TAU = 6.28318, LEN = 70;
export function material(ctx) {
  const n = Math.max(1, Math.round(ctx.params.n ?? 1)), frontW = n % 2, pair = n > 2 ? 1 : 0;
  const c = tripClock(ctx), u = visionU(ctx, c), live = visionShown(ctx, c, 0), io = ioU(u), low = ctx.quality === "low";
  const rn = (k) => c.rnd(1060 + k), pk = (k, m) => c.pick(1060 + k, m);
  const { BLU, VIO, PNK, ORA, YEL, GRN, W } = NEON;
  const fam = pk(0, 3), hot = pk(1, 4);
  const A = BLU.mul(is(fam, 0)).add(VIO.mul(is(fam, 1))).add(vec3(0.01, 0.5, 0.6).mul(is(fam, 2)));
  const B = VIO.mul(is(fam, 0)).add(BLU.mul(inv(is(fam, 0))));
  const hotC = (k) => [PNK, ORA, YEL, GRN].reduce((a, v, i) => a.add(v.mul(is(k, i))), vec3(0));
  const H = hotC(hot), H2 = hotC(hot.add(pk(2, 3)).add(1).mod(4));

  const uu = positionGeometry.y, ca = positionGeometry.x, sa = positionGeometry.z;
  const r0 = pair ? 1.7 : 2.4;
  const grow = io(0.58 + pair * 0.05, 0.8, 0.9 - pair * 0.02, 0.95 - pair * 0.02);
  const tip = inv(smoothstep(grow.sub(0.07), grow, uu));
  const rad = inv(uu).max(1e-4).sqrt().mul(r0).mul(tip.clamp(0, 1).max(1e-4).sqrt()).mul(live).mul(step(0.002, grow));
  // head leads (uu 0), the body trails the same path later in time
  const f1 = 1 + n * 0.13, f2 = 1.7 - n * 0.11, p1 = rn(13 + n).mul(TAU), p2 = n * 1.9;
  const tau = c.real.mul(0.2 + n * 0.02).mul(sgn(rn(17))).sub(uu.mul(1.15)).add(n * 1.3);
  const und = uu.mul(13).sub(c.real.mul(2.4)).add(n).sin().mul(uu.mul(0.8).add(0.2)).mul(1.5);
  const X = tau.mul(f1).add(p1).sin().mul(44), Y = tau.mul(f2).add(p2).sin().mul(16).add(tau.mul(0.6).cos().mul(5));
  const dX = tau.mul(f1).add(p1).cos().mul(44 * f1), dY = tau.mul(f2).add(p2).cos().mul(16 * f2).sub(tau.mul(0.6).sin().mul(3));
  const il = float(1).div(dX.mul(dX).add(dY.mul(dY)).max(1).sqrt()), nx = dY.mul(il).negate(), ny = dX.mul(il);
  const Z = tau.mul(0.7).add(n).sin().mul(frontW ? 6 : 7).add(frontW ? 12 : -14);
  const off = ca.mul(rad).add(und);
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  m.positionNode = vec3(X.add(nx.mul(off)), Y.add(ny.mul(off)), Z.add(sa.mul(rad)).add(und.mul(0.6)));

  // skin: body-static for 1-2, world-locked for 3-4
  const s = pair ? X.mul(0.8).add(Y) : uu.mul(LEN);
  const ang = atan2(sa, ca), rf = inv(uu).max(1e-4).sqrt().mul(r0);
  const sk3 = s.mul(0.35).floor().mod(3);
  const cStr = A.mul(is(sk3, 0)).add(B.mul(is(sk3, 1))).add(H2.mul(0.85).mul(is(sk3, 2))).mul(stripes(s, 0.35, 0.04));
  const row = s.div(2.4).floor();
  const bd = vec2(s.div(2.4).fract().sub(0.5).mul(2.4), ang.div(TAU).mul(6).add(row.mul(0.5)).fract().sub(0.5).mul(rf.mul(TAU / 6))).length();
  const brad = rf.mul(0.4).min(0.7);
  const cBe = mix(mix(B, W, 0.3), H, step(row.mod(3), 0.5)).mul(inv(smoothstep(brad.sub(0.08), brad, bd)));
  // late, the skin changes from the head down: stripes to bead rows
  const t1 = 0.78 + pair * 0.03;
  const skin = low ? cStr : mix(cStr, cBe, step(uu, smoothstep(t1, t1 + 0.08, u).mul(1.02)));
  const run = low ? float(0) : inv(smoothstep(0, 0.05, uu.sub(c.beat.fract()).abs())).mul(step(0.001, c.kick));
  const edge = ca.abs();
  m.colorNode = skin.mul(sa.abs().mul(0.45).add(0.55)).add(mix(A, W, 0.5).mul(smoothstep(0.86, 1, edge)).mul(run.add(0.5)));
  return m;
}
