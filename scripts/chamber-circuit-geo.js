// branching-circuit: a hexagon whose six corners each grow a Y-branching line glyph along the hex lattice's
// own directions (every fork turns +-60 degrees), a bead on every tip. uv.x = corner 0..5 (6 = the hexagon),
// uv.y = distance grown from the corner 0..1 (+2 on beads). Drawn three times at three depths by the material.
import { beam, polyline, bead } from "./chamber-lib.js";
export function geometry(ctx) {
  const uvs = [], R = 12, L = [2.6, 1.9, 1.4, 1.0], T = L.reduce((a, b) => a + b, 0), hex = [];
  const grow = (p, ang, lv, d0, u) => {
    const q = [p[0] + Math.cos(ang) * L[lv], p[1] + Math.sin(ang) * L[lv], 0], d1 = d0 + L[lv];
    beam(ctx, uvs, p, q, 0.07, u, d0 / T, d1 / T);
    if (lv === 3) { bead(ctx, uvs, q, 0.16, u, 1); return; }
    grow(q, ang + Math.PI / 3, lv + 1, d1, u); grow(q, ang - Math.PI / 3, lv + 1, d1, u);
  };
  for (let k = 0; k < 6; k++) {
    const a = k * Math.PI / 3, p = [Math.cos(a) * R, Math.sin(a) * R, 0];
    hex.push(p); grow(p, a, 0, 0, k);
  }
  polyline(ctx, uvs, hex, 0.07, 6, true);
  ctx.instances({ count: 3, bounds: { min: [-30, -30, -24], max: [30, 30, 0] } });
  return { uvs };
}
export function collider() { return null; }
