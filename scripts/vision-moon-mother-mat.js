// THE MOON MOTHER (vision being BEINGS[1]): a crescent bowl cradling two sleeping profiles face to face, whose
// black between is a chalice (Rubin's vase), under an arc of 13 moons from new through full to new.
// Three layers at three depths, one script (params.layer, baked):
//   "ring"  far (z -12): the lunar month, two line rings + 28 day-beads, soft (out of focus), turning slowly
//   "being" (z 0): the 13 moons fill by PHASE one after another, the profiles draw themselves, the crescent waxes
//           last; at the culmination (u .7..1, the climbing highs) her eyes open and the chalice fills
//   "veil"  near (z +10): bead strands hanging into frame as bokeh, dropping in for the culmination, swaying
// Everything leaves by waning in the last 0.5 s. Light travels through it: a ring leaving the centre on each
// gated kick (c.kick, zero where the track has no beat) and a slow comet up the crescent's bead row.
// Seed channels: 11 hue family, 12 profile gap, 13 moon order, 14 chalice content, 15 veil strands,
// 16 ring speed, 20+ sparkle stars.
import { MeshBasicNodeMaterial, AdditiveBlending } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, mix, atan2, length, fwidth, select } from "builtin/tsl";
import { tripClock, visionShown, visionU, climb, maskDraw, maskBeads, maskIris, nib } from "./lib/trip.js";

const TAU = 6.28318;
const CY = -3, R = 11, ARC = 15, RM = 1.35, STEP = (210 / 12) * Math.PI / 180;
// her profile, right half (mirrored at x = 0): hair, forehead, brow, nose, lips, chin, neck
const FACE = [[10.4, 6.0], [9.2, 8.0], [7.2, 8.7], [5.4, 7.6], [4.2, 6.2], [3.5, 4.4], [3.4, 3.6], [3.8, 2.8], [2.1, 0.6], [2.3, 0.1],
  [3.2, -0.2], [2.9, -1.0], [3.3, -1.5], [2.9, -2.3], [3.5, -3.1], [3.0, -4.3], [3.6, -5.0], [4.8, -5.6], [5.6, -7.4]].map(([x, y]) => [x * 0.9, y * 0.9 + CY]);
const EYE = [4.9 * 0.9, 2.5 * 0.9 + CY];

