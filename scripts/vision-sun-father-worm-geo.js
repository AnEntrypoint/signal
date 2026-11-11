// THE SUN FATHER's flare tongues: a canonical round tube. x, y = the unit circle (the around-angle), z = 0..1 the
// along-length. vision-sun-father-worm-mat.js winds it along its seeded spine in depth and undulates it in the
// vertex stage, and reads the same two numbers back for the skin. params: { sides, rings }
export function geometry(ctx) {
  const S = ctx.params.sides ?? 12, R = ctx.params.rings ?? 72;
  const P = (i, j) => { const a = (j % S) / S * Math.PI * 2; return [Math.cos(a), Math.sin(a), i / R]; };
  for (let i = 0; i < R; i++) for (let j = 0; j < S; j++) {
    const a = P(i, j), b = P(i, j + 1), c = P(i + 1, j + 1), d = P(i + 1, j);
    ctx.quad(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2], d[0], d[1], d[2]);
  }
  return { bounds: { min: [-130, -110, -45], max: [130, 110, 45] } };
}
export function collider() { return null; }
