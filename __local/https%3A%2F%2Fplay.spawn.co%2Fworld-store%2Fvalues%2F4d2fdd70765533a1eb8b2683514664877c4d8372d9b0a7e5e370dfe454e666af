// One unit sphere drawn 108 times; scripts/eye-beads.js places each copy from its number.
export function geometry(ctx) {
  const U = 14, V = 9;
  const P = (u, v) => { const a = (u / U) * Math.PI * 2, b = (v / V) * Math.PI; return [Math.sin(b) * Math.cos(a), Math.cos(b), Math.sin(b) * Math.sin(a)]; };
  ctx.instances({ count: 108, bounds: { min: [-16, -16, 0], max: [16, 16, 3] } });
  ctx.smooth();
  for (let v = 0; v < V; v++) for (let u = 0; u < U; u++) {
    const a = P(u, v), b = P(u + 1, v), c = P(u + 1, v + 1), d = P(u, v + 1);
    if (v > 0) ctx.tri(...a, ...b, ...c);
    if (v < V - 1) ctx.tri(...a, ...c, ...d);
  }
}
export function collider() { return null; }
