// The idol's lines: each frame turns 60 degrees per bar in a snapped step, neighbours opposite ways, punching
// out on the kick; on the fill (93.35 .. 96.35) the frames fly apart along z and snap back.
import { MeshBasicNodeMaterial } from "builtin/three";
import { positionLocal, uv, vec3, float, floor, smoothstep, step, sin, cos, select } from "builtin/tsl";
import { tripClock, HUE } from "./lib/trip.js";
import { near, alive } from "./chamber-fx.js";

export function material(ctx) {
  const c = tripClock(ctx), g = near();
  const m = new MeshBasicNodeMaterial();
  const id = floor(uv().x.add(0.5));
  const frame = step(id, 8.5), glyph = step(8.5, id).mul(step(id, 9.5));
  const dir = id.mod(2).mul(2).sub(1);
  const snap = (x, w) => floor(x).add(smoothstep(0, w, x.fract()));
  const fill = smoothstep(93.35, 93.95, c.sec).mul(step(c.sec, 96.35));
  const ang = dir.mul(1.0472).mul(snap(c.bar, 0.2)).mul(frame)
    .add(snap(c.beat, 0.3).mul(-1.0472).mul(glyph))
    .add(fill.mul(dir).mul(c.sec.sub(93.35)).mul(0.5).mul(frame));
  const p = positionLocal, ca = cos(ang), sa = sin(ang);
  const sc = c.kick.mul(0.05).mul(dir).mul(frame).add(1).add(c.kick.mul(0.35).mul(glyph));
  const x = p.x.mul(ca).sub(p.y.mul(sa)).mul(sc), y = p.x.mul(sa).add(p.y.mul(ca)).mul(sc);
  const z = p.z.add(id.sub(4).mul(2.3).mul(fill).mul(frame));
  m.positionNode = vec3(x, y, z).mul(alive(g));
  const H = HUE, cols = [H.orange, H.red, H.orange, H.red, H.orange, H.magenta, H.orange, H.green, H.red, H.yellow, H.orange];
  let col = vec3(...cols[cols.length - 1]);
  for (let i = cols.length - 2; i >= 0; i--) col = select(id.lessThan(i + 0.5), vec3(...cols[i]), col);
  m.colorNode = col.mul(c.kick.mul(1.6).add(2.0)).mul(g);
  return m;
}
