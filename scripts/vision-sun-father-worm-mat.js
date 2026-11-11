// THE SUN FATHER's FLARE TONGUES: real 3D bodies. Each is the canonical tube (worm-geo) wound along its own spine
// (a quadratic curve from below / above the frame at z -28, between the ring and the being, to z +30 in front of
// the being's outer crown), undulating by travelling sine waves in the vertex stage. Opaque black body, neon skin.
// Score: grows root-to-tip u .55-.8, skin changes along its length u .7-.86 (stripes -> beads -> scales, start
// seeded), one worm goes pure silhouette with a thin rim at the culmination (.85-.93), retracts tip-first .93-.96.
// Seeded: 212 mirror, 213 worm count (2 or 3), 214 first skin, 215 which goes dark, 200 fire family.
import { MeshBasicNodeMaterial, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, atan2, select } from "builtin/tsl";
import { tripClock, visionShown, visionU } from "./lib/trip.js";
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
  const is = (v, i) => step(float(v).sub(i).abs(), 0.5);
  const mir = c.rnd(212).step(0.5).mul(2).sub(1);
  const here = n === 3 ? step(0.4, c.rnd(213)) : float(1);
  const g = smoothstep(0.55 + 0.04 * (n - 1), 0.72 + 0.04 * (n - 1), u).mul(smoothstep(0.96, 0.93, u)).mul(here).mul(visionShown(ctx, c, 0));
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

  // the skin, in metres along the spine (l) and turns around it (av)
  const fam = c.pick(200, 3);
  const mid = vec3(1, 0.38, 0.02).mul(is(fam, 0)).add(vec3(1, 0.3, 0.03).mul(is(fam, 1))).add(vec3(1, 0.7, 0.05).mul(is(fam, 2)));
  const hot = vec3(1, 0.85, 0.08).mul(is(fam, 0).add(is(fam, 1))).add(vec3(1, 0.95, 0.75).mul(is(fam, 2)));
  const l = se.mul(110), av = atan2(pg.y, pg.x).div(TAU).add(0.5);
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
  const k0 = c.pick(214, 3).add(n).mod(3).floor(), k1 = k0.add(1).mod(3);
  const k = select(se.lessThan(smoothstep(0.7, 0.86, u)), k1, k0);
  const skin = colA.mul(is(k, 0)).add(colB.mul(is(k, 1))).add(colC.mul(is(k, 2)));
  const dark = is(c.pick(215, 2).add(1), n).mul(smoothstep(0.85, 0.9, u)).mul(smoothstep(0.96, 0.93, u));
  const rim = smoothstep(0.78, 0.97, float(1).sub(face.abs()));
  m.colorNode = skin.mul(float(1).sub(dark)).mul(face.abs().mul(0.7).add(0.3)).mul(c0.kick.mul(0.4).add(1)).add(hot.mul(rim).mul(0.8)).mul(2.0);
  m.opacityNode = step(0.004, g);
  return m;
}
