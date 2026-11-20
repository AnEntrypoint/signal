// The mandala field's canvas: one flat disc, radius 90, painted by scripts/field-mandala.js.
export function geometry(ctx) {
  const R = ctx.params.radius ?? 90, N = 96;
  for (let s = 0; s < N; s++) {
    const a = (s / N) * Math.PI * 2, b = ((s + 1) / N) * Math.PI * 2;
    ctx.tri(0, 0, 0, Math.cos(b) * R, 0, Math.sin(b) * R, Math.cos(a) * R, 0, Math.sin(a) * R);
  }
}
export function collider() { return null; }
