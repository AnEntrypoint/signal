// Bends the lid strip (scripts/eye-lids-geo.js) onto the almond y = ±H(1-(x/W)^2)·open and opens it by lidOpen.
// Shut: two black sheets meet on the horizon and nothing glows. Open: only the striped rim and the lashes remain.
import { MeshBasicNodeMaterial } from "builtin/three";
import { positionGeometry, vertexColor, float, vec3, step, mix, smoothstep, varying } from "builtin/tsl";
import { tripClock } from "./lib/trip.js";
import { lidOpen, LID, fam, ripple, barStep, relight, gate, breathScale } from "./eye-lib.js";

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
  const d = g.y.add(g.y.sub(LID.band).max(0).mul(ripple(c, x.abs().add(8)).mul(0.08)));
  const xo = x.sub(slope.mul(inv).mul(d));
  const yo = E.mul(o).add(inv.mul(d));
  const m = new MeshBasicNodeMaterial();
  // light travels outward along the rim from the middle, mirrored left and right, clicking on the bars
  const F = fam(c);
  const lit = varying(gate(c, smoothstep(0.36, 0.28, x.abs().div(LID.W).sub(barStep(c).div(8)).fract()), F.peak));
  // vertex colours are codes: white stays white, yellow edge -> A, magenta bead -> accent, green bead -> B
  const vc = vertexColor().xyz;
  const isW = step(0.9, vc.x.min(vc.y).min(vc.z));
  const isG = step(vc.x, 0.5).mul(step(0.5, vc.y));
  const isY = step(0.9, vc.x).mul(step(0.5, vc.y)).mul(float(1).sub(isW));
  const any = step(0.5, vc.x.max(vc.y).max(vc.z));
  const col = mix(mix(mix(F.hot(0.1), F.A, isY), F.at(0.15), isG), vec3(1, 1, 1), isW).mul(any);
  const bs = breathScale(c.sec);
  m.positionNode = vec3(mix(xo, x, isBody).mul(bs), sgn.mul(mix(yo, yBody, isBody)).mul(bs), g.z);
  m.colorNode = relight(col, lit.max(isW.mul(0.55).mul(step(12.35, c.sec)))).mul(smoothstep(0.0, 0.1, o));
  return m;
}
