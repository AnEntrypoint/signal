// THE STAR CHILD (vision being "star-child"): a seated cross-legged figure in pure contour lines, five nested
// outlines stepping inward like op-art relief, a bright point at the heart, a halo of 12 beads behind the head.
// Three layers at three depths, one script (params.layer, baked):
//   "ring"  far (z -12): squaring the circle: a beaded circle and a square of equal area, turning opposite ways
//   "being" (z 0): the heart point is lit first; the contours draw themselves OUTWARD, innermost first, each
//           along its own outline (alternate ones from the other end); the halo beads light clockwise; at the
//           culmination (u .7..1, the climbing highs) the contours ripple outward from the heart, the heart
//           flashes on the kick (c.kick only), an aura of beads circles the outline
//   "veil"  near (z +10): eight four-point sparkle stars, large and soft, each twinkling on its own clock
// EXIT (last 0.5 s): the contours retract outermost first back into the heart; the heart goes out last.
// Seed channels: 101 hue family, 102 contour style, 103 draw direction, 104 halo bead shape, 105 ring sense,
// 106 ring square count (1 square / 2 = eight-point), 107 ring speed, 108 mudra (hands on knees / in lap),
// 110+ veil star places, sizes and clocks.
import { MeshBasicNodeMaterial, AdditiveBlending, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, mix, atan2, fwidth } from "builtin/tsl";
import { tripClock, visionShown, visionU, climb, maskDraw, maskBeads, maskIris, maskClock, nib } from "./lib/trip.js";

const TAU = 6.28318, PI = 3.14159;
const HY = 1.6;                      // the heart
const HEAD = [0, 8.6], HR = 1.7;     // the head
const SP = 0.7;                      // contour step (outward from the slim body)
const is = (v, i) => step(v.sub(i).abs(), 0.5);
const V = (a) => (Array.isArray(a) ? vec2(a[0], a[1]) : a);
const smin = (a, b, k) => { const h = b.sub(a).div(2 * k).add(0.5).clamp(0, 1); return mix(b, a, h).sub(h.mul(float(1).sub(h)).mul(k)); };
const capsule = (q, a, b, r) => { const A = V(a), BA = V(b).sub(A), pa = q.sub(A); const h = pa.dot(BA).div(BA.dot(BA)).clamp(0, 1); return pa.sub(BA.mul(h)).length().sub(r); };
const rbox = (q, c, hx, hy, r) => { const d = q.sub(vec2(c[0], c[1])).abs().sub(vec2(hx - r, hy - r)); return d.max(0).length().add(d.x.max(d.y).min(0)).sub(r); };
// linear palette
const BLU = vec3(0.007, 0.014, 1.0), VIO = vec3(0.195, 0.007, 1.0), PNK = vec3(1.0, 0.005, 0.318),
  ORA = vec3(1.0, 0.144, 0.0015), YEL = vec3(1.0, 0.693, 0.004), GRN = vec3(0.01, 1.0, 0.019), W = vec3(1, 1, 1);
const FAMS = [[BLU, VIO, PNK], [VIO, PNK, ORA], [BLU, GRN, YEL], [PNK, ORA, YEL]];

