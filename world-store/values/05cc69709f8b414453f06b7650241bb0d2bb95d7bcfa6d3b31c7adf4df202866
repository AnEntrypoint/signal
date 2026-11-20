// Nine hanging strips from the sun-eye's lower rim (12.2 m out, 13 deg apart, mirrored about x = 0),
// each 2.8 m wide and 34 m long; the material cuts the teardrop out of it. attribute "drip" = 0..8.
export const RIM = 12.2, STEP = 13, LONG = 34, W = 2.8, LEAN = 0.07; // LEAN: the flame-teardrop deal splays them in diagonals
export function geometry(ctx) {
  for (let i = 0; i < 9; i++) {
    const a = (i - 4) * STEP * Math.PI / 180, x = RIM * Math.sin(a), y = -RIM * Math.cos(a), z = 0.4 + Math.abs(i - 4) * 0.02;
    ctx.attribute("drip", i);
    const lean = (i - 4) * LEAN * LONG, x0 = Math.min(x, x + lean) - W / 2, x1 = Math.max(x, x + lean) + W / 2;
    ctx.quad(x0, y - LONG, z, x1, y - LONG, z, x1, y + 0.6, z, x0, y + 0.6, z);
  }
  return { bounds: { min: [-24, -12.2 - LONG, 0], max: [24, -6, 1] } };
}
export function collider() { return null; }
