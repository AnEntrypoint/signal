// THE EYE PYRAMID: a ziggurat of aztec-key courses laid one at a time, a staircase up its middle, a lidded eye on top.
// Layers (params.layer): world z-30 op-art dunes + dripping sun-eye (scrolls) / ring z-12 ray fan (counter-rotates) /
// being z0 the pyramid (breathes) / veil z+10 black nearer pyramids (slide sideways) / fore z+22 flame tears + squares (drift up).
// Masks: courses stack (stair), lids open, rays grow from the apex, flames kindle from their base. Roll channels 980..999.
// Pacing: base courses alone u0-.15, whole by .5, late detail .6-.8, LIFO exit .8-1; the dunes stay lit to the seam.
import { MeshBasicNodeMaterial, AdditiveBlending, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep as ss, step, mix, atan2 as atan2raw, fwidth, select } from "builtin/tsl";
import { tripClock, visionShown, visionU, climb, maskLid, maskDraw, maskClock, maskBeads, inv, is, rbox, strokeAA, ioU, NEON } from "./lib/trip.js";

const TAU = 6.28318;
const EY = 15.5, BASE = -20, HP = 30;                               // eye centre y, pyramid base y and height (being metres)
const atan2 = (y, x) => atan2raw(y, x.add(1e-5));                   // never ask atan2 at (0, 0)
// the running key: one fret per cell as axis-aligned strokes [cx, cy, hx, hy] in cell units (-.5 .. .5)
const KEY = [[0, -0.36, 0.5, 0], [0.36, 0, 0, 0.36], [0.03, 0.36, 0.33, 0], [-0.3, 0.12, 0, 0.24], [-0.09, -0.12, 0.21, 0], [0.12, 0.01, 0, 0.13], [0.02, 0.14, 0.1, 0]];

