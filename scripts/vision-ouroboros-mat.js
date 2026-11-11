// THE OUROBOROS (vision being BEINGS[4]): a striped serpent in a perfect ring biting its own tail, round a little
// cosmos of its own: inside the ring a night where a sun and a moon orbit (the day half follows the sun), outside it
// a sea of fish-scale rows shrinking toward the rim, eggs along the bottom that crack and let out hatchlings.
// ONE SCENE, FIVE LAYERS at five depths, one script (params.layer, baked), each on its OWN motion:
//   "world" z -30  SCROLLS   the scale sea flows outward to the rim in waves; sun and moon orbit inside; eggs hatch.
//                            Opaque black: it grows from the centre outward as a scalloped scale-edge front.
//   "ring"  z -12  TURNS     two line rings + bead ring one way, a ring of ticks the other (soft, additive)
//   "being" z   0  BREATHES  the serpent drawn by a pen from the tail, scales lighting behind it, the head, the eye,
//                            a ring of dewdrops; stripes crawl one way while the scales run the other
//   "veil"  z +10  FALLS     venom drops, solid black with neon rims, dropping in and hanging, a dithered shadow under each
//   "fore"  z +22  UNDULATES shed scales riding a swell across the corners
//   the grown hatchlings are real 3D bodies winding in depth: scripts/vision-ouroboros-worm-geo.js / -worm-mat.js
// being / veil / fore / world are CUTOUT (alphaTest, depth-writing): a near shape hides what is behind it.
// THE SCORE (u of the slot): 0 a seed dot, the first stroke out from the centre / .04-.28 the pen draws the body,
//   scales light behind it, head / .25 world grows out as scale-edges / .28 sun, moon, terminator / .34 the eye opens /
//   .4 ring, .45 its beads, .52 counter ticks / .5 stars of the night half, eggs, dewdrops / .6 worms grow, eggs crack /
//   .66 drops fall, shed scales drift, hatchlings slither / .74 worms change skin / .86 THE BITE: jaws close on the tail
//   and the serpent spins while its stripes (or, by seed, its scales) stand still in place: it turns and does not;
//   one worm goes dark / .93.. leaves last-in first-out: fore, veil, worms, ring, world, then it swallows itself.
// Seed channels 280..299: 0 hue family, 1 mirror, 2 scale count, 3 stripe variant, 4 head top/bottom, 5 crawl sense,
//   6 ring speed, 7 drop size, 8 worm count, 9 worm second skin, 10 dark worm, 11 illusion variant (stripes or scales
//   stand), 12 orbit sense, 13 egg count, 14 star counts, 15 scale-sea flow, 16 shed-scale shape, 17 terminator tilt,
//   18 worm sweep (from below / above), 19 hot accent.
import { MeshBasicNodeMaterial, AdditiveBlending, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, mix, atan2, fwidth, select } from "builtin/tsl";
import { tripClock, visionShown, visionU, climb, maskDraw, maskBeads, maskIris, nib, stripes } from "./lib/trip.js";

const TAU = 6.28318;
const DEPTH = { world: 104, ring: 86, being: 74, veil: 64, fore: 52 };
const S = 1.45;                                                          // body metres -> apparent metres
const R = 13, CIRC = TAU * R, WB = 1.7;
const NECK = -0.10 * CIRC, HINGE = -0.035 * CIRC, SNOUT = 0.035 * CIRC;
const ST = -0.02, SPAN = 0.92;
const is = (v, i) => step(v.sub(i).abs(), 0.5);
const inv = (x) => float(1).sub(x);
const sign = (r) => step(0.5, r).mul(2).sub(1);

