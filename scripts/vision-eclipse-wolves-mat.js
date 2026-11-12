// THE ECLIPSE WOLVES: two mirrored neon wolf heads howling up at a central eclipse; a sun and a moon orbit the black disc and the wolves chase them.
// Layers (params.layer): world z-30 striped snow hills, op-art pines, aurora bead ribbons (scroll) / ring z-12 orbit of phase moons (counter-turns) /
// being z0 corona, sun, moon, wolves, fur flames (breathes) / veil z+10 the black disc grows and shrinks, black pines sweep / fore z+22 snow beads, spark stars.
// Pacing: one corona bead alone, beads round the clock, sun/moon slide off the disc, wolves eye-outward one then the other, then world, ring,
// veil, aurora, snow by u .8; LIFO exit .86-1, hills last. Kick only: howl arcs, sun/moon swap, eyes and moons hollow/fill, veil disc shrinks.
import { MeshBasicNodeMaterial, AdditiveBlending, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep as ss, step, mix, atan2 as atan2raw, fwidth } from "builtin/tsl";
import { tripClock, visionShown, visionU, climb, maskDraw, maskBeads, maskIris, maskClock, inv, is, sgn, segH, strokeAA, ioU, NEON } from "./lib/trip.js";

const TAU = 6.28318;
const atan2 = (y, x) => atan2raw(y, x.add(1e-5));
const hash = (k, o = 0) => k.mul(12.9898 + o).add(o * 3.1).sin().mul(43758.5453).fract();
const band = (x) => { const e = fwidth(x).mul(0.7).min(0.25); return ss(float(0.25).sub(e), e.add(0.25), x.fract().sub(0.5).abs()); };
// flame teardrop: round foot at origin radius r, point at +y height h
const tear = (q, r, h) => q.y.lessThan(0).select(q.length().sub(r), q.x.abs().sub(inv(q.y.div(h).clamp(0, 1)).mul(r)).max(q.y.sub(h)));
// half wolf in its own frame (s across, + = crown; a along, + = toward the snout): [s0, a0, s1, a1, draw order]
const WOLF = [
  [3.2, 1, 2.2, 5, 1], [2.2, 5, 1.4, 11.5, 1], [1.4, 11.5, -0.6, 4.5, 2], [-0.6, 4.5, -3.0, 10, 2], [-3.0, 10, -4.2, 3, 3],
  [3.2, 1, 3.6, -0.5, 4], [3.6, -0.5, 8.8, -2.5, 4], [8.8, -2.5, 3.8, -4.5, 5], [3.8, -4.5, 2.6, -7.5, 6], [-4.2, 3, -5.4, -8, 6],
  [2.6, -7.5, 3.6, -18, 7], [-5.4, -8, -6.2, -18, 7],
];

