// knot-serpent: two mirrored (p,q) torus knots flanking the totem, a striped tube with a light running its length.
// (p,q) from the seed: (2,3), (3,5) or (2,5). C(u) = ((R + r cos qu) cos pu, (R + r cos qu) sin pu, r sin qu).
import { positionLocal, uv, attribute, float, vec3, select, varying, step, smoothstep, mix } from "builtin/tsl";
import { MeshBasicNodeMaterial, DoubleSide } from "builtin/three";
import { tripClock } from "./lib/trip.js";
import { finish, colours, shown, kickAt, win, SEC, TAU } from "./serpents-lib.js";

export function material(ctx) {
  const c = tripClock(ctx);
  const side = attribute("kn", "vec4").x, u = uv().x, w = uv().y;
  const pk = c.pick(56, 3);
  const P = select(pk.lessThan(1.5), select(pk.lessThan(0.5), float(2), float(3)), float(2));
  const Q = select(pk.lessThan(0.5), float(3), float(5));
  const k = kickAt(c, float(60));
  const br = c.sec.mul(TAU / 12).sin().mul(0.015).add(1);
  const R = float(7.5).mul(br), r = float(3.2).mul(k.mul(0.06).add(1));
  const turn = c.sec.mul(TAU / 72).mul(c.dir).mul(side);
  const C = (t) => { const a = t.mul(TAU); const rr = R.add(r.mul(a.mul(Q).cos())); return vec3(rr.mul(a.mul(P).add(turn).cos()), rr.mul(a.mul(P).add(turn).sin()), r.mul(a.mul(Q).sin())); };
  const c0 = C(u), T = C(u.add(0.002)).sub(c0).normalize();
  const N = T.cross(vec3(0, 0, 1)).add(vec3(0.0001, 0, 0)).normalize(), B = T.cross(N);
  const g = smoothstep(108.35, 114.35, c.sec).mul(smoothstep(190, 186, c.sec));
  const tube = float(0.55).mul(g);
  const ang = w.mul(TAU);
  const p = c0.add(N.mul(ang.cos()).add(B.mul(ang.sin())).mul(tube));
  const m = new MeshBasicNodeMaterial();
  m.positionNode = vec3(side.mul(34), 40, -62).add(vec3(p.x.mul(side), p.y, p.z));
  const K = colours(c.sec, side.add(1));
  const x = u.mul(160);
  const n = x.sub(c.bar.mul(0.5)), idx = n.floor();
  const col = select(idx.mod(4).lessThan(0.5), select(w.mul(8).fract().sub(0.5).abs().lessThan(0.2), K.H, K.A), vec3(step(0.5, n.fract()).mul(0.95)));
  const L = smoothstep(0.25, 0.0, u.sub(c.sec.div(16).mul(c.dir)).fract()).max(win(c.sec, SEC.peak, 2));
  m.colorNode = finish(c, col, L, x);
  m.opacityNode = shown(c, "serpents", u.sub(0.5).abs().mul(2)).mul(step(108.35, c.sec));
  m.alphaTest = 0.5;
  m.side = DoubleSide;
  m.fog = false;
  return m;
}
