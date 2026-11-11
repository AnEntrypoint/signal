// Bends the lid strip (scripts/eye-lids-geo.js) onto the almond y = ±H(1-(x/W)^2)·open and opens it by lidOpen.
// Shut: two black sheets meet on the horizon and nothing glows. Open: only the striped rim and the lashes remain.
import { MeshBasicNodeMaterial } from "builtin/three";
import { positionGeometry, vertexColor, float, vec3, step, mix, smoothstep } from "builtin/tsl";
import { tripClock } from "./lib/trip.js";
import { lidOpen, LID } from "./eye-lib.js";

export function material(ctx) {
  const c = tripClock(ctx);
  const g = positionGeometry;
  const lower = step(50, g.x);
  const x = g.x.sub(lower.mul(100));
  const sgn = float(1).sub(lower.mul(2));
  const o = lidOpen(c.sec);
  const xn = x.div(LID.W);
  const E = float(1).sub(xn.mul(xn)).max(0).mul(LID.H);
  const isBody = step(g.y, -5);
  const s = g.y.negate().sub(10);
  const yBody = E.mul(o.add(float(1).sub(o).mul(s)));
  const slope = x.mul((-2 * LID.H) / (LID.W * LID.W)).mul(o);
  const inv = slope.mul(slope).add(1).sqrt().reciprocal();
  const d = g.y.add(g.y.sub(LID.band).max(0).mul(c.kick.mul(0.35)));
  const xo = x.sub(slope.mul(inv).mul(d));
  const yo = E.mul(o).add(inv.mul(d));
  const m = new MeshBasicNodeMaterial();
  m.positionNode = vec3(mix(xo, x, isBody), sgn.mul(mix(yo, yBody, isBody)), g.z);
  m.colorNode = vertexColor().xyz.mul(1.7).mul(smoothstep(0.0, 0.1, o)).mul(c.kick.mul(0.25).add(1));
  return m;
}
