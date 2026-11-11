// The idol: 9 nested hexagon frames stepping toward the camera (+Z), each a double line with a row of beads
// between, a hex-spiral glyph at the centre, trapezoid lanterns above and below.
// uv.x = part id (0..8 frames, 9 glyph, 10 lanterns), uv.y = arc length along the stroke 0..1 (+2 on a bead).
import { beam, polyline, bead } from "./chamber-lib.js";
export function geometry(ctx) {
  const uvs = [];
  const hex = (r, z) => Array.from({ length: 6 }, (_, i) => [r * Math.cos((i * Math.PI) / 3 + Math.PI / 6), r * Math.sin((i * Math.PI) / 3 + Math.PI / 6), z]);
  for (let i = 0; i < 9; i++) {
    const r = 1.2 + (i * 9.8) / 8, z = i * 0.6, o = hex(r, z), n = hex(r - 0.38, z), mid = hex(r - 0.19, z);
    polyline(ctx, uvs, o, 0.09, i, true);
    polyline(ctx, uvs, n, 0.05, i, true);
    const per = i + 2;
    for (let j = 0; j < 6; j++) {
      const a = mid[j], b = mid[(j + 1) % 6];
      for (let q = 0; q < per; q++) { const t = (q + 0.5) / per; bead(ctx, uvs, [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, z], 0.1, i, (j + t) / 6); }
    }
  }
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
