// The orbs: glossy without a light. Rings of flat colour by how far the surface turns from the eye: a bright
// rim, a black line, the body, a darker core ring, a hot centre. They circle the centre and bob on the half-beat.
import { positionLocal, normalView, attribute, float, vec3, smoothstep, select, mix, varying } from "builtin/tsl";
import { MeshBasicNodeMaterial } from "builtin/three";
import { tripClock, HUE, shown } from "./lib/trip.js";
import { endFade, backOut, family, breath, mirrorTurn, kickAt, lit, shade, roll } from "./field-lib.js";

const V = (h, g = 1) => vec3(h[0] * g, h[1] * g, h[2] * g);

export function material(ctx) {
  const c = tripClock(ctx);
  const o = attribute("orb", "vec4"), t = attribute("turn", "vec2");
  const ang = o.y.add(t.x.mul(c.phrase).mul(c.dir).mul(mix(0.7, 1.3, c.rnd(14))).mul(6.2831853));
  const appear = backOut(c.sec.sub(36.35).sub(t.y.mul(0.12)).div(0.9)).mul(endFade(c.sec));
  const bob = c.half.mul(0.15).add(c.beat.mul(0.3927).add(t.y).sin().mul(0.5));
  const m = new MeshBasicNodeMaterial();
  m.positionNode = positionLocal.mul(o.z).mul(appear).mul(kickAt(c, o.x).mul(0.06).add(1))
    .add(vec3(ang.cos().mul(o.x), o.w.add(bob), ang.sin().mul(o.x)).mul(breath(c.sec)));
  const nz = normalView.z.abs();
  const kind = varying(t.y.mod(3));
  const vL = varying(lit(c, o.x, mirrorTurn(ang.cos(), ang.sin()), 0));
  const F = family(c.sec);
  const bodyC = F.full.not().select(F.H, select(kind.lessThan(0.5), vec3(1.0,0.3,0.0), select(kind.lessThan(1.5), vec3(1.0,0.03,0.02), vec3(1.0,0.7,0.0))));
  const coreC = F.full.not().select(F.H.mul(0.55), select(kind.lessThan(0.5), vec3(0.75,0.02,0.02), select(kind.lessThan(1.5), vec3(0.8,0.0,0.4), vec3(0.9,0.2,0.0))));
  const rimC = F.full.not().select(F.H.mul(1.3), select(kind.lessThan(1.5), vec3(1.3,0.95,0.05), vec3(1.3,0.5,0.0)));
  const e = (x) => smoothstep(x - 0.012, x + 0.012, nz);
  let col = rimC;
  col = mix(col, vec3(0), e(0.3));
  col = mix(col, bodyC, e(0.37));
  col = mix(col, coreC, e(0.62));
  col = mix(col, bodyC, e(0.78));
  m.colorNode = roll(c, shade(col, vL));
  m.opacityNode = varying(shown(c, "orbs", o.x.div(90)));
  m.alphaTest = 0.5;
  m.fog = false;
  return m;
}
