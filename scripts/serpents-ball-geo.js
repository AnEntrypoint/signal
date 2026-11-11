// A small sphere drawn as an instance set; where each copy stands is computed in the material (rose / knot beads).
export function geometry(ctx) {
  const LON = ctx.lod >= 3 ? 6 : 9, LAT = ctx.lod >= 3 ? 4 : 6, uvs = [], normals = [];
  const P = (lo, la) => { const th = (lo / LON) * 6.2831853, ph = (la / LAT) * Math.PI; return [Math.cos(th) * Math.sin(ph), Math.cos(ph), Math.sin(th) * Math.sin(ph)]; };
  for (let lo = 0; lo < LON; lo++) for (let la = 0; la < LAT; la++) {
    const a = P(lo, la), b = P(lo + 1, la), c = P(lo + 1, la + 1), d = P(lo, la + 1);
    const t = (x, y, z) => { ctx.tri(...x, ...y, ...z); for (const q of [x, y, z]) { normals.push(...q); uvs.push(0, q[1] * 0.5 + 0.5); } };
    if (la > 0) t(a, c, b);
    if (la < LAT - 1) t(a, d, c);
  }
  const N = ctx.params.count ?? 420;
  ctx.instances({ layout: { rb: "float32x4" }, bounds: { min: [-70, 0, -80], max: [70, 45, -10] } });
  for (const side of [1, -1]) for (let n = 0; n < N; n++) ctx.instance([n / N, side, n, 0]);
  return { uvs, normals };
}
export function collider() { return null; }
