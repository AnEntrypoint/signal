// CONTOUR ORACLE: a bust made only of bent parallel lines; layers world/ring/being/veil/fore by params.layer; seed ch 240-263
import { MeshBasicNodeMaterial, AdditiveBlending, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, mix, atan2, fwidth, select } from "builtin/tsl";
import { tripClock, visionShown, visionU, climb, maskBeads, maskClock, inv, is } from "./lib/trip.js";

const TAU = 6.28318, CH = 240;
const DEPTH = { world: 104, ring: 86, being: 74, veil: 64, fore: 52 };
const HEAD_Y = 6, FS = 2.0;
const G = (v) => v.negate().exp();
const sq = (v) => v.mul(v);
function polyline(q, pts) {
  const L = [0];
  for (let i = 1; i < pts.length; i++) L.push(L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  const total = L[L.length - 1];
  let d = float(1000), u = float(0);
  for (let i = 0; i < pts.length - 1; i++) {
    const [ax, ay] = pts[i], bx = pts[i + 1][0] - ax, by = pts[i + 1][1] - ay, bb = bx * bx + by * by, len = Math.sqrt(bb);
    const pa = q.sub(vec2(ax, ay));
    const h = pa.dot(vec2(bx, by)).div(bb).clamp(0, 1);
    const di = pa.sub(vec2(bx, by).mul(h)).length();
    u = select(di.lessThan(d), h.mul(len).add(L[i]).div(total), u);
    d = d.min(di);
  }
  return { d, u };
}
const bayer = (p, cell) => { const ix = p.x.div(cell).floor().mod(2), iy = p.y.div(cell).floor().mod(2); return ix.mul(2).add(iy.mul(3)).sub(ix.mul(iy).mul(4)).div(4).add(0.125); };
const band = (s, duty) => { const t = s.fract().sub(0.5).abs().mul(2); const w = fwidth(s).mul(2).clamp(0.001, 0.5); return { t, m: float(1).sub(smoothstep(float(duty), float(duty).add(w), t)) }; };
const star4 = (d, sz) => float(1).sub(smoothstep(0.9, 1, d.x.abs().div(sz).sqrt().add(d.y.abs().div(sz).sqrt())));

function lineMask(v, g, o) {
  const e0 = g.mul(1.6).sub(o.kc.mul(0.5)).sub(o.hsh.mul(0.1)).mul(o.half).sub(o.x.abs()).sub(sq(o.fr).mul(20));
  const e1 = g.mul(1.25).sub(o.ky).mul(o.half * 8).sub(o.x.mul(o.par.mul(2).sub(1)).add(o.half));
  const g2 = g.sub(o.par.mul(0.35)).div(0.65).clamp(0, 1);
  const e2 = o.x.abs().add(o.half * 0.1).sub(inv(g2).mul(o.half * 1.15)).sub(o.hsh.mul(o.half * 0.08));
  return e0.mul(is(v, 0)).add(e1.mul(is(v, 1))).add(e2.mul(is(v, 2)));
}

export function material(ctx) {
  const low = ctx.quality === "low";
  const layer = ctx.params.layer ?? "being";
  const c = tripClock(ctx), u = visionU(ctx, c), t = c.real;
  const R = (n) => c.rnd(CH + n), pk = (n, k) => c.pick(CH + n, k);
  const S = (a, b) => smoothstep(a, b, u), out = (a, b) => float(1).sub(smoothstep(a, b, u));
  const sgn = (n) => step(0.5, R(n)).mul(2).sub(1);
  const cul = S(0.85, 0.9).mul(out(0.93, 0.95)).mul(climb(c).mul(0.4).add(0.6));
  const lock = S(0.85, 0.9).mul(out(0.94, 0.96));
  const fam = pk(0, 3), iv = pk(5, 2);
  const blue = vec3(0.05, 0.12, 1.0), violet = vec3(0.45, 0.05, 1.0), W = vec3(1, 1, 1), P = vec3(1.0, 0.05, 0.6);
  const A = blue.mul(is(fam, 0)).add(violet.mul(is(fam, 1))).add(mix(blue, violet, 0.5).mul(is(fam, 2)));
  const B = violet.mul(is(fam, 0)).add(blue.mul(is(fam, 1))).add(mix(blue, W, 0.4).mul(is(fam, 2)));
  const Sw = mix(2.7, 4.3, R(1)), Sb = Sw.mul(DEPTH.being / DEPTH.world);
  const p = positionGeometry.xy;
  const aa = fwidth(p.x).mul(1.2).max(0.01);
  const stroke = (d, w) => float(1).sub(smoothstep(float(w), aa.add(w), d));
  const gate = step(0.001, c.kick);
  const ripple = (rr, reach, w) => inv(smoothstep(0, w, rr.sub(c.beat.fract().mul(reach)).abs())).mul(gate).mul(inv(c.beat.fract()));
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;

  if (layer === "world") {
    const wy = HEAD_Y * DEPTH.world / DEPTH.being;
    const rr = p.sub(vec2(0, wy)).length();
    const fd = sgn(8);
    const calm = smoothstep(0.9, 1.9, vec2(p.x.div(62), p.y.add(20).div(70)).length());
    const dune = calm.mul(p.x.mul(0.03).add(t.mul(0.22).mul(fd)).add(p.y.mul(0.025).sin().mul(1.3)).sin().mul(5)
      .add(p.x.mul(0.071).sub(t.mul(0.15).mul(fd)).add(p.y.mul(0.05)).sin().mul(2.2)));
    const low = is(pk(10, 2), 1).mul(step(p.x, 0));
    const aq = vec2(p.x.abs(), p.y.add(28).mul(mix(float(1), float(-1 / 0.45), low)).sub(28));
    const ARM = [[40, -30], [70, -10], [92, 22], [100, 32]];
    const pl = polyline(aq, ARM);
    const pa = S(0.5, 0.68).mul(out(0.955, 0.975));
    const armAmp = float(1).sub(smoothstep(pa.mul(1.15).sub(0.12), pa.mul(1.15), pl.u)).mul(smoothstep(0, 0.12, pl.u)).mul(7);
    let fgd = float(1000);
    for (const f of low ? [[106, 46], [113, 35]] : [[100, 47], [106, 46], [111, 42], [113, 35], [89, 39]]) fgd = fgd.min(polyline(aq, [[100, 32], f]).d);
    const armD = armAmp.mul(G(sq(pl.d.div(6)))).add(G(sq(fgd.div(2.1))).mul(5).mul(smoothstep(0.85, 1, pa)));
    const ex0 = R(9).sub(0.5).mul(70), ex = p.x.sub(ex0), ey = p.y.sub(52);
    const po = S(0.56, 0.7).mul(out(0.955, 0.97)).mul(cul.mul(0.25).add(0.75));
    const base = float(1).sub(sq(ex.div(15))).max(0), hh = po.mul(5.5).mul(base);
    const eyeD = hh.mul(ey.div(1.2).clamp(-1, 1)).mul(G(sq(ey.div(10))));
    const almond = step(ey.abs(), hh.mul(0.8)).mul(step(0.05, po));
    const s = p.y.sub(dune).sub(armD).sub(eyeD).div(Sw);
    const n = s.floor(), fr = s.fract().sub(0.5);
    const gw = S(0.0, 0.45), xg = S(0.982, 1.0);
    const rowY = n.add(0.5).mul(Sw), hsh = n.mul(12.9898).sin().mul(43758.5453).fract();
    const lo = { x: p.x, fr, hsh, half: 240, par: n.mod(2), kc: rowY.sub(wy).abs().div(135).min(1), ky: float(95).sub(rowY).div(190).clamp(0, 1) };
    const edge = lineMask(pk(20, 3), gw, lo), kept = step(0, lineMask(pk(21, 3), inv(xg), lo));
    const rq = vec2(p.x.div(240), p.y.div(135)).length();
    const feather = step(rq.mul(34).fract(), inv(smoothstep(0.66, 0.96, rq)).mul(1.02));
    const cover = step(0, edge).mul(kept).mul(feather);
    const b = band(s, 0.3);
    const beadRow = step(n.mod(6), 0.5);
    const bd = vec2(p.x.div(2.4).fract().sub(0.5).mul(2.4), fr.mul(Sw)).length();
    const line = mix(b.m, float(1).sub(smoothstep(0.55, 0.7, bd)), beadRow).mul(float(1).sub(almond));
    const pg = S(0.58, 0.72).mul(out(0.955, 0.965)), ds = pk(7, 2);
    let gl = float(0), mark = float(0);
    ARM.forEach(([jx, jy], i) => {
      const d = aq.sub(vec2(jx, jy)), on = maskBeads(pg, i / 4);
      gl = gl.add(G(d.dot(d).div(70)).mul(on));
      const an = atan2(d.y, d.x).div(TAU).mul(10).fract().sub(0.5).mul(TAU * 5 / 10), rd = d.length().sub(5);
      const beads = float(1).sub(smoothstep(0.5, 0.65, an.mul(an).add(rd.mul(rd)).sqrt()));
      if (!low) mark = mark.max(mix(star4(d, c.kick.mul(0.3).add(1).mul(3.6)), beads, is(ds, 1)).mul(on));
    });
    const kl = ripple(rr, 150, 7);
    const lit = float(0.5).add(kl.mul(0.7)).add(cul.mul(0.25));
    const nibm = inv(smoothstep(0, 5, edge)).mul(step(gw, 0.995)).mul(step(0.005, gw));
    let col = mix(mix(A, B, beadRow), P, gl.min(1)).mul(line).mul(lit.add(gl.mul(0.5))).add(W.mul(line).mul(nibm));
    col = mix(col, mix(P, W, 0.5).mul(1.2), mark);
    const re = vec2(ex, ey).length();
    const iris = band(re.div(1.1), 0.35).m.mul(step(re, 4.6)).mul(step(2.3, re));
    const lid = stroke(ey.abs().sub(hh.mul(0.8)).abs(), 0.16).mul(step(0.02, base)).mul(step(0.05, po));
    const eyeCol = A.mul(iris).add(P.mul(stroke(re.sub(1.7).abs(), 0.28))).add(W.mul(stroke(re, 0.55)));
    col = mix(mix(col, eyeCol, almond), W, lid);
    m.colorNode = col;
    m.opacityNode = cover.mul(visionShown(ctx, c, rr.div(190)));
    m.alphaTest = 0.5;
    return m;
  }

  if (layer === "ring") {
    const q = p.sub(vec2(0, HEAD_Y * DEPTH.ring / DEPTH.being)), rr = q.length(), ang = atan2(q.x, q.y);
    const blur = aa.mul(3), rs = sgn(11);
    const soft = (d, w) => float(1).sub(smoothstep(float(w), blur.add(w), d));
    const pr = S(0.42, 0.5).mul(out(0.9, 0.95)), pb = S(0.46, 0.6).mul(out(0.89, 0.94)), pt = S(0.54, 0.64).mul(out(0.88, 0.92));
    const hair = soft(rr.sub(30).abs(), 0.07).mul(maskClock(pr, ang.mul(rs)));
    const N1 = pk(6, 3).mul(8).add(40), N2 = pk(6, 3).mul(6).add(28);
    const row = (rad, N, rot, br) => {
      const an = ang.div(TAU).add(rot).fract().mul(N), loc = an.fract().sub(0.5).mul(float(TAU * rad).div(N)), dr = rr.sub(rad);
      const d = loc.mul(loc).add(dr.mul(dr)).sqrt();
      const hollow = inv(inv(smoothstep(br * 0.35, br * 0.6, d)).mul(cul));
      return { m: float(1).sub(smoothstep(float(br).sub(blur), blur.add(br), d)).mul(hollow), hot: step(an.floor().mod(8), 0.5) };
    };
    const k = ang.abs().div(3.14159);
    const r1 = row(33.2, N1, t.div(mix(50, 90, R(11))).mul(rs), 0.42), r2 = row(37.6, N2, t.div(mix(36, 64, R(12))).mul(rs).negate(), 0.62);
    const b1 = r1.m.mul(maskBeads(pb, k)), b2 = r2.m.mul(maskBeads(pb.mul(1.4).sub(0.4).max(0), float(1).sub(k)));
    const ticks = step(ang.div(TAU).mul(72).fract(), 0.14).mul(step(rr.sub(42.3).abs(), 1.3)).mul(maskClock(pt, ang.mul(rs).negate()));
    const kl = ripple(rr, 60, 4);
    const lit = float(0.5).add(kl.mul(0.8)).add(cul.mul(0.4));
    const col = A.mul(hair.add(ticks.mul(0.7))).add(mix(B, P, r1.hot).mul(b1)).add(mix(mix(A, W, 0.5), P, r2.hot).mul(b2));
    m.colorNode = col.mul(lit);
    m.opacityNode = visionShown(ctx, c, rr.div(50));
    m.transparent = true; m.blending = AdditiveBlending; m.depthWrite = false;
    return m;
  }

  if (layer === "veil") {
    const g = S(0.6, 0.8).mul(out(0.84, 0.9));
    const drift = sgn(13).mul(u.mul(24).sub(14)).mul(0.8);
    const ISL = [[-58, -30, 17], [52, -33, 14], [-66, 22, 12], [62, 27, 15]];
    const field = (q) => { let f = float(0); ISL.forEach(([x, y, r], i) => {
      const cx = drift.add(x), cy = R(16 + i).sub(0.5).mul(12).add(t.mul(0.27).add(i * 1.9).sin().mul(1.6)).add(y);
      const d = q.sub(vec2(cx, cy)); f = f.add(G(d.dot(d).div(r * r))); }); return f; };
    const f = field(p), f2 = low ? f : field(p.add(vec2(-2.6, 3.2)));
    const thr = mix(float(1.02), float(0.42), g), live = step(0.01, g);
    const cover = step(thr, f).mul(live);
    const dM = f.sub(thr).div(fwidth(f).div(fwidth(p.x)).max(0.0001));
    const rim = stroke(dM, 0.28).mul(cover);
    const dark = S(0.8, 0.84);
    const lv = band(f.mul(7), 0.24).m.mul(step(mix(thr, float(1.3), dark), f)).mul(cover);
    const peak = step(0.94, f).mul(cover);
    const rr = p.length(), kl = ripple(rr, 110, 6);
    const col = B.mul(lv).mul(float(0.6).add(kl.mul(0.8))).add(mix(B, W, 0.6).mul(rim).mul(float(0.9).sub(dark.mul(0.55)))).add(P.mul(peak).mul(float(1).sub(dark)));
    const shade = step(bayer(p, 0.24), smoothstep(thr.mul(0.7), thr, f2).mul(0.75)).mul(float(1).sub(cover)).mul(live);
    m.colorNode = col;
    m.opacityNode = cover.max(shade).mul(visionShown(ctx, c, rr.div(110)));
    m.alphaTest = 0.5;
    return m;
  }

  if (layer === "fore") {
    const dir = sgn(4);
    let f = float(0), f2 = float(0), ord = float(0);
    for (let i = 0; i < (low ? 4 : 6); i++) {
      const side = i % 2 ? 1 : -1, r = 2.6 + (i % 3) * 0.9;
      const x = R(16 + (i % 4)).mul(14).add(30 + (i >> 1) * 7).mul(side);
      const y = t.mul(0.9 + i * 0.13).mul(dir).add(i * 17.3).add(47).mod(94).sub(47);
      const gi = S(0.7 + i * 0.015, 0.78 + i * 0.015).mul(out(0.8 + i * 0.008, 0.84 + i * 0.008));
      const d = p.sub(vec2(x, y)), d2 = d.add(vec2(-1.3, 1.6));
      const e1 = G(vec2(d.x, d.y.mul(1.35)).dot(vec2(d.x, d.y.mul(1.35))).div(r * r)).mul(gi);
      f = f.add(e1); f2 = f2.add(G(d2.dot(d2).div(r * r)).mul(gi));
    }
    const cover = step(0.42, f);
    const stage2 = S(0.76, 0.8), dark = S(0.79, 0.82);
    const rings = band(f.mul(5), 0.26).m.mul(float(1).sub(stage2));
    const point = step(0.93, f).mul(stage2).mul(float(1).sub(dark));
    const dM = f.sub(0.42).div(fwidth(f).div(fwidth(p.x)).max(0.0001));
    const rim = stroke(dM, 0.16);
    const col = B.mul(rings).add(P.mul(point).mul(c.kick.mul(0.5).add(1))).add(mix(A, W, 0.5).mul(rim).mul(float(0.9).sub(dark.mul(0.4))));
    const shade = step(bayer(p, 0.2), smoothstep(0.25, 0.42, f2).mul(0.7)).mul(float(1).sub(cover));
    m.colorNode = col.mul(cover);
    m.opacityNode = cover.max(shade).mul(visionShown(ctx, c, p.length().div(90)));
    m.alphaTest = 0.5;
    return m;
  }

  const ts = sgn(2);
  const fx = p.x.div(FS), fy = p.y.sub(HEAD_Y).div(FS);
  const jaw = fy.add(8).div(10).clamp(0, 1).mul(0.2).add(0.8);
  const e = float(1).sub(sq(fx.div(jaw.mul(6.2)))).sub(sq(fy.sub(0.5).div(8.6)));
  const ep = e.max(0), dome = ep.add(0.0001).pow(0.7);
  const tau = ts.mul(t.mul(0.23).sin().mul(0.3).add(cul.mul(0.8).mul(t.mul(0.7).sin())));
  const sh = tau.mul(2.4).mul(dome);
  const fxT = fx.sub(sh), ax = fxT.abs(), x2 = fxT.mul(fxT);
  const feat = G(sq(fxT.div(0.8))).mul(G(sq(sq(fy.sub(1).div(2.3))))).mul(1.7)
    .add(G(x2.add(sq(fy.add(0.9))).div(0.45)).mul(0.9))
    .sub(G(sq(ax.sub(2.3)).div(1.3).add(sq(fy.sub(1.8)).div(0.6))).mul(1.1))
    .add(G(sq(fy.sub(3.1)).div(0.35).add(sq(ax.sub(2.1)).div(3))).mul(0.55))
    .add(G(sq(ax.sub(3)).div(2).add(sq(fy.add(0.8)).div(2))).mul(0.5))
    .add(G(x2.div(2).add(sq(fy.add(3.15)).div(0.08))).mul(0.45))
    .add(G(x2.div(1.6).add(sq(fy.add(3.85)).div(0.1))).mul(0.5))
    .add(G(x2.div(1.5).add(sq(fy.add(5.6)).div(0.8))).mul(0.6));
  const Hf = dome.mul(3.6).add(feat.mul(ep.div(0.25).min(1)));
  const eb = float(1).sub(sq(p.x.div(38))).sub(sq(p.y.add(40).div(26)));
  const nw = inv(smoothstep(-19, -12, p.y)).mul(3.2).add(5.4), en = float(1).sub(sq(p.x.div(nw))).sub(sq(p.y.add(6).max(0).div(4))).sub(sq(p.y.add(19).negate().max(0).div(2)));
  const Dn = G(sq(p.x.div(5))).mul(smoothstep(-20, -13, p.y)).mul(inv(smoothstep(-10, -5, p.y))).mul(3);
  const F = e.max(eb).max(en);
  const amp = S(0.2, 0.42).mul(t.mul(0.8).sin().mul(0.07).add(0.93));
  const D = amp.mul(Hf.mul(1.5).add(eb.max(0).add(0.0001).pow(0.8).mul(7)).add(Dn));
  const phi = t.mul(0.1).fract().mul(inv(lock)).add(lock.mul(0.5).mul(is(iv, 1)));
  const s = p.y.sub(D).div(Sb).add(phi);
  const n = s.floor(), fr = s.fract().sub(0.5);
  const pl = S(0.12, 0.42), plx = S(0.9, 0.96);
  const rowB = n.add(0.5).sub(phi).mul(Sb), hb = n.mul(12.9898).sin().mul(43758.5453).fract();
  const lb = { x: p.x, fr, hsh: hb, half: 42, par: n.mod(2), kc: rowB.sub(HEAD_Y).abs().div(75).min(1), ky: float(24).sub(rowB).div(90).clamp(0, 1) };
  const edge = lineMask(pk(22, 3), pl, lb).min(lineMask(pk(23, 3), inv(plx), lb));
  const inside = step(0, F);
  let cover = inside.mul(step(0, edge));
  const exx = p.x.sub(tau.mul(3.4)).abs().sub(4.6), eyy = p.y.sub(HEAD_Y + 3.6), dxe = exx.div(3.0), be = float(1).sub(dxe.mul(dxe)).max(0);
  const open = S(0.62, 0.7).mul(0.45).add(cul.mul(0.55)).mul(out(0.9, 0.93));
  const upY = be.mul(1.5).mul(open), lowY = be.mul(-0.9).mul(open);
  const almond = step(lowY, eyy).mul(step(eyy, upY)).mul(step(dxe.abs(), 1)).mul(step(0.02, open)).mul(cover);
  const re = vec2(exx, eyy.sub(0.2)).length();
  const b = band(s, 0.45);
  const comp = smoothstep(1.7, 3.2, fwidth(s).div(fwidth(p.y).div(Sb).max(0.0001)));
  const rrh = vec2(p.x, p.y.sub(HEAD_Y)).length(), kl = ripple(rrh, 60, 4);
  const nibm = inv(smoothstep(0, 4, edge)).mul(step(pl, 0.995));
  let col = mix(mix(A, W, inv(smoothstep(0.12, 0.45, b.t))), P, comp.mul(S(0.5, 0.62))).mul(b.m).mul(float(0.8).add(kl.mul(0.5)).add(cul.mul(0.2))).add(W.mul(b.m).mul(nibm));
  const eyeCol = A.mul(stroke(re.sub(1.05).abs(), 0.2)).add(P.mul(stroke(re, 0.5))).add(W.mul(stroke(eyy.sub(upY).abs().min(eyy.sub(lowY).abs()), 0.1)));
  col = mix(col, eyeCol, almond);
  const angH = atan2(p.x, p.y.sub(HEAD_Y));
  const dM = F.div(fwidth(F).div(fwidth(p.x)).max(0.0001));
  const rimP = S(0.3, 0.42).mul(inv(lock.mul(is(iv, 0)))).mul(out(0.9, 0.95));
  const rim = inside.mul(stroke(dM, 0.3)).mul(maskClock(rimP, angH.mul(ts))).mul(cover);
  col = mix(col, mix(B, W, 0.45).mul(1.1), rim);
  const rho = float(1).sub(e).max(0).sqrt(), an = angH.div(TAU).mul(44), loc = an.fract().sub(0.5).mul(TAU * 17 / 44), dr = rho.sub(1.17).mul(14.5);
  const pcb = S(0.6, 0.72).mul(out(0.88, 0.92));
  const crown = float(1).sub(smoothstep(float(0.45).sub(aa), 0.45, loc.mul(loc).add(dr.mul(dr)).sqrt())).mul(step(angH.abs(), 2.0)).mul(maskBeads(pcb, float(1).sub(angH.abs().div(2.0))));
  col = mix(col, mix(mix(B, W, 0.6), P, step(an.floor().mod(4), 0.5)), crown);
  const brow = star4(vec2(p.x.sub(tau.mul(3.4)), p.y.sub(HEAD_Y + 9.6)), c.kick.mul(0.3).add(1).mul(1.7)).mul(S(0.74, 0.78)).mul(out(0.86, 0.88)).mul(cover);
  col = mix(col, mix(P, W, 0.4).mul(1.3), brow);
  cover = cover.max(crown);
  m.colorNode = col;
  m.opacityNode = cover.mul(visionShown(ctx, c, rrh.div(70)));
  m.alphaTest = 0.5;
  return m;
}
