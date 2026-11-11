// The mandala field's shared numbers and clock curves: the disc, the stalks and the orbs all read the same
// growing edge, so the stalks rise exactly where the painted bands light up.
import { float, vec3, smoothstep, select, mix } from "builtin/tsl";
import { SEC, HUE } from "./lib/trip.js";

export const RADIUS = 90, BANDS = 28, BW = RADIUS / BANDS;
const B0 = SEC.bloom[0];

// The lit radius: a seed dot, 4 m through pulse, then 4 -> 91 across bloom in 16 steps on the bar.
export function growR(sec) {
  const b = sec.sub(B0).div(1.5);
  const st = b.floor().add(smoothstep(0, 0.3, b.fract())).div(16).clamp(0, 1);
  const pre = mix(float(0.7), float(4), smoothstep(SEC.pulse[0], SEC.pulse[0] + 0.5, sec));
  return select(sec.lessThan(B0), pre, st.mul(87).add(4));
}
// The same edge, continuous (no steps): what the stalks rise behind.
export function riseR(sec) { return sec.sub(B0).div(24).mul(87).add(4); }
// During reset the colour fills back from the centre: line-art outside this radius. 999 outside reset.
export function resetR(sec) {
  const b = sec.sub(SEC.reset[0] + 4.5).div(1.5);
  const st = b.floor().add(smoothstep(0, 0.3, b.fract())).div(5).clamp(0, 1);
  const inside = sec.greaterThan(SEC.reset[0]).and(sec.lessThan(SEC.reset[1]));
  return select(inside, st.mul(96), float(999));
}
// Dark by 192.
export function endFade(sec) { return smoothstep(192, 188.5, sec); }
// Overshooting 0 -> 1.
export function backOut(x) {
  const k = x.clamp(0, 1).sub(1);
  return k.mul(k).mul(k).mul(2.70158).add(k.mul(k).mul(1.70158)).add(1);
}
// The body colours (deep blue / violet) and the hot accents, by index.
const V = (h, g = 1) => vec3(h[0] * g, h[1] * g, h[2] * g);
export function base(i) { return select(float(i).mod(2).lessThan(0.5), V(HUE.blue, 1.5), V(HUE.violet, 1.35)); }
export function hot(i) {
  const k = float(i).mod(5);
  return select(k.lessThan(0.5), V(HUE.yellow, 1.5), select(k.lessThan(1.5), V(HUE.magenta, 1.5),
    select(k.lessThan(2.5), V(HUE.green, 1.3), select(k.lessThan(3.5), V(HUE.orange, 1.6), V(HUE.red, 1.6)))));
}
