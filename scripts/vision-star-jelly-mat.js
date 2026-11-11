// THE STAR MEDUSA (vision being "star-jelly"): a jellyfish whose bell is 5 concentric op-art striped arcs with a
// star in its crown, 9 bead-string tentacles hanging below, mirrored. Three layers, three depths, three clocks:
//   "ring"  far (z -12): a faint 8-point line star ({8/2} or {8/3}), soft, turning slowly
//   "being" (z 0): the crown star draws point by point (maskClock), the bell arcs open outward and down from the
//           star (maskIris), the tentacles let down bead by bead (maskBeads), centre first, outer last.
//           Culmination (u .7..1, climb): the bell breathes slowly, a wave runs down each tentacle on its own phase.
//   "veil"  near (z +10): 12 bubbles (6 mirrored pairs) rising, soft rings like bokeh
// Exit (last 0.5 s): tentacles reel up bead by bead, the bell closes back into the star, the star goes out.
// Beat light only through c.kick. Steady motion on c.real.
// Seed channels: 101 hue family, 102 tentacle length profile, 103 wave length, 104 star points (5/6/8),
// 105 stripe drift speed, 106 ring speed+sense, 108 ring star variant, 109 bead spacing, 110+ tentacle phases,
// 120+ bubble x, 130+ bubble size, 140+ bubble height, 150 bubble rise speed.
import { MeshBasicNodeMaterial, AdditiveBlending, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, mix, atan2, fwidth } from "builtin/tsl";
import { tripClock, visionShown, visionU, climb, maskClock, maskIris, maskBeads, maskDraw } from "./lib/trip.js";

const TAU = 6.28318;
const BY = 1.5;            // the bell's rim line (tentacle roots), canvas y
const SY = 2.6;            // the crown star's centre above the rim
const R0 = 5.4, DR = 2.35, HW = 0.72, THMAX = 1.7;   // arc radii, band half-width, how far the bell wraps
const COL = { blue: [0.02, 0.05, 1], violet: [0.24, 0.02, 1], pink: [1, 0.02, 0.33], orange: [1, 0.17, 0.01], yellow: [1, 0.72, 0.02], green: [0.03, 1, 0.06], white: [1, 1, 1] };
const FAMS = [["blue", "violet", "yellow"], ["violet", "pink", "white"], ["pink", "orange", "yellow"], ["green", "blue", "white"]];

const is = (v, i) => step(v.sub(i).abs(), 0.5);

