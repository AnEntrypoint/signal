// THE WORLD TREE's VINES: thick beaded tentacle-vines rising up both sides of the tree in depth (params.n = 1..4),
// the flanking pillars of the reference. n 1, 2: from below the frame behind the world (z -38), swinging inward past
// the tree's roots BEHIND her (z < 0) and climbing past her crown IN FRONT (z up to +28), tip curling outward.
// n 3, 4 (dealt by the seed): thinner, hanging down from the top corners. Opaque black body with neon on it: it hides
// what is behind it. Grows root to tip (slot u .55-.8); skin: green cupped bead rows (the reference's suckers) ->
// op-art stripes or diamond scales climbing the body (.76-.84); one vine goes pure black with a thin rim at the
// culmination; all retract tip-first on the exit. Seed channels shared with the scene (320+): 0 hue, 7 count,
// 8 second skin, 13 which goes dark, 16 hot accent.
import { MeshBasicNodeMaterial, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, mix, atan2 } from "builtin/tsl";
import { tripClock, visionShown, visionU, stripes } from "./lib/trip.js";

const TAU = 6.28318, LEN = 120;
export function material(ctx) {
  const n = Math.max(1, Math.round(ctx.params.n ?? 1)), sg = n % 2 ? 1 : -1, pair = n > 2 ? 1 : 0;
  const c = tripClock(ctx), u = visionU(ctx, c), live = visionShown(ctx, c, 0);
  const inv = (x) => float(1).sub(x), is = (v, i) => step(v.sub(i).abs(), 0.5);
  const io = (a, b, x, y) => smoothstep(a, b, u).mul(inv(smoothstep(x, y, u)));
  const rn = (k) => c.rnd(320 + k), pk = (k, m) => c.pick(320 + k, m);
  const fam = pk(0, 3), hot = pk(16, 3);
  const green = vec3(0.1, 1.0, 0.15), violet = vec3(0.45, 0.05, 1.0), blue = vec3(0.05, 0.12, 1.0), W = vec3(1, 1, 1);
  const pink = vec3(1.0, 0.05, 0.6), orange = vec3(1.0, 0.38, 0.02), yellow = vec3(1.0, 0.85, 0.05);
  const A = green.mul(is(fam, 0)).add(violet.mul(is(fam, 1))).add(blue.mul(is(fam, 2)));      // the vine's flesh, the tree's wood
  const G = green.mul(0.8).mul(is(fam, 0)).add(green.mul(is(fam, 1))).add(green.mul(0.7).mul(is(fam, 2)));  // the vines stay green
  const H = pink.mul(is(hot, 0)).add(orange.mul(is(hot, 1))).add(yellow.mul(is(hot, 2)));

  const uu = positionGeometry.y, ca = positionGeometry.x, sa = positionGeometry.z;
  const r0 = pair ? 2.2 : 3.8;
  const grow = io(0.55 + pair * 0.06, 0.8, 0.935, 0.965 - pair * 0.01);
  const exists = pair ? step(0.5, rn(7)) : float(1);
  const tip = smoothstep(grow, grow.sub(0.06), uu);
  const rad = inv(uu).max(0).pow(0.45).mul(r0).mul(tip.sqrt()).mul(live).mul(exists).mul(step(0.002, grow));
  // spine (being metres, +z toward the camera): two travelling waves, a slower sway in x and a heave in z
  const ph = pair * 2.3 + (sg > 0 ? 0 : 1.3), env = uu.mul(0.85).add(0.15);
  const w1 = uu.mul(8).sub(c.real.mul(1.1)).add(ph).sin().mul(env).mul(5);
  const w2 = uu.mul(6).sub(c.real.mul(0.75)).add(ph * 1.6).cos().mul(env).mul(4);
  const bow = uu.mul(TAU / 2).sin();                                           // in toward her at mid-length, out again
  const spine = pair
    ? vec3(float(78).sub(bow.mul(22)).sub(uu.mul(12)).mul(sg).add(w1.mul(0.7)), uu.mul(-70).add(66).add(w2.mul(0.5)), uu.mul(55).sub(30).add(w2.mul(0.7)))
    : vec3(float(64).sub(bow.mul(26)).sub(uu.mul(4)).mul(sg).add(w1), uu.mul(108).sub(66).add(w2.mul(0.5)), uu.mul(66).sub(38).add(w2.mul(0.8)));
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  m.positionNode = spine.add(vec3(ca.mul(rad), sa.mul(rad).mul(0.8), sa.mul(rad).mul(-0.6)));

  const ang = atan2(sa, ca), s = uu.mul(LEN), rf = inv(uu).max(0).pow(0.45).mul(r0);
  // skin 1: cupped bead rows (an oval ring with a dark well and a hot pip), staggered row to row
  const row = s.div(2.6).floor();
  const q = vec2(s.div(2.6).fract().sub(0.5).mul(2.6), ang.div(TAU).mul(7).add(row.mul(0.5)).fract().sub(0.5).mul(rf.mul(TAU / 7)));
  const bd = q.length(), br = rf.mul(0.42).min(1.05);
  const cup = inv(smoothstep(br.sub(0.1), br, bd)).mul(smoothstep(br.mul(0.62), br.mul(0.72), bd));
  const pip = inv(smoothstep(br.mul(0.18), br.mul(0.26), bd)).mul(step(row.mod(4), 0.5));
  const cBe = mix(G, W, 0.15).mul(cup).add(H.mul(pip));
  // skin 2: op-art stripes or diamond scales
  const cStr = mix(W.mul(0.85), A, s.mul(0.4).floor().mod(3).mul(0.5)).mul(stripes(s, 0.4, 0.04));
  const t = ang.div(TAU).mul(4);
  const cSc = mix(G, W, 0.3).mul(stripes(s.mul(0.28).add(t), 1, 0.07).mul(stripes(s.mul(0.28).sub(t), 1, 0.07)));
  const swap = pair ? inv(step(0.5, rn(8))) : step(0.5, rn(8));
  const t1 = 0.76 + pair * 0.02;
  const skin = mix(cBe, mix(cStr, cSc, swap), step(uu, smoothstep(t1, t1 + 0.08, u).mul(1.02)));   // the new skin climbs root to tip
  const run = smoothstep(0.05, 0, uu.sub(c.beat.fract()).abs()).mul(step(0.001, c.kick));          // the kick's sap runs up it
  const edge = ca.abs();
  const lit = skin.mul(sa.abs().mul(0.45).add(0.55)).add(mix(G, W, 0.5).mul(smoothstep(0.86, 1, edge)).mul(run.add(0.45)));
  const dark = is(float(n), step(0.5, rn(13)).add(1)).mul(step(uu, smoothstep(0.86, 0.92, u).mul(1.02)));
  m.colorNode = mix(lit, mix(G, W, 0.4).mul(smoothstep(0.95, 1, edge)).mul(0.7), dark);
  return m;
}
