// spine check for scripts/lib/trip.js: a card that shows kick (red), section window (green), rainbow by bar (blue-ish bands)
import { MeshBasicNodeMaterial } from "builtin/three";
import { uv, vec3, mix } from "builtin/tsl";
import { tripClock, win, SEC, pal, stripes } from "./lib/trip.js";
export function material(ctx) {
  const m = new MeshBasicNodeMaterial();
  const c = tripClock(ctx);
  const band = stripes(uv().x.add(c.bar.mul(0.25)), 8);
  m.colorNode = mix(pal(uv().y.add(c.phrase)).mul(band), vec3(1, 0, 0), c.kick.mul(uv().y.step(0.2))).add(vec3(0, win(c.sec, SEC.bloom), 0).mul(uv().y.oneMinus().step(0.1)));
  return m;
}
