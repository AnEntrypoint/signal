// THE STAR CHARIOT (merkaba): two interpenetrating tetrahedra of neon line-art in fake 3D (vertices rotated and projected here),
// one turning each way, hidden lines truly hidden behind their black faces; a seated light-body at the core.
// Layers (params.layer): world z-30 hex-packed starfield + streak meridians bending to a pole (rolls) / ring z-12 two counter-turning
// bead wheels / being z0 the two solids (breathe) / veil z+10 black tetra facets swinging across / fore z+22 small tumbling tetra outlines.
// Pacing: one vertex star alone u0-.12, first solid edge by edge .12-.38, stars come out from the pole .32-.62, second solid from the
// opposite pole .38-.6, wheels bead by bead .42-.68, core .5-.6, meridians .5-.72, faces turn solid .56-.7, facets / tumblers .62-.8;
// LIFO exit .8-1 (tumblers, facets, faces, core, wheels, second solid, first solid, star, then the sky closes on its pole).
import { MeshBasicNodeMaterial, AdditiveBlending, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep as ss, step, mix, atan2 as atan2raw, fwidth } from "builtin/tsl";
import { tripClock, visionShown, visionU, climb, maskDraw, maskBeads, maskIris, maskClock, inv, is, sgn, segH, strokeAA, ioU, NEON } from "./lib/trip.js";

const TAU = 6.28318;
const atan2 = (y, x) => atan2raw(y, x.add(1e-5));
const hash = (k, o = 0) => k.mul(12.9898 + o).add(o * 3.1).sin().mul(43758.5453).fract();
// a tetrahedron's four projected vertices: apex on the axis (flip = which pole), base turning by th, tilted by ti about x
const tetra = (th, flip, R, ti, cx = 0, cy = 0) => {
  const ct = ti.cos(), sn = ti.sin();
  const pr = (x, y, z) => { const y2 = y.mul(ct).sub(z.mul(sn)), z2 = y.mul(sn).add(z.mul(ct)), s = z2.mul(0.22 / R).add(1); return { p: vec2(x.mul(s).add(cx), y2.mul(s).add(cy)), z: z2 }; };
  const out = [pr(float(0), float(flip).mul(R), float(0))];
  for (let i = 0; i < 3; i++) { const a = th.add(i * 2.0944); out.push(pr(a.cos().mul(0.943 * R), float(flip).mul(-R / 3), a.sin().mul(0.943 * R))); }
  return out;
};
// a projected face at q: mn 0 on its rim .. 1 at its centroid (< 0 outside), z its depth there, ar twice its area
const tri = (q, a, b, c) => {
  const cr = (u, v) => v.p.x.sub(u.p.x).mul(q.y.sub(u.p.y)).sub(v.p.y.sub(u.p.y).mul(q.x.sub(u.p.x)));
  const e0 = cr(a, b), e1 = cr(b, c), e2 = cr(c, a), sg = e0.add(e1).add(e2), s = step(0, sg).mul(2).sub(1), ar = sg.abs().max(1e-3);
  const w0 = e1.mul(s), w1 = e2.mul(s), w2 = e0.mul(s);
  return { mn: w0.min(w1).min(w2).div(ar).mul(3), z: w0.mul(a.z).add(w1.mul(b.z)).add(w2.mul(c.z)).div(ar), ar };
};
const EDGE = [[0, 1, 0, 0], [0, 2, 1, 2], [0, 3, 2, 4], [1, 2, 3, 1], [2, 3, 4, 3], [3, 1, 5, 5]];   // a, b, order apex-first, order interleaved
const FACE = [[0, 1, 2], [0, 2, 3], [0, 3, 1], [1, 2, 3]];

