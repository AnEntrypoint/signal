// THE ZODIAC WHEEL's sky-serpents (params.n 1..4): round opaque bodies following their own head down a turning path,
// so they truly change heading; an undulation and a swell run down the length. 1 and 3 swim in FRONT of the wheel, 2 and 4 BEHIND.
// Skins: 1-2 ride the body (a real worm's uv: banded belt of the houses, hot beads per band); 3-4 carry the star chart,
// locked to world space or running reversed against their swim (picked by seed), so the body slides through its pattern.
import { MeshBasicNodeMaterial, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, mix, atan2 as atan2raw } from "builtin/tsl";
import { tripClock, visionShown, visionU, climb, stripes, inv, is, sgn, ioU, NEON } from "./lib/trip.js";
const atan2 = (y, x) => atan2raw(y, x.add(1e-5));
const fmod = (x, y) => x.sub(x.div(y).floor().mul(y));
const TAU = 6.28318, LEN = 64;
export function material(ctx) {
  const n = Math.max(1, Math.round(ctx.params.n ?? 1)), frontW = n % 2, pair = n > 2 ? 1 : 0;
  const c = tripClock(ctx), u = visionU(ctx, c), live = visionShown(ctx, c, 0), io = ioU(u), low = ctx.quality === "low";
  const rn = (k) => c.rnd(1300 + k), pk = (k, m) => c.pick(1300 + k, m);
  const { BLU, VIO, PNK, ORA, YEL, GRN, W, BG } = NEON;
  const fam = pk(0, 4), hot = pk(1, 4);
  const A = BLU.mul(is(fam, 0)).add(VIO.mul(is(fam, 1))).add(vec3(0.01, 0.55, 0.7).mul(is(fam, 2))).add(GRN.mul(0.8).mul(is(fam, 3)));
  const B = VIO.mul(is(fam, 0)).add(BLU.mul(is(fam, 1).add(is(fam, 3)))).add(VIO.mul(is(fam, 2)));
  const hotC = (k) => [PNK, ORA, YEL, GRN].reduce((a, v, i) => a.add(v.mul(is(k, i))), vec3(0));
  const H = hotC(hot), H2 = hotC(hot.add(pk(2, 3)).add(1).mod(4));
  const kOn = step(0.001, c.kick), cl = climb(c);

  const uu = positionGeometry.y, ca = positionGeometry.x, sa = positionGeometry.z;
  const r0 = pair ? 1.8 : 2.3;
  // pair 0 arrives first and leaves last (LIFO); the body grows out of its own head
  const grow = io(0.6 + pair * 0.04, 0.78, 0.875 - pair * 0.015, 0.9 - pair * 0.015);
  const tip = inv(smoothstep(grow.sub(0.07), grow, uu));
  // a swell travels head to tail, fuller as the highs climb
  const swell = uu.mul(9).sub(c.real.mul(1.7)).sin().mul(0.12).mul(cl.add(0.4)).add(1);
  const rad = inv(uu).max(1e-4).sqrt().mul(r0).mul(swell).mul(tip.clamp(0, 1).max(1e-4).sqrt()).mul(live).mul(step(0.002, grow));
  const f1 = 0.9 + n * 0.17, f2 = 1.5 - n * 0.09, p1 = rn(50 + n).mul(TAU), p2 = n * 2.3 + 0.7;
  const tau = c.real.mul(0.18 + n * 0.025).mul(sgn(rn(55 + n))).sub(uu.mul(1.2)).add(n * 1.7);
  const und = uu.mul(11).sub(c.real.mul(2.1)).add(n * 0.9).sin().mul(uu.mul(0.9).add(0.25)).mul(1.6);
  const X = tau.mul(f1).add(p1).sin().mul(46), Y = tau.mul(f2).add(p2).sin().mul(17).add(tau.mul(0.55).cos().mul(5));
  const dX = tau.mul(f1).add(p1).cos().mul(46 * f1), dY = tau.mul(f2).add(p2).cos().mul(17 * f2).sub(tau.mul(0.55).sin().mul(2.75));
  const il = float(1).div(dX.mul(dX).add(dY.mul(dY)).max(1).sqrt()), nx = dY.mul(il).negate(), ny = dX.mul(il);
  const Z = tau.mul(0.6).add(n).sin().mul(frontW ? 5 : 6).add(frontW ? 13 : -16);
  const off = ca.mul(rad).add(und);
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  m.positionNode = vec3(X.add(nx.mul(off)), Y.add(ny.mul(off)), Z.add(sa.mul(rad)).add(und.mul(0.5)));

  const ang = atan2(sa, ca), rf = inv(uu).max(1e-4).sqrt().mul(r0);
  let skin;
  if (!pair) {
    // the belt of houses: twelve-band cycle, each band bordered, a hot bead on its back that steps colour on kicked bars
    const s = uu.mul(LEN), bnd = s.div(2.2).floor(), k = fmod(bnd, 3);
    const base = A.mul(is(k, 0)).add(B.mul(is(k, 1))).add(mix(B, W, 0.25).mul(is(k, 2)));
    const lines = stripes(s.div(2.2), 1, 0.08);
    const bd = vec2(s.div(2.2).fract().sub(0.5).mul(2.2), ang.div(TAU).mul(4).fract().sub(0.5).mul(rf.mul(TAU / 4))).length();
    const bc = mix(H, H2, is(fmod(bnd.add(c.bar.floor().mul(kOn)), 2), 1));
    const beadR = rf.mul(0.32).min(0.6);
    skin = mix(base.mul(0.55), BG, lines.mul(0.8)).add(bc.mul(inv(smoothstep(beadR.sub(0.08), beadR, bd))));
  } else {
    // the star chart: dark hide, dots and cross-stars; locked to the sky or sliding backward along the body
    const locked = step(0.5, rn(60));
    const s = mix(uu.mul(LEN).add(c.real.mul(0.18 + n * 0.025).mul(LEN / 1.2).mul(2)), X.mul(0.7).add(Y.mul(0.9)), locked);
    const t = ang.div(TAU).mul(5).add(s.mul(0.08));
    const cell = vec2(s.div(1.9), t).floor(), id = cell.x.mul(31).add(cell.y.mul(7));
    const h = id.mul(12.9898).sin().mul(43758.5453).fract();
    const lq = vec2(s.div(1.9).fract().sub(0.5).mul(1.9), t.fract().sub(0.5).mul(rf.mul(TAU / 5)));
    const sz = h.mul(0.25).add(0.12).mul(rf.min(1.4));
    const dot = inv(smoothstep(sz, sz.add(0.06), lq.length())).mul(step(0.35, h));
    const cr = inv(smoothstep(0.03, 0.08, lq.x.abs().min(lq.y.abs()))).mul(step(lq.length(), sz.mul(3.2))).mul(step(0.85, h));
    skin = mix(BG.add(B.mul(0.12)), mix(W, H, step(0.7, h)), dot.max(cr));
  }
  // a kick runs a light ring down the spine, only where the track kicks
  const run = low ? float(0) : inv(smoothstep(0, 0.05, uu.sub(c.beat.fract()).abs())).mul(kOn);
  const rim = smoothstep(0.82, 1, ca.abs());
  m.colorNode = skin.mul(sa.abs().mul(0.4).add(0.6)).add(mix(A, W, 0.5).mul(rim).mul(run.add(0.4)));
  return m;
}
