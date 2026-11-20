// lissajous-hands: x = A sin(a s + phi), y = B sin(b s) strung between the two palms, the ratio a:b one of
// 3:2, 5:4, 3:4 by the roll, phi crawling a turn per 48 s. It draws itself on by arc length once the hands
// have arrived, rests dim, and one lit head runs along it; the hue slides along the stroke.
import { MeshBasicNodeMaterial, DoubleSide } from "builtin/three";
import { positionWorld, length, uv, vec2, vec3, float, smoothstep, step, sin, cos, mix, max, normalize } from "builtin/tsl";
import { tripClock, shown } from "./lib/trip.js";
import { near, alive, ripple, breath, family, pace, dealt } from "./chamber-fx.js";
export function material(ctx) {
  const c = tripClock(ctx), g = near(), F = family(c);
  const m = new MeshBasicNodeMaterial();
  const t = uv().x, side = uv().y, s = t.mul(6.28318);
  const k = c.pick(48, 3), a = step(0.5, k).mul(step(k, 1.5)).mul(2).add(3), b = step(0.5, k).mul(2).add(2);
  const phi = c.sec.mul(6.28318 / 48).mul(pace(c, 44));
  const A = float(8.5), B = float(4.6);
  const x = sin(a.mul(s).add(phi)).mul(A), y = sin(b.mul(s)).mul(B);
  const n = normalize(vec2(cos(b.mul(s)).mul(b).mul(B).negate(), cos(a.mul(s).add(phi)).mul(a).mul(A)).add(vec2(1e-4, 0)));
  const e = ripple(c, length(vec2(x, y)));
  const sc = breath(c).mul(0.03).add(1).add(e.mul(0.05));
  m.positionNode = vec3(x.mul(sc).add(n.x.mul(side).mul(0.045)), y.mul(sc).add(n.y.mul(side).mul(0.045)), float(-6)).mul(alive(g));
  const w = t.sub(c.sec.div(12).mul(c.dir)).fract();
  const lit = max(smoothstep(0, 0.03, w).mul(float(1).sub(smoothstep(0.1, 0.3, w))), e.mul(0.7));
  const stroke = mix(F.hot, F.b, sin(s.mul(2).sub(c.sec.mul(0.3))).mul(0.5).add(0.5));
  m.colorNode = stroke.mul(lit.mul(2.6).add(0.14)).mul(g.mul(0.6));
  const drawn = step(t, c.sec.sub(88.35).div(4));
  m.opacityNode = drawn.mul(dealt(c, [0, 1, 1])).mul(shown(c, "hands", length(positionWorld.sub(vec3(0, 15, -362))).div(34)));
  m.alphaTest = 0.5;
  m.side = DoubleSide;
  return m;
}
