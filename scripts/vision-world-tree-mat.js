// THE WORLD TREE (vision being "world-tree"): a tree whose roots below mirror its branches above, an hourglass of
// clean line-art branching (3 generations), a bead fruit on every tip, a black-and-white chevron trunk between.
// ONE SCENE, FIVE LAYERS at five depths, one script (params.layer, baked), each on its OWN motion:
//   "world" z -30  SCROLLS   the cosmic tree: giant mirrored limbs fan out from her trunk (sky arms above, root arms
//                            below) with bead fruit, strata of bead rows scrolling along the horizons, two-stroke birds
//                            in the canopy. Opaque black; it grows from her centre as a lobed crown (canopy above,
//                            root-ball below), so the running scene is replaced lobe by lobe.
//   "ring"  z -12  TURNS     the three worlds: three horizon ellipses (upper, middle, under), counter-rotating dashes, a planet each
//   "being" z   0  BREATHES  trunk, branches and roots drawn by one pen outward; fruit; the heart (eye / knot / star);
//                            the sap climbs root tips -> crown tips, then canopy and roots SWAP FIGURE AND GROUND
//   "veil"  z +10  DRIFTS    six black almond leaves falling down the sides, each with a dithered shadow
//   "fore"  z +22  UNDULATES spores riding a travelling swell up both sides
//   the vines are real 3D tubes winding in depth: scripts/vision-world-tree-worm-geo.js / -worm-mat.js
// being / veil / fore / world are CUTOUT (alphaTest, depth-writing): a near shape hides what is behind it.
// THE SCORE (u = 0..1 of the slot): .015 trunk from the centre line both ways / .1 branches & roots, generation by
// generation / .25 the world crown grows / .3 fruit trunk-outward / .4 middle horizon, .46 upper, .52 under /
// .5 the heart / .55 birds, vines rise / .58 fruit halos / .6 spores / .62 leaves / .79 the sap climbs /
// .87 figure-ground swap / .93.. everything leaves last-in first-out through its own mask.
// Seed channels 320..339: 0 hue family, 1 trunk stripes, 2 fruit shape, 3 crown habit, 4 crown spread, 5 ring sense,
// 6 ring speed, 7 vine count, 8 vine skin order, 9 swap variant (canopy / roots / alternating), 10 world lobes,
// 11 strata scroll sense, 12 bird count, 13 which vine goes dark, 14 leaf columns, 15 heart variant, 16 hot accent,
// 17 world limb spread.
import { MeshBasicNodeMaterial, AdditiveBlending, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, mix, atan2, fwidth, select } from "builtin/tsl";
import { tripClock, visionShown, visionU, climb, maskDraw, maskBeads, maskIris, maskLid, nib } from "./lib/trip.js";

const TAU = 6.28318, S = 1.8;
const DEPTH = { world: 104, ring: 86, being: 74, veil: 64, fore: 52 };
// one quadrant of a tree (x >= 0, y >= 0), mirrored in x and y by the shader
function grow(T, LEN, SPR, NS, CURL, a0) {
  const SEGS = [], TIPS = [], G = LEN.length;
  (function g(x, y, a, k, sg) {
    const n = NS[k], l = LEN[k] / n;
    for (let i = 0; i < n; i++) {
      const r = (a - sg * CURL * i) * Math.PI / 180, x2 = x + Math.sin(r) * l, y2 = y + Math.cos(r) * l;
      SEGS.push({ ax: x, ay: y, bx: x2 - x, by: y2 - y, g: k, t0: i / n, dt: 1 / n });
      x = x2; y = y2;
    }
    const e = a - sg * CURL * (n - 1);
    if (k === G - 1) { TIPS.push([x, y]); return; }
    g(x, y, e + SPR[k + 1], k + 1, 1); g(x, y, e - SPR[k + 1], k + 1, -1);
  })(0, T, a0, 0, 1);
  const ORD = TIPS.map((t, i) => i).sort((a, b) => Math.hypot(...TIPS[a]) - Math.hypot(...TIPS[b]));
  return { SEGS, TIPS, K: TIPS.map((t, i) => ORD.indexOf(i) / TIPS.length) };
}
const T = 3.5;
const TREE = grow(T, [5.2, 4.2, 3.2], [50, 32, 26], [2, 2, 1], 4, 50);       // the being (tree units, x S metres)
const WID = [0.24, 0.17, 0.12];
const COSMOS = grow(0, [46, 34, 26], [72, 26, 22], [2, 2, 1], 3, 72);        // the world's limbs (world metres)
const BIRDS = [[58, 40], [80, 58], [46, 66], [98, 34], [70, 80], [108, 56]];

