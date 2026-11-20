
var k=2048;function q(f,j){let b=Math.max(4,Math.ceil(Math.max(f,j)/2048));return{width:Math.max(1,Math.ceil(f/b)),height:Math.max(1,Math.ceil(j/b)),stride:b}}var x=`
fn portalEdgeUv(px: vec2<f32>, viewport: vec2<f32>) -> vec2<f32> {
  let stride = max(4.0, ceil(max(viewport.x, viewport.y) / 2048.0));
  return px / (ceil(viewport / stride) * stride);
}
fn portalEdgePlanePoint(px: vec2<f32>, viewport: vec2<f32>, inverseViewProj: mat4x4<f32>, plane: vec4<f32>) -> vec4<f32> {
  let ndc = px / viewport * vec2<f32>(2.0, -2.0) + vec2<f32>(-1.0, 1.0);
  let ray = inverseViewProj * vec4<f32>(ndc, 0.0, 1.0);
  let depthAxis = inverseViewProj[2];
  return ray * dot(plane, depthAxis) - depthAxis * dot(plane, ray);
}
fn portalEdgeDistance(px: vec2<f32>, field: vec4<f32>, viewport: vec2<f32>, inverseViewProj: mat4x4<f32>, center: vec3<f32>, normal: vec3<f32>, height: f32) -> f32 {
  if (field.w <= 0.0) { return 0.2; }
  let plane = vec4<f32>(normal, -dot(normal, center));
  let edgePx = px - field.yz / max(length(field.yz), 1e-4) * field.x;
  let point = portalEdgePlanePoint(px, viewport, inverseViewProj, plane);
  let edge = portalEdgePlanePoint(edgePx, viewport, inverseViewProj, plane);
  if (abs(point.w) < 1e-7 || abs(edge.w) < 1e-7) { return 0.2; }
  return min(0.2, length(point.xyz / point.w - edge.xyz / edge.w) / height);
}
`;
export{k as LaX,q as lhV,x as vQA};
