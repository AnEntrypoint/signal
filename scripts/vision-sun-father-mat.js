// THE SUN FATHER: a vision being, three layers at three depths, each one clean line-art / bead layer on black.
//   layer "ring"  (z -14): a far bead ring, the sky's orbit, crisp and slow, turning against the being
//   layer "sun"   (z 0)  : the face: concentric disc, one calm eye, rays, a crown of flame teardrops dripping
//   layer "veil"  (z +12): two mirrored bead strands hanging close to the eye, out of focus (soft bokeh beads)
// Everything enters ONE BY ONE through a mask that means something, on its slot clock u = visionU 0..1:
//   eclipse: a black moon slides off the disc (u 0..0.28)   far ring: beads light round from the top (0.08..0.4)
//   veil: beads light top-down (0.15..0.55)   eye: the lids part (0.3..0.45)   rays: one mirrored pair per KICK (from 0.4)
//   crown: teardrops light from the top down both sides (0.52..0.7), then drip   culmination 0.7..1: climb(c)
//   exit, last 0.5 s: the moon slides back over, rays withdraw, the crown goes out bottom-up.
// The kick (gated: only inside measured kick runs) is a ring of light leaving the eye and crossing the whole being.
// Seeded (channels 10+): fire family, ray count (8/12/16), eye variant, crown variant, turning sense, moon side.
import { MeshBasicNodeMaterial, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, mix, step, atan2, length, fwidth, select } from "builtin/tsl";
import { tripClock, visionShown, visionU, climb, maskEclipse, maskBeads, maskLid, maskDraw, nib, BPS, SCORE } from "./lib/trip.js";
import { Y0 } from "./vision-sun-father-geo.js";

const TAU = 6.28318, PI = 3.14159;
const R = 8.0; // the disc's radius

