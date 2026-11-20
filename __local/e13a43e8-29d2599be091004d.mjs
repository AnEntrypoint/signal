import{C as $c0K}from"./52e971dc2a986655.mjs";var $c0C,$c0T=[function(){return[()=>'(function(e,t,r,i,n){let l=function(){if(s.seeded=!1,r.data!==null)v2(e,s,r.data,t)},s={device:e,handle:$5(e,r2(r,i,n),l),views:null,made:r.made,format:r.format,type:r.type,width:r.width,height:r.height,depth:r.depth,volume:r.volume,storage:i.storage,layout:i.layout,mipLevels:i.mipLevels,filterable:!i.layout.float32||e.features.has("float32-filterable"),seeded:!1,holds:0,samplers:new Map,mipGroups:null,label:n};if(r.data!==null)v2(e,s,r.data,t);return s})',()=>'(function(e){let t=e.handle.generation;if(e.views?.generation===t)return e.views;let r=e.handle.resource,i=e.volume?"3d":"2d";return e.mipGroups=null,e.views={generation:t,view:r.createView({label:`${e.label} view`,dimension:i}),storage:e.storage?r.createView({label:`${e.label} store`,dimension:i,baseMipLevel:0,mipLevelCount:1}):null},e.views})',()=>'(function(e,t,r,i){let n=woM(t);if(n===null)return null;let l;try{let v$1;{let r$1=n;{let r=r$1;let i=y2(e,KAp(r,t.minFilter));let n=Ev0(r,i);v$1={layout:qEN({format:r.format,type:r.type,written:n}),mipLevels:i,storage:n};}}l=v$1}catch(e){return m2(`${i}:${n.shared??""}:words`,K6(e)),null}let s=t2(t,e,r);if(s!==null){if(l.mipLevels>s.mipLevels){{let t$1=s,r$2=t,i$1=n,n$1=l;{let t=t$1,r=r$2,i=i$1,n=n$1;let l=t.layout.gpu===n.layout.gpu,s=t.handle.replace(r2(i,n,t.label));if(l){let r=e.createCommandEncoder({label:`${t.label} grow`});r.copyTextureToTexture({texture:s,mipLevel:0},{texture:t.handle.resource,mipLevel:0},{width:t.width,height:t.height,depthOrArrayLayers:t.depth}),e.queue.submit([r.finish()])}if(t.storage=n.storage,t.layout=n.layout,t.mipLevels=n.mipLevels,!l){if(t.seeded=!1,i.data!==null)v2(e,t,i.data,r)}R2(t);(na(e).retiredScriptTextures).retired.push(s)}}}else if(n.data!==null&&!s.seeded)v2(e,s,n.data,t);return s}if(n.shared===null){let r=w2(e,t,n,l,`${i} texture ${n.name??t.id}`);Q2(e).set(n,r);return r}let o=w2(e,t,n,l,`${i} place texture ${n.name??n.shared}`),a=d2(e,r),u=a.get(n.shared);if(u===void 0)a.set(n.shared,[o]);else u.push(o);return o})',()=>"(function(e,t,r){let i=woM(e);if(i===null)return null;if(i.shared===null){return Q2(t).get(i)??null;}return d2(t,r).get(i.shared)?.find((e)=>(e.made===i.made&&e.format===i.format&&e.type===i.type&&e.width===i.width&&e.height===i.height&&e.depth===i.depth&&e.volume===i.volume))??null})",()=>'(()=>({1003:["nearest","nearest"],1004:["nearest","nearest"],1005:["nearest","linear"],1006:["linear","nearest"],1007:["linear","nearest"],1008:["linear","linear"]}))',()=>'(function(e,t,r){let i=t.filterable&&t.layout.sample==="float",n=i?P2[r.magFilter??1006]??"linear":"nearest",[l,s]=i?(p2??=$c0I(4))[r.minFilter??1006]??["linear","nearest"]:["nearest","nearest"],o=H2[r.wrapS??1001]??"clamp-to-edge",a=H2[r.wrapT??1001]??"clamp-to-edge",u=H2[r.wrapR??1001]??"clamp-to-edge",d=n==="linear"&&l==="linear"&&s==="linear"&&typeof r.anisotropy==="number"&&r.anisotropy>=1?Math.min(16,Math.floor(r.anisotropy)):1,f=t.mipLevels>1&&DYg(r.minFilter),c=`${n}|${l}|${s}|${o}|${a}|${u}|${d}|${f?"chain":"base"}`,h=t.samplers.get(c);if(h===void 0)h=e.createSampler({label:`${t.label} sampler`,magFilter:n,minFilter:l,mipmapFilter:s,addressModeU:o,addressModeV:a,addressModeW:u,maxAnisotropy:d,...f?{}:{lodMaxClamp:0}}),t.samplers.set(c,h);return h})']},function(){return[()=>"(function(e){return`@group(0) @binding(0) var lume_src: texture_2d<f32>;\n@group(0) @binding(1) var lume_dst: texture_storage_2d<${e}, write>;\n@compute @workgroup_size(${S2}, ${S2}) fn main(@builtin(global_invocation_id) g: vec3<u32>) {\n  let size = textureDimensions(lume_dst);\n  if (g.x >= size.x || g.y >= size.y) {\n    return;\n  }\n  let last = textureDimensions(lume_src) - vec2<u32>(1u);\n  let p = g.xy * 2u;\n  let a = textureLoad(lume_src, min(p, last), 0);\n  let b = textureLoad(lume_src, min(p + vec2<u32>(1u, 0u), last), 0);\n  let c = textureLoad(lume_src, min(p + vec2<u32>(0u, 1u), last), 0);\n  let d = textureLoad(lume_src, min(p + vec2<u32>(1u, 1u), last), 0);\n  textureStore(lume_dst, g.xy, (a + b + c + d) * 0.25);\n}\n`})",()=>'(function(e,t,r){if(r.mipLevels<=1||r.volume)return[];let i=r.layout.gpu;let n=t.getComputePipeline(`script-texture-mips|${i}`,()=>({label:`lume script texture mips ${i}`,layout:e.createPipelineLayout({label:`lume script texture mips ${i}`,bindGroupLayouts:[t.getBindGroupLayout(c2(i),"lume script texture mips")]}),compute:{module:t.shaderModule(n2(i),`lume script texture mips ${i}`),entryPoint:"main"}})).pipeline;if(n===null)return null;let l=r.handle.resource;E2(r);if(r.mipGroups===null){let n=t.getBindGroupLayout(c2(i),"lume script texture mips");let s=[];for(let t=1;t<r.mipLevels;t+=1){let i=l.createView({label:`${r.label} mip src ${t-1}`,dimension:"2d",baseMipLevel:t-1,mipLevelCount:1}),o=l.createView({label:`${r.label} mip dst ${t}`,dimension:"2d",baseMipLevel:t,mipLevelCount:1});s.push(e.createBindGroup({label:`${r.label} mip ${t}`,layout:n,entries:[{binding:0,resource:i},{binding:1,resource:o}]}))}r.mipGroups=s}let s=[];for(let e=1;e<r.mipLevels;e+=1){let t=Math.max(1,r.width>>e),i=Math.max(1,r.height>>e);s.push({pipeline:n,bindGroups:[r.mipGroups[e-1]],dispatch:[Math.ceil(t/S2),Math.ceil(i/S2),1],debugLabel:`mip ${e}`})}return s})',()=>"(function(e,t,r){let i=t.volume?`${t.width}\\u00d7${t.height}\\u00d7${t.depth}`:`${t.width}\\u00d7${t.height}`;return`texture ${e} is ${i} texels of ${t.layout.channels} channel(s): its numbers are ${guj(t,t.layout.channels)} long (one per channel per texel, row after row), got ${r}; the texture keeps what it held`})",()=>'(function(e,t,r,i,n){let l=t.width*t.height*t.depth;let s=i2(r,i===DO8||t.layout.sample==="uint"?DO8:i,t.layout,l);if(s===null){m2(`${t.label}:length:${r.length}`,u2(n??t.label,t,r.length));return !1;}e.queue.writeTexture({texture:t.handle.resource,mipLevel:0},s,{bytesPerRow:t.width*t.layout.gpuChannels*t.layout.bytesPerChannel,rowsPerImage:t.height},{width:t.width,height:t.height,depthOrArrayLayers:t.depth});R2(t);return !0})',()=>"(function(e,t){let r=SM9(e.elementType),i=M6(e.elementType)/4;if(r===i)return t;let n;Ad:{let e$1=t,t$2=e.count*i;{let e=e$1,t=t$2;if(e instanceof Int32Array){n=new Int32Array(t);break Ad;}if(e instanceof Uint32Array){n=new Uint32Array(t);break Ad;}n=new Float32Array(t);}}for(let l=0;l<e.count;l+=1)for(let e=0;e<r;e+=1)n[l*i+e]=t[l*r+e];return n})",()=>'(function(e){let t=e.block;if(t===null)return`${e.elementType}x${e.count}${e.atomic?"a":""}`;return`${t.kind}:${t.words}:${t.members.map((e)=>`${e.elementType}x${e.count}@${e.pack?.offset??0}`).join(",")}`})']},function(){return[()=>'(function(e,t){let r=ed.get(e),i=r?.get(t);if(r===void 0||i===void 0)return;if(i.holds-=1,i.holds>0)return;if(r.delete(t),i.entry.holders.delete(i),i.entry.holders.size>0)return;i.entry.handle.release();let n=e.shared??"",l=i.table.get(n);if(l===void 0)return;let s=l.filter((e)=>e!==i.entry);if(s.length>0)i.table.set(n,s);else i.table.delete(n)})',()=>"(function(e,t,r){for(let i of e){if(i.count===0)continue;if(i.shared!==void 0){if(t!==void 0){Md(i,Kd(t,r));}continue}let e=(wd.get(i)??0)-1;if(e>0){wd.set(i,e);continue}wd.delete(i);let n=Bd.get(i);Bd.delete(i);if(n!==void 0)n.release();else if(dd(i.handle))i.handle.destroy();i.handle=null}})",()=>'(function(e,t){if(qd.get(e.buffer)===e)qd.delete(e.buffer),rd-=1;let r=e.standing;if(e.standing=!1,e.gone=!1,r&&t&&!a5(e.handle.resource)){let t=e.handle.device.createCommandEncoder({label:`${e.handle.descriptor.label??""} back`});t.copyBufferToBuffer(e.handle.resource,0,e.buffer,0,e.buffer.size),e.handle.device.queue.submit([t.finish()])}if(e.handle.release(),r)Ud+=1})',()=>"((B,_,P,f)=>function(e,t,r){if(rd===0)return;let i=null;for(let n of B()){let l=qd.get(n);if(l?.standing!==!0)continue;_(l);{let e$2=l,t$3=e;{let e=e$2,t=t$3;e.riding+=1,t.addSubmitCommitHook(e.landed,e.dropped)}}if(l.sharedAt!==r)l.sharedBefore=l.sharedAt,l.sharedAt=r;if(l.stepping.has(P))l.stepping.set(P,r);if(t)(i??=[]).push({src:l.handle.resource,dst:n,size:n.size})}if(i!==null)e.addBufferCopies(`${f}/whole step`,{buffers:i})})",()=>"((z,e,s,n)=>function(t){let r=t.ownStorages;if(r.length!==z.length)return;let i=[];for(let n=0;n<z.length;n+=1){if(xd(r[n])!==xd(z[n]))return;let l=t.bufferOf(r[n]),o=apw(z[n],e,s);if(l===null||o===null)return;if(l!==o)i.push([l,o,GK(z[n])])}if(i.length===0)return;let l=e.createCommandEncoder({label:`${n} compute carry`});for(let[e,t,r]of i)l.copyBufferToBuffer(e,0,t,0,r);e.queue.submit([l.finish()])})",()=>"((e,s,o)=>function(t){let r=[];for(let i of t.compute.textures){let t=woM(i)!==null?$lB(e,i,s):o?.(i)??null;if(t===null)return null;r.push(t.view,t.sampler)}for(let i of t.compute.storeTextures){let t=t2(i,e,s),n=t===null?null:E2(t).storage;if(n===null)return null;r.push(n)}return r})",()=>'(function(e,t,r=null){if(typeof e!=="string"||typeof t!=="string"||t.length===0)return;let i=Uy(e,t,r);let n=Iy.get(i);if(n){n.renewed=!0;return}Iy.set(i,{entityId:e,part:r,name:t,untilMs:1/0,renewed:!0,answeredNull:!1}),Oy=!0})',()=>"(function(e,t,r,i,n=0){if(this.disposed||r<=0)return;this.declares+=1;let l=this.declares;let s;Ry:{let e$4=this.slots,t$5=r;{let e=e$4,t=t$5;for(let r=0;r<e.length;r+=1)if(!e[r].inFlight&&e[r].bytes===t){s=e[r];break Ry;}}}if(s===void 0){for(let e=this.slots.length-1;e>=0;e-=1){let t=this.slots[e];if(!t.inFlight&&t.bytes!==r)t.handle.release(),this.slots.splice(e,1)}if(this.slots.length>0)this.grown+=1;s={handle:e5(this.device,{label:`${this.label} readback ${this.slots.length}`,size:r,usage:9},T5),bytes:r,inFlight:!1},this.slots.push(s)}s.inFlight=!0;let o=s.handle.resource,a=(e)=>{if(e&&!this.disposed&&l>this.landedSerial)try{i(o.getMappedRange(0,s.bytes)),this.landedSerial=l}catch{this.failed+=1}else if(!e)this.failed+=1;try{o.unmap()}catch{}if(s.inFlight=!1,this.disposed)s.handle.release()};try{e.addBufferReadback({src:t,dst:o,size:r,srcOffset:n}).then(()=>a(!0),()=>a(!1))}catch{s.inFlight=!1,this.failed+=1}})"]},function(){return[()=>"(function(e,t=null){if(!ZlW())return By;let{standing:r,dropped:i}=Xy(e);for(let e=0;e<i.length;e+=1){py(i[e]);}for(let e=0;e<r.length;e+=1){let i=r[e];if(t?.draws(i.entityId,i.part)!==!0&&!cy(i.entityId,i.part))Ey(i)}return r})",()=>"(function(e,t,r,i,n){let l=yVV(n,r),s=0;for(let n=0;n<l.length;n+=1){let o=l[n];if(!r.draws(o.entityId,o.part))continue;let a=Ay(r,o.entityId,o.part);if(a.length===0)continue;let u=wy(a,o.name);if(u===null){Ey(o);continue}let{compute:d,ref:f}=u;if(o.answeredNull=!1,!d.declaredAt(i))continue;let c=d.bufferOf(f);if(c===null)continue;bPE(c);let h=yy(o);let p=ey.get(h);if(p!==void 0&&p.device!==e)p.dispose(),ey.delete(h),p=void 0;if(p===void 0)p=new Ny(e,`named buffer ${o.name}`),ey.set(h,p);let m=ty(f);p.declare(t,c,GK(f),function(e){let v$2;Gy:{let e$3=f,t$4=e;{let e=e$3,t=t$4;let r=SM9(e.elementType),i=M6(e.elementType)/4;if(r===i){v$2=t.slice(0,e.count*i*4);break Gy;}let n=new Uint32Array(t,0,e.count*i),l=new Uint32Array(e.count*r);for(let t=0;t<e.count;t+=1)for(let e=0;e<r;e+=1)l[t*r+e]=n[t*i+e];v$2=l.buffer;}}let t=v$2;uy.landings+=1;zy(o.entityId,o.name,m,t,o.part)},(HIM(f)?.offset??0)*4);s+=1;uy.copies+=1}return s})",()=>"(function(e,t,r,i){let n=!1,l=0,s=t.assembled.compute??[];for(let o of[...t.textures??t.assembled.textures,...s.flatMap((e)=>[...e.textures,...e.storeTextures])]){let t=woM(o);if(t?.name!==r.name)continue;n=!0;let s=t2(o,e,i);if(s!==null&&Dy(s.handle.resource,r)&&L2(e,s,r.values,t.type,r.name))l+=1}return{named:n,landed:l}})",()=>'(function(e,t,r,i){let n=!1,l=0;for(let s of[...t.assembled.arrays??[],...(t.assembled.compute??[]).flatMap((e)=>e.arrays)]){if(s.name!==r.name||s.workgroup===!0)continue;n=!0;let t=apw(Y28(s),e,i);if(t===null||!Dy(t,r))continue;let o;ly:{let e$10=s,t$11=r.values;{let e=e$10,t=t$11;let r=SM9(e.elementType);if(t.length!==e.count*r){o=null;break ly;}let i=M6(e.elementType)/4;let n;ny:{let e$5=e$F(e.elementType),t$6=e.count*i;{let e=e$5,t=t$6;if(e==="i32"){n=new Int32Array(t);break ny;}if(e==="u32"){n=new Uint32Array(t);break ny;}n=new Float32Array(t);}}for(let l=0;l<e.count;l+=1)for(let e=0;e<r;e+=1)n[l*i+e]=t[l*r+e];o=n;}}if(o===null){m2(`${r.entityId}:${r.name}:length:${r.values.length}`,`buffer ${r.name} holds ${s.count} ${UJD(s.elementType)} elements: its numbers are ${s.count*SM9(s.elementType)} long, packed as the script packs them, got ${r.values.length}; the buffer keeps what it held`);continue}let a=(HIM(s)?.offset??0)*4;e.queue.writeBuffer(t,a,o);let u=Pd(t);if(u!==t)e.queue.writeBuffer(u,a,o);l+=1}return{named:n,landed:l}})',()=>"(function(e,t){let r=F0(e,t);let i=c0(e,r,t.depthM);let n=r<i?r:e.near;let l=t.fogStartM/t.depthM;let s=i<e.far?WZk(e.projection,i):e.projection;return{camera:{...e,projection:s,far:i},cullProjection:s,viewFog:{near:n+(i-n)*l,far:i,amount:1,bound:iLu(t)}}})",()=>"(function(e,t){let r=e.planes,i=[-r[3],-r[11],-r[19]],n=[r[7],r[15],r[23]];return{center:[(i[0]+n[0])*0.5,(i[1]+n[1])*0.5,(i[2]+n[2])*0.5],halfExtent:[(n[0]-i[0])*0.5,(n[1]-i[1])*0.5,(n[2]-i[2])*0.5],start:t}})",()=>"(function(e,t,r,i=t.projection,n=!1,l,s=0,o){let a=pSj(_S$(i,t.view,U0),q0);let u=m0(e,a,n,l,s,G0,Z0);let d=o??NQf();{let e=d.planes,t=G0,r=Z0;for(let i=0;i<3;i+=1){let n=i===0?1:0,l=i===1?1:0,s=i===2?1:0,o=i*8;e[o]=n,e[o+1]=l,e[o+2]=s,e[o+3]=-t[i],e[o+4]=-n,e[o+5]=-l,e[o+6]=-s,e[o+7]=r[i]}}d.worldId=e.worldId;d.placeId=e.placeId;for(let r=0;r<3;r+=1)d.position[r]=t.position[r],d.anchor[r]=e.anchor[r];return d.forward[0]=-t.view[2],d.forward[1]=-t.view[6],d.forward[2]=-t.view[10],d.screenShare=1,d.eye.heightPx=r,d.eye.fovRad=2*Math.atan(1/Math.abs(i[5])),d.eye.farM=t.far,d.eye.fogM=t.far,d.eye.recordRadiusM=u,d})"]},function(){return[()=>"(function(e){let t=e.anchor;return{worldId:e.worldId,placeId:e.placeId,position:[e.position[0],e.position[1],e.position[2]],anchor:t===void 0?void 0:[t[0],t[1],t[2]],forward:[e.forward[0],e.forward[1],e.forward[2]],planes:e.planes.slice(),screenShare:e.screenShare,eye:{...e.eye}}})",()=>"(function(e,t,r,i,n){let l=Math.max(0,Math.floor(e[0]-i)),s=Math.max(0,Math.floor(e[1]-i)),o=Math.min(t,Math.ceil(e[2]+i)),a=Math.min(r,Math.ceil(e[3]+i)),u=o<=l||a<=s;return n[0]=u?0:l,n[1]=u?0:s,n[2]=u?0:o-l,n[3]=u?0:a-s,n})",()=>"(function(){return{byEntityId:new Map,groups:[],groupsByKey:new Map,nextGroupsByKey:new Map,spriteOutlines:new Map,nextSpriteOutlines:new Map,spritePriorities:new Map,spriteStrokes:[],spriteStrokeCount:0,metGroups:[],meshGroups:[],bandGroups:[]}})",()=>"(function(e,t,r,i,n){let l=e.spriteStrokeCount;e.spriteStrokeCount=l+1;let s=e.spriteStrokes[l];if(s===void 0){e.spriteStrokes.push({group:t,targetId:r,word:i,priority:n});return}s.group=t,s.targetId=r,s.word=i,s.priority=n})",()=>"(function(e,t,r=RIa,i=!1){let n=e.edgeWidth!==void 0&&e.edgeWidth>0?RI(e,e.edgeWidth,t,r,i):null;let l=n!==null&&n.reach>0?{lineReach:n.reach}:{};let s=n?.glowRadius!==void 0?{glowRadius:n.glowRadius}:{};if(!(t>0))return{edgeThickness:n?.thickness??e.edgeThickness,edgeStrength:e.edgeStrength,hiddenStrength:e.edgeStrength,...l,...s};let o=Math.min(gI/t,MI),a=n!==null&&n.glowRadius===void 0;return{edgeThickness:n?.thickness??e.edgeThickness*o,edgeStrength:a?e.edgeStrength:e.edgeStrength*Math.min(o,1),hiddenStrength:e.edgeStrength,...l,...s}})",()=>'((e,t,r,i)=>`[outlines] ${r} distinct outline styles are active but this device renders at most ${i} at once \\u2014 the ${t} lowest-priority are not drawn. Identical styles share one slot, so reusing a color/style frees slots. ${x6} Dropped: ${e.join(", ")}${t>e.length?`, +${t-e.length} more`:""}.`)',()=>"(function(e,t,r=!0,i=!0){let n=t.glowRadius??pZo;if(e.edgeWidth===void 0||!(e.edgeWidth>0))return{level:0,radii:[t.edgeThickness],halo:n,gain:1};if(e.edgeGlow>0.001){let e=n/pZo;if(!(t.edgeThickness>yI||e>1)||!r)return{level:0,radii:[t.edgeThickness],halo:n,gain:1};let i=Math.max(1,Math.ceil(Math.log2(Math.max(t.edgeThickness,n)/lab))),l=2**i,s=1-4**-i,o=(e,t)=>Math.sqrt(Math.max(0,(e/l)**2-t*s-AI));return{level:i,radii:[o(t.edgeThickness,lI[0])],halo:o(n,lI[1]),gain:e/2**(i-1)}}if(i&&t.edgeThickness>=GI){return{level:0,radii:[t.edgeThickness],halo:n,gain:1,jumps:uI(t.edgeThickness)};}let v$3;{let e$6=t.edgeThickness;{let e=e$6;let t=Math.min(e,pZo),r=[t],i=t;while(e-i>0.001){let t=Math.min(2*i,(e-i)/pZo)*pZo;r.push(t),i+=t}v$3=r;}}return{level:0,radii:v$3,halo:n,gain:1}})",()=>"(function(e,t,r){return`${a_(`${e}_out`,t,r)}\nfn ${e}(position: vec4<f32>) -> vec4<f32> {\n  return ${e}_out(position.xy, lume_view_z_of_depth(${e}_out_lensDepth(position.z), ${t}.near, ${t}.far, ${t}.isOrtho, ${t}.depthScale), position.z);\n}`})",()=>'(function(e,t){return t.getRenderPipeline(O7,function(){let r=e.createPipelineLayout({label:C7,bindGroupLayouts:[t.getBindGroupLayout(T0,"lume frame"),t.getBindGroupLayout(f7,C7)]});return pg3(e,{label:C7,code:i7,layout:r,format:U9})()})})']},function(){return[()=>'(function(e,t,r,i,n,l,s,o,a,u,d){if(this.askPipeline=this.pipelines.drawable(TVA(this.device,this.pipelines)),this.askPipeline===null)return!1;let f=this.target=$T1(this.device,this.target,{width:o,height:a,format:U9,label:"lume over ask"}),c=this.pipelines.generation,h=this.askKey;if(this.askGroup===null||h[0]!==n||h[1]!==l.words||h[2]!==l.read||h[3]!==c)this.askGroup=this.device.createBindGroup({label:C7,layout:this.pipelines.getBindGroupLayout(f7,C7),entries:[{binding:0,resource:n},{binding:1,resource:l.words},{binding:2,resource:l.read}]}),this.askKey=[n,l.words,l.read,c];if(this.overGroup===null||this.overView!==f.view||this.overGeneration!==c)this.overGroup=this.device.createBindGroup({label:"lume over",layout:this.pipelines.getBindGroupLayout(swB,hIm),entries:[{binding:0,resource:f.view}]}),this.overView=f.view,this.overGeneration=c;this.askGroups[0]=r,this.askGroups[1]=this.askGroup,this.askAttachment.view=f.view,this.askPass.scissor=u,this.askPass.isolated=d,e.addRenderPass(U7,this.askPass);let p=this.colours;for(let e=0;e<4;e+=1){let t=p[e]??={format:s[e].format,load:"load"};t.view=s[e].view,t.format=s[e].format}p.length=4;let m=this.draw;return m.pipeline=t.pipeline,m.bindGroups[0]=r,m.bindGroups[1]=i,m.bindGroups[2]=t.group,m.bindGroups[3]=this.overGroup,this.overPass.scissor=u,this.overPass.isolated=d,e.addRenderPass(p7,this.overPass),!0})',()=>'(function(e,t){let r=t.getBindGroupLayout(bL,HL);return t.getRenderPipeline(yL,function(){let t=e.createShaderModule({label:HL,code:dL});return{label:HL,layout:e.createPipelineLayout({label:HL,bindGroupLayouts:[r]}),vertex:{module:t,entryPoint:"vs"},fragment:{module:t,entryPoint:"fs",targets:[]},depthStencil:s9(!0,"always")}})})',()=>'(function(e,t,r){if(e===void 0)return;r.length=0;for(let i=0;i<e.length;i+=1){let n=e[i];if(n.channel!=="draws")continue;let l=-1,s=-1;for(let e=0;e<t.length;e+=1){if(t[e]<n.start||t[e]>=n.end)continue;if(l<0)l=e;s=e+1}if(l>=0)r.push({family:n.family,channel:n.channel,start:l,end:s})}return r})',()=>'(function(e,t){{let r=this.runs;if(e===void 0)return;let i=!0;for(let r=0;r<e.length;r+=1)if(e[r].channel==="draws"&&e[r].end>t)i=!1;if(i)return e;r.length=0;for(let i=0;i<e.length;i+=1){let n=e[i];if(n.channel!=="draws"||n.end<=t)r.push(n);else if(n.start<t)r.push({family:n.family,channel:n.channel,start:n.start,end:t})}return r}})',()=>'(function(e,t,r,i,n){let l=this.target=$T1(this.device,this.target,{width:r,height:i,format:U9,label:"lume near depth"});if(this.copyGroup===null||this.copyView!==t||this.copyGeneration!==this.pipelines.generation)this.copyGroup=this.device.createBindGroup({label:XL,layout:this.pipelines.getBindGroupLayout(VL,XL),entries:[{binding:0,resource:t}]}),this.copyView=t,this.copyGeneration=this.pipelines.generation;this.copyAttachment.view=l.view,this.copyPass.scissor=n.scissor,this.copyPass.isolated=n.isolated,e.addRenderPass(iL,this.copyPass)})',()=>'(function(e,t,r=!1){let i=this.target,n=this.after,l=this.bandPicks;if(n.length=0,l.length=0,i===null){for(let r=t;r<e.length;r+=1)n.push(e[r]);return n}if(this.group===null||this.groupView!==i.view||this.groupGeneration!==this.pipelines.generation)this.group=this.device.createBindGroup({label:"lume near depth",layout:this.pipelines.getBindGroupLayout(swB,hIm),entries:[{binding:0,resource:i.view}]}),this.groupView=i.view,this.groupGeneration=this.pipelines.generation;let s=0;for(let i=t;i<e.length;i+=1){let t=e[i];if(r?t.bandSplit===void 0:t.nearDepth!==!0){if(!r)n.push(t);continue}n.push(this.twinOf(this.twins,s,t,r?t.bandSplit??t.pipeline:t.pipeline,this.group)),s+=1,l.push(i)}return n})']},function(){return[()=>"(function(e,t){let r=this.rest,i=this.restPicks,n=this.group;r.length=0,i.length=0;let l=0;for(let s=t;s<e.length;s+=1){let t=e[s];if(t.bandSplit!==void 0)continue;if(i.push(s),t.nearDepth!==!0||n===null){r.push(t);continue}r.push(this.twinOf(this.restTwins,l,t,t.pipeline,n)),l+=1}return r})",()=>"(function(e,t,r){let i=this.hit;if(i===null)return;if(this.depthGroup===null||this.depthView!==i.view||this.depthGeneration!==this.pipelines.generation)this.depthGroup=this.device.createBindGroup({label:HL,layout:this.pipelines.getBindGroupLayout(bL,HL),entries:[{binding:0,resource:i.view}]}),this.depthView=i.view,this.depthGeneration=this.pipelines.generation;this.depthTarget.view=t,this.depthPass.scissor=r.scissor,this.depthPass.isolated=r.isolated,e.addRenderPass(PL,this.depthPass)})",()=>"(function(){this.group=null,this.groupView=null,this.groupGeneration=-1,this.copyGroup=null,this.copyView=null,this.copyGeneration=-1,this.copyPipeline=null,this.copyAttachment.view=void 0,this.depthGroup=null,this.depthView=null,this.depthGeneration=-1,this.depthPipeline=null,this.hitAttachment.view=void 0,this.depthTarget.view=void 0,this.rest.length=0,this.before.length=0,this.after.length=0})",()=>'(function(e,t){for(let r of e.stmts){if((r.kind==="decl"||r.kind==="assign")&&t.has(r.variable))return!0;if(r.kind==="if"&&r.branches.some((e)=>MS(e.scope,t)))return!0;if(r.kind==="loop"&&(t.has(r.counter)||MS(r.scope,t)))return!0}return!1})',()=>'(function(e,t,r){if(e.length===0)return null;let i=e[0];if(!e.every((e)=>e===i))return null;if(typeof i==="number")return IK(i)?{literal:i}:null;let n=i.meta;if(n.kind!=="uniform")return null;for(let[e,i]of Object.entries(t))if(i===n.slot)return{param:e,fallback:r.get(i)??0};return null})',()=>'(function(e){let t=oY[e??"ultra"];if(t>=NQ.length)return NQ;let r=sQ.get(t);if(!r)r=Array.from({length:t},function(e,r){let i=Math.sqrt((r+0.5)/t);return[i*Math.cos(r*nQ),i*Math.sin(r*nQ)]}),sQ.set(t,r);return r})',()=>'(function(e,t,r){let i=e.depth?.sampleLevel(t,0).r;if(!r)return i?sfu(aY,"lume_look_eye_velocity",[t,i],"vec2f").mul(Iwu(0.5,-0.5)):Iwu(0,0);let n=(e.velocity??Ln4(null)).sampleLevel(t,0).xy;if(i)n=TmC(i.lessThanEqual(uQ),sfu(aY,"lume_motion_blur_sky_velocity",[t],"vec2f"),n);let l=(e.motionAvailable??Brh(1)).mul(BuM("f32")`frame.motionValid`);return n.mul(Iwu(0.5,-0.5)).mul(l)})',()=>'(function(e,t,r,i){let n=tY(t).add(tY(i.sub(1))).add(tY(r.sub(1)));return iY(nD5(e,0,1),n.greaterThanEqual(EQ),(e)=>xQ(e,function(e){let n=sfu(jOY,"lume_srgb_encode",[e],"vec3f"),l=nD5(n.mul(i.sub(t)).add(t),0,1),s=Ra8(l,Brh(1).div(cb5(r,AQ)));return sfu(jOY,"lume_srgb_decode",[s],"vec3f")}))})',()=>"(function(e,t=0.3,r={}){let i=cY(r.roundness,ZQ),n=cY(r.feather,cQ),l=MNf().mul(2).sub(1),s=Ra8(Ra8(l.x.abs(),i).add(Ra8(l.y.abs(),i)),Brh(1).div(i)).smoothstep(Brh(1).sub(n),1),o=nD5(cY(t,0.3).mul(s),0,1),a=r.color instanceof IVI?r.color:jQ(r.color??[0,0,0],0);return nD5(AY(e,a,o.mul(o)),0,1)})",()=>"(function(e,t=1.57,r=1){let i=cY(t,1.57),n=cY(r,1),l=i.sin(),s=i.cos(),o=MNf().mul(CY()),a=Iwu(s.mul(o.x).sub(l.mul(o.y)),l.mul(o.x).add(s.mul(o.y))).mul(n),u=a.x.sin().mul(a.y.sin()).mul(4),d=e.r.add(e.g).add(e.b).div(3).mul(10).sub(5).add(u);return fHq(d,d,d)})"]},function(){return[()=>'(function(e,t=1,r=1,i=1,n=0.5){let v$6;sY$:{let e=n,t=0.5;if(e===void 0){v$6=t<=0;break sY$;}v$6=typeof e==="number"&&(!IK(e)?t<=0:e<=0);}if(v$6)return e;let l=sfu(jOY,"lume_srgb_decode",[cb5(fHq(cY(t,1),cY(r,1),cY(i,1)),0)],"vec3f");return e.mul(lEN(fHq(1,1,1),l,nD5(cY(n,0.5),0,1)))})',()=>'(function(e,t,r,i){let n=Math.round(1/i),l=Iwu(Brh(1).div(CY().x),Brh(1).div(CY().y)),s=e("blur.grid",i,function(e){let r=Math.max(1,n/2),i=null;for(let s=0;s<r;s+=1)for(let o=0;o<r;o+=1){let r=Iwu(n===1?0:1+2*o-n/2,n===1?0:1+2*s-n/2),a=t.sampleLevel(e.add(r.mul(l)),0).rgb;i=i===null?a:i.add(a)}return N96(i===null?fHq(0):i.div(r*r),1)});if(s===null)return null;let o=cY(r,0.5).mul(gY),a=(e,t)=>function(r){let i=t.mul(o),n=e.sampleLevel(r,0).rgb.mul(bY(0));for(let t=1;t<=WY;t+=1){let l=bY(t);n=n.add(e.sampleLevel(r.add(i.mul(t)),0).rgb.add(e.sampleLevel(r.sub(i.mul(t)),0).rgb).mul(l))}return N96(n,1)},u=e("blur.across",i,a(s,Iwu(l.x,0)));if(u===null)return null;let d=e("blur.down",i,a(u,Iwu(0,l.y)));if(d===null)return null;let f=nD5(o.mul(i*2),0,1);return lEN(t.sampleLevel(nwK,0).rgb,d.sampleLevel(nwK,0).rgb,f)})',()=>'(function(e){if(e===null)return"null";if(e===void 0)return"undefined";if(e instanceof IVI)return"a shader node";if(Array.isArray(e))return"an array";if(typeof e==="string")return`a string (${JSON.stringify(e)})`;if(typeof e==="boolean")return`a boolean (${String(e)})`;return`a ${typeof e}`})',()=>'(function(e,t,r){let i=zOB(r);if(!i)XQ(e,t,`is not a colour (${JSON.stringify(r)}) \\u2014 write oklch("oklch(0.7 0.15 60)"), a CSS hex ("#ff8800"), rgb("rgb(255 136 0)"), hsl("hsl(30 100% 50%)"), a CSS colour name ("coral"), or an [r, g, b] literal.`);return[i.r,i.g,i.b]})',()=>'((e)=>function(t,r,i,n,l){if(VY("dof",t),!(r instanceof IVI))XQ("dof","viewZ (the second argument)",`must be ctx.viewZ (the pass\'s linearized depth node), got ${dQ(r)}.`);return lQ("dof","focusDistance",i),lQ("dof","focusRange",n),lQ("dof","bokehScale",l),nB0(e,t,r,i,n,l)})',()=>'(function(e,t,r,i,n){if(VY("tint",e),typeof t==="string"){let i=BQ("tint","color (the second argument)",t);return lQ("tint","amount",r),JQ(e,i[0],i[1],i[2],r)}return lQ("tint","r",t),lQ("tint","g",r),lQ("tint","b",i),lQ("tint","amount",n),JQ(e,t,r,i,n)})',()=>'(function(e){let t=e.rows===1?"f32(cell.y)":`f32(cell.y % ${tcX}u)`,r=e.rows===1?`f32(cell.x / ${tcX}u)`:`f32(min(cell.y / ${tcX}u * ${e.columns}u + cell.x / ${tcX}u, ${tcX-1}u))`;return`  let cell = vec2<u32>(position.xy);\n  let index = vec3<f32>(f32(cell.x % ${tcX}u), ${t}, ${r}) / (${G_} - 1.0);\n  var color = index * index;\n  let uv = vec2<f32>(0.5, 0.5);`})',()=>"(function(e){if(e.rows===1)return`fn lume_grade_lut(color: vec3<f32>) -> vec3<f32> {\n  let p = sqrt(clamp(color, vec3<f32>(0.0), vec3<f32>(1.0))) * (${G_} - 1.0);\n  let slice = min(floor(p.b), ${G_} - 2.0);\n  let at = vec2<f32>((p.r + 0.5 + slice * ${G_}) / ${e.width}.0, (p.g + 0.5) / ${G_});\n  let near = textureSampleLevel(gradeLut, smp, at, 0.0).rgb;\n  let far = textureSampleLevel(gradeLut, smp, at + vec2<f32>(1.0 / ${G_}, 0.0), 0.0).rgb;\n  return mix(near, far, p.b - slice);\n}`;return`fn lume_grade_lut_at(p: vec2<f32>, slice: u32) -> vec2<f32> {\n  let row = slice / ${e.columns}u;\n  let place = vec2<f32>(f32(slice - row * ${e.columns}u), f32(row)) * ${G_};\n  return (p + 0.5 + place) / vec2<f32>(${e.width}.0, ${e.height}.0);\n}\n\nfn lume_grade_lut(color: vec3<f32>) -> vec3<f32> {\n  let p = sqrt(clamp(color, vec3<f32>(0.0), vec3<f32>(1.0))) * (${G_} - 1.0);\n  let slice = min(floor(p.b), ${G_} - 2.0);\n  let near = textureSampleLevel(gradeLut, smp, lume_grade_lut_at(p.rg, u32(slice)), 0.0).rgb;\n  let far = textureSampleLevel(gradeLut, smp, lume_grade_lut_at(p.rg, u32(slice) + 1u), 0.0).rgb;\n  return mix(near, far, p.b - slice);\n}`})"]}],$c0XU=[0,6,12,20,27,36,42,52];var $c0S,$c0D=()=>eval($c0S);function $c0E(s){$c0S=s;return $c0D()}$c0C=$c0K($c0T,$c0XU,$c0E,60,3326598267797504);var $c0I=$c0C.i;function $c0P(f,h,k){h[k]=f;return f}
;const{FaJ:Cnl,I2l:M6,Lcw:H2j,Saj:GK}=$Lr.$S;const{$T1,AG4,AJf:x6,ALK,AZn:U9,Aiy,Anw:NK,Anw:QK,Awv,AyU:J9,AyU:Y6,Brh,BuM,CDb:J6,CKU,Cdy:Mv,D6P:Vm,DO8,DYg,Dl_,E6m,EiQ:T6,EiQ:e6,Ev0,F0Q:D5,FKD:$Q,Ft0:j9,Ggy:V0,Ggy:_0,HIM,HWw,HZa,Hed:W5,ITB:Hn,IVI,Iwu,Iz2:pK,JLE,JSI,JXJ,Jai:j6,KAp,KdH:s9,Khf,Kwj,Ln4,M9u:fQ,MN3:na,MNf,N96,NDw:b6,NDw:cK,NDw:fK,NGo,Nzf:pp,O83,PaZ:_G,PaZ:aG,Pjz:lu,QRg,QbK:AG,R51,Ra8,Rm1:A8,SM9,SZK:H5,SlX:B6,TjB:$6,TjB:Z6,TmC,U$a:cv,UJD,Vbf,VgZ,Vgy,VlA,Vp4,W0z:z6,W13,Weq,Wqm:mK,XE9:mi,X_S:lG,Y28,YZe,YnC,ZNz,ZZw:c5,ZZw:e5,ZZw:z5,Z_$,Zpm,ZtX,_S$,_WF,_rr:Uv,_rr:gv,_rr:pv,a19,atS,bli:$5,bli:U5,blz,cBV:N5,cBV:T5,cBV:Y5,cb5,cy9:A6,e$F,eih:ei,fHq,fRd:MK,fgk,gSa:_6,gSa:i6,gU_:K6,gqQ:I6,guj,h1y:E6,h1y:IK,h1y:R6,h1y:W6,h1y:h6,h1y:hK,h1y:v6,jOY,jcL,jkt,jqS:Sv,jtQ:Tj,ju0:RK,jub,k5Z:a5,kIw:UK,lEN,leN,lnW,mq1:S0,mq1:T0,nCD,nD5,nmc,nwK,o$4:vG,oFh,oI8,pSj,pg3,qEN,rFh,rl2:Wi,sfu,t0r,tFq,tZ9:Wn,taY:G6,taY:k6,trX,ts0,ttk:I9,u6$,wRZ:ev,wRZ:wv,wcb,woM,xWV,xv5,y18,ySu:U6,ySu:w6,yWH,yjL,zOB,zfZ:Ev,zfZ:hv}=$Lr;var tE=(()=>globalThis.__spawnEngineConsole??=Object.create(console))(),Q2=(e)=>na(e).ownScriptTextures,$2=new Set;function d2(e,t){let r=t?.scope??e,i=na(e).placeScriptTextures;return e6(i,r)}function y2(e,t){return t>1&&Wn(e)?1:t}var j2=new Set;function m2(e,t){if(j2.has(e))return;if(j2.add(e),!NK({code:_2,key:`script-data:${e}`,message:t}))tE.warn(`[lume] ${t}`)}var _2="script-data-refused";function r2(e,t,r){return{label:r,size:{width:e.width,height:e.height,depthOrArrayLayers:e.depth},dimension:e.volume?"3d":"2d",format:t.layout.gpu,mipLevelCount:t.mipLevels,usage:7|(t.storage?8:0)}}function w2(a,b,c,d,e){return (w2=$c0C(0)).call(this,a,b,c,d,e)}function E2(a){return (E2=$c0C(1)).call(this,a)}function v2(e,t,r,i){if(L2(e,t,r,woM(i)?.type??a19))t.seeded=!0}function U2(a,b,c,d){return (U2=$c0C(2)).call(this,a,b,c,d)}var Fme=(function(e){let t=(na(e).retiredScriptTextures);if(t.retiring.length===0&&t.retired.length===0)return;Q(t);});function t2(a,b,c){return (t2=$c0C(3)).call(this,a,b,c)}function Sli(e){let t=[];for(let r of e)if(woM(r)!==null&&!t.includes(r))t.push(r);return t}function YOt(e,t,r,i){for(let n of t){let t=U2(e,n,i,r);if(t!==null)t.holds+=1}}function kYF(e,t,r){for(let i of e){let e=woM(i),n=t2(i,t,r);if(e===null||n===null)continue;if(n.holds-=1,n.holds>0)continue;n.handle.release();$2.delete(n);if(e.shared===null){Q2(t).delete(e);continue}let l=d2(t,r),s=(l.get(e.shared)??[]).filter((e)=>e!==n);if(s.length>0)l.set(e.shared,s);else l.delete(e.shared)}}var H2={1000:"repeat",1001:"clamp-to-edge",1002:"mirror-repeat"},P2={1003:"nearest",1006:"linear"},p2;function z2(a,b,c){return (z2=$c0C(5)).call(this,a,b,c)}function $lB(e,t,r){let i=t2(t,e,r);if(i===null)return null;return{view:E2(i).view,sampler:z2(e,i,t)}}function oEY(e,t,r,i,n){let l=woM(t),s=t.sampleType,o="filtering";if(l!==null&&t.sampleType==="float"){let r=null;try{r=yjL(t,l).layout}catch{r=null}if(r!==null&&r.float32&&e!==null&&!e.features.has("float32-filterable"))s="unfilterable-float",o="non-filtering"}let a=[{binding:r,visibility:i,texture:{sampleType:s,viewDimension:t.dimension??"2d"}}];if(n)a.push(Sv(r+1,i,o));return a}function JSa(e){let t="";for(let r of e)if(r.texture!==void 0)t+=`${r.binding}:${r.texture.sampleType??"float"};`;else if(r.sampler!==void 0)t+=`${r.binding}:${r.sampler.type??"filtering"};`;return t}function q2(e,t){let r=woM(e);if(r===null)throw Error("internal: a store binding on a texture no script made");return Mv(t,4,yjL(e,r).layout.gpu,r.volume?"3d":"2d")}var S2=8;function n2(a){return (n2=$c0C(6)).call(this,a)}function c2(e){return[pv(0,4,"unfilterable-float","2d"),Mv(1,4,e,"2d")]}function N2(a,b,c){return (N2=$c0C(7)).call(this,a,b,c)}var D2=15360;function i2(e,t,r,i){if(e.length!==i*r.channels)return null;if(r.bytesPerChannel===1)return M2(e,r,i,new Uint8Array(i*r.gpuChannels),W2,255);if(r.bytesPerChannel===2)return M2(e,r,i,new Uint16Array(i*r.gpuChannels),t===nmc&&e instanceof Uint16Array?o2:_WF,D2);if(r.gpuChannels===r.channels&&(e instanceof Float32Array||e instanceof Uint32Array)&&r.sample==="uint"===e instanceof Uint32Array)return e.slice();if(r.sample==="uint")return M2(e,r,i,new Uint32Array(i*r.gpuChannels),s2,1);return M2(e,r,i,new Float32Array(i*r.gpuChannels),o2,1)}function W2(e){return Math.round(Math.min(255,Math.max(0,e)))}function o2(e){return e}function s2(e){return e>>>0}function M2(e,t,r,i,n,l){let{channels:s,gpuChannels:o}=t,a=o===4&&s<4;for(let t=0;t<r;t+=1){for(let r=0;r<s;r+=1)i[t*o+r]=n(e[t*s+r]);if(a)i[t*o+3]=l}return i}function u2(a,b,c){return (u2=$c0C(8)).call(this,a,b,c)}function L2(a,b,c,d,e){return (L2=$c0C(9)).call(this,a,b,c,d,e)}function R2(e){if(e.mipLevels>1)$2.add(e)}var Y2="material-compute/script-texture-mips";function NpZ(e,t,r,i){if($2.size===0)return 0;let n=[],l=0;{l=aa(e,t,n,l,r,i)}return l}var g3l=0,PHn=1,JgA=2,GFv="material-compute";function Od(e){return`${GFv}/${e}`}var vd=[];function ad(e,t,r){let i=e.wholeWorkgroups?(Math.ceil(r/e.workgroupSize)*e.workgroupSize):r;return Math.min(e.count-t,i)}var sd=0.1;function pd(a,b){return (pd=$c0C(10)).call(this,a,b)}var Td=140;function xd(a){return (xd=$c0C(11)).call(this,a)}var Dd=0,ed=new WeakMap;function Kd(e,t){let r=t?.scope??e,i=na(e).placeBufferTables;return e6(i,r)}function Ld(e,t,r){let i=ed.get(e);return i===void 0?void 0:i.get(Kd(t,r))}function Yd(e,t,r,i,n){let l=e6(ed,t),s=l.get(n);if(s!==void 0)return s;let o=mK(n,r),a=o.find((e)=>e.elementType===t.elementType&&e.count===t.count);if(a===void 0){let n={handle:c5(e,{label:`${i} place buffer ${r}`,size:GK(t),usage:Td},function(r){if(n.bound=!1,n.seeded=t.seed!==null,t.seed!==null)e.queue.writeBuffer(r,0,pd(t,t.seed))}),elementType:t.elementType,count:t.count,seeded:!1,bound:!1,holders:new Set,steps:new Map};a=n,o.push(a)}if(t.seed!==null&&!a.seeded&&!a.bound)e.queue.writeBuffer(a.handle.resource,0,pd(t,t.seed)),a.seeded=!0;let u={table:n,entry:a,holds:0};return a.holders.add(u),l.set(n,u),u}function Md(a,b){return (Md=$c0C(12)).call(this,a,b)}function hd(e,t){let r=[];for(let i of e)for(let e of i.compute.storages){let i=ed.get(e)?.get(t)?.entry;if(i!==void 0&&!r.includes(i))r.push(i)}return r}function jd(e,t,r){for(let i of e)if(i.steps.get(t)!==r){for(let i of e)i.steps.set(t,r);return!0}return!1}function cd(e,t,r,i){let n=[];for(let l of t){if(l.count===0)continue;if(l.shared!==void 0){Yd(e,l,l.shared,r,Kd(e,i));continue}if(l.handle!==null)continue;let t=c5(e,{label:`${r} storage ${l.id}`,size:GK(l),usage:Td},function(t){if(l.handle=t,l.seed!==null)e.queue.writeBuffer(t,0,pd(l,l.seed))}),s=t.resource,o=l.seed;if(o!==null)e.queue.writeBuffer(s,0,pd(l,o));if(!D5(s))l.seed=null;l.handle=s,Bd.set(l,t),n.push(s)}return n}var wd=new WeakMap,Bd=new WeakMap;function ex7(e,t,r,i){cd(e,t,r,i);for(let r of t){{let v$7;fa:{let r$4=r;{let r=r$4;if(r.count===0){{v$7=ea;break fa;}}let t=r.shared===void 0?void 0:Ld(r,e,i);if(t!==void 0)t.holds+=1;else A6(wd,r)
}}da=v$7;if(da===ea)continue;}}}function R9Y(a,b,c){return $c0C(13).call(this,a,b,c)}function dd(e){return i6(e)&&"size"in e&&"destroy"in e}function apw(e,t,r){if(e.shared!==void 0){let i=t===void 0?void 0:Ld(e,t,r)?.entry;if(t===void 0||i===void 0)return null;return i.handle.resource}let i=e.handle;if(!dd(i))return null;if(e.seed!==null&&!D5(i)&&!a5(i))e.seed=null;return i}var Vd=new WeakSet,qd=new WeakMap,rd=0,Ud=0;function bPE(e){Vd.add(e)}function Pd(e){let t=qd.get(e);return t?.standing===!0?t.handle.resource:e}function Id(e,t,r){r.copyBufferToBuffer(e,0,t,0,e.size)}function ld(e,t,r){let i=qd.get(t);if(i!==void 0)return i;let n=c5(e,{label:`${r} step copy`,size:t.size,usage:Td},function(i){if(qd.get(t)!==s||!s.standing)return;let n=e.createCommandEncoder({label:`${r} step copy refill`});Id(t,i,n);e.queue.submit([n.finish()])});let l=function(e){if(s.riding-=1,e)s.lost=!0;if(s.riding===0&&s.gone)Xd(s,s.handBack&&s.lost)};let s={buffer:t,handle:n,stepping:new Map,sharedAt:NaN,sharedBefore:NaN,standing:!1,riding:0,gone:!1,handBack:!1,lost:!1,landed:()=>l(!1),dropped:()=>l(!0)};return qd.set(t,s),rd+=1,s}function zd(e,t){if(e.riding>0){e.gone=!0,e.handBack=t,e.lost=!1;return}Xd(e,t)}function Xd(a,b){return (Xd=$c0C(14)).call(this,a,b)}function c5d(e,t){let r=[ev(g3l,4,"uniform"),ev(PHn,4,"uniform")];for(let e=0;e<t.storages.length;e+=1)r.push(ev(JgA+e,4,t.storages[e].engine===void 0?"storage":"read-only-storage"));let i=JgA+t.storages.length;t.textures.forEach((t,n)=>r.push(...oEY(e,t,i+2*n,4,!0)));let n=i+2*t.textures.length;t.storeTextures.forEach((e,t)=>r.push(q2(e,n+t)));return r}function W2I(e,t,r,i,n,l,s,o,a=(t)=>apw(t,e,s),u){let d=Kd(e,s);let f=Od(l);let c=t.getBindGroupLayout(S0,"lume frame");let h=(t)=>c5(e,{label:`${n} compute ${t} dispatch`,size:16,usage:72},Y5);let p=r.map(function(e,t){let r=AG4(e.count,[0,0,0],e.workgroupSize);return{compute:e,dispatch:r,index:t,label:`computeNode[${t}]`,dispatchBuffer:h(t),handle:null,parked:!1,bindGroup:null,bound:[],boundViews:[],boundAt:-1,copiesAt:-1,command:null}});let m=r.reduce((e,t)=>e+t.count,0);let g=[];let y=[];let v=new Uint32Array(4);let w=new Float32Array(v.buffer,8,1);let b=NaN;let k=0;let x=0;let M=NaN;let S=0;let I=!1;let R=t.generation;let A=null;let $=r.map((e)=>`${e.count}|${e.workgroupSize}|${e.wgsl}`).join("\x00");let z=[];for(let e of p)for(let t of e.compute.storages)if(t.count>0&&t.shared===void 0&&t.engine===void 0&&!z.includes(t))z.push(t);let O=0;let T=NaN;let C=function(e){if(e)T=NaN};let N=null;let j=null;let P={};let E=[];let F=[];let W=[];let B=function(){W.length=0;for(let e of p)for(let t of e.compute.storages){let e=a(t);if(e!==null&&!W.includes(e))W.push(e)}return W};let _=function(e){if(F.includes(e))return;for(let e=F.length-1;e>=0;e-=1)if(qd.get(F[e].buffer)!==F[e])F.splice(e,1);F.push(e)};let q=function(t){let r=null;for(let i of B()){if(!Vd.has(i))continue;let l=ld(e,i,n);_(l);if(!l.standing){if(a5(l.handle.resource))continue;l.standing=!0;r??=e.createCommandEncoder({label:`${n} step copies`});Id(i,l.handle.resource,r)}if(l.gone=!1,l.stepping.has(P))continue;l.stepping.set(P,t),E.push(l)}if(r===null)return;e.queue.submit([r.finish()]),Ud+=1};let L=function(){if(!E.some((e)=>!e.stepping.has(P)))return!1;for(let e=E.length-1;e>=0;e-=1)if(!E[e].stepping.has(P))E.splice(e,1);return!0};let D=function(){for(let e of E)e.stepping.delete(P);E.length=0};let H=function(a,b,c){return (H=$c0C(15)(B,_,P,f)).call(this,a,b,c)};let U=function(a){return (U=$c0C(16)(z,e,s,n)).call(this,a)};let K=function(r){let{compute:i}=r;if(r.handle===null){let l=c5d(e,i);r.handle=t.getComputePipeline(`material-compute|${i.workgroupSize}|${JSa(l)}|${i.wgsl}`,function(){let r=t.getBindGroupLayout(l,"lume material compute");return{label:`${n} compute`,layout:e.createPipelineLayout({label:`${n} compute`,bindGroupLayouts:[c,r]}),compute:{module:t.shaderModule(i.wgsl,`${n} compute`),entryPoint:i.entryPoint}}})}if(r.parked=fQ(r.handle),r.handle.failed)r.handle=null;else if(r.handle.pipeline===null)t.askAgain(r.handle);return r.handle?.pipeline??null};let Y=function(){if(I)return!0;let e=!1;for(let t of p)if(K(t)===null&&t.handle!==null)e=!0;return!e};let G=function(){if(t.generation!==R){R=t.generation;for(let e of p){{let e$9=e;{let e=e$9;e.handle=null,e.bindGroup=null,e.command=null
}}}}let e=!0;for(let t of p)if(K(t)===null)e=!1;return e};let X=function(a){return (X=$c0C(17)(e,s,o)).call(this,a)};let Z=function(){for(let t of p){for(let r of t.compute.storeTextures){let t=t2(r,e,s);if(t!==null){R2(t)}}}};let J=function(r){let l=i.uniformBuffer;let s=r.compute.textures.length+r.compute.storeTextures.length===0?vd:X(r);if(s===null)return null;let o=r.bindGroup!==null&&r.bound[0]===l&&r.boundAt===W5()&&r.copiesAt===Ud&&J6(r.boundViews,s);for(let e=0;o&&e<r.compute.storages.length;e+=1)o=r.bound[2+e]===Pd(a(r.compute.storages[e])??l);if(o&&r.bindGroup!==null)return r.bindGroup;r.bindGroup=null,r.boundAt=W5(),r.copiesAt=Ud;let u=r.dispatchBuffer.resource,f=r.bound;f.length=0,f.push(l,u);let c=[{binding:g3l,resource:{buffer:l,...i.uniformRange}},cv(PHn,u)];for(let e=0;e<r.compute.storages.length;e+=1){let t=a(r.compute.storages[e]);if(t===null)return f.length=0,null;let i=Pd(t);f.push(i),c.push(cv(JgA+e,i))}let h=JgA+r.compute.storages.length;s.forEach((e,t)=>c.push({binding:h+t,resource:e})),r.boundViews.length=0,r.boundViews.push(...s);let m=t.getBindGroupLayout(c5d(e,r.compute),"lume material compute");r.bindGroup=e.createBindGroup({label:`${n} compute group`,layout:m,entries:c});for(let e of A??=hd(p,d))e.bound=!0;return r.bindGroup};return{get dispatchCount(){return p.length},get invocations(){return m},ownStorages:z,get steppedAt(){return O},adopt(e,t){N=e,j=t},ask:()=>t.pictureScope(Y),promote(e){for(let r of p)if(r.handle!==null)t.promoteToDraw(r.handle,e)},get firstStepWait(){if(O>0||I)return null;let e=null;for(let t of p){if(t.parked)return"parked";if(e===null&&(t.handle===null||$Q(t.handle)===null))e=t.handle??"unasked"}return e},warm(){if(I||G())return Promise.resolve();let e=[];for(let r of p)if(r.handle!==null&&r.handle.pipeline===null)e.push(t.awaitBuild(r.handle));return Promise.allSettled(e).then(function(){return})},declare(t,r,i,n,l=1){if(I||i===b)return!1;if(O>0&&k===0&&x===0&&u?.()===T)return b=i,!0;if(g.length=0,!G())return!1;for(let e=0;e<p.length;e+=1){let t=p[e],i=K(t),n=i===null?null:J(t);if(i===null||n===null)return!1;let l=t.command;if(l?.pipeline!==i)l={pipeline:i,bindGroups:[r,n],dispatch:t.dispatch,debugLabel:t.label},t.command=l;l.bindGroups[0]=r,l.bindGroups[1]=n,y[e]=l}let s=Ud;if(N!==null){let e=N(),t=j;N=null;j=null;if(e!==null&&e!==this){U(e);}t?.()}A??=hd(p,d);if(A.length>0&&!jd(A,$,i))return b=i,!0;let o=Math.ceil(m/Math.max(1,Math.floor(l))),a=k===0&&x===0;if(a)S=R6(M)?n-M:0,M=n;w[0]=Math.min(sd,Math.max(0,S));while(o>0&&k<p.length){let t=p[k];let {count:r,workgroupSize:i}=t.compute;let n=ad(t.compute,x,o);if(AG4(n,t.dispatch,i),v[0]=x+n,v[1]=t.dispatch[0]*i,v[3]=x,e.queue.writeBuffer(t.dispatchBuffer.resource,0,v),g.push(y[k]),o-=n,x+=n,x>=r)k+=1,x=0}let c=k>=p.length;if(a&&c){V:{let e=i;if(rd===0)break V;{for(let t of B()){let r=qd.get(t);if(r===void 0||r.gone)continue;for(let[t,i]of r.stepping)if(i!==r.sharedAt&&(r.sharedAt!==e||i!==r.sharedBefore))r.stepping.delete(t);if(r.stepping.size===0){zd(r,!0)}}
}}}else if(a||L()&&!c){q(i);}if(Ud!==s)for(let e=0;e<p.length;e+=1)y[e].bindGroups[1]=J(p[e])??y[e].bindGroups[1];if(c){k=0;Z();}if(b=i,O=++Dd,g.length>0)t.addCompute(f,{dispatches:g,measured:GFv,paced:l>1?"frame":"read"});let h=u?.();if(h!==void 0)t.addSubmitCommitHook(()=>T=h,void 0,C);H(t,c,i);if(c){D();}return!0},declaredAt(e){return!I&&e===b},storageNamed(e){for(let t of p)for(let r of t.compute.arrays)if(r.name===e)return r;return null},bufferOf(t){return apw(Y28(t),e,s)},destroy(){if(I)return;I=!0;let e=k===0&&x===0;D();for(let t of F){if(qd.get(t.buffer)===t&&!t.gone&&t.stepping.size===0){zd(t,e);}}F.length=0;for(let e of p)e.dispatchBuffer.release();g.length=0,y.length=0}}}var Ng="budget.binding.refused";t0r("lume/binding-budget",[Ng]);function rQN(e,t){let{overrun:r,own:i,rest:n,fit:l}=t,s={message:`material "${e}": at most ${l} ${r.kind} fit this material on this device; it binds ${r.count} ${r.kind} ${Tj(r)} (${i} its own, ${n} the engine's) and this device grants ${r.limit} (${r.limitName})`,label:e,kind:r.kind,stage:r.stage,count:r.count,own:i,rest:n,fit:l,limit:r.limit,limitName:r.limitName};return new trX(blz(Ng,s,{decider:"lume/binding-budget",epoch:oFh,fault:"caller",retriable:!1}))}function UHo(e){return e?.code===Ng?e:null}var dw=new Map;function TIs(e,t){dw.set(e,t)}var Kka=(e)=>dw.get(e),YT={revision:0,late:null,gpuCostMs:0},yA7=YT;var mub=(function(e){YT.revision+=1,YT.late=e?.graceKind===null?e.missed&&e.gpuOverBudget:null,YT.gpuCostMs=e?.gpuCostMs??0});var rT=(()=>globalThis.__spawnEngineConsole??=Object.create(console))(),Ty=1000,Iy=new Map,Zy=null,iy=Object.freeze([]),ky={standing:iy,dropped:iy},Oy=!1,Hy={nowMs:NaN,dropped:null};function xy(e,t){let r=Hy.nowMs;if(e.renewed)e.renewed=!1,e.untilMs=r+Ty;if(e.untilMs<r)Iy.delete(t),Hy.dropped??=[],Hy.dropped.push(e)}function qy(){if(Iy.size===0)return iy;let e=[];return Iy.forEach(Vy,e),e}function Vy(e){this.push(e)}var Uy=(e,t,r)=>r===null?`${e}\x00\x00${t}`:`${e}\x00p${r}\x00${t}`;var HgB=(function(e){Zy=e});function $Md(a,b){return $c0C(18).apply(this,arguments)}function Xy(e){Hy.nowMs=e;Hy.dropped=null;Iy.forEach(xy);ky.dropped=Hy.dropped??iy;Hy.dropped=null;if(Oy||ky.dropped.length>0){Oy=!1;ky.standing=qy();}return ky}var i$T=(function(){let e=[...Iy.values()];return I6(Iy),Oy=!0,e});function zy(e,t,r,i,n=null){Zy?.(e,t,r,i,n)}var ay=new Map,sy=0;function my(e,t,r,i=null){if(typeof e!=="string"||typeof t!=="string"||t.length===0)return;sy+=1;ay.set(Uy(e,t,i),{entityId:e,part:i,name:t,values:r,serial:sy})}function i5Y(){return ay.size>0}function Yy(e,t){for(let[r,i]of ay)if(i.entityId===e&&(t===void 0||i.part===t))ay.delete(r)}var U5l=(function(){I6(ay)});var uy={copies:0,landings:0,nullAnswers:0};function ty(e){let t=e$F(e.elementType);if(t==="i32")return"i32";if(t==="u32")return"u32";return"f32"}class Ny{constructor(e,t){this.device=void 0;this.label=void 0;this.slots=[];this.declares=0;this.landedSerial=-1;this.grown=0;this.failed=0;this.disposed=!1;this.device=e,this.label=t}declare(a,b,c,d){return $c0C(19).apply(this,arguments)}get landings(){return this.landedSerial+1}get slotCount(){return this.slots.length}get stagingBytes(){let e=0;for(let t of this.slots)e+=t.bytes;return e}dispose(){this.disposed=!0;for(let e of this.slots)if(!e.inFlight)e.handle.release();this.slots.length=0}}var $y=[],Sy=(e,t)=>(e.intent.part??null)===t;function oxt(e,t,r){let i=function(r,i,n){let l=e.get(r),s=l?.owner===r?l:void 0,o=t.get(r)??$y,a=!1;for(let e=-1;e<o.length;e+=1){let t=e<0?s:o[e];if(t===void 0||!Sy(t,i))continue;if(n===null)return!0;a=!0;let r=t.rebuild.retained?.record??null;if(r!==null&&!n.includes(r))n.push(r)}return a};return{owe:r,draws:(e,t)=>i(e,t,null),recordsAt:(e,t,r)=>void i(e,t,r)}}var Qy=[];function Ay(e,t,r){return Qy.length=0,e.recordsAt(t,r,Qy),Qy}var ey=new Map,yy=(e)=>e.part===null?`${e.entityId}\x00\x00${e.name}`:`${e.entityId}\x00p${e.part}\x00${e.name}`,My=[];function cy(e,t){for(let r=0;r<My.length;r+=1)if(My[r].draws(e,t))return!0;return!1}function Ey(e){py(e);if(e.answeredNull)return;e.answeredNull=!0;uy.nullAnswers+=1;zy(e.entityId,e.name,"f32",null,e.part)}function nuG(e,t,r,i=null){my(e,t,r,i);for(let t=0;t<My.length;t+=1)if(My[t].draws(e,i))My[t].owe()}var dPm=(function(e){if(!My.includes(e))My.push(e)});function eED(e){pK(My,e),VYZ(null)}function VYZ(e){for(let t of (Iy.values())){{let t$9=t;{let t=t$9;if((e??t.entityId)===t.entityId&&!cy(t.entityId,t.part))Ey(t);
}}}for(let t of[...(ay.values())]){{let t$10=t;{let t=t$10;if((e??t.entityId)===t.entityId&&!cy(t.entityId,t.part)){Yy(t.entityId,t.part)}
}}}}function yVV(a){return $c0C(20).apply(this,arguments)}var By=[];var ZlW=(function(){return (Iy.size)>0});function wy(e,t){for(let r=0;r<e.length;r+=1){let i=e[r].compute,n=i?.storageNamed(t)??null;if(i!==null&&i!==void 0&&n!==null)return{compute:i,ref:n}}return null}function sYx(a,b,c,d,e){return $c0C(21).call(this,a,b,c,d,e)}function GFF(e,t){if(!i5Y())return 0;let r=0;{r=ka(t,e,r)}return r}function Py(a,b,c,d){return (Py=$c0C(22)).call(this,a,b,c,d)}function dy(a,b,c,d){return (dy=$c0C(23)).call(this,a,b,c,d)}var Wy=new WeakMap;function Dy(e,t){let r=T6(Wy,e);if(r.get(t.name)===t.serial)return!1;return r.set(t.name,t.serial),!0}function py(e){let t=yy(e);let r=ey.get(t);if(r===void 0)return;r.dispose(),ey.delete(t)}var uzb=(function(){for(let e of ey.values())e.dispose();I6(ey)});function SnZ(){let e=0,t=0,r=0,i=0;for(let n of ey.values())e+=n.slotCount,t+=n.stagingBytes,r+=n.grown,i+=n.failed;return{arms:(Iy.size),readbacks:ey.size,slots:e,stagingBytes:t,copies:uy.copies,landings:uy.landings,nullAnswers:uy.nullAnswers,grown:r,failed:i}}var dU=4000,kU=60,rU=new WeakMap;function buF(e,t,r,i,n){let l=rU.get(e);if(t===null){if(l)l.id=null;return}if(l===void 0){l=ma(e,l)}if(l.id!==t){l.id=t,l.sinceMs=r,l.frames=1;return}if(++l.frames<kU||r-l.sinceMs<dU||l.told.has(t))return;oa(l,t,n,r,i);}var dIJ=(e)=>e===null||e==="absent"||e==="unadmitted"||e==="culled",sU=new Map,CU=new Map;function SU(e,t){e.set(t,(e.get(t)??0)+1)}function pU(e){if(e.size===0)return;let t=Object.fromEntries(e);return I6(e),t}var rGH=()=>pU(sU);class yvj{constructor(){this.drew=new WeakSet;this.open=new Map;this.told=new Set;}drawn(e){this.drew.add(e);let t=this.open.get(e);if(t!==void 0)t.back=!0}vanishes(e){return this.drew.delete(e)&&!this.open.has(e)}opens(e,t,r,i,n,l,s){let o=n.slice(0,qU);this.open.set(e,{word:o,sinceMs:l,frames:0,back:!1,counted:!1,visual:t,into:r?sU:CU});let a=r?`${i} ${o}`:o;if(this.told.has(a))return;this.told.add(a),rT.warn(`[models] the ${r?"local body":"body"} ${i} drew last frame and draws nothing this frame while it stands in view, held back by: ${o}: ${s()}`)}settle(e,t){for(let[r,i]of this.open){{da=pa.call(this,i,t,r,e);if(da===ea)continue;}}}}var qU=17,HU=500,nU=1000;function zO6(e,t,r,i){if(e.ownWord===void 0)e.ownWord=dIJ(r)?null:r;if(e.ownWord===r||i-e.ownWordAtMs<nU)return;rT.info(`[models] own row ${t}: ${r??"drawn"} (was ${e.ownWord??"drawn"})`),e.ownWord=r,e.ownWordAtMs=i}function IU(e,t){if(e<=1)return"1f";if(t<100)return"<100ms";if(t<HU)return"<500ms";return"500ms+"}var oCY=()=>pU(CU);function WZk(e,t,r){if(!(t>0)||!h6(t))return e;let{near:i,far:n}=NGo(e);if(!(n>t)||!(t>i))return e;let l=r??new Float32Array(16);return l.set(e),l[10]=(e[15]-e[11]*i)/(t-i),l[14]=l[10]*t,l}function Y0(e,t){let r=e.view;return-(r[2]*t[0]+r[6]*t[1]+r[10]*t[2]+r[14])}function $0(e){return MK(e.view[2],e.view[6],e.view[10])}function F0(e,t){let r=Y0(e,t.anchor);for(let i=0;i<t.opening.length;i+=1)r=Math.max(r,Y0(e,t.opening[i]));return r}var c0=(e,t,r)=>Math.min(e.far,Math.max(e.near+0.0001,t+r*$0(e)));function ZGj(e,t,r){return c0(e,F0(e,t),r)}function A0Q(a,b){return $c0C(24).call(this,a,b)}function iLu(e){return{center:e.anchor,halfExtent:[e.depthM,e.depthM,e.depthM],start:e.fogStartM/e.depthM}}function b55(a,b){return $c0C(25).call(this,a,b)}function $fZ(e,t){return Math.max(0,(e.far-Y0(e,t))/$0(e))}var NQf=()=>({worldId:"",placeId:null,position:[0,0,0],anchor:[0,0,0],forward:[0,0,0],planes:[],screenShare:1,eye:{heightPx:0,fovRad:0,farM:0,fogM:0,recordRadiusM:0}}),U0=new Float32Array(16),q0=new Float32Array(16),A0=[0,0,0],D0=[{ndcX:-1,ndcY:-1},{ndcX:-1,ndcY:1},{ndcX:1,ndcY:-1},{ndcX:1,ndcY:1}],G0=new Float64Array(3),Z0=new Float64Array(3);function m0(e,t,r,i,n,l,s){let o=e.depthM;for(let t=0;t<3;t+=1)l[t]=e.anchor[t]-e.depthM,s[t]=e.anchor[t]+e.depthM;let a=r?2:1;for(let r=0;r<a;r+=1)for(let i=0;i<D0.length;i+=1){let n=yWH(t,D0[i],r,A0);o=Math.max(o,G6(n[0]-e.anchor[0],n[2]-e.anchor[2]));for(let e=0;e<3;e+=1)l[e]=Math.min(l[e],n[e]),s[e]=Math.max(s[e],n[e])}if(n>0)for(let e=0;e<3;e+=1)l[e]-=n,s[e]+=n;if(i)for(let e=0;e<3;e+=1){let t=Math.max(i.halfExtent[e],i.center[e]-l[e],s[e]-i.center[e]);l[e]=Math.min(l[e],i.center[e]-t),s[e]=Math.max(s[e],i.center[e]+t)}for(let t=0;t<2;t+=1)for(let r=0;r<2;r+=1)o=Math.max(o,G6((t===0?l[0]:s[0])-e.anchor[0],(r===0?l[2]:s[2])-e.anchor[2]));return o}function GGz(a,b,c){return $c0C(26).apply(this,arguments)}function DKL(a){return $c0C(27).call(this,a)}function JjE(e,t){let r=pSj(_S$(t.projection,t.view));for(let t of[0,1])for(let i of D0){let n=yWH(r,i,t,A0);for(let t=0;t<e.planes.length;t+=4)if(e.planes[t]*n[0]+e.planes[t+1]*n[1]+e.planes[t+2]*n[2]+e.planes[t+3]<0)return!1}return!0}var ms=!1,Cs=!1,ks=new Set,xzy=()=>ms&&Cs&&O83();function lTD(e){if(ms===e)return;ms=e;Ts:{if(!xzy())break Ts;for(let e of[...ks])e()}}var srK=(function(){if(Cs)return;Cs=!0;Ts$:{if(!xzy())break Ts$;for(let e of[...ks])e()}});function u9f(e){return UK(ks,e)}var pb=400,$b=0.05;function u9m(e,t,r,i){if(e)return t;return r<i?Math.max(t,r):null}function Xk9(e,t,r){if(t===null)return 0;if(!(t>0))return Math.max(e,0);if(!(e>0))return t;let i=e+(t-e)*(1-Math.exp(-Math.max(r,0)/pb));return Math.abs(t-i)<$b?t:i}function D2Z(e,t,r){let i=Math.min(1,Math.max(0,r?.[6]??0)),n=W6(t)&&t>0?t:0;return Math.max(e,e*Math.sqrt(1-i*i)+n*i)}var Rb=new Float32Array(16);function CeN(e,t){let r=e.camera.projection;if(e.viewFog||e.cullProjection||Weq(r)>0)return;let i=WZk(r,t,Rb);if(i!==r)e.cullProjection=i}var NB="ahead",Y9V=()=>NB;var Faf=(function(e){NB=e});var aG3=1.05,sC=aG3*aG3;function cc6(e,t){if(e===void 0)return!1;for(let r=0;r<e.length;r+=1)if(!Dl_(e[r],t))return!0;return!1}function T_2(e,t){return t.x=e.x,t.y=e.y,t.z=e.z,t.radius=e.radius,t}class m$U{constructor(){this.x=0.5;this.y=0.5;this.z=0.5;this.radius=0.5;}}class IC{constructor(){this.x=0.5;this.y=0.5;this.z=0.5;this.radius=0.5;this.maxDistanceSq=0.5;this.bypassFrustum=!1;this.lens=null;this.wasCulled=!1;}}var eKZ=(function(e=!1){let t=new IC;return t.x=0,t.y=0,t.z=0,t.radius=0,t.maxDistanceSq=1/0,t.bypassFrustum=e,t});var bZ8=(function(){let e=new m$U;return e.x=0,e.y=0,e.z=0,e.radius=0,e});function lTS(e,t,r,i,n,l){return rC[0]=t,rC[1]=r,rC[2]=i,rC[3]=n,mDm(e,rC,l)}var rC=new Float64Array(4);function mDm(e,t,r){let i=t[0],n=t[1],l=t[2],s=t[3];r.x=e[0]*i+e[4]*n+e[8]*l+e[12],r.y=e[1]*i+e[5]*n+e[9]*l+e[13],r.z=e[2]*i+e[6]*n+e[10]*l+e[14];let o=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],a=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],u=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return r.radius=s*Math.sqrt(Math.max(o,a,u)),r}var AC=new Float32Array(16);var lYm=(function(e,t){let r=_S$(e.projection,e.view,AC),i=-e.view[2],n=-e.view[10];if(t)return JLE(r,t.planes),t.camX=e.position[0],t.camY=e.position[1],t.camZ=e.position[2],t.forwardX=i,t.forwardZ=n,t.lensScale=e.projection[5],t.orthographicWeight=Weq(e.projection),t;return qa(r,e,i,n);});function i1I(e,t){let r=t.wasCulled?t.maxDistanceSq:t.maxDistanceSq*sC,i=t.x,n=t.y,l=t.z,s=i-e.camX,o=n-e.camY,a=l-e.camZ;if(!(s*s+o*o+a*a>r))return!1;{if((da=ra(e,i,n,l,r))!==ca)return da}return!0}function GeR(e,t,r=!0){if(!t)return!1;if(E6(e.maxDistanceSq)&&i1I(t,e))return!0;if(e.bypassFrustum)return!1;if(GV$(t,e.lens,e))return!0;return r&&e.lens===null&&PKU(t,e)}function PKU(e,t){let r=e.occlusion;if(r===void 0||r===null||sa(e))return!1;return r.hides(t.x,t.y,t.z,t.radius)}var pC=new Float32Array(16),YC=new Float32Array(16),VC=new Float32Array(24);function GV$(e,t,r){if(t===null)return Dl_(e.planes,r)&&!cc6(e.secondViews,r);let i=e.lensEye;if(i===void 0||ta(e))return!1;return ua(i,t,r);}function vvB(e,t){if(t.viewmodelFrameBindGroupFor===void 0){e.lensEye=void 0;return}va(e,t);}function uyx(e,t,r){let i=(e*t/CKU-r)/(1-r);return i>0?i:0}function sFk(e,t,r){return e>(r?t:t*sC)}function k8y(e,t,r){return r?e-t:t*aG3-e}function h4K(e,t,r,i,n=new Float32Array(16)){let l=t[0],s=t[1],o=t[2],a=t[3];if(!(o>0)||!(a>0)||!(r>0)||!(i>0))return n.set(e),n;let u=l/r*2-1,d=(l+o)/r*2-1,f=1-(s+a)/i*2,c=1-s/i*2,h=2/(d-u),p=-(d+u)/(d-u),m=2/(c-f),g=-(c+f)/(c-f);for(let t=0;t<4;t+=1){let r=e[t*4],i=e[t*4+1],l=e[t*4+3];n[t*4]=h*r+p*l,n[t*4+1]=m*i+g*l,n[t*4+2]=e[t*4+2],n[t*4+3]=l}return n}function WXl(e,t,r){if(t===void 0)return e;wa(r,t,e);return r}var MC=0.001,wC=new Float64Array(4);function $C(a,b,c,d,e){return ($C=$c0C(28)).call(this,a,b,c,d,e)}function s6t(e,t,r,i,n=0,l=[0,0,0,0]){let s=Math.floor(t.length/3),o=wC;o[0]=o[1]=1/0,o[2]=o[3]=-1/0;let a=0,u=function(e,t,n){let l=(e/n*0.5+0.5)*r,s=(0.5-t/n*0.5)*i;if(l<o[0])o[0]=l;if(l>o[2])o[2]=l;if(s<o[1])o[1]=s;if(s>o[3])o[3]=s};for(let r=0;r<s;r+=1){let i=t[r*3],n=t[r*3+1],l=t[r*3+2],o=e[3]*i+e[7]*n+e[11]*l+e[15],d=e[0]*i+e[4]*n+e[8]*l+e[12],f=e[1]*i+e[5]*n+e[9]*l+e[13];if(o>MC)a+=1,u(d,f,o);for(let i=r+1;i<s;i+=1){let r=t[i*3],n=t[i*3+1],l=t[i*3+2],s=e[3]*r+e[7]*n+e[11]*l+e[15];if(o>MC===s>MC)continue;let a=(MC-o)/(s-o),c=e[0]*r+e[4]*n+e[8]*l+e[12],h=e[1]*r+e[5]*n+e[9]*l+e[13];u(d+(c-d)*a,f+(h-f)*a,MC)}}if(a===0)return null;return $C(o,r,i,n,l)}var ZC=new Float64Array(6),nC=new Float64Array(24);function TMK(e,t,r){let i=ZC;for(let r=0;r<3;r++)i[r]=t.min[r],i[3+r]=t.max[r],e[r]=1/0,e[3+r]=-1/0;for(let t=0;t<8;t++)for(let n=0;n<3;n++){let l=r[n]*i[(t&1)*3]+r[n+4]*i[(t>>1&1)*3+1]+r[n+8]*i[(t>>2&1)*3+2]+r[n+12];if(l<e[n]||l!==l)e[n]=l;if(l>e[3+n]||l!==l)e[3+n]=l}}function UpA(e,t,r,i,n){let{x:l,y:s,z:o,radius:a}=t;for(let e=0;e<8;e+=1)nC[e*3]=e&1?l+a:l-a,nC[e*3+1]=e&2?s+a:s-a,nC[e*3+2]=e&4?o+a:o-a;return TUB(e,nC,r,i,0,n)}function TUB(e,t,r,i,n=0,l=[0,0,0,0]){let s=Math.floor(t.length/3),o=wC;o[0]=o[1]=1/0,o[2]=o[3]=-1/0;for(let n=0;n<s;n+=1){let l=t[n*3],s=t[n*3+1],a=t[n*3+2],u=e[3]*l+e[7]*s+e[11]*a+e[15];if(u<=MC)return null;let d=(e[0]*l+e[4]*s+e[8]*a+e[12])/u,f=(e[1]*l+e[5]*s+e[9]*a+e[13])/u,c=(d*0.5+0.5)*r,h=(0.5-f*0.5)*i;if(c<o[0])o[0]=c;if(c>o[2])o[2]=c;if(h<o[1])o[1]=h;if(h>o[3])o[3]=h}if(s===0)return null;return $C(o,r,i,n,l)}var or=(()=>globalThis.__spawnEngineConsole??=Object.create(console))(),RIa=1080,Er=8,Pr=1,sr=0.5,Jr=0.2,dr=Math.cbrt(Jr),Yr=45,Or=0.18,_r=0.25,Rr=0.9,Ur=Aiy,ZfF=()=>Ur;function HvB(e,t,r){if(!r){e.fill(0,t,t+4);return}xa(r,e,t);}var Kuk=`${fgk}
fn ink_shade(surface: vec3<f32>, warm: f32, lightness: f32) -> vec3<f32> {
  if (warm <= 0.0) {
    return surface * (lightness * lightness * lightness);
  }
  let q = pow(max(vec3<f32>(dot(surface, vec3<f32>(0.4122214708, 0.5363325363, 0.0514459929)), dot(surface, vec3<f32>(0.2119034982, 0.6806995451, 0.1073969566)), dot(surface, vec3<f32>(0.0883024619, 0.2817188376, 0.6299787005))), vec3<f32>(0.0)), vec3<f32>(1.0 / 3.0));
  let lab = vec3<f32>(dot(q, vec3<f32>(0.2104542553, 0.793617785, -0.0040720468)), dot(q, vec3<f32>(1.9779984951, -2.428592205, 0.4505937099)), dot(q, vec3<f32>(0.0259040371, 0.7827717662, -0.808675766))) * lightness;
  let warmAb = vec2<f32>(${cK(Math.cos(Yr*ts0/180))}, ${cK(Math.sin(Yr*ts0/180))}) * (${cK(Or)} * lab.x);
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
    color = ink_shade(surface, ink.g, ink.b) * (sun * ${_r} + passLights.ambientMean) * ${lu};
  }
  return shade_applyFog(color, viewZ, toward);
}`,chx="r32uint",ksJ=16,fSP=10,jzN=(1<<fSP)-1,IvU=16,Eob=`fn ink_field(clipW: f32, width: f32) -> f32 {
  let near = select(min(1.0, ${cK(Er)} / max(clipW, 1e-3)), 1.0, frame.proj[3][3] > 0.5);
  let px = width * near * frame.canvasSize.y / ${cK(RIa)};
  return select(max(px * frame.viewportSize.y / max(frame.canvasSize.y, 1.0), ${cK(Pr)}), smoothstep(${cK(sr)}, ${cK(Pr)}, px), px < ${cK(Pr)});
}

fn ink_objectId(t: vec3<f32>) -> u32 {
  var h = bitcast<u32>(t.x) * 0x9e3779b1u;
  h = (h ^ bitcast<u32>(t.y)) * 0x85ebca77u;
  h = (h ^ bitcast<u32>(t.z)) * 0xc2b2ae3du;
  h = h ^ (h >> 16u);
  return max(h >> ${fSP}u, 1u);
}

fn ink_word(objectId: u32, reach: f32) -> u32 {
  return (objectId << ${fSP}u) | u32(clamp(round(reach * ${cK(ksJ)}), 0.0, ${cK(jzN)}));
}

struct InkFieldOut {
  @location(0) color: vec4<f32>,
  @location(1) word: u32,
}`,$r=8,Fr=0.015625;function ARi(e,t=!1){return{format:Y6,depthWriteEnabled:!1,depthCompare:U6,depthBias:t?0:Math.min(jkt,(e.depthBias??0)+$r),depthBiasSlopeScale:t?0:(e.depthBiasSlopeScale??0)+Fr,depthBiasClamp:0}}var zu=(e)=>Math.round(Math.min(1,Math.max(0,e))*63);function GpZ(e){let t=Math.trunc(e)&16777215;return zu((t>>16&255)/255)<<12|zu((t>>8&255)/255)<<6|zu((t&255)/255)}function Uu(e,t=1){let r=zu(Number.isFinite(t)?t:1);return r===0?0:GpZ(e)*64+r+1}var JQ$=`fn outlineCodeOf(word: f32) -> u32 {
  return u32(round(word)) - 1u;
}
fn outlineOpacityOf(code: u32) -> f32 {
  return f32(code & 63u) / 63.0;
}
fn outlineLinearOf(code: u32) -> vec3f {
  let srgb = vec3f(f32((code >> 18u) & 63u), f32((code >> 12u) & 63u), f32((code >> 6u) & 63u)) / 63.0;
  return select(pow((srgb + vec3f(0.055)) / 1.055, vec3f(2.4)), srgb / 12.92, srgb <= vec3f(0.04045));
}`,kI=new hv("post-outlines");function oI(){return $c0C(29).call(this)}function jI(e,t){return typeof e==="number"?e:t}function wI(e){return e==="over"||e==="line"?e:"add"}function wXP(e){if(!_6(e))return null;let t=jI(e.color,16777215);return{target:typeof e.target==="string"?e.target:void 0,color:t,hiddenColor:jI(e.hiddenColor,t),opacity:jI(e.opacity,1),strength:jI(e.strength,3),thickness:jI(e.thickness,4),width:z6(e.width,0),glow:jI(e.glow,0),pulsePeriod:jI(e.pulsePeriod,0),inflate:jI(e.inflate,1),viewId:jI(e.viewId,-1),priority:jI(e.priority,0),blend:wI(e.blend),spriteColor:jI(e.spriteColor,t),fill:jI(e.fill,0),hiddenCover:jI(e.hiddenCover,0)}}function zI(e){return`${e.opacity.toFixed(3)}:${e.color.toString(16)}:${e.hiddenColor.toString(16)}:${e.strength}:${e.thickness}:${e.glow}:${e.pulsePeriod}:${e.blend}${e.width>0?`:w${e.width}`:""}${e.fill?`:f${e.fill}`:""}${e.hiddenCover>0?`:c${e.hiddenCover}`:""}`}function HOK(e,t,r){e.store(kI,oI).byEntityId.set(t,{config:r,styleKey:zI(r)})}function jXNz(e,t){return e.peekStore(kI)?.byEntityId.has(t)===!0}function Msp(e,t){e.peekStore(kI)?.byEntityId.delete(t)}var SI={hasSprite:()=>!1,setOutline:function(){return}};function eI(a,b,c,d,e){return (eI=$c0C(30)).call(this,a,b,c,d,e)}function mI(e,t){for(let r=1;r<t;r++){let t=e[r],i=r-1;while(i>=0&&XI(e[i],t)>0)e[i+1]=e[i],i--;e[i+1]=t}}function scE(e,t=null,r=SI,i=CI){let n=e.peekStore(kI);if(!n)return;let l=RK(n.nextGroupsByKey),s=RK(n.nextSpriteOutlines),o=RK(n.spritePriorities);n.spritePriorities=o,n.spriteStrokeCount=0;let{metGroups:a,meshGroups:u,bandGroups:d}=n,f=0;for(let[e,i]of n.byEntityId){let{config:s}=i,o=s.target??e,u=i.styleKey,d=l.get(u);if(!d)d=n.groupsByKey.get(u)??{key:u,entities:[],priority:s.priority,style:{visibleColor:s.color,hiddenColor:s.hiddenColor,opacity:s.opacity,edgeStrength:s.strength,edgeThickness:s.thickness,edgeGlow:s.glow,pulsePeriod:s.pulsePeriod,blend:s.blend,...s.width>0?{edgeWidth:s.width}:{},fill:s.fill,hiddenCover:s.hiddenCover},meshPriority:void 0,bandPriority:void 0,slotted:!1},d.entities.length=0,d.priority=s.priority,d.meshPriority=void 0,d.bandPriority=void 0,d.slotted=!1,l.set(u,d),a[f++]=d;d.entities.push(o);if(r.hasSprite(t,o)&&!(s.blend==="add"&&(s.color&16777215)===0)){eI(n,d,o,Uu(s.spriteColor,s.opacity),s.priority);d.bandPriority=Math.max(d.bandPriority??s.priority,s.priority);}else d.meshPriority=Math.max(d.meshPriority??s.priority,s.priority)}let c=0,h=0;for(let e=0;e<f;e++){let t=a[e];if(t.priority=t.meshPriority??t.bandPriority??t.priority,t.meshPriority===void 0)d[h++]=t;else u[c++]=t}let p=Math.max(0,Math.floor(i));mI(u,c);mI(d,h);let m=Math.min(c,p),g=Math.min(h,p-m);for(let e=c-m;e<c;e++)u[e].slotted=!0;for(let e=h-g;e<h;e++)d[e].slotted=!0;let y=n.groups,v=0;for(let e=0;e<c;e++)y[v++]=u[e];for(let e=h-g;e<h;e++)y[v++]=d[e];if(y.length!==v)y.length=v;for(let e=0;e<n.spriteStrokeCount;e++){let t=n.spriteStrokes[e];if(t.group.slotted)continue;let r=o.get(t.targetId);if(r===void 0||t.priority>=r)s.set(t.targetId,t.word),o.set(t.targetId,t.priority)}for(let[e]of n.spriteOutlines)if(!s.has(e))r.setOutline(t,e,0);for(let[e,i]of s)r.setOutline(t,e,i);let w=n.spriteOutlines;n.spriteOutlines=s,n.nextSpriteOutlines=w;let b=n.groupsByKey;n.groupsByKey=l,n.nextGroupsByKey=b}var RCa=(function(e){let t=e.peekStore(kI);return t!==null&&(ya(t))});var HI=[];var JDa=(function(e){return e.peekStore(kI)?.groups??HI});var qI=3;function Z0b(e){return e.filter((e)=>e.priority<qI&&e.entities.length>0)}var wKM=8,gI=3,MI=1.5,hI=1;function pl9(e,t){return t>hI?e*hI/t:e}var OEc=(function(e){return Z_$(e)?2:wKM});var wrt=(function(e,t){return Math.min(OEc(e),HWw(t))});function TDD(e,t){let r=e??wKM,i=v6(r)?Math.min(wKM,Math.max(0,Math.floor(r))):wKM;return t===void 0?i:Math.min(i,HWw(t))}var CI=wKM;function N0l(e){CI=v6(e)?Math.max(0,Math.floor(e)):wKM}var Ne4=(function(e,t){return e<=0?0:Math.max(e,t)});function XI(e,t){if(e.priority!==t.priority)return e.priority-t.priority;if(e.key<t.key)return-1;if(e.key>t.key)return 1;return 0}function bmt(a,b){return $c0C(31).apply(this,arguments)}var VI=2.8,xI=2;function UI(e,t,r,i=!1){let n=bI(e,t,r,i);return n>=VI?{thickness:(n-VI)/xI,reach:0}:{thickness:0,reach:n}}function RI(e,t,r,i,n){if(e.edgeGlow>0.001){return dI(t,e.edgeThickness,r,i,n);}return UI(t,r,i,n)}function bI(e,t,r,i){let n=!i&&t>0?Math.min(1,Er/t):1;return e*n*r/RIa}var aI=16;function dI(e,t,r,i,n=!1){let l=bI(e,r,i,n);let s=l/aI;return{thickness:t*s,reach:l<VI?l:0,glowRadius:pZo*s}}function AsH(e,t){let r=e.filter((e)=>e.entities.length>0).sort(XI),i=Math.max(0,t);return i<r.length?r.slice(r.length-i):r}var BI=6,II=8,cI=new Set,$I=(e,t,r,i)=>($I=$c0C(32))(e,t,r,i);function VcF(e,t,r){if(e.length<=t.length)return;let n,l,s;{if((da=Aa(t,e,r))!==ca)return da;n=za[0];l=za[1];s=za[2]}if(cI.has(s)||cI.size>=II)return;Ba(s,l,n,t,r);}var vI=1.001,PI=4,pZo=4,yI=8,lab=8,lI=[1.6666666666666667,0.75],AI=0.6666666666666666;function Vmd(e){return e<=1?1:2}function E$G(a,b){return $c0C(33).apply(this,arguments)}var GI=Math.SQRT2+1;function SoG(e){return e.level>0||e.radii.length>1||(e.jumps?.length??0)>0}function uI(e){let t=2;while(2*t-1<e+1)t*=2;let r=[];for(let e=t;e>=1;e/=2)r.push(e);return r}var Pjc="rg8unorm",fqL="rg16float",FI=16384,rI=0.6,_I=0.25,WI=6,QI=0.25,pZC=Y6,sI=`
${Vp4}

fn outlineMaskHidden(fragmentViewZ: f32, sceneViewZ: f32) -> bool {
  return fragmentViewZ <= sceneViewZ * ${vI};
}

fn outlineMaskColor(hidden: bool, wall: bool, depth: f32) -> vec4<f32> {
  return vec4<f32>(select(0.0, select(0.375, 0.625, wall), hidden), depth * ${FI}.0, 0.0, 1.0);
}
`;var uj={clamp:"clamp-to-edge",repeat:"repeat",mirror:"mirror-repeat"},Aj=new Uint8Array([255,255,255,255]);class Yj{constructor(e){this.device=void 0;this.compositeSampler=void 0;this.lookSamplers=void 0;this.lookNearestSampler=void 0;this.outlineSampler=void 0;this.presentSampler=void 0;this.compositeEmptyInput=void 0;this.outlineEmpty=void 0;this.lookPlaceholder=void 0;this.lookVelocityPlaceholder=void 0;this.lookCoverPlaceholder=void 0;this.lookDataPlaceholder=void 0;this.lookApertureDepthPlaceholder=void 0;this.lookCubePlaceholder=void 0;this.lookSurfaceStandIn=void 0;this.lookLiquidStandIn=void 0;this.lookGroundStandIn=void 0;this.lightNoFarLight=void 0;this.lightNoFarSun=void 0;this.device=e;let t=(t)=>e.createSampler({label:t,magFilter:"linear",minFilter:"linear",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge"});this.compositeSampler=t("lume composite sampler");let r=function(t){let r=uj[t];return e.createSampler({label:`lume look sampler (${t})`,magFilter:"linear",minFilter:"linear",addressModeU:r,addressModeV:r,addressModeW:r})};this.lookSamplers={clamp:r("clamp"),repeat:r("repeat"),mirror:r("mirror")};this.lookNearestSampler=e.createSampler({label:"lume look nearest",magFilter:"nearest",minFilter:"nearest",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge"});this.outlineSampler=t("lume outline sampler");this.presentSampler=t("lume present sampler");this.compositeEmptyInput=Vbf(e);this.outlineEmpty=nj(e,"lume outline empty",Pjc);this.lookPlaceholder=H5(e,"lume look placeholder","rgba8unorm",Aj);this.lookVelocityPlaceholder=nj(e,"lume look zero velocity",j9);this.lookCoverPlaceholder=nj(e,"lume look cover stand-in",pp);this.lookDataPlaceholder=nj(e,"lume look data stand-in",A8);this.lookApertureDepthPlaceholder=nj(e,"lume look no aperture","r32float");let i=(e)=>e.createView({label:"lume look cube stand-in",dimension:"cube"});let n=U5(e,Hn(e,{label:"lume look cube stand-in",size:{width:1,height:1,depthOrArrayLayers:6},format:"rgba8unorm",usage:4},"cube"),(e)=>{this.lookCubePlaceholder.view=i(e)});this.lookCubePlaceholder={handle:n,view:i(n.resource)};let l=U5(e,Nj("lume look no surface words",ei),(e)=>{this.lookSurfaceStandIn.words=e.createView()}),s=U5(e,Nj("lume look no surface emissive",Wi),(e)=>{this.lookSurfaceStandIn.emissive=e.createView()}),o=U5(e,Nj("lume look no surface depth","r32float"),(e)=>{this.lookSurfaceStandIn.depth=e.createView()});this.lookSurfaceStandIn={words:l.view(),emissive:s.view(),depth:o.view()};let a=U5(e,Nj("lume look no liquid depth","r32float"),(e)=>{this.lookLiquidStandIn.depth=e.createView()}),u=U5(e,Nj("lume look no liquid normal","rgba16float"),(e)=>{this.lookLiquidStandIn.normal=e.createView()});this.lookLiquidStandIn={depth:a.view(),normal:u.view()};let d=z5(e,{label:"lume look no ground words",size:lG(),usage:AG()},(e)=>{this.lookGroundStandIn.uniform=e}),f=z5(e,{label:"lume look no ground directory",size:16,usage:128},(e)=>{this.lookGroundStandIn.directory=e});this.lookGroundStandIn={uniform:d.resource,directory:f.resource};this.lightNoFarLight=z5(e,{label:"lume light pass no far light",size:16,usage:128},N5);this.lightNoFarSun=rj(e)}}function rj(e){let t=(e)=>e.createView({dimension:"2d-array"});let r={words:z5(e,{label:"lume far sun no words",size:jub*4,usage:64},(e)=>r.words=e).resource,field:t(U5(e,{label:"lume far sun no field",size:{width:1,height:1},format:YZe,usage:4},(e)=>r.field=t(e)).resource)};return r}function Nj(e,t){return{label:e,size:{width:1,height:1},format:t,usage:4}}function nj(e,t,r){return U5(e,Nj(t,r),N5)}var ej=new WeakMap;function l8K(e){return ej.get(e)??Gj(e)}function Gj(e){let t=Vm(()=>new Yj(e));return ej.set(e,t),t}var s_=`struct OutlineMaskView {
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
};`;var A_=(function(e){return`${s_}
@group(${e}) @binding(0) var<uniform> maskView: OutlineMaskView;
@group(${e}) @binding(1) var sceneDepthTex: texture_2d<f32>;`});var L9b=A_(0);function a_(e,t,r){return`
fn ${e}_lensDepth(raw: f32) -> f32 {
  return max(raw - ${t}.depthFloor, 0.0) / (1.0 - ${t}.depthFloor);
}
fn ${e}_sceneDepth(pixel: vec2<f32>) -> f32 {
  let dims = vec2<f32>(textureDimensions(${r}));
  let texel = vec2<i32>(clamp(pixel / ${t}.maskSize * dims, vec2<f32>(0.0), dims - vec2<f32>(1.0)));
  return textureLoad(${r}, texel, 0).x;
}
fn ${e}_sceneViewZ(pixel: vec2<f32>) -> f32 {
  return lume_view_z_of_depth(${e}_lensDepth(${e}_sceneDepth(pixel)), ${t}.near, ${t}.far, ${t}.isOrtho, ${t}.depthScale);
}
fn ${e}_wordNearer(scene: f32, fragmentDepth: f32) -> bool {
  return bitcast<u32>(scene) > bitcast<u32>(fragmentDepth) + ${PI}u;
}
fn ${e}_sceneDepthFarthest(pixel: vec2<f32>) -> f32 {
  let dims = vec2<f32>(textureDimensions(${r}));
  let at = clamp(pixel / ${t}.maskSize * dims, vec2<f32>(0.5), dims - vec2<f32>(0.5)) - vec2<f32>(0.5);
  let base = vec2<i32>(floor(at));
  let reach = vec2<i32>(select(vec2<f32>(0.0), vec2<f32>(1.0), fract(at) > vec2<f32>(1e-3)));
  let top = vec2<i32>(dims) - vec2<i32>(1);
  let a = textureLoad(${r}, base, 0).x;
  let b = textureLoad(${r}, min(base + vec2<i32>(reach.x, 0), top), 0).x;
  let c = textureLoad(${r}, min(base + vec2<i32>(0, reach.y), top), 0).x;
  let d = textureLoad(${r}, min(base + reach, top), 0).x;
  return min(min(a, b), min(c, d));
}
fn ${e}(pixel: vec2<f32>, fragmentViewZ: f32, fragmentDepth: f32) -> vec4<f32> {
  let sceneDepth = ${e}_sceneDepthFarthest(pixel);
  var hidden: bool;
  var outer = 0u;
  var inner = 0u;
  if (${t}.depthScale > 1.0 && fragmentDepth > ${fK(aG)}) {
    hidden = ${e}_wordNearer(sceneDepth, fragmentDepth);
    if (hidden) {
      let radius = clamp(${rI} * ${t}.focal, 2.0, ${t}.maskSize.y * ${QI});
      for (var tap = 0u; tap < 8u; tap += 1u) {
        let angle = f32(tap) * 0.7853982;
        let direction = vec2<f32>(cos(angle), sin(angle));
        outer += select(0u, 1u, ${e}_wordNearer(${e}_sceneDepth(pixel + direction * radius), fragmentDepth));
        inner += select(0u, 1u, ${e}_wordNearer(${e}_sceneDepth(pixel + direction * radius * ${_I/rI}), fragmentDepth));
      }
    }
  } else {
    let sceneViewZ = lume_view_z_of_depth(${e}_lensDepth(sceneDepth), ${t}.near, ${t}.far, ${t}.isOrtho, ${t}.depthScale);
    hidden = outlineMaskHidden(fragmentViewZ, sceneViewZ);
    if (hidden) {
        let metre = ${t}.focal / mix(max(-sceneViewZ, 1e-3), 1.0, ${t}.isOrtho);
      let radius = clamp(${rI} * metre, 2.0, ${t}.maskSize.y * ${QI});
      let innerRadius = radius * ${_I/rI};
      let halfway = mix(fragmentViewZ, sceneViewZ, 0.5);
      for (var tap = 0u; tap < 8u; tap += 1u) {
        let angle = f32(tap) * 0.7853982;
        let direction = vec2<f32>(cos(angle), sin(angle));
        outer += select(0u, 1u, ${e}_sceneViewZ(pixel + direction * radius) > halfway);
        inner += select(0u, 1u, ${e}_sceneViewZ(pixel + direction * innerRadius) > halfway);
      }
    }
  }
  return outlineMaskColor(hidden, outer >= ${WI}u || (inner == 8u && outer >= 4u), fragmentDepth);
}`}function m_(a,b,c){return (m_=$c0C(34)).call(this,a,b,c)}function zDP(e){return`${A_(e)}
${sI}
${m_("outline_maskAt","maskView","sceneDepthTex")}`}var SgW={viewProj:0,view:64,maskSize:128,near:136,far:140,isOrtho:144,focal:148,depthScale:152,depthFloor:156,renderOrigin:160},gUZE=176,w_=`struct OutlineMaskVaryings {
  @builtin(position) position: vec4<f32>,
  @location(0) viewZ: f32,
};`;var CZL=(function(e,t){return`${sI}
${a_("outline_maskOut","maskView","sceneDepthTex")}
@fragment fn fs(in: ${e}) -> @location(0) vec4<f32> {
${t.map((e)=>`${e}
`).join("")}  return outline_maskOut(in.position.xy, in.viewZ, in.position.z);
}`});var g_=CZL("OutlineMaskVaryings",[]),j0X=[wv(0,3,"uniform"),gv(1,2,"unfilterable-float")],sgI=997;function _Xp(e){return[wv(e,2,"uniform"),gv(e+1,2,"unfilterable-float")]}function Rug(e){return`${s_}
@group(2) @binding(${e}) var<uniform> lume_outlineMaskView: OutlineMaskView;
@group(2) @binding(${e+1}) var lume_outlineMaskDepth: texture_2d<f32>;
${sI}
${m_("lume_outlineMaskAt","lume_outlineMaskView","lume_outlineMaskDepth")}`}var Xqo={id:"outline-mask",arm:"outline-mask",colorFormat:fqL,depthFormat:pZC,samples:1},$Gm={...Xqo,mirrored:!0},a9F=[wv(0,1,"uniform")],WCw=256,j_=`
${L9b}

@group(1) @binding(0) var<uniform> maskModels: array<mat4x4<f32>, ${WCw}>;

${w_}

@vertex fn vs(@location(0) position: vec3<f32>, @builtin(instance_index) instance: u32) -> OutlineMaskVaryings {
  let worldPos = maskModels[instance] * vec4<f32>(position, 1.0);
  var out: OutlineMaskVaryings;
  out.position = maskView.viewProj * worldPos;
  out.viewZ = (maskView.view * worldPos).z;
  return out;
}

${g_}
`,koI=new Ev("outline-mask-sources");function kgt(e,t,r){e.store(koI,(()=>new Map)).set(t,r)}function oNr(e,t,r,i){let n=`post/outline-mask/mesh/s${r}o${i}`;return t.getRenderPipeline(n,function(){let l=e.createShaderModule({label:"lume outline mask mesh",code:j_}),s=[t.getBindGroupLayout(j0X,"lume outline mask view"),t.getBindGroupLayout(a9F,"lume outline mask model")];return{label:n,layout:e.createPipelineLayout({label:"lume outline mask mesh",bindGroupLayouts:s}),vertex:{module:l,entryPoint:"vs",buffers:[{arrayStride:r,stepMode:"vertex",attributes:[{format:"float32x3",offset:i,shaderLocation:0}]}]},fragment:{module:l,entryPoint:"fs",targets:[{format:fqL}]},primitive:{topology:"triangle-list",cullMode:"none"},depthStencil:{format:pZC,depthWriteEnabled:!0,depthCompare:w6}}})}var F7=128,kF8=`//${F7}
fn over_ground(k0: u32, p: vec3f) -> f32 {
  for (var k = k0; k < ${leN}u; k = k + 1u) {
    if (k >= shells.head.x) {
      break;
    }
    let row = shells.rows[k];
    if (row.anchor.z == 0) {
      continue;
    }
    let c = row.metres.x;
    let cell = vec3i(floor(p / c)) + vec3i(row.anchor.x * 8, 0, row.anchor.y * 8);
    let bx = cell.x >> 3u;
    let bz = cell.z >> 3u;
    let e = shell_column(k, bx, bz);
    if (!shell_present(e, bx, bz)) {
      continue;
    }
    let y0 = shell_y0(e);
    let n = i32(e.y >> 16u);
    let last = cell.y - ${F7};
    var y = min(cell.y, (y0 + n) * 8 - 1);
    for (var w = 0u; w < ${F7+1}u; w = w + 1u) {
      if (y < last) {
        break;
      }
      let by = y >> 3u;
      if (by < y0) {
        return select(-SHELL_BIG, f32(y0 * 8) * c, (e.w >> 16u) != 0u);
      }
      let entry = shellDir[e.z + u32(by - y0)];
      if (entry == 0u) {
        y = by * 8 - 1;
        continue;
      }
      if ((entry & SHELL_SOLID) != 0u || shell_nibble(entry - 1u, vec3i(cell.x & 7, y & 7, cell.z & 7)) != 0u) {
        return f32(y + 1) * c;
      }
      y = y - 1;
    }
    return -SHELL_BIG;
  }
  return -SHELL_BIG;
}

const OVER_KEEP = 0u;
const OVER_COVER = 1u;
const OVER_PAST = 2u;

fn over_law(ro: vec3f, rd: vec3f, h: ShellHit, t: f32, thing: f32, under: bool) -> u32 {
  if (!h.hit || h.inside) {
    return OVER_KEEP;
  }
  let c = shells.rows[h.shell].metres.x;
  if (under && t <= thing + c) {
    return OVER_COVER;
  }
  if (thing - t <= c) {
    return OVER_KEEP;
  }
  if (h.thing || h.n.y < -0.5 || shell_solid(h.shell, h.cell + vec3i(0, 1, 0), h.column, h.columnXZ)) {
    return OVER_COVER;
  }
  if (!shell_land(h.matter) && f32(h.cell.y + 1) * c > over_ground(h.shell, ro + rd * thing) + c) {
    return OVER_COVER;
  }
  return OVER_PAST;
}

struct OverPast {
  o: vec3f,
  a: f32,
  b: f32,
  k: u32,
  end: f32,
}
fn over_leg(k0: u32, a: f32, end: f32) -> OverPast {
  let last = min(shells.head.x, ${leN}u) - 1u;
  var k = min(k0, last);
  while (k < last && shells.rows[k].metres.y <= a) {
    k++;
  }
  let row = shells.rows[k];
  return OverPast(shells.eye.xyz + vec3f(0.0, row.metres.x, 0.0), a, select(min(row.metres.y, end), end, k == last), k, end);
}
fn over_past(h: ShellHit, t: f32, thing: f32) -> OverPast {
  let at = over_leg(0u, thing, thing);
  return over_leg(0u, t + 1e-3 * shells.rows[h.shell].metres.x, min(thing - shells.rows[at.k].metres.x, shells.far.x));
}`,x7=3,hIm="lume things depth",swB=[Uv(0,2,"unfilterable-float","2d")],I7=0.999999,v7="1.0001",W3c=`@group(${x7}) @binding(0) var thingsDepth: texture_2d<f32>;
var<private> over_litOut: f32 = 0.0;
var<private> over_litLeg: OverPast;
var<private> over_litLand: f32 = 0.0;
fn over_litStop(frag: vec4f) -> f32 {
  let farthest = shell_texel(thingsDepth, frag).y;
  if (farthest <= ${Z6}) {
    return shells.far.x;
  }
  return min(shell_depthAt(frag, farthest) * ${v7}, shells.far.x);
}
fn over_litLaw(frag: vec4f, ro: vec3f, rd: vec3f, h: ShellHit, depth: f32) -> bool {
  over_litOut = depth;
  let behind = shell_texel(thingsDepth, frag).x;
  if (behind <= ${Z6} || behind >= depth) {
    return false;
  }
  let thing = shell_depthAt(frag, behind);
  let t = shell_distance(h);
  let law = over_law(ro, rd, h, t, thing, shell_underLand(ro + rd * thing));
  if (law == OVER_COVER) {
    return false;
  }
  over_litOut = behind * ${I7};
  if (law != OVER_PAST) {
    return false;
  }
  over_litLeg = over_past(h, t, thing);
  over_litLand = depth;
  return true;
}
fn over_litPast(past: ShellHit) -> bool {
  if (past.hit && !past.inside) {
    over_litOut = over_litLand;
  }
  over_litLeg = over_leg(over_litLeg.k + 1u, over_litLeg.b, over_litLeg.end);
  return past.hit;
}`;function c7(e,t,r){r.length=0;for(let i=0;i<t;i+=1)r.push(e[i]);return r}class xZb{constructor(e,t){this.device=void 0;this.pipelines=void 0;this.target=null;this.group=null;this.groupView=null;this.groupGeneration=-1;this.before=[];this.land=[];this.twins=[];this.device=e,this.pipelines=t}firstDepthReaderOf(e){for(let t=0;t<e.length;t+=1)if(e[t]?.thingsDepth)return t;return-1}beforeOf(e,t){return c7(e,t,this.before)}landOf(e,t,r,i){let n=this.target=$T1(this.device,this.target,{width:e.width,height:e.height,format:I9,label:"lume things depth"});if(t(n),this.group===null||this.groupView!==n.view||this.groupGeneration!==this.pipelines.generation)this.group=this.device.createBindGroup({label:"lume things depth",layout:this.pipelines.getBindGroupLayout(swB,hIm),entries:[{binding:0,resource:n.view}]}),this.groupView=n.view,this.groupGeneration=this.pipelines.generation;let l=this.land;l.length=0;let s=0;for(let e=i;e<r.length;e+=1){let t=r[e];if(!t.thingsDepth){l.push(t);continue}let i=this.twins[s]??={pipeline:t.pipeline,bindGroups:[],draw:t.draw};s+=1,i.pipeline=t.pipeline,i.draw=t.draw,i.bindGroups.length=0;for(let e=0;e<x7;e+=1)i.bindGroups.push(t.bindGroups[e]??null);i.bindGroups.push(this.group),l.push(i)}return l}forget(){this.group=null,this.groupView=null,this.groupGeneration=-1}destroy(){this.target=ZtX(this.target),this.forget()}}var U7="scene.over-ask",p7="scene.over",o7=(1-ALK).toFixed(6),i7=`${_0}
@group(1) @binding(0) var surfaceDepth: texture_2d<f32>;
@group(1) @binding(1) var surfaceWords: texture_2d<u32>;
@group(1) @binding(2) var surfaceRead: texture_2d<u32>;
${xv5}
@fragment fn fs(@builtin(position) position: vec4<f32>) -> @location(0) vec4<f32> {
  let px = vec2<i32>(position.xy);
  let rawDepth = textureLoad(surfaceDepth, px, 0).x;
  if (rawDepth <= ${Z6}) {
    return vec4<f32>(${Z6}, 0.0, 0.0, 0.0);
  }
  let wordsY = textureLoad(surfaceWords, px, 0).y;
  let kind = (wordsY >> 19u) & 15u;
  let read = textureLoad(surfaceRead, px, 0).x;
  let held = (kind == 8u || kind == 1u) && rawDepth >= ${o7} && (wordsY & ${mi}u) != 0u && (read >> 16u) != 0u;
  let asked = kind != 0u && (read & 0x80000000u) == 0u && !held;
  return vec4<f32>(select(${Z6}, rawDepth, asked), 0.0, 0.0, 0.0);
}`,C7="lume over ask",O7="post/over-ask",f7=[Uv(0,2,"unfilterable-float","2d"),Uv(1,2,"uint","2d"),Uv(2,2,"uint","2d")];function TVA(a,b){return $c0C(35).call(this,a,b)}class o4G{constructor(e,t){this.device=void 0;this.pipelines=void 0;this.target=null;this.askGroup=null;this.askKey=[null,null,null,-1];this.overGroup=null;this.overView=null;this.overGeneration=-1;this.askPipeline=null;this.askGroups=[null,null];this.draw={pipeline:null,bindGroups:[null,null,null,null],draw:{vertexCount:3,instanceCount:1}};this.askAttachment={format:U9};this.askPass={colorAttachments:[this.askAttachment],measured:Zpm,draws:(e)=>{if(this.askPipeline!==null&&this.askGroups[1]!==null)Kwj(e,this.askPipeline,this.askGroups)}};this.colours=[];this.overPass={colorAttachments:this.colours,measured:Zpm,draws:[this.draw]};this.device=e,this.pipelines=t}declare(a,b,c,d,e,f,g,h,i,j,k){return $c0C(36).call(this,a,b,c,d,e,f,g,h,i,j,k)}forget(){this.askGroup=null,this.askKey=[null,null,null,-1],this.overGroup=null,this.overView=null,this.overGeneration=-1}destroy(){this.target=ZtX(this.target),this.forget()}}var NL=`
@group(0) @binding(0) var surfaceDepth: texture_depth_2d;
${xv5}
@fragment fn fs(@builtin(position) position: vec4<f32>) -> @location(0) vec4<f32> {
  return vec4<f32>(textureLoad(surfaceDepth, vec2<i32>(position.xy), 0), 0.0, 0.0, 0.0);
}
`,tL="post/near-depth-copy",iL="depth.band.near",PpZ=`${wcb}.band`,VL=[Uv(0,2,"depth")],XL="lume near depth copy";function qB8(e,t){let r=t.getBindGroupLayout(VL,XL);return t.getRenderPipeline(tL,function(){let t=e.createPipelineLayout({label:XL,bindGroupLayouts:[r]});return pg3(e,{label:XL,code:NL,layout:t,format:U9})()})}var dL=`
@group(0) @binding(0) var bandHit: texture_2d<f32>;
${xv5}
@fragment fn fs(@builtin(position) position: vec4<f32>) -> @builtin(frag_depth) f32 {
  let hit = textureLoad(bandHit, vec2<i32>(position.xy), 0).x;
  if (hit <= ${Z6}) { discard; }
  return hit;
}
`,PL="depth.band.hit",hE5=`${wcb}.rest`,yL="post/band-depth",HL="lume band depth",bL=[Uv(0,2,"unfilterable-float")];function sL(a,b){return (sL=$c0C(37)).call(this,a,b)}function kTk(e){for(let t=0;t<e.length;t+=1)if(e[t]?.nearDepth)return t;return-1}function fUi(e){return kTk(e)<0}function q7O(e,t,r,i=!1){if(e===void 0)return;r.length=0;for(let n=0;n<e.length;n+=1){let l=e[n];if(l.channel!=="draws"){if(i)r.push(l)}else if(l.end>t)r.push({family:l.family,channel:l.channel,start:Math.max(l.start,t)-t,end:l.end-t})}return r}var VOf=(e)=>e!==void 0&&e.length>0&&e.every((e)=>JSI(e.family)===Khf)?Khf:lnW;function TL(a,b,c){return (TL=$c0C(38)).call(this,a,b,c)}class k75{constructor(e,t){this.device=void 0;this.pipelines=void 0;this.target=null;this.group=null;this.groupView=null;this.groupGeneration=-1;this.copyGroup=null;this.copyView=null;this.copyGeneration=-1;this.copyPipeline=null;this.before=[];this.after=[];this.twins=[];this.runs=[];this.runsLater=[];this.hit=null;this.depthGroup=null;this.depthView=null;this.depthGeneration=-1;this.depthPipeline=null;this.rest=[];this.restTwins=[];this.bandPicks=[];this.restPicks=[];this.runsRest=[];this.hitAttachment={format:U9};this.depthTarget={format:J9,samples:1,depthLoad:"load"};this.depthPass={colorAttachments:[],depthStencil:this.depthTarget,draws:(e)=>{if(this.depthPipeline!==null&&this.depthGroup!==null)Kwj(e,this.depthPipeline,[this.depthGroup])}};this.copyAttachment={format:U9};this.copyPass={colorAttachments:[this.copyAttachment],draws:(e)=>{if(this.copyPipeline!==null&&this.copyGroup!==null)Kwj(e,this.copyPipeline,[this.copyGroup])}};this.device=e,this.pipelines=t}ready(){this.copyPipeline=qB8(this.device,this.pipelines).pipeline;this.depthPipeline=sL(this.device,this.pipelines).pipeline;return this.copyPipeline!==null}beforeOf(e,t){return c7(e,t,this.before)}runsBefore(a,b){return $c0P($c0C(39),k75.prototype,"runsBefore").call(this,a,b)}runsAfter(e,t){return q7O(e,t,this.runsLater)}runsOwn(e){return TL(e,this.bandPicks,this.runsLater)}runsRestOf(e){return TL(e,this.restPicks,this.runsRest)}declareCopy(a,b,c,d,e){return $c0P($c0C(40),k75.prototype,"declareCopy").call(this,a,b,c,d,e)}afterOf(a,b){return $c0P($c0C(41),k75.prototype,"afterOf").apply(this,arguments)}ownOf(e,t){if(this.depthPipeline===null)return!1;for(let r=t;r<e.length;r+=1)if(e[r].bandSplit!==void 0)return!0;return!1}restOf(a,b){return $c0P($c0C(42),k75.prototype,"restOf").call(this,a,b)}twinOf(e,t,r,i,n){let l=e[t]??={pipeline:i,bindGroups:[],draw:r.draw};l.pipeline=i,l.draw=r.draw,l.vertexBuffers=r.vertexBuffers,l.indexBuffer=r.indexBuffer,l.bindGroups.length=0;for(let e=0;e<x7;e+=1)l.bindGroups.push(r.bindGroups[e]??null);return l.bindGroups.push(n),l}hitOf(e,t){let r=this.hit=$T1(this.device,this.hit,{width:e,height:t,format:U9,label:"lume band hit depth"});return this.hitAttachment.view=r.view,this.hitAttachment}declareDepth(a,b,c){return $c0P($c0C(43),k75.prototype,"declareDepth").call(this,a,b,c)}forget(){return $c0C(44).call(this)}destroy(){this.target=ZtX(this.target),this.hit=ZtX(this.hit),this.forget()}}var AS=new WeakMap,yS=["viewportSize","gridShare"],iT9="(frame.viewportSize / frame.gridShare)",uS=new Set(["screenUV","uv"]),zS=new Set(["screenUV","uv","uv1","uv2","uv3"]),dS=new Set(["sin","cos","tan","fract","floor","ceil","round","trunc","sign","step"]);function cS(e,t){let r=function(e,r){let i=t.get(e);if(i===void 0)t.set(e,[r]);else i.push(r)};for(let i of e.stmts)if(i.kind==="decl")r(i.variable,i.init);else if(i.kind==="assign")r(i.variable,i.value);else if(i.kind==="if")for(let e of i.branches)cS(e.scope,t);else if(i.kind==="loop")r(i.counter,i.start),r(i.counter,i.end),cS(i.scope,t)}function xS(e){let t=e.inputs[0];if(e.meta.kind!=="call"||e.meta.fn!=="floor"||t?.meta.kind!=="op2"||t.meta.op!=="/")return null;let[r,i]=t.inputs;if(r.meta.kind!=="op2"||r.meta.op!=="*")return null;let n;{let v$8;{let n=r.inputs.map((e)=>e.meta.kind==="input"?e.meta.name:"");
v$8=n;}n=v$8}if(!n.includes("screenSize")||!n.some((e)=>uS.has(e)))return null;{if(i.meta.kind==="uniform")return i;return i.meta.kind==="const"&&i.meta.values.length===1?i.meta.values[0]:null
}}function CS(e,t){let r=t.positional;if(r===void 0)return!1;let i=r.get(e.id);if(i!==void 0)return i;r.set(e.id,!1);let n=e.meta,l=!1;if(n.kind==="input")l=zS.has(n.name);else if(n.kind==="textureSample"&&AS.has(e))l=!1;else if(xS(e)!==null)l=!1;else if(n.kind==="varRead")l=(t.writes?.get(n.variable)??[]).some((e)=>CS(e,t));else l=e.inputs.some((e)=>CS(e,t));return r.set(e.id,l),l}function JS(e){let t=e.meta;if(t.kind==="input")return t.name==="screenSize";if(t.kind!=="wgslExpr")return!1;let r=`${t.parts.join(" ")} ${t.module?.source??""}`;return yS.some((e)=>r.includes(e))}function MQv(e){let t=e?.meta;return t?.kind==="input"&&uS.has(t.name)}function DS(e,t){let r=[e];while(r.length>0){let e=r.pop();if(e===void 0)break;if(t.seen.has(e.id))continue;if(t.seen.add(e.id),e.id===t.inputs.hazeViewZ.id){if(!t.stage)return"the picture reads the scene depth outside pixelate";continue}let i=t.stage?null:xS(e);if(i!==null){t.sizes.push(i);continue}if(JS(e))return"a graph reads the picture's size outside pixelate";let n=e.meta;switch(n.kind){case"textureSample":{let v$4;IS:{let t$7=n.texture,r$3=n.mode,i$2=t;{let t=t$7,r=r$3,i=i$2;let{frame:n,depth:l,aperture:s}=i.inputs;if(i.stage){if(t!==n&&t!==l&&t!==s){v$4="a stage reads a picture other than the frame or the depth";break IS;}if(r==="load"||r==="size"||!MQv(e.inputs[0])){v$4="a stage reads the frame away from its own pixel";break IS;}{v$4=null;break IS;}}let o=AS.get(e);if(o===void 0){v$4="the picture reads a texture outside pixelate";break IS;}if(t!==n&&!i.stages.has(t)){v$4="pixelate reads a picture other than the frame or a stage";break IS;}v$4=(i.sizes.push(o),null);}}let r=v$4;if(r!==null)return r;if(!t.stage)continue;break}case"varRead":t.variables.add(n.variable);break;case"call":if(!t.stage&&dS.has(n.fn)&&CS(e,t))return"the picture draws a pattern from the screen position after pixelate";break;case"storageRead":case"atomic":case"textureStore":case"vertexStage":return"a graph reads a buffer or a vertex stage";case"fnCall":case"voidCall":return"a graph calls an Fn() body";default:break}for(let t=e.inputs.length-1;t>=0;t--)r.push(e.inputs[t])}return null}function MS(a,b){return (MS=$c0C(45)).call(this,a,b)}function pS(e,t){switch(e.kind){case"decl":return t.variables.has(e.variable)?DS(e.init,t):null;case"assign":return t.variables.has(e.variable)?DS(e.value,t):null;case"if":{if(!e.branches.some((e)=>MS(e.scope,t.variables)))return null;for(let r of e.branches){let e=(r.cond!==null?DS(r.cond,t):null)??$S(r.scope,t);if(e!==null)return e}return null}case"loop":if(!t.variables.has(e.counter)&&!MS(e.scope,t.variables))return null;return DS(e.start,t)??DS(e.end,t)??$S(e.scope,t);case"sideEffect":return DS(e.node,t);case"discard":return"a graph discards";case"store":return"a graph writes a buffer"}}function $S(e,t){for(let r of e.stmts){let e=pS(r,t);if(e!==null)return e}return null}function sS(e,t,r){let i=DS(e,r);if(i!==null)return i;for(;;){let e=r.variables.size,i=$S(t,r);if(i!==null)return i;if(r.variables.size===e)return null}}function tS(a,b,c){return (tS=$c0C(46)).call(this,a,b,c)}var IrB=(e)=>e.type==="vec4f"?e.rgb:e;function rzw(e,t,r){if(e.whole!==void 0&&e.whole.length>0)return{grain:null,reason:"the look calls another look whole"};if(e.cube||e.previousCamera||e.moves.history)return{grain:null,reason:"the look reads its capture, the last camera or a .previous target"};let i=IrB(e.output),n=new Set;for(let t of e.passGraph.passes){let e=t.target;if(!/\.upstream\d+$/.test(e.name)||e.converted||e.fixedWidth!==null||e.scale!==1||e.doubleBuffered)return{grain:null,reason:`the look declares the pass ${t.name}`};n.add(e.ref)}for(let r of e.passGraph.passes){let e=sS(r.output,r.scope,{stage:!0,inputs:t,stages:n,seen:new Set,variables:new Set,sizes:[]});if(e!==null)return{grain:null,reason:e}}let l=new Map;cS(e.scope,l);let s={stage:!1,inputs:t,stages:n,seen:new Set,variables:new Set,sizes:[],writes:l,positional:new Map},o=sS(i,e.scope,s);if(o!==null)return{grain:null,reason:o};let a=tS(s.sizes,e.uniforms,r);return a===null?{grain:null,reason:"the picture is not one pixelate at one literal or param size"}:{grain:a,reason:null}}function TYm(e,t){let r="literal"in e?e.literal:e.fallback;if(!("literal"in e)){let i=t?.[e.param];if(IK(i))r=i;else if(typeof i==="boolean")r=Number(i)}return Number.isInteger(r)&&r>=2?r:0}var QQ=0.21404114048223255,RY=JXJ(QQ),AQ=0.01,_Y=2,oQ=30,CQ=[0.2126,0.7152,0.0722],FY=[0.74,0.81,0.88],EQ=0.00001,GQ=0.5,ZQ=2,cQ=0.45,QY=1.75,OY=0.001,eY=6.333333333333333,bQ=2*eY,gY=1.5;var nQ=2.39996323,NQ=(function(){let e=[],t=80;for(let t=0;t<80;t+=1){if(t%5===0)continue;let r=t*nQ,i=Math.sqrt(t)/Math.sqrt(80);e.push([i*Math.cos(r),i*Math.sin(r)])}return e})(),oY={low:16,medium:24,high:32,ultra:64},sQ=new Map;function NY(a){return (NY=$c0C(47)).call(this,a)}var uQ=B6,aY=rFh(`
fn lume_motion_blur_sky_velocity(uv: vec2<f32>) -> vec2<f32> {
  let ndc = vec2<f32>(uv.x * 2.0 - 1.0, 1.0 - uv.y * 2.0);
  let far = frame.inverseViewProj * vec4<f32>(ndc, 0.0, 1.0);
  let direction = far.xyz - frame.cameraPosition * far.w;
  let prev = frame.prevViewProj * vec4<f32>(direction, 0.0);
  if (prev.w <= 1e-6 || frame.motionValid < 0.5) { return vec2<f32>(0.0); }
  return ndc - prev.xy / prev.w;
}
fn lume_look_eye_velocity(uv: vec2<f32>, depth: f32) -> vec2<f32> {
  if (depth <= ${$6}) { return lume_motion_blur_sky_velocity(uv); }
  if (frame.motionValid < 0.5) { return vec2<f32>(0.0); }
  let ndc = vec2<f32>(uv.x * 2.0 - 1.0, 1.0 - uv.y * 2.0);
  let point = frame.inverseViewProj * vec4<f32>(ndc, depth, 1.0);
  let prev = frame.prevViewProj * vec4<f32>(point.xyz / point.w, 1.0);
  if (prev.w <= 1e-6) { return vec2<f32>(0.0); }
  return ndc - prev.xy / prev.w;
}
`);function bgY(a,b,c){return $c0C(48).call(this,a,b,c)}function LQ(e,t,r){if(!e.resolve||e.scene===void 0||t===e.scene)return e.frame;return e.resolve(t,r)}function cY(e,t){if(typeof e==="number")return Brh(IK(e)?e:t);return e??Brh(t)}var jQ=(function(e,t){if(typeof e==="number"||e===void 0||e instanceof IVI)return cY(e,t);let r=function(r){let i=e[r];return IK(i)?i:t};return fHq(r(0),r(1),r(2))});var CY=()=>BuM("vec2f")`frame.viewportSize`,xQ=((e,t)=>e.type==="vec4f"?N96(t(e.rgb),e.a):t(e));var iY=(function(e,t,r){let i=e.toVar();return VlA(t,(function(){i.assign(r(i))})),i});var AY=(function(e,t,r){return iY(e,r.greaterThanEqual(EQ),((e)=>xQ(e,(function(e){let i=sfu(jOY,"lume_srgb_encode",[cb5(e,0)],"vec3f");return sfu(jOY,"lume_srgb_decode",[cb5(lEN(i,t,r),0)],"vec3f")}))))});var nY=(function(e,t){return iY(e,Vgy(t.sub(1)).greaterThanEqual(EQ),((e)=>xQ(e,(function(e){let r=sfu(jOY,"lume_srgb_encode",[cb5(e,0)],"vec3f"),i=nD5(r.sub(RY).mul(t).add(RY),0,1);return sfu(jOY,"lume_srgb_decode",[i],"vec3f")}))))});var tY=(e)=>e.type==="vec3f"?tFq(Vgy(e),fHq(1,1,1)):Vgy(e);function JY(a,b,c,d){return (JY=$c0C(49)).call(this,a,b,c,d)}function $Y(e,t,r,i){let n=nD5(e.add(t),0,1),l=cb5(Brh(1).add(r),AQ),s=Ra8(n,Brh(1).div(l));return nD5(s.mul(Brh(1).add(i)),0,1)}var DQ=((e,t)=>e===void 0||e===t||Array.isArray(e)&&e.length>0&&e.every((e)=>e===t));function ZY(e,t,r){let i=cb5(e,0);if(r===void 0||r===1)return i;return iY(i,Vgy(t.sub(1)).greaterThanEqual(EQ),(e)=>xQ(e,function(e){let r=BuM("f32")`frame.toneMap`,i=e.toVar();return VlA(r.lessThan(-0.5),function(){VlA(r.lessThan(-3.5),function(){i.assign(e.mul(cb5(t,0)))}).ElseIf(r.lessThan(-2.5),function(){i.assign(sfu(jOY,"lume_agx_reexpose",[e,t],"vec3f"))}).ElseIf(r.lessThan(-1.5),function(){i.assign(sfu(jOY,"lume_cineon_reexpose",[e,t],"vec3f"))}).Else(function(){i.assign(sfu(jOY,"lume_reinhard_reexpose",[e,t],"vec3f"))})}).Else(function(){i.assign(sfu(jOY,"lume_tone_reexpose",[e,t,r],"vec3f"))}),i}))}var kY=(function(e,t={},r,i,n,l=!0){let s=n===xWV;let o=cY(t.exposure,1);let a=cY(t.saturation,1);let u=cY(t.contrast,1);let d=cY(t.brightness,0);let f=jQ(t.lift,0);let c=jQ(t.gamma,s?0:1);let h=jQ(t.gain,s?0:1);let p=cY(t.temperature,0);let m=cY(t.tint,0);let g=cY(t.haze,0);let y=t.hazeColor??i??FY;let v=y instanceof IVI?y:fHq(y[0],y[1],y[2]);let w=fHq(CQ[0],CQ[1],CQ[2]);let b=ZY(e,o,t.exposure);let k=tFq(b,w);let x=lEN(fHq(k,k,k),b,a);let M=(l?nY(x,u):x).add(d);let S=DQ(t.lift,0)&&DQ(t.gamma,1)&&DQ(t.gain,1);let I;if(s){I=$Y(M,f,c,h);}else {I=S?nD5(M,0,1):JY(M,f,c,h);}let R=Brh(1).add(p.mul(GQ));let A=Brh(1).sub(p.mul(GQ));let $=Brh(1).add(m.mul(GQ));let z=Brh(1).sub(m.mul(GQ*0.5));let O=nD5(fHq(I.x.mul(R).mul(z),I.y.mul($),I.z.mul(A).mul(z)),0,1);let T=r?nD5(g,0,1).mul((BuM("f32")`select(-(${r}), ${Brh(oQ)}, frame.sort2d > 0.5)`).smoothstep(_Y,oQ)):nD5(g,0,1);let v$5;sY:{let e$8=t.haze,t$8=0;{let e=e$8,t=t$8;if(e===void 0){v$5=t<=0;break sY;}v$5=typeof e==="number"&&(!IK(e)?t<=0:e<=0);}}let C=v$5?O:AY(O,v,T);return nD5(C,0,1)});function MY(e,t=0.3,r=0.6,i=1){return e}function KY(a){return (KY=$c0C(50)).apply(this,arguments)}function LY(e,t){let r=iY(e,t.strength.greaterThanEqual(EQ),function(e){let r=MNf().mul(2).sub(1),i=Ra8(Ra8(r.x.abs(),t.roundness).add(Ra8(r.y.abs(),t.roundness)),Brh(1).div(t.roundness)),n=Ra8(2,Brh(1).div(t.roundness)),l=cb5(t.feather,OY),s=nD5(i.div(n).sub(Brh(1).sub(l)).div(l),0,1);return AY(e,t.tint,nD5(t.strength.mul(Ra8(s,QY)),0,1))});return nD5(r,0,1)}function STE(e,t,r){let i=kY(e,{saturation:t.saturation,contrast:t.contrast,brightness:t.brightness,temperature:t.temperature,tint:t.tint,haze:r.haze===!1?void 0:t.haze,hazeColor:t.hazeColor},r.viewZ,void 0,void 0,r.contrast!==!1);if(r.scanlines)i=zY(i,t.scanlines);if(r.grain)i=hQ(i,t.grain);return r.vignette===!1?nD5(i,0,1):LY(i,{strength:t.vignetteStrength,roundness:t.vignetteRoundness,feather:t.vignetteFeather,tint:t.vignetteTint})}function hQ(e,t=0.2){let r=cY(t,0.2);return iY(e,r.notEqual(0),function(e){let t=(tFq((MNf().add(W13).fract()),Iwu(12.9898,78.233)).mod(ts0).sin().mul(43758.5453).fract());return lEN(e,e.add(e.mul(nD5(t.add(0.1),0,1))),r)})}function Z6U(e,t,r=0.5){let i=LQ(e,t,"chromaticAberration"),n=cY(r,0.5),l=Brh(1.1),s=Iwu(0.5,0.5),o=nwK.sub(s),a=o.length(),u=Brh(1).add(l.mul(0.02).mul(n)),d=Brh(1).sub(l.mul(0.02).mul(n)),f=n.mul(a),c=s.add(o.mul(u)).add(o.mul(f).mul(0.01)),h=s.add(o),p=s.add(o.mul(d)).add(o.mul(f).mul(-0.01)),m=i.sampleLevel(c,0).r,g=i.sampleLevel(h,0).g,y=i.sampleLevel(p,0).b;return fHq(m,g,y)}function aQ(a){return (aQ=$c0C(51)).apply(this,arguments)}function zY(e,t=0.5,r=240){let i=cY(t,0.5);return iY(e,i.notEqual(0),function(e){let t=MNf().y.mul(cY(r,240).mul(ts0)).sin().mul(0.5).add(0.5);return e.mul(Brh(1).sub(t.mul(i)))})}var vY=rFh(`
${atS}
${Vp4}
fn lume_look_door_view_distance(d: f32, t: f32) -> f32 {
  let ratio = clamp(select(t, t - 0.5 - APERTURE_TIER_GAP, t >= 0.5) / (0.5 - APERTURE_TIER_GAP), 0.0, 1.0);
  let far = frame.proj[3][2] / max(frame.proj[2][2], 1e-9 * ${vG});
  let farRatio = select(d / max(far, d), 0.0, frame.proj[2][2] <= 0.0);
  return select(d / max(ratio, farRatio), d, t <= 0.0);
}
fn lume_look_view_z_through_door(zPhysical: f32, zScene: f32, viewZ: f32) -> f32 {
  if (zPhysical <= 0.0 || frame.sort2d > 0.5 || lume_aperture_has_no_band(zPhysical)) { return viewZ; }
  let share = ${vG};
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
`);function gh3(e,t,r,i){return (sfu(vY,"lume_look_view_z_through_door",[(e.sampleLevel(r,0).r),(t.sampleLevel(r,0).r),i],"f32"))}function Jj3(e,t,r,i,n,l){return sfu(vY,"lume_look_linear_view_z_through_door",[e,t,r,i,n,l],"f32")}var mY=vY.source;function nB0(e,t,r,i=10,n=5,l=1){let s=r.negate().sub(cY(i,10)).abs().smoothstep(0,cY(n,5));let o=Iwu(Brh(1).div(CY().x),Brh(1).div(CY().y)).mul(cY(l,1)).mul(s);let a=LQ(e,t,"dof");let u=NY(e.quality);let d=a.sampleLevel(nwK,0).rgb;for(let[e,t]of u)d=d.add(a.sampleLevel(nwK.add(o.mul(Iwu(e,t))),0).rgb);let f=d.div(u.length+1),c=nD5(s.mul(2),0,1);return lEN(t,f,c)}function vJz(e,t,r=4){let i=LQ(e,t,"pixelate"),n=cb5(cY(r,4),1),l=BuM("f32")`frame.gridShare`,s=TmC(l.lessThan(1),cb5(R51(n.mul(l)),1),n),o=nwK.mul(CY()).div(s).floor().mul(s).add(s.mul(0.5)).div(CY()),a=i.sampleLevel(o,0);return AS.set(a,r),a.rgb}function JQ(a){return (JQ=$c0C(52)).apply(this,arguments)}var WY=18,PQ=0.0625;function bY(e){let t=0;for(let e=-WY;e<=WY;e+=1)t+=Math.exp(-0.5*e*e/(eY*eY));return Math.exp(-0.5*e*e/(eY*eY))/t}function qQ(a,b,c,d){return (qQ=$c0C(53)).call(this,a,b,c,d)}function esB(e,t,r=0.5){let i=LQ(e,t,"blur");let n;xY:{let v$9;vQ:{let e$11=r;{let e=e$11;if(typeof e==="number"){v$9=e;break vQ;}let t=e.meta;if(t.kind!=="uniform"){v$9=null;break vQ;}let r=t.slot.value;v$9=typeof r==="number"?r:null;}}let e=v$9;if(e===null||!IK(e)){n=1;break xY;}let t=e*gY;if(!(t>1)){n=1;break xY;}n=Math.max(PQ,2**-Math.ceil(Math.log2(t)));}if(n<1&&e.hiddenPass){let t=qQ(e.hiddenPass,i,cY(r,0.5),n);if(t!==null)return t}let l=Iwu(Brh(1).div(CY().x),Brh(1).div(CY().y)).mul(cY(r,0.5).mul(gY*bQ)),s=i.sampleLevel(nwK,0).rgb,o=1;for(let[e,t]of NQ){let r;{let e$7=k6(e,t);{let e=e$7;let t=e*bQ;r=Math.exp(-0.5*t*t/(eY*eY));}}s=s.add(i.sampleLevel(nwK.add(l.mul(Iwu(e,t))),0).rgb.mul(r)),o+=r}return s.div(o)}var eQ='ctx.param() returns a shader NODE \u2014 use it inside shader expressions, not JS arithmetic (1 - 0.34 * dim is NaN when dim is a node). Compute in node space instead \u2014 float(1).sub(dim.mul(0.34)), with float from require("builtin/tsl") \u2014 or pass the param node straight through.';function dQ(a){return (dQ=$c0C(54)).call(this,a)}function XQ(e,t,r){throw Error(`${e}: ${t} ${r}`)}function lQ(e,t,r){if(r===void 0||r instanceof IVI)return;{if((da=Ea(r,e,t))!==ca)return da}}function BQ(a,b,c){return (BQ=$c0C(55)).call(this,a,b,c)}function iQ(e,t,r){if(!Array.isArray(r)){lQ(e,t,r);return}for(let i=0;i<r.length;i+=1){let n=r[i];if(IK(n))continue;if(n instanceof IVI)XQ(e,`${t}[${i}]`,"is a shader node \u2014 build the whole color as ONE vec3 node (vec3(r, g, b) from builtin/tsl), or pass a plain [r, g, b] literal.");if(typeof n==="number")XQ(e,`${t}[${i}]`,`is ${String(n)}. ${eQ}`);XQ(e,`${t}[${i}]`,`must be a plain number, got ${dQ(n)}.`)}}function VY(e,t,r="color (the first argument)"){if(t instanceof IVI)return;XQ(e,r,`must be a color node \u2014 pass ctx.scene or a chained builtin/postfx result, got ${dQ(t)}.`)}function lY(e,t,r){if(r===void 0)return;if(typeof r!=="object"||r===null||Array.isArray(r)||r instanceof IVI)XQ(e,"options",`must be an options object like ${t}, got ${dQ(r)}.`)}var rQ=["exposure","saturation","contrast","brightness","temperature","tint","haze"],EY=["lift","gamma","gain","hazeColor"];function kvC(e){return{grade:function(t,r){VY("grade",t),lY("grade","{ exposure: 1.05 }",r);let i=r?{...r,hazeColor:typeof r.hazeColor==="string"?BQ("grade",'option "hazeColor"',r.hazeColor):r.hazeColor}:void 0;SQ:{let e=i;if(lY("grade","{ exposure: 1.05 }",e),!e)break SQ;for(let t of rQ)lQ("grade",`option "${t}"`,e[t]);for(let t of EY)iQ("grade",`option "${t}"`,e[t])}return kY(t,i,e.hazeViewZ??e.viewZ,e.air,e.grammar)},bloom:(e,t,r,i)=>MY(e,t,r,i),vignette:function(e,t,r){VY("vignette",e),lQ("vignette","intensity",t),lY("vignette","{ color: [0.02, 0.02, 0.05] }",r);let i=r?{...r,color:typeof r.color==="string"?BQ("vignette",'option "color"',r.color):r.color}:void 0;hY:{let e=i;if(lY("vignette","{ color: [0.02, 0.02, 0.05] }",e),!e)break hY;lQ("vignette",'option "roundness"',e.roundness),lQ("vignette",'option "feather"',e.feather),iQ("vignette",'option "color"',e.color)}return KY(e,t,i)},grain:function(e,t){return VY("grain",e),lQ("grain","intensity",t),hQ(e,t)},film:function(e,t){return VY("film",e),lQ("film","intensity",t),hQ(e,t)},chromaticAberration:function(t,r){return VY("chromaticAberration",t),lQ("chromaticAberration","strength",r),Z6U(e,t,r)},dotScreen:function(e,t,r){VY("dotScreen",e);lQ("dotScreen","angle",t);lQ("dotScreen","scale",r);return aQ(e,t,r)},scanlines:function(e,t,r){return VY("scanlines",e),lQ("scanlines","intensity",t),lQ("scanlines","count",r),zY(e,t,r)},dof:function dof(a,b,c,d,f){return (dof.$h??=$c0C(56)(e)).call(this,a,b,c,d,f)},pixelate:function(t,r){return VY("pixelate",t,"scene (the first argument)"),lQ("pixelate","size",r),vJz(e,t,r)},tint:function(a,b,c,d,e){return $c0C(57).call(this,a,b,c,d,e)},blur:function(t,r){return VY("blur",t,"scene (the first argument)"),lQ("blur","amount",r),esB(e,t,r)}}}var tcX=65,XBV="rgba16float",Z_="1.0009765625";var Cx2=(function(e){let t=Math.ceil(tcX/e);return{columns:e,rows:t,width:e*tcX,height:t*tcX}});function Qjs(e){if(!hK(e))return Cx2(tcX);let t=Math.min(tcX,Math.floor(e/tcX));if(!(t>=1))return null;let r=Math.ceil(tcX/t);if(r*tcX>e)return null;return Cx2(Math.ceil(tcX/r))}var G_=`${tcX}.0`;function P_(a){return (P_=$c0C(58)).call(this,a)}function r_(a){return (r_=$c0C(59)).call(this,a)}function FHn(e){let t=e.moduleWgsl,r=u_;if(r.text===t&&r.depth===e.depth&&r.lighting===e.lighting)return r.alone;let i=!e.depth&&!e.lighting&&Fa(t)&&!/\bframe\.(?!toneMap\b)/.test(t)&&!/\btexture[A-Z]\w*\s*\(/.test(t);return r.text=t,r.depth=e.depth,r.lighting=e.lighting,r.alone=i,i}var u_={text:null,depth:!1,lighting:!1,alone:!1};function QAe(e){return!(e.haze>0)&&e.scanlines===0&&e.grain===0&&!(e.vignetteStrength>=EQ)}var Hg=0.125,Pg=0.0312,Yg=0.5,ig=0.1,Fg=[1.5,3,12];function Og(e){return`      if (!doneN || !doneP) {
        if (!doneN) {
          lumaEndN = lume_edge_line(posN) - lumaNN * 0.5;
          doneN = abs(lumaEndN) >= gradientScaled;
        }
        if (!doneP) {
          lumaEndP = lume_edge_line(posP) - lumaNN * 0.5;
          doneP = abs(lumaEndP) >= gradientScaled;
        }
        if (!doneN) {
          posN = posN - along * ${b6(e)};
        }
        if (!doneP) {
          posP = posP + along * ${b6(e)};
        }
      }`}function Sg(){let[e,t,...r]=Fg;return`fn lume_edge_luma(c: vec3<f32>) -> f32 {
  let l = max(dot(c, vec3<f32>(0.2126, 0.7152, 0.0722)), 0.0);
  return sqrt(l / (1.0 + l));
}

fn lume_edge_texel(p: vec2<i32>, hi: vec2<i32>) -> vec3<f32> {
  let c = textureLoad(colorTex, clamp(p, vec2<i32>(0), hi), 0).rgb;
  return select(vec3<f32>(0.0), c, c == c);
}

fn lume_edge_line(at: vec2<f32>) -> f32 {
  return lume_edge_luma(textureSampleLevel(colorTex, smp, at, 0.0).rgb);
}

fn lume_edge_between(low: f32, mid: f32, high: f32) -> bool {
  return (mid - low) * (high - mid) > 0.0 && min(abs(mid - low), abs(high - mid)) >= ${b6(ig)} * abs(high - low);
}

fn lume_edge_blend(a: vec3<f32>, b: vec3<f32>, t: f32) -> vec3<f32> {
  let wa = (1.0 - t) / (1.0 + max(dot(a, vec3<f32>(0.2126, 0.7152, 0.0722)), 0.0));
  let wb = t / (1.0 + max(dot(b, vec3<f32>(0.2126, 0.7152, 0.0722)), 0.0));
  return (a * wa + b * wb) / max(wa + wb, 1e-6);
}

fn lume_edge_smooth(uv: vec2<f32>) -> vec3<f32> {
  let size = vec2<i32>(textureDimensions(colorTex));
  let hi = size - vec2<i32>(1);
  let texel = 1.0 / vec2<f32>(size);
  let p = clamp(vec2<i32>(floor(uv * vec2<f32>(size))), vec2<i32>(0), hi);
  let center = (vec2<f32>(p) + 0.5) * texel;
  let cM = lume_edge_texel(p, hi);
  let cN = lume_edge_texel(p + vec2<i32>(0, -1), hi);
  let cS = lume_edge_texel(p + vec2<i32>(0, 1), hi);
  let cW = lume_edge_texel(p + vec2<i32>(-1, 0), hi);
  let cE = lume_edge_texel(p + vec2<i32>(1, 0), hi);
  let lumaM = lume_edge_luma(cM);
  let lumaN0 = lume_edge_luma(cN);
  let lumaS0 = lume_edge_luma(cS);
  let lumaW = lume_edge_luma(cW);
  let lumaE = lume_edge_luma(cE);
  let rangeMax = max(max(max(lumaN0, lumaS0), max(lumaW, lumaE)), lumaM);
  let rangeMin = min(min(min(lumaN0, lumaS0), min(lumaW, lumaE)), lumaM);
  let range = rangeMax - rangeMin;
  var result = cM;
  if (range >= max(${b6(Pg)}, rangeMax * ${b6(Hg)})) {
    let lumaNW = lume_edge_luma(lume_edge_texel(p + vec2<i32>(-1, -1), hi));
    let lumaNE = lume_edge_luma(lume_edge_texel(p + vec2<i32>(1, -1), hi));
    let lumaSW = lume_edge_luma(lume_edge_texel(p + vec2<i32>(-1, 1), hi));
    let lumaSE = lume_edge_luma(lume_edge_texel(p + vec2<i32>(1, 1), hi));
    let lumaNS = lumaN0 + lumaS0;
    let lumaWE = lumaW + lumaE;
    let edgeHorz = abs(lumaNW + lumaSW - 2.0 * lumaW) + 2.0 * abs(lumaNS - 2.0 * lumaM) + abs(lumaNE + lumaSE - 2.0 * lumaE);
    let edgeVert = abs(lumaNW + lumaNE - 2.0 * lumaN0) + 2.0 * abs(lumaWE - 2.0 * lumaM) + abs(lumaSW + lumaSE - 2.0 * lumaS0);
    let horzSpan = edgeHorz >= edgeVert;
    let subpixC = clamp(abs((2.0 * (lumaNS + lumaWE) + lumaNW + lumaNE + lumaSW + lumaSE) / 12.0 - lumaM) / range, 0.0, 1.0);
    let subpixF = (3.0 - 2.0 * subpixC) * subpixC * subpixC;
    let subpixH = subpixF * subpixF * ${b6(Yg)};
    let lumaN = select(lumaW, lumaN0, horzSpan);
    let lumaS = select(lumaE, lumaS0, horzSpan);
    let gradientN = lumaN - lumaM;
    let gradientS = lumaS - lumaM;
    let pairN = abs(gradientN) >= abs(gradientS);
    let gradientScaled = max(abs(gradientN), abs(gradientS)) * 0.25;
    let lumaNN = select(lumaS, lumaN, pairN) + lumaM;
    let lumaMLTZero = lumaM - lumaNN * 0.5 < 0.0;
    let acrossStep = select(vec2<i32>(1, 0), vec2<i32>(0, 1), horzSpan) * select(1, -1, pairN);
    let lumaAcross = select(lumaS, lumaN, pairN);
    let lumaFar = lume_edge_luma(lume_edge_texel(p + 2 * acrossStep, hi));
    let graded = lume_edge_between(select(lumaN, lumaS, pairN), lumaM, lumaAcross) || lume_edge_between(lumaM, lumaAcross, lumaFar);
    if (!graded) {
      let across = vec2<f32>(acrossStep) * texel;
      let along = select(vec2<f32>(0.0, texel.y), vec2<f32>(texel.x, 0.0), horzSpan);
      let posB = center + across * 0.5;
      var posN = posB - along * ${b6(e)};
      var posP = posB + along * ${b6(e)};
      var lumaEndN = lume_edge_line(posN) - lumaNN * 0.5;
      var lumaEndP = lume_edge_line(posP) - lumaNN * 0.5;
      var doneN = abs(lumaEndN) >= gradientScaled;
      var doneP = abs(lumaEndP) >= gradientScaled;
      if (!doneN) {
        posN = posN - along * ${b6(t)};
      }
      if (!doneP) {
        posP = posP + along * ${b6(t)};
      }
${r.map(Og).join(`
`)}
      let dstN = select(center.y - posN.y, center.x - posN.x, horzSpan);
      let dstP = select(posP.y - center.y, posP.x - center.x, horzSpan);
      let directionN = dstN < dstP;
      let goodSpan = select((lumaEndP < 0.0) != lumaMLTZero, (lumaEndN < 0.0) != lumaMLTZero, directionN);
      let pixelOffset = 0.5 - min(dstN, dstP) / (dstN + dstP);
      let t = max(select(0.0, pixelOffset, goodSpan), subpixH);
      let cAcross = select(select(cE, cW, pairN), select(cS, cN, pairN), horzSpan);
      result = lume_edge_blend(cM, cAcross, t);
    }
  }
  return result;
}`}var wg=Sg();var cV=20;var OVc=20;var UV=Object.freeze({composite:0,present:1,copy:2});var n2g=Object.freeze({catmullRom:0,nearest:1,sharp:2});var eV=(e)=>`@fragment fn fs(@builtin(position) position: vec4f) -> @location(0) vec4f {
${e.join(`
`)}
}`;function pfG(e,t){if(e.fill(0),e[7]=t===null?UV.copy:UV.present,t===null)return e;return e[8]=t.canvasW,e[9]=t.canvasH,e[10]=t.filterCut,e[11]=t.flashStrength,e[12]=t.flashAnchor,e[13]=t.kernel,e[14]=t.originX,e[15]=t.originY,e[16]=t.scaleX,e[17]=t.scaleY,e}function Upi(e){let t=e.filterCut>0.5?ZNz.bilinear:ZNz.catmullRom;if(e.kernel>1.5)t=ZNz.sharp;else if(e.kernel>0.5)t=ZNz.nearest;return ZNz.present|t|(e.flashStrength>0?ZNz.flash:0)}function M01(e){if(e===null)return ZNz.composite;let t;{t=Ga(e)}return t}var DV=24;var m63=(function(e){return OVc+e*cV+DV});var nV={bloom:!1,vocab:!1};function D13(e,t=nV,r=null,i=null,n=null,l=0){return Eid(new Float32Array(m63(e.length)),e,t,r,i,n,{lift:l})}var bV={lift:0};function Eid(e,t,r,i,n,l,s=bV){if(e.fill(0),e[0]=r.edge?1:0,e[1]=r.bloom?1:0,l!==null)e[2]=hK(l[0])?l[0]:0,e[3]=hK(l[1])?l[1]:0;e[4]=r.vocab&&i!==null?1:0;let o=s.lift;e[5]=o>0&&o-o===0?o:0,e[6]=i===null?1:i.exposure;for(let r=0;r<t.length;r+=1){let i=t[r],n=OVc+r*cV;e.set(i.visibleColor,n),e[n+3]=i.edgeStrength,e.set(i.hiddenColor,n+4),e[n+7]=i.opacity,e[n+8]=i.pulsePeriod,e[n+9]=i.blendOver,e[n+10]=i.edgeGlow,e[n+11]=i.outlineMode,e[n+12]=i.hiddenStrength,e[n+13]=hK(i.lineReach)&&i.lineReach>0?i.lineReach:0,e[n+14]=i.exactEdges===1?1:0,e[n+15]=i.hiddenCover??0;let l=i.fill??0;e.set(JMh(l),n+16),e[n+19]=(l>>>24)/255}if(r.vocab&&i!==null){let r=OVc+t.length*cV;e[r]=i.saturation,e[r+1]=i.contrast,e[r+2]=i.brightness,e[r+3]=i.temperature,e[r+4]=i.tint,e[r+5]=i.haze,e[r+6]=i.vignetteStrength,e[r+7]=i.vignetteRoundness,e[r+8]=n?.depthScale??1,e.set(i.hazeColor,r+12),e[r+15]=i.vignetteFeather,e.set(i.vignetteTint,r+16),e[r+19]=i.scanlines,e[r+20]=i.grain,e[r+21]=n!==null&&hK(n.near)?n.near:0.1,e[r+22]=n!==null&&hK(n.far)?n.far:1000,e[r+23]=Weq(n?.projection,n?.isOrthographic)}return e}function JMh(e){return[(e>>16&255)/255,(e>>8&255)/255,(e&255)/255]}var jV=`struct LookVocab {
  saturation: f32,
  contrast: f32,
  brightness: f32,
  temperature: f32,
  tint: f32,
  haze: f32,
  vignetteStrength: f32,
  vignetteRoundness: f32,
  cameraDepthScale: f32,
  hazeColor: vec3f,
  vignetteFeather: f32,
  vignetteTint: vec3f,
  scanlines: f32,
  grain: f32,
  cameraNear: f32,
  cameraFar: f32,
  cameraOrtho: f32,
};
`,MV="  let lume_toneIn = max(color * ((1.0 + u.eyeLift) * u.exposure), vec3f(0.0));",CV=`  if (frame.toneMap < -0.5) {
    if (frame.toneMap < -3.5) {
      color = lume_toneIn;
    } else if (frame.toneMap < -2.5) {
      color = lume_agx(lume_toneIn);
    } else if (frame.toneMap < -1.5) {
      color = lume_cineon(lume_toneIn);
    } else {
      color = lume_reinhard(lume_toneIn);
    }
  } else if (frame.toneMap > 1.5) {
    color = clamp(lume_toneIn, vec3f(0.0), vec3f(1.0));
  } else if (frame.toneMap > 0.5) {
    color = lume_pbr_neutral(lume_toneIn);
  } else {
    color = lume_aces_filmic(lume_toneIn);
  }`,AV=CV.replace(/^/gm,"  "),lV=`  if (frame.toneMap > -3.5 && frame.toneMap < 0.5) {
    let lume_toneIn = color / max(vec3f(1.0) - color, vec3f(1e-7));
${AV}
    color = clamp(color, vec3f(0.0), vec3f(1.0));
  }`,wV=`${MV}
  if (frame.toneMap > -3.5 && frame.toneMap < 0.5) {
    color = lume_toneIn / (lume_toneIn + vec3f(1.0));
  } else {
${AV}
  }`;function BV(e,t=["  color = lume_look_scripted(color, uv);"],r=!0){let i=[];if(e.scripted)i.push("  //"),i.push(...t);if(!r){if(e.scripted)i.push("  color = clamp(color, vec3f(0.0), vec3f(1.0));");return i}if(i.push("  //"),i.push("  if (u.vocabWord > 0.5) {"),i.push("    color = lume_look_vocabulary(color, uv);"),e.scripted)i.push("  } else {"),i.push("    //"),i.push("    color = clamp(color, vec3f(0.0), vec3f(1.0));");return i.push("  }"),i}var GV=`fn lume_flash_mitigate(color: vec3f) -> vec3f {
  let m = clamp(u.flashStrength, 0.0, 1.0);
  let keep = 1.0 - m;
  let anchor = vec3f(clamp(u.flashAnchor, 0.0, 1.0));
  return clamp(keep * keep * (color - anchor) + keep * anchor, vec3f(0.0), vec3f(1.0));
}`,kV=`fn lume_present_catmull_rom(uv: vec2f, texSize: vec2f) -> vec3f {
  let samplePos = uv * texSize;
  let texPos1 = floor(samplePos - 0.5) + 0.5;
  let f = samplePos - texPos1;
  let w0 = f * (-0.5 + f * (1.0 - 0.5 * f));
  let w1 = 1.0 + f * f * (-2.5 + 1.5 * f);
  let w2 = f * (0.5 + f * (2.0 - 1.5 * f));
  let w3 = f * f * (-0.5 + 0.5 * f);
  let w12 = w1 + w2;
  let offset12 = w2 / w12;
  let texPos0 = (texPos1 - 1.0) / texSize;
  let texPos3 = (texPos1 + 2.0) / texSize;
  let texPos12 = (texPos1 + offset12) / texSize;
  var result = vec3f(0.0);
  result = result + textureSampleLevel(colorTex, smp, vec2f(texPos0.x, texPos0.y), 0.0).rgb * (w0.x * w0.y);
  result = result + textureSampleLevel(colorTex, smp, vec2f(texPos12.x, texPos0.y), 0.0).rgb * (w12.x * w0.y);
  result = result + textureSampleLevel(colorTex, smp, vec2f(texPos3.x, texPos0.y), 0.0).rgb * (w3.x * w0.y);
  result = result + textureSampleLevel(colorTex, smp, vec2f(texPos0.x, texPos12.y), 0.0).rgb * (w0.x * w12.y);
  result = result + textureSampleLevel(colorTex, smp, vec2f(texPos12.x, texPos12.y), 0.0).rgb * (w12.x * w12.y);
  result = result + textureSampleLevel(colorTex, smp, vec2f(texPos3.x, texPos12.y), 0.0).rgb * (w3.x * w12.y);
  result = result + textureSampleLevel(colorTex, smp, vec2f(texPos0.x, texPos3.y), 0.0).rgb * (w0.x * w3.y);
  result = result + textureSampleLevel(colorTex, smp, vec2f(texPos12.x, texPos3.y), 0.0).rgb * (w12.x * w3.y);
  result = result + textureSampleLevel(colorTex, smp, vec2f(texPos3.x, texPos3.y), 0.0).rgb * (w3.x * w3.y);
  return result;
}`;function WV(e){let t=(t)=>(e&t)!==0;let r=[];let i=t(ZNz.present);let n=t(ZNz.composite);if(t(ZNz.copy))if(i||n)r.push("  if (u.mode > 1.5) {","    return vec4f(textureSampleLevel(colorTex, smp, (position.xy - u.presentOffset) / frame.viewportSize, 0.0).rgb + lume_dither_offset(position.xy), 1.0);","  }");else r.push("  return vec4f(textureSampleLevel(colorTex, smp, (position.xy - u.presentOffset) / frame.viewportSize, 0.0).rgb + lume_dither_offset(position.xy), 1.0);");if(!i)return r;let l=[];if(t(ZNz.sharp))l.push(["u.presentKernel > 1.5",["      let t = u.texelOrigin + position.xy / u.texelScale;","      let f = fract(t);","      let off = clamp((f - 1.0) * u.texelScale + 0.5, vec2f(0.0), vec2f(1.0)) - clamp(0.5 - f * u.texelScale, vec2f(0.0), vec2f(1.0));","      picture = textureSampleLevel(colorTex, smp, (floor(t) + 0.5 + off) / vec2f(textureDimensions(colorTex)), 0.0).rgb;"]]);if(t(ZNz.nearest))l.push(["u.presentKernel > 0.5",["      let puv = position.xy / u.canvasSize;","      picture = textureLoad(colorTex, clamp(vec2i(puv * vec2f(textureDimensions(colorTex))), vec2i(0), vec2i(textureDimensions(colorTex)) - vec2i(1)), 0).rgb;"]]);if(t(ZNz.bilinear))l.push(["u.filterCut > 0.5",["      picture = textureSampleLevel(colorTex, smp, position.xy / u.canvasSize, 0.0).rgb;"]]);if(t(ZNz.catmullRom))l.push(["",["      picture = lume_present_catmull_rom(position.xy / u.canvasSize, vec2f(textureDimensions(colorTex)));"]]);let s=["    var picture: vec3f;"];l.forEach(function([e,t],r){let i=r===l.length-1;if(l.length===1)s.push("    {");else if(r===0)s.push(`    if (${e}) {`);else s.push(i?"    } else {":`    } else if (${e}) {`);if(s.push(...t),i)s.push("    }")});if(t(ZNz.flash))s.push("    if (u.flashStrength > 0.0) {","      picture = lume_srgb_encode(lume_flash_mitigate(lume_srgb_decode(clamp(picture, vec3f(0.0), vec3f(1.0))))) + lume_dither_offset(position.xy);","    }");if(s.push("    return vec4f(clamp(picture, vec3f(0.0), vec3f(1.0)), 1.0);"),n)r.push("  if (u.mode > 0.5) {",...s,"  }");else r.push(...s);return r}var oV="vec4f(lume_srgb_encode(color) + lume_dither_offset(position.xy), 1.0)";function aV(e){return e>0?`struct OutlineSlot {
  visibleColor: vec3f,
  edgeStrength: f32,
  hiddenColor: vec3f,
  opacity: f32,
  pulsePeriod: f32,
  blendOver: f32,
  edgeGlow: f32,
  outlineMode: f32,
  hiddenStrength: f32,
  lineReach: f32,
  exactEdges: f32,
  cover: f32,
  fillColor: vec3f,
  fillOpacity: f32,
};
`:""}var OLz=`fn outlineMaskState(code: f32) -> vec3f {
  return step(vec3f(0.75, 0.25, 0.5), vec3f(code));
}
fn outlineMaskStateAt(mask: texture_2d<f32>, smp: sampler, uv: vec2f) -> vec3f {
  let dims = vec2f(textureDimensions(mask));
  let p = uv * dims - 0.5;
  let f = fract(p);
  let c = textureGather(0, mask, smp, (floor(p) + 1.0) / dims);
  return mix(mix(outlineMaskState(c.w), outlineMaskState(c.z), f.x), mix(outlineMaskState(c.x), outlineMaskState(c.y), f.x), f.y);
}
fn outlineMaskTexel(mask: texture_2d<f32>, at: vec2i) -> vec4f {
  let m = textureLoad(mask, at, 0);
  return vec4f(outlineMaskState(m.r), m.g / ${FI}.0);
}`,rV=YnC("u32(tap)",["vec2i(1, 0)","vec2i(1, 1)","vec2i(0, 1)","vec2i(-1, 1)","vec2i(-1, 0)","vec2i(-1, -1)","vec2i(0, -1)","vec2i(1, -1)"]),TV=12,uV=`fn lume_outline_depthTexel(mask: texture_2d<f32>, texel: vec2i) -> vec2f {
  return (vec2f(texel) + 0.5) / vec2f(textureDimensions(mask)) * vec2f(textureDimensions(depthTex)) - 0.5;
}
fn lume_outline_depthLoad(at: vec2i) -> f32 {
  return textureLoad(depthTex, clamp(at, vec2i(0), vec2i(textureDimensions(depthTex)) - vec2i(1)), 0).x;
}
fn lume_outline_slope(at: vec2i, step: vec2i) -> f32 {
  let before = lume_outline_depthLoad(at) - lume_outline_depthLoad(at - step);
  let after = lume_outline_depthLoad(at + step) - lume_outline_depthLoad(at);
  return clamp(before, min(after, 0.0), max(after, 0.0));
}
fn lume_outline_bandVisible(mask: texture_2d<f32>, uv: vec2f) -> f32 {
  let dims = vec2i(textureDimensions(mask));
  let origin = vec2i(uv * vec2f(dims));
  var reach = 1;
  loop {
    for (var tap = 0; tap < 8; tap += 1) {
      let direction = ${rV};
      let texel = outlineMaskTexel(mask, clamp(origin + direction * reach, vec2i(0), dims - vec2i(1)));
      if (texel.r < 0.5 && texel.g < 0.5) {
        let band = lume_outline_depthTexel(mask, origin);
        let cover = lume_outline_depthLoad(vec2i(band + 0.5));
        let shown = lume_outline_depthLoad(vec2i(lume_outline_depthTexel(mask, origin + direction * reach) + 0.5));
        if (frame.flatArt > 0.5 && shown > ${b6(_G)}) {
          return select(1.0, 0.0, bitcast<u32>(cover) > bitcast<u32>(shown) + ${PI}u);
        }
        let coverTexel = vec2i(select(select(ceil(band), floor(band), direction > vec2i(0)), round(band), direction == vec2i(0)));
        let plane = lume_outline_depthLoad(coverTexel);
        let slope = vec2f(lume_outline_slope(coverTexel, vec2i(1, 0)), lume_outline_slope(coverTexel, vec2i(0, 1)));
        var along = reach;
        loop {
          let at = origin + direction * along;
          if (any(at < vec2i(0)) || any(at >= dims)) {
            break;
          }
          let inside = outlineMaskTexel(mask, at);
          if (inside.r >= 0.5) {
            break;
          }
          if (inside.g < 0.5) {
            if (plane + dot(slope, lume_outline_depthTexel(mask, at) - vec2f(coverTexel)) - inside.a <= inside.a * ${b6(vI-1)}) {
              return 1.0;
            }
          }
          along += max(1, along / 4);
        }
        return 0.0;
      }
    }
    if (reach >= ${TV}) {
      break;
    }
    reach += max(1, reach / 4);
  }
  return 1.0;
}`,_V=`fn lume_outline_lineCoverage(mask: texture_2d<f32>, uv: vec2f, reach: f32) -> vec2f {
  let dims = vec2i(textureDimensions(mask));
  let origin = vec2i(uv * vec2f(dims));
  let last = i32(ceil(reach));
  var nearest = vec2f(1e9);
  for (var ring = 1; ring <= last; ring += 1) {
    if (f32(ring) >= max(nearest.x, nearest.y)) {
      break;
    }
    for (var tap = 0; tap < 8; tap += 1) {
      let texel = outlineMaskTexel(mask, clamp(origin + ${rV} * ring, vec2i(0), dims - vec2i(1)));
      let d = f32(ring) * select(1.0, 1.41421356, tap % 2 == 1);
      if (texel.r < 0.5) {
        nearest = min(nearest, vec2f(select(1e9, d, texel.g < 0.5), d));
      }
    }
  }
  return clamp(vec2f(reach + 1.0) - nearest, vec2f(0.0), vec2f(1.0));
}`;function gV(e){if(e<=0)return[];let t=["  var additiveOutline = vec3f(0.0);","  var lineColor = vec3f(0.0);","  var lineAlpha = 0.0;"];for(let r=0;r<e;r+=1)t.push(`  {
    let slot = u.slots[${r}];
    if (slot.outlineMode >= 0.0) {
      let edgeValue1 = textureSampleLevel(outlineEdge1Tex${r}, smp, uv, 0.0);
      let edgeValue2 = textureSampleLevel(outlineEdge2Tex${r}, smp, uv, 0.0);
      let maskColor = outlineMaskStateAt(outlineMaskTex${r}, smp, uv);

      let glowEdge = edgeValue1 + edgeValue2 * slot.edgeGlow;

      let edge1R = edgeValue1.r;
      let edge1G = edgeValue1.g;
      let edgeTexels = vec2f(textureDimensions(outlineEdge1Tex${r})) / frame.viewportSize;
      let aa = min(max(edgeTexels.x, edgeTexels.y), 1.0) * 0.5;
      let sharpR = smoothstep(0.5 - aa, 0.5 + aa, edge1R);
      let sharpG = smoothstep(0.5 - aa, 0.5 + aa, edge1G);
      let crispEdge = vec4f(sharpR, sharpG, 0.0, 0.0);

      let edgeValue = mix(glowEdge, crispEdge, slot.outlineMode);
      let unquantizedEdges = edgeValue * vec4f(select(maskColor.r, maskColor.r + maskColor.g * (1.0 - maskColor.r), slot.outlineMode > 0.5), vec3f(maskColor.r));
      let quantizedEdges = select(unpack4x8unorm(pack4x8unorm(unquantizedEdges)), clamp(unquantizedEdges, vec4f(0.0), vec4f(1.0)), slot.exactEdges > 0.5);
      var bandVisible = 1.0;
      if (quantizedEdges.r > 0.0 && slot.outlineMode > 0.5) {
        bandVisible = lume_outline_bandVisible(outlineMaskTex${r}, uv);
      }
      var edges = vec4f(quantizedEdges.r * bandVisible, quantizedEdges.gba);
      if (slot.lineReach > 0.0 && edges.r + edges.g > 0.0) {
        let line = lume_outline_lineCoverage(outlineMaskTex${r}, uv, slot.lineReach);
        edges = vec4f(edges.rg * line, edges.ba);
      }

      let osc = sin(frame.time / max(slot.pulsePeriod, 1e-4) * 2.0 * 6.28318530718) * 0.5 + 0.5;
      let pulse = select(1.0, osc * 0.2 + 0.8, slot.pulsePeriod > 0.0);
      let edgeTotal = edges.r + edges.g;
      if (slot.blendOver > 1.5) {
        let lineCoverage = edges.r * slot.opacity * pulse;
        lineColor = lineColor * (1.0 - lineCoverage) + lume_srgb_decode(slot.visibleColor) * lineCoverage;
        lineAlpha = lineAlpha * (1.0 - lineCoverage) + lineCoverage;
      } else {
        let coverage = clamp(edges.r * slot.edgeStrength + edges.g * slot.hiddenStrength, 0.0, 1.0) * slot.opacity * pulse * slot.blendOver;
        let edgeMixDenominator = max(edgeTotal, 1e-4);
        let overColor = slot.visibleColor * (edges.r / edgeMixDenominator) + slot.hiddenColor * (edges.g / edgeMixDenominator);
        color = mix(color, overColor, coverage);
        additiveOutline = additiveOutline + (edges.r * slot.visibleColor * slot.edgeStrength + edges.g * slot.hiddenColor * slot.hiddenStrength) * slot.opacity * pulse * (1.0 - slot.blendOver);
      }
      if (slot.cover > 0.0) {
        let cover = edges.g * slot.cover * pulse;
        lineColor = mix(lineColor, lume_srgb_decode(slot.hiddenColor), cover);
        lineAlpha = mix(lineAlpha, 1.0, cover);
      }
      if (slot.fillOpacity > 0.0) {
        let fillCoverage = (1.0 - maskColor.r) * maskColor.b * slot.fillOpacity;
        lineColor = mix(lineColor, lume_srgb_decode(slot.fillColor), fillCoverage);
        lineAlpha = mix(lineAlpha, 1.0, fillCoverage);
      }
    }
  }`);return t.push("  color = color + additiveOutline;"),t}var XV=(function(e){return e>0?["  color = color * (1.0 - lineAlpha) + lineColor;"]:[]});function IPh(e,t){let r=aV(e.outlineSlots);let i=Cx2(e.lutColumns??tcX);let n=[`struct CompositeUniforms {
  ${e.edge?"edgeWord":"_pad"}: f32,
  bloomWord: f32,
  presentOffset: vec2f,
  vocabWord: f32,
  eyeLift: f32,
  exposure: f32,
  mode: f32,
  canvasSize: vec2f,
  filterCut: f32,
  flashStrength: f32,
  flashAnchor: f32,
  presentKernel: f32,
  texelOrigin: vec2f,
  texelScale: vec2f,${e.outlineSlots>0?`
  slots: array<OutlineSlot, ${e.outlineSlots}>,`:""}
  look: LookVocab,
};
@group(1) @binding(${QRg.uniforms}) var<uniform> u: CompositeUniforms;`,`@group(1) @binding(${QRg.sampler}) var smp: sampler;`,`@group(1) @binding(${QRg.color}) var colorTex: texture_2d<f32>;`,`@group(1) @binding(${QRg.bloom}) var bloomTex: texture_2d<f32>;`,`@group(1) @binding(${QRg.depth}) var depthTex: texture_2d<f32>;`,`@group(1) @binding(${QRg.aperture}) var apertureTex: texture_2d<f32>;`];if(VgZ(e.lut))n.push(`@group(1) @binding(${Awv}) var gradeLut: texture_2d<f32>;`);let l=u6$;for(let t=0;t<e.outlineSlots;t+=1)n.push(`@group(1) @binding(${l}) var outlineEdge1Tex${t}: texture_2d<f32>;`),n.push(`@group(1) @binding(${l+1}) var outlineEdge2Tex${t}: texture_2d<f32>;`),n.push(`@group(1) @binding(${l+2}) var outlineMaskTex${t}: texture_2d<f32>;`),l+=3;if(e.scripted)n.push(`${e.scripted.uniformStructWgsl}
@group(1) @binding(${E6m(e.outlineSlots,e.lut)}) var<uniform> lookScript: LookScript;`);let s=y18(e);let o=HZa(e);let a=(s&ZNz.vocab)!==0;let u=o?WV(s):[];let d=o?[...(s&ZNz.present)!==0&&(s&ZNz.flash)!==0?[GV]:[],...(s&ZNz.catmullRom)!==0?[kV]:[]]:[];if((s&ZNz.composite)===0)return j6([V0.trim(),jV+n.join(`
`),jcL.trim(),...d,xv5.trim(),eV(u)]);u.push("  let uv = (position.xy - u.presentOffset) / frame.viewportSize;",e.edge?`  var color: vec3f;
  if (u.edgeWord > 0.5) {
    color = lume_edge_smooth(uv);
  } else {
    color = textureSampleLevel(colorTex, smp, uv, 0.0).rgb;
  }`:"  var color = textureSampleLevel(colorTex, smp, uv, 0.0).rgb;",`  if (u.bloomWord > 0.5) {
    color = color + clamp(textureSampleLevel(bloomTex, smp, uv, 0.0).rgb, vec3f(0.0), vec3f(65504.0));
  }`);u.push(...gV(e.outlineSlots));if(e.lut==="bake")u.splice(0,u.length,P_(i),lV,...BV(e),`  return vec4f(lume_srgb_encode(color), ${Z_});`);else if(e.lut==="apply")u.push(wV,"  return vec4f(lume_grade_lut(color) + lume_dither_offset(position.xy), 1.0);");else if(e.lut==="prefix")u.splice(0,u.length,P_(i),lV,"  color = lume_look_scripted_prefix(color);",`  return vec4f(sqrt(max(color, vec3f(0.0))), ${Z_});`);else if(e.lut==="split"){let t=["  let held = lume_grade_lut(color);","  color = lume_look_scripted_tail(held * held, uv);"];u.push(wV,...BV(e,t,a),`  return ${oV};`)}else {u.push(MV,CV,...BV(e,void 0,a));u.push(...XV(e.outlineSlots));u.push(`  return ${oV};`);}let f=[V0.trim(),jV+r+n.join(`
`),jcL.trim(),...e.edge?[wg]:[],...e.outlineSlots>0?[OLz,uV,_V]:[],...VgZ(e.lut)?[r_(i)]:[],...d,...t];return f.push(xv5.trim(),eV(u)),j6(f)};
Object.defineProperties($Lr,Object.getOwnPropertyDescriptors({$Md,$W7:m$U,A$j:$fZ,A2h:ZfF,AP1:WXl,AsH,B4L:W3c,BQN:IvU,BTK:oEY,BUt:GeR,BZX:R9Y,Bcl:Sli,CLW:dPm,CeN,CiN:GGz,Cx2,Cxx:Pjc,D$6:i5Y,Dcs:yA7,DzA:PHn,E$X:bmt,EGw:kgt,EWH:sgI,Eid,F9f:Xk9,FHn,FYI:rQN,Faf,FdJ:kF8,Fme,G86:ARi,GC1:yVV,Gms:YOt,HOK,HgB,I8D:Vmd,IF2:swB,IKK:A0Q,IM2:Rug,IMI:ZlW,IPh,IoQ:g3l,IrB,Isj:CZL,JDa,JMh,JZG:jzN,Jj3,K1c:D13,KJw:pZo,KUl:sYx,KkB:PKU,Kka,Kzs:pZC,LiF:TVA,M01,MQv,MZO:GpZ,MdE:kYF,MsI:apw,Msp,MyL:zDP,N0l,NIj:JSa,Ne4,OEc,OVc,OrY:vvB,PEn:s6t,PVR:Cnl,Pij:yvj,PpZ,QAe,Qjs,R2P:GV$,RCa,RhE:buF,S0E:JjE,SHf:D2Z,STE,SaH:RIa,SgW,SnZ,Snu:chx,SwO:GFv,T0i:qB8,TDD,TYm,U5l,UG8:Xqo,UHo,UpA,Upi,UyG:OLz,V3k:$lB,VKK:aG3,VOf,VTj:kvC,VcF,WCw,WgZ:b55,XBV,YaV:uyx,Z0b,Z6U,ZDx:_Xp,ZKu:hIm,_N5:TIs,a9F,aGl:sFk,b0K:eED,bZ8,cPr:NQf,cW$:JgA,cYT:L9b,cc6,dBW:iLu,dOG:NpZ,drP:lTS,eAn:SoG,eR$:dIJ,eW_:Y9V,esB,fUi,gUZE,gh3,h1H:eKZ,hE5,hL$:H2j,hOy:c5d,hrY:W2I,i$T,iHX:oxt,iT9,iYu:DKL,j0X,jXNz,jox:HvB,jwE:zO6,k75,kTk,kb_:Kuk,koI,l4c:VYZ,l8K,lTD,lYm,lr0:Eob,lsz:h4K,m63,mub,n2g,nB0,neA:$Gm,nuG,nwF:ZGj,o4G,o92:ex7,oCY,oNr,opK:i1I,ouX:mDm,pfG,pl9,pvq:TMK,q05:bPE,q7O,rGH,r_c:JQ$,ry0:E$G,rzw,s14:fSP,scE,srK,tDq:fqL,tcX,trm:ksJ,u9f,uPA:k8y,ukD:GFF,uzb,vHI:lab,vJz,vMB:WZk,wKM,wXP,wrt,x$i:T_2,x12:u9m,xZb,xu0:TUB,xzy,y5n:bgY}));

function Q(t){let r=t.retiring;for(let e of r)e.destroy();r.length=0,t.retiring=t.retired,t.retired=r
}
function aa(e,t,n,l,r,i){for(let r of $2){if(r.device!==e)continue;let i=N2(e,t,r);if(i===null)continue;for(let e of i)n.push(e);$2.delete(r),l+=1}if(n.length>0)r.addCompute(Y2,i===void 0?{dispatches:n}:{dispatches:n,measured:i});
return l}






function ka(t,e,r){for(let i of (ay.values())){if(!t.draws(i.entityId,i.part))continue;let n=Ay(t,i.entityId,i.part);if(n.length===0)continue;let l=!1;for(let t=0;t<n.length;t+=1){let s=n[t];let o=s.motionSource===void 0?void 0:{scope:s.motionSource.ctx.library.placeBuffers};let a=Py(e,s,i,o);let u=dy(e,s,i,o);r+=a.landed+u.landed,l||=a.named||u.named}if(!l){let e=i.part===null?"material":`model.parts[${JSON.stringify(i.part)}]`;m2(`${i.entityId}:${i.part??""}:${i.name}:unnamed`,`${e}.buffers.${i.name} = numbers: this material names no texture or buffer ${JSON.stringify(i.name)}; name one in its script with texture.name = ${JSON.stringify(i.name)} or instancedArray(...).setName(${JSON.stringify(i.name)})`)}}
return r}
function ma(e,l){rU.set(e,l={id:null,sinceMs:0,frames:0,told:new Set});
return l}
function oa(l,t,n,r,i){l.told.add(t),rT.warn(`[models] ${n} ${t} drew nothing for ${Math.round(r-l.sinceMs)} ms over ${l.frames} frames while it stands in view with the camera outside it: ${i()}`)
}
function pa(i,t,r,e){if(++i.frames===1){return ea}if(!i.back&&t(r,i.visual)){if(!i.counted&&e-i.sinceMs>=HU){i.counted=!0;SU(i.into,`${i.word} 500ms+`);}{return ea}}this.open.delete(r);if(!i.counted){SU(i.into,`${i.word} ${i.back?IU(i.frames-1,e-i.sinceMs):"out"}`)}
}
function qa(r,e,i,n){return{planes:JLE(r),camX:e.position[0],camY:e.position[1],camZ:e.position[2],forwardX:i,forwardZ:n,lensScale:e.projection[5],orthographicWeight:Weq(e.projection)}
}
function ra(e,i,n,l,r){let u=e.secondEyes;if(u===void 0)return!0;for(let e=0;e<u.length;e+=1){let t=u[e],s=i-t[0],o=n-t[1],a=l-t[2];if(s*s+o*o+a*a<=r)return!1}
return ca}
function sa(e){return(e.secondViews!==void 0&&e.secondViews.length>0)}
function ta(e){return(e.secondViews!==void 0&&e.secondViews.length>0)}
function ua(i,t,r){return oI8(i.projection,t,pC),JLE(_S$(pC,i.view,YC),VC),Dl_(VC,r)
}
function va(e,t){let r=e.lensEye??={view:new Float32Array(16),projection:new Float32Array(16)};r.view.set(t.camera.view),r.projection.set(t.camera.projection)
}
function wa(r,t,e){r.set(t);for(let t=0;t<4;t+=1)r[t*4+2]=e[t*4+2];
}
function xa(r,e,t){if(r.color===void 0)e[t]=-1,e[t+1]=r.warm??0,e[t+2]=r.lightness??dr;else{nCD(e,t,r.color);for(let r=0;r<3;r++)e[t+r]=Math.min(Math.max(e[t+r],0),Rr)}e[t+3]=(r.width??Aiy);Ur=Math.max(Ur,e[t+3])
}
function ya(t){return(t.byEntityId.size>0||t.spriteOutlines.size>0||t.groups.length>0)}
function Aa(t,e,r){let i=new Set(t.map((e)=>e.key)),n=e.filter((e)=>e.entities.length>0&&!i.has(e.key));if(n.length===0)return;let l=n.slice(0,BI).map((e)=>`#${e.style.visibleColor.toString(16).padStart(6,"0")}`),s=`${r}:${n.length}:${l.join(",")}`;
return za[0]=n,za[1]=l,za[2]=s,ca}
function Ba(s,l,n,t,r){cI.add(s);let o=$I(l,n.length,n.length+t.length,r);or.warn(o),QK({code:"outline-slots-exhausted",key:`outline-slots:${s}`,message:o,data:{maxSlots:String(r),droppedStyles:l.join(",")}})
}


function Ea(r,e,t){if(typeof r==="number"){if(IK(r))return;XQ(e,t,`is ${String(r)}. ${eQ}`)}XQ(e,t,`must be a plain number or a shader node (a ctx.param() / builtin/tsl expression), got ${dQ(r)}.`)
return ca}
function Fa(t){return((t.match(/\bscreenUv\b/g)??[]).length===1)}
function Ga(e){let t=ZNz.composite|ZNz.vocab;if(e.contrast!==1)t|=ZNz.contrast;if(e.haze>0)t|=ZNz.haze;if(e.scanlines!==0)t|=ZNz.scanlines;if(e.grain!==0)t|=ZNz.grain;if(e.vignetteStrength>0)t|=ZNz.vignette;
return t}
function ca(){}var da;function ea(){}var la;function za(){}

;import{R as $Lr}from"./52e971dc2a986655.mjs";export{$Gm,$Md,$fZ,$lB,A0Q,ARi,AsH,CZL,CeN,Cnl,Cx2,D13,D2Z,DKL,E$G,Eid,Eob,FHn,Faf,Fme,GFF,GFv,GGz,GV$,GeR,GpZ,H2j,HOK,HgB,HvB,IPh,IrB,IvU,JDa,JMh,JQ$,JSa,JgA,Jj3,JjE,Kka,Kuk,L9b,M01,MQv,Msp,N0l,NQf,Ne4,NpZ,OEc,OLz,OVc,PHn,PKU,Pjc,PpZ,QAe,Qjs,R9Y,RCa,RIa,Rug,STE,SgW,Sli,SnZ,SoG,TDD,TIs,TMK,TUB,TVA,TYm,T_2,U5l,UHo,UpA,Upi,VOf,VYZ,VcF,Vmd,W2I,W3c,WCw,WXl,WZk,XBV,Xk9,Xqo,Y9V,YOt,Z0b,Z6U,ZGj,ZfF,ZlW,_Xp,a9F,aG3,apw,b55,bPE,bZ8,bgY,bmt,buF,c5d,cc6,chx,dIJ,dPm,eED,eKZ,esB,ex7,fSP,fUi,fqL,g3l,gUZE,gh3,h4K,hE5,hIm,i$T,i1I,i5Y,iLu,iT9,j0X,jXNz,jzN,k75,k8y,kF8,kTk,kYF,kgt,koI,ksJ,kvC,l8K,lTD,lTS,lYm,lab,m$U,m63,mDm,mub,n2g,nB0,nuG,o4G,oCY,oEY,oNr,oxt,pZC,pZo,pfG,pl9,q7O,qB8,rGH,rQN,rzw,s6t,sFk,sYx,scE,sgI,srK,swB,tcX,u9f,u9m,uyx,uzb,vJz,vvB,wKM,wXP,wrt,xZb,xzy,yA7,yVV,yvj,zDP,zO6};
