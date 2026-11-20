// THE OCTOPUS ORACLE's eels (params.n 1..4): round opaque bodies that follow their own head down a turning path, so they truly
// change heading; a swimming wave runs down the length. 1 and 3 swim in FRONT of the oracle (through the ink's depth), 2 and 4 BEHIND
// it (through the bubble wheel's). Skin: 1-2 ride the body (op-art bands, a sucker row along the belly: a real eel's uv);
// 3-4 are locked to world space: rings around the oracle that the body slides through, so they seem to stand still as it swims.
import { MeshBasicNodeMaterial, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, mix, atan2 as atan2raw } from "builtin/tsl";
import { tripClock, visionShown, visionU, climb, stripes, inv, is, sgn, ioU, NEON } from "./lib/trip.js";
const atan2 = (y, x) => atan2raw(y, x.add(1e-5));
const TAU = 6.28318, LEN = 64;
export function material(ctx) {
  const n = Math.max(1, Math.min(4, Math.round(ctx.params.n ?? 1))), frontW = n % 2, pair = n > 2 ? 1 : 0;
  const c = tripClock(ctx), u = visionU(ctx, c), live = visionShown(ctx, c, 0), io = ioU(u), low = ctx.quality === "low";
  const rn = (k) => c.rnd(1180 + k), pk = (k, m) => c.pick(1180 + k, m);
  const { BLU, VIO, PNK, ORA, YEL, GRN, W } = NEON;
  const fam = pk(0, 3), hot = pk(1, 4);
  const TEAL = vec3(0.005, 0.55, 0.75);
  const A = BLU.mul(is(fam, 0)).add(VIO.mul(is(fam, 1))).add(TEAL.mul(is(fam, 2)));
  const B = VIO.mul(is(fam, 0)).add(mix(PNK, VIO, 0.55).mul(is(fam, 1))).add(BLU.mul(is(fam, 2)));
  const hotC = (k) => [PNK, ORA, YEL, GRN].reduce((a, v, i) => a.add(v.mul(is(k, i))), vec3(0));
  const H = hotC(hot), H2 = hotC(hot.add(pk(2, 3)).add(1).mod(4));
  const kOn = step(0.001, c.kick), cl = climb(c);

  const uu = positionGeometry.y, ca = positionGeometry.x, sa = positionGeometry.z;
  const r0 = (pair ? 1.6 : 2.2) * (frontW ? 1 : 1.25);
  // LIFO: 1 comes first and leaves last, 4 comes last and leaves first
  const grow = io(0.56 + n * 0.03, 0.7 + n * 0.025, 0.925 - n * 0.01, 0.955 - n * 0.01).add(cl.mul(0.05)).min(1).mul(step(0.58 + n * 0.03, u)).mul(inv(step(0.955 - n * 0.01, u)));
  const tip = inv(smoothstep(grow.sub(0.07), grow, uu));
  const rad = inv(uu.mul(0.9)).max(1e-4).sqrt().mul(r0).mul(tip.clamp(0, 1).max(1e-4).sqrt()).mul(live).mul(step(0.002, grow));
  // the head leads (uu 0); the body trails the same path later in time, so turns travel down it
  const f1 = 0.9 + n * 0.17, f2 = 1.45 - n * 0.09, p1 = rn(13 + n).mul(TAU), p2 = rn(20 + n).mul(TAU);
  const tau = c.real.mul(0.17 + n * 0.025).mul(sgn(rn(17 + n))).sub(uu.mul(1.05)).add(n * 1.7);
  const und = uu.mul(11).sub(c.real.mul(2.8)).add(n).sin().mul(uu.mul(0.9).add(0.15)).mul(cl.mul(0.6).add(1.3));
  const X = tau.mul(f1).add(p1).sin().mul(40).add(tau.mul(0.37).cos().mul(6));
  const Y = tau.mul(f2).add(p2).sin().mul(17).add(tau.mul(0.5).cos().mul(4));
  const dX = tau.mul(f1).add(p1).cos().mul(40 * f1).sub(tau.mul(0.37).sin().mul(2.2));
  const dY = tau.mul(f2).add(p2).cos().mul(17 * f2).sub(tau.mul(0.5).sin().mul(2));
  const il = float(1).div(dX.mul(dX).add(dY.mul(dY)).max(1).sqrt()), nx = dY.mul(il).negate(), ny = dX.mul(il);
  const Z = tau.mul(0.6).add(n).sin().mul(frontW ? 5 : 6).add(frontW ? 13 : -15);
  const off = ca.mul(rad).add(und);
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  m.positionNode = vec3(X.add(nx.mul(off)), Y.add(ny.mul(off)), Z.add(sa.mul(rad)).add(und.mul(0.5)));

  const ang = atan2(sa, ca), rf = inv(uu.mul(0.9)).max(1e-4).sqrt().mul(r0);
  let skin;
  if (!pair) {
    // body-riding: op-art bands down the eel, a row of suckers (ring with dot) along its belly
    const s = uu.mul(LEN), sb = stripes(s, 0.45, 0.05);
    const body = mix(A, B, s.mul(0.45).floor().mod(2)).mul(sb).add(A.mul(0.08));
    const bd = vec2(s.div(1.8).fract().sub(0.5).mul(1.8), ang.add(1.5708).mul(rf)).length(), br = rf.mul(0.42).min(0.7);
    const ring = inv(smoothstep(0.08, 0.16, bd.sub(br).abs())).add(inv(smoothstep(br.mul(0.3), br.mul(0.3).add(0.08), bd))).min(1);
    skin = low ? body : mix(body, mix(H, W, 0.15), ring);
  } else {
    // world-locked: rings around the oracle's centre; the eel swims through them
    const s = vec2(X, Y).length().mul(0.7).add(ang.mul(0.15));
    const k3 = s.floor().mod(3);
    skin = B.mul(is(k3, 0)).add(mix(W, A, 0.3).mul(is(k3, 1))).add(H2.mul(is(k3, 2))).mul(stripes(s, 1, 0.08));
  }
  // the kick: a light runs head to tail and the hot colour steps behind it (only where the track has a kick)
  const bf = c.beat.fract(), run = low ? float(0) : inv(smoothstep(0, 0.05, uu.sub(bf).abs())).mul(kOn);
  const stepC = step(uu, bf).mul(kOn).mul(pair ? 0 : 0.35);
  m.colorNode = mix(skin, H2.mul(skin.length().min(1)), stepC).mul(sa.abs().mul(0.45).add(0.55)).add(mix(A, W, 0.5).mul(smoothstep(0.86, 1, ca.abs())).mul(run.add(0.4)));
  return m;
}
