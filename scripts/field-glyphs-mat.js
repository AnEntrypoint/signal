// The cartouches: black pills and squares rimmed in a neon stroke whose colour drifts along it, each holding one
// glyph (almond eye with a ringed pupil, stepped cross, double chevron). Graphite at rest; the field's light hand,
// its outward front and the kick ripple light them. Mirrored pairs orbit the axis in opposite senses, 48-96 s a turn.
import { positionLocal, attribute, uv, float, vec2, vec3, length, fwidth, smoothstep, select, mix, varying, max, min, atan2 } from "builtin/tsl";
import { MeshBasicNodeMaterial } from "builtin/three";
import { tripClock, shown } from "./lib/trip.js";
import { endFade, colours, mirrorTurn, kickAt, lit, shade, roll, choose } from "./field-lib.js";

const TAU = 6.2831853, CP = Math.cos(0.96), SP = Math.sin(0.96);

export function material(ctx) {
  const c = tripClock(ctx);
  const card = attribute("card", "vec4"), info = attribute("info", "vec4");
  const side = info.z, idx = info.w;
  // THE ROLL'S STRUCTURE: how many pairs, how wide, how high, how fast, which shapes and glyphs
  const pairs = choose(c, 21, [20, 30, 40]);
  const spread = choose(c, 20, [0.72, 1.0, 1.18]), lift = choose(c, 24, [0.7, 1.0, 1.2]);
  const rate = choose(c, 23, [1 / 96, 1 / 72, 1 / 48]);
  const pillK = info.x.add(c.pick(22, 2)).add(idx.mul(c.pick(25, 2))).mod(2);
  const deck = c.pick(27, 3);
  const g = select(deck.lessThan(0.5), info.y.add(c.pick(26, 3)).mod(3),
    select(deck.lessThan(1.5), idx.div(40).mul(spread).mul(3).floor().add(c.pick(26, 3)).mod(3), // ringed by distance
      select(pillK.greaterThan(0.5), float(0), idx.mod(2).add(1))));                            // pills hold eyes
  const isPill = pillK.greaterThan(0.5);
  const hw = select(isPill, float(1.9), float(1)), hh = select(isPill, float(0.78), float(1));
  const ang = card.y.add(side.mul(c.dir).mul(c.sec).mul(rate.mul(TAU)));
  const rad = card.x.mul(spread);
  const bobT = choose(c, 28, [9, 16.8, 21]); // the cartouches' own clock, apart from the field's 12 s breath
  const y = card.z.mul(lift).min(13).add(c.sec.mul(TAU).div(bobT).add(idx.mul(0.7)).sin().mul(0.6));
  const sz = card.w.mul(kickAt(c, rad).mul(0.08).add(1));
  const lx = positionLocal.x.mul(hw).mul(sz).mul(side), ly = positionLocal.y.mul(hh).mul(sz);
  const m = new MeshBasicNodeMaterial();
  m.positionNode = vec3(lx, ly.mul(CP), ly.mul(-SP)).add(vec3(ang.cos().mul(rad), y, ang.sin().mul(rad)));

  // ---- the face ----
  const vHw = varying(hw), vHh = varying(hh), vG = varying(g), vPill = varying(pillK), vI = varying(idx);
  const vL = varying(lit(c, rad, mirrorTurn(ang.cos(), ang.sin()), idx));
  const vOn = varying(idx.lessThan(pairs).select(1, 0).mul(shown(c, "field", rad.div(90))).mul(endFade(c.sec).greaterThan(0.05).select(1, 0)));
  const p = uv().mul(2).sub(1).mul(vec2(vHw, vHh));
  const aa = length(fwidth(p)).mul(0.8).clamp(0.002, 0.2);
  const fill = (d) => smoothstep(aa, aa.negate(), d);
  const line = (d, w) => smoothstep(aa.add(w), float(w).mul(0.5), d.abs());
  // the cartouche: a rounded box, round-ended when a pill
  const cr = select(vPill.greaterThan(0.5), vHh.sub(0.06), float(0.24));
  const qa = p.abs().sub(vec2(vHw, vHh).sub(0.06)).add(cr);
  const dF = length(max(qa, vec2(0, 0))).add(min(max(qa.x, qa.y), 0)).sub(cr);
  const K = colours(c.sec, vI);
  const along = atan2(p.y, p.x).div(TAU).add(c.sec.div(24)).add(vI.mul(0.13));
  const stroke = mix(K.A, K.H, along.mul(TAU * 2).sin().mul(0.5).add(0.5)).mul(1.3);
  // glyphs, in units of the inner height
  const gp = p.div(select(vPill.greaterThan(0.5), vHh.mul(0.78), float(0.62)));
  const ax = gp.x.abs(), ay = gp.y.abs();
  const box = (w, h) => max(ax.sub(w), ay.sub(h));
  const eyeD = max(length(gp.sub(vec2(0, -0.66))).sub(1.08), length(gp.add(vec2(0, -0.66))).sub(1.08));
  const pr = length(gp);
  const crossD = min(box(0.2, 0.72), min(box(0.46, 0.46), box(0.72, 0.2)));
  const chev = (k) => max(gp.y.add(ax.mul(0.85)).sub(k).abs().sub(0.13), ax.sub(0.7));
  const chevD = min(chev(0.45), chev(-0.12));
  const gs = (d) => line(d.mul(0.62), 0.05);
  const eyeC = K.H.mul(gs(eyeD)).add(K.H2.mul(line(pr.sub(0.3).mul(0.62), 0.07)).mul(fill(pr.sub(0.38))))   // iris ring, dark pupil
    .add(K.A.mul(line(pr.sub(0.12).mul(0.62), 0.03)));
  const crossC = mix(K.H.mul(gs(crossD)), K.H2.mul(line(crossD.add(0.22).mul(0.62), 0.03)), fill(crossD.add(0.12).mul(0.62)))
    .add(K.H.mul(line(pr.sub(0.12).mul(0.62), 0.04)));
  const chevC = K.H.mul(fill(chevD.mul(0.62))).mul(gp.y.mul(2).add(c.sec.div(3)).fract().mul(0.5).add(0.6));
  const glyph = select(vG.lessThan(0.5), eyeC, select(vG.lessThan(1.5), crossC, chevC));
  // pills carry a ringed bead at each end
  const be = length(vec2(p.x.abs().sub(vHw.sub(vHh)), p.y));
  const beads = vPill.greaterThan(0.5).select(1, 0).mul(line(be.sub(0.32), 0.07)).mul(fill(be.sub(0.45)));
  const col = stroke.mul(line(dF.add(0.11), 0.08)).add(K.B.mul(line(dF.add(0.26), 0.025)).mul(0.6))
    .add(glyph.mul(fill(dF.add(0.3)))).add(K.H2.mul(beads));
  m.colorNode = roll(c, shade(col, vL).mul(vL.mul(0.4).add(1))).mul(endFade(c.sec));
  m.opacityNode = fill(dF).mul(vOn);
  m.alphaTest = 0.5;
  m.fog = false;
  return m;
}
