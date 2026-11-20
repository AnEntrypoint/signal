
var b=`
fn fx_dissolve_noise01(p: vec3<f32>) -> f32 {
  return shade_perlin3(p) * 0.5 + 0.5;
}
fn fx_dissolve_erode(x: f32, threshold: f32) -> f32 {
  return 1.0 - smoothstep(threshold - 0.2, threshold + 0.2, x);
}
fn fx_dissolve_edge(mask: f32) -> f32 {
  return mask * (1.0 - mask) * 4.0;
}
`,j="mix(1.2, -0.2, dissolveAmount)";
export{b as KDm,j as l9H};