const is = (v, i) => step(v.sub(i).abs(), 0.5);
function polyline(q, pts) {
  const L = [0];
  for (let i = 1; i < pts.length; i++) L.push(L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  const total = L[L.length - 1];
  let d = float(1000), u = float(0);
  for (let i = 0; i < pts.length - 1; i++) {
    const [ax, ay] = pts[i], bx = pts[i + 1][0] - ax, by = pts[i + 1][1] - ay, bb = bx * bx + by * by, len = Math.sqrt(bb);
    const pa = q.sub(vec2(ax, ay));
    const h = pa.dot(vec2(bx, by)).div(bb).clamp(0, 1);
    const di = pa.sub(vec2(bx, by).mul(h)).length();
    const ui = h.mul(len).add(L[i]).div(total);
    u = select(di.lessThan(d), ui, u);
    d = d.min(di);
  }
  return { d, u };
}

export function material(ctx) {
  const layer = ctx.params.layer ?? "being";
  const c = tripClock(ctx);
  const u = visionU(ctx, c);
  const vw1 = ctx.param("vw1", -1);
  const keep = float(1).sub(smoothstep(vw1.sub(0.5), vw1, c.sec));            // the wane: last 0.5 s
  const cul = smoothstep(0.7, 0.95, u).mul(climb(c).mul(0.6).add(0.4)).mul(keep);
  const fam = c.pick(11, 3);
  const blue = vec3(0.05, 0.12, 1.0), violet = vec3(0.45, 0.05, 1.0), ice = vec3(0.45, 0.6, 1.0), W = vec3(1, 1, 1);
  const A = blue.mul(is(fam, 0)).add(violet.mul(is(fam, 1))).add(blue.mul(is(fam, 2)));   // body
  const B = violet.mul(is(fam, 0)).add(blue.mul(is(fam, 1))).add(ice.mul(is(fam, 2)));    // accent
  const p = positionGeometry.xy;
  const aa = fwidth(p.x).mul(1.2).max(0.01);
  const q0 = p.sub(vec2(0, CY)), rr = q0.length();
  // light travelling: a ring leaving her centre on each kick, only where the track has one
  const front = c.beat.fract().mul(30);
  const kl = smoothstep(2.2, 0, rr.sub(front).abs()).mul(step(0.001, c.kick)).mul(smoothstep(30, 14, front));
  const m = new MeshBasicNodeMaterial();

  if (layer === "ring") {
    const blur = aa.mul(4);                                               // far: soft, out of focus
    const stroke = (d, w) => float(1).sub(smoothstep(float(w), blur.add(w), d));
    const k = atan2(q0.x, q0.y).div(TAU).abs().mul(2);                    // 0 top .. 1 bottom, both sides at once
    const pe = smoothstep(0.0, 0.14, u).mul(keep), pe2 = smoothstep(0.04, 0.18, u).mul(keep), pb = smoothstep(0.02, 0.22, u).mul(keep);
    const l1 = stroke(rr.sub(22).abs(), 0.05).mul(maskDraw(pe, k));
    const l2 = stroke(rr.sub(20.6).abs(), 0.04).mul(maskDraw(pe2, k));
    const rot = c.sec.div(72).mul(c.dir).mul(mix(0.7, 1.3, c.rnd(16)));
    const an = atan2(q0.y, q0.x).div(TAU).add(rot).fract().mul(28);
    const quarter = step(an.floor().mod(7), 0.5);
    const loc = an.fract().sub(0.5).mul(TAU * 21.3 / 28);
    const db = loc.mul(loc).add(rr.sub(21.3).mul(rr.sub(21.3))).sqrt();
    const rad = mix(float(0.24), float(0.42), quarter);
    const bead = float(1).sub(smoothstep(rad.sub(blur), rad, db)).mul(maskBeads(pb, k));
    const lit = float(0.35).add(cul.mul(0.45)).add(kl.mul(0.8));
    const col = A.mul(l1.add(l2).mul(lit)).add(mix(B, W, quarter).mul(bead).mul(lit.add(0.15)));
    m.colorNode = col;
    m.opacityNode = l1.add(l2).add(bead).min(1).mul(visionShown(ctx, c, rr.div(30)));
    m.alphaTest = 0.5;
    return m;
  }

  if (layer === "veil") {
    // near: bead strands as bokeh discs, hanging in from above the frame, outer strands first
    const x = p.x.abs(), top = 26, nS = c.pick(15, 3).add(4);
    const pv = smoothstep(0.66, 0.88, u).mul(keep);
    let glow = float(0);
    for (let j = 0; j < 6; j++) {
      const L = 9 + j * 3.2, uu = float(top).sub(p.y).div(L);
      const sway = c.sec.mul(0.31 + j * 0.07).add(j * 1.7).sin().mul(0.45).mul(uu);
      const xj = float(14 + j * 3.4).add(sway);
      const pj = pv.mul(1.5).sub((5 - j) / 5 * 0.5).clamp(0, 1);
      const on = step(j + 0.5, nS).mul(step(uu, pj)).mul(step(0, uu));
      const yb = uu.mul(L / 1.3).fract().sub(0.5).mul(1.3);
      const d = vec2(x.sub(xj), yb).length();
      const disc = smoothstep(0.42, 0.34, d).mul(smoothstep(0.1, 0.38, d).mul(0.6).add(0.4));   // bokeh: brighter rim
      const run = smoothstep(1.4, 0, uu.mul(L).sub(c.beat.fract().mul(L)).abs()).mul(step(0.001, c.kick));
      glow = glow.add(disc.mul(on).mul(float(0.35).add(run.mul(0.9)).add(cul.mul(0.25))));
    }
    m.colorNode = mix(B, W, 0.35).mul(glow);
    m.opacityNode = visionShown(ctx, c, rr.div(30));
    m.transparent = true;
    m.blending = AdditiveBlending;
    m.depthWrite = false;
    return m;
  }

  // ---- THE BEING
  const stroke = (d, w) => float(1).sub(smoothstep(float(w), aa.add(w), d));
  let col = vec3(0), cover = float(0);
  const add = (colour, mask) => { col = col.add(colour.mul(mask)); cover = cover.max(mask); };

  // 13 phase-moons on an arc: new (ends) - waxing - FULL (top) - waning - new; each fills by its own phase
  const th = atan2(q0.x, q0.y);
  const idx = th.div(STEP).round().add(6).clamp(0, 12);
  const thi = idx.sub(6).mul(STEP);
  const q = q0.sub(vec2(thi.sin(), thi.cos()).mul(ARC)).div(RM), qr = q.length();
  const fi = idx.div(12), ord = c.pick(13, 3), off = idx.sub(6).abs().div(6);
  const ki = float(1).sub(off).mul(is(ord, 0)).add(off.mul(is(ord, 1))).add(fi.mul(is(ord, 2)));
  const pm = u.sub(0.08).sub(ki.mul(0.32)).div(0.08).clamp(0, 1).mul(keep);
  const wax = fi.lessThanEqual(0.5);
  const f = select(wax, fi.mul(pm), float(1).sub(float(1).sub(fi).mul(pm)));
  const ct = f.mul(TAU).cos().mul(float(1).sub(q.y.mul(q.y)).max(0).sqrt());
  const e = aa.div(RM);
  const litSide = select(wax, smoothstep(ct.sub(e), ct.add(e), q.x), float(1).sub(smoothstep(ct.negate().sub(e), ct.negate().add(e), q.x)));
  const started = step(0.001, pm);
  const disc = float(1).sub(smoothstep(float(1).sub(e), 1, qr));
  const mfill = disc.mul(litSide).mul(started);
  const mrim = stroke(qr.sub(1).abs().mul(RM), 0.05).mul(step(atan2(q.y, q.x).div(TAU).mul(24).fract(), 0.55)).mul(started);
  const halo = stroke(qr.sub(1.45).abs().mul(RM), 0.05).mul(is(idx, 6)).mul(step(0.15, cul));
  const mlit = float(0.55).add(kl.mul(0.6)).add(cul.mul(0.45));
  add(mix(B, W, 0.75).mul(mlit), mfill);
  add(B.mul(0.6).add(kl.mul(0.5)), mrim.mul(float(1).sub(mfill)));
  add(W.mul(0.8), halo);

  // the great crescent: an occluding disc slides up off the full disc, the bowl waxes (last)
  const pc = smoothstep(0.52, 0.7, u).mul(keep);
  const occ = q0.sub(vec2(0, pc.mul(4.2))).length();
  const inBig = float(1).sub(smoothstep(R - 0.0, R + 0.0, rr).mul(0).add(smoothstep(float(R).sub(aa), R, rr)));
  const outOcc = smoothstep(float(R).sub(aa), R, occ);
  const cres = inBig.mul(outOcc);
  const ghost = stroke(rr.sub(R).abs(), 0.04).mul(step(atan2(q0.y, q0.x).div(TAU).mul(90).fract(), 0.4)).mul(smoothstep(0.4, 0.46, u)).mul(keep);
  const edgeOut = stroke(rr.sub(R).abs(), 0.09).mul(smoothstep(float(R).sub(0.3), R, occ));
  const edgeIn = stroke(occ.sub(R).abs(), 0.07).mul(smoothstep(float(R).add(0.3), R, rr)).mul(step(0.002, pc));
  const hatch = step(occ.sub(R).div(0.5).fract(), 0.16).mul(cres);
  const angB = atan2(q0.x, q0.y.negate()).div(TAU).abs().mul(2);       // 0 bottom .. 1 top, both horns
  const comet = smoothstep(0.08, 0, angB.sub(c.sec.div(6).fract()).abs());
  const bj = atan2(q0.y, q0.x).div(TAU).mul(56).fract().sub(0.5).mul(TAU * (R - 0.8) / 56);
  const bd = bj.mul(bj).add(rr.sub(R - 0.8).mul(rr.sub(R - 0.8))).sqrt();
  const cbead = float(1).sub(smoothstep(float(0.2).sub(aa), 0.2, bd)).mul(smoothstep(float(R).add(0.25), R + 0.45, occ));
  const clit = float(0.5).add(kl.mul(0.7)).add(cul.mul(0.5)).add(comet.mul(0.6));
  add(W.mul(0.25), ghost);
  add(A.mul(float(0.45).add(kl.mul(0.5)).add(cul.mul(0.3))), hatch);
  add(mix(A, W, 0.6).mul(clit), edgeOut.max(edgeIn));
  add(mix(B, W, comet.add(kl).min(1)).mul(clit.add(0.2)), cbead);

  // the two sleeping profiles, face to face: the black between them is the chalice
  const sh = c.pick(12, 3).sub(1).mul(0.3);
  const fq = vec2(p.x.abs().sub(sh), p.y);
  const pl = polyline(fq, FACE);
  const pf = smoothstep(0.38, 0.56, u).mul(keep);
  const fline = stroke(pl.d, 0.07).mul(maskDraw(pf, pl.u));
  const fnib = nib(pf, pl.u, 0.025).mul(stroke(pl.d, 0.22)).mul(step(pf, 0.995));
  const fbeads = stroke(pl.d.sub(0.55).abs(), 0.09).mul(step(pl.u.mul(70).fract(), 0.3)).mul(maskBeads(cul.mul(1.3), pl.u));
  add(mix(B, W, 0.7).mul(float(0.7).add(kl.mul(0.4)).add(cul.mul(0.4))), fline);
  add(W.mul(1.4), fnib);
  add(B.mul(0.9).add(kl.mul(0.4)), fbeads);
  // her eye: one closed lid line with bead lashes; at the culmination the lid lifts
  const ex = fq.x.sub(EYE[0]), ey = p.y.sub(EYE[1]), dx = ex.div(0.8), base = float(1).sub(dx.mul(dx)), inX = step(dx.abs(), 1);
  const open = smoothstep(0.3, 0.8, cul);
  const lowY = base.mul(-0.24), upY = mix(base.mul(-0.24), base.mul(0.38), open);
  const eyeOn = step(0.62, pf);
  const lids = stroke(ey.sub(lowY).abs(), 0.05).max(stroke(ey.sub(upY).abs(), 0.05).mul(step(0.02, open))).mul(inX).mul(eyeOn);
  const almond = step(lowY, ey).mul(step(ey, upY)).mul(inX);
  const pupil = float(1).sub(smoothstep(float(0.2).sub(aa), 0.2, vec2(ex.add(0.12), ey.sub(0.02)).length())).mul(almond).mul(eyeOn);
  let lash = float(0);
  for (const lx of [-0.45, 0, 0.45]) lash = lash.max(float(1).sub(smoothstep(0.05, 0.08, vec2(ex.sub(lx * 0.8), ey.add(0.42 - lx * lx * 0.5)).length())));
  add(W.mul(0.9), lids);
  add(W.mul(1.3), pupil);
  add(B.mul(0.8), lash.mul(eyeOn).mul(float(1).sub(open)));
  // the chalice fills: a full moon, a four-point star or three beads, in the black between the faces
  const cv = c.pick(14, 3), cp = smoothstep(0.1, 0.6, cul), vq = p.sub(vec2(0, 1.4 + CY + 3 - 3));
  const vdisc = float(1).sub(smoothstep(float(1.05).sub(aa), 1.05, vq.length())).mul(maskIris(cp, vq.length().div(1.05)));
  const sa = vq.x.abs().div(1.5).sqrt().add(vq.y.abs().div(1.5).sqrt());
  const vstar = float(1).sub(smoothstep(float(1).sub(aa), 1, sa.div(cp.add(0.001))));
  let vbeads = float(0);
  for (let i = 0; i < 3; i++) vbeads = vbeads.max(float(1).sub(smoothstep(0.3, 0.34, vq.sub(vec2(0, -1.3 + i * 1.3)).length())).mul(maskBeads(cp, i / 3)));
  add(mix(B, W, 0.8).mul(float(0.9).add(kl.mul(0.4))), vdisc.mul(is(cv, 0)).add(vstar.mul(is(cv, 1))).add(vbeads.mul(is(cv, 2))));

  // four-point sparkle stars, mirrored pairs at seeded places, lighting one by one; they flare on the kick
  const sp = smoothstep(0.6, 0.86, u).mul(keep);
  for (let i = 0; i < 6; i++) {
    const sx = c.rnd(20 + i).mul(12).add(17.5), sy = c.rnd(30 + i).mul(30).sub(15);
    const sz = c.rnd(40 + i).mul(0.7).add(0.5).mul(c.kick.mul(0.35).add(1));
    const d = vec2(p.x.abs().sub(sx), p.y.sub(sy));
    const s4 = d.x.abs().div(sz).sqrt().add(d.y.abs().div(sz).sqrt());
    const star = float(1).sub(smoothstep(float(1).sub(aa.div(sz)), 1, s4)).mul(maskBeads(sp, i / 6));
    add(mix(B, W, 0.85), star);
  }

  m.colorNode = col;
  m.opacityNode = cover.mul(visionShown(ctx, c, rr.div(30)));
  m.alphaTest = 0.5;
  return m;
}
