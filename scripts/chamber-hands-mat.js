// The hands as contour line-art: black fill, a hot silhouette line, thin contour lines running along every
// finger and round the forearm, a second set of contour rings (distance from the idol) crawling over them so
// the two shimmer as moire, little targets on the fingertips, one in the palm. They rest dim: the kick's
// ripple lights them as it passes outward and curls each finger by its segment. They slide in from the walls
// 84.35 .. 90 and back out on the fill; left is the right mirrored.
import { MeshBasicNodeMaterial } from "builtin/three";
import { positionLocal, positionWorld, normalView, uv, vec2, vec3, float, floor, length, abs, sign, smoothstep, step, max, mix, sin, fwidth } from "builtin/tsl";
import { tripClock, shown } from "./lib/trip.js";
import { near, alive, ripple, breath, family, pxLine, pxEdge } from "./chamber-fx.js";

export function material(ctx) {
  const c = tripClock(ctx), g = near(), F = family(c);
  const m = new MeshBasicNodeMaterial();
  const u = uv().x, v = uv().y;
  const id = floor(u.div(4).add(0.002)), t = u.sub(id.mul(4));
  const isF = step(id, 4.5), isArm = step(5.5, id), isPalm = float(1).sub(isF).sub(isArm);
  // vertex: slide, breath, curl
  const p = positionLocal, sx = sign(p.x);
  const reach = smoothstep(84.35, 90, c.sec).mul(float(1).sub(smoothstep(93.35, 95.6, c.sec).mul(0.45)));
  const eV = ripple(c, length(p.xy));
  const bend = t.max(0).mul(0.45).add(t.sub(1).max(0).mul(0.5)).add(t.sub(2).max(0).mul(0.45));
  const curl = bend.mul(isF).mul(eV.mul(0.32).add(breath(c).mul(0.12)));
  const k = breath(c).mul(0.03).add(1);
  m.positionNode = vec3(p.x.mul(k).add(sx.mul(float(1).sub(reach)).mul(24)), p.y.mul(k), p.z.add(curl)).mul(alive(g));
  // fragment
  const dist = length(positionWorld.xy.sub(vec2(0, 15)));
  const e = ripple(c, dist);
  const rim = float(1).sub(smoothstep(0.26, 0.4, abs(normalView.z)));
  const n = mix(float(8), float(16), float(1).sub(isF));
  const along = pxLine(v.mul(n));
  const crease = max(pxEdge(t.sub(1)), pxEdge(t.sub(2))).mul(isF);
  const armRings = pxLine(t.mul(7)).mul(isArm);
  const moire = pxLine(dist.mul(c.pick(48, 3).mul(0.7).add(1.6)).sub(c.sec.mul(0.25).mul(c.dir))); // 1.6, 2.3 or 3 contours a metre
  const circ = (cu, cv, su, sv, r) => { const dd = length(vec2(t.sub(cu).mul(su), v.sub(cv).mul(sv))); return { ring: pxEdge(dd.sub(r), 1.3), disc: float(1).sub(smoothstep(r * 0.38, fwidth(dd).mul(1.5).add(r * 0.38), dd)) }; };
  const tip = circ(2.55, 0.25, 1.25, 2.7, 0.3), palm = circ(1.75, 0.25, 1.85, 11, 0.95), palm2 = circ(1.75, 0.25, 1.85, 11, 0.6);
  const hollow = max(tip.ring.mul(isF), max(palm.ring, palm2.ring).mul(isPalm));
  const pupil = max(tip.disc.mul(isF), palm2.disc.mul(isPalm));
  const stroke = mix(F.hot, F.hot2, sin(t.mul(2.2).add(id).add(c.sec.mul(0.3))).mul(0.5).add(0.5));
  const inner = max(max(along, armRings).mul(0.75), max(crease, moire.mul(0.4)));
  const col = stroke.mul(rim).mul(e.mul(1.6).add(1.1))
    .add(stroke.mul(inner).mul(float(1).sub(rim)).mul(e.mul(1.9).add(0.16)))
    .add(F.hot.mul(hollow).mul(e.mul(1.5).add(1.0)))
    .add(F.b.mul(pupil).mul(e.mul(2.4).add(0.3)));
  m.colorNode = col.mul(g.mul(0.6));
  m.opacityNode = shown(c, "hands", dist.div(24));
  m.alphaTest = 0.5;
  return m;
}
