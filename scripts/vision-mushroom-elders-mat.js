// THE MUSHROOM ELDERS: one tall elder and four smaller, dot-row caps over op-art gills, bead-studded stems, a sleepy eye each.
// Layers (params.layer): world z-30 bead-stalk planet (scrolls) / ring z-12 fairy ring (counter-rotates) / being z0 the elders
// (breathe) / veil z+10 black grass and fern curls (sway) / fore z+22 near spores (drift). Masks: stems GROW from the ground
// line, caps UNFOLD by angle, eyes open by LID, mycelium DRAWN along its length, spores RELEASED in bead order.
// Pacing: one stem alone u0-.15, elders whole by .43, ring .45-.6, veil/spores/fore .6-.8, LIFO exit .8-1 (seeded order, ch 1020+).
import { MeshBasicNodeMaterial, AdditiveBlending, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep as ss, step, mix, atan2 as atan2raw, fwidth, select } from "builtin/tsl";
import { tripClock, visionShown, visionU, climb, maskDraw, maskBeads, maskIris, maskClock, maskLid, inv, is, sgn, ioU, strokeAA, famPick, NEON } from "./lib/trip.js";

const TAU = 6.28318, PI = 3.14159, GY = -15;
const atan2 = (y, x) => atan2raw(y, x.add(1e-5));   // never (0, 0)
const hash = (a, b) => a.mul(12.9898).add(float(b).mul(78.233)).sin().mul(43758.5453).fract();

