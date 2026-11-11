// THE WEAVER (vision being BEINGS[13]): a spider grandmother at the centre of her web, 8 line-art legs, a patterned
// abdomen holding a small spiral galaxy. The web IS her world.
// ONE SCENE, FIVE LAYERS at five depths, one script (params.layer, baked), each on its OWN motion:
//   "world" z -30  DRIFTS    the web billowing in a slow wind (outer threads move most): spokes nib-drawn one by one
//                            from her, then the capture thread laid ring by ring, dew beads, caught glyphs on threads.
//                            Opaque black; grows from her outward with a scalloped front like a web's frame threads.
//   "ring"  z -12  TURNS     two twisted-cord rings and a ring of dew beads, counter-rotating (soft, additive)
//   "being" z   0  BREATHES  dragline, thorax, 8 legs pair by pair, abdomen with op-art pattern, head, 8 eyes, galaxy
//   "veil"  z +10  SCROLLS   silk threads paying out downward, silkworms wriggling down on them (solid black)
//   "fore"  z +22  UNDULATES dew drops riding a travelling swell along the bottom corners; her nearest leg tips step
//                            slowly in at the top corners, black with striped joints
//   her SILK-WORMS are real 3D tubes winding in depth: scripts/vision-weaver-worm-geo.js / -worm-mat.js
// being / veil / fore / world are CUTOUT (alphaTest, depth-writing): a near shape hides what is behind it.
// THE SCORE (u): 0 hub dot + dragline up / .04 thorax / .1-.3 legs pair by pair, abdomen .2, head + palps .24, eyes .28,
// silk paid down .27 / .25 world grows / .27 spokes one by one / .36 capture rings laid inside out / .4 cord ring,
// .48 dew ring / .5 galaxy, eyes wake, leg beads / .52 dew on the web / .56 caught glyphs / .55 silkworms (3D) /
// .62 veil silkworms descend / .68 near legs step in / .7 drifting dew / .85 FRASER: the rings twist into cords and the
// dew lights a counter-spiral: concentric rings read as a spiral; one silkworm goes dark / .93.. last-in first-out.
// Seed channels 460..479: 0 hue family, 1 spoke count, 2 hot accent, 3 glyph set + mirror, 4 wind sense, 5 ring sense,
// 6 worm count, 7 worm skin, 8 dark worm, 9 cord twist sense, 10 ring spacing, 11 abdomen pattern, 12 galaxy arms,
// 13 step phase, 14 veil thread count, 15 dew ring count, 16 galaxy sense.
import { MeshBasicNodeMaterial, AdditiveBlending, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, mix, atan2, fwidth, select } from "builtin/tsl";
import { tripClock, visionShown, visionU, climb, maskDraw, maskBeads, maskIris, maskClock, nib, stripes } from "./lib/trip.js";

const TAU = 6.28318;
// her legs, right side (mirrored at x = 0), from the thorax rim out: femur up, tibia, tarsus to the foot
const LEGS = [[[2.6, 4.6], [12, 15], [22, 19.5], [31, 12]], [[3.6, 3.2], [14, 9.5], [26, 8], [34, -1]],
  [[3.6, 1.2], [14, -1], [25, -7], [30, -17]], [[2.6, -0.4], [11, -9], [19, -18], [22, -30]]];
const PALP = [[1.1, 9.6], [2.8, 12.2], [1.9, 14.4]];
const EYES = [[0.75, 9.0, 0.5], [1.85, 8.6, 0.36], [0.55, 10.15, 0.3], [1.55, 9.95, 0.26]];
const GLY = [[-66, 30], [74, -20], [-40, -56]];

