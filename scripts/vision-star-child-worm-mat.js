// THE STAR CHILD's COMET WORMS: real round bodies looping in depth through the nursery (params.n = 1..4).
// Each starts as a thin tail behind the world canvas (z -45) at a corner, throws one slow loop through depth
// outside the orbit mobile, and ends in a fat round comet head 30 m nearer the camera than the child, at the side.
// n 1, 2: bottom corners; n 3, 4: top corners, dealt by the seed (count 2..4). Bent and undulated in the VERTEX
// stage; opaque black skin with neon on it, so a body hides whatever is behind it. Grows root to head (slot u
// .55-.8), skin turns from op-art stripes to bead rows or diamond scales running up the body (.8-.88), one worm
// goes pure black with a thin rim at the culmination (.86-.93), all retract head-first on the exit (.93-.965).
// Seed channels (scene 380-399): 380 hue, 395 count, 396 second skin, 397 which goes dark, 398 hot colour, 394 loop sense.
import { MeshBasicNodeMaterial, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, mix, atan2 } from "builtin/tsl";
import { tripClock, visionShown, visionU, stripes } from "./lib/trip.js";

const TAU = 6.28318, LEN = 120;
export function material(ctx) {
  const n = Math.max(1, Math.round(ctx.params.n ?? 1)), sg = n % 2 ? -1 : 1, top = n > 2 ? 1 : 0;
  const c = tripClock(ctx), u = visionU(ctx, c), live = visionShown(ctx, c, 0);
  const inv = (x) => float(1).sub(x), is = (v, i) => step(v.sub(i).abs(), 0.5);
  const io = (a, b, x, y) => smoothstep(a, b, u).mul(inv(smoothstep(x, y, u)));
  const rn = (k) => c.rnd(380 + k), pk = (k, m) => c.pick(380 + k, m);
  const fam = pk(0, 4), hot = pk(18, 3);
  const BLU = vec3(0.007, 0.014, 1.0), VIO = vec3(0.195, 0.007, 1.0), PNK = vec3(1.0, 0.005, 0.318), ORA = vec3(1.0, 0.144, 0.0015),
    YEL = vec3(1.0, 0.693, 0.004), GRN = vec3(0.01, 1.0, 0.019), W = vec3(1, 1, 1);
  const A = BLU.mul(is(fam, 0)).add(VIO.mul(is(fam, 1))).add(BLU.mul(is(fam, 2))).add(PNK.mul(is(fam, 3)));
  const B = VIO.mul(is(fam, 0)).add(PNK.mul(is(fam, 1))).add(GRN.mul(is(fam, 2))).add(ORA.mul(is(fam, 3)));
  const H = PNK.mul(is(hot, 0)).add(YEL.mul(is(hot, 1))).add(GRN.mul(is(hot, 2)));

  const uu = positionGeometry.y, ca = positionGeometry.x, sa = positionGeometry.z;
  const r0 = top ? 2.4 : 3.4;
  const count = pk(15, 3).add(2);
  const exists = step(float(n), count.add(0.1));
  const grow = io(0.55 + top * 0.04, 0.8, 0.93 + top * 0.004, 0.965);
  const tipc = smoothstep(grow, grow.sub(0.06), uu);
  // comet profile: a thin tail at the root swelling to a round head, capped
  const capx = uu.sub(0.9).div(0.1).clamp(0, 1);
  const prof = uu.pow(0.7).mul(0.7).add(0.3).mul(inv(capx.mul(capx)).max(0).sqrt());
  const rad = prof.mul(r0).mul(tipc.sqrt()).mul(live).mul(exists).mul(step(0.002, grow));
  // the spine (being metres, +z toward the camera): corner to side, one loop through depth, two travelling waves
  const ph = top * 2.3 + (sg > 0 ? 0 : 1.1), env = uu.mul(0.7).add(0.3);
  const w1 = uu.mul(8).sub(c.real.mul(1.1)).add(ph).sin().mul(env).mul(4);
  const w2 = uu.mul(6).sub(c.real.mul(0.7)).add(ph * 1.6).cos().mul(env).mul(3.5);
  const ls = step(0.5, rn(14)).mul(2).sub(1);
  const la = uu.mul(TAU).mul(ls).add(ph), lr = uu.mul(3.1416).sin().mul(13);
  const base = top
    ? vec3(uu.mul(-56).add(108).mul(sg), uu.mul(-34).add(62), uu.mul(70).sub(45))
    : vec3(uu.mul(-56).add(104).mul(sg), uu.mul(46).sub(66), uu.mul(75).sub(45));
  const spine = base.add(vec3(la.cos().mul(lr).mul(sg).add(w1), la.sin().mul(lr).mul(0.45).add(w2.mul(0.6)), la.sin().mul(lr).add(w2.mul(0.8))));
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  m.positionNode = spine.add(vec3(ca.mul(rad), sa.mul(rad).mul(0.8), sa.mul(rad).mul(-0.6)));
  // THE DEPTH WEAVE: the mid-body swings through the canvas planes (ring -12, being 0, veil +10), so one body dips
  // behind the being and comes out in front of it, more than once; the ends stay rooted. Seeded per body: swing, turns, phase.
  { const S = float(uu).clamp(0, 1), dz = step(0.5, c.rnd(391 + n)).mul(2).sub(1).mul(c.rnd(395 + n).mul(5).add(11));
    const turns = c.rnd(399 + n).mul(1.6).add(1.4).mul(3.14159);
    const weave = S.mul(turns).add(c.rnd(403 + n).mul(6.283)).add(c.real.mul(0.21 + 0.04 * n)).sin().mul(S.mul(float(1).sub(S)).mul(4)).mul(dz);
    m.positionNode = m.positionNode.add(vec3(0, 0, weave)); }

  // skin by along-length s (m) and around-angle
  const ang = atan2(sa, ca.add(0.0001)), s = uu.mul(LEN), rf = prof.mul(r0).max(0.4);
  const cStr = mix(mix(A, W, 0.15), B, s.mul(0.4).floor().mod(2)).mul(stripes(s, 0.4, 0.05));
  const row = s.div(2.2).floor();
  const bd = vec2(s.div(2.2).fract().sub(0.5).mul(2.2), ang.div(TAU).mul(7).add(row.mul(0.5)).fract().sub(0.5).mul(rf.mul(TAU / 7))).length();
  const brad = rf.mul(0.38).min(0.75);
  const cBe = mix(mix(B, W, 0.45), H, step(row.mod(3), 0.5)).mul(inv(smoothstep(brad.sub(0.1), brad, bd)));
  const t = ang.div(TAU).mul(4);
  const cSc = mix(A, W, 0.3).mul(stripes(s.mul(0.28).add(t), 1, 0.07).mul(stripes(s.mul(0.28).sub(t), 1, 0.07)));
  const swap = top ? inv(step(0.5, rn(16))) : step(0.5, rn(16));
  const t1 = 0.8 + top * 0.02;
  const skin = mix(cStr, mix(cBe, cSc, swap), step(uu, smoothstep(t1, t1 + 0.08, u).mul(1.02)));
  // the comet head: hot rings, brightest at the cap
  const headM = smoothstep(0.86, 0.9, uu);
  const headC = mix(H, W, capx.mul(0.6)).mul(stripes(s, 0.9, 0.08).mul(0.5).add(0.6));
  const run = smoothstep(0.05, 0, uu.sub(c.beat.fract()).abs()).mul(step(0.001, c.kick));
  const edge = ca.abs();
  const lit = mix(skin, headC, headM).mul(sa.abs().mul(0.45).add(0.55)).add(mix(A, W, 0.5).mul(smoothstep(0.86, 1, edge)).mul(run.add(0.4)));
  const darkOne = pk(17, 2).add(1).add(top * 2);
  const dark = is(float(n), darkOne).mul(step(uu, io(0.86, 0.9, 0.93, 0.95).mul(1.02)));
  m.colorNode = mix(lit, mix(A, W, 0.5).mul(smoothstep(0.94, 1, edge)).mul(0.8), dark);
  return m;
}
