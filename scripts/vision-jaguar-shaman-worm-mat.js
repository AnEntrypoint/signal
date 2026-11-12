// THE JAGUAR SHAMAN's spotted serpents (params.n 1..4): round opaque bodies following their own head down a turning path,
// so they truly change heading; an undulation runs down the length. 1 and 3 swim in FRONT of the mask, 2 and 4 BEHIND it.
// Skin: 1-2 wear rosettes that ride the body (a real worm's uv); 3 is locked to world space (the body slides through its chevrons); 4's bands run reversed, against its swim.
import { MeshBasicNodeMaterial, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, mix, atan2 as atan2raw } from "builtin/tsl";
import { tripClock, visionShown, visionU, stripes, inv, is, sgn, ioU, NEON } from "./lib/trip.js";
const atan2 = (y, x) => atan2raw(y, x.add(1e-5));
const TAU = 6.28318, LEN = 64;
export function material(ctx) {
  const n = Math.max(1, Math.round(ctx.params.n ?? 1)), frontW = n % 2, pair = n > 2 ? 1 : 0;
  const c = tripClock(ctx), u = visionU(ctx, c), live = visionShown(ctx, c, 0), io = ioU(u), low = ctx.quality === "low";
  const rn = (k) => c.rnd(1140 + k), pk = (k, m) => c.pick(1140 + k, m);
  const { BLU, VIO, PNK, ORA, YEL, GRN, W, BG } = NEON;
  const fam = pk(0, 3), hot = pk(1, 4);
  const A = BLU.mul(is(fam, 0)).add(VIO.mul(is(fam, 1))).add(vec3(0.01, 0.55, 0.5).mul(is(fam, 2)));
  const B = VIO.mul(is(fam, 0)).add(BLU.mul(is(fam, 1))).add(GRN.mul(0.8).mul(is(fam, 2)));
  const hotC = (k) => [PNK, ORA, YEL, GRN].reduce((a, v, i) => a.add(v.mul(is(k, i))), vec3(0));
  const H = hotC(hot), H2 = hotC(hot.add(pk(2, 3)).add(1).mod(4));
  const kOn = step(0.001, c.kick);

  const uu = positionGeometry.y, ca = positionGeometry.x, sa = positionGeometry.z;
  const r0 = pair ? 1.6 : 2.2;
  const grow = io(0.5 + pair * 0.06, 0.74, 0.89 - pair * 0.02, 0.945 - pair * 0.02);
  const tip = inv(smoothstep(grow.sub(0.07), grow, uu));
  // a swallowed bulge travels down the body on the bar of a kick run
  const gulp = inv(smoothstep(0, 0.09, uu.sub(c.bar.fract()).abs())).mul(kOn).mul(0.35).add(1);
  const rad = inv(uu).max(1e-4).sqrt().mul(r0).mul(tip.clamp(0, 1).max(1e-4).sqrt()).mul(gulp).mul(live).mul(step(0.002, grow));
  const f1 = 0.9 + n * 0.17, f2 = 1.9 - n * 0.14, p1 = rn(13 + n).mul(TAU), p2 = n * 2.3;
  const dir = sgn(rn(17)).mul(n % 2 ? 1 : -1);
  const tau = c.real.mul(0.17 + n * 0.025).mul(dir).sub(uu.mul(1.2)).add(n * 1.7);
  const und = uu.mul(11).sub(c.real.mul(2.1)).add(n).sin().mul(uu.mul(0.8).add(0.2)).mul(1.6);
  const X = tau.mul(f1).add(p1).sin().mul(42), Y = tau.mul(f2).add(p2).sin().mul(15).add(tau.mul(0.5).cos().mul(6));
  const dX = tau.mul(f1).add(p1).cos().mul(42 * f1), dY = tau.mul(f2).add(p2).cos().mul(15 * f2).sub(tau.mul(0.5).sin().mul(3));
  const il = float(1).div(dX.mul(dX).add(dY.mul(dY)).max(1).sqrt()), nx = dY.mul(il).negate(), ny = dX.mul(il);
  const Z = tau.mul(0.7).add(n).sin().mul(frontW ? 6 : 7).add(frontW ? 13 : -15);
  const off = ca.mul(rad).add(und);
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  m.positionNode = vec3(X.add(nx.mul(off)), Y.add(ny.mul(off)), Z.add(sa.mul(rad)).add(und.mul(0.6)));

  const ang = atan2(sa, ca), rf = inv(uu).max(1e-4).sqrt().mul(r0);
  let skin;
  if (!pair) {
    // rosettes riding the body: ring-with-dot cells, swapping to disc-with-hole in a wave from the head on the kick
    const s = uu.mul(LEN), g = 3.1, row = s.div(g).floor();
    const d = vec2(s.div(g).fract().sub(0.5).mul(g), ang.div(TAU).mul(4).add(row.mul(0.5)).fract().sub(0.5).mul(rf.mul(TAU / 4))).length();
    const R = rf.mul(0.5).min(1.05), tog = low ? float(0) : c.beat.sub(uu.mul(3)).floor().mod(2).abs().mul(kOn);
    const ring = inv(smoothstep(0.16, 0.26, d.sub(R).abs()));
    const disc = inv(smoothstep(R, R.add(0.1), d)), dot = inv(smoothstep(R.mul(0.4), R.mul(0.4).add(0.1), d));
    const spot = mix(ring.max(dot), disc.mul(inv(dot)), tog);
    skin = mix(BG.add(A.mul(0.16)), mix(n === 1 ? H : H2, W, step(row.mod(3), 0.5).mul(0.4)), spot);
  } else {
    // n 3: chevrons fixed in the world; n 4: bands on the body running head-ward, against the swim
    const s = n === 3 ? X.mul(0.7).add(Y.mul(1.1)).add(ang.abs().mul(1.2)) : uu.mul(LEN).add(c.real.mul(5)).sub(ang.abs().mul(1.5));
    const k3 = s.mul(0.3).floor().mod(3).abs();
    skin = A.mul(is(k3, 0)).add(B.mul(is(k3, 1))).add((n === 3 ? H2 : H).mul(0.85).mul(is(k3, 2))).mul(stripes(s, 0.3, 0.05));
  }
  const run = low ? float(0) : inv(smoothstep(0, 0.05, uu.sub(c.beat.fract()).abs())).mul(kOn);
  m.colorNode = skin.mul(sa.abs().mul(0.45).add(0.55)).add(mix(A, W, 0.5).mul(smoothstep(0.86, 1, ca.abs())).mul(run.add(0.5)));
  return m;
}
