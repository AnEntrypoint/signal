// THE STAR CHILD's comet worms (params.n 1..4): round opaque bodies looping in depth through the nursery.
// Skin uv mode, dealt per worm by the roll (1..3 always one of each): 0 rides the body (stripes travel with it, a real worm's),
// 1 pinned to the path (the body slides through its stripes), 2 reversed (skin runs back by the distance travelled).
import { MeshBasicNodeMaterial, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, mix, atan2 } from "builtin/tsl";
import { tripClock, visionShown, visionU, stripes, inv, is, ioU } from "./lib/trip.js";

const TAU = 6.28318, LEN = 120;
export function material(ctx) {
  const n = Math.max(1, Math.round(ctx.params.n ?? 1)), sg = n % 2 ? -1 : 1, top = n > 2 ? 1 : 0;
  const c = tripClock(ctx), u = visionU(ctx, c), live = visionShown(ctx, c, 0);
  const io = ioU(u), low = ctx.quality === "low";
  const rn = (k) => c.rnd(380 + k), pk = (k, m) => c.pick(380 + k, m);
  const fam = pk(0, 4), hot = pk(18, 3);
  const BLU = vec3(0.007, 0.014, 1.0), VIO = vec3(0.195, 0.007, 1.0), PNK = vec3(1.0, 0.005, 0.318), ORA = vec3(1.0, 0.144, 0.0015),
    YEL = vec3(1.0, 0.693, 0.004), GRN = vec3(0.01, 1.0, 0.019), W = vec3(1, 1, 1);
  const A = BLU.mul(is(fam, 0)).add(VIO.mul(is(fam, 1))).add(BLU.mul(is(fam, 2))).add(PNK.mul(is(fam, 3)));
  const B = VIO.mul(is(fam, 0)).add(PNK.mul(is(fam, 1))).add(GRN.mul(is(fam, 2))).add(ORA.mul(is(fam, 3)));
  const H = PNK.mul(is(hot, 0)).add(YEL.mul(is(hot, 1))).add(GRN.mul(is(hot, 2)));

  const uu = positionGeometry.y, ca = positionGeometry.x, sa = positionGeometry.z;
  const r0 = top ? 2.8 : 3.6;
  const count = pk(15, 3).add(2);
  const exists = step(float(n), count.add(0.1));
  const grow = io(0.55 + top * 0.04, 0.8, 0.93 + top * 0.004, 0.965);
  const tipc = smoothstep(grow, grow.sub(0.06), uu);
  const capx = uu.sub(0.9).div(0.1).clamp(0, 1);
  const prof = uu.pow(0.7).mul(0.7).add(0.3).mul(inv(capx.mul(capx)).max(0).sqrt());
  const rad = prof.mul(r0).mul(tipc.sqrt()).mul(live).mul(exists).mul(step(0.002, grow));
  const ph = top * 2.3 + (sg > 0 ? 0 : 1.1), env = uu.mul(0.7).add(0.3);
  const w1 = uu.mul(8).sub(c.real.mul(1.1)).add(ph).sin().mul(env).mul(4);
  const w2 = uu.mul(6).sub(c.real.mul(0.7)).add(ph * 1.6).cos().mul(env).mul(3.5);
  const ls = step(0.5, rn(14)).mul(2).sub(1);
  const la = uu.mul(TAU).mul(ls).add(ph), lr = uu.mul(3.1416).sin().mul(13);
  const base = top
    ? vec3(uu.mul(-78).add(108).mul(sg), uu.mul(-42).add(62), uu.mul(70).sub(45))
    : vec3(uu.mul(-74).add(104).mul(sg), uu.mul(50).sub(66), uu.mul(75).sub(45));
  const spine = base.add(vec3(la.cos().mul(lr).mul(sg).add(w1), la.sin().mul(lr).mul(0.45).add(w2.mul(0.6)), la.sin().mul(lr).add(w2.mul(0.8))));
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  m.positionNode = spine.add(vec3(ca.mul(rad), sa.mul(rad).mul(0.8), sa.mul(rad).mul(-0.6)));
  { const S = float(uu).clamp(0, 1), dz = step(0.5, c.rnd(391 + n)).mul(2).sub(1).mul(c.rnd(395 + n).mul(5).add(11));
    const turns = c.rnd(399 + n).mul(1.6).add(1.4).mul(3.14159);
    const weave = S.mul(turns).add(c.rnd(403 + n).mul(6.283)).add(c.real.mul(0.21 + 0.04 * n)).sin().mul(S.mul(float(1).sub(S)).mul(4)).mul(dz);
    m.positionNode = m.positionNode.add(vec3(0, 0, weave)); }

  const mode = n < 4 ? c.pick(752, 3).add(n - 1).mod(3) : c.pick(753, 3);
  const trav = grow.mul(LEN).add(c.real.mul(c.rnd(753 + n).mul(3).add(4)));
  const ang = atan2(sa, ca.add(0.0001)), s = uu.mul(LEN).sub(trav.mul(is(mode, 0))).add(trav.mul(is(mode, 2))), rf = prof.mul(r0).max(0.4);
  const cStr = mix(mix(A, W, 0.15), B, s.mul(0.4).floor().mod(2)).mul(stripes(s, 0.4, 0.05));
  const row = s.div(2.2).floor();
  const bd = vec2(s.div(2.2).fract().sub(0.5).mul(2.2), ang.div(TAU).mul(7).add(row.mul(0.5)).fract().sub(0.5).mul(rf.mul(TAU / 7))).length();
  const brad = rf.mul(0.38).min(0.75);
  const cBe = mix(mix(B, W, 0.45), H, step(row.mod(3), 0.5)).mul(inv(smoothstep(brad.sub(0.1), brad, bd)));
  const t = ang.div(TAU).mul(4);
  const cSc = mix(A, W, 0.3).mul(stripes(s.mul(0.28).add(t), 1, 0.07).mul(stripes(s.mul(0.28).sub(t), 1, 0.07)));
  const swap = top ? inv(step(0.5, rn(16))) : step(0.5, rn(16));
  const t1 = 0.8 + top * 0.02;
  const skin = mix(cStr, (low ? cSc : mix(cBe, cSc, swap)), step(uu, smoothstep(t1, t1 + 0.08, u).mul(1.02)));
  const headM = smoothstep(0.86, 0.9, uu);
  const headC = mix(H, W, capx.mul(0.6)).mul(stripes(s, 0.9, 0.08).mul(0.5).add(0.6));
  const run = low ? float(0) : float(1).sub(smoothstep(0, 0.05, uu.sub(c.beat.fract()).abs())).mul(step(0.001, c.kick));
  const edge = ca.abs();
  const lit = mix(skin, headC, headM).mul(sa.abs().mul(0.45).add(0.55)).add(mix(A, W, 0.5).mul(smoothstep(0.86, 1, edge)).mul(run.add(0.4)));
  const darkOne = pk(17, 2).add(1).add(top * 2);
  const dark = is(float(n), darkOne).mul(step(uu, io(0.86, 0.9, 0.93, 0.95).mul(1.02)));
  m.colorNode = mix(lit, mix(A, W, 0.5).mul(smoothstep(0.94, 1, edge)).mul(0.8), dark);
  return m;
}