export function material(ctx) {
  const layer = ctx.params.layer ?? "being";
  const c = tripClock(ctx), u = visionU(ctx, c), live = visionShown(ctx, c, 0);
  const low = ctx.quality === "low";
  const io = ioU(u);
  const rn = (n) => c.rnd(980 + n), pk = (n, k) => c.pick(980 + n, k);
  const sense = (n) => step(0.5, rn(n)).mul(2).sub(1);
  const hs = (x) => x.mul(12.9898).add(rn(9).mul(40)).sin().mul(43758.5453).fract();
  const fam = pk(0, 3), hot = pk(1, 4), W = NEON.W, ice = vec3(0.3, 0.5, 1.0);
  const A = mix(NEON.BLU, NEON.VIO, is(fam, 1)), B = NEON.VIO.mul(is(fam, 0)).add(NEON.BLU.mul(is(fam, 1))).add(ice.mul(is(fam, 2)));
  const HOT = [NEON.PNK, NEON.ORA, NEON.YEL, NEON.GRN];
  const hotC = (k) => HOT.reduce((acc, v, i) => acc.add(v.mul(is(k, i))), vec3(0));
  const H = hotC(hot), H2 = hotC(hot.add(pk(16, 3)).add(1).mod(4));
  const P = positionGeometry.xy;
  const kickOn = step(0.001, c.kick);
  const flip = step(0.5, c.bar.div(2).fract()).mul(c.live);          // every other bar, only where the track kicks
  const cul = ss(0.7, 0.8, u).mul(inv(ss(0.86, 0.92, u))).mul(climb(c).mul(0.4).add(0.6));
  const band = (f, aaN) => ss(float(0), aaN, float(0.25).sub(f.sub(0.25).abs()));   // lit half of a 0..1 period, soft edges
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  const cutout = (col, cover) => { m.colorNode = col; m.opacityNode = cover.mul(live).clamp(0, 1); m.alphaTest = 0.5; return m; };

  // ------------------------------------------------------------------ WORLD: striped dunes, a dripping sun-eye (scrolls)
  if (layer === "world") {
    const aa = fwidth(P.x).mul(1.2).max(0.03), sk = strokeAA(aa);
    const uEnd = inv(float(0.4).div(ctx.param("vw1", -1).sub(ctx.param("vw0", -1)).max(1))).min(0.999);
    const gone = inv(ss(uEnd, float(1.0005), u));
    const pw = (a, b) => ss(a, b, u).mul(gone);
    const dir = sense(4);
    const S = P.sub(vec2(dir.mul(44), 21)), rs = S.length();
    // sky: rings spreading out of the sun
    const pSky = pw(0.3, 0.5);
    const fr = rs.div(5).sub(c.real.mul(0.05)).fract(), ri = rs.div(5).sub(c.real.mul(0.05)).floor().mod(3);
    let col = mix(A, H2, is(ri, 0)).mul(sk(fr.sub(0.5).abs().mul(5), 0.14)).mul(step(rs, pSky.mul(240))).mul(float(0.4).add(cul.mul(0.3)));
    // drips hanging off the disc, each its own length and slow pulse
    const pS = pw(0.2, 0.3), pD = pw(0.5, 0.66), RS = 9;
    const dc = S.x.div(1.8).floor(), lx = S.x.div(1.8).fract().sub(0.5).mul(1.8), hd = hs(dc);
    const xc = dc.mul(1.8).add(0.9), yT = float(RS * RS).sub(xc.mul(xc)).max(0.01).sqrt().negate();
    const len = hd.mul(11).add(3).mul(c.real.mul(0.6).add(hd.mul(TAU)).sin().mul(0.3).add(0.7)).mul(pD);
    const dy = S.y.sub(yT.sub(len));
    const drip = sk(vec2(lx, dy.min(0)).length(), 0.5).max(sk(vec2(lx, dy).length(), 0.8)).mul(step(S.y, yT)).mul(step(xc.abs(), RS - 0.6)).mul(step(0.01, pD));
    col = mix(col, mix(H, H2, ss(0, 12, dy)), drip);
    // the sun-eye: its lids part
    const disc = sk(rs, RS).mul(maskLid(pS, S.y.div(RS)));
    const sb = band(rs.mul(0.45).add(c.real.mul(0.15)).fract(), aa.mul(0.45));
    col = mix(col, mix(H, mix(H2, W, 0.3), sb).mul(step(2.6, rs)).add(W.mul(sk(S.sub(vec2(-0.8, 0.9)).length(), 0.5))), disc);
    // dunes: three ridges rising one behind the other, each scrolling at its own pace
    for (let j = 0; j < (low ? 2 : 3); j++) {
      const pj = pw(0.18 + j * 0.07, 0.36 + j * 0.07);
      const sx = P.x.add(c.real.mul(1.2 + j * 1.6).mul(dir));
      const ridge = sx.mul(0.045 - j * 0.008).add(j * 2.1).sin().mul(5).add(sx.mul(0.017).add(j).sin().mul(4)).add([-9, -22, -37][j]).sub(inv(pj).mul(75));
      const d = ridge.sub(P.y);
      const f = d.mul(0.36 - j * 0.07).sub(c.real.mul(0.07)).fract();
      const lit = band(f, aa.mul(0.36 - j * 0.07)).max(sk(d, 0.35));
      col = mix(col, [mix(A, B, 0.5), A, mix(B, W, 0.55)][j].mul(lit).mul(0.5 + j * 0.2), sk(d.negate(), 0));
    }
    return cutout(col, float(1));
  }

  // ------------------------------------------------------------------ RING: the ray fan behind the apex (counter-rotates)
  if (layer === "ring") {
    const p = P.mul(74 / 86).sub(vec2(0, EY));
    const aa = fwidth(p.x).mul(1.2).max(0.01), sk = strokeAA(aa);
    const r = p.length(), a = atan2(p.x, p.y), dir = sense(8);
    const pR = io(0.45, 0.6, 0.86, 0.93), pB = io(0.56, 0.68, 0.85, 0.9);
    const N = pk(7, 3).mul(4).add(12), lit = float(0.6).add(cul.mul(0.6));
    // on the kick the fan steps one ray per bar instead of gliding
    const bs = c.bar.floor().add(ss(0, 0.25, c.bar.fract())).mul(c.live);
    const a1 = a.add(c.real.mul(TAU / 50).add(bs.mul(TAU).div(N)).mul(dir)).div(TAU).mul(N);
    const k1 = a1.floor(), f1 = a1.fract().sub(0.5).abs();
    const ord = mix(k1.mul(0.618).fract(), a.abs().div(3.1416), step(0.5, rn(10)));
    const L1 = pR.mul(1.6).sub(ord.mul(0.6)).clamp(0, 1).mul(cul.mul(4).add(15));
    const t1 = r.sub(10.5).div(L1.max(0.01));
    const wedge = sk(f1.sub(inv(t1).mul(0.4)).mul(TAU).div(N).mul(r), 0).mul(step(10.5, r)).mul(step(t1, 1)).mul(step(0.01, L1));
    const ob = band(r.mul(0.6).sub(c.real.mul(0.5)).fract(), aa.mul(0.6));
    // thin rays between them turn the other way, a bead on every tip
    const a2 = a.sub(c.real.mul(TAU / 36).mul(dir)).div(TAU).mul(N.mul(2));
    const k2 = a2.floor(), f2 = a2.fract().sub(0.5).abs().mul(TAU).div(N.mul(2)).mul(r);
    const L2 = pB.mul(1.5).sub(k2.mul(0.382).fract().mul(0.5)).clamp(0, 1).mul(hs(k2).mul(8).add(14));
    const thin = sk(f2, 0.1).mul(step(11.5, r)).mul(step(r, L2.add(11.5))).add(sk(vec2(f2, r.sub(L2).sub(11.5)).length(), 0.42)).mul(step(0.01, L2));
    m.colorNode = mix(A, mix(B, W, 0.5), ob).mul(wedge).mul(lit).add(mix(H, H2, step(0.5, k2.mod(2))).mul(thin.min(1)).mul(lit)).mul(live);
    m.transparent = true; m.blending = AdditiveBlending; m.depthWrite = false;
    return m;
  }

  // ------------------------------------------------------------------ VEIL: black nearer pyramids sliding by (parallax)
  if (layer === "veil") {
    const aa = fwidth(P.x).mul(1.2).max(0.01), sk = strokeAA(aa);
    const pV = io(0.6, 0.72, 0.83, 0.89), SW = 2.4;
    const xx = P.x.add(c.real.mul(rn(12).mul(1.5).add(1.6)).mul(sense(9)));
    const ci = xx.div(44).floor(), lx = xx.div(44).fract().sub(0.5).mul(44).abs();
    const si = lx.div(SW).floor(), fx = lx.div(SW).fract();
    const top = hs(ci).mul(7).add(-15).sub(si.mul(2));
    const clip = pV.mul(24).sub(32), yt = top.min(clip);            // they stack up course by course from below the frame
    const d = P.y.sub(yt);
    const inside = sk(d, 0);
    const riser = sk(inv(fx).mul(SW), 0.12).mul(step(-2, d)).mul(step(top.add(2), clip));
    const rim = sk(d.abs(), 0.13).max(riser);
    const inner = sk(d.add(1.3).abs(), 0.07).add(sk(vec2(fx.sub(0.5).mul(SW), d.add(2.6)).length(), 0.28));
    const col = mix(B, W, 0.45).mul(rim).add(mix(A, H2, flip).mul(inner.min(1)).mul(0.8)).mul(float(0.8).add(cul.mul(0.3)));
    return cutout(col, inside);
  }

  // ------------------------------------------------------------------ FORE: flame tears and small squares (drift up)
  if (layer === "fore") {
    const aa = fwidth(P.x).mul(1.2).max(0.01), sk = strokeAA(aa);
    const pF = io(0.66, 0.78, 0.8, 0.86);
    const ci = P.x.div(15).floor(), hc = hs(ci);
    const yy = P.y.sub(c.real.mul(hc.mul(2.5).add(1.8))).add(hc.mul(90));
    const ri = yy.div(46).floor(), h2 = hs(ci.mul(7.13).add(ri.mul(13.7)));
    const q = vec2(P.x.div(15).fract().sub(0.5).mul(15).sub(h2.sub(0.5).mul(6)).sub(c.real.mul(0.5).add(hc.mul(TAU)).sin().mul(1.4)), yy.div(46).fract().sub(0.5).mul(46));
    const pj = pF.mul(1.6).sub(h2.mul(7).fract().mul(0.6)).clamp(0, 1);
    // a flame tear: black body, neon rim, a hot core; it kindles from its base
    const rT = h2.mul(1.6).add(1.7), LT = rT.mul(3.4), t = q.y.div(LT).clamp(0, 1);
    const d = select(q.y.lessThan(0), q.length().sub(rT), q.x.abs().sub(rT.mul(inv(t)).mul(inv(t))).max(q.y.sub(LT)));
    const g = q.y.add(rT).div(LT.add(rT));
    const isT = step(0.62, h2).mul(maskDraw(pj, g));
    const tear = sk(d, 0).mul(isT);
    const tc = mix(H, H2, g.clamp(0, 1)).mul(sk(d.add(0.75), 0)).add(mix(B, W, 0.5).mul(sk(d.abs(), 0.12)));
    // small squares in threes: black panes, line rims
    const q2 = vec2(q.x, q.y.add(13.5).mod(9).sub(4.5)), ch = q2.x.abs().max(q2.y.abs()), sz = h2.mul(3).add(0.7);
    const isS = step(h2, 0.26).mul(step(q.y.abs(), 13.5)).mul(maskBeads(pj, q.y.div(27).add(0.5)));
    const sq = sk(ch, sz).mul(isS);
    const sc = mix(H2, W, 0.3).mul(sk(ch.sub(sz).abs(), 0.12)).add(A.mul(sk(ch.sub(sz.mul(0.45)).abs(), 0.1)));
    return cutout(tc.mul(tear).add(sc.mul(sq)).mul(float(0.85).add(cul.mul(0.3))), tear.max(sq));
  }

  // ------------------------------------------------------------------ THE BEING: the pyramid (breathes)
  const p = P.div(c.real.mul(TAU / 9).sin().mul(0.015).add(1));
  const aa = fwidth(p.x).mul(1.2).max(0.008), sk = strokeAA(aa);
  const ax = p.x.abs(), yb = p.y.sub(BASE);
  let col = vec3(0), cover = float(0);
  const lay = (body, lit) => { col = mix(col, lit, body); cover = cover.max(body); };

  // late detail: lashes radiating off the eye, growing out from the apex
  const e = p.sub(vec2(0, EY)), er = e.length(), ea = atan2(e.x, e.y);
  const pL = io(0.68, 0.8, 0.87, 0.9), nL = pk(11, 3).mul(4).add(18);
  const la = ea.div(TAU).mul(nL), lf = la.fract().sub(0.5).abs().mul(TAU).div(nL).mul(er);
  const lLen = pL.mul(1.5).sub(ea.abs().div(3.1416).mul(0.5)).clamp(0, 1).mul(la.floor().mod(2).mul(1.2).add(1.6)).mul(cul.mul(0.5).add(0.75));
  const lash = sk(lf, 0.14).mul(step(9.3, er)).mul(step(er, lLen.add(9.3))).mul(step(-4.2, e.y)).mul(step(0.01, lLen));
  lay(lash, mix(H, W, 0.35));

  // flanking cartouches and aztec crosses rising in a column each side; each unfolds as a stepped diamond
  const pG = io(0.5, 0.62, 0.88, 0.93);
  const gy = p.y.sub(c.real.mul(rn(6).mul(0.4).add(0.35))).div(7), gi = gy.floor(), side = step(p.x, 0);
  const gq = vec2(ax.sub(27), gy.fract().sub(0.5).mul(7)), gx = gq.x.abs(), gyy = gq.y.abs();
  const cy = p.y.sub(gq.y);
  const pj = pG.mul(1.5).sub(mix(side, inv(side), step(0.5, rn(5))).mul(0.5)).clamp(0, 1).mul(cy.add(12).min(float(21).sub(cy)).div(5).clamp(0, 1));
  const unfold = step(gx.add(gyy).mul(1.5).floor().div(7.5), pj.mul(1.1).sub(0.02));
  const isP = gi.add(side).mod(2), gk = hs(gi.add(side.mul(17))).mul(3).floor();
  const pill = rbox(gq, [0, 0], 2.1, 2.9, 2.0);
  const sym = sk(gq.length().sub(1).abs(), 0.13).add(sk(gq.length(), 0.35)).mul(is(gk, 0))
    .add(sk(gq.y.div(1.1).add(0.5).fract().sub(0.5).abs().mul(1.1), 0.16).mul(step(gx, 1)).mul(step(gyy, 1.6)).mul(is(gk, 1)))
    .add(sk(gx.add(gyy).sub(1.2).abs().mul(0.7), 0.12).mul(is(gk, 2)));
  const cd = gx.min(gyy).sub(0.75).max(gx.max(gyy).sub(2.3));
  const gd = mix(cd, pill, isP);
  const gl = mix(B, W, 0.4).mul(sk(gd.abs(), 0.13)).add(mix(mix(H2, H, isP).mul(sk(cd.add(0.42).abs(), 0.09).add(sk(gx.max(gyy), 0.3))), mix(H, H2, step(0.5, gk)).mul(sym.min(1)), isP).mul(sk(gd.add(0.3), 0)));
  lay(sk(gd, 0).mul(unfold), gl.mul(float(0.85).add(cul.mul(0.3))));

  // the courses: laid one at a time from the ground, each running its key the other way from the one below
  const nC = pk(2, 3).add(6), hC = float(HP).div(nC);
  const k = yb.div(hC).floor(), ly = yb.div(hC).fract(), wk = float(30).sub(k.mul(float(24).div(nC)));
  const pC = io(0, 0.38, 0.93, 0.99), tC = pC.mul(nC).sub(k).clamp(0, 1), vl = pk(3, 3), par = k.mod(2).mul(2).sub(1);
  const laid = mix(step(p.x.mul(mix(float(1), par, is(vl, 2))).div(wk).add(1).div(2), tC), step(ax.div(wk), tC), is(vl, 0)).mul(step(0.001, tC));
  const course = sk(ax.sub(wk), 0).mul(step(0, yb)).mul(step(yb, HP)).mul(laid);
  const cs = hC.mul(0.86), qy = ly.sub(0.5).div(0.86);
  const qx = p.x.add(c.real.mul(0.35).mul(par).mul(sense(13))).div(cs).fract().sub(0.5).mul(par);
  let kd;
  if (low) kd = qx.abs().max(qy.abs()).mul(3).fract().sub(0.5).abs().div(3);
  else { const q = vec2(qx, qy); KEY.forEach(([x, y, hx, hy]) => { const s = q.sub(vec2(x, y)).abs().sub(vec2(hx, hy)).max(0).length(); kd = kd ? kd.min(s) : s; }); }
  const key = sk(kd.mul(cs), cs.mul(0.05)).mul(step(qy.abs(), 0.5));
  const edge = sk(ly.sub(0.5).abs().sub(0.47).abs().mul(hC), 0.1).max(sk(ax.sub(wk).abs(), 0.14));
  const climbK = inv(ss(0, 1.2, k.sub(c.real.div(5).fract().mul(nC.add(3)).sub(1.5)).abs()));        // light walking up the steps
  const kickK = inv(ss(0.4, 0.6, k.sub(c.beat.fract().mul(nC)).abs())).mul(kickOn);
  const km = k.mod(3), cc = A.mul(is(km, 0)).add(B.mul(is(km, 1))).add(H2.mul(is(km, 2)));
  lay(course, mix(cc, W, climbK.mul(0.35)).mul(key).mul(float(0.7).add(climbK.mul(0.3)).add(kickK.mul(0.5)).add(cul.mul(0.25))).add(mix(B, W, 0.45).mul(edge).mul(0.9)));

  // the staircase climbs the middle; its treads swap black for light every other bar
  const pS = io(0.3, 0.44, 0.915, 0.94);
  const stair = sk(ax, 2.7).mul(step(0, yb)).mul(maskDraw(pS, yb.div(HP)));
  const tread = band(yb.div(hC).mul(3).add(flip.mul(0.5)).fract(), aa.mul(3).div(hC)).mul(sk(ax, 2.1));
  lay(stair, mix(H, W, 0.25).mul(tread).add(mix(B, W, 0.5).mul(sk(ax.sub(2.5).abs(), 0.12))));

  // the eye: a closed line first, then the lids part
  const pE = io(0.4, 0.52, 0.9, 0.93), open = pE.sub(0.25).div(0.75).clamp(0, 1).mul(c.real.mul(0.7).sin().mul(0.06).add(0.94));
  const hx = inv(e.x.div(8).mul(e.x.div(8))).max(0).mul(4.4);
  const ld = e.y.abs().sub(hx.mul(open));
  const drawn = step(e.x.abs(), pE.mul(4).min(1).mul(8));
  const ball = sk(ld, 0).mul(drawn).mul(step(0.001, open));
  const iris = sk(er, 3.5), irb = band(er.mul(0.9).sub(c.real.mul(0.25).mul(sense(14))).fract(), aa.mul(0.9));
  const gaze = e.sub(vec2(c.real.mul(0.23).sin().mul(0.8), 0)).length();
  let ec = mix(mix(B, W, 0.75).mul(0.9), mix(A, H, irb), iris);
  ec = mix(ec, vec3(0), sk(gaze, 1.3)).add(W.mul(sk(e.sub(vec2(-0.9, 1.0)).length(), 0.4)));
  lay(ball, ec.mul(float(0.85).add(cul.mul(0.3))));
  lay(sk(ld.abs(), 0.16).mul(drawn).mul(step(e.x.abs(), 8)).mul(step(0.001, pE)), mix(H2, W, 0.4));
  return cutout(col, cover);
}
