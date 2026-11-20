// THE STAR MEDUSA ("star-jelly"): a bell of 5 op-art striped arcs on a black dome, a star in its crown, 9 bead-string
// tentacles. One script, five canvases (params.layer): world z-30 halftone sea, ring z-12 line star + bead rows
// (additive), being z0, veil z+10 bubbles, fore z+22 sparks. Great tentacles: vision-star-jelly-worm-*.js.
// SCORE (u): 0 the sea's first halftone pulse glimmers alone; .10 crown bead, thread, star; .20 arcs; .26 tentacles;
// .45 ring; .58 eyes; .62 details; .64 bubbles; .70 sparks; .74-.85 culmination; .80-1 exit, fore first, sea last.
// SYMBOL MASKS: halftone pulses. Seed 360+k: 19 entrance variant, 35 exit variant (screen dots / polar beads / sweep).
import { MeshBasicNodeMaterial, AdditiveBlending, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, mix, atan2, fwidth } from "builtin/tsl";
import { tripClock, visionShown, visionU, climb, maskClock, maskIris, maskBeads, maskDraw, nib, inv, is, sgn, ioU, strokeAA, famPick, NEON } from "./lib/trip.js";

const TAU = 6.28318, PI = 3.14159;
const S = 1.6, BY = 1.5, SY = 2.6;   // drawing scale, bell rim line, crown star above it
const R0 = 5.4, DR = 2.35, HW = 0.72, THMAX = 1.7, ROUT = R0 + 4 * DR + HW;
const { BLU, VIO, PNK, ORA, YEL, GRN, W } = NEON;
const FAMS = [[BLU, VIO, YEL, PNK], [VIO, PNK, W, GRN], [PNK, ORA, YEL, BLU], [GRN, BLU, W, ORA]];

