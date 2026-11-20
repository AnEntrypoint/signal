// The five arches: blue/violet moire contour lines (two sets of thin rings sliding against each other), rainbow
// bands with bead rows in peak, neighbours scrolling opposite ways, a light running foot to foot.
import { positionLocal, uv, float, vec2, vec3, select, varying, step, smoothstep, mix } from "builtin/tsl";
import { MeshBasicNodeMaterial, DoubleSide } from "builtin/three";
import { tripClock, pal, stripes } from "./lib/trip.js";
import { finish, colours, shown, win, SEC, TAU } from "./serpents-lib.js";

export function material(ctx) {
  const c = tripClock(ctx);
  const s = uv().x, a = uv().y.fract(), ai = uv().y.floor();
  const side = float(1).sub(ai.mod(2).mul(2)).mul(c.dir);
  const br = c.sec.mul(TAU / 12).add(ai.mul(1.9)).sin().mul(0.02).add(1);
  const m = new MeshBasicNodeMaterial();
  m.positionNode = vec3(positionLocal.x.mul(br), positionLocal.y.mul(br), positionLocal.z);
  const sp = mix(0.7, 1.3, c.rnd(56));
  const n1 = s.mul(140).add(c.sec.mul(0.35).mul(sp).mul(side)), n2 = s.mul(147).sub(c.sec.mul(0.2).mul(side));
  const moire = stripes(n1, 1, 0.08).mul(stripes(n2, 1, 0.08));
  const K = colours(c.sec, ai);
  const lines = select(moire.greaterThan(0.5), mix(K.A, K.B, step(0.5, a.mul(2).fract())), vec3(0));
  const band = s.mul(24).add(c.beat.div(16).mul(side)), bi = band.floor(), bf = band.fract();
  const dq = vec2(bf.sub(0.5), a.mul(6).fract().sub(0.5).mul(0.6)).length();
  const bcol = pal(bi.div(24).add(c.hue));
  const rainbow = select(dq.lessThan(0.16), vec3(1), select(dq.lessThan(0.25), vec3(0), bcol.mul(step(0.08, bf))));
  const pk = win(c.sec, SEC.peak, 2);
  const col = mix(lines.mul(1.4), rainbow, pk);
  const L = smoothstep(0.3, 0.0, s.sub(c.sec.div(24).mul(side)).fract()).max(pk);
  m.colorNode = finish(c, col, L, s.mul(60));
  m.opacityNode = shown(c, "serpents", s.sub(0.5).abs().mul(2)).mul(step(108.35, c.sec)).mul(step(c.sec, 190));
  m.alphaTest = 0.5;
  m.side = DoubleSide;
  m.fog = false;
  return m;
}
