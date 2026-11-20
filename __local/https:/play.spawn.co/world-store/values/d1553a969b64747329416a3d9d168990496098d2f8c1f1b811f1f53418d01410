// The little block towers on the outer field: one tower (a cube under a spike), ~300 copies on mirrored polar
// rows between radius 62 and 88, kept off the Eye's axis. uv = (part + u, height 0..1).
export function geometry(ctx) {
  const uvs = [], normals = [], S = ctx.lod >= 3 ? 4 : 8;
  const q = (a, b, c, d, n, part, u0, u1, v0, v1) => {
    ctx.tri(...a, ...b, ...c); ctx.tri(...a, ...c, ...d);
    for (const [u, v] of [[u0, v0], [u1, v0], [u1, v1], [u0, v0], [u1, v1], [u0, v1]]) { uvs.push(part + u, v); normals.push(...n); }
  };
  const w = 0.5, h = 0.6;
  const sides = [[[-w, 0, w], [w, 0, w], [0, 0, 1]], [[w, 0, w], [w, 0, -w], [1, 0, 0]], [[w, 0, -w], [-w, 0, -w], [0, 0, -1]], [[-w, 0, -w], [-w, 0, w], [-1, 0, 0]]];
  for (const [a, b, n] of sides) q([a[0], 0, a[2]], [b[0], 0, b[2]], [b[0], h, b[2]], [a[0], h, a[2]], n, 0, 0, 0.999, 0, h);
  q([-w, h, w], [w, h, w], [w, h, -w], [-w, h, -w], [0, 1, 0], 0, 0, 0.999, h, h);
  for (let i = 0; i < S; i++) {
    const a0 = (i / S) * 6.2831853, a1 = ((i + 1) / S) * 6.2831853, r = 0.42;
    const A = [Math.cos(a0) * r, h, Math.sin(a0) * r], B = [Math.cos(a1) * r, h, Math.sin(a1) * r], T = [0, 1, 0];
    const am = (a0 + a1) / 2, n = [Math.cos(am) * 0.9, 0.4, Math.sin(am) * 0.9];
    ctx.tri(...A, ...T, ...B);
    uvs.push(1 + i / S, h, 1 + (i + 0.5) / S, 1, 1 + (i + 1) / S, h); normals.push(...n, ...n, ...n);
  }
  ctx.instances({ layout: { info: "float32x4" }, bounds: { min: [-95, 0, -95], max: [95, 9, 95] } });
  let row = 0;
  for (let r = 62; r <= 88.1; r += 4.4, row++) {
    const n = Math.round((6.2831853 * r) / 11);
    for (let k = 0; k < n; k++) {
      const ang = ((k + 0.5) / n) * 6.2831853, x = Math.sin(ang) * r, z = -Math.cos(ang) * r;
      if (Math.abs(x) < 23 && z > -42 && z < 64) continue;
      const m = Math.min(k, n - 1 - k), hsh = Math.abs(Math.sin(row * 12.9898 + m * 78.233) * 43758.5453) % 1;
      ctx.instance([r, ang, hsh < 0.55 ? 0 : 1, 1.4 + hsh * 3.2]);
    }
  }
  return { uvs, normals };
}
export function collider() { return null; }
