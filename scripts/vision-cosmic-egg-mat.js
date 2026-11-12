// THE COSMIC EGG (the orphic egg): an upright egg of concentric bead-row shells, a striped serpent coiled round it.
// Layers (params.layer): world z-30 dot-ring ripples leaving the egg (scrolls outward) / ring z-12 moons in phases (orbit, reversing) /
// being z0 the egg (breathes; coils climb) / veil z+10 black curved shards (orbit the other way) / fore z+22 dust beads (drift).
// Pacing: seed dot alone u0-.15, shells bead in bottom-to-top, serpent drawn along its length, whole by .48; late .6-.8 the crack
// travels, the top lifts on the spiral embryo-sun; LIFO exit .8-1: dust, shards, sun, serpent, moons, then shell fragments drift
// off one by one and the seed is last. Roll channels 960..979.
import { MeshBasicNodeMaterial, AdditiveBlending, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep as ssRaw, step, mix, atan2 as atan2raw, fwidth } from "builtin/tsl";
import { tripClock, visionShown, visionU, climb, maskDraw, maskBeads, maskIris, maskClock, inv, is, sgn, ioU, strokeAA, stripes } from "./lib/trip.js";

const TAU = 6.28318, PI = 3.14159;
const CY = -3, EA = 11, EB = 15, Y0 = 4;                            // egg centre y, half width, half height, crack height
const atan2 = (y, x) => atan2raw(y, x.add(1e-5));                   // never (0, 0)
const hs = (x) => x.mul(12.9898).sin().mul(43758.5453).fract();
const tri = (x) => x.fract().sub(0.5).abs().mul(2);

