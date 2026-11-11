// THE IRIS: all pattern in polar coords off the trip clock. From the pupil out: white rim, blue rings drifting
// inward, white dot row, magenta band, magenta dot row, twisting b/w fibres, green rim, yellow/orange teeth.
// Neighbour rows counter-rotate; a ring of light leaves the pupil rim on every kick and reaches the edge in a beat.
import { MeshBasicNodeMaterial } from "builtin/three";
import { positionLocal, float, vec3, smoothstep, mix, atan2, length, fwidth } from "builtin/tsl";
import { tripClock, win, SEC, HUE } from "./lib/trip.js";
import { hue, TAU } from "./eye-lib.js";

export function material(ctx) {
  const c = tripClock(ctx);
  const p = positionLocal.xy;
  const r = length(p);
  const an = atan2(p.y, p.x).div(TAU); // turns, -0.5..0.5
  const aa = fwidth(r).mul(1.3).max(0.004);
  const band = (lo, hi) => smoothstep(float(lo).sub(aa), lo, r).mul(float(1).sub(smoothstep(float(hi).sub(aa), hi, r)));
  const dots = (rc, n, rot, rad) => {
    const q = an.add(rot).mul(n).fract().sub(0.5).mul((TAU * rc) / n);
    const d = q.mul(q).add(r.sub(rc).mul(r.sub(rc))).sqrt();
    return float(1).sub(smoothstep(float(rad).sub(aa), rad, d));
  };
  const black = vec3(0, 0, 0);
  let col = black;

  // blue rings: 5 pairs over 5.3..8.3, drifting inward a pair every 2 beats, widths breathing per bar
  const k = 5 / 3.0;
  const ph = r.sub(5.3).mul(k).add(c.beat.mul(0.5));
  const f = ph.fract();
  const duty = float(0.5).add(c.bar.mul(TAU / 2).add(r.mul(0.9)).sin().mul(0.24));
  const w = aa.mul(k);
  const ringM = smoothstep(0, w, f).mul(float(1).sub(smoothstep(duty.sub(w), duty, f)));
  const odd = ph.floor().mul(0.5).fract().mul(2);
  const blue = mix(hue(HUE.blue, 1.7), vec3(0.0, 0.22, 1.0), odd);
  col = mix(col, mix(vec3(0.05, 0.0, 0.16), blue, ringM), band(5.3, 8.3));
  // white rim at the pupil
  col = mix(col, vec3(1.15, 1.15, 1.15), band(4.9, 5.3));
  // every dot is a little target: outer colour, black ring, contrasting centre
  const target = (base, rc, n, rot, rad, outer, inner) => {
    const q = an.add(rot).mul(n).fract().sub(0.5).mul((TAU * rc) / n);
    const d = q.mul(q).add(r.sub(rc).mul(r.sub(rc))).sqrt().div(rad);
    const e = aa.div(rad);
    let o = mix(base, outer, float(1).sub(smoothstep(float(1).sub(e), 1, d)));
    o = mix(o, black, float(1).sub(smoothstep(float(0.68).sub(e), 0.68, d)));
    return mix(o, inner, float(1).sub(smoothstep(float(0.42).sub(e), 0.42, d)));
  };
  // white targets, 1 turn per 2 phrases
  col = target(col, 8.66, 40, c.phrase.mul(0.5), c.kick.mul(0.07).add(0.27), vec3(1.0, 1.0, 1.0), hue(HUE.blue, 2));
  // magenta / violet split band (the white beads ride it), cells turning against the white row
  const cell = an.sub(c.phrase.mul(0.5)).mul(36).fract();
  const cellM = smoothstep(0.03, 0.06, cell).mul(smoothstep(0.5, 0.47, cell));
  const cellV = smoothstep(0.53, 0.56, cell).mul(smoothstep(1.0, 0.97, cell));
  const bandC = hue(HUE.magenta, 1.5).mul(cellM).add(hue(HUE.violet, 1.2).mul(cellV));
  col = mix(col, bandC, band(9.06, 9.94));
  col = mix(col, black, band(9.44, 9.56));
  // magenta targets, 1 turn per phrase the other way
  col = target(col, 10.4, 36, c.phrase.negate(), c.kick.mul(0.08).add(0.33), hue(HUE.magenta, 1.9), hue(HUE.yellow, 1.8));
  // iris fibres: hard b/w, twisting back and forth every 2 phrases, turning slowly
  const twist = r.sub(10.85).mul(0.014).mul(c.phrase.mul(TAU / 2).sin());
  const ff = an.add(twist).add(c.phrase.mul(0.25)).mul(60).fract();
  const fib = smoothstep(0.44, 0.5, ff).mul(smoothstep(1.0, 0.94, ff));
  col = mix(col, vec3(0.95, 0.95, 0.95).mul(fib), band(10.9, 12.75));
  // a row of white triangle teeth on black, pointing inward, turning against the fibres
  const wf = an.sub(c.phrase.mul(0.25)).mul(48).fract().sub(0.5).abs().mul(2);
  const wh = float(13.55).sub(r).div(0.65);
  col = mix(col, vec3(1.0, 1.0, 1.0).mul(smoothstep(0.0, 0.06, float(1).sub(wf).sub(wh))), band(12.9, 13.56));
  // green rim
  col = mix(col, hue(HUE.green, 2.3), band(13.7, 13.97));
  // teeth: yellow triangles in orange, each with a red dot, turning with the magenta row
  const tf = an.sub(c.phrase.mul(0.5)).mul(18).fract().sub(0.5).abs().mul(2);
  const th = r.sub(14.15).div(0.85);
  const tooth = smoothstep(0.0, 0.05, float(1).sub(tf).sub(th));
  col = mix(col, mix(hue(HUE.orange, 1.5), hue(HUE.yellow, 1.7), tooth), band(14.15, 15.01));
  col = mix(col, hue(HUE.red, 1.6), dots(14.42, 18, c.phrase.mul(-0.5), 0.17));

  // the kick ring: born at the pupil rim on the kick, at the outer edge one beat later
  const rk = c.beat.fract().mul(10).add(5);
  const kr = smoothstep(rk.sub(0.55), rk.sub(0.1), r).mul(float(1).sub(smoothstep(rk.add(0.1), rk.add(0.3), r)));
  const power = c.kick.pow(0.35).mul(win(c.sec, SEC.pulse).mul(1.4).add(0.7)).min(1);
  col = mix(col, vec3(2.2, 2.8, 3.2), kr.mul(power));
  col = col.mul(c.kick.mul(0.3).add(1));

  const m = new MeshBasicNodeMaterial();
  m.colorNode = col;
  return m;
}
