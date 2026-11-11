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
import { time, float, vec2, vec3, smoothstep, step, audioSpectrum, select, mix, positionWorld, atan, atan2 } from "builtin/tsl";
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
  const real = select(on.greaterThan(0.5), rolled, time.mod(SCORE.duration));
  // THE DECK (lib/deck.js): sec is SCENE time, what every layer, lens and window reads; real is the track's time
  // (beat, kick, vision slots). Each drop stretch maps to its dealt scene: ds<i> its start, dr<i> its rate.
  let sec = real, seamD = float(99);
  SCORE.deck.segments.forEach(([a, b], i) => {
    const s0 = ctx.param("ds" + i, a), r = ctx.param("dr" + i, 1);
    const inS = step(a, real).mul(float(1).sub(step(b, real)));
    sec = sec.add(inS.mul(s0.add(real.sub(a).mul(r)).sub(real)));
    seamD = seamD.min(real.sub(a).abs()).min(real.sub(b).abs());
  });
  seamD = select(on.greaterThan(0.5), seamD, float(99));
  // a vision being lives on the track's own clock: its slot (vw0/vw1) is real seconds, never a dealt scene's
  if (ctx.params && ctx.params.vw0 !== undefined) { sec = real; seamD = float(99); }
  const beat = real.sub(SCORE.firstBeat).mul(BPS);
  // the kick only where the measured track has one: the director (stage.js) hands the current/next kick run
  // as params k0 / k1 (seconds, from KICK_RUNS); idle or none: no kick at all
  const k0 = ctx.param("k0", -1), k1 = ctx.param("k1", -1);
  const live = smoothstep(k0.sub(0.05), k0, real).mul(float(1).sub(smoothstep(k1, k1.add(0.05), real)));
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
    sec, real, seamD, beat, on, live, bar: beat.div(4), phrase: beat.div(32),
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
  if (kind === 0) { // circuit traces: current routed out from the centre on 45-degree lanes (PCB octagonal
    // distance), each lane its own pace, so pieces light along a trace, never as square blocks
    const q = P.sub(vec3(0, 15, 0)), ax = q.x.abs(), az = q.z.sub(q.y.mul(0.3)).abs();
    const oct = ax.max(az).add(ax.min(az).mul(0.4142));
    const lane = atan(q.x, q.z.sub(q.y.mul(0.3))).div(6.2831853).add(0.5).mul(16 + (h % 3) * 8).floor();
    const run = lane.mul(1.618).fract().mul(0.6).add(0.7);
    // ordered, not hashed: each lane's current reaches a segment in turn, lanes staggered a little
    const seg = oct.div(size * 2).mul(run).floor();
    return seg.div(14).add(lane.mul(0.37).fract().mul(0.25)).fract().mul(SCORE.piece ?? 2.25); }
  else if (kind === 1) id = P.sub(vec3(0, 15, 0)).length().div(size).floor();                 // rings
  else id = atan(P.x, P.z.sub(P.y.mul(0.3))).div(6.2831853).add(0.5).mul(12 + (h % 4) * 4).floor(); // sectors
  const r = id.add(h * 0.731).sin().mul(43758.5453).fract();
  return r.mul(SCORE.piece ?? 2.25);
}
const SCENE_STARTS = new Set(Object.values(SCORE.sections).map(([a]) => a));
// a ring's own turn, 0..1: the radius d cut into 14 rings, each ring's place in the order hashed by layer and roll,
// with 20% of the plain outward order kept so a thing still grows from its heart
function shuffleBand(c, name, d) {
  const dd = float(d).clamp(0, 1), q = dd.mul(14).floor();
  const hsh = q.add(salt(name) % 97).add(c.seed.mul(0.618)).mul(12.9898).sin().mul(43758.5453).fract();
  return hsh.mul(0.8).add(dd.mul(0.2));
}
export function shown(c, name, d = 0) {
  // a dealt seam: pieces leave before it and arrive after it, never all at once (40% stand at the seam itself)
  // no piece pops whole: each one closes along its own radius (d), outside in, as the seam nears, and opens the
  // same way after it, so a sector or ring is seen shrinking away, never cut out of the picture in one frame
  // ONE BY ONE: every layer has its own turn in the handover (its place in the order comes from its name), and
  // within its turn each piece closes along its own radius, outside in. Before the drop the layers leave in order,
  // after it the next scene's layers arrive in order; about a third of them stand through the drop itself.
  const turn = ((String(name).split("").reduce((q, ch) => q * 31 + ch.charCodeAt(0), 7) % 997) / 997);
  // 2026-11-11 (lanmower saw a whole scene flip in one frame at the drop): the scene clock jumps at the seam,
  // so NOTHING may stand on it. Every piece is out by the seam itself and the next scene builds out of the dark;
  // the companion worms and the bend carry the eye across that half-second.
  // 2026-11-11 (watched seed 9 at 1:36: the old scene snapped off in ~0.3 s and a worm sat alone on black ~2 s):
  // each piece now fades over ~1.1 s on its own turn, the turns spread over ~2 s, and only the seam instant is fully dark
  // 11-11 14:42 creator: "there are still wipe transitions rather than progressive changes". The old lag ran straight
  // out along d (the radius), so every layer opened as one travelling iris front. Now d is cut into 14 rings and each
  // ring draws its own seeded turn (per layer, per roll): rings and pieces light one at a time in a shuffled order,
  // a faint pull outward kept so it still grows from its heart, and each eases in over ~1.2 s instead of snapping.
  const band = shuffleBand(c, name, d);
  const seamO = pieceLag(name).div(SCORE.piece ?? 2.25).mul(0.25).add(band.mul(0.35)).add(turn * 0.45).mul(0.3);
  const seamGate = smoothstep(seamO, seamO.add(0.18), c.seamD.div(SCORE.deck.seam).clamp(0, 1));
  const lag = band.mul(SCORE.wipe).add(pieceLag(name));
  let v = float(0);
  for (const [a0, b] of SCORE.layers[name]) {
    // a layer that opens its scene is already standing when the scene is dealt in: its own entry wipe would
    // leave every dealt scene black for its first bars. The seam gate above brings it in piece by piece instead.
    const a = SCENE_STARTS.has(a0) ? a0 - SCORE.wipe - (SCORE.piece ?? 2.25) - 0.2 : a0;
    v = v.add(smoothstep(a, a + 1.2, c.sec.sub(lag)).mul(smoothstep(b + 1.2, b, c.sec.sub(lag))));
  }
  return v.clamp(0, 1).mul(seamGate).mul(drift(c, name, d));
}
// DRIFT (2026-11-11, creator: longer scenes, elements removed and introduced unpredictably, never suddenly):
// inside its window every layer breathes in and out of the dark on its own slow, seeded tide. When its tide
// ebbs, its pieces sink into black one at a time (the outer and the odd ones first, its heart last); when it
// flows they come back the same way. Never more than 80% of a layer goes; never two layers on one tide.
function drift(c, name, d) {
  const h = salt(name);
  const p1 = 17 + (h % 7) * 4.5, p2 = 29 + (h % 5) * 6.5;             // seconds per tide, per layer: 17..44 s
  const ph = c.rnd(20 + (h % 40)).mul(6.2831853);
  const tide = c.sec.mul(6.2831853 / p1).add(ph).sin().mul(0.6)
    .add(c.sec.mul(6.2831853 / p2).sub(ph.mul(1.7)).sin().mul(0.4)).mul(0.5).add(0.5);   // 0..1, unpredictable
  const ebb = smoothstep(0.55, 0.12, tide).mul(0.8);                   // how much of the layer is gone
  const rank = pieceLag(name).div(SCORE.piece ?? 2.25).mul(0.65).add(float(1).sub(shuffleBand(c, name, d)).mul(0.35));
  return smoothstep(ebb, ebb.add(0.04), rank);
}
// A lens number ("bulge" | "swirl" | "fold" | "hyper" | "droste") at this moment. The lens is the scene's own:
// one scene's bend drifts into the next over 8 s; a floor of hyperbolic slide always stays.
export function lens(c, key) {
  let v = float(0);
  // 2026-11-11 (lanmower: more view distortion, no hard cuts): one bend drifts into the next over 8 s
  for (const name in SCORE.lens) v = v.add(win(c.sec, SEC[name], 8).mul(SCORE.lens[name][key]));
  // the scene clock jumps at a dealt seam: the scene's own bend eases out before it and back in after it,
  // so the view never snaps from one bend to another
  v = v.mul(smoothstep(0.3, 4, c.seamD));
  return v.add(key === "hyper" ? 0.14 : 0);   // the hyperbolic slide never fully lets go
}
// THE BENT CAMERA. bendUv(c, uv, aspect): where on the undistorted frame this screen pixel reads from.
// Bulge breathes with the phrase and kicks 4% on the beat; the swirl twists the centre, not the edge.
export function bendUv(c, uv, aspect = 1.78) {
  const breath = c.sec.mul(6.28318 / 12).sin().mul(0.5).add(0.5);
  const k = lens(c, "bulge").mul(mix(0.6, 1.4, c.rnd(3))).mul(breath.mul(0.4).add(0.8)).add(c.kick.mul(0.04));
  const p0 = uv.sub(0.5).mul(vec2(aspect, 1));
  const r = p0.length();
  const a = lens(c, "swirl").mul(c.dir).mul(mix(0.6, 1.5, c.rnd(4))).mul(float(1).sub(r.mul(1.3)).clamp(0, 1)).mul(c.sec.mul(6.28318 / 24).sin());
  // 11-11 13:47 creator: 'still lots of 2d warping': swirl, droste and the mirror fold are flat remaps of the picture: retired.
  // the lens keeps only what a real lens does: fisheye bulge and the hyperbolic (Poincare) slide.
  void a; const p1 = p0;
  // 2026-11-11 (lanmower: pixelated after stretching): the centre may be magnified at most 1.35x
  const p2 = p1.div(float(1).add(k.min(0.45).mul(r.mul(r)).mul(1.6)).max(0.83)); // centre magnified at most 1.2x (was 1.35x)
  // hyperbolic: Mobius slide of the Poincare disc, w = (z + a) / (1 + conj(a) z), centre held
  // 11-11 14:42 creator: "we must fix the pixelation issues". The slide magnifies one side of the frame by (1+h)/(1-h):
  // the score asked h up to ~1.07 (peak 0.68 + floor 0.14, x1.3 seed), i.e. 10x-to-infinite blow-up of 75%-res pixels.
  // Now h eases toward 0.2 at most (<= 1.5x on its strongest side) and the bulge holds the centre <= 1.2x, so the frame
  // is never stretched past what its pixels carry; the score's bigger numbers still read as a stronger, slower slide.
  const hRaw = lens(c, "hyper").mul(mix(0.7, 1.3, c.rnd(5)));
  const h = hRaw.div(hRaw.add(0.6)).mul(0.34).min(0.2), th = c.sec.mul(6.28318 / 24).mul(c.dir).add(c.rnd(6).mul(6.28318));
  const ax = h.mul(th.cos()), ay = h.mul(th.sin());
  const zx = p2.x.mul(1.6), zy = p2.y.mul(1.6);
  const nx = zx.add(ax), ny = zy.add(ay);
  const dx = float(1).add(ax.mul(zx)).add(ay.mul(zy)), dy = ax.mul(zy).sub(ay.mul(zx));
  const dd = dx.mul(dx).add(dy.mul(dy)).max(0.02);
  const p3 = vec2(nx.mul(dx).add(ny.mul(dy)).div(dd).sub(ax), ny.mul(dx).sub(nx.mul(dy)).div(dd).sub(ay)).div(1.6);
  // droste: log-polar recursion, radius wrapped into one x4 octave that zooms through once per phrase
  const r3 = p3.length().max(0.0005);
  const oct = r3.log().div(1.3863).add(c.sec.div(12)).fract();
  void oct; const p4 = p3;
  const px = p4.x;
  return vec2(px, p4.y).div(vec2(aspect, 1)).add(0.5);
}

