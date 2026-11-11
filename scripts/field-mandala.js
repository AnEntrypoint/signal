// The mandala field: 28 concentric bands painted in polar space from (0,0,0), six kinds in a repeating order,
// neighbours counter-rotating, a kick ripple running outward, growing in bloom, line-art in reset.
import { atan2, positionWorld, float, vec2, vec3, length, fwidth, smoothstep, select, mix, min, max } from "builtin/tsl";
import { MeshBasicNodeMaterial } from "builtin/three";
import { tripClock, SEC, stripes, HUE, shown, win } from "./lib/trip.js";
import { BW, growR, resetR, endFade, colours, breath, mirrorTurn, kickAt, lit, shade } from "./field-lib.js";

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

  const q = r.div(BW), i = q.floor(), f = q.fract(), y = f.mul(BW), rm = i.add(0.5).mul(BW);
  const dir = i.mod(2).mul(2).sub(1);
  const u = a.add(dir.mul(c.phrase).div(i.mod(3).add(4)));
  const cell = (w, shift = 0) => {
    const n = rm.mul(TAU / w).floor().max(3);
    const tc = u.mul(n).add(shift).fract().sub(0.5);
    const cw = r.mul(TAU).div(n);
    return { tc, cw, x: tc.mul(cw) };
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
  const c1 = cell(1.3);
  const d1 = max(c1.tc.abs().sub(0.25).mul(c1.cw), inset(0.44));
  const l1 = length(vec2(c1.x, f.mul(4).fract().sub(0.5).mul(BW / 4)));
  const col1 = mix(W.mul(fill(d1)), A, fill(l1.sub(0.17)).mul(fill(d1)));

  // 2: scallop petals filled with moving contour lines, a hot target at each root
  const c2 = cell(3.0);
  const l2 = length(vec2(c2.x, y.sub(0.2)));
  const d2 = max(l2.sub(c2.cw.mul(0.47)), float(0.2).sub(y));
  const con2 = stripes(l2.mul(1.7).sub(c.bar.mul(0.25)), 1, 0.12);
  const col2 = mix(mix(A, B, con2).mul(fill(d2)).mul(line(d2.add(0.14), 0.07).oneMinus()), target(l2, 0.55, H, H2), fill(l2.sub(0.62)));

  // 3: white triangle teeth, a body dot in each tooth, a hot bead in each gap
  const c3 = cell(1.6);
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

  // reset: neon line-art outside the refilling radius
  const Rf = resetR(c.sec);
  const la = fill(Rf.sub(r));
  // strokes draw themselves on round the band, and their hue drifts along their length
  const drawn = fill(a.mul(2).add(0.5).add(i.mul(0.19)).fract().sub(c.sec.sub(SEC.reset[0]).div(3)));
  const lineCol = mix(K.fam.A, K.fam.B, u.mul(3).add(c.sec.div(24)).mul(TAU).sin().mul(0.5).add(0.5)).mul(1.2);
  const kl = kickAt(c, r);
  const lam = lit(c, r, a, i);
  const bandBody = shade(col, lam).mul(kl.mul(lam).mul(0.3).add(1));

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
  const arm = (F, k) => bestN.sub(k).mod(F).mul(2).mod(F).lessThan(0.5).select(1, 0); // two opposite arms of F
  const a13 = arm(13, barI), a21 = arm(21, barI.negate().add(2100)), a34 = arm(34, barI.mul(2));
  const K0 = colours(c.sec, float(0));
  const beadC = select(a13.greaterThan(0.5), target(lp, 0.62, K0.H, K0.H2), select(a21.greaterThan(0.5), target(lp, 0.62, K0.A, K0.H), target(lp, 0.62, K0.B, K0.A)));
  const pL = max(a13, max(a21, a34)).max(kl.mul(0.6));
  const phyBody = shade(beadC, pL).mul(kl.mul(0.25).add(1));

  // RESET = THE {7,3} HYPERBOLIC TILING of the Poincare disc, as line-art. The pixel is folded into the (2,3,7)
  // triangle: 7-fold dihedral fold about the centre, then inversion in the heptagon's edge circle, 7 times.
  let zx = p.y.div(90), zy = p.x.div(90), gen = float(0);
  const r02 = zx.mul(zx).add(zy.mul(zy));
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
  // THE LAYER SCORE: a real cutout that opens from the centre like an iris. Only the grown part is surface;
  // and the self-cutout: on every 2nd bar the stripe bands swap which of them have their black gaps cut away.
  const grown = max(fill(r.sub(R).sub(0.3)), fill(r.sub(0.45)).mul(c.sec.lessThan(SEC.pulse[0] + 0.5).select(1, 0)));
  const swap = i.div(6).floor().add(c.bar.div(2).floor()).mod(2);
  const hole = k.greaterThan(0.5).and(k.lessThan(1.5)).and(swap.lessThan(0.5)).select(fill(d1).oneMinus().mul(fill(inset(0.44))), 0);
  const seedOn = c.sec.lessThan(SEC.pulse[0] + 0.5).select(1, 0);
  m.opacityNode = max(shown(c, "field", r.div(90)), seedOn).mul(grown).mul(float(1).sub(hole));
  m.alphaTest = 0.5;
  m.fog = false;
  return m;
}
