// knot-flower (tropes.yml, owner eye): the pupil's line-art knot. Family dealt by c.pick(35), the two copies turn
// opposite ways on their own slow clock (one turn in ~72 s, c.dir sense) so the union stays mirrored about x = 0 and
// the petals weave through each other. Strokes are neon: colour runs along the line inside the section's family,
// a lit head travels each petal on the bars, the rest rests dim; the kick ripple swells it outward 4 %.
import { MeshBasicNodeMaterial } from "builtin/three";
import { attribute, positionGeometry, positionWorld, cameraPosition, vertexColor, float, vec3, step, mix, smoothstep, length, distance, varying } from "builtin/tsl";
import { tripClock, shown } from "./lib/trip.js";
import { TAU, fam, ripple, barStep, relight, gate, breathScale, pupilDeal, lidOpen } from "./eye-lib.js";

export function material(ctx) {
  const c = tripClock(ctx);
  const F = fam(c);
  const g = positionGeometry;
  const vc = vertexColor().xyz;
  const code = float(attribute("knot", "uint"));
  const t = vc.x.max(0).pow(1 / 2.2);
  const cp = step(7.5, code), fi = step(3.5, code.mod(8)), L = code.mod(4);
  const border = step(L, 0.5), core = step(1.5, L);
  const keep = float(1).sub(fi.sub(c.pick(35, 2)).abs());
  const th = c.sec.mul(TAU / 72).mul(c.dir).mul(mix(0.8, 1.25, c.rnd(37))).add(TAU / 24).mul(cp.mul(-2).add(1));
  const cs = th.cos(), sn = th.sin();
  const r = length(g.xy);
  const k = ripple(c, r.add(1)).mul(0.04).add(1).mul(breathScale(c.sec));
  const X = g.x.mul(cs).sub(g.y.mul(sn)).mul(k), Y = g.x.mul(sn).add(g.y.mul(cs)).mul(k);
  // colour along the stroke: A <-> B six times round, a hot accent knot at every third crossing
  const along = t.mul(TAU * 6).add(cp.mul(3.14159)).cos().mul(0.5).add(0.5);
  const acc = t.mul(TAU * 3).add(c.phrase.mul(TAU / 4)).cos().max(0).pow(10);
  const col0 = mix(mix(F.A, F.B, along), F.hot(t), acc.mul(0.7));
  const col = mix(col0, mix(col0, vec3(1, 1, 1), 0.55).mul(1.3), core);
  // a lit head per petal, clicking round on the bars (opposite way on the second copy)
  const head = t.mul(6).sub(barStep(c).div(4).mul(c.dir).mul(cp.mul(-2).add(1))).fract();
  const lit = gate(c, smoothstep(0.3, 0.0, head).max(0.38), F.peak).max(0.3);
  const m = new MeshBasicNodeMaterial();
  m.positionNode = vec3(X, Y, g.z);
  m.colorNode = relight(col, varying(lit)).mul(float(1).sub(border)).mul(smoothstep(0.0, 0.3, lidOpen(c.sec)));
  m.opacityNode = shown(c, "eye", r.div(15)).mul(keep).mul(pupilDeal(c).k).mul(smoothstep(13, 15, distance(cameraPosition, positionWorld)));
  m.alphaTest = 0.5;
  return m;
}
