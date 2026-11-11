// THE MOON MOTHER: crescent bowl cradling two sleeping profiles (Rubin chalice) under 13 phase moons; layers world/ring/being/veil/fore by params.layer; seed ch 220-252.
// Entrances and exits are phase-crescent cells waxing/waning (ch 250-252); the world stays lit to the seam.
import { MeshBasicNodeMaterial, AdditiveBlending, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, mix, atan2, fwidth, select } from "builtin/tsl";
import { tripClock, visionShown, visionU, climb, maskDraw, maskBeads, maskIris, nib, stripes, inv, is } from "./lib/trip.js";

const TAU = 6.28318, S = 1.5;
const DEPTH = { world: 104, ring: 86, being: 74, veil: 64, fore: 52 };
const CY = -3, R = 11, ARC = 15, RM = 1.35, STEP = (210 / 12) * Math.PI / 180;
const FACE = [[10.4, 6.0], [9.2, 8.0], [7.2, 8.7], [5.4, 7.6], [4.2, 6.2], [3.5, 4.4], [3.4, 3.6], [3.8, 2.8], [2.1, 0.6], [2.3, 0.1],
  [3.2, -0.2], [2.9, -1.0], [3.3, -1.5], [2.9, -2.3], [3.5, -3.1], [3.0, -4.3], [3.6, -5.0], [4.8, -5.6], [5.6, -7.4]].map(([x, y]) => [x * 0.9, y * 0.9 + CY]);
const EYE = [4.9 * 0.9, 2.5 * 0.9 + CY];
const SKY = [
  [[50, 44], [60, 52], [72, 47], [81, 56], [94, 51], [101, 40]],
  [[66, 20], [76, 29], [88, 25], [98, 32], [110, 23], [105, 10]],
  [[26, 62], [35, 53], [45, 59], [42, 47], [53, 40]],
];

