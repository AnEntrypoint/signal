// THE SUN FATHER's canvases: one flat quad facing +Z per layer, centred on the origin (the row's feet are the
// being's centre). params: { w, h }. All the drawing is vision-sun-father-mat.js (material params.layer).
export function geometry(ctx) {
  const w = ctx.params.w ?? 62, h = ctx.params.h ?? 62;
  ctx.quad(-w / 2, -h / 2, 0, w / 2, -h / 2, 0, w / 2, h / 2, 0, -w / 2, h / 2, 0);
  return { bounds: { min: [-w / 2, -h / 2, -0.1], max: [w / 2, h / 2, 0.1] } };
}
export function collider() { return null; }
