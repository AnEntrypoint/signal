// The bead strings: each bead a target (hot rim, black ring, contrasting pupil) seen from wherever you stand.
// The string winds round its serpent on the pair's own clock, so it passes in front of the body and behind it:
// the interleave. Bead i lights as the chase passes it.
import { positionLocal, attribute, float, vec3, select, varying, step, normalView, smoothstep } from "builtin/tsl";
import { MeshBasicNodeMaterial } from "builtin/three";
import { tripClock } from "./lib/trip.js";
import { decode, bodyMove, lightOf, finish, colours, shown, TAU } from "./serpents-lib.js";

export function material(ctx) {
  const c = tripClock(ctx);
  const pos = attribute("pos", "vec4"), info = attribute("info", "vec4"), N = attribute("nn", "vec4").xyz, B = attribute("bb", "vec4").xyz;
  const s = pos.w, b = decode(info.x), size = info.z, r = info.w;
  const oc0 = bodyMove(c, b, pos.xyz, s).oc;
  // a helix: turns along the body from the seed (2, 3 or 5), creeping round on the own clock
  const turns = select(c.pick(55, 3).lessThan(0.5), float(2), select(c.pick(55, 3).lessThan(1.5), float(3), float(5)));
  const th = s.mul(turns).mul(TAU).add(oc0.t.mul(TAU / 24)).add(oc0.phase);
  const centre = pos.xyz.add(N.mul(th.cos()).add(B.mul(th.sin())).mul(r.mul(1.05)));
  const mv = bodyMove(c, b, centre, s);
  const chase = smoothstep(0.1, 0.0, info.y.div(56).sub(c.bar.div(8).floor().div(8)).fract());
  const m = new MeshBasicNodeMaterial();
  m.positionNode = mv.p.add(positionLocal.mul(size.mul(mv.k.mul(0.25).add(1))));
  const wp = varying(mv.p);
  const K = colours(c.sec, b.pair.add(info.y.mod(3)));
  const fz = normalView.z.abs();
  const col = select(fz.greaterThan(0.82), K.H2, select(fz.greaterThan(0.6), vec3(0), K.H));
  const L = lightOf(c, b, s, wp, mv.oc).max(varying(chase));
  m.colorNode = finish(c, col.mul(1.6), L, s.mul(40));
  m.opacityNode = shown(c, "serpents", s).mul(step(0.0, wp.y));
  m.alphaTest = 0.5;
  m.fog = false;
  return m;
}
