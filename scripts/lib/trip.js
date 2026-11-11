// The shared clock and palette of the trip, as shader nodes. Every scripted material, the sky and the look
// import from here so all of them move on the same beat of the same track.
//   import { tripClock, win, SEC, pal, stripes } from "./lib/trip.js"   (from scripts/)
//   const c = tripClock(ctx);            // ctx = the material's / look's ctx, sky: pass `world`
//   c.sec    seconds into the track (idle: free-runs the 198 s loop silently)
//   c.beat   beats since the first beat (float, 160 bpm). c.bar = beat/4, c.phrase = beat/32
//   c.kick   0..1, 1 on each kick, gone before the next (0 outside the kicked part of the track)
//   c.half   same on every 2nd beat (the snare's place), c.barHit on each bar's first beat
//   c.bass / c.high  what this player actually hears right now (0..1), for extra life
//   win(c.sec, SEC.flight)  -> 0..1 window, 1 inside that section, 1.5 s soft edges (or win(sec,[a,b],fade))
// A param write is how the roll starts: the director writes params.t0 (seconds on the shader `time` clock)
// and params.on (1 rolling, 0 idle) to every object tagged "trip", to look.params and to sky.params.
import { time, float, vec3, smoothstep, audioSpectrum, select } from "builtin/tsl";
import SCORE from "./data/score.yml";

export { SCORE };
export const SEC = SCORE.sections;
export const BPS = SCORE.bpm / 60;

export function tripClock(ctx) {
  const t0 = ctx.param("t0", 0), on = ctx.param("on", 0);
  const rolled = time.sub(t0).add(3600).mod(3600).min(SCORE.duration);
  const sec = select(on.greaterThan(0.5), rolled, time.mod(SCORE.duration));
  const beat = sec.sub(SCORE.firstBeat).mul(BPS);
  const live = smoothstep(SCORE.kickFrom - 0.05, SCORE.kickFrom, sec).mul(smoothstep(SCORE.kickTo + 0.05, SCORE.kickTo, sec));
  const env = (b, k) => b.fract().mul(k).negate().exp().mul(live);
  return {
    sec, beat, on, bar: beat.div(4), phrase: beat.div(32),
    kick: env(beat, 4.5), half: env(beat.div(2).add(0.5), 6), barHit: env(beat.div(4), 6),
    bass: audioSpectrum(0.08), high: audioSpectrum(0.75),
  };
}

// 1 inside [a, b], soft edges of `fade` seconds.
export function win(sec, range, fade = 1.5) {
  return smoothstep(range[0] - fade * 0.5, range[0] + fade * 0.5, sec).mul(smoothstep(range[1] + fade * 0.5, range[1] - fade * 0.5, sec));
}

// The trip's rainbow: fully saturated, never pastel, never grey. t is any float; one turn per 1.0.
export function pal(t) {
  const c = float(t).add(vec3(0.0, 0.33, 0.67)).mul(6.28318).cos().mul(0.5).add(0.5);
  const lo = c.x.min(c.y).min(c.z), hi = c.x.max(c.y).max(c.z);
  return c.sub(lo).div(hi.sub(lo).add(0.001)).pow(vec3(1.4)); // pure hue: one channel 1, one 0
}
// Hard black/white (or any two-tone) bands: 0 or 1, n bands per unit of x, antialias width w.
export function stripes(x, n, w = 0.02) {
  const f = float(x).mul(n).fract();
  return smoothstep(0.5 - w, 0.5, f).mul(smoothstep(1.0, 1.0 - w, f));
}
// The fixed hues, linear RGB, for pieces that need a named colour (multiply by 2..6 to bloom).
export const HUE = {
  blue: [0.05, 0.12, 1.0], violet: [0.45, 0.05, 1.0], magenta: [1.0, 0.05, 0.6], red: [1.0, 0.08, 0.05],
  orange: [1.0, 0.38, 0.02], yellow: [1.0, 0.85, 0.05], green: [0.1, 1.0, 0.15], cyan: [0.05, 0.9, 1.0], white: [1, 1, 1],
};
