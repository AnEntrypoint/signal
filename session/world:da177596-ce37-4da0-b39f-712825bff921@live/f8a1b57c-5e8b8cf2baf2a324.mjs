;;;;;;;;;;;;;;;;;;var __sc=/*@__PURE__*/(()=>globalThis.__spawnEngineConsole??=Object.create(console))();
;;;;;;;;;;;;;;;;;;;;;;;;;;var g$=Math.SQRT1_2,cT=[{turn:($,J,Q)=>[$,J,Q],upright:[0,0,0,1]},{turn:($,J,Q)=>[$,Q,-J],upright:[-g$,0,0,g$]},{turn:($,J,Q)=>[$,-Q,J],upright:[g$,0,0,g$]},{turn:($,J,Q)=>[-J,$,Q],upright:[0,0,g$,g$]},{turn:($,J,Q)=>[J,-$,Q],upright:[0,0,-g$,g$]},{turn:($,J,Q)=>[$,-J,-Q],upright:[1,0,0,0]}];;class r6{constructor($=0,J=0,Q=0){this.a=void 0;this.o=void 0;this.a=new Float32Array(3),this.o=0,this.a[0]=$,this.a[1]=J,this.a[2]=Q}static view($,J){let Q=new r6;return Q.a=$,Q.o=J,Q}get x(){return this.a[this.o]}set x($){this.a[this.o]=$}get y(){return this.a[this.o+1]}set y($){this.a[this.o+1]=$}get z(){return this.a[this.o+2]}set z($){this.a[this.o+2]=$}set($,J,Q){return this.a[this.o]=$,this.a[this.o+1]=J,this.a[this.o+2]=Q,this}copy($){let J=this.a,Q=this.o,Z=$.a,X=$.o;return J[Q]=Z[X],J[Q+1]=Z[X+1],J[Q+2]=Z[X+2],this}add($){let J=this.a,Q=this.o,Z=$.a,X=$.o;return J[Q]=J[Q]+Z[X],J[Q+1]=J[Q+1]+Z[X+1],J[Q+2]=J[Q+2]+Z[X+2],this}subVectors($,J){let Q=this.a,Z=this.o,X=$.a,j=$.o,V=J.a,Y=J.o;return Q[Z]=X[j]-V[Y],Q[Z+1]=X[j+1]-V[Y+1],Q[Z+2]=X[j+2]-V[Y+2],this}addScaledVector($,J){let Q=this.a,Z=this.o,X=$.a,j=$.o;return Q[Z]=Q[Z]+X[j]*J,Q[Z+1]=Q[Z+1]+X[j+1]*J,Q[Z+2]=Q[Z+2]+X[j+2]*J,this}multiplyScalar($){let J=this.a,Q=this.o;return J[Q]=J[Q]*$,J[Q+1]=J[Q+1]*$,J[Q+2]=J[Q+2]*$,this}multiply($){let J=this.a,Q=this.o,Z=$.a,X=$.o;return J[Q]=J[Q]*Z[X],J[Q+1]=J[Q+1]*Z[X+1],J[Q+2]=J[Q+2]*Z[X+2],this}crossVectors($,J){let{a:Q,o:Z}=$,X=J.a,j=J.o,V=Q[Z],Y=Q[Z+1],K=Q[Z+2],G=X[j],q=X[j+1],z=X[j+2],H=this.a,U=this.o;return H[U]=Y*z-K*q,H[U+1]=K*G-V*z,H[U+2]=V*q-Y*G,this}dot($){let J=this.a,Q=this.o,Z=$.a,X=$.o;return J[Q]*Z[X]+J[Q+1]*Z[X+1]+J[Q+2]*Z[X+2]}lengthSq(){let $=this.a,J=this.o;return $[J]*$[J]+$[J+1]*$[J+1]+$[J+2]*$[J+2]}length(){return Math.sqrt(this.lengthSq())}distanceTo($){let J=this.a,Q=this.o,Z=$.a,X=$.o,j=J[Q]-Z[X],V=J[Q+1]-Z[X+1],Y=J[Q+2]-Z[X+2];return Math.sqrt(j*j+V*V+Y*Y)}normalize(){let $=this.a,J=this.o,Q=Math.sqrt($[J]*$[J]+$[J+1]*$[J+1]+$[J+2]*$[J+2]);if(Q>0){let Z=1/Q;$[J]=$[J]*Z,$[J+1]=$[J+1]*Z,$[J+2]=$[J+2]*Z}return this}applyQuaternion($){let J=this.a,Q=this.o,Z=$.a,X=$.o,j=J[Q],V=J[Q+1],Y=J[Q+2],K=Z[X],G=Z[X+1],q=Z[X+2],z=Z[X+3],H=2*(G*Y-q*V),U=2*(q*j-K*Y),W=2*(K*V-G*j);return J[Q]=j+z*H+G*W-q*U,J[Q+1]=V+z*U+q*H-K*W,J[Q+2]=Y+z*W+K*U-G*H,this}applyMatrix4($){let{a:J,o:Q}=$,Z=this.a,X=this.o,j=Z[X],V=Z[X+1],Y=Z[X+2],K=1/(J[Q+3]*j+J[Q+7]*V+J[Q+11]*Y+J[Q+15]||1);return Z[X]=(J[Q]*j+J[Q+4]*V+J[Q+8]*Y+J[Q+12])*K,Z[X+1]=(J[Q+1]*j+J[Q+5]*V+J[Q+9]*Y+J[Q+13])*K,Z[X+2]=(J[Q+2]*j+J[Q+6]*V+J[Q+10]*Y+J[Q+14])*K,this}setFromMatrixPosition($){let J=this.a,Q=this.o,Z=$.a,X=$.o;return J[Q]=Z[X+12],J[Q+1]=Z[X+13],J[Q+2]=Z[X+14],this}}class h7{constructor($=0,J=0,Q=0,Z=1){this.a=void 0;this.o=void 0;this.a=new Float32Array(4),this.o=0,this.a[0]=$,this.a[1]=J,this.a[2]=Q,this.a[3]=Z}static view($,J){let Q=new h7;return Q.a=$,Q.o=J,Q}get x(){return this.a[this.o]}set x($){this.a[this.o]=$}get y(){return this.a[this.o+1]}set y($){this.a[this.o+1]=$}get z(){return this.a[this.o+2]}set z($){this.a[this.o+2]=$}get w(){return this.a[this.o+3]}set w($){this.a[this.o+3]=$}set($,J,Q,Z){return this.a[this.o]=$,this.a[this.o+1]=J,this.a[this.o+2]=Q,this.a[this.o+3]=Z,this}copy($){let J=this.a,Q=this.o,Z=$.a,X=$.o;return J[Q]=Z[X],J[Q+1]=Z[X+1],J[Q+2]=Z[X+2],J[Q+3]=Z[X+3],this}identity(){return this.set(0,0,0,1)}invert(){let $=this.a,J=this.o;return $[J]=-$[J],$[J+1]=-$[J+1],$[J+2]=-$[J+2],this}dot($){let J=this.a,Q=this.o,Z=$.a,X=$.o;return J[Q]*Z[X]+J[Q+1]*Z[X+1]+J[Q+2]*Z[X+2]+J[Q+3]*Z[X+3]}lengthSq(){return this.dot(this)}normalize(){let $=this.a,J=this.o,Q=Math.sqrt($[J]*$[J]+$[J+1]*$[J+1]+$[J+2]*$[J+2]+$[J+3]*$[J+3]);if(Q<0.000000000001)return $[J]=0,$[J+1]=0,$[J+2]=0,$[J+3]=1,this;return $[J]=$[J]/Q,$[J+1]=$[J+1]/Q,$[J+2]=$[J+2]/Q,$[J+3]=$[J+3]/Q,this}multiplyQuaternions($,J){let{a:Q,o:Z}=$,X=J.a,j=J.o,V=Q[Z],Y=Q[Z+1],K=Q[Z+2],G=Q[Z+3],q=X[j],z=X[j+1],H=X[j+2],U=X[j+3],W=this.a,M=this.o;return W[M]=V*U+G*q+Y*H-K*z,W[M+1]=Y*U+G*z+K*q-V*H,W[M+2]=K*U+G*H+V*z-Y*q,W[M+3]=G*U-V*q-Y*z-K*H,this}multiply($){return this.multiplyQuaternions(this,$)}premultiply($){return this.multiplyQuaternions($,this)}setFromAxisAngle($,J){let Q=J/2,Z=Math.sin(Q),X=$.a,j=$.o,V=this.a,Y=this.o;return V[Y]=X[j]*Z,V[Y+1]=X[j+1]*Z,V[Y+2]=X[j+2]*Z,V[Y+3]=Math.cos(Q),this}setFromUnitVectors($,J){let{a:Q,o:Z}=$,X=J.a,j=J.o,V=Q[Z],Y=Q[Z+1],K=Q[Z+2],G=X[j],q=X[j+1],z=X[j+2],H=V*G+Y*q+K*z+1,U=this.a,W=this.o;if(H<0.00000001){H=aa(H,V,K,U,W,Y)}else U[W]=Y*z-K*q,U[W+1]=K*G-V*z,U[W+2]=V*q-Y*G,U[W+3]=H;return this.normalize()}slerp($,J){if(J<=0)return this;if(J>=1)return this.copy($);let Q=this.a,Z=this.o,X=$.a,j=$.o,V=Q[Z]*X[j]+Q[Z+1]*X[j+1]+Q[Z+2]*X[j+2]+Q[Z+3]*X[j+3],Y=X[j],K=X[j+1],G=X[j+2],q=X[j+3];if(V<0)V=-V,Y=-Y,K=-K,G=-G,q=-q;let z,H;if(1-V<0.00001)z=1-J,H=J;else{let U=Math.acos(Math.min(1,V)),W=Math.sin(U);z=Math.sin((1-J)*U)/W,H=Math.sin(J*U)/W}return Q[Z]=Q[Z]*z+Y*H,Q[Z+1]=Q[Z+1]*z+K*H,Q[Z+2]=Q[Z+2]*z+G*H,Q[Z+3]=Q[Z+3]*z+q*H,this.normalize()}}var T1=1/Math.tan(S0/6);var QA=new Float32Array(1+L1);var _A={near:k1,far:N1.desktop};var p7=`fn lume_view_z_of_depth(depth: f32, near: f32, far: f32, ortho: f32, depthScale: f32) -> f32 {
  let z = depth * depthScale;
  let perspective = 1.0 - ortho;
  let span = far - near;
  let nearW = perspective * near + ortho;
  return (z * ortho * span - nearW * far) / (nearW + z * perspective * span);
}`;var PW=880,yA=PW/4;var _$=`fn lume_worldFromRender(p: vec3<f32>) -> vec3<f32> {
  return p + frame.renderOrigin;
}`,hA=`fn lume_placedClip(viewProj: mat4x4f, anchor: vec3f, offset: vec3f) -> vec4f {
  let anchorPoint = vec4f(anchor, 1.0);
  return ${d0("anchorPoint","viewProj")} + viewProj * vec4f(offset, 0.0);
}`,c7=`fn lume_motionVector(currentClip: vec4f, previousClip: vec4f) -> vec2f {
  if (frame.motionValid < 0.5 || currentClip.w <= 0.0 || previousClip.w <= 0.0) { return vec2f(0.0); }
  return currentClip.xy / currentClip.w - previousClip.xy / previousClip.w;
}`,mA=`${c7}
struct LumeMotionFragment {
  @location(0) color: vec4f,
  @location(1) motion: vec4f,
}
fn lume_staticMotionFragment(color: vec4f, worldPosition: vec3f) -> LumeMotionFragment {
  let p = vec4f(worldPosition, 1.0);
  return LumeMotionFragment(color, vec4f(lume_motionVector(frame.viewProj * p, frame.prevViewProj * p), 0.0, color.a));
}`;var uA=Math.fround(T1);var DW=4,A1=15,oA=[v0(0,1,"uniform"),n0(A1,2,"unfilterable-float")];function I1($){return`@group(${$}) @binding(${A1}) var coverFloor: texture_2d<f32>;

fn cover_underGround(position: vec4<f32>) -> bool {
  return position.z < textureLoad(coverFloor, vec2<i32>(position.xy) / ${DW}, 0).x;
}`};;var fI=n0(v1,2,"unfilterable-float","2d-array");function b1($){return $!==void 0&&$>0}var V8={deltas:6,params:7,poses:9},E1=[v0(V8.deltas,1,"read-only-storage"),v0(V8.params,1,"read-only-storage"),v0(V8.poses,1,"read-only-storage")];var MQ=4;var IW=4294967295,PQ=($,J,Q,Z)=>`var w = bitcast<f32>(${J});
    if (${$} != ${IW}u) {
      let p = ${Z};
      w = p - min(max(p, w), bitcast<f32>(${Q}));
    }`,g1=`struct MorphParams {
  targetCount: u32,
  _pad0: u32,
  _pad1: u32,
  _pad2: u32,
  weights: array<u32>,
}`,CQ=`struct MorphSum {
  position: vec3<f32>,
  normal: vec3<f32>,
}
fn morph_snorm16(bits: u32) -> f32 {
  return f32(bitcast<i32>(bits << 16u) >> 16u) * (${f7}.0 / 32767.0);
}`;function OW($){return`${g1}
${CQ}
@group(${$}) @binding(${V8.deltas}) var<storage, read> morphRows: array<u32>;
@group(${$}) @binding(${V8.params}) var<storage, read> morph: MorphParams;
@group(${$}) @binding(${V8.poses}) var<storage, read> morphPoses: array<f32>;`}var RW=`  for (var i = start; i < end; i = i + 1u) {
    let e = entries + i * ${X8}u;
    let k = morphRows[e] * 3u;
    let s = morph.weights[k];
    ${PQ("s","morph.weights[k + 1u]","morph.weights[k + 2u]","morphPoses[s]")}
    sum.position = sum.position + vec3<f32>(bitcast<f32>(morphRows[e + 1u]), bitcast<f32>(morphRows[e + 2u]), bitcast<f32>(morphRows[e + 3u])) * w;
    let nxy = morphRows[e + 4u];
    sum.normal = sum.normal + vec3<f32>(morph_snorm16(nxy), morph_snorm16(nxy >> 16u), morph_snorm16(morphRows[e + 5u])) * w;
  }
  return sum;`;function n7($){return`${OW($)}
fn morph_sum(vertex: u32) -> MorphSum {
  var sum: MorphSum;
  sum.position = vec3<f32>(0.0);
  sum.normal = vec3<f32>(0.0);
  let entries = ${D$}u + morphRows[0] + 1u;
  let words = arrayLength(&morphRows);
  let count = min(morphRows[1], (words - min(entries, words)) / ${X8}u);
  let start = morphRows[${D$}u + vertex];
  let end = min(min(morphRows[${D$}u + vertex + 1u], count), start + morph.targetCount);
${RW}
}`}function _1($,J){let Q=n7($).split("fn morph_sum(vertex: u32)")[1];return`@group(${$}) @binding(${J}) var<storage, read> previousMorph: MorphParams;
fn previous_morph_sum(vertex: u32)${Q.replaceAll("morph.weights","previousMorph.weights")}`}var o7={uniform:12,hairKey:13};var $O=[v0(o7.uniform,2,"uniform")],JO=[v0(o7.uniform,2,"uniform"),n0(o7.hairKey,2,"uint","2d")];var SW=`struct EyesThroughOut {
  @location(0) color: vec4<f32>,
  @builtin(frag_depth) hairGate: f32,
}`;function DQ($,J,Q=o7){let Z=[`struct EyesDraw {
  ordinal: f32,
  strength: f32,
  cosAngle: f32,
  pad: f32,
  face: vec3<f32>,
  facePad: f32,
}
@group(${$}) @binding(${Q.uniform}) var<uniform> eyes: EyesDraw;`];if(J)Z.push(`@group(${$}) @binding(${Q.hairKey}) var eyesHairKeys: texture_2d<u32>;`),Z.push(SW);return Z.join(`
`)}var NQ="  return vec4<u32>((u32(eyes.ordinal + 0.5) << 24u) | (bitcast<u32>(clamp(in.position.z, 0.0, 1.0)) >> 6u));",kQ=["  let eyesPixel = vec2<i32>(in.position.xy);","  let eyesHairKey = textureLoad(eyesHairKeys, eyesPixel, 0).r;","  if ((eyesHairKey >> 24u) != u32(eyes.ordinal + 0.5)) { discard; }","  let eyesHairZ = bitcast<f32>(((eyesHairKey & 0xFFFFFFu) << 6u) | 32u);",`  if (in.position.z >= eyesHairZ - (eyesHairZ - frame.depthFloor) * ${i7}) { discard; }`,`  let eyesHairGate = clamp((eyesHairZ - ${i7} * frame.depthFloor) / (1.0 - ${i7}), 0.0, 1.0);`].join(`
`),xQ=($)=>`  return EyesThroughOut(${$}, eyesHairGate);`,TQ=($,J="frame.cameraPosition")=>[`  let eyesFacing: f32 = dot(eyes.face, normalize(${J} - ${$}));`,"  if (eyesFacing < eyes.cosAngle) { discard; }","  let eyesEdge: f32 = smoothstep(eyes.cosAngle, 1.0, eyesFacing);"].join(`
`);var LQ=`
${y1("lume_paneProjectionAlong")}
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
  let projected = ${d0("vec4<f32>(origin + ray * distance, 1.0)")};
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
  let projectedSurface = ${d0("vec4<f32>(surface, 1.0)")};
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
}`;var h1=1080,m1=8,IQ=1,bW=0.5,EW=0.2,xO=Math.cbrt(EW),f1=45,gW=0.18,_W=0.25;var r7=`${s6}
fn ink_shade(surface: vec3<f32>, warm: f32, lightness: f32) -> vec3<f32> {
  if (warm <= 0.0) {
    return surface * (lightness * lightness * lightness);
  }
  let q = pow(max(vec3<f32>(dot(surface, vec3<f32>(0.4122214708, 0.5363325363, 0.0514459929)), dot(surface, vec3<f32>(0.2119034982, 0.6806995451, 0.1073969566)), dot(surface, vec3<f32>(0.0883024619, 0.2817188376, 0.6299787005))), vec3<f32>(0.0)), vec3<f32>(1.0 / 3.0));
  let lab = vec3<f32>(dot(q, vec3<f32>(0.2104542553, 0.793617785, -0.0040720468)), dot(q, vec3<f32>(1.9779984951, -2.428592205, 0.4505937099)), dot(q, vec3<f32>(0.0259040371, 0.7827717662, -0.808675766))) * lightness;
  let warmAb = vec2<f32>(${m(Math.cos(f1*S0/180))}, ${m(Math.sin(f1*S0/180))}) * (${m(gW)} * lab.x);
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
    color = ink_shade(surface, ink.g, ink.b) * (sun * ${_W} + passLights.ambientMean) * ${e6};
  }
  return shade_applyFog(color, viewZ, toward);
}`;var yW=16,OQ=10,fW=(1<<OQ)-1,u1=16,a7=`fn ink_field(clipW: f32, width: f32) -> f32 {
  let near = select(min(1.0, ${m(m1)} / max(clipW, 1e-3)), 1.0, frame.proj[3][3] > 0.5);
  let px = width * near * frame.canvasSize.y / ${m(h1)};
  return select(max(px * frame.viewportSize.y / max(frame.canvasSize.y, 1.0), ${m(IQ)}), smoothstep(${m(bW)}, ${m(IQ)}, px), px < ${m(IQ)});
}

fn ink_objectId(t: vec3<f32>) -> u32 {
  var h = bitcast<u32>(t.x) * 0x9e3779b1u;
  h = (h ^ bitcast<u32>(t.y)) * 0x85ebca77u;
  h = (h ^ bitcast<u32>(t.z)) * 0xc2b2ae3du;
  h = h ^ (h >> 16u);
  return max(h >> ${OQ}u, 1u);
}

fn ink_word(objectId: u32, reach: f32) -> u32 {
  return (objectId << ${OQ}u) | u32(clamp(round(reach * ${m(yW)}), 0.0, ${m(fW)}));
}

struct InkFieldOut {
  @location(0) color: vec4<f32>,
  @location(1) word: u32,
}`;function hW($,J,Q){let Z=[];for(let X=0;X<$.count;X+=1)Z.push(`(dot(${J(X)}.xyz, ${Q}) + ${J(X)}.w < 0.0)`);if(Z.length===0)return"false";return Z.join($.intersection?" && ":" || ")}function p1($,J,Q){return $.count===0?"":`  if (${hW($,J,Q)}) { discard; }`}var c8=512;var c1=8,hO=c1*c1;var mW=Math.fround(-1000000000000000000000000000000),uW=1000000000000000000000000000000,mO=-uW;var pW=2,l1=c8*pW;var uO=p8/c8,cW=4;var lW=c8,pO=lW*cW,lO=new Float64Array([mW,0,0]),dO=new Uint8Array(c8).fill(1),nO=Int32Array.from({length:2*c8+1},($,J)=>J),rO=new Float64Array([0,-1/0]),sO=new Float64Array([NaN,0]);var tO=c8-1;var QR=Math.log2(32)+1;var dW=1,w0=32>>dW,l8=2,nW=4,iW=nW+16*l8,jR=iW+w0*w0*l8;var d1=64,n1=0.0002,i1=0.004;var oW=`struct CullCamera {
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
  skyline: array<vec4<f32>, ${l1/4}>,
  coverWindow: vec4<f32>,
  coverBand: vec4<f32>,
  //${w0}
  eyeGate: vec4<f32>,
  eyeViewProj: array<mat4x4<f32>, ${l8}>,
  eyeCells: array<vec4<f32>, ${w0*w0*l8/4}>,
}
`;var rW=`fn eyeGateHides(e: u32, c: vec3<f32>, h: vec3<f32>, r: f32) -> bool {
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
    let s = vec2<f32>((clip.x / clip.w + 1.0) * ${m(w0/2)}, (1.0 - clip.y / clip.w) * ${m(w0/2)});
    lo = min(lo, s);
    hi = max(hi, s);
  }
  if (hi.x < 0.0 || hi.y < 0.0 || lo.x > ${m(w0)} || lo.y > ${m(w0)}) { return true; }
  let c0 = u32(clamp(floor(lo.x), 0.0, ${m(w0-1)}));
  let c1 = u32(clamp(floor(hi.x), 0.0, ${m(w0-1)}));
  let r0 = u32(clamp(floor(lo.y), 0.0, ${m(w0-1)}));
  let r1 = u32(clamp(floor(hi.y), 0.0, ${m(w0-1)}));
  if ((c1 - c0 + 1u) * (r1 - r0 + 1u) > ${d1}u) { return false; }
  let limit = nearest - nearest * ${m(n1)} - ${m(i1)};
  let base = e * ${w0*w0}u;
  for (var row = r0; row <= r1; row = row + 1u) {
    for (var col = c0; col <= c1; col = col + 1u) {
      let i = base + row * ${w0}u + col;
      if (!(camera.eyeCells[i >> 2u][i & 3u] < limit)) { return false; }
    }
  }
  return true;
}`,aW=`fn eyesHide(c: vec3<f32>, h: vec3<f32>, r: f32) -> bool {
  let eyes = min(u32(max(camera.eyeGate.x, 0.0)), ${l8}u);
  if (eyes == 0u) { return false; }
  for (var e = 0u; e < eyes; e = e + 1u) {
    if (!eyeGateHides(e, c, h, r)) { return false; }
  }
  return true;
}`;var o1=4;;var QF=!1;function s1(){return QF}var eS=t1.constrained;var n8=24,e7=12,KF=e7*n8,_Q="0.0009765625",J9=65536,qF=16;var vv=qF*3,GF=17,wv=(1<<GF)-1;var zF=22,UF=532676608;var bv=UF>>>zF;var HF=6,Ev=2**(30-HF);var WF=536870912,gv=WF-1;var i0=7,_v=(1<<i0)-1;var FF=67108864;var yv=FF-1;var fv=24+8*i0;var BF=10;var hv=(1<<BF)-1,wQ="tbl_eyeWalks";var MF=2,PF=4;var CF=20,mv=Math.sin(CF*S0/180);var DF=2;var e1=2048;var NF=32768;var kF=2,$2=4;var J2=16;var xF=64;var Q2=1024,t7=2048;var TF=32768,LF=65536,uv={flags:0,vertexCount:1,ownIndex:2,ownCount:3,position:4,normal:5,uv:6,uvB:7,color:8,levelCount:9,casterCount:10,ownBounds:11,sphere:12,levels:16,casterLevels:16+4*i0,extent:16+8*i0,joints:20+8*i0,weights:21+8*i0,tangent:22+8*i0,morphRows:23+8*i0};var AF=4294967295;var d8={opaque:0,opaqueDouble:1,cutout:2,cutoutDouble:3,blend:4,overlay:5,viewmodelOpaque:6,viewmodelOpaqueDouble:7,viewmodelCutout:8,viewmodelCutoutDouble:9,viewmodelBlend:10,viewmodelOverlay:11,ink:12};var Z2=13,IF=2,pv=[d8.blend,d8.overlay,d8.viewmodelBlend,d8.viewmodelOverlay];var bQ=2048,EQ=12,OF=1,X2=2,RF=1;var gQ=Z2,j2=20,SF=1024,$9=Z2*SF/32,i8=o1,cv=44+$9+16*i8+4+j2*i8,lv={head:0,head2:4,lens:8,texel:12,drawn:14,room:15,roadDrawn:15,texelEye:16,roomSerial:19,floor:20,origin:24,sortRoom:27,near:28,movers:29,roles:30,bits:27,outLane:32,slots:33,layers:34,eye:36,fade:40,stood:44,occluders:44+$9,occluderWords:44+$9+16*i8,casters:44+$9+16*i8+4},dv=`
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
`,nv=`
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
  stood: array<vec4<u32>, ${$9/4}>,
  occluders: array<mat4x4<f32>, ${i8}>,
  occluderWords: vec4<u32>,
  casters: array<vec4<f32>, ${j2/4*i8}>,
}
const NONE = ${AF}u;
fn tbl_sort_room(n: u32) -> u32 {
  var room = 1u;
  while (room < n) { room = room << 1u; }
  return room;
}
`;var iv=`
fn tbl_cameraDraws(flags: u32, itemFlags: u32) -> bool {
  if ((itemFlags & ${TF}u) != 0u) { return (itemFlags & ${LF}u) != 0u && (flags & ${PF}u) != 0u; }
  return (flags & ${MF}u) != 0u;
}
`,ov=`
fn tbl_roleItems() -> u32 {
  let listed = bitcast<u32>(view.spare1.y);
  return select(view.head.y, listed, listed != 0u);
}
fn tbl_roleOfBin(bin: u32) -> u32 {
  let cls = bin % max(view.head.w / max(view.head.z, 1u), 1u);
  return select(1u + (max(cls, ${gQ}u) - ${gQ}u) / ${IF}u, 0u, cls < ${gQ}u);
}
fn tbl_roleBlocks(role: u32, block: u32) -> vec2<u32> {
  let n = tbl_roleItems();
  let first = bitcast<u32>(view.spare1.z);
  if (n == 0u || role < first || role >= first + bitcast<u32>(view.spare1.w)) { return vec2<u32>(0u); }
  let r = role - first;
  return vec2<u32>((r * n) / block, ((r + 1u) * n - 1u) / block + 1u);
}
`;var vF=`
fn tbl_levelHide(word: u32) -> f32 {
  if (word == 0u) { return 0.0; }
  let anchor = bitcast<f32>(word & 0xfffffffcu);
  let rising = (word & ${X2}u) != 0u;
  let beta = clamp(select(anchor - frame.fadeTime, frame.fadeTime - anchor, rising) / ${m7/1000}, 0.0, 1.0);
  let coverage = beta * beta * (3.0 - 2.0 * beta);
  return select(coverage, -(1.0 - coverage), (word & ${OF}u) != 0u);
}
`,rv=`
const FADE_S: f32 = ${m7/1000};
fn tbl_fade(slot: u32, item: u32, chosen: u32, held: u32, itemFlags: u32, drew: bool) -> vec3<u32> {
  let now = view.clock.x;
  var m = memory[slot];
  var code = select(chosen + 1u, 0u, chosen == NONE);
  var other = (m.x >> ${EQ}u) & 15u;
  var rising = (m.x & ${bQ}u) != 0u;
  var anchor = bitcast<f32>(m.y);
  var asked = false;
  let pipe = min(tableItems[item].head2.x & 0xffffu, max(view.head.z, 1u) - 1u);
  let blended = (itemFlags & ${kF}u) != 0u;
  let stood = blended || tbl_stood(select(${d8.cutout}u, ${d8.cutoutDouble}u, (itemFlags & ${J2}u) != 0u), pipe);
  if (other != 0u && (now <= 0.0 || !drew || !stood || now >= select(anchor, anchor + FADE_S, rising))) { other = 0u; }
  if (now > 0.0 && drew && code != held) {
    if (other == 0u) {
      let fades = (itemFlags & (${xF}u | ${$2}u)) == 0u && tableItems[item].flash.w == 0.0;
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
  m.x = (m.x & ${~(255|bQ|15<<EQ)>>>0}u) | code | (other << ${EQ}u) | select(0u, ${bQ}u, rising);
  m.y = select(0u, anchorBits, other != 0u);
  memory[slot] = m;
  var word = select(0u, anchorBits | select(0u, ${X2}u, rising), other != 0u);
  if (asked) { word = ${RF}u; }
  return vec3<u32>(select(code - 1u, NONE, code == 0u), other, word);
}
`;var wF=32;var av=`
fn tbl_blockAt(k: u32, tier: u32, b: u32) -> u32 {
  let bins = view.head.w;
  return blockSums[(k * 2u + tier) * bins + b] + blockSums[((view.head2.x + k / ${wF}u) * 2u + tier) * bins + b];
}
`;var V2=i0+1,sv={copies:0,triangles:1,draws:2,levelTriangles:2+V2},tv=2+V2*2;var ev=[{stride:12,stepMode:"vertex",attributes:[["position","float32x3",0]]},{stride:4,stepMode:"vertex",attributes:[["normal","uint32",0]]},{stride:8,stepMode:"vertex",attributes:[["uv","float32x2",0]]},{stride:8,stepMode:"vertex",attributes:[["uvB","float32x2",0]]},{stride:4,stepMode:"vertex",attributes:[["color","uint32",0]]},{stride:8,stepMode:"vertex",attributes:[["joints","uint32x2",0]]},{stride:8,stepMode:"vertex",attributes:[["weights","uint32x2",0]]},{stride:4*DF,stepMode:"instance",attributes:[["item","uint32",0],["fade","uint32",4]]}];var $w=1+2*i0;var Y2=`
struct TableSkinVertex {
  joints: vec4<u32>,
  weights: vec4<f32>,
}
struct TableEyeRows {
  rows: vec4<u32>,
  hide: vec4<f32>,
  head: vec4<f32>,
}
`,Jw=`${Y2}fn tbl_motionShown(it: TableItem, inst: TableInstance) -> bool {
  return (inst.flags.x & ${e1}u) != 0u;
}
`,bF=`
fn tbl_poseRows(it: TableItem, previous: bool, s: TableSkinVertex) -> mat4x4<f32> {
  let row = select(it.pose.x, it.pose.y, previous);
  if ((it.head.w & ${t7}u) != 0u) { return tablePoses[row]; }
  return tbl_skinBlend(row, s);
}
fn tbl_poseModel(it: TableItem, inst: TableInstance, model: mat4x4<f32>, posed: mat4x4<f32>, previous: bool, shift: vec3<f32>) -> mat4x4<f32> {
  var rowModel = inst.model;
  if (previous) { rowModel = inst.previousModel; }
  if ((inst.flags.x & ${NF}u) == 0u || rowModel[1].w >= 0.5) { return model * posed; }
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
  if ((inst.flags.x & ${e1}u) == 0u) { return false; }
  if ((it.head.w & ${Q2|t7}u) == 0u) { return true; }
  return (tablePoses[it.pose.y] * vec4f(0, 0, 0, 1)).w > 0.5;
}
`,Qw=`override ${wQ} = true;
fn tbl_rowJoint(flagged: mat4x4f, joint: u32) -> f32 {
  let lane = joint / ${n8}u;
  if (lane >= ${e7}u) { return 0.0; }
  let column = lane / 4u;
  let picked = flagged * vec4f(f32(column == 0u), f32(column == 1u), f32(column == 2u), f32(column == 3u));
  let at = lane % 4u;
  let flags = u32(dot(picked, vec4f(f32(at == 0u), f32(at == 1u), f32(at == 2u), f32(at == 3u))));
  return f32((flags >> (joint % ${n8}u)) & 1u);
}
fn tbl_eyeOf(joints: vec4<u32>, headRow: u32, hide: f32) -> TableEyeRows {
  if (!${wQ} || !(hide < 0.0) || headRow == 0xffffffffu) { return TableEyeRows(); }
  let head = tablePoses[headRow];
  let count = u32((head * vec4f(0, 0, 0, 1)).w) / ${J9}u;
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
  let pivot = (tablePoses[root + (u32(pivotBind.w) % ${J9}u) + 1u] * vec4f(pivotBind.xyz, 1.0)).xyz;
  let keep = ${_Q};
  let shrunk = m * keep + mat4x4f(vec4f(), vec4f(), vec4f(), vec4f(pivot * (1.0 - keep), 1.0 - keep));
  return m * (1.0 - hide) + shrunk * hide;
}
fn tbl_poseRowsEye(it: TableItem, previous: bool, s: TableSkinVertex, eye: TableEyeRows, hide: f32) -> mat4x4f {
  if (!${wQ} || hide > -1.0 || (it.head.w & ${t7}u) != 0u) { return tbl_poseRows(it, previous, s); }
  let root = select(it.pose.x, it.pose.y, previous);
  return tbl_headJoint(tablePoses[root + s.joints.x + 1u], eye.rows.x, eye.hide.x, root) * s.weights.x + tbl_headJoint(tablePoses[root + s.joints.y + 1u], eye.rows.y, eye.hide.y, root) * s.weights.y + tbl_headJoint(tablePoses[root + s.joints.z + 1u], eye.rows.z, eye.hide.z, root) * s.weights.z + tbl_headJoint(tablePoses[root + s.joints.w + 1u], eye.rows.w, eye.hide.w, root) * s.weights.w;
}
`,Zw=`${Y2}
fn tbl_skinBlend(root: u32, s: TableSkinVertex) -> mat4x4<f32> {
  return tablePoses[root + s.joints.x + 1u] * s.weights.x + tablePoses[root + s.joints.y + 1u] * s.weights.y + tablePoses[root + s.joints.z + 1u] * s.weights.z + tablePoses[root + s.joints.w + 1u] * s.weights.w;
}
${bF}`;function EF($){return`
${CQ}
fn tbl_morph(rows: u32, weights: u32, targets: u32, v: u32) -> MorphSum {
  var sum = MorphSum(vec3f(), vec3f());
  let head = ${$("rows",2)};
  let entries = rows + ${D$}u + head.x + 1u;
  let at = ${$(`rows + ${D$}u + v`,2)};
  let start = at.x;
  let end = min(min(at.y, head.y), start + targets);
  for (var i = start; i < end; i = i + 1u) {
    let e = entries + i * ${X8}u;
    let a = ${$("e",3)};
    if (a.x >= targets) { continue; }
    let k = ${$(`weights + ${MQ}u + a.x * 3u`,3)};
    ${PQ("k.x","k.y","k.z","tablePoses[k.x >> 4u][(k.x >> 2u) & 3u][k.x & 3u]")}
    if (w == 0.0) { continue; }
    let b = ${$("e + 3u",3)};
    sum.position = sum.position + vec3f(bitcast<f32>(a.y), bitcast<f32>(a.z), bitcast<f32>(b.x)) * w;
    sum.normal = sum.normal + vec3f(morph_snorm16(b.y), morph_snorm16(b.y >> 16u), morph_snorm16(b.z)) * w;
  }
  return sum;
}`}var gF=`
fn tbl_skinVertex(part: u32, v: u32) -> TableSkinVertex {
  let j = tbl_geo2(tableParts[part].skin.x + v * 2u);
  let w = tbl_geo2(tableParts[part].skin.y + v * 2u);
  return TableSkinVertex(vec4u(j.x & 0xffffu, j.x >> 16u, j.y & 0xffffu, j.y >> 16u), vec4f(unpack2x16unorm(w.x), unpack2x16unorm(w.y)));
}
`,Xw=`${EF(($,J)=>`tbl_geo${J}(${$})`)}
${gF}`;var $5=`struct ModelInstance {
  model: mat4x4<f32>,
  color: vec4<f32>,
  emissive: vec4<f32>,
  flash: vec4<f32>,
  pbr: vec4<f32>,
  emissiveMap: vec4<f32>,
  clipPlane: vec4<f32>,
  clipPlane2: vec4<f32>,
  origin: vec4<f32>,
}`;var jw=`  let tableRampWord = select(0.0, tableItem.flash.w, (tableItem.head.w & ${Q2|t7}u) != 0u);
  var tableRamp = tableRampWord;
  if (abs(tableRampWord) > 1.0) { tableRamp = sign(tableRampWord) * ${Q9("abs(tableRampWord)","shadowView.fadeTime")}; }`;var Z9=`fn lume_modelOctDecode(e: vec2<f32>) -> vec3<f32> {
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
}`;function J5($,J){return $==="oct16"?`lume_modelOctDecode(${J})`:`lume_modelSrgbDecode(${J})`}var Q5=`struct ModelMaterial {
  baseColor: vec4<f32>,
  emissiveCutoff: vec4<f32>,
  params: vec4<f32>,
  flash: vec4<f32>,
  emissiveMap: vec4<f32>,
  clipPlane: vec4<f32>,
  clipPlane2: vec4<f32>,
  place: vec4<f32>,
  words: vec4<f32>,
}`;var yQ=($)=>$.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");var K2=".pbr.json.png.ktx2";var zw=new RegExp(`^(.+)${yQ(K2)}\\?transform=([a-z-]+)$`),Uw=new RegExp(`^(.+)${yQ(K2)}$`);var _F=1.7,q2=Math.round((2-_F)*1000)/1000;var U2=1.5,H2=0.35,fF=1;var hF=4;function W2($){return`((u32(material.words.x) & ${$}u) != 0u)`}var mF=Q5.replace(`
}`,`
  dissolve: vec4<f32>,
}`),Rb=mF.replace(`
}`,`
  coat: vec4<f32>,
}`);var Sb=$5.replace(`
}`,`
  viewDepthPlane: vec4<f32>,
  viewFacePlane: vec4<f32>,
  viewFaceState: vec4<f32>,
}`),uF=new Uint32Array(1),wb=new Float32Array(uF.buffer);var pF=["baseColor","normal","metallicRoughness","metalness","occlusion","emissive","alpha"];var bb=[...pF,"coatNormal"];var F2="  let skinMat = jointMatrices[in.joints.x + 1u] * in.weights.x + jointMatrices[in.joints.y + 1u] * in.weights.y + jointMatrices[in.joints.z + 1u] * in.weights.z + jointMatrices[in.joints.w + 1u] * in.weights.w;",K5=`${sQ("jointMatrices",1)}.xyz`;function cF($,J="material.flash.w > -1.0",Q="material.flash.w < 0.0",Z="material.flash.w < -1.0"){let X=(j,V)=>`fn ${V}Joint(m: mat4x4<f32>, picked: u32, hide: f32) -> mat4x4<f32> {
  let pivotBind = jointMatrices[picked] * vec4<f32>(0.0, 0.0, 0.0, 1.0);
  let pivot = (${j}[(u32(pivotBind.w) % ${J9}u) + 1u] * vec4<f32>(pivotBind.xyz, 1.0)).xyz;
  return lume_headShrunk(m, hide, pivot);
}
fn ${V}(joints: vec4<u32>, weights: vec4<f32>, eye: LumeEyeRows) -> mat4x4<f32> {
  let mx = ${j}[joints.x + 1u];
  let my = ${j}[joints.y + 1u];
  let mz = ${j}[joints.z + 1u];
  let mw = ${j}[joints.w + 1u];
  if (${J}) { return mx * weights.x + my * weights.y + mz * weights.z + mw * weights.w; }
  return ${V}Joint(mx, eye.rows.x, eye.hide.x) * weights.x + ${V}Joint(my, eye.rows.y, eye.hide.y) * weights.y + ${V}Joint(mz, eye.rows.z, eye.hide.z) * weights.z + ${V}Joint(mw, eye.rows.w, eye.hide.w) * weights.w;
}`;return[`fn lume_rowJoint(flagged: mat4x4<f32>, joint: u32) -> f32 {
  let lane = joint / ${n8}u;
  if (lane >= ${e7}u) { return 0.0; }
  let column = lane / 4u;
  let picked = flagged * vec4<f32>(f32(column == 0u), f32(column == 1u), f32(column == 2u), f32(column == 3u));
  let at = lane % 4u;
  let flags = u32(dot(picked, vec4<f32>(f32(at == 0u), f32(at == 1u), f32(at == 2u), f32(at == 3u))));
  return f32((flags >> (joint % ${n8}u)) & 1u);
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
  return lume_eyeRows(joints, row, index / ${J9}u, ${Z});
}
fn lume_headShrunk(m: mat4x4<f32>, head: f32, pivot: vec3<f32>) -> mat4x4<f32> {
  let keep = ${_Q};
  let shrunk = m * keep + mat4x4<f32>(vec4<f32>(0.0), vec4<f32>(0.0), vec4<f32>(0.0), vec4<f32>(pivot * (1.0 - keep), 1.0 - keep));
  return m * (1.0 - head) + shrunk * head;
}`,X("jointMatrices","lume_headSkin"),...$?[X("previousJointMatrices","lume_previousHeadSkin")]:[]].join(`
`)}var aQ="  let eye = lume_eyeOf(in.joints);",B2="  let skinMat = lume_headSkin(in.joints, in.weights, eye);",G2="(modelMaterial.flash.w < 0.0 && distance(modelMaterial.words.yzw, frame.cameraPosition) < 0.01)";function M2($){return cF($,`!${G2}`,G2,"modelMaterial.flash.w < -1.0")}function sQ($,J){return`(${$}[${J}] * vec4<f32>(0.0, 0.0, 0.0, 1.0))`}var lF="instance.model";var Eb=`lume_normalMatrix3(${lF})`,dF="(in.positionWorld + lume_eyeAnchor())",nF="(frame.cameraPosition - lume_eyeAnchor())";var iF="instance.model[0].w",oF=()=>r8(V9("instance.model[3].xyz","bandPos"),0,iF),gb=["  var lume_bandWord = 0.0;",`  if (frame.sort2d > 0.5) { lume_bandWord = ${oF()}; out.position.z = lume_bandWord * out.position.w; }`];var rF="select(-normalize(in.normalWorld), normalize(in.normalWorld), frontFacing)",_b=`  lume_surfaceHorizon = ${rF};`;var yb={...fQ,metalness:fQ.metallicRoughness};var fb=` * select(mrSample.g, mix(1.0, patina_packedRoughness(normalSample), ${q2.toFixed(3)}), ${W2(hF)})`;var hb=z2("in");var mb=W2(fF);var ub=`lume_seeThroughLight(in.position, albedo) + lume_seeThroughGlow(emissiveColor, -(frame.view * vec4<f32>(${dF}, 1.0)).z, in.positionWorld - ${nF})`;var q5=1,nb=v0(q5,1|2,"uniform"),P2=`${Q5}
@group(3) @binding(${q5}) var<uniform> modelMaterial: ModelMaterial;`,K9={materialColor:"modelMaterial.baseColor.rgb",materialOpacity:"(modelMaterial.baseColor.a * modelMaterial.params.z)"},G5=8,ib=v0(G5,1,"uniform"),C2=`struct SkinnedModel {
  model: mat4x4<f32>,
  modelInverse: mat4x4<f32>,
}
@group(3) @binding(${G5}) var<uniform> skinnedModel: SkinnedModel;`,tQ="skinnedModel.model",eQ="skinnedModel.modelInverse";var aF="default",$Z=1;var sF=()=>({bits:new Map([[aF,$Z]]),eyeRevision:-1,eyeBits:$Z});var ab=sF();var $B=1.9;var JB=3;var BE=$B+JB;var LE=Math.cos(Math.PI/6);;var QB=U9("tome/camera-rig-up",{snapshot:"clone",scope:"world"});;var VB=()=>typeof SharedArrayBuffer==="function",L2=($)=>VB()?new SharedArrayBuffer($):new ArrayBuffer($);var N2=($)=>$.byteOffset%4===0?new Int32Array($.buffer,$.byteOffset,$.byteLength>>>2):null,k2=1024,YB=64;function x2($){let J=2166136261^$.byteLength,Q=$.byteLength>>>2,Z=new DataView($.buffer,$.byteOffset,$.byteLength);for(let X=0;X<Q;X+=X<k2||X>=Q-k2?1:YB)J=Math.imul(J^Z.getInt32(X<<2,!0),16777619);for(let X=Q<<2;X<$.byteLength;X++)J=Math.imul(J^$[X],16777619);return J>>>0}function KB($,J){if($.byteLength!==J.byteLength)return!1;let Q=new Uint8Array($.buffer,$.byteOffset,$.byteLength),Z=N2(Q),X=N2(J),j=0;if(Z!==null&&X!==null){for(let V=0;V<Z.length;V++)if(Z[V]!==X[V])return!1;j=Z.length<<2}else{let V=new DataView($.buffer,$.byteOffset,$.byteLength),Y=new DataView(J.buffer,J.byteOffset,J.byteLength);for(;j+4<=J.byteLength;j+=4)if(V.getInt32(j,!0)!==Y.getInt32(j,!0))return!1}for(;j<J.byteLength;j++)if(Q[j]!==J[j])return!1;return!0}class A2{constructor(){this.tables=new Map;this.canonical=new WeakMap;this.finalizer=typeof WeakRef==="function"&&typeof FinalizationRegistry==="function"?new FinalizationRegistry(({family:$,hash:J,ref:Q})=>this.remove($,J,Q)):void 0;}keepNone(){this.finalizer=void 0,this.tables=G$(this.tables)}remove($,J,Q){let Z=this.tables.get($),X=Z?.get(J);if(X===void 0)return;if(X.delete(Q),X.size===0)Z.delete(J);if(Z.size===0)this.tables.delete($)}find($,J,Q){let Z=this.tables.get($)?.get(J);if(Z===void 0)return;for(let X of Z){let j=X.deref();if(j===void 0)this.remove($,J,X);else if(KB(j,Q))return j}return}remember($,J,Q){let Z=q$(this.tables,$),X=T2(Z,J),j=new WeakRef(Q);X.add(j),this.canonical.set(Q,$),this.finalizer.register(Q,{family:$,hash:J,ref:j})}intern($,J){if(J.byteLength===0||this.finalizer===void 0||typeof SharedArrayBuffer!=="function"||!(J.buffer instanceof SharedArrayBuffer))return J;let Q=$+":"+J.constructor.name;if(this.canonical.get(J)===Q)return J;let Z=new Uint8Array(J.buffer,J.byteOffset,J.byteLength),X=x2(Z),j=this.find(Q,X,Z);if(j!==void 0)return j;return this.remember(Q,X,J),J}copy($,J,Q){let Z=typeof SharedArrayBuffer==="function",X=$+":"+J.name,j=Z&&this.finalizer!==void 0&&Q.byteLength!==0,V=j?x2(Q):0;if(j){let K=this.find(X,V,Q);if(K!==void 0)return K}let Y=new J(L2(Q.byteLength));if(new Uint8Array(Y.buffer).set(Q),j)this.remember(X,V,Y);return Y}}var Gg=new A2;var qB=1000,I2=2147483647,GB=function($){if(!Number.isFinite($))return 0;let J=Math.round($*qB);if(J===0)return 0;return Math.max(-I2,Math.min(I2,J))};var zB=function($){let J=new Uint8Array(Math.max(16,$.length*3)),Q=0;for(let Z=0;Z<$.length;Z+=1){if(Q+5>J.length){let V=new Uint8Array(J.length*2);V.set(J),J=V}let X=$[Z],j=X>=0?X*2:-X*2-1;while(j>=128)J[Q]=j%128|128,Q+=1,j=Math.floor(j/128);J[Q]=j,Q+=1}return D2(J.subarray(0,Q))};var O2=function($){let J=Array($.length);for(let Q=0;Q<$.length;Q+=1)J[Q]=GB($[Q]);return zB(J)};var XZ=new TextDecoder,UB=16,jZ=12,s8=Object.freeze({x:0,y:0,z:0,w:1}),Y8=($)=>Number.isFinite($)?$:0;var z5=function($,J){J.x=t8($.x),J.y=t8($.y),J.z=t8($.z)},HB=t8(0.000001),o0=function($){if(!Number.isFinite($))return 1;if($===0)return HB;return t8($)},h2=($)=>({x:o0($.x),y:o0($.y),z:o0($.z)});var m2=function($,J){J.x=o0($.x),J.y=o0($.y),J.z=o0($.z)},u2=0.00001,p2=function($){let J={x:0,y:0,z:0,w:1};return c2($.x,$.y,$.z,$.w,J),J};function c2($,J,Q,Z,X){let j=Y8($),V=Y8(J),Y=Y8(Q),K=Y8(Z),G=j*j+V*V+Y*Y+K*K;if(!isFinite(G)||G<=0){ea(X);return}let q=K<0||K===0&&(j<0||j===0&&(V<0||V===0&&Y<0));if(Math.abs(G-1)<=u2){X.x=q?-j:j,X.y=q?-V:V,X.z=q?-Y:Y,X.w=q?-K:K;return}let z=(q?-1:1)/Math.sqrt(G);X.x=j*z,X.y=V*z,X.z=Y*z,X.w=K*z}var l2=($)=>f2(p2($));function d2($,J){let Q=n2;FB($,Q,0),J.x=Q[0],J.y=Q[1],J.z=Q[2],J.w=Q[3]}var n2=new Float64Array(4),WB=new Float64Array(4);function FB($,J,Q){let Z=n2;Z[0]=$.x,Z[1]=$.y,Z[2]=$.z,Z[3]=$.w,BB(Z,0,J,Q)}function BB($,J,Q,Z){let X=WB;if(X[0]=$[J],X[1]=$[J+1],X[2]=$[J+2],X[3]=$[J+3],X[0]-X[0]!==0)X[0]=0;if(X[1]-X[1]!==0)X[1]=0;if(X[2]-X[2]!==0)X[2]=0;if(X[3]-X[3]!==0)X[3]=0;let j=X[0],V=X[1],Y=X[2],K=X[3],G=j*j+V*V+Y*Y+K*K;if(G-G!==0||G<=0){Q[Z]=0,Q[Z+1]=0,Q[Z+2]=0,Q[Z+3]=1;return}let z=K<0||K===0&&(j<0||j===0&&(V<0||V===0&&Y<0))?-1:1;if(Math.abs(G-1)<=u2){Q[Z]=j*z,Q[Z+1]=V*z,Q[Z+2]=Y*z,Q[Z+3]=K*z,ZZ(Q,Z,4);return}fa(z,G,Q,Z,j,V,Y,K);}var i2=24,o2=function($,J,Q){let Z=new Uint8Array($);return J(new DataView(Z.buffer),0,Q),Z};var K8=12,$6=function($,J,Q){$.setFloat32(J,Y8(Q.x),!0),$.setFloat32(J+4,Y8(Q.y),!0),$.setFloat32(J+8,Y8(Q.z),!0)},W9=($)=>o2(K8,$6,$);function MB($){return $===K8||$===UB}function PB($){return $===i2}function CB($,J,Q){Q.x=$.getFloat32(J,!0),Q.y=$.getFloat32(J+4,!0),Q.z=$.getFloat32(J+8,!0)}function DB($,J,Q){Q.x=$.getFloat64(J,!0),Q.y=$.getFloat64(J+8,!0),Q.z=$.getFloat64(J+16,!0)}function U5($){if(PB($.byteLength)){return ga($);}if(MB($.byteLength)){let J={x:0,y:0,z:0};return CB(H9($,K8),0,J),J}try{let J=JSON.parse(XZ.decode($));if(!J$(J))return{x:0,y:0,z:0};return{x:typeof J.x==="number"?J.x:0,y:typeof J.y==="number"?J.y:0,z:typeof J.z==="number"?J.z:0}}catch{return{x:0,y:0,z:0}}}var VZ=QZ,YZ=function($,J,Q){let Z=_2(Q.x,Q.y,Q.z,Q.w,JZ,0);E2($,J,Z,JZ,0)},r2=($)=>o2(VZ,YZ,$),NB=new Float64Array(4);function a2($){let J=$.byteLength;if(J===QZ||J===b2||J===w2){let Q=NB;g2(H9($,J),0,Q,0);let Z={x:0,y:0,z:0,w:1};return c2(Q[0],Q[1],Q[2],Q[3],Z),Z}try{let Q=JSON.parse(XZ.decode($));if(!J$(Q))return{...s8};return p2({x:typeof Q.x==="number"?Q.x:0,y:typeof Q.y==="number"?Q.y:0,z:typeof Q.z==="number"?Q.z:0,w:typeof Q.w==="number"?Q.w:1})}catch{return{...s8}}}var y2=Object.freeze({x:1,y:1,z:1}),s2=jZ,t2=$6,e2=W9;function kB($){return $===jZ}function xB($,J,Q){Q.x=o0($.getFloat32(J,!0)),Q.y=o0($.getFloat32(J+4,!0)),Q.z=o0($.getFloat32(J+8,!0))}function $j($){if(kB($.byteLength)){let J={x:1,y:1,z:1};return xB(H9($,jZ),0,J),J}try{let J=JSON.parse(XZ.decode($));if(!J$(J))return{...y2};return{x:typeof J.x==="number"?o0(J.x):1,y:typeof J.y==="number"?o0(J.y):1,z:typeof J.z==="number"?o0(J.z):1}}catch{return{...y2}}}function H5($,J,Q){return $[J]===Q?$:{...$,[J]:Q}}var TB=new TextEncoder,jj=new TextDecoder,F9={plane:"authoritative",replicate:"aoi",forwardToRenderer:"always"};var LB=($)=>TB.encode(Jj($)??"null"),AB=function($){let J=$.groundSamples;if(J===void 0||typeof J==="string")return $;let Q=Array.isArray(J)||J instanceof Float32Array?O2(Array.from(J,(X)=>Number(X))):"",Z={...$,groundSamples:Q};if(Q.length===0)delete Z.groundSamples;return Z},IB=Zj();var OB=($)=>J$($)&&IB.has($),RB=($)=>v2($)||OB($.params)&&S2($,"params")?$:R2($),Vj=($)=>AB(RB(typeof $.script==="string"?$:{...$,script:""})),SB=($)=>Vj(Qj(jj.decode($))),k_=Q0({name:"tome/scripted-primitive",...F9,sanitize:Vj,equals:Xj,encode:LB,decode:SB}),x_=Q0({name:"tome/landed-look",plane:"shared",replicate:"aoi",forwardToRenderer:"always",encode:a8,decode:z9}),T_=Q0({name:"tome/first-person-visible",...F9}),L_=Q0({name:"tome/layers",...F9}),A_=Q0({name:"tome/layout",...F9}),F5=($,J)=>({name:$,plane:"authoritative",replicate:J,forwardToRenderer:"always",decode:()=>({})}),I_=Q0(F5("tome/look-stand","never")),O_=Q0(F5("tome/world-replicated","aoi")),R_=Q0(F5("tome/far-carried","never")),S_=Q0(F5("tome/cell-streamed","never")),v_=Q0({name:"tome/replaces",...F9,respellRefs:($,J)=>("target"in $)?H5($,"target",J.entity($.target)):H5($,"holder",J.entity($.holder))});var vB=Q0({name:"tome/parent",plane:"authoritative",replicate:"aoi",forwardToRenderer:"always",respellRefs:($,J)=>H5($,"parentId",J.entity($.parentId))}),w_=Q0({name:"tome/local-feet-position",plane:"authoritative",replicate:"aoi",replicationClass:"motion",transientSetEvents:!0,storage:"soa3f32",sanitize:e8,sanitizeInto:z5,encode:W9,encodeInto:$6,encodedBytes:K8,decode:U5,forwardToRenderer:"always"}),b_=Q0({name:"tome/local-rotation",plane:"authoritative",replicate:"aoi",replicationClass:"motion",transientSetEvents:!0,storage:"soa4f32",sanitize:l2,sanitizeInto:d2,encode:r2,encodeInto:YZ,encodedBytes:VZ,decode:a2,forwardToRenderer:"always"}),E_=Q0({name:"tome/local-scale",plane:"authoritative",replicate:"aoi",replicationClass:"motion",transientSetEvents:!0,storage:"soa3f32",sanitize:h2,sanitizeInto:m2,encode:e2,encodeInto:t2,encodedBytes:s2,decode:$j,forwardToRenderer:"always"}),g_=Q0({name:"tome/pivot-meters",plane:"shared",replicate:"aoi",storage:"soa3f32",sanitize:e8,sanitizeInto:z5,encode:W9,encodeInto:$6,encodedBytes:K8,decode:U5,forwardToRenderer:"always"}),W5=13,__=Q0({name:"tome/stand",plane:"shared",replicate:"never",sanitize:function($){let J=e8({x:$.x,y:$.y,z:$.z});return $.posed===!0?{x:0,y:0,z:0,posed:!0}:{x:J.x,y:J.y,z:J.z}},encode:function($){let J=new ArrayBuffer(W5),Q=new DataView(J);return Q.setFloat32(0,Number.isFinite($.x)?$.x:0,!0),Q.setFloat32(4,Number.isFinite($.y)?$.y:0,!0),Q.setFloat32(8,Number.isFinite($.z)?$.z:0,!0),Q.setUint8(12,$.posed===!0?1:0),new Uint8Array(J,0,W5)},decode:function($){if($.byteLength<W5)return{x:0,y:0,z:0};let J=new DataView($.buffer,$.byteOffset,W5);return J.getUint8(12)===1?{x:0,y:0,z:0,posed:!0}:{x:J.getFloat32(0,!0),y:J.getFloat32(4,!0),z:J.getFloat32(8,!0)}},forwardToRenderer:"always"}),y_=Q0({name:"tome/attachment-anchor",plane:"shared",replicate:"never",storage:"soa3f32",sanitize:e8,sanitizeInto:z5,encode:W9,encodeInto:$6,encodedBytes:K8,decode:U5,forwardToRenderer:"always"}),f_=Q0({name:"tome/attachment-anchor-bone",plane:"shared",replicate:"never",decode:($)=>JSON.parse(jj.decode($)),forwardToRenderer:"always"});var Qy=U9("crossing/rebase",{snapshot:"clone"}),Zy=U9("crossing/rebase-tick",{snapshot:"clone"});var wB=1.70158,Fy=wB+1;;var B9={keyA:0,keyB:1,ownerA:2,ownerB:3},wy=B9.keyA,by=B9.keyB,Ey=B9.ownerA,gy=B9.ownerB,_y=N$.written,yy=N$.matrix,fy=N$.frame,hy=N$.size,my=N$.solve,uy=N$.slots,hB=new Float64Array(1),py=new Uint32Array(hB.buffer);var ry=new Float64Array(14).fill(NaN),ay=new r6,sy=new h7,ty=new r6;var qj=64,mB=2;function uB($){let J=($.startsWith("at ")?$.slice(3):$).replace(/(?:https?|blob|file):\/\/\S*?\/([^/\s)]+:\d+(?::\d+)?)/g,"$1"),Q=J.indexOf("@");if(Q<0||J.includes(" ("))return J;let Z=J.slice(0,Q)||"(anonymous)",X=J.slice(Q+1);return X==="[native code]"?`${Z} (native)`:`${Z} (${X})`}function KZ($){let J=$.includes(`
    at `),Q=[];for(let Z of $.split(`
`)){let X=Z.trim();if(X.length===0||(J?!X.startsWith("at "):!X.includes("@")))continue;Q.push(uB(X))}return Q}function pB($){return $ instanceof Error&&zj($)}var Uj=400,cB=4,lB=4;function Gj($){let J=new Map;for(let Z of $)B5(J,Z);let Q=[...J].filter(([,Z])=>Z>1).sort((Z,X)=>X[1]-Z[1]).slice(0,cB);return Q.length>0?Q.map(([Z,X])=>`${Z} x${X}`).join(", "):"none"}function dB($,J=iB()){let Q=KZ(J),Z=Q.slice(-lB).reverse();return`the throw's repeating frames: ${Gj(KZ($))}; the stack under the seam ${Q.length}${Q.length>=Uj?"+":""} frames deep, its repeating frames: ${Gj(Q)}, its root: ${Z.join(" > ")||"none"}`}function nB($){try{return dB($.stack??"")}catch{return"the chain under it could not be read at the seam"}}function iB(){let $=Error,J=$.stackTraceLimit;$.stackTraceLimit=Uj;try{return Error("the chain under an overflow").stack??""}catch{return""}finally{$.stackTraceLimit=J}}function oB($){let J=M9($);if(J!==void 0)return`the script ${J.replace(/^at /,"")}`;if(!($ instanceof Error)||typeof $.stack!=="string")return"";return KZ($.stack).slice(0,mB).join(" < ")}function rB($){return`${$.unit} threw: ${$.message}${$.where.length>0?` (at ${$.where})`:""}: ${$.kept}; said once for this cause`}var aB={threw:($)=>__sc.warn(`[lume] ${rB($)}`),healed:($)=>__sc.info(`[lume] ${$.unit} ran clean again after ${$.throws} throw(s): ${$.message}`)};class Hj{constructor(){this.causes=new Map;this.overflow={unit:"a frame unit",message:`more than ${qj} causes`,where:"",kept:"",words:void 0,step:void 0,scriptThrew:!1,throws:0,healSaid:!0};this.voice=aB;this.absorbs=()=>!0;}threw($,J,Q,Z,X){if(!this.absorbs(Q))return null;Kj(`lume: ${$}`,Q);let j=Q instanceof Error?Q.message||Q.name:String(Q),V=oB(Q),Y=`${$}
${j}
${V}`,K=this.causes.get(Y);if(K!==void 0)return K.throws+=1,K;if(this.causes.size>=qj)return this.overflow.throws+=1,this.overflow;let G=pB(Q)?`${V}${V.length>0?"; ":""}${nB(Q)}`:V,q={unit:$,message:j,where:G,kept:J,words:Z,step:X,scriptThrew:M9(Q)!==void 0,throws:1,healSaid:!1};return this.causes.set(Y,q),this.voice.threw(q,Q),q}healed($){if($.healSaid)return;$.healSaid=!0,this.voice.healed($)}reset(){this.causes=G$(this.causes),this.overflow.throws=0}}var sB=new Hj;var Mf=128|8|4;var $M=4,JM=8,QM=16;var Rh=$M|JM|QM;var Sh=new Q$("entity-transforms");var ZM=31,vh=2**ZM-1;var Fj=11;var gh=Fj-1;var _h=Fj+1;var F0=Object.freeze({composite:1,present:2,copy:4,catmullRom:8,bilinear:16,nearest:32,sharp:64,flash:128,vocab:256,contrast:1024,haze:2048,scanlines:4096,grain:8192,vignette:16384}),Mm=[[F0.composite,"composite"],[F0.present,"present"],[F0.copy,"copy"],[F0.catmullRom,"cr"],[F0.bilinear,"bl"],[F0.nearest,"near"],[F0.sharp,"sharp"],[F0.flash,"flash"],[F0.vocab,"vocab"],[F0.contrast,"con"],[F0.haze,"haze"],[F0.scanlines,"scan"],[F0.grain,"grain"],[F0.vignette,"vig"]],Pm=F0.vocab|F0.contrast|F0.haze|F0.scanlines|F0.grain|F0.vignette,Cm=F0.vignette*2-1;var _m=new Q$("post-outlines");var VM=1.001,Bj=4;var ym=Math.SQRT2+1;var Mj="rg16float",YM=16384,P9=0.6,GZ=0.25,Pj=6,zZ=0.25,Cj=RQ,UZ=`
${p7}

fn outlineMaskHidden(fragmentViewZ: f32, sceneViewZ: f32) -> bool {
  return fragmentViewZ <= sceneViewZ * ${VM};
}

fn outlineMaskColor(hidden: bool, wall: bool, depth: f32) -> vec4<f32> {
  return vec4<f32>(select(0.0, select(0.375, 0.625, wall), hidden), depth * ${YM}.0, 0.0, 1.0);
}
`;var Nj=`struct OutlineMaskView {
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
};`;function KM($){return`${Nj}
@group(${$}) @binding(0) var<uniform> maskView: OutlineMaskView;
@group(${$}) @binding(1) var sceneDepthTex: texture_2d<f32>;`}var qM=KM(0);function kj($,J,Q){return`
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
  return bitcast<u32>(scene) > bitcast<u32>(fragmentDepth) + ${Bj}u;
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
  if (${J}.depthScale > 1.0 && fragmentDepth > ${m(Dj)}) {
    hidden = ${$}_wordNearer(sceneDepth, fragmentDepth);
    if (hidden) {
      let radius = clamp(${P9} * ${J}.focal, 2.0, ${J}.maskSize.y * ${zZ});
      for (var tap = 0u; tap < 8u; tap += 1u) {
        let angle = f32(tap) * 0.7853982;
        let direction = vec2<f32>(cos(angle), sin(angle));
        outer += select(0u, 1u, ${$}_wordNearer(${$}_sceneDepth(pixel + direction * radius), fragmentDepth));
        inner += select(0u, 1u, ${$}_wordNearer(${$}_sceneDepth(pixel + direction * radius * ${GZ/P9}), fragmentDepth));
      }
    }
  } else {
    let sceneViewZ = lume_view_z_of_depth(${$}_lensDepth(sceneDepth), ${J}.near, ${J}.far, ${J}.isOrtho, ${J}.depthScale);
    hidden = outlineMaskHidden(fragmentViewZ, sceneViewZ);
    if (hidden) {
        let metre = ${J}.focal / mix(max(-sceneViewZ, 1e-3), 1.0, ${J}.isOrtho);
      let radius = clamp(${P9} * metre, 2.0, ${J}.maskSize.y * ${zZ});
      let innerRadius = radius * ${GZ/P9};
      let halfway = mix(fragmentViewZ, sceneViewZ, 0.5);
      for (var tap = 0u; tap < 8u; tap += 1u) {
        let angle = f32(tap) * 0.7853982;
        let direction = vec2<f32>(cos(angle), sin(angle));
        outer += select(0u, 1u, ${$}_sceneViewZ(pixel + direction * radius) > halfway);
        inner += select(0u, 1u, ${$}_sceneViewZ(pixel + direction * innerRadius) > halfway);
      }
    }
  }
  return outlineMaskColor(hidden, outer >= ${Pj}u || (inner == 8u && outer >= 4u), fragmentDepth);
}`}function GM($,J,Q){return`${kj(`${$}_out`,J,Q)}
fn ${$}(position: vec4<f32>) -> vec4<f32> {
  return ${$}_out(position.xy, lume_view_z_of_depth(${$}_out_lensDepth(position.z), ${J}.near, ${J}.far, ${J}.isOrtho, ${J}.depthScale), position.z);
}`}var zM=176,UM=`struct OutlineMaskVaryings {
  @builtin(position) position: vec4<f32>,
  @location(0) viewZ: f32,
};`;function HM($,J){return`${UZ}
${kj("outline_maskOut","maskView","sceneDepthTex")}
@fragment fn fs(in: ${$}) -> @location(0) vec4<f32> {
${J.map((Q)=>`${Q}
`).join("")}  return outline_maskOut(in.position.xy, in.viewZ, in.position.z);
}`}var WM=HM("OutlineMaskVaryings",[]),Qu=[v0(0,1|2,"uniform"),n0(1,2,"unfilterable-float")],M5=997;function HZ($){return`${Nj}
@group(2) @binding(${$}) var<uniform> lume_outlineMaskView: OutlineMaskView;
@group(2) @binding(${$+1}) var lume_outlineMaskDepth: texture_2d<f32>;
${UZ}
${GM("lume_outlineMaskAt","lume_outlineMaskView","lume_outlineMaskDepth")}`}var FM={id:"outline-mask",arm:"outline-mask",colorFormat:Mj,depthFormat:Cj,samples:1},Zu={...FM,mirrored:!0},Xu=[v0(0,1,"uniform")],xj=256,ju=`
${qM}

@group(1) @binding(0) var<uniform> maskModels: array<mat4x4<f32>, ${xj}>;

${UM}

@vertex fn vs(@location(0) position: vec3<f32>, @builtin(instance_index) instance: u32) -> OutlineMaskVaryings {
  let worldPos = maskModels[instance] * vec4<f32>(position, 1.0);
  var out: OutlineMaskVaryings;
  out.position = maskView.viewProj * worldPos;
  out.viewZ = (maskView.view * worldPos).z;
  return out;
}

${WM}
`,Vu=new Q$("outline-mask-sources");var BM=zM/4,Yu=new Float32Array(BM);var MM=xj*16,Gu=new Float32Array(MM);var Tj=0.5,P5="fsThroughDepth",WZ=`if (alpha < ${Tj.toFixed(2)}) { discard; }`;var C5="fsThroughCover";function Lj($){return`return vec4<f32>(${$}, 0.0, 0.0, ${$});`}var PM=999,Aj=`@group(2) @binding(${PM}) var<storage, read_write> lume_throughMarks: array<atomic<u32>>;
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
}`,Ij="if (lume_throughOccluded(in.position)) { discard; }",Oj=`if (alpha >= ${Tj.toFixed(2)}) { lume_throughMark(in.position); }`,Rj=["  let lume_mark: u32 = lume_throughTake(in.position);","  if (lume_mark == 0u) { discard; }","  return bitcast<f32>(lume_mark);"];var CM=/\$([A-Za-z][A-Za-z0-9]*)/g,DM=/^\.\.\.\$([A-Za-z][A-Za-z0-9]*)$/;function C9($,J){let Q=J.length,Z=new Int32Array(Q),X=new Int32Array(Q),j=new Uint8Array(Q),V=[],Y=[];for(let K=0;K<Q;K+=1){let[G,q,z]=J[K];Z[K]=G,X[K]=q;let H=DM.exec(z);if(H!==null){j[K]=1,V.push([]),Y.push([Sj($,H[1],z)]);continue}let U=[],W=[],M=0;for(let P of z.matchAll(CM)){let C=P.index??0;U.push(z.slice(M,C)),W.push(Sj($,P[1],z)),M=C+P[0].length}U.push(z.slice(M)),V.push(U),Y.push(W)}return{all:Z,none:X,splice:j,parts:V,holes:Y}}function Sj($,J,Q){let Z=$.indexOf(J);if(Z<0)ia(Q,J);return Z}function D9($,J,Q,Z){let{all:X,none:j,splice:V,parts:Y,holes:K}=$;for(let G=0;G<X.length;G+=1){let q=X[G];if((J&q)!==q||(J&j[G])!==0)continue;let z=K[G];if(V[G]===1){let W=Q[z[0]];if(W===null||W===void 0)continue;if(typeof W==="string")Z.push(W);else for(let M=0;M<W.length;M+=1)Z.push(W[M]);continue}let H=Y[G],U=H[0];for(let W=0;W<z.length;W+=1){let M=Q[z[W]];U+=`${typeof M==="string"?M:""}${H[W+1]}`}Z.push(U)}}var N9="fsMaterialData";var NM=1,vj=1,kM=($)=>`max(max(${$}.r, ${$}.g), ${$}.b) > ${m(NM)}`,FZ=($)=>`(${kM($)}) & (frame.sort2d < 0.5)`;function BZ($,J,Q,Z,X){let j=[`  let lume_outsetDir: vec3<f32> = ${Q};`,"  let lume_outsetView: vec2<f32> = (frame.view * vec4<f32>(lume_outsetDir / max(length(lume_outsetDir), 1e-6), 0.0)).xy;",`  lume_clipOut = vec4<f32>(${$}.xy + lume_outsetView * (${m(2*vj)} / frame.viewportSize) * ${$}.w, ${$}.zw);`],V=X===void 0?FZ("lume_glow"):`${X} && (${FZ("lume_glow")})`,Y=[`  let lume_glow: vec3<f32> = ${J};`,`  let lume_bright: bool = ${V};`,`  var lume_clipOut: vec4<f32> = ${$};`];if(Z===void 0)return[...Y,"  if (lume_bright) {",...j.map((K)=>`  ${K}`),"  }"];return[...Y,"  if (lume_bright) {",`    if (${Z.when}) {`,`      if (!(${Z.still})) {`,`        let lume_planeDir: vec3<f32> = ${Z.push};`,`        let lume_planeStep: f32 = ${m(2*vj)} * ${$}.w / (frame.proj[1][1] * frame.viewportSize.y);`,`        lume_clipOut = ${$} + frame.viewProj * vec4<f32>(lume_planeDir / max(length(lume_planeDir), 1e-6) * lume_planeStep, 0.0);`,"      }","    } else {",...j.map((K)=>`    ${K}`),"    }","  }"]}function wj($,J){return[`  let lume_coverClip: vec4<f32> = frame.viewProj * vec4<f32>(${$}, 1.0);`,"  let lume_coverPx: vec2<f32> = lume_coverClip.xy / max(lume_coverClip.w, 1e-6) * 0.5 * frame.viewportSize;","  let lume_coverX: vec2<f32> = dpdx(lume_coverPx);","  let lume_coverY: vec2<f32> = dpdy(lume_coverPx);","  let lume_cover: f32 = clamp(abs(lume_coverX.x * lume_coverY.y - lume_coverX.y * lume_coverY.x), 0.0, 1.0);",`  let lume_emitterGlow: vec3<f32> = ${J};`,`  let lume_emitterScale: f32 = select(1.0, lume_cover, ${FZ("lume_emitterGlow")});`]}var PZ=4,CZ=8;var xM=8388608;var TM=($)=>`(bitcast<u32>(${$}) - ${xM}u)`,DZ=5;var LM=2147483648;var AM=`fn lume_setRead(base: u32, field: u32) -> vec4<f32> {
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
}`;function NZ($){return`${j9}
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
  return (field & ${LM}u) != 0u;
}
${AM}`}function _j($,J){let Q=`struct LumeSetDraw {
  perSlot: u32,
  windowBase: u32,
  copyBase: u32,
  strideWords: u32,
  offsetField: u32,
  yawField: u32,
  scaleField: u32,
  tintField: u32,
}
@group(${$}) @binding(${PZ}) var<storage, read> lume_set: array<u32>;
@group(${$}) @binding(${DZ}) var<uniform> lume_setDraw: LumeSetDraw;`;if(J.fields.length===0)return Q;return`${Q}
${NZ("lume_set")}
${vM}
${IM}`}var IM=`fn lume_setBlockOf(slot: u32) -> u32 {
  return ${TM("instances[slot].block.w")};
}`,kZ=($)=>`  if (${$}) {
    var lumeCulledOut: Varyings;
    lumeCulledOut.position = vec4<f32>(2.0, 2.0, 2.0, 1.0);
    return lumeCulledOut;
  }`;var MZ=`lume_slot == ${gj}u`,yj=kZ(MZ),OM=16,RM=65535,SM=32768,bj=32767,vM=`fn lume_setDoorOf(code: u32) -> f32 {
  let covered = f32(code & ${bj}u) / ${bj}.0;
  return select(select(0.0, covered, code != 0u), -(1.0 - covered), (code & ${SM}u) != 0u);
}`;function fj($,J,Q){if($.fields.length===0)return["  let lume_setPerSlot: u32 = max(lume_setDraw.perSlot, 1u);",`  let lume_slot: u32 = ${J}[lume_setDraw.windowBase + instanceIndex / lume_setPerSlot];`,...Q===null?[]:[Q(MZ)],"  let lume_setIndex: u32 = instanceIndex % lume_setPerSlot;",`  let lume_setBase: u32 = lume_setIndex * ${$.stride/4}u;`,"  let lume_setDoor: f32 = 0.0;"];return["  let lume_setPerSlot: u32 = max(lume_setDraw.perSlot, 1u);","  var lume_slotAt: u32 = lume_setDraw.windowBase + instanceIndex / lume_setPerSlot;","  var lume_setIndex: u32 = instanceIndex % lume_setPerSlot;","  var lume_setDoor: f32 = 0.0;","  if (lume_setDraw.copyBase != 0u) {","    lume_slotAt = lume_setDraw.copyBase - 1u + instanceIndex * 2u;",`    let lume_setCopy: u32 = ${J}[lume_slotAt + 1u];`,`    lume_setIndex = lume_setCopy & ${RM}u;`,`    lume_setDoor = lume_setDoorOf(lume_setCopy >> ${OM}u);`,"  }",`  let lume_slot: u32 = ${J}[lume_slotAt];`,...Q===null?[]:[Q(MZ)],"  let lume_setBlock: u32 = lume_setBlockOf(lume_slot);",...Q===null?[]:[Q("lume_setIndex >= lume_set[lume_setBlock]")],`  let lume_setBase: u32 = lume_setBlock + ${CZ}u + lume_setIndex * lume_setDraw.strideWords;`]}function Ej($){return $.components===1?"f32":`vec${$.components}<f32>`}var xZ=($)=>`lume_inst_${$}`;function wM($,J){let Q=$.offset+J*$.componentBytes,Z=`lume_set[lume_setBase + ${Math.floor(Q/4)}u]`,X=Q%4,j=Math.floor(X/2);switch($.scalar){case"float32":return`bitcast<f32>(${Z})`;case"uint32":return`f32(${Z})`;case"sint32":return`f32(bitcast<i32>(${Z}))`;case"unorm8":return`(f32((${Z} >> ${8*X}u) & 0xFFu) / 255.0)`;case"uint8":return`f32((${Z} >> ${8*X}u) & 0xFFu)`;case"snorm8":return`max(f32(bitcast<i32>(${Z} << ${24-8*X}u) >> 24) / 127.0, -1.0)`;case"sint8":return`f32(bitcast<i32>(${Z} << ${24-8*X}u) >> 24)`;case"unorm16":return`unpack2x16unorm(${Z}).${j===0?"x":"y"}`;case"snorm16":return`unpack2x16snorm(${Z}).${j===0?"x":"y"}`;case"float16":return`lume_unpack2x16half(${Z}).${j===0?"x":"y"}`;case"uint16":return`f32((${Z} >> ${16*j}u) & 0xFFFFu)`;case"sint16":return`f32(bitcast<i32>(${Z} << ${16-16*j}u) >> 16)`}}function hj($,J){let Q=[];for(let Z of $.fields){if(!J.has(Z.name))continue;let X=Array.from({length:Z.components},(V,Y)=>wM(Z,Y)),j=Z.components===1?X[0]:`${Ej(Z)}(${X.join(", ")})`;Q.push(`  let ${xZ(Z.name)}: ${Ej(Z)} = ${j};`)}return Q}function mj($){let J=$.fields.length>0;return[J?"  let lume_instOffset: vec3<f32> = lume_setOffsetOf(lume_setBase, lume_setDraw.offsetField);":"  let lume_instOffset: vec3<f32> = vec3<f32>(0.0);",J?"  let lume_instYaw: f32 = lume_setYawOf(lume_setBase, lume_setDraw.yawField);":"  let lume_instYaw: f32 = 0.0;","  let lume_instCos: f32 = cos(lume_instYaw);","  let lume_instSin: f32 = sin(lume_instYaw);","  let lume_instRot: mat3x3<f32> = mat3x3<f32>(vec3<f32>(lume_instCos, 0.0, -lume_instSin), vec3<f32>(0.0, 1.0, 0.0), vec3<f32>(lume_instSin, 0.0, lume_instCos));",J?"  let lume_instScale: vec3<f32> = lume_setScaleOf(lume_setBase, lume_setDraw.scaleField);":"  let lume_instScale: vec3<f32> = vec3<f32>(1.0);",J?"  let lume_instTint: vec4<f32> = lume_setTintOf(lume_setBase, lume_setDraw.tintField);":"  let lume_instTint: vec4<f32> = vec4<f32>(1.0);"]}var uj="lume_instRot * (in.position * lume_instScale) + lume_instOffset",pj="normalize(lume_instRot * (in.normal / lume_instScale))";var bM={add:4,subtract:4,over:6,solid:6},cj=1024,EM=256,gM=48,_M="1.25",dj=64;function nj($){if($.blending==="additive")return"add";if($.blending==="subtractive")return"subtract";if($.blending==="none"||!$.transparent)return"solid";return"over"}var ij=`struct LumePointsWearer {
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
@group(2) @binding(3) var<storage, read> lume_pointsSet: array<u32>;`;function oj($){return $?`${lj}
  if (lume_points.records.x > 0u) {
    lume_pointLocal = lume_setOffsetOf(lume_points.records.x - 1u + ${CZ}u + lume_index * lume_points.records.y, lume_points.records.z);
  }`:lj}var rj=NZ("lume_pointsSet"),lj=`  let lume_pointsFromVertices: bool = lume_points.vertices.y > 0u;
  let lume_pointInstance: u32 = select(lume_index, 0u, lume_pointsFromVertices);
  let lume_pointVertex: u32 = select(0u, lume_index, lume_pointsFromVertices);
  var lume_pointLocal: vec3f = vec3f(0.0);
  if (lume_pointsFromVertices) {
    let lume_word: u32 = lume_points.vertices.x + lume_index * lume_points.vertices.y;
    lume_pointLocal = vec3f(lume_pointsVertices[lume_word], lume_pointsVertices[lume_word + 1u], lume_pointsVertices[lume_word + 2u]);
  }`;function aj($){let J=bM[$],Z=$==="over"||$==="solid"?`
  atomicAdd(&lume_pointsSums[k + 3u], u32(cover * ${cj}.0 * lume_alpha + d));
  atomicAdd(&lume_pointsSums[k + 4u], u32(cover * lume_coverLog * ${EM}.0 + d));`:"";return`fn lume_pointsDither(i: u32, p: vec2i) -> f32 {
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
  let units = vec3u(max(lume_light * (cover * ${cj}.0) + vec3f(d), vec3f(0.0)));
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
}`}var sj=`  let lume_pointRender: vec4f = lume_points.model * vec4f(out_pointsPosition, 1.0);
  let lume_pointClip: vec4f = ${d0("lume_pointRender")};
  if (lume_pointClip.w <= 0.0) {
    return;
  }
  let lume_pointNdc: vec3f = lume_pointClip.xyz / lume_pointClip.w;
  if (lume_pointNdc.z < 0.0 || lume_pointNdc.z > 1.0) {
    return;
  }
  let lume_pointPixel: vec2f = vec2f(lume_pointNdc.x * 0.5 + 0.5, 0.5 - lume_pointNdc.y * 0.5) * frame.viewportSize;
  let lume_pointScale: f32 = select(frame.cssPixel, 0.5 * frame.viewportSize.y / lume_pointClip.w, lume_points.attenuate > 0.5);
  let lume_pointRadius: f32 = min(max(out_pointsSize, 0.0) * lume_pointScale * 0.5, ${gM}.0);
  if (lume_pointPixel.x + lume_pointRadius < 0.0 || lume_pointPixel.y + lume_pointRadius < 0.0 || lume_pointPixel.x - lume_pointRadius > frame.viewportSize.x || lume_pointPixel.y - lume_pointRadius > frame.viewportSize.y || lume_pointRadius <= 0.0) {
    return;
  }`;function tj($){return`  let lume_alpha: f32 = ${$==="solid"?"1.0":"clamp(out_pointsColor.a * out_pointsOpacity, 0.0, 1.0)"};
  let lume_light: vec3f = max(${$==="add"||$==="subtract"?"out_pointsColor.rgb * lume_alpha":$==="over"?"out_pointsColor.rgb * lume_alpha":"out_pointsColor.rgb"}, vec3f(0.0));
  let lume_coverLog: f32 = -log(1.0 - min(lume_alpha, 0.999));
  if (lume_pointRadius <= 0.5) {
    let lume_side = lume_pointRadius * 2.0;
    lume_pointsPut(vec2i(floor(lume_pointPixel)), lume_index, lume_side * lume_side, lume_light, lume_alpha, lume_coverLog, lume_pointNdc.z);
    return;
  }
  if (lume_pointRadius <= ${_M}) {
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
  }`}function ej($,J){let Q=$==="solid"?"1.0":"clamp(out_pointsColor.a * out_pointsOpacity, 0.0, 1.0)",Z=$==="solid"?"out_pointsColor.rgb":"out_pointsColor.rgb * lume_alpha",X=$==="solid"?"true":$==="over"?"lume_alpha > 0.0":"any(lume_light > vec3f(0.0))";return`  let lume_side: f32 = lume_pointRadius * 2.0;
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
`).map((V)=>V.length>0?`    ${V}`:V).join(`
`)}
      let lume_alpha: f32 = ${Q};
      let lume_light: vec3f = max(${Z}, vec3f(0.0));
      if (${X}) {
        lume_pointsPut(vec2i(lume_x, lume_y), lume_index, lume_cover, lume_light, lume_alpha, -log(1.0 - min(lume_alpha, 0.999)), lume_pointNdc.z);
      }
    }
  }`}var $V=JV/TZ,D5=22,N5=43;var yM=16777216;function fM($,J,Q,Z,X){let j=Z===void 0?"":`
    if (any(${J}.xyz != vec3<f32>(0.0))) { ${Z} = 0.0; }`,V=Z===void 0?"":`
    let handBits = u32(select(select(${J}.z, ${J}.y, cutBit < ${N5}u), ${J}.x, cutBit < ${D5}u) * ${yM}.0);
    if (((handBits >> cutShift) & 1u) != 0u) { ${Z} = 1.0; }`;return`  } else if (${J}.w != 0.0) {${j}
    let cutSub = clamp(floor(((${$} + frame.renderOrigin).xz - vec2<f32>(${J}.w, ${Q}.x)) / ${TZ}.0), vec2<f32>(0.0), vec2<f32>(${$V-1}.0));
    let cutBit = u32(cutSub.x) + ${$V}u * u32(cutSub.y);
    let cutWord = u32(select(select(${Q}.w, ${Q}.z, cutBit < ${N5}u), ${Q}.y, cutBit < ${D5}u));
    let cutShift = select(select(cutBit - ${N5}u, cutBit - ${D5}u, cutBit < ${N5}u), cutBit, cutBit < ${D5}u);
    if (((cutWord >> cutShift) & 1u) != 0u) { ${X} }${V}`}function QV($,J,Q,Z="discard;"){let X=(Y)=>`  if (frame.guest != 0.0) {
    if (frame.guest > 0.0 && ${Y}) { ${Z} }
    if (frame.guest < 0.0 && dot(frame.guestClipPlane.xyz, ${$}) + frame.guestClipPlane.w < 0.0) { ${Z} }`;if("distances"in J)return`${X(`${J.distances}.z < 0.5`)}
  } else {
    if (${J.distances}.x < 0.0) { ${Z} }
    if (${J.distances}.y < 0.0) { ${Z} }
  }`;let{first:j,second:V}=J;return`${X(`dot(${j}.xyz, ${j}.xyz) <= 0.5`)}
  } else if (dot(${j}.xyz, ${j}.xyz) > 0.5) {
    if (dot(${j}.xyz, ${$} + frame.renderOrigin) + ${j}.w < 0.0) { ${Z} }
    if (any(${V} != vec4<f32>(0.0)) && dot(${V}.xyz, ${$} + frame.renderOrigin) + ${V}.w < 0.0) { ${Z} }
${fM($,j,V,Q,Z)}
  }`}var hM="instanceStart",mM="instanceEnd",YV=N0("modelMatrix","mat4x4f"),z$=Z$(`
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
`);function KV($){let J=u(z$,"lume_viewOfClip",[$],"vec3f"),Q=u(z$,"lume_renderOfView",[J],"vec3f"),Z=c("vec4f")`(${YV.inverse()} * vec4<f32>(${Q}, 1.0))`;return c("vec3f")`(${Z}.xyz / ${Z}.w)`}function uM($){if($.isLineNodeMaterial!==!0)return{width:i(1),worldUnits:!1};let J=$.linewidth;if(J instanceof B0)return{width:Z0(J,"f32"),worldUnits:$.worldUnits===!0};let Q=Number(J);return{width:i(isFinite(Q)?Math.max(0,Q):1),worldUnits:$.worldUnits===!0}}function qV($,J,Q,Z){let X=$.vertexNode;if(J===null&&X===null)return null;let j={stmts:[...Q?.stmts??[]]},V=Z===null||Z===Q?j:{stmts:[...Z.stmts]},Y=Object.assign(Object.create(Object.getPrototypeOf($)),$);if(Y._vertexNode=null,J===null&&X!==null){let q=$.positionNode;return Y._positionNode=J6(V,()=>KV(q===null?X:AZ(X,new Map([["positionLocal",q]])))),{material:Y,fragmentScope:j,vertexScope:V}}if(J===null)return null;let K=J6(V,()=>pM($,J.topology,J.records));Y._positionNode=K.position,Y.side="double";let G=u(z$,"lume_lineCover",[c("vec2f")`(${k0} * ${VV})`,K.ends,K.halves],"vec3f");if(J6(j,()=>ZV($.transparent?c("bool")`(${G}.x * ${G}.y <= 0.0)`:c("bool")`(${G}.z > 0.5)`)),$.transparent)Y._opacityNode=c("f32")`(${Z0($.opacityNode??k5,"f32")} * ${G}.x * ${G}.y)`;return{material:Y,fragmentScope:j,vertexScope:V}}function pM($,J,Q){let Z=J==="strip"?LZ:c("u32")`(${LZ} * 2u)`,X=c("u32")`(${Z} + 1u)`,j=$.positionNode,V=function(T,L){let k=Q?XV(T,"vec3"):P0(0,0,0);return j===null?k:Z0(AZ(j,new Map([["positionLocal",k],["vertexIndex",L]])),"vec3f")},Y=(T)=>c("vec4f")`(frame.viewProj * (${YV} * vec4<f32>(${T}, 1.0)))`,K=Y(V(hM,Z)),G=Y(V(mM,X)),q=u(z$,"lume_lineNear",[K,G],"vec4f"),z=u(z$,"lume_lineNear",[G,K],"vec4f"),H=uM($),U=i(H.worldUnits?1:0),W=u(z$,"lume_lineHalf",[H.width,U,q],"f32"),M=u(z$,"lume_lineHalf",[H.width,U,z],"f32"),P=c("vec2f")`${jV}.xy`,C=i($.transparent?1:0),D=KV(u(z$,"lume_lineVertex",[q,z,P,W,M,C],"vec4f")),B=c("vec4f")`vec4<f32>(${u(z$,"lume_linePixel",[q],"vec2f")}, ${u(z$,"lume_linePixel",[z],"vec2f")})`.vertexStage(),N=c("vec2f")`vec2<f32>(${W}, ${M})`.vertexStage();return{position:D,ends:B,halves:N}}function GV($=!1){return`struct DrawInstance {
  model: mat4x4<f32>,
  lift: vec4<f32>,${$?`
  clipPlane: vec4<f32>,
  clipPlane2: vec4<f32>,
  block: vec4<f32>,
  flash: vec4<f32>,`:""}
}`}var IZ=17,OZ=2,x5=3,RZ=15;function cM($,J){return`fn ${J}(base: u32, joints: vec4<u32>, weights: vec4<f32>) -> mat4x4<f32> {
  return ${$}[base + joints.x] * weights.x + ${$}[base + joints.y] * weights.y + ${$}[base + joints.z] * weights.z + ${$}[base + joints.w] * weights.w;
}`}function SZ($,J=OZ,Q="rig"){return`@group(${$}) @binding(${J}) var<storage, read> lume_${Q}Palettes: array<mat4x4<f32>>;
${cM(`lume_${Q}Palettes`,`lume_${Q}SkinMatrix`)}`}function lM($){let J=[],Q=(X)=>J.push({binding:X,visibility:1,buffer:{type:"read-only-storage"}}),Z=(X)=>J.push({binding:X,visibility:1,buffer:{type:"uniform"}});if($.instancing==="matrix"||$.skinned===!0)Q(0);if($.skinnedPalette==="rig")Q(OZ);if($.instanceSlots==="storage"||$.instanceSet)Q(x5);if($.instanceSet)Q(PZ),Z(DZ);if($.morph===!0)J.push(...E1);if($.modelMaterial===!0)Z(q5);if($.skinnedModel===!0)Z(G5);return J}function wZ($){if($==="unorm10-10-10-2")return{scalar:"packed",bits:32,count:4,type:"vec4<f32>"};if($==="unorm8x4-bgra")return{scalar:"bgra",bits:8,count:4,type:"vec4<f32>"};let J=/^(uint|sint|unorm|snorm|float)(8|16|32)(?:x([234]))?$/.exec($);if(!J)throw Error(`lume position reader: unsupported vertex format '${$}'`);let Q=J[1],Z="f32";if(Q==="uint")Z="u32";if(Q==="sint")Z="i32";let X=Number(J[3]??1);return{scalar:Q,bits:Number(J[2]),count:X,type:X===1?Z:`vec${X}<${Z}>`}}function vZ($,J){let Q=`lume_positionBuffer${$.binding}`,Z=$.streamOffset===0?"":`(arrayLength(&${Q}) / ${$.packedStride/4}u) * ${$.streamOffset/4}u + `;return`${Q}[${Z}vertexIndex * ${$.stride/4}u + ${J}u]`}function dM($,J){let{scalar:Q,bits:Z}=wZ($.attribute.format),X=$.offset+J*Z/8,j=vZ($,Math.floor(X/4)),V=X%4*8;if(Q==="float")return Z===32?`bitcast<f32>(${j})`:`lume_unpack2x16half(${j}).${V===0?"x":"y"}`;if(Z===32)return Q==="uint"?j:`bitcast<i32>(${j})`;let Y=`((${j} >> ${V}u) & ${2**Z-1}u)`,K=`(bitcast<i32>(${j} << ${32-Z-V}u) >> ${32-Z})`;if(Q==="uint")return Y;if(Q==="sint")return K;if(Q==="unorm")return`(f32(${Y}) / ${2**Z-1}.0)`;return`max(f32(${K}) / ${2**(Z-1)-1}.0, -1.0)`}function zV($){if($.attribute.format==="unorm8x4-bgra")return`unpack4x8unorm(${vZ($,$.offset/4)}).bgra`;let J=wZ($.attribute.format);if(J.scalar==="packed"){let Z=vZ($,$.offset/4);return`vec4<f32>(f32(${Z} & 1023u) / 1023.0, f32((${Z} >> 10u) & 1023u) / 1023.0, f32((${Z} >> 20u) & 1023u) / 1023.0, f32((${Z} >> 30u) & 3u) / 3.0)`}let Q=Array.from({length:J.count},(Z,X)=>dM($,X));return J.count===1?Q[0]:`${J.type}(${Q.join(", ")})`}function nM($){if($.encoding==="oct16")return"vec3<f32>";if($.encoding==="srgb8")return"vec4<f32>";return wZ($.format).type}function iM($,J){let Q=J.map(({binding:Y})=>`@group(3) @binding(${Y}) var<storage, read> lume_positionBuffer${Y}: array<u32>;`),Z=$.map(({attribute:Y})=>`  ${Y.name}: ${nM(Y)},`),X=$.map((Y)=>`  out.${Y.attribute.name} = ${Y.attribute.encoding?J5(Y.attribute.encoding,zV(Y)):zV(Y)};`),j=$.some(({attribute:Y})=>/^float16/.test(Y.format)),V=$.some(({attribute:Y})=>Y.encoding!==void 0);return[...Q,`struct VertexIn {
${Z.join(`
`)}
}`,`fn lume_pullVertexIn(vertexIndex: u32) -> VertexIn {
  var out: VertexIn;
${X.join(`
`)}
  return out;
}`,...j?[j9]:[],...V?[Z9]:[]].join(`
`)}function oM($){if($.attributeSource==="storage")return!1;for(let J of $.vertexLayout?.attributes??[])if(J.encoding!==void 0||!/^float32(x[234])?$/.test(J.format))return!0;return!1}function bZ($,J){let Q=$.vertexLayout;if(!Q)throw Error("lume position reader: a vertex layout is required");let Z=$.skinned===!0||$.nativeModelMatrix===!0||$.modelMaterial===!0||($.vertexBuffers?.length??1)>1||oM($),X=Z?{...Q,attributes:Q.attributes.filter((W)=>J.has(W.name))}:Q;if(!X.attributes.some((W)=>W.name==="position"))throw Error("lume position reader: the source layout has no required position attribute");let j=lM($),V=new Set(j.map((W)=>W.binding)),Y=function(W){let M=W;while(V.has(M))M++;return V.add(M),M},K=[],G=[],q=[...$.vertexReader?.inputs.packedVertexStreams??[]],z=Y(1);if(!Z)K.push({binding:z,slot:0});else{let W=$.vertexBuffers??[{arrayStride:Q.arrayStride,attributes:Q.attributes}];for(let P of X.attributes){let C=W.findIndex((N)=>Array.from(N.attributes).some((T)=>T.shaderLocation===P.shaderLocation)),D=W[C],B=D&&Array.from(D.attributes).find((N)=>N.shaderLocation===P.shaderLocation);if(!D||!B)throw Error(`lume position reader: attribute '${P.name}' has no source buffer`);if(!q.some((N)=>N.slot===C))q.push({slot:C,stride:D.arrayStride});G.push({attribute:P,slot:C,stride:D.arrayStride,offset:B.offset,binding:z,streamOffset:0,packedStride:0})}K.push({binding:z,slot:q[0].slot});let M=q.reduce((P,C)=>P+C.stride,0);for(let P of G){let C=0;for(let D of q){if(D.slot===P.slot)break;C+=D.stride}P.streamOffset=C,P.packedStride=M}}for(let{binding:W}of K)j.push({binding:W,visibility:1,buffer:{type:"read-only-storage"}});j.sort((W,M)=>W.binding-M.binding);let H=Y(2),U=Y(2);return{inputs:{drawBindings:j,vertexBindings:K,...q.length>1?{packedVertexStreams:q}:{},mediumBinding:H,depthBinding:U,instanceSet:$.instanceSet!==void 0},layout:X,native:Z?iM(G,K):null}}function UV($,J){let{vertexLayout:Q,vertexBuffers:Z}=$;if(!Q||!Z||Z.length<=1||$.vertexPath)return null;let V,Y,K;{ka(Q,J,Z);V=ba[0];Y=ba[1];K=ba[2]}if(V.length+($.instanceSlots==="vertex"?1:0)<=8)return{surface:{slots:V,vertexBuffers:Y},layout:K};let G=bZ($,J),q=G.inputs.packedVertexStreams,z=G.inputs.vertexBindings[0]?.binding;if(!G.native||!q||z===void 0)la();return ma(z,q,K,G);}var k9="\x03",T5="lume_lit",L5="lume_lit_u",HV="xyzw";function rM($,J){if($==="f32")return`material.${T5}[${J>>2}].${HV[J&3]}`;return na(J,$);}function aM($,J,Q,Z){let X=[],j=0;for(let K=$.indexOf(EZ);K>=0;K=$.indexOf(EZ,j)){let G=$.indexOf(WV,K+1),q=Number($.slice(K+1,G));X.push($.slice(j,K));let z=Q===null?-1:Q[q];X.push(z<0?J.literals[q]:rM(J.types[q],z)),j=G+1}return oa(X,$,j,Z);}function FV($,J,Q){if($.size===0)return{texts:Q,layout:J,read:sM};let Z=null,X="",j=J,V=tM($);if(J.byteSize+(V.decimalVectors+V.wholeVectors)*16<=Q6){let{slotOf:G,decimalVectors:q,wholeVectors:z}=V;Z=eM($,G);let H=new Float32Array(q*4),U=new Uint32Array(z*4);for(let M=0;M<$.size;M++){if(G[M]<0)continue;if($.types[M]==="f32")H[G[M]]=$.values[M]+0;else U[G[M]]=$.values[M]>>>0}if(q>0)X+=`
  ${T5}: array<vec4<f32>, ${q}>,`;if(z>0)X+=`
  ${L5}: array<vec4<u32>, ${z}>,`;let W=J.byteSize+H.byteLength;j={...J,byteSize:W+U.byteLength,...q>0?{lifted:{offset:J.byteSize,values:H}}:{},...z>0?{liftedWhole:{offset:W,values:U}}:{}}}let Y=(G)=>aM(G,$,Z,X),K=(G)=>G===void 0?void 0:Y(G);return{texts:{module:Y(Q.module),vertex:K(Q.vertex),caster:K(Q.caster),position:K(Q.position),compute:Q.compute.map(Y),...Q.inkField!==void 0?{inkField:Y(Q.inkField)}:{}},layout:j,read:Y}}var sM=($)=>$;function tM($){let J=new Int32Array($.size).fill(-1),Q=0,Z=0;for(let X of[!1,!0])for(let j=0;j<$.size;j++){if($.pinned(j)||$.held(j)!==X)continue;J[j]=$.types[j]==="f32"?Q++:Z++}return pa(J,Q,Z);}function eM($,J){let Q=J.slice();for(let Z=0;Z<$.size;Z++)if($.spelled(Z))Q[Z]=-1;return Q}var LV={specularF0:"vec3f",specularF90:"f32",iridescence:"f32",iridescenceIOR:"f32",iridescenceThickness:"f32",anisotropy:"vec2f",anisotropyTangent:"vec3f",anisotropyBitangent:"vec3f",sheen:"vec3f",sheenRoughness:"f32",thicknessColor:"vec3f",thicknessDistortion:"f32",thicknessAmbient:"f32",thicknessAttenuation:"f32",thicknessPower:"f32",thicknessScale:"f32",thickness:"f32",ior:"f32",attenuationColor:"vec3f",attenuationDistance:"f32",volumeScale:"vec3f",dispersion:"f32",clearcoatNormal:"vec3f"},C0=($)=>Z6("f32",[$]),A5=($)=>Z6("vec3f",[$[0],$[1],$[2]]);function R5($){return $.readsData=!0,x9($)}function G8($,J,Q){return J===null?$:$.mul(R5(J)[Q])}function AV($){if($.transmissionNode!==null)return $.transmissionNode;let J=u0($,"transmissionMap");return J===null?null:G8(C0($.transmission),J,"r")}function IV($){let J=u0($,"clearcoatMap"),Q=u0($,"clearcoatRoughnessMap");return{clearcoat:$.clearcoatNode??(J===null?null:G8(C0($.clearcoat),J,"r")),clearcoatRoughness:$.clearcoatRoughnessNode??(Q===null?null:G8(C0($.clearcoatRoughness),Q,"r"))}}function OV($){if($.shadingModel==="matcap")return null;if($.aoNode!==null)return $.aoNode;let J=u0($,"aoMap");return J===null?null:R5(J).r.sub(1).mul($.aoMapIntensity).add(1)}function RV($){let J=u0($,"lightMap");return J===null?null:x9(J).rgb.mul($.lightMapIntensity)}var $P=Z$(`
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
`),JP=N0(MV,"vec3f",{fragmentOnly:!0}),BV=($)=>u($P,"shade_uvFrameAxis",[JP,PV,z8(),C0($)],"vec3f"),QP=c("vec3f")`vec3<f32>(length(${N0("modelMatrix","mat4x4f")}[0].xyz), length(${N0("modelMatrix","mat4x4f")}[1].xyz), length(${N0("modelMatrix","mat4x4f")}[2].xyz))`.vertexStage();function ZP($){if($.anisotropyNode!==null)return $.anisotropyNode;let J=$.anisotropy*Math.cos($.anisotropyRotation),Q=$.anisotropy*Math.sin($.anisotropyRotation),Z=u0($,"anisotropyMap");if(Z===null)return Z6("vec2f",[J,Q]);let X=R5(Z),j=X.xy.mul(2).sub(1).normalize().mul(X.b);return j0(j.x.mul(J).sub(j.y.mul(Q)),j.x.mul(Q).add(j.y.mul(J)))}function XP($){if($.iridescenceThicknessNode!==null)return $.iridescenceThicknessNode;let J=$.iridescenceThicknessRange,Q=isFinite(Number(J?.[0]))?Number(J[0]):100,Z=isFinite(Number(J?.[1]))?Number(J[1]):400,X=u0($,"iridescenceThicknessMap");return X===null?C0(Z):k$(C0(Q),C0(Z),R5(X).g)}var SV=($)=>$.iorNode??C0($.ior),vV=($)=>$.specularIntensityNode??G8(C0($.specularIntensity),u0($,"specularIntensityMap"),"a");function jP($){let J=SV($),Q=J.sub(1).div(J.add(1)),Z=u0($,"specularColorMap"),X=$.specularColorNode??(Z===null?A5($.specularColor):A5($.specularColor).mul(x9(Z).rgb));return P0(Q.mul(Q)).mul(X).min(P0(1)).mul(vV($))}function wV($,J){let Q=[],Z=function(X,j){Q.push({name:X,node:j})};if(J&I5)Z("specularF0",jP($));if(J&NV)Z("specularF90",vV($));if(J&kV)Z("iridescence",$.iridescenceNode??G8(C0($.iridescence),u0($,"iridescenceMap"),"r")),Z("iridescenceIOR",$.iridescenceIORNode??C0($.iridescenceIOR)),Z("iridescenceThickness",XP($));if(J&CV)Z("anisotropy",ZP($)),Z("anisotropyTangent",BV(0)),Z("anisotropyBitangent",BV(1));if(J&xV){let X=u0($,"sheenColorMap"),j=A5($.sheenColor.map((V)=>V*$.sheen));Z("sheen",$.sheenNode??(X===null?j:j.mul(x9(X).rgb))),Z("sheenRoughness",x0($.sheenRoughnessNode??G8(C0($.sheenRoughness),u0($,"sheenRoughnessMap"),"a"),0.0001,1))}if(J&TV){if($.thicknessColorNode===null)throw new X0("internal: the subsurface term reads a thicknessColorNode");Z("thicknessColor",$.thicknessColorNode),Z("thicknessDistortion",$.thicknessDistortionNode??C0(0.1)),Z("thicknessAmbient",$.thicknessAmbientNode??C0(0)),Z("thicknessAttenuation",$.thicknessAttenuationNode??C0(0.1)),Z("thicknessPower",$.thicknessPowerNode??C0(2)),Z("thicknessScale",$.thicknessScaleNode??C0(10))}if(J&O5){Z("thickness",L0($.thicknessNode??G8(C0($.thickness),u0($,"thicknessMap"),"g"),0)),Z("ior",SV($)),Z("attenuationColor",$.attenuationColorNode??A5($.attenuationColor));let X=Number.isFinite($.attenuationDistance)?$.attenuationDistance:340000000000000000000000000000000000000;Z("attenuationDistance",$.attenuationDistanceNode??C0(X)),Z("volumeScale",QP)}if(J&DV)Z("dispersion",$.dispersionNode??C0($.dispersion));if(J&T9&&$.clearcoatNormalNode!==null)Z("clearcoatNormal",$.clearcoatNormalNode);return Q}var yV=16,fZ={rewrite:($)=>$,rewriteScope:($)=>$,rolled:0,tableRows:0},U8=0,YP=1,S5=2,A9=3,fV=0,gZ=1,hV=2,_Z=-1;function pV($){let J=[...$.roots],Q=$.scopes.filter((V)=>V!==null&&V!==void 0),Z=[],X=0,j=0;for(;;){let V=new dV(J,Q);if(V.rolled===0)break;Z.push(V),X+=V.rolled,j+=V.tableRows,J=J.map((Y)=>V.rewrite(Y)),Q=Q.map((Y)=>V.rewriteScope(Y))}if(Z.length===0)return fZ;return qa(Z,X,j);}var cV=-1;function KP($,J){let Q=new Map,Z=new Map,X=new Set,j=[],V=[...$];for(let Y of new Set(J))A0(Y,V);j.push({region:cV,roots:V});for(let Y=j.pop();Y!==void 0;Y=j.pop()){let K=new Map;Q.set(Y.region,K);let G=[],q=function(z){let H=K.get(z);if(K.set(z,(H??0)+1),H===void 0)G.push(z)};for(let z of Y.roots)q(z);for(let z=G.pop();z!==void 0;z=G.pop()){let H=z.meta;if(H.kind==="varRead"&&!X.has(z))X.add(z),Z.set(H.variable.id,(Z.get(H.variable.id)??0)+1);else if((H.kind==="fnCall"||H.kind==="voidCall")&&!Q.has(H.instance.id)&&!j.some((U)=>U.region===H.instance.id))ra(j,H);for(let U of z.inputs)q(U)}}return{uses:Q,reads:Z}}function lV($,J){let Q=J.get($);if(Q!==void 0)return Q;let Z=(V)=>`${V.meta.kind}:${V.type}/${V.inputs.length}`,X=(V)=>V.stmts.map((Y)=>lV(Y,J)).join(";"),j;switch($.kind){case"decl":j=`d${$.variable.type}:${Z($.init)}`;break;case"assign":j=`a${$.variable.type}${$.component??""}:${Z($.value)}`;break;case"if":{j=sa(j,$,Z,X)}break;case"loop":j=`l${$.trips??"?"}{${X($.scope)}}`;break;case"sideEffect":j=`e${Z($.node)}`;break;case"discard":j=`x${$.cond===null?"-":Z($.cond)}`;break;case"store":{j=ta(j,$,Z)}break}return J.set($,j),j}class dV{constructor($,J){this.rolled=0;this.tableRows=0;this.uses=void 0;this.reads=void 0;this.region=cV;this.nodesDone=new Map;this.instancesDone=new Map;this.scopesDone=new Map;this.bodiesDone=new Map;this.skeletons=new WeakMap;this.quadInstances=new Map;this.objectIds=new Map;this.ids=($)=>{let J=this.objectIds.get($);if(J!==void 0)return J;let Q=this.objectIds.size+1;return this.objectIds.set($,Q),Q};let Q=KP($,J);this.uses=Q.uses,this.reads=Q.reads;for(let Z of J)this.rewriteScope(Z);for(let Z of $)this.rewrite(Z)}usesOf($){return this.uses.get(this.region)?.get($)??0}readsOf($){return this.reads.get($)??0}rewrite($){return r0($,this.nodesDone,function(){return},(J,Q)=>{let Z=J.meta;if(Z.kind!=="fnCall"&&Z.kind!=="voidCall")return m$(J,Q);return ua.call(this,Z,Q,J);})}instance($){let J=this.instancesDone.get($.id);if(J!==void 0)return J;let Z;{Z=va.call(this,$)}let X=$.returns===null?null:this.rewrite($.returns),j=X6($,Z,X);return this.instancesDone.set($.id,j),j}rewriteScope($){let J=this.scopesDone.get($);if(J!==void 0)return J;let Q=$.stmts,Z=[],X=!1;for(let V=0;V<Q.length;){let Y=this.runAt(Q,V);if(Y!==null){for(let G of Y.stmts)Z.push(this.stmt(G,!1));this.rolled+=1,this.tableRows+=Y.tableRows,X=!0,V+=Y.length;continue}let K=this.stmt(Q[V],!0);if(K!==Q[V])X=!0;Z.push(K),V+=1}let j=X?{stmts:Z}:$;return this.scopesDone.set($,j),j}body($){let J=this.bodiesDone.get($);if(J!==void 0)return J;let Q=!1,Z=$.stmts.map((j)=>{let V=this.stmt(j,!1);if(V!==j)Q=!0;return V}),X=Q?{stmts:Z}:$;return this.bodiesDone.set($,X),X}stmt($,J){let Q=(j)=>this.rewrite(j),Z=(j)=>J?this.rewriteScope(j):this.body(j),X;switch($.kind){case"decl":if(X={...$,init:Q($.init)},X.init===$.init)return $;return X;case"assign":return wa(X,$,Q);case"if":{if((da=xa($,Q,Z))!==ca)return da}case"loop":{if((da=ya(Q,$,Z))!==ca)return da}case"sideEffect":return za(X,$,Q);case"discard":{return Ba($,Q);}case"store":{if((da=Ca(Q,$))!==ca)return da}}}runAt($,J){let Q=(j,V)=>({stmts:j.loop(),length:V,tableRows:j.tableRows()}),Z=(j)=>lV($[j],this.skeletons),X=function(j,V,Y){for(let K=0;K<Y;K+=1)if(Z(j+K)!==Z(V+K))return!1;return!0};for(let j=1;J+2*j<=$.length;j+=1){if(!X(J,J+j,j))continue;let V=2;while(J+(V+1)*j<=$.length&&X(J,J+V*j,j))V+=1;let Y=null;for(let K=V;K>=2;){let G=Array.from({length:K},(z,H)=>$.slice(J+H*j,J+(H+1)*j)),q=this.unify(G);if(q.walk!==null&&K>yV&&q.walk.gathers()>0){K=yV;continue}if(q.walk!==null&&q.splitAt>=2&&q.splitAt<K){Y??={walk:q.walk,length:K*j},K=q.splitAt;continue}if(q.walk!==null)return Q(q.walk,K*j);if(Y!==null)return Q(Y.walk,Y.length);if(q.failAt<2||q.failAt>=K)break;K=q.failAt}if(Y!==null)return Q(Y.walk,Y.length)}return null}unify($){let J=new Set;for(;;){let Q=new nV($,J,this);if(!Q.walkStmts($)||Q.failAt>=0)return Da(Q);let Z=Q.readOutside(J);if(typeof Z==="number")return{walk:null,failAt:Z,splitAt:-1};if(Z!==null){J=Z;continue}let X=Q.holds();if(X>=0)return{walk:null,failAt:X,splitAt:-1};return{walk:Q.smaller()?Q:null,failAt:1,splitAt:Q.splitAt()}}}readsQuad($){return _V($,this.quadInstances)}}function qP($,J){let Q=$.meta;if(Q.kind==="element")return J===1;if(Q.kind==="wgslExpr")return!Q.module&&!uV.test(Q.parts[0]??"");return!1}var GP="xyzw";class nV{constructor($,J,Q){this.trips=void 0;this.boundary=void 0;this.pass=void 0;this.positions=[];this.order=[];this.posOf=void 0;this.locals=void 0;this.localCount=0;this.assigned=new Set;this.rootRefs=void 0;this.differing=[];this.readAfter=new Set;this.failAt=-1;this.n=void 0;this.trips=$;this.boundary=J;this.pass=Q;this.n=$.length,this.posOf=$.map(()=>new Map),this.locals=$.map(()=>new Map),this.rootRefs=$.map(()=>[])}fail($){if(this.failAt<0)this.failAt=Math.max(1,$);return!1}refuse($){return this.fail($),fV}walkStmts($){let J=$[0];for(let Q=1;Q<this.n;Q+=1)if($[Q].length!==J.length)return this.fail(Q);for(let Q=0;Q<J.length;Q+=1){let Z=$.map((X)=>X[Q]);if(!this.walkStmt(Z))return!1}return!0}walkStmt($){let J=$[0];for(let Z=1;Z<this.n;Z+=1)if($[Z].kind!==J.kind)return this.fail(Z);let Q=(Z)=>Z!==null;switch(J.kind){case"decl":{let Z=$.filter((X)=>X.kind==="decl");for(let X=1;X<this.n;X+=1)if(Z[X].variable.type!==J.variable.type)return this.fail(X);if(!this.walkRoots(Z.map((X)=>X.init),!1))return!1;return this.declare(Z.map((X)=>X.variable)),!0}case"assign":{let Z=$.filter((X)=>X.kind==="assign");if(!this.sameVariable(Z.map((X)=>X.variable)))return!1;for(let X=1;X<this.n;X+=1)if(Z[X].component!==J.component)return this.fail(X);return this.walkRoots(Z.map((X)=>X.value),!1)}case"if":{if((da=Ea.call(this,$,J,Q))!==ca)return da}case"loop":{if((da=Fa.call(this,$,J))!==ca)return da}case"sideEffect":return Ga.call(this,$);case"discard":{if((da=Ha.call(this,$,J,Q))!==ca)return da}case"store":{if((da=Ja.call(this,$,J))!==ca)return da}}}declare($){let J=this.localCount;this.localCount+=1,$.forEach((Q,Z)=>this.locals[Z].set(Q.id,J))}sameVariable($){let J=this.locals[0].get($[0].id);for(let Q=1;Q<this.n;Q+=1)if(this.locals[Q].get($[Q].id)!==J||J===void 0&&$[Q]!==$[0])return this.fail(Q);if(J===void 0)this.assigned.add($[0].id);return!0}walkRoots($,J){$.forEach((X,j)=>this.rootRefs[j].push(X));let Q=[],Z=(X,j)=>{let V=this.visit(X,j);if(V===fV)return!1;if(V===hV)Q.push({nodes:X,next:0,pinned:j,position:this.positions.length-1});return!0};if(!Z($,J))return!1;while(Q.length>0){let X=Q[Q.length-1],j=X.nodes[0];if(X.next>=j.inputs.length){Q.pop(),this.order.push(X.position);continue}let V=X.next;if(X.next+=1,!Z(X.nodes.map((Y)=>Y.inputs[V]),X.pinned||qP(j,V)))return!1}return!0}signature($,J){let Q=$.meta;if(Q.kind==="varRead"){let Z=this.locals[J].get(Q.variable.id);return Z===void 0?`vo${Q.variable.id}`:`vl${Z}:${$.type}`}if(Q.kind==="voidCall")return Ka(Q,$);return EV($,this.pass.ids)}visit($,J){let Q=$[0];if($.every((Y)=>Y===Q)){for(let Y=0;Y<this.n;Y+=1){let K=this.posOf[Y].get(Q);if(K!==void 0&&K!==_Z)return this.refuse(Math.max(1,Y));this.posOf[Y].set(Q,_Z)}return gZ}let Z=this.posOf[0].get(Q);if(Z===_Z)return this.refuse(Math.max(1,$.findIndex((Y)=>Y!==Q)));for(let Y=1;Y<this.n;Y+=1)if(this.posOf[Y].get($[Y])!==Z)return this.refuse(Y);if(Z!==void 0)return gZ;let X=this.positions.length;$.forEach((Y,K)=>this.posOf[K].set(Y,X));for(let Y=1;Y<this.n;Y+=1)if($[Y].type!==Q.type)return this.refuse(Y);let j=(Y)=>{return this.positions.push({nodes:$,role:Y}),this.order.push(X),gZ};if($.some((Y)=>this.boundary.has(Y)))return J?this.refuse(1):j(A9);if($.every((Y)=>Y.meta.kind==="const")){let Y=$.map((q)=>q.meta.kind==="const"?q.meta.values:[]),K=Y.findIndex((q)=>q.length!==Y[0].length||q.some((z,H)=>!Object.is(z,Y[0][H])));if(K<0)return j(YP);if(J||I9(Q.type)!=="f32"||w5(Q.type))return this.refuse(K);let G=Y.findIndex((q)=>q.some((z)=>!Number.isFinite(z)));if(G>=0)return this.refuse(Math.max(1,G));return j(S5)}let V=this.signature(Q,0);for(let Y=1;Y<this.n;Y+=1){if(V!==null&&this.signature($[Y],Y)===V)continue;if(J)return this.refuse(Y);return this.differing.push({position:X,first:Y}),j(A9)}if(V===null)return this.refuse(1);if($.some((Y)=>this.pass.readsQuad(Y)))return this.refuse(1);return this.positions.push({nodes:$,role:U8}),hV}readOutside($){let J=null,Q=-1,Z=new Set;for(let X=0;X<this.n;X+=1){let j=new Map,V=function(K){j.set(K,(j.get(K)??0)+1)};for(let K of this.rootRefs[X])V(K);for(let K of this.positions)if(K.role===U8)for(let G of K.nodes[X].inputs)V(G);let Y=(K)=>this.pass.usesOf(K)>(j.get(K)??0);for(let{position:K,first:G}of this.differing)if(Q<0&&!Y(this.positions[K].nodes[X]))Q=Math.max(1,G);this.positions.forEach((K,G)=>{if(K.role!==U8)return;if(Y(K.nodes[X]))this.readAfter.add(K.nodes[X]);else Z.add(G)})}return this.positions.forEach(function(X,j){if(X.role!==U8||Z.has(j))return;J??=new Set($);for(let V of X.nodes)J.add(V)}),J??(Q<0?null:Q)}splitAt(){let $=-1;for(let J of this.differing)if($<0||J.first<$)$=J.first;return $}holds(){let $=new Set(this.assigned);for(let X of this.locals)for(let j of X.keys())$.add(j);let Z;{Z=Ma($)}for(let X=0;X<this.n;X+=1){let j=new Map;for(let V of this.positions){let Y=V.nodes[X];if(V.role===A9&&Z(Y))return Math.max(1,X);if(V.role===U8&&this.readAfter.has(Y)&&Z(Y))return Math.max(1,X);if(V.role===U8&&Y.meta.kind==="varRead")j.set(Y.meta.variable.id,(j.get(Y.meta.variable.id)??0)+1)}for(let V of this.locals[X].keys())if(this.pass.readsOf(V)>(j.get(V)??0))return Math.max(1,X)}return-1}smaller(){let $=this.positions.length;return $+this.gathers()*(this.n+2)+4<$*this.n}gathers(){let $=0;for(let J of this.positions)if(J.role===A9)$+=1;return $}tableRows(){let $=0,J=new Set;for(let Q of this.positions){if(Q.role!==S5)continue;let Z=Q.nodes.map((j)=>j.meta.kind==="const"?j.meta.values:[]),X=Z.map((j)=>j.join(",")).join(";");if(J.has(X))continue;if(J.add(X),($&3)+Z[0].length>4)$=$+3&-4;$+=Z[0].length}return $===0?0:this.n*Math.ceil($/4)}loop(){let $=this.n,J=new yZ(v5(),"i32","i"),Q=V0("varRead","i32",[],{variable:J}),Z=new Map,X=new Map,j=0;this.positions.forEach(function(W,M){if(W.role!==S5)return;let P=W.nodes.map((B)=>B.meta.kind==="const"?B.meta.values:[]),C=P.map((B)=>B.join(",")).join(";"),D=Z.get(C);if(D===void 0){let B=P[0].length;if((j&3)+B>4)j=j+3&-4;D=j,j+=B,Z.set(C,D)}X.set(M,D)});let V=Math.max(1,Math.ceil(j/4)),Y=j>0?Array($*V*4).fill(0):[];this.positions.forEach(function(W,M){let P=X.get(M);if(P===void 0)return;W.nodes.forEach(function(C,D){if(C.meta.kind!=="const")return;C.meta.values.forEach(function(B,N){Y[D*V*4+P+N]=B+0})})});let K=j>0?V0("uniform","vec4f",[],{slot:new mV(v5(),"vec4f",Y,$*V)}):null,G=new Map,q=function(W,M){let P=G.get(M);if(P===void 0){let C=V===1?Q:V0("op2","i32",[Q,L9(V)],{op:"*"}),D=M===0?C:V0("op2","i32",[C,L9(M)],{op:"+"});P=V0("element","vec4f",[W,D],{}),G.set(M,P)}return P},z=[],H=new Map;for(let W of this.order){let M=this.positions[W],P=M.nodes[0];if(M.role===S5&&K!==null){let C=X.get(W)??0,D=P.meta.kind==="const"?P.meta.values.length:1,B=q(K,C>>2);H.set(P,D===4?B:V0("swizzle",P.type,[B],{sw:GP.slice(C&3,(C&3)+D)}))}else if(M.role===A9){let C=new yZ(v5(),P.type,null,$);z.push({kind:"decl",variable:C,init:V0("rows",P.type,M.nodes,{})}),H.set(P,V0("element",P.type,[V0("varRead",P.type,[],{variable:C}),Q],{}))}else if(M.role===U8){let C=m$(P,P.inputs.map((D)=>H.get(D)??D));if(C!==P)H.set(P,C)}}let U=iV(this.trips[0],(W)=>H.get(W)??W);return[...z,{kind:"loop",counter:J,start:L9(0),end:L9($),trips:$,scope:{stmts:U}}]}}function iV($,J){let Q=(Z)=>({stmts:iV(Z.stmts,J)});return $.map(function(Z){switch(Z.kind){case"decl":return{...Z,init:J(Z.init)};case"assign":return{...Z,value:J(Z.value)};case"if":return{kind:"if",branches:Z.branches.map((X)=>({cond:X.cond===null?null:J(X.cond),scope:Q(X.scope)}))};case"loop":return{...Z,start:J(Z.start),end:J(Z.end),scope:Q(Z.scope)};case"sideEffect":return{...Z,node:J(Z.node)};case"discard":return{kind:"discard",cond:Z.cond===null?null:J(Z.cond)};case"store":return{...Z,index:J(Z.index),value:J(Z.value)}}})}var zP=new Set(["varRead","storageRead","atomic","fnCall","voidCall"]),UP=/\bvar\s*</,HP=new WeakMap;function WP($){return h$(HP,$,()=>UP.test($.source))}var sV=new Float64Array(1),oV=new Int32Array(sV.buffer);function a0($,J){return Math.imul($^J,16777619)>>>0}function FP($){if(zP.has($.meta.kind))return!0;return $.meta.kind==="wgslExpr"&&$.meta.module!==null&&WP($.meta.module)}function rV($,J){return typeof $==="number"&&typeof J==="number"?Object.is($,J):$===J}function BP($,J){if(!Array.isArray($)||!Array.isArray(J))return!Array.isArray($)&&!Array.isArray(J)&&rV($,J);if($.length!==J.length)return!1;for(let Q=0;Q<$.length;Q+=1)if(!rV($[Q],J[Q]))return!1;return!0}function MP($,J){let Q=0;for(let Z in $){if(!Object.hasOwn($,Z))continue;if(!Object.hasOwn(J,Z)||!BP(Reflect.get($,Z),Reflect.get(J,Z)))return!1;Q+=1}for(let Z in J)if(Object.hasOwn(J,Z))Q-=1;return Q===0}var hZ=-1,PP={rewrite:($)=>$,rewriteScope:($)=>$,shared:0};class tV{constructor(){this.objectIds=new Map;this.stringIds=new Map;this.state=new Map;this.buckets=new Map;this.keys=0;this.first=new Map;this.done=new Map;this.instances=new Map;this.bodyScope=u$(($)=>this.done.get($)??$);this.shared=0;}objectId($){let J=this.objectIds.get($);if(J===void 0)J=this.objectIds.size+1,this.objectIds.set($,J);return J}stringId($){let J=this.stringIds.get($);if(J===void 0)J=this.stringIds.size+1,this.stringIds.set($,J);return J}itemHash($){switch(typeof $){case"number":if(Number.isNaN($))return 2146959360;return sV[0]=$,a0(a0(2654435769,oV[0]),oV[1]);case"string":return a0(2246822507,this.stringId($));case"object":return $===null?668265263:a0(3266489909,this.objectId($));default:return a0(374761393,this.stringId(String($)))}}fieldHash($){if(!Array.isArray($))return this.itemHash($);let J=a0(3550635116,$.length);for(let Q of $)J=a0(J,this.itemHash(Q));return J}keyFor($){if($.meta.kind==="vertexStage")return++this.keys;let J=$.meta,Q=0;for(let j in J)if(Object.hasOwn(J,j))Q=Q+a0(this.stringId(j),this.fieldHash(Reflect.get(J,j)))>>>0;let Z=a0(a0(a0(2166136261,this.stringId($.type)),Q),$.inputs.length);for(let j of $.inputs)Z=a0(Z,this.keyOf(j));let X=this.buckets.get(Z);if(X!==void 0)if(Array.isArray(X)){for(let j of X)if(this.sameValue($,j))return this.keyOf(j);X.push($)}else{if(this.sameValue($,X))return this.keyOf(X);this.buckets.set(Z,[X,$])}else this.buckets.set(Z,$);return++this.keys}keyOf($){return(this.state.get($)??0)>>1}sameValue($,J){if($.type!==J.type||$.inputs.length!==J.inputs.length)return!1;for(let Q=0;Q<$.inputs.length;Q+=1)if(this.keyOf($.inputs[Q])!==this.keyOf(J.inputs[Q]))return!1;return MP($.meta,J.meta)}walk($){r0($,this.state,function(){return},(J)=>this.settle(J),aV)}instanceOf($){let J=this.instances.get($);if(J===void 0){let Q=this.bodyScope($.body),Z=$.returns&&(this.done.get($.returns)??$.returns);J=X6($,Q,Z),this.instances.set($,J)}return J}metaOf($){let J=$.meta;if(J.kind!=="fnCall"&&J.kind!=="voidCall")return J;return Na.call(this,J);}settle($){let J=$.inputs,Q=null,Z=FP($),X=!1;for(let z=0;z<J.length;z+=1){let H=J[z],U=this.done.get(H)??H;if(Q===null&&U!==H)Q=J.slice(0,z);if(Q!==null)Q.push(U);let W=this.state.get(H)??hZ;if(W===hZ)Z=!0;else if((W&1)===1)X=!0}let j=this.metaOf($),V=j===$.meta&&Q===null?$:new B0($.type,Q??J,j);if(V!==$)this.done.set($,V);if(Z)return hZ;let Y=X||$.meta.kind==="wgslExpr"&&$.meta.module!==null||$.meta.kind==="textureSample",K=this.keyFor($),G=K*2+(Y?1:0);if(!Y||$.meta.kind==="vertexStage")return G;let q=this.first.get(K);if(q===void 0)this.first.set(K,V);else this.done.set($,q),this.shared+=1;return G}}function eV($){let J=[...$.roots];for(let V of new Set($.scopes))if(V!==null&&V!==void 0)A0(V,J);let Q=new tV;for(let V of J)Q.walk(V);if(Q.shared===0)return PP;let Z=Q.done,X=(V)=>Z.get(V)??V,j=u$(X);return{rewrite:X,rewriteScope:(V)=>V===null?null:j(V),shared:Q.shared}}var b5={rewrite:($)=>$,rewriteScope:($)=>$,packs:0},CP=new Set(["instanceIndex","cameraPosition","time","deltaTime","screenSize"]),DP=new Set(["dpdx","dpdxCoarse","dpdxFine","dpdy","dpdyCoarse","dpdyFine","fwidth","fwidthCoarse","fwidthFine"]),$Y=/\b(?:textureSample|textureSampleBias|textureSampleCompare|dpdx\w*|dpdy\w*|fwidth\w*)\s*\(|\bdiscard\b|\bvar\s*<\s*(?:private|workgroup|storage\s*,\s*read_write)/,H8={f32:1,vec2f:2,vec3f:3,vec4f:4},NP=["f32","vec2f","vec3f","vec4f"],kP="xyzw";function cZ($,J){let Q=new Set,Z=new Set,X=new Set,j=[...$];if(J)A0(J,j),pZ(J,(Y)=>X.add(Y));let V=new Set;for(let Y=j.pop();Y!==void 0;Y=j.pop()){if(V.has(Y))continue;V.add(Y);let K=Y.meta;if(K.kind==="textureSample")Q.add(K.texture);else if(K.kind==="storageRead")Z.add(K.buffer);for(let G of Y.inputs)j.push(G)}return{textures:Q,storages:Z,nodes:V,variables:X}}function xP($,J){let Q=new Map,Z=new Set,X=function(G,q){let z=Q.get(G);if(z)z.push(q);else Q.set(G,[q])},j=function(G,q){for(let z of G.stmts)switch(z.kind){case"decl":Oa(X,z,q);break;case"assign":Pa(X,z,q);break;case"if":{let H=[];for(let U of z.branches){if(U.cond)H.push(U.cond);j(U.scope,[...q,...H])}break}case"loop":X(z.counter.id,{values:[z.start,z.end],controls:q}),j(z.scope,[...q,z.start,z.end]);break;default:break}};if($)j($,[]);let V=[...J];if($)A0($,V);let Y=new Set,K=new Set;for(let G=V.pop();G!==void 0;G=V.pop()){if(Y.has(G))continue;Y.add(G);let q=G.meta;if((q.kind==="fnCall"||q.kind==="voidCall")&&!K.has(q.instance))K.add(q.instance),pZ(q.instance.body,(z)=>Z.add(z),!1),j6(q.instance,V);for(let z of G.inputs)V.push(z)}return{writes:Q,poisoned:Z}}var p$=-1,x$={one:!1,heavy:!1,readsVar:!1,rows:p$},mZ={one:!0,heavy:!1,readsVar:!1,rows:0};class E5{constructor($,J){this.reads=void 0;this.variables=void 0;this.memo=new Map;this.reads=$;this.variables=J}of($){return r0($,this.memo,(J)=>this.leaf(J)?this.settle(J):void 0,(J)=>this.settle(J))}leaf($){let J=$.meta.kind;return J==="const"||J==="uniform"||J==="input"||J==="attribute"||J==="varRead"||J==="vertexStage"||J==="fnCall"||J==="voidCall"||J==="atomic"}settle($){let J=$.meta;switch(J.kind){case"const":case"uniform":return mZ;case"input":return Qa(J);case"varRead":return Ra.call(this,J);case"attribute":case"vertexStage":case"fnCall":case"voidCall":case"atomic":return x$;case"call":if(DP.has(J.fn))return x$;break;case"textureSample":if(J.mode==="sample"||!this.reads.textures.has(J.texture))return x$;break;case"storageRead":if(!this.reads.storages.has(J.buffer))return x$;break;case"wgslExpr":if(J.module===null||$Y.test(J.module.source)||$Y.test(J.parts.join("")))return x$;break;default:break}let Q=J.kind==="textureSample"||J.kind==="storageRead"||J.kind==="wgslExpr",Z=!1,X=J.kind==="textureSample"||Sa(J)||Ua(J)?p$:0;for(let V of $.inputs){let Y=this.memo.get(V)??x$;if(!Y.one)return x$;Q||=Y.heavy,Z||=Y.readsVar,X=X===p$||Y.rows===p$?p$:Math.max(X,Y.rows)}let j=$.inputs[0]?.meta;if(J.kind==="element"&&j?.kind==="uniform"&&j.slot.rows>0&&this.isCopyRow($.inputs[1]))X=j.slot.rows;return{one:!0,heavy:Q,readsVar:Z,rows:X}}isCopyRow($){let J=$.meta;if(J.kind==="input")return J.name==="instanceIndex";if(J.kind==="cast")return this.isCopyRow($.inputs[0]);return J.kind==="call"&&J.fn==="min"&&$.inputs.length===2&&$.inputs.some((Q,Z)=>this.isCopyRow(Q)&&this.of($.inputs[1-Z]).rows===0)}}function TP($,J,Q){let Z=new Set;for(let X of $.keys())if(!J.has(X))Z.add(X);for(let X=!0;X;){X=!1;let j=new E5(Q,Z);for(let V of[...Z]){if(($.get(V)??[]).every((K)=>K.values.every((G)=>j.of(G).one)&&K.controls.every((G)=>j.of(G).one)))continue;Z.delete(V),X=!0}}return Z}function QY($){let J=[];if($)A0($,J);return J}function LP($,J){let Q=0;return V6([$],function(Z){if(!J.of(Z).one)return!1;let X=Z.meta.kind;if(X==="textureSample"||X==="storageRead"||X==="wgslExpr"||X==="varRead")Q+=1;return X!=="varRead"}),Q}function ZY($){if($.packs<=0)return b5;let J=QY($.scope),{writes:Q,poisoned:Z}=xP($.scope,[...$.outputs,...J]),X=TP(Q,Z,$.reads),j=new E5($.reads,X),V=function(D){let B=new Map,N=function(T){let L=T.meta;if(L.kind==="varRead")return D.has(L.variable.id);return L.kind==="textureSample"||L.kind==="storageRead"||L.kind==="wgslExpr"?$.reads.nodes.has(T):void 0};return(T)=>r0(T,B,N,(L,k)=>k.every(Boolean))},Y=new Set($.reads.variables);for(let D=!0;D;){D=!1;let B=V(Y);for(let N of[...Y]){if((Q.get(N)??[]).every((T)=>T.values.every(B)&&T.controls.every(B)))continue;Y.delete(N),D=!0}}let K=V(Y),G=new Set,q=(D,B)=>V6(D,function(N){let T=j.of(N);if(T.one){if(!T.heavy)return!1;let L=N.meta.kind;if(!(B&&T.readsVar)&&H8[N.type]!==void 0&&L!=="const"&&L!=="uniform"&&L!=="input"&&K(N)&&!$.acts(N))return G.add(N),!1}return N.meta.kind!=="vertexStage"});if(q(J,!0),q($.outputs,!1),G.size===0)return b5;let z=[...G].map((D)=>({node:D,size:H8[D.type]??4,weight:LP(D,j)})).sort((D,B)=>B.weight-D.weight||B.size-D.size||D.node.id-B.node.id),H=jY(z.map((D)=>D.node),$.packs),U=new Map;for(let D of H){let B=NP[D.used-1];VY(U,D.items,V0("vertexStage",B,[D.items.length===1?D.items[0]:V0("construct",B,D.items,{})],{label:null,flat:!0}))}let W=uZ(U,!1),M=uZ(new Map([...U].filter(([D])=>!j.of(D).readsVar)),!1),P=u$(M);return{rewrite:W,rewriteScope:(D)=>D===null?null:P(D),packs:H.length}}var lZ={rewrite:($)=>$,rewriteScope:($)=>$,stage:null},AP=64;function XY($){let J=[...$.roots,...$.scopes.flatMap((P)=>QY(P))],Q=new E5(cZ(J,null),new Set),Z=[],X=1;if(V6(J,function(P){let C=Q.of(P);if(C.rows===p$||!C.heavy||H8[P.type]===void 0)return!0;return Z.push(P),X=Math.max(X,C.rows),!1}),Z.length===0)return lZ;let j=jY(Z.sort((P,C)=>(H8[C.type]??4)-(H8[P.type]??4)||P.id-C.id),1/0),V=JY(X*j.length),Y=(P)=>V0("const","u32",[],{values:[P]}),K=N0("instanceIndex","u32"),G=V0("op2","u32",[V0("call","u32",[K,Y(X-1)],{fn:"min"}),Y(j.length)],{op:"*"}),q=V0("op2","u32",[K,Y(j.length)],{op:"*"}),z=(P,C)=>C===0?P:V0("op2","u32",[P,Y(C)],{op:"+"}),H=new Map,U=j.map(function(P,C){VY(H,P.items,V.element(z(G,C)));let D=[...P.items];for(let B=P.used;B<4;B+=1)D.push(V0("const","f32",[],{values:[0]}));return{kind:"store",buffer:V,index:z(q,C),value:D.length===1?D[0]:V0("construct","vec4f",D,{}),component:null}}),W=uZ(H,!0),M=u$(W);return{rewrite:W,rewriteScope:(P)=>P===null?null:M(P),stage:{scope:{stmts:U},count:X,workgroupSize:AP,buffer:V}}}function jY($,J){let Q=[];for(let Z of $){let X=H8[Z.type]??4,j=Q.find((V)=>V.used+X<=4);if(j)j.items.push(Z),j.used+=X;else if(Q.length<J)Q.push({items:[Z],used:X})}return Q}function VY($,J,Q){let Z=0;for(let X of J){let j=H8[X.type]??4;$.set(X,J.length===1&&Q.type===X.type?Q:V0("swizzle",X.type,[Q],{sw:kP.slice(Z,Z+j)})),Z+=j}}function uZ($,J){let Q=new Map($),Z=(X)=>!J&&X.meta.kind==="vertexStage"?X:void 0;return(X)=>r0(X,Q,Z,m$)}var RK=[{name:"color",type:"vec3f"},{name:"opacity",type:"f32"},{name:"emissive",type:"vec3f"},{name:"emissiveIntensity",type:"f32"},{name:"roughness",type:"f32"},{name:"metalness",type:"f32"},{name:"alphaTest",type:"f32"},{name:"toonSteps",type:"f32"},{name:"transmission",type:"f32"},{name:"clearcoat",type:"f32"},{name:"clearcoatRoughness",type:"f32"},{name:"sortLayer",type:"f32"}];function IP($,J){let Q=$.reduce((j,V)=>j+V.rows,0),Z=Math.floor((Q6-(J-Q*16))/16),X=Q>0?`this material's lists hold ${Q} rows and its other params leave room for ${Z}; shorten its lists to ${Z} rows in all`:`this material's params need ${J} bytes of uniforms and a material holds ${Q6}`;return new X0(X,{code:"uniform-block-over-limit"})}function OP($,J,Q,Z=[],X=0){let j={},V=[],Y=0;for(let U of RK){let W=gY(U.type);Y=Math.ceil(Y/W)*W,j[U.name]={offset:Y,size:X4(U.type)},V.push(`  ${U.name}: ${O0(U.type)},`),Y+=X4(U.type)}let K=0;while(Y<V4)V.push(`  _pad${K}: f32,`),K+=1,Y+=4;let G=new Map,q=[];for(let U of $){let W=gV(U);if(W!==void 0){Y=Math.ceil(Y/16)*16;for(let P of W.members)G.set(P.slot.id,Y+P.float*4),q.push(P.slot);V.push(`  ${J.name("uniform",U.id)}: array<vec4<f32>, ${W.vec4s}>,`),Y+=W.vec4s*16;continue}q.push(U);let M=hY(U);Y=Math.ceil(Y/M.align)*M.align,G.set(U.id,Y),V.push(`  ${J.name("uniform",U.id)}: ${M.wgsl},`),Y+=M.size}let z=[];for(let U of Z)Y=Math.ceil(Y/16)*16,z.push(Y),V.push(`  ${U}: vec4<f32>,`),Y+=16;if(X>0)Y=Math.ceil(Y/16)*16,j[t5]={offset:Y,size:X*16},V.push(`  ${t5}: array<vec4<f32>, ${X}>,`),Y+=X*16;let H=Math.max(V4,Math.ceil(Y/16)*16);if(H>Q6)throw IP($,H);return{structWgsl:`struct Material {
${V.join(`
`)}${Q?k9:""}
}`,layout:{byteSize:H,offsets:G,slots:q,staticFields:j},factsOffsets:z}}function iZ($){return $._measured===!0&&$.sampleType==="float"&&($.dimension===void 0||$.dimension==="2d-array")}var KY=0,r$=1,qJ=2;function L6($){let J=$.vertexLayout;if($.vertexPath!==void 0||J===void 0)return KY;if($.attributeSource==="storage"||$.vertexReader!==void 0)return r$;return Va(J);}function SK($){if($.encoding==="oct16")return"vec3f";if($.encoding==="srgb8")return"vec4f";return e5($.format)}function o4($){let J=$.vertexLayout;if($.vertexPath!==void 0||!J)return null;if($.vertexReader)return $.vertexReader.wgsl;let Q=$.instanceSlots==="vertex",Z=`  @location(${RZ}) lumeSlotAttr: u32,`,X=L6($);if(X===qJ){let V=[],Y=[],K=[];for(let G of J.attributes)V.push(`  @location(${G.shaderLocation}) ${G.name}: ${O0(e5(G.format))},`),Y.push(`  ${G.name}: ${O0(SK(G))},`),K.push(`  out.${G.name} = ${G.encoding?J5(G.encoding,`raw.${G.name}`):`raw.${G.name}`};`);return Wa(Q,V,Z,Y,K);}if(X!==r$){let V=[];for(let Y of J.attributes)V.push(`  @location(${Y.shaderLocation}) ${Y.name}: ${O0(e5(Y.format))},`);return Xa(Q,V,Z);}if(J.storageEncoding==="indexed-attributes"){let V=[];for(let Y of J.attributes)V.push({name:Y.name,width:RP(Y)});return MK(V)}return Ya(J);}function RP($){if($.encoding==="oct16")return 3;if($.encoding==="srgb8")return 4;if($.format==="float16x2")return 2;if($.format==="float16x4")return 4;return QK[uK($.format,$.name)]}function vK($,J){let Q=$.vertexPath;if(Q!==void 0)return Q.entryParams.join(", ");let Z=L6($),X=Z===r$,j=[];if(Z===qJ)j.push("lume_vin: VertexInRaw");else if(!X)j.push($.instanceSet||$.nativeModelMatrix===!0&&$.morph?"lume_vin: VertexIn":"in: VertexIn");if(X&&$.instanceSlots==="vertex")j.push(`@location(${RZ}) lumeSlotAttr: u32`);if(J.instanceIndex||$.instanceSet)j.push("@builtin(instance_index) instanceIndex: u32");if(J.vertexIndex||X)j.push("@builtin(vertex_index) vertexIndex: u32");return j.join(", ")}var SP="@group(3) @binding(1) var<storage, read> lumeVertexArena: array<f32>;",vP=`@group(3) @binding(${x5}) var<storage, read> lume_slots: array<u32>;`,N6="instances[lume_slot]",k6="instances[instanceIndex]";function wK($){if($.vertexPath!==void 0)return null;if($.skinned===!0&&$.skinnedPalette!=="rig")return $.modelMaterial===!0?"vec4<f32>(modelMaterial.flash.rgb, 0.0)":null;if($.instancing!=="matrix")return null;if($.nativeModelMatrix===!0)return`vec4<f32>(${k6}.flash.rgb, 0.0)`;return $.instanceSlots!==void 0?`${N6}.flash`:null}var bK=`  if (in.laneCoverage < 1.0 && fract(lume_screenDoor(in.position.xy) + ${WQ("in.laneCoverage")}) > ${R1("in.laneCoverage")}) { discard; }`,EK="  if (in.laneCoverage < 1.0 && lume_screenDoor(in.position.xy) > in.laneCoverage) { discard; }",qY=2,GY=($)=>(/VaryingsIo\{[^}]*/.exec(o8(C6($),-1))?.[0].match(/@location/g)?.length??0)-f$;function wP(){q8({code:"renderer-material-stage-overrun",key:"material-stage-overrun",message:"A material's varyings pass the GPU's stage interface even packed, so it draws without some of its look: give its shader fewer values that cross from the vertex to the pixel."})}var gK=($)=>[...$,{name:"lume_ink",type:"f32",location:$.length},{name:"lume_inkObject",type:"u32",location:$.length+1}],bP=`fn lume_doorCut(lume_doorWord: f32, lume_doorPixel: vec2<f32>) -> bool {
  var lume_doorHide: f32 = lume_doorWord;
  let lume_doorMag: f32 = abs(lume_doorWord);
  if (lume_doorMag > 1.0) { lume_doorHide = sign(lume_doorWord) * ${Q9("lume_doorMag")}; }
  let lume_doorNoise: f32 = lume_screenDoorStill(lume_doorPixel);
  return select(lume_doorNoise, 1.0 - lume_doorNoise, lume_doorHide < 0.0) < abs(lume_doorHide);
}`,_K="  if (in.laneHide != 0.0 && lume_doorCut(in.laneHide, in.position.xy)) { discard; }",GJ="  material = lume_materialBlocks[lume_block];",yK="  material = lume_materialBlocks[in.lumeBlock];",EP="mat4x4<f32>(1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0)",fK=($)=>$.skinned===!0&&$.skinnedPalette!=="rig"&&$.vertexPath===void 0,r4=`(${eQ} * vec4<f32>(localPos, 1.0)).xyz`,oZ=`lume_normalMatrix3(${eQ}) * skinnedNormal`,hK=`select(vec3<f32>(0.0), normalize(${oZ}) * length(in.normal), dot(${oZ}, ${oZ}) > 0.0)`,mK=`struct LumeShadowView {
  viewProj: mat4x4<f32>,
  cameraPosition: vec3<f32>,
  _pad0: f32,
}
@group(1) @binding(0) var<uniform> lume_shadowView: LumeShadowView;`;function uK($,J){if($==="float32"||$==="float32x2"||$==="float32x3"||$==="float32x4")return $;Za(J,$);}var gP={"2":2,"3":3,"4":4};function e5($){if($==="unorm10-10-10-2"||$==="unorm8x4-bgra")return"vec4f";let J=/^(uint|sint|unorm|snorm|float)(8|16|32)(?:x([234]))?$/.exec($);if(!J)_a($);let Q="f32";if(J[1]==="uint")Q="u32";if(J[1]==="sint")Q="i32";return _4(Q,J[3]===void 0?1:gP[J[3]])}function l$($,J){let Q=[];for(let Z of $)for(let X of Z[J])if(!Q.includes(X))Q.push(X);return Q}function x6($){let J=new Set,Q=[];for(let Z of $)for(let X of Z.modules){if(J.has(X.id))continue;J.add(X.id),Q.push(X)}return Q}var _P=[nZ,YY],yP=new Map;function fP($){return h$(yP,$,()=>Array.from($.source.matchAll(/\bfn\s+([A-Za-z_][A-Za-z0-9_]*)\s*\(/g),(Q)=>Q[1]))}var hP=($)=>$>=48&&$<=57||$>=65&&$<=90||$>=97&&$<=122||$===95;function mP($,J){let Q=`${J}(`;for(let Z=$.indexOf(Q);Z>=0;Z=$.indexOf(Q,Z+Q.length)){if(Z>0&&hP($.charCodeAt(Z-1)))continue;if(!/\bfn\s+$/.test($.slice(Math.max(0,Z-8),Z)))return!0}return!1}function A$($){let J=[...$],Q=J.join(`

`);for(let Z=!0;Z;){Z=!1;for(let X of _P){let j=fP(X);if(j.some((V)=>Q.includes(`fn ${V}(`))||!j.some((V)=>mP(Q,V)))continue;J.push(X.source.trim()),Q=`${Q}

${X.source}`,Z=!0}}return`${pQ(X9(J))}
`}function C8($,J,Q=null){if(!$)return null;let Z=new Set;for(let X of J)U$(X,Z);return Z.size===0?null:a9($,Z,Q??void 0)}function uP($,J,Q){if(!$)return null;let Z=(j)=>j.meta.kind==="vertexStage",X=new Set;for(let j of J)U$(j.node,X,new Map,Z);return a9($,X,void 0,Q)}function zJ($){let J=new Set,Q=[];for(let Z of $){if(!Z.fnDefs)continue;for(let X of Z.fnDefs.split(`

`)){if(!X.trim()||J.has(X))continue;J.add(X),Q.push(X)}}return Q.join(`

`)}var pP={color:["vec3f","vec4f"],emissive:["vec3f"],opacity:["f32"],viewOpacity:["f32"],viewColor:["vec3f","vec4f"],viewDepthPlane:["vec4f"],roughness:["f32"],metalness:["f32"],normal:["vec3f"],depth:["f32"],data:["vec4f"],attribute:["u32"],clearcoat:["f32"],clearcoatRoughness:["f32"],transmission:["f32"],ao:["f32"],lightMap:["vec3f"]};function o$($,J,Q){if(Q.includes(J.type))return J;{if((da=$a(J,Q,$))!==ca)return da}}function pK($,J,Q){let Z=$.map((X)=>X.node);if(J)Z.push(J);if(Q)Z.push(Q);return Z}function g5($,J){let Q=J.outputs.map(({name:Z,node:X})=>({name:Z,node:$.rewrite(X)}));return{position:J.position&&$.rewrite(J.position),caster:J.caster&&$.rewrite(J.caster),outputs:Q,fragmentScope:$.rewriteScope(J.fragmentScope,Q.map((Z)=>Z.node)),vertexScope:$.rewriteScope(J.vertexScope,null)}}function rZ($){return{roots:pK($.outputs,$.position,$.caster),scopes:[$.fragmentScope,$.vertexScope]}}var cK="casterPosition",lK="lume_framePosition";function cP($){return{...$,body:XX($.body,{out_position:lK,[`out_${cK}`]:"out_position"})}}function lP($,J,Q,Z){if($.depthNode&&$.viewDepthPlaneNode)throw new X0("material.depthNode cannot be set on a portal glass \u2014 the picture's depth is the engine's; leave depthNode unset on a material a portal wears",{code:"material-slot-value",slot:"depthNode"});let X=IV($),j=[{name:"color",node:$.colorNode},{name:"depth",node:$.depthNode},{name:"emissive",node:$.emissiveNode},{name:"opacity",node:$.opacityNode},{name:"viewOpacity",node:$.viewOpacityNode},{name:"viewColor",node:$.viewColorNode},{name:"viewDepthPlane",node:$.viewDepthPlaneNode},{name:"roughness",node:$.roughnessNode},{name:"metalness",node:$.metalnessNode},{name:"normal",node:$.normalNode},{name:"clearcoat",node:X.clearcoat},{name:"clearcoatRoughness",node:X.clearcoatRoughness},{name:"transmission",node:$.shadingModel==="physical"?AV($):null},{name:"ao",node:OV($)},{name:"lightMap",node:RV($)},{name:"data",node:$.dataNode},{name:"attribute",node:$.attributeNode?dP($.attributeNode):nP(Q)}],V=[];for(let K of j){if(!K.node)continue;V.push({name:K.name,node:o$(K.name,K.node,pP[K.name])})}for(let K of wV($,Z))V.push({name:K.name,node:o$(K.name,K.node,[LV[K.name]])});let Y=J.materialInputs??[];for(let K=0;K<Y.length;K+=1)V.push({name:`lightInput${K}`,node:Y[K]});return V}function dP($){return I9($.type)==="f32"?VJ(Z0($,"f32")):$}function nP($){for(let J of $.values())if(J.readName!==void 0)return yY(J.readName,"u32");return null}var UJ=jJ.filter(($)=>$!=="uv"),$J={cameraPosition:"lume_worldFromRender(frame.cameraPosition)",time:"frame.worldTime",deltaTime:"frame.deltaTime",screenSize:"frame.viewportSize",materialColor:"material.color",materialOpacity:"material.opacity"},a4={...$J,instanceIndex:"lume_index",deltaTime:"bitcast<f32>(lume_dispatch.z)",invocationLocalIndex:"lume_local",workgroupId:"lume_workgroup",localId:"lume_lid"},O9="lume_surfaceMap";function iP($,J){if(J===void 0)return $;let Q=`(${$} * vec2<f32>(${m(J.scale[0])}, ${m(J.scale[1])}))`,Z=m(Math.cos(J.rotation)),X=m(Math.sin(J.rotation)),j=m(-Math.sin(J.rotation));return`(${J.rotation===0?Q:`vec2<f32>(dot(${Q}, vec2<f32>(${Z}, ${X})), dot(${Q}, vec2<f32>(${j}, ${Z})))`} + vec2<f32>(${m(J.offset[0])}, ${m(J.offset[1])}))`}var oP={...$J,uv:"in.uv",uv1:"in.uv1",uv2:"in.uv2",uv3:"in.uv3",positionWorld:"lume_worldFromRender(in.positionRender)",positionRender:"in.positionRender",positionNear:"lume_positionNear",normalWorld:"normalize(in.normalWorld)",normalLocal:"in.normalLocal",positionLocal:"in.positionLocal",screenUV:"(in.position.xy / frame.viewportSize)",vertexColor:"in.color",frontFacing:"frontFacing"},s4="(frame.cameraPosition - lume_eyeAnchor())",B6=`lume_positionNear - ${s4}`,dK=u7(`${s4} - lume_positionNear`),zY=["  let lume_faceRaw: vec3<f32> = cross(dpdx(lume_positionNear), dpdy(lume_positionNear));","  let lume_faceLen: f32 = length(lume_faceRaw);",`  let lume_faceN: vec3<f32> = select(vec3<f32>(0.0), lume_faceRaw / lume_faceLen * select(-1.0, 1.0, dot(lume_faceRaw, ${dK}) >= 0.0) * select(-1.0, 1.0, frontFacing), lume_faceLen > 0.0);`,"  in.normalWorld = in.normalWorld + in.normalFace * lume_faceN;","  in.normalFace = 0.0;"].join(`
`),rP=/@fragment fn (\w+)\(in: Varyings((?:, (?:@builtin\(front_facing\) )?frontFacing: bool)?)\)((?: -> [^{]+)?) \{\n((?: {2}if \(lume_throughOccluded\(in\.position\)\) \{ discard; \}\n)?)/g,aP=/fn (\w+)\(in: Varyings, ((?:@builtin\(front_facing\) )?frontFacing: bool)\)((?: -> [^{]+)?) \{\n/g,sP=/\n {2}@location\(\d+\) positionRender: vec3<f32>,\n/,tP=new RegExp(`\\n {2}@location\\(\\d+\\) ${i9}: f32,\\n`);function M6($,J){let Q=sP.test($),Z=tP.test($);if(Q||Z){if($=$.replace(rP,function(X,j,V,Y,K){let G=[...K===""?[]:cb(K),`  var in: Varyings = ${Z?"lume_bandLensIn(lume_in)":"lume_in"};`],q=Z?"in":"lume_in";if(Q)G.push(`  lume_positionNear = ${q}.positionRender;`,`  in.positionRender = ${q}.positionRender + lume_eyeAnchor();`);if(Q&&J&&V!=="")G.push(zY);return`@fragment fn ${j}(lume_in: Varyings${V})${Y} {
${G.join(`
`)}
`}),Q)$=`${J?$.replace(aP,`fn $1(lume_in: Varyings, $2)$3 {
  var in: Varyings = lume_in;
${zY}
`):$}${/\bfn lume_eyeAnchor\(/.test($)?"":`${Y9}
`}var<private> lume_positionNear: vec3<f32>;
`}return o8($,f$)}var eP=/@fragment fn (\w+)\([\s\S]*?\n\}\n/g;function aZ($,J,Q){let Z=`
${J.join(`
`)}
`,X=new Set;return{text:Q?$.replace(eP,(j,V)=>j.includes(Z)&&X.add(V)?j.replace(Z,`
`)+j.replace(`fn ${V}(`,`fn ${V}Cut(`):j):$,named:(j)=>Q==="cut"&&X.has(j)?`${j}Cut`:j}}var $C=Object.keys(K9),HJ={uv:{attribute:"uv",wgsl:"vec2<f32>(0.0)",warns:!0},uv1:{attribute:"uv1",wgsl:"vec2<f32>(0.0)",warns:!0},uv2:{attribute:"uv2",wgsl:"vec2<f32>(0.0)",warns:!0},uv3:{attribute:"uv3",wgsl:"vec2<f32>(0.0)",warns:!0},vertexColor:{attribute:"color",wgsl:"vec4<f32>(1.0)",warns:!1}};function q6($,J){let Q=HJ[J];if(Q===void 0)db(J);return $.has(Q.attribute)?`in.${Q.attribute}`:Q.wgsl}function t4($,J){if($.vertexPath!==void 0)return!0;let Q=HJ[J]?.attribute??J;return $.vertexLayout?.attributes.some((Z)=>Z.name===Q)===!0}function Y6($,J,Q,Z){if(!t4($,Z))return{varying:!1,attribute:!1};return{varying:J.has(Z),attribute:J.has(Z)||Q.has(Z)}}function JC($,J){if($.vertexPath!==void 0)return;for(let Q of J){if(Q===null)continue;for(let Z of Q.inputsUsed){let X=HJ[Z];if(X?.warns===!0&&!t4($,Z))JK(X.attribute)}}}var QC={joints:"skinIndex",weights:"skinWeight"};function nK($){for(let[J,Q]of Object.entries(QC)){let Z=$[`attribute:${J}`];if(Z!==void 0&&$[`attribute:${Q}`]===void 0)$[`attribute:${Q}`]=Z}}function ZC($,J,Q,Z){if($){let V={...$J,instanceIndex:"0u",instanceSlot:"instanceIndex",vertexIndex:"vertexIndex",...$.inputs.positionLocal!==void 0?{positionGeometry:$.inputs.positionLocal}:{},...$.inputs};if(V.positionMorphed===void 0&&V.positionGeometry!==void 0)V.positionMorphed=V.positionGeometry;if(Q.modelMaterial)Object.assign(V,K9);return V}let X=EP;if(Q.instancing==="matrix")X="instanceModel";else if(Q.skinned)X=tQ;let j={...$J,positionLocal:"in.position",positionGeometry:"lume_positionGeometry",positionMorphed:"lume_positionMorphed",positionWorld:"basePositionWorld",positionRender:"basePositionRender",instanceIndex:J.has(s5)?"in."+s5:"0u",instanceSlot:Q.instanceSlots!==void 0?"lume_slot":"instanceIndex",modelMatrix:X,vertexIndex:"vertexIndex",vertexColor:q6(J,"vertexColor"),uv1:q6(J,"uv1"),uv2:q6(J,"uv2"),uv3:q6(J,"uv3"),normalWorld:"normalize(normalWorldV)"};if(J.has("normal"))j.normalLocal="in.normal";j.uv=q6(J,"uv");for(let[V,Y]of J)j[`attribute:${Y.readName??V}`]=`in.${V}`;if(nK(j),Q.instanceSet){for(let V of Q.instanceSet.fields)j[`attribute:${V.name}`]=xZ(V.name);j.instanceIndex="lume_setIndex"}if(Q.skinned){if(j.positionLocal=Z?r4:"localPos",J.has("normal"))j.normalLocal=Z?hK:"skinnedNormal"}if(Q.modelMaterial)Object.assign(j,K9);return j}function UY($,J){let Q,X;{if((da=eb(J))!==ca)return da;Q=ba[0];X=ba[1]}for(let[j,V]of Object.entries($))if(X.test(V))Q.add(j);return Q}function XC($,J,Q){let Z={};if($){for(let X of $.varyings)Z[X.input]=X.type;return Z}for(let[X,j]of J)Z[`attribute:${j.readName??X}`]=SK(j);if(nK(Z),Q.instanceSet)jb(Q,Z);return Z}var iK=($)=>$.toLowerCase().includes("normal");function jC($,J){let Q=[];if($.opacityNode)Q.push($.opacityNode);if($.colorNode?.type==="vec4f")Q.push($.colorNode);if(J)A0(J,Q);let Z=new Set;return Q.some((X)=>F$(X,Z,VC))}function VC($){let J=$.meta;if(J.kind==="input"||J.kind==="attribute")return iK(J.name);return J.kind==="wgslExpr"&&J.parts.some((Q)=>Q.includes("in."))}var YC=["color","pbr","roughness"],HY=function($){if($.startsWith("attribute:"))return $.slice(10);return $==="vertexColor"?"color":null};function KC($){if($.meta.kind!=="construct"||$.inputs.length<2)return $;let J=0;for(let Q of $.inputs){if(w5(Q.type))return $;if(J+=_Y(Q.type),J>3)return Q}return $}function qC($,J,Q,Z,X,j,V){let Y=J.vertexLayout;if(Y===void 0||!V)return[];if(J.skinned||J.skinnedModel||J.morph||J.instanceSet!==void 0||J.vertexReader!==void 0||J.vertexPositionProgram===!0||J.modelMaterial||(J.vertexBuffers?.length??1)>1)return[];let K=YC.filter((q)=>Y.attributes.some((z)=>z.name===q));if(K.length===0)return[];let G=new Set;for(let q of Q?.inputsUsed??[]){let z=HY(q);if(z!==null)G.add(z)}if(j){let q=`${Z.body}
${Z.fnDefs}
${X?.body??""}
${X?.fnDefs??""}`;if(/\b(for|while|loop)\b/.test(q))return[];let z=[];if($.opacityNode)z.push($.opacityNode);if($.colorNode?.type==="vec4f")z.push(KC($.colorNode));if(J.fragmentScope)A0(J.fragmentScope,z);let H=new Set,U=!1;for(let W of z)if(F$(W,H,function(M){let P=M.meta;if(P.kind==="wgslExpr"&&P.parts.some((D)=>D.includes("in.")))U=!0;let C=null;if(P.kind==="input")C=HY(P.name);else if(P.kind==="attribute")C=P.name;if(C!==null)G.add(C);return U}),U)return[]}return K.filter((q)=>!G.has(q))}function GC($,J,Q,Z,X,j){let V=Z.inputsUsed,Y=new Set;for(let C of[X,j])if(C)for(let D of C.inputsUsed)Y.add(D);let K=!0,G=Q||V.has("normalWorld"),q=G||Y.has("normalWorld"),z=J.vertexLayout?.attributes,H=J.instancing==="matrix"&&J.nativeModelMatrix!==!0||z?.some((C)=>C.name==="layer")===!0,U=J.vertexPath===void 0&&!q&&H&&z?.some((C)=>C.name==="normal")===!0,W=Q&&$.side!=="back",M=J.vertexPath===void 0&&!Y.has("normalWorld")&&!Y.has("normalLocal")&&!V.has("normalLocal")&&J.vertexLayout?.attributes.some((C)=>C.name==="layer")===!0,P=Q&&$.side==="double"&&J.vertexPath?.normalFacingKept!==void 0;return{positionWorld:K,portalClip:J.instanceSlots!==void 0||J.nativeModelMatrix===!0||J.skinned===!0&&J.modelMaterial===!0,normalWorld:G,normalFace:G&&M,flatWeld:M,uv:Y6(J,V,Y,"uv").varying,uvSets:{uv1:Y6(J,V,Y,"uv1"),uv2:Y6(J,V,Y,"uv2"),uv3:Y6(J,V,Y,"uv3")},color:Y6(J,V,Y,"vertexColor").varying,colorAttribute:Y6(J,V,Y,"vertexColor").attribute,normalLocal:V.has("normalLocal"),positionLocal:V.has("positionLocal"),positionWorldV:K||j?.inputsUsed.has("positionWorld")===!0,normalWorldV:q,slopeNormal:U,skinnedNormal:J.skinned===!0&&(q||U||V.has("normalLocal")||Y.has("normalLocal")),flipBackNormal:W,normalFacingKept:P,laneCoverage:J.vertexPath?.coverage!==void 0||J.bodyOpacity===!0,laneCoverageSeeded:J.bodyOpacity===!0,laneHide:J.doorWord===!0&&J.instancing==="matrix"&&J.instanceSlots!==void 0&&J.nativeModelMatrix!==!0,flash:wK(J)!==null,materialBlocks:J.materialBlocks!==void 0&&J.vertexPath===void 0&&J.instancing==="matrix"&&J.instanceSlots!==void 0&&J.nativeModelMatrix!==!0,bandLens:!1,lines:zX($,J),pathCut:J.vertexPath?.fragmentCut?.lines??[],instanceIndex:J.instancing==="matrix"||Y.has("instanceIndex")||Y.has("instanceSlot"),vertexIndex:Y.has("vertexIndex")||J.morph===!0}}var zC={uv1:{varying:!1,attribute:!1},uv2:{varying:!1,attribute:!1},uv3:{varying:!1,attribute:!1}};function UC($,J,Q){let Z=[];if(Q.uv)Z.push("uv","reads uv");for(let X of UJ)if(Q.uvSets[X].attribute)kb(Z,X);if($){lb(Q,Z);for(let X=0;X<Z.length;X+=2)if(!(Z[X]in $.inputs))ob(Z,X,$);return}if(Q.normalWorldV||Q.normalLocal)Z.push("normal","reads normals");for(let X=0;X<Z.length;X+=2){if(J.has(Z[X]))continue;let j=[...J.keys()].join(", ");throw Error(`lume: material ${Z[X+1]} but the vertex layout has no '${Z[X]}' attribute${j?` (the layout carries: ${j})`:""}`)}}function HC($,J){let Q=[];for(let X of $.varyings)if(J.inputsUsed.has(X.input))Q.push(X);let Z=e4($,J)?[...$.fragmentCut?.varyings??m9,...$.fragmentReads?.varyings??m9]:$.fragmentCut?.varyings??m9;for(let X of Z){let j=!1;for(let V of Q)if(V.name===X.name)j=!0;if(!j)Q.push(X)}return Q}var m9=[];function e4($,J){let Q=$?.fragmentReads;if(Q===void 0)return!1;for(let Z of Object.keys(Q.inputs))if(J.inputsUsed.has(Z))return!0;return!1}function f5($,J=m9,Q=[],Z=!1){let X=[],j=function(V,Y,K){X.push({name:V,type:Y,location:X.length,...K===!0?{flat:!0}:{}})};if($.positionWorld)j("positionRender","vec3f");if($.portalClip)j("portalClip","vec3f");if($.normalWorld)j("normalWorld","vec3f");if($.normalFace)j("normalFace","f32");if($.uv)j("uv","vec2f");for(let V of UJ)if($.uvSets[V].varying)j(V,"vec2f");if($.color)j("color","vec4f");if($.normalLocal)j("normalLocal","vec3f");if($.positionLocal)j("positionLocal","vec3f");if($.normalFacingKept)j("normalFacingKept","f32");if($.laneCoverage)j("laneCoverage","f32");if($.laneHide)j("laneHide","f32",!0);if($.flash)j("lumeFlash","vec4f",!0);if($.materialBlocks)j("lumeBlock","u32",!0);for(let V of J)j(V.name,V.type,V.flat);for(let V of Q)j(V.name,V.type,V.flat);if($.bandLens)j(i9,"f32");if(Z)j("motionCurrentClip","vec4f"),j("motionPreviousClip","vec4f");return X}var G6=1,q4=2,h5=4,z6=8,oK=16,T$=32,G4=64,rK=128,S9=256,m5=512,z4=1024,U6=2048,I0=4096,H$=8192,u5=16384,H6=32768,p5=65536,aK=131072,d$=262144,sK=524288,U4=1048576,v9=2097152,c5=4194304,tK=8388608,sZ="  let lume_positionMorphed: vec3<f32> = in.position;",WY="  let lume_morph = morph_sum(vertexIndex);",WC=C9(["record","set","binding","normalWorld","baseRender","positionBody","eye"],[[G6|z6,0,"  var in: VertexIn = lume_pullVertexIn(vertexIndex);"],[G6,z6,"  let in: VertexIn = lume_pullVertexIn(vertexIndex);"],[h5|z6,G6,"  var in: VertexIn = lume_decodeVertexIn(lume_vin);"],[h5,G6|z6,"  let in: VertexIn = lume_decodeVertexIn(lume_vin);"],[z6,G6|h5,"  var in: VertexIn = lume_vin;"],[oK,0,"  let lume_positionGeometry: vec3<f32> = in.position;"],[v9,I0|U6,sZ],[T$,0,"...$set"],[T$,0,`  in.position = ${uj};`],[T$|G4,0,`  in.normal = ${pj};`],[T$|rK,0,"  in.color = in.color * lume_instTint;"],[S9,T$|m5,"  let lume_slot: u32 = lume_slots[instanceIndex];"],[S9|m5|q4,T$,"  let lume_slot: u32 = lumeSlotAttr;"],[S9|m5,T$|q4,"  let lume_slot: u32 = in.lumeSlotAttr;"],[S9,T$,yj],[z4,0,"  let lume_block: u32 = u32($record.block.x);"],[z4,0,GJ],[U6,0,WY],[U6,0,"  in.position += lume_morph.position;"],[U6|G4,0,"  in.normal += lume_morph.normal;"],[v9|U6,I0,sZ],[I0|H$,0,WY],[I0|H$,0,"  let lume_bindPosition: vec3<f32> = in.position + lume_morph.position;"],[I0|H$|u5,0,"  let lume_bindNormal: vec3<f32> = in.normal + lume_morph.normal;"],[v9|I0|H$,0,"  let lume_positionMorphed: vec3<f32> = lume_bindPosition;"],[v9|I0,H$,sZ],[I0|H6,0,"  let lume_paletteBase: u32 = u32($record.lift.y)$eye;"],[I0|H6,0,"  let skinMat = lume_rigSkinMatrix(lume_paletteBase, in.joints, in.weights);"],[I0|c5,H6,aQ],[I0|c5,H6,B2],[I0,H6|c5,F2],[I0|H$,0,"  var localPos: vec3<f32> = (skinMat * vec4<f32>(lume_bindPosition, 1.0)).xyz;"],[I0,H$,"  var localPos: vec3<f32> = (skinMat * vec4<f32>(in.position, 1.0)).xyz;"],[I0|u5|H$,0,"  let skinnedNormal: vec3<f32> = lume_normalMatrix3(skinMat) * lume_bindNormal;"],[I0|u5,H$,"  let skinnedNormal: vec3<f32> = lume_normalMatrix3(skinMat) * in.normal;"],[0,I0,"  var localPos: vec3<f32> = in.position;"],[p5,0,"  let instanceModel: mat4x4<f32> = $record.model;"],[aK,0,"  $binding normalWorldV: vec3<f32> = $normalWorld;"],[tK,0,"  $binding lume_slopeNormal: vec3<f32> = $normalWorld;"],[d$|sK,0,`  let basePositionRender: vec3<f32> = $baseRender;
  let basePositionWorld: vec3<f32> = lume_worldFromRender(basePositionRender);`],[d$,0,"  let lume_authoredPos: vec3<f32> = localPos;"],[d$,0,"...$positionBody"],[d$|U4,0,`  localPos = (${tQ} * vec4<f32>(out_position, 1.0)).xyz;`],[d$,U4,"  localPos = out_position;"],[d$,0,"  let lume_seatOk: bool = all(abs(localPos) <= vec3<f32>(1e6));"],[d$,0,"  localPos = select(lume_authoredPos, localPos, lume_seatOk);"],[p5,0,"  $binding worldPos: vec4<f32> = instanceModel * vec4<f32>(localPos, 1.0);"],[0,p5,"  $binding worldPos: vec4<f32> = vec4<f32>(localPos, 1.0);"]]),n$=1,L$=2,eK=4,$q=8,H4=16,r=32,W4=64,l5=128,w9=256,F4=512,X$=1024,j$=2048,B4=4096,Jq=8192,Qq=16384,Zq=32768,Xq=65536,M4=131072,P4=262144,jq=524288,F8=1048576,Vq=2097152,C4=4194304,Yq=8388608,D4=16777216,N4=33554432,b9=67108864,Kq=268435456,qq=134217728,Gq=536870912,$X=($,J)=>`  let lume_bandWord: f32 = ${$};
  let lume_bandTakes: bool = ${J};
  vsOut.position.z = select(vsOut.position.z, lume_bandWord * vsOut.position.w, lume_bandTakes);`,FY=($)=>$X(r8($,0,"material.sortLayer"),"frame.sort2d > 0.5 && lume_clipOk"),zq=($)=>`bitcast<f32>(bitcast<i32>(${$}) - lume_bandStep)`,FC=()=>$X(zq(r8(c4("instanceModel[3].x","lume_rankZ"),0,"material.sortLayer")),"frame.sort2d > 0.5 && lume_clipOk"),JJ="(frame.view * vec4<f32>(normalWorldV, 0.0)).z < 0.0",tZ=($)=>`  let lume_rankZ: f32 = ${XK("instanceModel[3].xyz","positionRenderV",$)};`,eZ="instanceModel[3].y + frame.renderOrigin.y",BC=()=>$X(zq(`select(${r8(c4("instanceModel[3].x","lume_rankZ"),0,"material.sortLayer")}, ${VK(eZ,"material.sortLayer")}, $record.block.z > 0.5 && ${YK(eZ)})`),`frame.sort2d > 0.5 && lume_clipOk && !($record.block.z > 0.5 && ${KK(eZ,"material.sortLayer")})`),Uq=($,J)=>[`  let lume_bandS: f32 = ${mQ("vsOut.position",J)};`,`  vsOut.position = select(vsOut.position, vec4<f32>(vsOut.position.xy * lume_bandS, ${$}, 1.0), lume_bandS != 1.0);`,"  vsOut = lume_bandLensOut(vsOut, lume_bandS);"],k4=($,J)=>`  vsOut.position = select(vec4<f32>(0.0, 0.0, 2.0, 1.0), ${$}, lume_clipOk${J});`,Hq=($)=>`  vsOut.motionPreviousClip = select(vsOut.motionCurrentClip, frame.prevViewProj * vec4<f32>(previousWorldPos.xyz, 1.0), ${$});`,Wq=function($,J,Q){let Z=`all(abs(${$}) < vec4<f32>(1e9));`,X="all(abs(worldPos.xyz) <= vec3<f32>(1e6)) && ";return[[0,J|Q,`  let lume_clipOk: bool = ${Z}`],[J,Q,`  let lume_clipOk: bool = lume_seatOk && ${Z}`],[Q,J,`  let lume_clipOk: bool = all(abs(worldPos.xyz) <= vec3<f32>(1e6)) && ${Z}`],[Q|J,0,`  let lume_clipOk: bool = lume_seatOk && all(abs(worldPos.xyz) <= vec3<f32>(1e6)) && ${Z}`]]},JX=($,J=null)=>$===null?"  let lume_clipNudged: vec4<f32> = lume_clipRaw;":`  let lume_clipNudged: vec4<f32> = vec4<f32>(lume_clipRaw.xy, ${bY("lume_clipRaw",wY($,J))}, lume_clipRaw.w);`,QX="u32(round(abs(in.layer + 0.5) - 0.5))",Fq=($,J)=>$?.includes(QX)===!0?{normal:"lume_planeNormal",lines:[`  let lume_planeNormal: vec3<f32> = select(${J}, vec3<f32>(0.0), fract(abs(in.layer)) > 0.125);`]}:{normal:J,lines:[]},MC=function($){let J=Fq($,"normalWorldV"),Q=J.lines.length===0?[]:[`  let lume_turnNormal: vec3<f32> = select(normalWorldV, ${J.normal}, ${$} != 0.0);`];return[...J.lines,...Q,`  let lume_layerFaced: f32 = ${vY($??"0.0",Q.length===0?"normalWorldV":"lume_turnNormal","positionRenderV")};`,...E4("lume_layerSlope","lume_layerFaced",J.normal,"positionRenderV"),JX("lume_layerFaced","lume_layerSlope")]},$4=`f32(${QX} % ${p4}u)`,BY=`(${QX} / ${p4}u)`,PC=function(){let $=(J,Q)=>`  ${jK(J,"instanceModel",Q)}`;return[[X$|b9|L$,r|j$,$(BY,JJ)],[X$|b9,r|j$|L$,$(BY,"false")],[X$|L$,r|j$|b9,$("0u",JJ)],[X$,r|j$|L$|b9,$("0u","false")]]},ZX=[null,$4,`${k6}.lift.x`,`(${k6}.lift.x + ${$4})`,`${N6}.lift.x`,`(${N6}.lift.x + ${$4})`],Bq=ZX.map(($)=>JX($)),CC=ZX.map(MC),DC=ZX.map(function($){if(!$)return Bq[0];let J=Fq($,"lume_slopeNormal");return[...J.lines,...E4("lume_layerSlope",$,J.normal,"positionRenderV"),JX($,"lume_layerSlope")]}),NC=($,J)=>J&&($.normalWorldV?CC:$.slopeNormal&&DC)||Bq,Mq=($)=>O1(`${$}.lift.z`,"frame.bodyOpacity"),kC=Mq(k6),xC=Mq(N6),TC=HQ(`${k6}.lift.z`),LC=HQ(`${N6}.lift.z`),Pq="material.emissive * material.emissiveIntensity",AC=BZ("vsOut.position",Pq,"$emitterDir")[0],IC=[...BZ("vsOut.position",Pq,"$emitterDir"),"  vsOut.position = lume_clipOut;"].map(($)=>[Vq,r,$]),Cq="  let positionRenderV: vec3<f32> = worldPos.xyz;",Dq="  let positionWorldV: vec3<f32> = lume_worldFromRender(worldPos.xyz);",Nq="  vsOut.motionCurrentClip = frame.viewProj * vec4<f32>(worldPos.xyz, 1.0);",kq="  vsOut.positionRender = positionRenderV - lume_eyeAnchor();",xq="  vsOut.normalWorld = normalWorldV;",Tq="  vsOut.normalLocal = $normalLocal;",Lq="  vsOut.positionLocal = $positionLocal;",Aq="  return lume_outlineMaskAt(in.position);",Iq="@group(1) @binding(1) var<uniform> lume_dispatch: vec4<u32>;",OC=()=>C9(["portalWorld","clipRecord","bodyCover","record","casterHeld","varyingBody","varyingOuts","nudged","uvSets","normalLocal","positionLocal","emitterDir","tail","flashWord"],[[n$,0,"  let portalClipWorld: vec4<f32> = $portalWorld;"],[n$,0,"  let portalClipV: vec3<f32> = vec3<f32>(dot($clipRecord.clipPlane, portalClipWorld), dot($clipRecord.clipPlane2, portalClipWorld), select(0.0, 1.0, any($clipRecord.clipPlane != vec4<f32>(0.0))));"],[n$,0,"  if (frame.guest != 0.0) {"],[n$,0,"    worldPos = frame.guestMap * worldPos;"],[n$|L$,0,"    normalWorldV = (frame.guestMap * vec4<f32>(normalWorldV, 0.0)).xyz;"],[n$|Kq,0,"    lume_slopeNormal = (frame.guestMap * vec4<f32>(lume_slopeNormal, 0.0)).xyz;"],[n$,0,"  }"],[0,0,Cq],[eK,0,Dq],[0,0,"  var vsOut: Varyings;"],[$q,0,"  vsOut.lumeBlock = lume_block;"],[H4|r,0,"  vsOut.portalClip = vec3<f32>(0.0);"],[H4,r,"  vsOut.portalClip = portalClipV;"],[W4|r,0,"  vsOut.laneCoverage = 1.0;"],[W4,r,"  vsOut.laneCoverage = $bodyCover;"],[l5|r,0,"  vsOut.laneHide = 0.0;"],[l5,r|D4,"  vsOut.laneHide = $record.lift.w;"],[l5|D4,r,"  vsOut.laneHide = select($record.lift.w, lume_setDoor, lume_setDoor != 0.0);"],[Gq,r,"  vsOut.lumeFlash = $flashWord;"],[w9,0,"  {"],[w9,0,"...$varyingBody"],[w9,0,"...$varyingOuts"],[w9,0,"  }"],[0,r,`  let lume_clipRaw: vec4<f32> = ${d0("vec4<f32>(positionRenderV, 1.0)")};`],[r,0,"  let lume_clipRaw: vec4<f32> = lume_shadowView.viewProj * vec4<f32>(positionRenderV, 1.0);"],...Wq("lume_clipRaw",Yq,r),[r,N4,k4("lume_clipRaw","")],[r|N4,0,k4("lume_clipRaw"," && !$casterHeld")],[0,r,"...$nudged"],[0,r,`  vsOut.position = select(${b4}, lume_clipNudged, lume_clipOk);`],[F4,r,`  let lume_bandAnchor: vec3<f32> = ${K5};`],[F4,r,FY(V9("lume_bandAnchor","positionRenderV"))],[X$|j$,r,FY(V9("instanceModel[3].xyz","positionRenderV"))],[X$|L$,r|j$|F8,tZ({normal:"normalWorldV",looksAway:JJ})],[X$|L$|F8,r|j$,tZ({normal:"normalWorldV",looksAway:`${JJ} || in.layer < 0.0`})],[X$,r|j$|L$,tZ(null)],...PC(),[X$,r|j$|C4,FC()],[X$|C4,r|j$,BC()],...IC,[B4,0,Nq],[B4,0,Hq("motionShown")],[Jq,0,kq],[F8,0,"  let lume_faceV: bool = in.layer < 0.0;"],[F8,0,"  vsOut.normalWorld = select(normalWorldV, vec3<f32>(0.0), lume_faceV);"],[F8,0,"  vsOut.normalFace = select(0.0, length(normalWorldV), lume_faceV);"],[Qq,F8,xq],[Zq,0,"  vsOut.uv = in.uv;"],[0,0,"...$uvSets"],[Xq,0,"  vsOut.color = in.color;"],[M4|P4,0,Tq],[M4,P4,"  vsOut.normalLocal = in.normal;"],[jq,0,Lq],[0,0,"...$tail"],...Uq("lume_bandWord","lume_bandTakes").map(($)=>[qq,r,$]),[0,0,"  return vsOut;"]]),RC=P8(OC),x=($,J)=>$?J:0;function SC($,J,Q){let Z=new Set;for(let X of $.fields){let j=`attribute:${X.name}`;if(J?.inputsUsed.has(j)||Q?.inputsUsed.has(j))Z.add(X.name)}return Z}function u9($,J,Q,Z,X,j="frame",V=!1,Y=[]){let K=$.instancing==="matrix",G=$.skinned===!0,q=G&&$.skinnedPalette==="rig",z=$.nativeModelMatrix===!0,H=$.instanceSlots!==void 0,U=H?N6:k6,W=j==="shadow",M=J.portalClip&&!W&&!V,P=$.instanceSet,C=z&&$.morph===!0,D=L6($),B=fK($),N=G&&!q&&$.modelMaterial===!0&&$.vertexPath===void 0&&j==="frame"&&!V,T=!1,L=!1,k=!1;for(let d of $.vertexLayout?.attributes??[])if(d.name==="normal")T=!0;else if(d.name==="color")L=!0;else if(d.name==="layer")k=!0;let R=x(D===r$||V,G6)|x(D===r$,q4)|x(D===qJ,h5)|x(P!==void 0||C,z6)|x(Z?.inputsUsed.has("positionGeometry")===!0||X?.inputsUsed.has("positionGeometry")===!0,oK)|x(P!==void 0,T$)|x(T,G4)|x(L,rK)|x(H,S9)|x($.instanceSlots==="vertex",m5)|x(J.materialBlocks&&!V,z4)|x(C,U6)|x(G,I0)|x($.morph===!0,H$)|x(J.skinnedNormal,u5)|x(q,H6)|x(K,p5)|x(J.normalWorldV,aK)|x(J.slopeNormal&&!W&&!V,tK)|x(Z!==null,d$)|x(Z?.inputsUsed.has("positionWorld")===!0||Z?.inputsUsed.has("positionRender")===!0,sK)|x(B,U4)|x(Z?.inputsUsed.has("positionMorphed")===!0||X?.inputsUsed.has("positionMorphed")===!0,v9)|x(N,c5),w=P===void 0?null:[...fj(P,"lume_slots",V?null:kZ),...hj(P,SC(P,Z,X)),...mj(P)],p=G?"skinnedNormal":"in.normal",f=G?q:K,a="in.position";if(G&&q)a=`(${U}.model * vec4<f32>(localPos, 1.0)).xyz`;else if(G)a="localPos";else if(K)a=`(${U}.model * vec4<f32>(in.position, 1.0)).xyz`;let l=[];D9(WC,R,[U,w,M?"var":"let",f?`lume_normalMatrix3(instanceModel) * ${p}`:p,a,Z?.body,j==="frame"&&!V?` + select(0u, u32(lume_rigPalettes[u32(${U}.lift.y) - 1u][0].x), frame.eyeParts < 0.5)`:""],l);let U0=$.motion===!0&&!W;if(U0&&!V){let d=l.length;l.push("  var previousWorldPos: vec4<f32>;","  {");for(let y=0;y<d;y+=1){let n=l[y];if(n===GJ||n===aQ||n.startsWith("  let lume_block: u32"))continue;l.push(mq(n.replace("frame.eyeParts","1.0").replaceAll("instances[","previousInstances[").replaceAll("jointMatrices[","previousJointMatrices[").replaceAll("lume_headSkin(","lume_previousHeadSkin(").replaceAll("lume_rigSkinMatrix(","lume_previousRigSkinMatrix(").replaceAll("morph_sum(","previous_morph_sum(")))}l.push("    previousWorldPos = worldPos;","  }");let b="true";if(K)b=`${U.replaceAll("instances[","previousInstances[")}.${z?"model[3].w":"lift.w"} > 0.5`;else if(G)b=`${sQ("previousJointMatrices",0)}.w > 0.5`;l.push(`  let motionShown = ${b};`)}if(V)return l.push("  return worldPos.xyz;"),l;let y0=X?Q.map((d)=>`    vsOut.${d.name} = out_${d.name};`):null,g0=[];for(let d of UJ)if(J.uvSets[d].varying)g0.push(`  vsOut.${d} = in.${d};`);let G0=K&&!z,H0="frame.bodyOpacity",_0=k?1:0;if(G0)H0=H?xC:kC,_0+=H?4:2;let O=$.sortBand2d===!0,S=$.sortBandRelief===!0,g=G&&!q,E=null;if(K)E="instanceModel[3].xyz";else if(G&&q)E=`${U}.model[3].xyz`;else if(G)E=K5;if(E!==null&&M)E=`select(${E}, (frame.guestMap * vec4<f32>(${E}, 1.0)).xyz, frame.guest != 0.0)`;let h=J.normalWorldV?"normalWorldV":E&&`positionRenderV - ${E}`;if(J.lines||d4($.lighting))h=null;let J0=x(M,n$)|x(J.normalWorldV,L$)|x(J.slopeNormal&&!W,Kq)|x(J.positionWorldV,eK)|x(J.materialBlocks,$q)|x(J.portalClip,H4)|x(W,r)|x($.bodyOpacity===!0&&J.laneCoverage,W4)|x(J.laneHide,l5)|x(J.flash,Gq)|x(X!==null,w9)|x(O&&S&&!K&&G,F4)|x(O&&K,X$)|x(O&&K&&H&&!S,C4)|x(S,j$)|x(U0,B4)|x(J.positionWorld,Jq)|x(J.normalWorld,Qq)|x(J.normalFace,F8)|x(J.uv,Zq)|x(J.color,Xq)|x(J.normalLocal,M4)|x(G,P4)|x(J.positionLocal,jq)|x(h!==null,Vq)|x(Z!==null,Yq)|x(P!==void 0,D4)|x(G0,N4)|x(k,b9)|x(J.bandLens&&!W&&O&&(K||S&&G),qq);return D9(RC(),J0,[z||g?"worldPos":"vec4<f32>(worldPos.xyz + frame.renderOrigin, 1.0)",g?"modelMaterial":U,H0,U,H?LC:TC,X?.body,y0,NC(J,Z===null)[_0],g0,B?hK:"skinnedNormal",B?r4:"localPos",h,Y,wK($)],l),l}var Oq=1,Rq=2,E9=4,d5=8,Sq=16,vq=32,wq=64,bq=128,Eq=256,gq=512,_q=1024,yq=2048,g9=4096,fq=8192,hq=16384,vC=[`  let clipPos: vec4<f32> = ${d0("vec4<f32>(positionRenderV, 1.0)")};`],wC=["  let clipPos: vec4<f32> = lume_shadowView.viewProj * vec4<f32>(positionRenderV, 1.0);"],bC=["  let previousWorldPos: vec4<f32> = worldPos;"],EC=C9(["normalWorld","varyingBody","varyingOuts","clip","previous","uv","uvSets","color","normalLocal","positionLocal","facing","coverage","pathOuts","lens"],[[0,0,Cq],[Oq,0,Dq],[Rq,0,"  let normalWorldV: vec3<f32> = $normalWorld;"],[0,0,"  var vsOut: Varyings;"],[E9,0,"  {"],[E9,0,"...$varyingBody"],[E9,0,"...$varyingOuts"],[E9,0,"  }"],[0,0,"...$clip"],...Wq("clipPos",fq,g9),[0,g9,`  vsOut.position = select(${b4}, clipPos, lume_clipOk);`],[g9,0,k4("clipPos","")],[d5,0,"...$previous"],[d5,0,Nq],[d5,0,Hq("previousWorldPos.w != 0.0")],[Sq,0,kq],[vq,0,xq],[wq,0,"  vsOut.uv = $uv;"],[0,0,"...$uvSets"],[bq,0,"  vsOut.color = $color;"],[Eq,0,Tq],[gq,0,Lq],[_q,0,"  vsOut.normalFacingKept = $facing;"],[yq,0,"  vsOut.laneCoverage = $coverage;"],[0,0,"...$pathOuts"],[hq,g9,"...$lens"],[0,0,"  return vsOut;"]]);function gC($){if($.vertexPath!==void 0)return $.vertexPath.band!==void 0;return $.sortBand2d===!0&&($.instancing==="matrix"||$.sortBandRelief===!0&&$.skinned===!0)}function W8($,J){let Q=$.inputs[J];if(Q===void 0)pb($,J);return Q}function mq($){return $.replaceAll("frame.worldTime","frame.prevWorldTime").replaceAll("frame.time","frame.prevTime").replaceAll("lighting_windTravel()","frame.prevWindTravel").replaceAll("frame.windTravel","frame.prevWindTravel")}function XX($,J){let Q=$;for(let[Z,X]of Object.entries(J))Q=Q.replace(new RegExp(`\\b${Z}\\b`,"g"),X);return Q}function _C($,J,Q=!1){let Z,X,j,V;{qb($,Q);Z=ba[0];X=ba[1];j=ba[2];V=ba[3]}for(let Y of X){if(j!==void 0&&Z!==void 0&&Y===j.marker){rb(J,Q,V,Z,j);continue}if(Y!==Z?.marker){V.push(Y);continue}sb(J,V,Z);}return V}function MY($,J,Q,Z,X,j,V,Y,K=!1){let G=_C($,Z,K),q=J.normalWorldV?W8($,"normalWorld"):null,z=X?Q.map((L)=>`    vsOut.${L.name} = out_${L.name};`):null,H=J.uv?W8($,"uv"):null,U=[];for(let L of UJ)if(J.uvSets[L].varying)U.push(`  vsOut.${L} = ${W8($,L)};`);let W=J.color?W8($,"vertexColor"):null,M=J.normalLocal?W8($,"normalLocal"):null,P=J.positionLocal?W8($,"positionLocal"):null,C=$.coverage??"1.0",D=[];for(let L of j)D.push(`  vsOut.${L.name} = ${W8($,L.input)};`);let B=x(J.positionWorldV,Oq)|x(J.normalWorldV,Rq)|x(X!==null,E9)|x(Y,d5)|x(J.positionWorld,Sq)|x(J.normalWorld,vq)|x(J.uv,wq)|x(J.color,bq)|x(J.normalLocal,Eq)|x(J.positionLocal,gq)|x(J.normalFacingKept,_q)|x(J.laneCoverage,yq)|x(K,g9)|x(Z!==null&&$.localPositionSlot!==void 0,fq)|x(J.bandLens&&!K&&$.band!==void 0,hq),N=K?wC:$.clipWgsl??vC,T=$.band===void 0?null:Uq($.band.word,`(${$.band.takes}) && lume_clipOk`);return D9(EC,B,[q,X?.body,z,N,$.previousPositionWgsl??bC,H,U,W,M,P,$.normalFacingKept??"0.0",V?"("+C+") * frame.bodyOpacity":C,D,T],G),G}var uq=1,pq=2,cq=4,x4=8,T4=16,lq=32,n5=64,i$=128,L4=256,A4=512,B8=1024,M8=2048,I4=4096,dq=8192,K0=16384,W$=32768,T6=65536,WJ=131072,nq=262144,p9=524288,i5=1048576,iq=2097152,oq=4194304,rq=8388608,W6=16777216,o5=33554432,aq=67108864,sq=134217728,_9=268435456,F6=536870912,tq=1073741824,QJ=-2147483648,yC=K0|T6|WJ;function O4($){return $.instanceSlots!==void 0&&($.instanceSet===void 0||$.instanceSet.fields.length===0)&&$.vertexPath===void 0&&$.nativeModelMatrix!==!0&&$.skinned!==!0}var eq="  if (alpha < material.alphaTest) { discard; }",fC=`  if (alpha < material.alphaTest && !${dZ}) { discard; }`,$G="  if (lume_cut.x + 0.5 * (abs(lume_cut.y) + abs(lume_cut.z)) < 0.0) { discard; }",hC=["  let lume_cut = vec4<f32>(alpha - material.alphaTest, dpdxFine(alpha), dpdyFine(alpha), 0.0);",$G,"  alpha = smoothstep(material.alphaTest, material.alphaTest + max(abs(lume_cut.y) + abs(lume_cut.z), 1e-5), alpha);"],mC=`  if (lume_cut.x + 0.5 * (abs(lume_cut.y) + abs(lume_cut.z)) < 0.0 && !${dZ}) { discard; }`,uC="  let lume_cut = vec4<f32>(alpha, dpdxFine(alpha), dpdyFine(alpha), 1.0);",pC=new Map([[eq,fC],[$G,mC]]),cC=K0|T6|WJ,ZJ="lume_coverageMask(in.position.xy, lume_cut)",JG=`struct LumeCoveredDepthOut {
  @location(0) color: vec4<f32>,
  @builtin(sample_mask) mask: u32,
}`,lC=`struct PictureDepthCoveredOut {
  @location(0) color: vec4<f32>,
  @builtin(frag_depth) depth: f32,
  @builtin(sample_mask) mask: u32,
}`;function dC($,J){if($===null)return J?tb():"vec4<f32>(0.0)";return vb(J,$);}function QG($,J){if(J)return xb($);return $?"PictureDepthOut":"@location(0) vec4<f32>"}function nC($,J){return $.alphaToCoverage===!0&&J.pass.samples>1&&g4()}function PY($,J,Q){let Z=J?zb($):$;if(Q)return Ab(Z);return`  return ${Z};`}var ZG=QV("in.positionRender",{distances:"in.portalClip"});function iC($){return p1({count:$.planes.length,intersection:$.intersection},(J)=>`material.${t5}[${J}]`,"(in.positionRender + frame.renderOrigin)")}var oC=`shade_applyFog(litColor + emissiveColor, fogViewZ, ${B6})`,rC=C9(["pathCut","lets","body","albedo","alphaBinding","alpha","emissive","nBinding","normal","roughness","metalness","litColor","finalBinding","blendColor","viewOpacity","colorReturn","depth","surfaceReturn","outAlpha","cellRead","coverOpacity","surfacePoint","foggedColor","waterOver","coverWater","alphaCut","depthReturn","coverCut","materialClip","premultiply","specular","shadedAlbedo"],[[K0|sq,W$,`  ${Ij}`],[uq,0,yK],[QJ,0,`  if (${NK}) {`],[pq,p9,ZG],[x4|T4,0,bK],[x4,T4,EK],[lq,p9,_K],[QJ,0,"  }"],[0,0,"...$materialClip"],[0,0,"...$pathCut"],[0,0,"...$lets"],[0,0,"...$body"],[W6,0,"  let albedo: vec3<f32> = $shadedAlbedo;"],[0,0,"  $alphaBinding alpha: f32 = $alpha;"],[cq,0,"  alpha = alpha * out_color.a;"],[n5,0,"...$alphaCut"],[0,n5,"...$coverCut"],[p9|tq,n5,"  if (alpha <= 0.0) { discard; }"],[K0|aq,W$,`  ${Oj}`],[W$,0,kQ],[W$,0,TQ("lume_positionNear",s4)],[W6,_9,"  let emissiveColor: vec3<f32> = $emissive;"],[W6|_9,0,"  let lume_emissive: vec3<f32> = $emissive;"],...wj("in.positionRender","lume_emissive").map(($)=>[W6|_9,0,$]),[W6|_9,0,"  let emissiveColor: vec3<f32> = lume_emissive * lume_emitterScale;"],[o5,0,"  $nBinding N: vec3<f32> = $normal;"],[o5|L4|A4,0,"  N = select(-N, N, frontFacing || in.normalFacingKept > 0.5);"],[o5|L4,A4,"  N = select(-N, N, frontFacing);"],[K0|i$,0,`  let V: vec3<f32> = ${dK};`],[K0|i$,0,"  let P: vec3<f32> = in.positionRender;"],[K0|i$,0,"  let roughness: f32 = $roughness;"],[K0|i$,0,"  let metalness: f32 = $metalness;"],[K0|i$,0,"...$cellRead"],[K0|i$,0,"...$specular"],[K0,0,"  let litColor: vec3<f32> = $litColor;"],[K0,0,"  let fogViewZ: f32 = -(frame.view * vec4<f32>(in.positionRender, 1.0)).z;"],[K0|B8,0,"  $finalBinding finalColor: vec4<f32> = vec4<f32>($foggedColor, $outAlpha);"],[K0|M8,B8,`  let viewKeep = 1.0 - shade_viewFogFactor(fogViewZ, ${B6});`],[K0|M8,B8,"  $finalBinding finalColor: vec4<f32> = vec4<f32>($blendColor, $outAlpha * viewKeep);"],[K0,B8|M8,`  $finalBinding finalColor: vec4<f32> = vec4<f32>(shade_applyViewFog(litColor + emissiveColor, fogViewZ, ${B6}), $outAlpha);`],[K0|I4,0,"...$viewOpacity"],[K0|M8,W$,"...$waterOver"],[K0|M8,W$,"...$premultiply"],[K0,W$,"...$colorReturn"],[W$,0,xQ("vec4<f32>(finalColor.rgb, finalColor.a * eyes.strength * eyesEdge)")],[WJ,0,"  return $depthReturn;"],[nq,0,`  ${WZ}`],[F6|B8,0,"  var lume_cover: f32 = $outAlpha;"],[F6,B8,`  var lume_cover: f32 = $outAlpha * (1.0 - shade_viewFogFactor(-(frame.view * vec4<f32>(in.positionRender, 1.0)).z, ${B6}));`],[F6|I4,0,"...$coverOpacity"],[F6|M8,0,"...$coverWater"],[F6,0,`  ${Lj("lume_cover")}`],[i5,0,"  let lume_inkViewZ: f32 = -(frame.view * vec4<f32>(in.positionRender, 1.0)).z;"],[i5,0,`  let lume_inkFinal: vec3<f32> = ink_color($albedo, lume_inkRecord.xyz, lume_inkViewZ, ${B6});`],[i5,0,"  return InkFieldOut(vec4<f32>(lume_inkFinal, 1.0), ink_word(in.lume_inkObject, in.lume_ink));"],[iq,0,Aq],[oq,0,rQ],[rq,0,NQ],[T6,0,"  lume_surfacePoint = $surfacePoint;"],[T6,0,"...$surfaceReturn"]]),R4=["  let lume_waterT: vec3<f32> = shade_waterOver(in.positionRender, frame.cameraPosition);","  let lume_waterLum: f32 = dot(lume_waterT, vec3<f32>(0.2126, 0.7152, 0.0722));","  finalColor = vec4<f32>(select(finalColor.rgb * (lume_waterT / max(lume_waterLum, 1e-4)), finalColor.rgb, all(lume_waterT == vec3<f32>(1.0))), finalColor.a * lume_waterLum);"],aC="  finalColor = vec4<f32>(finalColor.rgb * finalColor.a, finalColor.a);",sC="  lume_cover = lume_cover * dot(shade_waterOver(in.positionRender, frame.cameraPosition), vec3<f32>(0.2126, 0.7152, 0.0722));";function tC($,J,Q){let Z=`lume_seeThroughLight(in.position, albedo) + lume_seeThroughGlow(emissiveColor, ${J}, ${Q})`;if(!$)return[`  return vec4<f32>(${Z}, alpha);`];return[`  let lume_seeThroughRgb: vec3<f32> = ${Z};`,R4[0],R4[1],"  return vec4<f32>(select(lume_seeThroughRgb * (lume_waterT / max(lume_waterLum, 1e-4)), lume_seeThroughRgb, all(lume_waterT == vec3<f32>(1.0))), alpha * lume_waterLum);"]}var eC=1,$D=2,JD=16,QD=17,ZD=25,XD=26,jD=27,VD=28,YD=29,KD=30,qD=31;function J4($,J,Q,Z){let X=(J&(K0|T6))!==0,j=((J&yC)!==0?$.flags:$.flags&~QJ)|J|(X?W6:0)|(X&&($.flags&i$)!==0?o5:0);$.slots[eC]=Q,$.slots[$D]=Z===""?null:Z;let V=$.coverage&&(J&cC)!==0&&(J&W$)===0;$.slots[ZD]=V?hC:eq,$.slots[jD]=V?uC:null;let Y=$.slots[JD];$.slots[XD]=dC(($.flags&dq)!==0&&typeof Y==="string"?Y:null,V),$.slots[VD]=$.clip!==null&&((J&p9)===0||$.clip.shadows)?$.clip.line:null;let K=[];return D9(rC,j,$.slots,K),K}var XG=($)=>`normalize(vec3<f32>(dot(frame.view[0].xyz, ${$}), dot(frame.view[1].xyz, ${$}), dot(frame.view[2].xyz, ${$})))`,GD=XG("out_normal"),CY=($,J)=>J.flipBackNormal?`select(-${$}, ${$}, frontFacing${J.normalFacingKept?" || in.normalFacingKept > 0.5":""})`:$;function zD($,J,Q){let Z=$.normalNode;if(!Z)return"normalize(in.normalWorld)";let X=J?.fragmentReads?.normal;if(X!==void 0&&Z.meta.kind==="input"&&Z.meta.name===X.input&&e4(J,Q))return X.world;return GD}function UD($){let J=[];for(let Q of $){let Z=Q.node.meta;J.push(`  let ${Q.name}: ${O0(Q.type)} = ${Z.kind==="input"&&Z.name==="normalWorld"?`normalize(in.${Q.name})`:`in.${Q.name}`};`)}return J}var HD=`${a7}
${r7}
lume_inkRecord lume_ink lume_inkObject lume_inkViewZ lume_inkFinal`;function jX($,J,Q){let Z=[$,YX,_$];if(Q)Z.push(c7);if(J.laneCoverage||J.laneHide)Z.push(j5);if(J.laneHide)Z.push(bP);return Z}function WD($,J,Q,Z){let{material:X,opts:j,needs:V,varyings:Y,modules:K,fnDefs:G}=$,q=jX(`// lume material ink field (assembled by assembleMaterialShader) - ${X.shadingModel}`,V);if(q.push($.lightingVocab?j.lighting.wgslDefs:X5),$.lightingQueries)q.push(t9().trim());if(q.push(...$.materialGroup,...$.drawGroup),q.push(`@group(3) @binding(${u1}) var<uniform> lume_inkRecord: vec4<f32>;`),j.instancing==="matrix"||j.skinned)q.push(V5);for(let z of K)q.push(z.source.trim());if(G)q.push(G);if(q.push(a7,r7),$.vertexInStruct)q.push($.vertexInStruct);return q.push(C6(gK(Y))),q.push(e9("vsInkField",$.vsParams,J)),q.push(`${Z}${b0("fsInkField"," -> InkFieldOut",Q)}`),A$(q)}function jG($,J){return J?Bb($):`${$}
@group(2) @binding(0) var<uniform> material: Material;`}function VX($,J,Q=$.instanceSlots!==void 0){let Z=$.vertexPath,X=$.skinned===!0&&$.skinnedPalette==="rig",j=[];if(Z)j.push(Z.declarationsWgsl.trim());else{if($.instancing==="matrix")j.push($.nativeModelMatrix===!0?`${$5}
@group(3) @binding(0) var<storage, read> instances: array<ModelInstance>;`:`${GV(Q)}
@group(3) @binding(0) var<storage, read> instances: array<DrawInstance>;`);if($.instanceSlots==="storage")j.push(vP);if($.instanceSet)j.push(_j(3,$.instanceSet))}if(L6($)===r$&&!$.vertexReader)j.push($.vertexLayout?.storageEncoding==="indexed-attributes"?BK:SP);if($.skinned)j.push(X?SZ(3):"@group(3) @binding(0) var<storage, read> jointMatrices: array<mat4x4<f32>>;");if($.morph){if(j.push(n7(3)),$.motion)j.push(_1(3,11))}if($.motion&&!Z){if($.instancing==="matrix")j.push(`@group(3) @binding(10) var<storage, read> previousInstances: array<${$.nativeModelMatrix?"ModelInstance":"DrawInstance"}>;`);if($.skinned)j.push(X?SZ(3,11,"previousRig"):"@group(3) @binding(10) var<storage, read> previousJointMatrices: array<mat4x4<f32>>;")}if($.modelMaterial)j.push(P2);if($.modelMaterial&&$.skinned&&!X&&!Z)j.push(M2($.motion===!0));if($.skinnedModel)j.push(C2);if($.instancing==="matrix"&&(J.normalWorldV||J.slopeNormal)||J.skinnedNormal)j.push(V5);return j}var YX=$$.trim(),FD=`${YX}
${_$}
${Y9}`,VG=`${KJ.trim()}
${_$}
${Y9}`,BD=`struct Material {
${RK.map(($)=>`  ${$.name}: ${O0($.type)},`).join(`
`)}
}
@group(2) @binding(0) var<uniform> material: Material;`;function S4($,J,Q,Z,X,j,V){let Y=[],K=!1,G=!1;for(let z of V){if(z===GJ)continue;if($.materialBlocks&&z===AC){let H=/u32\((.+)\.block\.x\)/.exec(V.find((U)=>U.startsWith("  let lume_block: u32"))??"")?.[1];if(H===void 0)throw Error("lume: a material-blocks vertex reads its glow without its block");Y.push(`  let lume_glowWord: vec4<f32> = lume_materialBlockWords[u32(${H}.block.y) + 1u];`,"  let lume_glow: vec3<f32> = lume_glowWord.xyz * lume_glowWord.w;"),G=!0;continue}if(Y.push(z),z.includes("material."))K=!0}let q=[];if(j==="vs")q.push(FD);else if($.positionWorldV)q.push(VG);if(j==="vsShadow")q.push(mK);if(K)q.push(BD);if(q.push(...J),G)q.push(`@group(3) @binding(${IZ}) var<storage, read> lume_materialBlockWords: array<vec4<f32>>;`);if(Q)q.push(Q);return q.push(Z),q.push(e9(j,X,Y)),o8(A$(q),f$)}function KX($){return{positionWorld:!1,portalClip:!1,normalWorld:!1,normalFace:!1,flatWeld:!1,uv:!1,uvSets:zC,color:!1,colorAttribute:!1,normalLocal:!1,positionLocal:!1,positionWorldV:!1,normalWorldV:!1,slopeNormal:!1,skinnedNormal:!1,flipBackNormal:!1,normalFacingKept:!1,laneCoverage:!1,laneCoverageSeeded:!1,laneHide:!1,flash:!1,materialBlocks:!1,bandLens:!1,instanceIndex:$.instancing==="matrix",vertexIndex:$.morph===!0,pathCut:[]}}function MD($,J,Q){let Z=Q?.inputsUsed,X=Z?.has("normalWorld")===!0;return{...KX($),normalWorldV:X,skinnedNormal:$.skinned===!0&&(X||Z?.has("normalLocal")===!0),materialBlocks:J.materialBlocks,instanceIndex:J.instanceIndex,vertexIndex:J.vertexIndex}}function PD($){let J=$.vertexLayout;if(J===void 0||$.skinned||$.skinnedModel||$.morph||$.instanceSet!==void 0||$.vertexReader!==void 0)return!1;if(L6($)===r$&&J.storageEncoding!=="indexed-attributes")return!1;let Z=J.attributes.find((X)=>X.name==="position");return Z?.offset===0&&Z.format==="float32x3"&&Z.encoding===void 0}function YG($,J,Q,Z){let X=$.vertexLayout;if(X===void 0)throw Error(`lume assemble: the ${Q==="mask"?"highlight mask's":"opaque caster"} vertex needs the material's vertexLayout`);let j=[];for(let K of X.attributes)if(K.name==="position"||$.skinned===!0&&(K.name==="joints"||K.name==="weights"))j.push(K);let V={...$,skinnedModel:!1,vertexLayout:{...X,attributes:j}};if(Q==="mask")V.motion=!1;let Y=u9(V,J,[],null,null,Q);return S4(J,VX(V,J),o4(V),Z,vK(V,J),Q==="mask"?"vs":"vsShadow",Y)}function DY($,J,Q=null){let{shadow:Z}=$;if(!Z)throw Error("lume: the caster vertex module needs a shadow arm");let X=[VG,mK];if(Q&&$.needs.laneCoverage)X.push(j5);if(X.push(...$.materialGroup),Q&&$.sceneDepth)X.push(i4(n4($.textures.length)));X.push(...$.drawGroup);let j=Q?[...J,Q]:J;if(Q)X.push(...rY(x6(j)));else for(let K of x6(j))X.push(K.source.trim());let V=zJ(j);if(V)X.push(V);if($.vertexInStruct)X.push($.vertexInStruct);if(X.push(Z.varyingsStruct??$.varyingsStruct),X.push(e9("vsShadow",$.vsParams,Z.vsLines)),Q)X.push(...HG(Z),...$.surfaceDefs);let Y=A$(X);return Q?M6(Y,$.needs.normalFace):o8(Y,f$)}function KG($,J,Q){let Z=new Set(["position",s5]);if($.skinned)Z.add("joints"),Z.add("weights");if(Q||J.has("normalLocal"))Z.add("normal");for(let X of J)if(X.startsWith("attribute:"))Z.add(X.slice(10));else if(X==="vertexColor")Z.add("color");else if(X==="uv"||X==="uv1"||X==="uv2"||X==="uv3")Z.add(X);if($.vertexLayout?.attributes.some((X)=>X.name==="layer"))Z.add("layer");return Z}function CD($,J){if(!$.opts.vertexPositionProgram||$.opts.vertexPath||!$.opts.vertexLayout)return;let Q=J?.inputsUsed??new Set,X=$.opts.skinned===!0||$.opts.nativeModelMatrix===!0||$.opts.modelMaterial===!0||($.opts.vertexBuffers?.length??1)>1?{...$.needs,normalWorldV:Q.has("normalWorld"),slopeNormal:!1,skinnedNormal:$.opts.skinned===!0&&(Q.has("normalWorld")||Q.has("normalLocal"))}:{...$.needs,slopeNormal:!1},j=KG($.opts,Q,X.normalWorldV||X.skinnedNormal),V=bZ({...$.opts,instanceSlots:$.opts.instanceSet?"storage":void 0},j),Y=$.opts.attributeSource!=="storage"?{...V.layout,storageEncoding:void 0}:V.layout,K={...$.opts,vertexReader:void 0,vertexLayout:Y,attributeSource:V.native?"vertex":"storage",instanceSlots:$.opts.instanceSet?"storage":void 0},G=J?[J]:[],q=x6(G),z=[YX];if(c$(q))z.push(K.lighting.wgslDefs);if(l9(q))z.push(t9().trim());z.push(jG($.materialStruct,!1),...$.textureDecls,...$.storageDecls),z.push(...VX(K,X,$.opts.instanceSlots!==void 0));for(let M of q)z.push(M.source.trim());let H=zJ(G);if(H)z.push(H);let U=V.native??o4(K);if(U)z.push(U);let W=K.instanceSet?[]:["  let lume_slot = instanceIndex;"];return W.push(...u9(K,X,[],J,null,"frame",!0)),z.push(`fn lume_materialRenderPosition(vertexIndex: u32, instanceIndex: u32) -> vec3<f32> {
${W.join(`
`)}
}`),{program:X9(z),inputs:V.inputs}}function C6($,J){let Q=[`  @builtin(position)${J?" @invariant":""} position: vec4<f32>,`];for(let X of $)Q.push(`  @location(${X.location})${NY(X)?"":" @interpolate(flat)"} ${X.name}: ${O0(X.type)},`);let Z=`struct Varyings {
${Q.join(`
`)}
}`;if(!$.some((X)=>X.name===i9))return Z;return`${Z}
${uQ("Varyings",$.filter((X)=>NY(X)&&X.name!==i9).map((X)=>X.name))}`}var NY=($)=>I9($.type)==="f32"&&$.flat!==!0;function e9($,J,Q){return`@vertex fn ${$}(${J}) -> Varyings {
${Q.join(`
`)}
}`}function b0($,J,Q){return`@fragment fn ${$}(in: Varyings, @builtin(front_facing) frontFacing: bool)${J} {
${Q.join(`
`)}
}`}function qX($,J){let{material:Q,opts:Z,lit:X,needs:j,textures:V,sceneDepth:Y,throughMarks:K,modules:G,shadingDefs:q,fnDefs:z,fsEyesOwnerLines:H,fsEyesThroughLines:U}=$,W=jX(`// lume material shader (assembled by assembleMaterialShader) - ${Q.shadingModel}`,j,Z.motion);if(O4(Z))W.push(kK);if((X||$.lightingVocab)&&J==="lit")W.push(Z.lighting.wgslDefs);else W.push(X5);if($.lightingQueries&&!$.tapsFromFoldDefs)W.push(t9().trim());if(W.push(...$.materialGroup),Y)W.push(i4(n4(V.length)));if(K)W.push(Aj);if(W.push(...$.drawGroup),H||U)W.push(DQ(3,U!==null));for(let M of G)W.push(((J==="lit"?$.litSources?.get(M):void 0)??M.source).trim());if(J==="surface")W.push(nQ(Z.motion===!0),dQ);else if(J==="lit"&&q)W.push(q);if(z)W.push(z);return W}var DD=/\b(?:VertexIn|lume_pullVertexIn|lume_attributeOffset)\b/;function GX($,{vertexInStruct:J,varyingsStruct:Q},Z){if(!J)return;let X=Z;for(let j=0;!X&&j<$.length;j+=1)X=DD.test($[j]);if(X)$.splice($.indexOf(Q),0,J)}function qG($,J,Q){if(J.fsThroughLines)$.push(b0(P5,Q?" -> @builtin(frag_depth) f32":"",J.fsThroughLines));if(J.fsThroughCoverLines)$.push(b0(C5," -> @location(0) vec4<f32>",J.fsThroughCoverLines))}function GG($,J){if(J.fsApertureMaskLines)$.push(`${oQ}
${b0("fsApertureMask"," -> ApertureMaskOut",J.fsApertureMaskLines)}`);if(J.fsEyesOwnerLines)$.push(b0("fsEyesOwner"," -> @location(0) vec4<u32>",J.fsEyesOwnerLines))}function ND($,J){let{material:Q,opts:Z,vsLines:X,fsLines:j,fsDepthLines:V,fsMaterialDataLines:Y,throughMarks:K,fsEyesThroughLines:G,shadow:q,surfaceDefs:z}=$,H=$.writesDepth,U=qX($,"lit");if($.waterOver)U.push(Z5);if(U.push($.varyingsStruct),J)U.push(e9("vs",$.vsParams,X));if(H)U.push(`
struct PictureDepthOut {
  @location(0) color: vec4<f32>,
  @builtin(frag_depth) depth: f32,
}${Q.viewDepthPlaneNode?`
${LQ}`:""}`);if($.coverage)U.push(l4,H?lC:JG);if(U.push(`struct FragmentOut {
  @location(0) color: vec4<f32>,${Z.motion?`
  @location(1) motion: vec4<f32>,`:""}${H?`
  @builtin(frag_depth) depth: f32,`:""}${$.coverage?`
  @builtin(sample_mask) mask: u32,`:""}
}`),U.push(b0("fs"," -> FragmentOut",j)),U.push(b0("fsDepth",` -> ${QG(H,$.coverage)}`,V)),qG(U,$,K),Y)U.push(zG(Y,H));if($.fsSampleFeedbackLines)U.push(UG($.fsSampleFeedbackLines,H));if(GG(U,$),G)U.push(b0("fsEyesThrough"," -> EyesThroughOut",G));if(q&&!q.fragmentInCaster)U.push(...HG(q));return U.push(...z),GX(U,$,J),A$(U)}function zG($,J){return b0(N9,` -> ${J?"PictureDepthOut":"@location(0) vec4<f32>"}`,$)}var kD=`struct SampleDepthOut {
  @location(0) report: vec2<u32>,
  @builtin(frag_depth) depth: f32,
}`;function UG($,J){let Q=b0(P6,` -> ${J?"SampleDepthOut":"@location(0) vec2<u32>"}`,$);return J?`${kD}
${Q}`:Q}function xD($,J,Q){let Z=$.length-1;if(Z<0||!$[Z].startsWith("  return "))return null;let X=$.slice(0,Z).map((V)=>pC.get(V)??V),j=Q===null?"  return lume_fbOut;":`  return SampleDepthOut(lume_fbOut, ${Q});`;return["  lume_fbBegin(in.position, bitcast<u32>(frame.fadeTime));",...X,...J.map((V)=>`  lume_fbPick(${V}, 0.0);`),j]}function TD($,J,Q){let Z=$.length-1;if(Z<0||!$[Z].startsWith("  return "))throw Error("lume: the depth arm's body ends in its return, which the material data entry takes the place of");let X=$.slice(0,Z);if(Q)X.push(`  ${WZ}`);return X.push(J===null?"  return out_data;":`  return PictureDepthOut(out_data, ${J});`),X}function HG($){let J=[b0("fsShadow","",$.fsLines)];if($.fsLines.length>0)J.push(I1(1),b0("fsShadowCover","",[...$.fsLines,"  if (cover_underGround(in.position)) { discard; }"]));return J}var LD="  if (alpha <= 0.0) { discard; }";function AD($,J,Q,Z,X,j,V){let Y=qX($,"surface");if(Z)Y.push(lQ);if(X)Y.push(cQ);if(j)Y.push(FK);if(V){if(Y.push(d7),$.waterOver)Y.push(Z5)}if(Y.push($.varyingsStruct),Q)Y.push(e9("vs",$.vsParams,$.vsLines));if(V){let K=J.indexOf("  lume_surfacePoint = in.positionRender;");if(K<0)throw Error("lume: the surface arm's body names its point before its return, which the see-through's entries cut ahead of");let G=J.slice(0,K);Y.push(b0("fsSeeThroughSurface",` -> ${Y5(!1)}`,[...G,LD,...J.slice(K)])),Y.push(b0("fsSeeThrough"," -> @location(0) vec4<f32>",[...G,...V])),qG(Y,$,!1)}else{if(Y.push(b0("fsSurface",` -> ${Y5($.opts.motion===!0)}`,J)),$.coverage)Y.push(l4,JG);Y.push(b0("fsDepth",` -> ${QG(!1,$.coverage)}`,$.fsDepthLines)),GG(Y,$)}if($.fsMaterialDataLines)Y.push(zG($.fsMaterialDataLines,!1));if($.fsSampleFeedbackLines)Y.push(UG($.fsSampleFeedbackLines,$.writesDepth));return Y.push(...$.surfaceDefs),GX(Y,$,Q),A$(Y)}function ID($){return $.body.includes("for (var ")||$.fnDefs.includes("for (var ")}var OD=I5|m4|T9;function WG($,J,Q=!1){if(!Q&&!FG($,J))return`the ${$} model`;if($!=="physical"||(u4(J)&OD)===0)return;return"its own physical terms (an F0 of its own, a term of three's physical light, or its coat's own normal)"}var FG=($,J)=>$==="pbr"||$==="physical"&&!a5(J),r5="fsOutlineMask";function BG($,J){if(($.lighting.materialInputs?.length??0)>0)return"material inputs to the light program";if(J.lightingQueries)return"a point query";return d9(J.modules)?"a sky read":void 0}function RD($,J,Q,Z,X,j,V){let Y=WG($,Q);if(Y!==void 0)return Y;if(!X||Q.blending!=="normal")return"no see-through blend";if(!D6(Q))return"no colour write";if(YJ(Q))return"premultiplied alpha";if(J.vertexPath&&J.vertexPath.lightsOnce!==!0)return"a lane's vertex path";if(j)return"a scene read";if(V)return"a depth of its own";if(!Q.depthTest)return"no depth test";if(J.motion)return"a motion twin";if(!Q.fog)return"fog off";if(Q.viewOpacityNode)return"a view opacity";if(J.lighting.materialProgram===!0)return"a lighting() of its own";return BG(J,Z)}function SD($,J,Q,Z,X){let j=$==="unlit";if(!D6(Z))return"no colour write";let V=WG($,Z,j);if(V!==void 0)return V;if(j&&!Z.fog)return"an unlit surface with its fog off";if(J.vertexPath&&J.vertexPath.lightsOnce!==!0)return"a lane's vertex path";if(!Q)return"not an opaque depth writer";if(b1(Z.renderOrder))return"a renderOrder above 0";if(Z.viewOpacityNode)return"a view opacity";if(J.lighting.materialProgram===!0){if(j)return"a lighting() of its own on an unlit surface";if(J.pass.samples!==1)return"a lighting() of its own under four samples";if($==="physical"&&(Z.clearcoat>0||Z.clearcoatNode!==null))return"a lighting() of its own under a coat";if(J.lighting.discards===!0)return"a lighting() of its own that cuts"}return BG(J,X)}function vD($,J,Q,Z,X){let j=qX($,X?"none":"lit");return j.push(HZ(Z)),j.push($.varyingsStruct),j.push(`${Q}${b0(r5," -> @location(0) vec4<f32>",J)}`),GX(j,$,!1),A$(j)}function MG($,J){let Q=jX("// lume highlight mask - the lane's cuts (assembled by assembleMaterialShader)",$);Q.push(HZ(M5),J);let Z=[];if($.portalClip)Z.push(ZG);if($.laneCoverage)Z.push($.laneCoverageSeeded?bK:EK);if($.laneHide)Z.push(_K);return Z.push(Aq),Q.push(`@fragment fn fsOutlineMask(in: Varyings) -> @location(0) vec4<f32> {
${Z.join(`
`)}
}`),M6(A$(Q),!1)}function wD($,J){return{...KX($),positionWorld:J.portalClip,positionWorldV:J.portalClip,portalClip:J.portalClip,laneCoverage:J.laneCoverage,laneCoverageSeeded:J.laneCoverageSeeded,laneHide:J.laneHide}}function bD($,J){let Q=wD($,J),Z=C6(f5(Q));return{vertex:YG($,Q,"mask",Z),fragment:MG(Q,Z)}}function zX($,J){return $.wireframe===!0&&J.vertexPath===void 0}function ED($,J){if(!J)return"opaque";return $.blending==="custom"||YJ($)?`${$.blending}:${lY(cY($))}`:$.blending}function Q4($,J,Q,Z,X,j,V,Y){let K="none",G=J.vertexLayout;if(J.vertexPath)K=`path:${J.vertexPath.key}`;else if(G){let H="";for(let U=0;U<G.attributes.length;U+=1){let W=G.attributes[U];H+=`${U>0?"+":""}${W.name}@${W.shaderLocation}:${W.format}:${W.offset}`}K=`${G.arrayStride}:${G.stepMode??"vertex"}:${H}${L6(J)===r$&&G.storageEncoding?":"+G.storageEncoding:""}${J.instanceSlots?`:slots-${J.instanceSlots}`:""}${J.instanceSet?":set":""}`}let q=h4($),z=[`model:${$.shadingModel}`,`color:${J.pass.colorFormat}`,`depth:${J.pass.depthFormat??"none"}`,`samples:${J.pass.samples}`,`instancing:${J.instancing}`,`skinned:${J.skinned===!0?1:0}`];if(J.skinned&&J.skinnedPalette==="rig")z.push("palette:rig");if(J.morph)z.push("morph:1");if(J.modelMaterial)z.push("modelMaterial:1");if(J.skinnedModel)z.push("skinnedModel:1");if(z.push(`layout:${K}`,`blend:${ED($,Q)}`,`depthWrite:${Z?1:0}`,`depthTest:${$.depthTest?1:0}`),q)z.push(`polygonOffset:${q.factor}/${q.units}`);if(!D6($))z.push("colorWrite:0");if(zX($,J))z.push("wireframe:1");if(z.push(`cull:${X}`,`alphaTest:${$.alphaTest>0?1:0}`,`fog:${$.fog?1:0}`,"wgsl",y5(j)),V)z.push("vertexWgsl",y5(V));if(Y)z.push("shadowVertexWgsl",y5(Y));return z}function gD($,J){let Q=["surface-buffer"];for(let Z of $)if(Z.startsWith("color:"))Q.push(`color:${HK(J)}`);else Q.push(Z.startsWith("samples:")?"samples:1":Z);return Q}function _D($){let J=$.skinned===!0&&$.skinnedPalette==="rig";if($.nativeModelMatrix===!0&&($.instancing!=="matrix"||$.skinned||$.instanceSlots!==void 0||$.instanceSet!==void 0))throw Error("lume: native model matrices require a direct, unskinned matrix draw");if($.modelMaterial&&$.nativeModelMatrix!==!0&&($.skinned!==!0||J))throw Error("lume: native model material factors require the character skin palette or native model matrix");let Q=new Map,Z=$.vertexLayout;if(!$.vertexPath===!Z)throw Error("lume: assemble with exactly one of vertexLayout / vertexPath");if(!Z){if($.skinned)throw Error("lume: a vertexPath lane cannot be skinned");if($.morph)throw Error("lume: a morph assembly adds the targets' deltas ahead of the palette blend \u2014 assemble with skinned true");if($.instancing!=="none")throw Error("lume: a vertexPath lane owns its own instancing \u2014 assemble with instancing 'none'");return Q}if($.instanceSet){if($.instancing!=="matrix")throw Error("lume: an instance set places its copies under the instance matrix \u2014 assemble with instancing 'matrix'");if($.instanceSlots!=="storage")throw Error("lume: an instance set reads each copy's slot from the bound list \u2014 assemble with instanceSlots 'storage'");if($.skinned)throw Error("lume: a rigged geometry cannot declare an instance set")}for(let j of Z.attributes)Q.set(j.name,j);let X=Q.get("position");if(!X)throw Error("lume: vertex layout must include a 'position' attribute");if(O0(e5(X.format))!=="vec3<f32>")throw Error(`lume: 'position' attribute must be a 3-component float format, got '${X.format}'`);if($.skinned){if(J){if($.instancing!=="matrix")throw Error("lume: a rig-skinned material blends model-space palettes under the instance matrix \u2014 assemble with instancing 'matrix'");if($.morph)throw Error("lume: a rig palette carries no morph targets \u2014 assemble morph with the character palette")}else if($.instancing!=="none")throw Error("lume: skinned materials blend world-premultiplied joint palettes \u2014 assemble with instancing 'none'");for(let j of["joints","weights"])if(!Q.has(j))throw Error(`lume: skinned material vertex layout must include a '${j}' attribute`)}else if($.morph===!0&&$.nativeModelMatrix!==!0)throw Error("lume: a morph assembly needs a character skin palette or native model matrix");return Q}var yD=400;function fD($,J,Q){let Z=n9($.body);if($.body.length<yD&&Z===""||Q.length===0)return null;let X=[],j=[],V=["  let lume_surface = lume_materialSurface(in, frontFacing);"];for(let K of Q){let G=O0(K.node.type);X.push(`  m_${K.name}: ${G},`),j.push(`out_${K.name}`),V.push(`  let out_${K.name}: ${G} = lume_surface.m_${K.name};`)}let Y=[`${Z}fn lume_materialSurface(in: Varyings, frontFacing: bool) -> LumeMaterialSurface {`,...J,$.body,`  return LumeMaterialSurface(${j.join(", ")});`,"}"].join(`
`);return{defs:[`struct LumeMaterialSurface {
${X.join(`
`)}
}`,Y],called:V.join(`
`)}}var PG=/^(\s*)(\w+)(\s*:\s*[^/@]+,)$/,CG=/^\s*(\/\/.*)?$/,hD="lume_unread_";function XJ($,J,Q,Z){let X=$.indexOf("{"),j=X<0?-1:$.indexOf(`
}`,X);if(j<0)return $;let V=r9(Q);if(new RegExp(`\\b${J}\\b(?!\\s*\\.\\s*\\w)`).test(V))return $;let Y=new Set;for(let U of V.matchAll(new RegExp(`\\b${J}\\s*\\.\\s*(\\w+)`,"g")))Y.add(U[1]);let K=$.slice(X+1,j).split(`
`),G=K.map((U)=>U.endsWith(k9)?k9:""),q=K.map((U,W)=>PG.exec(U.slice(0,U.length-G[W].length)));if(K.some((U,W)=>q[W]===null&&!CG.test(U))||Z&&G.some(Boolean))return $;let z=q.findIndex((U)=>U!==null);q.forEach(function(U,W){if(U!==null&&Y.has(U[2]))z=W});let H=[];return K.forEach(function(U,W){let M=q[W];if(M===null)H.push(U);else if(!Z||W<=z)H.push(Y.has(M[2])?U:`${M[1]}${hD}${W}${M[3]}${G[W]}`)}),`${$.slice(0,X+1)}${H.join(`
`)}${$.slice(j)}`}var Z4="var<private> material: Material;",kY="struct Material {",mD=/^\s*:\s*array</,y9="lume_materialBlock",xY="lume_once_",TY="lume_materialBlocks",LY=new Map([[GJ,"lume_block"],[yK,"in.lumeBlock"]]),DG="lume_materialBuild",uD=`@group(2) @binding(0) var<uniform> ${DG}: Material;`;function R9($){let J=[$,""].join(""),Q=J.indexOf(Z4),Z=J.indexOf(kY),X=Z<0?-1:J.indexOf(`
}`,Z);if(Q<0||X<0)return $;let j=r9(AY(J,new Map([Z4,...LY.keys()].map((k)=>[k,c9]))));if(/\bmaterial\b(?!\s*\.\s*\w)/.test(j))return $;let V=new Set;for(let k of j.matchAll(/\bmaterial\s*\.\s*(\w+)/g))V.add(k[1]);let Y=J.slice(Z+kY.length,X).split(`
`),K=Y.map((k)=>PG.exec(k));if(Y.some((k,R)=>K[R]===null&&!CG.test(k)))return $;let G=K.filter((k)=>k!==null&&V.has(k[2])),q=new Set(G.filter((k)=>k[2]===T5||k[2]===L5).map((k)=>k[2])),z=new Set(G.filter((k)=>!q.has(k[2])).map((k)=>k[2])),H=new Set(G.filter((k)=>z.has(k[2])&&!mD.test(k[3])).map((k)=>k[2])),U=[...z.size===0?[]:[`var<private> ${y9}: u32;`],...q.size===0?[]:[uD]],W=(k)=>z.size===0?[]:[`  ${y9} = ${k};`],M=z.size===0?null:new RegExp(`\\bmaterial([^\\S\\n]*\\.[^\\S\\n]*(?:${[...z].join("|")})\\b)`,"g"),P=q.size===0?null:new RegExp(`\\bmaterial([^\\S\\n]*\\.[^\\S\\n]*(?:${[...q].join("|")})\\b)`,"g"),C=function(k){let R=M===null?k:k.replace(M,`${TY}[${y9}]$1`);return P===null?R:R.replace(P,`${DG}$1`)},D=J.lastIndexOf(`
`,Z-1)+1,B=J.indexOf(`
`,X+1),N=B<0?J.length:B,T=M===null&&P===null?J:`${C(J.slice(0,D))}${J.slice(D,N)}${C(J.slice(N))}`,L=AY(T,new Map([[Z4,U],...[...LY].map(([k,R])=>[k,W(R)])]));return H.size===0?L:pD(L,`${TY}[${y9}].`,H)}function AY($,J){let Q=[];for(let[j,V]of J)for(let Y=$.indexOf(j);Y>=0;Y=$.indexOf(j,Y+1)){let K=Y+j.length;if((Y===0||$.charCodeAt(Y-1)===IY)&&(K===$.length||$.charCodeAt(K)===IY))Q.push({at:Y,end:K,by:V})}if(Q.length===0)return $;Q.sort((j,V)=>j.at-V.at);let Z=[],X=0;for(let j of Q){if(j.at>X)Z.push($.slice(X,j.at-1));Z.push(...j.by),X=j.end+1}if(X<=$.length)Z.push($.slice(X));return Z.join(`
`)}var IY=10;function pD($,J,Q){let Z=r9($),X=new RegExp(`${J.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}(\\w+)\\b`,"g"),j=new RegExp(`\\b${y9}\\s*=[^=]`),V=[];for(let[Y,K]of cD(Z)){let G=Z.slice(Y,K);if(j.test(G))continue;let q=new Map;for(let U of G.matchAll(X)){if(!Q.has(U[1]))continue;let W=q.get(U[1]);if(W===void 0)q.set(U[1],[U.index]);else W.push(U.index)}let z=[...q].filter(([,U])=>U.length>=2);if(z.length===0)continue;let H=dD(G);for(let[U,W]of z){let M=nD(G,lD(H,W[0]));V.push({at:Y+M,end:Y+M,text:`
  let ${xY}${U} = ${J}${U};`});for(let P of W)V.push({at:Y+P,end:Y+P+J.length+U.length,text:`${xY}${U}`})}}return iD($,V)}function cD($){let J=[];for(let Q of $.matchAll(/\bfn\s+\w+\s*\(/g)){let Z=$.indexOf("{",Q.index);if(Z<0)break;let X=Z;for(let j=0;X<$.length;X+=1)if($[X]==="{")j+=1;else if($[X]==="}"&&--j===0)break;J.push([Z+1,X])}return J}function lD($,J){let Q=0,Z=$.length;while(Q<Z){let X=Q+Z>>1;if($[X]<=J)Q=X+1;else Z=X}return Q===0?0:$[Q-1]}function dD($){let J=/\s*else\b/y,Q=[0],Z=0;for(let X=0;X<$.length;X+=1){let j=$[X];if(j==="("||j==="["||j==="{")Z+=1;else if(j===")"||j==="]")Z-=1;else if(j===";"&&Z===0)Q.push(X+1);else if(j==="}"&&--Z===0){if(J.lastIndex=X+1,!J.test($))Q.push(X+1)}}return Q}function nD($,J){let Q=J;while($[Q]===" "||$[Q]==="\t")Q+=1;return $[Q]===`
`?Q:J}function iD($,J){if(J.length===0)return $;J.sort((X,j)=>X.at-j.at||X.end-j.end);let Q=[],Z=0;for(let X of J)Q.push($.slice(Z,X.at),X.text),Z=X.end;return Q.push($.slice(Z)),Q.join("")}function OY($,J,Q){let Z=[Iq];J.storages.forEach((H,U)=>Z.push(H.engine!==void 0?`@group(1) @binding(${2+U}) var<storage, read> ${H.engine}: array<${O0(H.elementType)}>;`:`@group(1) @binding(${2+U}) var<storage, read_write> ${J.symbolNames.name("storage",H.id)}: array<${J.atomicStorages.has(H)?`atomic<${O0(H.elementType)}>`:O0(H.elementType)}>;`));let X=2+J.storages.length;J.textures.forEach(function(H,U){Z.push(`@group(1) @binding(${X+2*U}) var ${J.symbolNames.name("texture",H.id)}: ${NG(H)};`),Z.push(`@group(1) @binding(${X+2*U+1}) var ${J.symbolNames.name("sampler",H.id)}: sampler;`)});let j=X+2*J.textures.length;J.storeTextures.forEach((H,U)=>Z.push(`@group(1) @binding(${j+U}) var ${J.symbolNames.name("texture",H.id)}: ${oD(H)};`));for(let H of J.workgroups)Z.push(`var<workgroup> ${J.symbolNames.name("storage",H.id)}: array<${J.atomicStorages.has(H)?`atomic<${O0(H.elementType)}>`:O0(H.elementType)}, ${H.count}>;`);for(let H of J.modules)Z.push(H.source.trim());if(J.fnDefs)Z.push(J.fnDefs);let V=(H)=>J.inputsUsed.has(H),Y=V("workgroupId")?`
  let lume_workgroup: vec3<u32> = vec3<u32>(lume_index / ${Q}u, 0u, 0u);`:"";if(J.barriers){let H=["@builtin(workgroup_id) lume_wid: vec3<u32>","@builtin(local_invocation_index) lume_local: u32",...V("localId")?["@builtin(local_invocation_id) lume_lid: vec3<u32>"]:[]];Z.push(`@compute @workgroup_size(${Q}) fn main(${H.join(", ")}) {
  let lume_first: u32 = lume_dispatch.w + lume_wid.x * ${Q}u + lume_wid.y * lume_dispatch.y;
  if (lume_first >= lume_dispatch.x) {
    return;
  }
  let lume_index: u32 = lume_first + lume_local;${Y}
${J.body}
}`)}else{let H=["@builtin(global_invocation_id) lume_gid: vec3<u32>",...V("invocationLocalIndex")?["@builtin(local_invocation_index) lume_local: u32"]:[],...V("localId")?["@builtin(local_invocation_id) lume_lid: vec3<u32>"]:[]];Z.push(`@compute @workgroup_size(${Q}) fn main(${H.join(", ")}) {
  let lume_index: u32 = lume_dispatch.w + lume_gid.x + lume_gid.y * lume_dispatch.y;
  if (lume_index >= lume_dispatch.x) {
    return;
  }${Y}
${J.body}
}`)}let K=Z.join(`
`),G=/\blume_worldFromRender\b/.test(r9(K))?[_$]:[],q=XJ(KJ.trim(),"frame",[...G,K].join(`
`),!0),z=`${XJ($,"material",K,!1)}
@group(1) @binding(0) var<uniform> material: Material;`;return A$(["//",q,...G,z,...Z])}function NG($){let J=$.sampleType==="uint"?"u32":"f32";if($.dimension==="3d")return`texture_3d<${J}>`;if($.dimension==="2d-array")return`texture_2d_array<${J}>`;if($.dimension==="cube")return`texture_cube<${J}>`;return`texture_2d<${J}>`}function oD($){let J=f4($);if(J===null)throw new X0(uY,{code:"texture-store-target"});let{layout:Q}=pY($,J);return`${J.volume?"texture_storage_3d":"texture_storage_2d"}<${Q.gpu}, write>`}var c9=[];function P8($){let J=null;return function(){if(J===null)try{J={value:$()}}catch(Q){J={refused:Q}}if("refused"in J)throw J.refused;return J.value}}function rD($,J){$.reserve(J.declarationsWgsl);for(let Z of J.entryParams)$.reserve(Z);for(let Z of J.positionWgsl)$.reserve(Z);for(let Z of J.casterPositionWgsl??c9)$.reserve(Z);Cb(J,$);for(let Z of J.varyings)$.reserve(Z.name);let Q;{Q=Db(J,$)}if(Q){for(let Z of[Q.marker,Q.variable,Q.displacedFlag])$.reserve(Z);Fb(Q,$);}}var aD=["workgroupId","localId","invocationLocalIndex"],sD=($,J)=>`a compute body with workgroupBarrier() runs whole workgroups: .compute(${$}, ${J}) leaves ${$%J} invocations of a workgroup past the count; give it ${Math.ceil($/J)*J} and skip the tail's writes with If(instanceIndex.lessThan(${$}), \u2026), keeping the barrier outside the If`;function RY($,J,Q,Z,X=!1){let j=[];if($.length===0)return j;J.reserve("main lume_gid lume_index lume_dispatch");for(let V of $){let Y=D8({stage:"compute",scope:V.scope,outputs:[],inputs:a4,symbolNames:J,literalSeats:Q,uniformName:Z,...X?{engineReads:!0}:{}});if(Y.barriers&&V.count%V.workgroupSize!==0)throw new X0(sD(V.count,V.workgroupSize),{code:"compute-barrier-count"});let K=Y.workgroups.reduce((G,q)=>G+q.count*fY(q.elementType)*4,0);if(K>j4)throw new X0(`a compute body's workgroupArrays take ${K} bytes together, and a workgroup holds ${j4} bytes on every device`,{code:"workgroup-storage-over-limit"});j.push(Y)}return j}var kG=($)=>$.hold===null?[$.place,$.paint]:[$.place,$.hold,$.paint],xG={instanceIndex:"lume_pointInstance",vertexIndex:"lume_pointVertex",modelMatrix:"lume_points.model",uv:"vec2<f32>(0.5)"},tD={...a4,...xG,positionLocal:"lume_pointLocal",positionGeometry:"lume_pointLocal"},v4={...a4,...xG,positionLocal:"out_pointsPosition",positionGeometry:"out_pointsPosition",positionRender:"lume_pointRender.xyz",positionWorld:"lume_worldFromRender(lume_pointRender.xyz)",screenUV:"(lume_pointPixel / frame.viewportSize)"},eD={...v4,uv:"lume_pointUv",screenUV:"(lume_pointAt / frame.viewportSize)"},TG=new Set(["positionLocal","positionGeometry"]),o9=new Set(["uv","screenUV"]),$N=new Set(["uv"]),JN=new Set([...TG,...o9]),QN=new Set,SY=new Set(["atomic","voidCall","textureStore"]),ZN=new Set(["const","input","attribute","uniform","rows","varRead"]),XN="main lume_gid lume_index lume_dispatch lume_points lume_pointsSums lume_pointsSet lume_pointsVertices lume_pointsFromVertices lume_pointInstance lume_pointVertex lume_pointLocal lume_word lume_pointsPut lume_pointsDither lume_pointRender lume_pointClip lume_pointNdc lume_pointPixel lume_pointScale lume_pointRadius lume_alpha lume_light lume_coverLog lume_side lume_lo lume_hi lume_x lume_y lume_cell lume_from lume_to lume_span lume_cover lume_pointAt lume_pointUv out_pointsPosition out_pointsSize out_pointsColor out_pointsOpacity out_pointsHold";function jN($){let J=new Map,Q=new Map,Z=new Map,X=function(j){let V=j.meta;if(V.kind==="input")return o9.has(V.name);if(V.kind==="varRead"||SY.has(V.kind))return!0;if(V.kind!=="fnCall")return!1;let Y=Q.get(V.instance.id);if(Y===void 0){let K=j6(V.instance),G=new Set,q=(z)=>z.meta.kind==="input"&&o9.has(z.meta.name)||SY.has(z.meta.kind);Y=K.some((z)=>F$(z,G,q)),Q.set(V.instance.id,Y)}return Y||U$(j,void 0,Z).size>0};for(let j of $)r0(j,J,function(){return},(V,Y)=>Y.some(Boolean)||X(V));return J}function VN($,J){let Q=[];return V6($,function(Z){if(J.get(Z)===!0)return!0;if(!ZN.has(Z.meta.kind))Q.push(Z);return!1}),Q}function YN($,J,Q,Z,X){let j=nY($);if(j===null)return null;Q.reserve(XN);let V=J.vertexScope??J.fragmentScope??null,Y=$.positionNode?o$("position",$.positionNode,["vec3f"]):y4,K=$.positionNode?TG:QN,G=j.sizeNode?o$("size",j.sizeNode,["f32"]):Z6("f32",[j.size]),z=D8({stage:"compute",scope:C8(V,[Y,G]),outputs:[{name:"pointsPosition",node:Y},{name:"pointsSize",node:G}],inputs:tD,symbolNames:Q,literalSeats:Z,uniformName:X}),H=$.colorNode?o$("color",$.colorNode,["vec4f"]):Z0(mY,"vec4f"),U=$.opacityNode?o$("opacity",$.opacityNode,["f32"]):k5,W=[H,U],M=C8(V,W),P=[];if(M!==null)A0(M,P);let C=new Set,D=[...W,...P].some((R)=>F$(R,C,(w)=>w.meta.kind==="input"&&$N.has(w.meta.name))),B=D?VN(W,jN(W)):[],N=B.length===0?null:D8({stage:"compute",scope:null,outputs:B.map((R,w)=>({name:`pointsHold${w}`,node:R})),inputs:v4,symbolNames:Q,literalSeats:Z,uniformName:X,bound:h9(B,z.named,K)}),T=$.positionNode?JN:o9,L=h9(W,z.named,D?T:K);if(N!==null)for(let[R,w]of h9(W,N.named,o9))L.set(R,w);let k=D8({stage:"compute",scope:M,outputs:[{name:"pointsColor",node:H},{name:"pointsOpacity",node:U}],inputs:D?eD:v4,symbolNames:Q,literalSeats:Z,uniformName:X,bound:L});if(z.textures.length>0||k.textures.length>0||(N?.textures.length??0)>0)throw new X0("a points material samples no texture: each point is coloured once, so give it its colour from params, buffers or math (a picture per point is not drawn yet)",{code:"points-texture"});return{place:z,hold:N,paint:k,square:D,family:nj($),records:(J.instanceSet?.fields.length??0)>0}}function KN($){let J;if(!$.square)J=`${$.paint.body}
${tj($.family)}`;else{let Q=ej($.family,$.paint.body);J=$.hold===null?Q:`${$.hold.body}
${Q}`}return`  {
${J}
  }`}function qN($,J){let Q=kG(J),Z=[Iq],X=l$(Q,"storages"),j=new Set;for(let q of Q)for(let z of q.atomicStorages)j.add(z);if(X.forEach((q,z)=>Z.push(`@group(1) @binding(${2+z}) var<storage, read_write> ${J.place.symbolNames.name("storage",q.id)}: array<${j.has(q)?`atomic<${O0(q.elementType)}>`:O0(q.elementType)}>;`)),Z.push(ij),J.records)Z.push(rj);for(let q of x6(Q))Z.push(q.source.trim());let V=zJ(Q);if(V)Z.push(V);Z.push(aj(J.family)),Z.push(`@compute @workgroup_size(${dj}) fn main(@builtin(global_invocation_id) lume_gid: vec3<u32>) {
  let lume_index: u32 = lume_dispatch.w + lume_gid.x + lume_gid.y * lume_dispatch.y;
  if (lume_index >= lume_dispatch.x) {
    return;
  }
${oj(J.records)}
${J.place.body}
${sj}
${KN(J)}
}`);let Y=Z.join(`
`),K=XJ($$.trim(),"frame",[_$,$$.slice(KJ.length),Y].join(`
`),!0),G=`${XJ($,"material",Y,!1)}
@group(1) @binding(0) var<uniform> material: Material;`;return A$(["//",K,_$,G,...Z])}function*LG($,J){let Q=J.instanceSet,Z=qV($,Q?.lines===void 0?null:{topology:Q.lines,records:Q.fields.length>0},J.fragmentScope??null,J.vertexScope??null),X=Z===null?$:Z.material,j=Z===null?J:{...J,fragmentScope:Z.fragmentScope,vertexScope:Z.vertexScope},V={tableRows:0};for(;;)try{return yield*AG(X,j,V)}catch(Y){if(V===null||V.tableRows===0||!(Y instanceof X0)||Y.detail?.code!=="uniform-block-over-limit")throw Y;V=null}}function*AG($,J,Q,Z=f$-qY){let X=$.shadingModel==="matcap"?$.matcapTexture:null,j=J.vertexPath??null,V=_D(J),Y=!j||j.localPositionSlot!==void 0,K=$.castShadowPositionNode&&Y?o$("castShadowPosition",$.castShadowPositionNode,["vec3f"]):null,G=$.positionNode&&Y?o$("position",$.positionNode,["vec3f"]):K&&y4,q=u4($)&(J.lighting.physicalEvaluate===void 0?~m4:-1),z=lP($,J.lighting,V,q),H=iY($),U=Q===null?fZ:pV({roots:pK(z,G,K),scopes:[J.fragmentScope,J.vertexScope]});if(Q!==null)Q.tableRows=U.tableRows;let W=g5(U,{position:G,caster:K,outputs:z,fragmentScope:J.fragmentScope??null,vertexScope:J.vertexScope??J.fragmentScope??null}),M=g5(bV({...rZ(W),alsoReads:H.map((F)=>F.scope)}),W),P=g5(eV(rZ(M)),M),C=J.copyStage===!0&&J.instanceSet!==void 0&&J.motion!==!0&&J.loopMarks!==!0?XY(rZ(P)):lZ;if(C.stage!==null&&J.materialBlocks!==void 0)J={...J,materialBlocks:void 0};let{position:D,caster:B,outputs:N,fragmentScope:T,vertexScope:L}=g5(C,P),k=$K(iZ),R=D&&Z>0?ZY({outputs:N.map((F)=>F.node),scope:T,reads:cZ([D],C8(L,[D])),packs:Z,acts:k}):b5,w=R.packs===0?N:N.map((F)=>({name:F.name,node:R.rewrite(F.node)})),p=R.packs===0?T:uP(R.rewriteScope(T),w,k),f=new s9,a=new eY;if(f.reserve(J.lighting.wgslDefs),J.inkField===!0)f.reserve(HD);if(j)rD(f,j);let l=(F)=>({texture:f.name("texture",F.id),sampler:f.name("sampler",F.id)}),U0={symbolNames:f,literalSeats:a,uniformName:(F)=>"material."+f.name("uniform",F.id),textureName:l,varyingName:(F)=>f.name("varying",F.id),textureFacts:(F)=>iZ(F)?`material.${y0(F)}`:null},y0=(F)=>`${l(F).texture}_facts`,g0=OK($),G0=g0!==void 0,H0=dY($),_0=!D6($),O=G0&&YJ($),S={...oP,sceneDepth:g0?"lume_sceneDepth(in.position.xy)":AK,sceneDepthAt:"frame.viewportSize"};if(j){for(let F of j.varyings)S[F.input]=`in.${F.name}`;if(j.fragmentReads)Object.assign(S,j.fragmentReads.inputs)}else for(let F of Object.keys(HJ))if(!t4(J,F))S[F]=q6(V,F);if(J.modelMaterial)Object.assign(S,K9);let g=$._surfaceMap,E=g===null?j?.surfaceMap??null:null;if(g||E)f.reserve(O9),S.materialColor=`(${S.materialColor} * ${O9}.rgb)`,S[_5]=`${O9}.a`;let h=XC(j,V,J),J0=f9({stage:"fragment",scope:p,outputs:w,inputs:S,inputTypes:h,quadUniformRoot:!0,...U0}),d=fK(J),b=ZC(j,V,J,d);for(let F of Object.values(b))f.reserve(F);let y=D===null?[]:[{name:"position",node:D}];if(D!==null&&B!==null)y.push({name:cK,node:B});let n=D?C8(L,y.map((F)=>F.node)):null,_=D?f9({stage:"vertex",scope:n,outputs:y,inputs:b,inputTypes:h,...U0}):null,s=$.shadingModel==="physical"&&($.clearcoat>0||$.clearcoatNode!==null),W0=$.shadingModel==="physical"&&!a5($)&&!s&&q===0?"pbr":$.shadingModel,M0=zK(W0,J.lighting,X?l(X):null,q);f.reserve(M0.defs);let T0=M0.needsLighting;yield;let v=yield*J0(),h0=g!==null&&(v.inputsUsed.has("materialColor")||v.inputsUsed.has(_5))?{texture:g.texture,uv:jJ[g.uv],transform:g.transform}:null;if(h0)v.inputsUsed.add(h0.uv);let W7=E!==null&&(v.inputsUsed.has("materialColor")||v.inputsUsed.has(_5))?E:null;if(W7)for(let F of W7.inputs)v.inputsUsed.add(F);yield;let F7=v.varyings.map((F)=>F.node),e=_===null?null:yield*_(F7),m0=null;if(v.varyings.length>0){let F=v.varyings.map((l0)=>({name:l0.name,node:l0.node})),I=L??p,Y0=I!==null&&n!==null&&e!==null?tY(I,n,C8(I,F7),UY(b,j)):null;m0=yield*f9({stage:"vertex",...U0,scope:C8(L??p,F7,Y0),outputs:F,inputs:{...b,...j?{}:{positionLocal:d?r4:"localPos"},positionWorld:"positionWorldV",positionRender:"positionRenderV",normalWorld:"normalize(normalWorldV)"},inputTypes:h,bound:e===null?void 0:h9(F7,e.named,UY(b,j),Y0)})()}yield;let M$=[];if(e)M$.push(e);if(m0)M$.push(m0);let v$=[v,...M$],s$=RY(H,f,a,U0.uniformName),O8=C.stage===null?null:RY([C.stage],f,a,U0.uniformName,!0)[0],t$=YN($,J,f,a,U0.uniformName),v3=t$===null?[]:kG(t$),yJ=J.modelMaterial===!0&&J.skinned===!0,fJ=d&&e!==null;for(let F of v$){let I=F.inputsUsed;if(J.modelMaterial)for(let Y0 of $C)yJ||=I.has(Y0);if(d)fJ||=I.has("modelMatrix")||I.has("positionLocal")||I.has("normalLocal")}J={...J,modelMaterial:yJ,skinnedModel:fJ};let uH=l$([...v$,...s$,...v3,...O8===null?[]:[O8]],"uniforms"),D0=l$(v$,"textures");if(X&&!D0.includes(X))D0.push(X);let y6=a5($),R8=y6&&(!$.transparent||$.blending==="none");if(y6&&!D0.includes(K6))D0.push(K6);if(h0&&!D0.includes(h0.texture))D0.push(h0.texture);let e$=D0.includes(K6),w3=v.inputsUsed.has("sceneDepthAt"),b3=e$?"viewportSharedTexture() or ctx.fx.scene":w3&&"sceneDepthAt(uv)";if(b3&&!G0)throw new X0(`${b3} reads the scene behind the surface, and an opaque surface has none \u2014 set transparent = true on the material so it draws over the scene it samples`,{code:e$?"scene-color-on-opaque-material":"scene-depth-at-on-opaque-material"});let B7=D0.map((F)=>F.sampleType==="float"&&F!==X&&F!==K6&&F!==h0?.texture&&f4(F)===null),E3=g4()?TK(B7):null,M7=E3&&FN(E3,WN(D0,B7,f,[v,...M$])),f6=x6(v$),g3=zJ(v$),_3=l$(M$,"storages"),hJ=l$(M$,"textures"),h6=[];for(let F of l$(v$,"storages"))h6.push({ref:F,vertex:_3.includes(F),fragment:v.storages.includes(F)});let y3=l$(v$,"arrays"),$8=$.viewDepthPlaneNode!==null||$.depthNode!==null,A=GC($,J,T0,v,e,m0);UC(j,V,A),JC(J,[v,e,m0]);let f3=new Set;for(let F of v$)for(let I of F.inputsUsed)f3.add(I);let S8=UV(J,KG(J,f3,A.normalWorldV||A.slopeNormal||A.normalLocal||A.skinnedNormal));if(S8)J={...J,vertexLayout:S8.layout,...S8.reader?{vertexReader:S8.reader}:{}};let P7=j?HC(j,v):[],v8=$.depthWrite,h3=(F)=>f5(A,P7,v.varyings,F),m3=!1,w8=function(F=!0){let I=GY(h3(!0))>0;return m3||=I&&F,I},u3=h3(!0).length-f$;if(R.packs>0&&u3>0)return yield*AG($,J,Q,Math.max(0,R.packs-u3));if(A.flash&&w8())A.flash=!1;if(A.laneCoverage&&j?.coverage===void 0&&w8())A.laneCoverage=A.laneCoverageSeeded=!1;if(A.materialBlocks){let F=J.materialBlocks;if(F!=="kept"&&(F===void 0||!J.pass.depthFormat||!v8||G0||_3.length+hJ.length*F.texturesShare+1>F.vertexStorageRoom||v.storages.length+D0.length*F.texturesShare+1>F.fragmentStorageRoom||w8(!1)))A.materialBlocks=!1}if(A.laneHide&&w8())A.laneHide=!1;if(A.normalFace&&w8())A.normalFace=A.flatWeld=!1;if(A.bandLens=gC(J),A.bandLens&&w8())A.bandLens=!1;if(m3)wP();let b8=f5(A,P7,v.varyings,J.motion),J8=D0.filter(iZ),{structWgsl:m6,layout:p3,factsOffsets:pH}=OP(uH,f,a.size>0,J8.map(y0),H0?.planes.length??0),cH=J8.length===0?p3:{...p3,textureFacts:D0.map((F)=>J8.includes(F)?pH[J8.indexOf(F)]:-1)};yield;let c3=j?MY(j,A,v.varyings,e,m0,P7,J.bodyOpacity===!0,J.motion===!0):u9(J,A,v.varyings,e,m0),mJ=$.colorNode?.type==="vec4f",u6="material.color";if($.colorNode)u6=mJ?"out_color.rgb":"out_color";let uJ=$.roughnessNode?"out_roughness":"material.roughness",C7=$.metalnessNode?"out_metalness":"material.metalness",w$=null;if($.viewDepthPlaneNode)w$=`lume_paneDepth(in.position.z, in.positionRender, out_viewDepthPlane, ${G0})`;else if($.depthNode)w$="out_depth";let pJ="  finalColor = vec4<f32>(finalColor.rgb, finalColor.a * out_viewOpacity);";if($.blending==="multiply")pJ="  finalColor = vec4<f32>(finalColor.rgb * out_viewOpacity, out_viewOpacity);";else if($.blending==="none")pJ="  finalColor = vec4<f32>(finalColor.rgb, out_viewOpacity);";let D7=J.motion===!0,R0=j&&e4(j,v)?j.fragmentReads:void 0,cJ=R0?.reception??(J.receiveShadow===!1?"0.0":"1.0"),l3=w.some((F)=>F.name==="attribute")?`min(out_attribute, ${UK}u)`:"0u",E8=(F)=>w.some((I)=>I.name===F),lJ=E8("clearcoat")?"out_clearcoat":"material.clearcoat",d3=E8("clearcoatRoughness")?"out_clearcoatRoughness":"material.clearcoatRoughness",g8=E8("ao"),N7=R0?.unlit,n3=W0==="unlit"?GN(E8("lightMap"),g8):"albedo",dJ=J.lighting.materialProgram===!0&&!s?DK(J.lighting):null,i3=dJ!==null,o3=function(F){let I=`lume_surfaceOut(N, albedo, ${uJ}, ${C7}, ${cJ}, emissiveColor)`,Y0=g8?`lume_surfaceOccluded(${I}, out_ao)`:I,l0=F?`lume_surfaceGlowless(${Y0})`:Y0,E$=s?`lume_surfaceCoated(${l0}, N, ${N7===void 0?lJ:`select(${lJ}, 0.0, ${N7})`}, ${d3})`:l0,e0=N7===void 0?E$:`lume_surfaceUnlitAs(${E$}, ${N7})`;if(W0==="unlit")e0=`lume_surfaceUnlitAs(lume_surfaceOut(vec3<f32>(0.0, 1.0, 0.0), vec3<f32>(0.0), 1.0, 0.0, 0.0, ${n3} + ${F?"vec3<f32>(0.0)":"emissiveColor"}), true)`;if(i3)e0=`lume_surfaceOwnLit(${e0})`;if(!$.fog)e0=`lume_surfaceFogOff(${e0})`;return`lume_surfacePressedRead(lume_surfaceAttributed(${e0}, ${l3}))`},lH=o3(!1),r3=[];for(let F=0;F<(J.lighting.materialInputs?.length??0);F+=1)r3.push(`out_lightInput${F}`);let a3=(F)=>`out_${F}`,dH=CY("normalize(in.normalWorld)",A),nJ={N:"N",V:"V",P:"P",albedo:"albedo",roughness:"roughness",metalness:"metalness",emissive:"emissiveColor",...J.receiveShadow===!1||R0?.reception!==void 0?{receiveShadow:cJ}:{},toonSteps:"material.toonSteps",transmission:E8("transmission")?"out_transmission":"material.transmission",...y6?{sceneBehind:UN(l(K6),$.ior,q,a3)}:{},...g8?{occlusion:"out_ao"}:{},materialInputs:r3,attribute:l3,...$.normalNode?{geometryNormal:dH}:{},...s?{clearcoat:lJ,clearcoatRoughness:d3}:{},...s&&(q&T9)!==0?{clearcoatNormal:CY(XG("out_clearcoatNormal"),A)}:{},...q!==0?{physical:{features:q,term:a3}}:{}},iJ=R0?.lit!==void 0&&W0==="pbr"&&M0.defs.includes("fn lighting_ambientIrradiance(")&&M0.defs.includes("fn lighting_iblShIrradiance(")?R0.lit:void 0,k7=iJ?.call??(W0==="unlit"?n3:M0.litColor(nJ)),oJ=d4(J.lighting),rJ=R0?.fog===void 0?oC:`shade_applyFog(litColor + emissiveColor, ${R0.fog.viewZ}, ${R0.fog.toward})`;if(oJ)rJ="litColor + emissiveColor";let p6=T0&&!l9(f6)&&k7.startsWith("lighting_evaluate(N, V, P, ")?iQ(M0.defs,"P","N"):null,x7=T0&&p6===null&&k7.startsWith("lighting_evaluate(N, V, P, ")?oY(f6):null,aJ=x7===null?null:PK(M0.defs,x7.source,v.body,g3),nH=x7===null||aJ===null?null:new Map([[x7,aJ.query]]),sJ=G0&&(w3||v.inputsUsed.has("sceneDepth")),T7=G0&&!R8&&!sJ&&!e$&&K4($),L7=!e$&&G0&&($.blending==="normal"||$.blending==="none")&&!$8&&$.depthTest,s3=L7&&!T0&&!sJ&&J.pass.samples===1&&ID(v),_8=sJ||s3&&J.loopMarks===!0,y8=L7&&_8,A7=!oJ&&G0&&$.depthTest&&!R8&&!e$&&K4($),t3=y8&&J.pass.samples===1,Q8=nC($,J),e3=zN($.emissiveNode?"out_emissive":"(material.emissive * material.emissiveIntensity)",W0,E8("lightMap"),g8,C7,y6?nJ.transmission:null),P$={coverage:Q8,clip:H0===null?null:{line:iC(H0),shadows:H0.shadows},flags:x(A.materialBlocks,uq)|x(A.portalClip,pq)|x(mJ,cq)|x(A.laneCoverage,x4)|x(A.laneCoverageSeeded,T4)|x(A.laneHide,lq)|x($.alphaTest>0,n5)|x(O4(J),QJ)|x(T7,tq)|x(T0,i$)|x(A.flipBackNormal,L4)|x(A.normalFacingKept,A4)|x($.fog||oJ,B8)|x(G0,M8)|x($.viewOpacityNode!==null,I4)|x(w$!==null,dq)|x(y8,aq)|x(t3,sq)|x(j===null&&!A.lines&&(A.normalWorldV||J.instancing==="matrix"||J.skinned===!0),_9),slots:[A.pathCut,null,null,u6,mJ||Q8&&$.alphaTest>0?"var":"let",$.opacityNode?"out_opacity":"material.opacity",A.flash?`mix(${e3} + in.lumeFlash.rgb * ${U2.toFixed(2)}, in.lumeFlash.rgb * ${H2.toFixed(2)}, in.lumeFlash.w)`:e3,A.flipBackNormal?"var":"let",zD($,j,v),uJ,C7,R0?.unlit===void 0?k7:`select(${k7}, albedo, ${R0.unlit})`,$.viewOpacityNode||A7||O?"var":"let",$.blending==="multiply"?"mix(vec3<f32>(1.0), litColor + emissiveColor, viewKeep)":"litColor + emissiveColor",pJ,`  return FragmentOut(finalColor${D7?", vec4<f32>(lume_motionVector(in.motionCurrentClip, in.motionPreviousClip), 0.0, finalColor.a)":""}${w$===null?"":`, ${w$}`}${Q8?`, ${ZJ}`:""});`,w$,PY(lH,D7,Q8),R8?"1.0":"alpha",p6===null||p6.read===""?[]:[p6.read],$.blending==="none"?"  lume_cover = out_viewOpacity;":"  lume_cover = lume_cover * out_viewOpacity;",R0?.point??"in.positionRender",R0?.unlit===void 0?rJ:`select(${rJ}, litColor + emissiveColor, ${R0.unlit})`,A7?R4:null,A7?sC:null,null,null]};P$.slots[YD]=O?aC:null,P$.slots[KD]=M0.prelude?.(nJ)??null,P$.slots[qD]=A.flash?`mix(${u6}, in.lumeFlash.rgb, in.lumeFlash.w)`:u6;let Z8=UD(v.varyings);if(W7)Z8.unshift(`  let ${O9}: vec4<f32> = ${W7.wgsl};`);if(R0)Z8.unshift(...R0.lines);if(h0){let F=iP(S[h0.uv],h0.transform),I=`textureSample(${l(h0.texture).texture}, ${l(h0.texture).sampler}, ${F})`,Y0=J8.includes(h0.texture);Z8.unshift(`  let ${O9}: vec4<f32> = ${Y0?`lume_fbImplicit(${I}, ${F}, material.${y0(h0.texture)}, textureDimensions(${l(h0.texture).texture}, 0u))`:I};`)}let I7=fD(v,Z8,w),iH=I7?c9:Z8,oH=I7?I7.called:v.body,C$=(F,I=P$)=>J4(I,F,iH,oH),rH=C$(K0),tJ=C$(WJ),O7=$.dataNode!==null&&$.depthTest&&!_0?TD(tJ,w$,G0&&!R8):null,R7=J8.length>0?xD(tJ,J8.filter((F)=>hJ.includes(F)).map((F)=>`material.${y0(F)}`),w$):null,c6=null;if(y8)c6=[...Rj];else if(L7)c6=C$(nq);let eJ=L7?C$(F6):null,f8=$.depthTest&&v8&&!G0&&!$8,$Q=A.portalClip&&f8?C$(oq):null,JQ=J.eyesOwner===!0&&f8?C$(rq):null,$1=J.eyesThrough===!0&&!$8&&!_0?C$(K0|W$):null,b$=null,h8=null,J1=!1,Q1=C.stage===null?H.map((F)=>F.scope):[...H.map((F)=>F.scope),C.stage.scope],aH=Q1.length===0?null:aY(Q1),S7=(F)=>F?.arrays.some((I)=>I.shared!==void 0||aH?.has(I)===!0)===!0,sH=e!==null&&(e.inputsUsed.has("time")||e.inputsUsed.has("deltaTime")||S7(e)),Z1=e!==null&&B!==null?cP(e):e,X1=B===null?sH:sY([B],C8(L,[B]))||S7(e);if((!j||j.casts===!0&&!X1)&&!c$(x6(M$))){let F=j!==null&&(A.laneCoverage||A.pathCut.length>0),I=($.alphaTest>0||v.discards||F||T7||H0?.shadows===!0)&&!d9(v.modules),Y0=I,l0=v.inputsUsed.has("time")||v.inputsUsed.has("deltaTime")||m0?.inputsUsed.has("time")===!0||m0?.inputsUsed.has("deltaTime")===!0||S7(v)||S7(m0);b$={vertexEntry:"vsShadow",fragmentEntry:"fsShadow",coverFragmentEntry:I?"fsShadowCover":null,cuts:I,timeDriven:X1||I&&l0,cutReadsClock:I&&l0,...Y0?{fragmentIn:"shadowVertexWgsl"}:{}};let E$=I?A:MD(J,A,e),e0=I?v.varyings:[],u8=I?m0:null;if(u8!==null&&B!==null)u8={...u8,body:XX(u8.body,{out_position:lK})};h8={vsLines:j?MY(j,E$,e0,Z1,u8,I?P7:[],!1,!1,!0):u9(J,E$,e0,Z1,u8,"shadow"),fsLines:I?C$(p9):[],varyingsStruct:I?null:C6(f5(E$)),fragmentInCaster:Y0};let C1=I&&c$(v.modules);J1=!(j!==null||[...e?.inputsUsed??[]].some(iK)||I&&(v.discards||F||T7||C1||jC($,J.fragmentScope)))&&J.vertexLayout?.attributes.some((YW)=>YW.name==="layer")===!0;let D1=j===null?qC($,J,e,v,m0,I,!(v.discards||F||T7||C1)):[];if(D1.length>0)b$.castsWithout=D1}yield;let v7=[];for(let F=0;F<h6.length;F+=1){let I=h6[F].ref;v7.push(`@group(2) @binding(${Y4(D0.length,_8,F)}) var<storage, read> ${I.engine??f.name("storage",I.id)}: array<${O0(I.elementType)}>;`)}let w7=[];for(let F=0;F<D0.length;F+=1){let I=D0[F],Y0=`@group(2) @binding(${1+F*2}) var ${f.name("texture",I.id)}: ${NG(I)};`;w7.push(M7&&B7[F]?Y0:`${Y0}
@group(2) @binding(${2+F*2}) var ${f.name("sampler",I.id)}: sampler;`)}if(M7)w7.push(M7);let $0={material:$,opts:J,lit:T0,needs:A,writesDepth:$8,coverage:Q8,varyings:b8,varyingsStruct:C6(b8,!J.vertexPath||J.vertexPath.invariantPosition),materialStruct:m6,textures:D0,sceneDepth:_8,throughMarks:y8,storageDecls:v7,textureDecls:w7,materialGroup:[jG(m6,A.materialBlocks),...w7,...v7],drawGroup:VX(J,A),vertexInStruct:o4(J),vsParams:vK(J,A),modules:f6,lightingVocab:c$(f6),lightingQueries:l9(f6),tapsFromFoldDefs:T0&&$.shadingModel!=="matcap"&&J.lighting.foldDefsCarryClusterTaps===!0,shadingDefs:iJ===void 0?(p6??aJ??M0).defs:`${M0.defs}

${iJ.defs}`,litSources:nH,fnDefs:g3,vsLines:c3,fsLines:rH,fsDepthLines:tJ,fsThroughLines:c6,fsThroughCoverLines:eJ,waterOver:A7,fsMaterialDataLines:O7,fsSampleFeedbackLines:R7,fsApertureMaskLines:$Q,fsEyesOwnerLines:JQ,fsEyesThroughLines:$1,shadow:h8,surfaceDefs:I7?.defs??[]},QQ=!j&&e===null&&m0===null,ZQ=QQ?S4(A,$0.drawGroup,$0.vertexInStruct,$0.varyingsStruct,$0.vsParams,"vs",c3):void 0,l6;if(b$&&h8)if(h8.fragmentInCaster)l6=DY($0,M$,v);else if(e===null&&!b$.cuts&&!j){if(l6=YG(J,KX(J),"shadow",C6([])),PD(J))b$.positionsAlone=!0,delete b$.castsWithout}else if(QQ)l6=S4(A,$0.drawGroup,$0.vertexInStruct,h8.varyingsStruct??$0.varyingsStruct,$0.vsParams,"vsShadow",h8.vsLines);else{let F=b$.cuts?M$:[e].filter((I)=>I!==null);l6=DY($0,F)}let j1,V1=J.motion?b8.slice(0,b8.length-qY):b8;if(J.inkField===!0&&!j&&f8&&!_0&&H0===null&&GY(gK(V1))<=0){let F="vec3<f32>(0.0)";if(J.instancing==="matrix")F="instanceModel[3].xyz";else if(J.skinned)F=K5;let I=u9({...J,motion:!1},A,v.varyings,e,m0,"frame",!1,["  vsOut.lume_ink = ink_field(vsOut.position.w, lume_inkRecord.w);",`  vsOut.lume_inkObject = ink_objectId(${F});`]);j1=M6(WD({...$0,varyings:V1},I,J4(P$,i5,Z8,v.body),n9(v.body)),A.normalFace)}yield;let tH=M6(ND($0,ZQ===void 0),A.normalFace),XQ=CD($0,e);yield;let jQ=s$.map((F,I)=>OY(m6,F,H[I].workgroupSize));if(t$!==null)jQ.push(qN(m6,t$));if(O8!==null&&C.stage!==null)jQ.push(OY(m6,O8,C.stage.workgroupSize));let{texts:{module:Y1,vertex:eH,caster:$W,position:K1,compute:b7,inkField:JW},layout:QW,read:q1}=FV(a,cH,{module:tH,vertex:ZQ,caster:l6,position:XQ?.program,compute:jQ,inkField:j1}),VQ=(F)=>F===void 0||!A.materialBlocks?F:R9(F),E7=A.materialBlocks?(F)=>R9(q1(F)):q1,d6=j?.fragmentCut?.entries,G1=A.pathCut.length>0&&d6!=="plain",Y$=aZ(A.materialBlocks?R9(Y1):Y1,A.pathCut,d6),z1=Y$.text,n6=VQ(eH),i6=VQ($W),U1=VQ(JW);yield;let YQ=zX($,J),m8="back";if($.side==="double"&&!j?.cullsBack||YQ)m8="none";else if($.side==="back")m8="front";let ZW=J.pass.depthFormat?{format:J.pass.depthFormat,depthWriteEnabled:v8,depthCompare:$.depthTest?t6:"always",...YQ?{}:EY(h4($)??void 0)}:void 0,g7=T0||W0==="unlit"?SD(W0,J,f8,$,$0):void 0,XW=T0&&g7===void 0,H1=(T0||W0==="unlit")&&g7===void 0,o6;if(!J.vertexPath&&!$8)if($.alphaTest>0||v.discards||H0!==null){let F=Y4(D0.length,_8,v7.length);o6=P8(()=>({wgsl:E7(M6(vD($0,J4(P$,iq,Z8,v.body),n9(v.body),F,XW),A.normalFace)),fragmentEntry:r5,binding:F}))}else if(QQ)o6=P8(function(){let F=bD(J,A);return{wgsl:E7(F.fragment),vertexWgsl:E7(F.vertex),fragmentEntry:r5,binding:M5,lane:!0}});else o6=P8(()=>({wgsl:MG(A,$0.varyingsStruct),fragmentEntry:r5,binding:M5,lane:!0}));let KQ=(F,I,Y0,l0,E$,e0)=>E7(M6(AD(I,C$(T6,F),ZQ===void 0,Y0,l0,E$,e0),A.normalFace)),W1=function(F,I){let Y0={...P$,slots:[...P$.slots]};return Y0.slots[QD]=PY(F,I,Q8),Y0},qQ;if(H1)qQ=P8(function(){let F=aZ(KQ(P$,$0,s,g8,i3),A.pathCut,d6),I=F.text;return{wgsl:I,fragmentEntry:F.named("fsSurface"),depthEntry:F.named("fsDepth"),...$Q?{apertureMaskEntry:F.named("fsApertureMask")}:{},...JQ?{eyesOwnerEntry:F.named("fsEyesOwner")}:{},...O7?{materialDataEntry:F.named(N9)}:{},...R7?{sampleFeedbackEntry:F.named(P6)}:{},...s?{coated:!0}:{},...dJ!==null?{ownLight:dJ}:{},keyParts:gD(Q4($,J,g0,v8,m8,I,n6,i6),D7)}});let _7;if(T0&&RD(W0,J,$,$0,G0,e$||_8||y8,$8)===void 0&&!R8)_7=P8(function(){let F=tC($0.waterOver,R0?.fog?.viewZ??"-(frame.view * vec4<f32>(in.positionRender, 1.0)).z",R0?.fog?.toward??B6),I=KQ(W1(o3(!0),D7),$0,s,g8,!1,F);return{wgsl:I,colourEntry:"fsSeeThrough",surfaceEntry:"fsSeeThroughSurface",...c6?{throughDepthEntry:P5}:{},...eJ?{throughCoverEntry:C5}:{},...O7?{materialDataEntry:N9}:{},...R7?{sampleFeedbackEntry:P6}:{},...s?{coated:!0}:{},keyParts:[...Q4($,J,g0,v8,m8,I,n6,i6),"see-through"]}});let GQ;if(T0&&!H1&&f8&&!j&&J.pass.samples===1&&D6($)&&FG(W0,$)&&!$0.lightingQueries&&!d9($0.modules))GQ=P8(function(){let F=W1(`lume_surfaceOut(N, albedo, ${uJ}, ${C7}, ${cJ}, emissiveColor)`,!1);return aZ(KQ(F,{...$0,opts:{...$0.opts,motion:!1}},!1,!1,!1),A.pathCut,d6).text});let zQ=[],F1=t$===null?null:{wgsl:A.materialBlocks?R9(b7[s$.length]):b7[s$.length],family:t$.family,storages:l$(v3,"storages")},B1=(F,I,Y0)=>({wgsl:A.materialBlocks?R9(Y0):Y0,entryPoint:"main",workgroupSize:I.workgroupSize,count:I.count,storages:F.storages,arrays:F.arrays,textures:F.textures,storeTextures:F.storeTextures,wholeWorkgroups:F.barriers||aD.some((l0)=>F.inputsUsed.has(l0))});for(let F=0;F<s$.length;F+=1)zQ.push(B1(s$[F],H[F],b7[F]));let M1=O8===null||C.stage===null?null:{...B1(O8,C.stage,b7[s$.length+(t$===null?0:1)]),buffer:C.stage.buffer},jW=Q4($,J,g0,v8,m8,z1,n6,i6),y7=T0&&J.lighting.discards===!0,P1=$.alphaTest>0||v.discards||y7||A.laneCoverage||A.portalClip||$8||H0!==null,VW=M0.declaredFolds|($0.lightingQueries&&!$0.tapsFromFoldDefs?CK():0);return{wgsl:z1,declaredFolds:VW,...J.motion?{motion:!0}:{},...yJ?{modelMaterial:!0}:{},...fJ?{skinnedModel:!0}:{},...A.flatWeld?{flatWeld:!0}:{},...J1?{casterWelds:!0}:{},...S8?{nativeVertexInputs:S8.surface}:{},...n6?{vertexWgsl:n6}:{},...XQ&&K1!==void 0?{vertexPositionProgram:K1,vertexPositionInputs:XQ.inputs}:{},...i6?{shadowVertexWgsl:i6}:{},uniformLayout:QW,textures:D0,textureVertexReads:D0.map((F)=>hJ.includes(F)),...M7?{sharedSamplers:B7}:{},symbols:BN(f),varyings:b8,vertexEntry:"vs",fragmentEntry:Y$.named("fs"),...$Q?{apertureMaskEntry:Y$.named("fsApertureMask")}:{},...JQ?{eyesOwnerEntry:Y$.named("fsEyesOwner")}:{},...$1?{eyesThroughEntry:Y$.named("fsEyesThrough")}:{},...U1!==void 0?{inkField:{wgsl:U1,vertexEntry:"vsInkField",fragmentEntry:"fsInkField"}}:{},...o6?{outlineMask:o6}:{},...qQ?{surfaceBuffer:qQ}:{},..._7?{seeThrough:_7}:{},...GQ?{lookPlane:GQ}:{},..._7&&u6==="material.color"&&$._surfaceMap===null?{albedoIsColour:!0}:{},...g7!==void 0?{lightOnceRefusal:g7}:{},depthEntry:Y$.named("fsDepth"),...c6?{throughDepthEntry:Y$.named(P5)}:{},...eJ?{throughCoverEntry:Y$.named(C5)}:{},...O7?{materialDataEntry:Y$.named(N9)}:{},...R7?{sampleFeedbackEntry:Y$.named(P6)}:{},shadow:b$,blend:g0,..._0?{colourless:!0}:{},depthStencil:ZW,cullMode:m8,...YQ?{wireframe:!0}:{},pipelineKeyParts:jW,writesVertexPosition:e!==null||J.skinned===!0,...A.vertexIndex?{readsVertexIndex:!0}:{},discards:P1||G1,...d6!==void 0?{discardsUncut:P1}:{},...y7?{lightingDiscards:!0}:{},...$.alphaTest>0||v.discards||y7||H0!==null?{ownCuts:!0}:{},doorWord:A.laneHide,materialBlocks:A.materialBlocks,sceneDepth:_8,throughMarks:y8,...s3?{loopMarks:!0}:{},...t3?{throughOccluded:!0}:{},...R8?{coversWhole:!0}:{},...f8&&$.alphaTest<=0&&!Q8&&!v.discards&&!y7&&!G1&&H0===null&&!_0?{hidesBehind:!0}:{},...O4(J)?{cutsWord:!0}:{},sceneColor:e$,...y6?{sceneColorMips:!0}:{},...h6.length>0?{storages:h6}:{},...y3.length>0?{arrays:y3}:{},...zQ.length>0?{compute:zQ}:{},...F1!==null?{points:F1}:{},...M1!==null?{copies:M1}:{}}}function GN($,J){if(!$&&!J)return"albedo";return`(albedo${$?` * out_lightMap * ${e6}`:""}${J?" * out_ao":""})`}function zN($,J,Q,Z,X,j){if(!Q||J==="unlit"||J==="matcap")return $;let V=J==="pbr"||J==="physical"?` * (1.0 - ${X})`:"",Y=j===null?"":` * (1.0 - clamp(${j}, 0.0, 1.0))`;return`(${$} + albedo${V}${Y} * out_lightMap * ${e6}${Z?" * out_ao":""})`}function UN($,J,Q,Z){let X=`min(max(roughness, ${qK}), 1.0)`;if((Q&O5)!==0)return GK(Q,$,`${X} * clamp(2.0 * ${Z("ior")} - 2.0, 0.0, 1.0)`,{N:"N",V:"V",P:"P"},Z);let j=IK(J),V=X;if(j===0)V="0.0";else if(j!==1)V=`${X} * ${j}`;return`shade_transmissionSample(${$.texture}, ${$.sampler}, in.position.xy / frame.viewportSize, ${V})`}function HN($,J){let Q=LG($,J);for(;;){let Z=Q.next();if(Z.done===!0)return Z.value}}var w4={sample:{name:"lume_shareSample",texture:"texture_2d<f32>",params:"uv: vec2<f32>",args:"uv",read:"textureSample"},level:{name:"lume_shareSampleLevel",texture:"texture_2d<f32>",params:"uv: vec2<f32>, lod: f32",args:"uv, lod",read:"textureSampleLevel"},sampleArray:{name:"lume_shareSampleArray",texture:"texture_2d_array<f32>",params:"uv: vec2<f32>, layer: i32",args:"uv, layer",read:"textureSample"},levelArray:{name:"lume_shareSampleLevelArray",texture:"texture_2d_array<f32>",params:"uv: vec2<f32>, layer: i32, lod: f32",args:"uv, layer, lod",read:"textureSampleLevel"}};function WN($,J,Q,Z){let X=new Set,j=[];for(let Y=0;Y<$.length;Y+=1){if(!J[Y])continue;let K=Q.standing("texture",$[Y].id),G=Q.standing("sampler",$[Y].id);if(K===void 0||G===void 0)continue;let q=$[Y].dimension==="2d-array",z=LK(Y),H=q?"sampleArray":"sample",U=q?"levelArray":"level";j.push([`textureSample(${K}, ${G}, `,`${w4[H].name}(${K}, ${z}, `,H]),j.push([`textureSampleLevel(${K}, ${G}, `,`${w4[U].name}(${K}, ${z}, `,U])}let V=function(Y){let K=Y;for(let[G,q,z]of j){if(!K.includes(G))continue;K=K.split(G).join(q),X.add(z)}return K};for(let Y of Z)Y.body=V(Y.body),Y.fnDefs=V(Y.fnDefs);return X}function FN($,J){let Q=$.slots.map((Z,X)=>`@group(2) @binding(${Z}) var lume_share${X}: sampler;`);Q.push(`@group(2) @binding(${$.words}) var<uniform> lume_samplerSlots: vec4<u32>;`);for(let Z of J){let X=w4[Z],j=(Y)=>`return ${X.read}(t, lume_share${Y}, ${X.args});`,V=[];for(let Y=1;Y<xK;Y+=1)V.push(`    case ${Y}u: { ${j(Y)} }`);Q.push(`fn ${X.name}(t: ${X.texture}, slot: u32, ${X.params}) -> vec4<f32> {
  switch slot {
${V.join(`
`)}
    default: { ${j(0)} }
  }
}`)}return Q.join(`
`)}function BN($){let J=function(Q,Z){let X=$.standing(Q,Z);if(X===void 0)throw Error(`lume: this material module binds no ${Q} ${Z}`);return X};return{uniform:(Q)=>J("uniform",Q),texture:(Q)=>({texture:J("texture",Q),sampler:J("sampler",Q)})}}var OG=IG;function LN($){let J=0.983729*$-1,Q=0.432951*$-0.0245786,Z=0.238081*$+0.000090537;return(-Q-Math.sqrt(Math.max(Q*Q-4*J*Z,0)))/(2*J)}var AN=LN(0),$l=0.6*AN;var IN={aces:0,neutral:1,none:2,linear:-4,reinhard:-1,cineon:-2,agx:-3},Jl=new Map(Object.entries(IN));function RG($){return $<=0.0031308?$*12.92:Math.pow($,0.41666)*1.055-0.055}var s0=Z$(AQ);var SG=new WeakMap;var ON=0.21404114048223255,vG=RG(ON);var uG=0.01;var RN=2,pG=30,HX=[0.2126,0.7152,0.0722],SN=[0.74,0.81,0.88],PJ=0.00001;var FJ=0.5,vN=2,wN=0.45;var N8=6.333333333333333,cG=2*N8,NX=1.5;function bN($){let J=$*cG;return Math.exp(-0.5*J*J/(N8*N8))}var PX=2.39996323,CX=(function(){let $=[],J=80;for(let Q=0;Q<80;Q+=1){if(Q%5===0)continue;let Z=Q*PX,X=Math.sqrt(Q)/Math.sqrt(80);$.push([X*Math.cos(Z),X*Math.sin(Z)])}return $})(),EN={low:16,medium:24,high:32,ultra:64},wG=new Map;function gN($){let J=EN[$??"ultra"];if(J>=CX.length)return CX;let Q=wG.get(J);if(!Q)Q=Array.from({length:J},function(Z,X){let j=Math.sqrt((X+0.5)/J);return[j*Math.cos(X*PX),j*Math.sin(X*PX)]}),wG.set(J,Q);return Q}var _N=FQ,bG=Z$(`
fn lume_motion_blur_sky_velocity(uv: vec2<f32>) -> vec2<f32> {
  let ndc = vec2<f32>(uv.x * 2.0 - 1.0, 1.0 - uv.y * 2.0);
  let far = frame.inverseViewProj * vec4<f32>(ndc, 0.0, 1.0);
  let direction = far.xyz - frame.cameraPosition * far.w;
  let prev = frame.prevViewProj * vec4<f32>(direction, 0.0);
  if (prev.w <= 1e-6 || frame.motionValid < 0.5) { return vec2<f32>(0.0); }
  return ndc - prev.xy / prev.w;
}
fn lume_look_eye_velocity(uv: vec2<f32>, depth: f32) -> vec2<f32> {
  if (depth <= ${k8}) { return lume_motion_blur_sky_velocity(uv); }
  if (frame.motionValid < 0.5) { return vec2<f32>(0.0); }
  let ndc = vec2<f32>(uv.x * 2.0 - 1.0, 1.0 - uv.y * 2.0);
  let point = frame.inverseViewProj * vec4<f32>(ndc, depth, 1.0);
  let prev = frame.prevViewProj * vec4<f32>(point.xyz / point.w, 1.0);
  if (prev.w <= 1e-6) { return vec2<f32>(0.0); }
  return ndc - prev.xy / prev.w;
}
`);function lG($,J,Q){let Z=$.depth?.sampleLevel(J,0).r;if(!Q)return Z?u(bG,"lume_look_eye_velocity",[J,Z],"vec2f").mul(j0(0.5,-0.5)):j0(0,0);let j=($.velocity??a$(null)).sampleLevel(J,0).xy;if(Z)j=p0(Z.lessThanEqual(_N),u(bG,"lume_motion_blur_sky_velocity",[J],"vec2f"),j);let V=($.motionAvailable??i(1)).mul(c("f32")`frame.motionValid`);return j.mul(j0(0.5,-0.5)).mul(V)}function CJ($,J,Q){if(!$.resolve||$.scene===void 0||J===$.scene)return $.frame;return $.resolve(J,Q)}function t($,J){if(typeof $==="number")return i(o($)?$:J);return $??i(J)}function BJ($,J){if(typeof $==="number"||$===void 0||$ instanceof B0)return t($,J);let Q=function(Z){let X=$[Z];return o(X)?X:J};return P0(Q(0),Q(1),Q(2))}var R$=()=>c("vec2f")`frame.viewportSize`,DJ=($,J)=>$.type==="vec4f"?O$(J($.rgb),$.a):J($);function O6($,J,Q){let Z=$.toVar();return t0(J,function(){Z.assign(Q(Z))}),Z}function dG($,J,Q){return O6($,Q.greaterThanEqual(PJ),(Z)=>DJ(Z,function(X){let j=u(s0,"lume_srgb_encode",[L0(X,0)],"vec3f");return u(s0,"lume_srgb_decode",[L0(k$(j,J,Q),0)],"vec3f")}))}function yN($,J){return O6($,$7(J.sub(1)).greaterThanEqual(PJ),(Q)=>DJ(Q,function(Z){let X=u(s0,"lume_srgb_encode",[L0(Z,0)],"vec3f"),j=x0(X.sub(vG).mul(J).add(vG),0,1);return u(s0,"lume_srgb_decode",[j],"vec3f")}))}var WX=($)=>$.type==="vec3f"?I6($7($),P0(1,1,1)):$7($);function fN($,J,Q,Z){let X=WX(J).add(WX(Z.sub(1))).add(WX(Q.sub(1)));return O6(x0($,0,1),X.greaterThanEqual(PJ),(j)=>DJ(j,function(V){let Y=u(s0,"lume_srgb_encode",[V],"vec3f"),K=x0(Y.mul(Z.sub(J)).add(J),0,1),G=A6(K,i(1).div(L0(Q,uG)));return u(s0,"lume_srgb_decode",[G],"vec3f")}))}function hN($,J,Q,Z){let X=x0($.add(J),0,1),j=L0(i(1).add(Q),uG),V=A6(X,i(1).div(j));return x0(V.mul(i(1).add(Z)),0,1)}var FX=($,J)=>$===void 0||$===J||Array.isArray($)&&$.length>0&&$.every((Q)=>Q===J);function nG($,J){if($===void 0)return J<=0;return typeof $==="number"&&(!o($)?J<=0:$<=0)}function mN($,J,Q){let Z=L0($,0);if(Q===void 0||Q===1)return Z;return O6(Z,$7(J.sub(1)).greaterThanEqual(PJ),(X)=>DJ(X,function(j){let V=c("f32")`frame.toneMap`,Y=j.toVar();return t0(V.lessThan(-0.5),function(){t0(V.lessThan(-3.5),function(){Y.assign(j.mul(L0(J,0)))}).ElseIf(V.lessThan(-2.5),function(){Y.assign(u(s0,"lume_agx_reexpose",[j,J],"vec3f"))}).ElseIf(V.lessThan(-1.5),function(){Y.assign(u(s0,"lume_cineon_reexpose",[j,J],"vec3f"))}).Else(function(){Y.assign(u(s0,"lume_reinhard_reexpose",[j,J],"vec3f"))})}).Else(function(){Y.assign(u(s0,"lume_tone_reexpose",[j,J,V],"vec3f"))}),Y}))}function uN($,J={},Q,Z,X,j=!0){let V=X===yG,Y=t(J.exposure,1),K=t(J.saturation,1),G=t(J.contrast,1),q=t(J.brightness,0),z=BJ(J.lift,0),H=BJ(J.gamma,V?0:1),U=BJ(J.gain,V?0:1),W=t(J.temperature,0),M=t(J.tint,0),P=t(J.haze,0),C=J.hazeColor??Z??SN,D=C instanceof B0?C:P0(C[0],C[1],C[2]),B=P0(HX[0],HX[1],HX[2]),N=mN($,Y,J.exposure),T=I6(N,B),L=k$(P0(T,T,T),N,K),k=(j?yN(L,G):L).add(q),R=FX(J.lift,0)&&FX(J.gamma,1)&&FX(J.gain,1),w;if(V)w=hN(k,z,H,U);else w=R?x0(k,0,1):fN(k,z,H,U);let p=i(1).add(W.mul(FJ)),f=i(1).sub(W.mul(FJ)),a=i(1).add(M.mul(FJ)),l=i(1).sub(M.mul(FJ*0.5)),U0=x0(P0(w.x.mul(p).mul(l),w.y.mul(a),w.z.mul(f).mul(l)),0,1),y0=Q?x0(P,0,1).mul(rN(Q).smoothstep(RN,pG)):x0(P,0,1),g0=nG(J.haze,0)?U0:dG(U0,D,y0);return x0(g0,0,1)}function pN($,J=0.3,Q=0.6,Z=1){return $}function cN($,J=0.3,Q={}){let Z=t(Q.roundness,vN),X=t(Q.feather,wN),j=z8().mul(2).sub(1),Y=A6(A6(j.x.abs(),Z).add(A6(j.y.abs(),Z)),i(1).div(Z)).smoothstep(i(1).sub(X),1),K=x0(t(J,0.3).mul(Y),0,1),G=Q.color instanceof B0?Q.color:BJ(Q.color??[0,0,0],0);return x0(dG($,G,K.mul(K)),0,1)}function lN($){return I6($,j0(12.9898,78.233)).mod(S0).sin().mul(43758.5453).fract()}function EG($,J=0.2){let Q=t(J,0.2);return O6($,Q.notEqual(0),function(Z){let X=lN(z8().add(hG).fract());return k$(Z,Z.add(Z.mul(x0(X.add(0.1),0,1))),Q)})}function dN($,J,Q=0.5){let Z=CJ($,J,"chromaticAberration"),X=t(Q,0.5),j=i(1.1),V=j0(0.5,0.5),K=k0.sub(V),G=K.length(),q=i(1).add(j.mul(0.02).mul(X)),z=i(1).sub(j.mul(0.02).mul(X)),H=X.mul(G),U=V.add(K.mul(q)).add(K.mul(H).mul(0.01)),W=V.add(K),M=V.add(K.mul(z)).add(K.mul(H).mul(-0.01)),P=Z.sampleLevel(U,0).r,C=Z.sampleLevel(W,0).g,D=Z.sampleLevel(M,0).b;return P0(P,C,D)}function nN($,J=1.57,Q=1){let Z=t(J,1.57),X=t(Q,1),j=Z.sin(),V=Z.cos(),Y=z8().mul(R$()),K=j0(V.mul(Y.x).sub(j.mul(Y.y)),j.mul(Y.x).add(V.mul(Y.y))).mul(X),G=K.x.sin().mul(K.y.sin()).mul(4),z=$.r.add($.g).add($.b).div(3).mul(10).sub(5).add(G);return P0(z,z,z)}function iN($,J=0.5,Q=240){let Z=t(J,0.5);return O6($,Z.notEqual(0),function(X){let j=z8().y.mul(t(Q,240).mul(S0)).sin().mul(0.5).add(0.5);return X.mul(i(1).sub(j.mul(Z)))})}var oN=Z$(`
${mG}
${p7}
fn lume_look_door_view_distance(d: f32, t: f32) -> f32 {
  let ratio = clamp(select(t, t - 0.5 - APERTURE_TIER_GAP, t >= 0.5) / (0.5 - APERTURE_TIER_GAP), 0.0, 1.0);
  let far = frame.proj[3][2] / max(frame.proj[2][2], 1e-9 * ${MX});
  let farRatio = select(d / max(far, d), 0.0, frame.proj[2][2] <= 0.0);
  return select(d / max(ratio, farRatio), d, t <= 0.0);
}
fn lume_look_view_z_through_door(zPhysical: f32, zScene: f32, viewZ: f32) -> f32 {
  if (zPhysical <= 0.0 || frame.sort2d > 0.5 || lume_aperture_has_no_band(zPhysical)) { return viewZ; }
  let share = ${MX};
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
`);function rN($){return c("f32")`select(-(${$}), ${i(pG)}, frame.sort2d > 0.5)`}var Nl=oN.source;function aN($,J,Q,Z=10,X=5,j=1){let Y=Q.negate().sub(t(Z,10)).abs().smoothstep(0,t(X,5)),K=j0(i(1).div(R$().x),i(1).div(R$().y)).mul(t(j,1)).mul(Y),G=CJ($,J,"dof"),q=gN($.quality),z=G.sampleLevel(k0,0).rgb;for(let[W,M]of q)z=z.add(G.sampleLevel(k0.add(K.mul(j0(W,M))),0).rgb);let H=z.div(q.length+1),U=x0(Y.mul(2),0,1);return k$(J,H,U)}function sN($,J,Q=4){let Z=CJ($,J,"pixelate"),X=L0(t(Q,4),1),j=c("f32")`frame.gridShare`,V=p0(j.lessThan(1),L0(VJ(X.mul(j)),1),X),K=k0.mul(R$()).div(V).floor().mul(V).add(V.mul(0.5)).div(R$()),G=Z.sampleLevel(K,0);return SG.set(G,Q),G.rgb}function gG($,J=1,Q=1,Z=1,X=0.5){if(nG(X,0.5))return $;let j=u(s0,"lume_srgb_decode",[L0(P0(t(J,1),t(Q,1),t(Z,1)),0)],"vec3f");return $.mul(k$(P0(1,1,1),j,x0(t(X,0.5),0,1)))}var DX=18,tN=0.0625;function _G($){let J=0;for(let Q=-DX;Q<=DX;Q+=1)J+=Math.exp(-0.5*Q*Q/(N8*N8));return Math.exp(-0.5*$*$/(N8*N8))/J}function eN($){if($===null||!o($))return 1;let J=$*NX;if(!(J>1))return 1;return Math.max(tN,2**-Math.ceil(Math.log2(J)))}function $k($){if(typeof $==="number")return $;let J=$.meta;if(J.kind!=="uniform")return null;let Q=J.slot.value;return typeof Q==="number"?Q:null}function Jk($,J,Q,Z){let X=Math.round(1/Z),j=j0(i(1).div(R$().x),i(1).div(R$().y)),V=$("blur.grid",Z,function(H){let U=Math.max(1,X/2),W=null;for(let M=0;M<U;M+=1)for(let P=0;P<U;P+=1){let C=j0(X===1?0:1+2*P-X/2,X===1?0:1+2*M-X/2),D=J.sampleLevel(H.add(C.mul(j)),0).rgb;W=W===null?D:W.add(D)}return O$(W===null?P0(0):W.div(U*U),1)});if(V===null)return null;let Y=t(Q,0.5).mul(NX),K=(H,U)=>function(W){let M=U.mul(Y),P=H.sampleLevel(W,0).rgb.mul(_G(0));for(let C=1;C<=DX;C+=1){let D=_G(C);P=P.add(H.sampleLevel(W.add(M.mul(C)),0).rgb.add(H.sampleLevel(W.sub(M.mul(C)),0).rgb).mul(D))}return O$(P,1)},G=$("blur.across",Z,K(V,j0(j.x,0)));if(G===null)return null;let q=$("blur.down",Z,K(G,j0(0,j.y)));if(q===null)return null;let z=x0(Y.mul(Z*2),0,1);return k$(J.sampleLevel(k0,0).rgb,q.sampleLevel(k0,0).rgb,z)}function Qk($,J,Q=0.5){let Z=CJ($,J,"blur"),X=eN($k(Q));if(X<1&&$.hiddenPass){let K=Jk($.hiddenPass,Z,t(Q,0.5),X);if(K!==null)return K}let j=j0(i(1).div(R$().x),i(1).div(R$().y)).mul(t(Q,0.5).mul(NX*cG)),V=Z.sampleLevel(k0,0).rgb,Y=1;for(let[K,G]of CX){let q=bN(SQ(K,G));V=V.add(Z.sampleLevel(k0.add(j.mul(j0(K,G))),0).rgb.mul(q)),Y+=q}return V.div(Y)}var iG='ctx.param() returns a shader NODE \u2014 use it inside shader expressions, not JS arithmetic (1 - 0.34 * dim is NaN when dim is a node). Compute in node space instead \u2014 float(1).sub(dim.mul(0.34)), with float from require("builtin/tsl") \u2014 or pass the param node straight through.';function J7($){if($===null)return"null";if($===void 0)return"undefined";if($ instanceof B0)return"a shader node";if(Array.isArray($))return"an array";if(typeof $==="string")return`a string (${JSON.stringify($)})`;if(typeof $==="boolean")return`a boolean (${String($)})`;return`a ${typeof $}`}function I$($,J,Q){throw Error(`${$}: ${J} ${Q}`)}function z0($,J,Q){if(Q===void 0||Q instanceof B0)return;if(typeof Q==="number"){if(o(Q))return;I$($,J,`is ${String(Q)}. ${iG}`)}I$($,J,`must be a plain number or a shader node (a ctx.param() / builtin/tsl expression), got ${J7(Q)}.`)}function BX($,J,Q){let Z=fG(Q);if(!Z)I$($,J,`is not a colour (${JSON.stringify(Q)}) \u2014 write oklch("oklch(0.7 0.15 60)"), a CSS hex ("#ff8800"), rgb("rgb(255 136 0)"), hsl("hsl(30 100% 50%)"), a CSS colour name ("coral"), or an [r, g, b] literal.`);return[Z.r,Z.g,Z.b]}function oG($,J,Q){if(!Array.isArray(Q)){z0($,J,Q);return}for(let Z=0;Z<Q.length;Z+=1){let X=Q[Z];if(o(X))continue;if(X instanceof B0)I$($,`${J}[${Z}]`,"is a shader node \u2014 build the whole color as ONE vec3 node (vec3(r, g, b) from builtin/tsl), or pass a plain [r, g, b] literal.");if(typeof X==="number")I$($,`${J}[${Z}]`,`is ${String(X)}. ${iG}`);I$($,`${J}[${Z}]`,`must be a plain number, got ${J7(X)}.`)}}function V$($,J,Q="color (the first argument)"){if(J instanceof B0)return;I$($,Q,`must be a color node \u2014 pass ctx.scene or a chained builtin/postfx result, got ${J7(J)}.`)}function MJ($,J,Q){if(Q===void 0)return;if(typeof Q!=="object"||Q===null||Array.isArray(Q)||Q instanceof B0)I$($,"options",`must be an options object like ${J}, got ${J7(Q)}.`)}var Zk=["exposure","saturation","contrast","brightness","temperature","tint","haze"],Xk=["lift","gamma","gain","hazeColor"];function jk($){if(MJ("grade","{ exposure: 1.05 }",$),!$)return;for(let J of Zk)z0("grade",`option "${J}"`,$[J]);for(let J of Xk)oG("grade",`option "${J}"`,$[J])}function Vk($){if(MJ("vignette","{ color: [0.02, 0.02, 0.05] }",$),!$)return;z0("vignette",'option "roundness"',$.roundness),z0("vignette",'option "feather"',$.feather),oG("vignette",'option "color"',$.color)}function rG($){return{grade:function(J,Q){V$("grade",J),MJ("grade","{ exposure: 1.05 }",Q);let Z=Q?{...Q,hazeColor:typeof Q.hazeColor==="string"?BX("grade",'option "hazeColor"',Q.hazeColor):Q.hazeColor}:void 0;return jk(Z),uN(J,Z,$.hazeViewZ??$.viewZ,$.air,$.grammar)},bloom:(J,Q,Z,X)=>pN(J,Q,Z,X),vignette:function(J,Q,Z){V$("vignette",J),z0("vignette","intensity",Q),MJ("vignette","{ color: [0.02, 0.02, 0.05] }",Z);let X=Z?{...Z,color:typeof Z.color==="string"?BX("vignette",'option "color"',Z.color):Z.color}:void 0;return Vk(X),cN(J,Q,X)},grain:function(J,Q){return V$("grain",J),z0("grain","intensity",Q),EG(J,Q)},film:function(J,Q){return V$("film",J),z0("film","intensity",Q),EG(J,Q)},chromaticAberration:function(J,Q){return V$("chromaticAberration",J),z0("chromaticAberration","strength",Q),dN($,J,Q)},dotScreen:function(J,Q,Z){return V$("dotScreen",J),z0("dotScreen","angle",Q),z0("dotScreen","scale",Z),nN(J,Q,Z)},scanlines:function(J,Q,Z){return V$("scanlines",J),z0("scanlines","intensity",Q),z0("scanlines","count",Z),iN(J,Q,Z)},dof:function(J,Q,Z,X,j){if(V$("dof",J),!(Q instanceof B0))I$("dof","viewZ (the second argument)",`must be ctx.viewZ (the pass's linearized depth node), got ${J7(Q)}.`);return z0("dof","focusDistance",Z),z0("dof","focusRange",X),z0("dof","bokehScale",j),aN($,J,Q,Z,X,j)},pixelate:function(J,Q){return V$("pixelate",J,"scene (the first argument)"),z0("pixelate","size",Q),sN($,J,Q)},tint:function(J,Q,Z,X,j){if(V$("tint",J),typeof Q==="string"){let V=BX("tint","color (the second argument)",Q);return z0("tint","amount",Z),gG(J,V[0],V[1],V[2],Z)}return z0("tint","r",Q),z0("tint","g",Z),z0("tint","b",X),z0("tint","amount",j),gG(J,Q,Z,X,j)},blur:function(J,Q){return V$("blur",J,"scene (the first argument)"),z0("blur","amount",Q),Qk($,J,Q)}}}var S$=Z$(`
${sG}
${tG}
${eG}
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
  if (surfaceDepth != sceneDepth || lume_surfaceKind(words) == ${aG+8}u) {
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
`);var kX=8,xX=4;var TX=18;var $z=16,Jz=10,Al=Math.ceil(29),LX=-32768;var AX=12;var Yk=xX*xX;var f0={shape:1,matters:2,tile:3,things:4,thingRows:5,drop:6,land:7,forget:8,room:9,announce:10,reach:11,eye:12,move:13,change:15,cellsText:21,cellsFill:22,cellsBodies:23,cellsAsk:24,cellsClock:25,cellsHeads:26};var Kk=8,qk=20;var vl=kX*kX/2;var Qz=0.5,Zz=8;var bl=qk+Yk*Kk;var Gk=24,zk=new Uint16Array(0);var Uk=function($){if($.byteLength<20)return null;let J=$.getUint32(8,!0);if(20+J*4>$.byteLength)return null;let Q=new Uint32Array(J);for(let Z=0;Z<J;Z+=1)Q[Z]=$.getUint32(20+Z*4,!0);return{kind:f0.change,epoch:$.getUint32(4,!0),words:Q,fold:$.getFloat64(12,!0)}};var Hk=function($){let J=$.getUint16(22,!0),Q=J===0?zk:new Uint16Array(J);for(let Z=0;Z<J;Z+=1)Q[Z]=$.getUint16(Gk+Z*2,!0);return{kind:f0.land,shell:$.getUint8(2),epoch:$.getUint32(4,!0),tx:$.getInt32(8,!0),tz:$.getInt32(12,!0),fill:$.getUint32(16,!0),first:$.getUint16(20,!0),to:Q}},Wk=function($){if($.byteLength<8)return null;let J=$.getInt32(4,!0);return{kind:f0.room,cap:J<0?null:J,scale:1-$.getUint16(2,!0)/65535}},Fk=function($){let J=[];for(let Q=0,Z=$.getUint16(2,!0);Q<Z;Q+=1)J.push($.getUint32(4+Q*4,!0));return{kind:f0.forget,fills:J}},Bk=function($){if($.byteLength<8)return null;let J=$.getFloat32(4,!0);return{kind:f0.reach,top:Number.isFinite(J)?J:null}},Mk=function($){if($.byteLength<3)return null;if($.getUint8(2)===0||$.byteLength<36)return{kind:f0.eye,at:null};return{kind:f0.eye,at:{x:$.getFloat64(4,!0),y:$.getFloat64(12,!0),z:$.getFloat64(20,!0),hold:$.getFloat64(28,!0)}}},El={[f0.land]:Hk,[f0.forget]:Fk,[f0.room]:Wk,[f0.reach]:Bk,[f0.eye]:Mk,[f0.change]:Uk,[f0.move]:()=>({kind:f0.move})};var Pk=16,Ck=24,Q7=64;var hl=Q7*Q7/32,jz=Q7*Q7;var Vz=128;var ml=Ck+AX*Pk+jz+Vz;var Dk=32768,Yz=16384,Nk=`struct ShellRow {
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
  rows: array<ShellRow, ${AX}>,
  near: array<vec4u, ${jz/4}>, //${Q7}
  sunPass: array<vec4u, ${Vz/4}>,
}`,kk=`
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
  return (e.w >> 16u) & ${65535&~(Dk|Yz)}u;
}

//${LX}
fn shell_roofOf(e: vec4u, lx: i32, lz: i32) -> i32 {
  let q = u32(lz * 8 + lx);
  let w = shellDir[e.z + (e.y >> 16u) + (q >> 1u)];
  return i32(w << (16u * (1u - (q & 1u)))) >> 16u;
}`,Kz=($)=>`
fn shell_nibble(slot: u32, l: vec3i) -> u32 {
  let index = u32((l.y * 8 + l.z) * 8 + l.x);
  let code = slot >> 24u;
${$?`  let raw = code == ${$z}u;
  let bits = select(select(code, 4u, code == 0u), 32u, raw);`:"  let bits = select(code, 4u, code == 0u);"}
  let bit = index * bits;
  let at = (slot & 0xffffffu) * ${TX}u + ${$?`select(1u << (bits - 1u), ${Jz}u, raw)`:"(1u << (bits - 1u))"} + (bit >> 5u);
  let shift = bit & 31u;
  var cell = shellPool[at] >> shift;
  if (shift + bits > 32u) {
    cell |= shellPool[at + 1u] << (32u - shift);
  }
  return cell & ${$?"select((1u << bits) - 1u, 0xffffu, raw)":"((1u << bits) - 1u)"};
}`,ul=Kz(!1),pl=Kz(!0);var xk=`
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
  return k > drawn && shells.head.w == 0u && c > ${Qz} && c > ${Zz}.0 * shells.far.y * d;
}
fn shell_underIn(k: u32, e: vec4u, ro: vec3f, coarse: bool) -> bool {
  let c = shells.rows[k].metres.x;
  let b = c * 8.0;
  return select(i32(floor(ro.y / b)) < shell_y0(e), ro.y + c < f32(shell_y0(e)) * b, coarse) && (e.w >> 16u) != 0u && (e.w & ${Yz<<16>>>0}u) == 0u;
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
}`,qz=($,J,Q)=>`${Nk}
@group(${$}) @binding(${J}) var<${Xz()}> shells: ShellsDraw;
@group(${$}) @binding(${Q}) var<storage, read> shellDir: array<u32>;
${kk}
${xk}`;var Tk=3;function Lk(){let Q=(Uz()?.CELL_LIGHT_READ_WGSL??"")===""?"  return select(1.0, 0.0, shell_under(P - frame.cameraPosition + shells.eye.xyz + N * 0.05));":`  var past = 1.0;
  if (lighting_cellHeld(P, N) < 1.0 && shell_under(P - frame.cameraPosition + shells.eye.xyz + N * 0.05)) {
    past = 0.0;
  }
  return lighting_cellSkyAt(P, N, past);`;return`${qz(Tk,0,1)}
fn lighting_skyVisibility(P: vec3<f32>, N: vec3<f32>) -> f32 {
${Q}
}`}function Hz($,J){return u(Gz(Lk),"lighting_skyVisibility",[NJ($,"ctx.skyVisibility"),zz(J)],"f32")}var Ak=[],IX=0,Ik=!1;function Wz(){let $=[];return Ak.push({drop:function(){for(let J=0;J<$.length;J+=1)for(let Q of $[J].textures)Q.destroy();IX-=$.length,$.length=0},count:()=>$.length}),{release(J,Q,Z,X,j,V){if(!Ik){for(let Y of V)Y.destroy();return}Gb($,J,Q,Z,X,j,V);},takeBack(J,Q,Z,X){for(let j=0;j<$.length;j+=1){let V=$[j];if(V.device!==J||V.key!==Q||V.width!==Z||V.height!==X)continue;return $.splice(j,1),IX-=1,V.value}return null}}}var Ud=Wz();var Ok={rgba16float:8,rgba8unorm:4,rgb10a2unorm:4};function OX($,J){let Q=a$(null,{wrap:$,...J===void 0?{}:{dimension:J}});return Q.sample=(Z)=>Q.sampleLevel(Z,0),Q}var wX=["clamp","repeat","mirror"],bX="lume.normal-plane";function Fz(){return{targets:[],passes:[]}}function Bz($,J,Q){if($.length===0)return[];let Z=new Set,X=new Set,j=function(q){let z=[q];while(z.length>0){let H=z.pop();if(H===void 0)break;if(X.has(H.id))continue;if(X.add(H.id),H.meta.kind==="varRead")Z.add(H.meta.variable.id);else if(H.meta.kind==="fnCall")Y(H.meta.instance.body);for(let U=H.inputs.length-1;U>=0;U--)z.push(H.inputs[U])}},V=function(q){switch(q.kind){case"decl":j(q.init);break;case"assign":Z.add(q.variable.id),j(q.value);break;case"if":for(let z of q.branches){if(z.cond)j(z.cond);Y(z.scope)}break;case"loop":j(q.start),j(q.end),Y(q.scope);break;case"sideEffect":j(q.node);break;case"store":j(q.index),j(q.value);break;case"discard":if(q.cond)j(q.cond);break}};function Y(q){for(let z of q.stmts)V(z)}let K=function(q){switch(q.kind){case"decl":case"assign":return Z.has(q.variable.id);case"if":return q.branches.some((z)=>z.scope.stmts.some(K));case"loop":return Z.has(q.counter.id)||q.scope.stmts.some(K);case"sideEffect":case"store":case"discard":return!1}};j(J),Y(Q);let G=[];for(let q=$.length-1;q>=0;q--){let z=$[q];if(!K(z))continue;G.push(z),V(z)}return G.reverse()}function Mz($,J){return Bz($,J,{stmts:[]})}var Rk=function($){if(typeof $!=="number"||!o($)||$<=0)return 1;return $};var Sk=N0("uvw","vec3f",{fragmentOnly:!0}),RX=function($){if(!o($))return 1;return Math.max(1,Math.floor($))};function Pz(){let $=[],J=[],Q=new Map,Z=null,X=new Map,j=[],V=function(q,z={},H=!1){if(Z)throw Error("ctx.target must be declared at the top level of look(ctx), not inside a pass's builder \u2014 declare the target first, then the pass that writes it");if(typeof q!=="string"||q.trim().length===0)throw Error("ctx.target(name) needs a non-empty string name \u2014 it names the target in errors and the frame graph");if($.some((p)=>p.name===q))throw Error(`ctx.target("${q}"): a target with that name is already declared \u2014 target names are unique per look`);let U=z.format??"rgba16float";if(!(U in Ok)||U==="rgb10a2unorm"&&q!==bX)throw Error(`ctx.target("${q}"): unknown format "${String(U)}" \u2014 use "rgba16float" (default, HDR-safe) or "rgba8unorm" (half the memory for LDR data)`);let W=z.wrap??"clamp";if(!wX.includes(W))throw Error(`ctx.target("${q}"): unknown wrap "${String(W)}" \u2014 use "clamp" (default: edge texels extend past uv 1), "repeat" (tiles), or "mirror" (tiles with reflection)`);let M=z.width!==void 0||z.height!==void 0;if(M&&(z.width===void 0||z.height===void 0)){let p=z.width!==void 0?"width":"height",f=z.width!==void 0?"height":"width";throw Error(`ctx.target("${q}"): ${p} was given without ${f} \u2014 give both width and height, or use scale for a canvas-relative size`)}if(z.depth!==void 0&&!M)throw Error(`ctx.target("${q}"): depth was given without width and height \u2014 a volume is a fixed size: give width, height and depth`);let P=M?RX(typeof z.width==="number"?z.width:1):null,C=M?RX(typeof z.height==="number"?z.height:1):null,D=z.depth===void 0?null:RX(typeof z.depth==="number"?z.depth:1),B=M?null:Rk(z.scale),N=SX(D===null?[1,1]:[1,1,1]),T=OX(W,D===null?void 0:"3d"),L={name:q,format:U,scale:B,fixedWidth:P,fixedHeight:C,fixedDepth:D,doubleBuffered:!1,ref:T,previousRef:null,sizeSlot:N.slot,writes:0,converted:H},k=function(){if(Z===L)throw Error(`look pass writing "${q}" cannot sample "${q}" itself (a texture cannot be read while it is being rendered) \u2014 read ${q}.previous for last frame's contents`)},R=T.sampleLevel.bind(T);T.sample=function(p){return k(),R(p,0)},T.sampleLevel=function(p,f){return k(),R(p,f)},Object.defineProperty(T,"size",{value:N.node,enumerable:!1,configurable:!0,writable:!1});let w={get previous(){if(D!==null)throw Error(`ctx.target("${q}") is a volume (depth ${D}), and a volume has no .previous \u2014 its pass fills it, and later passes read the node that pass returns`);return L.doubleBuffered=!0,L.previousRef??=OX(W),L.previousRef},size:N.node};return $.push(L),Q.set(w,L),w},Y=function(q,z,H=[]){if(Z)throw Error("ctx.pass must be declared at the top level of look(ctx), not inside another pass's builder (pass order is declaration order)");let U=Q.get(q);if(!U)throw Error("ctx.pass(target, build): the first argument must be a target from ctx.target(...) of this same look build");if(typeof z!=="function")throw Error(`ctx.pass("${U.name}", build): build must be a function (uv) => colorNode`);let W=X.get(U);if(W!==void 0){X.delete(U);let D=new Map,B=new Map,N=(L)=>r0(L,D,function(){return},function(k,R){let w=k.meta;if(w.kind==="textureSample"&&w.texture===W.ref)return new B0(k.type,R,{...w,texture:U.ref});if(w.kind!=="fnCall"&&w.kind!=="voidCall")return m$(k,R);let p=B.get(w.instance)??X6(w.instance,T(w.instance.body),w.instance.returns&&N(w.instance.returns));return B.set(w.instance,p),p===w.instance?m$(k,R):new B0(k.type,R,{...w,instance:p})}),T=u$(N);for(let L of J)L.output=N(L.output),L.scope=T(L.scope);j.push({held:W,to:Y(V(`${U.name}.held${j.length}`),()=>U.ref.sampleLevel(k0,0))})}let M=`look.pass${J.length}.${U.name}`;Z=U;let P,C;try{let D=kJ(()=>z(U.fixedDepth===null?k0:Sk)),B=D.result;if(!(B instanceof Object)||!("type"in B)||B.type!=="vec3f"&&B.type!=="vec4f"){let T=B===null?"null":typeof B;if(B instanceof Object&&"type"in B)T=String(B.type);throw Error(`ctx.pass("${U.name}") must return a vec3 or vec4 color node for the pixel it writes, got ${T}`)}P=Z0(B,"vec4f");let N=Bz(H,P,D.scope);C=N.length>0?{stmts:[...N,...D.scope.stmts]}:D.scope}finally{Z=null}return U.writes+=1,J.push({name:M,target:U,output:P,scope:C}),U.ref};return{declareTarget:V,declarePass:Y,finalize:function(){for(let q of $)if(q.writes===0&&q.doubleBuffered)throw Error(`look target "${q.name}" is read (.previous) but never written by any pass \u2014 declare a ctx.pass(${q.name}, ...) that writes it`);for(let[q,z]of X)j.push({held:z,to:q.ref});X.clear();for(let{held:q,to:z}of j)for(let H of q.reads)if(H.meta.kind==="textureSample")H.meta.texture=z;return{targets:$,passes:J}},atTopLevel:()=>Z===null,declared:()=>$.length+J.length,heldAs:function(q){let z=q.meta,H=q.inputs[1]?.meta;if(z.kind!=="textureSample"||z.mode!=="sampleLevel"||q.inputs[0]!==k0||H?.kind!=="const"||H.values[0]!==0)return null;let U=$.find((M)=>M.ref===z.texture);if(Z!==null||U===void 0||U.writes===0||U.scale!==1||U.format!=="rgba16float"||U.ref.wrap!=="clamp")return null;let W=X.get(U);if(W===void 0){let M=OX("clamp"),P=M.sampleLevel.bind(M),C=[];M.sampleLevel=function(D,B){let N=P(D,B);return C.push(N),N},W={ref:M,reads:C},X.set(U,W)}return W.ref}}}var vk={uv:"screenUv",screenUV:"screenUv",screenSize:"frame.viewportSize",time:"frame.worldTime",deltaTime:"frame.deltaTime",cameraPosition:"(frame.cameraPosition + frame.renderOrigin)"},ed={...vk,uvw:"passUvw"};var $n=[n0(0,2,"unfilterable-float")];var Ek=new Q$("fog"),wn=new Q$("fog-revision");var gk=function($){$.gpu?.buffer.release(),$.gpu=null},bn=new Q$("fog-horizon-gpu",gk);var nn=new Float64Array([NaN,NaN,NaN,0,0,0]);var _k={},yk={};var fk={presentedScene:_k,presentedLibrary:yk,presentedRef:null,active:null,movedOutside:!1};function Cz(){return(fk.active?.floor??null)!==null}var q0=(...$)=>({kind:"ints",fields:$}),hk=["cpu","gpu","gpuLook","apply","fence","pause","doorCpu","lookBack","presented","callback","presentationCpu","shared","shareScene","shareCanvas","passed","passSurface","passScene","passCanvas","passLook","passShadow","passSky","passFx","passFixed"],tn={1:{id:1,name:"meta",shape:{kind:"json"}},2:{id:2,name:"turn",shape:q0("source","dInstantQ")},3:{id:3,name:"seed",shape:q0("stream","w0","w1","w2","w3")},4:{id:4,name:"marker",shape:{kind:"json"}},5:{id:5,name:"pose",shape:q0("dInstantQ","dX","dY","dZ","dQx","dQy","dQz","dQw","dLensScale","dLensDepthA","dLensDepthB","dLensOrtho")},6:{id:6,name:"slice",shape:q0("site","units")},7:{id:7,name:"frame-stamp",shape:q0("dStampQ")},8:{id:8,name:"turn-debug",shape:{kind:"json"}},9:{id:9,name:"decide",shape:q0("dCalls","site")},10:{id:10,name:"read",shape:q0("dCalls","site","dValue")},11:{id:11,name:"wait",shape:q0("dCall","outcome")},12:{id:12,name:"kept",shape:q0("dSerial","answer")},13:{id:13,name:"wall",shape:q0("turns","dOffsetMs")},14:{id:14,name:"facts",shape:{kind:"json"}},15:{id:15,name:"chunk",shape:q0("dSerial","length")},16:{id:16,name:"eval",shape:q0("dSerial","turns")},18:{id:18,name:"word",shape:q0("digest")},20:{id:20,name:"renderer-check",shape:q0("turn","presented","applied","cameraRead","entities","draws","heldRows","sceneScaleMilli","decides","reads")},21:{id:21,name:"look-take",shape:q0("dTakes","dWrites","dx","dy","wheel","span","dPeriod")},22:{id:22,name:"look",shape:q0("dInstantQ","yawMicroRad","pitchMicroRad")},23:{id:23,name:"measure",shape:q0("dTakes",...hk)},24:{id:24,name:"door-trail",shape:q0("dTurns","code")},25:{id:25,name:"measure-land",shape:q0("dTakes","passLand")},26:{id:26,name:"measure-load",shape:q0("dTakes","load")},27:{id:27,name:"measure-shadow",shape:q0("dTakes","sun","atlas","window")},28:{id:28,name:"measure-builds",shape:q0("dTakes","freeMs","free","carryMs","carry")},50:{id:50,name:"sim-check",shape:q0("tick","steps","writes","things","body","decides","reads")},51:{id:51,name:"sample",shape:{kind:"bytes"}},80:{id:80,name:"dom",shape:{kind:"bytes"}},81:{id:81,name:"dom-strings",shape:{kind:"bytes"}},82:{id:82,name:"host",shape:{kind:"bytes"}}};var Dz=64;var qi=new Float64Array(Dz),Gi=new Int32Array(Dz);var mk=!1;var uk=null;var pk=new Map;function ck($){return $.stages??$}function lk($,J){return $&&uk===J}function Nz($,J){return lk(mk,ck(J))&&pk.has($)}var _X="scripted-look-compile-failed",yX="scripted-look-runtime-error";var kz="scripted-look-nonfinite-param";function dk(){return{scripts:{},delivered:!1}}var LJ=dk();var TJ=new Set;function nk(){return{active:null,candidate:null,pending:!1}}var Vo=nk();var xz=new WeakMap;function ik($,J=LJ){let Q=J.scripts,Z=xz.get(J);if(Z?.scripts!==Q)Z={scripts:Q,entries:new Map},xz.set(J,Z);let X=Z.entries.get($);if(X!==void 0||Z.entries.has($))return X;let j=Y7(Q,$);return Z.entries.set($,j),j}var ok=new Set,rk=new WeakMap;function ak($,J=LJ){let Q=sk($,J),Z=q$(rk,J).get($);return Q!==void 0&&Z?.source===Q&&Z.reads}function Lz($,J=LJ){let Q=Tz();return $!==void 0&&(Nz($,J)||Cz())&&ak($,J)?"low":Q}var Az=($,J)=>`${$}@${J}`;function Iz($){return ok.has($)}function sk($,J=LJ){return ik($,J)?.hash}function K7($,J,Q,Z){let X=`${$}:${J}`;if(TJ.has(X))return;TJ.add(X),q8({code:$,key:`scripted-look:${J}`,message:Q,data:{scriptRef:J,...Z}})}var Oz=new WeakMap;function tk($){if(typeof $==="string")return`the string ${JSON.stringify($)}`;return String($)}function Rz($,J,Q,Z){let X=$??"look",j=`${kz}:${J}:${X}`;if(TJ.has(j))return;TJ.add(j);let V=`Look param "${J}" came through as ${tk(Q)}: the shader is using ${Z} (the binding's declared default) instead until a finite number arrives. A non-finite uniform can hang the GPU and take the whole world down, so it never ships; check the code that writes this param (look at its math for a divide-by-zero or 0/0).`;q8({code:kz,key:`scripted-look:nonfinite:${X}:${J}`,message:V,data:{scriptRef:X,param:J,value:String(Q)}})}function q7($,J){let Q=a$($,J);return Q.sample=(Z)=>Q.sampleLevel(Z,0),Q}function Sz($){let J=a$($),Q=J.load,Z=function(X){let j=Z0(X,"vec2f"),V=Z0(J.size(),"vec2f");return Q(c("vec2i")`vec2<i32>(min(floor(max(${j}, vec2<f32>(0.0)) * ${V}), max(${V} - vec2<f32>(1.0), vec2<f32>(0.0))))`)};return J.sample=Z,J.sampleLevel=(X)=>Z(X),J}function fX(){return q7(null,{dimension:"cube",...s1()?{}:{decodeSrgb:!0}})}var ek=12,$x=8;function b6(){return{hashes:0,noise:0,cellular:0,textureReads:0,worldPositions:0,lightQueries:0,ops:0}}function AJ($){return $.hashes+$.noise+$.cellular+$.textureReads+$.worldPositions+$.lightQueries}function w6($,J,Q){$.hashes+=J.hashes*Q,$.noise+=J.noise*Q,$.cellular+=J.cellular*Q,$.textureReads+=J.textureReads*Q,$.worldPositions+=J.worldPositions*Q,$.lightQueries+=J.lightQueries*Q,$.ops+=J.ops*Q}var Jx=new Set(["const","input","attribute","uniform","varRead","swizzle","vertexStage"]);function Qx($){let J=b6(),Q=$.meta;if(!Jx.has(Q.kind))J.ops=1;if(Q.kind==="textureSample"){if(Q.mode!=="size")J.textureReads=1}else if(Q.kind==="wgslExpr"){let Z=Q.parts[0]??"";if(Z.startsWith("shade_hash11("))J.hashes=1;else if(Z.startsWith("shade_perlin3v("))J.noise=3;else if(Z.startsWith("shade_perlin3"))J.noise=1;else if(Z.startsWith("shade_fractal3("))J.noise=Math.max(0,Ez($)??1);else if(Z.startsWith("shade_worley3(")||Z.startsWith("shade_worley3z0("))J.cellular=1;else if(Z.startsWith("lighting_point"))J.lightQueries=1;if(Q.parts.some((X)=>X.includes("frame.inverseViewProj")))J.worldPositions=1}return J}function Ez($){let J=$.inputs[1];return J===void 0?null:wz(J)}var Zx=($)=>$.meta.kind==="wgslExpr"&&($.meta.parts[0]??"").startsWith("shade_fractal3(")&&Ez($)===null,hX={by:1,conditional:!1};class mX{constructor($,J){this.sites=void 0;this.callees=void 0;this.uses=new Map;this.dependent=new Set;this.hoisted=new Set;this.tally={total:b6(),conditional:b6(),rows:new Map,blocks:new Map,uncounted:0};this.open=[];this.sites=$;this.callees=J}run($,J){if($)this.countScope($);for(let Q of J)this.countUses(Q);if($)this.walkScope($,hX);for(let Q of J)this.charge(Q,hX);return this.tally}countScope($){for(let J of $.stmts)switch(J.kind){case"decl":this.countUses(J.init);break;case"assign":this.countUses(J.value);break;case"if":for(let Q of J.branches){if(Q.cond)this.countUses(Q.cond);this.countScope(Q.scope)}break;case"loop":this.countUses(J.start),this.countUses(J.end),this.countScope(J.scope);break;case"sideEffect":this.countUses(J.node);break;case"discard":if(J.cond)this.countUses(J.cond);break}}countUses($){let J=this.uses.get($.id)??0;if(this.uses.set($.id,J+1),J>0)return;let Q=[{node:$,next:0}];while(Q.length>0){let Z=Q[Q.length-1];if(Z.next<Z.node.inputs.length){let j=Z.node.inputs[Z.next];Z.next+=1;let V=this.uses.get(j.id)??0;if(this.uses.set(j.id,V+1),V===0)Q.push({node:j,next:0});continue}let X=Z.node;if(X.meta.kind==="varRead"||X.inputs.some((j)=>this.dependent.has(j.id)))this.dependent.add(X.id);Q.pop()}}walkScope($,J){for(let Q of $.stmts)this.walkStmt(Q,J)}walkStmt($,J){switch($.kind){case"decl":this.charge($.init,J);return;case"assign":this.charge($.value,J);return;case"sideEffect":this.charge($.node,J);return;case"discard":if($.cond)this.charge($.cond,J);return;case"if":{let Q=this.openBlock();$.branches.forEach((Z,X)=>{if(Z.cond)this.charge(Z.cond,X===0?J:{...J,conditional:!0});this.walkScope(Z.scope,{...J,conditional:!0})}),this.closeBlock($,Q,{kind:"if",trips:null});return}case"loop":{if(this.charge($.start,J),this.charge($.end,J),$.trips===null)this.tally.uncounted+=1;let Q=this.openBlock();this.walkScope($.scope,{...J,by:J.by*($.trips??1)}),this.closeBlock($,Q,{kind:"loop",trips:$.trips});return}}}openBlock(){let $=b6();return this.open.push($),$}closeBlock($,J,Q){if(this.open.pop(),AJ(J)===0&&J.ops===0)return;let Z=bz($);this.mergeBlock($,{...Q,at:(Z===null?void 0:this.sites?.stmts.get(Z))??[],counts:J},1)}mergeBlock($,J,Q){let Z=this.tally.blocks.get($);if(!Z)Z={...J,counts:b6()},this.tally.blocks.set($,Z);w6(Z.counts,J.counts,Q)}charge($,J){let Q=new Set,Z=[{node:$,ctx:J}];while(Z.length>0){let X=Z.pop();if(X===void 0)break;let{node:j}=X;if(Q.has(j.id))continue;Q.add(j.id);let V=!this.dependent.has(j.id)&&(this.uses.get(j.id)??0)>1;if(V){if(this.hoisted.has(j.id))continue;this.hoisted.add(j.id)}let Y=V?hX:X.ctx;this.chargeNode(j,Y);for(let K of j.inputs)Z.push({node:K,ctx:Y})}}chargeNode($,J){if(this.book(this.sites?.nodes.get($.id)??[],Qx($),J),Zx($))this.tally.uncounted+=1;if($.meta.kind!=="fnCall")return;let Q=Xx($.meta.instance,this.sites,this.callees);for(let Z of Q.rows.values())this.book(Z.at,Z.counts,J);if(!J.conditional)w6(this.tally.conditional,Q.conditional,J.by);for(let[Z,X]of Q.blocks)this.mergeBlock(Z,X,J.by);this.tally.uncounted+=Q.uncounted}book($,J,Q){if(AJ(J)===0&&J.ops===0)return;if(w6(this.tally.total,J,Q.by),Q.conditional)w6(this.tally.conditional,J,Q.by);for(let j of this.open)w6(j,J,Q.by);let Z=$.join(`
`),X=this.tally.rows.get(Z);if(!X)X={at:$,counts:b6()},this.tally.rows.set(Z,X);w6(X.counts,J,Q.by)}}function Xx($,J,Q){let Z=Q.get($.id);if(Z)return Z;let X=new mX(J,Q).run($.body,$.returns?[$.returns]:[]);return Q.set($.id,X),X}var vz=($,J)=>AJ(J.counts)-AJ($.counts)||J.counts.ops-$.counts.ops;function uX($,J,Q=null){let Z=new Set;for(let V of J)U$(V,Z);let X=$===null?null:a9($,Z),j=new mX(Q,new Map).run(X,J);return{total:j.total,conditional:j.conditional,rows:[...j.rows.values()].sort(vz).slice(0,ek),blocks:[...j.blocks.values()].sort(vz).slice(0,$x),uncounted:j.uncounted}}function jx($,J){if(J===void 0||J===null)return{};if(typeof J!=="object"||Array.isArray(J))throw TypeError(`ctx.texture("${$}", opts): opts must be an options object like { wrap: "repeat" }, got ${Array.isArray(J)?"an array":typeof J}`);for(let Z of Object.keys(J))if(Z!=="wrap")throw Error(`ctx.texture("${$}"): unknown option "${Z}" \u2014 options are: wrap ("clamp" | "repeat" | "mirror")`);let Q=Reflect.get(J,"wrap");if(Q===void 0)return{};if(!wX.includes(Q))throw Error(`ctx.texture("${$}"): unknown wrap "${String(Q)}" \u2014 use "clamp" (default: edge texels extend past uv 1), "repeat" (tiles), or "mirror" (tiles with reflection)`);return{wrap:Q}}function Vx($){let J=new Map,Q=new Map,Z=!1,X=!1,j=function(Y,K){let G=$.retainTexture(Y,{measured:!0});if(!G)return;let q=G.lease;if(q===K.current){G.release();return}let z=K.retained;K.current=q,K.retained=G,z?.release();for(let H of K.listeners)H(q)},V=function(Y){let K=J.get(Y);if(K)return K;let G=$.holdTextureSampled?.([Y])??null;if(X)G?.idle?.(!0);let q={current:null,retained:null,listeners:new Set,cancel:null,sampled:G,facts:iz(()=>G)};return J.set(Y,q),$.noteTextureRank?.(Y,OG),j(Y,q),q.cancel=$.subscribe("texture",Y,function(){if(!Z)j(Y,q)}),q};return{retain(Y){return V(Y).current},retainOnLoad(Y,K){V(Y).listeners.add(K)},residencyOf(Y,K){let G=V(Y);return Q.set(K,G),G.facts},readsWhole(Y){if(Z)return;for(let K of Y)Q.get(K)?.sampled?.unmeasured?.(!0)},idle(Y){if(Z||X===Y)return;X=Y;for(let K of J.values())K.sampled?.idle?.(Y)},release(){if(Z)return;Z=!0;for(let Y of J.values())Y.cancel?.(),Y.retained?.release(),Y.sampled?.release(),Y.listeners.clear();J.clear(),Q.clear()}}}function B$($,J){let Q=c("vec4f")`(frame.inverseViewProj * vec4<f32>(${$}.x * 2.0 - 1.0, 1.0 - ${$}.y * 2.0, ${J}, 1.0))`;return Q.xyz.div(Q.w)}function gz($,J){let Q=u(S$,"lume_look_texel",[J,$.size()],"vec2i"),Z=Z0(Q,"vec2f").add(0.5).div(Z0($.size(),"vec2f")),X=$.load(Q).x;return B$(p0(X.equal(0),J,Z),X)}function _z($){return c("f32")`(frame.view * vec4<f32>(${$}, 1.0)).z`}var yz=($)=>u(S$,"lume_look_opened",[$],"f32");function iX($,J){return p0(I6($,c("vec3f")`frame.cameraPosition`.sub(J)).lessThan(0),tz($),$)}function jU($,J,Q){let Z=j0(1,1).div(Z0($.size(),"vec2f")),X=Z0(u(S$,"lume_look_texel",[J,$.size()],"vec2i"),"vec2f").add(0.5).mul(Z),j=j0(Z.x,0),V=j0(0,Z.y),Y=(U0)=>yz($.sampleLevel(U0,0).r),K=yz(Q??$.sampleLevel(X,0).r),G=X.add(j),q=X.sub(j),z=X.add(V),H=X.sub(V),U=Y(G),W=Y(q),M=Y(z),P=Y(H),C=(U0,y0)=>U0.mul(2).sub(y0).sub(K).abs(),D=X.x.add(Z.x.mul(2)).lessThan(1),B=X.x.sub(Z.x.mul(2)).greaterThan(0),N=X.y.add(Z.y.mul(2)).lessThan(1),T=X.y.sub(Z.y.mul(2)).greaterThan(0),L=D.and(B.not().or(C(U,Y(X.add(j.mul(2)))).lessThan(C(W,Y(X.sub(j.mul(2))))))),k=N.and(T.not().or(C(M,Y(X.add(V.mul(2)))).lessThan(C(P,Y(X.sub(V.mul(2))))))),R=B$(X,K),w=p0(L,B$(G,U).sub(R),R.sub(B$(q,W))),p=p0(k,B$(z,M).sub(R),R.sub(B$(H,P))),f=sz(w,p),a=iX(f,R),l=a.length();return p0(l.greaterThan(0.000000000001),a.div(L0(l,0.000000000001)),P0(0,0,0))}function Yx($,J,Q=!1){return nz(function([Z]){let X=u(S$,"lume_look_texel",[Z,$.size()],"vec2i"),j=$.load(X).x,V=P0(0,0,0).toVar();return t0(j.equal(0),function(){V.assign(c("vec3f")`normalize(vec3<f32>(frame.view[0][2], frame.view[1][2], frame.view[2][2]))`)}).Else(function(){let Y=O$(0,0,0,0).toVar();t0(u(S$,"lume_look_kept",[J.words.size()],"bool"),function(){let K=u(S$,"lume_look_surface_texel",[X,$.size(),J.words.size()],"vec2i"),G=J.depth.load(K).x;t0(G.equal(j),function(){Y.assign(u(S$,"lume_look_plane",[J.words.load(K).xy,J.emissive.load(K).x,G,j,az(Q)],"vec4f"))})}),t0(Y.w.greaterThan(0.5),function(){if(Q)return V.assign(Y.xyz);let K=Y.xyz;V.assign(iX(K,B$(Z,j)))}).Else(function(){V.assign(jU($,Z,j))})}),V})}function Kx($){let J=c("vec4f")`(frame.prevViewProj * vec4<f32>(${NJ(VU($),"ctx.previousUv")}, 1.0))`,Q=J.xy.div(L0(J.w,0.000001)).mul(j0(0.5,-0.5)).add(j0(0.5,0.5));return p0(c("bool")`(frame.motionValid > 0.5)`.and(J.w.greaterThan(0.000001)),Q,j0(-1,-1))}function qx($,J){return c("vec2i")`vec2<i32>(min(floor(max(${$}, vec2<f32>(0.0)) * ${J}), max(${J} - vec2<f32>(1.0), vec2<f32>(0.0))))`}function pX($,J,Q=["liquid"]){if(J===void 0||J===null)return{};if(typeof J!=="object"||Array.isArray(J))throw TypeError(`ctx.${$}(uv, opts): opts must be an options object like { ${Q.at(-1)}: true }, got ${Array.isArray(J)?"an array":typeof J}`);for(let Z of Object.keys(J)){if(!Q.includes(Z))throw Error(`ctx.${$}(uv): unknown option "${Z}" \u2014 options are: ${Q.join(", ")} (true | false)`);let X=Reflect.get(J,Z);if(X!==void 0&&typeof X!=="boolean")throw TypeError(`ctx.${$}(uv, { ${Z} }): ${Z} must be true or false, got ${typeof X}`)}return J}function cX($,J,Q){let Z=$.sampleLevel(Q,0).r,X=J.depth.sampleLevel(Q,0).r,j=X.greaterThanEqual(Z).and(X.greaterThan(0));return{raw:L0(X,Z),nearer:j}}function G7($,J){if(!IJ(J))throw TypeError(`ctx.${$}(uv) takes a uv node \u2014 the uv a ctx.pass builder receives, or screenUV from builtin/tsl. Got ${J===null?"null":typeof J}.`);return VU(Z0(J,"vec2f"))}function VU($){return U$($).size>0?$.toVar():$}function Gx($,J,Q,Z,X,j,V,Y,K){let G=new Map,q=function(B){if(!V.reads.has(B))V.reads.set(B,Q[B])},z=new Proxy(Q,{get:function(B,N,T){if(typeof N==="string")q(N);return Reflect.get(B,N,T)},has:function(B,N){if(typeof N==="string")q(N);return Reflect.has(B,N)},ownKeys:function(B){V.enumerated=!0;for(let N of Object.keys(B))q(N);return Reflect.ownKeys(B)}}),H=null,U=[],W=function(B,N=!1){if(!J.surface)return jU(J.depth,B);return(U[+N]??=Yx(J.depth,J.surface,N))(B)},M,P=function(){try{let B=Y.declareTarget(bX,{format:"rgb10a2unorm"});return Y.declarePass(B,(N)=>O$(W(Z0(N,"vec2f")).mul(0.5).add(0.5),1))}catch{return null}};function C(B,N){let T=Q[B]??N??0;if(typeof T==="string")return q(B),T;let L=G.get(B);if(L)return L;V.uniformKeys.add(B);let k=ZU(typeof N==="string"?void 0:N),R=0;if(typeof T==="boolean")R=T?1:0;else if(o(T))R=T;else R=k,Rz($,B,T,k);let w=OJ(R),p=RJ(w);if(p)Z[B]=p,Oz.set(p,k);return G.set(B,w),w}let D=function(B){let N=G7("normal",B);if(B===k0||!Y.atTopLevel())return W(N);if(M===void 0)M=P();if(M===null)return W(N);return M.load(qx(N,M.size)).xyz.mul(2).sub(1)};return{scene:J.scene,depth:J.depth,viewZ:J.env.viewZ,get velocity(){return K.read=!0,H??=lG({...J.env,depth:J.depth},k0,K.tier!=="low"),H},worldPosition(B,N){let T=G7("worldPosition",B),L=J.env.throughDoorsAt,k=pX("worldPosition",N).liquid&&J.liquid?cX(J.depth,J.liquid,T):null,R=k?B$(T,k.raw):gz(J.depth,T);if(!L)return dX(R);let w=_z(R),p=L(T,w).div(w.min(-0.000001)),f=k?p0(k.nearer,1,p):p,a=c("vec3f")`frame.cameraPosition`,l=a.add(R.sub(a).mul(f));return dX(l)},viewZAt(B,N){let T=G7("viewZAt",B),L=pX("viewZAt",N).liquid&&J.liquid?cX(J.depth,J.liquid,T):null,k=_z(L?B$(T,L.raw):gz(J.depth,T)),R=J.env.throughDoorsAt;if(!R)return k;return L?p0(L.nearer,k,R(T,k)):R(T,k)},previousUv(B){if(!IJ(B))Hb(B);return Kx(B)},normal(B,N){let{liquid:T,shading:L}=pX("normal",N,["liquid","shading"]),k=L?W(G7("normal",B),!0):D(B);if(T&&J.liquid){let R=G7("normal",B),{raw:w,nearer:p}=cX(J.depth,J.liquid,R),f=J.liquid.normal.sampleLevel(R,0).xyz,a=iX(f,B$(R,w)),l=a.length();return p0(p.and(l.greaterThan(0.000001)),a.div(L0(l,0.000001)),k)}return k},skyVisibility:Hz,cube:J.cube??fX(),cover:J.cover??q7(null),additive:J.additive??q7(null),data:J.data??Sz(null),params:z,param:C,texture(B,N){let{wrap:T}=jx(B,N),L=j?.retain(B)??null,k=q7(L,{flipY:!0,wrap:T});if(k._measured=!0,j)k._residency=j.residencyOf(B,k);if(X.push(k),j)j.retainOnLoad(B,function(R){k.handle=R,J.onTextureLoaded?.(k)});return k},target(B,N){return Y.declareTarget(B,N)},pass(B,N){return Y.declarePass(B,N,E6().stmts.slice())},device:XU(K.tier,function(){K.read=!0}),get quality(){return K.read=!0,K.tier}}}function zx($){return typeof $==="function"}var Ux={f32:{write:($)=>O$($,0,0,1),read:($)=>$.x},vec2f:{write:($)=>O$($,0,1),read:($)=>$.xy},vec3f:{write:($)=>$,read:($)=>$.xyz},vec4f:{write:($)=>$,read:($)=>$}};function Hx($,J){let Q=[$];A0({stmts:[...J]},Q);let Z=new Set,X=function(j){if(j.meta.kind!=="textureSample"||j.meta.mode==="size")return!1;if(j.meta.mode==="load")return!0;let V=j.inputs[0].meta;return!(V.kind==="input"&&(V.name==="screenUV"||V.name==="uv"))};return Q.some((j)=>F$(j,Z,X))}function Wx($,J){let Q=[$];A0({stmts:[...J]},Q);let Z=new Set,X=new Set,j=(Y)=>Y.meta.kind==="input"&&(Y.meta.name==="screenUV"||Y.meta.name==="uv"),V=function(Y){if(Y.meta.kind!=="fnCall"&&Y.meta.kind!=="voidCall")return!1;let K=Y.meta.instance.returns===null?[]:[Y.meta.instance.returns];return A0(Y.meta.instance.body,K),K.some((G)=>F$(G,X,j))};return Q.some((Y)=>F$(Y,Z,V))}var fz="frame.prevViewProj";function IJ($){if(!$||typeof $!=="object")return!1;let J=$;return typeof J.add==="function"&&typeof J.type==="string"&&typeof J.meta==="object"&&J.meta!==null}function YU($,J,Q,Z,X,j){let V=KU($,J,Q,Z,X,j);for(;;){let Y=V.next();if(Y.done===!0)return Y.value}}function*KU($,J,Q,Z,X,j){let V={},Y=[],K={reads:new Map,enumerated:!1,uniformKeys:new Set},G=Pz(),q={tier:Lz(J),read:!1},z=0,H=function(b,y){let n=G.heldAs(b);if(n!==null)return n;let _;try{_=G.declareTarget(`${y}.upstream${z++}`)}catch(s){throw Error(`${y}: the stage before it cannot be resolved inside a ctx.pass builder \u2014 pass ctx.scene there, or sample a target an earlier pass wrote (${y$(s)})`)}return G.declarePass(_,()=>b,E6().stmts.slice())},U=0,W=function(b,y,n){if(T===null||E6()!==T||!G.atTopLevel())return null;try{return G.declarePass(G.declareTarget(`${b}${U++}`,{scale:y}),n,T.stmts.slice())}catch{return null}},M=ez("builtin/postfx",rG({...Z.env,scene:Z.scene,resolve:H,hiddenPass:W}),J),P=Fz(),C=[],D=new WeakMap,B=null,N=Z.cube??fX(),T=null,L=0,k=new Map,R=0,w=Iz(Az(J,$.hash)),p=function(b,y){if(w||oz(b))return null;let n=k.get(b);if(n!==void 0)return n(y);let _=T,s=Ux[b.type];if(_===null||s===void 0||E6()!==_||!G.atTopLevel())return null;let W0=Mz(_.stmts,b);if(!Hx(b,W0)||Wx(b,W0))return null;let M0;try{M0=G.declarePass(G.declareTarget(`convertToTexture${R++}`,void 0,!0),()=>s.write(b),_.stmts.slice())}catch{return null}let T0=(v)=>s.read(M0.sample(v));return k.set(b,T0),T0(y)},f=function(b,y,n){let _=function(...s){let W0=L===0&&B!==null&&s.length===1&&s[0]===B&&T!==null&&E6()===T&&G.atTopLevel()?T:null,M0=W0?.stmts.length??0,T0=G.declared();L+=1;try{let v=Reflect.apply(y,this,s);if(W0!==null)C.push({path:b,output:IJ(v)?v:null,from:M0,to:W0.stmts.length,declares:G.declared()!==T0,text:n});return v}finally{L-=1}};return D.set(_,y),_},a={stmts:[]};T=a;let l=(b)=>J6(a,function(){nX(M);let y=lX(p);try{return b()}finally{nX(null),lX(y)}}),U0=l(function(){try{let b=mz(j,$,J),y=function(s,W0){let M0=W0.look;if(zx(M0)&&!D.has(M0))W0.look=f(uz(s),M0,Y7(b,s))},_=new j.ModuleRuntime({read:(s)=>Y7(b,s),builtins:j.builtins,sandbox:cz,executed:y}).boot(dz(b,J)??J).look;return{looker:(typeof _==="function"?D.get(_):void 0)??_}}catch(b){let y=y$(b);return K7(_X,J,`Look script "${J}" failed to compile: ${y}`,{error:y}),null}});if(U0===null)return null;let y0=U0.looker;if(typeof y0!=="function")return Ib(J);yield"script";let g0=l(function(){try{B=Gx(J,Z.cube===N?Z:{...Z,cube:N},Q??{},V,Y,X,K,G,q),pz();let b=y0(B);return P=G.finalize(),{candidate:b}}catch(b){let y=y$(b),n=M9(b);return K7(yX,J,`Look script "${J}" threw while composing the look${n?` (${n})`:""}: ${y}. The look that stood before it keeps presenting until a save compiles.`,{error:y,...n?{frame:n}:{}}),null}});if(g0===null)return null;let G0=g0.candidate;if(!IJ(G0))return Jb(J,G0);let H0=G0;yield"walk";let _0=[H0];A0(a,_0);for(let b of P.passes)_0.push(b.output),A0(b.scope,_0);let O=new Set;for(let b of _0)F$(b,O,()=>!1);Y.push(...$U(O,X,Z.onTextureLoaded));let S=H0===Z.scene,g=JU(O),E={clock:g.clock,windTravel:g.windTravel,history:P.targets.some((b)=>b.doubleBuffered),audio:g.audio},h=new Map,J0=!1,d=!1;for(let b of O){let y=b.meta;if(y.kind==="textureSample"){if(y.texture===N)d=!0;continue}if(y.kind!=="wgslExpr"||J0)continue;let n=y.parts.some((s)=>s.includes(fz)),_=y.module;if(!n&&_!==null){let s=h.get(_);if(n=s??_.source.includes(fz),s===void 0)h.set(_,n)}if(n)J0=!0}return X?.readsWhole(QU(O)),{output:H0,scope:a,uniforms:V,textures:Y,rawParams:K,passGraph:P,hash:$.hash,passthrough:S,readsQuality:q.read,moves:E,previousCamera:J0,cube:d,...C.length>0?{whole:C}:{}}}var hz=3,Fx=function(){let $=lz(hz+1);return $.filter((J,Q)=>Q===0||J!==$[Q-1]).slice(0,hz)};function Bx($,J,Q,Z,X){let{result:j,sites:V}=rz(Fx,()=>YU($,J,Q,Z,null,X));if(!j)return null;return{present:uX(j.scope,[j.output],V),passes:j.passGraph.passes.map((Y)=>({name:Y.name,target:Y.target,census:uX(Y.scope,[Y.output],V)}))}}var qU=`fn env_cubeFaceDirection(face: u32, uv: vec2<f32>) -> vec3<f32> {
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
}`;var co={[V7]:"color",[v6]:"gradient",[g6]:"physical",[SJ]:"equirect"};var oX=8;var eo=-Math.log(wJ)/vJ,Mx=BU*EX/PU,Px=0.06,Cx=0.3,Dx=0.42,Nx=`
const SKY_CLOUD_UNITS_PER_M: f32 = ${MU};
const SKY_CLOUD_PSEUDO_THICKNESS: f32 = ${vJ};
const SKY_CLOUD_EROSION: f32 = ${eX};
const SKY_CLOUD_POWDER: f32 = ${U3};
const SKY_CLOUD_BELLY_AMBIENT: f32 = ${aX};
const SKY_CLOUD_BELLY_SKY: f32 = ${sX};
const SKY_CLOUD_GROUND_BOUNCE: f32 = ${X3};
const SKY_CLOUD_EDGE: f32 = ${WU};
const SKY_CLOUD_EROSION_REACH: f32 = ${$3};
const SKY_CLOUD_SLICE_EDGE: f32 = ${M3};
const SKY_CLOUD_SLICE_DEPTH: f32 = ${B3};
const SKY_CLOUD_SLAB_REACH_M: f32 = ${W3};
const SKY_CLOUD_FADE_NEAR: f32 = ${Z3};
const SKY_CLOUD_FADE_FAR: f32 = ${J3};
const SKY_CLOUD_FADE_FLOOR_M: f32 = ${Q3};
const SKY_CLOUD_SLAB_OD: f32 = ${H3};
const SKY_CLOUD_MIN_STEP_M: f32 = ${K3};
const SKY_CLOUD_OPAQUE_T: f32 = ${wJ};
const SKY_CLOUD_DOME_POWER: f32 = ${tX};
const SKY_CLOUD_LOBE_TOP: f32 = ${V3};
const SKY_CLOUD_LOBE_WAIST: f32 = ${Y3};
const SKY_CLOUD_LIGHT_EDGE: f32 = ${j3};
const SKY_CLOUD_SLAB_SKIN: f32 = ${F3};
const SKY_CLOUD_MOON_ILLUMINANCE: f32 = ${Mx};
const SKY_CLOUD_MOON_DECK_LIGHT: f32 = ${Px};
const SKY_CLOUD_MOON_BEAM: f32 = 0.036;
const SKY_SUN_TO_MOON_HANDOVER_START: f32 = ${UU};
const SKY_SUN_TO_MOON_HANDOVER_END: f32 = ${zU};

fn sky_cloudFieldWrapUv(windowUv: vec2<f32>, phase: vec2<f32>, dims: vec2<u32>) -> vec2<f32> {
  let span = max(vec2<f32>(dims) - 1.0, vec2<f32>(1.0));
  let s = windowUv * span + phase - 0.5;
  return (s - floor(s / span) * span + 0.5) / vec2<f32>(dims);
}

fn sky_cloudFieldRim(fieldUv: vec2<f32>) -> f32 {
  return 1.0 - smoothstep(0.46, 0.5, max(abs(fieldUv.x - 0.5), abs(fieldUv.y - 0.5)));
}

fn sky_cloudFieldFarOf(far: vec4<f32>) -> vec3<f32> {
  return vec3<f32>(fma(far.a, ${HU}, far.r), far.gb);
}

fn sky_cloudClosing() -> f32 {
  return smoothstep(${rX}, 1.0, sky.cloudsCoverage);
}

fn sky_cloudSheet() -> f32 {
  return select(0.0, 1.0 - sky.cloudsCoverage + ${FU} * sky_cloudClosing(), sky.cloudsCoverage > ${rX});
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
`,GU=`  let tSilhouette = min(select(1e9, tBase, tBase > 0.0), select(1e9, tTop, tTop > 0.0));
  let sliceFade = 1.0 - smoothstep(max(SKY_CLOUD_FADE_NEAR * faceHeight, SKY_CLOUD_FADE_FLOOR_M), max(SKY_CLOUD_FADE_FAR * faceHeight, SKY_CLOUD_FADE_FLOOR_M * 3.0), tSilhouette);`,CU=`${Nx}
fn sky_cloudFieldFarTap(planePos: vec2<f32>) -> vec3<f32> {
  let fieldUv = (planePos - sky.cloudFieldCenter) * sky.cloudFieldInvWidth + 0.5;
  return sky_cloudFieldFarOf(textureSampleLevel(cloudField, lutSampler, sky_cloudFieldWrapUv(fieldUv, sky.cloudFieldPhase, textureDimensions(cloudField)), 0.0)) * sky_cloudFieldRim(fieldUv) * step(1e-6, sky.cloudFieldInvWidth);
}

const SKY_CLOUD_NEAR_FINE: f32 = ${Cx};
const SKY_CLOUD_NEAR_HANDOVER: f32 = ${Dx};

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

fn sky_cloudPhases(cosTheta: f32) -> array<f32, ${x8}> {
  var phases = array<f32, ${x8}>();
  var eccentricity = 1.0;
  for (var k = 0u; k < ${x8}u; k = k + 1u) {
    phases[k] = atm_henyeyGreensteinPhase(cosTheta, 0.8 * eccentricity) * 0.8 + atm_henyeyGreensteinPhase(cosTheta, -0.2 * eccentricity) * 0.2;
    eccentricity = eccentricity * ${z3};
  }
  return phases;
}

fn sky_cloudShares(d: f32, dq: f32, z: f32, sunUp: f32, sigma: f32, phases: array<f32, ${x8}>, powderWeight: f32, sunGate: f32, groundShare: f32) -> vec2<f32> {
  let pathLength = sky.cloudsThicknessM * max(1.0 - z, 0.0) / sunUp;
  let lightOd = (d * 0.4 + dq * 0.6) * sigma * pathLength;
  var sun = 0.0;
  var attenuation = 1.0;
  var contribution = 1.0;
  for (var k = 0u; k < ${x8}u; k = k + 1u) {
    sun = sun + attenuation * exp(-lightOd * contribution) * phases[k];
    attenuation = attenuation * ${q3};
    contribution = contribution * ${G3};
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

${GU}
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
${GU}
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
`;var DU=0.041666666666666664,T8=8;var NU=60000;var P3=4,kx=P3*P3;var xx=kx+2;var kU=`struct FullscreenOut {
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
`;var EU=`
const ATM_PLANET_RADIUS_KM: f32 = ${SU}.0;
const ATM_TOP_RADIUS_KM: f32 = ${xU}.0;
const ATM_VIEW_HEIGHT_KM: f32 = ${bU};
const ATM_PLANET_RADIUS_OFFSET_KM: f32 = ${vU};
const ATM_RAYLEIGH_SCALE_HEIGHT_KM: f32 = ${wU}.0;
const ATM_MIE_SCALE_HEIGHT_KM: f32 = ${IU};
const ATM_MIE_FORWARD_LOBE_G: f32 = ${TU};
const ATM_MIE_FORWARD_LOBE_WEIGHT: f32 = ${LU};
const ATM_MIE_HORIZON_AIR_MASS: f32 = ${AU};
const ATM_OZONE_CENTER_KM: f32 = ${OU}.0;
const ATM_OZONE_HALF_WIDTH_KM: f32 = ${RU}.0;
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

`,gU=($,J)=>`fn atm_sampleTransmittanceLut(lut: ${$}, lutSampler: sampler, radiusKm: f32, cosZenith: f32) -> vec3<f32> {
  return textureSampleLevel(lut, lutSampler, atm_transmittanceLutUv(radiusKm, cosZenith), ${J}0.0).rgb;
}

fn atm_sampleMultiScatterLut(lut: ${$}, lutSampler: sampler, radiusKm: f32, cosSunZenith: f32) -> vec3<f32> {
  let heightT = clamp((radiusKm - ATM_PLANET_RADIUS_KM) / (ATM_TOP_RADIUS_KM - ATM_PLANET_RADIUS_KM), 0.0, 1.0);
  let uv = vec2<f32>(clamp(cosSunZenith * 0.5 + 0.5, 0.0, 1.0), heightT);
  return textureSampleLevel(lut, lutSampler, uv, ${J}0.0).rgb;
}`,_U=`${EU}${gU("texture_2d<f32>","")}
`,zr=`${EU}${gU("texture_2d_array<f32>","0, ")}
`;var yU="scripted-sky-compile-failed";var z7="sky_time";var C3=0.95,fU=`${s6}
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
  return select(select(max(radiance, vec3<f32>(0.0)), lume_pbr_neutral_inverse(min(display, vec3<f32>(${C3}))), mode > 0.5), max(display, vec3<f32>(0.0)), mode > 1.5);
}
`;var Tx=2.5;function Lx($){return`${nU}
@group(${$}) @binding(0) var<uniform> sky: Sky;
@group(${$}) @binding(1) var skyViewLut: texture_2d<f32>;
@group(${$}) @binding(2) var transmittanceLut: texture_2d<f32>;
@group(${$}) @binding(4) var cloudField: texture_2d<f32>;
@group(${$}) @binding(5) var lutSampler: sampler;
@group(${$}) @binding(9) var cloudFieldNear: texture_2d<f32>;
@group(${$}) @binding(10) var<storage, read> cloudMap: array<u32>;
`}var Ax=`
fn sky_fadeOut(edge0: f32, edge1: f32, value: f32) -> f32 {
  return 1.0 - smoothstep(edge0, edge1, value);
}
`,Ix=`
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
`;function Ox($){return`
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
  return sky.sunIlluminance * atm_sunLimbDarkening(clamp(angle / angularRadius, 0.0, 1.0)) * transmittance * sky_discMask(angle, angularRadius) * sky.sunDiskIntensity * ${Tx};
}

struct SkyNight {
  celestial: vec3<f32>,
  moonlit: vec3<f32>,
}

fn sky_nightAir(direction: vec3<f32>) -> vec3<f32> {
  let up = clamp(direction.y, 0.0, 1.0);
  let horizon = vec3<f32>(${R6[0]}, ${R6[1]}, ${R6[2]});
  let zenith = vec3<f32>(${S6[0]}, ${S6[1]}, ${S6[2]});
  return mix(horizon, zenith, smoothstep(0.0, 0.3, up)) + horizon * 0.6 * exp(-up / 0.06);
}

fn sky_night(direction: vec3<f32>, sunDirection: vec3<f32>, transmittance: vec3<f32>) -> SkyNight {
  var night: SkyNight;
  night.celestial = vec3<f32>(0.0);
  night.moonlit = vec3<f32>(0.0);
  let nightVisibility = sky_fadeOut(${X7}, ${j7}, sunDirection.y);

  if (nightVisibility > 0.0) {
    night.moonlit = sky_nightAir(direction) * nightVisibility;

    let moon = sky_moonLayer(direction, 1.0);
    night.celestial = moon.rgb * nightVisibility * transmittance;
  }
  return night;
}

fn sky_nightVisible(sunDirection: vec3<f32>) -> bool {
  return sky_fadeOut(${X7}, ${j7}, sunDirection.y) > 0.0;
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
`}var Rx=`
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
`,hU=`  let cover = mix(settled.w, slice.w, sky.cloudMapPending);
  let shares = mix(settled.xyz * settled.w, slice.xyz * slice.w, sky.cloudMapPending) / max(cover, 1e-4);
  return vec4<f32>(shares, cover);
}`,Sx=`
fn sky_cloudMapShown(direction: vec3<f32>, mapSide: f32) -> vec4<f32> {
  let settled = sky_cloudMapRead(direction, mapSide);
  if (sky.cloudMapPending <= 0.0) {
    return settled;
  }
  let slice = sky_cloudLayer(direction, 0u, 0.5);
${hU}

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
${hU}

fn sky_domeCloudSteps() -> u32 {
  return select(u32(sky.cloudSteps), 0u, sky.cloudMapPending >= 1.0);
}
`,vx=`
var<private> sky_starLight: vec3<f32>;

fn sky_nightLayer(direction: vec3<f32>, pixelAngle: f32, t: f32) -> vec3<f32> {
  let sunDirection = normalize(sky.sunDirection);
  let night = sky_night(direction, sunDirection, sky_transmittance(direction));
  return night.celestial + night.moonlit + sky_starLight;
}

fn sky_weather(planeKm: vec2<f32>) -> f32 {
  return sky_cloudField(sky_cloudPlanePos(vec3<f32>(planeKm.x * 1000.0, 0.0, planeKm.y * 1000.0)));
}
`,wx="skyScriptDisc";function bx($,J,Q){if(Q.step===1)return`@group(${$}) @binding(${J}) var skyGrid: texture_2d<f32>;
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
`}var mU=/\b(?:dpdx|dpdy|fwidth)(?:Coarse|Fine)?\s*\(/;function uU($){return!mU.test($.defs)&&!mU.test($.body)}function Ex($){let J=$.script;if(!J)return"";return`${vx}
${$.familyReader?`
override ${wx}: f32 = 0.0;
var<private> sky_toneMapWord: f32 = 0.0;
fn sky_frameToneMap() -> f32 { return sky_toneMapWord; }`:`
const skyScriptDisc: f32 = ${$.sunDisc?"1.0":"0.0"};
fn sky_frameToneMap() -> f32 { return ${$.toneMapWgsl??"frame.toneMap"}; }`}
${J.paramsStruct}
@group(${J.paramsBinding.group}) @binding(${J.paramsBinding.binding}) var<uniform> skyScript: SkyScriptParams;
${J.grids?bx(J.paramsBinding.group,J.paramsBinding.binding+lU,J.grids):""}
var<private> ${z7}: f32 = 0.0;
${uU(J)?J.defs:J.defs.replace(/^fn /gm,`${D3} fn `)}

${uU(J)?"":`${D3} `}fn sky_scripted(directionIn: vec3<f32>, pixelAngle: f32, t: f32, cloudSteps: u32, cloudJitter: f32, cloudMapSide: f32) -> vec3<f32> {
  ${z7} = t;
  let direction = normalize(directionIn);
  let sunDirection = normalize(sky.sunDirection);
${J.body}
  return out_color;
}
`}function k3($){let J=$.sunDisc?`let r = max(sky.sunDiskAngularRadius, 1e-4);
  if (dot(direction, sunDirection) >= 1.0 - r * r) {
    return sky_sunDisc(direction, sunDirection, sky_transmittance(direction), 1.0);
  }
  `:"";return pU(`${Lx($.group)}
${_U}
${hQ.source}
${Ax}
${EJ}
${Ix}
${CU}
${cU}
${N3("cloudMap","","sky.cloudMapHalf","0u")}
${Sx}
${$.held?Rx:""}
${Ox($.held===!0)}
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
  let elevation = smoothstep(0.0, ${dU.toFixed(2)}, clamp(direction.y, 0.0, 1.0));
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
${Ex($)}`)}var T3="vec3<f32>((ndc.x + frame.proj[2][0]) / frame.proj[0][0], (ndc.y + frame.proj[2][1]) / frame.proj[1][1], -1.0) * mat3x3<f32>(frame.view[0].xyz, frame.view[1].xyz, frame.view[2].xyz)",zH=`  if (skybox.kind == ${V7}.0 && skybox.fogSky <= 0.0 && passLights.viewFogAmount <= 0.0 && skybox.groundShare <= 0.0) {
    return vec4<f32>(skybox.clearColor, 1.0);
  }
`,gx=`  let corner = vec2<f32>(f32((vertexIndex << 1u) & 2u), f32(vertexIndex & 2u));
`,UH=`  sky_toneMapWord = frame.toneMap;
`,HH=`fn sky_flatRadiance(direction: vec3<f32>, night: SkyNight) -> vec3<f32> {
  let total = sky_skyView(direction, sky_sunToward()) + night.moonlit;
  let cover = sky_flatCloudCover(direction, skybox.flatCloud);
  return sky_artistic(total * (1.0 - cover) + (night.celestial + sky_sunPoint(direction, sky_sunToward())) * sky_cloudClear(cover), direction) + sky_flatCloudLight(skybox.flatCloud) * cover;
}
`;function WH($){return`// lume sky dome - one shader, every sky kind behind a uniform selector
${$$}
${k3({sunDisc:!0,group:2,...$?{script:{...$,paramsBinding:{group:3,binding:bJ}}}:{held:!0}})}
${ox($!==void 0,!1)}`}var _x=`@group(3) @binding(${GH}) var skyStarLayer: texture_2d<f32>;

fn sky_starLayerAt(position: vec2<f32>) -> vec3<f32> {
  let last = textureDimensions(skyStarLayer) - vec2<u32>(1u);
  return textureLoad(skyStarLayer, min(vec2<u32>(position), last), 0).rgb;
}
`,yx=`@group(3) @binding(${YH}) var skyHalf: texture_2d<f32>;
@group(3) @binding(${KH}) var skyHalfDepth: texture_depth_2d;
@group(3) @binding(${qH}) var skyHalfTiles: texture_2d<f32>;

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
      if (textureLoad(skyHalfDepth, clamp(cell * 2 + vec2<i32>(x, y), vec2<i32>(0), last), 0) <= ${k8}) {
        return true;
      }
    }
  }
  return false;
}
`;function fx($){let J=$?UH:"",Q=T8/2+4,Z=(j,V)=>`t${V}_${j}`,X=[];for(let j=0;j<Q;j+=1)for(let V=0;V<Q;V+=1)if(V%(Q-1)+j%(Q-1)>0)X.push(`  let ${Z(V,j)} = sky_halfTexel(base + vec2<i32>(${V}, ${j}), last);`);for(let j=0;j<Q;j+=1)for(let V=0;V<Q;V+=1){if(V<1||j<1||V>Q-2||j>Q-2)continue;let Y=`${Z(V,j)}.rgb`;X.push(`  asked = min(asked, ${Z(V,j)}.w);`,`  top = max(top, ${Y});`,`  excess = max(excess, abs(${Z(V-1,j)}.rgb - 2.0 * ${Y} + ${Z(V+1,j)}.rgb) + abs(${Z(V,j-1)}.rgb - 2.0 * ${Y} + ${Z(V,j+1)}.rgb) - ${Y} * ${DU.toFixed(9)});`)}return`@fragment fn skyHalfFs(in: SkyVsOut) -> @location(0) vec4<f32> {
${J}  let full = in.position.xy * 2.0;
  let ndc = vec2<f32>(full.x / frame.viewportSize.x * 2.0 - 1.0, 1.0 - full.y / frame.viewportSize.y * 2.0);
  let direction = normalize(${T3});
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
  let base = tile * ${T8/2} - vec2<i32>(2);
  var asked = 1.0;
  var top = vec3<f32>(0.0);
  var excess = vec3<f32>(-1.0);
${X.join(`
`)}
  var marked = asked < 1.0 || any(top >= vec3<f32>(${NU.toFixed(1)})) || (skybox.halfAlone < 0.5 && any(excess > vec3<f32>(1e-6)));
  let starDims = vec2<i32>(textureDimensions(skyStarLayer));
  if (starDims.x > 1) {
    let starLast = starDims - vec2<i32>(1);
    for (var y = 0; y < ${T8}; y += 1) {
      for (var x = 0; x < ${T8}; x += 1) {
        marked = marked || any(textureLoad(skyStarLayer, clamp(tile * ${T8} + vec2<i32>(x, y), vec2<i32>(0), starLast), 0).rgb != vec3<f32>(0.0));
      }
    }
  }
  return vec4<f32>(select(0.0, 1.0, marked), 0.0, 0.0, 1.0);
}

@fragment fn skyBlendFs(in: SkyVsOut) -> @location(0) vec4<f32> {
${J}${zH}  let ndc = in.ndc;
  let direction = normalize(${T3});
  return sky_domeFinish(direction, in.position.xy, sky_halfBlend(in.position.xy));
}

@vertex fn skyTileVs(@builtin(vertex_index) vertexIndex: u32, @builtin(instance_index) tileIndex: u32) -> SkyVsOut {
  let grid = textureDimensions(skyHalfTiles);
  let tile = vec2<u32>(tileIndex % grid.x, tileIndex / grid.x);
  let corner = vec2<f32>(f32((0x32u >> vertexIndex) & 1u), f32((0x2Cu >> vertexIndex) & 1u));
  let pixel = min((vec2<f32>(tile) + corner) * ${T8}.0, frame.viewportSize);
  let marked = textureLoad(skyHalfTiles, vec2<i32>(tile), 0).r > 0.5;
  let ndc = select(vec2<f32>(2.0), vec2<f32>(pixel.x / frame.viewportSize.x * 2.0 - 1.0, 1.0 - pixel.y / frame.viewportSize.y * 2.0), marked);
  var out: SkyVsOut;
  out.position = vec4<f32>(ndc, ${k8}, 1.0);
  out.ndc = ndc;
  return out;
}
`}var hx=`${I3}
${L3(!0)}
${A3}
@group(1) @binding(0) var<uniform> passLights: PassLights;
${$H(1)}
${JH}
${aU}
@group(3) @binding(0) var<uniform> skybox: SkyBackground;
@group(3) @binding(1) var equirectTex: texture_2d<f32>;
@group(3) @binding(2) var equirectSampler: sampler;
@group(3) @binding(3) var equirectBlurCube: texture_2d_array<f32>;`,mx=`
  @location(1) @interpolate(flat) heldSun: vec4<f32>,
  @location(2) @interpolate(flat) heldLight: vec4<f32>,
  @location(3) @interpolate(flat) heldFlat: vec4<f32>,
  @location(4) @interpolate(flat) heldSubUv: vec4<f32>,`,ux=`
  let held = sky_holdView();
  out.heldSun = vec4<f32>(held.sunToward, held.sunUp);
  out.heldLight = vec4<f32>(held.sunLight, held.horizonZenith);
  out.heldFlat = vec4<f32>(held.sunFlat, held.tintPlain);
  out.heldSubUv = held.subUv;`,px=`  sky_held = SkyHeld(in.heldSun.xyz, in.heldSun.w, in.heldLight.xyz, in.heldLight.w, in.heldFlat.xyz, in.heldFlat.w, in.heldSubUv);
`;function cx($){let J="directional";if($===null)J="select(pow(directional, skybox.gradientCurve), directional, skybox.gradientCurve == 1.0)";else if($)J="pow(directional, skybox.gradientCurve)";return`
fn sky_domeGradient(direction: vec3<f32>, position: vec2<f32>) -> vec3<f32> {
  let screenUv = position / frame.viewportSize;
  let directional = clamp(direction.y, 0.0, 1.0);
  let curved = ${J};
  let elevation = mix(curved, 1.0 - screenUv.y, skybox.screenWeight);
  return mix(skybox.horizonColor, skybox.zenithColor, elevation);
}`}var lx=`    let rise = sky.cloudEye.y - sky.cloudsAltitudeM - sky.cloudsThicknessM;
    if (clouds.a > 0.0 && direction.y < 0.0 && rise > 0.0 && frame.proj[2][3] != 0.0) {
      let reach = rise / -direction.y;
      let depth = reach * max(-(frame.view * vec4<f32>(direction, 0.0)).z, 1e-3);
      color = mix(color, mix(clouds.rgb, fogColor, shade_fogFactor(depth, direction.y * reach)), clouds.a * fog);
    }
`,dx=`
  let fog = shade_skyFogFactor(direction, skybox.fogSky, skybox.openSky);
  var fogColor = vec3<f32>(0.0);
  if (fog > 0.0 || skybox.groundShare > 0.0) {
    fogColor = shade_fogLean(direction, shade_fogTurn(direction));
  }
  if (fog > 0.0) {
    color = mix(color, fogColor, fog);
    let clouds = sky_deck;
${lx}  }
`,nx=`fn sky_bodySpan(across: f32, forward: f32, sine: f32) -> vec2<f32> {
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
`;function ix($,J){let Q=$?"sky_scripted":"sky_radiance",Z=!$;return`${hx}
${$?_x+yx:""}${QH}

struct SkyVsOut {
  @builtin(position) position: vec4<f32>,
  @location(0) ndc: vec2<f32>,${Z?mx:""}
}

${Z?nx:""}@vertex fn skyVs(@builtin(vertex_index) vertexIndex: u32${Z?", @builtin(instance_index) body: u32":""}) -> SkyVsOut {
${gx}  var out: SkyVsOut;
  let ndc = ${Z?"sky_bodyNdc(body, corner)":"corner * 2.0 - 1.0"};
  out.position = vec4<f32>(ndc, ${k8}, 1.0);
  out.ndc = ndc;${Z?ux:""}
  return out;
}

${cx(null)}

${$?"":HH}
@fragment fn skyFs(in: SkyVsOut) -> @location(0) vec4<f32> {
${J?UH:""}${zH}${Z?px:""}
  var direction: vec3<f32>;
  if (frame.proj[2][3] != 0.0) {
    let ndc = in.ndc;
    direction = normalize(${T3});
  } else {
    let nearPoint = frame.inverseViewProj * vec4<f32>(in.ndc, ${rU}, 1.0);
    let farPoint = frame.inverseViewProj * vec4<f32>(in.ndc, ${k8}, 1.0);
    direction = normalize(farPoint.xyz / farPoint.w - nearPoint.xyz / nearPoint.w);
  }
${$?`  let outputPixelAngle = length(fwidth(direction)) * (frame.viewportSize.x / frame.canvasSize.x);
  let cloudJitter = ${s7("in.position.xy")};
  sky_starLight = sky_starLayerAt(in.position.xy);
  let scripted = ${Q}(direction, outputPixelAngle, frame.worldTime, sky_domeCloudSteps(), cloudJitter, sky.cloudMap);
`:""}
  var color = skybox.clearColor;
  let kind = skybox.kind;
  if (kind == ${v6}.0) {
    color = sky_domeGradient(direction, in.position.xy);
  } else if (kind == ${g6}.0) {
${$?"    color = mix(sky_domeGradient(direction, in.position.xy), scripted, skybox.physicalBlend);":`
    let night = sky_nightAt(direction, sky_sunToward());
    var radiance = vec3<f32>(0.0);
    if (skybox.flatShare < 1.0) {
      var layer = vec4<f32>(0.0);
      if (sky.cloudMap > 0.5 || sky.cloudsEnabled > 0.5) {
        let cloudJitter = ${s7("in.position.xy")};
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
  } else if (kind == ${SJ}.0) {
    let cosYaw = cos(skybox.equirectYaw);
    let sinYaw = sin(skybox.equirectYaw);
    let rotated = vec3<f32>(direction.x * cosYaw - direction.z * sinYaw, direction.y, direction.x * sinYaw + direction.z * cosYaw);
    let pixelAngle = length(fwidth(direction));
    let texelsPerRadian = skybox.equirectWidth * ${1/p8};
    let lod = max(log2(max(pixelAngle * texelsPerRadian, 1e-6)), 0.0);
    let sharp = textureSampleLevel(equirectTex, equirectSampler, sky_equirectUv(rotated), lod).rgb;
    let blurred = lume_cubeSampleLevel(equirectBlurCube, equirectSampler, direction, skybox.equirectBlurMip, skybox.equirectBlurLevels).rgb;
    color = mix(sharp, blurred, skybox.equirectBlurLane);
  }
${dx}  if (skybox.groundShare > 0.0) {
    let lit = skybox.groundColor * (0.31830988618 * (passLights.ambientMean + max(passLights.sunDirection.y, 0.0) * passLights.sunColor * passLights.sunIntensity));
    let ground = mix(lit, fogColor, shade_fogFactor(${vQ}.0 / max(-direction.y, 1e-4), direction.y));
    color = mix(color, ground, skybox.groundShare * (1.0 - smoothstep(-0.002, 0.0, direction.y)));
  }
  return vec4<f32>(color, 1.0);
}
`}function ox($,J){let Q=ix($,J);return $?rx(Q,J):Q}function rx($,J){let Q=$.indexOf("@fragment fn skyFs("),Z=$.indexOf("  var color = skybox.clearColor;",Q),X=$.indexOf(`  return vec4<f32>(color, 1.0);
}
`,Z)+34,j=`fn sky_domeFinish(direction: vec3<f32>, position: vec2<f32>, scripted: vec3<f32>) -> vec4<f32> {
${$.slice(Z,X).replaceAll("in.position.xy","position")}`;return`${$.slice(0,Q)}${j}
${fx(J)}
${$.slice(Q,Z)}  return sky_domeFinish(direction, in.position.xy, scripted);
}
${$.slice(X)}`}var ax=2,Ta=S0*(3-Math.sqrt(5)),sx=256,La=sx/2;var A8=8,Aa=eU*A8*c0*16,Ia=xJ+1,iU=($)=>tU.reduce((J,Q,Z)=>`select(${J}, ${Q.toFixed(4)}, ${$} == ${Z+1}u)`,Z7.toFixed(4)),tx=`fn sky_stepMedian(first: u32) -> vec3f {
${"0:0 1:32 2:64 3:96 4:128 5:160 6:192 7:224".replace(/(\d):(\d+) ?/g,`  var r$1 = fogHorizonRays[first + $2u].xyz;
`)}${"0:01 1:23 2:45 3:67 4:02 5:13 6:46 7:57 8:12 9:56 10:04 11:15 12:26 13:37 14:24 15:35 16:12 17:34 18:56".replace(/(\d+):(\d)(\d) ?/g,`  let lo$1 = min(r$2, r$3);
  r$3 = max(r$2, r$3);
  r$2 = lo$1;
`)}  return r3 * 0.5 + r4 * 0.5;
}`,ex=1;var oU=3;var $T=`struct SkyOffscreen {
  faceIndex: u32,
  toneMap: f32,
  _pad: u32,
  horizon: u32,
}
@group(1) @binding(${VH}) var<uniform> skyOffscreen: SkyOffscreen;`,FH="select(skyOffscreen.toneMap, frame.toneMap, skyOffscreen.horizon != 0u)";function JT($,J){let Q=$?"sky_scripted":"sky_radiance",Z=p8/c0,X=Math.sqrt(1-Z7*Z7).toFixed(9),j=$?`    let phi = (f32(index) + (f32(strand) + 0.5) / ${A8}.0 - 0.5) * ${Z.toFixed(9)};`:`    let sunToward = normalize(sky.sunDirection);
    let along = (f32(index) + (f32(strand) + 0.5) / ${A8}.0 - 0.5) * ${(2/c0).toFixed(9)};
    let share = along - 2.0 * floor((along + 1.0) * 0.5);
    let phi = select(atan2(sunToward.z, sunToward.x), 0.0, length(sunToward.xz) < 1e-6) + ${S0.toFixed(9)} * share * abs(share);`;return`${I3}
${L3(!0)}
@group(3) @binding(0) var<uniform> skybox: SkyBackground;
@group(1) @binding(${ZH}) var<storage, read_write> fogHorizonOut: array<vec4<f32>>;
@group(1) @binding(${XH}) var<storage, read_write> fogHorizonRays: array<vec4<f32>>;
${$T}
${qU}
${kU}
${$?"":HH}
${tx}
@fragment fn offscreenFs(in: FullscreenOut) -> @location(0) vec4<f32> {
${J?`  sky_toneMapWord = ${FH};
`:""}  sky_tintsLayer = f32(skyOffscreen.horizon == 0u);
  let horizon = skyOffscreen.horizon != 0u;
  let mirror = horizon && skyOffscreen.horizon >= ${oU}u;
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
    let strand = ray % ${A8}u;
    let rise = ${iU(`ray / ${A8}u`)};
    let level = select(sqrt(max(1.0 - rise * rise, 0.0)), ${X}, ray < ${A8}u);
${j}
    let mirrorPhi = (f32(index) + 0.5) * ${(S0/L8).toFixed(9)};
    let up = (f32(ray) + 0.5) / ${x3}.0 - 1.0;
    let ring = sqrt(max(1.0 - up * up, 0.0));
    direction = select(vec3<f32>(cos(phi) * level, rise, sin(phi) * level), vec3<f32>(cos(mirrorPhi) * ring, up, sin(mirrorPhi) * ring), mirror);
  }
  var radiance = vec3<f32>(0.0) + ${Q}(direction, pixelAngle, t, min(u32(sky.cloudSteps), ${oX}u), 0.5${$?", 0.0":""});
${$?"":`
  if (horizon && !mirror && skybox.flatShare > 0.0) {
    radiance = mix(radiance, sky_flatRadiance(direction, sky_nightAt(direction, sky_sunToward())), skybox.flatShare);
  }
`}  if (!horizon) {
    return vec4<f32>(radiance, 1.0);
  }
  if (skyOffscreen.horizon == ${ex}u) {
    if ((u32(in.position.y) & 1u) == 0u) {
      fogHorizonRays[ray * ${c0}u + index] = vec4<f32>(radiance, 1.0);
    }
    return vec4<f32>(0.0);
  }
  if (skyOffscreen.horizon == ${oU}u) {
    if ((u32(in.position.y) & 1u) == 0u) {
      fogHorizonRays[ray * ${2*L8}u + index] = vec4<f32>(radiance, 1.0);
    }
    return vec4<f32>(0.0);
  }
  let row = u32(in.position.y);
  let ringRow = !mirror && row > 0u;
  if (ringRow && index >= ${c0}u) {
    return vec4<f32>(0.0);
  }
  let rise = select(${iU("row")}, max((f32(row) + 0.5) * ${(2/x3).toFixed(9)} - 1.0, 0.0), mirror);
  let curved = select(pow(rise, skybox.gradientCurve), rise, skybox.gradientCurve == 1.0);
  let gradient = mix(skybox.horizonColor, skybox.zenithColor, curved);
  var color = skybox.clearColor;
  let kind = skybox.kind;
  if (kind == ${v6}.0) {
    color = gradient;
  } else if (kind == ${g6}.0) {
    radiance = vec3<f32>(0.0);
    if (mirror) {
      let first = 2u * row * ${2*L8}u + 2u * index;
      let a = fogHorizonRays[first].xyz;
      let b = fogHorizonRays[first + 1u].xyz;
      let c = fogHorizonRays[first + ${2*L8}u].xyz;
      let d = fogHorizonRays[first + ${2*L8+1}u].xyz;
      radiance = (a + b + c + d - max(max(a, b), max(c, d)) - min(min(a, b), min(c, d))) * 0.5;
    } else if (index < ${c0}u) {
      radiance = sky_stepMedian(row * ${A8*c0}u + index);
    } else if (index == ${sU}u) {
${$?`
      for (var each = 0u; each < ${c0}u; each++) {
        radiance += sky_stepMedian(each);
      }
      radiance /= ${c0}.0;`:`
      for (var each = 0u; each < ${c0}u; each++) {
        let u = (f32(each) + vec2f(-0.5, 0.5)) * ${(2/c0).toFixed(9)};
        let g = select(u * abs(u), 2.0 - (2.0 - u) * (2.0 - u), u > vec2f(1.0));
        radiance += sky_stepMedian(each) * (g.y - g.x);
      }
      radiance *= 0.5;`}
    }
    color = mix(gradient, radiance, skybox.physicalBlend);
  }
  let sunEntry = ${$?"vec4<f32>(0.0)":`vec4<f32>(normalize(sky.sunDirection), select(0.0, 1.0, kind == ${g6}.0))`};
  let at = select(select(index, ${gX}u + (row - 1u) * ${c0}u + index, ringRow), row * ${L8}u + index, mirror);
  fogHorizonOut[at] = select(vec4<f32>(color, select(select(${$?"sky_scriptWarmAir":"1.0"}, skybox.fogSky, ringRow), 1.0 + skybox.openSky, mirror)), sunEntry, !mirror && !ringRow && index == ${xJ}u);
  return vec4<f32>(0.0);
}
`}function BH($){return`// lume sky offscreen reader - the light's capture and the fog's table over one radiance call
${$$}
${$?`${A3}
@group(1) @binding(${jH}) var<uniform> passLights: PassLights;
`:""}${k3({sunDisc:!1,group:ax,toneMapWgsl:FH,...$?{script:{defs:$.defs,body:$.body,paramsStruct:$.paramsStruct,paramsBinding:{group:3,binding:bJ},...$.grids?{grids:$.grids}:{}}}:{}})}
${JT($!==void 0,!1)}`}var QT={"sky:direction":"direction","sky:pixelAngle":"pixelAngle","sky:sunDirection":"sunDirection","sky:cloudSteps":"cloudSteps","sky:cloudJitter":"cloudJitter","sky:cloudMapSide":"cloudMapSide",time:z7},ZT=["direction","pixelAngle"],XT=["sun","moon","atmosphere","transmittance","night","clouds","weather","param","display","eye","cloudAltitude","quality"],MH=["direction","radiance","disc"],PH=["sun","ambient"],jT=["sample","size"],VT=["size","data"],YT=/\bsky_nightLayer\(/,KT=/\bsky_atmosphere\(/,CH=($)=>typeof $==="number"&&Number.isInteger($)&&$>=1;function qT($,J){let Q=`world.param("${$}", { size: [w, h], data }) takes a grid: size two whole numbers 1 or more, data a list of w \u00d7 h numbers row by row (data[x + y * w]; omit it for zeros)`;for(let K of Object.keys(J))if(!VT.includes(K))throw TypeError(`${Q}; it has no "${K}".`);let Z=J.size,[X,j]=Array.isArray(Z)&&Z.length===2?Z:[];if(!CH(X)||!CH(j))throw TypeError(`${Q}; size is ${Array.isArray(Z)?`[${Z.map(U7).join(", ")}]`:U7(Z)}.`);let V=new Float32Array(X*j),Y=J.data;if(Y!==void 0){if(!Array.isArray(Y))throw TypeError(`${Q}; data is ${U7(Y)}.`);if(Y.length!==X*j)throw TypeError(`${Q}; data holds ${Y.length} numbers, a ${X} \u00d7 ${j} grid holds ${X*j}.`);Y.forEach(function(K,G){if(!o(K))throw TypeError(`${Q}; data[${G}] is ${U7(K)}.`);V[G]=K})}return{name:$,width:X,height:j,defaults:V}}function GT($){let J=$.reduce((Q,Z)=>Math.max(Q,Z.width,Z.height),1);for(let Q=1;;Q*=2){let Z=zT($,Q);if(Math.max(Z.width,Z.height)<=kH*Q||Q>=J)return Z}}function zT($,J){let Q=(z)=>Math.ceil(z/J),Z=$.reduce((z,H)=>z+Q(H.width)*Q(H.height),0),X=Math.max(Math.ceil(Math.sqrt(Z)),...$.map((z)=>Q(z.width))),j=$.map((z,H)=>H).sort((z,H)=>$[H].height-$[z].height||z-H),V=Array($.length),Y=0,K=0,G=0,q=0;for(let z of j){let H=$[z],U=Q(H.width);if(Y+U>X)K+=G,Y=0,G=0;V[z]={...H,x:Y*J,y:K*J},Y+=U,G=Math.max(G,Q(H.height)),q=Math.max(q,Y)}return{width:q*J,height:(K+G)*J,step:J,list:V}}function UT($,J){return $.replace(/\/\*skyGrid(\d+)\*\//g,function(Q,Z){let X=J.list[Number(Z)];return J.step===1?`vec4<f32>(${X.x}.0, ${X.y}.0, ${X.width}.0, ${X.height}.0)`:`vec4<u32>(${X.x}u, ${X.y}u, ${X.width}u, ${X.height}u)`})}var E0=c("vec3f"),HT=c("vec4f"),gJ=c("f32");function I8($,J,Q){if($ instanceof B0)return Z0($,J);if(typeof $==="number"||typeof $==="boolean")return Z0(_J($,J),J);throw TypeError(`${Q} takes a number or a builtin/tsl node, got ${$===null?"null":typeof $}.`)}function WT($){try{return D8($)}catch(J){if(!(J instanceof X0))throw J;let Q=J.detail?.code;if(Q==="non-finite-constant")throw new X0(`${J.message} \u2014 in a sky script every number that meets a node is a node: float(0.55).sub(w), never 0.55 - w.`,J.detail);if(Q==="input-missing")throw new X0(`${J.message} \u2014 a sky script sees ray.direction, ray.pixelAngle, time and the world (world.sun, world.moon, world.atmosphere, world.transmittance, world.night, world.clouds(), world.weather(), world.param(), world.display(), world.eye, world.cloudAltitude, world.quality); there is no surface and no uv on the dome.`,J.detail);throw J}}function FT($,J){if($.textures.length>0)throw new X0("sky(ray, world) samples a texture of its own \u2014 a sky script has no textures; the sky's field, night bake and atmosphere arrive as world.weather(p), world.night and world.atmosphere.");if($.storages.length>0)throw new X0("sky(ray, world) reads a storage buffer \u2014 a sky script has none.");if($.varyings.length>0)throw new X0("sky(ray, world) calls vertexStage() \u2014 a sky script runs per pixel over the dome; read ray.direction directly.");if(RH(J))throw new X0("sky(ray, world) reads audioLevel or audioSpectrum \u2014 the sky is also captured for the world's light, which hears no music; a material or a look reads them.");if($.uniforms.some((Q)=>LH(Q.name)!==null))throw new X0("sky(ray, world) reads where a thing is drawn (objectWorldMatrix, objectPosition, objectScale or objectDirection with an id) \u2014 the sky is also captured for the world's light, which follows no one thing; a material or a look reads them.");PT($)}var _H=`struct SkyScriptParams {
  _pad: vec4<f32>,
}`,O3=null;function BT(){if(O3===null){let $={defs:"",body:"let out_color: vec3<f32> = vec3<f32>(0.0);",paramsStruct:_H},J=new Set(H7(WH($)));O3=new Set(H7(BH($)).filter((Q)=>J.has(Q)))}return O3}var MT=new WeakMap;function DH($){return h$(MT,$,()=>({declares:H7($.source),reads:S3($.source)}))}function PT($){if($.modules.includes(IH()))throw new X0("sky(ray, world) calls builtin/lighting fogColor \u2014 the fog's colour is the sky's own horizon, which this script draws; a sky reads sunDirection, sunRadiance, ambientRadiance, the wind and the weather, or world.sun and world.moon.");let J=new Set(H7($.fnDefs));for(let Z of $.modules)for(let X of DH(Z).declares)J.add(X);let Q=$.modules.map((Z)=>({module:Z,reads:DH(Z).reads}));Q.push({module:null,reads:S3($.fnDefs)});for(let{module:Z,reads:X}of Q)for(let[j,V]of X){if(J.has(j)||BT().has(j))continue;if(Z===OH())throw new X0("sky(ray, world) calls a builtin/lighting point query (sunVisibility, lightsAt, lightCount, lightRadiance, lightPosition) \u2014 those answer a lit point in a material's colorNode / emissiveNode or a look pass, and a sky ray reaches none; a sky reads sunDirection, sunRadiance, ambientRadiance, the wind and the weather, or world.sun and world.moon.");throw new X0(`sky(ray, world) lowers to engine WGSL that reads \`${j}\`${V===""?"":` in ${V}()`}, which the sky's shaders do not declare \u2014 the engine's lowering of your script is at fault here, not your logic.`)}}var yH=($)=>wH("sky",yU,AH,$);function CT($,J,Q){if(Q.size>0)yH({ref:$,hash:J,message:`Sky script "${$}": ${bH(Q)}`,ranOn:!0})}function DT($,J,Q,Z="high",X={quality:!1}){let j=TH(),V=NH($,J,Q,Z,X,[]);if(V===null||V.uniformByteSize<=j)return V;let Y=V.paramTables.map((G)=>G.rows),K=V.uniformByteSize-16*Y.reduce((G,q)=>G+q,0);return NH($,J,Q,Z,X,NT(Y,Math.floor((j-K)/16)))}function NT($,J){if(J<=$.length)return $.map(()=>1);let Q=[...$],Z=$.map((j,V)=>V).sort((j,V)=>$[j]-$[V]||j-V),X=J;for(let j=0;j<Z.length;j+=1){let V=Math.floor(X/(Z.length-j));if($[Z[j]]<=V){X-=$[Z[j]];continue}let Y=Z.slice(j).sort((G,q)=>$[q]-$[G]||G-q),K=X-V*Y.length;for(let G=0;G<Y.length;G+=1)Q[Y[G]]=V+(G<K?1:0);break}return Q}function NH($,J,Q,Z,X,j){let V=N0("sky:direction","vec3f"),Y=N0("sky:pixelAngle","f32"),K=N0("time","f32"),G=N0("sky:sunDirection","vec3f"),q=N0("sky:cloudSteps","u32"),z=N0("sky:cloudJitter","f32"),H=N0("sky:cloudMapSide","f32"),U=gJ`skyScriptDisc`,W={},M=new Map,P=new Map,C=[],D=new Map,B=new Map,N=()=>X.quality?`${$.hash}@${Z}`:$.hash,T=function(O,S){let g={ref:J,hash:N(),message:O,...S?{data:S}:{}};return vH(X,g),yH(g),null},L=function(O,S){let g=y$(O);return T(R3(S(g),B),{error:g})},k=[],R=new Map,w=!1,p=!1,f=function(O,S){let{width:g,rows:E,defaults:h}=gH(`world.param("${O}", list)`,S),J0=Math.min(E,j[C.length]??E),d=`table${C.length}`;C.push({name:O,field:d,width:g,rows:J0,defaults:J0<E?h.subarray(0,J0*4):h});let b=EH(`world.param("${O}")`,B,`skyScript.${d}[`,g,E,J0,S);return D.set(O,b),b},a=function(O,S){let g=qT(O,S),E=k.length;k.push(g);let h=_6(`world.param("${O}")`,jT,B,{sample:(J0)=>V0("wgslExpr","f32",[I8(J0,"vec2f",`world.param("${O}").sample(uv)`)],{parts:["sky_gridSample(",`, ${`/*skyGrid${E}*/`})`],module:null}),size:[g.width,g.height]});return R.set(O,h),h},l=_6("ray",ZT,B,{direction:V,pixelAngle:Y}),U0=_6("world.sun",MH,B,{direction:G,radiance:E0`sky_sunRadiance(${G})`,disc:(O=1)=>E0`(sky_sunDisc(${V}, ${G}, sky_transmittance(${V}), ${I8(O,"f32","world.sun.disc(size)")}) * ${U})`}),y0=E0`normalize(sky.moonDirection)`,g0=_6("world.moon",MH,B,{direction:y0,radiance:E0`(sky.moonColor * sky.moonIntensity * sky.moonEnabled)`,disc:(O=1)=>E0`(sky_moonLayer(${V}, ${I8(O,"f32","world.moon.disc(size)")}).rgb * ${U})`}),G0=_6("world",XT,B,{sun:U0,moon:g0,atmosphere:E0`sky_atmosphere(${V}, ${G})`,transmittance:E0`sky_transmittance(${V})`,night:E0`sky_nightLayer(${V}, ${Y}, ${K})`,eye:E0`sky.cloudEye`,cloudAltitude:gJ`sky.cloudsAltitudeM`,clouds:function(O){p=!0;let S=E0`sky_sunRadiance(${G})`,g=E0`sky_cloudAmbient(${V}, ${G}, vec3<f32>(0.0))`;if(O!==void 0){if(typeof O!=="object"||O===null||Array.isArray(O))throw TypeError("world.clouds(light) takes { sun, ambient } \u2014 the sun's radiance at the cloud and the sky light behind it (both vec3); omit it for the physical sky's own light.");for(let h of Object.keys(O))if(!PH.includes(h))throw TypeError(`world.clouds({ ${h} }) \u2014 the light has: ${PH.join(", ")}.`);let E=O;if(E.sun!==void 0)S=I8(E.sun,"vec3f","world.clouds({ sun })");if(E.ambient!==void 0)g=I8(E.ambient,"vec3f","world.clouds({ ambient })")}return HT`sky_cloudsLit(sky_cloudLayerShown(${V}, ${H}, ${V}, ${q}, ${z}), ${V}, ${S}, ${g})`},weather:(O)=>gJ`sky_weather(${I8(O,"vec2f","world.weather(p)")})`,param:function(O,S){if(typeof O!=="string"||O.length===0)throw TypeError("world.param(name, default) takes the param's name as a string \u2014 the live value rides atmosphere.sky.params.<name>.");let g=P.get(O)??D.get(O)??R.get(O);if(g)return g;let E=xH(S);if(E!==null)return f(O,E);if(G9(S)&&!(S instanceof B0)&&!ArrayBuffer.isView(S))return a(O,S);let h=typeof S==="boolean"?Number(S):S??0;if(!o(h))throw TypeError(`world.param("${O}", default) takes a finite number, a boolean, a list (a table: .element(i) reads row i) or { size: [w, h], data } (a grid: .sample(uv) reads it filtered) as its default.`);let J0=OJ(h),d=RJ(J0);if(d)d.name=O,W[O]=d,M.set(d,h);return P.set(O,J0),J0},display:function(O){w=!0;let S=I8(O,"vec3f","world.display(color)").toVar(),g=gJ`sky_frameToneMap()`,E=S.toVar(),h=E0`min(${S}, vec3<f32>(${_J(C3,"f32")}))`;return t0(g.lessThan(-0.5),function(){t0(g.lessThan(-3.5),function(){E.assign(E0`max(${S}, vec3<f32>(0.0))`)}).ElseIf(g.lessThan(-2.5),function(){E.assign(E0`max(lume_agx_inverse(${h}), vec3<f32>(0.0))`)}).ElseIf(g.lessThan(-1.5),function(){E.assign(E0`lume_cineon_inverse(${h})`)}).Else(function(){E.assign(E0`lume_reinhard_inverse(${h})`)})}).Else(function(){E.assign(E0`sky_displayRadiance(${S})`)}),E},get quality(){return X.quality=!0,Z}}),H0=null,_0=null;try{let{result:O,scope:S}=kJ(function(){let g;try{let h=SH(Q,$,J);g=h.sky??h.default}catch(h){return L(h,(J0)=>`Sky script "${J}" failed to compile: ${J0}`)}if(typeof g!=="function")return T(`Sky script "${J}" must export a sky(ray, world) function that returns a colour node. Fix: export function sky(ray, world) { \u2026 return color; }`);let E;try{E=g(l,G0)}catch(h){return L(h,(J0)=>`Sky script "${J}" threw while composing the sky: ${J0}`)}if(!(E instanceof B0))return T(R3(`Sky script "${J}" must return a colour node from sky(ray, world) (e.g. world.atmosphere.add(world.sun.disc())). It returned ${E===null?"null":typeof E}.`,B));return Z0(_J(E,"vec3f"),"vec3f")});H0=O,_0=S}catch(O){return L(O,(S)=>`Sky script "${J}" failed while recording its graph: ${S}`)}if(H0===null)return null;try{let O=new s9,S=WT({stage:"fragment",scope:_0,outputs:[{name:"color",node:H0}],inputs:QT,symbolNames:O,uniformName:(_)=>`skyScript.${O.name("uniform",_.id)}`}),g=`${S.body}
${S.fnDefs}`;FT(S,g);let E=vX(S.uniforms,(_)=>O.name("uniform",_.id),C.map((_)=>({field:_.field,vec4s:_.rows}))),h=S.uniforms.length>0||C.length>0,J0=h?E.wgslStruct("SkyScriptParams"):_H,d=k.length>0?GT(k):null,b=(_)=>d?UT(_,d):_,y=S.modules.map((_)=>_.source.trim());if(w)y.push(fU.trim());if(S.fnDefs.trim().length>0)y.push(S.fnDefs.trim());let n=KT.test(g);return y.push(`const sky_scriptWarmAir: f32 = ${n?1:0}.0;`),CT(J,$.hash,B),{ref:J,hash:N(),quality:X.quality?Z:null,defs:b(y.join(`

`)),body:b(S.body),paramsStruct:J0,...d?{grids:d}:{},uniformSlots:S.uniforms,uniformOffsets:E.offsets,uniformByteSize:h?E.byteSize:16,paramSlots:W,paramDefaults:M,paramTables:C.map((_)=>({name:_.name,width:_.width,rows:_.rows,offset:E.arrayOffsets.get(_.field)??0,defaults:_.defaults})),readsClouds:p,readsNight:YT.test(g),readsAtmosphere:n}}catch(O){return L(O,(S)=>`Sky script "${J}" could not be lowered to a shader: ${S}`)}}var fH=2900;var kT=function(){hH({limitMs:fH,now:()=>performance.now(),turn:mH,onStop:function($,J,Q){__sc.warn(`[frame-stretch] creator code held the picture's thread ${Math.round(J)} ms near line ${$}, and was stopped; its build draws the fallback look
${Q.stack??""}`)}})};;

function aa(H,V,K,U,W,Y){if(H=0,Math.abs(V)>Math.abs(K))U[W]=-Y,U[W+1]=V,U[W+2]=0,U[W+3]=H;else U[W]=0,U[W+1]=-K,U[W+2]=Y,U[W+3]=H;
return H}
function ea(X){X.x=s8.x,X.y=s8.y,X.z=s8.z,X.w=s8.w;
}
function fa(z,G,Q,Z,j,V,Y,K){let H=z/Math.sqrt(G);Q[Z]=j*H,Q[Z+1]=V*H,Q[Z+2]=Y*H,Q[Z+3]=K*H,ZZ(Q,Z,4)
}
function ga($){let J={x:0,y:0,z:0};return DB(H9($,i2),0,J),J
}
function ia(Q,J){throw Error(`wgsl rows: the row ${JSON.stringify(Q)} names the slot "${J}", which its table does not carry`);
}
function ka(Q,J,Z){let X=Q.attributes.filter((H)=>J.has(H.name)),j=new Set(X.map((H)=>H.shaderLocation)),V=[],Y=[];for(let[H,U]of Z.entries()){let W=Array.from(U.attributes).filter((M)=>j.has(M.shaderLocation));if(W.length===0)continue;V.push(H),Y.push({...U,attributes:W})}let K={...Q,attributes:X};
ba[0]=V,ba[1]=Y,ba[2]=K}
function la(){throw Error("lume native vertex reader: wide layout has no packed source");
}
function ma(z,q,K,G){return{surface:{slots:[],vertexBuffers:[],packed:{binding:z,streams:q}},layout:K,reader:{wgsl:G.native,inputs:G.inputs}}
}
function na(J,$){let Q=`material.${L5}[${J>>2}].${HV[J&3]}`;return $==="u32"?Q:`bitcast<i32>(${Q})`
}
function oa(X,$,j,Z){X.push($.slice(j));let V=X.join(""),Y=V.indexOf(k9);return Y<0?V:`${V.slice(0,Y)}${Z}${V.slice(Y+1)}`
}
function pa(J,Q,Z){return{slotOf:J,decimalVectors:Math.ceil(Q/4),wholeVectors:Math.ceil(Z/4)}
}
function qa(Z,X,j){return{rewrite:(V)=>Z.reduce((Y,K)=>K.rewrite(Y),V),rewriteScope:(V)=>V===null?null:Z.reduce((Y,K)=>K.rewriteScope(Y),V),rolled:X,tableRows:j}
}
function ra(j,H){j.push({region:H.instance.id,roots:j6(H.instance)});
}
function sa(j,$,Z,X){j=`i[${$.branches.map((V)=>`${V.cond===null?"-":Z(V.cond)}{${X(V.scope)}}`).join("|")}]`;
return j}
function ta(j,$,Z){j=`t${$.buffer.id}${$.component??""}:${Z($.index)}:${Z($.value)}`;
return j}
function ua(Z,Q,J){let X=this.instance(Z.instance);return X!==Z.instance||!q9(Q,J.inputs)?V0(Z.kind,J.type,Q,{instance:X}):J
}
function va($){this.instancesDone.set($.id,$);let Q=this.region;this.region=$.id;let Z=this.rewriteScope($.body);this.region=Q;
return Z}
function wa(X,$,Q){if(X={...$,value:Q($.value)},X.value===$.value)return $;return X;
}
function xa($,Q,Z){{let j=$.branches.map((V)=>({cond:V.cond===null?null:Q(V.cond),scope:Z(V.scope)}));if(j.every((V,Y)=>V.cond===$.branches[Y].cond&&V.scope===$.branches[Y].scope))return $;return{kind:"if",branches:j}}
return ca}
function ya(Q,$,Z){{let j=Q($.start),V=Q($.end),Y=Z($.scope);if(j===$.start&&V===$.end&&Y===$.scope)return $;return{...$,start:j,end:V,scope:Y}}
return ca}
function za(X,$,Q){if(X={...$,node:Q($.node)},X.node===$.node)return $;return X;
}
function Ba($,Q){let j=$.cond===null?null:Q($.cond);if(j===$.cond)return $;return{kind:"discard",cond:j}
}
function Ca(Q,$){{let j=Q($.index),V=Q($.value);if(j===$.index&&V===$.value)return $;return{...$,index:j,value:V}}
return ca}
function Da(Q){return{walk:null,failAt:Math.max(1,Q.failAt),splitAt:-1};
}
function Ea($,J,Q){{let Z=$.filter((X)=>X.kind==="if");for(let X=1;X<this.n;X+=1)if(Z[X].branches.length!==J.branches.length)return this.fail(X);for(let X=0;X<J.branches.length;X+=1){let j=Z.map((V)=>V.branches[X]);for(let V=1;V<this.n;V+=1)if(j[V].cond===null!==(J.branches[X].cond===null))return this.fail(V);if(J.branches[X].cond!==null&&!this.walkRoots(j.map((V)=>V.cond).filter(Q),!1))return!1;if(!this.walkStmts(j.map((V)=>V.scope.stmts)))return!1}return!0}
return ca}
function Fa($,J){{let Z=$.filter((X)=>X.kind==="loop");for(let X=1;X<this.n;X+=1)if(Z[X].trips!==J.trips||Z[X].counter.type!==J.counter.type)return this.fail(X);if(!this.walkRoots(Z.map((X)=>X.start),!0)||!this.walkRoots(Z.map((X)=>X.end),!0))return!1;return this.declare(Z.map((X)=>X.counter)),this.walkStmts(Z.map((X)=>X.scope.stmts))}
return ca}
function Ga($){return this.walkRoots($.filter((Z)=>Z.kind==="sideEffect").map((Z)=>Z.node),!1);
}
function Ha($,J,Q){{let Z=$.filter((X)=>X.kind==="discard").map((X)=>X.cond);for(let X=1;X<this.n;X+=1)if(Z[X]===null!==(J.cond===null))return this.fail(X);return J.cond===null||this.walkRoots(Z.filter(Q),!1)}
return ca}
function Ja($,J){{let Z=$.filter((X)=>X.kind==="store");for(let X=1;X<this.n;X+=1)if(Z[X].buffer!==J.buffer||Z[X].component!==J.component)return this.fail(X);return this.walkRoots(Z.map((X)=>X.index),!1)&&this.walkRoots(Z.map((X)=>X.value),!1)}
return ca}
function Ka(Q,$){return`V${Q.instance.id}:${$.type}/${$.inputs.length}`;
}
function Ma($){let J=new Map,Q=(X)=>X.meta.kind==="vertexStage",Z=function(X){let j=new Set;U$(X,j,J,Q);for(let V of j)if($.has(V))return!0;return!1};
return Z}
function Na(J){let Q=this.instanceOf(J.instance);return Q===J.instance?J:{...J,instance:Q}
}
function Oa(X,z,q){X(z.variable.id,{values:[z.init],controls:q});
}
function Pa(X,z,q){X(z.variable.id,{values:[z.value],controls:q});
}
function Qa(J){if(!CP.has(J.name)||J.fragmentOnly===!0)return x$;return J.name==="time"?mZ:{...mZ,rows:p$};
}
function Ra(J){return this.variables.has(J.variable.id)?{one:!0,heavy:!0,readsVar:!0,rows:p$}:x$;
}
function Sa(J){return(J.kind==="storageRead"&&J.buffer.engine===void 0)}
function Ua(J){return(J.kind==="wgslExpr"&&J.module!==null&&c$([J.module]))}
function Va(J){for(let Q of J.attributes)if(Q.encoding!==void 0)return qJ;return KY
}
function Wa(Q,V,Z,Y,K){if(Q)V.push(Z),Y.push("  lumeSlotAttr: u32,"),K.push("  out.lumeSlotAttr = raw.lumeSlotAttr;");return[`struct VertexInRaw {
${V.join(`
`)}
}`,`struct VertexIn {
${Y.join(`
`)}
}`,["fn lume_decodeVertexIn(raw: VertexInRaw) -> VertexIn {","  var out: VertexIn;",...K,"  return out;","}"].join(`
`),Z9].join(`

`)
}
function Xa(Q,V,Z){if(Q)V.push(Z);return`struct VertexIn {
${V.join(`
`)}
}`
}
function Ya(J){let j=[];for(let V of J.attributes)j.push({name:V.name,format:uK(V.format,V.name),offset:V.offset});return ZK({structName:"VertexIn",fnName:"lume_pullVertexIn",bufferName:"lumeVertexArena",attributes:j,arrayStride:J.arrayStride,baseElementExpr:"vertexIndex"})
}
function Za(J,$){throw Error(`lume assemble: attribute '${J}' has format '${$}', which the storage attributeSource cannot express (f32 arena only). Keep this lane on the vertex arm or widen pulledAttributeWgsl.`)
}
function _a($){throw Error(`lume: unsupported vertex format '${$}'`);
}
function $a(J,Q,$){try{return Z0(J,Q[0])}catch{throw new X0(`material.${$}Node must be ${Q.join(" or ")} (a scalar broadcasts and a wider vector reads its leading components, as three's slot constructors convert), got ${J.type} \u2014 a matrix does not convert; multiply a vector by it or read one of its columns`,{code:"slot-type-unconvertible",slot:`${$}Node`,got:J.type})}
return ca}
function cb(K){return([K.replace("in.position","lume_in.position").trimEnd()])}
function db(J){throw Error(`lume: internal \u2014 '${J}' is not a lane channel`);
}
function eb(J){let Q=new Set(["positionLocal","positionWorld","positionRender","normalWorld"]),Z=J?J.localPositionSlot?.variable:"localPos";if(Z===void 0)return Q;let X=new RegExp(`\\b${Z}\\b`);
return ba[0]=Q,ba[1]=X,ca}
function jb(Q,Z){for(let X of Q.instanceSet.fields)Z[`attribute:${X.name}`]=_4("f32",X.components);
}
function kb(Z,X){Z.push(X,`reads uv(${String(jJ.indexOf(X))})`);
}
function lb(Q,Z){if(Q.colorAttribute)Z.push("vertexColor","reads vertexColor");if(Q.normalWorldV)Z.push("normalWorld","reads normals");if(Q.normalLocal)Z.push("normalLocal","reads normalLocal");if(Q.positionLocal)Z.push("positionLocal","reads positionLocal");
}
function ob(Z,X,$){throw Error(`lume: material ${Z[X+1]} but the '${$.key}' vertex path does not provide it`);
}
function pb($,J){throw Error(`lume: internal \u2014 vertex path '${$.key}' input '${J}' missing after validation`);
}
function qb($,Q){let Z=$.localPositionSlot,X=Q?$.casterPositionWgsl??$.positionWgsl:$.positionWgsl;if(Z!==void 0&&!X.includes(Z.marker))throw Error(`lume: internal \u2014 vertex path '${$.key}' declares a localPositionSlot but its positionWgsl carries no marker line`);let j=Z?.previous;if(j!==void 0&&!Q&&!X.includes(j.marker))throw Error(`lume: internal \u2014 vertex path '${$.key}' declares a previous seat but its positionWgsl carries no previous marker line`);let V=[];
ba[0]=Z,ba[1]=X,ba[2]=j,ba[3]=V}
function rb(J,Q,V,Z,j){if(J&&!Q)V.push("  {",mq(XX(J.body,{[Z.variable]:"lume_authoredPos",...j.renames})),`    if (all(abs(out_position) <= vec3<f32>(1e6))) { ${j.variable} = out_position; }`,"  }");
}
function sb(J,V,Z){if(J)V.push(`  let ${Z.displacedFlag} = true;`,`  let lume_authoredPos: vec3<f32> = ${Z.variable};`,J.body,`  ${Z.variable} = out_position;`,`  let lume_seatOk: bool = all(abs(${Z.variable}) <= vec3<f32>(1e6));`,`  ${Z.variable} = select(lume_authoredPos, ${Z.variable}, lume_seatOk);`);else V.push(`  let ${Z.displacedFlag} = false;`)
}
function tb(){return(`LumeCoveredDepthOut(vec4<f32>(0.0), ${ZJ})`)}
function vb(J,$){return J?`PictureDepthCoveredOut(vec4<f32>(0.0), ${$}, ${ZJ})`:`PictureDepthOut(vec4<f32>(0.0), ${$})`
}
function xb($){return $?"PictureDepthCoveredOut":"LumeCoveredDepthOut";
}
function zb($){return(`lume_surfaceMotion(${$}, lume_motionVector(in.motionCurrentClip, in.motionPreviousClip))`)}
function Ab(Z){return[`  let ${WK}: u32 = ${ZJ};`,`  return ${Z};`];
}
function Bb($){return(`${$}
@group(3) @binding(${IZ}) var<storage, read> lume_materialBlocks: array<Material>;
var<private> material: Material;`)}
function Cb(J,$){for(let Z of J.clipWgsl??c9)$.reserve(Z);if(J.normalFacingKept)$.reserve(J.normalFacingKept);if(J.coverage)$.reserve(J.coverage);
}
function Db(J,$){for(let Z of J.fragmentReads?.lines??c9)$.reserve(Z);for(let Z of J.fragmentReads?.varyings??m9)$.reserve(Z.name);if(J.fragmentReads?.lit)$.reserve(J.fragmentReads.lit.defs);let Q=J.localPositionSlot;
return Q}
function Fb(Q,$){if(Q.previous)for(let Z of[Q.previous.marker,Q.previous.variable,...Object.keys(Q.previous.renames),...Object.values(Q.previous.renames)])$.reserve(Z)
}
function Gb($,J,Q,Z,X,j,V){$.push({device:J,key:Q,width:Z,height:X,value:j,textures:V}),IX+=1
}
function Hb(B){throw TypeError(`ctx.previousUv(P) takes a world-position node (vec3) \u2014 ctx.worldPosition(uv) or a marched point. Got ${B===null?"null":typeof B}.`);
}
function Ib(J){return K7(_X,J,`Look script "${J}" must export a look(ctx) function that returns a color node. Fix: export function look(ctx) { ... return ctx.scene; }`),null;
}
function Jb(J,G0){return K7(yX,J,`Look script "${J}" must return a color node from look(ctx) (e.g. ctx.scene or a postfx wrapper of it). It returned ${G0===null?"null":typeof G0}.`),null;
}
function ca(){}var da;var ha;function ba(){}

;import"./26ceb10f-49e18729068cd5df.mjs";import"./4aeb9b3ba6a337d1.mjs";import"./36bad4b5-c35867ec88f49b93.mjs";import"./6013db8f3213cfbc.mjs";import"./4953a97fb1e990b7.mjs";import"./46b1c77c67f7de91.mjs";import"./9959d013-206ed91ad8a1f4fe.mjs";import"./e5b41542678465dc.mjs";import"./f81c9654-bc62d8684fd20379.mjs";import"./59031fb6a4af82a1.mjs";import"./bfa01a2f-723b97e3b6c6dddd.mjs";import"./97a46b49-6989b287046b7cf1.mjs";import"./3cfbfb472a64e141.mjs";import"./2998d8b4-fc0f4b775b52b986.mjs";import"./9b93e26679f0ec35.mjs";import"./13edbdb4-f3014b8bf4f5e3aa.mjs";import"./a155721244dec369.mjs";import"./914c3c6b-e73d45b60479cb39.mjs";import{$EK as s9,$Wk as jH,$_l as JH,ACB as QH,Aow as A0,AqF as PK,AsE as UK,B13 as RT,BSG as eG,DEE as xT,DPL as IK,DPz as ZK,Dhe as XK,Dk7 as h9,DpJ as sG,DsT as CV,E9X as Xz,EIL as VK,ERH as wU,EVH as s7,E_E as aV,EcS as d0,FHk as sU,FMf as EX,FQh as a5,FuT as tG,Ggy as $$,GyK as RU,HGI as aU,Hpj as WK,ION as u$,Ijf as EJ,JBf as V5,JKz as EZ,J_E as xJ,Jzm as $K,K6S as T9,KFY as aG,KKT as i9,KLm as v6,KMh as BU,KRJ as XH,KV2 as D8,Kmp as KK,L1X as LK,L8Q as Z5,LJ4 as uQ,LSM as QU,Lgt as SU,Ln2 as IU,MgJ as P6,Mig as z2,NRx as a9,NbU as JU,Nr6 as dU,O4D as WV,OAU as PU,OYZ as kK,OiU as cQ,OjA as tU,PaZ as Dj,Pjz as e6,QDv as nU,RNI as n4,RoL as YK,S2P as DK,S5I as oQ,SQb as mQ,SSR as lU,SUW as eU,SfH as aY,TCI as CK,U7J as I5,UDC as t5,UHL as uV,UOx as SJ,VHJ as qH,VgU as OK,Vlz as r0,WQP as ZH,WtZ as V7,XI4 as s5,XRk as Y9,XSd as f9,Xdo as DV,XfT as NV,XmL as KJ,Y4k as gH,Yn8 as xU,ZeW as bH,Zfq as FK,Zic as V9,Zoa as qK,_Am as f$,_oj as TU,_qW as U7,_sD as BK,a7z as vH,amQ as R6,apl as A3,asZ as AU,atS as mG,b$3 as Y4,bAE as g6,bTo as i4,bjr as lQ,cA6 as dQ,cjo as d4,cr7 as AT,dIR as y1,dOa as GH,e71 as VH,eP0 as S6,eYb as zK,ech as X5,edj as rQ,ez8 as QK,eza as iQ,fOD as L8,ffo as u4,fkO as bJ,g3R as Tz,gSh as pQ,htm as gj,iBo as I3,iqs as MK,iqx as vQ,iux as xK,jB7 as R3,jJo as nQ,kbj as sY,kwv as OT,lIv as AK,lKR as HK,lR8 as LT,lSa as u7,lYn as c0,lax as m4,lnN as x3,lza as U$,m86 as vU,n9E as B5,nMR as ZU,nnU as Uz,nxV as j6,o$4 as MX,o5B as TK,o7s as EH,oBv as $H,oRm as IT,p9z as n9,pGn as YH,pPa as l4,pRq as TT,pU0 as c4,pxe as eY,q_m as u0,qbZ as _6,r_l as LU,rsY as xV,rwD as KH,ryY as GK,s0T as Q9,s6z as m$,sZ7 as JK,skY as wH,ssQ as XU,tJ3 as SH,tLM as t9,tOJ as F$,tW3 as O5,tcT as j5,tl5 as RH,tvV as vX,u36 as r8,uG7 as fQ,vS7 as OU,vXT as kV,v_S as MU,vcF as Y5,vfa as bU,vow as y5,w56 as jK,yfG as NK,z2O as K4,zLX as p4,zOk as TV,zRR as tY,zUs as gX}from"./6f3832a6-f9bac2bcce40e220.mjs";import"./026c7ebb6cb36011.mjs";import{Emq as H9,F5B as xH,IO$ as nY,Mux as D6,Sqo as lY,T9F as cY,UFy as dY,VV1 as _5,YFb as a8,eAs as Q6,fky as iY,g5O as z9,iQk as V4,mBx as h4,oAT as YJ,qQ0 as TH,rlj as Q0}from"./d412131d-2f33616861f6281a.mjs";import{zOB as fG}from"./7e3067944ae4690c.mjs";import{Ksq as Gz,PFa as dX,UaV as rY,UdC as NJ,d2M as l9,ge4 as IH,lTN as zz,pno as oY,q7S as c$,qP$ as d9,tJv as OH}from"./21dddadc9711121d.mjs";import"./1634b73216c349b0.mjs";import{vpf as $U}from"./70ee4a567231822f.mjs";import{$Jd as AZ,$TX as rz,$g6 as ez,Anw as q8,Bb_ as OJ,Brh as i,BuM as c,Cn3 as yY,Cuk as N0,DcR as K6,EA0 as p0,EQd as gY,HBH as V6,HUp as X4,IVI as B0,IYd as iz,Ivk as MV,Iwu as j0,K9j as az,Koa as AH,KrU as kJ,Ln4 as a$,MNB as O0,MNf as z8,Mu_ as jJ,N4y as hQ,N96 as O$,N9p as j4,NMu as VV,Ose as yZ,PRm as ZV,Pm8 as mV,Py$ as w5,R51 as VJ,Ra8 as A6,Rvr as PV,SM9 as _Y,Vgy as $7,VlA as t0,W13 as hG,W7Z as JY,XSv as mY,Zl2 as tz,_D1 as lX,_Zs as uY,a0v as Z0,cLL as hY,cb5 as L0,dQ3 as X0,e$F as I9,e69 as jV,eZH as sz,ef7 as fY,fHq as P0,faE as wz,gwl as RJ,gy4 as oz,hRW as _4,iHZ as k5,iQl as Z6,ixa as LH,je0 as S3,k46 as J6,l8U as pZ,l9o as nz,lEN as k$,lyE as v5,nD5 as x0,nIB as XV,nqf as _J,nwK as k0,oFi as SX,q_0 as X6,rFh as Z$,rk6 as bz,sfu as u,tFq as I6,tnw as x9,w3N as LZ,woM as f4,xRw as y4,yWP as V0,yZl as E6,yjL as pY}from"./75f9d7a9-b9b452ef9ed9d1b4.mjs";import"./d876e061714751a8.mjs";import{IP6 as nX}from"./8865d56dfd1ef402.mjs";import{A30 as g4,AXn as r9,Def as j9,DuM as cU,EzM as L3,FFn as eX,H0q as i7,HGV as aX,Iqw as G$,J8B as X7,JNY as E4,JPf as h$,K9_ as k8,Ko0 as WU,Lcn as vJ,NZA as V3,Nm3 as zj,Nu2 as X9,O7v as X3,OT$ as K3,OhB as x8,OuG as H3,PVx as B3,RDp as v0,RGt as y$,Raz as b4,VCM as Q$,VeE as J3,Vvw as j3,XYw as G9,YST as rX,Zpc as q$,_Td as m,a1i as D3,aYH as z3,ahj as UU,bVy as Z3,dlr as t6,dp3 as wY,e2D as q9,e3w as o,eut as FQ,gad as W3,gnp as N3,gsg as bY,hpi as Y3,iJU as rU,iOc as pU,iaN as U3,jCw as T2,jEz as RQ,kXg as EY,kkT as mz,l_6 as tX,l_q as j7,lsY as M3,mAc as sX,nRM as wJ,oAF as F3,oMD as FU,rD3 as kH,u8m as H7,uLW as J$,uM_ as vY,uRd as Zj,utO as zU,v6R as n0,vDR as $3,w9R as q3,xii as HU,y3_ as Q3,yML as o8,zEr as G3}from"./5484a777-e1e49d428a1f3b31.mjs";import{_YO as e8,i9R as ZZ,iy1 as t8,xkV as f2}from"./9a66a0d35fb44287.mjs";import{Cwn as Xj}from"./258eeb1cbf5cd6e2.mjs";import{taY as SQ}from"./18ea22c9b82695fd.mjs";import{baH as p8,ts0 as S0}from"./34ae66e4b4067b04.mjs";import"./f1cf0b526f2be345.mjs";import{IVz as JV,woq as IG,xWV as yG}from"./fccabd9a0abec884.mjs";import{Rqq as TZ,cft as t1,ved as m7}from"./f45ed7628e579dd0.mjs";import{Xxj as cz,ZpK as dz}from"./0d81a0c485a46081.mjs";import"./56170bd2000c30bc.mjs";import"./e5129bad3a801320.mjs";import{SK0 as lz,ThN as M9}from"./a456fdcda3b62cf4.mjs";import{Jcc as mH,RFm as pz,Z_d as Y7,boO as uz,hT5 as hH}from"./e6e669f0a5877881.mjs";import"./e02a43301fdbeb7a.mjs";import"./87b08933741aae03.mjs";import{poZ as N1,tytG as k1}from"./4aeb9b3ba6a337d1.mjs";import{AjM as L1,CKC as Kj,IzZ as X8,N1n as D$,Txk as Jj,XK5 as S2,aGP as f7,aVa as v2,gsI as Qj,r6b as R2}from"./bfa01a2f-723b97e3b6c6dddd.mjs";import{DQ5 as _V,LCb as nZ,Nd5 as gV,Q$A as WQ,SGw as R1,Tod as s6,X0y as dZ,Z_E as L9,fuc as AQ,iCo as HQ,iU9 as bV,mGI as YY,yqN as EV,zMB as O1}from"./13edbdb4-f3014b8bf4f5e3aa.mjs";import{AjA as d7,b_B as v1,vKb as Z7}from"./97a46b49-6989b287046b7cf1.mjs";import"./a155721244dec369.mjs";import{$8j as E2,$mh as U9,FAw as g2,S3S as w2,SDC as b2,Te0 as _2,UzN as QZ,rNn as JZ}from"./9959d013-206ed91ad8a1f4fe.mjs";import{C9s as D2}from"./26ceb10f-49e18729068cd5df.mjs";import{zVk as N$}from"./914c3c6b-e73d45b60479cb39.mjs";export{AT as materialBuilderCompiled,Bx as censusScriptedLookFromEntry,DT as compileSkyScriptFromEntry,HN as assembleMaterialShader,IT as buildScriptedMaterialFromEntry,KU as buildScriptedLookStepsFromEntry,LG as assembleMaterialShaderSteps,LT as compileMaterialBuilderAhead,OT as cloneScriptedMaterialHost,RT as drainMaterialBuilders,TT as compileLightingScriptFromEntry,Vx as mintLookTextureLease,YU as buildScriptedLookFromEntry,kT as armPictureRealmHold,xT as rebindScriptedParamPictures};
