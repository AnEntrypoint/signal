// THE THUNDERBIRD: the winged eye in its storm. One script, five canvases (params.layer), drawn in being metres q = P * 74 / depth.
// u 0-.35 entrance (line, lids, iris, wings, tail; the storm glimmers from 0), .35-.78 the storm fills, .78-.93 BUILD: parts
// light one by one to the all-lit culmination, .93-1 exit feather stroke by stroke: fore, veil, ring, being, world last (u 1).
// Seed channels 300-319 (halves .5 / 1.5 pick the entrance / exit feather-stroke mask).
import { MeshBasicNodeMaterial, AdditiveBlending, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, mix, atan2, fwidth } from "builtin/tsl";
import { tripClock, visionShown, visionU, climb, maskLid, maskIris, maskBeads, maskDraw, nib, inv, is, sgn, ioU, strokeAA, famPick, NEON } from "./lib/trip.js";

const TAU = 6.28318, PI = 3.14159;
const DEPTH = { world: 104, ring: 86, being: 74, veil: 64, fore: 52 };
const EY = -2, EW = 7, EH = 3.4, RI = 3.0;       // eye centre y, almond half width / height, iris radius
const RX = 6.6, A0 = 0.16, NF = 9, R0 = 1.1;     // wing root x, first fan angle (from +y), feathers, feather start radius
const hash = (x) => float(x).mul(12.9898).add(4.1).sin().mul(43758.5453).fract();
const odd = (i) => float(i).mul(0.5).fract().mul(2);   // 0 / 1, safe for negative ids

