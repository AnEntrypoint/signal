// Flat annulus or disc facing +Z, centred on the origin. params: { inner, outer, z, segments }
export function geometry(ctx) {
  const { inner = 5, outer = 15, z = 0, segments = 128 } = ctx.params;
  for (let i = 0; i < segments; i++) {
    const a0 = (i / segments) * Math.PI * 2, a1 = ((i + 1) / segments) * Math.PI * 2;
    const c0 = Math.cos(a0), s0 = Math.sin(a0), c1 = Math.cos(a1), s1 = Math.sin(a1);
    if (inner > 0) ctx.quad(inner * c0, inner * s0, z, outer * c0, outer * s0, z, outer * c1, outer * s1, z, inner * c1, inner * s1, z);
    else ctx.tri(0, 0, z, outer * c0, outer * s0, z, outer * c1, outer * s1, z);
  }
  return { bounds: { min: [-outer, -outer, z - 0.1], max: [outer, outer, z + 0.1] } };
}
export function collider() { return null; }
