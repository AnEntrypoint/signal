// 8 beaded striped tubes: one straight tube per copy, bent by the vertex stage into a helix along the wall
// (1 turn per 60 m, 4 one way and 4 the other, the whole braid turning once a phrase), stripes scrolling a band a beat.
import { float, vec2, vec3, floor, mod, step, smoothstep, mix, length, varying, positionLocal, positionGeometry, instanceIndex } from "builtin/tsl";
import { MeshBasicNodeMaterial } from "builtin/three";
import { tripClock, pal, stripes, HUE } from "./lib/trip.js";
import { inside, v3, LY, LZ } from "./tunnel-lib.js";

export function material(ctx) {
  const m = new MeshBasicNodeMaterial();
  const c = tripClock(ctx);
  const i = float(instanceIndex), dir = step(3.5, i).mul(2).sub(1), k = mod(i, 4);
  const pl = positionLocal, d = float(LZ).sub(pl.z);
  const ang = dir.mul(d.div(60).add(c.phrase)).add(k.mul(0.25)).add(step(3.5, i).mul(0.125)).mul(6.2831853);
  const cs = ang.cos(), sn = ang.sin(), px = pl.x, py = pl.y.sub(LY);
  m.positionNode = vec3(px.mul(cs).sub(py.mul(sn)), px.mul(sn).add(py.mul(cs)).add(LY), pl.z);
  const vi = varying(i), vdir = varying(dir);
  const g = positionGeometry, dg = float(LZ).sub(g.z);
  const isBead = step(0.3, length(g.xy.sub(vec2(5.5, LY))));
  const flight = step(60.35, c.sec);
  const tube = vec3(1, 1, 1).mul(stripes(dg.div(0.75).add(vdir.mul(c.beat)), 1, 0.06));
  const beadCol = pal(floor(dg.div(1.5)).div(8).add(vi.mul(0.125))).mul(float(2.2).add(c.kick.mul(1.5)));
  const col = mix(tube, beadCol, isBead);
  const lum = col.x.add(col.y).add(col.z).mul(0.3).min(1);
  const deep = mix(v3(HUE.violet), v3(HUE.blue), isBead).mul(lum).mul(float(0.1).add(c.bass.mul(0.7)));
  m.colorNode = mix(deep, col, flight).mul(smoothstep(192, 186, c.sec));
  m.opacityNode = inside();
  m.alphaTest = 0.5;
  m.fog = false;
  return m;
}
