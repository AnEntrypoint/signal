// THE STAR MEDUSA's GREAT TENTACLES (params.n = 1..4): real round bodies corkscrewing in depth. n 1, 2 rise from below
// behind the sea (z -50), pass behind the bell and curl forward to 28 m nearer the camera; n 3, 4 (dealt by the seed)
// hang from the top corners. Opaque black skin with neon on it. Grows root to tip through a halftone sucker tip
// (u .44-.7), skin turns from stripes to sucker rows or diamond scales (.68-.76), one goes silhouette at the
// culmination, all retract tip-first (.86-.93). SKIN MODES per body, rotated by the seed: 0 skin rides the body,
// 1 skin locked to space (the body slides through its own pattern), 2 skin flows back along the body.
// Bend, roundness and palette are per vertex. Seed 360+k: 0 hue, 12 count, 13 second skin, 14 dark one, 18 corkscrew, 50 mode.
import { MeshBasicNodeMaterial, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, mix, atan2, cross, normalize, varying } from "builtin/tsl";
import { tripClock, visionShown, visionU, stripes, inv, is, sgn, ioU, famPick, NEON } from "./lib/trip.js";

const TAU = 6.28318, LEN = 120;
const { BLU, VIO, PNK, ORA, YEL, GRN, W } = NEON;
const FAMS = [[BLU, VIO, YEL, PNK], [VIO, PNK, W, GRN], [PNK, ORA, YEL, BLU], [GRN, BLU, W, ORA]];
// spines (being metres, +z toward the camera): root, the point it passes at its middle, tip; x mirrored by side
const PATHS = { low: [[100, -70, -50], [32, 2, -10], [22, -18, 28]], high: [[92, 72, -50], [40, 28, -8], [30, -4, 26]] };

