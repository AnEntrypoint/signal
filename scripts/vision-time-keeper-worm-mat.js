// THE TIME KEEPER's worms (params.n 1..4): round bodies trailing their own head down a turning path, so they truly change heading;
// a swell runs down the length like a pulse. 1 and 3 swim in FRONT of the hourglass, 2 and 4 BEHIND it (through the ring's depth).
// Skin: 1-2 ride the body (a real worm's uv: dial ticks and hour beads), 3-4 are locked to world space and run reversed against their swim.
import { MeshBasicNodeMaterial, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, mix, atan2 as atan2raw } from "builtin/tsl";
import { tripClock, visionShown, visionU, stripes, climb, inv, is, sgn, ioU, NEON } from "./lib/trip.js";
const atan2 = (y, x) => atan2raw(y, x.add(1e-5));
const TAU = 6.28318, LEN = 72;
export function material(ctx) {
  const n = Math.max(1, Math.round(ctx.params.n ?? 1)), frontW = n % 2, pair = n > 2 ? 1 : 0;
  const c = tripClock(ctx), u = visionU(ctx, c), live = visionShown(ctx, c, 0), io = ioU(u), low = ctx.quality === "low";
  const rn = (k) => c.rnd(1280 + k), pk = (k, m) => c.pick(1280 + k, m);
  const { BLU, VIO, PNK, ORA, YEL, GRN, W } = NEON;
  const fam = pk(0, 4), hot = pk(1, 4);
  const A = BLU.mul(is(fam, 0)).add(VIO.mul(is(fam, 1))).add(vec3(0.01, 0.5, 0.6).mul(is(fam, 2))).add(vec3(0.02, 0.9, 0.35).mul(is(fam, 3)));
  const B = VIO.mul(is(fam, 0)).add(BLU.mul(is(fam, 1).add(is(fam, 2)))).add(vec3(0.01, 0.4, 1).mul(is(fam, 3)));
  const hotC = (k) => [PNK, ORA, YEL, GRN].reduce((a, v, i) => a.add(v.mul(is(k, i))), vec3(0));
  const H = hotC(hot), H2 = hotC(hot.add(pk(2, 3)).add(1).mod(4));
  const kOn = step(0.001, c.kick);

  const uu = positionGeometry.y, ca = positionGeometry.x, sa = positionGeometry.z;
  const r0 = pair ? 1.6 : 2.2;
  // they arrive with the world's rings and leave just before the cogs: front pair first in, last out
  const grow = io(0.5 + pair * 0.06, 0.72, 0.9 - pair * 0.02, 0.95 - pair * 0.02);
  const tip = inv(smoothstep(grow.sub(0.07), grow, uu));
  const swell = uu.mul(9).sub(c.real.mul(1.6)).add(n).sin().mul(0.18).add(1);            // a pulse travelling down the body
  const rad = inv(uu).max(1e-4).sqrt().mul(r0).mul(swell).mul(tip.clamp(0, 1).max(1e-4).sqrt()).mul(live).mul(step(0.002, grow));
  // the head leads (uu 0); the body follows the same lemniscate-ish path later in time
  const f1 = 0.9 + n * 0.17, f2 = 1.9 - n * 0.13, p1 = rn(13 + n).mul(TAU), p2 = rn(17 + n).mul(TAU);
  const tau = c.real.mul(0.17 + n * 0.025).mul(sgn(rn(21))).sub(uu.mul(1.05)).add(n * 1.7);
  const und = uu.mul(11).sub(c.real.mul(2.1)).add(n * 2).sin().mul(uu.mul(0.7).add(0.3)).mul(1.6).mul(climb(c).mul(0.4).add(0.8));
  const ax = pair ? 40 : 34, ay = pair ? 18 : 13;
  const X = tau.mul(f1).add(p1).sin().mul(ax), Y = tau.mul(f2).add(p2).sin().mul(ay).add(tau.mul(0.5).cos().mul(5));
  const dX = tau.mul(f1).add(p1).cos().mul(ax * f1), dY = tau.mul(f2).add(p2).cos().mul(ay * f2).sub(tau.mul(0.5).sin().mul(2.5));
  const il = float(1).div(dX.mul(dX).add(dY.mul(dY)).max(1).sqrt()), nx = dY.mul(il).negate(), ny = dX.mul(il);
  const Z = tau.mul(0.6).add(n).sin().mul(frontW ? 5 : 6).add(frontW ? 14 : -16);
  const off = ca.mul(rad).add(und);
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  m.positionNode = vec3(X.add(nx.mul(off)), Y.add(ny.mul(off)), Z.add(sa.mul(rad)).add(und.mul(0.5)));

  const ang = atan2(sa, ca), rf = inv(uu).max(1e-4).sqrt().mul(r0);
  let skin;
  if (!pair) {
    // body skin: a dial's minute ticks round the body every so often, an hour bead between
    const s = uu.mul(LEN), seg = s.div(3).floor(), sf = s.div(3).fract().sub(0.5).mul(3);
    const ticks = inv(smoothstep(0.12, 0.2, sf.abs())).mul(step(0.5, ang.div(TAU).mul(12).fract().sub(0.5).abs().mul(-1).add(0.75)));
    const bd = vec2(sf.sub(1.5).abs().min(sf.add(1.5).abs()), ang.div(TAU).mul(4).fract().sub(0.5).mul(rf.mul(TAU / 4))).length();
    const bead = inv(smoothstep(0.42, 0.52, bd.min(sf.abs().add(9))));
    const base = mix(A, B, step(0.5, seg.mod(2))).mul(0.55);
    skin = base.add(mix(W, H, 0.3).mul(inv(smoothstep(0.08, 0.16, sf.abs())))).add(H2.mul(bead).mul(0.8));
    skin = mix(skin, mix(H, H2, c.beat.floor().mod(2).mul(kOn)), ticks.mul(0.9));
  } else {
    // world-locked: the body slides through a still field of chevron stripes, the field running against the swim
    const s = vec2(X, Y).dot(vec2(0.7, 0.7)).add(c.real.mul(1.2).mul(sgn(rn(22)).negate())).add(ang.mul(0.6));
    const k3 = s.mul(0.4).floor().mod(3);
    skin = A.mul(is(k3, 0)).add(B.mul(is(k3, 1))).add(H.mul(0.85).mul(is(k3, 2))).mul(stripes(s, 0.4, 0.05));
  }
  const run = low ? float(0) : inv(smoothstep(0, 0.05, uu.sub(c.beat.fract()).abs())).mul(kOn);
  m.colorNode = skin.mul(sa.abs().mul(0.45).add(0.55)).add(mix(A, W, 0.5).mul(smoothstep(0.86, 1, ca.abs())).mul(run.add(0.4)));
  return m;
}