function polyline(q, pts) {
  const L = [0];
  for (let i = 1; i < pts.length; i++) L.push(L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  const total = L[L.length - 1];
  let d = float(1000), u = float(0);
  for (let i = 0; i < pts.length - 1; i++) {
    const [ax, ay] = pts[i], bx = pts[i + 1][0] - ax, by = pts[i + 1][1] - ay, bb = bx * bx + by * by, len = Math.sqrt(bb);
    const pa = q.sub(vec2(ax, ay));
    const h = pa.dot(vec2(bx, by)).div(bb).clamp(0, 1);
    const di = pa.sub(vec2(bx, by).mul(h)).length();
    const ui = h.mul(len).add(L[i]).div(total);
    u = select(di.lessThan(d), ui, u);
    d = d.min(di);
  }
  return { d, u };
}

export function material(ctx) {
  const layer = ctx.params.layer ?? "being";
  const c = tripClock(ctx);
  const u = visionU(ctx, c);
  const io = (a, b, x, y) => smoothstep(a, b, u).mul(inv(smoothstep(x, y, u)));   // an element's way in and its way out
  const rn = (n) => c.rnd(220 + n), pk = (n, k) => c.pick(220 + n, k);
  const sense = (n) => step(0.5, rn(n)).mul(2).sub(1);
  const fam = pk(0, 3), hot = pk(17, 3);
  const blue = vec3(0.05, 0.12, 1.0), violet = vec3(0.45, 0.05, 1.0), ice = vec3(0.45, 0.6, 1.0), W = vec3(1, 1, 1);
  const A = blue.mul(is(fam, 0)).add(violet.mul(is(fam, 1))).add(blue.mul(is(fam, 2)));   // body
  const B = violet.mul(is(fam, 0)).add(blue.mul(is(fam, 1))).add(ice.mul(is(fam, 2)));    // accent
  const H = vec3(1.0, 0.05, 0.6).mul(is(hot, 0)).add(vec3(1.0, 0.85, 0.05).mul(is(hot, 1))).add(vec3(0.1, 1.0, 0.15).mul(is(hot, 2))); // hot beads
  const P = positionGeometry.xy;
  const cyL = CY * S * DEPTH[layer] / 74;                       // her centre, in this layer's metres
  const live = visionShown(ctx, c, 0);
  const kickOn = step(0.001, c.kick);
  const mp = c.real.div(9.75).fract().mul(13);
  const tide = inv(mp.sub(6.5).abs().div(6.5));
  const cul = io(0.84, 0.9, 0.93, 0.96).mul(climb(c).mul(0.4).add(0.6));
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
const sv = pk(32, 3), cdir = (h) => { const a = h.mul(TAU).mul(is(sv, 2)).add(is(sv, 1).mul(1.5708)); return vec2(a.cos(), a.sin()); };
const SHAPE = (l, lp, h) => { const r = mix(0.42, 0.75, lp); return step(l.length(), r).mul(step(r, l.sub(cdir(h).mul(lp.mul(2.2).mul(r))).length())); };
const GQ = P.sub(vec2(0, cyL)).mul(74 / (DEPTH[layer] ?? 74));
const low = ctx.quality === "low";
const GL = { world: [6, 85, 0, 0.3], ring: [3.5, 42, 0.3, 0.45, 0.88, 0.97], being: [2.2, 22, 0, 0.32, 0.86, 0.96], veil: [4, 50, 0.55, 0.7, 0.83, 0.91], fore: [4, 60, 0.6, 0.75, 0.8, 0.88] }[layer] ?? [2.2, 22, 0, 0.32, 0.86, 0.96];
const cellsOf = (Q, cs, p, v, salt) => {
const rr = Q.length(), rf = rr.div(cs), ri = rf.floor(), n = ri.add(0.5).mul(TAU).floor().max(1);
const af = atan2(Q.y, Q.x).div(TAU).add(0.5).add(ri.mul(0.618)).fract().mul(n), ai = af.floor();
const l = vec2(af.fract().sub(0.5), rf.fract().sub(0.5));
const h = ri.mul(12.9898).add(ai.mul(78.233)).add(salt).sin().mul(43758.5453).fract();
const kr = rr.div(GL[1]).clamp(0, 1);
const k = kr.mul(0.85).add(h.mul(0.15)).mul(is(v, 0)).add(h.mul(is(v, 1))).add(ai.div(n).mul(0.7).add(kr.mul(0.3)).mul(is(v, 2)));
const lp = float(p).sub(k.mul(0.75)).div(0.25).clamp(0, 1);
return SHAPE(l, lp, h).max(step(0.999, lp)).mul(step(0.001, lp));
};
const SLOT = ctx.param("vw1", -1).sub(ctx.param("vw0", -1)).max(1);
const gCs = rn(33).mul(0.45).add(0.8).mul(GL[0]);
const gIn = cellsOf(GQ, gCs, smoothstep(GL[2], GL[3], u), pk(30, 3), 1.7);
const gOut = cellsOf(GQ, gCs.mul(1.2), inv(layer === "world" ? smoothstep(inv(float(0.4).div(SLOT)), 1, u) : smoothstep(GL[4], GL[5], u)), pk(31, 3), 5.3);
const G = gIn.mul(gOut);

  if (layer === "world") {
    const aa = fwidth(P.x).mul(1.2).max(0.02);
    const stroke = (d, w) => inv(smoothstep(float(w), aa.add(w), d));
    const q0 = P.sub(vec2(0, cyL)), ax = P.x.abs();
    const de = vec2(q0.x.div(1.5), q0.y).length();
    const grow = io(0.0, 0.3, 2, 3), Rg = grow.mul(118), lead = de.sub(Rg);
    const rings = step(lead.div(5).fract(), float(0.55).sub(lead.div(15).mul(0.5))).mul(step(lead, 15)).mul(step(0, lead));
    const cover = step(de, Rg).max(rings).mul(step(0.004, grow));
    const front = c.beat.fract().mul(110);
    const kl = inv(smoothstep(0, 5, de.sub(front).abs())).mul(kickOn).mul(inv(smoothstep(50, 110, front)));
    const yH = float(-18).add(tide.mul(5));
    const v = yH.sub(P.y).max(0);
    const ri = v.sqrt().mul(1.6).floor();
    const vc = ri.add(0.5).div(1.6), yc = yH.sub(vc.mul(vc));
    const wave = ax.mul(float(0.09).div(ri.mul(0.12).add(1))).add(c.real.mul(1.1)).add(ri.mul(1.3)).sin().mul(ri.mul(0.16).add(0.05)).mul(tide.mul(0.8).add(0.5));
    const sp = ri.mul(0.55).add(1.3);
    const cx = ax.sub(c.real.mul(ri.mul(0.5).add(1.5)).mul(sense(12))).div(sp).fract().sub(0.5).mul(sp);
    const br = ri.mul(0.07).add(0.14);
    const bead = inv(smoothstep(br.sub(aa), br, vec2(cx, P.y.sub(yc).sub(wave)).length())).mul(step(0.0001, v));
    const glade = smoothstep(v.mul(0.3).add(5), 0, ax).mul(tide);                       // the moon's path on the water
    const horizon = stroke(P.y.sub(yH).abs(), 0.07).mul(step(ax.div(3).fract(), 0.6));
    let col = mix(mix(A, B, ri.mod(2)), W, glade.mul(0.8)).mul(bead).mul(float(0.3).add(tide.mul(0.3)).add(kl.mul(0.7)).add(glade.mul(0.5)));
    col = col.add(A.mul(horizon).mul(0.5));
    const th = rn(10).sub(0.5).mul(0.8).add(c.real.mul(0.004).mul(sense(11)));
    const sq = vec2(ax, P.y.sub(10)), cs = th.cos(), sn = th.sin();
    const sk = vec2(sq.x.mul(cs).sub(sq.y.mul(sn)), sq.x.mul(sn).add(sq.y.mul(cs)).add(10));
    const pst = io(0.5, 0.62, 2, 3), pln = io(0.56, 0.7, 2, 3);
    const above = step(yH.add(1), P.y);
    let lines = float(0), nibs = float(0), stars = float(0), n = 0;
    SKY.forEach((pts, j) => {
      const pl = polyline(sk, pts), pj = pln.mul(1.5).sub(j * 0.25).clamp(0, 1);
      lines = lines.max(stroke(pl.d, 0.08).mul(maskDraw(pj, pl.u)));
      nibs = nibs.max(nib(pj, pl.u, 0.03).mul(stroke(pl.d, 0.35)).mul(step(pj, 0.995)).mul(step(0.005, pj)));
      for (const [x, y] of pts) {
        const d = sk.sub(vec2(x, y)).abs(), sz = 1.1 + (n % 3) * 0.45;
        const s4 = d.x.div(sz).sqrt().add(d.y.div(sz).sqrt());
        stars = stars.max(inv(smoothstep(0.9, 1, s4)).mul(maskBeads(pst, n / 17)));
        n++;
      }
    });
    col = col.add(A.mul(lines).mul(0.45).add(W.mul(nibs).mul(1.2)).mul(inv(stars)).add(mix(B, W, 0.7).mul(stars).mul(float(0.8).add(kl))).mul(above));
    m.colorNode = col;
    m.opacityNode = cover.mul(live).mul(G);
    m.alphaTest = 0.5;
    return m;
  }

  if (layer === "ring") {
    const aa = fwidth(P.x).mul(1.2).max(0.02);
    const q0 = P.sub(vec2(0, cyL)), rr = q0.length();
    const blur = aa.mul(3.5);
    const stroke = (d, w) => inv(smoothstep(float(w), blur.add(w), d));
    const k = atan2(q0.x, q0.y).div(TAU).abs().mul(2);                    // 0 top .. 1 bottom, both sides at once
    const pe = io(0.4, 0.5, 0.95, 0.975), pe2 = io(0.43, 0.53, 0.95, 0.975), pb = io(0.42, 0.56, 0.95, 0.975), pc = io(0.48, 0.6, 0.945, 0.97);
    const front = c.beat.fract().mul(50);
    const kl = inv(smoothstep(0, 3.5, rr.sub(front).abs())).mul(kickOn).mul(inv(smoothstep(24, 50, front)));
    const l1 = stroke(rr.sub(39.6).abs(), 0.08).mul(maskDraw(pe, k));
    const l2 = stroke(rr.sub(37.4).abs(), 0.06).mul(maskDraw(pe2, k));
    const rot = c.real.div(mix(60, 110, rn(5))).mul(sense(6));            // its own clock and sense
    const an = atan2(q0.y, q0.x).div(TAU).add(rot).fract().mul(28);
    const quarter = step(an.floor().mod(7), 0.5);
    const loc = an.fract().sub(0.5).mul(TAU * 38.5 / 28);
    const db = vec2(loc, rr.sub(38.5)).length();
    const rad = mix(float(0.42), float(0.75), quarter);
    const bead = inv(smoothstep(rad.sub(blur), rad, db)).mul(maskBeads(pb, k));
    const an2 = atan2(q0.y, q0.x).div(TAU).sub(rot.mul(1.7)).fract().mul(13);
    const i2 = an2.floor(), lx = an2.fract().sub(0.5).mul(TAU * 32.5 / 13), ly = rr.sub(32.5);
    const off = i2.div(12).mul(2).sub(1).mul(1.5);
    const cr = inv(smoothstep(float(1.3).sub(blur), 1.3, vec2(lx, ly).length())).mul(smoothstep(float(1.3).sub(blur), 1.3, vec2(lx.sub(off), ly).length()).max(is(i2, 6))).mul(maskBeads(pc, k));
    const dash = stroke(rr.sub(32.5).abs(), 0.04).mul(step(vec2(lx, ly).length(), 4.5)).mul(step(1.8, lx.abs())).mul(maskDraw(pc, k));
    const lit = float(0.4).add(cul.mul(0.45)).add(kl.mul(0.8));
    m.colorNode = A.mul(l1.add(l2).mul(lit)).add(mix(B, W, quarter).mul(bead).mul(lit.add(0.2))).add(mix(B, W, 0.5).mul(cr).mul(lit.add(0.1))).add(B.mul(dash).mul(0.35));
    m.opacityNode = live.mul(G);
    m.transparent = true;
    m.blending = AdditiveBlending;
    m.depthWrite = false;
    return m;
  }

  if (layer === "veil") {
    const aa = fwidth(P.x).mul(1.2).max(0.02);
    const ax = P.x.abs(), nM = pk(4, 3).add(3);
    const fold = inv(smoothstep(0.935, 0.96, u));                          // they leave by folding their wings
    let col = vec3(0), cover = float(0);
    const LANE = [2, 0, 3, 1, 4];
    for (let j = 0; j < (low ? 3 : 5); j++) {
      const age = u.sub(0.62 + j * 0.04).mul(24);
      const yj = float(-50).add(age.mul(7 + j * 0.8));
      const xj = float(27 + LANE[j] * 8.5).add(age.mul(0.7).add(j * 2.1).sin().mul(3));
      const size = 3.4 + (j % 2) * 0.9;
      const q = vec2(ax.sub(xj), P.y.sub(yj)).div(size);
      const flap = c.real.mul(3.1).add(j * 1.7).sin().abs().mul(0.7).add(0.3).mul(fold);
      const on = step(j + 0.5, nM).mul(step(0, age)).mul(step(0.03, fold)).mul(step(q.length(), 2.2));
      const mx = q.x.abs().div(flap.max(0.03));
      const up = vec2(mx.sub(0.85).div(0.85), q.y.sub(0.35).div(0.6)), lo = vec2(mx.sub(0.55).div(0.55), q.y.add(0.45).div(0.42));
      const dU = up.length(), dL = lo.length();
      const body = step(q.x.abs(), 0.11).mul(step(q.y.abs(), 0.8));
      const wing = step(dU, 1).max(step(dL, 1));
      const e = aa.div(size * 0.6);
      const bU = step(dU.sub(0.72).abs(), 0.13).mul(step(atan2(up.y, up.x).div(TAU).mul(10).fract(), 0.5)).mul(step(dU, 1));
      const bL = step(dL.sub(0.66).abs(), 0.15).mul(step(atan2(lo.y, lo.x).div(TAU).mul(7).fract(), 0.5)).mul(step(dL, 1)).mul(inv(step(dU, 1)));
      const spot = inv(smoothstep(float(0.3).sub(e), 0.3, dU));
      const rim = step(0.92, dU).mul(step(dU, 1)).max(step(0.9, dL).mul(step(dL, 1)).mul(inv(step(dU, 1))));
      const cj = mix(B, W, 0.45).mul(bU).add(A.mul(bL)).add(H.mul(spot)).add(A.mul(rim).mul(0.6)).mul(inv(body)).add(mix(B, W, 0.8).mul(body)).mul(float(0.75).add(cul.mul(0.3)));
      const cv = wing.max(body).mul(on);
      col = mix(col, cj, cv); cover = cover.max(cv);
    }
    m.colorNode = col;
    m.opacityNode = cover.mul(live).mul(G);
    m.alphaTest = 0.5;
    return m;
  }

  if (layer === "fore") {
    const aa = fwidth(P.x).mul(1.2).max(0.01);
    const ax = P.x.abs(), pin = io(0.6, 0.8, 0.93, 0.955);
    let col = vec3(0), cover = float(0);
    for (let j = 0; j < (low ? 3 : 5); j++) {
      const xj = c.real.mul(0.02 * (1 + j * 0.3)).mul(sense(12)).add(j * 0.21).fract().mul(34).add(22);
      const yj = xj.mul(0.16).sub(c.real.mul(0.7)).add(j * 1.9).sin().mul(3.2).add(-25 + (j % 2) * 5);
      const rad = 0.9 + (j % 3) * 0.35;
      const q = vec2(ax.sub(xj), P.y.sub(yj)).div(rad);
      const pj = pin.mul(1.6).sub(j * 0.15).clamp(0, 1);
      const disc = inv(smoothstep(inv(aa.div(rad)), 1, q.length())).mul(step(0.01, pj));
      const lit = disc.mul(smoothstep(inv(aa.div(rad)), 1, q.sub(vec2(pj.mul(0.7).sub(1.1).mul(-1).sub(0.4), 0.15)).length()));
      col = mix(col, mix(B, W, 0.6).mul(lit).mul(float(0.8).add(cul.mul(0.3))), disc); cover = cover.max(disc);
    }
    m.colorNode = col;
    m.opacityNode = cover.mul(live).mul(G);
    m.alphaTest = 0.5;
    return m;
  }

  const p = P.div(c.real.mul(TAU / 7).sin().mul(0.02).add(1).mul(S));
  const aa = fwidth(p.x).mul(1.2).max(0.008);
  const q0 = p.sub(vec2(0, CY)), rr = q0.length();
  const front = c.beat.fract().mul(30);
  const kl = inv(smoothstep(0, 2.2, rr.sub(front).abs())).mul(kickOn).mul(inv(smoothstep(14, 30, front)));
  const stroke = (d, w) => inv(smoothstep(float(w), aa.add(w), d));
  let col = vec3(0), cover = float(0);
  const add = (colour, mask) => { col = col.add(colour.mul(mask)); cover = cover.max(mask); };
  const solid = (mask) => { col = col.mul(inv(mask)); cover = cover.max(mask); };

  const pd = io(0.0, 0.07, 0.975, 1.0), pg = io(0.01, 0.1, 0.97, 0.995);
  solid(step(rr, pd.mul(R)));
  const kTop = atan2(q0.x, q0.y).div(TAU).abs().mul(2);
  const ghost = stroke(rr.sub(R).abs(), 0.05).mul(step(atan2(q0.y, q0.x).div(TAU).mul(90).fract(), 0.4)).mul(maskDraw(pg, kTop));
  add(W.mul(0.3), ghost);
  add(W.mul(1.3), nib(pg, kTop, 0.03).mul(stroke(rr.sub(R).abs(), 0.25)).mul(step(pg, 0.99)).mul(step(0.01, pg)));

  const th = atan2(q0.x, q0.y);
  const idx = th.div(STEP).round().add(6).clamp(0, 12);
  const thi = idx.sub(6).mul(STEP);
  const q = q0.sub(vec2(thi.sin(), thi.cos()).mul(ARC)).div(RM), qr = q.length();
  const fi = idx.div(12), ord = pk(2, 3), off = idx.sub(6).abs().div(6);
  const ki = inv(off).mul(is(ord, 0)).add(off.mul(is(ord, 1))).add(fi.mul(is(ord, 2)));
  const pm = u.sub(0.12).sub(ki.mul(0.14)).div(0.05).clamp(0, 1).mul(inv(smoothstep(0.96, 0.99, u)));
  const wax = fi.lessThanEqual(0.5);
  const f = select(wax, fi.mul(pm), inv(inv(fi).mul(pm)));
  const ct = f.mul(TAU).cos().mul(inv(q.y.mul(q.y)).max(0).sqrt());
  const e = aa.div(RM);
  const litSide = select(wax, smoothstep(ct.sub(e), ct.add(e), q.x), inv(smoothstep(ct.negate().sub(e), ct.negate().add(e), q.x)));
  const started = step(0.001, pm);
  const disc = inv(smoothstep(inv(e), 1, qr));
  const mfill = disc.mul(litSide).mul(started);
  const mrim = stroke(qr.sub(1).abs().mul(RM), 0.05).mul(step(atan2(q.y, q.x).div(TAU).mul(24).fract(), 0.55)).mul(started);
  const here = is(idx, mp.floor()).mul(io(0.3, 0.34, 0.95, 0.96));
  const halo = stroke(qr.sub(1.5).abs().mul(RM), 0.07).mul(here);
  const mlit = float(0.55).add(kl.mul(0.6)).add(cul.mul(0.45)).add(here.mul(0.4));
  solid(disc.mul(started));
  add(mix(B, W, 0.75).mul(mlit), mfill);
  add(B.mul(0.6).add(kl.mul(0.5)), mrim.mul(inv(mfill)));
  add(H, halo);

  const pc = io(0.2, 0.32, 0.96, 0.99);
  const occ = q0.sub(vec2(0, pc.mul(4.2))).length();
  const cres = inv(smoothstep(float(R).sub(aa), R, rr)).mul(smoothstep(float(R).sub(aa), R, occ));
  const edgeOut = stroke(rr.sub(R).abs(), 0.09).mul(smoothstep(float(R).sub(0.3), R, occ));
  const edgeIn = stroke(occ.sub(R).abs(), 0.07).mul(smoothstep(float(R).add(0.3), R, rr)).mul(step(0.002, pc));
  const hatch = step(occ.sub(R).div(0.5).fract(), 0.16).mul(cres);
  const angB = atan2(q0.x, q0.y.negate()).div(TAU).abs().mul(2);       // 0 bottom .. 1 top, both horns
  const comet = inv(smoothstep(0, 0.08, angB.sub(c.real.div(mix(4.5, 8, rn(18))).fract()).abs()));
  const bj = atan2(q0.y, q0.x).div(TAU).mul(56).fract().sub(0.5).mul(TAU * (R - 0.8) / 56);
  const bd = vec2(bj, rr.sub(R - 0.8)).length();
  const cbead = inv(smoothstep(float(0.2).sub(aa), 0.2, bd)).mul(smoothstep(float(R).add(0.25), R + 0.45, occ));
  const clit = float(0.5).add(kl.mul(0.7)).add(cul.mul(0.5)).add(comet.mul(0.6));
  add(A.mul(float(0.45).add(kl.mul(0.5)).add(cul.mul(0.3))), hatch);
  add(mix(A, W, 0.6).mul(clit), edgeOut.max(edgeIn));
  add(mix(B, W, comet.add(kl).min(1)).mul(clit.add(0.2)), cbead);

  const sh = pk(1, 3).sub(1).mul(0.3);
  const fq = vec2(p.x.abs().sub(sh), p.y);
  const pl = polyline(fq, FACE);
  const pf = io(0.08, 0.24, 0.955, 0.985);
  const fline = stroke(pl.d, 0.07).mul(maskDraw(pf, pl.u));
  const fnib = nib(pf, pl.u, 0.025).mul(stroke(pl.d, 0.22)).mul(step(pf, 0.995)).mul(step(0.005, pf));
  const fbeads = stroke(pl.d.sub(0.55).abs(), 0.09).mul(step(pl.u.mul(70).fract(), 0.3)).mul(maskBeads(io(0.6, 0.72, 0.94, 0.96), pl.u));

  let fx = float(FACE[2][0]);
  for (let i = 2; i < FACE.length - 1; i++) {
    const [x0, y0] = FACE[i], [x1, y1] = FACE[i + 1];
    fx = select(p.y.lessThan(y0), mix(float(x1), float(x0), p.y.sub(y1).div(y0 - y1).clamp(0, 1)), fx);
  }
  const yT = FACE[3][1], yB = FACE[FACE.length - 1][1];
  const inBowl = step(q0.sub(vec2(0, 4.2)).length(), R - 0.25).mul(step(rr, R - 0.25));
  const inChal = step(fq.x, fx.sub(0.22)).mul(step(yB, p.y)).mul(step(p.y, yT)).mul(inBowl);
  const inFace = step(fx.add(0.22), fq.x).mul(inBowl);
  const fc = u.sub(0.7).mul(TAU * 6.5).cos(), vB = step(0.5, rn(9)), fg = io(0.7, 0.74, 0.93, 0.95);
  const g = smoothstep(-0.25, 0.25, fc), x0 = fc.mul(8);
  const litF = mix(g, inv(smoothstep(2.5, 5, p.x.sign().mul(7).sub(x0).abs())), vB).mul(fg);   // variant B: a light crossing left-chalice-right
  const litC = mix(inv(g), inv(smoothstep(2, 4.5, x0.abs())), vB).mul(fg);
  const faceFill = inFace.mul(step(p.y.sub(CY - R).div(2 * R), litF.mul(1.05))).mul(step(0.01, litF)).mul(stripes(p.y, 1.5, 0.05));
  const chalFill = inChal.mul(step(p.y.sub(yB).div(yT - yB), litC.mul(1.05))).mul(step(0.01, litC)).mul(stripes(pl.d, 1.3, 0.05));
  add(mix(A, W, 0.3).mul(float(0.75).add(kl.mul(0.4))), faceFill);
  add(mix(B, W, 0.75).mul(float(0.9).add(kl.mul(0.4))), chalFill);
  add(mix(B, W, 0.7).mul(float(0.7).add(kl.mul(0.4)).add(cul.mul(0.4))), fline);
  add(W.mul(1.4), fnib);
  add(B.mul(0.9).add(kl.mul(0.4)), fbeads);

  const ex = fq.x.sub(EYE[0]), ey = p.y.sub(EYE[1]), dx = ex.div(0.8), base = inv(dx.mul(dx)), pe = io(0.5, 0.56, 0.95, 0.97);
  const inX = step(dx.abs(), pe);
  const open = smoothstep(0.3, 0.8, cul);
  const lowY = base.mul(-0.24), upY = mix(base.mul(-0.24), base.mul(0.38), open);
  const lids = stroke(ey.sub(lowY).abs(), 0.05).max(stroke(ey.sub(upY).abs(), 0.05).mul(step(0.02, open))).mul(inX);
  const almond = step(lowY, ey).mul(step(ey, upY)).mul(inX);
  const pupil = inv(smoothstep(float(0.2).sub(aa), 0.2, vec2(ex.add(0.12), ey.sub(0.02)).length())).mul(almond);
  let lash = float(0);
  [-0.45, 0, 0.45].forEach((lx, i) => { lash = lash.max(inv(smoothstep(0.05, 0.08, vec2(ex.sub(lx * 0.8), ey.add(0.42 - lx * lx * 0.5)).length())).mul(maskBeads(io(0.54, 0.6, 0.95, 0.97), i / 3))); });
  solid(almond);
  add(W.mul(0.9), lids);
  add(H.mul(1.2), pupil);
  add(B.mul(0.8), lash.mul(inv(open)));
  const cv = pk(3, 3), cp = smoothstep(0.1, 0.6, cul), vq = p.sub(vec2(0, 1.4 + CY));
  const vdisc = inv(smoothstep(float(1.05).sub(aa), 1.05, vq.length())).mul(maskIris(cp, vq.length().div(1.05)));
  const sa = vq.x.abs().div(1.5).sqrt().add(vq.y.abs().div(1.5).sqrt());
  const vstar = inv(smoothstep(inv(aa), 1, sa.div(cp.add(0.001))));
  let vbeads = float(0);
  for (let i = 0; i < 3; i++) vbeads = vbeads.max(inv(smoothstep(0.3, 0.34, vq.sub(vec2(0, -1.3 + i * 1.3)).length())).mul(maskBeads(cp, i / 3)));
  const gift = vdisc.mul(is(cv, 0)).add(vstar.mul(is(cv, 1))).add(vbeads.mul(is(cv, 2))).min(1);
  solid(gift);
  add(mix(H, W, 0.35), gift);

  const sp = io(0.55, 0.68, 0.94, 0.96);
  for (let i = 0; i < (low ? 2 : 3); i++) {
    const r0 = rn(14 + i);
    const sx = r0.mul(12).add(17.5), sy = r0.mul(7.31).fract().mul(26).sub(13);
    const sz = r0.mul(3.7).fract().mul(0.7).add(0.6).mul(c.kick.mul(0.35).add(1));
    const d = vec2(p.x.abs().sub(sx), p.y.sub(sy));
    const s4 = d.x.abs().div(sz).sqrt().add(d.y.abs().div(sz).sqrt());
    add(mix(B, W, 0.85), inv(smoothstep(inv(aa.div(sz)), 1, s4)).mul(maskBeads(sp, i / 3)));
  }

  const thS = atan2(q0.x, q0.y).abs(), inArc = step(thS, 6.5 * STEP);
  solid(step(rr, R + 0.6).max(step(rr, ARC + RM + 0.5).mul(inArc)).mul(step(0.004, pd)));
  m.colorNode = col;
  m.opacityNode = cover.mul(live).mul(G);
  m.alphaTest = 0.5;
  return m;
}
