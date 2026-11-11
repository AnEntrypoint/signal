// STAR CHILD vision: contour-line seated child in a nursery of constellations; layers world/ring/being/veil/fore by params.layer; seed ch 380-399
import { MeshBasicNodeMaterial, AdditiveBlending, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, mix, atan2, fwidth } from "builtin/tsl";
import { tripClock, visionShown, visionU, climb, maskDraw, maskBeads, maskIris, maskClock, maskLid, nib, BPS, inv, is, ang2, smin, capsule, segH, rbox, strokeAA, ioU, famPick, NEON } from "./lib/trip.js";
const TAU = 6.28318, PI = 3.14159;
const HY = 1.6;
const HEAD = [0, 8.6], HR = 1.7;
const SP = 0.7;
const { BLU, VIO, PNK, ORA, YEL, GRN, W, BG } = NEON;
const FAMS = [[BLU, VIO, PNK], [VIO, PNK, ORA], [BLU, GRN, YEL], [PNK, ORA, YEL]];
const ANIMALS = [
{ s: [[1, 0, .1, .45], [.1, .45, -.55, 0], [-.55, 0, .1, -.45], [.1, -.45, 1, 0], [-.55, 0, -1, .38]], e: [.5, .1], m: 0 },
{ s: [[-.5, -.35, -.5, .6], [-.5, .6, -.15, .3], [-.15, .3, .15, .3], [.15, .3, .5, .6], [.5, .6, .5, -.35]], e: [.22, .05], m: 1 },
{ s: [[-1, .3, -.45, -.02], [-.45, -.02, 0, .18], [0, .18, .45, -.02], [.45, -.02, 1, .3], [0, .18, 0, -.4]], e: [0, .36], m: 0 },
{ s: [[-1, -.1, -.5, .3], [-.5, .3, 0, -.15], [0, -.15, .5, .25], [.5, .25, .95, 0], [.95, 0, 1.15, .22]], e: [.98, .2], m: 0 },
];
const SLOTS = [[-88, 40, 11], [90, 36, 11], [-94, -8, 9], [96, -12, 9]];
export function material(ctx) {
const layer = ctx.params.layer ?? "being";
const c = tripClock(ctx);
const u = visionU(ctx, c);
const vw0 = ctx.param("vw0", -1), vw1 = ctx.param("vw1", -1);
const tAt = (x) => c.sec.sub(vw0.add(vw1.sub(vw0).mul(x)));
const io = ioU(u);
const live = visionShown(ctx, c, 0);
const cul = io(0.85, 0.89, 0.93, 0.95).mul(climb(c).mul(0.6).add(0.4));
const rn = (k) => c.rnd(380 + k), pk = (k, n) => c.pick(380 + k, n);
const fam = pk(0, 4);
const pickF = (j) => famPick(FAMS, fam, j);
const C1 = pickF(0), C2 = pickF(1), C3 = pickF(2);
const p0 = positionGeometry.xy;
const aa = fwidth(p0.x).mul(1.2).max(0.01);
const stroke = strokeAA(aa);
const m = new MeshBasicNodeMaterial();
m.side = DoubleSide;
m.fog = false;
const cutout = (col, cover) => { m.colorNode = col; m.opacityNode = cover.mul(live); m.alphaTest = 0.5; return m; };
if (layer === "world") {
const P = vec2(p0.x.mul(step(0.5, rn(9)).mul(2).sub(1)), p0.y), R = P.length(), ang = ang2(P.x, P.y);
const grow = smoothstep(0.25, 0.45, u).mul(inv(smoothstep(0.955, 0.985, u)));
const nsc = pk(19, 3).mul(4).add(10);
const Rf = grow.mul(grow).mul(185);
const front = Rf.sub(inv(ang.mul(nsc).mul(0.5).cos().abs()).mul(7));
const cover = step(R, front).mul(step(1, Rf));
const lag = smoothstep(front.sub(2), front.sub(16), R);
let col = vec3(0);
col = col.add(mix(C1, W, 0.2).mul(stroke(R.sub(front).abs().sub(0.35), 0.2)));
const lane = R.sub(front.sub(3.5)), at = ang.mul(nsc).mul(3).div(TAU);
col = col.add(mix(C3, W, 0.3).mul(0.8).mul(stroke(vec2(at.fract().sub(0.5).mul(R.mul(TAU).div(nsc.mul(3))), lane).length(), 0.6)));
const CY = -190, OFF = 4.2, SPG = 7;
const dc = P.sub(vec2(0, CY)).length(), dg = P.sub(vec2(0, CY - OFF)).length();
const ph = c.real.div(9).mul(step(0.5, rn(11)).mul(2).sub(1));
const fz = dc.sub(150).div(SPG);
const f = fz.sub(ph), g = dg.sub(150).div(SPG).sub(ph);
const ground = smoothstep(5.2, 4.2, fz);
const lf = stroke(f.add(0.5).fract().sub(0.5).abs().mul(SPG), 0.16), lg = stroke(g.add(0.5).fract().sub(0.5).abs().mul(SPG), 0.16);
const kb = f.floor(), cres = step(kb.add(0.5), g.floor());
const odd = kb.mod(2);
const thc = ang2(P.x, P.y.sub(CY)).mul(dc);
const stripe = step(0.5, thc.div(1.4).fract()).mul(inv(odd));
const bt = thc.div(2.2);
const bead = stroke(vec2(bt.fract().sub(0.5).mul(2.2), f.fract().sub(0.72).mul(SPG)).length(), 0.55).mul(odd);
col = col.add(C1.mul(0.55).mul(lf).add(C2.mul(0.55).mul(lg))
.add(mix(C1, W, 0.35).mul(0.3).mul(stripe.mul(cres))).add(mix(C3, W, 0.3).mul(0.7).mul(bead.mul(cres))).mul(ground).mul(lag));
const sky = smoothstep(4.8, 5.8, fz);
const kr = R.sub(30).div(6).round().clamp(0, 18), rk = kr.mul(6).add(30), nk = rk.mul(TAU / 3.5).round();
const ak = ang.div(TAU).mul(nk);
const sdot = stroke(vec2(ak.add(0.5).fract().sub(0.5).mul(rk.mul(TAU).div(nk)), R.sub(rk)).length(), 0.26);
const tw = ak.floor().mul(0.9).sub(c.real.mul(2.2)).add(kr.mul(1.3)).sin().mul(0.45).add(0.55);
col = col.add(mix(C1, W, 0.2).mul(0.65).mul(sdot).mul(tw).mul(sky).mul(lag).mul(step(26, R)));
const deal = pk(8, 4);
SLOTS.forEach(([sx, sy, S], i) => {
const a = deal.add(i).mod(4);
const sel = (fn) => ANIMALS.reduce((acc, A, k) => acc.add(fn(A).mul(is(a, k))), vec2(0));
const q = P.sub(vec2(sx, sy)).div(S);
const t0 = 0.46 + 0.06 * i;
const pe = smoothstep(0.945 + 0.004 * (3 - i), 0.953 + 0.004 * (3 - i), u);
const pd = smoothstep(t0, t0 + 0.05, u).mul(inv(pe));
const wake = smoothstep(t0 + 0.05, t0 + 0.08, u).mul(inv(smoothstep(0.94, 0.945, u)));
const near = step(q.length(), 1.6).mul(step(R, front.sub(4)));
for (let s = 0; s < 5; s++) {
const A = sel((X) => vec2(X.s[s][0], X.s[s][1])), B = sel((X) => vec2(X.s[s][2], X.s[s][3]));
const { d, h } = segH(q, A, B);
const ps = pd.mul(5).sub(s).clamp(0, 1);
const dm = d.mul(S);
const lw = mix(0.12, 0.34, wake);
const line = stroke(dm, lw).mul(maskDraw(ps, h)).mul(step(0.001, ps));
col = col.add(mix(W.mul(0.7), mix(C3, W, 0.2), wake).mul(line).mul(near));
col = col.add(W.mul(1.4).mul(nib(ps, h, 0.08)).mul(stroke(dm, 0.8)).mul(step(ps, 0.99)).mul(step(0.01, ps)).mul(near));
const sb = q.sub(B).mul(S).abs(), s4 = sb.x.sqrt().add(sb.y.sqrt());
const star = inv(smoothstep(0.9, 1.25, s4)).mul(inv(pe));
col = col.add(mix(C2, W, 0.6).mul(star).mul(near).mul(c.real.mul(1.7 + 0.3 * s).add(i * 2 + s).sin().mul(0.25).add(0.85)));
}
const E = sel((X) => vec2(X.e[0], X.e[1])), mf = sel((X) => vec2(X.m, 0)).x;
const qe = vec2(mix(q.x, q.x.abs(), mf), q.y).sub(E).mul(S);
const blink = inv(step(c.real.div(3.1).add(i * 0.37).fract(), 0.05));
const open = wake.mul(blink);
const eye = stroke(qe.length().sub(1.0).abs(), 0.16).max(inv(smoothstep(0.4, 0.5, qe.length()))).mul(maskLid(open, qe.y.div(1.15)));
col = col.add(mix(C3, W, 0.5).mul(1.2).mul(eye).mul(near));
});
return cutout(col.mul(0.85).add(BG), cover);
}
if (layer === "ring") {
const p = p0, rr = p.length();
const blur = aa.mul(4).add(0.2);
const soft = (d, w) => smoothstep(blur.add(w), float(w), d);
const sense = step(0.5, rn(4)).mul(2).sub(1);
const T = mix(70, 120, rn(6));
const rotC = c.real.div(T).mul(sense), rotS = c.real.div(T.mul(0.7)).mul(sense).negate();
const R = 25, S = R * Math.sqrt(Math.PI) / 2;
const a = ang2(p.x, p.y);
const xo = inv(smoothstep(0.95, 0.97, u));
const pc = smoothstep(0.40, 0.48, u).mul(xo), ps = smoothstep(0.44, 0.54, u).mul(xo);
const circ = soft(rr.sub(R).abs(), 0.06).mul(maskClock(pc, a));
const at = a.div(TAU).add(rotC).fract().mul(48);
const tq = at.fract().sub(0.5).mul(TAU * R / 48);
const tick = smoothstep(blur.add(0.3), 0.3, vec2(tq, rr.sub(R)).length()).mul(maskBeads(pc, a.div(TAU).add(0.5)));
const twoSq = pk(5, 2);
let sq = float(0);
for (let s = 0; s < 2; s++) {
const angS = rotS.mul(TAU).add(s * PI / 3), cs = angS.cos(), sn = angS.sin();
const rp = vec2(p.x.mul(cs).sub(p.y.mul(sn)), p.x.mul(sn).add(p.y.mul(cs)));
const sd = rp.y.negate().max(rp.x.mul(0.866).add(rp.y.mul(0.5))).max(rp.x.mul(-0.866).add(rp.y.mul(0.5))).sub(S * 0.62).abs();
const k = ang2(rp.y, rp.x).div(TAU).add(0.5).fract();
sq = sq.max(soft(sd, 0.06).mul(maskDraw(ps, k)).mul(s === 0 ? float(1) : is(twoSq, 1)));
}
const lit = float(0.75).add(cul.mul(0.3)).add(c.kick.mul(0.3));
let col = C1.mul(circ).mul(lit).add(mix(C2, W, 0.4).mul(tick).mul(lit)).add(C2.mul(sq).mul(lit.mul(0.7)));
const MY = 36, K = 0.27, np = pk(12, 2).add(2);
const thread = soft(p.x.abs(), 0.05).mul(step(MY, p.y)).mul(maskDraw(smoothstep(0.47, 0.50, u).mul(xo), inv(p.y.sub(MY).div(30))));
col = col.add(mix(C2, W, 0.3).mul(0.5).mul(thread));
for (let o = 0; o < 3; o++) {
const Ro = 15 + o * 11, q = p.sub(vec2(0, MY - o * 1.5));
const e = vec2(q.x, q.y.div(K)), el = e.length();
const gl = vec2(q.x, q.y.div(K * K)).length().div(el.max(0.001));
const de = el.sub(Ro).div(gl.max(0.001)).abs();
const po = smoothstep(0.48 + o * 0.03, 0.54 + o * 0.03, u).mul(inv(smoothstep(0.95 - o * 0.003, 0.962 - o * 0.003, u)));
const ea = ang2(e.x, e.y);
col = col.add(mix(C1, C2, o / 2).mul(0.6).mul(soft(de, 0.05)).mul(maskClock(po, ea)));
const so = sense.mul(o % 2 ? -1 : 1), spd = c.real.mul(TAU).div(14 + o * 6).mul(so);
const slotA = ea.sub(spd).div(TAU).mul(np).round(), pa = slotA.mul(TAU).div(np).add(spd);
const pp = vec2(pa.sin().mul(Ro), pa.cos().mul(Ro * K));
const back = pa.cos().mul(-0.5).add(0.5).mul(0.5).add(0.5);
const pr = float(1.1 + o * 0.35).mul(back);
const pd = q.sub(pp).length();
const planet = soft(pd.sub(pr), 0.0).add(soft(pd.sub(pr.mul(1.7)).abs(), 0.06).mul(0.6));
col = col.add(mix(C3, W, 0.35).mul(planet).mul(back).mul(step(0.98, po)).mul(lit.add(0.3)));
}
const sh = visionShown(ctx, c, 0);
m.colorNode = col.mul(sh);
m.opacityNode = sh;
m.transparent = true;
m.blending = AdditiveBlending;
m.depthWrite = false;
return m;
}
if (layer === "veil") {
const p = p0;
let col = vec3(0), cover = float(0);
const two = pk(13, 2);
for (let i = 0; i < 2; i++) {
const sg = i === 0 ? -1 : 1;
const has = i === 0 ? float(1) : is(two, 1).max(float(0));
const piv = vec2(sg * 26, 44), L = 30 + i * 4;
const sw = c.real.mul(TAU / (7.5 + i * 1.3)).add(i * 1.7).sin().mul(0.16).mul(sg);
const dir = vec2(sw.sin(), sw.cos().negate());
const pt = smoothstep(0.62 + i * 0.02, 0.66 + i * 0.02, u).mul(inv(smoothstep(0.955 - i * 0.004, 0.962 - i * 0.004, u)));
const pm = smoothstep(0.66 + i * 0.02, 0.71 + i * 0.02, u).mul(inv(smoothstep(0.94 - i * 0.004, 0.95 - i * 0.004, u)));
const { d, h } = segH(p, piv, piv.add(dir.mul(L)));
const th = stroke(d, 0.07).mul(maskDraw(pt, h)).mul(has);
col = col.add(mix(C2, W, 0.3).mul(0.8).mul(th));
cover = cover.max(th);
const mc = piv.add(dir.mul(L + 5.5)), q = p.sub(mc), r = 5.5;
const d1 = q.length().sub(r);
const d2 = q.sub(vec2(sg * -1, 1).mul(r * 0.42).add(dir.mul(-r * 0.15))).length().sub(r * 0.92);
const wax = mix(r * 2.4, 0, pm);
const d3 = q.sub(vec2(wax.mul(sg), 0)).length().sub(r * 1.05);
const body = step(d1, 0).mul(step(0, d2)).mul(step(0, d3).max(step(0.999, pm))).mul(has).mul(step(0.01, pm));
const rim = stroke(d1.abs(), 0.14).max(stroke(d2.abs(), 0.1).mul(step(d1, 0)));
const bq = ang2(q.x, q.y).mul(r * 0.82).div(1.25);
const beads = stroke(vec2(bq.fract().sub(0.5).mul(1.25), q.length().sub(r * 0.82)).length(), 0.3);
col = col.add(mix(C2, W, 0.2).mul(rim).add(mix(C3, W, 0.3).mul(beads)).mul(body).mul(float(0.9).add(cul.mul(0.4))));
cover = cover.max(body);
}
for (let i = 0; i < 4; i++) {
const sx = rn(i < 2 ? 14 : 15).mul(10).add(36 + i * 4), sy = float(-24 + i * 11);
const tw = c.real.mul(0.8 + i * 0.37).add(i * 1.9).sin();
const sz = float(2.2 + (i % 2) * 0.8).mul(tw.mul(0.2).add(0.9));
const ds = vec2(p.x.abs().sub(sx), p.y.sub(sy)).abs();
const s4 = ds.x.div(sz).sqrt().add(ds.y.div(sz).sqrt());
const ps = smoothstep(0.66 + i * 0.02, 0.69 + i * 0.02, u).mul(inv(smoothstep(0.948 - i * 0.003, 0.952 - i * 0.003, u)));
const shape = step(s4, ps.mul(1.0));
const tint = i % 2 === 0 ? mix(C2, W, 0.5) : mix(C3, W, 0.45);
col = col.add(tint.mul(smoothstep(0.85, 0.2, s4)).mul(shape).mul(tw.mul(0.3).add(0.9)));
cover = cover.max(shape);
}
return cutout(col, cover);
}
if (layer === "fore") {
const p = p0;
let col = vec3(0), cover = float(0);
const diag = step(0.5, rn(14)).mul(2).sub(1);
for (let i = 0; i < 2; i++) {
const sg = i === 0 ? 1 : -1;
const cc = vec2(sg * 50, diag.mul(sg * 24));
const pc = smoothstep(0.58 + i * 0.03, 0.66 + i * 0.03, u).mul(inv(smoothstep(0.93 + i * 0.006, 0.95 + i * 0.006, u)));
for (let k = 0; k < 9; k++) {
const t = c.real.mul(TAU / 11).mul(sg).sub(k * 0.16).add(i * 2.1);
const pos = cc.add(vec2(t.cos().mul(12), t.mul(2).sin().mul(6)));
const rb = float(1.5 - k * 0.13);
const d = p.sub(pos).length();
const there = step(k / 9, pc);
const disk = step(d, rb.add(0.35)).mul(there);
const hot = k === 0 ? W.mul(1.3) : mix(C3, C2, k / 8);
col = col.add(hot.mul(inv(smoothstep(rb.mul(0.55), rb, d))).mul(there).mul(float(1).sub(k * 0.06)));
col = col.add(mix(C2, W, 0.3).mul(stroke(d.sub(rb.add(0.15)).abs(), 0.06)).mul(there).mul(k === 0 ? 1 : 0));
cover = cover.max(disk);
}
}
return cutout(col, cover);
}
const breath = c.real.mul(TAU / 5.3).sin().mul(0.022).add(1);
const p = p0.div(breath);
const q = vec2(p.x.abs(), p.y);
const mudra = pk(7, 2);
const hand = mix(vec2(8.6, -5.2), vec2(1.8, -3.4), mudra);
let sd = q.sub(vec2(HEAD[0], HEAD[1])).length().sub(HR);
sd = smin(sd, capsule(q, [0, 5.4], [0, 7.2], 0.5), 0.4);
sd = smin(sd, capsule(q, [0, 4.6], [4.2, 4.4], 0.7), 0.6);
sd = smin(sd, rbox(q, [0, 1.3], 2.3, 3.1, 1.4), 0.8);
sd = smin(sd, capsule(q, [4.2, 4.4], [6.2, -0.8], 0.55), 0.4);
sd = smin(sd, capsule(q, [6.2, -0.8], hand, 0.5), 0.3);
sd = smin(sd, capsule(q, [9.6, -6.8], [-5.0, -9.6], 1.0), 0.8);
const hq = p.sub(vec2(0, HY)), rh = hq.length();
const k = ang2(hq.x, hq.y).abs().div(PI);
const flip = pk(2, 2), style = pk(1, 3);
const out = smoothstep(0.96, 1.0, u);
let col = vec3(0), cover = float(0);
const add = (colour, mask) => { col = col.add(colour.mul(mask)); cover = cover.max(mask); };
const N = pk(10, 3).mul(4).add(12), STEP = float(TAU).div(N);
const g = rn(10).mul(0.2).add(0.25);
const ha = ang2(p.x, p.y.sub(HEAD[1])), hr = p.sub(vec2(HEAD[0], HEAD[1])).length(), RH = 5.3;
const full = smoothstep(0.85, 0.875, u);
const rot = tAt(0.85).max(0).mul(STEP).mul(inv(g)).mul(BPS);
const bshape = pk(3, 3);
const beadAt = (rA, scale) => {
const idx = ha.sub(rA).div(STEP).round();
const ai = idx.mul(STEP).add(rA);
const bq = p.sub(vec2(HEAD[0], HEAD[1])).sub(vec2(ai.sin(), ai.cos()).mul(RH)).div(scale);
const home = idx.mul(STEP), hw = home.sub(home.div(TAU).round().mul(TAU));
return { bq, br: bq.length(), hw };
};
const B1 = beadAt(rot, 1);
const bdisc = inv(smoothstep(float(0.45).sub(aa), 0.45, B1.br));
const bring = stroke(B1.br.sub(0.42).abs(), 0.09).max(inv(smoothstep(float(0.14).sub(aa), 0.14, B1.br)));
const b4 = B1.bq.x.abs().div(0.75).sqrt().add(B1.bq.y.abs().div(0.75).sqrt());
const bstar = inv(smoothstep(inv(aa), 1, b4));
const bead = bdisc.mul(is(bshape, 0)).add(bring.mul(is(bshape, 1))).add(bstar.mul(is(bshape, 2)));
const pb = smoothstep(0.5, 0.62, u);
const hk = B1.hw.add(2 * PI / 3).div(4 * PI / 3);
const inArc = step(B1.hw.abs(), full.mul(PI / 3 + 0.2).add(2 * PI / 3 + 0.1));
const hthere = maskBeads(pb, hk).max(full).mul(step(hk.clamp(0, 1), inv(smoothstep(0.96, 0.975, u)))).mul(inArc);
const bodyFill = smoothstep(0.05, 0.3, u).mul(inv(out)).mul(4 * SP + 0.4).sub(0.2);
const underBody = step(sd, bodyFill);
add(mix(C3, W, 0.35).mul(float(0.85).add(cul.mul(0.4)).add(c.kick.mul(0.4))), bead.mul(hthere).mul(inv(underBody)));
const G = beadAt(c.beat.floor().mul(STEP).mul(g).negate().add(c.beat.floor().mul(STEP).mul(inv(g))), 1);
const ghost = stroke(G.br.sub(0.62).abs(), 0.07).mul(full).mul(cul).mul(inv(c.beat.fract()).pow(1.5));
add(mix(C1, W, 0.4).mul(0.9), ghost.mul(inv(underBody)).mul(step(0.5, G.br)));
const hline = stroke(hr.sub(RH).abs(), 0.05).mul(maskBeads(pb, ha.add(2 * PI / 3).div(4 * PI / 3)).max(full)).mul(step(ha.abs(), full.mul(PI / 3 + 0.2).add(2 * PI / 3))).mul(inv(bead)).mul(step(out, 0.25)).mul(inv(underBody));
add(C2.mul(0.7), hline);
cover = cover.max(underBody);
col = col.mul(inv(underBody));
const front = c.real.mul(0.6).fract().mul(18);
const band = smoothstep(1.6, 0, rh.sub(front).abs()).mul(cul);
for (let j = 0; j < 5; j++) {
const off = float((4 - j) * SP).add(cul.mul(0.2).mul(c.real.mul(3.2).sub(j * 1.1).sin()));
const dj = sd.sub(off).abs();
const line = stroke(dj, 0.13);
const pj = u.sub(0.05 + (4 - j) * 0.045).div(0.07).clamp(0, 1);
const odd = (j % 2 === 1 ? float(1) : float(0)).add(flip).mod(2);
const kj = mix(k, inv(k), odd);
const oj = out.sub(j * 0.13).div(0.4).clamp(0, 1);
const there = maskDraw(pj, kj).mul(maskIris(inv(oj), rh.div(17)));
const dash = step(kj.mul(64).fract(), 0.62), dot = step(kj.mul(90).fract(), 0.4);
const pat = j % 2 === 1 ? mix(float(1), dash, is(style, 1)) : float(1);
const pat2 = j >= 3 ? mix(pat, dot, is(style, 2)) : pat;
const hue = j === 0 ? mix(C1, W, 0.25) : j === 1 ? C1 : j === 2 ? C2 : j === 3 ? mix(C2, C3, 0.5) : C3;
const lit = float(0.75).add(cul.mul(0.35)).add(band.mul(0.9));
add(mix(hue, W, band.mul(0.6)).mul(lit), line.mul(there).mul(pat2));
const head = nib(pj, kj, 0.02).mul(stroke(dj, 0.32)).mul(step(0.001, pj)).mul(step(pj, 0.995));
add(W.mul(1.5), head);
}
const aq = sd.sub(4 * SP + 0.85).abs();
const abead = stroke(aq, 0.16).mul(step(k.mul(70).fract().sub(0.5).abs(), 0.18)).mul(maskBeads(io(0.7, 0.8, 0.952, 0.958), k));
add(mix(C3, W, 0.3).mul(0.9), abead);
const hp = smoothstep(0.0, 0.04, u).mul(step(out, 0.97));
const hrad = c.kick.mul(cul.mul(0.6).add(0.3)).add(1).mul(0.55);
add(W.mul(float(1.6).add(c.kick.mul(1.5))), maskIris(hp, rh.div(hrad)));
add(mix(C3, W, 0.5).mul(c.kick.add(0.3)), stroke(rh.sub(hrad.add(0.45)).abs(), 0.07).mul(step(0.05, c.kick)).mul(hp));
const fs = smoothstep(0.02, 0.06, u).mul(inv(smoothstep(0.2, 0.26, u)));
add(mix(C3, W, 0.6), stroke(p.x.abs(), 0.08).mul(step(HY, p.y)).mul(maskDraw(fs, p.y.sub(HY).div(HEAD[1] + HR - HY))).mul(step(p.y, HEAD[1] + HR)));
return cutout(col, cover);
}
