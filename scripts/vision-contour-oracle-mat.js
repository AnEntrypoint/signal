// THE CONTOUR ORACLE (vision being BEINGS[2]): a figure that exists ONLY as bent parallel lines (shape from contour).
// Five canvases at five depths, one script (params.layer, baked), each on its own motion; its 3D worms are
// vision-contour-oracle-worm-geo.js / -worm-mat.js.
//   "world" z -30  the contour field as terrain: dune lines that FLOW sideways; two reaching arms are ridges in it,
//                  an eye parts the lines in the sky. Opaque black ground; grows as threads, line by line, from the centre.
//   "ring"  z -12  two bead rows TURNING against each other, a hairline and a tick collar (additive, soft).
//   "being" z 0    the bust: black body whose stripes are displaced by a face relief; it BREATHES and its stripes creep.
//   "veil"  z +10  contour islands (topographic hills, black with nested level lines) DRIFTING across the corners.
//   "fore"  z +22  contour pebbles: small black nested-ring stones SCROLLING up the sides, each with a dithered shadow.
// Score over u: 0-.1 one line strokes out from the centre; .03-.3 line after line joins and the relief rises (face),
// .24-.4 the rim; .25-.47 the world's threads grow outward; .4-.6 ring hairline, bead rows, ticks; .5-.7 details:
// arms rise shoulder to fingertip, joint glints, the sky eye parts, crown beads, the face's eyes half open, brow star;
// .55-.85 worms grow in, islands rise from their peaks, pebbles open, skins change; .85-.93 the culmination: the rim
// unwinds, the bust's stripes LOCK onto the world's lines (the figure is nothing but the bend), the head turns as
// the bend travels, a worm, the islands and the pebbles go dark; .93-1 last in first out.
// Seed channels 240..259: 0 hue family, 1 line pitch, 2 head-turn sense, 3 worm count, 4 worm skin order / pebble sense,
// 5 illusion variant (lock / figure-ground flip), 6 ring bead count, 7 joint detail set, 8 flow sense, 9 sky-eye place,
// 10 arms (both raised / one lowered), 11-12 ring speeds, 13 veil drift sense, 15 dark worm, 16-19 island / pebble places.
import { MeshBasicNodeMaterial, AdditiveBlending, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, mix, atan2, fwidth, select } from "builtin/tsl";
import { tripClock, visionShown, visionU, climb, maskBeads, maskClock } from "./lib/trip.js";

const TAU = 6.28318, CH = 240;
const DEPTH = { world: 104, ring: 86, being: 74, veil: 64, fore: 52 };
const HEAD_Y = 6, FS = 2.0;
const is = (v, i) => step(v.sub(i).abs(), 0.5);
const G = (v) => v.negate().exp();
const sq = (v) => v.mul(v);
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
    u = select(di.lessThan(d), h.mul(len).add(L[i]).div(total), u);
    d = d.min(di);
  }
  return { d, u };
}
// 2x2 ordered dither threshold in local metres: darkening is black pixels, never a grey fade
const bayer = (p, cell) => { const ix = p.x.div(cell).floor().mod(2), iy = p.y.div(cell).floor().mod(2); return ix.mul(2).add(iy.mul(3)).sub(ix.mul(iy).mul(4)).div(4).add(0.125); };
// one contour line per unit of s: t 0 on the line .. 1 between lines, m its cover at this duty
const band = (s, duty) => { const t = s.fract().sub(0.5).abs().mul(2); const w = fwidth(s).mul(2).clamp(0.001, 0.5); return { t, m: float(1).sub(smoothstep(float(duty), float(duty).add(w), t)) }; };
const star4 = (d, sz) => float(1).sub(smoothstep(0.9, 1, d.x.abs().div(sz).sqrt().add(d.y.abs().div(sz).sqrt())));

