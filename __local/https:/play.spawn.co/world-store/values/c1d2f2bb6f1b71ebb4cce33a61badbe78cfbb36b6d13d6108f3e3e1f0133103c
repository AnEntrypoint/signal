// THE SUN FATHER's FLARE WORMS: the canonical tube wound along a quadratic spine, weaving through the canvas planes.
// Skin and flow seeded per body (stripes / beads / scales / silhouette; riding the waves, body-locked or counter-flowing).
import { MeshBasicNodeMaterial, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, atan2, select } from "builtin/tsl";
import { tripClock, visionShown, visionU, is, inv } from "./lib/trip.js";
const TAU = 6.28318;
const SP = {
  1: { A: [-70, -75, -28], B: [-30, -30, -5], C: [-14, 10, 30] },
  2: { A: [60, -80, -28], B: [24, -44, -6], C: [-12, -13, 30] },
  3: { A: [50, 85, -28], B: [60, 34, -4], C: [20, -6, 28] },
};
export function material(ctx) {
  const n = Math.max(1, Math.min(3, Math.round((ctx.params && ctx.params.n) || 1)));
  const { A, B, C } = SP[n];
  const c0 = tripClock(ctx), fixP = ctx.param("fix", -1), frozen = fixP.greaterThan(-0.5);
  const sec = select(frozen, fixP, c0.sec);
  const c = { ...c0, sec, on: select(frozen, float(1), c0.on) };
  const u = visionU(ctx, c);
  const low = ctx.quality === "low";
  const mir = c.rnd(212).step(0.5).mul(2).sub(1);
  const here = n === 3 ? step(0.4, c.rnd(213)) : float(1);
  const g = smoothstep(0.55 + 0.05 * (n - 1), 0.72 + 0.05 * (n - 1), u).mul(inv(smoothstep(0.84 + 0.015 * n, 0.88 + 0.015 * n, u))).mul(here).mul(visionShown(ctx, c, 0));
  const pg = positionGeometry;
  const se = pg.z.mul(g);                                   // where on the full spine this ring sits now
  const cx = C[0] - A[0], cy = C[1] - A[1], cl = Math.hypot(cx, cy), px = -cy / cl, py = cx / cl;
  const spine = (s) => {
    const a = float(1).sub(s).mul(float(1).sub(s)), b = s.mul(float(1).sub(s)).mul(2), d = s.mul(s);
    const ph = s.mul(TAU * 2.2).sub(sec.mul(1.3)).add(n * 2.1);
    const w = ph.sin().mul(s).mul(5), wz = ph.mul(0.8).cos().mul(s).mul(3);
    return [a.mul(A[0]).add(b.mul(B[0])).add(d.mul(C[0])).add(w.mul(px)).mul(mir), a.mul(A[1]).add(b.mul(B[1])).add(d.mul(C[1])).add(w.mul(py)), a.mul(A[2]).add(b.mul(B[2])).add(d.mul(C[2])).add(wz)];
  };
  const S0 = spine(se), S1 = spine(se.add(0.02));
  const tx = S1[0].sub(S0[0]), ty = S1[1].sub(S0[1]), tz = S1[2].sub(S0[2]);
  const tl = tx.mul(tx).add(ty.mul(ty)).add(tz.mul(tz)).sqrt().max(0.0001);
  const Tx = tx.div(tl), Ty = ty.div(tl), Tz = tz.div(tl);
  const lxy = Tx.mul(Tx).add(Ty.mul(Ty)).sqrt().max(0.001);
  const Bx = Ty.div(lxy), By = Tx.div(lxy).negate();
  const Nx = By.mul(Tz), Ny = Bx.mul(Tz).negate(), Nz = lxy;
  const rad = float(1).sub(pg.z).max(0).pow(0.45).mul(3.8).mul(g.mul(0.6).add(0.4));
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  m.alphaTest = 0.5;
  m.positionNode = vec3(S0[0].add(Bx.mul(pg.x).add(Nx.mul(pg.y)).mul(rad)), S0[1].add(By.mul(pg.x).add(Ny.mul(pg.y)).mul(rad)), S0[2].add(Nz.mul(pg.y).mul(rad)));
  { const S = float(se).clamp(0, 1), dz = step(0.5, c.rnd(391 + n)).mul(2).sub(1).mul(c.rnd(395 + n).mul(5).add(11));
    const turns = c.rnd(399 + n).mul(1.6).add(1.4).mul(3.14159);
    const weave = S.mul(turns).add(c.rnd(403 + n).mul(6.283)).add(c.real.mul(0.21 + 0.04 * n)).sin().mul(S.mul(float(1).sub(S)).mul(4)).mul(dz);
    m.positionNode = m.positionNode.add(vec3(0, 0, weave)); }

  // the being's family (vision-sun-father-mat.js): 0 blue/violet, 1 magenta/orange, 2 green/yellow, 3 white + accent
  const sI = c.seed.add(0.5).floor(), fam = sI.add(sI.div(16).floor()).mod(4).floor(), acc = c.pick(217, 3);
  const accent = vec3(1, 0.04, 0.42).mul(is(acc, 0)).add(vec3(1, 0.38, 0.02).mul(is(acc, 1))).add(vec3(0.05, 0.12, 1).mul(is(acc, 2)));
  const mid = vec3(0.45, 0.05, 1).mul(is(fam, 0)).add(vec3(1, 0.38, 0.02).mul(is(fam, 1))).add(vec3(1, 0.85, 0.05).mul(is(fam, 2))).add(vec3(1).mul(is(fam, 3)));
  const hot = vec3(0.6, 0.75, 1).mul(is(fam, 0)).add(vec3(1, 0.85, 0.08).mul(is(fam, 1))).add(vec3(0.85, 1, 0.55).mul(is(fam, 2))).add(accent.mul(is(fam, 3)));
  // flow: 0 rides the travelling wave (swims), 1 locked to the body, 2 counter-flows against its growth
  const fl = c.pick(224 + n, 3);
  const l = se.mul(110).sub(sec.mul(10.3).mul(is(fl, 0))).add(g.mul(-70).add(sec.mul(4)).mul(is(fl, 2))), av = atan2(pg.y, pg.x).div(TAU).add(0.5);
  const face = pg.y.div(vec2(pg.x, pg.y).length().max(0.001));     // 1 facing the camera, 0 on the silhouette
  const sf = l.div(2.8);
  const colA = step(0.45, sf.fract()).mul(mid.mul(is(sf.floor().mod(2), 0)).add(hot.mul(is(sf.floor().mod(2), 1))));
  const row = l.div(2.2).floor(), bx = av.mul(8).add(row.mul(0.5));
  const cw = rad.mul(TAU / 8);
  const bd = vec2(bx.fract().sub(0.5).mul(cw), l.div(2.2).fract().sub(0.5).mul(2.2)).length();
  const br = cw.mul(0.42).min(0.85);
  const colB = hot.mul(step(bd, br.mul(0.4))).add(mid.mul(step(bd, br)).mul(step(br.mul(0.62), bd)));
  const u1 = l.div(3).add(av.mul(6)).fract(), u2 = l.div(3).sub(av.mul(6)).fract();
  const e = u1.min(float(1).sub(u1)).min(u2.min(float(1).sub(u2)));
  const colC = mid.mul(step(e, 0.07)).add(hot.mul(step(u1.sub(0.5).abs().max(u2.sub(0.5).abs()), 0.12)));
  const NS = low ? 2 : 3, k0 = c.pick(214, NS).add(n).mod(NS).floor(), k1 = k0.add(1).mod(NS);
  const k = select(se.lessThan(smoothstep(0.66, 0.8, u)), k1, k0);
  const skin = colA.mul(is(k, 0)).add(colB.mul(is(k, 1))).add(colC.mul(is(k, 2)));
  const dark = is(c.pick(215, 3).add(1), n).max(is(c.pick(226, 4), n)).mul(smoothstep(0.7, 0.75, u)).mul(inv(smoothstep(0.82, 0.86, u)));
  const rim = smoothstep(0.78, 0.97, float(1).sub(face.abs()));
  m.colorNode = skin.mul(float(1).sub(dark)).mul(face.abs().mul(0.7).add(0.3)).mul(c0.kick.mul(0.4).add(1)).add(hot.mul(rim).mul(0.8)).mul(2.0);
  m.opacityNode = step(0.004, g);
  return m;
}
