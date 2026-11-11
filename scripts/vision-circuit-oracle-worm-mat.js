// THE CIRCUIT ORACLE's CABLE-WORMS: real round cables winding in depth through the board (params.n = 1..4).
// n 1, 2: enter low from the sides behind the world canvas (z -42) and end 30 m nearer the camera than her face,
// beside her chin. n 3, 4 (dealt by the seed): thinner, from the top corners. Each ends in a round connector-eye.
// Vertex stage: spine + two travelling waves. Skin: opaque black, braided op-art strands first, then via-bead rows
// or diamond weave climbing the body (.8-.88); one cable goes pure black with a thin rim at the culmination;
// they grow root to tip (u .55-.8, the connector riding the growing head) and retract head-first on the exit.
// Seed channels shared with the scene: 400 hue, 401 hot, 407 count, 408 second skin, 411 which goes dark.
import { MeshBasicNodeMaterial, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, mix, atan2 } from "builtin/tsl";
import { tripClock, visionShown, visionU, stripes } from "./lib/trip.js";

const TAU = 6.28318, LEN = 120;
export function material(ctx) {
  const n = Math.max(1, Math.round(ctx.params.n ?? 1)), sg = n % 2 ? 1 : -1, pair = n > 2 ? 1 : 0;
  const c = tripClock(ctx), u = visionU(ctx, c), live = visionShown(ctx, c, 0);
  const inv = (x) => float(1).sub(x), is = (v, i) => step(v.sub(i).abs(), 0.5);
  const io = (a, b, x, y) => smoothstep(a, b, u).mul(inv(smoothstep(x, y, u)));
  const rn = (k) => c.rnd(400 + k), pk = (k, m) => c.pick(400 + k, m);
  const fam = pk(0, 3), hot = pk(1, 3);
  const blue = vec3(0.05, 0.12, 1.0), violet = vec3(0.45, 0.05, 1.0), ice = vec3(0.45, 0.6, 1.0), W = vec3(1, 1, 1);
  const A = blue.mul(is(fam, 0)).add(violet.mul(is(fam, 1))).add(blue.mul(is(fam, 2)));
  const B = violet.mul(is(fam, 0)).add(blue.mul(is(fam, 1))).add(ice.mul(is(fam, 2)));
  const H = vec3(1.0, 0.05, 0.6).mul(is(hot, 0)).add(vec3(1.0, 0.42, 0.02).mul(is(hot, 1))).add(vec3(0.1, 1.0, 0.15).mul(is(hot, 2)));

  const uu = positionGeometry.y, ca = positionGeometry.x, sa = positionGeometry.z;
  const r0 = pair ? 2.3 : 3.4;
  const grow = io(0.55 + pair * 0.05, 0.8, 0.93, 0.965 - pair * 0.01);
  const exists = pair ? step(0.45, rn(7)) : float(1);
  const e = uu.div(grow.max(0.001));                                           // 0 root .. 1 the connector head
  const cap = inv(e.sub(0.93).max(0).div(0.07).pow(2)).max(0).sqrt();         // the round head
  const collar = smoothstep(0.86, 0.88, e).mul(0.3).add(1);                     // the connector swells from its collar
  const rad = inv(e.mul(0.35)).mul(r0).mul(collar).mul(cap).mul(step(e, 1)).mul(live).mul(exists).mul(step(0.002, grow));
  const ph = pair * 2.1 + (sg > 0 ? 0 : 0.9), env = uu.mul(0.8).add(0.2);
  const w1 = uu.mul(8).sub(c.real.mul(1.1)).add(ph).sin().mul(env).mul(5);
  const w2 = uu.mul(6).sub(c.real.mul(0.75)).add(ph * 1.7).cos().mul(env).mul(4);
  const bow = uu.mul(3.14159).sin();
  const spine = pair
    ? vec3(uu.mul(-76).add(100).mul(sg).add(w1), uu.mul(-48).add(62).add(bow.mul(6)).add(w2.mul(0.6)), uu.mul(60).sub(38).add(w2.mul(0.8)))
    : vec3(uu.mul(-90).add(112).mul(sg).add(w1), uu.mul(34).sub(40).sub(bow.mul(8)).add(w2.mul(0.6)), uu.mul(72).sub(42).add(w2.mul(0.8)));
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  m.positionNode = spine.add(vec3(ca.mul(rad), sa.mul(rad).mul(0.8), sa.mul(rad).mul(-0.6)));
  // THE DEPTH WEAVE: the mid-body swings through the canvas planes (ring -12, being 0, veil +10), so one body dips
  // behind the being and comes out in front of it, more than once; the ends stay rooted. Seeded per body: swing, turns, phase.
  { const S = float(uu).clamp(0, 1), dz = step(0.5, c.rnd(391 + n)).mul(2).sub(1).mul(c.rnd(395 + n).mul(5).add(11));
    const turns = c.rnd(399 + n).mul(1.6).add(1.4).mul(3.14159);
    const weave = S.mul(turns).add(c.rnd(403 + n).mul(6.283)).add(c.real.mul(0.21 + 0.04 * n)).sin().mul(S.mul(float(1).sub(S)).mul(4)).mul(dz);
    m.positionNode = m.positionNode.add(vec3(0, 0, weave)); }

  const ang = atan2(sa, ca), s = uu.mul(LEN), rf = inv(uu.mul(0.35)).mul(r0);
  // braided cable: two strands twisting opposite ways, black gaps between (op-art)
  const t = ang.div(TAU).mul(3);
  const s1 = stripes(s.mul(0.28).add(t), 1, 0.08), s2 = stripes(s.mul(0.28).sub(t), 1, 0.08);
  const over = step(0.5, s.mul(0.14).add(t.mul(0.5)).fract());
  const cBr = mix(A.mul(s1), mix(W, B, 0.35).mul(s2), over).mul(s1.max(s2));
  // via-bead rows
  const row = s.div(2.4).floor();
  const bd = vec2(s.div(2.4).fract().sub(0.5).mul(2.4), ang.div(TAU).mul(6).add(row.mul(0.5)).fract().sub(0.5).mul(rf.mul(TAU / 6))).length();
  const brad = rf.mul(0.36).min(0.7);
  const cBe = mix(mix(B, W, 0.4), H, step(row.mod(4), 0.5)).mul(inv(smoothstep(brad.sub(0.08), brad, bd))).add(A.mul(0.6).mul(smoothstep(brad.add(0.12), brad.add(0.04), bd)).mul(smoothstep(brad, brad.add(0.04), bd)));
  // diamond weave
  const cWv = mix(B, W, 0.25).mul(stripes(s.mul(0.3).add(t), 1, 0.06).mul(stripes(s.mul(0.3).sub(t), 1, 0.06)));
  const swap = pair ? inv(step(0.5, rn(8))) : step(0.5, rn(8));
  const t1 = 0.8 + pair * 0.03;
  let skin = mix(cBr, mix(cBe, cWv, swap), step(uu, smoothstep(t1, t1 + 0.08, u).mul(1.02)));
  // the connector-eye: concentric rings round the head, a hot pupil at the very tip
  const head = smoothstep(0.875, 0.885, e);
  const eyeC = mix(mix(A, W, stripes(e.mul(60), 1, 0.12)).mul(stripes(e.mul(30), 1, 0.3)), H, step(0.985, e));
  skin = mix(skin, eyeC, head);
  const run = smoothstep(0.05, 0, uu.sub(c.beat.fract()).abs()).mul(step(0.001, c.kick));
  const edge = ca.abs();
  const lit = skin.mul(sa.abs().mul(0.45).add(0.55)).add(mix(A, W, 0.5).mul(smoothstep(0.86, 1, edge)).mul(run.add(0.4)));
  const dark = is(float(n), step(0.5, rn(11)).add(1)).mul(step(uu, smoothstep(0.86, 0.92, u).mul(1.02)));
  m.colorNode = mix(lit, mix(A, W, 0.5).mul(smoothstep(0.95, 1, edge)).mul(0.7), dark);
  return m;
}