export function material(ctx) {
  const n = Math.max(1, Math.round(ctx.params.n ?? 1)), sg = n % 2 ? 1 : -1, pair = n > 2 ? 1 : 0;
  const c = tripClock(ctx);
  const hold = ctx.param("hold", -1), held = step(0, hold);   // bench: hold >= 0 pins the slot's u
  const u = mix(visionU(ctx, c), hold.max(0), held);
  const live = mix(visionShown(ctx, c, 0), c.on, held);
  const io = ioU(u);
  const rn = (k) => c.rnd(360 + k), pk = (k, m) => c.pick(360 + k, m);
  const fam = pk(0, 4);
  const A = varying(famPick(FAMS, fam, 0)), B = varying(famPick(FAMS, fam, 1)), H = varying(famPick(FAMS, fam, 2)), H2 = varying(famPick(FAMS, fam, 3));
  const exists = step(float(n), pk(12, 3).add(2.5));

  const uu = positionGeometry.y, ca = positionGeometry.x, sa = positionGeometry.z;
  const r0 = pair ? 2.6 : 3.6;
  const grow = io(0.44 + pair * 0.06, 0.66 + pair * 0.04, 0.86, 0.93 - pair * 0.01);
  const tip = smoothstep(grow, grow.sub(0.06), uu);
  const rf = varying(inv(uu).max(0).pow(0.55).mul(r0).add(0.15));
  const rad = inv(uu).max(0).pow(0.55).mul(r0).add(0.15).mul(tip.max(0).sqrt()).mul(live).mul(exists).mul(step(0.002, grow));
  const [P0, PM, P2] = PATHS[pair ? "high" : "low"];
  const P1 = P0.map((v, i) => 2 * PM[i] - (P0[i] + P2[i]) / 2);
  const cork = sgn(rn(18)), ph = pair * 2.1 + (sg > 0 ? 0 : 0.9);
  const spine = (t) => {
    const a = inv(t).mul(inv(t)), b = t.mul(inv(t)).mul(2), d = t.mul(t);
    const bz = (i) => a.mul(P0[i]).add(b.mul(P1[i])).add(d.mul(P2[i]));
    const env = t.mul(0.7).add(0.3), wph = t.mul(10).sub(c.real.mul(1.4)).add(ph);
    return vec3(bz(0).mul(sg).add(wph.sin().mul(env).mul(4.5)), bz(1).add(wph.cos().mul(cork).mul(env).mul(3.5)), bz(2).add(t.mul(7).sub(c.real.mul(0.8)).add(ph).sin().mul(env).mul(3)));
  };
  const sp = spine(uu);
  const T = normalize(spine(uu.add(0.01)).sub(sp));
  const N1 = normalize(cross(T, mix(vec3(0, 0, 1), vec3(1, 0, 0), step(0.9, T.z.abs()))));   // never parallel: no NaN
  const nrm = N1.mul(ca).add(cross(N1, T).mul(sa));
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  m.fog = false;
  m.positionNode = sp.add(nrm.mul(rad));

  // the skin by along-length s (metres) and around-angle; s is the body's own, space's, or flowing (the mode)
  const mode = pk(50, 3).add(n).mod(3);
  const ang = atan2(sa, ca);
  const s = mix(uu.mul(LEN), varying(sp.y.add(sp.z.mul(0.5)).add(200)), is(mode, 1)).add(c.real.mul(5).mul(is(mode, 2)));
  const sk = s.mul(0.4).floor().mod(3);
  const cStr = A.mul(is(sk, 0)).add(mix(A, W, 0.7).mul(is(sk, 1))).add(H2.mul(0.9).mul(is(sk, 2))).mul(stripes(s.add(ang.mul(0.6)), 0.4, 0.04));
  const row = s.div(2.2).floor(), r3 = row.mod(3);
  const bd = vec2(s.div(2.2).fract().sub(0.5).mul(2.2), ang.div(TAU).mul(6).add(row.mul(0.5)).fract().sub(0.5).mul(rf.mul(TAU / 6))).length();
  const brad = rf.mul(0.38).min(0.75);
  const cBe = mix(mix(B, W, 0.5), H, step(r3, 0.5)).mul(inv(is(r3, 2))).add(H2.mul(is(r3, 2))).mul(inv(smoothstep(brad.sub(0.08), brad, bd))).mul(step(brad.mul(0.35), bd).mul(0.7).add(0.3));
  const t3 = ang.div(TAU).mul(4);
  const cSc = mix(B, W, 0.25).mul(stripes(s.mul(0.3).add(t3), 1, 0.06).mul(stripes(s.mul(0.3).sub(t3), 1, 0.06)));
  const swap = pair ? inv(step(0.5, rn(13))) : step(0.5, rn(13));
  const t1 = 0.68 + pair * 0.03;
  const skin = mix(cStr, mix(cBe, cSc, swap), step(uu, smoothstep(t1, t1 + 0.08, u).mul(1.02)));
  const run = inv(smoothstep(0, 0.05, uu.sub(c.beat.fract()).abs())).mul(step(0.001, c.kick));
  const nz = varying(nrm.z.abs()), rim = inv(nz);   // 1 at the silhouette as the camera sees it
  const lit = skin.mul(nz.mul(0.5).add(0.5)).add(mix(A, W, 0.5).mul(smoothstep(0.75, 1, rim)).mul(run.mul(0.6).add(0.45)));
  const dark = is(float(n), step(0.5, rn(14)).add(1)).mul(step(uu, smoothstep(0.76, 0.8, u).mul(1.02)));
  // the growing tip is a halftone: only its sucker beads stand, the skin closes behind them
  const tipZone = smoothstep(grow.sub(0.14), grow.sub(0.04), uu);
  m.colorNode = mix(mix(lit, mix(H, W, 0.3), tipZone), mix(A, W, 0.5).mul(smoothstep(0.9, 1, rim)).mul(0.8), dark);
  m.opacityNode = mix(float(1), step(bd, brad), tipZone);
  m.alphaTest = 0.5;
  return m;
}
