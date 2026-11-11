// The Eye's shared maths: the lid's opening (0 shut .. 1 open) on the track's seconds, and small helpers.
// Every eye-* material reads the same lidOpen so the rays, the halo and the lashes move with the lid.
import { float, vec3, smoothstep, step } from "builtin/tsl";
import { SCORE } from "./lib/trip.js";

export const TAU = 6.28318530718;
export const LID = { W: 22, H: 19, band: 0.95, z: 2.2 }; // the almond: half-width, half-height (m)
// tone map washes anything far above 1 to pastel: keep hues at about 1.0 peak so they stay flat and saturated
export const hue = (h, g = 1) => vec3(h[0] * g * 0.55, h[1] * g * 0.55, h[2] * g * 0.55);

// 1 while the kick plays
export const live = (sec) => smoothstep(SCORE.kickFrom - 0.05, SCORE.kickFrom, sec).mul(smoothstep(SCORE.kickTo + 0.05, SCORE.kickTo, sec));

const blink = (sec, tb) => float(1).sub(smoothstep(tb - 0.1, tb, sec).mul(float(1).sub(smoothstep(tb + 0.06, tb + 0.3, sec))));

// shut until 2 s; six steps on the bars (3.35 .. 10.85) to 85 %; the last 15 % snaps at 12.35 exactly;
// blinks at 93.35 and 131.6; closes 186 -> 191.7.
export function lidOpen(sec) {
  const u = sec.sub(3.35).div(1.5);
  const stepped = u.floor().add(1).add(smoothstep(0, 0.3, u.fract()).sub(1)).add(1).clamp(0, 6).div(6).mul(0.85);
  const open = stepped.add(step(12.35, sec).mul(0.15));
  return open.mul(blink(sec, 93.35)).mul(blink(sec, 131.6)).mul(float(1).sub(smoothstep(186, 191.7, sec)));
}
