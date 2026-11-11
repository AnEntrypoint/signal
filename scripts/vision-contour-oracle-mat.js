// THE CONTOUR ORACLE's light (geometry: vision-contour-oracle-geo.js, kinds listed there).
// Black-and-white op-art contours + ONE accent hue dealt per roll. Order of appearance over its slot (visionU u):
//   far ring beads light one by one from the top down both sides (u 0..0.25)
//   front-face contours draw outward from the nose line, inner contours first (u 0.06..0.45)
//   the profiles' nested lines draw from their noses round to the backs of their heads (u 0.22..0.55)
//   the near veil's strands draw downward, beads lighting in a row (u 0.36..0.62)
//   the closed eyes draw as a line (0.48..0.57), then open by their lids (0.57..0.7)
//   culmination 0.7..1 with climb(c): accent contours fill in, the stripes crawl, light walks the profiles and veil
//   exit, the last 0.5 s: eyes shut, then every stroke retracts to the nose line
// The kick (c.kick, gated to measured kick runs) is a ring of accent light leaving the nose tip down the contours,
// out through the profiles from their cores, and down the far ring from the top.
// Seed channels: 10 hue, 11 stripe count, 12 crawl sense, 13 profiles face in/out, 14 bead stride, 15 ring sense.
import { MeshBasicNodeMaterial, DoubleSide } from "builtin/three";
import { positionGeometry, uv, float, vec2, vec3, floor, fract, smoothstep, step, mix, abs, length, fwidth, max, min } from "builtin/tsl";
import { tripClock, HUE, visionShown, visionU, maskDraw, maskBeads, maskLid, nib, climb } from "./lib/trip.js";
import { FY } from "./vision-contour-oracle-geo.js";

