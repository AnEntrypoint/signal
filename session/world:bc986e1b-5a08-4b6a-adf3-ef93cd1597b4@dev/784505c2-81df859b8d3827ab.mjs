;;;;;;;;;;
;;;;;;;;;;;;;;;;;;;;;;;;var H$=134217728;var O0=`fn voxel_ringClasses(ring: u32) -> u32 {
  let side = (vec4<u32>(ring) >> vec4<u32>(3u, 4u, 1u, 6u)) & vec4<u32>(1u);
  let diagonal = ((vec4<u32>(ring) >> vec4<u32>(0u, 2u, 5u, 7u)) & vec4<u32>(1u)) | (side.xyxy & side.zzww);
  let sides = side.x * 0x4108u + side.y * 0x10420u + side.z * 0x580u + side.w * 0x16000u;
  let diagonals = diagonal.x * 0x100u + diagonal.y * 0x400u + diagonal.z * 0x4000u + diagonal.w * 0x10000u;
  return ${W$}u - sides - diagonals;
}

fn voxel_classLevels(classes: u32, cell: vec2<u32>, span: vec2<u32>) -> vec4<u32> {
  let lo = select(vec2<u32>(0u), vec2<u32>(2u, 6u), cell == vec2<u32>(0u));
  let hi = select(vec2<u32>(0u), vec2<u32>(4u, 12u), cell + vec2<u32>(1u) == span);
  return (vec4<u32>(classes) >> (vec4<u32>(lo.x, hi.x, lo.x, hi.x) + vec4<u32>(lo.y, lo.y, hi.y, hi.y))) & vec4<u32>(3u);
}`,w8=`fn voxel_ringBit(ring: u32, i: i32, j: i32) -> u32 {
  let k = u32((j + 1) * 3 + (i + 1));
  return (ring >> select(k, k - 1u, k > 4u)) & 1u;
}

fn voxel_faceValueRead(placement: u32, value: u32) -> u32 {
  if ((placement & ${K9>>>0}u) == 0u) { return value; }
  return value & 0x0100ffffu;
}

${O0}`;var b8=`
struct VoxelSmoothPlane {
  a: vec3<f32>,
  b: vec3<f32>,
  valley: bool,
}

fn voxel_smoothPlaneThrough(p: vec3<f32>, q: vec3<f32>, r: vec3<f32>) -> vec4<f32> {
  let n = cross(q - p, r - p);
  if (abs(n.z) < 1e-6) { return vec4<f32>(0.0); }
  return vec4<f32>(p.z - dot(n.xy, vec2<f32>(0.5) - p.xy) / n.z, -n.xy / n.z, 1.0);
}

fn voxel_smoothPlane(placement: u32, value: u32) -> VoxelSmoothPlane {
  let solid = ((value >> 25u) & 0x7fu) | select(0u, 0x80u, (placement & ${B$>>>0}u) != 0u);
  let open = (value >> 16u) & 0xffu;
  let p0 = vec3<f32>(0.0, 0.0, 0.0) + voxel_smoothCorner(0, 0, solid, open).shift;
  let p1 = vec3<f32>(1.0, 0.0, 0.0) + voxel_smoothCorner(1, 0, solid, open).shift;
  let p2 = vec3<f32>(1.0, 1.0, 0.0) + voxel_smoothCorner(1, 1, solid, open).shift;
  let p3 = vec3<f32>(0.0, 1.0, 0.0) + voxel_smoothCorner(0, 1, solid, open).shift;
  return voxel_smoothPlaneOf(p0, p1, p2, p3, (placement & ${Y9}u) != 0u);
}

fn voxel_smoothPlaneOf(p0: vec3<f32>, p1: vec3<f32>, p2: vec3<f32>, p3: vec3<f32>, flip: bool) -> VoxelSmoothPlane {
  var a = voxel_smoothPlaneThrough(p0, p1, p2);
  var b = voxel_smoothPlaneThrough(p0, p2, p3);
  var off = p1;
  if (flip) {
    a = voxel_smoothPlaneThrough(p0, p1, p3);
    b = voxel_smoothPlaneThrough(p1, p2, p3);
    off = p0;
  }
  let flat = vec4<f32>((p0.z + p1.z + p2.z + p3.z) * 0.25, 0.0, 0.0, 1.0);
  let planeA = select(select(flat, b, b.w > 0.5), a, a.w > 0.5);
  let planeB = select(planeA, b, b.w > 0.5);
  var out: VoxelSmoothPlane;
  out.a = planeA.xyz;
  out.b = planeB.xyz;
  out.valley = off.z > planeB.x + dot(planeB.yz, off.xy - vec2<f32>(0.5)) + 1e-6;
  return out;
}

fn voxel_smoothRise(plane: VoxelSmoothPlane, f: vec2<f32>) -> f32 {
  let a = plane.a.x + dot(plane.a.yz, f - vec2<f32>(0.5));
  let b = plane.b.x + dot(plane.b.yz, f - vec2<f32>(0.5));
  return clamp(select(min(a, b), max(a, b), plane.valley), -1.0, 1.0);
}`;var v8=`
fn voxel_densityUpPlane(w: vec3<u32>, placement: u32) -> VoxelSmoothPlane {
  let m0 = voxel_densityMove(w, 0u);
  let m1 = voxel_densityMove(w, 1u);
  let m2 = voxel_densityMove(w, 2u);
  let m3 = voxel_densityMove(w, 3u);
  let flip = (placement & ${Y9}u) != 0u;
  return voxel_smoothPlaneOf(vec3<f32>(m0.x, m0.z, m0.y + 0.5), vec3<f32>(1.0 + m1.x, m1.z, m1.y + 0.5), vec3<f32>(1.0 + m3.x, 1.0 + m3.z, m3.y + 0.5), vec3<f32>(m2.x, 1.0 + m2.z, m2.y + 0.5), flip);
}

fn voxel_densityStepsPlane(steps: u32, placement: u32) -> VoxelSmoothPlane {
  let h = vec4<f32>(f32(steps & 63u), f32((steps >> 6u) & 63u), f32((steps >> 12u) & 63u), f32((steps >> 18u) & 63u)) / ${P$}.0 - vec4<f32>(0.5);
  let flip = (placement & ${Y9}u) != 0u;
  return voxel_smoothPlaneOf(vec3<f32>(0.0, 0.0, h.x), vec3<f32>(1.0, 0.0, h.y), vec3<f32>(1.0, 1.0, h.w), vec3<f32>(0.0, 1.0, h.z), flip);
}`,g8=`fn voxel_arenaU32(at: u32) -> u32 {
  let pair = quadWords[at >> 1u];
  return select(pair.x, pair.y, (at & 1u) == 1u);
}

fn voxel_densityCorners(arenaQuad: u32, placement: u32, value: u32) -> vec3<u32> {
  let at = arenaQuad * 2u + voxel_densityField(placement, value);
  return vec3<u32>(voxel_arenaU32(at), voxel_arenaU32(at + 1u), voxel_arenaU32(at + 2u));
}

fn voxel_densityNormals(arenaQuad: u32, placement: u32, value: u32) -> vec3<u32> {
  let at = arenaQuad * 2u + voxel_densityField(placement, value) + ${U$}u;
  return vec3<u32>(voxel_arenaU32(at), voxel_arenaU32(at + 1u), voxel_arenaU32(at + 2u));
}`;var h0=6,E8=h0*4;var y8=H$/64;var p0={opaque:{roughness:1,metalness:0,opacity:1},glass:{roughness:0.05,metalness:0,opacity:D$},liquid:{roughness:0.08,metalness:0.02,opacity:n}};var H6=F$.causticStrength??0;var T$=function($){let[J,Q]=L$;if($?.length!==2)return[J,Q];let[Z,q]=$;if(!u(Z)||!u(q))return[J,Q];let K=I$(Z,q);if(K<=0.000001)return[J,Q];return[Z/K,q/K]};var y=64,h9=9,f9=10,G9=6,p9=7,m0=0.25,u0=1.25,A$=21,c0=m0/(u0*-Math.log(1-n));function x$($,J){let Q=typeof $==="object"&&$!==null?Reflect.get($,"matter"):void 0,Z=typeof Q==="object"&&Q!==null?Reflect.get(Q,"clear"):void 0;return u(Z)?Math.min(1,Math.max(0,Z)):(Math.pow(Math.min(1,Math.max(0,1-J)),c0))}var S$=`
fn wet_grazingGleam(roughness: f32) -> f32 {
  let x = 1.0 - roughness;
  return (0.0016 - 0.00088 * roughness + 0.9984 * (x * x * x + 0.0425 - 0.0275 * roughness)) / (1.0 - 0.047142832 * roughness);
}
fn wet_roughnessOfGleam(gleam: f32) -> f32 {
  var lo = 0.0;
  var hi = 1.0;
  for (var i = 0u; i < 8u; i = i + 1u) {
    let mid = 0.5 * (lo + hi);
    let over = wet_grazingGleam(mid) > gleam;
    lo = select(lo, mid, over);
    hi = select(mid, hi, over);
  }
  return hi;
}
fn wet_roughness(dryRgb: vec3<f32>, dryRoughness: f32, wetRgb: vec3<f32>, wetRoughness: f32) -> f32 {
  let luma = vec3<f32>(0.2126, 0.7152, 0.0722);
  let dry = clamp(dot(dryRgb, luma), 0.0, 1.0);
  let wet = clamp(dot(wetRgb, luma), 0.0, 1.0);
  if (wet > dry) { return wetRoughness; }
  let dryLight = dry + (1.0 - dry) * wet_grazingGleam(clamp(dryRoughness, 0.0, 1.0));
  return max(wetRoughness, wet_roughnessOfGleam((dryLight - wet) / max(1.0 - wet, 1e-4)));
}`;var R$=0.1,w$={desktop:6000,constrained:3000};var b$=1/Math.tan(j9/6);;var O6=new Float32Array(1+v$);var i0=new Uint8Array(16384);;(function(){for(let $ of["->","&&","||","==","!=","<=",">=","++","--","+=","-=","*=","/=","%=","&=","|=","^="])i0[$.charCodeAt(0)*128+$.charCodeAt(1)]=1;})();var s0=1,a0=2,r0=4,m9=new Uint8Array(128);;(function(){for(let $ of` 	
\r\v\f`)m9[$.charCodeAt(0)]=s0;;(function(){})();for(let $=0;$<128;$++){let J=String.fromCharCode($);if(/[A-Za-z_]/.test(J))m9[$]=a0;if(/[0-9]/.test(J))m9[$]=r0}})();var E$="0[xX][0-9a-fA-F]*\\.?[0-9a-fA-F]*(?:[pP][+-]?[0-9]+)?[fhiu]?|[0-9]*\\.?[0-9]+(?:[eE][+-]?[0-9]+)?[fhiu]?|[0-9]+\\.?(?:[eE][+-]?[0-9]+)?[fhiu]?",s6=new RegExp(`^(?:${E$})`),a6=new RegExp(`(?:${E$})`,"y");function i($,J,Q){return{binding:$,visibility:J,buffer:{type:Q}}}function y$($,J,Q,Z){return{binding:$,visibility:J,texture:Z===void 0?{sampleType:Q}:{sampleType:Q,viewDimension:Z}}}var k$="depth16unorm",o0="depth32float";var t0=0.0001,TJ=t0.toFixed(6);var u9=0,O$=1;var e0=0.00004,$7="4e-5";var J7="0.015625";var AJ=`M.layer.x * ${J7} * 1.0625 * ownStep`,Q7=0.00000005960464477539063,Z7=4*Q7/e0,_$=Z7.toExponential(6),q7=($,J)=>`(${$}.z + select(max(${$}.z + frame.proj[2][2] * ${$}.w, ${_$} * ${$}.z), max(frame.proj[3][2] * ${$}.w - ${$}.z, ${_$} * frame.proj[3][2] * ${$}.w), frame.proj[3][3] > 0.5) * (${J}))`;var xJ=`  out.position.z = ${q7("out.position",`-${$7}`)};`;var Y7="less-equal";function K7($,J,Q,Z,q,K=k$){return{quad:`let size = vec2<f32>(textureDimensions(${$}, 0));
  let p = ${Q} * size - 0.5;
  let i = floor(p);`,weights:"let w = round((p - i) * 256.0) / 256.0;",reference:`let r = ${K==="depth16unorm"?`round(clamp(${q}, 0.0, 1.0) * 65535.0) / 65535.0`:q};`,test:`vec4<f32>(r) ${Y7==="less-equal"?"<=":"<"} textureGather(0, ${$}, ${J}, (i + 1.0) / size, ${Z})`,filtered:"mix(mix(c.w, c.z, w.x), mix(c.x, c.y, w.x), w.y)"}}function h$($){let J=K7("t","s","uv","layer","reference",$);return`t: texture_2d_array<f32>, s: sampler, uv: vec2<f32>, layer: i32, reference: f32) -> f32 {
  ${J.quad}
  ${J.weights}
  ${J.reference}
  let c = select(vec4<f32>(0.0), vec4<f32>(1.0), ${J.test});
  return ${J.filtered};
}`}var SJ=`fn lume_shadowCompare(${h$(k$)}`,RJ=`fn lume_atlasShadowCompare(${h$(o0)}`;var f$="rg11b10ufloat",p$=Object.freeze([6,6,5]),m$=Object.freeze({rgba16float:[65504,65504,65504],rg11b10ufloat:[65024,65024,64512]});var G7="lume_storeMask";var[u$,c$,d$]=p$;var [j7,V7,X7]=m$[f$];var O=($)=>$*8388608;var dJ=`override ${G7}: u32 = 0u;
fn lume_storeGrid(v: vec3<f32>, n: f32) -> vec3<f32> {
  let most = vec3<f32>(${s(j7)}, ${s(V7)}, ${s(X7)});
  let c = clamp(v, vec3<f32>(0.0), most);
  let e = max(bitcast<vec3<u32>>(c) & vec3<u32>(${_(O(255))}), vec3<u32>(${_(O(113))}));
  let x = c * bitcast<vec3<f32>>(vec3<u32>(${_(O(254+u$))}, ${_(O(254+c$))}, ${_(O(254+d$))}) - e);
  let q = select(max(floor(x + vec3<f32>(n)), vec3<f32>(0.0)), x, floor(x) == x);
  return min(q * bitcast<vec3<f32>>(e - vec3<u32>(${_(O(u$))}, ${_(O(c$))}, ${_(O(d$))})), most);
}
fn lume_storeNoise(pixel: vec2<f32>) -> f32 {
  let p = floor(pixel);
  return fract(52.9829189 * fract(dot(p, vec2<f32>(0.06711056, 0.00583715)))) + fract(dot(p, vec2<f32>(0.7548776662, 0.569840291))) - 0.5;
}
`;var c9=4096;var lJ=`vec2<f32>(frame.grainAnchor - floor(frame.grainAnchor / ${c9}.0) * ${c9}.0, floor(frame.grainAnchor / ${c9}.0))`,z7="lume_storeOnScreen",nJ=new RegExp(`\\bvar\\s*<\\s*private\\s*>\\s*${z7}\\s*:\\s*bool\\b`);var W7=`struct Frame {
view: mat4x4f,
proj: mat4x4f,
viewProj: mat4x4f,
inverseViewProj: mat4x4f,
cameraPosition: vec3f,
time: f32,
viewportSize: vec2f,
deltaTime: f32,
sort2d: f32,
canvasSize: vec2f,
worldTime: f32,
bodyOpacity: f32,
wind: vec3f,
flatArt: f32,
windTravel: vec2f,
wet: f32,
rain: f32,
renderOrigin: vec3f,
ySortOrigin: f32,
guestMap: mat4x4f,
guest: f32,
lodHeight: f32,
ownOut: f32,
grainAnchor: f32,
guestClipPlane: vec4f,
prevViewProj: mat4x4f,
prevView: mat4x4f,
prevTime: f32,
prevWorldTime: f32,
prevWindTravel: vec2f,
motionValid: f32,
fadeTime: f32,
toneMap: f32,
depthFloor: f32,
audioLevel: f32,
parallelEye: f32,
gridShare: f32,
eyeParts: f32,
audioBands: array<vec4f, 8>,
inverseProj: mat4x4f,
focus: vec3f,
prevOrtho: f32,
depthRow: vec4f,
sourceOrigin: vec3f,
cssPixel: f32,
sortOrders: f32,
ySortStep: f32,
eyeRise: f32,
lensDepth: f32,
};
@group(0) @binding(0) var<uniform> frame: Frame;
`,B7=`${W7}
fn lume_frameClip(viewProj: mat4x4f, point: vec4f) -> vec4f {
  let clip = viewProj * point;
  return select(clip, vec4f(clip.xy, dot(frame.depthRow, point) + frame.depthFloor * clip.w, clip.w), frame.depthFloor > 0.0);
}
`;var l9=(function($,J="frame.viewProj"){return`lume_frameClip(${J}, ${$})`});var l$=[i(0,1|2|4,"uniform")];var aJ=[...l$,y$(1,2,"uint","2d"),i(2,2,"uniform")];var n$=1e4;var i$=100,t=n$*i$;function N7($){return (n$>>$)-1>>1}var D7=1e8,s$=200000000,a$=0.001,n9=0.01,M7=30*Math.PI/180,z1=Math.cos(M7);var H1=n9+(a$-n9)*(D7/s$),W1=(a$-n9)/s$;var i9=16,r$=64,s9=r$*8388608,o$=Math.floor((s9/i9-t)/(2*t)),B1=o$*t+t/2;var t$=1065353216,U1=t$-i9,e$=2**-r$,L7=new Uint32Array(1),P1=new Float32Array(L7.buffer);var C1=t$-s9,I7=0.00000095367431640625,N1=Math.fround((1-2*I7)/s9);var D1=N7(0);var M1=`select(1.0, ${s(e$)}, frame.flatArt > 0.5)`,L1=u9+(O$-u9)*e$,F7=0.5,I1=-F7*i9;var F1=(o$+1)*t;var Q5={near:R$,far:w$.desktop};var T7=880,Z5=T7/4;var Y5=`fn lume_placedClip(viewProj: mat4x4f, anchor: vec3f, offset: vec3f) -> vec4f {
  let anchorPoint = vec4f(anchor, 1.0);
  return ${l9("anchorPoint","viewProj")} + viewProj * vec4f(offset, 0.0);
}`;var A7=`fn lume_motionVector(currentClip: vec4f, previousClip: vec4f) -> vec2f {
  if (frame.motionValid < 0.5 || currentClip.w <= 0.0 || previousClip.w <= 0.0) { return vec2f(0.0); }
  return currentClip.xy / currentClip.w - previousClip.xy / previousClip.w;
}`;var K5=`${A7}
struct LumeMotionFragment {
  @location(0) color: vec4f,
  @location(1) motion: vec4f,
}
fn lume_staticMotionFragment(color: vec4f, worldPosition: vec3f) -> LumeMotionFragment {
  let p = vec4f(worldPosition, 1.0);
  return LumeMotionFragment(color, vec4f(lume_motionVector(frame.viewProj * p, frame.prevViewProj * p), 0.0, color.a));
}`;var G5=Math.fround(b$);var $0=1000;var J0=6;var z9=4,K0=4,x7=3,J9=12,o9={head:0,base:1,baseShares:2,rare:3,unitA:4,unitB:5,unitC:6,unitD:7,rim:8,joint:9,cellsA:10,cellsB:11,cellsC:12,speck:13,grainA:14,grainB:15,field:16,blobs:17,drift:18,means:19,features:20,face:A$,edge:22,accents:23,jointMean:27,classMean:28,colours:31,states:35,flow:53,tones:54},S7=o9.tones+J9,R7={blocks:1,cells:2,grain:4,field:8,drift:16,speck:32,accents:64,world:128,blink:256,flow:512},w7={jointRun:1,jointCourse:2,stands:4},b7={pairs:1,tall:2,top:4,overJoint:8,gateShift:4,blinkShift:6,catchShift:14},B9=0.0625,Q0=0.25,v7=2.5,Z0=10,g7=16,H9=65536,Q9=8,r9={floor:0.25,slope:3.5},W9=0.85;var V9={lo:0.3,hi:0.9},X9={lo:0.1,hi:0.4},E7=2,y7=3,_7=16;var D5=[i(h9,2,"read-only-storage"),i(f9,1,"read-only-storage")],M5=`@group(2) @binding(${h9}) var<storage, read> voxelSurfaceTable: array<vec4<f32>>;
@group(2) @binding(${f9}) var<storage, read> voxelChunkCells: array<vec4<i32>>;`;var L5=`  let cover = palette[decoded.paletteRow + 3u];
  let faceDir = quadWords[survivorSlot].x & 7u;
  let faceValue = voxel_faceValueRead(quadWords[survivorSlot].x, quadWords[survivorSlot].y);
  let stepLevels = voxel_classLevels(decoded.shade, vec2u(0u), vec2u(((decoded.shade >> 18u) & 0x1fu) + 1u, ((decoded.shade >> 23u) & 0x1fu) + 1u));
  let oneStep = ((faceValue >> 24u) & 1u) == 1u && stepLevels.x != 3u && stepLevels.y != 3u;
  out.look = vec2u(u32(cover.z + 0.5), faceDir | (u32(cover.w + 0.5) << 3u) | (u32(oneStep) << ${G9}u) | (u32((quadWords[survivorSlot].x & ${K9>>>0}u) != 0u) << ${p9}u));
  out.microPos = decoded.localPos * ${y}.0;
  out.microOrigin = voxelChunkCells[decoded.chunkSlot].xyz;
  out.cubeScale = 1.0 / (chunkParams[decoded.chunkSlot].x * ${y}.0);`;var H=o9,R=R7,$9=w7,h=b7,I5=`${S$}
override voxel_terms = 0xffffffffu;
override voxel_slant = true;
struct VoxelSurface {
  rgb: vec3<f32>,
  roughness: f32,
  metalness: f32,
  emissive: vec3<f32>,
  tilt: vec3<f32>,
  soft: f32,
  cube: f32,
}

struct VoxelSurfaceTone {
  rgb: vec3<f32>,
  shade: vec3<f32>,
}

struct VoxelSurfaceLive {
  eye: vec3<f32>,
  sun: vec3<f32>,
  sunLight: f32,
  clock: f32,
}

struct VoxelSurfaceUnit {
  base: f32,
  joint: f32,
  rim: f32,
  laid: f32,
  jointRow: f32,
  rimRow: f32,
}

fn surf_hash(x: u32, y: u32, z: u32, seed: u32) -> u32 {
  var h = (x * 0x9E3779B1u) ^ (y * 0x85EBCA77u) ^ (z * 0xC2B2AE3Du) ^ (seed * 0x27D4EB2Fu);
  h = (h ^ (h >> 15u)) * 0x2C1B3C6Du;
  h = (h ^ (h >> 12u)) * 0x297A2D39u;
  return h ^ (h >> 15u);
}

fn surf_unit(h: u32) -> f32 {
  return f32(h >> 8u) * 5.9604645e-8;
}

fn surf_word(v: f32) -> u32 {
  return bitcast<u32>(i32(v));
}

fn surf_div(a: f32, n: f32) -> f32 {
  return floor((a + 0.5) / n);
}

fn surf_tone(row: vec4f) -> VoxelSurfaceTone {
  let glow = floor(row.w / 4096.0);
  let rest = row.w - glow * 4096.0;
  let metal = floor(rest / 256.0);
  return VoxelSurfaceTone(row.rgb, vec3f((rest - metal * 256.0) / 255.0, metal / 15.0, glow / 15.0));
}

fn surf_mix(a: VoxelSurfaceTone, b: VoxelSurfaceTone, k: f32) -> VoxelSurfaceTone {
  return VoxelSurfaceTone(mix(a.rgb, b.rgb, k), mix(a.shade, b.shade, k));
}

fn surf_ramp(tones: u32, t: f32) -> VoxelSurfaceTone {
  let low = floor(t);
  let a = surf_tone(voxelSurfaceTable[tones + u32(low)]);
  let part = t - low;
  if (part <= 0.0) { return a; }
  return surf_mix(a, surf_tone(voxelSurfaceTable[tones + u32(low) + 1u]), part);
}

fn surf_accent(base: u32, y: f32) -> VoxelSurfaceTone {
  return surf_tone(voxelSurfaceTable[select(base + ${H.tones}u + u32(y), base + ${H.colours}u + u32(y) - 100u, y >= 100.0)]);
}

fn surf_field(cell: vec3u, shift: vec3u, seed: u32) -> vec3f {
  let size = vec3u(1u) << shift;
  let node = cell >> shift;
  let f = (vec3f(cell & (size - vec3u(1u))) + vec3f(0.5)) / vec3f(size);
  let w = f * f * (vec3f(3.0) - 2.0 * f);
  var sum = vec3f(0.0);
  for (var corner = 0u; corner < 8u; corner = corner + 1u) {
    let o = vec3u(corner & 1u, (corner >> 1u) & 1u, corner >> 2u);
    let h = surf_hash(node.x + o.x, node.y + o.y, node.z + o.z, seed);
    let value = vec3f(vec3u(h, h >> 10u, h >> 20u) & vec3u(1023u)) * (1.0 / 1023.0);
    let k = mix(vec3f(1.0) - w, w, vec3f(o));
    sum = sum + value * (k.x * k.y * k.z);
  }
  return sum;
}

fn surf_drift(p: vec2u, axis: u32, shift: u32, seed: u32) -> f32 {
  let size = 1u << shift;
  let node = p >> vec2u(shift);
  let f = (vec2f(p & vec2u(size - 1u)) + vec2f(0.5)) / f32(size);
  let w = f * f * (vec2f(3.0) - 2.0 * f);
  let a = surf_unit(surf_hash(node.x, node.y, axis, seed));
  let b = surf_unit(surf_hash(node.x + 1u, node.y, axis, seed));
  let c = surf_unit(surf_hash(node.x, node.y + 1u, axis, seed));
  let d = surf_unit(surf_hash(node.x + 1u, node.y + 1u, axis, seed));
  return mix(mix(a, b, w.x), mix(c, d, w.x), w.y);
}

fn surf_line(v: f32, lineA: u32, lineB: u32, seed: u32) -> f32 {
  let node = floor(v);
  let f = v - node;
  let a = surf_unit(surf_hash(surf_word(node), lineA, lineB, seed));
  let b = surf_unit(surf_hash(surf_word(node + 1.0), lineA, lineB, seed));
  return mix(a, b, f * f * (3.0 - 2.0 * f));
}

fn surf_base(base: u32, h: u32) -> f32 {
  let row = voxelSurfaceTable[base + ${H.base}u];
  let shares = voxelSurfaceTable[base + ${H.baseShares}u];
  let rare = voxelSurfaceTable[base + ${H.rare}u];
  let u = surf_unit(h);
  var pick = min(floor(u * row.y), row.y - 1.0);
  if (shares.x >= 0.0) { pick = f32(u >= shares.x) + f32(u >= shares.y) + f32(u >= shares.z) + f32(u >= shares.w); }
  let r = surf_unit(h * 0x9E3779B1u);
  if (r < rare.x) { return rare.y; }
  if (r > 1.0 - rare.z) { return rare.w; }
  return row.x + pick;
}

fn surf_end(index: f32, courseWord: u32, seed: u32, uneven: f32) -> f32 {
  return floor((surf_unit(surf_hash(surf_word(index), courseWord, 13u, seed)) - 0.5) * (2.0 * uneven + 1.0) + 0.5);
}

fn surf_blocks(base: u32, q: vec2f, cell: vec3u, world: bool, seed: u32) -> VoxelSurfaceUnit {
  let ua = voxelSurfaceTable[base + ${H.unitA}u];
  let ub = voxelSurfaceTable[base + ${H.unitB}u];
  let uc = voxelSurfaceTable[base + ${H.unitC}u];
  let ud = voxelSurfaceTable[base + ${H.unitD}u];
  let rim = voxelSurfaceTable[base + ${H.rim}u];
  let bits = u32(uc.x);
  let stands = (bits & ${$9.stands}u) != 0u;
  let jointOnRun = (bits & ${$9.jointRun}u) != 0u;
  let jointOnCourse = (bits & ${$9.jointCourse}u) != 0u;
  let runAt = select(q.x, q.y, stands);
  var courseAt = select(q.y, q.x, stands);
  if (ub.w > 0.0) {
    let bendAt = select(runAt, f32((cell.x + cell.z) & 0xffffu), world);
    courseAt = courseAt + floor((surf_line((bendAt + 0.5) / ud.z, 9u, 0u, seed) - 0.5) * 2.0 * ub.w + 0.5);
  }
  if (ub.z > 0.0) { courseAt = courseAt + floor(surf_unit(surf_hash(surf_word(surf_div(runAt, ub.z)), 7u, 0u, seed)) * 2.0); }
  let course = surf_div(courseAt, ua.x);
  let inCourse = courseAt - course * ua.x;
  let courseWord = surf_word(course);
  var runLength = ua.y;
  if (ua.z > 0.0) { runLength = runLength + floor(surf_unit(surf_hash(courseWord, 11u, 0u, seed)) * (ua.z + 1.0)); }
  var slide = ua.w * (course - 2.0 * floor(course * 0.5));
  if (ua.w < 0.0) { slide = floor(surf_unit(surf_hash(courseWord, 12u, 0u, seed)) * runLength); }
  let run = runAt + slide;
  var index = surf_div(run, runLength);
  var inRun = run - index * runLength;
  if (ub.x > 0.0) {
    let here = surf_end(index, courseWord, seed, ub.x);
    let next = surf_end(index + 1.0, courseWord, seed, ub.x);
    if (inRun < here) {
      index = index - 1.0;
      inRun = inRun + runLength - surf_end(index, courseWord, seed, ub.x);
    } else if (inRun >= runLength + next) {
      index = index + 1.0;
      inRun = inRun - runLength - next;
    } else {
      inRun = inRun - here;
    }
  }
  var merged = false;
  if (ub.y > 0.0) {
    let pair = surf_div(index, 2.0);
    if (surf_unit(surf_hash(surf_word(pair), courseWord, 14u, seed)) < ub.y) {
      merged = index - 2.0 * pair > 0.5;
      index = pair * 2.0;
    }
  }
  let own = surf_hash(surf_word(index), courseWord, 4u, seed);
  var unit: VoxelSurfaceUnit;
  unit.base = surf_base(base, own);
  var standing = jointOnCourse;
  if (standing && uc.y < 1.0) { standing = surf_unit(surf_hash(surf_word(surf_div(runAt, uc.z)), courseWord, 17u, seed)) < uc.y; }
  var cellWord = 0u;
  if (uc.w > 0.0 || fract(rim.y) > 0.0 || fract(rim.w) > 0.0) { cellWord = surf_hash(surf_word(runAt), surf_word(courseAt), 18u, seed); }
  unit.joint = 0.0;
  if ((jointOnRun && inRun < 1.0 && !merged) || (standing && inCourse < 1.0)) {
    unit.joint = 1.0;
  } else if (standing && inCourse < 2.0 && surf_unit(cellWord * 0x9E3779B1u) < uc.w) {
    unit.joint = 2.0;
  }
  let first = f32(jointOnCourse);
  unit.rim = 0.0;
  if (inCourse >= first && inCourse < first + 1.0 && surf_unit(cellWord) < rim.y) { unit.rim = rim.x; }
  if (inCourse >= ua.x - 1.0 && surf_unit(cellWord * 0x85EBCA77u) < rim.w) { unit.rim = unit.rim + rim.z; }
  let cover = voxelSurfaceTable[base + ${H.joint}u].w;
  let s = select(0.0, min(uc.y, 1.0), jointOnCourse);
  let s2 = s * select(0.0, uc.w, ua.x >= 2.0);
  let h = clamp((ua.x * cover - s - s2) / max(ua.x - s - s2, 1e-6), 0.0, 1.0);
  unit.jointRow = h;
  if (jointOnCourse && inCourse < 1.0) {
    unit.jointRow = h + (1.0 - h) * s;
  } else if (jointOnCourse && inCourse < 2.0) {
    unit.jointRow = h + (1.0 - h) * s2;
  }
  unit.rimRow = 0.0;
  if (inCourse >= first && inCourse < first + 1.0) { unit.rimRow = rim.x * min(rim.y, 1.0); }
  if (inCourse >= ua.x - 1.0) { unit.rimRow = unit.rimRow + rim.z * min(rim.w, 1.0); }
  unit.laid = -1.0;
  let firstRun = f32(jointOnRun);
  if (ud.x > 0.0 && inRun >= firstRun && inRun < firstRun + 1.0 && inCourse >= ua.x - 1.0 && surf_unit(own * 0xC2B2AE3Du) < ud.x) { unit.laid = ud.y; }
  return unit;
}

fn surf_cells(base: u32, p: vec2f, side: f32, seed: u32) -> VoxelSurfaceUnit {
  let ca = voxelSurfaceTable[base + ${H.cellsA}u];
  let cb = voxelSurfaceTable[base + ${H.cellsB}u];
  let cc = voxelSurfaceTable[base + ${H.cellsC}u];
  let home = vec2f(surf_div(p.x, ca.x), surf_div(p.y, ca.y));
  var d1 = 1e9;
  var d2 = 1e9;
  var id1 = 0u;
  var id2 = 0u;
  var up1 = 0.0;
  let reach = select(ca.xy, vec2f(ca.z + ca.w), ca.z > 0.0);
  let centreOfCell = p + vec2f(0.5);
  for (var n = 0u; n < 9u; n = n + 1u) {
    let turn = (n + 4u) % 9u;
    let at = home + vec2f(f32(turn % 3u) - 1.0, f32(turn / 3u) - 1.0);
    let corner = at * ca.xy;
    let away = max(max(corner - centreOfCell, centreOfCell - (corner + ca.xy * ${W9})), vec2f(0.0)) / reach;
    if (length(away) >= d2) { continue; }
    let h = surf_hash(surf_word(at.x), surf_word(at.y), 20u, seed);
    let centre = (at + vec2f(surf_unit(h), surf_unit(h * 0x9E3779B1u)) * ${W9}) * ca.xy;
    var scale = ca.xy;
    if (ca.z > 0.0) { scale = vec2f(ca.z + ca.w * surf_unit(h * 0x85EBCA77u)); }
    let v = (centreOfCell - centre) / scale;
    let d = length(v);
    if (d < d1) {
      d2 = d1;
      id2 = id1;
      d1 = d;
      id1 = h;
      up1 = v.y;
    } else if (d < d2) {
      d2 = d;
      id2 = h;
    }
  }
  var unit: VoxelSurfaceUnit;
  unit.base = surf_base(base, id1) + cb.x * up1 * side - cb.y * d1;
  unit.rim = 0.0;
  let cellWord = surf_hash(surf_word(p.x), surf_word(p.y), 21u, seed);
  let crack = cb.z > 0.0 && d2 - d1 < cb.z && surf_unit(surf_hash(min(id1, id2), max(id1, id2), 22u, seed)) < cb.w;
  let gap = cc.w > 0.5 && d1 > 1.0;
  unit.joint = f32(crack || gap);
  var ring = d2 - d1 < cc.x;
  if (ca.z > 0.0) { ring = d1 > cc.x; }
  unit.laid = -1.0;
  if (ring && surf_unit(cellWord) < cc.y) { unit.laid = cc.z; }
  return unit;
}

fn surf_fade(footprint: f32, feature: f32) -> f32 {
  return 1.0 - smoothstep(${V9.lo}, ${V9.hi}, footprint / feature);
}

fn voxel_surface(look: vec2u, microOrigin: vec3i, microPos: vec3f, microFw: vec3f, cubeScale: f32, live: VoxelSurfaceLive) -> VoxelSurface {
  let dir = look.y & 7u;
  let state = (look.y >> 3u) & 7u;
  let axis = dir >> 1u;
  let positive = (dir & 1u) == 0u;
  let nrm = vec3f(f32(axis == 0u), f32(axis == 1u), f32(axis == 2u)) * select(-1.0, 1.0, positive);
  let appear = voxelSurfaceTable[0].x;
  var base = look.x;
  let cap = u32(voxelSurfaceTable[base].z);
  if (dir == 2u && cap != 0u) { base = cap; }
  let head = voxelSurfaceTable[base];
  let flags = u32(head.w) & voxel_terms;
  let features = voxelSurfaceTable[base + ${H.features}u];
  let edge = voxelSurfaceTable[base + ${H.edge}u];
  let klass = select(1u, select(2u, 0u, positive), axis == 1u);

  let cellShift = u32(head.x);
  let cellMicro = f32(1u << cellShift);
  let pixelMicro = max(max(microFw.x, microFw.y), microFw.z);
  var reach = microFw / cellMicro;
  if ((flags & ${R.world}u) == 0u) {
    if (axis == 0u) { reach = reach.zyx; } else if (axis == 1u) { reach = reach.xzy; }
  }
  let footprint = pixelMicro / cellMicro;
  let isBlocks = (flags & ${R.blocks}u) != 0u;
  let fadeCell = surf_fade(footprint, 1.0) * appear;
  let fadeField = surf_fade(footprint, features.y) * appear * f32((flags & ${R.field}u) != 0u);
  let fadeDrift = surf_fade(footprint, features.z) * appear * f32((flags & ${R.drift}u) != 0u);
  var unitSize = vec2f(1.0);
  var fadeRow = 0.0;
  var fadeInRow = 0.0;
  var rimMean = 0.0;
  if (isBlocks) {
    let ua = voxelSurfaceTable[base + ${H.unitA}u];
    let ub = voxelSurfaceTable[base + ${H.unitB}u];
    let ubits = u32(voxelSurfaceTable[base + ${H.unitC}u].x);
    let warpLength = voxelSurfaceTable[base + ${H.unitD}u].z;
    let rimRow = voxelSurfaceTable[base + ${H.rim}u];
    let line = max(1.0, min(select(${H9}.0, ub.z, ub.z > 0.0), select(${H9}.0, warpLength / max(1.0, 2.0 * ub.w), ub.w > 0.0)));
    let standsUp = (ubits & ${$9.stands}u) != 0u;
    let run = max(1.0, min(ua.y, line));
    let course = max(1.0, ua.x);
    unitSize = select(vec2f(run, course), vec2f(course, run), standsUp);
    let alongRun = select(reach.x, reach.y, standsUp);
    let upCourse = select(reach.y, reach.x, standsUp);
    fadeRow = surf_fade(max(upCourse, alongRun / line), 1.0) * appear;
    fadeInRow = surf_fade(alongRun, 1.0) * appear;
    let first = f32((ubits & ${$9.jointCourse}u) != 0u);
    rimMean = (rimRow.x * min(rimRow.y, 1.0) * f32(first < ua.x) + rimRow.z * min(rimRow.w, 1.0)) / ua.x;
  } else if ((flags & ${R.cells}u) != 0u) {
    unitSize = max(voxelSurfaceTable[base + ${H.cellsA}u].xy, vec2f(1.0));
  }
  let fadeUnit = surf_fade(max(reach.x / unitSize.x, reach.y / unitSize.y), 1.0) * appear;
  let alive = max(max(max(fadeCell, fadeUnit), max(fadeField, fadeDrift)), fadeRow);
  let blinks = (flags & ${R.blink}u) != 0u && appear > 0.0;
  let soft = select(0.0, smoothstep(${X9.lo}, ${X9.hi}, pixelMicro * cubeScale) * appear, axis != 1u && ((look.y >> ${G9}u) & 1u) == 1u);

  var tone = surf_tone(voxelSurfaceTable[base + ${H.classMean}u + klass]);
  if (alive > 0.0 || blinks) {
    let seed = u32(head.y);
    let low = vec3f(microOrigin & vec3i(i32((1u << cellShift) - 1u)));
    var slide = vec3f(0.0);
    if ((flags & ${R.flow}u) != 0u) {
      let flow = voxelSurfaceTable[base + ${H.flow}u];
      slide = select(vec3f(0.0, -flow.z, 0.0), vec3f(flow.x, 0.0, flow.y), axis == 1u) * live.clock;
    }
    let slid = floor(slide);
    let point = (microOrigin >> vec3u(cellShift)) + vec3i(floor((microPos + low) / cellMicro - nrm * 0.5 - (slide - slid))) - vec3i(slid);
    let cell = bitcast<vec3u>(point) + vec3u(0x40000000u);
    let cellHash = surf_hash(cell.x, cell.y, cell.z, seed);
    var frame = cell;
    if ((flags & ${R.world}u) == 0u) {
      if (axis == 0u) { frame = cell.zyx; } else if (axis == 1u) { frame = cell.xzy; }
    }
    let q = vec2f(frame.xy & vec2u(0xffffu));
    let tones = voxelSurfaceTable[base + ${H.base}u];
    let means = voxelSurfaceTable[base + ${H.means}u];
    let faces = voxelSurfaceTable[base + ${H.face}u];

    var fieldValue = vec3f(0.5);
    if (fadeField > 0.0) { fieldValue = surf_field(cell, vec3u(voxelSurfaceTable[base + ${H.field}u].xyz), seed + 2u); }
    var driftRow = vec4f(0.0, 2.0, -1.0, 0.0);
    var driftValue = 0.5;
    if (fadeDrift > 0.0) {
      driftRow = voxelSurfaceTable[base + ${H.drift}u];
      driftValue = surf_drift(frame.xy, axis, u32(driftRow.x), seed + 3u);
    }

    if (alive > 0.0) {
    var unit = VoxelSurfaceUnit(means.x, 0.0, 0.0, -1.0, 0.0, 0.0);
    if (fadeUnit > 0.0 || fadeRow > 0.0) {
      if (isBlocks) {
        unit = surf_blocks(base, q, cell, (flags & ${R.world}u) != 0u, seed);
      } else if ((flags & ${R.cells}u) != 0u) {
        unit = surf_cells(base, q, f32(axis != 1u), seed);
      } else {
        unit.base = surf_base(base, cellHash * 0x85EBCA77u);
      }
    }
    var t = mix(means.x, unit.base, fadeUnit);

    var cellWalk = means.y - rimMean;
    if (fadeCell > 0.0) {
      var walk = select(unit.rim, 0.0, isBlocks);
      if ((flags & ${R.speck}u) != 0u) {
        let speck = voxelSurfaceTable[base + ${H.speck}u];
        let u = surf_unit(surf_hash(frame.x >> u32(speck.z), frame.y, frame.z, seed + 5u) * 0xC2B2AE3Du);
        walk = walk + f32(u > 1.0 - speck.x) - f32(u < speck.y);
      }
      if ((flags & ${R.grain}u) != 0u) {
        let ga = voxelSurfaceTable[base + ${H.grainA}u];
        let gb = voxelSurfaceTable[base + ${H.grainB}u];
        var run = frame.x;
        var lineA = frame.y;
        var lineB = frame.z;
        if (ga.x > 3.5) {
          run = frame.y;
          lineA = frame.x;
        } else if (ga.x < 2.5) {
          let world = u32(ga.x);
          run = select(select(cell.z, cell.y, world == 1u), cell.x, world == 0u);
          lineA = select(cell.x, cell.y, world == 0u);
          lineB = select(cell.z, cell.y, world == 2u);
        }
        let lineWord = surf_hash(lineA, lineB, 31u, seed);
        let along = f32(run & 0xffffu);
        if (ga.w > 0.5) {
          let segment = ga.y + floor(surf_unit(lineWord) * (ga.z + 1.0));
          let phase = floor(surf_unit(lineWord * 0x9E3779B1u) * segment);
          walk = walk + floor(surf_unit(surf_hash(surf_word(surf_div(along + phase, segment)), lineA, lineB, seed + 6u)) * gb.x);
        } else if (surf_unit(lineWord * 0x85EBCA77u) < gb.z) {
          let n = surf_line((along + 0.5) / ga.y, lineA, lineB, seed + 6u);
          walk = walk + f32(n > gb.x) - f32(n < gb.y);
        }
      }
      cellWalk = mix(means.y - rimMean, walk, fadeCell);
    }
    if (isBlocks) { cellWalk = cellWalk + mix(rimMean, mix(unit.rimRow, unit.rim, fadeInRow), fadeRow); }
    var fieldWalk = means.z;
    if (fadeField > 0.0) {
      let blobs = voxelSurfaceTable[base + ${H.blobs}u];
      fieldWalk = mix(means.z, f32(fieldValue.x > blobs.x) - f32(fieldValue.x < blobs.y), fadeField);
    }
    var driftWalk = means.w;
    if (fadeDrift > 0.0) { driftWalk = mix(means.w, f32(driftValue > driftRow.y) - f32(driftValue < driftRow.z), fadeDrift); }
    let faceWalk = select(faces.y, select(faces.z, faces.x, positive), axis == 1u);
    t = t + cellWalk + fieldWalk + driftWalk + faceWalk;
    t = clamp(t, tones.z, tones.w);
    if (fadeCell >= 1.0) { t = floor(t + 0.5); } else { t = mix(t, floor(t + 0.5), fadeCell); }
    var near = surf_ramp(base + ${H.tones}u, t);

    var jointUnder = 1.0;
    if (fadeCell > 0.0 && unit.laid >= 0.0) { near = surf_mix(near, surf_tone(voxelSurfaceTable[base + ${H.tones}u + u32(unit.laid)]), fadeCell); }
    if ((flags & ${R.accents}u) != 0u) {
      var word = 0u;
      var wordShape = 4u;
      var lid = 0.0;
      for (var n = 0u; n < ${z9}u; n = n + 1u) {
        let accent = voxelSurfaceTable[base + ${H.accents}u + n];
        let bits = u32(accent.z);
        if (accent.x <= 0.0 || ((bits & ${h.top}u) != 0u && dir != 2u) || ((bits >> ${h.blinkShift}u) & 255u) != 0u) { continue; }
        var hit = 0.0;
        if (fadeCell > 0.0) {
          let shape = bits & 3u;
          if (shape != wordShape) {
            word = surf_hash(frame.x >> (shape & 1u), frame.y >> (shape >> 1u), frame.z, seed + 5u);
            wordShape = shape;
          }
          hit = f32(surf_unit(word * (0x9E3779B1u + n * 0x3C6EF372u)) < accent.x);
        }
        let gate = (bits >> ${h.gateShift}u) & 3u;
        var weight = hit * fadeCell;
        if (gate == 1u) {
          weight = f32(driftValue > accent.w) * fadeDrift * mix(accent.x, hit, fadeCell);
        } else if (gate == 2u) {
          weight = f32(fieldValue.x > accent.w) * fadeField * mix(accent.x, hit, fadeCell);
        } else if (gate == 3u) {
          weight = f32(fieldValue.z > accent.w) * fadeField * mix(accent.x, hit, fadeCell);
        }
        if (weight > 0.0) {
          near = surf_mix(near, surf_accent(base, accent.y), weight);
          if ((bits & ${h.overJoint}u) != 0u) { lid = max(lid, weight); }
        }
      }
      jointUnder = 1.0 - lid;
    }
    let joint = voxelSurfaceTable[base + ${H.joint}u];
    let jointMean = surf_tone(voxelSurfaceTable[base + ${H.jointMean}u]);
    if (joint.w > 0.0) {
      var jointTone = jointMean;
      var k = joint.w * (1.0 - fadeCell);
      if (isBlocks) { k = mix(joint.w, mix(unit.jointRow, f32(unit.joint > 0.5), fadeInRow), fadeRow); }
      if (fadeCell > 0.0 && unit.joint > 0.5) {
        let second = unit.joint > 1.5 || surf_unit(cellHash * 0x27D4EB2Fu) < joint.z;
        jointTone = surf_mix(jointTone, surf_tone(voxelSurfaceTable[base + ${H.tones}u + u32(select(joint.x, joint.y, second))]), fadeCell);
        if (!isBlocks) { k = mix(joint.w, 1.0, fadeCell); }
      }
      near = surf_mix(near, jointTone, k * jointUnder);
    }
    var zero = surf_ramp(base + ${H.tones}u, clamp(means.x + means.y + means.z + means.w + faceWalk, tones.z, tones.w));
    if (joint.w > 0.0) { zero = surf_mix(zero, jointMean, joint.w); }
    tone = VoxelSurfaceTone(max(near.rgb + (tone.rgb - zero.rgb) * (1.0 - alive), vec3f(0.0)), near.shade + (tone.shade - zero.shade) * (1.0 - alive));
    }
    if (blinks) {
      var reach = microFw / cellMicro;
      if ((flags & ${R.world}u) == 0u) {
        if (axis == 0u) { reach = reach.zyx; } else if (axis == 1u) { reach = reach.xzy; }
      }
      reach = reach * ${v7};
      let level = vec3u(clamp(ceil(log2(max(reach, vec3f(1e-6)))), vec3f(0.0), vec3f(${Z0}.0)));
      let far = 1.0 - smoothstep(0.5, 1.0, max(max(reach.x, reach.y), reach.z) / ${2**Z0}.0);
      for (var n = 0u; n < ${z9}u; n = n + 1u) {
        let accent = voxelSurfaceTable[base + ${H.accents}u + n];
        let bits = u32(accent.z);
        let blink = f32((bits >> ${h.blinkShift}u) & 255u) * ${B9};
        if (blink <= 0.0 || accent.x <= 0.0 || ((bits & ${h.top}u) != 0u && dir != 2u)) { continue; }
        let at = frame >> (level + vec3u(bits & 1u, (bits >> 1u) & 1u, 0u));
        let own = surf_hash(at.x, at.y, at.z, seed + 7u + n + (level.x << 8u) + (level.y << 16u) + (level.z << 24u));
        let phase = live.clock / blink + surf_unit(own);
        let epoch = floor(phase);
        let life = phase - epoch;
        var share = accent.x;
        let lean = f32((bits >> ${h.catchShift}u) & 255u) / 255.0;
        if (lean > 0.0) {
          let mirror = pow(max(dot(reflect(-live.eye, nrm), live.sun), 0.0), ${g7}.0);
          share = share * live.sunLight * (1.0 - lean * (1.0 - mirror));
        }
        var weight = f32(surf_unit(surf_hash(own, surf_word(epoch), 23u, seed)) < share) * smoothstep(0.0, ${Q0}, life) * (1.0 - smoothstep(${1-Q0}, 1.0, life)) * far * appear;
        let gate = (bits >> ${h.gateShift}u) & 3u;
        if (gate == 1u) {
          weight = weight * f32(driftValue > accent.w) * fadeDrift;
        } else if (gate == 2u) {
          weight = weight * f32(fieldValue.x > accent.w) * fadeField;
        } else if (gate == 3u) {
          weight = weight * f32(fieldValue.z > accent.w) * fadeField;
        }
        if (weight > 0.0) {
          tone = surf_mix(tone, surf_accent(base, accent.y), weight);
        }
      }
    }
  }
  if (soft > 0.0) {
    tone = surf_mix(tone, surf_tone(voxelSurfaceTable[select(look.x, cap, cap != 0u) + ${H.classMean}u]), soft);
  }

  var rgb = tone.rgb;
  var roughness = tone.shade.x;
  var emissive = tone.rgb * (tone.shade.z * tone.shade.z * ${Q9}.0);

  if (state != 0u) {
    let stateRow = base + ${H.states}u + (state - 1u) * ${x7}u;
    let tint = voxelSurfaceTable[stateRow];
    let toward = voxelSurfaceTable[stateRow + 1u];
    let glow = voxelSurfaceTable[stateRow + 2u];
    emissive = emissive + glow.rgb * (${r9.floor} + ${r9.slope} * dot(rgb, vec3f(0.2126, 0.7152, 0.0722)));
    let dryRgb = rgb;
    let dryRoughness = roughness;
    rgb = mix(rgb * tint.rgb, toward.rgb, tint.w);
    roughness = wet_roughness(dryRgb, dryRoughness, rgb, mix(roughness, toward.w, glow.w));
  }

  var tilt = vec3f(0.0);
  if (edge.x != 0.0 && ((look.y >> ${p9}u) & 1u) == 0u) {
    let pixel = max(pixelMicro * cubeScale, 1e-6);
    let f = fract(microPos * cubeScale);
    let d = min(f, vec3f(1.0) - f);
    let lines = (vec3f(1.0) - smoothstep(vec3f(edge.y - pixel), vec3f(edge.y + pixel), d)) * (vec3f(1.0) - abs(nrm));
    let strength = edge.x * (1.0 - smoothstep(${X9.lo}, ${X9.hi}, pixel)) * appear;
    if (edge.z < 0.5) {
      rgb = rgb * (1.0 - strength * max(max(lines.x, lines.y), lines.z));
    } else {
      tilt = (step(vec3f(0.5), f) * 2.0 - vec3f(1.0)) * lines * strength;
    }
  }
  tilt = tilt + (vec3f(0.0, 1.0, 0.0) - nrm) * soft;
  return VoxelSurface(rgb, roughness, tone.shade.y, emissive, tilt, soft, cubeScale * ${y}.0);
}

fn voxel_surface_slant(look: vec2u, microOrigin: vec3i, microPos: vec3f, dx: vec3f, dy: vec3f, cubeScale: f32, live: VoxelSurfaceLive, taps: u32) -> VoxelSurface {
  let lx = length(dx);
  let ly = length(dy);
  let major = select(dy, dx, lx >= ly);
  let minor = select(dx, dy, lx >= ly);
  var base = look.x;
  let cap = u32(voxelSurfaceTable[base].z);
  if ((look.y & 7u) == 2u && cap != 0u) { base = cap; }
  let cellMicro = f32(1u << u32(voxelSurfaceTable[base].x));
  let features = voxelSurfaceTable[base + ${H.features}u];
  let widest = max(max(features.x, features.y), max(features.z, 1.0)) * cellMicro;
  let fwFar = abs(major / f32(taps)) + abs(minor);
  var n = u32(clamp(ceil(max(lx, ly) / max(min(lx, ly), ${V9.lo} * cellMicro)), 1.0, f32(taps)));
  if (max(max(fwFar.x, fwFar.y), fwFar.z) >= ${V9.hi} * widest) { n = 1u; }
  let stride = major / f32(n);
  let fw = abs(stride) + abs(minor);
  var sum = VoxelSurface();
  for (var i = 0u; i < n; i = i + 1u) {
    let s = voxel_surface(look, microOrigin, microPos + stride * (f32(i) + 0.5 - 0.5 * f32(n)), fw, cubeScale, live);
    sum = VoxelSurface(sum.rgb + s.rgb, sum.roughness + s.roughness, sum.metalness + s.metalness, sum.emissive + s.emissive, sum.tilt + s.tilt, sum.soft + s.soft, s.cube);
  }
  let w = 1.0 / f32(n);
  return VoxelSurface(sum.rgb * w, sum.roughness * w, sum.metalness * w, sum.emissive * w, sum.tilt * w, sum.soft * w, sum.cube);
}

fn voxel_surface_sky_wet(surfIn: VoxelSurface, look: vec2u, wet: f32) -> VoxelSurface {
  var surf = surfIn;
  if (wet <= 0.0 || look.x == 0u || (look.y & 7u) != 2u) { return surf; }
  var base = look.x;
  let cap = u32(voxelSurfaceTable[base].z);
  if (cap != 0u) { base = cap; }
  let tint = voxelSurfaceTable[base + ${H.states}u];
  let toward = voxelSurfaceTable[base + ${H.states}u + 1u];
  let glow = voxelSurfaceTable[base + ${H.states}u + 2u];
  surf.rgb = mix(surf.rgb, mix(surf.rgb * tint.rgb, toward.rgb, tint.w), wet);
  surf.roughness = wet_roughness(surfIn.rgb, surfIn.roughness, surf.rgb, mix(surf.roughness, toward.w, glow.w * wet));
  return surf;
}

fn voxel_surface_emissive(surfIn: VoxelSurface, look: vec2u, microOrigin: vec3i, microPos: vec3f, cubeScale: f32, now: f32) -> VoxelSurface {
  let words = voxelSurfaceTable[${E7}];
  if (words.z == 0.0) { return surfIn; }
  let dir = look.y & 7u;
  let axis = dir >> 1u;
  let nrm = vec3f(f32(axis == 0u), f32(axis == 1u), f32(axis == 2u)) * select(-1.0, 1.0, (dir & 1u) == 0u);
  let cell = vec3i(floor((vec3f(microOrigin) + microPos) * cubeScale - nrm * 0.5));
  let first = u32(words.x);
  let mask = u32(words.y);
  var mixed = (bitcast<u32>(cell.x) * 73856093u) ^ (bitcast<u32>(cell.y) * 19349663u) ^ (bitcast<u32>(cell.z) * 83492791u);
  mixed = (mixed ^ (mixed >> 16u)) * 0x45d9f3bu;
  var slot = (mixed ^ (mixed >> 16u)) & mask;
  for (var probe = 0u; probe < ${_7}u; probe = probe + 1u) {
    let at = first + slot * ${y7}u;
    let key = voxelSurfaceTable[at];
    if (key.w == 0.0) { return surfIn; }
    if (i32(key.x) == cell.x && i32(key.y) == cell.y && i32(key.z) == cell.z) {
      let shown = voxelSurfaceTable[at + 1u];
      let given = voxelSurfaceTable[at + 2u];
      var age = now - shown.w;
      if (age < -0.5 * ${e}.0) { age = age + ${e}.0; }
      var surf = surfIn;
      surf.emissive = surf.emissive + mix(shown.rgb, given.rgb, clamp(age * 1000.0 / ${$0}.0, 0.0, 1.0));
      return surf;
    }
    slot = (slot + 1u) & mask;
  }
  return surfIn;
}
`,G0=4,k7=3*G0,q0=1,O7=3,Y0=4,h7=`fn surf_endPlace(d: vec2f) -> f32 {
  let run = abs(d.x) + abs(d.y);
  if (run <= 0.0) { return 0.0; }
  return 2.0 * select(select(3.0 + d.x / run, 2.0 - d.y / run, d.x <= 0.0), select(1.0 - d.x / run, d.y / run, d.x >= 0.0), d.y >= 0.0);
}

fn surf_endKnot(e0: vec4f, e1: vec4f, sector: u32) -> f32 {
  return select(e1[sector & 3u], e0[sector & 3u], sector < 4u);
}

fn surf_endAt(e0: vec4f, e1: vec4f, d: vec2f) -> f32 {
  let place = surf_endPlace(d);
  let at = floor(place);
  let i = u32(at) & 7u;
  return mix(surf_endKnot(e0, e1, i), surf_endKnot(e0, e1, (i + 1u) & 7u), place - at);
}

fn surf_endSpan(e0: vec4f, e1: vec4f, d: vec2f, spread: f32) -> f32 {
  let place = surf_endPlace(d);
  let lo = i32(floor(place - spread));
  let hi = i32(floor(place + spread)) + 1;
  var most = 0.0;
  for (var k = lo; k <= hi; k = k + 1) { most = max(most, surf_endKnot(e0, e1, u32(k + 16) & 7u)); }
  return most;
}`,F5=`${h7}

struct SurfGrown {
  rgb: vec3<f32>,
  worn: f32,
  lean: f32,
}

fn surf_grownClass(rgb: vec3f, look: vec2u, row: u32, toEye: vec3f, normal: vec3f) -> SurfGrown {
  var out: SurfGrown;
  out.rgb = rgb;
  out.worn = 0.0;
  out.lean = 0.0;
  let words = voxelSurfaceTable[${q0}];
  let share = voxelSurfaceTable[row];
  if (share.x <= 0.0) { return out; }
  var whole = words.y;
  var doublings = words.z;
  let blades = voxelSurfaceTable[${O7}u];
  var growthEnd = blades.w;
  if (share.w > 0.5) {
    if (blades.z > 0.5) {
      whole = blades.x;
      doublings = blades.y;
      growthEnd = 0.0;
    } else if (share.w > 1.5) {
      return out;
    }
  }
  let away = length(toEye);
  var unitAway = away;
  if (share.w < 0.5 && words.w > 0.0) { unitAway = away * words.w / f32(1u << u32(voxelSurfaceTable[look.x].x)); }
  var gone = clamp(log(max(unitAway, whole) / whole) / doublings, 0.0, 1.0);
  if (growthEnd > 0.0) {
    var end = growthEnd;
    if (away < growthEnd) { end = surf_endAt(voxelSurfaceTable[${Y0}u], voxelSurfaceTable[${Y0+1}u], toEye.xz); }
    gone = max(gone, clamp((away / end - ${a9}) / ${1-a9}, 0.0, 1.0));
  }
  if (gone <= 0.0) { return out; }
  let sine = abs(dot(normalize(normal), toEye)) / max(away, 1e-4);
  let cot = sqrt(max(1.0 - sine * sine, 0.0)) / max(sine, 0.02);
  let cover = 1.0 - (1.0 - share.x) * exp(-share.y * cot);
  let grown = voxelSurfaceTable[row + 1u];
  let top = voxelSurfaceTable[row + 2u];
  let low = 1.0 - exp(-cot * top.w);
  let luma = vec3f(0.2126, 0.7152, 0.0722);
  let walk = clamp(dot(rgb, luma) / max(grown.w, 1e-4), 0.5, 2.0);
  let worn = gone * cover;
  out.rgb = mix(rgb, mix(grown.rgb, top.rgb, low) * walk, worn);
  out.worn = worn;
  out.lean = mix(share.z, voxelSurfaceTable[row + 3u].x, low) * worn;
  return out;
}

fn surf_rootLean(toSun: vec3f, ground: vec3f, lean: f32) -> vec3f {
  return (toSun - ground * dot(toSun, ground)) * (0.25 * lean);
}

fn surf_grown(surf: VoxelSurface, look: vec2u, toEye: vec3f, normal: vec3f, toSun: vec3f) -> VoxelSurface {
  var out = surf;
  let region = u32(voxelSurfaceTable[${q0}].x);
  if (region == 0u || look.x < ${J0}u || ((look.y >> 3u) & 7u) != 0u) { return out; }
  let dir = look.y & 7u;
  let klass = select(1u, select(2u, 0u, dir == 2u), (dir >> 1u) == 1u);
  let first = region + ((look.x - ${J0}u) / ${S7}u) * ${k7}u;
  let own = surf_grownClass(surf.rgb, look, first + klass * ${G0}u, toEye, normal);
  out.rgb = own.rgb;
  let n = normalize(normal);
  out.tilt = surf.tilt + surf_rootLean(toSun, n, own.lean);
  if (klass != 1u || ((look.y >> ${G9}u) & 1u) == 0u) { return out; }
  let up = vec3f(0.0, 1.0, 0.0);
  let hid = max(min(voxelSurfaceTable[first + 3u].y * surf.cube, 1.0), surf.soft);
  let riser = surf_grownClass(own.rgb, look, first, toEye, up);
  let worn = riser.worn * hid;
  if (worn <= 0.0) { return out; }
  let soft = max(surf.soft, worn);
  let cap = u32(voxelSurfaceTable[look.x].z);
  let toned = mix(own.rgb, surf_tone(voxelSurfaceTable[select(look.x, cap, cap != 0u) + ${H.classMean}u]).rgb, (soft - surf.soft) / max(1.0 - surf.soft, 1e-4));
  out.rgb = mix(toned, surf_grownClass(toned, look, first, toEye, up).rgb, hid);
  out.tilt = surf.tilt + (up - n) * (soft - surf.soft) + surf_rootLean(toSun, up, riser.lean * hid);
  out.soft = soft;
  return out;
}`;var U9=0.07;var T5=`  let paneAcross = vec3f(1.0) - abs(normalize(in.worldNormal));
  let paneP = in.worldPos + (vec3f(0.5) - fract(in.microPos * in.cubeScale)) * paneAcross / (in.cubeScale * ${y}.0);
  let paneV = ${(`normalize(mix(normalize(${("frame.cameraPosition - paneP")}), vec3<f32>(frame.view[0][2], frame.view[1][2], frame.view[2][2]), frame.parallelEye))`)};
  let paneCube = vec3f(in.microOrigin) * in.cubeScale + floor(in.microPos * in.cubeScale);
  let paneAt = paneCube.xz + vec2f(0.5);
  let paneCalm = (1.0 - smoothstep(0.35, 1.0, max(microFw.x, microFw.z) * in.cubeScale)) * step(0.5, abs(in.worldNormal.y));
  let paneLean = select(${U9}, voxelSurfaceTable[in.look.x + ${o9.flow}u].w, in.look.x != 0u);
  let paneRise = min(4.0 * abs(dot(N, paneV)), 1.0);
  let paneSlope = paneLean * paneCalm * paneRise * paneRise * paneRise * (0.6 * voxel_paneSwell(paneAt / 6.7) + 0.4 * voxel_paneSwell(mat2x2<f32>(0.8, -0.6, 0.6, 0.8) * paneAt / 3.9 + vec2f(17.0, 43.0)));
  let paneN = normalize(N + vec3f(-paneSlope.x, 0.0, -paneSlope.y));`;var e9=()=>({tone:0,over:-1,base:0,cellWalk:0,fieldWalk:0,driftWalk:0,joint:0}),g=1073741824,I=function($,J,Q,Z){let q=Math.imul($,2654435761)^Math.imul(J,2246822519)^Math.imul(Q,3266489917)^Math.imul(Z,668265263);return q=Math.imul(q^q>>>15,739982445),q=Math.imul(q^q>>>12,695872825),(q^q>>>15)>>>0},N=($)=>($>>>8)/16777216,v=($,J)=>Math.imul($,J)>>>0,I9=2654435761,F9=2246822519,V0=3266489917,f7=668265263,f=($,J)=>Math.floor(($+0.5)/J),M9=($)=>$*$*(3-2*$),C9=($,J,Q)=>$*(1-Q)+J*Q,N9=($,J,Q)=>($>J?1:0)-($<Q?1:0);var p=[0.5,0.5,0.5];function X0($,J,Q,Z,q){let K=(C,F)=>M9(((C&(1<<F)-1)+0.5)/(1<<F));let Y=K($,Z[0]);let G=K(J,Z[1]);let j=K(Q,Z[2]);let z=$>>>Z[0];let B=J>>>Z[1];let U=Q>>>Z[2];let D=0;let P=0;let M=0;for(let C=0;C<8;C+=1){let F=C&1,T=C>>1&1,A=C>>2,x=I(z+F,B+T,U+A,q),l=(F===1?Y:1-Y)*(T===1?G:1-G)*(A===1?j:1-j);D+=(x&1023)/1023*l,P+=(x>>>10&1023)/1023*l,M+=(x>>>20&1023)/1023*l}p[0]=D,p[1]=P,p[2]=M}function z0($,J,Q,Z,q){let K=1<<Z;let Y=$>>>Z;let G=J>>>Z;let j=M9((($&K-1)+0.5)/K);let z=M9(((J&K-1)+0.5)/K);let B=N(I(Y,G,Q,q));let U=N(I(Y+1,G,Q,q));let D=N(I(Y,G+1,Q,q));let P=N(I(Y+1,G+1,Q,q));return C9(C9(B,U,j),C9(D,P,j),z)}function $$($,J,Q,Z){let q=Math.floor($),K=N(I(q,J,Q,Z)),Y=N(I(q+1,J,Q,Z));return C9(K,Y,M9($-q))}function J$($,J){let Q=N(J),Z=Math.min(Math.floor(Q*$.base.count),$.base.count-1),q=$.base.shares;if(q)Z=(Q>=q[0]?1:0)+(Q>=q[1]?1:0)+(Q>=q[2]?1:0)+(Q>=q[3]?1:0);let K=N(v(J,I9));if(K<$.rare.dark)return $.rare.darkTone;if(K>1-$.rare.light)return $.rare.lightTone;return $.base.lo+Z}var L={base:0,joint:0,rim:0,laid:-1},V={cx:0,cy:0,cz:0,fx:0,fy:0,fz:0,hash:0,fieldX:0.5,fieldZ:0.5,drift:0.5},t9=($,J,Q,Z)=>Math.floor((N(I($,J,13,Q))-0.5)*(2*Z+1)+0.5),L9={index:0,inRun:0};function m7($,J,Q,Z,q){let K=J.stands?Z:Q,Y=J.stands?Q:Z;if(J.warp>0){let x=$.world?V.cx+V.cz>>>0&65535:K;Y+=Math.floor(($$((x+0.5)/J.warpLength,9,0,q)-0.5)*2*J.warp+0.5)}if(J.wander>0)Y+=Math.floor(N(I(f(K,J.wander),7,0,q))*2);let G=f(Y,J.course),j=Y-G*J.course,z=J.run+Math.floor(N(I(G,11,0,q))*(J.runJitter+1)),B=J.slide*(G-2*Math.floor(G*0.5));if(J.slide<0)B=Math.floor(N(I(G,12,0,q))*z);{let $$1=J,J$1=K+B,Q$1=z,Z$1=G;{let $=$$1,J=J$1,Q=Q$1,Z=Z$1;let K=f(J,Q),Y=J-K*Q;if($.uneven>0){let G=t9(K,Z,q,$.uneven);let j=t9(K+1,Z,q,$.uneven);if(Y<G){K-=1;Y=Y+Q-t9(K,Z,q,$.uneven);}else if(Y>=Q+j)K+=1,Y=Y-Q-j;else Y-=G}L9.index=K,L9.inRun=Y}}let{index:U,inRun:D}=L9,P=!1;if(J.doubles>0){let x=f(U,2);if(N(I(x,G,14,q))<J.doubles)P=U-2*x>0.5,U=x*2}let M=I(U,G,4,q);L.base=J$($,M);let C=J.jointCourse;if(C&&J.broken<1)C=N(I(f(K,J.brokenLength),G,17,q))<J.broken;let F=I(K,Y,18,q);if(L.joint=0,J.jointRun&&D<1&&!P||C&&j<1)L.joint=1;else if(C&&j<2&&N(v(F,I9))<J.second)L.joint=2;let T=J.jointCourse?1:0;if(L.rim=0,j>=T&&j<T+1&&N(F)<J.rimNearShare)L.rim=J.rimNear;if(j>=J.course-1&&N(v(F,F9))<J.rimFarShare)L.rim+=J.rimFar;L.laid=-1;let A=J.jointRun?1:0;if(J.chipShare>0&&D>=A&&D<A+1&&j>=J.course-1&&N(v(M,V0))<J.chipShare)L.laid=J.chipTone}var W=Math.fround,P9=W(W9),j0=($,J)=>W(Math.sqrt(W(W($*$)+W(J*J))));function u7($,J,Q,Z,q,K){let Y=f(Q,J.along),G=f(Z,J.up),j=1e9,z=1e9,B=0,U=0,D=0,P=W(J.radius),M=W(J.radiusJitter),C=P>0?W(P+M):J.along,F=P>0?W(P+M):J.up,T=Q+0.5,A=Z+0.5;for(let E9=0;E9<9;E9+=1){let G$=(E9+4)%9,y9=Y+G$%3-1,_9=G+Math.floor(G$/3)-1,j$=y9*J.along,V$=_9*J.up,g0=W(Math.max(j$-T,W(T-W(j$+W(J.along*P9))),0)/C),E0=W(Math.max(V$-A,W(A-W(V$+W(J.up*P9))),0)/F);if(j0(g0,E0)>=z)continue;let r=I(y9,_9,20,K);let y0=W(W(y9+W(N(r)*P9))*J.along);let _0=W(W(_9+W(N(v(r,I9))*P9))*J.up);let X$=P>0?W(P+W(M*N(v(r,F9)))):0;let k0=W(W(T-y0)/(P>0?X$:J.along));let z$=W(W(A-_0)/(P>0?X$:J.up));let q9=j0(k0,z$);if(q9<j)z=j,U=B,j=q9,B=r,D=z$;else if(q9<z)z=q9,U=r}L.base=W(W(J$($,B)+W(W(W(J.vertical)*D)*q))-W(W(J.radial)*j)),L.rim=0;let x=I(Q,Z,21,K),l=W(z-j),w0=J.crackWidth>0&&l<W(J.crackWidth)&&N(I(Math.min(B,U),Math.max(B,U),22,K))<W(J.crackShare),b0=J.gap&&j>1;L.joint=w0||b0?1:0;let v0=P>0?j>W(J.ring):l<W(J.ring);L.laid=v0&&N(x)<W(J.ringShare)?J.ringTone:-1}function c7($,J){let{fx:Q,fy:Z,fz:q}=V;if($.axis===4)Q=V.fy,Z=V.fx;else if($.axis<3)Q=[V.cx,V.cy,V.cz][$.axis]??V.cx,Z=$.axis===0?V.cy:V.cx,q=$.axis===2?V.cy:V.cz;let K=I(Z,q,31,J),Y=Q&65535;if($.segments){let G=$.length+Math.floor(N(K)*($.jitter+1)),j=Math.floor(N(v(K,I9))*G);return Math.floor(N(I(f(Y+j,G),Z,q,J+6))*$.hi)}if(N(v(K,F9))>=$.lines)return 0;return N9($$((Y+0.5)/$.length,Z,q,J+6),$.hi,$.lo)}var D9={lid:!1};function d7($,J,Q,Z){let q=L.laid;D9.lid=!1;let K=0,Y=4;for(let G=0;G<$.accents.length;G+=1){let j=$.accents[G];if(!j||j.share<=0||j.top&&J!==2||Z&&j.blink>0)continue;let z=(j.pairs?1:0)|(j.tall?2:0);if(z!==Y)K=I(V.fx>>>(z&1),V.fy>>>(z>>1),V.fz,Q+5),Y=z;let B=[1,V.drift,V.fieldX,V.fieldZ][j.gate]??1;if(j.gate!==0&&B<=j.over)continue;if(N(v(K,2654435761+G*1013904242))<j.share){if(q=j.tone,j.overJoint)D9.lid=!0}}if(L.joint===0||D9.lid)return q;return L.joint>1.5||N(v(V.hash,f7))<$.joint.share?$.joint.b:$.joint.a}function T9($,J,Q,Z,q,K,Y=!1){let G=$.seed,j=q>>1;{let q=j;if(V.cx=J+g>>>0,V.cy=Q+g>>>0,V.cz=Z+g>>>0,V.hash=I(V.cx,V.cy,V.cz,$.seed),V.fx=V.cx,V.fy=V.cy,V.fz=V.cz,!$.world&&q===0)V.fx=V.cz,V.fz=V.cx;else if(!$.world&&q===1)V.fy=V.cz,V.fz=V.cy;if(p[0]=0.5,p[2]=0.5,$.field)X0(V.cx,V.cy,V.cz,$.field,$.seed+2);V.fieldX=p[0],V.fieldZ=p[2],V.drift=$.drift?z0(V.fx,V.fy,q,$.drift.shift,$.seed+3):0.5}L.joint=0;L.rim=0;L.laid=-1;if($.blocks){m7($,$.blocks,V.fx&65535,V.fy&65535,G);}else if($.cells){u7($,$.cells,V.fx&65535,V.fy&65535,j===1?0:1,G);}else L.base=J$($,v(V.hash,F9));let z=L.rim;if($.speck){let M=N(v(I(V.fx>>>($.speck.pairs?1:0),V.fy,V.fz,G+5),V0));z+=N9(M,1-$.speck.up,$.speck.down)}if($.grain){z+=c7($.grain,G);}let B=$.blobs?N9(V.fieldX,$.blobs.hi,$.blobs.lo):0;let U=$.drift?N9(V.drift,$.drift.hi,$.drift.lo):0;let D=[$.face.side,$.face.top,$.face.bottom][j===1?1+(q&1):0]??0;let P=Math.min($.clamp[1],Math.max($.clamp[0],L.base+z+B+U+D));K.tone=Math.floor(P+0.5);K.over=d7($,q,G,Y);K.base=L.base;K.cellWalk=z;K.fieldWalk=B;K.driftWalk=U;K.joint=0;if(L.joint>0)K.joint=D9.lid?2:1;return K}var a=($,J)=>I($,J,0,24301)&65535,Q$=($,J)=>$-J;function H0($,J,Q){let Z=new Float64Array(Q);for(let q=0;q<Q;q+=1)X0(g+a(q,1),g+a(q,2),g+a(q,3),$,J+2),Z[q]=p[0];return Z.sort(Q$)}function W0($,J,Q){let Z=new Float64Array(Q);for(let q=0;q<Q;q+=1)Z[q]=z0(g+a(q,4),g+a(q,5),2,$,J+3);return Z.sort(Q$)}function B0($,J,Q){let Z=new Float64Array(Q);for(let q=0;q<Q;q+=1)Z[q]=$$((a(q,6)+0.5)/$,g+q,g,J+6);return Z.sort(Q$)}var A9=function($,J){if(J.over>=100)return $.colours[J.over-100];return $.tones[J.over>=0?J.over:J.tone]};var v5=e9();var n7=[{tint:[0.49,0.5,0.54],toward:[0,0,0],amount:0,rough:0.2,roughAmount:0.75,glow:d[0]},{tint:[0.42,0.28,0.24],toward:[0.32,0.035,0.008],amount:0.18,rough:1,roughAmount:0,glow:d[1]},{tint:[1,1,1],toward:[0.72,0.84,1],amount:0.58,rough:0.28,roughAmount:0.6,glow:d[2]},{tint:[0.2,0.18,0.17],toward:[0.012,0.011,0.01],amount:0.55,rough:1,roughAmount:0.9,glow:d[3]},{tint:[0.46,0.3,0.25],toward:[0.5,0.09,0.015],amount:0.2,rough:1,roughAmount:0,glow:d[4]},{tint:[0.6,0.5,0.4],toward:[0.95,0.62,0.25],amount:0.35,rough:1,roughAmount:0,glow:d[5]}];var i7={tint:[1,1,1],toward:[0,0,0],amount:0,rough:1,roughAmount:0,glow:[0,0,0]};var X=($,J,Q,Z)=>m(E($)??J,Q,Z);var w=($,J,Q,Z)=>Math.round(X($,J,Q,Z));var Z9=($,J,Q,Z)=>m(Math.round(Math.log2(Math.max(E($)??J,0.000001))),Q,Z);var S=($)=>Array.isArray($)?$:[];var b=($)=>c($)?$:void 0;var D0=function($,J,Q,Z){if(!Array.isArray($))return[w($,J,Q,Z),0];let q=w($[0],J,Q,Z);return[q,w($[1],q,q,Z)-q]};var x9=function($){let J=N0($);return J===void 0?void 0:o(J&16777215)};var M0=function($,J){let Q=c($)&&!(("l"in $)&&("c"in $))?$:void 0,Z=x9(Q?Q.color:$);if(Z===void 0)return;return{rgb:Z,roughness:X(Q?.roughness,J.roughness,0,1),metalness:X(Q?.metalness,J.metalness,0,1),glow:X(Q?.glow,0,0,Q9)}};var Z$=1024;var S9=function($,J,Q){let Z=(q)=>$[m(Math.floor(q*$.length),0,$.length-1)]??0.5;return[J>0?Z(1-J):2,Q>0?Z(Q):-1]};var r7=function($,J){let Q=w($.course,3,1,64);let Z=E(Array.isArray($.run)?$.run[0]:$.run);let q=Z===void 0||Z<1;let [K,Y]=q?[H9,0]:D0($.run,6,1,256);let G=$.joint==="course"||$.joint==="both";let j=S($.broken);let z=S($.rim);let B=S($.far);let U=S($.chip);let D=S(Array.isArray($.warp)?$.warp:[$.warp]);let P=q?{slide:0,uneven:0,doubles:0,jointRun:!1}:{slide:$.slide==="own"?-1:w($.slide,0,0,K-1),uneven:w($.uneven,0,0,Math.max(0,Math.floor((K-2)/2))),doubles:X($.doubles,0,0,1),jointRun:$.joint==="run"||$.joint==="both"};return{course:Q,run:K,runJitter:Y,...P,wander:w($.wander,0,0,64),warp:X(D[0],0,0,8),warpLength:X(D[1],12,2,256),stands:$.stands===!0,jointCourse:G,broken:X(j[0],1,0,1),brokenLength:w(j[1],3,1,64),second:G&&Q>=3?X($.second,0,0,1):0,rimNear:X(z[0],0,-4,4),rimNearShare:z.length>0?X(z[1],1,0,1):0,rimFar:X(B[0],0,-4,4),rimFarShare:B.length>0?X(B[1],1,0,1):0,chipShare:U.length>0?X(U[0],0,0,1):0,chipTone:J(U[1],0)}};var o7=function($,J){let Q=S(Array.isArray($.size)?$.size:[$.size,$.size]),Z=S(Array.isArray($.radius)?$.radius:[$.radius,$.radius]),q=X(Z[0],0,0,64),K=S($.cracks),Y=S($.ring);return{along:w(Q[0],8,2,64),up:w(Q[1],8,2,64),radius:q,radiusJitter:X(Z[1],q,q,64)-q,vertical:X($.vertical,0,-8,8),radial:X($.radial,0,-8,8),crackWidth:X(K[0],0,0,0.5),crackShare:K.length>0?X(K[1],1,0,1):0,ring:X(Y[0],0,0,2),ringShare:Y.length>0?X(Y[1],1,0,1):0,ringTone:J(Y[2],0),gap:$.gap===!0}};var t7=function($,J,Q){let Z=S(Array.isArray($.base)?$.base:[$.base,$.base]),q=X(Z[0],Math.floor(J/2),0,J),K=X(Z[1],q,q,J),Y=S($.shares).slice(0,5).map((M)=>X(M,0,0,1000)),G=Y.reduce((M,C)=>M+C,0),j=Y.length>1&&G>0,z=j?Y.length:m(Math.round(K-q)+1,1,J9),B=null;if(j){let M=0,C=Y.map((T)=>M+=T/G),F=(T)=>T<z-1?C[T]??2:2;B=[F(0),F(1),F(2),F(3)]}let U=b($.rare),D=S($.clamp),P=w(D[0],0,0,J);return{base:{lo:q,count:z,shares:B},rare:{dark:X(U?.dark,0,0,0.5),darkTone:Q(U?.darkTone,Math.floor(q)-1),light:X(U?.light,0,0,0.5),lightTone:Q(U?.lightTone,Math.ceil(q)+z)},clamp:[P,w(D[1],J,P,J)]}};var e7=function($,J){let Q=S(Array.isArray($)?$:[$,$,0]),Z=J(Q[0],0);return{a:Z,b:J(Q[1],Z),share:X(Q[2],0,0,1)}};var $8=function($){let J=b($),Q=E($),Z=X(J?J.up:Q,0,0,0.5),q=X(J?J.down:Q,0,0,0.5);return Z>0||q>0?{up:Z,down:q,pairs:J?.pairs===!0}:null};var J8={x:0,y:1,z:2,along:3,up:4};var Q8=function($,J){let Q=b($);if(!Q)return null;let Z=J8[typeof Q.axis==="string"?Q.axis:""]??3,q=E(Q.tones);if(q!==void 0&&q>=2){let[j,z]=D0(Q.length,4,1,64);return{axis:Z,length:j,jitter:z,segments:!0,hi:Math.round(m(q,2,J9)),lo:0,lines:1}}let K=X(Q.length,8,1,64);let [Y,G]=S9(B0(K,J,Z$),X(Q.up,0,0,0.5),X(Q.down,0,0,0.5));return{axis:Z,length:K,jitter:0,segments:!1,hi:Y,lo:G,lines:X(Q.lines,1,0,1)}};var q8={drift:1,blobs:2,spots:3};var q$=($)=>q8[typeof $.in==="string"?$.in:""]??0;var Y8=function($,J,Q,Z,q){let K=[],Y=[];for(let G of $){let j=E(G.tone),z=j===void 0?-1:Z(j,0),B=j===void 0?M0(G.tone,q):void 0;if(B&&K.length<K0)K.push(B),z=100+K.length-1;if(z<0)continue;let U=q$(G);let D=U===1?Q:J;let P=U!==0&&D?S9(D,X(G.cover,0.25,0.001,1),0)[0]:0;let M=E(G.blink);let C=M!==void 0&&M>0?m(Math.round(M/B9),1,255)*B9:0;Y.push({share:X(G.share,0.02,0,1),tone:z,pairs:G.pairs===!0,tall:G.tall===!0,top:G.top===!0,overJoint:G.overJoint===!0,gate:U,over:P,blink:C,catch:C>0?Math.round(X(G.catch,0,0,1)*255)/255:0})}return{accents:Y,colours:K}};var K8=function($,J,Q,Z,q){let K=b($.drift);let Y=S($.accents).filter((C)=>c(C)).slice(0,z9);let G=J!==void 0||Y.some((C)=>q$(C)>=2);let j=K!==void 0||Y.some((C)=>q$(C)===1);let z=S(Array.isArray(J?.size)?J.size:[J?.size,J?.size,J?.size]);let B=G?[Z9(z[0],8,1,6),Z9(z[1],8,1,6),Z9(z[2]??z[0],8,1,6)]:null;let U=Z9(K?.size,32,2,9);let D=B?H0(B,Q,Z$):null;let P=j?W0(U,Q,Z$):null;let M=null;if(P){let[C,F]=S9(P,X(K?.up,0,0,0.5),X(K?.down,0,0,0.5));M={shift:U,hi:C,lo:F}}let v$1;Z8:{let $$3=J,J$2=D;{let $=$$3,J=J$2;if(!$||!J){v$1=null;break Z8;}let Q=X($.up,0,0,0.5),Z=X($.down,0,0,0.5);if(Q<=0&&Z<=0){v$1=null;break Z8;}let[q,K]=S9(J,Q,Z);v$1={hi:q,lo:K};}}return{field:B,blobs:v$1,drift:M,...Y8(Y,D,P,Z,q)}};var G8=1;var j8=($)=>Array.isArray($)&&$.length===2&&typeof $[0]==="number"&&typeof $[1]==="number"?[$[0],$[1]]:void 0;var V8=function($){let J=X($.flowSpeed,0,0,G8)*P0;if(J<=0)return null;let[Q,Z]=T$(j8($.flowDirection));return{x:Q*J,z:Z*J,fall:J}};var X8=1;var z8=function($){let J=E($.waveIntensity);return J===void 0?U9:m(J,0,X8)*U9/O9};var H8=["base","blocks","cells","grain","blobs","drift","speck","accents"];var W8={size:4,up:0.24,down:0.24};var B8=0.06;var U0=new WeakMap,U8=16;function I0($,J,Q){let Z=Array.isArray($.tones)?$.tones:void 0,q=b($.pattern);if(Z===void 0&&q===void 0)return null;let K;{let $$2=Z;{let $=$$2;let Q=[];for(let Z of $??[]){let q=M0(Z,J);if(q&&Q.length<J9)Q.push(q)}if(Q.length===0)Q.push({rgb:J.rgb,roughness:J.roughness,metalness:J.metalness,glow:0});K=Q;}}let Y=q??{};let G=K.length-1;let j=(A,x)=>w(A,x,0,G);let z=w(Y.seed,0,0,65535);let B=H8.every((A)=>Y[A]===void 0);let U=b(Y.blocks);let D=U===void 0?b(Y.cells):void 0;let P=b(Y.face);let M=b(Y.edge);let C=b(Y.states);let F={cellShift:Z9((E(Y.cell)??1)*y,y,0,7),seed:z,tones:K,...t7(Y,G,j),world:Y.frame==="world",blocks:U?r7(U,j):null,cells:D?o7(D,j):null,joint:e7(Y.joint,j),speck:$8(B?B8:Y.speck),grain:Q8(Y.grain,z),...K8(Y,B?W8:b(Y.blobs),z,j,J),face:{top:X(P?.top,0,-4,4),side:X(P?.side,0,-4,4),bottom:X(P?.bottom,0,-4,4)},edge:{strength:X(M?.strength,0,-1,1),width:X(M?.width,0.06,0.005,0.4),bevel:M?.mode==="bevel"},states:C0.map(function(A,x){{let $=C?.[A],J=n7[x]??i7;if(!c($))return J;let Q=x9($.glow),Z=X($.glowIntensity,1,0,Q9);return{tint:x9($.tint)??J.tint,toward:x9($.toward)??J.toward,amount:X($.amount,J.amount,0,1),rough:X($.roughness,J.rough,0,1),roughAmount:X($.roughnessAmount,J.roughAmount,0,1),glow:Q?[Q[0]*Z,Q[1]*Z,Q[2]*Z]:J.glow}}}),cap:null,clear:x$($,J.opacity??n),flow:V8(Y),lean:z8($)};let T=Q===0?b(Y.cap):void 0;if(T)F.cap=I0({tones:T.tones??$.tones,waveIntensity:$.waveIntensity,pattern:{cell:Y.cell,edge:Y.edge,states:Y.states,flowSpeed:Y.flowSpeed,flowDirection:Y.flowDirection,...b(T.pattern)}},J,1);return F}var g9=1024;var P8=256;var k=function($,J){let Q=Math.imul($+1,2654435761)^Math.imul(J,2246822519);return Q=Math.imul(Q^Q>>>15,739982445),(Q^Q>>>13)>>>0&65535};var R9=()=>({r:0,g:0,b:0,roughness:0,metalness:0,glow:0,count:0});var w9=function($,J){if(!J)return;$.r+=J.rgb[0],$.g+=J.rgb[1],$.b+=J.rgb[2],$.roughness+=J.roughness,$.metalness+=J.metalness,$.glow+=J.glow,$.count+=1};var b9=function($,J){if($.count===0)return J;let Q=1/$.count;return{rgb:[$.r*Q,$.g*Q,$.b*Q],roughness:$.roughness*Q,metalness:$.metalness*Q,glow:$.glow*Q}};var Y$=g9+P8;var M8=256,v9=new Map,T0=new Map,A0=($)=>JSON.stringify($,(J,Q)=>J==="clear"?void 0:Q);function F8($){let J=A0($),Q=v9.get(J);if(Q!==void 0)return Q;let Z=T0.get(J)??({look:$,read:e9(),first:$.tones[0]??{rgb:[1,1,1],roughness:1,metalness:0,glow:0},at:0,base:0,cellWalk:0,fieldWalk:0,driftWalk:0,joints:0,joint:R9(),side:R9(),top:R9(),bottom:R9()});{let $$5=Z,J$4=Y$;{let $=$$5,J=J$4;let{look:Q,read:Z}=$,q=Math.min(Y$,$.at+J);while($.at<q){let K=$.at;if($.at+=1,K<g9){T9(Q,k(K,1),k(K,2),k(K,3),4,Z),$.base+=Z.base,$.cellWalk+=Z.cellWalk,$.fieldWalk+=Z.fieldWalk,$.driftWalk+=Z.driftWalk;let G=A9(Q,Z);if(Z.joint>0)$.joints+=1;if(Z.joint===1)w9($.joint,G);w9($.side,G);continue}let Y=K-g9;w9($.top,A9(Q,T9(Q,k(Y,4),k(Y,5),k(Y,6),2,Z))),w9($.bottom,A9(Q,T9(Q,k(Y,7),k(Y,8),k(Y,9),3,Z)))}($.at>=Y$);}}{let $$8=J,J$6=Z;{let $=$$8,J=J$6;T0.delete($);let v$3;{let $$6=J;{let $=$$6;let J=1/g9,{first:Q}=$;v$3={base:$.base*J,cellWalk:$.cellWalk*J,fieldWalk:$.fieldWalk*J,driftWalk:$.driftWalk*J,jointCover:$.joints*J,joint:b9($.joint,Q),top:b9($.top,Q),side:b9($.side,Q),bottom:b9($.bottom,Q)};}}let Q=v$3;{let J=Q;if(v9.size>=M8)F0(v9);v9.set($,J)}return Q}}}function K$($){let J=F8($);let Q=[J.base,J.cellWalk,J.fieldWalk,J.driftWalk,J.jointCover];for(let Z of[J.joint,J.top,J.side,J.bottom]){{let $=Z,J=Q;J.push($.rgb[0],$.rgb[1],$.rgb[2],$.roughness,$.metalness,$.glow)}}return[A0($),Q]}function x0($){let J=[];for(let[Q,Z]of Object.entries($)){let{materialKey:q,overrides:K}=k9(Z,Q);let v$4;{let $$7=q,J$5=K;{let $=$$7,J=J$5;let Q;f0:{if($===C$){Q="glass";break f0;}if($===N$){Q="liquid";break f0;}Q="opaque";}let Z=p0[Q];let q=J.map!==void 0;let [K,Y,G]=o(q?J.tint??16777215:J.color??16777215);let [j,z,B]=o(J.emissive??0);v$4={family:Q,color:{r:K,g:Y,b:G},emissive:{r:j,g:z,b:B},emissiveIntensity:J.emissiveIntensity??1,roughness:J.roughness??Z.roughness,metalness:J.metalness??Z.metalness,opacity:J.opacity??Z.opacity,textured:q};}}let Y=v$4;let v$2;L0:{let $$4=Z,J$3={rgb:[Y.color.r,Y.color.g,Y.color.b],roughness:Y.roughness,metalness:Y.metalness,opacity:Y.opacity};{let $=$$4,J=J$3;if(!c($)){v$2=null;break L0;}let{tones:Q,pattern:Z,matter:q,waveIntensity:K}=$,Y=U0.get($);if(Y===void 0||Y.tones!==Q||Y.pattern!==Z||Y.matter!==q||Y.waveIntensity!==K)Y={tones:Q,pattern:Z,matter:q,waveIntensity:K,byFallback:new Map},U0.set($,Y);let G=`${J.rgb[0]},${J.rgb[1]},${J.rgb[2]},${J.roughness},${J.metalness},${J.opacity??""}`,j=Y.byFallback.get(G);if(j!==void 0){v$2=j;break L0;}if(Y.byFallback.size>=U8)Y.byFallback.clear();let z=I0($,J,0);v$2=(Y.byFallback.set(G,z),z);}}let G=v$2;if(G===null)continue;if(G.cap!==null)J.push(K$(G.cap));J.push(K$(G))}return J}var QQ=S0(R0,($)=>Promise.resolve({means:x0($.materials)}));;

