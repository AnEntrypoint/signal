// THE SKY WHALE: a great whale seen from the side, swimming left to right through the void above a sea of cloud.
// Layers (params.layer): world z-30 cloud-sea ridges (rise front first, scroll left) + stars / ring z-12 song ripples (expand, beads counter-turn) /
// being z0 whale: eye, spine, contour stripes, pleats, fins + fluke, barnacles, back garden, crescent moon, spout (breathes, undulates) /
// veil z+10 black cloud banks drifting across / fore z+22 a school of ray glyphs.
// Pacing: eye alone u0-.1 (iris opens), spine draws nose->tail with a nib .1-.2, contour stripes fill outward .2-.36, cloud sea rises ridge by ridge .3-.48,
// stars come out .36-.5, pleats / fins + fluke unfold .38-.54 (order by seed), ripples .46-.6, barnacles light nose->tail .5-.6, garden stalk by stalk .58-.7,
// moon eclipse slides off .64-.72, veil banks billow .6-.78, rays .66-.8, spout fountain .72-.8; LIFO exit .8-.99, the world sinks last.
// Kick-gated accents: spout bursts, contour stripes step a quarter phase, ripple beads swap hollow/filled, cloud ridges step colour, pupil goes hollow.
import { MeshBasicNodeMaterial, AdditiveBlending, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep as ss, step, mix, atan2 as atan2raw, fwidth } from "builtin/tsl";
import { tripClock, visionShown, visionU, climb, maskDraw, maskBeads, maskIris, maskEclipse, inv, is, sgn, smin, segH, strokeAA, ioU, NEON } from "./lib/trip.js";

const TAU = 6.28318, PI = 3.14159;
const atan2 = (y, x) => atan2raw(y, x.add(1e-5));
const hash = (k, o = 0) => k.mul(12.9898 + o).add(o * 3.1).sin().mul(43758.5453).fract();
const pm = (x, n) => x.sub(x.div(n).floor().mul(n));            // a mod that stays positive
const band = (x) => { const e = fwidth(x).mul(0.7).min(0.25); return ss(float(0.25).sub(e), e.add(0.25), x.fract().sub(0.5).abs()); };
const TL = -22, NS = 25, BL = 47;                                  // tail root, nose, body length (m)
const hbJ = (t) => (1 + 8.5 * Math.pow(t, 0.8)) * Math.sqrt(Math.max(0, 1 - Math.pow(t, 5)));

