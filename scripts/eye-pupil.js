// Inside the hole: a dark well of blue/violet rings scrolling inward with a row of hot dots, so from afar the
// pupil is deep and never a gap. See-through: it fades to nothing as the camera comes within 12 m, so the
// flight through the hole is clean and the tunnel shows on the approach.
import { MeshBasicNodeMaterial } from "builtin/three";
import { positionLocal, positionWorld, cameraPosition, float, vec3, smoothstep, mix, length, atan2, distance, fwidth } from "builtin/tsl";
import { tripClock, HUE } from "./lib/trip.js";
import { hue, TAU } from "./eye-lib.js";

export function material(ctx) {
  const c = tripClock(ctx);
  const p = positionLocal.xy;
  const r = length(p);
  const w = fwidth(r).mul(1.5).max(0.01);
  const ph = r.mul(1.4).add(c.beat.mul(0.5));
  const f = ph.fract();
  const on = smoothstep(0, w.mul(1.4), f).mul(float(1).sub(smoothstep(float(0.42).sub(w.mul(1.4)), 0.42, f)));
  const odd = ph.floor().mul(0.5).fract().mul(2);
  let col = mix(hue(HUE.blue, 1.5), hue(HUE.violet, 1.3), odd).mul(on).mul(smoothstep(0.5, 4.6, r).mul(0.8).add(0.2));
  // 12 orange targets turning against the iris' white row
  const an = atan2(p.y, p.x).div(TAU).sub(c.phrase.mul(0.5));
  const q = an.mul(12).fract().sub(0.5).mul((TAU * 3.3) / 12);
  const d = q.mul(q).add(r.sub(3.3).mul(r.sub(3.3))).sqrt().div(c.kick.mul(0.08).add(0.36));
  col = mix(col, hue(HUE.orange, 1.8), float(1).sub(smoothstep(0.94, 1, d)));
  col = mix(col, vec3(0, 0, 0), float(1).sub(smoothstep(0.62, 0.68, d)));
  col = mix(col, hue(HUE.yellow, 1.8), float(1).sub(smoothstep(0.36, 0.42, d)));
  // black heart
  col = col.mul(smoothstep(0.7, 0.8, r));
  const m = new MeshBasicNodeMaterial();
  m.colorNode = col;
  m.opacityNode = smoothstep(12, 26, distance(cameraPosition, positionWorld));
  m.transparent = true;
  m.depthWrite = false;
  return m;
}
