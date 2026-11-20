// THE CIRCUIT ORACLE: a serene mirrored face of 45-degree circuit traces ending in round vias; current runs out of a
// third-eye node and lights each via as it reaches it. Layers (params.layer): world z-30 the board mandala (scrolls),
// ring z-12 bus rings (turn, additive), being z0 the face (breathes), veil z+10 trace fragments + moire eye rows,
// fore z+22 solder beads. Entrance/exit are traces lighting/draining along their own paths, three seeded orders each
// (ch 416 / 417): out from the third eye, in from the vias, trace by trace. World stays lit to the slot's end.
// Seed channels 400..417: 0 hue, 1 hot, 2 detail, 3 spokes, 4 scroll, 5 beads, 6 ring sense, 9 moire, 10 fragments,
// 12 current speed, 13 fore rows, 14 bus spacing, 15 glyph radius, 16 entrance order, 17 exit order.
import { MeshBasicNodeMaterial, AdditiveBlending, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, mix, fwidth, select } from "builtin/tsl";
import { tripClock, visionShown, visionU, climb, maskDraw, maskBeads, maskClock, inv, is, sgn, ang2, segH, strokeAA, ioU } from "./lib/trip.js";

const TAU = 6.28318, F = 1.5;
const DEPTH = { world: 104, ring: 86, being: 74, veil: 64, fore: 52 };
const OY = 4.5, EY = 13.5, EYE = [10.5, 7.5];
const TR = [
  { off: 1.4, pts: [[0, 10.4], [0, 18]] },
  { off: 1.0, pts: [[1.4, 9.6], [3.3, 11.5], [9, 11.5], [11, 9.5, 1]] },
  { off: 1.3, pts: [[0.7, 7.9], [1.2, 7.4], [1.2, 0.5], [2.8, -1.1, 1]] },
  { off: 6.0, pts: [[3.5, 5, 1], [5, 3.5], [9, 3.5], [10.5, 5, 1]] },
  { off: 15, pts: [[0, -5.5], [2.5, -5.5], [4, -4, 1]] },
  { off: 9.0, pts: [[0, 18, 1], [6, 18, 1], [12, 12, 1], [12, 2, 1], [10, 0], [10, -6, 1], [4, -12, 1], [0, -12, 1]] },
].map((t) => ({ off: t.off * F, pts: t.pts.map(([x, y, v]) => [x * F, y * F, v]) }));
const VIAS = [];
let SMAX = 0;
TR.forEach((t, i) => {
  let L = t.off;
  const vs = [];
  t.pts.forEach((p, j) => { if (j) L += Math.hypot(p[0] - t.pts[j - 1][0], p[1] - t.pts[j - 1][1]); if (p[2]) vs.push([p[0], p[1], L]); });
  t.L = L;
  for (const v of vs) VIAS.push([v[0], v[1], v[2], (i + (v[2] - t.off) / Math.max(L - t.off, 0.01)) / TR.length]);
  SMAX = Math.max(SMAX, L);
});
const SP = SMAX + 2;
const LID = [[3.5, 5], [5, 6.5], [9, 6.5], [10.5, 5]].map(([x, y]) => [x * F, y * F]);
const DET = [[[0, 18.6], [0, 21], [3, 24]], [[7, 3.2], [7, -1.5], [8.5, -3]], [[12, 7], [13.5, 7], [15, 5.5]]];

function poly(q, pts, off = 0) {
  let d = float(1000), s = float(0), L = off;
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i], b = pts[i + 1], len = Math.hypot(b[0] - a[0], b[1] - a[1]);
    const g = segH(q, vec2(a[0], a[1]), vec2(b[0], b[1]));
    s = select(g.d.lessThan(d), g.h.mul(len).add(L), s);
    d = d.min(g.d);
    L += len;
  }
  return { d, s, L };
}
function wellBeads(p, sp, rot, rb) {
  const r = p.length(), j = r.div(sp).round().max(1);
  const nj = j.mul(TAU).floor().max(1);
  const a = ang2(p.y, p.x).div(TAU).add(j.mul(rot)).mul(nj);
  const dd = vec2(r.sub(j.mul(sp)), a.add(0.5).fract().sub(0.5).mul(TAU).mul(j.mul(sp)).div(nj)).length();
  return { dd, j, r, in: inv(smoothstep(rb.sub(0.06), rb, dd)) };
}

