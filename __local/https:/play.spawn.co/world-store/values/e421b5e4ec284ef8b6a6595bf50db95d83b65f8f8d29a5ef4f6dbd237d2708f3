// totem-stack and feather-fans: glyph plates (concentric target, eye, diamond, dealt by the seed per plate) and
// two mirrored fans of quills with striped barbs and an eye-spot at the tip, the light climbing the stack.
import { uv, float, vec2, vec3, select, step, smoothstep, mix } from "builtin/tsl";
import { MeshBasicNodeMaterial, DoubleSide } from "builtin/three";
import { tripClock } from "./lib/trip.js";
import { finish, colours, shown, kickAt, win, SEC, TAU } from "./serpents-lib.js";

export function material(ctx) {
  const c = tripClock(ctx);
  const code = uv().x.floor(), u = uv().x.fract(), v = uv().y;
  const isPlate = code.lessThan(10), qi = code.mod(20);
  const K = colours(c.sec, qi);
  // plate glyphs
  const p = vec2(u.sub(0.5).mul(2.2), v.sub(0.5).mul(1.75)), r = p.length();
  const g = c.pick(58, 3).add(qi).mod(3);
  const rings = step(0.5, r.mul(7).sub(c.sec.div(6).mul(c.dir)).fract());
  
  const ringCol = select(rings.greaterThan(0.5), K.A, vec3(0));
  const eye = select(vec2(p.x, p.y.mul(2.2)).length().lessThan(0.85), select(r.lessThan(0.3), select(r.lessThan(0.14), vec3(0), K.H), K.B), vec3(0));
  const dm = p.x.abs().add(p.y.abs());
  const dia = select(step(0.5, dm.mul(5).fract()).greaterThan(0.5), K.H, K.B);
  const glyph = select(g.lessThan(0.5), select(r.lessThan(0.26), select(r.lessThan(0.15), K.H2, vec3(0)), ringCol), select(g.lessThan(1.5), eye, dia));
  const edge = step(0.9, p.x.abs().max(p.y.abs().div(0.875)));
  const plate = select(edge.greaterThan(0.5), vec3(0.95), glyph);
  // quills: barbs across, a white shaft, an eye-spot at the tip
  const barb = step(0.5, v.mul(22).sub(u.sub(0.5).abs().mul(3)).sub(c.beat.div(8)).fract());
  const shaft = step(u.sub(0.5).abs(), 0.06);
  const tip = vec2(u.sub(0.5), v.sub(0.86).mul(3)).length();
  const spot = select(tip.lessThan(0.12), K.H2, select(tip.lessThan(0.2), vec3(0), select(tip.lessThan(0.32), K.H, vec3(-1))));
  const quillC = select(spot.x.greaterThan(-0.5), spot, select(shaft.greaterThan(0.5), vec3(0.95), select(barb.greaterThan(0.5), K.A, K.B.mul(0.3))));
  const col = select(isPlate, plate, quillC);
  const lvl = select(isPlate, code.div(9), v.mul(0.5).add(qi.div(22)));
  const climb = smoothstep(0.25, 0.0, lvl.sub(c.sec.div(12)).fract());
  const k = kickAt(c, lvl.mul(20).add(62));
  const L = climb.max(k.mul(0.5)).max(win(c.sec, SEC.peak, 2));
  const m = new MeshBasicNodeMaterial();
  m.colorNode = finish(c, col, L, v.mul(10));
  // the plates stack upward and the fans unfold on the bar from ascent
  const grow = smoothstep(108.35, 120.35, c.sec).mul(smoothstep(190, 186, c.sec));
  const vis = select(isPlate, step(code.div(9), grow.mul(1.05)), step(v, grow.mul(1.2).sub(qi.div(40))));
  m.opacityNode = shown(c, "serpents", lvl.min(1)).mul(vis).mul(step(108.35, c.sec));
  m.alphaTest = 0.5;
  m.side = DoubleSide;
  m.fog = false;
  return m;
}
