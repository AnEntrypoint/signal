import{C as $c0K}from"./52e971dc2a986655.mjs";var $c0C,$c0T=[function(){return[()=>'(function(q,k,j,K){let z=T(this.device,this.pipelines);if(this.boundsReduced=!1,!z.pipeline)return;let J=this.boundsBuffer.resource;if(this.device.queue.writeBuffer(J,0,U),this.boundsGroup===null||this.boundsGroupDepth!==k)this.boundsGroup=D(this.device,this.pipelines,"lume debug view depth-bounds",k,J),this.boundsGroupDepth=k;q.addCompute("debug-view-depth-bounds",{pipeline:z.pipeline,bindGroups:[this.boundsGroup],dispatch:R(j,K)}),this.boundsReduced=!0})']}],$c0XU=[0];var $c0S,$c0D=()=>eval($c0S);function $c0E(s){$c0S=s;return $c0D()}$c0C=$c0K($c0T,$c0XU,$c0E,1,1041329041702912);function $c0P(f,h,k){h[k]=f;return f}
;const{DCo:R,Ggy:H,KhX:D,Kwj:V,TjB:x,ZZw:A,_rr:Z,bli:P,cBV:$,cLo:O,cZS:T,lSa:b,pg3:N,wRZ:X,xv5:G}=$Lr;
var M=4,F=`
${H}
struct DebugViewUniforms {
  mode: f32,
  _pad0: f32,
  _pad1: f32,
  _pad2: f32,
}
struct DepthBoundsBits {
  minBits: u32,
  maxBits: u32,
}
@group(1) @binding(0) var<uniform> u: DebugViewUniforms;
@group(1) @binding(1) var depthTex: texture_2d<f32>;
@group(1) @binding(3) var<storage, read> depthBounds: DepthBoundsBits;
@group(1) @binding(4) var censusTex: texture_2d<u32>;
fn debugHeatRamp(t: f32) -> vec3<f32> {
  let cold = mix(vec3<f32>(0.05, 0.12, 0.5), vec3<f32>(0.1, 0.85, 0.25), clamp(t * 2.0, 0.0, 1.0));
  return mix(cold, vec3<f32>(1.0, 0.15, 0.05), clamp(t * 2.0 - 1.0, 0.0, 1.0));
}
fn viewZFromDepth(depth: f32) -> f32 {
  let clipW = frame.inverseViewProj * vec4<f32>(0.0, 0.0, depth, 1.0);
  let world = clipW.xyz / select(clipW.w, 1e-6, abs(clipW.w) < 1e-6);
  return -(frame.view * vec4<f32>(world, 1.0)).z;
}
${G}
@fragment fn fs(@builtin(position) position: vec4<f32>) -> @location(0) vec4<f32> {
  let uv = position.xy / frame.viewportSize;
  let depthSize = vec2<f32>(textureDimensions(depthTex));
  let texel = clamp(vec2<i32>(uv * depthSize), vec2<i32>(0), vec2<i32>(depthSize) - vec2<i32>(1));
  let depth = textureLoad(depthTex, texel, 0).r;
  let ndc = vec4<f32>(uv.x * 2.0 - 1.0, 1.0 - uv.y * 2.0, depth, 1.0);
  let worldW = frame.inverseViewProj * ndc;
  let world = worldW.xyz / select(worldW.w, 1e-6, abs(worldW.w) < 1e-6);
  let facet = cross(dpdx(world), dpdy(world));
  let facetLen = length(facet);
  var normal = select(vec3<f32>(0.0), facet / facetLen, facetLen > 1e-12);
  normal = select(normal, -normal, dot(normal, ${b("frame.cameraPosition - world")}) < 0.0);
  let viewZ = -(frame.view * vec4<f32>(world, 1.0)).z;
  let minZ = viewZFromDepth(bitcast<f32>(depthBounds.maxBits));
  let maxZ = viewZFromDepth(bitcast<f32>(depthBounds.minBits));
  let range = max(maxZ - minZ, 1e-4);
  let t = clamp(log2(1.0 + clamp(viewZ - minZ, 0.0, range)) / log2(1.0 + range), 0.0, 1.0);
  let depthColor = vec3<f32>(pow(1.0 - t, 1.0 / 2.2));
  let normalColor = normal * 0.5 + 0.5;
  let censusSize = vec2<f32>(textureDimensions(censusTex));
  let censusTexel = clamp(vec2<i32>(uv * censusSize), vec2<i32>(0), vec2<i32>(censusSize) - vec2<i32>(1));
  let census = f32(textureLoad(censusTex, censusTexel, 0).r);
  let censusT = clamp(log2(1.0 + census) / log2(33.0), 0.0, 1.0);
  let overdrawColor = select(debugHeatRamp(censusT), vec3<f32>(0.0), census < 0.5);
  var color = select(normalColor, depthColor, u.mode < 1.5);
  color = select(color, vec3<f32>(0.0), depth <= ${x});
  color = select(color, overdrawColor, u.mode > 3.5);
  return vec4<f32>(color, 1.0);
}
`,I=8,U=new Uint32Array([O,0]);class v{constructor(q,k){this.device=void 0;this.pipelines=void 0;this.layout=void 0;this.censusStub=void 0;this.boundsBuffer=void 0;this.boundsReduced=!1;this.boundsGroup=null;this.boundsGroupDepth=null;this.device=q,this.pipelines=k,this.layout=k.getBindGroupLayout([X(0,2,"uniform"),Z(1,2,"unfilterable-float"),X(3,2,"read-only-storage"),Z(4,2,"uint")],"lume debug view"),this.censusStub=P(q,{label:"lume debug view census stub",size:{width:1,height:1},format:"r32uint",usage:4},$),this.boundsBuffer=A(q,{label:"lume debug view depth-bounds",size:I,usage:128|8},$)}declareDepthBounds(a,b,c,d){return $c0P($c0C(0),v.prototype,"declareDepthBounds").call(this,a,b,c,d)}declare(q,k,j){let K=this.boundsReduced;this.boundsReduced=!1;let z=j.mode==="overdraw"||j.mode==="overdraw-density";if(z&&!j.censusView)return;let J=this.pipelines.getRenderPipeline(`post/debug-view/${j.canvasFormat}`,()=>{let Q=this.device.createPipelineLayout({label:"lume debug view",bindGroupLayouts:[j.frameLayout,this.layout]});return N(this.device,{label:"lume debug view",code:F,layout:Q,format:j.canvasFormat})()});if(!J.pipeline)return;if(j.mode==="depth"&&!K)return;let Y=new Float32Array(M),W={depth:1,normal:2,overdraw:4,"overdraw-density":5};Y[0]=W[j.mode];let C=k.write(Y),m=this.pipelines.getBindGroup({label:"lume debug view bg",layout:this.layout,entries:[{binding:0,resource:{buffer:C.buffer,offset:C.offset,size:M*4}},{binding:1,resource:j.depthView},{binding:3,resource:{buffer:this.boundsBuffer.resource}},{binding:4,resource:j.censusView??this.censusStub.view()}]}),w=J.pipeline;q.addRenderPass("debug-view",{colorAttachments:[{view:j.canvasView,format:j.canvasFormat}],draws:(Q)=>V(Q,w,[j.frameBindGroup,m]),...z?{consumes:["overdraw-census"]}:{}})}};

;import{R as $Lr}from"./52e971dc2a986655.mjs";export{F as DEBUG_VIEW_WGSL,v as DebugViewBody};
