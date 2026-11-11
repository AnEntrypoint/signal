// THE IRIS: all pattern in polar coords off the trip clock. From the pupil out: white rim, rings drifting inward,
// a row of targets, a split band, a second row of targets, twisting b/w fibres, white triangle teeth, a rim line,
// outer teeth. The pattern rests in graphite; colour is a mirrored clock-hand that clicks round on the bars, and the
// kick is a thin ring leaving the pupil rim and reaching the outer edge one beat later, lighting what it passes.
// Neighbour rows crawl opposite ways at different rates (48..96 s a turn). One hue family per phrase (eye-lib fam).
import { MeshBasicNodeMaterial } from "builtin/three";
import { positionGeometry, float, vec3, smoothstep, mix, step, atan2, length, fwidth } from "builtin/tsl";
import { tripClock, win, SEC, shown } from "./lib/trip.js";
import { TAU, fam, sweep, relight, gate, breathScale } from "./eye-lib.js";

export function material(ctx) {
  const c = tripClock(ctx);
  const F = fam(c);
  const p = positionGeometry.xy;
  const r = length(p);
  const an = atan2(p.y, p.x).div(TAU); // turns, -0.5..0.5
  const aa = fwidth(r).mul(1.3).max(0.004);
  const band = (lo, hi) => smoothstep(float(lo).sub(aa), lo, r).mul(float(1).sub(smoothstep(float(hi).sub(aa), hi, r)));
  const dots = (rc, n, rot, rad) => {
    const q = an.add(rot).mul(n).fract().sub(0.5).mul((TAU * rc) / n);
    const d = q.mul(q).add(r.sub(rc).mul(r.sub(rc))).sqrt();
    return float(1).sub(smoothstep(float(rad).sub(aa), rad, d));
  };
  const black = vec3(0, 0, 0), white = vec3(1, 1, 1);
  let col = black;

  // rings: 5 pairs over 5.3..8.3, drifting inward one pair every 2 bars, widths breathing once a phrase
  const k = 5 / 3.0;
  const ph = r.sub(5.3).mul(k).add(c.bar.mul(0.5));
  const f = ph.fract();
  const duty = float(0.5).add(c.phrase.mul(TAU).add(r.mul(0.9)).sin().mul(0.2));
  const w = aa.mul(k);
  const ringM = smoothstep(0, w, f).mul(float(1).sub(smoothstep(duty.sub(w), duty, f)));
  const odd = ph.floor().mul(0.5).fract().mul(2);
  col = mix(col, mix(F.A.mul(0.1), mix(F.A, F.B, odd), ringM), band(5.3, 8.3));
  col = mix(col, white.mul(1.1), band(4.9, 5.3));
  // every dot is a little target: outer colour, black ring, contrasting centre
  const target = (base, rc, n, rot, rad, outer, inner) => {
    const q = an.add(rot).mul(n).fract().sub(0.5).mul((TAU * rc) / n);
    const d = q.mul(q).add(r.sub(rc).mul(r.sub(rc))).sqrt().div(rad);
    const e = aa.div(rad);
    let o = mix(base, outer, float(1).sub(smoothstep(float(1).sub(e), 1, d)));
    o = mix(o, black, float(1).sub(smoothstep(float(0.68).sub(e), 0.68, d)));
    return mix(o, inner, float(1).sub(smoothstep(float(0.42).sub(e), 0.42, d)));
  };
  col = target(col, 8.66, 40, c.phrase.mul(0.25), 0.3, white, F.at(0.1));
  // split band, cells crawling against the white row
  const cell = an.sub(c.phrase.mul(0.125)).mul(36).fract();
  const cellM = smoothstep(0.03, 0.06, cell).mul(smoothstep(0.5, 0.47, cell));
  const cellV = smoothstep(0.53, 0.56, cell).mul(smoothstep(1.0, 0.97, cell));
  col = mix(col, F.at(0.2).mul(cellM).add(F.B.mul(0.6).mul(cellV)), band(9.06, 9.94));
  col = mix(col, black, band(9.44, 9.56));
  col = target(col, 10.4, 36, c.phrase.mul(1 / 6), 0.36, F.at(0.3).mul(0.9).add(F.B.mul(0.1)), F.hot(0.1));
  // iris fibres: hard b/w, twisting back and forth every 2 phrases, crawling
  const twist = r.sub(10.85).mul(0.014).mul(c.phrase.mul(TAU / 2).sin());
  const ff = an.add(twist).sub(c.phrase.mul(0.125)).mul(60).fract();
  const fib = smoothstep(0.44, 0.5, ff).mul(smoothstep(1.0, 0.94, ff));
  col = mix(col, white.mul(0.95).mul(fib), band(10.9, 12.75));
  // white triangle teeth on black, pointing inward, against the fibres
  const wf = an.add(c.phrase.mul(0.125)).mul(48).fract().sub(0.5).abs().mul(2);
  const wh = float(13.55).sub(r).div(0.65);
  col = mix(col, white.mul(smoothstep(0.0, 0.06, float(1).sub(wf).sub(wh))), band(12.9, 13.56));
  // rim line (the green rim of picture 1 in the blue family)
  col = mix(col, F.hot(0.15), band(13.7, 13.97));
  // outer teeth with a dot each, against the white teeth
  const tf = an.sub(c.phrase.mul(1 / 6)).mul(18).fract().sub(0.5).abs().mul(2);
  const th = r.sub(14.15).div(0.85);
  const tooth = smoothstep(0.0, 0.05, float(1).sub(tf).sub(th));
  col = mix(col, mix(F.acc2, F.hot(0.3), tooth), band(14.15, 15.01));
  col = mix(col, white, dots(14.42, 18, c.phrase.mul(-1 / 6), 0.17));

  // the light: the heart is always lit once the eye is open; outside it the mirrored hand and the kick ring
  const rk = c.beat.fract().mul(10).add(5);
  const kr = smoothstep(rk.sub(1.4), rk.sub(0.1), r).mul(float(1).sub(smoothstep(rk.add(0.1), rk.add(0.3), r)));
  const line = smoothstep(rk.sub(0.22), rk.sub(0.06), r).mul(float(1).sub(smoothstep(rk.add(0.06), rk.add(0.22), r)));
  const power = c.kick.pow(0.35).mul(win(c.sec, SEC.pulse).mul(0.5).add(0.5)).min(1);
  const heart = float(1).sub(smoothstep(8.2, 8.35, r));
  const lit = gate(c, heart.max(sweep(c, p.x, p.y)).max(kr.mul(power)), F.peak);
  col = relight(col, lit);
  col = mix(col, white.mul(1.15), line.mul(power).mul(0.85).mul(step(10.85, c.sec)));

  const s = breathScale(c.sec);
  const m = new MeshBasicNodeMaterial();
  m.positionNode = positionGeometry.mul(vec3(s, s, 1));
  m.colorNode = col;
  // layer score cutout (wipes out from the pupil) + self-cutout: every 4th 0.4 m ring of the blue zone is a real
  // hole showing the tunnel/rays behind; the holes step one ring inward per bar.
  const k = r.sub(5.4).div(0.4).floor();
  const hole = step(5.4, r).mul(step(r, 9.0)).mul(step(k.add(c.bar.floor()).mod(4), 0.5)).mul(step(12.35, c.sec));
  m.opacityNode = shown(c, "eye", r.div(15)).mul(float(1).sub(hole));
  m.alphaTest = 0.5;
  return m;
}