export function material(ctx) {
  const layer = ctx.params.layer ?? "being", low = ctx.quality === "low";
  const c = tripClock(ctx);
  const hold = ctx.param("hold", -1), held = step(0, hold);   // bench: hold >= 0 pins the slot's u
  const u = mix(visionU(ctx, c), hold.max(0), held);
  const live = mix(visionShown(ctx, c, 0), c.on, held);
  const rn = (k) => c.rnd(360 + k), pk = (k, m) => c.pick(360 + k, m);
  const io = ioU(u);
  const fam = pk(0, 4);
  const A = famPick(FAMS, fam, 0), B = famPick(FAMS, fam, 1), H = famPick(FAMS, fam, 2), H2 = famPick(FAMS, fam, 3);
  const cul = smoothstep(0.74, 0.78, u).mul(climb(c).mul(0.6).add(0.4)).mul(inv(smoothstep(0.82, 0.85, u)));
  const ve = pk(19, 3), vx = pk(35, 3);
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  m.fog = false;
  const cutout = (col, cover) => { m.colorNode = col; m.opacityNode = cover.mul(live); m.alphaTest = 0.5; m.transparent = false; m.depthWrite = true; return m; };

  if (layer === "world") {
    // THE SEA, a halftone screen: dots swell out of the dark until they merge into black water that keeps pulsing
    const p = positionGeometry.xy, t = c.real, pc = p.sub(vec2(0, (BY + SY) * S));
    const r = vec2(pc.x.div(1.55), pc.y).length(), oR = r.div(118).clamp(0, 1), bandF = r.div(14).fract();
    const CELL = 3.4, d = vec2(p.x.add(p.y), p.x.sub(p.y)).mul(0.7071 / CELL).fract().sub(0.5).length().mul(CELL);
    const colH = p.x.div(9).floor().mul(12.9898).sin().mul(43758.5453).fract();
    // entrance: pulse from the crown / dot strings let down from the surface / ring bands filling
    const oE = oR.mul(is(ve, 0)).add(p.y.negate().add(40).div(110).clamp(0, 1).mul(0.7).add(colH.mul(0.3)).mul(is(ve, 1))).add(oR.mul(0.6).add(bandF.mul(0.4)).mul(is(ve, 2)));
    const aIn = smoothstep(-0.02, 0.15, u).mul(0.16).add(smoothstep(0.15, 0.42, u).mul(0.84));
    const rin = aIn.mul(2).sub(oE).mul(2.2).clamp(0, 1);
    // exit, the slot's last half second: edge first / centre first / band by band, dots thinning, never grey
    const oX = inv(oR).mul(is(vx, 0)).add(oR.mul(is(vx, 1))).add(bandF.mul(is(vx, 2)));
    const rex = inv(smoothstep(0.99, 1, u).mul(1.36).sub(oX.mul(0.6)).clamp(0, 0.9));
    const fall = inv(smoothstep(0.8, 1, vec2(p.x.div(160), p.y.div(90)).length()));   // no quad edge: dots shrink to nothing
    const am = rin.mul(rex).mul(fall), cover = step(d, am.mul(CELL * 0.75)).mul(step(0.004, am));
    const mg = smoothstep(0.8, 0.95, am), front = inv(smoothstep(0.8, 0.95, rin.mul(rex)));
    const wv = r.mul(mix(0.16, 0.3, rn(9))).sub(t.mul(1.6).mul(sgn(rn(36)))).sin().mul(0.5).add(0.5), w2 = wv.mul(wv);
    let col = mix(A, B, smoothstep(0.42, 0.58, wv)).mul(w2.mul(0.3).add(0.14)).mul(smoothstep(0.86, 0.96, u).mul(0.9).add(1)).mul(step(d, w2.mul(0.26).add(0.06).mul(CELL)));
    // the surface overhead: a caustic line-net, foreshortened toward its horizon, drawn from the centre outward
    const yy = p.y.sub(30), deep = yy.add(6).max(0.5), cs = mix(0.8, 1.3, rn(9));
    const X = p.x.div(deep).mul(14).mul(cs), Y = float(260).div(deep).mul(cs);
    const f = X.mul(0.35).add(Y.mul(0.5).add(t.mul(0.4)).sin().mul(1.4)).add(t.mul(0.2)).sin()
      .add(Y.mul(0.42).add(X.mul(0.3).sub(t.mul(0.33)).sin().mul(1.4)).sin());
    const net = smoothstep(fwidth(f).mul(1.3).max(0.02).add(0.06), 0.0, f.abs()).mul(smoothstep(0, 8, yy)).mul(maskDraw(smoothstep(0.3, 0.44, u), p.x.abs().div(150)));
    col = col.add(mix(A, W, 0.35).mul(net).mul(float(0.38).add(c.kick.mul(0.12))));
    // plankton beads rising in slow helices, column by column, centre first
    const qx = p.x.abs();
    for (let i = 0; i < (low ? 3 : 5); i++) {
      const xc = 26 + i * 20, sp = 4.2, spd = 1.2 + i * 0.23;
      const yb0 = p.y.add(t.mul(-spd)).div(sp).round(), ph = yb0.mul(0.62).add(i * 1.9);
      const by = yb0.mul(sp).add(t.mul(spd)), zf = ph.cos().mul(0.5).add(0.5);
      const dd = vec2(qx.sub(ph.sin().mul(3.2 - i * 0.3).add(xc)), p.y.sub(by)).length();
      const dot = step(dd, zf.mul(0.45).add(0.35)).mul(smoothstep(0.44 + i * 0.03, 0.5 + i * 0.03, u)).mul(step(by, 40));
      col = col.add(mix(B, i % 3 === 2 ? H2 : H, i % 2).mul(zf.mul(0.45).add(0.18)).mul(dot));
    }
    col = col.mul(mg).mul(inv(front)).add(mix(A, W, 0.3).mul(float(0.6).add(c.kick.mul(0.25))).mul(front));
    return cutout(col, cover);
  }

  if (layer === "ring") {
    // far: the 8-point line star, two bead rows counter-rotating, additive and faint
    const p = positionGeometry.xy, rr = p.length(), aa = fwidth(p.x).mul(1.2).max(0.02);
    const sense = sgn(rn(5));
    const rot = c.real.div(mix(70, 120, rn(5).mul(2).fract())).mul(sense).mul(TAU);
    const mm = pk(6, 2).add(2), R = 34, h = mm.mul(PI / 8).cos().mul(R), half = mm.mul(PI / 8).sin().mul(R);
    const blur = aa.mul(3).add(0.05);
    let line = float(0), tips = float(0);
    for (let k = 0; k < 8; k++) {
      const a = rot.add(k * TAU / 8), n = vec2(a.cos(), a.sin()), tt = vec2(a.sin().negate(), a.cos());
      line = line.max(smoothstep(blur.add(0.08), 0.0, p.dot(n).sub(h).abs()).mul(smoothstep(half.add(0.3), half, p.dot(tt).abs())));
      const va = a.add(mm.mul(PI / 8));
      tips = tips.max(inv(smoothstep(0.4, 1.1, p.sub(vec2(va.cos(), va.sin()).mul(R)).length())));
    }
    const lit = float(0.05).add(cul.mul(0.05)).add(c.kick.mul(0.03));
    let col = mix(A, W, 0.2).mul(line).mul(lit).add(mix(B, W, 0.5).mul(tips).mul(lit.add(0.15))).mul(maskClock(io(0.45, 0.55, 0.87, 0.9), atan2(p.x, p.y)));
    const nD = pk(6, 3).mul(12).add(36);
    for (let r = 0; r < (low ? 1 : 2); r++) {
      const Rr = 41 + r * 5.5, N = r ? nD.add(12) : nD;
      const cell = atan2(p.x, p.y).add(c.real.mul(sense).mul(r ? -1 : 1).mul(TAU / (r ? 64 : 90))).div(TAU).mul(N);
      const d = vec2(cell.fract().sub(0.5).mul(TAU * Rr).div(N), rr.sub(Rr)).length();
      const dot = inv(smoothstep(0.45, 0.75, d)).mul(maskBeads(io(0.5 + r * 0.04, 0.6 + r * 0.04, 0.875 - r * 0.005, 0.9), cell.floor().div(N).fract()));
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
    // near: black-bodied bubbles rising and swaying, each forming from a point, popping at the end
    const p = positionGeometry.xy, qx = p.x.abs(), aa = fwidth(p.x).mul(1.2).max(0.02);
    const sense = sgn(rn(15));
    let col = vec3(0), cover = float(0);
    for (let i = 0; i < (low ? 4 : 6); i++) {
      const xi = 24 + i * 7.5 + (i % 2) * 3, ri = 1.6 + ((i * 7) % 5) * 0.65;
      const y = c.real.mul(1.4 + i * 0.27).div(96).add(rn(40 + i)).fract().mul(96).sub(48);
      const x = c.real.mul(0.35 + i * 0.06).add(i * 1.3).sin().mul(2.2).mul(sense).add(xi);
      const g = io(0.64 + i * 0.015, 0.67 + i * 0.015, 0.825 + i * 0.005, 0.845 + i * 0.005);
      const rad = float(ri).mul(g), dv = vec2(qx.sub(x), p.y.sub(y)), d = dv.length();
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
    // nearest: star-sparks and crescent glyphs falling and tumbling at the corners, black bodies with neon edges
    const p = positionGeometry.xy, qx = p.x.abs(), aa = fwidth(p.x).mul(1.2).max(0.02);
    let col = vec3(0), cover = float(0);
    for (let i = 0; i < (low ? 2 : 4); i++) {
      const xi = 36 + i * 6.5, sz = 1.4 + (i % 2) * 0.9;
      const y = c.real.mul(0.9 + i * 0.31).negate().div(84).add(rn(45 + i)).fract().mul(84).sub(42);
      const x = c.real.mul(0.25 + i * 0.05).add(i * 2.1).sin().mul(3).add(xi);
      const g = io(0.7 + i * 0.015, 0.73 + i * 0.015, 0.8 + i * 0.006, 0.815 + i * 0.006);
      const q = vec2(qx.sub(x), p.y.sub(y)), rq = q.length();
      const a = atan2(q.x, q.y).add(c.real.mul(0.6 + i * 0.2).mul(i % 2 ? -1 : 1));
      let body, edge;
      if (i % 2 === 0) { const e = mix(0.3, 1, a.mul(2).cos().abs().max(0.0001).pow(6)).mul(sz).mul(g); body = step(rq, e); edge = smoothstep(aa.add(0.12), 0, rq.sub(e).abs()); }
      else { const s2 = float(sz * 1.2).mul(g), off = vec2(a.sin().mul(rq).add(s2.mul(0.45)), a.cos().mul(rq)).length();
        body = step(rq, s2).mul(step(s2.mul(0.8), off)); edge = smoothstep(aa.add(0.1), 0, rq.sub(s2).abs()); }
      body = body.mul(step(0.02, g));
      const lc = (i % 2 ? H : mix(B, W, 0.4)).mul(float(0.85).add(cul.mul(0.3)));
      col = col.mul(inv(body)).add(lc.mul(edge).mul(body));
      cover = cover.max(body);
    }
    return cutout(col, cover);
  }

  // THE BEING (drawing units; the canvas is S times larger)
  const p = positionGeometry.xy.div(S);
  const aa = fwidth(p.x).mul(1.2).max(0.01), stroke = strokeAA(aa);
  let col = vec3(0), cover = float(0);
  const add = (colour, mask) => { col = col.mul(inv(mask)).add(colour.mul(mask)); cover = cover.max(mask); };
  const tX = inv(smoothstep(0.92, 0.94, u)), bX = inv(smoothstep(0.93, 0.96, u)), sX = inv(smoothstep(0.955, 0.975, u));
  const illus = pk(10, 2);                                              // 0 barber pole, 1 spoke lock
  const breath = c.real.mul(TAU).div(mix(4.5, 6.5, rn(17))).sin().mul(cul.mul(0.05).add(0.022));
  const pb = vec2(p.x, p.y.sub(BY)).div(breath.add(1));
  const qs = pb.sub(vec2(0, SY)), rs = qs.length();
  const front = c.beat.fract().mul(34);
  const kl = inv(smoothstep(0, 2.4, rs.sub(front).abs())).mul(step(0.001, c.kick)).mul(inv(smoothstep(16, 34, front)));
  const rb = pb.length(), th = atan2(pb.x, pb.y).abs();

  // HALFTONE MASKS for the bell: screen dots swelling out from the crown (0), polar beads swelling down the arcs (1),
  // or the plain sweep down from the crown (2); entrance and exit roll their own
  const CB = 0.55, d1 = vec2(pb.x.add(pb.y), pb.x.sub(pb.y)).mul(0.7071 / CB).fract().sub(0.5).length().mul(CB);
  const d2 = vec2(th.mul(rb.max(1)).div(0.8).fract().sub(0.5), rb.div(0.8).fract().sub(0.5)).length().mul(0.8);
  const oA = th.div(THMAX).clamp(0, 1), oB = rs.div(ROUT + 4).clamp(0, 1);
  const mk = (v) => { const pol = is(v, 1), dd = mix(d1, d2, pol), oo = mix(oB, oA, pol), cr = mix(float(CB * 0.75), float(0.62), pol), sw = is(v, 2);
    return (amt) => mix(step(dd, amt.mul(2).sub(oo).mul(2.2).clamp(0, 1).mul(cr)), step(th, amt.mul(THMAX)), sw).mul(step(0.004, amt)); };
  const mIn = mk(ve), mOut = mk(vx);

  // the dark dome, filling behind the arcs from the crown outward
  const fillP = smoothstep(0.2, 0.42, u).mul(bX);
  add(vec3(0.0, 0.0, 0.006), step(rb, ROUT + 0.2).mul(step(th, THMAX)).mul(maskIris(fillP, rs.div(ROUT + 4))));

  // the bell: 5 striped arcs, each arriving through the entrance mask in turn (outer leaves first, through the exit mask)
  const spd = mix(0.15, 0.4, rn(4)), lockT = cul.mul(illus), barber = cul.mul(inv(illus));
  for (let i = 0; i < 5; i++) {
    const Ri = R0 + i * DR;
    const here = mIn(smoothstep(0.2 + i * 0.035, 0.27 + i * 0.035, u)).mul(mOut(inv(smoothstep(0.91 + (4 - i) * 0.006, 0.93 + (4 - i) * 0.006, u)))).mul(step(th, THMAX));
    const inBand = step(rb.sub(Ri).abs(), HW).mul(here);
    const coord = mix(th.mul(Ri).div(0.9).add(c.real.mul(spd).mul(i % 2 ? -1 : 1)).add(rb.sub(Ri).mul(barber.mul(1.4))), th.mul(24 / PI), lockT);
    const wave = c.real.mul(-2.6).add(i * 1.25).sin().mul(0.5).add(0.5).mul(barber);  // light runs outward across the arcs
    const lit = float(0.7).add(kl.mul(0.7)).add(cul.mul(0.3)).add(wave.mul(0.6));
    add([A, W.mul(0.85), H2, W.mul(0.85), B][i].mul(lit).mul(step(coord.fract(), 0.5)), inBand);
    add(mix(A, W, 0.5).mul(0.9), stroke(rb.sub(Ri + HW).abs(), 0.05).mul(inBand.max(step(rb.sub(Ri + HW).abs(), 0.2).mul(here))));
  }
  add(mix(A, W, 0.5).mul(0.8), stroke(rb.sub(ROUT + 0.45).abs(), 0.06).mul(step(th, float(THMAX).mul(fillP))));

  // the crown star, point by point, round its core bead (the being's first mark)
  const kp = pk(3, 3), nS = float(5).add(is(kp, 1)).add(is(kp, 2).mul(3));
  const a = atan2(qs.x, qs.y);
  const pointOn = maskClock(smoothstep(0.15, 0.22, u).mul(sX).mul(nS).add(0.001).floor().div(nS), a.div(TAU).add(float(0.5).div(nS)).fract().mul(TAU).sub(PI));
  const redge = mix(float(2.7), float(1.1), a.mul(nS).div(TAU).add(0.5).fract().sub(0.5).abs().mul(2));
  add(mix(H, W, 0.25).mul(float(0.9).add(cul.mul(0.5)).add(kl.mul(0.4))), step(rs, redge).mul(pointOn));
  add(H.mul(0.8).add(W.mul(0.2)), stroke(rs.sub(redge).sub(0.6).abs(), 0.09).mul(pointOn));
  add(W.mul(1.5), step(rs, smoothstep(0.1, 0.13, u).mul(sX).mul(0.38)).mul(step(0.1, u)));
  const set = pk(8, 2), dIO = io(0.62, 0.72, 0.84, 0.87);
  // detail set A: a diadem of five sparks over the crown, centre first
  for (let k = 0; k < 5; k++) {
    const ak = (k - 2) * 0.5, q = qs.sub(vec2(Math.sin(ak) * 5.2, Math.cos(ak) * 5.2));
    const spark = step(q.x.abs().mul(q.y.abs()), 0.045).mul(step(q.length(), 1.0)).max(step(q.length(), 0.22));
    add(mix(H, W, 0.4).mul(float(0.8).add(c.kick.mul(0.4))), spark.mul(is(set, 0)).mul(maskBeads(dIO, Math.abs(k - 2) / 3)).mul(step(0.01, u)));
  }

  // rim eyes: 7 a side round the bell's skin, opening centre-out, pupils turned to the star
  const nE = 7, Re = ROUT + 1.6;
  const ie = th.div(THMAX).mul(nE).floor().min(nE - 1), thc = ie.add(0.5).mul(THMAX / nE);
  const ec = vec2(thc.sin(), thc.cos()).mul(Re), pe = vec2(pb.x.abs(), pb.y), de = pe.sub(ec).length();
  const eOn = maskBeads(io(0.58, 0.66, 0.84, 0.87), ie.div(nE));
  const blink = inv(step(0.92, c.real.mul(0.31).add(ie.mul(0.37)).fract()).mul(0.65));
  add(vec3(0.0), step(de, 0.95).mul(eOn));
  add(mix(B, W, 0.6), stroke(de.sub(0.7).abs(), 0.07).mul(eOn));
  add(H.mul(float(1).add(c.kick.mul(0.5))), step(pe.sub(ec).add(ec.div(Re).mul(0.28)).length(), float(0.36).mul(blink)).mul(eOn));

  // nine tentacles: bead strings let down bead by bead, centre first; outer reel up first on the exit
  const qx = p.x.abs(), s = float(BY).sub(p.y);
  const prof = pk(1, 3), sp = mix(0.95, 1.3, pk(7, 2)), wl = mix(0.4, 0.75, rn(2));
  const pupils = io(0.62, 0.7, 0.84, 0.87);
  const tdir = mix(float(-1), float(1), barber.step(0.05));            // the barber pole: beads' light climbs inward
  const thrP = smoothstep(0.12, 0.19, u);
  for (let j = 0; j < 5; j++) {
    const xj = j * 3.1;
    const L = float(18 - j * 1.5).mul(is(prof, 0)).add(float(12 + j * 1.4).mul(is(prof, 1))).add(float(j % 2 ? 12.5 : 17.5).mul(is(prof, 2)));
    const N = L.div(sp).floor(), n = s.div(sp).round().clamp(0, N), sb = n.mul(sp), k = n.div(N.max(1));
    const pt = smoothstep(0.26 + j * 0.035, 0.38 + j * 0.035, u).mul(inv(smoothstep(0.88 + (4 - j) * 0.006, 0.9 + (4 - j) * 0.006, u)));
    const ph = rn(16).mul(TAU).add(j * 2.3);
    const amp = j === 0 ? float(0) : float(0.22).add(cul.mul(1.0));
    const swayAt = (z) => z.div(L).clamp(0, 1).mul(amp).mul(z.mul(wl).sub(c.real.mul(1.7)).add(ph).sin());
    const d = vec2(qx.sub(xj).sub(swayAt(sb)), s.sub(sb)).length();
    const w = sb.mul(0.5).add(c.real.mul(2.4).mul(tdir)).add(ph).sin().mul(0.5).add(0.5);
    const rad = sp.mul(mix(float(0.42), float(0.2), k)).mul(cul.mul(0.35).mul(w).add(1));
    const shown = maskBeads(pt, k), lineD = qx.sub(xj).sub(swayAt(s)).abs();
    const thread = j === 0 ? maskDraw(thrP.mul(tX), s.div(L)).mul(step(0.12, u)) : float(0);
    add(B.mul(0.55), stroke(lineD, 0.045).mul(step(0, s)).mul(step(s, L)).mul(maskDraw(pt, s.div(L)).max(thread)));
    if (j === 0) add(W.mul(1.3), nib(thrP, s.div(L), 0.03).mul(step(lineD, 0.25)).mul(step(0.12, u)).mul(step(u, 0.2)));
    const run = inv(smoothstep(0, 1.6, s.sub(c.beat.fract().mul(L)).abs())).mul(step(0.001, c.kick));
    add(mix(j % 2 ? H2 : B, W, w.mul(cul).mul(0.6)).mul(float(0.75).add(run.mul(0.8)).add(cul.mul(w).mul(0.7))), step(d, rad).mul(shown));
    if (!low) {
      const pu = shown.mul(maskBeads(pupils, k));
      add(vec3(0.0), step(d, rad.mul(0.55)).mul(pu));
      add(H.mul(1.1), step(d, rad.mul(0.34)).mul(pu));
    }
  }
  // detail set B: two oral arms, frilled black ribbons drawn down between the tentacles
  for (let k = 0; k < 2; k++) {
    const La = 11, ss = s.sub(0.4), sl = ss.div(La).clamp(0, 1);
    const cx = ss.mul(0.55).sub(c.real.mul(1.1)).add(k * 1.6).sin().mul(sl.mul(1.3)).add(k ? -1.5 : 1.5);
    const wid = inv(sl).mul(0.55).add(0.15).add(ss.mul(3).add(c.real.mul(2)).sin().mul(0.12));
    const dx = p.x.sub(cx).abs();
    const on = is(set, 1).mul(maskDraw(dIO, ss.div(La))).mul(step(0, ss)).mul(step(ss, La));
    add(vec3(0.0), step(dx, wid.add(0.12)).mul(on));
    add(mix(H, W, 0.3).mul(0.85).mul(step(ss.mul(1.4).sub(c.real.mul(0.8)).fract(), 0.5)), step(dx, wid).mul(on));
  }
  return cutout(col, cover);
}
