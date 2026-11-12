// THE ANTLER GOD: a mirrored stag-skull mask of neon line-art under branching antlers hung with phase moons.
// Layers (params.layer): world z-30 striped trunks + dotted canopy (scrolls) / ring z-12 leaf wreath (turns, dots counter-turn) /
// being z0 skull, antlers, moons, third eye, jaw drips (breathes) / veil z+10 black branches (sweep) / fore z+22 leaves + fireflies (fall).
// Pacing: skull alone u0-.15 (bone swelling from its seed line), antlers tine by tine .15-.45, forest rising .2-.45, wreath clock .4-.52,
// chains + waxing moons .48-.68, third eye .6-.72, drips .64, branches / leaves .62-.8; LIFO exit .8-1 (moons drop, tines retract tip-first).
import { MeshBasicNodeMaterial, AdditiveBlending, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep as ss, step, mix, atan2 as atan2raw, fwidth } from "builtin/tsl";
import { tripClock, visionShown, visionU, climb, maskDraw, maskBeads, maskIris, maskClock, inv, is, sgn, smin, segH, capsule, strokeAA, ioU, NEON } from "./lib/trip.js";

const TAU = 6.28318;
const atan2 = (y, x) => atan2raw(y, x.add(1e-5));          // never (0,0): NaN on some GPUs
const hash = (k, o = 0) => k.mul(12.9898 + o).add(o * 3.1).sin().mul(43758.5453).fract();
// antialiased op-art bands of period 1
const band = (x) => { const e = fwidth(x).mul(0.7).min(0.25); return ss(float(0.25).sub(e), e.add(0.25), x.fract().sub(0.5).abs()); };
// half antler (x mirrored): [ax, ay, bx, by, r0, r1, order if interleaved, order if beams first, tine rank]
const SEG = [
  [2.6, -0.5, 8, 5.5, 1.25, 1.05, 0, 0, -1], [8, 5.5, 16, 9.5, 1.05, 0.9, 2, 1, -1], [16, 9.5, 23.5, 16.5, 0.9, 0.7, 4, 2, -1], [23.5, 16.5, 26.5, 23.5, 0.7, 0.2, 6, 3, -1],
  [8, 5.5, 9.5, 16.5, 0.8, 0.15, 1, 4, 0], [16, 9.5, 16.5, 21.5, 0.75, 0.15, 3, 5, 1], [5.2, 2.4, 3.2, 10, 0.7, 0.15, 5, 6, 2], [23.5, 16.5, 31.5, 18.5, 0.6, 0.15, 7, 7, 3],
];