export function material(ctx) {
  const layer = ctx.params.layer ?? "being";
  const c = tripClock(ctx);
  const u = visionU(ctx, c);
  const io = (a, b, x, y) => smoothstep(a, b, u).mul(inv(smoothstep(x, y, u)));
  const rn = (n) => c.rnd(280 + n), pk = (n, k) => c.pick(280 + n, k);
  const sense = (n) => sign(rn(n));
  const fam = pk(0, 3), hot = pk(19, 3);
  const blue = vec3(0.05, 0.12, 1.0), violet = vec3(0.45, 0.05, 1.0), pink = vec3(1.0, 0.05, 0.6), orange = vec3(1.0, 0.38, 0.02),
    yellow = vec3(1.0, 0.85, 0.05), green = vec3(0.1, 1.0, 0.15), W = vec3(1, 1, 1), K = vec3(0, 0, 0);
  const A = blue.mul(is(fam, 0)).add(violet.mul(is(fam, 1))).add(blue.mul(is(fam, 2)));      // lines, head
  const B = pink.mul(is(fam, 0)).add(green.mul(is(fam, 1))).add(orange.mul(is(fam, 2)));     // scales
  const C = yellow.mul(is(fam, 0)).add(orange.mul(is(fam, 1))).add(yellow.mul(is(fam, 2)));  // sun, pupils
  const H = pink.mul(is(hot, 0)).add(yellow.mul(is(hot, 1))).add(green.mul(is(hot, 2)));
  const D = DEPTH[layer] ?? 74;
  const q = positionGeometry.xy.mul(74 / D);                             // apparent metres at the being's depth
  const live = visionShown(ctx, c, 0);
  const kickOn = step(0.001, c.kick);
  const cul = io(0.85, 0.89, 0.93, 0.96).mul(climb(c).mul(0.4).add(0.6));
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  m.fog = false;

  // ------------------------------------------------------------------ WORLD: the little cosmos (scrolls outward)
  if (layer === "world") {
    const aa = fwidth(q.x).mul(1.2).max(0.02);
    const stroke = (d, w) => inv(smoothstep(float(w), aa.add(w), d));
    const rr = q.length(), ang = atan2(q.y, q.x);
    const grow = io(0.25, 0.45, 0.955, 0.985), Rg = grow.mul(118);
    const sf = ang.div(TAU).mul(28).fract().sub(0.5).mul(2);
    const scallop = inv(sf.mul(sf)).max(0).sqrt().mul(5);                 // the front is a row of scale edges
    const cover = step(rr, Rg.sub(5).add(scallop)).mul(step(0.004, grow));
    const front = c.beat.fract().mul(110);
    const kl = smoothstep(5, 0, rr.sub(front).abs()).mul(kickOn).mul(smoothstep(110, 40, front));
    let col = vec3(0);
    // -- outside the ring: rows of fish scales, smaller toward the rim, flowing outward, a wave crest travelling out
    const KR = 16, RL = 122;
    const w = inv(rr.div(RL).min(0.995)).log().negate();
    const flow = c.real.mul(0.3).mul(mix(0.6, 1.3, rn(15)));
    const rowf = w.mul(KR).sub(flow), row = rowf.floor(), fy = rowf.fract();
    const want = rr.mul(TAU * KR).div(float(RL).sub(rr).max(1)).div(24).max(1);
    const N = want.log2().floor().exp2().mul(24);
    const fx = ang.div(TAU).mul(N).add(row.mod(2).mul(0.5)).fract().sub(0.5);
    const ds = vec2(fx.mul(2), fy).length().sub(1);
    const scl = inv(smoothstep(0.05, fwidth(ds).mul(1.5).add(0.05), ds.abs()));
    const bd = vec2(fx.mul(2), fy.sub(0.45)).length();
    const bead = inv(smoothstep(0.17, fwidth(bd).add(0.17), bd)).mul(step(row.mod(3), 0.5));
    const crest = smoothstep(0.75, 1, w.mul(KR * 0.22).sub(c.real.mul(1.4)).sin());
    const outside = smoothstep(22, 24, rr);
    const pIn = io(0.27, 0.33, 0.955, 0.97);                              // the inner sky
    const pst = io(0.5, 0.58, 0.94, 0.955), peg = io(0.5, 0.58, 0.94, 0.955), pck = io(0.6, 0.66, 0.94, 0.955), pht = io(0.65, 0.78, 0.935, 0.95);
    // -- the eggs along the bottom: nearest egg only (no loop), from the centre outward
    const nE = pk(13, 3).mul(2).add(5), half = nE.sub(1).mul(0.5);
    const idx = q.x.div(15).round().clamp(half.negate(), half);
    const ke = idx.abs().div(half.max(0.5));
    const e = q.sub(vec2(idx.mul(15), -37));
    const exs = float(2.6).mul(inv(e.y.div(3.4).mul(0.14)));
    const de = vec2(e.x.div(exs), e.y.div(3.4)).length().sub(1).mul(3);
    const inEgg = step(de, 0);
    const pe = peg.mul(1.6).sub(ke.mul(0.6)).clamp(0, 1);
    const eu = atan2(e.x, e.y.negate()).div(TAU).add(0.5);
    const zig = e.x.mul(0.9).fract().sub(0.5).abs().mul(1.8).sub(0.45);
    const lid = e.y.sub(0.4).sub(zig);
    const pc = pck.mul(1.6).sub(ke.mul(0.6)).clamp(0, 1), ph = pht.mul(1.5).sub(ke.mul(0.5)).clamp(0, 1);
    const open = step(0.02, ph).mul(step(0, lid));                         // the shell's cap gone once it hatches
    const shell = stroke(de.abs(), 0.12).mul(maskDraw(pe, eu)).mul(inv(open));
    const band = stripes(e.y, 0.9, 0.06).mul(inEgg).mul(step(0.99, pe)).mul(inv(open)).mul(0.35);
    const crack = stroke(lid.abs(), 0.1).mul(inEgg).mul(maskDraw(pc, e.x.div(5.2).add(0.5))).mul(step(0.002, pc));
    // the hatchling, slithering up out of the shell
    const L = ph.mul(12), s = e.y.sub(0.4).div(L.max(0.01)).clamp(0, 1);
    const xc = s.mul(TAU * 1.4).sub(c.real.mul(5)).add(idx.mul(1.7)).sin().mul(s.mul(1.4).add(0.3));
    const hb = step(e.x.sub(xc).abs(), inv(s.mul(0.4)).mul(0.55)).mul(step(0.4, e.y)).mul(step(e.y, L.add(0.4))).mul(step(0.02, ph));
    const hh = inv(smoothstep(0.75, 0.75 + 0.1, vec2(e.x.sub(xc.mul(step(0.99, s)).add(inv(step(0.99, s)).mul(s.mul(TAU * 1.4).sub(c.real.mul(5)).add(idx.mul(1.7)).sin().mul(1.7)))), e.y.sub(L).sub(0.4)).length())).mul(step(0.02, ph));
    const eggZone = inEgg.max(hb).max(hh);
    col = col.add(mix(A, W, crest.mul(0.4)).mul(scl).mul(float(0.16).add(crest.mul(0.45)).add(kl.mul(0.6))).mul(outside).mul(inv(eggZone)));
    col = col.add(mix(B, C, row.mod(2)).mul(bead).mul(float(0.25).add(crest.mul(0.6)).add(kl.mul(0.5))).mul(outside).mul(inv(eggZone)));
    col = col.add(B.mul(shell).mul(0.9)).add(W.mul(band)).add(W.mul(crack).mul(1.2));
    col = mix(col, mix(B, W, stripes(s.mul(L), 1.2, 0.05).mul(0.6)).mul(0.9), hb.max(hh));
    // -- inside the ring: day half and night half, the sun and the moon on one orbit
    const Ri = 16.2, inside = inv(smoothstep(Ri - 0.3, Ri, rr));
    const orb = c.real.mul(TAU / 19).mul(sense(12)).add(rn(17).mul(TAU));
    const sd = vec2(orb.cos(), orb.sin()), sunP = sd.mul(9.6), moonP = sd.mul(-9.6);
    const dayS = step(0, q.dot(sd));
    const tm = q.dot(vec2(sd.y.negate(), sd.x));
    const term = stroke(q.dot(sd).abs(), 0.07).mul(step(tm.div(1.4).fract(), 0.55)).mul(maskDraw(io(0.3, 0.36, 0.955, 0.97), tm.div(Ri).abs()));
    const rays = stroke(ang.div(TAU).mul(48).fract().sub(0.5).abs().mul(rr.mul(TAU / 48)), 0.04).mul(smoothstep(4, 8, rr)).mul(dayS).mul(0.22).mul(maskIris(pIn, rr.div(Ri)));
    const dS = q.sub(sunP).length(), aS = atan2(q.y.sub(sunP.y), q.x.sub(sunP.x));
    const sunDisc = inv(smoothstep(float(2.3).sub(aa), 2.3, dS)).mul(maskIris(pIn.mul(1.3), dS.div(2.3)));
    const tri = aS.div(TAU).mul(12).add(c.real.mul(0.08)).fract().sub(0.5).abs().mul(2);
    const sunRay = step(dS, inv(tri).mul(1.4).add(2.9)).mul(step(2.8, dS)).mul(step(0.75, pIn));
    const dM = q.sub(moonP).length();
    const moon = inv(smoothstep(float(2.0).sub(aa), 2.0, dM)).mul(smoothstep(1.85, float(1.85).add(aa), q.sub(moonP).add(sd.mul(0.95)).length()))
      .mul(maskIris(pIn.mul(1.3).sub(0.3), dM.div(2)));
    // stars of the night half: placed on three rings, fixed in the sky; the night sweeps over them
    const sc = pk(14, 3).mul(2).add(5);
    let stars = float(0);
    [[5.2, 0], [10.4, 1], [14.0, 2]].forEach(([rad, j]) => {
      const n = sc.add(j * 2), a = ang.div(TAU).mul(n).add(j * 0.37), cellA = a.fract().sub(0.5).mul(TAU * rad).div(n);
      const d4 = vec2(cellA, rr.sub(rad)).abs(), sz = float(0.55 + j * 0.15).mul(c.real.mul(2.3).add(a.floor().mul(1.7)).sin().mul(0.25).add(1));
      const s4 = d4.x.div(sz).sqrt().add(d4.y.div(sz).sqrt());
      stars = stars.max(inv(smoothstep(0.9, 1, s4)).mul(maskBeads(pst.mul(1.4).sub(j * 0.2), a.floor().div(n).add(j * 0.1).fract())));
    });
    stars = stars.mul(inv(dayS));
    let sky = A.mul(rays).add(W.mul(term).mul(0.6)).add(mix(W, B, 0.3).mul(stars).mul(float(0.9).add(kl)));
    sky = mix(sky, C.mul(1.2).add(W.mul(cul.mul(0.3))), sunDisc.max(sunRay));
    sky = mix(sky, mix(A, W, 0.75), moon);
    col = col.add(sky.mul(inside).mul(inv(outside)));
    m.colorNode = col;
    m.opacityNode = cover.mul(live);
    m.alphaTest = 0.5;
    return m;
  }

  // ------------------------------------------------------------------ RING: the turning circle (soft, additive)
  if (layer === "ring") {
    const aa = fwidth(q.x).mul(1.2).max(0.02), blur = aa.mul(3);
    const stroke = (d, w) => inv(smoothstep(float(w), blur.add(w), d));
    const rr = q.length(), ang = atan2(q.y, q.x).div(TAU);
    const k = atan2(q.x, q.y).div(TAU).abs().mul(2);                      // 0 at the top, both ways round to the bottom
    const rot = c.real.div(mix(34, 60, rn(6))).mul(sense(5).negate());
    const l1 = stroke(rr.sub(24).abs(), 0.06).mul(maskDraw(io(0.4, 0.48, 0.955, 0.975), k));
    const dash = step(ang.sub(rot.mul(0.4)).mul(40).fract(), 0.6);
    const l2 = stroke(rr.sub(26.6).abs(), 0.06).mul(dash).mul(maskDraw(io(0.43, 0.51, 0.95, 0.97), inv(k)));
    const nb = pk(2, 2).mul(4).add(12);
    const an = ang.add(rot).fract().mul(nb);
    const loc = an.fract().sub(0.5).mul(TAU * 25.3).div(nb);
    const db = vec2(loc, rr.sub(25.3)).length();
    const odd = an.floor().mod(2);
    const bead = inv(smoothstep(float(0.55).sub(blur), 0.55, db)).mul(maskBeads(io(0.45, 0.55, 0.945, 0.965), an.floor().div(nb)));
    // counter ticks: their own slow clock, the other way
    const at = ang.sub(rot.mul(0.55)).fract().mul(48), ti = at.floor();
    const tl = mix(float(1.0), float(2.2), step(ti.mod(4), 0.5));
    const tick = stroke(at.fract().sub(0.5).abs().mul(TAU * 30).div(48), 0.07).mul(step(rr, float(29.6).add(tl))).mul(step(29.6, rr))
      .mul(maskBeads(io(0.52, 0.62, 0.94, 0.96), ti.div(48)));
    const front = c.beat.fract().mul(40);
    const kl = smoothstep(2.5, 0, rr.sub(front).abs()).mul(kickOn).mul(smoothstep(40, 20, front));
    const lit = float(0.45).add(cul.mul(0.5)).add(kl.mul(0.8));
    m.colorNode = A.mul(l1.add(l2).mul(lit)).add(mix(B, W, odd).mul(bead).mul(lit.add(0.2))).add(mix(A, W, 0.4).mul(tick).mul(lit.mul(0.8)));
    m.opacityNode = live;
    m.transparent = true;
    m.blending = AdditiveBlending;
    m.depthWrite = false;
    return m;
  }

  // ------------------------------------------------------------------ VEIL: venom drops falling in (opaque, shadowed)
  if (layer === "veil") {
    const aa = fwidth(q.x).mul(1.2).max(0.02);
    const pv = io(0.66, 0.84, 0.93, 0.95);
    const sz = mix(0.85, 1.25, rn(7)), arr = pk(7, 2);
    const XS = [-44, -28, 0, 28, 44], YS = [24, 13, -1.0, 13, 24], RS = [2.6, 2.1, 1.3, 2.1, 2.6];
    const pxl = q.x.div(aa).floor().add(q.y.div(aa).floor()).mod(2);       // 2x2 ordered dither at half: the shadow
    let col = vec3(0), cover = float(0), shade = float(0);
    for (let j = 0; j < 5; j++) {
      const centre = j === 2;
      const pj = pv.mul(1.7).sub(Math.abs(j - 2) * 0.3 + (centre ? 0.5 : 0)).clamp(0, 1);
      const e = pj.mul(pj).mul(float(3).sub(pj.mul(2)));
      const r = float(RS[j]).mul(sz).mul(centre ? e : 1).max(0.01);
      const y0 = centre ? float(YS[j]) : float(YS[j]).add(arr.mul(j % 2 ? -6 : 4)).add(inv(e).mul(70));
      const ph = c.real.mul(0.21 + j * 0.057).add(j * 1.9);
      const dropAt = (ox, oy) => {
        const dx = q.x.sub(float(XS[j]).add(centre ? 0 : ph.sin().mul(1.2))).sub(ox), dy = q.y.sub(y0.add(ph.mul(0.7).cos().mul(0.6))).sub(oy);
        const t = dy.div(r.mul(2.6)).clamp(0, 1);
        const hw = r.mul(inv(t)).mul(t.mul(2.2).add(1).sqrt());
        return select(dy.lessThan(0), vec2(dx, dy).length().sub(r), dx.abs().sub(hw).max(dy.sub(r.mul(2.6))));
      };
      const d = dropAt(0, 0), dsh = dropAt(1.4, -2.0);
      const on = step(0.001, pj);
      const body = step(d, 0).mul(on);
      const rim = body.mul(step(float(-0.28), d));
      const core = body.mul(inv(smoothstep(r.mul(0.38).sub(aa), r.mul(0.38), vec2(q.x.sub(float(XS[j])), d.add(r.mul(0.62))).length().mul(0).add(d.add(r.mul(0.62)).abs()))));
      const glint = body.mul(step(d, r.mul(-0.55))).mul(step(0.5, stripes(d, 1.3, 0.1)));
      const lit = float(0.85).add(cul.mul(0.4)).add(kickOn.mul(c.kick).mul(0.4));
      col = mix(col, mix(K, mix(B, W, 0.2).mul(lit), rim.max(glint.mul(0.6)).max(core.mul(0))), body);
      cover = cover.max(body);
      shade = shade.max(step(dsh, 0).mul(on).mul(pxl));
    }
    m.colorNode = col;
    m.opacityNode = cover.max(shade).mul(live);
    m.alphaTest = 0.5;
    return m;
  }

  // ------------------------------------------------------------------ FORE: shed scales riding a swell (undulates)
  if (layer === "fore") {
    const aa = fwidth(q.x).mul(1.2).max(0.02);
    const ax = q.x.abs(), pin = io(0.64, 0.8, 0.93, 0.945), shape = pk(16, 2);
    let col = vec3(0), cover = float(0);
    for (let j = 0; j < 6; j++) {
      const top = j % 2 ? 1 : -1;
      const xj = c.real.mul(0.018 * (1 + j * 0.27)).mul(sense(15)).add(j * 0.19).fract().mul(36).add(46);
      const yj = xj.mul(0.12).sub(c.real.mul(0.6)).add(j * 2.3).sin().mul(3.5).add(top * (30 + (j % 3) * 4));
      const rad = 1.6 + (j % 3) * 0.5;
      const pj = pin.mul(1.6).sub(j * 0.1).clamp(0, 1);
      const rot = c.real.mul(0.4 + j * 0.1).add(j);
      const lx = ax.sub(xj), ly = q.y.sub(yj);
      const rx = lx.mul(rot.cos()).sub(ly.mul(rot.sin())).div(rad), ry = lx.mul(rot.sin()).add(ly.mul(rot.cos())).div(rad);
      const dia = rx.abs().add(ry.abs().mul(0.7)).sub(1);                   // a diamond scale
      const shard = vec2(rx, ry).length().sub(1).max(float(0.55).sub(vec2(rx, ry.sub(0.55)).length())); // or a shell crescent
      const d = mix(dia, shard, shape).mul(rad);
      const sc = inv(smoothstep(pj.mul(1.0).sub(1).mul(rad), pj.mul(1.0).sub(1).mul(rad).add(aa), d.sub(pj.mul(0)))).mul(step(0.01, pj));
      const body = step(d, 0).mul(step(0.01, pj)).mul(step(vec2(rx, ry).length(), pj.mul(1.6)));
      const rim = body.mul(step(float(-0.22), d));
      const bead = body.mul(step(vec2(rx, ry).length(), 0.24));
      col = mix(col, mix(K, mix(A, W, 0.35).mul(float(0.85).add(cul.mul(0.3))), rim).add(H.mul(bead)), body);
      cover = cover.max(body.max(sc.mul(0)));
    }
    m.colorNode = col;
    m.opacityNode = cover.mul(live);
    m.alphaTest = 0.5;
    return m;
  }

  // ------------------------------------------------------------------ THE BEING (breathes)
  let col = vec3(0), cover = float(0);
  const put = (colour, mask) => { col = mix(col, colour, mask); cover = cover.max(mask); };
  const breath = c.real.mul(TAU / 8).sin().mul(0.015).add(1);
  const p = q.div(breath.mul(S));
  const aa = fwidth(p.x).mul(1.2).max(0.01);
  const mx = sign(rn(1)), fy = sign(rn(4));
  const rr = p.length();
  const front = c.beat.fract().mul(30);
  const kl = smoothstep(2.2, 0, rr.sub(front).abs()).mul(kickOn).mul(smoothstep(30, 14, front));
  // THE BITE and the spin: from u .86 the serpent turns (spin, turns of the circle), its stripes (variant 0) or
  // its scales (variant 1) held where they stand on the screen
  const slot = ctx.param("vw1", -1).sub(ctx.param("vw0", -1)).max(1);
  const xl = u.sub(0.84).div(0.04).clamp(0, 1);
  const spin = xl.mul(xl).mul(0.02).add(u.sub(0.88).max(0)).mul(slot).mul(0.55 / TAU).mul(sense(11).mul(sense(5)));
  const vb = pk(11, 2), vs = inv(vb);
  const shS = atan2(p.x.mul(mx), p.y.mul(fy)).div(TAU);
  const sh = shS.sub(spin).add(0.5).fract().sub(0.5);                     // the body's own angle, 0 at the head's side
  const a = sh.mul(CIRC), n = rr.sub(R), an = n.abs();
  const E = smoothstep(0.965, 0.995, u);                                  // the swallow
  const P = u.sub(0.04).div(0.24).clamp(0, 1).mul(1.16);                  // the pen: body 0..1, head 1..1.15
  const drawing = step(P, 1.155);
  const cs = sense(5);
  // the seed and the first stroke, out from the centre to the tail's tip
  const pf = io(0.004, 0.05, 0.29, 0.34);
  const dir = vec2(Math.sin(TAU * ST), Math.cos(TAU * ST)).mul(vec2(mx, fy));
  const tl = p.dot(dir).clamp(0, R), dl = p.sub(dir.mul(tl)).length();
  put(W.mul(1.3), inv(smoothstep(0.09, float(0.09).add(aa), dl)).mul(maskDraw(pf, tl.div(R))).mul(step(0.001, pf)));
  put(W.mul(1.5), inv(smoothstep(float(0.45).sub(aa), 0.45, rr)).mul(io(0.0, 0.01, 0.3, 0.33)));
  // the head: skull + two jaws hinged at HINGE, open until the bite at u .86
  const open = inv(smoothstep(0.85, 0.87, u)).mul(0.62);
  const vx = a.sub(HINGE), co = open.cos(), si = open.sin();
  const jaw = step(0, vx);
  const a1 = select(vx.greaterThan(0), vx.mul(co).add(an.mul(si)).add(HINGE), a);
  const n1 = select(vx.greaterThan(0), an.mul(co).sub(vx.mul(si)), an);
  const capT = a1.sub(SNOUT - 1.1).div(1.1).clamp(0, 1);
  const hw = mix(float(WB), float(2.5), smoothstep(NECK, -4.6, a1)).mul(mix(float(1), float(0.5), smoothstep(-3.2, SNOUT, a1)))
    .mul(inv(capT.mul(capT)).max(0).sqrt());
  const g = n1.sub(a1.sub(HINGE).max(0).mul(0.12));
  const inA = step(NECK, a).mul(step(a1, SNOUT)).mul(step(a, SNOUT + 6));
  const solid = smoothstep(0, aa, g).mul(inv(smoothstep(hw.sub(aa), hw, n1))).mul(inA);
  const rim = solid.mul(smoothstep(hw.sub(0.2), hw.sub(0.2).sub(aa), n1).oneMinus());
  const tri = a1.mul(0.95).add(step(0, n).mul(0.5)).fract().sub(0.5).abs().mul(2);
  const teeth = step(g, 0).mul(smoothstep(0, aa, g.add(tri.mul(0.62)))).mul(step(HINGE + 0.9, a1)).mul(step(a1, SNOUT - 0.3)).mul(jaw).mul(inA);
  const headK = a.sub(NECK).div(SNOUT - NECK).clamp(0, 1);
  const headVis = maskDraw(P, headK.mul(0.15).add(1)).mul(step(E.sub(0.8).div(0.2), headK));
  const hlit = float(0.8).add(cul.mul(0.35)).add(kl.mul(0.4));
  // head scales: a diamond lattice on the skull
  const hd = stripes(a1.mul(0.8).add(n1.mul(0.8)), 1, 0.08).mul(stripes(a1.mul(0.8).sub(n1.mul(0.8)), 1, 0.08));
  put(mix(A, A.mul(0.35), hd).mul(hlit), solid.mul(headVis));
  put(W.mul(hlit.add(0.1)), rim.mul(headVis));
  put(W.mul(hlit.add(0.2)), teeth.mul(headVis));
  const ed = vec2(a.add(4.9), n.sub(0.95)).length();
  const eyeP = smoothstep(0.32, 0.36, u).mul(step(E, 0.8));
  const disc = (rad) => inv(smoothstep(float(rad).sub(aa), rad, ed));
  put(W.mul(1.1), disc(0.95).mul(maskIris(eyeP, ed.div(0.95))));
  put(K, disc(0.66).mul(maskIris(eyeP, ed.div(0.95))));
  put(mix(C, W, cul.mul(0.6)).mul(1.2), disc(0.34).mul(maskIris(eyeP, ed.div(0.95))));

  // the body, tail tip (k 0, in the mouth) round to the neck (k 1)
  const sb = sh.sub(ST).fract(), k = sb.div(SPAN);
  const inBody = step(k, 1);
  const wb = smoothstep(0, 0.3, k).sqrt().mul(WB).max(0.03);
  const bodyVis = inBody.mul(maskDraw(P, k)).mul(step(E.mul(1.25), k));
  const bodyM = inv(smoothstep(wb.add(0.07), wb.add(0.07).add(aa), an)).mul(bodyVis);
  const sv = pk(3, 3);
  const ph = sh.add(spin.mul(vs)).mul(59).add(c.real.mul(0.5).mul(cs))
    .add(an.div(wb).mul(0.9).mul(is(sv, 1))).add(step(an, wb.mul(0.5)).mul(0.5).mul(is(sv, 2)));
  const comet = smoothstep(0.07, 0, k.sub(c.real.div(6).mul(cs).fract()).abs()).mul(step(0.5, u));
  const blit = float(0.72).add(cul.mul(0.3)).add(kl.mul(0.45)).add(comet.mul(0.5));
  put(W.mul(stripes(ph, 1, 0.05)).mul(blit), bodyM);
  put(mix(A, W, comet.add(cul.mul(0.4)).min(1)).mul(blit.add(0.2)), bodyM.mul(smoothstep(wb.sub(0.1).sub(aa), wb.sub(0.1), an)));
  // one row of scale-beads on black discs, running against the stripes
  const Mf = pk(2, 3).mul(8).add(30);
  const run = c.real.mul(0.4).mul(cs.negate());
  const aS = sh.add(spin.mul(vb));
  const cells = aS.mul(Mf).add(run), ci = cells.floor();
  const kc = ci.add(0.5).sub(run).div(Mf).sub(spin.mul(vb)).sub(ST).fract().div(SPAN);
  const al = cells.fract().sub(0.5).mul(CIRC).div(Mf).mul(rr.div(R));
  const bd = vec2(al, n).length();
  const rb = wb.mul(0.42).min(float(CIRC).div(Mf).mul(0.36));
  const beadOn = maskBeads(P.sub(0.08), kc).mul(step(0.04, kc)).mul(step(kc, 0.985)).mul(bodyVis);
  put(K, inv(smoothstep(rb.add(0.22).sub(aa), rb.add(0.22), bd)).mul(beadOn));
  put(mix(mix(B, C, ci.mod(2)), W, comet.mul(0.7)).mul(float(0.95).add(cul.mul(0.35)).add(kl.mul(0.4))), inv(smoothstep(rb.sub(aa), rb, bd)).mul(beadOn));
  // the dewdrop ring just inside the body: placed one by one round from the head, riding with the serpent
  const ndw = 36, dw = sh.add(0.5).mul(ndw), dr = R - WB - 1.0;
  const dd = vec2(dw.fract().sub(0.5).mul(TAU * dr / ndw), rr.sub(dr)).length();
  const dewP = io(0.52, 0.6, 0.95, 0.965);
  const dew = inv(smoothstep(float(0.24).sub(aa), 0.24, dd)).mul(maskBeads(dewP, dw.floor().div(ndw)));
  put(mix(W, B, dw.floor().mod(3).mul(0.5).min(1).mul(0.6)).mul(float(0.8).add(kl.mul(0.5))), dew);
  // the pen's nib
  const nb = nib(P, k, 0.012).mul(inBody).add(nib(P, headK.mul(0.15).add(1), 0.012).mul(step(NECK, a)).mul(step(a, SNOUT)))
    .min(1).mul(inv(smoothstep(2.4, 3.0, an))).mul(drawing).mul(step(0.002, P));
  put(W.mul(1.6), step(0.5, nb));

  m.colorNode = col;
  m.opacityNode = cover.mul(visionShown(ctx, c, rr.div(30)));
  m.alphaTest = 0.5;
  return m;
}
