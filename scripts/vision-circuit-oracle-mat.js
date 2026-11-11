// THE CIRCUIT ORACLE (vision being "circuit-oracle"): a serene mirrored face whose features are circuit traces,
// 45-degree routed lines ending in ROUND via beads; current runs out of a third-eye node along the traces and lights
// each via in the order it reaches it. Her world is the board itself as a mandala.
// ONE SCENE, FIVE LAYERS at five depths, one script (params.layer, baked), each on its OWN motion:
//   "world" z -30  SCROLLS   the board: 8-fold spokes, 45-degree jogs and log-spaced bus rings flowing outward;
//                            opaque black, it grows from her outward ALONG ITS TRACES (spokes lead, rings follow);
//                            kick pulses run out along the traces; test-point glyphs ring each sector.
//   "ring"  z -12  TURNS     a bus ring + via-bead ring one way, a ring of via-ended ticks the other (soft, additive)
//   "being" z   0  BREATHES  third-eye node, the face's traces drawn by the current, black face body, eye wells,
//                            a seeded detail trace (crown / tears / ear coil), eyes opening at the culmination
//   "veil"  z +10  DRIFTS    loose trace fragments (black-bodied, round vias) rising up the sides; at the culmination
//                            a second set of eye-well via rows slides into register over hers: MOIRE EYES that lock
//   "fore"  z +22  UNDULATES near solder beads bobbing on a travelling swell in the corners
//   the CABLE-WORMS are real 3D tubes winding in depth: scripts/vision-circuit-oracle-worm-geo.js / -worm-mat.js
// being / veil / fore / world are CUTOUT (alphaTest, depth-writing): a near shape hides what is behind it.
// THE SCORE (u of the slot): 0 third-eye node / .06 traces drawn by the current, vias light in order / .05 face body /
// .25 world grows along its traces / .4 bus ring, .44 bead ring, .48 counter ticks / .5 test-point glyphs, .5 detail
// trace, .55 eye wells / .55 cable-worms, .62 fragments, .66 solder beads / .8 moire eyes slide in, .86 lock + eyes
// open + one cable dark / .93.. everything leaves last-in first-out through its own mask, the third eye last.
// Seed channels 400..419: 0 hue family, 1 hot accent, 2 detail set, 3 secondary spokes, 4 board scroll sense,
// 5 ring bead count, 6 ring sense, 7 cable count, 8 cable skin order, 9 moire variant, 10 fragment count,
// 11 which cable goes dark, 12 current speed, 13 fore rows, 14 world bus spacing, 15 glyph radius.
import { MeshBasicNodeMaterial, AdditiveBlending, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, mix, atan2, fwidth, select } from "builtin/tsl";
import { tripClock, visionShown, visionU, climb, maskDraw, maskBeads, maskClock, nib, stripes } from "./lib/trip.js";

const TAU = 6.28318, F = 1.5;
const DEPTH = { world: 104, ring: 86, being: 74, veil: 64, fore: 52 };
const OY = 4.5, EY = 13.5;                                    // face centre, third eye (being metres)
const EYE = [10.5, 7.5];                                      // the eye-well centre (right; mirrored)
// her face's traces, right half (units x F = metres), [x, y, via?]; off = the current's distance before the start
const TR = [
  { off: 1.4, pts: [[0, 10.4], [0, 18]] },
  { off: 1.0, pts: [[1.4, 9.6], [3.3, 11.5], [9, 11.5], [11, 9.5, 1]] },
  { off: 1.3, pts: [[0.7, 7.9], [1.2, 7.4], [1.2, 0.5], [2.8, -1.1, 1]] },
  { off: 6.0, pts: [[3.5, 5, 1], [5, 3.5], [9, 3.5], [10.5, 5, 1]] },
  { off: 15, pts: [[0, -5.5], [2.5, -5.5], [4, -4, 1]] },
  { off: 9.0, pts: [[0, 18, 1], [6, 18, 1], [12, 12, 1], [12, 2, 1], [10, 0], [10, -6, 1], [4, -12, 1], [0, -12, 1]] },
].map((t) => ({ off: t.off * F, pts: t.pts.map(([x, y, v]) => [x * F, y * F, v]) }));
const VIAS = [];
let SMAX = 0;
for (const t of TR) {
  let L = t.off;
  t.pts.forEach((p, i) => { if (i) L += Math.hypot(p[0] - t.pts[i - 1][0], p[1] - t.pts[i - 1][1]); if (p[2]) VIAS.push([p[0], p[1], L]); });
  SMAX = Math.max(SMAX, L);
}
const LID = [[3.5, 5], [5, 6.5], [9, 6.5], [10.5, 5]].map(([x, y]) => [x * F, y * F]);
// the seeded detail trace (3 points, units): crown ray / tear chain / ear coil
const DET = [
  [[0, 18.6], [0, 21], [3, 24]],
  [[7, 3.2], [7, -1.5], [8.5, -3]],
  [[12, 7], [13.5, 7], [15, 5.5]],
];

