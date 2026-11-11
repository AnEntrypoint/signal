// Five arches over the field, parallel to x, each a half-ellipse from radius 80 to radius 80, high enough to
// clear the Eye's axis cylinder. uv = (s along, arch index + angle round).
export const ARCHES = [[36, 44], [8, 50], [-22, 56], [-56, 60], [-92, 66]]; // [z, apex height]
export function geometry(ctx) {
  const far = ctx.lod >= 3, RN = far ? 60 : 150, SN = far ? 6 : 12, R = 1.2, uvs = [], normals = [];
  ARCHES.forEach(([z, H], ai) => {
    const X = Math.sqrt(80 * 80 - z * z), rings = [];
    for (let i = 0; i <= RN; i++) {
      const s = i / RN, a = Math.PI * s, P = [-X * Math.cos(a), H * Math.sin(a), z];
      const T = [X * Math.sin(a), H * Math.cos(a), 0], l = Math.hypot(T[0], T[1]), N = [-T[1] / l, T[0] / l, 0], B = [0, 0, 1];
      const row = [];
      for (let j = 0; j <= SN; j++) {
        const t = (j / SN) * 6.2831853, n = [N[0] * Math.cos(t), N[1] * Math.cos(t), Math.sin(t)];
        row.push({ p: [P[0] + n[0] * R, P[1] + n[1] * R, P[2] + n[2] * R], n, u: s, v: ai + (j / SN) * 0.999 });
      }
      rings.push(row);
    }
    const put = (q) => { uvs.push(q.u, q.v); normals.push(...q.n); };
    const tri = (a, c, d) => { ctx.tri(...a.p, ...c.p, ...d.p); put(a); put(c); put(d); };
    for (let i = 0; i < RN; i++) for (let j = 0; j < SN; j++) { const a = rings[i][j], c = rings[i][j + 1], d = rings[i + 1][j + 1], e = rings[i + 1][j]; tri(a, c, d); tri(a, d, e); }
  });
  return { uvs, normals };
}
export function collider() { return null; }
