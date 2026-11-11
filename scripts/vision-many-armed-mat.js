// THE MANY-ARMED ONE, its light. One material for its three layers; attribute "el" says what a face is:
// 1xx body strokes, 2xx chakra beads, 3xx/4xx arm edges/beads (hand h), 5xx glyph strokes (h*8+symbol),
// 6xx a hand's bead frame, 700/701 halo, 8xx glyph dots, 900 far ring, 10xx/11xx near veil strands/bokeh.
// Entrance by the slot's own clock u (visionU): the far ring closes round from below like a mandorla, the body
// draws itself head-down, chakras light bottom-up, then the arms in mirrored pairs bottom-up a bar apart: each
// arm draws from shoulder to hand, its beads light, the hand's bead frame lights from the bottom both ways, the
// symbol draws itself. 0.7..1 the culmination rides the climbing highs (halo, outer ring row, everything brighter).
// Exit in the last 0.5 s: arms withdraw top-down into the body. At rest the lines sit low; the kick (gated to the
// measured kick runs) is a ring of light leaving the heart and passing through figure, ring and veil.
// Seeded: hue family (10), symbol deal (11-13), ring symmetry (14), sway (15-16).
import { MeshBasicNodeMaterial, DoubleSide } from "builtin/three";
import { attribute, uv, positionGeometry, float, vec2, vec3, smoothstep, step, mix, atan2, length, fwidth, select } from "builtin/tsl";
import { tripClock, visionShown, visionU, climb } from "./lib/trip.js";

const TAU = Math.PI * 2;
const ARM_ANG = [-38, -8, 22, 56]; // must match the geometry (bottom-up pairs)

