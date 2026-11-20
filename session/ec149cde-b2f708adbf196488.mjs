import{C as $c0K}from"./52e971dc2a986655.mjs";var $c0C,$c0T=[function(){return[()=>"(function(Z){return`\nstruct OutlineUniforms {\n  targetSize: vec2f,\n  kernelRadius: f32,\n  crispMode: f32,\n  blurDirection: vec2f,\n  edgeGlow: f32,\n  live: f32,\n};\nstruct OutlineBatchUniforms {\n  slots: array<OutlineUniforms, ${Z}>,\n};\n@group(0) @binding(0) var<uniform> batch: OutlineBatchUniforms;\n@group(0) @binding(1) var smp: sampler;\n${Array.from({length:Z},($,J)=>`@group(0) @binding(${J+2}) var srcTex${J}: texture_2d<f32>;`).join(`\n`)}\n`})",()=>"(function(Z,$){return Array.from({length:Z},(J,z)=>`  output.slot${z} = vec4f(0.0);\n  if (batch.slots[${z}].live > 0.5) {\n    output.slot${z} = ${$}(srcTex${z}, batch.slots[${z}], pos.xy);\n  }`).join(`\n`)})",()=>"(function(Z,$,J,z,X,j,K=!1){return{active:Z,maskView:z,halfEdgeView:X,quarterEdgeView:j,style:$.style,edgeStrength:J.edgeStrength,hiddenStrength:J.hiddenStrength,...J.lineReach!==void 0?{lineReach:J.lineReach}:{},...K?{exactEdges:!0}:{}}})",()=>"(function(Z,$,J,z){Z.addRenderPass(`outline${$}.mask`,{colorAttachments:[{view:J.view,format:g,clearValue:{r:1,g:1,b:1,a:1}}],depthStencil:{transient:{width:J.width,height:J.height},format:a},draws:z})})",()=>"(($)=>function(Y,Q){let k=$.maskDraws?.(Y,{sceneDepth:$.sceneDepth,width:$.width,height:$.height,camera:$.camera,frame:$.frame??null})??null,V=d(Y.style,k?.distance??0,$.height,$.camera.isOrthographic);return{slotIndex:Q,group:Y,provided:k,scaled:V,whole:L(Y.style,V)}})",()=>'(function(Z,$,J){return this.pipelines.getRenderPipeline(`post/outline/batch-${Z}/n${$}`,()=>{let z=this.device.createPipelineLayout({label:"lume outline batch",bindGroupLayouts:[J]});return S(this.device,{label:`lume outline ${Z} batch ${$}`,code:Z==="edge"?NZ($):mZ($),layout:z,format:C,extraTargets:Array.from({length:$-1},()=>({format:C}))})()})})',()=>'(function(Z,$,J,z,X,j,K,Y,Q){if(j.level>0&&Z.levelPipeline){let V=this.declareGlowLevel({...Z,pipeline:Z.levelPipeline},$,J,z,j,K,Y);return{halfEdgeView:V.edge.view,quarterEdgeView:V.halo.view}}if(j.jumps!==void 0&&j.jumps.length>=2&&Z.roundLine)return this.declareRoundLine(Z,Z.roundLine,$,J,z,j.jumps,j.radii[0],K,Y),{halfEdgeView:z.view,quarterEdgeView:this.emptyTexture.view()};if(j.radii.forEach((V,D)=>this.declareSeparable(Z,`outline${$}.blurHalf${D===0?"":D}`,z,X,z,V)),Z.crispMode!==0)return{halfEdgeView:z.view,quarterEdgeView:this.emptyTexture.view()};let k=this.require(J.edge2);if(!Q)this.declareSeparable(Z,`outline${$}.blurQuarter`,z,this.require(J.blur2),k,j.halo);return{halfEdgeView:z.view,quarterEdgeView:k.view}})',()=>"(function(Z,$,J,z,X,j,K=1){let{graph:Y,uploads:Q,passLayout:k,sampler:V,pipeline:D,group:B,crispMode:P}=Z,M=this.scalarBindGroup(Q,k,V,B,P,J,z.width,z.height,j,1,0);Y.addRenderPass(`${$}X`,{colorAttachments:[{view:z.view,format:C}],draws:(H)=>N(H,D,[M])});let A=this.scalarBindGroup(Q,k,V,B,P,z,X.width,X.height,j,0,1,K);Y.addRenderPass(`${$}Y`,{colorAttachments:[{view:X.view,format:C}],draws:(H)=>N(H,D,[A])})})",()=>"(function(Z,$,J,z,X,j,K,Y,Q){let{graph:k,uploads:V,passLayout:D,sampler:B,group:P,crispMode:M}=Z,A=this.ensureLineSeeds(z,J,Y,Q),H=A[0],W=this.scalarBindGroup(V,D,B,P,M,X,H.width,H.height,j[0],0,0);k.addRenderPass(`outline${J}.lineSeed`,{colorAttachments:[{view:H.view,format:w}],draws:(F)=>N(F,$.seed,[W])});for(let F=1;F<j.length-1;F+=1){let G=A[F%2],q=this.seedBindGroup(V,$.seedLayout,H,G.width,G.height,j[F]);k.addRenderPass(`outline${J}.lineJump${j[F]}`,{colorAttachments:[{view:G.view,format:w}],draws:(R)=>N(R,$.jump,[q])}),H=G}let y=this.seedBindGroup(V,$.seedLayout,H,X.width,X.height,K);k.addRenderPass(`outline${J}.lineRound`,{colorAttachments:[{view:X.view,format:C}],draws:(F)=>N(F,$.round,[y])})})"]},function(){return[()=>"(function(Z,$,J,z){return Z.lineSeeds[0]=U(this.device,Z.lineSeeds[0],{width:J,height:z,format:w,label:`lume outline ${$} line seeds`}),Z.lineSeeds[1]=U(this.device,Z.lineSeeds[1],{width:J,height:z,format:w,label:`lume outline ${$} line seeds pong`}),[Z.lineSeeds[0],Z.lineSeeds[1]]})",()=>'(function(Z,$,J,z,X,j){let K=new Float32Array(f);K[0]=z,K[1]=X,K[2]=j,K[3]=1,K[7]=1;let Y=Z.write(K);return this.pipelines.getBindGroup({label:"lume outline line seeds bg",layout:$,entries:[{binding:0,resource:{buffer:Y.buffer,offset:Y.offset,size:f*4}},{binding:1,resource:J.view}]})})',()=>"(function(Z,$,J,z,X,j,K){let{graph:Y,uploads:Q,passLayout:k,sampler:V,pipeline:D,group:B,crispMode:P}=Z,M=z;for(let y=1;y<=X.level;y+=1){let F=this.require(this.ensureGlowLevel(J,$,y,j,K,y===X.level).edge),G=this.scalarBindGroup(Q,k,V,B,P,M,F.width,F.height,0,0,0,r(y));Y.addRenderPass(`outline${$}.level${y}`,{colorAttachments:[{view:F.view,format:C}],draws:(q)=>N(q,D,[G])}),M=F}let A=this.ensureGlowLevel(J,$,X.level,j,K,!0),H=this.require(A.edge),W=this.require(A.halo);return this.declareSeparable(Z,`outline${$}.blurLevel`,H,this.require(A.ping),H,X.radii[0],X.gain),this.declareSeparable(Z,`outline${$}.haloLevel`,H,this.require(A.haloPing),W,X.halo),{edge:H,halo:W}})",()=>'(function(Z,$,J,z,X,j,K){let Y=this.batchBindGroup($,X,z,J,K,(k)=>({source:k.edge1,targetW:this.require(k.slot.blur2).width,targetH:this.require(k.slot.blur2).height,kernelRadius:k.plan.halo,dirX:1,dirY:0}),`lume outline glow batch ${K} bg`);Z.addRenderPass(`outline.glowBatch${K}.blurQuarterX`,{colorAttachments:this.batchAttachments(J.map((k)=>this.require(k.slot.blur2)),K,"quarter"),draws:(k)=>N(k,j,[Y])});let Q=this.batchBindGroup($,X,z,J,K,(k)=>({source:this.require(k.slot.blur2),targetW:this.require(k.slot.edge2).width,targetH:this.require(k.slot.edge2).height,kernelRadius:k.plan.halo,dirX:0,dirY:1}),`lume outline glow batch ${K} bg`);Z.addRenderPass(`outline.glowBatch${K}.blurQuarterY`,{colorAttachments:this.batchAttachments(J.map((k)=>this.require(k.slot.edge2)),K,"quarter"),draws:(k)=>N(k,j,[Q])})})',()=>"(function(Z,$,J,z,X,j){for(let K of J){let Y=this.require(K.slot.edge2),Q=this.require(K.slot.blur2),k=this.scalarBindGroup($,X,z,K.group,K.crispMode,K.edge1,Q.width,Q.height,K.plan.halo,1,0);Z.addRenderPass(`outline${K.slotIndex}.blurQuarterX`,{colorAttachments:[{view:Q.view,format:C}],draws:(D)=>N(D,j,[k])});let V=this.scalarBindGroup($,X,z,K.group,K.crispMode,Q,Y.width,Y.height,K.plan.halo,0,1);Z.addRenderPass(`outline${K.slotIndex}.blurQuarterY`,{colorAttachments:[{view:Y.view,format:C}],draws:(D)=>N(D,j,[V])})}})",()=>'(function(Z,$,J){let z=Z.map((Y)=>({view:Y.view,format:C})),X=this.pads[J],{width:j,height:K}=Z[0];for(let Y=0;Y<$-Z.length;Y+=1){let Q=U(this.device,X[Y]??null,{width:j,height:K,format:C,label:`lume outline batch pad ${J} ${Y}`,usage:16});X[Y]=Q,z.push({view:Q.view,format:C,store:"discard"})}return z})',()=>"(function(Z,$,J,z,X,j,K=`lume outline batch ${X} bg`){let Y=new Float32Array(f*X),Q=[];for(let V=0;V<z.length;V+=1){let D=z[V],B=j(D),P=V*f;Y[P]=B.targetW,Y[P+1]=B.targetH,Y[P+2]=B.kernelRadius,Y[P+3]=D.crispMode,Y[P+4]=B.dirX,Y[P+5]=B.dirY,Y[P+6]=D.group.style.edgeGlow,Y[P+7]=1,Q.push({binding:V+2,resource:B.source.view})}for(let V=z.length;V<X;V+=1)Q.push({binding:V+2,resource:this.emptyTexture.view()});let k=Z.write(Y);return Q.unshift({binding:1,resource:J}),Q.unshift({binding:0,resource:{buffer:k.buffer,offset:k.offset,size:Y.byteLength}}),this.pipelines.getBindGroup({label:K,layout:$,entries:Q})})"]},function(){return[()=>'(function(Z,$,J,z,X,j,K,Y,Q,k,V,D=1){let B=new Float32Array(f);B[0]=K,B[1]=Y,B[2]=Q,B[3]=X,B[4]=k,B[5]=V,B[6]=z.style.edgeGlow,B[7]=D;let P=Z.write(B);return this.pipelines.getBindGroup({label:"lume outline pass bg",layout:$,entries:[{binding:0,resource:{buffer:P.buffer,offset:P.offset,size:f*4}},{binding:1,resource:J},{binding:2,resource:j.view}]})})',()=>"(function(){for(let Z of this.slots){if(!Z)continue;Z.mask=m(Z.mask),Z.maskDown=m(Z.maskDown),Z.edge1=m(Z.edge1),Z.edge2=m(Z.edge2),Z.blur2=m(Z.blur2);for(let $ of Z.levels){if(!$)continue;$.edge=m($.edge),$.ping=m($.ping),$.halo=m($.halo),$.haloPing=m($.haloPing)}Z.levels.length=0,Z.lineSeeds=[m(Z.lineSeeds[0]),m(Z.lineSeeds[1])]}this.slots.length=0;for(let Z of[this.pads.half,this.pads.quarter]){for(let $ of Z)m($);Z.length=0}})",()=>"(function(Z,$,J,z,X,j,K,Y){let Q=this.slots[Z]??={mask:null,maskDown:null,edge1:null,edge2:null,blur2:null,levels:[],lineSeeds:[null,null]};if(Q.mask=U(this.device,Q.mask,{width:$,height:J,format:g,label:`lume outline ${Z} mask`}),Q.maskDown=U(this.device,Q.maskDown,{width:z,height:X,format:C,label:`lume outline ${Z} maskDown`}),Q.edge1=U(this.device,Q.edge1,{width:z,height:X,format:C,label:`lume outline ${Z} edge1`}),Y)Q.edge2=U(this.device,Q.edge2,{width:j,height:K,format:C,label:`lume outline ${Z} edge2`}),Q.blur2=U(this.device,Q.blur2,{width:j,height:K,format:C,label:`lume outline ${Z} blur2`});else{if(Q.edge2&&(Q.edge2.width!==j||Q.edge2.height!==K))Q.edge2=m(Q.edge2);if(Q.blur2&&(Q.blur2.width!==j||Q.blur2.height!==K))Q.blur2=m(Q.blur2)}return Q})",()=>"(function(Z,$,J,z,X,j){let K=Z.levels[J]??={edge:null,ping:null,halo:null,haloPing:null},Y=Math.max(1,Math.round(z/2**J)),Q=Math.max(1,Math.round(X/2**J));if(K.edge=U(this.device,K.edge,{width:Y,height:Q,format:C,label:`lume outline ${$} level ${J}`}),j){let k=Math.max(1,Math.round(Y/2)),V=Math.max(1,Math.round(Q/2));K.ping=U(this.device,K.ping,{width:Y,height:Q,format:C,label:`lume outline ${$} level ${J} ping`}),K.halo=U(this.device,K.halo,{width:k,height:V,format:C,label:`lume outline ${$} level ${J} halo`}),K.haloPing=U(this.device,K.haloPing,{width:k,height:V,format:C,label:`lume outline ${$} level ${J} halo ping`})}return K})",()=>'(function(Z){let $=this.batchPassLayouts.get(Z);if($)return $;let J=[x(0,2,"uniform"),_(1,2,"filtering"),...Array.from({length:Z},(X,j)=>({binding:j+2,visibility:2,texture:{sampleType:"float"}}))],z=this.pipelines.getBindGroupLayout(J,`lume outline batch ${Z}`);return this.batchPassLayouts.set(Z,z),z})']}],$c0XU=[0,9,16];var $c0S,$c0D=()=>eval($c0S);function $c0E(s){$c0S=s;return $c0D()}$c0C=$c0K($c0T,$c0XU,$c0E,21,1568218408812544);function $c0P(f,h,k){h[k]=f;return f}
;const{$T1:U,Cxx:C,E$X:d,I8D:r,KJw:h,Kwj:N,Kzs:a,UyG:l,ZtX:m,_rr:O,eAn:o,jqS:_,l8K:s,pg3:S,ry0:L,tDq:g,vHI:n,wKM:T,wRZ:x,xv5:b}=$Lr;
var e=`fn gaussianPdf(x: f32, sigma: f32) -> f32 {
  return 0.39894 * exp(-0.5 * x * x / (sigma * sigma)) / sigma;
}
${b}`,f=8,t=`struct OutlineUniforms {
  targetSize: vec2f,
  kernelRadius: f32,
  crispMode: f32,
  blurDirection: vec2f,
  edgeGlow: f32,
  gain: f32,
};
@group(0) @binding(0) var<uniform> u: OutlineUniforms;`,c=`
${t}
@group(0) @binding(1) var smp: sampler;
@group(0) @binding(2) var srcTex: texture_2d<f32>;
`,GZ=`fn outline_edgeOfTaps(c1: vec4f, c2: vec4f, c3: vec4f, c4: vec4f, crispMode: f32) -> vec4f {
  let whole = length(vec2f(c1.r - c2.r, c3.r - c4.r) * 0.5);
  let a = vec4f(c1.r, c2.r, c3.r, c4.r) + vec4f(c1.g, c2.g, c3.g, c4.g) * (1.0 - vec4f(c1.r, c2.r, c3.r, c4.r));
  let shown = length(vec2f(a.x - a.y, a.z - a.w) * 0.5);
  let hidden = min(min(c1.g, c2.g), min(c3.g, c4.g));
  let wall = min(min(c1.b, c2.b), min(c3.b, c4.b));
  let red = select(select(0.0, whole, (1.0 - hidden) > 0.001), step(0.05, shown), crispMode > 0.5);
  let green = select(0.0, mix(whole, step(0.05, whole), crispMode), wall > 0.999);
  return vec4f(red, green, 0.0, max(red, green));
}`,ZZ=`${l}
${GZ}
fn downsampledMaskAt(tex: texture_2d<f32>, u: OutlineUniforms, pixelCenter: vec2f) -> vec4f {
  return unpack4x8unorm(pack4x8unorm(vec4f(outlineMaskStateAt(tex, smp, clamp(pixelCenter, vec2f(0.5), u.targetSize - vec2f(0.5)) / u.targetSize), 1.0)));
}
fn outline_edgeAt(tex: texture_2d<f32>, u: OutlineUniforms, pos: vec2f) -> vec4f {
  return outline_edgeOfTaps(downsampledMaskAt(tex, u, pos + vec2f(1.0, 0.0)), downsampledMaskAt(tex, u, pos - vec2f(1.0, 0.0)), downsampledMaskAt(tex, u, pos + vec2f(0.0, 1.0)), downsampledMaskAt(tex, u, pos - vec2f(0.0, 1.0)), u.crispMode);
}`,MZ=`${c}
${b}
${ZZ}
@fragment fn fs(@builtin(position) pos: vec4f) -> @location(0) vec4f {
  return outline_edgeAt(srcTex, u, pos.xy);
}
`;function $Z(Z){return`fn outline_blurAt(tex: texture_2d<f32>, u: OutlineUniforms, pos: vec2f) -> vec4f {
  let uv = pos / u.targetSize;
  let invSize = vec2f(1.0) / u.targetSize;
  let sigma = max(u.kernelRadius / 2.0, 1e-4);
  let centerSample = textureSampleLevel(tex, smp, uv, 0.0);
  var weightSum = gaussianPdf(0.0, sigma);
  var diffuseSum = centerSample * weightSum;
  var maxValue = centerSample;
  let delta = u.blurDirection * invSize * u.kernelRadius / ${Z}.0;
  var uvOffset = delta;
  for (var i: i32 = 1; i <= ${Z}; i = i + 1) {
    let x = u.kernelRadius * f32(i) / ${Z}.0;
    let w = gaussianPdf(x, sigma);
    let sample1 = textureSampleLevel(tex, smp, uv + uvOffset, 0.0);
    let sample2 = textureSampleLevel(tex, smp, uv - uvOffset, 0.0);
    diffuseSum = diffuseSum + (sample1 + sample2) * w;
    weightSum = weightSum + w * 2.0;
    maxValue = max(max(maxValue, sample1), sample2);
    uvOffset = uvOffset + delta;
  }
  let gaussianResult = diffuseSum / weightSum;
  return mix(gaussianResult, maxValue, u.crispMode);
}`}function JZ(Z){return`${c}
${e}
${$Z(Z)}
@fragment fn fs(@builtin(position) pos: vec4f) -> @location(0) vec4f {
  if (all(u.blurDirection == vec2f(0.0))) {
    let uv = pos.xy / u.targetSize;
    let o = vec2f(0.75) / vec2f(textureDimensions(srcTex));
    let quad = textureSampleLevel(srcTex, smp, uv + o, 0.0) + textureSampleLevel(srcTex, smp, uv - o, 0.0) + textureSampleLevel(srcTex, smp, uv + vec2f(o.x, -o.y), 0.0) + textureSampleLevel(srcTex, smp, uv + vec2f(-o.x, o.y), 0.0);
    return quad * 0.25 * u.gain;
  }
  return outline_blurAt(srcTex, u, pos.xy) * u.gain;
}
`}var AZ=JZ(h),FZ=JZ(n),w="rgba16uint",zZ=`const NO_SEED: u32 = 65535u;
fn outline_seedDistance2(p: vec2i, seed: vec2u) -> f32 {
  if (seed.x == NO_SEED) {
    return 1e30;
  }
  let d = vec2f(vec2i(seed) - p);
  return dot(d, d);
}`,RZ=`${c}
${b}
${zZ}
@fragment fn fs(@builtin(position) pos: vec4f) -> @location(0) vec4u {
  let p = vec2i(pos.xy);
  let size = vec2i(textureDimensions(srcTex));
  let jump = i32(u.kernelRadius);
  var best = vec4u(NO_SEED);
  var visibleD2 = 1e30;
  var hiddenD2 = 1e30;
  for (var y: i32 = -1; y <= 1; y = y + 1) {
    for (var x: i32 = -1; x <= 1; x = x + 1) {
      let q = p + vec2i(x, y) * jump;
      if (any(q < vec2i(0)) || any(q >= size)) {
        continue;
      }
      let edge = textureLoad(srcTex, q, 0);
      let d = vec2f(q - p);
      let d2 = dot(d, d);
      if (edge.r > 0.5 && d2 < visibleD2) {
        visibleD2 = d2;
        best = vec4u(vec2u(q), best.zw);
      }
      if (edge.g > 0.5 && d2 < hiddenD2) {
        hiddenD2 = d2;
        best = vec4u(best.xy, vec2u(q));
      }
    }
  }
  return best;
}
`,KZ=`${t}
@group(0) @binding(1) var seeds: texture_2d<u32>;
${b}
${zZ}
fn outline_nearestSeeds(p: vec2i, jump: i32) -> vec4u {
  let size = vec2i(textureDimensions(seeds));
  var best = vec4u(NO_SEED);
  var visibleD2 = 1e30;
  var hiddenD2 = 1e30;
  for (var y: i32 = -1; y <= 1; y = y + 1) {
    for (var x: i32 = -1; x <= 1; x = x + 1) {
      let q = p + vec2i(x, y) * jump;
      if (any(q < vec2i(0)) || any(q >= size)) {
        continue;
      }
      let found = textureLoad(seeds, q, 0);
      let visible = outline_seedDistance2(p, found.xy);
      if (visible < visibleD2) {
        visibleD2 = visible;
        best = vec4u(found.xy, best.zw);
      }
      let hidden = outline_seedDistance2(p, found.zw);
      if (hidden < hiddenD2) {
        hiddenD2 = hidden;
        best = vec4u(best.xy, found.zw);
      }
    }
  }
  return best;
}
`,CZ=`${KZ}
@fragment fn fs(@builtin(position) pos: vec4f) -> @location(0) vec4u {
  return outline_nearestSeeds(vec2i(pos.xy), i32(u.kernelRadius));
}
`,yZ=`${KZ}
@fragment fn fs(@builtin(position) pos: vec4f) -> @location(0) vec4f {
  let p = vec2i(pos.xy);
  let best = outline_nearestSeeds(p, 1);
  let reach = u.kernelRadius + 1.0;
  let visible = clamp(reach - sqrt(outline_seedDistance2(p, best.xy)), 0.0, 1.0);
  let hidden = clamp(reach - sqrt(outline_seedDistance2(p, best.zw)), 0.0, 1.0);
  return vec4f(visible, hidden, 0.0, 0.0);
}
`;function YZ(Z){if(!Number.isInteger(Z)||Z<2||Z>T)throw Error(`lume outlines: invalid MRT batch size ${Z}`)}function QZ(a){return (QZ=$c0C(0)).call(this,a)}function XZ(Z){return`
struct OutlineBatchOutput {
${Array.from({length:Z},($,J)=>`  @location(${J}) slot${J}: vec4f,`).join(`
`)}
};
`}function jZ(a,b){return (jZ=$c0C(1)).call(this,a,b)}function NZ(Z){return YZ(Z),`${QZ(Z)}
${b}
${XZ(Z)}
${ZZ}
@fragment fn fs(@builtin(position) pos: vec4f) -> OutlineBatchOutput {
  var output: OutlineBatchOutput;
${jZ(Z,"outline_edgeAt")}
  return output;
}
`}function mZ(Z){return YZ(Z),`${QZ(Z)}
${e}
${XZ(Z)}
${$Z(h)}
@fragment fn fs(@builtin(position) pos: vec4f) -> OutlineBatchOutput {
  var output: OutlineBatchOutput;
${jZ(Z,"outline_blurAt")}
  return output;
}
`}var p=2;function E(a,b,c,d,e,f){return (E=$c0C(2)).apply(this,arguments)}function UZ(a,b,c,d){return (UZ=$c0C(3)).call(this,a,b,c,d)}var WZ={core:!0,glow:!0};class vZ{constructor(Z,$,J={}){this.device=void 0;this.pipelines=void 0;this.mrt=void 0;this.colorAttachments=void 0;this.slots=[];this.batchPassLayouts=new Map;this.sampler=void 0;this.passLayout=void 0;this.seedLayout=void 0;this.emptyTexture=void 0;this.pads={half:[],quarter:[]};this.device=Z,this.pipelines=$,this.mrt={...WZ,...J},this.colorAttachments=Z.limits?.maxColorAttachments??T;let z=s(Z);this.sampler=z.outlineSampler,this.emptyTexture=z.outlineEmpty,this.passLayout=$.getBindGroupLayout([x(0,2,"uniform"),_(1,2,"filtering"),O(2,2,"float")],"lume outline pass"),this.seedLayout=$.getBindGroupLayout([x(0,2,"uniform"),O(1,2,"uint")],"lume outline line seeds")}warm(Z){let[$]=this.edgeAndBlur();this.levelBlurKernel(),this.roundLineKernels();let J=Z===void 0?0:this.batchSlotsFor(Math.min(Z,this.colorAttachments),Z);if(J>=2&&(this.mrt.core||this.mrt.glow)){let z=this.ensureBatchPassLayout(J);if(this.mrt.core)this.getBatchPipeline("edge",J,z);this.getBatchPipeline("blur",J,z)}return $}batchSlotsFor(Z,$){return Math.max(Z,Math.min(this.colorAttachments,T,$??Z))}async prepare(){let[Z,$]=this.edgeAndBlur(),J=this.levelBlurKernel(),z=this.roundLineKernels().map((X)=>X.ready.catch(function(){return}));await Promise.all([Z.ready,$.ready,J.ready.catch(function(){return}),...z])}kernel(Z,$,J,z,X=C){let j=`lume outline ${$}`;return this.pipelines.getRenderPipeline(`post/outline/${Z}`,()=>S(this.device,{label:j,code:J,layout:this.device.createPipelineLayout({label:j,bindGroupLayouts:[z]}),format:X})())}edgeAndBlur(){return[this.kernel("edge-from-mask","edge from mask",MZ,this.passLayout),this.kernel("blur","blur",AZ,this.passLayout)]}levelBlurKernel(){return this.kernel("blur-level","level blur",FZ,this.passLayout)}roundLineKernels(){return[this.kernel("line-seed","line seed",RZ,this.passLayout,w),this.kernel("line-jump","line jump",CZ,this.seedLayout,w),this.kernel("line-round","line round",yZ,this.seedLayout)]}builtRoundLine(){let[Z,$,J]=this.roundLineKernels();if(!Z.pipeline||!$.pipeline||!J.pipeline)return null;return{seed:Z.pipeline,jump:$.pipeline,round:J.pipeline,seedLayout:this.seedLayout}}declare(Z,$,J,z){let X=this.sampler,j=this.passLayout,[K,Y]=this.edgeAndBlur();if(!K.pipeline||!Y.pipeline)return[];let Q=K.pipeline,k=Y.pipeline,V=Math.max(1,Math.round(z.width/p)),D=Math.max(1,Math.round(z.height/p)),B=Math.max(1,Math.round(V/2)),P=Math.max(1,Math.round(D/2)),{collected:M,levelBlurPipeline:A,roundLine:H}=this.collectSlots(J,z),W=M.reduce((G,q)=>G+Number((q.provided?.draws.length??0)>0),0),y=M.some((G)=>(G.provided?.draws.length??0)>0&&o(G.plan)),F;if(!y&&W>1&&W<=this.colorAttachments&&(this.mrt.core||this.mrt.glow))if(this.mrt.core){let G=this.batchSlotsFor(W,z.slotCap),q=this.ensureBatchPassLayout(G),R=this.getBatchPipeline("edge",G,q),v=this.getBatchPipeline("blur",G,q);if(R.pipeline&&v.pipeline)return this.declareBatch(Z,$,M,z,X,j,k,q,R.pipeline,v.pipeline,G,V,D,B,P)}else{let G=M.reduce((q,R)=>q+Number((R.provided?.draws.length??0)>0&&R.group.style.edgeGlow>0.001),0);if(G>1&&G<=this.colorAttachments){let q=this.batchSlotsFor(G,z.slotCap),R=this.ensureBatchPassLayout(q),v=this.getBatchPipeline("blur",q,R);if(v.pipeline)F={layout:R,pipeline:v.pipeline,slots:q}}}return this.declareScalar(Z,$,M,z,X,j,Q,k,A,H,V,D,B,P,F)}collectSlots(Z,$){let J=Z.map(function a(b,c){return (a.$h??=$c0C(4)($)).call(this,b,c)}),z=J.filter((Y)=>(Y.provided?.draws.length??0)>0),X=z.some((Y)=>Y.whole.level>0)?this.levelBlurKernel().pipeline:null,j=z.some((Y)=>(Y.whole.jumps?.length??0)>0)?this.builtRoundLine():null;return{collected:J.map(({slotIndex:Y,group:Q,provided:k,scaled:V})=>({slotIndex:Y,group:Q,provided:k,scaled:V,plan:L(Q.style,V,X!==null,j!==null)})),levelBlurPipeline:X,roundLine:j}}getBatchPipeline(a,b,c){return $c0P($c0C(5),vZ.prototype,"getBatchPipeline").call(this,a,b,c)}declareScalar(Z,$,J,z,X,j,K,Y,Q,k,V,D,B,P,M){let A=[],H=[];for(let W of J){let y=this.openSlot(Z,A,W,z,V,D,B,P);if(!y)continue;let{slotIndex:F,group:G,scaled:q,plan:R,crispMode:v,slot:VZ,mask:i,maskDown:kZ,edge1:I}=y,qZ={graph:Z,uploads:$,passLayout:j,sampler:X,pipeline:Y,levelPipeline:Q,roundLine:k,group:G,crispMode:v},BZ=this.scalarBindGroup($,j,X,G,v,i,I.width,I.height,0,0,0);Z.addRenderPass(`outline${F}.edge`,{colorAttachments:[{view:I.view,format:C}],draws:(HZ)=>N(HZ,K,[BZ])});let u=M!==void 0&&v===0;if(u)H.push(y);let{halfEdgeView:DZ,quarterEdgeView:PZ}=this.declareBlurs(qZ,F,VZ,I,kZ,R,V,D,u);A.push(E(!0,G,q,i.view,DZ,PZ,R.level>0))}if(M&&H.length>0)this.declareBatchGlow(Z,$,H,X,M.layout,M.pipeline,M.slots);return A}openSlot(Z,$,J,z,X,j,K,Y){let{slotIndex:Q,group:k,provided:V,scaled:D}=J;if(!V||V.draws.length===0){let A=this.emptyTexture.view();return $.push(E(!1,k,D,A,A,A)),null}let B=k.style.edgeGlow<=0.001?1:0,P=this.ensureSlot(Q,z.width,z.height,X,j,K,Y,B===0),M=this.require(P.mask);return UZ(Z,Q,M,V.draws),{...J,provided:V,crispMode:B,slot:P,mask:M,maskDown:this.require(P.maskDown),edge1:this.require(P.edge1)}}declareBlurs(a,b,c,d,e,f,g,h,i){return $c0P($c0C(6),vZ.prototype,"declareBlurs").call(this,a,b,c,d,e,f,g,h,i)}declareSeparable(a,b,c,d,e,f){return $c0P($c0C(7),vZ.prototype,"declareSeparable").apply(this,arguments)}declareRoundLine(a,b,c,d,e,f,g,h,i){return $c0P($c0C(8),vZ.prototype,"declareRoundLine").call(this,a,b,c,d,e,f,g,h,i)}ensureLineSeeds(a,b,c,d){return $c0P($c0C(9),vZ.prototype,"ensureLineSeeds").call(this,a,b,c,d)}seedBindGroup(a,b,c,d,e,f){return $c0P($c0C(10),vZ.prototype,"seedBindGroup").call(this,a,b,c,d,e,f)}declareGlowLevel(a,b,c,d,e,f,g){return $c0P($c0C(11),vZ.prototype,"declareGlowLevel").call(this,a,b,c,d,e,f,g)}declareBatch(Z,$,J,z,X,j,K,Y,Q,k,V,D,B,P,M){let A=[],H=[];for(let q of J){let R=this.openSlot(Z,A,q,z,D,B,P,M);if(!R)continue;H.push(R),A.push(E(!0,R.group,R.scaled,R.mask.view,R.edge1.view,R.crispMode===0?this.require(R.slot.edge2).view:this.emptyTexture.view()))}let W=this.batchBindGroup($,Y,X,H,V,(q)=>({source:q.mask,targetW:q.edge1.width,targetH:q.edge1.height,kernelRadius:0,dirX:0,dirY:0}));Z.addRenderPass(`outline.batch${V}.edge`,{colorAttachments:this.batchAttachments(H.map((q)=>q.edge1),V,"half"),draws:(q)=>N(q,Q,[W])});let y=this.batchBindGroup($,Y,X,H,V,(q)=>({source:q.edge1,targetW:q.maskDown.width,targetH:q.maskDown.height,kernelRadius:q.plan.radii[0],dirX:1,dirY:0}));Z.addRenderPass(`outline.batch${V}.blurHalfX`,{colorAttachments:this.batchAttachments(H.map((q)=>q.maskDown),V,"half"),draws:(q)=>N(q,k,[y])});let F=this.batchBindGroup($,Y,X,H,V,(q)=>({source:q.maskDown,targetW:q.edge1.width,targetH:q.edge1.height,kernelRadius:q.plan.radii[0],dirX:0,dirY:1}));Z.addRenderPass(`outline.batch${V}.blurHalfY`,{colorAttachments:this.batchAttachments(H.map((q)=>q.edge1),V,"half"),draws:(q)=>N(q,k,[F])});let G=H.filter((q)=>q.crispMode===0);if(this.mrt.glow&&G.length>=2)this.declareBatchGlow(Z,$,G,X,Y,k,V);else this.declareScalarGlow(Z,$,G,X,j,K);return A}declareBatchGlow(a,b,c,d,e,f,g){return $c0P($c0C(12),vZ.prototype,"declareBatchGlow").call(this,a,b,c,d,e,f,g)}declareScalarGlow(a,b,c,d,e,f){return $c0P($c0C(13),vZ.prototype,"declareScalarGlow").call(this,a,b,c,d,e,f)}batchAttachments(a,b,c){return $c0P($c0C(14),vZ.prototype,"batchAttachments").call(this,a,b,c)}batchBindGroup(a,b,c,d,e,f){return $c0P($c0C(15),vZ.prototype,"batchBindGroup").apply(this,arguments)}scalarBindGroup(a,b,c,d,e,f,g,h,i,j,k){return $c0P($c0C(16),vZ.prototype,"scalarBindGroup").apply(this,arguments)}release(){return $c0C(17).call(this)}dispose(){this.release()}ensureSlot(a,b,c,d,e,f,g,h){return $c0P($c0C(18),vZ.prototype,"ensureSlot").call(this,a,b,c,d,e,f,g,h)}ensureGlowLevel(a,b,c,d,e,f){return $c0P($c0C(19),vZ.prototype,"ensureGlowLevel").call(this,a,b,c,d,e,f)}require(Z){if(!Z)throw Error("lume outlines: slot target missing after ensure");return Z}ensureBatchPassLayout(a){return $c0P($c0C(20),vZ.prototype,"ensureBatchPassLayout").call(this,a)}};

;import{R as $Lr}from"./52e971dc2a986655.mjs";export{AZ as OUTLINE_BLUR_WGSL,CZ as OUTLINE_LINE_JUMP_WGSL,FZ as OUTLINE_LEVEL_BLUR_WGSL,MZ as OUTLINE_EDGE_WGSL,NZ as buildOutlineBatchEdgeWgsl,RZ as OUTLINE_LINE_SEED_WGSL,mZ as buildOutlineBatchBlurWgsl,vZ as OutlineSlotsRenderer,yZ as OUTLINE_LINE_ROUND_WGSL};
