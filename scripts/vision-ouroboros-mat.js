// THE OUROBOROS (vision being BEINGS[4]): a serpent in a perfect ring (R 13 m) biting its own tail. Body in
// black/white op-art stripes carrying ONE row of coloured scale-beads; a solid-colour head, white triangle teeth,
// a single round eye. Three layers at three depths, one script (params.layer, baked):
//   "ring"  far (z -12): two thin line circles (one dashed) + 12 dots, soft, turning against the body's crawl
//   "being" (z 0): the pen draws the body round the ring from the tail tip (maskDraw + nib), the scales light
//           one by one behind the pen (maskBeads), the head is drawn last with its jaws OPEN, the eye opens
//           (maskIris), and the jaws close on the tail at u .7: the circle completes on the culmination.
//           Then the stripes crawl one way for ever and the scale row runs the other.
//   "veil"  near (z +10): 5 soft teardrops; four fall in from above, the fifth swells in the hollow (the seed)
// EXIT (last 0.5 s): it swallows itself: the body vanishes from the tail in the mouth round to the neck,
// then the head goes neck-first into its own snout.
// Seed channels: 100 hue family, 101 which way the serpent runs (mirror), 102 scale count, 103 stripe variant
// (bands / chevrons / checker), 104 head at top or bottom, 105 crawl sense, 106 ring speed, 107 drop size,
// 108 drop arrangement.
import { MeshBasicNodeMaterial, AdditiveBlending, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, mix, atan2, fwidth, select } from "builtin/tsl";
import { tripClock, visionShown, visionU, climb, maskDraw, maskBeads, maskIris, nib, stripes } from "./lib/trip.js";

const TAU = 6.28318;
const R = 13, CIRC = TAU * R, WB = 1.7;
const NECK = -0.10 * CIRC, HINGE = -0.035 * CIRC, SNOUT = 0.035 * CIRC; // head, metres of arc from the top
const ST = -0.02, SPAN = 0.92, BODY = SPAN * CIRC;                       // tail tip sits inside the mouth
const NS = 54;                                                           // stripes round the body
const is = (v, i) => step(v.sub(i).abs(), 0.5);
const sign = (r) => step(0.5, r).mul(2).sub(1);

