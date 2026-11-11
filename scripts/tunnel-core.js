// The far-end target: a disc of concentric graphite rings at z = -336; a lit wavefront steps outward from its
// centre one ring a beat, the rings themselves crawl outward one a bar. It irises open as the eye arrives.
import { float, vec3, floor, fract, mod, step, smoothstep, mix, positionWorld, cameraPosition } from "builtin/tsl";
import { MeshBasicNodeMaterial, DoubleSide } from "builtin/three";
import { tripClock } from "./lib/trip.js";
import { tun, inside, Z1, GRAPH, fam, cut } from "./tunnel-lib.js";

export function material(ctx) {
  const m = new MeshBasicNodeMaterial();
  const c = tripClock(ctx), T = tun(), F = fam(c);
  const flight = step(60.35, c.sec);
  const dens = c.rnd(38).mul(1.2).add(1.0); // ring pitch, seeded
  const u = T.r.mul(dens).sub(c.bar.mul(c.dir).mul(mix(0.25, 1, flight))), idx = floor(u), f = fract(u);
  const ringOn = step(0.18, f).mul(step(f, 0.82));
  const heart = step(T.r, 0.9);
  const wave = step(mod(floor(T.r.mul(dens)).sub(floor(c.beat)), 4), 1.5);
  const ringCol = mix(GRAPH.mul(1.8), mix(F.base(idx.mul(0.5)), F.acc, step(2.5, mod(idx, 4))).mul(1.3), wave.mul(mix(0.45, 1, flight)));
  m.colorNode = mix(ringCol.mul(ringOn), mix(F.a, vec3(1, 1, 1), flight).mul(2), heart).mul(smoothstep(192, 186, c.sec));
  const hole = smoothstep(46, 10, float(Z1).sub(cameraPosition.z).abs()).mul(6.3);
  m.opacityNode = inside().mul(cut(c)).mul(step(Z1, cameraPosition.z)).mul(step(hole, T.r)).mul(ringOn.max(heart));
  m.alphaTest = 0.5;
  m.side = DoubleSide;
  m.fog = false;
  return m;
}
