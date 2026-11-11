// Glyph cartouches: one unit card (-1..1 in XY), drawn as 40 mirrored pairs hovering 2-12 m over the field.
// The material sizes each as a pill or a square, pitches it to face up and toward +Z, and paints its glyph.
export function geometry(ctx) {
  ctx.tri(-1, -1, 0, 1, -1, 0, 1, 1, 0);
  ctx.tri(-1, -1, 0, 1, 1, 0, -1, 1, 0);
  ctx.instances({ layout: { card: "float32x4", info: "float32x4" }, bounds: { min: [-95, 0, -95], max: [95, 20, 95] } });
  let k = 0, guard = 0;
  while (k < 40 && guard++ < 2000) {
    const r = 9 + 62 * Math.sqrt(ctx.random()), a = (ctx.random() - 0.5) * 3.0; // right half: x = r cos a > 0
    const x = r * Math.cos(a), z = r * Math.sin(a);
    if (x < 4) continue;                                 // pairs stay apart across the mirror
    if (x < 20 && z < -16 && z > -54) continue;          // clear of the upright eye
    if (x < 12 && z > 28 && z < 52) continue;            // clear of the ground view's lens
    const y = 2 + 10 * ctx.random(), size = 0.8 + 0.9 * ctx.random();
    const shape = ctx.random() < 0.5 ? 0 : 1, glyph = Math.floor(ctx.random() * 3);
    ctx.instance([r, a, y, size], [shape, glyph, 1, k]);
    ctx.instance([r, Math.PI - a, y, size], [shape, glyph, -1, k]);
    k++;
  }
  return { uvs: [0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1] };
}
export function collider() { return null; }
