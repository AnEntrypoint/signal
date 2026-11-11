// THE WORLD TREE's VINES (params.n 1..4): beaded tentacle-vines winding in depth. n 1, 2 rise from below behind the
// world and pass in front of her crown; n 3, 4 (dealt) hang from the top corners. Opaque black body, neon on it.
// Grows root to tip, a second skin climbs it, the stretch nearer than her goes SILHOUETTE (black, neon line edges),
// retracts tip-first. Skin motion per vine (channel 23): static uv / flowing / reversed (cancels the wave) / world-locked.
import { MeshBasicNodeMaterial, DoubleSide } from "builtin/three";
import { positionGeometry, float, vec2, vec3, smoothstep, step, mix, atan2, select } from "builtin/tsl";
import { tripClock, visionShown, visionU, stripes, inv, is, ioU } from "./lib/trip.js";

const TAU = 6.28318, LEN = 120;
export function material(ctx) {
  const low = ctx.quality === "low";
  const n = Math.max(1, Math.round(ctx.params.n ?? 1)), sg = n % 2 ? 1 : -1, pair = n > 2 ? 1 : 0;
  const c = tripClock(ctx), u = visionU(ctx, c), live = visionShown(ctx, c, 0), io = ioU(u);
  const rn = (k) => c.rnd(320 + k), pk = (k, m) => c.pick(320 + k, m);
  const wrap4 = (v) => v.add(0.5).div(4).fract().mul(4).floor().clamp(0, 3);
  const fam = wrap4(c.seed.add(pk(0, 4))), hot = pk(16, 3), mode = wrap4(pk(23, 4).add(n));
  const green = vec3(0.1, 1.0, 0.15), violet = vec3(0.45, 0.05, 1.0), blue = vec3(0.05, 0.12, 1.0), W = vec3(1, 1, 1);
  const pink = vec3(1.0, 0.05, 0.6), orange = vec3(1.0, 0.38, 0.02), yellow = vec3(1.0, 0.85, 0.05);
  const A = blue.mul(is(fam, 0)).add(pink.mul(is(fam, 1))).add(violet.mul(is(fam, 2))).add(W.mul(0.9).mul(is(fam, 3)));
  const G = green.mul(mix(0.75, 1, rn(8)));
  const H = pink.mul(is(hot, 0)).add(orange.mul(is(hot, 1))).add(yellow.mul(is(hot, 2)));

  const uu = positionGeometry.y, ca = positionGeometry.x, sa = positionGeometry.z;
  const r0 = pair ? 2.2 : 3.8;
  const grow = io(0.56 + pair * 0.05, 0.74 + pair * 0.03, 0.86 - pair * 0.02, 0.92 - pair * 0.02);
  const exists = pair ? step(0.5, rn(7)) : float(1);
  const tip = inv(smoothstep(grow.sub(0.06), grow.max(0.0601), uu));
  const taper = inv(uu).clamp(0.0001, 1).pow(0.45).mul(r0);
  const rad = taper.mul(tip.clamp(0, 1).sqrt()).mul(live).mul(exists).mul(step(0.002, grow));
  const ph = pair * 2.3 + (sg > 0 ? 0 : 1.3), env = uu.mul(0.85).add(0.15);
  const w1 = uu.mul(8).sub(c.real.mul(1.1)).add(ph).sin().mul(env).mul(5);
  const w2 = uu.mul(6).sub(c.real.mul(0.75)).add(ph * 1.6).cos().mul(env).mul(4);
  const bow = uu.mul(TAU / 2).sin();
  const spine = pair
    ? vec3(float(78).sub(bow.mul(22)).sub(uu.mul(12)).mul(sg).add(w1.mul(0.7)), uu.mul(-70).add(66).add(w2.mul(0.5)), uu.mul(55).sub(30).add(w2.mul(0.7)))
    : vec3(float(64).sub(bow.mul(26)).sub(uu.mul(4)).mul(sg).add(w1), uu.mul(108).sub(66).add(w2.mul(0.5)), uu.mul(66).sub(38).add(w2.mul(0.8)));
  const m = new MeshBasicNodeMaterial();
  m.side = DoubleSide;
  m.positionNode = spine.add(vec3(ca.mul(rad), sa.mul(rad).mul(0.8), sa.mul(rad).mul(-0.6)));

  // where the skin sits: 0 static on the body, 1 flowing tipward, 2 reversed at the wave's speed (stands still while
  // the body swims through it), 3 keyed on world height (locked to space)
  const s = uu.mul(LEN).add(c.real.mul(6).mul(is(mode, 1))).sub(c.real.mul(16.5).mul(is(mode, 2)))
    .add(spine.y.sub(uu.mul(pair ? -70 : 108)).mul(is(mode, 3)).mul(1.2));
  const ang = atan2(sa, select(ca.abs().lessThan(0.00001), float(0.00001), ca));
  const row = s.div(2.6).floor();
  const q = vec2(s.div(2.6).fract().sub(0.5).mul(2.6), ang.div(TAU).mul(7).add(row.mul(0.5)).fract().sub(0.5).mul(taper.mul(TAU / 7)));
  const bd = q.length(), br = taper.mul(0.42).min(1.05).max(0.05);
  const cup = inv(smoothstep(br.sub(0.1), br, bd)).mul(smoothstep(br.mul(0.62), br.mul(0.72), bd));
  const pip = inv(smoothstep(br.mul(0.18), br.mul(0.26), bd)).mul(step(row.mod(4), 0.5));
  const cBe = mix(G, W, 0.15).mul(cup).add(H.mul(pip));
  const cStr = mix(W.mul(0.85), A, s.mul(0.4).floor().mod(3).mul(0.5)).mul(stripes(s, 0.4, 0.04));
  const t = ang.div(TAU).mul(4);
  // scales as LINE-ART diamonds (outlines only), never filled blocks
  const lat = (x) => smoothstep(0.1, 0.04, x.fract().sub(0.5).abs());
  const cSc = low ? cStr : mix(G, W, 0.3).mul(lat(s.mul(0.28).add(t)).max(lat(s.mul(0.28).sub(t))));
  const swap = pair ? inv(step(0.5, rn(8))) : step(0.5, rn(8));
  const t1 = 0.7 + pair * 0.02;
  const skin = mix(cBe, mix(cStr, cSc, swap), step(uu, smoothstep(t1, t1 + 0.08, u).mul(1.02)));
  const run = smoothstep(0.05, 0, uu.sub(c.beat.fract()).abs()).mul(step(0.001, c.kick));
  const edge = ca.abs();
  const rim = mix(G, W, 0.5).mul(smoothstep(0.86, 1, edge));
  const lit = skin.mul(sa.abs().mul(0.45).add(0.55)).add(rim.mul(run.add(0.45)));
  // silhouette: the stretch nearer than the being (z > 0), and one whole vine at the culmination
  const near = smoothstep(2, 12, spine.z);
  const dark = is(float(n), step(0.5, rn(13)).add(1)).mul(step(uu, smoothstep(0.78, 0.84, u).mul(1.02)));
  const line = mix(G, W, 0.4).mul(smoothstep(0.93, 1, edge).add(lat(s.mul(0.09)).mul(smoothstep(0.55, 0.6, edge)).mul(0.5))).mul(run.add(0.75));
  m.colorNode = mix(lit, line, near.max(dark));
  return m;
}