const is = (v, i) => step(v.sub(i).abs(), 0.5);
const inv = (x) => float(1).sub(x);
function seg(q, a, b) {                                       // a, b: vec2 nodes; returns { d, h, len }
  const ab = b.sub(a), pa = q.sub(a);
  const h = pa.dot(ab).div(ab.dot(ab).max(1e-4)).clamp(0, 1);
  return { d: pa.sub(ab.mul(h)).length(), h, len: ab.length() };
}
function poly(q, pts, off = 0) {                              // constant points: min distance and current-distance s
  let d = float(1000), s = float(0), L = off;
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i], b = pts[i + 1], len = Math.hypot(b[0] - a[0], b[1] - a[1]);
    const g = seg(q, vec2(a[0], a[1]), vec2(b[0], b[1]));
    s = select(g.d.lessThan(d), g.h.mul(len).add(L), s);
    d = d.min(g.d);
    L += len;
  }
  return { d, s, L };
}
// a ring pattern of round beads: rows every sp metres, beads every ~sp along each row, rotated by rot (rad per row)
function wellBeads(p, sp, rot, rb) {
  const r = p.length(), j = r.div(sp).round().max(1);
  const nj = j.mul(TAU).floor();
  const a = atan2(p.y, p.x.add(1e-4)).div(TAU).add(j.mul(rot)).mul(nj);
  const dd = vec2(r.sub(j.mul(sp)), a.add(0.5).fract().sub(0.5).mul(TAU).mul(j.mul(sp)).div(nj)).length();
  return { dd, j, r, in: inv(smoothstep(rb.sub(0.06), rb, dd)) };
}

