// THE CONTOUR ORACLE's ribbon-worms: real round tubes winding IN DEPTH through the scene (local z -26 behind the
// world's near parts .. +30 nearer than the being). params: { n } 1..4. uv = (along 0 root .. 1 tip, around 0..1).
// The spine is a quadratic bezier; the material (worm-mat) rebuilds every vertex from uv on the same spine and
// adds the travelling waves, so the rest pose here only has to agree roughly (bounds, picking).
export const SPINES = [
  { P: [[-10, -52, -26], [-95, -45, -5], [-40, 6, 30]], r: 3.6 },
  { P: [[14, -54, -26], [98, -38, -8], [47, -2, 28]], r: 3.3 },
  { P: [[30, 76, -25], [102, 30, -5], [40, -14, 28]], r: 3.0 },
  { P: [[-35, 78, -25], [-100, 42, -8], [-46, 22, 26]], r: 2.8 },
];
export const RINGS = 72, SIDES = 12;
export function geometry(ctx) {
  const K = [1, 1, 2 / 3, 0.5, 0.25][Math.min(4, Math.max(1, ctx.lod ?? 1))], NR = Math.max(12, Math.round(RINGS * K)), NS = Math.max(5, Math.round(SIDES * K));
  const S = SPINES[Math.max(0, Math.min(3, (ctx.params.n ?? 1) - 1))], [a, b, c] = S.P;
  const at = (u) => a.map((_, i) => (1 - u) * (1 - u) * a[i] + 2 * u * (1 - u) * b[i] + u * u * c[i]);
  const tan = (u) => a.map((_, i) => 2 * (1 - u) * (b[i] - a[i]) + 2 * u * (c[i] - b[i]));
  const nrm = (v) => { const l = Math.hypot(...v) || 1; return v.map((x) => x / l); };
  const crs = (p, q) => [p[1] * q[2] - p[2] * q[1], p[2] * q[0] - p[0] * q[2], p[0] * q[1] - p[1] * q[0]];
  const pt = (u, k) => { const T = nrm(tan(u)), N = nrm(crs(T, [0, 0, 1])), B = crs(T, N), C = at(u), r = S.r * (1 - 0.75 * u), an = k / NS * 6.28318;
    return C.map((x, i) => x + (N[i] * Math.cos(an) + B[i] * Math.sin(an)) * r); };
  const uvs = [];
  for (let j = 0; j < NR; j++) for (let k = 0; k < NS; k++) {
    const u0 = j / NR, u1 = (j + 1) / NR, v0 = k / NS, v1 = (k + 1) / NS;
    ctx.quad(...pt(u0, k), ...pt(u0, k + 1), ...pt(u1, k + 1), ...pt(u1, k));
    uvs.push(u0, v0, u0, v1, u1, v1, u0, v0, u1, v1, u1, v0);
  }
  return { uvs, bounds: { min: [-135, -100, -45], max: [135, 100, 50] } };
}
export function collider() { return null; }
