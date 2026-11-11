// The hex chamber's walls: line rings on black, centred on the far wall's centre and wrapping the room.
// The structure holds dim; light travels through it: a mirrored clock-hand sweep (a turn per 48 s) and the
// kick's ripple front leaving the centre each beat. Slots crawl outward one per bar; even slots are a double
// line ring, odd slots a ring of little targets (hollow circle, black, hot pupil), neighbours counter-crawling.
import { MeshBasicNodeMaterial, DoubleSide } from "builtin/three";
import { positionWorld, positionLocal, vec2, vec3, float, length, floor, fwidth, abs, smoothstep, saturate, max, atan2, log2, pow, select, mix, sin, step } from "builtin/tsl";
import { tripClock } from "./lib/trip.js";
import { near, alive, ripple, breath, family } from "./chamber-fx.js";

export function material(ctx) {
  const c = tripClock(ctx), g = near(), F = family(c);
  const m = new MeshBasicNodeMaterial();
  const rel = positionWorld.sub(vec3(0, 15, -386));
  const d = length(rel);
  const px = fwidth(d).max(0.002);
  const e = ripple(c, d);
  const S = breath(c).mul(0.03).add(1).mul(1.6);
  const r = d.div(S).sub(e.mul(0.22)).sub(c.bar);
  const k = floor(r), f = r.sub(k), kk = k.add(4096);
  const par = kk.mod(2), idx = floor(kk.div(2));
  const LW = 0.05;
  const ln = (x) => float(1).sub(smoothstep(LW, px.mul(1.5).add(LW), abs(x))).mul(saturate(float(LW * 4).div(px)));
  const lines = max(ln(f.sub(0.3).mul(S)), ln(f.sub(0.7).mul(S)));
  const dc = k.add(0.5).add(c.bar).mul(S).max(0.4);
  const lv = log2(dc.div(1.3)).max(0), lev = floor(lv), grow = smoothstep(0.55, 0.95, lv.sub(lev));
  const N = pow(float(2), lev).mul(6);
  const dir = idx.mod(2).mul(2).sub(1);
  const ang = atan2(rel.y, rel.x).div(6.28318);
  const a01 = ang.add(select(dir.greaterThan(0), c.sec.div(48), c.sec.div(-96)));
  const rho = length(rel.xy).max(0.01), v = f.sub(0.5).mul(S);
  const cell = (n) => {
    const q = a01.mul(n).add(0.5), xm = q.fract().sub(0.5).mul(rho.mul(6.28318).div(n));
    return { dist: length(vec2(xm, v)), j: floor(q) };
  };
  const c1 = cell(N), c2 = cell(N.mul(2));
  const hollow = max(ln(c1.dist.sub(0.36)), ln(c2.dist.sub(grow.mul(0.36))).mul(grow));
  const disc = (dd, rad) => float(1).sub(smoothstep(rad, px.mul(1.5).add(rad), dd));
  const pupil = max(disc(c1.dist, float(0.11)), disc(c2.dist, grow.mul(0.11)).mul(grow));
  const chase = step(c1.j.add(floor(c.bar).mul(dir)).add(6000).mod(6), 0.5);
  // the travelling light: a mirrored clock hand, and the ripple front
  const w = atan2(rel.y, abs(rel.x)).div(6.28318).add(c.sec.div(48)).add(d.mul(0.004)).fract();
  const sweep = smoothstep(0, 0.02, w).mul(float(1).sub(smoothstep(0.06, 0.2, w)));
  const lit = max(sweep, e.mul(0.8));
  const hue = mix(F.a, F.b, sin(ang.mul(12.566).add(c.sec.mul(0.2)).add(idx)).mul(0.5).add(0.5));
  const lineC = hue.mul(lines).mul(lit.mul(2.6).add(0.1));
  const dotC = F.b.mul(hollow).mul(lit.mul(2.2).add(0.1)).add(F.hot.mul(pupil).mul(max(lit, chase).mul(2.6).add(0.12)));
  m.colorNode = mix(lineC, dotC, par).mul(g);
  m.positionNode = positionLocal.mul(alive(g));
  m.side = DoubleSide;
  return m;
}
