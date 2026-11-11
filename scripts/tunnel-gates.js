// 50 gates, one every 6 m: flat segmented ring frames with triangle teeth and a bead row. They rest graphite; the
// tunnel's travelling light colours them as it passes. Each bar steps the segments 7.5 degrees (ease-out snap),
// neighbours opposite ways; the bead row is a chase, one bead a beat; the kick's ripple swells each gate as it passes.
import { float, vec2, vec3, floor, fract, abs, mod, step, smoothstep, select, mix, length, round, min, max, varying, positionLocal, positionGeometry, instanceIndex } from "builtin/tsl";
import { MeshBasicNodeMaterial, DoubleSide } from "builtin/three";
import { tripClock } from "./lib/trip.js";
import { inside, LY, LZ, GRAPH, mirAng, breath, fam, light } from "./tunnel-lib.js";

export function material(ctx) {
  const m = new MeshBasicNodeMaterial();
  const c = tripClock(ctx), F = fam(c);
  const i = float(instanceIndex), di = i.mul(6).add(3);
  const Lv = light(c, di);
  const sw = float(1).add(Lv.ring.mul(0.06)).add(breath(c).mul(0.03)).sub(0.015);
  m.positionNode = vec3(positionLocal.x.mul(sw), positionLocal.y.mul(sw).add(LY), float(LZ).sub(di));
  const gi = varying(i), L = varying(Lv.L);
  const dir = mod(gi, 2).mul(2).sub(1);
  const x = min(fract(c.bar).mul(4), 1);
  const turns = floor(c.bar).add(float(1).sub(float(1).sub(x).pow(3))).div(48).mul(mod(floor(gi.div(2)), 2).add(1));
  const g = positionGeometry.xy, r = length(g), th = mirAng().add(dir.mul(turns)).add(gi.mul(0.037));
  const k = mod(gi, 3);
  const n = select(k.lessThan(0.5), float(6), select(k.lessThan(1.5), float(8), float(12)));
  const seg = fract(th.mul(n)), gap = step(0.07, seg).mul(step(seg, 0.93));
  const band = (a, bb) => step(a, r).mul(step(r, bb));
  const tb = mirAng().mul(48), bi = floor(tb);
  const bead = step(length(vec2(fract(tb).sub(0.5).mul(0.524), r.sub(4.0))), 0.16);
  const chase = step(mod(bi.sub(floor(c.beat)).add(gi.mul(5)), 12), 2.5);
  const aLine = band(4.22, 4.34).mul(gap), aMain = band(4.46, 5.1).mul(gap);
  const dl = length(vec2(fract(th.mul(48).add(0.5)).sub(0.5).mul(0.626), r.sub(4.78)));
  const tgt = step(dl, 0.12), tring = step(dl, 0.2).sub(tgt);
  const tooth = step(float(5.62).sub(r).div(0.42), abs(fract(th.mul(n).mul(6)).sub(0.5)).mul(2));
  const aOp = band(5.2, 5.62).mul(tooth), aRim = band(5.68, 5.8);
  const W = mix(F.a, vec3(1, 1, 1), step(60.35, c.sec).mul(step(c.sec, 180.35)));
  const body = W.mul(aLine).add(mix(F.base(gi), F.hot(gi), tgt).mul(aMain)).add(W.mul(aOp)).add(F.hot(gi).mul(aRim));
  const rest = GRAPH.mul(aLine.add(aMain).add(aOp).add(aRim).min(1).add(aMain.mul(tgt)));
  const beadCol = mix(GRAPH.mul(1.6), F.acc, max(chase.mul(0.9), L.mul(0.35)));
  m.colorNode = mix(mix(rest, body, L), beadCol, bead).mul(smoothstep(192, 186, c.sec));
  m.opacityNode = bead.add(aLine).add(aMain.mul(float(1).sub(tring))).add(aOp).add(aRim).min(1).mul(inside());
  m.alphaTest = 0.5;
  m.side = DoubleSide;
  m.fog = false;
  return m;
}
