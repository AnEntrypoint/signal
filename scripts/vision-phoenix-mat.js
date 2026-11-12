// THE PHOENIX: a firebird head-on. Born from one ember bead; flame teardrops lick up into a body, the wings unfurl
// one fan at a time by angle, tail bead chains drop, three crest plumes; at exit it burns feather by feather to ash beads.
// Layers (params.layer): world z-30 sun rays + arcs + rising embers (scrolls up) / ring z-12 halo of flame tongues
// (counter-rotates) / being z0 (breathes) / veil z+10 black smoke plumes (drift up) / fore z+22 ash beads fall, near feathers pass.
// Roll channels 940..959.
import { MeshBasicNodeMaterial, AdditiveBlending, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep as ss, step, mix, atan2 as atan2raw, fwidth } from "builtin/tsl";
import { tripClock, visionShown, visionU, climb, maskDraw, maskBeads, maskIris, maskClock, inv, ioU, famPick, NEON, strokeAA } from "./lib/trip.js";

const TAU = 6.28318, PI = 3.14159, EY = -10;                       // EY: the ember's y (being metres)
const atan2 = (y, x) => atan2raw(y, x.add(1e-5));                  // never asked at (0,0)
const hash = (a, b) => float(a).mul(12.9898).add(float(b).mul(78.233)).sin().mul(43758.5453).fract();
// teardrop: s along from its pointed root, w across, length L, half-width Wm (fattest at .7 L); d < 0 inside, f 0..1 along
const tear = (s, w, L, Wm) => { const f = float(s).div(L).clamp(0, 1); return { f, d: float(w).abs().sub(f.mul(inv(f.mul(f)).max(0).sqrt()).mul(2).mul(Wm)).add(inv(step(0, s).mul(step(s, L))).mul(9)) }; };