export function material(ctx) {
  const layer = ctx.params.layer ?? "being";
  const c = tripClock(ctx), u = visionU(ctx, c), t = c.real;
  const R = (n) => c.rnd(CH + n), pk = (n, k) => c.pick(CH + n, k);
  const S = (a, b) => smoothstep(a, b, u), out = (a, b) => float(1).sub(smoothstep(a, b, u));
  const sgn = (n) => step(0.5, R(n)).mul(2).sub(1);
  const cul = S(0.85, 0.9).mul(out(0.93, 0.95)).mul(climb(c).mul(0.4).add(0.6));
  const lock = S(0.85, 0.9).mul(out(0.94, 0.96));
  const fam = pk(0, 3), iv = pk(5, 2);
  const blue = vec3(0.05, 0.12, 1.0), violet = vec3(0.45, 0.05, 1.0), W = vec3(1, 1, 1), P = vec3(1.0, 0.05, 0.6);
  const A = blue.mul(is(fam, 0)).add(violet.mul(is(fam, 1))).add(mix(blue, violet, 0.5).mul(is(fam, 2)));
  const B = violet.mul(is(fam, 0)).add(blue.mul(is(fam, 1))).add(mix(blue, W, 0.4).mul(is(fam, 2)));
  const Sw = mix(2.7, 4.3, R(1)), Sb = Sw.mul(DEPTH.being / DEPTH.world);
  const p = positionGeometry.xy;
  const aa = fwidth(p.x).mul(1.2).max(0.01);
  const stroke = (d, w) => float(1).sub(smoothstep(float(w), aa.add(w), d));
  const gate = step(0.001, c.kick);
  const ripple = (rr, reach, w) => smoothstep(w, 0, rr.sub(c.beat.fract().mul(reach)).abs()).mul(gate).mul(float(1).sub(c.beat.fract()));
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;

  if (layer === "world") {
    const wy = HEAD_Y * DEPTH.world / DEPTH.being;
    const rr = p.sub(vec2(0, wy)).length();
    const fd = sgn(8);
    // dunes flow sideways; the ground under the figure stays calm so the bust's stripes can continue it
    const calm = smoothstep(0.9, 1.9, vec2(p.x.div(62), p.y.add(20).div(70)).length());
    const dune = calm.mul(p.x.mul(0.03).add(t.mul(0.22).mul(fd)).add(p.y.mul(0.025).sin().mul(1.3)).sin().mul(5)
      .add(p.x.mul(0.071).sub(t.mul(0.15).mul(fd)).add(p.y.mul(0.05)).sin().mul(2.2)));
    // two reaching arms: ridges under the lines, risen shoulder -> fingertip. Seeded: both raised, or the left one lowered
    const low = is(pk(10, 2), 1).mul(step(p.x, 0));
    const aq = vec2(p.x.abs(), p.y.add(28).mul(mix(float(1), float(-1 / 0.45), low)).sub(28));
    const ARM = [[40, -30], [70, -10], [92, 22], [100, 32]];
    const pl = polyline(aq, ARM);
    const pa = S(0.5, 0.68).mul(out(0.955, 0.975));
    const armAmp = float(1).sub(smoothstep(pa.mul(1.15).sub(0.12), pa.mul(1.15), pl.u)).mul(smoothstep(0, 0.12, pl.u)).mul(7);
    let fgd = float(1000);
    for (const f of [[100, 47], [106, 46], [111, 42], [113, 35], [89, 39]]) fgd = fgd.min(polyline(aq, [[100, 32], f]).d);
    const armD = armAmp.mul(G(sq(pl.d.div(6)))).add(G(sq(fgd.div(2.1))).mul(5).mul(smoothstep(0.85, 1, pa)));
    // the sky eye: the lines part around an almond
    const ex0 = R(9).sub(0.5).mul(70), ex = p.x.sub(ex0), ey = p.y.sub(52);
    const po = S(0.56, 0.7).mul(out(0.955, 0.97)).mul(cul.mul(0.25).add(0.75));
    const base = float(1).sub(sq(ex.div(15))).max(0), hh = po.mul(5.5).mul(base);
    const eyeD = hh.mul(ey.div(1.2).clamp(-1, 1)).mul(G(sq(ey.div(10))));
    const almond = step(ey.abs(), hh.mul(0.8)).mul(step(0.05, po));
    const s = p.y.sub(dune).sub(armD).sub(eyeD).div(Sw);
    const n = s.floor(), fr = s.fract().sub(0.5);
    // THREADS: every line with its own strip of black ground grows outward from the centre axis, near lines first
    const gw = S(0.25, 0.47).mul(out(0.955, 0.985));
    const k = n.add(0.5).mul(Sw).sub(wy).abs().div(95), hsh = n.mul(12.9898).sin().mul(43758.5453).fract();
    const reach = gw.mul(1.75).sub(k.mul(0.6)).sub(hsh.mul(0.12)).mul(175);
    const edge = reach.sub(p.x.abs()).sub(sq(fr).mul(20));
    const cover = step(0, edge);
    const b = band(s, 0.3);
    const beadRow = step(n.mod(6), 0.5);
    const bd = vec2(p.x.div(2.4).fract().sub(0.5).mul(2.4), fr.mul(Sw)).length();
    const line = mix(b.m, float(1).sub(smoothstep(0.55, 0.7, bd)), beadRow).mul(float(1).sub(almond));
    // joint glints, placed: shoulder, elbow, wrist, palm, lit in order as the arm rises
    const pg = S(0.58, 0.72).mul(out(0.955, 0.965)), ds = pk(7, 2);
    let gl = float(0), mark = float(0);
    ARM.forEach(([jx, jy], i) => {
      const d = aq.sub(vec2(jx, jy)), on = maskBeads(pg, i / 4);
      gl = gl.add(G(d.dot(d).div(70)).mul(on));
      const an = atan2(d.y, d.x).div(TAU).mul(10).fract().sub(0.5).mul(TAU * 5 / 10), rd = d.length().sub(5);
      const beads = float(1).sub(smoothstep(0.5, 0.65, an.mul(an).add(rd.mul(rd)).sqrt()));
      mark = mark.max(mix(star4(d, c.kick.mul(0.3).add(1).mul(3.6)), beads, is(ds, 1)).mul(on));
    });
    const kl = ripple(rr, 150, 7);
    const lit = float(0.5).add(kl.mul(0.7)).add(cul.mul(0.25));
    const nibm = smoothstep(5, 0, edge).mul(step(gw, 0.995)).mul(step(0.005, gw));
    let col = mix(mix(A, B, beadRow), P, gl.min(1)).mul(line).mul(lit.add(gl.mul(0.5))).add(W.mul(line).mul(nibm));
    col = mix(col, mix(P, W, 0.5).mul(1.2), mark);
    // inside the parted lines: an iris of rings, a pink pupil ring, a white point
    const re = vec2(ex, ey).length();
    const iris = band(re.div(1.1), 0.35).m.mul(step(re, 4.6)).mul(step(2.3, re));
    const lid = stroke(ey.abs().sub(hh.mul(0.8)).abs(), 0.16).mul(step(0.02, base)).mul(step(0.05, po));
    const eyeCol = A.mul(iris).add(P.mul(stroke(re.sub(1.7).abs(), 0.28))).add(W.mul(stroke(re, 0.55)));
    col = mix(mix(col, eyeCol, almond), W, lid);
    m.colorNode = col;
    m.opacityNode = cover.mul(visionShown(ctx, c, rr.div(190)));
    m.alphaTest = 0.5;
    return m;
  }

  if (layer === "ring") {
    const q = p.sub(vec2(0, HEAD_Y * DEPTH.ring / DEPTH.being)), rr = q.length(), ang = atan2(q.x, q.y);
    const blur = aa.mul(3), rs = sgn(11);
    const soft = (d, w) => float(1).sub(smoothstep(float(w), blur.add(w), d));
    const pr = S(0.4, 0.5).mul(out(0.95, 0.975)), pb = S(0.44, 0.58).mul(out(0.95, 0.972)), pt = S(0.52, 0.62).mul(out(0.95, 0.968));
    const hair = soft(rr.sub(30).abs(), 0.07).mul(maskClock(pr, ang.mul(rs)));
    const N1 = pk(6, 3).mul(8).add(40), N2 = pk(6, 3).mul(6).add(28);
    const row = (rad, N, rot, br) => {
      const an = ang.div(TAU).add(rot).fract().mul(N), loc = an.fract().sub(0.5).mul(float(TAU * rad).div(N)), dr = rr.sub(rad);
      const d = loc.mul(loc).add(dr.mul(dr)).sqrt();
      const hollow = float(1).sub(float(1).sub(smoothstep(br * 0.35, br * 0.6, d)).mul(cul));   // at the culmination the beads open into rings
      return { m: float(1).sub(smoothstep(float(br).sub(blur), blur.add(br), d)).mul(hollow), hot: step(an.floor().mod(8), 0.5) };
    };
    const k = ang.abs().div(3.14159);
    const r1 = row(33.2, N1, t.div(mix(50, 90, R(11))).mul(rs), 0.42), r2 = row(37.6, N2, t.div(mix(36, 64, R(12))).mul(rs).negate(), 0.62);
    const b1 = r1.m.mul(maskBeads(pb, k)), b2 = r2.m.mul(maskBeads(pb.mul(1.4).sub(0.4).max(0), float(1).sub(k)));
    const ticks = step(ang.div(TAU).mul(72).fract(), 0.14).mul(step(rr.sub(42.3).abs(), 1.3)).mul(maskClock(pt, ang.mul(rs).negate()));
    const kl = ripple(rr, 60, 4);
    const lit = float(0.5).add(kl.mul(0.8)).add(cul.mul(0.4));
    const col = A.mul(hair.add(ticks.mul(0.7))).add(mix(B, P, r1.hot).mul(b1)).add(mix(mix(A, W, 0.5), P, r2.hot).mul(b2));
    m.colorNode = col.mul(lit);
    m.opacityNode = visionShown(ctx, c, rr.div(50));
    m.transparent = true; m.blending = AdditiveBlending; m.depthWrite = false;
    return m;
  }

  if (layer === "veil") {
    // contour islands: a height field of four hills; black where it is above the water line, level lines on it
    const g = S(0.6, 0.8).mul(out(0.94, 0.965));
    const drift = sgn(13).mul(u.mul(24).sub(14)).mul(0.8);
    const ISL = [[-58, -30, 17], [52, -33, 14], [-66, 22, 12], [62, 27, 15]];
    const field = (q) => { let f = float(0); ISL.forEach(([x, y, r], i) => {
      const cx = drift.add(x), cy = R(16 + i).sub(0.5).mul(12).add(t.mul(0.27).add(i * 1.9).sin().mul(1.6)).add(y);
      const d = q.sub(vec2(cx, cy)); f = f.add(G(d.dot(d).div(r * r))); }); return f; };
    const f = field(p), f2 = field(p.add(vec2(-2.6, 3.2)));
    const thr = mix(float(1.02), float(0.42), g), live = step(0.01, g);
    const cover = step(thr, f).mul(live);
    const dM = f.sub(thr).div(fwidth(f).div(fwidth(p.x)).max(0.0001));
    const rim = stroke(dM, 0.28).mul(cover);
    const dark = S(0.84, 0.9).mul(out(0.93, 0.94));                         // the level lines go out, shore first
    const lv = band(f.mul(7), 0.24).m.mul(step(mix(thr, float(1.3), dark), f)).mul(cover);
    const peak = step(0.94, f).mul(cover);
    const rr = p.length(), kl = ripple(rr, 110, 6);
    const col = B.mul(lv).mul(float(0.6).add(kl.mul(0.8))).add(mix(B, W, 0.6).mul(rim).mul(float(0.9).sub(dark.mul(0.55)))).add(P.mul(peak).mul(float(1).sub(dark)));
    const shade = step(bayer(p, 0.24), smoothstep(thr.mul(0.7), thr, f2).mul(0.75)).mul(float(1).sub(cover)).mul(live);
    m.colorNode = col;
    m.opacityNode = cover.max(shade).mul(visionShown(ctx, c, rr.div(110)));
    m.alphaTest = 0.5;
    return m;
  }

  if (layer === "fore") {
    // contour pebbles: six small black stones of nested level rings, placed on the two sides, scrolling slowly up
    // (or down, by seed) past the camera; they open one by one from their peaks, lose their rings for a pink
    // point, and go to bare rimmed silhouettes at the culmination. Each drops a dithered shadow.
    const dir = sgn(4);
    let f = float(0), f2 = float(0), ord = float(0);
    for (let i = 0; i < 6; i++) {
      const side = i % 2 ? 1 : -1, r = 2.6 + (i % 3) * 0.9;
      const x = R(16 + (i % 4)).mul(14).add(30 + (i >> 1) * 7).mul(side);
      const y = t.mul(0.9 + i * 0.13).mul(dir).add(i * 17.3).add(47).mod(94).sub(47);
      const gi = S(0.62 + i * 0.025, 0.72 + i * 0.025).mul(out(0.93, 0.95));
      const d = p.sub(vec2(x, y)), d2 = d.add(vec2(-1.3, 1.6));
      const e1 = G(vec2(d.x, d.y.mul(1.35)).dot(vec2(d.x, d.y.mul(1.35))).div(r * r)).mul(gi);
      f = f.add(e1); f2 = f2.add(G(d2.dot(d2).div(r * r)).mul(gi));
    }
    const cover = step(0.42, f);
    const stage2 = S(0.76, 0.82), dark = S(0.84, 0.89).mul(out(0.93, 0.94));
    const rings = band(f.mul(5), 0.26).m.mul(float(1).sub(stage2));
    const point = step(0.93, f).mul(stage2).mul(float(1).sub(dark));
    const dM = f.sub(0.42).div(fwidth(f).div(fwidth(p.x)).max(0.0001));
    const rim = stroke(dM, 0.16);
    const col = B.mul(rings).add(P.mul(point).mul(c.kick.mul(0.5).add(1))).add(mix(A, W, 0.5).mul(rim).mul(float(0.9).sub(dark.mul(0.4))));
    const shade = step(bayer(p, 0.2), smoothstep(0.25, 0.42, f2).mul(0.7)).mul(float(1).sub(cover));
    m.colorNode = col.mul(cover);
    m.opacityNode = cover.max(shade).mul(visionShown(ctx, c, p.length().div(90)));
    m.alphaTest = 0.5;
    return m;
  }

  // ---- THE BEING: the bust. Black body, stripes displaced by the relief of a face
  const ts = sgn(2);
  const fx = p.x.div(FS), fy = p.y.sub(HEAD_Y).div(FS);
  const jaw = fy.add(8).div(10).clamp(0, 1).mul(0.2).add(0.8);
  const e = float(1).sub(sq(fx.div(jaw.mul(6.2)))).sub(sq(fy.sub(0.5).div(8.6)));
  const ep = e.max(0), dome = ep.add(0.0001).pow(0.7);
  const tau = ts.mul(t.mul(0.23).sin().mul(0.3).add(cul.mul(0.8).mul(t.mul(0.7).sin())));   // the head turns: the bend travels
  const sh = tau.mul(2.4).mul(dome);
  const fxT = fx.sub(sh), ax = fxT.abs(), x2 = fxT.mul(fxT);
  const feat = G(sq(fxT.div(0.8))).mul(G(sq(sq(fy.sub(1).div(2.3))))).mul(1.7)
    .add(G(x2.add(sq(fy.add(0.9))).div(0.45)).mul(0.9))
    .sub(G(sq(ax.sub(2.3)).div(1.3).add(sq(fy.sub(1.8)).div(0.6))).mul(1.1))
    .add(G(sq(fy.sub(3.1)).div(0.35).add(sq(ax.sub(2.1)).div(3))).mul(0.55))
    .add(G(sq(ax.sub(3)).div(2).add(sq(fy.add(0.8)).div(2))).mul(0.5))
    .add(G(x2.div(2).add(sq(fy.add(3.15)).div(0.08))).mul(0.45))
    .add(G(x2.div(1.6).add(sq(fy.add(3.85)).div(0.1))).mul(0.5))
    .add(G(x2.div(1.5).add(sq(fy.add(5.6)).div(0.8))).mul(0.6));
  const Hf = dome.mul(3.6).add(feat.mul(ep.div(0.25).min(1)));
  const eb = float(1).sub(sq(p.x.div(38))).sub(sq(p.y.add(40).div(26)));
  const neckIn = step(-17, p.y).mul(step(p.y, -8)), en = float(1).sub(sq(p.x.div(5.4))).mul(neckIn).sub(float(1).sub(neckIn));
  const Dn = G(sq(p.x.div(5))).mul(smoothstep(-20, -13, p.y)).mul(smoothstep(-5, -10, p.y)).mul(3);
  const F = e.max(eb).max(en);
  const amp = S(0.06, 0.3).mul(t.mul(0.8).sin().mul(0.07).add(0.93));          // the relief rises, then breathes
  const D = amp.mul(Hf.mul(1.5).add(eb.max(0).add(0.0001).pow(0.8).mul(7)).add(Dn));
  const phi = t.mul(0.1).fract().mul(float(1).sub(lock)).add(lock.mul(0.5).mul(is(iv, 1)));   // own creep; locked: the world's phase
  const s = p.y.sub(D).div(Sb).add(phi);
  const n = s.floor(), fr = s.fract().sub(0.5);
  const pl = S(0.0, 0.3).mul(out(0.97, 1.0));
  const k = n.add(0.5).sub(phi).mul(Sb).sub(HEAD_Y).abs().div(75);
  const edge = pl.mul(1.3).sub(k).mul(220).sub(p.x.abs()).sub(sq(fr).mul(12));
  const inside = step(0, F);
  let cover = inside.mul(step(0, edge));
  // the face's eyes: almonds that part the stripes; half open with the details, wide at the culmination
  const exx = p.x.sub(tau.mul(3.4)).abs().sub(4.6), eyy = p.y.sub(HEAD_Y + 3.6), dxe = exx.div(3.0), be = float(1).sub(dxe.mul(dxe)).max(0);
  const open = S(0.55, 0.66).mul(0.45).add(cul.mul(0.55)).mul(out(0.965, 0.975));
  const upY = be.mul(1.5).mul(open), lowY = be.mul(-0.9).mul(open);
  const almond = step(lowY, eyy).mul(step(eyy, upY)).mul(step(dxe.abs(), 1)).mul(step(0.02, open)).mul(cover);
  const re = vec2(exx, eyy.sub(0.2)).length();
  const b = band(s, 0.45);
  const comp = smoothstep(1.7, 3.2, fwidth(s).div(fwidth(p.y).div(Sb)));        // where the lines crowd: pink glint
  const rrh = vec2(p.x, p.y.sub(HEAD_Y)).length(), kl = ripple(rrh, 60, 4);
  const nibm = smoothstep(4, 0, edge).mul(step(pl, 0.995));
  let col = mix(mix(A, W, smoothstep(0.45, 0.12, b.t)), P, comp.mul(S(0.5, 0.62))).mul(b.m).mul(float(0.8).add(kl.mul(0.5)).add(cul.mul(0.2))).add(W.mul(b.m).mul(nibm));
  const eyeCol = A.mul(stroke(re.sub(1.05).abs(), 0.2)).add(P.mul(stroke(re, 0.5))).add(W.mul(stroke(eyy.sub(upY).abs().min(eyy.sub(lowY).abs()), 0.1)));
  col = mix(col, eyeCol, almond);
  // the rim: drawn round the silhouette by a clock hand; at the culmination it unwinds (variant 0) and only the bend is left
  const angH = atan2(p.x, p.y.sub(HEAD_Y));
  const dM = F.div(fwidth(F).div(fwidth(p.x)).max(0.0001));
  const rimP = S(0.24, 0.4).mul(float(1).sub(lock.mul(is(iv, 0)))).mul(out(0.965, 0.985));
  const rim = inside.mul(stroke(dM, 0.3)).mul(maskClock(rimP, angH.mul(ts))).mul(cover);
  col = mix(col, mix(B, W, 0.45).mul(1.1), rim);
  // crown beads over the head, lit from the temples up; a brow star
  const rho = float(1).sub(e).max(0).sqrt(), an = angH.div(TAU).mul(44), loc = an.fract().sub(0.5).mul(TAU * 17 / 44), dr = rho.sub(1.17).mul(14.5);
  const pcb = S(0.5, 0.64).mul(out(0.96, 0.975));
  const crown = float(1).sub(smoothstep(float(0.45).sub(aa), 0.45, loc.mul(loc).add(dr.mul(dr)).sqrt())).mul(step(angH.abs(), 2.0)).mul(maskBeads(pcb, float(1).sub(angH.abs().div(2.0))));
  col = mix(col, mix(mix(B, W, 0.6), P, step(an.floor().mod(4), 0.5)), crown);
  const brow = star4(vec2(p.x.sub(tau.mul(3.4)), p.y.sub(HEAD_Y + 9.6)), c.kick.mul(0.3).add(1).mul(1.7)).mul(S(0.63, 0.66)).mul(out(0.96, 0.97)).mul(cover);
  col = mix(col, mix(P, W, 0.4).mul(1.3), brow);
  cover = cover.max(crown);
  m.colorNode = col;
  m.opacityNode = cover.mul(visionShown(ctx, c, rrh.div(70)));
  m.alphaTest = 0.5;
  return m;
}
