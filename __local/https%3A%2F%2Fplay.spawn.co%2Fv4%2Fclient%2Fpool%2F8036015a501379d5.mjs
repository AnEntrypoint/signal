
var z=(function(j){return`fn ${j}(ddx: vec2<f32>, ddy: vec2<f32>, texels: vec2<f32>, lodFloor: f32) -> f32 {
  if (lodFloor <= 0.0) { return 1.0; }
  let a = ddx * texels;
  let b = ddy * texels;
  let spread = dot(a, a) + dot(b, b);
  let area = abs(a.x * b.y - a.y * b.x);
  let major = sqrt(0.5 * (spread + sqrt(max(spread * spread - 4.0 * area * area, 0.0))));
  let footprint = area / max(major, 1e-8);
  return max(exp2(lodFloor) / max(footprint, 1e-8), 1.0);
}`});function A(j){return`fn ${j}(uv: vec2<f32>, ddx: vec2<f32>, ddy: vec2<f32>, texels: vec2<f32>, pixelEdge: f32) -> vec2<f32> {
  if (pixelEdge < 0.5) { return uv; }
  let at = uv * texels;
  let seam = floor(at + 0.5);
  let span = clamp(sqrt(ddx * ddx + ddy * ddy) * texels, vec2<f32>(1e-6), vec2<f32>(1.0));
  return (seam + clamp((at - seam) / span, vec2<f32>(-0.5), vec2<f32>(0.5))) / texels;
}`}
export{A as HU1,z as HYK};
