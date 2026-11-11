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
// Three families; the roll's seed (channel 40) picks where the cycle starts, each phrase steps to the next.
export const family = (c) => {
  const i = floor(c.phrase.add(64)).add(c.pick(40, 3)).mod(3);
  const mx = (p, q, r) => mix(mix(vec3(...p), vec3(...q), step(0.5, i)), vec3(...r), step(1.5, i));
  // graphite-and-gold: one roll in three the structure is embossed graphite and only gold is lit
  const gold = step(floor(c.rnd(42).mul(89)).mod(3), 0.5), gg = (v, q) => mix(v, vec3(...q), gold);
  return {
    a: gg(mx(HUE.green, HUE.blue, HUE.violet), [0.09, 0.09, 0.1]), b: gg(mx([0.02, 0.9, 0.55], HUE.violet, HUE.magenta), [0.12, 0.11, 0.1]),
    hot: gg(mx(HUE.orange, HUE.magenta, [1, 0.8, 0.04]), [1, 0.7, 0.05]), hot2: gg(mx(HUE.red, [1, 0.05, 0.3], HUE.orange), [1, 0.48, 0.02]),
  };
};
// The trope deal: this roll's hand, 0..2. dealt(c, [1, 0, 1]) is 1 when the roll's hand shows that trope.
export const deal = (c) => floor(c.rnd(41).mul(97)).mod(3);
export const dealt = (c, m) => { const k = deal(c); return mix(mix(float(m[0]), float(m[1]), step(0.5, k)), float(m[2]), step(1.5, k)); };
// symmetry-order: the whole trip's radial order this roll, 6, 8 or 12
export const order = (c) => { const s = c.pick(8, 3); return s.mul(2).add(6).add(step(1.5, s).mul(2)); };
// this roll's speed for channel n: 0.7 .. 1.3 of the written crawl, signed by the roll's turning sense
export const pace = (c, n) => mix(0.7, 1.3, c.rnd(n)).mul(c.dir);
