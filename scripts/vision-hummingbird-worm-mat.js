// THE HUMMINGBIRD's nectar serpents (params.n 1..4): round opaque bodies that follow their own head down a looping
// flower-visiting path, so they truly change heading; a swallowing pulse runs down the length. 1 and 3 swim in FRONT of
// the birds (through the veil's depth), 2 and 4 BEHIND (through the wreath's). Skin: 1-2 ride the body (feather chevrons
// on the worm's own uv); 3-4 are locked to world space, read in reverse, so the body slides back through its pattern.
import { MeshBasicNodeMaterial, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, mix, atan2 as atan2raw } from "builtin/tsl";
import { tripClock, visionShown, visionU, climb, stripes, inv, is, sgn, ioU, NEON } from "./lib/trip.js";
const atan2 = (y, x) => atan2raw(y, x.add(1e-5));
const TAU = 6.28318, LEN = 64;
export function material(ctx) {
  const n = Math.max(1, Math.round(ctx.params.n ?? 1)), frontW = n % 2, pair = n > 2 ? 1 : 0;
  const c = tripClock(ctx), u = visionU(ctx, c), live = visionShown(ctx, c, 0), io = ioU(u), low = ctx.quality === "low";
  const rn = (k) => c.rnd(1320 + k), pk = (k, m) => c.pick(1320 + k, m);
  const { BLU, VIO, PNK, ORA, YEL, GRN, W } = NEON;
  const fam = pk(0, 3), hot = pk(1, 4), kOn = step(0.001, c.kick), cl = climb(c);
  const A = BLU.mul(is(fam, 0)).add(VIO.mul(is(fam, 1))).add(vec3(0.01, 0.55, 0.65).mul(is(fam, 2)));
  const B = VIO.mul(is(fam, 0)).add(BLU.mul(inv(is(fam, 0))));
  const hotC = (k) => [PNK, ORA, YEL, GRN].reduce((a, v, i) => a.add(v.mul(is(k, i))), vec3(0));
  const H = hotC(hot), H2 = hotC(hot.add(pk(2, 3)).add(1).mod(4));

  const uu = positionGeometry.y, ca = positionGeometry.x, sa = positionGeometry.z;
  const r0 = pair ? 1.6 : 2.2;
  // they arrive after the birds are whole and leave before the wings fold (last in, first out)
  const grow = io(0.56 + n * 0.04, 0.74 + n * 0.02, 0.9 - n * 0.012, 0.94 - n * 0.012).mul(cl.mul(0.15).add(0.85));
  const tip = inv(smoothstep(grow.sub(0.07), grow, uu));
  // the swallow: a bulge travelling head to tail, quicker when the highs rise
  const gulp = inv(smoothstep(0, 0.08, uu.sub(c.real.mul(cl.mul(0.15).add(0.22)).add(n * 0.25).fract()).abs())).mul(0.35).add(1);
  const rad = inv(uu).max(1e-4).sqrt().mul(r0).mul(gulp).mul(tip.clamp(0, 1).max(1e-4).sqrt()).mul(live).mul(step(0.002, grow));
  // a hovering, darting path: two looping frequencies, its sense per worm by seed
  const f1 = 0.9 + n * 0.17, f2 = 1.9 - n * 0.13, p1 = rn(30 + n).mul(TAU), p2 = n * 2.3;
  const tau = c.real.mul(0.17 + n * 0.025).mul(sgn(rn(34 + n))).sub(uu.mul(1.05)).add(n * 1.7);
  const und = uu.mul(11).sub(c.real.mul(2.1)).add(n * 0.7).sin().mul(uu.mul(0.9).add(0.15)).mul(1.4);
  const ax = pair ? 40 : 46, ay = pair ? 18 : 14;
  const X = tau.mul(f1).add(p1).sin().mul(ax), Y = tau.mul(f2).add(p2).sin().mul(ay).add(tau.mul(0.45).cos().mul(6));
  const dX = tau.mul(f1).add(p1).cos().mul(ax * f1), dY = tau.mul(f2).add(p2).cos().mul(ay * f2).sub(tau.mul(0.45).sin().mul(2.7));
  const il = float(1).div(dX.mul(dX).add(dY.mul(dY)).max(1).sqrt()), nx = dY.mul(il).negate(), ny = dX.mul(il);
  const Z = tau.mul(0.6).add(n).sin().mul(frontW ? 5 : 7).add(frontW ? 13 : -15);
  const off = ca.mul(rad).add(und);
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  m.positionNode = vec3(X.add(nx.mul(off)), Y.add(ny.mul(off)), Z.add(sa.mul(rad)).add(und.mul(0.5)));

  const ang = atan2(sa, ca), around = ang.div(TAU).add(0.5);
  let skin;
  if (!pair) {
    // feather chevrons on the body's own uv: V-scales pointing to the head, a hot keel line
    const s = uu.mul(LEN), ch = s.add(around.sub(0.5).abs().mul(5)).div(1.6);
    const row = ch.floor(), k3 = row.add(300).mod(3);
    const sc = A.mul(is(k3, 0)).add(B.mul(is(k3, 1))).add(mix(H, W, 0.2).mul(is(k3, 2)));
    skin = sc.mul(stripes(ch, 1, 0.12)).add(H2.mul(inv(smoothstep(0.02, 0.06, around.sub(0.5).abs()))));
  } else {
    // locked to world space and run backwards: concentric op-art rings around a fixed point, dots at their crests
    const s = vec2(X, Y).length().mul(0.55).sub(uu.mul(LEN * 0.4)).add(c.real.mul(0.3));
    const rg = stripes(s, 1, 0.08), crest = inv(smoothstep(0.12, 0.2, vec2(s.fract().sub(0.5), around.mul(8).fract().sub(0.5).mul(0.6)).length()));
    skin = mix(B, W, 0.15).mul(rg).add(mix(H, H2, step(0.5, s.mul(0.5).fract())).mul(crest).mul(low ? 0 : 1));
  }
  // on the kick a light runs down the body (none where the track has no kick)
  const run = low ? float(0) : inv(smoothstep(0, 0.05, uu.sub(c.beat.fract()).abs())).mul(kOn);
  m.colorNode = skin.mul(sa.abs().mul(0.45).add(0.55)).add(mix(A, W, 0.5).mul(smoothstep(0.86, 1, ca.abs())).mul(run.add(0.4)));
  return m;
}
