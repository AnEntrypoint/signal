// THE THUNDERBIRD (vision being): THE WINGED EYE in its storm. One almond eye whose iris is concentric bead rows,
// two feather-fan wings of 9 line-art feathers mirrored at x = 0, a tail fan below, a dot at every tip.
// Five canvases at five depths, one script (params.layer); every layer draws in "being metres" q = P * 74 / depth.
//   world (z -30, SCROLLS): the storm. Black sky billows out from the eye as a scalloped cloud front; stacked chevron
//          mountains draw outward below; rows of spiral cloud-scrolls drift apart; rain falls as bead strands;
//          on each gated kick a zigzag bolt forks from a wing tip and lights the scrolls near it.
//   ring  (z -12, TURNS): a thunder crown of 24 rays (long/short) and a counter-turning bead ring; additive.
//   being (z 0, BREATHES): lid line drawn from the centre -> lids part -> iris rows open -> wings unfold feather
//          by feather -> tail -> corner beads, brow beads, tip dots. Solid black body under the line-art (cutout).
//          Culmination (illusion): the iris rows counter-rotate while light runs through them (outward swell or
//          inward spiral, by seed) and fine rings stream out of the fixed pupil: it seems to dilate, never grows.
//   veil  (z +10, DRIFTS): 3 mirrored pairs of big neon feathers (root A -> tip B) sinking in on their own sway,
//          black-bodied, trailing a dithered shadow; they hide the outer wing.
//   fore  (z +22, GUSTS): black storm-cloud scrolls rolling along the top, rim-lit only while lightning fires,
//          and a few near sparks (bolt glyphs or rain beads) blown sideways in gusts.
// The 3D horned serpents (vision-thunderbird-worm-*) wind through all of it in depth (UNDULATE).
// Exit, last-in first-out: fore, veil, serpents, details, ring, rain/scrolls, mountains, world, wings, iris, lids, line.
// Seed channels 300-319: 300 hue family, 301 tail 3/5, 302 wing shape, 303 fan spread, 304 pupil, 305/306 crown
// speed/sense, 307 iris beads, 308 iris sense, 309 cloud rows 1/2, 310 bolt forks, 311 mountain width,
// 312/313 serpents 3/4, 314 serpent skin, 315 illusion variant, 316 veil sway, 317 fore sparks, 318 drift sense, 319 hot.
import { MeshBasicNodeMaterial, AdditiveBlending, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, mix, atan2, fwidth } from "builtin/tsl";
import { tripClock, visionShown, visionU, climb, maskLid, maskIris, maskClock, maskBeads, maskDraw, nib } from "./lib/trip.js";

const TAU = 6.28318, PI = 3.14159;
const DEPTH = { world: 104, ring: 86, being: 74, veil: 64, fore: 52 };
const EY = -2, EW = 7, EH = 3.4, RI = 3.0;       // eye centre y, almond half width / height, iris radius
const RX = 6.6, A0 = 0.16, NF = 9, R0 = 1.1;     // wing root x, first fan angle (from +y), feathers, feather start radius
const is = (v, i) => step(v.sub(i).abs(), 0.5);
const inv = (x) => float(1).sub(x);
const hash = (x) => float(x).mul(12.9898).add(4.1).sin().mul(43758.5453).fract();

