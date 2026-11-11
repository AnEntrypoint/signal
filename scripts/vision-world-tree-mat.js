// THE WORLD TREE (vision being "world-tree"): a tree whose roots below mirror its branches above, an hourglass
// of line-art branching (4 generations), a bead fruit on every tip, a black-and-white chevron trunk between.
// Three layers at three depths, one script (params.layer, baked):
//   "ring"  far (z -12): the three worlds, three thin horizon ellipses (upper, middle, under), each turning its
//           dashes and one planet bead at its own rate and sense, soft
//   "being" (z 0): the trunk draws up and down from the centre line at once, each generation of branch and root
//           draws after the one before (one pen stroke outward, a bright nib at its head), then the fruit light
//           from the trunk outward; culmination: the fruit swell in a wave trunk-to-tips and grow halos
//   "veil"  near (z +10): 7 almond leaves falling slowly through the frame, each turning on its own clock
// Exit (last 0.5 s): fruit go out tips-first, then every branch retracts down its own stroke into the trunk,
// the trunk into the centre line; leaves close to their midrib; the worlds undraw.
// Light travels: on each gated kick (c.kick) the sap runs from the root tips up the trunk out to the branch tips.
// Seed channels: 100 hue family, 101 trunk stripe count, 102 fruit halo count, 103 fruit shape,
// 104 crown spread, 105 crown habit (weeping / level / reaching), 106 ring sense, 107 ring speed,
// 108 leaf drift side, 110+ leaf columns.
import { MeshBasicNodeMaterial, AdditiveBlending, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, mix, atan2, fwidth, select } from "builtin/tsl";
import { tripClock, visionShown, visionU, climb, maskDraw, maskBeads, maskLid, nib } from "./lib/trip.js";

const TAU = 6.28318;
const T = 3.5;                                           // trunk half height
const LEN = [4.6, 3.7, 2.8, 2.2], SPR = [44, 36, 27, 27], CURL = 3, WID = [0.2, 0.16, 0.12, 0.09];
// one quadrant of the tree (x >= 0, y >= 0), mirrored in x and in y by the shader
const SEGS = [], TIPS = [];
(function grow(x, y, a, g, sgn) {
  const n = g < 2 ? 3 : 2, l = LEN[g] / n;
  for (let i = 0; i < n; i++) {
    const r = (a - sgn * CURL * i) * Math.PI / 180, x2 = x + Math.sin(r) * l, y2 = y + Math.cos(r) * l;
    SEGS.push({ ax: x, ay: y, bx: x2 - x, by: y2 - y, g, t0: i / n, dt: 1 / n });
    x = x2; y = y2;
  }
  const end = a - sgn * CURL * (n - 1);
  if (g === 3) { TIPS.push([x, y]); return; }
  grow(x, y, end + SPR[g + 1], g + 1, 1); grow(x, y, end - SPR[g + 1], g + 1, -1);
})(0, T, SPR[0], 0, 1);
const ORDER = TIPS.map((t, i) => i).sort((a, b) => TIPS[a][0] - TIPS[b][0]);   // trunk outward
const TIPK = TIPS.map((t, i) => ORDER.indexOf(i) / TIPS.length);

const is = (v, i) => step(v.sub(i).abs(), 0.5);

