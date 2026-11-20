;;;;;;;;;;;;;;;var __sc=/*@__PURE__*/(()=>globalThis.__spawnEngineConsole??=Object.create(console))();
;;;;;;;;;;;;;;;;;;;;;;;;var R8=Math.SQRT1_2,eI=[{turn:($,J,Q)=>[$,J,Q],upright:[0,0,0,1]},{turn:($,J,Q)=>[$,Q,-J],upright:[-R8,0,0,R8]},{turn:($,J,Q)=>[$,-Q,J],upright:[R8,0,0,R8]},{turn:($,J,Q)=>[-J,$,Q],upright:[0,0,R8,R8]},{turn:($,J,Q)=>[J,-$,Q],upright:[0,0,-R8,R8]},{turn:($,J,Q)=>[$,-J,-Q],upright:[1,0,0,0]}];;var pX=1/Math.tan(L0/6);var Uk=new Float32Array(1+dX);var ik={near:cX,far:uX.desktop};var MJ=`fn lume_view_z_of_depth(depth: f32, near: f32, far: f32, ortho: f32, depthScale: f32) -> f32 {
  let z = depth * depthScale;
  let perspective = 1.0 - ortho;
  let span = far - near;
  let nearW = perspective * near + ortho;
  return (z * ortho * span - nearW * far) / (nearW + z * perspective * span);
}`;var pU=880,ok=pU/4;var A8=`fn lume_worldFromRender(p: vec3<f32>) -> vec3<f32> {
  return p + frame.renderOrigin;
}`,ak=`fn lume_placedClip(viewProj: mat4x4f, anchor: vec3f, offset: vec3f) -> vec4f {
  let anchorPoint = vec4f(anchor, 1.0);
  return ${l0("anchorPoint","viewProj")} + viewProj * vec4f(offset, 0.0);
}`,CJ=`fn lume_motionVector(currentClip: vec4f, previousClip: vec4f) -> vec2f {
  if (frame.motionValid < 0.5 || currentClip.w <= 0.0 || previousClip.w <= 0.0) { return vec2f(0.0); }
  return currentClip.xy / currentClip.w - previousClip.xy / previousClip.w;
}`,sk=`${CJ}
struct LumeMotionFragment {
  @location(0) color: vec4f,
  @location(1) motion: vec4f,
}
fn lume_staticMotionFragment(color: vec4f, worldPosition: vec3f) -> LumeMotionFragment {
  let p = vec4f(worldPosition, 1.0);
  return LumeMotionFragment(color, vec4f(lume_motionVector(frame.viewProj * p, frame.prevViewProj * p), 0.0, color.a));
}`;var tk=Math.fround(pX);var lU=4,nX=15,jx=[F0(0,1,"uniform"),n0(nX,2,"unfilterable-float")];function iX($){return`@group(${$}) @binding(${nX}) var coverFloor: texture_2d<f32>;

fn cover_underGround(position: vec4<f32>) -> bool {
  return position.z < textureLoad(coverFloor, vec2<i32>(position.xy) / ${lU}, 0).x;
}`};;var ax=n0(aX,2,"unfilterable-float","2d-array");function tX($){return $!==void 0&&$>0}var e8={deltas:6,params:7,poses:9},eX=[F0(e8.deltas,1,"read-only-storage"),F0(e8.params,1,"read-only-storage"),F0(e8.poses,1,"read-only-storage")];var iQ=4;var sU=4294967295,oQ=($,J,Q,Z)=>`var w = bitcast<f32>(${J});
    if (${$} != ${sU}u) {
      let p = ${Z};
      w = p - min(max(p, w), bitcast<f32>(${Q}));
    }`,$1=`struct MorphParams {
  targetCount: u32,
  _pad0: u32,
  _pad1: u32,
  _pad2: u32,
  weights: array<u32>,
}`,rQ=`struct MorphSum {
  position: vec3<f32>,
  normal: vec3<f32>,
}
fn morph_snorm16(bits: u32) -> f32 {
  return f32(bitcast<i32>(bits << 16u) >> 16u) * (${WJ}.0 / 32767.0);
}`;function tU($){return`${$1}
${rQ}
@group(${$}) @binding(${e8.deltas}) var<storage, read> morphRows: array<u32>;
@group(${$}) @binding(${e8.params}) var<storage, read> morph: MorphParams;
@group(${$}) @binding(${e8.poses}) var<storage, read> morphPoses: array<f32>;`}var eU=`  for (var i = start; i < end; i = i + 1u) {
    let e = entries + i * ${s8}u;
    let k = morphRows[e] * 3u;
    let s = morph.weights[k];
    ${oQ("s","morph.weights[k + 1u]","morph.weights[k + 2u]","morphPoses[s]")}
    sum.position = sum.position + vec3<f32>(bitcast<f32>(morphRows[e + 1u]), bitcast<f32>(morphRows[e + 2u]), bitcast<f32>(morphRows[e + 3u])) * w;
    let nxy = morphRows[e + 4u];
    sum.normal = sum.normal + vec3<f32>(morph_snorm16(nxy), morph_snorm16(nxy >> 16u), morph_snorm16(morphRows[e + 5u])) * w;
  }
  return sum;`;function NJ($){return`${tU($)}
fn morph_sum(vertex: u32) -> MorphSum {
  var sum: MorphSum;
  sum.position = vec3<f32>(0.0);
  sum.normal = vec3<f32>(0.0);
  let entries = ${F8}u + morphRows[0] + 1u;
  let words = arrayLength(&morphRows);
  let count = min(morphRows[1], (words - min(entries, words)) / ${s8}u);
  let start = morphRows[${F8}u + vertex];
  let end = min(min(morphRows[${F8}u + vertex + 1u], count), start + morph.targetCount);
${eU}
}`}function J1($,J){let Q=NJ($).split("fn morph_sum(vertex: u32)")[1];return`@group(${$}) @binding(${J}) var<storage, read> previousMorph: MorphParams;
fn previous_morph_sum(vertex: u32)${Q.replaceAll("morph.weights","previousMorph.weights")}`}var xJ={uniform:12,hairKey:13};var UT=[F0(xJ.uniform,2,"uniform")],HT=[F0(xJ.uniform,2,"uniform"),n0(xJ.hairKey,2,"uint","2d")];var $H=`struct EyesThroughOut {
  @location(0) color: vec4<f32>,
  @builtin(frag_depth) hairGate: f32,
}`;function aQ($,J,Q=xJ){let Z=[`struct EyesDraw {
  ordinal: f32,
  strength: f32,
  cosAngle: f32,
  pad: f32,
  face: vec3<f32>,
  facePad: f32,
}
@group(${$}) @binding(${Q.uniform}) var<uniform> eyes: EyesDraw;`];if(J)Z.push(`@group(${$}) @binding(${Q.hairKey}) var eyesHairKeys: texture_2d<u32>;`),Z.push($H);return Z.join(`
`)}var sQ="  return vec4<u32>((u32(eyes.ordinal + 0.5) << 24u) | (bitcast<u32>(clamp(in.position.z, 0.0, 1.0)) >> 6u));",tQ=["  let eyesPixel = vec2<i32>(in.position.xy);","  let eyesHairKey = textureLoad(eyesHairKeys, eyesPixel, 0).r;","  if ((eyesHairKey >> 24u) != u32(eyes.ordinal + 0.5)) { discard; }","  let eyesHairZ = bitcast<f32>(((eyesHairKey & 0xFFFFFFu) << 6u) | 32u);",`  if (in.position.z >= eyesHairZ - (eyesHairZ - frame.depthFloor) * ${kJ}) { discard; }`,`  let eyesHairGate = clamp((eyesHairZ - ${kJ} * frame.depthFloor) / (1.0 - ${kJ}), 0.0, 1.0);`].join(`
`),eQ=($)=>`  return EyesThroughOut(${$}, eyesHairGate);`,$7=($,J="frame.cameraPosition")=>[`  let eyesFacing: f32 = dot(eyes.face, normalize(${J} - ${$}));`,"  if (eyesFacing < eyes.cosAngle) { discard; }","  let eyesEdge: f32 = smoothstep(eyes.cosAngle, 1.0, eyesFacing);"].join(`
`);var J7=`
${Q1("lume_paneProjectionAlong")}
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
  let projected = ${l0("vec4<f32>(origin + ray * distance, 1.0)")};
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
  let projectedSurface = ${l0("vec4<f32>(surface, 1.0)")};
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
}`;var X1=1080,j1=8,Z7=1,ZH=0.5,XH=0.2,ET=Math.cbrt(XH),Z1=45,jH=0.18,qH=0.25;var TJ=`${g6}
fn ink_shade(surface: vec3<f32>, warm: f32, lightness: f32) -> vec3<f32> {
  if (warm <= 0.0) {
    return surface * (lightness * lightness * lightness);
  }
  let q = pow(max(vec3<f32>(dot(surface, vec3<f32>(0.4122214708, 0.5363325363, 0.0514459929)), dot(surface, vec3<f32>(0.2119034982, 0.6806995451, 0.1073969566)), dot(surface, vec3<f32>(0.0883024619, 0.2817188376, 0.6299787005))), vec3<f32>(0.0)), vec3<f32>(1.0 / 3.0));
  let lab = vec3<f32>(dot(q, vec3<f32>(0.2104542553, 0.793617785, -0.0040720468)), dot(q, vec3<f32>(1.9779984951, -2.428592205, 0.4505937099)), dot(q, vec3<f32>(0.0259040371, 0.7827717662, -0.808675766))) * lightness;
  let warmAb = vec2<f32>(${m(Math.cos(Z1*L0/180))}, ${m(Math.sin(Z1*L0/180))}) * (${m(jH)} * lab.x);
  let ab = mix(lab.yz, warmAb, warm);
  let lms = vec3<f32>(lab.x + 0.3963377774 * ab.x + 0.2158037573 * ab.y, lab.x - 0.1055613458 * ab.x - 0.0638541728 * ab.y, lab.x - 0.0894841775 * ab.x - 1.291485548 * ab.y);
  let cube = lms * lms * lms;
  return max(vec3<f32>(dot(cube, vec3<f32>(4.0767416621, -3.3077115913, 0.2309699292)), dot(cube, vec3<f32>(-1.2684380046, 2.6097574011, -0.3413193965)), dot(cube, vec3<f32>(-0.0041960863, -0.7034186147, 1.707614701))), vec3<f32>(0.0));
}

fn ink_color(surface: vec3<f32>, ink: vec3<f32>, viewZ: f32, toward: vec3<f32>) -> vec3<f32> {
  var color: vec3<f32>;
  if (frame.toneMap < -0.5) {
    if (frame.toneMap < -3.5) {
      color = max(ink, vec3<f32>(0.0));
    } else if (frame.toneMap < -2.5) {
      color = max(lume_agx_inverse(ink), vec3<f32>(0.0));
    } else if (frame.toneMap < -1.5) {
      color = lume_cineon_inverse(ink);
    } else {
      color = lume_reinhard_inverse(ink);
    }
  } else if (frame.toneMap > 1.5) {
    color = max(ink, vec3<f32>(0.0));
  } else if (frame.toneMap > 0.5) {
    color = max(lume_pbr_neutral_inverse(ink), vec3<f32>(0.0));
  } else {
    color = max(lume_aces_filmic_inverse(ink), vec3<f32>(0.0));
  }
  if (ink.r < 0.0) {
    let sun = passLights.sunColor * passLights.sunIntensity;
    color = ink_shade(surface, ink.g, ink.b) * (sun * ${qH} + passLights.ambientMean) * ${h6};
  }
  return shade_applyFog(color, viewZ, toward);
}`;var VH=16,X7=10,YH=(1<<X7)-1,q1=16,OJ=`fn ink_field(clipW: f32, width: f32) -> f32 {
  let near = select(min(1.0, ${m(j1)} / max(clipW, 1e-3)), 1.0, frame.proj[3][3] > 0.5);
  let px = width * near * frame.canvasSize.y / ${m(X1)};
  return select(max(px * frame.viewportSize.y / max(frame.canvasSize.y, 1.0), ${m(Z7)}), smoothstep(${m(ZH)}, ${m(Z7)}, px), px < ${m(Z7)});
}

fn ink_objectId(t: vec3<f32>) -> u32 {
  var h = bitcast<u32>(t.x) * 0x9e3779b1u;
  h = (h ^ bitcast<u32>(t.y)) * 0x85ebca77u;
  h = (h ^ bitcast<u32>(t.z)) * 0xc2b2ae3du;
  h = h ^ (h >> 16u);
  return max(h >> ${X7}u, 1u);
}

fn ink_word(objectId: u32, reach: f32) -> u32 {
  return (objectId << ${X7}u) | u32(clamp(round(reach * ${m(VH)}), 0.0, ${m(YH)}));
}

struct InkFieldOut {
  @location(0) color: vec4<f32>,
  @location(1) word: u32,
}`;function zH($,J,Q){let Z=[];for(let X=0;X<$.count;X+=1)Z.push(`(dot(${J(X)}.xyz, ${Q}) + ${J(X)}.w < 0.0)`);if(Z.length===0)return"false";return Z.join($.intersection?" && ":" || ")}function V1($,J,Q){return $.count===0?"":`  if (${zH($,J,Q)}) { discard; }`}var w$=512;var Y1=8,sT=Y1*Y1;var KH=Math.fround(-1000000000000000000000000000000),GH=1000000000000000000000000000000,tT=-GH;var UH=2,z1=w$*UH;var eT=b$/w$,HH=4;var FH=w$,$O=FH*HH,QO=new Float64Array([KH,0,0]),ZO=new Uint8Array(w$).fill(1),XO=Int32Array.from({length:2*w$+1},($,J)=>J),VO=new Float64Array([0,-1/0]),zO=new Float64Array([NaN,0]);var KO=w$-1;var FO=Math.log2(32)+1;var WH=1,v0=32>>WH,E$=2,PH=4,BH=PH+16*E$,BO=BH+v0*v0*E$;var K1=64,G1=0.0002,U1=0.004;var MH=`struct CullCamera {
  planes: array<vec4<f32>, 6>,
  camPos: vec3<f32>,
  camNear: f32,
  focalPixels: f32,
  orthoPixels: f32,
  projectionDepthScale: f32,
  projectionDepthOffset: f32,
  prevFocus: vec3<f32>,
  rasterShare: f32,
  focus: vec3<f32>,
  farReach: f32,
  fogCull: vec4<f32>,
  skylineEye: vec3<f32>,
  skylineOn: f32,
  skylineSlack: vec2<f32>,
  memoryOwner: f32,
  lensFar: f32,
  skyline: array<vec4<f32>, ${z1/4}>,
  coverWindow: vec4<f32>,
  coverBand: vec4<f32>,
  //${v0}
  eyeGate: vec4<f32>,
  eyeViewProj: array<mat4x4<f32>, ${E$}>,
  eyeCells: array<vec4<f32>, ${v0*v0*E$/4}>,
}
`;var CH=`fn eyeGateHides(e: u32, c: vec3<f32>, h: vec3<f32>, r: f32) -> bool {
  let m = camera.eyeViewProj[e];
  let rowW = vec3<f32>(m[0].w, m[1].w, m[2].w);
  let w = dot(rowW, c) + m[3].w;
  let near = camera.eyeGate[1u + e];
  let reach = dot(abs(rowW), h);
  let nearest = w - min(r * length(rowW), reach);
  if (!(w - reach > near * 0.5) || !(nearest > near)) { return false; }
  var lo = vec2<f32>(3e38);
  var hi = vec2<f32>(-3e38);
  for (var k = 0u; k < 8u; k = k + 1u) {
    let p = c + vec3<f32>(select(-h.x, h.x, (k & 1u) != 0u), select(-h.y, h.y, (k & 2u) != 0u), select(-h.z, h.z, (k & 4u) != 0u));
    let clip = m * vec4<f32>(p, 1.0);
    let s = vec2<f32>((clip.x / clip.w + 1.0) * ${m(v0/2)}, (1.0 - clip.y / clip.w) * ${m(v0/2)});
    lo = min(lo, s);
    hi = max(hi, s);
  }
  if (hi.x < 0.0 || hi.y < 0.0 || lo.x > ${m(v0)} || lo.y > ${m(v0)}) { return true; }
  let c0 = u32(clamp(floor(lo.x), 0.0, ${m(v0-1)}));
  let c1 = u32(clamp(floor(hi.x), 0.0, ${m(v0-1)}));
  let r0 = u32(clamp(floor(lo.y), 0.0, ${m(v0-1)}));
  let r1 = u32(clamp(floor(hi.y), 0.0, ${m(v0-1)}));
  if ((c1 - c0 + 1u) * (r1 - r0 + 1u) > ${K1}u) { return false; }
  let limit = nearest - nearest * ${m(G1)} - ${m(U1)};
  let base = e * ${v0*v0}u;
  for (var row = r0; row <= r1; row = row + 1u) {
    for (var col = c0; col <= c1; col = col + 1u) {
      let i = base + row * ${v0}u + col;
      if (!(camera.eyeCells[i >> 2u][i & 3u] < limit)) { return false; }
    }
  }
  return true;
}`,DH=`fn eyesHide(c: vec3<f32>, h: vec3<f32>, r: f32) -> bool {
  let eyes = min(u32(max(camera.eyeGate.x, 0.0)), ${E$}u);
  if (eyes == 0u) { return false; }
  for (var e = 0u; e < eyes; e = e + 1u) {
    if (!eyeGateHides(e, c, h, r)) { return false; }
  }
  return true;
}`;var H1=4;var TH=!1;function B1(){return TH}var UA=M1.constrained;var g$=24,LJ=12,yH=LJ*g$,U7="0.0009765625",u6=65536,SH=16;var dA=SH*3,bH=17,lA=(1<<bH)-1;var wH=22,EH=532676608;var nA=EH>>>wH;var _H=6,iA=2**(30-_H);var gH=536870912,oA=gH-1;var i0=7,rA=(1<<i0)-1;var fH=67108864;var aA=fH-1;var sA=24+8*i0;var hH=10;var tA=(1<<hH)-1,Y7="tbl_eyeWalks";var mH=2,uH=4;var cH=20,eA=Math.sin(cH*L0/180);var pH=2;var C1=2048;var dH=32768;var lH=2,D1=4;var I1=16;var nH=64;var N1=1024,AJ=2048;var iH=32768,oH=65536,$L={flags:0,vertexCount:1,ownIndex:2,ownCount:3,position:4,normal:5,uv:6,uvB:7,color:8,levelCount:9,casterCount:10,ownBounds:11,sphere:12,levels:16,casterLevels:16+4*i0,extent:16+8*i0,joints:20+8*i0,weights:21+8*i0,tangent:22+8*i0,morphRows:23+8*i0};var rH=4294967295;var _$={opaque:0,opaqueDouble:1,cutout:2,cutoutDouble:3,blend:4,overlay:5,viewmodelOpaque:6,viewmodelOpaqueDouble:7,viewmodelCutout:8,viewmodelCutoutDouble:9,viewmodelBlend:10,viewmodelOverlay:11,ink:12};var k1=13,aH=2,JL=[_$.blend,_$.overlay,_$.viewmodelBlend,_$.viewmodelOverlay];var z7=2048,K7=12,sH=1,x1=2,tH=1;var G7=k1,T1=20,eH=1024,m6=k1*eH/32,f$=H1,QL=44+m6+16*f$+4+T1*f$,ZL={head:0,head2:4,lens:8,texel:12,drawn:14,room:15,roadDrawn:15,texelEye:16,roomSerial:19,floor:20,origin:24,sortRoom:27,near:28,movers:29,roles:30,bits:27,outLane:32,slots:33,layers:34,eye:36,fade:40,stood:44,occluders:44+m6,occluderWords:44+m6+16*f$,casters:44+m6+16*f$+4},XL=`
struct TableInstance {
  model: mat4x4<f32>,
  origin: vec4<f32>,
  clipPlane: vec4<f32>,
  clipPlane2: vec4<f32>,
  sphere: vec4<f32>,
  flags: vec4<u32>,
  previousModel: mat4x4<f32>,
  previousOrigin: vec4<f32>,
  body: vec4<u32>,
  hideEye: vec4<f32>,
  level: vec4<f32>,
  layers: vec4<u32>,
}
struct TableItem {
  head: vec4<u32>,
  head2: vec4<u32>,
  color: vec4<f32>,
  emissive: vec4<f32>,
  flash: vec4<f32>,
  pbr: vec4<f32>,
  emissiveMap: vec4<f32>,
  spare: vec4<f32>,
  pose: vec4<u32>,
  morph: vec4<u32>,
  span: vec4<u32>,
}
struct TablePart {
  head: vec4<u32>,
  streams: vec4<u32>,
  streams2: vec4<u32>,
  sphere: vec4<f32>,
  levels: array<vec4<u32>, ${i0}>,
  casterLevels: array<vec4<u32>, ${i0}>,
  extent: vec4<f32>,
  skin: vec4<u32>,
}
`,jL=`
struct TableView {
  head: vec4<u32>,
  head2: vec4<u32>,
  lens: vec4<f32>,
  texel: vec4<f32>,
  texelEye: vec4<f32>,
  floor: vec4<f32>,
  spare0: vec4<f32>,
  spare1: vec4<f32>,
  spare2: vec4<f32>,
  eye: vec4<f32>,
  clock: vec4<f32>,
  stood: array<vec4<u32>, ${m6/4}>,
  occluders: array<mat4x4<f32>, ${f$}>,
  occluderWords: vec4<u32>,
  casters: array<vec4<f32>, ${T1/4*f$}>,
}
const NONE = ${rH}u;
fn tbl_sort_room(n: u32) -> u32 {
  var room = 1u;
  while (room < n) { room = room << 1u; }
  return room;
}
`;var qL=`
fn tbl_cameraDraws(flags: u32, itemFlags: u32) -> bool {
  if ((itemFlags & ${iH}u) != 0u) { return (itemFlags & ${oH}u) != 0u && (flags & ${uH}u) != 0u; }
  return (flags & ${mH}u) != 0u;
}
`,VL=`
fn tbl_roleItems() -> u32 {
  let listed = bitcast<u32>(view.spare1.y);
  return select(view.head.y, listed, listed != 0u);
}
fn tbl_roleOfBin(bin: u32) -> u32 {
  let cls = bin % max(view.head.w / max(view.head.z, 1u), 1u);
  return select(1u + (max(cls, ${G7}u) - ${G7}u) / ${aH}u, 0u, cls < ${G7}u);
}
fn tbl_roleBlocks(role: u32, block: u32) -> vec2<u32> {
  let n = tbl_roleItems();
  let first = bitcast<u32>(view.spare1.z);
  if (n == 0u || role < first || role >= first + bitcast<u32>(view.spare1.w)) { return vec2<u32>(0u); }
  let r = role - first;
  return vec2<u32>((r * n) / block, ((r + 1u) * n - 1u) / block + 1u);
}
`;var $F=`
fn tbl_levelHide(word: u32) -> f32 {
  if (word == 0u) { return 0.0; }
  let anchor = bitcast<f32>(word & 0xfffffffcu);
  let rising = (word & ${x1}u) != 0u;
  let beta = clamp(select(anchor - frame.fadeTime, frame.fadeTime - anchor, rising) / ${PJ/1000}, 0.0, 1.0);
  let coverage = beta * beta * (3.0 - 2.0 * beta);
  return select(coverage, -(1.0 - coverage), (word & ${sH}u) != 0u);
}
`,YL=`
const FADE_S: f32 = ${PJ/1000};
fn tbl_fade(slot: u32, item: u32, chosen: u32, held: u32, itemFlags: u32, drew: bool) -> vec3<u32> {
  let now = view.clock.x;
  var m = memory[slot];
  var code = select(chosen + 1u, 0u, chosen == NONE);
  var other = (m.x >> ${K7}u) & 15u;
  var rising = (m.x & ${z7}u) != 0u;
  var anchor = bitcast<f32>(m.y);
  var asked = false;
  let pipe = min(tableItems[item].head2.x & 0xffffu, max(view.head.z, 1u) - 1u);
  let blended = (itemFlags & ${lH}u) != 0u;
  let stood = blended || tbl_stood(select(${_$.cutout}u, ${_$.cutoutDouble}u, (itemFlags & ${I1}u) != 0u), pipe);
  if (other != 0u && (now <= 0.0 || !drew || !stood || now >= select(anchor, anchor + FADE_S, rising))) { other = 0u; }
  if (now > 0.0 && drew && code != held) {
    if (other == 0u) {
      let fades = (itemFlags & (${nH}u | ${D1}u)) == 0u && tableItems[item].flash.w == 0.0;
      let listed = blended || view.clock.y > 0.5;
      if (fades && stood && listed) {
        other = held + 1u;
        rising = true;
        anchor = now;
      } else if (fades) {
        code = held;
        asked = stood;
      }
    } else if (code + 1u == other) {
      let beta = clamp(select(anchor - now, now - anchor, rising) / FADE_S, 0.0, 1.0);
      other = held + 1u;
      rising = !rising;
      anchor = select(now + beta * FADE_S, now - beta * FADE_S, rising);
    } else { code = held; }
  }
  let anchorBits = bitcast<u32>(anchor) & 0xfffffffcu;
  m.x = (m.x & ${~(255|z7|15<<K7)>>>0}u) | code | (other << ${K7}u) | select(0u, ${z7}u, rising);
  m.y = select(0u, anchorBits, other != 0u);
  memory[slot] = m;
  var word = select(0u, anchorBits | select(0u, ${x1}u, rising), other != 0u);
  if (asked) { word = ${tH}u; }
  return vec3<u32>(select(code - 1u, NONE, code == 0u), other, word);
}
`;var JF=32;var zL=`
fn tbl_blockAt(k: u32, tier: u32, b: u32) -> u32 {
  let bins = view.head.w;
  return blockSums[(k * 2u + tier) * bins + b] + blockSums[((view.head2.x + k / ${JF}u) * 2u + tier) * bins + b];
}
`;var O1=i0+1,KL={copies:0,triangles:1,draws:2,levelTriangles:2+O1},GL=2+O1*2;var UL=[{stride:12,stepMode:"vertex",attributes:[["position","float32x3",0]]},{stride:4,stepMode:"vertex",attributes:[["normal","uint32",0]]},{stride:8,stepMode:"vertex",attributes:[["uv","float32x2",0]]},{stride:8,stepMode:"vertex",attributes:[["uvB","float32x2",0]]},{stride:4,stepMode:"vertex",attributes:[["color","uint32",0]]},{stride:8,stepMode:"vertex",attributes:[["joints","uint32x2",0]]},{stride:8,stepMode:"vertex",attributes:[["weights","uint32x2",0]]},{stride:4*pH,stepMode:"instance",attributes:[["item","uint32",0],["fade","uint32",4]]}];var HL=1+2*i0;var R1=`
struct TableSkinVertex {
  joints: vec4<u32>,
  weights: vec4<f32>,
}
struct TableEyeRows {
  rows: vec4<u32>,
  hide: vec4<f32>,
  head: vec4<f32>,
}
`,FL=`${R1}fn tbl_motionShown(it: TableItem, inst: TableInstance) -> bool {
  return (inst.flags.x & ${C1}u) != 0u;
}
`,QF=`
fn tbl_poseRows(it: TableItem, previous: bool, s: TableSkinVertex) -> mat4x4<f32> {
  let row = select(it.pose.x, it.pose.y, previous);
  if ((it.head.w & ${AJ}u) != 0u) { return tablePoses[row]; }
  return tbl_skinBlend(row, s);
}
fn tbl_poseModel(it: TableItem, inst: TableInstance, model: mat4x4<f32>, posed: mat4x4<f32>, previous: bool, shift: vec3<f32>) -> mat4x4<f32> {
  var rowModel = inst.model;
  if (previous) { rowModel = inst.previousModel; }
  if ((inst.flags.x & ${dH}u) == 0u || rowModel[1].w >= 0.5) { return model * posed; }
  let w = vec4f(0, 0, 0, 1) * posed;
  return posed + mat4x4f(vec4f(shift * w.x, 0.0), vec4f(shift * w.y, 0.0), vec4f(shift * w.z, 0.0), vec4f(shift * w.w, 0.0));
}
fn tbl_viewNearHide(it: TableItem, inst: TableInstance, viewEye: vec3<f32>, now: vec3<f32>) -> f32 {
  let hide = bitcast<f32>(it.pose.w);
  if (hide == 0.0 || inst.hideEye.w < 0.5) { return 0.0; }
  let shift = select(vec3f(), inst.origin.xyz - now, inst.origin.w > 0.5);
  return select(0.0, hide, distance(inst.hideEye.xyz + shift, viewEye) < 0.01);
}
fn tbl_motionShown(it: TableItem, inst: TableInstance) -> bool {
  if ((inst.flags.x & ${C1}u) == 0u) { return false; }
  if ((it.head.w & ${N1|AJ}u) == 0u) { return true; }
  return (tablePoses[it.pose.y] * vec4f(0, 0, 0, 1)).w > 0.5;
}
`,WL=`override ${Y7} = true;
fn tbl_rowJoint(flagged: mat4x4f, joint: u32) -> f32 {
  let lane = joint / ${g$}u;
  if (lane >= ${LJ}u) { return 0.0; }
  let column = lane / 4u;
  let picked = flagged * vec4f(f32(column == 0u), f32(column == 1u), f32(column == 2u), f32(column == 3u));
  let at = lane % 4u;
  let flags = u32(dot(picked, vec4f(f32(at == 0u), f32(at == 1u), f32(at == 2u), f32(at == 3u))));
  return f32((flags >> (joint % ${g$}u)) & 1u);
}
fn tbl_eyeOf(joints: vec4<u32>, headRow: u32, hide: f32) -> TableEyeRows {
  if (!${Y7} || !(hide < 0.0) || headRow == 0xffffffffu) { return TableEyeRows(); }
  let head = tablePoses[headRow];
  let count = u32((head * vec4f(0, 0, 0, 1)).w) / ${u6}u;
  let flags = vec4f(tbl_rowJoint(head, joints.x), tbl_rowJoint(head, joints.y), tbl_rowJoint(head, joints.z), tbl_rowJoint(head, joints.w));
  var eye = TableEyeRows(vec4u(headRow), select(flags, vec4f(), hide < -1.0), flags);
  for (var k = 1u; k <= count; k = k + 1u) {
    let hidden = tablePoses[headRow - k];
    let flagged = vec4f(tbl_rowJoint(hidden, joints.x), tbl_rowJoint(hidden, joints.y), tbl_rowJoint(hidden, joints.z), tbl_rowJoint(hidden, joints.w)) > vec4f();
    eye.rows = select(eye.rows, vec4u(headRow - k), flagged);
    eye.hide = select(eye.hide, vec4f(1.0), flagged);
  }
  return eye;
}
fn tbl_headJoint(m: mat4x4f, picked: u32, hide: f32, root: u32) -> mat4x4f {
  let pivotBind = tablePoses[picked] * vec4f(0, 0, 0, 1);
  let pivot = (tablePoses[root + (u32(pivotBind.w) % ${u6}u) + 1u] * vec4f(pivotBind.xyz, 1.0)).xyz;
  let keep = ${U7};
  let shrunk = m * keep + mat4x4f(vec4f(), vec4f(), vec4f(), vec4f(pivot * (1.0 - keep), 1.0 - keep));
  return m * (1.0 - hide) + shrunk * hide;
}
fn tbl_poseRowsEye(it: TableItem, previous: bool, s: TableSkinVertex, eye: TableEyeRows, hide: f32) -> mat4x4f {
  if (!${Y7} || hide > -1.0 || (it.head.w & ${AJ}u) != 0u) { return tbl_poseRows(it, previous, s); }
  let root = select(it.pose.x, it.pose.y, previous);
  return tbl_headJoint(tablePoses[root + s.joints.x + 1u], eye.rows.x, eye.hide.x, root) * s.weights.x + tbl_headJoint(tablePoses[root + s.joints.y + 1u], eye.rows.y, eye.hide.y, root) * s.weights.y + tbl_headJoint(tablePoses[root + s.joints.z + 1u], eye.rows.z, eye.hide.z, root) * s.weights.z + tbl_headJoint(tablePoses[root + s.joints.w + 1u], eye.rows.w, eye.hide.w, root) * s.weights.w;
}
`,PL=`${R1}
fn tbl_skinBlend(root: u32, s: TableSkinVertex) -> mat4x4<f32> {
  return tablePoses[root + s.joints.x + 1u] * s.weights.x + tablePoses[root + s.joints.y + 1u] * s.weights.y + tablePoses[root + s.joints.z + 1u] * s.weights.z + tablePoses[root + s.joints.w + 1u] * s.weights.w;
}
${QF}`;function ZF($){return`
${rQ}
fn tbl_morph(rows: u32, weights: u32, targets: u32, v: u32) -> MorphSum {
  var sum = MorphSum(vec3f(), vec3f());
  let head = ${$("rows",2)};
  let entries = rows + ${F8}u + head.x + 1u;
  let at = ${$(`rows + ${F8}u + v`,2)};
  let start = at.x;
  let end = min(min(at.y, head.y), start + targets);
  for (var i = start; i < end; i = i + 1u) {
    let e = entries + i * ${s8}u;
    let a = ${$("e",3)};
    if (a.x >= targets) { continue; }
    let k = ${$(`weights + ${iQ}u + a.x * 3u`,3)};
    ${oQ("k.x","k.y","k.z","tablePoses[k.x >> 4u][(k.x >> 2u) & 3u][k.x & 3u]")}
    if (w == 0.0) { continue; }
    let b = ${$("e + 3u",3)};
    sum.position = sum.position + vec3f(bitcast<f32>(a.y), bitcast<f32>(a.z), bitcast<f32>(b.x)) * w;
    sum.normal = sum.normal + vec3f(morph_snorm16(b.y), morph_snorm16(b.y >> 16u), morph_snorm16(b.z)) * w;
  }
  return sum;
}`}var XF=`
fn tbl_skinVertex(part: u32, v: u32) -> TableSkinVertex {
  let j = tbl_geo2(tableParts[part].skin.x + v * 2u);
  let w = tbl_geo2(tableParts[part].skin.y + v * 2u);
  return TableSkinVertex(vec4u(j.x & 0xffffu, j.x >> 16u, j.y & 0xffffu, j.y >> 16u), vec4f(unpack2x16unorm(w.x), unpack2x16unorm(w.y)));
}
`,BL=`${ZF(($,J)=>`tbl_geo${J}(${$})`)}
${XF}`;var vJ=`struct ModelInstance {
  model: mat4x4<f32>,
  color: vec4<f32>,
  emissive: vec4<f32>,
  flash: vec4<f32>,
  pbr: vec4<f32>,
  emissiveMap: vec4<f32>,
  clipPlane: vec4<f32>,
  clipPlane2: vec4<f32>,
  origin: vec4<f32>,
}`;var ML=`  let tableRampWord = select(0.0, tableItem.flash.w, (tableItem.head.w & ${N1|AJ}u) != 0u);
  var tableRamp = tableRampWord;
  if (abs(tableRampWord) > 1.0) { tableRamp = sign(tableRampWord) * ${c6("abs(tableRampWord)","shadowView.fadeTime")}; }`;var p6=`fn lume_modelOctDecode(e: vec2<f32>) -> vec3<f32> {
  var n = vec3<f32>(e.x, e.y, 1.0 - abs(e.x) - abs(e.y));
  let t = max(-n.z, 0.0);
  n.x = n.x + select(t, -t, n.x >= 0.0);
  n.y = n.y + select(t, -t, n.y >= 0.0);
  return normalize(n);
}

fn lume_modelSrgbDecode(c: vec4<f32>) -> vec4<f32> {
  let lo = c.rgb / 12.92;
  let hi = pow((c.rgb + vec3<f32>(0.055)) / 1.055, vec3<f32>(2.4));
  return vec4<f32>(select(hi, lo, c.rgb <= vec3<f32>(0.04045)), c.a);
}`;function yJ($,J){return $==="oct16"?`lume_modelOctDecode(${J})`:`lume_modelSrgbDecode(${J})`}var SJ=`struct ModelMaterial {
  baseColor: vec4<f32>,
  emissiveCutoff: vec4<f32>,
  params: vec4<f32>,
  flash: vec4<f32>,
  emissiveMap: vec4<f32>,
  clipPlane: vec4<f32>,
  clipPlane2: vec4<f32>,
  place: vec4<f32>,
  words: vec4<f32>,
}`;var H7=($)=>$.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");var A1=".pbr.json.png.ktx2";var xL=new RegExp(`^(.+)${H7(A1)}\\?transform=([a-z-]+)$`),TL=new RegExp(`^(.+)${H7(A1)}$`);var jF=1.7,L1=Math.round((2-jF)*1000)/1000;var S1=1.5,b1=0.35,VF=1;var YF=4;function w1($){return`((u32(material.words.x) & ${$}u) != 0u)`}var zF=SJ.replace(`
}`,`
  dissolve: vec4<f32>,
}`),cv=zF.replace(`
}`,`
  coat: vec4<f32>,
}`);var pv=vJ.replace(`
}`,`
  viewDepthPlane: vec4<f32>,
  viewFacePlane: vec4<f32>,
  viewFaceState: vec4<f32>,
}`),KF=new Uint32Array(1),lv=new Float32Array(KF.buffer);var GF=["baseColor","normal","metallicRoughness","metalness","occlusion","emissive","alpha"];var nv=[...GF,"coatNormal"];var E1="  let skinMat = jointMatrices[in.joints.x + 1u] * in.weights.x + jointMatrices[in.joints.y + 1u] * in.weights.y + jointMatrices[in.joints.z + 1u] * in.weights.z + jointMatrices[in.joints.w + 1u] * in.weights.w;",fJ=`${A7("jointMatrices",1)}.xyz`;function UF($,J="material.flash.w > -1.0",Q="material.flash.w < 0.0",Z="material.flash.w < -1.0"){let X=(j,q)=>`fn ${q}Joint(m: mat4x4<f32>, picked: u32, hide: f32) -> mat4x4<f32> {
  let pivotBind = jointMatrices[picked] * vec4<f32>(0.0, 0.0, 0.0, 1.0);
  let pivot = (${j}[(u32(pivotBind.w) % ${u6}u) + 1u] * vec4<f32>(pivotBind.xyz, 1.0)).xyz;
  return lume_headShrunk(m, hide, pivot);
}
fn ${q}(joints: vec4<u32>, weights: vec4<f32>, eye: LumeEyeRows) -> mat4x4<f32> {
  let mx = ${j}[joints.x + 1u];
  let my = ${j}[joints.y + 1u];
  let mz = ${j}[joints.z + 1u];
  let mw = ${j}[joints.w + 1u];
  if (${J}) { return mx * weights.x + my * weights.y + mz * weights.z + mw * weights.w; }
  return ${q}Joint(mx, eye.rows.x, eye.hide.x) * weights.x + ${q}Joint(my, eye.rows.y, eye.hide.y) * weights.y + ${q}Joint(mz, eye.rows.z, eye.hide.z) * weights.z + ${q}Joint(mw, eye.rows.w, eye.hide.w) * weights.w;
}`;return[`fn lume_rowJoint(flagged: mat4x4<f32>, joint: u32) -> f32 {
  let lane = joint / ${g$}u;
  if (lane >= ${LJ}u) { return 0.0; }
  let column = lane / 4u;
  let picked = flagged * vec4<f32>(f32(column == 0u), f32(column == 1u), f32(column == 2u), f32(column == 3u));
  let at = lane % 4u;
  let flags = u32(dot(picked, vec4<f32>(f32(at == 0u), f32(at == 1u), f32(at == 2u), f32(at == 3u))));
  return f32((flags >> (joint % ${g$}u)) & 1u);
}
struct LumeEyeRows {
  rows: vec4<u32>,
  hide: vec4<f32>,
  head: vec4<f32>,
}
fn lume_eyeRows(joints: vec4<u32>, row: u32, count: u32, shown: bool) -> LumeEyeRows {
  let head = jointMatrices[row];
  let flags = vec4<f32>(lume_rowJoint(head, joints.x), lume_rowJoint(head, joints.y), lume_rowJoint(head, joints.z), lume_rowJoint(head, joints.w));
  var eye = LumeEyeRows(vec4<u32>(row), select(flags, vec4<f32>(0.0), shown), flags);
  for (var k = 1u; k <= count; k = k + 1u) {
    let hidden = jointMatrices[row - k];
    let flagged = vec4<f32>(lume_rowJoint(hidden, joints.x), lume_rowJoint(hidden, joints.y), lume_rowJoint(hidden, joints.z), lume_rowJoint(hidden, joints.w)) > vec4<f32>(0.0);
    eye.rows = select(eye.rows, vec4<u32>(row - k), flagged);
    eye.hide = select(eye.hide, vec4<f32>(1.0), flagged);
  }
  return eye;
}
fn lume_eyeOf(joints: vec4<u32>) -> LumeEyeRows {
  if (!(${Q})) { return LumeEyeRows(vec4<u32>(0u), vec4<f32>(0.0), vec4<f32>(0.0)); }
  let row = arrayLength(&jointMatrices) - 1u;
  let index = u32((jointMatrices[row] * vec4<f32>(0.0, 0.0, 0.0, 1.0)).w);
  return lume_eyeRows(joints, row, index / ${u6}u, ${Z});
}
fn lume_headShrunk(m: mat4x4<f32>, head: f32, pivot: vec3<f32>) -> mat4x4<f32> {
  let keep = ${U7};
  let shrunk = m * keep + mat4x4<f32>(vec4<f32>(0.0), vec4<f32>(0.0), vec4<f32>(0.0), vec4<f32>(pivot * (1.0 - keep), 1.0 - keep));
  return m * (1.0 - head) + shrunk * head;
}`,X("jointMatrices","lume_headSkin"),...$?[X("previousJointMatrices","lume_previousHeadSkin")]:[]].join(`
`)}var R7="  let eye = lume_eyeOf(in.joints);",_1="  let skinMat = lume_headSkin(in.joints, in.weights, eye);",v1="(modelMaterial.flash.w < 0.0 && distance(modelMaterial.words.yzw, frame.cameraPosition) < 0.01)";function g1($){return UF($,`!${v1}`,v1,"modelMaterial.flash.w < -1.0")}function A7($,J){return`(${$}[${J}] * vec4<f32>(0.0, 0.0, 0.0, 1.0))`}var HF="instance.model";var iv=`lume_normalMatrix3(${HF})`,FF="(in.positionWorld + lume_eyeAnchor())",WF="(frame.cameraPosition - lume_eyeAnchor())";var PF="instance.model[0].w",BF=()=>m$(l6("instance.model[3].xyz","bandPos"),0,PF),ov=["  var lume_bandWord = 0.0;",`  if (frame.sort2d > 0.5) { lume_bandWord = ${BF()}; out.position.z = lume_bandWord * out.position.w; }`];var MF="select(-normalize(in.normalWorld), normalize(in.normalWorld), frontFacing)",rv=`  lume_surfaceHorizon = ${MF};`;var av={...F7,metalness:F7.metallicRoughness};var sv=` * select(mrSample.g, mix(1.0, patina_packedRoughness(normalSample), ${L1.toFixed(3)}), ${w1(YF)})`;var tv=y1("in");var ev=w1(VF);var $y=`lume_seeThroughLight(in.position, albedo) + lume_seeThroughGlow(emissiveColor, -(frame.view * vec4<f32>(${FF}, 1.0)).z, in.positionWorld - ${WF})`;var hJ=1,jy=F0(hJ,1|2,"uniform"),f1=`${SJ}
@group(3) @binding(${hJ}) var<uniform> modelMaterial: ModelMaterial;`,i6={materialColor:"modelMaterial.baseColor.rgb",materialOpacity:"(modelMaterial.baseColor.a * modelMaterial.params.z)"},mJ=8,qy=F0(mJ,1,"uniform"),h1=`struct SkinnedModel {
  model: mat4x4<f32>,
  modelInverse: mat4x4<f32>,
}
@group(3) @binding(${mJ}) var<uniform> skinnedModel: SkinnedModel;`,L7="skinnedModel.model",uJ="skinnedModel.modelInverse";var W0=Object.freeze({composite:1,present:2,copy:4,catmullRom:8,bilinear:16,nearest:32,sharp:64,flash:128,vocab:256,contrast:1024,haze:2048,scanlines:4096,grain:8192,vignette:16384}),Cy=[[W0.composite,"composite"],[W0.present,"present"],[W0.copy,"copy"],[W0.catmullRom,"cr"],[W0.bilinear,"bl"],[W0.nearest,"near"],[W0.sharp,"sharp"],[W0.flash,"flash"],[W0.vocab,"vocab"],[W0.contrast,"con"],[W0.haze,"haze"],[W0.scanlines,"scan"],[W0.grain,"grain"],[W0.vignette,"vig"]],Dy=W0.vocab|W0.contrast|W0.haze|W0.scanlines|W0.grain|W0.vignette,Iy=W0.vignette*2-1;var fy=new y8("post-outlines");var DF=1.001,m1=4;var hy=Math.SQRT2+1;var u1="rg16float",IF=16384,o6=0.6,v7=0.25,c1=6,y7=0.25,p1=j7,S7=`
${MJ}

fn outlineMaskHidden(fragmentViewZ: f32, sceneViewZ: f32) -> bool {
  return fragmentViewZ <= sceneViewZ * ${DF};
}

fn outlineMaskColor(hidden: bool, wall: bool, depth: f32) -> vec4<f32> {
  return vec4<f32>(select(0.0, select(0.375, 0.625, wall), hidden), depth * ${IF}.0, 0.0, 1.0);
}
`;var l1=`struct OutlineMaskView {
  viewProj: mat4x4<f32>,
  view: mat4x4<f32>,
  maskSize: vec2<f32>,
  near: f32,
  far: f32,
  isOrtho: f32,
  focal: f32,
  depthScale: f32,
  depthFloor: f32,
  renderOrigin: vec3<f32>,
  _pad3: f32,
};`;function NF($){return`${l1}
@group(${$}) @binding(0) var<uniform> maskView: OutlineMaskView;
@group(${$}) @binding(1) var sceneDepthTex: texture_2d<f32>;`}var kF=NF(0);function n1($,J,Q){return`
fn ${$}_lensDepth(raw: f32) -> f32 {
  return max(raw - ${J}.depthFloor, 0.0) / (1.0 - ${J}.depthFloor);
}
fn ${$}_sceneDepth(pixel: vec2<f32>) -> f32 {
  let dims = vec2<f32>(textureDimensions(${Q}));
  let texel = vec2<i32>(clamp(pixel / ${J}.maskSize * dims, vec2<f32>(0.0), dims - vec2<f32>(1.0)));
  return textureLoad(${Q}, texel, 0).x;
}
fn ${$}_sceneViewZ(pixel: vec2<f32>) -> f32 {
  return lume_view_z_of_depth(${$}_lensDepth(${$}_sceneDepth(pixel)), ${J}.near, ${J}.far, ${J}.isOrtho, ${J}.depthScale);
}
fn ${$}_wordNearer(scene: f32, fragmentDepth: f32) -> bool {
  return bitcast<u32>(scene) > bitcast<u32>(fragmentDepth) + ${m1}u;
}
fn ${$}_sceneDepthFarthest(pixel: vec2<f32>) -> f32 {
  let dims = vec2<f32>(textureDimensions(${Q}));
  let at = clamp(pixel / ${J}.maskSize * dims, vec2<f32>(0.5), dims - vec2<f32>(0.5)) - vec2<f32>(0.5);
  let base = vec2<i32>(floor(at));
  let reach = vec2<i32>(select(vec2<f32>(0.0), vec2<f32>(1.0), fract(at) > vec2<f32>(1e-3)));
  let top = vec2<i32>(dims) - vec2<i32>(1);
  let a = textureLoad(${Q}, base, 0).x;
  let b = textureLoad(${Q}, min(base + vec2<i32>(reach.x, 0), top), 0).x;
  let c = textureLoad(${Q}, min(base + vec2<i32>(0, reach.y), top), 0).x;
  let d = textureLoad(${Q}, min(base + reach, top), 0).x;
  return min(min(a, b), min(c, d));
}
fn ${$}(pixel: vec2<f32>, fragmentViewZ: f32, fragmentDepth: f32) -> vec4<f32> {
  let sceneDepth = ${$}_sceneDepthFarthest(pixel);
  var hidden: bool;
  var outer = 0u;
  var inner = 0u;
  if (${J}.depthScale > 1.0 && fragmentDepth > ${m(d1)}) {
    hidden = ${$}_wordNearer(sceneDepth, fragmentDepth);
    if (hidden) {
      let radius = clamp(${o6} * ${J}.focal, 2.0, ${J}.maskSize.y * ${y7});
      for (var tap = 0u; tap < 8u; tap += 1u) {
        let angle = f32(tap) * 0.7853982;
        let direction = vec2<f32>(cos(angle), sin(angle));
        outer += select(0u, 1u, ${$}_wordNearer(${$}_sceneDepth(pixel + direction * radius), fragmentDepth));
        inner += select(0u, 1u, ${$}_wordNearer(${$}_sceneDepth(pixel + direction * radius * ${v7/o6}), fragmentDepth));
      }
    }
  } else {
    let sceneViewZ = lume_view_z_of_depth(${$}_lensDepth(sceneDepth), ${J}.near, ${J}.far, ${J}.isOrtho, ${J}.depthScale);
    hidden = outlineMaskHidden(fragmentViewZ, sceneViewZ);
    if (hidden) {
        let metre = ${J}.focal / mix(max(-sceneViewZ, 1e-3), 1.0, ${J}.isOrtho);
      let radius = clamp(${o6} * metre, 2.0, ${J}.maskSize.y * ${y7});
      let innerRadius = radius * ${v7/o6};
      let halfway = mix(fragmentViewZ, sceneViewZ, 0.5);
      for (var tap = 0u; tap < 8u; tap += 1u) {
        let angle = f32(tap) * 0.7853982;
        let direction = vec2<f32>(cos(angle), sin(angle));
        outer += select(0u, 1u, ${$}_sceneViewZ(pixel + direction * radius) > halfway);
        inner += select(0u, 1u, ${$}_sceneViewZ(pixel + direction * innerRadius) > halfway);
      }
    }
  }
  return outlineMaskColor(hidden, outer >= ${c1}u || (inner == 8u && outer >= 4u), fragmentDepth);
}`}function xF($,J,Q){return`${n1(`${$}_out`,J,Q)}
fn ${$}(position: vec4<f32>) -> vec4<f32> {
  return ${$}_out(position.xy, lume_view_z_of_depth(${$}_out_lensDepth(position.z), ${J}.near, ${J}.far, ${J}.isOrtho, ${J}.depthScale), position.z);
}`}var TF=`struct OutlineMaskVaryings {
  @builtin(position) position: vec4<f32>,
  @location(0) viewZ: f32,
};`;function OF($,J){return`${S7}
${n1("outline_maskOut","maskView","sceneDepthTex")}
@fragment fn fs(in: ${$}) -> @location(0) vec4<f32> {
${J.map((Q)=>`${Q}
`).join("")}  return outline_maskOut(in.position.xy, in.viewZ, in.position.z);
}`}var RF=OF("OutlineMaskVaryings",[]),iy=[F0(0,1|2,"uniform"),n0(1,2,"unfilterable-float")],cJ=997;function b7($){return`${l1}
@group(2) @binding(${$}) var<uniform> lume_outlineMaskView: OutlineMaskView;
@group(2) @binding(${$+1}) var lume_outlineMaskDepth: texture_2d<f32>;
${S7}
${xF("lume_outlineMaskAt","lume_outlineMaskView","lume_outlineMaskDepth")}`}var AF={id:"outline-mask",arm:"outline-mask",colorFormat:u1,depthFormat:p1,samples:1},oy={...AF,mirrored:!0},ry=[F0(0,1,"uniform")],LF=256,ay=`
${kF}

@group(1) @binding(0) var<uniform> maskModels: array<mat4x4<f32>, ${LF}>;

${TF}

@vertex fn vs(@location(0) position: vec3<f32>, @builtin(instance_index) instance: u32) -> OutlineMaskVaryings {
  let worldPos = maskModels[instance] * vec4<f32>(position, 1.0);
  var out: OutlineMaskVaryings;
  out.position = maskView.viewProj * worldPos;
  out.viewZ = (maskView.view * worldPos).z;
  return out;
}

${RF}
`,sy=new y8("outline-mask-sources");var i1=0.5,pJ="fsThroughDepth",w7=`if (alpha < ${i1.toFixed(2)}) { discard; }`;var dJ="fsThroughCover";function o1($){return`return vec4<f32>(${$}, 0.0, 0.0, ${$});`}var vF=999,r1=`@group(2) @binding(${vF}) var<storage, read_write> lume_throughMarks: array<atomic<u32>>;
fn lume_throughMarkIndex(p: vec4<f32>) -> u32 {
  let size: vec2<u32> = textureDimensions(lume_sceneDepthTex);
  let px: vec2<u32> = vec2<u32>(p.xy);
  let i: u32 = px.y * size.x + px.x;
  return select(arrayLength(&lume_throughMarks), i, px.x < size.x && px.y < size.y && i < arrayLength(&lume_throughMarks));
}
fn lume_throughMark(p: vec4<f32>) {
  let i: u32 = lume_throughMarkIndex(p);
  if (i < arrayLength(&lume_throughMarks)) { atomicMax(&lume_throughMarks[i], bitcast<u32>(p.z)); }
}
fn lume_throughOccluded(p: vec4<f32>) -> bool {
  let size: vec2<u32> = textureDimensions(lume_sceneDepthTex);
  let px: vec2<u32> = min(vec2<u32>(p.xy), max(size, vec2<u32>(1u)) - vec2<u32>(1u));
  return textureLoad(lume_sceneDepthTex, px, 0).x > p.z;
}
fn lume_throughTake(p: vec4<f32>) -> u32 {
  let i: u32 = lume_throughMarkIndex(p);
  if (i >= arrayLength(&lume_throughMarks)) { return 0u; }
  return atomicExchange(&lume_throughMarks[i], 0u);
}`,a1="if (lume_throughOccluded(in.position)) { discard; }",s1=`if (alpha >= ${i1.toFixed(2)}) { lume_throughMark(in.position); }`,t1=["  let lume_mark: u32 = lume_throughTake(in.position);","  if (lume_mark == 0u) { discard; }","  return bitcast<f32>(lume_mark);"];var yF=/\$([A-Za-z][A-Za-z0-9]*)/g,SF=/^\.\.\.\$([A-Za-z][A-Za-z0-9]*)$/;function r6($,J){let Q=J.length,Z=new Int32Array(Q),X=new Int32Array(Q),j=new Uint8Array(Q),q=[],V=[];for(let Y=0;Y<Q;Y+=1){let[K,z,G]=J[Y];Z[Y]=K,X[Y]=z;let H=SF.exec(G);if(H!==null){j[Y]=1,q.push([]),V.push([e1($,H[1],G)]);continue}let U=[],F=[],M=0;for(let B of G.matchAll(yF)){let D=B.index??0;U.push(G.slice(M,D)),F.push(e1($,B[1],G)),M=D+B[0].length}U.push(G.slice(M)),q.push(U),V.push(F)}return{all:Z,none:X,splice:j,parts:q,holes:V}}function e1($,J,Q){let Z=$.indexOf(J);if(Z<0)aa(Q,J);return Z}function a6($,J,Q,Z){let{all:X,none:j,splice:q,parts:V,holes:Y}=$;for(let K=0;K<X.length;K+=1){let z=X[K];if((J&z)!==z||(J&j[K])!==0)continue;let G=Y[K];if(q[K]===1){let F=Q[G[0]];if(F===null||F===void 0)continue;if(typeof F==="string")Z.push(F);else for(let M=0;M<F.length;M+=1)Z.push(F[M]);continue}let H=V[K],U=H[0];for(let F=0;F<G.length;F+=1){let M=Q[G[F]];U+=`${typeof M==="string"?M:""}${H[F+1]}`}Z.push(U)}}var s6="fsMaterialData";var bF=1,$2=1,wF=($)=>`max(max(${$}.r, ${$}.g), ${$}.b) > ${m(bF)}`,E7=($)=>`(${wF($)}) & (frame.sort2d < 0.5)`;function _7($,J,Q,Z,X){let j=[`  let lume_outsetDir: vec3<f32> = ${Q};`,"  let lume_outsetView: vec2<f32> = (frame.view * vec4<f32>(lume_outsetDir / max(length(lume_outsetDir), 1e-6), 0.0)).xy;",`  lume_clipOut = vec4<f32>(${$}.xy + lume_outsetView * (${m(2*$2)} / frame.viewportSize) * ${$}.w, ${$}.zw);`],q=X===void 0?E7("lume_glow"):`${X} && (${E7("lume_glow")})`,V=[`  let lume_glow: vec3<f32> = ${J};`,`  let lume_bright: bool = ${q};`,`  var lume_clipOut: vec4<f32> = ${$};`];if(Z===void 0)return[...V,"  if (lume_bright) {",...j.map((Y)=>`  ${Y}`),"  }"];return[...V,"  if (lume_bright) {",`    if (${Z.when}) {`,`      if (!(${Z.still})) {`,`        let lume_planeDir: vec3<f32> = ${Z.push};`,`        let lume_planeStep: f32 = ${m(2*$2)} * ${$}.w / (frame.proj[1][1] * frame.viewportSize.y);`,`        lume_clipOut = ${$} + frame.viewProj * vec4<f32>(lume_planeDir / max(length(lume_planeDir), 1e-6) * lume_planeStep, 0.0);`,"      }","    } else {",...j.map((Y)=>`    ${Y}`),"    }","  }"]}function J2($,J){return[`  let lume_coverClip: vec4<f32> = frame.viewProj * vec4<f32>(${$}, 1.0);`,"  let lume_coverPx: vec2<f32> = lume_coverClip.xy / max(lume_coverClip.w, 1e-6) * 0.5 * frame.viewportSize;","  let lume_coverX: vec2<f32> = dpdx(lume_coverPx);","  let lume_coverY: vec2<f32> = dpdy(lume_coverPx);","  let lume_cover: f32 = clamp(abs(lume_coverX.x * lume_coverY.y - lume_coverX.y * lume_coverY.x), 0.0, 1.0);",`  let lume_emitterGlow: vec3<f32> = ${J};`,`  let lume_emitterScale: f32 = select(1.0, lume_cover, ${E7("lume_emitterGlow")});`]}var f7=4,h7=8;var EF=8388608;var _F=($)=>`(bitcast<u32>(${$}) - ${EF}u)`,m7=5;var gF=2147483648;var fF=`fn lume_setRead(base: u32, field: u32) -> vec4<f32> {
  var v = vec4<f32>(0.0);
  let n = min(lume_setComps(field), 4u);
  for (var c = 0u; c < n; c = c + 1u) {
    v = select(v, vec4<f32>(lume_setFieldAt(base, field, c)), vec4<u32>(0u, 1u, 2u, 3u) == vec4<u32>(c));
  }
  return v;
}
fn lume_setOffsetOf(base: u32, field: u32) -> vec3<f32> {
  return lume_setRead(base, field).xyz;
}
fn lume_setYawOf(base: u32, field: u32) -> f32 {
  let kind = (field >> 20u) & 0xFu;
  let value = lume_setRead(base, field).x;
  return select(radians(value), value * 6.283185307179586, kind == 3u || kind == 5u || kind == 7u || kind == 8u);
}
fn lume_setScaleOf(base: u32, field: u32) -> vec3<f32> {
  if (!lume_setPresent(field)) {
    return vec3<f32>(1.0);
  }
  let v = lume_setRead(base, field);
  return max(select(v.xxx, v.xyz, lume_setComps(field) >= 3u), vec3<f32>(1e-6));
}
fn lume_setTintOf(base: u32, field: u32) -> vec4<f32> {
  if (!lume_setPresent(field)) {
    return vec4<f32>(1.0);
  }
  let n = lume_setComps(field);
  let v = lume_setRead(base, field);
  if (n >= 4u) {
    return v;
  }
  return vec4<f32>(select(v.xxx, v.xyz, n == 3u), 1.0);
}`;function u7($){return`${d6}
fn lume_setScalarAt(base: u32, byte: u32, kind: u32) -> f32 {
  let word = ${$}[base + byte / 4u];
  let b = byte % 4u;
  switch (kind) {
    case 0u: { return bitcast<f32>(word); }
    case 1u: { return f32(word); }
    case 2u: { return f32(bitcast<i32>(word)); }
    case 3u: { return f32((word >> (8u * b)) & 0xFFu) / 255.0; }
    case 4u: { return f32((word >> (8u * b)) & 0xFFu); }
    case 5u: { return max(f32(bitcast<i32>(word << (24u - 8u * b)) >> 24u) / 127.0, -1.0); }
    case 6u: { return f32(bitcast<i32>(word << (24u - 8u * b)) >> 24u); }
    case 7u: { return unpack2x16unorm(word)[b / 2u]; }
    case 8u: { return unpack2x16snorm(word)[b / 2u]; }
    case 9u: { return lume_unpack2x16half(word)[b / 2u]; }
    case 10u: { return f32((word >> (8u * b)) & 0xFFFFu); }
    default: { return f32(bitcast<i32>(word << (16u - 8u * b)) >> 16u); }
  }
}
fn lume_setFieldAt(base: u32, field: u32, c: u32) -> f32 {
  let kind = (field >> 20u) & 0xFu;
  let bytes = select(select(2u, 1u, kind >= 3u && kind <= 6u), 4u, kind <= 2u);
  return lume_setScalarAt(base, (field & 0xFFFFu) + c * bytes, kind);
}
fn lume_setComps(field: u32) -> u32 {
  return (field >> 16u) & 0x7u;
}
fn lume_setPresent(field: u32) -> bool {
  return (field & ${gF}u) != 0u;
}
${fF}`}function j2($,J){let Q=`struct LumeSetDraw {
  perSlot: u32,
  windowBase: u32,
  copyBase: u32,
  strideWords: u32,
  offsetField: u32,
  yawField: u32,
  scaleField: u32,
  tintField: u32,
}
@group(${$}) @binding(${f7}) var<storage, read> lume_set: array<u32>;
@group(${$}) @binding(${m7}) var<uniform> lume_setDraw: LumeSetDraw;`;if(J.fields.length===0)return Q;return`${Q}
${u7("lume_set")}
${pF}
${hF}`}var hF=`fn lume_setBlockOf(slot: u32) -> u32 {
  return ${_F("instances[slot].block.w")};
}`,c7=($)=>`  if (${$}) {
    var lumeCulledOut: Varyings;
    lumeCulledOut.position = vec4<f32>(2.0, 2.0, 2.0, 1.0);
    return lumeCulledOut;
  }`;var g7=`lume_slot == ${X2}u`,q2=c7(g7),mF=16,uF=65535,cF=32768,Q2=32767,pF=`fn lume_setDoorOf(code: u32) -> f32 {
  let covered = f32(code & ${Q2}u) / ${Q2}.0;
  return select(select(0.0, covered, code != 0u), -(1.0 - covered), (code & ${cF}u) != 0u);
}`;function V2($,J,Q){if($.fields.length===0)return["  let lume_setPerSlot: u32 = max(lume_setDraw.perSlot, 1u);",`  let lume_slot: u32 = ${J}[lume_setDraw.windowBase + instanceIndex / lume_setPerSlot];`,...Q===null?[]:[Q(g7)],"  let lume_setIndex: u32 = instanceIndex % lume_setPerSlot;",`  let lume_setBase: u32 = lume_setIndex * ${$.stride/4}u;`,"  let lume_setDoor: f32 = 0.0;"];return["  let lume_setPerSlot: u32 = max(lume_setDraw.perSlot, 1u);","  var lume_slotAt: u32 = lume_setDraw.windowBase + instanceIndex / lume_setPerSlot;","  var lume_setIndex: u32 = instanceIndex % lume_setPerSlot;","  var lume_setDoor: f32 = 0.0;","  if (lume_setDraw.copyBase != 0u) {","    lume_slotAt = lume_setDraw.copyBase - 1u + instanceIndex * 2u;",`    let lume_setCopy: u32 = ${J}[lume_slotAt + 1u];`,`    lume_setIndex = lume_setCopy & ${uF}u;`,`    lume_setDoor = lume_setDoorOf(lume_setCopy >> ${mF}u);`,"  }",`  let lume_slot: u32 = ${J}[lume_slotAt];`,...Q===null?[]:[Q(g7)],"  let lume_setBlock: u32 = lume_setBlockOf(lume_slot);",...Q===null?[]:[Q("lume_setIndex >= lume_set[lume_setBlock]")],`  let lume_setBase: u32 = lume_setBlock + ${h7}u + lume_setIndex * lume_setDraw.strideWords;`]}function Z2($){return $.components===1?"f32":`vec${$.components}<f32>`}var p7=($)=>`lume_inst_${$}`;function dF($,J){let Q=$.offset+J*$.componentBytes,Z=`lume_set[lume_setBase + ${Math.floor(Q/4)}u]`,X=Q%4,j=Math.floor(X/2);switch($.scalar){case"float32":return`bitcast<f32>(${Z})`;case"uint32":return`f32(${Z})`;case"sint32":return`f32(bitcast<i32>(${Z}))`;case"unorm8":return`(f32((${Z} >> ${8*X}u) & 0xFFu) / 255.0)`;case"uint8":return`f32((${Z} >> ${8*X}u) & 0xFFu)`;case"snorm8":return`max(f32(bitcast<i32>(${Z} << ${24-8*X}u) >> 24) / 127.0, -1.0)`;case"sint8":return`f32(bitcast<i32>(${Z} << ${24-8*X}u) >> 24)`;case"unorm16":return`unpack2x16unorm(${Z}).${j===0?"x":"y"}`;case"snorm16":return`unpack2x16snorm(${Z}).${j===0?"x":"y"}`;case"float16":return`lume_unpack2x16half(${Z}).${j===0?"x":"y"}`;case"uint16":return`f32((${Z} >> ${16*j}u) & 0xFFFFu)`;case"sint16":return`f32(bitcast<i32>(${Z} << ${16-16*j}u) >> 16)`}}function Y2($,J){let Q=[];for(let Z of $.fields){if(!J.has(Z.name))continue;let X=Array.from({length:Z.components},(q,V)=>dF(Z,V)),j=Z.components===1?X[0]:`${Z2(Z)}(${X.join(", ")})`;Q.push(`  let ${p7(Z.name)}: ${Z2(Z)} = ${j};`)}return Q}function z2($){let J=$.fields.length>0;return[J?"  let lume_instOffset: vec3<f32> = lume_setOffsetOf(lume_setBase, lume_setDraw.offsetField);":"  let lume_instOffset: vec3<f32> = vec3<f32>(0.0);",J?"  let lume_instYaw: f32 = lume_setYawOf(lume_setBase, lume_setDraw.yawField);":"  let lume_instYaw: f32 = 0.0;","  let lume_instCos: f32 = cos(lume_instYaw);","  let lume_instSin: f32 = sin(lume_instYaw);","  let lume_instRot: mat3x3<f32> = mat3x3<f32>(vec3<f32>(lume_instCos, 0.0, -lume_instSin), vec3<f32>(0.0, 1.0, 0.0), vec3<f32>(lume_instSin, 0.0, lume_instCos));",J?"  let lume_instScale: vec3<f32> = lume_setScaleOf(lume_setBase, lume_setDraw.scaleField);":"  let lume_instScale: vec3<f32> = vec3<f32>(1.0);",J?"  let lume_instTint: vec4<f32> = lume_setTintOf(lume_setBase, lume_setDraw.tintField);":"  let lume_instTint: vec4<f32> = vec4<f32>(1.0);"]}var K2="lume_instRot * (in.position * lume_instScale) + lume_instOffset",G2="normalize(lume_instRot * (in.normal / lume_instScale))";var lF={add:4,subtract:4,over:6,solid:6},U2=1024,nF=256,iF=48,oF="1.25",F2=64;function W2($){if($.blending==="additive")return"add";if($.blending==="subtractive")return"subtract";if($.blending==="none"||!$.transparent)return"solid";return"over"}var P2=`struct LumePointsWearer {
  model: mat4x4f,
  attenuate: f32,
  seed: u32,
  _pad0: f32,
  _pad1: f32,
  vertices: vec4u,
  records: vec4u,
};
@group(2) @binding(0) var<uniform> lume_points: LumePointsWearer;
@group(2) @binding(1) var<storage, read_write> lume_pointsSums: array<atomic<u32>>;
@group(2) @binding(2) var<storage, read> lume_pointsVertices: array<f32>;
@group(2) @binding(3) var<storage, read> lume_pointsSet: array<u32>;`;function B2($){return $?`${H2}
  if (lume_points.records.x > 0u) {
    lume_pointLocal = lume_setOffsetOf(lume_points.records.x - 1u + ${h7}u + lume_index * lume_points.records.y, lume_points.records.z);
  }`:H2}var M2=u7("lume_pointsSet"),H2=`  let lume_pointsFromVertices: bool = lume_points.vertices.y > 0u;
  let lume_pointInstance: u32 = select(lume_index, 0u, lume_pointsFromVertices);
  let lume_pointVertex: u32 = select(0u, lume_index, lume_pointsFromVertices);
  var lume_pointLocal: vec3f = vec3f(0.0);
  if (lume_pointsFromVertices) {
    let lume_word: u32 = lume_points.vertices.x + lume_index * lume_points.vertices.y;
    lume_pointLocal = vec3f(lume_pointsVertices[lume_word], lume_pointsVertices[lume_word + 1u], lume_pointsVertices[lume_word + 2u]);
  }`;function C2($){let J=lF[$],Z=$==="over"||$==="solid"?`
  atomicAdd(&lume_pointsSums[k + 3u], u32(cover * ${U2}.0 * lume_alpha + d));
  atomicAdd(&lume_pointsSums[k + 4u], u32(cover * lume_coverLog * ${nF}.0 + d));`:"";return`fn lume_pointsDither(i: u32, p: vec2i) -> f32 {
  var s = i * 747796405u + u32(p.x) * 2891336453u + u32(p.y) * 277803737u + lume_points.seed;
  s = ((s >> ((s >> 28u) + 4u)) ^ s) * 277803737u;
  return f32((s >> 22u) ^ s) * (1.0 / 4294967296.0);
}
fn lume_pointsPut(p: vec2i, i: u32, cover: f32, lume_light: vec3f, lume_alpha: f32, lume_coverLog: f32, depth: f32) {
  let size = vec2i(frame.viewportSize);
  if (p.x < 0 || p.y < 0 || p.x >= size.x || p.y >= size.y || cover <= 0.0) {
    return;
  }
  let k = (u32(p.y) * u32(size.x) + u32(p.x)) * ${J}u;
  let d = lume_pointsDither(i, p);
  let units = vec3u(max(lume_light * (cover * ${U2}.0) + vec3f(d), vec3f(0.0)));
  if (units.x > 0u) {
    atomicAdd(&lume_pointsSums[k], units.x);
  }
  if (units.y > 0u) {
    atomicAdd(&lume_pointsSums[k + 1u], units.y);
  }
  if (units.z > 0u) {
    atomicAdd(&lume_pointsSums[k + 2u], units.z);
  }${Z}
  let z = bitcast<u32>(depth);
  if (atomicLoad(&lume_pointsSums[k + ${J-1}u]) < z) {
    atomicMax(&lume_pointsSums[k + ${J-1}u], z);
  }
}`}var D2=`  let lume_pointRender: vec4f = lume_points.model * vec4f(out_pointsPosition, 1.0);
  let lume_pointClip: vec4f = ${l0("lume_pointRender")};
  if (lume_pointClip.w <= 0.0) {
    return;
  }
  let lume_pointNdc: vec3f = lume_pointClip.xyz / lume_pointClip.w;
  if (lume_pointNdc.z < 0.0 || lume_pointNdc.z > 1.0) {
    return;
  }
  let lume_pointPixel: vec2f = vec2f(lume_pointNdc.x * 0.5 + 0.5, 0.5 - lume_pointNdc.y * 0.5) * frame.viewportSize;
  let lume_pointScale: f32 = select(frame.cssPixel, 0.5 * frame.viewportSize.y / lume_pointClip.w, lume_points.attenuate > 0.5);
  let lume_pointRadius: f32 = min(max(out_pointsSize, 0.0) * lume_pointScale * 0.5, ${iF}.0);
  if (lume_pointPixel.x + lume_pointRadius < 0.0 || lume_pointPixel.y + lume_pointRadius < 0.0 || lume_pointPixel.x - lume_pointRadius > frame.viewportSize.x || lume_pointPixel.y - lume_pointRadius > frame.viewportSize.y || lume_pointRadius <= 0.0) {
    return;
  }`;function I2($){return`  let lume_alpha: f32 = ${$==="solid"?"1.0":"clamp(out_pointsColor.a * out_pointsOpacity, 0.0, 1.0)"};
  let lume_light: vec3f = max(${$==="add"||$==="subtract"?"out_pointsColor.rgb * lume_alpha":$==="over"?"out_pointsColor.rgb * lume_alpha":"out_pointsColor.rgb"}, vec3f(0.0));
  let lume_coverLog: f32 = -log(1.0 - min(lume_alpha, 0.999));
  if (lume_pointRadius <= 0.5) {
    let lume_side = lume_pointRadius * 2.0;
    lume_pointsPut(vec2i(floor(lume_pointPixel)), lume_index, lume_side * lume_side, lume_light, lume_alpha, lume_coverLog, lume_pointNdc.z);
    return;
  }
  if (lume_pointRadius <= ${oF}) {
    let lume_area = min(3.14159265 * lume_pointRadius * lume_pointRadius, 4.0);
    let lume_at = lume_pointPixel - vec2f(0.5);
    let lume_p0 = vec2i(floor(lume_at));
    let lume_f = lume_at - floor(lume_at);
    lume_pointsPut(lume_p0, lume_index, lume_area * (1.0 - lume_f.x) * (1.0 - lume_f.y), lume_light, lume_alpha, lume_coverLog, lume_pointNdc.z);
    lume_pointsPut(lume_p0 + vec2i(1, 0), lume_index, lume_area * lume_f.x * (1.0 - lume_f.y), lume_light, lume_alpha, lume_coverLog, lume_pointNdc.z);
    lume_pointsPut(lume_p0 + vec2i(0, 1), lume_index, lume_area * (1.0 - lume_f.x) * lume_f.y, lume_light, lume_alpha, lume_coverLog, lume_pointNdc.z);
    lume_pointsPut(lume_p0 + vec2i(1, 1), lume_index, lume_area * lume_f.x * lume_f.y, lume_light, lume_alpha, lume_coverLog, lume_pointNdc.z);
    return;
  }
  let lume_lo = vec2i(floor(lume_pointPixel - vec2f(lume_pointRadius)));
  let lume_hi = vec2i(floor(lume_pointPixel + vec2f(lume_pointRadius)));
  for (var y = lume_lo.y; y <= lume_hi.y; y = y + 1) {
    for (var x = lume_lo.x; x <= lume_hi.x; x = x + 1) {
      let cover = clamp(lume_pointRadius + 0.5 - length(vec2f(f32(x), f32(y)) + vec2f(0.5) - lume_pointPixel), 0.0, 1.0);
      lume_pointsPut(vec2i(x, y), lume_index, cover, lume_light, lume_alpha, lume_coverLog, lume_pointNdc.z);
    }
  }`}function N2($,J){let Q=$==="solid"?"1.0":"clamp(out_pointsColor.a * out_pointsOpacity, 0.0, 1.0)",Z=$==="solid"?"out_pointsColor.rgb":"out_pointsColor.rgb * lume_alpha",X=$==="solid"?"true":$==="over"?"lume_alpha > 0.0":"any(lume_light > vec3f(0.0))";return`  let lume_side: f32 = lume_pointRadius * 2.0;
  let lume_lo = max(vec2i(floor(lume_pointPixel - vec2f(lume_pointRadius))), vec2i(0));
  let lume_hi = min(vec2i(floor(lume_pointPixel + vec2f(lume_pointRadius))), vec2i(frame.viewportSize) - vec2i(1));
  for (var lume_y = lume_lo.y; lume_y <= lume_hi.y; lume_y = lume_y + 1) {
    for (var lume_x = lume_lo.x; lume_x <= lume_hi.x; lume_x = lume_x + 1) {
      let lume_cell = vec2f(f32(lume_x), f32(lume_y));
      let lume_from = max(lume_cell, lume_pointPixel - vec2f(lume_pointRadius));
      let lume_to = min(lume_cell + vec2f(1.0), lume_pointPixel + vec2f(lume_pointRadius));
      let lume_span = max(lume_to - lume_from, vec2f(0.0));
      let lume_cover = lume_span.x * lume_span.y;
      if (lume_cover <= 0.0) {
        continue;
      }
      let lume_pointAt = (lume_from + lume_to) * 0.5;
      let lume_pointUv = vec2f(0.5 + (lume_pointAt.x - lume_pointPixel.x) / lume_side, 0.5 - (lume_pointAt.y - lume_pointPixel.y) / lume_side);
${J.split(`
`).map((q)=>q.length>0?`    ${q}`:q).join(`
`)}
      let lume_alpha: f32 = ${Q};
      let lume_light: vec3f = max(${Z}, vec3f(0.0));
      if (${X}) {
        lume_pointsPut(vec2i(lume_x, lume_y), lume_index, lume_cover, lume_light, lume_alpha, -log(1.0 - min(lume_alpha, 0.999)), lume_pointNdc.z);
      }
    }
  }`}var k2=x2/d7,lJ=22,nJ=43;var rF=16777216;function aF($,J,Q,Z,X){let j=Z===void 0?"":`
    if (any(${J}.xyz != vec3<f32>(0.0))) { ${Z} = 0.0; }`,q=Z===void 0?"":`
    let handBits = u32(select(select(${J}.z, ${J}.y, cutBit < ${nJ}u), ${J}.x, cutBit < ${lJ}u) * ${rF}.0);
    if (((handBits >> cutShift) & 1u) != 0u) { ${Z} = 1.0; }`;return`  } else if (${J}.w != 0.0) {${j}
    let cutSub = clamp(floor(((${$} + frame.renderOrigin).xz - vec2<f32>(${J}.w, ${Q}.x)) / ${d7}.0), vec2<f32>(0.0), vec2<f32>(${k2-1}.0));
    let cutBit = u32(cutSub.x) + ${k2}u * u32(cutSub.y);
    let cutWord = u32(select(select(${Q}.w, ${Q}.z, cutBit < ${nJ}u), ${Q}.y, cutBit < ${lJ}u));
    let cutShift = select(select(cutBit - ${nJ}u, cutBit - ${lJ}u, cutBit < ${nJ}u), cutBit, cutBit < ${lJ}u);
    if (((cutWord >> cutShift) & 1u) != 0u) { ${X} }${q}`}function T2($,J,Q,Z="discard;"){let X=(V)=>`  if (frame.guest != 0.0) {
    if (frame.guest > 0.0 && ${V}) { ${Z} }
    if (frame.guest < 0.0 && dot(frame.guestClipPlane.xyz, ${$}) + frame.guestClipPlane.w < 0.0) { ${Z} }`;if("distances"in J)return`${X(`${J.distances}.z < 0.5`)}
  } else {
    if (${J.distances}.x < 0.0) { ${Z} }
    if (${J.distances}.y < 0.0) { ${Z} }
  }`;let{first:j,second:q}=J;return`${X(`dot(${j}.xyz, ${j}.xyz) <= 0.5`)}
  } else if (dot(${j}.xyz, ${j}.xyz) > 0.5) {
    if (dot(${j}.xyz, ${$} + frame.renderOrigin) + ${j}.w < 0.0) { ${Z} }
    if (any(${q} != vec4<f32>(0.0)) && dot(${q}.xyz, ${$} + frame.renderOrigin) + ${q}.w < 0.0) { ${Z} }
${aF($,j,q,Q,Z)}
  }`}var sF="instanceStart",tF="instanceEnd",y2=h0("modelMatrix","mat4x4f"),j8=u0(`
fn lume_viewOfClip(c: vec4<f32>) -> vec3<f32> {
  let v = frame.inverseProj * c;
  return v.xyz / v.w;
}
fn lume_renderOfView(v: vec3<f32>) -> vec3<f32> {
  let turn = mat3x3<f32>(frame.view[0].xyz, frame.view[1].xyz, frame.view[2].xyz);
  return transpose(turn) * (v - frame.view[3].xyz);
}
fn lume_lineNear(a: vec4<f32>, b: vec4<f32>) -> vec4<f32> {
  let da = a.w - a.z;
  let db = b.w - b.z;
  if (da >= 0.0) {
    return a;
  }
  if (db < 0.0) {
    return vec4<f32>(0.0, 0.0, -1.0, 1.0);
  }
  let c = mix(a, b, da / (da - db));
  return vec4<f32>(c.xy, min(c.z, c.w), c.w);
}
fn lume_linePixel(c: vec4<f32>) -> vec2<f32> {
  let ndc = c.xy / c.w;
  return vec2<f32>(ndc.x * 0.5 + 0.5, 0.5 - ndc.y * 0.5) * frame.viewportSize;
}
fn lume_lineHalf(width: f32, world: f32, c: vec4<f32>) -> f32 {
  return select(width * 0.5 * frame.cssPixel, width * 0.25 * abs(frame.proj[1][1]) * frame.viewportSize.y / c.w, world > 0.5);
}
fn lume_lineVertex(a: vec4<f32>, b: vec4<f32>, corner: vec2<f32>, ha: f32, hb: f32, soft: f32) -> vec4<f32> {
  let pa = lume_linePixel(a);
  let pb = lume_linePixel(b);
  let d = pb - pa;
  let len = length(d);
  let along = select(vec2<f32>(1.0, 0.0), d / max(len, 1e-6), len > 1e-6);
  let across = vec2<f32>(-along.y, along.x);
  let atB = corner.x > 0.0;
  let reach = max(select(ha, hb, atB), 0.5) + soft;
  let off = (across * corner.y + along * select(-1.0, 1.0, atB)) * reach;
  let c = select(a, b, atB);
  return vec4<f32>(c.xy + vec2<f32>(off.x, -off.y) * 2.0 / frame.viewportSize * c.w, c.z, c.w);
}
fn lume_lineCover(p: vec2<f32>, ends: vec4<f32>, halves: vec2<f32>) -> vec3<f32> {
  let ab = ends.zw - ends.xy;
  let along = dot(p - ends.xy, ab) / max(dot(ab, ab), 1e-6);
  let t = clamp(along, 0.0, 1.0);
  let h = max(mix(halves.x, halves.y, t), 0.5);
  let dist = length(p - (ends.xy + ab * t));
  let cap = select(0.0, 1.0, (along < 0.0 || along > 1.0) && dist > h);
  return vec3<f32>(clamp(h + 0.5 - dist, 0.0, 1.0), min(mix(halves.x, halves.y, t) * 2.0, 1.0), cap);
}
`);function S2($){let J=u(j8,"lume_viewOfClip",[$],"vec3f"),Q=u(j8,"lume_renderOfView",[J],"vec3f"),Z=p("vec4f")`(${y2.inverse()} * vec4<f32>(${Q}, 1.0))`;return p("vec3f")`(${Z}.xyz / ${Z}.w)`}function eF($){if($.isLineNodeMaterial!==!0)return{width:i(1),worldUnits:!1};let J=$.linewidth;if(J instanceof P0)return{width:Q0(J,"f32"),worldUnits:$.worldUnits===!0};let Q=Number(J);return{width:i(isFinite(Q)?Math.max(0,Q):1),worldUnits:$.worldUnits===!0}}function b2($,J,Q,Z){let X=$.vertexNode;if(J===null&&X===null)return null;let j={stmts:[...Q?.stmts??[]]},q=Z===null||Z===Q?j:{stmts:[...Z.stmts]},V=v2($);if(V._vertexNode=null,J===null&&X!==null){let z=$.positionNode;return V._positionNode=c$(q,()=>S2(z===null?X:n7(X,new Map([["positionLocal",z]])))),{material:V,fragmentScope:j,vertexScope:q}}if(J===null)return null;let Y=c$(q,()=>$W($,J.topology,J.records));V._positionNode=Y.position,V.side="double";let K=u(j8,"lume_lineCover",[p("vec2f")`(${I0} * ${L2})`,Y.ends,Y.halves],"vec3f");if(c$(j,()=>O2($.transparent?p("bool")`(${K}.x * ${K}.y <= 0.0)`:p("bool")`(${K}.z > 0.5)`)),$.transparent)V._opacityNode=p("f32")`(${Q0($.opacityNode??oJ,"f32")} * ${K}.x * ${K}.y)`;return{material:V,fragmentScope:j,vertexScope:q}}function $W($,J,Q){let Z=J==="strip"?l7:p("u32")`(${l7} * 2u)`,X=p("u32")`(${Z} + 1u)`,j=$.positionNode,q=function(x,T){let N=Q?R2(x,"vec3"):M0(0,0,0);return j===null?N:Q0(n7(j,new Map([["positionLocal",N],["vertexIndex",T]])),"vec3f")},V=(x)=>p("vec4f")`(frame.viewProj * (${y2} * vec4<f32>(${x}, 1.0)))`,Y=V(q(sF,Z)),K=V(q(tF,X)),z=u(j8,"lume_lineNear",[Y,K],"vec4f"),G=u(j8,"lume_lineNear",[K,Y],"vec4f"),H=eF($),U=i(H.worldUnits?1:0),F=u(j8,"lume_lineHalf",[H.width,U,z],"f32"),M=u(j8,"lume_lineHalf",[H.width,U,G],"f32"),B=p("vec2f")`${A2}.xy`,D=i($.transparent?1:0),C=S2(u(j8,"lume_lineVertex",[z,G,B,F,M,D],"vec4f")),P=p("vec4f")`vec4<f32>(${u(j8,"lume_linePixel",[z],"vec2f")}, ${u(j8,"lume_linePixel",[G],"vec2f")})`.vertexStage(),I=p("vec2f")`vec2<f32>(${F}, ${M})`.vertexStage();return{position:C,ends:P,halves:I}}function w2($=!1){return`struct DrawInstance {
  model: mat4x4<f32>,
  lift: vec4<f32>,${$?`
  clipPlane: vec4<f32>,
  clipPlane2: vec4<f32>,
  block: vec4<f32>,
  flash: vec4<f32>,`:""}
}`}var i7=17,o7=2,rJ=3,r7=15;function JW($,J){return`fn ${J}(base: u32, joints: vec4<u32>, weights: vec4<f32>) -> mat4x4<f32> {
  return ${$}[base + joints.x] * weights.x + ${$}[base + joints.y] * weights.y + ${$}[base + joints.z] * weights.z + ${$}[base + joints.w] * weights.w;
}`}function a7($,J=o7,Q="rig"){return`@group(${$}) @binding(${J}) var<storage, read> lume_${Q}Palettes: array<mat4x4<f32>>;
${JW(`lume_${Q}Palettes`,`lume_${Q}SkinMatrix`)}`}function QW($){let J=[],Q=(X)=>J.push(F0(X,1,"read-only-storage")),Z=(X)=>J.push(F0(X,1,"uniform"));if($.instancing==="matrix"||$.skinned===!0)Q(0);if($.skinnedPalette==="rig")Q(o7);if($.instanceSlots==="storage"||$.instanceSet)Q(rJ);if($.instanceSet)Q(f7),Z(m7);if($.morph===!0)J.push(...eX);if($.modelMaterial===!0)Z(hJ);if($.skinnedModel===!0)Z(mJ);return J}function t7($){if($==="unorm10-10-10-2")return{scalar:"packed",bits:32,count:4,type:"vec4<f32>"};if($==="unorm8x4-bgra")return{scalar:"bgra",bits:8,count:4,type:"vec4<f32>"};let J=/^(uint|sint|unorm|snorm|float)(8|16|32)(?:x([234]))?$/.exec($);if(!J)throw Error(`lume position reader: unsupported vertex format '${$}'`);let Q=J[1],Z="f32";if(Q==="uint")Z="u32";if(Q==="sint")Z="i32";let X=Number(J[3]??1);return{scalar:Q,bits:Number(J[2]),count:X,type:X===1?Z:`vec${X}<${Z}>`}}function s7($,J){let Q=`lume_positionBuffer${$.binding}`,Z=$.streamOffset===0?"":`(arrayLength(&${Q}) / ${$.packedStride/4}u) * ${$.streamOffset/4}u + `;return`${Q}[${Z}vertexIndex * ${$.stride/4}u + ${J}u]`}function ZW($,J){let{scalar:Q,bits:Z}=t7($.attribute.format),X=$.offset+J*Z/8,j=s7($,Math.floor(X/4)),q=X%4*8;if(Q==="float")return Z===32?`bitcast<f32>(${j})`:`lume_unpack2x16half(${j}).${q===0?"x":"y"}`;if(Z===32)return Q==="uint"?j:`bitcast<i32>(${j})`;let V=`((${j} >> ${q}u) & ${2**Z-1}u)`,Y=`(bitcast<i32>(${j} << ${32-Z-q}u) >> ${32-Z})`;if(Q==="uint")return V;if(Q==="sint")return Y;if(Q==="unorm")return`(f32(${V}) / ${2**Z-1}.0)`;return`max(f32(${Y}) / ${2**(Z-1)-1}.0, -1.0)`}function E2($){if($.attribute.format==="unorm8x4-bgra")return`unpack4x8unorm(${s7($,$.offset/4)}).bgra`;let J=t7($.attribute.format);if(J.scalar==="packed"){let Z=s7($,$.offset/4);return`vec4<f32>(f32(${Z} & 1023u) / 1023.0, f32((${Z} >> 10u) & 1023u) / 1023.0, f32((${Z} >> 20u) & 1023u) / 1023.0, f32((${Z} >> 30u) & 3u) / 3.0)`}let Q=Array.from({length:J.count},(Z,X)=>ZW($,X));return J.count===1?Q[0]:`${J.type}(${Q.join(", ")})`}function XW($){if($.encoding==="oct16")return"vec3<f32>";if($.encoding==="srgb8")return"vec4<f32>";return t7($.format).type}function jW($,J){let Q=J.map(({binding:V})=>`@group(3) @binding(${V}) var<storage, read> lume_positionBuffer${V}: array<u32>;`),Z=$.map(({attribute:V})=>`  ${V.name}: ${XW(V)},`),X=$.map((V)=>`  out.${V.attribute.name} = ${V.attribute.encoding?yJ(V.attribute.encoding,E2(V)):E2(V)};`),j=$.some(({attribute:V})=>/^float16/.test(V.format)),q=$.some(({attribute:V})=>V.encoding!==void 0);return[...Q,`struct VertexIn {
${Z.join(`
`)}
}`,`fn lume_pullVertexIn(vertexIndex: u32) -> VertexIn {
  var out: VertexIn;
${X.join(`
`)}
  return out;
}`,...j?[d6]:[],...q?[p6]:[]].join(`
`)}function qW($){if($.attributeSource==="storage")return!1;for(let J of $.vertexLayout?.attributes??[])if(J.encoding!==void 0||!/^float32(x[234])?$/.test(J.format))return!0;return!1}function e7($,J){let Q=$.vertexLayout;if(!Q)throw Error("lume position reader: a vertex layout is required");let Z=$.skinned===!0||$.nativeModelMatrix===!0||$.modelMaterial===!0||($.vertexBuffers?.length??1)>1||qW($),X=Z?{...Q,attributes:Q.attributes.filter((F)=>J.has(F.name))}:Q;if(!X.attributes.some((F)=>F.name==="position"))throw Error("lume position reader: the source layout has no required position attribute");let j=QW($),q=new Set(j.map((F)=>F.binding)),V=function(F){let M=F;while(q.has(M))M++;return q.add(M),M},Y=[],K=[],z=[...$.vertexReader?.inputs.packedVertexStreams??[]],G=V(1);if(!Z)Y.push({binding:G,slot:0});else{let F=$.vertexBuffers??[{arrayStride:Q.arrayStride,attributes:Q.attributes}];for(let B of X.attributes){let D=F.findIndex((I)=>Array.from(I.attributes).some((x)=>x.shaderLocation===B.shaderLocation)),C=F[D],P=C&&Array.from(C.attributes).find((I)=>I.shaderLocation===B.shaderLocation);if(!C||!P)throw Error(`lume position reader: attribute '${B.name}' has no source buffer`);if(!z.some((I)=>I.slot===D))z.push({slot:D,stride:C.arrayStride});K.push({attribute:B,slot:D,stride:C.arrayStride,offset:P.offset,binding:G,streamOffset:0,packedStride:0})}Y.push({binding:G,slot:z[0].slot});let M=z.reduce((B,D)=>B+D.stride,0);for(let B of K){let D=0;for(let C of z){if(C.slot===B.slot)break;D+=C.stride}B.streamOffset=D,B.packedStride=M}}for(let{binding:F}of Y)j.push(F0(F,1,"read-only-storage"));j.sort((F,M)=>F.binding-M.binding);let H=V(2),U=V(2);return{inputs:{drawBindings:j,vertexBindings:Y,...z.length>1?{packedVertexStreams:z}:{},mediumBinding:H,depthBinding:U,instanceSet:$.instanceSet!==void 0},layout:X,native:Z?jW(K,Y):null}}function _2($,J){let{vertexLayout:Q,vertexBuffers:Z}=$;if(!Q||!Z||Z.length<=1||$.vertexPath)return null;let q,V,Y;{fa(Q,J,Z);q=ba[0];V=ba[1];Y=ba[2]}if(q.length+($.instanceSlots==="vertex"?1:0)<=8)return{surface:{slots:q,vertexBuffers:V},layout:Y};let K=e7($,J),z=K.inputs.packedVertexStreams,G=K.inputs.vertexBindings[0]?.binding;if(!K.native||!z||G===void 0)ga();return ha(G,z,Y,K);}var t6="\x03",aJ="lume_lit",sJ="lume_lit_u",g2="xyzw";function VW($,J){if($==="f32")return`material.${aJ}[${J>>2}].${g2[J&3]}`;return ia(J,$);}function YW($,J,Q,Z){let X=[],j=0;for(let Y=$.indexOf($Z);Y>=0;Y=$.indexOf($Z,j)){let K=$.indexOf(f2,Y+1),z=Number($.slice(Y+1,K));X.push($.slice(j,Y));let G=Q===null?-1:Q[z];X.push(G<0?J.literals[z]:VW(J.types[z],G)),j=K+1}return ja(X,$,j,Z);}function h2($,J,Q){if($.size===0)return{texts:Q,layout:J,read:zW};let Z=null,X="",j=J,q=KW($);if(J.byteSize+(q.decimalVectors+q.wholeVectors)*16<=p$){let{slotOf:K,decimalVectors:z,wholeVectors:G}=q;Z=GW($,K);let H=new Float32Array(z*4),U=new Uint32Array(G*4);for(let M=0;M<$.size;M++){if(K[M]<0)continue;if($.types[M]==="f32")H[K[M]]=$.values[M]+0;else U[K[M]]=$.values[M]>>>0}if(z>0)X+=`
  ${aJ}: array<vec4<f32>, ${z}>,`;if(G>0)X+=`
  ${sJ}: array<vec4<u32>, ${G}>,`;let F=J.byteSize+H.byteLength;j={...J,byteSize:F+U.byteLength,...z>0?{lifted:{offset:J.byteSize,values:H}}:{},...G>0?{liftedWhole:{offset:F,values:U}}:{}}}let V=(K)=>YW(K,$,Z,X),Y=(K)=>K===void 0?void 0:V(K);return{texts:{module:V(Q.module),vertex:Y(Q.vertex),caster:Y(Q.caster),position:Y(Q.position),compute:Q.compute.map(V),...Q.inkField!==void 0?{inkField:V(Q.inkField)}:{}},layout:j,read:V}}var zW=($)=>$;function KW($){let J=new Int32Array($.size).fill(-1),Q=0,Z=0;for(let X of[!1,!0])for(let j=0;j<$.size;j++){if($.pinned(j)||$.held(j)!==X)continue;J[j]=$.types[j]==="f32"?Q++:Z++}return la(J,Q,Z);}function GW($,J){let Q=J.slice();for(let Z=0;Z<$.size;Z++)if($.spelled(Z))Q[Z]=-1;return Q}var r2={specularF0:"vec3f",specularF90:"f32",iridescence:"f32",iridescenceIOR:"f32",iridescenceThickness:"f32",anisotropy:"vec2f",anisotropyTangent:"vec3f",anisotropyBitangent:"vec3f",sheen:"vec3f",sheenRoughness:"f32",thicknessColor:"vec3f",thicknessDistortion:"f32",thicknessAmbient:"f32",thicknessAttenuation:"f32",thicknessPower:"f32",thicknessScale:"f32",thickness:"f32",ior:"f32",attenuationColor:"vec3f",attenuationDistance:"f32",volumeScale:"vec3f",dispersion:"f32",clearcoatNormal:"vec3f"},C0=($)=>d$("f32",[$]),eJ=($)=>d$("vec3f",[$[0],$[1],$[2]]);function Q5($){return $.readsData=!0,e6($)}function $$($,J,Q){return J===null?$:$.mul(Q5(J)[Q])}function a2($){if($.transmissionNode!==null)return $.transmissionNode;let J=m0($,"transmissionMap");return J===null?null:$$(C0($.transmission),J,"r")}function s2($){let J=m0($,"clearcoatMap"),Q=m0($,"clearcoatRoughnessMap");return{clearcoat:$.clearcoatNode??(J===null?null:$$(C0($.clearcoat),J,"r")),clearcoatRoughness:$.clearcoatRoughnessNode??(Q===null?null:$$(C0($.clearcoatRoughness),Q,"r"))}}function t2($){if($.shadingModel==="matcap")return null;if($.aoNode!==null)return $.aoNode;let J=m0($,"aoMap");return J===null?null:Q5(J).r.sub(1).mul($.aoMapIntensity).add(1)}function e2($){let J=m0($,"lightMap");return J===null?null:e6(J).rgb.mul($.lightMapIntensity)}var UW=u0(`
fn shade_uvFrameAxis(posW: vec3<f32>, nrmW: vec3<f32>, uvv: vec2<f32>, axis: f32) -> vec3<f32> {
  let q0 = dpdx(posW);
  let q1 = -dpdy(posW);
  let st0 = dpdx(uvv);
  let st1 = -dpdy(uvv);
  let n = normalize(nrmW);
  let q1perp = cross(q1, n);
  let q0perp = cross(n, q0);
  let t = q1perp * st0.x + q0perp * st1.x;
  let b = q1perp * st0.y + q0perp * st1.y;
  return select(b, t, axis < 0.5);
}
`),m2=($)=>u(UW,"shade_uvFrameAxis",[c2,u2,J$(),C0($)],"vec3f"),HW=p("vec3f")`vec3<f32>(length(${tJ}[0].xyz), length(${tJ}[1].xyz), length(${tJ}[2].xyz))`.vertexStage();function FW($){if($.anisotropyNode!==null)return $.anisotropyNode;let J=$.anisotropy*Math.cos($.anisotropyRotation),Q=$.anisotropy*Math.sin($.anisotropyRotation),Z=m0($,"anisotropyMap");if(Z===null)return d$("vec2f",[J,Q]);let X=Q5(Z),j=X.xy.mul(2).sub(1).normalize().mul(X.b);return X0(j.x.mul(J).sub(j.y.mul(Q)),j.x.mul(Q).add(j.y.mul(J)))}function WW($){if($.iridescenceThicknessNode!==null)return $.iridescenceThicknessNode;let J=$.iridescenceThicknessRange,Q=isFinite(Number(J?.[0]))?Number(J[0]):100,Z=isFinite(Number(J?.[1]))?Number(J[1]):400,X=m0($,"iridescenceThicknessMap");return X===null?C0(Z):W8(C0(Q),C0(Z),Q5(X).g)}var $j=($)=>$.iorNode??C0($.ior),Jj=($)=>$.specularIntensityNode??$$(C0($.specularIntensity),m0($,"specularIntensityMap"),"a");function PW($){let J=$j($),Q=J.sub(1).div(J.add(1)),Z=m0($,"specularColorMap"),X=$.specularColorNode??(Z===null?eJ($.specularColor):eJ($.specularColor).mul(e6(Z).rgb));return M0(Q.mul(Q)).mul(X).min(M0(1)).mul(Jj($))}function Qj($,J){let Q=[],Z=function(X,j){Q.push({name:X,node:j})};if(J&$5)Z("specularF0",PW($));if(J&l2)Z("specularF90",Jj($));if(J&n2)Z("iridescence",$.iridescenceNode??$$(C0($.iridescence),m0($,"iridescenceMap"),"r")),Z("iridescenceIOR",$.iridescenceIORNode??C0($.iridescenceIOR)),Z("iridescenceThickness",WW($));if(J&p2)Z("anisotropy",FW($)),Z("anisotropyTangent",m2(0)),Z("anisotropyBitangent",m2(1));if(J&i2){let X=m0($,"sheenColorMap"),j=eJ($.sheenColor.map((q)=>q*$.sheen));Z("sheen",$.sheenNode??(X===null?j:j.mul(e6(X).rgb))),Z("sheenRoughness",N0($.sheenRoughnessNode??$$(C0($.sheenRoughness),m0($,"sheenRoughnessMap"),"a"),0.0001,1))}if(J&o2){if($.thicknessColorNode===null)throw new Z0("internal: the subsurface term reads a thicknessColorNode");Z("thicknessColor",$.thicknessColorNode),Z("thicknessDistortion",$.thicknessDistortionNode??C0(0.1)),Z("thicknessAmbient",$.thicknessAmbientNode??C0(0)),Z("thicknessAttenuation",$.thicknessAttenuationNode??C0(0.1)),Z("thicknessPower",$.thicknessPowerNode??C0(2)),Z("thicknessScale",$.thicknessScaleNode??C0(10))}if(J&J5){Z("thickness",x0($.thicknessNode??$$(C0($.thickness),m0($,"thicknessMap"),"g"),0)),Z("ior",$j($)),Z("attenuationColor",$.attenuationColorNode??eJ($.attenuationColor));let X=Number.isFinite($.attenuationDistance)?$.attenuationDistance:340000000000000000000000000000000000000;Z("attenuationDistance",$.attenuationDistanceNode??C0(X)),Z("volumeScale",HW)}if(J&d2)Z("dispersion",$.dispersionNode??C0($.dispersion));if(J&$9&&$.clearcoatNormalNode!==null)Z("clearcoatNormal",$.clearcoatNormalNode);return Q}var Vj=16,XZ={rewrite:($)=>$,rewriteScope:($)=>$,rolled:0,tableRows:0},Q$=0,MW=1,Z5=2,Q9=3,Yj=0,JZ=1,zj=2,QZ=-1;function Uj($){let J=[...$.roots],Q=$.scopes.filter((q)=>q!==null&&q!==void 0),Z=[],X=0,j=0;for(;;){let q=new Wj(J,Q);if(q.rolled===0)break;Z.push(q),X+=q.rolled,j+=q.tableRows,J=J.map((V)=>q.rewrite(V)),Q=Q.map((V)=>q.rewriteScope(V))}if(Z.length===0)return XZ;return ma(Z,X,j);}var Hj=-1;function CW($,J){let Q=new Map,Z=new Map,X=new Set,j=[],q=[...$];for(let V of new Set(J))T0(V,q);j.push({region:Hj,roots:q});for(let V=j.pop();V!==void 0;V=j.pop()){let Y=new Map;Q.set(V.region,Y);let K=[],z=function(G){let H=Y.get(G);if(Y.set(G,(H??0)+1),H===void 0)K.push(G)};for(let G of V.roots)z(G);for(let G=K.pop();G!==void 0;G=K.pop()){let H=G.meta;if(H.kind==="varRead"&&!X.has(G))X.add(G),Z.set(H.variable.id,(Z.get(H.variable.id)??0)+1);else if((H.kind==="fnCall"||H.kind==="voidCall")&&!Q.has(H.instance.id)&&!j.some((U)=>U.region===H.instance.id))na(j,H);for(let U of G.inputs)z(U)}}return{uses:Q,reads:Z}}function Fj($,J){let Q=J.get($);if(Q!==void 0)return Q;let Z=(q)=>`${q.meta.kind}:${q.type}/${q.inputs.length}`,X=(q)=>q.stmts.map((V)=>Fj(V,J)).join(";"),j;switch($.kind){case"decl":j=`d${$.variable.type}:${Z($.init)}`;break;case"assign":j=`a${$.variable.type}${$.component??""}:${Z($.value)}`;break;case"if":{j=oa(j,$,Z,X)}break;case"loop":j=`l${$.trips??"?"}{${X($.scope)}}`;break;case"sideEffect":j=`e${Z($.node)}`;break;case"discard":j=`x${$.cond===null?"-":Z($.cond)}`;break;case"store":{j=pa(j,$,Z)}break}return J.set($,j),j}class Wj{constructor($,J){this.rolled=0;this.tableRows=0;this.uses=void 0;this.reads=void 0;this.region=Hj;this.nodesDone=new Map;this.instancesDone=new Map;this.scopesDone=new Map;this.bodiesDone=new Map;this.skeletons=new WeakMap;this.quadInstances=new Map;this.objectIds=new Map;this.ids=($)=>{let J=this.objectIds.get($);if(J!==void 0)return J;let Q=this.objectIds.size+1;return this.objectIds.set($,Q),Q};let Q=CW($,J);this.uses=Q.uses,this.reads=Q.reads;for(let Z of J)this.rewriteScope(Z);for(let Z of $)this.rewrite(Z)}usesOf($){return this.uses.get(this.region)?.get($)??0}readsOf($){return this.reads.get($)??0}rewrite($){return o0($,this.nodesDone,function(){return},(J,Q)=>{let Z=J.meta;if(Z.kind!=="fnCall"&&Z.kind!=="voidCall")return S8(J,Q);return qa.call(this,Z,Q,J);})}instance($){let J=this.instancesDone.get($.id);if(J!==void 0)return J;let Z;{Z=ra.call(this,$)}let X=$.returns===null?null:this.rewrite($.returns),j=l$($,Z,X);return this.instancesDone.set($.id,j),j}rewriteScope($){let J=this.scopesDone.get($);if(J!==void 0)return J;let Q=$.stmts,Z=[],X=!1;for(let q=0;q<Q.length;){let V=this.runAt(Q,q);if(V!==null){for(let K of V.stmts)Z.push(this.stmt(K,!1));this.rolled+=1,this.tableRows+=V.tableRows,X=!0,q+=V.length;continue}let Y=this.stmt(Q[q],!0);if(Y!==Q[q])X=!0;Z.push(Y),q+=1}let j=X?{stmts:Z}:$;return this.scopesDone.set($,j),j}body($){let J=this.bodiesDone.get($);if(J!==void 0)return J;let Q=!1,Z=$.stmts.map((j)=>{let q=this.stmt(j,!1);if(q!==j)Q=!0;return q}),X=Q?{stmts:Z}:$;return this.bodiesDone.set($,X),X}stmt($,J){let Q=(j)=>this.rewrite(j),Z=(j)=>J?this.rewriteScope(j):this.body(j),X;switch($.kind){case"decl":if(X={...$,init:Q($.init)},X.init===$.init)return $;return X;case"assign":return sa(X,$,Q);case"if":{if((da=ta($,Q,Z))!==ca)return da}case"loop":{if((da=ua(Q,$,Z))!==ca)return da}case"sideEffect":return va(X,$,Q);case"discard":{return wa($,Q);}case"store":{if((da=xa(Q,$))!==ca)return da}}}runAt($,J){let Q=(j,q)=>({stmts:j.loop(),length:q,tableRows:j.tableRows()}),Z=(j)=>Fj($[j],this.skeletons),X=function(j,q,V){for(let Y=0;Y<V;Y+=1)if(Z(j+Y)!==Z(q+Y))return!1;return!0};for(let j=1;J+2*j<=$.length;j+=1){if(!X(J,J+j,j))continue;let q=2;while(J+(q+1)*j<=$.length&&X(J,J+q*j,j))q+=1;let V=null;for(let Y=q;Y>=2;){let K=Array.from({length:Y},(G,H)=>$.slice(J+H*j,J+(H+1)*j)),z=this.unify(K);if(z.walk!==null&&Y>Vj&&z.walk.gathers()>0){Y=Vj;continue}if(z.walk!==null&&z.splitAt>=2&&z.splitAt<Y){V??={walk:z.walk,length:Y*j},Y=z.splitAt;continue}if(z.walk!==null)return Q(z.walk,Y*j);if(V!==null)return Q(V.walk,V.length);if(z.failAt<2||z.failAt>=Y)break;Y=z.failAt}if(V!==null)return Q(V.walk,V.length)}return null}unify($){let J=new Set;for(;;){let Q=new Pj($,J,this);if(!Q.walkStmts($)||Q.failAt>=0)return ya(Q);let Z=Q.readOutside(J);if(typeof Z==="number")return{walk:null,failAt:Z,splitAt:-1};if(Z!==null){J=Z;continue}let X=Q.holds();if(X>=0)return{walk:null,failAt:X,splitAt:-1};return{walk:Q.smaller()?Q:null,failAt:1,splitAt:Q.splitAt()}}}readsQuad($){return qj($,this.quadInstances)}}function DW($,J){let Q=$.meta;if(Q.kind==="element")return J===1;if(Q.kind==="wgslExpr")return!Q.module&&!Gj.test(Q.parts[0]??"");return!1}var IW="xyzw";class Pj{constructor($,J,Q){this.trips=void 0;this.boundary=void 0;this.pass=void 0;this.positions=[];this.order=[];this.posOf=void 0;this.locals=void 0;this.localCount=0;this.assigned=new Set;this.rootRefs=void 0;this.differing=[];this.readAfter=new Set;this.failAt=-1;this.n=void 0;this.trips=$;this.boundary=J;this.pass=Q;this.n=$.length,this.posOf=$.map(()=>new Map),this.locals=$.map(()=>new Map),this.rootRefs=$.map(()=>[])}fail($){if(this.failAt<0)this.failAt=Math.max(1,$);return!1}refuse($){return this.fail($),Yj}walkStmts($){let J=$[0];for(let Q=1;Q<this.n;Q+=1)if($[Q].length!==J.length)return this.fail(Q);for(let Q=0;Q<J.length;Q+=1){let Z=$.map((X)=>X[Q]);if(!this.walkStmt(Z))return!1}return!0}walkStmt($){let J=$[0];for(let Z=1;Z<this.n;Z+=1)if($[Z].kind!==J.kind)return this.fail(Z);let Q=(Z)=>Z!==null;switch(J.kind){case"decl":{let Z=$.filter((X)=>X.kind==="decl");for(let X=1;X<this.n;X+=1)if(Z[X].variable.type!==J.variable.type)return this.fail(X);if(!this.walkRoots(Z.map((X)=>X.init),!1))return!1;return this.declare(Z.map((X)=>X.variable)),!0}case"assign":{let Z=$.filter((X)=>X.kind==="assign");if(!this.sameVariable(Z.map((X)=>X.variable)))return!1;for(let X=1;X<this.n;X+=1)if(Z[X].component!==J.component)return this.fail(X);return this.walkRoots(Z.map((X)=>X.value),!1)}case"if":{if((da=za.call(this,$,J,Q))!==ca)return da}case"loop":{if((da=Aa.call(this,$,J))!==ca)return da}case"sideEffect":return Ba.call(this,$);case"discard":{if((da=Ca.call(this,$,J,Q))!==ca)return da}case"store":{if((da=Da.call(this,$,J))!==ca)return da}}}declare($){let J=this.localCount;this.localCount+=1,$.forEach((Q,Z)=>this.locals[Z].set(Q.id,J))}sameVariable($){let J=this.locals[0].get($[0].id);for(let Q=1;Q<this.n;Q+=1)if(this.locals[Q].get($[Q].id)!==J||J===void 0&&$[Q]!==$[0])return this.fail(Q);if(J===void 0)this.assigned.add($[0].id);return!0}walkRoots($,J){$.forEach((X,j)=>this.rootRefs[j].push(X));let Q=[],Z=(X,j)=>{let q=this.visit(X,j);if(q===Yj)return!1;if(q===zj)Q.push({nodes:X,next:0,pinned:j,position:this.positions.length-1});return!0};if(!Z($,J))return!1;while(Q.length>0){let X=Q[Q.length-1],j=X.nodes[0];if(X.next>=j.inputs.length){Q.pop(),this.order.push(X.position);continue}let q=X.next;if(X.next+=1,!Z(X.nodes.map((V)=>V.inputs[q]),X.pinned||DW(j,q)))return!1}return!0}signature($,J){let Q=$.meta;if(Q.kind==="varRead"){let Z=this.locals[J].get(Q.variable.id);return Z===void 0?`vo${Q.variable.id}`:`vl${Z}:${$.type}`}if(Q.kind==="voidCall")return Ea(Q,$);return Xj($,this.pass.ids)}visit($,J){let Q=$[0];if($.every((V)=>V===Q)){for(let V=0;V<this.n;V+=1){let Y=this.posOf[V].get(Q);if(Y!==void 0&&Y!==QZ)return this.refuse(Math.max(1,V));this.posOf[V].set(Q,QZ)}return JZ}let Z=this.posOf[0].get(Q);if(Z===QZ)return this.refuse(Math.max(1,$.findIndex((V)=>V!==Q)));for(let V=1;V<this.n;V+=1)if(this.posOf[V].get($[V])!==Z)return this.refuse(V);if(Z!==void 0)return JZ;let X=this.positions.length;$.forEach((V,Y)=>this.posOf[Y].set(V,X));for(let V=1;V<this.n;V+=1)if($[V].type!==Q.type)return this.refuse(V);let j=(V)=>{return this.positions.push({nodes:$,role:V}),this.order.push(X),JZ};if($.some((V)=>this.boundary.has(V)))return J?this.refuse(1):j(Q9);if($.every((V)=>V.meta.kind==="const")){let V=$.map((z)=>z.meta.kind==="const"?z.meta.values:[]),Y=V.findIndex((z)=>z.length!==V[0].length||z.some((G,H)=>!Object.is(G,V[0][H])));if(Y<0)return j(MW);if(J||Z9(Q.type)!=="f32"||j5(Q.type))return this.refuse(Y);let K=V.findIndex((z)=>z.some((G)=>!Number.isFinite(G)));if(K>=0)return this.refuse(Math.max(1,K));return j(Z5)}let q=this.signature(Q,0);for(let V=1;V<this.n;V+=1){if(q!==null&&this.signature($[V],V)===q)continue;if(J)return this.refuse(V);return this.differing.push({position:X,first:V}),j(Q9)}if(q===null)return this.refuse(1);if($.some((V)=>this.pass.readsQuad(V)))return this.refuse(1);return this.positions.push({nodes:$,role:Q$}),zj}readOutside($){let J=null,Q=-1,Z=new Set;for(let X=0;X<this.n;X+=1){let j=new Map,q=function(Y){j.set(Y,(j.get(Y)??0)+1)};for(let Y of this.rootRefs[X])q(Y);for(let Y of this.positions)if(Y.role===Q$)for(let K of Y.nodes[X].inputs)q(K);let V=(Y)=>this.pass.usesOf(Y)>(j.get(Y)??0);for(let{position:Y,first:K}of this.differing)if(Q<0&&!V(this.positions[Y].nodes[X]))Q=Math.max(1,K);this.positions.forEach((Y,K)=>{if(Y.role!==Q$)return;if(V(Y.nodes[X]))this.readAfter.add(Y.nodes[X]);else Z.add(K)})}return this.positions.forEach(function(X,j){if(X.role!==Q$||Z.has(j))return;J??=new Set($);for(let q of X.nodes)J.add(q)}),J??(Q<0?null:Q)}splitAt(){let $=-1;for(let J of this.differing)if($<0||J.first<$)$=J.first;return $}holds(){let $=new Set(this.assigned);for(let X of this.locals)for(let j of X.keys())$.add(j);let Z;{Z=Fa($)}for(let X=0;X<this.n;X+=1){let j=new Map;for(let q of this.positions){let V=q.nodes[X];if(q.role===Q9&&Z(V))return Math.max(1,X);if(q.role===Q$&&this.readAfter.has(V)&&Z(V))return Math.max(1,X);if(q.role===Q$&&V.meta.kind==="varRead")j.set(V.meta.variable.id,(j.get(V.meta.variable.id)??0)+1)}for(let q of this.locals[X].keys())if(this.pass.readsOf(q)>(j.get(q)??0))return Math.max(1,X)}return-1}smaller(){let $=this.positions.length;return $+this.gathers()*(this.n+2)+4<$*this.n}gathers(){let $=0;for(let J of this.positions)if(J.role===Q9)$+=1;return $}tableRows(){let $=0,J=new Set;for(let Q of this.positions){if(Q.role!==Z5)continue;let Z=Q.nodes.map((j)=>j.meta.kind==="const"?j.meta.values:[]),X=Z.map((j)=>j.join(",")).join(";");if(J.has(X))continue;if(J.add(X),($&3)+Z[0].length>4)$=$+3&-4;$+=Z[0].length}return $===0?0:this.n*Math.ceil($/4)}loop(){let $=this.n,J=new ZZ(X5(),"i32","i"),Q=j0("varRead","i32",[],{variable:J}),Z=new Map,X=new Map,j=0;this.positions.forEach(function(F,M){if(F.role!==Z5)return;let B=F.nodes.map((P)=>P.meta.kind==="const"?P.meta.values:[]),D=B.map((P)=>P.join(",")).join(";"),C=Z.get(D);if(C===void 0){let P=B[0].length;if((j&3)+P>4)j=j+3&-4;C=j,j+=P,Z.set(D,C)}X.set(M,C)});let q=Math.max(1,Math.ceil(j/4)),V=j>0?Array($*q*4).fill(0):[];this.positions.forEach(function(F,M){let B=X.get(M);if(B===void 0)return;F.nodes.forEach(function(D,C){if(D.meta.kind!=="const")return;D.meta.values.forEach(function(P,I){V[C*q*4+B+I]=P+0})})});let Y=j>0?j0("uniform","vec4f",[],{slot:new Kj(X5(),"vec4f",V,$*q)}):null,K=new Map,z=function(F,M){let B=K.get(M);if(B===void 0){let D=q===1?Q:j0("op2","i32",[Q,J9(q)],{op:"*"}),C=M===0?D:j0("op2","i32",[D,J9(M)],{op:"+"});B=j0("element","vec4f",[F,C],{}),K.set(M,B)}return B},G=[],H=new Map;for(let F of this.order){let M=this.positions[F],B=M.nodes[0];if(M.role===Z5&&Y!==null){let D=X.get(F)??0,C=B.meta.kind==="const"?B.meta.values.length:1,P=z(Y,D>>2);H.set(B,C===4?P:j0("swizzle",B.type,[P],{sw:IW.slice(D&3,(D&3)+C)}))}else if(M.role===Q9){let D=new ZZ(X5(),B.type,null,$);G.push({kind:"decl",variable:D,init:j0("rows",B.type,M.nodes,{})}),H.set(B,j0("element",B.type,[j0("varRead",B.type,[],{variable:D}),Q],{}))}else if(M.role===Q$){let D=S8(B,B.inputs.map((C)=>H.get(C)??C));if(D!==B)H.set(B,D)}}let U=Bj(this.trips[0],(F)=>H.get(F)??F);return[...G,{kind:"loop",counter:J,start:J9(0),end:J9($),trips:$,scope:{stmts:U}}]}}function Bj($,J){let Q=(Z)=>({stmts:Bj(Z.stmts,J)});return $.map(function(Z){switch(Z.kind){case"decl":return{...Z,init:J(Z.init)};case"assign":return{...Z,value:J(Z.value)};case"if":return{kind:"if",branches:Z.branches.map((X)=>({cond:X.cond===null?null:J(X.cond),scope:Q(X.scope)}))};case"loop":return{...Z,start:J(Z.start),end:J(Z.end),scope:Q(Z.scope)};case"sideEffect":return{...Z,node:J(Z.node)};case"discard":return{kind:"discard",cond:Z.cond===null?null:J(Z.cond)};case"store":return{...Z,index:J(Z.index),value:J(Z.value)}}})}var NW=new Set(["varRead","storageRead","atomic","fnCall","voidCall"]),kW=/\bvar\s*</,xW=new WeakMap;function TW($){return Z$(xW,$,()=>kW.test($.source))}var Ij=new Float64Array(1),Mj=new Int32Array(Ij.buffer);function r0($,J){return Math.imul($^J,16777619)>>>0}function OW($){if(NW.has($.meta.kind))return!0;return $.meta.kind==="wgslExpr"&&$.meta.module!==null&&TW($.meta.module)}function Cj($,J){return typeof $==="number"&&typeof J==="number"?Object.is($,J):$===J}function RW($,J){if(!Array.isArray($)||!Array.isArray(J))return!Array.isArray($)&&!Array.isArray(J)&&Cj($,J);if($.length!==J.length)return!1;for(let Q=0;Q<$.length;Q+=1)if(!Cj($[Q],J[Q]))return!1;return!0}function AW($,J){let Q=0;for(let Z in $){if(!Object.hasOwn($,Z))continue;if(!Object.hasOwn(J,Z)||!RW(Reflect.get($,Z),Reflect.get(J,Z)))return!1;Q+=1}for(let Z in J)if(Object.hasOwn(J,Z))Q-=1;return Q===0}var jZ=-1,LW={rewrite:($)=>$,rewriteScope:($)=>$,shared:0};class Nj{constructor(){this.objectIds=new Map;this.stringIds=new Map;this.state=new Map;this.buckets=new Map;this.keys=0;this.first=new Map;this.done=new Map;this.instances=new Map;this.bodyScope=b8(($)=>this.done.get($)??$);this.shared=0;}objectId($){let J=this.objectIds.get($);if(J===void 0)J=this.objectIds.size+1,this.objectIds.set($,J);return J}stringId($){let J=this.stringIds.get($);if(J===void 0)J=this.stringIds.size+1,this.stringIds.set($,J);return J}itemHash($){switch(typeof $){case"number":if(Number.isNaN($))return 2146959360;return Ij[0]=$,r0(r0(2654435769,Mj[0]),Mj[1]);case"string":return r0(2246822507,this.stringId($));case"object":return $===null?668265263:r0(3266489909,this.objectId($));default:return r0(374761393,this.stringId(String($)))}}fieldHash($){if(!Array.isArray($))return this.itemHash($);let J=r0(3550635116,$.length);for(let Q of $)J=r0(J,this.itemHash(Q));return J}keyFor($){if($.meta.kind==="vertexStage")return++this.keys;let J=$.meta,Q=0;for(let j in J)if(Object.hasOwn(J,j))Q=Q+r0(this.stringId(j),this.fieldHash(Reflect.get(J,j)))>>>0;let Z=r0(r0(r0(2166136261,this.stringId($.type)),Q),$.inputs.length);for(let j of $.inputs)Z=r0(Z,this.keyOf(j));let X=this.buckets.get(Z);if(X!==void 0)if(Array.isArray(X)){for(let j of X)if(this.sameValue($,j))return this.keyOf(j);X.push($)}else{if(this.sameValue($,X))return this.keyOf(X);this.buckets.set(Z,[X,$])}else this.buckets.set(Z,$);return++this.keys}keyOf($){return(this.state.get($)??0)>>1}sameValue($,J){if($.type!==J.type||$.inputs.length!==J.inputs.length)return!1;for(let Q=0;Q<$.inputs.length;Q+=1)if(this.keyOf($.inputs[Q])!==this.keyOf(J.inputs[Q]))return!1;return AW($.meta,J.meta)}walk($){o0($,this.state,function(){return},(J)=>this.settle(J),Dj)}instanceOf($){let J=this.instances.get($);if(J===void 0){let Q=this.bodyScope($.body),Z=$.returns&&(this.done.get($.returns)??$.returns);J=l$($,Q,Z),this.instances.set($,J)}return J}metaOf($){let J=$.meta;if(J.kind!=="fnCall"&&J.kind!=="voidCall")return J;return Ga.call(this,J);}settle($){let J=$.inputs,Q=null,Z=OW($),X=!1;for(let G=0;G<J.length;G+=1){let H=J[G],U=this.done.get(H)??H;if(Q===null&&U!==H)Q=J.slice(0,G);if(Q!==null)Q.push(U);let F=this.state.get(H)??jZ;if(F===jZ)Z=!0;else if((F&1)===1)X=!0}let j=this.metaOf($),q=j===$.meta&&Q===null?$:new P0($.type,Q??J,j);if(q!==$)this.done.set($,q);if(Z)return jZ;let V=X||$.meta.kind==="wgslExpr"&&$.meta.module!==null||$.meta.kind==="textureSample",Y=this.keyFor($),K=Y*2+(V?1:0);if(!V||$.meta.kind==="vertexStage")return K;let z=this.first.get(Y);if(z===void 0)this.first.set(Y,q);else this.done.set($,z),this.shared+=1;return K}}function kj($){let J=[...$.roots];for(let q of new Set($.scopes))if(q!==null&&q!==void 0)T0(q,J);let Q=new Nj;for(let q of J)Q.walk(q);if(Q.shared===0)return LW;let Z=Q.done,X=(q)=>Z.get(q)??q,j=b8(X);return{rewrite:X,rewriteScope:(q)=>q===null?null:j(q),shared:Q.shared}}var q5={rewrite:($)=>$,rewriteScope:($)=>$,packs:0},vW=new Set(["instanceIndex","cameraPosition","time","deltaTime","screenSize"]),yW=new Set(["dpdx","dpdxCoarse","dpdxFine","dpdy","dpdyCoarse","dpdyFine","fwidth","fwidthCoarse","fwidthFine"]),xj=/\b(?:textureSample|textureSampleBias|textureSampleCompare|dpdx\w*|dpdy\w*|fwidth\w*)\s*\(|\bdiscard\b|\bvar\s*<\s*(?:private|workgroup|storage\s*,\s*read_write)/,X$={f32:1,vec2f:2,vec3f:3,vec4f:4},SW=["f32","vec2f","vec3f","vec4f"],bW="xyzw";function zZ($,J){let Q=new Set,Z=new Set,X=new Set,j=[...$];if(J)T0(J,j),YZ(J,(V)=>X.add(V));let q=new Set;for(let V=j.pop();V!==void 0;V=j.pop()){if(q.has(V))continue;q.add(V);let Y=V.meta;if(Y.kind==="textureSample")Q.add(Y.texture);else if(Y.kind==="storageRead")Z.add(Y.buffer);for(let K of V.inputs)j.push(K)}return{textures:Q,storages:Z,nodes:q,variables:X}}function wW($,J){let Q=new Map,Z=new Set,X=function(K,z){let G=Q.get(K);if(G)G.push(z);else Q.set(K,[z])},j=function(K,z){for(let G of K.stmts)switch(G.kind){case"decl":Ha(X,G,z);break;case"assign":Ia(X,G,z);break;case"if":{let H=[];for(let U of G.branches){if(U.cond)H.push(U.cond);j(U.scope,[...z,...H])}break}case"loop":X(G.counter.id,{values:[G.start,G.end],controls:z}),j(G.scope,[...z,G.start,G.end]);break;default:break}};if($)j($,[]);let q=[...J];if($)T0($,q);let V=new Set,Y=new Set;for(let K=q.pop();K!==void 0;K=q.pop()){if(V.has(K))continue;V.add(K);let z=K.meta;if((z.kind==="fnCall"||z.kind==="voidCall")&&!Y.has(z.instance))Y.add(z.instance),YZ(z.instance.body,(G)=>Z.add(G),!1),n$(z.instance,q);for(let G of K.inputs)q.push(G)}return{writes:Q,poisoned:Z}}var w8=-1,P8={one:!1,heavy:!1,readsVar:!1,rows:w8},qZ={one:!0,heavy:!1,readsVar:!1,rows:0};class V5{constructor($,J){this.reads=void 0;this.variables=void 0;this.memo=new Map;this.reads=$;this.variables=J}of($){return o0($,this.memo,(J)=>this.leaf(J)?this.settle(J):void 0,(J)=>this.settle(J))}leaf($){let J=$.meta.kind;return J==="const"||J==="uniform"||J==="input"||J==="attribute"||J==="varRead"||J==="vertexStage"||J==="fnCall"||J==="voidCall"||J==="atomic"}settle($){let J=$.meta;switch(J.kind){case"const":case"uniform":return qZ;case"input":return Ja(J);case"varRead":return Ka.call(this,J);case"attribute":case"vertexStage":case"fnCall":case"voidCall":case"atomic":return P8;case"call":if(yW.has(J.fn))return P8;break;case"textureSample":if(J.mode==="sample"||!this.reads.textures.has(J.texture))return P8;break;case"storageRead":if(!this.reads.storages.has(J.buffer))return P8;break;case"wgslExpr":if(J.module===null||xj.test(J.module.source)||xj.test(J.parts.join("")))return P8;break;default:break}let Q=J.kind==="textureSample"||J.kind==="storageRead"||J.kind==="wgslExpr",Z=!1,X=J.kind==="textureSample"||La(J)||Ma(J)?w8:0;for(let q of $.inputs){let V=this.memo.get(q)??P8;if(!V.one)return P8;Q||=V.heavy,Z||=V.readsVar,X=X===w8||V.rows===w8?w8:Math.max(X,V.rows)}let j=$.inputs[0]?.meta;if(J.kind==="element"&&j?.kind==="uniform"&&j.slot.rows>0&&this.isCopyRow($.inputs[1]))X=j.slot.rows;return{one:!0,heavy:Q,readsVar:Z,rows:X}}isCopyRow($){let J=$.meta;if(J.kind==="input")return J.name==="instanceIndex";if(J.kind==="cast")return this.isCopyRow($.inputs[0]);return J.kind==="call"&&J.fn==="min"&&$.inputs.length===2&&$.inputs.some((Q,Z)=>this.isCopyRow(Q)&&this.of($.inputs[1-Z]).rows===0)}}function EW($,J,Q){let Z=new Set;for(let X of $.keys())if(!J.has(X))Z.add(X);for(let X=!0;X;){X=!1;let j=new V5(Q,Z);for(let q of[...Z]){if(($.get(q)??[]).every((Y)=>Y.values.every((K)=>j.of(K).one)&&Y.controls.every((K)=>j.of(K).one)))continue;Z.delete(q),X=!0}}return Z}function Oj($){let J=[];if($)T0($,J);return J}function _W($,J){let Q=0;return i$([$],function(Z){if(!J.of(Z).one)return!1;let X=Z.meta.kind;if(X==="textureSample"||X==="storageRead"||X==="wgslExpr"||X==="varRead")Q+=1;return X!=="varRead"}),Q}function Rj($){if($.packs<=0)return q5;let J=Oj($.scope),{writes:Q,poisoned:Z}=wW($.scope,[...$.outputs,...J]),X=EW(Q,Z,$.reads),j=new V5($.reads,X),q=function(C){let P=new Map,I=function(x){let T=x.meta;if(T.kind==="varRead")return C.has(T.variable.id);return T.kind==="textureSample"||T.kind==="storageRead"||T.kind==="wgslExpr"?$.reads.nodes.has(x):void 0};return(x)=>o0(x,P,I,(T,N)=>N.every(Boolean))},V=new Set($.reads.variables);for(let C=!0;C;){C=!1;let P=q(V);for(let I of[...V]){if((Q.get(I)??[]).every((x)=>x.values.every(P)&&x.controls.every(P)))continue;V.delete(I),C=!0}}let Y=q(V),K=new Set,z=(C,P)=>i$(C,function(I){let x=j.of(I);if(x.one){if(!x.heavy)return!1;let T=I.meta.kind;if(!(P&&x.readsVar)&&X$[I.type]!==void 0&&T!=="const"&&T!=="uniform"&&T!=="input"&&Y(I)&&!$.acts(I))return K.add(I),!1}return I.meta.kind!=="vertexStage"});if(z(J,!0),z($.outputs,!1),K.size===0)return q5;let G=[...K].map((C)=>({node:C,size:X$[C.type]??4,weight:_W(C,j)})).sort((C,P)=>P.weight-C.weight||P.size-C.size||C.node.id-P.node.id),H=Lj(G.map((C)=>C.node),$.packs),U=new Map;for(let C of H){let P=SW[C.used-1];vj(U,C.items,j0("vertexStage",P,[C.items.length===1?C.items[0]:j0("construct",P,C.items,{})],{label:null,flat:!0}))}let F=VZ(U,!1),M=VZ(new Map([...U].filter(([C])=>!j.of(C).readsVar)),!1),B=b8(M);return{rewrite:F,rewriteScope:(C)=>C===null?null:B(C),packs:H.length}}var KZ={rewrite:($)=>$,rewriteScope:($)=>$,stage:null},gW=64;function Aj($){let J=[...$.roots,...$.scopes.flatMap((B)=>Oj(B))],Q=new V5(zZ(J,null),new Set),Z=[],X=1;if(i$(J,function(B){let D=Q.of(B);if(D.rows===w8||!D.heavy||X$[B.type]===void 0)return!0;return Z.push(B),X=Math.max(X,D.rows),!1}),Z.length===0)return KZ;let j=Lj(Z.sort((B,D)=>(X$[D.type]??4)-(X$[B.type]??4)||B.id-D.id),1/0),q=Tj(X*j.length),V=(B)=>j0("const","u32",[],{values:[B]}),Y=h0("instanceIndex","u32"),K=j0("op2","u32",[j0("call","u32",[Y,V(X-1)],{fn:"min"}),V(j.length)],{op:"*"}),z=j0("op2","u32",[Y,V(j.length)],{op:"*"}),G=(B,D)=>D===0?B:j0("op2","u32",[B,V(D)],{op:"+"}),H=new Map,U=j.map(function(B,D){vj(H,B.items,q.element(G(K,D)));let C=[...B.items];for(let P=B.used;P<4;P+=1)C.push(j0("const","f32",[],{values:[0]}));return{kind:"store",buffer:q,index:G(z,D),value:C.length===1?C[0]:j0("construct","vec4f",C,{}),component:null}}),F=VZ(H,!0),M=b8(F);return{rewrite:F,rewriteScope:(B)=>B===null?null:M(B),stage:{scope:{stmts:U},count:X,workgroupSize:gW,buffer:q}}}function Lj($,J){let Q=[];for(let Z of $){let X=X$[Z.type]??4,j=Q.find((q)=>q.used+X<=4);if(j)j.items.push(Z),j.used+=X;else if(Q.length<J)Q.push({items:[Z],used:X})}return Q}function vj($,J,Q){let Z=0;for(let X of J){let j=X$[X.type]??4;$.set(X,J.length===1&&Q.type===X.type?Q:j0("swizzle",X.type,[Q],{sw:bW.slice(Z,Z+j)})),Z+=j}}function VZ($,J){let Q=new Map($),Z=(X)=>!J&&X.meta.kind==="vertexStage"?X:void 0;return(X)=>o0(X,Q,Z,S8)}var eq=[{name:"color",type:"vec3f"},{name:"opacity",type:"f32"},{name:"emissive",type:"vec3f"},{name:"emissiveIntensity",type:"f32"},{name:"roughness",type:"f32"},{name:"metalness",type:"f32"},{name:"alphaTest",type:"f32"},{name:"toonSteps",type:"f32"},{name:"transmission",type:"f32"},{name:"clearcoat",type:"f32"},{name:"clearcoatRoughness",type:"f32"},{name:"sortLayer",type:"f32"}];function fW($,J){let Q=$.reduce((j,q)=>j+q.rows,0),Z=Math.floor((p$-(J-Q*16))/16),X=Q>0?`this material's lists hold ${Q} rows and its other params leave room for ${Z}; shorten its lists to ${Z} rows in all`:`this material's params need ${J} bytes of uniforms and a material holds ${p$}`;return new Z0(X,{code:"uniform-block-over-limit"})}function hW($,J,Q,Z=[],X=0){let j={},q=[],V=0;for(let U of eq){let F=jq(U.type);V=Math.ceil(V/F)*F,j[U.name]={offset:V,size:TZ(U.type)},q.push(`  ${U.name}: ${R0(U.type)},`),V+=TZ(U.type)}let Y=0;while(V<RZ)q.push(`  _pad${Y}: f32,`),Y+=1,V+=4;let K=new Map,z=[];for(let U of $){let F=jj(U);if(F!==void 0){V=Math.ceil(V/16)*16;for(let B of F.members)K.set(B.slot.id,V+B.float*4),z.push(B.slot);q.push(`  ${J.name("uniform",U.id)}: array<vec4<f32>, ${F.vec4s}>,`),V+=F.vec4s*16;continue}z.push(U);let M=zq(U);V=Math.ceil(V/M.align)*M.align,K.set(U.id,V),q.push(`  ${J.name("uniform",U.id)}: ${M.wgsl},`),V+=M.size}let G=[];for(let U of Z)V=Math.ceil(V/16)*16,G.push(V),q.push(`  ${U}: vec4<f32>,`),V+=16;if(X>0)V=Math.ceil(V/16)*16,j[O5]={offset:V,size:X*16},q.push(`  ${O5}: array<vec4<f32>, ${X}>,`),V+=X*16;let H=Math.max(RZ,Math.ceil(V/16)*16);if(H>p$)throw fW($,H);return{structWgsl:`struct Material {
${q.join(`
`)}${Q?t6:""}
}`,layout:{byteSize:H,offsets:K,slots:z,staticFields:j},factsOffsets:G}}function HZ($){return $._measured===!0&&$.sampleType==="float"&&($.dimension===void 0||$.dimension==="2d-array")}var Sj=0,u8=1,g5=2;function G6($){let J=$.vertexLayout;if($.vertexPath!==void 0||J===void 0)return Sj;if($.attributeSource==="storage"||$.vertexReader!==void 0)return u8;return Na(J);}function $V($){if($.encoding==="oct16")return"vec3f";if($.encoding==="srgb8")return"vec4f";return R5($.format)}function F4($){let J=$.vertexLayout;if($.vertexPath!==void 0||!J)return null;if($.vertexReader)return $.vertexReader.wgsl;let Q=$.instanceSlots==="vertex",Z=`  @location(${r7}) lumeSlotAttr: u32,`,X=G6($);if(X===g5){let q=[],V=[],Y=[];for(let K of J.attributes)q.push(`  @location(${K.shaderLocation}) ${K.name}: ${R0(R5(K.format))},`),V.push(`  ${K.name}: ${R0($V(K))},`),Y.push(`  out.${K.name} = ${K.encoding?yJ(K.encoding,`raw.${K.name}`):`raw.${K.name}`};`);return Oa(Q,q,Z,V,Y);}if(X!==u8){let q=[];for(let V of J.attributes)q.push(`  @location(${V.shaderLocation}) ${V.name}: ${R0(R5(V.format))},`);return Pa(Q,q,Z);}if(J.storageEncoding==="indexed-attributes"){let q=[];for(let V of J.attributes)q.push({name:V.name,width:mW(V)});return uq(q)}return Qa(J);}function mW($){if($.encoding==="oct16")return 3;if($.encoding==="srgb8")return 4;if($.format==="float16x2")return 2;if($.format==="float16x4")return 4;return Oq[GV($.format,$.name)]}function JV($,J){let Q=$.vertexPath;if(Q!==void 0)return Q.entryParams.join(", ");let Z=G6($),X=Z===u8,j=[];if(Z===g5)j.push("lume_vin: VertexInRaw");else if(!X)j.push($.instanceSet||$.nativeModelMatrix===!0&&$.morph?"lume_vin: VertexIn":"in: VertexIn");if(X&&$.instanceSlots==="vertex")j.push(`@location(${r7}) lumeSlotAttr: u32`);if(J.instanceIndex||$.instanceSet)j.push("@builtin(instance_index) instanceIndex: u32");if(J.vertexIndex||X)j.push("@builtin(vertex_index) vertexIndex: u32");return j.join(", ")}var uW="@group(3) @binding(1) var<storage, read> lumeVertexArena: array<f32>;",cW=`@group(3) @binding(${rJ}) var<storage, read> lume_slots: array<u32>;`,V6="instances[lume_slot]",Y6="instances[instanceIndex]";function QV($){if($.vertexPath!==void 0)return null;if($.skinned===!0&&$.skinnedPalette!=="rig")return $.modelMaterial===!0?"vec4<f32>(modelMaterial.flash.rgb, 0.0)":null;if($.instancing!=="matrix")return null;if($.nativeModelMatrix===!0)return`vec4<f32>(${Y6}.flash.rgb, 0.0)`;return $.instanceSlots!==void 0?`${V6}.flash`:null}var ZV=`  if (in.laneCoverage < 1.0 && fract(lume_screenDoor(in.position.xy) + ${pQ("in.laneCoverage")}) > ${cQ("in.laneCoverage")}) { discard; }`,XV="  if (in.laneCoverage < 1.0 && lume_screenDoor(in.position.xy) > in.laneCoverage) { discard; }",bj=2,wj=($)=>(/VaryingsIo\{[^}]*/.exec(h$(j6($),-1))?.[0].match(/@location/g)?.length??0)-v8;function pW(){u$({code:"renderer-material-stage-overrun",key:"material-stage-overrun",message:"A material's varyings pass the GPU's stage interface even packed, so it draws without some of its look: give its shader fewer values that cross from the vertex to the pixel."})}var jV=($)=>[...$,{name:"lume_ink",type:"f32",location:$.length},{name:"lume_inkObject",type:"u32",location:$.length+1}],dW=`fn lume_doorCut(lume_doorWord: f32, lume_doorPixel: vec2<f32>) -> bool {
  var lume_doorHide: f32 = lume_doorWord;
  let lume_doorMag: f32 = abs(lume_doorWord);
  if (lume_doorMag > 1.0) { lume_doorHide = sign(lume_doorWord) * ${c6("lume_doorMag")}; }
  let lume_doorNoise: f32 = lume_screenDoorStill(lume_doorPixel);
  return select(lume_doorNoise, 1.0 - lume_doorNoise, lume_doorHide < 0.0) < abs(lume_doorHide);
}`,qV="  if (in.laneHide != 0.0 && lume_doorCut(in.laneHide, in.position.xy)) { discard; }",f5="  material = lume_materialBlocks[lume_block];",VV="  material = lume_materialBlocks[in.lumeBlock];",FZ="mat4x4<f32>(1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0)",YV=($)=>$.skinned===!0&&$.skinnedPalette!=="rig"&&$.vertexPath===void 0,W4=`(${uJ} * vec4<f32>(localPos, 1.0)).xyz`,lW=`(${uJ} * skinMat)`,WZ=`lume_normalMatrix3(${uJ}) * skinnedNormal`,zV=`select(vec3<f32>(0.0), normalize(${WZ}) * length(in.normal), dot(${WZ}, ${WZ}) > 0.0)`,KV=`struct LumeShadowView {
  viewProj: mat4x4<f32>,
  cameraPosition: vec3<f32>,
  _pad0: f32,
}
@group(1) @binding(0) var<uniform> lume_shadowView: LumeShadowView;`;function GV($,J){if($==="float32"||$==="float32x2"||$==="float32x3"||$==="float32x4")return $;Ra(J,$);}var nW={"2":2,"3":3,"4":4};function R5($){if($==="unorm10-10-10-2"||$==="unorm8x4-bgra")return"vec4f";let J=/^(uint|sint|unorm|snorm|float)(8|16|32)(?:x([234]))?$/.exec($);if(!J)Sa($);let Q="f32";if(J[1]==="uint")Q="u32";if(J[1]==="sint")Q="i32";return Q4(Q,J[3]===void 0?1:nW[J[3]])}function _8($,J){let Q=[];for(let Z of $)for(let X of Z[J])if(!Q.includes(X))Q.push(X);return Q}function z6($){let J=new Set,Q=[];for(let Z of $)for(let X of Z.modules){if(J.has(X.id))continue;J.add(X.id),Q.push(X)}return Q}var iW=[UZ,yj,u0(C7)],oW=new Map;function rW($){return Z$(oW,$,()=>Array.from($.source.matchAll(/\bfn\s+([A-Za-z_][A-Za-z0-9_]*)\s*\(/g),(Q)=>Q[1]))}var aW=($)=>$>=48&&$<=57||$>=65&&$<=90||$>=97&&$<=122||$===95;function sW($,J){let Q=`${J}(`;for(let Z=$.indexOf(Q);Z>=0;Z=$.indexOf(Q,Z+Q.length)){if(Z>0&&aW($.charCodeAt(Z-1)))continue;if(!/\bfn\s+$/.test($.slice(Math.max(0,Z-8),Z)))return!0}return!1}function c8($){let J=[...$],Q=J.join(`

`);for(let Z=!0;Z;){Z=!1;for(let X of iW){let j=rW(X);if(j.some((q)=>Q.includes(`fn ${q}(`))||!j.some((q)=>sW(Q,q)))continue;J.push(X.source.trim()),Q=`${Q}

${X.source}`,Z=!0}}return`${M7(bJ(J))}
`}function K$($,J,Q=null){if(!$)return null;let Z=new Set;for(let X of J)q8(X,Z);return Z.size===0?null:R9($,Z,Q??void 0)}function tW($,J,Q){if(!$)return null;let Z=(j)=>j.meta.kind==="vertexStage",X=new Set;for(let j of J)q8(j.node,X,new Map,Z);return R9($,X,void 0,Q)}function h5($){let J=new Set,Q=[];for(let Z of $){if(!Z.fnDefs)continue;for(let X of Z.fnDefs.split(`

`)){if(!X.trim()||J.has(X))continue;J.add(X),Q.push(X)}}return Q.join(`

`)}var eW={color:["vec3f","vec4f"],emissive:["vec3f"],opacity:["f32"],viewOpacity:["f32"],viewColor:["vec3f","vec4f"],viewDepthPlane:["vec4f"],roughness:["f32"],metalness:["f32"],normal:["vec3f"],depth:["f32"],data:["vec4f"],attribute:["u32"],clearcoat:["f32"],clearcoatRoughness:["f32"],transmission:["f32"],ao:["f32"],lightMap:["vec3f"]};function m8($,J,Q){if(Q.includes(J.type))return J;{if((da=Ta(J,Q,$))!==ca)return da}}function UV($,J,Q){let Z=$.map((X)=>X.node);if(J)Z.push(J);if(Q)Z.push(Q);return Z}function Y5($,J){let Q=J.outputs.map(({name:Z,node:X})=>({name:Z,node:$.rewrite(X)}));return{position:J.position&&$.rewrite(J.position),caster:J.caster&&$.rewrite(J.caster),outputs:Q,fragmentScope:$.rewriteScope(J.fragmentScope,Q.map((Z)=>Z.node)),vertexScope:$.rewriteScope(J.vertexScope,null)}}function PZ($){return{roots:UV($.outputs,$.position,$.caster),scopes:[$.fragmentScope,$.vertexScope]}}var HV="casterPosition",FV="lume_framePosition";function $P($){return{...$,body:x4($.body,{out_position:FV,[`out_${HV}`]:"out_position"})}}function JP($,J,Q,Z){if($.depthNode&&$.viewDepthPlaneNode)throw new Z0("material.depthNode cannot be set on a portal glass \u2014 the picture's depth is the engine's; leave depthNode unset on a material a portal wears",{code:"material-slot-value",slot:"depthNode"});let X=s2($),j=[{name:"color",node:$.colorNode},{name:"depth",node:$.depthNode},{name:"emissive",node:$.emissiveNode},{name:"opacity",node:$.opacityNode},{name:"viewOpacity",node:$.viewOpacityNode},{name:"viewColor",node:$.viewColorNode},{name:"viewDepthPlane",node:$.viewDepthPlaneNode},{name:"roughness",node:$.roughnessNode},{name:"metalness",node:$.metalnessNode},{name:"normal",node:$.normalNode},{name:"clearcoat",node:X.clearcoat},{name:"clearcoatRoughness",node:X.clearcoatRoughness},{name:"transmission",node:$.shadingModel==="physical"?a2($):null},{name:"ao",node:t2($)},{name:"lightMap",node:e2($)},{name:"data",node:$.dataNode},{name:"attribute",node:$.attributeNode?QP($.attributeNode):ZP(Q)}],q=[];for(let Y of j){if(!Y.node)continue;q.push({name:Y.name,node:m8(Y.name,Y.node,eW[Y.name])})}for(let Y of Qj($,Z))q.push({name:Y.name,node:m8(Y.name,Y.node,[r2[Y.name]])});let V=J.materialInputs??[];for(let Y=0;Y<V.length;Y+=1)q.push({name:`lightInput${Y}`,node:V[Y]});return q}function QP($){return Z9($.type)==="f32"?w5(Q0($,"f32")):$}function ZP($){for(let J of $.values())if(J.readName!==void 0)return Vq(J.readName,"u32");return null}var m5=b5.filter(($)=>$!=="uv"),A5={cameraPosition:"lume_worldFromRender(frame.cameraPosition)",time:"frame.worldTime",deltaTime:"frame.deltaTime",screenSize:"frame.viewportSize",materialColor:"material.color",materialOpacity:"material.opacity"},P4={...A5,instanceIndex:"lume_index",deltaTime:"bitcast<f32>(lume_dispatch.z)",invocationLocalIndex:"lume_local",workgroupId:"lume_workgroup",localId:"lume_lid"},X9="lume_surfaceMap";function XP($,J){if(J===void 0)return $;let Q=`(${$} * vec2<f32>(${m(J.scale[0])}, ${m(J.scale[1])}))`,Z=m(Math.cos(J.rotation)),X=m(Math.sin(J.rotation)),j=m(-Math.sin(J.rotation));return`(${J.rotation===0?Q:`vec2<f32>(dot(${Q}, vec2<f32>(${Z}, ${X})), dot(${Q}, vec2<f32>(${j}, ${Z})))`} + vec2<f32>(${m(J.offset[0])}, ${m(J.offset[1])}))`}var jP={...A5,uv:"in.uv",uv1:"in.uv1",uv2:"in.uv2",uv3:"in.uv3",positionWorld:"lume_worldFromRender(in.positionRender)",positionRender:"in.positionRender",positionNear:"lume_positionNear",normalWorld:"normalize(in.normalWorld)",normalLocal:"in.normalLocal",positionLocal:"in.positionLocal",screenUV:"(in.position.xy / frame.viewportSize)",vertexColor:"in.color",frontFacing:"frontFacing"},B4="(frame.cameraPosition - lume_eyeAnchor())",Q6=`lume_positionNear - ${B4}`,WV=BJ(`${B4} - lume_positionNear`),Ej=["  let lume_faceRaw: vec3<f32> = cross(dpdx(lume_positionNear), dpdy(lume_positionNear));","  let lume_faceLen: f32 = length(lume_faceRaw);",`  let lume_faceN: vec3<f32> = select(vec3<f32>(0.0), lume_faceRaw / lume_faceLen * select(-1.0, 1.0, dot(lume_faceRaw, ${WV}) >= 0.0) * select(-1.0, 1.0, frontFacing), lume_faceLen > 0.0);`,"  in.normalWorld = in.normalWorld + in.normalFace * lume_faceN;","  in.normalFace = 0.0;"].join(`
`),qP=/@fragment fn (\w+)\(in: Varyings((?:, (?:@builtin\(front_facing\) )?frontFacing: bool)?)\)((?: -> [^{]+)?) \{\n((?: {2}if \(lume_throughOccluded\(in\.position\)\) \{ discard; \}\n)?)/g,VP=/fn (\w+)\(in: Varyings, ((?:@builtin\(front_facing\) )?frontFacing: bool)\)((?: -> [^{]+)?) \{\n/g,YP=/\n {2}@location\(\d+\) positionRender: vec3<f32>,\n/,zP=new RegExp(`\\n {2}@location\\(\\d+\\) ${x9}: f32,\\n`);function Z6($,J){let Q=YP.test($),Z=zP.test($);if(Q||Z){if($=$.replace(qP,function(X,j,q,V,Y){let K=[...Y===""?[]:Ua(Y),`  var in: Varyings = ${Z?"lume_bandLensIn(lume_in)":"lume_in"};`],z=Z?"in":"lume_in";if(Q)K.push(`  lume_positionNear = ${z}.positionRender;`,`  in.positionRender = ${z}.positionRender + lume_eyeAnchor();`);if(Q&&J&&q!=="")K.push(Ej);return`@fragment fn ${j}(lume_in: Varyings${q})${V} {
${K.join(`
`)}
`}),Q)$=`${J?$.replace(VP,`fn $1(lume_in: Varyings, $2)$3 {
  var in: Varyings = lume_in;
${Ej}
`):$}${/\bfn lume_eyeAnchor\(/.test($)?"":`${n6}
`}var<private> lume_positionNear: vec3<f32>;
`}return h$($,v8)}var KP=/@fragment fn (\w+)\([\s\S]*?\n\}\n/g;function BZ($,J,Q){let Z=`
${J.join(`
`)}
`,X=new Set;return{text:Q?$.replace(KP,(j,q)=>j.includes(Z)&&X.add(q)?j.replace(Z,`
`)+j.replace(`fn ${q}(`,`fn ${q}Cut(`):j):$,named:(j)=>Q==="cut"&&X.has(j)?`${j}Cut`:j}}var GP=Object.keys(i6),u5={uv:{attribute:"uv",wgsl:"vec2<f32>(0.0)",warns:!0},uv1:{attribute:"uv1",wgsl:"vec2<f32>(0.0)",warns:!0},uv2:{attribute:"uv2",wgsl:"vec2<f32>(0.0)",warns:!0},uv3:{attribute:"uv3",wgsl:"vec2<f32>(0.0)",warns:!0},vertexColor:{attribute:"color",wgsl:"vec4<f32>(1.0)",warns:!1}};function r$($,J){let Q=u5[J];if(Q===void 0)Va(J);return $.has(Q.attribute)?`in.${Q.attribute}`:Q.wgsl}function M4($,J){if($.vertexPath!==void 0)return!0;let Q=u5[J]?.attribute??J;return $.vertexLayout?.attributes.some((Z)=>Z.name===Q)===!0}function j9($,J,Q,Z){if(!M4($,Z))return{varying:!1,attribute:!1};return{varying:J.has(Z),attribute:J.has(Z)||Q.has(Z)}}function UP($,J){if($.vertexPath!==void 0)return;for(let Q of J){if(Q===null)continue;for(let Z of Q.inputsUsed){let X=u5[Z];if(X?.warns===!0&&!M4($,Z))Tq(X.attribute)}}}var HP={joints:"skinIndex",weights:"skinWeight"};function PV($){for(let[J,Q]of Object.entries(HP)){let Z=$[`attribute:${J}`];if(Z!==void 0&&$[`attribute:${Q}`]===void 0)$[`attribute:${Q}`]=Z}}function FP($,J,Q,Z){if($){let q={...A5,instanceIndex:"0u",instanceSlot:"instanceIndex",vertexIndex:"vertexIndex",...$.inputs.positionLocal!==void 0?{positionGeometry:$.inputs.positionLocal}:{},...$.inputs};if(q.positionMorphed===void 0&&q.positionGeometry!==void 0)q.positionMorphed=q.positionGeometry;if(q.skinMatrix??=FZ,Q.modelMaterial)Object.assign(q,i6);return q}let X=FZ;if(Q.instancing==="matrix")X="instanceModel";else if(Q.skinned)X=L7;let j={...A5,positionLocal:"in.position",positionGeometry:"lume_positionGeometry",positionMorphed:"lume_positionMorphed",skinMatrix:FZ,positionWorld:"basePositionWorld",positionRender:"basePositionRender",instanceIndex:J.has(T5)?"in."+T5:"0u",instanceSlot:Q.instanceSlots!==void 0?"lume_slot":"instanceIndex",modelMatrix:X,vertexIndex:"vertexIndex",vertexColor:r$(J,"vertexColor"),uv1:r$(J,"uv1"),uv2:r$(J,"uv2"),uv3:r$(J,"uv3"),normalWorld:"normalize(normalWorldV)"};if(J.has("normal"))j.normalLocal="in.normal";j.uv=r$(J,"uv");for(let[q,V]of J)j[`attribute:${V.readName??q}`]=`in.${q}`;if(PV(j),Q.instanceSet){for(let q of Q.instanceSet.fields)j[`attribute:${q.name}`]=p7(q.name);j.instanceIndex="lume_setIndex"}if(Q.skinned){if(j.positionLocal=Z?W4:"localPos",J.has("normal"))j.normalLocal=Z?zV:"skinnedNormal";j.skinMatrix=Z?lW:"skinMat"}if(Q.modelMaterial)Object.assign(j,i6);return j}function _j($,J){let Q,X;{if((da=Wa(J))!==ca)return da;Q=ba[0];X=ba[1]}for(let[j,q]of Object.entries($))if(X.test(q))Q.add(j);return Q}function WP($,J,Q){let Z={};if($){for(let X of $.varyings)Z[X.input]=X.type;return Z}for(let[X,j]of J)Z[`attribute:${j.readName??X}`]=$V(j);if(PV(Z),Q.instanceSet)Xa(Q,Z);return Z}var BV=($)=>$.toLowerCase().includes("normal");function PP($,J){let Q=[];if($.opacityNode)Q.push($.opacityNode);if($.colorNode?.type==="vec4f")Q.push($.colorNode);if(J)T0(J,Q);let Z=new Set;return Q.some((X)=>z8(X,Z,BP))}function BP($){let J=$.meta;if(J.kind==="input"||J.kind==="attribute")return BV(J.name);return J.kind==="wgslExpr"&&J.parts.some((Q)=>Q.includes("in."))}var MP=["color","pbr","roughness"],gj=function($){if($.startsWith("attribute:"))return $.slice(10);return $==="vertexColor"?"color":null};function CP($){if($.meta.kind!=="construct"||$.inputs.length<2)return $;let J=0;for(let Q of $.inputs){if(j5(Q.type))return $;if(J+=qq(Q.type),J>3)return Q}return $}function DP($,J,Q,Z,X,j,q){let V=J.vertexLayout;if(V===void 0||!q)return[];if(J.skinned||J.skinnedModel||J.morph||J.instanceSet!==void 0||J.vertexReader!==void 0||J.vertexPositionProgram===!0||J.modelMaterial||(J.vertexBuffers?.length??1)>1)return[];let Y=MP.filter((z)=>V.attributes.some((G)=>G.name===z));if(Y.length===0)return[];let K=new Set;for(let z of Q?.inputsUsed??[]){let G=gj(z);if(G!==null)K.add(G)}if(j){let z=`${Z.body}
${Z.fnDefs}
${X?.body??""}
${X?.fnDefs??""}`;if(/\b(for|while|loop)\b/.test(z))return[];let G=[];if($.opacityNode)G.push($.opacityNode);if($.colorNode?.type==="vec4f")G.push(CP($.colorNode));if(J.fragmentScope)T0(J.fragmentScope,G);let H=new Set,U=!1;for(let F of G)if(z8(F,H,function(M){let B=M.meta;if(B.kind==="wgslExpr"&&B.parts.some((C)=>C.includes("in.")))U=!0;let D=B.kind==="attribute"?B.name:null;if(B.kind==="input")D=gj(B.name);if(D!==null)K.add(D);return U}),U)return[]}return Y.filter((z)=>!K.has(z))}function IP($,J,Q,Z,X,j){let q=Z.inputsUsed,V=new Set;for(let P of[X,j])if(P)for(let I of P.inputsUsed)V.add(I);let Y=!0,K=Q||q.has("normalWorld"),z=K||V.has("normalWorld"),G=J.vertexLayout?.attributes,H=G?.some((P)=>P.name==="layer")===!0,U=J.instancing==="matrix"&&J.nativeModelMatrix!==!0||H,F=J.vertexPath===void 0&&!z&&U&&G?.some((P)=>P.name==="normal")===!0,M=Q&&$.side!=="back",B=J.vertexPath===void 0&&!V.has("normalWorld")&&!V.has("normalLocal")&&!q.has("normalLocal")&&H,D=Q&&$.side==="double"&&J.vertexPath?.normalFacingKept!==void 0,C=j9(J,q,V,"vertexColor");return{positionWorld:Y,portalClip:J.instanceSlots!==void 0||J.nativeModelMatrix===!0||J.skinned===!0&&J.modelMaterial===!0,normalWorld:K,normalFace:K&&B,flatWeld:B,uv:j9(J,q,V,"uv").varying,uvSets:{uv1:j9(J,q,V,"uv1"),uv2:j9(J,q,V,"uv2"),uv3:j9(J,q,V,"uv3")},color:C.varying,colorAttribute:C.attribute,normalLocal:q.has("normalLocal"),positionLocal:q.has("positionLocal"),positionWorldV:Y,normalWorldV:z,slopeNormal:F,skinnedNormal:J.skinned===!0&&(z||F||q.has("normalLocal")||V.has("normalLocal")),flipBackNormal:M,normalFacingKept:D,laneCoverage:J.vertexPath?.coverage!==void 0||J.bodyOpacity===!0,laneCoverageSeeded:J.bodyOpacity===!0,laneHide:J.doorWord===!0&&J.instancing==="matrix"&&J.instanceSlots!==void 0&&J.nativeModelMatrix!==!0,flash:QV(J)!==null,materialBlocks:J.materialBlocks!==void 0&&J.vertexPath===void 0&&J.instancing==="matrix"&&J.instanceSlots!==void 0&&J.nativeModelMatrix!==!0,bandLens:!1,lines:y4($,J),pathCut:J.vertexPath?.fragmentCut?.lines??[],instanceIndex:J.instancing==="matrix"||V.has("instanceIndex")||V.has("instanceSlot"),vertexIndex:V.has("vertexIndex")||J.morph===!0}}var NP={uv1:{varying:!1,attribute:!1},uv2:{varying:!1,attribute:!1},uv3:{varying:!1,attribute:!1}};function kP($,J,Q){let Z=[];if(Q.uv)Z.push("uv","reads uv");for(let X of m5)if(Q.uvSets[X].attribute)Ya(Z,X);if($){Za(Q,Z);for(let X=0;X<Z.length;X+=2)if(!(Z[X]in $.inputs))_a(Z,X,$);return}if(Q.normalWorldV||Q.normalLocal)Z.push("normal","reads normals");for(let X=0;X<Z.length;X+=2){if(J.has(Z[X]))continue;let j=[...J.keys()].join(", ");throw Error(`lume: material ${Z[X+1]} but the vertex layout has no '${Z[X]}' attribute${j?` (the layout carries: ${j})`:""}`)}}function xP($,J){let Q=[];for(let X of $.varyings)if(J.inputsUsed.has(X.input))Q.push(X);let Z=C4($,J)?[...$.fragmentCut?.varyings??B9,...$.fragmentReads?.varyings??B9]:$.fragmentCut?.varyings??B9;for(let X of Z){let j=!1;for(let q of Q)if(q.name===X.name)j=!0;if(!j)Q.push(X)}return Q}var B9=[];function C4($,J){let Q=$?.fragmentReads;if(Q===void 0)return!1;for(let Z of Object.keys(Q.inputs))if(J.inputsUsed.has(Z))return!0;return!1}function G5($,J=B9,Q=[],Z=!1){let X=[],j=function(q,V,Y){X.push({name:q,type:V,location:X.length,...Y===!0?{flat:!0}:{}})};if($.positionWorld)j("positionRender","vec3f");if($.portalClip)j("portalClip","vec3f");if($.normalWorld)j("normalWorld","vec3f");if($.normalFace)j("normalFace","f32");if($.uv)j("uv","vec2f");for(let q of m5)if($.uvSets[q].varying)j(q,"vec2f");if($.color)j("color","vec4f");if($.normalLocal)j("normalLocal","vec3f");if($.positionLocal)j("positionLocal","vec3f");if($.normalFacingKept)j("normalFacingKept","f32");if($.laneCoverage)j("laneCoverage","f32");if($.laneHide)j("laneHide","f32",!0);if($.flash)j("lumeFlash","vec4f",!0);if($.materialBlocks)j("lumeBlock","u32",!0);for(let q of J)j(q.name,q.type,q.flat);for(let q of Q)j(q.name,q.type,q.flat);if($.bandLens)j(x9,"f32");if(Z)j("motionCurrentClip","vec4f"),j("motionPreviousClip","vec4f");return X}var a$=1,vZ=2,U5=4,s$=8,MV=16,B8=32,yZ=64,CV=128,V9=256,H5=512,SZ=1024,t$=2048,O0=4096,V8=8192,F5=16384,e$=32768,W5=65536,DV=131072,g8=262144,IV=524288,bZ=1048576,Y9=2097152,P5=4194304,NV=8388608,MZ="  let lume_positionMorphed: vec3<f32> = in.position;",fj="  let lume_morph = morph_sum(vertexIndex);",TP=r6(["record","set","binding","normalWorld","baseRender","positionBody","eye"],[[a$|s$,0,"  var in: VertexIn = lume_pullVertexIn(vertexIndex);"],[a$,s$,"  let in: VertexIn = lume_pullVertexIn(vertexIndex);"],[U5|s$,a$,"  var in: VertexIn = lume_decodeVertexIn(lume_vin);"],[U5,a$|s$,"  let in: VertexIn = lume_decodeVertexIn(lume_vin);"],[s$,a$|U5,"  var in: VertexIn = lume_vin;"],[MV,0,"  let lume_positionGeometry: vec3<f32> = in.position;"],[Y9,O0|t$,MZ],[B8,0,"...$set"],[B8,0,`  in.position = ${K2};`],[B8|yZ,0,`  in.normal = ${G2};`],[B8|CV,0,"  in.color = in.color * lume_instTint;"],[V9,B8|H5,"  let lume_slot: u32 = lume_slots[instanceIndex];"],[V9|H5|vZ,B8,"  let lume_slot: u32 = lumeSlotAttr;"],[V9|H5,B8|vZ,"  let lume_slot: u32 = in.lumeSlotAttr;"],[V9,B8,q2],[SZ,0,"  let lume_block: u32 = u32($record.block.x);"],[SZ,0,f5],[t$,0,fj],[t$,0,"  in.position += lume_morph.position;"],[t$|yZ,0,"  in.normal += lume_morph.normal;"],[Y9|t$,O0,MZ],[O0|V8,0,fj],[O0|V8,0,"  let lume_bindPosition: vec3<f32> = in.position + lume_morph.position;"],[O0|V8|F5,0,"  let lume_bindNormal: vec3<f32> = in.normal + lume_morph.normal;"],[Y9|O0|V8,0,"  let lume_positionMorphed: vec3<f32> = lume_bindPosition;"],[Y9|O0,V8,MZ],[O0|e$,0,"  let lume_paletteBase: u32 = u32($record.lift.y)$eye;"],[O0|e$,0,"  let skinMat = lume_rigSkinMatrix(lume_paletteBase, in.joints, in.weights);"],[O0|P5,e$,R7],[O0|P5,e$,_1],[O0,e$|P5,E1],[O0|V8,0,"  var localPos: vec3<f32> = (skinMat * vec4<f32>(lume_bindPosition, 1.0)).xyz;"],[O0,V8,"  var localPos: vec3<f32> = (skinMat * vec4<f32>(in.position, 1.0)).xyz;"],[O0|F5|V8,0,"  let skinnedNormal: vec3<f32> = lume_normalMatrix3(skinMat) * lume_bindNormal;"],[O0|F5,V8,"  let skinnedNormal: vec3<f32> = lume_normalMatrix3(skinMat) * in.normal;"],[0,O0,"  var localPos: vec3<f32> = in.position;"],[W5,0,"  let instanceModel: mat4x4<f32> = $record.model;"],[DV,0,"  $binding normalWorldV: vec3<f32> = $normalWorld;"],[NV,0,"  $binding lume_slopeNormal: vec3<f32> = $normalWorld;"],[g8|IV,0,`  let basePositionRender: vec3<f32> = $baseRender;
  let basePositionWorld: vec3<f32> = lume_worldFromRender(basePositionRender);`],[g8,0,"  let lume_authoredPos: vec3<f32> = localPos;"],[g8,0,"...$positionBody"],[g8|bZ,0,`  localPos = (${L7} * vec4<f32>(out_position, 1.0)).xyz;`],[g8,bZ,"  localPos = out_position;"],[g8,0,"  let lume_seatOk: bool = all(abs(localPos) <= vec3<f32>(1e6));"],[g8,0,"  localPos = select(lume_authoredPos, localPos, lume_seatOk);"],[W5,0,"  $binding worldPos: vec4<f32> = instanceModel * vec4<f32>(localPos, 1.0);"],[0,W5,"  $binding worldPos: vec4<f32> = vec4<f32>(localPos, 1.0);"]]),f8=1,M8=2,kV=4,xV=8,wZ=16,o=32,EZ=64,B5=128,z9=256,_Z=512,$8=1024,J8=2048,gZ=4096,TV=8192,OV=16384,RV=32768,AV=65536,fZ=131072,hZ=262144,LV=524288,q$=1048576,vV=2097152,mZ=4194304,yV=8388608,uZ=16777216,cZ=33554432,K9=67108864,SV=268435456,bV=134217728,wV=536870912,EV=1073741824,D4=($,J)=>`  let lume_bandWord: f32 = ${$};
  let lume_bandTakes: bool = ${J};
  vsOut.position.z = select(vsOut.position.z, lume_bandWord * vsOut.position.w, lume_bandTakes);`,hj=($)=>D4(m$($,0,"material.sortLayer"),"frame.sort2d > 0.5 && lume_clipOk"),_V=($)=>`bitcast<f32>(bitcast<i32>(${$}) - lume_bandStep)`,OP=()=>D4(_V(m$(z4("instanceModel[3].x","lume_rankZ"),0,"material.sortLayer")),"frame.sort2d > 0.5 && lume_clipOk"),L5="(frame.view * vec4<f32>(normalWorldV, 0.0)).z < 0.0",CZ=($)=>`  let lume_rankZ: f32 = ${Aq("instanceModel[3].xyz","positionRenderV",$)};`,DZ="instanceModel[3].y + frame.renderOrigin.y",RP=()=>D4(_V(`select(${m$(z4("instanceModel[3].x","lume_rankZ"),0,"material.sortLayer")}, ${vq(DZ,"material.sortLayer")}, $record.block.z > 0.5 && ${yq(DZ)})`),`frame.sort2d > 0.5 && lume_clipOk && !($record.block.z > 0.5 && ${Sq(DZ,"material.sortLayer")})`),gV=($,J)=>[`  let lume_bandS: f32 = ${P7("vsOut.position",J)};`,`  vsOut.position = select(vsOut.position, vec4<f32>(vsOut.position.xy * lume_bandS, ${$}, 1.0), lume_bandS != 1.0);`,"  vsOut = lume_bandLensOut(vsOut, lume_bandS);"],pZ=($,J)=>`  vsOut.position = select(vec4<f32>(0.0, 0.0, 2.0, 1.0), ${$}, lume_clipOk${J});`,fV=($)=>`  vsOut.motionPreviousClip = select(vsOut.motionCurrentClip, frame.prevViewProj * vec4<f32>(previousWorldPos.xyz, 1.0), ${$});`,hV=function($,J,Q){let Z=`all(abs(${$}) < vec4<f32>(1e9));`,X="all(abs(worldPos.xyz) <= vec3<f32>(1e6)) && ";return[[0,J|Q,`  let lume_clipOk: bool = ${Z}`],[J,Q,`  let lume_clipOk: bool = lume_seatOk && ${Z}`],[Q,J,`  let lume_clipOk: bool = all(abs(worldPos.xyz) <= vec3<f32>(1e6)) && ${Z}`],[Q|J,0,`  let lume_clipOk: bool = lume_seatOk && all(abs(worldPos.xyz) <= vec3<f32>(1e6)) && ${Z}`]]},I4=($,J=null)=>$===null?"  let lume_clipNudged: vec4<f32> = lume_clipRaw;":`  let lume_clipNudged: vec4<f32> = vec4<f32>(lume_clipRaw.xy, ${Zq("lume_clipRaw",Qq($,J))}, lume_clipRaw.w);`,N4="u32(round(abs(in.layer + 0.5) - 0.5))",mV=($,J)=>$?.includes(N4)===!0?{normal:"lume_planeNormal",lines:[`  let lume_planeNormal: vec3<f32> = select(${J}, vec3<f32>(0.0), fract(abs(in.layer)) > 0.125);`]}:{normal:J,lines:[]},AP=function($){let J=mV($,"normalWorldV"),Q=J.lines.length===0?[]:[`  let lume_turnNormal: vec3<f32> = select(normalWorldV, ${J.normal}, ${$} != 0.0);`];return[...J.lines,...Q,`  let lume_layerFaced: f32 = ${Jq($??"0.0",Q.length===0?"normalWorldV":"lume_turnNormal","positionRenderV")};`,...$4("lume_layerSlope","lume_layerFaced",J.normal,"positionRenderV"),I4("lume_layerFaced","lume_layerSlope")]},IZ=`f32(${N4} % ${Y4}u)`,mj=`(${N4} / ${Y4}u)`,LP=function(){let $=(J,Q)=>`  ${Lq(J,"instanceModel",Q)}`;return[[$8|K9|M8,o|J8,$(mj,L5)],[$8|K9,o|J8|M8,$(mj,"false")],[$8|M8,o|J8|K9,$("0u",L5)],[$8,o|J8|M8|K9,$("0u","false")]]},k4=[null,IZ,`${Y6}.lift.x`,`(${Y6}.lift.x + ${IZ})`,`${V6}.lift.x`,`(${V6}.lift.x + ${IZ})`],uV=k4.map(($)=>I4($)),vP=k4.map(AP),yP=k4.map(function($){if(!$)return uV[0];let J=mV($,"lume_slopeNormal");return[...J.lines,...$4("lume_layerSlope",$,J.normal,"positionRenderV"),I4($,"lume_layerSlope")]}),SP=($,J)=>J&&($.normalWorldV?vP:$.slopeNormal&&yP)||uV,cV=($)=>oX(`${$}.lift.z`,"frame.bodyOpacity"),bP=cV(Y6),wP=cV(V6),EP=uQ(`${Y6}.lift.z`),_P=uQ(`${V6}.lift.z`),pV="material.emissive * material.emissiveIntensity",gP=_7("vsOut.position",pV,"$emitterDir")[0],fP=[..._7("vsOut.position",pV,"$emitterDir"),"  vsOut.position = lume_clipOut;"].map(($)=>[vV,o,$]),dV="  let positionRenderV: vec3<f32> = worldPos.xyz;",lV="  let positionWorldV: vec3<f32> = lume_worldFromRender(worldPos.xyz);",nV="  vsOut.motionCurrentClip = frame.viewProj * vec4<f32>(worldPos.xyz, 1.0);",iV="  vsOut.positionRender = positionRenderV - lume_eyeAnchor();",oV="  vsOut.normalWorld = normalWorldV;",rV="  vsOut.normalLocal = $normalLocal;",aV="  vsOut.positionLocal = $positionLocal;",sV="  return lume_outlineMaskAt(in.position);",tV="@group(1) @binding(1) var<uniform> lume_dispatch: vec4<u32>;",hP=()=>r6(["portalWorld","clipRecord","bodyCover","record","casterHeld","varyingBody","varyingOuts","nudged","uvSets","normalLocal","positionLocal","emitterDir","tail","flashWord"],[[f8,0,"  let portalClipWorld: vec4<f32> = $portalWorld;"],[f8,0,"  let portalClipV: vec3<f32> = vec3<f32>(dot($clipRecord.clipPlane, portalClipWorld), dot($clipRecord.clipPlane2, portalClipWorld), select(0.0, 1.0, any($clipRecord.clipPlane != vec4<f32>(0.0))));"],[f8,0,"  if (frame.guest != 0.0) {"],[f8,0,"    worldPos = frame.guestMap * worldPos;"],[f8|M8,0,"    normalWorldV = (frame.guestMap * vec4<f32>(normalWorldV, 0.0)).xyz;"],[f8|SV,0,"    lume_slopeNormal = (frame.guestMap * vec4<f32>(lume_slopeNormal, 0.0)).xyz;"],[f8,0,"  }"],[0,0,dV],[kV,0,lV],[0,0,"  var vsOut: Varyings;"],[xV,0,"  vsOut.lumeBlock = lume_block;"],[wZ|o,0,"  vsOut.portalClip = vec3<f32>(0.0);"],[wZ,o,"  vsOut.portalClip = portalClipV;"],[EZ|o,0,"  vsOut.laneCoverage = 1.0;"],[EZ,o,"  vsOut.laneCoverage = $bodyCover;"],[B5|o,0,"  vsOut.laneHide = 0.0;"],[B5,o|uZ,"  vsOut.laneHide = $record.lift.w;"],[B5|uZ,o,"  vsOut.laneHide = select($record.lift.w, lume_setDoor, lume_setDoor != 0.0);"],[wV,o,"  vsOut.lumeFlash = $flashWord;"],[z9,0,"  {"],[z9,0,"...$varyingBody"],[z9,0,"...$varyingOuts"],[z9,0,"  }"],[0,o,`  let lume_clipRaw: vec4<f32> = ${l0("vec4<f32>(positionRenderV, 1.0)")};`],[o,0,"  let lume_clipRaw: vec4<f32> = lume_shadowView.viewProj * vec4<f32>(positionRenderV, 1.0);"],...hV("lume_clipRaw",yV,o),[o,cZ,pZ("lume_clipRaw","")],[o|cZ,0,pZ("lume_clipRaw"," && !$casterHeld")],[0,o,"...$nudged"],[0,o,`  vsOut.position = select(${k5}, lume_clipNudged, lume_clipOk);`],[_Z,o,`  let lume_bandAnchor: vec3<f32> = ${fJ};`],[_Z,o,hj(l6("lume_bandAnchor","positionRenderV"))],[$8|J8,o,hj(l6("instanceModel[3].xyz","positionRenderV"))],[$8|M8,o|J8|q$,CZ({normal:"normalWorldV",looksAway:L5})],[$8|M8|q$,o|J8,CZ({normal:"normalWorldV",looksAway:`${L5} || in.layer < 0.0`})],[$8,o|J8|M8,CZ(null)],...LP(),[$8,o|J8|mZ,OP()],[$8|mZ,o|J8,RP()],...fP,[gZ,0,nV],[gZ,0,fV("motionShown")],[TV,0,iV],[q$,0,"  let lume_faceV: bool = in.layer < 0.0;"],[q$,0,"  vsOut.normalWorld = select(normalWorldV, vec3<f32>(0.0), lume_faceV);"],[q$,0,"  vsOut.normalFace = select(0.0, length(normalWorldV), lume_faceV);"],[OV,q$,oV],[RV,0,"  vsOut.uv = in.uv;"],[0,0,"...$uvSets"],[AV,0,"  vsOut.color = in.color;"],[fZ|hZ,0,rV],[fZ,hZ,"  vsOut.normalLocal = in.normal;"],[LV,0,aV],[0,0,"...$tail"],...gV("lume_bandWord","lume_bandTakes").map(($)=>[bV,o,$]),[EV,o,`  if (${cQ("$bodyCover")} <= 0.0) { vsOut.position = ${k5}; }`],[0,0,"  return vsOut;"]]),mP=z$(hP),k=($,J)=>$?J:0;function uP($,J,Q){let Z=new Set;for(let X of $.fields){let j=`attribute:${X.name}`;if(J?.inputsUsed.has(j)||Q?.inputsUsed.has(j))Z.add(X.name)}return Z}function M9($,J,Q,Z,X,j="frame",q=!1,V=[]){let Y=$.instancing==="matrix",K=$.skinned===!0,z=K&&$.skinnedPalette==="rig",G=$.nativeModelMatrix===!0,H=$.instanceSlots!==void 0,U=H?V6:Y6,F=j==="shadow",M=J.portalClip&&!F&&!q,B=$.instanceSet,D=G&&$.morph===!0,C=G6($),P=YV($),I=K&&!z&&$.modelMaterial===!0&&$.vertexPath===void 0&&j==="frame"&&!q,x=!1,T=!1,N=!1;for(let l of $.vertexLayout?.attributes??[])if(l.name==="normal")x=!0;else if(l.name==="color")T=!0;else if(l.name==="layer")N=!0;let L=k(C===u8||q,a$)|k(C===u8,vZ)|k(C===g5,U5)|k(B!==void 0||D,s$)|k(Z?.inputsUsed.has("positionGeometry")===!0||X?.inputsUsed.has("positionGeometry")===!0,MV)|k(B!==void 0,B8)|k(x,yZ)|k(T,CV)|k(H,V9)|k($.instanceSlots==="vertex",H5)|k(J.materialBlocks&&!q,SZ)|k(D,t$)|k(K,O0)|k($.morph===!0,V8)|k(J.skinnedNormal,F5)|k(z,e$)|k(Y,W5)|k(J.normalWorldV,DV)|k(J.slopeNormal&&!F&&!q,NV)|k(Z!==null,g8)|k(Z?.inputsUsed.has("positionWorld")===!0||Z?.inputsUsed.has("positionRender")===!0,IV)|k(P,bZ)|k(Z?.inputsUsed.has("positionMorphed")===!0||X?.inputsUsed.has("positionMorphed")===!0,Y9)|k(I,P5),S=B===void 0?null:[...V2(B,"lume_slots",q?null:c7),...Y2(B,uP(B,Z,X)),...z2(B)],c=K?"skinnedNormal":"in.normal",f=K?z:Y,r="in.position";if(K&&z)r=`(${U}.model * vec4<f32>(localPos, 1.0)).xyz`;else if(K)r="localPos";else if(Y)r=`(${U}.model * vec4<f32>(in.position, 1.0)).xyz`;let d=[];a6(TP,L,[U,S,M?"var":"let",f?`lume_normalMatrix3(instanceModel) * ${c}`:c,r,Z?.body,j==="frame"&&!q?` + select(0u, u32(lume_rigPalettes[u32(${U}.lift.y) - 1u][0].x), frame.eyeParts < 0.5)`:""],d);let G0=$.motion===!0&&!F;if(G0&&!q){let l=d.length;d.push("  var previousWorldPos: vec4<f32>;","  {");for(let g=0;g<l;g+=1){let n=d[g];if(n===f5||n===R7||n.startsWith("  let lume_block: u32"))continue;d.push(GY(n.replace("frame.eyeParts","1.0").replaceAll("instances[","previousInstances[").replaceAll("jointMatrices[","previousJointMatrices[").replaceAll("lume_headSkin(","lume_previousHeadSkin(").replaceAll("lume_rigSkinMatrix(","lume_previousRigSkinMatrix(").replaceAll("morph_sum(","previous_morph_sum(")))}d.push("    previousWorldPos = worldPos;","  }");let b="true";if(Y)b=`${U.replaceAll("instances[","previousInstances[")}.${G?"model[3].w":"lift.w"} > 0.5`;else if(K)b=`${A7("previousJointMatrices",0)}.w > 0.5`;d.push(`  let motionShown = ${b};`)}if(q)return d.push("  return worldPos.xyz;"),d;let E0=X?Q.map((l)=>`    vsOut.${l.name} = out_${l.name};`):null,b0=[];for(let l of m5)if(J.uvSets[l].varying)b0.push(`  vsOut.${l} = in.${l};`);let z0=Y&&!G,U0="frame.bodyOpacity",w0=N?1:0;if(z0)U0=H?wP:bP,w0+=H?4:2;let A=$.sortBand2d===!0,v=$.sortBandRelief===!0,E=K&&!z,w=null;if(Y)w="instanceModel[3].xyz";else if(K&&z)w=`${U}.model[3].xyz`;else if(K)w=fJ;if(w!==null&&M)w=`select(${w}, (frame.guestMap * vec4<f32>(${w}, 1.0)).xyz, frame.guest != 0.0)`;let h=J.normalWorldV?"normalWorldV":w&&`positionRenderV - ${w}`;if(J.lines||G4($.lighting))h=null;let J0=k(M,f8)|k(J.normalWorldV,M8)|k(J.slopeNormal&&!F,SV)|k(J.positionWorldV,kV)|k(J.materialBlocks,xV)|k(J.portalClip,wZ)|k(F,o)|k($.bodyOpacity===!0&&J.laneCoverage,EZ)|k($.bodyOpacity===!0&&!J.laneCoverage,EV)|k(J.laneHide,B5)|k(J.flash,wV)|k(X!==null,z9)|k(A&&v&&!Y&&K,_Z)|k(A&&Y,$8)|k(A&&Y&&H&&!v,mZ)|k(v,J8)|k(G0,gZ)|k(J.positionWorld,TV)|k(J.normalWorld,OV)|k(J.normalFace,q$)|k(J.uv,RV)|k(J.color,AV)|k(J.normalLocal,fZ)|k(K,hZ)|k(J.positionLocal,LV)|k(h!==null,vV)|k(Z!==null,yV)|k(B!==void 0,uZ)|k(z0,cZ)|k(N,K9)|k(J.bandLens&&!F&&A&&(Y||v&&K),bV);return a6(mP(),J0,[G||E?"worldPos":"vec4<f32>(worldPos.xyz + frame.renderOrigin, 1.0)",E?"modelMaterial":U,U0,U,H?_P:EP,X?.body,E0,SP(J,Z===null)[w0],b0,P?zV:"skinnedNormal",P?W4:"localPos",h,V,QV($)],d),d}var eV=1,$Y=2,G9=4,M5=8,JY=16,QY=32,ZY=64,XY=128,jY=256,qY=512,VY=1024,YY=2048,U9=4096,zY=8192,KY=16384,cP=[`  let clipPos: vec4<f32> = ${l0("vec4<f32>(positionRenderV, 1.0)")};`],pP=["  let clipPos: vec4<f32> = lume_shadowView.viewProj * vec4<f32>(positionRenderV, 1.0);"],dP=["  let previousWorldPos: vec4<f32> = worldPos;"],lP=r6(["normalWorld","varyingBody","varyingOuts","clip","previous","uv","uvSets","color","normalLocal","positionLocal","facing","coverage","pathOuts","lens"],[[0,0,dV],[eV,0,lV],[$Y,0,"  let normalWorldV: vec3<f32> = $normalWorld;"],[0,0,"  var vsOut: Varyings;"],[G9,0,"  {"],[G9,0,"...$varyingBody"],[G9,0,"...$varyingOuts"],[G9,0,"  }"],[0,0,"...$clip"],...hV("clipPos",zY,U9),[0,U9,`  vsOut.position = select(${k5}, clipPos, lume_clipOk);`],[U9,0,pZ("clipPos","")],[M5,0,"...$previous"],[M5,0,nV],[M5,0,fV("previousWorldPos.w != 0.0")],[JY,0,iV],[QY,0,oV],[ZY,0,"  vsOut.uv = $uv;"],[0,0,"...$uvSets"],[XY,0,"  vsOut.color = $color;"],[jY,0,rV],[qY,0,aV],[VY,0,"  vsOut.normalFacingKept = $facing;"],[YY,0,"  vsOut.laneCoverage = $coverage;"],[0,0,"...$pathOuts"],[KY,U9,"...$lens"],[0,0,"  return vsOut;"]]);function nP($){if($.vertexPath!==void 0)return $.vertexPath.band!==void 0;return $.sortBand2d===!0&&($.instancing==="matrix"||$.sortBandRelief===!0&&$.skinned===!0)}function j$($,J){let Q=$.inputs[J];if(Q===void 0)$a($,J);return Q}function GY($){return $.replaceAll("frame.worldTime","frame.prevWorldTime").replaceAll("frame.time","frame.prevTime").replaceAll("lighting_windTravel()","frame.prevWindTravel").replaceAll("frame.windTravel","frame.prevWindTravel")}function x4($,J){let Q=$;for(let[Z,X]of Object.entries(J))Q=Q.replace(new RegExp(`\\b${Z}\\b`,"g"),X);return Q}function iP($,J,Q=!1){let Z,X,j,q;{ab($,Q);Z=ba[0];X=ba[1];j=ba[2];q=ba[3]}for(let V of X){if(j!==void 0&&Z!==void 0&&V===j.marker){bb(J,Q,q,Z,j);continue}if(V!==Z?.marker){q.push(V);continue}cb(J,q,Z);}return q}function uj($,J,Q,Z,X,j,q,V,Y=!1){let K=iP($,Z,Y),z=J.normalWorldV?j$($,"normalWorld"):null,G=X?Q.map((T)=>`    vsOut.${T.name} = out_${T.name};`):null,H=J.uv?j$($,"uv"):null,U=[];for(let T of m5)if(J.uvSets[T].varying)U.push(`  vsOut.${T} = ${j$($,T)};`);let F=J.color?j$($,"vertexColor"):null,M=J.normalLocal?j$($,"normalLocal"):null,B=J.positionLocal?j$($,"positionLocal"):null,D=$.coverage??"1.0",C=[];for(let T of j)C.push(`  vsOut.${T.name} = ${j$($,T.input)};`);let P=k(J.positionWorldV,eV)|k(J.normalWorldV,$Y)|k(X!==null,G9)|k(V,M5)|k(J.positionWorld,JY)|k(J.normalWorld,QY)|k(J.uv,ZY)|k(J.color,XY)|k(J.normalLocal,jY)|k(J.positionLocal,qY)|k(J.normalFacingKept,VY)|k(J.laneCoverage,YY)|k(Y,U9)|k(Z!==null&&$.localPositionSlot!==void 0,zY)|k(J.bandLens&&!Y&&$.band!==void 0,KY),I=Y?pP:$.clipWgsl??cP,x=$.band===void 0?null:gV($.band.word,`(${$.band.takes}) && lume_clipOk`);return a6(lP,P,[z,X?.body,G,I,$.previousPositionWgsl??dP,H,U,F,M,B,$.normalFacingKept??"0.0",q?"("+D+") * frame.bodyOpacity":D,C,x],K),K}var UY=1,HY=2,FY=4,dZ=8,lZ=16,WY=32,C5=64,h8=128,nZ=256,iZ=512,V$=1024,Y$=2048,oZ=4096,PY=8192,V0=16384,Y8=32768,K6=65536,c5=131072,BY=262144,C9=524288,D5=1048576,MY=2097152,CY=4194304,DY=8388608,$6=16777216,I5=33554432,IY=67108864,NY=134217728,H9=268435456,J6=536870912,kY=1073741824,v5=-2147483648,oP=V0|K6|c5;function rZ($){return $.instanceSlots!==void 0&&($.instanceSet===void 0||$.instanceSet.fields.length===0)&&$.vertexPath===void 0&&$.nativeModelMatrix!==!0&&$.skinned!==!0}var xY="  if (alpha < material.alphaTest) { discard; }",rP=`  if (alpha < material.alphaTest && !${GZ}) { discard; }`,TY="  if (lume_cut.x + 0.5 * (abs(lume_cut.y) + abs(lume_cut.z)) < 0.0) { discard; }",aP=["  let lume_cut = vec4<f32>(alpha - material.alphaTest, dpdxFine(alpha), dpdyFine(alpha), 0.0);",TY,"  alpha = smoothstep(material.alphaTest, material.alphaTest + max(abs(lume_cut.y) + abs(lume_cut.z), 1e-5), alpha);"],sP=`  if (lume_cut.x + 0.5 * (abs(lume_cut.y) + abs(lume_cut.z)) < 0.0 && !${GZ}) { discard; }`,tP="  let lume_cut = vec4<f32>(alpha, dpdxFine(alpha), dpdyFine(alpha), 1.0);",eP=new Map([[xY,rP],[TY,sP]]),$B=V0|K6|c5,y5="lume_coverageMask(in.position.xy, lume_cut)",OY=`struct LumeCoveredDepthOut {
  @location(0) color: vec4<f32>,
  @builtin(sample_mask) mask: u32,
}`,JB=`struct PictureDepthCoveredOut {
  @location(0) color: vec4<f32>,
  @builtin(frag_depth) depth: f32,
  @builtin(sample_mask) mask: u32,
}`;function QB($,J){if($===null)return J?db():"vec4<f32>(0.0)";return eb(J,$);}function RY($,J){if(J)return fb($);return $?"PictureDepthOut":"@location(0) vec4<f32>"}function ZB($,J){return $.alphaToCoverage===!0&&J.pass.samples>1&&J4()}function cj($,J,Q){let Z=J?gb($):$;if(Q)return hb(Z);return`  return ${Z};`}var AY=T2("in.positionRender",{distances:"in.portalClip"});function XB($){return V1({count:$.planes.length,intersection:$.intersection},(J)=>`material.${O5}[${J}]`,"(in.positionRender + frame.renderOrigin)")}var jB=`shade_applyFog(litColor + emissiveColor, fogViewZ, ${Q6})`,qB=r6(["pathCut","lets","body","albedo","alphaBinding","alpha","emissive","nBinding","normal","roughness","metalness","litColor","finalBinding","blendColor","viewOpacity","colorReturn","depth","surfaceReturn","outAlpha","cellRead","coverOpacity","surfacePoint","foggedColor","waterOver","coverWater","alphaCut","depthReturn","coverCut","materialClip","premultiply","specular","shadedAlbedo"],[[V0|NY,Y8,`  ${a1}`],[UY,0,VV],[v5,0,`  if (${lq}) {`],[HY,C9,AY],[dZ|lZ,0,ZV],[dZ,lZ,XV],[WY,C9,qV],[v5,0,"  }"],[0,0,"...$materialClip"],[0,0,"...$pathCut"],[0,0,"...$lets"],[0,0,"...$body"],[$6,0,"  let albedo: vec3<f32> = $shadedAlbedo;"],[0,0,"  $alphaBinding alpha: f32 = $alpha;"],[FY,0,"  alpha = alpha * out_color.a;"],[C5,0,"...$alphaCut"],[0,C5,"...$coverCut"],[C9|kY,C5,"  if (alpha <= 0.0) { discard; }"],[V0|IY,Y8,`  ${s1}`],[Y8,0,tQ],[Y8,0,$7("lume_positionNear",B4)],[$6,H9,"  let emissiveColor: vec3<f32> = $emissive;"],[$6|H9,0,"  let lume_emissive: vec3<f32> = $emissive;"],...J2("in.positionRender","lume_emissive").map(($)=>[$6|H9,0,$]),[$6|H9,0,"  let emissiveColor: vec3<f32> = lume_emissive * lume_emitterScale;"],[I5,0,"  $nBinding N: vec3<f32> = $normal;"],[I5|nZ|iZ,0,"  N = select(-N, N, frontFacing || in.normalFacingKept > 0.5);"],[I5|nZ,iZ,"  N = select(-N, N, frontFacing);"],[V0|h8,0,`  let V: vec3<f32> = ${WV};`],[V0|h8,0,"  let P: vec3<f32> = in.positionRender;"],[V0|h8,0,"  let roughness: f32 = $roughness;"],[V0|h8,0,"  let metalness: f32 = $metalness;"],[V0|h8,0,"...$cellRead"],[V0|h8,0,"...$specular"],[V0,0,"  let litColor: vec3<f32> = $litColor;"],[V0,0,"  let fogViewZ: f32 = -(frame.view * vec4<f32>(in.positionRender, 1.0)).z;"],[V0|V$,0,"  $finalBinding finalColor: vec4<f32> = vec4<f32>($foggedColor, $outAlpha);"],[V0|Y$,V$,`  let viewKeep = 1.0 - shade_viewFogFactor(fogViewZ, ${Q6});`],[V0|Y$,V$,"  $finalBinding finalColor: vec4<f32> = vec4<f32>($blendColor, $outAlpha * viewKeep);"],[V0,V$|Y$,`  $finalBinding finalColor: vec4<f32> = vec4<f32>(shade_applyViewFog(litColor + emissiveColor, fogViewZ, ${Q6}), $outAlpha);`],[V0|oZ,0,"...$viewOpacity"],[V0|Y$,Y8,"...$waterOver"],[V0|Y$,Y8,"...$premultiply"],[V0,Y8,"...$colorReturn"],[Y8,0,eQ("vec4<f32>(finalColor.rgb, finalColor.a * eyes.strength * eyesEdge)")],[c5,0,"  return $depthReturn;"],[BY,0,`  ${w7}`],[J6|V$,0,"  var lume_cover: f32 = $outAlpha;"],[J6,V$,`  var lume_cover: f32 = $outAlpha * (1.0 - shade_viewFogFactor(-(frame.view * vec4<f32>(in.positionRender, 1.0)).z, ${Q6}));`],[J6|oZ,0,"...$coverOpacity"],[J6|Y$,0,"...$coverWater"],[J6,0,`  ${o1("lume_cover")}`],[D5,0,"  let lume_inkViewZ: f32 = -(frame.view * vec4<f32>(in.positionRender, 1.0)).z;"],[D5,0,`  let lume_inkFinal: vec3<f32> = ink_color($albedo, lume_inkRecord.xyz, lume_inkViewZ, ${Q6});`],[D5,0,"  return InkFieldOut(vec4<f32>(lume_inkFinal, 1.0), ink_word(in.lume_inkObject, in.lume_ink));"],[MY,0,sV],[CY,0,O7],[DY,0,sQ],[K6,0,"  lume_surfacePoint = $surfacePoint;"],[K6,0,"...$surfaceReturn"]]),aZ=["  let lume_waterT: vec3<f32> = shade_waterOver(in.positionRender, frame.cameraPosition);","  let lume_waterLum: f32 = dot(lume_waterT, vec3<f32>(0.2126, 0.7152, 0.0722));","  finalColor = vec4<f32>(select(finalColor.rgb * (lume_waterT / max(lume_waterLum, 1e-4)), finalColor.rgb, all(lume_waterT == vec3<f32>(1.0))), finalColor.a * lume_waterLum);"],VB="  finalColor = vec4<f32>(finalColor.rgb * finalColor.a, finalColor.a);",YB="  lume_cover = lume_cover * dot(shade_waterOver(in.positionRender, frame.cameraPosition), vec3<f32>(0.2126, 0.7152, 0.0722));";function zB($,J,Q){let Z=`lume_seeThroughLight(in.position, albedo) + lume_seeThroughGlow(emissiveColor, ${J}, ${Q})`;if(!$)return[`  return vec4<f32>(${Z}, alpha);`];return[`  let lume_seeThroughRgb: vec3<f32> = ${Z};`,aZ[0],aZ[1],"  return vec4<f32>(select(lume_seeThroughRgb * (lume_waterT / max(lume_waterLum, 1e-4)), lume_seeThroughRgb, all(lume_waterT == vec3<f32>(1.0))), alpha * lume_waterLum);"]}var KB=1,GB=2,UB=16,HB=17,FB=25,WB=26,PB=27,BB=28,MB=29,CB=30,DB=31;function NZ($,J,Q,Z){let X=(J&(V0|K6))!==0,j=((J&oP)!==0?$.flags:$.flags&~v5)|J|(X?$6:0)|(X&&($.flags&h8)!==0?I5:0);$.slots[KB]=Q,$.slots[GB]=Z===""?null:Z;let q=$.coverage&&(J&$B)!==0&&(J&Y8)===0;$.slots[FB]=q?aP:xY,$.slots[PB]=q?tP:null;let V=$.slots[UB];$.slots[WB]=QB(($.flags&PY)!==0&&typeof V==="string"?V:null,q),$.slots[BB]=$.clip!==null&&((J&C9)===0||$.clip.shadows)?$.clip.line:null;let Y=[];return a6(qB,j,$.slots,Y),Y}var LY=($)=>`normalize(vec3<f32>(dot(frame.view[0].xyz, ${$}), dot(frame.view[1].xyz, ${$}), dot(frame.view[2].xyz, ${$})))`,IB=LY("out_normal"),pj=($,J)=>J.flipBackNormal?`select(-${$}, ${$}, frontFacing${J.normalFacingKept?" || in.normalFacingKept > 0.5":""})`:$;function NB($,J,Q){let Z=$.normalNode;if(!Z)return"normalize(in.normalWorld)";let X=J?.fragmentReads?.normal;if(X!==void 0&&Z.meta.kind==="input"&&Z.meta.name===X.input&&C4(J,Q))return X.world;return IB}function kB($){let J=[];for(let Q of $){let Z=Q.node.meta;J.push(`  let ${Q.name}: ${R0(Q.type)} = ${Z.kind==="input"&&Z.name==="normalWorld"?`normalize(in.${Q.name})`:`in.${Q.name}`};`)}return J}var xB=`${OJ}
${TJ}
lume_inkRecord lume_ink lume_inkObject lume_inkViewZ lume_inkFinal`;function T4($,J,Q){let Z=[$,R4,A8];if(Q)Z.push(CJ);if(J.laneCoverage||J.laneHide)Z.push(_J);if(J.laneHide)Z.push(dW);return Z}function TB($,J,Q,Z){let{material:X,opts:j,needs:q,varyings:V,modules:Y,fnDefs:K}=$,z=T4(`// lume material ink field (assembled by assembleMaterialShader) - ${X.shadingModel}`,q);if(z.push($.lightingVocab?j.lighting.wgslDefs:EJ),$.lightingQueries)z.push(L9().trim());z.push(...$.materialGroup,...$.drawGroup),z.push(`@group(3) @binding(${q1}) var<uniform> lume_inkRecord: vec4<f32>;`);for(let G of Y)z.push(G.source.trim());if(K)z.push(K);if(z.push(OJ,TJ),$.vertexInStruct)z.push($.vertexInStruct);return z.push(j6(jV(V))),z.push(v9("vsInkField",$.vsParams,J)),z.push(`${Z}${y0("fsInkField"," -> InkFieldOut",Q)}`),c8(z)}function vY($,J){return J?ib($):`${$}
@group(2) @binding(0) var<uniform> material: Material;`}function O4($,J,Q=$.instanceSlots!==void 0){let Z=$.vertexPath,X=$.skinned===!0&&$.skinnedPalette==="rig",j=[];if(Z)j.push(Z.declarationsWgsl.trim());else{if($.instancing==="matrix")j.push($.nativeModelMatrix===!0?`${vJ}
@group(3) @binding(0) var<storage, read> instances: array<ModelInstance>;`:`${w2(Q)}
@group(3) @binding(0) var<storage, read> instances: array<DrawInstance>;`);if($.instanceSlots==="storage")j.push(cW);if($.instanceSet)j.push(j2(3,$.instanceSet))}if(G6($)===u8&&!$.vertexReader)j.push($.vertexLayout?.storageEncoding==="indexed-attributes"?mq:uW);if($.skinned)j.push(X?a7(3):"@group(3) @binding(0) var<storage, read> jointMatrices: array<mat4x4<f32>>;");if($.morph){if(j.push(NJ(3)),$.motion)j.push(J1(3,11))}if($.motion&&!Z){if($.instancing==="matrix")j.push(`@group(3) @binding(10) var<storage, read> previousInstances: array<${$.nativeModelMatrix?"ModelInstance":"DrawInstance"}>;`);if($.skinned)j.push(X?a7(3,11,"previousRig"):"@group(3) @binding(10) var<storage, read> previousJointMatrices: array<mat4x4<f32>>;")}if($.modelMaterial)j.push(f1);if($.modelMaterial&&$.skinned&&!X&&!Z)j.push(g1($.motion===!0));if($.skinnedModel)j.push(h1);return j}var R4=e0.trim(),OB=`${R4}
${A8}
${n6}`,yY=`${_5.trim()}
${A8}
${n6}`,RB=`struct Material {
${eq.map(($)=>`  ${$.name}: ${R0($.type)},`).join(`
`)}
}
@group(2) @binding(0) var<uniform> material: Material;`;function sZ($,J,Q,Z,X,j,q){let V=[],Y=!1,K=!1;for(let G of q){if(G===f5)continue;if($.materialBlocks&&G===gP){let H=/u32\((.+)\.block\.x\)/.exec(q.find((U)=>U.startsWith("  let lume_block: u32"))??"")?.[1];if(H===void 0)throw Error("lume: a material-blocks vertex reads its glow without its block");V.push(`  let lume_glowWord: vec4<f32> = lume_materialBlockWords[u32(${H}.block.y) + 1u];`,"  let lume_glow: vec3<f32> = lume_glowWord.xyz * lume_glowWord.w;"),K=!0;continue}if(V.push(G),G.includes("material."))Y=!0}let z=[];if(j==="vs")z.push(OB);else if($.positionWorldV)z.push(yY);if(j==="vsShadow")z.push(KV);if(Y)z.push(RB);if(z.push(...J),K)z.push(`@group(3) @binding(${i7}) var<storage, read> lume_materialBlockWords: array<vec4<f32>>;`);if(Q)z.push(Q);return z.push(Z),z.push(v9(j,X,V)),h$(c8(z),v8)}function A4($){return{positionWorld:!1,portalClip:!1,normalWorld:!1,normalFace:!1,flatWeld:!1,uv:!1,uvSets:NP,color:!1,colorAttribute:!1,normalLocal:!1,positionLocal:!1,positionWorldV:!1,normalWorldV:!1,slopeNormal:!1,skinnedNormal:!1,flipBackNormal:!1,normalFacingKept:!1,laneCoverage:!1,laneCoverageSeeded:!1,laneHide:!1,flash:!1,materialBlocks:!1,bandLens:!1,instanceIndex:$.instancing==="matrix",vertexIndex:$.morph===!0,pathCut:[]}}function AB($,J,Q){let Z=Q?.inputsUsed,X=Z?.has("normalWorld")===!0;return{...A4($),normalWorldV:X,skinnedNormal:$.skinned===!0&&(X||Z?.has("normalLocal")===!0),materialBlocks:J.materialBlocks,instanceIndex:J.instanceIndex,vertexIndex:J.vertexIndex}}function LB($){let J=$.vertexLayout;if(J===void 0||$.skinned||$.skinnedModel||$.morph||$.instanceSet!==void 0||$.vertexReader!==void 0)return!1;if(G6($)===u8&&J.storageEncoding!=="indexed-attributes")return!1;let Z=J.attributes.find((X)=>X.name==="position");return Z?.offset===0&&Z.format==="float32x3"&&Z.encoding===void 0}function SY($,J,Q,Z){let X=$.vertexLayout;if(X===void 0)throw Error(`lume assemble: the ${Q==="mask"?"highlight mask's":"opaque caster"} vertex needs the material's vertexLayout`);let j=[];for(let Y of X.attributes)if(Y.name==="position"||$.skinned===!0&&(Y.name==="joints"||Y.name==="weights"))j.push(Y);let q={...$,skinnedModel:!1,vertexLayout:{...X,attributes:j}};if(Q==="mask")q.motion=!1;let V=M9(q,J,[],null,null,Q);return sZ(J,O4(q,J),F4(q),Z,JV(q,J),Q==="mask"?"vs":"vsShadow",V)}function dj($,J,Q=null){let{shadow:Z}=$;if(!Z)throw Error("lume: the caster vertex module needs a shadow arm");let X=[yY,KV];if(Q&&$.needs.laneCoverage)X.push(_J);if(X.push(...$.materialGroup),Q&&$.sceneDepth)X.push(H4(U4($.textures.length)));X.push(...$.drawGroup);let j=Q?[...J,Q]:J;if(Q)X.push(...Cq(z6(j)));else for(let Y of z6(j))X.push(Y.source.trim());let q=h5(j);if(q)X.push(q);if($.vertexInStruct)X.push($.vertexInStruct);if(X.push(Z.varyingsStruct??$.varyingsStruct),X.push(v9("vsShadow",$.vsParams,Z.vsLines)),Q)X.push(...fY(Z),...$.surfaceDefs);let V=c8(X);return Q?Z6(V,$.needs.normalFace):h$(V,v8)}function bY($,J,Q){let Z=new Set(["position",T5]);if($.skinned)Z.add("joints"),Z.add("weights");if(Q||J.has("normalLocal"))Z.add("normal");for(let X of J)if(X.startsWith("attribute:"))Z.add(X.slice(10));else if(X==="vertexColor")Z.add("color");else if(X==="uv"||X==="uv1"||X==="uv2"||X==="uv3")Z.add(X);if($.vertexLayout?.attributes.some((X)=>X.name==="layer"))Z.add("layer");return Z}function vB($,J){if(!$.opts.vertexPositionProgram||$.opts.vertexPath||!$.opts.vertexLayout)return;let Q=J?.inputsUsed??new Set,X=$.opts.skinned===!0||$.opts.nativeModelMatrix===!0||$.opts.modelMaterial===!0||($.opts.vertexBuffers?.length??1)>1?{...$.needs,normalWorldV:Q.has("normalWorld"),slopeNormal:!1,skinnedNormal:$.opts.skinned===!0&&(Q.has("normalWorld")||Q.has("normalLocal"))}:{...$.needs,slopeNormal:!1},j=bY($.opts,Q,X.normalWorldV||X.skinnedNormal),q=e7({...$.opts,instanceSlots:$.opts.instanceSet?"storage":void 0},j),V=$.opts.attributeSource!=="storage"?{...q.layout,storageEncoding:void 0}:q.layout,Y={...$.opts,vertexReader:void 0,vertexLayout:V,attributeSource:q.native?"vertex":"storage",instanceSlots:$.opts.instanceSet?"storage":void 0},K=J?[J]:[],z=z6(K),G=[R4];if(E8(z))G.push(Y.lighting.wgslDefs);if(I9(z))G.push(L9().trim());G.push(vY($.materialStruct,!1),...$.textureDecls,...$.storageDecls),G.push(...O4(Y,X,$.opts.instanceSlots!==void 0));for(let M of z)G.push(M.source.trim());let H=h5(K);if(H)G.push(H);let U=q.native??F4(Y);if(U)G.push(U);let F=Y.instanceSet?[]:["  let lume_slot = instanceIndex;"];return F.push(...M9(Y,X,[],J,null,"frame",!0)),G.push(`fn lume_materialRenderPosition(vertexIndex: u32, instanceIndex: u32) -> vec3<f32> {
${F.join(`
`)}
}`),{program:c8(G),inputs:q.inputs}}function j6($,J){let Q=[`  @builtin(position)${J?" @invariant":""} position: vec4<f32>,`];for(let X of $)Q.push(`  @location(${X.location})${lj(X)?"":" @interpolate(flat)"} ${X.name}: ${R0(X.type)},`);let Z=`struct Varyings {
${Q.join(`
`)}
}`;if(!$.some((X)=>X.name===x9))return Z;return`${Z}
${B7("Varyings",$.filter((X)=>lj(X)&&X.name!==x9).map((X)=>X.name))}`}var lj=($)=>Z9($.type)==="f32"&&$.flat!==!0;function v9($,J,Q){return`@vertex fn ${$}(${J}) -> Varyings {
${Q.join(`
`)}
}`}function y0($,J,Q){return`@fragment fn ${$}(in: Varyings, @builtin(front_facing) frontFacing: bool)${J} {
${Q.join(`
`)}
}`}function L4($,J){let{material:Q,opts:Z,lit:X,needs:j,textures:q,sceneDepth:V,throughMarks:Y,modules:K,shadingDefs:z,fnDefs:G,fsEyesOwnerLines:H,fsEyesThroughLines:U}=$,F=T4(`// lume material shader (assembled by assembleMaterialShader) - ${Q.shadingModel}`,j,Z.motion);if(rZ(Z))F.push(nq);if((X||$.lightingVocab)&&J==="lit")F.push(Z.lighting.wgslDefs);else F.push(EJ);if($.lightingQueries&&!$.tapsFromFoldDefs)F.push(L9().trim());if(F.push(...$.materialGroup),V)F.push(H4(U4(q.length)));if(Y)F.push(r1);if(F.push(...$.drawGroup),H||U)F.push(aQ(3,U!==null));for(let M of K)F.push(((J==="lit"?$.litSources?.get(M):void 0)??M.source).trim());if(J==="surface")F.push(k7(Z.motion===!0),N7);else if(J==="lit"&&z)F.push(z);if(G)F.push(G);return F}var yB=/\b(?:VertexIn|lume_pullVertexIn|lume_attributeOffset)\b/;function v4($,{vertexInStruct:J,varyingsStruct:Q},Z){if(J){let X=Z;for(let j=0;!X&&j<$.length;j+=1)X=yB.test($[j]);if(X)$.splice($.indexOf(Q),0,J)}return c8($)}function wY($,J,Q){if(J.fsThroughLines)$.push(y0(pJ,Q?" -> @builtin(frag_depth) f32":"",J.fsThroughLines));if(J.fsThroughCoverLines)$.push(y0(dJ," -> @location(0) vec4<f32>",J.fsThroughCoverLines))}function EY($,J){if(J.fsApertureMaskLines)$.push(`${T7}
${y0("fsApertureMask"," -> ApertureMaskOut",J.fsApertureMaskLines)}`);if(J.fsEyesOwnerLines)$.push(y0("fsEyesOwner"," -> @location(0) vec4<u32>",J.fsEyesOwnerLines))}function SB($,J){let{material:Q,opts:Z,vsLines:X,fsLines:j,fsDepthLines:q,fsMaterialDataLines:V,throughMarks:Y,fsEyesThroughLines:K,shadow:z,surfaceDefs:G}=$,H=$.writesDepth,U=L4($,"lit");if($.waterOver)U.push(wJ);if(U.push($.varyingsStruct),J)U.push(v9("vs",$.vsParams,X));if(H)U.push(`
struct PictureDepthOut {
  @location(0) color: vec4<f32>,
  @builtin(frag_depth) depth: f32,
}${Q.viewDepthPlaneNode?`
${J7}`:""}`);if($.coverage)U.push(K4,H?JB:OY);if(U.push(`struct FragmentOut {
  @location(0) color: vec4<f32>,${Z.motion?`
  @location(1) motion: vec4<f32>,`:""}${H?`
  @builtin(frag_depth) depth: f32,`:""}${$.coverage?`
  @builtin(sample_mask) mask: u32,`:""}
}`),U.push(y0("fs"," -> FragmentOut",j)),U.push(y0("fsDepth",` -> ${RY(H,$.coverage)}`,q)),wY(U,$,Y),V)U.push(_Y(V,H));if($.fsSampleFeedbackLines)U.push(gY($.fsSampleFeedbackLines,H));if(EY(U,$),K)U.push(y0("fsEyesThrough"," -> EyesThroughOut",K));if(z&&!z.fragmentInCaster)U.push(...fY(z));return U.push(...G),v4(U,$,J)}function _Y($,J){return y0(s6,` -> ${J?"PictureDepthOut":"@location(0) vec4<f32>"}`,$)}var bB=`struct SampleDepthOut {
  @location(0) report: vec2<u32>,
  @builtin(frag_depth) depth: f32,
}`;function gY($,J){let Q=y0(X6,` -> ${J?"SampleDepthOut":"@location(0) vec2<u32>"}`,$);return J?`${bB}
${Q}`:Q}function wB($,J,Q){let Z=$.length-1;if(Z<0||!$[Z].startsWith("  return "))return null;let X=$.slice(0,Z).map((q)=>eP.get(q)??q),j=Q===null?"  return lume_fbOut;":`  return SampleDepthOut(lume_fbOut, ${Q});`;return["  lume_fbBegin(in.position, bitcast<u32>(frame.fadeTime));",...X,...J.map((q)=>`  lume_fbPick(${q}, 0.0);`),j]}function EB($,J,Q){let Z=$.length-1;if(Z<0||!$[Z].startsWith("  return "))throw Error("lume: the depth arm's body ends in its return, which the material data entry takes the place of");let X=$.slice(0,Z);if(Q)X.push(`  ${w7}`);return X.push(J===null?"  return out_data;":`  return PictureDepthOut(out_data, ${J});`),X}function fY($){let J=[y0("fsShadow","",$.fsLines)];if($.fsLines.length>0)J.push(iX(1),y0("fsShadowCover","",[...$.fsLines,"  if (cover_underGround(in.position)) { discard; }"]));return J}var _B="  if (alpha <= 0.0) { discard; }";function gB($,J,Q,Z,X,j,q){let V=L4($,"surface");if(Z)V.push(I7);if(X)V.push(D7);if(j)V.push(hq);if(q){if(V.push(DJ),$.waterOver)V.push(wJ)}if(V.push($.varyingsStruct),Q)V.push(v9("vs",$.vsParams,$.vsLines));if(q){let Y=J.indexOf("  lume_surfacePoint = in.positionRender;");if(Y<0)throw Error("lume: the surface arm's body names its point before its return, which the see-through's entries cut ahead of");let K=J.slice(0,Y);V.push(y0("fsSeeThroughSurface",` -> ${gJ(!1)}`,[...K,_B,...J.slice(Y)])),V.push(y0("fsSeeThrough"," -> @location(0) vec4<f32>",[...K,...q])),wY(V,$,!1)}else{if(V.push(y0("fsSurface",` -> ${gJ($.opts.motion===!0)}`,J)),$.coverage)V.push(K4,OY);V.push(y0("fsDepth",` -> ${RY(!1,$.coverage)}`,$.fsDepthLines)),EY(V,$)}if($.fsMaterialDataLines)V.push(_Y($.fsMaterialDataLines,!1));if($.fsSampleFeedbackLines)V.push(gY($.fsSampleFeedbackLines,$.writesDepth));return V.push(...$.surfaceDefs),v4(V,$,Q)}function fB($){return $.body.includes("for (var ")||$.fnDefs.includes("for (var ")}var hB=$5|q4|$9;function hY($,J,Q=!1){if(!Q&&!mY($,J))return`the ${$} model`;if($!=="physical"||(V4(J)&hB)===0)return;return"its own physical terms (an F0 of its own, a term of three's physical light, or its coat's own normal)"}var mY=($,J)=>$==="pbr"||$==="physical"&&!x5(J),N5="fsOutlineMask";function uY($,J){if(($.lighting.materialInputs?.length??0)>0)return"material inputs to the light program";if(J.lightingQueries)return"a point query";return N9(J.modules)?"a sky read":void 0}function mB($,J,Q,Z,X,j,q){let V=hY($,Q);if(V!==void 0)return V;if(!X||Q.blending!=="normal")return"no see-through blend";if(!q6(Q))return"no colour write";if(E5(Q))return"premultiplied alpha";if(J.vertexPath&&J.vertexPath.lightsOnce!==!0)return"a lane's vertex path";if(j)return"a scene read";if(q)return"a depth of its own";if(!Q.depthTest)return"no depth test";if(J.motion)return"a motion twin";if(!Q.fog)return"fog off";if(Q.viewOpacityNode)return"a view opacity";if(J.lighting.materialProgram===!0)return"a lighting() of its own";return uY(J,Z)}function uB($,J,Q,Z,X){let j=$==="unlit";if(!q6(Z))return"no colour write";let q=hY($,Z,j);if(q!==void 0)return q;if(j&&!Z.fog)return"an unlit surface with its fog off";if(J.vertexPath&&J.vertexPath.lightsOnce!==!0)return"a lane's vertex path";if(!Q)return"not an opaque depth writer";if(tX(Z.renderOrder))return"a renderOrder above 0";if(Z.viewOpacityNode)return"a view opacity";if(J.lighting.materialProgram===!0){if(j)return"a lighting() of its own on an unlit surface";if(J.pass.samples!==1)return"a lighting() of its own under four samples";if($==="physical"&&(Z.clearcoat>0||Z.clearcoatNode!==null))return"a lighting() of its own under a coat";if(J.lighting.discards===!0)return"a lighting() of its own that cuts"}return uY(J,X)}function cB($,J,Q,Z,X){let j=L4($,X?"none":"lit");return j.push(b7(Z)),j.push($.varyingsStruct),j.push(`${Q}${y0(N5," -> @location(0) vec4<f32>",J)}`),v4(j,$,!1)}function cY($,J){let Q=T4("// lume highlight mask - the lane's cuts (assembled by assembleMaterialShader)",$);Q.push(b7(cJ),J);let Z=[];if($.portalClip)Z.push(AY);if($.laneCoverage)Z.push($.laneCoverageSeeded?ZV:XV);if($.laneHide)Z.push(qV);return Z.push(sV),Q.push(`@fragment fn fsOutlineMask(in: Varyings) -> @location(0) vec4<f32> {
${Z.join(`
`)}
}`),Z6(c8(Q),!1)}function pB($,J){return{...A4($),positionWorld:J.portalClip,positionWorldV:J.portalClip,portalClip:J.portalClip,laneCoverage:J.laneCoverage,laneCoverageSeeded:J.laneCoverageSeeded,laneHide:J.laneHide}}function dB($,J){let Q=pB($,J),Z=j6(G5(Q));return{vertex:SY($,Q,"mask",Z),fragment:cY(Q,Z)}}function y4($,J){return $.wireframe===!0&&J.vertexPath===void 0}function lB($,J){if(!J)return"opaque";return $.blending==="custom"||E5($)?`${$.blending}:${Fq(Hq($))}`:$.blending}function kZ($,J,Q,Z,X,j,q,V){let Y="none",K=J.vertexLayout;if(J.vertexPath)Y=`path:${J.vertexPath.key}`;else if(K){let H="";for(let U=0;U<K.attributes.length;U+=1){let F=K.attributes[U];H+=`${U>0?"+":""}${F.name}@${F.shaderLocation}:${F.format}:${F.offset}`}Y=`${K.arrayStride}:${K.stepMode??"vertex"}:${H}${G6(J)===u8&&K.storageEncoding?":"+K.storageEncoding:""}${J.instanceSlots?`:slots-${J.instanceSlots}`:""}${J.instanceSet?":set":""}`}let z=j4($),G=[`model:${$.shadingModel}`,`color:${J.pass.colorFormat}`,`depth:${J.pass.depthFormat??"none"}`,`samples:${J.pass.samples}`,`instancing:${J.instancing}`,`skinned:${J.skinned===!0?1:0}`];if(J.skinned&&J.skinnedPalette==="rig")G.push("palette:rig");if(J.morph)G.push("morph:1");if(J.modelMaterial)G.push("modelMaterial:1");if(J.skinnedModel)G.push("skinnedModel:1");if(G.push(`layout:${Y}`,`blend:${lB($,Q)}`,`depthWrite:${Z?1:0}`,`depthTest:${$.depthTest?1:0}`),z)G.push(`polygonOffset:${z.factor}/${z.units}`);if(!q6($))G.push("colorWrite:0");if(y4($,J))G.push("wireframe:1");if(G.push(`cull:${X}`,`alphaTest:${$.alphaTest>0?1:0}`,`fog:${$.fog?1:0}`,"wgsl",K5(j)),q)G.push("vertexWgsl",K5(q));if(V)G.push("shadowVertexWgsl",K5(V));return G}function nB($,J){let Q=["surface-buffer"];for(let Z of $)if(Z.startsWith("color:"))Q.push(`color:${gq(J)}`);else Q.push(Z.startsWith("samples:")?"samples:1":Z);return Q}function iB($){let J=$.skinned===!0&&$.skinnedPalette==="rig";if($.nativeModelMatrix===!0&&($.instancing!=="matrix"||$.skinned||$.instanceSlots!==void 0||$.instanceSet!==void 0))throw Error("lume: native model matrices require a direct, unskinned matrix draw");if($.modelMaterial&&$.nativeModelMatrix!==!0&&($.skinned!==!0||J))throw Error("lume: native model material factors require the character skin palette or native model matrix");let Q=new Map,Z=$.vertexLayout;if(!$.vertexPath===!Z)throw Error("lume: assemble with exactly one of vertexLayout / vertexPath");if(!Z){if($.skinned)throw Error("lume: a vertexPath lane cannot be skinned");if($.morph)throw Error("lume: a morph assembly adds the targets' deltas ahead of the palette blend \u2014 assemble with skinned true");if($.instancing!=="none")throw Error("lume: a vertexPath lane owns its own instancing \u2014 assemble with instancing 'none'");return Q}if($.instanceSet){if($.instancing!=="matrix")throw Error("lume: an instance set places its copies under the instance matrix \u2014 assemble with instancing 'matrix'");if($.instanceSlots!=="storage")throw Error("lume: an instance set reads each copy's slot from the bound list \u2014 assemble with instanceSlots 'storage'");if($.skinned)throw Error("lume: a rigged geometry cannot declare an instance set")}for(let j of Z.attributes)Q.set(j.name,j);let X=Q.get("position");if(!X)throw Error("lume: vertex layout must include a 'position' attribute");if(R0(R5(X.format))!=="vec3<f32>")throw Error(`lume: 'position' attribute must be a 3-component float format, got '${X.format}'`);if($.skinned){if(J){if($.instancing!=="matrix")throw Error("lume: a rig-skinned material blends model-space palettes under the instance matrix \u2014 assemble with instancing 'matrix'");if($.morph)throw Error("lume: a rig palette carries no morph targets \u2014 assemble morph with the character palette")}else if($.instancing!=="none")throw Error("lume: skinned materials blend world-premultiplied joint palettes \u2014 assemble with instancing 'none'");for(let j of["joints","weights"])if(!Q.has(j))throw Error(`lume: skinned material vertex layout must include a '${j}' attribute`)}else if($.morph===!0&&$.nativeModelMatrix!==!0)throw Error("lume: a morph assembly needs a character skin palette or native model matrix");return Q}var oB=400;function rB($,J,Q){let Z=k9($.body);if($.body.length<oB&&Z===""||Q.length===0)return null;let X=[],j=[],q=["  let lume_surface = lume_materialSurface(in, frontFacing);"];for(let Y of Q){let K=R0(Y.node.type);X.push(`  m_${Y.name}: ${K},`),j.push(`out_${Y.name}`),q.push(`  let out_${Y.name}: ${K} = lume_surface.m_${Y.name};`)}let V=[`${Z}fn lume_materialSurface(in: Varyings, frontFacing: bool) -> LumeMaterialSurface {`,...J,$.body,`  return LumeMaterialSurface(${j.join(", ")});`,"}"].join(`
`);return{defs:[`struct LumeMaterialSurface {
${X.join(`
`)}
}`,V],called:q.join(`
`)}}var pY=/^(\s*)(\w+)(\s*:\s*[^/@]+,)$/,dY=/^\s*(\/\/.*)?$/,aB="lume_unread_";function S5($,J,Q,Z){let X=$.indexOf("{"),j=X<0?-1:$.indexOf(`
}`,X);if(j<0)return $;let q=O9(Q);if(new RegExp(`\\b${J}\\b(?!\\s*\\.\\s*\\w)`).test(q))return $;let V=new Set;for(let U of q.matchAll(new RegExp(`\\b${J}\\s*\\.\\s*(\\w+)`,"g")))V.add(U[1]);let Y=$.slice(X+1,j).split(`
`),K=Y.map((U)=>U.endsWith(t6)?t6:""),z=Y.map((U,F)=>pY.exec(U.slice(0,U.length-K[F].length)));if(Y.some((U,F)=>z[F]===null&&!dY.test(U))||Z&&K.some(Boolean))return $;let G=z.findIndex((U)=>U!==null);z.forEach(function(U,F){if(U!==null&&V.has(U[2]))G=F});let H=[];return Y.forEach(function(U,F){let M=z[F];if(M===null)H.push(U);else if(!Z||F<=G)H.push(V.has(M[2])?U:`${M[1]}${aB}${F}${M[3]}${K[F]}`)}),`${$.slice(0,X+1)}${H.join(`
`)}${$.slice(j)}`}var xZ="var<private> material: Material;",nj="struct Material {",sB=/^\s*:\s*array</,F9="lume_materialBlock",ij="lume_once_",oj="lume_materialBlocks",rj=new Map([[f5,"lume_block"],[VV,"in.lumeBlock"]]),lY="lume_materialBuild",tB=`@group(2) @binding(0) var<uniform> ${lY}: Material;`;function q9($){let J=[$,""].join(""),Q=J.indexOf(xZ),Z=J.indexOf(nj),X=Z<0?-1:J.indexOf(`
}`,Z);if(Q<0||X<0)return $;let j=O9(aj(J,new Map([xZ,...rj.keys()].map((N)=>[N,D9]))));if(/\bmaterial\b(?!\s*\.\s*\w)/.test(j))return $;let q=new Set;for(let N of j.matchAll(/\bmaterial\s*\.\s*(\w+)/g))q.add(N[1]);let V=J.slice(Z+nj.length,X).split(`
`),Y=V.map((N)=>pY.exec(N));if(V.some((N,L)=>Y[L]===null&&!dY.test(N)))return $;let K=Y.filter((N)=>N!==null&&q.has(N[2])),z=new Set(K.filter((N)=>N[2]===aJ||N[2]===sJ).map((N)=>N[2])),G=new Set(K.filter((N)=>!z.has(N[2])).map((N)=>N[2])),H=new Set(K.filter((N)=>G.has(N[2])&&!sB.test(N[3])).map((N)=>N[2])),U=[...G.size===0?[]:[`var<private> ${F9}: u32;`],...z.size===0?[]:[tB]],F=(N)=>G.size===0?[]:[`  ${F9} = ${N};`],M=G.size===0?null:new RegExp(`\\bmaterial([^\\S\\n]*\\.[^\\S\\n]*(?:${[...G].join("|")})\\b)`,"g"),B=z.size===0?null:new RegExp(`\\bmaterial([^\\S\\n]*\\.[^\\S\\n]*(?:${[...z].join("|")})\\b)`,"g"),D=function(N){let L=M===null?N:N.replace(M,`${oj}[${F9}]$1`);return B===null?L:L.replace(B,`${lY}$1`)},C=J.lastIndexOf(`
`,Z-1)+1,P=J.indexOf(`
`,X+1),I=P<0?J.length:P,x=M===null&&B===null?J:`${D(J.slice(0,C))}${J.slice(C,I)}${D(J.slice(I))}`,T=aj(x,new Map([[xZ,U],...[...rj].map(([N,L])=>[N,F(L)])]));return H.size===0?T:eB(T,`${oj}[${F9}].`,H)}function aj($,J){let Q=[];for(let[j,q]of J)for(let V=$.indexOf(j);V>=0;V=$.indexOf(j,V+1)){let Y=V+j.length;if((V===0||$.charCodeAt(V-1)===sj)&&(Y===$.length||$.charCodeAt(Y)===sj))Q.push({at:V,end:Y,by:q})}if(Q.length===0)return $;Q.sort((j,q)=>j.at-q.at);let Z=[],X=0;for(let j of Q){if(j.at>X)Z.push($.slice(X,j.at-1));Z.push(...j.by),X=j.end+1}if(X<=$.length)Z.push($.slice(X));return Z.join(`
`)}var sj=10;function eB($,J,Q){let Z=O9($),X=new RegExp(`${J.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}(\\w+)\\b`,"g"),j=new RegExp(`\\b${F9}\\s*=[^=]`),q=[];for(let[V,Y]of $M(Z)){let K=Z.slice(V,Y);if(j.test(K))continue;let z=new Map;for(let U of K.matchAll(X)){if(!Q.has(U[1]))continue;let F=z.get(U[1]);if(F===void 0)z.set(U[1],[U.index]);else F.push(U.index)}let G=[...z].filter(([,U])=>U.length>=2);if(G.length===0)continue;let H=QM(K);for(let[U,F]of G){let M=ZM(K,JM(H,F[0]));q.push({at:V+M,end:V+M,text:`
  let ${ij}${U} = ${J}${U};`});for(let B of F)q.push({at:V+B,end:V+B+J.length+U.length,text:`${ij}${U}`})}}return XM($,q)}function $M($){let J=[];for(let Q of $.matchAll(/\bfn\s+\w+\s*\(/g)){let Z=$.indexOf("{",Q.index);if(Z<0)break;let X=Z;for(let j=0;X<$.length;X+=1)if($[X]==="{")j+=1;else if($[X]==="}"&&--j===0)break;J.push([Z+1,X])}return J}function JM($,J){let Q=0,Z=$.length;while(Q<Z){let X=Q+Z>>1;if($[X]<=J)Q=X+1;else Z=X}return Q===0?0:$[Q-1]}function QM($){let J=/\s*else\b/y,Q=[0],Z=0;for(let X=0;X<$.length;X+=1){let j=$[X];if(j==="("||j==="["||j==="{")Z+=1;else if(j===")"||j==="]")Z-=1;else if(j===";"&&Z===0)Q.push(X+1);else if(j==="}"&&--Z===0){if(J.lastIndex=X+1,!J.test($))Q.push(X+1)}}return Q}function ZM($,J){let Q=J;while($[Q]===" "||$[Q]==="\t")Q+=1;return $[Q]===`
`?Q:J}function XM($,J){if(J.length===0)return $;J.sort((X,j)=>X.at-j.at||X.end-j.end);let Q=[],Z=0;for(let X of J)Q.push($.slice(Z,X.at),X.text),Z=X.end;return Q.push($.slice(Z)),Q.join("")}function tj($,J,Q){let Z=[tV];J.storages.forEach((H,U)=>Z.push(H.engine!==void 0?`@group(1) @binding(${2+U}) var<storage, read> ${H.engine}: array<${R0(H.elementType)}>;`:`@group(1) @binding(${2+U}) var<storage, read_write> ${J.symbolNames.name("storage",H.id)}: array<${J.atomicStorages.has(H)?`atomic<${R0(H.elementType)}>`:R0(H.elementType)}>;`));let X=2+J.storages.length;J.textures.forEach(function(H,U){Z.push(`@group(1) @binding(${X+2*U}) var ${J.symbolNames.name("texture",H.id)}: ${nY(H)};`),Z.push(`@group(1) @binding(${X+2*U+1}) var ${J.symbolNames.name("sampler",H.id)}: sampler;`)});let j=X+2*J.textures.length;J.storeTextures.forEach((H,U)=>Z.push(`@group(1) @binding(${j+U}) var ${J.symbolNames.name("texture",H.id)}: ${jM(H)};`));for(let H of J.workgroups)Z.push(`var<workgroup> ${J.symbolNames.name("storage",H.id)}: array<${J.atomicStorages.has(H)?`atomic<${R0(H.elementType)}>`:R0(H.elementType)}, ${H.count}>;`);for(let H of J.modules)Z.push(H.source.trim());if(J.fnDefs)Z.push(J.fnDefs);let q=(H)=>J.inputsUsed.has(H),V=q("workgroupId")?`
  let lume_workgroup: vec3<u32> = vec3<u32>(lume_index / ${Q}u, 0u, 0u);`:"";if(J.barriers){let H=["@builtin(workgroup_id) lume_wid: vec3<u32>","@builtin(local_invocation_index) lume_local: u32",...q("localId")?["@builtin(local_invocation_id) lume_lid: vec3<u32>"]:[]];Z.push(`@compute @workgroup_size(${Q}) fn main(${H.join(", ")}) {
  let lume_first: u32 = lume_dispatch.w + lume_wid.x * ${Q}u + lume_wid.y * lume_dispatch.y;
  if (lume_first >= lume_dispatch.x) {
    return;
  }
  let lume_index: u32 = lume_first + lume_local;${V}
${J.body}
}`)}else{let H=["@builtin(global_invocation_id) lume_gid: vec3<u32>",...q("invocationLocalIndex")?["@builtin(local_invocation_index) lume_local: u32"]:[],...q("localId")?["@builtin(local_invocation_id) lume_lid: vec3<u32>"]:[]];Z.push(`@compute @workgroup_size(${Q}) fn main(${H.join(", ")}) {
  let lume_index: u32 = lume_dispatch.w + lume_gid.x + lume_gid.y * lume_dispatch.y;
  if (lume_index >= lume_dispatch.x) {
    return;
  }${V}
${J.body}
}`)}let Y=Z.join(`
`),K=/\blume_worldFromRender\b/.test(O9(Y))?[A8]:[],z=S5(_5.trim(),"frame",[...K,Y].join(`
`),!0),G=`${S5($,"material",Y,!1)}
@group(1) @binding(0) var<uniform> material: Material;`;return c8(["//",z,...K,G,...Z])}function nY($){let J=$.sampleType==="uint"?"u32":"f32";if($.dimension==="3d")return`texture_3d<${J}>`;if($.dimension==="2d-array")return`texture_2d_array<${J}>`;if($.dimension==="cube")return`texture_cube<${J}>`;return`texture_2d<${J}>`}function jM($){let J=X4($);if(J===null)throw new Z0(Gq,{code:"texture-store-target"});let{layout:Q}=Uq($,J);return`${J.volume?"texture_storage_3d":"texture_storage_2d"}<${Q.gpu}, write>`}var D9=[];function z$($){let J=null;return function(){if(J===null)try{J={value:$()}}catch(Q){J={refused:Q}}if("refused"in J)throw J.refused;return J.value}}function qM($,J){$.reserve(J.declarationsWgsl);for(let Z of J.entryParams)$.reserve(Z);for(let Z of J.positionWgsl)$.reserve(Z);for(let Z of J.casterPositionWgsl??D9)$.reserve(Z);jb(J,$);for(let Z of J.varyings)$.reserve(Z.name);let Q;{Q=kb(J,$)}if(Q){for(let Z of[Q.marker,Q.variable,Q.displacedFlag])$.reserve(Z);lb(Q,$);}}var VM=["workgroupId","localId","invocationLocalIndex"],YM=($,J)=>`a compute body with workgroupBarrier() runs whole workgroups: .compute(${$}, ${J}) leaves ${$%J} invocations of a workgroup past the count; give it ${Math.ceil($/J)*J} and skip the tail's writes with If(instanceIndex.lessThan(${$}), \u2026), keeping the barrier outside the If`;function ej($,J,Q,Z,X=!1){let j=[];if($.length===0)return j;J.reserve("main lume_gid lume_index lume_dispatch");for(let q of $){let V=G$({stage:"compute",scope:q.scope,outputs:[],inputs:P4,symbolNames:J,literalSeats:Q,uniformName:Z,...X?{engineReads:!0}:{}});if(V.barriers&&q.count%q.workgroupSize!==0)throw new Z0(YM(q.count,q.workgroupSize),{code:"compute-barrier-count"});let Y=V.workgroups.reduce((K,z)=>K+z.count*Yq(z.elementType)*4,0);if(Y>OZ)throw new Z0(`a compute body's workgroupArrays take ${Y} bytes together, and a workgroup holds ${OZ} bytes on every device`,{code:"workgroup-storage-over-limit"});j.push(V)}return j}var iY=($)=>$.hold===null?[$.place,$.paint]:[$.place,$.hold,$.paint],oY={instanceIndex:"lume_pointInstance",vertexIndex:"lume_pointVertex",modelMatrix:"lume_points.model",uv:"vec2<f32>(0.5)"},zM={...P4,...oY,positionLocal:"lume_pointLocal",positionGeometry:"lume_pointLocal"},tZ={...P4,...oY,positionLocal:"out_pointsPosition",positionGeometry:"out_pointsPosition",positionRender:"lume_pointRender.xyz",positionWorld:"lume_worldFromRender(lume_pointRender.xyz)",screenUV:"(lume_pointPixel / frame.viewportSize)"},KM={...tZ,uv:"lume_pointUv",screenUV:"(lume_pointAt / frame.viewportSize)"},rY=new Set(["positionLocal","positionGeometry"]),T9=new Set(["uv","screenUV"]),GM=new Set(["uv"]),UM=new Set([...rY,...T9]),HM=new Set,$q=new Set(["atomic","voidCall","textureStore"]),FM=new Set(["const","input","attribute","uniform","rows","varRead"]),WM="main lume_gid lume_index lume_dispatch lume_points lume_pointsSums lume_pointsSet lume_pointsVertices lume_pointsFromVertices lume_pointInstance lume_pointVertex lume_pointLocal lume_word lume_pointsPut lume_pointsDither lume_pointRender lume_pointClip lume_pointNdc lume_pointPixel lume_pointScale lume_pointRadius lume_alpha lume_light lume_coverLog lume_side lume_lo lume_hi lume_x lume_y lume_cell lume_from lume_to lume_span lume_cover lume_pointAt lume_pointUv out_pointsPosition out_pointsSize out_pointsColor out_pointsOpacity out_pointsHold";function PM($){let J=new Map,Q=new Map,Z=new Map,X=function(j){let q=j.meta;if(q.kind==="input")return T9.has(q.name);if(q.kind==="varRead"||$q.has(q.kind))return!0;if(q.kind!=="fnCall")return!1;let V=Q.get(q.instance.id);if(V===void 0){let Y=n$(q.instance),K=new Set,z=(G)=>G.meta.kind==="input"&&T9.has(G.meta.name)||$q.has(G.meta.kind);V=Y.some((G)=>z8(G,K,z)),Q.set(q.instance.id,V)}return V||q8(j,void 0,Z).size>0};for(let j of $)o0(j,J,function(){return},(q,V)=>V.some(Boolean)||X(q));return J}function BM($,J){let Q=[];return i$($,function(Z){if(J.get(Z)===!0)return!0;if(!FM.has(Z.meta.kind))Q.push(Z);return!1}),Q}function MM($,J,Q,Z,X){let j=Pq($);if(j===null)return null;Q.reserve(WM);let q=J.vertexScope??J.fragmentScope??null,V=$.positionNode?m8("position",$.positionNode,["vec3f"]):Z4,Y=$.positionNode?rY:HM,K=j.sizeNode?m8("size",j.sizeNode,["f32"]):d$("f32",[j.size]),G=G$({stage:"compute",scope:K$(q,[V,K]),outputs:[{name:"pointsPosition",node:V},{name:"pointsSize",node:K}],inputs:zM,symbolNames:Q,literalSeats:Z,uniformName:X}),H=$.colorNode?m8("color",$.colorNode,["vec4f"]):Q0(Kq,"vec4f"),U=$.opacityNode?m8("opacity",$.opacityNode,["f32"]):oJ,F=[H,U],M=K$(q,F),B=[];if(M!==null)T0(M,B);let D=new Set,C=[...F,...B].some((L)=>z8(L,D,(S)=>S.meta.kind==="input"&&GM.has(S.meta.name))),P=C?BM(F,PM(F)):[],I=P.length===0?null:G$({stage:"compute",scope:null,outputs:P.map((L,S)=>({name:`pointsHold${S}`,node:L})),inputs:tZ,symbolNames:Q,literalSeats:Z,uniformName:X,bound:P9(P,G.named,Y)}),x=$.positionNode?UM:T9,T=P9(F,G.named,C?x:Y);if(I!==null)for(let[L,S]of P9(F,I.named,T9))T.set(L,S);let N=G$({stage:"compute",scope:M,outputs:[{name:"pointsColor",node:H},{name:"pointsOpacity",node:U}],inputs:C?KM:tZ,symbolNames:Q,literalSeats:Z,uniformName:X,bound:T});if(G.textures.length>0||N.textures.length>0||(I?.textures.length??0)>0)throw new Z0("a points material samples no texture: each point is coloured once, so give it its colour from params, buffers or math (a picture per point is not drawn yet)",{code:"points-texture"});return{place:G,hold:I,paint:N,square:C,family:W2($),records:(J.instanceSet?.fields.length??0)>0}}function CM($){let J;if(!$.square)J=`${$.paint.body}
${I2($.family)}`;else{let Q=N2($.family,$.paint.body);J=$.hold===null?Q:`${$.hold.body}
${Q}`}return`  {
${J}
  }`}function DM($,J){let Q=iY(J),Z=[tV],X=_8(Q,"storages"),j=new Set;for(let z of Q)for(let G of z.atomicStorages)j.add(G);if(X.forEach((z,G)=>Z.push(`@group(1) @binding(${2+G}) var<storage, read_write> ${J.place.symbolNames.name("storage",z.id)}: array<${j.has(z)?`atomic<${R0(z.elementType)}>`:R0(z.elementType)}>;`)),Z.push(P2),J.records)Z.push(M2);for(let z of z6(Q))Z.push(z.source.trim());let q=h5(Q);if(q)Z.push(q);Z.push(C2(J.family)),Z.push(`@compute @workgroup_size(${F2}) fn main(@builtin(global_invocation_id) lume_gid: vec3<u32>) {
  let lume_index: u32 = lume_dispatch.w + lume_gid.x + lume_gid.y * lume_dispatch.y;
  if (lume_index >= lume_dispatch.x) {
    return;
  }
${B2(J.records)}
${J.place.body}
${D2}
${CM(J)}
}`);let V=Z.join(`
`),Y=S5(e0.trim(),"frame",[A8,e0.slice(_5.length),V].join(`
`),!0),K=`${S5($,"material",V,!1)}
@group(1) @binding(0) var<uniform> material: Material;`;return c8(["//",Y,A8,K,...Z])}function*aY($,J){let Q=J.instanceSet,Z=b2($,Q?.lines===void 0?null:{topology:Q.lines,records:Q.fields.length>0},J.fragmentScope??null,J.vertexScope??null),X=Z===null?$:Z.material,j=Z===null?J:{...J,fragmentScope:Z.fragmentScope,vertexScope:Z.vertexScope},q={tableRows:0};for(;;)try{return yield*sY(X,j,q)}catch(V){if(q===null||q.tableRows===0||!(V instanceof Z0)||V.detail?.code!=="uniform-block-over-limit")throw V;q=null}}function*sY($,J,Q,Z=v8-bj){let X=$.shadingModel==="matcap"?$.matcapTexture:null,j=J.vertexPath??null,q=iB(J),V=!j||j.localPositionSlot!==void 0,Y=$.castShadowPositionNode&&V?m8("castShadowPosition",$.castShadowPositionNode,["vec3f"]):null,K=$.positionNode&&V?m8("position",$.positionNode,["vec3f"]):Y&&Z4,z=V4($)&(J.lighting.physicalEvaluate===void 0?~q4:-1),G=JP($,J.lighting,q,z),H=Bq($),U=Q===null?XZ:Uj({roots:UV(G,K,Y),scopes:[J.fragmentScope,J.vertexScope]});if(Q!==null)Q.tableRows=U.tableRows;let F=Y5(U,{position:K,caster:Y,outputs:G,fragmentScope:J.fragmentScope??null,vertexScope:J.vertexScope??J.fragmentScope??null}),M=Y5(Zj({...PZ(F),alsoReads:H.map((W)=>W.scope)}),F),B=Y5(kj(PZ(M)),M),D=J.copyStage===!0&&J.instanceSet!==void 0&&J.motion!==!0&&J.loopMarks!==!0?Aj(PZ(B)):KZ;if(D.stage!==null&&J.materialBlocks!==void 0)J={...J,materialBlocks:void 0};let{position:C,caster:P,outputs:I,fragmentScope:x,vertexScope:T}=Y5(D,B),N=xq(HZ),L=C&&Z>0?Rj({outputs:I.map((W)=>W.node),scope:x,reads:zZ([C],K$(T,[C])),packs:Z,acts:N}):q5,S=L.packs===0?I:I.map((W)=>({name:W.name,node:L.rewrite(W.node)})),c=L.packs===0?x:tW(L.rewriteScope(x),S,N),f=new A9,r=new kq;if(f.reserve(J.lighting.wgslDefs),J.inkField===!0)f.reserve(xB);if(j)qM(f,j);let d=(W)=>({texture:f.name("texture",W.id),sampler:f.name("sampler",W.id)}),G0={symbolNames:f,literalSeats:r,uniformName:(W)=>"material."+f.name("uniform",W.id),textureName:d,varyingName:(W)=>f.name("varying",W.id),textureFacts:(W)=>HZ(W)?`material.${E0(W)}`:null},E0=(W)=>`${d(W).texture}_facts`,b0=tq($),z0=b0!==void 0,U0=Wq($),w0=!q6($),A=z0&&E5($),v={...jP,sceneDepth:b0?"lume_sceneDepth(in.position.xy)":aq,sceneDepthAt:"frame.viewportSize"};if(j){for(let W of j.varyings)v[W.input]=`in.${W.name}`;if(j.fragmentReads)Object.assign(v,j.fragmentReads.inputs)}else for(let W of Object.keys(u5))if(!M4(J,W))v[W]=r$(q,W);if(J.modelMaterial)Object.assign(v,i6);let E=$._surfaceMap,w=E===null?j?.surfaceMap??null:null;if(E||w)f.reserve(X9),v.materialColor=`(${v.materialColor} * ${X9}.rgb)`,v[z5]=`${X9}.a`;let h=WP(j,q,J),J0=W9({stage:"fragment",scope:c,outputs:S,inputs:v,inputTypes:h,quadUniformRoot:!0,...G0}),l=YV(J),b=FP(j,q,J,l);for(let W of Object.values(b))f.reserve(W);let g=C===null?[]:[{name:"position",node:C}];if(C!==null&&P!==null)g.push({name:HV,node:P});let n=C?K$(T,g.map((W)=>W.node)):null,_=C?W9({stage:"vertex",scope:n,outputs:g,inputs:b,inputTypes:h,...G0}):null,a=$.shadingModel==="physical"&&($.clearcoat>0||$.clearcoatNode!==null),H0=$.shadingModel==="physical"&&!x5($)&&!a&&z===0?"pbr":$.shadingModel,B0=Eq(H0,J.lighting,X?d(X):null,z);f.reserve(B0.defs);let k0=B0.needsLighting;yield;let y=yield*J0(),g0=E!==null&&(y.inputsUsed.has("materialColor")||y.inputsUsed.has(z5))?{texture:E.texture,uv:b5[E.uv],transform:E.transform}:null;if(g0)y.inputsUsed.add(g0.uv);let l9=w!==null&&(y.inputsUsed.has("materialColor")||y.inputsUsed.has(z5))?w:null;if(l9)for(let W of l9.inputs)y.inputsUsed.add(W);yield;let n9=y.varyings.map((W)=>W.node),t=_===null?null:yield*_(n9),f0=null;if(y.varyings.length>0){let W=y.varyings.map((d0)=>({name:d0.name,node:d0.node})),R=T??c,q0=R!==null&&n!==null&&t!==null?Nq(R,n,K$(R,n9),_j(b,j)):null;f0=yield*W9({stage:"vertex",...G0,scope:K$(T??c,n9,q0),outputs:W,inputs:{...b,...j?{}:{positionLocal:l?W4:"localPos"},positionWorld:"positionWorldV",positionRender:"positionRenderV",normalWorld:"normalize(normalWorldV)"},inputTypes:h,bound:t===null?void 0:P9(n9,t.named,_j(b,j),q0)})()}yield;let G8=[];if(t)G8.push(t);if(f0)G8.push(f0);let k8=[y,...G8],d8=ej(H,f,r,G0.uniformName),C$=D.stage===null?null:ej([D.stage],f,r,G0.uniformName,!0)[0],l8=MM($,J,f,r,G0.uniformName),s3=l8===null?[]:iY(l8),GQ=J.modelMaterial===!0&&J.skinned===!0,UQ=l&&t!==null;for(let W of k8){let R=W.inputsUsed;if(J.modelMaterial)for(let q0 of GP)GQ||=R.has(q0);if(l)UQ||=R.has("modelMatrix")||R.has("positionLocal")||R.has("normalLocal")||R.has("skinMatrix")}J={...J,modelMaterial:GQ,skinnedModel:UQ};let FU=_8([...k8,...d8,...s3,...C$===null?[]:[C$]],"uniforms"),D0=_8(k8,"textures");if(X&&!D0.includes(X))D0.push(X);let k6=x5($),D$=k6&&(!$.transparent||$.blending==="none");if(k6&&!D0.includes(o$))D0.push(o$);if(g0&&!D0.includes(g0.texture))D0.push(g0.texture);let n8=D0.includes(o$),t3=y.inputsUsed.has("sceneDepthAt"),e3=n8?"viewportSharedTexture() or ctx.fx.scene":t3&&"sceneDepthAt(uv)";if(e3&&!z0)throw new Z0(`${e3} reads the scene behind the surface, and an opaque surface has none \u2014 set transparent = true on the material so it draws over the scene it samples`,{code:n8?"scene-color-on-opaque-material":"scene-depth-at-on-opaque-material"});let i9=D0.map((W)=>W.sampleType==="float"&&W!==X&&W!==o$&&W!==g0?.texture&&X4(W)===null),$X=J4()?oq(i9):null,o9=$X&&OM($X,TM(D0,i9,f,[y,...G8])),x6=z6(k8),JX=h5(k8),QX=_8(G8,"storages"),HQ=_8(G8,"textures"),T6=[];for(let W of _8(k8,"storages"))T6.push({ref:W,vertex:QX.includes(W),fragment:y.storages.includes(W)});let ZX=_8(k8,"arrays"),i8=$.viewDepthPlaneNode!==null||$.depthNode!==null,O=IP($,J,k0,y,t,f0);kP(j,q,O),UP(J,[y,t,f0]);let XX=new Set;for(let W of k8)for(let R of W.inputsUsed)XX.add(R);let I$=_2(J,bY(J,XX,O.normalWorldV||O.slopeNormal||O.normalLocal||O.skinnedNormal));if(I$)J={...J,vertexLayout:I$.layout,...I$.reader?{vertexReader:I$.reader}:{}};let r9=j?xP(j,y):[],N$=$.depthWrite,jX=(W)=>G5(O,r9,y.varyings,W),qX=!1,k$=function(W=!0){let R=wj(jX(!0))>0;return qX||=R&&W,R},VX=jX(!0).length-v8;if(L.packs>0&&VX>0)return yield*sY($,J,Q,Math.max(0,L.packs-VX));if(O.flash&&k$())O.flash=!1;if(O.laneCoverage&&j?.coverage===void 0&&k$())O.laneCoverage=O.laneCoverageSeeded=!1;if(O.materialBlocks){let W=J.materialBlocks;if(W!=="kept"&&(W===void 0||!J.pass.depthFormat||!N$||z0||QX.length+HQ.length*W.texturesShare+1>W.vertexStorageRoom||y.storages.length+D0.length*W.texturesShare+1>W.fragmentStorageRoom||k$(!1)))O.materialBlocks=!1}if(O.laneHide&&k$())O.laneHide=!1;if(O.normalFace&&k$())O.normalFace=O.flatWeld=!1;if(O.bandLens=nP(J),O.bandLens&&k$())O.bandLens=!1;if(qX)pW();let x$=G5(O,r9,y.varyings,J.motion),o8=D0.filter(HZ),{structWgsl:O6,layout:YX,factsOffsets:WU}=hW(FU,f,r.size>0,o8.map(E0),U0?.planes.length??0),PU=o8.length===0?YX:{...YX,textureFacts:D0.map((W)=>o8.includes(W)?WU[o8.indexOf(W)]:-1)};yield;let zX=j?uj(j,O,y.varyings,t,f0,r9,J.bodyOpacity===!0,J.motion===!0):M9(J,O,y.varyings,t,f0),FQ=$.colorNode?.type==="vec4f",R6="material.color";if($.colorNode)R6=FQ?"out_color.rgb":"out_color";let WQ=$.roughnessNode?"out_roughness":"material.roughness",a9=$.metalnessNode?"out_metalness":"material.metalness",x8=null;if($.viewDepthPlaneNode)x8=`lume_paneDepth(in.position.z, in.positionRender, out_viewDepthPlane, ${z0})`;else if($.depthNode)x8="out_depth";let PQ="  finalColor = vec4<f32>(finalColor.rgb, finalColor.a * out_viewOpacity);";if($.blending==="multiply")PQ="  finalColor = vec4<f32>(finalColor.rgb * out_viewOpacity, out_viewOpacity);";else if($.blending==="none")PQ="  finalColor = vec4<f32>(finalColor.rgb, out_viewOpacity);";let s9=J.motion===!0,A0=j&&C4(j,y)?j.fragmentReads:void 0,BQ=A0?.reception??(J.receiveShadow===!1?"0.0":"1.0"),KX=S.some((W)=>W.name==="attribute")?`min(out_attribute, ${_q}u)`:"0u",T$=(W)=>S.some((R)=>R.name===W),MQ=T$("clearcoat")?"out_clearcoat":"material.clearcoat",GX=T$("clearcoatRoughness")?"out_clearcoatRoughness":"material.clearcoatRoughness",O$=T$("ao"),t9=A0?.unlit,UX=H0==="unlit"?IM(T$("lightMap"),O$):"albedo",CQ=J.lighting.materialProgram===!0&&!a?dq(J.lighting):null,HX=CQ!==null,FX=function(W){let R=`lume_surfaceOut(N, albedo, ${WQ}, ${a9}, ${BQ}, emissiveColor)`,q0=O$?`lume_surfaceOccluded(${R}, out_ao)`:R,d0=W?`lume_surfaceGlowless(${q0})`:q0,O8=a?`lume_surfaceCoated(${d0}, N, ${t9===void 0?MQ:`select(${MQ}, 0.0, ${t9})`}, ${GX})`:d0,t0=t9===void 0?O8:`lume_surfaceUnlitAs(${O8}, ${t9})`;if(H0==="unlit")t0=`lume_surfaceUnlitAs(lume_surfaceOut(vec3<f32>(0.0, 1.0, 0.0), vec3<f32>(0.0), 1.0, 0.0, 0.0, ${UX} + ${W?"vec3<f32>(0.0)":"emissiveColor"}), true)`;if(HX)t0=`lume_surfaceOwnLit(${t0})`;if(!$.fog)t0=`lume_surfaceFogOff(${t0})`;return`lume_surfacePressedRead(lume_surfaceAttributed(${t0}, ${KX}))`},BU=FX(!1),WX=[];for(let W=0;W<(J.lighting.materialInputs?.length??0);W+=1)WX.push(`out_lightInput${W}`);let PX=(W)=>`out_${W}`,MU=pj("normalize(in.normalWorld)",O),DQ={N:"N",V:"V",P:"P",albedo:"albedo",roughness:"roughness",metalness:"metalness",emissive:"emissiveColor",...J.receiveShadow===!1||A0?.reception!==void 0?{receiveShadow:BQ}:{},toonSteps:"material.toonSteps",transmission:T$("transmission")?"out_transmission":"material.transmission",...k6?{sceneBehind:kM(d(o$),$.ior,z,PX)}:{},...O$?{occlusion:"out_ao"}:{},materialInputs:WX,attribute:KX,...$.normalNode?{geometryNormal:MU}:{},...a?{clearcoat:MQ,clearcoatRoughness:GX}:{},...a&&(z&$9)!==0?{clearcoatNormal:pj(LY("out_clearcoatNormal"),O)}:{},...z!==0?{physical:{features:z,term:PX}}:{}},IQ=A0?.lit!==void 0&&H0==="pbr"&&B0.defs.includes("fn lighting_ambientIrradiance(")&&B0.defs.includes("fn lighting_iblShIrradiance(")?A0.lit:void 0,e9=IQ?.call??(H0==="unlit"?UX:B0.litColor(DQ)),NQ=G4(J.lighting),kQ=A0?.fog===void 0?jB:`shade_applyFog(litColor + emissiveColor, ${A0.fog.viewZ}, ${A0.fog.toward})`;if(NQ)kQ="litColor + emissiveColor";let A6=k0&&!I9(x6)&&e9.startsWith("lighting_evaluate(N, V, P, ")?x7(B0.defs,"P","N"):null,$J=k0&&A6===null&&e9.startsWith("lighting_evaluate(N, V, P, ")?Mq(x6):null,xQ=$J===null?null:cq(B0.defs,$J.source,y.body,JX),CU=$J===null||xQ===null?null:new Map([[$J,xQ.query]]),TQ=z0&&(t3||y.inputsUsed.has("sceneDepth")),JJ=z0&&!D$&&!TQ&&!n8&&LZ($),QJ=!n8&&z0&&($.blending==="normal"||$.blending==="none")&&!i8&&$.depthTest,BX=QJ&&!k0&&!TQ&&J.pass.samples===1&&fB(y),R$=TQ||BX&&J.loopMarks===!0,A$=QJ&&R$,ZJ=!NQ&&z0&&$.depthTest&&!D$&&!n8&&LZ($),MX=A$&&J.pass.samples===1,r8=ZB($,J),CX=NM($.emissiveNode?"out_emissive":"(material.emissive * material.emissiveIntensity)",H0,T$("lightMap"),O$,a9,k6?DQ.transmission:null),U8={coverage:r8,clip:U0===null?null:{line:XB(U0),shadows:U0.shadows},flags:k(O.materialBlocks,UY)|k(O.portalClip,HY)|k(FQ,FY)|k(O.laneCoverage,dZ)|k(O.laneCoverageSeeded,lZ)|k(O.laneHide,WY)|k($.alphaTest>0,C5)|k(rZ(J),v5)|k(JJ,kY)|k(k0,h8)|k(O.flipBackNormal,nZ)|k(O.normalFacingKept,iZ)|k($.fog||NQ,V$)|k(z0,Y$)|k($.viewOpacityNode!==null,oZ)|k(x8!==null,PY)|k(A$,IY)|k(MX,NY)|k(j===null&&!O.lines&&(O.normalWorldV||J.instancing==="matrix"||J.skinned===!0),H9),slots:[O.pathCut,null,null,R6,FQ||r8&&$.alphaTest>0?"var":"let",$.opacityNode?"out_opacity":"material.opacity",O.flash?`mix(${CX} + in.lumeFlash.rgb * ${S1.toFixed(2)}, in.lumeFlash.rgb * ${b1.toFixed(2)}, in.lumeFlash.w)`:CX,O.flipBackNormal?"var":"let",NB($,j,y),WQ,a9,A0?.unlit===void 0?e9:`select(${e9}, albedo, ${A0.unlit})`,$.viewOpacityNode||ZJ||A?"var":"let",$.blending==="multiply"?"mix(vec3<f32>(1.0), litColor + emissiveColor, viewKeep)":"litColor + emissiveColor",PQ,`  return FragmentOut(finalColor${s9?", vec4<f32>(lume_motionVector(in.motionCurrentClip, in.motionPreviousClip), 0.0, finalColor.a)":""}${x8===null?"":`, ${x8}`}${r8?`, ${y5}`:""});`,x8,cj(BU,s9,r8),D$?"1.0":"alpha",A6===null||A6.read===""?[]:[A6.read],$.blending==="none"?"  lume_cover = out_viewOpacity;":"  lume_cover = lume_cover * out_viewOpacity;",A0?.point??"in.positionRender",A0?.unlit===void 0?kQ:`select(${kQ}, litColor + emissiveColor, ${A0.unlit})`,ZJ?aZ:null,ZJ?YB:null,null,null]};U8.slots[MB]=A?VB:null,U8.slots[CB]=B0.prelude?.(DQ)??null,U8.slots[DB]=O.flash?`mix(${R6}, in.lumeFlash.rgb, in.lumeFlash.w)`:R6;let a8=kB(y.varyings);if(l9)a8.unshift(`  let ${X9}: vec4<f32> = ${l9.wgsl};`);if(A0)a8.unshift(...A0.lines);if(g0){let W=XP(v[g0.uv],g0.transform),R=`textureSample(${d(g0.texture).texture}, ${d(g0.texture).sampler}, ${W})`,q0=o8.includes(g0.texture);a8.unshift(`  let ${X9}: vec4<f32> = ${q0?`lume_fbImplicit(${R}, ${W}, material.${E0(g0.texture)}, textureDimensions(${d(g0.texture).texture}, 0u))`:R};`)}let XJ=rB(y,a8,S),DU=XJ?D9:a8,IU=XJ?XJ.called:y.body,H8=(W,R=U8)=>NZ(R,W,DU,IU),NU=H8(V0),OQ=H8(c5),jJ=$.dataNode!==null&&$.depthTest&&!w0?EB(OQ,x8,z0&&!D$):null,qJ=o8.length>0?wB(OQ,o8.filter((W)=>HQ.includes(W)).map((W)=>`material.${E0(W)}`),x8):null,L6=null;if(A$)L6=[...t1];else if(QJ)L6=H8(BY);let RQ=QJ?H8(J6):null,L$=$.depthTest&&N$&&!z0&&!i8,AQ=O.portalClip&&L$?H8(CY):null,LQ=J.eyesOwner===!0&&L$?H8(DY):null,DX=J.eyesThrough===!0&&!i8&&!w0?H8(V0|Y8):null,T8=null,v$=null,IX=!1,NX=D.stage===null?H.map((W)=>W.scope):[...H.map((W)=>W.scope),D.stage.scope],kU=NX.length===0?null:Dq(NX),VJ=(W)=>W?.arrays.some((R)=>R.shared!==void 0||kU?.has(R)===!0)===!0,xU=t!==null&&(t.inputsUsed.has("time")||t.inputsUsed.has("deltaTime")||VJ(t)),kX=t!==null&&P!==null?$P(t):t,xX=P===null?xU:Iq([P],K$(T,[P]))||VJ(t);if((!j||j.casts===!0&&!xX)&&!E8(z6(G8))){let W=j!==null&&(O.laneCoverage||O.pathCut.length>0),R=($.alphaTest>0||y.discards||W||JJ||U0?.shadows===!0)&&!N9(y.modules),q0=R,d0=y.inputsUsed.has("time")||y.inputsUsed.has("deltaTime")||f0?.inputsUsed.has("time")===!0||f0?.inputsUsed.has("deltaTime")===!0||VJ(y)||VJ(f0);T8={vertexEntry:"vsShadow",fragmentEntry:"fsShadow",coverFragmentEntry:R?"fsShadowCover":null,cuts:R,timeDriven:xX||R&&d0,cutReadsClock:R&&d0,...q0?{fragmentIn:"shadowVertexWgsl"}:{}};let O8=R?O:AB(J,O,t),t0=R?y.varyings:[],S$=R?f0:null;if(S$!==null&&P!==null)S$={...S$,body:x4(S$.body,{out_position:FV})};v$={vsLines:j?uj(j,O8,t0,kX,S$,R?r9:[],!1,!1,!0):M9(J,O8,t0,kX,S$,"shadow"),fsLines:R?H8(C9):[],varyingsStruct:R?null:j6(G5(O8)),fragmentInCaster:q0};let hX=R&&E8(y.modules);IX=!(j!==null||[...t?.inputsUsed??[]].some(BV)||R&&(y.discards||W||JJ||hX||PP($,J.fragmentScope)))&&J.vertexLayout?.attributes.some((wU)=>wU.name==="layer")===!0;let mX=j===null?DP($,J,t,y,f0,R,!(y.discards||W||JJ||hX)):[];if(mX.length>0)T8.castsWithout=mX}yield;let YJ=[];for(let W=0;W<T6.length;W+=1){let R=T6[W].ref;YJ.push(`@group(2) @binding(${AZ(D0.length,R$,W)}) var<storage, read> ${R.engine??f.name("storage",R.id)}: array<${R0(R.elementType)}>;`)}let zJ=[];for(let W=0;W<D0.length;W+=1){let R=D0[W],q0=`@group(2) @binding(${1+W*2}) var ${f.name("texture",R.id)}: ${nY(R)};`;zJ.push(o9&&i9[W]?q0:`${q0}
@group(2) @binding(${2+W*2}) var ${f.name("sampler",R.id)}: sampler;`)}if(o9)zJ.push(o9);let e={material:$,opts:J,lit:k0,needs:O,writesDepth:i8,coverage:r8,varyings:x$,varyingsStruct:j6(x$,!J.vertexPath||J.vertexPath.invariantPosition),materialStruct:O6,textures:D0,sceneDepth:R$,throughMarks:A$,storageDecls:YJ,textureDecls:zJ,materialGroup:[vY(O6,O.materialBlocks),...zJ,...YJ],drawGroup:O4(J,O),vertexInStruct:F4(J),vsParams:JV(J,O),modules:x6,lightingVocab:E8(x6),lightingQueries:I9(x6),tapsFromFoldDefs:k0&&$.shadingModel!=="matcap"&&J.lighting.foldDefsCarryClusterTaps===!0,shadingDefs:IQ===void 0?(A6??xQ??B0).defs:`${B0.defs}

${IQ.defs}`,litSources:CU,fnDefs:JX,vsLines:zX,fsLines:NU,fsDepthLines:OQ,fsThroughLines:L6,fsThroughCoverLines:RQ,waterOver:ZJ,fsMaterialDataLines:jJ,fsSampleFeedbackLines:qJ,fsApertureMaskLines:AQ,fsEyesOwnerLines:LQ,fsEyesThroughLines:DX,shadow:v$,surfaceDefs:XJ?.defs??[]},vQ=!j&&t===null&&f0===null,yQ=vQ?sZ(O,e.drawGroup,e.vertexInStruct,e.varyingsStruct,e.vsParams,"vs",zX):void 0,v6;if(T8&&v$)if(v$.fragmentInCaster)v6=dj(e,G8,y);else if(t===null&&!T8.cuts&&!j){if(v6=SY(J,A4(J),"shadow",j6([])),LB(J))T8.positionsAlone=!0,delete T8.castsWithout}else if(vQ)v6=sZ(O,e.drawGroup,e.vertexInStruct,v$.varyingsStruct??e.varyingsStruct,e.vsParams,"vsShadow",v$.vsLines);else{let W=T8.cuts?G8:[t].filter((R)=>R!==null);v6=dj(e,W)}let TX,OX=J.motion?x$.slice(0,x$.length-bj):x$;if(J.inkField===!0&&!j&&L$&&!w0&&U0===null&&wj(jV(OX))<=0){let W="vec3<f32>(0.0)";if(J.instancing==="matrix")W="instanceModel[3].xyz";else if(J.skinned)W=fJ;let R=M9({...J,motion:!1},O,y.varyings,t,f0,"frame",!1,["  vsOut.lume_ink = ink_field(vsOut.position.w, lume_inkRecord.w);",`  vsOut.lume_inkObject = ink_objectId(${W});`]);TX=Z6(TB({...e,varyings:OX},R,NZ(U8,D5,a8,y.body),k9(y.body)),O.normalFace)}yield;let TU=Z6(SB(e,yQ===void 0),O.normalFace),SQ=vB(e,t);yield;let bQ=d8.map((W,R)=>tj(O6,W,H[R].workgroupSize));if(l8!==null)bQ.push(DM(O6,l8));if(C$!==null&&D.stage!==null)bQ.push(tj(O6,C$,D.stage.workgroupSize));let{texts:{module:RX,vertex:OU,caster:RU,position:AX,compute:KJ,inkField:AU},layout:LU,read:LX}=h2(r,PU,{module:TU,vertex:yQ,caster:v6,position:SQ?.program,compute:bQ,inkField:TX}),wQ=(W)=>W===void 0||!O.materialBlocks?W:q9(W),GJ=O.materialBlocks?(W)=>q9(LX(W)):LX,y6=j?.fragmentCut?.entries,vX=O.pathCut.length>0&&y6!=="plain",Z8=BZ(O.materialBlocks?q9(RX):RX,O.pathCut,y6),yX=Z8.text,S6=wQ(OU),b6=wQ(RU),SX=wQ(AU);yield;let EQ=y4($,J),y$="back";if($.side==="double"&&!j?.cullsBack||EQ)y$="none";else if($.side==="back")y$="front";let vU=J.pass.depthFormat?{format:J.pass.depthFormat,depthWriteEnabled:N$,depthCompare:$.depthTest?f6:"always",...EQ?{}:Xq(j4($)??void 0)}:void 0,UJ=k0||H0==="unlit"?uB(H0,J,L$,$,e):void 0,yU=k0&&UJ===void 0,bX=(k0||H0==="unlit")&&UJ===void 0,w6;if(!J.vertexPath&&!i8)if($.alphaTest>0||y.discards||U0!==null){let W=AZ(D0.length,R$,YJ.length);w6=z$(()=>({wgsl:GJ(Z6(cB(e,NZ(U8,MY,a8,y.body),k9(y.body),W,yU),O.normalFace)),fragmentEntry:N5,binding:W}))}else if(vQ)w6=z$(function(){let W=dB(J,O);return{wgsl:GJ(W.fragment),vertexWgsl:GJ(W.vertex),fragmentEntry:N5,binding:cJ,lane:!0}});else w6=z$(()=>({wgsl:cY(O,e.varyingsStruct),fragmentEntry:N5,binding:cJ,lane:!0}));let _Q=(W,R,q0,d0,O8,t0)=>GJ(Z6(gB(R,H8(K6,W),yQ===void 0,q0,d0,O8,t0),O.normalFace)),wX=function(W,R){let q0={...U8,slots:[...U8.slots]};return q0.slots[HB]=cj(W,R,r8),q0},gQ;if(bX)gQ=z$(function(){let W=BZ(_Q(U8,e,a,O$,HX),O.pathCut,y6),R=W.text;return{wgsl:R,fragmentEntry:W.named("fsSurface"),depthEntry:W.named("fsDepth"),...AQ?{apertureMaskEntry:W.named("fsApertureMask")}:{},...LQ?{eyesOwnerEntry:W.named("fsEyesOwner")}:{},...jJ?{materialDataEntry:W.named(s6)}:{},...qJ?{sampleFeedbackEntry:W.named(X6)}:{},...a?{coated:!0}:{},...CQ!==null?{ownLight:CQ}:{},keyParts:nB(kZ($,J,b0,N$,y$,R,S6,b6),s9)}});let HJ;if(k0&&mB(H0,J,$,e,z0,n8||R$||A$,i8)===void 0&&!D$)HJ=z$(function(){let W=zB(e.waterOver,A0?.fog?.viewZ??"-(frame.view * vec4<f32>(in.positionRender, 1.0)).z",A0?.fog?.toward??Q6),R=_Q(wX(FX(!0),s9),e,a,O$,!1,W);return{wgsl:R,colourEntry:"fsSeeThrough",surfaceEntry:"fsSeeThroughSurface",...L6?{throughDepthEntry:pJ}:{},...RQ?{throughCoverEntry:dJ}:{},...jJ?{materialDataEntry:s6}:{},...qJ?{sampleFeedbackEntry:X6}:{},...a?{coated:!0}:{},keyParts:[...kZ($,J,b0,N$,y$,R,S6,b6),"see-through"]}});let fQ;if(k0&&!bX&&L$&&!j&&J.pass.samples===1&&q6($)&&mY(H0,$)&&!e.lightingQueries&&!N9(e.modules))fQ=z$(function(){let W=wX(`lume_surfaceOut(N, albedo, ${WQ}, ${a9}, ${BQ}, emissiveColor)`,!1);return BZ(_Q(W,{...e,opts:{...e.opts,motion:!1}},!1,!1,!1),O.pathCut,y6).text});let hQ=[],EX=l8===null?null:{wgsl:O.materialBlocks?q9(KJ[d8.length]):KJ[d8.length],family:l8.family,storages:_8(s3,"storages")},_X=(W,R,q0)=>({wgsl:O.materialBlocks?q9(q0):q0,entryPoint:"main",workgroupSize:R.workgroupSize,count:R.count,storages:W.storages,arrays:W.arrays,textures:W.textures,storeTextures:W.storeTextures,wholeWorkgroups:W.barriers||VM.some((d0)=>W.inputsUsed.has(d0))});for(let W=0;W<d8.length;W+=1)hQ.push(_X(d8[W],H[W],KJ[W]));let gX=C$===null||D.stage===null?null:{..._X(C$,D.stage,KJ[d8.length+(l8===null?0:1)]),buffer:D.stage.buffer},SU=kZ($,J,b0,N$,y$,yX,S6,b6),FJ=k0&&J.lighting.discards===!0,fX=$.alphaTest>0||y.discards||FJ||O.laneCoverage||O.portalClip||i8||U0!==null,bU=B0.declaredFolds|(e.lightingQueries&&!e.tapsFromFoldDefs?pq():0);return{wgsl:yX,declaredFolds:bU,...J.motion?{motion:!0}:{},...GQ?{modelMaterial:!0}:{},...UQ?{skinnedModel:!0}:{},...O.flatWeld?{flatWeld:!0}:{},...IX?{casterWelds:!0}:{},...I$?{nativeVertexInputs:I$.surface}:{},...S6?{vertexWgsl:S6}:{},...SQ&&AX!==void 0?{vertexPositionProgram:AX,vertexPositionInputs:SQ.inputs}:{},...b6?{shadowVertexWgsl:b6}:{},uniformLayout:LU,textures:D0,textureVertexReads:D0.map((W)=>HQ.includes(W)),...o9?{sharedSamplers:i9}:{},symbols:RM(f),varyings:x$,vertexEntry:"vs",fragmentEntry:Z8.named("fs"),...AQ?{apertureMaskEntry:Z8.named("fsApertureMask")}:{},...LQ?{eyesOwnerEntry:Z8.named("fsEyesOwner")}:{},...DX?{eyesThroughEntry:Z8.named("fsEyesThrough")}:{},...SX!==void 0?{inkField:{wgsl:SX,vertexEntry:"vsInkField",fragmentEntry:"fsInkField"}}:{},...w6?{outlineMask:w6}:{},...gQ?{surfaceBuffer:gQ}:{},...HJ?{seeThrough:HJ}:{},...fQ?{lookPlane:fQ}:{},...HJ&&R6==="material.color"&&$._surfaceMap===null?{albedoIsColour:!0}:{},...UJ!==void 0?{lightOnceRefusal:UJ}:{},depthEntry:Z8.named("fsDepth"),...L6?{throughDepthEntry:Z8.named(pJ)}:{},...RQ?{throughCoverEntry:Z8.named(dJ)}:{},...jJ?{materialDataEntry:Z8.named(s6)}:{},...qJ?{sampleFeedbackEntry:Z8.named(X6)}:{},shadow:T8,blend:b0,...w0?{colourless:!0}:{},depthStencil:vU,cullMode:y$,...EQ?{wireframe:!0}:{},pipelineKeyParts:SU,writesVertexPosition:t!==null||J.skinned===!0,...O.vertexIndex?{readsVertexIndex:!0}:{},discards:fX||vX,...y6!==void 0?{discardsUncut:fX}:{},...FJ?{lightingDiscards:!0}:{},...$.alphaTest>0||y.discards||FJ||U0!==null?{ownCuts:!0}:{},doorWord:O.laneHide,materialBlocks:O.materialBlocks,sceneDepth:R$,throughMarks:A$,...BX?{loopMarks:!0}:{},...MX?{throughOccluded:!0}:{},...D$?{coversWhole:!0}:{},...L$&&$.alphaTest<=0&&!r8&&!y.discards&&!FJ&&!vX&&U0===null&&!w0?{hidesBehind:!0}:{},...rZ(J)?{cutsWord:!0}:{},sceneColor:n8,...k6?{sceneColorMips:!0}:{},...T6.length>0?{storages:T6}:{},...ZX.length>0?{arrays:ZX}:{},...hQ.length>0?{compute:hQ}:{},...EX!==null?{points:EX}:{},...gX!==null?{copies:gX}:{}}}function IM($,J){if(!$&&!J)return"albedo";return`(albedo${$?` * out_lightMap * ${h6}`:""}${J?" * out_ao":""})`}function NM($,J,Q,Z,X,j){if(!Q||J==="unlit"||J==="matcap")return $;let q=J==="pbr"||J==="physical"?` * (1.0 - ${X})`:"",V=j===null?"":` * (1.0 - clamp(${j}, 0.0, 1.0))`;return`(${$} + albedo${q}${V} * out_lightMap * ${h6}${Z?" * out_ao":""})`}function kM($,J,Q,Z){let X=`min(max(roughness, ${bq}), 1.0)`;if((Q&J5)!==0)return wq(Q,$,`${X} * clamp(2.0 * ${Z("ior")} - 2.0, 0.0, 1.0)`,{N:"N",V:"V",P:"P"},Z);let j=sq(J),q=X;if(j===0)q="0.0";else if(j!==1)q=`${X} * ${j}`;return`shade_transmissionSample(${$.texture}, ${$.sampler}, in.position.xy / frame.viewportSize, ${q})`}function xM($,J){let Q=aY($,J);for(;;){let Z=Q.next();if(Z.done===!0)return Z.value}}var eZ={sample:{name:"lume_shareSample",texture:"texture_2d<f32>",params:"uv: vec2<f32>",args:"uv",read:"textureSample"},level:{name:"lume_shareSampleLevel",texture:"texture_2d<f32>",params:"uv: vec2<f32>, lod: f32",args:"uv, lod",read:"textureSampleLevel"},sampleArray:{name:"lume_shareSampleArray",texture:"texture_2d_array<f32>",params:"uv: vec2<f32>, layer: i32",args:"uv, layer",read:"textureSample"},levelArray:{name:"lume_shareSampleLevelArray",texture:"texture_2d_array<f32>",params:"uv: vec2<f32>, layer: i32, lod: f32",args:"uv, layer, lod",read:"textureSampleLevel"}};function TM($,J,Q,Z){let X=new Set,j=[];for(let V=0;V<$.length;V+=1){if(!J[V])continue;let Y=Q.standing("texture",$[V].id),K=Q.standing("sampler",$[V].id);if(Y===void 0||K===void 0)continue;let z=$[V].dimension==="2d-array",G=rq(V),H=z?"sampleArray":"sample",U=z?"levelArray":"level";j.push([`textureSample(${Y}, ${K}, `,`${eZ[H].name}(${Y}, ${G}, `,H]),j.push([`textureSampleLevel(${Y}, ${K}, `,`${eZ[U].name}(${Y}, ${G}, `,U])}let q=function(V){let Y=V;for(let[K,z,G]of j){if(!Y.includes(K))continue;Y=Y.split(K).join(z),X.add(G)}return Y};for(let V of Z)V.body=q(V.body),V.fnDefs=q(V.fnDefs);return X}function OM($,J){let Q=$.slots.map((Z,X)=>`@group(2) @binding(${Z}) var lume_share${X}: sampler;`);Q.push(`@group(2) @binding(${$.words}) var<uniform> lume_samplerSlots: vec4<u32>;`);for(let Z of J){let X=eZ[Z],j=(V)=>`return ${X.read}(t, lume_share${V}, ${X.args});`,q=[];for(let V=1;V<iq;V+=1)q.push(`    case ${V}u: { ${j(V)} }`);Q.push(`fn ${X.name}(t: ${X.texture}, slot: u32, ${X.params}) -> vec4<f32> {
  switch slot {
${q.join(`
`)}
    default: { ${j(0)} }
  }
}`)}return Q.join(`
`)}function RM($){let J=function(Q,Z){let X=$.standing(Q,Z);if(X===void 0)throw Error(`lume: this material module binds no ${Q} ${Z}`);return X};return{uniform:(Q)=>J("uniform",Q),texture:(Q)=>({texture:J("texture",Q),sampler:J("sampler",Q)})}}var eY=tY;function _M($){let J=0.983729*$-1,Q=0.432951*$-0.0245786,Z=0.238081*$+0.000090537;return(-Q-Math.sqrt(Math.max(Q*Q-4*J*Z,0)))/(2*J)}var gM=_M(0),cw=0.6*gM;var fM={aces:0,neutral:1,none:2,linear:-4,reinhard:-1,cineon:-2,agx:-3},pw=new Map(Object.entries(fM));function $z($){return $<=0.0031308?$*12.92:Math.pow($,0.41666)*1.055-0.055}var a0=u0(Q7);var Jz=new WeakMap;var hM=0.21404114048223255,Qz=$z(hM);var Uz=0.01;var mM=2,Hz=30,b4=[0.2126,0.7152,0.0722],uM=[0.74,0.81,0.88],n5=0.00001;var p5=0.5,cM=2,pM=0.45;var U$=6.333333333333333,Fz=2*U$,u4=1.5;function dM($){let J=$*Fz;return Math.exp(-0.5*J*J/(U$*U$))}var f4=2.39996323,h4=(function(){let $=[],J=80;for(let Q=0;Q<80;Q+=1){if(Q%5===0)continue;let Z=Q*f4,X=Math.sqrt(Q)/Math.sqrt(80);$.push([X*Math.cos(Z),X*Math.sin(Z)])}return $})(),lM={low:16,medium:24,high:32,ultra:64},Zz=new Map;function nM($){let J=lM[$??"ultra"];if(J>=h4.length)return h4;let Q=Zz.get(J);if(!Q)Q=Array.from({length:J},function(Z,X){let j=Math.sqrt((X+0.5)/J);return[j*Math.cos(X*f4),j*Math.sin(X*f4)]}),Zz.set(J,Q);return Q}var iM=dQ,Xz=u0(`
fn lume_motion_blur_sky_velocity(uv: vec2<f32>) -> vec2<f32> {
  let ndc = vec2<f32>(uv.x * 2.0 - 1.0, 1.0 - uv.y * 2.0);
  let far = frame.inverseViewProj * vec4<f32>(ndc, 0.0, 1.0);
  let direction = far.xyz - frame.cameraPosition * far.w;
  let prev = frame.prevViewProj * vec4<f32>(direction, 0.0);
  if (prev.w <= 1e-6 || frame.motionValid < 0.5) { return vec2<f32>(0.0); }
  return ndc - prev.xy / prev.w;
}
fn lume_look_eye_velocity(uv: vec2<f32>, depth: f32) -> vec2<f32> {
  if (depth <= ${H$}) { return lume_motion_blur_sky_velocity(uv); }
  if (frame.motionValid < 0.5) { return vec2<f32>(0.0); }
  let ndc = vec2<f32>(uv.x * 2.0 - 1.0, 1.0 - uv.y * 2.0);
  let point = frame.inverseViewProj * vec4<f32>(ndc, depth, 1.0);
  let prev = frame.prevViewProj * vec4<f32>(point.xyz / point.w, 1.0);
  if (prev.w <= 1e-6) { return vec2<f32>(0.0); }
  return ndc - prev.xy / prev.w;
}
`);function Wz($,J,Q){let Z=$.depth?.sampleLevel(J,0).r;if(!Q)return Z?u(Xz,"lume_look_eye_velocity",[J,Z],"vec2f").mul(X0(0.5,-0.5)):X0(0,0);let j=($.velocity??p8(null)).sampleLevel(J,0).xy;if(Z)j=c0(Z.lessThanEqual(iM),u(Xz,"lume_motion_blur_sky_velocity",[J],"vec2f"),j);let q=($.motionAvailable??i(1)).mul(p("f32")`frame.motionValid`);return j.mul(X0(0.5,-0.5)).mul(q)}function i5($,J,Q){if(!$.resolve||$.scene===void 0||J===$.scene)return $.frame;return $.resolve(J,Q)}function s($,J){if(typeof $==="number")return i($0($)?$:J);return $??i(J)}function d5($,J){if(typeof $==="number"||$===void 0||$ instanceof P0)return s($,J);let Q=function(Z){let X=$[Z];return $0(X)?X:J};return M0(Q(0),Q(1),Q(2))}var I8=()=>p("vec2f")`frame.viewportSize`,o5=($,J)=>$.type==="vec4f"?D8(J($.rgb),$.a):J($);function F6($,J,Q){let Z=$.toVar();return s0(J,function(){Z.assign(Q(Z))}),Z}function Pz($,J,Q){return F6($,Q.greaterThanEqual(n5),(Z)=>o5(Z,function(X){let j=u(a0,"lume_srgb_encode",[x0(X,0)],"vec3f");return u(a0,"lume_srgb_decode",[x0(W8(j,J,Q),0)],"vec3f")}))}function oM($,J){return F6($,y9(J.sub(1)).greaterThanEqual(n5),(Q)=>o5(Q,function(Z){let X=u(a0,"lume_srgb_encode",[x0(Z,0)],"vec3f"),j=N0(X.sub(Qz).mul(J).add(Qz),0,1);return u(a0,"lume_srgb_decode",[j],"vec3f")}))}var w4=($)=>$.type==="vec3f"?H6(y9($),M0(1,1,1)):y9($);function rM($,J,Q,Z){let X=w4(J).add(w4(Z.sub(1))).add(w4(Q.sub(1)));return F6(N0($,0,1),X.greaterThanEqual(n5),(j)=>o5(j,function(q){let V=u(a0,"lume_srgb_encode",[q],"vec3f"),Y=N0(V.mul(Z.sub(J)).add(J),0,1),K=U6(Y,i(1).div(x0(Q,Uz)));return u(a0,"lume_srgb_decode",[K],"vec3f")}))}function aM($,J,Q,Z){let X=N0($.add(J),0,1),j=x0(i(1).add(Q),Uz),q=U6(X,i(1).div(j));return N0(q.mul(i(1).add(Z)),0,1)}var E4=($,J)=>$===void 0||$===J||Array.isArray($)&&$.length>0&&$.every((Q)=>Q===J);function Bz($,J){if($===void 0)return J<=0;return typeof $==="number"&&(!$0($)?J<=0:$<=0)}function sM($,J,Q){let Z=x0($,0);if(Q===void 0||Q===1)return Z;return F6(Z,y9(J.sub(1)).greaterThanEqual(n5),(X)=>o5(X,function(j){let q=p("f32")`frame.toneMap`,V=j.toVar();return s0(q.lessThan(-0.5),function(){s0(q.lessThan(-3.5),function(){V.assign(j.mul(x0(J,0)))}).ElseIf(q.lessThan(-2.5),function(){V.assign(u(a0,"lume_agx_reexpose",[j,J],"vec3f"))}).ElseIf(q.lessThan(-1.5),function(){V.assign(u(a0,"lume_cineon_reexpose",[j,J],"vec3f"))}).Else(function(){V.assign(u(a0,"lume_reinhard_reexpose",[j,J],"vec3f"))})}).Else(function(){V.assign(u(a0,"lume_tone_reexpose",[j,J,q],"vec3f"))}),V}))}function tM($,J={},Q,Z,X,j=!0){let q=X===Yz,V=s(J.exposure,1),Y=s(J.saturation,1),K=s(J.contrast,1),z=s(J.brightness,0),G=d5(J.lift,0),H=d5(J.gamma,q?0:1),U=d5(J.gain,q?0:1),F=s(J.temperature,0),M=s(J.tint,0),B=s(J.haze,0),D=J.hazeColor??Z??uM,C=D instanceof P0?D:M0(D[0],D[1],D[2]),P=M0(b4[0],b4[1],b4[2]),I=sM($,V,J.exposure),x=H6(I,P),T=W8(M0(x,x,x),I,Y),N=(j?oM(T,K):T).add(z),L=E4(J.lift,0)&&E4(J.gamma,1)&&E4(J.gain,1),S;if(q)S=aM(N,G,H,U);else S=L?N0(N,0,1):rM(N,G,H,U);let c=i(1).add(F.mul(p5)),f=i(1).sub(F.mul(p5)),r=i(1).add(M.mul(p5)),d=i(1).sub(M.mul(p5*0.5)),G0=N0(M0(S.x.mul(c).mul(d),S.y.mul(r),S.z.mul(f).mul(d)),0,1),E0=Q?N0(B,0,1).mul(qC(Q).smoothstep(mM,Hz)):N0(B,0,1),b0=Bz(J.haze,0)?G0:Pz(G0,C,E0);return N0(b0,0,1)}function eM($,J=0.3,Q=0.6,Z=1){return $}function $C($,J=0.3,Q={}){let Z=s(Q.roundness,cM),X=s(Q.feather,pM),j=J$().mul(2).sub(1),V=U6(U6(j.x.abs(),Z).add(U6(j.y.abs(),Z)),i(1).div(Z)).smoothstep(i(1).sub(X),1),Y=N0(s(J,0.3).mul(V),0,1),K=Q.color instanceof P0?Q.color:d5(Q.color??[0,0,0],0);return N0(Pz($,K,Y.mul(Y)),0,1)}function JC($){return H6($,X0(12.9898,78.233)).mod(L0).sin().mul(43758.5453).fract()}function jz($,J=0.2){let Q=s(J,0.2);return F6($,Q.notEqual(0),function(Z){let X=JC(J$().add(Kz).fract());return W8(Z,Z.add(Z.mul(N0(X.add(0.1),0,1))),Q)})}function QC($,J,Q=0.5){let Z=i5($,J,"chromaticAberration"),X=s(Q,0.5),j=i(1.1),q=X0(0.5,0.5),Y=I0.sub(q),K=Y.length(),z=i(1).add(j.mul(0.02).mul(X)),G=i(1).sub(j.mul(0.02).mul(X)),H=X.mul(K),U=q.add(Y.mul(z)).add(Y.mul(H).mul(0.01)),F=q.add(Y),M=q.add(Y.mul(G)).add(Y.mul(H).mul(-0.01)),B=Z.sampleLevel(U,0).r,D=Z.sampleLevel(F,0).g,C=Z.sampleLevel(M,0).b;return M0(B,D,C)}function ZC($,J=1.57,Q=1){let Z=s(J,1.57),X=s(Q,1),j=Z.sin(),q=Z.cos(),V=J$().mul(I8()),Y=X0(q.mul(V.x).sub(j.mul(V.y)),j.mul(V.x).add(q.mul(V.y))).mul(X),K=Y.x.sin().mul(Y.y.sin()).mul(4),G=$.r.add($.g).add($.b).div(3).mul(10).sub(5).add(K);return M0(G,G,G)}function XC($,J=0.5,Q=240){let Z=s(J,0.5);return F6($,Z.notEqual(0),function(X){let j=J$().y.mul(s(Q,240).mul(L0)).sin().mul(0.5).add(0.5);return X.mul(i(1).sub(j.mul(Z)))})}var jC=u0(`
${Gz}
${MJ}
fn lume_look_door_view_distance(d: f32, t: f32) -> f32 {
  let ratio = clamp(select(t, t - 0.5 - APERTURE_TIER_GAP, t >= 0.5) / (0.5 - APERTURE_TIER_GAP), 0.0, 1.0);
  let far = frame.proj[3][2] / max(frame.proj[2][2], 1e-9 * ${g4});
  let farRatio = select(d / max(far, d), 0.0, frame.proj[2][2] <= 0.0);
  return select(d / max(ratio, farRatio), d, t <= 0.0);
}
fn lume_look_view_z_through_door(zPhysical: f32, zScene: f32, viewZ: f32) -> f32 {
  if (zPhysical <= 0.0 || frame.sort2d > 0.5 || lume_aperture_has_no_band(zPhysical)) { return viewZ; }
  let share = ${g4};
  let opaque = lume_aperture_band(zPhysical, frame.proj, false, share);
  let d = opaque.z;
  if (zScene >= zPhysical) {
    let t = (zScene - zPhysical) / max(opaque.y, 1e-9 * share);
    if (t > 1.0 + 1e-3) { return viewZ; }
    return -lume_look_door_view_distance(d, min(t, 1.0));
  }
  let translucent = lume_aperture_band(zPhysical, frame.proj, true, share);
  if (zScene < translucent.x) { return viewZ; }
  let t = (zScene - translucent.x) / max(translucent.y, 1e-9 * share);
  return -lume_look_door_view_distance(d, min(t, 1.0));
}
fn lume_look_linear_view_z_through_door(zPhysical: f32, zScene: f32, near: f32, far: f32, ortho: f32, depthScale: f32) -> f32 {
  return lume_look_view_z_through_door(zPhysical, zScene, lume_view_z_of_depth(min(zScene * depthScale, 1.0), near, far, ortho, 1.0));
}
`);function qC($){return p("f32")`select(-(${$}), ${i(Hz)}, frame.sort2d > 0.5)`}var zE=jC.source;function VC($,J,Q,Z=10,X=5,j=1){let V=Q.negate().sub(s(Z,10)).abs().smoothstep(0,s(X,5)),Y=X0(i(1).div(I8().x),i(1).div(I8().y)).mul(s(j,1)).mul(V),K=i5($,J,"dof"),z=nM($.quality),G=K.sampleLevel(I0,0).rgb;for(let[F,M]of z)G=G.add(K.sampleLevel(I0.add(Y.mul(X0(F,M))),0).rgb);let H=G.div(z.length+1),U=N0(V.mul(2),0,1);return W8(J,H,U)}function YC($,J,Q=4){let Z=i5($,J,"pixelate"),X=x0(s(Q,4),1),j=p("f32")`frame.gridShare`,q=c0(j.lessThan(1),x0(w5(X.mul(j)),1),X),Y=I0.mul(I8()).div(q).floor().mul(q).add(q.mul(0.5)).div(I8()),K=Z.sampleLevel(Y,0);return Jz.set(K,Q),K.rgb}function qz($,J=1,Q=1,Z=1,X=0.5){if(Bz(X,0.5))return $;let j=u(a0,"lume_srgb_decode",[x0(M0(s(J,1),s(Q,1),s(Z,1)),0)],"vec3f");return $.mul(W8(M0(1,1,1),j,N0(s(X,0.5),0,1)))}var m4=18,zC=0.0625;function Vz($){let J=0;for(let Q=-m4;Q<=m4;Q+=1)J+=Math.exp(-0.5*Q*Q/(U$*U$));return Math.exp(-0.5*$*$/(U$*U$))/J}function KC($){if($===null||!$0($))return 1;let J=$*u4;if(!(J>1))return 1;return Math.max(zC,2**-Math.ceil(Math.log2(J)))}function GC($){if(typeof $==="number")return $;let J=$.meta;if(J.kind!=="uniform")return null;let Q=J.slot.value;return typeof Q==="number"?Q:null}function UC($,J,Q,Z){let X=Math.round(1/Z),j=X0(i(1).div(I8().x),i(1).div(I8().y)),q=$("blur.grid",Z,function(H){let U=Math.max(1,X/2),F=null;for(let M=0;M<U;M+=1)for(let B=0;B<U;B+=1){let D=X0(X===1?0:1+2*B-X/2,X===1?0:1+2*M-X/2),C=J.sampleLevel(H.add(D.mul(j)),0).rgb;F=F===null?C:F.add(C)}return D8(F===null?M0(0):F.div(U*U),1)});if(q===null)return null;let V=s(Q,0.5).mul(u4),Y=(H,U)=>function(F){let M=U.mul(V),B=H.sampleLevel(F,0).rgb.mul(Vz(0));for(let D=1;D<=m4;D+=1){let C=Vz(D);B=B.add(H.sampleLevel(F.add(M.mul(D)),0).rgb.add(H.sampleLevel(F.sub(M.mul(D)),0).rgb).mul(C))}return D8(B,1)},K=$("blur.across",Z,Y(q,X0(j.x,0)));if(K===null)return null;let z=$("blur.down",Z,Y(K,X0(0,j.y)));if(z===null)return null;let G=N0(V.mul(Z*2),0,1);return W8(J.sampleLevel(I0,0).rgb,z.sampleLevel(I0,0).rgb,G)}function HC($,J,Q=0.5){let Z=i5($,J,"blur"),X=KC(GC(Q));if(X<1&&$.hiddenPass){let Y=UC($.hiddenPass,Z,s(Q,0.5),X);if(Y!==null)return Y}let j=X0(i(1).div(I8().x),i(1).div(I8().y)).mul(s(Q,0.5).mul(u4*Fz)),q=Z.sampleLevel(I0,0).rgb,V=1;for(let[Y,K]of h4){let z=dM(q7(Y,K));q=q.add(Z.sampleLevel(I0.add(j.mul(X0(Y,K))),0).rgb.mul(z)),V+=z}return q.div(V)}var Mz='ctx.param() returns a shader NODE \u2014 use it inside shader expressions, not JS arithmetic (1 - 0.34 * dim is NaN when dim is a node). Compute in node space instead \u2014 float(1).sub(dim.mul(0.34)), with float from require("builtin/tsl") \u2014 or pass the param node straight through.';function S9($){if($===null)return"null";if($===void 0)return"undefined";if($ instanceof P0)return"a shader node";if(Array.isArray($))return"an array";if(typeof $==="string")return`a string (${JSON.stringify($)})`;if(typeof $==="boolean")return`a boolean (${String($)})`;return`a ${typeof $}`}function C8($,J,Q){throw Error(`${$}: ${J} ${Q}`)}function K0($,J,Q){if(Q===void 0||Q instanceof P0)return;if(typeof Q==="number"){if($0(Q))return;C8($,J,`is ${String(Q)}. ${Mz}`)}C8($,J,`must be a plain number or a shader node (a ctx.param() / builtin/tsl expression), got ${S9(Q)}.`)}function _4($,J,Q){let Z=zz(Q);if(!Z)C8($,J,`is not a colour (${JSON.stringify(Q)}) \u2014 write oklch("oklch(0.7 0.15 60)"), a CSS hex ("#ff8800"), rgb("rgb(255 136 0)"), hsl("hsl(30 100% 50%)"), a CSS colour name ("coral"), or an [r, g, b] literal.`);return[Z.r,Z.g,Z.b]}function Cz($,J,Q){if(!Array.isArray(Q)){K0($,J,Q);return}for(let Z=0;Z<Q.length;Z+=1){let X=Q[Z];if($0(X))continue;if(X instanceof P0)C8($,`${J}[${Z}]`,"is a shader node \u2014 build the whole color as ONE vec3 node (vec3(r, g, b) from builtin/tsl), or pass a plain [r, g, b] literal.");if(typeof X==="number")C8($,`${J}[${Z}]`,`is ${String(X)}. ${Mz}`);C8($,`${J}[${Z}]`,`must be a plain number, got ${S9(X)}.`)}}function Q8($,J,Q="color (the first argument)"){if(J instanceof P0)return;C8($,Q,`must be a color node \u2014 pass ctx.scene or a chained builtin/postfx result, got ${S9(J)}.`)}function l5($,J,Q){if(Q===void 0)return;if(typeof Q!=="object"||Q===null||Array.isArray(Q)||Q instanceof P0)C8($,"options",`must be an options object like ${J}, got ${S9(Q)}.`)}var FC=["exposure","saturation","contrast","brightness","temperature","tint","haze"],WC=["lift","gamma","gain","hazeColor"];function PC($){if(l5("grade","{ exposure: 1.05 }",$),!$)return;for(let J of FC)K0("grade",`option "${J}"`,$[J]);for(let J of WC)Cz("grade",`option "${J}"`,$[J])}function BC($){if(l5("vignette","{ color: [0.02, 0.02, 0.05] }",$),!$)return;K0("vignette",'option "roundness"',$.roundness),K0("vignette",'option "feather"',$.feather),Cz("vignette",'option "color"',$.color)}function Dz($){return{grade:function(J,Q){Q8("grade",J),l5("grade","{ exposure: 1.05 }",Q);let Z=Q?{...Q,hazeColor:typeof Q.hazeColor==="string"?_4("grade",'option "hazeColor"',Q.hazeColor):Q.hazeColor}:void 0;return PC(Z),tM(J,Z,$.hazeViewZ??$.viewZ,$.air,$.grammar)},bloom:(J,Q,Z,X)=>eM(J,Q,Z,X),vignette:function(J,Q,Z){Q8("vignette",J),K0("vignette","intensity",Q),l5("vignette","{ color: [0.02, 0.02, 0.05] }",Z);let X=Z?{...Z,color:typeof Z.color==="string"?_4("vignette",'option "color"',Z.color):Z.color}:void 0;return BC(X),$C(J,Q,X)},grain:function(J,Q){return Q8("grain",J),K0("grain","intensity",Q),jz(J,Q)},film:function(J,Q){return Q8("film",J),K0("film","intensity",Q),jz(J,Q)},chromaticAberration:function(J,Q){return Q8("chromaticAberration",J),K0("chromaticAberration","strength",Q),QC($,J,Q)},dotScreen:function(J,Q,Z){return Q8("dotScreen",J),K0("dotScreen","angle",Q),K0("dotScreen","scale",Z),ZC(J,Q,Z)},scanlines:function(J,Q,Z){return Q8("scanlines",J),K0("scanlines","intensity",Q),K0("scanlines","count",Z),XC(J,Q,Z)},dof:function(J,Q,Z,X,j){if(Q8("dof",J),!(Q instanceof P0))C8("dof","viewZ (the second argument)",`must be ctx.viewZ (the pass's linearized depth node), got ${S9(Q)}.`);return K0("dof","focusDistance",Z),K0("dof","focusRange",X),K0("dof","bokehScale",j),VC($,J,Q,Z,X,j)},pixelate:function(J,Q){return Q8("pixelate",J,"scene (the first argument)"),K0("pixelate","size",Q),YC($,J,Q)},tint:function(J,Q,Z,X,j){if(Q8("tint",J),typeof Q==="string"){let q=_4("tint","color (the second argument)",Q);return K0("tint","amount",Z),qz(J,q[0],q[1],q[2],Z)}return K0("tint","r",Q),K0("tint","g",Z),K0("tint","b",X),K0("tint","amount",j),qz(J,Q,Z,X,j)},blur:function(J,Q){return Q8("blur",J,"scene (the first argument)"),K0("blur","amount",Q),HC($,J,Q)}}}var N8=u0(`
${Nz}
${kz}
${xz}
fn lume_look_texel(uv: vec2<f32>, size: vec2<u32>) -> vec2<i32> {
  return vec2<i32>(min(vec2<u32>(max(uv, vec2f()) * vec2<f32>(size)), size - 1u));
}
fn lume_look_surface_texel(t: vec2<i32>, scene: vec2<u32>, size: vec2<u32>) -> vec2<i32> {
  return vec2<i32>(min(vec2<u32>((vec2<f32>(t) + 0.5) * vec2<f32>(size) / vec2<f32>(scene)), size - 1u));
}
fn lume_look_opened(d: f32) -> f32 {
  return select(d, d * 10.0 - 9.0, frame.proj[2][3] != 0.0 && d >= 0.9);
}
fn lume_look_kept(size: vec2<u32>) -> bool {
  return size.x > 1u;
}
fn lume_look_plane(words: vec2<u32>, glow: u32, surfaceDepth: f32, sceneDepth: f32, shading: bool) -> vec4<f32> {
  if (surfaceDepth != sceneDepth || lume_surfaceKind(words) == ${Iz+8}u) {
    return vec4<f32>(0.0);
  }
  if (shading || lume_surfacePlaneIsNormal(words)) {
    return vec4<f32>(lume_surfaceOctDecode(vec2<f32>(f32(words.x & 32767u), f32((words.x >> 15u) & 32767u)) / 32767.0), 1.0);
  }
  if (lume_surfacePlaneInEmissive(glow)) {
    return vec4<f32>(lume_surfaceEmissivePlane(glow), 1.0);
  }
  return vec4<f32>(0.0);
}
`);var c4=8,p4=4;var d4=18;var Tz=16,Oz=10,FE=Math.ceil(29),l4=-32768;var n4=12;var MC=p4*p4;var _0={shape:1,matters:2,tile:3,things:4,thingRows:5,drop:6,land:7,forget:8,room:9,announce:10,reach:11,eye:12,move:13,change:15,cellsText:21,cellsFill:22,cellsBodies:23,cellsAsk:24,cellsClock:25,cellsHeads:26};var CC=8,DC=20;var CE=c4*c4/2;var Rz=0.5,Az=8;var IE=DC+MC*CC;var IC=24,NC=new Uint16Array(0);var kC=function($){if($.byteLength<20)return null;let J=$.getUint32(8,!0);if(20+J*4>$.byteLength)return null;let Q=new Uint32Array(J);for(let Z=0;Z<J;Z+=1)Q[Z]=$.getUint32(20+Z*4,!0);return{kind:_0.change,epoch:$.getUint32(4,!0),words:Q,fold:$.getFloat64(12,!0)}};var xC=function($){let J=$.getUint16(22,!0),Q=J===0?NC:new Uint16Array(J);for(let Z=0;Z<J;Z+=1)Q[Z]=$.getUint16(IC+Z*2,!0);return{kind:_0.land,shell:$.getUint8(2),epoch:$.getUint32(4,!0),tx:$.getInt32(8,!0),tz:$.getInt32(12,!0),fill:$.getUint32(16,!0),first:$.getUint16(20,!0),to:Q}},TC=function($){if($.byteLength<8)return null;let J=$.getInt32(4,!0);return{kind:_0.room,cap:J<0?null:J,scale:1-$.getUint16(2,!0)/65535}},OC=function($){let J=[];for(let Q=0,Z=$.getUint16(2,!0);Q<Z;Q+=1)J.push($.getUint32(4+Q*4,!0));return{kind:_0.forget,fills:J}},RC=function($){if($.byteLength<8)return null;let J=$.getFloat32(4,!0);return{kind:_0.reach,top:Number.isFinite(J)?J:null}},AC=function($){if($.byteLength<3)return null;if($.getUint8(2)===0||$.byteLength<36)return{kind:_0.eye,at:null};return{kind:_0.eye,at:{x:$.getFloat64(4,!0),y:$.getFloat64(12,!0),z:$.getFloat64(20,!0),hold:$.getFloat64(28,!0)}}},NE={[_0.land]:xC,[_0.forget]:OC,[_0.room]:TC,[_0.reach]:RC,[_0.eye]:AC,[_0.change]:kC,[_0.move]:()=>({kind:_0.move})};var LC=16,vC=24,b9=64;var RE=b9*b9/32,vz=b9*b9;var yz=128;var AE=vC+n4*LC+vz+yz;var yC=32768,Sz=16384,SC=`struct ShellRow {
  slots: vec4u,
  metres: vec4f,
  anchor: vec4i,
  things: vec4i,
}
struct ShellsDraw {
  head: vec4u,
  eye: vec4f,
  far: vec4f,
  paint: vec4f,
  cover: vec4f,
  band: vec4f,
  rows: array<ShellRow, ${n4}>,
  near: array<vec4u, ${vz/4}>, //${b9}
  sunPass: array<vec4u, ${yz/4}>,
}`,bC=`
fn shell_wrap(a: i32, w: i32, inv: f32) -> i32 {
  var r = a - w * i32(floor(f32(a) * inv));
  r = select(r, r - w, r >= w);
  return select(r, r + w, r < 0);
}

fn shell_slot(k: u32, bx: i32, bz: i32) -> u32 {
  let row = shells.rows[k];
  let w = i32(row.slots.x);
  return u32(shell_wrap(bz, w, row.metres.z) * w + shell_wrap(bx, w, row.metres.z));
}

fn shell_record(k: u32, slot: u32) -> vec4u {
  let at = (shells.rows[k].slots.y + slot) * 4u;
  return vec4u(shellDir[at], shellDir[at + 1u], shellDir[at + 2u], shellDir[at + 3u]);
}

fn shell_column(k: u32, bx: i32, bz: i32) -> vec4u {
  return shell_record(k, shell_slot(k, bx, bz));
}

fn shell_key(bx: i32, bz: i32) -> u32 {
  return (u32(bx) & 0xffffu) | ((u32(bz) & 0xffffu) << 16u);
}

fn shell_present(e: vec4u, bx: i32, bz: i32) -> bool {
  return (e.y >> 16u) != 0u && e.x == shell_key(bx, bz);
}

fn shell_y0(e: vec4u) -> i32 {
  return (i32(e.y << 16u)) >> 16u;
}

fn shell_baseMatter(e: vec4u) -> u32 {
  return (e.w >> 16u) & ${65535&~(yC|Sz)}u;
}

//${l4}
fn shell_roofOf(e: vec4u, lx: i32, lz: i32) -> i32 {
  let q = u32(lz * 8 + lx);
  let w = shellDir[e.z + (e.y >> 16u) + (q >> 1u)];
  return i32(w << (16u * (1u - (q & 1u)))) >> 16u;
}`,bz=($)=>`
fn shell_nibble(slot: u32, l: vec3i) -> u32 {
  let index = u32((l.y * 8 + l.z) * 8 + l.x);
  let code = slot >> 24u;
${$?`  let raw = code == ${Tz}u;
  let bits = select(select(code, 4u, code == 0u), 32u, raw);`:"  let bits = select(code, 4u, code == 0u);"}
  let bit = index * bits;
  let at = (slot & 0xffffffu) * ${d4}u + ${$?`select(1u << (bits - 1u), ${Oz}u, raw)`:"(1u << (bits - 1u))"} + (bit >> 5u);
  let shift = bit & 31u;
  var cell = shellPool[at] >> shift;
  if (shift + bits > 32u) {
    cell |= shellPool[at + 1u] << (32u - shift);
  }
  return cell & ${$?"select((1u << bits) - 1u, 0xffffu, raw)":"((1u << bits) - 1u)"};
}`,LE=bz(!1),vE=bz(!0);var wC=`
fn shell_under(ro: vec3f) -> bool {
  let count = shells.head.x;
  for (var k = 0u; k < count; k = k + 1u) {
    let row = shells.rows[k];
    if (row.anchor.z == 0) {
      continue;
    }
    let b = row.metres.x * 8.0;
    let bx = i32(floor(ro.x / b)) + row.anchor.x;
    let bz = i32(floor(ro.z / b)) + row.anchor.y;
    let e = shell_column(k, bx, bz);
    if (shell_present(e, bx, bz)) {
      return i32(floor(ro.y / b)) < shell_y0(e) && (e.w >> 16u) != 0u;
    }
  }
  return false;
}
fn shell_drawnAt(d: f32) -> u32 {
  let count = shells.head.x;
  var drawn = 0u;
  loop {
    if (drawn + 1u >= count || shells.rows[drawn].metres.y > d) {
      break;
    }
    drawn++;
  }
  return drawn;
}
fn shell_tooCoarse(k: u32, drawn: u32, d: f32) -> bool {
  let c = shells.rows[k].metres.x;
  return k > drawn && shells.head.w == 0u && c > ${Rz} && c > ${Az}.0 * shells.far.y * d;
}
fn shell_underIn(k: u32, e: vec4u, ro: vec3f, coarse: bool) -> bool {
  let c = shells.rows[k].metres.x;
  let b = c * 8.0;
  return select(i32(floor(ro.y / b)) < shell_y0(e), ro.y + c < f32(shell_y0(e)) * b, coarse) && (e.w >> 16u) != 0u && (e.w & ${Sz<<16>>>0}u) == 0u;
}
fn shell_underLand(ro: vec3f) -> bool {
  let d = distance(ro, shells.eye.xyz);
  let drawn = shell_drawnAt(d);
  let count = shells.head.x;
  for (var k = 0u; k < count; k = k + 1u) {
    let row = shells.rows[k];
    if (row.anchor.z == 0) {
      continue;
    }
    let b = row.metres.x * 8.0;
    let bx = i32(floor(ro.x / b)) + row.anchor.x;
    let bz = i32(floor(ro.z / b)) + row.anchor.y;
    let e = shell_column(k, bx, bz);
    if (shell_present(e, bx, bz)) {
      return shell_underIn(k, e, ro, shell_tooCoarse(k, drawn, d));
    }
  }
  return false;
}`,wz=($,J,Q)=>`${SC}
@group(${$}) @binding(${J}) var<${Lz()}> shells: ShellsDraw;
@group(${$}) @binding(${Q}) var<storage, read> shellDir: array<u32>;
${bC}
${wC}`;var EC=3;function _C(){let Q=(gz()?.CELL_LIGHT_READ_WGSL??"")===""?"  return select(1.0, 0.0, shell_under(P - frame.cameraPosition + shells.eye.xyz + N * 0.05));":`  var past = 1.0;
  if (lighting_cellHeld(P, N) < 1.0 && shell_under(P - frame.cameraPosition + shells.eye.xyz + N * 0.05)) {
    past = 0.0;
  }
  return lighting_cellSkyAt(P, N, past);`;return`${wz(EC,0,1)}
fn lighting_skyVisibility(P: vec3<f32>, N: vec3<f32>) -> f32 {
${Q}
}`}function fz($,J){return u(Ez(_C),"lighting_skyVisibility",[r5($,"ctx.skyVisibility"),_z(J)],"f32")}var gC=[],i4=0,fC=!1;function hz(){let $=[];return gC.push({drop:function(){for(let J=0;J<$.length;J+=1)for(let Q of $[J].textures)Q.destroy();i4-=$.length,$.length=0},count:()=>$.length}),{release(J,Q,Z,X,j,q){if(!fC){for(let V of q)V.destroy();return}mb($,J,Q,Z,X,j,q);},takeBack(J,Q,Z,X){for(let j=0;j<$.length;j+=1){let q=$[j];if(q.device!==J||q.key!==Q||q.width!==Z||q.height!==X)continue;return $.splice(j,1),i4-=1,q.value}return null}}}var $_=hz();var mC={rgba16float:8,rgba8unorm:4,rgb10a2unorm:4};function o4($,J){let Q=p8(null,{wrap:$,...J===void 0?{}:{dimension:J}});return Q.sample=(Z)=>Q.sampleLevel(Z,0),Q}var t4=["clamp","repeat","mirror"],e4="lume.normal-plane";function mz(){return{targets:[],passes:[]}}function uz($,J,Q){if($.length===0)return[];let Z=new Set,X=new Set,j=function(z){let G=[z];while(G.length>0){let H=G.pop();if(H===void 0)break;if(X.has(H.id))continue;if(X.add(H.id),H.meta.kind==="varRead")Z.add(H.meta.variable.id);else if(H.meta.kind==="fnCall")V(H.meta.instance.body);for(let U=H.inputs.length-1;U>=0;U--)G.push(H.inputs[U])}},q=function(z){switch(z.kind){case"decl":j(z.init);break;case"assign":Z.add(z.variable.id),j(z.value);break;case"if":for(let G of z.branches){if(G.cond)j(G.cond);V(G.scope)}break;case"loop":j(z.start),j(z.end),V(z.scope);break;case"sideEffect":j(z.node);break;case"store":j(z.index),j(z.value);break;case"discard":if(z.cond)j(z.cond);break}};function V(z){for(let G of z.stmts)q(G)}let Y=function(z){switch(z.kind){case"decl":case"assign":return Z.has(z.variable.id);case"if":return z.branches.some((G)=>G.scope.stmts.some(Y));case"loop":return Z.has(z.counter.id)||z.scope.stmts.some(Y);case"sideEffect":case"store":case"discard":return!1}};j(J),V(Q);let K=[];for(let z=$.length-1;z>=0;z--){let G=$[z];if(!Y(G))continue;K.push(G),q(G)}return K.reverse()}function cz($,J){return uz($,J,{stmts:[]})}var uC=function($){if(typeof $!=="number"||!$0($)||$<=0)return 1;return $};var cC=h0("uvw","vec3f",{fragmentOnly:!0}),r4=function($){if(!$0($))return 1;return Math.max(1,Math.floor($))};function pz(){let $=[],J=[],Q=new Map,Z=null,X=new Map,j=[],q=function(z,G={},H=!1){if(Z)throw Error("ctx.target must be declared at the top level of look(ctx), not inside a pass's builder \u2014 declare the target first, then the pass that writes it");if(typeof z!=="string"||z.trim().length===0)throw Error("ctx.target(name) needs a non-empty string name \u2014 it names the target in errors and the frame graph");if($.some((c)=>c.name===z))throw Error(`ctx.target("${z}"): a target with that name is already declared \u2014 target names are unique per look`);let U=G.format??"rgba16float";if(!(U in mC)||U==="rgb10a2unorm"&&z!==e4)throw Error(`ctx.target("${z}"): unknown format "${String(U)}" \u2014 use "rgba16float" (default, HDR-safe) or "rgba8unorm" (half the memory for LDR data)`);let F=G.wrap??"clamp";if(!t4.includes(F))throw Error(`ctx.target("${z}"): unknown wrap "${String(F)}" \u2014 use "clamp" (default: edge texels extend past uv 1), "repeat" (tiles), or "mirror" (tiles with reflection)`);let M=G.width!==void 0||G.height!==void 0;if(M&&(G.width===void 0||G.height===void 0)){let c=G.width!==void 0?"width":"height",f=G.width!==void 0?"height":"width";throw Error(`ctx.target("${z}"): ${c} was given without ${f} \u2014 give both width and height, or use scale for a canvas-relative size`)}if(G.depth!==void 0&&!M)throw Error(`ctx.target("${z}"): depth was given without width and height \u2014 a volume is a fixed size: give width, height and depth`);let B=M?r4(typeof G.width==="number"?G.width:1):null,D=M?r4(typeof G.height==="number"?G.height:1):null,C=G.depth===void 0?null:r4(typeof G.depth==="number"?G.depth:1),P=M?null:uC(G.scale),I=a4(C===null?[1,1]:[1,1,1]),x=o4(F,C===null?void 0:"3d"),T={name:z,format:U,scale:P,fixedWidth:B,fixedHeight:D,fixedDepth:C,doubleBuffered:!1,ref:x,previousRef:null,sizeSlot:I.slot,writes:0,converted:H},N=function(){if(Z===T)throw Error(`look pass writing "${z}" cannot sample "${z}" itself (a texture cannot be read while it is being rendered) \u2014 read ${z}.previous for last frame's contents`)},L=x.sampleLevel.bind(x);x.sample=function(c){return N(),L(c,0)},x.sampleLevel=function(c,f){return N(),L(c,f)},Object.defineProperty(x,"size",{value:I.node,enumerable:!1,configurable:!0,writable:!1});let S={get previous(){if(C!==null)throw Error(`ctx.target("${z}") is a volume (depth ${C}), and a volume has no .previous \u2014 its pass fills it, and later passes read the node that pass returns`);return T.doubleBuffered=!0,T.previousRef??=o4(F),T.previousRef},size:I.node};return $.push(T),Q.set(S,T),S},V=function(z,G,H=[]){if(Z)throw Error("ctx.pass must be declared at the top level of look(ctx), not inside another pass's builder (pass order is declaration order)");let U=Q.get(z);if(!U)throw Error("ctx.pass(target, build): the first argument must be a target from ctx.target(...) of this same look build");if(typeof G!=="function")throw Error(`ctx.pass("${U.name}", build): build must be a function (uv) => colorNode`);let F=X.get(U);if(F!==void 0){X.delete(U);let C=new Map,P=new Map,I=(T)=>o0(T,C,function(){return},function(N,L){let S=N.meta;if(S.kind==="textureSample"&&S.texture===F.ref)return new P0(N.type,L,{...S,texture:U.ref});if(S.kind!=="fnCall"&&S.kind!=="voidCall")return S8(N,L);let c=P.get(S.instance)??l$(S.instance,x(S.instance.body),S.instance.returns&&I(S.instance.returns));return P.set(S.instance,c),c===S.instance?S8(N,L):new P0(N.type,L,{...S,instance:c})}),x=b8(I);for(let T of J)T.output=I(T.output),T.scope=x(T.scope);j.push({held:F,to:V(q(`${U.name}.held${j.length}`),()=>U.ref.sampleLevel(I0,0))})}let M=`look.pass${J.length}.${U.name}`;Z=U;let B,D;try{let C=a5(()=>G(U.fixedDepth===null?I0:cC)),P=C.result;if(!(P instanceof Object)||!("type"in P)||P.type!=="vec3f"&&P.type!=="vec4f"){let x=P===null?"null":typeof P;if(P instanceof Object&&"type"in P)x=String(P.type);throw Error(`ctx.pass("${U.name}") must return a vec3 or vec4 color node for the pixel it writes, got ${x}`)}B=Q0(P,"vec4f");let I=uz(H,B,C.scope);D=I.length>0?{stmts:[...I,...C.scope.stmts]}:C.scope}finally{Z=null}return U.writes+=1,J.push({name:M,target:U,output:B,scope:D}),U.ref};return{declareTarget:q,declarePass:V,finalize:function(){for(let z of $)if(z.writes===0&&z.doubleBuffered)throw Error(`look target "${z.name}" is read (.previous) but never written by any pass \u2014 declare a ctx.pass(${z.name}, ...) that writes it`);for(let[z,G]of X)j.push({held:G,to:z.ref});X.clear();for(let{held:z,to:G}of j)for(let H of z.reads)if(H.meta.kind==="textureSample")H.meta.texture=G;return{targets:$,passes:J}},atTopLevel:()=>Z===null,declared:()=>$.length+J.length,heldAs:function(z){let G=z.meta,H=z.inputs[1]?.meta;if(G.kind!=="textureSample"||G.mode!=="sampleLevel"||z.inputs[0]!==I0||H?.kind!=="const"||H.values[0]!==0)return null;let U=$.find((M)=>M.ref===G.texture);if(Z!==null||U===void 0||U.writes===0||U.scale!==1||U.format!=="rgba16float"||U.ref.wrap!=="clamp")return null;let F=X.get(U);if(F===void 0){let M=o4("clamp"),B=M.sampleLevel.bind(M),D=[];M.sampleLevel=function(C,P){let I=B(C,P);return D.push(I),I},F={ref:M,reads:D},X.set(U,F)}return F.ref}}}var pC={uv:"screenUv",screenUV:"screenUv",screenSize:"frame.viewportSize",time:"frame.worldTime",deltaTime:"frame.deltaTime",cameraPosition:"(frame.cameraPosition + frame.renderOrigin)"},u_={...pC,uvw:"passUvw"};var c_=[n0(0,2,"unfilterable-float")];var lC=new y8("fog"),Cg=new y8("fog-revision");var nC=function($){$.gpu?.buffer.release(),$.gpu=null},Dg=new y8("fog-horizon-gpu",nC);var bg=new Float64Array([NaN,NaN,NaN,0,0,0]);var iC={},oC={};var rC={presentedScene:iC,presentedLibrary:oC,presentedRef:null,active:null,movedOutside:!1};function dz(){return(rC.active?.floor??null)!==null}var Y0=(...$)=>({kind:"ints",fields:$}),aC=["cpu","gpu","gpuLook","apply","fence","pause","doorCpu","lookBack","presented","callback","presentationCpu","shared","shareScene","shareCanvas","passed","passSurface","passScene","passCanvas","passLook","passShadow","passSky","passFx","passFixed"],ug={1:{id:1,name:"meta",shape:{kind:"json"}},2:{id:2,name:"turn",shape:Y0("source","dInstantQ")},3:{id:3,name:"seed",shape:Y0("stream","w0","w1","w2","w3")},4:{id:4,name:"marker",shape:{kind:"json"}},5:{id:5,name:"pose",shape:Y0("dInstantQ","dX","dY","dZ","dQx","dQy","dQz","dQw","dLensScale","dLensDepthA","dLensDepthB","dLensOrtho")},6:{id:6,name:"slice",shape:Y0("site","units")},7:{id:7,name:"frame-stamp",shape:Y0("dStampQ")},8:{id:8,name:"turn-debug",shape:{kind:"json"}},9:{id:9,name:"decide",shape:Y0("dCalls","site")},10:{id:10,name:"read",shape:Y0("dCalls","site","dValue")},11:{id:11,name:"wait",shape:Y0("dCall","outcome")},12:{id:12,name:"kept",shape:Y0("dSerial","answer")},13:{id:13,name:"wall",shape:Y0("turns","dOffsetMs")},14:{id:14,name:"facts",shape:{kind:"json"}},15:{id:15,name:"chunk",shape:Y0("dSerial","length")},16:{id:16,name:"eval",shape:Y0("dSerial","turns")},18:{id:18,name:"word",shape:Y0("digest")},20:{id:20,name:"renderer-check",shape:Y0("turn","presented","applied","cameraRead","entities","draws","heldRows","sceneScaleMilli","decides","reads")},21:{id:21,name:"look-take",shape:Y0("dTakes","dWrites","dx","dy","wheel","span","dPeriod")},22:{id:22,name:"look",shape:Y0("dInstantQ","yawMicroRad","pitchMicroRad")},23:{id:23,name:"measure",shape:Y0("dTakes",...aC)},24:{id:24,name:"door-trail",shape:Y0("dTurns","code")},25:{id:25,name:"measure-land",shape:Y0("dTakes","passLand")},26:{id:26,name:"measure-load",shape:Y0("dTakes","load")},27:{id:27,name:"measure-shadow",shape:Y0("dTakes","sun","atlas","window")},28:{id:28,name:"measure-builds",shape:Y0("dTakes","freeMs","free","carryMs","carry")},50:{id:50,name:"sim-check",shape:Y0("tick","steps","writes","things","body","decides","reads")},51:{id:51,name:"sample",shape:{kind:"bytes"}},80:{id:80,name:"dom",shape:{kind:"bytes"}},81:{id:81,name:"dom-strings",shape:{kind:"bytes"}},82:{id:82,name:"host",shape:{kind:"bytes"}}};var lz=64;var tg=new Float64Array(lz),eg=new Int32Array(lz);var sC=!1;var tC=null;var eC=new Map;function $D($){return $.stages??$}function JD($,J){return $&&tC===J}function nz($,J){return JD(sC,$D(J))&&eC.has($)}var Q3="scripted-look-compile-failed",Z3="scripted-look-runtime-error";var iz="scripted-look-nonfinite-param";function QD(){return{scripts:{},delivered:!1}}var e5=QD();var t5=new Set;function ZD(){return{active:null,candidate:null,pending:!1}}var af=ZD();var oz=new WeakMap;function XD($,J=e5){let Q=J.scripts,Z=oz.get(J);if(Z?.scripts!==Q)Z={scripts:Q,entries:new Map},oz.set(J,Z);let X=Z.entries.get($);if(X!==void 0||Z.entries.has($))return X;let j=f9(Q,$);return Z.entries.set($,j),j}var jD=new Set,qD=new WeakMap;function VD($,J=e5){let Q=YD($,J),Z=_6(qD,J).get($);return Q!==void 0&&Z?.source===Q&&Z.reads}function az($,J=e5){let Q=rz();return $!==void 0&&(nz($,J)||dz())&&VD($,J)?"low":Q}var sz=($,J)=>`${$}@${J}`;function tz($){return jD.has($)}function YD($,J=e5){return XD($,J)?.hash}function h9($,J,Q,Z){let X=`${$}:${J}`;if(t5.has(X))return;t5.add(X),u$({code:$,key:`scripted-look:${J}`,message:Q,data:{scriptRef:J,...Z}})}var ez=new WeakMap;function zD($){if(typeof $==="string")return`the string ${JSON.stringify($)}`;return String($)}function $K($,J,Q,Z){let X=$??"look",j=`${iz}:${J}:${X}`;if(t5.has(j))return;t5.add(j);let q=`Look param "${J}" came through as ${zD(Q)}: the shader is using ${Z} (the binding's declared default) instead until a finite number arrives. A non-finite uniform can hang the GPU and take the whole world down, so it never ships; check the code that writes this param (look at its math for a divide-by-zero or 0/0).`;u$({code:iz,key:`scripted-look:nonfinite:${X}:${J}`,message:q,data:{scriptRef:X,param:J,value:String(Q)}})}function m9($,J){let Q=p8($,J);return Q.sample=(Z)=>Q.sampleLevel(Z,0),Q}function JK($){let J=p8($),Q=J.load,Z=function(X){let j=Q0(X,"vec2f"),q=Q0(J.size(),"vec2f");return Q(p("vec2i")`vec2<i32>(floor(${j} * ${q}))`)};return J.sample=Z,J.sampleLevel=(X)=>Z(X),J}function X3(){return m9(null,{dimension:"cube",...B1()?{}:{decodeSrgb:!0}})}var KD=12,GD=8;function C6(){return{hashes:0,noise:0,cellular:0,textureReads:0,worldPositions:0,lightQueries:0,ops:0}}function $Q($){return $.hashes+$.noise+$.cellular+$.textureReads+$.worldPositions+$.lightQueries}function M6($,J,Q){$.hashes+=J.hashes*Q,$.noise+=J.noise*Q,$.cellular+=J.cellular*Q,$.textureReads+=J.textureReads*Q,$.worldPositions+=J.worldPositions*Q,$.lightQueries+=J.lightQueries*Q,$.ops+=J.ops*Q}var UD=new Set(["const","input","attribute","uniform","varRead","swizzle","vertexStage"]);function HD($){let J=C6(),Q=$.meta;if(!UD.has(Q.kind))J.ops=1;if(Q.kind==="textureSample"){if(Q.mode!=="size")J.textureReads=1}else if(Q.kind==="wgslExpr"){let Z=Q.parts[0]??"";if(Z.startsWith("shade_hash11("))J.hashes=1;else if(Z.startsWith("shade_perlin3v("))J.noise=3;else if(Z.startsWith("shade_perlin3"))J.noise=1;else if(Z.startsWith("shade_fractal3("))J.noise=Math.max(0,jK($)??1);else if(Z.startsWith("shade_worley3(")||Z.startsWith("shade_worley3z0("))J.cellular=1;else if(Z.startsWith("lighting_point"))J.lightQueries=1;if(Q.parts.some((X)=>X.includes("frame.inverseViewProj")))J.worldPositions=1}return J}function jK($){let J=$.inputs[1];return J===void 0?null:ZK(J)}var FD=($)=>$.meta.kind==="wgslExpr"&&($.meta.parts[0]??"").startsWith("shade_fractal3(")&&jK($)===null,j3={by:1,conditional:!1};class q3{constructor($,J){this.sites=void 0;this.callees=void 0;this.uses=new Map;this.dependent=new Set;this.hoisted=new Set;this.tally={total:C6(),conditional:C6(),rows:new Map,blocks:new Map,uncounted:0};this.open=[];this.sites=$;this.callees=J}run($,J){if($)this.countScope($);for(let Q of J)this.countUses(Q);if($)this.walkScope($,j3);for(let Q of J)this.charge(Q,j3);return this.tally}countScope($){for(let J of $.stmts)switch(J.kind){case"decl":this.countUses(J.init);break;case"assign":this.countUses(J.value);break;case"if":for(let Q of J.branches){if(Q.cond)this.countUses(Q.cond);this.countScope(Q.scope)}break;case"loop":this.countUses(J.start),this.countUses(J.end),this.countScope(J.scope);break;case"sideEffect":this.countUses(J.node);break;case"discard":if(J.cond)this.countUses(J.cond);break}}countUses($){let J=this.uses.get($.id)??0;if(this.uses.set($.id,J+1),J>0)return;let Q=[{node:$,next:0}];while(Q.length>0){let Z=Q[Q.length-1];if(Z.next<Z.node.inputs.length){let j=Z.node.inputs[Z.next];Z.next+=1;let q=this.uses.get(j.id)??0;if(this.uses.set(j.id,q+1),q===0)Q.push({node:j,next:0});continue}let X=Z.node;if(X.meta.kind==="varRead"||X.inputs.some((j)=>this.dependent.has(j.id)))this.dependent.add(X.id);Q.pop()}}walkScope($,J){for(let Q of $.stmts)this.walkStmt(Q,J)}walkStmt($,J){switch($.kind){case"decl":this.charge($.init,J);return;case"assign":this.charge($.value,J);return;case"sideEffect":this.charge($.node,J);return;case"discard":if($.cond)this.charge($.cond,J);return;case"if":{let Q=this.openBlock();$.branches.forEach((Z,X)=>{if(Z.cond)this.charge(Z.cond,X===0?J:{...J,conditional:!0});this.walkScope(Z.scope,{...J,conditional:!0})}),this.closeBlock($,Q,{kind:"if",trips:null});return}case"loop":{if(this.charge($.start,J),this.charge($.end,J),$.trips===null)this.tally.uncounted+=1;let Q=this.openBlock();this.walkScope($.scope,{...J,by:J.by*($.trips??1)}),this.closeBlock($,Q,{kind:"loop",trips:$.trips});return}}}openBlock(){let $=C6();return this.open.push($),$}closeBlock($,J,Q){if(this.open.pop(),$Q(J)===0&&J.ops===0)return;let Z=XK($);this.mergeBlock($,{...Q,at:(Z===null?void 0:this.sites?.stmts.get(Z))??[],counts:J},1)}mergeBlock($,J,Q){let Z=this.tally.blocks.get($);if(!Z)Z={...J,counts:C6()},this.tally.blocks.set($,Z);M6(Z.counts,J.counts,Q)}charge($,J){let Q=new Set,Z=[{node:$,ctx:J}];while(Z.length>0){let X=Z.pop();if(X===void 0)break;let{node:j}=X;if(Q.has(j.id))continue;Q.add(j.id);let q=!this.dependent.has(j.id)&&(this.uses.get(j.id)??0)>1;if(q){if(this.hoisted.has(j.id))continue;this.hoisted.add(j.id)}let V=q?j3:X.ctx;this.chargeNode(j,V);for(let Y of j.inputs)Z.push({node:Y,ctx:V})}}chargeNode($,J){if(this.book(this.sites?.nodes.get($.id)??[],HD($),J),FD($))this.tally.uncounted+=1;if($.meta.kind!=="fnCall")return;let Q=WD($.meta.instance,this.sites,this.callees);for(let Z of Q.rows.values())this.book(Z.at,Z.counts,J);if(!J.conditional)M6(this.tally.conditional,Q.conditional,J.by);for(let[Z,X]of Q.blocks)this.mergeBlock(Z,X,J.by);this.tally.uncounted+=Q.uncounted}book($,J,Q){if($Q(J)===0&&J.ops===0)return;if(M6(this.tally.total,J,Q.by),Q.conditional)M6(this.tally.conditional,J,Q.by);for(let j of this.open)M6(j,J,Q.by);let Z=$.join(`
`),X=this.tally.rows.get(Z);if(!X)X={at:$,counts:C6()},this.tally.rows.set(Z,X);M6(X.counts,J,Q.by)}}function WD($,J,Q){let Z=Q.get($.id);if(Z)return Z;let X=new q3(J,Q).run($.body,$.returns?[$.returns]:[]);return Q.set($.id,X),X}var QK=($,J)=>$Q(J.counts)-$Q($.counts)||J.counts.ops-$.counts.ops;function V3($,J,Q=null){let Z=new Set;for(let q of J)q8(q,Z);let X=$===null?null:R9($,Z),j=new q3(Q,new Map).run(X,J);return{total:j.total,conditional:j.conditional,rows:[...j.rows.values()].sort(QK).slice(0,KD),blocks:[...j.blocks.values()].sort(QK).slice(0,GD),uncounted:j.uncounted}}function PD($,J){if(J===void 0||J===null)return{};if(typeof J!=="object"||Array.isArray(J))throw TypeError(`ctx.texture("${$}", opts): opts must be an options object like { wrap: "repeat" }, got ${Array.isArray(J)?"an array":typeof J}`);for(let Z of Object.keys(J))if(Z!=="wrap")throw Error(`ctx.texture("${$}"): unknown option "${Z}" \u2014 options are: wrap ("clamp" | "repeat" | "mirror")`);let Q=Reflect.get(J,"wrap");if(Q===void 0)return{};if(!t4.includes(Q))throw Error(`ctx.texture("${$}"): unknown wrap "${String(Q)}" \u2014 use "clamp" (default: edge texels extend past uv 1), "repeat" (tiles), or "mirror" (tiles with reflection)`);return{wrap:Q}}function BD($){let J=new Map,Q=new Map,Z=!1,X=!1,j=function(V,Y){let K=$.retainTexture(V,{measured:!0});if(!K)return;let z=K.lease;if(z===Y.current){K.release();return}let G=Y.retained;Y.current=z,Y.retained=K,G?.release();for(let H of Y.listeners)H(z)},q=function(V){let Y=J.get(V);if(Y)return Y;let K=$.holdTextureSampled?.([V])??null;if(X)K?.idle?.(!0);let z={current:null,retained:null,listeners:new Set,cancel:null,sampled:K,facts:BK(()=>K)};return J.set(V,z),$.noteTextureRank?.(V,eY),j(V,z),z.cancel=$.subscribe("texture",V,function(){if(!Z)j(V,z)}),z};return{retain(V){return q(V).current},retainOnLoad(V,Y){q(V).listeners.add(Y)},residencyOf(V,Y){let K=q(V);return Q.set(Y,K),K.facts},readsWhole(V){if(Z)return;for(let Y of V)Q.get(Y)?.sampled?.unmeasured?.(!0)},idle(V){if(Z||X===V)return;X=V;for(let Y of J.values())Y.sampled?.idle?.(V)},release(){if(Z)return;Z=!0;for(let V of J.values())V.cancel?.(),V.retained?.release(),V.sampled?.release(),V.listeners.clear();J.clear(),Q.clear()}}}function K8($,J){let Q=p("vec4f")`(frame.inverseViewProj * vec4<f32>(${$}.x * 2.0 - 1.0, 1.0 - ${$}.y * 2.0, ${J}, 1.0))`;return Q.xyz.div(Q.w)}function qK($,J){let Q=u(N8,"lume_look_texel",[J,$.size()],"vec2i"),Z=Q0(Q,"vec2f").add(0.5).div(Q0($.size(),"vec2f")),X=$.load(Q).x;return K8(c0(X.equal(0),J,Z),X)}function VK($){return p("f32")`(frame.view * vec4<f32>(${$}, 1.0)).z`}var YK=($)=>u(N8,"lume_look_opened",[$],"f32");function H3($,J){return c0(H6($,p("vec3f")`frame.cameraPosition`.sub(J)).lessThan(0),NK($),$)}function yK($,J,Q){let Z=X0(1,1).div(Q0($.size(),"vec2f")),X=Q0(u(N8,"lume_look_texel",[J,$.size()],"vec2i"),"vec2f").add(0.5).mul(Z),j=X0(Z.x,0),q=X0(0,Z.y),V=(G0)=>YK($.sampleLevel(G0,0).r),Y=YK(Q??$.sampleLevel(X,0).r),K=X.add(j),z=X.sub(j),G=X.add(q),H=X.sub(q),U=V(K),F=V(z),M=V(G),B=V(H),D=(G0,E0)=>G0.mul(2).sub(E0).sub(Y).abs(),C=X.x.add(Z.x.mul(2)).lessThan(1),P=X.x.sub(Z.x.mul(2)).greaterThan(0),I=X.y.add(Z.y.mul(2)).lessThan(1),x=X.y.sub(Z.y.mul(2)).greaterThan(0),T=C.and(P.not().or(D(U,V(X.add(j.mul(2)))).lessThan(D(F,V(X.sub(j.mul(2))))))),N=I.and(x.not().or(D(M,V(X.add(q.mul(2)))).lessThan(D(B,V(X.sub(q.mul(2))))))),L=K8(X,Y),S=c0(T,K8(K,U).sub(L),L.sub(K8(z,F))),c=c0(N,K8(G,M).sub(L),L.sub(K8(H,B))),f=IK(S,c),r=H3(f,L),d=r.length();return c0(d.greaterThan(0.000000000001),r.div(x0(d,0.000000000001)),M0(0,0,0))}function MD($,J,Q=!1){return PK(function([Z]){let X=u(N8,"lume_look_texel",[Z,$.size()],"vec2i"),j=$.load(X).x,q=M0(0,0,0).toVar();return s0(j.equal(0),function(){q.assign(p("vec3f")`normalize(vec3<f32>(frame.view[0][2], frame.view[1][2], frame.view[2][2]))`)}).Else(function(){let V=D8(0,0,0,0).toVar();s0(u(N8,"lume_look_kept",[J.words.size()],"bool"),function(){let Y=u(N8,"lume_look_surface_texel",[X,$.size(),J.words.size()],"vec2i"),K=J.depth.load(Y).x;s0(K.equal(j),function(){V.assign(u(N8,"lume_look_plane",[J.words.load(Y).xy,J.emissive.load(Y).x,K,j,DK(Q)],"vec4f"))})}),s0(V.w.greaterThan(0.5),function(){if(Q)return q.assign(V.xyz);let Y=V.xyz;q.assign(H3(Y,K8(Z,j)))}).Else(function(){q.assign(yK($,Z,j))})}),q})}function CD($){let J=p("vec4f")`(frame.prevViewProj * vec4<f32>(${r5(SK($),"ctx.previousUv")}, 1.0))`,Q=J.xy.div(x0(J.w,0.000001)).mul(X0(0.5,-0.5)).add(X0(0.5,0.5));return c0(p("bool")`(frame.motionValid > 0.5)`.and(J.w.greaterThan(0.000001)),Q,X0(-1,-1))}function Y3($,J,Q=["liquid"]){if(J===void 0||J===null)return{};if(typeof J!=="object"||Array.isArray(J))throw TypeError(`ctx.${$}(uv, opts): opts must be an options object like { ${Q.at(-1)}: true }, got ${Array.isArray(J)?"an array":typeof J}`);for(let Z of Object.keys(J)){if(!Q.includes(Z))throw Error(`ctx.${$}(uv): unknown option "${Z}" \u2014 options are: ${Q.join(", ")} (true | false)`);let X=Reflect.get(J,Z);if(X!==void 0&&typeof X!=="boolean")throw TypeError(`ctx.${$}(uv, { ${Z} }): ${Z} must be true or false, got ${typeof X}`)}return J}function z3($,J,Q){let Z=$.sampleLevel(Q,0).r,X=J.depth.sampleLevel(Q,0).r,j=X.greaterThanEqual(Z).and(X.greaterThan(0));return{raw:x0(X,Z),nearer:j}}function u9($,J){if(!JQ(J))throw TypeError(`ctx.${$}(uv) takes a uv node \u2014 the uv a ctx.pass builder receives, or screenUV from builtin/tsl. Got ${J===null?"null":typeof J}.`);return SK(Q0(J,"vec2f"))}function SK($){return q8($).size>0?$.toVar():$}function DD($,J,Q,Z,X,j,q,V,Y){let K=new Map,z=function(P){if(!q.reads.has(P))q.reads.set(P,Q[P])},G=new Proxy(Q,{get:function(P,I,x){if(typeof I==="string")z(I);return Reflect.get(P,I,x)},has:function(P,I){if(typeof I==="string")z(I);return Reflect.has(P,I)},ownKeys:function(P){q.enumerated=!0;for(let I of Object.keys(P))z(I);return Reflect.ownKeys(P)}}),H=null,U=[],F=function(P,I=!1){if(!J.surface)return yK(J.depth,P);return(U[+I]??=MD(J.depth,J.surface,I))(P)},M,B=function(){try{let P=V.declareTarget(e4,{format:"rgb10a2unorm"});return V.declarePass(P,(I)=>D8(F(Q0(I,"vec2f")).mul(0.5).add(0.5),1))}catch{return null}};function D(P,I){let x=Q[P]??I??0;if(typeof x==="string")return z(P),x;let T=K.get(P);if(T)return T;q.uniformKeys.add(P);let N=LK(typeof I==="string"?void 0:I),L=0;if(typeof x==="boolean")L=x?1:0;else if($0(x))L=x;else L=N,$K($,P,x,N);let S=QQ(L),c=ZQ(S);if(c)Z[P]=c,ez.set(c,N);return K.set(P,S),S}let C=function(P){let I=u9("normal",P);if(P===I0||!V.atTopLevel())return F(I);if(M===void 0)M=B();if(M===null)return F(I);return M.load(p("vec2i")`vec2<i32>(floor(${I} * ${M.size}))`).xyz.mul(2).sub(1)};return{scene:J.scene,depth:J.depth,viewZ:J.env.viewZ,get velocity(){return Y.read=!0,H??=Wz({...J.env,depth:J.depth},I0,Y.tier!=="low"),H},worldPosition(P,I){let x=u9("worldPosition",P),T=J.env.throughDoorsAt,N=Y3("worldPosition",I).liquid&&J.liquid?z3(J.depth,J.liquid,x):null,L=N?K8(x,N.raw):qK(J.depth,x);if(!T)return G3(L);let S=VK(L),c=T(x,S).div(S.min(-0.000001)),f=N?c0(N.nearer,1,c):c,r=p("vec3f")`frame.cameraPosition`,d=r.add(L.sub(r).mul(f));return G3(d)},viewZAt(P,I){let x=u9("viewZAt",P),T=Y3("viewZAt",I).liquid&&J.liquid?z3(J.depth,J.liquid,x):null,N=VK(T?K8(x,T.raw):qK(J.depth,x)),L=J.env.throughDoorsAt;if(!L)return N;return T?c0(T.nearer,N,L(x,N)):L(x,N)},previousUv(P){if(!JQ(P))nb(P);return CD(P)},normal(P,I){let{liquid:x,shading:T}=Y3("normal",I,["liquid","shading"]),N=T?F(u9("normal",P),!0):C(P);if(x&&J.liquid){let L=u9("normal",P),{raw:S,nearer:c}=z3(J.depth,J.liquid,L),f=J.liquid.normal.sampleLevel(L,0).xyz,r=H3(f,K8(L,S)),d=r.length();return c0(c.and(d.greaterThan(0.000001)),r.div(x0(d,0.000001)),N)}return N},skyVisibility:fz,cube:J.cube??X3(),cover:J.cover??m9(null),additive:J.additive??m9(null),data:J.data??JK(null),params:G,param:D,texture(P,I){let{wrap:x}=PD(P,I),T=j?.retain(P)??null,N=m9(T,{flipY:!0,wrap:x});if(N._measured=!0,j)N._residency=j.residencyOf(P,N);if(X.push(N),j)j.retainOnLoad(P,function(L){N.handle=L,J.onTextureLoaded?.(N)});return N},target(P,I){return V.declareTarget(P,I)},pass(P,I){return V.declarePass(P,I,D6().stmts.slice())},device:vK(Y.tier,function(){Y.read=!0}),get quality(){return Y.read=!0,Y.tier}}}function ID($){return typeof $==="function"}var ND={f32:{write:($)=>D8($,0,0,1),read:($)=>$.x},vec2f:{write:($)=>D8($,0,1),read:($)=>$.xy},vec3f:{write:($)=>$,read:($)=>$.xyz},vec4f:{write:($)=>$,read:($)=>$}};function kD($,J){let Q=[$];T0({stmts:[...J]},Q);let Z=new Set,X=function(j){if(j.meta.kind!=="textureSample"||j.meta.mode==="size")return!1;if(j.meta.mode==="load")return!0;let q=j.inputs[0].meta;return!(q.kind==="input"&&(q.name==="screenUV"||q.name==="uv"))};return Q.some((j)=>z8(j,Z,X))}function xD($,J){let Q=[$];T0({stmts:[...J]},Q);let Z=new Set,X=new Set,j=(V)=>V.meta.kind==="input"&&(V.meta.name==="screenUV"||V.meta.name==="uv"),q=function(V){if(V.meta.kind!=="fnCall"&&V.meta.kind!=="voidCall")return!1;let Y=V.meta.instance.returns===null?[]:[V.meta.instance.returns];return T0(V.meta.instance.body,Y),Y.some((K)=>z8(K,X,j))};return Q.some((V)=>z8(V,Z,q))}var zK="frame.prevViewProj";function JQ($){if(!$||typeof $!=="object")return!1;let J=$;return typeof J.add==="function"&&typeof J.type==="string"&&typeof J.meta==="object"&&J.meta!==null}function bK($,J,Q,Z,X,j){let q=wK($,J,Q,Z,X,j);for(;;){let V=q.next();if(V.done)return V.value}}function*wK($,J,Q,Z,X,j){let q={},V=[],Y={reads:new Map,enumerated:!1,uniformKeys:new Set},K=pz(),z={tier:az(J),read:!1},G=0,H=function(b,g){let n=K.heldAs(b);if(n!==null)return n;let _;try{_=K.declareTarget(`${g}.upstream${G++}`)}catch(a){throw Error(`${g}: the stage before it cannot be resolved inside a ctx.pass builder \u2014 pass ctx.scene there, or sample a target an earlier pass wrote (${L8(a)})`)}return K.declarePass(_,()=>b,D6().stmts.slice())},U=0,F=function(b,g,n){if(x===null||D6()!==x||!K.atTopLevel())return null;try{return K.declarePass(K.declareTarget(`${b}${U++}`,{scale:g}),n,x.stmts.slice())}catch{return null}},M=kK("builtin/postfx",Dz({...Z.env,scene:Z.scene,resolve:H,hiddenPass:F}),J),B=mz(),D=[],C=new WeakMap,P=null,I=Z.cube??X3(),x=null,T=0,N=new Map,L=0,S=tz(sz(J,$.hash)),c=function(b,g){if(S||MK(b))return null;let n=N.get(b);if(n!==void 0)return n(g);let _=x,a=ND[b.type];if(_===null||a===void 0||D6()!==_||!K.atTopLevel())return null;let H0=cz(_.stmts,b);if(!kD(b,H0)||xD(b,H0))return null;let B0;try{B0=K.declarePass(K.declareTarget(`convertToTexture${L++}`,void 0,!0),()=>a.write(b),_.stmts.slice())}catch{return null}let k0=(y)=>a.read(B0.sample(y));return N.set(b,k0),k0(g)},f=function(b,g,n){let _=function(...a){let H0=T===0&&P!==null&&a.length===1&&a[0]===P&&x!==null&&D6()===x&&K.atTopLevel()?x:null,B0=H0?.stmts.length??0,k0=K.declared();T+=1;try{let y=Reflect.apply(g,this,a);if(H0!==null)D.push({path:b,output:JQ(y)?y:null,from:B0,to:H0.stmts.length,declares:K.declared()!==k0,text:n});return y}finally{T-=1}};return C.set(_,g),_},r={stmts:[]};x=r;let d=(b)=>c$(r,function(){U3(M);let g=K3(c);try{return b()}finally{U3(null),K3(g)}}),G0=d(function(){try{let b=GK(j,$,J),g=function(a,H0){let B0=H0.look;if(ID(B0)&&!C.has(B0))H0.look=f(UK(a),B0,f9(b,a))},_=new j.ModuleRuntime({read:(a)=>f9(b,a),builtins:j.builtins,sandbox:FK,executed:g}).boot(WK(b,J)??J).look;return{looker:(typeof _==="function"?C.get(_):void 0)??_}}catch(b){let g=L8(b);return h9(Q3,J,`Look script "${J}" failed to compile: ${g}`,{error:g}),null}});if(G0===null)return null;let E0=G0.looker;if(typeof E0!=="function")return ob(J);yield"script";let b0=d(function(){try{P=DD(J,Z.cube===I?Z:{...Z,cube:I},Q??{},q,V,X,Y,K,z),HK();let b=E0(P);return B=K.finalize(),{candidate:b}}catch(b){let g=L8(b),n=OK(b);return h9(Z3,J,`Look script "${J}" threw while composing the look${n?` (${n})`:""}: ${g}. The look that stood before it keeps presenting until a save compiles.`,{error:g,...n?{frame:n}:{}}),null}});if(b0===null)return null;let z0=b0.candidate;if(!JQ(z0))return pb(J,z0);let U0=z0;yield"walk";let w0=[U0];T0(r,w0);for(let b of B.passes)w0.push(b.output),T0(b.scope,w0);let A=new Set;for(let b of w0)z8(b,A,()=>!1);V.push(...xK(A,X,Z.onTextureLoaded));let v=U0===Z.scene,E=RK(A),w={clock:E.clock,windTravel:E.windTravel,history:B.targets.some((b)=>b.doubleBuffered),audio:E.audio},h=new Map,J0=!1,l=!1;for(let b of A){let g=b.meta;if(g.kind==="textureSample"){if(g.texture===I)l=!0;continue}if(g.kind!=="wgslExpr"||J0)continue;let n=g.parts.some((a)=>a.includes(zK)),_=g.module;if(!n&&_!==null){let a=h.get(_);if(n=a??_.source.includes(zK),a===void 0)h.set(_,n)}if(n)J0=!0}return X?.readsWhole(AK(A)),{output:U0,scope:r,uniforms:q,textures:V,rawParams:Y,passGraph:B,hash:$.hash,passthrough:v,readsQuality:z.read,moves:w,previousCamera:J0,cube:l,...D.length>0?{whole:D}:{}}}var KK=3,TD=function(){let $=TK(KK+1);return $.filter((J,Q)=>Q===0||J!==$[Q-1]).slice(0,KK)};function OD($,J,Q,Z,X){let{result:j,sites:q}=CK(TD,()=>bK($,J,Q,Z,null,X));if(!j)return null;return{present:V3(j.scope,[j.output],q),passes:j.passGraph.passes.map((V)=>({name:V.name,target:V.target,census:V3(V.scope,[V.output],q)}))}}var EK=`fn env_cubeFaceDirection(face: u32, uv: vec2<f32>) -> vec3<f32> {
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
}`;var bh={[g9]:"color",[B6]:"gradient",[I6]:"physical",[XQ]:"equirect"};var F3=8;var ch=-Math.log(qQ)/jQ,RD=cK*$3/dK,AD=0.06,LD=0.3,vD=0.42,yD=`
const SKY_CLOUD_UNITS_PER_M: f32 = ${pK};
const SKY_CLOUD_PSEUDO_THICKNESS: f32 = ${jQ};
const SKY_CLOUD_EROSION: f32 = ${C3};
const SKY_CLOUD_POWDER: f32 = ${S3};
const SKY_CLOUD_BELLY_AMBIENT: f32 = ${P3};
const SKY_CLOUD_BELLY_SKY: f32 = ${B3};
const SKY_CLOUD_GROUND_BOUNCE: f32 = ${x3};
const SKY_CLOUD_EDGE: f32 = ${mK};
const SKY_CLOUD_EROSION_REACH: f32 = ${D3};
const SKY_CLOUD_SLICE_EDGE: f32 = ${g3};
const SKY_CLOUD_SLICE_DEPTH: f32 = ${_3};
const SKY_CLOUD_SLAB_REACH_M: f32 = ${w3};
const SKY_CLOUD_FADE_NEAR: f32 = ${k3};
const SKY_CLOUD_FADE_FAR: f32 = ${I3};
const SKY_CLOUD_FADE_FLOOR_M: f32 = ${N3};
const SKY_CLOUD_SLAB_OD: f32 = ${b3};
const SKY_CLOUD_MIN_STEP_M: f32 = ${A3};
const SKY_CLOUD_OPAQUE_T: f32 = ${qQ};
const SKY_CLOUD_DOME_POWER: f32 = ${M3};
const SKY_CLOUD_LOBE_TOP: f32 = ${O3};
const SKY_CLOUD_LOBE_WAIST: f32 = ${R3};
const SKY_CLOUD_LIGHT_EDGE: f32 = ${T3};
const SKY_CLOUD_SLAB_SKIN: f32 = ${E3};
const SKY_CLOUD_MOON_ILLUMINANCE: f32 = ${RD};
const SKY_CLOUD_MOON_DECK_LIGHT: f32 = ${AD};
const SKY_CLOUD_MOON_BEAM: f32 = 0.036;
const SKY_SUN_TO_MOON_HANDOVER_START: f32 = ${fK};
const SKY_SUN_TO_MOON_HANDOVER_END: f32 = ${gK};

fn sky_cloudFieldWrapUv(windowUv: vec2<f32>, phase: vec2<f32>, dims: vec2<u32>) -> vec2<f32> {
  let span = max(vec2<f32>(dims) - 1.0, vec2<f32>(1.0));
  let s = windowUv * span + phase - 0.5;
  return (s - floor(s / span) * span + 0.5) / vec2<f32>(dims);
}

fn sky_cloudFieldRim(fieldUv: vec2<f32>) -> f32 {
  return 1.0 - smoothstep(0.46, 0.5, max(abs(fieldUv.x - 0.5), abs(fieldUv.y - 0.5)));
}

fn sky_cloudFieldFarOf(far: vec4<f32>) -> vec3<f32> {
  return vec3<f32>(fma(far.a, ${hK}, far.r), far.gb);
}

fn sky_cloudClosing() -> f32 {
  return smoothstep(${W3}, 1.0, sky.cloudsCoverage);
}

fn sky_cloudSheet() -> f32 {
  return select(0.0, 1.0 - sky.cloudsCoverage + ${uK} * sky_cloudClosing(), sky.cloudsCoverage > ${W3});
}

fn sky_cloudFieldOf(tap: vec3<f32>) -> f32 {
  return max(tap.r, sky_cloudSheet());
}

fn sky_cloudDensity(field: f32) -> f32 {
  let threshold = 1.0 - sky.cloudsCoverage;
  return clamp((field - threshold) / SKY_CLOUD_EDGE, 0.0, 1.0);
}

fn sky_cloudPlanePos(world: vec3<f32>) -> vec2<f32> {
  return world.xz * SKY_CLOUD_UNITS_PER_M - sky.cloudFieldDrift;
}

fn sky_moonShines() -> bool {
  return normalize(sky.sunDirection).y < SKY_SUN_TO_MOON_HANDOVER_START && sky.moonEnabled > 0.5;
}

fn sky_lightBody() -> vec3<f32> {
  return select(normalize(sky.sunDirection), normalize(sky.moonDirection), sky_moonShines());
}

fn sky_cloudClear(a: f32) -> f32 {
  return clamp((1.0 - a - SKY_CLOUD_OPAQUE_T) / (1.0 - SKY_CLOUD_OPAQUE_T), 0.0, 1.0);
}
`,_K=`  let tSilhouette = min(select(1e9, tBase, tBase > 0.0), select(1e9, tTop, tTop > 0.0));
  let sliceFade = 1.0 - smoothstep(max(SKY_CLOUD_FADE_NEAR * faceHeight, SKY_CLOUD_FADE_FLOOR_M), max(SKY_CLOUD_FADE_FAR * faceHeight, SKY_CLOUD_FADE_FLOOR_M * 3.0), tSilhouette);`,lK=`${yD}
fn sky_cloudFieldFarTap(planePos: vec2<f32>) -> vec3<f32> {
  let fieldUv = (planePos - sky.cloudFieldCenter) * sky.cloudFieldInvWidth + 0.5;
  return sky_cloudFieldFarOf(textureSampleLevel(cloudField, lutSampler, sky_cloudFieldWrapUv(fieldUv, sky.cloudFieldPhase, textureDimensions(cloudField)), 0.0)) * sky_cloudFieldRim(fieldUv) * step(1e-6, sky.cloudFieldInvWidth);
}

const SKY_CLOUD_NEAR_FINE: f32 = ${LD};
const SKY_CLOUD_NEAR_HANDOVER: f32 = ${vD};

fn sky_cloudFieldTap(planePos: vec2<f32>, withNear: bool) -> vec3<f32> {
  let nearUv = (planePos - sky.cloudNearCenter) * sky.cloudNearInvWidth + 0.5;
  let nearRadius = length(nearUv - 0.5);
  let nearWeight = (1.0 - smoothstep(SKY_CLOUD_NEAR_HANDOVER, 0.5, nearRadius)) * step(1e-6, sky.cloudNearInvWidth);
  let farOnly = !withNear || nearWeight <= 0.0;
  var nearTap = vec3<f32>(0.0);
  if (!farOnly) {
    let near = textureSampleLevel(cloudFieldNear, lutSampler, sky_cloudFieldWrapUv(nearUv, sky.cloudNearPhase, textureDimensions(cloudFieldNear)), 0.0);
    nearTap = vec3<f32>(mix(near.r, near.a, smoothstep(SKY_CLOUD_NEAR_FINE, SKY_CLOUD_NEAR_HANDOVER, nearRadius)), near.g, near.b);
  }
  let far = sky_cloudFieldFarTap(planePos);
  return select(mix(far, nearTap, nearWeight), far, farOnly);
}

fn sky_cloudField(planePos: vec2<f32>) -> f32 {
  return sky_cloudFieldOf(sky_cloudFieldTap(planePos, true));
}

fn sky_moonIlluminance() -> vec3<f32> {
  let nightFactor = 1.0 - smoothstep(SKY_SUN_TO_MOON_HANDOVER_END, SKY_SUN_TO_MOON_HANDOVER_START, normalize(sky.sunDirection).y);
  return sky.moonColor * sky.moonIntensity * sky.moonEnabled * SKY_CLOUD_MOON_ILLUMINANCE * nightFactor;
}

fn sky_moonDeck() -> vec3<f32> {
  return sky_moonIlluminance() * max(normalize(sky.moonDirection).y, 0.0) * SKY_CLOUD_MOON_DECK_LIGHT;
}

fn sky_cloudPlaneDistance(direction: vec3<f32>, planeY: f32) -> f32 {
  let rise = planeY - sky.cloudEye.y;
  return rise / select(direction.y, 1e-4, abs(direction.y) < 1e-4);
}

fn sky_cloudFill(field: f32) -> f32 {
  return clamp((field - (1.0 - sky.cloudsCoverage)) / max(sky.cloudsCoverage, 1e-3), 0.0, 1.0);
}

fn sky_lobeProfile(z: f32) -> f32 {
  let reach = select(SKY_CLOUD_LOBE_TOP - SKY_CLOUD_LOBE_WAIST, SKY_CLOUD_LOBE_WAIST, z < SKY_CLOUD_LOBE_WAIST);
  return pow(abs(z - SKY_CLOUD_LOBE_WAIST) / reach, SKY_CLOUD_DOME_POWER);
}

fn sky_lobeHeight(fill: f32) -> f32 {
  return SKY_CLOUD_LOBE_WAIST + pow(fill, 1.0 / SKY_CLOUD_DOME_POWER) * (SKY_CLOUD_LOBE_TOP - SKY_CLOUD_LOBE_WAIST);
}

fn sky_slabColumn(planePos: vec2<f32>, z: f32, edge: f32, near: bool) -> f32 {
  if (z <= 0.0 || z >= 1.0) {
    return 0.0;
  }
  let tap = sky_cloudFieldTap(planePos, near);
  let dome = sky_lobeProfile(z) * sky.cloudsCoverage;
  let excess = sky_cloudFieldOf(tap) - (1.0 - sky.cloudsCoverage);
  let margin = excess - dome;
  if (margin <= 0.0) {
    return 0.0;
  }
  let s = smoothstep(0.0, 1.0, z);
  let detail = clamp((mix(tap.g, tap.b, s) - 0.5) * inverseSqrt(1.0 - 2.0 * s * (1.0 - s)) + 0.5, 0.0, 1.0);
  let shell = 1.0 - smoothstep(0.0, SKY_CLOUD_EROSION_REACH, margin);
  let erode = SKY_CLOUD_EROSION * SKY_CLOUD_EROSION_REACH * mix(0.6, 1.0, z) * (1.0 - detail) * shell * smoothstep(0.0, SKY_CLOUD_EROSION_REACH, excess);
  return clamp((margin - erode) / edge, 0.0, 1.0) * smoothstep(0.0, 0.05, z);
}

fn sky_cloudPhases(cosTheta: f32) -> array<f32, ${F$}> {
  var phases = array<f32, ${F$}>();
  var eccentricity = 1.0;
  for (var k = 0u; k < ${F$}u; k = k + 1u) {
    phases[k] = atm_henyeyGreensteinPhase(cosTheta, 0.8 * eccentricity) * 0.8 + atm_henyeyGreensteinPhase(cosTheta, -0.2 * eccentricity) * 0.2;
    eccentricity = eccentricity * ${y3};
  }
  return phases;
}

fn sky_cloudShares(d: f32, dq: f32, z: f32, sunUp: f32, sigma: f32, phases: array<f32, ${F$}>, powderWeight: f32, sunGate: f32, groundShare: f32) -> vec2<f32> {
  let pathLength = sky.cloudsThicknessM * max(1.0 - z, 0.0) / sunUp;
  let lightOd = (d * 0.4 + dq * 0.6) * sigma * pathLength;
  var sun = 0.0;
  var attenuation = 1.0;
  var contribution = 1.0;
  for (var k = 0u; k < ${F$}u; k = k + 1u) {
    sun = sun + attenuation * exp(-lightOd * contribution) * phases[k];
    attenuation = attenuation * ${L3};
    contribution = contribution * ${v3};
  }
  let powder = mix(1.0, 1.0 - exp(-2.0 * lightOd), powderWeight * d);
  let skyShare = mix(SKY_CLOUD_BELLY_AMBIENT + SKY_CLOUD_BELLY_SKY * (1.0 - sky.cloudsCoverage), 1.0, z) * 0.7;
  return vec2<f32>(sunGate * (sun * powder + groundShare * (1.0 - z)), skyShare);
}

fn sky_cloudsLit(layer: vec4<f32>, direction: vec3<f32>, sunLight: vec3<f32>, ambient: vec3<f32>) -> vec4<f32> {
  let moonDirection = normalize(sky.moonDirection);
  let moonGlow = sky.moonColor * sky.moonIntensity * sky.moonEnabled * smoothstep(0.0, 0.25, moonDirection.y) * (atm_henyeyGreensteinPhase(dot(direction, moonDirection), 0.45) * 0.75 + 0.08) * 0.025;
  let phaseCosine = select(cos(sky.moonPhase * 6.28318530718), dot(normalize(sky.sunDirection), moonDirection), sky.moonPhase < 0.0);
  let bodyLight = select(sunLight, sky_moonIlluminance() * (0.5 - 0.5 * phaseCosine) * SKY_CLOUD_MOON_BEAM, sky_moonShines());
  let lit = (bodyLight * layer.x + ambient * layer.y + moonGlow) * sky.cloudsColor;
  return select(vec4<f32>(lit, layer.w), vec4<f32>(0.0), layer.w <= 0.0);
}

fn sky_cloudLayer(direction: vec3<f32>, steps: u32, jitter: f32) -> vec4<f32> {
  let body = sky_lightBody();
  let baseY = sky.cloudsAltitudeM;
  let topY = baseY + sky.cloudsThicknessM;
  let density = sky.cloudsDensity;

  let tBase = sky_cloudPlaneDistance(direction, baseY);
  let tTop = sky_cloudPlaneDistance(direction, topY);
  let insideLayer = sky.cloudEye.y > baseY && sky.cloudEye.y < topY;
  let reaches = select(tBase > 0.0 || tTop > 0.0, true, insideLayer);
  let tEnter = select(min(max(tBase, 0.0), max(tTop, 0.0)), 0.0, insideLayer);
  let faceHeight = select(min(abs(baseY - sky.cloudEye.y), abs(topY - sky.cloudEye.y)), 0.0, insideLayer);
  let horizonFade = 1.0 - smoothstep(max(SKY_CLOUD_FADE_NEAR * faceHeight, SKY_CLOUD_FADE_FLOOR_M), max(SKY_CLOUD_FADE_FAR * faceHeight, SKY_CLOUD_FADE_FLOOR_M * 3.0), tEnter);
  if (!reaches || horizonFade <= 0.0 || sky.cloudsEnabled < 0.5) {
    return vec4<f32>(0.0);
  }
  let cosTheta = dot(direction, body);
  let sunUp = max(body.y, 0.15);
  let sunGate = smoothstep(-0.06, -0.005, body.y);

  let sigma = density * SKY_CLOUD_SLAB_OD / max(sky.cloudsThicknessM, 1.0);
  let phases = sky_cloudPhases(cosTheta);
  let powderWeight = SKY_CLOUD_POWDER * (1.0 - smoothstep(-0.5, 0.3, cosTheta));
  let groundShare = max(body.y, 0.0) * SKY_CLOUD_GROUND_BOUNCE * (1.0 - sky.cloudsCoverage) / ATM_PI;

  let interior = sky.cloudInterior;
  if (interior >= 1.5 && steps > 0u) {
    let tExit = min(max(max(tBase, 0.0), max(tTop, 0.0)), tEnter + SKY_CLOUD_SLAB_REACH_M);
    let span = max(tExit - tEnter, 1.0);
    let probes = max(steps / 3u, 4u);
    let probeStep = span / f32(probes);
    var first = probes;
    var last = 0u;
    for (var i = 0u; i < probes; i = i + 1u) {
      let p = sky.cloudEye + direction * (tEnter + (f32(i) + jitter) * probeStep);
      let hit = sky_cloudDensity(sky_cloudFieldOf(sky_cloudFieldFarTap(sky_cloudPlanePos(p)))) > 0.0;
      first = select(first, min(first, i), hit);
      last = select(last, max(last, i), hit);
    }
    if (first >= probes) {
      return vec4<f32>(0.0);
    }
    let tStart = tEnter + (f32(max(first, 1u) - 1u) + jitter) * probeStep;
    let tEnd = tEnter + (f32(min(last + 1u, probes - 1u)) + jitter) * probeStep;
    let marchSpan = max(tEnd - tStart, 1.0);
    let stepLength = max(marchSpan / f32(steps), SKY_CLOUD_MIN_STEP_M);
    let fineSteps = clamp(u32(ceil(marchSpan / stepLength)), 1u, steps);
    var transmittance = 1.0;
    var scattered = vec2<f32>(0.0);
    for (var i = 0u; i < fineSteps; i = i + 1u) {
      let segment = min(stepLength, marchSpan - f32(i) * stepLength);
      let t = tStart + f32(i) * stepLength + jitter * segment;
      let p = sky.cloudEye + direction * t;
      let z = (p.y - baseY) / sky.cloudsThicknessM;
      if (z <= 0.0 || z >= 1.0) {
        continue;
      }
      let q = p + body * (max(topY - p.y, 0.0) / sunUp * 0.5);
      let d = sky_slabColumn(sky_cloudPlanePos(p), z, SKY_CLOUD_SLAB_SKIN, true);
      if (d <= 0.001) {
        continue;
      }
      let dq = sky_slabColumn(sky_cloudPlanePos(q), (q.y - baseY) / sky.cloudsThicknessM, SKY_CLOUD_LIGHT_EDGE, false);
      let stepOd = d * sigma * segment;
      let stepTransmittance = exp(-stepOd);
      let source = sky_cloudShares(d, dq, z, sunUp, sigma, phases, powderWeight, sunGate, groundShare);
      let after = max(transmittance * stepTransmittance, SKY_CLOUD_OPAQUE_T);
      scattered = scattered + source * (transmittance - after);
      transmittance = after;
      if (transmittance <= SKY_CLOUD_OPAQUE_T) {
        break;
      }
    }
    let coverage = 1.0 - transmittance;
    let alpha = coverage * horizonFade;
    return vec4<f32>(scattered / max(coverage, 1e-4), 0.0, alpha);
  }

${_K}
  let silhouettePos = sky_cloudPlanePos(sky.cloudEye + direction * tSilhouette);
  let field = sky_cloudField(silhouettePos);
  let threshold = 1.0 - sky.cloudsCoverage;
  let soft = clamp((field - threshold) / SKY_CLOUD_SLICE_EDGE, 0.0, 1.0);
  let alpha = (1.0 - exp(-soft * density * SKY_CLOUD_PSEUDO_THICKNESS)) * sliceFade * sky.cloudsEnabled;
  if (alpha <= 0.0) {
    return vec4<f32>(0.0);
  }
  let height = sky_lobeHeight(sky_cloudFill(field));
  let fromBelow = sky.cloudEye.y < baseY;
  let z = select(mix(0.5, 1.0, height), SKY_CLOUD_SLICE_DEPTH, fromBelow);
  let q = sky.cloudEye + direction * tSilhouette + body * (sky.cloudsThicknessM * (1.0 - z) / sunUp * 0.5);
  let dq = sky_slabColumn(sky_cloudPlanePos(q), (q.y - baseY) / sky.cloudsThicknessM, SKY_CLOUD_LIGHT_EDGE, false);
  return vec4<f32>(sky_cloudShares(soft, dq, z, sunUp, sigma, phases, powderWeight, sunGate, groundShare), 0.0, alpha);
}

fn sky_cloudSilhouette(direction: vec3<f32>) -> f32 {
  let baseY = sky.cloudsAltitudeM;
  let topY = baseY + sky.cloudsThicknessM;
  let tBase = sky_cloudPlaneDistance(direction, baseY);
  let tTop = sky_cloudPlaneDistance(direction, topY);
  let insideLayer = sky.cloudEye.y > baseY && sky.cloudEye.y < topY;
  let reaches = select(tBase > 0.0 || tTop > 0.0, true, insideLayer);
  if (!reaches || sky.cloudsEnabled < 0.5) {
    return 0.0;
  }
  let faceHeight = select(min(abs(baseY - sky.cloudEye.y), abs(topY - sky.cloudEye.y)), 0.0, insideLayer);
${_K}
  if (sliceFade <= 0.0) {
    return 0.0;
  }
  let field = sky_cloudField(sky_cloudPlanePos(sky.cloudEye + direction * tSilhouette));
  let soft = clamp((field - (1.0 - sky.cloudsCoverage)) / SKY_CLOUD_SLICE_EDGE, 0.0, 1.0);
  return (1.0 - exp(-soft * sky.cloudsDensity * SKY_CLOUD_PSEUDO_THICKNESS)) * sliceFade * sky.cloudsEnabled;
}

fn sky_flatCloudCover(direction: vec3<f32>, mean: vec4<f32>) -> f32 {
  if (mean.a <= 1e-4) {
    return 0.0;
  }
  return sky_cloudSilhouette(direction);
}

fn sky_flatCloudLight(mean: vec4<f32>) -> vec3<f32> {
  return mean.rgb / max(mean.a, 1e-4);
}
`;var nK=0.041666666666666664,W$=8;var iK=60000;var f3=4,SD=f3*f3;var bD=SD+2;var oK=`struct FullscreenOut {
  @builtin(position) position: vec4<f32>,
  @location(0) uv: vec2<f32>,
}

@vertex fn fullscreenVs(@builtin(vertex_index) vertexIndex: u32) -> FullscreenOut {
  let corner = vec2<f32>(f32((vertexIndex << 1u) & 2u), f32(vertexIndex & 2u));
  var out: FullscreenOut;
  out.position = vec4<f32>(corner * 2.0 - 1.0, 0.0, 1.0);
  out.uv = vec2<f32>(corner.x, 1.0 - corner.y);
  return out;
}
`;var qG=`
const ATM_PLANET_RADIUS_KM: f32 = ${rK}.0;
const ATM_TOP_RADIUS_KM: f32 = ${aK}.0;
const ATM_VIEW_HEIGHT_KM: f32 = ${sK};
const ATM_PLANET_RADIUS_OFFSET_KM: f32 = ${tK};
const ATM_RAYLEIGH_SCALE_HEIGHT_KM: f32 = ${eK}.0;
const ATM_MIE_SCALE_HEIGHT_KM: f32 = ${$G};
const ATM_MIE_FORWARD_LOBE_G: f32 = ${QG};
const ATM_MIE_FORWARD_LOBE_WEIGHT: f32 = ${ZG};
const ATM_MIE_HORIZON_AIR_MASS: f32 = ${JG};
const ATM_OZONE_CENTER_KM: f32 = ${XG}.0;
const ATM_OZONE_HALF_WIDTH_KM: f32 = ${jG}.0;
const ATM_PI: f32 = 3.14159265358979;

struct AtmosphereMedia {
  rayleighScattering: vec3<f32>,
  mieScattering: f32,
  ozoneAbsorption: vec3<f32>,
  mieAbsorption: f32,
  groundAlbedo: vec3<f32>,
  mieAnisotropy: f32,
}

fn atm_raySphereIntersectNearest(rayOrigin: vec3<f32>, rayDirection: vec3<f32>, radiusKm: f32) -> f32 {
  let b = dot(rayOrigin, rayDirection);
  let c = dot(rayOrigin, rayOrigin) - radiusKm * radiusKm;
  let discriminant = b * b - c;
  let sqrtDiscriminant = sqrt(max(discriminant, 0.0));
  let t0 = -b - sqrtDiscriminant;
  let t1 = -b + sqrtDiscriminant;
  let nearest = select(t0, t1, t0 < 0.0);
  return select(nearest, -1.0, discriminant < 0.0 || t1 < 0.0);
}

fn atm_rayleighDensity(heightKm: f32) -> f32 { return exp(-heightKm / ATM_RAYLEIGH_SCALE_HEIGHT_KM); }
fn atm_mieDensity(heightKm: f32) -> f32 { return exp(-heightKm / ATM_MIE_SCALE_HEIGHT_KM); }
fn atm_ozoneDensity(heightKm: f32) -> f32 { return clamp(1.0 - abs(heightKm - ATM_OZONE_CENTER_KM) / ATM_OZONE_HALF_WIDTH_KM, 0.0, 1.0); }

fn atm_sampleExtinction(positionKm: vec3<f32>, media: AtmosphereMedia) -> vec3<f32> {
  let heightKm = length(positionKm) - ATM_PLANET_RADIUS_KM;
  let rayleigh = media.rayleighScattering * atm_rayleighDensity(heightKm);
  let mie = (media.mieScattering + media.mieAbsorption) * atm_mieDensity(heightKm);
  let ozone = media.ozoneAbsorption * atm_ozoneDensity(heightKm);
  return rayleigh + vec3<f32>(mie) + ozone;
}

fn atm_sampleRayleighScattering(positionKm: vec3<f32>, media: AtmosphereMedia) -> vec3<f32> {
  return media.rayleighScattering * atm_rayleighDensity(length(positionKm) - ATM_PLANET_RADIUS_KM);
}

fn atm_sampleMieScattering(positionKm: vec3<f32>, media: AtmosphereMedia) -> vec3<f32> {
  return vec3<f32>(media.mieScattering * atm_mieDensity(length(positionKm) - ATM_PLANET_RADIUS_KM));
}

fn atm_rayleighPhase(cosTheta: f32) -> f32 {
  return (3.0 / (16.0 * ATM_PI)) * (1.0 + cosTheta * cosTheta);
}

fn atm_miePhase(cosTheta: f32, anisotropy: f32) -> f32 {
  let g2 = anisotropy * anisotropy;
  let numerator = (1.0 - g2) * (1.0 + cosTheta * cosTheta);
  let denominator = (2.0 + g2) * pow(1.0 + g2 - 2.0 * anisotropy * cosTheta, 1.5);
  return (3.0 / (8.0 * ATM_PI)) * numerator / max(denominator, 1e-5);
}

fn atm_henyeyGreensteinPhase(cosTheta: f32, anisotropy: f32) -> f32 {
  let g2 = anisotropy * anisotropy;
  let denominator = pow(1.0 + g2 - 2.0 * anisotropy * cosTheta, 1.5);
  return (1.0 / (4.0 * ATM_PI)) * (1.0 - g2) / max(denominator, 1e-5);
}

fn atm_transmittanceLutUv(viewRadiusKm: f32, cosViewZenith: f32) -> vec2<f32> {
  let horizon = sqrt(max(ATM_TOP_RADIUS_KM * ATM_TOP_RADIUS_KM - ATM_PLANET_RADIUS_KM * ATM_PLANET_RADIUS_KM, 0.0));
  let rho = sqrt(max(viewRadiusKm * viewRadiusKm - ATM_PLANET_RADIUS_KM * ATM_PLANET_RADIUS_KM, 0.0));
  let discriminant = viewRadiusKm * viewRadiusKm * (cosViewZenith * cosViewZenith - 1.0) + ATM_TOP_RADIUS_KM * ATM_TOP_RADIUS_KM;
  let distanceToTop = max(-viewRadiusKm * cosViewZenith + sqrt(max(discriminant, 0.0)), 0.0);
  let dMin = ATM_TOP_RADIUS_KM - viewRadiusKm;
  let dMax = rho + horizon;
  let xMu = (distanceToTop - dMin) / max(dMax - dMin, 1e-5);
  let xR = rho / max(horizon, 1e-5);
  return vec2<f32>(clamp(xMu, 0.0, 1.0), clamp(xR, 0.0, 1.0));
}

fn atm_transmittanceRMuFromUv(uv: vec2<f32>) -> vec2<f32> {
  let horizon = sqrt(max(ATM_TOP_RADIUS_KM * ATM_TOP_RADIUS_KM - ATM_PLANET_RADIUS_KM * ATM_PLANET_RADIUS_KM, 0.0));
  let rho = horizon * uv.y;
  let viewRadius = sqrt(rho * rho + ATM_PLANET_RADIUS_KM * ATM_PLANET_RADIUS_KM);
  let dMin = ATM_TOP_RADIUS_KM - viewRadius;
  let dMax = rho + horizon;
  let distanceToTop = mix(dMin, dMax, uv.x);
  let cosViewZenith = select(clamp((horizon * horizon - rho * rho - distanceToTop * distanceToTop) / (2.0 * viewRadius * distanceToTop), -1.0, 1.0), 1.0, distanceToTop < 1e-4);
  return vec2<f32>(viewRadius, cosViewZenith);
}

fn atm_unitToSubUvBy(value: f32, halfTexel: f32, scale: f32) -> f32 {
  return (value + halfTexel) * scale;
}

fn atm_subUvToUnit(value: f32, resolution: f32) -> f32 {
  return (value - 0.5 / resolution) * (resolution / (resolution - 1.0));
}

fn atm_horizonCosZenith(viewHeightKm: f32) -> f32 {
  let viewRadius = ATM_PLANET_RADIUS_KM + viewHeightKm;
  let horizonDistance = sqrt(viewRadius * viewRadius - ATM_PLANET_RADIUS_KM * ATM_PLANET_RADIUS_KM);
  return -horizonDistance / viewRadius;
}

fn atm_skyViewUvFromDirection(viewDirection: vec3<f32>, sunDirection: vec3<f32>, width: f32, height: f32, viewHeightKm: f32) -> vec2<f32> {
  let horizonZenithAngle = acos(clamp(atm_horizonCosZenith(viewHeightKm), -1.0, 1.0));
  let sunFlat = normalize(vec3<f32>(sunDirection.x, 0.0, sunDirection.z) + vec3<f32>(1e-5, 0.0, 0.0));
  return atm_skyViewUvHeld(viewDirection, sunFlat, horizonZenithAngle, vec4<f32>(0.5 / width, width / (width + 1.0), 0.5 / height, height / (height + 1.0)));
}

fn atm_skyViewUvHeld(viewDirection: vec3<f32>, sunFlat: vec3<f32>, horizonZenithAngle: f32, subUv: vec4<f32>) -> vec2<f32> {
  let viewZenithAngle = acos(clamp(viewDirection.y, -1.0, 1.0));

  let aboveCoord = (1.0 - sqrt(max(1.0 - viewZenithAngle / max(horizonZenithAngle, 1e-4), 0.0))) * 0.5;
  let belowCoord = sqrt((viewZenithAngle - horizonZenithAngle) / max(ATM_PI - horizonZenithAngle, 1e-4)) * 0.5 + 0.5;
  let v = select(belowCoord, aboveCoord, viewZenithAngle < horizonZenithAngle);

  let viewFlat = normalize(vec3<f32>(viewDirection.x, 0.0, viewDirection.z) + vec3<f32>(1e-5, 0.0, 0.0));
  let cosAzimuth = clamp(dot(viewFlat, sunFlat), -1.0, 1.0);
  let u = sqrt(0.5 - cosAzimuth * 0.5);
  return vec2<f32>(atm_unitToSubUvBy(u, subUv.x, subUv.y), atm_unitToSubUvBy(v, subUv.z, subUv.w));
}

fn atm_skyViewAnglesFromUv(uvRaw: vec2<f32>, width: f32, height: f32, viewHeightKm: f32) -> vec2<f32> {
  let u = atm_subUvToUnit(uvRaw.x, width);
  let v = atm_subUvToUnit(uvRaw.y, height);
  let horizonZenithAngle = acos(clamp(atm_horizonCosZenith(viewHeightKm), -1.0, 1.0));

  let aboveT = 1.0 - v * 2.0;
  let aboveAngle = (1.0 - aboveT * aboveT) * horizonZenithAngle;
  let belowT = clamp(v * 2.0 - 1.0, 0.0, 1.0);
  let belowAngle = belowT * belowT * (ATM_PI - horizonZenithAngle) + horizonZenithAngle;
  let viewZenithAngle = select(belowAngle, aboveAngle, v < 0.5);

  let cosAzimuth = clamp(1.0 - u * u * 2.0, -1.0, 1.0);
  return vec2<f32>(clamp(cos(viewZenithAngle), -1.0, 1.0), cosAzimuth);
}

fn atm_sunLimbDarkening(centerToEdge: f32) -> vec3<f32> {
  let mu = sqrt(max(1.0 - centerToEdge * centerToEdge, 0.0));
  return vec3<f32>(pow(mu, 0.397), pow(mu, 0.503), pow(mu, 0.652));
}

fn atm_adjustSaturation(color: vec3<f32>, saturation: f32) -> vec3<f32> {
  let luma = dot(color, vec3<f32>(0.2126, 0.7152, 0.0722));
  return mix(vec3<f32>(luma), color, saturation);
}

`,VG=($,J)=>`fn atm_sampleTransmittanceLut(lut: ${$}, lutSampler: sampler, radiusKm: f32, cosZenith: f32) -> vec3<f32> {
  return textureSampleLevel(lut, lutSampler, atm_transmittanceLutUv(radiusKm, cosZenith), ${J}0.0).rgb;
}

fn atm_sampleMultiScatterLut(lut: ${$}, lutSampler: sampler, radiusKm: f32, cosSunZenith: f32) -> vec3<f32> {
  let heightT = clamp((radiusKm - ATM_PLANET_RADIUS_KM) / (ATM_TOP_RADIUS_KM - ATM_PLANET_RADIUS_KM), 0.0, 1.0);
  let uv = vec2<f32>(clamp(cosSunZenith * 0.5 + 0.5, 0.0, 1.0), heightT);
  return textureSampleLevel(lut, lutSampler, uv, ${J}0.0).rgb;
}`,YG=`${qG}${VG("texture_2d<f32>","")}
`,$m=`${qG}${VG("texture_2d_array<f32>","0, ")}
`;var zG="scripted-sky-compile-failed";var c9="sky_time";var h3=0.95,KG=`${g6}
fn sky_displayRadiance(display: vec3<f32>) -> vec3<f32> {
  let mode = sky_frameToneMap();
  let d = clamp(display, vec3<f32>(0.0), vec3<f32>(1.0));
  let fitted = vec3<f32>(
    dot(vec3<f32>(0.6430382, 0.3111868, 0.0457755), d),
    dot(vec3<f32>(0.0592687, 0.9314365, 0.0092949), d),
    dot(vec3<f32>(0.0059619, 0.0639290, 0.9301184), d)
  );
  let a = vec3<f32>(1.0) - 0.983729 * fitted;
  let b = vec3<f32>(0.0245786) - 0.4329510 * fitted;
  let c = vec3<f32>(-0.000090537) - 0.238081 * fitted;
  let v = (-b + sqrt(max(b * b - 4.0 * a * c, vec3<f32>(0.0)))) / (2.0 * a);
  let radiance = vec3<f32>(
    dot(vec3<f32>(1.764741, -0.6757777, -0.0889633), v),
    dot(vec3<f32>(-0.1470279, 1.1602515, -0.0132237), v),
    dot(vec3<f32>(-0.0363368, -0.1624364, 1.1987733), v)
  ) * 0.6;
  return select(select(max(radiance, vec3<f32>(0.0)), lume_pbr_neutral_inverse(min(display, vec3<f32>(${h3}))), mode > 0.5), max(display, vec3<f32>(0.0)), mode > 1.5);
}
`;var wD=2.5;function ED($){return`${MG}
@group(${$}) @binding(0) var<uniform> sky: Sky;
@group(${$}) @binding(1) var skyViewLut: texture_2d<f32>;
@group(${$}) @binding(2) var transmittanceLut: texture_2d<f32>;
@group(${$}) @binding(4) var cloudField: texture_2d<f32>;
@group(${$}) @binding(5) var lutSampler: sampler;
@group(${$}) @binding(9) var cloudFieldNear: texture_2d<f32>;
@group(${$}) @binding(10) var<storage, read> cloudMap: array<u32>;
`}var _D=`
fn sky_fadeOut(edge0: f32, edge1: f32, value: f32) -> f32 {
  return 1.0 - smoothstep(edge0, edge1, value);
}
`,gD=`
fn sky_discMask(angle: f32, angularRadius: f32) -> f32 {
  return sky_fadeOut(angularRadius - max(angularRadius * 0.06, 0.0008), angularRadius, angle);
}

fn sky_moonLayer(direction: vec3<f32>, size: f32) -> vec4<f32> {
  let moonDirection = normalize(sky.moonDirection);
  let angularRadius = max(sky.moonAngularRadius * size, 1e-4);
  let discMask = sky_discMask(acos(clamp(dot(direction, moonDirection), -1.0, 1.0)), angularRadius);

  var disc = vec3<f32>(0.0);
  if (discMask > 0.0) {
    let right = normalize(cross(vec3<f32>(0.0, 1.0, 0.0), moonDirection) + vec3<f32>(1e-4, 0.0, 0.0));
    let up = cross(moonDirection, right);
    let localX = clamp(dot(direction, right) / angularRadius, -1.0, 1.0);
    let localY = clamp(dot(direction, up) / angularRadius, -1.0, 1.0);
    let localZ = sqrt(max(1.0 - localX * localX - localY * localY, 0.0));
    let surfaceNormal = right * localX + up * localY - moonDirection * localZ;

    let phaseAngle = sky.moonPhase * 6.28318530718;
    let authoredLight = right * sin(phaseAngle) + moonDirection * cos(phaseAngle);
    let lightDirection = select(normalize(authoredLight), normalize(sky.sunDirection), sky.moonPhase < 0.0);

    let lambert = max(dot(surfaceNormal, lightDirection), 0.0);
    var mottling = vec2<f32>(0.0);
    for (var leg = 0u; leg < 2u; leg = leg + 1u) {
      let craterLeg = leg == 1u;
      let stack = shade_fractal3(surfaceNormal * select(3.5, 9.0, craterLeg) + select(11.0, 37.0, craterLeg), select(4, 3, craterLeg), select(2.2, 2.0, craterLeg), select(0.55, 0.5, craterLeg));
      mottling[leg] = clamp(stack * 0.5 + 0.5, 0.0, 1.0);
    }
    let maria = mottling.x;
    let craters = mottling.y;
    let albedo = 0.5 + maria * 0.5 - pow(craters, 2.0) * 0.25;
    let earthshine = 0.03;

    disc = sky.moonColor * albedo * max(lambert, earthshine) * discMask;
  }
  return vec4<f32>(disc * sky.moonEnabled, discMask * sky.moonEnabled);
}
`;function fD($){return`
fn sky_transmittance(direction: vec3<f32>) -> vec3<f32> {
  return atm_sampleTransmittanceLut(transmittanceLut, lutSampler, ATM_PLANET_RADIUS_KM + sky.viewHeightKm, direction.y);
}

fn sky_sunRadianceOf(sunDirection: vec3<f32>) -> vec3<f32> {
  return sky.sunIlluminance * atm_sampleTransmittanceLut(transmittanceLut, lutSampler, ATM_PLANET_RADIUS_KM + sky.viewHeightKm, clamp(sunDirection.y, -1.0, 1.0));
}
fn sky_sunRadiance(sunDirection: vec3<f32>) -> vec3<f32> {
  return ${$?"sky_held.sunLight":"sky_sunRadianceOf(sunDirection)"};
}

fn sky_sunToward() -> vec3<f32> {
  return ${$?"sky_held.sunToward":"normalize(sky.sunDirection)"};
}

fn sky_aureole(direction: vec3<f32>, sunDirection: vec3<f32>) -> vec3<f32> {
  let lobe = atm_henyeyGreensteinPhase(dot(direction, sunDirection), ATM_MIE_FORWARD_LOBE_G) * ATM_MIE_FORWARD_LOBE_WEIGHT;
  let airMass = 1.0 / (max(direction.y, 0.0) + 1.0 / ATM_MIE_HORIZON_AIR_MASS);
  let mieDepth = sky.mieScattering * ATM_MIE_SCALE_HEIGHT_KM * airMass;
  let sunUp = ${$?"sky_held.sunUp":"sky_sunUp(sunDirection)"};
  return sky_sunRadiance(sunDirection) * (lobe * mieDepth * sunUp);
}

fn sky_skyView(direction: vec3<f32>, sunDirection: vec3<f32>) -> vec3<f32> {
${$?"  let skyViewUv = atm_skyViewUvHeld(direction, sky_held.sunFlat, sky_held.horizonZenith, sky_held.subUv);":`  let skyViewSize = vec2<f32>(textureDimensions(skyViewLut, 0));
  let skyViewUv = atm_skyViewUvFromDirection(direction, sunDirection, skyViewSize.x, skyViewSize.y, sky.viewHeightKm);`}
  return textureSampleLevel(skyViewLut, lutSampler, skyViewUv, 0.0).rgb;
}

fn sky_atmosphere(direction: vec3<f32>, sunDirection: vec3<f32>) -> vec3<f32> {
  return sky_skyView(direction, sunDirection) + sky_aureole(direction, sunDirection);
}

fn sky_sunDisc(direction: vec3<f32>, sunDirection: vec3<f32>, transmittance: vec3<f32>, size: f32) -> vec3<f32> {
  let angularRadius = max(sky.sunDiskAngularRadius * size, 1e-4);
  let angle = acos(clamp(dot(direction, sunDirection), -1.0, 1.0));
  return sky.sunIlluminance * atm_sunLimbDarkening(clamp(angle / angularRadius, 0.0, 1.0)) * transmittance * sky_discMask(angle, angularRadius) * sky.sunDiskIntensity * ${wD};
}

struct SkyNight {
  celestial: vec3<f32>,
  moonlit: vec3<f32>,
}

fn sky_nightAir(direction: vec3<f32>) -> vec3<f32> {
  let up = clamp(direction.y, 0.0, 1.0);
  let horizon = vec3<f32>(${W6[0]}, ${W6[1]}, ${W6[2]});
  let zenith = vec3<f32>(${P6[0]}, ${P6[1]}, ${P6[2]});
  return mix(horizon, zenith, smoothstep(0.0, 0.3, up)) + horizon * 0.6 * exp(-up / 0.06);
}

fn sky_night(direction: vec3<f32>, sunDirection: vec3<f32>, transmittance: vec3<f32>) -> SkyNight {
  var night: SkyNight;
  night.celestial = vec3<f32>(0.0);
  night.moonlit = vec3<f32>(0.0);
  let nightVisibility = sky_fadeOut(${w9}, ${E9}, sunDirection.y);

  if (nightVisibility > 0.0) {
    night.moonlit = sky_nightAir(direction) * nightVisibility;

    let moon = sky_moonLayer(direction, 1.0);
    night.celestial = moon.rgb * nightVisibility * transmittance;
  }
  return night;
}

fn sky_nightVisible(sunDirection: vec3<f32>) -> bool {
  return sky_fadeOut(${w9}, ${E9}, sunDirection.y) > 0.0;
}

fn sky_nightAt(direction: vec3<f32>, sunDirection: vec3<f32>) -> SkyNight {
  var night: SkyNight;
  if (sky_nightVisible(sunDirection)) {
    night = sky_night(direction, sunDirection, sky_transmittance(direction));
  }
  return night;
}

fn sky_tintPlain() -> bool {
  return all(sky.horizonTint == vec3<f32>(1.0)) && all(sky.zenithTint == vec3<f32>(1.0)) && sky.saturation == 1.0;
}

fn sky_sunUp(sunDirection: vec3<f32>) -> f32 {
  return smoothstep(-0.03, 0.0, sunDirection.y);
}
`}var hD=`
struct SkyHeld {
  sunToward: vec3<f32>,
  sunUp: f32,
  sunLight: vec3<f32>,
  horizonZenith: f32,
  sunFlat: vec3<f32>,
  tintPlain: f32,
  subUv: vec4<f32>,
}
var<private> sky_held: SkyHeld;

fn sky_holdView() -> SkyHeld {
  var held: SkyHeld;
  held.sunToward = normalize(sky.sunDirection);
  held.sunUp = sky_sunUp(held.sunToward);
  held.sunLight = sky_sunRadianceOf(held.sunToward);
  held.horizonZenith = acos(clamp(atm_horizonCosZenith(sky.viewHeightKm), -1.0, 1.0));
  held.sunFlat = normalize(vec3<f32>(held.sunToward.x, 0.0, held.sunToward.z) + vec3<f32>(1e-5, 0.0, 0.0));
  held.tintPlain = select(0.0, 1.0, sky_tintPlain());
  let size = vec2<f32>(textureDimensions(skyViewLut, 0));
  held.subUv = vec4<f32>(0.5 / size.x, size.x / (size.x + 1.0), 0.5 / size.y, size.y / (size.y + 1.0));
  return held;
}
`,GG=`  let cover = mix(settled.w, slice.w, sky.cloudMapPending);
  let shares = mix(settled.xyz * settled.w, slice.xyz * slice.w, sky.cloudMapPending) / max(cover, 1e-4);
  return vec4<f32>(shares, cover);
}`,mD=`
fn sky_cloudMapShown(direction: vec3<f32>, mapSide: f32) -> vec4<f32> {
  let settled = sky_cloudMapRead(direction, mapSide);
  if (sky.cloudMapPending <= 0.0) {
    return settled;
  }
  let slice = sky_cloudLayer(direction, 0u, 0.5);
${GG}

fn sky_cloudLayerShown(direction: vec3<f32>, mapSide: f32, marchDirection: vec3<f32>, steps: u32, jitter: f32) -> vec4<f32> {
  let mapped = mapSide > 0.5;
  var settled = vec4<f32>(0.0);
  if (mapped) {
    settled = sky_cloudMapRead(direction, mapSide);
    if (sky.cloudMapPending <= 0.0) {
      return settled;
    }
  }
  let slice = sky_cloudLayer(select(marchDirection, direction, mapped), select(steps, 0u, mapped), select(jitter, 0.5, mapped));
  if (!mapped) {
    return slice;
  }
${GG}

fn sky_domeCloudSteps() -> u32 {
  return select(u32(sky.cloudSteps), 0u, sky.cloudMapPending >= 1.0);
}
`,uD=`
var<private> sky_starLight: vec3<f32>;

fn sky_nightLayer(direction: vec3<f32>, pixelAngle: f32, t: f32) -> vec3<f32> {
  let sunDirection = normalize(sky.sunDirection);
  let night = sky_night(direction, sunDirection, sky_transmittance(direction));
  return night.celestial + night.moonlit + sky_starLight;
}

fn sky_weather(planeKm: vec2<f32>) -> f32 {
  return sky_cloudField(sky_cloudPlanePos(vec3<f32>(planeKm.x * 1000.0, 0.0, planeKm.y * 1000.0)));
}
`,cD="skyScriptDisc";function pD($,J,Q){if(Q.step===1)return`@group(${$}) @binding(${J}) var skyGrid: texture_2d<f32>;
fn sky_gridSample(uv: vec2<f32>, rect: vec4<f32>) -> f32 {
  let texel = clamp(uv * rect.zw, vec2<f32>(0.5), rect.zw - vec2<f32>(0.5));
  return textureSampleLevel(skyGrid, lutSampler, (rect.xy + texel) / vec2<f32>(${Q.width}.0, ${Q.height}.0), 0.0).r;
}
`;return`@group(${$}) @binding(${J}) var skyGrid: texture_2d<f32>;
fn sky_gridSample(uv: vec2<f32>, rect: vec4<u32>) -> f32 {
  let texels = textureDimensions(skyGrid);
  let shift = vec2<u32>(${31-Math.clz32(Q.width)}u - firstLeadingBit(texels.x));
  let size = vec2<f32>((rect.zw + (vec2<u32>(1u) << shift) - vec2<u32>(1u)) >> shift);
  let texel = clamp(uv * size, vec2<f32>(0.5), size - vec2<f32>(0.5));
  return textureSampleLevel(skyGrid, lutSampler, (vec2<f32>(rect.xy >> shift) + texel) / vec2<f32>(texels), 0.0).r;
}
`}var UG=/\b(?:dpdx|dpdy|fwidth)(?:Coarse|Fine)?\s*\(/;function HG($){return!UG.test($.defs)&&!UG.test($.body)}function dD($){let J=$.script;if(!J)return"";return`${uD}
${$.familyReader?`
override ${cD}: f32 = 0.0;
var<private> sky_toneMapWord: f32 = 0.0;
fn sky_frameToneMap() -> f32 { return sky_toneMapWord; }`:`
const skyScriptDisc: f32 = ${$.sunDisc?"1.0":"0.0"};
fn sky_frameToneMap() -> f32 { return ${$.toneMapWgsl??"frame.toneMap"}; }`}
${J.paramsStruct}
@group(${J.paramsBinding.group}) @binding(${J.paramsBinding.binding}) var<uniform> skyScript: SkyScriptParams;
${J.grids?pD(J.paramsBinding.group,J.paramsBinding.binding+PG,J.grids):""}
var<private> ${c9}: f32 = 0.0;
${HG(J)?J.defs:J.defs.replace(/^fn /gm,`${m3} fn `)}

${HG(J)?"":`${m3} `}fn sky_scripted(directionIn: vec3<f32>, pixelAngle: f32, t: f32, cloudSteps: u32, cloudJitter: f32, cloudMapSide: f32) -> vec3<f32> {
  ${c9} = t;
  let direction = normalize(directionIn);
  let sunDirection = normalize(sky.sunDirection);
${J.body}
  return out_color;
}
`}function c3($){let J=$.sunDisc?`let r = max(sky.sunDiskAngularRadius, 1e-4);
  if (dot(direction, sunDirection) >= 1.0 - r * r) {
    return sky_sunDisc(direction, sunDirection, sky_transmittance(direction), 1.0);
  }
  `:"";return FG(`${ED($.group)}
${YG}
${W7.source}
${_D}
${YQ}
${gD}
${lK}
${WG}
${u3("cloudMap","","sky.cloudMapHalf","0u")}
${mD}
${$.held?hD:""}
${fD($.held===!0)}
fn sky_cloudAmbient(direction: vec3<f32>, sunDirection: vec3<f32>, moonlit: vec3<f32>) -> vec3<f32> {
  let view = select(direction, vec3<f32>(direction.x, -direction.y, direction.z), direction.y < 0.0);
  let skyView = sky_skyView(view, sunDirection);
  let deck = vec3<f32>(dot(skyView, vec3<f32>(0.2126, 0.7152, 0.0722)));
  return mix(skyView + sky_aureole(view, sunDirection), deck, sky_cloudClosing()) + moonlit + sky_moonDeck() * sky.cloudsCoverage;
}

fn sky_sunPoint(direction: vec3<f32>, sunDirection: vec3<f32>) -> vec3<f32> {
  ${J}return vec3<f32>(0.0);
}

fn sky_artistic(color: vec3<f32>, direction: vec3<f32>) -> vec3<f32> {
  let elevation = smoothstep(0.0, ${BG.toFixed(2)}, clamp(direction.y, 0.0, 1.0));
  let tint = mix(sky.horizonTint, sky.zenithTint, elevation);
  return atm_adjustSaturation(color * tint, sky.saturation);
}

var<private> sky_tintsLayer: f32 = 0.0;
var<private> sky_deck: vec4<f32>;
fn sky_radianceLayer(direction: vec3<f32>, layer: vec4<f32>, night: SkyNight) -> vec3<f32> {
  let sunDirection = sky_sunToward();
  let atmosphere = sky_atmosphere(direction, sunDirection);
  var clouds = vec4<f32>(0.0);
  if (layer.w > 0.0) {
    clouds = sky_cloudsLit(layer, direction, sky_sunRadiance(sunDirection), sky_cloudAmbient(direction, sunDirection, night.moonlit));
  }
  sky_deck = clouds;

  let clear = sky_cloudClear(clouds.a);
  let total = mix(atmosphere + night.moonlit, clouds.rgb, clouds.a) + (night.celestial + sky_sunPoint(direction, sunDirection)) * clear;
  if (${$.held?"sky_held.tintPlain > 0.5":"sky_tintPlain()"}) {
    return total;
  }
  let light = clouds.rgb * clouds.a * (1.0 - sky_tintsLayer);
  return sky_artistic(total - light, direction) + light;
}

fn sky_radiance(directionIn: vec3<f32>, pixelAngle: f32, t: f32, cloudSteps: u32, cloudJitter: f32) -> vec3<f32> {
  let direction = normalize(directionIn);
  var layer = vec4<f32>(0.0);
  if (sky.cloudsEnabled > 0.5) {
    layer = sky_cloudLayer(direction, cloudSteps, cloudJitter);
  }
  return sky_radianceLayer(direction, layer, sky_nightAt(direction, sky_sunToward()));
}
${dD($)}`)}var d3="vec3<f32>((ndc.x + frame.proj[2][0]) / frame.proj[0][0], (ndc.y + frame.proj[2][1]) / frame.proj[1][1], -1.0) * mat3x3<f32>(frame.view[0].xyz, frame.view[1].xyz, frame.view[2].xyz)",gG=`  if (skybox.kind == ${g9}.0 && skybox.fogSky <= 0.0 && passLights.viewFogAmount <= 0.0 && skybox.groundShare <= 0.0) {
    return vec4<f32>(skybox.clearColor, 1.0);
  }
`,lD=`  let corner = vec2<f32>(f32((vertexIndex << 1u) & 2u), f32(vertexIndex & 2u));
`,fG=`  sky_toneMapWord = frame.toneMap;
`,hG=`fn sky_flatRadiance(direction: vec3<f32>, night: SkyNight) -> vec3<f32> {
  let total = sky_skyView(direction, sky_sunToward()) + night.moonlit;
  let cover = sky_flatCloudCover(direction, skybox.flatCloud);
  return sky_artistic(total * (1.0 - cover) + (night.celestial + sky_sunPoint(direction, sky_sunToward())) * sky_cloudClear(cover), direction) + sky_flatCloudLight(skybox.flatCloud) * cover;
}
`;function mG($){return`// lume sky dome - one shader, every sky kind behind a uniform selector
${e0}
${c3({sunDisc:!0,group:2,...$?{script:{...$,paramsBinding:{group:3,binding:VQ}}}:{held:!0}})}
${XI($!==void 0,!1)}`}var nD=`@group(3) @binding(${LG}) var skyStarLayer: texture_2d<f32>;

fn sky_starLayerAt(position: vec2<f32>) -> vec3<f32> {
  let last = textureDimensions(skyStarLayer) - vec2<u32>(1u);
  return textureLoad(skyStarLayer, min(vec2<u32>(position), last), 0).rgb;
}
`,iD=`@group(3) @binding(${OG}) var skyHalf: texture_2d<f32>;
@group(3) @binding(${RG}) var skyHalfDepth: texture_depth_2d;
@group(3) @binding(${AG}) var skyHalfTiles: texture_2d<f32>;

fn sky_halfTexel(i: vec2<i32>, last: vec2<i32>) -> vec4<f32> {
  return textureLoad(skyHalf, clamp(i, vec2<i32>(0), last), 0);
}

fn sky_halfBlend(position: vec2<f32>) -> vec3<f32> {
  let dims = vec2<f32>(textureDimensions(skyHalf));
  let at = clamp(position * 0.5, vec2<f32>(0.5), dims - vec2<f32>(0.5)) / dims;
  let s = textureSampleLevel(skyHalf, lutSampler, at, 0.0);
  return s.rgb / max(s.a, 1e-6);
}

fn sky_halfOpen(cell: vec2<i32>) -> bool {
  let dims = vec2<i32>(textureDimensions(skyHalfDepth));
  if (any(vec2<f32>(dims) != frame.viewportSize)) {
    return true;
  }
  let last = dims - vec2<i32>(1);
  for (var y = -1; y <= 2; y += 1) {
    for (var x = -1; x <= 2; x += 1) {
      if (textureLoad(skyHalfDepth, clamp(cell * 2 + vec2<i32>(x, y), vec2<i32>(0), last), 0) <= ${H$}) {
        return true;
      }
    }
  }
  return false;
}
`;function oD($){let J=$?fG:"",Q=W$/2+4,Z=(j,q)=>`t${q}_${j}`,X=[];for(let j=0;j<Q;j+=1)for(let q=0;q<Q;q+=1)if(q%(Q-1)+j%(Q-1)>0)X.push(`  let ${Z(q,j)} = sky_halfTexel(base + vec2<i32>(${q}, ${j}), last);`);for(let j=0;j<Q;j+=1)for(let q=0;q<Q;q+=1){if(q<1||j<1||q>Q-2||j>Q-2)continue;let V=`${Z(q,j)}.rgb`;X.push(`  asked = min(asked, ${Z(q,j)}.w);`,`  top = max(top, ${V});`,`  excess = max(excess, abs(${Z(q-1,j)}.rgb - 2.0 * ${V} + ${Z(q+1,j)}.rgb) + abs(${Z(q,j-1)}.rgb - 2.0 * ${V} + ${Z(q,j+1)}.rgb) - ${V} * ${nK.toFixed(9)});`)}return`@fragment fn skyHalfFs(in: SkyVsOut) -> @location(0) vec4<f32> {
${J}  let full = in.position.xy * 2.0;
  let ndc = vec2<f32>(full.x / frame.viewportSize.x * 2.0 - 1.0, 1.0 - full.y / frame.viewportSize.y * 2.0);
  let direction = normalize(${d3});
  let halfPixelAngle = length(fwidth(direction)) * (frame.viewportSize.x / frame.canvasSize.x);
  sky_starLight = vec3<f32>(0.0);
  if (!sky_halfOpen(vec2<i32>(in.position.xy))) {
    return vec4<f32>(0.0);
  }
  if (sky.cloudMap <= 0.5 && sky.cloudInterior >= 1.5 && sky.cloudsEnabled >= 0.5 && sky_domeCloudSteps() > 0u) {
    return vec4<f32>(0.0);
  }
  let asked = sky_scripted(direction, halfPixelAngle, frame.worldTime, 0u, 0.5, sky.cloudMap);
  return vec4<f32>(asked, 1.0);
}

@fragment fn skyHalfTilesFs(in: SkyVsOut) -> @location(0) vec4<f32> {
  let tile = vec2<i32>(in.position.xy);
  let last = vec2<i32>(textureDimensions(skyHalf)) - vec2<i32>(1);
  let base = tile * ${W$/2} - vec2<i32>(2);
  var asked = 1.0;
  var top = vec3<f32>(0.0);
  var excess = vec3<f32>(-1.0);
${X.join(`
`)}
  var marked = asked < 1.0 || any(top >= vec3<f32>(${iK.toFixed(1)})) || (skybox.halfAlone < 0.5 && any(excess > vec3<f32>(1e-6)));
  let starDims = vec2<i32>(textureDimensions(skyStarLayer));
  if (starDims.x > 1) {
    let starLast = starDims - vec2<i32>(1);
    for (var y = 0; y < ${W$}; y += 1) {
      for (var x = 0; x < ${W$}; x += 1) {
        marked = marked || any(textureLoad(skyStarLayer, clamp(tile * ${W$} + vec2<i32>(x, y), vec2<i32>(0), starLast), 0).rgb != vec3<f32>(0.0));
      }
    }
  }
  return vec4<f32>(select(0.0, 1.0, marked), 0.0, 0.0, 1.0);
}

@fragment fn skyBlendFs(in: SkyVsOut) -> @location(0) vec4<f32> {
${J}${gG}  let ndc = in.ndc;
  let direction = normalize(${d3});
  return sky_domeFinish(direction, in.position.xy, sky_halfBlend(in.position.xy));
}

@vertex fn skyTileVs(@builtin(vertex_index) vertexIndex: u32, @builtin(instance_index) tileIndex: u32) -> SkyVsOut {
  let grid = textureDimensions(skyHalfTiles);
  let tile = vec2<u32>(tileIndex % grid.x, tileIndex / grid.x);
  let corner = vec2<f32>(f32((0x32u >> vertexIndex) & 1u), f32((0x2Cu >> vertexIndex) & 1u));
  let pixel = min((vec2<f32>(tile) + corner) * ${W$}.0, frame.viewportSize);
  let marked = textureLoad(skyHalfTiles, vec2<i32>(tile), 0).r > 0.5;
  let ndc = select(vec2<f32>(2.0), vec2<f32>(pixel.x / frame.viewportSize.x * 2.0 - 1.0, 1.0 - pixel.y / frame.viewportSize.y * 2.0), marked);
  var out: SkyVsOut;
  out.position = vec4<f32>(ndc, ${H$}, 1.0);
  out.ndc = ndc;
  return out;
}
`}var rD=`${n3}
${l3(!0)}
${i3}
@group(1) @binding(0) var<uniform> passLights: PassLights;
${bG(1)}
${EG}
${wG}
@group(3) @binding(0) var<uniform> skybox: SkyBackground;
@group(3) @binding(1) var equirectTex: texture_2d<f32>;
@group(3) @binding(2) var equirectSampler: sampler;
@group(3) @binding(3) var equirectBlurCube: texture_2d_array<f32>;`,aD=`
  @location(1) @interpolate(flat) heldSun: vec4<f32>,
  @location(2) @interpolate(flat) heldLight: vec4<f32>,
  @location(3) @interpolate(flat) heldFlat: vec4<f32>,
  @location(4) @interpolate(flat) heldSubUv: vec4<f32>,`,sD=`
  let held = sky_holdView();
  out.heldSun = vec4<f32>(held.sunToward, held.sunUp);
  out.heldLight = vec4<f32>(held.sunLight, held.horizonZenith);
  out.heldFlat = vec4<f32>(held.sunFlat, held.tintPlain);
  out.heldSubUv = held.subUv;`,tD=`  sky_held = SkyHeld(in.heldSun.xyz, in.heldSun.w, in.heldLight.xyz, in.heldLight.w, in.heldFlat.xyz, in.heldFlat.w, in.heldSubUv);
`;function eD($){let J="directional";if($===null)J="select(pow(directional, skybox.gradientCurve), directional, skybox.gradientCurve == 1.0)";else if($)J="pow(directional, skybox.gradientCurve)";return`
fn sky_domeGradient(direction: vec3<f32>, position: vec2<f32>) -> vec3<f32> {
  let screenUv = position / frame.viewportSize;
  let directional = clamp(direction.y, 0.0, 1.0);
  let curved = ${J};
  let elevation = mix(curved, 1.0 - screenUv.y, skybox.screenWeight);
  return mix(skybox.horizonColor, skybox.zenithColor, elevation);
}`}var $I=`    let rise = sky.cloudEye.y - sky.cloudsAltitudeM - sky.cloudsThicknessM;
    if (clouds.a > 0.0 && direction.y < 0.0 && rise > 0.0 && frame.proj[2][3] != 0.0) {
      let reach = rise / -direction.y;
      let depth = reach * max(-(frame.view * vec4<f32>(direction, 0.0)).z, 1e-3);
      color = mix(color, mix(clouds.rgb, fogColor, shade_fogFactor(depth, direction.y * reach)), clouds.a * fog);
    }
`,JI=`
  let fog = shade_skyFogFactor(direction, skybox.fogSky, skybox.openSky);
  var fogColor = vec3<f32>(0.0);
  if (fog > 0.0 || skybox.groundShare > 0.0) {
    fogColor = shade_fogLean(direction, shade_fogTurn(direction));
  }
  if (fog > 0.0) {
    color = mix(color, fogColor, fog);
    let clouds = sky_deck;
${$I}  }
`,QI=`fn sky_bodySpan(across: f32, forward: f32, sine: f32) -> vec2<f32> {
  let reach = across * across + forward * forward - sine * sine;
  if (reach <= 0.0) { return vec2<f32>(-1e30, 1e30); }
  let k = sqrt(reach);
  let low = forward * k + across * sine;
  let high = forward * k - across * sine;
  return vec2<f32>(select(-1e30, (across * k - forward * sine) / low, low > 0.0), select(1e30, (across * k + forward * sine) / high, high > 0.0));
}

fn sky_bodyNdc(body: u32, corner: vec2<f32>) -> vec2<f32> {
  if (body == 0u) { return corner * 2.0 - 1.0; }
  let moon = body == 2u;
  let sunRadius = max(sky.sunDiskAngularRadius, 1e-4);
  let sunCos = 1.0 - sunRadius * sunRadius;
  let moonRadius = max(sky.moonAngularRadius, 1e-4);
  let disc = select(select(sqrt(max(1.0 - sunCos * sunCos, 0.0)), 1.0, sunCos <= 0.0), select(sin(moonRadius), 1.0, moonRadius >= 1.5), moon);
  let sine = min(disc * 1.02 + 0.001, 1.0);
  let toward = mat3x3<f32>(frame.view[0].xyz, frame.view[1].xyz, frame.view[2].xyz) * normalize(select(sky.sunDirection, sky.moonDirection, moon));
  if (frame.proj[2][3] == 0.0 || -toward.z <= -sine) { return vec2<f32>(2.0); }
  let x = sky_bodySpan(toward.x, -toward.z, sine) * frame.proj[0][0] - frame.proj[2][0];
  let y = sky_bodySpan(toward.y, -toward.z, sine) * frame.proj[1][1] - frame.proj[2][1];
  let pad = 4.0 / frame.viewportSize;
  let low = clamp(vec2<f32>(min(x.x, x.y), min(y.x, y.y)) - pad, vec2<f32>(-1.0), vec2<f32>(1.0));
  let high = clamp(vec2<f32>(max(x.x, x.y), max(y.x, y.y)) + pad, vec2<f32>(-1.0), vec2<f32>(1.0));
  return low + corner * (high - low);
}
`;function ZI($,J){let Q=$?"sky_scripted":"sky_radiance",Z=!$;return`${rD}
${$?nD+iD:""}${_G}

struct SkyVsOut {
  @builtin(position) position: vec4<f32>,
  @location(0) ndc: vec2<f32>,${Z?aD:""}
}

${Z?QI:""}@vertex fn skyVs(@builtin(vertex_index) vertexIndex: u32${Z?", @builtin(instance_index) body: u32":""}) -> SkyVsOut {
${lD}  var out: SkyVsOut;
  let ndc = ${Z?"sky_bodyNdc(body, corner)":"corner * 2.0 - 1.0"};
  out.position = vec4<f32>(ndc, ${H$}, 1.0);
  out.ndc = ndc;${Z?sD:""}
  return out;
}

${eD(null)}

${$?"":hG}
@fragment fn skyFs(in: SkyVsOut) -> @location(0) vec4<f32> {
${J?fG:""}${gG}${Z?tD:""}
  var direction: vec3<f32>;
  if (frame.proj[2][3] != 0.0) {
    let ndc = in.ndc;
    direction = normalize(${d3});
  } else {
    let nearPoint = frame.inverseViewProj * vec4<f32>(in.ndc, ${IG}, 1.0);
    let farPoint = frame.inverseViewProj * vec4<f32>(in.ndc, ${H$}, 1.0);
    direction = normalize(farPoint.xyz / farPoint.w - nearPoint.xyz / nearPoint.w);
  }
${$?`  let outputPixelAngle = length(fwidth(direction)) * (frame.viewportSize.x / frame.canvasSize.x);
  let cloudJitter = ${RJ("in.position.xy")};
  sky_starLight = sky_starLayerAt(in.position.xy);
  let scripted = ${Q}(direction, outputPixelAngle, frame.worldTime, sky_domeCloudSteps(), cloudJitter, sky.cloudMap);
`:""}
  var color = skybox.clearColor;
  let kind = skybox.kind;
  if (kind == ${B6}.0) {
    color = sky_domeGradient(direction, in.position.xy);
  } else if (kind == ${I6}.0) {
${$?"    color = mix(sky_domeGradient(direction, in.position.xy), scripted, skybox.physicalBlend);":`
    let night = sky_nightAt(direction, sky_sunToward());
    var radiance = vec3<f32>(0.0);
    if (skybox.flatShare < 1.0) {
      var layer = vec4<f32>(0.0);
      if (sky.cloudMap > 0.5 || sky.cloudsEnabled > 0.5) {
        let cloudJitter = ${RJ("in.position.xy")};
        layer = sky_cloudLayerShown(direction, sky.cloudMap, direction, sky_domeCloudSteps(), cloudJitter);
      }
      radiance = sky_radianceLayer(direction, layer, night);
    }
    if (skybox.flatShare > 0.0) {
      radiance = mix(radiance, sky_flatRadiance(direction, night), skybox.flatShare);
    }
    color = radiance;
    if (skybox.physicalBlend < 1.0) {
      color = mix(sky_domeGradient(direction, in.position.xy), radiance, skybox.physicalBlend);
    }
    sky_deck.a = sky_deck.a * (1.0 - skybox.flatShare) * skybox.physicalBlend;`}
  } else if (kind == ${XQ}.0) {
    let cosYaw = cos(skybox.equirectYaw);
    let sinYaw = sin(skybox.equirectYaw);
    let rotated = vec3<f32>(direction.x * cosYaw - direction.z * sinYaw, direction.y, direction.x * sinYaw + direction.z * cosYaw);
    let pixelAngle = length(fwidth(direction));
    let texelsPerRadian = skybox.equirectWidth * ${1/b$};
    let lod = max(log2(max(pixelAngle * texelsPerRadian, 1e-6)), 0.0);
    let sharp = textureSampleLevel(equirectTex, equirectSampler, sky_equirectUv(rotated), lod).rgb;
    let blurred = lume_cubeSampleLevel(equirectBlurCube, equirectSampler, direction, skybox.equirectBlurMip, skybox.equirectBlurLevels).rgb;
    color = mix(sharp, blurred, skybox.equirectBlurLane);
  }
${JI}  if (skybox.groundShare > 0.0) {
    let lit = skybox.groundColor * (0.31830988618 * (passLights.ambientMean + max(passLights.sunDirection.y, 0.0) * passLights.sunColor * passLights.sunIntensity));
    let ground = mix(lit, fogColor, shade_fogFactor(${V7}.0 / max(-direction.y, 1e-4), direction.y));
    color = mix(color, ground, skybox.groundShare * (1.0 - smoothstep(-0.002, 0.0, direction.y)));
  }
  return vec4<f32>(color, 1.0);
}
`}function XI($,J){let Q=ZI($,J);return $?jI(Q,J):Q}function jI($,J){let Q=$.indexOf("@fragment fn skyFs("),Z=$.indexOf("  var color = skybox.clearColor;",Q),X=$.indexOf(`  return vec4<f32>(color, 1.0);
}
`,Z)+34,j=`fn sky_domeFinish(direction: vec3<f32>, position: vec2<f32>, scripted: vec3<f32>) -> vec4<f32> {
${$.slice(Z,X).replaceAll("in.position.xy","position")}`;return`${$.slice(0,Q)}${j}
${oD(J)}
${$.slice(Q,Z)}  return sky_domeFinish(direction, in.position.xy, scripted);
}
${$.slice(X)}`}var qI=2,Hu=L0*(3-Math.sqrt(5)),VI=256,Fu=VI/2;var B$=8,Wu=SG*B$*p0*16,Pu=s5+1,CG=($)=>yG.reduce((J,Q,Z)=>`select(${J}, ${Q.toFixed(4)}, ${$} == ${Z+1}u)`,_9.toFixed(4)),YI=`fn sky_stepMedian(first: u32) -> vec3f {
${"0:0 1:32 2:64 3:96 4:128 5:160 6:192 7:224".replace(/(\d):(\d+) ?/g,`  var r$1 = fogHorizonRays[first + $2u].xyz;
`)}${"0:01 1:23 2:45 3:67 4:02 5:13 6:46 7:57 8:12 9:56 10:04 11:15 12:26 13:37 14:24 15:35 16:12 17:34 18:56".replace(/(\d+):(\d)(\d) ?/g,`  let lo$1 = min(r$2, r$3);
  r$3 = max(r$2, r$3);
  r$2 = lo$1;
`)}  return r3 * 0.5 + r4 * 0.5;
}`,zI=1;var DG=3;var KI=`struct SkyOffscreen {
  faceIndex: u32,
  toneMap: f32,
  _pad: u32,
  horizon: u32,
}
@group(1) @binding(${TG}) var<uniform> skyOffscreen: SkyOffscreen;`,uG="select(skyOffscreen.toneMap, frame.toneMap, skyOffscreen.horizon != 0u)";function GI($,J){let Q=$?"sky_scripted":"sky_radiance",Z=b$/p0,X=Math.sqrt(1-_9*_9).toFixed(9),j=$?`    let phi = (f32(index) + (f32(strand) + 0.5) / ${B$}.0 - 0.5) * ${Z.toFixed(9)};`:`    let sunToward = normalize(sky.sunDirection);
    let along = (f32(index) + (f32(strand) + 0.5) / ${B$}.0 - 0.5) * ${(2/p0).toFixed(9)};
    let share = along - 2.0 * floor((along + 1.0) * 0.5);
    let phi = select(atan2(sunToward.z, sunToward.x), 0.0, length(sunToward.xz) < 1e-6) + ${L0.toFixed(9)} * share * abs(share);`;return`${n3}
${l3(!0)}
@group(3) @binding(0) var<uniform> skybox: SkyBackground;
@group(1) @binding(${NG}) var<storage, read_write> fogHorizonOut: array<vec4<f32>>;
@group(1) @binding(${kG}) var<storage, read_write> fogHorizonRays: array<vec4<f32>>;
${KI}
${EK}
${oK}
${$?"":hG}
${YI}
@fragment fn offscreenFs(in: FullscreenOut) -> @location(0) vec4<f32> {
${J?`  sky_toneMapWord = ${uG};
`:""}  sky_tintsLayer = f32(skyOffscreen.horizon == 0u);
  let horizon = skyOffscreen.horizon != 0u;
  let mirror = horizon && skyOffscreen.horizon >= ${DG}u;
  let faceDirection = env_cubeFaceDirection(skyOffscreen.faceIndex, in.uv);
  let faceAngle = length(fwidth(faceDirection));
  let index = u32(in.position.x);
  let ray = u32(in.position.y) / 2u;
  let perspective = frame.proj[2][3] != 0.0;
  let picture = 2.0 / max(abs(frame.proj[1][1]) * frame.canvasSize.y, 1.0);
  let pixelAngle = select(faceAngle, select(${Z.toFixed(6)}, picture, perspective), horizon);
  let t = select(0.0, frame.worldTime, horizon);
  var direction = faceDirection;
  if (horizon) {
    let strand = ray % ${B$}u;
    let rise = ${CG(`ray / ${B$}u`)};
    let level = select(sqrt(max(1.0 - rise * rise, 0.0)), ${X}, ray < ${B$}u);
${j}
    let mirrorPhi = (f32(index) + 0.5) * ${(L0/P$).toFixed(9)};
    let up = (f32(ray) + 0.5) / ${p3}.0 - 1.0;
    let ring = sqrt(max(1.0 - up * up, 0.0));
    direction = select(vec3<f32>(cos(phi) * level, rise, sin(phi) * level), vec3<f32>(cos(mirrorPhi) * ring, up, sin(mirrorPhi) * ring), mirror);
  }
  var radiance = vec3<f32>(0.0) + ${Q}(direction, pixelAngle, t, min(u32(sky.cloudSteps), ${F3}u), 0.5${$?", 0.0":""});
${$?"":`
  if (horizon && !mirror && skybox.flatShare > 0.0) {
    radiance = mix(radiance, sky_flatRadiance(direction, sky_nightAt(direction, sky_sunToward())), skybox.flatShare);
  }
`}  if (!horizon) {
    return vec4<f32>(radiance, 1.0);
  }
  if (skyOffscreen.horizon == ${zI}u) {
    if ((u32(in.position.y) & 1u) == 0u) {
      fogHorizonRays[ray * ${p0}u + index] = vec4<f32>(radiance, 1.0);
    }
    return vec4<f32>(0.0);
  }
  if (skyOffscreen.horizon == ${DG}u) {
    if ((u32(in.position.y) & 1u) == 0u) {
      fogHorizonRays[ray * ${2*P$}u + index] = vec4<f32>(radiance, 1.0);
    }
    return vec4<f32>(0.0);
  }
  let row = u32(in.position.y);
  let ringRow = !mirror && row > 0u;
  if (ringRow && index >= ${p0}u) {
    return vec4<f32>(0.0);
  }
  let rise = select(${CG("row")}, max((f32(row) + 0.5) * ${(2/p3).toFixed(9)} - 1.0, 0.0), mirror);
  let curved = select(pow(rise, skybox.gradientCurve), rise, skybox.gradientCurve == 1.0);
  let gradient = mix(skybox.horizonColor, skybox.zenithColor, curved);
  var color = skybox.clearColor;
  let kind = skybox.kind;
  if (kind == ${B6}.0) {
    color = gradient;
  } else if (kind == ${I6}.0) {
    radiance = vec3<f32>(0.0);
    if (mirror) {
      let first = 2u * row * ${2*P$}u + 2u * index;
      let a = fogHorizonRays[first].xyz;
      let b = fogHorizonRays[first + 1u].xyz;
      let c = fogHorizonRays[first + ${2*P$}u].xyz;
      let d = fogHorizonRays[first + ${2*P$+1}u].xyz;
      radiance = (a + b + c + d - max(max(a, b), max(c, d)) - min(min(a, b), min(c, d))) * 0.5;
    } else if (index < ${p0}u) {
      radiance = sky_stepMedian(row * ${B$*p0}u + index);
    } else if (index == ${vG}u) {
${$?`
      for (var each = 0u; each < ${p0}u; each++) {
        radiance += sky_stepMedian(each);
      }
      radiance /= ${p0}.0;`:`
      for (var each = 0u; each < ${p0}u; each++) {
        let u = (f32(each) + vec2f(-0.5, 0.5)) * ${(2/p0).toFixed(9)};
        let g = select(u * abs(u), 2.0 - (2.0 - u) * (2.0 - u), u > vec2f(1.0));
        radiance += sky_stepMedian(each) * (g.y - g.x);
      }
      radiance *= 0.5;`}
    }
    color = mix(gradient, radiance, skybox.physicalBlend);
  }
  let sunEntry = ${$?"vec4<f32>(0.0)":`vec4<f32>(normalize(sky.sunDirection), select(0.0, 1.0, kind == ${I6}.0))`};
  let at = select(select(index, ${J3}u + (row - 1u) * ${p0}u + index, ringRow), row * ${P$}u + index, mirror);
  fogHorizonOut[at] = select(vec4<f32>(color, select(select(${$?"sky_scriptWarmAir":"1.0"}, skybox.fogSky, ringRow), 1.0 + skybox.openSky, mirror)), sunEntry, !mirror && !ringRow && index == ${s5}u);
  return vec4<f32>(0.0);
}
`}function cG($){return`// lume sky offscreen reader - the light's capture and the fog's table over one radiance call
${e0}
${$?`${i3}
@group(1) @binding(${xG}) var<uniform> passLights: PassLights;
`:""}${c3({sunDisc:!1,group:qI,toneMapWgsl:uG,...$?{script:{defs:$.defs,body:$.body,paramsStruct:$.paramsStruct,paramsBinding:{group:3,binding:VQ},...$.grids?{grids:$.grids}:{}}}:{}})}
${GI($!==void 0,!1)}`}var UI={"sky:direction":"direction","sky:pixelAngle":"pixelAngle","sky:sunDirection":"sunDirection","sky:cloudSteps":"cloudSteps","sky:cloudJitter":"cloudJitter","sky:cloudMapSide":"cloudMapSide",time:c9},HI=["direction","pixelAngle"],FI=["sun","moon","atmosphere","transmittance","night","clouds","weather","param","display","eye","cloudAltitude","quality"],pG=["direction","radiance","disc"],dG=["sun","ambient"],WI=["sample","size"],PI=["size","data"],BI=/\bsky_nightLayer\(/,MI=/\bsky_atmosphere\(/,lG=($)=>typeof $==="number"&&Number.isInteger($)&&$>=1;function CI($,J){let Q=`world.param("${$}", { size: [w, h], data }) takes a grid: size two whole numbers 1 or more, data a list of w \u00d7 h numbers row by row (data[x + y * w]; omit it for zeros)`;for(let Y of Object.keys(J))if(!PI.includes(Y))throw TypeError(`${Q}; it has no "${Y}".`);let Z=J.size,[X,j]=Array.isArray(Z)&&Z.length===2?Z:[];if(!lG(X)||!lG(j))throw TypeError(`${Q}; size is ${Array.isArray(Z)?`[${Z.map(p9).join(", ")}]`:p9(Z)}.`);let q=new Float32Array(X*j),V=J.data;if(V!==void 0){if(!Array.isArray(V))throw TypeError(`${Q}; data is ${p9(V)}.`);if(V.length!==X*j)throw TypeError(`${Q}; data holds ${V.length} numbers, a ${X} \u00d7 ${j} grid holds ${X*j}.`);V.forEach(function(Y,K){if(!$0(Y))throw TypeError(`${Q}; data[${K}] is ${p9(Y)}.`);q[K]=Y})}return{name:$,width:X,height:j,defaults:q}}function DI($){let J=$.reduce((Q,Z)=>Math.max(Q,Z.width,Z.height),1);for(let Q=1;;Q*=2){let Z=II($,Q);if(Math.max(Z.width,Z.height)<=oG*Q||Q>=J)return Z}}function II($,J){let Q=(G)=>Math.ceil(G/J),Z=$.reduce((G,H)=>G+Q(H.width)*Q(H.height),0),X=Math.max(Math.ceil(Math.sqrt(Z)),...$.map((G)=>Q(G.width))),j=$.map((G,H)=>H).sort((G,H)=>$[H].height-$[G].height||G-H),q=Array($.length),V=0,Y=0,K=0,z=0;for(let G of j){let H=$[G],U=Q(H.width);if(V+U>X)Y+=K,V=0,K=0;q[G]={...H,x:V*J,y:Y*J},V+=U,K=Math.max(K,Q(H.height)),z=Math.max(z,V)}return{width:z*J,height:(Y+K)*J,step:J,list:q}}function NI($,J){return $.replace(/\/\*skyGrid(\d+)\*\//g,function(Q,Z){let X=J.list[Number(Z)];return J.step===1?`vec4<f32>(${X.x}.0, ${X.y}.0, ${X.width}.0, ${X.height}.0)`:`vec4<u32>(${X.x}u, ${X.y}u, ${X.width}u, ${X.height}u)`})}var S0=p("vec3f"),kI=p("vec4f"),zQ=p("f32");function M$($,J,Q){if($ instanceof P0)return Q0($,J);if(typeof $==="number"||typeof $==="boolean")return Q0(KQ($,J),J);throw TypeError(`${Q} takes a number or a builtin/tsl node, got ${$===null?"null":typeof $}.`)}function xI($){try{return G$($)}catch(J){if(!(J instanceof Z0))throw J;let Q=J.detail?.code;if(Q==="non-finite-constant")throw new Z0(`${J.message} \u2014 in a sky script every number that meets a node is a node: float(0.55).sub(w), never 0.55 - w.`,J.detail);if(Q==="input-missing")throw new Z0(`${J.message} \u2014 a sky script sees ray.direction, ray.pixelAngle, time and the world (world.sun, world.moon, world.atmosphere, world.transmittance, world.night, world.clouds(), world.weather(), world.param(), world.display(), world.eye, world.cloudAltitude, world.quality); there is no surface and no uv on the dome.`,J.detail);throw J}}function TI($,J){if($.textures.length>0)throw new Z0("sky(ray, world) samples a texture of its own \u2014 a sky script has no textures; the sky's field, night bake and atmosphere arrive as world.weather(p), world.night and world.atmosphere.");if($.storages.length>0)throw new Z0("sky(ray, world) reads a storage buffer \u2014 a sky script has none.");if($.varyings.length>0)throw new Z0("sky(ray, world) calls vertexStage() \u2014 a sky script runs per pixel over the dome; read ray.direction directly.");if(QU(J))throw new Z0("sky(ray, world) reads audioLevel or audioSpectrum \u2014 the sky is also captured for the world's light, which hears no music; a material or a look reads them.");if($.uniforms.some((Q)=>tG(Q.name)!==null))throw new Z0("sky(ray, world) reads where a thing is drawn (objectWorldMatrix, objectPosition, objectScale or objectDirection with an id) \u2014 the sky is also captured for the world's light, which follows no one thing; a material or a look reads them.");AI($)}var zU=`struct SkyScriptParams {
  _pad: vec4<f32>,
}`,o3=null;function OI(){if(o3===null){let $={defs:"",body:"let out_color: vec3<f32> = vec3<f32>(0.0);",paramsStruct:zU},J=new Set(d9(mG($)));o3=new Set(d9(cG($)).filter((Q)=>J.has(Q)))}return o3}var RI=new WeakMap;function nG($){return Z$(RI,$,()=>({declares:d9($.source),reads:a3($.source)}))}function AI($){if($.modules.includes($U()))throw new Z0("sky(ray, world) calls builtin/lighting fogColor \u2014 the fog's colour is the sky's own horizon, which this script draws; a sky reads sunDirection, sunRadiance, ambientRadiance, the wind and the weather, or world.sun and world.moon.");let J=new Set(d9($.fnDefs));for(let Z of $.modules)for(let X of nG(Z).declares)J.add(X);let Q=$.modules.map((Z)=>({module:Z,reads:nG(Z).reads}));Q.push({module:null,reads:a3($.fnDefs)});for(let{module:Z,reads:X}of Q)for(let[j,q]of X){if(J.has(j)||OI().has(j))continue;if(Z===JU())throw new Z0("sky(ray, world) calls a builtin/lighting point query (sunVisibility, lightsAt, lightCount, lightRadiance, lightPosition) \u2014 those answer a lit point in a material's colorNode / emissiveNode or a look pass, and a sky ray reaches none; a sky reads sunDirection, sunRadiance, ambientRadiance, the wind and the weather, or world.sun and world.moon.");throw new Z0(`sky(ray, world) lowers to engine WGSL that reads \`${j}\`${q===""?"":` in ${q}()`}, which the sky's shaders do not declare \u2014 the engine's lowering of your script is at fault here, not your logic.`)}}var KU=($)=>jU("sky",zG,eG,$);function LI($,J,Q){if(Q.size>0)KU({ref:$,hash:J,message:`Sky script "${$}": ${qU(Q)}`,ranOn:!0})}function vI($,J,Q,Z="high",X={quality:!1}){let j=sG(),q=iG($,J,Q,Z,X,[]);if(q===null||q.uniformByteSize<=j)return q;let V=q.paramTables.map((K)=>K.rows),Y=q.uniformByteSize-16*V.reduce((K,z)=>K+z,0);return iG($,J,Q,Z,X,yI(V,Math.floor((j-Y)/16)))}function yI($,J){if(J<=$.length)return $.map(()=>1);let Q=[...$],Z=$.map((j,q)=>q).sort((j,q)=>$[j]-$[q]||j-q),X=J;for(let j=0;j<Z.length;j+=1){let q=Math.floor(X/(Z.length-j));if($[Z[j]]<=q){X-=$[Z[j]];continue}let V=Z.slice(j).sort((K,z)=>$[z]-$[K]||K-z),Y=X-q*V.length;for(let K=0;K<V.length;K+=1)Q[V[K]]=q+(K<Y?1:0);break}return Q}function iG($,J,Q,Z,X,j){let q=h0("sky:direction","vec3f"),V=h0("sky:pixelAngle","f32"),Y=h0("time","f32"),K=h0("sky:sunDirection","vec3f"),z=h0("sky:cloudSteps","u32"),G=h0("sky:cloudJitter","f32"),H=h0("sky:cloudMapSide","f32"),U=zQ`skyScriptDisc`,F={},M=new Map,B=new Map,D=[],C=new Map,P=new Map,I=()=>X.quality?`${$.hash}@${Z}`:$.hash,x=function(A,v){let E={ref:J,hash:I(),message:A,...v?{data:v}:{}};return XU(X,E),KU(E),null},T=function(A,v){let E=L8(A);return x(r3(v(E),P),{error:E})},N=[],L=new Map,S=!1,c=!1,f=function(A,v){let{width:E,rows:w,defaults:h}=YU(`world.param("${A}", list)`,v),J0=Math.min(w,j[D.length]??w),l=`table${D.length}`;D.push({name:A,field:l,width:E,rows:J0,defaults:J0<w?h.subarray(0,J0*4):h});let b=VU(`world.param("${A}")`,P,`skyScript.${l}[`,E,w,J0,v);return C.set(A,b),b},r=function(A,v){let E=CI(A,v),w=N.length;N.push(E);let h=N6(`world.param("${A}")`,WI,P,{sample:(J0)=>j0("wgslExpr","f32",[M$(J0,"vec2f",`world.param("${A}").sample(uv)`)],{parts:["sky_gridSample(",`, ${`/*skyGrid${w}*/`})`],module:null}),size:[E.width,E.height]});return L.set(A,h),h},d=N6("ray",HI,P,{direction:q,pixelAngle:V}),G0=N6("world.sun",pG,P,{direction:K,radiance:S0`sky_sunRadiance(${K})`,disc:(A=1)=>S0`(sky_sunDisc(${q}, ${K}, sky_transmittance(${q}), ${M$(A,"f32","world.sun.disc(size)")}) * ${U})`}),E0=S0`normalize(sky.moonDirection)`,b0=N6("world.moon",pG,P,{direction:E0,radiance:S0`(sky.moonColor * sky.moonIntensity * sky.moonEnabled)`,disc:(A=1)=>S0`(sky_moonLayer(${q}, ${M$(A,"f32","world.moon.disc(size)")}).rgb * ${U})`}),z0=N6("world",FI,P,{sun:G0,moon:b0,atmosphere:S0`sky_atmosphere(${q}, ${K})`,transmittance:S0`sky_transmittance(${q})`,night:S0`sky_nightLayer(${q}, ${V}, ${Y})`,eye:S0`sky.cloudEye`,cloudAltitude:zQ`sky.cloudsAltitudeM`,clouds:function(A){c=!0;let v=S0`sky_sunRadiance(${K})`,E=S0`sky_cloudAmbient(${q}, ${K}, vec3<f32>(0.0))`;if(A!==void 0){if(typeof A!=="object"||A===null||Array.isArray(A))throw TypeError("world.clouds(light) takes { sun, ambient } \u2014 the sun's radiance at the cloud and the sky light behind it (both vec3); omit it for the physical sky's own light.");for(let h of Object.keys(A))if(!dG.includes(h))throw TypeError(`world.clouds({ ${h} }) \u2014 the light has: ${dG.join(", ")}.`);let w=A;if(w.sun!==void 0)v=M$(w.sun,"vec3f","world.clouds({ sun })");if(w.ambient!==void 0)E=M$(w.ambient,"vec3f","world.clouds({ ambient })")}return kI`sky_cloudsLit(sky_cloudLayerShown(${q}, ${H}, ${q}, ${z}, ${G}), ${q}, ${v}, ${E})`},weather:(A)=>zQ`sky_weather(${M$(A,"vec2f","world.weather(p)")})`,param:function(A,v){if(typeof A!=="string"||A.length===0)throw TypeError("world.param(name, default) takes the param's name as a string \u2014 the live value rides atmosphere.sky.params.<name>.");let E=B.get(A)??C.get(A)??L.get(A);if(E)return E;let w=aG(v);if(w!==null)return f(A,w);if(rG(v)&&!(v instanceof P0)&&!ArrayBuffer.isView(v))return r(A,v);let h=typeof v==="boolean"?Number(v):v??0;if(!$0(h))throw TypeError(`world.param("${A}", default) takes a finite number, a boolean, a list (a table: .element(i) reads row i) or { size: [w, h], data } (a grid: .sample(uv) reads it filtered) as its default.`);let J0=QQ(h),l=ZQ(J0);if(l)l.name=A,F[A]=l,M.set(l,h);return B.set(A,J0),J0},display:function(A){S=!0;let v=M$(A,"vec3f","world.display(color)").toVar(),E=zQ`sky_frameToneMap()`,w=v.toVar(),h=S0`min(${v}, vec3<f32>(${KQ(h3,"f32")}))`;return s0(E.lessThan(-0.5),function(){s0(E.lessThan(-3.5),function(){w.assign(S0`max(${v}, vec3<f32>(0.0))`)}).ElseIf(E.lessThan(-2.5),function(){w.assign(S0`max(lume_agx_inverse(${h}), vec3<f32>(0.0))`)}).ElseIf(E.lessThan(-1.5),function(){w.assign(S0`lume_cineon_inverse(${h})`)}).Else(function(){w.assign(S0`lume_reinhard_inverse(${h})`)})}).Else(function(){w.assign(S0`sky_displayRadiance(${v})`)}),w},get quality(){return X.quality=!0,Z}}),U0=null,w0=null;try{let{result:A,scope:v}=a5(function(){let E;try{let h=ZU(Q,$,J);E=h.sky??h.default}catch(h){return T(h,(J0)=>`Sky script "${J}" failed to compile: ${J0}`)}if(typeof E!=="function")return x(`Sky script "${J}" must export a sky(ray, world) function that returns a colour node. Fix: export function sky(ray, world) { \u2026 return color; }`);let w;try{w=E(d,z0)}catch(h){return T(h,(J0)=>`Sky script "${J}" threw while composing the sky: ${J0}`)}if(!(w instanceof P0))return x(r3(`Sky script "${J}" must return a colour node from sky(ray, world) (e.g. world.atmosphere.add(world.sun.disc())). It returned ${w===null?"null":typeof w}.`,P));return Q0(KQ(w,"vec3f"),"vec3f")});U0=A,w0=v}catch(A){return T(A,(v)=>`Sky script "${J}" failed while recording its graph: ${v}`)}if(U0===null)return null;try{let A=new A9,v=xI({stage:"fragment",scope:w0,outputs:[{name:"color",node:U0}],inputs:UI,symbolNames:A,uniformName:(_)=>`skyScript.${A.name("uniform",_.id)}`}),E=`${v.body}
${v.fnDefs}`;TI(v,E);let w=s4(v.uniforms,(_)=>A.name("uniform",_.id),D.map((_)=>({field:_.field,vec4s:_.rows}))),h=v.uniforms.length>0||D.length>0,J0=h?w.wgslStruct("SkyScriptParams"):zU,l=N.length>0?DI(N):null,b=(_)=>l?NI(_,l):_,g=v.modules.map((_)=>_.source.trim());if(S)g.push(KG.trim());if(v.fnDefs.trim().length>0)g.push(v.fnDefs.trim());let n=MI.test(E);return g.push(`const sky_scriptWarmAir: f32 = ${n?1:0}.0;`),LI(J,$.hash,P),{ref:J,hash:I(),quality:X.quality?Z:null,defs:b(g.join(`

`)),body:b(v.body),paramsStruct:J0,...l?{grids:l}:{},uniformSlots:v.uniforms,uniformOffsets:w.offsets,uniformByteSize:h?w.byteSize:16,paramSlots:F,paramDefaults:M,paramTables:D.map((_)=>({name:_.name,width:_.width,rows:_.rows,offset:w.arrayOffsets.get(_.field)??0,defaults:_.defaults})),readsClouds:c,readsNight:BI.test(E),readsAtmosphere:n}}catch(A){return T(A,(v)=>`Sky script "${J}" could not be lowered to a shader: ${v}`)}}var GU=2900;var SI=function(){UU({limitMs:GU,now:()=>performance.now(),turn:HU,onStop:function($,J,Q){__sc.warn(`[frame-stretch] creator code held the picture's thread ${Math.round(J)} ms near line ${$}, and was stopped; its build draws the fallback look
${Q.stack??""}`)}})};;

function aa(Q,J){throw Error(`wgsl rows: the row ${JSON.stringify(Q)} names the slot "${J}", which its table does not carry`);
}
function fa(Q,J,Z){let X=Q.attributes.filter((H)=>J.has(H.name)),j=new Set(X.map((H)=>H.shaderLocation)),q=[],V=[];for(let[H,U]of Z.entries()){let F=Array.from(U.attributes).filter((M)=>j.has(M.shaderLocation));if(F.length===0)continue;q.push(H),V.push({...U,attributes:F})}let Y={...Q,attributes:X};
ba[0]=q,ba[1]=V,ba[2]=Y}
function ga(){throw Error("lume native vertex reader: wide layout has no packed source");
}
function ha(G,z,Y,K){return{surface:{slots:[],vertexBuffers:[],packed:{binding:G,streams:z}},layout:Y,reader:{wgsl:K.native,inputs:K.inputs}}
}
function ia(J,$){let Q=`material.${sJ}[${J>>2}].${g2[J&3]}`;return $==="u32"?Q:`bitcast<i32>(${Q})`
}
function ja(X,$,j,Z){X.push($.slice(j));let q=X.join(""),V=q.indexOf(t6);return V<0?q:`${q.slice(0,V)}${Z}${q.slice(V+1)}`
}
function la(J,Q,Z){return{slotOf:J,decimalVectors:Math.ceil(Q/4),wholeVectors:Math.ceil(Z/4)}
}
function ma(Z,X,j){return{rewrite:(q)=>Z.reduce((V,Y)=>Y.rewrite(V),q),rewriteScope:(q)=>q===null?null:Z.reduce((V,Y)=>Y.rewriteScope(V),q),rolled:X,tableRows:j}
}
function na(j,H){j.push({region:H.instance.id,roots:n$(H.instance)});
}
function oa(j,$,Z,X){j=`i[${$.branches.map((q)=>`${q.cond===null?"-":Z(q.cond)}{${X(q.scope)}}`).join("|")}]`;
return j}
function pa(j,$,Z){j=`t${$.buffer.id}${$.component??""}:${Z($.index)}:${Z($.value)}`;
return j}
function qa(Z,Q,J){let X=this.instance(Z.instance);return X!==Z.instance||!iJ(Q,J.inputs)?j0(Z.kind,J.type,Q,{instance:X}):J
}
function ra($){this.instancesDone.set($.id,$);let Q=this.region;this.region=$.id;let Z=this.rewriteScope($.body);this.region=Q;
return Z}
function sa(X,$,Q){if(X={...$,value:Q($.value)},X.value===$.value)return $;return X;
}
function ta($,Q,Z){{let j=$.branches.map((q)=>({cond:q.cond===null?null:Q(q.cond),scope:Z(q.scope)}));if(j.every((q,V)=>q.cond===$.branches[V].cond&&q.scope===$.branches[V].scope))return $;return{kind:"if",branches:j}}
return ca}
function ua(Q,$,Z){{let j=Q($.start),q=Q($.end),V=Z($.scope);if(j===$.start&&q===$.end&&V===$.scope)return $;return{...$,start:j,end:q,scope:V}}
return ca}
function va(X,$,Q){if(X={...$,node:Q($.node)},X.node===$.node)return $;return X;
}
function wa($,Q){let j=$.cond===null?null:Q($.cond);if(j===$.cond)return $;return{kind:"discard",cond:j}
}
function xa(Q,$){{let j=Q($.index),q=Q($.value);if(j===$.index&&q===$.value)return $;return{...$,index:j,value:q}}
return ca}
function ya(Q){return{walk:null,failAt:Math.max(1,Q.failAt),splitAt:-1};
}
function za($,J,Q){{let Z=$.filter((X)=>X.kind==="if");for(let X=1;X<this.n;X+=1)if(Z[X].branches.length!==J.branches.length)return this.fail(X);for(let X=0;X<J.branches.length;X+=1){let j=Z.map((q)=>q.branches[X]);for(let q=1;q<this.n;q+=1)if(j[q].cond===null!==(J.branches[X].cond===null))return this.fail(q);if(J.branches[X].cond!==null&&!this.walkRoots(j.map((q)=>q.cond).filter(Q),!1))return!1;if(!this.walkStmts(j.map((q)=>q.scope.stmts)))return!1}return!0}
return ca}
function Aa($,J){{let Z=$.filter((X)=>X.kind==="loop");for(let X=1;X<this.n;X+=1)if(Z[X].trips!==J.trips||Z[X].counter.type!==J.counter.type)return this.fail(X);if(!this.walkRoots(Z.map((X)=>X.start),!0)||!this.walkRoots(Z.map((X)=>X.end),!0))return!1;return this.declare(Z.map((X)=>X.counter)),this.walkStmts(Z.map((X)=>X.scope.stmts))}
return ca}
function Ba($){return this.walkRoots($.filter((Z)=>Z.kind==="sideEffect").map((Z)=>Z.node),!1);
}
function Ca($,J,Q){{let Z=$.filter((X)=>X.kind==="discard").map((X)=>X.cond);for(let X=1;X<this.n;X+=1)if(Z[X]===null!==(J.cond===null))return this.fail(X);return J.cond===null||this.walkRoots(Z.filter(Q),!1)}
return ca}
function Da($,J){{let Z=$.filter((X)=>X.kind==="store");for(let X=1;X<this.n;X+=1)if(Z[X].buffer!==J.buffer||Z[X].component!==J.component)return this.fail(X);return this.walkRoots(Z.map((X)=>X.index),!1)&&this.walkRoots(Z.map((X)=>X.value),!1)}
return ca}
function Ea(Q,$){return`V${Q.instance.id}:${$.type}/${$.inputs.length}`;
}
function Fa($){let J=new Map,Q=(X)=>X.meta.kind==="vertexStage",Z=function(X){let j=new Set;q8(X,j,J,Q);for(let q of j)if($.has(q))return!0;return!1};
return Z}
function Ga(J){let Q=this.instanceOf(J.instance);return Q===J.instance?J:{...J,instance:Q}
}
function Ha(X,G,z){X(G.variable.id,{values:[G.init],controls:z});
}
function Ia(X,G,z){X(G.variable.id,{values:[G.value],controls:z});
}
function Ja(J){if(!vW.has(J.name)||J.fragmentOnly===!0)return P8;return J.name==="time"?qZ:{...qZ,rows:w8};
}
function Ka(J){return this.variables.has(J.variable.id)?{one:!0,heavy:!0,readsVar:!0,rows:w8}:P8;
}
function La(J){return(J.kind==="storageRead"&&J.buffer.engine===void 0)}
function Ma(J){return(J.kind==="wgslExpr"&&J.module!==null&&E8([J.module]))}
function Na(J){for(let Q of J.attributes)if(Q.encoding!==void 0)return g5;return Sj
}
function Oa(Q,q,Z,V,Y){if(Q)q.push(Z),V.push("  lumeSlotAttr: u32,"),Y.push("  out.lumeSlotAttr = raw.lumeSlotAttr;");return[`struct VertexInRaw {
${q.join(`
`)}
}`,`struct VertexIn {
${V.join(`
`)}
}`,["fn lume_decodeVertexIn(raw: VertexInRaw) -> VertexIn {","  var out: VertexIn;",...Y,"  return out;","}"].join(`
`),p6].join(`

`)
}
function Pa(Q,q,Z){if(Q)q.push(Z);return`struct VertexIn {
${q.join(`
`)}
}`
}
function Qa(J){let j=[];for(let q of J.attributes)j.push({name:q.name,format:GV(q.format,q.name),offset:q.offset});return Rq({structName:"VertexIn",fnName:"lume_pullVertexIn",bufferName:"lumeVertexArena",attributes:j,arrayStride:J.arrayStride,baseElementExpr:"vertexIndex"})
}
function Ra(J,$){throw Error(`lume assemble: attribute '${J}' has format '${$}', which the storage attributeSource cannot express (f32 arena only). Keep this lane on the vertex arm or widen pulledAttributeWgsl.`)
}
function Sa($){throw Error(`lume: unsupported vertex format '${$}'`);
}
function Ta(J,Q,$){try{return Q0(J,Q[0])}catch{throw new Z0(`material.${$}Node must be ${Q.join(" or ")} (a scalar broadcasts and a wider vector reads its leading components, as three's slot constructors convert), got ${J.type} \u2014 a matrix does not convert; multiply a vector by it or read one of its columns`,{code:"slot-type-unconvertible",slot:`${$}Node`,got:J.type})}
return ca}
function Ua(Y){return([Y.replace("in.position","lume_in.position").trimEnd()])}
function Va(J){throw Error(`lume: internal \u2014 '${J}' is not a lane channel`);
}
function Wa(J){let Q=new Set(["positionLocal","positionWorld","positionRender","normalWorld"]),Z=J?J.localPositionSlot?.variable:"localPos";if(Z===void 0)return Q;let X=new RegExp(`\\b${Z}\\b`);
return ba[0]=Q,ba[1]=X,ca}
function Xa(Q,Z){for(let X of Q.instanceSet.fields)Z[`attribute:${X.name}`]=Q4("f32",X.components);
}
function Ya(Z,X){Z.push(X,`reads uv(${String(b5.indexOf(X))})`);
}
function Za(Q,Z){if(Q.colorAttribute)Z.push("vertexColor","reads vertexColor");if(Q.normalWorldV)Z.push("normalWorld","reads normals");if(Q.normalLocal)Z.push("normalLocal","reads normalLocal");if(Q.positionLocal)Z.push("positionLocal","reads positionLocal");
}
function _a(Z,X,$){throw Error(`lume: material ${Z[X+1]} but the '${$.key}' vertex path does not provide it`);
}
function $a($,J){throw Error(`lume: internal \u2014 vertex path '${$.key}' input '${J}' missing after validation`);
}
function ab($,Q){let Z=$.localPositionSlot,X=Q?$.casterPositionWgsl??$.positionWgsl:$.positionWgsl;if(Z!==void 0&&!X.includes(Z.marker))throw Error(`lume: internal \u2014 vertex path '${$.key}' declares a localPositionSlot but its positionWgsl carries no marker line`);let j=Z?.previous;if(j!==void 0&&!Q&&!X.includes(j.marker))throw Error(`lume: internal \u2014 vertex path '${$.key}' declares a previous seat but its positionWgsl carries no previous marker line`);let q=[];
ba[0]=Z,ba[1]=X,ba[2]=j,ba[3]=q}
function bb(J,Q,q,Z,j){if(J&&!Q)q.push("  {",GY(x4(J.body,{[Z.variable]:"lume_authoredPos",...j.renames})),`    if (all(abs(out_position) <= vec3<f32>(1e6))) { ${j.variable} = out_position; }`,"  }");
}
function cb(J,q,Z){if(J)q.push(`  let ${Z.displacedFlag} = true;`,`  let lume_authoredPos: vec3<f32> = ${Z.variable};`,J.body,`  ${Z.variable} = out_position;`,`  let lume_seatOk: bool = all(abs(${Z.variable}) <= vec3<f32>(1e6));`,`  ${Z.variable} = select(lume_authoredPos, ${Z.variable}, lume_seatOk);`);else q.push(`  let ${Z.displacedFlag} = false;`)
}
function db(){return(`LumeCoveredDepthOut(vec4<f32>(0.0), ${y5})`)}
function eb(J,$){return J?`PictureDepthCoveredOut(vec4<f32>(0.0), ${$}, ${y5})`:`PictureDepthOut(vec4<f32>(0.0), ${$})`
}
function fb($){return $?"PictureDepthCoveredOut":"LumeCoveredDepthOut";
}
function gb($){return(`lume_surfaceMotion(${$}, lume_motionVector(in.motionCurrentClip, in.motionPreviousClip))`)}
function hb(Z){return[`  let ${fq}: u32 = ${y5};`,`  return ${Z};`];
}
function ib($){return(`${$}
@group(3) @binding(${i7}) var<storage, read> lume_materialBlocks: array<Material>;
var<private> material: Material;`)}
function jb(J,$){for(let Z of J.clipWgsl??D9)$.reserve(Z);if(J.normalFacingKept)$.reserve(J.normalFacingKept);if(J.coverage)$.reserve(J.coverage);
}
function kb(J,$){for(let Z of J.fragmentReads?.lines??D9)$.reserve(Z);for(let Z of J.fragmentReads?.varyings??B9)$.reserve(Z.name);if(J.fragmentReads?.lit)$.reserve(J.fragmentReads.lit.defs);let Q=J.localPositionSlot;
return Q}
function lb(Q,$){if(Q.previous)for(let Z of[Q.previous.marker,Q.previous.variable,...Object.keys(Q.previous.renames),...Object.values(Q.previous.renames)])$.reserve(Z)
}
function mb($,J,Q,Z,X,j,q){$.push({device:J,key:Q,width:Z,height:X,value:j,textures:q}),i4+=1
}
function nb(P){throw TypeError(`ctx.previousUv(P) takes a world-position node (vec3) \u2014 ctx.worldPosition(uv) or a marched point. Got ${P===null?"null":typeof P}.`);
}
function ob(J){return h9(Q3,J,`Look script "${J}" must export a look(ctx) function that returns a color node. Fix: export function look(ctx) { ... return ctx.scene; }`),null;
}
function pb(J,z0){return h9(Z3,J,`Look script "${J}" must return a color node from look(ctx) (e.g. ctx.scene or a postfx wrapper of it). It returned ${z0===null?"null":typeof z0}.`),null;
}
function ca(){}var da;var ka;function ba(){}

;import"./60d2a80e-3b2a74e2c618d12a.mjs";import"./36e1ee31f0733f71.mjs";import"./26ceb10f-156258ddd53795f5.mjs";import"./f11f54a2bd263bff.mjs";import"./db293faeb5424f3a.mjs";import"./f81c9654-1abf69790c44cc71.mjs";import"./4765ec0c-9a9e938d93b51874.mjs";import"./59031fb6a4af82a1.mjs";import"./6693f96d-39d85c02b2906ffa.mjs";import"./cfe2ed5d1ccaf3c8.mjs";import"./5bfc27ec75dfbbea.mjs";import"./066edad7-f7400e45e1d275b5.mjs";import"./9b93e26679f0ec35.mjs";import"./13edbdb4-856331cc94157d5f.mjs";import"./2b94eb755d27040b.mjs";import{$EK as A9,$Wk as xG,$_l as EG,ACB as _G,AoF as TK,Aow as T0,AqF as cq,AsE as _q,B13 as hI,BSG as xz,D98 as XG,DEE as bI,DPL as sq,DPz as Rq,Dhe as Aq,Dk7 as P9,DpJ as Nz,DsT as p2,Dvv as J3,E9X as Lz,EIL as vq,EVH as RJ,E_E as Dj,EcS as l0,FMf as $3,FQh as x5,FuT as kz,GQD as s5,Ggy as e0,Gu1 as $G,Hpj as fq,ION as b8,IWy as QG,Ijf as YQ,JBf as C7,JKz as $Z,Jzm as xq,K6S as $9,KFY as Iz,KKT as x9,KLm as B6,KMh as cK,KRJ as kG,KV2 as G$,Kmp as Sq,L1X as rq,L8Q as wJ,LJ4 as B7,LSM as AK,MgJ as X6,Mig as y1,NRx as R9,NbU as RK,Nr6 as BG,O4D as f2,OAU as dK,OYZ as nq,OiU as D7,PaZ as d1,Pjz as h6,QDv as MG,RNI as U4,RoL as yq,S2P as dq,S5I as T7,SQb as P7,SSR as PG,SfH as Dq,TCI as pq,TpM as tK,U7J as $5,UDC as O5,UHL as Gj,UOx as XQ,VHJ as AG,VgU as tq,Vlh as P$,Vlz as o0,WQP as NG,Wa2 as ZG,WtZ as g9,XI4 as T5,XRk as n6,XSd as W9,Xdo as d2,XfT as l2,XmL as _5,Y4k as YU,Yxp as p0,ZF0 as eK,ZeW as qU,Zfq as hq,Zic as l6,Zoa as bq,_Am as v8,_qS as OK,_qW as p9,_sD as mq,a7z as XU,amQ as W6,apl as i3,atS as Gz,b$3 as AZ,bAE as I6,bRo as sK,bTo as H4,bjr as I7,cA6 as N7,cjo as G4,cr7 as _I,dIR as Q1,dLq as aK,dOa as LG,e71 as TG,eP0 as P6,eYb as Eq,ech as EJ,edj as O7,eyd as JG,ez8 as Oq,eza as x7,ffo as V4,fkO as VQ,g3R as rz,gSh as M7,htm as X2,iBo as n3,ik6 as vG,iqs as uq,iqx as V7,iux as iq,jB7 as r3,jJo as k7,kbj as Iq,kwv as fI,lDO as yG,lIv as aq,lKR as gq,lR8 as EI,lSa as BJ,lax as q4,lza as q8,nMR as LK,nl8 as rK,nnU as gz,nxV as n$,o$4 as g4,o5B as oq,o7s as VU,oRm as gI,p9z as k9,pGn as OG,pPa as K4,pRq as wI,pU0 as z4,pec as bG,pxe as kq,q_m as m0,qbZ as N6,rsY as i2,rwD as RG,ryY as wq,s0T as c6,s2H as p3,s6z as S8,sZ7 as Tq,skY as jU,ssQ as vK,tJ3 as ZU,tLM as L9,tOJ as z8,tW3 as J5,tcT as _J,tiF as jG,tl5 as QU,tvV as s4,u36 as m$,uG7 as F7,uLV as SG,vXT as n2,v_S as pK,vcF as gJ,vow as K5,w56 as Lq,wE8 as wG,yfG as lq,z2O as LZ,zLX as Y4,zOk as o2,zRR as Nq,zhq as _9}from"./6f3832a6-16f818a35b86f3d3.mjs";import{$pL as v2,F5B as aG,IO$ as Pq,Mux as q6,Sqo as Fq,T9F as Hq,UFy as Wq,VV1 as z5,eAs as p$,fky as Bq,iQk as RZ,mBx as j4,oAT as E5,qQ0 as sG}from"./d412131d-4739c10f2839415d.mjs";import{zOB as zz}from"./67196ef97dba1df8.mjs";import{Ksq as Ez,PFa as G3,UaV as Cq,UdC as r5,d2M as I9,ge4 as $U,lTN as _z,pno as Mq,q7S as E8,qP$ as N9,tJv as JU}from"./431db51f371d337d.mjs";import"./1634b73216c349b0.mjs";import{vpf as xK}from"./43e9ec0ee260a7c4.mjs";import{$Jd as n7,$TX as CK,$g6 as kK,Anw as u$,Bb_ as QQ,Brh as i,BuM as p,Cn3 as Vq,Cuk as h0,DcR as o$,EA0 as c0,EQd as jq,Ewo as c2,HBH as i$,HUp as TZ,IVI as P0,IYd as BK,Iwu as X0,K9j as DK,Koa as eG,KrU as a5,Ln4 as p8,MNB as R0,MNf as J$,Mu_ as b5,N4y as W7,N96 as D8,N9p as OZ,NMu as L2,Ose as ZZ,PRm as O2,Pm8 as Kj,Py$ as j5,R51 as w5,Ra8 as U6,Rvr as u2,SM9 as qq,Vgy as y9,VlA as s0,W13 as Kz,W7Z as Tj,XSv as Kq,Zl2 as NK,_D1 as K3,_Zs as Gq,a0v as Q0,aWk as tJ,cLL as zq,cb5 as x0,dQ3 as Z0,e$F as Z9,e69 as A2,eZH as IK,ef7 as Yq,fHq as M0,faE as ZK,gwl as ZQ,gy4 as MK,hRW as Q4,iHZ as oJ,iQl as d$,ixa as tG,je0 as a3,k46 as c$,l8U as YZ,l9o as PK,lEN as W8,lyE as X5,nD5 as N0,nIB as R2,nqf as KQ,nwK as I0,oFi as a4,q_0 as l$,rFh as u0,rk6 as XK,sfu as u,tFq as H6,tnw as e6,w3N as l7,woM as X4,xRw as Z4,yWP as j0,yZl as D6,yjL as Uq}from"./75f9d7a9-007e085d86a246da.mjs";import"./72febfebe1981a8e.mjs";import{IP6 as U3}from"./8865d56dfd1ef402.mjs";import{A30 as J4,AXn as O9,Def as d6,DuM as WG,EzM as l3,FFn as C3,H0q as kJ,HGV as P3,J8B as w9,JNY as $4,JPf as Z$,K9_ as H$,Ko0 as mK,Lcn as jQ,NZA as O3,Nu2 as bJ,O7v as x3,OT$ as A3,OhB as F$,OuG as b3,PVx as _3,RDp as F0,Raz as k5,VCM as y8,VeE as I3,Vvw as T3,XYw as rG,YST as W3,Zpc as _6,_Td as m,a1i as m3,aYH as y3,ahj as fK,bVy as k3,cAO as GK,dlr as f6,dp3 as Qq,e2D as iJ,e3w as $0,eut as dQ,gad as w3,gnp as u3,gsg as Zq,hpi as R3,iJU as IG,iOc as FG,iaN as S3,jEz as j7,k$w as L8,kXg as Xq,l_6 as M3,l_q as E9,lsY as g3,mAc as B3,nRM as qQ,oAF as E3,oMD as uK,rD3 as oG,u8m as d9,uM_ as Jq,utO as gK,v6R as n0,vDR as D3,w9R as L3,xii as hK,y3_ as N3,yML as h$,zEr as v3}from"./5484a777-fd0f9ebe9e6458c5.mjs";import{Jcc as HU,RFm as HK,hT5 as UU}from"./bb88cdd4b0f7fceb.mjs";import"./9da9e7475faccf8d.mjs";import"./c7e7e2bfe45137b2.mjs";import{Nuk as q7}from"./ff1dcf034e62820a.mjs";import{baH as b$,ts0 as L0}from"./7963a4de78405a38.mjs";import{IVz as x2,woq as tY,xWV as Yz}from"./a70d99406cef2870.mjs";import{Rqq as d7,cft as M1,ved as PJ}from"./18d16e05ecc6f3aa.mjs";import{Xxj as FK,ZpK as WK}from"./3cad786478980b2a.mjs";import"./9d27713d1810e54b.mjs";import"./9ac32268a640d670.mjs";import{Z_d as f9,boO as UK}from"./3041b4833540ee3e.mjs";import"./39c62b1c8c58eeae.mjs";import"./4ede4b89009bc4d4.mjs";import{poZ as uX,tytG as cX}from"./36e1ee31f0733f71.mjs";import{AjM as dX,IzZ as s8,N1n as F8,aGP as WJ}from"./6693f96d-39d85c02b2906ffa.mjs";import{DQ5 as qj,LCb as UZ,Nd5 as jj,Q$A as pQ,SGw as cQ,Tod as g6,X0y as GZ,Z_E as J9,fuc as Q7,iCo as uQ,iU9 as Zj,mGI as yj,yqN as Xj,zMB as oX}from"./13edbdb4-856331cc94157d5f.mjs";import{AjA as DJ,b_B as aX}from"./066edad7-f7400e45e1d275b5.mjs";export{BD as mintLookTextureLease,EI as compileMaterialBuilderAhead,OD as censusScriptedLookFromEntry,SI as armPictureRealmHold,_I as materialBuilderCompiled,aY as assembleMaterialShaderSteps,bI as rebindScriptedParamPictures,bK as buildScriptedLookFromEntry,fI as cloneScriptedMaterialHost,gI as buildScriptedMaterialFromEntry,hI as drainMaterialBuilders,vI as compileSkyScriptFromEntry,wI as compileLightingScriptFromEntry,wK as buildScriptedLookStepsFromEntry,xM as assembleMaterialShader};
