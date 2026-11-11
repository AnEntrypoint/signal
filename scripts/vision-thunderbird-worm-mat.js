// THE THUNDERBIRD's HORNED SERPENTS (params.n 1..4): round bodies winding in depth through the storm. n 1, 2 rise from
// behind the world canvas past the wing tips to the upper sides; n 3, 4 (seed 312/313) thinner, from the top corners.
// Skin: each body wears one of four seeded modes (op-art rings, bead rows, diamond scales, feather barbs) and trades it
// for another climbing root to tip in the build (u .78-.9); one goes silhouette with a rim; the kick runs a light up it.
import { MeshBasicNodeMaterial, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, mix, atan2 } from "builtin/tsl";
import { tripClock, visionShown, visionU, stripes, inv, is, ioU, famPick, NEON } from "./lib/trip.js";

const TAU = 6.28318, LEN = 120;
export function material(ctx) {
  const n = Math.max(1, Math.round(ctx.params.n ?? 1)), sg = n % 2 ? 1 : -1, pair = n > 2 ? 1 : 0;
  const c = tripClock(ctx), u = visionU(ctx, c), live = visionShown(ctx, c, 0);
  const io = ioU(u), low = ctx.quality === "low";
  const rn = (k) => c.rnd(300 + k), pk = (k, m) => c.pick(300 + k, m);
  const fam = pk(0, 3), hot = pk(19, 3), { BLU, VIO, PNK, ORA, YEL, GRN, W } = NEON;
  const C = famPick([[BLU], [VIO], [BLU]], fam, 0), D = famPick([[VIO], [PNK], [PNK]], fam, 0), Hh = famPick([[YEL], [ORA], [GRN]], hot, 0);
  const build = smoothstep(0.78, 0.91, u);

  const uu = positionGeometry.y, ca = positionGeometry.x, sa = positionGeometry.z;
  const r0 = pair ? 2.4 : 3.6;
  const grow = io(0.5 + pair * 0.04, 0.75, 0.95, 0.98 - pair * 0.01);
  const exists = pair ? step(0.45, rn(n === 3 ? 12 : 13)) : float(1);
  const tip = inv(smoothstep(grow.sub(0.07), grow, uu));
  const rad = inv(uu).max(0).pow(0.5).mul(r0).mul(tip.sqrt()).mul(live).mul(exists).mul(step(0.002, grow));
  // the spine in screen metres at the being's depth, scaled by depth so it projects where it is laid out
  const ph = pair * 2.1 + (sg > 0 ? 0 : 0.9), env = uu.mul(0.8).add(0.2);
  const w1 = uu.mul(8).sub(c.real.mul(1.1)).add(ph).sin().mul(env).mul(4.5);
  const w2 = uu.mul(6).sub(c.real.mul(0.8)).add(ph * 1.7).cos().mul(env).mul(4);
  let z, xs, ys;
  if (!pair) { z = uu.mul(70).sub(40); const b = inv(uu.mul(2)); xs = b.mul(b).mul(49).add(21); ys = uu.mul(92).sub(64); }
  else { z = uu.mul(60).sub(35); const b = inv(uu.mul(1.7)); xs = b.mul(b).mul(30).add(33); ys = float(64).sub(uu.mul(84)); }
  const fac = float(74).sub(z).div(74);
  const spine = vec3(xs.mul(sg).mul(fac).add(w1.mul(sg)), ys.mul(fac).add(w2.mul(0.6)), z.add(w2.mul(0.8)));
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  m.fog = false;
  m.positionNode = spine.add(vec3(ca.mul(rad), sa.mul(rad).mul(0.7), sa.mul(rad).mul(0.7)));
  // the depth weave: the mid-body swings through the canvas planes, behind the being and out in front; seeded per body
  { const S = float(uu).clamp(0, 1), dz = step(0.5, c.rnd(391 + n)).mul(2).sub(1).mul(c.rnd(395 + n).mul(5).add(11));
    const turns = c.rnd(399 + n).mul(1.6).add(1.4).mul(3.14159);
    const weave = S.mul(turns).add(c.rnd(403 + n).mul(6.283)).add(c.real.mul(0.21 + 0.04 * n)).sin().mul(S.mul(float(1).sub(S)).mul(4)).mul(dz);
    m.positionNode = m.positionNode.add(vec3(0, 0, weave)); }

  // the skin, by along-length s (metres) and around-angle
  const ang = atan2(sa, ca), s = uu.mul(LEN), rf = inv(uu).max(0).sqrt().mul(r0);
  const ring = stripes(s, 0.5, 0.06);                                            // op-art: black / white rings
  const cStr = mix(W.mul(0.5), C.mul(1.3), step(0.5, s.mul(0.5).add(0.25).fract())).mul(ring)
    .add(Hh.mul(stripes(s.add(0.5), 0.5, 0.012)).mul(0.9));
  const row = s.div(2.4).floor();
  const bd = vec2(s.div(2.4).fract().sub(0.5).mul(2.4), ang.div(TAU).mul(6).add(row.mul(0.5)).fract().sub(0.5).mul(rf.mul(TAU / 6))).length();
  const brad = rf.mul(0.4).min(0.7);
  const cBe = mix(mix(D, W, 0.4), Hh, step(row.mod(3), 0.5)).mul(inv(smoothstep(brad.sub(0.08), brad, bd)));
  const t = ang.div(TAU).mul(4);
  const cSc = mix(C, D, s.mul(0.3).add(t).floor().mod(2)).mul(stripes(s.mul(0.3).add(t), 1, 0.07).max(stripes(s.mul(0.3).sub(t), 1, 0.07)));
  // feather barbs: herringbone chevrons pointing up the body
  const fe = s.mul(0.35).add(ang.abs().div(3.14159).mul(1.2));
  const cFe = low ? cStr : mix(Hh, mix(D, W, 0.3), fe.floor().mul(0.5).fract().mul(2)).mul(stripes(fe, 1, 0.07)).add(W.mul(0.6).mul(inv(smoothstep(0.04, 0.12, ang.abs()))));
  const skins = [cStr, cBe, cSc, cFe], wear = (k) => skins.reduce((acc, sk, i) => acc.add(sk.mul(is(k, i))), vec3(0));
  const sA = pk(14 + n * 0.1, 4), sB0 = sA.add(1).add(pk(14.5 + n * 0.1, 3)), sB = sB0.sub(step(3.5, sB0).mul(4));
  const skin = mix(wear(sA), wear(sB).mul(build.mul(0.5).add(1)), step(uu, build.mul(1.02)));
  const run = float(1).sub(smoothstep(0, 0.05, uu.sub(c.beat.fract()).abs())).mul(step(0.001, c.kick));   // the kick's light climbs the body
  const edge = ca.abs();
  const lit = skin.mul(sa.abs().mul(0.5).add(0.35).add(build.mul(0.25))).add(mix(C, W, 0.5).mul(smoothstep(0.86, 1, edge)).mul(run.add(0.4)));
  const dark = is(float(n), step(0.5, rn(14).mul(2).fract()).add(1)).mul(step(uu, smoothstep(0.85, 0.9, u).mul(1.02)));
  m.colorNode = mix(lit, mix(C, W, 0.5).mul(smoothstep(0.95, 1, edge)).mul(0.8).add(Hh.mul(run).mul(smoothstep(0.9, 1, edge))), dark);
  return m;
}
