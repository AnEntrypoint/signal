// THE LOTUS GATE: petal rings opening round a pointed arch door; layers world/ring/being/veil/fore by params.layer; seed ch 420-439, 440-443 (petal gates).
import { MeshBasicNodeMaterial, AdditiveBlending, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, mix, atan2, fwidth } from "builtin/tsl";
import { tripClock, visionShown, visionU, climb, maskDraw, maskBeads, maskClock, nib, inv, is } from "./lib/trip.js";
const TAU = 6.28318, PI = 3.14159;
const DEPTH = { world: 104, ring: 86, being: 74, veil: 64, fore: 52 };
const CY = -2, HW = 4.2, YL = CY - 7, YS = CY + 1, RA = 6.5, AXC = HW - RA, APEX = YS + Math.sqrt(RA * RA - AXC * AXC);
const NR = 5;
const hash = (x) => float(x).mul(12.9898).sin().mul(43758.5453).fract();
function seg(p, a, b) {
  const bx = b[0] - a[0], by = b[1] - a[1], bb = bx * bx + by * by;
  const pa = p.sub(vec2(a[0], a[1])), h = pa.dot(vec2(bx, by)).div(bb).clamp(0, 1);
  return pa.sub(vec2(bx, by).mul(h)).length();
}
function arch(q) {
  const x = q.x.abs(), y = q.y;
  const sdb = x.sub(HW).max(float(YL).sub(y));
  const sdt = vec2(x.sub(AXC), y.sub(YS)).length().sub(RA).max(x.sub(HW));
  const below = step(y, YS);
  return { sd: mix(sdt, sdb, below), ua: y.sub(YL).div(APEX - YL).clamp(0, 1) };
}
const TH = Math.atan2(APEX - YS, -AXC);
function archCell(q, off, n) {
  const x = q.x.abs(), y = q.y, Ltot = (YS - YL) + (RA + off) * TH;
  const th = atan2(y.sub(YS), x.sub(AXC).max(0.001)).clamp(0, TH);
  const s = mix(float(YS - YL).add(th.mul(RA + off)), y.sub(YL).max(0), step(y, YS));
  const cell = s.div(Ltot).mul(n);
  return { cell, along: cell.fract().sub(0.5).mul(Ltot / n), ua: s.div(Ltot).clamp(0, 1) };
}
function petals(rr, an, N, r0, Lo, rot) {
  const f = an.div(TAU).mul(N).add(rot);
  const ap = f.fract().sub(0.5), t = rr.sub(r0).div(Lo.max(0.01));
  const sh = t.clamp(0, 1).mul(PI).sin().pow(0.6).mul(inv(t.clamp(0, 1).mul(0.3))).mul(0.5);
  const arc = rr.mul(TAU).div(N);
  const ex = sh.sub(ap.abs()).mul(arc);
  return { ap, t, ex, arc, id: f.floor(), inside: step(0, ex).mul(step(0, t)).mul(step(t, 1)).mul(step(0.02, Lo)) };
}
function leaf(x, y, len, wid) {
  const t = y.div(len), sh = t.clamp(0, 1).mul(PI).sin().pow(0.6).mul(inv(t.clamp(0, 1).mul(0.3))).mul(wid);
  const ex = sh.sub(x.abs());
  return { t, ex, inside: step(0, ex).mul(step(0, t)).mul(step(t, 1)) };
}
function build(ctx) {
  const layer = ctx.params.layer ?? "being";
  const c = tripClock(ctx);
  const hold = ctx.param("hold", -1), u = hold.greaterThan(-0.5).select(hold, visionU(ctx, c));
  const io = (a, b, x, y) => smoothstep(a, b, u).mul(inv(smoothstep(x, y, u)));
  const rn = (n) => c.rnd(420 + n), pk = (n, k) => c.pick(420 + n, k);
  const sense = (n) => step(0.5, rn(n)).mul(2).sub(1);
  const fam = pk(0, 3), hot = pk(17, 3);
  const blue = vec3(0.05, 0.12, 1.0), violet = vec3(0.45, 0.05, 1.0), mag = vec3(1.0, 0.05, 0.6), W = vec3(1, 1, 1);
  const A = blue.mul(is(fam, 0)).add(violet.mul(is(fam, 1))).add(violet.mul(is(fam, 2)));   // body line
  const B = violet.mul(is(fam, 0)).add(blue.mul(is(fam, 1))).add(mag.mul(is(fam, 2)));      // accent
  const H = mag.mul(is(hot, 0)).add(vec3(1.0, 0.85, 0.05).mul(is(hot, 1))).add(vec3(0.1, 1.0, 0.15).mul(is(hot, 2)));
  const P = positionGeometry.xy;
  const q = P.mul(74 / DEPTH[layer]);                 // every layer draws in the being's metres
  const qc = q.sub(vec2(0, CY)), rr = qc.length(), an = atan2(qc.x, qc.y), ax = q.x.abs();
  const aa = fwidth(q.x).mul(1.2).max(0.02);
  const stroke = (d, w) => inv(smoothstep(float(w), aa.add(w), d));
  const live = visionShown(ctx, c, 0);
  const kickOn = step(0.001, c.kick);
  const kl = float(1).sub(smoothstep(0, 2.5, rr.sub(c.beat.fract().mul(56)).abs())).mul(kickOn);   // the kick: a ripple outward
  const cul = io(0.85, 0.89, 0.93, 0.95).mul(climb(c).mul(0.4).add(0.6));
  const flipV = step(0.5, rn(9));
  const low = ctx.quality === "low", slot = ctx.param("vw1", -1).sub(ctx.param("vw0", -1)).max(1);
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  if (layer === "world") {
    const cv = pk(23, 3), close = smoothstep(inv(float(6).div(slot)), 1, u);
    const grow = smoothstep(0, 0.32, u), Rg = grow.mul(grow).mul(84).mul(inv(close.mul(close).mul(0.86)));
    const lobes = float(4).add(is(cv, 1).mul(2)), tw = an.add(close.mul(close).mul(is(cv, 2)).mul(2.4));
    const shape = tw.mul(lobes).cos().abs().mul(float(0.22).add(close.mul(0.25).mul(is(cv, 1)))).add(0.78);
    const lead = rr.sub(Rg.mul(shape));
    const fb = vec2(an.mul(rr).div(3.2).fract().sub(0.5).mul(3.2), lead.sub(2.2)).length();
    const front = inv(smoothstep(1.0, 1.0 + 0.1, fb)).mul(step(0, lead));
    const cover = step(lead, 0).max(front).mul(step(0.004, grow));
    const Wy = -24;
    const v = float(Wy).sub(q.y).max(0);
    const ri = v.sqrt().mul(1.25).floor(), vc = ri.add(0.5).div(1.25), yc = float(Wy).sub(vc.mul(vc));
    const sp = ri.mul(4).add(9);
    const xs = q.x.sub(c.real.mul(ri.mul(0.35).add(0.6)).mul(sense(6))).div(sp);
    const cid = xs.floor(), has = step(0.38, hash(cid.mul(3.1).add(ri.mul(7.7))));
    const lx = xs.fract().sub(0.5).mul(sp), ly = q.y.sub(yc).mul(ri.mul(-0.25).add(3.2).max(1.6));
    const pr = sp.mul(0.36), rho = vec2(lx, ly).length();
    const notch = step(atan2(lx, ly.negate()).abs(), 0.28);
    const rs = pr.div(3.5), rj = rho.div(rs).floor(), cnt = rj.add(1).mul(6);
    const pa = atan2(ly, lx), adot = pa.div(TAU).mul(cnt).fract().sub(0.5).mul(rho).mul(TAU).div(cnt);
    const dot = inv(smoothstep(rs.mul(0.28), rs.mul(0.34), vec2(adot, rho.div(rs).fract().sub(0.5).mul(rs)).length()));
    const pad = step(rho, pr).mul(inv(notch)).mul(has).mul(step(0.0001, v));
    const padP = io(0.3, 0.5, 2, 3);
    const padOn = pad.mul(maskBeads(padP, hash(cid.add(ri.mul(5))).mul(0.6).add(rr.div(200))));
    let col = mix(A, B, rj.mod(2)).mul(dot).mul(0.55).add(A.mul(stroke(rho.sub(pr).abs(), 0.08)).mul(0.5)).mul(padOn);
    col = col.add(B.mul(kl).mul(padOn).mul(0.4));
    const wl = stroke(vec2(q.x.div(2.4).fract().sub(0.5).mul(2.4), q.y.sub(Wy)).length(), 0.28);
    col = col.add(mix(A, W, 0.3).mul(wl).mul(0.7).mul(step(rr.div(170), io(0.3, 0.42, 2, 3))));
    const above = step(Wy + 1, q.y);
    let sky = vec3(0, 0, 0);
    for (let j = 0; j < (low ? 3 : 5); j++) {
      const x0 = 40 + j * 13, rise = c.real.mul(0.6 + 0.12 * j).add(j * 23).mod(78);
      const px = ax.sub(x0).sub(c.real.mul(0.5).add(j).sin().mul(3)), py = q.y.sub(rise.add(Wy - 4));
      const tl = c.real.mul(0.5).add(j * 1.7).sin().mul(0.35), cs = tl.cos(), sn = tl.sin();
      const lf = leaf(px.mul(cs).sub(py.mul(sn)), px.mul(sn).add(py.mul(cs)), 4.6, 1.5);
      const pj = io(0.62 + j * 0.018, 0.66 + j * 0.018, 0.82 + j * 0.012, 0.85 + j * 0.012);
      sky = sky.add(mix(B, H, j % 2).mul(stroke(lf.ex.abs(), 0.1).mul(step(0, lf.t)).mul(step(lf.t, 1))).mul(step(0.01, pj)).mul(step(j / 5, pj.mul(1.02))));
    }
    const nfly = pk(4, 3).add(2);
    const FLY = [[52, 14], [80, 30], [34, 36], [104, 6]];
    FLY.forEach(([fx, fy], i) => {
      const hov = vec2(c.real.mul(0.37).add(i * 2.1).sin().mul(5), c.real.mul(0.61).add(i).sin().mul(2.5));
      const fp = vec2(ax.sub(fx), q.y.sub(fy)).sub(hov);
      const fl = c.real.mul(11).add(i).sin().mul(0.35);
      const pf = io(0.6 + i * 0.025, 0.66 + i * 0.025, 0.82 + i * 0.012, 0.86 + i * 0.012).mul(step(i, nfly.sub(0.5)));
      const s1 = stroke(seg(fp, [0, 2.6], [0, -6.5]), 0.12).mul(maskBeads(pf, 0.05));
      const s2 = stroke(seg(fp.sub(vec2(0, fl)), [-6.5, 1.9], [6.5, 1.9]), 0.1).mul(maskBeads(pf, 0.3));
      const s3 = stroke(seg(fp.add(vec2(0, fl)), [-5, -0.2], [5, -0.2]), 0.1).mul(maskBeads(pf, 0.55));
      const s4 = stroke(fp.sub(vec2(0, 3.4)).length().sub(0.8).abs(), 0.1).mul(maskBeads(pf, 0.8));
      sky = sky.add(mix(A, W, 0.45).mul(s1.max(s2).max(s3)).add(H.mul(s4)).mul(step(0.01, pf)));
    });
    col = col.add(sky.mul(above).mul(0.8));
    m.colorNode = col;
    m.opacityNode = cover.mul(live);
    m.alphaTest = 0.5;
    return m;
  }
  if (layer === "ring") {
    const ringL = (r, w) => inv(smoothstep(w, aa.add(w), rr.sub(r).abs()));
    const pL = io(0.4, 0.46, 0.89, 0.92);
    const l1 = ringL(44, 0.12).mul(maskClock(pL, an)), l2 = ringL(55, 0.1).mul(maskClock(pL, an.negate()));
    const rot = c.real.mul(rn(5).mul(0.012).add(0.006)).mul(sense(2));
    const f1 = an.div(TAU).add(rot).mul(72), f2 = an.div(TAU).sub(rot.mul(1.7)).mul(96);
    const b1 = inv(smoothstep(0.62, 0.62 + 0.1, vec2(f1.fract().sub(0.5).mul(rr).mul(TAU / 72), rr.sub(47.6)).length()));
    const b2 = inv(smoothstep(0.42, 0.42 + 0.1, vec2(f2.fract().sub(0.5).mul(rr).mul(TAU / 96), rr.sub(51.4)).length()));
    const p1 = io(0.44, 0.52, 0.86, 0.89), p2 = io(0.48, 0.56, 0.85, 0.88);
    const k1 = maskBeads(p1, f1.floor().div(72).fract()), k2 = maskBeads(p2, f2.floor().div(96).fract());
    const pa = io(0.52, 0.6, 0.83, 0.87);
    const au = petals(rr, an, 12, float(36), float(24).mul(pa), rot.mul(-0.6).add(0.5));
    const aur = stroke(au.ex.abs(), 0.12).mul(step(0, au.t)).mul(step(au.t, 1));
    const glow = float(1).sub(smoothstep(0, 9, rr.sub(44).abs())).mul(0.12).mul(pL);
    const col = A.mul(l1.add(l2)).mul(0.8).add(mix(B, W, 0.3).mul(b1.mul(k1)).mul(float(0.7).add(c.kick.mul(0.6))))
      .add(mix(H, W, f2.floor().mod(2).mul(0.6)).mul(b2.mul(k2)).mul(0.8)).add(B.mul(aur).mul(0.45)).add(A.mul(glow))
      .mul(step(rr, 60));
    m.colorNode = col;
    m.opacityNode = live;
    m.transparent = true;
    m.blending = AdditiveBlending;
    m.depthWrite = false;
    return m;
  }
  if (layer === "veil") {
    let col = vec3(0, 0, 0), cover = float(0);
    for (let j = 0; j < 3; j++) {
      const x0 = 46 + j * 15, len = 12 + j * 2.5, wid = 3.8 + j * 0.6;
      const y0 = c.real.mul(0.9 + 0.3 * j).add(j * 41 + 30).add(rn(12).mul(60)).mod(130).sub(70);
      const th = c.real.mul(0.25).add(j * 2).sin().mul(0.25).add(0.45 + j * 0.15).negate();
      const px = ax.sub(x0), py = q.y.sub(y0), cs = th.cos(), sn = th.sin();
      const lx = px.mul(cs).sub(py.mul(sn)), ly = px.mul(sn).add(py.mul(cs));
      const lf = leaf(lx, ly, len, wid);
      const pj = io(0.62 + j * 0.03, 0.68 + j * 0.03, 0.81 + j * 0.015, 0.85 + j * 0.015);
      const on = lf.inside.mul(maskDraw(pj, lf.t));
      const edge = stroke(lf.ex, 0.18);
      const cont = stroke(lf.ex.div(1.1).fract().sub(0.5).abs().mul(1.1), 0.06).mul(step(0.6, lf.ex));
      const vb = inv(smoothstep(0.45, 0.55, vec2(lx, lf.t.mul(6).fract().sub(0.5).mul(len / 6)).length())).mul(step(0.1, lf.t)).mul(step(lf.t, 0.85));
      const nb = nib(pj, lf.t, 0.04).mul(step(pj, 0.99));
      const pc = mix(B, W, 0.15).mul(edge).add(A.mul(cont).mul(0.4)).add(H.mul(vb)).add(W.mul(nb).mul(edge.add(0.3)));
      col = mix(col, pc, on);
      cover = cover.max(on);
    }
    m.colorNode = col;
    m.opacityNode = cover.mul(live);
    m.alphaTest = 0.5;
    return m;
  }
  if (layer === "fore") {
    const pW = io(0.66, 0.72, 0.84, 0.88);
    const swell = (x) => float(x).mul(0.07).sub(c.real.mul(1.1)).sin().mul(2.2).add(float(x).mul(0.15).add(c.real.mul(0.7)).sin().mul(1.1));
    const yw = swell(q.x).add(-52).add(pW.mul(9));
    let col = vec3(0, 0, 0), cover = float(0);
    for (let j = 0; j < (low ? 3 : 4); j++) {
      const xb = 30 + j * 20, pb = io(0.68 + j * 0.025, 0.74 + j * 0.025, 0.80 + j * 0.012, 0.83 + j * 0.012);
      const bx = ax.sub(xb).sub(c.real.mul(0.9).add(j).sin().mul(0.8));
      const by = q.y.sub(swell(q.x.sign().mul(xb)).add(-52).add(pW.mul(9)).sub(2).add(inv(pb).mul(12)));
      const lf = leaf(bx, by, 8 + j, 2.0 + j * 0.25);
      const on = lf.inside.mul(step(0.01, pb));
      const bands = step(0.5, lf.t.mul(7).fract()).mul(step(lf.t, 0.45)).mul(step(0.5, lf.ex));
      const pc = mix(A, W, 0.2).mul(stroke(lf.ex, 0.16)).add(B.mul(bands).mul(0.55)).add(H.mul(stroke(vec2(bx, lf.t.sub(0.86).mul(8 + j)).length(), 0.45)));
      col = mix(col, pc, on);
      cover = cover.max(on);
      const sy = c.real.mul(0.18).add(j * 0.29).fract();
      const sp = stroke(vec2(bx.sub(sy.mul(9).add(j).sin().mul(2)), by.sub(sy.mul(26).add(9))).length(), 0.4).mul(step(0.5, pb)).mul(inv(sy));
      col = mix(col, mix(H, W, 0.5), sp);
      cover = cover.max(sp);
    }
    const below = step(q.y, yw).mul(step(0.01, pW));
    const crest = stroke(q.y.sub(yw).abs(), 0.16);
    const wb = stroke(vec2(q.x.add(c.real.mul(1.5)).div(2.6).fract().sub(0.5).mul(2.6), q.y.sub(yw).add(1.3)).length(), 0.32);
    col = mix(col, A.mul(crest).add(mix(B, W, 0.3).mul(wb).mul(0.7)).add(A.mul(kl).mul(0.3)), below.max(crest.mul(step(0.01, pW))));
    cover = cover.max(below);
    m.colorNode = col;
    m.opacityNode = cover.mul(live);
    m.alphaTest = 0.5;
    return m;
  }
  const N0 = pk(1, 3).mul(2).add(8);                 // 8, 10 or 12 petals in the first ring
  const lock = inv(cul.mul(inv(flipV)));             // variant A: every ring's turn eases to zero (one star)
  const flip = cul.mul(flipV);                       // variant B: bodies lit, lines black
  let col = vec3(0, 0, 0), cover = float(0);
  const pDew = io(0.5, 0.58, 0.80, 0.84);
  for (let k = NR - 1; k >= 0; k--) {
    const N = N0.mul(1 + 0.5 * k), r0 = 4 + 5.4 * k, L = 10 + 1.6 * k;
    const sgn = sense(2).mul(k % 2 ? -1 : 1);
    const op = io(0.09 + 0.05 * k, 0.15 + 0.05 * k, 0.80 + 0.035 * (NR - 1 - k), 0.845 + 0.035 * (NR - 1 - k)).mul(k === NR - 1 ? step(0.35, rn(10)) : float(1));
    const breathe = c.real.mul(0.55 + 0.08 * k).add(k * 1.3).sin().mul(0.035).mul(k % 2 ? -1 : 1).add(1);
    const rk = rr.div(breathe);
    const rot = c.real.mul(0.008 + 0.003 * k).add(inv(op).mul(0.5)).mul(sgn).mul(lock).add((k % 2) * 0.5);
    const idf = an.div(TAU).mul(N).add(rot).floor().div(N.max(1)).fract();
    const opi = op.mul(1.8).sub(idf.mul(0.8)).clamp(0, 1);
    const dim = smoothstep(0, 0.7, opi);
    const Lo = opi.mul(L);
    const pt = petals(rk, an, N, r0, Lo, rot);
    const lc = k % 2 ? B : A;
    const edge = stroke(pt.ex, 0.22).mul(smoothstep(0.04, 0.16, pt.t));
    let det;
    if (k % 2 === 0) {
      const cont = stroke(pt.ex.div(1.2).fract().sub(0.5).abs().mul(1.2), 0.06).mul(step(0.7, pt.ex));
      const vein = stroke(pt.ap.mul(pt.arc).abs(), 0.07).mul(step(0.08, pt.t)).mul(step(pt.t, 0.8));
      det = lc.mul(cont.mul(0.55).add(vein.mul(0.7)));
    } else {
      const S = 1.5, row = rk.sub(r0).div(S).floor(), rc = row.add(0.5).mul(S).add(r0);
      const cx = pt.ap.mul(rc.mul(TAU).div(N.max(1))).div(S).add(0.5).add(row.mod(2).mul(0.5)).fract().sub(0.5);
      const cy = rk.sub(r0).div(S).fract().sub(0.5);
      const bd = vec2(cx, cy).length();
      const rb = inv(pt.t.clamp(0, 1).mul(0.45)).mul(0.3);
      const fits = step(rb.mul(S).add(0.2), pt.ex);
      det = mix(H, W, row.mod(2).mul(0.5)).mul(inv(smoothstep(rb.sub(0.05), rb, bd))).mul(fits).mul(step(pt.t, 0.95));
    }
    const lit = lc.mul(edge).mul(float(0.85).add(kl.mul(0.8))).add(det).mul(dim);
    const body = mix(vec3(0, 0, 0), lc.mul(0.5).add(det.mul(0.3)), flip);
    const pc = mix(body.add(lit.mul(inv(flip))), vec3(0, 0, 0), edge.mul(flip));
    col = mix(col, pc, pt.inside);
    cover = cover.max(pt.inside);
    const dd = vec2(pt.ap.mul(pt.arc), rk.sub(Lo.add(r0 + 0.9))).length();
    const dew = inv(smoothstep(0.55, 0.65, dd)).mul(maskBeads(pDew, pt.id.div(N).fract().mul(0.7).add(k * 0.06))).mul(step(0.9, op));
    col = mix(col, mix(H, W, float(1).sub(smoothstep(0, 0.35, dd))), dew);
    cover = cover.max(dew);
  }
  const ar = arch(q);
  const pB = io(0.0, 0.025, 0.99, 1.0), pA = io(0.02, 0.08, 0.97, 0.995), pLn = io(0.08, 0.12, 0.95, 0.975);
  const pPod = io(0.58, 0.64, 0.82, 0.86), pDoor = io(0.55, 0.62, 0.85, 0.89), pStar = io(0.65, 0.69, 0.81, 0.84);
  const doorIn = step(ar.sd, 0).mul(step(ar.ua, pA.mul(1.02)));
  const door = vec2(0, CY - 1.5);
  const qd = q.sub(door), rd = qd.length();
  let dc = vec3(0, 0, 0);
  const dVar = step(0.5, rn(3));
  for (let i = 0; i < (low ? 7 : 12); i++) {
    const r = Math.sqrt(i + 0.5) * 1.35, a = i * 2.39996;
    const sd4 = qd.sub(vec2(Math.cos(a) * r * 0.75, Math.sin(a) * r + 1.5)).abs();
    const s = inv(smoothstep(0.8, 0.95, sd4.x.div(0.35).sqrt().add(sd4.y.div(0.35).sqrt())));
    dc = dc.add(mix(W, H, (i % 3 === 0) ? 1 : 0).mul(s).mul(maskBeads(pDoor, i / 12)).mul(c.real.mul(1.3).add(i * 1.7).sin().mul(0.3).add(0.7)));
  }
  const zoom = cul.mul(0.9);
  const SC = float(5.2).mul(zoom.negate().exp().mul(dVar.mul(0.6).add(0.4)).add(inv(dVar).mul(0.0)).max(0.0)).add(inv(dVar).mul(0)).max(1.3);
  const q2 = qd.add(vec2(0, 1.0)).mul(SC), rr2 = q2.length(), an2 = atan2(q2.x, q2.y);
  let dl = float(0);
  for (let k = 0; k < 3; k++) {
    const p2 = petals(rr2, an2, N0.mul(1 + 0.5 * k), 4 + 5.4 * k, float(10 + 1.6 * k), c.real.mul(-0.02).mul(sense(2)).add((k % 2) * 0.5));
    dl = dl.max(stroke(p2.ex.abs(), aa.mul(SC).max(0.25)).mul(step(0, p2.t)).mul(step(p2.t, 1)));
  }
  const ar2 = arch(q2.add(vec2(0, CY)));
  dl = dl.max(stroke(ar2.sd.abs(), 0.35));
  const pDr = io(0.56, 0.64, 0.85, 0.89);
  dc = dc.mul(inv(dl)).add(mix(B, A, 0.4).mul(dl).mul(inv(smoothstep(pDr.mul(7.5).sub(0.6), pDr.mul(7.5), rd))).mul(0.9));
  col = mix(col, dc, doorIn);
  cover = cover.max(doorIn);
  const outl = stroke(ar.sd.abs(), 0.24).mul(maskDraw(pA, ar.ua));
  const anib = nib(pA, ar.ua, 0.03).mul(stroke(ar.sd.abs(), 0.6)).mul(step(pA, 0.99));
  const sides = smoothstep(YL + 0.6, YL + 1.6, q.y);
  const cl = archCell(q, 1.05, 16), cp = archCell(q, 2.4, 11);
  const lin = sides.mul(stroke(vec2(ar.sd.sub(1.05), cl.along).length(), 0.3).mul(maskBeads(pLn, cl.ua)));
  const podD = vec2(ar.sd.sub(2.4), cp.along).length();
  const pod = stroke(podD, 0.55).mul(maskBeads(pPod, cp.ua)).mul(sides);
  const podCore = stroke(podD, 0.22).mul(pod);
  const bindu = stroke(q.sub(vec2(0, CY)).length(), pB.mul(0.9)).mul(step(0.01, pB)).mul(inv(pA.mul(step(0.99, pA))));
  const bs = q.sub(vec2(0, APEX + 2.4)).abs();
  const star = inv(smoothstep(0.85, 1, bs.x.div(1.4).sqrt().add(bs.y.div(2.2).sqrt()))).mul(step(0.01, pStar)).mul(step(bs.y, pStar.mul(2.3)));
  const gl = outl.max(lin).max(pod).max(star).max(bindu).max(anib);
  const gc = mix(A, W, 0.45).mul(outl).mul(1.6).add(mix(B, W, 0.2).mul(lin)).add(H.mul(pod).mul(inv(podCore))).add(W.mul(podCore))
    .add(W.mul(star.max(bindu).max(anib)));
  col = mix(col, gc, gl);
  cover = cover.max(gl);
  m.colorNode = col;
  m.opacityNode = cover.mul(live);
  m.alphaTest = 0.5;
  return m;
}
const GL = { world: [6, 85, 0, 0.3], ring: [3.5, 42, 0.42, 0.55, 0.9, 0.98], being: [2.4, 22, -1, 0, 0.92, 0.99], veil: [4.5, 50, 0.58, 0.72, 0.86, 0.93], fore: [4.5, 60, 0.68, 0.8, 0.8, 0.88] };
export function material(ctx) {
  const m = build(ctx), layer = ctx.params.layer ?? "being", L = GL[layer] ?? GL.being;
  const c = tripClock(ctx), hold = ctx.param("hold", -1), u = hold.greaterThan(-0.5).select(hold, visionU(ctx, c));
  const Q = positionGeometry.xy.mul(74 / (DEPTH[layer] ?? 74)).sub(vec2(0, CY));
  const v = c.pick(440, 3), fat = c.rnd(441).mul(0.2).add(0.38), slot = ctx.param("vw1", -1).sub(ctx.param("vw0", -1)).max(1);
  const cells = (cs, p, salt) => {
    const rr = Q.length(), rf = rr.div(cs), ri = rf.floor(), n = ri.add(0.5).mul(PI).floor().max(1).mul(2);
    const af = atan2(Q.x, Q.y).div(TAU).add(0.5).add(ri.mod(2).mul(0.5).div(n)).fract().mul(n), ai = af.floor();
    const lx = af.fract().sub(0.5), ly = rf.fract();
    const h = ri.mul(12.9898).add(ai.mul(78.233)).add(salt).sin().mul(43758.5453).fract();
    const kr = rr.div(L[1]).clamp(0, 1);
    const k = kr.mul(0.85).add(h.mul(0.15)).mul(is(v, 0)).add(h.mul(is(v, 1))).add(ai.mul(0.618).add(ri.mul(0.31)).fract().mul(0.6).add(kr.mul(0.4)).mul(is(v, 2)));
    const lp = float(p).sub(k.mul(0.75)).div(0.25).clamp(0, 1);
    const t = ly.div(lp.max(0.01)), wid = t.clamp(0, 1).mul(PI).sin().max(0).pow(0.6).mul(fat).mul(lp.mul(0.4).add(0.6));
    return step(lx.abs(), wid).mul(step(t, 1)).max(step(0.999, lp)).mul(step(0.001, lp));
  };
  const cs = c.rnd(442).mul(0.45).add(0.8).mul(L[0]);
  const gin = L[2] < 0 ? float(1) : cells(cs, smoothstep(L[2], L[3], u), 1.7);
  const gout = cells(cs.mul(1.2), inv(layer === "world" ? smoothstep(inv(float(0.4).div(slot)), 1, u) : smoothstep(L[4], L[5], u)), 5.3);
  const g = gin.mul(gout);
  m.colorNode = m.colorNode.mul(g);
  m.opacityNode = m.opacityNode.mul(g);
  return m;
}