export function material(ctx) {
  const layer = ctx.params.layer ?? "being", low = ctx.quality === "low";
  const c = tripClock(ctx), u = visionU(ctx, c), live = visionShown(ctx, c, 0), io = ioU(u);
  const rn = (n) => c.rnd(1020 + n), pk = (n, k) => c.pick(1020 + n, k), sense = (n) => sgn(rn(n));
  const { BLU, VIO, PNK, ORA, YEL, GRN, W, BG } = NEON;
  const F = [[BLU, VIO], [VIO, BLU], [BLU, vec3(0.3, 0.5, 1)]], fam = pk(0, 3), hot = pk(1, 4);
  const A = famPick(F, fam, 0), B = famPick(F, fam, 1);
  const hotC = (k) => [PNK, ORA, YEL, GRN].reduce((acc, v, i) => acc.add(v.mul(is(k, i))), vec3(0));
  const H = hotC(hot), H2 = hotC(hot.add(pk(2, 3)).add(1).mod(4));
  const P = positionGeometry.xy;
  const kickOn = step(0.001, c.kick), cl = climb(c);
  const cul = ss(0.7, 0.8, u).mul(inv(ss(0.86, 0.92, u))).mul(cl.mul(0.4).add(0.6));
  const aa = fwidth(P.x).mul(1.2).max(0.01), sk = strokeAA(aa);
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  const cutout = (col, cover) => { m.colorNode = col; m.opacityNode = cover.mul(live).clamp(0, 1); m.alphaTest = 0.5; return m; };

  // ------------------------------------------------------------------ WORLD: bead stalks on a curved planet (scrolls round it)
  if (layer === "world") {
    const RP = 260, q = P.add(vec2(0, RP + 13)), r = q.length(), th = atan2(q.x, q.y), d = float(RP).sub(r);
    const pG = io(0.16, 0.45, 0.955, 0.995);
    const s = d.max(0).div(90).sqrt().mul(7), row = s.floor(), w = row.add(1).mul(2.4), hk = row.mul(2).add(1).mul(90 / 49);
    const xi = th.mul(RP).div(w).add(c.real.mul(0.11).mul(sense(3))).add(row.mul(0.37));
    const ci = xi.floor(), lx = xi.fract().sub(0.5).mul(w), ly = row.add(1).mul(row.add(1)).mul(90 / 49).sub(d), h = hash(ci, row);
    // each stalk grows out of its own ground, far rows first
    const g = pG.mul(1.6).sub(row.div(7).mul(0.4).add(h.mul(0.2))).clamp(0, 1);
    const top = h.mul(0.45).add(0.3).mul(cl.mul(0.2).add(0.8)).mul(g).mul(hk), rb = w.mul(0.17).mul(g);
    const there = step(0.22, h).mul(step(0, d)).mul(step(0.003, g));
    const hd = vec2(lx, ly.sub(top)).length(), kc = ci.add(row).mod(3);
    const hc = H.mul(is(kc, 0)).add(H2.mul(is(kc, 1))).add(mix(B, W, 0.3).mul(is(kc, 2)));
    const kl = inv(ss(0, 1.2, row.sub(c.beat.fract().mul(9)).abs())).mul(kickOn);     // the kick walks the rows toward us
    let col = mix(A, hc, ly.div(top.max(0.01)).clamp(0, 1)).mul(sk(lx.abs(), w.mul(0.045))).mul(step(ly, top)).mul(0.75);
    col = mix(col, hc.mul(kl.mul(0.6).add(0.8)), sk(hd, rb));
    col = mix(col, BG, sk(hd, rb.mul(0.62)));
    col = mix(col, mix(hc, W, 0.5), sk(hd, rb.mul(0.3))).mul(there);
    // the planet's contour arcs, drawn outward from the middle
    const arc = sk(ly.abs().min(d.abs()), 0.09).mul(step(-0.2, d)).mul(maskDraw(pG.mul(1.4), th.abs().mul(RP / 170)));
    col = col.add(mix(A, B, 0.5).mul(arc).mul(0.5).mul(inv(there.mul(sk(hd, rb)))));
    // the sky: spore rays leaving the horizon in bead order
    const pS = io(0.3, 0.47, 0.95, 0.99), up = d.negate().max(0);
    const ai = th.div(0.03), ak = ai.floor(), sr = up.sqrt().mul(1.1).sub(c.real.mul(0.07)).add(ak.mul(0.5)), hs = hash(ak, sr.floor());
    const sd = vec2(ai.fract().sub(0.5).mul(0.03).mul(r), sr.fract().sub(0.5).mul(up.sqrt().mul(1.8).add(0.5))).length();
    const star = sk(sd, hs.mul(0.5).add(0.2)).mul(step(0.35, hs)).mul(step(0.5, up)).mul(maskBeads(pS.mul(1.3), up.div(130).add(hs.mul(0.3))));
    col = col.add(mix(mix(A, B, hs), H2, step(0.88, hs)).mul(star).mul(0.8));
    return cutout(col, float(1));
  }

  // ------------------------------------------------------------------ RING: the fairy ring (rows counter-rotate, sway on the bar)
  if (layer === "ring") {
    const p = P.mul(74 / 86).sub(vec2(0, 3)), r = p.length(), a = atan2(p.x, p.y);
    const k = r.sub(18).div(4).floor().clamp(0, 2), dk = k.mod(2).mul(2).sub(1).mul(sense(5)), Rk = k.mul(4).add(20);
    const n = k.mul(6).add(pk(6, 3).mul(4)).add(18);
    const cell = a.add(c.real.mul(TAU / 55).add(c.bar.mul(TAU / 8).sin().mul(0.22)).mul(dk)).div(TAU).mul(n), ki = cell.floor();
    const bd = vec2(cell.fract().sub(0.5).mul(TAU).div(n).mul(Rk), r.sub(Rk)).length();
    const big = is(ki.mod(4), 0), rad = k.mul(0.15).add(0.42).add(big.mul(0.4));
    const pD = io(0.45, 0.6, 0.86, 0.93);
    const order = a.mul(dk).div(TAU).add(0.5).fract();
    const bead = sk(bd, rad).sub(sk(bd, rad.mul(0.45)).mul(big)).mul(maskBeads(pD.mul(1.5).sub(k.mul(0.22)).clamp(0, 1), order));
    const run = inv(ss(0, 0.06, order.sub(c.beat.div(4)).fract().sub(0.5).abs())).mul(kickOn);
    const line = sk(r.sub(33.5).abs(), 0.07).add(sk(r.sub(16.5).abs(), 0.07)).mul(maskClock(io(0.45, 0.56, 0.88, 0.93), a.mul(sense(5))));
    m.colorNode = mix(mix(B, A, is(k, 1)), H, big).mul(bead).mul(cul.mul(0.5).add(0.6).add(run)).add(A.mul(line).mul(0.6));
    m.opacityNode = live;
    m.transparent = true; m.blending = AdditiveBlending; m.depthWrite = false;
    return m;
  }

  // ------------------------------------------------------------------ VEIL: black grass and fern curls (sway)
  if (layer === "veil") {
    const pG = io(0.6, 0.73, 0.83, 0.89), sw = sense(8);
    let col = vec3(0), cover = float(0);
    for (let j = 0; j < (low ? 1 : 2); j++) {
      const cw = 3.4 - j * 1.1, xi = P.x.div(cw).add(j * 0.37), ci = xi.floor(), lx = xi.fract().sub(0.5).mul(cw), h = hash(ci, j + 3);
      const tp = mix(float(-30), h.mul(9).sub(17 + j * 1.5), pG.mul(1.5).sub(h.mul(7).fract().mul(0.5)).clamp(0, 1));   // blades grow up
      const t = P.y.add(30).div(tp.add(30).max(0.01)).clamp(0, 1);
      const bend = c.real.mul(0.7 + j * 0.3).add(h.mul(TAU)).add(P.x.mul(0.06)).sin().mul(0.8).add(sw.mul(0.35)).mul(t).mul(t);
      const dx = lx.sub(bend).abs().sub(inv(t).mul(1.3 - j * 0.3)), in_ = sk(dx, 0).mul(step(P.y, tp));
      const rim = sk(dx.abs(), 0.09).mul(step(P.y, tp));
      // the bar swaps which blades are solid black and which only an outline: what hides the elders changes
      const solid = step(0.5, ci.add(c.bar.floor().mul(kickOn)).div(2).fract());
      col = mix(col, BG.add(mix(A, B, h).mul(rim).mul(0.9)), in_); cover = cover.max(mix(rim, in_, solid));
    }
    // fern curls: the stalk rises, then the fiddlehead unrolls from the outside in
    const ax = P.x.abs(), sd = step(0, P.x).mul(2).sub(1), pF = io(0.64, 0.78, 0.82, 0.87);
    const q = vec2(ax.sub(27), P.y.add(3)), r = q.length(), th = atan2(q.y, q.x).add(c.real.mul(0.5).add(sd).sin().mul(0.25));
    const tr = r.div(2.3).sub(th.div(TAU)), band = tr.fract().sub(0.5).abs().mul(2.3);
    const curl = sk(band, 0.62).mul(step(r, 7.2)).mul(step(inv(pF.mul(2).sub(1).clamp(0, 1)).mul(7.2), r));
    const sx = ax.sub(33.6).sub(P.y.add(3).mul(0.03)).abs(), stalk = sk(sx, 0.62).mul(step(P.y, -3)).mul(step(P.y, pF.mul(2).clamp(0, 1).mul(42).sub(45)));
    const fb = vec2(th.div(TAU).mul(9).fract().sub(0.5).mul(TAU / 9).mul(r), tr.fract().sub(0.5).mul(2.3)).length();
    const fl = mix(B, W, 0.3).mul(sk(band.sub(0.62).abs(), 0.09).mul(step(r, 7.2)).add(sk(sx.sub(0.62).abs(), 0.09))).add(H.mul(sk(fb, 0.24)).mul(curl)).mul(cul.mul(0.3).add(0.8));
    const fern = curl.max(stalk);
    col = mix(col, BG.add(fl), fern); cover = cover.max(fern);
    return cutout(col, cover);
  }

  // ------------------------------------------------------------------ FORE: big near spores (drift up and across)
  if (layer === "fore") {
    const pin = io(0.66, 0.8, 0.8, 0.86), dr = sense(15);
    let col = vec3(0), cover = float(0);
    for (let j = 0; j < (low ? 3 : 5); j++) {
      const rad = 2.4 + (j % 3) * 0.9;
      const yj = c.real.mul(0.011 * (1 + j * 0.2)).add(j * 0.37).fract().mul(84).sub(42);
      const xj = c.real.mul(0.21).add(j * 1.7).sin().mul(4).add(yj.mul(0.12).mul(dr)).add([-22, 17, -8, 26, 6][j]);
      const q = P.sub(vec2(xj, yj)).div(rad), len = q.length(), aL = aa.div(rad);
      const disc = inv(ss(inv(aL), 1, len)).mul(maskIris(pin.mul(1.8).sub(j * 0.16).clamp(0, 1), len));
      const fa = atan2(q.x, q.y).div(TAU).mul(8).add(c.real.mul(j % 2 ? 0.07 : -0.07)).fract().sub(0.5);
      const dots = inv(ss(float(0.1), aL.add(0.1), vec2(fa.mul(TAU / 8 * 0.55), len.sub(0.55)).length()));
      const lit = mix([H, H2, B][j % 3], W, 0.2).mul(ss(0.84, aL.add(0.84), len)).add(mix(B, W, 0.5).mul(dots)).add([H2, H, W][j % 3].mul(inv(ss(float(0.2), aL.add(0.2), len))));
      col = mix(col, BG.add(lit.mul(cul.mul(0.3).add(0.8))), disc); cover = cover.max(disc);
    }
    return cutout(col, cover);
  }

  // ------------------------------------------------------------------ THE BEING: the elders (breathe from the ground line)
  const br = c.real.mul(TAU / 9).sin().mul(0.015).add(1);
  const X = P.x.div(br), y0 = P.y.sub(GY).div(br), ax = X.abs();
  let col = vec3(0), cover = float(0);
  const lay = (body, lit) => { col = mix(col, lit, body); cover = cover.max(body); };
  // one expression, three zones folded on x: the elder, the near pair, the far pair
  const zone = step(10.3, ax).add(step(21.8, ax)), z0 = is(zone, 0), z1 = is(zone, 1), z2 = is(zone, 2);
  const cx = z1.mul(16).add(z2.mul(27.5)), R = z0.mul(9.6).add(z1.mul(5.4)).add(z2.mul(5));
  const capY = z0.mul(19).add(z1.mul(rn(9).mul(3).add(10))).add(z2.mul(rn(10).mul(4).add(12.5))).mul(cl.mul(0.05).mul(ss(0.45, 0.8, u)).add(1));
  const x = select(zone.lessThan(0.5), X, ax.sub(cx));
  const idx = zone.mul(2).sub(step(0, X).mul(step(0.5, zone)));
  const o = idx.mul(pk(11, 4).add(1)).add(pk(12, 5)).mod(5);            // this roll's order of arrival, 0..4
  const s1 = step(0.5, o), tS = s1.mul(0.095).add(o.mul(0.055)), tC = tS.add(0.11).sub(s1.mul(0.05)), tE = float(0.948).sub(o.mul(0.017));
  const pS = ss(tS, tC, u).mul(inv(ss(tE.add(0.02), tE.add(0.045), u)));
  const pC = ss(tC.sub(0.01), tC.add(0.06), u).mul(inv(ss(tE, tE.add(0.025), u)));
  const pE = ss(tC.add(0.06), tC.add(0.12), u).mul(inv(ss(tE.sub(0.025), tE, u)));

  // mycelium: threads sagging between the feet, drawn along their length, and the ground's bead line
  const pM = io(0.3, 0.45, 0.85, 0.885);
  const sag = select(ax.lessThan(16), ax.div(16), ax.sub(16).div(11.5).min(1)).mul(PI).sin();
  // each thread creeps out from the elders' feet (x 0, 16, 27.5), its own pace, a lit tip leading; no straight-edged wipe
  const fx = ax.min(ax.sub(16).abs()).min(ax.sub(27.5).abs()), sd2 = rn(14);
  let col_m = vec3(0), cov_m = float(0);
  for (let k = 0; k < 3; k++) {
    const dk = y0.add(sag.mul(2 + k * 2.3)).add(0.9 + k * 0.8).add(ax.mul(1.1).add(k * 2).sin().mul(0.25)).abs();
    const reach = pM.mul(1.35).sub(sd2.add(k * 0.37).fract().mul(0.35)).clamp(0, 1).mul(9.5), ahead = reach.sub(fx);
    const on = step(0, ahead).mul(step(ax, 34)), tip = inv(ss(0, 1.4, ahead.abs())).mul(step(0.05, reach)).mul(step(ax, 34));
    const nb = vec2(ax.div(2.6).fract().sub(0.5).mul(2.6), dk).length();
    cov_m = cov_m.max(sk(dk, 0.3).mul(on));
    col_m = col_m.add(mix(B, W, 0.2).mul(sk(dk, 0.1)).add(H2.mul(sk(nb, 0.27))).mul(on)).add(H.mul(sk(dk, 0.32)).mul(tip));
  }
  const gb = vec2(ax.div(1.5).fract().sub(0.5).mul(1.5), y0).length();
  const gOn = maskBeads(pM.mul(1.2).clamp(0, 1), fx.div(9.5).add(hash(ax.div(1.5).floor(), 21).mul(0.15)).clamp(0, 1)).mul(step(ax, 34));
  lay(cov_m.max(sk(gb, 0.3).mul(gOn)), col_m.add(A.mul(sk(gb, 0.17)).mul(gOn)));

  // stem: grows up from the ground line, bead studs in staggered rows, the kick running up them
  const hw = R.mul(0.17).mul(inv(ss(0, 0.5, y0.div(capY))).mul(0.6).add(1)), ds = x.abs().sub(hw);
  const row = y0.div(1.5).floor(), bd = vec2(x.sub(row.mod(2).sub(0.5).mul(hw)), y0.div(1.5).fract().sub(0.5).mul(1.5)).length();
  const chase = inv(ss(0, 0.12, row.mul(0.09).sub(c.beat.mul(0.5)).fract().sub(0.5).abs())).mul(kickOn);
  let sc = BG.add(A.mul(0.12)).add(mix(B, W, 0.3).mul(sk(ds.abs(), 0.1)));
  sc = mix(sc, mix(H, H2, row.mod(2)).mul(chase.add(0.75)), sk(bd, R.mul(0.045).add(0.12)));
  lay(sk(ds, 0).mul(step(0, y0)).mul(step(y0, capY.mul(pS))).mul(step(0.002, pS)), sc);

  // cap: an umbrella, narrow bud widening as it unfolds by angle from the apex; dot rows counter-rotate; op-art gills under
  const Rw = R.mul(pC.mul(0.72).add(0.28)), qx = x.div(Rw), qy = y0.sub(capY).div(R.mul(float(1.2).sub(pC.mul(0.4))));
  const el = vec2(qx, qy).length(), un = step(atan2(qx.abs(), qy).div(PI / 2), pC.mul(2.4)).mul(step(0.002, pC));
  const dome = sk(el.sub(1).mul(R).mul(0.6), 0).mul(sk(qy.add(0.1).negate().mul(R), 0));
  const kr = el.mul(4.5).floor(), nk = kr.mul(5).add(3);
  const cell = atan2(qx, qy).div(PI).mul(nk).add(c.real.mul(0.04).mul(kr.mod(2).mul(2).sub(1)).mul(sense(13)));
  const dd = vec2(cell.fract().sub(0.5).div(nk).mul(PI).mul(el).mul(Rw), el.mul(4.5).fract().sub(0.5).mul(R).mul(0.8 / 4.5)).length();
  const k3 = kr.add(idx).mod(3), dotC = mix(H.mul(is(k3, 0)).add(H2.mul(is(k3, 1))).add(mix(B, W, 0.5).mul(is(k3, 2))), W, cul.mul(0.6));
  let cc = BG.add(A.mul(0.16)).add(mix(B, W, 0.4).mul(sk(el.sub(1).abs().mul(R).mul(0.6), 0.14)));
  cc = mix(cc, dotC, sk(dd, R.mul(0.055)));
  const gy = qy.add(0.1).negate().div(0.26), gw = inv(gy.mul(0.72)).max(0.05), gx = qx.div(gw);
  const gill = sk(gx.abs().sub(1).mul(Rw).mul(0.5), 0).mul(step(0, gy)).mul(sk(gy.sub(1).mul(R).mul(0.2), 0));
  const gs = sk(gx.mul(3.5).add(c.bar.floor().mul(0.5).mul(kickOn)).fract().sub(0.5).abs().sub(0.25).mul(gw).mul(Rw).div(3.5), 0);   // flips on the bar
  cc = mix(cc, mix(BG, mix(B, W, 0.6), gs), gill);
  lay(dome.max(gill).mul(un), cc);

  // the sleepy eye: lids part from the centre line, half closed until the culmination
  const ex = qx.div(0.44), eh = inv(ex.mul(ex)).max(0.001).mul(0.21), es = qy.sub(0.47).div(eh), em = eh.mul(R).mul(0.8);
  const alm = sk(es.abs().sub(1).mul(em), 0).mul(step(ex.abs(), 1)).mul(maskLid(pE, es)).mul(step(0.002, pE));
  const lo = cul.mul(0.85).add(c.real.mul(0.5).add(idx.mul(2)).sin().mul(0.12)).sub(0.05);
  const ir = vec2(qx.sub(c.real.mul(0.3).add(idx.mul(2)).sin().mul(0.07)), qy.sub(0.43)).length().mul(R);
  let ec = mix(mix(W, H2, sk(ir, R.mul(0.15))), BG, sk(ir, R.mul(0.07)));
  ec = mix(ec, BG.add(B.mul(0.3)), inv(sk(es.sub(lo).mul(em), 0)));
  ec = ec.add(mix(B, W, 0.6).mul(sk(es.sub(lo).abs().mul(em), 0.09).add(sk(es.abs().sub(1).abs().mul(em), 0.1))));
  lay(alm, ec);

  // spores: beads lifting off the cap in bead order, shrinking as they climb; the highs lift them further
  const pP = io(0.62, 0.8, 0.83, 0.875);
  const sxi = x.div(1.7).add(0.5), yy = y0.div(2.4).sub(c.real.mul(0.3)), hh = hash(sxi.floor().add(zone.mul(9)), yy.floor());
  const lift = y0.sub(capY).sub(R.mul(0.7)).div(pP.mul(cl.mul(5).add(9)).max(0.01));
  const sb = vec2(sxi.fract().sub(0.5).mul(1.7).sub(yy.mul(2).add(hh.mul(6)).sin().mul(0.3)), yy.fract().sub(0.5).mul(2.4)).length();
  const sr = hh.mul(0.3).add(0.22).mul(inv(lift).clamp(0, 1));
  const sp = step(0.5, hh).mul(maskBeads(pP, hh.mul(7).fract())).mul(step(1.03, el)).mul(step(0, qy)).mul(step(x.abs(), R.mul(0.95))).mul(step(lift, 1));
  lay(sk(sb, sr.add(0.12)).mul(sp), mix(mix(H, H2, step(0.75, hh)), W, 0.25).mul(sk(sb, sr)));
  return cutout(col, cover);
}
