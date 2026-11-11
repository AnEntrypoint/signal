// THE STAR MEDUSA (vision being "star-jelly"): a jellyfish whose bell is 5 concentric op-art striped arcs on a black
// dome with a star in its crown, 9 bead-string tentacles hanging below, mirrored, in its own deep sea.
// FIVE canvases, five depths, five motions (params.layer):
//   "world" z -30  SCROLLS: black sea grown outward from the being as spreading ripples; a caustic line-net surface
//                  drifting overhead, plankton beads rising in slow helices, small medusae pulsing at their own tempos
//   "ring"  z -12  TURNS:   a faint 8-point line star and two counter-rotating bead rows (additive, the only glow)
//   "being" z 0    BREATHES: crown star, black dome with striped arcs, rim eyes, bead tentacles (cutout, occludes)
//   "veil"  z +10  DRIFTS:  black-bodied bubbles rising and swaying past the sides (cutout, occludes)
//   "fore"  z +22  TUMBLES: near star-sparks and crescent plankton glyphs falling and spinning at the corners
// The great tentacles are real 3D tubes: vision-star-jelly-worm-*.js.
// SCORE over the slot (u = 0..1 of 26.5 s): .00 the first thread drops from the centre, star point by point;
// .08 the arcs sweep down from the crown one by one; .16 tentacles let down bead by bead; .25 the sea ripples out;
// .32 the caustic surface draws; .36 plankton helices rise column by column; .40 distant medusae, one by one, and
// the ring's star sweeps round; .46/.50 the two bead rows; .50 rim eyes open centre-out; .55 tentacle-bead pupils;
// .58 the detail set (crown diadem or oral arms); .62 bubbles; .66 fore sparks; .85 culmination on the highs: the
// barber pole (stripes run outward, beads climb inward) or the spoke lock; .93 exit, last in first out.
// Beat light only through c.kick. Seed channels 360-379 (K = 8): 360 hue, 361 tentacle profile, 362 wave length,
// 363 star points, 364 stripe drift, 365 ring speed+sense, 366 ring star / row count, 367 bead spacing, 368 detail
// set, 369 caustic scale, 370 illusion variant, 371 medusae, 375 bubble sense, 376 tentacle phases, 377 breath tempo.
import { MeshBasicNodeMaterial, AdditiveBlending, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, mix, atan2, fwidth } from "builtin/tsl";
import { tripClock, visionShown, visionU, climb, maskClock, maskIris, maskBeads, maskDraw, nib } from "./lib/trip.js";

const TAU = 6.28318, PI = 3.14159;
const S = 1.6;             // the being's drawing scale (canvas metres per drawing unit)
const BY = 1.5, SY = 2.6;  // bell rim line, crown star above it
const R0 = 5.4, DR = 2.35, HW = 0.72, THMAX = 1.7;
const ROUT = R0 + 4 * DR + HW;
const COL = { blue: [0.02, 0.05, 1], violet: [0.24, 0.02, 1], pink: [1, 0.02, 0.33], orange: [1, 0.17, 0.01], yellow: [1, 0.72, 0.02], green: [0.03, 1, 0.06], white: [1, 1, 1] };
const FAMS = [["blue", "violet", "yellow", "pink"], ["violet", "pink", "white", "green"], ["pink", "orange", "yellow", "blue"], ["green", "blue", "white", "orange"]];   // 4th: the counter-accent, so every seed reaches the far side of the palette
const is = (v, i) => step(v.sub(i).abs(), 0.5);
const inv = (x) => float(1).sub(x);

