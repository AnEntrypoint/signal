// The naga tails' skin (params.n = 1..4): opaque black bodies winding through the canvas planes. Each tail is DEALT its
// own skin (op-art stripes / diamond scales / bead rows / mudra rings) and a second that travels root to tip; one goes
// silhouette at the culmination; they retract tip-first one after another. Seed 264-268 and 391-411.
import { MeshBasicNodeMaterial, DoubleSide } from "builtin/three";
import { positionGeometry, normalView, uv, float, vec2, vec3, smoothstep, step, mix } from "builtin/tsl";
import { tripClock, visionShown, visionU, inv, is } from "./lib/trip.js";

export function material(ctx) {
  const c = tripClock(ctx), n = ctx.params.n ?? 1, low = ctx.quality === "low";
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  const u = visionU(ctx, c), sec = c.real, s = uv().x, a = uv().y;
  const dir = step(0.5, c.rnd(264)).mul(2).sub(1);
  const ph = s.mul(9).sub(sec.mul(0.9 + n * 0.17).mul(dir)).add(n * 1.7);
  const amp = s.mul(s).mul(5.5).add(s.mul(1.2));
  // the depth weave: the mid-body swings through ring / being / veil, behind the figure and out in front of it
  const S = float(s).clamp(0, 1), dz = step(0.5, c.rnd(391 + n)).mul(2).sub(1).mul(c.rnd(395 + n).mul(5).add(11));
  const weave = S.mul(c.rnd(399 + n).mul(1.6).add(1.4).mul(3.14159)).add(c.rnd(403 + n).mul(6.283)).add(sec.mul(0.21 + 0.04 * n)).sin().mul(S.mul(inv(S)).mul(4)).mul(dz);
  m.positionNode = positionGeometry.add(vec3(ph.sin().mul(amp), ph.mul(0.63).add(1.3).cos().mul(amp).mul(0.7), ph.mul(1.31).sin().mul(amp).mul(0.5).add(weave)));
  const fam = c.pick(260, 3), fp = (x, y, z) => vec3(...x).mul(is(fam, 0)).add(vec3(...y).mul(is(fam, 1))).add(vec3(...z).mul(is(fam, 2)));
  const A = fp([0.1, 1.0, 0.15], [1.0, 0.05, 0.6], [1.0, 0.85, 0.05]);
  const C = fp([0.05, 0.12, 1.0], [0.45, 0.05, 1.0], [0.05, 0.12, 1.0]);
  const W = vec3(1, 1, 1);
  const x0 = 0.86 + 0.012 * (4 - n);
  const grow = smoothstep(0.59 + 0.06 * (n - 1), 0.67 + 0.06 * (n - 1), u).mul(inv(smoothstep(x0, x0 + 0.035, u)));
  const here = n === 4 ? step(0.45, c.rnd(268)) : float(1);
  const g = vec2(s.mul(44), a.mul(12)), d1 = g.x.add(g.y).fract().sub(0.5).abs(), d2 = g.x.sub(g.y).fract().sub(0.5).abs();
  const bl = vec2(s.mul(40).fract().sub(0.5), a.mul(6).fract().sub(0.5).mul(1.3)).length();
  const rg = s.mul(18).fract().sub(0.5).abs();
  const skins = [
    W.mul(step(0.5, s.mul(46).add(a.mul(n % 2 ? 1 : -1)).fract())),
    mix(A, W, 0.3).mul(step(d1.min(d2), 0.09).add(step(d1.max(d2), 0.14).mul(0.9)).clamp(0, 1)),
    mix(A, W, s).mul(step(bl, 0.33).mul(inv(step(bl, 0.2).mul(step(0.1, bl))))),
    C.mul(1.3).add(0.1).mul(step(rg, 0.1)).add(A.mul(step(0.3, rg)).mul(step(vec2(rg.sub(0.4).mul(2), a.mul(8).fract().sub(0.5)).length(), 0.3))),
  ];
  // the deal: tail n wears skin (roll + n) % 4, then a second one travels up it root to tip
  const m1 = c.pick(265, 4).add(n).mod(4), m2 = m1.add(1).add(c.pick(407 + n, 2)).mod(4);
  const wear = (v) => skins.reduce((acc, sk, i) => acc.add(sk.mul(is(v, i))), vec3(0));
  const k1 = 0.6 + n * 0.06;
  let skin = low ? wear(m1) : mix(wear(m1), wear(m2), step(s, smoothstep(k1, k1 + 0.1, u).mul(1.05)));
  const sil = smoothstep(0.8, 0.82, u).mul(inv(smoothstep(0.85, 0.87, u))).mul(is(c.pick(266, 2).add(1), n));
  skin = skin.mul(inv(sil)).mul(float(0.85).add(c.kick.mul(0.35)));
  const nz = normalView.z.abs().clamp(0, 1), rim = inv(nz).max(0.0001).pow(3);
  m.colorNode = skin.mul(nz.mul(0.75).add(0.25)).add(C.mul(rim).mul(mix(float(1.4), float(0.9), sil)));
  m.opacityNode = step(s, grow.mul(1.02)).mul(step(0.001, grow)).mul(here).mul(visionShown(ctx, c, 0));
  m.alphaTest = 0.5;
  return m;
}
