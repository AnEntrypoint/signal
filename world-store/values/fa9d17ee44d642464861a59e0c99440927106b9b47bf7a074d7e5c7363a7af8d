// branching-circuit + depth-parallax: the same sixfold circuit glyph at three depths behind the idol, each
// crawling at its own rate (neighbours opposite), the far ones larger and dimmer. Strokes grow from the corners
// by arc length, rest dim, and light chases outward along every branch; hue drifts along the stroke.
import { MeshBasicNodeMaterial } from "builtin/three";
import { positionLocal, positionWorld, instanceIndex, length, uv, vec3, float, floor, smoothstep, step, sin, cos, select, mix, max } from "builtin/tsl";
import { tripClock, shown } from "./lib/trip.js";
import { near, alive, ripple, breath, family, pace, dealt } from "./chamber-fx.js";
export function material(ctx) {
  const c = tripClock(ctx), g = near(), F = family(c);
  const m = new MeshBasicNodeMaterial();
  const i = float(instanceIndex), by = (a, b, d) => select(i.lessThan(0.5), float(a), select(i.lessThan(1.5), float(b), float(d)));
  const id = floor(uv().x.add(0.5)), isBead = step(1.5, uv().y), v = uv().y.sub(isBead.mul(2));
  const p = positionLocal, e = ripple(c, length(p.xy).add(i.mul(4)));
  const ang = c.sec.mul(6.28318).mul(by(1 / 96, -1 / 72, 1 / 56)).mul(pace(c, 43)).add(i.mul(0.5236));
  const sc = by(1, 1.2, 1.42).mul(breath(c).mul(0.03).add(1).add(e.mul(0.04)));
  const ca = cos(ang), sa = sin(ang);
  m.positionNode = vec3(p.x.mul(ca).sub(p.y.mul(sa)).mul(sc), p.x.mul(sa).add(p.y.mul(ca)).mul(sc), p.z.sub(i.mul(4)).sub(13)).mul(alive(g));
  const w = v.sub(c.sec.div(6)).add(i.mul(0.33)).fract();
  const lit = max(smoothstep(0, 0.08, w).mul(float(1).sub(smoothstep(0.2, 0.45, w))), e.mul(0.8));
  const stroke = mix(F.a, F.b, sin(v.mul(5).add(id).sub(c.sec.mul(0.3))).mul(0.5).add(0.5));
  const col = mix(stroke.mul(lit.mul(2.4).add(0.1)), F.hot.mul(lit.mul(3).add(0.2)), isBead);
  m.colorNode = col.mul(by(1, 0.55, 0.3)).mul(g.mul(0.6));
  const grown = step(v, c.sec.sub(84.35).div(4.5).sub(i.mul(0.2)));
  m.opacityNode = grown.mul(dealt(c, [1, 0, 1])).mul(shown(c, "chamber", length(positionWorld.sub(vec3(0, 15, -362))).div(34)));
  m.alphaTest = 0.5;
  return m;
}
