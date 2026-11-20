// mask-totem / bead-mask / kaleido-machine: a bilateral neon line-art cat-owl mask, ~14 m wide, facing +Z.
// Every stroke is a flat ribbon built on the right half from the centre outward and mirrored about x = 0.
// uv.x = along (0..1 along its stroke, the draw-on and Color Drift coordinate); uv.y = kind + frac, where
// frac is the across-ribbon position (ribbons) or the radius 0..0.9 (beads, ring with a dark centre).
// kinds: 0 eyes, 1 nose shield, 2 whiskers, 3 feather ears, 4 outline/lids/swirls, 5 chin, 7 machine line,
// 8 cat ears, 9 crown totem; 20+k the bead copy of part k (bead-mask); 40 brow/tip beads; 41 pupil; 42 black
// backing; 43 machine cells (frac = cell hash).
const D = Math.PI / 180;
function cr(P, step = 0.12) { // Catmull-Rom through P, sampled every ~step m
  const out = [];
  for (let i = 0; i < P.length - 1; i++) {
    const p0 = P[Math.max(i - 1, 0)], p1 = P[i], p2 = P[i + 1], p3 = P[Math.min(i + 2, P.length - 1)];
    const n = Math.max(2, Math.ceil(Math.hypot(p2[0] - p1[0], p2[1] - p1[1]) / step));
    for (let k = 0; k < n; k++) {
      const t = k / n, t2 = t * t, t3 = t2 * t;
      out.push([0, 1].map((j) => 0.5 * (2 * p1[j] + (-p0[j] + p2[j]) * t + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * t2 + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * t3)));
    }
  }
  out.push(P[P.length - 1]);
  return out;
}
const arc = (cx, cy, rx, ry, a0, a1, step = 0.12) => {
  const n = Math.max(6, Math.ceil((Math.abs(a1 - a0) * D * Math.max(rx, ry)) / step)), out = [];
  for (let i = 0; i <= n; i++) { const a = (a0 + ((a1 - a0) * i) / n) * D; out.push([cx + Math.cos(a) * rx, cy + Math.sin(a) * ry]); }
  return out;
};
export function geometry(ctx) {
  const uvs = [];
  const T = (a, b, c, ua, ub, uc) => { ctx.tri(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]); uvs.push(...ua, ...ub, ...uc); };
  const ribbon = (pts, kind, w, z) => {
    const L = [0];
    for (let i = 1; i < pts.length; i++) L.push(L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
    const tot = L[L.length - 1] || 1, h = w / 2;
    const nrm = pts.map((_, i) => {
      const a = pts[Math.max(i - 1, 0)], b = pts[Math.min(i + 1, pts.length - 1)];
      const dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy) || 1;
      return [-dy / l, dx / l];
    });
    for (let i = 0; i < pts.length - 1; i++) {
      const p = pts[i], q = pts[i + 1], n = nrm[i], m = nrm[i + 1], ua = L[i] / tot, ub = L[i + 1] / tot;
      const A = [p[0] - n[0] * h, p[1] - n[1] * h, z], B = [q[0] - m[0] * h, q[1] - m[1] * h, z];
      const C = [q[0] + m[0] * h, q[1] + m[1] * h, z], E = [p[0] + n[0] * h, p[1] + n[1] * h, z];
      T(A, B, C, [ua, kind], [ub, kind], [ub, kind + 0.9]);
      T(A, C, E, [ua, kind], [ub, kind + 0.9], [ua, kind + 0.9]);
    }
    return { L, tot };
  };
  const bead = (p, r, kind, al, z) => {
    const n = 12, c = [p[0], p[1], z + 0.02];
    for (let i = 0; i < n; i++) {
      const a = (i / n) * 2 * Math.PI, b = ((i + 1) / n) * 2 * Math.PI;
      T(c, [p[0] + Math.cos(a) * r, p[1] + Math.sin(a) * r, z + 0.02], [p[0] + Math.cos(b) * r, p[1] + Math.sin(b) * r, z + 0.02], [al, kind], [al, kind + 0.9], [al, kind + 0.9]);
    }
  };
  const beadsAlong = (pts, kind, gap, r, z) => { // beads at even arc length on pts, along = their arc fraction
    if (ctx.lod >= 3 && kind < 40) return;
    let acc = 0, tot = 0;
    for (let i = 1; i < pts.length; i++) tot += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    let next = gap * 0.5;
    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1], b = pts[i], l = Math.hypot(b[0] - a[0], b[1] - a[1]);
      while (next <= acc + l) { const t = (next - acc) / l; bead([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t], r, kind, next / (tot || 1), z); next += gap; }
      acc += l;
    }
  };
  const mir = (pts) => pts.map(([x, y]) => [-x, y]);
  // a stroke: ribbon + its bead copy (bead-mask), mirrored unless it is its own mirror image
  const S = (pts, kind, w = 0.09, z = 0, mirror = true) => {
    for (const P of mirror ? [pts, mir(pts)] : [pts]) {
      ribbon(P, kind, w, z);
      if (kind !== 7) beadsAlong(P, 20 + kind, 0.3, 0.1, z);
    }
  };
  const B = (pts, gap, r, z = 0.03, kind = 40) => { beadsAlong(pts, kind, gap, r, z); beadsAlong(mir(pts), kind, gap, r, z); };

  // --- head outline (two contours) and black backing
  const head = [[0, 4.0], [1.2, 3.95], [2.4, 3.6], [3.6, 3.0], [4.6, 2.0], [5.3, 0.6], [5.4, -0.8], [5.0, -2.1], [4.1, -3.2], [2.9, -4.1], [1.5, -4.7], [0, -5.0]];
  const outer = cr(head);
  S(outer, 4, 0.12);
  S(cr(head.map(([x, y]) => [x * 0.88, (y + 0.4) * 0.88 - 0.4])), 4, 0.08);
  { const ring = [...outer, ...mir(outer).reverse()], c0 = [0, -0.5, -0.25];
    for (let i = 0; i < ring.length - 1; i++) {
      const a = ring[i], b = ring[i + 1], k = 1.03;
      T(c0, [a[0] * k, (a[1] + 0.5) * k - 0.5, -0.25], [b[0] * k, (b[1] + 0.5) * k - 0.5, -0.25], [0, 42], [0, 42], [0, 42]);
    } }
  // --- target eyes: 3 rings, slit pupil, almond lids with outward flicks
  const E = [2.3, 0.9];
  for (const [r, w] of [[1.55, 0.1], [1.15, 0.09], [0.78, 0.08]]) S(arc(E[0], E[1], r, r * 0.92, 180, 540), 0, w, 0.02);
  S(arc(E[0], E[1], 0.2, 0.5, 90, 450), 0, 0.07, 0.04);
  { const c0 = [E[0], E[1], 0.03];
    for (const sx of [1, -1]) for (let i = 0; i < 16; i++) {
      const a = (i / 16) * 2 * Math.PI, b = ((i + 1) / 16) * 2 * Math.PI;
      T([sx * c0[0], c0[1], 0.03], [sx * (E[0] + Math.cos(a) * 0.16), E[1] + Math.sin(a) * 0.42, 0.03], [sx * (E[0] + Math.cos(b) * 0.16), E[1] + Math.sin(b) * 0.42, 0.03], [0.5, 41], [0.5, 41.9], [0.5, 41.9]);
    } }
  S([...arc(E[0], E[1], 1.95, 1.45, 165, 15), [4.55, 1.55], [5.0, 2.05]], 4, 0.09);
  S([...arc(E[0], E[1], 1.95, 1.3, 195, 335), [4.6, 0.3], [5.05, 0.05]], 4, 0.08);
  // --- brow bead rows and the forehead target
  B(arc(E[0], E[1], 2.3, 1.85, 160, 25), 0.3, 0.11);
  B(arc(E[0], E[1], 2.7, 2.25, 150, 35), 0.34, 0.13);
  S(arc(0, 2.75, 0.45, 0.45, 90, -90), 0, 0.08);
  S(arc(0, 2.75, 0.22, 0.22, 90, -90), 0, 0.07);
  // --- nose shield with chevrons, nostrils, mouth
  S(cr([[0, 0.75], [0.95, 0.7], [1.05, -0.5], [0.55, -1.5], [0, -2.25]], 0.1), 1, 0.1);
  S(cr([[0, 0.45], [0.7, 0.4], [0.78, -0.5], [0.4, -1.25], [0, -1.8]], 0.1), 1, 0.07);
  for (const y of [0.15, -0.35, -0.85]) S([[0, y - 0.38], [0.55, y]], 1, 0.08);
  S(arc(0.32, -2.0, 0.18, 0.14, 180, 0), 1, 0.07);
  S(cr([[0, -2.35], [0.5, -2.8], [1.1, -2.65], [1.55, -2.2]]), 4, 0.09);
  // --- cheek swirls
  { const sp = []; for (let i = 0; i <= 60; i++) { const t = i / 60, a = (200 + t * 560) * D, r = 0.75 - t * 0.6; sp.push([3.95 + Math.cos(a) * r, -1.45 + Math.sin(a) * r]); } S(sp, 4, 0.08); }
  // --- whisker fans: 5 lines a side, tipped with beads
  for (let i = 0; i < 5; i++) {
    const a = (-30 + i * 10) * D, L = 5.6 - Math.abs(i - 2) * 0.35, r0 = [1.3 + i * 0.05, -1.55 - i * 0.14], w = [];
    for (let k = 0; k <= 24; k++) { const t = k / 24; w.push([r0[0] + Math.cos(a) * L * t, r0[1] + Math.sin(a) * L * t + 0.35 * Math.sin(Math.PI * t) * (i - 2) * 0.3]); }
    S(w, 2, 0.08, 0.05);
    B([w[w.length - 2], w[w.length - 1]], 0.05, 0.17, 0.06);
  }
  // --- feather ears (variant A) and cat ears (variant B)
  for (const [p0, p1, p2, nb] of [[[1.4, 3.7], [2.9, 5.9], [4.7, 7.4], 7], [[2.6, 3.3], [4.4, 4.7], [6.3, 5.6], 5]]) {
    const q = cr([p0, p1, p2], 0.12);
    S(q, 3, 0.1);
    for (let j = 1; j <= nb; j++) {
      const i = Math.floor((j / (nb + 1)) * (q.length - 1)), a = q[i], b = q[Math.min(i + 1, q.length - 1)];
      const dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy) || 1, len = 0.95 * (1 - j / (nb + 2)) + 0.25;
      for (const s of [1, -1]) S([a, [a[0] + (-dy / l * s * 0.85 + dx / l * 0.5) * len, a[1] + (dx / l * s * 0.85 + dy / l * 0.5) * len]], 3, 0.07);
    }
    B([q[q.length - 2], q[q.length - 1]], 0.05, 0.2, 0.05);
  }
  for (const k of [1, 0.72, 0.45]) {
    const c0 = [2.9, 4.4];
    S([[1.3, 3.7], [2.9, 7.0], [4.6, 3.0]].map(([x, y]) => [c0[0] + (x - c0[0]) * k, c0[1] + (y - c0[1]) * k]), 8, 0.09);
  }
  // --- crown totem on the axis: quill, stacked chevrons, diamond
  S([[0, 4.0], [0, 8.0]], 9, 0.1, 0, false);
  for (let i = 0; i < 4; i++) { const y = 4.5 + i * 0.6; S([[0, y + 0.38], [0.75 - i * 0.1, y]], 9, 0.08); }
  S([[0, 8.3], [0.45, 7.6], [0, 6.9]], 9, 0.08);
  B([[0, 8.6], [0, 8.65]], 0.05, 0.2, 0.05);
  // --- chin spike
  S([[0, -5.0], [0.5, -5.3], [0.12, -6.8], [0, -7.5]], 5, 0.1);
  S([[0, -5.45], [0.2, -5.65], [0, -6.6]], 5, 0.07);
  beadsAlong([[0, -7.8], [0, -7.85]], 40, 0.05, 0.2, 0.05);
  // --- kaleido-machine behind: three cartouche tiers of cells, gears, a spine, mirrored
  for (const [ti, y] of [[0, 2.4], [1, 0], [2, -2.4]]) {
    const h = 0.7, x0 = 6.4, x1 = 14.6;
    S([[x0 + h, y + h], [x1 - h, y + h], ...arc(x1 - h, y, h, h, 90, -90).slice(1), [x0 + h, y - h], ...arc(x0 + h, y, h, h, 270, 90).slice(1)], 7, 0.08, -1.5);
    for (let i = 0; i < 6; i++) {
      const cx = x0 + 1.25 + i * 1.15, s = 0.38, f = 43 + ((i * 7 + ti * 3) % 9) / 10;
      S([[cx - s, y - s], [cx + s, y - s], [cx + s, y + s], [cx - s, y + s], [cx - s, y - s]], 7, 0.06, -1.5);
      for (const sx of [1, -1]) {
        const a = [sx * (cx - s * 0.8), y - s * 0.8, -1.55], b = [sx * (cx + s * 0.8), y - s * 0.8, -1.55], c = [sx * (cx + s * 0.8), y + s * 0.8, -1.55], d = [sx * (cx - s * 0.8), y + s * 0.8, -1.55];
        T(a, b, c, [i / 6, f], [i / 6, f], [i / 6, f]); T(a, c, d, [i / 6, f], [i / 6, f], [i / 6, f]);
      }
    }
    S(arc(15.9, y, 0.7, 0.7, 180, 540), 7, 0.07, -1.5);
    for (let k = 0; k < 8; k++) { const a = k * 45 * D; S([[15.9 + Math.cos(a) * 0.7, y + Math.sin(a) * 0.7], [15.9 + Math.cos(a) * 1.0, y + Math.sin(a) * 1.0]], 7, 0.07, -1.5); }
  }
  S([[6.0, -3.6], [6.0, 3.6]], 7, 0.08, -1.5);
  S([[5.6, 3.9], [16.8, 3.9]], 7, 0.06, -1.5);
  S([[5.6, -3.9], [16.8, -3.9]], 7, 0.06, -1.5);
  return { uvs, bounds: { min: [-17.5, -8.5, -2], max: [17.5, 9, 0.5] } };
}
export function collider() { return null; }
