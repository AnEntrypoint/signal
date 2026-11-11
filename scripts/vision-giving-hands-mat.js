// THE GIVING HANDS (vision being): two open palms mirrored left/right, fingers up, in three nested neon
// contours, an eye in each palm, and between them a drop falling into concentric ripples.
// Three layers at three depths, one script (params.layer, baked), each on its own clock and sense:
//   "ring"  far (z -12): 16 soft dots orbiting a tilted ellipse, entering one by one
//   "being" (z 0): each outline draws from the wrist round to the wrist (maskDraw + nib), the inner and the
//           outer contour follow, the palm eyes open by their lids (maskLid) at u .6; on the culmination the
//           drop forms and falls, the ripples open from its landing (maskIris), fingertip beads light in a row.
//           After that a drop falls on each c.kick only (none where the track has no kick: it hangs).
//   "veil"  near (z +10): 5 long thin drips growing down from the top edge, each ending in a bokeh bead
// EXIT (last 0.5 s): ripples close, eyes shut, outlines retract to the wrists, drips and dots withdraw.
// Seed channels: 100 hue family, 101 ripple count, 102 drawing direction, 103 eye variant, 104 ring sense,
// 105 ring speed, 106 ring tilt, 108 hand lean, 110+ drip lengths, 116 comet speed.
import { MeshBasicNodeMaterial, AdditiveBlending, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, mix, fwidth, select } from "builtin/tsl";
import { tripClock, visionShown, visionU, climb, maskDraw, maskBeads, maskIris, maskLid, nib } from "./lib/trip.js";

const TAU = 6.28318;
const HX = 15, HY = 1;            // palm centre of the right hand (the left is its mirror)
const RY = -14, SQ = 0.3;         // ripple centre height, ripple flattening
const TOP = 5;                    // where the drop hangs
// right hand, thumb toward the centre, open at the wrist: wrist - thumb - four fingers - wrist
const HAND = [[-2.6, -9.5], [-2.8, -7], [-4.2, -5], [-7.5, -2], [-8.6, 0.2], [-8.2, 1.4], [-7, 1.2], [-4.6, -0.6],
  [-4.5, 3], [-4.5, 9.6], [-4, 10.5], [-3.1, 10.5], [-2.6, 9.6], [-2.6, 3.7], [-2.35, 3.4], [-2.1, 3.7],
  [-2.1, 11.1], [-1.6, 12], [-0.7, 12], [-0.2, 11.1], [-0.2, 3.7], [0.05, 3.4], [0.3, 3.7],
  [0.3, 10.1], [0.8, 11], [1.7, 11], [2.2, 10.1], [2.2, 3.6], [2.45, 3.3], [2.7, 3.6],
  [2.7, 7.7], [3.2, 8.5], [4.1, 8.5], [4.6, 7.7], [4.6, -3], [3.8, -6.5], [2.6, -7.5], [2.6, -9.5]];
const TIPS = [[-9.3, 1.7], [-3.55, 11.7], [-1.15, 13.2], [1.25, 12.2], [3.65, 9.7]];
const EYE = [0.1, -2.2];

