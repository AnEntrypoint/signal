// Six tumbling line icosahedra in the chamber's floor corners: neighbours tumble opposite ways, a turn per 2 bars,
// swelling on the kick.
import { MeshBasicNodeMaterial } from "builtin/three";
import { positionLocal, instanceIndex, vec3, float, sin, cos } from "builtin/tsl";
import { tripClock, pal } from "./lib/trip.js";
import { near, alive } from "./chamber-fx.js";

export function material(ctx) {
  const c = tripClock(ctx), g = near();
  const m = new MeshBasicNodeMaterial();
  const i = float(instanceIndex), dir = i.mod(2).mul(2).sub(1);
  const a = i.mul(1.0472);
  const centre = vec3(cos(a).mul(21.5), float(-15.5).add(c.half.mul(0.8)), sin(a).mul(21.5));
  const a1 = c.bar.mul(3.14159).mul(dir).add(i), a2 = c.phrase.mul(6.28318).add(i.mul(2));
  const p = positionLocal.mul(c.kick.mul(0.18).add(1));
  const x1 = p.x.mul(cos(a1)).add(p.z.mul(sin(a1))), z1 = p.z.mul(cos(a1)).sub(p.x.mul(sin(a1)));
  const y2 = p.y.mul(cos(a2)).sub(z1.mul(sin(a2))), z2 = p.y.mul(sin(a2)).add(z1.mul(cos(a2)));
  m.positionNode = vec3(x1, y2, z2).add(centre).mul(alive(g));
  m.colorNode = pal(i.div(6).add(c.phrase.mul(0.5))).add(0.08).mul(c.kick.mul(1.2).add(1.8)).mul(g);
  return m;
}
