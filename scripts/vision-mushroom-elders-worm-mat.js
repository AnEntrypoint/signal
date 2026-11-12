// THE MUSHROOM ELDERS' mycelium worms (params.n 1..4): round opaque bodies swimming in depth through their scene.
// 1 and 3 swim IN FRONT of the elders (z +4..+18), 2 and 4 BEHIND them (z -5..-26). Skin: worms 1-2 ride the body (stripes
// travel with the worm as it swims and backs up), worms 3-4 are locked to WORLD space (the body slides through standing bands).
import { MeshBasicNodeMaterial, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, mix, atan2 as atan2raw } from "builtin/tsl";
import { tripClock, visionShown, visionU, stripes, inv, is, sgn, ioU, famPick, NEON } from "./lib/trip.js";
const atan2 = (y, x) => atan2raw(y, x.add(1e-5));

const TAU = 6.28318, LEN = 110;
export function material(ctx) {
  const n = Math.max(1, Math.round(ctx.params.n ?? 1)), sg = n % 2 ? 1 : -1, pair = n > 2 ? 1 : 0, front = n % 2;
  const c = tripClock(ctx), u = visionU(ctx, c), live = visionShown(ctx, c, 0);
  const io = ioU(u), low = ctx.quality === "low";
  const rn = (k) => c.rnd(1020 + k), pk = (k, m) => c.pick(1020 + k, m);
  const { BLU, VIO, PNK, ORA, YEL, GRN, W } = NEON;
  const F = [[BLU, VIO], [VIO, BLU], [BLU, vec3(0.3, 0.5, 1)]], fam = pk(0, 3), hot = pk(1, 4);
  const A = famPick(F, fam, 0), B = famPick(F, fam, 1);
  const hotC = (k) => [PNK, ORA, YEL, GRN].reduce((acc, v, i) => acc.add(v.mul(is(k, i))), vec3(0));
  const H = hotC(hot), H2 = hotC(hot.add(pk(2, 3)).add(1).mod(4));

  const uu = positionGeometry.y, ca = positionGeometry.x, sa = positionGeometry.z;
  const r0 = front ? 1.9 : 2.8;
  // last in (after the ring), first out: each worm grows along its own length and withdraws the same way
  const grow = io(0.52 + (n - 1) * 0.04, 0.74 + (n - 1) * 0.02, 0.81 + (4 - n) * 0.008, 0.87);
  const exists = n === 4 ? step(0.35, rn(17)) : float(1);
  const tip = inv(smoothstep(grow.sub(0.07), grow, uu));
  const rad = inv(uu).max(1e-4).sqrt().mul(r0).mul(tip.clamp(0, 1).max(1e-4).sqrt()).mul(live).mul(exists).mul(step(0.002, grow));
  // the swim: waves run down the body; the heading itself swings, so the worm really turns and comes back
  const ph = n * 2.1, env = uu.mul(0.8).add(0.2), sn = sgn(rn(16)).mul(sg);
  const w1 = uu.mul(9).sub(c.real.mul(1.3)).add(ph).sin().mul(env).mul(4);
  const w2 = uu.mul(6).sub(c.real.mul(0.8)).add(ph * 1.7).cos().mul(env).mul(3.5);
  const hd = c.real.mul(0.17 + n * 0.03).add(ph).sin().mul(0.55).add(pair ? 0.5 : -0.25);     // heading angle, swinging
  const along = uu.mul(-80).add(52), cs = hd.cos(), sn2 = hd.sin();
  const px = along.mul(cs).sub(w1.mul(sn2)).mul(sn), py = along.mul(sn2).add(w1.mul(cs)).add(pair ? 8 : -9).add(c.real.mul(0.11).add(ph).sin().mul(5));
  const pz = front ? uu.mul(13).add(4).add(w2.mul(0.5)) : uu.mul(-20).sub(6).add(w2.mul(0.6));
  const spine = vec3(px, py, pz);
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  m.positionNode = spine.add(vec3(ca.mul(rad), sa.mul(rad).mul(0.8), sa.mul(rad).mul(-0.6)));

  // body uv (1-2): the skin moves with the swim, which surges and backs up; world uv (3-4): bands stand still in space
  const trav = c.real.mul(rn(17 + n).mul(2).add(3)).add(c.real.mul(0.4).add(ph).sin().mul(7));
  const s = pair ? px.mul(0.8).add(py.mul(0.6)) : uu.mul(LEN).sub(trav);
  const ang = atan2(sa, ca), rf = inv(uu).max(1e-4).sqrt().mul(r0);
  const sk3 = s.mul(0.35).floor().mod(3);
  const cStr = A.mul(is(sk3, 0)).add(B.mul(is(sk3, 1))).add(H2.mul(0.85).mul(is(sk3, 2))).mul(stripes(s, 0.35, 0.04));
  const row = s.div(2.4).floor();
  const bd = vec2(s.div(2.4).fract().sub(0.5).mul(2.4), ang.div(TAU).mul(6).add(row.mul(0.5)).fract().sub(0.5).mul(rf.mul(TAU / 6))).length();
  const brad = rf.mul(0.4).min(0.7);
  const cBe = mix(mix(B, W, 0.3), H, step(row.mod(3), 0.5)).mul(inv(smoothstep(brad.sub(0.08), brad, bd)));
  // the skin changes from stripes to mycelium beads along the body, late
  const t1 = 0.7 + pair * 0.03;
  const skin = low ? cStr : mix(cStr, cBe, step(uu, smoothstep(t1, t1 + 0.08, u).mul(1.02)));
  const run = low ? float(0) : float(1).sub(smoothstep(0, 0.05, uu.sub(c.beat.fract()).abs())).mul(step(0.001, c.kick));
  const edge = ca.abs();
  const lit = skin.mul(sa.abs().mul(0.45).add(0.55)).add(mix(A, W, 0.5).mul(smoothstep(0.86, 1, edge)).mul(run.add(0.5)));
  // one worm (dealt) goes black with a lit rim: a moving shadow across the elders
  const dark = is(float(n), step(0.5, rn(15)).mul(2).add(1)).mul(step(uu, smoothstep(0.76, 0.8, u).mul(1.02)));
  m.colorNode = mix(lit, mix(A, W, 0.5).mul(smoothstep(0.93, 1, edge)).mul(0.7), dark);
  return m;
}
