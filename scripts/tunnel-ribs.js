// 8 beaded tubes: one straight tube per copy, bent by the vertex stage into a helix along the wall (1 turn per
// 60 m, 4 one way and 4 the exact mirror, the braid crawling one turn in 96 s). Half wear black/white stripes,
// half a diamond lattice; graphite at rest, lit by the tunnel's travelling light; the beads are a chase.
import { float, vec2, vec3, floor, fract, abs, max, atan2, mod, step, smoothstep, mix, length, varying, positionLocal, positionGeometry, instanceIndex } from "builtin/tsl";
import { MeshBasicNodeMaterial } from "builtin/three";
import { tripClock, stripes } from "./lib/trip.js";
import { inside, LY, LZ, GRAPH, fam, light } from "./tunnel-lib.js";

export function material(ctx) {
  const m = new MeshBasicNodeMaterial();
  const c = tripClock(ctx), F = fam(c);
  const i = float(instanceIndex), dir = step(3.5, i).mul(2).sub(1), k = mod(i, 4);
  const pl = positionLocal, d = float(LZ).sub(pl.z);
  // mirror pair: angle a and 0.5 - a
  const a0 = d.div(60).add(c.phrase.div(8)).add(k.mul(0.25));
  const ang = mix(a0, float(0.5).sub(a0), step(3.5, i)).mul(6.2831853);
  const cs = ang.cos(), sn = ang.sin(), px = pl.x, py = pl.y.sub(LY);
  m.positionNode = vec3(px.mul(cs).sub(py.mul(sn)), px.mul(sn).add(py.mul(cs)).add(LY), pl.z);
  const vi = varying(i), vk = varying(k);
  const g = positionGeometry, dg = float(LZ).sub(g.z);
  const isBead = step(0.3, length(g.xy.sub(vec2(5.5, LY))));
  const L = light(c, dg).L;
  const bw = stripes(dg.div(0.75).add(c.bar.mul(0.5)), 1, 0.06);
  const ta = atan2(g.y.sub(LY), g.x.sub(5.5)).div(6.2831853).mul(4), tw = dg.div(0.5).sub(c.bar.mul(0.5));
  const da = abs(fract(ta.add(tw)).sub(0.5)), db = abs(fract(ta.sub(tw)).sub(0.5)), dm = max(da, db);
  const cellOn = step(dm, 0.4).mul(step(0.14, dm));
  const isBW = step(0.5, mod(vk, 2));
  const mask = mix(cellOn, bw, isBW);
  const lit = mix(mix(F.acc, F.b, step(0.5, fract(dg.div(6)))), mix(F.a, vec3(1, 1, 1), step(60.35, c.sec).mul(step(c.sec, 180.35))), isBW);
  const tube = mix(GRAPH, lit, L).mul(mask);
  // each bead a target (belt, black ring, caps); bead j lights as the chase passes it
  const bj = floor(dg.div(1.5)), bz = abs(fract(dg.div(1.5)).sub(0.5)).mul(1.5);
  const chase = step(mod(bj.sub(floor(c.beat)).add(vk.mul(2)), 8), 1.5);
  const beadLit = mix(F.hot(bj.add(vk)), F.a, step(0.27, bz));
  const beadCol = mix(GRAPH.mul(1.6), beadLit, max(chase, L.mul(0.5))).mul(float(1).sub(step(0.19, bz).mul(step(bz, 0.27))));
  m.colorNode = mix(tube, beadCol, isBead).mul(smoothstep(192, 186, c.sec));
  m.opacityNode = inside();
  m.alphaTest = 0.5;
  m.fog = false;
  return m;
}