export function material(ctx) {
  const layer = ctx.params.layer ?? "being";
  const c = tripClock(ctx);
  const u = visionU(ctx, c);
  const vw0 = ctx.param("vw0", -1), vw1 = ctx.param("vw1", -1);
  const keepF = float(1).sub(smoothstep(vw1.sub(0.5), vw1.sub(0.3), c.sec));      // fruit leave first
  const keep = float(1).sub(smoothstep(vw1.sub(0.36), vw1.sub(0.02), c.sec));     // then the strokes retract
  const cul = smoothstep(0.7, 0.95, u).mul(climb(c).mul(0.6).add(0.4)).mul(keepF);
  const fam = c.pick(100, 3);
  const blue = vec3(0.05, 0.12, 1.0), violet = vec3(0.45, 0.05, 1.0), pink = vec3(1.0, 0.05, 0.6), orange = vec3(1.0, 0.38, 0.02);
  const yellow = vec3(1.0, 0.85, 0.05), green = vec3(0.1, 1.0, 0.15), W = vec3(1, 1, 1);
  const A = green.mul(is(fam, 0)).add(violet.mul(is(fam, 1))).add(blue.mul(is(fam, 2)));    // wood
  const B = yellow.mul(is(fam, 0)).add(pink.mul(is(fam, 1))).add(orange.mul(is(fam, 2)));   // fruit
  const p = positionGeometry.xy;
  const aa = fwidth(p.x).mul(1.2).max(0.01);
  const rr = p.length();
  const kon = step(0.001, c.kick);
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  m.fog = false;

  if (layer === "ring") {
    // the three worlds: horizon ellipses, the middle one first, each on its own clock and sense
    const blur = aa.mul(4);
    const sense = c.rnd(106).step(0.5).mul(2).sub(1), speed = mix(0.7, 1.4, c.rnd(107));
    const W3 = [{ cy: 0, a: 31, b: 3.6, n: 48, per: 64, s: 1, from: 0.0 }, { cy: 10.5, a: 24, b: 2.6, n: 36, per: 28, s: -1, from: 0.08 }, { cy: -10.5, a: 24, b: 2.6, n: 36, per: 41, s: 1, from: 0.16 }];
    let col = vec3(0), cover = float(0);
    for (const w of W3) {
      const e = vec2(p.x.div(w.a), p.y.sub(w.cy).div(w.b)), f = e.length();
      const d = f.sub(1).abs().mul(f).div(vec2(e.x.div(w.a), e.y.div(w.b)).length().max(0.0001));
      const th = atan2(e.y, e.x);
      const rot = c.real.div(w.per).mul(speed).mul(sense).mul(w.s);
      const pe = smoothstep(w.from, w.from + 0.2, u).mul(keep);
      const drawn = maskDraw(pe, atan2(e.x.abs(), e.y.negate()).div(TAU / 2));      // from the near point round both sides
      const dash = step(th.div(TAU).add(rot).mul(w.n).fract(), 0.55);
      const line = float(1).sub(smoothstep(float(0.05), blur.add(0.05), d)).mul(dash).mul(drawn);
      const pa = rot.mul(-TAU);
      const bd = p.sub(vec2(pa.cos().mul(w.a), pa.sin().mul(w.b).add(w.cy))).length();
      const bead = float(1).sub(smoothstep(float(0.55).sub(blur), 0.55, bd)).mul(step(0.999, pe));
      const lit = float(0.4).add(cul.mul(0.5));
      col = col.add(A.mul(line).mul(lit)).add(mix(B, W, 0.4).mul(bead).mul(lit.add(0.3)));
      cover = cover.max(line).max(bead);
    }
    m.colorNode = col;
    m.opacityNode = cover.mul(visionShown(ctx, c, rr.div(34)));
    m.alphaTest = 0.5;
    return m;
  }

  if (layer === "veil") {
    // near: 7 almond leaves falling in from above the frame, soft, each turning on its own clock
    const e = u.mul(vw1.sub(vw0));                                   // seconds into the slot
    const side = c.rnd(108).step(0.5).mul(2).sub(1);
    let glow = float(0);
    for (let j = 0; j < 7; j++) {
      const v = 2.6 + ((j * 5) % 7) * 0.25, fall = e.mul(v).add(((j * 3) % 7) * 1.2).mod(64);
      const cx = c.rnd(110 + j).sub(0.5).mul(7).add((j - 3) * 9.5).add(c.real.mul(0.37 + j * 0.06).add(j * 1.9).sin().mul(1.6)).add(side.mul(fall).mul(0.14));
      const ang = c.real.mul(0.33 + j * 0.05).add(j * 2.1).sin().mul(0.9).add(j * 0.8).mul(j % 2 ? 1 : -1);
      const q = p.sub(vec2(cx, float(29).sub(fall)));
      const lx = q.x.mul(ang.cos()).sub(q.y.mul(ang.sin())), ly = q.x.mul(ang.sin()).add(q.y.mul(ang.cos()));
      const yy = ly.div(2.5), half = float(1).sub(yy.mul(yy)).max(0.0001);
      const mm = lx.abs().div(half);                                 // 0 midrib .. 1 edge, in leaf half-widths (1 m)
      const leaf = smoothstep(1.0, 0.8, mm).mul(step(yy.abs(), 1)).mul(maskLid(keep, mm.div(1.0)));
      const rim = smoothstep(0.25, 0.9, mm).mul(0.6).add(0.4).mul(float(1).sub(smoothstep(0.1, 0.03, lx.abs()).mul(0.5)));
      glow = glow.add(leaf.mul(rim).mul(float(0.3).add(cul.mul(0.2))));
    }
    m.colorNode = mix(A, B, 0.35).mul(glow);
    m.opacityNode = visionShown(ctx, c, rr.div(34));
    m.transparent = true;
    m.blending = AdditiveBlending;
    m.depthWrite = false;
    return m;
  }

  // ---- THE BEING
  let col = vec3(0), cover = float(0);
  const add = (colour, mask) => { col = mix(col, colour, mask); cover = cover.max(mask); };
  const sx = mix(0.85, 1.2, c.rnd(104)), habit = c.pick(105, 3).sub(1).mul(0.02);   // weeping +, level, reaching -
  const q = vec2(p.x.abs().div(sx), p.y.abs());
  const tq = vec2(q.x, q.y.add(habit.mul(q.x).mul(q.x)));                           // the tree's own space
  // one pen stroke from the centre line outward: s = 0..1 (trunk 0..0.2, then a fifth per generation)
  const P = u.div(0.42).clamp(0, 1).mul(keep), P5 = P.mul(5);
  let d = float(1000), s = float(0);
  for (const g of SEGS) {
    const pa = tq.sub(vec2(g.ax, g.ay)), bb = g.bx * g.bx + g.by * g.by;
    const hmax = P5.sub(g.g + 1 + g.t0).div(g.dt).clamp(0, 1);
    const h = pa.dot(vec2(g.bx, g.by)).div(bb).clamp(0, 1).min(hmax);
    const di = pa.sub(vec2(g.bx, g.by).mul(h)).length().sub(WID[g.g]).add(step(hmax, 0.0001).mul(1000));
    s = select(di.lessThan(d), h.mul(g.dt).add(g.g + 1 + g.t0).div(5), s);
    d = d.min(di);
  }
  // the trunk: an hourglass band of black and white chevrons, drawn from the centre line both ways
  const tw = q.y.mul(q.y).mul(0.045).add(0.6), ax = p.x.abs();
  const tl = P5.clamp(0, 1).mul(T);
  const inT = float(1).sub(smoothstep(tw.sub(aa), tw, ax)).mul(step(q.y, tl)).mul(step(0.0005, P));
  s = mix(s, q.y.div(T * 5), inT);
  // the sap: on each kick a light runs from the root tips, up the trunk, out to the branch tips
  const sap = smoothstep(0.09, 0, s.mul(p.y.sign()).sub(mix(-1.1, 1.1, c.beat.fract())).abs()).mul(kon);
  const branch = float(1).sub(smoothstep(aa.negate(), 0, d));
  add(mix(A, W, sap.mul(0.8).add(0.25)).mul(float(0.8).add(sap.mul(0.6)).add(cul.mul(0.25))), branch);
  add(W.mul(1.5), nib(P, s, 0.012).mul(float(1).sub(smoothstep(0.1, 0.16, d))).mul(step(P, 0.995)).mul(step(0.001, P)).mul(float(1).sub(inT)));
  const nS = c.pick(101, 4).add(4);
  const chev = step(q.y.sub(ax.mul(0.9)).mul(nS).div(T).fract(), 0.5);
  add(vec3(0), inT);
  add(W.mul(float(0.8).add(sap.mul(0.7))), inT.mul(chev));
  add(mix(A, W, sap).mul(float(0.9).add(sap.mul(0.5))), inT.mul(smoothstep(tw.sub(0.16).sub(aa), tw.sub(0.16), ax)));
  add(W.mul(1.5), inT.mul(nib(P5.clamp(0, 1), q.y.div(T), 0.04)).mul(step(P5, 0.995)));

  // the fruit: a bead on every tip, lighting from the trunk outward; at the culmination a wave swells them
  const pf = smoothstep(0.4, 0.64, u).mul(keepF);
  const sv = c.pick(103, 3), nH = c.pick(102, 3);
  let fd = float(1000), fk = float(0);
  for (let i = 0; i < TIPS.length; i++) {
    const [fx, fy] = TIPS[i];
    const o = vec2(ax.sub(sx.mul(fx)), q.y.sub(float(fy).sub(habit.mul(fx * fx)))).abs();
    const di = mix(o.length(), o.x.add(o.y).mul(0.78), is(sv, 1));          // disc, diamond, (2: target)
    fk = select(di.lessThan(fd), float(TIPK[i]), fk);
    fd = fd.min(di);
  }
  const wave = fk.mul(1.5).sub(c.real.mul(1.1)).mul(TAU).sin().mul(0.5).add(0.5);
  const R = float(0.52).mul(cul.mul(wave).mul(0.3).add(1));
  const fon = maskBeads(pf, fk.mul(0.9).add(0.02));
  const body = float(1).sub(smoothstep(R.sub(aa), R, fd)).mul(fon);
  const gap = step(R.mul(0.5), fd).mul(step(fd, R.mul(0.74))).mul(is(sv, 2));
  const core = float(1).sub(smoothstep(R.mul(0.4).sub(aa), R.mul(0.4), fd));
  const flit = float(0.85).add(cul.mul(wave).mul(0.6)).add(sap.mul(0.5));
  add(B.mul(flit), body);
  add(vec3(0), body.mul(gap));
  add(W.mul(flit.add(0.2)), body.mul(core));
  const ring = (k) => float(1).sub(smoothstep(float(0.035), aa.add(0.035), fd.sub(R.mul(k)).abs()));
  const halo = ring(1.45).mul(step(0.5, nH)).max(ring(1.9).mul(step(1.5, nH))).mul(fon).mul(step(0.9, pf))
    .max(ring(mix(1.0, 2.4, cul.mul(wave))).mul(step(0.12, cul)).mul(fon));
  add(mix(B, W, 0.5).mul(float(0.7).add(cul.mul(0.5))), halo.mul(float(1).sub(body)));

  m.colorNode = col;
  m.opacityNode = cover.mul(visionShown(ctx, c, rr.div(30)));
  m.alphaTest = 0.5;
  return m;
}