export function material(ctx) {
  const c = tripClock(ctx);
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  const el = float(attribute("el", "uint"));
  const kind = el.div(100).floor(), idx = el.sub(kind.mul(100));
  const is = (k) => step(kind.sub(k).abs(), 0.5);
  const isArm = is(3).add(is(4)).add(is(5)).add(is(6)).add(is(8));
  const glyphy = is(5).add(is(8));
  const h = select(glyphy.greaterThan(0.5), idx.div(8).floor(), idx);
  const sym = idx.sub(idx.div(8).floor().mul(8));
  const pair = h.sub(h.div(4).floor().mul(4));
  const side = step(h, 3.5).mul(2).sub(1);
  const strand = idx.sub(idx.div(6).floor().mul(6));
  const sm = (a, b, x) => smoothstep(a, b, x);
  const u = visionU(ctx, c), left = ctx.param("vw1", -1).sub(c.sec);
  const along = uv().x, across = uv().y;

  // ---- the motion: each pair of arms sways about its shoulders on its own clock, mirrored
  const amp = mix(2.0, 4.5, c.rnd(15)).mul(Math.PI / 180), ph = c.rnd(16).mul(TAU);
  const per = pair.mul(4.5).add(12);
  const th = c.sec.mul(TAU).div(per).add(ph).add(pair.mul(1.3)).sin().mul(amp).mul(side).mul(isArm);
  const S = vec2(side.mul(3), 3.6);
  const rel = positionGeometry.xy.sub(S);
  const rot = vec2(rel.x.mul(th.cos()).sub(rel.y.mul(th.sin())), rel.x.mul(th.sin()).add(rel.y.mul(th.cos()))).add(S);
  const drift = c.sec.mul(TAU / 18).add(strand.mul(1.7)).sin().mul(0.5).mul(is(10).add(is(11)));
  m.positionNode = vec3(rot.x, rot.y.add(drift), positionGeometry.z);
  const p = positionGeometry.xy;

  // ---- the deal
  const fam = c.pick(10, 3);
  const pickC = (a, b, cc) => select(fam.lessThan(0.5), vec3(...a), select(fam.lessThan(1.5), vec3(...b), vec3(...cc)));
  const A = pickC([1.0, 0.72, 0.08], [1.0, 0.38, 0.02], [1.0, 0.05, 0.6]);   // gold / orange / magenta: the figure
  const B = pickC([1.0, 0.05, 0.6], [0.45, 0.05, 1.0], [1.0, 0.85, 0.05]);   // magenta / violet / yellow: beads, symbols
  const C = pickC([0.05, 0.9, 0.75], [0.1, 1.0, 0.15], [0.05, 0.12, 1.0]);   // teal / green / blue: ring and veil
  const mirror = step(c.rnd(12), 0.5);
  const base = select(mirror.greaterThan(0.5), pair, select(side.greaterThan(0), pair, pair.add(4)));
  const stp = c.pick(13, 2).mul(2).add(1), off = c.pick(11, 8);
  const want = base.mul(stp).add(off), chosen = want.sub(want.div(8).floor().mul(8));
  const symOn = step(sym.sub(chosen).abs(), 0.5);

  // ---- entrance, one by one
  const a0 = pair.mul(0.125).add(0.16);
  const bodyP = u.sub(idx.mul(0.008).add(0.03)).div(0.08);
  const armP = u.sub(a0).div(0.09), beadP = u.sub(a0).sub(0.03).div(0.08);
  const frameP = u.sub(a0).sub(0.06).div(0.06), glyphP = u.sub(a0).sub(0.085).div(0.06);
  const cul = sm(0.68, 0.8, u).mul(climb(c).mul(0.6).add(0.4));
  // exit: top pair first, 0.5 s before the cut, each withdrawing hand-to-shoulder in 0.18 s
  const gone = float(0.2).add(pair.mul(0.1)).sub(left).div(0.18).clamp(0, 1);
  const armReach = float(1).sub(gone);
  const symGone = step(0.02, gone);
  let show = float(0);
  show = show.add(is(1).mul(step(along, bodyP)));
  show = show.add(is(2).mul(step(along, sm(0.1, 0.2, u).mul(1.02))));
  show = show.add(is(3).mul(step(along, armP.min(armReach))));
  show = show.add(is(4).mul(step(along, beadP.min(armReach))));
  show = show.add(is(6).mul(step(along, frameP)).mul(float(1).sub(symGone)));
  show = show.add(is(5).mul(symOn).mul(step(along, glyphP)).mul(float(1).sub(symGone)));
  show = show.add(is(8).mul(symOn).mul(step(1, glyphP)).mul(float(1).sub(symGone)));
  show = show.add(is(7).mul(select(idx.lessThan(0.5), step(along, sm(0.7, 0.8, u).mul(1.02)), step(along, sm(0.66, 0.74, u)))));
  // far ring: closes round from below, both ways (a mandorla), its outer row lights at the culmination
  const r = length(p), aa = fwidth(r).mul(1.2).max(0.01);
  const fromBottom = atan2(p.x, p.y.negate()).abs().div(Math.PI);
  const ringOpen = step(fromBottom, sm(0.0, 0.14, u).mul(1.01));
  // near veil: strands lower themselves from the top, inner first, and rise away in the last 0.5 s
  const vP = u.sub(strand.mul(0.04).add(0.3)).div(0.12).min(left.sub(0.1).div(0.35));
  show = show.add(is(10).add(is(11)).mul(step(along, vP)));

  // ---- light: the kick leaves the heart as a ring through figure, ring and veil (only inside measured kick runs)
  const k0 = ctx.param("k0", -1), k1 = ctx.param("k1", -1);
  const live = sm(k0.sub(0.05), k0, c.sec).mul(sm(k1.add(0.05), k1, c.sec));
  const f = c.beat.fract();
  const dH = length(p.sub(vec2(0, 3))).div(24);
  const kickL = sm(0.09, 0, dH.sub(f.mul(1.25)).abs()).mul(float(1).sub(f)).mul(live).mul(c.kick.greaterThan(0.001).select(1, 0));
  // a slow glint climbing each arm, no beat in it: the arm carries light to the hand
  const glint = sm(0.12, 0, along.sub(c.sec.div(4.5).add(pair.mul(0.25)).fract()).abs()).mul(is(3).add(is(4)));
  const light = kickL.mul(2.2).add(glint.mul(0.9)).add(cul.mul(0.9));

  // ---- colour
  const core = float(1).sub(across.mul(across).mul(0.55));
  const beadR = across; // 0 centre .. 1 rim on discs
  const target = step(0.58, beadR).add(step(beadR, 0.3)); // a ring and a dot, black between
  const lineI = core.mul(light.mul(1.6).add(0.55));
  let col = vec3(0);
  let cut = float(1);
  col = col.add(A.mul(lineI).mul(is(1).add(is(3))));
  col = col.add(mix(B, vec3(1), cul.mul(0.4)).mul(light.add(0.7)).mul(is(2).add(is(4)).add(is(6))));
  cut = cut.mul(mix(float(1), target, is(2).add(is(4)).add(is(6)).add(is(7))));
  col = col.add(mix(B, vec3(1, 1, 1), 0.15).mul(core).mul(light.mul(1.4).add(0.9)).mul(is(5)));
  col = col.add(vec3(1, 1, 1).mul(light.add(1)).mul(is(8)));
  col = col.add(mix(C, vec3(1), 0.3).mul(cul.mul(2).add(0.5)).mul(is(7)));
  // far ring pattern (polar, turning on its own slow clock, this roll's sense)
  const N = c.pick(14, 3).mul(4).add(8);
  const turn = c.sec.mul(c.dir).div(72);
  const an = atan2(p.y, p.x).div(TAU);
  const band = (rc, w) => sm(w.add(aa), w, r.sub(rc).abs());
  const dots = (rc, n, rt, rad) => { const q = an.add(rt).mul(n).fract().sub(0.5).mul(float(TAU * rc).div(n)); return sm(rad + 0.05, rad, q.mul(q).add(r.sub(rc).mul(r.sub(rc))).sqrt()); };
  const scal = float(16.4).add(an.add(turn.mul(-0.6)).mul(N).mul(Math.PI).sin().abs().pow(0.6).mul(3.4));
  const outerRow = dots(20.9, N.mul(4), turn.negate(), 0.2).mul(step(fromBottom, sm(0.7, 0.85, u).mul(1.01)));
  const ringM = band(13.6, float(0.06)).add(band(21.6, float(0.06))).add(dots(15.0, N.mul(3), turn, 0.22)).add(sm(aa.add(0.08), 0.08, r.sub(scal).abs())).add(outerRow).clamp(0, 1);
  const ringL = dH.mul(24).div(24);
  const ringLight = sm(0.08, 0, ringL.sub(f.mul(1.25)).abs()).mul(float(1).sub(f)).mul(live).mul(2.4).add(cul.mul(0.8));
  col = col.add(C.mul(ringLight.add(0.32)).mul(ringM).mul(is(9)));
  cut = cut.mul(mix(float(1), ringM.mul(ringOpen), is(9)));
  // near veil: out of focus, so soft hollow bokeh, dim, the colour washed toward white
  const bokeh = sm(0.6, 0.95, beadR).mul(0.8).add(0.18);
  col = col.add(mix(C, vec3(1), 0.35).mul(bokeh).mul(light.mul(0.8).add(0.45)).mul(is(11)));
  col = col.add(C.mul(0.25).mul(is(10)));

  m.colorNode = col;
  const d = length(p).div(30);
  m.opacityNode = visionShown(ctx, c, d).mul(show.clamp(0, 1)).mul(cut.clamp(0, 1));
  m.alphaTest = 0.5;
  return m;
}