export function material(ctx) {
  const layer = ctx.params.layer ?? "being", low = ctx.quality === "low";
  const c = tripClock(ctx), u = visionU(ctx, c), live = visionShown(ctx, c, 0), io = ioU(u);
  const rn = (n) => c.rnd(1220 + n), pk = (n, k) => c.pick(1220 + n, k), sense = (n) => sgn(rn(n));
  const { BLU, VIO, PNK, ORA, YEL, GRN, W, BG } = NEON;
  const fam = pk(0, 4), hot = pk(1, 4);
  const famC = (k, list) => list.reduce((a, v, i) => a.add(v.mul(is(k, i))), vec3(0));
  const A = famC(fam, [BLU, VIO, vec3(0.01, 0.5, 0.6), mix(VIO, PNK, 0.4)]), B = famC(fam, [VIO, BLU, BLU, BLU]);
  const hotC = (k) => famC(k, [PNK, ORA, YEL, GRN]);
  const H = hotC(hot), H2 = hotC(pm(hot.add(pk(2, 3)).add(1), 4));
  const P = positionGeometry.xy, T = c.real, kOn = step(0.001, c.kick), cl = climb(c);
  const kStep = c.beat.max(0).floor().mul(kOn);                   // one step per beat, only while the kick runs
  const swap = step(0.5, c.beat.div(2).fract()).mul(kOn);
  const cul = io(0.66, 0.8, 0.86, 0.93).mul(cl.mul(0.5).add(0.5));
  const on = (p) => step(0.004, p);
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  const cutout = (col, cover) => { m.colorNode = col; m.opacityNode = cover.mul(live).clamp(0, 1); m.alphaTest = 0.5; return m; };
  let col = vec3(0), cover = float(0);
  const lay = (b, lit) => { col = mix(col, lit, b); cover = cover.max(b); };

  // ------------------------------------------------------------------ WORLD: the cloud sea (scrolls left, against the whale) and stars
  if (layer === "world") {
    const aa = fwidth(P.x).mul(1.2).max(0.02), st = strokeAA(aa);
    const dW = sense(3).mul(0.25).sub(1);                           // always leftward, speed by seed
    const pSt = io(0.36, 0.5, 0.9, 0.95), g = 5.5;
    const sx = P.x.add(T.mul(dW).mul(0.35));
    const cx = sx.div(g).floor(), cy = P.y.div(g).floor(), id = cx.add(cy.mul(61)).add(rn(4).mul(97).floor());
    const h1 = hash(id, 1), h2 = hash(id, 2), h3 = hash(id, 5);
    const sc = vec2(sx.div(g).fract().sub(h1.mul(0.6).add(0.2)), P.y.div(g).fract().sub(h2.mul(0.6).add(0.2))).mul(g), sl = sc.length();
    const sr = h3.mul(h3).mul(0.32).add(0.1);
    const tw = T.mul(h1.mul(2).add(0.6)).add(h2.mul(TAU)).sin().mul(0.3).add(0.75);
    const lit = maskBeads(pSt, h2).mul(step(0.45, h3)).mul(on(pSt));
    const star = st(sl.sub(sr), 0).max(st(sl.sub(sr.mul(2.6)).abs(), 0.05).mul(step(0.86, h3))).mul(lit);
    lay(star, mix(mix(B, W, 0.5), H2, step(0.93, h3)).mul(tw));
    const NR = low ? 4 : 5;
    for (let j = 0; j < NR; j++) {                                  // j 0 = far ridge (high), last = near ridge (low)
      const a0 = 0.3 + (NR - 1 - j) * 0.035, x0 = 0.9 + j * 0.016;
      const pR = io(a0, a0 + 0.08, x0, x0 + 0.05);
      const X = P.x.add(T.mul(1.2 + j * 0.9).mul(dW)).add(rn(5 + j).mul(100));
      const w = 8 + j * 2.5, lx = X.div(w).fract().sub(0.5).mul(2), hk = hash(X.div(w).floor(), j + 3);
      const puff = inv(lx.mul(lx)).max(0).sqrt().mul(hk.mul(0.5).add(0.7)).mul(2 + j * 0.9);
      const edge = puff.add(X.mul(0.045).add(j).sin().mul(1.5)).add(-2 - j * 9).sub(inv(pR).mul(90));
      const dd = edge.sub(P.y);
      const inside = st(dd.negate(), 0).mul(on(pR));
      const stripe = band(dd.div(1.3 + j * 0.25).sub(T.mul(0.15)));
      const bc = famC(pm(kStep.add(j), 3), [A, B, H2.mul(0.7)]);
      lay(inside, BG.add(bc.mul(stripe).mul(0.35 + j * 0.08)).add(mix(B, W, 0.4).mul(st(dd.abs(), 0.12 + j * 0.03)).mul(0.7)));
    }
    return cutout(col.mul(cul.mul(0.35).add(0.65)), cover);
  }

  // ------------------------------------------------------------------ RING: ripples of the song (expand outward; alternate rows counter-turn)
  if (layer === "ring") {
    const aa = fwidth(P.x).mul(1.2).max(0.01), st = strokeAA(aa);
    const r = P.length(), a0 = atan2(P.y, P.x), sR = sense(6);
    const pRg = io(0.46, 0.6, 0.88, 0.93), spc = 3.4, sp = T.mul(0.28).mul(cl.mul(0.5).add(0.8));
    const ph = r.div(spc).sub(sp), k = ph.floor(), fr = ph.fract();
    const rk = k.add(0.5).add(sp).mul(spc);
    const nb = pm(k, 3).mul(6).add(30), alt = pm(k, 2);
    const ak = a0.add(T.mul(0.07).mul(sR).mul(alt.mul(2).sub(1)));
    const cell = ak.div(TAU).mul(nb).add(0.5).floor();
    const bd = vec2(ak.sub(cell.mul(TAU).div(nb)).mul(rk), r.sub(rk)).length();
    const br = hash(cell.add(k.mul(7)), 2).mul(0.25).add(0.5);
    const fill = pm(swap.add(alt), 2);
    const bead = mix(st(bd.sub(br.mul(0.72)).abs(), 0.09), st(bd, br), fill);
    const line = st(fr.min(inv(fr)).mul(spc), 0.06);
    const life = ss(5, 9, r).mul(inv(ss(28, 39, r))).mul(maskIris(pRg, r.div(39))).mul(on(pRg));
    const kl = inv(ss(0, 2.5, r.sub(c.beat.fract().mul(40)).abs())).mul(kOn);
    const bc = mix(H, mix(B, W, 0.3), step(0.5, hash(cell, 4)));
    m.colorNode = B.mul(line).mul(0.45).add(bc.mul(bead)).mul(life).mul(cul.mul(0.6).add(0.5).add(kl));
    m.opacityNode = live;
    m.transparent = true;
    m.blending = AdditiveBlending;
    m.depthWrite = false;
    return m;
  }

  // ------------------------------------------------------------------ VEIL: black cloud banks billowing in and drifting across the body
  if (layer === "veil") {
    const aa = fwidth(P.x).mul(1.2).max(0.01), st = strokeAA(aa), dV = sense(7);
    [[-12, 0.0, 3.2], [1, 0.4, 2.4], [9, 0.75, 4.0]].slice(0, low ? 2 : 3).forEach(([yb, o, v], j) => {
      const x0 = 0.83 + (2 - j) * 0.012;
      const pj = io(0.6 + j * 0.05, 0.68 + j * 0.05, x0, x0 + 0.03);
      const xb = T.mul(v).mul(dV).add(rn(8 + j).mul(200)).add(o * 200).div(220).fract().mul(220).sub(110);
      const yc = rn(11 + j).mul(6).add(yb - 3).add(T.mul(0.2 + j * 0.07).sin().mul(1.5));
      const q = P.sub(vec2(xb, yc));
      let d = q.sub(vec2(-9, 0)).length().sub(5);
      [[-3, 2.4, 6.5], [4, 1.4, 5.5], [9.5, -0.4, 4], [0, -1.8, 6]].forEach(([x, y, rr]) => { d = smin(d, q.sub(vec2(x, y)).length().sub(rr), 1.5); });
      d = d.max(q.y.negate().sub(3.2)).add(inv(pj).mul(12));
      const inside = st(d, 0).mul(on(pj));
      const cont = st(d.div(1.6).fract().sub(0.5).abs().mul(1.6), 0.05).mul(step(d, -0.8));
      lay(inside, BG.add(mix(B, W, 0.3).mul(st(d.abs(), 0.1)).mul(0.55)).add(A.mul(cont).mul(0.16)));
    });
    return cutout(col, cover);
  }

  // ------------------------------------------------------------------ FORE: a school of rays gliding past
  if (layer === "fore") {
    const aa = fwidth(P.x).mul(1.2).max(0.01), st = strokeAA(aa);
    const pin = io(0.66, 0.8, 0.8, 0.85), dF = sense(9), lane = rn(10).mul(14).sub(7);
    const sx = T.mul(4).mul(dF).add(rn(12).mul(100)).div(100).fract().mul(100).sub(50);
    for (let j = 0; j < (low ? 4 : 7); j++) {
      const back = Math.floor((j + 1) / 2) * 4.5, side = (j % 2 ? 1 : -1) * Math.ceil(j / 2) * 3.2, sz = 1.25 + (j % 3) * 0.2;
      const cxj = sx.sub(dF.mul(back)), cyj = lane.add(side).add(T.mul(0.6).add(j).sin().mul(1.2));
      const q0 = P.sub(vec2(cxj, cyj)).div(sz), q = vec2(q0.x.mul(dF), q0.y);
      const flap = T.mul(3.2).add(j * 1.3).sin().mul(0.35).add(1);
      const d = q.x.abs().mul(0.9).add(q.y.abs().mul(0.55).div(flap)).sub(1.1).mul(sz);
      const tl = segH(q, vec2(-0.9, 0), vec2(-3.8, T.mul(4).add(j).sin().mul(0.4))).d.mul(sz);
      const pj = pin.mul(1.8).sub(j * 0.11).clamp(0, 1);
      const rev = maskDraw(pj, float(1.2).sub(q.x).div(5)).mul(on(pj));
      const body = st(d, 0).max(st(tl, 0.07)).mul(rev);
      const rim = st(d.abs(), 0.09).add(st(vec2(q.x.sub(0.5), q.y.abs().sub(0.35)).length().mul(sz), 0.14));
      const spine = st(vec2(q.x.mul(2.5).fract().sub(0.5).mul(0.4), q.y).length().mul(sz), 0.08).mul(step(d, -0.2));
      lay(body, BG.add(mix([H, H2, GRN][j % 3], W, 0.2).mul(rim.add(spine).add(st(tl, 0.07)).min(1)).mul(cul.mul(0.3).add(0.8))));
    }
    return cutout(col, cover);
  }

  // ------------------------------------------------------------------ THE WHALE (breathes, undulates)
  const p = P.div(T.mul(TAU / 8).sin().mul(0.012).add(1));
  const aa = fwidth(p.x).mul(1.2).max(0.008), st = strokeAA(aa);
  const bob = T.mul(0.31).sin().mul(0.7).sub(4);
  const tOf = (x) => x.sub(TL).div(BL);
  const spY = (x) => { const t = tOf(x).clamp(0, 1); return inv(t).max(1e-4).pow(1.6).mul(x.mul(0.12).sub(T.mul(0.9)).sin()).mul(2.4).add(bob); };
  const t = tOf(p.x), tc = t.clamp(0, 1);
  const hb = tc.max(1e-4).pow(0.8).mul(8.5).add(1).mul(inv(tc.max(1e-4).pow(5)).max(0).sqrt());
  const hu = hb.mul(0.72), hl = hb.mul(ss(0.6, 0.9, tc).mul(0.12).add(1));
  const sy = spY(p.x), dv = p.y.sub(sy);
  const d = dv.sub(hu).max(dv.negate().sub(hl)).max(t.add(0.06).negate().mul(BL)).max(t.sub(1).mul(BL));
  const v = dv.div(mix(hl, hu, step(0, dv)).max(0.3));
  const ord = pk(3, 2), sB = sense(13);

  // pectoral fin and fluke: folded behind the body, they unfold out of it
  const fA = io(0.38 + 0.08 * 1, 0.54, 0.9, 0.93), fB = io(0.38, 0.46, 0.9, 0.93);
  const pF = mix(fB, fA, ord), pP = mix(fA, fB, ord).mul(1.4).sub(0.4).clamp(0, 1);
  const fr = TL - 2, R0 = vec2(fr, spY(float(fr)));
  const tilt = spY(float(fr)).sub(spY(float(fr + 4))).mul(0.2);
  const spread = mix(float(0.06), float(0.62), pF);
  [-1, 1].forEach((s) => {
    const a = tilt.add(PI).add(spread.mul(s));
    const sg = segH(p, R0, R0.add(vec2(a.cos(), a.sin()).mul(mix(float(4), float(12), pF))));
    const dl = sg.d.sub(mix(float(2.3), float(0.45), sg.h.mul(sg.h)));
    lay(st(dl, 0).mul(on(pF)), BG.add(B.mul(band(sg.h.mul(6).sub(T.mul(0.3)))).mul(0.8)).add(mix(B, W, 0.5).mul(st(dl.abs(), 0.14))));
  });
  const tF = (10 - TL) / BL, F0 = vec2(10, spY(float(10)).sub(hbJ(tF) * 0.72));
  const fa = mix(float(PI + 0.25), float(PI + 1.05), pF).add(T.mul(0.9).sin().mul(0.08));
  const fs = segH(p, F0, F0.add(vec2(fa.cos(), fa.sin()).mul(pF.mul(5.7).add(3.8))));
  const fd = fs.d.sub(mix(float(1.5), float(0.35), fs.h));
  const fbead = st(vec2(fs.h.mul(9).fract().sub(0.5).mul(1.1), fs.d).length(), 0.28);
  lay(st(fd, 0).mul(on(pF)), BG.add(A.mul(band(fs.h.mul(7)))).add(mix(B, W, 0.5).mul(st(fd.abs(), 0.13))).add(H.mul(fbead)));

  // the body: contour stripes fill outward from the spine; on the kick they step a quarter phase
  const pC = io(0.2, 0.36, 0.92, 0.96);
  const body = st(d, 0).mul(maskIris(pC, v.abs())).mul(on(pC));
  const sk = v.mul(5).add(p.x.mul(0.05)).sub(T.mul(0.12).mul(sB)).add(kStep.mul(0.25));
  const tri = pm(sk.floor(), 3);
  const sc = famC(tri, [A, B, H2.mul(0.85)]).mul(band(sk)).mul(cul.mul(0.5).add(0.7));
  lay(body, BG.add(sc).add(mix(B, W, 0.55).mul(st(d.abs(), 0.2))));
  const inBody = st(d, 0).mul(on(pC));

  // throat pleats draw back from the chin
  const lv = v.mul(-11).fract().sub(0.5).abs().mul(hl.div(11));
  const pr = inv(t).div(0.34);
  const pleat = st(lv, 0.07).mul(step(v, -0.3)).mul(step(-0.93, v)).mul(step(0.64, t)).mul(maskDraw(pP, pr)).mul(on(pP)).mul(inBody);
  lay(pleat, mix(W, B, 0.3).add(H.mul(inv(ss(0, 0.06, pr.sub(pP).abs())))));

  // the spine: one line drawn nose to tail by a nib
  const pS = io(0.1, 0.2, 0.94, 0.97), su = inv(t).div(1.06);
  const nibOn = inv(ss(0, 0.025, su.sub(pS).abs())).mul(step(pS, 0.99));
  lay(st(dv.abs(), nibOn.mul(0.35).add(0.15)).mul(maskDraw(pS, su)).mul(on(pS)), mix(H, W, nibOn.mul(0.6).add(0.15)));

  // barnacles: a row of beads lighting nose to tail
  const pB = io(0.5, 0.6, 0.89, 0.92), bi = p.x.add(8).div(2.2).floor().clamp(0, 8);
  const bq = vec2(p.x.sub(bi.mul(2.2).sub(6.9)), dv.add(hl.mul(0.5)));
  const bl = bq.length(), bOn = maskBeads(pB, inv(bi.div(8))).mul(on(pB)).mul(inBody);
  lay(st(bl, 0.85).mul(bOn), BG.add(H2.mul(st(bl, 0.45))).add(mix(B, W, 0.5).mul(st(bl.sub(0.75).abs(), 0.08))));

  // the eye (the seed): an iris opening, a ring of beads turning round it
  const pE = io(0, 0.07, 0.965, 0.99), ev = vec2(p.x.sub(19), dv.add(1.6)), e = ev.length();
  const ea = atan2(ev.y, ev.x).add(T.mul(0.4).mul(sB)), ec = ea.div(TAU).mul(12).add(0.5).floor();
  const ebd = vec2(ea.sub(ec.mul(TAU / 12)).mul(2.2), e.sub(2.2)).length();
  const pupil = mix(st(e, 0.45), st(e.sub(0.45).abs(), 0.08), swap);
  lay(st(e.sub(2.6), 0).mul(maskIris(pE, e.div(2.6))).mul(on(pE)),
    BG.add(W.mul(st(e.sub(1.45).abs(), 0.12))).add(H.mul(st(e.sub(0.95).abs(), 0.18))).add(H2.mul(pupil)).add(mix(B, W, 0.4).mul(st(ebd, 0.26))).mul(cl.mul(0.3).add(1)));

  // the back garden: bead-stalks growing one by one, swaying
  const pG = io(0.58, 0.7, 0.86, 0.9), NG = pk(4, 4).add(5);
  const gi = p.x.add(4).div(2).floor().clamp(0, 7), yy = dv.sub(hu);
  const xs = gi.mul(2).sub(3).add(yy.mul(0.09).mul(T.mul(0.8).add(gi).sin()));
  const gOrd = hash(gi.add(rn(15).mul(31).floor()), 7);
  const gg = pG.mul(1.7).sub(gOrd.mul(0.7)).clamp(0, 1).mul(step(gi, NG.sub(0.5)));
  const Hs = hash(gi, 8).mul(3.5).add(2).mul(cl.mul(0.5).add(1)).mul(gg);
  const gx = p.x.sub(xs).abs();
  const stalk = st(gx, 0.11).mul(step(0, yy)).mul(step(yy, Hs));
  const gbead = st(vec2(gx, yy.div(0.9).fract().sub(0.5).mul(0.9)).length(), 0.2).mul(step(0, yy)).mul(step(yy, Hs));
  const gtop = st(vec2(gx, yy.sub(Hs)).length().sub(0.55), 0).mul(on(gg));
  lay(stalk.max(gbead).max(gtop).mul(on(gg)).mul(on(pG)), mix(GRN, A, 0.3).mul(stalk).add(H.mul(gbead)).add(mix(H2, W, 0.25).mul(gtop)).min(vec3(1.5)));

  // the crescent moon riding above: an eclipse sliding off it
  const pM = io(0.64, 0.72, 0.85, 0.88), sM = sense(14), Rm = 2.4;
  const mq = p.sub(vec2(rn(16).mul(10).sub(2), T.mul(0.27).sin().mul(0.8).add(10.5))), ml = mq.length();
  const crescent = st(ml.sub(Rm), 0).mul(inv(st(mq.sub(vec2(sM.mul(Rm * 0.42), Rm * 0.25)).length().sub(Rm * 0.9), 0)));
  lay(st(ml.sub(Rm), 0).mul(maskEclipse(pM, mq.x.div(Rm), mq.y.div(Rm), 1)).mul(on(pM)),
    BG.add(mix(W, H2, 0.3).mul(crescent)).add(B.mul(st(ml.sub(Rm).abs(), 0.08)).mul(0.6)));

  // the spout: a fountain of beads rising last; on the kick it bursts higher and whiter
  const pSp = io(0.72, 0.8, 0.8, 0.83);
  const hole = vec2(16, spY(float(16)).add(hbJ((16 - TL) / BL) * 0.72));
  const Hh = cl.mul(5).add(9).add(c.kick.mul(4)).mul(pSp);
  let sp = float(0);
  const K = low ? 4 : 8;
  [-1, 0, 1].forEach((s) => {
    for (let j = 0; j < K; j++) {
      const f = T.mul(0.45).add(j / K + s * 0.13).fract();
      const pos = hole.add(vec2(f.mul(f).mul(s * 5.5).mul(c.kick.mul(0.4).add(1)), Hh.mul(f.mul(2).sub(f.mul(f))).mul(s === 0 ? 1.1 : 0.85)));
      sp = sp.max(st(p.sub(pos).length().sub(inv(f.mul(0.5)).mul(0.5)), 0).mul(maskDraw(pSp, f)));
    }
  });
  lay(sp.mul(on(pSp)), mix(mix(B, W, 0.5), W, c.kick).add(H2.mul(0.3)));

  return cutout(col, cover);
}
