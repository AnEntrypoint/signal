// The hex chamber's shell: a hexagonal prism room (apothem 24, 40 high) with flat walls at local z = +24
// (the tunnel side, a round hole radius 6 and a 2 m collar reaching the tunnel's end) and z = -24 (the far wall).
// Origin = the blueprint's feet (world y -9): the room spans local y 4..44, the hole's centre is local y 24.
export function geometry(ctx) {
  const A = 24, R = A / Math.cos(Math.PI / 6), Y0 = 4, Y1 = 44, CY = 24, HR = 6;
  const V = [];
  for (let i = 0; i < 6; i++) V.push([R * Math.cos((i * Math.PI) / 3), R * Math.sin((i * Math.PI) / 3)]);
  for (let i = 0; i < 6; i++) {
    const a = V[i], b = V[(i + 1) % 6];
    ctx.tri(0, Y0, 0, a[0], Y0, a[1], b[0], Y0, b[1]);
    ctx.tri(0, Y1, 0, b[0], Y1, b[1], a[0], Y1, a[1]);
    if (i === 1) continue; // the wall at z = +24 carries the hole
    ctx.tri(a[0], Y0, a[1], a[0], Y1, a[1], b[0], Y1, b[1]);
    ctx.tri(a[0], Y0, a[1], b[0], Y1, b[1], b[0], Y0, b[1]);
  }
  // front wall: ring of quads from the hole's rim to the wall's rectangle
  const hw = R / 2, N = 48, rim = [], edge = [];
  for (let i = 0; i <= N; i++) {
    const t = (i / N) * Math.PI * 2, c = Math.cos(t), s = Math.sin(t);
    rim.push([c * HR, CY + s * HR]);
    const k = Math.min(hw / Math.max(Math.abs(c), 1e-6), (s > 0 ? Y1 - CY : CY - Y0) / Math.max(Math.abs(s), 1e-6));
    edge.push([c * k, CY + s * k]);
  }
  for (let i = 0; i < N; i++) {
    const a = rim[i], b = rim[i + 1], c = edge[i + 1], d = edge[i];
    ctx.tri(a[0], a[1], A, b[0], b[1], A, c[0], c[1], A);
    ctx.tri(a[0], a[1], A, c[0], c[1], A, d[0], d[1], A);
    // corner fill: the rectangle's corners lie between two edge samples
    ctx.tri(a[0], a[1], A, b[0], b[1], A + 2, a[0], a[1], A + 2); // collar
    ctx.tri(a[0], a[1], A, b[0], b[1], A, b[0], b[1], A + 2);
  }
  for (const sx of [-1, 1]) for (const yc of [Y0, Y1]) { // the four corner slivers the ray-cast ring leaves open
    let best = 0, bd = 1e9;
    for (let i = 0; i <= N; i++) { const dd = Math.hypot(edge[i][0] - sx * hw, edge[i][1] - yc); if (dd < bd) { bd = dd; best = i; } }
    const p = edge[Math.max(best - 1, 0)], q = edge[Math.min(best + 1, N)], m = edge[best];
    ctx.tri(p[0], p[1], A, m[0], m[1], A, sx * hw, yc, A);
    ctx.tri(m[0], m[1], A, q[0], q[1], A, sx * hw, yc, A);
  }
}
export function collider() { return null; }
