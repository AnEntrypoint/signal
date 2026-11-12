// THE BEE QUEEN: a mirrored queen-bee mask-figure of neon line-art enthroned in the heart of a honeycomb.
// Layers (params.layer): world z-30 endless comb in perspective (floor + ceiling) with honey drips falling / ring z-12 a wheel of
// worker glyphs on a waggle figure-eight, counter-turning / being z0 seat, abdomen, thorax, eyes, antennae, wings, crown (breathes) /
// veil z+10 black wax caps closing and opening over the comb / fore z+22 pollen and six-petal rosettes drifting.
// Pacing: one hex cell alone (iris) u0-.1, seat cells spiral out .1-.3, comb .3-.5, abdomen stripes stack .3-.4, thorax beads .38-.47,
// workers join .42-.55, head lid + eyes cell by cell .45-.57, antennae (nib) / wings (vein by vein) in seeded order .54-.73,
// drips .5-.62, caps .62-.76, rosettes bloom .66-.8, crown .73-.79; LIFO exit .8-1, the comb last.
import { MeshBasicNodeMaterial, AdditiveBlending, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep as ss, step, mix, atan2 as atan2raw, fwidth } from "builtin/tsl";
import { tripClock, visionShown, visionU, climb, maskDraw, maskBeads, maskIris, maskLid, nib, inv, is, sgn, segH, strokeAA, ioU, NEON } from "./lib/trip.js";

const TAU = 6.28318, S3 = 1.7320508;
const atan2 = (y, x) => atan2raw(y, x.add(1e-5));
const hash = (k, o = 0) => k.mul(12.9898 + o).add(o * 3.1).sin().mul(43758.5453).fract();
const h2 = (id, o = 0) => hash(id.x.add(id.y.mul(57.31)), o);
const fm = (x, y) => x.sub(x.div(y).floor().mul(y));          // floor-mod, safe for negatives
// pointy-top hex cells, centre spacing s: g local (cell units), id the centre (cell units), e 0 centre .. .5 rim
const hexCell = (p, s) => {
  const qq = p.div(s), R = vec2(1, S3), Hh = vec2(0.5, S3 / 2);
  const a = fm(qq, R).sub(Hh), b = fm(qq.sub(Hh), R).sub(Hh);
  const g = mix(b, a, step(a.dot(a), b.dot(b))), ga = g.abs();
  return { g, id: qq.sub(g), e: ga.x.max(ga.x.mul(0.5).add(ga.y.mul(S3 / 2))) };
};
const ANT = [[2.6, 13.2], [4.2, 16.5], [6.5, 19.2], [9.2, 20.4], [11.2, 19.4], [11.3, 17.5], [9.8, 17.2]];