export function material(ctx) {
  const layer = ctx.params.layer ?? "being";
  const c = tripClock(ctx);
  const u = visionU(ctx, c);
  const vw1 = ctx.param("vw1", -1);
  const ex = smoothstep(vw1.sub(0.5), vw1, c.sec);                     // the exit, 0..1 over the last 0.5 s
  const tX = float(1).sub(ex.div(0.4).clamp(0, 1));                    // tentacles reel up first
  const bX = float(1).sub(ex.sub(0.3).div(0.4).clamp(0, 1));           // then the bell closes
  const sX = float(1).sub(ex.sub(0.65).div(0.35).clamp(0, 1));         // then the star goes out
  const cul = smoothstep(0.7, 0.92, u).mul(climb(c).mul(0.6).add(0.4)).mul(tX);
  const fam = c.pick(101, 4);
  const famCol = (slot) => { let v = vec3(0); FAMS.forEach((f, i) => { v = v.add(vec3(...COL[f[slot]]).mul(is(fam, i))); }); return v; };
  const A = famCol(0), B = famCol(1), S = famCol(2), W = vec3(1, 1, 1);
  const p = positionGeometry.xy;
  const aa = fwidth(p.x).mul(1.2).max(0.01);
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  m.fog = false;

  if (layer === "ring") {
    // far: the 8-point line star, soft, its own slow turn and sense
    const rr = p.length();
    const sense = c.rnd(106).step(0.5).mul(2).sub(1);
    const rot = c.real.div(mix(70, 120, c.rnd(106).mul(2).fract())).mul(sense).mul(TAU);
    const mm = c.pick(108, 2).add(2);                                    // {8/2} two squares or {8/3} star
    const R = 19, h = mm.mul(Math.PI / 8).cos().mul(R), half = mm.mul(Math.PI / 8).sin().mul(R);
    const blur = aa.mul(5).add(0.12);
    let line = float(0), tips = float(0);
    for (let k = 0; k < 8; k++) {
      const a = rot.add(k * TAU / 8);
      const n = vec2(a.cos(), a.sin()), t = vec2(a.sin().negate(), a.cos());
      const dn = p.dot(n).sub(h).abs(), dt = p.dot(t).abs();
      line = line.max(smoothstep(blur.add(0.05), 0.0, dn).mul(smoothstep(half.add(0.3), half, dt)));
      const va = a.add(mm.mul(Math.PI / 8));
      const dv = p.sub(vec2(va.cos(), va.sin()).mul(R)).length();
      tips = tips.max(smoothstep(0.75, 0.3, dv));
    }
    const pr = smoothstep(0.0, 0.3, u).mul(float(1).sub(ex));
    const draw = maskClock(pr, atan2(p.x, p.y));
    const lit = float(0.22).add(cul.mul(0.25)).add(c.kick.mul(0.12));
    m.colorNode = mix(A, W, 0.2).mul(line).mul(lit).add(mix(B, W, 0.5).mul(tips).mul(lit.add(0.15)));
    m.opacityNode = draw.mul(visionShown(ctx, c, rr.div(30)));
    m.transparent = true;
    m.blending = AdditiveBlending;
    m.depthWrite = false;
    return m;
  }

  if (layer === "veil") {
    // near: 12 bubbles (6 mirrored pairs) rising, each forming from a point, soft like bokeh
    const qx = p.x.abs();
    const pv = smoothstep(0.45, 0.75, u).mul(float(1).sub(ex));
    const rise = mix(0.7, 1.6, c.rnd(150));
    let glow = float(0);
    for (let i = 0; i < 6; i++) {
      const xi = c.rnd(120 + i).mul(17).add(12), ri = c.rnd(130 + i).mul(2.8).add(1.1);
      const y = c.real.mul(rise.mul(1.1 + i * 0.17)).div(64).add(c.rnd(140 + i)).fract().mul(64).sub(32);
      const x = xi.add(c.real.mul(0.4 + i * 0.07).add(i * 1.3).sin().mul(0.9));
      const g = pv.mul(1.6).sub(i / 6 * 0.6).clamp(0, 1);
      const rad = ri.mul(g);
      const d = vec2(qx.sub(x), p.y.sub(y)).length();
      const ring = smoothstep(0.42, 0.0, d.sub(rad).abs()).mul(step(0.02, g));
      const hl = smoothstep(rad.mul(0.22), 0.0, vec2(qx.sub(x).add(rad.mul(0.45)), p.y.sub(y).sub(rad.mul(0.45))).length()).mul(step(0.02, g));
      glow = glow.add(ring.mul(0.55).add(hl.mul(0.7)));
    }
    m.colorNode = mix(B, W, 0.35).mul(glow).mul(float(0.45).add(c.kick.mul(0.25)).add(cul.mul(0.2)));
    m.opacityNode = visionShown(ctx, c, p.length().div(40));
    m.transparent = true;
    m.blending = AdditiveBlending;
    m.depthWrite = false;
    return m;
  }

  // ---- THE BEING
  const stroke = (d, w) => float(1).sub(smoothstep(float(w), aa.add(w), d));
  let col = vec3(0), cover = float(0);
  const add = (colour, mask) => { col = col.add(colour.mul(mask)); cover = cover.max(mask); };
  const breath = c.real.mul(TAU / 5.5).sin().mul(cul).mul(0.05);      // slow breathing, never the beat
  const pb = vec2(p.x, p.y.sub(BY)).div(breath.add(1));                // bell space, origin at the rim centre
  const qs = pb.sub(vec2(0, SY));                                      // star space
  const rs = qs.length();
  // light travelling: a ring leaving the star on each kick (only where the track has one)
  const front = c.beat.fract().mul(34);
  const kl = smoothstep(2.4, 0, rs.sub(front).abs()).mul(step(0.001, c.kick)).mul(smoothstep(34, 16, front));

  // the crown star, point by point
  const kp = c.pick(104, 3), nS = float(5).add(is(kp, 1)).add(is(kp, 2).mul(3));
  const ps = smoothstep(0.02, 0.2, u).mul(sX);
  const pq = ps.mul(nS).add(0.001).floor().div(nS);
  const a = atan2(qs.x, qs.y);
  const g = a.div(TAU).add(float(0.5).div(nS)).fract();               // 0..1 round the star, a point per sector
  const pointOn = maskClock(pq, g.mul(TAU).sub(Math.PI));
  const tri = a.mul(nS).div(TAU).add(0.5).fract().sub(0.5).abs().mul(2);
  const redge = mix(float(2.7), float(1.1), tri);
  const sfill = step(rs, redge).mul(pointOn);
  const sline = stroke(rs.sub(redge).sub(0.6).abs(), 0.09).mul(pointOn);
  const score = step(rs, 0.38).mul(step(0.5, ps));
  const slit = float(0.9).add(cul.mul(0.6)).add(kl.mul(0.4));
  add(mix(S, W, 0.25).mul(slit), sfill);
  add(S.mul(0.8).add(W.mul(0.2)), sline);
  add(vec3(0), score.mul(0));
  col = col.mul(float(1).sub(score)).add(W.mul(1.6).mul(score));

  // the bell: 5 striped arcs, opening out and down from the crown star
  const rb = pb.length();
  const th = atan2(pb.x, pb.y).abs();                                  // 0 at the crown, mirrored
  const pbell = smoothstep(0.15, 0.44, u).mul(bX);
  const open = maskIris(pbell, rs.div(R0 + DR * 4 + HW + 3)).mul(step(th, THMAX));
  const spd = mix(0.15, 0.4, c.rnd(105));
  for (let i = 0; i < 5; i++) {
    const Ri = R0 + i * DR;
    const inBand = step(rb.sub(Ri).abs(), HW);
    const drift = c.real.mul(spd).mul(i % 2 ? -1 : 1);
    const stripe = step(th.mul(Ri).div(0.9).add(drift).fract(), 0.5);
    const lit = float(0.7).add(kl.mul(0.7)).add(cul.mul(0.45));
    add((i % 2 ? W.mul(0.85) : A).mul(lit), inBand.mul(stripe).mul(open));
  }
  // the bell's skin: one fine line just outside the outer arc
  add(mix(A, W, 0.5).mul(0.8), stroke(rb.sub(R0 + 4 * DR + HW + 0.45).abs(), 0.06).mul(open));

  // nine tentacles (centre + 4 mirrored pairs), bead strings let down bead by bead, centre first, outer last
  const qx = p.x.abs(), s = float(BY).sub(p.y);
  const prof = c.pick(102, 3);
  const sp = mix(0.95, 1.3, c.pick(109, 2));
  const wl = mix(0.4, 0.75, c.rnd(103));
  for (let j = 0; j < 5; j++) {
    const xj = j * 3.1;
    const L = float(18 - j * 1.5).mul(is(prof, 0)).add(float(12 + j * 1.4).mul(is(prof, 1))).add(float(j % 2 ? 12.5 : 17.5).mul(is(prof, 2)));
    const N = L.div(sp).floor();
    const n = s.div(sp).round().clamp(0, N);
    const sb = n.mul(sp);
    const k = n.div(N.max(1));
    const pt = u.sub(0.36 + j * 0.045).div(0.15).clamp(0, 1).mul(tX);
    const ph = c.rnd(110 + j).mul(TAU);
    const amp = j === 0 ? float(0) : float(0.22).add(cul.mul(1.1));
    const swayAt = (z) => z.div(L).clamp(0, 1).mul(amp).mul(z.mul(wl).sub(c.real.mul(1.7)).add(ph).sin());
    const d = vec2(qx.sub(xj).sub(swayAt(sb)), s.sub(sb)).length();
    const w = sb.mul(0.5).sub(c.real.mul(2.4)).add(ph).sin().mul(0.5).add(0.5);
    const rad = sp.mul(mix(float(0.42), float(0.2), k)).mul(cul.mul(0.35).mul(w).add(1));
    const shown = maskBeads(pt, k);
    const bead = step(d, rad).mul(shown);
    const eye = step(d, rad.mul(0.36)).mul(shown);
    const lineD = qx.sub(xj).sub(swayAt(s)).abs();
    const line = stroke(lineD, 0.045).mul(step(0, s)).mul(step(s, L)).mul(maskDraw(pt, s.div(L)));
    const run = smoothstep(1.6, 0, s.sub(c.beat.fract().mul(L)).abs()).mul(step(0.001, c.kick));
    const blit = float(0.75).add(run.mul(0.8)).add(cul.mul(w).mul(0.6));
    add(B.mul(0.55), line.mul(float(1).sub(bead)));
    add(mix(B, W, w.mul(cul).mul(0.6)).mul(blit), bead.mul(float(1).sub(eye)));
    add(W.mul(1.2), eye);
  }

  m.colorNode = col;
  m.opacityNode = cover.mul(visionShown(ctx, c, 0));
  m.alphaTest = 0.5;
  return m;
}
