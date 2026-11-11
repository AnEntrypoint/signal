// A HORNED SERPENT before it is bent: unit tube along +Y (y 0..1 along, x/z = cos/sin around, radius 1); vision-thunderbird-worm-mat.js bends it. Counts step down by ctx.lod.
export function geometry(ctx) {
  const K = [1, 1, 2 / 3, 0.5, 0.25][Math.min(4, Math.max(1, ctx.lod ?? 1))], SIDES = Math.max(5, Math.round(12 * K)), RINGS = Math.max(12, Math.round(80 * K));
  for (let i = 0; i < RINGS; i++) {
    const y0 = i / RINGS, y1 = (i + 1) / RINGS;
    for (let j = 0; j < SIDES; j++) {
      const a0 = (j / SIDES) * Math.PI * 2, a1 = ((j + 1) / SIDES) * Math.PI * 2;
      const x0 = Math.cos(a0), z0 = Math.sin(a0), x1 = Math.cos(a1), z1 = Math.sin(a1);
      ctx.quad(x0, y0, z0, x0, y1, z0, x1, y1, z1, x1, y0, z1);
    }
  }
  return { bounds: { min: [-140, -100, -50], max: [140, 100, 45] } };
}
export function collider() { return null; }
