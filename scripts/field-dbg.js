import { float, positionWorld, length, vec3, select } from "builtin/tsl";
import { MeshBasicNodeMaterial } from "builtin/three";
import { tripClock, shown } from "./lib/trip.js";
export function material(ctx) {
  const m = new MeshBasicNodeMaterial();
  const c = tripClock(ctx), r = length(positionWorld.xz);
  const a = shown(c, "field", r.div(90));
  m.colorNode = vec3(a, c.sec.div(10).floor().div(20), c.on);
  return m;
}
