// THE NIGHT OWL's BRANCH-WORMS (params.n = 1..3): round bodies winding in depth through the owl's canvases, bent in the
// vertex stage. Each worm is DEALT its own skin (bark rings / op-art stripes / bead rows / diamond scales) and a second
// skin that travels root to tip later; one goes silhouette at the culmination; they retract tip-first, one after another.
import { MeshBasicNodeMaterial, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, mix, atan2 } from "builtin/tsl";
import { tripClock, visionShown, visionU, stripes, inv, is } from "./lib/trip.js";

const TAU = 6.28318;
export function material(ctx) {
  const n = Math.max(1, Math.round(ctx.params.n ?? 1)), third = n > 2, low = ctx.quality === "low";
  const c = tripClock(ctx), u = visionU(ctx, c), live = visionShown(ctx, c, 0);
  const rn = (k) => c.rnd(480 + k), pk = (k, m) => c.pick(480 + k, m);
  const fam = pk(0, 3), h1 = pk(1, 4), h2 = h1.add(1).add(pk(2, 3)).mod(4);
  const blue = vec3(0.05, 0.12, 1.0), violet = vec3(0.45, 0.05, 1.0), W = vec3(1, 1, 1);
  const A = mix(blue, violet, is(fam, 1)), B = mix(violet, blue, is(fam, 1));
  const hot = (i) => vec3(1.0, 0.05, 0.55).mul(is(i, 0)).add(vec3(1.0, 0.85, 0.05).mul(is(i, 1))).add(vec3(0.1, 1.0, 0.15).mul(is(i, 2))).add(vec3(1.0, 0.3, 0.02).mul(is(i, 3)));
  const H = hot(h1), H2 = hot(h2);

  const uu = positionGeometry.y, ca = positionGeometry.x, sa = positionGeometry.z;
  const side = third ? step(0.5, rn(19)).mul(2).sub(1) : float(n === 1 ? 1 : -1);
  const r0 = third ? 2.4 : 3.4, LEN = third ? 120 : 140;
  const g0 = 0.64 + (n - 1) * 0.06, x0 = 0.86 + ((n * 2) % 3) * 0.025;
  const grow = smoothstep(g0, g0 + 0.08, u).mul(inv(smoothstep(x0, x0 + 0.07, u)));
  const exists = third ? step(0.4, rn(7)) : float(1);
  const tip = inv(smoothstep(grow.sub(0.07), grow, uu));
  const rad = inv(uu).max(0).sqrt().mul(0.85).add(0.15).mul(r0).mul(tip.max(0).sqrt()).mul(live).mul(exists).mul(step(0.002, grow));
  const ph = n * 1.3, env = uu.mul(0.8).add(0.2);
  const w1 = uu.mul(8).sub(c.real.mul(1.1)).add(ph).sin().mul(env).mul(5);
  const w2 = uu.mul(6).sub(c.real.mul(0.8)).add(ph * 1.7).cos().mul(env).mul(4);
  const spine = third
    ? vec3(uu.mul(50).add(40).mul(side).add(w1), uu.mul(95).sub(80).add(w2.mul(0.6)), uu.mul(55).sub(30).add(w2.mul(0.8)))
    : vec3(uu.mul(-60).add(104).mul(side).add(w1), uu.mul(-104).add(64).add(w2.mul(0.6)), uu.mul(70).sub(40).add(w2.mul(0.8)));
  // the depth weave: the mid-body swings through the canvas planes, behind the being and out in front of it
  const S = uu.clamp(0, 1), dz = step(0.5, c.rnd(391 + n)).mul(2).sub(1).mul(c.rnd(395 + n).mul(5).add(11));
  const weave = S.mul(c.rnd(399 + n).mul(1.6).add(1.4).mul(3.14159)).add(c.rnd(403 + n).mul(TAU)).add(c.real.mul(0.21 + 0.04 * n)).sin().mul(S.mul(inv(S)).mul(4)).mul(dz);
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  m.positionNode = spine.add(vec3(ca.mul(rad), sa.mul(rad).mul(0.8), sa.mul(rad).mul(-0.6).add(weave)));

  const ang = atan2(sa, ca), s = uu.mul(LEN), rf = inv(uu).max(0).sqrt().mul(r0);
  const row = s.div(2.6).floor(), t = ang.div(TAU).mul(4);
  const bd = vec2(s.div(2.6).fract().sub(0.5).mul(2.6), ang.div(TAU).mul(6).add(row.mul(0.5)).fract().sub(0.5).mul(rf.mul(TAU / 6))).length();
  const brad = rf.mul(0.38).min(0.75);
  const skins = [
    A.mul(inv(smoothstep(0, 0.35, s.div(7).fract().sub(0.5).abs().mul(7).sub(0.25)))),
    mix(mix(A, W, 0.35), B, s.mul(0.3).floor().mod(2)).mul(stripes(s, 0.3, 0.04)),
    mix(mix(B, W, 0.4), mix(H, H2, step(row.mod(4), 1.5)), step(row.mod(2), 0.5)).mul(inv(smoothstep(brad.sub(0.08), brad, bd))),
    mix(H2, W, 0.2).mul(stripes(s.mul(0.28).add(t), 1, 0.06).mul(stripes(s.mul(0.28).sub(t), 1, 0.06))),
  ];
  // the deal: worm n wears skin (roll + n) % 4, then (that + 1 or 2) % 4 travels up it root to tip
  const m1 = pk(8, 4).add(n).mod(4), m2 = m1.add(1).add(c.pick(407 + n, 2)).mod(4);
  const wear = (v) => skins.reduce((acc, sk, i) => acc.add(sk.mul(is(v, i))), vec3(0));
  const k1 = g0 + 0.09;
  const skin = low ? wear(m1) : mix(wear(m1), wear(m2), step(uu, smoothstep(k1, k1 + 0.1, u).mul(1.02)));
  const run = inv(smoothstep(0, 0.05, uu.sub(c.beat.fract()).abs())).mul(step(0.001, c.kick));
  const edge = ca.abs();
  const lit = skin.mul(sa.abs().mul(0.45).add(0.55)).add(mix(A, W, 0.4).mul(smoothstep(0.86, 1, edge)).mul(run.add(0.45)));
  const dark = is(float(n), step(0.5, rn(9)).add(1)).mul(step(uu, smoothstep(0.8, 0.83, u).mul(1.02))).mul(step(u, 0.86));
  m.colorNode = mix(lit, mix(A, W, 0.5).mul(smoothstep(0.95, 1, edge)).mul(0.7), dark);
  return m;
}
