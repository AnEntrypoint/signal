// Hex chamber, shared shader helpers.
// near(): 1 once the camera is deep in the tunnel (z < -230), 0 from the field (z > -150): every chamber
// material collapses its geometry while it is 0, so nothing of the chamber shows from outside.
import { cameraPosition, smoothstep, fwidth, abs, float, step, fract, floor, mix, vec3, exp, sin } from "builtin/tsl";
import { HUE } from "./lib/trip.js";
export const near = () => float(1).sub(smoothstep(-230, -150, cameraPosition.z));
export const alive = (g) => step(0.001, g);
// A line about 2 px wide wherever x crosses an integer (screen-space width: true line-art at any distance).
export const pxLine = (x, wide = 1) => {
  const px = fwidth(x).max(1e-5);
  return float(1).sub(smoothstep(px.mul(0.7 * wide), px.mul(0.7 * wide + 1.2), abs(fract(x.add(0.5)).sub(0.5))));
};
export const pxEdge = (x, wide = 1) => {
  const px = fwidth(x).max(1e-5);
  return float(1).sub(smoothstep(px.mul(0.7 * wide), px.mul(0.7 * wide + 1.2), abs(x)));
};
// The kick as a ripple: a front leaving the idol's axis on each beat at 30 m per beat, 1 as it passes a point
// `dist` metres out, settling before the next. Silent through the fill (93.35 .. 96.35).
export const ripple = (c, dist) => {
  const fill = smoothstep(93.3, 93.4, c.sec).mul(step(c.sec, 96.35));
  const kicked = smoothstep(10.8, 10.85, c.sec).mul(float(1).sub(smoothstep(190.85, 190.9, c.sec)));
  return exp(fract(c.beat.sub(float(dist).div(30))).mul(-8)).mul(kicked).mul(float(1).sub(fill));
};
// The shared breath: one swell per phrase, 0..1.
export const breath = (c) => sin(c.sec.mul(6.28318 / 12)).mul(0.5).add(0.5);
// One hue family per phrase: two neighbouring cool hues for the structure, one hot accent pair.
export const family = (c) => {
  const odd = floor(c.phrase.add(64)).mod(2), mx = (p, q) => mix(vec3(...p), vec3(...q), odd);
  return { a: mx(HUE.blue, HUE.green), b: mx(HUE.violet, [0.02, 0.9, 0.55]), hot: mx(HUE.magenta, HUE.orange), hot2: mx([1, 0.05, 0.3], HUE.red) };
};
