// Six tumbling line icosahedra in the chamber's floor corners, left and right exact mirrors: a turn per 12 s
// (small things may), dim at rest, a plane of light passing through each, swelling as the kick's ripple arrives.
import { MeshBasicNodeMaterial } from "builtin/three";
import { positionLocal, instanceIndex, vec3, float, sin, cos, sign, smoothstep, max } from "builtin/tsl";
import { tripClock } from "./lib/trip.js";
import { near, alive, ripple, breath, family } from "./chamber-fx.js";

export function material(ctx) {
  const c = tripClock(ctx), g = near(), F = family(c);
  const m = new MeshBasicNodeMaterial();
  const i = float(instanceIndex), a = i.mul(1.0472);
  const cx = cos(a).mul(21.5), cz = sin(a).mul(21.5), sx = sign(cx.add(0.001));
  const row = cz.mul(0.1);
  const e = ripple(c, float(24));
  const a1 = c.sec.mul(6.28318 / 12).add(row), a2 = c.sec.mul(6.28318 / 24).add(row.mul(2));
  const p = positionLocal.mul(breath(c).mul(0.03).add(1).add(e.mul(0.06)));
  const x1 = p.x.mul(cos(a1)).add(p.z.mul(sin(a1))), z1 = p.z.mul(cos(a1)).sub(p.x.mul(sin(a1)));
  const y2 = p.y.mul(cos(a2)).sub(z1.mul(sin(a2))), z2 = p.y.mul(sin(a2)).add(z1.mul(cos(a2)));
  m.positionNode = vec3(x1.mul(sx).add(cx), y2.sub(15.5), z2.add(cz)).mul(alive(g));
  const w = positionLocal.y.div(9).add(c.sec.div(6)).fract();
  const lit = max(smoothstep(0, 0.05, w).mul(float(1).sub(smoothstep(0.2, 0.4, w))), e.mul(0.7));
  m.colorNode = F.b.mul(lit.mul(2.6).add(0.14)).mul(g);
  return m;
}