;import"./26ceb10f-49e18729068cd5df.mjs";import"./36bad4b5-c35867ec88f49b93.mjs";import"./6013db8f3213cfbc.mjs";import"./4953a97fb1e990b7.mjs";import"./46b1c77c67f7de91.mjs";import"./9959d013-206ed91ad8a1f4fe.mjs";import"./e5b41542678465dc.mjs";import"./f81c9654-bc62d8684fd20379.mjs";import"./59031fb6a4af82a1.mjs";import"./bfa01a2f-723b97e3b6c6dddd.mjs";import"./75a11da44c802486.mjs";import"./f591378a261221ba.mjs";import{xIb as F$}from"./80cbcc999aadac09.mjs";import"./d47d287667ea0d2a.mjs";import{NdZ as a9}from"./9877956db4bd18a5.mjs";import"./2f5a32ad-a57e1e85bb0765e9.mjs";import"./a634ca0bda68cf04.mjs";import"./006207362ccd4120.mjs";import{O1h as e}from"./0a49faba3ab7acd1.mjs";import{LjO as _,NDw as s}from"./5e6ad52ab358f807.mjs";import{Gtg as d,HyE as P$,Jeu as U$,VI3 as W$,axb as C0,nQ$ as Y9,nUV as B$,zKy as K9}from"./ab9dc8e3713482fc.mjs";import{yrB as k9}from"./1ea980c07819a2c7.mjs";import{cPg as N0}from"./f35cc7915eb15f0f.mjs";import"./9de9ffca9502db19.mjs";import{Dli as N$,NYU as P0,SjS as D$,W1t as C$,b3p as n,jFf as O9,sFt as L$}from"./24b178968117d022.mjs";import{M6d as R0,e3w as u,k4y as m,m6H as S0,uLW as c,vO8 as E,wEE as F0}from"./2f5a32ad-a57e1e85bb0765e9.mjs";import{taY as I$}from"./5e0e79ea3cb79ec5.mjs";import"./de7acb93342920d1.mjs";import"./596a5592b4b553b4.mjs";import"./b00c90ec89a8cb4d.mjs";import"./b8654ad39e20faae.mjs";import"./640983afe0dfd4b1.mjs";import{foc as o}from"./6ebd264f803a9d0c.mjs";import{ts0 as j9}from"./25b3fa299ffa28e5.mjs";import{AjM as v$}from"./bfa01a2f-723b97e3b6c6dddd.mjs";export{QQ as terrainVoxelLookMeansJobBody};
