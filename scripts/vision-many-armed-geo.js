// THE MANY-ARMED ONE's canvas: one flat quad facing +Z, centred on the origin; all the drawing is in
// vision-many-armed-mat.js (its params.layer). params: { w, h }
export function geometry(ctx) {
  const w = ctx.params.w ?? 120, h = ctx.params.h ?? 84;
  ctx.quad(-w / 2, -h / 2, 0, w / 2, -h / 2, 0, w / 2, h / 2, 0, -w / 2, h / 2, 0);
  return { bounds: { min: [-w / 2, -h / 2, -0.1], max: [w / 2, h / 2, 0.1] } };
}
export function collider() { return null; }
