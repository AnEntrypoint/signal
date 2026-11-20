// THE FLOWER OF LIFE: a sacred-geometry gate. A compass nib draws one circle, then six, then twelve (the 19-circle
// flower); the drawn discs are its black silhouette. Late: an eye opens in the middle circle, Metatron's cube rules
// itself between the centres, the petals fill with nested vesicas on the climb.
// Layers (params.layer): world z-30 nested line hexagons (scrolls) / ring z-12 dotted rings (counter-rotate) /
// being z0 the flower (breathes) / veil z+10 black vesica blades (turn, eclipse) / fore z+22 line-art solids (drift).
// Masks: compass arcs (maskDraw round each circle), hexagon iris, vesica lids opening, clock sweeps. Roll channels 920..939.
import { MeshBasicNodeMaterial, AdditiveBlending, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep as ss, step, mix, atan2 as atan2raw, fwidth, select } from "builtin/tsl";
import { tripClock, visionShown, visionU, climb, maskDraw, maskIris, maskClock, inv, is, segH, strokeAA, ioU } from "./lib/trip.js";

const TAU = 6.28318, PI = 3.14159, R = 5.4, S3 = 1.7320508;
// atan2 is undefined at (0, 0) on some GPUs: never ask it there
const atan2 = (y, x) => atan2raw(y, x.add(1e-5));
const hexCell = (q) => { const r = vec2(1, S3), a = q.div(r).fract().sub(0.5).mul(r), b = q.sub(r.mul(0.5)).div(r).fract().sub(0.5).mul(r); const l = select(a.dot(a).lessThan(b.dot(b)), a, b); return q.sub(l); };
const hexd = (q) => q.x.abs().max(q.x.abs().mul(0.5).add(q.y.abs().mul(0.866)));   // pointy-top, inradius metric
// a vesica (two-arc almond) along x: half-length L, half-width w (node); <0 inside
const vesica = (q, L, w) => { const rho = w.mul(w).add(L * L).div(w.mul(2)); return vec2(q.x, q.y.abs().add(rho).sub(w)).length().sub(rho); };

