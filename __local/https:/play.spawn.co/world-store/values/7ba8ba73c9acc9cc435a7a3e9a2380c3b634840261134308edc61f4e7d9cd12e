// The far layer behind the sun-eye (depth-parallax): r 14.5..29, concentric arc bands drifting outward one band
// per bar, each with two contour hairlines and a row of target beads turning against its neighbours; two sets of
// fine contour rings from two near centres make the moire. Dimmer and slower than the disc. Black between = cut.
import { MeshBasicNodeMaterial, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, mix, length, atan2 } from "builtin/tsl";
import { tripClock, shown } from "./lib/trip.js";
import { TAU, PI, breath, ripple, barStep, order, sweep, fam, relight, allLit } from "./sun-lib.js";

export function material(ctx) {
  const c = tripClock(ctx), F = fam(c), sec = c.sec, N = order(c);
  const p = positionGeometry.xy;
  const r = length(p).div(breath(sec).mul(0.025).add(1));
  const tm = atan2(p.x.abs(), p.y);
  const inH = step(14.5, r).mul(step(r, 29));
  const off = barStep(c).mul(1.6).mul(mix(0.7, 1.3, c.rnd(62)));
  const bx = r.sub(14.5).sub(off).div(1.6), bi = bx.floor(), bf = bx.fract();
  const sgn = float(1).sub(bi.mod(2).mul(2));
  const lines = smoothstep(0.05, 0.0, bf.sub(0.12).abs()).max(smoothstep(0.05, 0.0, bf.sub(0.88).abs()));
  const rc = bi.add(0.5).mul(1.6).add(14.5).add(off);
  const cells = rc.mul(PI).div(1.5).div(N).floor().mul(N).max(N);
  const f = tm.add(sgn.mul(c.dir).mul(sec).mul(TAU / 140)).div(PI).mul(cells).fract();
  const d = length(vec2(f.sub(0.5).mul(rc.mul(PI).div(cells)), bf.sub(0.5).mul(1.6)));
  const bead = step(d, 0.3), core = step(d, 0.13), ring = bead.mul(step(0.2, d));
  // moire: 0.5 m rings about the centre against 0.53 m rings about a point 1.5 m above, sliding apart slowly
  const m1 = r.div(0.5).fract(), m2 = length(p.sub(vec2(0, 1.5))).sub(sec.mul(0.04)).div(0.53).fract();
  const moire = smoothstep(0.12, 0.0, m1.sub(0.5).abs()).mul(smoothstep(0.12, 0.0, m2.sub(0.5).abs()).add(0.0)).max(0)
    .mul(step(18, r)).mul(step(r, 26));
  const L = sweep(c, tm).max(ripple(c, r).mul(0.5)).max(allLit(c).mul(0.8));
  const bandHue = F.at(bi.mul(0.17).fract());
  let col = relight(bandHue, L).mul(lines);
  col = col.add(relight(F.hot(), L).mul(ring)).add(relight(F.at(0.5), L).mul(core));
  col = col.add(relight(F.at(0.3), L).mul(moire).mul(0.8));
  const solid = lines.max(ring).max(core).max(moire).mul(inH);
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  m.colorNode = col.mul(0.55);
  m.opacityNode = shown(c, "sky", r.sub(13).div(16)).mul(step(0.5, solid));
  m.alphaTest = 0.5; m.toneMapped = false;
  return m;
}
