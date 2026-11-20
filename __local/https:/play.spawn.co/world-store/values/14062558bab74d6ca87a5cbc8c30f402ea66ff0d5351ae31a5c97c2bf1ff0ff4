// mask-totem (Color Drift): every stroke draws itself on by arc length from 81.85 s, part after part, its hue
// sliding along it; at rest the lines sit low and one lit window travels each stroke, the kick an outward ripple.
// bead-mask: c.pick(50) swaps the face to its bead copy (rings with dark centres), or wears both.
// kaleido-machine: the mirrored white machinery with coloured cells behind, dealt one roll in ~two.
import { MeshBasicNodeMaterial, DoubleSide } from "builtin/three";
import { positionLocal, positionWorld, uv, vec3, float, floor, fract, smoothstep, step, sin, mix, max, abs, length } from "builtin/tsl";
import { tripClock, shown } from "./lib/trip.js";
import { near, alive, ripple, breath, family } from "./chamber-fx.js";
// seconds after 81.85 at which each part starts drawing (eyes first, the machine last)
const START = { 0: 0, 41: 0.8, 1: 1.2, 4: 1.6, 9: 2.4, 40: 2.6, 3: 3, 8: 3, 2: 3.5, 5: 4.2, 7: 5.2, 43: 6.2 };
export function material(ctx) {
  const c = tripClock(ctx), g = near(), F = family(c);
  const m = new MeshBasicNodeMaterial();
  const al = uv().x, kind = floor(uv().y.add(0.01)), fr = uv().y.sub(kind).clamp(0, 1);
  const is = (k) => step(k - 0.5, kind).mul(step(kind, k + 0.5));
  const isBead = step(19.5, kind).mul(step(kind, 39.5)), isRib = step(kind, 19.5);
  const part = kind.sub(isBead.mul(20));
  const isP = (k) => step(k - 0.5, part).mul(step(part, k + 0.5));
  // the deal
  const mode = c.pick(50, 3), ears = c.pick(52, 2), flip = c.pick(53, 2), machine = step(c.rnd(54), 0.6);
  const ribOn = float(1).sub(step(0.5, mode).mul(step(mode, 1.5))), beadOn = step(0.5, mode);
  const modeVis = isRib.mul(ribOn).add(isBead.mul(beadOn)).add(float(1).sub(isRib).sub(isBead));
  const partVis = float(1).sub(isP(3).mul(ears)).sub(isP(8).mul(float(1).sub(ears)))
    .sub(isP(7).add(is(43)).mul(float(1).sub(machine)));
  // draw-on by length, part by part
  let off = float(0);
  for (const k in START) off = off.add(isP(+k).mul(START[k]));
  const prog = c.sec.sub(81.85).sub(off).div(3.2);
  const a2 = mix(al, float(1).sub(al), flip);
  const drawn = max(step(a2, prog), is(42).mul(step(0, prog)));
  // light travelling through graphite: a window along each stroke, the drawing head, the kick's ripple
  const r = length(positionLocal.xy);
  const e = ripple(c, r);
  const w = fract(al.sub(c.sec.div(6).mul(c.dir)));
  const win = smoothstep(0, 0.04, w).mul(float(1).sub(smoothstep(0.08, 0.26, w)));
  const head = smoothstep(0.18, 0, prog.sub(a2)).mul(step(prog, 1.3));
  const lit = max(max(win, e.mul(0.8)), head);
  const drift = sin(al.mul(9.42).sub(c.sec.mul(0.35).mul(c.dir))).mul(0.5).add(0.5);
  const accent = isP(0).add(isP(5)).add(is(40)).add(is(41)).clamp(0, 1);
  let col = mix(mix(F.a, F.b, drift), mix(F.hot, F.hot2, drift), accent);
  col = mix(col, mix(vec3(0.9, 0.9, 0.95), F.b, 0.2), isP(7));
  const core = float(1).sub(abs(fr.sub(0.45)).div(0.45).mul(0.55));
  const ring = smoothstep(0.42, 0.52, fr);
  const shape = mix(core, ring, isBead.add(is(40)).clamp(0, 1));
  let rgb = col.mul(shape).mul(lit.mul(2.4).add(0.42)).mul(breath(c).mul(0.25).add(0.85));
  // machine cells: a sweep steps through them on the bar
  const cell = fract(fr.add(c.bar.mul(0.25).mul(c.dir)));
  rgb = mix(rgb, mix(F.hot, F.hot2, fr).mul(step(cell, 0.3).mul(1.4).add(0.18)), is(43));
  rgb = mix(rgb, F.hot.mul(e.mul(1.5).add(1.3)), is(41));
  rgb = rgb.mul(float(1).sub(is(42)));
  m.colorNode = rgb.mul(g);
  const sc = breath(c).mul(0.015).add(1).add(e.mul(0.02));
  m.positionNode = vec3(positionLocal.x.mul(sc), positionLocal.y.mul(sc), positionLocal.z).mul(alive(g));
  m.opacityNode = drawn.mul(modeVis).mul(partVis.clamp(0, 1))
    .mul(shown(c, "chamber", length(positionWorld.sub(vec3(0, 15, -362))).div(34)));
  m.alphaTest = 0.5;
  m.side = DoubleSide;
  return m;
}
