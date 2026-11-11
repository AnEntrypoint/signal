// A tube grid with no shape of its own: the material bends it onto a (p,q) torus knot. Two copies, mirrored.
export function geometry(ctx) {
  const TN = ctx.lod >= 3 ? 120 : 260, KS = ctx.lod >= 3 ? 6 : 8, uvs = [], normals = [];
  for (let i = 0; i < TN; i++) for (let j = 0; j < KS; j++) {
    const g = (a, b) => [a / TN, b / KS];
    const P = [g(i, j), g(i + 1, j), g(i + 1, j + 1), g(i, j + 1)];
    const v = P.map(([u, w]) => [u, w * 0.999, 0]);
    for (const [x, y, z] of [[0, 1, 2], [0, 2, 3]]) { ctx.tri(...v[x], ...v[y], ...v[z]); for (const k of [x, y, z]) { uvs.push(P[k][0], P[k][1] * 0.999); normals.push(0, 0, 1); } }
  }
  ctx.instances({ layout: { kn: "float32x4" }, bounds: { min: [-52, 25, -72], max: [52, 56, -52] } });
  ctx.instance([1, 0, 0, 0]); ctx.instance([-1, 0, 0, 0]);
  return { uvs, normals };
}
export function collider() { return null; }
