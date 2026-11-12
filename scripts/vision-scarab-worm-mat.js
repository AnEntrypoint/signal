// THE SCARAB's sacred serpents (params.n 1..4): carapace-plated bodies that follow their own head down a looping desert path,
// truly turning; a ripple runs down each length. 1 and 3 swim IN FRONT of the beetle, 2 and 4 BEHIND it (through the cartouche).
// Skin: 1-2 ride the body (plates and beads fixed on it, a real worm's uv); 3-4 run reversed (the pattern streams back as they swim).
// Arrival: each grows head-first out of the dark in a seeded order; leaves tail-last in reverse.
import { MeshBasicNodeMaterial, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, mix, atan2 as atan2raw } from "builtin/tsl";
import { tripClock, visionShown, visionU, climb, inv, is, sgn, ioU, famPick, NEON } from "./lib/trip.js";
const atan2 = (y, x) => atan2raw(y, x.add(1e-5));
const TAU = 6.28318, LEN = 64;
export function material(ctx) {
  const n = Math.max(1, Math.min(4, Math.round(ctx.params.n ?? 1))), front = n % 2, pair = n > 2 ? 1 : 0;
  const c = tripClock(ctx), u = visionU(ctx, c), live = visionShown(ctx, c, 0), io = ioU(u), low = ctx.quality === "low";
  const rn = (k) => c.rnd(1200 + k), pk = (k, m) => c.pick(1200 + k, m);
  const { BLU, VIO, PNK, ORA, YEL, GRN, W } = NEON;
  const fam = pk(0, 3), hot = pk(1, 4);
  const FAMS = [[BLU, VIO], [vec3(0.01, 0.55, 0.75), BLU], [VIO, PNK.mul(0.8)]];
  const A = famPick(FAMS, fam, 0), B = famPick(FAMS, fam, 1);
  const hotC = (k) => [YEL, ORA, PNK, GRN].reduce((a, v, i) => a.add(v.mul(is(k, i))), vec3(0));
  const H = hotC(hot), H2 = hotC(hot.add(pk(2, 3)).add(1).div(4).fract().mul(4).add(0.5).floor().min(3));
  const kOn = step(0.001, c.kick), cl = climb(c);

  // seeded arrival rank 0..3 (a rotation of n), so a different serpent leads each roll
  const rank = pk(30, 4).add(n - 1).div(4).fract().mul(4).add(0.5).floor();
  const a0 = rank.mul(0.06).add(0.5), x1 = float(0.93).sub(rank.mul(0.018));
  const grow = smoothstep(a0, a0.add(0.16), u).mul(inv(smoothstep(x1.sub(0.04), x1, u)));
  const uu = positionGeometry.y, ca = positionGeometry.x, sa = positionGeometry.z;
  const r0 = (pair ? 1.6 : 2.2) * (front ? 1 : 1.15);
  const tip = inv(smoothstep(grow.sub(0.06), grow, uu));
  const swell = cl.mul(0.18).add(0.9);
  const rad = inv(uu).max(1e-4).sqrt().mul(r0).mul(swell).mul(tip.clamp(0, 1).max(1e-4).sqrt()).mul(live).mul(step(0.002, grow));

  // the path: a figure-eight loop round the beetle; the body trails the head's path later in time, so it truly turns
  const dir = sgn(rn(17 + n)), f1 = 1 + n * 0.11, f2 = 2 - n * 0.09, p1 = rn(13 + n).mul(TAU), p2 = rn(40 + n).mul(TAU);
  const tau = c.real.mul(0.17 + n * 0.025).mul(dir).sub(uu.mul(1.1).mul(dir)).add(n * 1.7);
  const und = uu.mul(11).sub(c.real.mul(2.8)).add(n).sin().mul(uu.mul(0.7).add(0.3)).mul(1.6);
  const AX = front ? 40 : 46, AY = front ? 17 : 22;
  const X = tau.mul(f1).add(p1).sin().mul(AX);
  const Y = tau.mul(f2).add(p2).sin().mul(AY).add(tau.mul(0.5).cos().mul(4));
  const dX = tau.mul(f1).add(p1).cos().mul(AX * f1);
  const dY = tau.mul(f2).add(p2).cos().mul(AY * f2).sub(tau.mul(0.5).sin().mul(2));
  const il = float(1).div(dX.mul(dX).add(dY.mul(dY)).max(1).sqrt()), nx = dY.mul(il).negate(), ny = dX.mul(il);
  const Z = tau.mul(0.6).add(n).sin().mul(front ? 5 : 6).add(front ? 13 : -16);
  const off = ca.mul(rad).add(und);
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  m.positionNode = vec3(X.add(nx.mul(off)), Y.add(ny.mul(off)), Z.add(sa.mul(rad)).add(und.mul(0.5)));

  // skin coordinate: body-fixed for 1-2; for 3-4 it streams backward as fast as the serpent swims (reversed uv)
  const s = pair ? uu.mul(LEN).add(c.real.mul(3.5)) : uu.mul(LEN);
  const ang = atan2(sa, ca), rf = inv(uu).max(1e-4).sqrt().mul(r0);
  // carapace plates: each ring a scarab segment, a dark seam between, a dorsal stripe and bead studs along the sides
  const plate = s.div(2.2), pi = plate.floor(), pf = plate.fract();
  const seam = smoothstep(0, 0.12, pf).mul(inv(smoothstep(0.88, 1, pf)));
  const k3 = pi.add(kOn.mul(c.beat.floor())).div(3).fract().mul(3).add(0.5).floor();
  const plateC = mix(A, B, is(k3, 1)).add(H2.mul(0.8).mul(is(k3, 2)));
  const dorsal = inv(smoothstep(0.18, 0.26, ang.sub(1.5708).abs().div(TAU).mul(6)));
  const bq = vec2(pf.sub(0.5).mul(2.2), ang.div(TAU).mul(8).fract().sub(0.5).mul(rf.mul(TAU / 8))).length();
  const brad = rf.mul(0.3).min(0.55);
  const bead = inv(smoothstep(brad.sub(0.07), brad, bq));
  // zigzag chevrons for the reversed pair (op-art), plates for the riders
  const zz = s.div(1.6).add(ang.div(TAU).mul(4).fract().sub(0.5).abs().mul(2)).fract();
  const chev = smoothstep(0.4, 0.46, zz).mul(inv(smoothstep(0.86, 0.92, zz)));
  const body = pair ? mix(A.mul(0.15), mix(A, B, ang.sin().mul(0.5).add(0.5)), chev).add(H.mul(dorsal).mul(0.8))
                    : plateC.mul(seam).mul(0.85).add(H.mul(dorsal).mul(seam)).add(mix(W, H, 0.4).mul(bead).mul(0.8));
  // kick: a lit band travels head to tail, and the riders' studs swap hollow/filled
  const run = low ? float(0) : inv(smoothstep(0, 0.05, uu.sub(c.beat.fract()).abs())).mul(kOn);
  const head = inv(smoothstep(0.015, 0.04, uu));
  const shade = sa.abs().mul(0.45).add(0.55);
  m.colorNode = body.mul(shade).add(mix(H2, W, 0.4).mul(run).mul(0.9)).add(W.mul(head).mul(0.6));
  return m;
}
