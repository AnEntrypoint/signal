// The petals turn a quarter per phrase and stretch on the half-beat; the halo turns the other way and jumps on the
// kick. Both grow out from behind the iris as the lid opens, so a shut eye shows nothing.
import { MeshBasicNodeMaterial } from "builtin/three";
import { positionGeometry, vertexColor, float, vec3, step, mix, smoothstep, length } from "builtin/tsl";
import { tripClock } from "./lib/trip.js";
import { lidOpen, TAU } from "./eye-lib.js";

export function material(ctx) {
  const c = tripClock(ctx);
  const g = positionGeometry;
  const o = lidOpen(c.sec);
  const r = length(g.xy);
  const halo = step(26.4, r);
  const rayK = r.sub(15).mul(o.mul(c.half.mul(0.3).add(0.8))).add(15).div(r);
  const haloK = mix(float(0.5), c.kick.mul(0.025).add(1), o);
  const k = mix(rayK, haloK, halo);
  const th = mix(c.phrase.mul(TAU / 4), c.phrase.mul(-TAU / 2), halo);
  const cs = th.cos(), sn = th.sin();
  const m = new MeshBasicNodeMaterial();
  m.positionNode = vec3(g.x.mul(cs).sub(g.y.mul(sn)).mul(k), g.x.mul(sn).add(g.y.mul(cs)).mul(k), g.z);
  m.colorNode = vertexColor().xyz.mul(1.6).mul(smoothstep(0.0, 0.1, o)).mul(c.kick.mul(0.3).add(1));
  return m;
}