export function material(ctx) {
  const layer = ctx.params.layer ?? "being";
  const c = tripClock(ctx);
  const hold = ctx.param("hold", -1), held = step(0, hold);   // bench: hold >= 0 pins the slot's u
  const u = mix(visionU(ctx, c), hold.max(0), held);
  const live = mix(visionShown(ctx, c, 0), c.on, held);
  const rn = (k) => c.rnd(360 + k), pk = (k, m) => c.pick(360 + k, m);
  const io = (a, b, x, y) => smoothstep(a, b, u).mul(inv(smoothstep(x, y, u)));
  const fam = pk(0, 4);
  const famCol = (slot) => { let v = vec3(0); FAMS.forEach((f, i) => { v = v.add(vec3(...COL[f[slot]]).mul(is(fam, i))); }); return v; };
  const A = famCol(0), B = famCol(1), H = famCol(2), H2 = famCol(3), W = vec3(1, 1, 1);
  const cul = smoothstep(0.85, 0.9, u).mul(climb(c).mul(0.6).add(0.4)).mul(inv(smoothstep(0.93, 0.95, u)));
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  m.fog = false;
  const cutout = (col, cover) => { m.colorNode = col; m.opacityNode = cover.mul(live); m.alphaTest = 0.5; m.transparent = false; m.depthWrite = true; return m; };

  if (layer === "world") {
    // ---- THE SEA: grown outward from the being as ripples, scrolling (plankton rising, surface drifting)
    const p = positionGeometry.xy, aa = fwidth(p.x).mul(1.2).max(0.02);
    const ang = atan2(p.x, p.y), r = vec2(p.x.div(1.55), p.y).length().add(ang.mul(8).sin().mul(2.5));
    const Rf = smoothstep(0.25, 0.45, u).mul(inv(smoothstep(0.955, 0.985, u))).mul(118);
    const band = step(r.sub(c.real.mul(4)).div(5).fract(), 0.55);
    const cover = step(r, Rf.sub(12)).max(step(r, Rf).mul(band));
    const crest = smoothstep(aa.mul(2), 0, r.sub(c.real.mul(4)).div(5).fract().sub(0.55).abs().mul(5)).mul(step(r, Rf)).mul(step(Rf.sub(14), r));
    let col = A.mul(0.35).mul(crest);
    // the surface overhead: a caustic line-net, foreshortened toward its horizon, drawn from the centre outward
    const yy = p.y.sub(30), deep = yy.add(6).max(0.5);
    const cs = mix(0.8, 1.3, rn(9));
    const X = p.x.div(deep).mul(14).mul(cs), Y = float(260).div(deep).mul(cs), t = c.real;
    const f = X.mul(0.35).add(Y.mul(0.5).add(t.mul(0.4)).sin().mul(1.4)).add(t.mul(0.2)).sin()
      .add(Y.mul(0.42).add(X.mul(0.3).sub(t.mul(0.33)).sin().mul(1.4)).sin());
    const lw = fwidth(f).mul(1.3).max(0.02);
    const net = smoothstep(lw.add(0.06), 0.0, f.abs()).mul(smoothstep(0, 8, yy)).mul(maskDraw(smoothstep(0.32, 0.46, u), p.x.abs().div(150)));
    col = col.add(mix(A, W, 0.35).mul(net).mul(float(0.38).add(c.kick.mul(0.12))));
    // plankton beads rising in slow helices, 5 mirrored columns, centre column first
    const qx = p.x.abs();
    for (let i = 0; i < 5; i++) {
      const xc = 26 + i * 20, sp = 4.2, spd = 1.2 + i * 0.23, A0 = 3.2 - i * 0.3;
      const yb0 = p.y.add(t.mul(-spd)).div(sp).round();
      const ph = yb0.mul(0.62).add(i * 1.9);
      const by = yb0.mul(sp).add(t.mul(spd));
      const bx = ph.sin().mul(A0).add(xc);
      const zf = ph.cos().mul(0.5).add(0.5);
      const d = vec2(qx.sub(bx), p.y.sub(by)).length();
      const pc = smoothstep(0.36 + i * 0.025, 0.42 + i * 0.025, u).mul(step(by, 40));
      const dot = step(d, zf.mul(0.45).add(0.35)).mul(pc).mul(cover);
      col = col.add(mix(B, i % 3 === 2 ? H2 : H, i % 2).mul(zf.mul(0.45).add(0.18)).mul(dot));
    }
    // small medusae in the distance, each pulsing at its own tempo, arriving one by one
    const nM = pk(11, 3).add(3);
    for (let j = 0; j < 5; j++) {
      const sg = j % 2 ? -1 : 1;
      const mx = rn(20 + j).mul(60).add(42).mul(sg), my = rn(25 + j).mul(46).sub(26);
      const tempo = 1.7 + j * 0.47, sz = rn(30 + j).mul(2.5).add(4);
      const pul = t.mul(TAU / tempo).add(j).sin();
      const q = vec2(p.x.sub(mx).div(pul.mul(0.12).add(1)), p.y.sub(my).div(pul.mul(-0.08).add(1)));
      const rq = q.length(), th = atan2(q.x, q.y).abs();
      const on = step(j, nM.sub(0.5)).mul(maskIris(smoothstep(0.4 + j * 0.03, 0.46 + j * 0.03, u), rq.div(sz.mul(2.4))));
      const dome = step(rq, sz).mul(step(th, 1.6));
      const stripe = step(th.mul(sz).div(0.8).add(t.mul(0.3)).fract(), 0.5).mul(step(sz.mul(0.55), rq));
      const rim = smoothstep(0.35, 0, rq.sub(sz).abs()).mul(step(th, 1.6));
      const tx = q.x.abs(), ts = q.y.negate();
      const ten = smoothstep(0.25, 0, tx.sub(sz.mul(0.4)).sub(ts.mul(0.4).sub(t.mul(2)).add(j).sin().mul(0.5)).abs()).mul(step(0, ts)).mul(step(ts, sz.mul(1.4)))
        .max(smoothstep(0.22, 0, tx.sub(ts.mul(0.5).sub(t.mul(1.6)).sin().mul(0.4)).abs()).mul(step(0, ts)).mul(step(ts, sz.mul(1.8))));
      col = col.mul(inv(dome.mul(on))).add(mix(A, W, 0.3).mul(dome.mul(stripe).mul(0.4).add(rim.mul(0.6)).add(ten.mul(0.35))).mul(on).mul(cover));
    }
    return cutout(col, cover);
  }

  if (layer === "ring") {
    // ---- far: the 8-point line star, two bead rows counter-rotating, all additive and faint
    const p = positionGeometry.xy, rr = p.length(), aa = fwidth(p.x).mul(1.2).max(0.02);
    const sense = rn(5).step(0.5).mul(2).sub(1);
    const rot = c.real.div(mix(70, 120, rn(5).mul(2).fract())).mul(sense).mul(TAU);
    const mm = pk(6, 2).add(2);
    const R = 34, h = mm.mul(PI / 8).cos().mul(R), half = mm.mul(PI / 8).sin().mul(R);
    const blur = aa.mul(3).add(0.05);
    let line = float(0), tips = float(0);
    for (let k = 0; k < 8; k++) {
      const a = rot.add(k * TAU / 8);
      const n = vec2(a.cos(), a.sin()), tt = vec2(a.sin().negate(), a.cos());
      const dn = p.dot(n).sub(h).abs(), dt = p.dot(tt).abs();
      line = line.max(smoothstep(blur.add(0.08), 0.0, dn).mul(smoothstep(half.add(0.3), half, dt)));
      const va = a.add(mm.mul(PI / 8));
      tips = tips.max(smoothstep(1.1, 0.4, p.sub(vec2(va.cos(), va.sin()).mul(R)).length()));
    }
    const pr = io(0.4, 0.52, 0.95, 0.975);
    const draw = maskClock(pr, atan2(p.x, p.y));
    const lit = float(0.05).add(cul.mul(0.05)).add(c.kick.mul(0.03));
    let col = mix(A, W, 0.2).mul(line).mul(lit).add(mix(B, W, 0.5).mul(tips).mul(lit.add(0.15))).mul(draw);
    // two bead rows, counter-rotating at their own rates; dots light one by one round the clock
    const nD = pk(6, 3).mul(12).add(36);
    for (let r = 0; r < 2; r++) {
      const Rr = 41 + r * 5.5, N = r ? nD.add(12) : nD, sgn = r ? -1 : 1;
      const a = atan2(p.x, p.y).add(c.real.mul(sense).mul(sgn).mul(TAU / (r ? 64 : 90)));
      const cell = a.div(TAU).mul(N);
      const ia = cell.floor(), fa = cell.fract().sub(0.5);
      const d = vec2(fa.mul(TAU * Rr).div(N), rr.sub(Rr)).length();
      const k = ia.div(N).fract();
      const pb = io(0.46 + r * 0.04, 0.56 + r * 0.04, 0.95 - r * 0.005, 0.97);
      const dot = smoothstep(0.75, 0.45, d).mul(maskBeads(pb, k));
      col = col.add(mix(r ? B : A, W, 0.3).mul(dot).mul(float(0.22).add(cul.mul(0.25))));
    }
    m.colorNode = col;
    m.opacityNode = live;
    m.transparent = true;
    m.blending = AdditiveBlending;
    m.depthWrite = false;
    return m;
  }

  if (layer === "veil") {
    // ---- near: black-bodied bubbles (6 mirrored pairs) rising and swaying, each forming from a point, popping at the end
    const p = positionGeometry.xy, qx = p.x.abs(), aa = fwidth(p.x).mul(1.2).max(0.02);
    const sense = rn(15).step(0.5).mul(2).sub(1);
    let col = vec3(0), cover = float(0);
    for (let i = 0; i < 6; i++) {
      const xi = 24 + i * 7.5 + (i % 2) * 3, ri = 1.6 + ((i * 7) % 5) * 0.65;
      const spd = 1.4 + i * 0.27;
      const y = c.real.mul(spd).div(96).add(rn(40 + i)).fract().mul(96).sub(48);
      const x = c.real.mul(0.35 + i * 0.06).add(i * 1.3).sin().mul(2.2).mul(sense).add(xi);
      const g = io(0.62 + i * 0.03, 0.66 + i * 0.03, 0.93 + i * 0.004, 0.935 + i * 0.004);
      const rad = float(ri).mul(g);
      const dv = vec2(qx.sub(x), p.y.sub(y));
      const d = dv.length();
      const body = step(d, rad).mul(step(0.02, g));
      const ring = smoothstep(aa.add(0.12), 0.0, d.sub(rad.mul(0.9)).abs());
      const inner = smoothstep(aa.add(0.05), 0.0, d.sub(rad.mul(0.62)).abs()).mul(step(0, dv.y.negate().add(dv.x.mul(0.3))));
      const hl = step(vec2(dv.x.add(rad.mul(0.38)), dv.y.sub(rad.mul(0.38))).length(), rad.mul(0.18));
      const lc = mix(B, W, 0.35).mul(float(0.75).add(c.kick.mul(0.3)).add(cul.mul(0.3)));
      col = col.mul(inv(body)).add(lc.mul(ring.add(inner.mul(0.5))).add(W.mul(hl)).mul(body));
      cover = cover.max(body);
    }
    return cutout(col, cover);
  }

  if (layer === "fore") {
    // ---- nearest: star-sparks and crescent glyphs falling and tumbling at the corners, black bodies with neon edges
    const p = positionGeometry.xy, qx = p.x.abs(), aa = fwidth(p.x).mul(1.2).max(0.02);
    let col = vec3(0), cover = float(0);
    for (let i = 0; i < 4; i++) {
      const xi = 36 + i * 6.5, sz = 1.4 + (i % 2) * 0.9;
      const spd = 0.9 + i * 0.31;
      const y = c.real.mul(spd).negate().div(84).add(rn(45 + i)).fract().mul(84).sub(42);
      const x = c.real.mul(0.25 + i * 0.05).add(i * 2.1).sin().mul(3).add(xi);
      const g = io(0.66 + i * 0.045, 0.7 + i * 0.045, 0.93 + i * 0.005, 0.935 + i * 0.005);
      const q = vec2(qx.sub(x), p.y.sub(y));
      const a = atan2(q.x, q.y).add(c.real.mul(0.6 + i * 0.2).mul(i % 2 ? -1 : 1));
      const rq = q.length();
      const body = i % 2 === 0
        ? (() => { const edge = mix(0.3, 1, a.mul(2).cos().abs().pow(6)).mul(sz).mul(g); return [step(rq, edge), smoothstep(aa.add(0.12), 0, rq.sub(edge).abs())]; })()
        : (() => { const s2 = sz * 1.2; const qq = vec2(a.sin(), a.cos()).mul(rq); const off = vec2(qq.x.add(s2 * 0.45), qq.y);
          const cres = step(rq, float(s2).mul(g)).mul(step(float(s2 * 0.8).mul(g), off.length()));
          return [cres, smoothstep(aa.add(0.1), 0, rq.sub(float(s2).mul(g)).abs()).mul(step(float(s2 * 0.8).mul(g), off.length()))]; })();
      const lc = (i % 2 ? H : mix(B, W, 0.4)).mul(float(0.85).add(cul.mul(0.3)));
      col = col.mul(inv(body[0])).add(lc.mul(body[1]).mul(body[0]));
      cover = cover.max(body[0]);
    }
    return cutout(col, cover);
  }

  // ---- THE BEING (drawing units; the canvas is S times larger)
  const p = positionGeometry.xy.div(S);
  const aa = fwidth(p.x).mul(1.2).max(0.01);
  const stroke = (d, w) => inv(smoothstep(float(w), aa.add(w), d));
  let col = vec3(0), cover = float(0);
  const add = (colour, mask) => { col = col.mul(inv(mask)).add(colour.mul(mask)); cover = cover.max(mask); };
  const tX = inv(smoothstep(0.965, 0.985, u));
  const bX = inv(smoothstep(0.975, 0.993, u));
  const sX = inv(smoothstep(0.985, 1.0, u));
  const illus = pk(10, 2);                                              // 0 barber pole, 1 spoke lock
  const tempo = mix(4.5, 6.5, rn(17));
  const breath = c.real.mul(TAU).div(tempo).sin().mul(cul.mul(0.05).add(0.022));
  const pb = vec2(p.x, p.y.sub(BY)).div(breath.add(1));
  const qs = pb.sub(vec2(0, SY));
  const rs = qs.length();
  const front = c.beat.fract().mul(34);
  const kl = smoothstep(2.4, 0, rs.sub(front).abs()).mul(step(0.001, c.kick)).mul(smoothstep(34, 16, front));

  // the dark dome, filling behind the arcs from the crown outward
  const rb = pb.length();
  const th = atan2(pb.x, pb.y).abs();
  const fillP = smoothstep(0.1, 0.3, u).mul(bX);
  const dome = step(rb, ROUT + 0.2).mul(step(th, THMAX)).mul(maskIris(fillP, rs.div(ROUT + 4)));
  add(vec3(0.0, 0.0, 0.006), dome);

  // the bell: 5 striped arcs, each sweeping down from the crown in turn (outer leaves first)
  const spd = mix(0.15, 0.4, rn(4));
  const lockT = cul.mul(illus);
  const barber = cul.mul(inv(illus));
  for (let i = 0; i < 5; i++) {
    const Ri = R0 + i * DR;
    const pi = smoothstep(0.08 + i * 0.035, 0.15 + i * 0.035, u).mul(inv(smoothstep(0.975 + (4 - i) * 0.003, 0.98 + (4 - i) * 0.003, u)));
    const inBand = step(rb.sub(Ri).abs(), HW).mul(step(th, float(THMAX).mul(pi)));
    const drift = c.real.mul(spd).mul(i % 2 ? -1 : 1);
    const coord = mix(th.mul(Ri).div(0.9).add(drift).add(rb.sub(Ri).mul(barber.mul(1.4))), th.mul(24 / PI), lockT);
    const stripe = step(coord.fract(), 0.5);
    const wave = c.real.mul(-2.6).add(i * 1.25).sin().mul(0.5).add(0.5).mul(barber);  // light runs outward across the arcs
    const lit = float(0.7).add(kl.mul(0.7)).add(cul.mul(0.3)).add(wave.mul(0.6));
    add([A, W.mul(0.85), H2, W.mul(0.85), B][i].mul(lit).mul(stripe), inBand);
    add(mix(A, W, 0.5).mul(0.9), stroke(rb.sub(Ri + HW).abs(), 0.05).mul(inBand.max(step(rb.sub(Ri + HW).abs(), 0.2).mul(step(th, float(THMAX).mul(pi))))));
  }
  add(mix(A, W, 0.5).mul(0.8), stroke(rb.sub(ROUT + 0.45).abs(), 0.06).mul(step(th, float(THMAX).mul(fillP))));

  // the crown star, point by point (the first stroke: the thread drops from its core)
  const kp = pk(3, 3), nS = float(5).add(is(kp, 1)).add(is(kp, 2).mul(3));
  const ps = smoothstep(0.03, 0.1, u).mul(sX);
  const pq = ps.mul(nS).add(0.001).floor().div(nS);
  const a = atan2(qs.x, qs.y);
  const g = a.div(TAU).add(float(0.5).div(nS)).fract();
  const pointOn = maskClock(pq, g.mul(TAU).sub(PI));
  const tri = a.mul(nS).div(TAU).add(0.5).fract().sub(0.5).abs().mul(2);
  const redge = mix(float(2.7), float(1.1), tri);
  const sfill = step(rs, redge).mul(pointOn);
  const sline = stroke(rs.sub(redge).sub(0.6).abs(), 0.09).mul(pointOn);
  const score = step(rs, 0.38).mul(step(0.002, u)).mul(sX);
  add(mix(H, W, 0.25).mul(float(0.9).add(cul.mul(0.5)).add(kl.mul(0.4))), sfill);
  add(H.mul(0.8).add(W.mul(0.2)), sline);
  add(W.mul(1.5), score);
  // detail set A: a diadem of five sparks over the crown, centre first
  const set = pk(8, 2);
  for (let k = 0; k < 5; k++) {
    const ak = (k - 2) * 0.5, ord = Math.abs(k - 2) / 3;
    const sp = vec2(Math.sin(ak) * 5.2, Math.cos(ak) * 5.2);
    const q = qs.sub(sp);
    const on = is(set, 0).mul(maskBeads(io(0.58, 0.68, 0.945, 0.965), ord)).mul(step(0.01, u));
    const spark = step(q.x.abs().mul(q.y.abs()), 0.045).mul(step(q.length(), 1.0)).max(step(q.length(), 0.22));
    add(mix(H, W, 0.4).mul(float(0.8).add(c.kick.mul(0.4))), spark.mul(on));
  }

  // rim eyes (rhopalia): 7 a side round the bell's skin, opening centre-out, pupils turned to the star
  const nE = 7, Re = ROUT + 1.6;
  const ie = th.div(THMAX).mul(nE).floor().min(nE - 1);
  const thc = ie.add(0.5).mul(THMAX / nE);
  const ec = vec2(thc.sin(), thc.cos()).mul(Re);
  const pe = vec2(pb.x.abs(), pb.y);
  const de = pe.sub(ec).length();
  const eOn = maskBeads(io(0.5, 0.6, 0.945, 0.965), ie.div(nE));
  const look = ec.normalize().mul(-0.28);
  const blink = inv(step(0.92, c.real.mul(0.31).add(ie.mul(0.37)).fract()).mul(0.65));
  add(vec3(0.0), step(de, 0.95).mul(eOn));
  add(mix(B, W, 0.6), stroke(de.sub(0.7).abs(), 0.07).mul(eOn));
  add(H.mul(float(1).add(c.kick.mul(0.5))), step(pe.sub(ec).sub(look).length(), float(0.36).mul(blink)).mul(eOn));

  // nine tentacles: bead strings let down bead by bead, centre first; outer reel up first on the exit
  const qx = p.x.abs(), s = float(BY).sub(p.y);
  const prof = pk(1, 3);
  const sp = mix(0.95, 1.3, pk(7, 2));
  const wl = mix(0.4, 0.75, rn(2));
  const pupils = io(0.55, 0.65, 0.945, 0.965);
  const tdir = mix(float(-1), float(1), barber.step(0.05));            // the barber pole: beads' light climbs inward
  for (let j = 0; j < 5; j++) {
    const xj = j * 3.1;
    const L = float(18 - j * 1.5).mul(is(prof, 0)).add(float(12 + j * 1.4).mul(is(prof, 1))).add(float(j % 2 ? 12.5 : 17.5).mul(is(prof, 2)));
    const N = L.div(sp).floor();
    const n = s.div(sp).round().clamp(0, N);
    const sb = n.mul(sp);
    const k = n.div(N.max(1));
    const pt = smoothstep(0.16 + j * 0.035, 0.3 + j * 0.035, u).mul(inv(smoothstep(0.965 + (4 - j) * 0.003, 0.97 + (4 - j) * 0.003, u)));
    const ph = rn(16).mul(TAU).add(j * 2.3);
    const amp = j === 0 ? float(0) : float(0.22).add(cul.mul(1.0));
    const swayAt = (z) => z.div(L).clamp(0, 1).mul(amp).mul(z.mul(wl).sub(c.real.mul(1.7)).add(ph).sin());
    const d = vec2(qx.sub(xj).sub(swayAt(sb)), s.sub(sb)).length();
    const w = sb.mul(0.5).add(c.real.mul(2.4).mul(tdir)).add(ph).sin().mul(0.5).add(0.5);
    const rad = sp.mul(mix(float(0.42), float(0.2), k)).mul(cul.mul(0.35).mul(w).add(1));
    const shown = maskBeads(pt, k);
    const bead = step(d, rad).mul(shown);
    const eye = step(d, rad.mul(0.38)).mul(shown).mul(maskBeads(pupils, k));
    const lineD = qx.sub(xj).sub(swayAt(s)).abs();
    const thread = j === 0 ? maskDraw(smoothstep(0.0, 0.08, u).mul(tX), s.div(L)) : float(0);
    const line = stroke(lineD, 0.045).mul(step(0, s)).mul(step(s, L)).mul(maskDraw(pt, s.div(L)).max(thread));
    const nb = j === 0 ? nib(smoothstep(0.0, 0.08, u), s.div(L), 0.03).mul(step(lineD, 0.25)).mul(step(u, 0.09)) : float(0);
    const run = smoothstep(1.6, 0, s.sub(c.beat.fract().mul(L)).abs()).mul(step(0.001, c.kick));
    const blit = float(0.75).add(run.mul(0.8)).add(cul.mul(w).mul(0.7));
    add(B.mul(0.55), line);
    add(W.mul(1.3), nb);
    add(mix(j % 2 ? H2 : B, W, w.mul(cul).mul(0.6)).mul(blit), bead);
    add(vec3(0.0), step(d, rad.mul(0.55)).mul(shown).mul(maskBeads(pupils, k)));
    add(H.mul(1.1), eye.mul(step(d, rad.mul(0.34))));
  }
  // detail set B: two oral arms, frilled black ribbons drawn down between the tentacles
  for (let k = 0; k < 2; k++) {
    const sg = k ? -1 : 1;
    const La = 11, ss = s.sub(0.4);
    const cx = ss.mul(0.55).sub(c.real.mul(1.1)).add(k * 1.6).sin().mul(ss.div(La).clamp(0, 1).mul(1.3)).add(sg * 1.5);
    const wid = inv(ss.div(La).clamp(0, 1)).mul(0.55).add(0.15).add(ss.mul(3).add(c.real.mul(2)).sin().mul(0.12));
    const dx = p.x.sub(cx).abs();
    const on = is(set, 1).mul(maskDraw(io(0.58, 0.7, 0.945, 0.965), ss.div(La))).mul(step(0, ss)).mul(step(ss, La));
    add(vec3(0.0), step(dx, wid.add(0.12)).mul(on));
    add(mix(H, W, 0.3).mul(0.85).mul(step(ss.mul(1.4).sub(c.real.mul(0.8)).fract(), 0.5)), step(dx, wid).mul(on));
  }

  return cutout(col, cover);
}
