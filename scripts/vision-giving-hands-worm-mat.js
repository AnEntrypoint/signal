// THE GIVING HANDS' DRIP-WORMS: long dripping fingers, real round bodies winding in depth (params.n = 1..4).
// n 1, 2: hang out of the top corners from behind the ripple pool (z -48), swing down outside the ring, cross in
// front of the wrists and end 30 m nearer the camera than the hands, out of the bottom of the frame.
// n 3, 4 (dealt by the seed): thinner, rising from the bottom corners up the far sides.
// Opaque black skin with neon on it: the body hides what is behind it. Grows root to tip (u .55-.8) with a drop of
// light at its growing tip; skin turns from op-art stripes to bead rows or diamond scales (.8-.88) travelling down
// the body; one worm goes pure black with a thin rim at the culmination; all retract tip-first on the exit.
// Channels (shared with the scene, K=7): 340 hue, 347 count, 348 second skin, 353 which goes dark, 357 hot.
import { MeshBasicNodeMaterial, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, mix, atan2 } from "builtin/tsl";
import { tripClock, visionShown, visionU, stripes } from "./lib/trip.js";

const TAU = 6.28318, LEN = 120;
export function material(ctx) {
  const n = Math.max(1, Math.round(ctx.params.n ?? 1)), sg = n % 2 ? 1 : -1, pair = n > 2 ? 1 : 0;
  const c = tripClock(ctx), u = visionU(ctx, c), live = visionShown(ctx, c, 0);
  const inv = (x) => float(1).sub(x), is = (v, i) => step(v.sub(i).abs(), 0.5);
  const io = (a, b, x, y) => smoothstep(a, b, u).mul(inv(smoothstep(x, y, u)));
  const rn = (k) => c.rnd(340 + k), pk = (k, m) => c.pick(340 + k, m);
  const fam = pk(0, 4), hot = pk(17, 3);
  const blue = vec3(0.05, 0.12, 1.0), violet = vec3(0.45, 0.05, 1.0), W = vec3(1, 1, 1);
  const A = blue.mul(is(fam, 0).add(is(fam, 2))).add(violet.mul(is(fam, 1).add(is(fam, 3))));
  const B = violet.mul(is(fam, 0).add(is(fam, 2))).add(blue.mul(is(fam, 1).add(is(fam, 3))));
  const H = vec3(1.0, 0.05, 0.6).mul(is(hot, 0)).add(vec3(1.0, 0.85, 0.05).mul(is(hot, 1))).add(vec3(1.0, 0.38, 0.02).mul(is(hot, 2)));

  const uu = positionGeometry.y, ca = positionGeometry.x, sa = positionGeometry.z;
  const r0 = pair ? 2.3 : 3.4;
  const grow = io(0.55 + pair * 0.05, 0.8, 0.94, 0.965 - pair * 0.01);
  const exists = pair ? step(0.5, rn(7)) : float(1);
  const tip = smoothstep(grow, grow.sub(0.06), uu);
  const rad = inv(uu.mul(0.85)).max(0).pow(0.6).mul(r0).mul(tip.sqrt()).mul(live).mul(exists).mul(step(0.002, grow));
  // spine (the being's metres, z + toward the camera) and two travelling waves running root to tip
  const ph = pair * 2.3 + (sg > 0 ? 0 : 1.1), env = uu.mul(0.85).add(0.15);
  const w1 = uu.mul(8).sub(c.real.mul(1.1)).add(ph).sin().mul(env).mul(6);
  const w2 = uu.mul(6).sub(c.real.mul(0.75)).add(ph * 1.6).cos().mul(env).mul(4.5);
  const bow = uu.mul(3.1416).sin();
  const spine = pair
    ? vec3(uu.mul(-34).add(92).mul(sg).add(w1).add(bow.mul(-6 * sg)), uu.mul(112).sub(72).add(w2.mul(0.6)), uu.mul(70).sub(45).add(w2.mul(0.7)))
    : vec3(uu.mul(-66).add(84).mul(sg).add(w1).add(bow.mul(10 * sg)), uu.mul(-112).add(76).add(w2.mul(0.6)), uu.mul(78).sub(48).add(w2.mul(0.8)));
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  m.positionNode = spine.add(vec3(ca.mul(rad), sa.mul(rad).mul(0.8), sa.mul(rad).mul(-0.6)));

  // the skin by along-length s (metres) and around-angle
  const ang = atan2(sa, ca), s = uu.mul(LEN), rf = inv(uu.mul(0.85)).max(0).pow(0.6).mul(r0);
  const band = s.mul(0.42).sub(c.real.mul(0.6)).floor().mod(2);                      // op-art bands slide down the body
  const cStr = mix(W.mul(0.85), A, band.mul(step(0.5, rn(9)))).mul(stripes(s.mul(0.42).sub(c.real.mul(0.6)), 1, 0.05)).mul(band.mul(0.7).add(0.3).max(inv(band)));
  const row = s.div(2.2).floor();
  const bd = vec2(s.div(2.2).fract().sub(0.5).mul(2.2), ang.div(TAU).mul(7).add(row.mul(0.5)).fract().sub(0.5).mul(rf.mul(TAU / 7))).length();
  const brad = rf.mul(0.38).min(0.75);
  const cBe = mix(mix(B, W, 0.45), H, step(row.mod(3), 0.5)).mul(inv(smoothstep(brad.sub(0.1), brad, bd)));
  const t = ang.div(TAU).mul(4);
  const cSc = mix(A, W, 0.3).mul(stripes(s.mul(0.28).add(t), 1, 0.07).mul(stripes(s.mul(0.28).sub(t), 1, 0.07)));
  const swap = pair ? inv(step(0.5, rn(8))) : step(0.5, rn(8));
  const t1 = 0.8 + pair * 0.03;
  const skin = mix(cStr, mix(cBe, cSc, swap), step(inv(uu), smoothstep(t1, t1 + 0.08, u).mul(1.02)));  // tip first
  const run = smoothstep(0.05, 0, uu.sub(c.beat.fract()).abs()).mul(step(0.001, c.kick));
  const edge = ca.abs();
  const drop = smoothstep(grow.sub(0.07), grow.sub(0.015), uu);                    // the drop of light at the tip
  let lit = skin.mul(sa.abs().mul(0.45).add(0.55)).add(mix(A, W, 0.5).mul(smoothstep(0.86, 1, edge)).mul(run.add(0.45)));
  lit = mix(lit, mix(H, W, 0.55).mul(1.3), drop);
  const dark = is(float(n), step(0.5, rn(13)).add(1)).mul(step(uu, smoothstep(0.85, 0.91, u).mul(1.02)));
  m.colorNode = mix(lit, mix(A, W, 0.4).mul(smoothstep(0.95, 1, edge)).mul(0.7), dark);
  return m;
}