export function material(ctx) {
  const layer = ctx.params.layer ?? "being";
  const c = tripClock(ctx);
  const u = visionU(ctx, c);
  const io = (a, b, x, y) => smoothstep(a, b, u).mul(inv(smoothstep(x, y, u)));
  const rn = (n) => c.rnd(300 + n), pk = (n, k) => c.pick(300 + n, k);
  const sense = (n) => step(0.5, rn(n)).mul(2).sub(1);
  const live = visionShown(ctx, c, 0);
  const kickOn = step(0.001, c.kick);
  const cul = io(0.84, 0.89, 0.925, 0.95).mul(climb(c).mul(0.4).add(0.6));
  const fam = pk(0, 3), hot = pk(19, 3);
  const blue = vec3(0.05, 0.12, 1.0), violet = vec3(0.45, 0.05, 1.0), pink = vec3(1.0, 0.05, 0.6), orange = vec3(1.0, 0.38, 0.02),
    yellow = vec3(1.0, 0.85, 0.05), green = vec3(0.1, 1.0, 0.15), W = vec3(1, 1, 1);
  const A = pink.mul(is(fam, 0)).add(green.mul(is(fam, 1))).add(orange.mul(is(fam, 2)));     // feather root
  const B = orange.mul(is(fam, 0)).add(yellow.mul(is(fam, 1))).add(yellow.mul(is(fam, 2)));  // feather tip
  const C = blue.mul(is(fam, 0)).add(violet.mul(is(fam, 1))).add(blue.mul(is(fam, 2)));      // iris, crown, storm
  const D = violet.mul(is(fam, 0)).add(pink.mul(is(fam, 1))).add(pink.mul(is(fam, 2)));      // second iris row
  const H = yellow.mul(is(hot, 0)).add(W.mul(is(hot, 1))).add(green.mul(is(hot, 2)));        // lightning
  const P = positionGeometry.xy;
  const q = P.mul(74 / DEPTH[layer]);
  const aa = fwidth(q.x).mul(1.2).max(0.01);
  const stroke = (d, w) => inv(smoothstep(float(w), aa.add(w), d));
  const dot = (d, r) => inv(smoothstep(float(r).sub(aa), r, d));
  const e = vec2(q.x, q.y.sub(EY)), rr = e.length(), ax = q.x.abs();
  const front = c.beat.fract().mul(30);
  const kl = smoothstep(2.4, 0, rr.sub(front).abs()).mul(kickOn).mul(smoothstep(30, 14, front));
  const dq = P.div(fwidth(P.x).max(0.0001)).floor();
  const dith = dq.x.add(dq.y).mod(2);                                    // 2x2 ordered dither (checker) for shadows
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  m.fog = false;

  // ------------------------------------------------------------------ WORLD: the storm (scrolls)
  if (layer === "world") {
    // coverage: a black storm billowing out of the eye, its front a row of cloud scallops, outlined while it grows
    const grow = io(0.25, 0.45, 0.955, 0.99), Rg = grow.mul(95);
    const de = vec2(e.x.div(1.6), e.y).length(), th = atan2(e.y, ax);
    const sc = th.div(TAU).mul(22).add(c.real.mul(0.05)).fract().mul(2).sub(1);
    const edge = Rg.add(inv(sc.mul(sc)).max(0).sqrt().mul(5)).sub(5);
    const cover = step(de, edge).mul(step(0.004, grow));
    const rim = stroke(de.sub(edge).abs(), 0.12).mul(inv(smoothstep(0.9, 1, grow))).mul(cover);
    let col = C.mul(rim).mul(0.8);
    // the bolt of this beat: from a wing tip out to the frame, zigzag, forking; drawn fast on the kick, fading with it
    const bi = c.beat.floor(), h1 = hash(bi.add(c.seed.mul(7.1))), h2 = hash(bi.mul(1.7).add(3.3).add(c.seed));
    const lOn = io(0.45, 0.48, 0.94, 0.95).mul(c.kick);
    const s = ax.sub(24).div(60), bd = c.beat.fract().mul(6).min(1);
    const y0 = h1.mul(10).sub(6), dy = h2.sub(0.5).mul(36);
    const zig = (x, ph, amp) => x.div(7).add(ph).fract().mul(2).sub(1).abs().sub(0.5).mul(amp);
    const yb = y0.add(s.mul(dy)), d1 = q.y.sub(yb).sub(zig(ax, h1.mul(3), 4)).abs().div(1.55);
    let bolt = stroke(d1, 0.18).mul(maskDraw(bd, s)).mul(step(0, s));
    const yf = y0.add(dy.mul(0.4)).sub(s.sub(0.4).mul(34)), d2 = q.y.sub(yf).sub(zig(ax, h2.mul(5), 3)).abs().div(1.4);
    bolt = bolt.max(stroke(d2, 0.13).mul(step(0.4, s)).mul(maskDraw(bd.mul(1.3).sub(0.3), s)));
    const nf2 = step(0.5, rn(10));
    const yg = y0.add(dy.mul(0.65)).add(s.sub(0.65).mul(26)), d3 = q.y.sub(yg).sub(zig(ax, h1.mul(9), 3)).abs().div(1.4);
    bolt = bolt.max(stroke(d3, 0.11).mul(step(0.65, s)).mul(maskDraw(bd.mul(1.5).sub(0.5), s)).mul(nf2));
    const nearB = smoothstep(22, 0, q.y.sub(yb).abs()).mul(lOn);
    // cloud scrolls: spiral glyphs in rows, drifting apart from the centre line, each placed in turn outward
    const pc = io(0.5, 0.64, 0.945, 0.965), rows2 = step(0.5, rn(9));
    let clouds = float(0);
    for (let j = 0; j < 2; j++) {
      const yr = j === 0 ? 36 : 24, sp = j === 0 ? 15 : 13;
      const dr = c.real.mul(0.6 + j * 0.25).mul(sense(18)).mul(j === 0 ? 1 : -1);
      const cx = ax.sub(dr).sub(j * 6.5).div(sp), ci = cx.floor();
      const g = vec2(cx.fract().sub(0.5).mul(sp), q.y.sub(yr)), gr = g.length();
      const ga = atan2(g.y, g.x).add(c.real.mul(0.3).mul(j === 0 ? 1 : -1));
      const f = gr.div(1.05).sub(ga.div(TAU)).fract(), sd = f.min(inv(f)).mul(1.05);
      const ccx = ci.add(0.5).mul(sp).add(dr).add(j * 6.5);
      const shownJ = maskBeads(pc.mul(1.4).sub(j * 0.25), ccx.div(90)).mul(j === 0 ? float(1) : rows2);
      const glyph = stroke(sd, 0.11).mul(step(gr, 4.2)).max(stroke(g.y.add(4.4).abs(), 0.1).mul(step(g.x.abs(), 5.5)));
      clouds = clouds.max(glyph.mul(shownJ).mul(step(0.01, ccx)));
    }
    col = col.add(mix(C.mul(0.55), mix(H, W, 0.5), nearB.add(lOn.mul(0.3)).clamp(0, 1)).mul(clouds));
    // rain: bead strands falling between the clouds and the mountains, each strand dropping in from its cloud
    const pr = io(0.58, 0.7, 0.94, 0.96);
    const rcx = ax.div(5.5), rci = rcx.floor(), rh = hash(rci.add(c.seed.mul(3.1)));
    const fy = q.y.add(c.real.mul(rh.mul(4).add(6))).div(2.2);
    const rb = vec2(rcx.fract().sub(0.5).mul(5.5), fy.fract().sub(0.5).mul(2.2)).length();
    const rain = dot(rb, 0.24).mul(step(0.35, rh)).mul(step(-26, q.y)).mul(step(q.y, 19)).mul(step(9, ax))
      .mul(maskDraw(pr.mul(1.6).sub(rci.div(16).mul(0.6)), float(19).sub(q.y).div(45)));
    col = col.add(mix(C, D, rh).mul(rain).mul(0.6));
    // mountains: stacked chevrons drawn outward from under the eye
    const pm = io(0.32, 0.46, 0.95, 0.97);
    const pw = mix(18, 26, rn(11)), mx = ax.div(pw), mi = mx.floor(), lx = mx.fract().sub(0.5).mul(pw);
    const Hm = hash(mi.add(c.seed)).mul(9).add(12);
    const v = float(-48).add(Hm).sub(lx.abs().mul(0.95)).sub(q.y).div(2.3);
    const ch = v.fract(), cd = ch.min(inv(ch)).mul(2.3).div(1.38);
    const chev = stroke(cd, 0.12).mul(step(0, v)).mul(step(v, 6)).mul(maskDraw(pm, ax.div(90)));
    const cnib = nib(pm, ax.div(90), 0.012).mul(step(0, v)).mul(step(v, 6)).mul(step(pm, 0.99));
    col = col.add(mix(C, D, v.floor().mod(2)).mul(chev).mul(0.55).add(W.mul(cnib)));
    col = col.add(mix(H, W, 0.4).mul(bolt).mul(lOn).mul(1.6));
    m.colorNode = col;
    m.opacityNode = cover.mul(live);
    m.alphaTest = 0.5;
    return m;
  }

  // ------------------------------------------------------------------ RING: the thunder crown (turns, soft)
  if (layer === "ring") {
    const pe = io(0.4, 0.56, 0.945, 0.975);
    const rot = c.real.div(mix(50, 95, rn(5))).mul(sense(6));
    const an = atan2(e.y, e.x).div(TAU).add(rot).fract().mul(24);
    const idx = an.floor(), long = step(idx.mod(2), 0.5);
    const len = mix(float(5.0), float(9.6), long);
    const g = pe.mul(1.5).sub(idx.div(24).mul(0.5)).clamp(0, 1);
    const t = rr.sub(9.2).div(len);
    const lat = an.fract().sub(0.5).mul(TAU / 24).mul(rr).abs();
    const hw = inv(t).mul(0.8);
    const tri = inv(smoothstep(hw.sub(0.22), hw.add(0.05), lat)).mul(step(0, t)).mul(maskIris(g, t)).mul(maskClock(pe.mul(1.6), atan2(e.x, e.y)));
    // the inner bead ring turns the other way, twice as fast; its beads arrive round the dial after the rays
    const pb = io(0.46, 0.57, 0.945, 0.965);
    const ba = atan2(e.y, e.x).div(TAU).sub(rot.mul(2)).add(1).fract().mul(36);
    const bl = ba.fract().sub(0.5).mul(TAU * 8.3 / 36), bd = vec2(bl, rr.sub(8.3)).length();
    const beads = dot(bd, 0.3).mul(maskBeads(pb, ba.floor().div(36)));
    const lit = float(0.28).add(cul.mul(0.3)).add(kl.mul(0.6));
    m.colorNode = mix(C, D, long.mul(0.5)).mul(tri).mul(lit).add(mix(D, W, 0.3).mul(beads).mul(float(0.5).add(kl.mul(0.5))));
    m.opacityNode = live.mul(step(rr, 20.4));
    m.transparent = true; m.blending = AdditiveBlending; m.depthWrite = false;
    return m;
  }

  // ------------------------------------------------------------------ VEIL: falling feathers (drifts, occluding)
  if (layer === "veil") {
    let col = vec3(0), cover = float(0), shade = float(0);
    for (let j = 0; j < 3; j++) {
      const x0 = rn(16).mul(5).add(17 + j * 9);
      const arrive = smoothstep(0.62 + j * 0.06, 0.8 + j * 0.03, u);
      const yT = 16 - j * 11 + (j === 2 ? -4 : 0);
      const y0 = mix(float(52), float(yT), arrive).add(c.real.mul(0.4 + j * 0.11).add(j * 1.7).sin().mul(1.5));
      const ph = c.real.mul(0.35 + j * 0.1).add(j * 2.1);
      const tilt = ph.sin().mul(0.35).add(rn(16).sub(0.5).mul(0.8)).add(0.5 - j * 0.35);
      const L = io(0.62, 0.66, 0.93 + j * 0.006, 0.95).mul(12);
      const feather = (ox, oy) => {
        const d = vec2(ax.sub(x0).sub(ph.cos().mul(1.4)).sub(ox), q.y.sub(y0).sub(oy));
        const lx = d.x.mul(tilt.cos()).sub(d.y.mul(tilt.sin())), ly = d.x.mul(tilt.sin()).add(d.y.mul(tilt.cos()));
        const t = ly.div(L.max(0.01)).add(0.5);
        const hw = smoothstep(1, 0.45, t).mul(smoothstep(0, 0.2, t)).mul(2.0);
        const inT = step(0, t).mul(step(t, 1)).mul(step(0.01, L));
        return { lx, t, hw, inT, body: step(lx.abs(), hw).mul(inT) };
      };
      const f = feather(0, 0), sh = feather(-1.6, -2.2);
      const barbs = stroke(f.t.mul(10).sub(f.lx.abs().mul(0.45)).fract().sub(0.5).abs(), 0.14).mul(smoothstep(0.25, 0.6, f.lx.abs())).mul(f.body);
      const edgeL = stroke(f.lx.abs().sub(f.hw).abs(), 0.16).mul(f.inT);
      const quill = stroke(f.lx.abs(), 0.07).mul(f.inT).mul(step(f.t, 0.92));
      const neon = mix(A, B, f.t.clamp(0, 1)).mul(float(0.9).add(cul.mul(0.5)));
      const k = edgeL.add(barbs.mul(0.7)).add(quill.mul(0.6)).clamp(0, 1);
      col = mix(col, neon.mul(k), f.body.max(edgeL));
      cover = cover.max(f.body.max(edgeL));
      shade = shade.max(sh.body);
    }
    m.colorNode = col;
    m.opacityNode = cover.max(shade.mul(dith)).mul(live);
    m.alphaTest = 0.5;
    return m;
  }

  // ------------------------------------------------------------------ FORE: storm-cloud scrolls along the top (gusts)
  if (layer === "fore") {
    const pin = io(0.66, 0.8, 0.93, 0.945);
    const flash = c.kick.mul(io(0.45, 0.48, 0.93, 0.945));
    let col = vec3(0), cover = float(0);
    for (let j = 0; j < 3; j++) {
      const roll = c.real.mul(0.5 + j * 0.15).mul(sense(18));
      const xj = float(36 + j * 19).add(roll.mul(0.8).sin().mul(3));
      const yj = mix(float(64), float(44 - (j % 2) * 5), smoothstep(0.66 + j * 0.04, 0.78 + j * 0.03, u))
        .add(inv(pin).mul(6)).add(c.real.mul(0.6).add(j).sin().mul(1));
      const g = vec2(ax.sub(xj), q.y.sub(yj)), sz = 6 + j * 1.3;
      const puff = dot(g.length(), sz).max(dot(g.sub(vec2(sz * 0.9, -sz * 0.3)).length(), sz * 0.7)).max(dot(g.add(vec2(sz * 0.85, sz * 0.35)).length(), sz * 0.6));
      const ga = atan2(g.y, g.x).sub(roll), f = g.length().div(1.6).sub(ga.div(TAU)).fract();
      const spiral = stroke(f.min(inv(f)).mul(1.6), 0.12).mul(step(g.length(), sz - 1));
      const rim = puff.mul(inv(dot(g.add(vec2(0, 0.7)).length(), sz - 0.6)));
      col = mix(col, mix(C, H, 0.5).mul(spiral.mul(0.6).add(rim)).mul(flash.mul(1.4)), puff);
      cover = cover.max(puff);
    }
    // near sparks: small bolt glyphs or rain beads blown sideways in gusts across the lower sides
    const ps = io(0.7, 0.84, 0.925, 0.94), sparks = step(0.5, rn(17));
    for (let j = 0; j < 5; j++) {
      const gust = c.real.mul(0.9 + j * 0.13).add(j * 2.3).sin().mul(0.5).add(c.real.mul(0.18 + j * 0.03));
      const xj = gust.mul(9).mul(sense(18)).add(j * 3.7).fract().mul(48).add(34);
      const yj = float(-38 + j * 7).add(c.real.mul(0.7).add(j).sin().mul(2));
      const g = vec2(ax.sub(xj), q.y.sub(yj));
      const zz = stroke(g.y.sub(g.x.mul(0.5).add(0.6).fract().sub(0.5).abs().mul(2.4)).abs(), 0.16).mul(step(g.x.abs(), 1.6)).mul(step(g.y.abs(), 1.8));
      const bead = dot(g.length(), 0.75);
      const sh = mix(bead, zz, sparks).mul(step(j / 5, ps.mul(1.05)));
      col = mix(col, mix(B, W, 0.5).mul(sh), sh);
      cover = cover.max(sh);
    }
    m.colorNode = col;
    m.opacityNode = cover.mul(live);
    m.alphaTest = 0.5;
    return m;
  }

  // ------------------------------------------------------------------ THE BEING (breathes, occluding)
  let col = vec3(0), cover = float(0);
  const add = (colour, mask) => { col = col.add(colour.mul(mask)); cover = cover.max(mask); };
  const body = (mask) => { cover = cover.max(mask); };

  // first stroke: the lid line drawn out from the centre, its nib running ahead; it retracts last of all
  const pline = io(0.0, 0.05, 0.99, 1.0);
  const xn0 = e.x.div(EW);
  add(mix(B, W, 0.7), stroke(e.y.abs(), 0.1).mul(maskDraw(pline, xn0.abs())).mul(step(xn0.abs(), 1)));
  add(W.mul(1.3), dot(vec2(ax.sub(pline.mul(EW)), e.y).length(), 0.3).mul(step(0.01, pline)).mul(step(pline, 0.99)));
  // the eye: two lids parting from that line
  const pl = io(0.05, 0.12, 0.98, 0.995);
  const xn = e.x.div(EW), base = inv(xn.mul(xn)), inX = step(xn.abs(), 1);
  const lidY = base.mul(EH).mul(pl);
  const slope = e.x.mul(2 * EH / (EW * EW)).mul(pl);
  const lidD = e.y.abs().sub(lidY).abs().div(slope.mul(slope).add(1).sqrt());
  const lids = stroke(lidD, 0.12).mul(inX).mul(step(0.001, pl));
  const inside = step(e.y.abs(), lidY).mul(inX).mul(maskLid(pl, e.y.div(EH)));
  body(inside);
  add(mix(B, W, 0.7).mul(float(0.8).add(kl.mul(0.5)).add(cul.mul(0.3))), lids);
  // details: corner beads where the lids meet, and a brow of 7 beads riding above the upper lid, placed centre out
  const pdet = io(0.52, 0.66, 0.94, 0.955);
  add(W, dot(vec2(ax.sub(EW + 0.55), e.y).length(), 0.3).mul(step(0.05, pdet)));
  const bx = e.x.div(1.9).add(0.5).floor().clamp(-3, 3), bxc = bx.mul(1.9);
  const byc = inv(bxc.div(EW).mul(bxc.div(EW))).mul(EH).add(1.1);
  add(mix(D, W, 0.4).mul(float(0.8).add(kl.mul(0.6))), dot(vec2(e.x.sub(bxc), e.y.sub(byc)).length(), 0.32).mul(maskBeads(pdet.mul(1.3).sub(0.3), bx.abs().div(4))));

  // the iris: an outline and three bead rows opening outward, neighbours counter-rotating
  const pi = io(0.1, 0.2, 0.975, 0.99);
  const isense = sense(8), ill = step(0.5, rn(15));
  const spin = c.real.mul(float(0.05).add(cul.mul(0.25))).mul(isense);
  const ang = atan2(e.y, e.x).div(TAU);
  const nAdd = pk(7, 3).mul(2);
  const rows = [[1.35, 8, 0.25, 1], [2.02, 12, 0.23, -1.4], [2.62, 16, 0.2, 0.8]];
  const iOpen = maskIris(pi, rr.div(RI + 0.1));
  // the illusion: light swells outward through the rows (or spirals inward), streaming rings leave the fixed pupil
  const swell = rr.mul(2.2).sub(c.real.mul(5)).sin().mul(0.5).add(0.5);
  const spir = ang.mul(6).add(rr.mul(0.9)).add(c.real.mul(1.2).mul(isense)).fract();
  const wave = mix(swell, smoothstep(0.5, 0, spir.sub(0.5).abs()), ill);
  rows.forEach(([r, n0, rad, sR], k) => {
    const n = nAdd.add(n0);
    const loc = ang.add(spin.mul(sR)).mul(n).fract().sub(0.5).mul(TAU * r).div(n);
    const bd = loc.mul(loc).add(rr.sub(r).mul(rr.sub(r))).sqrt();
    const colk = k === 0 ? mix(C, W, 0.55) : k === 1 ? D : C;
    const rk = mix(float(rad), wave.mul(rad * 1.3).add(rad * 0.4), cul);
    add(colk.mul(float(0.85).add(kl.mul(0.6)).add(cul.mul(wave).mul(0.8))), dot(bd, rk).mul(inside).mul(iOpen));
  });
  add(mix(C, W, 0.25).mul(float(0.8).add(kl.mul(0.5))), stroke(rr.sub(RI).abs(), 0.08).mul(inside).mul(iOpen));
  const stream = rr.sub(0.8).sub(c.real.mul(0.9)).div(0.32).fract();
  add(mix(C, W, 0.5).mul(cul), stroke(stream.sub(0.5).abs().mul(0.32), 0.03).mul(step(0.85, rr)).mul(step(rr, 1.12)).mul(inside).mul(step(0.05, cul)));
  // the pupil: disc, slit or diamond; it swells a little on the kick
  const pv = pk(4, 3), ps = c.kick.mul(0.15).add(1);
  const pe = e.div(ps);
  const dDisc = pe.length().div(0.72), dSlit = vec2(pe.x.div(0.3), pe.y.div(0.95)).length(), dDia = pe.x.abs().div(0.62).add(pe.y.abs().div(0.95));
  const pd = dDisc.mul(is(pv, 0)).add(dSlit.mul(is(pv, 1))).add(dDia.mul(is(pv, 2)));
  add(W.mul(1.2), inv(smoothstep(inv(aa.mul(1.5)), 1, pd)).mul(inside).mul(step(0.05, pi)));

  // a fan of line-art feathers in polar sectors about a root: outline, quill, travelling band, tip dot, black vane
  const fan = (r, f, n, DA, Lfn, growFn, pDots) => {
    const x = f.mul(n), fi = x.floor().clamp(0, float(n).sub(1));
    const lat = x.sub(fi).sub(0.5).mul(DA).mul(r).abs();
    const inFan = step(0, f).mul(step(f, 1));
    const g = growFn(fi), Lc = Lfn(fi).mul(g);
    const t = r.sub(R0).div(Lc.max(0.01));
    const inT = step(0, t).mul(step(t, 1)).mul(step(0.001, g)).mul(inFan);
    const hw = r.mul(DA).mul(0.4).mul(smoothstep(1, 0.5, t)).mul(smoothstep(0, 0.12, t));
    const rt = Lc.add(R0 + 0.8), dr = r.sub(rt);
    return {
      fi, t, inFan,
      outline: stroke(lat.sub(hw).abs(), 0.085).mul(inT),
      quill: stroke(lat, 0.04).mul(inT).mul(step(0.1, t)).mul(step(t, 0.9)),
      inside: step(lat, hw.add(0.1)).mul(inT),
      tip: dot(lat.mul(lat).add(dr.mul(dr)).sqrt(), 0.36).mul(step(0.98, g)).mul(inFan).mul(maskBeads(pDots, fi.div(n))),
    };
  };
  const pDots = io(0.55, 0.65, 0.94, 0.95);

  // the wings: 9 feathers a side, unfolding from the body outward; a slow breath of a wave runs root to tip
  const pw = io(0.14, 0.3, 0.965, 0.985);
  const qw = vec2(ax.sub(RX), e.y), wr = qw.length();
  const breathe = c.real.mul(TAU / 6).sin().mul(0.04);
  const wwave = c.real.mul(1.7).sub(wr.mul(0.3)).sin().mul(wr.div(18)).mul(float(0.02).add(cul.mul(0.1))).add(breathe);
  const A1 = mix(1.85, 2.3, rn(3));
  const wa = atan2(qw.x, qw.y).sub(wwave);
  const wf = wa.sub(A0).div(A1.sub(A0));
  const wv = pk(2, 2);
  const Lw = (fi) => { const t = fi.div(NF - 1); return mix(t.mul(0.8).add(0.1).mul(PI).sin().mul(8).add(10.5), float(19.5).sub(t.mul(10)), wv); };
  const wing = fan(wr, wf, NF, A1.sub(A0).div(NF), Lw, (fi) => smoothstep(0, 1, pw.mul(NF + 1.5).sub(fi).div(1.5).clamp(0, 1)), pDots);
  const band = smoothstep(0.16, 0, wing.t.sub(c.real.div(2.6).sub(wing.fi.mul(0.07)).fract().mul(1.3)).abs());
  const wcol = mix(A, B, wing.t.clamp(0, 1));
  const wlit = float(0.8).add(kl.mul(0.5)).add(cul.mul(0.3));
  body(wing.inside);
  add(wcol.mul(wlit), wing.outline);
  add(mix(wcol, W, 0.6).mul(0.7), wing.quill);
  add(wcol.mul(0.5), wing.inside.mul(band).mul(inv(wing.outline)));
  add(W.mul(c.kick.mul(0.4).add(1)), wing.tip);

  // the tail: a fan of 3 or 5 below the eye, drawing downward, centre feather first
  const pt = io(0.24, 0.33, 0.965, 0.98);
  const nT = pk(1, 2).mul(2).add(3), half = nT.sub(1).div(2), S = 0.56;
  const tq = vec2(e.x, e.y.add(EH + 0.3).negate()), tr = tq.length();
  const tf = atan2(tq.x, tq.y).add(S).div(2 * S);
  const off = (fi) => fi.sub(half).abs().div(half);
  const tail = fan(tr, tf, nT, float(2 * S).div(nT), (fi) => float(10).sub(off(fi).mul(3.5)), (fi) => pt.mul(1.6).sub(off(fi).mul(0.6)).clamp(0, 1), pDots);
  const tcol = mix(C, D, tail.t.clamp(0, 1));
  body(tail.inside);
  add(tcol.mul(float(0.9).add(kl.mul(0.5)).add(cul.mul(0.3))), tail.outline);
  add(mix(tcol, W, 0.6).mul(0.7), tail.quill);
  add(mix(B, W, 0.6), tail.tip);

  m.colorNode = col;
  m.opacityNode = cover.mul(live);
  m.alphaTest = 0.5;
  return m;
}
