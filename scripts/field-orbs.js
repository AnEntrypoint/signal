// One orb, drawn ~40 times: a unit sphere; the material puts each on its ring over the field.
export function geometry(ctx) {
  const far = ctx.lod >= 3, LON = far ? 10 : 20, LAT = far ? 6 : 12, normals = [];
  const P = (lo, la) => { const th = (lo / LON) * 6.2831853, ph = (la / LAT) * Math.PI, s = Math.sin(ph); return [Math.cos(th) * s, Math.cos(ph), Math.sin(th) * s]; };
  const tri = (a, b, c) => { ctx.tri(...a, ...b, ...c); normals.push(...a, ...b, ...c); };
  for (let lo = 0; lo < LON; lo++) for (let la = 0; la < LAT; la++) {
    const a = P(lo, la), b = P(lo + 1, la), c = P(lo + 1, la + 1), d = P(lo, la + 1);
    if (la > 0) tri(a, b, c);
    if (la < LAT - 1) tri(a, c, d);
  }
  ctx.instances({ layout: { orb: "float32x4", turn: "float32x2" }, bounds: { min: [-75, 0, -75], max: [75, 14, 75] } });
  // three counter-turning rings: [radius, count, turns per phrase]
  const rings = [[21, 10, 0.25], [42, 14, -0.125], [62, 16, 0.0833333]];
  let seed = 0;
  for (const [rad, n, rate] of rings) for (let k = 0; k < n; k++, seed++) {
    const size = 0.8 + 1.4 * ctx.random(), height = 3 + 6 * ctx.random();
    ctx.instance([rad + (ctx.random() - 0.5) * 5, ((k + ctx.random() * 0.4) / n) * 6.2831853, size, height + size], [rate, seed]);
  }
  return { normals };
}
export function collider() { return null; }
