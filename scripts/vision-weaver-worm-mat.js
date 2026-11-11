// THE WEAVER's SILK-WORMS: round segmented bodies winding in depth through her web (params.n = 1..4), bent in the
// vertex stage; opaque black skin with neon, so a body hides what is behind it. Grow root to tip (u .55-.8), retract
// tip-first. Skin motion dealt per worm: 0 rides the body (worm 1 always), 1 pinned to the travelling wave, 2 runs back.
import { MeshBasicNodeMaterial, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, mix, atan2 } from "builtin/tsl";
import { tripClock, visionShown, visionU, stripes, inv, is, ioU } from "./lib/trip.js";

const TAU = 6.28318, LEN = 120;
export function material(ctx) {
  const n = Math.max(1, Math.round(ctx.params.n ?? 1)), sg = n % 2 ? 1 : -1, pair = n > 2 ? 1 : 0;
  const c = tripClock(ctx), u = visionU(ctx, c), live = visionShown(ctx, c, 0);
  const io = ioU(u), low = ctx.quality === "low";
  const rn = (k) => c.rnd(460 + k), pk = (k, m) => c.pick(460 + k, m);
  const fam = pk(0, 3), hot = pk(2, 4);
  const blue = vec3(0.05, 0.12, 1.0), violet = vec3(0.45, 0.05, 1.0), pink = vec3(1.0, 0.05, 0.6), ice = vec3(0.45, 0.6, 1.0), W = vec3(1, 1, 1);
  const A = blue.mul(is(fam, 0)).add(violet.mul(is(fam, 1))).add(blue.mul(is(fam, 2)));
  const B = violet.mul(is(fam, 0)).add(pink.mul(is(fam, 1))).add(ice.mul(is(fam, 2)));
  const H = pink.mul(is(hot, 0)).add(vec3(1.0, 0.85, 0.05).mul(is(hot, 1))).add(vec3(0.1, 1.0, 0.15).mul(is(hot, 2))).add(vec3(1.0, 0.42, 0.02).mul(is(hot, 3)));

  const uu = positionGeometry.y, ca = positionGeometry.x, sa = positionGeometry.z;
  const r0 = pair ? 2.6 : 3.4;
  const grow = io(0.55 + pair * 0.06, 0.8, 0.93 + pair * 0.004, 0.962);
  const exists = n === 4 ? step(0.5, rn(6)) : float(1);
  const tip = smoothstep(grow, grow.sub(0.06), uu);
  const seg = uu.mul(LEN / 4.2).fract().sub(0.5).abs().mul(-0.28).add(1);
  const rad = inv(uu).max(0).pow(0.4).mul(smoothstep(0, 0.03, uu).mul(0.6).add(0.4)).mul(r0).mul(seg).mul(tip.sqrt()).mul(live).mul(exists).mul(step(0.002, grow));
  const ph = pair * 2.3 + (sg > 0 ? 0 : 1.1), env = uu.mul(0.85).add(0.15);
  const w1 = uu.mul(8).sub(c.real.mul(1.1)).add(ph).sin().mul(env).mul(5);
  const w2 = uu.mul(6).sub(c.real.mul(0.8)).add(ph * 1.6).cos().mul(env).mul(4);
  const spine = pair
    ? vec3(uu.mul(-58).add(108).mul(sg).add(w1), uu.mul(50).sub(72).add(w2.mul(0.6)), uu.mul(66).sub(46).add(w2.mul(0.8)))
    : vec3(uu.mul(-62).add(80).mul(sg).add(w1), uu.mul(-92).add(70).add(w2.mul(0.6)), uu.mul(74).sub(42).add(w2.mul(0.8)));
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  m.positionNode = spine.add(vec3(ca.mul(rad), sa.mul(rad).mul(0.8), sa.mul(rad).mul(-0.6)));
  // the depth weave: the mid-body swings through the canvas planes, behind her and out in front (seeded per body)
  { const S = float(uu).clamp(0, 1), dz = step(0.5, c.rnd(391 + n)).mul(2).sub(1).mul(c.rnd(395 + n).mul(5).add(11));
    const turns = c.rnd(399 + n).mul(1.6).add(1.4).mul(3.14159);
    const weave = S.mul(turns).add(c.rnd(403 + n).mul(6.283)).add(c.real.mul(0.21 + 0.04 * n)).sin().mul(S.mul(float(1).sub(S)).mul(4)).mul(dz);
    m.positionNode = m.positionNode.add(vec3(0, 0, weave)); }

  const mode = n === 1 ? float(0) : c.pick(407 + n, 3);
  const ang = atan2(sa, ca.add(0.0001)), s = uu.mul(LEN).add(c.real.mul(5).mul(is(mode, 2).sub(is(mode, 1)))), rf = inv(uu).max(0).pow(0.4).mul(r0);
  // skin 1: op-art segment rings (black / white with the hue between) and a spiracle dot on each segment
  const sgI = s.div(4.2), sf = sgI.fract();
  const ringW = step(sf, 0.18).add(step(0.82, sf));
  const spir = low ? float(0) : smoothstep(0.55, 0.35, vec2(sf.sub(0.5).mul(4.2), ang.div(TAU).mul(4).fract().sub(0.5).mul(rf.mul(TAU / 4))).length());
  const cRing = mix(A.mul(stripes(s, 0.9, 0.05)).mul(0.55), W, ringW).add(H.mul(spir));
  // skin 2a: dew bead rows; 2b: diamond scales
  const row = s.div(2.4).floor();
  const bd = vec2(s.div(2.4).fract().sub(0.5).mul(2.4), ang.div(TAU).mul(7).add(row.mul(0.5)).fract().sub(0.5).mul(rf.mul(TAU / 7))).length();
  const brad = rf.mul(0.36).min(0.66);
  const cBe = mix(mix(B, W, 0.55), H, step(row.mod(4), 0.5)).mul(inv(smoothstep(brad.sub(0.08), brad, bd)));
  const tq = ang.div(TAU).mul(4);
  const cSc = mix(A, W, 0.3).mul(stripes(s.mul(0.28).add(tq), 1, 0.07).mul(stripes(s.mul(0.28).sub(tq), 1, 0.07)));
  const swap = pair ? inv(step(0.5, rn(7))) : step(0.5, rn(7));
  const t1 = 0.78 + pair * 0.03;
  const skin = mix(cRing, mix(cBe, cSc, swap), step(uu, smoothstep(t1, t1 + 0.1, u).mul(1.02)));
  const run = smoothstep(0.05, 0, uu.sub(c.beat.fract()).abs()).mul(step(0.001, c.kick));
  const edge = ca.abs();
  const lit = skin.mul(sa.abs().mul(0.45).add(0.55)).add(mix(A, W, 0.5).mul(smoothstep(0.86, 1, edge)).mul(run.add(0.5)));
  const dark = is(float(n), pk(8, 3).add(1)).mul(step(uu, smoothstep(0.85, 0.91, u).mul(1.02)));
  m.colorNode = mix(lit, mix(A, W, 0.5).mul(smoothstep(0.95, 1, edge)).mul(0.7), dark);
  return m;
}
