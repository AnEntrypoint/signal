// The bead-stalks' life: placed on their polar rows, a travelling 8-fold wave in their height, a hop that runs
// outward with the kick ripple, rising behind the bloom edge. All from the trip clock; no script moves them.
import { positionLocal, attribute, uv, float, vec3, smoothstep, select, mix, varying, step } from "builtin/tsl";
import { MeshBasicNodeMaterial } from "builtin/three";
import { tripClock } from "./lib/trip.js";
import { riseR, resetR, endFade, backOut, colours, breath, mirrorTurn, kickAt, lit, shade } from "./field-lib.js";

export function material(ctx) {
  const c = tripClock(ctx);
  const pol = attribute("polar", "vec4");
  const r = pol.x, ang = pol.y, row = pol.z, mul = pol.w;
  const hop = kickAt(c, r);
  const wave = r.mul(0.35).sub(c.bar.mul(1.5707963)).add(ang.mul(8).cos().mul(1.5)).sin().mul(0.5).add(0.5);
  const h = wave.mul(1.6).add(0.6).add(hop.mul(0.22)).mul(mul);
  const s = backOut(riseR(c.sec).sub(1.5).sub(r).div(4)).mul(backOut(resetR(c.sec).sub(r).div(4))).mul(endFade(c.sec));
  const part = uv().x, v = uv().y;
  const L = positionLocal;
  const bead = vec3(L.x, 0, L.z).mul(hop.mul(0.08).add(1)).add(vec3(0, L.y.add(h), 0));
  const stem = vec3(L.x, L.y.mul(h), L.z);
  const m = new MeshBasicNodeMaterial();
  m.positionNode = select(part.greaterThan(0.5), bead, stem).mul(s).add(vec3(ang.cos().mul(r), 0, ang.sin().mul(r)).mul(breath(c.sec)));
  const vh = varying(h), vhop = varying(hop), vrow = varying(row);
  const vL = varying(lit(c, r, mirrorTurn(ang.cos(), ang.sin()), row));
  const K = colours(c.sec, vrow);
  const beadCol = shade(mix(mix(K.H, vec3(0), step(0.6, v)), K.H2, step(0.8, v)), vL).mul(vhop.mul(vL).mul(0.3).add(1));
  const stemCol = shade(vec3(0.9, 0.9, 0.9), vL).mul(step(0.5, v.mul(vh).mul(2.5).fract()));
  m.colorNode = select(part.greaterThan(0.5), beadCol, stemCol);
  m.fog = false;
  return m;
}
