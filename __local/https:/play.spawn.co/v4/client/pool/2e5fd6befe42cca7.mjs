
var Y="0.35",Z=1,$=2,z=3,P="texture_depth_2d_array";function K(j,q){return`decor_coverTexel(${j}, ${q}, textureLoad(${j}, ${q}, 0, 0), true)`}var J="1.0",Q=`fn decor_coverTexel(mask: texture_depth_2d_array, texel: vec2<i32>, first: f32, movers: bool) -> f32 {
  let layers = textureNumLayers(mask);
  var held = first;
  if (movers && layers > 1u) { held = min(held, textureLoad(mask, texel, 1, 0)); }
  if (layers > 2u) { held = min(held, textureLoad(mask, texel, 2, 0)); }
  return held;
}

fn decor_coverSurface(depth: f32, yMin: f32, yRange: f32) -> f32 {
  if (depth >= 1.0) { return 1e9; }
  return yMin + depth * yRange;
}

fn decor_coverClears(overRoot: f32, height: f32) -> bool {
  return overRoot > -${J} && overRoot < height + 0.35;
}`,X=9;function M(j,q){return`@group(${j}) @binding(${q}) var coverDepth: texture_depth_2d_array;
@group(${j}) @binding(${X}) var coverBefore: texture_depth_2d_array;

${Q}

fn decor_coverHeightIn(worldX: f32, worldZ: f32, before: bool) -> f32 {
  let texels = i32(item.coverA.w);
  if (texels <= 0) { return 1e9; }
  let tx = i32(floor((worldX - item.coverA.x) * item.coverA.z));
  let tz = i32(floor((worldZ - item.coverA.y) * item.coverA.z));
  if (tx < 0 || tz < 0 || tx >= texels || tz >= texels) { return 1e9; }
  let at = vec2<i32>(tx, tz);
  var held = textureLoad(coverDepth, at, 0, 0);
  if (before) { held = textureLoad(coverBefore, at, 0, 0); }
  let depth = decor_coverTexel(coverDepth, at, held, item.geometry.w < 1.0 || !decor_pressHolds(vec2<f32>(worldX, worldZ)));
  return decor_coverSurface(depth, item.coverB.x, item.coverB.y);
}

fn decor_covered(worldX: f32, worldZ: f32, rootY: f32) -> bool {
  return decor_coverClears(decor_coverHeightIn(worldX, worldZ, false) - rootY, item.law.z);
}

fn decor_coverKeep(worldX: f32, worldZ: f32, rootY: f32) -> f32 {
  let now = select(1.0, 0.0, decor_covered(worldX, worldZ, rootY));
  if (item.coverB.w <= 0.0) { return now; }
  let t = (frame.fadeTime - item.coverB.z) / item.coverB.w;
  if (t >= 1.0) { return now; }
  let before = select(1.0, 0.0, decor_coverClears(decor_coverHeightIn(worldX, worldZ, true) - rootY, item.law.z));
  return mix(before, now, smoothstep(0.0, 1.0, t));
}`}
export{$ as h1i,J as $_3,K as SWI,M as azj,P as WKT,Q as fEx,X as s48,Y as KnI,Z as rTP,z as DrS};
