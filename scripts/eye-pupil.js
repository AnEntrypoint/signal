// Inside the hole: a dark well of blue/violet rings scrolling inward with a row of hot dots, so from afar the
// pupil is deep and never a gap. See-through: it fades to nothing as the camera comes within 12 m, so the
// flight through the hole is clean and the tunnel shows on the approach.
import { MeshBasicNodeMaterial } from "builtin/three";
import { positionGeometry, positionWorld, cameraPosition, float, vec2, vec3, step, smoothstep, mix, length, atan2, distance, fwidth } from "builtin/tsl";
import { tripClock, shown } from "./lib/trip.js";
import { TAU, fam, breathScale, deal, symN } from "./eye-lib.js";

export function material(ctx) {
  const c = tripClock(ctx);
  const F = fam(c);
  const p = positionGeometry.xy;
  const r = length(p);
  const w = fwidth(r).mul(1.5).max(0.01);
  const ph = r.mul(1.4).add(c.bar.mul(0.5));
  const f = ph.fract();
  const on = smoothstep(0, w.mul(1.4), f).mul(float(1).sub(smoothstep(float(0.42).sub(w.mul(1.4)), 0.42, f)));
  const odd = ph.floor().mul(0.5).fract().mul(2);
  let col = mix(F.A, F.B, odd).mul(on).mul(smoothstep(0.5, 4.6, r).mul(0.8).add(0.2));
  // 12 orange targets turning against the iris' white row
  const an = atan2(p.y, p.x).div(TAU).sub(c.phrase.mul(0.25).mul(c.dir).mul(mix(0.7, 1.3, c.rnd(21))));
  const N = symN(c);
  // apollonian-eye (dealt): the well is a circle-inversion gasket, and every cell of it is a smaller eye
  let gq = p.div(4.6), gs = float(1), pre = gq;
  for (let i = 0; i < 3; i++) {
    gq = gq.mul(0.5).add(0.5).fract().mul(2).sub(1);
    pre = gq;
    const kk = float(1.15).div(gq.dot(gq).max(0.02));
    gq = gq.mul(kk); gs = gs.mul(kk);
  }
  const gl = smoothstep(0.03, 0.015, gq.length().sub(1).abs().div(gs));
  const pl = pre.length();
  const gcol = F.A.mul(gl).add(F.hot(0.0).mul(step(0.3, pl)).mul(step(pl, 0.42))).add(F.B.mul(step(pl, 0.16)));
  col = mix(col, gcol, deal(c, 0));
  // the target row; depth-parallax (dealt): the same row at three depths, sliding with the camera at three rates,
  // turning at three speeds, the far ones dimmer and softer
  const cam = vec2(cameraPosition.x, cameraPosition.y.sub(15));
  const par = deal(c, 3);
  const row = (base, rc, n, depth, dim, soft, on) => {
    const pp = p.add(cam.mul(depth * 0.04).mul(par));
    const rr = length(pp);
    const a2 = atan2(pp.y, pp.x).div(TAU).sub(an.sub(atan2(p.y, p.x).div(TAU)).mul(1 - depth * 0.3));
    const q = a2.mul(n).fract().sub(0.5).mul(float(TAU * rc).div(n));
    const d = q.mul(q).add(rr.sub(rc).mul(rr.sub(rc))).sqrt().div(float(0.38 * (1 - depth * 0.22)));
    let o = mix(base, F.hot(0.0).mul(dim), float(1).sub(smoothstep(0.94 - soft, 1, d)).mul(on));
    o = mix(o, vec3(0, 0, 0), float(1).sub(smoothstep(0.62 - soft, 0.68, d)).mul(on));
    return mix(o, F.A.mul(dim), float(1).sub(smoothstep(0.36 - soft, 0.42, d)).mul(on));
  };
  col = row(col, 1.25, N.mul(0.5), 2, 0.3, 0.25, par);
  col = row(col, 2.25, N, 1, 0.55, 0.12, par);
  col = row(col, 3.3, N.mul(float(1).add(step(N, 7))), 0, 1, 0, float(1));
  // black heart
  col = col.mul(smoothstep(0.7, 0.8, r));
  const m = new MeshBasicNodeMaterial();
  const s = breathScale(c.sec);
  m.positionNode = positionGeometry.mul(vec3(s, s, 1));
  m.colorNode = col;
  m.opacityNode = smoothstep(12, 26, distance(cameraPosition, positionWorld)).mul(shown(c, "eye", r.div(15)));
  m.transparent = true;
  m.depthWrite = false;
  return m;
}
