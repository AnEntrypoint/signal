// THE CONTOUR ORACLE (vision being, BEINGS[2]): one mesh, four layers at four depths, origin at the feet,
// the being's centre 20 m up, facing +Z.
//   kind 0  the front face: a relief grid whose height IS the op-art (contour stripes of it). uv.x = height 0..1
//   kind 1  two mirrored profiles at x = +-16, z = -5: nested scaled copies of one silhouette, uv.x = arc from the nose 0..1
//   kind 2  the far ring at z = -12: two bead rows (uv.x = bead index / 96) and two hairlines (uv.x = angle / turn)
//   kind 3/4 the near veil at z = 10..20: hanging strands and their beads, uv.x = along the strand from the top
//   kind 5  the two eyes, flat almonds hovering over the sockets, uv.x = -1 inner corner .. +1 outer corner
// uv.y = kind + fr (fr 0..0.98: ring index, row, strand, or the eye's height -1..1 mapped to 0..1)
export const FY = 20;
export function faceH(x, y) {
  const jaw = 0.8 + 0.2 * Math.min(1, Math.max(0, (y + 8) / 10));
  const e = 1 - (x / (6.2 * jaw)) ** 2 - ((y - 0.5) / 8.6) ** 2;
  if (e <= 0) return 0;
  const ax = Math.abs(x), G = (v) => Math.exp(-v);
  let f = 1.7 * G((x / 0.8) ** 2) * G(((y - 1) / 2.3) ** 4)       // nose ridge
    + 0.9 * G((x * x + (y + 0.9) ** 2) / 0.45)                       // nose tip
    - 1.1 * G((ax - 2.3) ** 2 / 1.3 + (y - 1.8) ** 2 / 0.6)          // sockets
    + 0.55 * G((y - 3.1) ** 2 / 0.35 + (ax - 2.1) ** 2 / 3)           // brow
    + 0.5 * G((ax - 3) ** 2 / 2 + (y + 0.8) ** 2 / 2)                 // cheeks
    + 0.45 * G(x * x / 2 + (y + 3.15) ** 2 / 0.08)                     // upper lip
    + 0.5 * G(x * x / 1.6 + (y + 3.85) ** 2 / 0.1)                     // lower lip
    + 0.6 * G(x * x / 1.5 + (y + 5.6) ** 2 / 0.8);                     // chin
  return 3.6 * Math.sqrt(e) + f * Math.min(1, e / 0.25);
}
// a profile facing +x, nose tip first, closed
const PROF = [[5.0, 1.0], [4.5, 2.2], [4.1, 3.1], [4.4, 4.3], [3.9, 6.4], [2.2, 8.3], [-0.8, 9.1], [-3.8, 7.8], [-5.2, 4.4], [-5.1, 0.6], [-3.6, -2.4], [-3.0, -5.5], [-3.3, -8.6], [1.6, -8.6], [1.6, -5.4], [2.7, -4.3], [3.9, -3.6], [4.1, -2.3], [4.6, -1.5], [4.6, -0.6], [4.0, 0.1], [4.6, 0.5]];
function catmull(P, n) {
  const out = [], m = P.length;
  for (let i = 0; i < n; i++) {
    const t = (i / n) * m, k = Math.floor(t), f = t - k;
    const p0 = P[(k - 1 + m) % m], p1 = P[k % m], p2 = P[(k + 1) % m], p3 = P[(k + 2) % m];
    const c = (a, b, cc, d) => 0.5 * (2 * b + (cc - a) * f + (2 * a - 5 * b + 4 * cc - d) * f * f + (3 * b - a - 3 * cc + d) * f * f * f);
    out.push([c(p0[0], p1[0], p2[0], p3[0]), c(p0[1], p1[1], p2[1], p3[1])]);
  }
  return out;
}
export function geometry(ctx) {
  const uvs = [];
  const Q = (a, b, c, d, ua, ub, uc, ud) => { ctx.quad(...a, ...b, ...c, ...d); uvs.push(...ua, ...ub, ...uc, ...ua, ...uc, ...ud); };
  // kind 0: the face relief
  let hmax = 0; const st = 0.15, X0 = -7.2, Y0 = -9, NX = 96, NY = 125;
  const H = [];
  for (let j = 0; j <= NY; j++) { H.push([]); for (let i = 0; i <= NX; i++) { const h = faceH(X0 + i * st, Y0 + j * st); H[j].push(h); hmax = Math.max(hmax, h); } }
  for (let j = 0; j < NY; j++) for (let i = 0; i < NX; i++) {
    const h00 = H[j][i], h10 = H[j][i + 1], h11 = H[j + 1][i + 1], h01 = H[j + 1][i];
    if (h00 + h10 + h11 + h01 <= 0) continue;
    const x0 = X0 + i * st, y0 = Y0 + j * st + FY, x1 = x0 + st, y1 = y0 + st;
    Q([x0, y0, h00], [x1, y0, h10], [x1, y1, h11], [x0, y1, h01], [h00 / hmax, 0], [h10 / hmax, 0], [h11 / hmax, 0], [h01 / hmax, 0]);
  }
  // kind 1: profiles, nested scaled copies of the silhouette toward its middle
  const S = 200, curve = catmull(PROF, S), K = 11, cx0 = 0.3, cy0 = 1.0;
  for (const side of [-1, 1]) for (let k = 0; k < K; k++) {
    const s1 = 1 - (k / K) * 0.93, s0 = s1 - 0.5 * 0.93 / K, fr = 1 + (k / K) * 0.98;
    const P = (p, s) => [side * 16 - side * (cx0 + (p[0] - cx0) * s), FY + cy0 + (p[1] - cy0) * s, -5];
    for (let i = 0; i < S; i++) {
      const a = curve[i], b = curve[(i + 1) % S], ua = Math.min(i, S - i) / (S / 2), ub = Math.min(i + 1, S - i - 1) / (S / 2);
      Q(P(a, s0), P(b, s0), P(b, s1), P(a, s1), [ua, fr], [ub, fr], [ub, fr], [ua, fr]);
    }
  }
  // kind 2: the far ring
  const RZ = -12, NB = 96;
  const disc = (x, y, z, r, u, v, seg = 10) => { for (let s = 0; s < seg; s++) { const a0 = s / seg * 6.2832, a1 = (s + 1) / seg * 6.2832; ctx.tri(x, y, z, x + r * Math.cos(a0), y + r * Math.sin(a0), z, x + r * Math.cos(a1), y + r * Math.sin(a1), z); uvs.push(u, v, u, v, u, v); } };
  [[17.2, 0.36, 2.1], [18.6, 0.28, 2.4]].forEach(([R, r, v]) => { for (let i = 0; i < NB; i++) { const a = i / NB * 6.2832; disc(R * Math.sin(a), FY + R * Math.cos(a), RZ, r, i / NB, v); } });
  [[15.9, 0.06, 2.7], [20.0, 0.09, 2.9]].forEach(([R, w, v]) => { const n = 192; for (let i = 0; i < n; i++) { const a0 = i / n * 6.2832, a1 = (i + 1) / n * 6.2832; const pt = (a, rr) => [rr * Math.sin(a), FY + rr * Math.cos(a), RZ]; Q(pt(a0, R - w), pt(a1, R - w), pt(a1, R + w), pt(a0, R + w), [i / n, v], [(i + 1) / n, v], [(i + 1) / n, v], [i / n, v]); } });
  // kind 3/4: the near veil, mirrored strands
  const LEN = [12, 22, 9, 17, 26];
  for (const side of [-1, 1]) for (let j = 0; j < 5; j++) {
    const x = side * (21.5 + j * 2.1), z = 10 + ((j * 3) % 5) * 2.5, L = LEN[j], fr = (j + (side > 0 ? 5 : 0)) / 10 * 0.98, w = 0.05, top = FY + 21;
    const n = Math.ceil(L / 0.5);
    for (let i = 0; i < n; i++) { const y0 = top - i * L / n, y1 = top - (i + 1) * L / n; Q([x - w, y1, z], [x + w, y1, z], [x + w, y0, z], [x - w, y0, z], [(i + 1) / n, 3 + fr], [(i + 1) / n, 3 + fr], [i / n, 3 + fr], [i / n, 3 + fr]); }
    for (let b = 1.2; b < L; b += 1.4) disc(x, top - b, z + 0.02, b > L - 1.5 ? 0.42 : 0.2, b / L, 4 + fr, 12);
  }
  // kind 5: the eyes, hovering just over the sockets
  for (const side of [-1, 1]) {
    const ex = side * 2.3, ey = 1.8, hw = 1.6, hh = 0.9;
    let hz = 0; for (let a = -1; a <= 1; a += 0.1) for (let b = -1; b <= 1; b += 0.1) hz = Math.max(hz, faceH(ex + a * hw, ey + b * hh * (1 - a * a)));
    const z = hz + 0.15, gx = 8, gy = 4;
    for (let i = 0; i < gx; i++) for (let j = 0; j < gy; j++) {
      const a0 = -1 + 2 * i / gx, a1 = a0 + 2 / gx, b0 = -1 + 2 * j / gy, b1 = b0 + 2 / gy;
      const P = (a, b) => [ex + side * a * hw, FY + ey + b * hh, z], U = (a, b) => [a, 5 + (b + 1) / 2 * 0.98];
      if (side > 0) Q(P(a0, b0), P(a1, b0), P(a1, b1), P(a0, b1), U(a0, b0), U(a1, b0), U(a1, b1), U(a0, b1));
      else Q(P(a1, b0), P(a0, b0), P(a0, b1), P(a1, b1), U(a1, b0), U(a0, b0), U(a0, b1), U(a1, b1));
    }
  }
  return { uvs, bounds: { min: [-34, -2, -13], max: [34, 42, 21] } };
}
export function collider() { return null; }