export function material(ctx) {
  const layer = ctx.params.layer ?? "being", low = ctx.quality === "low";
  const c = tripClock(ctx), u = visionU(ctx, c), io = ioU(u), live = visionShown(ctx, c, 0);
  const rn = (n) => c.rnd(940 + n), pk = (n, k) => c.pick(940 + n, k), sense = (n) => step(0.5, rn(n)).mul(2).sub(1);
  const W = NEON.W, BLK = NEON.BG, fam = pk(0, 3);
  const FAM = [[NEON.ORA, NEON.YEL, NEON.PNK, NEON.BLU], [NEON.PNK, NEON.ORA, NEON.YEL, NEON.VIO], [NEON.VIO, NEON.PNK, NEON.YEL, NEON.GRN]];
  const A = famPick(FAM, fam, 0), B = famPick(FAM, fam, 1), H = famPick(FAM, fam, 2), H2 = famPick(FAM, fam, 3);
  const P = positionGeometry.xy, t = c.real, hi = climb(c), kickOn = step(0.001, c.kick);
  const cul = ss(0.7, 0.8, u).mul(inv(ss(0.86, 0.92, u))).mul(hi.mul(0.4).add(0.6));
  const aa = fwidth(P.x).mul(1.2).max(0.01), sk = strokeAA(aa), fill = (d) => inv(ss(0, aa, d));
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  const cutout = (col, cover) => { m.colorNode = col; m.opacityNode = cover.mul(live).clamp(0, 1); m.alphaTest = 0.5; return m; };
  let col = vec3(0), cover = float(0);
  const lay = (body, lit) => { col = mix(col, lit, body); cover = cover.max(body); };

  // ------------------------------------------------------------------ WORLD: the sun behind, embers rising (scrolls)
  if (layer === "world") {
    // the sun sets at exit: rays draw back into the disc, arcs un-draw from the crown, ember columns die one by one
    const gone = inv(ss(0.84, 0.985, u));
    const q = P.sub(vec2(0, -12)), r = q.length(), a = atan2(q.x, q.y);
    // rays: the sun rises, alternate rays reaching further; they turn slowly
    const nR = pk(5, 3).mul(8).add(24), pR = ss(0.25, 0.45, u).mul(gone);
    const ar = a.add(t.mul(0.012).mul(sense(1))).div(TAU).mul(nR);
    const reach = pR.mul(pR).mul(260).mul(ar.floor().mod(2).mul(0.4).add(0.6)).add(pR.mul(40));
    const ray = ss(0, aa, float(0.25).sub(ar.fract().sub(0.5).abs()).mul(TAU).div(nR).mul(r)).mul(inv(ss(reach, reach.add(aa), r))).mul(step(36, r));
    const front = c.beat.fract().mul(130);
    const kl = inv(ss(0, 6, r.sub(front).abs())).mul(kickOn).mul(inv(ss(60, 130, front)));
    col = A.mul(ray).mul(kl.mul(0.5).add(0.16));
    // sun arcs: drawn up both sides from below, a bead row turning between them
    const pS = ss(0.3, 0.44, u).mul(gone), rise = inv(a.abs().div(PI));
    const arcs = sk(r.div(6).fract().sub(0.5).abs().mul(6), 0.28).mul(step(50, r)).mul(step(r, 76)).mul(maskDraw(pS, rise));
    const ab = a.sub(t.mul(0.03).mul(sense(1))), kb = ab.div(TAU).mul(72).add(0.5).floor();
    const bead = sk(vec2(ab.sub(kb.mul(TAU / 72)).mul(66), r.sub(66)).length(), 1).mul(maskBeads(pS.mul(1.3).sub(0.3), kb.mul(0.618).fract()));
    col = col.add(B.mul(arcs).mul(cul.mul(0.4).add(0.5))).add(H.mul(bead).mul(0.8));
    // embers: teardrops rising in columns, each its own speed; hot heads
    const cw = 13, ci = P.x.div(cw).floor(), h = hash(ci, 3.7);
    const yy = P.y.sub(t.mul(h.mul(5).add(4)).mul(low ? 0.6 : 1)).add(h.mul(90)).div(22), kj = yy.floor(), h2 = hash(ci, kj);
    const ex = P.x.div(cw).fract().sub(0.5).mul(cw).sub(h2.sub(0.5).mul(5)).sub(t.mul(0.9).add(kj).sin().mul(0.8));
    const e = tear(yy.fract().mul(22).sub(2), ex, h2.mul(6).add(9), h2.mul(0.8).add(1).mul(hi.mul(0.5).add(0.75)));
    const em = fill(e.d).mul(step(0.4, h2)).mul(maskBeads(ss(0.3, 0.5, u).mul(gone), h2.sub(0.4).div(0.6)));
    col = mix(col, mix(mix(H2, A, e.f), mix(B, W, 0.5), e.f.mul(e.f).mul(e.f)), em);
    return cutout(col, float(1));
  }

  // ------------------------------------------------------------------ RING: halo of flame tongues (counter-rotates)
  if (layer === "ring") {
    const p = P.mul(74 / 86).sub(vec2(0, 3)), r = p.length(), a = atan2(p.x, p.y), s4 = sense(4);
    const pT = io(0.45, 0.6, 0.86, 0.93);
    const lp = pT.mul(1.25).sub(inv(a.abs().div(PI))).mul(4).clamp(0, 1);       // fire climbs the halo from below
    const nT = pk(6, 3).mul(4).add(16);
    const at = a.add(t.mul(TAU / 70).mul(s4)).div(TAU).mul(nT), kt = at.floor();
    const s = r.sub(27), L = kt.mul(2.4).sin().mul(1.5).add(5).mul(hi.mul(0.5).add(0.75)).mul(lp).max(0.01);
    const w = at.fract().sub(0.5).mul(TAU).div(nT).mul(r).add(s.mul(0.9).sub(t.mul(3)).add(kt).sin().mul(s.div(L).clamp(0, 1)).mul(0.5));
    const tg = tear(L.sub(s), w, L, float(27 * TAU * 0.4).div(nT));
    // the kick is a spark chasing round the halo, not a pulse
    const chase = inv(ss(0, 0.06, at.div(nT).sub(c.beat.div(8).mul(s4)).fract().sub(0.5).abs())).mul(kickOn);
    let rc = A.mul(fill(tg.d)).mul(tg.f).mul(0.3).add(mix(H, W, 0.2).mul(sk(tg.d.abs(), 0.1)).mul(cul.mul(0.5).add(0.55).add(chase)));
    if (!low) rc = rc.add(B.mul(sk(tg.d.add(0.8).abs(), 0.07)).mul(0.5));
    // bead row inside: swings one way then the other, reversing on the phrase
    const tri = c.beat.div(32).fract().sub(0.5).abs().mul(2.4), nD = pk(7, 3).mul(6).add(30);
    const ab = a.sub(tri.mul(s4)), kb = ab.div(TAU).mul(nD).add(0.5).floor();
    const bead = sk(vec2(ab.sub(kb.mul(TAU).div(nD)).mul(24.5), r.sub(24.5)).length(), 0.42).mul(maskBeads(io(0.5, 0.62, 0.86, 0.9), kb.mul(0.618).fract()));
    const line = sk(r.sub(26.2).abs(), 0.07).mul(maskClock(io(0.44, 0.52, 0.9, 0.93), a.mul(s4)));
    m.colorNode = rc.add(mix(B, W, 0.3).mul(bead).mul(0.8)).add(A.mul(line).mul(0.7));
    m.opacityNode = live;
    m.transparent = true; m.blending = AdditiveBlending; m.depthWrite = false;
    return m;
  }

  // ------------------------------------------------------------------ VEIL: black smoke plumes curling up (drifts)
  if (layer === "veil") {
    for (let j = 0; j < (low ? 2 : 4); j++) {
      const sg = j % 2 ? 1 : -1, pj = io(0.6 + j * 0.03, 0.72 + j * 0.03, 0.86 - j * 0.01, 0.89 - j * 0.01);
      const dx = P.x.sub(P.y.mul(0.2).sub(t.mul(0.3)).add(j * 2).sin().mul(2.5)).sub(t.mul(0.05).add(j).sin().mul(4)).sub(sg * [22, 13, 8, 27][j]);
      const hw = P.y.mul(0.45).sub(t.mul(0.5 + j * 0.1)).add(j).sin().abs().mul(1.4).add(2.2 + (j % 2) * 0.8);
      const top = pj.mul(28 + j * 5).sub(25), hq = vec2(dx.sub(sg * 1.5), P.y.sub(top)), hr = hq.length();
      const d = dx.abs().sub(hw).max(P.y.sub(top)).min(hr.sub(4.2));
      const curl = sk(hr.mul(0.45).sub(atan2(hq.x, hq.y).div(TAU).mul(sg)).sub(t.mul(0.06)).fract().sub(0.5).abs().div(0.45), 0.08).mul(step(hr, 3.6));
      const lit = mix(H2, W, 0.25).mul(sk(d.abs(), 0.1)).mul(0.6).add(H2.mul(sk(d.add(1.1).abs(), 0.06).add(curl)).mul(0.35));
      lay(fill(d).mul(step(0.002, pj)), BLK.add(lit));
    }
    return cutout(col, cover);
  }

  // ------------------------------------------------------------------ FORE: ash beads falling, near feathers passing (scrolls down)
  if (layer === "fore") {
    const cw = 7, ci = P.x.div(cw).floor(), h = hash(ci, 9.1);
    const yy = P.y.add(t.mul(h.mul(3).add(2.5))).add(h.mul(60)).div(11), kj = yy.floor(), h2 = hash(ci, kj);
    const bl = vec2(P.x.div(cw).fract().sub(0.5).mul(cw).sub(h2.sub(0.5).mul(3.5)).sub(t.mul(0.7).add(kj).sin().mul(0.6)), yy.fract().sub(0.5).mul(11)).length();
    const br = h2.mul(0.5).add(0.45);
    lay(fill(bl.sub(br)).mul(step(0.5, h2)).mul(maskBeads(io(0.66, 0.8, 0.8, 0.86), h2.sub(0.5).mul(2))), BLK.add(mix(W, H2, 0.5).mul(0.5).mul(inv(fill(bl.sub(br.mul(0.55)))))));
    // on kick bars the near feathers swap from black bodies to open line-art: what they hid shows through
    const swap = step(0.5, c.bar.fract()).mul(kickOn);
    for (let j = 0; j < (low ? 2 : 3); j++) {
      const sg = j % 2 ? -1 : 1, L = 17 - j * 2;
      const v = P.sub(vec2(u.sub(0.73 + j * 0.02).mul(240).mul(sense(7)).mul(sg), t.mul(0.13).add(j * 2.1).sin().mul(5).add((j - 1) * 8)));
      const an = t.mul(0.07 * sg).add(j * 1.9), ca = an.cos(), sa = an.sin();
      const qx = v.x.mul(ca).add(v.y.mul(sa)).add(L / 2), qy = v.y.mul(ca).sub(v.x.mul(sa));
      const ft = tear(qx, qy, L, 2.8 - j * 0.3), eye = vec2(qx.sub(L * 0.7), qy).length();
      const inside = fill(ft.d).mul(maskDraw(io(0.66 + j * 0.03, 0.74 + j * 0.03, 0.83 - j * 0.01, 0.86 - j * 0.01), ft.f));
      const lines = sk(ft.d.abs(), 0.12).add(sk(qy.abs(), 0.07)).add(sk(eye.sub(1.1).abs(), 0.1)).add(sk(eye, 0.4)).min(1);
      const barb = sk(qx.sub(qy.abs().mul(1.2)).mul(0.9).fract().sub(0.5).abs().div(0.9), 0.07);
      col = mix(col, BLK.add(mix([H, B, H2][j], W, 0.2).mul(lines)).add(A.mul(barb).mul(0.3)), inside);
      cover = cover.max(inside.mul(inv(swap.mul(inv(lines)))));
    }
    return cutout(col, cover);
  }

  // ------------------------------------------------------------------ THE BEING (breathes)
  const br = t.mul(TAU / 7).sin(), ax = P.x.abs(), side = step(0, P.x);
  const isA = inv(side.sub(step(0.5, rn(3))).abs());                // 1 on the wing that unfurls first
  // tail: bead chains hanging from the ember, swaying; they drop bead by bead from the root
  const tq = vec2(P.x, float(EY).sub(P.y)), tr = tq.length(), nC = pk(8, 3).mul(2).add(5);
  const ta = atan2(tq.x, tq.y).add(t.mul(0.8).sub(tr.mul(0.25)).sin().mul(0.03)).div(1.3).add(0.5).mul(nC);
  const cc = ta.floor().add(0.5).div(nC).sub(0.5).abs().mul(2), bi = tr.div(1.5).floor();
  const cellW = tr.mul(1.3).div(nC), tb = vec2(ta.fract().sub(0.5).mul(cellW), tr.div(1.5).fract().sub(0.5).mul(1.5)).length();
  const tailOn = step(2.5, bi).mul(step(tr, inv(cc.mul(cc)).mul(5).add(8.5))).mul(step(0, ta)).mul(step(ta, nC))
    .mul(maskBeads(io(0.34, 0.43, 0.9, 0.95), tr.div(14).mul(0.7).add(cc.mul(0.3))));
  const trad = bi.mod(3).mul(0.1).add(0.36).min(cellW.mul(0.42));
  lay(fill(tb.sub(trad)).mul(tailOn), mix(mix(H, B, step(0.5, bi.mod(2))).mul(inv(fill(tb.sub(trad.mul(0.4))))), W.mul(0.3), ss(0.88, 0.91, u)));

  // wings: a fan of teardrop feathers round each shoulder; unfurls by angle from the spine, one fan then the other
  const v = vec2(ax.sub(1.5), P.y.sub(EY + 14.5)), r = v.length(), nF = pk(9, 3).mul(2).add(7), dT = float(2.2).div(nF);
  const tn = atan2(v.y, v.x).sub(br.mul(0.04).mul(r.div(20))).add(0.95).div(2.2), inFan = step(0, tn).mul(step(tn, 1));
  const dirF = step(0.5, rn(10)), tnd = mix(tn, inv(tn), dirF).clamp(0, 1);
  const front = c.beat.fract().mul(40), kl = inv(ss(0, 2, r.sub(front).abs())).mul(kickOn).mul(inv(ss(22, 40, front)));
  const fan = (o, sc) => {
    const x = tn.mul(nF).add(o), fk = x.floor(), tk = fk.add(0.5 - o).div(nF).clamp(0, 1);
    const L = tk.pow(1.4).mul(PI).sin().mul(17).add(9).mul(sc), fw = x.fract().sub(0.5).mul(dT).mul(r), sr = r.sub(1.2);
    return { fk, L, fw, sr, Wm: dT.mul(L).mul(0.31), ok: mix(tk, inv(tk), dirF), f: tear(sr, fw, L, dT.mul(L).mul(0.31)) };
  };
  const F = fan(0, 1);
  const pW = mix(ss(0.34, 0.42, u), ss(0.26, 0.34, u), isA), pBn = mix(ss(0.89, 0.925, u), ss(0.925, 0.955, u), isA);
  // the burn: last feather in is first out; a front runs tip to root and leaves ash beads on the shaft
  const burnt = step(inv(pBn.mul(1.3).sub(inv(F.ok)).mul(4).clamp(0, 1)), F.f.f);
  const eye = vec2(F.sr.sub(F.L.mul(0.7)), F.fw).length(), re = F.Wm.mul(0.62);
  const eo = maskIris(io(0.6, 0.74, 0.86, 0.89).mul(1.6).sub(hash(F.fk, side).mul(0.6)).clamp(0, 1), eye.div(re).div(1.2));
  const barb = sk(r.sub(F.fw.abs().mul(1.3)).mul(0.8).fract().sub(0.5).abs().div(0.8), 0.1);
  let fc = A.mul(barb).mul(0.4).add(mix(A, W, 0.3).mul(sk(F.f.d.abs(), 0.1)).mul(kl.add(0.9))).add(B.mul(sk(F.fw.abs(), 0.05)));
  fc = mix(fc, mix(H, W, cul.mul(0.5)).mul(sk(eye.sub(re).abs(), 0.09)).add(mix(H2, W, 0.35).mul(fill(eye.sub(re.mul(hi.mul(0.2).add(0.4)))))), fill(eye.sub(re).sub(0.1)).mul(eo));
  lay(fill(F.f.d).mul(inFan).mul(maskClock(pW, tnd.sub(0.5).mul(TAU))).mul(inv(burnt)), BLK.add(fc));
  const ash = sk(vec2(r.div(1.4).fract().sub(0.5).mul(1.4), F.fw).length(), 0.3).mul(burnt).mul(step(1.2, r)).mul(step(F.sr, F.L)).mul(inFan)
    .mul(maskBeads(inv(ss(0.95, 0.975, u)), hash(r.div(1.4).floor(), F.fk)));
  lay(ash, mix(W, H2, 0.3).mul(0.32));
  // coverts (late): a short second row between the feathers, black bodies with a hot rim
  if (!low) {
    const C = fan(0.5, 0.4), cb = fill(C.f.d).mul(inFan).mul(maskClock(io(0.68, 0.78, 0.87, 0.895), inv(tnd).sub(0.5).mul(TAU)));
    lay(cb, BLK.add(H2.mul(sk(C.f.d.abs(), 0.09))).add(mix(H, W, 0.3).mul(fill(vec2(C.sr.sub(C.L.mul(0.72)), C.fw).length().sub(C.Wm.mul(0.4))))));
  }

  // body: a column of flame teardrops licking upward out of the ember, one after another
  const by = P.y.sub(EY + 2.2).div(3.1), bk = by.floor(), fb = by.fract(), pB = io(0.16, 0.28, 0.955, 0.98);
  const bt = tear(inv(fb).mul(3.1), P.x.add(t.mul(2.5).add(bk).sin().mul(fb.mul(fb)).mul(0.3)), 3.1, bk.add(0.5).div(5).clamp(0, 1).mul(PI).sin().mul(0.9).add(1.1));
  const bodyOn = fill(bt.d).mul(step(0, bk)).mul(step(bk, 4.5)).mul(step(fb, pB.mul(5).sub(bk).clamp(0, 1).mul(1.01)));
  lay(bodyOn, mix(A, H, step(0.5, bk.mod(2))).mul(inv(fb).mul(0.45)).add(mix(B, W, 0.4).mul(sk(bt.d.abs(), 0.1)).mul(kl.add(0.9))).add(W.mul(sk(bt.d.add(0.55).abs(), 0.07))));

  // head, eyes, beak; then the crest: three plumes drawn out from the crown
  const hy = P.y.sub(EY + 19.5), hr = vec2(P.x, hy).length(), he = vec2(ax.sub(0.95), hy.sub(0.3)).length();
  const bkk = tear(hy.add(2.9), P.x, 2.6, 0.55);
  lay(fill(hr.sub(2.3).min(bkk.d)).mul(maskIris(io(0.24, 0.29, 0.95, 0.96), hr.div(3.2))),
    BLK.add(mix(B, W, 0.4).mul(sk(hr.sub(2.2).abs(), 0.1))).add(H.mul(sk(he.sub(0.55).abs(), 0.08))).add(W.mul(fill(he.sub(0.22)))).add(mix(B, W, 0.2).mul(fill(bkk.d.add(0.12)))));
  const pC = io(0.4, 0.46, 0.88, 0.9), cy = hy.sub(1.8);
  const plume = (s, w, L, o) => {
    const f = tear(s, w.add(t.mul(1.7).add(o).sin().mul(s).mul(0.03)), L, 0.95);
    lay(fill(f.d).mul(maskDraw(pC.mul(1.5).sub(o * 0.5).clamp(0, 1), f.f)), BLK.add(mix(H, W, 0.2).mul(sk(f.d.abs(), 0.09))).add(B.mul(sk(w.abs(), 0.05))).add(W.mul(fill(vec2(s.sub(L * 0.7), w).length().sub(0.3)))));
  };
  plume(ax.mul(0.52).add(cy.mul(0.85)), ax.mul(0.85).sub(cy.mul(0.52)), 6.5, 1);
  plume(cy, P.x, 8, 0);

  // the ember: first in, last out; a hot core, a ring, sparks turning
  const er = vec2(P.x, P.y.sub(EY)).length(), ea = atan2(P.x, P.y.sub(EY)).add(t.mul(0.4).mul(sense(2))).div(TAU).mul(8).fract().sub(0.5).abs();
  const spark = ss(0, aa, float(0.22).sub(ea).mul(er)).mul(step(2, er)).mul(step(er, br.mul(0.25).add(2.75)));
  lay(fill(er.sub(3)).mul(maskIris(io(0, 0.04, 0.985, 0.998), er.div(3.1))),
    BLK.add(mix(B, W, 0.6).mul(fill(er.sub(br.mul(0.12).add(0.85))))).add(H.mul(sk(er.sub(1.5).abs(), 0.1))).add(A.mul(spark)));
  return cutout(col, cover);
}
