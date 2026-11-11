// The naga tails' skin: opaque black body (depth-writing, so it hides what is behind and is hidden by what is in
// front), op-art stripes -> diamond scales -> bead rows travelling root to tip, a rim by view angle for roundness.
// Vertex stage: travelling sine waves along the spine, growing toward the tip. Grows root-first u .55-.8 (cut by
// along-length), one tail goes pure silhouette (rim only) at the culmination, all retract tip-first on the exit.
// Seed: 264 wave sense, 265 skin order, 266 which goes dark, 268 whether the 4th tail comes.
import { MeshBasicNodeMaterial, DoubleSide } from "builtin/three";
import { positionGeometry, normalView, uv, float, vec2, vec3, smoothstep, step, mix, select } from "builtin/tsl";
import { tripClock, visionShown, visionU } from "./lib/trip.js";

export function material(ctx) {
  const c = tripClock(ctx), n = ctx.params.n ?? 1;
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  const u = visionU(ctx, c), sec = c.real, s = uv().x, a = uv().y;
  const dir = step(0.5, c.rnd(264)).mul(2).sub(1);
  // the body really moves: two travelling waves, amplitude growing to the tip
  const ph = s.mul(9).sub(sec.mul(0.9 + n * 0.17).mul(dir)).add(n * 1.7);
  const amp = s.mul(s).mul(5.5).add(s.mul(1.2));
  m.positionNode = positionGeometry.add(vec3(ph.sin().mul(amp), ph.mul(0.63).add(1.3).cos().mul(amp).mul(0.7), ph.mul(1.31).sin().mul(amp).mul(0.5)));
  const fam = c.pick(260, 3);
  const pk = (x, y, z) => select(fam.lessThan(0.5), vec3(...x), select(fam.lessThan(1.5), vec3(...y), vec3(...z)));
  const A = pk([0.1, 1.0, 0.15], [1.0, 0.05, 0.6], [1.0, 0.85, 0.05]);
  const C = pk([0.05, 0.12, 1.0], [0.45, 0.05, 1.0], [0.05, 0.12, 1.0]);
  const W = vec3(1, 1, 1);
  const grow = smoothstep(0.55 + 0.03 * (n - 1), 0.74 + 0.02 * (n - 1), u).mul(float(1).sub(smoothstep(0.93 + 0.006 * (4 - n), 0.965 + 0.006 * (4 - n), u)));
  const here = n === 4 ? step(0.45, c.rnd(268)) : float(1);
  // skins
  const stripe = step(0.5, s.mul(46).add(a.mul(n % 2 ? 1 : -1)).fract());
  const g = vec2(s.mul(44), a.mul(12)), d1 = g.x.add(g.y).fract().sub(0.5).abs(), d2 = g.x.sub(g.y).fract().sub(0.5).abs();
  const scale = step(d1.min(d2), 0.09).add(step(d1.max(d2), 0.14).mul(0.9)).clamp(0, 1);
  const bg = vec2(s.mul(40).fract().sub(0.5), a.mul(6).fract().sub(0.5).mul(1.3)), bl = bg.length();
  const bead = step(bl, 0.33).mul(float(1).sub(step(bl, 0.2).mul(step(0.1, bl))));
  const order = step(0.5, c.rnd(265));
  const sk0 = W.mul(stripe);
  const sk1 = mix(mix(A, W, 0.3).mul(scale), mix(A, W, s).mul(bead), order);
  const sk2 = mix(mix(A, W, s).mul(bead), C.mul(1.3).add(0.1).mul(scale), order);
  // each new skin travels root to tip as a wave front
  const f1 = step(s, smoothstep(0.7, 0.8, u).mul(1.05)), f2 = step(s, smoothstep(0.8, 0.88, u).mul(1.05));
  let skin = mix(mix(sk0, sk1, f1), sk2, f2);
  const darkN = c.pick(266, 2).add(1); // tail 1 or 2 goes to silhouette
  const sil = smoothstep(0.85, 0.87, u).mul(float(1).sub(smoothstep(0.925, 0.94, u))).mul(step(darkN.sub(n).abs(), 0.5));
  skin = skin.mul(float(1).sub(sil)).mul(float(0.85).add(c.kick.mul(0.35)));
  const nz = normalView.z.abs().clamp(0, 1);
  const rim = float(1).sub(nz).pow(3);
  const shade = nz.mul(0.75).add(0.25);
  m.colorNode = skin.mul(shade).add(C.mul(rim).mul(mix(float(1.4), float(0.9), sil)));
  m.opacityNode = step(s, grow.mul(1.02)).mul(step(0.001, grow)).mul(here).mul(visionShown(ctx, c, 0));
  m.alphaTest = 0.5;
  return m;
}
