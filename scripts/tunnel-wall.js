// The tunnel wall: an op-art flight in (angle, depth). 12 m depth cells, 8 patterns in a seeded order, crawling
// toward the eye one cell a phrase, alternate cells counter-turning (sense = the roll's c.dir), a ring fired
// down-tunnel on every kick. Dealt on top, per phrase (tunnel-lib deal): 0 hourglass-throat (the tube pinches,
// the pattern stretches to streaks at the waist), 3 orb-domes (the side walls bulge into domes of hot-centred
// orange-red orbs), 4 serpent-teeth (white triangle teeth along the floor, a mouth), 5 truchet-skin (quarter-arc
// mazes re-tiling on the bar). Before 60.35 s (deep): five log-spiral arms in one hue on the sub-bass.
import { log, float, vec2, vec3, floor, fract, abs, max, min, mod, step, smoothstep, select, mix, length, dot, sqrt, atan2, varying, positionWorld, positionLocal, cameraPosition } from "builtin/tsl";
import { MeshBasicNodeMaterial, BackSide } from "builtin/three";
import { tripClock, pal, stripes } from "./lib/trip.js";
import { camDepth, tun, inside, GRAPH, mirAng, fam, light, cut, panels, deal, pinch, LY, LZ } from "./tunnel-lib.js";

// orb-dome cells on the side band (|mirrored angle| < 0.19 turn): rows x columns of domes, h = dome height 0..1
function domes(c, ma, d) {
  const rows = c.pick(35, 3).add(2), L = float(14.3).div(rows);
  const du = ma.add(0.19).div(0.38).mul(rows), dv = float(d).div(L);
  const q = vec2(fract(du).sub(0.5), fract(dv).sub(0.5));
  const band = step(abs(ma), 0.19);
  const h = sqrt(float(1).sub(dot(q, q).mul(4)).max(0)).mul(band);
  return { h, q, band, id: floor(du).add(floor(dv).mul(7)) };
}

