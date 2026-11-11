// Three rings of bead-eyes proud of the iris (24 / 36 / 48 at r 6.2 / 9.5 / 13.2), neighbours crawling opposite ways
// (48 / 72 / 96 s a turn). They rest in graphite; a two-headed chase clicks round each ring on the bars and lights
// the beads it passes, and the kick ripple swells each ring 8 % as it reaches it. Each pupil looks at the camera.
import { MeshBasicNodeMaterial } from "builtin/three";
import { positionGeometry, instanceIndex, cameraPosition, modelWorldMatrix, float, vec3, vec4, step, mix, smoothstep, normalize, dot, varying } from "builtin/tsl";
import { tripClock, shown } from "./lib/trip.js";
import { TAU, fam, ripple, barStep, relight, gate, breathScale } from "./eye-lib.js";

export function material(ctx) {
  const c = tripClock(ctx);
  const F = fam(c);
  const i = float(instanceIndex);
  const r1 = step(24, i), r2 = step(60, i);
  const ring = r1.add(r2);
  const j = i.sub(r1.mul(24)).sub(r2.mul(36));
  const n = r1.mul(12).add(r2.mul(12)).add(24);
  const R = r1.mul(3.3).add(r2.mul(3.7)).add(6.2);
  const dir = r2.mul(2).sub(r1.mul(2)).add(1);
  const rate = float(0.25).sub(r1.mul(0.25 + 1 / 6)).add(r2.mul(1 / 6 + 0.125)); // +1/4, -1/6, +1/8 turn a phrase
  const fr = j.div(n);
  const ang = fr.add(rate.mul(c.phrase)).mul(TAU);
  const rip = ripple(c, R);
  const chase = smoothstep(0.36, 0.3, fr.mul(2).sub(dir.mul(barStep(c)).div(8)).fract());
  const lit = gate(c, chase.max(rip.mul(0.8)), F.peak);
  const bs = breathScale(c.sec);
  const size = ring.mul(0.06).add(0.34).mul(rip.mul(0.08).add(1)).mul(bs);
  const centre = vec3(ang.cos().mul(R).mul(bs), ang.sin().mul(R).mul(bs), ring.mul(0.35).add(0.45));
  const wc = modelWorldMatrix.mul(vec4(centre, 1)).xyz;
  const gaze = normalize(normalize(cameraPosition.sub(wc)).add(vec3(0, 0, 0.3)));
  const dv = varying(dot(normalize(positionGeometry), gaze));
  const vr1 = varying(r1), vr2 = varying(r2), vlit = varying(lit);

  const base = mix(mix(F.hot(0.0), vec3(1, 1, 1), vr1), F.at(0.25), vr2);
  const irisC = mix(mix(F.A, F.at(0.1), vr1), F.hot(0.2), vr2);
  let col = mix(base, irisC, smoothstep(0.74, 0.76, dv));
  col = relight(col, vlit);
  col = mix(col, vec3(0, 0, 0), smoothstep(0.86, 0.88, dv));

  const m = new MeshBasicNodeMaterial();
  m.positionNode = positionGeometry.mul(size).add(centre);
  m.colorNode = col;
  m.opacityNode = shown(c, "eye", varying(R.div(15)));
  m.alphaTest = 0.5;
  return m;
}
