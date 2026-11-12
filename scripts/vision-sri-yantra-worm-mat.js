// THE SRI YANTRA's pilgrims (params.n 1..4): round bodies walking the circuit round the yantra (pradakshina), radius wandering, so the heading
// turns all the way round; an undulation runs down the length. 1 and 3 pass in FRONT of the triangles, 2 and 4 BEHIND them (through the lotus depth).
// Skin: 1-2 wear triangle chevrons that ride the body (real worm uv; 2's run tail-to-head); 3-4 slide through pond ripples locked to world space.
import { MeshBasicNodeMaterial, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, mix, atan2 as atan2raw } from "builtin/tsl";
import { tripClock, visionShown, visionU, inv, is, sgn, ioU, NEON } from "./lib/trip.js";
const atan2 = (y, x) => atan2raw(y, x.add(1e-5));
const TAU = 6.28318, LEN = 60;
export function material(ctx) {
  const n = Math.max(1, Math.round(ctx.params.n ?? 1)), frontW = n % 2, pair = n > 2 ? 1 : 0;
  const c = tripClock(ctx), u = visionU(ctx, c), live = visionShown(ctx, c, 0), io = ioU(u), low = ctx.quality === "low";
  const rn = (k) => c.rnd(1100 + k), pk = (k, m) => c.pick(1100 + k, m);
  const { BLU, VIO, PNK, ORA, YEL, GRN, W, BG } = NEON;
  const fam = pk(0, 3), hot = pk(1, 4);
  const A = BLU.mul(is(fam, 0)).add(VIO.mul(is(fam, 1))).add(vec3(0.01, 0.6, 0.75).mul(is(fam, 2)));
  const B = VIO.mul(is(fam, 0)).add(BLU.mul(is(fam, 1))).add(GRN.mul(0.7).mul(is(fam, 2)));
  const hotC = (k) => [PNK, ORA, YEL, GRN].reduce((a, v, i) => a.add(v.mul(is(k, i))), vec3(0));
  const H = hotC(hot), H2 = hotC(hot.add(pk(2, 3)).add(1).mod(4));
  const kOn = step(0.001, c.kick), beatP = c.beat.floor().max(0).mul(0.5).fract().mul(2).mul(kOn);

  const uu = positionGeometry.y, ca = positionGeometry.x, sa = positionGeometry.z;
  const r0 = (pair ? 1.5 : 2.1) * (frontW ? 1 : 1.15);
  const grow = io(0.5 + pair * 0.08, 0.78, 0.9 - pair * 0.015, 0.95 - pair * 0.015);
  const tip = inv(smoothstep(grow.sub(0.07), grow, uu));
  const taper = uu.mul(inv(uu)).mul(4).max(1e-4).sqrt().mul(0.75).add(0.25).mul(inv(smoothstep(0.9, 1, uu)).max(1e-4).sqrt());
  const rad = taper.mul(r0).mul(tip.clamp(0, 1).max(1e-4).sqrt()).mul(live).mul(step(0.002, grow));
  // head leads (uu 0); the body follows the same circuit later in time. Each walks its own way round, at its own pace.
  const dir = sgn(rn(17 + (n % 2))), f1 = 1, f2 = 2.3 + n * 0.37, p1 = rn(13 + n).mul(TAU).add(n * 1.57), p2 = n * 1.9;
  const tau = c.real.mul(0.17 + n * 0.022).sub(uu.mul(1.25)).mul(dir).add(p1);
  const rho = tau.mul(f2).add(p2).sin().mul(9).add(28 + pair * 5), dRho = tau.mul(f2).add(p2).cos().mul(9 * f2);
  const cT = tau.mul(f1).cos(), sT = tau.mul(f1).sin(), EX = 1.12, EY = 0.6;
  const X = rho.mul(cT).mul(EX), Y = rho.mul(sT).mul(EY);
  const dX = dRho.mul(cT).sub(rho.mul(sT).mul(f1)).mul(EX), dY = dRho.mul(sT).add(rho.mul(cT).mul(f1)).mul(EY);
  const il = float(1).div(dX.mul(dX).add(dY.mul(dY)).max(1).sqrt()), nx = dY.mul(il).negate(), ny = dX.mul(il);
  const und = uu.mul(11).sub(c.real.mul(2.1)).add(n * 1.7).sin().mul(uu.mul(0.75).add(0.25)).mul(1.6);
  const Z = tau.mul(0.7).add(n).sin().mul(frontW ? 5 : 6).add(frontW ? 13 : -15);
  const off = ca.mul(rad).add(und);
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  m.positionNode = vec3(X.add(nx.mul(off)), Y.add(ny.mul(off)), Z.add(sa.mul(rad)).add(und.mul(0.6)));

  const ang = atan2(sa, ca), v = ang.abs().div(3.14159);
  let skin;
  if (!pair) {
    // triangle chevrons riding the body; worm 2's run the other way down it. Kick: the triangles flip to point back, beat by beat
    const s = (n === 2 ? inv(uu) : uu).mul(LEN).div(3.2), row = s.floor(), f0 = s.fract(), f = mix(f0, inv(f0), beatP);
    const tri = smoothstep(-0.04, 0.04, f.sub(v)), k3 = row.sub(row.div(3).floor().mul(3));
    const line = inv(smoothstep(0.04, 0.09, f.sub(v).abs()));
    const body = A.mul(is(k3, 0)).add(B.mul(is(k3, 1))).add(H.mul(0.9).mul(is(k3, 2)));
    skin = mix(BG.mul(2), body, tri).add(mix(H2, W, 0.4).mul(line));
  } else {
    // pond ripples fixed in the world: the body slides through them. 3 and 4 read different ring spacings; hollow / filled swap on the kick
    const wx = X.add(nx.mul(und)), wy = Y.add(ny.mul(und)), rw = vec2(wx, wy).length(), sp = n === 3 ? 2.6 : 3.8;
    const k = rw.div(sp).floor(), fr = rw.div(sp).fract().sub(0.5), kp = k.mul(0.5).fract().mul(2);
    const fa = ang.div(TAU).mul(5).add(kp.mul(0.5)).fract().sub(0.5), l = vec2(fa.mul(0.9), fr).length();
    const hol = kp.add(beatP).mul(0.5).fract().mul(2);
    const dot = mix(inv(smoothstep(0.26, 0.32, l)), inv(smoothstep(0.05, 0.1, l.sub(0.24).abs())), low ? float(0) : hol);
    skin = mix(B, A, kp).mul(0.28).add(mix(mix(H2, W, 0.3), H, kp).mul(dot));
  }
  const run = low ? float(0) : inv(smoothstep(0, 0.05, uu.sub(c.beat.fract()).abs())).mul(kOn);
  m.colorNode = skin.mul(sa.abs().mul(0.45).add(0.55)).add(mix(B, W, 0.5).mul(smoothstep(0.88, 1, ca.abs())).mul(run.add(0.45)));
  return m;
}