export function material(ctx) {
  const m = new MeshBasicNodeMaterial();
  const c = tripClock(ctx);
  // ---- vertex: the throat's pinch and the domes' bulge, both radial, both mirror-true
  const pl = positionLocal, dl = float(LZ).sub(pl.z), ry = pl.y.sub(LY);
  const maV = atan2(ry, abs(pl.x)).div(6.2831853);
  const P = pinch(c, dl), DV = domes(c, maV, dl);
  const rs = P.s.mul(float(1).sub(DV.h.mul(deal(c, 3)).mul(0.16)));
  m.positionNode = vec3(pl.x.mul(rs), ry.mul(rs).add(LY), pl.z);
  const gW = varying(P.g);

  const T = tun(), ma = mirAng();
  const flight = step(60.35, c.sec);
  const F = fam(c), BLUE = F.a, VIOLET = F.b, base = F.base, hot = F.hot;
  const cellF = T.d.add(c.phrase.mul(12)).div(12);
  const cell = floor(cellF), v0 = fract(cellF);
  const v = v0.mul(float(1).sub(gW.mul(0.85)));   // the throat stretches the pattern into streaks
  const order = c.pick(34, 4).mul(2).add(1), type = mod(cell.mul(order).add(c.pick(33, 8)), 8);
  const dir = mod(cell, 2).mul(2).sub(1).mul(c.dir);
  const A = fract(ma.add(dir.mul(c.phrase).mul(mod(floor(cell.div(2)), 2).mul(0.125).add(0.125))));
  const W = vec3(1, 1, 1);
  const p0 = stripes(v, 6, 0.04);
  const p1 = stripes(A.mul(8).add(v.mul(3)), 1, 0.06);
  const k1 = abs(fract(A.mul(8).add(v.mul(3))).sub(0.5)).mul(2), k2 = abs(fract(A.mul(8).sub(v.mul(3))).sub(0.5)).mul(2), km = max(k1, k2);
  const c2 = mix(BLUE, VIOLET, step(k1, k2)).mul(smoothstep(0.88, 0.84, km)).mul(smoothstep(0.3, 0.34, km)).add(hot(cell).mul(smoothstep(0.16, 0.12, km)));
  const gy3 = v.mul(8), row3 = floor(gy3), gx3 = A.mul(24).add(mod(row3, 2).mul(0.5));
  const d3 = length(vec2(fract(gx3).sub(0.5).mul(1.57), fract(gy3).sub(0.5).mul(1.5)));
  const c3 = hot(row3.add(cell)).mul(smoothstep(0.6, 0.56, d3).mul(smoothstep(0.3, 0.34, d3)))
    .add(BLUE.mul(smoothstep(0.2, 0.16, d3).mul(smoothstep(0.06, 0.09, d3)))).add(VIOLET.mul(step(0.46, abs(fract(gy3).sub(0.5)))));
  const hp = vec2(A.mul(24), v.mul(6.9282)), hr = vec2(1, 1.7320508), hh = vec2(0.5, 0.8660254);
  const ha = mod(hp, hr).sub(hh), hb = mod(hp.sub(hh), hr).sub(hh);
  const hsel = select(dot(ha, ha).lessThan(dot(hb, hb)), ha, hb), hg = abs(hsel), hl = length(hsel);
  const he = float(0.5).sub(max(dot(hg, vec2(0.5, 0.8660254)), hg.x));
  const c4 = BLUE.mul(1.2).mul(smoothstep(0.075, 0.05, he))
    .add(VIOLET.mul(smoothstep(0.15, 0.17, he).mul(smoothstep(0.24, 0.22, he))))
    .add(hot(cell.add(floor(hp.y))).mul(smoothstep(0.2, 0.18, hl).mul(smoothstep(0.1, 0.12, hl))));
  const q5 = abs(fract(vec2(A.mul(12), v.mul(4))).sub(0.5)).mul(2), ch5 = max(q5.x, q5.y), i5 = floor(ch5.mul(5));
  const c5 = mix(base(i5), hot(cell.add(1)), step(i5, 0.5)).mul(stripes(ch5.add(0.1), 5, 0.06));
  const zz = v.mul(8).sub(abs(fract(A.mul(12)).sub(0.5)).mul(2.5)).add(9), zi = floor(zz), z3 = mod(zi, 3);
  const c6 = mix(mix(BLUE, VIOLET, step(0.5, z3)), W, step(1.5, z3)).mul(stripes(zz, 1, 0.05));
  const gy7 = v.mul(12), row7 = floor(gy7), gx7 = A.mul(48).add(row7.mul(0.5));
  const f7 = vec2(fract(gx7).sub(0.5).mul(0.785), fract(gy7).sub(0.5)), l7 = length(f7);
  const c7 = mix(BLUE, hot(row7.mul(0.5).add(cell)), mod(row7, 2)).mul(smoothstep(0.36, 0.32, l7)).mul(smoothstep(0.13, 0.17, l7));
  const w = (i) => step(abs(type.sub(i)), 0.5);
  // stripes carry colour along them: the two line patterns run the family's hue along the angle
  const along = mix(BLUE, VIOLET, abs(fract(A.mul(2)).sub(0.5)).mul(2)).add(W.mul(0.35));
  let col = along.mul(p0.mul(w(0)).add(p1.mul(w(1)))).add(c2.mul(w(2)))
    .add(c3.mul(w(3))).add(c4.mul(w(4))).add(c5.mul(w(5))).add(c6.mul(w(6))).add(c7.mul(w(7)));
  // truchet-skin: quarter arcs in every other cell, each tile flipping by hash on the bar
  const tk = c.pick(34, 2).mul(12).add(24);
  const tp = vec2(ma.add(0.25).mul(tk), v0.mul(tk).mul(0.318));
  const tc = floor(tp), tf = fract(tp);
  const flip = fract(dot(tc.add(cell.mul(7.1)), vec2(12.9898, 78.233)).add(floor(c.bar).mul(0.618)).sin().mul(43758.5453)).step(0.5);
  const tq = vec2(mix(tf.x, float(1).sub(tf.x), flip), tf.y);
  const a1 = abs(length(tq).sub(0.5)), a2 = abs(length(tq.sub(1)).sub(0.5));
  const tline = smoothstep(0.09, 0.05, min(a1, a2));
  const tcol = pal(F.H.add(tp.x.div(tk).mul(0.5)).add(tp.y.mul(0.02)).sub(c.sec.mul(c.dir).div(48))).mul(tline);
  const useT = deal(c, 5).mul(step(mod(cell, 2), 0.5)).mul(flight);
  col = mix(col, tcol, useT);
  // deep: rings only, crawling
  const sLog = log(T.d.sub(camDepth()).add(1).max(0.5)).div(1.3862944);
  const arms = stripes(ma.add(sLog.div(5)).sub(c.sec.mul(c.dir).div(240)), 5, 0.05);
  const dro = stripes(sLog.sub(c.sec.div(48)), 3, 0.05);
  col = mix(BLUE.mul(abs(arms.sub(dro))), col, flight);
  // graphite at rest; the travelling light brings the colour through
  const Lt = light(c, T.d);
  col = mix(GRAPH.mul(max(col.x, max(col.y, col.z)).min(1)), col, Lt.L);
  // orb-domes: hex-packed orbs, biggest on the crest, each with a hot centre; a dark seam between domes
  const D = domes(c, ma, T.d), onD = deal(c, 3).mul(D.band);
  const op = vec2(D.q.x.mul(7), D.q.y.mul(7)), or0 = vec2(1, 1.7320508), oh = vec2(0.5, 0.8660254);
  const oa = mod(op, or0).sub(oh), ob = mod(op.sub(oh), or0).sub(oh);
  const ol = length(select(dot(oa, oa).lessThan(dot(ob, ob)), oa, ob));
  const orr = D.h.mul(0.32).add(0.12), ro = ol.div(orr);
  const warm = c.hue.mul(0.07);
  const orb = mix(pal(warm.negate().sub(0.01)).mul(0.55), mix(pal(warm.negate().sub(0.1)), W, smoothstep(0.35, 0.0, ro)), smoothstep(1, 0.15, ro))
    .mul(smoothstep(1.0, 0.86, ro)).mul(smoothstep(0.02, 0.12, D.h));
  const dlit = max(Lt.L, D.h.mul(0.45).add(0.15)).add(Lt.ring.mul(0.6));
  col = mix(col, orb.mul(dlit), onD);
  // serpent-teeth: two mirrored rows of white triangles along the floor, apex to the centre line, a jaw
  const tw = ma.add(0.25), tl = c.pick(38, 3).mul(0.5).add(0.8);
  const tt = float(0.046).sub(tw).div(0.034), te = abs(fract(T.d.div(tl)).sub(0.5)).mul(2);
  const tooth = step(te, float(1).sub(tt)).mul(step(0, tt)).mul(step(tt, 1)).mul(step(tw, 0.046));
  const onTeeth = deal(c, 4).mul(step(tw, 0.052)).mul(flight.max(step(55, c.sec)));
  col = mix(col, mix(BLUE.mul(0.08), W.mul(max(Lt.L, 0.55)), tooth), onTeeth);
  const far = mix(1, 0.3, smoothstep(50, 200, length(positionWorld.sub(cameraPosition))));
  m.colorNode = col.mul(far).mul(smoothstep(192, 186, c.sec));
  m.opacityNode = inside().mul(cut(c)).mul(max(panels(c), max(onD, onTeeth)));
  m.alphaTest = 0.5;
  m.side = BackSide;
  m.fog = false;
  return m;
}
