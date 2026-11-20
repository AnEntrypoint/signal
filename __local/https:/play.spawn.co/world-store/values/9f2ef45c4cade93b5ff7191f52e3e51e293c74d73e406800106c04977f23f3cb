// The ascent's maths: two mirrored rose curves of beads, r = cos(k th) at radius 13, standing upright left and right
// of the Eye. k steps through the roll's sequence on every 2 bars (3, 5/2, 7/3, 4 / 5, 4/3, 7/2 ...); beads ease to it.
import { positionLocal, attribute, float, vec3, select, varying, step, smoothstep, normalView, mix } from "builtin/tsl";
import { MeshBasicNodeMaterial } from "builtin/three";
import { tripClock } from "./lib/trip.js";
import { finish, colours, shown, kickAt, win, SEC, TAU } from "./serpents-lib.js";

const SEQS = [[[3, 1], [5, 2], [7, 3], [4, 1]], [[5, 1], [4, 3], [7, 2], [2, 1]], [[6, 1], [3, 2], [8, 3], [5, 4]]];
function rose(c, n, slot) {
  const seq = c.pick(57, 3);
  let num = float(0), den = float(1);
  for (let s = 0; s < 3; s++) for (let j = 0; j < 4; j++) {
    const on = seq.sub(s).abs().lessThan(0.5).and(slot.sub(j).abs().lessThan(0.5));
    num = select(on, float(SEQS[s][j][0]), num); den = select(on, float(SEQS[s][j][1]), den);
  }
  const th = n.mul(TAU).mul(den), k = num.div(den);
  const r = th.mul(k).cos();
  return vec3(th.cos().mul(r), th.sin().mul(r), 0);
}
export function material(ctx) {
  const c = tripClock(ctx);
  const rb = attribute("rb", "vec4"), n = rb.x, side = rb.y, i = rb.z;
  const step2 = c.bar.div(2).floor(), slot = step2.mod(4), f = smoothstep(0.0, 0.35, c.bar.div(2).fract());
  const pA = rose(c, n, slot.add(3).mod(4)), pB = rose(c, n, slot);
  const q = mix(pA, pB, f);
  const turn = c.sec.mul(TAU / 96).mul(c.dir).mul(side);
  const qr = vec3(q.x.mul(turn.cos()).sub(q.y.mul(turn.sin())), q.x.mul(turn.sin()).add(q.y.mul(turn.cos())), 0);
  const k = kickAt(c, n.mul(13).add(40));
  const g = smoothstep(108.35, 112.35, c.sec).mul(smoothstep(190, 186, c.sec));
  const R = float(13).mul(c.sec.mul(TAU / 12).sin().mul(0.015).add(1));
  const centre = vec3(side.mul(qr.x.mul(R).add(40)), qr.y.mul(R).add(26), -40);
  const m = new MeshBasicNodeMaterial();
  m.positionNode = centre.add(positionLocal.mul(float(0.42).mul(g).mul(k.mul(0.3).add(1))));
  const fz = normalView.z.abs();
  const K = colours(c.sec, i.mod(3));
  const col = select(fz.greaterThan(0.8), K.H2, select(fz.greaterThan(0.6), vec3(0), select(i.mod(2).lessThan(0.5), K.A, K.H)));
  const chase = smoothstep(0.2, 0.0, n.sub(c.sec.div(12).mul(c.dir)).fract());
  const L = varying(chase.max(k.mul(0.6)).max(win(c.sec, SEC.peak, 2)));
  m.colorNode = finish(c, col.mul(1.5), L, i);
  m.opacityNode = shown(c, "serpents", varying(n)).mul(step(108.35, c.sec));
  m.alphaTest = 0.5;
  m.fog = false;
  return m;
}
