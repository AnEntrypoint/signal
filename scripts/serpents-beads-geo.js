// The bead string of every serpent: one little sphere, ~900 copies, each record its spine point and frame;
// the material winds the string round the body, in front of it and behind it (it threads through).
import { BODIES, frame, tubeR, codeOf } from "./serpents-curve.js";
export function geometry(ctx) {
  const far = ctx.lod >= 3, LON = far ? 6 : 10, LAT = far ? 4 : 6, uvs = [], normals = [];
  const P = (lo, la) => { const th = (lo / LON) * 6.2831853, ph = (la / LAT) * Math.PI; return [Math.cos(th) * Math.sin(ph), Math.cos(ph), Math.sin(th) * Math.sin(ph)]; };
  for (let lo = 0; lo < LON; lo++) for (let la = 0; la < LAT; la++) {
    const a = P(lo, la), b = P(lo + 1, la), c = P(lo + 1, la + 1), d = P(lo, la + 1);
    const t = (x, y, z) => { ctx.tri(...x, ...y, ...z); for (const q of [x, y, z]) { normals.push(...q); uvs.push(0, q[1] * 0.5 + 0.5); } };
    if (la > 0) t(a, c, b);
    if (la < LAT - 1) t(a, d, c);
  }
  ctx.instances({ layout: { pos: "float32x4", info: "float32x4", nn: "float32x4", bb: "float32x4" }, bounds: { min: [-110, -2, -110], max: [110, 70, 110] } });
  BODIES.forEach((b, bi) => {
    const n = 56;
    for (let i = 0; i < n; i++) {
      const s = 0.03 + (i / (n - 1)) * 0.93, F = frame(b, s), r = tubeR(b, s);
      ctx.instance([F.P[0], F.P[1], F.P[2], s], [codeOf(bi), i, r * 0.42 + 0.06, r], [F.N[0], F.N[1], F.N[2], 0], [F.B[0], F.B[1], F.B[2], 0]);
    }
  });
  return { uvs, normals };
}
export function collider() { return null; }
