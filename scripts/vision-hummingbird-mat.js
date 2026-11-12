// THE HUMMINGBIRD: a mirrored pair of hummingbirds whose needle beaks meet at a line-art knot-lotus with a bead stamen.
// Layers (params.layer): world z-30 hanging garden of beaded vines (drift outward, striped back row drifts inward) /
// ring z-12 wreath of small flowers opening in a wave (turns; bead rows counter-turn) / being z0 the birds and the bloom (breathes) /
// veil z+10 black leaves and broad petals sweeping across / fore z+22 pollen, tiny squares, loose petals drifting out of the bloom.
// Pacing: stamen alone, petals (iris), beaks (nib), eye, body (clock), gorget beads, wing fan, tail, wreath, garden, veil, pollen; LIFO exit, garden last.
// Kick only where the track has one: wing fan steps, gorget colour chase, wreath hollow/filled, veil lifts, vine light, stamen swap.
import { MeshBasicNodeMaterial, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep as ss, step, mix, atan2 as atan2raw, fwidth } from "builtin/tsl";
import { tripClock, visionShown, visionU, climb, maskDraw, maskBeads, maskIris, maskClock, inv, is, sgn, smin, segH, capsule, strokeAA, ioU, NEON } from "./lib/trip.js";

const TAU = 6.28318, PI = 3.14159;
const atan2 = (y, x) => atan2raw(y, x.add(1e-5));
const hash = (k, o = 0) => k.mul(12.9898 + o).add(o * 3.1).sin().mul(43758.5453).fract();
const band = (x) => { const e = fwidth(x).mul(0.7).clamp(0.001, 0.25); return ss(float(0.25).sub(e), e.add(0.25), x.fract().sub(0.5).abs()); };
const pmod = (x, n) => x.add(float(n).mul(64)).mod(n);   // positive mod on every backend
// a lens shape (petal, blade, leaf) along direction ang from the origin of d: t 0..1 along, d<0 inside
const lens = (d, ang, L, W, pw = 1) => {
  const ca = float(ang).cos(), sa = float(ang).sin();
  const al = d.x.mul(ca).add(d.y.mul(sa)), ac = d.y.mul(ca).sub(d.x.mul(sa));
  const t = al.div(L), tc = t.clamp(0, 1);
  const w = tc.max(1e-4).pow(pw).mul(PI).sin().mul(W);
  return { t, ac, d: ac.abs().sub(w), inr: step(0, t).mul(step(t, 1)) };
};

