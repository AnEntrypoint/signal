// THE SKY WHALE's cloud eels (params.n 1..4) on the shared unit tube (vision-world-turtle-worm-geo.js): each body follows its own head down
// a long gliding path, so it truly turns; a swell pulses down its length and an undulation runs tail-ward. 1 and 3 swim IN FRONT of the whale
// (through the veil's depth), 2 and 4 BEHIND it (between the whale and its ripples). Skin: 1-2 ride the body (chevron bands, real worm uv);
// 3-4 are locked to their path (bead rows that stand still while the body slides through them). Kick: a bright collar runs head to tail.
import { MeshBasicNodeMaterial, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, mix, fwidth, atan2 as atan2raw } from "builtin/tsl";
import { tripClock, visionShown, visionU, climb, inv, is, sgn, ioU, NEON } from "./lib/trip.js";
const atan2 = (y, x) => atan2raw(y, x.add(1e-5));
const TAU = 6.28318, LEN = 64;
const band = (x) => { const e = fwidth(x).mul(0.7).min(0.25); return smoothstep(float(0.25).sub(e), e.add(0.25), x.fract().sub(0.5).abs()); };
export function material(ctx) {
  const n = Math.max(1, Math.min(4, Math.round(ctx.params.n ?? 1))), front = n % 2, pair = n > 2 ? 1 : 0;
  const c = tripClock(ctx), u = visionU(ctx, c), live = visionShown(ctx, c, 0), io = ioU(u), low = ctx.quality === "low";
  const rn = (k) => c.rnd(1220 + k), pk = (k, m) => c.pick(1220 + k, m);
  const { BLU, VIO, PNK, ORA, YEL, GRN, W } = NEON;
  const famC = (k, list) => list.reduce((a, v, i) => a.add(v.mul(is(k, i))), vec3(0));
  const fam = pk(0, 4), hot = pk(1, 4);
  const A = famC(fam, [BLU, VIO, vec3(0.01, 0.5, 0.6), mix(VIO, PNK, 0.4)]), B = famC(fam, [VIO, BLU, BLU, BLU]);
  const hotC = (k) => famC(k, [PNK, ORA, YEL, GRN]);
  const H = hotC(hot), H2 = hotC(hot.add(pk(2, 3)).add(1).mod(4));
  const kOn = step(0.001, c.kick), cl = climb(c);

  const uu = positionGeometry.y, ca = positionGeometry.x, sa = positionGeometry.z;
  const r0 = pair ? 1.6 : 2.2;
  // arrival in the seeded order of the four, tail out of the dark head first; out in reverse (last in, first out)
  const slot = rn(20 + n).mul(0.06), a0 = 0.56 + pair * 0.05;
  const grow = smoothstep(slot.add(a0), slot.add(a0 + 0.14), u).mul(inv(smoothstep(slot.negate().add(0.9 - pair * 0.02), slot.negate().add(0.95 - pair * 0.02), u)));
  const tip = inv(smoothstep(grow.sub(0.08), grow, uu));
  const swell = uu.mul(16).sub(c.real.mul(3.2)).sin().mul(0.22).add(1).mul(cl.mul(0.25).add(0.9));
  const rad = inv(uu).max(1e-4).pow(0.6).mul(r0).mul(tip.clamp(0, 1).max(1e-4).sqrt()).mul(swell).mul(live).mul(step(0.002, grow));
  // the head leads (uu 0); the body trails the same path later in time
  const f1 = 0.8 + n * 0.11, f2 = 1.4 + n * 0.17, p1 = rn(30 + n).mul(TAU), p2 = n * 2.3;
  const rate = 0.17 + n * 0.025;
  const tau = c.real.mul(rate).mul(sgn(rn(40 + n))).sub(uu.mul(1.05)).add(n * 1.7);
  const und = uu.mul(11).sub(c.real.mul(2.1)).add(n).sin().mul(uu.mul(0.9).add(0.15)).mul(1.7);
  const X = tau.mul(f1).add(p1).sin().mul(46).add(tau.mul(0.37).cos().mul(6));
  const Y = tau.mul(f2).add(p2).sin().mul(13).add(tau.mul(0.53).sin().mul(5)).sub(2);
  const dX = tau.mul(f1).add(p1).cos().mul(46 * f1).sub(tau.mul(0.37).sin().mul(6 * 0.37));
  const dY = tau.mul(f2).add(p2).cos().mul(13 * f2).add(tau.mul(0.53).cos().mul(5 * 0.53));
  const il = float(1).div(dX.mul(dX).add(dY.mul(dY)).max(1).sqrt()), nx = dY.mul(il).negate(), ny = dX.mul(il);
  const Z = tau.mul(0.6).add(n).sin().mul(front ? 4.5 : 3.5).add(front ? 11 : -6.5);
  const off = ca.mul(rad).add(und);
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  m.positionNode = vec3(X.add(nx.mul(off)), Y.add(ny.mul(off)), Z.add(sa.mul(rad)).add(und.mul(0.5)));

  // skin
  const ang = atan2(sa, ca), aA = ang.abs();
  let skin;
  if (!pair) {
    // body-riding chevrons: bands that point head-ward, colours stepping in threes
    const s = uu.mul(LEN), ch = s.mul(0.45).add(aA.mul(1.1));
    const k3 = ch.floor().mod(3);
    skin = famC(k3, [A, B, H.mul(0.85)]).mul(band(ch)).add(mix(B, W, 0.5).mul(smoothstep(0.88, 1, ca.abs())).mul(0.4));
  } else {
    // path-locked bead rows: the pattern stays on the path, the body slides through it (runs reversed against its swim)
    const s = tau.mul(-LEN / 1.05), rf = inv(uu).max(1e-4).pow(0.6).mul(r0);
    const row = s.div(2.2).floor(), fy = ang.div(TAU).mul(7).add(row.mul(0.5)).fract().sub(0.5).mul(rf.mul(TAU / 7));
    const bd = vec2(s.div(2.2).fract().sub(0.5).mul(2.2), fy).length(), br = rf.mul(0.38).min(0.75);
    const bead = inv(smoothstep(br.sub(0.1), br, bd));
    const ringB = inv(smoothstep(0.05, 0.14, bd.sub(br.mul(1.45)).abs()));
    skin = mix(B.mul(0.12), mix(mix(A, W, 0.25), H2, step(row.mod(4).sub(2.5).abs(), 0.6)), bead).add(A.mul(ringB).mul(0.5));
  }
  const collar = low ? float(0) : inv(smoothstep(0, 0.045, uu.sub(c.beat.fract()).abs())).mul(kOn);
  m.colorNode = skin.mul(sa.abs().mul(0.4).add(0.6)).add(mix(H, W, 0.4).mul(collar));
  return m;
}
