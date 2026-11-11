// THE NIGHT OWL: one neon owl mask, bilateral, on five canvases at five depths (params.layer: world z-30 plumage scrolls,
// ring z-12 turns, being breathes, veil z+10 sways, fore z+22 undulates). Every piece enters and leaves through one of
// three OWL masks dealt by seed (feather strokes / iris dots / plumage scale rows), exit never the entrance's. Seed 480..501.
// REVEAL SCHEDULE (u = visionU; one new group per bar = .031 u; in -> whole / out start -> gone):
//  face outline line   .000 -> .14  (ALONE to .155)   out .900 -> .930
//  beak                .155 -> .21                    out .930 -> .960
//  face shield (black) .185 -> .26                    out .945 -> .968
//  eyes (+tears)       .215 -> .29                    out .915 -> .945
//  brows               .245 -> .31                    out .880 -> .910
//  ear tufts           .275 -> .34                    out .890 -> .920
//  feather fans        .305 -> .40                    out .865 -> .900
//  face bead row       .335 -> .40  (owl whole ~.41)  out .895 -> .925
//  RING bead ring+halo .365 -> .44                    out .875 -> .905
//  WORLD plumage grow  .395 -> .55                    out .982 -> .999 (last lit)
//  forehead diamonds   .430 -> .48                    out .845 -> .880
//  RING sparkles       .460 -> .53                    out .855 -> .885
//  whiskers            .490 -> .56                    out .825 -> .860
//  beard (beads|chev.) .520 -> .59                    out .815 -> .850
//  RING ocelli         .550 -> .61                    out .840 -> .875
//  WORLD glyphs        .580 -> .66 stars, cartouches, crosses, feathers one by one; out .850 -> .915 piece by piece
//  glints: fan + iris beads, fan squiggle, fan ocelli .610 -> .70   out .805 -> .870
//  worm 1 / 2 / 3      .640 / .700 / .760 -> +.08 (worm-mat)    out .860 .. .935
//  VEIL feather charms .670 -> .76                    out .820 -> .860
//  FORE petals, sparks .730 -> .79                    out .800 -> .840
//  culmination (eye spiral or figure/ground flip, ring brightens) .80 -> .86
import { MeshBasicNodeMaterial, AdditiveBlending, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, mix, atan2, fwidth, select } from "builtin/tsl";
import { tripClock, visionShown, visionU, climb, maskDraw, maskBeads, maskIris, inv, is, sgn, strokeAA } from "./lib/trip.js";

const TAU = 6.28318, PI = 3.14159;
const DEPTH = { world: 104, ring: 86, being: 74, veil: 64, fore: 52 };
const CY = 2;
// world glyphs (world metres, right half, mirrored)
const STARS = [[40, 40, 2.4], [75, 52, 3.2], [100, 20, 2.0], [62, -30, 2.6], [95, -48, 3.2], [30, -55, 1.8], [122, 52, 2.2], [20, 50, 1.7]];
const CARTS = [[55, 20], [86, -15], [46, -46], [110, 36], [78, 60]];
const CROSS = [[30, 28], [70, -38], [106, -2], [128, -42]];
const FALL = [[52, 0], [92, 30], [118, -22]];

const rot = (v, a) => { const c = a.cos(), s = a.sin(); return vec2(v.x.mul(c).sub(v.y.mul(s)), v.x.mul(s).add(v.y.mul(c))); };
// a teardrop, round end of radius r at the origin, tip at (0, -L): signed distance
function tear(q, r, L) {
  const s = r / L, co = Math.sqrt(1 - s * s), qx = q.x.abs(), qy = q.y.add(L);
  const t = qx.mul(s).add(qy.mul(co)), line = qx.mul(co).sub(qy.mul(s));
  return select(t.lessThan(L * co), select(t.lessThan(0), vec2(qx, qy).length(), line), q.length().sub(r));
}
const four = (d, sz) => d.x.abs().div(sz).sqrt().add(d.y.abs().div(sz).sqrt());

