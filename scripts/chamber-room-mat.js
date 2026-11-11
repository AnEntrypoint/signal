// The hex chamber's walls: neon line rings on black, centred on the far wall's centre and wrapping the room.
// Slots of one spacing flow outward one slot per beat; even slots are a double line ring, odd slots a ring of
// small hollow circles, neighbouring dotted rings counter-rotating; the spacing breathes on the kick.
import { MeshBasicNodeMaterial, DoubleSide } from "builtin/three";
import { positionWorld, positionLocal, vec2, vec3, float, length, floor, fwidth, abs, smoothstep, saturate, max, atan2, log2, pow, select, mix } from "builtin/tsl";
import { tripClock, HUE } from "./lib/trip.js";
import { near, alive } from "./chamber-fx.js";

export function material(ctx) {
  const c = tripClock(ctx), g = near();
  const m = new MeshBasicNodeMaterial();
  const rel = positionWorld.sub(vec3(0, 15, -386));
  const d = length(rel);
  const px = fwidth(d).max(0.002);
  const S = c.kick.mul(0.07).add(1).mul(1.6);
  const r = d.div(S).sub(c.beat);
  const k = floor(r), f = r.sub(k), kk = k.add(4096);
  const par = kk.mod(2), idx = floor(kk.div(2));
  const LW = 0.05;
  const ln = (x) => float(1).sub(smoothstep(LW, px.mul(1.5).add(LW), abs(x))).mul(saturate(float(LW * 4).div(px)));
  const lines = max(ln(f.sub(0.3).mul(S)), ln(f.sub(0.7).mul(S)));
  // dotted ring: 6 * 2^level hollow circles, doubling as the ring grows so the gaps stay 1.4 .. 2.7 m
  const dc = k.add(0.5).add(c.beat).mul(S).max(0.4);
  const lv = log2(dc.div(1.3)).max(0), lev = floor(lv), grow = smoothstep(0.55, 0.95, lv.sub(lev));
  const N = pow(float(2), lev).mul(6);
  const dir = idx.mod(2).mul(2).sub(1);
  const a01 = atan2(rel.y, rel.x).div(6.28318).add(dir.mul(c.phrase).mul(0.25));
  const rho = length(rel.xy).max(0.01), v = f.sub(0.5).mul(S);
  const ring = (n, rad) => {
    const xm = a01.mul(n).add(0.5).fract().sub(0.5).mul(rho.mul(6.28318).div(n));
    return ln(length(vec2(xm, v)).sub(rad));
  };
  const dots = max(ring(N, float(0.36)), ring(N.mul(2), grow.mul(0.36)).mul(grow));
  const teal = vec3(0.02, 0.9, 0.55);
  const lineCol = select(idx.mod(2).lessThan(0.5), vec3(...HUE.green), teal);
  const am = idx.mod(5);
  const dotCol = select(am.lessThan(0.5), vec3(...HUE.magenta), select(am.greaterThan(2.5).and(am.lessThan(3.5)), vec3(...HUE.yellow), teal));
  const col = mix(lineCol.mul(lines), dotCol.mul(dots), par).mul(c.kick.mul(1.3).add(1.7)).mul(g);
  m.colorNode = col;
  m.positionNode = positionLocal.mul(alive(g));
  m.side = DoubleSide;
  return m;
}
