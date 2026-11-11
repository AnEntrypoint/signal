// Hex chamber, shared shader helpers. near(): 1 once the camera is deep in the tunnel (z < -230), 0 from the
// field (z > -150): every chamber material collapses its geometry while it is 0, so nothing shows from outside.
import { cameraPosition, smoothstep, fwidth, abs, float, step, fract } from "builtin/tsl";
export const near = () => float(1).sub(smoothstep(-230, -150, cameraPosition.z));
export const alive = (g) => step(0.001, g);
// A line about 2 px wide wherever x crosses an integer (screen-space width: true line-art at any distance).
export const pxLine = (x, wide = 1) => {
  const px = fwidth(x).max(1e-5);
  return float(1).sub(smoothstep(px.mul(0.7 * wide), px.mul(0.7 * wide + 1.2), abs(fract(x.add(0.5)).sub(0.5))));
};
// Same about x = 0 only (no repeat).
export const pxEdge = (x, wide = 1) => {
  const px = fwidth(x).max(1e-5);
  return float(1).sub(smoothstep(px.mul(0.7 * wide), px.mul(0.7 * wide + 1.2), abs(x)));
};
