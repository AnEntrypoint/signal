// THE CONTOUR ORACLE's ribbon-worms (params.n 1..4): opaque bodies rebuilt from uv on a spine, crossing behind and in front of the bust.
// Skin uv mode, dealt per worm by the roll (1..3 always one of each): 0 rides the body (stripes travel with it, a real worm's),
// 1 pinned to the path (the body slides through its stripes), 2 reversed (skin runs back by the distance travelled).
import { MeshBasicNodeMaterial, DoubleSide } from "builtin/three";
import { uv, float, vec2, vec3, smoothstep, step, mix, fwidth } from "builtin/tsl";
import { tripClock, visionShown, visionU, inv, is } from "./lib/trip.js";
import { SPINES } from "./vision-contour-oracle-worm-geo.js";

const TAU = 6.28318, CH = 240;
export function material(ctx) {
  const n = Math.max(1, Math.min(4, ctx.params.n ?? 1)), S = SPINES[n - 1], [a, b, cc] = S.P;
  const c = tripClock(ctx), u = visionU(ctx, c), t = c.real;
  const R = (k) => c.rnd(CH + k), pk = (k, m) => c.pick(CH + k, m);
  const Su = (x, y) => smoothstep(x, y, u), out = (x, y) => inv(smoothstep(x, y, u));
  const fam = pk(0, 3);
  const blue = vec3(0.05, 0.12, 1.0), violet = vec3(0.45, 0.05, 1.0), W = vec3(1, 1, 1), P = vec3(1.0, 0.05, 0.6);
  const A = blue.mul(is(fam, 0)).add(violet.mul(is(fam, 1))).add(mix(blue, violet, 0.5).mul(is(fam, 2)));
  const B = violet.mul(is(fam, 0)).add(blue.mul(is(fam, 1))).add(mix(blue, W, 0.4).mul(is(fam, 2)));
  const al = uv().x, ar = uv().y.mul(TAU);
  const PTS = [[[-95, -60], [-10, -30], [70, 10]], [[95, 55], [10, 5], [-70, -45]], [[30, 82], [-30, 10], [45, -62]], [[-40, 85], [40, -10], [-80, -55]]][n - 1];
  const L = 190;
  const flip = step(0.5, R(31 + n)).mul(2).sub(1), dir = step(0.5, R(35 + n)).mul(2).sub(1), zph = R(39 + n).mul(TAU);
  const spine = (s) => {
    const j = float(1).sub(s), q0 = j.mul(j), q1 = j.mul(s).mul(2), q2 = s.mul(s);
    const x = q0.mul(PTS[0][0]).add(q1.mul(PTS[1][0])).add(q2.mul(PTS[2][0])).mul(flip);
    const y = q0.mul(PTS[0][1]).add(q1.mul(PTS[1][1])).add(q2.mul(PTS[2][1]));
    const z = x.mul(dir).add(t.mul(0.23 + 0.04 * n).add(zph).sin().mul(13)).mul(0.62).add(3).clamp(-24, 26);
    return vec3(x, y, z);
  };
  const C0 = spine(al), dT = spine(al.add(0.004)).sub(C0);
  const T = dT.div(dT.length().max(0.0001));
  const Nr = T.cross(vec3(0, 0, 1)), N = Nr.div(Nr.length().max(0.0001)), Bn = T.cross(N);
  const ph = al.mul(9).sub(t.mul(0.7 + n * 0.13)).add(n * 2.1), ph2 = al.mul(5).add(t.mul(0.33)).add(n);
  const C = C0.add(N.mul(ph.sin().mul(al).mul(3.5))).add(Bn.mul(ph2.cos().mul(al).mul(1.6)));
  const here = step(n - 0.5, pk(3, 3).add(2));
  const g = smoothstep(0.16 + 0.07 * (n - 1), 0.55, u).mul(out(0.93, 0.955)).mul(here);
  const tipR = g.mul(1.03).sub(al).div(0.05).clamp(0, 1).sqrt();
  const rad = float(S.r).mul(float(1).sub(al.mul(0.6))).mul(tipR);
  const nor = N.mul(ar.cos()).add(Bn.mul(ar.sin()));
  const m = new MeshBasicNodeMaterial();
  m.positionNode = C.add(nor.mul(rad));
  m.side = DoubleSide;
  const nz = nor.z.abs(), edge = float(1).sub(nz);
  const mode = n < 4 ? c.pick(782, 3).add(n - 1).mod(3) : c.pick(783, 3);
  const trav = g.mul(L).add(t.mul(c.rnd(783 + n).mul(3).add(4)));
  const low = ctx.quality === "low";
  const sL = al.mul(L).sub(trav.mul(is(mode, 0))).add(trav.mul(is(mode, 2)));
  const w = fwidth(al.mul(L)).mul(0.7).add(0.001);
  const sb = sL.div(3.4).add(edge.mul(edge).mul(0.9)), fb = sb.fract().sub(0.5).abs().mul(2);
  const bands = float(1).sub(smoothstep(float(0.5), w.add(0.5), fb));
  const bandCol = mix(A, W, smoothstep(0.5, 0.1, fb));
  const row = sL.div(2.4), ri = row.floor(), cx = uv().y.mul(12).add(ri.mod(2).mul(0.5)).fract().sub(0.5), cy = row.fract().sub(0.5);
  const beads = float(1).sub(smoothstep(0.3, 0.36, vec2(cx.mul(0.9), cy).length()));
  const beadCol = mix(mix(B, W, 0.5), P, step(ri.mod(4), 0.5));
  const changed = step(al, Su(0.74, 0.84).mul(1.05)), swap = step(0.5, R(4));
  const useB = mix(changed, float(1).sub(changed), swap);
  const run = low ? float(0) : smoothstep(0.06, 0, al.sub(c.beat.fract()).abs()).mul(step(0.001, c.kick));
  const dark = is(pk(15, 2), n - 1).mul(step(al, Su(0.84, 0.89).mul(out(0.93, 0.94)).mul(1.1)));
  const skin = (low ? bandCol.mul(bands) : mix(bandCol.mul(bands), beadCol.mul(beads), useB)).mul(nz.mul(0.7).add(0.3)).mul(float(0.85).add(run.mul(0.7)));
  const rim = smoothstep(0.78, 0.95, edge);
  m.colorNode = skin.mul(float(1).sub(dark)).add(mix(A, W, 0.3).mul(rim).mul(mix(float(0.8), float(0.45), dark)));
  m.opacityNode = step(al, g.mul(1.03)).mul(step(0.001, g)).mul(visionShown(ctx, c, 0.5));
  m.alphaTest = 0.5;
  return m;
}
