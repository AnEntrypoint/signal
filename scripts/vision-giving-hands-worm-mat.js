// THE GIVING HANDS' DRIP-WORMS (params.n = 1..4): round bodies winding in depth, OPAQUE BLACK with a neon rim
// (edge = body normal against the view), so they block what is behind. n 1, 2 hang from the top corners behind the
// pool and end nearer than the hands; n 3, 4 (dealt by the seed) rise up the far sides. Grow root to tip (u .55-.8)
// with a drop of light at the tip, retract tip-first on the exit. Skin modes on the black (seeded, swapping tip-first
// at u .8): rim only | bead rows | hairline hoops. Channels (K=7): 340 hue, 347 count, 348 skin, 353 dark one, 357 hot.
import { MeshBasicNodeMaterial, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, vec4, smoothstep, step, mix, atan2, varying, modelWorldMatrix, cameraPosition } from "builtin/tsl";
import { tripClock, visionShown, visionU, inv, is, ioU, NEON } from "./lib/trip.js";

const TAU = 6.28318, LEN = 120;
export function material(ctx) {
  const low = ctx.quality === "low";
  const n = Math.max(1, Math.round(ctx.params.n ?? 1)), sg = n % 2 ? 1 : -1, pair = n > 2 ? 1 : 0;
  const c = tripClock(ctx), u = visionU(ctx, c), live = visionShown(ctx, c, 0), io = ioU(u);
  const rn = (k) => c.rnd(340 + k), pk = (k, m) => c.pick(340 + k, m);
  const fam = pk(0, 4), hot = pk(17, 3), W = NEON.W;
  const even = is(fam, 0).add(is(fam, 2)), odd = inv(even);
  const A = NEON.BLU.mul(even).add(NEON.VIO.mul(odd)), B = NEON.VIO.mul(even).add(NEON.BLU.mul(odd));
  const H = NEON.PNK.mul(is(hot, 0)).add(NEON.YEL.mul(is(hot, 1))).add(NEON.ORA.mul(is(hot, 2)));

  const uu = positionGeometry.y.clamp(0, 1), ca = positionGeometry.x, sa = positionGeometry.z;
  const r0 = pair ? 2.3 : 3.4;
  const grow = io(0.55 + pair * 0.05, 0.8, 0.94, 0.965 - pair * 0.01);
  const exists = pair ? step(0.5, rn(7)) : float(1);
  const tip = inv(smoothstep(grow.sub(0.06), grow, uu));
  const rf = inv(uu.mul(0.85)).max(0.0001).pow(0.6).mul(r0);
  const rad = rf.mul(tip.max(0).sqrt()).mul(live).mul(exists).mul(step(0.002, grow));
  const ph = pair * 2.3 + (sg > 0 ? 0 : 1.1), env = uu.mul(0.85).add(0.15);
  const w1 = uu.mul(8).sub(c.real.mul(1.1)).add(ph).sin().mul(env).mul(6);
  const w2 = uu.mul(6).sub(c.real.mul(0.75)).add(ph * 1.6).cos().mul(env).mul(4.5);
  const bow = uu.mul(3.1416).sin();
  const spine = pair
    ? vec3(uu.mul(-34).add(92).mul(sg).add(w1).add(bow.mul(-6 * sg)), uu.mul(112).sub(72).add(w2.mul(0.6)), uu.mul(70).sub(45).add(w2.mul(0.7)))
    : vec3(uu.mul(-66).add(84).mul(sg).add(w1).add(bow.mul(10 * sg)), uu.mul(-112).add(76).add(w2.mul(0.6)), uu.mul(78).sub(48).add(w2.mul(0.8)));
  // THE DEPTH WEAVE: the mid-body swings through the canvas planes, behind the being and out in front of it
  const dz = step(0.5, c.rnd(391 + n)).mul(2).sub(1).mul(c.rnd(395 + n).mul(5).add(11));
  const turns = c.rnd(399 + n).mul(1.6).add(1.4).mul(3.14159);
  const weave = uu.mul(turns).add(c.rnd(403 + n).mul(TAU)).add(c.real.mul(0.21 + 0.04 * n)).sin().mul(uu.mul(inv(uu)).mul(4)).mul(dz);
  const nrm = vec3(ca, sa.mul(0.8), sa.mul(-0.6));
  const pos = spine.add(nrm.mul(rad)).add(vec3(0, 0, weave));
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  m.positionNode = pos;

  // THE RIM: the round body's normal (taken off the spine's run) against the eye; 1 at the silhouette
  const T = pair ? [-34 * sg, 112, 70] : [-66 * sg, -112, 78], tl = Math.hypot(T[0], T[1], T[2]);
  const tv = vec3(T[0] / tl, T[1] / tl, T[2] / tl);
  const nO = nrm.sub(tv.mul(nrm.dot(tv)));
  const nW = varying(modelWorldMatrix.mul(vec4(nO, 0)).xyz), vW = varying(cameraPosition.sub(modelWorldMatrix.mul(vec4(pos, 1)).xyz));
  const facing = nW.dot(vW).div(nW.length().mul(vW.length()).max(0.0001)).abs();
  const rim = inv(smoothstep(0.34, 0.6, facing));

  const ang = atan2(sa, ca.add(0.0001)).div(TAU), s = uu.mul(LEN), face = smoothstep(0.55, 0.75, facing);
  const run = inv(smoothstep(0, 0.05, uu.sub(c.beat.fract()).abs())).mul(step(0.001, c.kick));
  // skins on the black: 0 rim only, 1 bead rows, 2 hairline hoops sliding down
  const row = s.div(3.2).floor(), nA = low ? 4 : 6;
  const bd = vec2(s.div(3.2).fract().sub(0.5).mul(3.2), ang.mul(nA).add(row.mul(0.5)).fract().sub(0.5).mul(rf.mul(TAU / nA))).length();
  const brad = rf.mul(0.3).min(0.7);
  const beads = mix(mix(B, W, 0.45), H, step(row.mod(3), 0.5)).mul(inv(smoothstep(brad.sub(0.12), brad, bd)));
  const hoops = A.mul(1.1).mul(step(s.mul(0.36).sub(c.real.mul(0.5)).fract(), 0.14));
  const skinOf = (k) => beads.mul(is(k, 1)).add(hoops.mul(is(k, 2)));
  const m0 = pk(8, 3).add(pair).mod(3), m1 = m0.add(1).mod(3);
  const t1 = 0.8 + pair * 0.03;
  const dark = is(float(n), step(0.5, rn(13)).add(1)).mul(step(uu, smoothstep(0.85, 0.91, u).mul(1.02)));
  const skin = mix(skinOf(m0), skinOf(m1), step(inv(uu), smoothstep(t1, t1 + 0.08, u).mul(1.02))).mul(face).mul(inv(dark));
  const drop = smoothstep(grow.sub(0.07), grow.sub(0.015), uu);
  const rimCol = mix(A, W, 0.35).mul(run.mul(0.7).add(0.9));
  m.colorNode = mix(mix(skin, rimCol, rim), mix(H, W, 0.55).mul(1.3), drop);
  return m;
}
