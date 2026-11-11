// THE MANY-ARMED ONE's naga tails: a real round tube winding IN DEPTH through the scene. Local frame = the being's
// (z 0 is the figure; the temple is at z -30, the camera at z +74). Tails 1,2 rise from below the floor behind the
// temple, pass between ring (z -12) and figure, and end nearer the eye than the figure; 3,4 come down from above.
// params: { n } 1..4. uv.x = along the length 0 (root) .. 1 (tip), uv.y = around 0..1.
export function spine(n, s) {
  const sx = n % 2 ? -1 : 1, top = n > 2;
  const z = -25 + 55 * s;
  const x = sx * ((top ? 74 : 60) - (top ? 34 : 29) * s + (top ? 7 : 10) * Math.sin(s * 7.6 + n * 1.9));
  const y = top ? 62 - 74 * s + 7 * Math.sin(s * 6.1 + n) : -58 + 80 * s + 8 * Math.sin(s * 5.4 + n * 2.3);
  return [x, y, z];
}
export function geometry(ctx) {
  const K = [1, 1, 2 / 3, 0.5, 0.25][Math.min(4, Math.max(1, ctx.lod ?? 1))], RINGS = Math.max(12, Math.round(76 * K)), SIDES = Math.max(5, Math.round(12 * K));
  const n = ctx.params.n ?? 1, top = n > 2, R0 = top ? 2.6 : 3.6;
  const rows = [], uvs = [];
  for (let i = 0; i <= RINGS; i++) {
    const s = i / RINGS, P = spine(n, s), Q = spine(n, Math.min(1, s + 0.004)), O = spine(n, Math.max(0, s - 0.004));
    let t = [Q[0] - O[0], Q[1] - O[1], Q[2] - O[2]]; const tl = Math.hypot(...t); t = t.map((v) => v / tl);
    let a = [t[1] * 0 - t[2] * 0, t[2] * 1 - t[0] * 0, t[0] * 0 - t[1] * 1]; // t x (1,0,0)
    const al = Math.hypot(...a) || 1; a = a.map((v) => v / al);
    const b = [t[1] * a[2] - t[2] * a[1], t[2] * a[0] - t[0] * a[2], t[0] * a[1] - t[1] * a[0]];
    const r = R0 * Math.pow(1 - s, 0.75) + 0.12, row = [];
    for (let j = 0; j <= SIDES; j++) {
      const an = (j / SIDES) * Math.PI * 2, ca = Math.cos(an) * r, sa = Math.sin(an) * r;
      row.push([P[0] + a[0] * ca + b[0] * sa, P[1] + a[1] * ca + b[1] * sa, P[2] + a[2] * ca + b[2] * sa]);
    }
    rows.push(row);
  }
  ctx.smooth();
  for (let i = 0; i < RINGS; i++) for (let j = 0; j < SIDES; j++) {
    const A = rows[i][j], B = rows[i + 1][j], C = rows[i + 1][j + 1], Dd = rows[i][j + 1];
    const u0 = i / RINGS, u1 = (i + 1) / RINGS, v0 = j / SIDES, v1 = (j + 1) / SIDES;
    ctx.tri(...A, ...B, ...C); uvs.push(u0, v0, u1, v0, u1, v1);
    ctx.tri(...A, ...C, ...Dd); uvs.push(u0, v0, u1, v1, u0, v1);
  }
  return { uvs, bounds: { min: [-95, -80, -40], max: [95, 80, 45] } };
}
export function collider() { return null; }
