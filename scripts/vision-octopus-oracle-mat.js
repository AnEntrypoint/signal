// THE OCTOPUS ORACLE: a mirrored octopus of neon line-art, one concentric eye in its striped dome, eight arms curling in pairs.
// Layers (params.layer): world z-30 kelp ribbons + plankton rows + rippled seabed (scrolls) / ring z-12 two bubble helices (counter-turn) /
// being z0 eye, mantle, arms, suckers (breathes) / veil z+10 black ink clouds (bloom and drift) / fore z+22 fish glyphs + bubbles (drift).
// Pacing: lid line alone u0-.04, eye opens -.13, mantle rings out from the eye -.26, arm pairs uncurl .27-.55 (seeded order), suckers
// bead by bead after each, seabed+kelp .38-.58, bubble wheel .5, plankton, ink .6, fish .68; LIFO exit .8-1, the sea last.
import { MeshBasicNodeMaterial, AdditiveBlending, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep as ss, step, mix, atan2 as atan2raw, fwidth } from "builtin/tsl";
import { tripClock, visionShown, visionU, climb, maskDraw, maskBeads, maskIris, maskLid, maskClock, inv, is, sgn, segH, capsule, strokeAA, ioU, NEON } from "./lib/trip.js";

const TAU = 6.28318;
const atan2 = (y, x) => atan2raw(y, x.add(1e-5));
const hash = (k, o = 0) => k.mul(12.9898 + o).add(o * 3.1).sin().mul(43758.5453).fract();
const smk = (a, b, k) => { const h = b.sub(a).div(k.mul(2)).add(0.5).clamp(0, 1); return mix(b, a, h).sub(h.mul(inv(h)).mul(k)); };
const band = (x) => { const e = fwidth(x).mul(0.7).min(0.25); return ss(float(0.25).sub(e), e.add(0.25), x.fract().sub(0.5).abs()); };
// one arm (right half; x mirrored): a clothoid that curls tighter toward its tip. Two curls per arm; the seed mixes them.
const NS = 12;
const ARM = [[1.6, -4, -100, 26], [3.6, -3.2, -66, 34], [5.6, -2.2, -34, 36], [7.4, -0.6, 0, 31]];
const armPts = (i, tot) => {
  const [bx, by, h0, L] = ARM[i]; let h = h0 * Math.PI / 180, x = bx, y = by, W = 0, LS = 0;
  const w = [], ls = [];
  for (let j = 0; j < NS; j++) { w.push(Math.pow(j + 1, 1.7)); W += w[j]; ls.push(1.5 - j / (NS - 1)); LS += ls[j]; }
  const pts = [[x, y]], len = [];
  for (let j = 0; j < NS; j++) { h += tot * w[j] / W; const l = ls[j] / LS * L; x += Math.cos(h) * l; y += Math.sin(h) * l; pts.push([x, y]); len.push(l); }
  return { pts, len, L };
};
const ARMS = [0, 1, 2, 3].map((i) => ({ a: armPts(i, 3.6), b: armPts(i, 6.4) }));

