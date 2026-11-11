// THE SUN FATHER: a celestial scene of five canvases at five depths (+ 3D flare tongues, vision-sun-father-worm-*).
//   "world" (z -30) scrolls : dune heat arcs below a horizon, orbit ellipses with planets above, glyph sundials
//   "ring"  (z -12) turns   : the outer ray crown (peripheral-drift wedges) + a far bead ring, against the being
//   "being" (z 0)   breathes: the face: disc, eye, rays, flame-drop crown, the inner ray crown, on a black body
//   "veil"  (z +10) drifts  : hanging bead strands, black bodies with neon rims, a dithered shadow behind each
//   "fore"  (z +22) rises   : small sun glyphs floating up the sides and corners
// THE SCORE (u = 0..1 of the slot): 0-.08 first stroke, a hairline circle from the top | .03-.2 the eclipse slides
// off | .12-.3 rays, a pair per kick | .16-.26 the lids part | .24-.36 the flame drops | .25-.45 the world grows
// out behind a rayed front | .3-.55 orbits draw | .38-.5 inner crown | .45-.6 outer crown + bead ring |
// .5-.7 rays reach the sundials one by one, planets rise | .6-.8 veil and fore (and the worms) | .85-.93 the two
// crowns swing against each other and breathe in counter-phase | .93-1 exit, last in first out.
// The kick (gated) is a ring of light leaving the eye. Seeded: channels 200-217.
import { MeshBasicNodeMaterial, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, mix, step, atan2, length, fwidth, select } from "builtin/tsl";
import { tripClock, visionShown, visionU, climb, maskEclipse, maskBeads, maskLid, maskDraw, nib, BPS, SCORE } from "./lib/trip.js";

const TAU = 6.28318, PI = 3.14159;
const R = 10.0; // the disc's radius (10: a fifth of the frame read too small on the 48 s slots)

