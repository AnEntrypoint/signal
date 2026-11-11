// THE LOTUS GATE's canvas: one flat quad facing +Z, centred on the origin; all the drawing is in
// vision-lotus-gate-mat.js (params.layer). params: { w, h }
export function geometry(ctx) {
  const w = ctx.params.w ?? 96, h = ctx.params.h ?? 96;
  ctx.quad(-w / 2, -h / 2, 0, w / 2, -h / 2, 0, w / 2, h / 2, 0, -w / 2, h / 2, 0);
  return { bounds: { min: [-w / 2, -h / 2, -0.1], max: [w / 2, h / 2, 0.1] } };
}
export function collider() { return null; }
