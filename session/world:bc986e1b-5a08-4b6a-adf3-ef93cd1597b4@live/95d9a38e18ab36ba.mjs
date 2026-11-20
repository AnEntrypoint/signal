;const{h1y:_,lH3:l}=$Lr;;;;
;;var B=64,N=9,P=10,i=6,n=7,M=0.25,E=1.25,w=21,V=M/(E*-Math.log(1-l)),x=(A)=>Math.pow(Math.min(1,Math.max(0,1-A)),V);function K(A,o){let s=typeof A==="object"&&A!==null?Reflect.get(A,"matter"):void 0,L=typeof s==="object"&&s!==null?Reflect.get(s,"clear"):void 0;return _(L)?Math.min(1,Math.max(0,L)):x(o)}var z=`${e}

fn voxel_swayAt(at: vec2f, travel: vec2f, clock: f32, force: f32) -> vec3f {
  let windDirLen = length(frame.wind.xy);
  let windDir = select(vec2f(0.0, -1.0), frame.wind.xy / max(windDirLen, 1e-4), windDirLen > 1e-4);
  let windSpeed = max(frame.wind.z, 0.0);
  let phase = terrain_hash2D(at + vec2f(53.0, 91.0), 0.0);
  let gustUv = (at - travel) * (0.8 * 0.22) + vec2f(phase * 0.31);
  let lean = 0.32 + 0.68 * terrain_noise2D(gustUv, 3.1);
  let shimmer = (terrain_noise2D(gustUv * 2.7 + vec2f(19.0, 41.0), 7.7) - 0.5) * 0.5 + sin(clock * (2.6 + phase * 2.2) + phase * 6.2831853) * 0.14;
  let drift = (windDir * lean + vec2f(-windDir.y, windDir.x) * shimmer) * (force * windSpeed * 0.5);
  let capped = drift * min(1.0, ${a.toFixed(1)} / max(length(drift), 1e-4));
  return vec3f(capped.x, 0.0, capped.y);
}`,J=`fn voxel_swayMotion(color: vec4f, worldPosition: vec3f, step: vec3f) -> LumeMotionFragment {
  return LumeMotionFragment(color, vec4f(lume_motionVector(frame.viewProj * vec4f(worldPosition, 1.0), frame.prevViewProj * vec4f(worldPosition - step, 1.0)), 0.0, color.a));
}`,Z=`fn voxel_swaySurfaceMotion(out: LumeSurfaceOut, worldPosition: vec3f, step: vec3f) -> LumeSurfaceMotionOut {
  return lume_surfaceMotion(out, lume_motionVector(frame.viewProj * vec4f(worldPosition, 1.0), frame.prevViewProj * vec4f(worldPosition - step, 1.0)));
}`;
;

;import{R as $Lr}from"./52e971dc2a986655.mjs";import"./28eaa8f9-50fa1514558f9aa0.mjs";import"./9ea24b35-1e1b57998df92b8d.mjs";import"./6b955a52-ea78f70fb95b96b1.mjs";import{eNv as e}from"./3a143d46-c72a17da50e9068c.mjs";import{De2 as d,FDh as Y,Gg8 as h,cQ9 as a,chk as f,v6j as b}from"./6b955a52-ea78f70fb95b96b1.mjs";export{B as cMf,E as aJe,J as ScD,K as hPq,M as cyb,N as Si9,P as w80,V as ED8,Y as Q4I,Z as z8n,a as u$s,b as dNX,d as jVq,f as jTf,h as D61,i as FlK,n as nKD,w as UCk,x as BVC,z as bTc};
