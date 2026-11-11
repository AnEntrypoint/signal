// THE TWIN SERPENTS' GREAT COILS: real round bodies coiling in depth past the frame corners (params.n = 1..4).
// n 1, 2: rise from below the frame behind the world canvas (z -42), coil once round their own axis as they come,
// pass outside the ring and end 30 m nearer the camera than the staff. n 3, 4 (dealt by the seed): thinner, from the top.
// Odd coils wear the black/white op-art stripes of the first serpent, even coils the neon diamond scales of the second;
// the skin then changes to bead rows travelling up the body (.8-.88). One coil goes pure black with a thin rim at the
// culmination; all grow root to tip (u .55-.8) and retract tip-first on the exit.
// Seed channels shared with the scene: 440 hue, 441 neon, 447 count, 448 second skin, 453 dark coil, 457 hot, 450 coil sense.
import { MeshBasicNodeMaterial, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, mix, atan2 } from "builtin/tsl";
import { tripClock, visionShown, visionU } from "./lib/trip.js";

const TAU = 6.28318, LEN = 120;
export function material(ctx) {
  const n = Math.max(1, Math.round(ctx.params.n ?? 1)), sg = n % 2 ? 1 : -1, pair = n > 2 ? 1 : 0;
  const c = tripClock(ctx), u = visionU(ctx, c), live = visionShown(ctx, c, 0);
  const inv = (x) => float(1).sub(x), is = (v, i) => step(v.sub(i).abs(), 0.5);
  const io = (a, b, x, y) => smoothstep(a, b, u).mul(inv(smoothstep(x, y, u)));
  const rn = (k) => c.rnd(440 + k), pk = (k, m) => c.pick(440 + k, m);
  const fam = pk(0, 3), neon = pk(1, 3), hot = pk(17, 3);
  const blue = vec3(0.05, 0.12, 1.0), violet = vec3(0.45, 0.05, 1.0), ice = vec3(0.45, 0.6, 1.0), W = vec3(1, 1, 1);
  const A = blue.mul(is(fam, 0)).add(violet.mul(is(fam, 1))).add(blue.mul(is(fam, 2)));
  const B = violet.mul(is(fam, 0)).add(blue.mul(is(fam, 1))).add(ice.mul(is(fam, 2)));
  const N = vec3(0.1, 1.0, 0.15).mul(is(neon, 0)).add(vec3(1.0, 0.06, 0.6).mul(is(neon, 1))).add(vec3(1.0, 0.42, 0.02).mul(is(neon, 2)));
  const H = vec3(1.0, 0.85, 0.05).mul(is(hot, 0)).add(vec3(1.0, 0.06, 0.6).mul(is(hot, 1))).add(vec3(1.0, 0.42, 0.02).mul(is(hot, 2)));

  const uu = positionGeometry.y, ca = positionGeometry.x, sa = positionGeometry.z;
  const r0 = pair ? 2.5 : 3.8;
  const grow = io(0.55 + pair * 0.05, 0.8, 0.93, 0.965 - pair * 0.01);
  const exists = pair ? step(0.45, rn(7)) : float(1);
  const tip = smoothstep(grow, grow.sub(0.07), uu);
  const rad = inv(uu).max(0).pow(0.5).mul(0.85).add(0.15).mul(r0).mul(tip.sqrt()).mul(live).mul(exists).mul(step(0.002, grow));
  // the spine: a quadratic sweep root -> bend -> end (being metres, z + toward the camera), wound round by a coil that
  // turns slowly on its own clock, plus a travelling wave so the body swims
  const R0 = pair ? [95 * sg, 78, -40] : [105 * sg, -72, -42];
  const C0 = pair ? [46 * sg, 40, -16] : [52 * sg, -32, -14];
  const E0 = pair ? [26 * sg, 16, 28] : [24 * sg, -5, 30];
  const bez = (i) => inv(uu).mul(inv(uu)).mul(R0[i]).add(uu.mul(inv(uu)).mul(2 * C0[i])).add(uu.mul(uu).mul(E0[i]));
  const csn = step(0.5, rn(10)).mul(2).sub(1).mul(sg);
  const phi = uu.mul(TAU * 1.2).add(pair * 1.7).sub(c.real.mul(0.3).mul(csn));
  const rc = inv(uu.mul(0.55)).mul(pair ? 9 : 13);
  const w1 = uu.mul(11).sub(c.real.mul(1.4)).add(n * 0.9).sin().mul(uu.mul(0.7).add(0.3)).mul(2.6);
  const spine = vec3(bez(0).add(phi.cos().mul(rc).mul(sg)), bez(1).add(phi.sin().mul(rc).mul(0.3)).add(w1), bez(2).add(phi.sin().mul(rc)));
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  m.positionNode = spine.add(vec3(ca.mul(rad), sa.mul(rad).mul(0.8), sa.mul(rad).mul(-0.6)));
  // THE DEPTH WEAVE: the mid-body swings through the canvas planes (ring -12, being 0, veil +10), so one body dips
  // behind the being and comes out in front of it, more than once; the ends stay rooted. Seeded per body: swing, turns, phase.
  { const S = float(uu).clamp(0, 1), dz = step(0.5, c.rnd(391 + n)).mul(2).sub(1).mul(c.rnd(395 + n).mul(5).add(11));
    const turns = c.rnd(399 + n).mul(1.6).add(1.4).mul(3.14159);
    const weave = S.mul(turns).add(c.rnd(403 + n).mul(6.283)).add(c.real.mul(0.21 + 0.04 * n)).sin().mul(S.mul(float(1).sub(S)).mul(4)).mul(dz);
    m.positionNode = m.positionNode.add(vec3(0, 0, weave)); }

  // the skin, by along-length s (metres) and around-angle
  const ang = atan2(sa, ca), s = uu.mul(LEN), rf = inv(uu).max(0).sqrt().mul(r0);
  const band = (v, w) => smoothstep(0.25 - w, 0.25 + w, v.fract().sub(0.5).abs());
  // odd: op-art black/white rings that lean round the body (a slow spiral); even: neon diamond scales
  const cOp = W.mul(band(s.div(1.6).add(ang.div(TAU).mul(sg)), 0.04)).mul(0.9);
  const t = ang.div(TAU).mul(4);
  const dia = band(s.div(2.2).add(t), 0.06).mul(band(s.div(2.2).sub(t), 0.06));
  const cSc = mix(N.mul(0.25), N, dia).mul(inv(dia).mul(0.4).add(0.6));
  const first = n % 2 ? cOp : cSc;
  // second skin: bead rows (hot every third row), the change climbing from root to tip
  const row = s.div(2.4).floor();
  const bd = vec2(s.div(2.4).fract().sub(0.5).mul(2.4), ang.div(TAU).mul(6).add(row.mul(0.5)).fract().sub(0.5).mul(rf.mul(TAU / 6))).length();
  const brad = rf.mul(0.4).min(0.75);
  const cBe = mix(mix(n % 2 ? W : N, B, 0.3), H, step(row.mod(3), 0.5)).mul(inv(smoothstep(brad.sub(0.08), brad, bd)));
  const alt = n % 2 ? cSc : cOp;
  const second = mix(cBe, alt, step(0.5, rn(8)).mul(pair));
  const t1 = 0.8 + pair * 0.03;
  const skin = mix(first, second, step(uu, smoothstep(t1, t1 + 0.08, u).mul(1.02)));
  const run = smoothstep(0.05, 0, uu.sub(c.beat.fract()).abs()).mul(step(0.001, c.kick));
  const edge = ca.abs();
  const lit = skin.mul(sa.abs().mul(0.45).add(0.55)).add(mix(A, W, 0.4).mul(smoothstep(0.86, 1, edge)).mul(run.add(0.5)));
  const dark = is(float(n), step(0.5, rn(13)).add(1)).mul(step(uu, smoothstep(0.85, 0.91, u).mul(1.02)));
  m.colorNode = mix(lit, mix(A, W, 0.5).mul(smoothstep(0.95, 1, edge)).mul(0.7), dark);
  return m;
}