const is = (v, i) => step(v.sub(i).abs(), 0.5);
const inv = (x) => float(1).sub(x);
const rot = (v, a) => vec2(v.x.mul(a.cos()).sub(v.y.mul(a.sin())), v.x.mul(a.sin()).add(v.y.mul(a.cos())));
function segD(q, a, b) {
  const bx = b[0] - a[0], by = b[1] - a[1], pa = q.sub(vec2(a[0], a[1]));
  const h = pa.dot(vec2(bx, by)).div(bx * bx + by * by).clamp(0, 1);
  return pa.sub(vec2(bx, by).mul(h)).length();
}
// distance to a polyline, length fraction u along it, distance jd to its inner joints; points JS or nodes
function polyline(q, pts) {
  const P2 = pts.map((p) => (Array.isArray(p) ? vec2(p[0], p[1]) : p));
  const segs = [];
  let total = float(0);
  for (let i = 0; i < P2.length - 1; i++) { const b = P2[i + 1].sub(P2[i]); const len = b.length(); segs.push([P2[i], b, len, total]); total = total.add(len); }
  let d = float(1000), u = float(0), jd = float(1000);
  for (const [a, b, len, L0] of segs) {
    const pa = q.sub(a), h = pa.dot(b).div(b.dot(b)).clamp(0, 1);
    const di = pa.sub(b.mul(h)).length();
    u = select(di.lessThan(d), h.mul(len).add(L0).div(total), u);
    d = d.min(di);
  }
  for (let i = 1; i < P2.length - 1; i++) jd = jd.min(q.sub(P2[i]).length());
  return { d, u, jd, total };
}

