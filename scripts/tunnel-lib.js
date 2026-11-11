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
export const GRAPH = vec3(0.04, 0.04, 0.062);
// Left-right mirrored angle (turns, -0.25..0.25): the composition is symmetric about x = 0.
export const mirAng = (p = positionWorld) => atan2(p.y.sub(AXY), abs(p.x)).div(6.2831853);
// One shared breath a phrase, 0..1.
export const breath = (c) => c.sec.mul(6.2831853 / 12).sin().mul(0.5).add(0.5);
// One hue family per phrase (two neighbours + one accent), swapped on the phrase line; deep and return are mono.
const FA = [[0.02, 0.07, 1], [0.38, 0, 1], [0.02, 0.07, 1], [1, 0, 0.55]];
const FB = [[0.38, 0, 1], [1, 0, 0.55], [0.03, 0.8, 1], [1, 0.03, 0.03]];
const FC = [[1, 0.8, 0.02], [0.05, 1, 0.1], [1, 0.3, 0], [1, 0.8, 0.02]];
export function fam(c) {
  const k = mod(floor(c.phrase), 4);
  const pick = (rows) => { let o = vec3(0, 0, 0); rows.forEach((h, i) => { o = o.add(vec3(h[0], h[1], h[2]).mul(step(abs(k.sub(i)), 0.5))); }); return o; };
  const mono = max(step(c.sec, 60.35), step(180.35, c.sec));
  const mc = mix(vec3(0.02, 0.07, 1), vec3(0.38, 0, 1), step(180.35, c.sec));
  const a = mix(pick(FA), mc, mono), b = mix(pick(FB), mc, mono), acc = mix(pick(FC), mc, mono);
  return { a, b, acc,
    base: (idx) => mix(a, b, mod(floor(float(idx)), 2)),
    hot: (idx) => mix(acc, b, step(1.5, mod(floor(float(idx)), 3))) };
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
  const L = max(sweep.mul(mix(c.bass.min(1).mul(0.65).add(0.35), front, f)), ring.mul(mix(0.5, 1, f)));
  return { L, ring };
}
