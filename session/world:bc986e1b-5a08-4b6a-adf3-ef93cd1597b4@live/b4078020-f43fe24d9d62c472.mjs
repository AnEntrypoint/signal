import{C as $c0K}from"./52e971dc2a986655.mjs";var $c0C,$c0T=[function(){return[()=>"(function(j,J,Q){let Y=this.tiles.get(j);if(Y!==void 0&&(Y.tx!==J.tx||Y.tz!==J.tz))this.remove(j),Y=void 0;if(Y===void 0){let $=new Float32Array(vj);{let j$1=$,J$1=J.g,Q$1=J.moving;{let j=j$1,J=J$1,Q=Q$1;for(let Y=0;Y<v;Y+=1){let $=J[Y*2],K=J[Y*2+1];if(!(K>0))continue;j[Y*4]=Q?$-K:$,j[Y*4+1]=$,j[Y*4+2]=Q?0:K,j[Y*4+3]=K}}}Y={id:j,tx:J.tx,tz:J.tz,texels:$,startMs:Q,endMs:J.moving?Q+Nj:Q,atMs:J.at,wet:0,meanY:0};this.tiles.set(j,Y)}else{{let j$2=Y.texels,J$2=J.g,Q$2=this.easeOf(Y,Q);{let j=j$2,J=J$2,Q=Q$2;for(let Y=0;Y<v;Y+=1){let $=Y*4;{let J$3=$,Q$3=P(j[$],j[$+1],Q),Y$1=P(j[$+2],j[$+3],Q),$$1=J[Y*2],K$1=J[Y*2+1];{let J=J$3,Q=Q$3,Y=Y$1,$=$$1,K=K$1;let Z=Y>0,q=K>0,X=0,k=0;if(Z)X=Q,k=q?$:Q-Y;else if(q)X=$-K,k=$;j[J]=X,j[J+1]=k,j[J+2]=Z?Y:0,j[J+3]=q?K:0}}}}}let $=J.at-Y.atMs;Y.startMs=Q,Y.endMs=Q+Math.min(Bj,Math.max(E,isFinite($)?$:E)),Y.atMs=J.at}{let j$3=Y;{let j=j$3;let J=j.texels,Q=0,Y=0;for(let $=0;$<J.length;$+=4){if(J[$+3]>0)Y+=J[$+1];else if(J[$+2]>0)Y+=J[$];else continue;Q+=1}j.wet=Q,j.meanY=Q>0?Y/Q:0}}if(Number.isNaN(this.epoch)||Q>=this.easeEndMs&&Q-this.epoch>Aj)this.epoch=Q;this.easeEndMs=Math.max(this.easeEndMs,Y.endMs),this.owed.add(Y),this.layoutStale=!0,this.recordsStale=!0})",()=>"(function(j,J){let Q=Math.floor(j/U)-this.side/2,Y=Math.floor(J/U)-this.side/2;if(Q===this.originTx&&Y===this.originTz)return!1;if(this.originTx=Q,this.originTz=Y,this.tiles.size===0)return!1;return this.layoutStale=!0,this.recordsStale=!0,!0})",()=>"(function(){this.layoutStale=!1,this.wanted.fill(null);for(let Q of this.tiles.values()){let Y=this.slotOf(Q);if(Y>=0)this.wanted[Y]=Q}let j=!0,J=0;for(let Q=0;Q<this.wanted.length;Q+=1){let Y=this.wanted[Q];if(Y!==this.held[Q]){if(Y!==null)this.owed.add(Y);this.held[Q]=Y}if(Y===null||Y.wet===0)continue;if(this.drawn[J]!==Q)j=!1;this.drawn[J]=Q,J+=1}if(J!==this.drawn.length)j=!1;if(this.drawn.length=J,!j)this.drawRevision+=1})",()=>"(function(j){if(this.layoutStale)this.layout();let J=0,Q=this.side;for(let Y of this.owed){let $=this.slotOf(Y);if($<0||this.held[$]!==Y)continue;j($%Q*H,Math.floor($/Q)*H,Y.texels),J+=v}return this.owed=w(this.owed),J})",()=>"(function(j,J,Q){if(this.layoutStale)this.layout();this.recordsStale=!1;for(let Y=0;Y<this.held.length;Y+=1){let $=this.held[Y],K=Y*C,Z=$!==null&&Q<$.endMs;j[K]=Z?($.startMs-this.epoch)/1000:0,j[K+1]=Z?($.endMs-$.startMs)/1000:0,J[K+2]=$===null?S:$.tx,J[K+3]=$===null?S:$.tz}})",()=>'((j)=>`\nconst FW_BODY: vec3<f32> = vec3<f32>(0.035, 0.105, 0.115);\nconst FW_FOAM: vec3<f32> = vec3<f32>(0.78, 0.80, 0.78);\nconst FW_EXTINCTION: f32 = 1.7;\n\n@fragment\nfn fs(in: FwVaryings) -> @location(0) vec4<f32> {\n  let u = in.worldXZ / FW_COLUMN_METRES - vec2<f32>(0.5);\n  let base = floor(u);\n  let t = u - base;\n  let column = vec2<i32>(base);\n  let c00 = fw_column(column);\n  let c10 = fw_column(column + vec2<i32>(1, 0));\n  let c01 = fw_column(column + vec2<i32>(0, 1));\n  let c11 = fw_column(column + vec2<i32>(1, 1));\n  let columnDepth = mix(mix(c00.y, c10.y, t.x), mix(c01.y, c11.y, t.x), t.y);\n  if (columnDepth <= 0.0008) {\n    discard;\n  }\n  let rise = max(0.0, mix(mix(c00.z, c10.z, t.x), mix(c01.z, c11.z, t.x), t.y));\n  let w00 = step(0.00001, c00.y);\n  let w10 = step(0.00001, c10.y);\n  let w01 = step(0.00001, c01.y);\n  let w11 = step(0.00001, c11.y);\n  let wet = mix(mix(w00, w10, t.x), mix(w01, w11, t.x), t.y);\n  let wetDepth = columnDepth / max(wet, 0.001);\n  let cover = mix(smoothstep(0.0, 0.55, wet), smoothstep(0.0, 0.2, wet), smoothstep(0.02, 0.08, wetDepth));\n  let depthSize = vec2<f32>(textureDimensions(forcesWaterSceneDepth));\n  let screenUv = in.position.xy / frame.viewportSize;\n  let sceneDepth = textureLoad(forcesWaterSceneDepth, vec2<i32>(screenUv * depthSize), 0).r;\n  var depth = columnDepth;\n  if (sceneDepth > ${p}) {\n    let groundH = frame.inverseViewProj * vec4<f32>(screenUv.x * 2.0 - 1.0, 1.0 - screenUv.y * 2.0, sceneDepth, 1.0);\n    depth = max(0.0, in.positionRender.y - groundH.y / max(groundH.w, 0.000001));\n  }\n  let slopeX = mix((c10.x - c00.x) * w10 * w00, (c11.x - c01.x) * w11 * w01, t.y) / FW_COLUMN_METRES;\n  let slopeZ = mix((c01.x - c00.x) * w01 * w00, (c11.x - c10.x) * w11 * w10, t.x) / FW_COLUMN_METRES;\n  let drift = vec2<f32>(forcesWater.now * 0.11, forcesWater.now * 0.07);\n  let fine = fw_noise(in.worldXZ * 1.3 + drift);\n  let grain = fw_noise(in.worldXZ * 3.3 + drift * 2.0).x;\n  let stir = clamp(rise, 0.0, 1.0);\n  let ripple = fw_ripple(in.worldXZ, forcesWater.now) * 0.011 * (0.6 + 1.6 * stir);\n  let N = normalize(vec3<f32>(-slopeX - ripple.x, 1.0, -slopeZ - ripple.y));\n  let toEye = frame.cameraPosition - in.positionRender;\n  let V = ${c("toEye")};\n  let facing = clamp(dot(N, V), 0.0, 1.0);\n  let fresnel = 0.06 + 0.94 * pow(1.0 - facing, 5.0);\n  let shallow = 1.0 - smoothstep(0.03, 0.16, depth);\n  let rim = smoothstep(0.08, 0.45, wet) * (1.0 - 0.6 * smoothstep(0.7, 1.0, wet));\n  let front = smoothstep(0.05, 0.7, rise) * shallow * rim * (0.45 + 0.55 * smoothstep(0.2, 0.8, grain + 0.35 * fine.x));\n  let albedo = mix(FW_BODY, FW_FOAM, front);\n  let roughness = mix(0.07, 0.85, front);\n  let lit = ${j.evaluate({N:"N",V:"V",P:"in.positionRender",albedo:"albedo",roughness:"roughness",metalness:"0.0",emissive:"vec3<f32>(0.0)"})};\n  let mirrored = reflect(-V, N);\n  let skyward = normalize(vec3<f32>(mirrored.x * 0.6, abs(mirrored.y) + 0.3, mirrored.z * 0.6));\n  let sky = lighting_iblShIrradiance(skyward) * passLights.iblParams.x + (passLights.hemiSky + passLights.ambientColor) * 0.31830988618;\n  let surface = mix(lit, sky, fresnel * (1.0 - front));\n  let through = exp(-depth * FW_EXTINCTION) * (1.0 - 0.42 * smoothstep(0.0, 0.02, depth));\n  let edge = smoothstep(0.0, 0.012, depth) * cover;\n  let alpha = max(clamp(1.0 - (1.0 - fresnel) * through, 0.0, 1.0) * edge, front * 0.85 * smoothstep(0.0, 0.004, depth));\n  let viewZ = -(frame.view * vec4<f32>(in.positionRender, 1.0)).z;\n  return vec4<f32>(shade_applyFog(surface, viewZ, -toEye), alpha);\n}\n`)']},function(){return[()=>"(function(j){let J=hj[j],Q=new ArrayBuffer(J*J*C*4);return{model:new L(J),gpu:null,uniformWanted:new Float32Array(I),recordBytes:Q,recordFloats:new Float32Array(Q),recordInts:new Int32Array(Q),gpuClockMs:-1/0,drawRevision:-1,ready:!1,sharing:!1,centre:[0,0,0]}})",()=>'((j,J)=>j.device.createBindGroup({label:"forces water",layout:j.layout,entries:[{binding:0,resource:j.texture.view()},{binding:1,resource:{buffer:j.uniform.resource}},{binding:2,resource:{buffer:j.records.resource}},{binding:3,resource:J}]}))',()=>'(function(j,J){if(j.gpu?.device===J.device)return j.gpu;T(j);let Q=J.device;let Y=j.model.side*H;let $=function(){{j.model.forgetGpu(),j.gpuClockMs=-1/0,j.uniformWanted.fill(0)}};let K=o(Q,{label:"forces water layer",size:{width:Y,height:Y},format:"rgba32float",usage:4|2},$);let Z=B(Q,{label:"forces water uniform",size:I*4,usage:64|8},$);let q=B(Q,{label:"forces water records",size:j.recordBytes.byteLength,usage:128|8},$);let X;{let j=new Uint16Array(y),J=0;for(let Q=0;Q<H;Q+=1)for(let Y=0;Y<H;Y+=1){let $=Q*O+Y,K=$+1,Z=$+O,q=Z+1;j[J]=$,j[J+1]=Z,j[J+2]=K,j[J+3]=K,j[J+4]=Z,j[J+5]=q,J+=6}X=j;}let k=(F)=>Q.queue.writeBuffer(F,0,X);let V=B(Q,{label:"forces water grid",size:X.byteLength,usage:16|8},k);k(V.resource);let z=J.pipelines.getBindGroupLayout(xj,"forces water"),G=a(Q,"forces water scene-depth placeholder","r32float",_j),b={device:Q,texture:K,uniform:Z,records:q,layout:z};return j.gpu={...b,indices:V,placeholderDepth:G,boundDepthView:G.view(),boundAt:N(),bindGroup:Zj(b,G.view()),modules:new Map},j.model.forgetGpu(),j.gpuClockMs=-1/0,j.uniformWanted.fill(0),j.gpu})',()=>'(function(j,J,Q){let Y=J.motionVectors===!0,$=`forces-water/${r({motion:Y})}`,K=Qj(J.lighting??Yj(Q),$),Z=K.programKey?`${$}/light/${jj(K)}`:$;Jj(K,Z);return J.pipelines.getRenderPipeline(Z,function(){let q=j.modules.get(Z);if(q===void 0){let V=u(K);let z=s(J.pipelines,[V]);let G=t(j.device,Z,[J.pipelines.getBindGroupLayout(e,"lume frame"),z,j.layout],z);q={module:j.device.createShaderModule({label:Z,code:V}),layout:G},j.modules.set(Z,q)}let{module:X,layout:k}=q;return{label:Z,layout:k,vertex:{module:X,entryPoint:"vs"},fragment:{module:X,entryPoint:"fs",targets:i({blend:f,motion:Y,motionWriteMask:0})},depthStencil:n(!1),multisample:{count:l()}}})})',()=>'(function(j,J,Q,Y,$){let K=J.model;if(K.moveTo($[0],$[2]),K.tileCount()===0&&J.gpu===null)return!1;let Z=Sj(J,Q);let q=Q.device.queue;if(K.pending())K.flush(function(G,b,F){q.writeTexture({texture:Z.texture.resource,origin:{x:G,y:b}},F,{bytesPerRow:H*16,rowsPerImage:H},{width:H,height:H})});if(K.recordsStale)K.writeRecords(J.recordFloats,J.recordInts,Y),q.writeBuffer(Z.records.resource,0,J.recordBytes);let X=Y<K.easeEndMs,k=R(Q);if(J.gpuClockMs<K.easeEndMs||J.uniformWanted[1]!==K.side||Ej(J.uniformWanted,k)){let G=K.epochMs();J.uniformWanted[0]=Number.isNaN(G)?0:(Y-G)/1000,J.uniformWanted[1]=K.side;for(let b=0;b<3;b+=1)J.uniformWanted[D+b]=0-k[b];q.writeBuffer(Z.uniform.resource,0,J.uniformWanted),J.gpuClockMs=Y}let V=K.drawSlots();if(V.length>0!==J.sharing)J.sharing=V.length>0,j.setViewportSharer(Rj,J.sharing?{color:!1,depth:!0}:!1);if(qj(Z,Q.viewportShare?.depthView??Z.placeholderDepth.view()))j.noteContentMoved("water-depth");let z=V.length===0?J.ready:Hj(Z,Q,j).pipeline!==null;if(K.drawRevision!==J.drawRevision||z!==J.ready)J.drawRevision=K.drawRevision,J.ready=z,j.noteContentMoved("water");return X||V.length>0&&!z})']},function(){return[()=>'(function(j,J,Q){let Y=J.gpu;if(Y?.device!==Q.device)return;let $=J.model.drawSlots();if($.length===0)return;let K=Hj(Y,Q,j).pipeline;if(K===null){J.ready=!1,A(1);return}let Z=Q.passBindGroup??$j(Q.device,Q.pipelines);qj(Y,Q.viewportShare?.depthView??Y.placeholderDepth.view());let q=R(Q),X=[];for(let k of $){let V=J.model.centreOf(k,J.centre),z={pipeline:K,bindGroups:[Q.frameBindGroup,Z,Y.bindGroup],indexBuffer:{buffer:Y.indices.resource,format:"uint16"},draw:{indexCount:y,instanceCount:1,firstInstance:k}};X.push({command:z,sortDepth:wj(Q.camera.view,V[0]-q[0],V[1]-q[1],V[2]-q[2])})}return{alpha:X}})',()=>"(function(j,J,Q,Y){let $=Q===null?_(j):gj(j);if($===null)return;if($.water===null){if(Q===null)return;$.water=Kj(Y)}let K=(Number.isNaN($.clockMs)?$.preparedAtMs:$.clockMs);M($.water,J,Q,Number.isNaN(K)?0:K);A(1)})",()=>'(function(j){return{id:"forces-picture",uniformOnlyPrepare:!0,lightFree:!0,prepare(J){{let Q=Number.isNaN(j.clockMs)?J.timeSeconds*1000:j.clockMs;j.preparedAtMs=Q,Gj(J,j.eye);let Y=j.water!==null&&Xj(j.scene,j.water,J,Q,j.eye);bj("forces-picture",Y?1:0)}},mainDraws(J){return j.water===null?void 0:kj(j.scene,j.water,J)}}})']}],$c0XU=[0,6,11];var $c0S,$c0D=()=>eval($c0S);function $c0E(s){$c0S=s;return $c0D()}$c0C=$c0K($c0T,$c0XU,$c0E,14,370699934892032);function $c0P(f,h,k){h[k]=f;return f}
;const{C5q:$j,EBB:bj,Ggy:m,Hed:N,KdH:n,LVY:Pj,MSw:Dj,MfU:i,N0E:Yj,P2_:Qj,RHQ:P,SZK:a,SlX:d,TjB:p,U4E:r,ZZw:B,_FD:R,_rr:x,bli:o,fX9:Jj,fZM:Gj,h1y:Vj,hxd:g,ju0:w,kQP:l,lSa:c,mq1:e,oAB:jj,s7R:f,uMP:s,wRZ:h,yfJ:t,z2Z:A,zfZ:zj}=$Lr;
var H=32,W=0.5,U=H*W,v=H*H,vj=v*4,C=4,S=2147483647,E=100,Bj=2000,Nj=1000,Aj=600000;class L{constructor(j){this.side=void 0;this.tiles=new Map;this.held=void 0;this.wanted=void 0;this.owed=new Set;this.drawn=[];this.originTx=NaN;this.originTz=NaN;this.layoutStale=!1;this.epoch=NaN;this.easeEndMs=-1/0;this.recordsStale=!1;this.drawRevision=0;this.side=j,this.held=Array(j*j).fill(null),this.wanted=Array(j*j).fill(null)}tileCount(){return this.tiles.size}epochMs(){return this.epoch}easeOf(j,J){if(!(J<j.endMs))return 1;let Q=j.endMs-j.startMs;return Q>0?Math.max(0,(J-j.startMs)/Q):1}upsert(a,b,c){return $c0C(0).call(this,a,b,c)}remove(j){let J=this.tiles.get(j);if(J===void 0)return;this.tiles.delete(j),this.owed.delete(J),this.layoutStale=!0,this.recordsStale=!0}forgetGpu(){this.held.fill(null),this.layoutStale=!0,this.recordsStale=!0}moveTo(a,b){return $c0C(1).call(this,a,b)}slotOf(j){let J=this.side,Q=j.tx-this.originTx,Y=j.tz-this.originTz;if(!(Q>=0&&Q<J&&Y>=0&&Y<J))return-1;return(j.tx%J+J)%J+(j.tz%J+J)%J*J}layout(){return $c0C(2).call(this)}pending(){if(this.layoutStale)this.layout();return this.owed.size>0}flush(a){return $c0C(3).call(this,a)}drawSlots(){if(this.layoutStale)this.layout();return this.drawn}centreOf(j,J){let Q=this.held[j];return J[0]=Q===null?0:(Q.tx+0.5)*U,J[1]=Q===null?0:Q.meanY,J[2]=Q===null?0:(Q.tz+0.5)*U,J}writeRecords(a,b,c){return $c0P($c0C(4),L.prototype,"writeRecords").call(this,a,b,c)}shownAt(j,J,Q,Y){let $=this.tiles.get(j);if($===void 0)return null;let K=this.easeOf($,Q);return Y[0]=P($.texels[J*4],$.texels[J*4+1],K),Y[1]=P($.texels[J*4+2],$.texels[J*4+3],K),Y}}var I=8,D=4,O=H+1,y=H*H*6,Ij=`
struct ForcesWater {
  now: f32,
  side: f32,
  spare0: f32,
  spare1: f32,
  origin: vec3<f32>,
  spare2: f32,
};
struct ForcesWaterSlot {
  start: f32,
  span: f32,
  tx: i32,
  tz: i32,
};
@group(2) @binding(0) var forcesWaterTexels: texture_2d<f32>;
@group(2) @binding(1) var<uniform> forcesWater: ForcesWater;
@group(2) @binding(2) var<storage, read> forcesWaterSlots: array<ForcesWaterSlot>;
@group(2) @binding(3) var forcesWaterSceneDepth: texture_2d<f32>;

const FW_COLUMNS: i32 = ${H};
const FW_COLUMN_METRES: f32 = ${W};

fn fw_wrap(value: i32, side: i32) -> i32 {
  return ((value % side) + side) % side;
}

fn fw_column(column: vec2<i32>) -> vec3<f32> {
  let side = i32(forcesWater.side);
  let tile = vec2<i32>(column.x >> 5u, column.y >> 5u);
  let slot = vec2<i32>(fw_wrap(tile.x, side), fw_wrap(tile.y, side));
  let record = forcesWaterSlots[slot.x + slot.y * side];
  if (record.tx != tile.x || record.tz != tile.y) {
    return vec3<f32>(0.0);
  }
  let texel = textureLoad(forcesWaterTexels, vec2<i32>(slot.x * FW_COLUMNS + (column.x & 31), slot.y * FW_COLUMNS + (column.y & 31)), 0);
  var shown = 1.0;
  var rise = 0.0;
  if (record.span > 0.0) {
    shown = clamp((forcesWater.now - record.start) / record.span, 0.0, 1.0);
    if (shown < 1.0 && texel.z <= 0.0 && texel.w > 0.0) {
      rise = sin(shown * 3.14159265);
    }
  }
  return vec3<f32>(mix(texel.x, texel.y, shown), mix(texel.z, texel.w, shown), rise);
}

fn fw_hash(p: vec2<f32>) -> f32 {
  return fract(sin(dot(p, vec2<f32>(127.1, 311.7))) * 43758.5453);
}

fn fw_noise(p: vec2<f32>) -> vec3<f32> {
  let cell = floor(p);
  let f = p - cell;
  let u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  let du = 30.0 * f * f * (f - 1.0) * (f - 1.0);
  let a = fw_hash(cell);
  let b = fw_hash(cell + vec2<f32>(1.0, 0.0));
  let c = fw_hash(cell + vec2<f32>(0.0, 1.0));
  let d = fw_hash(cell + vec2<f32>(1.0, 1.0));
  let value = mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  let gx = du.x * mix(b - a, d - c, u.y);
  let gz = du.y * mix(c - a, d - b, u.x);
  return vec3<f32>(value, gx, gz);
}

fn fw_ripple(p: vec2<f32>, t: f32) -> vec2<f32> {
  var slope = vec2<f32>(0.80, 0.60) * cos(dot(p, vec2<f32>(0.80, 0.60)) * 2.1 + t * 1.3);
  slope += vec2<f32>(-0.45, 0.89) * (0.8 * cos(dot(p, vec2<f32>(-0.45, 0.89)) * 3.7 + t * 1.9 + 1.7));
  slope += vec2<f32>(0.97, -0.26) * (0.6 * cos(dot(p, vec2<f32>(0.97, -0.26)) * 5.9 - t * 2.3 + 4.1));
  slope += vec2<f32>(-0.71, -0.71) * (0.45 * cos(dot(p, vec2<f32>(-0.71, -0.71)) * 9.3 + t * 3.1 + 0.6));
  slope += vec2<f32>(0.26, 0.97) * (0.3 * cos(dot(p, vec2<f32>(0.26, 0.97)) * 14.1 - t * 3.9 + 2.9));
  return slope;
}
`,Oj=`
struct FwVaryings {
  @builtin(position) position: vec4<f32>,
  @location(0) positionRender: vec3<f32>,
  @location(1) worldXZ: vec2<f32>,
};

@vertex
fn vs(@builtin(vertex_index) vertexIndex: u32, @builtin(instance_index) slotIndex: u32) -> FwVaryings {
  let record = forcesWaterSlots[slotIndex];
  let verts = u32(FW_COLUMNS + 1);
  let corner = vec2<i32>(record.tx * FW_COLUMNS + i32(vertexIndex % verts), record.tz * FW_COLUMNS + i32(vertexIndex / verts));
  var sum = 0.0;
  var weight = 0.0;
  for (var dz = -1; dz <= 0; dz += 1) {
    for (var dx = -1; dx <= 0; dx += 1) {
      let c = fw_column(corner + vec2<i32>(dx, dz));
      if (c.y > 0.0) {
        sum += c.x;
        weight += 1.0;
      }
    }
  }
  if (weight == 0.0) {
    for (var dz = -2; dz <= 1; dz += 1) {
      for (var dx = -2; dx <= 1; dx += 1) {
        let c = fw_column(corner + vec2<i32>(dx, dz));
        if (c.y > 0.0) {
          sum += c.x;
          weight += 1.0;
        }
      }
    }
  }
  var out: FwVaryings;
  let world = vec2<f32>(corner) * FW_COLUMN_METRES;
  out.worldXZ = world;
  if (weight == 0.0) {
    out.positionRender = vec3<f32>(world.x, 0.0, world.y) + forcesWater.origin;
    out.position = vec4<f32>(0.0, 0.0, 2.0, 1.0);
    return out;
  }
  out.positionRender = vec3<f32>(world.x, sum / weight, world.y) + forcesWater.origin;
  let toEye = frame.cameraPosition - out.positionRender;
  let range = max(length(toEye), 0.0001);
  let lift = min(clamp(0.06 * range / max(abs(toEye.y), 0.08 * range), 0.06, 0.75), range * 0.5);
  out.position = frame.viewProj * vec4<f32>(out.positionRender + toEye * (lift / range), 1.0);
  return out;
}
`,yj=(j)=>(yj=$c0C(5))(j);function u(j){return[m.trim(),j.wgslDefs,g,j.evaluateDefs??"",Ij,Oj,yj(j)].join(`
`)}var hj={desktop:16,mobile:8},xj=[x(0,1|2,"unfilterable-float","2d"),h(1,1|2,"uniform"),h(2,1|2,"read-only-storage"),x(3,2,"unfilterable-float","2d")],Rj="forces-water";function Kj(a){return (Kj=$c0C(6)).call(this,a)}function M(j,J,Q,Y){if(Q===null)j.model.remove(J);else j.model.upsert(J,Q,Y)}var Zj=(j,J)=>(Zj=$c0C(7))(j,J);var _j=new Float32Array([d]);function qj(j,J){if(J===j.boundDepthView&&j.boundAt===N())return!1;return j.boundDepthView=J,j.boundAt=N(),j.bindGroup=Zj(j,J),!0}function Sj(a,b){return (Sj=$c0C(8)).call(this,a,b)}function Hj(a,b,c){return (Hj=$c0C(9)).call(this,a,b,c)}function Ej(j,J){return j[D]!==Math.fround(0-J[0])||j[D+1]!==Math.fround(0-J[1])||j[D+2]!==Math.fround(0-J[2])}function Xj(a,b,c,d,e){return (Xj=$c0C(10)).call(this,a,b,c,d,e)}var wj=(j,J,Q,Y)=>-(j[2]*J+j[6]*Q+j[10]*Y+j[14]);function kj(a,b,c){return (kj=$c0C(11)).call(this,a,b,c)}function T(j){let J=j.gpu;if(J===null)return;J.texture.release(),J.uniform.release(),J.records.release(),J.indices.release(),J.placeholderDepth.release(),j.gpu=null,j.ready=!1,j.drawRevision=-1}var pj=function(j){if(j.water!==null)T(j.water);j.water=null},Uj=new zj("forces-picture",pj);function gj(j){let J=!1,Q=j.store(Uj,function(){return J=!0,{scene:j,clockMs:NaN,preparedAtMs:NaN,eye:[0,0,0],water:null}});if(J){j.register(uj(Q));}return Q}var _=(j)=>j.peekStore(Uj);function vJ(a,b,c,d){return (vJ=$c0C(12)).call(this,a,b,c,d)}function BJ(j,J){let Q=_(j)?.water??null;if(Q!==null){M(Q,J,null,0)}}function NJ(j){let J=_(j);if(J===null)return;let Q=Dj(Pj(j));J.clockMs=Vj(Q)&&Q>0?Q*1000:NaN}function uj(a){return (uj=$c0C(13)).call(this,a)};

;import{R as $Lr}from"./52e971dc2a986655.mjs";export{BJ as removeForcesPictureEntity,NJ as tickForcesPicture,vJ as setForcesWaterFeed};
