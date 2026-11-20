
var q=`fn lume_meanFreeNormal(mapN: vec3<f32>, meanN: vec3<f32>) -> vec3<f32> {
  let z = max(mapN.z, 1e-3);
  let meanZ = max(meanN.z, 1e-3);
  return vec3<f32>(mapN.xy * meanZ - meanN.xy * z, z * meanZ);
}`,x=`fn lume_perturbNormalGrad(N: vec3<f32>, q0: vec3<f32>, q1: vec3<f32>, st0: vec2<f32>, st1: vec2<f32>, mapN: vec3<f32>) -> vec3<f32> {
  let q1perp = cross(q1, N);
  let q0perp = cross(N, q0);
  let T = q1perp * st0.x + q0perp * st1.x;
  let B = q1perp * st0.y + q0perp * st1.y;
  let det = max(dot(T, T), dot(B, B));
  let scale = select(inverseSqrt(det), 0.0, det == 0.0);
  return normalize(T * (mapN.x * scale) + B * (-mapN.y * scale) + N * mapN.z);
}
fn lume_perturbNormal(N: vec3<f32>, P: vec3<f32>, uv: vec2<f32>, mapN: vec3<f32>) -> vec3<f32> {
  return lume_perturbNormalGrad(N, dpdx(P), -dpdy(P), dpdx(uv), -dpdy(uv), mapN);
}
fn lume_meanFreeNormal(mapN: vec3<f32>, meanN: vec3<f32>) -> vec3<f32> {
  let z = max(mapN.z, 1e-3);
  let meanZ = max(meanN.z, 1e-3);
  return vec3<f32>(mapN.xy * meanZ - meanN.xy * z, z * meanZ);
}`,I=`fn lume_perturbNormalTangent(N: vec3<f32>, tangent: vec4<f32>, face: f32, mapN: vec3<f32>) -> vec3<f32> {
  let t = tangent.xyz - N * dot(N, tangent.xyz);
  let len2 = dot(t, t);
  let T = t * (select(inverseSqrt(len2), 0.0, len2 < 1e-12) * face);
  let B = cross(N, T) * (select(-1.0, 1.0, tangent.w >= 0.0) * face);
  return normalize(T * mapN.x + B * mapN.y + N * mapN.z);
}`;
export{I as oMK,q as $5B,x as xSe};
