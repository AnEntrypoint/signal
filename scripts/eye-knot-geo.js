// knot-flower: two sixfold looping curves (spirograph sums of e^{int} whose frequencies differ by 6), each drawn twice
// (the material turns the copies opposite ways so they weave), as neon ribbons with a black border, rising and
// sinking in depth along their length so the crossings go over and under. Vertex colour is a code:
// r = position along the curve 0..1, g = family (0/1), b = copy*0.5 + border*0.25.
const FAMS = [[[1, 1], [-5, 0.5], [13, 0.35]], [[1, 1], [7, 0.5]]];
export function geometry(ctx) {
  const N = 720, R = 4.0;
  FAMS.forEach((f, fi) => {
    const s = R / f.reduce((a, [, w]) => a + w, 0);
    const P = (t) => { let x = 0, y = 0; for (const [n, w] of f) { x += w * Math.cos(n * t); y += w * Math.sin(n * t); } return [x * s, y * s]; };
    for (let cp = 0; cp < 2; cp++) for (let b = 0; b < 2; b++) {
      const hw = b ? 0.17 : 0.075;
      const Z = (t) => -1.0 + cp * 0.22 + 0.13 * Math.sin(6 * t + cp * Math.PI) - (b ? 0.03 : 0);
      const edge = (i) => {
        const t = (i / N) * Math.PI * 2, e = 1e-3, p = P(t), q = P(t + e), r = P(t - e);
        let tx = q[0] - r[0], ty = q[1] - r[1]; const l = Math.hypot(tx, ty) || 1; tx /= l; ty /= l;
        return [[p[0] - ty * hw, p[1] + tx * hw, Z(t)], [p[0] + ty * hw, p[1] - tx * hw, Z(t)]];
      };
      let prev = edge(0);
      for (let i = 1; i <= N; i++) {
        const cur = edge(i);
        ctx.color(Math.min(1, i / N), fi, cp * 0.5 + b * 0.25);
        ctx.quad(...prev[0], ...prev[1], ...cur[1], ...cur[0]);
        prev = cur;
      }
    }
  });
  return { bounds: { min: [-4.6, -4.6, -1.5], max: [4.6, 4.6, -0.5] } };
}
export function collider() { return null; }
