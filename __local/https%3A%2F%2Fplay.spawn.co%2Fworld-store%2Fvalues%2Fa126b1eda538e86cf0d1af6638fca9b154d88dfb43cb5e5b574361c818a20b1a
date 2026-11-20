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
export function base(i) { return select(float(i).mod(2).lessThan(0.5), vec3(0.015, 0.05, 0.9), vec3(0.3, 0.0, 0.85)); }
export function hot(i) {
  const k = float(i).mod(5);
  return select(k.lessThan(0.5), vec3(1.0, 0.72, 0.0), select(k.lessThan(1.5), vec3(1.0, 0.0, 0.5),
    select(k.lessThan(2.5), vec3(0.03, 0.95, 0.06), select(k.lessThan(3.5), vec3(1.0, 0.3, 0.0), vec3(1.0, 0.02, 0.02)))));
}

// ---- how the field moves and is lit (TAS rules): the structure holds, the light travels ----
import { atan2 } from "builtin/tsl";
import { SCORE } from "./lib/trip.js";
const TAU = 6.2831853;
const BL = [0.015, 0.05, 0.9], VI = [0.3, 0.0, 0.85], MG = [1.0, 0.0, 0.5], GR = [0.03, 0.95, 0.06], YE = [1.0, 0.72, 0.0],
  OR = [1.0, 0.3, 0.0], CY = [0.0, 0.8, 0.9];
// One hue family per 12 s phrase: [body A, body B, accent]. Phrases 11..14 (peak) are the full rainbow.
export const FAMILY = [[BL, BL, BL], [BL, VI, MG], [VI, BL, GR], [BL, VI, OR], [VI, VI, VI], [MG, VI, YE], [VI, MG, YE], [GR, GR, GR],
  [GR, CY, GR], [BL, VI, OR], [VI, MG, YE], [BL, VI, YE], [BL, VI, YE], [BL, VI, YE], [BL, VI, YE], [BL, BL, BL], [BL, BL, BL]];
const rowOf = (ph, col) => { let n = V(FAMILY[FAMILY.length - 1][col]); for (let k = FAMILY.length - 2; k >= 0; k--) n = select(ph.lessThan(k + 0.5), V(FAMILY[k][col]), n); return n; };
export function family(sec) {
  const ph = sec.sub(SCORE.firstBeat).div(12).floor();
  return { A: rowOf(ph, 0), B: rowOf(ph, 1), H: rowOf(ph, 2), full: ph.greaterThan(10.5).and(ph.lessThan(14.5)) };
}
// The four colours an element of index i wears right now: two bodies, accent, inner contrast.
export function colours(sec, i) {
  const f = family(sec), even = float(i).mod(2).lessThan(0.5);
  return {
    A: select(f.full, base(i), select(even, f.A, f.B)), B: select(f.full, base(float(i).add(1)), select(even, f.B, f.A)),
    H: select(f.full, hot(i), f.H), H2: select(f.full, hot(float(i).add(2)), select(even, f.B, f.A)), fam: f,
  };
}
// The shared breath: one swell per phrase, 3 %.
export function breath(sec) { return sec.mul(TAU / 12).sin().mul(0.5).add(0.5).mul(0.03).add(1); }
// Mirrored angle (turns, -0.25..0.25): the left half of the field is the right half's reflection in x=0.
export function mirrorTurn(x, z) { return atan2(z, x.abs()).div(TAU); }
// The kick as a ripple: 1 as the ring from the centre passes radius r, settling before the next.
export function kickAt(c, r) {
  const live = c.live; // the measured kick runs (director's k0/k1), never a fixed window
  return c.beat.sub(r.div(90)).fract().mul(-5).exp().mul(live);
}
// The travelling light: a mirrored hand that steps round on each bar (a turn of the half-field per 16 bars,
// spiralled by band), a slow front running outward once a phrase, and the kick ripple. 1 everywhere in peak.
export function lit(c, r, am, i) {
  const sweep = c.bar.floor().add(smoothstep(0, 0.25, c.bar.fract())).div(16).mul(c.dir);
  const w = am.mul(2).add(0.5).sub(sweep).add(float(i).mul(0.045)).fract();
  const hand = smoothstep(0, 0.012, w).mul(smoothstep(0.36, 0.348, w));
  const fr = r.div(90).sub(c.phrase).fract();
  const front = smoothstep(0.78, 0.8, fr);
  const full = family(c.sec).full.select(1, 0);
  return hand.max(front).add(kickAt(c, r).mul(0.4)).max(full).clamp(0, 1);
}
// Unlit = dim graphite that still reads as form.
export function shade(col, L) {
  const lum = col.x.mul(0.3).add(col.y.mul(0.6)).add(col.z.mul(0.1)).min(1);
  return mix(vec3(0.75, 0.82, 1.0).mul(lum.mul(0.06).add(0.004)), col, L);
}

// THE ROLL'S OWN PALETTE: the same pure colours with their channels turned (3 turns x a swap = 6 palettes), so a
// roll is blue/violet with hot accents, or green/cyan, or red/amber, never grey. Applied last, on the finished colour.
export function roll(c, col) {
  const k = c.pick(10, 3), t = select(k.lessThan(0.5), col.xyz, select(k.lessThan(1.5), col.yzx, col.zxy));
  return select(c.pick(11, 2).greaterThan(0.5), t.xzy, t);
}
// One of three numbers for this roll, on channel n.
export function choose(c, n, opts) {
  const k = c.pick(n, 3);
  return select(k.lessThan(0.5), float(opts[0]), select(k.lessThan(1.5), float(opts[1]), float(opts[2])));
}
// SEAM HOLD: a scene's far layer stays lit to ~0.4 s of a dealt seam, then thins bead by bead (3D cells), back ~0.4 s after.
import { positionWorld, fract, length, max } from "builtin/tsl";
import { inv } from "./lib/trip.js";
export function seamHold(c, name, size = 1.6, p = positionWorld) {
  let w = float(0);
  for (const [a, b] of SCORE.layers[name]) w = w.add(smoothstep(a - 0.6, a, c.sec).mul(inv(smoothstep(b, b + 0.6, c.sec))));
  const k = smoothstep(0.15, 0.4, c.seamD).mul(inv(smoothstep(3.5, 5.5, c.seamD))).mul(w.clamp(0, 1));
  const q = p.div(size), id = q.floor(), f = fract(q).sub(0.5);
  const h = id.dot(vec3(12.9898, 78.233, 37.719)).sin().mul(43758.5453).fract();
  const r = smoothstep(h.mul(0.6), h.mul(0.6).add(0.4), k).mul(0.92);
  return inv(smoothstep(r.sub(0.06), r.add(0.001), length(f)));
}
export const held = (c, name, v, size, p) => max(v, seamHold(c, name, size, p));
