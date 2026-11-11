// The idol's strokes. They draw themselves on by arc length as the camera arrives, rest dim, and carry light
// as windows sliding along each frame's perimeter (neighbours opposite ways) plus the kick's ripple reaching
// each frame late by its radius. Frames step a few degrees per bar, neighbours opposite at two crawl rates;
// on the fill (93.35 .. 96.35) they fly apart along z and snap back.
import { MeshBasicNodeMaterial } from "builtin/three";
import { positionLocal, positionWorld, length, uv, vec3, float, floor, smoothstep, step, sin, cos, select, mix, max, pow } from "builtin/tsl";
import { tripClock, shown } from "./lib/trip.js";
import { near, alive, ripple, breath, family } from "./chamber-fx.js";

export function material(ctx) {
  const c = tripClock(ctx), g = near(), F = family(c);
  const m = new MeshBasicNodeMaterial();
  const id = floor(uv().x.add(0.5)), isBead = step(1.5, uv().y), v = uv().y.sub(isBead.mul(2));
  const frame = step(id, 8.5), glyph = step(8.5, id).mul(step(id, 9.5));
  const dir = id.mod(2).mul(2).sub(1);
  const snap = (x, w) => floor(x).add(smoothstep(0, w, x.fract()));
  const fill = smoothstep(93.35, 93.95, c.sec).mul(step(c.sec, 96.35));
  const stepRad = select(id.mod(3).lessThan(0.5), 0.1309, 0.06545); // 7.5 or 3.75 degrees a bar: the D6 alignment recurs
  const ang = dir.mul(stepRad).mul(snap(c.bar, 0.25).sub(60)).mul(frame).add(snap(c.bar, 0.3).mul(-1.0472).mul(glyph));
  const rad = pow(float(3), id.min(8).sub(8).div(4)).mul(11);
  const e = ripple(c, rad);
  const p = positionLocal, ca = cos(ang), sa = sin(ang);
  const sc = breath(c).mul(0.03).add(1).add(e.mul(0.05));
  const x = p.x.mul(ca).sub(p.y.mul(sa)).mul(sc), y = p.x.mul(sa).add(p.y.mul(ca)).mul(sc);
  const z = p.z.add(id.sub(4).mul(2.3).mul(fill).mul(frame));
  m.positionNode = vec3(x, y, z).mul(alive(g));
  const w = v.mul(3).sub(dir.mul(c.sec).div(12)).fract();
  const lit = max(smoothstep(0, 0.06, w).mul(float(1).sub(smoothstep(0.22, 0.42, w))), e);
  const stroke = mix(F.hot, F.hot2, sin(v.mul(12.566).add(c.sec.mul(0.35)).add(id)).mul(0.5).add(0.5));
  const line = stroke.mul(lit.mul(2.6).add(0.16));
  const beadC = mix(F.a, F.b, id.mod(2)).mul(lit.mul(3.0).add(0.12));
  m.colorNode = mix(line, beadC, isBead).mul(g.mul(0.6));
  const reveal = c.sec.sub(82.35).div(4).sub(id.mul(0.03));
  m.opacityNode = step(v, reveal.mul(1.1)).mul(shown(c, "chamber", length(positionWorld.sub(vec3(0, 15, -362))).div(34)));
  m.alphaTest = 0.5;
  return m;
}
