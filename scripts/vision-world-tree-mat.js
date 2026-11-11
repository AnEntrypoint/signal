// THE WORLD TREE: roots below mirror branches above, bead fruit on every tip, a chevron trunk between.
// Five layers, one script (params.layer): world z-30 the cosmic tree / ring z-12 three horizons / being z0 /
// veil z+10 falling black leaves / fore z+22 spores. Vines: vision-world-tree-worm-*.js.
// SCORE (u): 0 world seeds glimmer / .015-.15 first stroke / -.40 tree whole (seeded: centre-out, roots-up, crown-down) /
// .2-.45 world crown / .4 fruit / .46 .52 .58 horizons / .55 heart / .6 birds / .62 leaves / .66 spores / .68 sap /
// .76 figure-ground swap / EXIT .80 fore, .83 veil, .86 ring, .89 heart+fruit, .91-.975 tree (seeded), .983-1 world.
// Seed channels 320+: 0 family 1 stripes 2 fruit 3 habit 4 spread 5,6 ring 7,8,13,23 vines 9 swap 10 lobes 11 strata
// 12 birds 14 leaves 15 heart 16 hot 17 limb spread 18 wood/fruit 19 entrance 20 exit 21 world entrance.
import { MeshBasicNodeMaterial, AdditiveBlending, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, mix, atan2, fwidth, select } from "builtin/tsl";
import { tripClock, visionShown, visionU, climb, maskDraw, maskBeads, maskIris, maskLid, inv, is, ioU, strokeAA } from "./lib/trip.js";

const TAU = 6.28318, S = 1.8;
const at2 = (y, x) => atan2(y, select(x.abs().lessThan(0.00001), float(0.00001), x));   // atan2(0, 0) is undefined on some GPUs: never both zero
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

