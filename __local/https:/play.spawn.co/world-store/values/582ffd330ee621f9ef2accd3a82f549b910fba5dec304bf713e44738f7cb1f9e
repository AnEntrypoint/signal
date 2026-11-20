// ribbon-knot: one fat striped ribbon tied as a (p,q) torus knot (p,q dealt by c.pick 31), hanging in the tunnel's
// far mouth, threading through the core's ring plane (half its loops before the rings, half behind), turning once in 48..96 s against c.dir. Graphite at rest; a lit window travels along the
// ribbon, the kick's ripple leaves its centre; stripe count and two-tone (colour/black or colour/white) by c.pick 32.
import { float, vec3, floor, fract, abs, max, min, mod, step, smoothstep, select, mix, length, cross, normalize, varying, positionGeometry } from "builtin/tsl";
import { MeshBasicNodeMaterial, DoubleSide } from "builtin/three";
import { tripClock, pal, stripes } from "./lib/trip.js";
import { inside, GRAPH, fam, cut } from "./tunnel-lib.js";

export function material(ctx) {
  const m = new MeshBasicNodeMaterial();
  const c = tripClock(ctx), F = fam(c);
  const g = positionGeometry, s = g.x, ct = g.y, st = g.z;
  const k = c.pick(31, 4), p = mod(k, 2).add(2), q = min(k, 2).add(3);
  const R = 3.0, r1 = 1.35, ph = s.mul(6.2831853);
  const cp = ph.mul(p).cos(), sp = ph.mul(p).sin(), cq = ph.mul(q).cos(), sq = ph.mul(q).sin();
  const rho = cq.mul(r1).add(R), drho = sq.mul(-r1).mul(q);
  const K = vec3(rho.mul(cp), rho.mul(sp), sq.mul(r1));
  const T = normalize(vec3(drho.mul(cp).sub(rho.mul(p).mul(sp)), drho.mul(sp).add(rho.mul(p).mul(cp)), cq.mul(r1).mul(q)));
  const n0 = vec3(cq.mul(cp), cq.mul(sp), sq);
  const b = normalize(cross(T, n0)), n = normalize(cross(b, T));
  const P = K.add(b.mul(ct).mul(0.95)).add(n.mul(st).mul(0.24));
  const th = c.sec.mul(c.dir).negate().mul(6.2831853).div(mix(48, 96, c.rnd(31))), ca = th.cos(), sa = th.sin();
  m.positionNode = vec3(P.x.mul(ca).sub(P.y.mul(sa)), P.x.mul(sa).add(P.y.mul(ca)).add(6), P.z);
  const vr = varying(length(P.xy));
  // stripes across the ribbon, colour running along it inside the family
  const ns = c.pick(32, 3).mul(16).add(48), tone = c.pick(32, 2);
  const band = stripes(s.mul(ns).sub(c.bar.mul(c.dir).mul(0.25)), 1, 0.08);
  const hue = pal(F.H.add(s.mul(p).mul(6.2831853).sin().mul(0.07)));
  const other = mix(vec3(0.0, 0.0, 0.0), vec3(1, 1, 1), tone);
  const rim = step(0.82, abs(ct));
  let col = mix(other, hue, band).mul(float(1).sub(rim)).add(F.acc.mul(rim).mul(1.4));
  // the light: one window a third of the knot long travelling along it, and the kick's outward ripple
  const win3 = smoothstep(0.62, 0.72, abs(fract(s.sub(c.sec.mul(c.dir).div(16))).sub(0.5)).mul(2));
  const ring = smoothstep(0.9, 0.0, abs(vr.sub(fract(c.beat).mul(6)))).mul(c.kick);
  const L = max(max(win3, ring), step(60.35, c.sec).mul(0.18));
  col = mix(GRAPH.mul(band.add(rim).min(1)).mul(2), col, L);
  m.colorNode = col.mul(smoothstep(192, 186, c.sec));
  m.opacityNode = inside().mul(cut(c));
  m.alphaTest = 0.5;
  m.side = DoubleSide;
  m.fog = false;
  return m;
}