export function material(ctx) {
  const layer = ctx.params.layer ?? "being";
  const low = ctx.quality === "low";
  const c = tripClock(ctx);
  const u = visionU(ctx, c);
  const io = ioU(u);
  const rn = (n) => c.rnd(400 + n), pk = (n, k) => c.pick(400 + n, k);
  const fam = pk(0, 3), hot = pk(1, 3), ve = pk(16, 3), vx = pk(17, 3);
  const pick3 = (a, b, d) => a.mul(is(ve, 0)).add(b.mul(is(ve, 1))).add(d.mul(is(ve, 2)));
  const pickX = (a, b, d) => a.mul(is(vx, 0)).add(b.mul(is(vx, 1))).add(d.mul(is(vx, 2)));
  const blue = vec3(0.05, 0.12, 1.0), violet = vec3(0.45, 0.05, 1.0), ice = vec3(0.45, 0.6, 1.0), W = vec3(1, 1, 1);
  const A = blue.mul(is(fam, 0)).add(violet.mul(is(fam, 1))).add(blue.mul(is(fam, 2)));
  const B = violet.mul(is(fam, 0)).add(blue.mul(is(fam, 1))).add(ice.mul(is(fam, 2)));
  const H = vec3(1.0, 0.05, 0.6).mul(is(hot, 0)).add(vec3(1.0, 0.42, 0.02).mul(is(hot, 1))).add(vec3(0.1, 1.0, 0.15).mul(is(hot, 2)));
  const q = positionGeometry.xy.mul(74 / DEPTH[layer]);
  const aa = fwidth(q.x).mul(1.2).max(0.02);
  const stroke = strokeAA(aa);
  const live = visionShown(ctx, c, 0);
  const kickOn = step(0.001, c.kick);
  const O = vec2(0, OY);
  const lock = smoothstep(0.77, 0.8, u).mul(climb(c).mul(0.3).add(0.7));
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  m.alphaTest = 0.5;

  if (layer === "world") {
    const p = q.sub(O), r = p.length().max(0.01);
    const an = ang2(p.y, p.x).div(TAU / 8);
    const fa = an.add(0.5).fract().sub(0.5).abs();
    const xs = fa.mul(TAU / 8).mul(r);
    const kq = float(1.3).add(rn(14).mul(0.12)), lk = kq.log();
    const lr = r.div(8).max(0.01).log().div(lk).sub(c.real.mul(0.045).mul(sgn(rn(4))));
    const bw = r.mul(lk), fn = lr.add(0.5).fract().sub(0.5).mul(bw), fr = lr.fract();
    const w = r.mul(0.004).max(0.1);
    // trace-order keys 0..1: along the spokes, bus ring by bus ring, sector by sector round the clock
    const kS = r.div(inv(fa.mul(0.9)).mul(120)).clamp(0, 1);
    const kR = r.div(8).max(1).log().div(lk).floor().div(float(Math.log(15)).div(lk)).clamp(0, 1);
    const kC = an.floor().add(8).mod(8).add(kS).div(8.001);
    const keyE = pick3(kS, kR.mul(0.85).add(kS.mul(0.15)), kC);
    const keyX = pickX(inv(kS), kR, inv(kC));
    const pE = smoothstep(0, 0.4, u).pow(0.7).mul(1.03);
    const rem = inv(smoothstep(0.99, 1, u)).mul(1.02).sub(0.01);
    const ahead = keyE.sub(pE);
    const re = vec2(p.x.mul(0.5625), p.y).length();
    const fb = wellBeads(vec2(p.x.mul(0.5625), p.y), float(1.8), float(0), inv(smoothstep(44, 60, re)).mul(0.85));
    const feather = step(re, 44).max(fb.in.mul(step(re, 60)));
    const cover = step(keyE, pE).max(step(fn.abs(), bw.mul(0.12)).mul(step(ahead, 0.08))).max(step(xs, 1.2).mul(step(ahead, 0.15)))
      .mul(step(0.002, pE)).mul(step(keyX, rem)).mul(feather);
    const bus = stroke(fn.sub(bw.mul(0.05)).abs(), w).max(stroke(fn.add(bw.mul(0.05)).abs(), w));
    const spoke = stroke(xs, w.mul(1.3)).max(stroke(fa.sub(0.5).abs().mul(TAU / 8).mul(r), w).mul(step(0.5, rn(3))));
    const vr = bw.mul(0.07).max(0.35);
    const v1 = vec2(xs, fn).length(), v2 = vec2(xs.sub(bw.mul(0.42)), fn).length();
    let traces = bus.max(spoke), vias = stroke(v1.sub(vr).abs(), w).mul(step(14, r)), vdot = inv(smoothstep(vr.mul(0.4), vr.mul(0.4).add(aa), v1)).mul(step(14, r));
    if (!low) {
      traces = traces.max(stroke(xs.sub(fr.mul(bw).min(bw.mul(0.42))).abs().mul(0.7071), w).mul(step(18, r)));
      vias = vias.max(stroke(v2.sub(vr).abs(), w).mul(step(14, r)));
      vdot = vdot.max(inv(smoothstep(vr.mul(0.4), vr.mul(0.4).add(aa), v2)).mul(step(14, r)));
    }
    const front = c.beat.fract().mul(140);
    const kl = inv(smoothstep(0, 7, r.sub(front).abs())).mul(kickOn).mul(inv(smoothstep(60, 140, front)));
    const pen = inv(smoothstep(0, 0.03, ahead.abs())).mul(step(0.002, pE)).mul(inv(step(1, pE)))
      .add(inv(smoothstep(0, 0.04, keyX.sub(rem).abs())).mul(step(0.99, u)));
    const glim = smoothstep(0, 0.12, u).mul(0.7).add(0.3);
    let col = A.mul(traces).mul(float(0.2).add(kl.mul(0.9)).add(pen.mul(0.8))).mul(glim);
    col = col.add(B.mul(vias).mul(float(0.35).add(kl))).add(mix(B, H, kl.max(pen)).mul(vdot).mul(float(0.25).add(kl.mul(1.2)).add(pen)));
    const pg = io(0.62, 0.72, 0.85, 0.9), R1 = float(40).add(rn(15).mul(8));
    const sm = an.floor().add(0.5).mul(TAU / 8);
    const g = p.sub(vec2(sm.cos(), sm.sin()).mul(R1)).length();
    const gl = stroke(g.sub(1.3).abs(), 0.12).max(stroke(g.sub(2.2).abs(), 0.1)).max(stroke(g.sub(3.1).abs(), 0.18)).max(inv(smoothstep(0.5, 0.55, g)));
    const glyph = gl.mul(maskBeads(pg, an.floor().add(8).mod(8).div(8))).mul(step(g, 3.6));
    col = mix(col, mix(B, W, 0.5).mul(float(0.6).add(kl)), glyph);
    m.colorNode = col.mul(inv(smoothstep(40, 60, re)).mul(0.6).add(0.4));
    m.opacityNode = cover.mul(live);
    return m;
  }

  if (layer === "ring") {
    const p = q.sub(O), r = p.length().max(0.01);
    const ang = ang2(p.x, p.y);
    const p1 = io(0.4, 0.47, 0.84, 0.88), p2 = io(0.45, 0.53, 0.85, 0.89), p3 = io(0.5, 0.58, 0.86, 0.9);
    const busR = 27.2;
    const bus = stroke(r.sub(busR - 0.45).abs(), 0.09).max(stroke(r.sub(busR + 0.45).abs(), 0.09)).mul(maskClock(p1, ang)).mul(maskClock(p1, ang.negate()));
    const N = float(24).add(c.pick(405, 3).mul(8)), sn = sgn(rn(6));
    const k1 = ang.div(TAU).add(c.real.mul(0.012).mul(sn)).mul(N), id1 = k1.floor().add(N.mul(8)).mod(N);
    const d1 = vec2(k1.add(0.5).fract().sub(0.5).mul(TAU * 30).div(N), r.sub(30)).length();
    const bm = maskBeads(p2, id1.div(N));
    const bead = inv(smoothstep(0.75, 0.85, d1)).mul(bm), beadRing = stroke(d1.sub(1.15).abs(), 0.08).mul(bm);
    const N2 = N.div(2), k2 = ang.div(TAU).sub(c.real.mul(0.02).mul(sn)).mul(N2), id2 = k2.floor().add(N2.mul(8)).mod(N2);
    const x2 = k2.add(0.5).fract().sub(0.5).mul(TAU * 23.5).div(N2);
    const tv = vec2(x2, r.sub(24.3)).length();
    const counter = stroke(x2.abs(), 0.12).mul(step(r, 23.5)).mul(step(21.6, r)).max(stroke(tv.sub(0.6).abs(), 0.1)).max(inv(smoothstep(0.25, 0.32, tv))).mul(maskBeads(p3, id2.div(N2)));
    const halo = r.sub(26).div(7).pow(2).negate().exp().mul(0.1).mul(io(0.4, 0.5, 0.84, 0.9));
    let col = A.mul(bus).mul(0.7).add(mix(B, H, is(id1.mod(4), 0)).mul(bead).mul(float(0.7).add(kickOn.mul(c.kick).mul(0.6)))).add(B.mul(beadRing).mul(0.5));
    col = col.add(mix(A, W, 0.4).mul(counter).mul(0.65)).add(A.mul(halo));
    m.colorNode = col.mul(step(r, 33));
    m.opacityNode = live;
    m.alphaTest = 0;
    m.transparent = true;
    m.blending = AdditiveBlending;
    m.depthWrite = false;
    return m;
  }

  if (layer === "veil") {
    const qm = vec2(q.x.abs(), q.y);
    const pv = io(0.64, 0.72, 0.82, 0.86);
    const cnt = float(4).add(step(0.5, rn(10)).mul(2));
    let body = float(0), line = float(0), vring = float(0), vdot = float(0);
    for (let i = 0; i < (low ? 4 : 6); i++) {
      const x = 33 + i * 3.1 + (i % 2) * 4;
      const y = c.real.mul(0.5 + i * 0.07).add(i * 17.3).mod(56).sub(28);
      const fl = i % 2 ? -1 : 1, a = vec2(x, y), b = vec2(x + 3.2 * fl, y), e = vec2(x + 5.4 * fl, y.add(2.2));
      // each fragment lights along its own trace: from its via a, through the jog, to its via e
      const ga = segH(qm, a, b), gb = segH(qm, b, e);
      const t = select(ga.d.lessThan(gb.d), ga.h.mul(0.6), gb.h.mul(0.4).add(0.6));
      const sz = inv(smoothstep(20, 26, y.abs())).mul(step(i + 0.5, cnt)).mul(step(0.01, pv));
      const lit = maskDraw(pv.mul(1.6).sub(i * 0.1).clamp(0, 1), t);
      const dl = ga.d.min(gb.d), da = qm.sub(a).length(), de = qm.sub(e).length();
      const on = step(0.02, sz);
      body = body.max(stroke(dl, sz.mul(0.55)).mul(lit).max(stroke(da, sz.mul(1.05))).max(stroke(de, sz.mul(1.05)).mul(lit)).mul(on));
      line = line.max(stroke(dl, sz.mul(0.13)).mul(lit).mul(on));
      const dv = da.min(de);
      vring = vring.max(stroke(dv.sub(sz.mul(0.7)).abs(), sz.mul(0.12)).mul(on));
      vdot = vdot.max(stroke(dv, sz.mul(0.3)).mul(on));
    }
    const pm = io(0.74, 0.78, 0.83, 0.87), mv = pk(9, 2);
    const pe = qm.sub(vec2(EYE[0], EYE[1]));
    const sp = float(0.9).mul(inv(lock).mul(is(mv, 0)).mul(0.075).add(1));
    const rot = inv(lock).mul(is(mv, 1)).mul(c.real.mul(0.6).sin().mul(0.02).add(0.03));
    const wb = wellBeads(pe, sp, rot, float(0.24));
    const lens = step(wb.r, pm.mul(6.2)).mul(step(0.01, pm));
    const halo = inv(smoothstep(0.4, 0.46, wb.dd)).mul(lens);
    let col = A.mul(line).mul(0.9).add(B.mul(vring)).add(H.mul(vdot).mul(0.9));
    col = mix(col, mix(B, W, lock.mul(0.6)).mul(float(0.7).add(lock.mul(0.5))), wb.in.mul(lens));
    m.colorNode = col;
    m.opacityNode = body.max(halo).mul(live);
    return m;
  }

  if (layer === "fore") {
    const qf = vec2(q.x.abs(), select(step(0.5, rn(13)).greaterThan(0.5), q.y.abs().negate(), q.y));
    const pf = io(0.7, 0.78, 0.8, 0.84);
    let body = float(0), col = vec3(0);
    const n = low ? 5 : 7;
    for (let i = 0; i < n; i++) {
      const x = 48 + i * 6;
      const y = float(-35 - i * 1.4).add(float(x * 0.11).sub(c.real.mul(1.2)).sin().mul(2.6));
      const rr = 1.3 + i * 0.13, d = qf.sub(vec2(x, y)).length();
      const on = maskBeads(pf, (n - 1 - i) / n);
      const lead = i < n - 1 ? stroke(segH(qf, vec2(x + rr, y), vec2(x + 3, y.add(1.6))).d, 0.12) : float(0);
      const disc = stroke(d, rr * 1.3);
      body = body.max(disc.mul(on));
      col = col.add(B.mul(stroke(d.sub(rr).abs(), 0.16)).add(mix(H, W, kickOn.mul(c.kick).mul(0.5)).mul(stroke(d, rr * 0.36))).add(A.mul(lead).mul(0.6)).mul(on).mul(disc));
    }
    m.colorNode = col;
    m.opacityNode = body.mul(live);
    return m;
  }

  // BEING
  const br = c.real.mul(0.7).sin().mul(0.012).add(1);
  const qb = q.sub(O).div(br).add(O);
  const qm = vec2(qb.x.abs(), qb.y);
  const E = vec2(0, EY), dE = qb.sub(E).length();
  let d = float(1000), s = float(0), kt = float(0);
  TR.forEach((t, i) => {
    const pl = poly(qm, t.pts, t.off), near = pl.d.lessThan(d);
    s = select(near, pl.s, s);
    kt = select(near, pl.s.sub(t.off).div(Math.max(t.L - t.off, 0.01)).clamp(0, 1).add(i).div(TR.length), kt);
    d = d.min(pl.d);
  });
  const k0 = s.div(SP).clamp(0, 1);
  const keyE = pick3(k0, inv(k0), kt), keyX = pickX(inv(k0), k0, kt);
  const pd = smoothstep(0.15, 0.4, u).mul(1.02);
  const rem = inv(smoothstep(0.88, 0.97, u)).mul(1.02).sub(0.01);
  const drawn = step(keyE, pd).mul(step(keyX, rem));
  const line = stroke(d, 0.17).mul(drawn);
  const head = inv(smoothstep(0, 0.03, keyE.sub(pd).abs())).mul(step(0.01, pd)).mul(inv(step(1, pd)))
    .max(inv(smoothstep(0, 0.03, keyX.sub(rem).abs())).mul(step(0.01, rem)).mul(inv(step(1, rem))))
    .mul(stroke(d, 0.55));
  const cur = c.real.mul(float(5).add(rn(12).mul(5))).mod(SMAX + 25);
  const flow = inv(smoothstep(0, 2.2, s.sub(cur).abs())).mul(line);
  const pulse = inv(smoothstep(0, 1.6, s.sub(c.beat.fract().mul(SMAX * 1.15)).abs())).mul(line).mul(kickOn);
  let vRing = float(0), vDot = float(0), vBody = float(0);
  for (const [x, y, sv, ktv] of VIAS) {
    const k = sv / SP, kE = pick3(float(k), float(1 - k), float(ktv)), kX = pickX(float(1 - k), float(k), float(ktv));
    const dv = qm.sub(vec2(x, y)).length(), got = step(kE, pd).mul(step(kX, rem));
    const fresh = inv(smoothstep(0, 0.08, pd.sub(kE))).mul(0.8).add(0.6);
    vRing = vRing.max(stroke(dv.sub(0.75).abs(), 0.13).mul(got));
    vDot = vDot.max(stroke(dv, 0.36).mul(got).mul(fresh));
    vBody = vBody.max(stroke(dv, 1.05).mul(got));
  }
  const ax = qm.x, yc = qb.y.sub(3 * F), chin = yc.negate().div(16 * F).clamp(0, 1);
  const sd = vec2(ax.div(float(13.6 * F).mul(inv(chin.mul(chin).mul(0.3)))), yc.div(16.6 * F)).length().sub(1);
  const pb = io(0.15, 0.42, 0.9, 0.98);
  const bodyIn = step(sd, 0).mul(step(dE, pb.mul(60))).mul(step(0.004, pb));
  const ground = low ? float(0) : wellBeads(qb.sub(E), float(2.4), float(0), float(0.16)).in.mul(bodyIn).mul(step(4, dE));
  const pE = io(0.03, 0.12, 0.96, 0.99), angE = ang2(qb.x, qb.y.sub(EY));
  const eyeR = stroke(dE.sub(1.3).abs(), 0.14).max(stroke(dE.sub(2.1).abs(), 0.1)).mul(maskClock(pE, angE));
  const eyeC = stroke(dE, pE.mul(0.7)), eyeBody = stroke(dE, pE.mul(2.5));
  const pw = io(0.55, 0.64, 0.87, 0.91);
  const pe = qm.sub(vec2(EYE[0], EYE[1]));
  const wb = wellBeads(pe, float(0.9), float(0), float(0.24));
  const well = wb.in.mul(step(wb.r, pw.mul(6.2))).mul(step(0.01, pw)).mul(step(0.5, wb.j));
  const pl = io(0.76, 0.8, 0.86, 0.88);
  const lid = poly(qm, LID);
  const lidL = stroke(lid.d, 0.17).mul(maskDraw(pl, lid.s.div(lid.L)));
  const almond = step(pe.y.abs(), float(1.5 * F).mul(inv(pe.x.abs().div(3.5 * F).clamp(0, 1).pow(2))).mul(pl));
  const det = pk(2, 3);
  const dp = (k) => vec2(DET[0][k][0], DET[0][k][1]).mul(is(det, 0)).add(vec2(DET[1][k][0], DET[1][k][1]).mul(is(det, 1))).add(vec2(DET[2][k][0], DET[2][k][1]).mul(is(det, 2))).mul(F);
  const D0 = dp(0), D1 = dp(1), D2 = dp(2);
  const pdd = io(0.6, 0.68, 0.86, 0.9);
  const g1 = segH(qm, D0, D1), g2 = segH(qm, D1, D2);
  const l1 = D1.sub(D0).length(), dl = l1.add(D2.sub(D1).length()).max(0.01);
  const sd2 = select(g1.d.lessThan(g2.d), g1.h.mul(l1), g2.h.mul(dl.sub(l1)).add(l1)).div(dl);
  const dLine = stroke(g1.d.min(g2.d), 0.15).mul(maskDraw(pdd, sd2));
  const dv1 = qm.sub(D1).length(), dv2 = qm.sub(D2).length(), done = step(0.99, pdd);
  const dVia = stroke(dv1.sub(0.7).abs(), 0.12).mul(maskBeads(pdd, l1.div(dl))).max(stroke(dv2.sub(0.75).abs(), 0.13).mul(done));
  const dDot = stroke(dv2, 0.36).mul(done);
  const coil = is(det, 2).mul(stroke(dv2.sub(1.8).abs(), 0.1).max(stroke(dv2.sub(2.7).abs(), 0.1))).mul(io(0.66, 0.7, 0.86, 0.88));
  const dBody = stroke(g1.d.min(g2.d), 0.5).mul(maskDraw(pdd, sd2)).max(stroke(dv2, coil.mul(3))).max(stroke(dv2, done.mul(1.05)));
  const glow = climb(c).mul(0.4).add(0.6);
  let col = A.mul(ground).mul(0.16);
  col = mix(col, mix(A, W, 0.15).mul(0.55), line);
  col = col.add(W.mul(flow.mul(0.7).add(pulse.mul(0.9)).add(head.mul(1.2))));
  col = mix(col, B.mul(0.9), vRing);
  col = mix(col, H.mul(0.95), vDot);
  col = mix(col, mix(B, W, 0.5).mul(float(0.45).add(lock.mul(0.6)).add(almond.mul(0.5))), well);
  col = mix(col, mix(H, W, 0.2).mul(glow), well.mul(almond));
  col = mix(col, mix(A, W, 0.3).mul(glow), lidL);
  col = mix(col, A.mul(0.6), dLine.max(coil));
  col = mix(col, B, dVia);
  col = mix(col, H, dDot);
  col = mix(col, mix(B, W, 0.4), eyeR);
  col = mix(col, mix(H, W, kickOn.mul(c.kick).mul(0.6)), eyeC);
  m.colorNode = col;
  m.opacityNode = bodyIn.max(stroke(d, 0.5).mul(drawn)).max(vBody).max(eyeBody).max(dBody).max(well).mul(live);
  return m;
}
