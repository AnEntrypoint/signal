// THE COMPANION WORMS before they swim: a straight unit tube along +Y (y = 0 head .. 1 tail, radius 1).
// companion-worm-mat.js lays it along the head's own past path in the camera's space, so the body follows
// where the head has been: it really turns, dives and swims instead of waving in place.
export function geometry(ctx) {
  const far = (ctx.lod ?? 1) >= 4, SIDES = far ? 6 : 10, RINGS = far ? 24 : 72;
  for (let i = 0; i < RINGS; i++) {
    const y0 = i / RINGS, y1 = (i + 1) / RINGS;
    for (let j = 0; j < SIDES; j++) {
      const a0 = (j / SIDES) * Math.PI * 2, a1 = ((j + 1) / SIDES) * Math.PI * 2;
      ctx.quad(Math.cos(a0), y0, Math.sin(a0), Math.cos(a0), y1, Math.sin(a0), Math.cos(a1), y1, Math.sin(a1), Math.cos(a1), y0, Math.sin(a1));
    }
  }
  return { bounds: { min: [-90, -60, -150], max: [90, 60, 5] } };
}
export function collider() { return null; }
