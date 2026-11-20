;const{EcS:z,dIR:B}=$Lr;
var G=`
${B("lume_paneProjectionAlong")}
fn lume_pictureDepth(surfaceDepth: f32, surface: vec3<f32>, plane: vec4<f32>) -> f32 {
  var origin = frame.cameraPosition;
  var ray = surface - origin;
  let orthographic = frame.proj[3][3] != 0.0;
  if (orthographic) {
    origin = surface;
    ray = -vec3<f32>(frame.view[0].z, frame.view[1].z, frame.view[2].z);
  }
  let denominator = dot(plane.xyz, ray);
  if (abs(denominator) < 0.000001) { return surfaceDepth; }
  let distance = -(dot(plane.xyz, origin) + plane.w) / denominator;
  if (!orthographic && distance <= 0.0) { discard; }
  let projected = ${z("vec4<f32>(origin + ray * distance, 1.0)")};
  let depth = projected.z / projected.w;
  if (depth >= 1.0) { return surfaceDepth; }
  return max(depth, 0.0);
}

fn lume_translucentRank(z: f32, ndc: vec2<f32>) -> f32 {
  let p = lume_paneProjectionAlong(frame.proj, ndc);
  let d = max((p[3][2] - z * p[3][3]) / (p[2][2] - z * p[2][3]), 1e-3);
  let rank = max(d - 0.0055, 0.5 * d);
  return clamp(max((-p[2][2] * rank + p[3][2]) / max(-p[2][3] * rank + p[3][3], 1e-6), z + 1.65e-7), 0.0, 1.0);
}

fn lume_paneDepth(surfaceDepth: f32, surface: vec3<f32>, sourcePlane: vec4<f32>, translucent: bool) -> f32 {
  if (all(sourcePlane == vec4<f32>(0.0)) || frame.sort2d > 0.5) { return surfaceDepth; }
  var plane = sourcePlane;
  if (frame.guest != 0.0) {
    let normal = (frame.guestMap * vec4<f32>(plane.xyz, 0.0)).xyz;
    plane = vec4<f32>(normal, plane.w - dot(normal, frame.guestMap[3].xyz));
  }
  let projectedSurface = ${z("vec4<f32>(surface, 1.0)")};
  let physicalDepth = projectedSurface.z / projectedSurface.w;
  var lift = 1.0;
  if (physicalDepth != 0.0) { lift = surfaceDepth / physicalDepth; }
  var ranked = lume_pictureDepth(physicalDepth, surface, plane);
  if (translucent) { ranked = lume_translucentRank(ranked, projectedSurface.xy / projectedSurface.w); }
  return clamp(ranked * lift, 0.0, 1.0);
}

fn lume_paneFaceOpen(sourceFacePlane: vec4<f32>, faceState: vec4<f32>) -> bool {
  var facePlane = sourceFacePlane;
  if (frame.guest != 0.0) {
    let normal = (frame.guestMap * vec4<f32>(facePlane.xyz, 0.0)).xyz;
    facePlane = vec4<f32>(normal, facePlane.w - dot(normal, frame.guestMap[3].xyz));
  }
  let front = all(sourceFacePlane == vec4<f32>(0.0)) || dot(facePlane, vec4<f32>(frame.cameraPosition, 1.0)) > 0.0;
  return select(faceState.y, faceState.x, front) >= 0.5;
}

fn lume_paneFaceDepth(surfaceDepth: f32, surface: vec3<f32>, depthPlane: vec4<f32>, sourceFacePlane: vec4<f32>, faceState: vec4<f32>) -> f32 {
  if (!lume_paneFaceOpen(sourceFacePlane, faceState)) { return surfaceDepth; }
  return lume_paneDepth(surfaceDepth, surface, depthPlane, faceState.z > 0.5);
}`,J=`
var<private> lume_paneLights: u32 = 1u;
fn lume_paneLightsOf(depthPlane: vec4<f32>, sourceFacePlane: vec4<f32>, faceState: vec4<f32>) -> u32 {
  let covered = (faceState.w > 0.5 || !all(depthPlane == vec4<f32>(0.0))) && frame.sort2d <= 0.5 && faceState.z < 0.5 && lume_paneFaceOpen(sourceFacePlane, faceState);
  return select(1u, 0u, covered);
}`;
;

;import{R as $Lr}from"./52e971dc2a986655.mjs";export{G as GoK,J as uCj};
