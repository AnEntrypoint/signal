// Three rings of bead-eyes proud of the iris (24 / 36 / 48 at r 6.2 / 9.5 / 13.2), neighbours turning opposite
// ways, each popping on the kick with a delay that runs round its ring, each with a pupil that looks at the camera.
import { MeshBasicNodeMaterial } from "builtin/three";
import { positionGeometry, instanceIndex, cameraPosition, modelWorldMatrix, float, vec3, vec4, step, mix, smoothstep, normalize, dot, varying } from "builtin/tsl";
import { tripClock, HUE } from "./lib/trip.js";
import { hue, live, TAU } from "./eye-lib.js";

export function material(ctx) {
  const c = tripClock(ctx);
  const i = float(instanceIndex);
  const r1 = step(24, i), r2 = step(60, i);
  const ring = r1.add(r2);
  const j = i.sub(r1.mul(24)).sub(r2.mul(36));
  const n = r1.mul(12).add(r2.mul(12)).add(24);
  const R = r1.mul(3.3).add(r2.mul(3.7)).add(6.2);
  const dir = r2.mul(2).sub(r1.mul(2)).add(1);
  const rate = r1.mul(0.5).sub(r2.mul(0.5)).add(0.5);
  const fr = j.div(n);
  const ang = fr.add(dir.mul(rate).mul(c.phrase)).mul(TAU);
  const pop = c.beat.sub(fr.mul(2)).fract().mul(-5).exp().mul(live(c.sec));
  const size = ring.mul(0.06).add(0.34).mul(pop.mul(0.6).add(1));
  const centre = vec3(ang.cos().mul(R), ang.sin().mul(R), ring.mul(0.35).add(0.45));
  const wc = modelWorldMatrix.mul(vec4(centre, 1)).xyz;
  const gaze = normalize(normalize(cameraPosition.sub(wc)).add(vec3(0, 0, 0.3)));
  const dv = varying(dot(normalize(positionGeometry), gaze));
  const vr1 = varying(r1), vr2 = varying(r2), vpop = varying(pop);

  const base = mix(mix(hue(HUE.yellow, 1.8), vec3(1.0, 1.0, 1.0), vr1), hue(HUE.magenta, 1.9), vr2);
  const irisC = mix(mix(hue(HUE.red, 1.6), hue(HUE.blue, 1.8), vr1), hue(HUE.cyan, 1.6), vr2);
  let col = mix(base, irisC, smoothstep(0.74, 0.76, dv));
  col = mix(col, vec3(0, 0, 0), smoothstep(0.86, 0.88, dv));
  col = col.mul(vpop.mul(0.8).add(1));

  const m = new MeshBasicNodeMaterial();
  m.positionNode = positionGeometry.mul(size).add(centre);
  m.colorNode = col;
  return m;
}
