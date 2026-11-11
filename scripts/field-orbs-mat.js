// The orbs: glossy without a light. Rings of flat colour by how far the surface turns from the eye: a bright
// rim, a black line, the body, a darker core ring, a hot centre. They circle the centre and bob on the half-beat.
import { positionLocal, normalView, attribute, float, vec3, smoothstep, select, mix, varying } from "builtin/tsl";
import { MeshBasicNodeMaterial } from "builtin/three";
import { tripClock, HUE } from "./lib/trip.js";
import { endFade, backOut } from "./field-lib.js";

const V = (h, g = 1) => vec3(h[0] * g, h[1] * g, h[2] * g);

export function material(ctx) {
  const c = tripClock(ctx);
  const o = attribute("orb", "vec4"), t = attribute("turn", "vec2");
  const ang = o.y.add(t.x.mul(c.phrase).mul(6.2831853));
  const appear = backOut(c.sec.sub(36.35).sub(t.y.mul(0.12)).div(0.9)).mul(endFade(c.sec));
  const bob = c.half.mul(0.7).add(c.beat.mul(0.3927).add(t.y).sin().mul(0.5));
  const m = new MeshBasicNodeMaterial();
  m.positionNode = positionLocal.mul(o.z).mul(appear).mul(c.kick.mul(0.06).add(1))
    .add(vec3(ang.cos().mul(o.x), o.w.add(bob), ang.sin().mul(o.x)));
  const nz = normalView.z.abs();
  const kind = varying(t.y.mod(3));
  const bodyC = select(kind.lessThan(0.5), V(HUE.orange, 1.5), select(kind.lessThan(1.5), V(HUE.red, 1.5), V(HUE.yellow, 1.3)));
  const coreC = select(kind.lessThan(0.5), V(HUE.red, 0.9), select(kind.lessThan(1.5), V(HUE.magenta, 0.8), V(HUE.orange, 1.0)));
  const rimC = select(kind.lessThan(1.5), V(HUE.yellow, 2.2), V(HUE.white, 2.0));
  const e = (x) => smoothstep(x - 0.012, x + 0.012, nz);
  let col = rimC;
  col = mix(col, vec3(0), e(0.3));
  col = mix(col, bodyC, e(0.37));
  col = mix(col, coreC, e(0.7));
  col = mix(col, vec3(0), e(0.86));
  col = mix(col, rimC, e(0.9));
  m.colorNode = col;
  m.fog = false;
  return m;
}
