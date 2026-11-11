// Inside the hole: additive concentric rings scrolling inward, so from afar the pupil is a well, never a gap.
// Fades to nothing as the camera comes within 12 m, so the flight through the hole is clean.
import { MeshBasicNodeMaterial, AdditiveBlending } from "builtin/three";
import { positionLocal, positionWorld, cameraPosition, float, vec3, smoothstep, mix, length, distance, fwidth } from "builtin/tsl";
import { tripClock, HUE } from "./lib/trip.js";
import { hue } from "./eye-lib.js";

export function material(ctx) {
  const c = tripClock(ctx);
  const r = length(positionLocal.xy);
  const ph = r.mul(1.1).add(c.beat.mul(0.5));
  const f = ph.fract();
  const w = fwidth(r).mul(1.5).max(0.01);
  const on = smoothstep(0, w, f).mul(float(1).sub(smoothstep(float(0.5).sub(w), 0.5, f)));
  const odd = ph.floor().mul(0.5).fract().mul(2);
  const col = mix(hue(HUE.blue, 1.1), hue(HUE.violet, 0.9), odd).mul(on).mul(smoothstep(0.9, 1.6, r)).mul(c.kick.mul(0.4).add(0.8));
  const fade = smoothstep(12, 26, distance(cameraPosition, positionWorld));
  const m = new MeshBasicNodeMaterial();
  m.colorNode = col.mul(fade);
  m.transparent = true;
  m.blending = AdditiveBlending;
  m.depthWrite = false;
  return m;
}
