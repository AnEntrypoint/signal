// The serpents' own numbers, no engine imports (the geometry scripts read them on the CPU, the materials as nodes).
// A body: [rootAngle deg, rootRadius m, length m, heading yaw deg, start pitch deg, bend rad (over the first 55 %),
//          curl k (log-spiral tightness, sign = sense), kind (0 striped, 1 diamond, 2 knot, 3 guardian), ring]
// Every body with a non-zero angle stands with its mirror in x = 0 (angle and yaw negated): the field is left-right symmetric.
export const Q0 = 0.55, WMIN = 0.12;
const HALF = [
  // inner ring, r 46: arching outward over the field, curling up
  [50, 46, 34, 70, 84, -1.0, 1.7, 0, 0],
  [95, 46, 36, 125, 82, -1.1, -1.5, 1, 0],
  [140, 46, 32, 175, 84, -0.9, 1.6, 0, 0],
  // outer ring, r 72: tall, leaning out, tips spiralling
  [20, 72, 50, 15, 96, -1.2, -1.4, 1, 1],
  [60, 72, 54, 60, 98, -1.3, 1.5, 0, 1],
  [100, 72, 48, 105, 98, -1.1, -1.6, 1, 1],
  [140, 72, 46, 150, 100, -1.0, 1.5, 0, 1],
  // the knot serpents (p,q torus knots standing on the field)
  [118, 58, 1, 118, 90, 0.5, 1, 2, 1],
  // the twin guardians flanking the Eye, cobra-raised, bowing toward it
  [30, 50, 28, -90, 96, -0.35, -1.9, 3, 0],
];
export const BODIES = [];
for (const b of HALF) { BODIES.push(b); BODIES.push([-b[0], b[1], b[2], -b[3], ...b.slice(4)]); }