export function material(ctx) {
  const layer = ctx.params.layer ?? "being";
  const c = tripClock(ctx), u = visionU(ctx, c), io = ioU(u);
  const low = ctx.quality === "low";
  const rn = (n) => c.rnd(920 + n), pk = (n, k) => c.pick(920 + n, k);
  const sense = (n) => step(0.5, rn(n)).mul(2).sub(1);
  const fam = pk(0, 3), hot = pk(1, 4), W = vec3(1, 1, 1);
  const blue = vec3(0.05, 0.12, 1.0), violet = vec3(0.45, 0.05, 1.0), green = vec3(0.05, 1.0, 0.3), pink = vec3(1.0, 0.06, 0.6);
  const A = blue.mul(is(fam, 0)).add(green.mul(is(fam, 1))).add(violet.mul(is(fam, 2)));
  const B = violet.mul(is(fam, 0)).add(blue.mul(is(fam, 1))).add(pink.mul(is(fam, 2)));
  const HOT = [vec3(1.0, 0.42, 0.02), vec3(1.0, 0.85, 0.05), vec3(1.0, 0.06, 0.6), vec3(0.1, 1.0, 0.15)];
  const hotC = (k) => HOT.reduce((acc, v, i) => acc.add(v.mul(is(k, i))), vec3(0));
  const H = hotC(hot), H2 = hotC(hot.add(pk(2, 3)).add(1).mod(4));
  const P = positionGeometry.xy, t = c.real;
  const live = visionShown(ctx, c, 0);
  const kickOn = step(0.001, c.kick);
  const cl = climb(c), cul = ss(0.7, 0.8, u).mul(inv(ss(0.8, 0.83, u))).mul(cl.mul(0.5).add(0.5));
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  const cutout = (col, cover) => { m.colorNode = col; m.opacityNode = cover.mul(live).clamp(0, 1); m.alphaTest = 0.5; return m; };
  const ripple = (r, reach, w) => { const f = c.beat.fract().mul(reach); return inv(ss(0, w, r.sub(f).abs())).mul(kickOn).mul(inv(ss(reach * 0.55, reach, f))); };

  // ------------------------------------------------------------------ WORLD: nested line hexagons receding (scrolls)
  if (layer === "world") {
    const aa = fwidth(P.x).mul(1.2).max(0.02), sk = strokeAA(aa);
    const h = hexd(P).max(1), K = 4.2, sc = t.mul(0.22).mul(sense(3));
    const v = h.log().mul(K).sub(sc).add(3000);
    const ln = sk(v.fract().sub(0.5).abs().mul(h).div(K), h.mul(0.006).add(0.1));
    // the hexagon's colours step outward one place on each kick
    const k3 = v.floor().add(c.beat.floor().mul(kickOn)).mod(3);
    let col = A.mul(is(k3, 0)).add(B.mul(is(k3, 1))).add(H2.mul(0.8).mul(is(k3, 2))).mul(ln);
    if (!low) {   // a second, turned family: dashed, slower, the other way
      const h2 = hexd(P.yx).max(1), v2 = h2.log().mul(K / 2).add(sc.mul(0.4)).add(3000);
      const r = P.length(), da = atan2(P.x, P.y).div(TAU).mul(48).fract().sub(0.5).abs().sub(0.25).mul(r).mul(TAU / 48);
      col = col.add(H.mul(0.55).mul(sk(v2.fract().sub(0.5).abs().mul(h2).div(K / 2), h2.mul(0.004).add(0.07))).mul(sk(da, 0)));
    }
    const pL = io(0.22, 0.45, 0.945, 0.985), edge = pL.mul(193);
    const uEnd = inv(float(0.4).div(ctx.param("vw1", -1).sub(ctx.param("vw0", -1)).max(1))).min(0.999);
    const lit = mix(float(0.1), float(1), ss(20, 46, h)).mul(ss(0.6, 0.8, u).mul(cl).mul(0.4).add(0.6)).mul(maskIris(pL, h.div(190)));
    col = col.mul(lit).add(mix(B, W, 0.4).mul(sk(h.sub(edge).abs(), 0.35)).mul(step(0.004, pL)).mul(step(pL, 0.996)));
    // 11-14 (seed 36: ~2 s of black between the faded lines and the return): the black backdrop closes inward
    // with the lines (0.95..0.99 of the slot), so what stands behind shows through outside-in, never a black hole
    void uEnd;
    return cutout(col, maskIris(ss(0, 0.1, u).mul(inv(ss(0.95, 0.99, u))), h.div(190)));
  }

  // ------------------------------------------------------------------ RING: dotted concentric rings (counter-rotate)
  if (layer === "ring") {
    const p = P.mul(74 / 86), aa = fwidth(p.x).mul(1.2).max(0.01), sk = strokeAA(aa);
    const r = p.length(), a = atan2(p.x, p.y), sp = 3.1, R0 = 19;
    const i = r.sub(R0).div(sp).floor().clamp(0, 4), rc = i.add(0.5).mul(sp).add(R0);
    const par = i.mod(2).mul(2).sub(1);
    const n = i.mul(6).add(pk(9, 3).mul(6)).add(24);
    const ad = a.add(t.mul(TAU / 60).mul(par).mul(sense(10)).mul(i.mul(0.2).add(1)));
    const kf = ad.div(TAU).mul(n).fract().sub(0.5);
    const b = vec2(kf.mul(TAU).div(n).mul(rc), r.sub(rc)).length();
    const dot = mix(sk(b, 0.5), sk(b.sub(0.8).abs(), 0.1), step(0.5, par));
    const ord = i.mul(pk(11, 3).add(1)).div(5).add(rn(12)).fract();
    const pR = io(0.33, 0.44, 0.885, 0.93).mul(2).sub(ord).clamp(0, 1);
    const msk = maskClock(pR, a.mul(par)).mul(step(0.002, pR)).mul(step(R0, r)).mul(step(r, R0 + 5 * sp));
    const i3 = i.mod(3), dc = A.mul(is(i3, 0)).add(mix(H, W, 0.15).mul(is(i3, 1))).add(B.mul(is(i3, 2)));
    m.colorNode = dc.mul(dot).mul(msk).mul(float(0.6).add(cl.mul(ss(0.6, 0.8, u)).mul(0.4)).add(ripple(r, 44, 3).mul(0.9)));
    m.opacityNode = live;
    m.transparent = true; m.blending = AdditiveBlending; m.depthWrite = false;
    return m;
  }

  // ------------------------------------------------------------------ VEIL: black vesica blades (turn, eclipse)
  if (layer === "veil") {
    const p = P.mul(74 / 64), aa = fwidth(p.x).mul(1.2).max(0.01), sk = strokeAA(aa);
    const pv = io(0.62, 0.74, 0.835, 0.875), n = pk(6, 3).add(3);
    // on the kick the wheel twitches back and forth, and alternate blades go hollow: the occlusion swaps each beat
    const bt = c.beat.floor(), tw = c.kick.mul(0.05).mul(bt.mod(2).mul(2).sub(1));
    const a = atan2(p.x, p.y).add(t.mul(TAU / 38).mul(sense(7))).add(tw), r = p.length();
    const sec = a.div(TAU).mul(n).add(100), k = sec.floor(), af = sec.fract().sub(0.5).mul(TAU).div(n);
    const q = vec2(r.mul(af.cos()).sub(14.5), r.mul(af.sin()));
    const sd = vesica(q, 8.5, pv.mul(cl.mul(0.7).add(2.3)).max(0.01));   // the petal opens; wider as the highs climb
    const inside = sk(sd, 0).mul(step(0.004, pv));
    const hollow = kickOn.mul(step(0.5, k.add(bt).div(2).fract()));
    const rim = sk(sd.add(0.14).abs(), 0.07), mid = sk(q.y.abs(), 0.04).mul(step(q.x.abs(), 6));
    return cutout(mix(B, W, 0.3).mul(rim).add(H2.mul(mid).mul(0.7)), inside.mul(inv(hollow)).max(sk(sd.add(0.14).abs(), 0.22).mul(inside)));
  }

  // ------------------------------------------------------------------ FORE: tiny line-art platonic solids (drift)
  if (layer === "fore") {
    const aa = fwidth(P.x).mul(1.2).max(0.01), pf = io(0.66, 0.78, 0.815, 0.85), dir = sense(8);
    let col = vec3(0), cover = float(0);
    for (let j = 0; j < (low ? 4 : 6); j++) {
      const n = [3, 4, 6, 6, 3, 4][j], ns = [3, 4, 3, 6, 3, 2][j], rad = 1.6 + (j % 3) * 0.5, sj = j % 2 ? -1 : 1;
      const xj = t.mul(0.016 * (1 + j * 0.17)).add(j * 0.23).fract().mul(90).sub(45).mul(dir).mul(sj);
      const yj = t.mul(0.21).add(j * 2).sin().mul(3).add(((j * 0.618) % 1 * 2 - 1) * 14);
      const q0 = P.sub(vec2(xj, yj)).div(rad), ro = t.mul(0.25 * sj).add(j), cs = ro.cos(), sn = ro.sin();
      const q = vec2(q0.x.mul(cs).sub(q0.y.mul(sn)), q0.x.mul(sn).add(q0.y.mul(cs)));
      const r = q.length(), a = atan2(q.x, q.y).div(TAU);
      const pd = r.mul(a.mul(n).add(0.5).fract().sub(0.5).mul(TAU / n).cos()).sub(1);
      const spoke = r.mul(a.mul(ns).add(0.5).fract().sub(0.5).mul(TAU / ns).sin()).abs();
      const aL = aa.div(rad), sl = strokeAA(aL);
      const inside = sl(pd, 0).mul(maskIris(pf.mul(1.8).sub(j * 0.14).clamp(0, 1), pd.add(1)));   // its own polygon irises open
      const lines = sl(pd.add(0.09).abs(), 0.06).add(sl(spoke, 0.05)).min(1);
      col = mix(col, mix([H, H2, B][j % 3], W, 0.25).mul(lines), inside); cover = cover.max(inside);
    }
    return cutout(col, cover);
  }

  // ------------------------------------------------------------------ THE BEING: the flower (breathes)
  const p = P.div(t.mul(TAU / 9).sin().mul(0.025).add(1));
  const aa = fwidth(p.x).mul(1.2).max(0.008), sk = strokeAA(aa);
  const rr = p.length(), kl = ripple(rr, 30, 2);
  const cen = hexCell(p.div(R)).mul(R);
  const ringOf = (v) => { const q = v.x.div(R).sub(v.y.div(R * S3)), r = v.y.div(R * 0.866); return q.abs().max(r.abs()).max(q.add(r).abs()); };
  const mk = pk(3, 4), mult = is(mk, 0).add(is(mk, 1).mul(5)).add(is(mk, 2).mul(7)).add(is(mk, 3).mul(11));
  const sn = sense(4), off = rn(5);
  let arcs = vec3(0), tip = float(0), cnt = float(0), md = float(9), cover = float(0);
  for (let k = 0; k < 7; k++) {   // the nearest centre and its six neighbours: every circle that can pass through here
    const ck = k ? cen.add(vec2(R * Math.cos(k * PI / 3), R * Math.sin(k * PI / 3))) : cen;
    const hd = ringOf(ck), act = step(hd, 2.5), i0 = step(hd, 0.5), i2 = step(1.5, hd), i1 = inv(i0).sub(i2);
    const ca = atan2(ck.x, ck.y).div(TAU);
    const ord = ca.mul(12).add(0.5).floor().mul(mult).div(12).add(off).fract();   // seeded order round each ring
    const s = i0.mul(0.02).add(i1.mul(ord.mul(0.13).add(0.15))).add(i2.mul(ord.mul(0.13).add(0.3)));
    const w = i0.mul(0.11).add(i1.mul(0.035)).add(i2.mul(0.03));
    const e = i0.mul(0.972).add(i1.mul(inv(ord).mul(0.022).add(0.945))).add(i2.mul(inv(ord).mul(0.035).add(0.905)));
    const pc = u.sub(s).div(w).clamp(0, 1).min(inv(u.sub(e).div(0.02).clamp(0, 1)));
    const dv = p.sub(ck), dl = dv.length(), d = dl.sub(R);
    const fa = atan2(dv.x, dv.y).div(TAU).sub(ca).mul(sn).add(0.5).fract();   // starts at the point facing the centre
    const on = maskDraw(pc, fa).mul(act).mul(step(0.001, pc));
    const drawing = step(0.001, pc).mul(step(pc, 0.999)).mul(act), lead = fa.sub(pc).abs();
    // the compass: a hot nib on the arc's end and its leg back to the pin
    tip = tip.max(sk(d.abs(), 0.3).mul(inv(ss(0, 0.012, lead))).add(sk(lead.mul(TAU).mul(dl), 0.04).mul(step(dl, R)).mul(0.5)).mul(drawing));
    arcs = arcs.max(mix(W, H, 0.35).mul(i0).add(A.mul(i1)).add(mix(B, W, 0.12).mul(i2)).mul(sk(d.abs(), 0.09)).mul(on));
    const full = act.mul(step(0.999, pc));
    cover = cover.max(step(d, 0.3).mul(full)).max(sk(d.abs(), 0.3).mul(on)).max(step(dl, R).mul(drawing).mul(step(lead.mul(TAU).mul(dl), 0.3)));
    cnt = cnt.add(step(d, 0).mul(full)); md = md.min(d.abs());
  }
  // the petals: nested vesica contours, lit on the climb, through a hexagon iris
  const hx = hexd(p.yx), pP = io(0.7, 0.8, 0.8, 0.83);
  const band = low ? float(0.6) : sk(md.div(0.6).fract().sub(0.5).abs().mul(0.6), 0.14);
  const pet = step(3.5, cnt).mul(maskIris(pP, hx.div(3 * R))).mul(step(0.004, pP));
  let col = mix(H, H2, ss(R, 2.4 * R, rr)).mul(band).mul(pet).mul(cl.mul(0.55).add(0.3));
  col = col.add(arcs.mul(float(0.85).add(kl.mul(1.1)))).add(W.mul(tip));
  // the bounding circle, compass-swept
  const pB = io(0.4, 0.45, 0.9, 0.915), bd = rr.sub(3 * R + 0.8).abs();
  const bnd = maskClock(pB, atan2(p.x, p.y).mul(sn)).mul(step(0.002, pB));
  col = col.add(mix(A, W, 0.3).mul(sk(bd, 0.1)).mul(bnd)); cover = cover.max(sk(bd, 0.3).mul(bnd));
  // Metatron's cube: three turned frames, each ruling its lines outward from the axes, one family after another
  const pm = io(0.6, 0.71, 0.85, 0.88);
  let met = float(0), nodes = float(0);
  for (let j = 0; j < 3; j++) {
    const cs = Math.cos(j * PI / 3), s0 = Math.sin(j * PI / 3);
    const q = vec2(p.x.mul(cs).add(p.y.mul(s0)).abs(), p.y.mul(cs).sub(p.x.mul(s0)).abs());
    const f = (i) => pm.mul(2.75).sub((i * 3 + j) * 0.1).clamp(0, 1);
    const ln = (dd, al, len, i) => sk(dd.abs(), 0.05).mul(maskDraw(f(i), al.div(len))).mul(step(0.002, f(i)));
    met = met.max(ln(q.y, q.x, 2 * R, 0)).max(ln(q.x.sub(R), q.y, S3 * R, 1)).max(ln(q.y.sub(S3 * R), q.x, R, 2))
      .max(ln(q.y.sub(0.866 * R), q.x, R / 2, 3)).max(ln(q.x.sub(R / 2), q.y, 0.866 * R, 4));
    if (!low) { const sg = segH(q, vec2(2 * R, 0), vec2(R / 2, 0.866 * R)); met = met.max(ln(sg.d, sg.h, 1, 5)); }
    nodes = nodes.max(sk(q.sub(vec2(R, 0)).length(), 0.3)).max(sk(q.sub(vec2(2 * R, 0)).length(), 0.3));
  }
  col = col.add(mix(H2, W, 0.25).mul(met).mul(0.9)).add(W.mul(nodes).mul(maskIris(pm, hx.div(2.3 * R))).mul(step(0.004, pm)));
  // the eye in the middle circle: vesica lids open; on the kick pupil and iris trade light for dark
  const pe = io(0.42, 0.49, 0.875, 0.895), sd = vesica(p, 2.5, pe.mul(1.3).max(0.01));
  const body = sk(sd, 0).mul(step(0.004, pe));
  const ei = p.sub(vec2(t.mul(0.5).sin().mul(0.5), t.mul(0.37).sin().mul(0.15))), er = ei.length();
  const spk = sk(atan2(ei.x, ei.y).div(TAU).mul(16).fract().sub(0.5).abs().sub(0.25).mul(er).mul(TAU / 16), 0);
  const swap = step(0.5, c.beat.div(2).fract()).mul(kickOn), pup = sk(er, 0.42);
  let ec = mix(A, W, 0.25).mul(spk).mul(sk(er, 0.95)).mul(inv(swap.mul(0.85)));
  ec = mix(ec, H.mul(swap), pup).add(mix(B, W, 0.3).mul(sk(er.sub(0.95).abs(), 0.06))).mul(sk(sd.add(0.1), 0));
  ec = ec.add(W.mul(sk(sd.add(0.08).abs(), 0.07)));
  col = mix(col, ec, body);
  return cutout(col, cover.max(body));
}