export function material(ctx) {
  const layer = ctx.params.layer ?? "being", low = ctx.quality === "low";
  const c = tripClock(ctx), u = visionU(ctx, c), live = visionShown(ctx, c, 0), io = ioU(u);
  const rn = (n) => c.rnd(1180 + n), pk = (n, k) => c.pick(1180 + n, k), sense = (n) => sgn(rn(n));
  const { BLU, VIO, PNK, ORA, YEL, GRN, W, BG } = NEON;
  const fam = pk(0, 3), hot = pk(1, 4);
    const TEAL = vec3(0.005, 0.55, 0.75);
  const A = BLU.mul(is(fam, 0)).add(VIO.mul(is(fam, 1))).add(TEAL.mul(is(fam, 2)));
  const B = VIO.mul(is(fam, 0)).add(mix(PNK, VIO, 0.55).mul(is(fam, 1))).add(BLU.mul(is(fam, 2)));
  const hotC = (k) => [PNK, ORA, YEL, GRN].reduce((a, v, i) => a.add(v.mul(is(k, i))), vec3(0));
  const H = hotC(hot), H2 = hotC(hot.add(pk(2, 3)).add(1).mod(4));
  const P = positionGeometry.xy, T = c.real;
  const kOn = step(0.001, c.kick), cl = climb(c), kk = c.kick.mul(kOn);
  const cul = io(0.7, 0.8, 0.86, 0.92).mul(cl.mul(0.4).add(0.6));
  const on = (p) => step(0.004, p);
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  const cutout = (col, cover) => { m.colorNode = col; m.opacityNode = cover.mul(live).clamp(0, 1); m.alphaTest = 0.5; return m; };
  let col = vec3(0), cover = float(0);
  const lay = (b, lit) => { col = mix(col, lit, b); cover = cover.max(b); };

  // ------------------------------------------------------------------ WORLD: the deep (kelp sways and scrolls one way, plankton rises)
  if (layer === "world") {
    const aa = fwidth(P.x).mul(1.2).max(0.02), st = strokeAA(aa);
    const uEnd = inv(float(0.4).div(ctx.param("vw1", -1).sub(ctx.param("vw0", -1)).max(1))).min(0.999).max(0.965);
    const gone = ss(float(0.95), uEnd, u);
    const pK = ss(0.4, 0.58, u).add(cl.mul(0.08).mul(on(u.sub(0.4)))).min(1).mul(inv(gone.mul(1.7).clamp(0, 1)));
    const pF = ss(0.38, 0.46, u).mul(inv(gone.mul(1.6).sub(0.6).clamp(0, 1)));
    const pP = io(0.56, 0.68, 0.86, 0.89);
    const floorY = P.x.mul(0.045).add(rn(3).mul(TAU)).sin().mul(3).add(P.x.mul(0.13).sin().mul(1.2)).sub(31);
    // plankton: dotted rows drifting up, lit outward from the oracle like bioluminescence spreading
    const g = 5, Y = P.y.sub(T.mul(0.6)), row = Y.div(g).floor();
    const qx = P.x.add(T.mul(0.4).mul(row.mul(1.7).sin())).div(g).add(row.mul(0.5));
    const id = qx.floor().add(row.mul(57)), hd = hash(id, 5);
    const l = vec2(qx.fract().sub(0.5), Y.div(g).fract().sub(0.5)).length().mul(g);
    const rad = row.mul(1.3).add(qx.floor().mul(0.7)).sin().mul(0.25).add(0.6).mul(0.6);
    const plk = st(l.sub(rad), 0).mul(step(0.45, hash(row, 2))).mul(maskBeads(pP, P.length().div(150).add(hd.mul(0.08)))).mul(on(pP));
    lay(plk, mix(H2, W, step(0.8, hd)).mul(0.8).add(W.mul(st(l, rad.mul(0.3))).mul(0.5)));
    // kelp: three depths of op-art ribbons growing from the seabed, chevrons climbing, a light running up on each kick
    const front = c.beat.fract().mul(100).sub(35), kl = inv(ss(0, 5, P.y.sub(front).abs())).mul(kOn);
    [[13, 1.3, 0.6, 0.4], [21, 2.3, 1.2, 0.62], [33, 3.6, 2.2, 0.9]].slice(low ? 1 : 0).forEach(([sp, w, v, br], j) => {
      const X = P.x.add(T.mul(v).mul(sense(4))).add(j * 4.1), k = X.div(sp).floor(), hk = hash(k, j + 1);
      const top = hk.mul(45).add(25), hf = P.y.sub(floorY).div(top);
      const sway = P.y.mul(0.05).add(T.mul(0.45 + j * 0.1)).add(hk.mul(6.3)).sin().mul(2 + j).mul(hf.clamp(0, 1));
      const lx = X.div(sp).fract().sub(0.5).add(hk.sub(0.5).mul(0.35)).mul(sp).sub(sway).abs();
      const wk = P.y.mul(0.25).add(hk.mul(9)).sin().mul(0.3).add(0.7).mul(w).mul(inv(hf.clamp(0, 1).mul(0.6)));
      const pT = pK.mul(1.5).sub(hk.mul(0.5)).clamp(0, 1);
      const body = st(lx.sub(wk), 0).mul(maskDraw(pT, hf)).mul(step(0, hf)).mul(on(pT));
      const bands = band(P.y.sub(lx.mul(0.9)).div(w * 1.4).sub(T.mul(0.1 * (j + 1))));
      lay(body, mix(A, B, step(0.5, hk)).mul(bands).mul(kl.mul(0.9).add(br)).add(mix(B, W, 0.4).mul(st(lx.sub(wk).abs(), w * 0.1)).mul(br)));
    });
    // the seabed: drawn outward from under the oracle, ripple bands following its line
    const under = P.y.sub(floorY), bed = step(under, 0).mul(maskDraw(pF, P.x.abs().div(160))).mul(on(pF));
    lay(bed, mix(A, B, 0.5).mul(band(under.mul(0.45).add(P.x.mul(0.2).sin().mul(0.4)))).mul(0.6).add(W.mul(st(under.abs(), 0.15)).mul(0.7)));
    return cutout(col.mul(cul.mul(0.3).add(0.45)), cover);
  }

  // ------------------------------------------------------------------ RING: a wheel of bubbles, two helices turning against each other
  if (layer === "ring") {
    const aa = fwidth(P.x).mul(1.2).max(0.01), st = strokeAA(aa);
    const r = P.length(), a = atan2(P.x, P.y), lr = r.max(1).log(), sn = sense(5);
    const pR = io(0.5, 0.62, 0.87, 0.91);
    let lit = vec3(0);
    [[14, 0.6, 1], [11, -0.8, -1]].slice(0, low ? 1 : 2).forEach(([N, tw, sd], j) => {
      const v = lr.mul(N / TAU).sub(T.mul(0.22)).add(j * 0.5);                       // outward: the bubbles rise along the helix
      const w = a.div(TAU).mul(N).add(lr.mul(N / TAU * tw)).add(T.mul(0.05 * N).mul(sn.mul(sd))).add(j * 0.5);
      const cs = r.mul(TAU / N);
      const d = vec2(w.fract().sub(0.5), v.fract().sub(0.5)).length().mul(cs);
      const rb = cs.mul(0.3).mul(ss(9, 14, r)).mul(inv(ss(30, 37, r)));
      const order = w.floor().div(N).fract();
      const show = maskBeads(pR.mul(1.15).sub(j * 0.15).clamp(0, 1), order).mul(on(pR)).mul(step(0.05, rb));
      // kick: hollow and filled swap between the helices
      const fill = j ? inv(step(0.35, kk)) : step(0.35, kk);
      const ring = st(d.sub(rb).abs(), 0.09).add(st(vec2(w.fract().sub(0.36), v.fract().sub(0.62)).length().mul(cs), rb.mul(0.18))).add(st(d, rb).mul(fill).mul(0.6));
      lit = lit.add((j ? mix(H2, W, 0.25) : mix(B, W, 0.3)).mul(ring.min(1)).mul(show));
    });
    const hoop = st(r.sub(8.2).abs(), 0.08).add(st(r.sub(38).abs(), 0.1)).mul(maskClock(pR, a.mul(sn)));
    m.colorNode = lit.add(A.mul(hoop)).mul(cul.mul(0.6).add(0.6));
    m.opacityNode = live;
    m.transparent = true;
    m.blending = AdditiveBlending;
    m.depthWrite = false;
    return m;
  }

  // ------------------------------------------------------------------ VEIL: black ink blooming out and drifting across the arms
  if (layer === "veil") {
    const aa = fwidth(P.x).mul(1.2).max(0.01), st = strokeAA(aa);
    [[-30, -9, 150, 15], [10, 6, 110, 11], [-6, -19, 170, 13]].slice(0, low ? 2 : 3).forEach(([x0, y0, vx, R], j) => {
      const sd = sense(6 + j);
      const bl = io(0.6 + j * 0.05, 0.7 + j * 0.05, 0.86 - j * 0.012, 0.875 - j * 0.012);
      const ctr = vec2(u.sub(0.6).mul(vx).add(x0).mul(sd), T.mul(0.13 + j * 0.04).add(j).sin().mul(3).add(y0));
      const Rn = bl.mul(R).mul(cl.mul(0.15).add(0.9)).sub(kk.mul(1.6)).max(0.01);   // the ink flinches back on the kick: what it hid shows
      let d = P.sub(ctr).length().sub(Rn.mul(0.6));
      for (let i = 0; i < 5; i++) {
        const ph = T.mul(0.25 + i * 0.05).add(i * 1.26 + j);
        const o = vec2(ph.cos().mul(0.6), ph.mul(1.3).sin().mul(0.42)).mul(Rn);
        d = smk(d, P.sub(ctr).sub(o).length().sub(Rn.mul(0.42 + 0.08 * (i % 3))), Rn.mul(0.25).add(0.01));
      }
      const ink = st(d, 0).mul(on(bl));
      lay(ink, BG.add(mix(B, BG, 0.6).mul(st(d.abs(), 0.12))).add(A.mul(0.12).mul(st(d.add(Rn.mul(0.18)).abs(), 0.08))));
    });
    return cutout(col, cover);
  }

  // ------------------------------------------------------------------ FORE: fish glyphs crossing, bubbles rising near the lens
  if (layer === "fore") {
    const aa = fwidth(P.x).mul(1.2).max(0.01), st = strokeAA(aa);
    const pin = io(0.68, 0.8, 0.8, 0.84);
    for (let j = 0; j < (low ? 3 : 5); j++) {
      const sd = j % 2 ? sense(9) : sense(9).negate(), sz = 1 + (j % 3) * 0.35;
      const fx = T.mul(0.022 * (1 + j * 0.2)).add(j * 0.37 + 0.1).fract().mul(180).sub(90).mul(sd);
      const fy = T.mul(0.4).add(j * 2).sin().mul(2).add(((j * 13.7) % 26) - 13);
      const q = P.sub(vec2(fx, fy)).div(sz), qx = q.x.mul(sd);                       // qx > 0 toward the nose
      const ell = vec2(qx.div(3), q.y.div(1.25)).length().sub(1).mul(1.25);
      const tail = capsule(vec2(qx.add(3.6), q.y.abs()), [0.6, 0], [-0.7, 1.2], 0.15).min(vec2(qx.add(3.6), 0).length().sub(0.01).max(qx.add(2.6).negate()).max(q.y.abs().sub(qx.add(4.4).negate().max(0).add(0.6))));
      const fd = ell.min(tail);
      const pj = pin.mul(1.6).sub(j * 0.12).clamp(0, 1);
      const inside = st(fd, 0).mul(maskDraw(pj, inv(qx.add(4.5).div(7.6).clamp(0, 1)))).mul(on(pj));
      const rim = st(fd.abs(), 0.09).add(st(vec2(qx.sub(1.7), q.y.sub(0.3)).length(), 0.25)).add(band(qx.mul(1.1)).mul(st(ell, 0)).mul(0.35));
      lay(inside, BG.add(mix([H, H2, B][j % 3], W, 0.2).mul(rim.min(1)).mul(cul.mul(0.3).add(0.8))));
    }
    for (let j = 0; j < (low ? 3 : 6); j++) {
      const by = T.mul(0.03 * (1 + j * 0.15)).add(j * 0.29).fract().mul(100).sub(50);
      const bx = T.mul(0.6).add(j * 1.7).sin().mul(1.5).add(((j * 19.3) % 50) - 25);
      const br = 0.7 + (j % 3) * 0.45, d = P.sub(vec2(bx, by)).length();
      const pj = pin.mul(1.8).sub(j * 0.1).clamp(0, 1);
      const bub = st(d, br).mul(maskIris(pj, d.div(br))).mul(on(pj));
      const hl = st(P.sub(vec2(bx.add(br * 0.35), by.add(br * 0.4))).length(), br * 0.18);
      lay(bub, BG.add(mix(A, W, 0.45).mul(st(d.sub(br).abs(), 0.08).add(hl))));
    }
    return cutout(col, cover);
  }

  // ------------------------------------------------------------------ THE BEING (breathes)
  const p = P.div(T.mul(TAU / 8).sin().mul(0.016).add(1));
  const aa = fwidth(p.x).mul(1.2).max(0.008), st = strokeAA(aa);
  const ax = p.x.abs(), q = vec2(ax, p.y);
  const ec = vec2(0, 6.5), ER = 4.2, e = p.sub(ec).length();

  // ARMS: four mirrored pairs, each uncurls along its length in a seeded order; its suckers light bead by bead after it
  const off = pk(3, 4), flip = pk(4, 2), sp = 1.55, chase = c.beat.fract();
  ARMS.forEach(({ a: va, b: vb }, i) => {
    const slot = off.add(i).mod(4), sl = mix(slot, float(3).sub(slot), flip);
    const t0 = sl.mul(0.07).add(0.27), x0 = float(3).sub(sl).mul(0.012);
    const pA = ss(t0, t0.add(0.085), u).add(cl.mul(0.06).mul(on(u.sub(t0)))).min(1).mul(inv(ss(x0.add(0.9), x0.add(0.93), u)));
    const pS = ss(t0.add(0.06), t0.add(0.13), u).mul(inv(ss(x0.add(0.885), x0.add(0.9), u)));
    const s = rn(10 + i), L = mix(float(va.L), float(vb.L), s);
    const ang = T.mul(0.35 * (1 + i * 0.15)).add(i * 1.7).sin().mul(0.06).mul(cl.mul(0.6).add(1)), cs = ang.cos(), sn = ang.sin();
    const base = vec2(ARM[i][0], ARM[i][1]);
    const V = va.pts.map((pa, j) => { const r = vec2(mix(float(pa[0]), float(vb.pts[j][0]), s), mix(float(pa[1]), float(vb.pts[j][1]), s)).sub(base); return base.add(vec2(r.x.mul(cs).sub(r.y.mul(sn)), r.x.mul(sn).add(r.y.mul(cs)))); });
    let best = float(99), S = float(0), cum = float(0);
    for (let j = 0; j < NS; j++) {
      const lj = mix(float(va.len[j]), float(vb.len[j]), s), sg = segH(q, V[j], V[j + 1]);
      const w = step(sg.d, best); best = best.min(sg.d); S = mix(S, cum.add(sg.h.mul(lj)), w); cum = cum.add(lj);
    }
    const sN = S.div(L).clamp(0, 1), rad = inv(sN.mul(0.86)).mul(1.7 - i * 0.12), d = best.sub(rad);
    const body = st(d, 0).mul(maskDraw(pA, sN)).mul(on(pA));
    const nibG = inv(ss(0, 0.04, sN.sub(pA).abs())).mul(step(pA, 0.99));
    const jb = S.div(sp).floor(), bd = vec2(S.div(sp).fract().sub(0.5).mul(sp), best).length(), br = rad.mul(0.6).min(0.62);
    const nB = L.div(sp).floor().max(1), jN = jb.add(0.5).div(nB);
    const suck = st(bd.sub(br).abs(), 0.09).add(st(bd, br.mul(0.32).add(kk.mul(br).mul(0.4)))).min(1)
      .mul(step(0.35, rad)).mul(maskBeads(pS, jN)).mul(on(pS));
    const sc = mix(H, H2, step(jN, chase).mul(kOn)).add(W.mul(inv(ss(0, 0.06, jN.sub(chase).abs())).mul(kOn).mul(0.6)));  // the kick: a colour step chases down the arm
    const skin = mix(BG, mix(A, B, sN), band(S.mul(0.45).sub(T.mul(0.3).mul(sense(7)))).mul(0.3).add(0.08)).mul(cul.mul(0.5).add(0.8));
    lay(body, skin.add(mix(B, W, 0.45).mul(st(d.abs(), 0.12))).add(H.mul(nibG).mul(2)).add(sc.mul(suck).mul(cl.mul(0.5).add(0.9))));
  });

  // MANTLE: the dome; its stripes ring outward from the eye, appearing ring by ring as the iris of the whole body opens
  const md = smin(vec2(q.x.div(9), p.y.sub(6).div(11)).length().sub(1).mul(9), capsule(q, [0, -1], [0, -4], 5.2), 2);
  const pM = io(0.13, 0.26, 0.93, 0.965);
  const mant = st(md, 0).mul(maskIris(pM, e.div(17))).mul(on(pM));
  const ring = band(e.mul(0.55).sub(T.mul(0.12).mul(sense(8))));
  lay(mant, mix(BG, mix(A, B, step(0.5, e.mul(0.55).sub(T.mul(0.12).mul(sense(8))).mul(0.5).fract())), ring).mul(cul.mul(0.5).add(0.75))
    .add(mix(B, W, 0.55).mul(st(md.abs(), 0.15))));
  // rim beads: lit one by one from the crown down both flanks
  const ra = atan2(ax, p.y.sub(4)), rr = p.sub(vec2(0, 4)).length(), nR = 18;
  const rk = ra.div(Math.PI).mul(nR).floor(), rbd = vec2(ra.div(Math.PI).mul(nR).fract().sub(0.5).mul(rr.mul(Math.PI / nR)), md.add(1.3)).length();
  const pRB = io(0.55, 0.62, 0.875, 0.895);
  lay(st(rbd, 0.38).mul(mant).mul(maskBeads(pRB, rk.add(0.5).div(nR))).mul(on(pRB)), mix(H2, W, 0.2));

  // THE EYE: first the closed lid, a line drawing out from its centre; then the lid opens on concentric rings and a horizontal pupil
  const dy = p.y.sub(ec.y), xs = inv(p.x.div(ER).mul(p.x.div(ER))).clamp(0, 1).sqrt();
  const pL = io(0.0, 0.04, 0.975, 0.995), pE = io(0.04, 0.13, 0.955, 0.985);
  const lidLine = st(dy.abs(), 0.12).mul(maskDraw(pL, p.x.abs().div(ER))).mul(step(p.x.abs(), ER)).mul(on(pL)).mul(inv(on(pE)));
  lay(lidLine, mix(W, H, 0.3));
  const open = pE.mul(ER).mul(xs);
  const eye = st(e.sub(ER), 0).mul(maskLid(pE, dy.div(xs.mul(ER).max(0.05)))).mul(on(pE));
  const ia = atan2(p.x, dy), spokes = band(ia.div(TAU).mul(16).add(T.mul(0.05).mul(sense(9))));
  const dil = kk.mul(0.6).add(cl.mul(0.15));                     // the kick dilates the slit: hollow bar to filled disc
  const pup = vec2(p.x.div(dil.mul(0.6).add(1.6)), dy.div(dil.mul(1.2).add(0.45))).length();
  const ringsE = band(e.mul(1.1).sub(T.mul(0.2)));
  const eyeC = BG.add(mix(A, B, spokes).mul(ringsE).mul(step(e, ER * 0.78)).mul(0.9))
    .add(H.mul(st(e.sub(ER * 0.86).abs(), 0.22))).add(W.mul(st(e.sub(ER).abs(), 0.13)))
    .mul(step(1, pup)).add(H2.mul(st(pup.sub(1).abs().mul(0.5), 0.07)));
  lay(eye, eyeC);
  const lidEdge = st(dy.abs().sub(open).abs(), 0.1).mul(step(p.x.abs(), ER)).mul(on(pE)).mul(step(pE, 0.995));
  lay(lidEdge, mix(W, H, 0.3));
  return cutout(col, cover);
}
