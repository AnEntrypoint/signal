import { float, positionWorld, length, vec3, smoothstep, time } from "builtin/tsl";
import { MeshBasicNodeMaterial } from "builtin/three";
import { tripClock } from "./lib/trip.js";
export function material(ctx) {
  const m = new MeshBasicNodeMaterial();
  const c = tripClock(ctx), r = length(positionWorld.xz);
  const ring = (R) => smoothstep(0.6, 0.2, r.sub(R).abs());
  const grid = smoothstep(0.15, 0.05, r.div(10).fract().sub(0.5).abs().sub(0.45).abs());
  m.colorNode = vec3(ring(c.sec.mul(0.45)), ring(time.mod(3600).div(40)), 0).add(grid.mul(0.15));
  return m;
}
