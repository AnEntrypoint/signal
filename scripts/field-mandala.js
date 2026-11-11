// The mandala field: 28 concentric bands painted in polar space from (0,0,0), six kinds in a repeating order,
// neighbours counter-rotating, a kick ripple running outward, growing in bloom, line-art in reset.
import { atan2, positionWorld, float, vec2, vec3, length, fwidth, smoothstep, select, mix, min, max } from "builtin/tsl";
import { MeshBasicNodeMaterial } from "builtin/three";
import { tripClock, SEC, stripes, HUE, shown, win } from "./lib/trip.js";
import { BW, growR, resetR, endFade, colours, breath, mirrorTurn, kickAt, lit, shade, roll, choose } from "./field-lib.js";

const TAU = 6.2831853;
const GA = 0.38196601125, PC = 1.25, FIB = [3, 5, 8, 13, 21, 34, 55, 89, 144, 233];
const HQ = Math.sqrt(Math.cos(Math.PI / 3) ** 2 - Math.sin(Math.PI / 7) ** 2);
const HD = Math.cos(Math.PI / 3) / HQ, HR = Math.sin(Math.PI / 7) / HQ; // {7,3}: edge circle centre and radius

export function material(ctx) {
  const c = tripClock(ctx);
  const p = positionWorld.xz.div(breath(c.sec));
  const r = length(p);
  const a = mirrorTurn(p.x, p.y);
  const aa = length(fwidth(p)).mul(0.7).clamp(0.004, 0.6);
  const fill = (d) => smoothstep(aa, aa.negate(), d);
  const line = (d, w) => smoothstep(aa.add(w), float(w).mul(0.5), d.abs());
  // outer colour, black ring, inner contrasting colour: a little target
  const target = (len, R, cA, cB) => mix(mix(cA.mul(fill(len.sub(R))), vec3(0), fill(len.sub(R * 0.68))), cB, fill(len.sub(R * 0.42)));

  const q = r.div(BW), i = q.floor(), rm = i.add(0.5).mul(BW);
  const dir = i.mod(2).mul(2).sub(1);
  // counter-breath: neighbour rings swell in antiphase, so the surface rolls like a wave
  const f = q.fract().sub(0.5).mul(dir.mul(c.sec.mul(TAU / 12).sin()).mul(0.06).add(1)).add(0.5).clamp(0, 1), y = f.mul(BW);
  const NS = choose(c, 8, [6, 8, 12]); // the roll's symmetry order, shared by every radial piece
  const u = a.add(dir.mul(c.dir).mul(mix(0.7, 1.3, c.rnd(13))).mul(c.phrase).div(i.mod(3).add(4)));
  const cell = (w, shift = 0) => {
    const n = rm.mul(TAU).div(w).floor().max(3);
    const tc = u.mul(n).add(shift).fract().sub(0.5);
    const cw = r.mul(TAU).div(n);
    return { tc, cw, x: tc.mul(cw), id: u.mul(n).add(shift).floor(), n };
  };
  const K = colours(c.sec, i), A = K.A, B = K.B, H = K.H, H2 = K.H2;
  const W = vec3(0.95, 0.95, 0.95);
  const inset = (m) => f.sub(0.5).abs().sub(m).mul(BW);

  // 0: three staggered rows of target dots
  const j0 = f.mul(3).floor(), fy0 = f.mul(3).fract().sub(0.5).mul(BW / 3);
  const c0 = cell(BW / 3, j0.mul(0.5));
  const l0 = length(vec2(c0.x, fy0));
  const col0 = mix(A.mul(fill(inset(0.47))).mul(fill(l0.sub(0.58)).oneMinus()), target(l0, 0.44, H, H2), fill(l0.sub(0.44))), d0 = l0.sub(0.44);

  // 1: black/white radial stripes, each white stripe carrying a row of body-colour dots
  const c1 = cell(choose(c, 16, [1.0, 1.3, 1.9]));
  const d1 = max(c1.tc.abs().sub(0.25).mul(c1.cw), inset(0.44));
  const l1 = length(vec2(c1.x, f.mul(4).fract().sub(0.5).mul(BW / 4)));
  const col1 = mix(W.mul(fill(d1)), A, fill(l1.sub(0.17)).mul(fill(d1)));

  // 2: scallop petals filled with moving contour lines, a hot target at each root
  const c2 = cell(choose(c, 15, [2.3, 3.0, 4.2]));
  const l2 = length(vec2(c2.x, y.sub(0.2)));
  const d2 = max(l2.sub(c2.cw.mul(0.47)), float(0.2).sub(y));
  const con2 = stripes(l2.mul(1.7).sub(c.bar.mul(0.25)), 1, 0.12);
  const col2 = mix(mix(A, B, con2).mul(fill(d2)).mul(line(d2.add(0.14), 0.07).oneMinus()), target(l2, 0.55, H, H2), fill(l2.sub(0.62)));

  // 3: white triangle teeth, a body dot in each tooth, a hot bead in each gap
  const c3 = cell(choose(c, 17, [1.2, 1.6, 2.4]));
  const tri = c3.tc.abs().mul(2);
  const d3 = max(f.sub(float(0.92).sub(tri.mul(0.84))).mul(BW * 0.55), float(0.08).sub(f).mul(BW));
  const l3 = length(vec2(c3.x, y.sub(BW * 0.33)));
  const g3 = length(vec2(c3.tc.abs().sub(0.5).mul(c3.cw), y.sub(BW * 0.7)));
  const col3 = mix(W.mul(fill(d3)), B, fill(l3.sub(0.2))).add(target(g3, 0.3, H, A));

  // 4: two thin bright rims with two staggered rows of beads between
  const dL = min(f.sub(0.1).abs(), f.sub(0.9).abs()).mul(BW).sub(0.08);
  const g4 = f.sub(0.18).div(0.64), j4 = g4.mul(2).floor();
  const c4 = cell(0.95, j4.mul(0.5));
  const l4 = length(vec2(c4.x, g4.mul(2).fract().sub(0.5).mul(BW * 0.32)));
  const in4 = g4.greaterThan(0).and(g4.lessThan(1)).select(1, 0);
  const col4 = H.mul(1.15).mul(fill(dL)).add(target(l4, 0.36, H2, A).mul(in4));
  const d4 = min(dL, select(in4.greaterThan(0.5), l4.sub(0.36), float(9)));

  // 5: a pinstriped body band with black portholes, a target in each
  const c5 = cell(3.3);
  const l5 = length(vec2(c5.x, y.sub(BW * 0.5)));
  const dI = inset(0.43);
  const solid = fill(dI).mul(fill(l5.sub(1.22)).oneMinus());
  const col5 = mix(A, B, stripes(f, 6, 0.12)).mul(solid).add(target(l5, 0.98, H, H2));
  const d5 = min(max(dI, float(1.22).sub(l5)), l5.sub(0.98));

  const k = i.mod(6);
  const pick = (v0, v1, v2, v3, v4, v5) => select(k.lessThan(0.5), v0, select(k.lessThan(1.5), v1, select(k.lessThan(2.5), v2,
    select(k.lessThan(3.5), v3, select(k.lessThan(4.5), v4, v5)))));
  const col = pick(col0, col1, col2, col3, col4, col5);
  const d = pick(d0, d1, d2, d3, d4, d5);

  // ---- THE DECK: three more bodies the bands can wear, dealt by zone and phrase ----
  const sel4 = (v, a0, a1, a2, a3) => select(v.lessThan(0.5), a0, select(v.lessThan(1.5), a1, select(v.lessThan(2.5), a2, a3)));
  const barN = c.bar.floor();
  // bead-mandala: rows of raised beads, each row its own shape (sphere, cube, chevron, drop), a chase along each row
  const jb = f.mul(2).floor(), fyb = f.mul(2).fract().sub(0.5).mul(BW / 2), ri = i.mul(2).add(jb), shp = ri.mod(4);
  const cb = cell(1.55, jb.mul(0.5)), xb = cb.x;
  const tB = fyb.add(0.12), ttB = select(tB.greaterThan(0), tB.mul(0.6), tB);
  const sdB = sel4(shp, length(vec2(xb, fyb)).sub(0.5), max(xb.abs(), fyb.abs()).sub(0.42),
    max(fyb.add(xb.abs().mul(0.8)).sub(0.2).abs().sub(0.16), xb.abs().sub(0.5)),
    length(vec2(xb.mul(tB.max(0).mul(3).add(1)), ttB)).sub(0.38));
  const capB = fill(length(vec2(xb.add(0.13), fyb.sub(0.13))).sub(0.11)).mul(fill(sdB.add(0.1)));
  const rowC = sel4(shp, A, H, B, H2);
  const colBd = mix(mix(rowC.mul(fill(sdB)), vec3(0), line(sdB.add(0.13), 0.035)), W, capB);
  const chase = cb.id.sub(barN.mul(dir).mul(c.dir)).add(8000).mod(8).lessThan(0.5).select(1, 0);
  // op-art-field: black/white stripes that bulge like cloth; inside each bulge they break into a bent checker
  const bump = a.mul(TAU).mul(NS).cos().mul(r.mul(0.21).sub(c.sec.mul(TAU / 48).mul(c.dir)).sin());
  const phO = r.mul(0.45).add(bump.mul(1.1)), fO = phO.fract();
  const s1 = fill(fO.sub(0.5).abs().sub(0.25).mul(2.2));
  const s2 = a.mul(NS).mul(4).add(bump.mul(0.35)).fract().lessThan(0.5).select(1, 0);
  const opM = select(bump.greaterThan(0.3), s1.sub(s2).abs(), s1);
  const colOp = mix(W.mul(opM), A.mul(opM), fill(fO.sub(0.5).abs().sub(0.045).mul(2.2)));
  const dOp = fO.sub(0.5).abs().sub(0.25).mul(2.2);
  // moire: two fine sets of circles whose centres slide apart along the mirror axis, so slow fringes crawl
  const eM = c.sec.mul(TAU / 48).sin().mul(2.5).add(4);
  const ring = (cz) => { const l = length(vec2(p.x, p.y.sub(cz))).div(0.9).fract().sub(0.5).abs().sub(0.3).mul(0.9); return fill(l.negate()); };
  const m1 = ring(eM), m2 = ring(eM.negate());
  const colMo = A.mul(m1).add(B.mul(m2)).add(H.mul(m1).mul(m2).mul(0.7));
  const dMo = float(0.5).sub(max(m1, m2));
  // aztec-steps: stepped crosses and stepped pyramids (pointing outward) tiled two rows a band in blue and teal,
  // each glyph double-stroked with a ringed dark bead at its heart; the tiling pattern is the roll's (checker, rows, crosses)
  const SA = BW / 2, ca = cell(SA, jb.mul(0.5)), gx = ca.x.div(SA), gy = fyb.div(SA), qx = gx.abs(), qy = gy.abs();
  const bx = (w, h, yc = 0) => max(qx.sub(w), gy.sub(yc).abs().sub(h));
  const crossA = min(bx(0.11, 0.4), min(bx(0.25, 0.25), bx(0.4, 0.11)));
  const pyrA = min(bx(0.42, 0.09, -0.32), min(bx(0.31, 0.09, -0.14), min(bx(0.2, 0.09, 0.04), bx(0.09, 0.1, 0.23))));
  const azP = c.pick(20, 3);
  const azK = select(azP.lessThan(0.5), ca.id.add(ri).mod(2), select(azP.lessThan(1.5), ri.mod(2), ca.id.mod(3).lessThan(0.5).select(1, 0)));
  const sdA = select(azK.lessThan(0.5), crossA, pyrA).mul(SA);
  const TEAL = vec3(0.0, 0.85, 0.62), BLUE = vec3(0.02, 0.12, 1.0);
  const lA = length(vec2(ca.x, fyb));
  const colAz = mix(BLUE.mul(fill(sdA)).mul(0.55), TEAL, line(sdA, 0.07)).add(TEAL.mul(line(sdA.add(0.17), 0.03)).mul(0.7))
    .mul(fill(lA.sub(0.2)).oneMinus()).add(K.fam.H.mul(line(lA.sub(0.14), 0.04)));
  const dAz = sdA;
  const phI = c.sec.sub(0.35).div(12).floor().max(0), zone = r.div(30).floor().min(2);
  const vi = phI.add(zone).add(c.pick(18, 5)).mod(5);
  const ov = phI.add(c.rnd(18).mul(12).floor()).mod(3); // 0 graphite-and-gold, 1 keyhole depths, 2 soft mask
  // layer-keyhole + depth-parallax: through the black between the shapes, the same dot rows twice more, deeper, slower, dimmer
  const deepDots = (pitch, rot, rad) => {
    const rq = r.div(pitch), ry = rq.fract().sub(0.5).mul(pitch), n = rq.floor().add(0.5).mul(TAU).floor().max(3);
    const tc = a.add(rot).mul(n).add(rq.floor().mul(0.5)).fract().sub(0.5);
    return fill(length(vec2(tc.mul(r).mul(TAU).div(n), ry)).sub(rad));
  };
  const deep = K.fam.B.mul(deepDots(2.2, c.phrase.div(8).mul(c.dir), 0.55)).mul(0.3)
    .add(K.fam.A.mul(deepDots(1.3, c.phrase.div(-16).mul(c.dir), 0.3)).mul(0.12));

  // reset: neon line-art outside the refilling radius
  const Rf = resetR(c.sec);
  const la = fill(Rf.sub(r));
  // strokes draw themselves on round the band, and their hue drifts along their length
  const drawn = fill(a.mul(2).add(0.5).add(i.mul(0.19)).fract().sub(c.sec.sub(SEC.reset[0]).div(3)));
  const lineCol = mix(K.fam.A, K.fam.B, u.mul(3).add(c.sec.div(24)).mul(TAU).sin().mul(0.5).add(0.5)).mul(1.2);
  const kl = kickAt(c, r);
  const lam = lit(c, r, a, i);
  const sel5 = (v, a0, a1, a2, a3, a4) => select(v.lessThan(3.5), sel4(v, a0, a1, a2, a3), a4);
  const colV = sel5(vi, col, colBd, colOp, colMo, colAz), dV = sel5(vi, d, sdB, dOp, dMo, dAz);
  const lamV = max(lam, vi.sub(1).abs().lessThan(0.5).select(chase, 0));
  const keyOn = max(ov.sub(1).abs().lessThan(0.5).select(1, 0), K.fam.full.select(1, 0));
  const bandBody = shade(colV, lamV).mul(kl.mul(lamV).mul(0.3).add(1)).add(deep.mul(fill(dV).oneMinus()).mul(keyOn));

  // BLOOM = PHYLLOTAXIS. Bead n sits at angle n * 137.508 deg, radius C * sqrt(n). The nearest bead to this pixel is
  // found exactly: the beads are a lattice in (n, turn) space, solved in the two Fibonacci bases that are reduced
  // at this radius. The 13 / 21 / 34 parastichy spirals are lit as chases stepping one arm a bar.
  const s = r.mul(r).div(PC * PC), keyF = r.mul(2.37 / PC);
  let Fa = float(FIB[0]), Fb = float(FIB[1]), Fc = float(FIB[2]);
  for (let q = 2; q < FIB.length - 1; q++) {
    const on = keyF.greaterThan(FIB[q]);
    Fa = select(on, FIB[q - 1], Fa); Fb = select(on, FIB[q], Fb); Fc = select(on, FIB[q + 1], Fc);
  }
  const eOf = (F) => { const x = F.mul(GA); return x.sub(x.add(0.5).floor()); };
  const turnOf = (n) => n.mul(0.375).fract().add(n.mul(GA - 0.375)); // n * golden angle, kept exact
  let bestD = float(1e6), bestN = float(1);
  for (const [P, Q] of [[Fa, Fb], [Fb, Fc]]) {
    const eP = eOf(P), eQ = eOf(Q), det = P.mul(eQ).sub(Q.mul(eP));
    const ca = s.mul(eQ).sub(a.mul(Q)).div(det).floor(), cb = a.mul(P).sub(s.mul(eP)).div(det).floor();
    for (let ii = 0; ii < 2; ii++) for (let jj = 0; jj < 2; jj++) {
      const n = ca.add(ii).mul(P).add(cb.add(jj).mul(Q)).add(0.5).floor().max(1);
      const dr = r.sub(n.sqrt().mul(PC)), dt = a.sub(turnOf(n)).add(0.5).fract().sub(0.5).mul(r).mul(TAU);
      const dd = dr.mul(dr).add(dt.mul(dt)), nearer = dd.lessThan(bestD);
      bestN = select(nearer, n, bestN); bestD = select(nearer, dd, bestD);
    }
  }
  const lp = bestD.sqrt(), barI = c.bar.floor();
  const arm = (F, k) => bestN.add(F.mul(400)).sub(k).mod(F).mul(2).mod(F).lessThan(0.5).select(1, 0); // two opposite arms of F
  const stepI = barI.mul(c.dir).add(4000);
  const a13 = arm(choose(c, 19, [8, 13, 21]), stepI), a21 = arm(choose(c, 19, [13, 21, 34]), stepI.negate().add(8000)), a34 = arm(choose(c, 19, [21, 34, 55]), stepI.mul(2));
  const K0 = colours(c.sec, float(0));
  const beadC = select(a13.greaterThan(0.5), target(lp, 0.62, K0.H, K0.H2), select(a21.greaterThan(0.5), target(lp, 0.62, K0.A, K0.H), target(lp, 0.62, K0.B, K0.A)));
  const pL = max(a13, max(a21, a34)).max(kl.mul(0.6));
  const phyBody = shade(beadC, pL).mul(kl.mul(0.25).add(1));

  // RESET = THE {7,3} HYPERBOLIC TILING of the Poincare disc, as line-art. The pixel is folded into the (2,3,7)
  // triangle: 7-fold dihedral fold about the centre, then inversion in the heptagon's edge circle, 7 times.
  const z0x = p.y.div(90), z0y = p.x.div(90), r02 = z0x.mul(z0x).add(z0y.mul(z0y));
  // the Mobius slide z -> (z + t) / (1 + t z) along the mirror axis: the floor drifts without leaving the disc
  const tM = c.sec.mul(TAU / 24).sin().mul(0.3).mul(c.dir), nX = z0x.add(tM), dX = tM.mul(z0x).add(1), dY = tM.mul(z0y), dn = dX.mul(dX).add(dY.mul(dY));
  let zx = nX.mul(dX).add(z0y.mul(dY)).div(dn), zy = z0y.mul(dX).sub(nX.mul(dY)).div(dn), gen = float(0);
  const fold7 = () => {
    const rr = vec2(zx, zy).length(), af = atan2(zy, zx).add(Math.PI / 7 + TAU).mod(TAU / 7).sub(Math.PI / 7).abs();
    zx = rr.mul(af.cos()); zy = rr.mul(af.sin());
  };
  for (let it = 0; it < 7; it++) {
    fold7();
    const dx = zx.sub(HD), dd = dx.mul(dx).add(zy.mul(zy)).max(1e-5), ins = dd.lessThan(HR * HR), kk = float(HR * HR).div(dd);
    zx = select(ins, dx.mul(kk).add(HD), zx); zy = select(ins, zy.mul(kk), zy); gen = gen.add(ins.select(1, 0));
  }
  fold7();
  const hs = float(1).sub(r02).max(0).div(float(1).sub(zx.mul(zx).add(zy.mul(zy))).max(0.05)).mul(90); // disc -> metres here
  const dEdge = vec2(zx.sub(HD), zy).length().sub(HR).mul(hs);
  const dSpoke = min(zy, zx.mul(Math.sin(Math.PI / 7)).sub(zy.mul(Math.cos(Math.PI / 7))).abs()).mul(hs);
  const dHub = vec2(zx, zy).length().mul(hs);
  const rimFade = smoothstep(0.02, 0.14, float(1).sub(r02));
  const genOn = gen.lessThan(c.sec.sub(SEC.reset[0]).div(0.75)).select(1, 0); // the tiling draws itself on, ring by ring
  const genLit = gen.sub(barI).mod(4).lessThan(0.5).select(1.25, 0.3);       // one generation lit, stepping out a bar
  const drift = mix(K.fam.A, K.fam.B, zy.mul(9).add(gen.mul(0.37)).add(c.sec.div(24)).mul(TAU).sin().mul(0.5).add(0.5));
  const hyp = drift.mul(line(dEdge, 0.1)).mul(genLit).add(K.fam.B.mul(line(dSpoke, 0.03)).mul(0.22))
    .add(target(dHub, 0.9, K.fam.H, K.fam.A).mul(genLit)).mul(rimFade).mul(genOn);

  const body = mix(mix(bandBody, phyBody, win(c.sec, SEC.bloom)), hyp, la);

  // bloom: the hard growing edge with its white rim
  const R = growR(c.sec);
  const rimOn = c.sec.greaterThan(SEC.pulse[0]).and(R.lessThan(90.5)).select(1, 0);
  const rim = line(r.sub(R), 0.14).mul(rimOn).mul(1.6).add(line(r.sub(Rf), 0.14).mul(Rf.lessThan(95).and(Rf.greaterThan(0.5)).select(1.6, 0)));
  const seed = fill(r.sub(0.45)).mul(smoothstep(SEC.pulse[0] + 0.5, SEC.pulse[0], c.sec)).mul(0.5);
  // the kick ripple: one thin ring a beat, running the whole radius
  const ripple = line(r.sub(c.beat.fract().mul(90)), 0.16).mul(c.kick.pow(0.3)).mul(0.9);

  const m = new MeshBasicNodeMaterial();
  m.colorNode = body.mul(fill(r.sub(R))).add(vec3(1, 1, 1).mul(rim)).add(K.fam.H.mul(ripple).mul(fill(r.sub(R)))).add(vec3(0.3, 0.4, 1).mul(seed)).mul(endFade(c.sec));
  m.colorNode = roll(c, m.colorNode);
  // graphite-and-gold: the whole field embossed near-black, only the gold teeth lit where the hand passes
  const inBloom = win(c.sec, SEC.bloom);
  const ggOn = ov.lessThan(0.5).and(K.fam.full.not()).select(1, 0).mul(inBloom.oneMinus()).mul(la.oneMinus()).mul(fill(r.sub(R)));
  const lumG = m.colorNode.x.mul(0.3).add(m.colorNode.y.mul(0.6)).add(m.colorNode.z.mul(0.1)).min(1);
  const teeth = k.sub(3).abs().lessThan(0.5).select(fill(d3), 0);
  m.colorNode = mix(m.colorNode, vec3(0.75, 0.82, 1.0).mul(lumG.mul(0.1)).add(vec3(1.0, 0.62, 0.05).mul(teeth).mul(lam.mul(1.2).add(0.08))).mul(endFade(c.sec)), ggOn);
  // THE LAYER SCORE: a real cutout that opens from the centre like an iris. Only the grown part is surface;
  // and the self-cutout: on every 2nd bar the stripe bands swap which of them have their black gaps cut away.
  const grown = max(fill(r.sub(R).sub(0.3)), fill(r.sub(0.45)).mul(c.sec.lessThan(SEC.pulse[0] + 0.5).select(1, 0)));
  const swap = i.div(6).floor().add(c.bar.div(2).floor()).mod(2);
  const cutV = c.pick(12, 3); // which band kind is cut away this roll: stripes, teeth or dot rows
  const cutK = select(cutV.lessThan(0.5), float(1), select(cutV.lessThan(1.5), float(3), float(0)));
  const gap = select(cutV.lessThan(0.5), fill(d1).oneMinus(), select(cutV.lessThan(1.5), fill(d3).oneMinus().mul(fill(g3.sub(0.3)).oneMinus()), fill(d0).oneMinus()));
  const hole = k.sub(cutK).abs().lessThan(0.5).and(swap.lessThan(0.5)).select(gap.mul(fill(inset(0.44))), 0);
  // soft-mask-reveal: a lobed ring, soft-edged by dither, wipes slowly outward and uncovers what lies under the field
  const softOn = max(ov.sub(2).abs().lessThan(0.5).select(1, 0), K.fam.full.select(1, 0)).mul(inBloom.oneMinus()).mul(la.oneMinus());
  const Rm = c.phrase.div(2).fract().mul(70).add(12).add(a.mul(TAU).mul(NS).cos().mul(5));
  const dith = p.x.mul(91.7).add(p.y.mul(57.3)).sin().mul(43758.5).fract();
  const soft = smoothstep(6, 2, r.sub(Rm).abs()).greaterThan(dith.mul(0.9).add(0.05)).select(1, 0).mul(softOn);
  const seedOn = c.sec.lessThan(SEC.pulse[0] + 0.5).select(1, 0);
  m.opacityNode = max(shown(c, "field", r.div(90)), seedOn).mul(grown).mul(float(1).sub(hole)).mul(float(1).sub(soft));
  m.alphaTest = 0.5;
  m.fog = false;
  return m;
}