export function material(ctx) {
  const layer = ctx.params.layer ?? "being";
  const c = tripClock(ctx), u = visionU(ctx, c), live = visionShown(ctx, c, 0);
  const low = ctx.quality === "low";
  const rn = (n) => c.rnd(480 + n), pk = (n, k) => c.pick(480 + n, k);
  const sense = (n) => sgn(rn(n));
  const fam = pk(0, 3), h1 = pk(1, 4), h2 = h1.add(1).add(pk(2, 3)).mod(4);
  const blue = vec3(0.05, 0.12, 1.0), violet = vec3(0.45, 0.05, 1.0), W = vec3(1, 1, 1), K = vec3(0, 0, 0);
  const M = vec3(1.0, 0.05, 0.55), Y = vec3(1.0, 0.85, 0.05), G = vec3(0.1, 1.0, 0.15), O = vec3(1.0, 0.3, 0.02);
  const A = mix(blue, violet, is(fam, 1)), B = mix(violet, blue, is(fam, 1));
  const hot = (i) => M.mul(is(i, 0)).add(Y.mul(is(i, 1))).add(G.mul(is(i, 2))).add(O.mul(is(i, 3)));
  const H = hot(h1), H2 = hot(h2);
  const kickOn = step(0.001, c.kick);
  const sc = DEPTH[layer] / 74;                                  // this layer's metres per being metre
  const P = positionGeometry.xy;
  const aa = fwidth(P.x).mul(1.2).max(0.02);
  const stroke = strokeAA(aa);
  const cul = smoothstep(0.8, 0.82, u).mul(inv(smoothstep(0.86, 0.88, u))).mul(climb(c).mul(0.4).add(0.6));
  // THE OWL MASKS: per fragment an order o (0 first .. 1 last) and a shape key k; a piece shows where k < its own progress
  const gq = P.div(sc).sub(vec2(0, CY)), gx = gq.x.abs(), gr = gq.length();
  const gf = atan2(gq.y, gx).div(PI).add(0.5).mul(9), gw = gf.fract().sub(0.5).mul(2), gfo = gf.floor().div(9);
  const o0 = mix(gfo, inv(gfo), step(0.5, rn(22))), k0 = gr.div(125).min(1).add(gw.mul(gw).mul(0.6)).div(1.6);
  const gc = vec2(gx, gq.y).div(6), gi = gc.floor().add(0.5);
  const o1 = gi.mul(6).sub(vec2(9.5, 3.5)).length().div(125).min(1), k1 = gc.sub(gi).length().div(0.7072);
  const gri = gr.div(6).floor(), grc = gri.add(0.5).mul(6), gn = grc.mul(TAU / 6).floor().max(6);
  const gk = atan2(gq.y, gq.x).div(TAU).mul(gn).add(gri.mul(0.5));
  const k2 = vec2(gk.fract().sub(0.5).mul(grc.mul(TAU).div(gn)), gr.sub(grc)).length().div(4.7);
  const o2 = gri.div(21).min(1).mul(0.6).add(gri.mod(2).mul(0.4));
  const vE = pk(20, 3), vX = vE.add(1).add(pk(21, 2)).mod(3);
  const sel = (v, a, b, d) => a.mul(is(v, 0)).add(b.mul(is(v, 1))).add(d.mul(is(v, 2)));
  const oE = sel(vE, o0, o1, o2), kE = sel(vE, k0, k1, k2), oX = sel(vX, o0, o1, o2), kX = sel(vX, k0, k1, k2);
  const gs = (k, o, p) => step(k, float(p).mul(1.7).sub(o.mul(0.7)).mul(1.04).sub(0.002));
  const gate = (pi, po) => gs(kE, oE, pi).mul(gs(kX, oX, po));
  const io = (a, b, x, y) => { const pi = smoothstep(a, b, u), po = inv(smoothstep(x, y, u)); return pi.mul(gate(pi, po)).sub(0.003); };
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;

  // ---- WORLD: plumage, stars, cartouches (scrolls)
  if (layer === "world") {
    const q = P.sub(vec2(0, CY * sc)), ax = q.x.abs();
    const de = vec2(q.x.div(1.78), q.y).length(), ang = atan2(q.y, q.x);
    const grow = smoothstep(0.395, 0.55, u), Rg = grow.max(0.0001).pow(0.6).mul(74);
    const wg = gate(1, inv(smoothstep(0.982, 0.999, u))), wl = smoothstep(0.8, 0.95, u).mul(1.6).add(1);
    // the grown edge is three rows of feather scales, each row smaller: plumage spreading from the owl
    const lead = de.sub(Rg), ri = lead.div(5).floor(), rc = Rg.add(ri.add(0.5).mul(5));
    const nc = rc.mul(TAU / 7).max(6).floor();
    const kc = ang.div(TAU).mul(nc).add(ri.mul(0.5));
    const cd = vec2(kc.fract().sub(0.5).mul(rc.mul(TAU).div(nc)), lead.sub(ri.add(0.5).mul(5))).length();
    const sr = float(3.3).sub(ri.mul(0.8)), band = step(0, lead).mul(step(lead, 15));
    const scale = step(cd, sr).mul(band);
    const cover = step(de, Rg).max(scale).mul(step(0.0005, grow)).mul(wg);
    let col = mix(A, B, ri.mod(2)).mul(stroke(cd.sub(sr).abs(), 0.12)).mul(band).mul(0.7);
    // ghost plumage: faint scalloped growth rings inside
    const hi = de.div(12).floor(), hr = hi.add(0.5).mul(12), hn = hr.mul(TAU / 10).max(6).floor();
    const hk2 = ang.div(TAU).mul(hn).add(hi.mul(0.5));
    const gd = vec2(hk2.fract().sub(0.5).mul(hr.mul(TAU).div(hn)), de.sub(hr)).length();
    if (!low) col = col.add(A.mul(stroke(gd.sub(5).abs(), 0.1)).mul(step(de, Rg.sub(6))).mul(0.16));
    // sparse bead rows on two plumage rings, a kick ripple running out through them
    const front = c.beat.fract().mul(130), kl = smoothstep(6, 0, de.sub(front).abs()).mul(kickOn).mul(smoothstep(130, 60, front));
    [44, 64].forEach((R, j) => {
      const n = Math.round(R * TAU / 5), k = ang.div(TAU).mul(n).add(c.real.mul(0.02 * (j ? -1 : 1)));
      const bd = vec2(k.fract().sub(0.5).mul(R * TAU / n), de.sub(R)).length();
      col = col.add(mix(B, H, kl).mul(stroke(bd, 0.45)).mul(float(0.35).add(kl)).mul(maskBeads(grow.mul(1.6).sub(0.6 + j * 0.15).clamp(0, 1), k.fract())));
    });
    const sw = sense(12), pst = io(0.58, 0.63, 0.85, 0.88), pca = io(0.6, 0.65, 0.87, 0.9), pcr = io(0.62, 0.66, 0.885, 0.915), pfe = io(0.63, 0.66, 0.86, 0.89);
    const gly = pk(11, 3);
    (low ? STARS.slice(0, 4) : STARS).forEach(([x, y, s], i) => {
      const tw = c.real.mul(1.3).add(i * 2.1).sin().mul(0.25).add(0.75);
      const sp = rot(vec2(ax.sub(x), q.y.sub(y)), rn(18).mul(0.8).add(c.real.mul(0.05)));
      const st = step(four(sp, float(s).mul(tw)), 1).mul(maskBeads(pst, i / 8));
      col = mix(col, mix(H2, W, 0.6).mul(float(0.9).add(kl)), st);
    });
    (low ? CARTS.slice(0, 3) : CARTS).forEach(([x, y0], i) => {
      const y = float(y0).add(c.real.mul(1.1).mul(sw)).add(80).mod(160).sub(80);
      const cq = vec2(ax.sub(x), q.y.sub(y)), vert = i % 2 === 1;
      const qq = vert ? vec2(cq.y, cq.x) : cq;
      const sd = vec2(qq.x.abs().sub(5.5).max(0), qq.y).length().sub(2.6);
      const on = maskBeads(pca, i / 5);
      const inner = qq;
      const g0 = stroke(vec2(inner.x.abs().sub(3).abs(), inner.y).length(), 0.7).max(stroke(inner.length(), 0.7));
      const g1 = stroke(inner.x.abs().add(inner.y.abs()).sub(1.6).abs(), 0.15).max(stroke(inner.length(), 0.45));
      const g2 = stroke(vec2(inner.x.div(2.4), inner.y.div(1.2)).length().sub(1).abs(), 0.12).max(stroke(inner.length(), 0.6));
      const g = g0.mul(is(gly, 0)).add(g1.mul(is(gly, 1))).add(g2.mul(is(gly, 2)));
      col = mix(col, K, step(sd, 0).mul(on));
      col = col.add(H.mul(stroke(sd.abs(), 0.18)).add(mix(H2, W, 0.3).mul(g).mul(step(sd, -0.4))).mul(on));
    });
    (low ? CROSS.slice(0, 2) : CROSS).forEach(([x, y0], i) => {
      const y = float(y0).add(c.real.mul(1.1).mul(sw)).add(80).mod(160).sub(80);
      const cq = rot(vec2(ax.sub(x), q.y.sub(y)), c.real.mul(0.12 * (i % 2 ? 1 : -1)));
      const r1 = vec2(cq.x.abs().sub(3.3), cq.y.abs().sub(1.2)), r2 = vec2(cq.x.abs().sub(1.2), cq.y.abs().sub(3.3));
      const sd = r1.max(0).length().add(r1.x.max(r1.y).min(0)).min(r2.max(0).length().add(r2.x.max(r2.y).min(0)));
      const on = maskBeads(pcr, i / 4);
      col = mix(col, K, step(sd, 0).mul(on));
      col = col.add(H2.mul(stroke(sd.abs(), 0.16)).add(B.mul(stroke(cq.x.abs().add(cq.y.abs()).sub(0.9).abs(), 0.14))).mul(on));
    });
    (low ? FALL.slice(0, 1) : FALL).forEach(([x, y0], i) => {
      const ph = c.real.mul(0.7).add(i * 1.9);
      const y = float(y0).sub(c.real.mul(1.6)).add(80).mod(160).sub(80);
      const f = rot(vec2(ax.sub(x).sub(ph.sin().mul(4)), q.y.sub(y)), ph.add(1).sin().mul(0.5));
      const fe = vec2(f.x.div(2.3), f.y.div(8)).length();
      const on = maskBeads(pfe, i / 3);
      const barbs = step(f.y.mul(0.9).add(f.x.abs().mul(0.7)).fract(), 0.35).mul(step(fe, 0.85));
      col = mix(col, K, step(fe, 1).mul(on));
      col = col.add(B.mul(stroke(fe.sub(1).abs().mul(2.3), 0.14).max(stroke(f.x.abs(), 0.12).mul(step(fe, 1))).max(barbs.mul(0.5))).mul(on).mul(0.8));
    });
    m.colorNode = col.mul(wl);
    m.opacityNode = cover.mul(live);
    m.alphaTest = 0.5;
    return m;
  }

  // ---- RING: bead ring and sparkle ring (turns, soft)
  if (layer === "ring") {
    const q = P.div(sc).sub(vec2(0, CY)), r = q.length(), a = atan2(q.y, q.x);
    const s14 = sense(14), w1 = c.real.mul(TAU / 70).mul(s14), w2 = c.real.mul(TAU / 46).mul(s14).negate();
    const p1 = io(0.365, 0.44, 0.875, 0.905), p2 = io(0.46, 0.53, 0.855, 0.885), p3 = io(0.55, 0.61, 0.84, 0.875);
    const nb = pk(13, 3).mul(8).add(28);
    const ka = a.add(w1).div(TAU).add(0.5);
    const k1 = ka.mul(nb);
    const bd = vec2(k1.fract().sub(0.5).mul(r.mul(TAU).div(nb)), r.sub(38)).length();
    const bead = stroke(bd, 0.65).mul(maskBeads(p1, k1.floor().div(nb)));
    const l1 = stroke(r.sub(35.6).abs(), 0.1).mul(maskDraw(p1, ka));
    const kb = a.add(w2).div(TAU).add(0.5), k2 = kb.mul(12);
    const sp = vec2(k2.fract().sub(0.5).mul(r.mul(TAU).div(12)), r.sub(45));
    const spark = step(four(sp, float(1.8).add(c.kick.mul(0.6))), 1).mul(maskBeads(p2, k2.floor().div(12)));
    const l2 = stroke(r.sub(47.5).abs(), 0.09).mul(maskDraw(p2, inv(kb)));
    const k3 = k2.add(0.5), od = vec2(k3.fract().sub(0.5).mul(r.mul(TAU).div(12)), r.sub(42)).length();
    const oce = stroke(od.sub(1.3).abs(), 0.12).max(stroke(od, 0.45)).mul(maskBeads(p3, k3.floor().div(12)));
    const halo = r.sub(38).div(4).pow(2).negate().exp().mul(p1.max(0)).mul(0.12);
    const lit = float(0.8).add(cul.mul(0.6));
    m.colorNode = A.mul(l1.add(l2).mul(0.6)).add(mix(B, H, step(k1.mod(4), 0.5)).mul(bead)).add(mix(H2, W, 0.5).mul(spark)).add(H.mul(oce)).add(A.mul(halo)).mul(lit);
    m.opacityNode = live;
    m.transparent = true;
    m.blending = AdditiveBlending;
    m.depthWrite = false;
    return m;
  }

  // ---- VEIL: feather charms on bead strings (sways)
  if (layer === "veil") {
    const q = P.div(sc).sub(vec2(0, CY)), ax = q.x.abs();
    const pv = io(0.67, 0.76, 0.82, 0.86), nch = pk(15, 2).add(2);
    const drift = c.real.mul(0.13).sin().mul(4);
    let col = K, cover = float(0);
    [[52, 10, 0], [66, -6, 1], [40, 24, 2]].forEach(([x, yEnd, i]) => {
      const exists = i < 2 ? float(1) : step(2.5, nch);
      const top = 52, len = top - yEnd;
      const th = c.real.mul(0.8).add(i * 1.7).sin().mul(0.1);
      const pin = vec2(float(x).add(drift), top);
      const lq = rot(vec2(ax, q.y).sub(pin), th.negate());
      const along = lq.y.negate().div(len);
      const pi = pv.mul(1.4).sub(i * 0.15).clamp(0, 1).mul(exists);
      const bk = lq.y.negate().div(2.6);
      const bd = vec2(lq.x, bk.fract().sub(0.5).mul(2.6)).length();
      const beads = step(bd, 0.75).mul(step(along, 1)).mul(step(0, along)).mul(maskDraw(pi.mul(1.3), along));
      const f = lq.add(vec2(0, len + 8));
      const fe = vec2(f.x.div(4.6), f.y.div(9)).length();
      const fon = maskIris(pi.mul(1.3).sub(0.3).clamp(0, 1), fe);
      const body = step(fe, 1).mul(fon);
      cover = cover.max(beads).max(body);
      const rim = stroke(fe.sub(0.94).abs().mul(5), 0.14), spine = stroke(f.x.abs(), 0.14).mul(step(f.y, 6));
      const oc = vec2(f.x, f.y.sub(-4)).length();
      const ocl = stroke(oc.sub(1.8).abs(), 0.18).max(stroke(oc, 0.7));
      const barbs = stroke(f.y.mul(0.5).add(f.x.abs().mul(0.45)).fract().sub(0.5).abs().mul(2), 0.12).mul(step(fe, 0.85)).mul(step(1.8 + 0.6, oc));
      const fc = A.mul(rim).add(B.mul(spine.max(barbs)).mul(0.8)).add(mix(H, W, 0.3).mul(ocl));
      col = mix(col, mix(H2, H, bk.floor().mod(2)).mul(0.9), beads.mul(inv(body)));
      col = mix(col, fc.mul(inv(cul.mul(0.7))), body);
    });
    m.colorNode = col;
    m.opacityNode = cover.mul(live);
    m.alphaTest = 0.5;
    return m;
  }

  // ---- FORE: petal-feathers and sparks on a swell (undulates)
  if (layer === "fore") {
    const q = P.div(sc), ax = q.x.abs();
    const pf = io(0.73, 0.79, 0.8, 0.84);
    let col = K, cover = float(0);
    for (let i = 0; i < (low ? 4 : 6); i++) {
      const lo = i < 3, s = c.real.mul(0.022).add(i / 3).fract();
      const x = float(108).sub(s.mul(48));
      const y = float(lo ? -46 : 46).add(s.mul(9).add(c.real.mul(0.8)).add(i).sin().mul(6)).add(s.mul(lo ? 8 : -8));
      const pq = vec2(ax.sub(x), q.y.sub(y));
      const on = maskBeads(pf, i / 6).mul(smoothstep(0, 0.12, s)).mul(smoothstep(1, 0.85, s));
      if (i % 2 === 0) {
        const tq = rot(pq, s.mul(6).add(i).sin().mul(0.8).add(lo ? 0.6 : 2.5));
        const sd = tear(tq, 1.8, 6.5);
        const body = step(sd, 0).mul(on);
        cover = cover.max(body);
        col = mix(col, mix(A, B, 0.4).mul(stroke(sd.abs(), 0.12)).add(H.mul(stroke(tq.length(), 0.5))), body.max(stroke(sd.abs(), 0.12).mul(on)));
      } else {
        const tw = c.real.mul(2.1).add(i).sin().mul(0.3).add(0.7).add(c.kick.mul(0.5));
        const st = step(four(pq, float(2.2).mul(tw)), 1).mul(on);
        cover = cover.max(st);
        col = mix(col, mix(H2, W, 0.6).mul(1.3), st);
      }
    }
    m.colorNode = col;
    m.opacityNode = cover.mul(live);
    m.alphaTest = 0.5;
    return m;
  }

  // ---- BEING: the owl mask (breathes)
  const br = c.real.mul(0.45).sin().mul(0.022).add(1);
  const q = P.sub(vec2(0, CY)).div(br), ax = q.x.abs(), sx = select(q.x.lessThan(0), float(-1), float(1));
  const pLine = io(0.0, 0.14, 0.9, 0.93), pBeak = io(0.155, 0.21, 0.93, 0.96), pBody = io(0.185, 0.26, 0.945, 0.968);
  const pEye = io(0.215, 0.29, 0.915, 0.945), pBrow = io(0.245, 0.31, 0.88, 0.91), pTuft = io(0.275, 0.34, 0.89, 0.92);
  const pFan = io(0.305, 0.4, 0.865, 0.9), pLb = io(0.335, 0.4, 0.895, 0.925), pDia = io(0.43, 0.48, 0.845, 0.88);
  const pWh = io(0.49, 0.56, 0.825, 0.86), pBe = io(0.52, 0.59, 0.815, 0.85), pFb = io(0.61, 0.66, 0.83, 0.865);
  const pIb = io(0.62, 0.67, 0.835, 0.87), pSq = io(0.63, 0.68, 0.81, 0.845), pOc = io(0.65, 0.7, 0.805, 0.84);
  let col = K, lines = float(0);
  const put = (colour, mask) => { col = mix(col, colour, mask); lines = lines.max(mask); };

  // the face: a black shield opening from the centre, outlined by a drawn line, a bead row inside the line
  const e = vec2(ax.div(22), q.y.div(select(q.y.greaterThan(0), float(20), float(25))));
  const sdH = e.length().sub(1).mul(21), ah = atan2(ax, q.y.negate()).div(PI);
  const face = step(sdH, 0).mul(maskIris(pBody, q.length().div(26)));
  put(A.mul(1.1), stroke(sdH.abs(), 0.3).mul(maskDraw(pLine, ah)));
  const hk = ah.mul(PI * 21 / 2.4);
  put(mix(H2, W, 0.2), stroke(vec2(hk.fract().sub(0.5).mul(2.4), sdH.add(2.2)).length(), 0.55).mul(maskBeads(pLb, ah)).mul(step(0.08, ah)));
  // ear tufts: nested teardrops leaning outward, drawn from the head up
  const tq0 = vec2(ax.sub(13), q.y.sub(17)), Dx = 0.47, Dy = 0.88;
  const tl = vec2(tq0.x.mul(-Dy).add(tq0.y.mul(Dx)), tq0.x.mul(Dx).add(tq0.y.mul(Dy)).negate());
  const tAl = tq0.x.mul(Dx).add(tq0.y.mul(Dy)).add(4.5).div(24.5);
  const tdraw = maskDraw(pTuft, tAl);
  const tO = tear(tl, 4.6, 20);
  const tuft = step(tO, 0).mul(tdraw);
  put(B.mul(1.1), stroke(tO.abs(), 0.28).mul(tdraw));
  put(H, stroke(tear(tl.add(vec2(0, 1.4)), 3.0, 13).abs(), 0.22).mul(tdraw));
  put(H2, stroke(tear(tl.add(vec2(0, 2.4)), 1.6, 6.5).abs(), 0.2).mul(tdraw));
  put(W, stroke(vec2(tl.x, tl.y.add(14).div(2.2).fract().sub(0.5).mul(2.2)).length(), 0.45).mul(step(tl.y, -6)).mul(step(-17, tl.y)).mul(step(0.5, rn(16))).mul(tdraw));
  // the beak: three nested teardrops, each drawn round from its tip
  const bq = vec2(q.x, q.y.add(1)), bA = atan2(ax, bq.y.negate()).div(PI);
  put(H, stroke(tear(bq, 4, 11).abs(), 0.28).mul(maskDraw(pBeak.mul(1.3), bA)));
  put(H2, stroke(tear(bq.add(vec2(0, 0.6)), 2.6, 7.2).abs(), 0.24).mul(maskDraw(pBeak.mul(1.3).sub(0.15), bA)));
  put(W, stroke(tear(bq.add(vec2(0, 1.1)), 1.3, 3.8).abs(), 0.22).mul(maskDraw(pBeak.mul(1.3).sub(0.3), bA)));
  // the eyes: ring sets counter-rotating (and mirrored, so the two eyes turn against each other), pupils on a lissajous
  const ev = vec2(ax.sub(9.5), q.y.sub(3.5)), er = ev.length(), ea = atan2(ev.y, ev.x);
  const f1 = pk(5, 3).mul(0.35).add(1), look = cul.mul(0.5).add(1);
  const lx = c.real.mul(0.29).mul(f1).sin().mul(1.6).mul(look), ly = c.real.mul(0.21).add(1).sin().mul(1.1).mul(look);
  const pc = vec2(q.x.sub(sx.mul(9.5)).sub(lx), q.y.sub(3.5).sub(ly)), pr = pc.length();
  const eon = maskIris(pEye, er.div(8.8)), s4 = sense(4);
  put(mix(B, W, 0.2).add(W.mul(c.kick).mul(kickOn).mul(0.6)), stroke(er.sub(8.4).abs(), 0.26).mul(eon));
  const kd = ea.add(c.real.mul(0.35).mul(s4)).div(TAU).mul(14).fract();
  put(H, stroke(er.sub(7.0).abs(), 0.32).mul(step(kd, 0.55)).mul(eon));
  const kb = ea.sub(c.real.mul(0.22).mul(s4)).div(TAU).add(0.5).mul(18);
  put(H2, stroke(vec2(kb.fract().sub(0.5).mul(er.mul(TAU / 18)), er.sub(5.7)).length(), 0.5).mul(maskBeads(pIb, kb.floor().div(18))).mul(eon));
  const pa = atan2(pc.y, pc.x.mul(sx));
  const spokes = step(pa.div(TAU).mul(16).fract(), 0.4).mul(step(2.7, pr)).mul(step(pr, 4.3));
  put(A.mul(1.1), spokes.mul(eon));
  put(W, stroke(er.sub(4.6).abs(), 0.12).mul(eon));
  put(H, stroke(pr.sub(2.6).abs(), 0.18).mul(eon));
  put(K, step(pr, 2.35).mul(eon));
  put(W.mul(1.3), stroke(pc.sub(vec2(-0.7, 0.8)).length(), 0.5).mul(eon));
  // the illusion: the eyes turn to op-art spirals of opposite hand (variant 0) or the face's figure and ground flip (1)
  const ill = pk(6, 2);
  const hyp = step(er, 8.0).mul(cul).mul(is(ill, 0));
  const spiral = pr.mul(0.55).add(pa.div(TAU).mul(3)).sub(c.real.mul(0.9)).fract();
  col = mix(col, mix(K, mix(W, H, step(pr, 3)).mul(1.2), step(spiral, 0.5)), step(0.5, hyp));
  // brows: arcs over the eyes, drawn from the beak outward
  const bw = step(1.6, ev.y).mul(maskDraw(pBrow, inv(ea.div(PI))));
  put(B, stroke(er.sub(10.7).abs(), 0.24).mul(bw));
  put(H2, stroke(er.sub(12.0).abs(), 0.16).mul(bw).mul(step(4.2, ev.y)));
  // a tear under each eye
  put(B, stroke(tear(vec2(ax.sub(9.5), q.y.add(7)), 1.3, 4).abs(), 0.18).mul(eon));
  // forehead diamonds
  const dd = ax.add(q.y.sub(13).abs());
  put(H2, stroke(dd.sub(3.2).abs(), 0.2).mul(maskIris(pDia, dd.div(3.4))));
  put(W, stroke(dd.sub(1.8).abs(), 0.16).max(stroke(dd, 0.6)).mul(maskIris(pDia, dd.div(3.4))));
  // whiskers: three wavy strokes from the beak outward, a bead on each tip
  [[-4.5, 0.12], [-7.5, -0.05], [-10.5, -0.22]].forEach(([y0, sl], i) => {
    const t = ax.sub(4).div(15);
    const yl = float(y0).add(ax.sub(4).mul(sl)).add(ax.mul(1.1).sin().mul(0.5));
    const on = step(0, t).mul(step(t, 1)).mul(maskDraw(pWh.mul(1.2).sub(i * 0.08), t));
    put(mix(A, H, 0.5 * (i % 2)), stroke(q.y.sub(yl).abs(), 0.16).mul(on));
    put(H, stroke(vec2(ax.sub(19.5), q.y.sub(y0 + 15.5 * sl + Math.sin(19.5 * 1.1) * 0.5)).length(), 0.55).mul(maskBeads(pWh, 0.85 + i * 0.05)));
  });
  // below the beak: bead strings (set 0) or nested chevrons (set 1)
  const set = step(0.5, rn(10));
  let beard = float(0);
  [[0, 33], [5, 27]].forEach(([x, y1]) => {
    const along = q.y.negate().sub(13).div(y1 - 13);
    const bk = q.y.negate().sub(13).div(2.3);
    const bd = vec2(ax.sub(x), bk.fract().sub(0.5).mul(2.3)).length();
    const on = step(0, along).mul(step(along, 1)).mul(maskDraw(pBe, along)).mul(inv(set));
    const bb = step(bd, 0.75).mul(on);
    beard = beard.max(bb);
    put(mix(H2, B, bk.floor().mod(2)), stroke(bd, 0.6).mul(on));
  });
  for (let k = 0; k < 4; k++) {
    const yv = q.y.add(15 + k * 3).sub(ax.mul(0.7));
    put(mix(A, H, k % 2), stroke(yv.abs(), 0.2).mul(step(ax, 9 - k * 1.5)).mul(maskBeads(pBe, k / 4)).mul(set));
  }
  // the feather fans, left and right: black bodies with scalloped tips, spines, bead rows, a squiggle, ocelli
  const flap = c.real.mul(0.55).add(0.7).sin().mul(0.06);
  const fq = vec2(ax.sub(20), q.y.add(2)), fr = fq.length(), fa = atan2(fq.y, fq.x).sub(flap);
  const A0 = 0.85, nf = pk(3, 3).add(5), cell = float(2 * A0).div(nf);
  const fk = fa.add(A0).div(cell), fl = fk.fract().sub(0.5);
  const Rf = float(50).sub(fa.div(A0).pow(2).mul(12)), Re = Rf.add(inv(fl.mul(2).pow(2)).mul(3.5));
  const inA = step(fa.abs(), A0), fanG = maskIris(pFan, fr.div(Re));
  const fan = inA.mul(step(fr, Re)).mul(step(3, fr)).mul(fanG);
  const off = fl.abs().mul(cell).mul(fr);
  put(A, stroke(fl.abs().sub(0.5).abs().mul(cell).mul(fr), 0.14).mul(fan).mul(step(6, fr)));
  put(A.mul(1.1), stroke(fr.sub(Re).abs(), 0.24).mul(inA).mul(fanG));
  put(mix(H, H2, fk.floor().mod(2)).mul(0.8), stroke(off, 0.12).mul(fan).mul(step(9, fr)).mul(step(fr, Re.sub(7))));
  const fbk = fr.div(3);
  put(mix(H, H2, fk.floor().mod(2)), stroke(vec2(fbk.fract().sub(0.5).mul(3), off).length(), 0.6).mul(fan).mul(step(11, fr)).mul(step(fr, Re.sub(7))).mul(maskBeads(pFb, fr.div(Re))));
  const arcSq = step(0.5, rn(17));
  const ak = fa.mul(26).div(2.2);
  put(mix(B, W, 0.3), stroke(vec2(ak.fract().sub(0.5).mul(2.2), fr.sub(26)).length(), 0.55).mul(fan).mul(maskBeads(pFb, fa.div(A0).mul(0.5).add(0.5))));
  const sqR = float(34).add(fa.div(cell).mul(TAU * 2).sin().mul(1.1));
  put(mix(H2, B, arcSq), stroke(fr.sub(sqR).abs(), 0.18).mul(fan).mul(maskDraw(pSq, fa.div(A0).mul(0.5).add(0.5))));
  const oc = vec2(fr.sub(Re.sub(4.5)), off).length();
  put(mix(W, H, arcSq), stroke(oc.sub(2.0).abs(), 0.2).max(stroke(oc, 0.8)).mul(fan).mul(maskBeads(pOc, fk.div(nf))));
  // the flip (variant 1): the face's black becomes a lit field and its lines go black
  const flip = step(0.5, cul.mul(is(ill, 1)).mul(face));
  col = mix(col, mix(A.mul(0.6).add(H.mul(0.08)), K, lines), flip);
  const cover = face.max(tuft).max(fan).max(beard).max(lines.mul(step(0.5, lines)));
  m.colorNode = col;
  m.opacityNode = cover.mul(live);
  m.alphaTest = 0.5;
  return m;
}
