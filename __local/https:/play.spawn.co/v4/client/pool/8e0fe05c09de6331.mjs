
;var K=`${U}

${B}`,X=`fn voxel_mix(input: u32) -> u32 {
  var value = input;
  value ^= value >> 16u;
  value *= 0x7feb352du;
  value ^= value >> 15u;
  value *= 0x846ca68bu;
  value ^= value >> 16u;
  return value;
}

fn voxel_candidateId(gx: i32, gz: i32, cellY: i32, seed: u32) -> u32 {
  let a = voxel_mix((u32(gx) * 0x8da6b343u) ^ (seed * 0xcb1ab31fu));
  let b = voxel_mix(a ^ (u32(gz) * 0xd8163841u));
  return voxel_mix(b ^ (u32(cellY) * 0x9e3779b9u));
}
`,b=V("decor_candidateBase(id)"),I=`fn decor_effectiveScale(worldX: f32, worldZ: f32, paintD: f32, paintHash: f32, waterDepth: f32) -> f32 {
  var effectiveScale = 1.0;
  if (uniforms.clusterA.y > 0.5) { effectiveScale *= decor_clusterMod(worldX, worldZ); }
  if (uniforms.countPad.w > 0.5) {
    let noiseSeed = uniforms.clusterB.z;
    let noiseCoord = vec2<f32>(worldX + noiseSeed * 17.31, worldZ + noiseSeed * 31.17) * uniforms.clusterB.y;
    let noiseValue = terrain_gradientNoise2D(noiseCoord) * 0.5 + 0.5;
    let t = (noiseValue - uniforms.clusterB.w) / 0.12;
    effectiveScale *= clamp(t, 0.0, 1.0);
  }
  if (paintD > 0.0) { effectiveScale = max(effectiveScale, min(paintD, 1.0)); }
  if (paintD <= -1.0 || (paintD < 0.0 && paintHash < -paintD)) { effectiveScale = 0.0; }
  if (uniforms.countPad.y > 0.5) {
    effectiveScale *= 1.0 - smoothstep(uniforms.countPad.z, uniforms.countPad.z + ${Q}, waterDepth);
  }
  return effectiveScale;
}
`,M=`fn decor_gridRange(regionId: i32, lo: f32, hi: f32, phase: f32) -> vec2<i32> {
  let region = uniforms.regions[regionId];
  let gridW = max(i32(region.a.z), 1);
  let placementRadius = max(region.b.x, 1e-4);
  let cellSize = placementRadius * 2.0 / f32(gridW);
  return vec2<i32>(i32(floor(lo / cellSize - phase)) - 1, i32(ceil(hi / cellSize - phase)) + 1);
}
`,N=J;function w(q,z,j,Y,Z,$){return z.getComputePipeline(j,function(){let x=q.createPipelineLayout({label:j,bindGroupLayouts:[z.getBindGroupLayout(Y,j)]});return{label:j,layout:x,compute:{module:q.createShaderModule({label:j,code:Z()}),entryPoint:$}}})}
;

;import{Dlo as Q,MK4 as B,S1p as J,TeC as U,ffx as V}from"./c61abaa2-862a46069bf7b32a.mjs";export{I as ETn,K as dq7,M as WdET,N as dyl,X as T_wk,b as DDV,w as ggH};
