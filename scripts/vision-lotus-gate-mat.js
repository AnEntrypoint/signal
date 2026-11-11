// THE LOTUS GATE: a thousand-petal lotus opening ring by ring around a pointed arched doorway in its heart; through
// the door a small starfield and a second, distant lotus with its own door show (the droste: the whole repeats).
// ONE SCENE, FIVE LAYERS at five depths, one script (params.layer, baked), each on its OWN motion:
//   "world" z -30  SCROLLS    black water under a dark sky: lily pads (concentric bead discs) float sideways on rows
//                             that widen toward you, dragonflies (four-stroke glyphs) hover, petals drift up. It
//                             grows from the lotus outward as one giant blossom outline, scalloped by a bead front.
//   "ring"  z -12  TURNS      the halo: two line circles, two bead rings counter-turning, twelve aura petals (additive)
//   "being" z   0  BREATHES   bindu, the arch drawing itself, petal rings opening one by one, alternately unscrewing
//                             clockwise / counter-clockwise, each ring breathing in its own sense
//   "veil"  z +10  DRIFTS     great black petals adrift up the sides, hiding the halo and the stems behind them
//   "fore"  z +22  UNDULATES  the near water's swell along the bottom, buds surfacing on it, pollen sparks rising
//   the STEMS are real 3D tubes winding in depth: scripts/vision-lotus-gate-worm-geo.js / -worm-mat.js
// being / veil / fore / world are CUTOUT (alphaTest, depth-writing): a near shape hides what is behind it.
// THE SCORE (u = 0..1): 0 bindu / .02 arch draws / .08 door lining beads / .1-.3 rings open / .25 world blooms /
// .4 halo lines, .44 bead rings, .52 aura / .5 dew on the tips, .55 doorway stars + droste lotus, .58 seed-pod crown,
// .6 dragonflies, .62 rising petals, .65 bindu star / .55 stems, .62 veil petals, .66 near water and buds /
// .85 culmination: counter-rotation LOCK (all rings align into one star) or FIGURE/GROUND flip, the door's lotus zooms /
// .93.. everything leaves last-in first-out through its own mask.
// Seed channels 420..439: 0 hue family, 1 petal count, 2 ring sense, 3 door content, 4 dragonflies, 5 halo speed,
// 6 water scroll sense, 7 stem count, 8 stem skin, 9 illusion variant, 10 fifth ring, 12 veil phase, 13 dark stem,
// 17 hot accent.
import { MeshBasicNodeMaterial, AdditiveBlending, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, mix, atan2, fwidth } from "builtin/tsl";
import { tripClock, visionShown, visionU, climb, maskDraw, maskBeads, maskClock, nib } from "./lib/trip.js";

const TAU = 6.28318, PI = 3.14159;
const DEPTH = { world: 104, ring: 86, being: 74, veil: 64, fore: 52 };
const CY = -2, HW = 4.2, YL = CY - 7, YS = CY + 1, RA = 6.5, AXC = HW - RA, APEX = YS + Math.sqrt(RA * RA - AXC * AXC);
const NR = 5;
const is = (v, i) => step(v.sub(i).abs(), 0.5);
const inv = (x) => float(1).sub(x);
const hash = (x) => float(x).mul(12.9898).sin().mul(43758.5453).fract();
function seg(p, a, b) {
  const bx = b[0] - a[0], by = b[1] - a[1], bb = bx * bx + by * by;
  const pa = p.sub(vec2(a[0], a[1])), h = pa.dot(vec2(bx, by)).div(bb).clamp(0, 1);
  return pa.sub(vec2(bx, by).mul(h)).length();
}
// the pointed arch, signed distance (metres, < 0 inside) and a draw parameter rising from its foot to its apex
function arch(q) {
  const x = q.x.abs(), y = q.y;
  const sdb = x.sub(HW).max(float(YL).sub(y));
  const sdt = vec2(x.sub(AXC), y.sub(YS)).length().sub(RA).max(x.sub(HW));
  const below = step(y, YS);
  return { sd: mix(sdt, sdb, below), ua: y.sub(YL).div(APEX - YL).clamp(0, 1) };
}
// one ring of N petals: ap across (-.5..5 of a petal's slot), t along (0 base .. 1 tip), ex metres inside the edge
function petals(rr, an, N, r0, Lo, rot) {
  const f = an.div(TAU).mul(N).add(rot);
  const ap = f.fract().sub(0.5), t = rr.sub(r0).div(Lo.max(0.01));
  const sh = t.clamp(0, 1).mul(PI).sin().pow(0.6).mul(inv(t.clamp(0, 1).mul(0.3))).mul(0.5);
  const arc = rr.mul(TAU).div(N);
  const ex = sh.sub(ap.abs()).mul(arc);
  return { ap, t, ex, arc, id: f.floor(), inside: step(0, ex).mul(step(0, t)).mul(step(t, 1)).mul(step(0.02, Lo)) };
}
// one free petal, local across / along metres
function leaf(x, y, len, wid) {
  const t = y.div(len), sh = t.clamp(0, 1).mul(PI).sin().pow(0.6).mul(inv(t.clamp(0, 1).mul(0.3))).mul(wid);
  const ex = sh.sub(x.abs());
  return { t, ex, inside: step(0, ex).mul(step(0, t)).mul(step(t, 1)) };
}

