// THE SRI YANTRA: nine interlocking triangles (five down, four up) round a bindu, two lotus rings, a square gate with four T-doors.
// Layers (params.layer): world z-30 a pond of dotted ripple rings receding outward / ring z-12 the 8 and 16 petal lotuses (counter-turning) /
// being z0 bindu, triangles, circle, gate (breathes) / veil z+10 big black triangles turning, eclipsing the line-work / fore z+22 bindu beads + flames rising.
// Pacing: bindu alone u0-.12; triangles nib-drawn one at a time .12-.5; pond rings spreading .2-.75; circle clock .46-.53; black triangles .4-.62;
// 8 petals opening clockwise .5-.62, 16 petals .58-.72; fore .6-.8; gate walls .64-.73, doors slide shut .72-.8; LIFO exit .855-1, pond last.
import { MeshBasicNodeMaterial, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep as ss, step, mix, atan2 as atan2raw, fwidth } from "builtin/tsl";
import { tripClock, visionShown, visionU, climb, maskDraw, maskIris, maskClock, inv, is, sgn, segH, strokeAA, ioU, NEON } from "./lib/trip.js";

const TAU = 6.28318;
const atan2 = (y, x) => atan2raw(y, x.add(1e-5));
const hash = (k, o = 0) => k.mul(12.9898 + o).add(o * 3.1).sin().mul(43758.5453).fract();
const par2 = (k) => k.mul(0.5).fract().mul(2);                       // 0 / 1 parity of an integer node, sign-safe
// the nine triangles, outer to inner, unit circle: [apex y, base y, half width]; even = apex down (shakti), odd = apex up (shiva)
const TRI = [[-1, 0.44, 0.9], [1, -0.52, 0.855], [-0.74, 0.62, 0.66], [0.8, -0.68, 0.6], [-0.5, 0.3, 0.46], [0.52, -0.36, 0.44], [-0.3, 0.44, 0.3], [0.3, -0.18, 0.24], [-0.14, 0.14, 0.15]];
const RT = 11, G = 20.6;

