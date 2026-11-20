// Hex chamber, shared geometry helpers: square-section line "beams" with a uv per vertex (u = part id,
// v = arc length along the stroke 0..1), polylines of them, and small octahedron beads (v + 2 marks a bead).
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
export function beam(ctx, uvs, a, b, w, u, va = 0, vb = va) {
  let d = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
  const L = Math.hypot(d[0], d[1], d[2]) || 1;
  d = d.map((x) => x / L);
  const up = Math.abs(d[2]) > 0.9 ? [1, 0, 0] : [0, 0, 1];
  let s1 = cross(d, up);
  const l1 = Math.hypot(s1[0], s1[1], s1[2]);
  s1 = s1.map((x) => x / l1);
  const s2 = cross(d, s1), h = w / 2;
  const cs = [[1, 1], [-1, 1], [-1, -1], [1, -1]];
  const at = (p, e, c) => [0, 1, 2].map((i) => p[i] + d[i] * h * e + s1[i] * h * c[0] + s2[i] * h * c[1]);
  const A = cs.map((c) => at(a, -1, c)), B = cs.map((c) => at(b, 1, c));
  for (let i = 0; i < 4; i++) {
    const j = (i + 1) % 4;
    ctx.tri(...A[i], ...A[j], ...B[j]); uvs.push(u, va, u, va, u, vb);
    ctx.tri(...A[i], ...B[j], ...B[i]); uvs.push(u, va, u, vb, u, vb);
  }
}
export function polyline(ctx, uvs, pts, w, u, closed = false) {
  const n = pts.length - (closed ? 0 : 1), len = [0];
  for (let i = 0; i < n; i++) { const p = pts[i], q = pts[(i + 1) % pts.length]; len.push(len[i] + Math.hypot(q[0] - p[0], q[1] - p[1], q[2] - p[2])); }
  for (let i = 0; i < n; i++) beam(ctx, uvs, pts[i], pts[(i + 1) % pts.length], w, u, len[i] / len[n], len[i + 1] / len[n]);
}
export function bead(ctx, uvs, p, r, u, v) {
  const X = [[r, 0, 0], [-r, 0, 0]], Y = [[0, r, 0], [0, -r, 0]], Z = [[0, 0, r], [0, 0, -r]];
  for (const x of X) for (const y of Y) for (const z of Z) {
    ctx.tri(p[0] + x[0], p[1], p[2], p[0], p[1] + y[1], p[2], p[0], p[1], p[2] + z[2]);
    uvs.push(u, v + 2, u, v + 2, u, v + 2);
  }
}
