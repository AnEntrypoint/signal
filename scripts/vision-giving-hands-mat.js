// THE GIVING HANDS (vision being, K = 7): two open palms reaching in from the sides, dripping light into a pool.
// Five canvases, one script (params.layer); every layer draws in "being metres" (P = xy * 74 / depth) so the
// layers line up on screen, and each moves on its own kind of motion:
//   world (z -30) SCROLLS OUTWARD: black ground arriving as ripple bands from the nest; sky of concentric bead
//                 rings flowing out; below the horizon a pool where each finger's drop opens bead rings that
//                 interfere (moire); at the culmination a moire FLOWER whose centres orbit against the bead flow.
//   ring  (z -12) TURNS: a tilted ellipse of soft dots one way, a bead crown round the nest the other (additive).
//   being (z 0)   BREATHES: occluding black hands drawn by a pen (hand, inner, outer contour), hex nest whose
//                 levels breathe and counter-turn (they lock at the culmination), palm eyes, fingertip beads,
//                 light drops falling from each fingertip, candles lit one by one under the hands.
//   veil  (z +10) SCROLLS DOWN: black striped drip-strands hanging from the top, a drop of light at each tip.
//   fore  (z +22) DRIFTS: near petals / stars rising up the far sides, black bodies with a neon rim.
// Score (u): .00 nest + first drop | .08-.3 hand, fill, inner, outer | .25 drips fall | .27-.45 world grows |
//   .4-.58 ring | .5-.66 nest levels | .58 eyes | .6-.74 candles | .66 tips | .6-.78 veil | .66-.8 fore |
//   .84-.93 moire flower + nest lock | exit LIFO .93-1: fore, veil, details, ring, world, hands, nest.
// Seed channels 340-359: 340 hue family, 341 flower petals, 342 pen start, 343 eye, 344 ring sense, 345 ring speed,
//   346 tilt, 349 lean, 350 candles, 351 nest sides of turn, 352 fore set, 354 sky beads, 356 veil count, 357 hot.
import { MeshBasicNodeMaterial, AdditiveBlending, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, mix, fwidth, select, atan2 } from "builtin/tsl";
import { tripClock, visionShown, visionU, climb, maskDraw, maskBeads, maskIris, maskLid, maskClock, nib } from "./lib/trip.js";

const TAU = 6.28318;
const S = 1.6, HX = 19, HY = 1.6;     // hand units -> metres; right palm centre in hand units (left mirrors)
const NY = 3, RY = -24, SQ = 0.32, HOR = -13;   // nest centre, pool centre, pool flattening, horizon
const HAND = [[-2.6, -9.5], [-2.8, -7], [-4.2, -5], [-7.5, -2], [-8.6, 0.2], [-8.2, 1.4], [-7, 1.2], [-4.6, -0.6],
  [-4.5, 3], [-4.5, 9.6], [-4, 10.5], [-3.1, 10.5], [-2.6, 9.6], [-2.6, 3.7], [-2.35, 3.4], [-2.1, 3.7],
  [-2.1, 11.1], [-1.6, 12], [-0.7, 12], [-0.2, 11.1], [-0.2, 3.7], [0.05, 3.4], [0.3, 3.7],
  [0.3, 10.1], [0.8, 11], [1.7, 11], [2.2, 10.1], [2.2, 3.6], [2.45, 3.3], [2.7, 3.6],
  [2.7, 7.7], [3.2, 8.5], [4.1, 8.5], [4.6, 7.7], [4.6, -3], [3.8, -6.5], [2.6, -7.5], [2.6, -9.5]];
const TIPS = [[-9.3, 1.7], [-3.55, 11.7], [-1.15, 13.2], [1.25, 12.2], [3.65, 9.7]];
const EYE = [0.1, -2.2];
const DEPTH = { world: 104, ring: 86, being: 74, veil: 64, fore: 52 };

