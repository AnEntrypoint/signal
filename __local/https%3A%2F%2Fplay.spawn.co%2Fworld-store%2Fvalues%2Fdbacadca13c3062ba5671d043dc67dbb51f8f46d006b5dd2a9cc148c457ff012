// One flat quad facing +Z (both sides drawn): the canvas the sun-eye's disc and halo shaders paint and cut.
export function geometry(ctx) {
  const w = ctx.params.w ?? 30, h = ctx.params.h ?? 30, z = ctx.params.z ?? 0, y = ctx.params.y ?? 0;
  ctx.quad(-w / 2, y - h / 2, z, w / 2, y - h / 2, z, w / 2, y + h / 2, z, -w / 2, y + h / 2, z);
  return { bounds: { min: [-w / 2, y - h / 2, z - 0.5], max: [w / 2, y + h / 2, z + 0.5] } };
}
export function collider() { return null; }
