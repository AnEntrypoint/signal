// THE WORLD TURTLE (vision being): seen from above, mirrored, swimming up the frame. Its shell is seven hexagon
// scutes, each holding a different small mandala (eye, sun, wave, spiral, tree, star, moon); four flippers of bead
// rows paddle slowly; a head on an op-art striped neck. At the culmination the scutes shade as cubes that flip
// between popping out and caving in on the bar (tumbling blocks), the mandala light turning to black ink on them.
// ONE SCENE, FIVE LAYERS, one script (params.layer), each on its OWN motion:
//   "world" z -30  SCROLLS    the sea: long wave lines bending round the turtle (flow round a body), travelling
//                             ripples down them, an op-art swell near the shell, bubbles on the wake lines,
//                             two mirrored schools of two-stroke fish circling. Opaque black; it grows from the
//                             turtle outward as fingers combed along the stream lines.
//   "ring"  z -12  TURNS      the turtle calendar: 28 day-beads one way, 13 moon-scutes (hexagons) the other (additive)
//   "being" z   0  BREATHES   the turtle (cutout, occluding black body, neon on it)
//   "veil"  z +10  DRIFTS     hatchlings: little black turtles drifting up the sides
//   "fore"  z +22  UNDULATES  near bubbles riding a travelling swell up the sides
//   the SEA EELS are real 3D tubes winding in depth: scripts/vision-world-turtle-worm-geo.js / -worm-mat.js
// THE SCORE (u): 0 black shell grows from the centre, rim drawn from the head round both sides / .1 scute outlines one by
// one / .13 striped neck and head / .17 flippers bead row by row / .25 the sea combs outward / .35 op-art swell /
// .4 ring lines, .45 day beads, .5 moon scutes counter-turning / .5 mandalas draw round each scute, bubbles /
// .55 fish schools, eyes / .6 rim beads / .6 eels, .62 hatchlings, .66 near bubbles / .7 cube shading creeps in /
// .85 tumbling blocks flip on the bar, one eel dark / .93.. everything leaves last-in first-out.
// Seed channels 500..515: 0 hue family, 1 hot accent, 2 mandala order, 3 sea scroll sense, 4 ring sense, 5 bead count,
// 6 fish count, 7 eel count, 8 eel skin order, 9 illusion variant, 10 which eel dark, 11 wave spacing,
// 12 hatchling count, 13 fore drift sense, 14 paddle phase, 15 op-art swell width.
import { MeshBasicNodeMaterial, AdditiveBlending, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, mix, atan2, fwidth, select } from "builtin/tsl";
import { tripClock, visionShown, visionU, climb, maskDraw, maskBeads, maskIris, maskClock, nib, stripes } from "./lib/trip.js";

const TAU = 6.28318, PI = 3.14159;
const DEPTH = { world: 104, ring: 86, being: 74, veil: 64, fore: 52 };
const RI = 3.9;                                                     // scute inradius (being metres)
const SCUTE = [[0, 0], [7.8, 0], [-7.8, 0], [3.9, 6.755], [-3.9, 6.755], [3.9, -6.755], [-3.9, -6.755]];
const SY = -1;                                                      // shell centre y
const is = (v, i) => step(v.sub(i).abs(), 0.5);
const inv = (x) => float(1).sub(x);
const hexd = (q) => q.x.abs().max(q.x.abs().mul(0.5).add(q.y.abs().mul(0.866)));   // pointy-top hexagon, inradius metric