export function material(ctx) {
  const layer = ctx.params.layer ?? "being";
  const c = tripClock(ctx), u = visionU(ctx, c), t = c.real;
  const io = (a, b, x, y) => smoothstep(a, b, u).mul(inv(smoothstep(x, y, u)));
  const rn = (n) => c.rnd(460 + n), pk = (n, k) => c.pick(460 + n, k);
  const sense = (n) => step(0.5, rn(n)).mul(2).sub(1);
  const fam = pk(0, 3), hot = pk(2, 4);
  const blue = vec3(0.05, 0.12, 1.0), violet = vec3(0.45, 0.05, 1.0), pink = vec3(1.0, 0.05, 0.6), ice = vec3(0.45, 0.6, 1.0), W = vec3(1, 1, 1);
  const A = blue.mul(is(fam, 0)).add(violet.mul(is(fam, 1))).add(blue.mul(is(fam, 2)));   // body
  const B = violet.mul(is(fam, 0)).add(pink.mul(is(fam, 1))).add(ice.mul(is(fam, 2)));     // accent
  const H = pink.mul(is(hot, 0)).add(vec3(1.0, 0.85, 0.05).mul(is(hot, 1))).add(vec3(0.1, 1.0, 0.15).mul(is(hot, 2))).add(vec3(1.0, 0.42, 0.02).mul(is(hot, 3)));
  const P = positionGeometry.xy;
  const live = visionShown(ctx, c, 0);
  const kickOn = step(0.001, c.kick);
  const cul = io(0.85, 0.9, 0.93, 0.955).mul(climb(c).mul(0.4).add(0.6));
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;

  // ------------------------------------------------------------------ WORLD: the web (drifts in the wind)
  if (layer === "world") {
    const aa = fwidth(P.x).mul(1.2).max(0.03);
    const stroke = (d, w) => inv(smoothstep(float(w), aa.add(w), d));
    const bow = P.length().div(150).clamp(0, 1);
    const wind = vec2(t.mul(0.21).sin().mul(6).mul(sense(4)), t.mul(0.13).cos().mul(3));
    const q = P.sub(wind.mul(bow.mul(bow)));
    const r = q.length(), a01 = atan2(q.x, q.y).div(TAU).add(0.5);      // 0.5 straight up, 0 / 1 straight down
    const N = float(12).add(pk(1, 3).mul(2));
    const sec = a01.mul(N), fr = sec.fract();
    // coverage: black silk ground spreading from her, its front scalloped between spokes like a web's frame threads
    const grow = io(0.25, 0.45, 0.955, 0.995), Rg = grow.mul(190);
    const frontR = Rg.mul(inv(fr.mul(Math.PI).sin().mul(0.2)));
    const cover = step(r, frontR).mul(step(0.004, grow));
    const frame = stroke(frontR.sub(r), 0.22).mul(step(0.004, grow));
    const kf = c.beat.fract().mul(170);
    const kl = smoothstep(7, 0, r.sub(kf).abs()).mul(kickOn).mul(smoothstep(170, 70, kf));   // the kick: a tremor running out along the silk
    // spokes, nib-drawn one by one from her, top first, both sides together
    const kS = sec.round().div(N).sub(0.5).abs().mul(2);
    const dSp = fr.min(inv(fr)).mul(TAU).div(N).mul(r);
    const pSp = io(0.27, 0.42, 0.945, 0.97), pj = pSp.mul(1.3).sub(kS).div(0.3).clamp(0, 1), uS = r.div(170);
    const spoke = stroke(dSp, 0.16).mul(maskDraw(pj, uS)).mul(step(5, r)).mul(step(0.002, pj));
    const nibS = nib(pj, uS, 0.012).mul(stroke(dSp, 0.6)).mul(step(pj, 0.995)).mul(step(0.002, pj));
    // the capture thread: straight chords between spokes, laid ring by ring from the hub out
    const th = fr.sub(0.5).mul(TAU).div(N);
    const rho = r.mul(th.cos()).div(float(Math.PI).div(N).cos());
    const SP = float(7.5).add(rn(10).mul(2.5)), NR = 17;
    const rl = rho.sub(9).div(SP), kr = rl.round(), dR = rl.sub(kr).abs().mul(SP);
    const okR = step(0, kr).mul(step(kr, NR)), kKey = kr.div(NR);
    const pRg = io(0.36, 0.58, 0.95, 0.975), pr = pRg.sub(kKey.mul(0.8)).div(0.2).clamp(0, 1);
    const uR = a01.sub(0.5).abs().mul(2);
    const drawn = maskDraw(pr, uR).mul(okR).mul(step(0.002, pr));
    const ringL = stroke(dR, 0.13).mul(drawn);
    const nibR = nib(pr, uR, 0.02).mul(stroke(dR, 0.6)).mul(okR).mul(step(pr, 0.995)).mul(step(0.002, pr));
    // FRASER at the culmination: each ring becomes a twisted cord (black / white segments tilted one way)
    const s = a01.mul(TAU).mul(r), tilt = sense(9);
    const cord = step(s.div(2.2).add(rl.sub(kr).mul(SP).mul(1.2).mul(tilt)).add(kr.mul(0.5)).fract(), 0.5);
    const band = stroke(dR, 0.7).mul(drawn);
    // dew: beads along the capture thread, appearing one by one; a counter-spiral of them lights against the cords
    const sb = s.div(3.4), bid = sb.floor();
    const bdd = vec2(sb.fract().sub(0.5).mul(3.4), rl.sub(kr).mul(SP)).length();
    const h = kr.mul(12.9898).add(bid.mul(78.233)).sin().mul(43758.5453).fract();
    const pDw = io(0.52, 0.68, 0.94, 0.965);
    const dew = inv(smoothstep(0.48, aa.add(0.48), bdd)).mul(drawn).mul(maskBeads(pDw, h.mul(0.5).add(kKey.mul(0.5))));
    const spv = a01.mul(3).add(r.add(1).log().mul(1.5).mul(tilt)).add(t.mul(0.05)).fract();
    const spiral = smoothstep(0.22, 0, spv.sub(0.5).abs());
    let col = A.mul(spoke.add(ringL.mul(inv(cul))).mul(kl.mul(1.2).add(0.5)));
    col = col.add(mix(A.mul(0.35), W.mul(0.9), cord).mul(band).mul(cul));
    col = col.add(W.mul(nibS.add(nibR)).mul(1.3)).add(B.mul(frame).mul(0.6));
    const dewC = mix(mix(B, W, 0.6), H, step(h, 0.07)).mul(float(0.45).add(spiral.mul(cul.mul(1.2).add(0.25))).add(kl.mul(0.6)));
    col = mix(col, dewC, dew);
    // three caught glyphs hanging on short threads, swinging: moon (or eye), key (or star), feather
    const mir = sense(3), alt = step(0.5, rn(3).mul(7).fract());
    GLY.forEach(([gx, gy], i) => {
      const pG = io(0.56 + i * 0.04, 0.62 + i * 0.04, 0.945 - i * 0.005, 0.962 - i * 0.005);
      const top = vec2(mir.mul(gx), gy + 11);
      const v = rot(q.sub(top), t.mul(0.8).add(i * 2.1).sin().mul(0.14)).add(vec2(0, 11));
      const thr = stroke(v.x.abs(), 0.12).mul(step(5.5, v.y)).mul(step(v.y, 11)).mul(maskDraw(pG.mul(2).clamp(0, 1), inv(v.y.sub(5.5).div(5.5))));
      const reveal = maskIris(pG.mul(2).sub(1).clamp(0, 1), v.length().div(6.5)).mul(step(0.5, pG));
      let gd;
      if (i === 0) {
        const cres = v.length().sub(5).max(float(4.3).sub(v.sub(vec2(2.2, 1)).length()));
        const eye = vec2(v.x.div(5.5), v.y.abs().add(1.2).div(3.6)).length().sub(1).abs().mul(3).min(v.length().sub(1.6).abs());
        gd = mix(cres.abs(), eye, alt);
      } else if (i === 1) {
        const key = v.sub(vec2(0, 2.6)).length().sub(2.2).abs().min(segD(v, [0, 0.4], [0, -5])).min(segD(v, [0, -4.6], [1.7, -4.6])).min(segD(v, [0, -3.2], [1.3, -3.2]));
        const ag = atan2(v.x, v.y), star = v.length().sub(ag.mul(5).cos().mul(1.6).add(3.4)).abs();
        gd = mix(key, star, alt);
      } else {
        const vane = vec2(v.x.div(2.4), v.y.div(5.5)).length();
        const barb = stroke(v.x.abs().mul(0.8).sub(v.y).div(1.1).fract().sub(0.5).abs(), 0.12).mul(step(vane, 1)).mul(step(0.25, v.x.abs()));
        gd = vane.sub(1).abs().mul(2.4).min(segD(v, [0, -7], [0, 5.5])).min(float(1).sub(barb).mul(9));
      }
      const gc = i === 1 ? H : mix(B, W, 0.5);
      col = col.mul(inv(reveal.mul(step(v.length(), 6)))).add(gc.mul(stroke(gd, 0.2)).mul(reveal)).add(A.mul(thr).mul(0.7));
    });
    m.colorNode = col;
    m.opacityNode = cover.mul(live);
    m.alphaTest = 0.5;
    return m;
  }

  // ------------------------------------------------------------------ RING: cords and dew (turns, soft)
  if (layer === "ring") {
    const aa = fwidth(P.x).mul(1.2).max(0.02);
    const stroke = (d, w) => inv(smoothstep(float(w), aa.add(w), d));
    const r = P.length(), a = atan2(P.x, P.y);
    const R1 = 47, R2 = 54, sn = sense(5);
    const r1 = t.mul(0.045).mul(sn), r2 = t.mul(-0.03).mul(sn);
    const p1 = io(0.4, 0.5, 0.94, 0.96), p2 = io(0.48, 0.58, 0.935, 0.955);
    const cord = step(a.add(r1).div(TAU).mul(96).add(P.length().sub(R1).mul(0.45).mul(sense(9))).fract(), 0.5);
    const band = stroke(r.sub(R1).abs(), 1.3).mul(maskClock(p1, a));
    const rails = stroke(r.sub(R1 + 1.9).abs(), 0.1).add(stroke(r.sub(R1 - 1.9).abs(), 0.1)).mul(maskClock(p1, a.negate()));
    const nb = float(24).add(pk(15, 2).mul(8));
    const ag = a.add(r2).div(TAU).add(0.5).mul(nb), id = ag.floor().mod(nb);
    const bd = vec2(ag.fract().sub(0.5).mul(R2 * TAU).div(nb), r.sub(R2)).length();
    const bead = inv(smoothstep(0.95, aa.add(0.95), bd)).mul(maskBeads(p2, id.div(nb)));
    const silk = stroke(r.sub(R2).abs(), 0.07).mul(p2);
    const kf = c.beat.fract();
    const kl = kickOn.mul(inv(kf)).mul(0.8);
    const col = mix(A.mul(0.25), mix(B, W, cul.mul(0.6).add(0.2)), cord).mul(band).mul(float(0.55).add(kl).add(cul.mul(0.5)))
      .add(A.mul(rails).mul(0.6)).add(mix(mix(B, W, 0.5), H, step(id.mod(4), 0.5)).mul(bead).mul(float(0.6).add(kl))).add(B.mul(silk).mul(0.3));
    m.colorNode = col;
    m.opacityNode = live;
    m.transparent = true;
    m.blending = AdditiveBlending;
    m.depthWrite = false;
    return m;
  }

  // ------------------------------------------------------------------ VEIL: silkworms paying down on silk (scrolls)
  if (layer === "veil") {
    const aa = fwidth(P.x).mul(1.2).max(0.02);
    const stroke = (d, w) => inv(smoothstep(float(w), aa.add(w), d));
    const ax = P.x.abs();
    let col = vec3(0), cover = float(0);
    const XS = [42, 55, 66], LN = [22, 36, 14];
    const third = step(0.5, rn(14));
    XS.forEach((X, i) => {
      const ex = i === 2 ? third : float(1);
      const dp = io(0.62 + i * 0.04, 0.76 + i * 0.04, 0.93 + (2 - i) * 0.006, 0.95 + (2 - i) * 0.006).mul(ex);
      const cy = float(52).sub(dp.mul(14 + LN[i])).add(t.mul(1.1).add(i).sin().mul(0.7).mul(dp));
      const sway = t.mul(0.55).add(i * 1.7).sin().mul(1.6);
      const xt = sway.mul(float(52).sub(P.y).div(float(52).sub(cy)).clamp(0, 1)).add(X);
      const dash = step(P.y.add(t.mul(4)).div(2.4).fract(), 0.62).mul(0.6).add(0.4);
      const thr = stroke(ax.sub(xt).abs(), 0.1).mul(step(cy, P.y)).mul(step(0.002, dp));
      col = col.add(mix(A, W, 0.3).mul(thr).mul(dash).mul(inv(cover)));
      cover = cover.max(thr.mul(step(0.5, dash)));
      // the worm: six segments hanging below the thread's end, wriggling on a wave that runs down it
      for (let k = 0; k < 6; k++) {
        const sx = X + 0, sr = 1.55 - k * 0.14;
        const ctr = vec2(sway.add(sx).add(t.mul(2.2).sub(k * 0.9).sin().mul(0.5 + k * 0.12)), cy.sub(k * 2.4 + 1.4));
        const d = vec2(ax, P.y).sub(ctr).length();
        const body = step(d, sr).mul(step(0.002, dp));
        const ringC = mix(W, A, step(d.div(sr).mul(3).fract(), 0.5)).mul(step(0.55, d.div(sr)));
        col = col.mul(inv(body)).add(ringC.mul(body).mul(0.7)).add(B.mul(stroke(d.sub(sr).abs(), 0.12)).mul(step(0.002, dp)))
          .add(H.mul(inv(smoothstep(0.3, aa.add(0.3), d))).mul(step(0.002, dp)));
        cover = cover.max(body);
      }
    });
    m.colorNode = col;
    m.opacityNode = cover.mul(live);
    m.alphaTest = 0.5;
    return m;
  }

  // ------------------------------------------------------------------ FORE: dew on a swell, her near legs (undulates)
  if (layer === "fore") {
    const aa = fwidth(P.x).mul(1.2).max(0.01);
    const stroke = (d, w) => inv(smoothstep(float(w), aa.add(w), d));
    const ax = P.x.abs(), q = vec2(ax, P.y);
    let col = vec3(0), cover = float(0);
    const pDr = io(0.7, 0.8, 0.925, 0.945);
    for (let i = 0; i < 6; i++) {
      const x = t.mul(1.6).add(i * 7.3).mod(42).add(32);
      const y = x.mul(0.12).sub(t.mul(0.9)).sin().mul(3).sub(27);
      const life = x.sub(32).div(42).mul(Math.PI).sin().clamp(0, 1);
      const rr = life.sqrt().mul(1.4).mul(maskBeads(pDr, i / 6));
      const d = q.sub(vec2(x, y)), dl = vec2(d.x, d.y.add(d.y.min(0).mul(-0.0)).sub(d.y.max(0).mul(0.45))).length();
      const body = step(dl, rr);
      col = col.mul(inv(body)).add(B.mul(stroke(dl.sub(rr).abs(), 0.1)).mul(step(0.05, rr))).add(W.mul(inv(smoothstep(0.25, 0.35, d.sub(vec2(-0.4, 0.4).mul(rr)).length())).mul(body)));
      cover = cover.max(body);
    }
    const ph = t.mul(0.33).add(rn(13).mul(6.28));
    const lift = ph.sin().max(0).mul(4), tx = ph.cos().mul(3).add(46);
    const pts = [vec2(80, 4), vec2(61, 40), vec2(tx.add(5), lift.mul(0.4).add(31)), vec2(tx, lift.add(24))];
    const pl = polyline(q, pts);
    const pLg = io(0.68, 0.78, 0.925, 0.945), on = maskDraw(pLg, pl.u).mul(step(0.002, pLg));
    const w = float(2.4).sub(pl.u.mul(1.4));
    const body = step(pl.d, w).mul(on);
    const joint = step(pl.jd, 3.2).mul(step(pl.jd.mul(1.2).fract(), 0.5)).mul(inv(cul));
    col = col.mul(inv(body)).add(mix(W, A, 0.3).mul(body).mul(joint).mul(smoothstep(0.9, 0.7, pl.d.div(w))))
      .add(mix(A, W, 0.3).mul(stroke(pl.d.sub(w).abs(), 0.12)).mul(on));
    cover = cover.max(body);
    m.colorNode = col;
    m.opacityNode = cover.mul(live);
    m.alphaTest = 0.5;
    return m;
  }

  // ------------------------------------------------------------------ THE BEING (breathes)
  const p = P.div(t.mul(TAU / 6.5).sin().mul(0.025).add(1));
  const aa = fwidth(p.x).mul(1.2).max(0.01);
  const stroke = (d, w) => inv(smoothstep(float(w), aa.add(w), d));
  const ax = p.x.abs(), pm = vec2(ax, p.y), rr = p.length();
  const kf = c.beat.fract().mul(40);
  const kl = smoothstep(2.5, 0, rr.sub(kf).abs()).mul(kickOn).mul(smoothstep(40, 18, kf));
  const rimC = mix(A, W, kl.mul(0.6).add(cul.mul(0.3)));
  let col = vec3(0), cover = float(0);
  const add = (colour, mask) => { col = col.add(colour.mul(mask)); cover = cover.max(mask); };
  const solid = (mask) => { col = col.mul(inv(mask)); cover = cover.max(mask); };
  // the first stroke: a dot at the hub, her dragline drawn up out of it; later the silk she pays down to the web
  add(W, step(rr, io(0, 0.025, 0.985, 0.998).mul(1.3)));
  const pTh = io(0, 0.07, 0.975, 0.995), uTh = p.y.sub(10.7).div(37);
  add(mix(B, W, 0.5), stroke(ax, 0.1).mul(step(0, uTh)).mul(maskDraw(pTh, uTh)).mul(step(0.002, pTh)));
  add(W.mul(1.5), nib(pTh, uTh, 0.03).mul(stroke(ax, 0.35)).mul(step(pTh, 0.995)).mul(step(0, uTh)).mul(step(0.002, pTh)));
  const pSk = io(0.27, 0.36, 0.945, 0.965), uSk = p.y.add(16.8).negate().div(31);
  add(mix(B, W, 0.4), stroke(ax, 0.09).mul(step(0, uSk)).mul(maskDraw(pSk, uSk)).mul(step(0.002, pSk)));
  add(W.mul(1.5), nib(pSk, uSk, 0.03).mul(stroke(ax, 0.35)).mul(step(0, uSk)).mul(step(pSk, 0.995)).mul(step(0.002, pSk)));
  // eight legs, pair by pair: black, a neon rim, striped knees, a bead row along each (details)
  const pDet = io(0.5, 0.64, 0.94, 0.96);
  LEGS.forEach((pts, i) => {
    const pl = polyline(pm, pts);
    const pL = io(0.1 + i * 0.045, 0.17 + i * 0.045, 0.95 + (3 - i) * 0.008, 0.965 + (3 - i) * 0.008);
    const on = maskDraw(pL, pl.u).mul(step(0.002, pL));
    const w = float(1.0).sub(pl.u.mul(0.55));
    const body = step(pl.d, w).mul(on);
    solid(body);
    const joint = step(pl.jd, 2.0).mul(step(pl.jd.mul(1.7).fract(), 0.5));
    add(mix(W, B, 0.35).mul(0.8), body.mul(joint).mul(smoothstep(0.85, 0.6, pl.d.div(w))));
    add(rimC.mul(1.2), stroke(pl.d.sub(w).abs(), 0.12).mul(on));
    const sb = pl.u.mul(pl.total).div(1.6);
    const bd = vec2(sb.fract().sub(0.5).mul(1.6), pl.d).length();
    add(H, inv(smoothstep(0.26, aa.add(0.26), bd)).mul(maskBeads(pDet, pl.u)).mul(on).mul(inv(step(pl.jd, 2.0))));
    add(W.mul(1.4), nib(pL, pl.u, 0.03).mul(step(pl.d, 1.3)).mul(step(pL, 0.995)));
  });
  // the abdomen: black, an op-art pattern (chevrons or bead rows), a spiral galaxy in its heart
  const pAb = io(0.2, 0.27, 0.955, 0.975), ap = t.mul(TAU / 3.4).sin().mul(0.035).add(1);
  const qa = p.sub(vec2(0, -8.6)).div(ap), ea = vec2(qa.x.div(6.4), qa.y.div(8.2)).length(), aA = atan2(qa.x, qa.y.negate());
  solid(step(ea, 1).mul(step(0.9, pAb)));
  add(rimC.mul(1.2), stroke(ea.sub(1).abs().mul(7), 0.13).mul(maskClock(pAb, aA)).mul(step(0.002, pAb)));
  const pPt = io(0.27, 0.36, 0.95, 0.97), ann = step(0.62, ea).mul(step(ea, 0.9)).mul(maskBeads(pPt, inv(ea).div(0.4)));
  const chev = step(ax.mul(0.75).add(qa.y).div(1.5).fract(), 0.5);
  const er = ea.sub(0.62).div(0.07), ek = er.floor(), nbk = ek.mul(6).add(18);
  const eb = vec2(er.fract().sub(0.5), aA.div(TAU).mul(nbk).fract().sub(0.5).mul(2)).length();
  const rowsB = inv(smoothstep(0.32, 0.42, eb));
  const patV = step(0.5, rn(11));
  add(mix(mix(W, B, 0.45).mul(chev).mul(0.75), mix(mix(B, W, 0.4), H, step(ek.mod(3), 0.5)).mul(rowsB), patV), ann);
  const pGx = io(0.5, 0.6, 0.94, 0.96), rg = vec2(qa.x, qa.y.mul(0.8)).length(), agx = atan2(qa.y, qa.x);
  const arms = float(2).add(pk(12, 2));
  const phx = agx.sub(rg.add(0.3).log().mul(2.6)).mul(arms).div(TAU).add(t.mul(0.09).mul(sense(16))).fract();
  const arm = smoothstep(0.2, 0, phx.min(inv(phx))).mul(inv(smoothstep(2.6, 3.4, rg)));
  const knot = smoothstep(0.35, 0.05, rg.mul(3.2).sub(t.mul(0.3)).fract().sub(0.5).abs());
  const gal = mix(B, W, arm.mul(0.6)).mul(arm).mul(knot.mul(0.8).add(0.5)).add(W.mul(smoothstep(1.0, 0, rg))).mul(cul.mul(1.3).add(1));
  const gm = maskIris(pGx, rg.div(3.4)).mul(step(0.002, pGx));
  col = col.add(gal.mul(gm).mul(step(ea, 0.56)));
  add(B.mul(0.9), stroke(ea.sub(0.56).abs().mul(7), 0.08).mul(gm));
  // the thorax: black disc, a neon rim drawn round, an inner ring and eight rays (her legs' roots)
  const pTx = io(0.04, 0.1, 0.965, 0.985), qt = p.sub(vec2(0, 2)), rt = qt.length(), at = atan2(qt.x, qt.y);
  solid(step(rt, 4.2).mul(step(0.9, pTx)));
  add(rimC.mul(1.2), stroke(rt.sub(4.2).abs(), 0.13).mul(maskClock(pTx, at)).mul(step(0.002, pTx)));
  add(W.mul(1.4), stroke(rt.sub(4.2).abs(), 0.4).mul(nib(pTx, at.div(TAU).add(0.5), 0.02)).mul(step(pTx, 0.995)).mul(step(0.002, pTx)));
  const pTl = io(0.14, 0.24, 0.955, 0.975);
  add(B.mul(0.9), stroke(rt.sub(2.6).abs(), 0.09).mul(maskClock(pTl, at)).mul(step(0.002, pTl)));
  const rayD = at.div(TAU).mul(8).add(0.5).fract().sub(0.5).abs().mul(TAU / 8).mul(rt);
  add(A.mul(0.8), stroke(rayD, 0.08).mul(step(1, rt)).mul(step(rt, 2.5)).mul(maskDraw(pTl, rt.sub(1).div(1.5))));
  // head and palps, then her eight eyes one by one; at .5 they wake
  const pHd = io(0.24, 0.29, 0.96, 0.98), qh = p.sub(vec2(0, 8.3)), rh = qh.length();
  const palp = polyline(pm, PALP), pon = maskDraw(pHd, palp.u).mul(step(0.002, pHd));
  solid(step(palp.d, 0.45).mul(pon));
  add(rimC, stroke(palp.d.sub(0.45).abs(), 0.1).mul(pon));
  solid(step(rh, 2.4).mul(step(0.9, pHd)));
  add(rimC.mul(1.2), stroke(rh.sub(2.4).abs(), 0.12).mul(maskClock(pHd, atan2(qh.x, qh.y))).mul(step(0.002, pHd)));
  const pEy = io(0.28, 0.36, 0.95, 0.97), wake = io(0.5, 0.56, 0.95, 0.97).add(cul).clamp(0, 1.5);
  EYES.forEach(([ex, ey, er0], i) => {
    const de = pm.sub(vec2(ex, ey)).length();
    const disc = inv(smoothstep(float(er0).sub(aa), float(er0), de)).mul(maskBeads(pEy, i / 4));
    add(mix(A, mix(W, H, 0.3), wake.mul(0.7)).mul(wake.add(0.5)), disc);
    add(W.mul(1.5), inv(smoothstep(er0 * 0.25, er0 * 0.35, pm.sub(vec2(ex - er0 * 0.3, ey + er0 * 0.3)).length())).mul(disc));
  });
  m.colorNode = col;
  m.opacityNode = cover.mul(live);
  m.alphaTest = 0.5;
  return m;
}
