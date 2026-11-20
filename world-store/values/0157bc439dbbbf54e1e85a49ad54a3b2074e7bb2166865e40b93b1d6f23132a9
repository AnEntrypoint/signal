// The idol: 9 nested hexagon frames stepping toward the camera (+Z), each a double line with a row of beads
// between, a hex-spiral glyph at the centre, trapezoid lanterns above and below.
// uv.x = part id (0..8 frames, 9 glyph, 10 lanterns), uv.y = arc length along the stroke 0..1 (+2 on a bead).
import { beam, polyline, bead } from "./chamber-lib.js";
export function geometry(ctx) {
  const uvs = [];
  // D6: frame i is 3^(-1/4) of the next and turned 15 degrees, so every second frame is the 1/sqrt(3), 30-degree
  // hexagon cut by the hexagram of the one two outside it.
  const hex = (r, z, t = 0) => Array.from({ length: 6 }, (_, i) => [r * Math.cos((i * Math.PI) / 3 + Math.PI / 6 + t), r * Math.sin((i * Math.PI) / 3 + Math.PI / 6 + t), z]);
  for (let i = 0; i < 9; i++) {
    const r = 11 * Math.pow(3, (i - 8) / 4), z = i * 0.6, t = ((8 - i) * Math.PI) / 12, g = Math.min(0.38, r * 0.16), o = hex(r, z, t), n = hex(r - g, z, t), mid = hex(r - g / 2, z, t);
    polyline(ctx, uvs, o, 0.09, i, true);
    polyline(ctx, uvs, n, 0.05, i, true);
    const per = i + 2, bs = Math.min(0.1, r * 0.035);
    for (let j = 0; j < 6; j++) {
      const a = mid[j], b = mid[(j + 1) % 6];
      for (let q = 0; q < per; q++) { const t = (q + 0.5) / per; bead(ctx, uvs, [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, z], bs, i, (j + t) / 6); }
    }
  }
  // the six mirror axes of D6: twelve rays at 30 degrees, thin, behind the frames
  for (let k = 0; k < 12; k++) { const a = (k * Math.PI) / 6, cx = Math.cos(a), sy = Math.sin(a); beam(ctx, uvs, [cx * 1.0, sy * 1.0, -0.6], [cx * 11.4, sy * 11.4, -0.6], 0.03, 10, 0, 1); }
  const sp = [];
  for (let i = 0; i <= 20; i++) { const r = 0.12 + i * 0.042, a = (i * Math.PI) / 3; sp.push([r * Math.cos(a), r * Math.sin(a), -0.4]); }
  polyline(ctx, uvs, sp, 0.05, 9);
  for (const s of [1, -1]) {
    const z = 4.8, T = (y0, y1, w0, w1) => [[-w0, s * y0, z], [w0, s * y0, z], [w1, s * y1, z], [-w1, s * y1, z]];
    polyline(ctx, uvs, T(12.4, 14.4, 3.2, 2.0), 0.08, 10, true);
    polyline(ctx, uvs, T(12.75, 14.05, 2.55, 1.75), 0.05, 10, true);
    polyline(ctx, uvs, T(14.7, 15.4, 1.5, 0.9), 0.07, 10, true);
    beam(ctx, uvs, [-2.15, s * 13.4, z], [2.15, s * 13.4, z], 0.05, 10, 0, 1);
    for (let q = 0; q < 7; q++) bead(ctx, uvs, [-1.8 + q * 0.6, s * 13.72, z], 0.1, 10, q / 7);
  }
  return { uvs, bounds: { min: [-13, -17, -16], max: [13, 17, 20] } };
}
export function collider() { return null; }