export function material(ctx) {
  const layer = ctx.params.layer ?? "being";
  const c = tripClock(ctx);
  const u = visionU(ctx, c);
  const io = (a, b, x, y) => smoothstep(a, b, u).mul(inv(smoothstep(x, y, u)));
  const rn = (n) => c.rnd(500 + n), pk = (n, k) => c.pick(500 + n, k);
  const sense = (n) => step(0.5, rn(n)).mul(2).sub(1);
  const fam = pk(0, 3), hot = pk(1, 3);
  const blue = vec3(0.05, 0.12, 1.0), violet = vec3(0.45, 0.05, 1.0), ice = vec3(0.45, 0.6, 1.0), W = vec3(1, 1, 1);
  const A = blue.mul(is(fam, 0)).add(violet.mul(is(fam, 1))).add(blue.mul(is(fam, 2)));
  const B = violet.mul(is(fam, 0)).add(blue.mul(is(fam, 1))).add(ice.mul(is(fam, 2)));
  const H = vec3(1.0, 0.05, 0.6).mul(is(hot, 0)).add(vec3(1.0, 0.85, 0.05).mul(is(hot, 1))).add(vec3(0.1, 1.0, 0.15).mul(is(hot, 2)));
  const P = positionGeometry.xy;
  const live = visionShown(ctx, c, 0);
  const kickOn = step(0.001, c.kick);
  const cul = io(0.84, 0.9, 0.93, 0.96).mul(climb(c).mul(0.4).add(0.6));
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  const cutout = (col, cover) => { m.colorNode = col; m.opacityNode = cover.mul(live); m.alphaTest = 0.5; return m; };

  // ------------------------------------------------------------------ WORLD: the sea (scrolls)
  if (layer === "world") {
    const aa = fwidth(P.x).mul(1.2).max(0.02);
    const stroke = (d, w) => inv(smoothstep(float(w), aa.add(w), d));
    const Rc = 24, r2 = P.dot(P).max(1), r = r2.sqrt();
    const psi = P.x.mul(inv(float(Rc * Rc).div(r2)));                // stream function round the shell
    const phi = P.y.mul(float(Rc * Rc).div(r2).add(1));              // and the potential along it
    const sp = rn(11).mul(2.5).add(4);
    const travel = phi.mul(0.11).add(c.real.mul(1.3).mul(sense(3)));
    const psw = psi.add(travel.sin().mul(smoothstep(Rc, Rc + 25, r)).mul(1.1));
    const out = step(Rc + 1, r);
    // coverage: the sea combs outward from the turtle, alternate stream lines reaching further
    const de = vec2(P.x.div(1.6), P.y).length();
    const grow = io(0.25, 0.45, 0.955, 0.995), Rg = grow.mul(150);
    const finger = stripes(psi.div(sp * 2), 1, 0.05).mul(22);
    const cover = step(de, Rg.add(finger)).mul(step(0.004, grow));
    const front = c.beat.fract().mul(130);
    const kl = smoothstep(6, 0, r.sub(front).abs()).mul(kickOn).mul(smoothstep(130, 60, front));
    const f = psw.div(sp).add(0.5).fract().sub(0.5).abs().mul(sp);
    const lines = stroke(f.div(fwidth(psw).max(0.02).mul(1.2).div(aa)), 0.22).mul(out);
    // op-art swell: the bands near the shell widen into black/white stripes
    const pOp = io(0.35, 0.5, 0.95, 0.97);
    const zone = smoothstep(rn(15).mul(30).add(55), Rc + 4, r).mul(pOp);
    const band = step(psw.div(sp).fract(), zone.mul(0.5)).mul(out);
    let col = mix(A, B, psw.div(sp).floor().mod(2)).mul(lines).mul(float(0.45).add(kl.mul(0.8)));
    col = col.add(mix(A, W, 0.35).mul(band).mul(0.55).mul(inv(lines)));
    // bubbles on the wake lines behind the shell, drifting down them
    const pB = io(0.5, 0.64, 0.945, 0.96);
    const li = psw.div(sp).add(0.5).floor(), ph2 = phi.add(c.real.mul(3).mul(sense(3)));
    const kc = ph2.div(9).floor();
    const h = li.mul(12.9898).add(kc.mul(78.233)).sin().mul(43758.5453).fract();
    const brad = h.mul(7).fract().mul(1.4).add(0.6);
    const bq = vec2(ph2.div(9).fract().sub(0.5).mul(9), psw.sub(li.mul(sp)));
    const bub = stroke(bq.length().sub(brad).abs(), 0.18).max(stroke(bq.sub(brad.mul(0.4)).length(), 0.2))
      .mul(step(0.62, h)).mul(smoothstep(-12, -24, P.y)).mul(maskBeads(pB, h.sub(0.62).div(0.38))).mul(out);
    col = mix(col, mix(B, W, 0.6).mul(float(0.9).add(kl)), bub);
    // fish: two mirrored schools of two-stroke glyphs circling in arcs
    const pF = io(0.55, 0.68, 0.94, 0.955);
    const ax = P.x.abs(), th = atan2(P.y, ax);
    const N = pk(6, 3).mul(3).add(8);
    let fish = float(0);
    [[62, 0.035, 1], [80, 0.024, -1]].forEach(([R, w, s], j) => {
      const thm = th.sub(c.real.mul(w * s)).mul(sense(13));
      const k = thm.div(TAU).mul(N).fract().sub(0.5), kIdx = thm.div(TAU).mul(N).floor();
      const xt = k.mul(TAU).div(N).mul(R).mul(s);
      const yr = vec2(ax.div(1.25), P.y).length().sub(R).sub(th.mul(3).add(c.real.mul(0.6)).sin().mul(3));
      const X = xt.div(3.4), Y = yr.div(3.4), fy = inv(X.mul(X)).mul(0.36);
      const d = Y.sub(fy).abs().min(Y.add(fy).abs()).mul(3.4);
      const g = stroke(d, 0.16).mul(step(-1, X)).mul(step(X, 1.45));
      const arc = smoothstep(1.25, 0.95, th.abs());
      const order = kIdx.mul(0.37).add(j * 0.5).fract();
      fish = fish.max(g.mul(arc).mul(maskBeads(pF, order)));
    });
    col = mix(col, mix(W, H, 0.3), fish);
    return cutout(col, cover);
  }

  // ------------------------------------------------------------------ RING: the turtle calendar (turns, soft)
  if (layer === "ring") {
    const p = P.mul(74 / 86).sub(vec2(0, SY));
    const aa = fwidth(p.x).mul(1.2).max(0.01);
    const stroke = (d, w) => inv(smoothstep(float(w), aa.add(w), d));
    const r = p.length(), a = atan2(p.x, p.y);
    const R1 = 26, R2 = 29.5;
    const pL = io(0.4, 0.47, 0.955, 0.97), pD = io(0.45, 0.55, 0.95, 0.965), pM = io(0.5, 0.6, 0.945, 0.96);
    const lit = float(0.55).add(cul.mul(0.6));
    const l = stroke(r.sub(R1).abs(), 0.09).add(stroke(r.sub(R2).abs(), 0.09)).mul(maskClock(pL, a.mul(sense(4))));
    // day beads, one way
    const nD = pk(5, 3).mul(4).add(24);
    const ad = a.add(c.real.mul(TAU / 64).mul(sense(4)));
    const kd = ad.div(TAU).mul(nD).add(0.5).floor();
    const ac = ad.sub(kd.mul(TAU).div(nD));
    const bd = vec2(ac.mul((R1 + R2) / 2), r.sub((R1 + R2) / 2)).length();
    const front = c.beat.fract().mul(40);
    const kl = smoothstep(3, 0, r.sub(front).abs()).mul(kickOn).mul(smoothstep(40, 30, front));
    const bead = stroke(bd, 0.55).mul(maskBeads(pD, kd.div(nD).fract()));
    // thirteen moon scutes, the other way
    const am = a.sub(c.real.mul(TAU / 44).mul(sense(4)));
    const km = am.div(TAU).mul(13).add(0.5).floor();
    const acm = am.sub(km.mul(TAU).div(13));
    const qm = vec2(acm.mul(33.5), r.sub(33.5));
    const hx = stroke(hexd(qm).sub(1.25).abs(), 0.08).add(stroke(qm.length(), 0.3));
    const moon = hx.mul(maskBeads(pM, km.div(13).fract()));
    const dash = stroke(r.sub(37).abs(), 0.06).mul(step(a.mul(40 / TAU).fract(), 0.5)).mul(pM);
    m.colorNode = A.mul(l).mul(lit).add(mix(B, H, step(kd.mod(7), 0.5)).mul(bead).mul(lit.add(kl.mul(0.8)))).add(mix(B, W, 0.5).mul(moon).mul(lit)).add(B.mul(dash).mul(0.3));
    m.opacityNode = live;
    m.transparent = true;
    m.blending = AdditiveBlending;
    m.depthWrite = false;
    return m;
  }

  // ------------------------------------------------------------------ VEIL: hatchlings drifting up the sides (drifts)
  if (layer === "veil") {
    const aa = fwidth(P.x).mul(1.2).max(0.01);
    const ax = P.x.abs(), pin = io(0.62, 0.8, 0.93, 0.95);
    const nH = pk(12, 3).add(3);
    let col = vec3(0), cover = float(0);
    for (let j = 0; j < 5; j++) {
      const sz = 1.7 + (j % 3) * 0.35;
      const yj = c.real.mul(0.016 * (1 + j * 0.15)).add(j * 0.29 + 0.1).fract().mul(96).sub(48);
      const xj = c.real.mul(0.3).add(j * 1.3).sin().mul(3).add(30 + j * 6.5);
      const q = vec2(ax.sub(xj), P.y.sub(yj)).div(sz);
      const fl = c.real.mul(2.2).add(j).sin().mul(0.25);
      const sh = vec2(q.x, q.y.div(1.25)).length().sub(1);
      const hd = q.sub(vec2(0, 1.6)).length().sub(0.45);
      const ff = vec2(q.x.abs().sub(1.1).div(0.8), q.y.sub(0.6).sub(fl).div(0.3)).length().sub(1).mul(0.3);
      const rf = vec2(q.x.abs().sub(0.8).div(0.45), q.y.add(1.0).div(0.25)).length().sub(1).mul(0.25);
      const body = sh.min(hd).min(ff).min(rf);
      const pj = pin.mul(2).sub(j * 0.2).clamp(0, 1);
      const there = step(float(j), nH.sub(0.5)).mul(maskIris(pj, q.length().div(2.2)));
      const aL = aa.div(sz);
      const inside = inv(smoothstep(float(0), aL, body)).mul(there);
      const rim = inv(smoothstep(float(0.06), aL.add(0.06), sh.abs())).add(inv(smoothstep(float(0.06), aL.add(0.06), hd.abs())));
      const dots = inv(smoothstep(float(0.14), aL.add(0.14), vec2(q.x, q.y.sub(0.5).mod(0.5).sub(0.25)).length())).mul(step(q.y.abs(), 0.8));
      const lit = mix(B, W, 0.35).mul(rim.min(1)).add(H.mul(dots)).mul(float(0.85).add(cul.mul(0.3)));
      col = mix(col, vec3(0.005, 0.005, 0.02).add(lit), inside); cover = cover.max(inside);
    }
    return cutout(col, cover);
  }

  // ------------------------------------------------------------------ FORE: near bubbles riding a swell (undulates)
  if (layer === "fore") {
    const aa = fwidth(P.x).mul(1.2).max(0.01);
    const ax = P.x.abs(), pin = io(0.66, 0.82, 0.93, 0.945);
    let col = vec3(0), cover = float(0);
    for (let j = 0; j < 6; j++) {
      const rad = 1.1 + (j % 3) * 0.6;
      const yj = c.real.mul(0.022 * (1 + j * 0.2)).add(j * 0.37).fract().mul(96).sub(48);
      const xj = yj.mul(0.09).sub(c.real.mul(0.8).mul(sense(13))).add(j * 1.7).sin().mul(5).add(44 + (j % 3) * 5);
      const q = vec2(ax.sub(xj), P.y.sub(yj)).div(rad);
      const pj = pin.mul(1.8).sub(j * 0.14).clamp(0, 1);
      const aL = aa.div(rad);
      const disc = inv(smoothstep(inv(aL), 1, q.length())).mul(maskIris(pj, q.length()));
      const ring = smoothstep(0.82, 0.9, q.length());
      const glint = inv(smoothstep(0.18, 0.18 + 0.05, q.sub(vec2(-0.35, 0.4)).length()));
      col = mix(col, mix(B, W, 0.5).mul(ring).add(W.mul(glint)).mul(float(0.8).add(cul.mul(0.3))), disc); cover = cover.max(disc);
    }
    return cutout(col, cover);
  }

  // ------------------------------------------------------------------ THE BEING: the turtle (breathes)
  const p = P.div(c.real.mul(TAU / 7).sin().mul(0.02).add(1));
  const aa = fwidth(p.x).mul(1.2).max(0.008);
  const stroke = (d, w) => inv(smoothstep(float(w), aa.add(w), d));
  const ax = p.x.abs(), q0 = p.sub(vec2(0, SY)), rr = q0.length();
  const front = c.beat.fract().mul(32);
  const kl = smoothstep(2, 0, rr.sub(front).abs()).mul(kickOn).mul(smoothstep(32, 18, front));
  let col = vec3(0), cover = float(0);
  const lay = (body, lit) => { col = mix(col, lit, body); cover = cover.max(body); };

  // flippers: two mirrored pairs paddling slowly, bead rows from the body outward
  const pFl = io(0.17, 0.3, 0.955, 0.97);
  const pad = c.real.mul(0.6).add(rn(14).mul(TAU)).sin();
  [[9.5, 6.5, 35, 12, 13, 2.6, 0], [7.5, -10.5, -50, 8, 8, 2.0, 0.08]].forEach(([sx, sy, a0, swing, L, Wd, dl]) => {
    const th = pad.mul(swing).add(a0).mul(PI / 180);
    const dx = th.cos(), dy = th.sin();
    const q = vec2(ax.sub(sx), p.y.sub(sy));
    const s = q.x.mul(dx).add(q.y.mul(dy)), t = q.y.mul(dx).sub(q.x.mul(dy));
    const x = s.div(L).clamp(0, 1);
    const w = x.mul(inv(x)).max(0).sqrt().mul(2 * Wd).mul(inv(x.mul(0.35)));
    const pr = pFl.mul(1.15).sub(dl).clamp(0, 1);
    const body = step(t.abs(), w).mul(step(0, s)).mul(step(s, L)).mul(maskDraw(pr, s.div(L)));
    const sc = s.div(1.5).fract().sub(0.5).mul(1.5), tc = t.div(1.25).add(0.5).fract().sub(0.5).mul(1.25);
    const row = s.div(1.5).floor();
    const bead = stroke(vec2(sc, tc).length(), 0.4).mul(step(t.abs(), w.sub(0.35))).mul(maskBeads(pr, s.div(L).add(0.05)));
    const rim = stroke(t.abs().sub(w).abs(), 0.1);
    const kb = smoothstep(2.5, 0, vec2(ax, p.y).sub(vec2(0, SY)).length().sub(front).abs()).mul(kickOn);
    lay(body, mix(A, H, is(row.mod(3), 0)).mul(bead).mul(float(0.9).add(kb.mul(0.8))).add(mix(A, W, 0.3).mul(rim).mul(0.8)));
  });
  // tail
  const tailB = step(ax, p.y.add(17.5).mul(0.4)).mul(step(-17.5, p.y)).mul(step(p.y, -13)).mul(step(0.01, pFl));
  lay(tailB, A.mul(stroke(ax.sub(p.y.add(17.5).mul(0.4)).abs(), 0.1)));
  // neck and head: striped neck drawn from the shell up, the head swaying a little
  const pN = io(0.13, 0.22, 0.97, 0.985);
  const hx = c.real.mul(0.45).sin().mul(0.8);
  const nk = p.y.sub(11).div(7.6);
  const nx = p.x.sub(hx.mul(nk.clamp(0, 1)));
  const neck = step(nx.abs(), inv(nk.mul(0.2)).mul(1.8)).mul(step(11, p.y)).mul(step(p.y, 16.5)).mul(maskDraw(pN, nk));
  const nst = stripes(p.y.sub(c.real.mul(0.4)), 0.9, 0.06);
  lay(neck, mix(vec3(0.02), W.mul(0.85), nst).add(B.mul(stroke(nx.abs().sub(inv(nk.mul(0.2)).mul(1.8)).abs(), 0.1))));
  const hq = vec2(p.x.sub(hx).div(2.8), p.y.sub(18.6).div(3.4));
  const hd = hq.length();
  const head = step(hd, 1).mul(maskIris(smoothstep(0.75, 1, pN), hd));
  const pE = io(0.55, 0.62, 0.955, 0.97);
  const eye = stroke(vec2(p.x.sub(hx).abs().sub(1.3), p.y.sub(19.4)).length(), 0.42).mul(maskIris(pE, float(0.5)));
  const beak = stroke(vec2(p.x.sub(hx), p.y.sub(21.2)).length(), 0.25).mul(pE);
  lay(head, B.mul(stroke(hd.sub(1).abs().mul(3), 0.11)).add(mix(H, W, 0.3).mul(eye.max(beak)).mul(float(0.9).add(cul.mul(0.5)))));
  // the shell: a black disc grows from the centre, the rim draws from the head round both sides
  const pBody = io(0, 0.07, 0.985, 1.0), pRim = io(0.03, 0.12, 0.98, 0.995);
  const sd = vec2(q0.x.div(13.2), q0.y.div(13.8)).length();
  const shell = step(sd, 1.03).mul(maskIris(pBody, sd));
  const ua = atan2(ax, q0.y).div(PI);
  const rimL = stroke(sd.sub(1).abs().mul(13.5), 0.16).mul(maskDraw(pRim, ua));
  const rimN = nib(pRim, ua, 0.03).mul(stroke(sd.sub(1).abs().mul(13.5), 0.5)).mul(step(pRim, 0.99)).mul(step(0.01, pRim));
  // marginal beads round the rim
  const pMg = io(0.6, 0.7, 0.95, 0.965);
  const nMg = 24, am = ua.mul(nMg / 2);
  const mg = stroke(vec2(am.fract().sub(0.5).mul(PI * 13.5 * 2 / nMg), sd.sub(0.93).mul(13.5)).length(), 0.32).mul(maskBeads(pMg, ua));
  // scutes: nearest of seven hexagons
  let best = float(99), bq = vec2(0, 0), bid = float(0);
  SCUTE.forEach(([x, y], k) => {
    const q = q0.sub(vec2(x, y)), d = hexd(q), sel = d.lessThan(best);
    bq = select(sel, q, bq); bid = select(sel, float(k), bid); best = best.min(d);
  });
  const qu = bq.div(RI), ru = qu.length(), au = atan2(qu.y, qu.x);
  const aL = aa.div(RI);
  const sk = (d, w) => inv(smoothstep(float(w), aL.add(w), d));
  const pS = io(0.1, 0.2, 0.965, 0.975);
  const pSk = pS.mul(1.6).sub(bid.mul(0.1)).clamp(0, 1);
  const outline = sk(hexd(qu).sub(0.9).abs(), 0.05).mul(maskClock(pSk, au)).mul(step(hexd(qu), 1.02));
  // the seven mandalas, one per scute (seeded order)
  const kind = bid.add(pk(2, 7)).mod(7);
  const qy = qu.y, qx = qu.x;
  const lens = vec2(qx, qy.add(0.75)).length().sub(1.15).max(vec2(qx, qy.sub(0.75)).length().sub(1.15));
  const mEye = sk(lens.abs(), 0.05).max(sk(ru.sub(0.3).abs(), 0.05)).max(sk(ru, 0.12));
  const fr8 = au.div(TAU).mul(8).fract().sub(0.5).abs();
  const mSun = sk(ru.sub(0.33).abs(), 0.05).max(sk(fr8.mul(ru).mul(TAU / 8), 0.05).mul(step(0.48, ru)).mul(step(ru, 0.74)));
  let wv = float(0);
  [-0.35, 0, 0.35].forEach((k) => { wv = wv.max(sk(qy.sub(k).sub(qx.mul(7).add(c.real.mul(1.5)).sin().mul(0.09)).abs(), 0.045)); });
  const mWave = wv.mul(step(qx.abs(), 0.62));
  const spq = ru.sub(au.div(TAU).add(0.5).mul(0.2));
  const mSpiral = sk(spq.div(0.2).fract().sub(0.5).abs().mul(0.2), 0.04).mul(step(ru, 0.72));
  const chev = qy.add(0.55).sub(qx.abs().mul(0.7)).div(0.3).fract().sub(0.5).abs().mul(0.3);
  const mTree = sk(qx.abs(), 0.05).mul(step(qy.abs(), 0.65)).max(sk(chev, 0.04).mul(step(qx.abs(), 0.45)).mul(step(qy.add(0.3).abs(), 0.6)));
  const fold = au.div(TAU).mul(5).add(0.25).fract().sub(0.5).abs();
  const mStar = sk(ru.sub(float(0.75).sub(fold.mul(0.85))).abs().mul(0.7), 0.04);
  const cr = ru.sub(0.6).max(qu.sub(vec2(0.28, 0.12)).length().sub(0.5).negate());
  const mMoon = sk(cr.abs(), 0.05).max(inv(step(0, cr)).mul(0.35));
  const mand = [mEye, mSun, mWave, mSpiral, mTree, mStar, mMoon].reduce((acc, v, i) => acc.add(v.mul(is(kind, i))), float(0));
  const pMd = io(0.5, 0.66, 0.94, 0.955);
  const mShow = mand.mul(maskClock(pMd.mul(1.6).sub(bid.mul(0.09)).clamp(0, 1), au.add(PI / 2))).mul(step(hexd(qu), 0.85));
  // tumbling blocks: each scute a cube, popping out / caving in on the bar
  const variant = pk(9, 3);
  const delay = is(variant, 1).mul(step(0.5, bid)).add(is(variant, 2).mul(bid.div(7)));
  const bar = select(c.live.greaterThan(0.5), c.bar, c.real.div(3));
  const flip = step(0.5, bar.add(delay).div(2).fract());
  const fo = au.div(TAU).add(1 - 30 / 360).fract().mul(3), fi = au.div(TAU).add(1 - 90 / 360).fract().mul(3);
  const fsel = mix(fo, fi, flip), face = fsel.floor();
  const lumO = is(face, 0).add(is(face, 1).mul(0.5)).add(is(face, 2).mul(0.18));
  const lumI = is(face, 0).mul(0.5).add(is(face, 1)).add(is(face, 2).mul(0.18));
  const lum = mix(lumO, lumI, flip);
  const fe = fsel.fract(), edgeY = sk(fe.min(inv(fe)).mul(TAU / 3).mul(ru), 0.035).mul(step(hexd(qu), 0.9));
  const shade = io(0.7, 0.86, 0.93, 0.945).mul(cul.mul(0.75).add(0.25)).mul(step(hexd(qu), 0.9));
  const faceCol = mix(A, mix(B, W, 0.55), lum.mul(lum)).mul(lum).mul(shade).mul(1.1);
  const ink = mix(mix(W, H, is(kind, 0).mul(0.6)).mul(0.95), vec3(0), cul);
  let sc = faceCol.add(mix(A, W, 0.4).mul(edgeY).mul(shade));
  sc = mix(sc, ink, mShow);
  sc = sc.add(mix(B, W, 0.3).mul(outline).mul(float(0.8).add(kl.mul(1.2))));
  sc = mix(sc, mix(B, W, 0.5), rimL).add(W.mul(rimN)).add(mix(H, W, 0.25).mul(mg));
  lay(shell, sc);
  return cutout(col, cover);
}