const is = (v, i) => step(v.sub(i).abs(), 0.5);
const inv = (x) => float(1).sub(x);
const rot = (v, a) => { const c = a.cos(), s = a.sin(); return vec2(v.x.mul(c).sub(v.y.mul(s)), v.x.mul(s).add(v.y.mul(c))); };
const hexd = (v) => v.x.abs().mul(0.866).add(v.y.abs().mul(0.5)).max(v.y.abs());

function outline(q, pts) {
  const L = [0];
  for (let i = 1; i < pts.length; i++) L.push(L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  const total = L[L.length - 1];
  let d = float(1000), u = float(0), cnt = float(0);
  for (let i = 0; i < pts.length; i++) {
    const [ax, ay] = pts[i], [nx, ny] = pts[(i + 1) % pts.length], bx = nx - ax, by = ny - ay;
    if (i < pts.length - 1) {
      const bb = bx * bx + by * by, len = Math.sqrt(bb), pa = q.sub(vec2(ax, ay));
      const h = pa.dot(vec2(bx, by)).div(bb).clamp(0, 1);
      const di = pa.sub(vec2(bx, by).mul(h)).length();
      u = select(di.lessThan(d), h.mul(len).add(L[i]).div(total), u);
      d = d.min(di);
    }
    if (Math.abs(by) > 1e-6) {
      const lo = Math.min(ay, ny), hi = Math.max(ay, ny);
      const span = step(lo, q.y).mul(inv(step(hi, q.y)));
      const xi = q.y.sub(ay).mul(bx / by).add(ax);
      cnt = cnt.add(span.mul(step(q.x, xi)));
    }
  }
  return { d, u, inside: step(0.5, cnt.mod(2)) };
}

export function material(ctx) {
  const layer = ctx.params.layer ?? "being";
  const c = tripClock(ctx);
  const u = visionU(ctx, c);
  const t = c.real;
  const io = (a, b, x, y) => smoothstep(a, b, u).mul(inv(smoothstep(x, y, u)));
  const cul = smoothstep(0.84, 0.9, u).mul(inv(smoothstep(0.93, 0.95, u))).mul(climb(c).mul(0.5).add(0.5));
  const kick = c.kick;                                   // gated: 0 where the track has no beat
  const rn = (k) => c.rnd(340 + k), pk = (k, m) => c.pick(340 + k, m);
  const fam = pk(0, 4), hot = pk(17, 3);
  const blue = vec3(0.05, 0.12, 1.0), violet = vec3(0.45, 0.05, 1.0), pink = vec3(1.0, 0.05, 0.6), orange = vec3(1.0, 0.38, 0.02),
    yellow = vec3(1.0, 0.85, 0.05), green = vec3(0.1, 1.0, 0.15), W = vec3(1, 1, 1);
  const A = blue.mul(is(fam, 0).add(is(fam, 2))).add(violet.mul(is(fam, 1).add(is(fam, 3))));      // body
  const B = violet.mul(is(fam, 0).add(is(fam, 2))).add(blue.mul(is(fam, 1).add(is(fam, 3))));      // second body
  const C = pink.mul(is(hot, 0)).add(yellow.mul(is(hot, 1))).add(orange.mul(is(hot, 2)));          // hot (worms share it)
  const G = mix(green, C, step(1.5, fam));                                                          // accent
  const P = positionGeometry.xy.mul(74 / (DEPTH[layer] ?? 74));
  const aa = fwidth(P.x).mul(1.2).max(0.01);
  const stroke = (d, w) => inv(smoothstep(float(w), aa.add(w), d));
  const disc = (d, r) => inv(smoothstep(float(r).sub(aa), r, d));
  const lean = pk(9, 3).mul(0.07), cl = lean.cos(), sl = lean.sin();
  // a fingertip in metres (right hand) and its drop's fall: phase 0..1 per tip, period per tip
  const tipAt = (i) => { const [tx, ty] = TIPS[i]; return vec2(float(tx).mul(cl).add(float(ty).mul(sl)).add(HX).mul(S), float(ty).mul(cl).sub(float(tx).mul(sl)).add(HY).mul(S)); };
  const fallP = (i) => 2.6 + i * 0.47;
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  m.fog = false;
  let col = vec3(0), cover = float(0);
  const put = (colour, mask) => { col = mix(col, colour, mask); cover = cover.max(mask); };

  if (layer === "world") {
    // the ground arrives as ripple bands running out from the nest (and goes back the same way)
    const d0 = vec2(P.x, P.y.sub(NY)).length();
    const R = smoothstep(0.27, 0.45, u).mul(inv(smoothstep(0.965, 0.99, u))).mul(150);
    const front = d0.sub(R).div(18);
    const grown = step(d0, R).max(step(front, 1).mul(step(0, front)).mul(step(front, inv(vec2(d0.div(4.2).fract(), 0).x).mul(0.9))));
    put(vec3(0.0, 0.0, 0.012), grown);
    const lit = float(0.55).add(kick.mul(0.25)).add(cul.mul(0.3));
    // sky: concentric rings flowing outward, a bead row on every other ring
    const sky = smoothstep(HOR - 1, HOR + 2, P.y);
    const fl = d0.sub(t.mul(0.7)), ri = fl.div(7).floor(), fr = fl.div(7).fract();
    put(A.mul(0.42).mul(lit), stroke(fr.sub(0.5).abs().mul(7), 0.07).mul(sky).mul(grown).mul(step(9, d0)));
    const a0 = atan2(P.y.sub(NY), P.x);
    const nb = ri.mul(6).add(pk(14, 2).mul(4).add(8));
    const ang = a0.div(TAU).mul(nb).add(t.mul(0.05).mul(c.dir)).fract().sub(0.5);
    const bd = vec2(ang.mul(TAU).mul(d0).div(nb), fr.mul(7)).length();
    put(mix(B, G, step(1, ri.mod(4))).mul(lit), disc(bd, 0.55).mul(sky).mul(grown).mul(step(0.5, ri.mod(2))).mul(step(9, d0)));
    // the horizon: a bead line where the pool meets the sky
    put(C.mul(lit), stroke(P.y.sub(HOR).abs(), 0.09).mul(grown));
    // pool: each fingertip's drop lands and sends bead rings out; the five (x2) sets interfere
    const pool = inv(sky);
    let ring = float(0);
    for (let i = 0; i < 5; i++) {
      const lx = tipAt(i).x, per = fallP(i), sp = 5.2;
      const q = vec2(P.x.abs().sub(lx), P.y.sub(RY).div(SQ));
      const dq = q.length(), ph = t.div(per).add(i * 0.37).fract();
      const w = dq.div(per * sp).sub(ph).fract();
      const age = dq.div(46).clamp(0, 1);
      ring = ring.add(stroke(w.sub(0.5).abs().mul(per * sp).mul(SQ + 0.15), 0.1).mul(inv(age)));
    }
    const started = smoothstep(0.25, 0.3, u);
    put(mix(A, W, ring.sub(1).clamp(0, 1).mul(0.6)).mul(lit), ring.clamp(0, 1).mul(pool).mul(grown).mul(started));
    // THE MOIRE FLOWER (culmination): ring sets round centres orbiting the nest one way, beads flowing the other
    const nP = pk(1, 4).add(3);
    const pf = smoothstep(0.82, 0.88, u).mul(inv(smoothstep(0.93, 0.955, u)));
    let s = float(0);
    for (let k = 0; k < 6; k++) {
      const on = step(k + 0.5, nP);
      const th = t.mul(-0.35).mul(c.dir).add(float(k).div(nP).mul(TAU));
      const dk = vec2(P.x.sub(th.cos().mul(7)), P.y.sub(NY).sub(th.sin().mul(7))).length();
      s = s.add(dk.mul(1.15).sub(t.mul(2.4)).cos().mul(on));
    }
    const v = s.div(nP);
    const petal = smoothstep(0.5, 0.62, v).mul(maskIris(pf, d0.div(48)));
    put(mix(C, W, smoothstep(0.75, 0.95, v)).mul(lit.add(0.3)), petal.mul(grown).mul(step(d0, 48)));
    m.colorNode = col;
    m.opacityNode = cover.mul(visionShown(ctx, c, d0.div(120)));
    m.alphaTest = 0.5;
    return m;
  }

  if (layer === "ring") {
    // a tilted ellipse of dots turning one way, a crown of hex-beads round the nest turning the other (soft)
    const sense = rn(4).step(0.5).mul(2).sub(1);
    const tilt = mix(0.1, 0.3, rn(6)).mul(sense);
    const e = rot(vec2(P.x, P.y.sub(NY)), tilt);
    const pb = smoothstep(0.4, 0.58, u).mul(inv(smoothstep(0.96, 0.98, u)));
    const N1 = 18, ea = atan2(e.y.div(12), e.x.div(44)).div(TAU).sub(t.div(mix(36, 60, rn(5))).mul(sense));
    const i1 = ea.mul(N1).round(), a1 = i1.div(N1).add(t.div(mix(36, 60, rn(5))).mul(sense)).mul(TAU);
    const pos = vec2(a1.cos().mul(44), a1.sin().mul(12));
    const near = inv(a1.sin()).mul(0.5);                     // the lower half nearer: larger
    const r1 = mix(0.7, 1.5, near).mul(mix(1, 1.4, is(i1.mod(3), 0)));
    const g1 = smoothstep(r1, r1.mul(0.35), e.sub(pos).length()).mul(maskBeads(pb, i1.mul(0.618).fract()));
    const q = vec2(P.x, P.y.sub(NY)), dq = q.length();
    const N2 = 12, a2 = atan2(q.y, q.x).div(TAU).add(t.div(28).mul(sense)).mul(N2);
    const i2 = a2.round(), bq = vec2(a2.sub(i2).mul(TAU * 20 / N2), dq.sub(20)).length();
    const pb2 = smoothstep(0.46, 0.6, u).mul(inv(smoothstep(0.955, 0.975, u)));
    const g2 = smoothstep(1.1, 0.35, bq).mul(maskBeads(pb2, i2.add(N2).mod(N2).div(N2)));
    const lit = float(0.45).add(kick.mul(0.35)).add(cul.mul(0.4));
    m.colorNode = A.mul(g1).add(mix(C, W, 0.3).mul(g2)).mul(lit);
    m.opacityNode = visionShown(ctx, c, dq.div(50));
    m.transparent = true; m.blending = AdditiveBlending; m.depthWrite = false;
    return m;
  }

  if (layer === "veil") {
    // black op-art drip-strands hanging from above the frame, a drop of light at each tip; stripes scroll down
    const TOP = 46, xs = [22, 40, 56];
    const nV = pk(16, 2).add(2);
    for (let j = 0; j < 3; j++) {
      const on = step(j + 0.5, nV);
      const L = mix(0.75, 1.1, rn(10 + j)).mul([30, 22, 34][j]);
      const pv = io(0.6 + j * 0.05, 0.7 + j * 0.05, 0.94 + j * 0.006, 0.958 + j * 0.006).mul(on);
      const uu = float(TOP).sub(P.y).div(L);
      const sway = t.mul(0.42 + j * 0.17).add(j * 2.1).sin().mul(2.4).mul(uu.clamp(0, 1));
      const dx = P.x.abs().sub(float(xs[j]).add(sway));
      const tipY = float(TOP).sub(L.mul(pv));
      const w = mix(1.5, 0.55, uu.clamp(0, 1));
      const body = step(dx.abs(), w).mul(step(tipY, P.y)).mul(step(0.01, pv));
      const band = P.y.mul(0.55).add(t.mul(1.1)).fract();
      put(vec3(0), body);
      put(mix(W.mul(0.85), A, step(0.5, rn(18))), body.mul(step(band, 0.42)).mul(step(dx.abs(), w.mul(0.62))));
      put(A.mul(1.1), body.mul(inv(step(dx.abs(), w.sub(0.22)))));
      const dd = vec2(dx, P.y.sub(tipY).add(1.3)).length();
      const lit = float(0.9).add(kick.mul(0.35)).add(cul.mul(0.4));
      put(vec3(0), disc(dd, 1.75).mul(step(0.01, pv)));
      put(mix(C, W, smoothstep(1.2, 0.2, dd)).mul(lit), disc(dd, 1.45).mul(step(0.01, pv)));
    }
    m.colorNode = col;
    m.opacityNode = cover.mul(visionShown(ctx, c, P.length().div(60)));
    m.alphaTest = 0.5;
    return m;
  }

  if (layer === "fore") {
    // near petals (or four-point stars) rising up the far sides, black with a neon rim
    const star = step(0.5, rn(12));
    const pr = smoothstep(0.66, 0.8, u).mul(inv(smoothstep(0.93, 0.945, u)));
    for (let i = 0; i < 4; i++) {
      const sp = 1 / (16 + i * 5), o = (i * 0.29 + 0.1) % 1;
      const y = t.mul(sp).add(o).add(rn(13 + (i % 2)).mul(0.5)).fract().mul(80).sub(40);
      const x = float(44 + i * 4.5).add(t.mul(0.3 + i * 0.1).add(i).sin().mul(3));
      const sz = 1.6 + (i % 3) * 0.5;
      const q = rot(vec2(P.x.abs().sub(x), P.y.sub(y)), t.mul(0.2 + i * 0.07).add(i)).div(sz);
      const tear = vec2(q.x, q.y.add(0.35).min(0)).length().sub(0.8).max(q.x.abs().sub(inv(q.y.add(0.35).div(1.6)).mul(0.8)).max(q.y.sub(1.25)).mul(step(-0.35, q.y)));
      const ast = q.x.abs().pow(0.5).add(q.y.abs().pow(0.5)).sub(1.15);
      const sd = mix(tear, ast, star);
      const show = maskBeads(pr, (i * 0.37 + 0.2) % 1).mul(step(sd, 0));
      put(vec3(0), show);
      put(mix(A, C, (i % 2)).mul(float(0.9).add(kick.mul(0.3))), show.mul(step(-0.16, sd)));
      put(W, show.mul(disc(q.length(), 0.16)));
    }
    m.colorNode = col;
    m.opacityNode = cover.mul(visionShown(ctx, c, P.length().div(60)));
    m.alphaTest = 0.5;
    return m;
  }

  // ---- THE BEING: hands, hex nest, eyes, drops, candles; black bodies under neon line-art
  const lit = float(0.8).add(cul.mul(0.45)).add(kick.mul(0.25));
  const o = vec2(P.x.abs().div(S).sub(HX), P.y.div(S).sub(HY));
  const q = vec2(o.x.mul(cl).sub(o.y.mul(sl)), o.x.mul(sl).add(o.y.mul(cl)));
  const hd = outline(q, HAND);
  const sd = hd.d.mul(inv(hd.inside.mul(2)));
  const along = mix(hd.u, inv(hd.u), pk(2, 2));
  const above = step(-9.5, q.y);
  const p0 = io(0.08, 0.2, 0.98, 0.992), pF = io(0.12, 0.26, 0.98, 0.992);
  const p1 = io(0.14, 0.26, 0.975, 0.986), p2 = io(0.2, 0.3, 0.97, 0.98);
  const ss = (d, w) => stroke(d, w / S * 1.0).mul(1);
  // the black body of the hand fills upward from the wrist: it hides the pool and sky behind
  put(vec3(0.0, 0.0, 0.02), hd.inside.mul(step(q.y, mix(-9.5, 14, pF))).mul(step(0.01, pF)));
  const pen = (pr) => nib(pr, along, 0.02).mul(step(0.002, pr)).mul(step(pr, 0.995));
  const comet = smoothstep(0.06, 0, along.sub(t.div(7).fract()).abs()).mul(step(0.999, p0));
  put(A.mul(lit.mul(0.9)), ss(sd.sub(0.75).abs(), 0.12).mul(maskDraw(p2, along)).mul(above));
  put(W.mul(1.4), pen(p2).mul(ss(sd.sub(0.75).abs(), 0.36)).mul(above));
  put(B.mul(lit), ss(sd.add(0.5).abs(), 0.1).mul(maskDraw(p1, along)).mul(above));
  put(W.mul(1.4), pen(p1).mul(ss(sd.add(0.5).abs(), 0.36)).mul(above));
  put(mix(W, C, comet).mul(lit.add(comet.mul(0.5))), ss(hd.d, 0.18).mul(maskDraw(p0, along)));
  put(W.mul(1.6), pen(p0).mul(ss(hd.d, 0.5)));
  // the eye in each palm opens by its lids
  const pe = io(0.58, 0.64, 0.955, 0.968);
  const ex = q.x.sub(EYE[0]), ey = q.y.sub(EYE[1]), nx = ex.div(2.3), base = inv(nx.mul(nx)).max(0), inX = step(nx.abs(), 1);
  const lidY = base.mul(1.25);
  const seen = maskLid(pe, ey.div(lidY.max(0.001))).mul(inX).mul(step(0.002, pe));
  const er = vec2(ex, ey).length(), ev = pk(3, 3);
  const irisRing = stroke(er.sub(0.95).abs(), 0.09).max(inv(smoothstep(0.33, 0.36, er)));
  const slit = inv(smoothstep(0.9, 1, ex.abs().div(0.34).add(ey.abs().div(1.15))));
  const full = inv(smoothstep(0.95, 1.0, er)).mul(smoothstep(0.37, 0.4, er));
  const iris = irisRing.mul(is(ev, 0)).add(slit.mul(is(ev, 1))).add(full.mul(is(ev, 2)));
  put(vec3(0), seen);
  put(C.mul(float(0.9).add(cul.mul(0.5)).add(kick.mul(0.3))), iris.mul(seen));
  put(W.mul(lit), stroke(ey.abs().sub(lidY.mul(pe)).abs(), 0.09).mul(inX).mul(step(0.002, pe)));
  // fingertip beads light in a row; drops of light fall from each tip into the pool
  const pt = io(0.66, 0.72, 0.955, 0.965), pd = io(0.25, 0.3, 0.95, 0.96);
  for (let i = 0; i < 5; i++) {
    const [tx, ty] = TIPS[i];
    put(mix(C, W, kick.mul(0.6)).mul(lit), disc(q.sub(vec2(tx, ty)).length(), 0.42).mul(maskBeads(pt, i / 5)));
    const tp = tipAt(i), per = fallP(i), ph = t.div(per).add(i * 0.37).fract();
    const yd = tp.y.sub(ph.mul(ph).mul(tp.y.sub(RY)));
    const dq = vec2(P.x.abs().sub(tp.x), P.y.sub(yd));
    const drop = disc(vec2(dq.x, dq.y.min(0)).length(), 0.55).max(disc(dq.x.abs(), inv(dq.y.div(1.6).clamp(0, 1)).mul(0.55)).mul(step(0, dq.y)).mul(step(dq.y, 1.6)));
    put(mix(W, C, ph).mul(1.3), drop.mul(step(0.002, pd)).mul(step(RY, yd)).mul(inv(hd.inside)));
  }
  // the hex nest between the palms: levels breathe and turn against each other, and lock at the culmination
  const nq = vec2(P.x, P.y.sub(NY)), lock = smoothstep(0.84, 0.89, u);
  const breath = t.mul(TAU / 9).sin();
  const p00 = io(0.0, 0.09, 0.988, 0.999);
  for (let i = 0; i < 4; i++) {
    const r = (i + 1) * 3.4, sgn = (i % 2 ? -1 : 1) * (rn(11) < 0.5 ? 1 : 1);
    const turn = t.mul(0.09 / (i + 1)).mul(sgn).mul(c.dir).mul(inv(lock)).add(lock.mul(i * 0.0));
    const v = rot(nq, turn), hx = hexd(v), rr = float(r).mul(breath.mul(0.04 * (i + 1)).add(1));
    const pl = i === 0 ? p00 : io(0.48 + i * 0.04, 0.55 + i * 0.04, 0.96 - i * 0.003, 0.97 - i * 0.003);
    const reveal = maskClock(pl, atan2(v.y, v.x).mul(i % 2 ? -1 : 1));
    if (i === 0) put(vec3(0.0, 0.0, 0.03), step(hx, rr).mul(step(0.99, pl)));
    put(mix(A, mix(B, W, 0.3), i / 3).mul(lit), stroke(hx.sub(rr).abs(), 0.14).mul(reveal).mul(step(0.002, pl)));
    // a bead on each corner
    const ca = atan2(v.y, v.x).div(TAU / 6).round().mul(TAU / 6), cp = vec2(ca.cos(), ca.sin()).mul(rr.div(0.866));
    put(mix(C, G, i % 2).mul(lit), disc(v.sub(cp).length(), 0.42 + i * 0.06).mul(step(0.99, pl)));
  }
  // the first stroke: a drop of light forms at the nest's heart and beats there on the kick
  const core = io(0.0, 0.05, 0.99, 1.0);
  put(mix(C, W, 0.5).mul(lit.add(0.4)), disc(nq.length(), core.mul(1.1).add(kick.mul(0.3))).mul(step(0.01, core)));
  // candles on an arc under the hands, lit one by one from the middle outward
  const nC = pk(10, 3).mul(2).add(7);
  const pc = io(0.6, 0.74, 0.955, 0.97);
  const ca = atan2(nq.x, nq.y.negate()), cr = nq.length();
  const slot = ca.div(1.05).mul(nC.sub(1)).mul(0.5).round(), cang = slot.div(nC.sub(1).mul(0.5)).mul(1.05);
  const okC = step(slot.abs(), nC.sub(1).mul(0.5));
  const cpos = vec2(cang.sin().mul(30), cang.cos().mul(-30)).add(vec2(0, NY));
  const cq = P.sub(cpos);
  const body = step(cq.x.abs(), 0.75).mul(step(-1.6, cq.y)).mul(step(cq.y, 1.4)).mul(okC).mul(step(0.01, pc));
  put(vec3(0.0, 0.0, 0.03), body);
  put(A.mul(lit), body.mul(inv(step(cq.x.abs(), 0.55).mul(step(cq.y, 1.2)))));
  const litC = maskBeads(pc, slot.abs().div(nC.mul(0.5)).add(0.02)).mul(okC);
  const fq = vec2(cq.x.mul(t.mul(9).add(slot.mul(1.7)).sin().mul(0.12).add(1)), cq.y.sub(2.6));
  const flame = disc(vec2(fq.x, fq.y.min(0)).length(), 0.62).max(disc(fq.x.abs(), inv(fq.y.div(1.5).clamp(0, 1)).mul(0.62)).mul(step(0, fq.y)).mul(step(fq.y, 1.5)));
  put(mix(C, W, smoothstep(0.5, -0.8, fq.y)).mul(lit.add(0.3)), flame.mul(litC));
  m.colorNode = col;
  m.opacityNode = cover.mul(visionShown(ctx, c, P.length().div(50)));
  m.alphaTest = 0.5;
  return m;
}
