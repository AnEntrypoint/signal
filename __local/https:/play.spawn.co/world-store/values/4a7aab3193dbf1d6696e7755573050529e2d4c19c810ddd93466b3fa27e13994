// THE FLOWER OF LIFE's compass worms (params.n 1..4): round opaque bodies swimming in depth through the gate.
// 1, 3 swim in FRONT of the flower, 2, 4 BEHIND it. Skin: 1-2 static to the body (a real worm's, it travels with the flesh);
// 3-4 locked to space (the body slides and undulates through stripes that stand still). They swim, slow, and turn back.
import { MeshBasicNodeMaterial, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, mix, atan2 as atan2raw } from "builtin/tsl";
import { tripClock, visionShown, visionU, inv, is, ioU } from "./lib/trip.js";
const atan2 = (y, x) => atan2raw(y, x.add(1e-5));

const TAU = 6.28318, LEN = 100;
export function material(ctx) {
  const n = Math.max(1, Math.round(ctx.params.n ?? 1)), sg = n % 2 ? 1 : -1, pair = n > 2 ? 1 : 0, front = n % 2;
  const c = tripClock(ctx), u = visionU(ctx, c), live = visionShown(ctx, c, 0), t = c.real;
  const io = ioU(u), low = ctx.quality === "low";
  const rn = (k) => c.rnd(920 + k), pk = (k, m) => c.pick(920 + k, m);
  const fam = pk(0, 3), hot = pk(1, 4), W = vec3(1, 1, 1);
  const blue = vec3(0.05, 0.12, 1.0), violet = vec3(0.45, 0.05, 1.0), green = vec3(0.05, 1.0, 0.3), pink = vec3(1.0, 0.06, 0.6);
  const A = blue.mul(is(fam, 0)).add(green.mul(is(fam, 1))).add(violet.mul(is(fam, 2)));
  const B = violet.mul(is(fam, 0)).add(blue.mul(is(fam, 1))).add(pink.mul(is(fam, 2)));
  const HOT = [vec3(1.0, 0.42, 0.02), vec3(1.0, 0.85, 0.05), vec3(1.0, 0.06, 0.6), vec3(0.1, 1.0, 0.15)];
  const hotC = (k) => HOT.reduce((acc, v, i) => acc.add(v.mul(is(k, i))), vec3(0));
  const H = hotC(hot), H2 = hotC(hot.add(pk(2, 3)).add(1).mod(4));

  const uu = positionGeometry.y, ca = positionGeometry.x, sa = positionGeometry.z;
  const r0 = front ? 2.0 : 3.0;
  const grow = io(0.52 + pair * 0.04, 0.72 + pair * 0.03, 0.87, 0.92 - pair * 0.01);
  const tipM = inv(smoothstep(grow.sub(0.07), grow, uu));
  const rad = inv(uu).max(1e-4).sqrt().mul(r0).mul(tipM.clamp(0, 1).max(1e-4).sqrt()).mul(live).mul(step(0.002, grow));
  // the swim: the wave's phase runs forward, stalls and runs back (its rate changes sign), and the whole body slides with it
  const ph = n * 1.9, rate = 0.3 + n * 0.07;
  const swim = t.mul(1.1).add(t.mul(rate).add(ph).sin().mul(1.1 / rate * 1.35)).mul(rn(13 + n).mul(0.5).add(0.75));
  const env = uu.mul(0.8).add(0.2);
  const w1 = uu.mul(9).sub(swim).add(ph).sin().mul(env).mul(5);
  const w2 = uu.mul(6).sub(swim.mul(0.7)).add(ph * 1.7).cos().mul(env).mul(4);
  const slide = t.mul(rate).add(ph).cos().mul(9);
  // heading turns slowly: the path swings about the gate
  const yaw = t.mul(0.11).add(ph).sin().mul(0.5).add(n * 0.8 + 0.3), cy = yaw.cos(), sy = yaw.sin();
  const along = uu.mul(-150).add(88).add(slide).mul(sg), across = w1.add(pair ? 14 : -12);
  const z = front ? uu.mul(10).add(5).add(w2.mul(0.6)) : uu.mul(-14).sub(6).add(w2.mul(0.6));
  const spine = vec3(along.mul(cy).sub(across.mul(sy)), along.mul(sy).add(across.mul(cy)), z);
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  m.positionNode = spine.add(vec3(ca.mul(rad).mul(sy.negate()).add(sa.mul(rad).mul(-0.3)), ca.mul(rad).mul(cy), sa.mul(rad)));

  // skin coordinate: body-static (1-2) or space-locked (3-4: read off where the spine stands)
  const s = pair ? along.mul(sg).add(across.mul(0.35)) : uu.mul(LEN);
  const ang = atan2(sa, ca), rf = inv(uu).max(1e-4).sqrt().mul(r0);
  const sk3 = s.mul(0.3).add(300).floor().mod(3);
  const f = s.mul(0.3).add(300).fract();
  const cStr = A.mul(is(sk3, 0)).add(B.mul(is(sk3, 1))).add(H2.mul(0.85).mul(is(sk3, 2))).mul(smoothstep(0.46, 0.5, f).mul(inv(smoothstep(0.96, 1, f))));
  const row = s.div(2.4).add(300).floor();
  const bd = vec2(s.div(2.4).add(300).fract().sub(0.5).mul(2.4), ang.div(TAU).mul(6).add(row.mul(0.5)).fract().sub(0.5).mul(rf.mul(TAU / 6))).length();
  const brad = rf.mul(0.4).min(0.7);
  const cBe = mix(mix(B, W, 0.3), H, step(row.mod(3), 0.5)).mul(inv(smoothstep(brad.sub(0.08), brad, bd)));
  const skin = low ? cStr : mix(cStr, cBe, step(0.5, rn(8 + pair)));
  const run = low ? float(0) : inv(smoothstep(0, 0.05, uu.sub(c.beat.fract()).abs())).mul(step(0.001, c.kick));
  const edge = ca.abs();
  const lit = skin.mul(sa.abs().mul(0.45).add(0.55)).add(mix(A, W, 0.5).mul(smoothstep(0.86, 1, edge)).mul(run.add(0.5)));
  // late, one dealt worm goes dark from the tail: a black body with a lit rim, occluding what it crosses
  const dark = is(float(n), pk(10, 4).add(1)).mul(step(uu, smoothstep(0.74, 0.84, u).mul(1.02)));
  m.colorNode = mix(lit, mix(A, W, 0.5).mul(smoothstep(0.93, 1, edge)).mul(0.7), dark);
  return m;
}