export function material(ctx) {
  const layer = ctx.params.layer ?? "being";
  const c = tripClock(ctx);
  const u = visionU(ctx, c);
  const io = (a, b, x, y) => smoothstep(a, b, u).mul(inv(smoothstep(x, y, u)));
  const rn = (n) => c.rnd(400 + n), pk = (n, k) => c.pick(400 + n, k);
  const sense = (n) => step(0.5, rn(n)).mul(2).sub(1);
  const fam = pk(0, 3), hot = pk(1, 3);
  const blue = vec3(0.05, 0.12, 1.0), violet = vec3(0.45, 0.05, 1.0), ice = vec3(0.45, 0.6, 1.0), W = vec3(1, 1, 1);
  const A = blue.mul(is(fam, 0)).add(violet.mul(is(fam, 1))).add(blue.mul(is(fam, 2)));   // body
  const B = violet.mul(is(fam, 0)).add(blue.mul(is(fam, 1))).add(ice.mul(is(fam, 2)));    // accent
  const H = vec3(1.0, 0.05, 0.6).mul(is(hot, 0)).add(vec3(1.0, 0.42, 0.02).mul(is(hot, 1))).add(vec3(0.1, 1.0, 0.15).mul(is(hot, 2)));
  const q = positionGeometry.xy.mul(74 / DEPTH[layer]);     // every layer draws in the being's metres
  const aa = fwidth(q.x).mul(1.2).max(0.02);
  const stroke = (d, w) => inv(smoothstep(float(w), aa.add(w), d));
  const live = visionShown(ctx, c, 0);
  const kickOn = step(0.001, c.kick);
  const O = vec2(0, OY);
  const lock = smoothstep(0.86, 0.905, u).mul(climb(c).mul(0.3).add(0.7));
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;

  // ------------------------------------------------------------------ WORLD: the board mandala (scrolls outward)
  if (layer === "world") {
    const p = q.sub(O), r = p.length().max(0.01);
    const an = atan2(p.y, p.x.add(1e-4)).div(TAU / 8);
    const fa = an.add(0.5).fract().sub(0.5).abs();                     // 0 on a spoke .. 0.5 between
    const xs = fa.mul(TAU / 8).mul(r);                                   // metres off the nearest spoke
    const kq = float(1.3).add(rn(14).mul(0.12)), lk = kq.log();
    const lr = r.div(8).log().div(lk).sub(c.real.mul(0.045).mul(sense(4)));   // the bus rings flow out (or in)
    const bw = r.mul(lk), fn = lr.add(0.5).fract().sub(0.5).mul(bw), fr = lr.fract();
    const w = r.mul(0.004).max(0.1);
    const grow = io(0.25, 0.45, 0.955, 0.995), Rg = grow.mul(215);
    const reach = Rg.mul(inv(fa.mul(0.9)));
    const ahead = r.sub(reach);
    const cover = step(r, reach).max(step(fn.abs(), bw.mul(0.12)).mul(step(ahead, 16))).max(step(xs, 1.2).mul(step(ahead, 26)))
      .mul(step(0.004, grow));
    const bus = stroke(fn.sub(bw.mul(0.05)).abs(), w).max(stroke(fn.add(bw.mul(0.05)).abs(), w));
    const spoke = stroke(xs, w.mul(1.3)).max(stroke(fa.sub(0.5).abs().mul(TAU / 8).mul(r), w).mul(step(0.5, rn(3))));
    const jog = stroke(xs.sub(fr.mul(bw).min(bw.mul(0.42))).abs().mul(0.7071), w).mul(step(18, r));
    const vr = bw.mul(0.07).max(0.35);
    const v1 = vec2(xs, fn).length(), v2 = vec2(xs.sub(bw.mul(0.42)), fn).length();
    const vias = stroke(v1.sub(vr).abs(), w).max(stroke(v2.sub(vr).abs(), w)).mul(step(14, r));
    const vdot = inv(smoothstep(vr.mul(0.4), vr.mul(0.4).add(aa), v1.min(v2))).mul(step(14, r));
    const front = c.beat.fract().mul(140);
    const kl = smoothstep(7, 0, r.sub(front).abs()).mul(kickOn).mul(smoothstep(140, 60, front));
    const edgeGlow = smoothstep(3, 0, ahead.abs()).mul(step(0.004, grow)).mul(inv(step(0.999, grow)));
    const traces = bus.max(spoke).max(jog);
    let col = A.mul(traces).mul(float(0.2).add(kl.mul(0.9)).add(edgeGlow.mul(0.6)));
    col = col.add(B.mul(vias).mul(float(0.35).add(kl))).add(mix(B, H, kl).mul(vdot).mul(float(0.25).add(kl.mul(1.2))));
    // test-point glyphs: one in each sector, ringed, placed in order round the board
    const pg = io(0.5, 0.62, 0.95, 0.975), R1 = float(44).add(rn(15).mul(14));
    const sm = an.floor().add(0.5).mul(TAU / 8);
    const g = p.sub(vec2(sm.cos(), sm.sin()).mul(R1)).length();
    const ord = an.floor().add(8).mod(8).div(8);
    const gl = stroke(g.sub(1.3).abs(), 0.12).max(stroke(g.sub(2.2).abs(), 0.1)).max(stroke(g.sub(3.1).abs(), 0.18)).max(inv(smoothstep(0.5, 0.5 + 0.05, g)));
    const glyph = gl.mul(maskBeads(pg, ord)).mul(step(g, 3.6));
    col = mix(col, mix(B, W, 0.5).mul(float(0.6).add(kl)), glyph);
    m.colorNode = col;
    m.opacityNode = cover.mul(live);
    m.alphaTest = 0.5;
    return m;
  }

  // ------------------------------------------------------------------ RING: the bus rings (turn, soft additive)
  if (layer === "ring") {
    const p = q.sub(O), r = p.length().max(0.01);
    const ang = atan2(p.x, p.y.add(1e-4));                             // from the top, for the clock mask
    const p1 = io(0.4, 0.47, 0.94, 0.97), p2 = io(0.44, 0.53, 0.945, 0.97), p3 = io(0.48, 0.58, 0.94, 0.965);
    const busR = 27.2;
    const bus = stroke(r.sub(busR - 0.45).abs(), 0.09).max(stroke(r.sub(busR + 0.45).abs(), 0.09)).mul(maskClock(p1, ang)).mul(maskClock(p1, ang.negate()));
    const N = float(24).add(c.pick(405, 3).mul(8));
    const th1 = ang.div(TAU).add(c.real.mul(0.012).mul(sense(6)));
    const k1 = th1.mul(N), id1 = k1.floor().add(N.mul(8)).mod(N);
    const d1 = vec2(k1.add(0.5).fract().sub(0.5).mul(TAU * 30).div(N), r.sub(30)).length();
    const bead = inv(smoothstep(0.75, 0.75 + 0.1, d1)).mul(maskBeads(p2, id1.div(N)));
    const beadRing = stroke(d1.sub(1.15).abs(), 0.08).mul(maskBeads(p2, id1.div(N)));
    const hotB = is(id1.mod(4), 0);
    const th2 = ang.div(TAU).sub(c.real.mul(0.02).mul(sense(6)));
    const N2 = N.div(2), k2 = th2.mul(N2), id2 = k2.floor().add(N2.mul(8)).mod(N2);
    const x2 = k2.add(0.5).fract().sub(0.5).mul(TAU * 23.5).div(N2);
    const tick = stroke(x2.abs(), 0.12).mul(step(r, 23.5)).mul(step(21.6, r));
    const tv = vec2(x2, r.sub(24.3)).length();
    const tvia = stroke(tv.sub(0.6).abs(), 0.1).max(inv(smoothstep(0.25, 0.32, tv)));
    const counter = tick.max(tvia).mul(maskBeads(p3, id2.div(N2)));
    const halo = r.sub(26).div(7).pow(2).negate().exp().mul(0.1).mul(io(0.4, 0.5, 0.94, 0.97));
    const kl = kickOn.mul(c.kick).mul(0.6);
    let col = A.mul(bus).mul(0.7).add(mix(B, H, hotB).mul(bead).mul(float(0.7).add(kl))).add(B.mul(beadRing).mul(0.5));
    col = col.add(mix(A, W, 0.4).mul(counter).mul(0.65)).add(A.mul(halo));
    m.colorNode = col.mul(step(r, 33));
    m.opacityNode = live;
    m.transparent = true;
    m.blending = AdditiveBlending;
    m.depthWrite = false;
    return m;
  }

  // ------------------------------------------------------------------ VEIL: drifting trace fragments + moire lenses
  if (layer === "veil") {
    const qm = vec2(q.x.abs(), q.y);
    const pv = io(0.62, 0.72, 0.93, 0.955);
    const cnt = float(4).add(step(0.5, rn(10)).mul(2));
    let body = float(0), line = float(0), vring = float(0), vdot = float(0);
    for (let i = 0; i < 6; i++) {
      const x = 33 + i * 3.1 + (i % 2) * 4;
      const y = c.real.mul(0.5 + i * 0.07).add(i * 17.3).mod(56).sub(28);   // rising, wrapping inside the veil
      const sz = smoothstep(26, 20, y.abs()).mul(maskBeads(pv, i / 6)).mul(step(i + 0.5, cnt));
      const fl = i % 2 ? -1 : 1;
      const a = vec2(x, y), b = vec2(x + 3.2 * fl, y), e = vec2(x + 5.4 * fl, y.add(2.2));
      const g1 = seg(qm, a, b), g2 = seg(qm, b, e);
      const dl = g1.d.min(g2.d), da = qm.sub(a).length(), de = qm.sub(e).length(), dv = da.min(de);
      const on = step(0.02, sz);
      body = body.max(stroke(dl, sz.mul(0.55)).max(stroke(dv, sz.mul(1.05))).mul(on));
      line = line.max(stroke(dl, sz.mul(0.13)).mul(on));
      vring = vring.max(stroke(dv.sub(sz.mul(0.7)).abs(), sz.mul(0.12)).mul(on));
      vdot = vdot.max(stroke(dv, sz.mul(0.3)).mul(on));
    }
    // the moire lenses: her eye-well rows again, a little off pitch (or twisted), sliding into register
    const pm = io(0.8, 0.86, 0.93, 0.95), mv = pk(9, 2);
    const pe = qm.sub(vec2(EYE[0], EYE[1]));
    const sp = float(0.9).mul(inv(lock).mul(is(mv, 0)).mul(0.075).add(1));
    const rot = inv(lock).mul(is(mv, 1)).mul(c.real.mul(0.6).sin().mul(0.02).add(0.03));
    const wb = wellBeads(pe, sp, rot, float(0.24));
    const lens = step(wb.r, pm.mul(6.2)).mul(step(0.01, pm));
    const halo = inv(smoothstep(0.4, 0.46, wb.dd)).mul(lens);
    const lb = wb.in.mul(lens);
    let col = vec3(0).add(A.mul(line).mul(0.9)).add(B.mul(vring)).add(H.mul(vdot).mul(0.9));
    col = mix(col, mix(B, W, lock.mul(0.6)).mul(float(0.7).add(lock.mul(0.5))), lb);
    m.colorNode = col;
    m.opacityNode = body.max(halo).mul(live);
    m.alphaTest = 0.5;
    return m;
  }

  // ------------------------------------------------------------------ FORE: near solder beads (undulate)
  if (layer === "fore") {
    const both = step(0.5, rn(13));
    const qf = vec2(q.x.abs(), select(both.greaterThan(0.5), q.y.abs().negate(), q.y));
    const pf = io(0.66, 0.76, 0.93, 0.95);
    let body = float(0), col = vec3(0);
    for (let i = 0; i < 7; i++) {
      const x = 48 + i * 6;
      const y = float(-35 - i * 1.4).add(float(x * 0.11).sub(c.real.mul(1.2)).sin().mul(2.6));
      const rr = 1.3 + i * 0.13;
      const d = qf.sub(vec2(x, y)).length();
      const on = maskBeads(pf, (6 - i) / 7);
      const ring = stroke(d.sub(rr).abs(), 0.16), core = stroke(d, rr * 0.36);
      const lead = i < 6 ? stroke(seg(qf, vec2(x + rr, y), vec2(x + 3, y.add(1.6))).d, 0.12) : float(0);
      body = body.max(stroke(d, rr * 1.3).mul(on));
      col = col.add(B.mul(ring).add(mix(H, W, kickOn.mul(c.kick).mul(0.5)).mul(core)).add(A.mul(lead).mul(0.6)).mul(on).mul(stroke(d, rr * 1.3)));
    }
    m.colorNode = col;
    m.opacityNode = body.mul(live);
    m.alphaTest = 0.5;
    return m;
  }

  // ------------------------------------------------------------------ BEING: the oracle's face (breathes)
  const br = c.real.mul(0.7).sin().mul(0.012).add(1);
  const qb = q.sub(O).div(br).add(O);
  const qm = vec2(qb.x.abs(), qb.y);
  const E = vec2(0, EY);
  const dE = qb.sub(E).length();
  // the current: drawn out of the third eye along the traces; then a slow current loops, the kick sends a pulse
  const pd = io(0.06, 0.3, 0.955, 0.99).mul(SMAX + 2);
  let d = float(1000), s = float(0);
  for (const t of TR) { const pl = poly(qm, t.pts, t.off); s = select(pl.d.lessThan(d), pl.s, s); d = d.min(pl.d); }
  const drawn = maskDraw(pd.div(SMAX + 2), s.div(SMAX + 2));
  const line = stroke(d, 0.17).mul(drawn);
  const head = nib(pd, s, 1.4).mul(stroke(d, 0.55)).mul(step(pd, SMAX)).mul(step(0.1, pd));
  const cur = c.real.mul(float(5).add(rn(12).mul(5))).mod(SMAX + 25);
  const flow = smoothstep(2.2, 0, s.sub(cur).abs()).mul(line);
  const kp = c.beat.fract().mul(SMAX * 1.15);
  const pulse = smoothstep(1.6, 0, s.sub(kp).abs()).mul(line).mul(kickOn);
  let vRing = float(0), vDot = float(0), vBody = float(0);
  for (const [x, y, sv] of VIAS) {
    const dv = qm.sub(vec2(x, y)).length(), got = step(sv, pd);
    vRing = vRing.max(stroke(dv.sub(0.75).abs(), 0.13).mul(got));
    vDot = vDot.max(stroke(dv, 0.36).mul(got).mul(smoothstep(sv + 3, sv + 1, pd).mul(0.8).add(0.6)));
    vBody = vBody.max(stroke(dv, 1.05).mul(got));
  }
  // the face body: black, filling out from the third eye behind the drawing pen
  const ax = qm.x, y = qb.y;
  const yc = y.sub(3 * F), chin = yc.negate().div(16 * F).clamp(0, 1);           // a serene oval, narrowing to the chin
  const sd = vec2(ax.div(float(13.6 * F).mul(float(1).sub(chin.mul(chin).mul(0.3)))), yc.div(16.6 * F)).length().sub(1);
  const pb = io(0.04, 0.28, 0.965, 0.998);
  const bodyIn = step(sd, 0).mul(step(dE, pb.mul(60))).mul(step(0.004, pb));
  const rows = wellBeads(qb.sub(E), float(2.4), float(0), float(0.16));
  const ground = rows.in.mul(bodyIn).mul(step(4, dE));
  // the third eye: rings drawn round like a clock, then the core
  const pE = io(0, 0.06, 0.985, 1.0), angE = atan2(qb.x, qb.y.sub(EY).add(1e-4));
  const eyeR = stroke(dE.sub(1.3).abs(), 0.14).max(stroke(dE.sub(2.1).abs(), 0.1)).mul(maskClock(pE, angE));
  const eyeC = stroke(dE, pE.mul(0.7));
  const eyeBody = stroke(dE, pE.mul(2.5));
  // the eye wells: via rows round each eye, opening outward (her moire half; the veil holds the other)
  const pw = io(0.55, 0.66, 0.945, 0.965);
  const pe = qm.sub(vec2(EYE[0], EYE[1]));
  const wb = wellBeads(pe, float(0.9), float(0), float(0.24));
  const well = wb.in.mul(step(wb.r, pw.mul(6.2))).mul(step(0.01, pw)).mul(step(0.5, wb.j));
  // the upper lids: drawn at the culmination, the eyes open
  const pl = io(0.85, 0.9, 0.935, 0.955);
  const lid = poly(qm, LID);
  const lidL = stroke(lid.d, 0.17).mul(maskDraw(pl, lid.s.div(lid.L)));
  const almond = step(pe.y.abs(), float(1.5 * F).mul(inv(pe.x.abs().div(3.5 * F).pow(2))).mul(pl));
  // the seeded detail trace
  const det = pk(2, 3), P3 = DET.map((_, k) => k);
  const dp = (k) => vec2(DET[0][k][0], DET[0][k][1]).mul(is(det, 0)).add(vec2(DET[1][k][0], DET[1][k][1]).mul(is(det, 1))).add(vec2(DET[2][k][0], DET[2][k][1]).mul(is(det, 2))).mul(F);
  const D0 = dp(0), D1 = dp(1), D2 = dp(2);
  const pdd = io(0.5, 0.64, 0.945, 0.97);
  const g1 = seg(qm, D0, D1), g2 = seg(qm, D1, D2);
  const l1 = g1.len, dl = l1.add(g2.len);
  const sd2 = select(g1.d.lessThan(g2.d), g1.h.mul(l1), g2.h.mul(g2.len).add(l1)).div(dl);
  const dLine = stroke(g1.d.min(g2.d), 0.15).mul(maskDraw(pdd, sd2));
  const dv1 = qm.sub(D1).length(), dv2 = qm.sub(D2).length();
  const dVia = stroke(dv1.sub(0.7).abs(), 0.12).mul(maskBeads(pdd, l1.div(dl))).max(stroke(dv2.sub(0.75).abs(), 0.13).mul(step(0.99, pdd)));
  const dDot = stroke(dv2, 0.36).mul(step(0.99, pdd));
  const coil = is(det, 2).mul(stroke(dv2.sub(1.8).abs(), 0.1).max(stroke(dv2.sub(2.7).abs(), 0.1))).mul(smoothstep(0.62, 0.68, u)).mul(inv(smoothstep(0.945, 0.96, u)));
  const dBody = stroke(g1.d.min(g2.d), 0.5).mul(maskDraw(pdd, sd2)).max(stroke(dv2, coil.mul(3)).max(stroke(dv2, step(0.99, pdd).mul(1.05))));
  const glow = climb(c).mul(0.4).add(0.6);
  let col = A.mul(ground).mul(0.16);
  col = mix(col, mix(A, W, 0.15).mul(0.55), line);
  col = col.add(W.mul(flow.mul(0.7).add(pulse.mul(0.9)).add(head.mul(1.2))));
  col = mix(col, B.mul(0.9), vRing);
  col = mix(col, H.mul(0.95), vDot);
  col = mix(col, mix(B, W, 0.5).mul(well).mul(float(0.45).add(lock.mul(0.6)).add(almond.mul(0.5))), well);
  col = mix(col, mix(H, W, 0.2).mul(glow), well.mul(almond));
  col = mix(col, mix(A, W, 0.3).mul(glow), lidL);
  col = mix(col, A.mul(0.6), dLine.max(coil));
  col = mix(col, B, dVia);
  col = mix(col, H, dDot);
  col = mix(col, mix(B, W, 0.4), eyeR);
  col = mix(col, mix(H, W, kickOn.mul(c.kick).mul(0.6)), eyeC);
  const cover = bodyIn.max(stroke(d, 0.5).mul(drawn)).max(vBody).max(eyeBody).max(dBody).max(well);
  m.colorNode = col;
  m.opacityNode = cover.mul(live);
  m.alphaTest = 0.5;
  return m;
}