export function material(ctx) {
  const layer = ctx.params.layer ?? "being", low = ctx.quality === "low";
  const c = tripClock(ctx), u = visionU(ctx, c), io = ioU(u);
  const S = (a, b) => smoothstep(a, b, u);
  const rn = (n) => c.rnd(300 + n), pk = (n, k) => c.pick(300 + n, k), sense = (n) => sgn(rn(n));
  const live = visionShown(ctx, c, 0);
  const kickOn = step(0.001, c.kick);
  const build = S(0.78, 0.91);                                             // 0 the standing storm .. 1 everything lit
  const cul = io(0.8, 0.9, 0.94, 0.97).mul(climb(c).mul(0.4).add(0.6));
  const fam = pk(0, 3), hot = pk(19, 3), { BLU, VIO, PNK, ORA, YEL, GRN, W } = NEON;
  const FAMS = [[PNK, ORA, BLU, VIO], [GRN, YEL, VIO, PNK], [ORA, YEL, BLU, PNK]];   // feather root, tip, iris/storm, second row
  const A = famPick(FAMS, fam, 0), B = famPick(FAMS, fam, 1), C = famPick(FAMS, fam, 2), D = famPick(FAMS, fam, 3);
  const H = YEL.mul(is(hot, 0)).add(W.mul(is(hot, 1))).add(GRN.mul(is(hot, 2)));     // lightning
  const P = positionGeometry.xy;
  const q = P.mul(74 / DEPTH[layer]);
  const aa = fwidth(q.x).mul(1.2).max(0.01);
  const stroke = strokeAA(aa);
  const dot = (d, r) => inv(smoothstep(float(r).sub(aa), r, d));
  const e = vec2(q.x, q.y.sub(EY)), rr = e.length(), ax = q.x.abs();
  const front = c.beat.fract().mul(30);
  const kl = inv(smoothstep(0, 2.4, rr.sub(front).abs())).mul(kickOn).mul(inv(smoothstep(14, 30, front)));
  // FEATHER STROKES, the being's own mask: p 0 nothing .. 1 whole. Each stroke starts in its turn, draws along its length
  // and fattens to meet its neighbours. kind 0: barbs off the quill x = 0, root to tip; 1: a fan of feathers about the eye,
  // one at a time; 2: barbs combed from the outside in, odd then even.
  const kE = pk(0.5, 3), kX0 = kE.add(1).add(pk(1.5, 2)), kX = kX0.sub(step(2.5, kX0).mul(3));
  const fm = (p, kind, sc) => {
    const pp = float(p).clamp(0, 1).mul(1.25);
    const b0 = q.y.sub(ax.mul(0.6)).div(sc), b2 = q.y.add(ax.mul(0.6)).div(sc), nS = Math.max(6, Math.round(72 / sc));
    const b1 = atan2(e.x, e.y.add(0.0001)).div(TAU).add(0.5).mul(nS);
    const k0 = is(kind, 0), k1 = is(kind, 1), k2 = is(kind, 2);
    const b = b0.mul(k0).add(b1.mul(k1)).add(b2.mul(k2)), idx = b.floor(), f = b.fract();
    const along = ax.div(115).mul(k0).add(rr.div(130).mul(k1)).add(inv(ax.div(115)).mul(k2)).clamp(0, 1);
    const h = hash(idx.add(c.seed.mul(1.3)));
    const ord = idx.mul(sc / 150).add(0.5).clamp(0, 1).mul(0.8).add(h.mul(0.2)).mul(k0).add(h.mul(k1)).add(odd(idx).mul(0.5).add(h.mul(0.5)).mul(k2));
    const lp = pp.sub(ord.mul(0.75)).div(0.5).clamp(0, 1);
    return step(along, lp.mul(1.6)).mul(step(f.sub(0.5).abs(), lp.mul(0.55))).mul(step(0.001, lp));
  };
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  m.fog = false;

  // ------------------------------------------------------------------ WORLD: the storm, lit from u 0 to u 1
  if (layer === "world") {
    // concentric bead rows: the storm's dot mandala, and the halftone its edge dissolves through (never the quad)
    const ri = rr.div(2.4), rI = ri.floor().add(0.5), nB = rI.mul(TAU).floor().max(1);
    const ba = atan2(e.y, e.x.add(0.0001)).div(TAU).add(0.5).mul(nB);
    const bd = vec2(ba.fract().sub(0.5).mul(rI).mul(TAU * 2.4).div(nB), ri.fract().sub(0.5).mul(2.4)).length();
    const fall = inv(smoothstep(30, 57, vec2(q.x.mul(0.56), q.y).length()));
    const cover = fm(S(-0.1, 0.28), kE, 9).mul(fm(inv(S(0.984, 0.999)), kX, 9)).mul(step(bd, fall.mul(1.75))).mul(step(0.01, fall));
    const tw = step(0.93, hash(ba.floor().add(rI.mul(17.3)).add(c.beat.floor().mul(0.37))));
    const mand = dot(bd, 0.5).mul(step(8, rI)).mul(odd(rI.sub(0.5)));
    let col = mix(C, D, odd(rI.sub(0.5).mul(0.5).floor())).mul(mand)
      .mul(float(0.14).add(tw.mul(0.5)).add(step(rI.div(26), build.mul(1.05)).mul(0.55)).add(kl.mul(0.4)));
    // the bolt of this beat: from a wing tip out to the frame, zigzag, forking; a second one joins in the build
    const lOn = S(0.38, 0.42).mul(c.kick), s = ax.sub(24).div(60), bdr = c.beat.fract().mul(6).min(1);
    const zig = (x, ph, amp) => x.div(7).add(ph).fract().mul(2).sub(1).abs().sub(0.5).mul(amp);
    const boltAt = (k) => {
      const bi = c.beat.floor().add(k), h1 = hash(bi.add(c.seed.mul(7.1))), h2 = hash(bi.mul(1.7).add(3.3).add(c.seed));
      const y0 = h1.mul(10).sub(6), dy = h2.sub(0.5).mul(36), yb = y0.add(s.mul(dy));
      let b = stroke(q.y.sub(yb).sub(zig(ax, h1.mul(3), 4)).abs().div(1.55), 0.18).mul(maskDraw(bdr, s)).mul(step(0, s));
      const yf = y0.add(dy.mul(0.4)).sub(s.sub(0.4).mul(34));
      b = b.max(stroke(q.y.sub(yf).sub(zig(ax, h2.mul(5), 3)).abs().div(1.4), 0.13).mul(step(0.4, s)).mul(maskDraw(bdr.mul(1.3).sub(0.3), s)));
      if (!low) { const yg = y0.add(dy.mul(0.65)).add(s.sub(0.65).mul(26));
        b = b.max(stroke(q.y.sub(yg).sub(zig(ax, h1.mul(9), 3)).abs().div(1.4), 0.11).mul(step(0.65, s)).mul(maskDraw(bdr.mul(1.5).sub(0.5), s)).mul(step(0.5, rn(10)))); }
      return { b, near: inv(smoothstep(0, 22, q.y.sub(yb).abs())) };
    };
    const b1 = boltAt(0);
    let bolt = b1.b, nearB = b1.near.mul(lOn);
    if (!low) { const b2 = boltAt(11.5), on2 = step(0.5, build); bolt = bolt.max(b2.b.mul(on2)); nearB = nearB.max(b2.near.mul(lOn).mul(on2)); }
    // cloud scrolls: spiral glyphs in rows drifting apart, placed in turn outward; the second row lights in the build
    const pc = S(0.4, 0.55), rows2 = step(0.5, rn(9)).max(step(0.35, build));
    let clouds = float(0);
    for (let j = 0; j < (low ? 1 : 2); j++) {
      const yr = j === 0 ? 36 : 24, sp = j === 0 ? 15 : 13;
      const dr = c.real.mul(0.6 + j * 0.25).mul(sense(18)).mul(j === 0 ? 1 : -1);
      const cx = ax.sub(dr).sub(j * 6.5).div(sp), ci = cx.floor();
      const g = vec2(cx.fract().sub(0.5).mul(sp), q.y.sub(yr)), gr = g.length();
      const ga = atan2(g.y, g.x.add(0.0001)).add(c.real.mul(0.3).mul(j === 0 ? 1 : -1));
      const f = gr.div(1.05).sub(ga.div(TAU)).fract(), sd = f.min(inv(f)).mul(1.05);
      const ccx = ci.add(0.5).mul(sp).add(dr).add(j * 6.5);
      const shownJ = maskBeads(pc.mul(1.4).sub(j * 0.25), ccx.div(90)).mul(j === 0 ? float(1) : rows2);
      const glyph = stroke(sd, 0.11).mul(step(gr, 4.2)).max(stroke(g.y.add(4.4).abs(), 0.1).mul(step(g.x.abs(), 5.5)));
      clouds = clouds.max(glyph.mul(shownJ).mul(step(0.01, ccx)));
    }
    col = mix(col, mix(C.mul(build.mul(0.6).add(0.55)), mix(H, W, 0.5), nearB.add(lOn.mul(0.3)).clamp(0, 1)), clouds);
    // rain: bead strands dropping in from u 0, more strands as the build climbs
    const pr = S(0, 0.22);
    const rcx = ax.div(5.5), rci = rcx.floor(), rh = hash(rci.add(c.seed.mul(3.1)));
    const fy = q.y.add(c.real.mul(rh.mul(4).add(6))).div(2.2);
    const rb = vec2(rcx.fract().sub(0.5).mul(5.5), fy.fract().sub(0.5).mul(2.2)).length();
    const rain = dot(rb, 0.24).mul(step(mix(float(0.5), float(0.08), build), rh)).mul(step(-26, q.y)).mul(step(q.y, 19)).mul(step(9, ax))
      .mul(maskDraw(pr.mul(1.6).sub(rci.div(16).mul(0.6)), float(19).sub(q.y).div(45)));
    col = mix(col, mix(C, D, rh).mul(build.mul(0.5).add(0.6)), rain);
    // mountains: stacked chevrons drawn outward from under the eye
    const pm = S(0.2, 0.4);
    const pw = mix(18, 26, rn(11)), mx = ax.div(pw), mi = mx.floor(), lx = mx.fract().sub(0.5).mul(pw);
    const v = float(-48).add(hash(mi.add(c.seed)).mul(9).add(12)).sub(lx.abs().mul(0.95)).sub(q.y).div(2.3);
    const ch = v.fract(), inM = step(0, v).mul(step(v, 6));
    const chev = stroke(ch.min(inv(ch)).mul(1.67), 0.12).mul(inM).mul(maskDraw(pm, ax.div(90)));
    const tier = step(v.floor().div(6), build.mul(1.1));                                // tiers light bottom-up in the build
    col = mix(col, mix(C, D, odd(v.floor())).mul(tier.mul(0.6).add(0.5)), chev);
    col = col.add(W.mul(nib(pm, ax.div(90), 0.012).mul(inM).mul(step(pm, 0.99)))).add(mix(H, W, 0.4).mul(bolt).mul(lOn).mul(1.6));
    m.colorNode = col;
    m.opacityNode = cover.mul(live);
    m.alphaTest = 0.5;
    return m;
  }

  // ------------------------------------------------------------------ RING: the thunder crown (turns, additive)
  if (layer === "ring") {
    const pe = S(0.36, 0.5), out = fm(inv(S(0.945, 0.972)), kX, 3);
    const rot = c.real.div(mix(50, 95, rn(5))).mul(sense(6));
    const ea = atan2(e.y, e.x.add(0.0001)).div(TAU);
    const an = ea.add(rot).fract().mul(24), idx = an.floor(), long = inv(odd(idx));
    const g = pe.mul(1.5).sub(idx.div(24).mul(0.5)).clamp(0, 1);
    const t = rr.sub(9.2).div(mix(float(5.0), float(9.6), long));
    const lat = an.fract().sub(0.5).mul(TAU / 24).mul(rr).abs(), hw = inv(t).mul(0.8);
    const tri = inv(smoothstep(hw.sub(0.22), hw.add(0.05), lat)).mul(step(0, t)).mul(maskIris(g, t));
    const rayLit = step(idx.div(24), build.mul(1.04));                                  // rays light round the dial in the build
    // inner bead ring turning the other way; fine rings and an outer bead ring join one by one in the build
    const bead = (r, n, turn) => { const a = ea.add(turn).add(1).fract().mul(n);
      return { d: vec2(a.fract().sub(0.5).mul(TAU * r / n), rr.sub(r)).length(), k: a.floor().div(n) }; };
    const bi = bead(8.3, 36, rot.mul(-2)), bo = bead(19.4, 60, rot.mul(3));
    const beads = dot(bi.d, 0.3).mul(maskBeads(S(0.42, 0.53), bi.k));
    const outer = dot(bo.d, 0.26).mul(maskBeads(build.mul(1.1), bo.k));
    let fine = float(0);
    [11.6, 14.2, 16.8].forEach((r, i) => { fine = fine.max(stroke(rr.sub(r).abs(), 0.05).mul(step((i + 1) / 4, build))); });
    m.colorNode = mix(C, D, long.mul(0.5)).mul(tri).mul(float(0.26).add(rayLit.mul(0.6)).add(cul.mul(0.3)).add(kl.mul(0.6)))
      .add(mix(D, W, 0.3).mul(beads).mul(float(0.5).add(build.mul(0.4)).add(kl.mul(0.5))))
      .add(mix(B, W, 0.3).mul(outer).mul(float(0.7).add(kl.mul(0.5)))).add(C.mul(fine).mul(inv(tri)).mul(0.5));
    m.opacityNode = live.mul(step(rr, 20.4)).mul(out);
    m.transparent = true; m.blending = AdditiveBlending; m.depthWrite = false;
    return m;
  }

  // ------------------------------------------------------------------ VEIL: falling feathers (drift, occlude); leave barb by barb
  if (layer === "veil") {
    let col = vec3(0), cover = float(0), shade = float(0);
    const dq = P.div(fwidth(P.x).max(0.0001)).floor(), dith = odd(dq.x.add(dq.y));
    const pv = inv(S(0.938, 0.96));
    for (let j = 0; j < (low ? 2 : 3); j++) {
      const x0 = rn(16).mul(5).add(17 + j * 9);
      const yT = 16 - j * 11 + (j === 2 ? -4 : 0);
      const y0 = mix(float(yT + 13), float(yT), S(0.55 + j * 0.05, 0.72 + j * 0.03)).add(c.real.mul(0.4 + j * 0.11).add(j * 1.7).sin().mul(1.5));
      const ph = c.real.mul(0.35 + j * 0.1).add(j * 2.1);
      const tilt = ph.sin().mul(0.35).add(rn(16).sub(0.5).mul(0.8)).add(0.5 - j * 0.35);
      const L = io(0.55 + j * 0.05, 0.6 + j * 0.05, 0.955, 0.968).mul(12);
      const feather = (ox, oy) => {
        const d = vec2(ax.sub(x0).sub(ph.cos().mul(1.4)).sub(ox), q.y.sub(y0).sub(oy));
        const lx = d.x.mul(tilt.cos()).sub(d.y.mul(tilt.sin())), ly = d.x.mul(tilt.sin()).add(d.y.mul(tilt.cos()));
        const t = ly.div(L.max(0.01)).add(0.5);
        const hw = inv(smoothstep(0.45, 1, t)).mul(smoothstep(0, 0.2, t)).mul(2.0);
        const inT = step(0, t).mul(step(t, 1)).mul(step(0.01, L));
        return { lx, t, hw, inT, body: step(lx.abs(), hw).mul(inT) };
      };
      const f = feather(0, 0), sh = feather(-1.6, -2.2);
      const bc = f.t.mul(10).sub(f.lx.abs().mul(0.45));
      const keep = step(hash(bc.floor().add(j * 7.7).add(step(0, f.lx).mul(31))), pv.mul(1.02)).mul(step(0.001, pv));   // each barb leaves on its own
      const barbs = stroke(bc.fract().sub(0.5).abs(), 0.14).mul(smoothstep(0.25, 0.6, f.lx.abs())).mul(f.body);
      const quill = stroke(f.lx.abs(), 0.07).mul(f.inT).mul(step(f.t, 0.92));
      const vane = f.body.mul(keep), edgeL = stroke(f.lx.abs().sub(f.hw).abs(), 0.16).mul(f.inT).mul(keep);
      const neon = mix(A, B, f.t.clamp(0, 1)).mul(float(0.55).add(build.mul(0.6)).add(cul.mul(0.5)));
      const k = edgeL.add(barbs.mul(build.mul(0.5).add(0.45))).add(quill.mul(0.6)).clamp(0, 1);
      const cv = vane.max(edgeL).max(quill);
      col = mix(col, neon.mul(k), cv);
      cover = cover.max(cv);
      shade = shade.max(sh.body.mul(pv));
    }
    m.colorNode = col;
    m.opacityNode = cover.max(shade.mul(dith)).mul(live);
    m.alphaTest = 0.5;
    return m;
  }

  // ------------------------------------------------------------------ FORE: black storm scrolls (gust); first out
  if (layer === "fore") {
    const mask = fm(S(0.6, 0.74), kE, 6).mul(fm(inv(S(0.93, 0.95)), kX, 6));
    const flash = c.kick.mul(S(0.38, 0.42)).add(build.mul(0.45));
    let col = vec3(0), cover = float(0);
    for (let j = 0; j < 3; j++) {
      const roll = c.real.mul(0.5 + j * 0.15).mul(sense(18));
      const xj = float(36 + j * 19).add(roll.mul(0.8).sin().mul(3));
      const yj = float(44 - (j % 2) * 5).add(c.real.mul(0.6).add(j).sin().mul(1));
      const g = vec2(ax.sub(xj), q.y.sub(yj)), sz = 6 + j * 1.3, gl = g.length();
      const puff = dot(gl, sz).max(dot(g.sub(vec2(sz * 0.9, -sz * 0.3)).length(), sz * 0.7)).max(dot(g.add(vec2(sz * 0.85, sz * 0.35)).length(), sz * 0.6));
      const ga = atan2(g.y, g.x.add(0.0001)).sub(roll), f = gl.div(1.6).sub(ga.div(TAU)).fract();
      const spiral = stroke(f.min(inv(f)).mul(1.6), 0.12).mul(step(gl, sz - 1));
      const rim = puff.mul(inv(dot(g.add(vec2(0, 0.7)).length(), sz - 0.6)));
      col = mix(col, C.mul(spiral).add(H.mul(rim)).mul(flash.mul(1.1).add(0.3)), puff);   // black puff, spiral + rim lit by the storm
      cover = cover.max(puff);
    }
    // near sparks: small bolt glyphs or rain beads blown sideways in gusts across the lower sides
    const ps = S(0.64, 0.78), sparks = step(0.5, rn(17));
    for (let j = 0; j < (low ? 3 : 5); j++) {
      const gust = c.real.mul(0.9 + j * 0.13).add(j * 2.3).sin().mul(0.5).add(c.real.mul(0.18 + j * 0.03));
      const xj = gust.mul(9).mul(sense(18)).add(j * 3.7).fract().mul(48).add(34);
      const yj = float(-38 + j * 7).add(c.real.mul(0.7).add(j).sin().mul(2));
      const g = vec2(ax.sub(xj), q.y.sub(yj));
      const zz = stroke(g.y.sub(g.x.mul(0.5).add(0.6).fract().sub(0.5).abs().mul(2.4)).abs(), 0.16).mul(step(g.x.abs(), 1.6)).mul(step(g.y.abs(), 1.8));
      const sh = mix(dot(g.length(), 0.75), zz, sparks).mul(step(j / 5, ps.mul(1.05)));
      col = mix(col, mix(B, W, 0.5).mul(sh), sh);
      cover = cover.max(sh);
    }
    m.colorNode = col;
    m.opacityNode = cover.mul(mask).mul(live);
    m.alphaTest = 0.5;
    return m;
  }

  // ------------------------------------------------------------------ THE BEING (breathes, occluding)
  let col = vec3(0), cover = float(0);
  const add = (colour, mask) => { col = col.add(colour.mul(mask)); cover = cover.max(mask); };
  const body = (mask) => { cover = cover.max(mask); };

  // first stroke: the lid line drawn out from the centre, its nib running ahead; it retracts last of the being, before the storm
  const pline = io(0.0, 0.04, 0.972, 0.984);
  const xn = e.x.div(EW), inX = step(xn.abs(), 1);
  add(mix(B, W, 0.7), stroke(e.y.abs(), 0.1).mul(maskDraw(pline, xn.abs())).mul(inX));
  add(W.mul(1.3), dot(vec2(ax.sub(pline.mul(EW)), e.y).length(), 0.3).mul(step(0.01, pline)).mul(step(pline, 0.99)));
  // the eye: two lids parting from that line
  const pl = io(0.04, 0.1, 0.966, 0.98);
  const lidY = inv(xn.mul(xn)).mul(EH).mul(pl);
  const slope = e.x.mul(2 * EH / (EW * EW)).mul(pl);
  const lids = stroke(e.y.abs().sub(lidY).abs().div(slope.mul(slope).add(1).sqrt()), 0.12).mul(inX).mul(step(0.001, pl));
  const inside = step(e.y.abs(), lidY).mul(inX).mul(maskLid(pl, e.y.div(EH)));
  body(inside);
  add(mix(B, W, 0.7).mul(float(0.8).add(kl.mul(0.5)).add(cul.mul(0.3))), lids);
  // details: corner beads where the lids meet, and a brow of 7 beads above the upper lid, placed centre out
  const pdet = io(0.45, 0.58, 0.945, 0.958);
  add(W, dot(vec2(ax.sub(EW + 0.55), e.y).length(), 0.3).mul(step(0.05, pdet)));
  const bx = e.x.div(1.9).add(0.5).floor().clamp(-3, 3), bxc = bx.mul(1.9);
  const byc = inv(bxc.div(EW).mul(bxc.div(EW))).mul(EH).add(1.1);
  add(mix(D, W, 0.4).mul(float(0.8).add(kl.mul(0.6))), dot(vec2(e.x.sub(bxc), e.y.sub(byc)).length(), 0.32).mul(maskBeads(pdet.mul(1.3).sub(0.3), bx.abs().div(4))));

  // the iris: an outline and three bead rows opening outward, neighbours counter-rotating; in the culmination light
  // swells out through the rows (or spirals in) and fine rings stream from the fixed pupil
  const pi = io(0.08, 0.18, 0.975, 0.99);
  const isense = sense(8), ill = step(0.5, rn(15));
  const spin = c.real.mul(float(0.05).add(cul.mul(0.25))).mul(isense);
  const ang = atan2(e.y, e.x.add(0.0001)).div(TAU);
  const nAdd = pk(7, 3).mul(2);
  const iOpen = maskIris(pi, rr.div(RI + 0.1));
  const swell = rr.mul(2.2).sub(c.real.mul(5)).sin().mul(0.5).add(0.5);
  const spir = ang.mul(6).add(rr.mul(0.9)).add(c.real.mul(1.2).mul(isense)).fract();
  const wave = mix(swell, inv(smoothstep(0, 0.5, spir.sub(0.5).abs())), ill);
  [[1.35, 8, 0.25, 1], [2.02, 12, 0.23, -1.4], [2.62, 16, 0.2, 0.8]].forEach(([r, n0, rad, sR], k) => {
    const n = nAdd.add(n0);
    const loc = ang.add(spin.mul(sR)).mul(n).fract().sub(0.5).mul(TAU * r).div(n);
    const colk = k === 0 ? mix(C, W, 0.55) : k === 1 ? D : C;
    const rk = mix(float(rad), wave.mul(rad * 1.3).add(rad * 0.4), cul);
    add(colk.mul(float(0.85).add(kl.mul(0.6)).add(cul.mul(wave).mul(0.8))), dot(vec2(loc, rr.sub(r)).length(), rk).mul(inside).mul(iOpen));
  });
  add(mix(C, W, 0.25).mul(float(0.8).add(kl.mul(0.5))), stroke(rr.sub(RI).abs(), 0.08).mul(inside).mul(iOpen));
  const stream = rr.sub(0.8).sub(c.real.mul(0.9)).div(0.32).fract();
  add(mix(C, W, 0.5).mul(cul), stroke(stream.sub(0.5).abs().mul(0.32), 0.03).mul(step(0.85, rr)).mul(step(rr, 1.12)).mul(inside).mul(step(0.05, cul)));
  // the pupil: disc, slit or diamond; it swells a little on the kick
  const pv = pk(4, 3), pe = e.div(c.kick.mul(0.15).add(1));
  const pd = pe.length().div(0.72).mul(is(pv, 0)).add(vec2(pe.x.div(0.3), pe.y.div(0.95)).length().mul(is(pv, 1))).add(pe.x.abs().div(0.62).add(pe.y.abs().div(0.95)).mul(is(pv, 2)));
  add(W.mul(1.2), inv(smoothstep(inv(aa.mul(1.5)), 1, pd)).mul(inside).mul(step(0.05, pi)));

  // a fan of line-art feathers in polar sectors about a root: outline, quill, barbs, tip dot, black vane
  const fan = (r, f, n, DA, Lfn, growFn, pDots) => {
    const x = f.mul(n), fi = x.floor().clamp(0, float(n).sub(1));
    const lat = x.sub(fi).sub(0.5).mul(DA).mul(r).abs();
    const inFan = step(0, f).mul(step(f, 1));
    const g = growFn(fi), Lc = Lfn(fi).mul(g);
    const t = r.sub(R0).div(Lc.max(0.01));
    const inT = step(0, t).mul(step(t, 1)).mul(step(0.001, g)).mul(inFan);
    const hw = r.mul(DA).mul(0.4).mul(inv(smoothstep(0.5, 1, t))).mul(smoothstep(0, 0.12, t));
    const dr = r.sub(Lc.add(R0 + 0.8)), vane = step(lat, hw.add(0.1)).mul(inT);
    return {
      fi, t, inFan, inside: vane,
      outline: stroke(lat.sub(hw).abs(), 0.085).mul(inT),
      quill: stroke(lat, 0.04).mul(inT).mul(step(0.1, t)).mul(step(t, 0.9)),
      barb: stroke(r.sub(lat.mul(0.9)).div(0.8).fract().sub(0.5).abs().mul(0.6), 0.05).mul(step(lat, hw.sub(0.12))).mul(inT),
      tip: dot(vec2(lat, dr).length(), 0.36).mul(step(0.98, g)).mul(inFan).mul(maskBeads(pDots, fi.div(n))),
    };
  };
  const pDots = io(0.48, 0.58, 0.945, 0.955);
  // a feather's turn in the fan, by mask kind: body outward, tips inward, or odd then even
  const turn = (fi, k) => fi.div(NF).mul(is(k, 0)).add(float(NF - 1).sub(fi).div(NF).mul(is(k, 1))).add(odd(fi).mul(0.5).add(fi.div(NF).mul(0.45)).mul(is(k, 2)));
  const gro = (p, o) => smoothstep(0, 1, float(p).mul(1.45).sub(o).div(0.45).clamp(0, 1));
  const xo = inv(S(0.955, 0.985));                                         // wings and tail leave, feather stroke by stroke
  const barbsOn = (fi, n) => step(fi.add(0.5).div(n), build.mul(1.08)).mul(gro(inv(S(0.94, 0.962)), turn(fi, kX)));

  // the wings: 9 feathers a side unfolding in their seeded turn; a slow breath of a wave runs root to tip
  const qw = vec2(ax.sub(RX), e.y), wr = qw.length();
  const wwave = c.real.mul(1.7).sub(wr.mul(0.3)).sin().mul(wr.div(18)).mul(float(0.02).add(cul.mul(0.1))).add(c.real.mul(TAU / 6).sin().mul(0.04));
  const A1 = mix(1.85, 2.3, rn(3));
  const wf = atan2(qw.x, qw.y.add(0.0001)).sub(wwave).sub(A0).div(A1.sub(A0));
  const wv = pk(2, 2);
  const Lw = (fi) => { const t = fi.div(NF - 1); return mix(t.mul(0.8).add(0.1).mul(PI).sin().mul(8).add(10.5), float(19.5).sub(t.mul(10)), wv); };
  const wing = fan(wr, wf, NF, A1.sub(A0).div(NF), Lw, (fi) => gro(S(0.12, 0.3), turn(fi, kE)).mul(gro(xo, turn(fi, kX))), pDots);
  const band = inv(smoothstep(0, 0.16, wing.t.sub(c.real.div(2.6).sub(wing.fi.mul(0.07)).fract().mul(1.3)).abs()));
  const wcol = mix(A, B, wing.t.clamp(0, 1)), wb = barbsOn(wing.fi, NF);
  body(wing.inside);
  add(wcol.mul(float(0.7).add(wb.mul(0.5)).add(kl.mul(0.5)).add(cul.mul(0.3))), wing.outline);
  add(mix(wcol, W, 0.6).mul(0.7), wing.quill);
  add(wcol.mul(0.5), wing.inside.mul(band).mul(inv(wing.outline)));
  add(mix(wcol, W, 0.25).mul(float(0.75).add(kl.mul(0.5))), wing.barb.mul(wb));
  add(W.mul(c.kick.mul(0.4).add(1)), wing.tip);

  // the tail: a fan of 3 or 5 below the eye, drawing downward, centre feather first
  const pt = S(0.22, 0.33).mul(inv(S(0.965, 0.985)));
  const nT = pk(1, 2).mul(2).add(3), half = nT.sub(1).div(2), SP = 0.56;
  const tq = vec2(e.x, e.y.add(EH + 0.3).negate()), tr = tq.length();
  const tf = atan2(tq.x, tq.y.add(0.0001)).add(SP).div(2 * SP);
  const off = (fi) => fi.sub(half).abs().div(half.max(0.5));
  const tail = fan(tr, tf, nT, float(2 * SP).div(nT), (fi) => float(10).sub(off(fi).mul(3.5)), (fi) => pt.mul(1.6).sub(off(fi).mul(0.6)).clamp(0, 1), pDots);
  const tcol = mix(C, D, tail.t.clamp(0, 1)), tb = step(0.75, build).mul(inv(S(0.94, 0.96)));
  body(tail.inside);
  add(tcol.mul(float(0.8).add(tb.mul(0.4)).add(kl.mul(0.5)).add(cul.mul(0.3))), tail.outline);
  add(mix(tcol, W, 0.6).mul(0.7), tail.quill);
  add(mix(tcol, W, 0.3).mul(0.8), tail.barb.mul(tb));
  add(mix(B, W, 0.6), tail.tip);

  m.colorNode = col;
  m.opacityNode = cover.mul(live);
  m.alphaTest = 0.5;
  return m;
}
