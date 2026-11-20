import{C as $c0K}from"./52e971dc2a986655.mjs";var $c0C,$c0T=[function(){return[()=>"(()=>(`struct EyesThroughOut {\n  @location(0) color: vec4<f32>,\n  @builtin(frag_depth) hairGate: f32,\n}`))",()=>"(function(l,v,x=U){let C=[`struct EyesDraw {\n  ordinal: f32,\n  strength: f32,\n  cosAngle: f32,\n  pad: f32,\n  face: vec3<f32>,\n  facePad: f32,\n}\n@group(${l}) @binding(${x.uniform}) var<uniform> eyes: EyesDraw;`];if(v)C.push(`@group(${l}) @binding(${x.hairKey}) var eyesHairKeys: texture_2d<u32>;`),C.push((X??=$c0I(0)));return C.join(`\n`)})"]}],$c0XU=[0];var $c0S,$c0D=()=>eval($c0S);function $c0E(s){$c0S=s;return $c0D()}$c0C=$c0K($c0T,$c0XU,$c0E,2,520490368106496);var $c0I=$c0C.i;
;const{En0:R,KdH:V,_rr:K,wRZ:k}=$Lr;
var j=`struct ModelMaterial {
  baseColor: vec4<f32>,
  emissiveCutoff: vec4<f32>,
  params: vec4<f32>,
  flash: vec4<f32>,
  emissiveMap: vec4<f32>,
  clipPlane: vec4<f32>,
  clipPlane2: vec4<f32>,
  place: vec4<f32>,
  words: vec4<f32>,
}`;var U={uniform:12,hairKey:13},M={uniform:16,hairKey:17};function Q(l,v){let x=k(v.uniform,2,"uniform");if(l==="owner")return[x];return[x,K(v.hairKey,2,"uint","2d")]}var Z=[k(U.uniform,2,"uniform")],$=[k(U.uniform,2,"uniform"),K(U.hairKey,2,"uint","2d")],m=V(!1),X;function O(a,b){return (O=$c0C(1)).apply(this,arguments)}var A="  return vec4<u32>((u32(eyes.ordinal + 0.5) << 24u) | (bitcast<u32>(clamp(in.position.z, 0.0, 1.0)) >> 6u));",B=["  let eyesPixel = vec2<i32>(in.position.xy);","  let eyesHairKey = textureLoad(eyesHairKeys, eyesPixel, 0).r;","  if ((eyesHairKey >> 24u) != u32(eyes.ordinal + 0.5)) { discard; }","  let eyesHairZ = bitcast<f32>(((eyesHairKey & 0xFFFFFFu) << 6u) | 32u);",`  if (in.position.z >= eyesHairZ - (eyesHairZ - frame.depthFloor) * ${R}) { discard; }`,`  let eyesHairGate = clamp((eyesHairZ - ${R} * frame.depthFloor) / (1.0 - ${R}), 0.0, 1.0);`].join(`
`),P=((l)=>`  return EyesThroughOut(${l}, eyesHairGate);`),T=((l,v="frame.cameraPosition")=>[`  let eyesFacing: f32 = dot(eyes.face, normalize(${v} - ${l}));`,"  if (eyesFacing < eyes.cosAngle) { discard; }","  let eyesEdge: f32 = smoothstep(eyes.cosAngle, 1.0, eyesFacing);"].join(`
`));;

;import{R as $Lr}from"./52e971dc2a986655.mjs";export{$ as YYv,A as lsZ,B as iLX,M as W21,O as SHN,P as p7x,Q as s4k,T as BlH,U as kyu,Z as eAF,j as HjG,m as uc1};
