// THE PHOENIX's fire serpents (params.n 1..4): round opaque bodies that follow their own head along a turning path
// (they really swim and double back), an undulation running down the length. 1 and 3 pass in FRONT of the bird (z+5, z+15),
// 2 and 4 BEHIND it (z-6, z-20). Skin: 1-2 static to the body (a normal worm's), 3-4 locked to world space (the body slides through it).
import { MeshBasicNodeMaterial, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, mix, atan2 as atan2raw } from "builtin/tsl";
import { tripClock, visionShown, visionU, stripes, inv, is, ioU, famPick, NEON } from "./lib/trip.js";
const atan2 = (y, x) => atan2raw(y, x.add(1e-5));
const TAU = 6.28318, LEN = 60;
export function material(ctx) {
  const n = Math.min(4, Math.max(1, Math.round(ctx.params.n ?? 1))), k = n - 1, world = n > 2;
  const c = tripClock(ctx), u = visionU(ctx, c), live = visionShown(ctx, c, 0), io = ioU(u), low = ctx.quality === "low";
  const rn = (i) => c.rnd(940 + i), W = NEON.W, fam = c.pick(940, 3);
  const FAM = [[NEON.ORA, NEON.YEL, NEON.PNK, NEON.BLU], [NEON.PNK, NEON.ORA, NEON.YEL, NEON.VIO], [NEON.VIO, NEON.PNK, NEON.YEL, NEON.GRN]];
  const A = famPick(FAM, fam, 0), B = famPick(FAM, fam, 1), H = famPick(FAM, fam, 2), H2 = famPick(FAM, fam, 3);
  const uu = positionGeometry.y, ca = positionGeometry.x, sa = positionGeometry.z, t = c.real;
  const r0 = [2.6, 2.2, 2.0, 2.8][k], z0 = [5, -6, 15, -20][k];
  // LIFO: the far pair arrives last and leaves first
  const grow = io(0.52 + k * 0.04, 0.72 + k * 0.03, 0.951 - k * 0.008, 0.975 - k * 0.008);
  const tip = inv(smoothstep(grow.sub(0.07), grow, uu));
  const rad = inv(uu).max(1e-4).sqrt().mul(r0).mul(tip.clamp(0, 1).max(1e-4).sqrt()).mul(live).mul(step(0.002, grow));
  // the head's path; the body is the path's recent past (uu 0 head .. 1 tail)
  const dir = step(0.5, rn(11 + k)).mul(2).sub(1);
  const tau = t.mul(0.2).mul(dir).sub(uu.mul(1.5)).add(rn(15 + k).mul(TAU));
  const env = uu.mul(0.8).add(0.2), und = uu.mul(11).sub(t.mul(1.6)).add(k).sin().mul(env);
  const spine = vec3(
    tau.mul([1, 1.3, 0.8, 1.15][k]).add(k * 1.7).sin().mul(30 + k * 3).add(und.mul(1.2)),
    tau.mul([1.7, 1.1, 1.9, 1.45][k]).add(k * 0.9).sin().mul(14).add(und.mul(2.2)),
    tau.mul(2.3).add(k).sin().mul(2).add(z0));
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  m.positionNode = spine.add(vec3(ca.mul(rad), sa.mul(rad).mul(0.8), sa.mul(rad).mul(-0.6)));

  const ang = atan2(sa, ca), rf = inv(uu).max(1e-4).sqrt().mul(r0);
  const s = world ? spine.x.add(spine.y.mul(0.8)) : uu.mul(LEN);    // 3-4: the pattern stays where the world is
  const sk3 = s.mul(0.35).floor().mod(3);
  const cStr = A.mul(is(sk3, 0)).add(B.mul(is(sk3, 1))).add(H2.mul(0.85).mul(is(sk3, 2))).mul(stripes(s, 0.35, 0.04));
  const row = s.div(2.4).floor();
  const bd = vec2(s.div(2.4).fract().sub(0.5).mul(2.4), ang.div(TAU).mul(6).add(row.mul(0.5)).fract().sub(0.5).mul(rf.mul(TAU / 6))).length();
  const brad = rf.mul(0.4).min(0.7);
  const cBe = mix(mix(B, W, 0.3), H, step(row.mod(3), 0.5)).mul(inv(smoothstep(brad.sub(0.08), brad, bd)));
  const tw = ang.div(TAU).mul(3);
  const cSc = mix(H, W, 0.25).mul(stripes(s.mul(0.3).add(tw), 1, 0.06).mul(stripes(s.mul(0.3).sub(tw), 1, 0.06)));
  // late detail: the skin changes from stripes to beads / flame scales, running head to tail
  const skin = mix(cStr, low ? cSc : (k % 2 ? cSc : cBe), step(uu, smoothstep(0.76 + k * 0.02, 0.86 + k * 0.02, u).mul(1.02)));
  const run = low ? float(0) : inv(smoothstep(0, 0.05, uu.sub(c.beat.fract()).abs())).mul(step(0.001, c.kick));
  const edge = ca.abs();
  m.colorNode = skin.mul(sa.abs().mul(0.45).add(0.55)).add(mix(A, W, 0.5).mul(smoothstep(0.86, 1, edge)).mul(run.add(0.5)));
  return m;
}
