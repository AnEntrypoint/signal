// THE ZODIAC WHEEL: twelve houses of invented glyphs round a calm mirrored sun-face, beaded spokes, seven planets, 36 decans.
// world z-30 star map turning about a pole / ring z-12 decan wheel (counter-turns) / being z0 (breathes) / veil z+10 black hand + planet shadows / fore z+22 comets.
// Seed: the third eye alone; face, eyes, rays, spokes, rims, houses (nib), stars, hand, planets, lines, rings, comets, decans by u .8; LIFO exit, sky last.
import { MeshBasicNodeMaterial, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep as ss, step, mix, atan2 as atan2raw, fwidth } from "builtin/tsl";
import { tripClock, visionShown, visionU, climb, maskDraw, maskBeads, maskIris, maskClock, maskLid, nib, inv, is, sgn, segH, strokeAA, ioU, NEON } from "./lib/trip.js";

const TAU = 6.28318, PI = 3.14159, H12 = TAU / 12;
const atan2 = (y, x) => atan2raw(y, x.add(1e-5));
const hash = (k, o = 0) => k.mul(12.9898 + o).add(o * 3.1).sin().mul(43758.5453).fract();
const fmod = (x, y) => x.sub(x.div(y).floor().mul(y));
const wrapA = (x) => fmod(x.add(PI), TAU).sub(PI);
const seq = (p, rel, N, L) => p.mul(N + L).sub(rel).div(L).clamp(0, 1);
const PR = (i) => 8.2 + i * 0.74, PRAD = (i) => 0.4 + ((i * 0.37) % 1) * 0.26;

