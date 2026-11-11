// THE MANY-ARMED ONE: a seated line-art figure, 8 arms fanned in mirrored pairs, a symbol in every hand.
// One script, three layers (params.layer): "being" (z 0), "ring" (the far mandorla behind), "veil" (near bokeh strands).
// Every face carries attribute "el" = what it is (see the material) and uvs: x along its stroke / its order in a row,
// y across a line (-1..1) or out of a bead (0 centre, 1 rim). The shader does all light, masks and motion.
export const SHOULDER = [3, 3.6];
export const ARMS = [ // per pair, bottom-up: angle from horizontal (deg), length, elbow bend
  [-38, 16, 0.2], [-8, 19, 0.16], [22, 18, 0.16], [56, 14, 0.18],
];
const TAU = Math.PI * 2;

function line(ctx, uvs, pts, w, closed = false) {
  const n = pts.length, L = [0];
  for (let i = 1; i < n; i++) L.push(L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  const T = L[n - 1] || 1;
  const nor = pts.map((p, i) => {
    const a = pts[Math.max(0, i - 1)], b = pts[Math.min(n - 1, i + 1)];
    let dx = b[0] - a[0], dy = b[1] - a[1];
    if (closed && (i === 0 || i === n - 1)) { const q = pts[n - 2], r = pts[1]; dx = r[0] - q[0]; dy = r[1] - q[1]; }
    const l = Math.hypot(dx, dy) || 1; return [-dy / l, dx / l];
  });
  const ww = typeof w === "function" ? w : () => w;
  for (let i = 0; i < n - 1; i++) {
    const p = pts[i], q = pts[i + 1], a = nor[i], b = nor[i + 1], w0 = ww(L[i] / T), w1 = ww(L[i + 1] / T), z = p[2] || 0, z1 = q[2] || 0;
    ctx.quad(p[0] - a[0] * w0, p[1] - a[1] * w0, z, q[0] - b[0] * w1, q[1] - b[1] * w1, z1, q[0] + b[0] * w1, q[1] + b[1] * w1, z1, p[0] + a[0] * w0, p[1] + a[1] * w0, z);
    uvs.push(L[i] / T, -1, L[i + 1] / T, -1, L[i + 1] / T, 1, L[i] / T, 1);
  }
}
function bead(ctx, uvs, x, y, r, k, z = 0, seg = 10) {
  for (let i = 0; i < seg; i++) {
    const a0 = (i / seg) * TAU, a1 = ((i + 1) / seg) * TAU;
    ctx.tri(x, y, z, x + Math.cos(a0) * r, y + Math.sin(a0) * r, z, x + Math.cos(a1) * r, y + Math.sin(a1) * r, z);
    uvs.push(k, 0, k, 1, k, 1);
  }
}
const arc = (cx, cy, r, a0, a1, n = 32, sx = 1, sy = 1) => Array.from({ length: n + 1 }, (_, i) => { const a = a0 + (a1 - a0) * i / n; return [cx + Math.cos(a) * r * sx, cy + Math.sin(a) * r * sy]; });
const bez = (p, c, q, n = 28) => Array.from({ length: n + 1 }, (_, i) => { const t = i / n, s = 1 - t; return [s * s * p[0] + 2 * s * t * c[0] + t * t * q[0], s * s * p[1] + 2 * s * t * c[1] + t * t * q[1]]; });
const D = Math.PI / 180;

// the eight symbols, unit radius, as strokes [pts] and dots [x, y, r]
function glyph(s) {
  if (s === 0) { // eye
    const up = arc(0, -0.75, 1.25, 143 * D, 37 * D, 24), lo = arc(0, 0.75, 1.25, -143 * D, -37 * D, 24);
    return { strokes: [up, lo, arc(0, 0, 0.36, 0, TAU, 24)], dots: [[0, 0, 0.16]] };
  }
  if (s === 1) { // flame
    const f = (k, sc, y0) => Array.from({ length: 41 }, (_, i) => { const t = (i / 40) * TAU; return [Math.sin(t) * Math.sin(t / 2) * 0.62 * sc, Math.cos(t) * 0.9 * sc + y0]; });
    return { strokes: [f(0, 1, 0.05), f(0, 0.5, -0.32)], dots: [] };
  }
  if (s === 2) // spiral
    return { strokes: [Array.from({ length: 61 }, (_, i) => { const t = i / 60, a = t * 2.6 * TAU; return [Math.cos(a) * 0.95 * t, Math.sin(a) * 0.95 * t]; })], dots: [] };
  if (s === 3) { // crescent moon: outer r .9 over ±125°, inner circle through its tips and (0.45, 0)
    const ex = 0.9 * Math.cos(125 * D), ey = 0.9 * Math.sin(125 * D), cx = (ex * ex + ey * ey - 0.45 * 0.45) / (2 * (ex - 0.45)), r = 0.45 - cx, ai = Math.atan2(ey, ex - cx);
    return { strokes: [arc(0, 0, 0.9, -125 * D, 125 * D, 32), arc(cx, 0, r, -ai, ai, 28)], dots: [[-0.55, 0.0, 0.1]] };
  }
  if (s === 4) // five-point star
    return { strokes: [Array.from({ length: 11 }, (_, i) => { const a = Math.PI / 2 + (i * Math.PI) / 5, r = i % 2 ? 0.4 : 0.98; return [Math.cos(a) * r, Math.sin(a) * r]; })], dots: [[0, 0, 0.12]] };
  if (s === 5) { // seed: a vesica with its line and three dots
    const R = 1.0, cx = 0.62;
    const a = Math.acos(cx / R);
    return { strokes: [arc(cx, 0, R, Math.PI - a, Math.PI + a, 24), arc(-cx, 0, R, -a, a, 24), [[0, -0.6], [0, 0.6]]].map((p) => p.map(([x, y]) => [x * 0.9, y * 1.05])), dots: [[0.2, 0.25, 0.08], [0.2, -0.05, 0.08], [0.2, -0.35, 0.08]] };
  }
  if (s === 6) // trefoil knot
    return { strokes: [Array.from({ length: 73 }, (_, i) => { const t = (i / 72) * TAU; return [(Math.sin(t) + 2 * Math.sin(2 * t)) / 3.1, (Math.cos(t) - 2 * Math.cos(2 * t)) / 3.1 + 0.05]; })], dots: [] };
  // open hand (hamsa): four fingers, a thumb each side, an eye in the palm
  const top = Array.from({ length: 49 }, (_, i) => { const t = i / 48; return [-0.5 + t, 0.15 + 0.75 * Math.pow(Math.abs(Math.sin(4 * Math.PI * t)), 0.7) * (1 - 0.35 * Math.abs(t - 0.5) * 2)]; });
  const body = [...top, [0.5, 0.15], [0.62, -0.1], [0.82, 0.08], [0.55, -0.55], ...arc(0, -0.55, 0.55, 0, -Math.PI, 14).slice(1), [-0.82, 0.08], [-0.62, -0.1], [-0.5, 0.15]];
  return { strokes: [body, arc(0, -0.3, 0.2, 0, TAU, 16)], dots: [[0, -0.3, 0.08]] };
}

function being(ctx, uvs) {
  const lo = ctx.lod >= 3;
  const W = 0.13; // line half-width
  let i = 0;
  const body = (pts, w = W, closed = false) => { ctx.attribute("el", 100 + i++); line(ctx, uvs, pts, w, closed); };
  // head, the third eye, the neck
  body(arc(0, 7.6, 2.1, -Math.PI / 2, 1.5 * Math.PI, 40), W, true);
  body([...arc(0, 6.2, 0.95, 150 * D, 30 * D, 12).map(([x, y]) => [x, y + 1.8])].reverse());
  body(arc(0, 9.0, 0.95, -150 * D, -30 * D, 12).map(([x, y]) => [x, y - 1.55]));
  // torso: shoulders to waist to hips, mirrored
  for (const s of [1, -1]) body(bez([0.9 * s, 5.5], [3.6 * s, 4.6], [2.0 * s, 1.2]).concat(bez([2.0 * s, 1.2], [1.3 * s, -1.4], [3.2 * s, -4.0]).slice(1)));
  // crossed legs: the lotus lens, the feet
  body(bez([-9, -5.6], [0, -1.8], [9, -5.6], 36));
  body(bez([-9, -5.6], [0, -10.6], [9, -5.6], 36));
  for (const s of [1, -1]) body(arc(3.4 * s, -5.0, 1.1, 0, TAU, 20).map(([x, y]) => [x, (y + 5) * 0.6 - 5]), W * 0.8, true);
  // the lotus under: petals as arcs
  if (!lo) for (let k = -3; k <= 3; k++) body(arc(k * 2.6, -10.2, 1.5, 15 * D, 165 * D, 14).map(([x, y]) => [x, (y + 10.2) * 1.4 - 10.2]), W * 0.8);
  // chakra beads down the spine, bottom-up
  for (let k = 0; k < 7; k++) { ctx.attribute("el", 200 + k); bead(ctx, uvs, 0, -4.4 + k * 1.55, 0.34, k / 6, 0.02, lo ? 8 : 14); }
  // the halo round the head: a line and a bead row
  ctx.attribute("el", 701); line(ctx, uvs, arc(0, 7.6, 3.7, -60 * D, 240 * D, 48), 0.07);
  ctx.attribute("el", 700);
  for (let k = 0; k <= 20; k++) { const a = -60 * D + (300 * D * k) / 20; bead(ctx, uvs, Math.cos(a) * 4.5, 7.6 + Math.sin(a) * 4.5, 0.22, Math.abs(k - 10) / 10, 0, 8); }
  // the arms: hands 0-3 on the right, bottom-up; 4-7 their mirrors
  for (let h = 0; h < 8; h++) {
    const s = h < 4 ? 1 : -1, [ang, len, bend] = ARMS[h % 4];
    const a = ang * D, P = [SHOULDER[0] * s, SHOULDER[1]], Q = [P[0] + Math.cos(a) * len * s, P[1] + Math.sin(a) * len];
    const C = [(P[0] + Q[0]) / 2 + Math.sin(a) * len * bend * s, (P[1] + Q[1]) / 2 - Math.cos(a) * len * bend];
    const spine = bez(P, C, Q, lo ? 12 : 30);
    // the arm as two edges (tapering), beads between them
    const off = (d) => spine.map((p, j) => { const q = spine[Math.min(spine.length - 1, j + 1)], o = spine[Math.max(0, j - 1)], dx = q[0] - o[0], dy = q[1] - o[1], l = Math.hypot(dx, dy) || 1, t = j / (spine.length - 1), w = d * (1 - 0.45 * t); return [p[0] - dy / l * w, p[1] + dx / l * w]; });
    ctx.attribute("el", 300 + h);
    line(ctx, uvs, off(0.85), 0.1); line(ctx, uvs, off(-0.85), 0.1);
    ctx.attribute("el", 400 + h);
    const nb = 11;
    for (let k = 0; k < nb; k++) { const t = (k + 0.5) / nb, j = t * (spine.length - 1), p = spine[Math.floor(j)], q = spine[Math.min(spine.length - 1, Math.floor(j) + 1)], f = j - Math.floor(j); bead(ctx, uvs, p[0] + (q[0] - p[0]) * f, p[1] + (q[1] - p[1]) * f, 0.3 * (1 - 0.35 * t), t, 0.01, lo ? 6 : 10); }
    // the symbol's frame: a bead ring round the hand, lit from the bottom both ways
    const R = 2.5, H = [Q[0] + Math.cos(a) * 2.2 * s, Q[1] + Math.sin(a) * 2.2];
    ctx.attribute("el", 600 + h);
    const nr = 18;
    for (let k = 0; k < nr; k++) { const t = (k / nr) * TAU - Math.PI / 2; bead(ctx, uvs, H[0] + Math.cos(t) * R, H[1] + Math.sin(t) * R, 0.17, Math.min(k, nr - k) / (nr / 2), 0, 8); }
    // every symbol at every hand: the shader shows the one this roll deals
    if (lo) continue;
    for (let g = 0; g < 8; g++) {
      const G = glyph(g), sc = 1.75;
      ctx.attribute("el", 500 + h * 8 + g);
      for (const st of G.strokes) line(ctx, uvs, st.map(([x, y]) => [H[0] + x * sc * s, H[1] + y * sc, 0.02]), 0.09);
      ctx.attribute("el", 800 + h * 8 + g);
      for (const [x, y, r] of G.dots) bead(ctx, uvs, H[0] + x * sc * s, H[1] + y * sc, r * sc, 0.5, 0.02, 10);
    }
  }
  ctx.attribute("el", null);
}

function ring(ctx, uvs) {
  ctx.attribute("el", 900);
  const r0 = 13, r1 = 22, n = ctx.lod >= 3 ? 64 : 160;
  for (let i = 0; i < n; i++) {
    const a0 = (i / n) * TAU, a1 = ((i + 1) / n) * TAU, c0 = Math.cos(a0), s0 = Math.sin(a0), c1 = Math.cos(a1), s1 = Math.sin(a1);
    ctx.quad(r0 * c0, r0 * s0, 0, r1 * c0, r1 * s0, 0, r1 * c1, r1 * s1, 0, r0 * c1, r0 * s1, 0);
    uvs.push(0, 0, 1, 0, 1, 0, 0, 0);
  }
  ctx.attribute("el", null);
}

function veil(ctx, uvs) {
  // mirrored hanging strands framing the being, near the eye: soft hollow bokeh beads
  const X = [11, 13.5, 16, 18.5, 21, 23.5], Lh = [9, 14, 7, 12, 16, 10];
  for (let j = 0; j < 12; j++) {
    const s = j < 6 ? 1 : -1, x = X[j % 6] * s, top = 19, bot = top - Lh[j % 6];
    ctx.attribute("el", 1000 + j); line(ctx, uvs, [[x, top], [x, bot]], 0.04);
    ctx.attribute("el", 1100 + j);
    const nb = Math.round(Lh[j % 6] / 1.6);
    for (let k = 0; k <= nb; k++) bead(ctx, uvs, x, top - (Lh[j % 6] * k) / nb, k === nb ? 0.75 : 0.42, k / nb, 0, 14);
  }
  ctx.attribute("el", null);
}

export function geometry(ctx) {
  const uvs = [], layer = ctx.params.layer || "being";
  if (layer === "ring") ring(ctx, uvs); else if (layer === "veil") veil(ctx, uvs); else being(ctx, uvs);
  const R = layer === "ring" ? 22 : 30;
  return { uvs, bounds: { min: [-R, -22, -1], max: [R, 22, 1] } };
}
export function collider() { return null; }
