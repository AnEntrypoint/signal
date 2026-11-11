// The faint fog of dots: 25 rings of 16 additive dots drifting toward the eye at 3 m/s, neighbour rings
// crawling opposite ways (a turn in 96 s), in the phrase's accent hue, breathing with the world.
import { float, vec3, floor, fract, mod, step, smoothstep, length, varying, positionLocal, positionGeometry, instanceIndex } from "builtin/tsl";
import { MeshBasicNodeMaterial, DoubleSide, AdditiveBlending } from "builtin/three";
import { tripClock } from "./lib/trip.js";
import { inside, LY, LZ, breath, fam, light } from "./tunnel-lib.js";

export function material(ctx) {
  const m = new MeshBasicNodeMaterial();
  const c = tripClock(ctx), F = fam(c);
  const i = float(instanceIndex), ring = floor(i.div(16)), spoke = mod(i, 16);
  const dd = fract(ring.div(25).sub(c.sec.div(100))).mul(300);
  const ang = spoke.div(16).add(ring.mul(0.031)).add(mod(ring, 2).mul(2).sub(1).mul(c.phrase).div(8)).mul(6.2831853);
  const Lv = light(c, dd);
  const size = float(0.16).mul(float(1).add(breath(c).mul(0.04)).add(Lv.ring.mul(0.5)));
  m.positionNode = vec3(ang.cos().mul(3.3).add(positionLocal.x.mul(size)), ang.sin().mul(3.3).add(LY).add(positionLocal.y.mul(size)), float(LZ).sub(dd));
  const vd = varying(dd), vL = varying(Lv.L);
  const dot = step(length(positionGeometry.xy), 0.5).mul(smoothstep(0, 6, vd)).mul(smoothstep(300, 290, vd));
  m.colorNode = F.acc.mul(dot).mul(inside()).mul(float(0.08).add(vL.mul(0.7))).mul(smoothstep(192, 186, c.sec));
  m.transparent = true;
  m.blending = AdditiveBlending;
  m.depthWrite = false;
  m.side = DoubleSide;
  m.fog = false;
  return m;
}
