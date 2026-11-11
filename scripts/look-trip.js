// THE TRIP'S LOOK: the full-screen layer. Every move is on the score (scripts/lib/data/score.yml), gated by on.
// Idle (on = 0): only aberration, vignette, bloom. Deck of tropes dealt by the roll's seed on channels 70-79.
import { float, vec2, vec3, vec4, mix, smoothstep, select, screenUV, screenSize, convertToTexture, mx_noise_float, atan, step } from "builtin/tsl";
import { vignette, dof } from "builtin/postfx";
import { tripClock, win, SEC, SCORE, pal, bendUv } from "./lib/trip.js";

const TAU = 6.283185;
const luma = (v) => v.dot(vec3(0.2126, 0.7152, 0.0722));
const rot2 = (p, a) => vec2(p.x.mul(a.cos()).sub(p.y.mul(a.sin())), p.x.mul(a.sin()).add(p.y.mul(a.cos())));
const hueRot = (v, a) => {
  const k = vec3(0.57735), ca = a.cos(), sa = a.sin();
  return v.mul(ca).add(k.cross(v).mul(sa)).add(k.mul(k.dot(v)).mul(float(1).sub(ca))).max(vec3(0));
};
const wrap = (u) => { const m = u.sub(u.mul(0.5).floor().mul(2)); return vec2(1).sub(m.sub(1).abs()); }; // mirror-repeat into 0..1
const on1 = (f) => select(f, float(1), float(0));

