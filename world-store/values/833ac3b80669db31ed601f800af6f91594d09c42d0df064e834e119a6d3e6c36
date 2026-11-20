// One wireframe icosahedron (30 line edges, radius 3), drawn 6 times: the material places and tumbles each copy.
import { beam } from "./chamber-lib.js";
export function geometry(ctx) {
  const uvs = [], P = (1 + Math.sqrt(5)) / 2, k = 3 / Math.hypot(1, P), V = [];
  for (const a of [-1, 1]) for (const b of [-P, P]) V.push([0, a * k, b * k], [a * k, b * k, 0], [b * k, 0, a * k]);
  for (let i = 0; i < 12; i++) for (let j = i + 1; j < 12; j++) {
    if (Math.abs(Math.hypot(V[i][0] - V[j][0], V[i][1] - V[j][1], V[i][2] - V[j][2]) - 2 * k) < 0.01) beam(ctx, uvs, V[i], V[j], 0.07, 0);
  }
  ctx.instances({ count: 6, bounds: { min: [-30, -22, -30], max: [30, 22, 30] } });
  return { uvs };
}
export function collider() { return null; }
