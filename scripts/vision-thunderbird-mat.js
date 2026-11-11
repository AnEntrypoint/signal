// THE THUNDERBIRD (vision being): THE WINGED EYE. One almond eye whose iris is concentric bead rows, two
// feather-fan wings of 9 line-art feathers mirrored at x = 0, a small tail fan below, a dot at every tip.
// Three layers at three depths, one script (params.layer, baked):
//   "ring"  far (z -12): a sun-ray crown of 24 thin triangles (long/short), soft, on its own slow turn
//   "being" (z 0): lids open (maskLid) -> iris rows open outward (maskIris) -> feathers unfold from the body
//           outward on both sides at once (maskClock over the fan angle, each feather growing root to tip)
//           -> tail draws down -> tip dots (maskBeads). Culmination: a wave travels root to tip through the
//           wings, iris rows counter-rotate faster.
//   "veil"  near (z +10): 6 large soft feathers (3 mirrored) falling in from above for the culmination
// Exit, last 0.5 s, in reverse: dots out, feathers fold back tip-first / outermost first, iris closes, lids shut.
// Light: a ring leaving the eye on each gated kick (c.kick) and a slow band running root to tip in each feather.
// Seed channels: 101 hue family, 102 tail feathers (3/5), 103 wing shape (rounded/swept), 104 fan spread,
// 105 pupil (disc/slit/diamond), 106-107 crown speed and sense, 108 iris bead count, 109 iris sense,
// 110+ veil feathers.
import { MeshBasicNodeMaterial, AdditiveBlending, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, mix, atan2 , fwidth } from "builtin/tsl";
import { tripClock, visionShown, visionU, climb, maskLid, maskIris, maskClock, maskBeads, maskDraw } from "./lib/trip.js";

const TAU = 6.28318, PI = 3.14159;
const EY = -2, EW = 7, EH = 3.4, RI = 3.0;       // eye centre y, almond half width / height, iris radius
const RX = 6.6, A0 = 0.16, NF = 9, R0 = 1.1;     // wing root x, first fan angle (from +y), feathers, feather start radius
const is = (v, i) => step(v.sub(i).abs(), 0.5);

