// THE TWIN SERPENTS (a caduceus): striped and neon bead-chain serpents crossing up a staff under a winged orb;
// five layers (params.layer); they arrive and leave scale by scale along the bodies in a seeded order.
import { MeshBasicNodeMaterial, AdditiveBlending, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, mix, atan2, fwidth } from "builtin/tsl";
import { tripClock, visionShown, visionU, climb, maskDraw, maskBeads, maskIris, nib, is, inv } from "./lib/trip.js";

const TAU = 6.28318, S = 1.22, KH = Math.PI / 8;
const band = (v, w) => smoothstep(float(0.25).sub(w), float(0.25).add(w), v.fract().sub(0.5).abs());

export function material(ctx) {
  const layer = ctx.params.layer ?? "being";
  const c = tripClock(ctx);
  const u = visionU(ctx, c);
  const low = ctx.quality === "low";
  const XW = { fore: [0.8, 0.87], veil: [0.83, 0.91], ring: [0.86, 0.94], being: [0.88, 0.985], world: [0.984, 1] }[layer] ?? [0.88, 0.985];
  const E = (v) => (v < 0.015 ? v : 0.15 + (v - 0.02) * 0.833);
  const X = (v) => XW[0] + (Math.min(Math.max(v, 0.93), 1) - 0.93) / 0.07 * (XW[1] - XW[0]);
  const io = (a, b, x, y) => smoothstep(E(a), E(b), u).mul(inv(smoothstep(X(x), X(y), u)));
  const rn = (n) => c.rnd(440 + n), pk = (n, k) => c.pick(440 + n, k);
  const sense = (n) => step(0.5, rn(n)).mul(2).sub(1);
  const fam = pk(0, 3), neon = pk(1, 3), hot = pk(17, 3);
  const blue = vec3(0.05, 0.12, 1.0), violet = vec3(0.45, 0.05, 1.0), ice = vec3(0.45, 0.6, 1.0), W = vec3(1, 1, 1);
  const A = blue.mul(is(fam, 0)).add(violet.mul(is(fam, 1))).add(blue.mul(is(fam, 2)));
  const B = violet.mul(is(fam, 0)).add(blue.mul(is(fam, 1))).add(ice.mul(is(fam, 2)));
  const N = vec3(0.1, 1.0, 0.15).mul(is(neon, 0)).add(vec3(1.0, 0.06, 0.6).mul(is(neon, 1))).add(vec3(1.0, 0.42, 0.02).mul(is(neon, 2)));
  const H = vec3(1.0, 0.85, 0.05).mul(is(hot, 0)).add(vec3(1.0, 0.06, 0.6).mul(is(hot, 1))).add(vec3(1.0, 0.42, 0.02).mul(is(hot, 2)));
  const P = positionGeometry.xy;
  const live = visionShown(ctx, c, 0);
  const kickOn = step(0.001, c.kick);
  const cul = io(0.85, 0.9, 0.93, 0.96).mul(climb(c).mul(0.4).add(0.6));
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;

  if (layer === "world") {
    const aa = fwidth(P.x).mul(1.2).max(0.03);
    const stroke = (d, w) => inv(smoothstep(float(w), aa.add(w), d));
    const ax = P.x.abs();
    const de = vec2(P.x.div(1.5), P.y).length(), an = atan2(P.y, P.x);
    const grow = smoothstep(0, 0.45, u).pow(0.8).mul(inv(smoothstep(0.984, 1, u)));
    const Rf = grow.mul(185).mul(an.mul(2).add(de.mul(0.045).mul(sense(14))).sin().mul(0.22).add(1));
    const fe = vec2(P.x.div(150), P.y.div(84)).length();
    const fq = vec2(P.x.div(3), P.y.div(2.6)), fc = fq.sub(vec2(fq.x.add(fq.y.floor().mod(2).mul(0.5)).floor().sub(fq.y.floor().mod(2).mul(0.5)).add(0.5), fq.y.floor().add(0.5)));
    const feather = step(fe, 0.72).max(step(vec2(fc.x.mul(3), fc.y.mul(2.6)).length(), inv(smoothstep(0.72, 0.97, fe)).mul(1.25)));
    const cover = step(de, Rf).mul(step(0.0005, grow)).mul(feather);
    const edgeL = stroke(Rf.sub(de).abs(), 0.4).mul(inv(smoothstep(0.96, 1, grow)));
    const front = c.beat.fract().mul(130);
    const kl = inv(smoothstep(0, 6, de.sub(front).abs())).mul(kickOn).mul(inv(smoothstep(60, 130, front)));
    const RL = pk(11, 3).mul(10).add(44);
    const ph = P.x.div(RL).mul(TAU).sub(c.real.mul(0.35).mul(sense(10)));
    const z = ph.cos(), y1 = ph.sin().mul(12).add(36), y2 = ph.sin().mul(-12).add(36);
    const sl = ph.cos().mul(12 * TAU).div(RL), nrm = sl.mul(sl).add(1).sqrt();
    const d1 = P.y.sub(y1).abs().div(nrm), d2 = P.y.sub(y2).abs().div(nrm);
    const bx = P.x.div(2.4).fract().sub(0.5).mul(2.4);
    const pH = io(0.3, 0.42, 0.95, 0.97), pR = io(0.42, 0.56, 0.95, 0.97);
    const drawH = maskDraw(pH, ax.div(165));
    const s1 = inv(smoothstep(float(0.5).sub(aa), 0.5, vec2(bx, d1).length().div(z.mul(0.25).add(0.8)))).max(stroke(d1, 0.07));
    const s2 = inv(smoothstep(float(0.5).sub(aa), 0.5, vec2(bx, d2).length().div(z.mul(-0.25).add(0.8)))).max(stroke(d2, 0.07));
    const lr = ph.div(TAU).mul(8).fract().sub(0.5).mul(RL.div(8));
    const between = step(y1.min(y2), P.y).mul(step(P.y, y1.max(y2)));
    const rung = stroke(lr.abs().sub(0.5).abs(), 0.1).mul(between).mul(maskBeads(pR, ax.div(165)));
    let col = A.mul(s1).mul(z.mul(0.25).add(0.45)).add(B.mul(s2).mul(z.mul(-0.25).add(0.45))).mul(drawH);
    col = col.add(mix(B, W, 0.3).mul(rung).mul(ph.sin().abs().mul(0.35).add(0.15)));
    const PK = [[26, -30], [66, -22], [112, -34]];
    let ridge = float(-999);
    for (const [px, py] of PK) ridge = ridge.max(float(py).sub(ax.sub(px).abs().mul(0.7)));
    const v = ridge.sub(P.y);
    const pM = io(0.35, 0.5, 0.95, 0.975);
    const inM = step(0, v).mul(step(v, pM.mul(55)));
    const f = v.div(3.4).fract(), chev = stroke(f.min(inv(f)).mul(3.4), 0.16).mul(inM);
    col = col.add(mix(A, B, v.div(3.4).floor().mod(2)).mul(chev).mul(inv(v.div(70)).max(0).mul(0.45)));
    col = col.add(mix(A, W, 0.4).mul(stroke(v.abs(), 0.22)).mul(maskDraw(pM.mul(1.4), ax.div(160))).mul(0.8));
    PK.forEach(([px, py], i) => {
      const pb = inv(smoothstep(float(1.1).sub(aa), 1.1, vec2(ax.sub(px), P.y.sub(py + 1.6)).length())).mul(maskBeads(pM, i / 3 + 0.3));
      col = mix(col, H, pb);
    });
    const pMo = io(0.5, 0.6, 0.94, 0.965), pMb = io(0.58, 0.7, 0.94, 0.96);
    const mq = vec2(ax.sub(88), P.y.sub(50)), md = mq.length();
    const side = step(0, P.x).mul(2).sub(1);
    const mph = c.real.mul(0.22).mul(sense(12)).add(side.mul(1.57)).sin();
    const disc = inv(smoothstep(float(9).sub(aa), 9, md)).mul(maskIris(pMo, md.div(9)));
    const litM = disc.mul(smoothstep(float(9).sub(aa), 9, mq.sub(vec2(mph.mul(13), 0)).length()));
    col = mix(col, vec3(0), disc).add(mix(B, W, 0.7).mul(litM)).add(A.mul(stroke(md.sub(9).abs(), 0.1)).mul(disc.max(step(0.01, pMo)).mul(0.6)));
    const ma = atan2(mq.y, mq.x).div(TAU).add(c.real.mul(0.01).mul(side)).fract().mul(16);
    const mbd = vec2(ma.fract().sub(0.5).mul(TAU * 12.5 / 16), md.sub(12.5)).length();
    col = col.add(mix(A, H, ma.floor().mod(2)).mul(inv(smoothstep(float(0.5).sub(aa), 0.5, mbd))).mul(maskBeads(pMb, atan2(mq.x, mq.y).div(TAU).add(0.5))).mul(0.8));
    const pSp = io(0.5, 0.56, 0.94, 0.965);
    for (let i = 0; i < (low ? 3 : 5); i++) {
      const age = c.bar.mul(0.5).add(i * 0.37).add(rn(14)).fract();
      const sx = age.mul(70).add(10), sy = age.mul(age).mul(18).add((-18 + 8 * i) * 2.108);
      const sr = inv(age).mul(1.5).add(0.3);
      const sd = vec2(ax.sub(sx), P.y.sub(sy)).length();
      col = mix(col, mix(H, W, inv(age).mul(0.5)).mul(inv(age).mul(0.6).add(0.4)), inv(smoothstep(sr.sub(aa), sr, sd)).mul(step(0.01, pSp)));
    }
    col = col.mul(kl.mul(0.9).add(1)).add(A.mul(edgeL).mul(0.9));
    m.colorNode = col;
    m.opacityNode = cover.mul(live);
    m.alphaTest = 0.5;
    return m;
  }

  if (layer === "ring") {
    const aa = fwidth(P.x).mul(1.2).max(0.02), blur = aa.mul(3.5);
    const stroke = (d, w) => inv(smoothstep(float(w), blur.add(w), d));
    const rr = P.length(), k = atan2(P.x, P.y).div(TAU).abs().mul(2);
    const pe = io(0.4, 0.5, 0.95, 0.975), pe2 = io(0.43, 0.53, 0.95, 0.975), pb = io(0.44, 0.56, 0.945, 0.97), pc = io(0.48, 0.6, 0.945, 0.97);
    const front = c.beat.fract().mul(50);
    const kl = inv(smoothstep(0, 3.5, rr.sub(front).abs())).mul(kickOn).mul(inv(smoothstep(24, 50, front)));
    const l1 = stroke(rr.sub(44).abs(), 0.09).mul(maskDraw(pe, k));
    const l2 = stroke(rr.sub(41.4).abs(), 0.06).mul(maskDraw(pe2, k));
    const rot = c.real.div(mix(55, 100, rn(6))).mul(sense(5));
    const nB = pk(4, 3).mul(6).add(24);
    const an = atan2(P.y, P.x).div(TAU).add(rot).fract().mul(nB);
    const alt = an.floor().mod(2);
    const db = vec2(an.fract().sub(0.5).mul(TAU * 42.7).div(nB), rr.sub(42.7)).length();
    const rad = mix(float(0.8), float(0.45), alt);
    const bead = inv(smoothstep(rad.sub(blur), rad, db)).mul(maskBeads(pb, k));
    const an2 = atan2(P.y, P.x).div(TAU).sub(rot.mul(1.6)).fract().mul(20);
    const lx = an2.fract().sub(0.5).mul(TAU * 36 / 20), ly = rr.sub(36);
    const chev = stroke(ly.sub(lx.abs().mul(0.7).sub(0.7)).abs(), 0.1).mul(step(lx.abs(), 1.7)).mul(maskBeads(pc, k));
    const dash = stroke(rr.sub(33.5).abs(), 0.04).mul(step(an2.mul(3).fract(), 0.5)).mul(maskDraw(pc, k));
    const lit = float(0.4).add(cul.mul(0.45)).add(kl.mul(0.8));
    m.colorNode = A.mul(l1.add(l2).mul(lit)).add(mix(W, H, alt).mul(bead).mul(lit.add(0.15))).add(mix(B, W, 0.4).mul(chev).mul(lit)).add(B.mul(dash).mul(0.35));
    m.opacityNode = live;
    m.transparent = true;
    m.blending = AdditiveBlending;
    m.depthWrite = false;
    return m;
  }

  if (layer === "veil") {
    const aa = fwidth(P.x).mul(1.2).max(0.02);
    const ax = P.x.abs(), nV = pk(15, 3).add(3);
    const fold = inv(smoothstep(0.84, 0.9, u));
    let col = vec3(0), cover = float(0);
    const LANE = [1, 3, 0, 2, 4];
    for (let j = 0; j < (low ? 3 : 5); j++) {
      const age = u.sub(0.62 + j * 0.035).mul(24);
      const on = step(0, age).mul(step(j, nV.sub(0.5)));
      const yj = float(40 - j * 3).sub(age.mul(4.5 + j * 0.6));
      const xj = float(33 + LANE[j] * 6).add(age.mul(0.8).add(j).sin().mul(3));
      const tl = age.mul(1.1).add(j * 2).sin().mul(0.6).add(0.9);
      const q = vec2(ax.sub(xj), P.y.sub(yj)), cs = tl.cos(), sn = tl.sin();
      const al = q.x.mul(cs).add(q.y.mul(sn)), ac = q.y.mul(cs).sub(q.x.mul(sn));
      const L = 5, hw = fold.mul(1.2).max(0.01);
      const e = vec2(al.div(L), ac.div(hw)).length();
      const mask = step(e, 1).mul(on);
      const rim = smoothstep(0.8, 0.92, e);
      const rach = inv(smoothstep(0.06, aa.add(0.06), ac.abs())).mul(step(al.abs(), L * 0.9));
      const barb = band(al.add(ac.abs().mul(1.2)).mul(1.3), aa.mul(1.3)).mul(0.35);
      const tipB = inv(smoothstep(float(0.4).sub(aa), 0.4, vec2(al.sub(L * 0.78), ac).length()));
      const fc = mix(mix(A.mul(barb).add(mix(B, W, 0.3).mul(rim)).add(B.mul(rach)), H, tipB), vec3(0), inv(fold));
      col = mix(col, fc.mul(cul.mul(0.3).add(0.8)), mask); cover = cover.max(mask);
    }
    m.colorNode = col;
    m.opacityNode = cover.mul(live);
    m.alphaTest = 0.5;
    return m;
  }

  if (layer === "fore") {
    const aa = fwidth(P.x).mul(1.2).max(0.01);
    const ax = P.x.abs(), pin = io(0.66, 0.8, 0.93, 0.955);
    let col = vec3(0), cover = float(0);
    for (let j = 0; j < (low ? 4 : 6); j++) {
      const xj = c.real.mul(0.018 * (1 + j * 0.25)).mul(sense(10)).add(j * 0.19).fract().mul(30).add(26);
      const yj = xj.mul(0.17).sub(c.real.mul(0.8)).add(j * 1.7).sin().mul(2.8).add(j % 2 ? 23 : -25);
      const rad = 1.3 + (j % 3) * 0.3;
      const q = vec2(ax.sub(xj), P.y.sub(yj)).div(rad);
      const pj = pin.mul(1.7).sub(j * 0.12).clamp(0, 1);
      const ea = aa.div(rad);
      const disc = inv(smoothstep(inv(ea), 1, q.length())).mul(step(0.01, pj));
      const ring = (o) => inv(smoothstep(float(0.07), ea.add(0.07), q.sub(vec2(o, 0)).length().sub(0.34).abs()));
      const lem = ring(0.4).max(ring(-0.4)).mul(step(0.5, pj));
      const dot = inv(smoothstep(float(0.12).sub(ea), 0.12, q.length())).mul(step(0.8, pj));
      const fc = mix(j % 2 ? N : mix(B, W, 0.6), vec3(0), inv(lem)).add(H.mul(dot));
      col = mix(col, fc.mul(cul.mul(0.3).add(0.85)), disc); cover = cover.max(disc);
    }
    m.colorNode = col;
    m.opacityNode = cover.mul(live);
    m.alphaTest = 0.5;
    return m;
  }

  const p = P.div(c.real.mul(TAU / 8).sin().mul(0.018).add(1).mul(S)).add(vec2(0, 3));
  const aa = fwidth(p.x).mul(1.2).max(0.008);
  const stroke = (d, w) => inv(smoothstep(float(w), aa.add(w), d));
  const ax = p.x.abs();
  let col = vec3(0), cover = float(0);
  const paint = (colour, mask) => { col = mix(col, colour, mask); cover = cover.max(mask); };
  const add = (colour, mask) => { col = col.add(colour.mul(mask)); cover = cover.max(mask); };

  const nF = pk(3, 3).add(low ? 2 : 4), pW = io(0.3, 0.42, 0.93, 0.95);
  for (let j = 0; j < (low ? 4 : 6); j++) {
    const jf = float(j).div(nF.sub(1)).min(1);
    const pj = pW.mul(1.6).sub(jf.mul(0.6)).clamp(0, 1);
    const a = mix(float(-1.25), mix(float(-0.1), float(0.95), jf), pj);
    const L = jf.mul(4.5).add(6), hw = float(0.85).sub(jf.mul(0.15));
    const q = vec2(ax.sub(2.4), p.y.sub(23.4)), dc = a.cos(), ds = a.sin();
    const al = q.x.mul(dc).add(q.y.mul(ds)), ac = q.y.mul(dc).sub(q.x.mul(ds));
    const e = vec2(al.sub(L.mul(0.5)).div(L.mul(0.5)), ac.div(hw)).length();
    const mask = step(e, 1).mul(step(0.01, pj)).mul(step(j, nF.sub(0.5)));
    const rim = smoothstep(0.82, 0.93, e);
    const rach = stroke(ac.abs(), 0.05).mul(step(al, L.mul(0.9)));
    const barb = band(al.mul(1.4).add(ac.abs().mul(1.6)), aa.mul(1.5)).mul(0.3);
    const tipB = inv(smoothstep(float(0.38).sub(aa), 0.38, vec2(al.sub(L.mul(0.82)), ac).length()));
    paint(mix(A.mul(barb).add(mix(A, W, 0.3).mul(rim)).add(B.mul(rach)), H, tipB), mask);
  }

  const pSt = io(0.0, 0.08, 0.975, 1.0);
  const kSt = mix(p.y.div(20), p.y.negate().div(27), step(p.y, 0));
  const stBody = step(ax, 0.6).mul(maskDraw(pSt, kSt)).mul(step(kSt, 1));
  const knobD = vec2(p.x, p.y.add(27.4)).length();
  const knob = inv(smoothstep(float(1.1).sub(aa), 1.1, knobD)).mul(step(0.97, pSt));
  const stMask = stBody.max(knob);
  const stCol = W.mul(band(p.y.div(0.9), aa)).mul(0.85).mul(step(ax, 0.48)).add(A.mul(stroke(ax.sub(0.6).abs(), 0.06))).add(H.mul(stroke(knobD.sub(0.75).abs(), 0.08)).mul(knob));

  const Am = rn(16).mul(2).add(6.5);
  const th = p.y.add(18).mul(KH);
  const g0 = 1 / KH, g1 = Am.mul(Am).add(g0 * g0).sqrt();
  const arc = g1.add(g0).mul(0.5).mul(th).add(g1.sub(g0).mul(0.25).mul(th.mul(2).sin()));
  const tt = th.sub(-7 * KH).div(43 * KH);
  const span = step(0, tt).mul(step(tt, 1));
  const r = mix(float(0.55), float(1.35), tt.clamp(0, 1));
  const sl = Am.mul(KH).mul(th.cos()), nrm = sl.mul(sl).add(1).sqrt();
  const q = arc.div(1.5), al = q.fract().sub(0.5).mul(1.5), bi = q.floor();
  const run = inv(smoothstep(0, 0.035, tt.sub(c.beat.fract()).abs())).mul(kickOn);
  const flipOn = step(0.45, u), iv = pk(9, 2);
  const rate = inv(is(iv, 0).mul(step(0.5, cul))).add(is(iv, 0).mul(step(0.5, cul)).mul(2));
  const flip = c.bar.mul(rate).floor().mod(2).mul(flipOn);
  const inverted = is(iv, 1).mul(step(0.5, cul)).mul(flip);
  const arcAt = (t) => g1.add(g0).mul(0.5 * t).add(g1.sub(g0).mul(0.25 * Math.sin(2 * t)));
  const a0 = arcAt(-7 * KH), aL = arcAt(36 * KH).sub(a0).max(1);
  const kb = bi.add(0.5).mul(1.5).sub(a0).div(aL).clamp(0, 1);
  const vE = pk(19, 3), vX = pk(20, 3);
  const serpent = (sgn, e0, e1, x0, x1) => {
    const pS = io(e0, e1, x0, x1), pE = smoothstep(E(e0), E(e1), u).mul(1.1), pX = smoothstep(X(x0), X(x1), u).mul(1.1);
    const h = bi.mul(12.9898).add(sgn * 7.1).sin().mul(43758.5).fract();
    const kE = kb.mul(is(vE, 0)).add(inv(kb).mul(is(vE, 1))).add(kb.mul(0.5).add(bi.mod(2).mul(0.5)).mul(is(vE, 2)));
    const kX = inv(kb).mul(is(vX, 0)).add(h.mul(0.75).add(kb.mul(0.25)).mul(is(vX, 1))).add(bi.mod(3).div(3).add(kb.div(3)).mul(is(vX, 2)));
    const sc = smoothstep(kE, kE.add(0.1), pE).mul(inv(smoothstep(kX, kX.add(0.1), pX)));
    const pop = sc.mul(inv(sc)).mul(4).clamp(0, 1);
    const dp = p.x.sub(Am.mul(th.sin()).mul(sgn)).div(nrm);
    const bd = vec2(al, dp).length();
    const rs = r.mul(sc), shape = (g) => inv(smoothstep(rs.add(g * 0.5).sub(aa), rs.add(g * 0.5), bd)).max(step(dp.abs(), rs.mul(0.32).add(g * 0.5).mul(sc))).mul(span).mul(step(0.02, sc)).mul(step(0.01, pS));
    const body = shape(0), gap = shape(0.38);
    const rim = stroke(bd.sub(rs).abs(), 0.07);
    const lead = pop.mul(rim.max(step(bd, rs.mul(0.5))));
    let colour;
    if (sgn > 0) {
      const pat = mix(band(bd.div(r).mul(1.6), aa.mul(2)), band(dp.div(r).mul(1.4), aa.mul(2)), bi.mod(2));
      colour = W.mul(mix(pat, inv(pat), inverted)).mul(0.9).mul(step(bd, r)).add(W.mul(rim).mul(0.5));
    } else {
      const t2 = dp.div(r).mul(1.4);
      const dia = band(arc.div(0.9).add(t2), aa.mul(2)).mul(band(arc.div(0.9).sub(t2), aa.mul(2)));
      const hb = inv(smoothstep(float(0.26).sub(aa), 0.26, bd));
      colour = mix(N.mul(dia.mul(0.8).add(0.1)).mul(step(bd, r)), H, hb).add(N.mul(rim).mul(0.7));
    }
    colour = colour.add(mix(A, W, 0.5).mul(rim).mul(run)).add(W.mul(lead).mul(1.4)).mul(cul.mul(0.35).add(1));
    return { body, gap, colour };
  };
  const S1 = serpent(1, 0.08, 0.2, 0.95, 0.985), S2 = serpent(-1, 0.12, 0.24, 0.95, 0.985);
  const ci = p.y.add(18).div(8).round().clamp(0, 4);
  const f1 = step(ci.add(flip).add(step(0.5, rn(18))).mod(2), 0.5);
  paint(mix(S1.colour, S2.colour, f1), mix(S1.body, S2.body, f1));
  paint(stCol, stMask);
  add(W.mul(1.4), nib(pSt, kSt, 0.03).mul(step(ax, 1.2)).mul(step(pSt, 0.99)).mul(step(0.01, pSt)));
  paint(vec3(0), mix(S2.gap, S1.gap, f1));
  paint(mix(S2.colour, S1.colour, f1), mix(S2.body, S1.body, f1));

  const pHd = io(0.2, 0.27, 0.945, 0.96);
  for (const sgn of [1, -1]) {
    const hx = Am.sub(0.3).mul(sgn), hy = 18.9;
    const hq = vec2(p.x.sub(hx).div(2.1), p.y.sub(hy).div(1.45)), hd = hq.length();
    const head = inv(smoothstep(inv(aa.div(1.45)), 1, hd)).mul(maskIris(pHd, hd));
    const eye = inv(smoothstep(float(0.38).sub(aa), 0.38, vec2(p.x.sub(hx.sub(0.8 * sgn)), p.y.sub(hy + 0.45)).length()));
    const slit = stroke(p.x.sub(hx.sub(0.8 * sgn)).abs(), 0.07);
    const tx = p.x.sub(hx).mul(-sgn);
    const tongue = stroke(p.y.sub(hy - 0.2).sub(tx.sub(3.3).max(0).mul(p.y.sub(hy - 0.2)).sign().mul(0)).abs(), 0.07).mul(step(2.0, tx)).mul(step(tx, 3.6)).mul(step(0.99, pHd));
    const fork = stroke(p.y.sub(hy - 0.2).abs().sub(tx.sub(3.6)).abs(), 0.06).mul(step(3.6, tx)).mul(step(tx, 4.2)).mul(step(0.99, pHd));
    const mark = sgn > 0 ? W.mul(band(p.x.div(0.7), aa)).mul(0.7) : N.mul(band(vec2(p.x, p.y).length().div(0.5), aa)).mul(0.6);
    const hc = mix(mark.mul(step(hd, 0.72)).add(mix(sgn > 0 ? W : N, A, 0.3).mul(smoothstep(0.8, 0.93, hd))), mix(H, vec3(0), slit), eye);
    paint(hc, head);
    add(H, tongue.max(fork));
  }

  const pO = io(0.26, 0.34, 0.95, 0.97), pOg = io(0.02, 0.1, 0.96, 0.98), pOb = io(0.52, 0.62, 0.94, 0.955);
  const oq = vec2(p.x, p.y.sub(22.8)), od = oq.length();
  const orb = inv(smoothstep(float(2.9).sub(aa), 2.9, od)).mul(maskIris(pO, od.div(2.9)));
  const pr = cul.mul(0.7).add(0.85);
  const iris = band(od.mul(1.7).sub(c.real.mul(0.5)), aa.mul(2)).mul(step(pr, od));
  const oc = mix(mix(A, B, od.div(2.9)).mul(iris).add(W.mul(stroke(od.sub(2.9).abs(), 0.07))), H, inv(smoothstep(pr.sub(aa), pr, od)));
  paint(oc, orb);
  const kTop = atan2(oq.x, oq.y).div(TAU).abs().mul(2);
  add(W.mul(0.35), stroke(od.sub(2.9).abs(), 0.05).mul(step(atan2(oq.y, oq.x).div(TAU).mul(40).fract(), 0.45)).mul(maskDraw(pOg, kTop)).mul(inv(step(0.99, pO))));
  const oa = atan2(oq.y, oq.x).div(TAU).add(c.real.mul(0.02).mul(sense(5).negate())).fract().mul(12);
  const obd = vec2(oa.fract().sub(0.5).mul(TAU * 4.3 / 12), od.sub(4.3)).length();
  paint(mix(B, W, oa.floor().mod(2).mul(0.6)), inv(smoothstep(float(0.4).sub(aa), 0.4, obd)).mul(maskBeads(pOb, kTop)));

  const pG = io(0.5, 0.65, 0.935, 0.95), gs = pk(2, 3);
  const dy = p.y.add(18).sub(ci.mul(8)), gOn = maskBeads(pG, ci.div(5));
  const kr = vec2(p.x, dy).length(), ka = atan2(dy, p.x).div(TAU).add(0.5).mul(10).add(c.real.mul(0.1).mul(sense(18)));
  const kn = inv(smoothstep(float(0.22).sub(aa), 0.22, vec2(ka.fract().sub(0.5).mul(TAU * 2.4 / 10), kr.sub(2.4)).length())).mul(gOn);
  add(H.mul(0.9), kn.mul(inv(step(0.5, cover)).max(step(Am.mul(0.15), kr.sub(2.4).abs()).mul(0).add(1))));
  const gx = ax.sub(Am.add(3.4)), sz = c.kick.mul(0.3).add(1).mul(1.3);
  const s4 = gx.abs().div(sz).sqrt().add(dy.abs().div(sz).sqrt());
  const star = inv(smoothstep(inv(aa.div(sz)), 1, s4));
  const ty = dy.sub(dy.div(0.9).round().clamp(-1, 1).mul(0.9));
  const triad = inv(smoothstep(float(0.3).sub(aa), 0.3, vec2(gx, ty).length())).mul(step(dy.abs(), 1.3));
  const almond = step(dy.abs(), inv(gx.div(1.4).mul(gx.div(1.4))).max(0).mul(0.7));
  const pupil = inv(smoothstep(float(0.3).sub(aa), 0.3, vec2(gx, dy).length()));
  const eyeC = mix(W.mul(smoothstep(0.45, 0.62, dy.abs().div(inv(gx.div(1.4).mul(gx.div(1.4))).max(0.01).mul(0.7)))).mul(0.8), H, pupil);
  paint(mix(B, W, 0.8), star.mul(is(gs, 0)).mul(gOn));
  paint(H, triad.mul(is(gs, 1)).mul(gOn));
  paint(eyeC, almond.mul(is(gs, 2)).mul(gOn));

  m.colorNode = col;
  m.opacityNode = cover.mul(live);
  m.alphaTest = 0.5;
  return m;
}