export function material(ctx) {
  const layer = ctx.params.layer ?? "being";
  const c = tripClock(ctx);
  const u = visionU(ctx, c);
  const vw1 = ctx.param("vw1", -1);
  const keep = float(1).sub(smoothstep(vw1.sub(0.5), vw1, c.sec));            // the swallow: last 0.5 s
  const cul = smoothstep(0.7, 0.95, u).mul(climb(c).mul(0.6).add(0.4)).mul(keep);
  const fam = c.pick(100, 3);
  const blue = vec3(0.05, 0.12, 1.0), violet = vec3(0.45, 0.05, 1.0), pink = vec3(1.0, 0.05, 0.6), orange = vec3(1.0, 0.38, 0.02),
    yellow = vec3(1.0, 0.85, 0.05), green = vec3(0.1, 1.0, 0.15), W = vec3(1, 1, 1), K = vec3(0, 0, 0);
  const A = blue.mul(is(fam, 0)).add(violet.mul(is(fam, 1))).add(pink.mul(is(fam, 2)));      // head, edge, lines
  const B = pink.mul(is(fam, 0)).add(green.mul(is(fam, 1))).add(yellow.mul(is(fam, 2)));     // scales
  const C = yellow.mul(is(fam, 0)).add(orange.mul(is(fam, 1))).add(blue.mul(is(fam, 2)));    // scales, pupil
  const cs = sign(c.rnd(105));                                                // the crawl's sense
  const p = positionGeometry.xy;
  const aa = fwidth(p.x).mul(1.2).max(0.01);
  const rr = p.length();
  const front = c.beat.fract().mul(30);
  const kl = smoothstep(2.2, 0, rr.sub(front).abs()).mul(step(0.001, c.kick)).mul(smoothstep(30, 14, front));
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  m.fog = false;

  if (layer === "ring") {
    const blur = aa.mul(4);
    const stroke = (d, w) => float(1).sub(smoothstep(float(w), blur.add(w), d));
    const k = atan2(p.x, p.y).div(TAU).abs().mul(2);
    const pe = u.sub(0.03).div(0.3).clamp(0, 1).mul(keep), pe2 = u.sub(0.1).div(0.3).clamp(0, 1).mul(keep), pb = u.sub(0.2).div(0.4).clamp(0, 1).mul(keep);
    const ang = atan2(p.y, p.x).div(TAU);
    const rot = c.real.div(mix(40, 70, c.rnd(106))).mul(cs.negate());        // against the body's crawl
    const l1 = stroke(rr.sub(20).abs(), 0.05).mul(maskDraw(pe, k));
    const dash = step(ang.sub(rot.mul(0.37)).mul(36).fract(), 0.6);          // its own slower clock, the other way
    const l2 = stroke(rr.sub(22).abs(), 0.05).mul(dash).mul(maskDraw(pe2, k));
    const an = ang.add(rot).fract().mul(12);
    const loc = an.fract().sub(0.5).mul(TAU * 21 / 12);
    const db = loc.mul(loc).add(rr.sub(21).mul(rr.sub(21))).sqrt();
    const odd = an.floor().mod(2);
    const bead = float(1).sub(smoothstep(float(0.5).sub(blur), 0.5, db)).mul(maskBeads(pb, k));
    const lit = float(0.4).add(cul.mul(0.45)).add(kl.mul(0.8));
    m.colorNode = A.mul(l1.add(l2).mul(lit)).add(mix(B, W, odd).mul(bead).mul(lit.add(0.2)));
    m.opacityNode = l1.add(l2).add(bead).min(1).mul(visionShown(ctx, c, rr.div(30)));
    m.alphaTest = 0.5;
    return m;
  }

  if (layer === "veil") {
    const pv = smoothstep(0.62, 0.86, u).mul(keep);
    const sz = mix(0.8, 1.25, c.rnd(107)), arr = c.pick(108, 2);
    const XS = [-23, -16.5, 0, 16.5, 23], RS = [2.4, 1.8, 1.5, 1.8, 2.4];
    let glow = float(0);
    for (let j = 0; j < 5; j++) {
      const centre = j === 2, outer = j === 0 || j === 4;
      const pj = pv.mul(1.6).sub(Math.abs(j - 2) * 0.3).clamp(0, 1);
      const e = pj.mul(pj).mul(float(3).sub(pj.mul(2)));
      const r = float(RS[j]).mul(sz).mul(centre ? e : 1).max(0.01);
      const hi = outer ? arr : float(1).sub(arr);                             // which pair hangs high
      const y0 = centre ? float(-1.2) : mix(float(-5), float(6), hi).add(float(1).sub(e).mul(46));
      const ph = c.real.mul(0.23 + j * 0.061).add(j * 1.9);                    // each on its own slow clock
      const dx = p.x.sub(float(XS[j]).add(centre ? 0 : ph.sin().mul(0.7))), dy = p.y.sub(y0.add(ph.mul(0.7).cos().mul(0.5)));
      const t = dy.div(r.mul(2.6)).clamp(0, 1);
      const hw = r.mul(float(1).sub(t)).mul(t.mul(2.2).add(1).sqrt());
      const d = select(dy.lessThan(0), vec2(dx, dy).length().sub(r), dx.abs().sub(hw).max(dy.sub(r.mul(2.6))));
      const drop = smoothstep(0.45, -0.25, d).mul(smoothstep(-1.3, -0.1, d).mul(0.6).add(0.4));   // bokeh: brighter rim
      glow = glow.add(drop.mul(step(0.001, pj)).mul(float(0.32).add(cul.mul(0.3)).add(kl.mul(0.5))));
    }
    m.colorNode = mix(B, W, 0.3).mul(glow);
    m.opacityNode = visionShown(ctx, c, rr.div(30));
    m.transparent = true;
    m.blending = AdditiveBlending;
    m.depthWrite = false;
    return m;
  }

  // ---- THE BEING
  let col = vec3(0), cover = float(0);
  const put = (colour, mask) => { col = mix(col, colour, mask); cover = cover.max(mask); };
  const X = p.x.mul(sign(c.rnd(101))), Y = p.y.mul(sign(c.rnd(104)));      // runs left or right, head top or bottom
  const sh = atan2(X, Y).div(TAU);                                         // -.5 .. .5, 0 at the head's side
  const a = sh.mul(CIRC), n = rr.sub(R), an = n.abs();
  const E = float(1).sub(keep);
  const P = u.sub(0.05).div(0.53).clamp(0, 1).mul(1.16);                    // the pen: body 0..1, head 1..1.15
  const drawing = step(P, 1.155);

  // the head: skull + two jaws hinged at HINGE, open until u .7
  const open = float(1).sub(smoothstep(0.68, 0.72, u)).mul(0.62);
  const vx = a.sub(HINGE), co = open.cos(), si = open.sin();
  const jaw = step(0, vx);
  const a1 = select(vx.greaterThan(0), vx.mul(co).add(an.mul(si)).add(HINGE), a);
  const n1 = select(vx.greaterThan(0), an.mul(co).sub(vx.mul(si)), an);
  const capT = a1.sub(SNOUT - 1.1).div(1.1).clamp(0, 1);
  const hw = mix(float(WB), float(2.5), smoothstep(NECK, -4.6, a1)).mul(mix(float(1), float(0.5), smoothstep(-3.2, SNOUT, a1)))
    .mul(float(1).sub(capT.mul(capT)).max(0).sqrt());
  const g = n1.sub(a1.sub(HINGE).max(0).mul(0.12));                         // > 0: flesh, < 0: inside the mouth
  const inA = step(NECK, a).mul(step(a1, SNOUT)).mul(step(a, SNOUT + 6));
  const solid = smoothstep(0, aa, g).mul(float(1).sub(smoothstep(hw.sub(aa), hw, n1))).mul(inA);
  const rim = solid.mul(smoothstep(hw.sub(0.2), hw.sub(0.2).sub(aa), n1).oneMinus());
  const tri = a1.mul(0.95).add(step(0, n).mul(0.5)).fract().sub(0.5).abs().mul(2);
  const teeth = step(g, 0).mul(smoothstep(0, aa, g.add(tri.mul(0.62)))).mul(step(HINGE + 0.9, a1)).mul(step(a1, SNOUT - 0.3)).mul(jaw).mul(inA);
  const headK = a.sub(NECK).div(SNOUT - NECK).clamp(0, 1);
  const headVis = maskDraw(P, headK.mul(0.15).add(1)).mul(step(E.sub(0.8).div(0.2), headK));
  const hlit = float(0.8).add(cul.mul(0.35)).add(kl.mul(0.4));
  put(A.mul(hlit), solid.mul(headVis));
  put(W.mul(hlit.add(0.1)), rim.mul(headVis));
  put(W.mul(hlit.add(0.2)), teeth.mul(headVis));
  // the single round eye, opening like an iris once the head is drawn
  const ed = vec2(a.add(4.9), n.sub(0.95)).length();
  const eyeP = smoothstep(0.6, 0.66, u).mul(step(E, 0.8));
  const disc = (rad) => float(1).sub(smoothstep(float(rad).sub(aa), rad, ed));
  put(W.mul(1.1), disc(0.95).mul(maskIris(eyeP, ed.div(0.95))));
  put(K, disc(0.66).mul(maskIris(eyeP, ed.div(0.95))));
  put(mix(C, W, cul.mul(0.6)).mul(1.2), disc(0.34).mul(maskIris(eyeP, ed.div(0.95))));

  // the body, tail tip (k 0, in the mouth) round to the neck (k 1)
  const sb = sh.sub(ST).fract(), k = sb.div(SPAN);
  const inBody = step(k, 1);
  const wb = smoothstep(0, 0.3, k).sqrt().mul(WB).max(0.03);
  const bodyVis = inBody.mul(maskDraw(P, k)).mul(step(E.mul(1.25), k));
  const bodyM = float(1).sub(smoothstep(wb.add(0.07), wb.add(0.07).add(aa), an)).mul(bodyVis);
  const sv = c.pick(103, 3);
  const ph = k.mul(NS).add(c.real.mul(0.5).mul(cs))
    .add(an.div(wb).mul(0.9).mul(is(sv, 1))).add(step(an, wb.mul(0.5)).mul(0.5).mul(is(sv, 2)));
  const comet = smoothstep(0.07, 0, k.sub(c.real.div(6).mul(cs).fract()).abs()).mul(step(0.7, u));
  const blit = float(0.72).add(cul.mul(0.3)).add(kl.mul(0.45)).add(comet.mul(0.5));
  put(W.mul(stripes(ph, 1, 0.05)).mul(blit), bodyM);
  put(mix(A, W, comet.add(cul.mul(0.4)).min(1)).mul(blit.add(0.2)), bodyM.mul(smoothstep(wb.sub(0.1).sub(aa), wb.sub(0.1), an)));
  // one row of scale-beads on black discs, running against the stripes
  const M = c.pick(102, 3).mul(8).add(28), cell = float(BODY).div(M);
  const run = c.real.mul(0.4).mul(cs.negate());
  const cells = k.mul(M).add(run), ci = cells.floor();
  const kc = ci.add(0.5).sub(run).div(M);
  const al = cells.fract().sub(0.5).mul(cell).mul(rr.div(R));
  const bd = vec2(al, n).length();
  const rb = wb.mul(0.42).min(cell.mul(0.36));
  const beadOn = maskBeads(P.sub(0.08), kc).mul(step(0.04, kc)).mul(step(kc, 0.985)).mul(bodyVis);
  put(K, float(1).sub(smoothstep(rb.add(0.22).sub(aa), rb.add(0.22), bd)).mul(beadOn));
  put(mix(mix(B, C, ci.mod(2)), W, comet.mul(0.7)).mul(float(0.95).add(cul.mul(0.35)).add(kl.mul(0.4))), float(1).sub(smoothstep(rb.sub(aa), rb, bd)).mul(beadOn));
  // the pen's nib
  const nb = nib(P, k, 0.012).mul(inBody).add(nib(P, headK.mul(0.15).add(1), 0.012).mul(step(NECK, a)).mul(step(a, SNOUT)))
    .min(1).mul(float(1).sub(smoothstep(2.4, 3.0, an))).mul(drawing).mul(step(0.002, P));
  put(W.mul(1.6), step(0.5, nb));

  m.colorNode = col;
  m.opacityNode = cover.mul(visionShown(ctx, c, rr.div(30)));
  m.alphaTest = 0.5;
  return m;
}
