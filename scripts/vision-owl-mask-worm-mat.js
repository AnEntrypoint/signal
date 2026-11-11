// THE NIGHT OWL's BRANCH-WORMS: real round bodies winding in depth through the owl's scene (params.n = 1..3).
// n 1, 2: reach in from the top corners behind the world canvas (z -40), pass behind the feather fans' upper feathers,
// cross the being's plane at the fans' tips and end 30 m nearer the camera, hiding the fans' lower edge.
// n 3 (dealt by the seed): thinner, rising from below the frame on one side, in front of the lower fan.
// The spine and its travelling waves are bent in the VERTEX stage; the skin is opaque black with neon on it.
// It grows root to tip (slot u .55-.8), its skin goes bark rings -> op-art stripes -> diamond scales or bead rows,
// one worm goes pure black with a thin rim at the culmination, and all retract tip-first on the exit.
// Seed channels shared with the scene: 480 hue, 481/482 hot, 487 count, 488 skin order, 489 dark worm, 499 worm 3 side.
import { MeshBasicNodeMaterial, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, mix, atan2 } from "builtin/tsl";
import { tripClock, visionShown, visionU, stripes } from "./lib/trip.js";

const TAU = 6.28318;
export function material(ctx) {
  const n = Math.max(1, Math.round(ctx.params.n ?? 1)), third = n > 2;
  const c = tripClock(ctx), u = visionU(ctx, c), live = visionShown(ctx, c, 0);
  const inv = (x) => float(1).sub(x), is = (v, i) => step(v.sub(i).abs(), 0.5);
  const io = (a, b, x, y) => smoothstep(a, b, u).mul(inv(smoothstep(x, y, u)));
  const rn = (k) => c.rnd(480 + k), pk = (k, m) => c.pick(480 + k, m);
  const fam = pk(0, 3), h1 = pk(1, 4), h2 = h1.add(1).add(pk(2, 3)).mod(4);
  const blue = vec3(0.05, 0.12, 1.0), violet = vec3(0.45, 0.05, 1.0), W = vec3(1, 1, 1);
  const A = blue.mul(is(fam, 0)).add(violet.mul(is(fam, 1))).add(blue.mul(is(fam, 2)));
  const B = violet.mul(is(fam, 0)).add(blue.mul(is(fam, 1))).add(violet.mul(is(fam, 2)));
  const hot = (i) => vec3(1.0, 0.05, 0.55).mul(is(i, 0)).add(vec3(1.0, 0.85, 0.05).mul(is(i, 1))).add(vec3(0.1, 1.0, 0.15).mul(is(i, 2))).add(vec3(1.0, 0.3, 0.02).mul(is(i, 3)));
  const H = hot(h1), H2 = hot(h2);

  const uu = positionGeometry.y, ca = positionGeometry.x, sa = positionGeometry.z;
  const sg = n === 1 ? 1 : -1;
  const side = third ? step(0.5, rn(19)).mul(2).sub(1) : float(sg);
  const r0 = third ? 2.4 : 3.4, LEN = third ? 120 : 140;
  const grow = io(third ? 0.6 : 0.55 + (n - 1) * 0.02, 0.8, 0.93, third ? 0.955 : 0.965);
  const exists = third ? step(0.4, rn(7)) : float(1);
  const tip = smoothstep(grow, grow.sub(0.07), uu);
  const rad = inv(uu).max(0).pow(0.5).mul(0.85).add(0.15).mul(r0).mul(tip.sqrt()).mul(live).mul(exists).mul(step(0.002, grow));
  const ph = n * 1.3, env = uu.mul(0.8).add(0.2);
  const w1 = uu.mul(8).sub(c.real.mul(1.1)).add(ph).sin().mul(env).mul(5);
  const w2 = uu.mul(6).sub(c.real.mul(0.8)).add(ph * 1.7).cos().mul(env).mul(4);
  const spine = third
    ? vec3(uu.mul(50).add(40).mul(side).add(w1), uu.mul(95).sub(80).add(w2.mul(0.6)), uu.mul(55).sub(30).add(w2.mul(0.8)))
    : vec3(uu.mul(-60).add(104).mul(side).add(w1), uu.mul(-104).add(64).add(w2.mul(0.6)), uu.mul(70).sub(40).add(w2.mul(0.8)));
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  m.positionNode = spine.add(vec3(ca.mul(rad), sa.mul(rad).mul(0.8), sa.mul(rad).mul(-0.6)));

  const ang = atan2(sa, ca), s = uu.mul(LEN), rf = inv(uu).max(0).sqrt().mul(r0);
  // skin 1: bark rings, the branch's nodes; skin 2: op-art stripes; skin 3: diamond scales or bead rows (seed)
  const cBark = (A.mul(smoothstep(0.35, 0, s.div(7).fract().sub(0.5).abs().mul(7).sub(0.25))));
  const cStr = mix(mix(A, W, 0.35), B, s.mul(0.3).floor().mod(2)).mul(stripes(s, 0.3, 0.04));
  const row = s.div(2.6).floor();
  const bd = vec2(s.div(2.6).fract().sub(0.5).mul(2.6), ang.div(TAU).mul(6).add(row.mul(0.5)).fract().sub(0.5).mul(rf.mul(TAU / 6))).length();
  const brad = rf.mul(0.38).min(0.75);
  const cBe = mix(mix(B, W, 0.4), mix(H, H2, step(row.mod(4), 1.5)), step(row.mod(2), 0.5)).mul(inv(smoothstep(brad.sub(0.08), brad, bd)));
  const t = ang.div(TAU).mul(4);
  const cSc = mix(H2, W, 0.2).mul(stripes(s.mul(0.28).add(t), 1, 0.06).mul(stripes(s.mul(0.28).sub(t), 1, 0.06)));
  const swap = step(0.5, rn(8)).add(third ? 1 : 0).mod(2);
  const cLast = mix(cBe, cSc, swap);
  const k1 = 0.72 + n * 0.015, k2 = 0.82 + n * 0.015;
  let skin = mix(cBark, cStr, step(uu, smoothstep(k1, k1 + 0.06, u).mul(1.02)));
  skin = mix(skin, cLast, step(uu, smoothstep(k2, k2 + 0.06, u).mul(1.02)));
  const run = smoothstep(0.05, 0, uu.sub(c.beat.fract()).abs()).mul(step(0.001, c.kick));
  const edge = ca.abs();
  const lit = skin.mul(sa.abs().mul(0.45).add(0.55)).add(mix(A, W, 0.4).mul(smoothstep(0.86, 1, edge)).mul(run.add(0.45)));
  const dark = is(float(n), step(0.5, rn(9)).add(1)).mul(step(uu, smoothstep(0.86, 0.91, u).mul(1.02)));
  m.colorNode = mix(lit, mix(A, W, 0.5).mul(smoothstep(0.95, 1, edge)).mul(0.7), dark);
  return m;
}