export function material(ctx) {
  const layer = ctx.params.layer ?? "being", low = ctx.quality === "low";
  const c = tripClock(ctx), u = visionU(ctx, c), live = visionShown(ctx, c, 0), io = ioU(u);
  const rn = (n) => c.rnd(1060 + n), pk = (n, k) => c.pick(1060 + n, k), sense = (n) => sgn(rn(n));
  const { BLU, VIO, PNK, ORA, YEL, GRN, W, BG } = NEON;
  const fam = pk(0, 3), hot = pk(1, 4);
  const A = BLU.mul(is(fam, 0)).add(VIO.mul(is(fam, 1))).add(vec3(0.01, 0.5, 0.6).mul(is(fam, 2)));
  const B = VIO.mul(is(fam, 0)).add(BLU.mul(inv(is(fam, 0))));
  const hotC = (k) => [PNK, ORA, YEL, GRN].reduce((a, v, i) => a.add(v.mul(is(k, i))), vec3(0));
  const H = hotC(hot), H2 = hotC(hot.add(pk(2, 3)).add(1).mod(4));
  const P = positionGeometry.xy, T = c.real;
  const kOn = step(0.001, c.kick), cl = climb(c);
  const cul = io(0.7, 0.8, 0.86, 0.92).mul(cl.mul(0.4).add(0.6));
  const on = (p) => step(0.004, p);
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  const cutout = (col, cover) => { m.colorNode = col; m.opacityNode = cover.mul(live).clamp(0, 1); m.alphaTest = 0.5; return m; };

  // ------------------------------------------------------------------ WORLD: the forest (scrolls sideways, three depths)
  if (layer === "world") {
    const aa = fwidth(P.x).mul(1.2).max(0.02), st = strokeAA(aa);
    const uEnd = inv(float(0.4).div(ctx.param("vw1", -1).sub(ctx.param("vw0", -1)).max(1))).min(0.999);
    const grow = ss(0.2, 0.45, u).add(cl.mul(0.1).mul(on(u.sub(0.2)))).min(1).mul(inv(ss(uEnd, float(1.0005), u)));
    const pC = io(0.34, 0.5, 2, 3).mul(grow);
    const front = c.beat.fract().mul(110).sub(45);
    const kl = inv(ss(0, 6, P.y.sub(front).abs())).mul(kOn);
    let col = vec3(0), cover = float(0);
    const lay = (b, lit) => { col = mix(col, lit, b); cover = cover.max(b); };
    [[9, 1.1, 0.5, 8, 2.2, 0.4], [15, 2.2, 1.1, 17, 3.2, 0.62], [27, 4.4, 2.4, 29, 4.6, 0.9]].slice(low ? 1 : 0).forEach(([sp, w, v, yc, g, br], j) => {
      const X = P.x.add(T.mul(v).mul(sense(3))).add(j * 4.1);
      const k = X.div(sp).floor(), hk = hash(k, j + 1);
      const lx = X.div(sp).fract().sub(0.5).add(hk.sub(0.5).mul(0.4)).mul(sp).abs();
      const wk = hk.mul(7).fract().mul(0.6).add(0.7).mul(w);
      // dotted canopy over this row: dots swell with height above a wavy leaf line
      const ycw = X.mul(0.21).add(j).sin().mul(3).add(X.mul(0.07).sin().mul(4)).add(yc);
      const row = P.y.div(g).floor(), qx = X.div(g).add(row.mul(0.5));
      const id = qx.floor().add(row.mul(57)), l = vec2(qx.fract().sub(0.5), P.y.div(g).fract().sub(0.5)).length().mul(g);
      const rad = P.y.sub(ycw).div(14).clamp(0, 1).mul(0.43 * g);
      const hd = hash(id, 9);
      const dot = st(l.sub(rad), 0).mul(step(0.05, rad)).mul(maskBeads(pC, hd));
      lay(dot, mix(mix(A, B, step(0.5, hd)), H2, step(0.86, hd)).mul(br).add(W.mul(st(l.sub(rad.mul(0.3)), 0)).mul(0.5 * br)));
      // the trunk: rises from the ground, chevron op-art bands climbing it
      const pT = grow.mul(1.5).sub(hk.mul(0.5)).clamp(0, 1), hgt = P.y.add(42).div(ycw.add(48));
      const body = st(lx.sub(wk), 0).mul(maskDraw(pT, hgt)).mul(on(pT));
      const bands = band(P.y.add(lx.mul(0.9)).div(w * 1.5).sub(T.mul(0.12 * (j + 1))));
      const tc = mix(A, B, step(0.5, hk)).mul(bands).mul(kl.mul(0.9).add(br)).add(mix(B, W, 0.4).mul(st(lx.sub(wk).abs(), w * 0.09)).mul(br));
      lay(body, tc);
    });
    // darkness rises with the wood as a jagged treeline, so the frame is the forest's, edge to edge
    const tree = P.x.div(7).fract().sub(0.5).abs().mul(12).add(P.x.div(2.3).fract().sub(0.5).abs().mul(3));
    cover = cover.max(step(P.y.add(tree), grow.mul(160).sub(52)).mul(on(grow)));
    return cutout(col.mul(cul.mul(0.3).add(0.42)), cover);
  }

  // ------------------------------------------------------------------ RING: the wreath (turns; its dots turn the other way)
  if (layer === "ring") {
    const p = P.mul(74 / 86), aa = fwidth(p.x).mul(1.2).max(0.01), st = strokeAA(aa);
    const r = p.length(), a0 = atan2(p.x, p.y), sn = sense(4);
    const pL = io(0.4, 0.52, 0.9, 0.95), pD = io(0.48, 0.58, 0.88, 0.93);
    const R = 21.5, R2 = 26.5, N = pk(5, 3).mul(4).add(20), nD = pk(6, 3).mul(6).add(30);
    // the wreath rocks back against its own turn on each bar of a kick run
    const a = a0.add(T.mul(TAU / 80).mul(sn)).add(c.bar.mul(TAU / 2).sin().mul(0.05).mul(kOn));
    const k = a.div(TAU).mul(N).add(0.5).floor(), ac = a.sub(k.mul(TAU).div(N));
    const q = vec2(ac.mul(r), r.sub(R)), qy = q.y.abs().sub(1.9);
    const l = vec2(q.x.mul(0.8).add(qy.mul(0.6)), qy.mul(0.8).sub(q.x.mul(0.6))), lx = l.x.div(2.3);
    const lf = l.y.abs().sub(inv(lx.mul(lx)).mul(0.85));
    const leaf = st(lf.abs(), 0.07).mul(step(lx.abs(), 1)).add(st(l.y.abs(), 0.04).mul(step(lx.abs(), 0.8))).min(1)
      .mul(maskBeads(pL, k.div(N).mul(sn).add(0.5).fract()));
    const stem = st(q.y.abs(), 0.07).mul(maskClock(pL, a0.mul(sn)));
    const ad = a0.sub(T.mul(TAU / 55).mul(sn)), kd = ad.div(TAU).mul(nD).add(0.5).floor();
    const bd = vec2(ad.sub(kd.mul(TAU).div(nD)).mul(R2), r.sub(R2)).length();
    const front = c.beat.fract().mul(34);
    const kl = inv(ss(0, 3, r.sub(front).abs())).mul(kOn);
    const bead = st(bd, 0.45).mul(maskBeads(pD, kd.div(nD).fract()));
    const lit = cul.mul(0.6).add(0.6);
    m.colorNode = mix(GRN, A, 0.35).mul(leaf).add(B.mul(stem)).mul(lit).add(mix(H, mix(B, W, 0.3), step(0.5, kd.mod(3))).mul(bead).mul(lit.add(kl)));
    m.opacityNode = live;
    m.transparent = true;
    m.blending = AdditiveBlending;
    m.depthWrite = false;
    return m;
  }

  // ------------------------------------------------------------------ VEIL: black branches sweeping across in front
  if (layer === "veil") {
    const Pv = P.add(vec2(T.mul(0.07).sin().mul(6).mul(sense(7)), 0));
    const aa = fwidth(P.x).mul(1.2).max(0.01), st = strokeAA(aa);
    const pin = io(0.62, 0.78, 0.83, 0.88);
    let col = vec3(0), cover = float(0);
    [[-64, 31, -0.42, 1], [64, -33, 0.3, -1], [-64, -10, 0.5, 1]].slice(0, low ? 2 : 3).forEach(([rx, ry, a0, sd], j) => {
      const th = T.mul(0.11 * (1 + j * 0.3)).add(rn(8).mul(TAU)).add(j * 2).sin().mul(0.17).add(a0), L = 64 + j * 6;
      const dx = th.cos().mul(sd), dy = th.sin(), q = Pv.sub(vec2(rx, ry));
      const t = q.x.mul(dx).add(q.y.mul(dy)), n = q.y.mul(dx).sub(q.x.mul(dy));
      const rad = inv(t.div(L)).mul(2.6).add(0.4);
      const cell = t.div(7).floor(), tcx = t.div(7).fract().sub(0.5).mul(7);
      const twig = segH(vec2(tcx, n.mul(cell.mod(2).mul(2).sub(1))), vec2(0, 0), vec2(2.6, 6)).d.sub(rad.mul(0.32));
      const d = n.abs().sub(rad).min(twig).max(t.sub(L));
      const pj = pin.mul(1.6).sub(j * 0.3).clamp(0, 1);
      const inside = st(d, 0).mul(maskDraw(pj, t.div(L))).mul(on(pj));
      const run = inv(ss(0, 0.06, t.div(L).sub(c.beat.div(2).fract()).abs())).mul(kOn);
      const beads = st(vec2(t.div(2.4).fract().sub(0.5).mul(2.4), n).length(), 0.36);
      lay2(inside, BG.add(mix(B, W, 0.35).mul(st(d.abs(), 0.15)).mul(0.8)).add((j % 2 ? H : H2).mul(beads).mul(run.mul(1.5).add(0.5))));
    });
    function lay2(b, lit) { col = mix(col, lit, b); cover = cover.max(b); }
    return cutout(col, cover);
  }

  // ------------------------------------------------------------------ FORE: black leaves falling, fireflies
  if (layer === "fore") {
    const aa = fwidth(P.x).mul(1.2).max(0.01);
    const pin = io(0.66, 0.8, 0.8, 0.85);
    let col = vec3(0), cover = float(0);
    for (let j = 0; j < (low ? 4 : 6); j++) {
      const sz = 1.7 + (j % 3) * 0.55, aL = aa.div(sz);
      const yj = inv(T.mul(0.018 * (1 + j * 0.2)).add(j * 0.37).fract()).mul(96).sub(48);
      const xj = T.mul(0.5).add(j * 1.9).sin().mul(4).add(((j * 23.7) % 76) - 38);
      const ro = T.mul(0.8).add(j * 2.3).sin().mul(0.6), cs = ro.cos(), sn = ro.sin();
      const q = P.sub(vec2(xj, yj)).div(sz);
      const lx = q.x.mul(cs).sub(q.y.mul(sn)).abs(), ly = q.x.mul(sn).add(q.y.mul(cs));
      const s = ly.div(3).add(0.5).clamp(0, 1);
      const d = lx.sub(s.max(1e-4).sqrt().mul(inv(s)).mul(2.3)).max(ly.abs().sub(1.5));
      const pj = pin.mul(1.8).sub(j * 0.14).clamp(0, 1);
      const inside = inv(ss(float(0), aL, d)).mul(maskDraw(pj, inv(s))).mul(on(pj));
      const rim = inv(ss(float(0.1), aL.add(0.1), d.abs())).add(inv(ss(float(0.05), aL.add(0.05), lx))).add(band(ly.sub(lx.mul(1.3)).mul(2.2)).mul(0.3));
      col = mix(col, BG.add(mix([H, H2, GRN][j % 3], W, 0.2).mul(rim.min(1)).mul(cul.mul(0.3).add(0.8))), inside); cover = cover.max(inside);
      if (j > 3) continue;
      const fq = P.sub(vec2(T.mul(0.21 * (1 + j * 0.3)).add(j * 1.3).sin().mul(30), T.mul(0.17 * (1 + j * 0.2)).add(j * 2.1).sin().mul(13))).length();
      const bl = T.mul(2).add(j * 1.7).sin().mul(0.5).add(0.5);
      const fly = inv(ss(float(0.3), aa.add(0.3), fq)).max(inv(ss(float(0.07), aa.add(0.07), fq.sub(bl.mul(0.6).add(0.8)).abs()))).mul(maskIris(pj, fq.div(1.6)));
      col = mix(col, mix(YEL, W, 0.3).mul(bl.mul(0.6).add(0.6)), fly); cover = cover.max(fly);
    }
    return cutout(col, cover);
  }

  // ------------------------------------------------------------------ THE BEING (breathes)
  const p = P.div(T.mul(TAU / 9).sin().mul(0.015).add(1));
  const aa = fwidth(p.x).mul(1.2).max(0.008), st = strokeAA(aa);
  const ax = p.x.abs(), q = vec2(ax, p.y);
  let col = vec3(0), cover = float(0);
  const lay = (b, lit) => { col = mix(col, lit, b); cover = cover.max(b); };
  const cnt = pk(4, 3);                                            // 0..2: tines 2..4 a side, moons 3..5 a side

  // bead chains from the beams, a moon on each, every moon its own phase; they wax in, and drop out
  const kc = ax.sub(7.75).div(4.5).floor().clamp(0, 4), xc = kc.mul(4.5).add(10), cx = ax.sub(xc);
  const top = xc.sub(9).mul(0.5).add(xc.sub(17).max(0).mul(0.5)).add(5.5).min(17.1);
  const Lk = hash(kc, 3).mul(5).add(4);
  const pCh = io(0.48, 0.6, 0.86, 0.9).mul(1.6).sub(kc.mul(0.4).add(rn(10)).fract().mul(0.6)).clamp(0, 1);
  const okM = step(7.75, ax).mul(step(kc, cnt.add(2.5)));
  const yb = top.sub(p.y);
  const chain = st(vec2(cx, yb.div(0.9).fract().sub(0.5).mul(0.9)).length(), 0.27).mul(step(0, yb)).mul(maskDraw(pCh, yb.div(Lk))).mul(on(pCh)).mul(okM);
  lay(chain, mix(H, W, 0.25));
  const fall = ss(0.86, 0.91, u), mq = vec2(cx, yb.sub(Lk).sub(1.6).sub(fall.mul(fall).mul(50)).negate()), md = mq.length();
  const ph = kc.mul(0.2).add(rn(11)).add(T.mul(0.02)).fract().mul(0.75).add(0.25);
  const wax = io(0.55, 0.68, 2, 3).mul(3.1).add(c.barHit.mul(0.35));  // the shadow slides on the bar: lit and dark swap ground
  const moonLit = inv(st(mq.sub(vec2(ph.mul(wax).mul(sense(12)), 0)).length().sub(1.5), 0));
  const moon = st(md.sub(1.5), 0).mul(maskIris(pCh.mul(4).sub(3).clamp(0, 1), md.div(1.5))).mul(okM);
  lay(moon, BG.add(mix(W, H2, 0.3).mul(moonLit)).add(B.mul(st(md.sub(1.5).abs(), 0.12))));

  // antlers: each segment draws along its length in branching order; the same clock runs back to retract tip-first
  const g = ss(0.15, 0.45, u).add(cl.mul(0.08).mul(on(u.sub(0.15)))).min(1).mul(inv(ss(0.89, 0.97, u))).mul(8);
  const ord = pk(3, 2), scroll = T.mul(0.5).mul(sense(8)).add(c.bar.mul(TAU / 2).sin().mul(0.5).mul(kOn));
  SEG.slice(0, low ? 6 : 8).forEach(([x0, y0, x1, y1, r0, r1, o0, o1, rank]) => {
    const pS = g.sub(ord.mul(o1 - o0).add(o0)).clamp(0, 1).mul(step(rank, cnt.add(1.5)));
    const sg = segH(q, vec2(x0, y0), vec2(x1, y1)), len = Math.hypot(x1 - x0, y1 - y0);
    const d = sg.d.sub(mix(float(r0), float(r1), sg.h));
    const body = st(d, 0).mul(maskDraw(pS, sg.h)).mul(on(pS));
    const tip = inv(ss(0, 0.1, sg.h.sub(pS).abs())).mul(step(pS, 0.99));
    lay(body, mix(A, B, sg.h).mul(band(sg.h.mul(len * 0.55).sub(scroll))).mul(cul.mul(0.5).add(0.8)).add(mix(B, W, 0.55).mul(st(d.abs(), 0.13))).add(H.mul(tip).mul(2)));
  });

  // the skull: bone swelling out of its seed line, contour bands running through it
  const sd = smin(smin(q.sub(vec2(0, -6)).length().sub(6), capsule(q, [0, -8], [0, -15.5], 2.9), 2.5), q.sub(vec2(5, -8.6)).length().sub(2.1), 1.5);
  const pSk = io(0, 0.13, 0.96, 0.995);
  const skull = st(sd.add(inv(pSk).mul(6.6)), 0).mul(on(pSk));
  const e = q.sub(vec2(3.1, -6.6)).length();
  const brow = st(e.sub(3.1).abs(), 0.09).mul(step(-5.6, p.y));
  lay(skull, BG.add(mix(A, mix(B, W, 0.35), ss(-6, 0, sd)).mul(band(sd.mul(0.6).add(T.mul(0.13).mul(sense(9))))).mul(cul.mul(0.5).add(0.75)))
    .add(mix(B, W, 0.6).mul(st(sd.abs(), 0.16).add(brow))));
  const pE = io(0.08, 0.2, 0.94, 0.97);
  lay(st(e.sub(2.1), 0).mul(maskIris(pE, e.div(2.1))).mul(skull), BG.add(W.mul(st(e.sub(2).abs(), 0.1))).add(H.mul(st(e.sub(1.25).abs(), 0.09))).add(H2.mul(st(e, c.kick.mul(0.25).add(0.5)))));
  const ns = vec2(ax.sub(1.05).div(0.5), p.y.add(14.8).div(1.1)).length();
  lay(st(ns.sub(1), 0).mul(pE).mul(skull), BG.add(H.mul(st(ns.sub(1).abs().mul(0.5), 0.06))));

  // the third eye: a lid between the brows, opening late
  const pT = io(0.6, 0.72, 0.84, 0.88), ty = p.y.add(2.7), tyn = ty.div(1.6);
  const td = ax.sub(inv(tyn.mul(tyn)).mul(pT).mul(1.05));
  const t3 = vec2(p.x, ty).length();
  lay(st(td, 0).mul(step(ty.abs(), 1.6)).mul(on(pT)), BG.add(H.mul(band(t3.mul(1.7).sub(T.mul(0.5))))).add(W.mul(st(t3, 0.32).add(st(td.abs(), 0.09)))));

  // bead-drips off the jaw, three threads, shrinking as they fall
  const pD = io(0.64, 0.74, 0.85, 0.89), kx = ax.div(1.5).add(0.5).floor().min(1), fy = p.y.add(18.3).negate();
  const yy = p.y.add(T.mul(kx.mul(0.4).add(1.3))).div(1.4);
  const drip = st(vec2(ax.sub(kx.mul(1.5)), yy.fract().sub(0.5).mul(1.4)).length().sub(inv(fy.div(7.2)).mul(0.5)), 0)
    .mul(step(0, fy)).mul(maskDraw(pD, fy.div(6.6))).mul(on(pD));
  lay(drip, mix(mix(H, H2, step(0.5, yy.floor().mod(2))), W, 0.2));
  return cutout(col, cover);
}
