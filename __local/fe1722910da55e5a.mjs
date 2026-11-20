
var e=`fn patina_packedHeight(albedoHeightSample: vec4<f32>) -> f32 {
  return albedoHeightSample.a;
}

fn patina_packedNormalTs(nroSample: vec4<f32>, strength: f32) -> vec3<f32> {
  let normalXy = (nroSample.rg * 2.0 - 1.0) * strength;
  let normalZ = sqrt(max(1e-4, 1.0 - clamp(dot(normalXy, normalXy), 0.0, 1.0)));
  return vec3<f32>(normalXy, normalZ);
}

fn patina_packedRoughness(nroSample: vec4<f32>) -> f32 {
  return nroSample.b;
}
`;
export{e as luT};
