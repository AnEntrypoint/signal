// THE COSMIC EGG's serpents' kin (params.n 1..4): round opaque bodies swimming in depth round the egg. Each FOLLOWS ITS HEAD
// along a seeded Lissajous path (the body is the head's own past), so it really turns and changes direction, an undulation
// running down its length. 1 and 3 swim in front of the egg, 2 and 4 behind it. Skin: 1-2 ride the body (a real worm's);
// 3-4 are locked to world space (the body slides through standing stripes). Roll channels 970..979.
import { MeshBasicNodeMaterial, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, mix, atan2 as atan2raw } from "builtin/tsl";
import { tripClock, visionShown, visionU, stripes, inv, is, ioU, sgn } from "./lib/trip.js";
const atan2 = (y, x) => atan2raw(y, x.add(1e-5));
const TAU = 6.28318;
export function material(ctx) {
  const n = Math.max(1, Math.min(4, Math.round(ctx.params.n ?? 1))), frontW = n % 2 === 1, world = n > 2;
  const c = tripClock(ctx), u = visionU(ctx, c), live = visionShown(ctx, c, 0), io = ioU(u), low = ctx.quality === "low";
  const rn = (k) => c.rnd(960 + k), pk = (k, m) => c.pick(960 + k, m);
  const fam = pk(0, 3), hot = pk(1, 4);
  const blue = vec3(0.05, 0.12, 1.0), violet = vec3(0.45, 0.05, 1.0), ice = vec3(0.45, 0.6, 1.0), W = vec3(1, 1, 1);
  const A = blue.mul(is(fam, 0)).add(violet.mul(is(fam, 1))).add(blue.mul(is(fam, 2)));
  const B = violet.mul(is(fam, 0)).add(blue.mul(is(fam, 1))).add(ice.mul(is(fam, 2)));
  const HOT = [vec3(1.0, 0.06, 0.6), vec3(1.0, 0.42, 0.02), vec3(1.0, 0.85, 0.05), vec3(0.1, 1.0, 0.15)];
  const hotC = (k) => HOT.reduce((acc, v, i) => acc.add(v.mul(is(k, i))), vec3(0));
  const H = hotC(hot), H2 = hotC(hot.add(pk(2, 3)).add(1).mod(4));

  const uu = positionGeometry.y, ca = positionGeometry.x, sa = positionGeometry.z;
  const r0 = world ? 1.7 : 2.4;
  const grow = io(0.52 + n * 0.03, 0.78, 0.86 + n * 0.012, 0.94 + n * 0.008);
  const tip = inv(smoothstep(grow.sub(0.07), grow, uu));
  const rad = inv(uu).max(1e-4).sqrt().mul(r0).mul(tip.clamp(0, 1).max(1e-4).sqrt()).mul(live).mul(step(0.002, grow));
  // the head's path; the body trails it by phase
  const dirS = sgn(rn(10 + n)), ph = rn(14 + n).mul(TAU);
  const tau = c.real.mul(0.16 + n * 0.035).mul(dirS).add(ph).sub(uu.mul(1.9).mul(dirS));
  const wv = uu.mul(11).sub(c.real.mul(1.6)).add(n).sin().mul(uu.mul(0.8).add(0.2)).mul(2.2);   // undulation down the length
  const zc = frontW ? 12 : -6, za = frontW ? 7 : 3;
  const spine = vec3(tau.mul(n % 2 ? 1 : 1.3).sin().mul(world ? 46 : 38).add(wv.mul(0.5)),
    tau.mul(n % 2 ? 1.7 : 0.8).add(n * 1.3).sin().mul(world ? 25 : 19).sub(3).add(wv),
    tau.mul(0.9).add(n).cos().mul(za).add(zc));
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  m.positionNode = spine.add(vec3(ca.mul(rad), sa.mul(rad).mul(0.8), sa.mul(rad).mul(-0.6)));

  const ang = atan2(sa, ca), rf = inv(uu).max(1e-4).sqrt().mul(r0);
  // 1-2: skin fixed to the body. 3-4: skin read from where the body IS in the world, so it swims through its own pattern
  const s = world ? spine.x.mul(0.75).add(spine.y.mul(0.66)) : uu.mul(90);
  const sk3 = s.mul(0.35).floor().add(90).mod(3);
  const cStr = A.mul(is(sk3, 0)).add(B.mul(is(sk3, 1))).add(H2.mul(0.85).mul(is(sk3, 2))).mul(stripes(s, 0.35, 0.04));
  const row = s.div(2.2).floor();
  const bd = vec2(s.div(2.2).fract().sub(0.5).mul(2.2), ang.div(TAU).mul(6).add(row.mul(0.5)).fract().sub(0.5).mul(rf.mul(TAU / 6))).length();
  const brad = rf.mul(0.4).min(0.65), r3 = row.add(90).mod(3);
  const cBe = mix(mix(B, W, 0.3), H, is(r3, 0)).mul(inv(is(r3, 1))).add(H2.mul(is(r3, 1))).mul(inv(smoothstep(brad.sub(0.08), brad, bd)));
  const skin = low ? cStr : mix(cStr, cBe, step(0.5, rn(18 + (n > 2 ? 1 : 0))).mul(n % 2 ? 1 : -1).add(n % 2 ? 0 : 1));
  const run = low ? float(0) : inv(smoothstep(0, 0.05, uu.sub(c.beat.fract()).abs())).mul(step(0.001, c.kick));
  const edge = ca.abs();
  const lit = skin.mul(sa.abs().mul(0.45).add(0.55)).add(mix(A, W, 0.5).mul(smoothstep(0.86, 1, edge)).mul(run.add(0.5)));
  // late, one of the four goes dark: a black body with a lit rim, pure occlusion
  const dark = is(float(n), pk(9, 4).add(1)).mul(step(uu, smoothstep(0.62, 0.72, u).mul(1.02)));
  m.colorNode = mix(lit, mix(A, W, 0.5).mul(smoothstep(0.93, 1, edge)).mul(0.7), dark);
  return m;
}
