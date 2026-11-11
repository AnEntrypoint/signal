// THE OUROBOROS's HATCHLINGS, grown: real round serpents (params.n = 1..4) spiralling round the ring IN DEPTH.
// Each is laid out in the being's apparent metres (where it shows on the screen) and pushed back or forward in z,
// its real x,y scaled by (74 - z) / 74 so it lands where it is meant to on the screen: the root rises from behind the
// world canvas (z -42) out at a corner, sweeps a spiral round outside the ring (crossing behind the ring's line,
// z -12 to 0) and its head ends 28 m nearer the camera than the being, over the serpent's side: it hides the body there.
// n 1, 2 always (mirror pair); n 3, 4 thinner, dealt by the seed (ch 288). Grow root to tip u .55-.8, skin from
// op-art stripes to diamond scales or bead rows (ch 289) climbing the body at .74, one goes black with a thin rim at
// the culmination (ch 290), all retract tip-first on the exit (.93-.955). Ch 280 hue, 285 sense, 298 sweep, 299 hot.
import { MeshBasicNodeMaterial, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, mix, atan2 } from "builtin/tsl";
import { tripClock, visionShown, visionU, stripes } from "./lib/trip.js";

const TAU = 6.28318, LEN = 120;
export function material(ctx) {
  const n = Math.max(1, Math.round(ctx.params.n ?? 1)), sg = n % 2 ? 1 : -1, pair = n > 2 ? 1 : 0;
  const c = tripClock(ctx), u = visionU(ctx, c), live = visionShown(ctx, c, 0);
  const inv = (x) => float(1).sub(x), is = (v, i) => step(v.sub(i).abs(), 0.5);
  const io = (a, b, x, y) => smoothstep(a, b, u).mul(inv(smoothstep(x, y, u)));
  const rn = (k) => c.rnd(280 + k), pk = (k, m) => c.pick(280 + k, m);
  const fam = pk(0, 3), hot = pk(19, 3);
  const blue = vec3(0.05, 0.12, 1.0), violet = vec3(0.45, 0.05, 1.0), pink = vec3(1.0, 0.05, 0.6), orange = vec3(1.0, 0.38, 0.02),
    yellow = vec3(1.0, 0.85, 0.05), green = vec3(0.1, 1.0, 0.15), W = vec3(1, 1, 1);
  const A = blue.mul(is(fam, 0)).add(violet.mul(is(fam, 1))).add(blue.mul(is(fam, 2)));
  const B = pink.mul(is(fam, 0)).add(green.mul(is(fam, 1))).add(orange.mul(is(fam, 2)));
  const H = pink.mul(is(hot, 0)).add(yellow.mul(is(hot, 1))).add(green.mul(is(hot, 2)));

  const uu = positionGeometry.y, ca = positionGeometry.x, sa = positionGeometry.z;
  const r0 = pair ? 2.6 : 3.8;
  const exists = pair ? step(0.4, rn(8)) : float(1);
  const grow = io(0.55 + pair * 0.04, 0.8, 0.93, 0.955 - pair * 0.008);
  const tip = smoothstep(grow, grow.sub(0.06), uu);
  const head = smoothstep(0.9, 0.97, uu).mul(inv(smoothstep(0.97, 1, uu))).mul(0.5);   // a swell for the hatchling's head
  const rad = inv(uu.mul(0.85)).max(0).pow(0.6).mul(r0).add(head.mul(r0)).mul(tip.sqrt()).mul(live).mul(exists).mul(step(0.002, grow));
  // the spine: a spiral in apparent screen metres round the ring, from a corner in to the serpent's side
  const sweep = step(0.5, rn(18)).mul(2).sub(1);
  const th0 = pair ? 1.15 : -0.75, th1 = pair ? 0.35 : 0.22;              // radians from the side, up (+) or down (-)
  const th = mix(float(th0), float(th1), uu.pow(0.8)).mul(sweep);
  const rA = mix(float(pair ? 82 : 92), float(pair ? 30 : 23), uu.pow(0.9));
  const zA = mix(float(-42), float(pair ? 18 : 28), uu.pow(1.3));
  const ph = n * 1.9, env = uu.mul(0.7).add(0.3);
  const w1 = uu.mul(10).sub(c.real.mul(1.4).mul(sign(rn(5)))).add(ph).sin().mul(env).mul(4.5);
  const w2 = uu.mul(7).sub(c.real.mul(0.9)).add(ph * 1.3).cos().mul(env).mul(5);
  const rr = rA.add(w1), za = zA.add(w2);
  const k = float(74).sub(za).div(74);                                    // apparent -> real at that depth
  const spine = vec3(th.cos().mul(rr).mul(sg).mul(k), th.sin().mul(rr).mul(k), za);
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  m.positionNode = spine.add(vec3(ca.mul(rad), sa.mul(rad).mul(0.75), sa.mul(rad).mul(-0.65)));

  // the skin by along-length s (metres) and around-angle
  const ang = atan2(sa, ca), s = uu.mul(LEN), rf = inv(uu.mul(0.85)).max(0).pow(0.6).mul(r0);
  const run = c.real.mul(0.6).mul(sign(rn(5)));
  const cStr = mix(W, A, s.mul(0.4).add(run).floor().mod(4).mul(0.34).min(1)).mul(stripes(s.add(run.div(0.4)), 0.4, 0.05));
  const row = s.div(2.6).floor();
  const bd = vec2(s.div(2.6).fract().sub(0.5).mul(2.6), ang.div(TAU).mul(6).add(row.mul(0.5)).fract().sub(0.5).mul(rf.mul(TAU / 6))).length();
  const brad = rf.mul(0.38).min(0.8);
  const cBe = mix(mix(B, W, 0.4), H, step(row.mod(3), 0.5)).mul(inv(smoothstep(brad.sub(0.08), brad, bd)));
  const t = ang.div(TAU).mul(4);
  const dia = stripes(s.mul(0.3).add(t), 1, 0.08).mul(stripes(s.mul(0.3).sub(t), 1, 0.08));
  const cSc = mix(B, A, inv(dia)).mul(dia.mul(0.8).add(0.2));
  const swap = pair ? inv(step(0.5, rn(9))) : step(0.5, rn(9));
  const skin = mix(cStr, mix(cBe, cSc, swap), step(uu, smoothstep(0.74, 0.84, u).mul(1.02)));
  const pulse = smoothstep(0.05, 0, uu.sub(c.beat.fract()).abs()).mul(step(0.001, c.kick));
  const edge = ca.abs();
  const lit = skin.mul(sa.abs().mul(0.45).add(0.55)).add(mix(A, W, 0.5).mul(smoothstep(0.85, 1, edge)).mul(pulse.add(0.45)));
  const eye = step(vec2(uu.sub(0.955).mul(LEN), ang.sub(sg > 0 ? 1.2 : 1.9).mul(rf.max(1))).length(), 0.9).mul(H.length().mul(0).add(1));
  const dark = is(float(n), step(0.5, rn(10)).add(1)).mul(step(uu, smoothstep(0.85, 0.9, u).mul(1.02)));
  const col = mix(lit, W.mul(1.2), eye.mul(step(0.8, grow)));
  m.colorNode = mix(col, mix(A, W, 0.5).mul(smoothstep(0.95, 1, edge)).mul(0.7), dark);
  return m;
}
function sign(r) { return r.step ? step(0.5, r).mul(2).sub(1) : (r > 0.5 ? 1 : -1); }
