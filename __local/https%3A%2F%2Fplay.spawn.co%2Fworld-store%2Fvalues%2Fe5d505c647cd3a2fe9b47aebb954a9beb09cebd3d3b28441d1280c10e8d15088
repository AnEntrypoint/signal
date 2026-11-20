// THE IRIS: all pattern in polar coords off the trip clock. From the pupil out: white rim, rings drifting inward,
// a row of targets, a split band, a second row of targets, twisting b/w fibres, white triangle teeth, a rim line,
// outer teeth. The pattern rests in graphite; colour is a mirrored clock-hand that clicks round on the bars, and the
// kick is a thin ring leaving the pupil rim and reaching the outer edge one beat later, lighting what it passes.
// Neighbour rows crawl opposite ways at different rates (48..96 s a turn). One hue family per phrase (eye-lib fam).
import { MeshBasicNodeMaterial } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, mix, step, atan2, length, fwidth } from "builtin/tsl";
import { tripClock, win, SEC, shown } from "./lib/trip.js";
import { held } from "./field-lib.js";
import { TAU, fam, sweep, relight, gate, breathScale, deal, symN } from "./eye-lib.js";

export function material(ctx) {
  const c = tripClock(ctx);
  const F = fam(c);
  const rot = c.phrase.mul(c.dir).mul(mix(0.7, 1.3, c.rnd(21))); // this roll's turning sense and crawl speed
  const is = (v, i) => step(v.sub(i).abs(), 0.5);
  const nDot = c.pick(22, 3).add(3).mul(symN(c));      // inner target row: 32 / 40 / 48
  const nDot2 = c.pick(23, 3).add(3).mul(symN(c));     // outer target row: 30 / 36 / 42
  const nFib = c.pick(24, 3).add(4).mul(symN(c));     // fibres: 48 / 60 / 72
  const nTooth = c.pick(25, 2).add(1).mul(symN(c));    // outer teeth: 12 / 18 / 24
  const nCell = c.pick(26, 3).add(2).mul(symN(c));    // split band cells: 24 / 36 / 48
  const vMath = c.pick(27, 3);                    // section-maths numbers
  const vCut = c.pick(28, 3);                     // which self-cutout
  const p = positionGeometry.xy;
  const r = length(p);
  const an = atan2(p.y, p.x).div(TAU); // turns, -0.5..0.5
  const aa = fwidth(r).mul(1.3).max(0.004);
  const band = (lo, hi) => smoothstep(float(lo).sub(aa), lo, r).mul(float(1).sub(smoothstep(float(hi).sub(aa), hi, r)));
  const dots = (rc, n, rot, rad) => {
    const q = an.add(rot).mul(n).fract().sub(0.5).mul(float(TAU * rc).div(n));
    const d = q.mul(q).add(r.sub(rc).mul(r.sub(rc))).sqrt();
    return float(1).sub(smoothstep(float(rad).sub(aa), rad, d));
  };
  const black = vec3(0, 0, 0), white = vec3(1, 1, 1);
  let col = black;

  // rings: 5 pairs over 5.3..8.3, drifting inward one pair every 2 bars, widths breathing once a phrase
  const k = 5 / 3.0;
  const ph = r.sub(5.3).mul(k).add(c.bar.mul(0.5));
  const f = ph.fract();
  const duty = float(0.5).add(c.sec.mul(TAU / 12).add(ph.floor().mul(3.14159)).sin().mul(0.2));
  const w = aa.mul(k);
  const ringM = smoothstep(0, w, f).mul(float(1).sub(smoothstep(duty.sub(w), duty, f)));
  const odd = ph.floor().mul(0.5).fract().mul(2);
  col = mix(col, mix(F.A.mul(0.1), mix(F.A, F.B, odd), ringM), band(5.3, 8.3));
  col = mix(col, white.mul(1.1), band(4.9, 5.3));
  // THE SECTION'S MATHS (score.yml maths), drawn in the ring zone and again in the fibre band while the Eye leads:
  // seed: Apollonian gasket by iterated circle inversion, 3 levels: q -> fold to the unit cell, q -> q * k/|q|^2
  let q = p.div(vMath.mul(0.8).add(4.2)), sc = float(1);
  for (let i = 0; i < 3; i++) {
    q = q.mul(0.5).add(0.5).fract().mul(2).sub(1);
    const kk = vMath.mul(0.14).add(1.08).div(q.dot(q).max(0.02));
    q = q.mul(kk); sc = sc.mul(kk);
  }
  const gv = q.y.abs().min(q.length().sub(1).abs()).div(sc);
  const mSeed = smoothstep(0.022, 0.012, gv);
  // pulse: two ring sources 5 m apart (1/3 of the eye), mirrored about x = 0; each a hard wavefront train
  // sin(2pi d/0.7 - 2pi bar); the picture is their XOR: moire hyperbolae where the two trains cross
  const wave = (sx) => smoothstep(-0.12, 0.12, p.sub(vec2(sx, 0)).length().mul(float(TAU).div(vMath.mul(0.18).add(0.55))).sub(c.bar.mul(TAU)).sin());
  const mPulse = wave(vMath.mul(0.8).add(1.7)).sub(wave(vMath.mul(-0.8).sub(1.7))).abs();
  // return: the picture through ONE circle, r' = R^2 / r, the circle shrinking from the dot row to the pupil rim:
  // a polar checker of the inverted radius, so the whole lattice falls back into the point it began as
  const Rinv = mix(8.5, 5.0, smoothstep(180.35, 192, c.sec));
  const ri = Rinv.mul(Rinv).div(r).mul(1.5);
  const mRet = step(ri.fract(), 0.5).mul(step(an.mul(vMath.mul(8).add(16)).add(ri.floor().mul(0.5)).fract(), 0.5));
  const wSeed = win(c.sec, SEC.seed, 0.1), wPulse = win(c.sec, SEC.pulse, 0.1), wRet = win(c.sec, SEC.return, 0.1);
  const leadW = wSeed.add(wPulse).add(wRet).min(1);
  const leadM = mSeed.mul(wSeed).add(mPulse.mul(wPulse)).add(mRet.mul(wRet)).min(1);
  col = mix(col, mix(col, mix(F.A.mul(0.08), mix(F.A, F.B, step(0, p.x.abs().sub(r.mul(0.6)))), leadM), leadW), band(5.3, 8.3));
  // every dot is a little target: outer colour, black ring, contrasting centre
  const target = (base, rc, n, rot, rad, outer, inner) => {
    const q = an.add(rot).mul(n).fract().sub(0.5).mul(float(TAU * rc).div(n));
    const d = q.mul(q).add(r.sub(rc).mul(r.sub(rc))).sqrt().div(rad);
    const e = aa.div(rad);
    let o = mix(base, outer, float(1).sub(smoothstep(float(1).sub(e), 1, d)));
    o = mix(o, black, float(1).sub(smoothstep(float(0.68).sub(e), 0.68, d)));
    return mix(o, inner, float(1).sub(smoothstep(float(0.42).sub(e), 0.42, d)));
  };
  col = target(col, 8.66, nDot, rot.mul(0.25), 0.3, white, F.at(0.1));
  // split band, cells crawling against the white row
  const cell = an.sub(rot.mul(0.125)).mul(nCell).fract();
  const cellM = smoothstep(0.03, 0.06, cell).mul(smoothstep(0.5, 0.47, cell));
  const cellV = smoothstep(0.53, 0.56, cell).mul(smoothstep(1.0, 0.97, cell));
  col = mix(col, F.at(0.2).mul(cellM).add(F.B.mul(0.6).mul(cellV)), band(9.06, 9.94));
  col = mix(col, black, band(9.44, 9.56));
  col = target(col, 10.4, nDot2, rot.mul(1 / 6), 0.36, F.at(0.3).mul(0.9).add(F.B.mul(0.1)), F.hot(0.1));
  // iris fibres: hard b/w, twisting back and forth every 2 phrases, crawling
  const twist = r.sub(10.85).mul(0.014).mul(rot.mul(TAU / 2).sin());
  const ff = an.add(twist).sub(rot.mul(0.125)).mul(nFib).fract();
  const fib = smoothstep(0.44, 0.5, ff).mul(smoothstep(1.0, 0.94, ff));
  col = mix(col, white.mul(0.95).mul(mix(fib, leadM, leadW)), band(10.9, 12.75));
  // white triangle teeth on black, pointing inward, against the fibres
  const wf = an.add(rot.mul(0.125)).mul(symN(c).mul(4)).fract().sub(0.5).abs().mul(2);
  const wh = float(13.55).sub(r).div(0.65);
  const wt = smoothstep(0.0, 0.06, float(1).sub(wf).sub(wh)).mul(band(12.9, 13.56));
  col = mix(col, white.mul(smoothstep(0.0, 0.06, float(1).sub(wf).sub(wh))), band(12.9, 13.56));
  // rim line (the green rim of picture 1 in the blue family)
  col = mix(col, F.hot(0.15), band(13.7, 13.97));
  // outer teeth with a dot each, against the white teeth
  const tf = an.sub(rot.mul(1 / 6)).mul(nTooth).fract().sub(0.5).abs().mul(2);
  const th = r.sub(14.15).div(0.85);
  const tooth = smoothstep(0.0, 0.05, float(1).sub(tf).sub(th));
  col = mix(col, mix(F.acc2, F.hot(0.3), tooth), band(14.15, 15.01));
  col = mix(col, white, dots(14.42, nTooth, rot.mul(-1 / 6), 0.17));

  // the light: the heart is always lit once the eye is open; outside it the mirrored hand and the kick ring
  const rk = c.beat.fract().mul(10).add(5);
  const kr = smoothstep(rk.sub(1.4), rk.sub(0.1), r).mul(float(1).sub(smoothstep(rk.add(0.1), rk.add(0.3), r)));
  const line = smoothstep(rk.sub(0.22), rk.sub(0.06), r).mul(float(1).sub(smoothstep(rk.add(0.06), rk.add(0.22), r)));
  const power = c.kick.pow(0.35).mul(win(c.sec, SEC.pulse).mul(0.5).add(0.5)).min(1);
  const heart = float(1).sub(smoothstep(8.2, 8.35, r));
  const lit = gate(c, heart.max(sweep(c, p.x, p.y)).max(kr.mul(power)), F.peak);
  const base = col;
  col = relight(col, lit);
  // graphite-and-gold (dealt): everything embossed near-black, only the two tooth rows lit, in gold, by the same hand
  const gold = vec3(1.0, 0.7, 0.06);
  const goldCol = vec3(1, 1, 1).mul(base.dot(vec3(0.3, 0.6, 0.1)).mul(0.07)).add(gold.mul(wt.add(tooth.mul(band(14.15, 15.01))).min(1)).mul(lit.mul(0.9).add(0.1)));
  col = mix(col, goldCol, deal(c, 2, true).mul(step(8.35, r)));
  col = mix(col, white.mul(1.15), line.mul(power).mul(0.85).mul(step(10.85, c.sec)));

  const s = breathScale(c.sec);
  const m = new MeshBasicNodeMaterial();
  m.positionNode = positionGeometry.mul(vec3(s, s, 1));
  m.colorNode = col;
  // layer score cutout (wipes out from the pupil) + self-cutout: every 4th 0.4 m ring of the blue zone is a real
  // hole showing the tunnel/rays behind; the holes step one ring inward per bar.
  const hk = r.sub(5.4).div(0.4).floor();
  const bf = c.bar.floor();
  const cutRing = step(hk.add(bf).mod(4), 0.5);                                            // 0: every 4th ring, stepping inward
  const sect = atan2(p.y, p.x.abs()).div(TAU).add(0.25).mul(symN(c).mul(2)).floor();                   // mirrored sectors
  const cutWedge = step(sect.add(bf).mod(4), 0.5);                                         // 1: every 4th wedge, clicking round
  const cutCheck = step(hk.add(sect).add(bf).mod(2), 0.5).mul(step(hk.mod(3), 0.5));       // 2: checker on every 3rd ring
  const cut = cutRing.mul(is(vCut, 0)).add(cutWedge.mul(is(vCut, 1))).add(cutCheck.mul(is(vCut, 2)));
  const hole = step(5.4, r).mul(step(r, 9.0)).mul(cut).mul(step(12.35, c.sec));
  m.opacityNode = held(c, "eye", shown(c, "eye", r.div(15)), 0.9).mul(float(1).sub(hole));
  m.alphaTest = 0.5;
  return m;
}
