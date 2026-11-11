// Inside the hole: a dark well of blue/violet rings scrolling inward with a row of hot dots, so from afar the
// pupil is deep and never a gap. See-through: it fades to nothing as the camera comes within 12 m, so the
// flight through the hole is clean and the tunnel shows on the approach.
import { MeshBasicNodeMaterial } from "builtin/three";
import { positionGeometry, positionWorld, cameraPosition, float, vec3, smoothstep, mix, length, atan2, distance, fwidth } from "builtin/tsl";
import { tripClock } from "./lib/trip.js";
import { TAU, fam, breathScale } from "./eye-lib.js";

export function material(ctx) {
  const c = tripClock(ctx);
  const F = fam(c);
  const p = positionGeometry.xy;
  const r = length(p);
  const w = fwidth(r).mul(1.5).max(0.01);
  const ph = r.mul(1.4).add(c.bar.mul(0.5));
  const f = ph.fract();
  const on = smoothstep(0, w.mul(1.4), f).mul(float(1).sub(smoothstep(float(0.42).sub(w.mul(1.4)), 0.42, f)));
  const odd = ph.floor().mul(0.5).fract().mul(2);
  let col = mix(F.A, F.B, odd).mul(on).mul(smoothstep(0.5, 4.6, r).mul(0.8).add(0.2));
  // 12 orange targets turning against the iris' white row
  const an = atan2(p.y, p.x).div(TAU).sub(c.phrase.mul(0.25));
  const q = an.mul(12).fract().sub(0.5).mul((TAU * 3.3) / 12);
  const d = q.mul(q).add(r.sub(3.3).mul(r.sub(3.3))).sqrt().div(float(0.38));
  col = mix(col, F.hot(0.0), float(1).sub(smoothstep(0.94, 1, d)));
  col = mix(col, vec3(0, 0, 0), float(1).sub(smoothstep(0.62, 0.68, d)));
  col = mix(col, F.A, float(1).sub(smoothstep(0.36, 0.42, d)));
  // black heart
  col = col.mul(smoothstep(0.7, 0.8, r));
  const m = new MeshBasicNodeMaterial();
  const s = breathScale(c.sec);
  m.positionNode = positionGeometry.mul(vec3(s, s, 1));
  m.colorNode = col;
  m.opacityNode = smoothstep(12, 26, distance(cameraPosition, positionWorld));
  m.transparent = true;
  m.depthWrite = false;
  return m;
}
