import{C as $c0K}from"./52e971dc2a986655.mjs";var $c0C,$c0T=[function(){return[()=>'(function(j){switch(j){case"add":return{color:{operation:"add",srcFactor:"src-alpha",dstFactor:"one"},alpha:{operation:"add",srcFactor:"one",dstFactor:"one"}};case"subtract":return{color:{operation:"reverse-subtract",srcFactor:"src-alpha",dstFactor:"one"},alpha:{operation:"add",srcFactor:"zero",dstFactor:"one"}};case"multiply":return{color:{operation:"add",srcFactor:"zero",dstFactor:"src"},alpha:{operation:"add",srcFactor:"one",dstFactor:"one-minus-src-alpha"}};case"alpha":return{color:{operation:"add",srcFactor:"one",dstFactor:"one-minus-src-alpha"},alpha:{operation:"add",srcFactor:"one",dstFactor:"one-minus-src-alpha"}}}})',()=>"(function(){return`fn spritePlaceholderMissing(quadUv: vec2f) -> vec4f {\n  //${d}${l}\n  let placeholderUv = vec2f(quadUv.x, 1.0 - quadUv.y);\n  let duvDx = dpdx(placeholderUv);\n  let duvDy = dpdy(placeholderUv);\n  let quadPx = vec2f(1.0 / max(length(vec2f(duvDx.x, duvDy.x)), 1e-5), 1.0 / max(length(vec2f(duvDx.y, duvDy.y)), 1e-5));\n  let cellPx = max(min(quadPx.x, quadPx.y) / ${J(d)}, ${J(l)});\n  let cell = floor(placeholderUv * quadPx / cellPx);\n  let odd = (i32(cell.x) + i32(cell.y)) & 1;\n  return select(vec4f(1.0, 0.0, 1.0, 1.0), vec4f(0.0, 0.0, 0.0, 1.0), odd == 1);\n}\n\nfn spritePlaceholderQuiet(quadUv: vec2f, timeSeconds: f32) -> vec4f {\n  let grain = (fract(sin(dot(quadUv, vec2f(127.1, 311.7))) * 43758.5453) - 0.5) * ${J(Xq)};\n  let breath = 1.0 + sin(timeSeconds * ${J(Jq)}) * ${J(Wq)};\n  let washRgb = vec3f(${J(K[0])}, ${J(K[1])}, ${J(K[2])}) * breath + vec3f(grain);\n  return vec4f(washRgb, ${J(zq)});\n}\n\nfn spritePlaceholderRings(quadUv: vec2f, timeSeconds: f32) -> vec4f {\n  let placeholderUv = vec2f(quadUv.x, 1.0 - quadUv.y);\n  let duvDx = dpdx(placeholderUv);\n  let duvDy = dpdy(placeholderUv);\n  let quadPx = vec2f(1.0 / max(length(vec2f(duvDx.x, duvDy.x)), 1e-5), 1.0 / max(length(vec2f(duvDx.y, duvDy.y)), 1e-5));\n  let emblemRadiusPx = min(min(quadPx.x, quadPx.y) * ${J(sj)}, ${J(nj)});\n  let centeredUv = (placeholderUv - vec2f(0.5)) * quadPx / max(emblemRadiusPx, 1e-5);\n  let radius = length(centeredUv);\n  let angle = atan2(centeredUv.x, centeredUv.y) / 6.28318530718 + 0.5;\n  let anglePhase = angle * 6.28318530718;\n  let ring1 = 1.0 - smoothstep(0.0, ${J(r)}, abs(radius - ${J(tj)}));\n  let ring2 = 1.0 - smoothstep(0.0, ${J(r)}, abs(radius - ${J(ej)}));\n  let ring1Arc = smoothstep(0.6, 0.96, sin(anglePhase + timeSeconds * 2.1 + radius * 6.0) * 0.5 + 0.5);\n  let ring2Arc = smoothstep(0.58, 0.95, sin(anglePhase * 2.0 - timeSeconds * 2.7 + radius * 8.0) * 0.5 + 0.5);\n  let ringBody = ring1 * 0.16 + ring2 * 0.16;\n  let ringHighlights = ring1 * ring1Arc * 0.86 + ring2 * ring2Arc * 0.82;\n  let sweep = sin(anglePhase - timeSeconds * 1.2) * 0.5 + 0.5;\n  let gradient = clamp(radius * 0.58 + sweep * 0.2 + ringHighlights * 0.12 + abs(centeredUv.x) * 0.08, 0.0, 1.0);\n  let loadingIntensity = clamp(ringBody + ringHighlights, 0.0, 1.0);\n  let placeholderColor = mix(vec3f(0.34), vec3f(0.98), gradient) * mix(0.3, 1.08, loadingIntensity);\n  let edgeFade = 1.0 - smoothstep(${J(ij)}, ${J(jq)}, radius);\n  return vec4f(placeholderColor, loadingIntensity * 0.92 * edgeFade);\n}\n\nfn spritePlaceholder(quadUv: vec2f, timeSeconds: f32) -> vec4f {\n  if (material.placeholder > 1.5) {\n    return spritePlaceholderMissing(quadUv);\n  }\n  if (material.placeholder > 0.5) {\n    return spritePlaceholderQuiet(quadUv, timeSeconds);\n  }\n  return spritePlaceholderRings(quadUv, timeSeconds);\n}`})"]},function(){return[()=>'(function(j,q,z,W){let Y=`  ${Xj} = material.onScreen > 0.5;\n${j}`,$=z?", @builtin(front_facing) frontFacing: bool":"",B=W?"SpriteOutput":"@location(0) vec4f";if(!q)return[`@fragment fn fs(lume_inLens: VsOut${$}) -> ${B} {\n  let in = lume_bandLensIn(lume_inLens);\n${Y}\n}`];let G=z?", frontFacing":"";return[`fn spriteFragment(in: VsOut${z?", frontFacing: bool":""}) -> ${W?"SpriteOutput":"vec4f"} {\n${Y}\n}`,`@fragment fn fs(in: VsOut${$}) -> ${B} {\n  return spriteFragment(lume_bandLensIn(in)${G});\n}`,`@fragment fn ${f}(in: VsOut${$}) {\n  let alpha = spriteFragment(lume_bandLensIn(in)${G})${W?".color.a":".a"};\n  ${Fj}\n}`,`@fragment fn ${w}(in: VsOut${$}) -> @location(0) vec4f {\n  let alpha = spriteFragment(lume_bandLensIn(in)${G})${W?".color.a":".a"};\n  ${Oj("alpha")}\n}`]})',()=>'(function(){return`\nstruct SpriteShadowView {\n  viewProj: mat4x4f,\n  cameraPosition: vec3f,\n  fadeTime: f32,\n};\n@group(0) @binding(0) var<uniform> shadowView: SpriteShadowView;\n${V.trim().replace("@group(3) @binding(0)","@group(1) @binding(0)")}\n${c}\n@group(2) @binding(1) var spriteTex: texture_2d_array<f32>;\n@group(2) @binding(2) var spriteSmp: sampler;\n\n${u}\n\n${v}\n\nstruct CasterOut {\n  @builtin(position) position: vec4f,\n  @location(0) quadUv: vec2f,\n  @location(1) @interpolate(flat) instUv: vec4f,\n  @location(2) @interpolate(flat) cut: vec4f,\n};\n\n@vertex fn vs(${_}) -> CasterOut {\n${R.join(`\n`)}\n  let inst = instances[instanceIndex];\n  let corner = QUAD_POS[vertexIndex];\n  let worldPos = spriteWorld(inst, corner, vec4f(shadowView.cameraPosition, 1.0), vec3f(1.0, 0.0, 0.0));\n  var out: CasterOut;\n  out.position = shadowView.viewProj * vec4f(worldPos, 1.0);\n  out.quadUv = QUAD_UV[vertexIndex];\n  out.instUv = inst.uvScaleOffset;\n  let cutoff = select(0.5, inst.flagsA.w, inst.flagsA.w > 0.0);\n  out.cut = vec4f(inst.scaleYOriginLayer.w, cutoff, inst.tint.a * inst.flagsA.x, 0.0);\n  return out;\n}\n\n@fragment fn fs(in: CasterOut) {\n  let spriteUv = in.quadUv * in.instUv.xy + in.instUv.zw;\n  let rawUv = vec2f(spriteUv.x, 1.0 - spriteUv.y);\n  let texSize = vec2f(textureDimensions(spriteTex));\n  let texelUv = (floor(rawUv * texSize) + 0.5) / texSize;\n  let uv = select(rawUv, texelUv, material.texelSnap > 0.5);\n  let alpha = textureSampleLevel(spriteTex, spriteSmp, uv, i32(in.cut.x + 0.5), 0.0).a;\n  if (in.cut.z <= 0.0 || alpha < in.cut.y) {\n    discard;\n  }\n}\n`})',()=>'(function(){return`\n${h.trim()}\n${bj(1)}\n${c}\n@group(2) @binding(1) var spriteTex: texture_2d_array<f32>;\n@group(2) @binding(2) var spriteSmp: sampler;\n${V.trim()}\n\n${u}\n\n${vj}\n\n${v}\n\nstruct MaskOut {\n  @builtin(position) position: vec4f,\n  @location(0) quadUv: vec2f,\n  @location(1) @interpolate(flat) instUv: vec4f,\n  @location(2) @interpolate(flat) cut: vec4f,\n  @location(3) @interpolate(flat) seat: f32,\n};\n\n@vertex fn vs(${_}) -> MaskOut {\n${R.join(`\n`)}\n  let inst = instances[instanceIndex];\n  let corner = QUAD_POS[vertexIndex];\n  let lens = spriteLensOrtho();\n  let worldPos = spriteWorld(inst, corner, spriteFacingEye(frame.view, frame.cameraPosition, lens), spriteFacingRight(frame.view, lens));\n  var clip = ${y("vec4f(worldPos, 1.0)")};\n  let sortDepth = inst.flagsB.z;\n  clip.z = select(clip.z, sortDepth * clip.w, sortDepth > 0.0);\n  if (${mj("inst.flagsB.w")}) {\n    clip = vec4f(0.0, 0.0, 2.0, 1.0);\n  }\n  var out: MaskOut;\n  out.position = clip;\n  out.quadUv = QUAD_UV[vertexIndex];\n  out.instUv = inst.uvScaleOffset;\n  let cutoff = select(0.5, inst.flagsA.w, inst.flagsA.w > 0.0);\n  out.cut = vec4f(inst.scaleYOriginLayer.w, cutoff, inst.tint.a * inst.flagsA.x, inst.flagsA.w);\n  out.seat = inst.flagsB.w;\n  return out;\n}\n\n@fragment fn fs(in: MaskOut) -> @location(0) vec4f {\n  let spriteUv = in.quadUv * in.instUv.xy + in.instUv.zw;\n  let rawUv = vec2f(spriteUv.x, 1.0 - spriteUv.y);\n  let texSize = vec2f(textureDimensions(spriteTex));\n  let texelUv = (floor(rawUv * texSize) + 0.5) / texSize;\n  let uv = select(rawUv, texelUv, material.texelSnap > 0.5);\n  let alpha = textureSampleLevel(spriteTex, spriteSmp, uv, i32(in.cut.x + 0.5), 0.0).a;\n  if (alpha < in.cut.y) {\n    discard;\n  }\n${pj("in.seat","in.cut.w > 0.0")}  if (in.cut.z * doorCover * bodyCover <= 0.0) {\n    discard;\n  }\n  return outline_maskAt(in.position);\n}\n`})']},function(){return[()=>'(function(j,q,z,W,Y,$=!1,B=0,G=[]){let H=Mq(W,z.lit);let U=B&H;let Q=o(z,W,$,U);let X=_j(U);let N=function(){let O=j.createShaderModule({label:Q,code:W}),S=q.getBindGroupLayout(Y,"lume frame"),P=Cj(q,[W]),A=q.getBindGroupLayout(m,"sprite material"),T=q.getBindGroupLayout($?Pq:x,"sprite draw");return{label:Q,layout:Dj(j,Q,[S,P,A,T],P),vertex:{module:O,entryPoint:"vs"},fragment:{module:O,entryPoint:"fs",targets:Wj({blend:Hq(z.blend),motion:$,motionBlend:t}),constants:X},depthStencil:jj(z.depthMode==="cutout"),multisample:{count:zj()}}};let F=z.blend==="alpha"&&z.depthMode==="transparent";let D=U!==H?o(z,W,$,H):void 0;let C=D;if(G.length>0)C=D===void 0?G:[D,...G];if(C===void 0)return F?{key:Q,descriptor:N,options:s}:{key:Q,descriptor:N};return{key:Q,descriptor:N,options:F?{...s,standIn:C}:{standIn:C}}})']}],$c0XU=[0,2,5];var $c0S,$c0D=()=>eval($c0S);function $c0E(s){$c0S=s;return $c0D()}$c0C=$c0K($c0T,$c0XU,$c0E,6,2618690461761536);
;const{$MH:qj,B9s:yj,Bpv:f,DIS:Zj,EVH:xj,EcS:y,Ggy:h,JZN:Oj,JdP:Bj,KdH:jj,Kzs:Lj,L6f:i,LJ4:Gj,MZO:Kj,MfU:Wj,MyL:bj,NDw:J,OuE:Ej,Pmn:Qj,QQx:Fj,SQb:$j,TkD:b,Tkv:n,U4E:Jj,YmG:Aj,ZSe:Tj,_7c:Mj,_rr:k,d30:Hj,dIJ:wj,eD$:uj,ech:Uj,fIC:Yj,gI0:L,gSh:Nj,j0X:fj,jqS:I,kQP:zj,luI:Xj,mq1:Pj,nvi:Vj,pfC:_j,r_c:Ij,s0T:Rj,tDq:kj,uMP:Cj,wRZ:Z,xFq:t,xf_:Sj,ySu:e,yfJ:Dj,zeT:w}=$Lr;
;;;var E=0.3,sj=0.32,nj=48,tj=0.42,ej=0.88,r=0.09,ij=1,jq=1.35,qq=0.05,K=[0.05,0.055,0.065],zq=0.92,Jq=1.1,Wq=0.05,Xq=0.012,d=8,l=4,dq=1.75,Yq=855309,vj=`fn spriteLensOrtho() -> f32 {
  let lensW = frame.proj[3][3] - frame.proj[2][3];
  return select(0.0, frame.proj[3][3] / lensW, lensW != 0.0);
}

fn spriteFacingEye(view: mat4x4f, position: vec3f, ortho: f32) -> vec4f {
  return vec4f(position * (1.0 - ortho) + vec3f(view[0][2], view[1][2], view[2][2]) * ortho, 1.0 - ortho);
}

fn spriteFacingRight(view: mat4x4f, ortho: f32) -> vec3f {
  return select(vec3f(1.0, 0.0, 0.0), vec3f(view[0][0], view[1][0], view[2][0]), ortho > 0.5);
}`,u=`const QUAD_POS = array<vec2f, 6>(vec2f(-0.5, -0.5), vec2f(0.5, -0.5), vec2f(0.5, 0.5), vec2f(0.5, 0.5), vec2f(-0.5, 0.5), vec2f(-0.5, -0.5));
const QUAD_UV = array<vec2f, 6>(vec2f(0.0, 0.0), vec2f(1.0, 0.0), vec2f(1.0, 1.0), vec2f(1.0, 1.0), vec2f(0.0, 1.0), vec2f(0.0, 0.0));
${wj}`,cj=(j,q)=>`  let instPosition = inst.posRotX.xyz;
  let rotation = vec4f(inst.posRotX.w, inst.rotYZWScaleX.xyz);
  let scale = vec2f(inst.rotYZWScaleX.w, inst.scaleYOriginLayer.x);
  let origin = inst.scaleYOriginLayer.yz;
  let billboard = inst.flagsA.y;

  let scaledPos = vec3f(corner * scale, 0.0);
  let offsetPos = vec3f(scaledPos.xy + origin, 0.0);
  let nonBillboardWorld = quatRotate(rotation, offsetPos) + instPosition;

${j}  let rawForward = eye.xyz - eye.w * instPosition;
  let forward = vec3f(rawForward.x, select(rawForward.y, 0.0, billboard == 1.0), rawForward.z);
  let forwardLen = length(forward);
  let safeForward = select(vec3f(0.0, 0.0, 1.0), forward / forwardLen, forwardLen > 1e-5);
  let rightRaw = cross(vec3f(0.0, 1.0, 0.0), safeForward);
  let rightLen = length(rightRaw);
  let safeRight = select(${q}, rightRaw / rightLen, rightLen > 1e-5);
  let up = normalize(cross(safeForward, safeRight));
  let offsetX = origin.x + corner.x * max(scale.x, 1e-6);
  let offsetY = origin.y + corner.y * max(scale.y, 1e-6);
  let billboardWorld = instPosition + safeRight * offsetX + up * offsetY;

  let worldPos = select(nonBillboardWorld, billboardWorld, billboard > 0.0);
`,v=`fn spriteWorld(inst: SpriteInstance, corner: vec2f, eye: vec4f, fallbackRight: vec3f) -> vec3f {
${cj("","fallbackRight")}  return worldPos;
}`,a=`
  var shadedRgb = shadedArt;
  if (bandCover + stepCover > 0.0) {
    let banded = (shadedArt * tinted.a + bandRgb * bandCover) / max(tinted.a + bandCover, 1e-4);
    shadedRgb = (banded * bandAlpha + HELD_STEP_RGB * stepCover) / max(bandAlpha + stepCover, 1e-4);
  }`,$q=8,lq=$q*4,aq={sortDepth:0,resolvedMix:1,normalMix:2,outlineWidthPx:3,texelSnap:4,onScreen:5,placeholder:6,lightCover:7},Bq=`struct SpriteMaterial {
  sortDepth: f32,
  resolvedMix: f32,
  normalMix: f32,
  outlineWidthPx: f32,
  texelSnap: f32,
  onScreen: f32,
  placeholder: f32,
  lightCover: f32,
};
struct SpriteTap { sampled: vec4f, uv: vec2f, lodDx: vec2f, lodDy: vec2f };
fn sprite_tap(tex: texture_2d_array<f32>, smp: sampler, rawUv: vec2f, duvDx: vec2f, duvDy: vec2f, cell: vec4f, layer: i32, texelSnap: f32) -> SpriteTap {
  let texSize = vec2f(textureDimensions(tex));
  let cellA = vec2f(cell.z, 1.0 - cell.w) * texSize;
  let cellB = cellA + vec2f(cell.x, -cell.y) * texSize;
  let cellLo = floor(min(cellA, cellB) + 1.0 / 256.0) + 0.5;
  let texelPos = clamp(rawUv * texSize, cellLo, max(ceil(max(cellA, cellB) - 1.0 / 256.0) - 0.5, cellLo));
  let texelSeam = floor(texelPos + 0.5);
  let texelFootprint = max((abs(duvDx) + abs(duvDy)) * texSize, vec2f(1e-6));
  let seamUv = (texelSeam + clamp((texelPos - texelSeam) / texelFootprint, vec2f(-0.5), vec2f(0.5))) / texSize;
  let gridUv = (floor(texelPos + 1.0 / 256.0) + 0.5) / texSize;
  let lodDx = select(duvDx, vec2f(0.0), frame.flatArt > 1.5);
  let lodDy = select(duvDy, vec2f(0.0), frame.flatArt > 1.5);
  let snappedUv = select(seamUv, gridUv, frame.flatArt > 1.5);
  var arrayUv = select(rawUv, snappedUv, texelSnap > 0.5);
  var sampled = textureSampleGrad(tex, smp, arrayUv, layer, lodDx, lodDy);
  if (texelSnap > 0.5 && any(abs(texelPos - texelSeam) < 0.5 * texelFootprint)) {
    let nearest = textureSampleGrad(tex, smp, gridUv, layer, lodDx, lodDy);
    let whole = abs(sampled.a - nearest.a) > 1.0 / 512.0;
    sampled = select(sampled, nearest, whole);
    arrayUv = select(arrayUv, gridUv, whole);
  }
  return SpriteTap(sampled, arrayUv, lodDx, lodDy);
}`,c=`${Bq}
@group(2) @binding(0) var<uniform> material: SpriteMaterial;`,oq={rings:0,quiet:1,missing:2};function Gq(j){return j==="alpha"}function Hq(a){return (Hq=$c0C(0)).call(this,a)}function Nq(){return (Nq=$c0C(1)).call(this)}function Qq(j){if(j==="multiply")return"vec4f(mix(vec3f(1.0), rgb, alpha), alpha)";if(j==="alpha")return"vec4f(rgb * alpha, alpha)";return"vec4f(rgb, alpha)"}var Uq=`fn sprite_ringAlpha(uv: vec2f, layer: i32, dx: vec2f, dy: vec2f, widthPx: f32) -> f32 {
  var ring = 0.0;
  for (var i = 0; i < 9; i++) {
    let o = vec2f(f32(i % 3) - 1.0, f32(i / 3) - 1.0) * widthPx;
    ring = max(ring, textureSampleGrad(spriteTex, spriteSmp, uv + dx * o.x + dy * o.y, layer, dx, dy).a);
  }
  return ring;
}`,Cq=`  let outlineWord = in.instA.z;
  if (outlineWord > 0.5) {
    let dilated = sprite_ringAlpha(arrayUv, layer, duvDx, duvDy, material.outlineWidthPx);
    let outlineCode = outlineCodeOf(outlineWord);
    bandMask = saturate(dilated - sampled.a);
    bandCover = bandMask * outlineOpacityOf(outlineCode);
    bandRgb = outlineLinearOf(outlineCode);
    if ((outlineCode >> 6u) == HELD_GOLD_RGB_CODE) {
      stepCover = saturate(sprite_ringAlpha(arrayUv, layer, duvDx, duvDy, material.outlineWidthPx + 1.0) - max(dilated, sampled.a));
    }
  }
`;function sq(j,q,z=!1){let{blend:W,lit:Y}=j;let $=j.outline!==!1;let B=j.shadow&&Y;let G=Y?q.wrapEvaluateDefs??null:null;let H=Gq(W);let U=H||B;let Q=Ej(Yq);let X=[];if(X.push(`//${`blend:${W} lit:${Y?1:0} shadow:${B?1:0} outline:${$?1:0}`}`),X.push(h.trim()),z)X.push(Vj);if(Y)X.push(H?b(q.wgslDefs):q.wgslDefs);else X.push(H?b(Uj):Qj);if(G)X.push(G);else if(B)X.push(Tj());if(X.push(c),X.push(Yj(!1)),X.push(`@group(2) @binding(1) var spriteTex: texture_2d_array<f32>;
@group(2) @binding(2) var spriteSmp: sampler;`),Y)X.push(`@group(2) @binding(3) var normalTex: texture_2d_array<f32>;
@group(2) @binding(4) var normalSmp: sampler;`);if(X.push(V.trim()),z)X.push("@group(3) @binding(1) var<storage, read> previousInstances: array<SpriteInstance>;");if(X.push(`${u}
const HELD_GOLD_RGB_CODE = ${String(Kj(uj))}u;
const HELD_STEP_RGB = vec3f(${J(Q[0])}, ${J(Q[1])}, ${J(Q[2])});

${Ij}

${vj}`),$)X.push(Uq);let N=[];if(Y)N.push("tangentWorld: vec3f","normalWorld: vec3f");if(U)N.push("viewZ: f32");if(N.push("positionWorld: vec3f"),z)N.push("currentClip: vec4f","previousClip: vec4f");let F=["quadUv",...N.map((M)=>M.slice(0,M.indexOf(":")))],D=`${N.map((M,oj)=>`
  @location(${5+oj}) ${M},`).join("")}
  ${Hj(5+N.length)}`;X.push(`struct VsOut {
  @builtin(position) position: vec4f,
  @location(0) quadUv: vec2f,
  @location(1) @interpolate(flat) instUv: vec4f,
  @location(2) @interpolate(flat) instTint: vec4f,
  @location(3) @interpolate(flat) instA: vec4f,
  @location(4) @interpolate(flat) instB: vec4f,${D}
};`),X.push(Gj("VsOut",F));let C=Y?`
  let rotatedTangent = quatRotate(rotation, vec3f(1.0, 0.0, 0.0));
  let rotatedNormal = quatRotate(rotation, vec3f(0.0, 0.0, 1.0));
  out.tangentWorld = select(rotatedTangent, safeRight, billboard > 0.0);
  out.normalWorld = select(rotatedNormal, safeForward, billboard > 0.0);`:"",O=U?`
  out.viewZ = -(frame.view * vec4f(worldPos, 1.0)).z;`:"",S=`
  out.positionWorld = worldPos;`;if(z)X.push(v);X.push(`@vertex fn vs(${_}) -> VsOut {
${R.join(`
`)}
  let inst = instances[instanceIndex];
  let corner = QUAD_POS[vertexIndex];
${cj(`  let lens = spriteLensOrtho();
  let eye = spriteFacingEye(frame.view, frame.cameraPosition, lens);
`,"spriteFacingRight(frame.view, lens)")}  var clip = ${y("vec4f(worldPos, 1.0)")};
  let sortDepth = inst.flagsB.z;
  let lume_bandS = ${$j("clip","sortDepth > 0.0")};
  var lume_clipOut = ${Bj("clip","sortDepth","lume_bandS","sortDepth > 0.0")};
  clip.z = select(clip.z, sortDepth * clip.w, sortDepth > 0.0);
  if (${mj("inst.flagsB.w")}) {
    clip = vec4f(0.0, 0.0, 2.0, 1.0);
    lume_clipOut = clip;
  }

  var out: VsOut;
  out.position = lume_clipOut;
  out.quadUv = QUAD_UV[vertexIndex];
  out.instUv = inst.uvScaleOffset;
  out.instTint = inst.tint;
  out.instA = vec4f(inst.flagsA.x, inst.scaleYOriginLayer.w, inst.flagsA.z, inst.flagsA.w);
  out.instB = inst.flagsB;${C}${O}${S}
  ${z?`let previousViewRotation = mat3x3f(frame.prevView[0].xyz, frame.prevView[1].xyz, frame.prevView[2].xyz);
  let previousEye = -(frame.prevView[3].xyz * previousViewRotation);
  out.currentClip = clip;
  let previous = previousInstances[instanceIndex];
  out.previousClip = select(out.currentClip, frame.prevViewProj * vec4f(spriteWorld(previous, corner, spriteFacingEye(frame.prevView, previousEye, frame.prevOrtho), spriteFacingRight(frame.prevView, frame.prevOrtho)), 1.0), previous.flagsB.w > 0.5);`:""}
  return lume_bandLensOut(out, lume_bandS);
}`);X.push(Nq());let P=B?`
  let sunShadow = lighting_cascadeShadow(in.positionWorld, N, in.viewZ, in.position.xy);`:"";let A=B?`${q.sunRadiance} * wrapNdotL * sunShadow`:`${q.sunRadiance} * wrapNdotL`;let T=G?`
  let localLight = lighting_wrapClusteredIrradiance(N, in.positionWorld, in.position.xy, ${J(E)});`:"";let gj=G?`${A} + lighting_wrapSkyIrradiance(N) + localLight`:`${A} + ${q.flatArtAmbientColor}`;let rj=Y?`
  var N = normalize(in.normalWorld);
  if (material.normalMix > 0.0) {
    let nSample = textureSampleGrad(normalTex, normalSmp, arrayUv, layer, lodDx, lodDy).xyz * 2.0 - 1.0;
    let shapedXY = nSample.xy * sign(uvScale) * in.instB.y;
    let tangentNormal = mix(vec3f(0.0, 0.0, 1.0), vec3f(shapedXY, nSample.z), material.normalMix);
    let T = normalize(in.tangentWorld);
    N = normalize(T * tangentNormal.x + cross(N, T) * tangentNormal.y + N * tangentNormal.z);
  }
  N = select(-N, N, frontFacing);
  let L = ${q.sunDirection};
  let wrapNdotL = clamp((dot(N, L) + ${J(E)}) / ${J(1+E)}, 0.0, 1.0);${P}${T}
  let shadedArt = tinted.rgb * (${gj}) * ${J(Sj)} + tinted.rgb * emissive;${a}`:`
  let shadedArt = tinted.rgb * (1.0 + emissive);${a}`;let dj=H?`
  let rgb = shade_applyFog(shadedRgb, in.viewZ, in.positionWorld - frame.cameraPosition);`:`
  let rgb = shadedRgb;
  if (passLights.viewFogAmount > 0.0 || passLights.viewFogExtent.w > 0.0) {
    let viewDepth = -(frame.view * vec4f(in.positionWorld, 1.0)).z;
    alpha *= 1.0 - shade_viewFogFactor(viewDepth, in.positionWorld - frame.cameraPosition);
  }`;let g=Qq(W);let lj=z?`return SpriteOutput(${g}, vec4f(lume_motionVector(in.currentClip, in.previousClip), 0.0, alpha));`:`return ${g};`;if(z)X.push("struct SpriteOutput { @location(0) color: vec4f, @location(1) motion: vec4f, }");let aj=`  let uvScale = in.instUv.xy;
  let uvOffset = in.instUv.zw;
  let layer = i32(in.instA.y + 0.5);
  let spriteUv = in.quadUv * uvScale + uvOffset;
  let rawUv = vec2f(spriteUv.x, 1.0 - spriteUv.y);
  let duvDx = dpdx(rawUv);
  let duvDy = dpdy(rawUv);
  let tap = sprite_tap(spriteTex, spriteSmp, rawUv, duvDx, duvDy, in.instUv, layer, material.texelSnap);
  let arrayUv = tap.uv;
  let lodDx = tap.lodDx;
  let lodDy = tap.lodDy;
  let sampled = tap.sampled;

  var resolved = sampled;
  if (material.resolvedMix < 1.0) {
    resolved = mix(spritePlaceholder(in.quadUv, frame.time), sampled, material.resolvedMix);
  }
  if (material.lightCover > 0.5) {
    resolved = vec4f(1, 1, 1, resolved.a * sqrt(dot(resolved.rgb, vec3f(.2126, .7152, .0722))) * (1 - smoothstep(.75, 1, length(in.quadUv * 2 - 1))));
  }

  let tint = in.instTint;
  let opacity = in.instA.x;
  let tinted = vec4f(resolved.rgb * tint.rgb, resolved.a * tint.a * opacity);

  var bandMask = 0.0;
  var bandCover = 0.0;
  var bandRgb = vec3f(0.0);
  var stepCover = 0.0;
${$?Cq:""}  let bandAlpha = saturate(tinted.a + bandCover);
  let outlinedAlpha = saturate(bandAlpha + stepCover);

  let alphaCutoff = in.instA.w;
  let effectiveCutoff = mix(min(alphaCutoff, ${J(qq)}), alphaCutoff, material.resolvedMix);
  let coverageAlpha = max(resolved.a, saturate(saturate(tinted.a + bandMask) + stepCover));
  if (effectiveCutoff > 0.0 && coverageAlpha < effectiveCutoff) {
    discard;
  }
  if (effectiveCutoff > 0.0 && outlinedAlpha <= 0.0) {
    discard;
  }
${pj("in.instB.w","effectiveCutoff > 0.0")}
  let emissive = in.instB.x;
  ${H?"let":"var"} alpha = outlinedAlpha * bodyCover * doorCover;${rj}${dj}
  ${lj}`;X.push(...Dq(aj,W==="alpha",Y,z));return Nj(`${X.join(`

`)}
`)}function mj(j){return`(${j} >= 2.0 && ${j} != 4.0 && frame.ownOut > 0.5) || (${j} >= 4.0 && frame.eyeParts < 0.5)`}function pj(j,q){return`  let doorMag = abs(min(${j}, 0.0));
  var doorHide = doorMag;
  if (doorMag > 1.0) { doorHide = ${Rj("doorMag")}; }
  if (${q} && 1.0 - ${xj("in.position.xy")} < doorHide) {
    discard;
  }
  let doorCover = select(1.0 - doorHide, 1.0, ${q});
  let bodyCover = select(1.0, frame.bodyOpacity, ${j} > 0.0 && ${j} != 2.0 && ${j} < 4.0);
`}function Dq(a,b,c,d){return (Dq=$c0C(2)).call(this,a,b,c,d)}function Fq(){return (Fq=$c0C(3)).call(this)}function nq(j,q,z){let W=Fq();let Y=`sprite/caster/${qj(z)}/${(n(Aq,W,yj))}`;return{key:Y,descriptor:function(){let B=j.createShaderModule({label:Y,code:W}),G=q.getBindGroupLayout(hj,"lume sprite shadow view"),H=q.getBindGroupLayout(x,"sprite draw"),U=q.getBindGroupLayout(m,"sprite material");return{label:Y,layout:j.createPipelineLayout({label:Y,bindGroupLayouts:[G,H,U]}),vertex:{module:B,entryPoint:"vs"},fragment:{module:B,entryPoint:"fs",targets:[]},depthStencil:i(z)}}}}function Oq(){return (Oq=$c0C(4)).call(this)}function tq(j,q){let z=Oq();let W=`sprite/outline-mask/${(n(Aq,z,yj))}`;return{key:W,descriptor:function(){let $=j.createShaderModule({label:W,code:z}),B=[q.getBindGroupLayout(Pj,"lume frame"),q.getBindGroupLayout(fj,"lume outline mask view"),q.getBindGroupLayout(m,"sprite material"),q.getBindGroupLayout(x,"sprite draw")];return{label:W,layout:j.createPipelineLayout({label:W,bindGroupLayouts:B}),vertex:{module:$,entryPoint:"vs"},fragment:{module:$,entryPoint:"fs",targets:[{format:kj}]},depthStencil:{format:Lj,depthWriteEnabled:!0,depthCompare:e}}}}}var x=[Z(0,1|2,"read-only-storage")],Pq=[...x,Z(1,1,"read-only-storage")],m=[Z(0,1|2,"uniform"),k(1,2,"float","2d-array"),I(2,2,"filtering"),k(3,2,"float","2d-array"),I(4,2,"filtering")],Aq=new Map;function o(j,q,z=!1,W=0){return`sprite/${j.blend}-${j.depthMode}-${j.lit?"lit":"unlit"}${j.shadow&&j.lit?"-shadow":""}/${Jj({motion:z})}/${(n(Aq,q,yj))}${Zj(W)}`}function Mq(j,q=!0){return Mj(j)&(q?Aj|L:L)}var s={through:f,throughCover:w};function eq(a,b,c,d,e){return (eq=$c0C(5)).apply(this,arguments)}
;

;import{R as $Lr}from"./52e971dc2a986655.mjs";import{zn9 as V}from"./ec9d7e9e76ff1aa6.mjs";import{$SK as R,MJs as _}from"./b42ed6c77c70a49d.mjs";import{zM4 as hj}from"./0d004466878cd8d5.mjs";export{Bq as uqp,Pq as XZ7,aq as k$H,dq as sOf,eq as b3p,lq as IwR,m as imv,nq as RFV,oq as k05,sq as jHq,tq as aUv,vj as tdS,x as mk5};
