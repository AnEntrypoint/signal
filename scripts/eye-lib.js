// The Eye's shared maths: the lid's opening (0 shut .. 1 open) on the track's seconds, and small helpers.
// Every eye-* material reads the same lidOpen so the rays, the halo and the lashes move with the lid.
import { float, vec3, smoothstep, step, mix, atan2 } from "builtin/tsl";
import { SCORE, SEC, win, pal } from "./lib/trip.js";

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

// ---- how the Eye moves (the TAS rules): the structure rests in graphite, the light travels through it ----
// one shared slow swell per phrase, 0..1; everything scales 3 % on it together
export const breath = (sec) => sec.mul(TAU / 12).sin().mul(0.5).add(0.5);
export const breathScale = (sec) => breath(sec).mul(0.03).add(1);
// the kick as a ripple: leaves the pupil rim (r = 5 m) on the kick, travels outward 10 m a beat, 1 as it passes r
export const ripple = (c, r) => c.beat.sub(float(r).sub(5).div(10)).fract().mul(-5).exp().mul(live(c.sec));
// bars as steps: a counter that clicks forward on each bar's first beat
export const barStep = (c) => c.bar.floor().add(smoothstep(0, 0.3, c.bar.fract()));
// the light as a clock hand, mirrored left-right, clicking round on the bars (bottom to top in 16 bars)
export function sweep(c, x, y) {
  const am = atan2(y, x.abs()).div(TAU).add(0.25).mul(2);
  const d = am.sub(barStep(c).mul(c.dir).div(16)).add(0.5).fract().sub(0.5).abs();
  return smoothstep(0.24, 0.18, d);
}
// one hue family at a time, swapped on the phrase line: A and its neighbour B, one accent. seed/deep/reset/return
// are one colour only; peak opens the rainbow (at(off) spreads by off only there).
export function fam(c) {
  // the BODY (A, B) stays ultramarine..violet in every roll and phrase (pal 0.22..0.36), 60 % of the frame;
  // the roll and the phrase move only the hot accent, kept in the hot arc green..yellow..red..magenta (pal 0.62..1.17)
  const q = c.phrase.floor().add(8).mod(4);
  const h = float(0.31).sub(step(1, q).mul(0.03)).add(step(2, q).mul(0.05)).sub(step(3, q).mul(0.04)).add(c.hue.sub(0.5).mul(0.08));
  const ha = c.hue.add(c.pick(20, 3).div(3)).add(q.mul(0.29)).fract().mul(0.55).add(0.62);
  const peak = win(c.sec, SEC.peak);
  const mono = win(c.sec, SEC.seed, 0.1).add(win(c.sec, SEC.deep, 0.1)).add(win(c.sec, SEC.reset, 0.1)).add(win(c.sec, SEC.return, 0.1)).min(1);
  const at = (off) => pal(h.add(float(off).mul(peak)));
  const A = at(0);
  const B0 = pal(h.sub(0.08).add(float(0.07).mul(peak)));
  return { h, ha, peak, mono, at, A, B: mix(B0, A.mul(0.45), mono), acc: mix(pal(ha), A, mono), acc2: mix(pal(ha.add(0.08)), A.mul(0.45), mono),
    hot: (off) => mix(pal(ha.add(float(off).mul(peak))), A, mono) };
}
const max3 = (v) => v.x.max(v.y).max(v.z);
// unlit = graphite that keeps the form; lit = the colour. lit is 0..1.
// the rest tone is a dark ultramarine-tinted ink of the colour itself, never neutral grey (creator: no grey)
export const relight = (col, lit) => mix(col.mul(0.022).add(vec3(0.006, 0.008, 0.04)).mul(max3(col).min(1)), col, lit);
// the Eye only takes colour on the first kick phrase, and everything is lit in peak
export const gate = (c, lit, peak) => float(lit).max(peak.mul(0.85)).mul(step(12.35, c.sec));

// ---- the trope deck (scripts/lib/data/tropes.yml): 2 of the 4 optional eye tropes show per phrase, dealt by the
// roll's seed (channel 29) and moving on one each phrase; in peak all show (unless solo).
// 0 apollonian-eye (pupil), 1 rose-lash (lids), 2 graphite-and-gold (iris), 3 depth-parallax (pupil)
export const deal = (c, i, solo = false) => {
  const d = step(c.pick(29, 4).add(c.phrase.floor()).add(i).mod(4), 1.5);
  return solo ? d.mul(float(1).sub(win(c.sec, SEC.peak))) : d.max(win(c.sec, SEC.peak));
};
// symmetry-order: the roll's order 6, 8 or 12, shared by every radial piece (spine channel 8)
export const symN = (c) => { const k = c.pick(8, 3); return k.mul(2).add(6).add(step(1.5, k).mul(2)); };

// the pupil's content, dealt: g = apollonian gasket (deck card 0, always in seed), k = knot-flower (2 rolls in 3 carry
// it, on the phrases the gasket leaves); in peak the two alternate phrase by phrase so both are seen.
export const pupilDeal = (c) => {
  const pk = win(c.sec, SEC.peak), alt = c.phrase.floor().mod(2);
  const g0 = deal(c, 0, true).max(win(c.sec, SEC.seed, 0.5));
  const roll = step(0.5, c.pick(33, 3));
  const ph = step(0.5, c.phrase.floor().add(c.pick(36, 2)).mod(2));
  const k0 = roll.mul(float(1).sub(g0)).mul(ph);
  return { g: mix(g0, alt, pk), k: mix(k0, float(1).sub(alt), pk) };
};
