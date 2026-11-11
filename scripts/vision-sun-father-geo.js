// THE SUN FATHER's canvases: one flat quad facing +Z per layer, centred on the being's middle (Y0 above the feet).
// params: { w, h, z } - the far ring (z -14), the being (z 0), the near veil (z +12). All pattern is the material's.
export const Y0 = 20;
export function geometry(ctx) {
  const w = ctx.params.w ?? 36, h = ctx.params.h ?? 36, z = ctx.params.z ?? 0;
  ctx.quad(-w / 2, Y0 - h / 2, z, w / 2, Y0 - h / 2, z, w / 2, Y0 + h / 2, z, -w / 2, Y0 + h / 2, z);
  return { bounds: { min: [-w / 2, Y0 - h / 2, z - 0.5], max: [w / 2, Y0 + h / 2, z + 0.5] } };
}
export function collider() { return null; }