const ACC = ["blue", "violet", "magenta", "orange", "yellow", "green"];
export function material(ctx) {
  const c = tripClock(ctx), m = new MeshBasicNodeMaterial();
  const vw1 = ctx.param("vw1", -1);
  const u = visionU(ctx, c);
  const kind = floor(uv().y.add(0.01)), fr = uv().y.sub(kind).clamp(0, 1), al = uv().x;
  const is = (k) => step(k - 0.5, kind).mul(step(kind, k + 0.5));
  // the deal
  const hp = c.pick(10, ACC.length);
  let A = vec3(...HUE[ACC[0]]);
  ACC.forEach((n, i) => { if (i) A = mix(A, vec3(...HUE[n]), step(i - 0.5, hp)); });
  const N = c.pick(11, 3).mul(4).add(12), crawl = c.rnd(12).step(0.5).mul(2).sub(1).mul(c.dir);
  // shared envelopes
  const cul = smoothstep(0.7, 1.0, u).mul(climb(c).mul(0.5).add(0.5));
  const shut = smoothstep(vw1.sub(0.5), vw1.sub(0.3), c.sec), back = float(1).sub(smoothstep(vw1.sub(0.38), vw1, c.sec));
  const front = fract(c.beat), kk = c.kick.pow(0.35); // the kick's travelling front, gated
  const W = vec3(1, 1, 1);
  const P = positionGeometry;
  const aa = (x, w) => { const f = fract(x), d = fwidth(x).mul(0.8).add(0.001); return smoothstep(w.sub(d), w.add(d), f).mul(smoothstep(1, float(1).sub(d), f)); };

  // kind 0: front face contours
  const hn = al, sv = hn.mul(N).add(c.sec.mul(crawl).mul(cul.mul(0.5).add(0.04)));
  const band0 = aa(sv, float(0.5));
  const k0 = floor(sv), acc0 = step(fract(k0.div(4)), 0.1).mul(cul);
  const ux = abs(P.x).div(6.6);
  const pF = smoothstep(0.06, 0.45, u).mul(back), pk0 = pF.mul(1.6).sub(float(1).sub(hn).mul(0.6)).clamp(0, 1);
  const draw0 = maskDraw(pk0, ux).mul(step(0.012, hn));
  const wave0 = smoothstep(0.05, 0, abs(float(1).sub(hn).sub(front))).mul(kk);
  const rgb0 = mix(W.mul(0.85), A.mul(2.2), acc0).mul(band0).add(A.mul(nib(pk0, ux, 0.03).mul(3))).add(A.mul(wave0.mul(2.5)));

  // kind 1: profiles
  const ring = fr.sub(1).div(0.98), pP = smoothstep(0.22, 0.55, u).mul(back), pk1 = pP.mul(1.5).sub(ring.mul(0.5)).clamp(0, 1);
  const draw1 = maskDraw(pk1, al);
  const acc1 = step(fract(floor(ring.mul(11).add(0.5)).div(3)), 0.1).mul(cul);
  const walk = smoothstep(0.06, 0, abs(al.sub(fract(c.sec.mul(0.18).mul(crawl).add(ring.mul(0.37)))))).mul(cul);
  const wave1 = smoothstep(0.1, 0, abs(float(1).sub(ring).sub(front))).mul(kk);
  const rgb1 = mix(W.mul(0.7), A.mul(2), acc1).add(A.mul(walk.add(wave1).mul(2.5))).add(A.mul(nib(pk1, al, 0.03).mul(3)));

  // kind 2: far ring
  const bi = floor(al.mul(96).add(0.5)), kb = min(al, float(1).sub(al)).mul(2);
  const stride = c.pick(14, 3).add(1), keep = step(fract(bi.div(stride).add(0.001)), 0.01);
  const isBead = step(fr, 0.5), pB = smoothstep(0.0, 0.25, u).mul(back);
  const draw2 = mix(maskDraw(pB, kb), maskBeads(pB, kb).mul(keep), isBead);
  const wave2 = smoothstep(0.08, 0, abs(kb.sub(front))).mul(kk);
  const rgb2 = mix(W.mul(0.35), A.mul(cul.add(0.6)), isBead).add(mix(W, A, isBead).mul(wave2.mul(2.5)));

  // kind 3/4: near veil
  const sj = fr.sub(0.0), pV = smoothstep(0.36, 0.62, u).mul(back), pk3 = pV.mul(1.3).sub(fract(sj.mul(1.02)).mul(0.3)).clamp(0, 1);
  const draw3 = mix(maskDraw(pk3, al), maskBeads(pk3, al), is(4));
  const flow = smoothstep(0.05, 0, abs(al.sub(fract(c.sec.mul(0.22).add(sj.mul(1.7)))))).mul(cul);
  const rgb3 = mix(W.mul(0.45), A.mul(1.1), is(4)).add(A.mul(flow.mul(3)));

  // kind 5: eyes
  const lx = al, ly = fr.div(0.98).mul(2).sub(1), alm = max(float(1).sub(lx.mul(lx)), 0).pow(0.75);
  const pE = smoothstep(0.57, 0.7, u).mul(float(1).sub(shut)), pL = smoothstep(0.48, 0.57, u).mul(back);
  const open = maskLid(pE, ly.div(alm.max(0.001))).mul(step(abs(ly), alm));
  const line = maskDraw(pL, lx.mul(0.5).add(0.5)).mul(step(abs(ly), 0.08)).mul(step(abs(lx), 0.98));
  const er = length(vec2(lx.mul(1.6), ly.mul(0.9)));
  const pupil = smoothstep(0.3, 0.27, er.sub(cul.mul(0.12)));
  const irisR = step(er, 0.85), irisRings = aa(er.mul(7).sub(c.sec.mul(0.6).mul(c.dir)), float(0.45));
  const scl = aa(er.mul(5).add(0.25), float(0.5));
  const rim = smoothstep(0.1, 0.04, abs(abs(ly).sub(alm.mul(pE))));
  const glint = smoothstep(0.12, 0.08, length(vec2(lx.mul(1.6).sub(0.22), ly.mul(0.9).sub(0.22))));
  const iris = mix(W.mul(scl.mul(0.8)), A.mul(irisRings.mul(2.4).add(0.15)).add(A.mul(c.kick.mul(2))), irisR).mul(float(1).sub(pupil)).add(W.mul(glint.mul(1.5)));
  const rgb5 = mix(iris, W, max(rim.mul(open), line.mul(float(1).sub(open))));
  const draw5 = max(open, line);

  // compose
  const rgb = rgb0.mul(is(0)).add(rgb1.mul(is(1))).add(rgb2.mul(is(2))).add(rgb3.mul(is(3).add(is(4)))).add(rgb5.mul(is(5)));
  const draw = draw0.mul(is(0)).add(draw1.mul(is(1))).add(draw2.mul(is(2))).add(draw3.mul(is(3).add(is(4)))).add(draw5.mul(is(5)));
  m.colorNode = rgb;
  // motion, each layer its own: ring rows counter-turn (96 s / 70 s a turn), the profiles face in or out, the veil sways
  const ringSense = c.rnd(15).step(0.5).mul(2).sub(1).mul(c.dir);
  const ang = c.sec.mul(6.28318 / 96).mul(ringSense).mul(mix(float(1), float(-1.37), step(2.3, uv().y))).mul(is(2));
  const ry = P.y.sub(FY);
  const rx = P.x.mul(ang.cos()).sub(ry.mul(ang.sin())), ryy = P.x.mul(ang.sin()).add(ry.mul(ang.cos()));
  const flip = c.pick(13, 2).mul(2).sub(1).mul(-1); // +1 facing in, -1 back to back
  const pcx = P.x.sign().mul(16);
  const px1 = pcx.add(P.x.sub(pcx).mul(flip));
  const sway = c.sec.mul(0.35).add(fr.mul(9)).sin().mul(0.7).mul(al.mul(al)).mul(is(3).add(is(4)));
  const x = mix(mix(P.x, rx, is(2)), px1, is(1)).add(sway);
  const y = mix(P.y, ryy.add(FY), is(2));
  m.positionNode = vec3(x, y, P.z);
  m.opacityNode = draw.mul(visionShown(ctx, c, 0));
  m.alphaTest = 0.5;
  m.side = DoubleSide;
  return m;
}
