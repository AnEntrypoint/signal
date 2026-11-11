// The tunnel's shared shader frame: (angle, depth) coords of a world point, and the sight-line test that keeps
// every tunnel piece invisible from outside the tube. Axis (0,15) along -Z, mouth z=-36, far end z=-336, radius 6.
import { positionWorld, cameraPosition, float, vec2, vec3, atan2, length, clamp, select, abs, step } from "builtin/tsl";
export const Z0 = -36, Z1 = -336, AXY = 15, RAD = 6, LEN = 300;
// Every tunnel object stands at feet (0, 9, -186): local axis is y = 6, local z = 150 - depth.
export const FEET = { x: 0, y: 9, z: -186 }, LY = 6, LZ = 150;
export const BOUNDS = { min: [-6.2, -0.2, -150.5], max: [6.2, 12.2, 150.5] };
export function tun(p = positionWorld) {
  const rel = p.xy.sub(vec2(0, AXY));
  return { rel, r: length(rel), ang: atan2(rel.y, rel.x).div(6.2831853).add(0.5), d: float(Z0).sub(p.z) };
}
// 1 when the eye sees this fragment from inside the tube or through one of its two open ends, else 0.
export function inside() {
  const C = cameraPosition, P = positionWorld;
  const zc = clamp(C.z, Z1, Z0);
  const dz = P.z.sub(C.z);
  const t = zc.sub(C.z).div(select(abs(dz).lessThan(1e-3), float(-1e-3), dz));
  const hit = C.xy.add(P.xy.sub(C.xy).mul(t)).sub(vec2(0, AXY));
  return step(length(hit), RAD);
}
export const camDepth = () => float(Z0).sub(cameraPosition.z).max(0);
export const v3 = (a) => vec3(a[0], a[1], a[2]);
