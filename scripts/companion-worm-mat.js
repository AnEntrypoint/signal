// THE COMPANION WORMS (params.n = 1..3): great worms that ride with the camera in its own space (the object is
// attached to the camera) and swim through every scene and across the changes between them. 2026-11-11, lanmower:
// "worms stick around longer and stay between scenes accompanying the camera ... pulse and undulate them through
// their body ... make them really change direction and swim".
// - the head wanders on a seeded path 18..120 m out; the body is the head's own past (follow-the-leader), so it
//   turns and dives for real, and crosses in front of and behind the beings standing 74 m out
// - a peristaltic swell runs head to tail, a sideways wave on top, a bright pulse runs down it on each kick
// - each one grows out of the dark head first and draws its tail in after it, on its own slow tide;
//   around every scene change they all come in, so they carry the eye across it
// - opaque black body with neon skin: it hides what is behind it (occlusion, not only light)
import { MeshBasicNodeMaterial, FrontSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, mix, atan2, cross, normalize } from "builtin/tsl";
import { tripClock, stripes } from "./lib/trip.js";

const TAU = 6.28318;
const COL = { blue: [0.02, 0.05, 1], violet: [0.24, 0.02, 1], pink: [1, 0.02, 0.33], orange: [1, 0.17, 0.01], yellow: [1, 0.72, 0.02], green: [0.03, 1, 0.06], white: [1, 1, 1] };
const FAMS = [["green", "yellow", "blue"], ["violet", "pink", "white"], ["orange", "yellow", "pink"], ["blue", "violet", "green"], ["pink", "orange", "white"]];

