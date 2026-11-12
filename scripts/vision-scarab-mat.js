// THE SCARAB (Khepri): mirrored line-art beetle lifting the sun on feathered wings; world dunes/ring cartouche/being/veil obelisks/fore glyphs.
// Seed: eclipse crescent; carapace draws down, legs unfold joint by joint, wing rows fan; LIFO exit, world last.
import { MeshBasicNodeMaterial, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep as ss, step, mix, atan2 as atan2raw, fwidth } from "builtin/tsl";
import { tripClock, visionShown, visionU, climb, maskDraw, maskBeads, maskIris, maskClock, maskEclipse, inv, is, sgn, segH, capsule, strokeAA, ioU, famPick, NEON } from "./lib/trip.js";
const TAU = 6.28318;
const atan2 = (y, x) => atan2raw(y, x.add(1e-5));
const hash = (k, o = 0) => k.mul(12.9898 + o).add(o * 3.1).sin().mul(43758.5453).fract();
const band = (x) => { const e = fwidth(x).mul(0.7).min(0.25); return ss(float(0.25).sub(e), e.add(0.25), x.fract().sub(0.5).abs()); };
const mod2 = (x) => x.add(0.5).div(2).fract().mul(2).floor();
const mod3 = (x) => x.add(0.5).div(3).fract().mul(3).floor();
const ell = (q, cx, cy, rx, ry) => {
  const e = vec2(q.x.sub(cx).div(rx), q.y.sub(cy).div(ry)), l = e.length();
  const g = vec2(q.x.sub(cx).div(rx * rx), q.y.sub(cy).div(ry * ry)).length().max(1e-3);
  return { d: l.sub(1).mul(l.max(0.05)).div(g), e, l };
};
const ramp = (x, w) => inv(ss(0, w, x.abs()));
const LEG = [[[4.5, 2.5], [9.5, 6], [6, 11.3], [7.6, 13.1]], [[6, -1], [12, 1.5], [16.5, -4], [17.2, -6]], [[5.6, -9], [11, -12.5], [5.4, -18.6], [3.6, -19.6]]];
const LW = [0.8, 0.6, 0.32];
const WROW = [[2, 6, 27, -0.45, 0.68, 1.5], [1, 4, 17, -0.33, 0.56, 1.2], [0, 2.4, 10.5, -0.2, 0.46, 0.95]];
export function material(ctx) {
  const layer = ctx.params.layer ?? "being", low = ctx.quality === "low";
  const c = tripClock(ctx), u = visionU(ctx, c), live = visionShown(ctx, c, 0), io = ioU(u);
  const rn = (n) => c.rnd(1200 + n), pk = (n, k) => c.pick(1200 + n, k), sense = (n) => sgn(rn(n));
  const { BLU, VIO, PNK, ORA, YEL, GRN, W, BG } = NEON;
  const fam = pk(0, 3), hot = pk(1, 4);
  const FAMS = [[BLU, VIO], [vec3(0.01, 0.55, 0.75), BLU], [VIO, PNK.mul(0.8)]];
  const A = famPick(FAMS, fam, 0), B = famPick(FAMS, fam, 1);
  const hotC = (k) => [YEL, ORA, PNK, GRN].reduce((a, v, i) => a.add(v.mul(is(k, i))), vec3(0));
  const H = hotC(hot), H2 = hotC(hot.add(pk(2, 3)).add(1).div(4).fract().mul(4).add(0.5).floor().min(3));
  const P = positionGeometry.xy, T = c.real;
  const kOn = step(0.001, c.kick), cl = climb(c), beatN = c.beat.floor().mul(kOn);
  const cul = io(0.66, 0.8, 0.88, 0.94).mul(cl.mul(0.4).add(0.6));
  const on = (p) => step(0.004, p);
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  const cutout = (col, cover) => { m.colorNode = col; m.opacityNode = cover.mul(live).clamp(0, 1); m.alphaTest = 0.5; return m; };
  let col = vec3(0), cover = float(0);
  const lay = (b, lit) => { col = mix(col, lit, b); cover = cover.max(b); };
  // WORLD
  if (layer === "world") {
    const aa = fwidth(P.y).mul(1.2).max(0.02), st = strokeAA(aa);
    const uEnd = inv(float(0.4).div(ctx.param("vw1", -1).sub(ctx.param("vw0", -1)).max(1))).clamp(0.993, 0.999);
    const pL = ss(0.24, 0.34, u).mul(inv(ss(float(0.985), uEnd, u)));
    const pD = ss(0.28, 0.52, u).add(cl.mul(0.05).mul(on(u.sub(0.28)))).min(1).mul(inv(ss(0.962, 0.985, u)));
    const pS = io(0.34, 0.5, 0.94, 0.962);
    const hz = ss(0.3, 0.62, u).mul(20).sub(30).add(ss(0.62, 0.9, u).mul(5));
    const sp = vec2(P.x, P.y.sub(23.5)), sr = sp.length(), g = low ? 6.5 : 4.5;
    const ri = sr.div(g).floor(), rc = ri.add(0.5).mul(g), cnt = rc.mul(TAU / (g * 1.15)).floor().max(1);
    const alt = mod2(ri).mul(2).sub(1);
    const sa = atan2(sp.x, sp.y).add(T.mul(0.018).mul(sense(4)).mul(alt));
    const kk = sa.div(TAU).mul(cnt).add(0.5).floor(), dq = vec2(sa.sub(kk.mul(TAU).div(cnt)).mul(rc), sr.sub(rc)).length();
    const srad = ri.mul(0.035).add(0.3).min(1.2), hs = hash(kk.add(ri.mul(31)), 5);
    const hollow = is(mod2(ri.add(beatN)), 0).mul(kOn);                         // kick: alternate rows go hollow
    const dot = mix(st(dq.sub(srad), 0), st(dq.sub(srad).abs(), 0.09), hollow).mul(step(3, ri)).mul(step(hz.add(1), P.y))
      .mul(maskBeads(pS, ri.div(18).mul(0.6).add(hs.mul(0.4)))).mul(on(pS));
    lay(dot, mix(mix(A, B, mod2(ri)), H2, step(0.86, hs)).mul(0.85).add(W.mul(st(dq, srad.mul(0.3))).mul(0.5)));
    const dir = sense(3), front = hz.sub(c.beat.fract().mul(40));
    const kl = inv(ss(0, 3, P.y.sub(front).abs())).mul(kOn);
    [[0, 1.2, 0.06, 0.4], [6, 2, 0.045, 0.8], [14, 3, 0.035, 1.4], [24, 4.5, 0.025, 2.2]].slice(low ? 1 : 0).forEach(([off, amp, f, v], j) => {
      const pj = pD.mul(1.5).sub(j * 0.15).clamp(0, 1);
      const X = P.x.add(T.mul(v).mul(dir));
      const ridge = hz.sub(off).add(X.mul(f).add(j * 1.7).sin().mul(amp)).add(X.mul(f * 2.3).add(j).sin().mul(amp * 0.35)).sub(inv(pj).mul(90));
      const dd = ridge.sub(P.y);
      const inside = st(dd.negate(), 0).mul(on(pj));
      const per = 0.9 + j * 0.55;
      const stp = band(dd.div(per).sub(T.mul(0.2)));
      const dc = (j % 2 ? B : A).mul(stp).mul(kl.mul(0.6).add(0.7)).add(H2.mul(stp).mul(kl).mul(0.5)).add(mix(B, W, 0.4).mul(st(dd.abs(), 0.14)));
      lay(inside, BG.add(dc));
    });
    const hl = st(P.y.sub(hz).abs(), 0.16).mul(maskDraw(pL, P.x.abs().div(70))).mul(on(pL));
    lay(hl, mix(H, W, 0.45));
    return cutout(col.mul(cul.mul(0.3).add(0.5)), cover);
  }
  // RING
  if (layer === "ring") {
    const aa = fwidth(P.x).mul(1.2).max(0.01), st = strokeAA(aa);
    const rx = 36, ry = 26, E = ell(P, 0, 0, rx, ry), de = E.d, sn = sense(4).negate();
    const t = atan2(E.e.y, E.e.x), Rl = P.length().div(E.l.max(0.05));
    const pR = io(0.36, 0.44, 0.915, 0.94), pB = io(0.42, 0.54, 0.9, 0.925), pK = io(0.52, 0.56, 0.87, 0.885);
    const N = pk(17, 3).mul(6).add(30);
    const ts = t.add(T.mul(TAU / 70).mul(sn));
    const k = ts.div(TAU).mul(N).add(0.5).floor(), la = ts.sub(k.mul(TAU).div(N)).mul(Rl);
    const bl = vec2(la, de).length(), ord = k.div(N).fract();
    const kind = mod3(k.add(pk(18, 3)));
    const ank = st(vec2(la, de.sub(0.55).mul(0.8)).length().sub(0.45).abs(), 0.11)
      .max(st(la.abs(), 0.12).mul(step(de.add(0.6).abs(), 0.7))).max(st(de.add(0.05).abs(), 0.12).mul(step(la.abs(), 0.75)));
    const ra = st(bl, 0.5).max(st(bl.sub(1.1).abs(), 0.1));
    const pyr = st(la.abs().sub(de.negate().add(0.8).mul(0.7)).max(de.negate().sub(0.9)), 0);
    const gly = ra.mul(is(kind, 0)).add(ank.mul(is(kind, 1))).add(pyr.mul(is(kind, 2))).min(1);
    const ci = mod3(k.add(beatN));                                               // kick: colours march bead to bead
    const gc = H.mul(is(ci, 0)).add(H2.mul(is(ci, 1))).add(mix(W, A, 0.3).mul(is(ci, 2)));
    const pb = pB.sub(ord.mul(0.85)).mul(7).clamp(0, 1);
    const bead = st(bl.sub(2.1), 0).mul(maskIris(pb, bl.div(2.1))).mul(on(pb));
    const lit = cul.mul(0.5).add(0.75);
    const tw = t.sub(T.mul(TAU / 50).mul(sn)), sw = maskClock(pR, atan2(P.x.mul(sense(19)), P.y.negate())).mul(on(pR));
    [3.4, -3.4].forEach((o) => {
      const r = st(de.sub(o).abs(), 0.32).mul(sw);
      lay(r, BG.add(mix(A, B, 0.5).mul(band(tw.div(TAU).mul(N.mul(2.5)).add(de.mul(0.5)))).mul(lit)).add(B.mul(0.3)));
    });
    lay(bead, BG.add(gc.mul(gly).mul(lit)).add(mix(B, W, 0.35).mul(st(bl.sub(2).abs(), 0.12))));
    const kq = vec2(P.x.abs().sub(rx + 4), P.y);
    const knot = st(kq.x.abs(), 0.45).mul(maskDraw(pK, kq.y.abs().div(5.5))).mul(step(kq.y.abs(), 5.5)).mul(on(pK))
      .max(st(vec2(kq.x, kq.y.abs().sub(5.5)).length().sub(1).abs(), 0.2).mul(step(0.99, pK)));
    lay(knot, mix(H, W, 0.3).mul(lit));
    return cutout(col, cover);
  }
  // VEIL
  if (layer === "veil") {
    const aa = fwidth(P.x).mul(1.2).max(0.01), st = strokeAA(aa), dir = sense(7);
    const pO = io(0.6, 0.74, 0.845, 0.875), pP = io(0.56, 0.66, 0.86, 0.89);
    [[1, 0.7, 20, 15, 15], [1, 0.95, 74, 11, 11], [0, 1.6, 0, 2.4, 26], [0, 2.3, 47, 1.9, 21], [0, 1.25, 88, 2.8, 30]].forEach(([pyr, v, off, w, h], j) => {
      if (low && (j === 1 || j === 4)) return;
      const pj = (pyr ? pP : pO).mul(1.7).sub((j % 3) * 0.2).clamp(0, 1);
      const X = P.x.add(T.mul(v).mul(dir)).add(off).add(rn(20 + j).mul(40));
      const lx = X.div(120).fract().sub(0.5).mul(120), ax = lx.abs();
      const y = P.y.add(21).add(inv(pj).mul(h + w * 1.4 + 3));
      let d, cap, deco;
      if (pyr) {
        d = ax.sub(float(h).sub(y).mul(w / h)).max(y.negate());
        cap = step(h - 2.6, y);
        deco = st(y.div(2.4).fract().sub(0.5).abs().mul(2.4), 0.07).mul(A).mul(0.35);
      } else {
        const tp = y.div(h).clamp(0, 1);
        const dS = ax.sub(tp.mul(-0.28).add(1).mul(w)).max(y.negate().max(y.sub(h)));
        const dT = ax.sub(float(h + w * 1.3).sub(y).mul(0.72 / 1.3)).max(float(h).sub(y));
        d = dS.min(dT);
        cap = step(h, y);
        deco = st(vec2(lx, y.div(2.2).fract().sub(0.5).mul(2.2)).length().sub(0.32), 0).mul(step(1, y)).mul(step(y, h - 1)).mul(B).mul(0.45);
      }
      const inside = st(d, 0).mul(on(pj));
      const capLit = cap.mul(kOn).mul(mod2(beatN.add(j)));                           // kick: the capstones catch the sun in turn
      lay(inside, BG.add(mix(B, W, 0.3).mul(st(d.abs(), 0.12)).mul(0.6)).add(deco.mul(inv(cap))).add(H.mul(capLit).mul(0.9)));
    });
    return cutout(col, cover);
  }
  // FORE
  if (layer === "fore") {
    const aa = fwidth(P.x).mul(1.2).max(0.01), up = sense(10), k0 = pk(9, 2);
    const pin = io(0.7, 0.8, 0.8, 0.84);
    const LX = [-24, 22, -9, 27, 7];
    for (let j = 0; j < (low ? 3 : 5); j++) {
      const sz = 1.15 + (j % 3) * 0.18, st = strokeAA(aa.div(sz));
      const yj = T.mul(0.011 * (1 + j * 0.17)).mul(up).add(j * 0.29 + 0.1).fract().mul(84).sub(42);
      const xj = T.mul(0.3 + j * 0.05).add(j * 2.1).sin().mul(3).add(LX[j]);
      const ro = T.mul(0.4).add(j * 1.7).sin().mul(0.25), cs = ro.cos(), sn = ro.sin();
      const d0 = P.sub(vec2(xj, yj)).div(sz);
      const q = vec2(d0.x.mul(cs).sub(d0.y.mul(sn)), d0.x.mul(sn).add(d0.y.mul(cs)));
      const frame = capsule(q, [0, -1.5], [0, 1.5], 1.35);
      const bar = q.y.add(3.25).abs().sub(0.16).max(q.x.abs().sub(1.4));
      const pj = pin.mul(1.8).sub(j * 0.16).clamp(0, 1);
      const inside = st(frame, 0).max(st(bar, 0)).mul(maskClock(pj, atan2(q.x, q.y))).mul(on(pj));
      const ank = st(vec2(q.x, q.y.sub(0.75).mul(0.8)).length().sub(0.48).abs(), 0.13)
        .max(st(q.x.abs(), 0.14).mul(step(q.y.add(0.9).abs(), 1.2))).max(st(q.y.add(0.1).abs(), 0.14).mul(step(q.x.abs(), 0.8)));
      const xn = q.x.div(1.15), ey = q.y.sub(0.4);
      const ed = ey.abs().sub(inv(xn.mul(xn)).max(0).mul(0.55));
      const eye = st(ed.abs(), 0.1).mul(step(xn.abs(), 1)).max(st(vec2(q.x, ey).length().sub(0.33), 0))
        .max(st(segH(q, vec2(-0.1, -0.1), vec2(-0.35, -1.5)).d, 0.1)).max(st(segH(q, vec2(0.3, -0.1), vec2(1, -1.2)).d, 0.1));
      const gly = mix(ank, eye, mod2(k0.add(j))).min(1);
      const rim = st(frame.abs(), 0.1).max(st(frame.add(0.35).abs(), 0.06)).max(st(bar.abs(), 0.08));
      lay(inside, BG.add(mix(H, W, 0.2).mul(rim)).add(mix(H2, W, 0.15).mul(gly)).mul(cul.mul(0.3).add(0.85)));
    }
    return cutout(col, cover);
  }
  // THE BEING (breathes, swells with the highs)
  const p = P.div(T.mul(TAU / 8).sin().mul(0.012).add(1).add(cul.mul(0.035)));
  const aa = fwidth(p.x).mul(1.2).max(0.008), st = strokeAA(aa);
  const ax = p.x.abs(), q = vec2(ax, p.y), lit = cul.mul(0.5).add(0.8);
  const gW = ss(0.48, 0.68, u).mul(inv(ss(0.875, 0.91, u))).mul(3);
  const rowFirst = pk(12, 2), nb = pk(11, 3);
  const th = atan2(q.y.sub(2.2), q.x.sub(6.4)), rr = q.sub(vec2(6.4, 2.2)).length();
  WROW.forEach(([r, r0, r1, aLo, aHi, bw]) => {
    if (low && r === 1) return;
    const N = nb.add(5 + r * 2), slot = mix(float(r), float(2 - r), rowFirst);
    const pw = gW.sub(slot).clamp(0, 1);
    const cell = float(aHi - aLo).mul(pw).max(0.02).div(N);
    const k = th.sub(aLo).div(cell).floor().clamp(0, N.sub(1)), ak = k.add(0.5).mul(cell).add(aLo);
    const across = th.sub(ak).mul(rr);
    const R1 = mix(float(r0 + 1), float(r1), pw).mul(cl.mul(0.1).add(0.92));
    const t = rr.sub(r0).div(R1.sub(r0).max(0.5)), tc = t.clamp(0, 1);
    const hw = tc.max(1e-4).sqrt().mul(inv(tc)).mul(bw * 2.6);
    const d = across.abs().sub(hw).max(t.sub(1).mul(R1.sub(r0))).max(t.negate().mul(4));
    const blade = st(d, 0).mul(on(pw));
    const fl = mod2(k.add(r).add(beatN));
    const fillC = mix(A, B, tc).mul(lit).mul(band(tc.mul(4).sub(T.mul(0.15))).mul(0.4).add(0.6));
    lay(blade, mix(BG, fillC, fl).add(mix(B, W, 0.5).mul(st(d.abs(), 0.12))).add(H.mul(st(across.abs(), 0.07)).mul(step(0.15, tc)).mul(0.8)));
  });
  const gL = ss(0.3, 0.48, u).mul(inv(ss(0.935, 0.96, u))).mul(9);
  const ordL = pk(8, 2), revL = pk(13, 2);
  LEG.forEach((J, i) => {
    const ri = mix(float(i), float(2 - i), revL);
    for (let s = 0; s < 3; s++) {
      const pS = gL.sub(mix(ri.mul(3).add(s), ri.add(s * 3), ordL)).clamp(0, 1);
      const sg = segH(q, vec2(J[s][0], J[s][1]), vec2(J[s + 1][0], J[s + 1][1]));
      const d = sg.d.sub(sg.h.mul(-0.25).add(1).mul(LW[s]));
      const body = st(d, 0).mul(maskDraw(pS, sg.h)).mul(on(pS));
      const tip = ramp(sg.h.sub(pS), 0.08).mul(step(pS, 0.99));
      lay(body, BG.add(mix(B, W, 0.45).mul(st(d.abs(), 0.1))).add(A.mul(st(sg.d, LW[s] * 0.3)).mul(lit)).add(H.mul(tip).mul(1.5)));
      if (s < 2) {
        const kd = q.sub(vec2(J[s + 1][0], J[s + 1][1])).length();
        const pk2 = pS.sub(0.85).mul(6.6).clamp(0, 1);
        lay(st(kd.sub(0.8), 0).mul(maskIris(pk2, kd.div(0.8))).mul(on(pk2)), BG.add(H2.mul(st(kd.sub(0.55).abs(), 0.12))).add(W.mul(st(kd, 0.2))));
      }
    }
  });
  const pM = io(0.44, 0.5, 0.89, 0.905), mq = p.sub(vec2(0, -20.4)), md = mq.length();
  const ph = rn(14).mul(0.8).add(0.3).add(T.mul(0.05).sin().mul(0.1));
  const cres = inv(st(mq.sub(vec2(ph.mul(2.6).mul(sense(15)), 0)).length().sub(2.6), 0));
  lay(st(md.sub(2.6), 0).mul(maskIris(pM, md.div(2.6))).mul(on(pM)), BG.add(mix(W, H2, 0.3).mul(cres).mul(lit)).add(B.mul(st(md.sub(2.6).abs(), 0.12))));
  const gC = ss(0.12, 0.32, u).mul(inv(ss(0.95, 0.975, u))).mul(3), nS = pk(16, 3).add(3);
  const seg = (E, cy, ry, i, inner) => {
    const pc = gC.sub(i).clamp(0, 1), yn = inv(p.y.sub(cy).div(ry)).mul(0.5);
    const b = st(E.d, 0).mul(maskDraw(pc, yn)).mul(on(pc));
    const nibL = ramp(yn.sub(pc), 0.03).mul(step(pc, 0.99));
    lay(b, BG.add(inner).add(mix(B, W, 0.55).mul(st(E.d.abs(), 0.16))).add(W.mul(nibL).mul(1.5)));
  };
  const El = ell(q, 0, -7.6, 6.6, 8.6);
  const sw = inv(El.e.y.mul(El.e.y)).clamp(0.01, 1).sqrt(), sx = El.e.x.div(sw).mul(nS);
  const flow = T.mul(1.2).mul(sense(21)).add(El.e.y.mul(4)).sin().mul(0.25).add(0.85);
  seg(El, -7.6, 8.6, 2, mix(A, B, mod2(sx.floor())).mul(band(sx.sub(0.25))).mul(flow).mul(lit).add(W.mul(st(ax, 0.1)).mul(0.8)));
  const Th = ell(q, 0, 1.7, 6, 3.3);
  seg(Th, 1.7, 3.3, 1, A.mul(band(Th.d.mul(0.8).sub(T.mul(0.12)))).mul(lit).mul(0.8));
  const Hd = ell(q, 0, 6.1, 3.7, 2.4), ey = q.sub(vec2(2.5, 5.6)).length();
  seg(Hd, 6.1, 2.4, 0, H.mul(st(ey.sub(0.55), 0)).add(B.mul(band(Hd.d.mul(1.2))).mul(0.6)).mul(lit).add(W.mul(st(ey, 0.18))));
  const R = 7, sv = p.sub(vec2(0, 16)), sd = sv.length(), sdir = sense(6);
  const pE = io(0, 0.2, 0.955, 0.985);
  const ex = sv.x.div(R).mul(sdir), eyy = sv.y.div(R);
  const disc = st(sd.sub(R), 0).mul(maskEclipse(pE, ex, eyy)).mul(on(pE));
  const nR = pk(5, 3).add(3), rf = sd.div(R).mul(nR), ri = rf.floor(), fr = rf.fract();
  const ci = mod3(ri.add(beatN));                                                // kick: ring colours step inward
  const rc = H.mul(is(ci, 0)).add(H2.mul(is(ci, 1))).add(mix(W, H, 0.35).mul(is(ci, 2)));
  const gap = st(fr.min(inv(fr)).mul(R).div(nR), 0.14);
  const rimE = st(vec2(ex.sub(pE.mul(2.2)), eyy).length().sub(1).abs().mul(R), 0.14).mul(step(pE, 0.995));
  lay(disc, BG.add(rc.mul(inv(gap)).mul(lit)).add(W.mul(st(sd, 0.8))).add(W.mul(st(sd.sub(R).abs(), 0.15).max(rimE))));
  const pCr = io(0.66, 0.74, 0.83, 0.86), nC = pk(7, 3).mul(4).add(16), Rc = R + 2.3;
  const sa = atan2(sv.x, sv.y), ka = sa.div(TAU).mul(nC).add(0.5).floor();
  const bq = vec2(sa.sub(ka.mul(TAU).div(nC)).mul(Rc), sd.sub(Rc)).length(), br = cl.mul(0.25).add(0.55);
  const crown = st(bq.sub(br), 0).mul(maskBeads(pCr, ka.abs().div(nC.mul(0.5)))).mul(on(pCr));
  lay(crown, mix(H, H2, mod2(ka)).add(W.mul(st(bq, br.mul(0.35)))).mul(lit));
  return cutout(col, cover);
}
