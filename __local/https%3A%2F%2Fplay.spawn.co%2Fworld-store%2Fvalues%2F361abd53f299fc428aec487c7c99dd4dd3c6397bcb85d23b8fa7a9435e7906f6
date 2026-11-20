// The lids, emitted in "curve space": scripts/eye-lids.js bends them onto the almond and opens them.
//   x = along the lid (-W..W; +100 marks the lower lid), y = distance off the lid's edge (m) for the striped band,
//   the lashes and their beads; y = -10 - s marks the black lid body (s 0 at the edge, 1 at the fixed outer curve).
const W = 22, Z = 2.2, BAND = 0.95;
export function geometry(ctx) {
  for (const X of [0, 100]) {
    const N = 48;
    ctx.color(0, 0, 0);
    for (let i = 0; i < N; i++) {
      const a = -W + (2 * W * i) / N + X, b = -W + (2 * W * (i + 1)) / N + X;
      ctx.quad(a, -10, Z, b, -10, Z, b, -11, Z, a, -11, Z);
    }
    // edge keyline (yellow) and the op-art band
    const M = 110;
    for (let i = 0; i < M; i++) {
      const a = -W + (2 * W * i) / M + X, b = -W + (2 * W * (i + 1)) / M + X;
      ctx.color(1, 0.78, 0.02);
      ctx.quad(a, -0.12, Z + 0.1, b, -0.12, Z + 0.1, b, 0.16, Z + 0.1, a, 0.16, Z + 0.1);
      const v = i % 2 ? 1 : 0; ctx.color(v, v, v);
      ctx.quad(a, 0.16, Z + 0.1, b, 0.16, Z + 0.1, b, BAND, Z + 0.1, a, BAND, Z + 0.1);
    }
    // lashes: thin cones tipped with beads
    const L = 27;
    for (let k = 0; k < L; k++) {
      const x = -W * 0.93 + (2 * W * 0.93 * k) / (L - 1) + X;
      const tip = BAND + (k % 2 ? 2.1 : 1.35);
      ctx.color(1, 1, 1);
      ctx.tri(x - 0.17, BAND, Z + 0.15, x + 0.17, BAND, Z + 0.15, x, tip, Z + 0.15);
      if (k % 2) ctx.color(1, 0.03, 0.55); else ctx.color(0.06, 1, 0.1);
      const R = k % 2 ? 0.3 : 0.24, U = 10, V = 6;
      const P = (u, v) => { const p = (u / U) * Math.PI * 2, q = (v / V) * Math.PI; return [x + R * Math.sin(q) * Math.cos(p), tip + R * Math.cos(q), Z + 0.15 + R * Math.sin(q) * Math.sin(p)]; };
      for (let v = 0; v < V; v++) for (let u = 0; u < U; u++) {
        const a = P(u, v), b = P(u + 1, v), c = P(u + 1, v + 1), d = P(u, v + 1);
        if (v > 0) ctx.tri(...a, ...b, ...c);
        if (v < V - 1) ctx.tri(...a, ...c, ...d);
      }
    }
  }
  return { bounds: { min: [-26, -24, 1.5], max: [26, 24, 3.2] } };
}
export function collider() { return null; }
