// The tunnel's meshes, one script, params.kind picks the part. Local frame: axis y = 6, z = +150 (mouth) .. -150.
// wall: the tube, wound outward (drawn BackSide). gate: one flat ring frame (50 copies). ribs: one straight
// beaded tube at radius 5.5 (8 copies, bent into helices by the material). core: the far-end disc. dust: one quad.
const TAU = Math.PI * 2, LY = 6;
const BOUNDS = { min: [-6.2, -0.2, -150.5], max: [6.2, 12.2, 150.5] };
function annulus(ctx, r0, r1, z, n) {
  for (let i = 0; i < n; i++) {
    const a0 = (i / n) * TAU, a1 = ((i + 1) / n) * TAU;
    const c0 = Math.cos(a0), s0 = Math.sin(a0), c1 = Math.cos(a1), s1 = Math.sin(a1);
    ctx.quad(c0 * r0, s0 * r0, z, c0 * r1, s0 * r1, z, c1 * r1, s1 * r1, z, c1 * r0, s1 * r0, z);
  }
}
export function geometry(ctx) {
  const kind = ctx.params.kind || "wall";
  if (kind === "wall") {
    const N = 64, M = 30, R = 6;
    for (let j = 0; j < M; j++) {
      const zn = 150 - (j / M) * 300, zf = 150 - ((j + 1) / M) * 300;
      for (let i = 0; i < N; i++) {
        const a0 = (i / N) * TAU, a1 = ((i + 1) / N) * TAU;
        const x0 = Math.cos(a0) * R, y0 = Math.sin(a0) * R + LY, x1 = Math.cos(a1) * R, y1 = Math.sin(a1) * R + LY;
        ctx.quad(x0, y0, zn, x0, y0, zf, x1, y1, zf, x1, y1, zn);
      }
    }
    return { bounds: BOUNDS };
  }
  if (kind === "gate") {
    ctx.instances({ count: 50, bounds: BOUNDS });
    annulus(ctx, 3.8, 5.8, 0, 96);
    return;
  }
  if (kind === "ribs") {
    ctx.instances({ count: 8, bounds: BOUNDS });
    const cx = 5.5, cy = LY, r = 0.25, S = 8, STEP = 1.5;
    for (let j = 0; j < 200; j++) {
      const z0 = 150 - j * STEP, z1 = z0 - STEP;
      for (let i = 0; i < S; i++) {
        const a0 = (i / S) * TAU, a1 = ((i + 1) / S) * TAU;
        const x0 = cx + Math.cos(a0) * r, y0 = cy + Math.sin(a0) * r, x1 = cx + Math.cos(a1) * r, y1 = cy + Math.sin(a1) * r;
        ctx.quad(x0, y0, z0, x1, y1, z0, x1, y1, z1, x0, y0, z1);
      }
      // the bead strung on the tube at this segment's middle
      const bz = z0 - STEP / 2, br = 0.4, U = 10, V = 5;
      for (let v = 0; v < V; v++) {
        const p0 = (v / V) * Math.PI, p1 = ((v + 1) / V) * Math.PI;
        for (let u = 0; u < U; u++) {
          const a0 = (u / U) * TAU, a1 = ((u + 1) / U) * TAU;
          const P = (p, a) => [cx + Math.sin(p) * Math.cos(a) * br, cy + Math.sin(p) * Math.sin(a) * br, bz + Math.cos(p) * br];
          const A = P(p0, a0), B = P(p0, a1), C = P(p1, a1), D = P(p1, a0);
          if (v === 0) ctx.tri(...A, ...C, ...D);
          else if (v === V - 1) ctx.tri(...A, ...B, ...D);
          else ctx.quad(...A, ...B, ...C, ...D);
        }
      }
    }
    return;
  }
  if (kind === "core") {
    const R = 6, N = 64;
    for (let i = 0; i < N; i++) {
      const a0 = (i / N) * TAU, a1 = ((i + 1) / N) * TAU;
      ctx.tri(0, LY, -150, Math.cos(a0) * R, LY + Math.sin(a0) * R, -150, Math.cos(a1) * R, LY + Math.sin(a1) * R, -150);
    }
    return { bounds: BOUNDS };
  }
  // dust: a unit quad in XY, 400 copies placed by the material
  ctx.instances({ count: 400, bounds: BOUNDS });
  ctx.quad(-0.5, -0.5, 0, 0.5, -0.5, 0, 0.5, 0.5, 0, -0.5, 0.5, 0);
}
export function collider() { return null; }
