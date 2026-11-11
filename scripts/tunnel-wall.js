// The tunnel wall: an op-art flight in (angle, depth). 12 m depth cells, 8 patterns in a fixed order, scrolling
// toward the eye one cell a bar, alternate cells spinning opposite ways, a white ring fired down-tunnel on every kick.
// Before 60.35 s (deep) it is slow blue/violet rings on the sub-bass; at 60.35 it bursts into full colour.
import { float, vec2, vec3, floor, fract, abs, max, mod, step, smoothstep, select, mix, length, dot, positionWorld, cameraPosition } from "builtin/tsl";
import { MeshBasicNodeMaterial, BackSide } from "builtin/three";
import { tripClock, pal, stripes, HUE } from "./lib/trip.js";
import { tun, inside, camDepth, v3 } from "./tunnel-lib.js";

export function material(ctx) {
  const m = new MeshBasicNodeMaterial();
  const c = tripClock(ctx), T = tun();
  const flight = step(60.35, c.sec);
  const cellF = T.d.add(c.bar.mul(12)).div(12);
  const cell = floor(cellF), v = fract(cellF), type = mod(cell, 8);
  const dir = mod(cell, 2).mul(2).sub(1);
  const A = fract(T.ang.add(dir.mul(c.bar).div(4)));
  const hue = cell.mul(0.29);
  const W = vec3(1, 1, 1);
  // 0 rings, 1 long stripes, 2 twisting checker
  const p0 = stripes(v, 6, 0.04);
  const p1 = stripes(A, 16, 0.04);
  const p2 = abs(stripes(A.add(v.mul(0.25)), 12, 0.04).sub(stripes(v, 4, 0.03)));
  // 3 rows of round dots, each a little eye
  const gy3 = v.mul(8), row3 = floor(gy3), gx3 = A.mul(24).add(mod(row3, 2).mul(0.5));
  const d3 = length(vec2(fract(gx3).sub(0.5).mul(1.57), fract(gy3).sub(0.5).mul(1.5)));
  const disc3 = smoothstep(0.6, 0.56, d3).mul(smoothstep(0.22, 0.26, d3).add(smoothstep(0.14, 0.1, d3)).min(1));
  const c3 = mix(pal(row3.mul(0.125).add(hue)).mul(1.7), W.mul(1.3), smoothstep(0.14, 0.1, d3)).mul(disc3);
  // 4 hexagons with glowing edges
  const hp = vec2(A.mul(24), v.mul(6.9282)), hr = vec2(1, 1.7320508), hh = vec2(0.5, 0.8660254);
  const ha = mod(hp, hr).sub(hh), hb = mod(hp.sub(hh), hr).sub(hh);
  const hg = abs(select(dot(ha, ha).lessThan(dot(hb, hb)), ha, hb));
  const he = float(0.5).sub(max(dot(hg, vec2(0.5, 0.8660254)), hg.x));
  const c4 = pal(hue).mul(2.2).mul(smoothstep(0.075, 0.05, he))
    .add(pal(hue.add(0.4)).mul(1.6).mul(smoothstep(0.17, 0.2, he).mul(smoothstep(0.27, 0.24, he))))
    .add(W.mul(1.4).mul(smoothstep(0.4, 0.43, he)));
  // 5 concentric squares
  const q5 = abs(fract(vec2(A.mul(12), v.mul(4))).sub(0.5)).mul(2), ch5 = max(q5.x, q5.y);
  const c5 = pal(floor(ch5.mul(4)).mul(0.17).add(hue)).mul(1.7).mul(stripes(ch5, 4, 0.06));
  // 6 chevrons pointing down-tunnel
  const zz = v.mul(6).sub(abs(fract(A.mul(12)).sub(0.5)).mul(2)).add(8), zi = floor(zz);
  const c6 = mix(W, pal(zi.mul(0.2).add(hue)).mul(1.8), step(0.5, mod(zi, 2))).mul(stripes(zz, 1, 0.05));
  // 7 bead rows
  const gy7 = v.mul(12), row7 = floor(gy7), gx7 = A.mul(48).add(row7.mul(0.5));
  const f7 = vec2(fract(gx7).sub(0.5).mul(0.785), fract(gy7).sub(0.5));
  const c7 = mix(pal(row7.div(12).add(hue)).mul(1.7).mul(smoothstep(0.36, 0.32, length(f7))), W.mul(1.5), smoothstep(0.1, 0.07, length(f7.sub(vec2(-0.1, 0.1)))));
  const w = (i) => step(abs(type.sub(i)), 0.5);
  let col = W.mul(p0.mul(w(0)).add(p1.mul(w(1))).add(p2.mul(w(2))))
    .add(c3.mul(w(3))).add(c4.mul(w(4))).add(c5.mul(w(5))).add(c6.mul(w(6))).add(c7.mul(w(7)));
  // the snare's 60 ms black/white inversion, flight only
  const inv = step(0.62, c.half).mul(flight).mul(step(c.sec, 84.35));
  col = mix(col, W.sub(col.min(1)), inv);
  // the burst at 60.35
  col = col.mul(float(1).add(c.sec.sub(60.35).max(0).mul(-3).exp().mul(3)));
  // deep: slow dark rings on the sub-bass
  const ud = T.d.div(12).add(c.sec.mul(0.06));
  const deep = mix(v3(HUE.blue), v3(HUE.violet), step(0.5, fract(ud.mul(0.5))))
    .mul(stripes(ud, 2, 0.03)).mul(float(0.1).add(c.bass.mul(0.7)).add(c.barHit.mul(0.12)));
  col = mix(deep, col, flight);
  // the kick's ring, racing away from the eye
  const ring = smoothstep(1.4, 0.9, abs(T.d.sub(camDepth()).sub(fract(c.beat).mul(110)).sub(4))).mul(c.kick);
  col = col.add(mix(v3(HUE.blue).mul(0.6), W.mul(3), flight).mul(ring));
  // far wall steps back so the gates and the core read; dark by 192
  const far = mix(1, 0.3, smoothstep(50, 200, length(positionWorld.sub(cameraPosition))));
  m.colorNode = col.mul(far).mul(smoothstep(192, 186, c.sec));
  m.opacityNode = inside();
  m.alphaTest = 0.5;
  m.side = BackSide;
  m.fog = false;
  return m;
}
