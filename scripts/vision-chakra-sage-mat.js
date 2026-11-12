// THE CHAKRA SAGE: a seated lotus-pose figure of contour stripes, seven chakra lotuses igniting root to crown up a bead channel,
// a thousand-petal crown, two profile faces late. Layers (params.layer): world z-30 contour waves (scroll) / ring z-12 mandorla of
// bead rows (rows counter-run) / being z0 (breathes) / veil z+10 black mudra hands (drift) / fore z+22 black orbs (float).
// Masks: pen-drawn contours, lotus irises, the mandorla's iris, the mudra's ring. Roll channels 1000..1019.
import { MeshBasicNodeMaterial, AdditiveBlending, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep as ss, step, mix, atan2 as atan2raw, fwidth } from "builtin/tsl";
import { tripClock, visionShown, visionU, climb, maskDraw, maskBeads, maskIris, inv, is, sgn, smin, capsule, rbox, strokeAA, ioU, NEON } from "./lib/trip.js";

const TAU = 6.28318, PI = 3.14159, SP = 0.85;
const CY = [-10.6, -7.2, -3.8, -0.3, 6.9, 12.1, 15.5];             // the seven chakras up the spine (being metres)
const atan2 = (y, x) => atan2raw(y, x.add(1e-5));                   // never ask atan2 at (0, 0)
const nib = (p, u, w) => inv(ss(0, w, float(u).sub(p).abs()));

