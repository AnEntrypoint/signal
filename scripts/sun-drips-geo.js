// Nine hanging strips from the sun-eye's lower rim (12.2 m out, 13 deg apart, mirrored about x = 0),
// each 2.8 m wide and 34 m long; the material cuts the teardrop out of it. attribute "drip" = 0..8.
export const RIM = 12.2, STEP = 13, LONG = 34, W = 2.8;
export function geometry(ctx) {
  for (let i = 0; i < 9; i++) {
    const a = (i - 4) * STEP * Math.PI / 180, x = RIM * Math.sin(a), y = -RIM * Math.cos(a), z = 0.4 + Math.abs(i - 4) * 0.02;
    ctx.attribute("drip", i);
    ctx.quad(x - W / 2, y - LONG, z, x + W / 2, y - LONG, z, x + W / 2, y + 0.6, z, x - W / 2, y + 0.6, z);
  }
  return { bounds: { min: [-12, -12.2 - LONG, 0], max: [12, -6, 1] } };
}
export function collider() { return null; }
