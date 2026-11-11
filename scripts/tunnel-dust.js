// The faint fog of dots: 25 rings of 16 additive dots drifting toward the eye at 12 m/s, neighbour rings
// turning opposite ways, each swelling on the kick.
import { float, vec3, floor, fract, mod, step, smoothstep, length, varying, positionLocal, positionGeometry, instanceIndex } from "builtin/tsl";
import { MeshBasicNodeMaterial, DoubleSide, AdditiveBlending } from "builtin/three";
import { tripClock, pal } from "./lib/trip.js";
import { inside, LY, LZ } from "./tunnel-lib.js";

export function material(ctx) {
  const m = new MeshBasicNodeMaterial();
  const c = tripClock(ctx);
  const i = float(instanceIndex), ring = floor(i.div(16)), spoke = mod(i, 16);
  const dd = fract(ring.div(25).sub(c.sec.div(25))).mul(300);
  const ang = spoke.div(16).add(ring.mul(0.031)).add(mod(ring, 2).mul(2).sub(1).mul(c.bar).div(8)).mul(6.2831853);
  const size = float(0.16).add(c.kick.mul(0.12));
  m.positionNode = vec3(ang.cos().mul(3.3).add(positionLocal.x.mul(size)), ang.sin().mul(3.3).add(LY).add(positionLocal.y.mul(size)), float(LZ).sub(dd));
  const vr = varying(ring), vd = varying(dd);
  const flight = step(60.35, c.sec);
  const dot = step(length(positionGeometry.xy), 0.5).mul(smoothstep(0, 6, vd)).mul(smoothstep(300, 290, vd));
  m.colorNode = pal(vr.mul(0.12)).mul(dot).mul(inside()).mul(float(0.12).add(flight.mul(0.7))).mul(smoothstep(192, 186, c.sec));
  m.transparent = true;
  m.blending = AdditiveBlending;
  m.depthWrite = false;
  m.side = DoubleSide;
  m.fog = false;
  return m;
}