export function material(ctx) {
  const layer = ctx.params.layer ?? "being", low = ctx.quality === "low";
  const c = tripClock(ctx), u = visionU(ctx, c), live = visionShown(ctx, c, 0), io = ioU(u);
  const rn = (n) => c.rnd(1320 + n), pk = (n, k) => c.pick(1320 + n, k), sense = (n) => sgn(rn(n));
  const { BLU, VIO, PNK, ORA, YEL, GRN, W, BG } = NEON;
  const fam = pk(0, 3), hot = pk(1, 4);
  const A = BLU.mul(is(fam, 0)).add(VIO.mul(is(fam, 1))).add(vec3(0.01, 0.55, 0.65).mul(is(fam, 2)));
  const B = VIO.mul(is(fam, 0)).add(BLU.mul(inv(is(fam, 0))));
  const hotC = (k) => [PNK, ORA, YEL, GRN].reduce((a, v, i) => a.add(v.mul(is(k, i))), vec3(0));
  const H = hotC(hot), H2 = hotC(hot.add(pk(2, 3)).add(1).mod(4));
  const vf = pk(3, 3), V = GRN.mul(is(vf, 0)).add(vec3(0.05, 0.9, 0.55).mul(is(vf, 1))).add(mix(GRN, YEL, 0.45).mul(is(vf, 2)));
  const P = positionGeometry.xy, T = c.real;
  const kOn = step(0.001, c.kick), cl = climb(c), beatN = c.beat.floor();
  const cul = io(0.7, 0.8, 0.86, 0.92).mul(cl.mul(0.4).add(0.6));
  const on = (p) => step(0.004, p);
  const el = (a, b, x, y) => ss(a, b, u).add(cl.mul(0.06).mul(on(u.sub(a)))).min(1).mul(inv(ss(x, y, u)));
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  const cutout = (col, cover) => { m.colorNode = col; m.opacityNode = cover.mul(live).clamp(0, 1); m.alphaTest = 0.5; return m; };
  let col = vec3(0), cover = float(0);
  const lay = (b, lit) => { col = mix(col, lit, b); cover = cover.max(b); };

  // ------------------------------------------------------------------ WORLD: the hanging garden (mirrored, drifting)
  if (layer === "world") {
    const aa = fwidth(P.x).mul(1.2).max(0.02), st = strokeAA(aa), ax = P.x.abs();
    const grow = el(0.36, 0.6, 0.955, 0.995);
    const front = inv(c.beat.fract()).mul(90).sub(45), kl = inv(ss(0, 5, P.y.sub(front).abs())).mul(kOn);
    const sp0 = pk(4, 3).mul(3).add(16);
    // [spacing, width, drift, sway, row brightness, beaded]
    [[7.5, 1.3, -0.5, 1.6, 0.4, 0], [sp0, 3.8, 0.7, 2.6, 1, 1]].slice(low ? 1 : 0).forEach(([sp, w, v, sw, br, beaded], j) => {
      const X = ax.sub(T.mul(v)).add(j * 3.3), k = X.div(sp).floor(), hk = hash(k, j + 5);
      const yTop = float(48), yb = hk.mul(38).add(beaded ? 6 : -4).negate().add(cl.mul(4).negate());
      const len = yTop.sub(yb), t = yTop.sub(P.y).div(len);
      const sway = P.y.mul(0.07).add(T.mul(0.45 + j * 0.2)).add(hk.mul(6)).sin().mul(sw).mul(cl.mul(0.5).add(1)).mul(inv(t.clamp(0, 1)).mul(0.3).add(0.7));
      const lx = X.div(sp).fract().sub(0.5).mul(sp).add(hk.sub(0.5).mul(float(sp).mul(0.3))).sub(sway);
      const wk = hk.mul(5.3).fract().mul(0.5).add(0.75).mul(w).mul(inv(t.clamp(0, 1).mul(0.55)));
      const pV = grow.mul(1.7).sub(hk.mul(0.7)).clamp(0, 1);
      const tipD = vec2(lx, P.y.sub(yb)).length();
      const bodyD = lx.abs().sub(wk).max(yb.sub(P.y)).min(tipD.sub(wk.mul(0.9)));
      const body = st(bodyD, 0).mul(maskDraw(pV, t)).mul(step(P.y, yTop)).mul(on(pV));
      let skin;
      if (beaded) {
        const g = float(1.9), row = P.y.add(T.mul(0.3)).div(g).floor(), qx = lx.div(g).add(row.mul(0.5));
        const l = vec2(qx.fract().sub(0.5), P.y.add(T.mul(0.3)).div(g).fract().sub(0.5)).length().mul(g);
        const rb = inv(lx.div(wk.max(0.1)).mul(lx.div(wk.max(0.1))).clamp(0, 1)).max(0).sqrt().mul(0.78);
        const hb = hash(qx.floor().add(row.mul(37)), 3);
        skin = BG.add(V.mul(st(l.sub(rb).abs(), 0.1)).mul(kl.mul(0.8).add(0.85)))
          .add(mix(H, H2, step(0.5, hb)).mul(st(l, rb.mul(0.3))).mul(step(0.55, hb)))
          .add(mix(V, W, 0.35).mul(st(bodyD.abs(), 0.12)));
        // nectar: a drop leaves the tip once the vine is whole
        const fall = T.mul(0.3).add(hk).fract(), dy = P.y.sub(yb.sub(fall.mul(fall).mul(26)).sub(1.2));
        const drop = st(vec2(lx.mul(1.3), dy.mul(dy.greaterThan(0).select(0.55, 1))).length().sub(inv(fall).mul(0.6).add(0.25)), 0).mul(step(0.999, pV));
        lay(drop, mix(H, W, 0.25));
      } else {
        skin = mix(BG, A.mul(0.75).add(kl.mul(0.3)), band(P.y.add(lx.abs().mul(1.2)).div(1.6).add(T.mul(0.15).mul(sense(5)))));
      }
      lay(body, skin.mul(br).mul(cul.mul(0.3).add(0.6)));
    });
    return cutout(col, cover);
  }

  // ------------------------------------------------------------------ RING: the wreath of small flowers (counter-turns)
  if (layer === "ring") {
    const p = P, aa = fwidth(p.x).mul(1.2).max(0.01), st = strokeAA(aa);
    const r = p.length(), a0 = atan2(p.x, p.y), sn = sense(6).negate();
    const pR = el(0.4, 0.52, 0.9, 0.95), pD = el(0.46, 0.56, 0.89, 0.94);
    const R = float(24), N = pk(7, 3).mul(2).add(10);
    const a = a0.add(T.mul(TAU / 75).mul(sn));
    const k = a.div(TAU).mul(N).add(0.5).floor(), ac = a.sub(k.mul(TAU).div(N)), kk = pmod(k, N);
    const fx = r.mul(ac.sin()), fy = r.mul(ac.cos()).sub(R), fl = vec2(fx, fy), lr = fl.length(), la = atan2(fx, fy);
    const open = kk.mul(TAU * 2).div(N).sub(T.mul(1.4).mul(sn)).sin().mul(0.5).add(0.5).mul(cl.mul(0.25).add(0.75));
    const pa = la.sub(la.div(TAU / 6).add(0.5).floor().mul(TAU / 6));
    const pd = vec2(lr.mul(pa.cos()).sub(open.mul(1.1).add(0.9)), lr.mul(pa.sin())).length().sub(open.mul(0.55).add(0.45));
    const filled = is(pmod(kk.add(beatN), 2), 0).mul(kOn);
    const reach = maskBeads(pR, kk.div(N));
    const petal = st(pd, 0).mul(reach).mul(on(pR));
    lay(petal, BG.add(mix(A, H2, filled).mul(filled.mul(0.7).add(0.15))).add(mix(B, W, 0.3).mul(st(pd.abs(), 0.12))));
    lay(st(lr, 0.55).mul(reach).mul(on(pR)), mix(H, W, 0.3));
    lay(st(r.sub(R).abs(), 0.08).mul(maskClock(pR, a0.mul(sn))).mul(on(pR)).mul(step(2.6, lr)), B.mul(0.7));
    // bead rows inside and out, turning against the wreath, lighting one by one
    [[18.5, 34], [29.5, 52]].forEach(([Rb, nb], i) => {
      const ad = a0.add(T.mul(TAU / 50).mul(sn).mul(-1 - i * 0.3)), kb = ad.div(TAU).mul(nb).add(0.5).floor();
      const bd = vec2(ad.sub(kb.mul(TAU / nb)).mul(Rb), r.sub(Rb)).length();
      const bead = st(bd, 0.55).mul(maskBeads(pD, pmod(kb, nb).div(nb))).mul(on(pD));
      lay(bead, mix(B, mix(H, W, 0.3), is(pmod(kb, 3), 0)).mul(st(bd, 0.3).mul(0.6).add(0.5)));
    });
    return cutout(col.mul(cul.mul(0.3).add(0.75)), cover);
  }

  // ------------------------------------------------------------------ VEIL: black leaves and broad petals sweeping across
  if (layer === "veil") {
    const aa = fwidth(P.x).mul(1.2).max(0.01), st = strokeAA(aa), q = vec2(P.x.abs(), P.y);
    const pV = el(0.6, 0.74, 0.84, 0.88), sv = sense(9);
    // [pivot x, y, base angle, length, width, period, order]
    [[42, -34, 2.35, 40, 7.5, 13, 0], [30, 40, 4.0, 30, 9.5, 17, 1], [52, 6, 3.05, 34, 6, 11, 2]].slice(0, low ? 2 : 3).forEach(([px, py, base, L, Wd, per, o]) => {
      const pj = pV.mul(3).sub(pk(10, 3).add(o).mod(3)).clamp(0, 1);
      const ang = T.mul(TAU / per).add(rn(11 + o).mul(TAU)).sin().mul(0.32).mul(sv).add(base).sub(c.kick.mul(0.14).mul(kOn));
      const s = lens(q.sub(vec2(px, py)), ang, L, Wd, 0.8);
      const fill = st(s.d, 0).mul(s.inr).mul(maskDraw(pj, s.t)).mul(on(pj));
      const vein = st(s.ac.abs(), 0.07);
      const ribs = st(s.t.mul(L).sub(s.ac.abs().mul(0.8)).div(3.2).fract().sub(0.5).abs().mul(3.2), 0.06).mul(st(s.d, -0.4));
      lay(fill, BG.add(B.mul(0.16).mul(st(s.d.abs(), 0.1).add(vein).add(ribs).min(1))));
    });
    return cutout(col, cover);
  }

  // ------------------------------------------------------------------ FORE: pollen, tiny squares and loose petals drifting out
  if (layer === "fore") {
    const aa = fwidth(P.x).mul(1.2).max(0.01), st = strokeAA(aa);
    const pF = el(0.66, 0.78, 0.82, 0.86), g = float(5.5), sf = sense(13);
    const D = vec2(P.x.abs().sub(T.mul(0.9)), P.y.add(T.mul(0.6).mul(sf)).add(P.x.abs().mul(0.08).add(T.mul(0.2)).sin().mul(1.5)));
    const id = D.div(g).floor(), hi = hash(id.x.add(id.y.mul(31)), 7), hj = hash(id.x.mul(3).add(id.y.mul(17)), 2);
    const lc = D.div(g).fract().sub(vec2(hi.mul(0.5).add(0.25), hj.mul(0.5).add(0.25))).mul(g);
    const spin = T.mul(hi.sub(0.5).mul(2)).add(hj.mul(6)), cs = spin.cos(), sn = spin.sin();
    const rl = vec2(lc.x.mul(cs).add(lc.y.mul(sn)), lc.y.mul(cs).sub(lc.x.mul(sn)));
    const sq = rl.abs().max(rl.abs().yx).x.sub(0.42);
    const kind = hash(id.x.add(id.y.mul(7)), 11);
    const pet = lens(rl.add(vec2(0.7, 0)), 0, 1.6, 0.42, 0.7);
    const reveal = maskIris(pF, P.length().div(70)).mul(on(pF));
    const hc = mix(mix(H, H2, step(0.5, hi)), mix(A, W, 0.4), step(0.8, hj));
    lay(st(lc.length(), hi.mul(0.15).add(0.12)).mul(step(kind, 0.45)).mul(reveal), mix(hc, W, 0.4));
    lay(st(sq.abs(), 0.07).mul(step(0.45, kind)).mul(step(kind, 0.75)).mul(reveal), hc);
    lay(st(pet.d, 0).mul(pet.inr).mul(step(0.75, kind)).mul(step(kind, 0.9)).mul(reveal), BG.add(hc.mul(st(pet.d.abs(), 0.06))));
    return cutout(col.mul(cul.mul(0.3).add(0.7)), cover);
  }

  // ------------------------------------------------------------------ BEING: the mirrored birds and the knot-lotus
  const brt = T.mul(TAU / 9).sin().mul(0.012).add(1).add(cul.mul(0.035));
  const p = P.div(brt), aa = fwidth(p.x).mul(1.2).max(0.01), st = strokeAA(aa);
  const q = vec2(p.x.abs(), p.y);

  // wings: a fan of ghosted blades from the shoulder; one is the wing now, stepping round (on the kick it steps too)
  const K = pk(14, 3).add(4), pW = el(0.49, 0.62, 0.86, 0.91), fanUp = pk(15, 2);
  const cur = pmod(T.mul(1.3).floor().add(beatN.mul(kOn)), K);
  const S = vec2(15.6, 3.4), Lw = cl.mul(2).add(13).add(cul.mul(1.5));
  for (let j = 0; j < (low ? 4 : 6); j++) {
    const jo = mix(float(j), K.sub(1 + j), fanUp), pj = pW.mul(K.add(1)).sub(jo).clamp(0, 1).mul(step(j + 0.5, K));
    const s = lens(q.sub(S), 0.55 + j * 0.36, Lw, 2.4, 0.75);
    const isCur = is(cur, j);
    const fill = st(s.d, 0).mul(s.inr).mul(maskDraw(pj, s.t)).mul(on(pj));
    const line = st(s.d.abs(), 0.09).mul(s.inr).add(st(s.ac.abs(), 0.05).mul(s.inr).mul(0.6)).min(1);
    const feather = band(s.t.mul(Lw).mul(0.55).sub(T.mul(0.6))).mul(isCur);
    lay(fill.mul(line.max(isCur)), BG.add(mix(A, B, s.t).mul(feather).mul(cul.mul(0.4).add(0.8))).add(mix(B, W, 0.5).mul(line).mul(isCur.mul(0.75).add(0.25))));
  }
  // tail: a fork of teardrops drawing out from the rump
  const pT = el(0.58, 0.66, 0.85, 0.89), fork = rn(16).mul(0.35);
  [[-0.35, 9.5], [-0.95, 8], [-0.65, 11]].slice(0, low ? 2 : 3).forEach(([a, L], i) => {
    const ang = float(a).sub(fork.mul(i === 1 ? 1 : 0)).add(T.mul(0.8).add(i).sin().mul(0.04));
    const pi = pT.mul(3.5).sub(i).clamp(0, 1);
    const d = q.sub(vec2(21.6, -4.6)), ca = ang.cos(), sa = ang.sin();
    const sg = segH(vec2(d.x.mul(ca).add(d.y.mul(sa)), d.y.mul(ca).sub(d.x.mul(sa))), vec2(0, 0), vec2(L, 0));
    const td = sg.d.sub(sg.h.mul(sg.h).mul(1.5).add(0.15));
    const drop = st(td, 0).mul(maskDraw(pi, sg.h)).mul(on(pi));
    const bulb = st(sg.d.add(sg.h.sub(0.85).abs().mul(3)), 0.6);
    lay(drop, BG.add(mix(A, B, sg.h).mul(band(sg.h.mul(L * 0.6).sub(T.mul(0.5))).mul(0.8))).add(mix(B, W, 0.5).mul(st(td.abs(), 0.1))).add(H.mul(bulb)));
  });
  // body: head and teardrop torso, contour bands; head opens from the eye (iris), torso by a clock sweep round the breast
  const Hc = vec2(11.6, 3.2), bd = smin(q.sub(Hc).length().sub(3), capsule(q, [15, 1], [21.4, -4.4], 3.1), 2.4);
  const pE = el(0.32, 0.39, 0.9, 0.94), pB = el(0.37, 0.46, 0.89, 0.93), sb = sense(17);
  const eyeD = q.sub(vec2(10.9, 3.9)).length();
  const headM = maskIris(pE, eyeD.div(4.2)).mul(on(pE));
  const bodyM = maskClock(pB, atan2(q.x.sub(17.5), q.y.add(1)).mul(sb)).mul(on(pB)).max(headM.mul(step(q.x, 13.5)));
  const bodyF = st(bd, 0).mul(bodyM);
  lay(bodyF, BG.add(mix(A, mix(B, W, 0.3), ss(-5, 0, bd)).mul(band(bd.mul(0.65).add(T.mul(0.14).mul(sb)))).mul(cul.mul(0.4).add(0.7))).add(mix(B, W, 0.6).mul(st(bd.abs(), 0.15))));
  // gorget: scale beads lighting in sequence from the beak's root; on the kick the colour chases down them
  const pG = el(0.43, 0.52, 0.88, 0.92), gq = q.sub(vec2(12.6, 0.6));
  const gy = gq.y.div(0.95).floor(), gx = gq.x.div(1.0).add(gy.mul(0.5));
  const gl = vec2(gx.fract().sub(0.5), gq.y.div(0.95).fract().sub(0.5).mul(0.95)).length();
  const gc = vec2(gx.floor().add(0.5).sub(gy.mul(0.5)), gy.add(0.5).mul(0.95));
  const inG = step(vec2(gc.x.div(3.2), gc.y.div(2.2)).length(), 1).mul(step(bd, -0.5));
  const rank = gc.sub(vec2(-3, 2)).length().div(6.5).clamp(0, 1);
  const chase = pmod(rank.mul(5).floor().sub(beatN.mul(kOn)), 3);
  const gbead = st(gl, 0.36).mul(inG).mul(maskBeads(pG, rank)).mul(on(pG)).mul(bodyF);
  lay(gbead, mix(mix(H, H2, is(chase, 1)), W, is(chase, 2).mul(0.6)).mul(st(gl, 0.2).mul(0.5).add(0.6)));
  // the ringed eye
  const eye = st(eyeD, 1.25).mul(headM).mul(bodyF.max(headM));
  lay(eye, BG.add(W.mul(st(eyeD.sub(1.1).abs(), 0.08))).add(H.mul(st(eyeD.sub(0.7).abs(), 0.08))).add(H2.mul(st(eyeD, 0.32))));

  // the knot-lotus: petals open one by one, each through its own iris from the stamen
  const N = pk(18, 4).add(5), pP = el(0.11, 0.27, 0.92, 0.965), sl = sense(19);
  const r = p.length(), a = atan2(p.x, p.y).add(T.mul(TAU / 70).mul(sl));
  const kf = a.div(TAU).mul(N).add(0.5).floor(), ac = a.sub(kf.mul(TAU).div(N)), ki = pmod(kf, N);
  const ord = ki.mul(0.618).add(rn(20)).fract();
  const pp = pP.mul(1.45).sub(ord).div(0.45).clamp(0, 1);
  const lp = vec2(r.mul(ac.cos()), r.mul(ac.sin()));
  const outer = lens(lp, 0, cl.mul(0.6).add(6.2), 2.0, 0.85);
  const knot = lens(lp.sub(vec2(1.3, 0)), 0, 4.0, 1.25, 1.1);
  const pmask = maskIris(pp, r.div(7)).mul(on(pp));
  const pFill = st(outer.d, 0).mul(outer.inr).mul(pmask);
  lay(pFill, BG.add(mix(B, W, 0.45).mul(st(outer.d.abs(), 0.12))).add(H2.mul(st(outer.ac.abs(), 0.05)).mul(step(0.25, outer.t)).mul(step(outer.t, 0.8))));
  lay(st(knot.d.abs(), 0.1).mul(knot.inr).mul(pmask), mix(H, W, 0.15));
  // beaks: needles drawn in from both heads by a bright nib until they touch the stamen
  const pK = el(0.24, 0.32, 0.91, 0.95), bk = segH(q, vec2(9.0, 2.7), vec2(1.35, 0.25));
  const beak = st(bk.d.sub(mix(float(0.5), float(0.07), bk.h)), 0).mul(maskDraw(pK, bk.h)).mul(on(pK));
  const nibL = inv(ss(0, 0.06, bk.h.sub(pK).abs())).mul(step(pK, 0.99));
  lay(beak, mix(mix(B, W, 0.55), W, nibL).add(H.mul(nibL)));
  // the seed: the stamen bead, swelling out of black; on the kick it swaps hollow/filled
  const pS = el(0, 0.08, 0.95, 0.985), rS = pS.mul(1.15).add(c.kick.mul(0.12).mul(kOn));
  const hollow = is(pmod(beatN, 2), 1).mul(kOn);
  lay(st(r.sub(rS), 0).mul(on(pS)), mix(mix(H, W, st(r, rS.mul(0.4)).mul(0.6)), BG, hollow.mul(st(r, rS.sub(0.28)))).add(W.mul(st(r.sub(rS).abs(), 0.08))));
  lay(st(r.sub(rS.add(0.55)).abs(), 0.07).mul(on(pS.sub(0.6))), H2);
  return cutout(col, cover);
}
