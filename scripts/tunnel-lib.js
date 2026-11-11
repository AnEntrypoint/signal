// The tunnel's shared shader frame: (angle, depth) coords of a world point, and the sight-line test that keeps
// every tunnel piece invisible from outside the tube. Axis (0,15) along -Z, mouth z=-36, far end z=-336, radius 6.
import { positionWorld, cameraPosition, float, vec2, vec3, atan2, length, clamp, select, abs, step } from "builtin/tsl";
export const Z0 = -36, Z1 = -336, AXY = 15, RAD = 6, LEN = 300;
// Every tunnel object stands at feet (0, 9, -186): local axis is y = 6, local z = 150 - depth.
export const FEET = { x: 0, y: 9, z: -186 }, LY = 6, LZ = 150;
export const BOUNDS = { min: [-6.2, -0.2, -150.5], max: [6.2, 12.2, 150.5] };
export function tun(p = positionWorld) {
  const rel = p.xy.sub(vec2(0, AXY));
  return { rel, r: length(rel), ang: atan2(rel.y, rel.x).div(6.2831853).add(0.5), d: float(Z0).sub(p.z) };
}
// 1 when the eye sees this fragment from inside the tube or through one of its two open ends, else 0.
export function inside() {
  const C = cameraPosition, P = positionWorld;
  const zc = clamp(C.z, Z1, Z0);
  const dz = P.z.sub(C.z);
  const t = zc.sub(C.z).div(select(abs(dz).lessThan(1e-3), float(-1e-3), dz));
  const hit = C.xy.add(P.xy.sub(C.xy).mul(t)).sub(vec2(0, AXY));
  return step(length(hit), RAD);
}
export const camDepth = () => float(Z0).sub(cameraPosition.z).max(0);
export const v3 = (a) => vec3(a[0], a[1], a[2]);
// The colour law of the trip: blue/violet is the body, the hot hues are the accents. idx is any whole number.
import { mod, floor } from "builtin/tsl";
const HOT = [[1.0, 0.8, 0.02], [1.0, 0.3, 0.0], [1.0, 0.02, 0.03], [1.0, 0.0, 0.55], [0.05, 1.0, 0.1]];
export const BLUE = vec3(0.02, 0.07, 1.0), VIOLET = vec3(0.38, 0.0, 1.0);
export const base = (idx) => BLUE.add(VIOLET.sub(BLUE).mul(mod(floor(float(idx)), 2)));
export function hot(idx) {
  const k = mod(floor(float(idx)), 5);
  let c = vec3(0, 0, 0);
  HOT.forEach((h, i) => { c = c.add(vec3(h[0], h[1], h[2]).mul(step(abs(k.sub(i)), 0.5))); });
  return c;
}
// ---- The TAS rules, shared by every tunnel piece --------------------------------------------------------------
import { smoothstep, fract, mix, max } from "builtin/tsl";
// Rest colour: graphite, still readable as form.
export const GRAPH = vec3(0.012, 0.012, 0.04);
// Left-right mirrored angle (turns, -0.25..0.25): the composition is symmetric about x = 0.
export const mirAng = (p = positionWorld) => atan2(p.y.sub(AXY), abs(p.x)).div(6.2831853);
// One shared breath a phrase, 0..1.
export const breath = (c) => c.sec.mul(6.2831853 / 12).sin().mul(0.5).add(0.5);
// One hue family per phrase, seeded: the roll's c.hue sets where the wheel starts, each phrase line steps it.
// a and b are neighbours (the body), acc a hotter neighbour, never a second family; deep and return are mono.
import { pal } from "./lib/trip.js";
export function fam(c) {
  const H = c.hue.add(floor(c.phrase).mul(0.17)).add(0.62);
  const a0 = pal(H), b0 = pal(H.add(0.085)), acc0 = pal(H.sub(0.13));
  const mono = max(step(c.sec, 60.35), step(180.35, c.sec));
  const mc = pal(c.hue.add(0.62));
  const a = mix(a0, mc, mono), b = mix(b0, pal(c.hue.add(0.7)), mono), acc = mix(acc0, pal(c.hue.add(0.55)), mono);
  return { a, b, acc, H,
    base: (idx) => mix(a, b, mod(floor(float(idx)), 2)),
    hot: (idx) => mix(acc, b, step(1.5, mod(floor(float(idx)), 3))) };
}
// THE DEAL. The tunnel's six switchable tropes: 0 hourglass-throat, 1 hyperspace-streaks, 2 radial-gates,
// 3 orb-domes, 4 serpent-teeth, 5 truchet-skin. Each phrase shows 2 or 3 (c.pick 37) of a seed-rotated deck
// (c.pick 30), stepping 2 a phrase, so the four tunnel phrases deal all six. 1 = dealt now.
export function deal(c, id) {
  const o = c.pick(30, 6), cnt = c.pick(37, 2).add(2);
  return step(mod(float(id).sub(o).sub(floor(c.phrase).mul(2)).add(60), 6), cnt.sub(0.5));
}
// HOURGLASS: the tube pinched to a throat at a seeded depth per phrase, easing in and out inside the phrase.
// s = radius scale at depth d (1 = untouched); g = how deep in the waist (0..1) for the streak stretch.
export function pinch(c, d) {
  const n = floor(c.phrase), f = fract(c.phrase);
  const dw = fract(c.rnd(36).add(n.mul(0.37))).mul(150).add(70);
  const wide = c.pick(36, 3).mul(6).add(12);
  const x = float(d).sub(dw).div(wide);
  const g = x.mul(x).negate().exp().mul(smoothstep(0, 0.2, f).mul(smoothstep(1, 0.8, f))).mul(deal(c, 0));
  return { s: float(1).sub(g.mul(0.62)), g };
}
// THE LIGHT TRAVELS: how lit a thing at depth d is. A window of light 36 m long every 72 m slides down-tunnel
// (slow in deep, 18 m/s in flight, entering as a front from the eye at 60.35), and each kick is a thin ring
// leaving the eye, reaching depth late by distance. Returns { L: 0..1 lit, ring: 0..1 the ripple passing }.
export function light(c, d) {
  const f = step(60.35, c.sec), rel = float(d).sub(camDepth());
  const ph = float(d).div(72).sub(mix(c.sec.div(24), c.sec.div(4), f));
  const sweep = smoothstep(0.5, 0.58, abs(fract(ph).sub(0.5)).mul(2));
  const front = step(rel, c.sec.sub(60.35).mul(150));
  const ring = smoothstep(2.2, 0.8, abs(rel.sub(fract(c.beat).mul(110)).sub(2))).mul(c.kick.mul(1.6).min(1));
  const L = max(sweep.mul(mix(c.bass.min(1).mul(0.09).add(0.025), front, f)), ring.mul(mix(0.1, 1, f)));
  return { L, ring };
}

// THE LAYER SCORE: the tunnel's cutout, opening from the mouth and eaten away the same way (d = depth / 300).
import { shown } from "./lib/trip.js";
export const cut = (c, p = positionWorld) => shown(c, "tunnel", float(Z0).sub(p.z).div(LEN));
// The wall's self-cutout: mirrored helical bands (8 arms winding one turn per 96 m), one in four cut away, the set stepping every 2 bars.
export function panels(c, p = positionWorld) {
  // helical bands, not blocks: the cut winds down the tunnel like a spiral arm, the set stepping every 2 bars
  const k = mod(floor(mirAng(p).add(0.25).mul(8).add(float(Z0).sub(p.z).div(12))).add(floor(c.bar.div(2))), 4);
  return float(1).sub(step(k, 0.5).mul(smoothstep(60.35, 61.85, c.sec)));
}
