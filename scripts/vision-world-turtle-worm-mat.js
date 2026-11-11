// THE WORLD TURTLE'S SEA EELS: real round bodies winding in depth through her scene (params.n = 1..4).
// n 1, 2: rise out of the tide behind the world canvas (z -40) at the bottom corners, pass outside the month ring,
// cross the being's plane and end 30 m nearer the camera than her. n 3, 4 (dealt by the seed): thinner, from the top corners.
// The spine and its travelling waves are bent in the VERTEX stage; the skin is opaque black with neon on it, so the
// body hides whatever is behind it. It grows root to tip (slot u .55-.8), its skin changes from blue/violet op-art
// stripes to bead rows or diamond scales travelling up the body (.8-.9), one eel goes pure black with a thin rim at
// the culmination, and all retract tip-first on the exit. Seed channels shared with the scene: 220 hue, 227 count,
// 228 second skin, 233 which eel goes dark, 237 hot beads.
import { MeshBasicNodeMaterial, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, mix, atan2 as atan2raw } from "builtin/tsl";
const atan2 = (y, x) => atan2raw(y, x.add(1e-5));   // never asked at (0, 0)
import { tripClock, visionShown, visionU, stripes } from "./lib/trip.js";

const TAU = 6.28318, LEN = 110;
export function material(ctx) {
  const n = Math.max(1, Math.round(ctx.params.n ?? 1)), sg = n % 2 ? 1 : -1, pair = n > 2 ? 1 : 0;
  const c = tripClock(ctx), u = visionU(ctx, c), live = visionShown(ctx, c, 0);
  const inv = (x) => float(1).sub(x), is = (v, i) => step(v.sub(i).abs(), 0.5);
  const io = (a, b, x, y) => smoothstep(a, b, u).mul(inv(smoothstep(x, y, u)));
  const rn = (k) => c.rnd(500 + k), pk = (k, m) => c.pick(500 + k, m);
  const fam = pk(0, 3), hot = pk(1, 3);
  const blue = vec3(0.05, 0.12, 1.0), violet = vec3(0.45, 0.05, 1.0), ice = vec3(0.45, 0.6, 1.0), W = vec3(1, 1, 1);
  const A = blue.mul(is(fam, 0)).add(violet.mul(is(fam, 1))).add(blue.mul(is(fam, 2)));
  const B = violet.mul(is(fam, 0)).add(blue.mul(is(fam, 1))).add(ice.mul(is(fam, 2)));
  const HOT = [vec3(1.0, 0.06, 0.6), vec3(1.0, 0.42, 0.02), vec3(1.0, 0.85, 0.05), vec3(0.1, 1.0, 0.15)];
  const hotC = (k) => HOT.reduce((acc, v, i) => acc.add(v.mul(is(k, i))), vec3(0));
  const H = hotC(hot), H2 = hotC(hot.add(pk(16, 3)).add(1).mod(4));

  const uu = positionGeometry.y, ca = positionGeometry.x, sa = positionGeometry.z;
  const r0 = pair ? 2.4 : 3.6;
  const grow = io(0.55 + pair * 0.05, 0.8, 0.93, 0.965 - pair * 0.01);        // root to tip in, tip first out
  const exists = pair ? step(0.45, rn(7)) : float(1);
  const tip = smoothstep(grow, grow.sub(0.07), uu);                            // the growing end closes to a point
  const rad = inv(uu).max(1e-4).sqrt().mul(r0).mul(tip.clamp(0, 1).max(1e-4).sqrt()).mul(live).mul(exists).mul(step(0.002, grow));
  // the spine, in the being's metres (z + toward the camera), and two travelling waves along it
  const ph = pair * 2.1 + (sg > 0 ? 0 : 0.9), env = uu.mul(0.8).add(0.2);
  const w1 = uu.mul(9).sub(c.real.mul(1.3)).add(ph).sin().mul(env).mul(5);
  const w2 = uu.mul(7).sub(c.real.mul(0.9)).add(ph * 1.7).cos().mul(env).mul(4);
  // sea eels: n 1, 2 dive in from the upper corners behind the sea and wind down past the front flippers toward the
  // camera; n 3, 4 rise from the lower corners past the rear flippers. A third, slower wave makes them sinuous.
  const w3 = uu.mul(4).sub(c.real.mul(0.5)).add(ph).sin().mul(env).mul(6);
  const spine = pair
    ? vec3(uu.mul(-76).add(104).mul(sg).add(w1), uu.mul(46).sub(66).add(w2.mul(0.6)).add(w3), uu.mul(62).sub(40).add(w2.mul(0.8)))
    : vec3(uu.mul(-78).add(100).mul(sg).add(w1).add(w3.mul(0.5)), uu.mul(-70).add(60).add(w2.mul(0.6)), uu.mul(64).sub(40).add(w2.mul(0.8)));
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  m.positionNode = spine.add(vec3(ca.mul(rad), sa.mul(rad).mul(0.8), sa.mul(rad).mul(-0.6)));

  // the skin, by along-length s (metres) and around-angle
  const ang = atan2(sa, ca), s = uu.mul(LEN), rf = inv(uu).max(1e-4).sqrt().mul(r0);
  const sk3 = s.mul(0.35).floor().mod(3);
  const cStr = A.mul(is(sk3, 0)).add(B.mul(is(sk3, 1))).add(H2.mul(0.85).mul(is(sk3, 2))).mul(stripes(s, 0.35, 0.04));
  const row = s.div(2.4).floor();
  const bd = vec2(s.div(2.4).fract().sub(0.5).mul(2.4), ang.div(TAU).mul(6).add(row.mul(0.5)).fract().sub(0.5).mul(rf.mul(TAU / 6))).length();
  const brad = rf.mul(0.4).min(0.7);
  const cBe = mix(mix(B, W, 0.3), H, step(row.mod(3), 0.5)).mul(inv(is(row.mod(3), 1))).add(H2.mul(is(row.mod(3), 1))).mul(inv(smoothstep(brad.sub(0.08), brad, bd)));
  const t = ang.div(TAU).mul(3);
  const cSc = mix(B, W, 0.25).mul(stripes(s.mul(0.3).add(t), 1, 0.06).mul(stripes(s.mul(0.3).sub(t), 1, 0.06)));
  const swap = pair ? inv(step(0.5, rn(8))) : step(0.5, rn(8));
  const t1 = 0.8 + pair * 0.03;
  const skin = mix(cStr, mix(cBe, cSc, swap), step(uu, smoothstep(t1, t1 + 0.08, u).mul(1.02)));
  const run = smoothstep(0.05, 0, uu.sub(c.beat.fract()).abs()).mul(step(0.001, c.kick));   // the kick's light runs up the body
  const edge = ca.abs();                                                        // 1 at the silhouette as the camera sees it
  const lit = skin.mul(sa.abs().mul(0.45).add(0.55)).add(mix(A, W, 0.5).mul(smoothstep(0.86, 1, edge)).mul(run.add(0.5)));
  const dark = is(float(n), step(0.5, rn(10)).add(1)).mul(step(uu, smoothstep(0.86, 0.92, u).mul(1.02)));   // one eel: silhouette, climbing it
  m.colorNode = mix(lit, mix(A, W, 0.5).mul(smoothstep(0.95, 1, edge)).mul(0.7), dark);
  return m;
}