const is = (v, i) => step(v.sub(i).abs(), 0.5);
// distance to the open outline, how far along it (0..1), and inside-ness (crossing number, wrist closed)
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
      const span = step(lo, q.y).mul(float(1).sub(step(hi, q.y)));
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
  const vw1 = ctx.param("vw1", -1);
  const keep = float(1).sub(smoothstep(vw1.sub(0.5), vw1, c.sec));          // the taking apart: last 0.5 s
  const kR = smoothstep(0.66, 1, keep), kE = smoothstep(0.4, 0.75, keep), kO = smoothstep(0, 0.5, keep);
  const cul = smoothstep(0.7, 0.95, u).mul(climb(c).mul(0.6).add(0.4)).mul(keep);
  const kickOn = step(0.001, c.kick);
  const fam = c.pick(100, 4);
  const blue = vec3(0.05, 0.12, 1.0), violet = vec3(0.45, 0.05, 1.0), pink = vec3(1.0, 0.05, 0.6), orange = vec3(1.0, 0.38, 0.02),
    yellow = vec3(1.0, 0.85, 0.05), green = vec3(0.1, 1.0, 0.15), W = vec3(1, 1, 1);
  const fams = [[blue, pink, yellow], [violet, orange, green], [pink, yellow, blue], [green, blue, pink]];
  const choose = (k) => fams.reduce((a, f, i) => a.add(f[k].mul(is(fam, i))), vec3(0));
  const A = choose(0), B = choose(1), C = choose(2);
  const p = positionGeometry.xy;
  const aa = fwidth(p.x).mul(1.2).max(0.01);
  const rr = p.length();
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  m.fog = false;

  if (layer === "ring") {
    // far: 16 dots on a tilted ellipse, its own slow clock and sense, soft (out of focus)
    const sense = c.rnd(104).step(0.5).mul(2).sub(1);
    const turn = c.real.div(mix(38, 64, c.rnd(105))).mul(sense);
    const tilt = mix(0.16, 0.36, c.rnd(106)).mul(sense), ct = tilt.cos(), st = tilt.sin();
    const e = vec2(p.x.mul(ct).add(p.y.mul(st)), p.y.mul(ct).sub(p.x.mul(st)));
    const pb = smoothstep(0.0, 0.3, u).mul(kO);
    let glow = float(0), hot = float(0);
    for (let i = 0; i < 16; i++) {
      const a = turn.add(i / 16).mul(TAU), sn = a.sin();
      const r = float(0.62).sub(sn.mul(0.26)).mul(i % 4 === 0 ? 1.35 : 1);        // nearer (lower) dots larger
      const d = e.sub(vec2(a.cos().mul(30), sn.mul(8.5))).length();
      const dot = smoothstep(r, r.mul(0.45), d).mul(maskBeads(pb, ((i * 5) % 16) / 16));
      if (i % 4 === 0) hot = hot.add(dot); else glow = glow.add(dot);
    }
    const lit = float(0.4).add(cul.mul(0.4)).add(c.kick.mul(0.35));
    m.colorNode = A.mul(glow).add(mix(C, W, 0.3).mul(hot)).mul(lit);
    m.opacityNode = visionShown(ctx, c, rr.div(34));
    m.transparent = true; m.blending = AdditiveBlending; m.depthWrite = false;
    return m;
  }

  if (layer === "veil") {
    // near: 5 thin drips growing down from above the frame, a bokeh bead at each tip, each swaying on its own clock
    const top = 28, xs = [0, 5.5, 22], tips = [14, 9, 4];
    let line = float(0), bead = float(0);
    for (let j = 0; j < 3; j++) {
      const L = mix(0.85, 1.15, c.rnd(110 + j)).mul(top - tips[j]);
      const pv = smoothstep(0.4 + j * 0.09, 0.66 + j * 0.09, u).mul(kO);
      const uu = float(top).sub(p.y).div(L);
      const sway = c.real.mul(0.5 + j * 0.23).add(j * 2.1).sin().mul(0.6).mul(uu);
      const dx = p.x.abs().sub(float(xs[j]).add(j === 0 ? 0 : sway)).abs();
      const tipY = float(top).sub(L.mul(pv));
      const run = smoothstep(0.12, 0, uu.sub(c.real.mul(0.11 + j * 0.03).fract().mul(pv)).abs());   // light travels down
      line = line.add(smoothstep(0.3, 0.05, dx).mul(step(tipY, p.y)).mul(step(0.001, pv)).mul(float(0.35).add(run)));
      const d = vec2(dx, p.y.sub(tipY).add(0.5)).length();
      bead = bead.add(smoothstep(1.05, 0.85, d).mul(smoothstep(0.2, 0.9, d).mul(0.6).add(0.4)).mul(step(0.001, pv)));
    }
    m.colorNode = A.mul(line.mul(0.7)).add(mix(B, W, 0.25).mul(bead).mul(float(0.45).add(cul.mul(0.3)).add(c.kick.mul(0.3))));
    m.opacityNode = visionShown(ctx, c, rr.div(40));
    m.transparent = true; m.blending = AdditiveBlending; m.depthWrite = false;
    return m;
  }

  // ---- THE BEING
  const stroke = (d, w) => float(1).sub(smoothstep(float(w), aa.add(w), d));
  let col = vec3(0), cover = float(0);
  const put = (colour, mask) => { col = mix(col, colour, mask); cover = cover.max(mask); };   // painter's order

  // the hand: mirrored at x = 0, leaning outward by the seed
  const lean = c.pick(108, 3).mul(0.14), cl = lean.cos(), sl = lean.sin();
  const o = vec2(p.x.abs().sub(HX), p.y.sub(HY));
  const q = vec2(o.x.mul(cl).sub(o.y.mul(sl)), o.x.mul(sl).add(o.y.mul(cl)));
  const hd = outline(q, HAND);
  const sd = hd.d.mul(float(1).sub(hd.inside.mul(2)));                       // negative inside
  const along = mix(hd.u, float(1).sub(hd.u), c.pick(102, 2));                // which wrist the pen starts from
  const above = step(-9.5, q.y);
  const p0 = smoothstep(0.03, 0.3, u).mul(kO), p1 = smoothstep(0.22, 0.44, u).mul(kO), p2 = smoothstep(0.36, 0.58, u).mul(kO);
  const comet = smoothstep(0.07, 0, along.sub(c.real.div(mix(5, 9, c.rnd(116))).fract()).abs()).mul(step(0.999, p0));
  const lit = float(0.8).add(cul.mul(0.45)).add(c.kick.mul(0.25));
  const pen = (pr) => nib(pr, along, 0.02).mul(step(0.002, pr)).mul(step(pr, 0.995));
  put(A.mul(lit.mul(0.9)), stroke(sd.sub(0.75).abs(), 0.08).mul(maskDraw(p2, along)).mul(above));           // outer contour
  put(W.mul(1.4), pen(p2).mul(stroke(sd.sub(0.75).abs(), 0.26)).mul(above));
  put(B.mul(lit), stroke(sd.add(0.5).abs(), 0.07).mul(maskDraw(p1, along)).mul(above));                     // inner contour
  put(W.mul(1.4), pen(p1).mul(stroke(sd.add(0.5).abs(), 0.26)).mul(above));
  put(mix(W, C, comet).mul(lit.add(comet.mul(0.5))), stroke(hd.d, 0.12).mul(maskDraw(p0, along)));           // the hand itself
  put(W.mul(1.6), pen(p0).mul(stroke(hd.d, 0.36)));

  // the eye in the palm: opens by its lids
  const pe = smoothstep(0.58, 0.7, u).mul(kE);
  const ex = q.x.sub(EYE[0]), ey = q.y.sub(EYE[1]), nx = ex.div(2.3), base = float(1).sub(nx.mul(nx)).max(0), inX = step(nx.abs(), 1);
  const lidY = base.mul(1.25);
  const seen = maskLid(pe, ey.div(lidY.max(0.001))).mul(inX).mul(step(0.002, pe));
  const er = vec2(ex, ey).length(), ev = c.pick(103, 3);
  const irisRing = stroke(er.sub(0.95).abs(), 0.09).max(float(1).sub(smoothstep(float(0.36).sub(aa), 0.36, er)));
  const slit = float(1).sub(smoothstep(float(1).sub(aa.mul(2)), 1, ex.abs().div(0.34).add(ey.abs().div(1.15))));
  const full = float(1).sub(smoothstep(float(1.0).sub(aa), 1.0, er)).mul(smoothstep(float(0.4).sub(aa), 0.4, er));
  const iris = irisRing.mul(is(ev, 0)).add(slit.mul(is(ev, 1))).add(full.mul(is(ev, 2)));
  put(C.mul(float(0.9).add(cul.mul(0.5)).add(c.kick.mul(0.3))), iris.mul(seen));
  put(W.mul(lit), stroke(ey.abs().sub(lidY.mul(pe)).abs(), 0.09).mul(inX).mul(step(0.002, pe)));

  // fingertip beads: light in a row on the culmination
  const pt = smoothstep(0.7, 0.9, u).mul(kE);
  TIPS.forEach(([tx, ty], i) => {
    const d = q.sub(vec2(tx, ty)).length();
    put(mix(C, W, c.kick.mul(0.6)).mul(lit), float(1).sub(smoothstep(float(0.34).sub(aa), 0.34, d)).mul(maskBeads(pt, i / 5)));
  });

  // the ripples: flattened concentric rings opening from where the drop lands; each kick sends one outward
  const nR = c.pick(101, 3).add(3), gap = 2.1;
  const pr = smoothstep(0.82, 0.93, u).mul(kR);
  const rq = vec2(p.x, p.y.sub(RY).div(SQ)), rd = rq.length().max(0.001);
  const f = c.beat.fract();
  const rdm = rd.sub(f.mul(gap).mul(kickOn));
  const idx = rdm.div(gap).round();
  const grad = vec2(rq.x, rq.y.div(SQ)).length().div(rd);
  const ringOk = step(0.5, idx).mul(step(idx, nR.add(0.5)));
  const far = idx.sub(f.mul(kickOn)).div(nR.add(1)).clamp(0, 1);
  const ripple = stroke(rdm.sub(idx.mul(gap)).abs().div(grad), 0.085).mul(ringOk).mul(maskIris(pr, rd.div(nR.add(1).mul(gap))));
  put(mix(mix(W, A, smoothstep(0.0, 0.35, far)), A.mul(0.45), far).mul(lit), ripple);

  // the drop: forms and falls once on the culmination, then hangs, falling again on each kick only
  const first = float(1).sub(step(0.83, u));
  const y1 = float(TOP).sub(smoothstep(0.76, 0.82, u).pow(2).mul(TOP - RY)), s1 = smoothstep(0.7, 0.76, u);
  const y2 = float(TOP).sub(f.mul(f).mul(TOP - RY).mul(kickOn)), s2 = smoothstep(0.84, 0.9, u).mul(kE);
  const yc = mix(y2, y1, first), sc = mix(s2, s1, first).max(0.001);
  const dq = vec2(p.x, p.y.sub(yc)).div(sc);
  const tear = (R, H) => {
    const body = float(1).sub(smoothstep(float(R).sub(aa), R, dq.length())).mul(step(dq.y, 0));
    const w = float(1).sub(dq.y.div(H)).clamp(0, 1).pow(1.5).mul(R);
    const neck = float(1).sub(smoothstep(w.sub(aa), w, dq.x.abs())).mul(step(0, dq.y)).mul(step(dq.y, H));
    return body.max(neck).mul(step(0.01, sc)).mul(step(RY, yc.sub(0.2)));
  };
  put(B.mul(lit.add(0.2)), tear(1.15, 3.0));
  put(W.mul(1.3), tear(0.6, 1.5));

  m.colorNode = col;
  m.opacityNode = cover.mul(visionShown(ctx, c, rr.div(30)));
  m.alphaTest = 0.5;
  return m;
}
