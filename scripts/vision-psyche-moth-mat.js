// THE PSYCHE MOTH: seen from above, mirrored: four op-art wings each with a concentric eye-spot, comb antennae, bead body.
// Layers (params.layer): world z-30 moon + lattice of circles (scrolls) / ring z-12 feather fans (two rings counter-turn) /
// being z0 the moth (breathes) / veil z+10 black leaves + vein skeletons (drift, spin) / fore z+22 scale beads + sparkle stars.
// Pacing (u): thread + chrysalis alone 0-.14, splits .14-.22, body, wings unfold by hinge angle .2-.42, moon phase .28-.42,
// antennae, lattice .42-.6, fans .45-.64, eye-spots open as irises .58-.74, veil .6-.76, fore .68-.78; LIFO exit .8-1
// (fore, veil, eyes, fans, scales blow off, wings fold, body); the moon stays lit to the seam. Roll channels 1040..1059.
import { MeshBasicNodeMaterial, AdditiveBlending, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep as ss, step, mix, atan2 as atan2raw, fwidth } from "builtin/tsl";
import { tripClock, visionShown, visionU, climb, maskDraw, maskBeads, maskIris, maskClock, maskEclipse, inv, is, sgn, ioU, strokeAA, NEON } from "./lib/trip.js";

const TAU = 6.28318, PI = 3.14159, HY = 2.5;                        // HY: the wing hinge (thorax) height
// atan2 is undefined at (0, 0) on some GPUs: never ask it there
const atan2 = (y, x) => atan2raw(y, x.add(1e-5));
const hash = (k) => float(k).mul(12.9898).sin().mul(43758.5453).fract();
const on = (p) => step(0.002, p);                                    // a mask at p = 0 shows nothing, not its zero line
// antialiased half-duty stripes of x (1 near the integers), edge width from the screen derivative
const band = (x, d = 0.5) => { const fw = fwidth(x).min(0.5); return ss(float(d).sub(fw), float(d).add(fw), x.fract().sub(0.5).abs().mul(2)); };
// [th0, th1, Rmax, skew, eye x, eye y, eye r]: fore wing, hind wing (angles from straight up, radians)
const WINGS = [[0.55, 2.0, 31, 1, 14.6, 9, 4.4], [1.75, 2.95, 20, 0, 8.2, -5.6, 3.3]];