export function material(ctx) {
  const layer = ctx.params.layer ?? "being";
  const c = tripClock(ctx);
  const u = visionU(ctx, c);
  const io = (a, b, x, y) => smoothstep(a, b, u).mul(inv(smoothstep(x, y, u)));
  const rn = (n) => c.rnd(420 + n), pk = (n, k) => c.pick(420 + n, k);
  const sense = (n) => step(0.5, rn(n)).mul(2).sub(1);
  const fam = pk(0, 3), hot = pk(17, 3);
  const blue = vec3(0.05, 0.12, 1.0), violet = vec3(0.45, 0.05, 1.0), mag = vec3(1.0, 0.05, 0.6), W = vec3(1, 1, 1);
  const A = blue.mul(is(fam, 0)).add(violet.mul(is(fam, 1))).add(violet.mul(is(fam, 2)));   // body line
  const B = violet.mul(is(fam, 0)).add(blue.mul(is(fam, 1))).add(mag.mul(is(fam, 2)));      // accent
  const H = mag.mul(is(hot, 0)).add(vec3(1.0, 0.85, 0.05).mul(is(hot, 1))).add(vec3(0.1, 1.0, 0.15).mul(is(hot, 2)));
  const P = positionGeometry.xy;
  const q = P.mul(74 / DEPTH[layer]);                 // every layer draws in the being's metres
  const qc = q.sub(vec2(0, CY)), rr = qc.length(), an = atan2(qc.x, qc.y), ax = q.x.abs();
  const aa = fwidth(q.x).mul(1.2).max(0.02);
  const stroke = (d, w) => inv(smoothstep(float(w), aa.add(w), d));
  const live = visionShown(ctx, c, 0);
  const kickOn = step(0.001, c.kick);
  const kl = smoothstep(2.5, 0, rr.sub(c.beat.fract().mul(56)).abs()).mul(kickOn);   // the kick: a ripple outward
  const cul = io(0.85, 0.89, 0.93, 0.95).mul(climb(c).mul(0.4).add(0.6));
  const flipV = step(0.5, rn(9));
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;

  // ------------------------------------------------------------------ WORLD: water and sky (scrolls)
  if (layer === "world") {
    // coverage: one giant blossom outline growing from the lotus, its front a scalloped row of beads
    const grow = io(0.25, 0.45, 0.955, 0.995), Rg = grow.mul(190);
    const shape = an.mul(4).cos().abs().mul(0.22).add(0.78);
    const lead = rr.sub(Rg.mul(shape));
    const fb = vec2(an.mul(rr).div(3.2).fract().sub(0.5).mul(3.2), lead.sub(2.2)).length();
    const front = inv(smoothstep(1.0, 1.0 + 0.1, fb)).mul(step(0, lead));
    const cover = step(lead, 0).max(front).mul(step(0.004, grow));
    const Wy = -24;
    const v = float(Wy).sub(q.y).max(0);
    // lily pads: rows widening toward the viewer, pads drifting sideways, each a disc of concentric bead rings
    const ri = v.sqrt().mul(1.25).floor(), vc = ri.add(0.5).div(1.25), yc = float(Wy).sub(vc.mul(vc));
    const sp = ri.mul(4).add(9);
    const xs = q.x.sub(c.real.mul(ri.mul(0.35).add(0.6)).mul(sense(6))).div(sp);
    const cid = xs.floor(), has = step(0.38, hash(cid.mul(3.1).add(ri.mul(7.7))));
    const lx = xs.fract().sub(0.5).mul(sp), ly = q.y.sub(yc).mul(ri.mul(-0.25).add(3.2).max(1.6));
    const pr = sp.mul(0.36), rho = vec2(lx, ly).length();
    const notch = step(atan2(lx, ly.negate()).abs(), 0.28);
    const rs = pr.div(3.5), rj = rho.div(rs).floor(), cnt = rj.add(1).mul(6);
    const pa = atan2(ly, lx), adot = pa.div(TAU).mul(cnt).fract().sub(0.5).mul(rho).mul(TAU).div(cnt);
    const dot = inv(smoothstep(rs.mul(0.28), rs.mul(0.34), vec2(adot, rho.div(rs).fract().sub(0.5).mul(rs)).length()));
    const pad = step(rho, pr).mul(inv(notch)).mul(has).mul(step(0.0001, v));
    const padP = io(0.3, 0.5, 0.95, 0.97);
    const padOn = pad.mul(maskBeads(padP, hash(cid.add(ri.mul(5))).mul(0.6).add(rr.div(200))));
    let col = mix(A, B, rj.mod(2)).mul(dot).mul(0.55).add(A.mul(stroke(rho.sub(pr).abs(), 0.08)).mul(0.5)).mul(padOn);
    col = col.add(B.mul(kl).mul(padOn).mul(0.4));
    // the water line: a dashed bead row
    const wl = stroke(vec2(q.x.div(2.4).fract().sub(0.5).mul(2.4), q.y.sub(Wy)).length(), 0.28);
    col = col.add(mix(A, W, 0.3).mul(wl).mul(0.7).mul(step(rr.div(170), io(0.3, 0.42, 0.95, 0.97))));
    // the sky: petals drifting up (placed in lanes, mirrored), dragonflies hovering
    const above = step(Wy + 1, q.y);
    let sky = vec3(0, 0, 0);
    for (let j = 0; j < 5; j++) {
      const x0 = 40 + j * 13, rise = c.real.mul(0.6 + 0.12 * j).add(j * 23).mod(78);
      const px = ax.sub(x0).sub(c.real.mul(0.5).add(j).sin().mul(3)), py = q.y.sub(rise.add(Wy - 4));
      const tl = c.real.mul(0.5).add(j * 1.7).sin().mul(0.35), cs = tl.cos(), sn = tl.sin();
      const lf = leaf(px.mul(cs).sub(py.mul(sn)), px.mul(sn).add(py.mul(cs)), 4.6, 1.5);
      const pj = io(0.62 + j * 0.018, 0.66 + j * 0.018, 0.945, 0.958);
      sky = sky.add(mix(B, H, j % 2).mul(stroke(lf.ex.abs(), 0.1).mul(step(0, lf.t)).mul(step(lf.t, 1))).mul(step(0.01, pj)).mul(step(j / 5, pj.mul(1.02))));
    }
    const nfly = pk(4, 3).add(2);
    const FLY = [[52, 14], [80, 30], [34, 36], [104, 6]];
    FLY.forEach(([fx, fy], i) => {
      const hov = vec2(c.real.mul(0.37).add(i * 2.1).sin().mul(5), c.real.mul(0.61).add(i).sin().mul(2.5));
      const fp = vec2(ax.sub(fx), q.y.sub(fy)).sub(hov);
      const fl = c.real.mul(11).add(i).sin().mul(0.35);
      const pf = io(0.6 + i * 0.025, 0.66 + i * 0.025, 0.945, 0.96).mul(step(i, nfly.sub(0.5)));
      const s1 = stroke(seg(fp, [0, 2.6], [0, -6.5]), 0.12).mul(maskBeads(pf, 0.05));
      const s2 = stroke(seg(fp.sub(vec2(0, fl)), [-6.5, 1.9], [6.5, 1.9]), 0.1).mul(maskBeads(pf, 0.3));
      const s3 = stroke(seg(fp.add(vec2(0, fl)), [-5, -0.2], [5, -0.2]), 0.1).mul(maskBeads(pf, 0.55));
      const s4 = stroke(fp.sub(vec2(0, 3.4)).length().sub(0.8).abs(), 0.1).mul(maskBeads(pf, 0.8));
      sky = sky.add(mix(A, W, 0.45).mul(s1.max(s2).max(s3)).add(H.mul(s4)).mul(step(0.01, pf)));
    });
    col = col.add(sky.mul(above).mul(0.8));
    m.colorNode = col;
    m.opacityNode = cover.mul(live);
    m.alphaTest = 0.5;
    return m;
  }

  // ------------------------------------------------------------------ RING: the halo (turns, additive)
  if (layer === "ring") {
    const ringL = (r, w) => inv(smoothstep(w, aa.add(w), rr.sub(r).abs()));
    const pL = io(0.4, 0.46, 0.955, 0.97);
    const l1 = ringL(44, 0.12).mul(maskClock(pL, an)), l2 = ringL(55, 0.1).mul(maskClock(pL, an.negate()));
    const rot = c.real.mul(rn(5).mul(0.012).add(0.006)).mul(sense(2));
    const f1 = an.div(TAU).add(rot).mul(72), f2 = an.div(TAU).sub(rot.mul(1.7)).mul(96);
    const b1 = inv(smoothstep(0.62, 0.62 + 0.1, vec2(f1.fract().sub(0.5).mul(rr).mul(TAU / 72), rr.sub(47.6)).length()));
    const b2 = inv(smoothstep(0.42, 0.42 + 0.1, vec2(f2.fract().sub(0.5).mul(rr).mul(TAU / 96), rr.sub(51.4)).length()));
    const p1 = io(0.44, 0.52, 0.95, 0.965), p2 = io(0.48, 0.56, 0.95, 0.965);
    const k1 = maskBeads(p1, f1.floor().div(72).fract()), k2 = maskBeads(p2, f2.floor().div(96).fract());
    // aura: twelve great petal outlines turning slowly the other way, drawn from base to tip
    const pa = io(0.52, 0.6, 0.945, 0.96);
    const au = petals(rr, an, 12, float(36), float(24).mul(pa), rot.mul(-0.6).add(0.5));
    const aur = stroke(au.ex.abs(), 0.12).mul(step(0, au.t)).mul(step(au.t, 1));
    const glow = smoothstep(9, 0, rr.sub(44).abs()).mul(0.12).mul(pL);
    const col = A.mul(l1.add(l2)).mul(0.8).add(mix(B, W, 0.3).mul(b1.mul(k1)).mul(float(0.7).add(c.kick.mul(0.6))))
      .add(mix(H, W, f2.floor().mod(2).mul(0.6)).mul(b2.mul(k2)).mul(0.8)).add(B.mul(aur).mul(0.45)).add(A.mul(glow))
      .mul(step(rr, 60));
    m.colorNode = col;
    m.opacityNode = live;
    m.transparent = true;
    m.blending = AdditiveBlending;
    m.depthWrite = false;
    return m;
  }

  // ------------------------------------------------------------------ VEIL: great petals adrift (drifts)
  if (layer === "veil") {
    let col = vec3(0, 0, 0), cover = float(0);
    for (let j = 0; j < 3; j++) {
      const x0 = 46 + j * 15, len = 12 + j * 2.5, wid = 3.8 + j * 0.6;
      const y0 = c.real.mul(0.9 + 0.3 * j).add(j * 41 + 30).add(rn(12).mul(60)).mod(130).sub(70);
      const th = c.real.mul(0.25).add(j * 2).sin().mul(0.25).add(0.45 + j * 0.15).negate();
      const px = ax.sub(x0), py = q.y.sub(y0), cs = th.cos(), sn = th.sin();
      const lx = px.mul(cs).sub(py.mul(sn)), ly = px.mul(sn).add(py.mul(cs));
      const lf = leaf(lx, ly, len, wid);
      const pj = io(0.62 + j * 0.03, 0.68 + j * 0.03, 0.93 + j * 0.005, 0.945 + j * 0.005);
      const on = lf.inside.mul(maskDraw(pj, lf.t));
      const edge = stroke(lf.ex, 0.18);
      const cont = stroke(lf.ex.div(1.1).fract().sub(0.5).abs().mul(1.1), 0.06).mul(step(0.6, lf.ex));
      const vb = inv(smoothstep(0.45, 0.55, vec2(lx, lf.t.mul(6).fract().sub(0.5).mul(len / 6)).length())).mul(step(0.1, lf.t)).mul(step(lf.t, 0.85));
      const nb = nib(pj, lf.t, 0.04).mul(step(pj, 0.99));
      const pc = mix(B, W, 0.15).mul(edge).add(A.mul(cont).mul(0.4)).add(H.mul(vb)).add(W.mul(nb).mul(edge.add(0.3)));
      col = mix(col, pc, on);
      cover = cover.max(on);
    }
    m.colorNode = col;
    m.opacityNode = cover.mul(live);
    m.alphaTest = 0.5;
    return m;
  }

  // ------------------------------------------------------------------ FORE: the near water and its buds (undulates)
  if (layer === "fore") {
    const pW = io(0.66, 0.72, 0.93, 0.95);
    const swell = (x) => float(x).mul(0.07).sub(c.real.mul(1.1)).sin().mul(2.2).add(float(x).mul(0.15).add(c.real.mul(0.7)).sin().mul(1.1));
    const yw = swell(q.x).add(-52).add(pW.mul(9));
    let col = vec3(0, 0, 0), cover = float(0);
    for (let j = 0; j < 4; j++) {
      const xb = 30 + j * 20, pb = io(0.68 + j * 0.025, 0.74 + j * 0.025, 0.93, 0.945);
      const bx = ax.sub(xb).sub(c.real.mul(0.9).add(j).sin().mul(0.8));
      const by = q.y.sub(swell(q.x.sign().mul(xb)).add(-52).add(pW.mul(9)).sub(2).add(inv(pb).mul(12)));
      const lf = leaf(bx, by, 8 + j, 2.0 + j * 0.25);
      const on = lf.inside.mul(step(0.01, pb));
      const bands = step(0.5, lf.t.mul(7).fract()).mul(step(lf.t, 0.45)).mul(step(0.5, lf.ex));
      const pc = mix(A, W, 0.2).mul(stroke(lf.ex, 0.16)).add(B.mul(bands).mul(0.55)).add(H.mul(stroke(vec2(bx, lf.t.sub(0.86).mul(8 + j)).length(), 0.45)));
      col = mix(col, pc, on);
      cover = cover.max(on);
      // a pollen spark rising from each bud
      const sy = c.real.mul(0.18).add(j * 0.29).fract();
      const sp = stroke(vec2(bx.sub(sy.mul(9).add(j).sin().mul(2)), by.sub(sy.mul(26).add(9))).length(), 0.4).mul(step(0.5, pb)).mul(inv(sy));
      col = mix(col, mix(H, W, 0.5), sp);
      cover = cover.max(sp);
    }
    // the near water: black under a neon crest, a bead row riding just below it
    const below = step(q.y, yw).mul(step(0.01, pW));
    const crest = stroke(q.y.sub(yw).abs(), 0.16);
    const wb = stroke(vec2(q.x.add(c.real.mul(1.5)).div(2.6).fract().sub(0.5).mul(2.6), q.y.sub(yw).add(1.3)).length(), 0.32);
    col = mix(col, A.mul(crest).add(mix(B, W, 0.3).mul(wb).mul(0.7)).add(A.mul(kl).mul(0.3)), below.max(crest.mul(step(0.01, pW))));
    cover = cover.max(below);
    m.colorNode = col;
    m.opacityNode = cover.mul(live);
    m.alphaTest = 0.5;
    return m;
  }

  // ------------------------------------------------------------------ BEING: the lotus and its gate (breathes)
  const N0 = pk(1, 3).mul(2).add(8);                 // 8, 10 or 12 petals in the first ring
  const lock = inv(cul.mul(inv(flipV)));             // variant A: every ring's turn eases to zero (one star)
  const flip = cul.mul(flipV);                       // variant B: bodies lit, lines black
  let col = vec3(0, 0, 0), cover = float(0);
  const pDew = io(0.5, 0.58, 0.945, 0.958);
  for (let k = NR - 1; k >= 0; k--) {
    const N = N0.mul(1 + 0.5 * k), r0 = 4 + 5.4 * k, L = 10 + 1.6 * k;
    const sgn = sense(2).mul(k % 2 ? -1 : 1);
    const op = io(0.1 + 0.045 * k, 0.15 + 0.045 * k, 0.958 + 0.007 * (NR - 1 - k), 0.97 + 0.007 * (NR - 1 - k)).mul(k === NR - 1 ? step(0.35, rn(10)) : float(1));
    const breathe = c.real.mul(0.55 + 0.08 * k).add(k * 1.3).sin().mul(0.035).mul(k % 2 ? -1 : 1).add(1);
    const rk = rr.div(breathe);
    const rot = c.real.mul(0.008 + 0.003 * k).add(inv(op).mul(0.5)).mul(sgn).mul(lock).add((k % 2) * 0.5);
    const Lo = op.mul(L);
    const pt = petals(rk, an, N, r0, Lo, rot);
    const lc = k % 2 ? B : A;
    const edge = stroke(pt.ex, 0.22);
    let det;
    if (k % 2 === 0) {
      const cont = stroke(pt.ex.div(1.2).fract().sub(0.5).abs().mul(1.2), 0.06).mul(step(0.7, pt.ex));
      const vein = stroke(pt.ap.mul(pt.arc).abs(), 0.07).mul(step(0.08, pt.t)).mul(step(pt.t, 0.8));
      det = lc.mul(cont.mul(0.55).add(vein.mul(0.7)));
    } else {
      const bd = vec2(pt.ap.mul(pt.arc), pt.t.mul(5).fract().sub(0.5).mul(Lo).div(5)).length();
      const rb = inv(pt.t.mul(0.5)).mul(0.55);
      det = mix(H, W, pt.t.mul(5).floor().mod(2).mul(0.5)).mul(inv(smoothstep(rb.sub(0.08), rb, bd))).mul(step(pt.t, 0.92));
    }
    const lit = lc.mul(edge).mul(float(0.85).add(kl.mul(0.8))).add(det);
    const body = mix(vec3(0, 0, 0), lc.mul(0.5).add(det.mul(0.3)), flip);
    const pc = mix(body.add(lit.mul(inv(flip))), vec3(0, 0, 0), edge.mul(flip));
    col = mix(col, pc, pt.inside);
    cover = cover.max(pt.inside);
    // dew at each petal's tip, laid in order round the ring
    const dd = vec2(pt.ap.mul(pt.arc), rk.sub(Lo.add(r0 + 0.9))).length();
    const dew = inv(smoothstep(0.55, 0.65, dd)).mul(maskBeads(pDew, pt.id.div(N).fract().mul(0.7).add(k * 0.06))).mul(step(0.9, op));
    col = mix(col, mix(H, W, smoothstep(0.35, 0, dd)), dew);
    cover = cover.max(dew);
  }
  // THE GATE: bindu, then the arch drawing itself up both sides with a nib, its lining beads, the seed-pod crown
  const ar = arch(q);
  const pB = io(0.0, 0.025, 0.992, 1.0), pA = io(0.02, 0.08, 0.985, 0.998), pLn = io(0.08, 0.12, 0.975, 0.985);
  const pPod = io(0.58, 0.64, 0.945, 0.958), pDoor = io(0.55, 0.62, 0.95, 0.965), pStar = io(0.65, 0.69, 0.945, 0.955);
  const doorIn = step(ar.sd, 0).mul(step(ar.ua, pA.mul(1.02)));
  const door = vec2(0, CY - 1.5);
  const qd = q.sub(door), rd = qd.length();
  // the doorway: a few placed stars (golden-angle spiral) and the second lotus, smaller, turning the other way
  let dc = vec3(0, 0, 0);
  const dVar = step(0.5, rn(3));
  for (let i = 0; i < 12; i++) {
    const r = Math.sqrt(i + 0.5) * 1.35, a = i * 2.39996;
    const sd4 = qd.sub(vec2(Math.cos(a) * r * 0.75, Math.sin(a) * r + 1.5)).abs();
    const s = inv(smoothstep(0.8, 0.95, sd4.x.div(0.35).sqrt().add(sd4.y.div(0.35).sqrt())));
    dc = dc.add(mix(W, H, (i % 3 === 0) ? 1 : 0).mul(s).mul(maskBeads(pDoor, i / 12)).mul(c.real.mul(1.3).add(i * 1.7).sin().mul(0.3).add(0.7)));
  }
  const zoom = cul.mul(0.9);
  const SC = float(5.2).mul(zoom.negate().exp().mul(dVar.mul(0.6).add(0.4)).add(inv(dVar).mul(0.0)).max(0.0)).add(inv(dVar).mul(0)).max(1.3);
  const q2 = qd.add(vec2(0, 1.0)).mul(SC), rr2 = q2.length(), an2 = atan2(q2.x, q2.y);
  let dl = float(0);
  for (let k = 0; k < 3; k++) {
    const p2 = petals(rr2, an2, N0.mul(1 + 0.5 * k), 4 + 5.4 * k, float(10 + 1.6 * k), c.real.mul(-0.02).mul(sense(2)).add((k % 2) * 0.5));
    dl = dl.max(stroke(p2.ex.abs(), aa.mul(SC).max(0.25)).mul(step(0, p2.t)).mul(step(p2.t, 1)));
  }
  const ar2 = arch(q2.add(vec2(0, CY)));
  dl = dl.max(stroke(ar2.sd.abs(), 0.35));
  const pDr = io(0.56, 0.64, 0.95, 0.965);
  dc = dc.mul(inv(dl)).add(mix(B, A, 0.4).mul(dl).mul(smoothstep(pDr.mul(7.5), pDr.mul(7.5).sub(0.6), rd)).mul(0.9));
  col = mix(col, dc, doorIn);
  cover = cover.max(doorIn);
  const outl = stroke(ar.sd.abs(), 0.24).mul(maskDraw(pA, ar.ua));
  const anib = nib(pA, ar.ua, 0.03).mul(stroke(ar.sd.abs(), 0.6)).mul(step(pA, 0.99));
  const sides = smoothstep(YL + 0.6, YL + 1.6, q.y);
  const lin = sides.mul(1).mul(stroke(vec2(ar.sd.sub(1.05), ar.ua.mul(16).fract().sub(0.5).mul((APEX - YL) / 16 * 1.6)).length(), 0.36).mul(maskBeads(pLn, ar.ua)));
  const pod = stroke(vec2(ar.sd.sub(2.4), ar.ua.mul(11).add(0.5).fract().sub(0.5).mul((APEX - YL) / 11 * 1.8)).length(), 0.62).mul(maskBeads(pPod, ar.ua)).mul(sides);
  const podCore = stroke(vec2(ar.sd.sub(2.4), ar.ua.mul(11).add(0.5).fract().sub(0.5).mul((APEX - YL) / 11 * 1.8)).length(), 0.25).mul(pod);
  const bindu = stroke(q.sub(vec2(0, CY)).length(), pB.mul(0.9)).mul(step(0.01, pB)).mul(inv(pA.mul(step(0.99, pA))));
  const bs = q.sub(vec2(0, APEX + 2.4)).abs();
  const star = inv(smoothstep(0.85, 1, bs.x.div(1.4).sqrt().add(bs.y.div(2.2).sqrt()))).mul(step(0.01, pStar)).mul(step(bs.y, pStar.mul(2.3)));
  const gl = outl.max(lin).max(pod).max(star).max(bindu).max(anib);
  const gc = mix(A, W, 0.25).mul(outl).add(mix(B, W, 0.2).mul(lin)).add(H.mul(pod).mul(inv(podCore))).add(W.mul(podCore))
    .add(W.mul(star.max(bindu).max(anib)));
  col = mix(col, gc, gl);
  cover = cover.max(gl);
  m.colorNode = col;
  m.opacityNode = cover.mul(live);
  m.alphaTest = 0.5;
  return m;
}
