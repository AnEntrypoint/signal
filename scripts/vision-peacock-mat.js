// THE PEACOCK OF A HUNDRED EYES: a peacock facing you, crowned head and beaded neck at the bottom centre, a tail fan of
// spines each ending in a concentric teardrop eye. Layers (params.layer): world z-30 radiating barbs, a moire of two ray
// fields turning against each other, zones drifting outward / ring z-12 a wheel of larger eyes counter-turning, bead circle
// the other way / being z0 (breathes) / veil z+10 black feather blades folding and spreading like a hand fan / fore z+22
// loose feathers drifting down. Pacing: crest beads alone u0-.07, neck beads climb .07-.2, head .17, crest stalks .22,
// breast .2-.3, fan row by row .26-.72 (clock sweep outward, spine by nib, eye by iris), barbs .36-.8, wheel .5-.64,
// blades .6-.74, feathers .66-.8; LIFO exit .8-1, the barbs last.
import { MeshBasicNodeMaterial, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep as ss, step, mix, atan2 as atan2raw, fwidth } from "builtin/tsl";
import { tripClock, visionShown, visionU, climb, maskDraw, maskBeads, maskIris, inv, is, sgn, segH, strokeAA, ioU, NEON } from "./lib/trip.js";

const TAU = 6.28318;
const atan2 = (y, x) => atan2raw(y, x.add(1e-5));
const hash = (k, o = 0) => k.mul(12.9898 + o).add(o * 3.1).sin().mul(43758.5453).fract();
// a teardrop's normalised radius: round outward (+y), drawn out to a tail toward -y
const tear = (x, y, e) => vec2(x, y.mul(step(0, y).mul(0.42).add(0.58))).length().div(e);
const ROWS = [[10.5, 4], [16.5, 6], [23.5, 8], [31.5, 10]];