export function material(ctx) {
  const layer = ctx.params.layer ?? "being";
  const c = tripClock(ctx), u = visionU(ctx, c), low = ctx.quality === "low", t = c.real;
  const io = ioU(u), rn = (n) => c.rnd(1040 + n), pk = (n, k) => c.pick(1040 + n, k), sense = (n) => sgn(rn(n));
  const { BLU, VIO, PNK, ORA, YEL, GRN, W } = NEON, ICE = vec3(0.3, 0.5, 1);
  const fam = pk(0, 3), hot = pk(1, 4);
  const A = mix(BLU, VIO, is(fam, 1)), B = VIO.mul(is(fam, 0)).add(BLU.mul(is(fam, 1))).add(ICE.mul(is(fam, 2)));
  const hotC = (k) => [PNK, ORA, YEL, GRN].reduce((a, v, i) => a.add(v.mul(is(k, i))), vec3(0));
  const H = hotC(hot), H2 = hotC(hot.add(pk(2, 3)).add(1).mod(4));
  const P = positionGeometry.xy, live = visionShown(ctx, c, 0), kickOn = step(0.001, c.kick);
  const cl = climb(c), cul = ss(0.7, 0.8, u).mul(inv(ss(0.86, 0.92, u))).mul(cl.mul(0.4).add(0.6));
  const uEnd = inv(float(0.4).div(ctx.param("vw1", -1).sub(ctx.param("vw0", -1)).max(1))).min(0.999);
  const ripple = (r, reach, w) => inv(ss(0, w, r.sub(c.beat.fract().mul(reach)).abs())).mul(kickOn).mul(inv(ss(reach * 0.5, reach, c.beat.fract().mul(reach))));
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  const cutout = (col, cover) => { m.colorNode = col; m.opacityNode = cover.mul(live).clamp(0, 1); m.alphaTest = 0.5; return m; };

  // ------------------------------------------------------------------ WORLD: moon + lattice of circles (scrolls)
  if (layer === "world") {
    const stroke = strokeAA(fwidth(P.x).mul(1.2).max(0.02));
    const mq = P.sub(vec2(0, 8)).div(27), md = mq.length();
    // the moon waxes from a crescent (its own shadow slides off) and wanes the same way at the seam
    const pM = io(0.28, 0.42, 2, 3).min(inv(ss(uEnd, float(1.0005), u)));
    const moon = step(md, 1).mul(maskEclipse(pM, mq.x, mq.y, sense(3))).mul(on(pM));
    const crater = stroke(mq.sub(vec2(0.32, 0.3)).length().sub(0.2).abs().mul(27), 0.12).add(stroke(mq.add(vec2(0.4, 0.1)).length().sub(0.12).abs().mul(27), 0.12));
    const mCol = mix(B, W, 0.5).mul(band(mq.y.mul(6).add(t.mul(0.1).mul(sense(4)))).mul(0.16).add(0.07).add(stroke(md.sub(0.97).abs().mul(27), 0.25).mul(0.7)).add(crater.mul(0.3)));
    const S = pk(5, 3).mul(2).add(14), sc = vec2(t.mul(0.8).mul(sense(6)), t.mul(0.3)), q = P.add(sc).div(S), R2 = vec2(1, 1.732);
    const pL = io(0.42, 0.6, 2, 3), pLo = ss(0.93, 0.97, u), pI = io(0.6, 0.72, 0.92, 0.95);
    let col = vec3(0);
    [0, 0.5].forEach((o) => {
      const g = q.sub(R2.mul(o)), id = g.div(R2).add(0.5).floor(), l = g.sub(id.mul(R2)), d = l.length().mul(S);
      const cc = id.add(o).mul(R2).mul(S).sub(sc), ord = cc.sub(vec2(0, 8)).length().div(170).clamp(0, 1), h = hash(id.x.add(id.y.mul(7.3)).add(o));
      // each circle draws itself round like a clock hand, nearest the moon first; furthest leaves first
      const pj = pL.mul(1.6).sub(ord.mul(0.6)).min(inv(pLo).mul(1.6).sub(inv(ord).mul(0.6))).clamp(0, 1);
      const ring = stroke(d.sub(S.mul(0.5).sub(0.25)).abs(), 0.14).mul(maskClock(pj, atan2(l.x, l.y).mul(sense(7)))).mul(on(pj));
      const pi = pI.mul(1.5).sub(h.mul(0.5)).clamp(0, 1);
      const inner = low ? float(0) : stroke(d.sub(S.mul(0.3)).abs(), 0.1).add(stroke(d, 0.55)).mul(maskIris(pi, d.div(S.mul(0.36)))).mul(on(pi));
      col = col.add(mix(mix(A, B, step(0.5, h)), H2, step(0.86, h)).mul(ring.add(inner.mul(0.7))));
    });
    const feather = inv(ss(0.8, 0.97, vec2(P.x.div(152), P.y.div(86)).length()));
    return cutout(mix(col.mul(ripple(P.length(), 130, 6).mul(0.8).add(0.42)), mCol, moon).mul(feather), float(1));
  }

  // ------------------------------------------------------------------ RING: two rings of feather fans (counter-turn)
  if (layer === "ring") {
    const p = P.mul(74 / 86).sub(vec2(0, HY)), stroke = strokeAA(fwidth(p.x).mul(1.2).max(0.01)), r = p.length(), a = atan2(p.x, p.y);
    const nF = pk(7, 3).add(5);
    // on the kicked bars the fans rock back and forth by the bar: a layer reversal, not a flash
    const sway = inv(c.beat.div(8).fract().sub(0.5).abs().mul(2)).mul(0.25).mul(kickOn);
    let col = vec3(0);
    [[19, 7.5, 1], [27.5, 6.5, -1]].forEach(([r0, len, s], j) => {
      const pF = io(0.45 + j * 0.06, 0.58 + j * 0.06, 0.88 - j * 0.02, 0.92 - j * 0.02), n = nF.add(j * 2);
      const x = a.add(t.mul(TAU / 80 * s).mul(sense(8))).add(sway.mul(s)).div(TAU).add(0.5).mul(n), k = x.floor(), f5 = x.fract().mul(1.3).sub(0.15).mul(5);
      const arc = float(TAU / 6.5).div(n), tl = f5.fract().sub(0.5).mul(arc).mul(r).abs();
      const L = inv(f5.floor().sub(2).abs().mul(0.2)).mul(len).mul(cl.mul(0.25).add(0.75)), sx = r.sub(r0).div(L);
      const wv = sx.mul(inv(sx)).mul(4).mul(arc.mul(r0 * 0.42).min(1.3));
      const pq = pF.mul(1.5).sub(hash(k.add(j * 9)).mul(0.5)).clamp(0, 1);
      // every feather is drawn from its quill to its tip
      const vis = step(0, f5).mul(step(f5, 5)).mul(step(0, sx)).mul(step(sx, 1)).mul(maskDraw(pq, sx)).mul(on(pq));
      const fe = stroke(tl, 0.07).add(stroke(tl.sub(wv).abs(), 0.06)).add(band(sx.mul(7).sub(tl.mul(0.6)), 0.6).mul(step(tl, wv)).mul(0.45));
      const tip = stroke(vec2(tl, sx.sub(1.07).mul(L)).length(), 0.28).mul(step(0, f5)).mul(step(f5, 5)).mul(step(0.99, pq));
      col = col.add(mix(j ? A : B, W, 0.25).mul(fe.min(1)).mul(vis).add(mix(H, H2, j).mul(tip)));
    });
    m.colorNode = col.mul(cul.mul(0.5).add(0.6));
    m.opacityNode = live;
    m.transparent = true; m.blending = AdditiveBlending; m.depthWrite = false;
    return m;
  }

  // ------------------------------------------------------------------ VEIL: black leaves and vein skeletons (drift)
  if (layer === "veil") {
    const stroke = strokeAA(fwidth(P.x).mul(1.2).max(0.01)), ax = P.x.abs();
    const pin = io(0.6, 0.76, 0.82, 0.87), nL = pk(9, 2).add(low ? 2 : 3), dir = sense(10);
    let col = vec3(0), cover = float(0);
    for (let j = 0; j < (low ? 3 : 4); j++) {
      const L = 7 + (j % 2) * 2.5, Wd = 2.4 + (j % 3) * 0.5;
      const yj = t.mul(0.02 * (1 + j * 0.2)).mul(dir).add(j * 0.27 + 0.1).fract().mul(100).sub(50);
      const xj = t.mul(0.25).add(j * 1.9).sin().mul(4).add(9 + j * 6.5);
      const sp = t.mul(0.07 * (j % 2 ? 1 : -1)).add(0.5 + j * 0.9), cs = sp.cos(), sn = sp.sin();
      const d = vec2(ax.sub(xj), P.y.sub(yj));
      const la = d.x.mul(cs).add(d.y.mul(sn)).div(L), lb = d.y.mul(cs).sub(d.x.mul(sn)).abs(), w = inv(la.mul(la)).mul(Wd);
      const pj = pin.mul(1.6).sub(j * 0.2).clamp(0, 1);
      // the leaf grows from its stem along the midrib
      const there = step(float(j), nL.sub(0.5)).mul(step(la.abs(), 1)).mul(maskDraw(pj, la.mul(0.5).add(0.5))).mul(on(pj));
      const vd = la.mul(L * 0.55).sub(lb.mul(0.8)).fract().sub(0.5).abs(), rim = lb.sub(w).abs();
      // even leaves are solid black blades; odd ones are bare vein skeletons (black strokes, the being shows between)
      const solid = step(lb, w.add(0.15)), bones = step(lb, w.add(0.4)).mul(step(rim, 0.4).max(step(lb, 0.35)).max(step(vd, 0.26)));
      const inside = (j % 2 ? bones : solid).mul(there);
      const lit = mix(B, W, 0.3).mul(stroke(lb, 0.09).add(stroke(rim, 0.08)).min(1)).add((j % 2 ? H2 : H).mul(stroke(vd, 0.06)).mul(step(lb, w)).mul(0.7)).mul(cul.mul(0.3).add(0.65));
      col = mix(col, lit, inside); cover = cover.max(inside);
    }
    return cutout(col, cover);
  }

  // ------------------------------------------------------------------ FORE: wing-scale beads + sparkle stars
  if (layer === "fore") {
    const aa = fwidth(P.x).mul(1.2).max(0.01), ax = P.x.abs(), pin = io(0.68, 0.78, 0.8, 0.84), dir = sense(11);
    let col = vec3(0), cover = float(0);
    for (let j = 0; j < (low ? 4 : 6); j++) {
      const rad = 1.2 + (j % 3) * 0.6;
      const yj = t.mul(0.024 * (1 + j * 0.2)).mul(dir).add(j * 0.37).fract().mul(70).sub(35);
      const xj = yj.mul(0.09).sub(t.mul(0.6)).add(j * 1.7).sin().mul(4).add(8 + (j % 3) * 8 + j);
      const e = vec2(ax.sub(xj), P.y.sub(yj)).length().div(rad), aL = aa.div(rad);
      const pj = pin.mul(1.8).sub(j * 0.14).clamp(0, 1);
      // occlusion swap on the beat: a scale is a solid black disc hiding the moth, or only its rings, turn about
      const hollow = c.beat.floor().add(j).mod(2).mul(kickOn);
      const disc = step(e, 1).mul(maskIris(pj, e)).mul(on(pj)).mul(mix(float(1), step(0.8, e).max(step(e.sub(0.5).abs(), 0.09)), step(0.5, hollow)));
      const rings = inv(ss(float(0.06), aL.add(0.06), e.sub(0.9).abs())).add(inv(ss(float(0.05), aL.add(0.05), e.sub(0.5).abs())).mul(0.7));
      col = mix(col, mix([H, H2, B][j % 3], W, 0.25).mul(rings.min(1)).mul(cul.mul(0.3).add(0.8)), disc); cover = cover.max(disc);
    }
    // sparkle stars: four-point astroids, each opening and closing on its own clock, drifting against the scales
    const g = vec2(P.x.add(t.mul(0.5).mul(dir)), P.y.add(t.mul(0.2))).div(19), id = g.floor(), h = hash(id.x.add(id.y.mul(5.7)));
    const pS = io(0.72, 0.8, 0.8, 0.83), size = t.mul(0.6).add(h.mul(TAU)).sin().abs().mul(h.mul(1.5).add(1)).add(0.01);
    const sq = g.fract().sub(0.5).sub(vec2(h.sub(0.5), hash(h.mul(31)).sub(0.5)).mul(0.5)).mul(19).abs().div(size).add(1e-4);
    const sd = sq.x.sqrt().add(sq.y.sqrt()), star = inv(ss(inv(fwidth(sd).min(0.5)), float(1), sd)).mul(step(0.55, h)).mul(maskBeads(pS, h.sub(0.55).div(0.45))).mul(on(pS));
    col = mix(col, mix(W, H2, step(0.8, h).mul(0.6)), star);
    return cutout(col, cover.max(step(0.5, star)));
  }

  // ------------------------------------------------------------------ THE BEING: the moth (breathes)
  const p = P.div(t.mul(TAU / 7).sin().mul(0.02).add(1));
  const aa = fwidth(p.x).mul(1.2).max(0.008), stroke = strokeAA(aa);
  const ax = p.x.abs(), hy = p.y.sub(HY), r = vec2(ax, hy).length(), th = atan2(ax, hy);
  const kl = ripple(r, 32, 2);
  let col = vec3(0), cover = float(0);
  const lay = (body, lit) => { col = mix(col, lit, body); cover = cover.max(body); };
  // WINGS unfold by angle round the hinge (dealt: swinging up from the body, or down from the head) and fold shut the same way
  const pW = io(0.2, 0.42, 0.9, 0.96), ord = pk(3, 2), ua = mix(inv(th.div(PI)), th.div(PI), ord);
  const fold = maskDraw(pW, ua).mul(on(pW));
  const edge = inv(ss(0, 0.025, ua.sub(pW).abs())).mul(on(pW)).mul(step(pW, 0.99));
  const nS = pk(4, 3).add(5), eo = pk(6, 2);
  [1, 0].forEach((j) => {
    const [t0, t1, Rm, skew, ex, ey, er] = WINGS[j];
    const tt = th.sub(t0).div(t1 - t0), tc = tt.clamp(0, 1), ts = skew ? tc.mul(inv(tc.mul(0.5)).add(0.5)) : tc;
    const R = ts.mul(PI).sin().max(1e-4).sqrt().mul(Rm), f = r.div(R);
    const wing = step(f, 1.01).mul(step(0, tt)).mul(step(tt, 1)).mul(fold);
    const x = f.mul(nS.sub(j)).sub(t.mul(0.12).mul(sense(12 + j))), kx = x.floor().mod(2);
    const vein = stroke(tt.mul(7).fract().sub(0.5).abs().mul((t1 - t0) / 7).mul(r), 0.1);
    let lit = mix(W.mul(0.8), mix(A, B, kx), ss(0.5, 0.56, f)).mul(band(x)).mul(inv(vein)).mul(kl.mul(0.7).add(0.9));
    lit = lit.add(mix(H2, W, 0.2).mul(stroke(R.sub(r).sub(0.3).abs(), 0.16))).add(W.mul(edge));
    if (!low) {                                                      // late detail: margin beads strung along the wing edge
      const pMb = io(0.62 + j * 0.04, 0.72 + j * 0.04, 0.87, 0.9), nb = j ? 12 : 18;
      const bead = stroke(vec2(tt.mul(nb).fract().sub(0.5).mul((t1 - t0) / nb).mul(r), r.sub(R.mul(0.86))).length(), 0.42).mul(maskBeads(pMb, tt)).mul(on(pMb));
      lit = mix(lit, H.mul(cul.mul(0.4).add(0.9)), bead);
    }
    // EYE-SPOT: rings open from the pupil outward like an iris; the pupil wanders on its own clock
    const q = vec2(ax.sub(ex), p.y.sub(ey)), Re = cl.mul(0.1).add(0.9).mul(er), e = q.length().div(Re);
    const pE = io(0.58, 0.68, 0.85, 0.89).mul(1.5).sub(is(eo, j).mul(0.5)).clamp(0, 1);
    const eye = step(e, 1).mul(maskIris(pE, e)).mul(on(pE));
    const e2 = q.sub(vec2(t.mul(0.4).add(j).sin(), t.mul(0.31).cos()).mul(er * 0.1)).length().div(Re);
    const eLit = H.mul(stroke(e.sub(0.86).abs().mul(Re), 0.3)).add(W.mul(stroke(e.sub(0.63).abs().mul(Re), 0.2)))
      .add(mix(H2, A, j).mul(ss(0.2, 0.24, e2)).mul(inv(ss(0.44, 0.48, e2))).mul(kl.add(1)))
      .add(W.mul(stroke(q.sub(vec2(-0.1, 0.1).mul(Re)).length(), er * 0.05)));
    lay(wing, mix(lit, eLit.mul(cul.mul(0.3).add(0.9)), eye));
  });
  // SCALES blow off the folding wings: beads streaming out along the hinge rays
  if (!low) {
    const pS = ss(0.86, 0.97, u), ka = th.div(PI).mul(14).floor(), hk = hash(ka);
    const rs = r.div(7).sub(pS.mul(hk.mul(3).add(4))).add(hk), kr = rs.floor();
    const sz = ss(0, 0.1, pS).mul(inv(ss(0.75, 1, pS))).mul(0.5);
    const sb = stroke(vec2(th.div(PI).mul(14).fract().sub(0.5).mul(PI / 14).mul(r), rs.fract().sub(0.5).mul(7)).length(), sz).mul(step(0.5, kr.add(pS.mul(8)))).mul(step(kr.add(pS.mul(5)), 3.5)).mul(on(sz));
    lay(sb.mul(step(0.5, sb)), mix(mix(H, H2, step(0.5, hash(ka.add(kr.mul(7))))), W, 0.25));
  }
  // BODY: bead segments, head first
  const pB = io(0.13, 0.2, 0.96, 0.99), ky = float(8.2).sub(p.y).div(1.9), k = ky.floor();
  const rk = inv(k.sub(1.5).abs().mul(0.1)).mul(1.75), bd = vec2(p.x, ky.fract().sub(0.5).mul(1.9)).length();
  const seg = step(bd, rk).mul(step(0, k)).mul(step(k, 8.5)).mul(maskBeads(pB, k.add(0.5).div(9.5))).mul(on(pB));
  lay(seg, mix(mix(H, B, step(0.5, k.mod(3))), H2, step(1.5, k.mod(3))).mul(stroke(bd.sub(rk).add(0.22).abs(), 0.13).add(stroke(bd, 0.3))).mul(kl.add(0.9)));
  // ANTENNAE: the shaft draws up from the head, then the comb teeth along it
  const s = p.y.sub(8.6).div(12.6), dx = ax.sub(s.mul(s.mul(0.6).add(0.4)).mul(9).add(0.5)).abs(), wv = s.mul(inv(s)).mul(6.4).add(0.1);
  const pA = io(0.34, 0.44, 0.94, 0.97), pT = io(0.4, 0.5, 0.92, 0.95), sIn = step(0, s).mul(step(s, 1));
  const teeth = band(s.mul(24).sub(dx.mul(0.45)), 0.55).mul(step(dx, wv)).mul(maskDraw(pT, s)).mul(on(pT));
  lay(step(dx, wv.add(0.2)).mul(sIn).mul(maskDraw(pA, s)).mul(on(pA)), mix(B, W, 0.5).mul(stroke(dx, 0.11)).add(mix(H2, W, 0.15).mul(teeth).mul(0.85)));
  // CHRYSALIS: a striped teardrop let down its thread; it splits along the seam, the halves parting as they are eaten away
  const pC = io(0.03, 0.12, 2, 3), split = ss(0.14, 0.22, u), cs = float(13).sub(p.y).div(23), cc = cs.clamp(0.001, 0.999);
  const hw = cc.pow(0.8).mul(inv(cc).pow(0.4)).mul(8.6), xx = ax.sub(split.mul(3));
  const chr = step(xx, hw).mul(step(split.mul(hw).mul(1.02).sub(0.001), xx)).mul(step(0, cs)).mul(step(cs, 1)).mul(maskDraw(pC, cs)).mul(on(pC));
  const xn = xx.div(hw);
  lay(chr, mix(W.mul(0.85), mix(A, H, step(0.5, cs.mul(8).floor().mod(3))), ss(0.45, 0.5, xn)).mul(band(cs.mul(8).add(xn.mul(xn).mul(0.5)).sub(t.mul(0.1))))
    .add(B.mul(stroke(hw.sub(xx).sub(0.2).abs(), 0.13))).add(H.mul(stroke(xx.sub(split.mul(hw)).abs(), 0.12)).mul(on(split))));
  const pTh = io(0, 0.04, 0.2, 0.27);
  lay(step(ax, 0.3).mul(step(13, p.y)).mul(maskDraw(pTh, float(25).sub(p.y).div(12))).mul(on(pTh)), W.mul(0.7).mul(stroke(ax, 0.07)));
  return cutout(col, cover);
}
