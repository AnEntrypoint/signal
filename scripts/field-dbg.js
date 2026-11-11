import { positionWorld, vec3, length } from "builtin/tsl";
import { MeshBasicNodeMaterial } from "builtin/three";
export function material(ctx) {
  const m = new MeshBasicNodeMaterial();
  m.colorNode = vec3(length(positionWorld.xz).div(90).fract(), 0.2, 1);
  return m;
}
