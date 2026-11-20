// The totem between the Eye and the sun-eye: a column of glyph plates at x = 0, z = -62, with two mirrored fans
// of tapered quills. uv = (code + u, v): code 0..8 plates, 20+i right quill i, 40+i left quill i.
export const TOTEM = { z: -62, y0: 31, plates: 9, quills: 11 };
export function geometry(ctx) {
  const uvs = [], normals = [], z = TOTEM.z;
  const quad = (a, b, c, d, code, n = [0, 0, 1]) => {
    ctx.tri(...a.p, ...b.p, ...c.p); ctx.tri(...a.p, ...c.p, ...d.p);
    for (const q of [a, b, c, a, c, d]) { uvs.push(code + q.u * 0.999, q.v); normals.push(...n); }
  };
  for (let i = 0; i < TOTEM.plates; i++) {
    const y = TOTEM.y0 + i * 2.05, w = 2.2 - Math.abs(i - 4) * 0.18, h = 1.75;
    quad({ p: [-w, y, z], u: 0, v: 0 }, { p: [w, y, z], u: 1, v: 0 }, { p: [w, y + h, z], u: 1, v: 1 }, { p: [-w, y + h, z], u: 0, v: 1 }, i);
  }
  const SEG = ctx.lod >= 3 ? 4 : 10;
  for (let i = 0; i < TOTEM.quills; i++) {
    const a = ((8 + i * 7.5) * Math.PI) / 180, L = 13 - Math.abs(i - 5) * 0.5, y0 = TOTEM.y0 + 1 + i * 1.5;
    for (const side of [1, -1]) {
      const dir = [Math.cos(a) * side, Math.sin(a)], nrm = [-dir[1], dir[0]];
      const pt = (t, e) => { const wd = (1.1 * (1 - t) + 0.12 * t) * Math.sin(Math.min(t * 6, 1) * 1.57); return { p: [side * 1.6 + dir[0] * L * t + nrm[0] * wd * e, y0 + dir[1] * L * t + nrm[1] * wd * e, z - 0.3], u: (e + 1) / 2, v: t }; };
      for (let k = 0; k < SEG; k++) {
        const t0 = k / SEG, t1 = (k + 1) / SEG;
        const A = pt(t0, -1), B = pt(t0, 1), C = pt(t1, 1), D = pt(t1, -1);
        if (side > 0) quad(A, B, C, D, 20 + i); else quad(A, D, C, B, 40 + i);
      }
    }
  }
  return { uvs, normals };
}
export function collider() { return null; }