const is = (v, i) => step(v.sub(i).abs(), 0.5);
const inv = (x) => float(1).sub(x);
// nearest stroke of a grown tree: d (distance minus width), s (0..1 pen position along the tree)
function strokes(q, tree, pen, parts, first, wid) {
  let d = float(1000), s = float(0);
  for (const g of tree.SEGS) {
    const pa = q.sub(vec2(g.ax, g.ay)), bb = g.bx * g.bx + g.by * g.by;
    const hmax = pen.sub(g.g + first + g.t0).div(g.dt).clamp(0, 1);
    const h = pa.dot(vec2(g.bx, g.by)).div(bb).clamp(0, 1).min(hmax);
    const di = pa.sub(vec2(g.bx, g.by).mul(h)).length().sub(wid(g.g)).add(step(hmax, 0.0001).mul(1000));
    s = select(di.lessThan(d), h.mul(g.dt).add(g.g + first + g.t0).div(parts), s);
    d = d.min(di);
  }
  return { d, s };
}

export function material(ctx) {
  const layer = ctx.params.layer ?? "being";
  const c = tripClock(ctx);
  const u = visionU(ctx, c);
  const io = (a, b, x, y) => smoothstep(a, b, u).mul(inv(smoothstep(x, y, u)));
  const lin = (a, b) => u.sub(a).div(b - a).clamp(0, 1);
  const rn = (n) => c.rnd(320 + n), pk = (n, k) => c.pick(320 + n, k);
  const sense = (n) => step(0.5, rn(n)).mul(2).sub(1);
  const fam = pk(0, 3), hot = pk(16, 3);
  const blue = vec3(0.05, 0.12, 1.0), violet = vec3(0.45, 0.05, 1.0), pink = vec3(1.0, 0.05, 0.6), orange = vec3(1.0, 0.38, 0.02);
  const yellow = vec3(1.0, 0.85, 0.05), green = vec3(0.1, 1.0, 0.15), W = vec3(1, 1, 1);
  const A = green.mul(is(fam, 0)).add(violet.mul(is(fam, 1))).add(blue.mul(is(fam, 2)));    // wood
  const B = yellow.mul(is(fam, 0)).add(pink.mul(is(fam, 1))).add(orange.mul(is(fam, 2)));   // fruit
  const H = pink.mul(is(hot, 0)).add(orange.mul(is(hot, 1))).add(yellow.mul(is(hot, 2)));   // hot accent
  const P = positionGeometry.xy;
  const live = visionShown(ctx, c, 0);
  const kon = step(0.001, c.kick);
  const cul = io(0.84, 0.88, 0.93, 0.95).mul(climb(c).mul(0.4).add(0.6));
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  m.fog = false;

  // ------------------------------------------------------------------ WORLD: the cosmic tree (scrolls)
  if (layer === "world") {
    const aa = fwidth(P.x).mul(1.2).max(0.03);
    const stroke = (d, w) => inv(smoothstep(float(w), aa.add(w), d));
    const ax = P.x.abs(), ay = P.y.abs();
    // coverage: a lobed crown above and its mirrored root-ball below, swelling from her centre
    const g = io(0.25, 0.45, 0.962, 0.99), Rg = g.mul(195);
    const th = atan2(ay, ax), nl = pk(10, 3).mul(2).add(5);
    const lobe = th.mul(nl).mul(2).cos().mul(0.5).add(0.5);
    const Rl = Rg.mul(lobe.mul(0.14).add(0.86));
    const r = P.length();
    const buds = step(r, Rl.add(lobe.pow(6).mul(14).mul(g)));                 // each lobe leads with a bud
    const cover = step(r, Rl).max(buds).mul(step(0.003, g));
    // the limbs grow with the crown, drawn outward; a kick sends sap out along them
    const spread = mix(0.85, 1.15, rn(17));
    const wq = vec2(ax.div(spread), ay);
    const wpen = Rg.div(150).mul(3).clamp(0, 3);
    const L = strokes(wq, COSMOS, wpen, 3, 0, (k) => 0.5 - k * 0.12);
    const limb = inv(smoothstep(aa.negate(), 0, L.d));
    const run = smoothstep(0.06, 0, L.s.sub(c.beat.fract().mul(1.2)).abs()).mul(kon);
    let col = A.mul(limb).mul(float(0.38).add(run.mul(1.2)).add(cul.mul(0.15)));
    col = col.add(W.mul(nib(wpen.div(3), L.s, 0.02).mul(stroke(L.d, 1.2)).mul(step(wpen, 2.99)).mul(step(0.01, wpen))).mul(0.9));
    // fruit on the limb tips, lighting nearest first
    const pf = io(0.42, 0.52, 0.962, 0.975);
    let fd = float(1000), fk = float(0);
    COSMOS.TIPS.forEach(([x, y], i) => { const di = wq.sub(vec2(x, y)).length(); fk = select(di.lessThan(fd), float(COSMOS.K[i]), fk); fd = fd.min(di); });
    const fon = maskBeads(pf, fk.mul(0.9).add(0.05));
    const fr = inv(smoothstep(float(2.4).sub(aa), 2.4, fd)).mul(fon);
    const fring = stroke(fd.sub(3.6).abs(), 0.18).mul(fon);
    col = mix(col, B.mul(0.75), fr).add(W.mul(inv(smoothstep(0.7, 0.9, fd)).mul(fon)).mul(0.6)).add(B.mul(fring).mul(0.4));
    // strata: bead rows along sagging horizons beyond her, scrolling along them, the kick ripples out through them
    const yr = ay.sub(ax.mul(ax).mul(0.0012));
    const band = yr.sub(46).div(11), ri = band.floor();
    const inBand = step(0, band).mul(step(band, 4));
    const sp = ri.mul(0.6).add(3.2);
    const xs = ax.add(c.real.mul(ri.mul(0.5).add(1.4)).mul(sense(11))).div(sp).fract().sub(0.5).mul(sp);
    const bd = vec2(xs, band.fract().sub(0.5).mul(11)).length();
    const br = ri.mul(0.1).add(0.45);
    const kl = smoothstep(9, 0, r.sub(c.beat.fract().mul(150)).abs()).mul(kon);
    const sb = inv(smoothstep(br.sub(aa), br, bd)).mul(inBand).mul(io(0.36, 0.48, 0.958, 0.966));
    col = col.add(mix(A, B, ri.mod(2)).mul(sb).mul(float(0.26).add(kl.mul(0.8))));
    // the horizon, dashed outward from her
    col = col.add(A.mul(stroke(ay, 0.12).mul(step(ax.sub(c.real.mul(2)).div(6).fract(), 0.55)).mul(step(ax, Rg))).mul(0.5));
    // birds: two-stroke glyphs settling into the canopy one by one, each beating its wings on its own clock
    const pb = io(0.55, 0.68, 0.945, 0.955), nb = pk(12, 4).add(3);
    let bird = float(0);
    BIRDS.forEach(([x, y], i) => {
      const bx = float(x).add(c.real.mul(0.21 + i * 0.05).add(i).sin().mul(4)), by = float(y).add(c.real.mul(0.33 + i * 0.04).add(i * 2).sin().mul(2));
      const q = vec2(ax.sub(bx), P.y.sub(by)), qx = q.x.abs();
      const fl = c.real.mul(3.1 + i * 0.37).add(i * 1.7).sin();
      const qy = q.y.add(fl.mul(qx).mul(0.45)), rw = 2.1;
      const dw = vec2(qx.sub(rw), qy).length().sub(rw).abs();
      bird = bird.max(stroke(dw, 0.2).mul(step(0, qy)).mul(step(qx, rw * 2)).mul(maskBeads(pb, i / 6)).mul(step(i + 0.5, nb)));
    });
    col = col.add(mix(B, W, 0.6).mul(bird).mul(0.9));
    m.colorNode = col;
    m.opacityNode = cover.mul(live);
    m.alphaTest = 0.5;
    return m;
  }

  const Lm = S * DEPTH[layer] / 74;
  const p = P.div(Lm);                                     // tree units, wherever the layer stands
  const aa = fwidth(p.x).mul(1.2).max(0.004);
  const rr = p.length();

  // ------------------------------------------------------------------ RING: the three worlds (turns, soft)
  if (layer === "ring") {
    const blur = aa.mul(3);
    const sg = sense(5), speed = mix(0.7, 1.4, rn(6));
    const W3 = [{ cy: 0, a: 16.5, b: 1.9, n: 48, per: 64, s: 1, from: 0.4, out: 0.96 }, { cy: 15.5, a: 11.5, b: 1.3, n: 36, per: 28, s: -1, from: 0.46, out: 0.955 }, { cy: -15.5, a: 11.5, b: 1.3, n: 36, per: 41, s: 1, from: 0.52, out: 0.95 }];
    let col = vec3(0), cover = float(0);
    for (const w of W3) {
      const e = vec2(p.x.div(w.a), p.y.sub(w.cy).div(w.b)), f = e.length();
      const d = f.sub(1).abs().mul(f).div(vec2(e.x.div(w.a), e.y.div(w.b)).length().max(0.0001));
      const th = atan2(e.y, e.x);
      const rot = c.real.div(w.per).mul(speed).mul(sg).mul(w.s);
      const pe = io(w.from, w.from + 0.08, w.out, w.out + 0.01);
      const drawn = maskDraw(pe, atan2(e.x.abs(), e.y.negate()).div(TAU / 2));     // from the near point round both sides
      const dash = step(th.div(TAU).add(rot).mul(w.n).fract(), 0.55);
      const line = inv(smoothstep(float(0.035), blur.add(0.035), d)).mul(dash).mul(drawn);
      const pa = rot.mul(-TAU);
      const bd = p.sub(vec2(pa.cos().mul(w.a), pa.sin().mul(w.b).add(w.cy))).length();
      const bead = inv(smoothstep(float(0.38).sub(blur), 0.38, bd)).mul(step(0.98, pe));
      const lit = float(0.42).add(cul.mul(0.4));
      col = col.add(A.mul(line).mul(lit)).add(mix(B, W, 0.4).mul(bead).mul(lit.add(0.4)));
      cover = cover.max(line).max(bead);
    }
    m.colorNode = col;
    m.opacityNode = cover.mul(live);
    m.transparent = true;
    m.blending = AdditiveBlending;
    m.depthWrite = false;
    return m;
  }

  // ------------------------------------------------------------------ VEIL: falling black leaves (drifts)
  if (layer === "veil") {
    const e = u.sub(0.62).mul(ctx.param("vw1", -1).sub(ctx.param("vw0", -1)));   // seconds since the leaves began
    const keep = inv(smoothstep(0.928, 0.942, u));
    const side = sense(14);
    const px = P.x, py = P.y;
    const fw = fwidth(px).max(0.0001);
    const dith = px.div(fw).floor().mod(2).add(py.div(fw).floor().mod(2).mul(2));  // 2x2 ordered cell: 0..3
    const shadeOn = step(dith.sub(1.5).abs(), 1);                                   // cells 1 and 2: half the pixels
    const lineW = fw.mul(1.5);
    let col = vec3(0), cover = float(0);
    const COLS = [-38, -27, -16, 16, 27, 38];
    for (let j = 0; j < 6; j++) {
      const v = 2.4 + ((j * 5) % 6) * 0.22, off = ((j * 7) % 6) * 9 + 2;
      const fall = e.mul(v).sub(off), yy0 = float(33).sub(fall.max(0).mod(72));
      const cx = float(COLS[j] + side * 3).add(rn(14).sub(0.5).mul(6)).add(c.real.mul(0.31 + j * 0.05).add(j * 1.9).sin().mul(2.4));
      const ang = c.real.mul(0.29 + j * 0.05).add(j * 2.1).sin().mul(0.8).add(j * 0.9).mul(j % 2 ? 1 : -1);
      const on = step(0, fall).mul(keep);
      const leaf = (dx, dy) => {
        const q = vec2(px.sub(cx).sub(dx), py.sub(yy0).sub(dy));
        const lx = q.x.mul(ang.cos()).sub(q.y.mul(ang.sin())), ly = q.x.mul(ang.sin()).add(q.y.mul(ang.cos()));
        const yy = ly.div(3.2), half = inv(yy.mul(yy)).max(0.0001).mul(1.35);
        return { lx, ly, half, inside: step(lx.abs(), half).mul(step(yy.abs(), 1)) };
      };
      const L = leaf(0, 0), Sh = leaf(1.1, -1.6);
      const body = L.inside.mul(on).mul(maskLid(keep.mul(on), L.lx.abs().div(1.35)));
      const shadow = Sh.inside.mul(on).mul(inv(body)).mul(shadeOn);
      const rim = step(L.half.sub(lineW.mul(1.3)), L.lx.abs());
      const rib = step(L.lx.abs(), lineW.mul(0.7));
      const veins = step(L.ly.sub(L.lx.abs().mul(0.9)).mul(1.4).fract(), 0.12).mul(step(L.lx.abs(), L.half.mul(0.8)));
      const lit = mix(A, W, 0.2).mul(rim.max(rib)).add(A.mul(veins).mul(0.35)).mul(float(0.8).add(cul.mul(0.3)));
      col = mix(col, vec3(0), shadow);
      col = mix(col, lit, body);
      cover = cover.max(body).max(shadow);
    }
    m.colorNode = col;
    m.opacityNode = cover.mul(live);
    m.alphaTest = 0.5;
    return m;
  }

  // ------------------------------------------------------------------ FORE: spores on a travelling swell (undulates)
  if (layer === "fore") {
    const fa = fwidth(P.x).mul(1.2).max(0.01);
    const ax = P.x.abs(), pin = io(0.6, 0.78, 0.935, 0.945);
    let col = vec3(0), cover = float(0);
    for (let j = 0; j < 5; j++) {
      const yj = c.real.mul(0.045 + j * 0.008).add(j * 0.23 + 0.1).fract().mul(80).sub(40);
      const xj = yj.mul(0.13).sub(c.real.mul(1.1)).add(j * 1.3).sin().mul(4).add(50 + (j % 3) * 3.5);
      const rad = 1.1 + (j % 3) * 0.35;
      const pj = pin.mul(1.6).sub(j * 0.13).clamp(0, 1);
      const q = vec2(ax.sub(xj), P.y.sub(yj)).div(rad), d = q.length();
      const disc = maskIris(pj, d);
      const ring = step(d, 0.95).mul(step(0.72, d));
      const dot = step(d, 0.28);
      const cw = mix(A, W, 0.3).mul(ring).add(H.mul(dot)).mul(float(0.85).add(cul.mul(0.3)));
      col = mix(col, cw, disc); cover = cover.max(disc);
    }
    m.colorNode = col;
    m.opacityNode = cover.mul(live);
    m.alphaTest = 0.5;
    return m;
  }

  // ------------------------------------------------------------------ THE BEING (breathes)
  let col = vec3(0), cover = float(0);
  const add = (colour, mask) => { col = mix(col, colour, mask); cover = cover.max(mask); };
  const breath = c.real.mul(TAU / 12).sin().mul(0.012).add(1);                     // one slow breath per phrase
  const sx = mix(0.9, 1.15, rn(4)), habit = pk(3, 3).sub(1).mul(0.02);
  const q = vec2(p.x.abs().div(sx), p.y.abs()).div(breath);
  const tq = vec2(q.x, q.y.add(habit.mul(q.x).mul(q.x)));
  // one pen: trunk 0..1, then a part per generation (P4 = 0..4); retracts tips-first at the end
  const P4 = lin(0.015, 0.1).add(lin(0.1, 0.3).mul(3)).min(inv(u).div(0.03).mul(4).clamp(0, 4));
  const st = strokes(tq, TREE, P4, 4, 1, (k) => WID[k]);
  let s = st.s;
  const d = st.d;
  const tw = q.y.mul(q.y).mul(0.04).add(0.6), ax = p.x.abs();
  const inT = inv(smoothstep(tw.sub(aa), tw, ax)).mul(step(q.y, P4.clamp(0, 1).mul(T))).mul(step(0.0005, P4));
  s = mix(s, q.y.div(T * 4), inT);
  const ss = s.mul(p.y.sign());                                                      // -1 root tips .. +1 crown tips
  // the sap: a kick sends a light from root tips to crown tips; from .79 the sap fills the tree root to crown
  const sap = smoothstep(0.08, 0, ss.sub(mix(-1.1, 1.1, c.beat.fract())).abs()).mul(kon);
  const sl = lin(0.79, 0.87).mul(2.2).sub(1.1).mul(step(0.79, u));
  const fill = step(ss, sl).mul(step(0.79, u)).mul(inv(step(0.935, u)));
  const front = smoothstep(0.06, 0, ss.sub(sl).abs()).mul(step(0.79, u)).mul(step(u, 0.875));
  // the swap: once the sap tops the crown, one half (or each in turn, by the beat) turns negative
  const fv = pk(9, 3);
  const top = is(fv, 0).add(is(fv, 2).mul(c.beat.div(2).floor().mod(2)));
  const half = select(p.y.greaterThan(0), top, inv(top));
  const ex = q.x.div(13.6), ey = q.y.sub(9.6).div(7.4), er = vec2(ex, ey).length();
  const fp = io(0.87, 0.885, 0.928, 0.94);
  const fd0 = vec2(q.x, q.y.sub(T)).length().div(17);
  const flip = maskIris(fp, fd0).mul(step(er, 1)).mul(half);
  const G = mix(A, W, 0.12).mul(0.85);
  add(G, flip);
  const ea = atan2(ey, ex);
  add(W, stroke2(er.sub(1).abs().mul(8), 0.1).mul(step(ea.div(TAU).mul(40).fract(), 0.5)).mul(maskIris(fp, fd0)).mul(half).mul(step(0.01, fp)));
  function stroke2(dd, w) { return inv(smoothstep(float(w), aa.add(w), dd)); }

  const branch = inv(smoothstep(aa.negate(), 0, d));
  const wood = mix(A, W, sap.mul(0.8).add(fill.mul(0.45)).add(0.18)).mul(float(0.8).add(sap.mul(0.6)).add(fill.mul(0.5)).add(front.mul(1.5)));
  add(mix(wood, vec3(0), flip), branch);
  add(W.mul(1.5), nib(P4.div(4), s, 0.012).mul(inv(smoothstep(0.1, 0.18, d))).mul(step(P4, 3.99)).mul(step(0.001, P4)).mul(inv(inT)));
  const nS = pk(1, 4).add(4);
  const chev = step(q.y.sub(ax.mul(0.9)).mul(nS).div(T).fract(), 0.5);
  add(mix(vec3(0), G, flip), inT);
  add(mix(W.mul(float(0.8).add(sap.mul(0.7)).add(fill.mul(0.3))), vec3(0), flip), inT.mul(chev));
  add(mix(wood, vec3(0), flip), inT.mul(smoothstep(tw.sub(0.17).sub(aa), tw.sub(0.17), ax)));
  add(W.mul(1.5), inT.mul(nib(P4.clamp(0, 1), q.y.div(T), 0.04)).mul(step(P4, 0.995)));

  // the fruit: a bead on every tip, lighting from the trunk outward; halos join them later
  const pf = io(0.3, 0.42, 0.96, 0.97);
  const sv = pk(2, 3);
  let fd = float(1000), fk = float(0);
  TREE.TIPS.forEach(([fx, fy], i) => {
    const o = vec2(q.x.sub(fx), tq.y.sub(fy)).abs();
    const di = mix(o.length(), o.x.add(o.y).mul(0.78), is(sv, 1));          // disc, diamond, (2: target)
    fk = select(di.lessThan(fd), float(TREE.K[i]), fk);
    fd = fd.min(di);
  });
  const wave = fk.mul(1.5).sub(c.real.mul(1.1)).mul(TAU).sin().mul(0.5).add(0.5);
  const R = float(0.62).mul(cul.mul(wave).mul(0.3).add(1));
  const fon = maskBeads(pf, fk.mul(0.9).add(0.04));
  const body = inv(smoothstep(R.sub(aa), R, fd)).mul(fon);
  const gap = step(R.mul(0.5), fd).mul(step(fd, R.mul(0.72))).mul(is(sv, 2));
  const core = inv(smoothstep(R.mul(0.38).sub(aa), R.mul(0.38), fd));
  const flit = float(0.85).add(cul.mul(wave).mul(0.5)).add(sap.mul(0.5)).add(fill.mul(0.4));
  add(vec3(0), inv(smoothstep(R.add(0.12).sub(aa), R.add(0.12), fd)).mul(fon));    // a black collar so fruit read on the swapped ground
  add(B.mul(flit), body);
  add(vec3(0), body.mul(gap));
  add(W.mul(flit.add(0.2)), body.mul(core));
  const ph = io(0.58, 0.66, 0.955, 0.96);
  const ring = (k) => inv(smoothstep(float(0.04), aa.add(0.04), fd.sub(R.mul(k)).abs()));
  const halo = ring(1.5).mul(maskBeads(ph, fk)).max(ring(2.0).mul(maskBeads(ph.mul(1.3).sub(0.3), fk)));
  add(mix(B, W, 0.5).mul(float(0.7).add(cul.mul(0.4))), halo.mul(inv(body)));

  // the heart, where trunk meets horizon: an eye opening, a knot of beads, or a four-point star
  const hv = pk(15, 3), ph2 = io(0.5, 0.56, 0.945, 0.955);
  const hp = vec2(p.x, p.y).div(breath);
  const hx = hp.x.abs(), hy = hp.y.abs();
  const lidH = inv(hp.x.div(2.6).mul(hp.x.div(2.6))).max(0).mul(1.25).mul(ph2).mul(cul.mul(0.35).add(1));
  const eyeIn = step(hy, lidH).mul(step(hx, 2.6));
  const eyeRim = eyeIn.mul(step(lidH.sub(0.16), hy));
  const ir = hp.length();
  const eyeC = mix(mix(B, W, 0.2), vec3(0), step(ir, 0.45)).mul(step(ir, 0.95)).add(A.mul(eyeRim).mul(1.2)).add(W.mul(step(vec2(hp.x.sub(0.25), hp.y.sub(0.25)).length(), 0.14)));
  add(eyeC, eyeIn.mul(is(hv, 0)));
  const ka = atan2(hp.y, hp.x);
  const knotRing = step(ir.sub(1.5).abs(), 0.16);
  const kb = vec2(ka.div(TAU).mul(8).fract().sub(0.5).mul(TAU * 2.5 / 8), ir.sub(2.5)).length();
  const knot = maskIris(ph2, ir.div(1.7)).mul(step(ir, 1.7)).max(step(kb, 0.32).mul(maskBeads(ph2, ka.div(TAU).add(0.5))));
  add(mix(B, W, step(1.7, ir).mul(0.6)).mul(knotRing.max(step(1.7, ir))).add(A.mul(step(ir, 0.6))), knot.mul(is(hv, 1)));
  const s4 = hx.div(2.4).sqrt().add(hy.div(2.4).sqrt());
  const star = step(s4, ph2).mul(step(0.01, ph2));
  add(mix(W, B, smoothstep(0.3, 0.9, s4)).mul(step(s4.sub(ph2.mul(0.8)), 0).max(step(ph2.mul(0.8), s4).mul(0.0))).add(B.mul(step(ph2.mul(0.8), s4))), star.mul(is(hv, 2)));

  m.colorNode = col;
  m.opacityNode = cover.mul(visionShown(ctx, c, rr.div(30)));
  m.alphaTest = 0.5;
  return m;
}
