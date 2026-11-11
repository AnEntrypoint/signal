// The far-end target: a disc of concentric rings at z = -336, one ring leaving the centre every beat, that
// irises open as the eye arrives so the chamber shows through.
import { float, vec3, floor, fract, mod, step, smoothstep, mix, length, positionWorld, cameraPosition } from "builtin/tsl";
import { MeshBasicNodeMaterial, DoubleSide } from "builtin/three";
import { tripClock, pal, HUE } from "./lib/trip.js";
import { tun, inside, v3, Z1 } from "./tunnel-lib.js";

export function material(ctx) {
  const m = new MeshBasicNodeMaterial();
  const c = tripClock(ctx), T = tun();
  const flight = step(60.35, c.sec);
  const u = T.r.mul(1.5).sub(c.beat.mul(mix(0.25, 1, flight))), idx = floor(u), f = fract(u);
  const ringOn = step(0.18, f).mul(step(f, 0.82));
  const hot = step(T.r, 0.9);
  const col = mix(mix(vec3(1, 1, 1).mul(2), pal(idx.mul(0.125)).mul(2.6), step(0.5, mod(idx, 2))).mul(ringOn), vec3(1, 1, 1).mul(4), hot)
    .mul(float(1).add(c.kick));
  const lum = col.x.add(col.y).add(col.z).mul(0.2).min(1.5);
  const deep = mix(v3(HUE.blue), v3(HUE.violet), mod(idx, 2)).mul(lum).mul(float(0.25).add(c.bass));
  m.colorNode = mix(deep, col, flight).mul(smoothstep(192, 186, c.sec));
  const hole = smoothstep(46, 10, float(Z1).sub(cameraPosition.z).abs()).mul(6.3);
  m.opacityNode = inside().mul(step(Z1, cameraPosition.z)).mul(step(hole, T.r)).mul(ringOn.max(hot));
  m.alphaTest = 0.5;
  m.side = DoubleSide;
  m.fog = false;
  return m;
}
