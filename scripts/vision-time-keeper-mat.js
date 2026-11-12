// THE TIME KEEPER: a line-art hourglass, a serene face in each bulb (the lower inverted), bead sand falling grain by grain, meshed cogs, a pendulum.
// Layers: world z-30 growth rings + dotted spiral arms / ring z-12 twelve beads + two counter-turning hands / being z0 / veil z+10 black cogs
// rolling in / fore z+22 numeral cartouches + cogs. One grain alone u0-.1, glass .1-.22, sand .14-.8 (climb), cogs .24-.6, ring .3-.44,
// faces .36-.56, world .42-.58, veil .56-.7, pendulum .62-.7, fore .66-.78; LIFO exit .8-1, world last. Kick: sand swaps colour, a cog steps a tooth.
import { MeshBasicNodeMaterial, AdditiveBlending, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep as ss, step, mix, atan2 as atan2raw, fwidth } from "builtin/tsl";
import { tripClock, visionShown, visionU, climb, maskDraw, maskBeads, maskIris, maskClock, nib, inv, is, sgn, smin, segH, capsule, strokeAA, ioU, NEON } from "./lib/trip.js";

const TAU = 6.28318, PI = 3.14159;
const atan2 = (y, x) => atan2raw(y, x.add(1e-5));
const hash = (k, o = 0) => k.mul(12.9898 + o).add(o * 3.1).sin().mul(43758.5453).fract();
// a meshed cog chain (right half; the left is its mirror): two seeded layouts, pitch radius R, N = 2R teeth
const chain = (x0, y0, Rs, angs) => {
  const g = [{ x: x0, y: y0, R: Rs[0], N: Rs[0] * 2, k: 1, c: 0 }];
  for (let i = 1; i < Rs.length; i++) {
    const p = g[i - 1], f = (angs[i - 1] * PI) / 180, R = Rs[i], N = R * 2, d = p.R + R;
    // contact at angle f from p: p's tooth there, my gap at f+PI; theta_i = -theta_p*Np/N + c
    const c = ((f + PI) * N + f * p.N - PI) / N;
    g.push({ x: p.x + Math.cos(f) * d, y: p.y + Math.sin(f) * d, R, N, k: -p.k * p.N / N, c: -p.c * p.N / N + c, f: f + PI });
  }
  g[0].f = (angs[0] * PI) / 180;
  return g;
};
const LAY = [chain(17.5, 13, [6, 4, 5, 3], [-70, -110, -20]), chain(15, 19, [4, 6, 3, 5], [-30, -100, -120])];
// a cog's signed distance: pitch circle R with N trapezoid teeth, turned by th
const cog = (q, ctr, R, N, th) => {
  const d = q.sub(ctr), r = d.length(), a = atan2(d.y, d.x).sub(th);
  const tooth = ss(-0.3, 0.3, a.mul(N).cos());
  return { d: r.sub(R.sub(0.55).add(tooth.mul(1.1))), r, dq: d };
};