export function material(ctx) {
  const layer = ctx.params.layer ?? "being";
  const c = tripClock(ctx), u = visionU(ctx, c), live = visionShown(ctx, c, 0), io = ioU(u);
  const low = ctx.quality === "low";
  const rn = (n) => c.rnd(1000 + n), pk = (n, k) => c.pick(1000 + n, k), sense = (n) => sgn(rn(n));
  const fam = pk(0, 3), hot = pk(1, 4), W = NEON.W, ice = vec3(0.25, 0.5, 1.0);
  const A = mix(NEON.BLU, NEON.VIO, is(fam, 1)), B = NEON.VIO.mul(is(fam, 0)).add(NEON.BLU.mul(is(fam, 1))).add(ice.mul(is(fam, 2)));
  const HOT = [NEON.PNK, NEON.ORA, NEON.YEL, NEON.GRN];
  const hotC = (k) => HOT.reduce((acc, v, i) => acc.add(v.mul(is(k, i))), vec3(0));
  const H = hotC(hot), H2 = hotC(hot.add(pk(16, 3)).add(1).mod(4));
  const P = positionGeometry.xy, t = c.real;
  const kickOn = step(0.001, c.kick);
  const cul = ss(0.7, 0.8, u).mul(inv(ss(0.86, 0.92, u))).mul(climb(c).mul(0.4).add(0.6));
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  const cutout = (col, cover) => { m.colorNode = col; m.opacityNode = cover.mul(live).clamp(0, 1); m.alphaTest = 0.5; return m; };

  // ------------------------------------------------------------------ WORLD: contour-line waves (scrolls), each line pen-drawn
  if (layer === "world") {
    const sp = rn(11).mul(3).add(5.5), S = t.mul(1.4).mul(sense(3));
    const w1 = P.x.mul(0.035).add(t.mul(0.21)).add(P.y.mul(0.04).sub(t.mul(0.13)).sin().mul(1.4)).sin().mul(9);
    const w2 = P.x.mul(0.083).sub(P.y.mul(0.05)).add(t.mul(0.33).mul(sense(6))).sin().mul(4.5);
    const h = P.y.add(w1).add(w2).add(S), g = h.div(sp), li = g.floor(), f = g.fract();
    const fw = fwidth(h).div(sp).mul(1.2).clamp(0.002, 0.5);
    const sw = P.x.mul(0.021).add(P.y.mul(0.03)).sub(t.mul(0.17)).sin().mul(0.5).add(0.5);
    const wd = sw.mul(sw).mul(0.34).add(0.13);                       // op-art swell: the lines fatten into stripes and thin again
    const band = ss(float(0), fw, f).mul(inv(ss(wd, wd.add(fw), f)));
    const uEnd = inv(float(0.4).div(ctx.param("vw1", -1).sub(ctx.param("vw0", -1)).max(1))).min(0.999);
    const grow = ss(0.2, 0.45, u).mul(inv(ss(uEnd, float(1.0005), u)));
    // the pen: lines nearest the seat first, alternate lines drawn from opposite sides
    const o = li.mul(sp).sub(S).abs().div(100).min(1), xn0 = P.x.div(320).add(0.5), odd = li.add(64).mod(2);
    const pl = grow.mul(2.6).sub(o.mul(1.6)).clamp(0, 1), xn = mix(xn0, inv(xn0), odd);
    const shown = maskDraw(pl, xn).mul(step(0.001, pl));
    const r = P.length(), front = c.beat.fract().mul(130);
    const kl = inv(ss(0, 6, r.sub(front).abs())).mul(kickOn).mul(inv(ss(60, 130, front)));
    const hole = mix(float(0.12), float(1), ss(0.85, 1.3, vec2(P.x.div(27), P.y.div(39)).length()));
    const lk = li.add(63).mod(3);
    const base = A.mul(is(lk, 0)).add(B.mul(is(lk, 1))).add(mix(A, W, 0.4).mul(is(lk, 2)));
    const tip = nib(pl, xn, 0.012).mul(step(pl, 0.99));
    const col = mix(base, W, sw.mul(0.35)).mul(band).mul(float(0.42).add(kl.mul(0.8)).add(cul.mul(0.15))).mul(hole).add(W.mul(tip).mul(band));
    return cutout(col, shown);
  }

  // ------------------------------------------------------------------ RING: the mandorla, rows of beads running opposite ways
  if (layer === "ring") {
    const p = P.mul(74 / 86), aa = fwidth(p.x).mul(1.2).max(0.01), sk = strokeAA(aa);
    const R = 26.7, CX = 11.7, G = 2.3, ax = p.x.abs(), sx = step(0, p.x).mul(2).sub(1);
    const dm = vec2(ax.add(CX), p.y).length().sub(R), th = atan2(p.y, ax.add(CX));
    const nR = pk(5, 3).add(3), g = dm.negate().div(G).add(1.2), k = g.floor(), fr = g.fract().sub(0.5).mul(G);
    const rowR = float(R).sub(k.sub(0.7).mul(G)), run = t.mul(1.1).mul(k.mod(2).mul(2).sub(1)).mul(sense(4));
    const tt = th.mul(rowR).mul(sx).add(run).div(G), kb = tt.floor();
    const bd = vec2(tt.fract().sub(0.5).mul(G), fr).length();
    const pR = io(0.3, 0.46, 0.88, 0.93);
    // the iris: inner row first, each row opening from the waist to the tips
    const thc = kb.add(0.5).mul(G).sub(run).div(rowR).abs().div(1.2);
    const ord = nR.sub(1).sub(k).add(thc).div(nR);
    const open = maskBeads(pR.mul(1.05), ord).mul(step(-0.5, k)).mul(step(k, nR.sub(0.5))).mul(step(0.001, pR));
    const swap = mix(float(1), is(k.mod(2), c.beat.floor().mod(2)).mul(1.1).add(0.3), kickOn);   // kick: the rows trade light
    const k3 = k.mod(3), rc = A.mul(is(k3, 0)).add(B.mul(is(k3, 1))).add(H.mul(is(k3, 2)));
    const bead = sk(bd.sub(0.72).abs(), 0.13).mul(open), eye = sk(bd, 0.3).mul(open);
    const rim = sk(dm.sub(3.5).abs(), 0.1).mul(maskDraw(pR, th.abs().div(1.13))).mul(step(0.001, pR));
    const lit = float(0.6).add(cul.mul(0.6));
    m.colorNode = rc.mul(bead).mul(swap).add(mix(H2, W, 0.2).mul(eye).mul(swap)).add(mix(B, W, 0.4).mul(rim).mul(0.7)).mul(lit);
    m.opacityNode = live;
    m.transparent = true; m.blending = AdditiveBlending; m.depthWrite = false;
    return m;
  }

  // ------------------------------------------------------------------ VEIL: black mudra hands drifting across (occlude)
  if (layer === "veil") {
    const aa = fwidth(P.x).mul(1.2).max(0.01), ax = P.x.abs(), pin = io(0.6, 0.74, 0.84, 0.88);
    const nH = pk(12, 2).add(1), hollow = kickOn.mul(step(0.5, c.beat.div(4).fract()));
    let col = vec3(0), cover = float(0);
    for (let j = 0; j < (low ? 1 : 2); j++) {
      const sz = 1.05 + j * 0.3, dir = sense(7).mul(j ? -1 : 1);
      const yj = t.mul(0.014 * (1 + j * 0.4)).mul(dir).add(rn(14).add(j * 0.45)).fract().mul(72).sub(36);
      const xj = t.mul(0.11).add(j * 2).sin().mul(6).add(15 + j * 11);
      const an = t.mul(0.2).add(j).sin().mul(0.15).add(j ? 0.5 : -0.3), cs = an.cos(), sn = an.sin();
      const q0 = vec2(ax.sub(xj), P.y.sub(yj)).div(sz), q = vec2(q0.x.mul(cs).sub(q0.y.mul(sn)), q0.x.mul(sn).add(q0.y.mul(cs)));
      const O = vec2(2.1, 2.0);                                      // gyan mudra: thumb and forefinger close a ring, three fingers up
      let d = rbox(q, [0, 0], 1.7, 1.9, 0.8);
      d = smin(d, capsule(q, [0.2, 1.5], [0.5, 5.3], 0.52), 0.3);
      d = smin(d, capsule(q, [-0.9, 1.5], [-1.5, 5.0], 0.5), 0.3);
      d = smin(d, capsule(q, [-1.7, 1.0], [-3.0, 3.8], 0.44), 0.3);
      d = smin(d, q.sub(O).length().sub(1.0).abs().sub(0.42), 0.3);
      d = smin(d, capsule(q, [0, -1.5], [0.3, -7], 1.25), 0.5);
      const sk = strokeAA(aa.div(sz));
      const pj = pin.mul(1.5).sub(j * 0.5).clamp(0, 1);
      const there = maskIris(pj, q.sub(O).length().div(10)).mul(step(0.001, pj)).mul(step(float(j), nH.sub(0.5)));
      const inside = sk(d, 0).mul(there), rim = sk(d.abs(), 0.08), pe = q.length();
      const palm = sk(pe.sub(0.85).abs(), 0.09).add(sk(pe, 0.3));
      const lit = mix(B, W, 0.4).mul(rim).add((j ? H2 : H).mul(palm)).mul(float(0.85).add(cul.mul(0.3)));
      col = mix(col, NEON.BG.add(lit), inside);
      cover = cover.max(inside.mul(j ? inv(hollow).max(rim).max(palm.min(1)) : float(1)));   // kick: the second hand goes hollow
    }
    return cutout(col, cover);
  }

  // ------------------------------------------------------------------ FORE: slow black orbs with a lit rim (float sideways)
  if (layer === "fore") {
    const aa = fwidth(P.x).mul(1.2).max(0.01), pin = io(0.68, 0.8, 0.8, 0.84), nO = pk(13, 3).add(3);
    let col = vec3(0), cover = float(0);
    for (let j = 0; j < (low ? 3 : 5); j++) {
      const rad = 1.5 + (j % 3) * 0.8, dir = sense(9).mul(j % 2 ? -1 : 1);
      const xj = t.mul(0.011 * (1 + j * 0.3)).mul(dir).add(rn(15).add(j * 0.23)).fract().mul(120).sub(60);
      const yj = t.mul(0.17).add(j * 2.1).sin().mul(5).add((j * 2 % 5 - 2) * 6.5);
      const q = vec2(P.x.sub(xj), P.y.sub(yj)).div(rad), r = q.length(), aL = aa.div(rad);
      const pj = pin.mul(1.8).sub(j * 0.2).clamp(0, 1);
      const disc = inv(ss(inv(aL), float(1), r)).mul(maskIris(pj, r)).mul(step(0.001, pj)).mul(step(float(j), nO.sub(0.5)));
      const ring = ss(0.84, 0.9, r).add(strokeAA(aL)(r.sub(0.55).abs(), 0.04).mul(0.6));
      const glint = inv(ss(0.16, 0.22, q.sub(vec2(-0.35, 0.4)).length()));
      col = mix(col, mix([H, H2, B][j % 3], W, 0.25).mul(ring).add(W.mul(glint)).mul(float(0.8).add(cul.mul(0.3))), disc);
      cover = cover.max(disc);
    }
    return cutout(col, cover);
  }

  // ------------------------------------------------------------------ THE BEING: the sage (breathes)
  const p = P.div(t.mul(TAU / 7).sin().mul(0.02).add(1));
  const aa = fwidth(p.x).mul(1.2).max(0.008), sk = strokeAA(aa);
  const ax = p.x.abs(), q = vec2(ax, p.y), alt = pk(3, 2);
  let col = vec3(0), cover = float(0);
  const lay = (body, lit) => { col = mix(col, lit, body); cover = cover.max(body); };
  // contour stripes inside an sdf, each line traced by a pen (turn0 0..1 along it), outer line first; black fills behind the pen
  const contour = (dd, turn0, pr) => {
    const g = dd.negate().div(SP), k = g.floor(), dl = g.fract().sub(0.3).abs().mul(SP);
    const turn = mix(turn0, inv(turn0), k.mod(2).mul(alt));
    const pp = pr.mul(4.5).sub(k.mul(0.5)).clamp(0, 1);
    const wave = k.mul(1.1).sub(t.mul(1.6).mul(sense(8))).sin().mul(0.5).add(0.5);   // the light travels through the lines
    const base = mix(mix(A, B, is(k.mod(3), 1)), H, wave.pow(4).mul(0.7));
    const lit = mix(base, W, sk(dl, 0.06)).mul(sk(dl, 0.2)).mul(wave.mul(0.5).add(0.6)).add(W.mul(nib(pp, turn, 0.03)).mul(step(pp, 0.99)).mul(sk(dl, 0.3)));
    lay(maskDraw(pp, turn).mul(step(0.001, pp)).mul(sk(dd, 0)), lit);
  };
  let d = q.sub(vec2(0, 11.6)).length().sub(3.5);                    // head
  d = smin(d, capsule(q, [0, 7], [0, 9], 1.5), 0.8);                 // neck
  d = smin(d, capsule(q, [0, -7], [0, 2.5], 4.6), 1.2);              // trunk
  d = smin(d, capsule(q, [0, 4.6], [6.2, 4.4], 2.1), 1.2);           // shoulders
  d = smin(d, capsule(q, [7.6, 3.8], [10, -3.5], 1.7), 1);           // upper arm
  d = smin(d, capsule(q, [10, -3.5], [12.5, -9.2], 1.5), 1);         // forearm, hand on the knee
  d = smin(d, capsule(q, [2, -10.5], [13, -11.5], 3.1), 1.2);        // thigh and knee
  d = smin(d, capsule(q, [12, -13.2], [0, -13.6], 2.3), 1.2);        // the crossed shin
  contour(d, atan2(ax, p.y.add(1).negate()).div(PI), io(0, 0.42, 0.93, 0.995));

  // the channel: beads climbing the spine (and the two currents crossing it), root to crown
  const pS = io(0.14, 0.42, 0.91, 0.96), up = p.y.sub(CY[0]).div(CY[6] - CY[0]);
  const climbd = maskDraw(pS, up).mul(step(0.001, pS)).mul(step(0, up)).mul(step(up, 1));
  const beatY = c.beat.div(2).fract().mul(28).add(CY[0]);
  const kl = inv(ss(0, 1.6, p.y.sub(beatY).abs())).mul(kickOn);     // kick: a charge runs up the spine
  const bd = vec2(p.x, p.y.div(0.8).fract().sub(0.5).mul(0.8)).length();
  let chan = mix(B, W, 0.6).mul(float(0.7).add(kl)).mul(sk(bd, 0.2));
  if (!low) {
    const ph = p.y.sub(CY[0]).mul(PI / 3.45), sy = ph.sin().mul(1.05), co = ph.cos();
    chan = chan.add(H2.mul(0.8).mul(sk(ax.sub(sy.abs()).abs().div(co.mul(co).add(1).sqrt()), 0.07)).mul(step(p.y, CY[4])));
  }
  lay(sk(ax, 1.45).mul(climbd), chan);

  // seven chakras: one lotus expression, folded to the nearest centre; petals 4,6,8.. ; neighbours counter-turn
  let idx = float(0), cy = float(CY[0]);
  for (let i = 0; i < 6; i++) { const s = step((CY[i] + CY[i + 1]) / 2, p.y); idx = idx.add(s); cy = cy.add(s.mul(CY[i + 1] - CY[i])); }
  const qc = vec2(p.x, p.y.sub(cy)), r = qc.length(), pC = io(0.16, 0.44, 0.9, 0.95);
  const pi = pC.mul(7).sub(idx).clamp(0, 1), par = idx.mod(2), n = idx.mul(2).add(4);
  const a = atan2(qc.x, qc.y).add(t.mul(0.3).mul(par.mul(2).sub(1)).mul(sense(10))).add(inv(pi).mul(2));
  const rp = a.mul(n).mul(0.5).cos().abs().mul(0.38).add(0.62).mul(1.35);
  const ci = idx.add(pk(2, 7)).mod(7);
  const CC = [NEON.PNK, NEON.ORA, NEON.YEL, NEON.GRN, ice, NEON.VIO, W].reduce((acc, v, i) => acc.add(v.mul(is(ci, i))), vec3(0));
  const rk = r.div(rp.add(0.25));
  const core = mix(sk(r, 0.38), sk(r.sub(0.55).abs(), 0.08).add(sk(r, 0.18)), par);
  const lotus = mix(CC, W, 0.15).mul(sk(r.sub(rp).abs(), 0.09).add(core)).mul(float(0.85).add(kl.mul(0.9))).add(W.mul(nib(pi, rk, 0.12)).mul(step(pi, 0.99)));
  lay(sk(r.sub(rp).sub(0.22), 0).mul(maskIris(pi, rk)).mul(step(0.001, pi)), lotus);

  // the thousand-petal crown: ring on ring of petals opening behind the head, rings counter-turning
  const pK = io(0.6, 0.74, 0.86, 0.9), qk = vec2(p.x, p.y.sub(CY[6])), rr = qk.length();
  const RK = climb(c).mul(1.6).add(6.6), kr = rr.div(1.3).floor(), nk = kr.mul(6).add(8);
  const spin = kr.mod(2).mul(2).sub(1).mul(t.mul(0.15).add(inv(pK).mul(1.5)));
  const s = atan2(qk.x, qk.y).add(spin).mul(nk).div(TAU).fract().mul(2).sub(1);
  const dp = rr.div(1.3).fract().sub(inv(s.mul(s)).mul(0.75).add(0.15)).abs().mul(1.3);
  const slope = low ? float(1) : s.mul(3.9).mul(nk).div(rr.max(0.5).mul(TAU));
  const pet = sk(dp.div(slope.mul(slope).add(1).sqrt()), 0.07).mul(step(1.75, rr)).mul(maskIris(pK, rr.div(RK))).mul(step(0.001, pK)).mul(step(0.4, d));
  const k3 = kr.mod(3);
  lay(pet, mix(H, W, 0.3).mul(is(k3, 1)).add(B.mul(is(k3, 2))).add(mix(H2, W, 0.2).mul(is(k3, 0))).mul(float(0.7).add(cul.mul(0.5))));

  // two profile faces turned to the sage, mirrored, pen-drawn late
  const f = vec2(ax.sub(25.5), p.y.sub(3)).div(1.15);
  let fd = f.sub(vec2(1, 1.5)).length().sub(4.6);                    // skull
  fd = smin(fd, capsule(f, [-3.2, 0.6], [-5.2, -1.0], 0.55), 0.9);   // nose
  fd = smin(fd, f.sub(vec2(-3.9, -2.7)).length().sub(0.75), 0.5);    // lips
  fd = smin(fd, capsule(f, [-2.9, -4.3], [1.5, -2.5], 1.5), 0.9);    // chin and jaw
  fd = smin(fd, capsule(f, [1.6, -3], [2.4, -9], 2.0), 1.0);         // neck
  contour(fd.mul(1.15), atan2(f.x, f.y).div(TAU).add(0.5), io(0.63, 0.8, 0.82, 0.87));
  return cutout(col, cover);
}
