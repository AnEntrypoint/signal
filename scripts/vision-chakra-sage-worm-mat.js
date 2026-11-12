// THE CHAKRA SAGE's kundalini worms (params.n 1..4): round opaque bodies that SWIM: every ring of the body follows the path its
// head took (a slow Lissajous, so they keep turning), with a wave running down the length. 1 and 3 swim in front of the sage,
// 2 and 4 behind. Skin: 1-2 static on the body (a real worm's), 3-4 locked to world space (the body slides through its stripes).
import { MeshBasicNodeMaterial, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, mix, atan2 as atan2raw } from "builtin/tsl";
import { tripClock, visionShown, visionU, stripes, inv, is, sgn, ioU, NEON } from "./lib/trip.js";
const atan2 = (y, x) => atan2raw(y, x.add(1e-5));

const TAU = 6.28318, LEN = 46;
export function material(ctx) {
  const n = Math.max(1, Math.round(ctx.params.n ?? 1)), back = n % 2 ? 0 : 1, wl = n > 2 ? 1 : 0;
  const c = tripClock(ctx), u = visionU(ctx, c), live = visionShown(ctx, c, 0);
  const io = ioU(u), low = ctx.quality === "low";
  const rn = (k) => c.rnd(1000 + k), pk = (k, m) => c.pick(1000 + k, m);
  const fam = pk(0, 3), hot = pk(1, 4), W = NEON.W, ice = vec3(0.25, 0.5, 1.0);
  const A = mix(NEON.BLU, NEON.VIO, is(fam, 1)), B = NEON.VIO.mul(is(fam, 0)).add(NEON.BLU.mul(is(fam, 1))).add(ice.mul(is(fam, 2)));
  const HOT = [NEON.PNK, NEON.ORA, NEON.YEL, NEON.GRN];
  const hotC = (k) => HOT.reduce((acc, v, i) => acc.add(v.mul(is(k, i))), vec3(0));
  const H = hotC(hot), H2 = hotC(hot.add(pk(16, 3)).add(1).mod(4));

  const uu = positionGeometry.y, ca = positionGeometry.x, sa = positionGeometry.z;
  const r0 = back ? 2.5 : 1.9;
  const grow = io(0.5 + wl * 0.06, 0.78, 0.9 - wl * 0.02, 0.95 - wl * 0.02);
  const exists = n === 4 ? step(0.35, rn(17)) : float(1);
  const tip = inv(smoothstep(grow.sub(0.07), grow, uu));
  const rad = inv(uu).max(1e-4).sqrt().mul(r0).mul(tip.clamp(0, 1).max(1e-4).sqrt()).mul(live).mul(exists).mul(step(0.002, grow));
  // the head's path at time tau; ring uu passed there (uu * lag) seconds ago
  const ph = n * 1.9, dir = sgn(rn(17 + n)), tau = c.real.mul(dir).sub(uu.mul(5.5)).add(rn(18).mul(40));
  const wave = uu.mul(13).sub(c.real.mul(3.2)).add(ph).sin().mul(uu.mul(0.8).add(0.2)).mul(1.5);
  const spine = vec3(
    tau.mul(0.19).add(ph).sin().mul(34).add(tau.mul(0.47).add(ph).sin().mul(6)),
    tau.mul(0.31).add(ph * 1.7).sin().mul(13).add(back ? 3 : -3).add(wave),
    tau.mul(0.23).add(ph).sin().mul(back ? 2.5 : 5).add(back ? -6.5 : 11));
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  m.positionNode = spine.add(vec3(ca.mul(rad).mul(0.3), ca.mul(rad), sa.mul(rad).mul(0.6)).add(vec3(sa.mul(rad).mul(0.9), 0, 0)));

  const ang = atan2(sa, ca), rf = inv(uu).max(1e-4).sqrt().mul(r0);
  const s = wl ? spine.x.mul(0.8).add(spine.y.mul(0.6)) : uu.mul(LEN);
  const sk3 = s.mul(0.4).floor().add(64).mod(3);
  const cStr = A.mul(is(sk3, 0)).add(B.mul(is(sk3, 1))).add(H2.mul(0.85).mul(is(sk3, 2))).mul(stripes(s, 0.4, 0.04));
  const row = s.div(2).floor().add(64);
  const bd = vec2(s.div(2).fract().sub(0.5).mul(2), ang.div(TAU).mul(6).add(row.mul(0.5)).fract().sub(0.5).mul(rf.mul(TAU / 6))).length();
  const brad = rf.mul(0.4).min(0.6);
  const cBe = mix(mix(B, W, 0.3), H, step(row.mod(3), 0.5)).mul(inv(smoothstep(brad.sub(0.08), brad, bd)));
  // late: the skin changes from stripes to beads, head to tail
  const skin = low ? cStr : mix(cStr, cBe, step(uu, smoothstep(0.78 + wl * 0.03, 0.86 + wl * 0.03, u).mul(1.02)));
  const run = low ? float(0) : inv(smoothstep(0, 0.05, uu.sub(c.beat.fract()).abs())).mul(step(0.001, c.kick));
  const edge = ca.abs();
  m.colorNode = skin.mul(sa.abs().mul(0.45).add(0.55)).add(mix(A, W, 0.5).mul(smoothstep(0.86, 1, edge)).mul(run.add(0.5)));
  return m;
}
