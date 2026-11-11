import { float } from "builtin/tsl";
import { material as mm } from "./field-mandala.js";
export function material(ctx) {
  const m = mm(ctx);
  m.opacityNode = float(1); m.alphaTest = 0;
  return m;
}
