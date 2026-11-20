// THE PEACOCK's train-serpents (params.n 1..4): round opaque bodies following their own head along a turning path, so they
// truly change heading; an undulation runs down the length. 1 and 3 swim in FRONT of the bird, 2 and 4 BEHIND it.
// Skin: 1-2 ride the body (scale arcs and eye-spots in the worm's own uv; 2's rows run against its swim);
// 3-4 are locked to world space: the body slides through still rings centred on the fan's root.
import { MeshBasicNodeMaterial, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, mix, atan2 as atan2raw } from "builtin/tsl";
import { tripClock, visionShown, visionU, inv, is, sgn, ioU, NEON } from "./lib/trip.js";
const atan2 = (y, x) => atan2raw(y, x.add(1e-5));
const TAU = 6.28318, LEN = 64;
export function material(ctx) {
  const n = Math.max(1, Math.round(ctx.params.n ?? 1)), frontW = n % 2, pair = n > 2 ? 1 : 0;
  const c = tripClock(ctx), u = visionU(ctx, c), live = visionShown(ctx, c, 0), io = ioU(u), low = ctx.quality === "low";
  const rn = (k) => c.rnd(1160 + k), pk = (k, m) => c.pick(1160 + k, m);
  const { BLU, VIO, PNK, ORA, YEL, GRN, W, BG } = NEON;
  const fam = pk(0, 4), hot = pk(1, 4), TEAL = vec3(0.01, 0.55, 0.5);
  const A = BLU.mul(is(fam, 0).add(is(fam, 3))).add(VIO.mul(is(fam, 1))).add(TEAL.mul(is(fam, 2)));
  const B = VIO.mul(is(fam, 0)).add(BLU.mul(is(fam, 1).add(is(fam, 2)))).add(GRN.mul(0.8).mul(is(fam, 3)));
  const hotC = (k) => [ORA, PNK, YEL, GRN].reduce((a, v, i) => a.add(v.mul(is(k, i))), vec3(0));
  const H = hotC(hot), H2 = hotC(hot.add(pk(2, 3)).add(1).mod(4));
  const kOn = step(0.001, c.kick);

  const uu = positionGeometry.y, ca = positionGeometry.x, sa = positionGeometry.z;
  const r0 = pair ? 1.5 : 2.1;
  const grow = io(0.56 + pair * 0.06, 0.8, 0.89 - pair * 0.02, 0.94 - pair * 0.02);
  const tip = inv(smoothstep(grow.sub(0.07), grow, uu)).clamp(0, 1);
  // a neck that swells behind the head, then tapers to the tail
  const prof = smoothstep(0, 0.06, uu).mul(0.5).add(0.5).mul(inv(uu).max(1e-4).sqrt());
  const rad = prof.mul(r0).mul(tip.max(1e-4).sqrt()).mul(live).mul(step(0.002, grow));
  // the head leads (uu 0); the body trails the same path later in time
  const f1 = 0.9 + n * 0.17, f2 = 1.5 - n * 0.09, p1 = rn(21 + n).mul(TAU), p2 = n * 2.3;
  const tau = c.real.mul(0.17 + n * 0.025).mul(sgn(rn(26))).mul(n % 2 ? 1 : -1).sub(uu.mul(1.05)).add(n * 1.7);
  const und = uu.mul(11).sub(c.real.mul(2.1)).add(n * 1.3).sin().mul(uu.mul(0.8).add(0.2)).mul(1.4);
  const X = tau.mul(f1).add(p1).sin().mul(40).add(tau.mul(0.37).add(n).sin().mul(7));
  const Y = tau.mul(f2).add(p2).sin().mul(14).add(tau.mul(0.53).cos().mul(6));
  const dX = tau.mul(f1).add(p1).cos().mul(40 * f1).add(tau.mul(0.37).add(n).cos().mul(2.6));
  const dY = tau.mul(f2).add(p2).cos().mul(14 * f2).sub(tau.mul(0.53).sin().mul(3.2));
  const il = float(1).div(dX.mul(dX).add(dY.mul(dY)).max(1).sqrt()), nx = dY.mul(il).negate(), ny = dX.mul(il);
  const Z = tau.mul(0.6).add(n * 2).sin().mul(frontW ? 5 : 7).add(frontW ? 13 : -15);
  const off = ca.mul(rad).add(und);
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  m.positionNode = vec3(X.add(nx.mul(off)), Y.add(ny.mul(off)), Z.add(sa.mul(rad)).add(und.mul(0.6)));

  const ang = atan2(sa, ca).div(TAU), blink = low ? float(0) : inv(smoothstep(0, 0.06, uu.sub(c.beat.fract()).abs())).mul(kOn);
  let skin;
  if (!pair) {
    // body-riding: overlapping scale arcs, an eye-spot every few rows; worm 2's rows crawl head-ward against its swim
    const s = uu.mul(LEN).add(n === 2 ? c.real.mul(3) : 0), row = s.div(1.8).floor();
    const cx = ang.mul(6).add(row.mul(0.5)).fract().sub(0.5), cy = s.div(1.8).fract();
    const dA = vec2(cx, cy.sub(1)).length(), arc = inv(smoothstep(0.05, 0.11, dA.sub(0.62).abs()));
    const spot = vec2(cx, cy.sub(0.5)).length(), isE = step(row.add(64).mod(4), 0.5);
    const eyeC = mix(BG.add(A.mul(0.4)), mix(H2, W, 0.4).mul(1.5), blink).mul(step(spot, 0.14))
      .add(A.mul(step(0.17, spot)).mul(step(spot, 0.27))).add(H.mul(step(0.31, spot)).mul(step(spot, 0.4)));
    skin = mix(mix(A, B, row.add(64).mod(2)).mul(arc), eyeC, isE.mul(step(spot, 0.4)));
  } else {
    // world-locked: still concentric rings about the fan's root, alternately solid and beaded; the worm slides through them
    const rr = vec2(X, Y.add(14)).length().div(3.2), k = rr.floor().add(64), fr = rr.fract();
    const solid = step(0.2, fr).mul(step(fr, 0.8));
    const bead = step(vec2(fr.sub(0.5), ang.mul(n === 3 ? 5 : 7).fract().sub(0.5)).length(), 0.3);
    const k3 = k.mod(3);
    skin = A.mul(is(k3, 0)).add(B.mul(is(k3, 1))).add(H.mul(0.9).mul(is(k3, 2))).mul(mix(solid, bead, step(0.5, k.mod(2))))
      .add(H2.mul(blink).mul(solid).mul(0.6));
  }
  const edge = ca.abs();
  m.colorNode = skin.mul(sa.abs().mul(0.4).add(0.6)).add(mix(B, W, 0.5).mul(smoothstep(0.86, 1, edge)).mul(0.55));
  return m;
}