export function material(ctx) {
  const layer = (ctx.params && ctx.params.layer) || "being";
  // a still for checking: param fix >= 0 freezes this being at that second (live uniform; -1 in play)
  const c0 = tripClock(ctx), fixP = ctx.param("fix", -1), frozen = fixP.greaterThan(-0.5);
  const sec = select(frozen, fixP, c0.sec);
  const beat = sec.sub(SCORE.firstBeat).mul(BPS);
  const c = { ...c0, sec, beat, bar: beat.div(4), on: select(frozen, float(1), c0.on) };
  const u = visionU(ctx, c);
  const vw0 = ctx.param("vw0", -1), vw1 = ctx.param("vw1", -1);
  const k0 = ctx.param("k0", -1), k1 = ctx.param("k1", -1);
  const kLive = smoothstep(k0.sub(0.05), k0, c.sec).mul(smoothstep(k1.add(0.05), k1, c.sec));
  const kick = float(1).sub(beat.fract()).pow(5).mul(kLive).mul(step(SCORE.firstBeat, sec));
  const P = (a, b, xa, xb) => smoothstep(a, b, u).mul(smoothstep(xb, xa, u)); // in over a..b, out over xa..xb
  const ex = float(1).sub(smoothstep(0.975, 1.0, u));                      // the being itself leaves last
  const cul = smoothstep(0.83, 0.9, u).mul(float(1).sub(smoothstep(0.93, 0.96, u)));
  const peak = climb(c).max(0.7).mul(cul);                   // the culmination: overtones climbing, late in the slot
  const turn = c.dir.mul(c.rnd(205).step(0.5).mul(2).sub(1)); // this being's own turning sense
  const shown = (d) => visionShown(ctx, c, d);

  // hue family (linear body, mid, hot), crossing the palette: 0 blue/violet, 1 magenta/orange, 2 green/yellow,
  // 3 white-led op-art (grey-white body, white mid, one hot accent picked on channel 217)
  const fam = c.seed.add(c.pick(200, 4)).mod(4).floor();   // consecutive seeds walk all four families
  const is = (v, i) => step(float(v).sub(i).abs(), 0.5);
  const acc = c.pick(217, 3);
  const accent = vec3(1, 0.04, 0.42).mul(is(acc, 0)).add(vec3(1, 0.38, 0.02).mul(is(acc, 1))).add(vec3(0.05, 0.12, 1).mul(is(acc, 2)));
  const body = vec3(0.05, 0.1, 1).mul(is(fam, 0)).add(vec3(1, 0.04, 0.42).mul(is(fam, 1))).add(vec3(0.1, 1, 0.15).mul(is(fam, 2))).add(vec3(0.45, 0.45, 0.5).mul(is(fam, 3)));
  const mid = vec3(0.45, 0.05, 1).mul(is(fam, 0)).add(vec3(1, 0.38, 0.02).mul(is(fam, 1))).add(vec3(1, 0.85, 0.05).mul(is(fam, 2))).add(vec3(1, 1, 1).mul(is(fam, 3)));
  const hot = vec3(0.6, 0.75, 1).mul(is(fam, 0)).add(vec3(1, 0.85, 0.08).mul(is(fam, 1))).add(vec3(0.85, 1, 0.55).mul(is(fam, 2))).add(accent.mul(is(fam, 3)));

  const p = vec2(positionGeometry.x, positionGeometry.y);
  const r = length(p);
  const an = atan2(p.y, p.x).div(TAU);           // turns, -0.5..0.5
  const top = atan2(p.x.abs(), p.y).div(PI);     // 0 at the top, 1 at the bottom, mirrored
  const aa = fwidth(r).mul(1.4).max(0.004);
  const line = (d, w) => float(1).sub(smoothstep(float(w), float(w).add(aa), d.abs()));
  // a ring of n beads at radius rc turned by rot (turns): { m: cover, k: the bead's angle from the top 0..1, id }
  const beads = (rc, n, rot, rad) => {
    const f = an.add(rot).mul(n);
    const id = f.floor();
    const q = f.fract().sub(0.5).mul(float(TAU * rc).div(n));
    const d = q.mul(q).add(r.sub(rc).mul(r.sub(rc))).sqrt();
    const th = id.add(0.5).div(n).sub(rot).mul(TAU);
    const k = atan2(th.cos().abs(), th.sin()).div(PI);
    const m = float(1).sub(smoothstep(float(rad).sub(aa), rad, d));
    return { m, k, id, d };
  };
  // a crown of n solid wedges r0..r1 pointing out, each a peripheral-drift step (black, dark, white, hot) across
  const nW = c.pick(209, 3).mul(4).add(16);     // 16 / 20 / 24
  const wedge = (r0, r1, rot, sgn, prog) => {
    const f = an.add(rot).mul(nW), id = f.floor(), x = f.fract().sub(0.5);
    const t = r.sub(r0).div(r1.sub(r0));
    const half = float(1).sub(t).mul(0.46);
    const inside = step(x.abs(), half).mul(step(0, t)).mul(step(t, 1));
    const z = x.mul(sgn).div(half.max(0.001)).mul(0.5).add(0.5).mul(4).floor().clamp(0, 3);
    const th = id.add(0.5).div(nW).sub(rot).mul(TAU);
    const k = atan2(th.cos().abs(), th.sin()).div(PI);
    return { m: inside.mul(maskBeads(prog, k)), col: body.mul(0.55).mul(is(z, 1)).add(vec3(1).mul(is(z, 2))).add(hot.mul(is(z, 3))) };
  };
  const drift = c.rnd(216).step(0.5).mul(2).sub(1);            // the illusion's variant: which way the crowns seem to creep
  const swing = smoothstep(0.85, 0.93, u).mul(0.25).mul(turn); // the culmination: the crowns swing a quarter turn against each other
  const breath = sec.mul(TAU / 5).sin().mul(peak.mul(0.07).add(0.025));
  // the kick's light: a thin ring leaving the eye on each kick, crossing the scene in one beat
  const kr = c.beat.fract().mul(52);
  const kickLight = float(1).sub(smoothstep(0, 2.2, r.sub(kr).abs())).mul(kick).mul(1.6);

  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  m.alphaTest = 0.5;
  let col = vec3(0), cover = float(0);

  if (layer === "world") {
    // THE WORLD: grows from the sun outward behind a rayed front; where grown it is opaque black ground and sky.
    const hz = -14;
    const G = P(0.12, 0.42, 0.965, 0.99).mul(215); // starts early: on the 48 s slots .25 left 12 s of black
    const NR = c.pick(210, 3).mul(4).add(12);
    const front = r.mul(an.mul(NR).mul(TAU).add(sec.mul(0.2)).cos().mul(0.16).add(1));
    const grown = step(front, G);
    const edge = line(front.sub(G), 0.5).mul(step(1, G)).mul(step(G, 205));
    const gy = p.y.sub(hz), ground = step(gy, 0), sky = float(1).sub(ground);
    // dunes: concentric heat arcs under the horizon, scrolling outward, every third a bead row
    const rho = length(vec2(p.x.mul(0.42), gy.mul(1.5))).add(p.x.mul(0.08).add(sec.mul(0.6)).sin().mul(0.6));
    const f = rho.div(4).sub(sec.mul(0.12)), fi = f.floor(), fy = f.fract().sub(0.5).mul(4);
    const isB = is(fi.mod(3), 0);
    const arcs = line(fy, 0.16).mul(float(1).sub(isB));
    const ga = atan2(gy, p.x).div(TAU).mul(180).fract().sub(0.5).mul(rho).mul(TAU / 180 * 2.2);
    const dBead = float(1).sub(smoothstep(0.42, 0.55, vec2(ga, fy).length())).mul(isB);
    const horizon = line(gy, 0.22);
    let g = body.mul(arcs).mul(0.7).add(mid.mul(dBead).mul(kickLight.add(0.8))).mul(ground).add(hot.mul(horizon));
    // sky: three orbit ellipses drawing themselves round, a planet riding each (black body, neon ring)
    const tilt0 = c.rnd(210).sub(0.5).mul(0.5);
    const pPl = P(0.5, 0.7, 0.95, 0.975);
    for (let i = 0; i < 3; i++) {
      const a = 60 + 34 * i, b = a * 0.36, tl = tilt0.add(i * 0.12);
      const qx = p.x.mul(tl.cos()).add(p.y.mul(tl.sin())), qy = p.y.mul(tl.cos()).sub(p.x.mul(tl.sin()));
      const e = length(vec2(qx.div(a), qy.div(b)));
      const oa = atan2(qy.div(b), qx.div(a)).div(TAU).add(0.5);
      const orbit = line(e.sub(1).mul(b), 0.2).mul(step(oa, P(0.3 + 0.04 * i, 0.5 + 0.04 * i, 0.955, 0.98).mul(1.01)));
      const ph = sec.mul(0.12 / (i + 1)).mul(turn).add(i * 2.1 + 0.6);
      const pd = length(vec2(qx.sub(ph.cos().mul(a)), qy.sub(ph.sin().mul(b))));
      const pr = smoothstep(0.15 + 0.3 * i, 0.3 + 0.3 * i, pPl).mul(2.6 + 0.8 * i);
      const pb = step(pd, pr).mul(step(0.05, pr));
      const pc = hot.mul(line(pd.sub(pr.mul(0.9)), 0.22)).add(mid.mul(step(pd, pr.mul(0.35))));
      g = g.add(mid.mul(orbit).mul(0.7).mul(sky));
      g = mix(g, pc, pb.mul(sky));
    }
    // sundials on the ground, mirrored: a ray reaches each from the sun, then it lights (order seeded)
    const ax = p.x.abs(), pD = P(0.5, 0.7, 0.95, 0.975), ord = c.pick(211, 3);
    const DIALS = [[0, -52], [30, -36], [66, -46]];
    DIALS.forEach(([X, Y], j) => {
      const kj = ord.add(j).mod(3).floor().mul(0.27).add(0.05);
      const rp = pD.sub(kj).div(0.12).clamp(0, 1), on = step(kj.add(0.12), pD);
      const D2 = X * X + Y * Y;
      const t = ax.mul(X).add(p.y.mul(Y)).div(D2).clamp(0, 1);
      const rd = length(vec2(ax.sub(t.mul(X)), p.y.sub(t.mul(Y))));
      const ray = line(rd, 0.14).mul(maskDraw(rp, t)).mul(step(0.2, t));
      const q = vec2(ax.sub(X), p.y.sub(Y).mul(1.9)), dd = length(q);
      const tick = atan2(q.y, q.x).div(TAU).mul(12).fract().sub(0.5).mul(4.1 * TAU / 12);
      const glyph = line(dd.sub(5.4), 0.2).add(line(dd.sub(2.6), 0.16)).add(float(1).sub(smoothstep(0.38, 0.5, vec2(tick, dd.sub(4.1)).length())))
        .add(step(q.x.abs(), float(1).sub(p.y.sub(Y).div(4.5)).mul(0.5)).mul(step(0, p.y.sub(Y))).mul(step(p.y.sub(Y), 4.5))).clamp(0, 1);
      g = g.add(hot.mul(ray).mul(0.9)).add(mix(mid, hot, peak).mul(glyph).mul(on).mul(kickLight.add(1)));
    });
    col = g.add(hot.mul(edge).mul(1.4)).mul(grown);
    cover = grown.mul(shown(0));
  } else if (layer === "ring") {
    // THE OUTER CROWN + FAR BEAD RING: turning against the being
    const rot = sec.div(36).mul(turn).negate().sub(swing);
    const pIn = P(0.45, 0.6, 0.96, 0.98);
    const br = float(1).sub(breath);
    const w = wedge(br.mul(34), br.mul(46), rot, drift.negate(), pIn);
    const n1 = c.pick(206, 3).mul(12).add(60);  // 60 / 72 / 84
    const b1 = beads(50, n1, rot.mul(-0.5), 0.62);
    const b2 = beads(48, n1.div(2), rot.mul(1.6), 0.4);
    const lit1 = maskBeads(P(0.4, 0.56, 0.96, 0.98), b1.k), lit2 = maskBeads(P(0.78, 0.9, 0.955, 0.975), b2.k);
    const orbit = line(r.sub(50), 0.12).mul(maskDraw(pIn, top));
    const travel = float(1).sub(smoothstep(0, 0.12, top.sub(c.bar.fract()).abs()));
    const glow = float(0.45).add(travel.mul(1.4)).add(kickLight).add(peak.mul(0.6));
    col = mid.mul(b1.m.mul(lit1)).mul(glow).add(hot.mul(b2.m.mul(lit2)).mul(glow)).add(body.mul(orbit).mul(0.6));
    col = mix(col, w.col.mul(peak.mul(0.5).add(0.75)), w.m);
    cover = b1.m.mul(lit1).add(b2.m.mul(lit2)).add(orbit).add(w.m).clamp(0, 1).mul(shown(r.div(52)));
  } else if (layer === "veil") {
    // NEAR VEIL: three mirrored hanging bead strands a side, black beads with neon rims, drifting down, each
    // trailing a dithered black shadow band over what stands behind
    const ax = p.x.abs();
    const strand = ax.sub(43).div(3.6).floor().clamp(0, 2);
    const sx = strand.mul(3.6).add(44.8);
    const sway = p.y.mul(0.12).add(sec.mul(0.4)).add(strand.mul(2.1)).sin().mul(0.6);
    const gap = float(4.2).sub(strand.mul(0.5));
    const yy = p.y.add(sec.mul(0.5).mul(strand.add(1)));
    const dy = yy.sub(yy.div(gap).floor().add(0.5).mul(gap));
    const dx = ax.sub(sx).sub(sway);
    const rad = float(1.25).sub(strand.mul(0.2));
    const d = length(vec2(dx, dy));
    const disc = step(d, rad);
    const rimL = line(d.sub(rad.mul(0.8)), 0.1), core = step(d, rad.mul(0.28));
    const thread = line(dx, 0.06);
    const dith = step(0.5, p.x.mul(5).floor().add(p.y.mul(5).floor()).mod(2));
    const shadow = step(dx.abs(), 1.7).mul(dith);
    const inX = step(43, ax).mul(step(ax, 54.2)).mul(step(p.y.abs(), 40));
    const k = float(1).sub(p.y.add(40).div(80)).clamp(0, 1);
    const lit = maskBeads(P(0.6, 0.8, 0.94, 0.97), k.mul(0.85).add(strand.mul(0.05)));
    const glow = float(0.8).add(kickLight.mul(0.5)).add(peak.mul(0.4));
    col = mix(mid, body, step(1.5, strand)).mul(rimL).add(hot.mul(core)).mul(disc).mul(glow).add(body.mul(thread).mul(float(1).sub(disc)).mul(0.6));
    cover = disc.max(thread).max(shadow).mul(inX).mul(lit).mul(shown(0.2));
  } else if (layer === "fore") {
    // NEAR DETAILS: small sun glyphs (black disc, neon ring, tick rays) floating up the sides and corners
    const S = 12;
    const yy = p.y.sub(sec.mul(1.1));
    const cx = p.x.div(S).floor(), cy = yy.div(S).floor();
    const h = cx.mul(12.99).add(cy.mul(78.23)).sin().mul(43758.5).fract();
    const gx = cx.add(0.5).mul(S).add(h.sub(0.5).mul(5)).add(sec.mul(0.7).add(h.mul(6)).sin().mul(1.2));
    const gyc = cy.add(0.5).mul(S);
    const q = vec2(p.x.sub(gx), yy.sub(gyc)), d = length(q);
    const away = step(1, length(vec2(gx.div(54), gyc.add(sec.mul(1.1)).div(27))));
    const nt = c.pick(211, 2).mul(4).add(8);
    const tk = atan2(q.y, q.x).div(TAU).add(sec.mul(0.05).mul(h.sub(0.5))).mul(nt).fract().sub(0.5).mul(d).mul(TAU).div(nt);
    const ticks = line(tk, 0.1).mul(step(1.9, d)).mul(step(d, 2.7));
    const disc = step(d, 1.45);
    const lit = maskBeads(P(0.62, 0.85, 0.94, 0.965), h.mul(7.3).fract().mul(0.9)).mul(step(0.45, h)).mul(away);
    col = mid.mul(line(d.sub(1.3), 0.1)).add(hot.mul(step(d, 0.4))).add(hot.mul(ticks)).mul(kickLight.mul(0.5).add(0.9));
    cover = disc.max(ticks).mul(lit).mul(shown(0));
  } else {
    // THE SUN FACE
    const rot = c.sec.div(48).mul(turn);
    // eclipse: the moon slides off on entrance and back on the exit; its side is this roll's
    const side = c.rnd(207).step(0.5).mul(2).sub(1);
    const pE = smoothstep(0.03, 0.2, u).mul(ex);
    const free = maskEclipse(pE, p.x.div(R * 1.05), p.y.div(R * 1.05), 1).mul(step(0.0, side)).add(maskEclipse(pE, p.x.div(R * 1.05), p.y.div(R * 1.05), -1).mul(step(side, 0.0)));
    const mx = pE.mul(2.2).mul(side).mul(R * 1.05);
    const md = length(vec2(p.x.sub(mx), p.y));
    const onDisc = step(r, R * 1.12);
    const moon = float(1).sub(free).mul(onDisc);                     // the black moon itself, opaque where it lies on the sun
    const corona = line(md.sub(R * 1.05), 0.05).mul(onDisc).mul(step(0.02, pE)).mul(step(pE, 0.98));
    const contact = float(1).sub(smoothstep(0, 1.2, length(vec2(p.x.sub(mx.sub(side.mul(R * 1.05))), p.y)))).mul(step(0.02, pE)).mul(step(pE, 0.6));
    // the first stroke: a hairline circle drawn round from the top, both sides at once, its nib bright
    const pS = smoothstep(0.0, 0.08, u).mul(ex);
    const stroke = line(r.sub(R * 1.16), 0.07).mul(maskDraw(pS, top));
    const strokeNib = nib(pS, top, 0.03).mul(step(r.sub(R * 1.16).abs(), 0.35)).mul(step(pS, 0.99)).mul(step(0.01, pS));

    // the disc: concentric line-art rings and two bead rows, graphite at rest, lit as light passes
    const ringF = r.div(R).mul(7).sub(c.bar.mul(0.25)).fract();
    const rings = line(ringF.sub(0.5).mul(R / 7), 0.035).mul(step(4.6, r)).mul(step(r, R));
    const bA = beads(R * 0.66, c.pick(201, 3).mul(4).add(8).mul(2), rot, 0.22);
    const bB = beads(R * 0.94, c.pick(201, 3).mul(4).add(8).mul(3), rot.mul(-1.3), 0.17);
    const rim = line(r.sub(R), 0.07);
    const sweep = float(1).sub(smoothstep(0, 0.1, top.sub(c.sec.div(6).fract()).abs())); // a mirrored light falling top to bottom, once per 4 bars
    const glowD = float(0.32).add(sweep.mul(1.1)).add(kickLight).add(peak.mul(0.9));
    let disc = mid.mul(rings).mul(glowD).add(hot.mul(bA.m.add(bB.m)).mul(glowD.add(0.3))).add(hot.mul(rim).mul(float(1).add(peak)));
    const discCover = rings.add(bA.m).add(bB.m).add(rim).clamp(0, 1).mul(step(r, R + 0.2));

    // the eye: an almond 9 m wide, opening by its lids; inside, iris rings, a black pupil, a glint
    const ea = 4.2, eh = 2.1;
    const xn = p.x.div(ea);
    const half = float(1).sub(xn.mul(xn)).max(0).pow(0.8).mul(eh);  // the almond's half-height at x
    const pLid = smoothstep(0.16, 0.26, u).mul(ex);
    const yN = p.y.div(half.max(0.001));
    const inside = step(xn.abs(), 1).mul(step(yN.abs(), 1));
    const open = maskLid(pLid, yN).mul(inside);
    const lidLine = line(p.y.abs().sub(half.mul(pLid)), 0.06).mul(step(xn.abs(), 1)).mul(step(0.01, pLid));
    const outline = line(p.y.abs().sub(half), 0.06).mul(step(xn.abs(), 1.0));
    const ir = length(p);
    const eyeVar = c.pick(202, 2);
    const irisRings = line(ir.mul(1.6).sub(c.sec.mul(0.25).mul(turn)).fract().sub(0.5).div(1.6), 0.05);
    const irisSpiral = line(ir.mul(1.4).add(an.mul(turn).mul(2)).sub(c.sec.mul(0.15)).fract().sub(0.5).div(1.4), 0.05);
    const iris = mix(irisRings, irisSpiral, eyeVar).mul(step(ir, 1.85)).mul(step(0.85, ir));
    const irisRim = line(ir.sub(1.95), 0.07);
    const pupil = step(ir, 0.8);
    const glint = float(1).sub(smoothstep(0.15, 0.28, length(p.sub(vec2(0.3, 0.32)))));
    const eyeGlow = float(0.6).add(kickLight.mul(0.6)).add(peak.mul(0.8));
    const eyeCol = hot.mul(iris.add(irisRim).clamp(0, 1)).mul(eyeGlow).add(vec3(1).mul(glint).mul(2));
    disc = mix(disc, eyeCol, open).add(hot.mul(lidLine.add(outline.mul(step(0.99, pLid))).clamp(0, 1)).mul(1.2));
    const eyeCover = open.mul(iris.add(irisRim).add(glint).add(pupil).clamp(0, 1)).add(lidLine).add(outline.mul(step(0.99, pLid))).clamp(0, 1);
    const coverDisc = mix(discCover, eyeCover, open).max(lidLine).max(outline.mul(step(0.99, pLid)));
    const pupilBlack = open.mul(pupil);

    // rays: N lines (8/12/16) from 9 to 15 m, mirrored pairs drawing in one per kick, top pair first
    const N = c.pick(201, 3).mul(4).add(8);
    const fr = an.sub(0.25).mul(N).add(0.5);                  // ray 0 points straight up
    const ri = fr.floor();
    const rq = fr.fract().sub(0.5).mul(TAU).div(N).mul(r);   // metres off the ray's axis
    const th = ri.div(N).add(0.25).mul(TAU);
    const pairK = atan2(th.cos().abs(), th.sin()).div(PI).mul(N.div(2)).add(0.01).floor(); // 0 top, rising down both sides
    const s0 = vw0.add(vw1.sub(vw0).mul(0.12));
    const B0 = s0.sub(SCORE.firstBeat).mul(BPS).ceil();
    const kickP = c.beat.sub(B0.add(pairK)).mul(3);             // on each kick a pair draws in a third of a beat
    const smoothP = u.sub(0.12).div(0.18).mul(N.div(2).add(1)).sub(pairK); // no kick: drawn on the slot clock
    const rayP = mix(smoothP, kickP, kLive).clamp(0, 1).mul(ex);
    const r0 = float(R + 1.0), r1 = float(R + 6.0).add(peak.mul(2.5));
    const ru = r.sub(r0).div(r1.sub(r0));
    const rayLong = step(0.5, ri.mod(2));                        // every other ray a bead row
    const rayLine = line(rq, 0.06).mul(step(0, ru)).mul(step(ru, 1));
    const rbq = ru.mul(7).fract().sub(0.5).mul(r1.sub(r0).div(7));
    const rayBead = float(1).sub(smoothstep(0.22, 0.3, vec2(rq, rbq).length())).mul(step(0, ru)).mul(step(ru, 1));
    const rayShape = mix(rayLine, rayBead, rayLong);
    const rayM = rayShape.mul(maskDraw(rayP, ru));
    const rayNib = nib(rayP, ru, 0.06).mul(step(rq.abs(), 0.3)).mul(step(rayP, 0.99)).mul(step(0.01, rayP));
    const rayGlow = float(0.5).add(kickLight).add(float(1).sub(smoothstep(0, 0.15, ru.sub(c.beat.fract()).abs())).mul(kick)).add(peak);

    // crown: 2N flame teardrops on a ring at 16.5 m pointing out, lighting top-down; the lower ones drip slowly
    const M = N.mul(2), cv = c.pick(203, 2);
    const fc = an.sub(0.25).mul(M).add(0.5);
    const ci = fc.floor();
    const tht = ci.div(M).add(0.25).mul(TAU);
    const ck = atan2(tht.cos().abs(), tht.sin()).div(PI);
    const dripSpeed = float(0.25).add(c.rnd(208).mul(0.2));
    const hang = smoothstep(0.55, 1.0, ck);                       // the lower crown hangs and drips
    const lx = fc.fract().sub(0.5).mul(TAU).div(M).mul(r);        // across the drop
    const ly0 = r.sub(R + 7.5);                                    // along it, outward
    const dripT = c.sec.mul(dripSpeed).add(ci.mul(0.37)).fract().mul(smoothstep(0.36, 0.44, u));
    const ly = ly0.sub(dripT.mul(hang).mul(4));
    const len = mix(float(1.6), float(2.4), cv);
    const yy = ly.div(len);                                        // 0 the drop's round base, 1 its point (outward)
    const wdt = float(1).sub(yy.clamp(0, 1)).pow(mix(float(0.7), float(1.4), cv)).mul(0.55).mul(step(-0.45, yy));
    const bulb = vec2(lx, ly.min(0)).length();
    const dropD = select(yy.lessThan(0), bulb.sub(0.55), lx.abs().sub(wdt));
    const dropLine = line(dropD, 0.05).mul(step(yy, 1.02));
    const dropCore = float(1).sub(smoothstep(0.08, 0.18, vec2(lx, ly.add(0.05)).length()));
    const pC = smoothstep(0.24, 0.36, u).mul(ex);
    const crownLit = maskBeads(pC, ck);
    const crown = dropLine.add(dropCore).clamp(0, 1).mul(crownLit).mul(float(1).sub(smoothstep(0.6, 1.0, dripT.mul(hang))));
    const crownGlow = float(0.55).add(kickLight).add(peak.mul(0.8));

    // the black body: the face stands on a solid disc that hides the world and the ring behind it
    const bodyBlack = step(r, smoothstep(0.02, 0.2, u).mul(ex).mul(20));
    // the inner ray crown: solid drift wedges 21..29.5 m, breathing, turning with the face
    const brA = breath.add(1);
    const wA = wedge(brA.mul(21), brA.mul(29.5), rot.add(swing), drift, P(0.38, 0.5, 0.97, 0.985));

    const outside = moon.oneMinus();
    const glare = hot.mul(corona.mul(1.5).add(contact.mul(3)));
    col = disc.mul(free).add(mid.mul(rayM.add(rayNib.mul(2))).mul(rayGlow)).add(mix(mid, body, hang).mul(crown).mul(crownGlow)).add(glare);
    col = col.mul(outside).add(glare.mul(moon));
    col = col.mul(pupilBlack.oneMinus()).add(hot.mul(stroke.add(strokeNib.mul(2))));
    col = mix(col, wA.col.mul(peak.mul(0.5).add(0.75)), wA.m);
    const sunCover = coverDisc.mul(free).max(rayM).max(rayNib).max(crown).max(corona).max(contact).max(moon).max(pupilBlack.mul(free)).max(stroke).max(strokeNib).max(bodyBlack).max(wA.m);
    cover = sunCover.mul(shown(r.div(60)));
  }
  m.colorNode = col.mul(2.2);
  m.opacityNode = cover;
  return m;
}