export function material(ctx) {
  const layer = ctx.params.layer ?? "being", low = ctx.quality === "low";
  const c = tripClock(ctx), u = visionU(ctx, c), live = visionShown(ctx, c, 0), io = ioU(u);
  const rn = (n) => c.rnd(1100 + n), pk = (n, k) => c.pick(1100 + n, k), sense = (n) => sgn(rn(n));
  const { BLU, VIO, PNK, ORA, YEL, GRN, W, BG } = NEON;
  const CYA = vec3(0.01, 0.6, 0.75);
  const fam = pk(0, 3).add(c.seed.div(7).floor()).mod(3), hot = pk(1, 4);
  const A = BLU.mul(is(fam, 0)).add(VIO.mul(is(fam, 1))).add(CYA.mul(is(fam, 2)));
  const B = VIO.mul(is(fam, 0)).add(BLU.mul(is(fam, 1))).add(GRN.mul(0.7).mul(is(fam, 2)));
  const pickC = (list, k) => list.reduce((a, v, i) => a.add(v.mul(is(k, i))), vec3(0));
  const HOTS = [PNK, ORA, YEL, GRN];
  const H = pickC(HOTS, hot), H2 = pickC(HOTS, hot.add(pk(2, 3)).add(1).mod(4));
  const P = positionGeometry.xy, T = c.real;
  const kOn = step(0.001, c.kick), cl = climb(c), beatN = c.beat.floor().max(0);
  const cul = io(0.7, 0.8, 0.86, 0.92).mul(cl.mul(0.4).add(0.6));
  const on = (p) => step(0.004, p);
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  let col = vec3(0), cover = float(0);
  const lay = (b, lit) => { col = mix(col, lit, b); cover = cover.max(b); };
  const cutout = () => { m.colorNode = col; m.opacityNode = cover.mul(live).clamp(0, 1); m.alphaTest = 0.5; return m; };

  // ------------------------------------------------------------------ WORLD: the pond. Dot rings equal in log-radius drift outward for ever;
  // each ring turns against its neighbours; rings light one by one as the ripple spreads, and go out from the rim inward at the end.
  if (layer === "world") {
    const r = P.length().max(0.5), lr = r.log(), a = atan2(P.x, P.y);
    const N = pk(20, 3).mul(8).add(48), sp = float(TAU).div(N), sn = sense(21);
    const x = lr.div(sp).sub(T.mul(0.08)), k = x.floor(), fr = x.fract().sub(0.5), par = par2(k);
    const fa = a.div(TAU).mul(N).add(par.mul(0.5)).add(T.mul(0.16).mul(par.mul(2).sub(1)).mul(sn)).fract().sub(0.5);
    const l = vec2(fa, fr).length(), aaC = fwidth(P.x).mul(1.2).div(sp.mul(r)).clamp(0.01, 0.3);
    const grow = ss(0.32, 0.88, u).add(cl.mul(0.1).mul(on(u.sub(0.36)))).min(1).mul(inv(ss(0.95, 0.997, u)));
    const lrc = k.add(0.5).add(T.mul(0.08)).mul(sp), gl = grow.mul(grow).mul(210).add(1).log();
    const ca = a.div(TAU).mul(N).add(par.mul(0.5)).add(T.mul(0.16).mul(par.mul(2).sub(1)).mul(sn)).floor();   // 11-14: each bead its own moment
    const sw = ss(0, sp.mul(2.5), gl.sub(lrc).sub(hash(ca.add(k.mul(97)), 17).mul(1.6))).mul(on(grow)).mul(step(3.2, r));
    const rad = sw.mul(cl.mul(0.07).add(0.25));
    const hol = par2(par.add(beatN.mul(kOn)));                       // kick: discs and hollow rings swap, ring by ring
    const disc = inv(ss(rad, rad.add(aaC), l)), holw = inv(ss(float(0.07), aaC.add(0.07), l.sub(rad.sub(0.06)).abs())).mul(step(0.1, rad));
    const hk = hash(k, 3), front = c.beat.fract().mul(130);
    const kl = inv(ss(0, 9, r.sub(front).abs())).mul(kOn);
    lay(mix(disc, holw, hol).mul(step(0.02, rad)), mix(mix(A, B, step(0.5, hk)), H2, step(0.84, hk)).mul(cul.mul(0.3).add(0.42).add(kl.mul(0.7))));
    return cutout();
  }

  // ------------------------------------------------------------------ RING: two lotuses, turning against each other; petals open clockwise one by one
  if (layer === "ring") {
    const r = P.length(), a0 = atan2(P.x, P.y), aa = fwidth(P.x).mul(1.2).max(0.01), st = strokeAA(aa), sn = sense(4);
    const barN = c.bar.floor().max(0).mul(kOn);
    const lotus = (N, Ra, Rb, rate, pL, off, cRim, cBead) => {
      const a = a0.add(T.mul(rate).mul(sn)), kf = a.div(TAU).mul(N).add(0.5).floor(), ac = a.sub(kf.mul(TAU / N));
      const kk = kf.sub(kf.div(N).floor().mul(N)), r2 = kk.add(off), rank = r2.sub(step(N - 0.5, r2).mul(N));
      const pP = pL.mul(N).sub(rank).clamp(0, 1), len = pP.max(0.03).mul(Rb - Ra);
      const t = r.sub(Ra).div(len), tc = t.clamp(0, 1);
      const d = ac.abs().sub(inv(tc.mul(tc)).mul((3.14159 / N) * 0.94)).mul(r);
      const inside = st(d, 0).mul(step(0, t)).mul(step(t, 1)).mul(on(pP));
      const bd = vec2(ac.mul(r), r.sub(len.mul(0.42).add(Ra))).length(), br = (Rb - Ra) * 0.13;
      const swap = par2(kk.add(beatN.mul(kOn)));                     // kick: petal beads swap filled / hollow, alternate petals
      const bead = mix(st(bd, br), st(bd.sub(br).abs(), 0.09), swap).mul(step(0.9, pP));
      const rimC = mix(cRim, mix(cRim, W, 0.55), par2(kk.add(barN)));  // bar on a kick run: the two petal tones step round
      lay(inside, BG.add(rimC.mul(st(d.abs(), 0.11).add(st(ac.abs().mul(r), 0.045).mul(step(tc, 0.72)))).mul(cul.mul(0.5).add(0.75))).add(cBead.mul(bead)));
      lay(st(r.sub(Ra).abs(), 0.07).mul(maskClock(pL, a0)).mul(on(pL)), mix(cRim, W, 0.3));
    };
    lotus(16, 18.9, 23.3, -TAU / 130, io(0.58, 0.72, 0.89, 0.92), pk(6, 16), B, H2);
    lotus(8, 14.3, 18.6, TAU / 90, io(0.5, 0.62, 0.91, 0.935), pk(5, 8), A, H);
    return cutout();
  }

  // ------------------------------------------------------------------ VEIL: big black triangles orbiting and turning, eclipsing the yantra
  if (layer === "veil") {
    const aa = fwidth(P.x).mul(1.2).max(0.01), st = strokeAA(aa), pin = io(0.4, 0.62, 0.88, 0.91), sv = sense(7);
    for (let j = 0; j < (low ? 2 : 3); j++) {
      const oa = T.mul(0.045 * (1 + j * 0.35)).mul(sv).add(rn(8).mul(TAU)).add(j * 2.094), orad = 12 + j * 3.5;
      const q = P.sub(vec2(oa.cos().mul(orad * 1.25), oa.sin().mul(orad * 0.8)));
      const th = T.mul(-0.06 * (1 + j * 0.4)).mul(sv).add(j * 1.3).add(rn(9).mul(TAU));
      const pj = pin.mul(1.5).sub(j * 0.25).clamp(0, 1);
      // the black gives ground on each bar of a kick run: what it hid shows for a moment
      const R = pj.mul(4.6 + j * 1.1).mul(cl.mul(0.12).add(0.9)).mul(inv(c.barHit.mul(0.22).mul(kOn)));
      let d = float(-1e3);
      for (let e = 0; e < 3; e++) { const an = th.add(e * 2.0944); d = d.max(q.x.mul(an.cos()).add(q.y.mul(an.sin())).sub(R)); }
      lay(st(d, 0).mul(on(pj)), BG.add(mix(B, W, 0.3).mul(st(d.abs(), 0.13)).mul(0.75)).add([H, H2, A][j].mul(st(d.add(0.9).abs(), 0.05)).mul(0.6)));
    }
    return cutout();
  }

  // ------------------------------------------------------------------ FORE: bindu beads and flame teardrops rising slowly
  if (layer === "fore") {
    const aa = fwidth(P.x).mul(1.2).max(0.01), st = strokeAA(aa), pin = io(0.6, 0.8, 0.87, 0.9);
    const stepC = par2(beatN.mul(kOn));                              // kick: flames and beads trade their two hot colours
    const h1 = mix(H, H2, stepC), h2 = mix(H2, H, stepC);
    for (let j = 0; j < (low ? 4 : 7); j++) {
      const yj = T.mul(0.011 * (1 + j * 0.23)).add(j * 0.37).fract().mul(100).sub(50);
      const xj = T.mul(0.31 + j * 0.05).add(j * 1.9).sin().mul(2.5).add(((j * 17.3) % 56) - 28);
      const q = P.sub(vec2(xj, yj)), pj = pin.mul(1.9).sub(j * 0.13).clamp(0, 1);
      if (j % 2) {
        const l = q.length(), s = 0.75 + (j % 3) * 0.2;
        lay(st(l, s * 1.5).mul(maskIris(pj, l.div(s * 1.5))).mul(on(pj)), BG.add(mix(h1, W, 0.45).mul(st(l, s * 0.55))).add(h2.mul(st(l.sub(s * 1.2).abs(), 0.08))));
      } else {
        const hgt = 3.4 + (j % 3) * 0.5, t = q.y.div(hgt).clamp(0, 1);
        const fx = q.x.add(q.y.mul(1.4).add(T.mul(2.6)).add(j).sin().mul(t).mul(0.22));
        const d = vec2(fx, q.y.sub(t.mul(hgt))).length().sub(inv(t).mul(1.05));
        lay(st(d, 0).mul(maskDraw(pj, q.y.add(1.05).div(hgt + 1.05))).mul(on(pj)), BG.add(h1.mul(st(d.abs(), 0.1))).add(mix(YEL, h2, 0.5).mul(st(d.add(0.5), 0))));
      }
    }
    return cutout();
  }

  // ------------------------------------------------------------------ THE BEING (breathes)
  const p = P.div(T.mul(TAU / 11).sin().mul(0.015).add(1));
  const aa = fwidth(p.x).mul(1.2).max(0.008), st = strokeAA(aa);
  const q = vec2(p.x.abs(), p.y), r0 = p.length();

  // the gate: four walls drawn out from each doorway to the corners, side after side; then the T-doors slide shut, side after side
  const ax = p.x.abs(), ay = p.y.abs(), isX = step(ay, ax);
  const gq = vec2(ax.min(ay), ax.max(ay));
  const side = mix(inv(step(0, p.y)).mul(2).add(1), inv(step(0, p.x)).mul(2), isX);
  const rs = side.add(pk(10, 4)), rankS = rs.sub(step(3.5, rs).mul(4));
  const pW = io(0.64, 0.73, 0.875, 0.9).mul(4).sub(rankS).clamp(0, 1), pD = io(0.72, 0.8, 0.855, 0.885).mul(4).sub(rankS).clamp(0, 1);
  const w1 = segH(gq, vec2(4, G), vec2(G, G)), w2 = segH(gq, vec2(4, G - 0.85), vec2(G - 0.85, G - 0.85));
  const wall = st(w1.d, 0.16).mul(maskDraw(pW, w1.h)).add(st(w2.d, 0.06).mul(maskDraw(pW, w2.h))).min(1).mul(on(pW));
  lay(wall, mix(B, W, 0.35).mul(cul.mul(0.4).add(0.8)));
  const dq = vec2(gq.x, gq.y.sub(inv(pD).mul(inv(pD)).mul(11)));
  const DOOR = [[4, G, 4, G + 1.5], [4, G + 1.5, 6.3, G + 1.5], [6.3, G + 1.5, 6.3, G + 3], [6.3, G + 3, 0, G + 3]];
  const dd = DOOR.reduce((acc, [x0, y0, x1, y1]) => acc.min(segH(dq, vec2(x0, y0), vec2(x1, y1)).d), float(99));
  const knob = vec2(dq.x, dq.y.sub(G + 1.5)).length();
  lay(st(dd, 0.17).add(st(knob, 0.42)).min(1).mul(on(pD)), mix(H, W, par2(side.add(beatN)).mul(kOn).mul(0.6)));

  // the circle that holds the triangles: a clock sweep
  const pC = io(0.46, 0.53, 0.925, 0.94);
  lay(st(r0.sub(RT + 0.55).abs(), 0.1).mul(maskClock(pC, atan2(p.x, p.y).mul(sense(11)))).mul(on(pC)), mix(A, W, 0.4));

  // nine triangles, each drawn by a nib from its apex down both flanks and along the base; the same clock runs back to undraw them
  const g = ss(0.12, 0.5, u).add(cl.mul(0.05).mul(on(u.sub(0.12)))).min(1).mul(inv(ss(0.93, 0.975, u))).mul(9);
  const ord = pk(3, 2), c0 = pk(12, 6), cs = sense(13), fillSel = beatN.sub(beatN.div(9).floor().mul(9));
  const LINES = [PNK, YEL, CYA, ORA, GRN, mix(VIO, W, 0.35)];
  const barStep = c.bar.floor().max(0).mul(kOn);                     // bar on a kick run: every line takes its neighbour's colour
  TRI.slice(0, 9).forEach(([ya, yb, hw], i) => {
    const Ap = vec2(0, ya * RT), Bp = vec2(hw * RT, yb * RT), L1 = Math.hypot(hw, ya - yb) * RT, L2 = hw * RT;
    const s1 = segH(q, Ap, Bp), s2 = segH(q, Bp, vec2(0, yb * RT));
    const d = s1.d.min(s2.d), tt = mix(s2.h.mul(L2).add(L1), s1.h.mul(L1), step(s1.d, s2.d)).div(L1 + L2);
    const pS = g.sub(ord.mul(2 * i - 8).add(8 - i)).clamp(0, 1);
    const ci = cs.mul(i).add(c0).add(barStep).add(600), lc = pickC(LINES, ci.sub(ci.div(6).floor().mul(6)));
    const v = p.y.sub(yb * RT).div((ya - yb) * RT), inside = step(0, v).mul(step(q.x, inv(v).mul(hw * RT)));
    // kick: one triangle is filled, the fill stepping inward one triangle per beat; it blacks out the line-work behind it
    lay(inside.mul(is(fillSel, i)).mul(kOn).mul(step(0.99, pS)), BG.add(lc.mul(0.42)));
    const tip = inv(ss(0, 0.035, tt.sub(pS).abs())).mul(step(pS, 0.99)).mul(st(d, 0.3)).mul(on(pS));
    lay(st(d, cl.mul(0.04).add(0.1)).mul(maskDraw(pS, tt)).mul(on(pS)).max(tip), mix(lc.mul(cul.mul(0.4).add(0.85)), W, tip));
  });

  // the bindu: the seed, alone on black first and last
  const pB = io(0, 0.05, 0.975, 0.995), rb = pB.mul(c.kick.mul(0.15).add(0.62));
  lay(st(r0.sub(rb), 0).mul(on(pB)), mix(W, H, 0.25));
  lay(st(r0.sub(rb.mul(1.9)).abs(), 0.07).mul(step(0.6, pB)), H);
  return cutout();
}
