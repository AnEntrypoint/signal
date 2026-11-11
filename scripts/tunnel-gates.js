// 50 gates, one every 6 m: flat segmented ring frames, neighbours snapping a quarter turn opposite ways on each
// kick (from the flight on), a bead row on the inner edge, colour stepping through pal() with depth.
import { float, vec2, vec3, floor, fract, abs, mod, step, smoothstep, select, mix, length, atan2, round, min, positionLocal, positionGeometry, instanceIndex } from "builtin/tsl";
import { MeshBasicNodeMaterial, DoubleSide } from "builtin/three";
import { tripClock, pal, stripes, HUE } from "./lib/trip.js";
import { tun, inside, v3, LY, LZ, base, hot } from "./tunnel-lib.js";

export function material(ctx) {
  const m = new MeshBasicNodeMaterial();
  const c = tripClock(ctx);
  // vertex: place copy i at depth 3 + 6 i, turn it in steps
  const i = float(instanceIndex), dir = mod(i, 2).mul(2).sub(1);
  const b = c.beat.sub(160).max(0), x = min(fract(b).mul(2.5), 1);
  const turns = floor(b).add(float(1).sub(float(1).sub(x).pow(3))).mul(0.25);
  const ang = dir.mul(turns.add(c.sec.mul(0.01))).add(i.mul(0.037)).mul(6.2831853);
  const cs = ang.cos(), sn = ang.sin(), p = positionLocal.xy.mul(float(1).add(c.kick.mul(0.025)));
  m.positionNode = vec3(p.x.mul(cs).sub(p.y.mul(sn)), p.x.mul(sn).add(p.y.mul(cs)).add(LY), float(LZ - 3).sub(i.mul(6)));
  // fragment: the frame's bands in its own (r, theta)
  const g = positionGeometry.xy, r = length(g), th = atan2(g.y, g.x).div(6.2831853).add(0.5);
  const gi = round(tun().d.sub(3).div(6)), k = mod(gi, 3);
  const n = select(k.lessThan(0.5), float(6), select(k.lessThan(1.5), float(8), float(12)));
  const seg = fract(th.mul(n)), gap = step(0.07, seg).mul(step(seg, 0.93));
  const band = (a, bb) => step(a, r).mul(step(r, bb));
  const bead = step(length(vec2(fract(th.mul(48)).sub(0.5).mul(0.524), r.sub(4.0))), 0.16);
  const aLine = band(4.22, 4.34).mul(gap), aMain = band(4.46, 5.1).mul(gap);
  // the main band wears a row of targets: hot dot, black ring, on the blue / violet body
  const dl = length(vec2(fract(th.mul(48).add(0.5)).sub(0.5).mul(0.626), r.sub(4.78)));
  const tgt = step(dl, 0.12), tring = step(dl, 0.2).sub(tgt);
  // white triangle teeth pointing inward, and a hot rim
  const tooth = step(float(5.62).sub(r).div(0.42), abs(fract(th.mul(n).mul(6)).sub(0.5)).mul(2));
  const aOp = band(5.2, 5.62).mul(tooth), aRim = band(5.68, 5.8);
  const W = vec3(1, 1, 1);
  const col = hot(gi.add(2)).mul(bead).add(W.mul(aLine)).add(mix(base(gi), hot(gi), tgt).mul(aMain))
    .add(W.mul(aOp)).add(hot(gi).mul(aRim));
  const alpha = bead.add(aLine).add(aMain.mul(float(1).sub(tring))).add(aOp).add(aRim).min(1);
  const flight = step(60.35, c.sec);
  const lum = col.x.add(col.y).add(col.z).mul(0.25).min(1);
  const deep = mix(v3(HUE.blue), v3(HUE.violet), mod(gi, 2)).mul(lum).mul(float(0.12).add(c.bass.mul(0.8)));
  m.colorNode = mix(deep, col.mul(float(1).add(c.kick.mul(0.5))), flight).mul(smoothstep(192, 186, c.sec));
  m.opacityNode = alpha.mul(inside());
  m.alphaTest = 0.5;
  m.side = DoubleSide;
  m.fog = false;
  return m;
}