export function material(ctx) {
  const layer = ctx.params.layer ?? "being", low = ctx.quality === "low";
  const c = tripClock(ctx), u = visionU(ctx, c), live = visionShown(ctx, c, 0), io = ioU(u);
  const rn = (n) => c.rnd(1160 + n), pk = (n, k) => c.pick(1160 + n, k), sense = (n) => sgn(rn(n));
  const { BLU, VIO, PNK, ORA, YEL, GRN, W, BG } = NEON;
  const fam = pk(0, 4), hot = pk(1, 4), TEAL = vec3(0.01, 0.55, 0.5);
  const A = BLU.mul(is(fam, 0).add(is(fam, 3))).add(VIO.mul(is(fam, 1))).add(TEAL.mul(is(fam, 2)));
  const B = VIO.mul(is(fam, 0)).add(BLU.mul(is(fam, 1).add(is(fam, 2)))).add(GRN.mul(0.8).mul(is(fam, 3)));
  const hotC = (k) => [ORA, PNK, YEL, GRN].reduce((a, v, i) => a.add(v.mul(is(k, i))), vec3(0));
  const H = hotC(hot), H2 = hotC(hot.add(pk(2, 3)).add(1).mod(4));
  const P = positionGeometry.xy, T = c.real;
  const kOn = step(0.001, c.kick), cl = climb(c);
  const cul = io(0.7, 0.8, 0.86, 0.92).mul(cl.mul(0.4).add(0.6));
  const on = (p) => step(0.004, p);
  // accents, all gated by the kick being on: a blink rippling outward, rings thinning to line-art every other pair of bars
  const blinkAt = (R) => inv(ss(0, 4, float(R).sub(c.beat.fract().mul(44)).abs())).mul(kOn);
  const swap = ss(-0.3, 0.3, c.bar.mul(TAU / 4).sin()).mul(kOn);
  const eye = (dn, aE, blink) => {
    const s = strokeAA(aE), th = inv(swap.mul(0.62));
    const rg = (mid, hw, cc) => cc.mul(s(dn.sub(mid).abs(), th.mul(hw)));
    return mix(BG.add(A.mul(0.3)), mix(H2, W, 0.45).mul(1.5), blink).mul(s(dn, 0.22))
      .add(rg(0.4, 0.1, A)).add(rg(0.63, 0.08, B)).add(rg(0.8, 0.055, H)).add(rg(0.94, 0.045, H2));
  };
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  const cutout = (col, cover) => { m.colorNode = col; m.opacityNode = cover.mul(live).clamp(0, 1); m.alphaTest = 0.5; return m; };
  let col = vec3(0), cover = float(0);
  const lay = (b, lit) => { col = mix(col, lit, b); cover = cover.max(b); };

  // ------------------------------------------------------------------ WORLD: barbs radiating from behind the bird
  if (layer === "world") {
    const q = P.sub(vec2(0, -21)), r = q.length().max(0.01), a = atan2(q.x, q.y).div(TAU);
    const aaP = fwidth(P.x).mul(1.2).max(0.02), sn = sense(3);
    const uEnd = inv(float(0.4).div(ctx.param("vw1", -1).sub(ctx.param("vw0", -1)).max(1))).clamp(0.95, 0.999);
    const G = mix(ss(0.36, 0.8, u).mul(cl.mul(0.3).add(0.7)), float(1), ss(0.74, 0.84, u)).mul(inv(ss(0.93, uEnd, u)));
    const N1 = pk(4, 3).mul(12).add(150), N2 = N1.add(pk(5, 2).mul(2)).add(6);
    const ray = (x, N) => { const e = N.mul(aaP).div(r.mul(TAU)).mul(0.7).min(0.25); return ss(float(0.25).sub(e), e.add(0.25), x.fract().sub(0.5).abs()); };
    const zr = r.div(13).sub(T.mul(0.07)).add(64), zone = zr.floor();
    const f = ray(a.mul(N1).add(T.mul(0.2).mul(sn)).add(zone.mul(0.5)), N1).mul(ray(a.mul(N2).sub(T.mul(0.13).mul(sn)), N2));
    // every barb its own length: the field's edge is a row of feather tips, not a disc
    const ks = a.mul(64).floor(), tipS = a.mul(64).fract().sub(0.5).abs().mul(12);
    const len = G.mul(130).mul(hash(ks, 2).mul(0.25).add(0.75)).sub(tipS.mul(G));
    const nibW = inv(ss(0, 2.2, len.sub(r))).mul(step(G, 0.995));
    const kl = inv(ss(0, 7, r.sub(c.beat.fract().mul(120)).abs())).mul(kOn);
    const seam = inv(ss(0.04, 0.1, zr.fract().sub(0.5).abs().sub(0.42)));
    const lit = mix(A, B, zone.mod(2)).mul(f).mul(ss(2, 14, r)).mul(cul.mul(0.35).add(0.42).add(kl.mul(0.6))).mul(seam.mul(0.6).add(0.4));
    return cutout(lit.add(H.mul(nibW)), step(r, len).mul(on(G)));
  }

  // ------------------------------------------------------------------ RING: a wheel of larger eyes turning behind the fan
  if (layer === "ring") {
    const q = P.sub(vec2(0, -2)), r = q.length(), a0 = atan2(q.x, q.y), sn = sense(6);
    const aa = fwidth(P.x).mul(1.2).max(0.01), st = strokeAA(aa);
    const N = pk(7, 3).mul(2).add(12), R = 25, e = float(R * TAU * 0.3).div(N);
    const a = a0.add(T.mul(TAU / 90).mul(sn)), k = a.div(TAU).mul(N).add(0.5).floor(), ac = a.sub(k.mul(TAU).div(N));
    const dn = tear(r.mul(ac.sin()), r.mul(ac.cos()).sub(R).mul(sense(8)), e);
    const pR = io(0.5, 0.64, 0.86, 0.91), pe = pR.mul(2).sub(k.div(N).mul(sn).add(rn(9)).fract()).clamp(0, 1);
    lay(strokeAA(aa.div(e))(dn, 1).mul(maskIris(pe, dn)).mul(on(pe)), eye(dn, aa.div(e), blinkAt(22)).mul(cul.mul(0.3).add(0.6)));
    const nD = pk(10, 3).mul(6).add(36), ad = a0.sub(T.mul(TAU / 60).mul(sn)), kd = ad.div(TAU).mul(nD).add(0.5).floor();
    const adc = ad.sub(kd.mul(TAU).div(nD));
    const bd = vec2(r.mul(adc.sin()), r.mul(adc.cos()).sub(33)).length();
    const pD = io(0.56, 0.68, 0.85, 0.9);
    lay(st(bd, 0.5).mul(maskBeads(pD, kd.div(nD).add(0.5).fract())).mul(on(pD)), mix(H, mix(B, W, 0.3), step(0.5, kd.add(64).mod(3))).mul(blinkAt(30).add(0.7)));
    return cutout(col, cover);
  }

  // ------------------------------------------------------------------ VEIL: black feather blades, a hand fan folding and spreading
  if (layer === "veil") {
    const aa = fwidth(P.x).mul(1.2).max(0.01), st = strokeAA(aa);
    const q = vec2(P.x.abs(), P.y.add(11.8)), r = q.length(), a = atan2(q.x, q.y), K = low ? 4 : 5, L = 31;
    const s = T.mul(0.3).add(rn(12).mul(TAU)).sin().mul(0.5).add(0.5).mul(0.72).add(0.28);
    const D = s.mul(1.75 / K), k = a.div(D).floor().clamp(0, K - 1);
    const da = a.sub(k.add(0.5).mul(D)).add(T.mul(0.11).sin().mul(0.05)).clamp(-1.5, 1.5);
    const x = r.mul(da.sin()), y = r.mul(da.cos()), h = y.div(L);
    // on the kick the blades thin: what they hid shows through
    const w = h.mul(inv(h)).clamp(1e-4, 1).sqrt().mul(h.clamp(0, 1).mul(0.8).add(0.4)).mul(9.2).mul(inv(c.kick.mul(0.45)));
    const d = x.abs().sub(w).max(y.negate()).max(y.sub(L));
    const pin = io(0.6, 0.74, 0.82, 0.87), pj = pin.mul(2).sub(k.div(K)).clamp(0, 1);
    const run = inv(ss(0, 0.07, h.sub(c.beat.div(2).fract()).abs())).mul(kOn);
    const beads = st(vec2(x, y.div(2.2).fract().sub(0.5).mul(2.2)).length(), 0.3).mul(step(0.12, h)).mul(step(h, 0.9));
    lay(st(d, 0).mul(maskDraw(pj, h)).mul(on(pj)),
      BG.add(mix(B, W, 0.35).mul(st(d.abs(), 0.14)).mul(0.85)).add(mix(H, H2, k.mod(2)).mul(beads).mul(run.mul(1.6).add(0.35))));
    return cutout(col, cover);
  }

  // ------------------------------------------------------------------ FORE: loose feathers drifting down, each with its eye
  if (layer === "fore") {
    const aa = fwidth(P.x).mul(1.2).max(0.01);
    const pin = io(0.66, 0.8, 0.8, 0.85);
    for (let j = 0; j < (low ? 3 : 5); j++) {
      const sz = 1 + (j % 3) * 0.25, aL = aa.div(sz), st = strokeAA(aL);
      const yj = inv(T.mul(0.02 * (1 + j * 0.17)).add(j * 0.37).fract()).mul(60).sub(30);
      const xj = T.mul(0.4).add(j * 1.9).sin().mul(3).add(rn(20).add(j * 0.274).fract().sub(0.5).mul(50));
      const ro = T.mul(0.7).add(j * 2.3).sin().mul(0.5).add(j % 2 ? 0.3 : -0.3), cs = ro.cos(), sn = ro.sin();
      const q = P.sub(vec2(xj, yj)).div(sz);
      const lx = q.x.mul(cs).sub(q.y.mul(sn)), ly = q.x.mul(sn).add(q.y.mul(cs)).negate();   // the eye hangs lowest
      const s = ly.add(5.5).div(9).clamp(0, 1);
      const d = vec2(lx, ly.sub(3.5).max(0)).length().sub(s.max(1e-4).sqrt().mul(1.6).add(0.5)).max(ly.negate().sub(5.5));
      const pj = pin.mul(1.8).sub(j * 0.16).clamp(0, 1);
      const dn = tear(lx, ly.sub(3.5), 1.7), em = st(dn.sub(1).mul(1.7), 0).mul(maskIris(pj.mul(2).sub(1).clamp(0, 1), dn));
      const vane = step(ly, 1.6).mul(st(lx.abs(), 0.06).add(st(ly.sub(lx.abs().mul(1.2)).mul(1.5).fract().sub(0.5).abs().sub(0.36), 0).mul(0.3)));
      lay(st(d, 0).mul(maskDraw(pj.mul(1.6), s)).mul(on(pj)),
        mix(BG.add(mix(j % 2 ? A : B, W, 0.3).mul(vane.add(st(d.abs(), 0.08)).min(1))), eye(dn, aL.div(1.7), blinkAt(40)), em));
    }
    return cutout(col, cover);
  }

  // ------------------------------------------------------------------ THE BEING (breathes)
  const p = P.div(T.mul(TAU / 9).sin().mul(0.015).add(1));
  const aa = fwidth(p.x).mul(1.2).max(0.008), st = strokeAA(aa);
  const ax = p.x.abs();
  const fv = vec2(ax, p.y.add(14)), r = fv.length(), a = atan2(fv.x, fv.y);
  const spread = rn(13).mul(0.2).add(1.62), nb = pk(14, 3), nR = low ? 3 : 4;
  const late = inv(step(0, p.x.mul(sense(15)))).mul(0.22);              // one wing leads the other
  const G = mix(ss(0.26, 0.7, u).mul(cl.mul(0.25).add(0.75)), float(1), ss(0.72, 0.8, u)).mul(inv(ss(0.86, 0.95, u))).mul(nR - 0.05);
  const lit = cul.mul(0.4).add(0.75);
  for (let j = nR - 1; j >= 0; j--) {                                    // outer rows first, so inner eyes sit over outer spines
    const [R, n0] = ROWS[j], n = nb.add(n0), D = spread.div(n);
    const i = a.div(D).floor().clamp(0, n.sub(1)), da = a.sub(i.add(0.5).mul(D)).clamp(-1.2, 1.2);
    const x = r.mul(da.sin()), y = r.mul(da.cos()).sub(R), e = D.mul(R * 0.46);
    const gj = G.sub(j * 0.95).clamp(0, 1);
    const qp = gj.mul(2.4).sub(i.add(0.5).div(n).mul(0.9)).sub(late).clamp(0, 1.2), ps = qp.div(0.6).min(1);
    // a bead arc beyond the row, lighting along the sweep
    const Db = D.div(3), db = a.sub(a.div(Db).floor().add(0.5).mul(Db)), Rb = e.mul(1.25).add(R + 0.9);
    const pb = gj.mul(1.8).sub(0.7).clamp(0, 1);
    lay(st(vec2(r.mul(db.sin()), r.mul(db.cos()).sub(Rb)).length(), 0.28).mul(step(a, spread)).mul(maskBeads(pb, a.div(spread).add(late))).mul(on(pb)),
      mix(H, mix(B, W, 0.4), step(0.5, a.div(Db).floor().mod(2))).mul(blinkAt(R + 4).mul(0.8).add(0.8)));
    lay(st(x.abs(), 0.065).mul(step(3, r)).mul(step(y, 0)).mul(maskDraw(ps, r.div(R))).mul(on(qp)), mix(B, W, 0.45).mul(lit));
    lay(st(vec2(x, r.sub(ps.mul(R))).length(), 0.3).mul(step(qp, 0.6)).mul(on(qp)), mix(H, W, 0.3).mul(1.6));   // the nib
    const dn = tear(x, y, e), pe = qp.sub(0.6).div(0.6).clamp(0, 1), aE = aa.div(e);
    lay(strokeAA(aE)(dn, 1).mul(maskIris(pe, dn)).mul(on(pe)), eye(dn, aE, blinkAt(R)).mul(lit));
  }

  // the breast: a teardrop of scale arcs opening from its heart
  const bn = vec2(p.x.div(4.3), p.y.add(20.5).div(6.6)).length(), sdB = bn.sub(1).mul(4.3);
  const pB = io(0.2, 0.3, 0.95, 0.98);
  const sy = p.y.div(1.5), rowB = sy.floor(), sx = p.x.div(1.7).add(rowB.mul(0.5));
  const arc = st(vec2(sx.fract().sub(0.5), sy.fract().sub(1)).length().sub(0.56).abs().mul(1.5), 0.09);
  lay(st(sdB, 0).mul(maskIris(pB, bn)).mul(on(pB)),
    BG.add(mix(A, B, rowB.add(64).mod(2)).mul(arc).mul(lit)).add(mix(A, W, 0.5).mul(st(sdB.abs(), 0.12))));
  // neck beads climbing; on the kick their colours step up the neck
  const yb = p.y.add(15.6).div(1.15), kb = yb.floor(), okN = step(0, kb).mul(step(kb, 5.5));
  const pN = io(0.07, 0.2, 0.955, 0.985);
  const nd = vec2(p.x, yb.fract().sub(0.5).mul(1.15)).length().sub(inv(kb.div(14)).mul(0.56));
  lay(st(nd, 0).mul(okN).mul(maskBeads(pN, kb.div(6))).mul(on(pN)),
    mix(H, mix(A, W, 0.45), step(0.5, kb.add(c.beat.floor().mul(kOn)).mod(2))).add(W.mul(st(nd.add(0.38), 0)).mul(0.5)));
  // head, eyes, beak
  const hd = vec2(p.x, p.y.add(7)).length(), pH = io(0.17, 0.24, 0.965, 0.99);
  const beak = st(ax.sub(p.y.add(9.2).mul(0.5)).max(p.y.add(7.9)), 0).mul(step(-9.2, p.y));
  lay(st(hd.sub(1.75), 0).max(beak).mul(maskIris(pH, hd.div(2.3))).mul(on(pH)),
    BG.add(mix(A, W, 0.5).mul(st(hd.sub(1.75).abs(), 0.11))).add(W.mul(st(vec2(ax.sub(0.75), p.y.add(6.7)).length(), 0.3))).add(H2.mul(beak)));
  // crest: stalks draw down from the beads; the three beads are the seed, first in and last out
  const pS = io(0.22, 0.27, 0.97, 0.99), ord = pk(16, 2), side = step(0.85, ax);
  const sg = segH(vec2(ax, p.y), vec2(1.7, -3.5), vec2(0.3, -5.4)), sc = segH(vec2(ax, p.y), vec2(0, -3), vec2(0, -5.3));
  lay(st(sg.d, 0.07).mul(maskDraw(pS, sg.h)).max(st(sc.d, 0.07).mul(maskDraw(pS, sc.h))).mul(on(pS)), mix(B, W, 0.5));
  const pC = io(0, 0.07, 0.975, 0.998), dC = vec2(ax.sub(1.7), p.y.add(3.5)).length().min(vec2(p.x, p.y.add(3)).length());
  const rad = pC.mul(2).sub(mix(side, inv(side), ord).mul(0.9)).clamp(0, 1).mul(0.55);
  lay(st(dC.sub(rad), 0).mul(on(rad)), mix(H2, W, st(dC, 0.2)).mul(c.kick.mul(0.5).add(1)));
  return cutout(col, cover);
}