export function material(ctx) {
  const layer = ctx.params.layer ?? "being", low = ctx.quality === "low";
  const c = tripClock(ctx), u = visionU(ctx, c), live = visionShown(ctx, c, 0), io = ioU(u);
  const rn = (n) => c.rnd(1240 + n), pk = (n, k) => c.pick(1240 + n, k), sense = (n) => sgn(rn(n));
  const { BLU, VIO, PNK, ORA, YEL, GRN, W, BG } = NEON;
  const fam = pk(0, 3), hot = pk(1, 4);
  const TEAL = vec3(0.01, 0.55, 0.62);
  const A = BLU.mul(is(fam, 0)).add(VIO.mul(is(fam, 1))).add(TEAL.mul(is(fam, 2)));
  const B = VIO.mul(is(fam, 0)).add(PNK.mul(0.75).mul(is(fam, 1))).add(BLU.mul(is(fam, 2)));
  const hotC = (k) => [PNK, ORA, YEL, GRN].reduce((a, v, i) => a.add(v.mul(is(k, i))), vec3(0));
  const H = hotC(hot), H2 = hotC(hot.add(pk(2, 3)).add(1).mod(4));
  const sp = pk(3, 3), SUN = YEL.mul(is(sp, 0)).add(ORA.mul(is(sp, 1))).add(PNK.mul(is(sp, 2))), MOON = mix(W, A, 0.35);
  const P = positionGeometry.xy, T = c.real;
  const kOn = step(0.001, c.kick), cl = climb(c), odd = c.beat.floor().mod(2).mul(kOn);
  const cul = io(0.7, 0.82, 0.88, 0.94).mul(cl.mul(0.4).add(0.6));
  const so = sense(7);                                             // the sun's orbit sense; the ring counter-turns
  const on = (p) => step(0.004, p);
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  const cutout = (col, cover) => { m.colorNode = col; m.opacityNode = cover.mul(live).clamp(0, 1); m.alphaTest = 0.5; return m; };
  let col = vec3(0), cover = float(0);
  const lay = (b, lit) => { col = mix(col, lit, b); cover = cover.max(b); };

  // ------------------------------------------------------------------ WORLD: snow hills, striped pines, aurora (scrolls)
  if (layer === "world") {
    const aa = fwidth(P.x).mul(1.2).max(0.02), st = strokeAA(aa), sw = sense(8);
    const pA = io(0.6, 0.72, 0.88, 0.91);
    // aurora: ribbons of dots waving across the sky, beads lighting outward from the middle
    [[38, 0.028, 0.4, 2.2], [52, 0.021, -0.3, 2.8]].slice(0, low ? 1 : 2).forEach(([yc, f, v, g], j) => {
      const X = P.x.add(T.mul(1.5).mul(sw).mul(j ? -1 : 1));
      const yr = X.mul(f).add(T.mul(v)).sin().mul(9).add(X.mul(f * 2.3).add(j).sin().mul(3)).add(yc);
      const qx = X.div(g), id = qx.floor(), off = P.y.sub(yr), row = off.div(g).add(0.5).floor();
      const l = vec2(qx.fract().sub(0.5).mul(g), off.sub(row.mul(g))).length();
      const rad = inv(row.abs().div(3.5)).clamp(0, 1).mul(0.36 * g);
      const k = P.x.abs().div(160);
      const dot = st(l.sub(rad), 0).mul(step(0.05, rad)).mul(maskBeads(pA.mul(1.3).sub(j * 0.3).clamp(0, 1), k));
      lay(dot, mix(GRN, A, row.abs().div(3.5).clamp(0, 1)).mul(mix(float(0.55), float(1), hash(id, j))).mul(cul.mul(0.6).add(0.5)));
    });
    // three hill lines, far to near; each line draws itself out from the middle with a nib, its striped snow beneath it
    [[-6, 9, 0.025, 0.6, 3.2], [-20, 8, 0.034, 1.2, 2.6], [-36, 7, 0.045, 2.2, 2.0]].forEach(([yb, amp, f, v, per], j) => {
      const pH = io(0.44 + j * 0.03, 0.54 + j * 0.03, 0.97 - j * 0.004, 0.998 - j * 0.004);
      const X = P.x.add(T.mul(v).mul(sw));
      const hy = X.mul(f).add(j * 2.1).sin().mul(amp).add(X.mul(f * 2.7).add(j).sin().mul(amp * 0.3)).add(yb);
      const dn = hy.sub(P.y), k = P.x.abs().div(165);
      const reveal = maskDraw(pH, k).mul(on(pH));
      const snow = step(0, dn).mul(reveal);
      const stp = band(dn.div(per).add(X.mul(0.01)));
      const br = 0.35 + j * 0.2;
      lay(snow, mix(BG, mix(A, W, 0.25 + j * 0.15), stp).mul(br).add(mix(B, W, 0.5).mul(st(dn.abs(), 0.2)).mul(0.7)));
      const nibL = inv(ss(0, 0.012, k.sub(pH).abs())).mul(st(dn.abs(), 0.6)).mul(step(pH, 0.99)).mul(on(pH));
      lay(nibL, W);
      // pines on this hill: rise trunk-first out of the snow in seeded order, chevron op-art down them
      const pP = io(0.5 + j * 0.03, 0.6 + j * 0.02, 0.92 + j * 0.005, 0.95 + j * 0.005);
      const spc = 13 + j * 6, PX = X.div(spc), kp = PX.floor(), hk = hash(kp, j + 3);
      const lx = PX.fract().sub(0.5).add(hk.sub(0.5).mul(0.5)).mul(spc);
      const ph = 8 + j * 4, py = P.y.sub(hy.add(1)), yn = py.div(ph * 1.3);
      const tier = yn.mul(4).fract().mul(0.45).add(0.55);
      const pd = lx.abs().sub(inv(yn).mul(tier).mul(ph * 0.42)).max(py.negate()).max(yn.sub(1));
      const okP = step(hk, low ? 0.45 : 0.7);
      const pj = pP.mul(1.6).sub(hk.mul(0.6)).clamp(0, 1);
      const pine = st(pd, 0).mul(maskDraw(pj, yn)).mul(on(pj)).mul(okP);
      const chev = band(py.sub(lx.abs().mul(0.9)).div(1.4).sub(T.mul(0.3)));
      lay(pine, mix(BG, mix(B, H2, step(0.82, hk)), chev).mul(br + 0.25).add(W.mul(st(pd.abs(), 0.12)).mul(0.6)));
    });
    return cutout(col.mul(cul.mul(0.25).add(0.5)), cover);
  }

  // ------------------------------------------------------------------ RING: the orbit of phase moons (counter-turns)
  if (layer === "ring") {
    const aa = fwidth(P.x).mul(1.2).max(0.01), st = strokeAA(aa);
    const r = P.length(), a0 = atan2(P.x, P.y);
    const pO = io(0.48, 0.56, 0.9, 0.93), pM = io(0.5, 0.6, 0.89, 0.92);
    const N = pk(4, 3).mul(4).add(12), Rr = 31, mr = 2.3;
    const a = a0.sub(T.mul(TAU / 70).mul(so));
    const kf = a.div(TAU).add(0.5).mul(N), k = kf.add(0.5).floor();
    const q = vec2(kf.sub(k).div(N).mul(TAU).mul(Rr), r.sub(Rr)), md = q.length();
    const phs = k.div(N).add(rn(5)).fract(), ox = phs.mul(2).sub(1).mul(2.2 * mr);
    const lit = step(mr, vec2(q.x.sub(ox), q.y).length());
    const rank = k.div(N).mul(so).add(1).fract();
    const mOn = maskBeads(pM, rank);
    const disc = st(md.sub(mr), 0).mul(mOn), rim = st(md.sub(mr).abs(), 0.12).mul(mOn);
    const filled = inv(odd.mul(step(0.5, rn(6))));                // on half the rolls the kick hollows the moons on odd beats
    const ad = a0.add(T.mul(TAU / 45).mul(so)), nd = N.mul(4), kd = ad.div(TAU).add(0.5).mul(nd), bd = vec2(kd.sub(kd.add(0.5).floor()).div(nd).mul(TAU * 26), r.sub(26)).length();
    const orbit = st(bd, 0.32).mul(maskClock(pO, a0.mul(so)));
    const li = cul.mul(0.6).add(0.6);
    m.colorNode = mix(MOON, H2, step(0.5, k.mod(3)).mul(0.4)).mul(disc.mul(lit).mul(filled)).add(B.mul(rim)).mul(li).add(mix(A, W, 0.3).mul(orbit).mul(li));
    m.opacityNode = live;
    m.transparent = true;
    m.blending = AdditiveBlending;
    m.depthWrite = false;
    return m;
  }

  // ------------------------------------------------------------------ VEIL: the black disc breathes, black pines sweep across
  if (layer === "veil") {
    const aa = fwidth(P.x).mul(1.2).max(0.01), st = strokeAA(aa);
    const pD = io(0.55, 0.68, 0.9, 0.92);
    const e = P.sub(vec2(0, 5.9)), er = e.length();
    const rv = T.mul(0.31).add(rn(9).mul(TAU)).sin().mul(0.5).add(0.5).mul(7).add(3.6).sub(c.barHit.mul(2.2)).mul(pD);  // a bar on the kick uncovers
    const disc = st(er.sub(rv), 0).mul(on(pD));
    const ea = atan2(e.x, e.y), kb = ea.div(TAU).mul(28), bb = vec2(kb.sub(kb.add(0.5).floor()).div(28).mul(TAU).mul(rv), er.sub(rv)).length();
    lay(disc, BG.add(mix(B, W, 0.3).mul(st(er.sub(rv).abs(), 0.1))).add(H.mul(st(bb, 0.22)).mul(0.8)));
    const pP = io(0.66, 0.76, 0.87, 0.89), vs = sense(10);
    [[0, 52, 10, 3.1], [53, 60, 12, 2.4], [107, 46, 9, 3.7]].slice(0, low ? 2 : 3).forEach(([o, ph, wd, v], j) => {
      const xc = T.mul(v).mul(vs).add(o).add(rn(11).mul(160)).mod(170).sub(85);
      const lx = P.x.sub(xc).abs(), py = P.y.add(44), yn = py.div(ph);
      const tier = yn.mul(5).fract().mul(0.5).add(0.5);
      const d = lx.sub(inv(yn).mul(tier).mul(wd)).max(py.negate()).max(yn.sub(1)).min(lx.sub(0.9).max(py.sub(4)));
      const pj = pP.mul(1.5).sub(j * 0.25).clamp(0, 1);
      const pine = st(d, 0).mul(maskDraw(pj, yn)).mul(on(pj));
      lay(pine, BG.add(A.mul(st(d.abs(), 0.1)).mul(0.5)));
    });
    return cutout(col, cover);
  }

  // ------------------------------------------------------------------ FORE: falling snow beads, spark stars
  if (layer === "fore") {
    const aa = fwidth(P.x).mul(1.2).max(0.01), st = strokeAA(aa);
    const pin = io(0.7, 0.8, 0.86, 0.88);
    [[9, 0.05, 0.5], [13, 0.035, 0.75]].forEach(([g, v, rb], j) => {
      const qx = P.x.div(g).add(j * 0.5), kx = qx.floor(), hk = hash(kx, j + 7);
      const yf = inv(T.mul(v).mul(hk.mul(0.6).add(0.7)).add(hk.mul(3.7)).fract()).mul(96).sub(48);
      const xf = kx.add(0.5).mul(g).sub(j * 0.5 * g).add(T.mul(0.6).add(hk.mul(9)).sin().mul(1.4));
      const d = P.sub(vec2(xf, yf)).length(), rr = hk.mul(0.4).add(rb);
      const flake = st(d.sub(rr), 0).mul(maskBeads(pin, hk)).mul(step(hk, low ? 0.4 : 0.65));
      lay(flake, mix(W, A, hk.mul(0.5)).add(H.mul(st(d.sub(rr.mul(0.45)).abs(), 0.06))));
    });
    for (let j = 0; j < (low ? 3 : 5); j++) {
      const sx = T.mul(0.05 + j * 0.013).add(j * 2.3 + 1).sin().mul(62), sy = T.mul(0.04 + j * 0.01).add(j * 1.7).cos().mul(32);
      const q = P.sub(vec2(sx, sy)), ax = q.x.abs(), ay = q.y.abs();
      const tw = T.mul(1.7).add(j * 2.9).sin().mul(0.35).add(0.85);
      const d = ax.mul(5).add(ay).min(ay.mul(5).add(ax)).sub(float(2.6).mul(tw));
      const star = inv(ss(float(0), fwidth(d).max(0.01), d)).mul(maskIris(pin.mul(1.5).sub(j * 0.1).clamp(0, 1), q.length().div(2.6)));
      lay(star, mix([YEL, H, W, H2, YEL][j], W, 0.25));
    }
    return cutout(col, cover);
  }

  // ------------------------------------------------------------------ THE BEING (breathes)
  const p = P.div(T.mul(TAU / 7).sin().mul(0.013).add(1));
  const aa = fwidth(p.x).mul(1.2).max(0.008), st = strokeAA(aa);
  const e = p.sub(vec2(0, 7)), er = e.length(), ea = atan2(e.x, e.y), R = 5;
  const outside = step(R, er);

  // the wolves: one frame for both (mirrored), each side its own progress; drawn eye -> muzzle -> ear -> neck -> fur rows
  const first = pk(6, 2), side = step(0, p.x);
  const pF = ss(0.27, 0.41, u).mul(inv(ss(0.93, 0.955, u))), pS2 = ss(0.4, 0.54, u).mul(inv(ss(0.91, 0.94, u)));
  const pw = mix(pS2, pF, is(side, first)), g = pw.mul(11);
  const q = vec2(p.x.abs(), p.y).sub(vec2(15, -3));
  const s = q.x.mul(0.866).add(q.y.mul(0.5)), a = q.y.mul(0.866).sub(q.x.mul(0.5)), L = vec2(s, a);
  const fl = T.mul(0.6).mul(sense(12)).add(c.bar.mul(TAU / 2).sin().mul(0.4).mul(kOn));
  // fur: rows of flame teardrops down the neck, row after row from the head
  const rowT = a.add(6).negate().div(2.3), rw = rowT.floor(), cs = s.div(2.1).add(rw.mod(2).mul(0.5)), cid = cs.floor();
  const tq = vec2(cs.fract().sub(0.5).mul(2.1), rowT.fract().sub(0.5).mul(-2.3).add(0.6));
  const fr = cl.mul(0.18).add(0.5);
  const td = tear(tq, fr, fr.mul(2.6));
  const sLo = mix(float(-5.2), float(-6.0), a.add(8).negate().div(10).clamp(0, 1)), sHi = mix(float(2.4), float(3.3), a.add(7.5).negate().div(10.5).clamp(0, 1));
  const inNeck = step(sLo, s).mul(step(s, sHi)).mul(step(0, rowT)).mul(step(rowT, 4.9));
  const pFur = g.sub(8).div(3).clamp(0, 1);
  const fur = st(td, 0).mul(inNeck).mul(maskBeads(pFur, rw.add(hash(cid, 2).mul(0.6)).div(5.6))).mul(on(pFur));
  lay(fur, BG.add(mix(mix(H, H2, step(0.5, rw.mod(2))), A, ss(-1, 1, tq.y).mul(0.4)).mul(st(td.abs(), 0.1).add(st(td.add(fr.mul(0.45)), 0).mul(0.6)))));
  WOLF.slice(0, low ? 10 : 12).forEach(([s0, a0, s1, a1, o]) => {
    const pS = g.sub(o).clamp(0, 1);
    const sg = segH(L, vec2(s0, a0), vec2(s1, a1));
    const vis = maskDraw(pS, sg.h).mul(on(pS));
    const line = st(sg.d, 0.26).mul(vis), inner = st(sg.d.sub(0.75).abs(), 0.08).mul(vis);
    const nibD = inv(ss(0, 0.12, sg.h.sub(pS).abs())).mul(st(sg.d, 0.55)).mul(step(pS, 0.99)).mul(on(pS));
    lay(inner.max(line), mix(H, mix(A, W, 0.3).mul(band(sg.h.mul(4).sub(fl)).mul(0.5).add(0.6)), line).mul(cul.mul(0.4).add(0.85)));
    lay(nibD, W);
  });
  // the eye first: an iris opening, pupil filled or hollow by the kick
  const ed = L.sub(vec2(2.0, 3.0)).length(), pE = g.clamp(0, 1);
  const eye = st(ed.sub(1.05), 0).mul(maskIris(pE, ed.div(1.05))).mul(on(pE));
  const pup = mix(st(ed, 0.42), st(ed.sub(0.42).abs(), 0.09), odd);
  lay(eye, BG.add(W.mul(st(ed.sub(0.95).abs(), 0.09))).add(H2.mul(pup)));
  // the howl: one arc a kick leaves each mouth and rolls toward the eclipse
  const mv = L.sub(vec2(-1.0, 8.5)), rr = mv.length(), cone = mv.y.div(rr.max(0.01));
  const ph = rr.sub(1).div(3.5).sub(c.beat.fract());
  const arcD = ph.add(0.5).fract().sub(0.5).abs().mul(3.5);
  const howl = st(arcD, 0.13).mul(ss(0.55, 0.75, cone)).mul(step(0, ph)).mul(step(ph, 3)).mul(kOn).mul(step(0.99, pw)).mul(step(0.5, rr));
  lay(howl, mix(H, W, odd).mul(inv(ph.div(3).clamp(0, 1)).mul(0.8).add(0.4)));

  // sun and moon slide out from behind the black disc and orbit it; the kick swaps their colours
  const th = T.mul(0.22).mul(so).add(rn(13).mul(TAU));
  const pSun = io(0.17, 0.25, 0.96, 0.975), pMoon = io(0.21, 0.29, 0.95, 0.965);
  const sunC = mix(SUN, MOON, odd), moonC = mix(MOON, SUN, odd);
  const sq = e.sub(vec2(th.sin(), th.cos()).mul(pSun.mul(11.5))), sd = sq.length();
  const sunD = st(sd.sub(2.3), 0).mul(outside).mul(on(pSun));
  const rays = st(vec2(atan2(sq.x, sq.y).div(TAU).mul(12).fract().sub(0.5).mul(sd.mul(TAU / 12)), sd.sub(3.2)).length(), 0.3).mul(outside).mul(step(0.98, pSun));
  lay(sunD, BG.add(sunC.mul(band(sd.mul(1.2).sub(T.mul(0.5))).mul(0.7).add(0.3))).add(W.mul(st(sd.sub(2.3).abs(), 0.1))));
  lay(rays, sunC);
  const mq = e.add(vec2(th.sin(), th.cos()).mul(pMoon.mul(11.5))), md = mq.length(), ma = rn(14).mul(TAU);
  const shd = mq.sub(vec2(ma.cos(), ma.sin()).mul(1.1)).length();
  const moon = st(md.sub(2.1), 0).mul(outside).mul(on(pMoon));
  lay(moon, BG.add(moonC.mul(step(2.0, shd))).add(mix(moonC, W, 0.5).mul(st(md.sub(2.1).abs(), 0.08))));

  // the eclipse: black disc, its rim drawn round, the corona beads lit one by one round the clock from one seed bead
  const N = pk(4, 3).mul(6).add(24), rc = 6.6, kf = ea.div(TAU).add(0.5).mul(N), k = kf.add(0.5).floor().mod(N);
  const bd = vec2(kf.sub(kf.add(0.5).floor()).div(N).mul(TAU * rc), er.sub(rc)).length();
  const ks = rn(15).mul(N).floor(), sc = sense(16), rank = k.sub(ks).mul(sc).add(N).mod(N).div(N);
  const isSeed = step(rank, 0.001);
  const br = cl.mul(0.12).add(0.45);
  const pSeed = io(0.0, 0.04, 0.985, 0.995), pB = io(0.05, 0.18, 0.97, 0.985);
  const bOn = mix(maskBeads(pB, rank.sub(0.001)).mul(step(0.004, pB)), maskIris(pSeed, bd.div(br)), isSeed);
  const bead = st(bd.sub(br), 0).mul(bOn);
  lay(bead, mix(mix(H, H2, step(0.5, k.mod(2))), W, isSeed.mul(0.5)).add(W.mul(st(bd, br.mul(0.35)))));
  const pRim = io(0.16, 0.2, 0.965, 0.975);
  lay(st(er.sub(R), 0).mul(on(pRim)), BG.add(mix(B, W, 0.4).mul(st(er.sub(R).abs(), 0.12)).mul(maskClock(pRim, ea.mul(sc)))));
  // flame rays of the corona: teardrops pointing out, hollow/filled swapping on the kick
  const pR = io(0.58, 0.66, 0.89, 0.91), nr = N.div(2), kr = ea.div(TAU).add(0.5).mul(nr), rq = vec2(kr.sub(kr.add(0.5).floor()).div(nr).mul(TAU * 9), er.sub(8.6));
  const rd = tear(rq, cl.mul(0.15).add(0.45), float(2.4).add(cl.mul(1.2)));
  const rOn = maskBeads(pR, kr.add(0.5).floor().mod(nr).div(nr).mul(sc).add(1).fract());
  const fillR = mix(st(rd, 0), st(rd.abs(), 0.1), odd.mul(inv(step(0.5, rn(17)))).max(inv(odd).mul(step(0.5, rn(17)))));
  lay(st(rd, 0).mul(rOn), BG.add(mix(H2, A, 0.3).mul(fillR)));
  return cutout(col, cover);
}
