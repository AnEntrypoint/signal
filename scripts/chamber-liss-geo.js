// lissajous-hands: a ribbon of 720 quads whose vertices only carry (t along the curve, side); the material
// bends it into the Lissajous figure, so the ratio can change with the roll. uv = (t 0..1, side -1/+1).
export function geometry(ctx) {
  const uvs = [], N = 720;
  for (let k = 0; k < N; k++) {
    const a = k / N, b = (k + 1) / N;
    ctx.tri(a, -1, 0, b, -1, 0, b, 1, 0); uvs.push(a, -1, b, -1, b, 1);
    ctx.tri(a, -1, 0, b, 1, 0, a, 1, 0); uvs.push(a, -1, b, 1, a, 1);
  }
  return { uvs, bounds: { min: [-12, -8, -8], max: [12, 8, -4] } };
}
export function collider() { return null; }