export function material(ctx) {
  const layer = ctx.params.layer ?? "being", low = ctx.quality === "low";
  const c = tripClock(ctx), u = visionU(ctx, c), live = visionShown(ctx, c, 0), io = ioU(u);
  const rn = (n) => c.rnd(1120 + n), pk = (n, k) => c.pick(1120 + n, k), sense = (n) => sgn(rn(n));
  const { BLU, VIO, PNK, ORA, YEL, GRN, W, BG } = NEON;
  const fam = pk(0, 3), hot = pk(1, 4);
  const A = BLU.mul(is(fam, 0)).add(VIO.mul(is(fam, 1))).add(vec3(0.01, 0.5, 0.6).mul(is(fam, 2)));
  const B = VIO.mul(is(fam, 0)).add(BLU.mul(inv(is(fam, 0))));
  const hotC = (k) => [PNK, ORA, YEL, GRN].reduce((a, v, i) => a.add(v.mul(is(k, i))), vec3(0));
  const H = hotC(hot), H2 = hotC(hot.add(pk(2, 3)).add(1).mod(4));
  const P = positionGeometry.xy, T = c.real;
  const kOn = step(0.001, c.kick), cl = climb(c);
  const cul = io(0.7, 0.8, 0.86, 0.92).mul(cl.mul(0.4).add(0.6));
  const swp = step(0.5, c.beat.floor().mod(2)).mul(kOn);          // the kick's colour step: the two solids trade colours
  const on = (p) => step(0.004, p);
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  const cutout = (col, cover) => { m.colorNode = col; m.opacityNode = cover.mul(live).clamp(0, 1); m.alphaTest = 0.5; return m; };
  let col = vec3(0), cover = float(0);
  const lay = (b, lit) => { col = mix(col, lit, b); cover = cover.max(b); };

  // ------------------------------------------------------------------ WORLD: the sky opens on its pole, stars come out, meridians streak in
  if (layer === "world") {
    const aa = fwidth(P.x).mul(1.2).max(0.02), st = strokeAA(aa);
    const uEnd = inv(float(0.4).div(ctx.param("vw1", -1).sub(ctx.param("vw0", -1)).max(1))).min(0.999);
    const q0 = P.sub(vec2(0, pk(8, 3).sub(1).mul(46))), r = q0.length();
    const ro = T.mul(TAU / 140).mul(sense(9)), cs = ro.cos(), si = ro.sin();
    const q = vec2(q0.x.mul(cs).sub(q0.y.mul(si)), q0.x.mul(si).add(q0.y.mul(cs)));
    lay(maskIris(io(0.62, 0.86, 2, 3).mul(inv(ss(uEnd.sub(0.03), uEnd, u))), r.div(210)), BG);
    const kl = inv(ss(0, 7, r.sub(c.beat.fract().mul(130)).abs())).mul(kOn);
    // hex-packed stars, each a ring with a pupil; they come out from the pole outward
    const g = 6.4, gy = g * 0.866, row = q.y.div(gy).floor(), qx = q.x.div(g).add(row.mul(0.5));
    const hd = hash(qx.floor().add(row.mul(57)), 9);
    const l = vec2(qx.fract().sub(0.5).mul(g), q.y.div(gy).fract().sub(0.5).mul(gy)).length();
    const rad = r.div(120).clamp(0, 1).mul(1.2).add(0.55).add(cl.mul(0.5)).mul(hd.mul(0.5).add(0.75));
    const pC = io(0.3, 0.72, 2, 3).mul(inv(ss(uEnd.sub(0.07), uEnd.sub(0.03), u)));
    // each star arrives on its own patch of night, so the old scene goes star by star, not in one iris sweep
    const arrive = maskBeads(pC, r.div(190).clamp(0, 1).mul(0.45).add(hd.mul(0.55))).mul(on(pC));
    lay(st(l.sub(rad.mul(1.7)), 0).mul(arrive), BG);
    const dot = st(l.sub(rad), 0).mul(maskBeads(pC, r.div(190).clamp(0, 1).mul(0.45).add(hd.mul(0.55)))).mul(on(pC));
    const hollow = step(0.45, hd);
    const shape = mix(float(1), inv(st(l.sub(rad.mul(0.62)), 0)).add(st(l.sub(rad.mul(0.28)), 0)), hollow);
    lay(dot, mix(mix(A, B, step(0.5, hd.mul(7).fract())), H2, step(0.9, hd)).mul(shape).mul(kl.mul(1.2).add(1)));
    // meridians: light streaks running down long curves that bend into the pole
    const N = pk(10, 3).mul(4).add(8);
    const am = atan2(q.x, q.y).add(r.mul(0.011).mul(sense(11)));
    const k = am.div(TAU).mul(N).add(0.5).floor(), da = am.sub(k.mul(TAU).div(N)).mul(r).abs();
    const hk = hash(k.add(N.mul(8)).mod(N), 4);
    const pM = io(0.5, 0.72, 0.88, 0.93).mul(1.5).sub(hk.mul(0.5)).clamp(0, 1);
    const f = r.div(40).add(T.mul(0.2)).add(hk).fract(), duty = cl.mul(0.25).add(0.45);
    const mer = st(da, 0.32).mul(maskDraw(pM, r.div(170))).mul(on(pM)).mul(step(f, duty));
    lay(mer, mix(mix(B, W, 0.5), H, step(0.7, hk)).mul(inv(f.div(duty)).mul(1.3).add(0.25)));
    return cutout(col.mul(cul.mul(0.35).add(0.5)), cover);
  }

  // ------------------------------------------------------------------ RING: two bead wheels turning against each other
  if (layer === "ring") {
    const aa = fwidth(P.x).mul(1.2).max(0.01), st = strokeAA(aa);
    const r = P.length(), a0 = atan2(P.x, P.y), sn = sense(4), sw = cl.mul(0.22).add(1);
    const kl = inv(ss(0, 3, r.sub(c.beat.fract().mul(36)).abs())).mul(kOn);
    const wheel = (R, N, dir, p, per, br, c0, c1) => {
      const a = a0.add(T.mul(TAU / per).mul(dir)), k = a.div(TAU).mul(N).add(0.5).floor();
      const bd = vec2(a.sub(k.mul(TAU).div(N)).mul(r), r.sub(R)).length();
      return { bd, br: sw.mul(br), mk: maskBeads(p, k.div(N).mul(dir).add(0.5).fract()).mul(on(p)), cc: mix(c0, c1, step(0.5, k.add(96).mod(3))) };
    };
    const w1 = wheel(21.5, pk(5, 3).mul(6).add(18), sn, io(0.42, 0.56, 0.88, 0.92), 60, 0.95, H, mix(H, W, 0.6));
    const w2 = wheel(27, pk(6, 3).mul(6).add(30), sn.negate(), io(0.54, 0.68, 0.86, 0.9), 44, 0.8, mix(B, W, 0.3), H2);
    // one wheel filled, one hollow; on a kick run they trade
    const disc = (w) => st(w.bd, w.br), hoop = (w) => st(w.bd.sub(w.br.mul(0.8)).abs(), w.br.mul(0.22)).add(st(w.bd, w.br.mul(0.25)));
    const b1 = mix(disc(w1), hoop(w1), swp).mul(w1.mk), b2 = mix(hoop(w2), disc(w2), swp).mul(w2.mk);
    const line = st(r.sub(24.3).abs(), 0.07).mul(maskClock(io(0.5, 0.62, 0.9, 0.93), a0.mul(sn)));
    const lit = cul.mul(0.6).add(0.7);
    m.colorNode = w1.cc.mul(b1).add(w2.cc.mul(b2)).mul(lit.add(kl)).add(mix(A, W, 0.3).mul(line).mul(lit));
    m.opacityNode = live;
    m.transparent = true;
    m.blending = AdditiveBlending;
    m.depthWrite = false;
    return m;
  }

  // ------------------------------------------------------------------ VEIL: black facets of two great tetrahedra swinging across
  if (layer === "veil") {
    const pin = io(0.62, 0.78, 0.82, 0.86), sv = sense(7);
    const hol = step(c.bar.fract(), 0.25).mul(kOn);                // first beat of a kick bar: the facets go hollow, uncovering
    [[-1, 0], [1, 1]].forEach(([sd, j]) => {
      const cx = T.mul(0.06 + j * 0.017).add(rn(8).mul(TAU)).add(j * 2.4).sin().mul(22).add(sd * 34);
      const cy = T.mul(0.05).add(j * 1.7).sin().mul(13);
      const V = tetra(T.mul(0.21 * sd).mul(sv).add(j * 1.3), sd, 25, T.mul(0.09).add(j).sin().mul(0.3).add(0.5), cx, cy);
      FACE.slice(0, low ? 1 : 2).forEach((fc, i) => {
        const tr = tri(P, V[fc[0]], V[fc[1]], V[fc[2]]);
        const pj = pin.mul(1.9).sub((j * 2 + i) * 0.3).clamp(0, 1);
        const inside = step(inv(pj), tr.mn).mul(step(4, tr.ar)).mul(on(pj));   // the facet grows out of its own centroid
        const fw = fwidth(tr.mn).min(0.2);
        const rim = inv(ss(float(0.03), fw.add(0.03), tr.mn));
        const x = tr.mn.mul(3).sub(T.mul(0.12)), ln = inv(ss(float(0.06), fw.mul(3).add(0.06), x.fract().sub(0.5).abs()));
        lay(inside.mul(mix(float(1), rim, hol)), BG.add(mix(B, W, 0.3).mul(rim).mul(0.9)).add((i ? H : H2).mul(ln).mul(inv(rim)).mul(cul.mul(0.25).add(0.1))));
      });
    });
    return cutout(col, cover);
  }

  // ------------------------------------------------------------------ FORE: small tetra outlines tumbling past
  if (layer === "fore") {
    const aa = fwidth(P.x).mul(1.2).max(0.01), st = strokeAA(aa);
    const pin = io(0.66, 0.8, 0.8, 0.84), dir = sense(13);
    for (let j = 0; j < (low ? 3 : 5); j++) {
      const R = 2.6 + (j % 3) * 0.9;
      const xj = T.mul(0.02 * (1 + j * 0.23)).mul(dir).add(j * 0.37).fract().mul(180).sub(90);
      const yj = T.mul(0.4).add(j * 1.9).sin().mul(5).add(((j * 31.7) % 60) - 30);
      const V = tetra(T.mul(1.1 + j * 0.3).add(j), j % 2 ? 1 : -1, R, T.mul(0.7 + j * 0.2).add(j * 2), xj, yj);
      const pj = pin.mul(1.8).sub(j * 0.18).clamp(0, 1);
      const cj = [mix(H, H2, swp), mix(H2, H, swp), mix(B, W, 0.6)][j % 3];
      EDGE.forEach(([a, b]) => {
        const sg = segH(P, V[a].p, V[b].p);
        lay(st(sg.d, 0.14).mul(maskDraw(pj, sg.h)).mul(on(pj)), mix(cj, W, st(sg.d, 0.03).mul(0.6)));
      });
    }
    return cutout(col, cover);
  }

  // ------------------------------------------------------------------ THE BEING (breathes, swells with the highs)
  const p = P.div(T.mul(TAU / 9).sin().mul(0.02).add(1).mul(cl.mul(0.07).add(0.93)));
  const aa = fwidth(p.x).mul(1.2).max(0.008), st = strokeAA(aa);
  const sn = sense(3), fl = sense(5), ord = pk(6, 2);
  const ti = T.mul(0.11).sin().mul(0.12).add(0.42).mul(sense(7)), th = T.mul(0.3).mul(sn);
  const VA = tetra(th, fl, 13.5, ti), VB = tetra(th.negate().add(1.0472), fl.negate(), 13.5, ti);
  const CA = mix(H, mix(A, W, 0.25), swp), CB = mix(mix(A, W, 0.25), H, swp);
  const gate = (a, b, x, y) => ss(a, b, u).add(cl.mul(0.04).mul(on(u.sub(a)))).min(1).mul(inv(ss(x, y, u))).mul(6);
  let zb = float(-1e3);
  const put = (b, z, lit) => { const t = b.mul(step(zb, z)); col = mix(col, lit, t); cover = cover.max(t); zb = mix(zb, z, t); };
  const kf = c.beat.floor().mod(8);
  [[VA, gate(0.14, 0.38, 0.9, 0.945), CA], [VB, gate(0.38, 0.6, 0.87, 0.915), CB]].forEach(([V, g, C], t) => {
    // edges: each draws itself from its first vertex behind a bright nib; the same clock runs back to undraw them
    EDGE.forEach(([a, b, o0, o1]) => {
      const pS = g.sub(ord.mul(o1 - o0).add(o0)).clamp(0, 1);
      const sg = segH(p, V[a].p, V[b].p);
      const tip = inv(ss(0, 0.06, sg.h.sub(pS).abs())).mul(step(pS, 0.99));
      const body = st(sg.d, tip.mul(0.45).add(0.24)).mul(maskDraw(pS, sg.h)).mul(on(pS));
      put(body, mix(V[a].z, V[b].z, sg.h).add(0.9), mix(C, W, st(sg.d, 0.06).mul(0.7).add(tip).min(1)).mul(cul.mul(0.3).add(0.9)));
    });
    // faces: each crystallises black from its centroid, hiding whatever is behind it; the kick fills one with light
    FACE.forEach((fc, i) => {
      const fi = t * 4 + i;
      const pF = io(0.56, 0.7, 0.84, 0.88).mul(2.2).sub(rn(12).add(fi * 0.375).fract().mul(1.2)).clamp(0, 1);
      const tr = tri(p, V[fc[0]], V[fc[1]], V[fc[2]]);
      const inside = step(inv(pF), tr.mn).mul(step(1, tr.ar)).mul(on(pF));
      const x = tr.mn.mul(3).sub(T.mul(0.15));
      const ln = low ? float(0) : inv(ss(float(0.07), fwidth(tr.mn).mul(3).min(0.3).add(0.07), x.fract().sub(0.5).abs())).mul(cul.mul(0.3).add(0.12));
      put(inside, tr.z, BG.add(C.mul(ln.add(is(kf, fi).mul(c.kick).mul(kOn)))));
    });
  });
  // vertex stars: the seed at the first solid's pole, its twin at the opposite pole when the second begins
  [[VA, io(0, 0.05, 0.94, 0.955), CB], [VB, io(0.34, 0.38, 0.86, 0.875), CA]].forEach(([V, pS, C], t) => {
    const q = p.sub(V[0].p), sm = q.x.abs().max(1e-5).sqrt().add(q.y.abs().max(1e-5).sqrt());
    const rS = pS.mul(T.mul(2.3).add(t).sin().mul(0.12).add(1)).mul(1.75);
    lay(st(sm.sub(rS), 0).mul(on(pS)), mix(W, C, ss(0.5, 1.6, q.length())));
  });
  // the seated light-body at the core: a head over a lotus triangle in a rayed halo; it shines through the faces
  const pK = io(0.5, 0.6, 0.86, 0.89), ax = p.x.abs(), rl = p.length();
  const bodyD = ax.mul(0.77).add(p.y.sub(0.8).mul(0.64)).max(p.y.add(1.5).negate());
  const seat = mix(st(bodyD, 0), st(bodyD.abs(), 0.12), swp).max(st(p.sub(vec2(0, 1.75)).length(), 0.62));
  const ak = atan2(p.x, p.y).div(TAU).mul(12).add(0.5), ray = st(ak.fract().sub(0.5).abs().mul(rl).mul(TAU / 12), 0.07)
    .mul(step(4.1, rl)).mul(step(rl, cl.mul(2.4).add(4.9)));
  const halo = st(rl.sub(3.5).abs(), 0.09);
  const core = seat.max(halo).max(ray).mul(maskIris(pK, rl.div(7.4))).mul(on(pK));
  lay(st(rl, 3.5).mul(on(pK)).mul(maskIris(pK, rl.div(7.4))), BG);
  lay(core, mix(H2, W, st(rl, 2.9)));
  return cutout(col, cover);
}
