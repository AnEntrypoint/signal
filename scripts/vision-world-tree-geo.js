// THE WORLD TREE's canvas: one flat quad facing +Z, centred on the origin; all the drawing is in
// vision-world-tree-mat.js (params.layer). params: { w, h }
export function geometry(ctx) {
  const w = ctx.params.w ?? 64, h = ctx.params.h ?? 40;
  ctx.quad(-w / 2, -h / 2, 0, w / 2, -h / 2, 0, w / 2, h / 2, 0, -w / 2, h / 2, 0);
  return { bounds: { min: [-w / 2, -h / 2, -0.1], max: [w / 2, h / 2, 0.1] } };
}
export function collider() { return null; }
