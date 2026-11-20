import{C as $c0K}from"./52e971dc2a986655.mjs";var $c0C,$c0T=[function(){return[()=>"(function(q,j){let v$1;{let j=q>>>0;v$1=(j=(j<<16|j>>>16)>>>0,j=((j&1431655765)<<1|(j&2863311530)>>>1)>>>0,j=((j&858993459)<<2|(j&3435973836)>>>2)>>>0,j=((j&252645135)<<4|(j&4042322160)>>>4)>>>0,j=((j&16711935)<<8|(j&4278255360)>>>8)>>>0,j*0.00000000023283064365386963);}return[q/j,v$1]})",()=>"(function(q){let v$2;{let q=[0,1,0];let[j,J,k]=q;v$2=[0.282095,0.488603*J,0.488603*k,0.488603*j,1.092548*j*J,1.092548*J*k,0.315392*(3*k*k-1),1.092548*j*k,0.546274*(j*j-J*J)];}let j=v$2;let J=0;let k=0;let Q=0;for(let M=0;M<9;M+=1){let V=j[M]??0;J+=(q[M*4]??0)*V,k+=(q[M*4+1]??0)*V,Q+=(q[M*4+2]??0)*V}return 0.2126*J+0.7152*k+0.0722*Q})"]}],$c0XU=[0];var $c0S,$c0D=()=>eval($c0S);function $c0E(s){$c0S=s;return $c0D()}$c0C=$c0K($c0T,$c0XU,$c0E,2,851336115519488);(globalThis.__spawnColdCross||(globalThis.__spawnColdCross=[])).push([$c0C.w,[1]]);
;const{YTp:Z,baH:Y}=$Lr;
var $=8,X=$*$,N=`fn ibl_paddedSource(face: u32, ij: vec2<i32>, n: u32) -> vec3<i32> {
  let m = i32(n);
  let q = select(ij, vec2<i32>(ij.x, clamp(ij.y, 0, m - 1)), (ij.x < 0) || (ij.x >= m));
  if (all(q >= vec2<i32>(0)) && all(q < vec2<i32>(m))) { return vec3<i32>(q, i32(face)); }
  return env_cubeTexelOf(env_cubeFaceDirection(face, (vec2<f32>(q) + 0.5) / f32(n)), n);
}
fn env_radicalInverse(bitsIn: u32) -> f32 {
  var bits = bitsIn;
  bits = (bits << 16u) | (bits >> 16u);
  bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
  bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
  bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
  bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
  return f32(bits) * 2.3283064365386963e-10;
}

fn env_hammersley(i: u32, n: u32) -> vec2<f32> {
  return vec2<f32>(f32(i) / f32(n), env_radicalInverse(i));
}

fn env_importanceSampleGgx(xi: vec2<f32>, roughness: f32) -> vec3<f32> {
  let a = roughness * roughness;
  let phi = 6.283185307179586 * xi.x;
  let cosTheta = sqrt((1.0 - xi.y) / (1.0 + (a * a - 1.0) * xi.y));
  let sinTheta = sqrt(max(1.0 - cosTheta * cosTheta, 0.0));
  return vec3<f32>(sinTheta * cos(phi), sinTheta * sin(phi), cosTheta);
}

fn env_loadCapture(dir: vec3<f32>) -> vec4<f32> {
  let texel = env_cubeTexelOf(dir, textureDimensions(envCaptureArray).x);
  return textureLoad(envCaptureArray, texel.xy, texel.z, 0);
}

fn ibl_prefilter(face: u32, texel: vec2<u32>, uv: vec2<f32>, roughness: f32, sampleCount: u32) -> vec4<f32> {
  let n = env_cubeFaceDirection(face, uv);
  if (roughness <= 0.0) {
    let mip0 = textureLoad(envCaptureArray, vec2<i32>(texel), i32(face), 0);
    return select(vec4<f32>(0.0, 0.0, 0.0, 1.0), clamp(mip0, vec4<f32>(0.0), vec4<f32>(65504.0)), mip0 == mip0);
  }
  let up = select(vec3<f32>(0.0, 1.0, 0.0), vec3<f32>(1.0, 0.0, 0.0), abs(n.y) > 0.999);
  let tangentX = normalize(cross(up, n));
  let tangentY = cross(n, tangentX);
  var accumulated = vec3<f32>(0.0);
  var totalWeight = 0.0;
  for (var i = 0u; i < sampleCount; i = i + 1u) {
    let xi = env_hammersley(i, sampleCount);
    let h = env_importanceSampleGgx(xi, roughness);
    let hWorld = tangentX * h.x + tangentY * h.y + n * h.z;
    let l = normalize(2.0 * dot(n, hWorld) * hWorld - n);
    let nol = dot(n, l);
    if (nol > 0.0) {
      let s = env_loadCapture(l).rgb;
      accumulated = accumulated + select(vec3<f32>(0.0), clamp(s, vec3<f32>(0.0), vec3<f32>(65504.0)), s == s) * nol;
      totalWeight = totalWeight + nol;
    }
  }
  return vec4<f32>(accumulated / max(totalWeight, 1e-4), 1.0);
}

var<workgroup> reduceShared: array<vec3<f32>, ${X}>;

fn env_shBasis(d: vec3<f32>, i: u32) -> f32 {
  switch i {
    case 0u: { return 0.282095; }
    case 1u: { return 0.488603 * d.y; }
    case 2u: { return 0.488603 * d.z; }
    case 3u: { return 0.488603 * d.x; }
    case 4u: { return 1.092548 * d.x * d.y; }
    case 5u: { return 1.092548 * d.y * d.z; }
    case 6u: { return 0.315392 * (3.0 * d.z * d.z - 1.0); }
    case 7u: { return 1.092548 * d.x * d.z; }
    default: { return 0.546274 * (d.x * d.x - d.y * d.y); }
  }
}

fn env_shBandOverPi(i: u32) -> f32 {
  if (i == 0u) { return 1.0; }
  if (i < 4u) { return 2.0 / 3.0; }
  return 0.25;
}

fn ibl_shProject(thread: u32, faceSize: u32) {
  let texelCount = 6u * faceSize * faceSize;
  var partial: array<vec3<f32>, 9>;
  for (var i = 0u; i < 9u; i = i + 1u) { partial[i] = vec3<f32>(0.0); }

  for (var texel = thread; texel < texelCount; texel = texel + ${X}u) {
    let face = texel / (faceSize * faceSize);
    let inFace = texel % (faceSize * faceSize);
    let x = inFace % faceSize;
    let y = inFace / faceSize;
    let uv = (vec2<f32>(f32(x), f32(y)) + 0.5) / f32(faceSize);
    let direction = env_cubeFaceDirection(face, uv);
    let s = uv.x * 2.0 - 1.0;
    let t = uv.y * 2.0 - 1.0;
    let weight = 4.0 / (f32(faceSize) * f32(faceSize) * pow(1.0 + s * s + t * t, 1.5));
    let raw = textureLoad(envCaptureArray, vec2<i32>(i32(x), i32(y)), i32(face), 0).rgb;
    let radiance = select(vec3<f32>(0.0), clamp(raw, vec3<f32>(0.0), vec3<f32>(65504.0)), raw == raw) * weight;
    for (var i = 0u; i < 9u; i = i + 1u) {
      partial[i] = partial[i] + radiance * env_shBasis(direction, i);
    }
  }

  for (var band = 0u; band < 9u; band = band + 1u) {
    reduceShared[thread] = partial[band];
    workgroupBarrier();
    var stride = ${X/2}u;
    while (stride > 0u) {
      if (thread < stride) { reduceShared[thread] = reduceShared[thread] + reduceShared[thread + stride]; }
      workgroupBarrier();
      stride = stride / 2u;
    }
    if (thread == 0u) {
      shOut[band] = vec4<f32>(reduceShared[0] * env_shBandOverPi(band), 0.0);
    }
    workgroupBarrier();
  }
}`;function P(q,j){let J=[];for(let k=0;k<j;k+=1){let Q=Math.max(1,q>>k),M=Math.ceil((Q+2)/$);J.push({mip:k,size:Q,roughness:j>1?k/(j-1):0,dispatch:[M,M,Z]})}return J}function W(a,b){return (W=$c0C(0)).call(this,a,b)}function f(q,j){let J=j*j,k=Y*q[0],Q=Math.sqrt((1-q[1])/(1+(J*J-1)*q[1])),M=Math.sqrt(Math.max(1-Q*Q,0));return[M*Math.cos(k),M*Math.sin(k),Q]}function y(a){return (y=$c0C(1)).call(this,a)}
;

;import{R as $Lr}from"./52e971dc2a986655.mjs";export{N as u8Q,P as MiD,W as haA,X as HvO,f as nQe,y as yYP};