export function material(ctx) {
  const n = Math.max(1, Math.round(ctx.params.n ?? 1));
  const c = tripClock(ctx);
  const K = 500 + n * 20;                                     // this worm's seed channels
  const rn = (k) => c.rnd(K + k), inv = (x) => float(1).sub(x), is = (v, i) => step(v.sub(i).abs(), 0.5);
  const fam = c.pick(K, FAMS.length);
  const famCol = (slot) => { let v = vec3(0); FAMS.forEach((f, i) => { v = v.add(vec3(...COL[f[slot]]).mul(is(fam, i))); }); return v; };
  const A = famCol(0), B = famCol(1), H = famCol(2), W = vec3(1, 1, 1);
  const t = c.real;
  // the head's wander: incommensurate slow sines, every term's speed and phase dealt by the roll
  const fq = (k, lo, hi) => rn(k).mul(hi - lo).add(lo);
  const ph = (k) => rn(k).mul(TAU);
  const sx = rn(9).step(0.5).mul(2).sub(1);
  const head = (tt) => vec3(
    tt.mul(fq(1, 0.07, 0.14)).add(ph(2)).sin().mul(30).add(tt.mul(fq(3, 0.21, 0.37)).add(ph(4)).sin().mul(12)).mul(sx),
    tt.mul(fq(5, 0.09, 0.19)).add(ph(6)).sin().mul(13).add(tt.mul(fq(7, 0.27, 0.43)).sin().mul(5)),
    tt.mul(fq(8, 0.05, 0.11)).add(ph(10)).sin().mul(30).sub(30 + n * 22));   // own depth lane per worm: 1 near, 3 far     // -20 .. -116: through the being's plane at -74
  const LAG = 8 + n * 1.5;                                    // seconds of the head's past the body is made of
  const s = positionGeometry.y, ca = positionGeometry.x, sa = positionGeometry.z;
  const body = (ss) => {
    const p = head(t.sub(ss.mul(LAG)));
    const wv = ss.mul(14).sub(t.mul(3.2)).add(n);             // sideways wave travelling head -> tail
    return p.add(vec3(wv.sin().mul(ss.mul(2.5).add(0.6)), wv.cos().mul(ss.mul(1.6).add(0.4)), 0));
  };
  const P = body(s);
  // guarded frame: a stalled head (d -> 0) still gives a unit tangent, never a NaN vertex (white/garbage)
  const T = normalize(body(s.add(0.012)).sub(P).add(vec3(0, 1e-4, 0)));
  const ref = mix(vec3(0, 0, 1), vec3(1, 0, 0), step(0.9, T.z.abs()));   // never parallel to T: no NaN
  const N1 = normalize(cross(T, ref).add(vec3(1e-5, 0, 0))), N2 = cross(N1, T);
  const nrm = N1.mul(ca).add(N2.mul(sa));

  // presence: its own tide, and everyone in around a scene change (seamD = seconds to the nearest drop)
  const tide = t.mul(TAU / (31 + n * 7)).add(ph(11)).sin().mul(0.6).add(t.mul(TAU / (53 + n * 5)).add(ph(12)).sin().mul(0.4)).mul(0.5).add(0.5);
  const near = smoothstep(16, 2, c.seamD);
  const show = smoothstep(0.35, 0.75, tide).max(near).mul(c.on.max(0.35));
  // head first out of the dark: the body exists where s < show; the edge tapers so nothing pops
  const len = smoothstep(show, show.sub(0.08), s);
  const swell = s.mul(22).sub(t.mul(5.5)).sin().mul(0.28).add(1);            // peristalsis, head -> tail
  const kickRun = smoothstep(0.07, 0, s.sub(c.beat.fract().mul(1.2)).abs()).mul(c.kick.max(0).min(1));
  const r = float(2.2).add(rn(13).mul(1.6)).mul(inv(s).clamp(0, 1).pow(0.4).mul(0.85).add(0.15)).mul(s.mul(40).clamp(0, 1).sqrt())
    .mul(swell).mul(kickRun.mul(0.35).add(1)).mul(len)
    .mul(smoothstep(8, 26, P.length()).mul(0.5).add(0.5));   // thins as it passes close: never fills the lens
  const m = new MeshBasicNodeMaterial();
  m.side = FrontSide;   // one skin: inner faces no longer show through where the body pinches
  m.fog = false;
  m.positionNode = P.add(nrm.mul(r));

  // skin: op-art stripes, diamond scales or bead rows, dealt per worm; black between, so the body occludes
  // skin motion, dealt per worm (lanmower: lock some to world space, reverse others): 0 rides the body;
  // 1 pinned to the path: each stripe stays where the head laid it, the body slides through its own skin;
  // 2 reversed: the skin runs back up the body as it swims forward
  // 2026-11-11 (lanmower: some worms must have static uvs, moving as normal worms do): worm 1 always rides its
  // body, and every roll a second worm may too; the rest are pinned or reversed
  const mode = n === 1 ? float(0) : c.pick(K + 15, 3);
  const sl = mix(mix(s.mul(LAG * 9), t.sub(s.mul(LAG)).mul(9), is(mode, 1)), s.mul(LAG * 9).add(t.mul(14)), is(mode, 2));
  const ang = atan2(sa, ca);
  const skinPick = c.pick(K + 14, 3);
  const cStr = mix(W, A, stripes(sl.mul(0.5).floor(), 2, 0.5)).mul(stripes(sl.add(ang.mul(0.5)), 0.6, 0.05));
  const t3 = ang.div(TAU).mul(8);
  const cSc = mix(A, H, s).mul(stripes(sl.mul(0.35).add(t3), 1, 0.07).mul(stripes(sl.mul(0.35).sub(t3), 1, 0.07)));
  const bd = vec2(sl.div(1.6).fract().sub(0.5), ang.div(TAU).mul(10).add(sl.div(1.6).floor().mul(0.5)).fract().sub(0.5)).length();
  const cBe = mix(B, H, step(sl.div(1.6).floor().mod(3), 0.5)).mul(smoothstep(0.42, 0.34, bd)).mul(step(0.16, bd).mul(0.75).add(0.25));
  const skin = cStr.mul(is(skinPick, 0)).add(cSc.mul(is(skinPick, 1))).add(cBe.mul(is(skinPick, 2)));
  const facing = nrm.z.abs();                                 // camera space: +z faces the eye
  const rim = smoothstep(0.25, 0.0, facing);
  const glow = mix(B, W, 0.15).mul(kickRun.mul(0.6)).add(H.mul(rim).mul(0.5));
  const shade = facing.mul(0.6).add(0.4).mul(smoothstep(1, 0.6, s).mul(0.6).add(0.4));
  // near the eye it goes dark, not white: the skin fades to opaque black inside ~16 m (camera-space distance;
  // the object rides the camera, so |surface| is the view distance), and no channel exceeds the palette's 1
  const dist = P.add(nrm.mul(r)).length();
  const nearFade = smoothstep(6, 18, dist);
  const col = skin.mul(shade).add(glow).mul(nearFade);
  const peak = col.x.max(col.y).max(col.z).max(1);
  m.colorNode = col.div(peak);                               // hue kept, brightness capped: no white bloom flare
  return m;
}
