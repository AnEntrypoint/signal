// The serpents' CPU shape: each body is an arc in its own vertical plane that turns into a log spiral at the tip
// (closed form, no integration). The tube, its spine beads and every check read these same functions.
import { BODIES, Q0, WMIN } from "./serpents-data.js";
const D = Math.PI / 180;
export { BODIES };
export function spine(b, s) {
  const [ph, R, L, yaw0, th0d, A, k] = b;
  const th0 = th0d * D, yaw = yaw0 * D;
  const hd = [Math.sin(yaw), -Math.cos(yaw)], root = [Math.sin(ph * D) * R, -Math.cos(ph * D) * R];
  const qa = Math.min(s, Q0), ta = th0 + A * qa;
  const h1 = (L * (Math.sin(ta) - Math.sin(th0))) / A, y1 = (L * (Math.cos(th0) - Math.cos(ta))) / A;
  const U = Math.max((L * (1 - Q0)) / (1 - WMIN), 0.001), u = Math.max(s - Q0, 0) * L, w = Math.max(1 - u / U, WMIN), lw = Math.log(w);
  const a = 1 - w * Math.cos(k * lw), bb = w * Math.sin(k * lw), f = U / (k * k + 1), zx = (a - k * bb) * f, zy = (bb + k * a) * f, t1 = th0 + A * Q0;
  const h = h1 + zx * Math.cos(t1) - zy * Math.sin(t1), y = y1 + zx * Math.sin(t1) + zy * Math.cos(t1);
  return [root[0] + hd[0] * h, y, root[1] + hd[1] * h];
}
const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const nrm = (a) => { const l = Math.hypot(a[0], a[1], a[2]) || 1; return [a[0] / l, a[1] / l, a[2] / l]; };
const crs = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
// Position and frame at s: T along, N in the body's plane, S across it.
export function frame(b, s) {
  const e = 0.003, P = spine(b, s);
  const T = nrm(sub(spine(b, Math.min(s + e, 1)), spine(b, Math.max(s - e, 0))));
  const yaw = b[3] * D, S = [Math.cos(yaw), 0, Math.sin(yaw)];
  const N = nrm(crs(T, S)), B = crs(N, T);
  return { P, T, N, B };
}
export const tubeR = (b, s) => (b[7] === 3 ? 1.25 : 1.6) * (1 - s) + 0.15 * s;
// pair index, the code a vertex carries (pair*16 + kind*4 + ring*2 + mirror)
export const codeOf = (bi) => { const b = BODIES[bi]; return Math.floor(bi / 2) * 16 + b[7] * 4 + b[8] * 2 + (bi % 2); };
