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
import { time, float, vec2, vec3, smoothstep, audioSpectrum, select, mix } from "builtin/tsl";
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
  // THE ROLL'S SEED: a new integer every roll (0 idle), the same on every machine in the room.
  // c.rnd(n): 0..1, fixed for this roll, different per channel n. Channels 1-9 are the spine's; a piece uses 10+.
  // c.hue: this roll's palette offset (add it inside every pal()). c.dir: +1 or -1, this roll's turning sense.
  // c.pick(n, k): an integer 0..k-1 for this roll (a symmetry count, a variant), as a float node.
  const seed = ctx.param("seed", 0);
  const rnd = (n) => seed.add(1).mul(n * 12.9898 + 78.233).sin().mul(43758.5453).fract();
  const pick = (n, k) => rnd(n).mul(k).floor().min(k - 1);
  return {
    seed, rnd, pick, hue: rnd(1), dir: rnd(2).step(0.5).mul(2).sub(1),
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

// THE LAYER SCORE. shown(c, "tunnel", d): 0 or 1 (soft 0.2 s edge), is this layer's surface shown here, now.
// d = 0..1, this fragment's distance from the composition centre over the layer's own radius (0 at the centre):
// the show and the hide both travel outward over SCORE.wipe seconds, so a layer opens like an iris and is
// eaten away the same way. Use it as the material's cutout (m.opacityNode = shown(...); m.alphaTest = 0.5),
// never as a fade to black: a hidden layer must uncover what stands behind it.
export function shown(c, name, d = 0) {
  const lag = float(d).clamp(0, 1).mul(SCORE.wipe);
  let v = float(0);
  for (const [a, b] of SCORE.layers[name]) {
    v = v.add(smoothstep(a, a + 0.2, c.sec.sub(lag)).mul(smoothstep(b + 0.2, b, c.sec.sub(lag))));
  }
  return v.clamp(0, 1);
}
// A lens number ("bulge" | "swirl" | "fold" | "hyper" | "droste") at this moment, eased 1.5 s across section lines.
export function lens(c, key) {
  let v = float(0);
  for (const name in SCORE.lens) v = v.add(win(c.sec, SEC[name], 1.5).mul(SCORE.lens[name][key]));
  return v;
}
// THE BENT CAMERA. bendUv(c, uv, aspect): where on the undistorted frame this screen pixel reads from.
// Bulge breathes with the phrase and kicks 4% on the beat; the swirl twists the centre, not the edge.
export function bendUv(c, uv, aspect = 1.78) {
  const breath = c.sec.mul(6.28318 / 12).sin().mul(0.5).add(0.5);
  const k = lens(c, "bulge").mul(mix(0.6, 1.4, c.rnd(3))).mul(breath.mul(0.4).add(0.8)).add(c.kick.mul(0.04));
  const p0 = uv.sub(0.5).mul(vec2(aspect, 1));
  const r = p0.length();
  const a = lens(c, "swirl").mul(c.dir).mul(mix(0.6, 1.5, c.rnd(4))).mul(float(1).sub(r.mul(1.3)).clamp(0, 1)).mul(c.sec.mul(6.28318 / 24).sin());
  const p1 = vec2(p0.x.mul(a.cos()).sub(p0.y.mul(a.sin())), p0.x.mul(a.sin()).add(p0.y.mul(a.cos())));
  const p2 = p1.div(float(1).add(k.mul(r.mul(r)).mul(1.6)));
  // hyperbolic: Mobius slide of the Poincare disc, w = (z + a) / (1 + conj(a) z), centre held
  const h = lens(c, "hyper").mul(mix(0.7, 1.3, c.rnd(5))), th = c.sec.mul(6.28318 / 24).mul(c.dir).add(c.rnd(6).mul(6.28318));
  const ax = h.mul(th.cos()), ay = h.mul(th.sin());
  const zx = p2.x.mul(1.6), zy = p2.y.mul(1.6);
  const nx = zx.add(ax), ny = zy.add(ay);
  const dx = float(1).add(ax.mul(zx)).add(ay.mul(zy)), dy = ax.mul(zy).sub(ay.mul(zx));
  const dd = dx.mul(dx).add(dy.mul(dy)).max(0.02);
  const p3 = vec2(nx.mul(dx).add(ny.mul(dy)).div(dd).sub(ax), ny.mul(dx).sub(nx.mul(dy)).div(dd).sub(ay)).div(1.6);
  // droste: log-polar recursion, radius wrapped into one x4 octave that zooms through once per phrase
  const r3 = p3.length().max(0.0005);
  const oct = r3.log().div(1.3863).add(c.sec.div(12)).fract();
  const p4 = mix(p3, p3.div(r3).mul(oct.mul(1.3863).exp().mul(0.12)), lens(c, "droste"));
  const px = mix(p4.x, p4.x.abs().mul(c.rnd(7).step(0.5).mul(2).sub(1)), lens(c, "fold").mul(smoothstep(0.0, 0.02, p4.x.abs())));
  return vec2(px, p4.y).div(vec2(aspect, 1)).add(0.5);
}