// A VISION BEING's cutout: 1 while this being's dealt slot plays (params vw0 / vw1, written by the director),
// opening outward from its centre over 1.5 s as an iris and eaten away the same way at the slot's end.
// d = 0..1, this fragment's distance from the being's centre over its radius. Not dealt (vw1 < 0): 0.
// Testing by hand: set params t0 / on / seed AND vw0 / vw1 on the being's objects.
export function visionShown(ctx, c, d = 0) {
  const a = ctx.param("vw0", -1), b = ctx.param("vw1", -1);
  const s = c.sec.sub(float(d).clamp(0, 1).mul(1.5));
  return smoothstep(a, a.add(0.2), s).mul(float(1).sub(smoothstep(b, b.add(0.2), s))  /* edges low→high: reversed edges are undefined on GPUs (the turtle's NaN) */).mul(b.greaterThan(0).select(float(1), float(0))).mul(c.on);
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
// shared vision helpers: guards, SDF bits, the neon palette (linear), stroke and window makers
export const inv = (x) => float(1).sub(x);
export const is = (v, i) => step(v.sub(i).abs(), 0.5);
export const sgn = (r) => step(0.5, r).mul(2).sub(1);
export const ang2 = (x, y) => atan2(x, y.add(0.0001));
export const smin = (a, b, k) => { const h = b.sub(a).div(2 * k).add(0.5).clamp(0, 1); return mix(b, a, h).sub(h.mul(inv(h)).mul(k)); };
export const segH = (q, A, B) => { const BA = B.sub(A), pa = q.sub(A); const h = pa.dot(BA).div(BA.dot(BA).max(0.0001)).clamp(0, 1); return { d: pa.sub(BA.mul(h)).length(), h }; };
export const capsule = (q, a, b, r) => segH(q, Array.isArray(a) ? vec2(a[0], a[1]) : a, Array.isArray(b) ? vec2(b[0], b[1]) : b).d.sub(r);
export const rbox = (q, c, hx, hy, r) => { const d = q.sub(vec2(c[0], c[1])).abs().sub(vec2(hx - r, hy - r)); return d.max(0).length().add(d.x.max(d.y).min(0)).sub(r); };
export const strokeAA = (aa) => (d, w) => inv(smoothstep(float(w), aa.add(w), d));
export const ioU = (u) => (a, b, x, y) => smoothstep(a, b, u).mul(inv(smoothstep(x, y, u)));
export const famPick = (fams, fam, j) => fams.reduce((acc, f, i) => acc.add(f[j].mul(is(fam, i))), vec3(0));
export const NEON = { BLU: vec3(0.007, 0.014, 1.0), VIO: vec3(0.195, 0.007, 1.0), PNK: vec3(1.0, 0.005, 0.318), ORA: vec3(1.0, 0.144, 0.0015), YEL: vec3(1.0, 0.693, 0.004), GRN: vec3(0.01, 1.0, 0.019), W: vec3(1, 1, 1), BG: vec3(0.0025, 0.002, 0.009) };