export function material(ctx) {
  const layer = (ctx.params && ctx.params.layer) || "sun";
  const c = tripClock(ctx);
  const u = visionU(ctx, c);
  const vw0 = ctx.param("vw0", -1), vw1 = ctx.param("vw1", -1);
  const k0 = ctx.param("k0", -1), k1 = ctx.param("k1", -1);
  const kLive = smoothstep(k0.sub(0.05), k0, c.sec).mul(smoothstep(k1.add(0.05), k1, c.sec));
  const ex = smoothstep(vw1, vw1.sub(0.5), c.sec);           // 1 until the last half second, then the exit runs to 0
  const peak = climb(c).mul(smoothstep(0.66, 0.76, u));      // the culmination: overtones climbing, late in the slot
  const turn = c.dir.mul(c.rnd(15).step(0.5).mul(2).sub(1)); // this being's own turning sense

  // fire family: body, mid, hot (linear)
  const fam = c.pick(10, 3);
  const is = (v, i) => step(v.sub(i).abs(), 0.5);
  const body = vec3(1, 0.1, 0.02).mul(is(fam, 0)).add(vec3(1, 0.04, 0.42).mul(is(fam, 1))).add(vec3(1, 0.3, 0.02).mul(is(fam, 2)));
  const mid = vec3(1, 0.38, 0.02).mul(is(fam, 0)).add(vec3(1, 0.3, 0.03).mul(is(fam, 1))).add(vec3(1, 0.7, 0.05).mul(is(fam, 2)));
  const hot = vec3(1, 0.85, 0.08).mul(is(fam, 0).add(is(fam, 1))).add(vec3(1, 0.95, 0.75).mul(is(fam, 2)));

  const p = vec2(positionGeometry.x, positionGeometry.y.sub(Y0));
  const r = length(p);
  const an = atan2(p.y, p.x).div(TAU);           // turns, -0.5..0.5
  const top = atan2(p.x.abs(), p.y).div(PI);     // 0 at the top, 1 at the bottom, mirrored
  const aa = fwidth(r).mul(1.4).max(0.004);
  const line = (d, w) => float(1).sub(smoothstep(float(w), float(w).add(aa), d.abs()));
  // a ring of n beads at radius rc turned by rot (turns): { m: cover, k: the bead's angle from the top 0..1, id }
  const beads = (rc, n, rot, rad, soft = 0) => {
    const f = an.add(rot).mul(n);
    const id = f.floor();
    const q = f.fract().sub(0.5).mul(float(TAU * rc).div(n));
    const d = q.mul(q).add(r.sub(rc).mul(r.sub(rc))).sqrt();
    const th = id.add(0.5).div(n).sub(rot).mul(TAU);
    const k = atan2(th.cos().abs(), th.sin()).div(PI);
    const m = soft ? float(1).sub(smoothstep(float(rad).mul(0.55), float(rad), d)) : float(1).sub(smoothstep(float(rad).sub(aa), rad, d));
    return { m, k, id, d };
  };
  // the kick's light: a thin ring leaving the eye on each kick, crossing 18 m in one beat
  const kr = c.beat.fract().mul(18);
  const kickLight = smoothstep(2.2, 0, r.sub(kr).abs()).mul(c.kick).mul(1.6);

  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  m.toneMapped = false;
  m.alphaTest = 0.5;
  let col = vec3(0), cover = float(0);

  if (layer === "ring") {
    // FAR RING: 1 bead row + a hairline orbit at 17 m and an inner row at 15.6, turning slowly against the being.
    const rot = c.sec.div(72).mul(turn).negate();
    const n1 = c.pick(16, 3).mul(12).add(48);  // 48 / 60 / 72
    const b1 = beads(17, n1, rot, 0.28);
    const b2 = beads(15.6, n1.div(2), rot.mul(-1.6), 0.18);
    const pIn = smoothstep(0.08, 0.4, u).mul(ex);
    const lit1 = maskBeads(pIn, b1.k), lit2 = maskBeads(smoothstep(0.7, 0.95, u).mul(ex), b2.k); // the inner row only at the culmination
    const orbit = line(r.sub(17), 0.03).mul(maskDraw(pIn, top));
    // light travels round the still ring: a mirrored comet from the top down, once per bar
    const travel = smoothstep(0.12, 0, top.sub(c.bar.fract()).abs());
    const glow = float(0.35).add(travel.mul(1.6)).add(kickLight).add(peak.mul(0.6));
    col = mid.mul(b1.m.mul(lit1)).mul(glow).add(hot.mul(b2.m.mul(lit2)).mul(glow)).add(body.mul(orbit).mul(0.6));
    cover = b1.m.mul(lit1).add(b2.m.mul(lit2)).add(orbit).clamp(0, 1).mul(visionShown(ctx, c, r.div(18)));
  } else if (layer === "veil") {
    // NEAR VEIL: two mirrored hanging strands of soft beads at |x| 12..18, out of focus; they drift down slowly
    const ax = p.x.abs();
    const strand = ax.sub(12).div(2).floor().clamp(0, 2);       // 3 strands a side
    const sx = strand.mul(2).add(13);
    const sway = p.y.mul(0.18).add(c.sec.mul(0.4)).add(strand.mul(2.1)).sin().mul(0.5);
    const gap = float(2.6).sub(strand.mul(0.4));
    const yy = p.y.add(c.sec.mul(0.35).mul(strand.add(1)));     // drip down, each strand its own rate
    const cell = yy.div(gap).floor();
    const dy = yy.sub(cell.add(0.5).mul(gap));
    const dx = ax.sub(sx).sub(sway);
    const rad = float(0.75).sub(strand.mul(0.15));
    const d = dx.mul(dx).add(dy.mul(dy)).sqrt();
    // bokeh: a soft disc with a brighter rim, so it reads as out of focus
    const disc = float(1).sub(smoothstep(rad.mul(0.7), rad, d));
    const rim = smoothstep(rad.mul(0.55), rad.mul(0.85), d).mul(disc);
    const inX = step(12, ax).mul(step(ax, 18)).mul(step(p.y.abs(), 17));
    const k = float(1).sub(p.y.add(17).div(34)).clamp(0, 1);    // top to bottom
    const lit = maskBeads(smoothstep(0.15, 0.55, u).mul(ex), k.add(strand.mul(0.1)));
    const glow = float(0.18).add(rim.mul(0.35)).add(kickLight.mul(0.4)).add(peak.mul(0.25));
    col = mix(body, mid, step(1.5, strand)).mul(glow).mul(disc);
    cover = disc.mul(inX).mul(lit).mul(visionShown(ctx, c, r.div(20)));
  } else {
    // THE SUN FACE
    const rot = c.sec.div(48).mul(turn);
    // eclipse: the moon slides off on entrance and back on the exit; its side is this roll's
    const side = c.rnd(17).step(0.5).mul(2).sub(1);
    const pE = smoothstep(0.0, 0.28, u).mul(ex);
    const free = maskEclipse(pE, p.x.div(R * 1.05), p.y.div(R * 1.05), 1).mul(step(0.0, side)).add(maskEclipse(pE, p.x.div(R * 1.05), p.y.div(R * 1.05), -1).mul(step(side, 0.0)));
    const mx = pE.mul(2.2).mul(side).mul(R * 1.05);
    const md = length(vec2(p.x.sub(mx), p.y));
    const onDisc = step(r, R * 1.12);
    const moon = float(1).sub(free).mul(onDisc);                     // the black moon itself, opaque where it lies on the sun
    // the corona: a hairline and the diamond-ring bead where the moon's limb meets the sun's
    const corona = line(md.sub(R * 1.05), 0.05).mul(onDisc).mul(step(0.02, pE)).mul(step(pE, 0.98));
    const contact = smoothstep(1.2, 0, length(vec2(p.x.sub(mx.sub(side.mul(R * 1.05))), p.y))).mul(step(0.02, pE)).mul(step(pE, 0.6));

    // the disc: concentric line-art rings and two bead rows, graphite at rest, lit as light passes
    const ringF = r.div(R).mul(7).sub(c.bar.mul(0.25)).fract();
    const rings = line(ringF.sub(0.5).mul(R / 7), 0.035).mul(step(4.6, r)).mul(step(r, R));
    const bA = beads(R * 0.66, c.pick(11, 3).mul(4).add(8).mul(2), rot, 0.22);
    const bB = beads(R * 0.94, c.pick(11, 3).mul(4).add(8).mul(3), rot.mul(-1.3), 0.17);
    const rim = line(r.sub(R), 0.07);
    const sweep = smoothstep(0.1, 0, top.sub(c.sec.div(6).fract()).abs()); // a mirrored light falling top to bottom, once per 4 bars
    const glowD = float(0.32).add(sweep.mul(1.1)).add(kickLight).add(peak.mul(0.9));
    let disc = mid.mul(rings).mul(glowD).add(hot.mul(bA.m.add(bB.m)).mul(glowD.add(0.3))).add(hot.mul(rim).mul(float(1).add(peak)));
    const discCover = rings.add(bA.m).add(bB.m).add(rim).clamp(0, 1).mul(step(r, R + 0.2));

    // the eye: an almond 9 m wide, opening by its lids; inside, iris rings, a black pupil, a glint
    const ea = 4.2, eh = 2.1;
    const xn = p.x.div(ea);
    const half = float(1).sub(xn.mul(xn)).max(0).pow(0.8).mul(eh);  // the almond's half-height at x
    const pLid = smoothstep(0.3, 0.45, u).mul(ex);
    const yN = p.y.div(half.max(0.001));
    const inside = step(xn.abs(), 1).mul(step(yN.abs(), 1));
    const open = maskLid(pLid, yN).mul(inside);
    const lidLine = line(p.y.abs().sub(half.mul(pLid)), 0.06).mul(step(xn.abs(), 1)).mul(step(0.01, pLid));
    const outline = line(p.y.abs().sub(half), 0.06).mul(step(xn.abs(), 1.0));
    const ir = length(p);
    const eyeVar = c.pick(12, 2);
    const irisRings = line(ir.mul(1.6).sub(c.sec.mul(0.25).mul(turn)).fract().sub(0.5).div(1.6), 0.05);
    const irisSpiral = line(ir.mul(1.4).add(an.mul(turn).mul(2)).sub(c.sec.mul(0.15)).fract().sub(0.5).div(1.4), 0.05);
    const iris = mix(irisRings, irisSpiral, eyeVar).mul(step(ir, 1.85)).mul(step(0.85, ir));
    const irisRim = line(ir.sub(1.95), 0.07);
    const pupil = step(ir, 0.8);
    const glint = smoothstep(0.28, 0.15, length(p.sub(vec2(0.3, 0.32))));
    const eyeGlow = float(0.6).add(kickLight.mul(0.6)).add(peak.mul(0.8));
    const eyeCol = hot.mul(iris.add(irisRim).clamp(0, 1)).mul(eyeGlow).add(vec3(1).mul(glint).mul(2));
    // the eye cuts its own window into the disc: inside the open almond, only the eye is drawn
    disc = mix(disc, eyeCol, open).add(hot.mul(lidLine.add(outline.mul(step(0.99, pLid))).clamp(0, 1)).mul(1.2));
    const eyeCover = open.mul(iris.add(irisRim).add(glint).add(pupil).clamp(0, 1)).add(lidLine).add(outline.mul(step(0.99, pLid))).clamp(0, 1);
    const coverDisc = mix(discCover, eyeCover, open).max(lidLine).max(outline.mul(step(0.99, pLid)));
    const pupilBlack = open.mul(pupil);

    // rays: N lines (8/12/16) from 9 to 15 m, mirrored pairs drawing in one per kick, top pair first
    const N = c.pick(11, 3).mul(4).add(8);
    const fr = an.sub(0.25).mul(N).add(0.5);                  // ray 0 points straight up
    const ri = fr.floor();
    const rq = fr.fract().sub(0.5).mul(TAU).div(N).mul(r);   // metres off the ray's axis
    const th = ri.div(N).add(0.25).mul(TAU);
    const pairK = atan2(th.cos().abs(), th.sin()).div(PI).mul(N.div(2)).add(0.01).floor(); // 0 top, rising down both sides
    const s0 = vw0.add(vw1.sub(vw0).mul(0.4));
    const B0 = s0.sub(SCORE.firstBeat).mul(BPS).ceil();
    const kickP = c.beat.sub(B0.add(pairK)).mul(3);             // on each kick a pair draws in a third of a beat
    const smoothP = u.sub(0.4).div(0.28).mul(N.div(2).add(1)).sub(pairK); // no kick: drawn on the slot clock
    const rayP = mix(smoothP, kickP, kLive).clamp(0, 1).mul(ex);
    const r0 = float(R + 1.0), r1 = float(R + 6.0).add(peak.mul(2.5));
    const ru = r.sub(r0).div(r1.sub(r0));
    const rayLong = step(0.5, ri.mod(2));                        // every other ray a bead row
    const rayLine = line(rq, 0.06).mul(step(0, ru)).mul(step(ru, 1));
    const rbq = ru.mul(7).fract().sub(0.5).mul(r1.sub(r0).div(7));
    const rayBead = smoothstep(0.3, 0.22, vec2(rq, rbq).length()).mul(step(0, ru)).mul(step(ru, 1));
    const rayShape = mix(rayLine, rayBead, rayLong);
    const rayM = rayShape.mul(maskDraw(rayP, ru));
    const rayNib = nib(rayP, ru, 0.06).mul(step(rq.abs(), 0.3)).mul(step(rayP, 0.99)).mul(step(0.01, rayP));
    const rayGlow = float(0.5).add(kickLight).add(smoothstep(0.15, 0, ru.sub(c.beat.fract()).abs()).mul(c.kick)).add(peak);

    // crown: 2N flame teardrops on a ring at 16.5 m pointing out, lighting top-down; the lower ones drip slowly
    const M = N.mul(2), cv = c.pick(13, 2);
    const fc = an.sub(0.25).mul(M).add(0.5);
    const ci = fc.floor();
    const tht = ci.div(M).add(0.25).mul(TAU);
    const ck = atan2(tht.cos().abs(), tht.sin()).div(PI);
    const dripSpeed = float(0.25).add(c.rnd(18).mul(0.2));
    const hang = smoothstep(0.55, 1.0, ck);                       // the lower crown hangs and drips
    const lx = fc.fract().sub(0.5).mul(TAU).div(M).mul(r);        // across the drop
    const ly0 = r.sub(R + 7.5);                                    // along it, outward
    const dripT = c.sec.mul(dripSpeed).add(ci.mul(0.37)).fract().mul(smoothstep(0.7, 0.8, u.add(0.08)));
    const ly = ly0.sub(dripT.mul(hang).mul(4));
    const len = mix(float(1.6), float(2.4), cv);
    const yy = ly.div(len);                                        // 0 the drop's round base, 1 its point (outward)
    const wdt = float(1).sub(yy.clamp(0, 1)).pow(mix(float(0.7), float(1.4), cv)).mul(0.55).mul(step(-0.45, yy));
    const bulb = vec2(lx, ly.min(0)).length();
    const dropD = select(yy.lessThan(0), bulb.sub(0.55), lx.abs().sub(wdt));
    const dropLine = line(dropD, 0.05).mul(step(yy, 1.02));
    const dropCore = smoothstep(0.18, 0.08, vec2(lx, ly.add(0.05)).length());
    const pC = smoothstep(0.52, 0.7, u).mul(ex);
    const crownLit = maskBeads(pC, ck);
    const crown = dropLine.add(dropCore).clamp(0, 1).mul(crownLit).mul(float(1).sub(smoothstep(0.6, 1.0, dripT.mul(hang))));
    const crownGlow = float(0.55).add(kickLight).add(peak.mul(0.8));

    const outside = moon.oneMinus();
    col = disc.mul(free).add(mid.mul(rayM.add(rayNib.mul(2))).mul(rayGlow)).add(mix(mid, body, hang).mul(crown).mul(crownGlow))
      .add(hot.mul(corona.mul(1.5).add(contact.mul(3))));
    col = col.mul(outside).add(hot.mul(corona.mul(1.5).add(contact.mul(3))).mul(moon));
    col = col.mul(pupilBlack.oneMinus());
    const sunCover = coverDisc.mul(free).max(rayM).max(rayNib).max(crown).max(corona).max(contact).max(moon).max(pupilBlack.mul(free));
    cover = sunCover.mul(visionShown(ctx, c, r.div(18)));
  }
  if (ctx.params && ctx.params.debug) { col = vec3(step(6, c.sec).mul(step(c.sec, 14)), step(0.4, u).mul(step(u, 0.9)), visionShown(ctx, c, 0)).mul(0.2); cover = float(1); }
  m.colorNode = col.mul(2.2);
  m.opacityNode = cover;
  return m;
}