export function material(ctx) {
  const layer = ctx.params.layer ?? "being";
  const c = tripClock(ctx), u = visionU(ctx, c), io = ioU(u);
  const low = ctx.quality === "low";
  const rn = (n) => c.rnd(960 + n), pk = (n, k) => c.pick(960 + n, k), sense = (n) => sgn(rn(n));
  const fam = pk(0, 3), hot = pk(1, 4);
  const blue = vec3(0.05, 0.12, 1.0), violet = vec3(0.45, 0.05, 1.0), ice = vec3(0.45, 0.6, 1.0), W = vec3(1, 1, 1);
  const A = blue.mul(is(fam, 0)).add(violet.mul(is(fam, 1))).add(blue.mul(is(fam, 2)));
  const B = violet.mul(is(fam, 0)).add(blue.mul(is(fam, 1))).add(ice.mul(is(fam, 2)));
  const HOT = [vec3(1.0, 0.06, 0.6), vec3(1.0, 0.42, 0.02), vec3(1.0, 0.85, 0.05), vec3(0.1, 1.0, 0.15)];
  const hotC = (k) => HOT.reduce((acc, v, i) => acc.add(v.mul(is(k, i))), vec3(0));
  const H = hotC(hot), H2 = hotC(hot.add(pk(2, 3)).add(1).mod(4));
  const P = positionGeometry.xy;
  const kickOn = step(0.001, c.kick);
  const cul = ssRaw(0.7, 0.8, u).mul(inv(ssRaw(0.86, 0.92, u))).mul(climb(c).mul(0.4).add(0.6));
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  const cutout = (col, cover, live = visionShown(ctx, c, 0)) => { m.colorNode = col; m.opacityNode = cover.mul(live).clamp(0, 1); m.alphaTest = 0.5; return m; };

  // ------------------------------------------------------------------ WORLD: dot rings rippling out of the egg (scrolls outward)
  if (layer === "world") {
    const q = P.sub(vec2(0, CY * 104 / 74));
    const r = q.length().max(0.5), a = atan2(q.y, q.x);
    const stroke = strokeAA(fwidth(P.x).mul(1.2).max(0.02));
    const N = pk(5, 3).mul(8).add(28), cw = float(TAU).div(N);        // log-polar cells: square at every radius
    const rho = r.log().div(cw).sub(c.real.mul(0.11));
    const j = rho.floor(), f = rho.fract().sub(0.5), par = j.add(400).mod(2), km = j.add(600).mod(3);
    const ak = a.div(cw).add(par.mul(0.5)).add(c.real.mul(0.035).mul(par.mul(2).sub(1)).mul(sense(3))).fract().sub(0.5);
    const cell = cw.mul(r), dm = vec2(ak, f).length().mul(cell);
    const rad = cell.mul(float(0.3).sub(is(km, 2).mul(0.14)));
    const dot = mix(stroke(dm, rad), stroke(dm.sub(rad).abs(), cell.mul(0.05)), is(km, 1));
    const pupil = stroke(dm, rad.mul(0.42)).mul(is(km, 0)).mul(io(0.6, 0.76, 2, 3));   // late: the dots open as eyes
    const Rg = io(0.13, 0.45, 2, 3).mul(210);                        // the first ripple's front, leaving the egg
    const front = c.beat.fract().mul(130);
    const kl = inv(ssRaw(0, 6, r.sub(front).abs())).mul(kickOn).mul(inv(ssRaw(60, 130, front)));
    const edge = inv(ssRaw(0, 9, Rg.sub(r).abs()));
    const col = A.mul(is(km, 0)).add(B.mul(is(km, 1))).add(H2.mul(0.8).mul(is(km, 2)))
      .mul(dot).mul(inv(pupil)).mul(float(0.4).add(kl.mul(0.9)).add(edge.mul(0.8)).add(cul.mul(0.2))).mul(ssRaw(13, 20, r));
    return cutout(col, step(r, Rg).mul(step(0.002, Rg)), visionShown(ctx, c, r.div(190)));
  }

  // ------------------------------------------------------------------ RING: moons in their phases (orbit, swinging back on the phrase)
  if (layer === "ring") {
    const p = P.mul(74 / 86).sub(vec2(0, CY));
    const stroke = strokeAA(fwidth(p.x).mul(1.2).max(0.01));
    const r = p.length(), a = atan2(p.x, p.y), R = 25, MR = 1.9;
    const pL = io(0.45, 0.54, 0.9, 0.94), pM = io(0.47, 0.6, 0.88, 0.93), pD = io(0.52, 0.64, 0.87, 0.92);
    const lit = float(0.6).add(cul.mul(0.5));
    const N = pk(6, 3).add(7);
    const am = a.add(c.real.mul(TAU / 52).add(c.beat.mul(TAU / 64).sin().mul(0.55)).mul(sense(4)));   // the orbit reverses each phrase
    const km = am.div(TAU).mul(N).add(0.5).floor();
    const qm = vec2(am.sub(km.mul(TAU).div(N)).mul(R), r.sub(R));
    const ml = qm.length();
    const ph = km.div(N).add(c.real.mul(0.012)).mul(TAU).cos();        // each moon one step further through its phase
    const lune = step(ph.mul(float(MR * MR).sub(qm.y.mul(qm.y)).max(0).sqrt()), qm.x).mul(stroke(ml, MR - 0.1));
    const moon = lune.add(stroke(ml.sub(MR).abs(), 0.08)).min(1).mul(maskBeads(pM, km.div(N).add(rn(17)).fract()));
    const orbit = stroke(r.sub(R).abs(), 0.05).mul(inv(stroke(ml, MR + 0.5))).mul(maskClock(pL, a.mul(sense(4))));
    // a far bead row, the other way
    const nD = pk(7, 3).mul(6).add(30), R2 = 31;
    const ad = a.sub(c.real.mul(TAU / 80).mul(sense(4)));
    const kd = ad.div(TAU).mul(nD).add(0.5).floor();
    const bd = vec2(ad.sub(kd.mul(TAU).div(nD)).mul(R2), r.sub(R2)).length();
    const front = c.beat.fract().mul(40);
    const kl = inv(ssRaw(0, 3, r.sub(front).abs())).mul(kickOn).mul(inv(ssRaw(30, 40, front)));
    const bead = stroke(bd, 0.42).mul(maskBeads(pD, kd.div(nD).fract()));
    m.colorNode = A.mul(orbit).mul(lit).add(mix(B, W, 0.55).mul(moon).mul(lit)).add(mix(B, H, step(kd.add(70).mod(5), 0.5)).mul(bead).mul(lit.add(kl.mul(0.8))));
    m.opacityNode = visionShown(ctx, c, 0);
    m.transparent = true; m.blending = AdditiveBlending; m.depthWrite = false;
    return m;
  }

  // ------------------------------------------------------------------ VEIL: black shell shards orbiting in front (occludes)
  if (layer === "veil") {
    const q = P.sub(vec2(0, CY * 64 / 74));
    const stroke = strokeAA(fwidth(P.x).mul(1.2).max(0.01));
    const r = vec2(q.x.div(1.25), q.y).length();
    const N = pk(12, 3).add(4), pin = io(0.6, 0.74, 0.83, 0.89);
    const am = atan2(q.x, q.y).sub(c.real.mul(TAU / 34).mul(sense(7))).div(TAU).mul(N);
    const k = am.floor().add(N.mul(4)).mod(N), fa = am.fract().sub(0.5);
    const h1 = hs(k.add(rn(18).mul(9))), h2 = hs(k.add(3.7)), ext = h2.mul(0.16).add(0.24);
    const Rk = h1.mul(11).add(13).add(c.real.mul(0.4).add(k.mul(2.1)).sin().mul(1.3));
    const ft = fa.add(tri(r.mul(0.9)).sub(0.5).mul(0.035)).div(ext);    // jagged broken ends
    const sd = r.sub(Rk).abs().sub(inv(ft.mul(ft)).max(0).sqrt().mul(h2.mul(1.5).add(1.7)));
    const there = step(ft.abs(), 1).mul(maskDraw(pin.mul(1.5).sub(h1.mul(0.5)).clamp(0, 1), ft.mul(0.5).add(0.5)));
    const body = step(sd, 0).mul(there);
    const rim = stroke(sd.abs(), 0.11).mul(there);
    const bq = vec2(fa.mul(40).fract().sub(0.5).mul(Rk).mul(TAU / 40).div(N), r.sub(Rk)).length();
    const beads = low ? float(0) : stroke(bq, 0.28).mul(step(sd, -0.5));
    // the kick's accent is an occlusion swap: each bar alternate shards go hollow, the egg showing through their outline
    const hollow = is(k.add(c.beat.div(4).floor()).mod(2), 0).mul(kickOn);
    const col = mix(B, W, 0.4).mul(rim).add(H.mul(beads).mul(inv(hollow))).mul(float(0.8).add(cul.mul(0.3)));
    return cutout(col, body.mul(inv(hollow)).max(rim));
  }

  // ------------------------------------------------------------------ FORE: dust beads drifting across (drifts)
  if (layer === "fore") {
    const stroke = strokeAA(fwidth(P.x).mul(1.2).max(0.01));
    const S = 13, pin = io(0.66, 0.8, 0.8, 0.86);
    const q = P.add(vec2(c.real.mul(1.3).mul(sense(13)), c.real.mul(0.45).add(P.x.mul(0.05).add(c.real.mul(0.3)).sin().mul(1.5)))).div(S);
    const id = q.floor(), h = hs(id.dot(vec2(1, 57.3)).add(rn(19).mul(31))), h2 = hs(h.mul(91.7));
    const l = q.fract().sub(0.5).sub(vec2(h2.sub(0.5), hs(h.mul(37.1)).sub(0.5)).mul(0.5)).mul(S);
    const rad = hs(h.mul(53.3)).mul(1.5).add(0.5), dd = l.length();
    const disc = stroke(dd, rad).mul(step(0.5, h)).mul(maskIris(pin.mul(1.6).sub(h2.mul(0.6)).clamp(0, 1), dd.div(rad)));
    const ringL = stroke(dd.sub(rad.mul(0.82)).abs(), 0.1), glint = stroke(l.sub(vec2(-0.3, 0.35).mul(rad)).length(), rad.mul(0.16));
    const full = step(0.86, h).mul(stroke(dd, rad.mul(0.55)));         // a few lit ones among the dark
    const col = mix(mix(B, H2, step(0.7, h)), W, 0.25).mul(ringL).add(W.mul(glint)).add(H.mul(full)).mul(float(0.8).add(cul.mul(0.3)));
    return cutout(col, disc);
  }

  // ------------------------------------------------------------------ THE BEING: the egg (breathes)
  const e = P.sub(vec2(0, CY)).div(c.real.mul(TAU / 9).sin().mul(0.02).add(1));
  const stroke = strokeAA(fwidth(e.x).mul(1.2).max(0.008));
  let col = vec3(0), cover = float(0);
  const lay = (body, lit) => { col = mix(col, lit, body); cover = cover.max(body); };
  // EXIT: the shell breaks into wedge fragments; each drifts off along its own axis, one by one, wearing away from its rim
  const NW = pk(8, 3).add(6), w0 = rn(9).mul(TAU);
  const wk = atan2(e.x, e.y).add(PI).add(w0).div(TAU).mul(NW).floor();
  const wc = wk.add(0.5).mul(TAU).div(NW).sub(PI).sub(w0), dir = vec2(wc.sin(), wc.cos());
  const st = hs(wk.mod(NW).add(rn(10).mul(7))).mul(0.06).add(0.9), dk = ssRaw(st, st.add(0.07), u);
  const pw = e.sub(dir.mul(dk.mul(dk).mul(46)));
  const inW = step(pw.x.mul(dir.y).sub(pw.y.mul(dir.x)).abs(), pw.dot(dir).mul(float(PI).div(NW).tan()));
  // LATE: the crack. Above it the cap is one rigid piece that lifts; the gap between shows what is inside
  const yc = tri(pw.x.div(3.2)).mul(1.6).add(Y0 - 0.8);
  const lift = io(0.7, 0.78, 0.86, 0.9).mul(climb(c).mul(1.2).add(5.2));
  const top = step(yc.add(lift), pw.y), gap = step(yc, pw.y).mul(inv(top));
  const q = vec2(pw.x, pw.y.sub(lift.mul(top)));
  const h = q.y.div(EB), wx = q.x.div(inv(h.mul(0.22)).mul(EA)), d = vec2(wx, h).length();
  const whole = inW.mul(inv(gap)).mul(maskIris(inv(ssRaw(st.add(0.015), st.add(0.075), u)), d.mul(0.9)));
  const front = c.beat.fract().mul(1.6);
  const kl = inv(ssRaw(0, 0.12, d.sub(front).abs())).mul(kickOn).mul(inv(ssRaw(0.8, 1.6, front)));

  // the embryo-sun: a two-armed spiral and rays, seen only through the opened gap
  const sq = pw.sub(vec2(0, lift.mul(0.5).add(Y0))), sr = sq.length(), sa = atan2(sq.x, sq.y).div(TAU);
  const pSun = io(0.72, 0.8, 0.84, 0.88);
  const arm = stroke(sa.mul(2).add(sr.mul(0.5)).sub(c.real.mul(0.3).mul(sense(16))).fract().sub(0.5).abs().mul(1.7), 0.17).mul(step(sr, 2.7)).max(stroke(sr, 0.55));
  const ray = low ? float(0) : stroke(sa.mul(12).fract().sub(0.5).abs().mul(sr).mul(TAU / 12), 0.1).mul(step(3.2, sr)).mul(step(sr, sa.mul(12).floor().add(24).mod(2).mul(1.6).add(4.6).add(cul.mul(2))));
  lay(step(sr, 2.9).max(ray).mul(maskIris(pSun, sr.div(8))), mix(H, W, 0.45).mul(arm).add(mix(H2, W, 0.3).mul(ray)).mul(climb(c).mul(0.5).add(0.8)));

  // the shells: three bead rows round a core, each row beading in from the bottom of the egg to the top, turning against its neighbour
  const s = d.mul(4).floor().min(3), f = d.mul(4).fract();
  const ps = ssRaw(0.15, 0.42, u).mul(1.6).sub(s.add(2).add(pk(11, 3)).mod(3).mul(0.3)).clamp(0, 1);
  const n = s.mul(8).add(8), rot = c.real.mul(0.045).mul(s.mod(2).mul(2).sub(1)).mul(sense(2));
  const tb = atan2(wx, h).add(rot).div(TAU).mul(n), kb = tb.floor();
  const key = kb.add(0.5).div(n).mul(TAU).sub(rot).cos().add(1).mul(0.5);
  const bl = vec2(tb.fract().sub(0.5).mul(TAU * 12.5).div(n).mul(d), f.sub(0.5).mul(3.6)).length();
  const brad = s.mul(0.1).add(0.5);
  const bead = stroke(bl, brad).mul(maskBeads(ps, key)).mul(step(0.5, s));
  const eyeP = stroke(bl, brad.mul(0.4)).mul(io(0.6, 0.74, 2, 3)).mul(is(kb.add(64).mod(2), 0));   // late: alternate beads open as eyes
  const km = kb.add(64).mod(3);
  const bc = H.mul(is(s, 1)).add(B.mul(is(s, 2))).add(mix(A, H2, is(km, 0)).mul(is(s, 3)));
  const shellOn = step(h.add(1).mul(0.5), ps.mul(1.04));
  const lines = stroke(f.min(inv(f)).mul(3.6), 0.06).mul(0.5).add(stroke(inv(d).mul(12), 0.13));
  lay(step(d, 1).mul(shellOn).mul(whole), bc.mul(bead).mul(inv(eyeP)).mul(float(0.85).add(kl).add(climb(c).mul(0.3))).add(mix(A, W, 0.35).mul(lines).mul(float(0.8).add(kl))));

  // the serpent: a helix round the egg, the near half of every coil; drawn tail to head, the coils climbing on their own clock
  const hw = float(1.12).sub(h.mul(h)).max(0.02).sqrt().mul(1.05), xn = wx.div(hw), xc = xn.clamp(-0.999, 0.999);
  const phi = atan2(xc, inv(xc.mul(xc)).sqrt()).div(TAU).mul(sense(1));
  const turns = pk(3, 3).add(3), clm = c.real.mul(0.04).mul(sense(14));
  const k = h.mul(turns).mul(0.5).sub(phi).add(clm);
  const Tn = k.floor().add(0.5).sub(clm).add(phi), sN = Tn.mul(2).div(turns).add(1).mul(0.5);
  const bw = ssRaw(0, 0.12, sN).mul(inv(ssRaw(0.975, 1, sN))).mul(0.24).max(0.001);
  const v = k.fract().sub(0.5).div(bw).abs();
  const pS = io(0.32, 0.48, 0.86, 0.92);
  const sBody = step(v, 1).mul(step(xn.abs(), 0.999)).mul(step(0, sN)).mul(step(sN, 1)).mul(maskDraw(pS, sN)).mul(whole);
  const run = inv(ssRaw(0, 0.05, sN.sub(c.beat.div(4).fract()).abs())).mul(kickOn);   // the kick is a light running up the body
  const eye = stroke(vec2(sN.sub(0.955).mul(60), v.mul(1.6)).length(), 0.5);
  lay(sBody, mix(mix(W, B, 0.2).mul(stripes(Tn, 14, 0.06)).mul(inv(v.mul(v)).max(0).sqrt().mul(0.5).add(0.5)).mul(float(0.9).add(run)), H2, ssRaw(0.74, 0.86, v)).add(H.mul(eye).mul(2)));

  // the crack: white line-art travelling across the egg, then a branch zigzagging down
  const pC = io(0.6, 0.7, 0.89, 0.93), on = step(d, 1).mul(whole);
  let crack = stroke(q.y.sub(yc).abs().mul(0.62), 0.12).mul(maskDraw(pC, pw.x.mul(sense(15)).div(EA).add(1).mul(0.5)));
  if (!low) crack = crack.max(stroke(pw.x.sub(1.6).sub(tri(pw.y.div(2.6)).sub(0.5).mul(2.2)).abs().mul(0.62), 0.1)
    .mul(step(pw.y, yc)).mul(maskDraw(io(0.66, 0.76, 0.88, 0.92), float(Y0).sub(pw.y).div(11))));
  lay(crack.mul(on), W);

  // the seed: first in, alone; last out
  const sd = e.length(), pSeed = io(0, 0.05, 0.985, 0.998);
  lay(stroke(sd, 0.75).mul(maskIris(pSeed, sd.div(0.8))), mix(H, W, 0.6).mul(climb(c).mul(0.4).add(1)));
  return cutout(col, cover);
}
