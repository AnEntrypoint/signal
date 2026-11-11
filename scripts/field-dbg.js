import { float, positionWorld, length, vec3, select } from "builtin/tsl";
import { material as mm } from "./field-mandala.js";
import { tripClock, shown } from "./lib/trip.js";
import { growR } from "./field-lib.js";
export function material(ctx) {
  const m = mm(ctx);
  const c = tripClock(ctx), r = length(positionWorld.xz);
  const a = shown(c, "field", r.div(90)), g = growR(c.sec).div(91);
  m.colorNode = vec3(a, g, c.sec.div(198));
  m.opacityNode = float(1); m.alphaTest = 0;
  return m;
}
