// Two giant open hands, exact mirrors, reaching in from the side walls toward the idol, palms to the camera.
// Hand frame: origin the wrist, +Y along the fingers, +X the thumb side, +Z out of the palm. Each finger is
// 3 tapered segments with knuckle bulges and a round tip, slightly curled at rest; the palm a rounded slab
// with a thumb mound; a long forearm runs out through the wall.
// uv.x = id * 4 + t (id 0 thumb, 1..4 index..pinky, 5 palm, 6 forearm; t 0..3 along it, a joint at each whole
// number), uv.y = 0..1 around it (0.25 = the palm side).
const D = Math.PI / 180;
export function geometry(ctx) {
  const uvs = [], tilt = 12 * D;
  const W = [19.2, -1.2], Y = [-Math.cos(tilt), Math.sin(tilt)], X = [Math.sin(tilt), Math.cos(tilt)];
  const toW = (h, s) => [s * (W[0] + h[0] * X[0] + h[1] * Y[0]), W[1] + h[0] * X[1] + h[1] * Y[1], h[2]];
  ctx.smooth();
  const tri = (a, b, c) => {
    ctx.tri(...toW(a.p, 1), ...toW(b.p, 1), ...toW(c.p, 1)); uvs.push(a.u, a.v, b.u, b.v, c.u, c.v);
    ctx.tri(...toW(a.p, -1), ...toW(c.p, -1), ...toW(b.p, -1)); uvs.push(a.u, a.v, c.u, c.v, b.u, b.v);
  };
  const skin = (rings) => {
    for (let i = 0; i < rings.length - 1; i++) for (let j = 0; j < rings[i].length - 1; j++) {
      const a = rings[i][j], b = rings[i][j + 1], c = rings[i + 1][j + 1], d = rings[i + 1][j];
      tri(a, d, c); tri(a, c, b);
    }
  };
  function finger(id, bx, by, angDeg, len, r0, r1, curls) {
    const a = angDeg * D, ax = [Math.cos(a), -Math.sin(a), 0], d0 = [Math.sin(a), Math.cos(a), 0];
    const fr = [0.45, 0.31, 0.24], sides = 10, rings = [];
    const frameAt = (th) => ({ dir: [d0[0] * Math.cos(th), d0[1] * Math.cos(th), Math.sin(th)], n: [-d0[0] * Math.sin(th), -d0[1] * Math.sin(th), Math.cos(th)] });
    const rad = (t) => (r0 + ((r1 - r0) * t) / 3) * (1 + (t < 2.6 ? 0.16 * Math.exp(-(((t - Math.round(t)) / 0.14) ** 2)) : 0));
    const ring = (cen, f, r, t) => {
      const out = [];
      for (let j = 0; j <= sides; j++) {
        const ph = (j / sides) * Math.PI * 2, cx = Math.cos(ph) * r, cn = Math.sin(ph) * r * 0.85;
        out.push({ p: [cen[0] + ax[0] * cx + f.n[0] * cn, cen[1] + ax[1] * cx + f.n[1] * cn, cen[2] + f.n[2] * cn], u: id * 4 + t, v: j / sides });
      }
      rings.push(out);
    };
    let pos = [bx, by, 0], th = 0, f = frameAt(0);
    for (let s = 0; s < 3; s++) {
      const prev = th; th += curls[s] * D;
      const L = len * fr[s]; f = frameAt(th);
      ring(pos, s === 0 ? f : frameAt((prev + th) / 2), rad(s), s);
      for (const q of [0.2, 0.4, 0.6, 0.8]) ring([pos[0] + f.dir[0] * L * q, pos[1] + f.dir[1] * L * q, pos[2] + f.dir[2] * L * q], f, rad(s + q), s + q);
      pos = [pos[0] + f.dir[0] * L, pos[1] + f.dir[1] * L, pos[2] + f.dir[2] * L];
    }
    const rt = rad(3);
    ring(pos, f, rt, 3);
    for (const b of [30, 60, 86]) { const k = rt * Math.sin(b * D); ring([pos[0] + f.dir[0] * k, pos[1] + f.dir[1] * k, pos[2] + f.dir[2] * k], f, rt * Math.cos(b * D), 3 + (b / 90) * 0.3); }
    skin(rings);
  }
  finger(0, 2.25, 1.2, 50, 4.1, 0.7, 0.5, [8, 10, 8]);
  finger(1, 1.75, 4.9, 9, 5.0, 0.56, 0.42, [8, 12, 10]);
  finger(2, 0.6, 5.05, 1, 5.6, 0.57, 0.42, [6, 10, 10]);
  finger(3, -0.55, 4.9, -7, 5.15, 0.55, 0.4, [8, 12, 10]);
  finger(4, -1.65, 4.5, -17, 4.0, 0.48, 0.35, [10, 14, 10]);
  // palm
  const sp = (x, e) => Math.sign(x) * Math.abs(x) ** e, sm = (x) => { x = Math.min(Math.max(x, 0), 1); return x * x * (3 - 2 * x); };
  {
    const rings = [], sides = 20, ys = [[-0.3, 1], [0, 1], [0.6, 1], [1.4, 1], [2.4, 1], [3.4, 1], [4.3, 1], [4.9, 0.97], [5.3, 0.85], [5.5, 0.55], [5.56, 0.04]];
    for (const [y, k] of ys) {
      const w = (1.7 + 0.9 * sm(y / 4.3)) * k, out = [];
      for (let j = 0; j <= sides; j++) {
        const ph = (j / sides) * Math.PI * 2;
        let cx = sp(Math.cos(ph), 0.6) * w;
        if (cx > 0) cx *= 1 + 0.2 * Math.exp(-(((y - 1.5) / 1.2) ** 2));
        const cz = sp(Math.sin(ph), 0.7) * 0.62 * k * (1 + (cx > 0 ? 0.25 * Math.exp(-(((y - 1.5) / 1.3) ** 2)) : 0));
        out.push({ p: [cx, y + 0.07 * cx * (y / 5), cz], u: 20 + (Math.max(y, 0) / 5.56) * 3, v: j / sides });
      }
      rings.push(out);
    }
    skin(rings);
  }
  // forearm
  {
    const rings = [], sides = 16;
    for (let i = 0; i <= 8; i++) {
      const q = i / 8, y = 0.2 - q * 14.2, w = 1.7 + 0.7 * sm(q * 1.5), th = 0.62 + 1.1 * sm(q * 2), ex = 0.6 + 0.4 * sm(q * 2), out = [];
      for (let j = 0; j <= sides; j++) { const ph = (j / sides) * Math.PI * 2; out.push({ p: [sp(Math.cos(ph), ex) * w, y, sp(Math.sin(ph), ex) * th], u: 24 + q * 3, v: j / sides }); }
      rings.push(out);
    }
    skin(rings);
  }
  return { uvs, bounds: { min: [-62, -12, -4], max: [62, 12, 5] } };
}
export function collider() { return null; }
