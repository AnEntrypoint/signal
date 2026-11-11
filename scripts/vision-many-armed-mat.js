// THE MANY-ARMED ONE (K = 3): a seated figure, 8 arms fanned in mirrored pairs, a symbol in every hand.
// One script, five flat canvases switched by params.layer, each on its OWN motion, all cutout (black bodies occlude):
//   "world" z -30  SCROLLS : a temple of nested lotus-arch doorways (each a bead row) receding through a log scroll,
//                            a floor, offering bowls with rising bead-smoke. Grows outward arch-shaped, petal-edged.
//   "ring"  z -12  TURNS   : lotus-petal mandorla (black petals, op-art), a counter-turning bead row, spoke fan.
//   "being" z 0    BREATHES: torso, lotus legs, head, chakras, 4 arms a side (each swaying on its own clock), hands
//                            with bead frames and a dealt symbol each (moon star spiral eye flame sun yantra bindu).
//   "veil"  z +10  SWINGS  : temple lamps on bead strands, pendulums, each with a dithered shadow.
//   "fore"  z +22  FALLS   : near lotus petals drifting down the sides, kick sparks (the 3D naga tails are their own
//                            rows: vision-many-armed-worm-geo.js / -worm-mat.js).
// SCORE (u = visionU): 0-.1 heart bindu ripple + chakras rise; .03-.16 body outline spreads from the heart; .12-.34
// arms grow pair by pair, hands close; .25-.47 world arches grow; .4-.58 ring petals + counter bead row; .5-.7 the
// eight symbols one by one, third eye, halo, necklace, bowls + smoke; .6-.82 veil lamps drop, fore petals, naga tails;
// .85-.93 CULMINATION: every arm multiplies into an after-image fan, neighbours stepping opposite ways on the kick,
// against the ring's counter-turning spokes (moire in depth); .93-1 exit last-in first-out.
// Seed channels 260-279: 260 hue family, 261/262 symbol deal, 263 petal count, 264 turn sense, 265/266/268 the worms,
// 267 fan variant, 269 arch pointedness, 270 sway phase, 271 halo beads|rays, 272 arm spread, 273-279 fore petals.
import { MeshBasicNodeMaterial, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, mix, atan2, fwidth, select } from "builtin/tsl";
import { tripClock, visionShown, visionU, climb } from "./lib/trip.js";

const TAU = 6.28318, D = Math.PI / 180;
const ARM = [[-34, 22], [-4, 26], [26, 25], [58, 20]]; // bottom-up: angle deg, length
const is = (v, i) => step(v.sub(i).abs(), 0.5);
const hash = (v) => v.mul(12.9898).add(4.1).sin().mul(43758.5453).fract();
const band = (x, f) => step(0.5, float(x).mul(f).fract());

