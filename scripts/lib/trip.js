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
import { time, float, vec2, vec3, smoothstep, step, audioSpectrum, select, mix, positionWorld, atan } from "builtin/tsl";
import SCORE from "./data/score.yml";
import ENERGY from "./data/energy.yml"; // the track measured bar by bar (tools/analyse-track.py)
// KICK RUNS: the stretches of bars where the measured bass really carries a kick (bass >= 0.6),
// so no pulse ever fires where the track has no beat. Recomputed from energy.yml for any track.
export const KICK_RUNS = (() => { const r = []; let a = -1; ENERGY.bars.forEach((b, i) => { const on = b[1] >= 0.6; if (on && a < 0) a = i; if (!on && a >= 0) { r.push([ENERGY.firstBeat + a * ENERGY.bar, ENERGY.firstBeat + i * ENERGY.bar]); a = -1; } }); if (a >= 0) r.push([ENERGY.firstBeat + a * ENERGY.bar, ENERGY.firstBeat + ENERGY.bars.length * ENERGY.bar]); return r; })();

export { SCORE };
export const SEC = SCORE.sections;
export const BPS = SCORE.bpm / 60;

export function tripClock(ctx) {
  const t0 = ctx.param("t0", 0), on = ctx.param("on", 0);
  const rolled = time.sub(t0).add(3600).mod(3600).min(SCORE.duration);
  const sec = select(on.greaterThan(0.5), rolled, time.mod(SCORE.duration));
  const beat = sec.sub(SCORE.firstBeat).mul(BPS);
  // the kick only where the measured track has one: the director (stage.js) hands the current/next kick run
  // as params k0 / k1 (seconds, from KICK_RUNS); idle or none: no kick at all
  const k0 = ctx.param("k0", -1), k1 = ctx.param("k1", -1);
  const live = smoothstep(k0.sub(0.05), k0, sec).mul(smoothstep(k1.add(0.05), k1, sec));
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
    sec, beat, on, live, bar: beat.div(4), phrase: beat.div(32),
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
// PIECE BY PIECE: on top of the radial lag, every fragment carries its own delay from a cell of its layer's own
// pattern (hex-ish cells, rings or sectors, sized per layer), so a layer enters and leaves one piece at a time across
// ~2 bars and its neighbours' pieces cross through each other. Never the whole layer on one frame.
const salt = (name) => { let h = 7; for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) % 9973; return h; };
function pieceLag(name) {
  const h = salt(name), kind = h % 3, size = 2.5 + (h % 5) * 1.5; // metres
  const P = positionWorld;
  let id;
  if (kind === 0) { const q = P.xz.add(P.y.mul(0.5)).div(size); id = q.floor().add(vec2(q.y.floor().mul(0.5).fract(), 0)).floor(); id = id.x.add(id.y.mul(57)); }
  else if (kind === 1) id = P.sub(vec3(0, 15, 0)).length().div(size).floor();                 // rings
  else id = atan(P.x, P.z.sub(P.y.mul(0.3))).div(6.2831853).add(0.5).mul(12 + (h % 4) * 4).floor(); // sectors
  const r = id.add(h * 0.731).sin().mul(43758.5453).fract();
  return r.mul(SCORE.piece ?? 2.25);
}
export function shown(c, name, d = 0) {
  const lag = float(d).clamp(0, 1).mul(SCORE.wipe).add(pieceLag(name));
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

// A VISION BEING's cutout: 1 while this being's dealt slot plays (params vw0 / vw1, written by the director),
// opening outward from its centre over 1.5 s as an iris and eaten away the same way at the slot's end.
// d = 0..1, this fragment's distance from the being's centre over its radius. Not dealt (vw1 < 0): 0.
// Testing by hand: set params t0 / on / seed AND vw0 / vw1 on the being's objects.
export function visionShown(ctx, c, d = 0) {
  const a = ctx.param("vw0", -1), b = ctx.param("vw1", -1);
  const s = c.sec.sub(float(d).clamp(0, 1).mul(1.5));
  return smoothstep(a, a.add(0.2), s).mul(smoothstep(b.add(0.2), b, s)).mul(b.greaterThan(0).select(float(1), float(0))).mul(c.on);
}
// how far into its slot the being is, 0..1 (its own clock for drawing itself in)
export function visionU(ctx, c) {
  const a = ctx.param("vw0", -1), b = ctx.param("vw1", -1);
  return c.sec.sub(a).div(b.sub(a).max(0.01)).clamp(0, 1);
}

// ---- ENTRANCES AND EXITS: an element draws itself in and takes itself out, one by one, through a mask
// that MEANS something. p = 0..1 progress (0 hidden, 1 whole); every mask returns 0/1 cover (cutout, alphaTest .5).
// stage(c, from, to, inBars, outBars): an element's own progress, rising over inBars after `from`
// and falling over outBars before `to` (seconds; bars of 1.5 s). Stagger elements by a bar or two each.
export function stage(c, from, to, inBars = 2, outBars = 2) {
  const b = 60 / SCORE.bpm * 4;
  return smoothstep(from, from + inBars * b, c.sec).mul(smoothstep(to, to - outBars * b, c.sec));
}
// iris: opens from the centre outward (d = distance from centre / radius); the eye opening, a pupil dilating
export const maskIris = (p, d) => step(float(d), float(p).mul(1.02));
// lid: two edges closing on a horizontal line (y = -1..1 across the element): a blink, a mouth
export const maskLid = (p, y) => step(float(y).abs(), float(p).mul(1.02));
// clock: a hand sweeping round from the top (a = angle -pi..pi from +y): a sundial, a moon phase
export const maskClock = (p, a) => step(float(a).div(6.28318).add(0.5).fract(), float(p).mul(1.001));
// eclipse: a dark disc of radius 1 sliding across from side `dir` (+1/-1); x, y in element radii: an occultation
export const maskEclipse = (p, x, y, dir = 1) => step(float(1), vec2(float(x).sub(float(p).mul(2.2 * dir)), float(y)).length()); // p 0: the dark disc covers it, 1: slid clear
// beads: element ids (0..1 hash per bead / dot / cell) light one after another in order k (0..1 along the row)
export const maskBeads = (p, k) => step(float(k), float(p).mul(1.02));
// line-draw: a stroke draws itself along its own length u (0..1), the pen's head a bright nib
export const maskDraw = (p, u) => step(float(u), float(p).mul(1.01));
export const nib = (p, u, w = 0.02) => smoothstep(w, 0, float(u).sub(float(p)).abs());
// what the track gives right now, live on every listener: the overtones climbing = culmination
export const climb = (c) => c.high.mul(1.6).clamp(0, 1);
