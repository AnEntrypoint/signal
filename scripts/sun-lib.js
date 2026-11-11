// The sun-eye's shared maths: hue family, ripple, sweep, symmetry order. Channels 60-69 are the sun's.
import { float, vec3, smoothstep, step, mix } from "builtin/tsl";
import { SCORE, SEC, win, pal } from "./lib/trip.js";

export const TAU = 6.28318530718;
export const PI = 3.14159265359;
export const live = (sec) => smoothstep(SCORE.kickFrom - 0.05, SCORE.kickFrom, sec).mul(smoothstep(SCORE.kickTo + 0.05, SCORE.kickTo, sec));
// node pick: i is an integer node 0..n-1, vals plain numbers
export const sel = (i, vals) => { let v = float(vals[0]); for (let k = 1; k < vals.length; k++) v = mix(v, float(vals[k]), step(k - 0.5, i)); return v; };
// one shared swell per phrase
export const breath = (sec) => sec.mul(TAU / 17).add(1.3).sin().mul(0.5).add(0.5); // the sun's own slow clock, out of step with the field's 12 s
// the kick as a ripple leaving the pupil on each beat, 9 m a beat outward; 1 as it passes r
export const ripple = (c, r) => c.beat.sub(float(r).div(9)).fract().mul(-6).exp().mul(live(c.sec));
export const barStep = (c) => c.bar.floor().add(smoothstep(0, 0.3, c.bar.fract()));
// the roll's symmetry order 6, 8 or 12 (the spine's channel 8, shared by every radial piece)
export const order = (c) => sel(c.pick(8, 3), [6, 8, 12]);
// a mirrored clock hand: tm = angle from the top 0..pi (same both sides), clicks on the bars, a half turn in 16 bars
export function sweep(c, tm) {
  const d = tm.div(PI).sub(barStep(c).mul(c.dir).div(16)).add(0.5).fract().sub(0.5).abs();
  return smoothstep(0.2, 0.12, d);
}
// one hue family at a time, swapped on the phrase line; warm by default, the roll moves it; peak opens the rainbow.
// at(x): x = 0..1 position across the family (inner -> outer); hot(): the accent.
export function fam(c) {
  const q = c.phrase.floor().add(8).mod(3);
  const h = float(0.83).add(c.hue.mul(0.05)).add(sel(c.pick(60, 3), [0, 0.03, 0.06])).add(q.mul(0.015)); // fire: yellow -> orange -> red, the roll only nudges it (creator's ref: picture 2's sun)
  const peak = win(c.sec, SEC.peak);
  const hp = mix(h, float(0.83).add(c.hue.mul(0.08)), peak); // peak: the sun's own run yellow -> orange -> red -> violet -> blue
  const span = mix(float(0.12), float(0.22), peak); // peak widens the fire toward magenta, never into green
  const gain = float(0.95).add(smoothstep(155.6, 157.1, c.sec).mul(smoothstep(181, 179.5, c.sec)).mul(0.2));
  const sat = (v) => v.pow(vec3(2.4)); // linear -> keeps the third channel near 0 after sRGB encode, no pastel
  const at = (x) => sat(pal(hp.add(float(x).mul(span)))).mul(gain);
  return { h, peak, gain, at, hot: () => sat(pal(hp.add(0.5))).mul(gain), gold: sat(pal(float(0.88))).mul(gain) };
}
const max3 = (v) => v.x.max(v.y).max(v.z);
// at rest graphite that keeps the form; lit = the colour
export const relight = (col, lit) => mix(vec3(0.045, 0.045, 0.06).mul(max3(col).min(1)), col, lit.clamp(0, 1));
// how lit the sun is right now beyond the travelling window: ascent rests, peak all lit
export const allLit = (c) => win(c.sec, SEC.peak).add(win(c.sec, [180.35, 183], 0.8).mul(0.6)).min(1);