export function material(ctx) {
  const layer = ctx.params.layer ?? "being";
  const c = tripClock(ctx);
  const u = visionU(ctx, c);
  const vw0 = ctx.param("vw0", -1), vw1 = ctx.param("vw1", -1);
  const keep = float(1).sub(smoothstep(vw1.sub(0.5), vw1, c.sec));            // 1 -> 0 over the last 0.5 s
  const kDots = step(0.85, keep), kWing = smoothstep(0.3, 0.85, keep), kIris = smoothstep(0.15, 0.4, keep), kLid = smoothstep(0.0, 0.25, keep);
  const cul = smoothstep(0.7, 0.92, u).mul(climb(c).mul(0.6).add(0.4)).mul(keep);
  const fam = c.pick(101, 3);
  const blue = vec3(0.05, 0.12, 1.0), violet = vec3(0.45, 0.05, 1.0), pink = vec3(1.0, 0.05, 0.6), orange = vec3(1.0, 0.38, 0.02),
    yellow = vec3(1.0, 0.85, 0.05), green = vec3(0.1, 1.0, 0.15), W = vec3(1, 1, 1);
  const A = pink.mul(is(fam, 0)).add(green.mul(is(fam, 1))).add(orange.mul(is(fam, 2)));     // feather root
  const B = orange.mul(is(fam, 0)).add(yellow.mul(is(fam, 1))).add(yellow.mul(is(fam, 2)));  // feather tip
  const C = blue.mul(is(fam, 0)).add(violet.mul(is(fam, 1))).add(blue.mul(is(fam, 2)));      // iris, crown
  const D = violet.mul(is(fam, 0)).add(pink.mul(is(fam, 1))).add(pink.mul(is(fam, 2)));      // second iris row
  const p = positionGeometry.xy;
  const aa = fwidth(p.x).mul(1.2).max(0.01);
  const e = vec2(p.x, p.y.sub(EY)), rr = e.length();
  const front = c.beat.fract().mul(30);
  const kl = smoothstep(2.4, 0, rr.sub(front).abs()).mul(step(0.001, c.kick)).mul(smoothstep(30, 14, front));
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  m.fog = false;

  if (layer === "ring") {
    // the sun-ray crown: 24 thin triangles, long and short by turns; lit round like a dial, each growing outward
    const rot = c.real.div(mix(50, 95, c.rnd(106))).mul(c.rnd(107).step(0.5).mul(2).sub(1));
    const an = atan2(e.y, e.x).div(TAU).add(rot).fract().mul(24);
    const idx = an.floor(), long = step(idx.mod(2), 0.5);
    const len = mix(float(5.5), float(11.5), long);
    const pe = smoothstep(0.06, 0.36, u).mul(kIris);
    const g = pe.mul(1.5).sub(idx.div(24).mul(0.5)).clamp(0, 1);
    const t = rr.sub(9.2).div(len);
    const lat = an.fract().sub(0.5).mul(TAU / 24).mul(rr).abs();
    const hw = float(1).sub(t).mul(0.8);
    const tri = float(1).sub(smoothstep(hw.sub(0.22), hw.add(0.05), lat)).mul(step(0, t)).mul(maskIris(g, t)).mul(maskClock(pe.mul(1.6), atan2(e.x, e.y)));
    const lit = float(0.28).add(cul.mul(0.3)).add(kl.mul(0.6));
    m.colorNode = mix(C, D, long.mul(0.5)).mul(tri).mul(lit);
    m.opacityNode = visionShown(ctx, c, rr.div(30));
    m.transparent = true; m.blending = AdditiveBlending; m.depthWrite = false;
    return m;
  }

  if (layer === "veil") {
    // 3 mirrored pairs of big soft feathers falling in from above the frame for the culmination, each at its own
    // speed, tilt and sway; they shed length at the exit
    const span = vw1.sub(vw0).max(0.01), ts = u.mul(span);
    let glow = float(0);
    for (let j = 0; j < 3; j++) {
      const x0 = c.rnd(110 + j).mul(9).add(11 + j * 10);
      const sp = c.rnd(113 + j).mul(2.5).add(4.5), start = span.mul(0.5 + j * 0.07);
      const y0 = float(36).sub(ts.sub(start).max(0).mul(sp));
      const ph = c.real.mul(0.5 + j * 0.13).add(j * 2.1);
      const tilt = ph.sin().mul(0.5).add(c.rnd(116 + j).sub(0.5).mul(1.2));
      const d = vec2(p.x.abs().sub(x0).sub(ph.cos().mul(1.6)), p.y.sub(y0));
      const lx = d.x.mul(tilt.cos()).sub(d.y.mul(tilt.sin())), ly = d.x.mul(tilt.sin()).add(d.y.mul(tilt.cos()));
      const L = keep.mul(11), t = ly.div(L.max(0.01)).add(0.5);
      const hw = smoothstep(1, 0.45, t).mul(smoothstep(0, 0.2, t)).mul(1.9);
      const body = smoothstep(hw, hw.sub(0.7), lx.abs()).mul(step(0, t)).mul(step(t, 1));
      const rim = smoothstep(0.0, 0.5, lx.abs()).mul(0.75).add(0.25);                     // dark quill, brighter vane
      const barbs = step(t.mul(9).sub(lx.abs().mul(0.5)).fract(), 0.6).mul(0.5).add(0.5);
      glow = glow.add(body.mul(rim).mul(barbs).mul(float(0.3).add(cul.mul(0.2))));
    }
    m.colorNode = mix(B, W, 0.3).mul(glow);
    m.opacityNode = visionShown(ctx, c, rr.div(30));
    m.transparent = true; m.blending = AdditiveBlending; m.depthWrite = false;
    return m;
  }

  // ---- THE BEING
  const stroke = (d, w) => float(1).sub(smoothstep(float(w), aa.add(w), d));
  const dot = (d, r) => float(1).sub(smoothstep(float(r).sub(aa), r, d));
  let col = vec3(0), cover = float(0);
  const add = (colour, mask) => { col = col.add(colour.mul(mask)); cover = cover.max(mask); };

  // THE EYE: two lids parting from the horizontal
  const pl = smoothstep(0.0, 0.14, u).mul(kLid);
  const xn = e.x.div(EW), base = float(1).sub(xn.mul(xn)), inX = step(xn.abs(), 1);
  const lidY = base.mul(EH).mul(pl);
  const slope = e.x.mul(2 * EH / (EW * EW)).mul(pl);
  const lidD = e.y.abs().sub(lidY).abs().div(slope.mul(slope).add(1).sqrt());
  const lids = stroke(lidD, 0.12).mul(inX).mul(step(0.001, u));
  const inside = step(e.y.abs(), lidY).mul(inX).mul(maskLid(pl, e.y.div(EH)));
  add(mix(B, W, 0.7).mul(float(0.8).add(kl.mul(0.5)).add(cul.mul(0.3))), lids);
  // corner beads where lids meet, and a brow of 7 beads riding the upper lid
  const corner = dot(vec2(e.x.abs().sub(EW + 0.55), e.y).length(), 0.28).mul(step(0.5, pl));
  add(W, corner);

  // THE IRIS: an outline and three bead rows opening outward, neighbours counter-rotating
  const pi = smoothstep(0.12, 0.3, u).mul(kIris);
  const sense = c.rnd(109).step(0.5).mul(2).sub(1);
  const spin = c.real.mul(float(0.05).add(cul.mul(0.22))).mul(sense);
  const ang = atan2(e.y, e.x).div(TAU);
  const nAdd = c.pick(108, 3).mul(2);
  const rows = [[1.35, 8, 0.25, 1], [2.02, 12, 0.23, -1.4], [2.62, 16, 0.2, 0.8]];
  const iOpen = maskIris(pi, rr.div(RI + 0.1));
  rows.forEach(([r, n0, rad, s], k) => {
    const n = nAdd.add(n0);
    const loc = ang.add(spin.mul(s)).mul(n).fract().sub(0.5).mul(TAU * r).div(n);
    const bd = loc.mul(loc).add(rr.sub(r).mul(rr.sub(r))).sqrt();
    const colk = k === 0 ? mix(C, W, 0.55) : k === 1 ? D : C;
    add(colk.mul(float(0.85).add(kl.mul(0.6)).add(cul.mul(0.35))), dot(bd, rad).mul(inside).mul(iOpen));
  });
  add(mix(C, W, 0.25).mul(float(0.8).add(kl.mul(0.5))), stroke(rr.sub(RI).abs(), 0.08).mul(inside).mul(iOpen));
  // the pupil: disc, slit or diamond; it swells a little on the kick
  const pv = c.pick(105, 3), ps = c.kick.mul(0.15).add(1);
  const pe = vec2(e.x, e.y).div(ps);
  const dDisc = pe.length().div(0.72), dSlit = vec2(pe.x.div(0.3), pe.y.div(0.95)).length(), dDia = pe.x.abs().div(0.62).add(pe.y.abs().div(0.95));
  const pd = dDisc.mul(is(pv, 0)).add(dSlit.mul(is(pv, 1))).add(dDia.mul(is(pv, 2)));
  add(W.mul(1.2), float(1).sub(smoothstep(float(1).sub(aa.mul(1.5)), 1, pd)).mul(inside).mul(step(0.05, pi)));

  // a fan of line-art feathers in polar sectors about a root: outline, quill, travelling band, tip dot
  const fan = (r, f, n, DA, Lfn, growFn, pDots) => {
    const x = f.mul(n), fi = x.floor().clamp(0, float(n).sub(1));
    const lat = x.sub(fi).sub(0.5).mul(DA).mul(r).abs();
    const inFan = step(0, f).mul(step(f, 1));
    const g = growFn(fi), Lc = Lfn(fi).mul(g);
    const t = r.sub(R0).div(Lc.max(0.01));
    const inT = step(0, t).mul(step(t, 1)).mul(step(0.001, g)).mul(inFan);
    const hw = r.mul(DA).mul(0.4).mul(smoothstep(1, 0.5, t)).mul(smoothstep(0, 0.12, t));
    const rt = Lc.add(R0 + 0.8), dr = r.sub(rt);
    return {
      fi, t, inFan,
      outline: stroke(lat.sub(hw).abs(), 0.085).mul(inT),
      quill: stroke(lat, 0.04).mul(inT).mul(step(0.1, t)).mul(step(t, 0.9)),
      inside: step(lat, hw).mul(inT),
      tip: dot(lat.mul(lat).add(dr.mul(dr)).sqrt(), 0.36).mul(step(0.98, g)).mul(inFan).mul(maskBeads(pDots, fi.div(n))),
    };
  };
  const pDots = smoothstep(0.6, 0.7, u).mul(kDots);

  // THE WINGS: 9 feathers a side, unfolding from the body outward; a wave travels root to tip
  const pw = smoothstep(0.28, 0.62, u).mul(kWing);
  const q = vec2(e.x.abs().sub(RX), e.y), wr = q.length();
  const wave = c.real.mul(1.7).sub(wr.mul(0.3)).sin().mul(wr.div(18)).mul(float(0.015).add(cul.mul(0.11)));
  const A1 = mix(1.85, 2.3, c.rnd(104));
  const wa = atan2(q.x, q.y).sub(wave);
  const wf = wa.sub(A0).div(A1.sub(A0));
  const wv = c.pick(103, 2);
  const Lw = (fi) => { const t = fi.div(NF - 1); return mix(t.mul(0.8).add(0.1).mul(PI).sin().mul(8).add(10.5), float(19.5).sub(t.mul(10)), wv); };
  const wing = fan(wr, wf, NF, A1.sub(A0).div(NF), Lw, (fi) => smoothstep(0, 1, pw.mul(NF + 1.5).sub(fi).div(1.5).clamp(0, 1)), pDots);
  const sweep = maskClock(pw.mul((NF + 1.5) / NF).min(1), wf.clamp(0, 1).sub(0.5).mul(TAU));
  const band = smoothstep(0.16, 0, wing.t.sub(c.real.div(2.6).sub(wing.fi.mul(0.07)).fract().mul(1.3)).abs());
  const wcol = mix(A, B, wing.t.clamp(0, 1));
  const wlit = float(0.8).add(kl.mul(0.5)).add(cul.mul(0.3));
  add(wcol.mul(wlit), wing.outline.mul(sweep));
  add(mix(wcol, W, 0.6).mul(0.7), wing.quill.mul(sweep));
  add(wcol.mul(0.55), wing.inside.mul(band).mul(sweep).mul(float(1).sub(wing.outline)));
  add(W.mul(c.kick.mul(0.4).add(1)), wing.tip);

  // THE TAIL: a small fan of 3 or 5 below the eye, drawing downward, centre feather first
  const pt = smoothstep(0.5, 0.64, u).mul(kWing);
  const nT = c.pick(102, 2).mul(2).add(3), half = nT.sub(1).div(2), S = 0.56;
  const tq = vec2(e.x, e.y.add(EH + 0.3).negate()), tr = tq.length();
  const tf = atan2(tq.x, tq.y).add(S).div(2 * S);
  const off = (fi) => fi.sub(half).abs().div(half);
  const tail = fan(tr, tf, nT, float(2 * S).div(nT), (fi) => float(10).sub(off(fi).mul(3.5)), (fi) => pt.mul(1.6).sub(off(fi).mul(0.6)).clamp(0, 1), pDots);
  const tcol = mix(C, D, tail.t.clamp(0, 1));
  add(tcol.mul(float(0.9).add(kl.mul(0.5)).add(cul.mul(0.3))), tail.outline.mul(maskDraw(pt.mul(1.6), tail.t.mul(0.5))));
  add(mix(tcol, W, 0.6).mul(0.7), tail.quill);
  add(mix(B, W, 0.6), tail.tip);

  m.colorNode = col;
  m.opacityNode = cover.mul(visionShown(ctx, c, rr.div(30)));
  m.alphaTest = 0.5;
  return m;
}
