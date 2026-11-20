// THE JAGUAR SHAMAN: a mirrored jaguar mask of neon line-art under a headdress fan of feather blades.
// Layers (params.layer): world z-30 hanging op-art vines + dotted rain behind (scrolls) / ring z-12 wreath of stepped crosses (counter-turns) /
// being z0 the mask (breathes) / veil z+10 black broad leaves (sweep) / fore z+22 numeral cartouches + sparkle stars (drift).
// Pacing: eyes open through lids u0-.1 (alone), eye beads .12, nose bridge by nib .16, head line .26, whisker beads .3, vines .2-.5, wreath .4,
// rosettes one by one .44-.6, fangs slide .56, feather fan clock-sweep .62-.78, leaves .58, cartouches .68; LIFO exit .8-1, the world last.
import { MeshBasicNodeMaterial, AdditiveBlending, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep as ss, step, mix, atan2 as atan2raw, fwidth } from "builtin/tsl";
import { tripClock, visionShown, visionU, climb, maskDraw, maskBeads, maskIris, maskLid, inv, is, sgn, segH, rbox, strokeAA, ioU, NEON } from "./lib/trip.js";

const TAU = 6.28318;
const atan2 = (y, x) => atan2raw(y, x.add(1e-5));
const hash = (k, o = 0) => k.mul(12.9898 + o).add(o * 3.1).sin().mul(43758.5453).fract();
const band = (x) => { const e = fwidth(x).mul(0.7).min(0.25); return ss(float(0.25).sub(e), e.add(0.25), x.fract().sub(0.5).abs()); };
// half head line (x mirrored), drawn in this order by the nib
const HEAD = [[0, 12.5], [8, 12.5], [14.5, 8], [15.5, 0], [12, -8], [5.5, -13], [0, -14]];
// rosettes, brow outward: [x, y, r]
const ROS = [[0, 7.7, 1.1], [2.5, 10.6, 1.15], [6.6, 10.3, 1.3], [10.6, 8.5, 1.15], [13, 2.5, 1.2], [12.3, -3, 1.4], [9.3, -4.9, 1.15]];
const WHI = [[15.5, -5.2], [16.5, -9], [14.5, -12.8]];

