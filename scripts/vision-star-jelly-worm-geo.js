// THE STAR MEDUSA's GREAT TENTACLES before they are bent: a straight unit tube along +Y (y = 0 root .. 1 tip,
// radius 1, 12 sides, 80 rings). vision-star-jelly-worm-mat.js bends it along its spine IN DEPTH and corkscrews it
// in the vertex stage, reading along-length (y) and around-angle (atan2(z, x)) off these positions.
export function geometry(ctx) {
  const far = (ctx.lod ?? 1) >= 4, SIDES = far ? 6 : 12, RINGS = far ? 16 : 80;
  for (let i = 0; i < RINGS; i++) {
    const y0 = i / RINGS, y1 = (i + 1) / RINGS;
    for (let j = 0; j < SIDES; j++) {
      const a0 = (j / SIDES) * Math.PI * 2, a1 = ((j + 1) / SIDES) * Math.PI * 2;
      const x0 = Math.cos(a0), z0 = Math.sin(a0), x1 = Math.cos(a1), z1 = Math.sin(a1);
      ctx.quad(x0, y0, z0, x0, y1, z0, x1, y1, z1, x1, y0, z1);
    }
  }
  return { bounds: { min: [-130, -95, -60], max: [130, 95, 40] } };
}
export function collider() { return null; }