export function material(ctx) {
  const layer = ctx.params.layer ?? "being", low = ctx.quality === "low";
  const c = tripClock(ctx), u = visionU(ctx, c), live = visionShown(ctx, c, 0), io = ioU(u);
  const rn = (n) => c.rnd(1260 + n), pk = (n, k) => c.pick(1260 + n, k), sense = (n) => sgn(rn(n));
  const { BLU, VIO, PNK, ORA, YEL, GRN, W, BG } = NEON;
  const fam = pk(0, 3), hot = pk(1, 4);
  const A = BLU.mul(is(fam, 0)).add(VIO.mul(is(fam, 1))).add(vec3(0.01, 0.55, 0.65).mul(is(fam, 2)));
  const B = VIO.mul(is(fam, 0)).add(BLU.mul(inv(is(fam, 0))));
  const hotC = (k) => [YEL, ORA, PNK, GRN].reduce((a, v, i) => a.add(v.mul(is(k, i))), vec3(0));
  const H = hotC(hot), H2 = hotC(hot.add(pk(2, 3)).add(1).mod(4));
  const P = positionGeometry.xy, T = c.real;
  const kOn = step(0.001, c.kick), cl = climb(c);
  const cul = io(0.7, 0.8, 0.86, 0.92).mul(cl.mul(0.4).add(0.6)), lit = cul.mul(0.5).add(0.7);
  const on = (p) => step(0.004, p);
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  const cutout = (col, cover) => { m.colorNode = col; m.opacityNode = cover.mul(live).clamp(0, 1); m.alphaTest = 0.5; return m; };
  let col = vec3(0), cover = float(0);
  const lay = (b, l) => { col = mix(col, l, b); cover = cover.max(b); };

  // ------------------------------------------------------------------ WORLD: the endless comb, floor and ceiling meeting at her
  if (layer === "world") {
    const uEnd = inv(float(0.4).div(ctx.param("vw1", -1).sub(ctx.param("vw0", -1)).max(1))).min(0.999);
    const pC = ss(0.3, 0.5, u).mul(inv(ss(0.94, uEnd, u)));
    const v = P.y.abs().max(1.5), Z = float(260).div(v), sg = sense(3), spd = cl.mul(1.2).add(1.6);
    const s = pk(4, 2).mul(0.8).add(2.6);
    const hc = hexCell(vec2(P.x.mul(Z).div(30), Z.add(T.mul(spd).mul(sg))), s);
    const dE = float(0.5).sub(hc.e).mul(s), fw = fwidth(dE).max(0.002);
    const line = inv(ss(float(0.07), fw.add(0.07), dE.abs()));
    const Zc = hc.id.y.mul(s).sub(T.mul(spd).mul(sg)), vc = float(260).div(Zc.abs().max(2.9));
    const hk = h2(hc.id.add(vec2(step(0, P.y).mul(31), 0)), 3);
    const ord = vc.div(90).clamp(0, 1).mul(0.75).add(hk.mul(0.25));   // the comb is built from her outward, cell by cell
    const cell = maskBeads(pC.mul(cl.mul(0.1).add(1)), ord).mul(on(pC)).mul(ss(4, 16, P.y.abs()));
    const front = inv(c.beat.fract()).mul(60).add(3);                  // a lit row rolls toward the eye on each kick
    const kr = inv(ss(0, 5, Zc.abs().sub(front).abs())).mul(kOn);
    const honey = step(0.9, hk).mul(inv(ss(float(0.2), fw.add(0.2), float(0.62).sub(dE))));
    const depthL = ss(2, 50, v).mul(0.7).add(0.3);
    lay(cell.mul(line.max(honey)), mix(mix(A, B, step(0.5, fm(hc.id.y.floor(), float(2)))), W, kr.mul(0.7)).mul(line).add(H.mul(honey).mul(0.6)).mul(depthL));
    // honey drips: flame teardrops, point up, falling; they swell from a bead and shrink away
    const pD = io(0.5, 0.62, 0.85, 0.88), ax = P.x.abs();
    for (let j = 0; j < (low ? 3 : 6); j++) {
      const pj = pD.mul(1.5).sub(j * 0.09).clamp(0, 1), r = pj.mul(1.6 + (j % 3) * 0.7);
      const yj = inv(T.mul(0.035 + j * 0.006).add(rn(10 + j)).fract()).mul(200).sub(100);
      const qd = vec2(ax.sub(14 + j * 23 + (j % 2) * 7), P.y.sub(yj));
      const tt = qd.y.div(r.mul(2.4).max(0.01)).clamp(0, 1);
      const dr = mix(qd.length().sub(r), qd.x.abs().sub(r.mul(inv(tt).mul(inv(tt)))), step(0, qd.y));
      const tr = vec2(qd.x, qd.y.add(r.mul(0.35))).length().sub(r.mul(0.42));
      const drop = inv(ss(float(0), fw.add(0.02), dr)).mul(on(pj));
      lay(drop, BG.add(H.mul(0.85)).add(W.mul(inv(ss(float(0), fw.add(0.02), tr)))).add(mix(H2, W, 0.3).mul(inv(ss(float(0.25), fw.add(0.25), dr.abs())))));
    }
    return cutout(col.mul(cul.mul(0.3).add(0.45)), cover);
  }

  // ------------------------------------------------------------------ RING: the waggle wheel (turns; the dance path counter-runs)
  if (layer === "ring") {
    const p = P, r = p.length(), a0 = atan2(p.x, p.y), sn = sense(6);
    const pR = io(0.42, 0.55, 0.87, 0.9), pL = io(0.46, 0.56, 0.86, 0.89);
    const N = pk(7, 3).mul(2).add(10), Rr = 31;
    const a = a0.add(T.mul(TAU / 70).mul(sn)), k = a.div(TAU).mul(N).add(0.5).floor(), ac = a.sub(k.mul(TAU).div(N));
    const ph = T.mul(1.6).add(k.mul(1.3));
    const lq = vec2(ac.mul(r), r.sub(Rr)).sub(vec2(ph.sin().mul(2.4), ph.mul(2).sin().mul(1.1)));
    const hd = atan2(ph.mul(2).cos().mul(2.2), ph.cos().mul(2.4)), hc_ = hd.cos(), hs = hd.sin();
    const bx = lq.x.mul(hc_).add(lq.y.mul(hs)), by = lq.y.mul(hc_).sub(lq.x.mul(hs));
    const aa = fwidth(r).mul(1.2).max(0.01), st = strokeAA(aa);
    const bs = segH(vec2(bx, by), vec2(-1.3, 0), vec2(1.1, 0)).d.sub(0.62);
    const body = st(bs, 0), stripe = step(0.5, fm(bx.mul(1.4).floor(), float(2)));
    const wing = st(vec2(bx.add(0.2), by.abs().sub(1.05)).length().sub(0.72).abs(), 0.09);
    const head = st(vec2(bx.sub(1.75), by).length().sub(0.45), 0);
    const join = maskBeads(pR, fm(k.div(N).mul(sn), float(1))).mul(on(pR));
    let colR = mix(H, BG, stripe).mul(body).add(mix(A, W, 0.4).mul(wing)).add(H2.mul(head)).mul(join).mul(lit);
    // the waggle figure-eight behind her: beads running the dance path, lighting in turn; on the kick they go hollow
    let bd = float(0);
    const nL = low ? 12 : 20, sL = sense(8);
    for (let i = 0; i < nL; i++) {
      const t = T.mul(0.22).mul(sL).add(i * TAU / nL), s1 = t.sin(), c1 = t.cos(), den = s1.mul(s1).add(1);
      const d = p.sub(vec2(c1.mul(27).div(den), s1.mul(c1).mul(27).div(den))).length().sub(0.6);
      const hol = kOn.mul(i % 2);
      bd = bd.max(mix(st(d, 0), st(d.abs(), 0.1), hol).mul(maskBeads(pL, i / nL)));
    }
    colR = colR.add(mix(H2, W, 0.3).mul(bd).mul(lit).mul(on(pL)));
    m.colorNode = colR; m.opacityNode = live; m.transparent = true; m.blending = AdditiveBlending; m.depthWrite = false;
    return m;
  }

  // ------------------------------------------------------------------ VEIL: black wax caps closing and opening over the comb
  if (layer === "veil") {
    const pV = io(0.62, 0.76, 0.82, 0.86), s = pk(8, 2).mul(4).add(12);
    const Pv = P.add(vec2(T.mul(0.9).mul(sense(9)), T.mul(0.1).sin().mul(4)));
    const hc = hexCell(Pv, s), hk = h2(hc.id, 4);
    const act = step(hk, ss(10, 45, P.length()).mul(0.35).add(0.28));
    const cyc = T.mul(0.11).add(hk.mul(TAU * 3)).sin().mul(0.5).add(0.5);
    const pj = pV.mul(1.6).sub(hk.mul(0.6)).clamp(0, 1);
    const capR = ss(0.15, 0.75, cyc).mul(ss(0, 1, pj)).mul(inv(c.kick.mul(0.55)));   // the kick uncaps them
    const dE = capR.mul(0.48).sub(hc.e).mul(s), fw = fwidth(dE).max(0.01);
    const cap = inv(ss(float(0), fw, dE.negate())).mul(act).mul(on(pj)).mul(step(0.02, capR));
    const rimL = inv(ss(float(0.12), fw.add(0.12), dE.abs())), inner = inv(ss(float(0.08), fw.add(0.08), dE.sub(s.mul(capR).mul(0.14)).abs()));
    lay(cap, BG.add(B.mul(rimL).mul(0.55)).add(H.mul(inner).mul(0.3)));
    return cutout(col, cover);
  }

  // ------------------------------------------------------------------ FORE: pollen and six-petal rosettes drifting up
  if (layer === "fore") {
    const aa = fwidth(P.x).mul(1.2).max(0.01), st = strokeAA(aa);
    const pF = io(0.66, 0.8, 0.8, 0.84);
    for (let j = 0; j < (low ? 4 : 8); j++) {
      const pj = pF.mul(1.7).sub(j * 0.09).clamp(0, 1), sz = 1 + (j % 3) * 0.35;
      const yj = T.mul(0.012 * (1 + j * 0.17)).add(rn(20 + j)).fract().mul(110).sub(55);
      const xj = T.mul(0.23).add(j * 1.9).sin().mul(5).add(((j * 37.3) % 130) - 65);
      const qf = P.sub(vec2(xj, yj)).div(sz), rf = qf.length();
      if (j % 2 === 0) {
        const ro = T.mul(0.3 * (j % 4 ? 1 : -1)), af = atan2(qf.y, qf.x).add(ro);
        const kp = af.div(TAU).mul(6).add(0.5).floor(), am = af.sub(kp.mul(TAU / 6));
        const pd = vec2(am.cos().mul(rf).sub(2.1), am.sin().mul(rf)).length();
        const petal = st(pd.sub(0.85), 0).mul(maskBeads(pj, fm(kp, float(6)).add(0.5).div(6))).mul(on(pj));
        const core = st(rf.sub(1), 0).mul(maskIris(pj.mul(3).clamp(0, 1), rf));
        lay(petal.max(core), BG.add(mix(H, H2, step(0.5, fm(kp, float(2)))).mul(petal).mul(st(pd.sub(0.55).abs(), 0.18).add(0.5)))
          .add(W.mul(core).mul(st(rf.sub(0.5).abs(), 0.12).add(0.3))));
      } else {
        const pol = st(rf.sub(1.2), 0).mul(maskIris(pj, rf.div(1.2))).mul(on(pj));
        lay(pol, BG.add(mix(YEL, H, 0.4).mul(st(rf.sub(0.8).abs(), 0.18).add(0.35))).add(W.mul(st(rf, 0.3))));
      }
    }
    return cutout(col.mul(cul.mul(0.3).add(0.8)), cover);
  }

  // ------------------------------------------------------------------ THE BEING (breathes)
  const p = P.div(T.mul(TAU / 8).sin().mul(0.012).add(1));
  const aa = fwidth(p.x).mul(1.2).max(0.008), st = strokeAA(aa);
  const ax = p.x.abs(), q = vec2(ax, p.y), sw = pk(9, 2);

  // the seat: hex cells round her heart, lit one by one in a spiral from the seed cell; the highs widen it
  const sp = pk(3, 3).mul(0.4).add(3.3), hc = hexCell(p.sub(vec2(0, 2)), sp);
  const rid = hc.id.length(), aid = atan2(hc.id.x.mul(sense(4)), hc.id.y).div(TAU).add(0.5);
  const dE = float(0.5).sub(hc.e).mul(sp), hk = h2(hc.id, 2);
  const pSd = io(0.015, 0.07, 0.95, 0.975), pS = io(0.1, 0.3, 0.91, 0.95), Rs = cl.mul(1.8).add(4.6);
  const ord = rid.sub(1).add(aid).div(Rs).clamp(0, 1);
  const rip = inv(ss(0, 0.8, rid.sub(c.beat.fract().mul(9)).abs())).mul(kOn);   // on the kick a ripple of filled cells runs out
  const seat = step(0.5, rid).mul(step(rid, Rs)).mul(maskBeads(pS, ord)).mul(on(pS));
  const rim = st(dE.abs(), 0.11), inner = st(dE.sub(sp.mul(0.24)).abs(), 0.06).mul(step(0.5, hk));
  const fillH = st(float(0.32).sub(dE), 0).mul(step(0.84, hk).max(rip));
  lay(seat.mul(rim.max(inner).max(fillH)), BG.add(mix(A, B, step(0.5, hk)).mul(rim.add(inner.mul(0.6)))).add(mix(H, H2, rip).mul(fillH)).mul(lit));
  const seed = step(rid, 0.5).mul(maskIris(pSd, hc.e.mul(2))).mul(on(pSd));
  lay(seed, H.mul(0.75).add(W.mul(st(dE.sub(sp.mul(0.24)).abs(), 0.08))).add(W.mul(st(hc.e.mul(sp), 0.35))).mul(lit));

  // four wings, line-art: they unfold from along her body, then their veins draw in one by one; the kick flashes them
  const pW = io(mix(0.6, 0.54, sw), mix(0.72, 0.66, sw), 0.84, 0.88);
  [[3.5, 4, 0.42, 24, 8.5], [3.2, 0.2, -0.38, 18, 6.5]].forEach(([rx, ry, th0, L, Wd], j) => {
    const pj = pW.mul(1.5).sub(j * 0.5).clamp(0, 1);
    const th = mix(float(-1.4), float(th0), ss(0, 0.45, pj)).add(T.mul(1.1).add(j).sin().mul(0.03));
    const cs = th.cos(), sn = th.sin(), d0 = q.sub(vec2(rx, ry));
    const lx = d0.x.mul(cs).add(d0.y.mul(sn)), ly = d0.y.mul(cs).sub(d0.x.mul(sn)), lq = vec2(lx, ly);
    const ew = vec2(lx.sub(L / 2).div(L / 2), ly.div(Wd / 2)).length().sub(1).mul(Wd / 2);
    const out = st(ew.abs(), 0.14).mul(maskDraw(ss(0, 0.5, pj), lx.div(L))).mul(on(pj));
    const pv = ss(0.35, 1, pj);
    let vn = float(0);
    for (let k = 0; k < 5; k++) {
      const ph = -2 + k, sgk = segH(lq, vec2(0, 0), vec2((L / 2) * (1 + Math.cos(ph)) * 0.97, (Wd / 2) * Math.sin(ph) * 0.97));
      const pk_ = pv.mul(5.5).sub(k).clamp(0, 1);
      vn = vn.max(st(sgk.d, 0.09).mul(maskDraw(pk_, sgk.h)).mul(on(pk_)));
    }
    const e2 = vec2(lx.sub(L * 0.3).div(L * 0.3), ly.div(Wd * 0.28)).length().sub(1).mul(Wd * 0.28);
    vn = vn.max(st(e2.abs(), 0.07).mul(maskDraw(ss(0.85, 1, pv), lx.div(L * 0.6))));
    lay(out.max(vn), mix(A, W, 0.2).mul(out).add(mix(mix(B, W, 0.35), W.add(H.mul(0.6)), c.kick).mul(vn)).mul(lit));
  });

  // the abdomen: striped, stripes stacking upward from the sting; while the kick runs, their colours step on the bar
  const pA = io(0.3, 0.4, 0.89, 0.92), t = p.y.add(10.5).div(10);
  const rxA = inv(t.negate().max(0).mul(0.3)).mul(6.6);
  const ab = vec2(ax.div(rxA), t).length().sub(1).mul(6.6);
  const per = pk(10, 2).mul(0.5).add(2.2), yy = p.y.add(ax.mul(ax).mul(0.035)).add(20.5);
  const si = yy.div(per).floor(), f = fm(yy, per).div(per);
  const stk = maskBeads(pA, si.mul(per).div(21).clamp(0, 1)).mul(on(pA));
  const ci = fm(si.add(c.bar.floor().mul(kOn)), float(3));
  const sc = H.mul(is(ci, 0)).add(H2.mul(is(ci, 1))).add(mix(A, W, 0.2).mul(is(ci, 2)));
  const bead = st(vec2(fm(ax.add(0.65), float(1.3)).sub(0.65), f.sub(0.5).mul(per)).length(), 0.33);
  const hotS = step(0.5, fm(si, float(2)));
  const sting = st(segH(q, vec2(0, -20), vec2(0, -23.6)).d, 0.3).mul(on(pA));
  lay(st(ab, 0).mul(stk).max(sting), mix(BG.add(A.mul(st(f.sub(0.5).abs().mul(per), 0.08))), sc.mul(0.8).add(W.mul(bead)), hotS)
    .add(mix(A, W, 0.3).mul(st(ab.abs(), 0.16))).mul(lit));

  // the thorax: concentric fur, ringed by two rows of beads lit top-down on both sides; on the kick alternate beads go hollow
  const pT = io(0.38, 0.47, 0.88, 0.91), tq = vec2(ax, p.y.sub(2)), tr = tq.length(), tth = atan2(ax, tq.y);
  lay(st(tr.sub(5.2), 0).mul(maskIris(pT.mul(2).clamp(0, 1), tr.div(5.2))).mul(on(pT)),
    BG.add(B.mul(st(float(0.65).sub(fm(tr, float(1.3)).sub(0.65).abs()), 0.09))).add(W.mul(st(tr.sub(5.2).abs(), 0.12))).mul(lit));
  const pB = pT.mul(2).sub(1).clamp(0, 1);
  [[11, 6.1, 0.75], [15, 7.6, 0.5]].forEach(([nb, R, br], j) => {
    const kb = tth.div(Math.PI).mul(nb).floor().clamp(0, nb - 1), tc = kb.add(0.5).div(nb).mul(Math.PI);
    const d = tq.sub(vec2(tc.sin(), tc.cos()).mul(R)).length().sub(br);
    const hol = kOn.mul(fm(kb.add(c.beat.floor()).add(j), float(2)));
    lay(mix(st(d, 0), st(d.abs(), 0.1), hol).mul(maskBeads(pB, kb.add(0.5).div(nb))).mul(on(pB)), mix(j ? H2 : H, W, 0.15).mul(lit));
  });

  // the head opens like a lid; the compound eyes fill cell by cell from their centres
  const pH = io(0.45, 0.57, 0.87, 0.9), hq = vec2(ax, p.y.sub(10.2));
  const he = vec2(hq.x.div(5), hq.y.div(4)).length().sub(1).mul(4);
  lay(st(he, 0).mul(maskLid(ss(0, 0.4, pH), hq.y.div(4))).mul(on(pH)), BG.add(A.mul(st(he.abs(), 0.15))).mul(lit));
  const eq = hq.sub(vec2(2.7, 0.5)), ex = eq.x.mul(0.92).add(eq.y.mul(0.39)), ey = eq.y.mul(0.92).sub(eq.x.mul(0.39));
  const ee = vec2(ex.div(2.1), ey.div(3.1)).length().sub(1).mul(2.1), pE = ss(0.3, 1, pH);
  const es = pk(11, 2).mul(0.14).add(0.48), ec = hexCell(vec2(ex, ey), es), eid = ec.id.length();
  const cellIn = st(float(0.06).sub(float(0.5).sub(ec.e).mul(es)), 0).mul(maskBeads(pE, eid.mul(es).div(3.2).mul(0.7).add(h2(ec.id, 5).mul(0.3))));
  const eyeC = mix(mix(B, W, 0.3), H, step(0.5, fm(eid.add(0.5).floor().add(c.beat.floor().mul(kOn)), float(2))));
  lay(st(ee, 0).mul(maskIris(pE.mul(4).clamp(0, 1), vec2(ex, ey).length().div(3.1))).mul(on(pE)),
    BG.add(eyeC.mul(cellIn)).add(W.mul(st(ee.abs(), 0.12))).mul(lit));

  // antennae, drawn by a nib from the brow out to the curl, a club bead at the end
  const pN = io(mix(0.54, 0.66, sw), mix(0.62, 0.73, sw), 0.86, 0.89);
  let dA = float(99), tA = float(0), acc = 0;
  const lens = ANT.slice(1).map((b, i) => Math.hypot(b[0] - ANT[i][0], b[1] - ANT[i][1])), Lt = lens.reduce((a, b) => a + b, 0);
  ANT.slice(1).forEach((b, i) => {
    const sgA = segH(q, vec2(ANT[i][0], ANT[i][1]), vec2(b[0], b[1])), tt = sgA.h.mul(lens[i]).add(acc).div(Lt), sel = step(sgA.d, dA);
    tA = mix(tA, tt, sel); dA = dA.min(sgA.d); acc += lens[i];
  });
  const club = q.sub(vec2(9.8, 17.2)).length();
  lay(st(dA, 0.16).mul(maskDraw(pN, tA)).mul(on(pN)).max(st(club.sub(0.6), 0).mul(maskIris(ss(0.9, 1, pN), club.div(0.6)))),
    mix(B, W, nib(pN, tA, 0.05).add(0.2)).add(H2.mul(st(club, 0.6))).mul(lit));

  // the crown, last: opening from its centre jewel
  const pC = io(0.73, 0.79, 0.83, 0.86);
  const cd = segH(q, vec2(0, 17.6), vec2(1.1, 15.5)).d.min(segH(q, vec2(1.1, 15.5), vec2(2.3, 16.6)).d)
    .min(segH(q, vec2(2.3, 16.6), vec2(2.3, 14.4)).d).min(segH(q, vec2(0, 14.4), vec2(2.3, 14.4)).d);
  const jw = q.sub(vec2(0, 17.6)).length().min(q.sub(vec2(2.3, 16.6)).length());
  lay(st(cd, 0.15).max(st(jw.sub(0.5), 0)).mul(maskIris(pC, q.sub(vec2(0, 15.5)).length().div(3.4))).mul(on(pC)),
    mix(H, W, 0.25).mul(st(cd, 0.15)).add(H2.mul(st(jw.sub(0.5), 0))).mul(lit.add(0.2)));
  return cutout(col, cover);
}