export function material(ctx) {
  const layer = ctx.params.layer ?? "being";
  const c = tripClock(ctx);
  const u = visionU(ctx, c);
  const vw1 = ctx.param("vw1", -1);
  const out = smoothstep(vw1.sub(0.5), vw1, c.sec);                     // 0 .. 1 across the last 0.5 s
  const cul = smoothstep(0.7, 0.95, u).mul(climb(c).mul(0.6).add(0.4)).mul(float(1).sub(out));
  const fam = c.pick(101, 4);
  const pickF = (j) => FAMS.reduce((acc, f, i) => acc.add(f[j].mul(is(fam, i))), vec3(0));
  const C1 = pickF(0), C2 = pickF(1), C3 = pickF(2);                    // outer, middle, inner (hottest)
  const p = positionGeometry.xy;
  const aa = fwidth(p.x).mul(1.2).max(0.01);
  const rr = p.length();
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  m.fog = false;

  if (layer === "ring") {
    // far: soft. A beaded circle and a square of the same area (side r*sqrt(pi)), turning opposite ways.
    const blur = aa.mul(5).add(0.25);
    const soft = (d, w) => smoothstep(blur.add(w), float(w), d);
    const sense = c.rnd(105).step(0.5).mul(2).sub(1);
    const T = mix(70, 120, c.rnd(107));
    const rotC = c.real.div(T).mul(sense), rotS = c.real.div(T.mul(0.7)).mul(sense).negate();
    const R = 16, S = R * Math.sqrt(Math.PI) / 2;
    const a = atan2(p.x, p.y);                                            // 0 at top, clockwise
    const pc = smoothstep(0.0, 0.25, u), ps = smoothstep(0.1, 0.4, u);
    const circ = soft(rr.sub(R).abs(), 0.05).mul(maskClock(pc.mul(float(1).sub(out)), a));
    const at = a.div(TAU).add(rotC).fract().mul(36);
    const tq = at.fract().sub(0.5).mul(TAU * R / 36);
    const tick = smoothstep(blur.add(0.22), 0.22, vec2(tq, rr.sub(R)).length()).mul(maskBeads(pc.mul(float(1).sub(out)), a.div(TAU).add(0.5)));
    const twoSq = c.pick(106, 2);
    let sq = float(0);
    for (let s = 0; s < 2; s++) {
      const ang = rotS.mul(TAU).add(s * PI / 4), cs = ang.cos(), sn = ang.sin();
      const rp = vec2(p.x.mul(cs).sub(p.y.mul(sn)), p.x.mul(sn).add(p.y.mul(cs)));
      const sd = rbox(rp, [0, 0], S, S, 0.01).abs();
      const k = atan2(rp.y, rp.x).div(TAU).add(0.5).fract();             // counter-clockwise along the square
      const on = s === 0 ? float(1) : is(twoSq, 1);
      sq = sq.max(soft(sd, 0.05).mul(maskDraw(ps.mul(float(1).sub(out)), k)).mul(on));
    }
    const kl = c.kick.mul(0.5);
    const lit = float(0.45).add(cul.mul(0.5)).add(kl);
    m.colorNode = C1.mul(circ).mul(lit).add(mix(C2, W, 0.4).mul(tick).mul(lit)).add(C2.mul(sq).mul(lit.mul(0.8))).mul(visionShown(ctx, c, rr.div(30)));
    m.opacityNode = visionShown(ctx, c, rr.div(30));
    m.transparent = true;
    m.blending = AdditiveBlending;
    m.depthWrite = false;
    return m;
  }

  if (layer === "veil") {
    // near: eight four-point sparkle stars as bokeh, in four mirrored pairs, each on its own clock
    const pv = smoothstep(0.5, 0.85, u);
    let glow = vec3(0);
    for (let i = 0; i < 4; i++) {
      const sx = c.rnd(110 + i).mul(12).add(17 + (i % 2) * 2), sy = c.rnd(114 + i).mul(9).add(-17 + i * 9);
      const tw = c.real.mul(c.rnd(118 + i).mul(1.4).add(0.6)).add(c.rnd(122 + i).mul(TAU)).sin();
      const sz = c.rnd(126 + i).mul(2.5).add(2.2).mul(tw.mul(0.3).add(0.85));
      const d = vec2(p.x.abs().sub(sx), p.y.sub(sy));
      const s4 = d.x.abs().div(sz).sqrt().add(d.y.abs().div(sz).sqrt());
      const star = smoothstep(1.0, 0.25, s4).pow(1.6);
      const core = smoothstep(sz.mul(0.35), 0, d.length()).mul(0.6);
      const lit = maskBeads(pv, i / 4).mul(step(out, 1 - i / 4 * 0.8));
      const tint = i % 2 === 0 ? mix(C2, W, 0.45) : mix(C3, W, 0.4);
      glow = glow.add(tint.mul(star.add(core)).mul(lit).mul(tw.mul(0.25).add(0.6).add(cul.mul(0.3))));
    }
    m.colorNode = glow.mul(visionShown(ctx, c, rr.div(40)));
    m.opacityNode = visionShown(ctx, c, rr.div(40));
    m.transparent = true;
    m.blending = AdditiveBlending;
    m.depthWrite = false;
    return m;
  }

  // ---- THE BEING: one signed distance of the seated figure, its five iso-lines are the contours
  const q = vec2(p.x.abs(), p.y);
  const mudra = c.pick(108, 2);                                          // 0 hands on knees, 1 hands in the lap
  const hand = mix(vec2(8.6, -5.2), vec2(1.8, -3.4), mudra);
  // a slim seated body: the five contours step OUTWARD from it, so every limb survives as a relief
  let sd = q.sub(vec2(HEAD[0], HEAD[1])).length().sub(HR);
  sd = smin(sd, capsule(q, [0, 5.4], [0, 7.2], 0.5), 0.4);
  sd = smin(sd, capsule(q, [0, 4.6], [4.2, 4.4], 0.7), 0.6);
  sd = smin(sd, rbox(q, [0, 1.3], 2.3, 3.1, 1.4), 0.8);
  sd = smin(sd, capsule(q, [4.2, 4.4], [6.2, -0.8], 0.55), 0.4);
  sd = smin(sd, capsule(q, [6.2, -0.8], hand, 0.5), 0.3);
  sd = smin(sd, capsule(q, [9.6, -6.8], [-5.0, -9.6], 1.0), 0.8);     // the crossed shins (mirrored: an X)
  const hq = p.sub(vec2(0, HY)), rh = hq.length();
  const k = atan2(hq.x, hq.y).abs().div(PI);                            // 0 straight up from the heart .. 1 down, both sides
  const flip = c.pick(103, 2), style = c.pick(102, 3);
  const stroke = (d, w) => float(1).sub(smoothstep(float(w), aa.add(w), d));
  let col = vec3(0), cover = float(0);
  const add = (colour, mask) => { col = col.add(colour.mul(mask)); cover = cover.max(mask); };

  // the light: at the culmination a band travels out from the heart along the relief
  const front = c.real.mul(0.6).fract().mul(18);
  const band = smoothstep(1.6, 0, rh.sub(front).abs()).mul(cul);
  for (let j = 0; j < 5; j++) {
    const off = float((4 - j) * SP).add(cul.mul(0.2).mul(c.real.mul(3.2).sub(j * 1.1).sin()));   // the ripple, inner leads
    const dj = sd.sub(off).abs();
    const line = stroke(dj, 0.13);
    const pj = u.sub(0.07 + (4 - j) * 0.1).div(0.13).clamp(0, 1);
    const odd = (j % 2 === 1 ? float(1) : float(0)).add(flip).mod(2);
    const kj = mix(k, float(1).sub(k), odd);
    const oj = out.sub(j * 0.13).div(0.4).clamp(0, 1);                  // outermost (j 0) retracts first
    const there = maskDraw(pj, kj).mul(maskIris(float(1).sub(oj), rh.div(17)));
    // style: 0 all solid, 1 the odd contours dashed, 2 the two inner ones beaded
    const dash = step(kj.mul(64).fract(), 0.62), dot = step(kj.mul(90).fract(), 0.4);
    const pat = j % 2 === 1 ? mix(float(1), dash, is(style, 1)) : float(1);
    const pat2 = j >= 3 ? mix(pat, dot, is(style, 2)) : pat;
    const hue = j === 0 ? mix(C1, W, 0.25) : j === 1 ? C1 : j === 2 ? C2 : j === 3 ? mix(C2, C3, 0.5) : C3;
    const lit = float(0.75).add(cul.mul(0.35)).add(band.mul(0.9));
    add(mix(hue, W, band.mul(0.6)).mul(lit), line.mul(there).mul(pat2));
    const head = nib(pj, kj, 0.02).mul(stroke(dj, 0.32)).mul(step(0.001, pj)).mul(step(pj, 0.995));
    add(W.mul(1.5), head);
  }

  // the aura: a bead row just outside the outline, lit around from the top at the culmination
  const aq = sd.sub(4 * SP + 0.85).abs();
  const abead = stroke(aq, 0.16).mul(step(k.mul(70).fract().sub(0.5).abs(), 0.18)).mul(maskBeads(cul.mul(1.6), k)).mul(step(out, 0.001));
  add(mix(C3, W, 0.3).mul(0.9), abead);

  // the halo: 12 beads on an arc behind the head, lighting clockwise (from the left, over the top, to the right)
  const ha = atan2(p.x, p.y.sub(HEAD[1])), hr = p.sub(vec2(HEAD[0], HEAD[1])).length();
  const STEPH = (240 / 11) * PI / 180, RH = 5.3;
  const idx = ha.add(2 * PI / 3).div(STEPH).round().clamp(0, 11);
  const ai = idx.mul(STEPH).sub(2 * PI / 3);
  const bq = p.sub(vec2(HEAD[0], HEAD[1])).sub(vec2(ai.sin(), ai.cos()).mul(RH));
  const bshape = c.pick(104, 3), br = bq.length();
  const bdisc = float(1).sub(smoothstep(float(0.45).sub(aa), 0.45, br));
  const bring = stroke(br.sub(0.42).abs(), 0.09).max(float(1).sub(smoothstep(float(0.14).sub(aa), 0.14, br)));
  const b4 = bq.x.abs().div(0.75).sqrt().add(bq.y.abs().div(0.75).sqrt());
  const bstar = float(1).sub(smoothstep(float(1).sub(aa), 1, b4));
  const bead = bdisc.mul(is(bshape, 0)).add(bring.mul(is(bshape, 1))).add(bstar.mul(is(bshape, 2)));
  const pb = smoothstep(0.5, 0.68, u);
  const inArc = step(ha.abs(), 2 * PI / 3 + 0.12).mul(step(hr, RH + 1));
  const hk = idx.div(12);
  const hthere = maskBeads(pb, hk).mul(step(hk, float(1).sub(out.mul(3)))).mul(inArc);  // leave in reverse first
  add(mix(C3, W, 0.35 + 0).mul(float(0.8).add(cul.mul(0.4)).add(c.kick.mul(0.4))), bead.mul(hthere));
  // a thin ring under the beads, drawn with them
  const hline = stroke(hr.sub(RH).abs(), 0.05).mul(maskBeads(pb, ha.add(2 * PI / 3).div(4 * PI / 3))).mul(step(ha.abs(), 2 * PI / 3)).mul(float(1).sub(bead)).mul(step(out, 0.001));
  add(C2.mul(0.7), hline);

  // the heart: first in, last out; it flashes on the kick only
  const hp = smoothstep(0.0, 0.05, u).mul(step(out, 0.97));
  const hrad = c.kick.mul(cul.mul(0.6).add(0.3)).add(1).mul(0.55);
  const heart = maskIris(hp, rh.div(hrad));
  const hring = stroke(rh.sub(hrad.add(0.45)).abs(), 0.07).mul(step(0.05, c.kick)).mul(hp);
  add(W.mul(float(1.6).add(c.kick.mul(1.5))), heart);
  add(mix(C3, W, 0.5).mul(c.kick.add(0.3)), hring);

  m.colorNode = col;
  m.opacityNode = cover.mul(visionShown(ctx, c, rr.div(30)));
  m.alphaTest = 0.5;
  return m;
}