export function material(ctx) {
  const c = tripClock(ctx), layer = ctx.params.layer || "being";
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  const p = positionGeometry.xy, u = visionU(ctx, c), sec = c.real;
  const sm = (a, b, x = u) => smoothstep(a, b, x);
  const out = (a, b) => float(1).sub(smoothstep(a, b, u));
  const aa = fwidth(p.x).mul(1.2).max(0.015);
  const fill = (d) => smoothstep(aa, aa.negate(), d);
  const ln = (d, w) => fill(float(d).abs().sub(w));
  const fam = c.pick(260, 3);
  const pk = (a, b, cc) => select(fam.lessThan(0.5), vec3(...a), select(fam.lessThan(1.5), vec3(...b), vec3(...cc)));
  const A = pk([1.0, 0.85, 0.05], [1.0, 0.38, 0.02], [1.0, 0.05, 0.6]);  // the figure's line
  const B = pk([1.0, 0.05, 0.6], [1.0, 0.85, 0.05], [0.1, 1.0, 0.15]);   // beads and symbols
  const C = pk([0.05, 0.12, 1.0], [0.45, 0.05, 1.0], [0.05, 0.12, 1.0]); // temple and ring: blue / violet
  const C2 = pk([0.45, 0.05, 1.0], [0.05, 0.12, 1.0], [0.45, 0.05, 1.0]);
  const W = vec3(1, 1, 1), K = vec3(0, 0, 0);
  const dir = step(0.5, c.rnd(264)).mul(2).sub(1);
  const hi = climb(c);
  let col = vec3(0), cover = float(0);
  const paint = (color, mask) => { const k = float(mask).clamp(0, 1); col = mix(col, color, k); cover = cover.max(k); };
  // 2x2 ordered dither (screen-sized cells): a shadow is black cover at a density, never a grey fade
  const cell = p.div(fwidth(p.x).mul(2).max(0.01)).floor(), cx = cell.x.mod(2), cy = cell.y.mod(2);
  const dith = (dens) => step(mix(cx.mul(2), float(3).sub(cx.mul(2)), cy).add(0.5).div(4), float(dens));
  const kf = c.beat.fract();
  const kwave = (dist, reach) => c.kick.mul(float(1).sub(smoothstep(0, reach * 0.12, float(dist).sub(kf.mul(reach)).abs())));
  const fanP = sm(0.85, 0.88).mul(out(0.925, 0.94));
  const fanN = mix(float(4.5), float(7.0), c.pick(267, 2)); // degrees between after-images
  const stepPh = c.beat.floor().mod(2).mul(0.5).mul(c.live);

  if (layer === "world") {
    const GY = -16, Y0 = 4, o = mix(float(8), float(22), c.rnd(269));
    const ax = p.x.abs(), up = step(Y0, p.y), yy = p.y.sub(Y0).max(0);
    const s = vec2(ax.add(o), yy).length().sub(o).mul(up).add(ax.mul(float(1).sub(up))).max(0.01);
    const t = atan2(yy, ax.add(o)).mul(s.add(o)).mul(up).add(p.y.sub(Y0).mul(float(1).sub(up))); // along the arch
    // growth: an arch-shaped doorway opening outward, its frontier a row of lotus petals
    const grow = sm(0.25, 0.47).mul(out(0.955, 0.992)).mul(215);
    const scal = t.div(7).mul(3.14159).sin().abs().mul(3.2);
    const edge = s.add(scal).sub(grow);
    // the doorway's dark never shows the canvas's rectangle: it thins through the dither toward the edges
    const rim = float(1).sub(smoothstep(0.45, 0.9, p.x.abs().div(160).max(p.y.abs().div(90))));
    paint(K, step(edge, 0).mul(dith(rim)));
    paint(mix(C, W, 0.5), ln(edge.add(0.25), 0.22).mul(step(0.5, grow)).mul(step(grow, 214)));
    const inside = step(edge, -0.6);
    const sky = step(GY, p.y);
    // nested doorways: log-spaced, scrolling through (recession), every arch a bead row + a hairline
    const ls = s.log().mul(3.4).sub(sec.mul(0.07).mul(dir));
    const fl = ls.fract().sub(0.5), kI = ls.floor();
    const bw = s.mul(0.085), tb = t.div(bw);
    const bead = fill(vec2(fl.mul(s).div(3.4), tb.fract().sub(0.5).mul(bw)).length().sub(s.mul(0.02)));
    const tint = mix(C, C2, kI.mod(2));
    const near = sm(9, 16, s);
    paint(tint.mul(float(0.55).add(kwave(s, 150).mul(0.9))), bead.mul(inside).mul(sky).mul(near));
    paint(tint.mul(0.4), ln(fl.add(0.5).fract().sub(0.5).mul(s).div(3.4), s.mul(0.004).add(0.05)).mul(inside).mul(sky).mul(near));
    // the far door: a bindu star in the innermost dark
    paint(mix(B, W, 0.6), fill(vec2(p.x, p.y.sub(Y0 + 3)).length().sub(float(0.5).add(c.kick.mul(0.25)))).mul(inside));
    // the floor: lines to the vanishing point and cross-lines sliding toward the eye
    const fy = float(GY).sub(p.y).max(0.05), below = float(1).sub(sky);
    const fa = atan2(p.x, fy);
    paint(C.mul(0.35), ln(fa.mul(14 / 3.14159).fract().sub(0.5).mul(fy.add(ax)).mul(0.224), 0.07).mul(below).mul(inside));
    const fz = float(26).div(fy).add(sec.mul(0.3)).fract().sub(0.5);
    paint(C2.mul(0.4), ln(fz.mul(fy).mul(fy).div(26), 0.06).mul(below).mul(inside));
    paint(mix(C, W, 0.3), ln(p.y.sub(GY), 0.12).mul(inside));
    // offering bowls along the ground line, lit outward one by one, bead-smoke rising from each
    const xr = ax.sub(20), ci = xr.div(26).add(0.5).floor().max(0), fx = xr.sub(ci.mul(26));
    const bp = sm(0.5, 0.7).mul(out(0.94, 0.955)), bon = step(ci.add(0.5).div(5), bp).mul(inside);
    const by = p.y.sub(GY + 3.2);
    const bowl = vec2(fx, by).length().sub(3.2).max(by);
    paint(K, fill(bowl).mul(bon));
    paint(W.mul(band(by, 1.1)), fill(bowl.add(0.3)).mul(bon));
    paint(A, ln(bowl, 0.13).mul(bon));
    const sy = p.y.sub(GY + 4), rise = sy.div(2.6).sub(sec.mul(0.45)).sub(ci.mul(0.37));
    const wob = sy.mul(0.42).add(sec.mul(0.8)).add(ci.mul(2.1)).sin().mul(sy.mul(0.09));
    const smk = fill(vec2(fx.sub(wob), rise.fract().sub(0.5).mul(2.6)).length().sub(float(0.75).sub(sy.mul(0.02)).max(0.1)));
    const sh = sm(0.56, 0.74).mul(26);
    paint(mix(B, W, sy.div(26).clamp(0, 1)).mul(0.9), smk.mul(bon).mul(step(0.4, sy)).mul(step(sy, sh)));
  } else if (layer === "ring") {
    const q = p.sub(vec2(0, 3.5)), r = q.length(), th = atan2(q.y, q.x), rot = sec.mul(TAU / 44).mul(dir);
    const N = c.pick(263, 3).mul(4).add(8);
    const pa = th.sub(rot).div(TAU).add(0.5).fract().mul(N), pid = pa.floor(), e = pa.fract().sub(0.5).mul(2);
    const petP = sm(0.4, 0.54).mul(out(0.95, 0.972));
    const pon = step(pid.add(0.5).div(N), petP.mul(1.02));
    const rOut = float(24).add(float(1).sub(e.abs()).max(0).pow(0.6).mul(11));
    const body = fill(r.sub(rOut).max(float(24).sub(r))).mul(pon);
    // a dithered shadow the petals throw back onto the temple
    paint(K, dith(0.5).mul(fill(r.sub(rOut).sub(3).max(float(22).sub(r)))).mul(pon));
    paint(K, body);
    paint(W.mul(0.85), body.mul(band(r.sub(24).div(11).add(sec.mul(0.05)), 5)).mul(pid.mod(2)).mul(step(r, rOut.sub(0.7))));
    paint(C.mul(float(0.8).add(kwave(r, 60))), ln(r.sub(rOut), 0.2).mul(pon).mul(step(24, r)));
    paint(C2, ln(e.mul(r).mul(3.14159).div(N), 0.1).mul(pon).mul(step(25, r)).mul(step(r, rOut.sub(2.5))).mul(float(1).sub(pid.mod(2))));
    const ringP = sm(0.42, 0.5).mul(out(0.955, 0.975));
    const clk = step(th.div(TAU).add(0.75).fract().sub(0.5).abs().mul(2), ringP.mul(1.01)); // closes from below both ways
    paint(C.mul(0.9), ln(r.sub(23.2), 0.12).add(ln(r.sub(19.6), 0.08)).mul(clk));
    // the counter-turning bead row
    const ba = th.add(rot.mul(2.3)).div(TAU).add(0.5).fract().mul(40), bid = ba.floor();
    const beadP = sm(0.46, 0.6).mul(out(0.95, 0.97));
    const bd = fill(vec2(ba.fract().sub(0.5).mul(TAU / 40).mul(21.4), r.sub(21.4)).length().sub(float(0.55).add(c.kick.mul(0.12))));
    paint(mix(B, W, bid.mod(2).mul(0.7)), bd.mul(step(bid.add(0.5).div(40), beadP)));
    // culmination: spokes turning against the being's stepping arm fans
    const sn = float(360).div(fanN.mul(0.92));
    const sa = th.sub(dir.mul(sec.mul(0.11).add(stepPh.mul(TAU).div(sn)))).div(TAU).mul(sn).fract().sub(0.5);
    paint(mix(C, W, hi.mul(0.5)), ln(sa.mul(TAU).div(sn).mul(r), 0.07).mul(step(6, r)).mul(step(r, mix(float(6), float(19), fanP))).mul(step(0.01, fanP)));
  } else if (layer === "being") {
    const br = sec.mul(TAU / 5.3).sin().mul(0.014).add(1);
    const q = vec2(p.x.abs(), p.y).div(br), sideL = step(p.x, 0);
    const S = vec2(3.2, 4.2), rel = q.sub(S), r = rel.length(), ang = atan2(rel.y, rel.x);
    const spread = mix(float(0.82), float(1.12), c.rnd(272)), ph = c.rnd(270).mul(TAU);
    const heart = vec2(0, 2.2), hd = q.sub(heart).length();
    let best = float(99), hq = vec2(9, 9), hid = float(0), handOn = float(0);
    const arms = [];
    for (let i = 0; i < 4; i++) {
      const sway = sec.mul(TAU / (9 + i * 3.7)).add(ph).add(i * 1.3).sin().mul(3.2);
      const a = float(ARM[i][0]).mul(spread).add(sway).mul(D), L = ARM[i][1];
      const da = ang.sub(a), along = r.mul(da.cos()), perp = r.mul(da.sin());
      const g = sm(0.12 + 0.045 * i, 0.2 + 0.045 * i).mul(out(0.96 + 0.004 * (3 - i), 0.975 + 0.004 * (3 - i)));
      const handP = sm(0.2 + 0.045 * i, 0.225 + 0.045 * i).mul(out(0.955, 0.965));
      const Hc = S.add(vec2(a.cos(), a.sin()).mul(L + 2.4)), hv = q.sub(Hc);
      arms.push({ i, da, along, perp, g, handP, L, hv, hdist: hv.length() });
      // the after-image fan, behind the arm: copies stepping on the kick, neighbours opposite ways
      const sense = i % 2 ? -1 : 1, dl = fanN.mul(D);
      const phi = sec.mul(0.22).add(stepPh).mul(sense).fract();
      const jq = da.div(dl).sub(phi), jn = jq.add(0.5).floor().clamp(-5, 5), off = jq.sub(jn).mul(dl).mul(r);
      const fade = float(1).sub(jn.add(phi).abs().div(6.2)).clamp(0, 1), lit = step(jn.abs(), fanP.mul(5.4)).mul(step(0.01, fanP));
      const trail = ln(off, 0.085).mul(step(3.5, r)).mul(step(r, L)).add(fill(vec2(off, r.sub(L + 0.4)).length().sub(0.42)));
      paint(mix(A, B, jn.abs().div(5)).mul(fade.mul(float(0.7).add(hi.mul(0.6)))), trail.mul(lit).mul(step(0.12, fade)));
    }
    for (const o of arms) {
      const hw = mix(float(1.25), float(0.7), o.along.div(o.L).clamp(0, 1)), Lg = o.g.mul(o.L);
      const within = step(0, o.along).mul(step(o.along, Lg)).mul(step(0.002, o.g));
      paint(K, fill(o.perp.abs().sub(hw)).mul(within));
      paint(A.mul(float(0.7).add(kwave(o.along, 34).mul(1.2))), ln(o.perp.abs().sub(hw), 0.1).mul(within));
      paint(mix(B, W, kwave(o.along, 34)), fill(vec2(o.along.div(2).fract().sub(0.5).mul(2), o.perp).length().sub(0.36)).mul(within).mul(step(1.5, o.along)));
      paint(W, fill(vec2(o.along.sub(Lg), o.perp).length().sub(0.5)).mul(step(0.002, o.g)).mul(step(o.g, 0.995))); // the pen's nib
      const R = o.handP.mul(3.0);
      paint(K, fill(o.hdist.sub(R)).mul(step(0.01, o.handP)));
      paint(A, ln(o.hdist.sub(R), 0.09).mul(step(0.01, o.handP)));
      const fb = atan2(o.hv.y, o.hv.x).div(TAU).add(0.5).mul(16).fract().sub(0.5);
      paint(B, fill(vec2(fb.mul(TAU / 16 * 2.45), o.hdist.sub(2.45)).length().sub(0.2)).mul(step(0.99, o.handP)));
      const nearer = o.hdist.lessThan(best);
      hq = select(nearer, o.hv, hq); hid = select(nearer, float(o.i), hid); handOn = select(nearer, o.handP, handOn); best = best.min(o.hdist);
    }
    // the symbol this roll deals to this hand, opening like an iris, one hand after another
    const sIdx = hid.add(sideL.mul(4));
    const sym = sIdx.mul(c.pick(262, 3).mul(2).add(1)).add(c.pick(261, 8)).mod(8);
    const gp = sm(0, 0.03, u.sub(0.5).sub(sIdx.mul(0.022))).mul(out(0.945, 0.96));
    const g = hq.div(1.75), gr = g.length(), gth = atan2(g.y, g.x), w = 0.085;
    const moon = fill(gr.sub(0.88).max(float(0.72).sub(g.sub(vec2(0.36, 0)).length())));
    const sec5 = atan2(g.x, g.y).div(TAU / 5).add(0.5).fract().sub(0.5).abs().mul(TAU / 5);
    const star = ln(vec2(gr.mul(sec5.cos()).sub(0.95), gr.mul(sec5.sin())).dot(vec2(0.3514, 0.9362)), w).mul(step(gr, 1)).add(fill(gr.sub(0.14)));
    const spiral = ln(gr.div(0.3).sub(gth.div(TAU)).fract().sub(0.5).mul(0.3), 0.07).mul(step(gr, 0.95));
    const ves = g.sub(vec2(0, -0.75)).length().max(g.sub(vec2(0, 0.75)).length()).sub(1.25);
    const eye = ln(ves, w).add(ln(gr.sub(0.36), 0.06)).add(fill(gr.sub(0.16)));
    const ft = g.y.add(0.25).div(1.15).clamp(0, 1);
    const fd = select(g.y.greaterThan(-0.25), g.x.abs().sub(float(1).sub(ft).pow(0.8).mul(0.55)), g.add(vec2(0, 0.25)).length().sub(0.55));
    const flame = ln(fd, w).add(fill(fd.add(0.3)));
    const ra = gth.div(TAU).mul(8).fract().sub(0.5);
    const sun = ln(gr.sub(0.42), w).add(fill(vec2(ra.mul(TAU / 8 * 0.78), gr.sub(0.78)).length().sub(0.11))).add(fill(gr.sub(0.12)));
    const tri = (y) => g.x.abs().mul(0.866).add(y.mul(0.5)).max(y.negate()).sub(0.42);
    const yantra = ln(tri(g.y), 0.07).add(ln(tri(g.y.negate()), 0.07)).add(fill(gr.sub(0.1)));
    const bindu = ln(gr.sub(0.85), 0.06).add(ln(gr.sub(0.55), 0.06)).add(fill(gr.sub(0.25)));
    const gl = moon.mul(is(sym, 0)).add(star.mul(is(sym, 1))).add(spiral.mul(is(sym, 2))).add(eye.mul(is(sym, 3)))
      .add(flame.mul(is(sym, 4))).add(sun.mul(is(sym, 5))).add(yantra.mul(is(sym, 6))).add(bindu.mul(is(sym, 7)));
    paint(mix(B, W, float(0.35).add(c.kick.mul(0.4))), gl.clamp(0, 1).mul(step(gr, gp.mul(1.2))).mul(step(best, 2.2)).mul(step(0.99, handOn)));
    // the seat, legs, torso, head: black bodies, the outline spreading from the heart
    const bodyP = sm(0.03, 0.16).mul(out(0.982, 1.0)), rv = step(hd.div(17), bodyP.mul(1.02));
    const front = float(1).add(float(1).sub(smoothstep(0, 0.05, hd.div(17).sub(bodyP).abs())).mul(step(bodyP, 0.98)).mul(2));
    const sx = q.x.div(3).fract().sub(0.5).mul(3);
    const seat = vec2(sx, q.y.add(8.2).mul(0.75)).length().sub(1.45).max(q.x.sub(10.5)).max(float(-8.4).sub(q.y).mul(0.75).sub(0.2));
    paint(K, fill(seat).mul(rv)); paint(C2.mul(front), ln(seat, 0.09).mul(rv));
    const legs = q.sub(vec2(0, 16)).length().max(q.sub(vec2(0, -27.2)).length()).sub(23.8);
    paint(K, fill(legs).mul(rv));
    paint(W.mul(0.8), fill(legs.add(0.7)).mul(band(q.x.add(q.y.add(5.6).abs().mul(1.5)), 2)).mul(rv).mul(sm(0.2, 0.3)));
    paint(A.mul(front), ln(legs, 0.12).mul(rv));
    const torso = q.x.sub(float(2.1).add(smoothstep(-1, 5, q.y).mul(1.5)).add(smoothstep(-1, -4.6, q.y).mul(1.2))).max(q.y.sub(0.5).abs().sub(5.0));
    paint(K, fill(torso).mul(rv)); paint(A.mul(front), ln(torso, 0.12).mul(rv));
    const hc = q.sub(vec2(0, 8.3)), hr = hc.length(), head = hr.sub(2.35);
    paint(K, fill(head).mul(rv)); paint(A.mul(front), ln(head, 0.12).mul(rv));
    // first stroke: the bindu at the heart and its ripple, then the seven chakras rising
    paint(W, ln(hd.sub(u.mul(160)), 0.1).mul(out(0.03, 0.09)).mul(step(0.001, u)));
    const ck = sm(0.0, 0.1).mul(out(0.985, 0.998));
    for (let k = 0; k < 7; k++) {
      const d = vec2(q.x, q.y.sub(-4.3 + k * 1.5)).length();
      paint(k % 3 === 0 ? B : k % 3 === 1 ? W : A, fill(d.sub(float(0.36).add(kwave(k * 5, 40).mul(0.18)))).mul(step((k + 0.5) / 7, ck)));
    }
    // placed details .5-.7: closed eyes, the third eye, the necklace, the halo (beads or rays by the seed)
    const det = sm(0.52, 0.7).mul(out(0.94, 0.955));
    paint(A, ln(vec2(q.x.sub(0.95), q.y.sub(8.6)).length().sub(0.55), 0.07).mul(step(q.y, 8.35)).mul(step(0.1, det)));
    const te = vec2(q.x, q.y.sub(9.45)), tv = te.sub(vec2(0, -0.45)).length().max(te.sub(vec2(0, 0.45)).length()).sub(0.72);
    paint(B.mul(float(1).add(hi)), ln(tv, 0.06).add(fill(te.length().sub(0.13))).mul(step(0.25, det)));
    const nk = q.sub(vec2(0, 5.6)), na = atan2(nk.x, nk.y.negate());
    paint(B, fill(vec2(na.mul(9 / 3.14159).fract().sub(0.5).mul(1.0), nk.length().sub(2.7)).length().sub(0.2)).mul(step(na.abs(), 1.25)).mul(step(na.abs().div(1.25), det.sub(0.3).mul(2))));
    const ha = atan2(hc.x, hc.y), hk = ha.div(3.14159), hOn = step(hk, det.sub(0.45).mul(2.2)).mul(step(hk, 0.72));
    const hb = fill(vec2(hk.mul(13).fract().sub(0.5).mul(3.14159 / 13 * 4.3), hr.sub(4.3)).length().sub(0.26));
    const hry = ln(hk.mul(17).fract().sub(0.5).mul(3.14159 / 17).mul(hr), 0.07).mul(step(3.5, hr)).mul(step(hr, float(4.6).add(hi.mul(1.5))));
    paint(mix(A, W, 0.5), mix(hb, hry, step(0.5, c.rnd(271))).mul(hOn));
  } else if (layer === "veil") {
    // temple lamps on bead strands: each a pendulum on its own period, dropping in from outside inward
    const ax = p.x.abs(), sgn = step(0, p.x).mul(2).sub(1), TOP = 46;
    const id = ax.sub(17).div(11).floor().clamp(0, 5), xc0 = id.mul(11).add(22.5);
    const hsh = hash(id.add(sgn.mul(7.3)).add(c.rnd(270).mul(31)));
    const drop = sm(0, 0.1, u.sub(0.6).sub(float(5).sub(id).mul(0.022))).mul(float(1).sub(sm(0, 0.02, u.sub(0.94).add(id.mul(0.003)))));
    const Ln = hsh.mul(24).add(12).mul(drop), bot = float(TOP).sub(Ln);
    const swing = sec.mul(TAU).div(hsh.mul(4).add(6)).add(hsh.mul(9)).sin().mul(0.09);
    const dy = float(TOP).sub(p.y), xs = ax.sub(xc0).sub(swing.mul(dy));
    const on = step(0.02, drop).mul(step(17, ax));
    const lamp = vec2(xs, p.y.sub(bot).add(2.2)), lr = lamp.length();
    paint(K, dith(0.5).mul(fill(vec2(lamp.x.add(sgn.mul(1.4)), lamp.y.add(1.6)).length().sub(4.2))).mul(on));
    paint(mix(C, W, 0.4), ln(xs, 0.07).mul(step(bot, p.y)).mul(on));
    const sb = vec2(xs, dy.div(2.4).fract().sub(0.5).mul(2.4)).length();
    paint(K, fill(sb.sub(0.62)).mul(step(bot, p.y)).mul(on));
    paint(B, ln(sb.sub(0.5), 0.1).mul(step(bot, p.y)).mul(on));
    const body = lr.sub(2.6).min(vec2(lamp.x, lamp.y.add(3.1)).length().sub(0.7));
    paint(K, fill(body).mul(on));
    paint(A.mul(float(0.8).add(c.kick.mul(0.5))), ln(body, 0.12).mul(on));
    const lt = lamp.y.add(0.5).div(2.2).clamp(0, 1);
    const lf = select(lamp.y.greaterThan(-0.5), lamp.x.abs().sub(float(1).sub(lt).pow(0.8).mul(0.95)), lamp.add(vec2(0, 0.5)).length().sub(0.95));
    const flick = sec.mul(hsh.mul(3).add(5)).sin().mul(0.15).add(1);
    paint(mix(B, W, 0.5).mul(flick), fill(lf.add(0.25)).add(ln(lf, 0.07)).clamp(0, 1).mul(on).mul(sm(0.7, 0.76)).mul(float(1).sub(fanP.mul(step(0.5, hsh)))));
  } else {
    // fore: near lotus petals falling down the frame sides (black, rimmed), each its own tumble; kick sparks
    for (let i = 0; i < 6; i++) {
      const sg = i % 2 ? -1 : 1, x0 = c.rnd(273 + i).mul(34).add(22), sp = 1.6 + i * 0.37;
      const pp = sm(0, 0.03, u.sub(0.6 + i * 0.035)).mul(out(0.93 + i * 0.003, 0.945 + i * 0.003));
      const y = c.rnd(279 - i).mul(90).sub(sec.mul(sp)).mod(100).sub(50);
      const xx = sec.mul(0.5 + i * 0.13).add(i * 2).sin().mul(3.5).add(x0).mul(sg);
      const rot = sec.mul(0.35 + i * 0.09).mul(sg).add(i);
      const v = p.sub(vec2(xx, y)), lx = v.x.mul(rot.cos()).add(v.y.mul(rot.sin())), ly = v.y.mul(rot.cos()).sub(v.x.mul(rot.sin()));
      const sz = 2.6 + (i % 3) * 0.9;
      const pet = vec2(lx, ly.sub(sz * 0.9)).length().max(vec2(lx, ly.add(sz * 0.9)).length()).sub(sz * 1.35).add(float(1).sub(pp).mul(sz));
      const litp = float(1).sub(fanP.mul(i % 3 === 0 ? 1 : 0)); // every third goes to silhouette at the culmination
      paint(K, fill(pet));
      paint((i % 2 ? B : A).mul(litp), ln(pet, 0.09).add(ln(lx, 0.05).mul(fill(pet.add(0.5)))).clamp(0, 1));
      paint(W.mul(0.8).mul(litp), fill(pet.add(0.45)).mul(band(ly.abs().add(lx.abs()), 0.9)).mul(sm(0.74, 0.76)).mul(i % 2));
      const sv = p.sub(vec2(c.rnd(266 + i).mul(40).add(20).mul(-sg), c.rnd(273 + i).mul(50).sub(25)));
      const s4 = sv.x.abs().sqrt().add(sv.y.abs().sqrt());
      paint(W, fill(s4.sub(c.kick.mul(1.1).mul(sm(0.66 + i * 0.03, 0.7 + i * 0.03)).mul(out(0.93, 0.94)))));
    }
  }
  m.colorNode = col;
  m.opacityNode = cover.mul(visionShown(ctx, c, 0));
  m.alphaTest = 0.5;
  return m;
}