const near = (x, w) => inv(smoothstep(0, w, x.abs()));     // 1 at x = 0, edges low to high (reversed edges NaN on some GPUs)
const nib = (p, u, w) => near(float(u).sub(p), w);
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
  const io = ioU(u), low = ctx.quality === "low";
  const lin = (a, b) => u.sub(a).div(b - a).clamp(0, 1);
  const rn = (n) => c.rnd(320 + n), pk = (n, k) => c.pick(320 + n, k);
  const sense = (n) => step(0.5, rn(n)).mul(2).sub(1);
  // family 0 blue/violet, 1 magenta/orange, 2 green/yellow, 3 white op-art. Wrapped by fract, not mod: mod(8, 4) can
  // return 4 on a GPU, a family with no colour (the black tree of seed 6)
  const fam = c.seed.add(pk(0, 4)).add(0.5).div(4).fract().mul(4).floor().clamp(0, 3), hot = pk(16, 3), swp = pk(18, 2);
  const blue = vec3(0.05, 0.12, 1.0), violet = vec3(0.45, 0.05, 1.0), pink = vec3(1.0, 0.05, 0.6), orange = vec3(1.0, 0.38, 0.02);
  const yellow = vec3(1.0, 0.85, 0.05), green = vec3(0.1, 1.0, 0.15), W = vec3(1, 1, 1);
  const H = pink.mul(is(hot, 0)).add(orange.mul(is(hot, 1))).add(yellow.mul(is(hot, 2)));   // hot accent
  const A0 = blue.mul(is(fam, 0)).add(pink.mul(is(fam, 1))).add(green.mul(is(fam, 2))).add(vec3(0.92, 0.92, 0.95).mul(is(fam, 3)));
  const B0 = violet.mul(is(fam, 0)).add(orange.mul(is(fam, 1))).add(yellow.mul(is(fam, 2))).add(H.mul(is(fam, 3)));
  const sw = swp.mul(step(fam, 2.5));                                                       // op-art keeps white wood
  const A = mix(A0, B0, sw), B = mix(B0, A0, sw);                                           // wood, fruit
  const P = positionGeometry.xy;
  const live = visionShown(ctx, c, 0);
  const kon = step(0.001, c.kick);
  const cul = io(0.72, 0.78, 0.86, 0.9).mul(climb(c).mul(0.4).add(0.6));
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  m.fog = false;

  // ------------------------------------------------------------------ WORLD: the cosmic tree (scrolls)
  if (layer === "world") {
    const aa = fwidth(P.x).mul(1.2).max(0.03), stroke = strokeAA(aa);
    const ax = P.x.abs(), ay = P.y.abs(), r = P.length();
    const g = io(0.2, 0.45, 0.983, 0.999), Rg = g.mul(195);
    const spread = mix(0.85, 1.15, rn(17));
    const wq = vec2(ax.div(spread), ay);
    const wpen = g.mul(3.9).clamp(0, 3);
    const L = strokes(wq, COSMOS, wpen, 3, 0, (k) => 0.5 - k * 0.12);
    let fd = float(1000), fk = float(0);
    COSMOS.TIPS.forEach(([x, y], i) => { const di = wq.sub(vec2(x, y)).length(); fk = select(di.lessThan(fd), float(COSMOS.K[i]), fk); fd = fd.min(di); });
    // SEEDS: the limb tips glimmer from u 0, nearest first, and stand to the seam
    const sOn = maskBeads(smoothstep(0, 0.14, u), fk.mul(0.9).add(0.02));
    const seeds = step(fd, 3.9).mul(sOn);
    // cover (seeded): a lobed crown and root-ball swelling from her centre, or the canopy thickening out of the
    // limbs themselves as the pen draws them root to branch
    const th = at2(ay, ax), nl = pk(10, 3).mul(2).add(5);
    const lobe = th.mul(nl).mul(2).cos().mul(0.5).add(0.5).clamp(0, 1);
    const crown = step(r, Rg.mul(lobe.mul(0.14).add(0.86)).add(lobe.pow(6).mul(14).mul(g)));
    const canopy = step(L.d, g.mul(g).mul(170));
    const cover = mix(crown, canopy, is(pk(21, 2), 1)).mul(step(0.003, g)).max(seeds);
    const limb = inv(smoothstep(aa.negate(), 0, L.d));
    const run = near(L.s.sub(c.beat.fract().mul(1.2)), 0.06).mul(kon);
    let col = A.mul(limb).mul(float(0.38).add(run.mul(1.2)).add(cul.mul(0.15)));
    col = col.add(W.mul(nib(wpen.div(3), L.s, 0.02).mul(stroke(L.d, 1.2)).mul(step(wpen, 2.99)).mul(step(0.01, wpen))).mul(0.9));
    const fon = maskBeads(io(0.42, 0.52, 0.99, 0.999), fk.mul(0.9).add(0.05));
    const fr = inv(smoothstep(float(2.4).sub(aa), 2.4, fd)).mul(fon);
    const fring = stroke(fd.sub(3.6).abs(), 0.18).mul(fon);
    const twk = c.real.mul(2.3).add(fk.mul(31)).sin().mul(0.4).add(0.6);
    col = mix(col, B.mul(0.75), fr).add(W.mul(step(fd, 0.8).mul(sOn)).mul(twk)).add(B.mul(fring).mul(0.4))
      .add(B.mul(stroke(fd.sub(1.8).abs(), 0.14)).mul(sOn).mul(inv(fon)).mul(twk).mul(0.7));
    if (!low) {
      // strata: bead rows along sagging horizons, scrolling; the kick ripples out through them
      const yr = ay.sub(ax.mul(ax).mul(0.0012));
      const band = yr.sub(46).div(11), ri = band.floor();
      const sp = ri.mul(0.6).add(3.2).max(1);
      const xs = ax.add(c.real.mul(ri.mul(0.5).add(1.4)).mul(sense(11))).div(sp).fract().sub(0.5).mul(sp);
      const bd = vec2(xs, band.fract().sub(0.5).mul(11)).length();
      const br = ri.mul(0.1).add(0.45);
      const kl = near(r.sub(c.beat.fract().mul(150)), 9).mul(kon);
      const sb = inv(smoothstep(br.sub(aa), br, bd)).mul(step(0, band)).mul(step(band, 4)).mul(maskBeads(io(0.36, 0.48, 0.983, 0.995), r.div(200)));
      col = col.add(mix(A, B, ri.mod(2)).mul(sb).mul(float(0.26).add(kl.mul(0.8))));
      // birds: two-stroke glyphs settling into the canopy one by one
      const pb = io(0.6, 0.72, 0.9, 0.93), nb = pk(12, 4).add(3);
      let bird = float(0);
      BIRDS.forEach(([x, y], i) => {
        const bx = float(x).add(c.real.mul(0.21 + i * 0.05).add(i).sin().mul(4)), by = float(y).add(c.real.mul(0.33 + i * 0.04).add(i * 2).sin().mul(2));
        const q = vec2(ax.sub(bx), P.y.sub(by)), qx = q.x.abs();
        const qy = q.y.add(c.real.mul(3.1 + i * 0.37).add(i * 1.7).sin().mul(qx).mul(0.45)), rw = 2.1;
        const dw = vec2(qx.sub(rw), qy).length().sub(rw).abs();
        bird = bird.max(stroke(dw, 0.2).mul(step(0, qy)).mul(step(qx, rw * 2)).mul(maskBeads(pb, i / 6)).mul(step(i + 0.5, nb)));
      });
      col = col.add(mix(B, W, 0.6).mul(bird).mul(0.9));
    }
    col = col.add(A.mul(stroke(ay, 0.12).mul(step(ax.sub(c.real.mul(2)).div(6).fract(), 0.55)).mul(step(ax, Rg))).mul(0.5));
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
    const W3 = [{ cy: 0, a: 16.5, b: 1.9, n: 48, per: 64, s: 1, from: 0.46, out: 0.89 }, { cy: 15.5, a: 11.5, b: 1.3, n: 36, per: 28, s: -1, from: 0.52, out: 0.875 }, { cy: -15.5, a: 11.5, b: 1.3, n: 36, per: 41, s: 1, from: 0.58, out: 0.86 }];
    let col = vec3(0), cover = float(0);
    for (const w of W3) {
      const e = vec2(p.x.div(w.a), p.y.sub(w.cy).div(w.b)), f = e.length();
      const d = f.sub(1).abs().mul(f).div(vec2(e.x.div(w.a), e.y.div(w.b)).length().max(0.0001));
      const th = at2(e.y, e.x);
      const rot = c.real.div(w.per).mul(speed).mul(sg).mul(w.s);
      const pe = io(w.from, w.from + 0.06, w.out, w.out + 0.025);
      const drawn = maskDraw(pe, at2(e.x.abs(), e.y.negate()).div(TAU / 2));     // from the near point round both sides
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
    const keep = inv(smoothstep(0.83, 0.86, u));
    const side = sense(14);
    const px = P.x, py = P.y;
    const fw = fwidth(px).max(0.0001);
    const dith = px.div(fw).floor().mod(2).add(py.div(fw).floor().mod(2).mul(2));  // 2x2 ordered cell: 0..3
    const shadeOn = step(dith.sub(1.5).abs(), 1);                                   // cells 1 and 2: half the pixels
    const lineW = fw.mul(1.5);
    let col = vec3(0), cover = float(0);
    const COLS = [-38, -27, -16, 16, 27, 38];
    for (let j = 0; j < (low ? 4 : 6); j++) {
      const v = 2.4 + ((j * 5) % 6) * 0.22, off = ((j * 7) % 6) * 9 + 2;
      const fall = e.mul(v).sub(off), yy0 = float(33).sub(fall.max(0).mod(72));
      const cx = float(COLS[j]).add(side.mul(3)).add(rn(14).sub(0.5).mul(6)).add(c.real.mul(0.31 + j * 0.05).add(j * 1.9).sin().mul(2.4));
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
      const shadow = low ? float(0) : Sh.inside.mul(on).mul(inv(body)).mul(shadeOn);
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
    const ax = P.x.abs(), pin = io(0.66, 0.78, 0.8, 0.83);
    let col = vec3(0), cover = float(0);
    for (let j = 0; j < (low ? 3 : 5); j++) {
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
  // ROOT TO BRANCH: s = 0 trunk centre .. 1 tips, ss = -1 root tips .. +1 crown tips. Entrance (channel 19): centre
  // out both ways / root tips up to the crown / crown down to the roots. Exit (channel 20): tips retract / the roots
  // let go first, climbing / the crown lets go first, sinking.
  const st = strokes(tq, TREE, float(4), 4, 1, (k) => WID[k]);
  let s = st.s;
  const d = st.d;
  const tw = q.y.mul(q.y).mul(0.04).add(0.6), ax = p.x.abs();
  const inT0 = inv(smoothstep(tw.sub(aa), tw, ax)).mul(step(q.y, T));
  s = mix(s, q.y.div(T * 4), inT0);
  const ss = s.mul(p.y.sign());
  const ev = pk(19, 3), xv = pk(20, 3);
  const up = ss.add(1).mul(0.5), dn = inv(up);
  const kin = s.mul(is(ev, 0)).add(up.mul(is(ev, 1))).add(dn.mul(is(ev, 2)));
  const kout = inv(s).mul(is(xv, 0)).add(up.mul(is(xv, 1))).add(dn.mul(is(xv, 2)));
  const gin = lin(0.015, 0.15).mul(0.25).add(lin(0.15, 0.4).mul(0.75)), gout = lin(0.91, 0.975);
  const drawn = step(kin, gin.mul(1.01)).mul(step(0.0005, gin)).mul(step(gout.mul(1.03).sub(0.01), kout));
  const inT = inT0.mul(drawn);
  // the sap: a kick sends a light from root tips to crown tips; from .79 the sap fills the tree root to crown
  const sap = near(ss.sub(mix(-1.1, 1.1, c.beat.fract())), 0.08).mul(kon);
  const sl = lin(0.68, 0.76).mul(2.2).sub(1.1).mul(step(0.68, u));
  const fill = step(ss, sl).mul(step(0.68, u));
  const front = near(ss.sub(sl), 0.06).mul(step(0.68, u)).mul(step(u, 0.765));
  // the swap: once the sap tops the crown, one half (or each in turn, by the beat) turns negative
  const fv = pk(9, 3);
  const top = is(fv, 0).add(is(fv, 2).mul(c.beat.div(2).floor().mod(2)));
  const half = select(p.y.greaterThan(0), top, inv(top));
  const ex = q.x.div(13.6), ey = q.y.sub(9.6).div(7.4), er = vec2(ex, ey).length();
  const fp = io(0.76, 0.79, 0.85, 0.88);
  const fd0 = vec2(q.x, q.y.sub(T)).length().div(17);
  const flip = maskIris(fp, fd0).mul(step(er, 1)).mul(half);
  // the swapped half goes SILHOUETTE: black ground, its growing front and its seam a neon line, wood an outline only
  const flipIn = maskIris(fp, fd0.add(0.03)).mul(step(er, 0.985)).mul(half).mul(step(0.12, p.y.abs()));
  const G = vec3(0);
  add(G, flip);
  add(mix(A, W, 0.35).mul(1.3), flip.mul(inv(flipIn)).mul(step(0.01, fp)));
  const ea = at2(ey, ex);
  add(W, stroke2(er.sub(1).abs().mul(8), 0.1).mul(step(ea.div(TAU).mul(40).fract(), 0.5)).mul(maskIris(fp, fd0)).mul(half).mul(step(0.01, fp)));
  function stroke2(dd, w) { return inv(smoothstep(float(w), aa.add(w), dd)); }

  const branch = inv(smoothstep(aa.negate(), 0, d)).mul(drawn);
  const wood = mix(A, W, sap.mul(0.8).add(fill.mul(0.45)).add(0.18)).mul(float(0.8).add(sap.mul(0.6)).add(fill.mul(0.5)).add(front.mul(1.5)));
  const rimW = inv(smoothstep(float(-0.07).sub(aa), -0.07, d));                    // the branch's outer edge band
  add(mix(wood, A.mul(1.4), flip), branch.mul(inv(flip).max(inv(rimW))));
  add(W.mul(1.5), nib(gin, kin, 0.012).mul(inv(smoothstep(0.1, 0.18, d)).max(inT0)).mul(step(gin, 0.995)).mul(step(0.001, gin)).mul(step(gout, 0.001)));
  const nS = pk(1, 4).add(4);
  const chev = step(q.y.sub(ax.mul(0.9)).mul(nS).div(T).fract(), 0.5);
  add(mix(vec3(0), G, flip), inT);
  add(mix(W.mul(float(0.8).add(sap.mul(0.7)).add(fill.mul(0.3))), vec3(0), flip), inT.mul(chev));
  add(mix(wood, A.mul(1.4), flip), inT.mul(smoothstep(tw.sub(0.17).sub(aa), tw.sub(0.17), ax)));

  // the fruit: a bead on every tip, lighting from the trunk outward; halos join them later
  const pf = io(0.4, 0.5, 0.895, 0.915);
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
  if (!low) {
    const ph = io(0.62, 0.7, 0.88, 0.895);
    const ring = (k) => inv(smoothstep(float(0.04), aa.add(0.04), fd.sub(R.mul(k)).abs()));
    const halo = ring(1.5).mul(maskBeads(ph, fk)).max(ring(2.0).mul(maskBeads(ph.mul(1.3).sub(0.3), fk)));
    add(mix(B, W, 0.5).mul(float(0.7).add(cul.mul(0.4))), halo.mul(inv(body)));
  }

  // the heart, where trunk meets horizon: an eye opening, a knot of beads, or a four-point star
  const hv = pk(15, 3), ph2 = io(0.55, 0.61, 0.89, 0.91);
  const hp = vec2(p.x, p.y).div(breath);
  const hx = hp.x.abs(), hy = hp.y.abs();
  const lidH = inv(hp.x.div(2.6).mul(hp.x.div(2.6))).max(0).mul(1.25).mul(ph2).mul(cul.mul(0.35).add(1));
  const eyeIn = step(hy, lidH).mul(step(hx, 2.6));
  const eyeRim = eyeIn.mul(step(lidH.sub(0.16), hy));
  const ir = hp.length();
  const eyeC = mix(mix(B, W, 0.2), vec3(0), step(ir, 0.45)).mul(step(ir, 0.95)).add(A.mul(eyeRim).mul(1.2)).add(W.mul(step(vec2(hp.x.sub(0.25), hp.y.sub(0.25)).length(), 0.14)));
  add(eyeC, eyeIn.mul(is(hv, 0)));
  const ka = at2(hp.y, hp.x);
  const knotRing = step(ir.sub(1.5).abs(), 0.16);
  const kb = vec2(ka.div(TAU).mul(8).fract().sub(0.5).mul(TAU * 2.5 / 8), ir.sub(2.5)).length();
  const knot = maskIris(ph2, ir.div(1.7)).mul(step(ir, 1.7)).max(step(kb, 0.32).mul(maskBeads(ph2, ka.div(TAU).add(0.5))));
  add(mix(B, W, step(1.7, ir).mul(0.6)).mul(knotRing.max(step(1.7, ir))).add(A.mul(step(ir, 0.6))), knot.mul(is(hv, 1)));
  const s4 = hx.div(2.4).max(0).sqrt().add(hy.div(2.4).max(0).sqrt());
  const star = step(s4, ph2).mul(step(0.01, ph2));
  add(mix(W, B, smoothstep(0.3, 0.9, s4)).mul(step(s4, ph2.mul(0.8))).add(B.mul(step(ph2.mul(0.8), s4))), star.mul(is(hv, 2)));

  m.colorNode = col;
  m.opacityNode = cover.mul(visionShown(ctx, c, rr.div(30))).clamp(0, 1);
  m.alphaTest = 0.5;
  return m;
}
