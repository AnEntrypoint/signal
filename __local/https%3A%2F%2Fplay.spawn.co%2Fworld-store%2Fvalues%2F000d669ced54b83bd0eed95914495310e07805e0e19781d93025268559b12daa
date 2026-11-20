// THE BEE QUEEN's honey-serpents (params.n 1..4): round opaque bodies following their own head down a turning path, so they truly
// change heading; a swell runs down the length. 1 and 3 swim in FRONT of her (through the caps' depth), 2 and 4 BEHIND (through the
// waggle wheel's). Skin: 1-2 ride the body (bee bands with bead rows, a real worm's uv); 3-4 are locked to world space: honeycomb lines
// the body slides through. Late, a band of light runs head to tail on each kick.
import { MeshBasicNodeMaterial, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, mix, atan2 as atan2raw, fwidth } from "builtin/tsl";
import { tripClock, visionShown, visionU, stripes, inv, is, sgn, ioU, climb, NEON } from "./lib/trip.js";
const atan2 = (y, x) => atan2raw(y, x.add(1e-5));
const TAU = 6.28318, LEN = 64, S3 = 1.7320508;
const fm = (x, y) => x.sub(x.div(y).floor().mul(y));
export function material(ctx) {
  const n = Math.max(1, Math.round(ctx.params.n ?? 1)), frontW = n % 2, pair = n > 2 ? 1 : 0;
  const c = tripClock(ctx), u = visionU(ctx, c), live = visionShown(ctx, c, 0), io = ioU(u), low = ctx.quality === "low";
  const rn = (k) => c.rnd(1260 + k), pk = (k, m) => c.pick(1260 + k, m);
  const { BLU, VIO, PNK, ORA, YEL, GRN, W, BG } = NEON;
  const fam = pk(0, 3), hot = pk(1, 4);
  const A = BLU.mul(is(fam, 0)).add(VIO.mul(is(fam, 1))).add(vec3(0.01, 0.55, 0.65).mul(is(fam, 2)));
  const B = VIO.mul(is(fam, 0)).add(BLU.mul(inv(is(fam, 0))));
  const hotC = (k) => [YEL, ORA, PNK, GRN].reduce((a, v, i) => a.add(v.mul(is(k, i))), vec3(0));
  const H = hotC(hot), H2 = hotC(hot.add(pk(2, 3)).add(1).mod(4));

  const uu = positionGeometry.y, ca = positionGeometry.x, sa = positionGeometry.z;
  const r0 = pair ? 1.8 : 2.3;
  // they slide in after the comb, behind ones first, and leave before the seat goes
  const grow = io(0.52 + n * 0.035, 0.7 + n * 0.02, 0.9 - n * 0.008, 0.94 - n * 0.008).mul(climb(c).mul(0.15).add(0.85));
  const tip = inv(smoothstep(grow.sub(0.08), grow, uu));
  const swell = uu.mul(9).sub(c.real.mul(1.7)).add(n).sin().mul(0.18).add(1);
  const rad = inv(uu).max(1e-4).sqrt().mul(r0).mul(swell).mul(tip.clamp(0, 1).max(1e-4).sqrt()).mul(live).mul(step(0.002, grow));
  const f1 = 0.9 + n * 0.17, f2 = 1.5 - n * 0.09, p1 = rn(13 + n).mul(TAU), p2 = n * 2.3 + 0.7;
  const tau = c.real.mul(0.17 + n * 0.025).mul(sgn(rn(17 + n))).sub(uu.mul(1.25)).add(n * 1.7);
  const und = uu.mul(11).sub(c.real.mul(2.1)).add(n * 0.8).sin().mul(uu.mul(0.9).add(0.25)).mul(1.6);
  const X = tau.mul(f1).add(p1).sin().mul(42).add(tau.mul(2.3).sin().mul(5));
  const Y = tau.mul(f2).add(p2).sin().mul(17).add(tau.mul(0.7).cos().mul(4));
  const dX = tau.mul(f1).add(p1).cos().mul(42 * f1).add(tau.mul(2.3).cos().mul(11.5));
  const dY = tau.mul(f2).add(p2).cos().mul(17 * f2).sub(tau.mul(0.7).sin().mul(2.8));
  const il = float(1).div(dX.mul(dX).add(dY.mul(dY)).max(1).sqrt()), nx = dY.mul(il).negate(), ny = dX.mul(il);
  const Z = tau.mul(0.6).add(n).sin().mul(frontW ? 5 : 6).add(frontW ? 14 : -16);
  const off = ca.mul(rad).add(und);
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  const wx = X.add(nx.mul(off)), wy = Y.add(ny.mul(off));
  m.positionNode = vec3(wx, wy, Z.add(sa.mul(rad)).add(und.mul(0.5)));

  const ang = atan2(sa, ca), rf = inv(uu).max(1e-4).sqrt().mul(r0);
  // 1-2: bee bands along the body with a bead row in every dark band
  const s = uu.mul(LEN), k3 = s.div(2.2).floor(), f = fm(s, float(2.2)).div(2.2);
  const dark = step(0.5, fm(k3, float(2)));
  const bd = vec2(f.sub(0.5).mul(2.2), ang.div(TAU).mul(8).add(k3.mul(0.5)).fract().sub(0.5).mul(rf.mul(TAU / 8))).length();
  const brad = rf.mul(0.3).min(0.55);
  const cBand = mix(mix(H, H2, step(0.5, fm(k3.div(2).floor(), float(2)))).mul(stripes(s.div(2.2), 0.5, 0.05).mul(0.3).add(0.7)),
    BG.add(mix(A, W, 0.3).mul(inv(smoothstep(brad.sub(0.08), brad, bd)))), dark);
  // 3-4: honeycomb locked to world space; the body swims through a comb that holds still
  const hp = vec2(wx, wy).div(2.6), Rv = vec2(1, S3), Hh = vec2(0.5, S3 / 2);
  const ga = fm(hp, Rv).sub(Hh), gb = fm(hp.sub(Hh), Rv).sub(Hh), g = mix(gb, ga, step(ga.dot(ga), gb.dot(gb))).abs();
  const e = g.x.max(g.x.mul(0.5).add(g.y.mul(S3 / 2))), de = float(0.5).sub(e), fw = fwidth(de).max(0.004);
  const cComb = mix(B.mul(0.35), H, inv(smoothstep(float(0.06), fw.add(0.06), de))).add(W.mul(inv(smoothstep(float(0.05), fw.add(0.05), e))).mul(0.6));
  const skin = pair ? cComb : cBand;
  const run = low ? float(0) : inv(smoothstep(0, 0.06, uu.sub(c.beat.fract()).abs())).mul(step(0.001, c.kick));
  m.colorNode = skin.mul(sa.abs().mul(0.4).add(0.6)).add(mix(A, W, 0.5).mul(smoothstep(0.86, 1, ca.abs())).mul(run.add(0.4)));
  return m;
}
