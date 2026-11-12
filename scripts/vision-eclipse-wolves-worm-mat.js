// THE ECLIPSE WOLVES' night-serpents (params.n 1..4): bodies follow their own head down a turning path, so they truly change heading;
// a swell runs down the length. 1 and 3 swim in FRONT of the wolves, 2 and 4 BEHIND them. Skin: 1-2 ride the body (flame-fur chevrons
// on a real worm uv), 3-4 are locked to world space (aurora bead rows the body slides through). Kick only: a bright ring runs head to tail.
import { MeshBasicNodeMaterial, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, mix, atan2 as atan2raw, fwidth } from "builtin/tsl";
import { tripClock, visionShown, visionU, climb, inv, is, sgn, ioU, NEON } from "./lib/trip.js";
const atan2 = (y, x) => atan2raw(y, x.add(1e-5));
const TAU = 6.28318, LEN = 64;
const band = (x) => { const e = fwidth(x).mul(0.7).min(0.25); return smoothstep(float(0.25).sub(e), e.add(0.25), x.fract().sub(0.5).abs()); };
export function material(ctx) {
  const n = Math.max(1, Math.round(ctx.params.n ?? 1)), frontW = n % 2, pair = n > 2 ? 1 : 0;
  const c = tripClock(ctx), u = visionU(ctx, c), live = visionShown(ctx, c, 0), io = ioU(u), low = ctx.quality === "low";
  const rn = (k) => c.rnd(1240 + k), pk = (k, m) => c.pick(1240 + k, m);
  const { BLU, VIO, PNK, ORA, YEL, GRN, W } = NEON;
  const fam = pk(0, 3), hot = pk(1, 4);
  const A = BLU.mul(is(fam, 0)).add(VIO.mul(is(fam, 1))).add(vec3(0.01, 0.55, 0.62).mul(is(fam, 2)));
  const B = VIO.mul(is(fam, 0)).add(PNK.mul(0.75).mul(is(fam, 1))).add(BLU.mul(is(fam, 2)));
  const hotC = (k) => [PNK, ORA, YEL, GRN].reduce((a, v, i) => a.add(v.mul(is(k, i))), vec3(0));
  const H = hotC(hot), H2 = hotC(hot.add(pk(2, 3)).add(1).mod(4));
  const kOn = step(0.001, c.kick), cl = climb(c);

  const uu = positionGeometry.y, ca = positionGeometry.x, sa = positionGeometry.z;
  const r0 = (pair ? 1.6 : 2.2) * (frontW ? 1 : 1.25);
  // pair 0 arrives first and leaves last; each grows head-first out of nothing and is reeled back tail-first
  const grow = io(0.62 + pair * 0.06, 0.74 + pair * 0.04, 0.9 - pair * 0.02, 0.92 - pair * 0.02);
  const tip = inv(smoothstep(grow.sub(0.07), grow, uu));
  const swell = uu.mul(9).sub(c.real.mul(1.8)).add(n).sin().mul(0.18).add(1).mul(cl.mul(0.2).add(0.9));
  const rad = inv(uu).max(1e-4).sqrt().mul(r0).mul(swell).mul(tip.clamp(0, 1).max(1e-4).sqrt()).mul(live).mul(step(0.002, grow));
  const f1 = 0.9 + n * 0.17, f2 = 1.5 + n * 0.09, p1 = rn(20 + n).mul(TAU), p2 = n * 2.3 + 0.7;
  const tau = c.real.mul(0.17 + n * 0.025).mul(sgn(rn(19 + n))).sub(uu.mul(1.3)).add(n * 1.7);
  const und = uu.mul(11).sub(c.real.mul(2.1)).add(n * 1.3).sin().mul(uu.mul(0.9).add(0.25)).mul(1.8);
  const ax = frontW ? 40 : 48, ay = frontW ? 15 : 19;
  const X = tau.mul(f1).add(p1).sin().mul(ax), Y = tau.mul(f2).add(p2).sin().mul(ay).add(tau.mul(0.5).cos().mul(4));
  const dX = tau.mul(f1).add(p1).cos().mul(ax * f1), dY = tau.mul(f2).add(p2).cos().mul(ay * f2).sub(tau.mul(0.5).sin().mul(2));
  const il = float(1).div(dX.mul(dX).add(dY.mul(dY)).max(1).sqrt()), nx = dY.mul(il).negate(), ny = dX.mul(il);
  const Z = tau.mul(0.6).add(n).sin().mul(5).add(frontW ? 13 : -15);
  const off = ca.mul(rad).add(und);
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  m.positionNode = vec3(X.add(nx.mul(off)), Y.add(ny.mul(off)), Z.add(sa.mul(rad)).add(und.mul(0.5)));

  const ang = atan2(sa, ca), rf = inv(uu).max(1e-4).sqrt().mul(r0);
  let skin;
  if (!pair) {
    // flame-fur chevrons riding the body
    const s = uu.mul(LEN), ch = s.div(1.6).sub(ang.abs().mul(0.7)), k3 = ch.floor().mod(3);
    skin = A.mul(is(k3, 0)).add(B.mul(is(k3, 1))).add(H.mul(0.9).mul(is(k3, 2))).mul(band(ch));
  } else {
    // aurora bead rows fixed in the sky: the body slides through them
    const s = X.mul(0.7).add(Y.mul(0.7)), row = s.div(2.2).floor();
    const bd = vec2(s.div(2.2).fract().sub(0.5).mul(2.2), ang.div(TAU).mul(6).add(row.mul(0.5)).fract().sub(0.5).mul(rf.mul(TAU / 6))).length();
    const brad = rf.mul(0.38).min(0.75);
    skin = mix(mix(GRN, A, step(0.5, row.mod(2))), H2, step(row.mod(5), 0.5)).mul(inv(smoothstep(brad.sub(0.08), brad, bd))).add(B.mul(0.12));
  }
  const run = low ? float(0) : inv(smoothstep(0, 0.05, uu.sub(c.beat.fract()).abs())).mul(kOn);
  m.colorNode = skin.mul(sa.abs().mul(0.45).add(0.55)).add(mix(A, W, 0.5).mul(smoothstep(0.86, 1, ca.abs())).mul(0.5)).add(W.mul(run).mul(0.8));
  return m;
}
