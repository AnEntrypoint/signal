// The nine drips (teardrop-rain + drip-clock): mirrored pairs share a length; they lengthen bar by bar and snap
// back on the phrase; chevron stripes flow slowly down; each head is a target. The lit pair steps round as a clock
// once per phrase (or, the other deal, the light comes down with the kick's ripple and the clock hand).
import { MeshBasicNodeMaterial, DoubleSide } from "builtin/three";
import { positionGeometry, attribute, float, vec2, vec3, smoothstep, step, mix, length } from "builtin/tsl";
import { tripClock, shown, stripes } from "./lib/trip.js";
import { PI, sel, ripple, sweep, fam, relight, allLit } from "./sun-lib.js";

export function material(ctx) {
  const c = tripClock(ctx), F = fam(c), sec = c.sec;
  const g = positionGeometry;
  const i = float(attribute("drip", "uint")), k = i.sub(4).abs();
  const a = i.sub(4).mul(13 * PI / 180);
  const rx = a.sin().mul(12.2), ry = a.cos().mul(-12.2);
  const x = g.x.sub(rx), s = ry.sub(g.y);
  const base = sel(k, [1.0, 0.55, 0.8, 0.42, 0.66]).mul(mix(0.78, 1.0, sel(k, [c.rnd(66), c.rnd(67), c.rnd(68), c.rnd(69), c.rnd(60)])));
  const ib = c.bar.mod(8);
  const grow = float(0.42).add(ib.floor().add(smoothstep(0, 0.35, ib.fract())).div(8).mul(0.58));
  const Ld = base.mul(29).mul(grow).mul(ripple(c, s.add(13)).mul(0.04).add(1));
  const Rh = mix(float(0.75), float(1.05), step(k, 0.5));
  const hw = mix(float(0.42), float(0.13), smoothstep(0, Ld.mul(0.55), s)).add(Rh.mul(0.85).mul(smoothstep(Ld.mul(0.5), Ld, s).pow(2)));
  const dh = length(vec2(x, s.sub(Ld))).div(Rh);
  const stem = step(-0.6, s).mul(step(s, Ld)).mul(step(x.abs(), hw));
  const head = step(dh, 1);
  const shape = stem.max(head);
  // the clock: the lit pair steps outward (or inward) once a phrase
  const clockOn = c.pick(66, 2).lessThan(0.5).toFloat();
  const ci = c.phrase.fract().mul(5).floor();
  const idx = mix(ci, float(4).sub(ci), step(c.dir, 0));
  const clockLit = step(k.sub(idx).abs(), 0.5);
  const lit = mix(sweep(c, float(PI).sub(a.abs())).max(ripple(c, s.add(13)).mul(0.6)), clockLit.max(ripple(c, s.add(13)).mul(0.35)), clockOn).max(allLit(c));
  const chev = stripes(s.sub(x.abs().mul(0.7)).sub(sec.mul(0.3)), 0.8, 0.05);
  const body = F.at(smoothstep(0, 30, s).mul(0.7)).mul(mix(1, 0.12, chev));
  const headCol = mix(mix(F.at(0).mul(0.75).add(0.25), vec3(0), step(dh, 0.62)), F.hot(), step(dh, 0.48));
  const col = mix(body, headCol, head);
  const glow = clockLit.mul(allLit(c)).mul(0.25);
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  m.colorNode = relight(col, lit).add(glow);
  m.opacityNode = shown(c, "sky", s.add(12.2).div(42)).mul(shape);
  m.alphaTest = 0.5;
  return m;
}
