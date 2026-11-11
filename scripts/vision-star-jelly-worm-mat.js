// THE STAR MEDUSA's GREAT TENTACLES (params.n = 1..4): tentacles of a medusa too large to see, real round bodies
// corkscrewing in depth through the scene. n 1, 2 rise from below the frame behind the sea (z -50), pass behind the
// bell's edge and curl forward over the outer tentacles, ending 28 m nearer the camera; n 3, 4 (dealt by the seed)
// hang down from the surface at the top corners. Opaque black skin with neon on it, so the body hides what is behind.
// Grows root to tip (u .55-.8), skin turns from op-art stripes to sucker bead rows or diamond scales climbing the
// body (.78-.86), one goes pure black with a thin rim at the culmination, all retract tip-first on the exit.
// Seed channels shared with the scene: 360 hue, 372 count, 373 second skin, 374 which goes dark, 378 corkscrew sense.
import { MeshBasicNodeMaterial, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, mix, atan2, cross, normalize } from "builtin/tsl";
import { tripClock, visionShown, visionU, stripes } from "./lib/trip.js";

const TAU = 6.28318, LEN = 120;
const COL = { blue: [0.02, 0.05, 1], violet: [0.24, 0.02, 1], pink: [1, 0.02, 0.33], orange: [1, 0.17, 0.01], yellow: [1, 0.72, 0.02], green: [0.03, 1, 0.06], white: [1, 1, 1] };
const FAMS = [["blue", "violet", "yellow"], ["violet", "pink", "white"], ["pink", "orange", "yellow"], ["green", "blue", "white"]];
// spines (being metres, +z toward the camera): root, the point it passes at its middle, tip; x mirrored by side
const PATHS = { low: [[100, -70, -50], [32, 2, -10], [22, -18, 28]], high: [[92, 72, -50], [40, 28, -8], [30, -4, 26]] };

export function material(ctx) {
  const n = Math.max(1, Math.round(ctx.params.n ?? 1)), sg = n % 2 ? 1 : -1, pair = n > 2 ? 1 : 0;
  const c = tripClock(ctx);
  const hold = ctx.param("hold", -1), held = step(0, hold);   // bench: hold >= 0 pins the slot's u
  const u = mix(visionU(ctx, c), hold.max(0), held);
  const live = mix(visionShown(ctx, c, 0), c.on, held);
  const inv = (x) => float(1).sub(x), is = (v, i) => step(v.sub(i).abs(), 0.5);
  const io = (a, b, x, y) => smoothstep(a, b, u).mul(inv(smoothstep(x, y, u)));
  const rn = (k) => c.rnd(360 + k), pk = (k, m) => c.pick(360 + k, m);
  const fam = pk(0, 4);
  const famCol = (slot) => { let v = vec3(0); FAMS.forEach((f, i) => { v = v.add(vec3(...COL[f[slot]]).mul(is(fam, i))); }); return v; };
  const A = famCol(0), B = famCol(1), H = famCol(2), W = vec3(1, 1, 1);
  const cnt = pk(12, 3).add(2);
  const exists = step(float(n), cnt.add(0.5));

  const uu = positionGeometry.y, ca = positionGeometry.x, sa = positionGeometry.z;
  const r0 = pair ? 2.6 : 3.6;
  const grow = io(0.55 + pair * 0.05, 0.8, 0.93, 0.965 - pair * 0.01);
  const tip = smoothstep(grow, grow.sub(0.06), uu);
  const rad = inv(uu).max(0).pow(0.55).mul(r0).add(0.15).mul(tip.sqrt()).mul(live).mul(exists).mul(step(0.002, grow));
  const [P0, PM, P2] = PATHS[pair ? "high" : "low"];
  const P1 = P0.map((v, i) => 2 * PM[i] - (P0[i] + P2[i]) / 2);
  const cork = rn(18).step(0.5).mul(2).sub(1), ph = pair * 2.1 + (sg > 0 ? 0 : 0.9);
  const spine = (t) => {
    const a = inv(t).mul(inv(t)), b = t.mul(inv(t)).mul(2), d = t.mul(t);
    const bz = (i) => a.mul(P0[i]).add(b.mul(P1[i])).add(d.mul(P2[i]));
    const env = t.mul(0.7).add(0.3), wph = t.mul(10).sub(c.real.mul(1.4)).add(ph);
    return vec3(bz(0).mul(sg).add(wph.sin().mul(env).mul(4.5)), bz(1).add(wph.cos().mul(cork).mul(env).mul(3.5)), bz(2).add(t.mul(7).sub(c.real.mul(0.8)).add(ph).sin().mul(env).mul(3)));
  };
  const sp = spine(uu);
  const T = normalize(spine(uu.add(0.01)).sub(sp));
  const N1 = normalize(cross(T, mix(vec3(0, 0, 1), vec3(1, 0, 0), step(0.9, T.z.abs()))));   // never parallel: no NaN
  const N2 = cross(N1, T);
  const nrm = N1.mul(ca).add(N2.mul(sa));
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  m.fog = false;
  m.positionNode = sp.add(nrm.mul(rad));

  // the skin by along-length s (metres) and around-angle
  const ang = atan2(sa, ca), s = uu.mul(LEN), rf = inv(uu).max(0).pow(0.55).mul(r0).add(0.15);
  const cStr = mix(A, W, s.mul(0.4).floor().mod(2).mul(0.7)).mul(stripes(s.add(ang.mul(0.6)), 0.4, 0.04));
  const row = s.div(2.2).floor();
  const bd = vec2(s.div(2.2).fract().sub(0.5).mul(2.2), ang.div(TAU).mul(6).add(row.mul(0.5)).fract().sub(0.5).mul(rf.mul(TAU / 6))).length();
  const brad = rf.mul(0.38).min(0.75);
  const cBe = mix(mix(B, W, 0.5), H, step(row.mod(3), 0.5)).mul(inv(smoothstep(brad.sub(0.08), brad, bd))).mul(step(brad.mul(0.35), bd).mul(0.7).add(0.3));
  const t3 = ang.div(TAU).mul(4);
  const cSc = mix(B, W, 0.25).mul(stripes(s.mul(0.3).add(t3), 1, 0.06).mul(stripes(s.mul(0.3).sub(t3), 1, 0.06)));
  const swap = pair ? inv(step(0.5, rn(13))) : step(0.5, rn(13));
  const t1 = 0.78 + pair * 0.03;
  const skin = mix(cStr, mix(cBe, cSc, swap), step(uu, smoothstep(t1, t1 + 0.08, u).mul(1.02)));
  const run = smoothstep(0.05, 0, uu.sub(c.beat.fract()).abs()).mul(step(0.001, c.kick));
  const rim = inv(nrm.z.abs());                                                  // 1 at the silhouette as the camera sees it
  const lit = skin.mul(nrm.z.abs().mul(0.5).add(0.5)).add(mix(A, W, 0.5).mul(smoothstep(0.75, 1, rim)).mul(run.mul(0.6).add(0.45)));
  const dark = is(float(n), step(0.5, rn(14)).add(1)).mul(step(uu, smoothstep(0.85, 0.9, u).mul(1.02)));
  m.colorNode = mix(lit, mix(A, W, 0.5).mul(smoothstep(0.9, 1, rim)).mul(0.8), dark);
  return m;
}
