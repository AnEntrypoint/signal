import{C as $c0K}from"./52e971dc2a986655.mjs";var $c0C,$c0T=[function(){return[()=>"(function(j,Z,Q,$=2){let Y=[],q=Math.ceil(Math.max(1,Math.floor(j))/$),K=Math.ceil(Math.max(1,Math.floor(Z))/$);for(let J=0;J<Q;J+=1)Y.push({width:q,height:K}),q=Math.ceil(q/2),K=Math.ceil(K/2);return Y})",()=>"(function(j,Z,Q,$){let Y=Math.max(1,Math.floor(j)),q=Math.max(1,Math.floor(Z)),K=p(Y,q,$,Q),J=[{texel:[1/Y,1/q],srcScale:[Q/Y,Q/q],highScale:[0,0]}];for(let C=1;C<$;C+=1){let I=K[C-1];J.push({texel:[1/I.width,1/I.height],srcScale:[2/I.width,2/I.height],highScale:[0,0]})}let k=[Y/(Q*K[0].width),q/(Q*K[0].height)],X=$-1;for(let C=0;C<G-1;C+=1){let I=z(C,$);let R=K[X];let A=K[I];let F=C===G-2?k:[1,1];let b=2**(I-X);J.push({texel:[1/R.width,1/R.height],srcScale:[F[0]*b/R.width,F[1]*b/R.height],highScale:[F[0]/A.width,F[1]/A.height]}),X=I}return J})",()=>"(function(){if(this.ensuredCanvasWidth===-1)return;this.downTargets=this.downTargets.map((j)=>U(j)),this.upTargets=this.upTargets.map((j)=>U(j)),this.retainedRender=null,this.renderHandle=null,this.ensuredCanvasWidth=-1,this.ensuredCanvasHeight=-1,this.ensuredDivisor=-1,this.ensuredReissues=-1})",()=>'(function(j,Z,Q,$,Y){let q=this.pipelineHandle().pipeline;if(!q)return!1;let K=this.retainedRender,J=K!==null&&K.pipeline===q&&K.uniforms===this.pyramidUniforms.resource?K:this.buildRetainedRender(q);if(this.retainedRender=J,J.canvasWidth!==Q||J.canvasHeight!==$||J.divisor!==this.ensuredDivisor||J.levels!==this.levelCount||J.threshold!==Y.threshold||J.radius!==Y.radius||J.strength!==Y.strength)this.writeRetainedUniforms(J,Q,$,Y);let k=J.prefilterBySource.get(Z)??this.mintPrefilterPass(J,Z);j.addRenderPass("bloom.prefilter",k);let X=J.tail;for(let C=0;C<X.length;C+=1)j.addRenderPass(X[C].name,X[C].desc);return!0})',()=>"(function(j,Z){if(j.prefilterBySource.size>=4)j.prefilterBySource.clear();let{desc:Q,group:$}=this.renderPassRecord(j,0,Z,Z,this.requireTarget(this.downTargets[0]));return j.prefilterBySource.set(Z,Q),this.pipelines.onRetire($,function(){if(j.prefilterBySource.get(Z)===Q)j.prefilterBySource.delete(Z)}),Q})",()=>"(function(j){let Z=this.pyramidUniforms.resource,Q={canvasWidth:-1,canvasHeight:-1,divisor:-1,levels:-1,threshold:NaN,radius:NaN,strength:NaN,pipeline:j,uniforms:Z,prefilterBySource:new Map,tail:[]};for(let Y=1;Y<this.levelCount;Y+=1){let q=this.requireTarget(this.downTargets[Y-1]);Q.tail.push({name:`bloom.down${Y}`,desc:this.renderPassRecord(Q,Y,q.view,q.view,this.requireTarget(this.downTargets[Y])).desc})}let $=this.requireTarget(this.downTargets[this.levelCount-1]);for(let Y=0;Y<G-1;Y+=1){let q=this.requireTarget(this.downTargets[z(Y,this.levelCount)]);let K=this.requireTarget(this.upTargets[Y]);let J=G-2-Y;Q.tail.push({name:`bloom.up${J}`,desc:this.renderPassRecord(Q,this.levelCount+Y,$.view,q.view,K).desc}),$=K}return Q})",()=>'(function(j,Z,Q,$,Y){let q=Z*N,K=[{binding:0,resource:{buffer:j.uniforms,offset:q,size:o*4}},{binding:1,resource:this.sampler},{binding:2,resource:Q},{binding:4,resource:$}],J=this.pipelines.getBindGroup({label:"lume bloom bg",layout:this.layout,entries:K}),k=j.pipeline,X=[J];return{desc:{colorAttachments:[{view:Y.view,format:this.format}],draws:(C)=>H(C,k,X)},group:J}})']},function(){return[()=>"(function(j,Z,Q,$){if($!==this.levelCount)this.retainedRender=null;this.levelCount=$;let Y=p(j,Z,$,Q);for(let q=$;q<y;q+=1)this.downTargets[q]=U(this.downTargets[q]);for(let q=0;q<this.levelCount;q+=1){let K=this.downTargets[q],J=w(this.device,K,{...Y[q],format:this.format,label:`lume bloom down ${q} ${this.format}`});if(this.downTargets[q]=J,J!==K)this.retainedRender=null}for(let q=0;q<G-1;q+=1){let K=this.upTargets[q];let J=w(this.device,K,{...Y[z(q,$)],format:this.format,label:`lume bloom up ${G-2-q} ${this.format}`});if(this.upTargets[q]=J,J!==K)this.retainedRender=null}this.ensuredCanvasWidth=j,this.ensuredCanvasHeight=Z,this.ensuredDivisor=Q,this.ensuredReissues=P()})",()=>"(function(j,Z,Q,$){let Y=c(Z,Q,this.ensuredDivisor,this.levelCount),q=new Float32Array(Y.length*N/4),K=Y.length-1;for(let J=0;J<Y.length;J+=1){let k=J*N/4;let {texel:X,srcScale:C,highScale:I}=Y[J];let R;i:{let j=J,Z=this.levelCount,Q=K;if(j===0){R=D.prefilter;break i;}if(j<Z){R=D.downsample;break i;}R=j===Q?D.finalUpsample:D.upsample;}q[k]=X[0],q[k+1]=X[1],q[k+2]=$.threshold,q[k+3]=S.smoothWidth,q[k+4]=u($.radius),q[k+5]=L($.radius),q[k+6]=R===D.finalUpsample?$.strength:1,q[k+7]=R,q[k+8]=C[0],q[k+9]=C[1],q[k+10]=I[0],q[k+11]=I[1]}this.device.queue.writeBuffer(j.uniforms,0,q.buffer,q.byteOffset,q.byteLength),j.canvasWidth=Z,j.canvasHeight=Q,j.divisor=this.ensuredDivisor,j.levels=this.levelCount,j.threshold=$.threshold,j.radius=$.radius,j.strength=$.strength})"]}],$c0XU=[0,7];var $c0S,$c0D=()=>eval($c0S);function $c0E(s){$c0S=s;return $c0D()}$c0C=$c0K($c0T,$c0XU,$c0E,9,1505709697007616);function $c0P(f,h,k){h[k]=f;return f}
;const{$T1:w,AxC:S,HWS:Xj,Hed:P,J6X:Nj,Kwj:H,Kyo:kj,NsN:L,P27:yj,Rl6:y,TFz:Uj,UKp:Cj,UV3:u,ZZw:x,ZtX:U,_EYV:Ij,_rr:T,bLG:Rj,cBV:f,cxF:Gj,jqS:B,nWo:Dj,oc9:G,pg3:W,rmI:O,t6N:_,wRZ:m,xv5:E,yxd:M,zDp:Fj}=$Lr;
var V=28,h=65504;function p(a,b,c){return (p=$c0C(0)).apply(this,arguments)}function c(a,b,d,e){return (c=$c0C(1)).call(this,a,b,d,e)}var g="auto";function Zj(j){g=j}function v(j){return g==="rgba16float"?"rgba16float":M(j)}var o=12,D=Object.freeze({prefilter:0,downsample:1,upsample:2,finalUpsample:3}),n=`
struct BloomUniforms {
  texel: vec2<f32>,
  threshold: f32,
  smoothWidth: f32,
  radius: f32,
  scatter: f32,
  strength: f32,
  phase: f32,
  srcScale: vec2<f32>,
  highScale: vec2<f32>,
};
@group(0) @binding(0) var<uniform> u: BloomUniforms;
@group(0) @binding(1) var smp: sampler;
@group(0) @binding(2) var srcTex: texture_2d<f32>;
@group(0) @binding(4) var highTex: texture_2d<f32>;
`,l=`
fn tap(at: vec2f) -> vec3f {
  let s = textureSampleLevel(srcTex, smp, at, 0.0).rgb;
  return select(vec3f(0.0), min(s, vec3f(${h}.0)), s >= vec3f(0.0));
}
fn down13(uv: vec2f) -> vec3f {
  let d = u.texel;
  let c = vec2f(d.x, -d.y);
  let d2 = d + d;
  let c2 = vec2f(d2.x, -d2.y);
  let x2 = vec2f(d2.x, 0.0);
  let y2 = vec2f(0.0, d2.y);
  return (tap(uv) + tap(uv - d) + tap(uv + c) + tap(uv - c) + tap(uv + d)) * 0.125
    + (tap(uv - d2) + tap(uv + c2) + tap(uv - c2) + tap(uv + d2)) * 0.03125
    + (tap(uv - y2) + tap(uv - x2) + tap(uv + x2) + tap(uv + y2)) * 0.0625;
}
`,r=`
fn up(at: vec2f) -> vec3f {
  return textureSampleLevel(srcTex, smp, at, 0.0).rgb;
}
fn tent9(uv: vec2f, d: vec2f) -> vec3f {
  let c = vec2f(d.x, -d.y);
  let x = vec2f(d.x, 0.0);
  let y = vec2f(0.0, d.y);
  return up(uv) * 4.0
    + (up(uv + x) + up(uv - x) + up(uv + y) + up(uv - y)) * 2.0
    + (up(uv + d) + up(uv - c) + up(uv + c) + up(uv - d));
}
`,d=`
fn softThreshold(color: vec3<f32>) -> vec3<f32> {
  let knee = max(u.smoothWidth, 0.0001);
  let brightness = max(max(color.r, color.g), color.b);
  let rq = clamp(brightness - u.threshold + knee, 0.0, knee * 2.0);
  let soft = rq * rq / (knee * 4.0 + 0.00001);
  let contribution = clamp(max(soft, brightness - u.threshold) / max(brightness, 0.00001), 0.0, 1.0);
  return color * contribution;
}
`;function t(){return`${n}
${l}
${r}
${d}
${E}
@fragment fn fs(@builtin(position) pos: vec4<f32>) -> @location(0) vec4<f32> {
  let uv = pos.xy * u.srcScale;
  if (u.phase < 1.5) {
    let ceiling = select(${V}.0, max(${V}.0, u.threshold + ${V-1}.0), u.phase < 0.5);
    let down = min(down13(uv), vec3<f32>(ceiling));
    var filtered = down;
    if (u.phase < 0.5) {
      filtered = softThreshold(down);
    }
    return vec4<f32>(filtered, 1.0);
  }
  let filtered = tent9(uv, u.texel * max(u.radius, 0.0)) * (u.scatter / 16.0);
  let accumulated = textureSampleLevel(highTex, smp, pos.xy * u.highScale, 0.0).rgb + filtered;
  return vec4<f32>(accumulated * u.strength, 1.0);
}
`}var N=256;function z(j,Z){return j<Z-1?Z-2-j:0}class s{constructor(j,Z,Q=O()){this.device=void 0;this.pipelines=void 0;this.shape=void 0;this.levelCount=y;this.format=void 0;this.downTargets=[];this.upTargets=[];this.sampler=void 0;this.layout=void 0;this.pyramidUniforms=void 0;this.retainedRender=null;this.renderHandle=null;this.renderHandlesGeneration=-1;this.ensuredCanvasWidth=-1;this.ensuredCanvasHeight=-1;this.ensuredDivisor=-1;this.ensuredReissues=-1;this.device=j,this.pipelines=Z,this.shape=Q,this.format=v(j),this.downTargets=Array.from({length:y},()=>null),this.upTargets=Array.from({length:G-1},()=>null),this.sampler=j.createSampler({label:"lume bloom sampler",magFilter:"linear",minFilter:"linear",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge"}),this.layout=Z.getBindGroupLayout([m(0,2,"uniform"),B(1,2,"filtering"),T(2,2,"float"),T(4,2,"float")],"lume bloom");let $=y+G-1;this.pyramidUniforms=x(j,{label:"lume bloom pyramid uniforms",size:$*N,usage:64|8},f)}targetFormat(){return this.format}outputView(){return this.upTargets[G-2]?.view??null}pipelineHandle(){let j=this.pipelines.generation,Z=this.renderHandle;if(Z!==null&&this.renderHandlesGeneration===j)return Z;return this.buildPipelineHandle(j)}buildPipelineHandle(j){let Z=this.layout,Q=this.pipelines.getRenderPipeline(`post/bloom/${this.format}`,()=>{let $=this.device.createPipelineLayout({label:"lume bloom",bindGroupLayouts:[Z]});return W(this.device,{label:`lume bloom ${this.format}`,code:t(),layout:$,format:this.format})()});return this.renderHandle=Q,this.renderHandlesGeneration=j,Q}warmPipelines(){this.pipelineHandle()}pipelinesReady(){return this.pipelineHandle().pipeline!==null}pictureReady(){let j=this.pipelines.warmScope(()=>this.pipelineHandle(),"picture");if(j.pipeline===null&&!j.failed)this.pipelines.promoteToDraw(j);return j.pipeline!==null}async prepare(){await this.pipelineHandle().ready.catch(()=>null)}declare(j,Z,Q,$,Y=1){let{divisor:q,levels:K}=_(this.shape,Y),J=Math.max(1,Math.floor(Q.width)),k=Math.max(1,Math.floor(Q.height));if(J!==this.ensuredCanvasWidth||k!==this.ensuredCanvasHeight||q!==this.ensuredDivisor||K!==this.levelCount||P()!==this.ensuredReissues)this.ensureTargets(J,k,q,K);return this.declareRender(j,Z,J,k,$)}cutsAs(j){return this.shape===j.shape&&this.format===j.format}release(){return $c0C(2).call(this)}declareRender(a,b,c,d,e){return $c0P($c0C(3),s.prototype,"declareRender").call(this,a,b,c,d,e)}mintPrefilterPass(a,b){return $c0P($c0C(4),s.prototype,"mintPrefilterPass").call(this,a,b)}buildRetainedRender(a){return $c0P($c0C(5),s.prototype,"buildRetainedRender").call(this,a)}renderPassRecord(a,b,c,d,e){return $c0P($c0C(6),s.prototype,"renderPassRecord").call(this,a,b,c,d,e)}ensureTargets(a,b,c,d){return $c0P($c0C(7),s.prototype,"ensureTargets").call(this,a,b,c,d)}writeRetainedUniforms(a,b,c,d){return $c0P($c0C(8),s.prototype,"writeRetainedUniforms").call(this,a,b,c,d)}dispose(){this.release(),this.pyramidUniforms.release()}requireTarget(j){if(!j)throw Error("lume bloom: pyramid target missing after ensure \u2014 declare() sizing bug");return j}};

;import{R as $Lr}from"./52e971dc2a986655.mjs";export{Cj as BLOOM_WIDEST_LEVEL_CSS_PX,D as BLOOM_PHASE,Dj as mapLookBloomStrengthToDualFilter,Fj as mapLookBloomRadiusToDualFilter,G as BLOOM_TERMS,Gj as releaseBloomShape,Ij as bloomShapePreset,L as bloomScatterOf,Nj as mapLookBloomThresholdToDualFilter,O as bloomShapeConfig,Rj as parseBloomShapePreset,S as DEFAULT_DUAL_FILTER_BLOOM_TUNING,Uj as BLOOM_TENT_SPACING_MAX,V as BLOOM_CLAMP_MAX,Xj as setBloomShapePreset,Zj as setBloomTargetFormatMode,_ as bloomPyramidOf,c as bloomPassScales,h as BLOOM_SCRUB_CEILING,kj as BLOOM_SHAPES,p as bloomLevelSizes,s as BloomPass,t as buildBloomWgsl,u as bloomTentSpacingOf,v as resolveBloomTargetFormat,y as BLOOM_MAX_LEVELS,yj as resolveSessionBloomShapePreset};