export function material(ctx) {
  const layer = ctx.params.layer ?? "being", low = ctx.quality === "low";
  const c = tripClock(ctx), u = visionU(ctx, c), live = visionShown(ctx, c, 0), io = ioU(u);
  const rn = (n) => c.rnd(1280 + n), pk = (n, k) => c.pick(1280 + n, k), sense = (n) => sgn(rn(n));
  const { BLU, VIO, PNK, ORA, YEL, GRN, W, BG } = NEON;
  const fam = pk(0, 4), hot = pk(1, 4);
  const A = BLU.mul(is(fam, 0)).add(VIO.mul(is(fam, 1))).add(vec3(0.01, 0.5, 0.6).mul(is(fam, 2))).add(vec3(0.02, 0.9, 0.35).mul(is(fam, 3)));
  const B = VIO.mul(is(fam, 0)).add(BLU.mul(is(fam, 1).add(is(fam, 2)))).add(vec3(0.01, 0.4, 1).mul(is(fam, 3)));
  const hotC = (k) => [PNK, ORA, YEL, GRN].reduce((a, v, i) => a.add(v.mul(is(k, i))), vec3(0));
  const H = hotC(hot), H2 = hotC(hot.add(pk(2, 3)).add(1).mod(4));
  const P = positionGeometry.xy, T = c.real;
  const kOn = step(0.001, c.kick), cl = climb(c);
  const cul = io(0.7, 0.8, 0.86, 0.92).mul(cl.mul(0.4).add(0.6));
  const on = (p) => step(0.004, p);
  const tick = c.beat.floor().mod(2).mul(kOn);                       // flips on each kick, holds without one
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  const cutout = (col, cover) => { m.colorNode = col; m.opacityNode = cover.mul(live).clamp(0, 1); m.alphaTest = 0.5; return m; };
  const lay0 = () => { let col = vec3(0), cover = float(0); return { lay: (b, lit) => { col = mix(col, lit, b); cover = cover.max(b); }, out: () => cutout(col, cover) }; };

  // WORLD: growth rings expanding, dotted spiral arms
  if (layer === "world") {
    const aa = fwidth(P.x).mul(1.2).max(0.02), st = strokeAA(aa);
    const r = P.length(), a = atan2(P.y, P.x);
    const pW = io(0.42, 0.58, 0.94, 0.995).add(cl.mul(0.06).mul(on(u.sub(0.42)))).min(1);
    const { lay, out } = lay0();
    // tree rings: each ring wobbles on its own, the whole field breathing outward
    const sp = 5.5, rr = r.sub(T.mul(0.35));
    const k = rr.div(sp).floor();
    const wob = a.mul(3).add(hash(k, 2).mul(TAU)).sin().mul(0.7).add(a.mul(5).sub(hash(k, 5).mul(TAU)).sin().mul(0.35));
    const rf = rr.add(wob).div(sp).fract().sub(0.5).abs().mul(sp);
    const ring = st(rf.sub(0.22), 0).mul(maskIris(pW, r.div(150))).mul(on(pW));
    const kk = rr.add(wob).div(sp).floor();
    const rc = mix(A, B, step(0.5, hash(kk, 7))).mul(0.55).add(H2.mul(0.5).mul(step(0.85, hash(kk, 3))));
    lay(ring, rc.mul(cul.mul(0.4).add(0.45)));
    // dotted spiral arms, turning against the ring's breath
    const arms = pk(3, 3).add(3), lr = r.max(1).log();
    const sA = a.mul(arms).div(TAU).sub(lr.mul(1.3).mul(sense(4))).add(T.mul(0.012).mul(sense(5)));
    const along = lr.mul(9), cell = along.floor();
    const dd = vec2(sA.fract().sub(0.5).mul(r.mul(TAU).div(arms).div(r.mul(0.11).max(0.5))), along.fract().sub(0.5)).length();
    const pArm = pW.mul(1.5).sub(0.5).clamp(0, 1);
    const dot = st(dd, 0.32).mul(maskBeads(pArm, r.div(150))).mul(on(pArm)).mul(step(6, r));
    const front = c.beat.fract().mul(140);
    const kl = inv(ss(0, 8, r.sub(front).abs())).mul(kOn);
    lay(dot, mix(H, W, step(0.8, hash(cell, 1)).mul(0.5)).mul(cul.mul(0.4).add(0.55).add(kl)));
    return out();
  }

  // RING: twelve beads, two hands turning against each other
  if (layer === "ring") {
    const aa = fwidth(P.x).mul(1.2).max(0.01), st = strokeAA(aa);
    const r = P.length(), a0 = atan2(P.x, P.y), sn = sense(6);
    const pB = io(0.3, 0.44, 0.88, 0.92), pR = io(0.32, 0.4, 0.9, 0.93), pH = io(0.4, 0.48, 0.86, 0.9);
    const Rb = 25.5, aB = a0.sub(T.mul(TAU / 120).mul(sn));
    const kb = aB.div(TAU).mul(12).add(0.5).floor(), ac = aB.sub(kb.mul(TAU).div(12));
    const bd = vec2(ac.mul(r), r.sub(Rb)).length();
    const first = pk(7, 12), rank = kb.add(12).sub(first).mod(12).div(12);  // beads light in order from a seeded hour
    const bead = st(bd, 1.1).mul(maskBeads(pB, rank)).mul(on(pB));
    const halo = st(bd.sub(1.7).abs(), 0.1).mul(maskBeads(pB, rank)).mul(on(pB));
    const now = is(kb.add(12).mod(12), c.beat.floor().mod(12)).mul(kOn);
    const rim = st(r.sub(28.5).abs(), 0.12).mul(maskClock(pR, a0.mul(sn))).add(st(r.sub(22.5).abs(), 0.08).mul(maskClock(pR, a0.mul(sn.negate()))));
    const tk = vec2(a0.sub(T.mul(TAU / 70).mul(sn)).div(TAU).mul(60).fract().sub(0.5).mul(r.mul(TAU).div(60)), r.sub(30.8)).length();
    const ticks = st(tk, 0.3).mul(maskClock(pR, a0.mul(sn)));
    const hand = (rate, len, w, sd) => {
      const t = T.mul(rate).mul(sd).add(rn(8 + rate).mul(TAU)), dir = vec2(t.sin(), t.cos());
      const s = segH(P, vec2(0, 0), dir.mul(len));
      return st(s.d, w).mul(maskDraw(pH, s.h)).mul(on(pH)).add(nib(pH, s.h, 0.04).mul(st(s.d, w.mul(3))).mul(step(pH, 0.99)));
    };
    const hands = hand(0.05, 26, float(0.35), sn).add(hand(0.11, 20, float(0.55), sn.negate()));
    const lit = cul.mul(0.6).add(0.55);
    m.colorNode = mix(B, W, 0.25).mul(rim).add(A.mul(ticks).mul(0.7)).add(mix(H, W, now).mul(bead).mul(lit.add(now))).add(H2.mul(halo))
      .add(mix(A, W, 0.4).mul(hands.min(1)).mul(lit));
    m.opacityNode = live;
    m.transparent = true; m.blending = AdditiveBlending; m.depthWrite = false;
    return m;
  }

  // VEIL: black cogs roll in from the edges, teeth occluding
  if (layer === "veil") {
    const aa = fwidth(P.x).mul(1.2).max(0.01), st = strokeAA(aa);
    const { lay, out } = lay0();
    [[1, 13, 16, 0.56, 0.84], [-1, -12, 14, 0.6, 0.83], [1, -19, 10, 0.64, 0.82], [-1, 20, 9, 0.67, 0.81]].slice(0, low ? 2 : 4).forEach(([sd, y, R, a, x], j) => {
      const sdj = sense(10 + j).mul(sd);                               // which edge it rolls from: seeded
      const p = io(a, a + 0.08, x, x + 0.04);
      const sway = T.mul(0.09 + j * 0.03).add(j * 2).sin().mul(3);
      const cx = sdj.mul(float(36 - R * 0.3).add(inv(p).mul(R * 2 + 30)).add(sway));
      const th = cx.div(R).negate().add(T.mul(0.04).mul(sdj));          // rolls: the turn follows the travel
      const g = cog(P, vec2(cx, y), float(R), float(Math.round(R * 1.4)), th);
      const hole = g.r.sub(R * 0.42);
      const win = vec2(atan2(g.dq.y, g.dq.x).sub(th).div(TAU).mul(5).fract().sub(0.5).mul(g.r.mul(TAU).div(5)), g.r.sub(R * 0.68)).length().sub(R * 0.16);
      const d = g.d.max(hole.negate()).max(win.negate());
      const body = st(d, 0).mul(on(p));
      const rimC = (j % 2 ? H : H2).mul(st(g.d.abs(), 0.12).add(st(hole.abs(), 0.1)).min(1)).mul(0.7).add(B.mul(st(win.abs(), 0.08)).mul(0.6));
      lay(body, BG.add(rimC));
    });
    return out();
  }

  // FORE: numeral cartouches and small cogs drifting up
  if (layer === "fore") {
    const aa = fwidth(P.x).mul(1.2).max(0.01), st = strokeAA(aa);
    const pin = io(0.66, 0.78, 0.8, 0.84);
    const { lay, out } = lay0();
    for (let j = 0; j < (low ? 4 : 7); j++) {
      const vy = 0.5 + (j % 3) * 0.25, x0 = ((j * 31.7 + 9) % 54) - 27;
      const y = T.mul(vy).add(rn(20 + j).mul(85)).add(42).mod(85).sub(42);
      const ctr = vec2(T.mul(0.13 + j * 0.02).add(j).sin().mul(2.5).add(x0), y);
      const pj = pin.mul(2).sub(j * 0.13).clamp(0, 1);
      const q0 = P.sub(ctr), ro = T.mul(0.2).add(j * 1.7).sin().mul(0.4), cs = ro.cos(), sn = ro.sin();
      const q = vec2(q0.x.mul(cs).sub(q0.y.mul(sn)), q0.x.mul(sn).add(q0.y.mul(cs)));
      const ang = atan2(q.y, q.x).div(TAU).add(0.5);
      if (j % 3 === 2) {                                            // a small cog, swept in by its own clock
        const g = cog(q, vec2(0, 0), float(1.8), float(8), T.mul(0.6).mul(sense(30 + j)));
        const inside = st(g.d, 0).mul(maskClock(pj, atan2(q.y, q.x))).mul(on(pj));
        lay(inside, BG.add(mix(H2, W, 0.2).mul(st(g.d.abs(), 0.08).add(st(g.r.sub(0.6).abs(), 0.07)).min(1))));
        continue;
      }
      // a pill cartouche: its outline drawn by a nib round the rim, a numeral of beads and bars inside
      const L = 1.6 + (j % 2) * 0.8, d = capsule(q, [-L, 0], [L, 0], 1.25);
      const inside = st(d, 0).mul(maskDraw(pj, ang)).mul(on(pj));
      const nn = (j % 4) + 1, sx = q.x.add(nn * 0.5).fract().sub(0.5), kx = q.x.add(nn * 0.5).floor();
      const glyph = st(vec2(sx, q.y).length(), 0.28).mul(step(kx.abs().add(0.5), nn * 0.5 + 0.6)).mul(step(q.x.abs(), nn * 0.5));
      const rim = st(d.abs(), 0.1);
      lay(inside, BG.add(mix([H, B, H2][j % 3], W, 0.15).mul(rim.add(glyph).min(1)).mul(cul.mul(0.3).add(0.8))));
    }
    return out();
  }

  // THE BEING (breathes)
  const p = P.div(T.mul(TAU / 10).sin().mul(0.012).add(1));
  const aa = fwidth(p.x).mul(1.2).max(0.008), st = strokeAA(aa);
  const ax = p.x.abs(), q = vec2(ax, p.y);
  const { lay, out } = lay0();
  const lit = cul.mul(0.5).add(0.8);
  const up = step(5, p.y);                                          // which bulb

  // the glass: two bulbs tapering to the neck, drawn out from the neck by a nib, then the caps
  const ell = (cy) => vec2(q.x.div(8.5), p.y.sub(cy).div(9)).length().sub(1).mul(8.5);
  const dU = smin(ell(14), capsule(q, [0, 12], [0, 5], 0.6), 2.2), dL = smin(ell(-4), capsule(q, [0, -2], [0, 5], 0.6), 2.2);
  const dG = dU.min(dL);
  const sG = mix(atan2(ax, p.y.add(4)), atan2(ax, p.y.sub(14).negate()), up).div(PI);
  const pG = io(0.1, 0.22, 0.93, 0.98);
  const glass = st(dG.abs(), 0.16).mul(maskDraw(pG, sG.mul(0.999))).mul(on(pG));
  const cap = (cy) => capsule(q, [0, cy], [10.5, cy], 0.55);
  const pC = io(0.2, 0.25, 0.92, 0.95);
  const caps = st(cap(23.4).min(cap(-13.4)).abs(), 0.12).mul(maskDraw(pC, ax.div(11))).mul(on(pC));

  // the faces: one in the upper bulb, its inverted twin in the lower, line by line; the sand later buries/uncovers them
  const fy = mix(float(10).sub(p.y), p.y, up), f = vec2(ax, fy);
  const pF = io(0.36, 0.56, 0.86, 0.9).mul(6);
  const fl = (k, d, s) => st(d, 0.11).mul(maskDraw(pF.sub(k).clamp(0, 1), s)).mul(on(pF.sub(k)));
  const arc = (cx, cy, r, sg) => { const v = f.sub(vec2(cx, cy)); return { d: v.length().sub(r).abs().max(v.y.mul(sg).negate()), s: atan2(v.x.mul(sg), v.y.mul(sg).abs().add(0.01)).div(PI).add(0.5) }; };
  const crown = arc(0, 14, 6.4, 1), brow = arc(2.7, 15.6, 2.0, 1), lid = arc(2.7, 15.3, 1.5, -1), lips = arc(0, 11.8, 1.6, -1);
  const nose = segH(f, vec2(0, 15.4), vec2(0.7, 12.9)), dot3 = f.sub(vec2(0, 18.2)).length();
  const face = fl(0, crown.d, crown.s).add(fl(1, brow.d, brow.s)).add(fl(2, lid.d, lid.s)).add(fl(3, nose.d, nose.h))
    .add(fl(4, lips.d, lips.s)).add(st(dot3, 0.55).mul(maskIris(pF.sub(5).clamp(0, 1), dot3.div(0.55))).mul(on(pF.sub(5)))).min(1);
  lay(face, mix(mix(B, W, 0.55), H2, inv(up).mul(0.6)).mul(lit));

  // the sand: beads on a hex lattice, each in or out by its own centre: the lower cone rises grain by grain, the upper bed sinks
  const S = ss(0.14, 0.8, u).mul(cl.mul(0.25).add(0.75)).add(ss(0.6, 0.8, u).mul(0.25)).min(1).mul(inv(ss(0.9, 0.96, u)));
  const row = p.y.div(1.05).floor(), bx = p.x.div(1.1).add(row.mul(0.5)), cx = bx.floor().add(0.5).sub(row.mul(0.5)).mul(1.1), cy = row.add(0.5).mul(1.05);
  const bq = vec2(p.x.sub(cx), p.y.sub(cy)).length(), cax = cx.abs();
  const inL = step(vec2(cax.div(7.6), cy.add(4).div(8.2)).length(), 1).mul(step(cy, 4.2));
  const inU = step(vec2(cax.div(7.6), cy.sub(14).div(8.2)).length(), 1).mul(step(6, cy));
  const cone = step(cy, S.mul(10.5).sub(12.5).sub(cax.mul(0.85)).add(0.2));
  const bed = step(cy, inv(S).mul(14).add(6.2).sub(inv(cax.div(7.6).clamp(0, 1)).mul(1.8).mul(S.mul(4).min(1))));
  const sandIn = inL.mul(cone).add(inU.mul(bed).mul(step(0.002, S))).min(1).mul(on(S)).mul(step(0.12, u));
  const hollow = c.bar.floor().mod(2).mul(kOn);                      // bead hollow/filled swap on the bar, only under a kick
  const bead = st(bq, 0.42).mul(inv(hollow.mul(st(bq, 0.2))));
  const sandC = mix(H, H2, tick).mul(lit).add(W.mul(st(bq, 0.14)).mul(0.5));
  lay(bead.mul(sandIn), sandC);
  // the falling stream and, before the glass, the seed: one grain falling alone
  const fallT = T.mul(0.55).fract(), gy = mix(float(13), float(-12), fallT.mul(fallT));
  const g1 = vec2(p.x, p.y.sub(gy)).length();
  const pS = io(0, 0.02, 0.95, 0.98);
  lay(st(g1, 0.5).mul(maskIris(pS, g1.div(0.5))).add(st(g1.sub(1).abs(), 0.05).mul(inv(ss(0.12, 0.2, u)))).min(1).mul(on(pS)), mix(W, H, 0.3));
  const yy = p.y.add(T.mul(7)).div(1.3), sy = yy.fract().sub(0.5).mul(1.3);
  const strm = st(vec2(p.x, sy).length(), 0.3).mul(step(p.y, 5.5)).mul(step(S.mul(10.5).sub(12.5), p.y)).mul(step(0.01, S)).mul(step(S, 0.99));
  lay(strm, mix(H, H2, tick));
  lay(glass.add(caps).min(1).add(nib(pG, sG, 0.03).mul(st(dG.abs(), 0.5)).mul(step(pG, 0.99))).min(1), mix(A, W, 0.35).mul(lit).add(H.mul(nib(pG, sG, 0.03))));

  // the cogs: a meshed chain each side, arriving one by one swept in from the tooth where they mesh with the last
  const lyt = pk(9, 2), ord = pk(11, 2);
  const g = ss(0.24, 0.6, u).add(cl.mul(0.08).mul(on(u.sub(0.24)))).min(1).mul(inv(ss(0.88, 0.94, u))).mul(4);
  const step0 = c.beat.floor().add(ss(0, 0.18, c.beat.fract())).mul(kOn);  // one tooth per kick
  const sd = sense(12);
  for (let i = 0; i < 4; i++) {
    const L0 = LAY[0][i], L1 = LAY[1][i], v = (k) => mix(float(L0[k]), float(L1[k]), lyt);
    const N = v("N"), R = v("R");
    const th0 = T.mul(0.22).mul(sd).add(step0.mul(TAU).div(mix(float(LAY[0][0].N), float(LAY[1][0].N), lyt)));
    const th = th0.mul(v("k")).add(v("c"));
    const G = cog(q, vec2(v("x"), v("y")), R, N, th);
    const rank = mix(float(i), float(3 - i), ord);
    const pg = g.sub(rank).clamp(0, 1);
    const fa = v("f"), rot = vec2(G.dq.x.mul(fa.cos()).add(G.dq.y.mul(fa.sin())), G.dq.y.mul(fa.cos()).sub(G.dq.x.mul(fa.sin())));
    const body = st(G.d, 0).mul(maskClock(pg, atan2(rot.y.negate(), rot.x.negate()))).mul(on(pg));
    const inner = st(G.r.sub(R.sub(2)).abs(), 0.1).add(st(G.r.sub(1.1).abs(), 0.12)).add(st(G.r, 0.4));
    const kb = atan2(G.dq.y, G.dq.x).sub(th).div(TAU).mul(N.mul(0.5)).fract().sub(0.5).mul(G.r.mul(TAU).div(N.mul(0.5)));
    const beads = st(vec2(kb, G.r.sub(R.sub(3.4))).length(), 0.35).mul(step(2.6, R));
    const ci = [H, A, H2, B][i];
    lay(body, BG.add(mix(ci, W, 0.25).mul(st(G.d.abs(), 0.17)).mul(lit)).add(mix(B, W, 0.3).mul(inner.add(beads).min(1)).mul(0.75)));
  }

  // the pendulum: the rod lowers from its pivot under the base, then the bob opens; it swings on the beat's half-time
  const pP = io(0.62, 0.7, 0.84, 0.88);
  const sw = c.beat.mul(PI / 2).sin().mul(0.38), dir = vec2(sw.sin(), sw.cos().negate());
  const rod = segH(p, vec2(0, -14), dir.mul(7.2).add(vec2(0, -14)));
  const bob = p.sub(dir.mul(8.8).add(vec2(0, -14))).length();
  const pR = pP.mul(2).clamp(0, 1), pB = pP.mul(2).sub(1).clamp(0, 1);
  const fill = c.bar.floor().add(1).mod(2).mul(kOn);
  lay(st(rod.d, 0.18).mul(maskDraw(pR, rod.h)).mul(on(pR)), mix(A, W, 0.4).mul(lit));
  lay(st(bob, 1.6).mul(maskIris(pB, bob.div(1.6))).mul(on(pB)), BG.add(mix(H, W, 0.2).mul(st(bob.sub(1.45).abs(), 0.14).add(st(bob, 0.6)).add(fill.mul(st(bob, 1.4))).min(1)).mul(lit)).add(H2.mul(st(bob.sub(1).abs(), 0.08))));
  return out();
}
