// THE EYE PYRAMID's feathered serpents (params.n 1..4): round opaque bodies swimming a looping course in depth.
// 1-2 swim IN FRONT of the pyramid (z +3..+18), 3-4 BEHIND it (z -3..-25). Each follows its own head round a
// Lissajous course (so it truly turns and doubles back) with a wave and a swallowed bulge running down its length.
// Skin: 1-2 static to the body (a real worm's), 3-4 locked to world space (the body slides through its stripes).
import { MeshBasicNodeMaterial, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, mix, atan2 as atan2raw } from "builtin/tsl";
import { tripClock, visionShown, visionU, stripes, inv, is, ioU, NEON } from "./lib/trip.js";
const atan2 = (y, x) => atan2raw(y, x.add(1e-5));
const TAU = 6.28318, LEN = 70;
//          z0   zAmp  y0   X   Y   r0   in    speed  fy
const ROW = [[6, 3, -7, 50, 15, 2.0, 0.55, 0.17, 1.7], [15, 3, 5, 44, 17, 1.5, 0.62, -0.13, 2.3], [-6, 3, 4, 52, 19, 2.6, 0.58, -0.15, 1.3], [-20, 5, -4, 62, 24, 3.3, 0.66, 0.11, 2.1]];
export function material(ctx) {
  const n = Math.min(4, Math.max(1, Math.round(ctx.params.n ?? 1)));
  const [z0, zA, y0, X, Y, r0, tIn, spd, fy] = ROW[n - 1];
  const c = tripClock(ctx), u = visionU(ctx, c), live = visionShown(ctx, c, 0);
  const io = ioU(u), low = ctx.quality === "low";
  const rn = (k) => c.rnd(980 + k), pk = (k, m) => c.pick(980 + k, m);
  const fam = pk(0, 3), hot = pk(1, 4), W = NEON.W, ice = vec3(0.3, 0.5, 1.0);
  const A = mix(NEON.BLU, NEON.VIO, is(fam, 1)), B = NEON.VIO.mul(is(fam, 0)).add(NEON.BLU.mul(is(fam, 1))).add(ice.mul(is(fam, 2)));
  const HOT = [NEON.PNK, NEON.ORA, NEON.YEL, NEON.GRN];
  const hotC = (k) => HOT.reduce((acc, v, i) => acc.add(v.mul(is(k, i))), vec3(0));
  const H = hotC(hot), H2 = hotC(hot.add(pk(16, 3)).add(1).mod(4));

  const uu = positionGeometry.y, ca = positionGeometry.x, sa = positionGeometry.z;
  // which pair arrives first is the roll's; last in, first out
  const late = (n > 2 ? inv(step(0.5, rn(17))) : step(0.5, rn(17))).mul(0.05);
  const grow = smoothstep(late.add(tIn), late.add(tIn + 0.14), u).mul(inv(smoothstep(float(0.9).sub(late), float(0.95).sub(late), u)));
  const tip = inv(smoothstep(grow.sub(0.07), grow, uu));
  const bulge = uu.mul(16).sub(c.real.mul(3.2)).sin().mul(0.22).add(1);            // a pulse travelling down the body
  const rad = inv(uu).max(1e-4).sqrt().mul(r0).mul(bulge).mul(tip.clamp(0, 1).max(1e-4).sqrt()).mul(live).mul(step(0.002, grow));
  const dir = step(0.5, rn(18)).mul(2).sub(1);
  const th = c.real.mul(spd).mul(dir).add(rn(14 - n).mul(TAU)).add(n * 1.9).sub(uu.mul(1.5));   // the head leads, the body follows its course
  const env = uu.mul(0.8).add(0.2);
  const wave = uu.mul(13).sub(c.real.mul(2.6)).add(n).sin().mul(env).mul(1.8);
  const spine = vec3(th.sin().mul(X).add(th.mul(3.1).sin().mul(6)), th.mul(fy).add(n).sin().mul(Y).add(y0).add(wave), th.mul(0.7).cos().mul(zA).add(z0).add(wave.mul(0.3)));
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  m.positionNode = spine.add(vec3(ca.mul(rad), sa.mul(rad).mul(0.8), sa.mul(rad).mul(-0.6)));

  const ang = atan2(sa, ca), rf = inv(uu).max(1e-4).sqrt().mul(r0);
  const s = n > 2 ? spine.x.add(spine.y).mul(0.75) : uu.mul(LEN);
  const sk3 = s.mul(0.35).floor().mod(3);
  const cStr = A.mul(is(sk3, 0)).add(B.mul(is(sk3, 1))).add(H2.mul(0.85).mul(is(sk3, 2))).mul(stripes(s, 0.35, 0.04));
  const row = s.div(2.4).floor();
  const bd = vec2(s.div(2.4).fract().sub(0.5).mul(2.4), ang.div(TAU).mul(6).add(row.mul(0.5)).fract().sub(0.5).mul(rf.mul(TAU / 6))).length();
  const brad = rf.mul(0.4).min(0.7);
  const cBe = mix(mix(B, W, 0.3), H, step(row.mod(3), 0.5)).mul(inv(smoothstep(brad.sub(0.08), brad, bd)));
  const t = ang.div(TAU).mul(3);
  const cSc = mix(H, W, 0.2).mul(stripes(s.mul(0.3).add(t), 1, 0.06).mul(stripes(s.mul(0.3).sub(t), 1, 0.06)));
  // late detail: the skin changes down the body, head first
  const skin = mix(cStr, low ? cSc : mix(cBe, cSc, n % 2 ? step(0.5, rn(15)) : inv(step(0.5, rn(15)))), step(uu, smoothstep(0.74 + n * 0.012, 0.82 + n * 0.012, u).mul(1.02)));
  const run = low ? float(0) : inv(smoothstep(0, 0.05, uu.sub(c.beat.fract()).abs())).mul(step(0.001, c.kick));
  const edge = ca.abs();
  m.colorNode = skin.mul(sa.abs().mul(0.45).add(0.55)).add(mix(A, W, 0.5).mul(smoothstep(0.86, 1, edge)).mul(run.add(0.5)));
  return m;
}
