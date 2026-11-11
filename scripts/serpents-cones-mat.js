// The block towers of the outer field: striped cubes under spiral-striped spikes, popping up as the kick ripple
// passes their radius, lit by a k-fold sweep (k = the roll's symmetry order 6/8/12).
import { positionLocal, uv, attribute, float, vec3, select, varying, step, smoothstep } from "builtin/tsl";
import { MeshBasicNodeMaterial } from "builtin/three";
import { tripClock } from "./lib/trip.js";
import { finish, colours, shown, kickAt, win, SEC, TAU } from "./serpents-lib.js";
import { choose, held } from "./field-lib.js";

export function material(ctx) {
  const c = tripClock(ctx);
  const info = attribute("info", "vec4"), r = info.x, ang = info.y, tall = info.z, hm = info.w;
  const k = kickAt(c, r);
  const hy = select(tall.greaterThan(0.5), hm, float(1)).mul(k.mul(0.3).add(1));
  const lp = positionLocal, part = uv().x;
  const y = select(part.lessThan(0.99), lp.y.mul(hy), lp.y.sub(0.6).add(hy.mul(0.6)));
  const sc = smoothstep(30.35, 40.35, c.sec).mul(smoothstep(192, 187, c.sec)).mul(1.6);
  const ca = ang.cos(), sa = ang.sin();
  const m = new MeshBasicNodeMaterial();
  m.positionNode = vec3(ang.sin().mul(r), 0, ang.cos().mul(r).negate()).add(vec3(lp.x.mul(ca).sub(lp.z.mul(sa)), y, lp.x.mul(sa).add(lp.z.mul(ca))).mul(sc));
  const vy = varying(y), vk = varying(k), vr = varying(r), vang = varying(ang);
  const K = colours(c.sec, vr.div(4.4).floor());
  const band = vy.mul(4).floor(), cube = select(band.mod(3).lessThan(0.5), K.H, vec3(step(0.5, band.mod(2)).mul(0.95)));
  const spiral = step(0.5, part.fract().mul(3).add(uv().y.mul(5)).sub(c.beat.div(8)).fract());
  const col = select(part.lessThan(0.99), cube, select(spiral.greaterThan(0.5), K.A.mul(1.3), K.H2));
  const kk = choose(c, 8, [6, 8, 12]);
  const am = vang.sin().abs().atan2(vang.cos()).mul(kk);
  const sweep = smoothstep(0.75, 1.0, am.sub(c.sec.mul(TAU / 24).mul(c.dir)).cos());
  const L = sweep.max(vk.mul(0.8)).max(win(c.sec, SEC.peak, 2));
  m.colorNode = finish(c, col, L, vy.mul(4));
  m.opacityNode = held(c, "serpents", shown(c, "serpents", vr.div(90)), 1.2);
  m.alphaTest = 0.5;
  m.fog = false;
  return m;
}
