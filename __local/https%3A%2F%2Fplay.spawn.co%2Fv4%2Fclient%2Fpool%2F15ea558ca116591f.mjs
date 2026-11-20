import{C as $c0K}from"./52e971dc2a986655.mjs";var $c0C,$c0T=[function(){return[()=>"(function(q,D,G){let k=W[q];if(!k)throw Error(`lume environment: cube face ${q} out of range`);let H=2*D-1,I=2*G-1,M=k.axis[0]+k.s[0]*H+k.t[0]*I,P=k.axis[1]+k.s[1]*H+k.t[1]*I,Q=k.axis[2]+k.s[2]*H+k.t[2]*I,J=1/R(M,P,Q);return[M*J,P*J,Q*J]})"]}],$c0XU=[0];var $c0S,$c0D=()=>eval($c0S);function $c0E(s){$c0S=s;return $c0D()}$c0C=$c0K($c0T,$c0XU,$c0E,1,1828411540504576);
;const{YTp:K,fRd:R,stg:W}=$Lr;
function N(a,b,c){return (N=$c0C(0)).call(this,a,b,c)}var O=`fn env_cubeFaceDirection(face: u32, uv: vec2<f32>) -> vec3<f32> {
  let s = uv.x * 2.0 - 1.0;
  let t = uv.y * 2.0 - 1.0;
  var dir = vec3<f32>(0.0, 0.0, 0.0);
  switch face {
    case 0u: { dir = vec3<f32>(1.0, -t, -s); }
    case 1u: { dir = vec3<f32>(-1.0, -t, s); }
    case 2u: { dir = vec3<f32>(s, 1.0, t); }
    case 3u: { dir = vec3<f32>(s, -1.0, -t); }
    case 4u: { dir = vec3<f32>(s, -t, 1.0); }
    default: { dir = vec3<f32>(-s, -t, -1.0); }
  }
  return normalize(dir);
}`;var V=`fn env_cubeTexelOf(dir: vec3<f32>, size: u32) -> vec3<i32> {
  let a = abs(dir);
  var face = 0u;
  var s = 0.0;
  var t = 0.0;
  var major = a.x;
  if (a.x >= a.y && a.x >= a.z) {
    face = select(1u, 0u, dir.x >= 0.0);
    s = select(dir.z, -dir.z, dir.x >= 0.0);
    t = -dir.y;
  } else if (a.y >= a.z) {
    face = select(3u, 2u, dir.y >= 0.0);
    major = a.y;
    s = dir.x;
    t = select(-dir.z, dir.z, dir.y >= 0.0);
  } else {
    face = select(5u, 4u, dir.z >= 0.0);
    major = a.z;
    s = select(-dir.x, dir.x, dir.z >= 0.0);
    t = -dir.y;
  }
  let inv = 1.0 / max(major, 1e-20);
  let fsize = f32(size);
  let tx = clamp(i32(floor((s * inv * 0.5 + 0.5) * fsize)), 0, i32(size) - 1);
  let ty = clamp(i32(floor((t * inv * 0.5 + 0.5) * fsize)), 0, i32(size) - 1);
  return vec3<i32>(tx, ty, i32(face));
}`;class X{constructor(q){this.size=void 0;this.device=null;this.resources=null;this.size=Math.max(1,Math.floor(q))}ensure(q){if(this.resources&&this.device===q)return this.resources;this.device=q;let D=q.createTexture({label:"lume sky capture cube",size:{width:this.size,height:this.size,depthOrArrayLayers:K},format:"rgba16float",usage:16|4}),G=[];for(let k=0;k<K;k+=1)G.push(D.createView({label:`lume sky capture face ${k}`,dimension:"2d",baseArrayLayer:k,arrayLayerCount:1}));return this.resources={texture:D,faceViews:G,arrayView:D.createView({label:"lume sky capture array view",dimension:"2d-array"})},this.resources}holds(q){return this.resources?.texture===q}release(){this.resources?.texture.destroy(),this.resources=null,this.device=null}}
;

;import{R as $Lr}from"./52e971dc2a986655.mjs";export{N as GuG,O as wj8,V as tXk,X as i9h};
