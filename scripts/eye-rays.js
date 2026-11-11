// The petals crawl one turn in 96 s, the halo the other way in 72 s. Both rest in graphite; the mirrored clock-hand
// of the iris lights the petals it stands on, and the kick ripple arrives late (it left the pupil rim two beats
// before) and stretches them 5 %. They grow out from behind the iris as the lid opens, so a shut eye shows nothing.
import { MeshBasicNodeMaterial } from "builtin/three";
import { positionGeometry, vertexColor, float, vec3, step, mix, smoothstep, length, varying } from "builtin/tsl";
import { tripClock, shown } from "./lib/trip.js";
import { lidOpen, TAU, fam, ripple, sweep, relight, gate, breathScale } from "./eye-lib.js";

export function material(ctx) {
  const c = tripClock(ctx);
  const F = fam(c);
  const g = positionGeometry;
  const o = lidOpen(c.sec);
  const r = length(g.xy);
  const halo = step(26.4, r);
  const rayK = r.sub(15).mul(o.mul(ripple(c, 20).mul(0.05).add(1))).add(15).div(r);
  const haloK = mix(float(0.5), ripple(c, 27).mul(0.03).add(1), o);
  const k = mix(rayK, haloK, halo).mul(breathScale(c.sec));
  const th = mix(c.phrase.mul(TAU / 8), c.phrase.mul(-TAU / 6), halo);
  const cs = th.cos(), sn = th.sin();
  const X = g.x.mul(cs).sub(g.y.mul(sn)), Y = g.x.mul(sn).add(g.y.mul(cs));
  const lit = varying(gate(c, sweep(c, X, Y).max(ripple(c, r).mul(halo)), F.peak));
  // the mesh's vertex colours are codes: blue petal -> A, violet petal -> B, hot dots -> accent, white halo -> accent
  const vc = vertexColor().xyz;
  const hot = step(0.9, vc.x);
  const petB = step(0.2, vc.x).mul(float(1).sub(hot));
  const any = step(0.5, vc.x.max(vc.y).max(vc.z));
  const col = mix(mix(F.A, F.at(0.12), petB), F.hot(0.1), hot).mul(any);
  const m = new MeshBasicNodeMaterial();
  m.positionNode = vec3(X.mul(k), Y.mul(k), g.z);
  m.colorNode = relight(col, lit).mul(smoothstep(0.0, 0.1, o));
  m.opacityNode = shown(c, "rays", r.sub(15).div(12));
  m.alphaTest = 0.5;
  return m;
}
