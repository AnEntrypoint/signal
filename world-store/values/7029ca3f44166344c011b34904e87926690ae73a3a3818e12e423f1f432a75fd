// THE WORLD TURTLE's canvas: one flat quad facing +Z, centred on the origin; all the drawing is in
// vision-world-turtle-mat.js (material params.layer). params: { w, h }
export function geometry(ctx) {
  const w = ctx.params.w ?? 70, h = ctx.params.h ?? 50;
  ctx.quad(-w / 2, -h / 2, 0, w / 2, -h / 2, 0, w / 2, h / 2, 0, -w / 2, h / 2, 0);
  return { bounds: { min: [-w / 2, -h / 2, -0.1], max: [w / 2, h / 2, 0.1] } };
}
export function collider() { return null; }
