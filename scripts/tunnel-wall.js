// The tunnel wall: an op-art flight in (angle, depth). 12 m depth cells, 8 patterns in a fixed order, scrolling
// toward the eye one cell a bar, alternate cells spinning opposite ways, a white ring fired down-tunnel on every kick.
// Before 60.35 s (deep) it is slow blue/violet rings on the sub-bass; at 60.35 it bursts into full colour.
import { float, vec2, vec3, floor, fract, abs, max, mod, step, smoothstep, select, mix, length, dot, positionWorld, cameraPosition } from "builtin/tsl";
import { MeshBasicNodeMaterial, BackSide } from "builtin/three";
import { tripClock, pal, stripes, HUE } from "./lib/trip.js";
import { tun, inside, GRAPH, mirAng, fam, light } from "./tunnel-lib.js";

export function material(ctx) {
  const m = new MeshBasicNodeMaterial();
  const c = tripClock(ctx), T = tun();
  const flight = step(60.35, c.sec);
  const F = fam(c), BLUE = F.a, VIOLET = F.b, base = F.base, hot = F.hot;
  // the pattern crawls toward the eye one cell a phrase; the flight itself is the one fast thing
  const cellF = T.d.add(c.phrase.mul(12)).div(12);
  const cell = floor(cellF), v = fract(cellF), type = mod(cell, 8);
  const dir = mod(cell, 2).mul(2).sub(1);
  const A = fract(mirAng().add(dir.mul(c.phrase).mul(mod(floor(cell.div(2)), 2).mul(0.125).add(0.125))));
  const W = vec3(1, 1, 1);
  // 0 rings, 1 long stripes, 2 twisting checker
  const p0 = stripes(v, 6, 0.04);
  const p1 = stripes(A, 16, 0.04);
  const p2 = abs(stripes(A.add(v.mul(0.25)), 12, 0.04).sub(stripes(v, 4, 0.03)));
  // 3 rows of targets: hot outer, black ring, blue pupil, thin violet lines between the rows
  const gy3 = v.mul(8), row3 = floor(gy3), gx3 = A.mul(24).add(mod(row3, 2).mul(0.5));
  const d3 = length(vec2(fract(gx3).sub(0.5).mul(1.57), fract(gy3).sub(0.5).mul(1.5)));
  const c3 = hot(row3.add(cell)).mul(smoothstep(0.6, 0.56, d3).mul(smoothstep(0.3, 0.34, d3)))
    .add(BLUE.mul(smoothstep(0.2, 0.16, d3))).add(VIOLET.mul(step(abs(fract(gy3).sub(0.5)), 0.5).mul(step(0.46, abs(fract(gy3).sub(0.5))))));
  // 4 hexagons: blue glowing edges, a violet inner hex, a hot target at each centre
  const hp = vec2(A.mul(24), v.mul(6.9282)), hr = vec2(1, 1.7320508), hh = vec2(0.5, 0.8660254);
  const ha = mod(hp, hr).sub(hh), hb = mod(hp.sub(hh), hr).sub(hh);
  const hsel = select(dot(ha, ha).lessThan(dot(hb, hb)), ha, hb), hg = abs(hsel), hl = length(hsel);
  const he = float(0.5).sub(max(dot(hg, vec2(0.5, 0.8660254)), hg.x));
  const c4 = BLUE.mul(1.2).mul(smoothstep(0.075, 0.05, he))
    .add(VIOLET.mul(smoothstep(0.15, 0.17, he).mul(smoothstep(0.24, 0.22, he))))
    .add(hot(cell.add(floor(hp.y))).mul(smoothstep(0.2, 0.18, hl).mul(smoothstep(0.1, 0.12, hl))))
    .add(W.mul(smoothstep(0.06, 0.04, hl)));
  // 5 concentric squares: blue / violet bands, black between, a hot heart
  const q5 = abs(fract(vec2(A.mul(12), v.mul(4))).sub(0.5)).mul(2), ch5 = max(q5.x, q5.y), i5 = floor(ch5.mul(5));
  const c5 = mix(base(i5), hot(cell.add(1)), step(i5, 0.5)).mul(stripes(ch5.add(0.1), 5, 0.06));
  // 6 chevrons pointing down-tunnel: blue, violet, white in turn
  const zz = v.mul(8).sub(abs(fract(A.mul(12)).sub(0.5)).mul(2.5)).add(9), zi = floor(zz), z3 = mod(zi, 3);
  const c6 = mix(mix(BLUE, VIOLET, step(0.5, z3)), W, step(1.5, z3)).mul(stripes(zz, 1, 0.05));
  // 7 bead rows: hot rows between blue rows, each bead with its highlight
  const gy7 = v.mul(12), row7 = floor(gy7), gx7 = A.mul(48).add(row7.mul(0.5));
  const f7 = vec2(fract(gx7).sub(0.5).mul(0.785), fract(gy7).sub(0.5)), l7 = length(f7);
  const c7 = mix(mix(BLUE, hot(row7.mul(0.5).add(cell)), mod(row7, 2)).mul(smoothstep(0.36, 0.32, l7)).mul(smoothstep(0.1, 0.14, l7)), W, smoothstep(0.07, 0.05, l7));
  const w = (i) => step(abs(type.sub(i)), 0.5);
  let col = W.mul(p0.mul(w(0)).add(p1.mul(w(1))).add(p2.mul(w(2))))
    .add(c3.mul(w(3))).add(c4.mul(w(4))).add(c5.mul(w(5))).add(c6.mul(w(6))).add(c7.mul(w(7)));
  // deep: rings only, crawling
  const ud = T.d.div(12).add(c.sec.mul(0.06));
  col = mix(BLUE.mul(stripes(ud, 2, 0.03)), col, flight);
  // graphite at rest; the travelling light brings the colour through
  const Lt = light(c, T.d);
  col = mix(GRAPH.mul(max(col.x, max(col.y, col.z)).min(1)), col, Lt.L);
  // far wall steps back so the gates and the core read; dark by 192
  const far = mix(1, 0.3, smoothstep(50, 200, length(positionWorld.sub(cameraPosition))));
  m.colorNode = col.mul(far).mul(smoothstep(192, 186, c.sec));
  m.opacityNode = inside();
  m.alphaTest = 0.5;
  m.side = BackSide;
  m.fog = false;
  return m;
}