export function material(ctx) {
  const layer = ctx.params.layer ?? "being", low = ctx.quality === "low";
  const c = tripClock(ctx), u = visionU(ctx, c), live = visionShown(ctx, c, 0), io = ioU(u);
  const rn = (n) => c.rnd(1300 + n), pk = (n, k) => c.pick(1300 + n, k), sense = (n) => sgn(rn(n));
  const { BLU, VIO, PNK, ORA, YEL, GRN, W, BG } = NEON;
  const fam = pk(0, 4), hot = pk(1, 4);
  const TEAL = vec3(0.01, 0.55, 0.7);
  const A = BLU.mul(is(fam, 0)).add(VIO.mul(is(fam, 1))).add(TEAL.mul(is(fam, 2))).add(GRN.mul(0.8).mul(is(fam, 3)));
  const B = VIO.mul(is(fam, 0)).add(BLU.mul(is(fam, 1).add(is(fam, 3)))).add(VIO.mul(is(fam, 2)));
  const hotC = (k) => [PNK, ORA, YEL, GRN].reduce((a, v, i) => a.add(v.mul(is(k, i))), vec3(0));
  const H = hotC(hot), H2 = hotC(hot.add(pk(2, 3)).add(1).mod(4));
  const P = positionGeometry.xy, T = c.real;
  const kOn = step(0.001, c.kick), cl = climb(c);
  const cul = io(0.66, 0.8, 0.86, 0.93).mul(cl.mul(0.5).add(0.5));
  const on = (p) => step(0.004, p);
  const wsn = sense(3), start = pk(4, 12), dir = sense(5);
  const rot = T.mul(TAU / 150).mul(wsn);
  const rel = (k) => fmod(k.sub(start).mul(dir), 12);
  const br = T.mul(0.45).sin().mul(0.012).add(1).add(cl.mul(cul).mul(0.035));          // the being breathes, swells with the highs
  // the black hand: one house wide, steps a house every 2 bars' worth of seconds
  const hs = T.div(3), handA = start.add(dir.mul(hs.floor().add(ss(0.8, 1, hs.fract())))).add(0.5).mul(H12);
  // planets: same orbits for the face's layer and the veil's shadows
  const plOrder = pk(6, 6).add(1), plOff = pk(7, 7), psn = sense(8);
  const planet = (i) => { const ph = rn(20 + i).mul(TAU).add(T.mul(0.75 / (1 + i * 0.55)).mul(psn)); return { ph, pos: vec2(ph.sin(), ph.cos()).mul(PR(i)), ord: fmod(plOrder.mul(i).add(plOff), 7) }; };
  const pPl = io(0.56, 0.7, 0.87, 0.89);
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  const cutout = (col, cover) => { m.colorNode = col; m.opacityNode = cover.mul(live).clamp(0, 1); m.alphaTest = 0.5; return m; };
  let col = vec3(0), cover = float(0);
  const lay = (b, lit) => { col = mix(col, lit, b); cover = cover.max(b); };
  const blk = (b) => { col = mix(col, BG, b); cover = cover.max(b); };

  // ------------------------------------------------------------------ WORLD: the star map, turning about its pole
  if (layer === "world") {
    const aa = fwidth(P.x).mul(1.2).max(0.02), st = strokeAA(aa);
    const PO = vec2(rn(9).sub(0.5).mul(70), rn(10).mul(18).add(8));
    const th = T.mul(TAU / 260).mul(sense(11)), cs = th.cos(), sn = th.sin();
    const d0 = P.sub(PO), pr = vec2(d0.x.mul(cs).sub(d0.y.mul(sn)), d0.x.mul(sn).add(d0.y.mul(cs)));
    const G = 13, cell = pr.div(G).floor();
    const sid = (cc) => cc.x.mul(57).add(cc.y.mul(113));
    const star = (cc) => { const id = sid(cc); return cc.add(vec2(hash(id, 1), hash(id, 2)).mul(0.6).add(0.2)).mul(G); };
    const pS = io(0.44, 0.62, 0.975, 0.997), pL = io(0.6, 0.72, 0.88, 0.9), pE = io(0.66, 0.74, 0.845, 0.865);
    const lit = cul.mul(0.35).add(0.55);
    // ecliptic rings: dotted, counter to the sky's turn, drawn round the pole by a sweep
    const ae = atan2(d0.x, d0.y).sub(th.mul(1.6)), re = d0.length();
    [44, 78, 116].slice(0, low ? 2 : 3).forEach((R, j) => {
      const sp = 2.6, k = ae.mul(R / sp).add(0.5).floor(), bd = vec2(ae.mul(R / sp).add(0.5).fract().sub(0.5).mul(sp), re.sub(R)).length();
      const big = is(fmod(k, 6), 0);
      const b = st(bd, big.mul(0.25).add(0.32)).mul(maskClock(pE.mul(1.4).sub(j * 0.2).clamp(0, 1), ae.mul(sense(12))));
      lay(b.mul(on(pE)), mix(mix(B, A, 0.4), H2, big).mul(0.7));
    });
    // constellation lines: each draws itself from star to star
    if (!low) {
      const seg = (ca, cb, keep, hk) => {
        const s = segH(pr, star(ca), star(cb)), pj = pL.mul(1.6).sub(hk.mul(0.6)).clamp(0, 1);
        return st(s.d, 0.07).mul(step(hash(sid(ca), keep), 0.42)).mul(maskDraw(pj, s.h)).mul(on(pj));
      };
      const X1 = vec2(1, 0), Y1 = vec2(0, 1);
      const ln = seg(cell, cell.add(X1), 3, hash(sid(cell), 6)).max(seg(cell.sub(X1), cell, 3, hash(sid(cell.sub(X1)), 6)))
        .max(seg(cell, cell.add(Y1), 4, hash(sid(cell), 7))).max(seg(cell.sub(Y1), cell, 4, hash(sid(cell.sub(Y1)), 7)));
      lay(ln, mix(B, W, 0.15).mul(0.75));
    }
    // stars: light outward from the pole, a few with sparkle crosses
    const id = sid(cell), sp = star(cell), q = pr.sub(sp), hs5 = hash(id, 5);
    const ord = sp.length().div(160).clamp(0, 1).mul(0.75).add(hs5.mul(0.25));
    const sz = hash(id, 8).mul(0.5).add(0.32), bright = step(0.8, hash(id, 9));
    const spark = st(q.x.abs(), 0.05).mul(step(q.y.abs(), sz.mul(4))).max(st(q.y.abs(), 0.05).mul(step(q.x.abs(), sz.mul(4)))).mul(bright);
    const sb = st(q.length(), sz).max(spark).mul(maskBeads(pS, ord)).mul(on(pS));
    lay(sb, mix(mix(W, A, hash(id, 10).mul(0.6)), H, step(0.9, hash(id, 11))));
    const pole = st(d0.length(), 1.0).max(st(d0.x.abs(), 0.09).mul(step(d0.y.abs(), 5))).max(st(d0.y.abs(), 0.09).mul(step(d0.x.abs(), 5)));
    lay(pole.mul(maskIris(pS.mul(3).clamp(0, 1), d0.length().div(5))).mul(on(pS)), mix(H, W, 0.5));
    return cutout(col.mul(lit), cover);
  }

  // ------------------------------------------------------------------ RING: the decan wheel, counter-turning
  if (layer === "ring") {
    const aa = fwidth(P.x).mul(1.2).max(0.01), st = strokeAA(aa);
    const r = P.length(), a = atan2(P.x, P.y);
    const ad = a.sub(rot.mul(1.4)).add(c.bar.mul(PI).sin().mul(0.04).mul(kOn));    // rocks against its turn on kicked bars
    const pR = io(0.69, 0.74, 0.83, 0.85), pD = io(0.72, 0.8, 0.8, 0.83);
    const clockA = wrapA(ad.sub(start.mul(H12))).mul(dir);
    const rims = st(r.sub(26.9).abs(), 0.08).max(st(r.sub(29.5).abs(), 0.08)).mul(maskClock(pR, clockA)).mul(on(pR));
    blk(step(26.6, r).mul(step(r, 29.8)).mul(maskClock(pR, clockA)).mul(on(pR)));
    // teeth outward, between the dots, op-art filled / hollow alternating
    const kt = ad.div(TAU / 36).floor(), dt = ad.sub(kt.add(0.5).mul(TAU / 36)).mul(r), ty = r.sub(29.7).div(1.7);
    const tri = dt.abs().sub(inv(ty).mul(0.95)).max(ty.sub(1)).max(ty.negate());
    const fill = is(fmod(kt, 2), 0);
    const tooth = st(tri, 0).mul(fill).max(st(tri.abs(), 0.07)).mul(maskBeads(pR, rel(kt.div(3).floor()).div(12)));
    lay(rims.max(tooth).mul(on(pR)), mix(A, B, fill.mul(0.5)));
    // 36 decans: every third (the house's first) larger; colour steps on each kicked bar
    const kd = ad.div(TAU / 36).add(0.5).floor(), bd = vec2(ad.sub(kd.mul(TAU / 36)).mul(r), r.sub(28.2)).length();
    const first = is(fmod(kd, 3), 0), rad = first.mul(0.24).add(0.42);
    const ci = fmod(kd.add(c.bar.floor().mul(kOn)), 3);
    const dc = H.mul(is(ci, 0)).add(mix(B, W, 0.5).mul(is(ci, 1))).add(H2.mul(is(ci, 2)));
    const dot = st(bd, rad).mul(maskBeads(pD, fmod(kd.sub(start.mul(3)).mul(dir), 36).div(36))).mul(on(pD));
    lay(dot, dc.add(W.mul(st(bd, rad.mul(0.35))).mul(0.6)));
    return cutout(col.mul(cul.mul(0.4).add(0.7)), cover);
  }

  // ------------------------------------------------------------------ VEIL: the black clock hand, the planets' shadows
  if (layer === "veil") {
    const p = P.div(br.mul(0.84)), aa = fwidth(p.x).mul(1.2).max(0.01), st = strokeAA(aa);
    const r = p.length(), aw = atan2(p.x, p.y).add(rot);
    const pV = io(0.5, 0.55, 0.89, 0.905);
    const dA = wrapA(aw.sub(handA)).abs();
    const d = dA.sub(H12 / 2).mul(r).max(float(13.3).sub(r)).max(r.sub(23.2));
    const grow = maskIris(pV, r.sub(13.3).div(10).max(0)).mul(on(pV));
    const hollow = kOn.mul(step(0.75, c.beat.div(4).fract()));                 // last beat of a kicked bar: the hand lets the house through
    blk(st(d, 0).mul(grow).mul(inv(hollow)));
    lay(st(d.abs(), 0.09).mul(grow), mix(A, W, 0.45).mul(cul.mul(0.4).add(0.6)));
    lay(st(vec2(r.sub(23.9), dA.mul(r)).length(), 0.45).mul(grow), H);           // the hand's tip bead
    for (let i = 0; i < (low ? 0 : 7); i++) {
      const pl = planet(i), pI = seq(pPl, pl.ord, 7, 1.5), rad = PRAD(i);
      const sc = pl.pos.add(pl.pos.normalize().mul(rad * 0.75));
      blk(st(p.sub(sc).length(), rad * 0.95).mul(maskIris(pI.mul(2).sub(1).clamp(0, 1), p.sub(sc).length().div(rad))).mul(on(pI.sub(0.5))));
    }
    return cutout(col, cover);
  }

  // ------------------------------------------------------------------ FORE: flame comets crossing, one at a time
  if (layer === "fore") {
    const aa = fwidth(P.x).mul(1.2).max(0.01), st = strokeAA(aa);
    const vw0 = ctx.param("vw0", -1), vw1 = ctx.param("vw1", -1), dur = vw1.sub(vw0).max(0.01);
    for (let j = 0; j < (low ? 3 : 5); j++) {
      const per = 6 + j * 1.3, o = j * 0.37 + 0.11, ph = T.div(per).add(o), f = ph.fract();
      const ts = ph.floor().sub(o).mul(per), cross = 0.5 * per;
      const gate = step(vw0.add(dur.mul(0.68 + j * 0.02)), ts).mul(step(ts, vw0.add(dur.mul(0.83)).min(vw1.sub(cross))));
      const tt = f.div(0.5), act = step(f, 0.5);
      const th = rn(30 + j).sub(0.5).mul(0.9).add(j % 2 ? PI : 0), dv = vec2(th.cos(), th.sin()), nv = vec2(dv.y.negate(), dv.x);
      const pos = dv.mul(tt.mul(200).sub(100)).add(nv.mul(rn(40 + j).sub(0.5).mul(60)));
      const q = P.sub(pos), sz = 1 + (j % 3) * 0.35, R = 1.2 * sz, L = 11 * sz;
      const t = q.dot(dv), lt = t.negate().div(L).clamp(0, 1);
      const n = q.dot(nv).add(t.mul(1.3).sub(T.mul(9)).sin().mul(0.25).mul(lt));
      const w = inv(lt).max(1e-4).sqrt().mul(R);
      const dT = n.abs().sub(w).max(t).max(t.negate().sub(L)).min(vec2(t, n).length().sub(R));
      const body = st(dT, 0).mul(gate).mul(act);
      const zone = lt.mul(3).add(n.abs().div(w.max(0.05)).mul(0.6)).floor();
      const fc = W.mul(is(zone, 0)).add(H.mul(is(zone, 1))).add(H2.mul(is(zone, 2))).add(A.mul(step(2.5, zone)));
      lay(body, mix(BG, fc, st(dT.negate().sub(0.12), 0).max(0)).add(fc.mul(st(dT.abs(), 0.08)).mul(0.5)));
    }
    return cutout(col, cover);
  }

  // ------------------------------------------------------------------ BEING: sun-face, rays, spokes, houses, planets
  const p = P.div(br), aa = fwidth(p.x).mul(1.3).max(0.01), st = strokeAA(aa);
  const r = p.length(), a = atan2(p.x, p.y), q = vec2(p.x.abs(), p.y), aw = a.add(rot);
  const lit = cul.mul(0.5).add(0.65);
  const pSeed = io(0, 0.035, 0.965, 0.975), pFace = io(0.11, 0.19, 0.955, 0.965), pFeat = io(0.16, 0.22, 0.95, 0.955);
  const pRay = io(0.2, 0.27, 0.94, 0.95), pSp = io(0.25, 0.37, 0.925, 0.94), pRim = io(0.3, 0.36, 0.935, 0.945), pHo = io(0.36, 0.58, 0.9, 0.925);
  // rims by clock from the start house; the wheel's disc goes black behind them (it hides the sky)
  const clockA = wrapA(aw.sub(start.mul(H12))).mul(dir);
  const rimM = maskClock(pRim, clockA).mul(on(pRim));
  blk(step(r, 22.9).mul(rimM));
  blk(st(r.sub(4.7), 0).mul(on(pFace)).mul(maskDraw(pFace, a.abs().div(PI))));
  lay(rimM.mul(st(r.sub(13.55).abs(), 0.06).max(st(r.sub(13.95).abs(), 0.05)).max(st(r.sub(22.35).abs(), 0.05)).max(st(r.sub(22.75).abs(), 0.08))), A);
  // planets on their orbits (orbit draws from the planet's place, then the orb grows on it)
  for (let i = 0; i < 7; i++) {
    const pl = planet(i), pI = seq(pPl, pl.ord, 7, 1.5), rad = PRAD(i), R = PR(i);
    const oc = maskClock(pI.mul(2).clamp(0, 1), wrapA(a.sub(pl.ph)).mul(psn));
    lay(st(r.sub(R).abs(), 0.035).mul(oc).mul(on(pI)), B.mul(0.55));
    const dO = p.sub(pl.pos).length(), pp = pI.mul(2).sub(1).clamp(0, 1);
    const orb = st(dO, rad).mul(maskIris(pp, dO.div(rad))).mul(on(pp));
    const pc = hotC(fmod(hot.add(i), 4)).mul(is(fmod(float(i), 2), 0)).add(mix(A, W, 0.25).mul(is(fmod(float(i), 2), 1)));
    lay(orb, mix(pc, W, st(dO, rad * 0.35)));
    if (i === 3) lay(st(vec2(p.x.sub(pl.pos.x), p.y.sub(pl.pos.y).mul(3)).length().sub(rad * 1.9).abs(), 0.05).mul(on(pp)).mul(step(rad * 1.1, dO)), H2);
  }
  // beaded spokes, extending outward one by one with a nib
  const kb = aw.div(H12).add(0.5).floor(), perp = aw.sub(kb.mul(H12)).mul(r), along = r.sub(13.8).div(8.9);
  const pj = seq(pSp, rel(fmod(kb, 12)), 12, 1.5), sm = maskDraw(pj, along).mul(step(0, along)).mul(on(pj));
  const mb = r.sub(13.8).div(1.48).add(0.5).floor(), bdS = vec2(perp, r.sub(13.8).div(1.48).add(0.5).fract().sub(0.5).mul(1.48)).length();
  const bcol = mix(H, H2, is(fmod(mb.add(c.bar.floor().mul(kOn)), 2), 1));
  lay(st(perp.abs(), 0.07).mul(sm), B);
  lay(st(bdS, 0.3).mul(sm).mul(step(along, 1.01)), mix(bcol, W, nib(pj, along, 0.08)));
  // the twelve houses: each glyph drawn with a mirrored nib, round the clock from the start house
  const kh = aw.div(H12).floor(), fk = fmod(kh, 12), dh = aw.sub(kh.add(0.5).mul(H12));
  const g = vec2(r.mul(dh.sin()), r.mul(dh.cos()).sub(18.1)).div(1.12), gq = vec2(g.x.abs(), g.y);
  // kick accent: each time the black hand reaches a house during a kick run it is redrawn with a new glyph and colour
  const vw0 = ctx.param("vw0", -1), k0 = ctx.param("k0", -1), k1 = ctx.param("k1", -1);
  const ka = k0.max(vw0), sA = ka.div(3), sB = T.clamp(ka, k1.max(ka)).div(3);
  const rh = rel(fk), passes = sB.sub(rh).div(12).floor().sub(sA.sub(rh).div(12).floor()).max(0).mul(step(0, k0));
  const vv = fk.mul(5.3).add(passes.mul(7.7)).add(rn(12).mul(97).floor());
  const b0 = step(0.5, hash(vv, 1)), b1 = step(0.5, hash(vv, 2)), b2 = step(0.5, hash(vv, 3)), b3 = step(0.5, hash(vv, 4));
  const ring = st(gq.sub(vec2(0, -0.4)).length().sub(1).abs(), 0.11).mul(mix(step(-0.4, g.y), float(1), b0));
  const horn = st(gq.sub(vec2(1.15, 1.2)).length().sub(1).abs(), 0.11).mul(step(gq.x, 1.15)).mul(step(1.2, g.y));
  const canopy = st(gq.sub(vec2(0, -1.1)).length().sub(2.6).abs(), 0.11).mul(step(1.25, g.y)).mul(step(gq.x, 1.5));
  const crs = st(segH(gq, vec2(0, -1.4), vec2(0, -3)).d, 0.11).max(st(segH(gq, vec2(0, -2.2), vec2(0.75, -2.2)).d, 0.11));
  const ldot = st(gq.sub(vec2(0, -2.3)).length(), 0.34);
  const side = st(gq.sub(vec2(1.95, 0.1)).length(), 0.28), stem = st(segH(gq, vec2(0, 0.7), vec2(0, 2.1)).d, 0.11);
  const glyph = ring.max(mix(canopy, horn, b1)).max(mix(ldot, crs, b2)).max(mix(stem.mul(inv(b1)), side, b3));
  const ph = seq(pHo, rh, 12, 1.6), sG = atan2(gq.x, g.y.add(0.3)).div(PI);
  const gm = glyph.mul(maskDraw(ph, sG)).mul(on(ph));
  const hcol = hotC(hash(vv, 5).mul(4).floor().min(3)), hc = mix(hcol, mix(A, W, 0.3), step(0.75, hash(vv, 6)));
  lay(gm, mix(hc, W, nib(ph, sG, 0.06)));
  lay(st(vec2(g.x, g.y.sub(3.4)).length(), 0.22).mul(step(0.97, ph)), mix(B, W, 0.3));       // a dot above each finished house
  // the sun-face, mirrored and calm
  lay(st(r.sub(4.6).abs(), 0.13).mul(maskDraw(pFace, a.abs().div(PI))).mul(on(pFace)), mix(H, W, nib(pFace, a.abs().div(PI), 0.05)));
  const e = q.sub(vec2(1.65, 0.6)), alm = e.sub(vec2(0, -0.6)).length().sub(0.9).max(e.sub(vec2(0, 0.6)).length().sub(0.9));
  const lid = maskLid(pFeat, e.y.div(0.32)).mul(on(pFeat));
  lay(st(alm.abs(), 0.08).mul(lid), mix(A, W, 0.3));
  lay(st(e.length(), 0.17).mul(maskIris(pFeat, e.length().div(0.2))).mul(on(pFeat)), H);
  const brow = st(q.sub(vec2(1.65, -0.4)).length().sub(1.75).abs(), 0.08).mul(step(1.05, q.y)).mul(maskDraw(pFeat, q.x.sub(1.65).abs().div(1.1)));
  const mouth = st(q.sub(vec2(0, 0.6)).length().sub(2.6).abs(), 0.09).mul(step(q.y, -1.6)).mul(maskDraw(pFeat, q.x.div(1.4)));
  const nose = st(q.sub(vec2(0.35, -0.55)).length(), 0.12).mul(step(0.6, pFeat));
  lay(brow.max(mouth).max(nose).mul(on(pFeat)), mix(B, W, 0.35));
  // ray beads: light from the crown down both sides; more beads as the highs climb; kick swaps hollow and filled
  const NR = pk(13, 3).mul(4).add(12), j = a.div(TAU).mul(NR).add(0.5).floor(), aj = a.sub(j.mul(TAU).div(NR));
  const bi = r.sub(5.35).div(0.78).add(0.5).floor().clamp(0, 3), rb = bi.mul(0.78).add(5.35), rr = float(0.34).sub(bi.mul(0.06));
  const bd = vec2(aj.mul(r), r.sub(rb)).length();
  const order = fmod(j.add(NR.div(2)), NR).sub(NR.div(2)).abs().div(NR.div(2));
  const reach = step(bi, cl.mul(1.6).add(1.5));
  const hollow = kOn.mul(is(fmod(j.add(c.beat.floor()), 2), 1));
  const bead = mix(st(bd, rr), st(bd.sub(rr.mul(0.62)).abs(), rr.mul(0.3)), hollow);
  lay(bead.mul(reach).mul(maskBeads(pRay, order.mul(0.85).add(bi.mul(0.04)))).mul(on(pRay)), mix(H, mix(H2, W, 0.3), is(fmod(bi, 2), 1)));
  // the seed: the third eye, alone on black first and last
  const d3 = p.sub(vec2(0, 2.45)).length();
  lay(st(d3, 0.4).mul(maskIris(pSeed, d3.div(0.42))).mul(on(pSeed)), mix(H, W, st(d3, 0.16)));
  lay(st(d3.sub(0.68).abs(), 0.06).mul(on(pFace)).mul(maskClock(pFace, a)), H2);
  return cutout(col.mul(lit), cover);
}
