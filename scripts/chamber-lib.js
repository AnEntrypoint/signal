// Hex chamber, shared geometry helper: a square-section line "beam" between two points, with a uv per vertex.
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
export function beam(ctx, uvs, a, b, w, u, v = 0) {
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
    ctx.tri(...A[i], ...A[j], ...B[j]);
    ctx.tri(...A[i], ...B[j], ...B[i]);
    for (let k = 0; k < 6; k++) uvs.push(u, v);
  }
}
export function polyline(ctx, uvs, pts, w, u, closed = false) {
  for (let i = 0; i < pts.length - (closed ? 0 : 1); i++) beam(ctx, uvs, pts[i], pts[(i + 1) % pts.length], w, u);
}