export function look(ctx) {
  const q = ctx.device?.quality ?? "high";
  const hi = q === "high" || q === "ultra", low = q === "low";
  const c = tripClock(ctx);
  // a celestial vision plays straight: no lens, no treatment, while the track is inside its slot (v0/v1, the director's)
  const v0 = ctx.param("v0", -1), v1 = ctx.param("v1", -1);
  // eased over 3 s each side (lanmower 2026-11-11: no hard cuts): the bend and the focus hand over to the being slowly
  // held through the being's whole exit (it leaves piece by piece up to v1): the kick's far-side blackout and the lens only
  // come back once it is gone, so they never eat its world in one frame on the drop. Edges low→high (reversed is undefined on GPUs).
  const vis = smoothstep(v0, v0.add(3), c.real).mul(float(1).sub(smoothstep(v1, v1.add(1.5), c.real))).mul(step(0, v0));
  const on = c.on.clamp(0, 1);
  // THE BEAT'S JOB, dealt every four bars by the roll: 0 a centre push (the old habit, now one in four),
  // 1 the far layers drop to black behind the subject, 2 the near layers go silhouette in front of it, 3 rest.
  const beatJob = c.bar.div(4).floor().add(c.seed.mul(0.37)).mul(91.7).sin().mul(43758.5453).fract().mul(4).floor();
  const job = (n) => on1(beatJob.sub(n).abs().lessThan(0.5));
  const onLens = on.mul(float(1).sub(vis.mul(0.8))); // the being stands in the scene: the bend eases off it, the scene's treatment stays
  const sec = c.sec;
  const aspect = screenSize.x.div(screenSize.y);
  const asp = vec2(aspect, 1);
  const src = convertToTexture(ctx.scene);
  const px = vec2(1).div(screenSize);
  const S = (u) => src.sample(wrap(u)).rgb;
  // deck: P(n, k, salt) an integer 0..k-1 fixed for the roll
  const P = (n, k, s = 0) => c.rnd(n).mul(s * 7.13 + 1).fract().mul(k).floor().min(k - 1);
  const is = (n, k, v, s = 0) => on1(P(n, k, s).sub(v).abs().lessThan(0.5));
  const fam = P(70, 4, 1).mul(0.06).add(c.hue.mul(0.25)).add(0.6); // line/dust hue family: blue..violet base, roll-shifted
  const sym = select(c.pick(8, 3).lessThan(0.5), float(6), select(c.pick(8, 3).lessThan(1.5), float(8), float(12))); // symmetry-order
  const speed = (n) => mix(0.7, 1.3, c.rnd(n)).mul(c.dir);

  // screen position, height units, centre 0
  const p0 = screenUV.sub(0.5).mul(asp);
  const r0 = p0.length(), ang0 = atan(p0.x, p0.y); // angle from +y, mirror-symmetric in x
  // soft-mask-reveal: section treatments switch through a growing soft shape (circle / diamond / hex by seed)
  const mk = P(74, 3);
  const shape = select(mk.lessThan(0.5), r0.div(0.95), select(mk.lessThan(1.5), p0.x.abs().add(p0.y.abs()).div(1.25),
    p0.x.abs().mul(0.866).add(p0.y.abs().mul(0.5)).max(p0.y.abs()).div(0.95))).clamp(0, 0.95);
  const raw = (name, fade = 3) => win(sec, SEC[name], fade).mul(on);
  // a section's treatment is that scene's own: on with its cut, off with its cut. No shape-wipe, no cross-fade.
  const W = (name) => raw(name, 0.04);
  const wSeed = W("seed"), wPulse = W("pulse"), wBloom = W("bloom"), wDeep = W("deep"), wFlight = W("flight"),
    wHex = W("hex", 2), wReset = W("reset", 2), wAsc = W("ascent"), wPeak = W("peak"), wRet = W("return");

  // deck flags
  const echoOn = is(75, 2, 1);                       // kick-echo in pulse / bloom / ascent
  const bt = P(76, 3);                               // bloom's trope: godrays / dust / counter-breath
  const sliceOn = is(77, 2, 1);                      // slice-color in bloom, else in reset
  const seedGG = is(78, 2, 0);                       // seed: graphite-and-gold or star dust
  const domeOn = is(79, 2, 1);                       // fisheye-dome in flight
  const hexX = P(70, 3, 2);                          // hex: godrays / cell-lattice / sparkle
  const at = P(71, 3);                               // ascent: ripple / counter-breath / dust
  const retGG = is(73, 2, 0);                        // return: graphite-and-gold or blue mono
  const turbOn = float(1);                           // fluid-turbulence: always in deep (breakdown), hex by seed
  const hexTurb = is(79, 2, 1, 3);

  const wGod = wBloom.mul(on1(bt.lessThan(0.5))).add(wHex.mul(on1(hexX.lessThan(0.5)))).add(wPeak.mul(0.35)).clamp(0, 1);
  const wDust = wBloom.mul(on1(bt.sub(1).abs().lessThan(0.5))).mul(0.5).add(wSeed.mul(float(1).sub(seedGG))).clamp(0, 1); // dust: seed and (by seed) bloom only
  const wCB = wBloom.mul(on1(bt.greaterThan(1.5))).add(wAsc.mul(on1(at.sub(1).abs().lessThan(0.5)))).add(wPeak.mul(0.5)).clamp(0, 1);
  const wRip = wPulse.add(wAsc.mul(on1(at.lessThan(0.5)))).add(wPeak).add(wBloom.mul(0.6)).clamp(0, 1);
  const wLat = float(0); // hex only now: the flat ring grid read as noise over bloom/ascent/peak
  const wSpark = float(0); // sparkle crosses: hex only, faint
  const wSlice = wBloom.mul(sliceOn).add(wReset.mul(float(1).sub(sliceOn))).add(wPeak.mul(0.25)).clamp(0, 1);
  const wGG = wSeed.mul(seedGG).add(wRet.mul(retGG)).clamp(0, 1);
  const wTurb = wDeep.mul(turbOn).add(wHex.mul(hexTurb).mul(0.6)).add(wRet.mul(0.5)).clamp(0, 1);
  const wEcho = wPulse.add(wBloom).add(wAsc).mul(echoOn).clamp(0, 1);

  // light-sweep: a clock hand going round once per 24 s (slow), the lit window for dust, lattice and lines
  const hand = sec.mul(TAU / 24).mul(speed(72)).add(c.rnd(72).mul(TAU));
  const sweep = smoothstep(0.55, 1.0, ang0.abs().sub(hand).cos()) // two mirrored hands;
  const breath = sec.mul(TAU / 12).sin().mul(0.5).add(0.5);

  // ---- geometric warps of where the frame is read (height-unit space) ----
  let p = p0.mul(float(1).sub(breath.mul(0.02).mul(on)));                                 // breath (rule 8)
  p = p.mul(float(1).sub(c.kick.mul(0.015).mul(wPulse).mul(job(0))));                                  // pulse zoom-punch
  const bf = c.beat.fract(), ring = r0.sub(bf.mul(1.1)).div(0.035);                        // pulse-ripple: a refracting ring out per beat
  p = p.mul(float(1).sub(ring.mul(ring).negate().exp().mul(float(1).sub(bf)).mul(0.03).mul(wRip).mul(c.live)));
  p = p.mul(float(1).add(r0.mul(TAU * 6).sin().mul(breath.sub(0.5)).mul(0.024).mul(wCB)));  // counter-breath: neighbour rings antiphase
  const nz = vec3(p.mul(2.2), sec.mul(0.07));
  p = p.add(vec2(mx_noise_float(nz), mx_noise_float(nz.add(7.3))).mul(0.03).mul(wTurb));  // fluid-turbulence (one octave, breakdowns)
  // inversion-return: the frame through one circle, then shrunk back to its point
  const wInv = smoothstep(181, 186, sec).mul(wRet);
  const pinv = p.mul(float(0.09).div(p.dot(p).max(0.004)));
  // (retired: the inversion smear read as a stretch, not a handover; the return closes through its layers' own masks)
  void pinv;
  // flight: 2-fold mirror (left = right) folding in on the last 4 bars
  const wMir = smoothstep(78.35, 79.85, sec).mul(wFlight);
  // (retired: the end-of-flight mirror fold smeared the frame into a stretch)
  void wMir;
  // fisheye-dome in flight (by seed): wrapped on a sphere, black outside the dome
  const wDome = wFlight.mul(domeOn);
  // the bend carries out to the screen edge (capped short of the pole): no circle cut onto black
  const rd = p.length().div(0.5), th = rd.mul(0.62).min(1.35);
  // (retired: the dome's tan stretch pulled the edges like taffy)
  void th; void wDome;
  const domeMask = float(1);

  const uW = p.div(asp).add(0.5);
  const ub = mix(uW, bendUv(c, uW, aspect), onLens); // the bent camera (gated: idle stays straight)

  // kaleidoscope / tile / keyhole: a second read of the frame, mixed over the first
  const kal = (u, n, a0) => {
    const kp = u.sub(0.5).mul(asp), kr = kp.length(), ka = atan(kp.x, kp.y).sub(a0);
    const seg = float(TAU).div(n), m = ka.sub(ka.div(seg).floor().mul(seg)), f = m.min(seg.sub(m)).add(a0);
    return vec2(f.sin(), f.cos()).mul(kr).div(asp).add(0.5);
  };
  const ai = sec.sub(SEC.ascent[0]).div(6).floor().clamp(0, 3);
  const nA = select(ai.lessThan(0.5), float(2), select(ai.lessThan(1.5), float(4), select(ai.lessThan(2.5), float(6), sym)));
  const kRot = sec.mul(TAU / 48).mul(speed(73));
  const pi = sec.sub(SEC.peak[0]).div(12).floor().clamp(0, 3);
  const st = pi.sub(1).add(P(72, 4, 1)).mod(4); // peak phrases 2-4: 0 full kaleido, 1 clean mirror, 2 tile 3x3, 3 keyhole
  const first = on1(pi.lessThan(0.5));
  const nK = mix(mix(nA, mix(sym, float(8), first), wPeak), nA, wAsc).max(2);
  const uk0 = kal(ub, nK, kRot);
  const tq = ub.mul(3), tc = tq.floor(), tf = tq.fract();
  const tile = vec2(mix(tf.x, float(1).sub(tf.x), tc.x.mod(2)), mix(tf.y, float(1).sub(tf.y), tc.y.mod(2)));
  const isTile = on1(st.sub(2).abs().lessThan(0.5)).mul(float(1).sub(first)).mul(wPeak);
  const uk = mix(uk0, tile, isTile);
  // layer-keyhole: the kaleido shows only through a breathing dot grid over the clean view
  const kg = screenUV.mul(asp).mul(9).fract().sub(0.5).length();
  const holes = smoothstep(0.3, 0.27, kg.sub(breath.mul(0.06)));
  const pk = mix(float(0.6), select(st.lessThan(0.5), float(1), select(st.lessThan(1.5), float(0), select(st.lessThan(2.5), float(1), holes))), float(1).sub(first));
  // ascent: the mirror world opens as a petal window from the centre, one step every 6 s (its petal count is the
  // fold count it shows), each step easing in over a bar while the clean world keeps moving outside it.
  // Layered, not a full-frame swap: inside is reflection, outside is the world, the edge is the flower.
  const aq = sec.sub(SEC.ascent[0]).div(6), aStep = aq.floor().clamp(0, 3).add(smoothstep(0, 0.25, aq.fract()));
  const ap = ub.sub(0.5).mul(asp), apr = ap.length(), apa = atan(ap.x, ap.y);
  const petal = apa.mul(nA).add(kRot.mul(-2)).cos().mul(0.5).add(0.5).mul(0.07);
  const aR = aStep.mul(0.17).add(0.12).add(petal).add(breath.mul(0.015));
  const aWin = smoothstep(aR, aR.sub(0.03), apr);
  // peak's mirror modes change every 12 s phrase. A mode never swaps across the whole frame at once: it closes as an iris
  // into the centre over the phrase's last two bars, so the clean world is back by the change, and the next mode opens out
  // of the centre over the first two.
  const pfr = sec.sub(SEC.peak[0]).div(12).fract();
  const pOpen = smoothstep(0, 0.25, pfr).mul(smoothstep(1, 0.75, pfr));   // two bars each way
  const pR = pOpen.mul(1.15).add(petal.mul(pOpen));
  const pWin = smoothstep(pR, pR.sub(0.06), apr);
  const kmix = aWin.mul(0.95).mul(wAsc).add(pk.mul(pWin).mul(wPeak)).clamp(0, 1);

  // chromatic aberration: R and B pushed radially, growing toward the edge
  // a being on stage plays clean: no resting fringe on its line-art (the split only rides a real kick, off-vision)
  const ab = float(0.0008).add(c.kick.mul(0.006).mul(on).mul(job(0))).mul(float(1).sub(vis));
  const rgb = (u) => {
    if (low) return S(u); // low tier: one tap, no aberration split
    const d = u.sub(0.5).mul(ab.mul(2));
    return vec3(S(u.add(d)).x, S(u).y, S(u.sub(d)).z);
  };
  let col = mix(rgb(ub), rgb(uk), kmix);

  // ---- line-art (hex, reset): depth, normal and luminance edges, neon lines over black ----
  const wLine = wHex.add(wReset).clamp(0, 1);
  const dx = vec2(px.x, 0), dy = vec2(0, px.y);
  const L = (u) => luma(S(u));
  const l0 = luma(col);
  let edge = L(ub.add(dx)).sub(L(ub.sub(dx))).abs().add(L(ub.add(dy)).sub(L(ub.sub(dy))).abs()).mul(2.5);
  if (!low) {
    const z0 = ctx.viewZAt(ub).abs().max(0.1);
    const zd = ctx.viewZAt(ub.add(dx)).abs().sub(z0).abs().add(ctx.viewZAt(ub.add(dy)).abs().sub(z0).abs());
    edge = edge.max(smoothstep(0.03, 0.08, zd.div(z0)));
  }
  if (hi) {
    const n0 = ctx.normal(ub);
    edge = edge.max(smoothstep(0.2, 0.5, n0.sub(ctx.normal(ub.add(dx))).length().add(n0.sub(ctx.normal(ub.add(dy))).length())));
  }
  edge = smoothstep(0.12, 0.45, edge);
  // strokes draw on round the circle over the hex's first 2 bars; hue drifts along the screen angle, stepping on the bar
  const drawn = smoothstep(0, 0.04, sec.sub(SEC.hex[0]).div(3).sub(ang0.abs().div(Math.PI)).add(wReset));
  const lineHue = fam.add(ang0.abs().div(Math.PI).mul(0.22)).add(c.bar.floor().mul(0.031));
  const lineLit = mix(float(1), sweep.mul(0.75).add(0.25), wReset.mul(sliceOn));     // light-sweep on reset lines
  // each layer keeps its own colour in line-art (its own hue, normalised), so layers stay apart instead of one tint
  const own = S(ub), ownN = own.div(own.x.max(own.y).max(own.z).max(0.05));
  const lines = mix(pal(lineHue), ownN, wHex.mul(0.85)).mul(edge).mul(2.4).mul(drawn).mul(lineLit);
  const revR = sec.sub(SEC.reset[0]).div(12).mul(1.3);
  const back = smoothstep(revR.add(0.06), revR.sub(0.06), r0).mul(wReset);               // colour returns from the centre out
  col = mix(col, lines.max(col.mul(back)), wLine);

  // godrays: bright parts streaked toward the centre
  const GN = low ? 0 : hi ? 8 : 4;
  if (GN) {
    let g = vec3(0);
    for (let i = 1; i <= GN; i++) g = g.add(S(mix(ub, vec2(0.5), (i / GN) * 0.32)).sub(0.6).max(vec3(0)).mul(1 - i / (GN + 1)));
    col = col.add(g.mul(1.4 / GN).mul(wGod));
  }

  // slice-color: the frame cut into wedges (or bands), each recoloured from the picture's own average
  const wedge = !low;
  const sid = wedge ? ang0.div(TAU).add(0.5).mul(sym).add(c.bar.floor()).floor() : screenUV.x.mul(10).floor();
  const sa = sid.add(0.5).div(sym).sub(0.5).mul(TAU).sub(c.bar.floor().div(sym).mul(TAU));
  const sdir = vec2(sa.sin(), sa.cos()).div(asp);
  const avg = S(sdir.mul(0.08).add(0.5)).add(S(sdir.mul(0.2).add(0.5))).add(S(sdir.mul(0.34).add(0.5)));
  const avgN = avg.div(avg.x.max(avg.y).max(avg.z).max(0.03));
  col = mix(col, avgN.mul(luma(col)).mul(2.2), wSlice.mul(0.75));

  // graphite-and-gold: near-black embossed, only a travelling window lit gold
  const emb = l0.sub(L(ub.add(px.mul(1.5)))).mul(1.6);
  const graphite = vec3(0.85, 0.85, 1).mul(l0.mul(0.1).add(emb).clamp(0, 0.08));
  const gold = vec3(1.6, 1.0, 0.18).mul(l0.mul(2.2)).mul(sweep);
  col = mix(col, graphite.add(gold), wGG);

  // trails: deep (0.8, inward, +0.4 deg/frame), flight (0.55, other way), kick-echo (shrinking hue-shifted ghosts)
  const tDeep = raw("deep"), tFl = raw("flight"), tEcho = raw("pulse").add(raw("bloom")).add(raw("ascent")).mul(echoOn).clamp(0, 1).mul(c.kick);
  const decay = tDeep.mul(0.62).add(tFl.mul(0.5)).add(tEcho.mul(0.5)).clamp(0, 0.7); // lower in deep: the droste recursion feeds the trail and flooded the black
  const trail = ctx.target("trip-trail", { scale: low ? 0.5 : 1 });
  const tex = ctx.pass(trail, (uv) => {
    const tp = uv.sub(0.5).mul(asp);
    const a = tDeep.mul(0.4).sub(tFl.mul(0.4)).mul(c.dir).mul(Math.PI / 180);
    const z = float(1).add(tDeep.mul(0.015)).sub(tFl.mul(0.008)).add(tEcho.mul(0.04));
    const pu = rot2(tp, a).mul(z).div(asp).add(0.5);
    const prev = hueRot(trail.previous.sample(pu).rgb, tEcho.mul(0.35));
    const cur = S(mix(uv, bendUv(c, uv, aspect), on));
    return vec4(cur.max(prev.mul(decay)), 1);
  });
  col = mix(col, col.max(tex.sample(screenUV).rgb.mul(smoothstep(0.08, 0.3, luma(tex.sample(screenUV).rgb)))), decay.mul(1.4).clamp(0, 0.8)); // faint ghosts drop to black, not a wash

  // deep: pulled toward deep ultramarine, near-monochrome
  const dl = luma(col);
  col = mix(col, vec3(0.08, 0.16, 1.0).mul(smoothstep(0.12, 0.9, dl).pow(1.6).mul(1.5)).add(vec3(0.6, 0.45, 1).mul(dl.sub(0.75).max(0).mul(2))), wDeep.mul(0.75).add(wRet.mul(float(1).sub(retGG)).mul(0.7)));

  // hue-family-swap: the whole frame steps its hue on the phrase line (small, blue stays blue/violet)
  const ph = c.phrase.floor().add(c.seed).mul(0.618).fract().mul(3).floor().sub(1);
  col = mix(col, hueRot(col, ph.mul(0.45)), wBloom.add(wAsc).clamp(0, 1));

  // ---- things in front: depth-parallax dust (3 depths), sparkle stars, cell-lattice behind ----
  const black = smoothstep(0.06, 0.01, luma(col)); // only where the frame is black
  const cellH = (id, s) => id.dot(vec2(12.9898, 78.233)).add(s).add(c.seed.mul(0.137)).sin().mul(43758.5453).fract();
  const dust = (scale, spd, dim, salt) => {
    const dq = p0.mul(scale).add(vec2(0, sec.mul(spd)));
    const id = dq.floor(), f = dq.fract().sub(0.5);
    const h = cellH(id, salt), h2 = cellH(id, salt + 3.1);
    const d = f.sub(vec2(h, h2).sub(0.5).mul(0.4)).length(), rad = h2.mul(0.12).add(0.16);
    const disc = smoothstep(rad, rad.sub(0.02), d).mul(0.25).add(smoothstep(0.03, 0.0, d.sub(rad).add(0.03).abs()).mul(0.6));
    return pal(fam.add(h.mul(0.18))).mul(disc).mul(on1(h.greaterThan(0.72))).mul(dim);
  };
  const dustCol = dust(3, 0.02, 0.35, 1).add(dust(5.5, 0.045, 0.2, 2)).add(dust(9, 0.09, 0.1, 3));
  col = col.add(dustCol.mul(sweep.mul(0.8).add(0.2)).mul(wDust).mul(black.mul(0.7).add(0.3)));
  // sparkle-stars: small 4-point glints twinkling on the off-beat (the snare's place)
  const sq = p0.mul(14), sidd = sq.floor(), sf = sq.fract().sub(0.5), sh = cellH(sidd, 9.7);
  const so = sf.sub(vec2(sh, cellH(sidd, 4.2)).sub(0.5).mul(0.5));
  const star = smoothstep(0.02, 0, so.x.abs()).mul(smoothstep(0.35, 0, so.y.abs())).add(smoothstep(0.02, 0, so.y.abs()).mul(smoothstep(0.35, 0, so.x.abs())));
  const tw = c.half.mul(0.8).add(0.2);
  col = col.add(pal(fam.add(0.35).add(sh.mul(0.3))).mul(star).mul(on1(sh.greaterThan(0.93))).mul(tw).mul(2).mul(wSpark).mul(black));
  // cell-lattice: the frame's black mirrored into a lattice of beaded cells, graphite, lit where the hand passes
  const lq = vec2(p0.x.abs(), p0.y).mul(sym.mul(0.9)), lf = lq.fract().sub(0.5);
  const latLine = smoothstep(0.035, 0.0, lf.x.abs().max(lf.y.abs()).sub(0.47).abs());
  const bead = lf.abs().sub(0.5).length();
  const beadRing = smoothstep(0.03, 0.0, bead.sub(0.1).abs());
  const latCol = vec3(0.02, 0.02, 0.04).mul(latLine).add(pal(fam).mul(beadRing).mul(sweep.mul(1.4).add(0.08)));
  col = col.add(latCol.mul(wLat).mul(black));

  // peak: whole-frame hue rotation one turn per 2 phrases; from 156.35 a soft bar swell (+15%)
  col = mix(col, hueRot(col, sec.mul(TAU / 24).mul(c.dir)), wPeak);
  col = col.mul(float(1).add(c.barHit.mul(0.15).mul(smoothstep(155.6, 157.1, sec)).mul(wPeak)));

  // black stays black: a soft floor under the dim graphite
  col = col.mul(mix(float(1), smoothstep(mix(float(0.012), float(0.1), wDeep), mix(float(0.06), float(0.22), wDeep), luma(col)), on)); // deep: a harder black floor, half the frame stays black
  // dome mask, return fade to black 190-193 and hold, vignette
  col = col.mul(domeMask).mul(mix(float(1), smoothstep(193, 190, sec), on));
  // FOCUS: depth of field gives the layers meaning. A being on stage (74 m out on the camera's line) stands sharp,
  // the running scene around it goes soft. Otherwise the focus pulls slowly through the layers, near to far and
  // back once every two phrases, so one layer reads at a time while the others breathe out of focus.
  const pullT = c.phrase.mul(0.5).add(c.rnd(74)).mul(TAU).sin().mul(0.5).add(0.5);
  // never blur without a subject: the focus plane is the depth of what actually stands at the frame's centre
  // (the nearest of five taps round it), so that thing is crisp and only the layers before and behind it soften.
  // Nothing there (open black) = no blur at all. Some phrases the roll deals an extreme, razor-thin plane.
  let zC = float(999);
  for (const [ox, oy] of (low ? [[0, 0], [0.12, 0.1], [-0.12, -0.1]] : [[0, 0], [0.05, 0], [-0.05, 0], [0, 0.07], [0, -0.07], [0.12, 0.1], [-0.12, 0.1], [0.12, -0.1], [-0.12, -0.1]])) {
    const z = ctx.viewZAt(vec2(0.5 + ox, 0.5 + oy)).negate();
    zC = zC.min(select(z.greaterThan(1.5).and(z.lessThan(300)), z, float(999))); // the nearest thing round the middle is the subject
  }
  const hasSubject = step(zC, 400);
  // on a vision the subject is the being itself, wherever the director's fit has hung it (74 m x fit): the centre tap
  const zMid = ctx.viewZAt(vec2(0.5, 0.5)).negate(), zV = select(zMid.greaterThan(1.5).and(zMid.lessThan(300)), zMid, zC.min(74));
  const razor = step(0.7, c.phrase.floor().add(c.seed).mul(78.233).sin().mul(43758.5453).fract());
  const focusD = mix(zC.clamp(4, 200), zV.clamp(4, 200), vis);
  const focusR = mix(mix(zC.mul(0.35).add(3), zC.mul(0.08).add(1), razor), zV.mul(0.45).add(6), vis); // being + its ring/veil sharp; only the far world and the near fore soften
  // the beat as occlusion: on the kick one side of the subject's depth blinks to black, so layers trade places
  // as figure and ground instead of the whole picture pumping
  const dz = ctx.viewZ.negate();
  const farSide = step(zC.mul(1.25).add(2), dz), nearSide = step(dz, zC.mul(0.75)).mul(step(0.5, dz));
  col = col.mul(float(1).sub(c.kick.pow(0.5).mul(0.92).mul(on).mul(hasSubject).mul(float(1).sub(vis)).mul(job(1).mul(farSide).add(job(2).mul(nearSide)))));
  const graded = col.max(vec3(0));
  const focused = dof(graded, ctx.viewZ, focusD, focusR, low ? 3 : 6);
  // only when it means something: a being on stage, or a phrase the roll deals a focus pull (about 1 in 3),
  // eased in and out over a bar so the pull never pops. Everything else plays sharp.
  const phF = c.phrase.floor(), phu = c.phrase.fract();
  const pullOn = step(0.66, phF.add(c.seed).mul(12.9898).sin().mul(43758.5453).fract())
    .mul(smoothstep(0, 0.125, phu)).mul(smoothstep(1, 0.875, phu));
  const dofW = on.mul(pullOn.mul(hasSubject).max(vis));
  return vignette(mix(graded, focused, dofW), ctx.param("vignette", 0.35), { color: [0, 0, 0] });
}