export function material(ctx) {
  const layer = ctx.params.layer ?? "being", low = ctx.quality === "low";
  const c = tripClock(ctx), u = visionU(ctx, c), live = visionShown(ctx, c, 0), io = ioU(u);
  const rn = (n) => c.rnd(1140 + n), pk = (n, k) => c.pick(1140 + n, k), sense = (n) => sgn(rn(n));
  const { BLU, VIO, PNK, ORA, YEL, GRN, W, BG } = NEON;
  const fam = pk(0, 3), hot = pk(1, 4);
  const A = BLU.mul(is(fam, 0)).add(VIO.mul(is(fam, 1))).add(vec3(0.01, 0.55, 0.5).mul(is(fam, 2)));
  const B = VIO.mul(is(fam, 0)).add(BLU.mul(is(fam, 1))).add(GRN.mul(0.8).mul(is(fam, 2)));
  const hotC = (k) => [PNK, ORA, YEL, GRN].reduce((a, v, i) => a.add(v.mul(is(k, i))), vec3(0));
  const H = hotC(hot), H2 = hotC(hot.add(pk(2, 3)).add(1).mod(4));
  const P = positionGeometry.xy, T = c.real;
  const kOn = step(0.001, c.kick), cl = climb(c);
  const cul = io(0.7, 0.8, 0.86, 0.92).mul(cl.mul(0.4).add(0.6));
  const on = (p) => step(0.004, p);
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  const cutout = (col, cover) => { m.colorNode = col; m.opacityNode = cover.mul(live).clamp(0, 1); m.alphaTest = 0.5; return m; };
  let col = vec3(0), cover = float(0);
  const lay = (b, lit) => { col = mix(col, lit, b); cover = cover.max(b); };

  // ------------------------------------------------------------------ WORLD: the jungle (vines hang and sway, rain falls behind)
  if (layer === "world") {
    const aa = fwidth(P.x).mul(1.2).max(0.02), st = strokeAA(aa);
    const uEnd = inv(float(0.4).div(ctx.param("vw1", -1).sub(ctx.param("vw0", -1)).max(1))).min(0.999);
    const grow = ss(0.2, 0.5, u).add(cl.mul(0.12).mul(on(u.sub(0.2)))).min(1).mul(inv(ss(uEnd, float(1.0005), u)));
    // rain: columns of dots falling at their own speeds, lighting bead by bead
    const g = 3.4, rk = P.x.div(g).floor(), ry = P.y.add(T.mul(hash(rk, 4).mul(9).add(7))).div(g);
    const rid = ry.floor().add(rk.mul(31)), rl = vec2(P.x.div(g).fract().sub(0.5), ry.fract().sub(0.5).mul(1)).length().mul(g);
    const hr = hash(rid, 7), rad = hr.mul(0.4).add(0.22);
    const drop = st(rl.sub(rad), 0).mul(maskBeads(io(0.3, 0.56, 2, 3).mul(grow), hr.mul(7).fract())).mul(step(hash(rk, 2), 0.6));
    lay(drop, mix(mix(A, B, step(0.5, hr)), H2, step(0.88, hr)).mul(0.55).add(W.mul(st(rl, rad.mul(0.3))).mul(0.3)));
    const front = inv(c.beat.fract()).mul(100).sub(50);
    [[11, 1.2, 0.9, 0.6], [19, 2.3, 2.1, 0.95]].slice(low ? 1 : 0).forEach(([sp, w, v, br], j) => {
      const X = P.x.add(T.mul(v).mul(sense(3))).add(j * 5.3);
      const k = X.div(sp).floor(), hk = hash(k, j + 1), yb = float(46).sub(P.y);
      const sway = T.mul(0.5 + j * 0.2).add(k.mul(1.7)).sin().mul(yb.div(60)).mul(4 + j * 2);
      const lx = X.div(sp).fract().sub(0.5).add(hk.sub(0.5).mul(0.4)).mul(sp).sub(sway).abs();
      const pT = grow.mul(1.6).sub(hk.mul(7).fract().mul(0.6)).clamp(0, 1), L = hk.mul(45).add(34).mul(pT);
      const wk = hk.mul(5).fract().mul(0.5).add(0.75).mul(w);
      const tip = vec2(lx, yb.sub(L)).length();
      const body = st(lx.sub(wk), 0).mul(step(yb, L)).max(st(tip.sub(wk.mul(1.7)), 0)).mul(on(pT));
      const kl = inv(ss(0, 7, P.y.sub(front).abs())).mul(kOn);
      const bands = band(yb.sub(lx.mul(0.9)).div(w * 1.6).sub(T.mul(0.15 * (j + 1))));
      const bead = st(tip, wk.mul(0.7)).add(st(tip.sub(wk.mul(1.7)).abs(), w * 0.1));
      lay(body, mix(A, B, step(0.5, hk)).mul(bands).mul(step(yb, L)).mul(kl.mul(0.9).add(br)).add(mix(B, W, 0.4).mul(st(lx.sub(wk).abs(), w * 0.09)).mul(br)).add(H.mul(bead).mul(br)));
    });
    // the canopy's dark comes down with the vines, a scalloped leaf edge
    const leafE = P.x.div(9).fract().sub(0.5).abs().mul(11).add(P.x.div(3.1).fract().sub(0.5).abs().mul(3));
    cover = cover.max(step(float(50).sub(grow.mul(150)).add(leafE), P.y).mul(on(grow)));
    return cutout(col.mul(cul.mul(0.3).add(0.45)), cover);
  }

  // ------------------------------------------------------------------ RING: wreath of stepped crosses (turns against the world; its beads against it)
  if (layer === "ring") {
    const aa = fwidth(P.x).mul(1.2).max(0.01), st = strokeAA(aa);
    const r = P.length(), a0 = atan2(P.x, P.y), sn = sense(3).negate();
    const pX = io(0.4, 0.54, 0.88, 0.93), pD = io(0.46, 0.58, 0.87, 0.91);
    const R = 27, R2 = 22.6, N = pk(5, 3).mul(2).add(12), nD = pk(6, 3).mul(8).add(36);
    const a = a0.add(T.mul(TAU / 70).mul(sn)).add(c.bar.mul(TAU / 2).sin().mul(0.04).mul(kOn));
    const k = a.div(TAU).mul(N).add(0.5).floor(), ac = a.sub(k.mul(TAU).div(N));
    const q = vec2(ac.mul(r), r.sub(R)).abs();
    const bx = (hx, hy) => q.x.sub(hx).max(q.y.sub(hy));
    const d = bx(0.85, 2.55).min(bx(2.55, 0.85)).min(bx(1.7, 1.7));
    // kick: hollow and filled crosses swap places round the wreath
    const par = k.add(c.beat.floor().mul(kOn)).mod(2).abs();
    const cross = mix(st(d.abs(), 0.13), st(d, 0).mul(inv(st(bx(0.6, 0.6), 0))), par).max(st(q.length(), 0.3).mul(inv(par)))
      .mul(maskBeads(pX, k.div(N).mul(sn).add(0.5).fract())).mul(on(pX));
    const ad = a0.sub(T.mul(TAU / 45).mul(sn)), kd = ad.div(TAU).mul(nD).add(0.5).floor();
    const bd = vec2(ad.sub(kd.mul(TAU).div(nD)).mul(R2), r.sub(R2)).length();
    const kl = inv(ss(0, 3, r.sub(c.beat.fract().mul(34)).abs())).mul(kOn);
    const bead = st(bd, 0.36).mul(maskBeads(pD, kd.div(nD).fract())).mul(on(pD));
    const lit = cul.mul(0.6).add(0.6);
    m.colorNode = mix(mix(A, W, 0.15), H2, step(0.5, k.mod(3))).mul(cross).mul(lit).add(mix(H, mix(B, W, 0.3), step(0.5, kd.mod(3))).mul(bead).mul(lit.add(kl)));
    m.opacityNode = live; m.transparent = true; m.blending = AdditiveBlending; m.depthWrite = false;
    return m;
  }

  // ------------------------------------------------------------------ VEIL: black broad leaves sweeping across the face
  if (layer === "veil") {
    const aa = fwidth(P.x).mul(1.2).max(0.01), st = strokeAA(aa);
    const pin = io(0.58, 0.74, 0.83, 0.88);
    [[-40, -19, 0.55, 1], [40, 20, 0.5, -1], [-38, 21, -0.5, 1], [40, -17, -0.45, -1]].slice(0, low ? 2 : 4).forEach(([rx, ry, a0, sd], j) => {
      // each leaf swings on its own clock; on a kick run the bar pulls it back to uncover the mask
      const th = T.mul(0.13 * (1 + j * 0.27)).add(rn(7).mul(TAU)).add(j * 2.1).sin().mul(0.42).add(a0).sub(c.barHit.mul(0.18 * Math.sign(a0)).mul(kOn));
      const L = 44 + j * 3, dx = th.cos().mul(sd), dy = th.sin(), q = P.sub(vec2(rx, ry));
      const t = q.x.mul(dx).add(q.y.mul(dy)).div(L), n = q.y.mul(dx).sub(q.x.mul(dy));
      const tc = t.clamp(0, 1), wv = tc.mul(inv(tc)).mul(4).mul(inv(tc.mul(0.45))).mul(9.5 - j);
      const d = n.abs().sub(wv);
      const pj = pin.mul(1.6).sub(j * 0.2).clamp(0, 1);
      const inside = st(d, 0).mul(step(0, t)).mul(maskDraw(pj, t)).mul(on(pj));
      const vein = st(t.mul(9).sub(n.abs().mul(0.11)).fract().sub(0.5).abs().mul(L / 9), 0.09).mul(0.5);
      lay(inside, BG.add(mix(B, W, 0.3).mul(st(d.abs(), 0.2).add(st(n.abs(), 0.13)).min(1)).mul(0.85)).add((j % 2 ? H : H2).mul(vein).mul(cul.mul(0.5).add(0.35))));
    });
    return cutout(col, cover);
  }

  // ------------------------------------------------------------------ FORE: numeral cartouches drifting, sparkle stars
  if (layer === "fore") {
    const aa = fwidth(P.x).mul(1.2).max(0.01), st = strokeAA(aa);
    const pin = io(0.68, 0.8, 0.8, 0.85), sw = c.beat.floor().mod(2).abs().mul(kOn);
    for (let j = 0; j < (low ? 3 : 5); j++) {
      const pj = pin.mul(1.8).sub(j * 0.17).clamp(0, 1);
      const dirj = j % 2 ? sense(9) : sense(9).negate();
      const xj = T.mul(0.012 * (1 + j * 0.3)).mul(dirj).add(j * 0.23).add(rn(10)).fract().mul(84).sub(42);
      const yj = T.mul(0.3).add(j * 1.4).sin().mul(0.8).add([11.6, -12, 8.6, -9, 13.4][j]);
      const q = P.sub(vec2(xj, yj)), d = rbox(q, [0, 0], 3.3, 1.35, 1.3);
      const inside = st(d, 0).mul(maskLid(pj, q.y.div(1.4))).mul(on(pj));
      // a maya numeral: a bar and j+1 dots
      const dots = st(vec2(q.x.div(1.1).add(0.5 * (j % 3)).fract().sub(0.5).mul(1.1), q.y.sub(0.42)).length(), 0.27).mul(step(q.x.abs(), 0.56 * (1 + j % 3)));
      const bar = st(segH(q, vec2(-1.7, -0.45), vec2(1.7, -0.45)).d, 0.2);
      lay(inside, BG.add(mix([H, H2, GRN][j % 3], W, 0.15).mul(st(d.abs(), 0.13))).add(W.mul(dots)).add(B.add(A).mul(bar)));
      const sx = T.mul(0.09 * (1 + j * 0.3)).add(j * 1.3).add(rn(11).mul(6)).sin().mul(30), sy = T.mul(0.07 * (1 + j * 0.2)).add(j * 2.1).sin().mul(13);
      const s = P.sub(vec2(sx, sy)).abs(), tw = T.mul(1.3).add(j * 1.7).sin().mul(0.25).add(1.15);
      const sd = s.x.max(1e-4).sqrt().add(s.y.max(1e-4).sqrt()).sub(tw);
      // kick: the stars swap hollow for filled
      const star = mix(st(sd, 0), st(sd.abs(), 0.09), j % 2 ? sw : inv(sw)).mul(maskIris(pj, s.length().div(1.6)));
      lay(star, mix(YEL, W, 0.35).mul(cul.mul(0.4).add(0.8)));
    }
    return cutout(col, cover);
  }

  // ------------------------------------------------------------------ THE BEING (breathes)
  const p = P.div(T.mul(TAU / 8).sin().mul(0.016).add(1).mul(0.8));
  const aa = fwidth(p.x).mul(1.2).max(0.008), st = strokeAA(aa);
  const ax = p.x.abs(), q = vec2(ax, p.y), LINE = mix(B, W, 0.55), lit = cul.mul(0.5).add(0.8);
  const ord = pk(11, 2).mul(0.05);

  // the headdress: feather blades fan open one by one from the crown outward, a clock hand passing each
  const nb = pk(6, 3).add(5), r = q.length(), a = atan2(ax, p.y), da = float(2.02).div(nb.add(0.5));
  const pF = io(0.62, 0.78, 0.82, 0.87), k = a.div(da).add(0.5).floor(), ac = a.sub(k.mul(da)).mul(r);
  const pB = pF.mul(nb.add(2)).sub(k).clamp(0, 1), alt = k.add(pk(12, 2)).mod(2);
  const t = r.sub(19.5).div(alt.mul(2.4).add(6.2).mul(cl.mul(0.12).mul(pF).add(0.88))), tc = t.clamp(0, 1);
  const fd = ac.abs().sub(tc.mul(inv(tc)).mul(4).mul(inv(tc.mul(0.4))).mul(r.mul(da).mul(0.52)));
  const blade = st(fd, 0).mul(step(0, t)).mul(step(t, 1)).mul(step(k, nb.add(0.5))).mul(maskDraw(pB, t)).mul(on(pB));
  const fc = mix(mix(A, H2, is(k.mod(3), 1)), H, is(k.mod(3), 2));
  lay(blade, BG.add(fc.mul(band(t.mul(4.5).sub(ac.abs().mul(0.5)).sub(T.mul(0.3).mul(sense(8))))).mul(lit).mul(0.8))
    .add(LINE.mul(st(fd.abs(), 0.17).add(st(ac.abs(), 0.09)).min(1))).add(H.mul(inv(ss(0, 0.08, t.sub(pB).abs())).mul(step(pB, 0.99)).mul(2))));

  // the head line: one pen from the crown round to the chin; ears where it turns
  const pO = io(ord.add(0.26), ord.add(0.4), 0.9, 0.94).mul(6);
  HEAD.slice(0, 6).forEach((h0, i) => {
    const h1 = HEAD[i + 1], sg = segH(q, vec2(h0[0], h0[1]), vec2(h1[0], h1[1])), pS = pO.sub(i).clamp(0, 1);
    lay(st(sg.d, 0.2).mul(maskDraw(pS, sg.h)).mul(on(pS)), LINE.add(H.mul(inv(ss(0, 0.12, sg.h.sub(pS).abs())).mul(step(pS, 0.99)).mul(2))));
  });
  const eq = q.sub(vec2(11.6, 11.1)), er = eq.length(), ea = atan2(eq.x.negate(), eq.y), pEar = pO.sub(1.5).div(2).clamp(0, 1);
  const outF = step(0, q.x.sub(8).mul(4.5).add(q.y.sub(12.5).mul(6.5)));
  lay(st(er.sub(3).abs(), 0.2).max(st(er, 0.8)).mul(outF).mul(step(ea.div(TAU).add(0.5), pEar.mul(1.01))).mul(on(pEar)), mix(LINE, H2, st(er, 0.8)));

  // rosettes bloom one by one from the brow outward; on the kick a wave from the nose swaps ring-and-dot for disc-and-hole
  const pR = io(0.44, 0.6, 0.87, 0.91).mul(7), cnt = pk(9, 3).add(4.5);
  ROS.forEach(([x, y, rr], i) => {
    const d = q.sub(vec2(x, y)).length(), pj = pR.sub(i).clamp(0, 1).mul(step(i, cnt));
    const tog = c.beat.sub(Math.hypot(x, y + 6.5) / 26).floor().mod(2).abs().mul(kOn);
    const shape = mix(st(d.sub(rr).abs(), 0.17).max(st(d, rr * 0.4)), st(d.sub(rr), 0.1).mul(inv(st(d, rr * 0.45))), tog);
    lay(shape.mul(maskIris(pj, d.div(rr + 0.3))).mul(on(pj)), mix(i % 2 ? H : H2, W, tog.mul(0.35)).mul(lit));
  });

  // whisker beads light outward from the muzzle, three rows a side
  const pW = io(float(0.35).sub(ord), float(0.47).sub(ord), 0.9, 0.93);
  WHI.forEach(([x, y], i) => {
    const sg = segH(q, vec2(5, -8.4), vec2(x, y)), len = Math.hypot(x - 5, y + 8.4), tt = sg.h.mul(6);
    const bd = vec2(tt.fract().sub(0.5).mul(len / 6), sg.d).length();
    lay(st(bd, inv(sg.h.mul(0.5)).mul(0.5)).mul(step(0.001, sg.h)).mul(step(sg.h, 0.999)).mul(maskBeads(pW, tt.floor().add(i * 0.3).div(6.5))).mul(on(pW)), mix(i === 1 ? H : W, A, sg.h.mul(0.6)));
  });

  // nose bridge drawn down from the brow, the broad nose opening at its foot, then the mouth line
  const pN = io(0.16, 0.28, 0.93, 0.96).mul(3);
  const br = segH(q, vec2(1.7, 5.6), vec2(3.5, -5)), pN0 = pN.clamp(0, 1);
  lay(st(br.d, 0.18).mul(maskDraw(pN0, br.h)).mul(on(pN0)), LINE.add(H.mul(inv(ss(0, 0.1, br.h.sub(pN0).abs())).mul(step(pN0, 0.99)).mul(2))));
  const dn = p.y.add(5).max(ax.mul(0.75).sub(p.y.add(8.6))).mul(0.8), pN1 = pN.sub(1).clamp(0, 1);
  lay(st(dn, 0).mul(maskIris(pN1, vec2(ax, p.y.add(6.4)).length().div(4.2))).mul(on(pN1)), mix(H.mul(lit), W, st(dn.abs(), 0.2)).mul(inv(st(vec2(ax.sub(1.6), p.y.add(6.1)).length(), 0.5))));
  const mo = segH(q, vec2(0, -8.6), vec2(0, -10)).d.min(segH(q, vec2(0, -10), vec2(4.6, -9.6)).d), pN2 = pN.sub(2).clamp(0, 1);
  lay(st(mo, 0.16).mul(maskDraw(pN2, ax.div(4.6))).mul(on(pN2)), LINE);

  // fangs slide down out of the mouth line
  const pG = io(0.56, 0.64, 0.86, 0.89), tipY = pG.mul(-3.6).sub(9.9), fx = ax.sub(2.5).abs().sub(p.y.sub(tipY).div(3.6).mul(1.05));
  lay(st(fx, 0).mul(step(tipY, p.y)).mul(step(p.y, -9.9)).mul(on(pG)), mix(W, H2, st(fx.abs(), 0.16).mul(0.8)));

  // THE SEED: two eyes opening through their lids; then a bead ring lights round each
  const pE = io(0, 0.1, 0.96, 0.995), e = q.sub(vec2(6.2, 2.5)), el = e.length(), ex = e.x.div(4.6);
  const dl = e.y.abs().sub(inv(ex.mul(ex)).mul(2.7).mul(pE));
  const slit = mix(e.x.abs().sub(inv(e.y.div(2.3).mul(e.y.div(2.3))).mul(0.62)), el.sub(0.95), pk(10, 2));
  // kick: the iris steps through the hot colours
  const iris = hotC(hot.add(c.beat.floor().mul(kOn)).mod(4).abs());
  lay(st(dl, 0).mul(step(ex.abs(), 1)).mul(on(pE)), BG.add(iris.mul(band(el.mul(1.25).sub(T.mul(0.35)))).mul(step(el, 2.4)).mul(inv(st(slit, 0))))
    .add(W.mul(st(el.sub(2.4).abs(), 0.13).add(st(dl.abs(), 0.17)).add(st(slit.abs(), 0.08)).min(1))));
  const pEb = io(0.12, 0.2, 0.94, 0.965), eb = atan2(e.y, e.x).div(TAU).add(0.5).mul(16), kb = eb.floor();
  lay(st(vec2(eb.fract().sub(0.5).mul(5.4 * TAU / 16), el.sub(5.4)).length(), 0.42).mul(maskBeads(pEb, kb.div(16))).mul(on(pEb)), mix(H2, A, step(0.5, kb.mod(2))).mul(lit));
  return cutout(col, cover);
}
