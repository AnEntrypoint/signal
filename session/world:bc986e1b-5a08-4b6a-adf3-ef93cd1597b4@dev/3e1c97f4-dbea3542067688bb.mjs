var $c0F,$c0N=[],$c0T=[function(){return[()=>"(function(e,t){let r=e.gpu;if(!r)return;if(r.unhearDeleted(),$ox(r,t),r.stars?.points.destroy(),r.stars=null,QKZ(r),r.equirectEnvironment?.destroy(t),r.equirectEnvironment=null,r.scriptParams)Jku(r.scriptParams);if(r.scriptParams=null,r.standingScript)Jku(r.standingScript.params);r.standingScript=null;for(let e of r.captureFaces?.buffers??[])e.destroy();r.captureFaces=null,r.offscreenFaceBindGroups?.slot.destroy(),r.offscreenFaceBindGroups=null;for(let e of[{rays:r.horizonRays,out:r.horizonOut},r.mirror])e?.rays?.destroy(),e?.out?.words.rays.destroy(),e?.out?.words.mean.destroy();r.horizonRays=null,r.horizonOut=null,r.mirror=null,r.skyBuffer.destroy(),r.backgroundBuffer.destroy(),r.placeholderStorage.destroy();for(let e of r.placeholders)e.destroy();e.gpu=null})",()=>"(function(e,t,r){let i=Math.min(e,e+t),n=Math.max(e,e+t),l=Math.max(Math.min(n,0)-i,0),s=Math.max(n,0)-Math.max(i,0);if(l+s<0.001)return Math.exp(-r*Math.max(e,0));let o=r*s,a=Math.exp(-r*Math.max(i,0))*(o<0.001?1-0.5*o:(1-Math.exp(-o))/o);return(l+s*a)/(l+s)})",()=>"(function(e,t,r){if(e[PQ.viewFogNear/4]!==Math.fround(t?.near??0)||e[PQ.viewFogFar/4]!==Math.fround(t?.far??0)||e[PQ.viewFogAmount/4]!==Math.fround(t?.amount??0))return!1;let i=t?.bound,n=PQ.viewFogCenter/4,l=PQ.viewFogExtent/4;if(e[n+3]!==Math.fround(i?.start??0)||e[l+3]!==(i?1:0))return!1;for(let t=0;t<3;t+=1){let s=i?i.center[t]-(r?.camera.position[t]??0)-(r?.renderOrigin?.[t]??0):0;if(e[n+t]!==Math.fround(s)||e[l+t]!==Math.fround(i?.halfExtent[t]??0))return!1}return!0})",()=>'(function(e,t,r,i,n=cX(t)){if(!j4(t)||MX.has(n))return!1;let l=e.slice(lyv.length+1);if(n===t){return iX(l,n,t,r);}let s=`${l}\n${n}`;if(WX.has(s))return!0;let o=JX(l)[0]?.active??bX(l);if(!o)return!0;let a={script:o,lane:n,pipelineKey:t,word:RL(r,CX),decided:!1};WX.set(s,a);nX(o.hash,n,!0);dU.warn(`[lighting-script] a lit surface\'s shader (${t.slice(0,80)}) failed to build with "${o.ref}" in its text; the standard lighting shades ${LX(n)} while every other surface keeps the script, and the same shader built without it is the verdict. The compiler\'s word: ${a.word}`);if(lX.has(n)||i?.((L4(t)??t.replace(/\\/light\\/[^/]+/,"")))===!0)_X(a);return!0})',()=>"(function(e,t,r,i){if(YX.has(e))return!1;if(DX.has(e)||kX.has(e))return!0;let n=JX(e),l=n[0]?.active;if(!l)return!0;let s=RL(i,CX);kX.set(e,{script:l,lane:t,pipelineKey:r,word:s,states:n});for(let e of n){{let e$3=e;{let e=e$3;let t=e.active;e.active=e.previous,e.previous=null,e.generation+=1,oX(t,e.active),tX(e)}}}return dU.warn(`[lighting-script] a lit surface's shader (${r.slice(0,80)}) failed to build with \"${l.ref}\" in its text; the previous lighting stands while the same shader builds without it, and that build is the verdict. The compiler's word: ${s}`),!0})",()=>'(function(e){e.decided=!0;let{script:t,lane:r,pipelineKey:i,word:n}=e,l=LX(r),s=`${RX(t)}\n${l}`;if(HX.has(s))return;HX.add(s);let o=`Lighting script "${t.ref}" does not compile on this device for ${l}; the same shader compiles without it, so the engine\'s lowering is at fault, not your logic. Here the standard lighting shades ${l} until your next edit of ${QX.has(r)?"either script":"the script"}; the rest of the world keeps your script. The compiler\'s word: ${n}`;dU.warn(`[lighting-script] ${o}`),t8({code:tLD,key:`scripted-lighting:${L6(t.ref)}:${l}`,message:o,data:{scriptRef:t.ref,surface:l,pipelineKey:i,error:n}})})']},function(){return[()=>"(function(e){WX.delete(`${RX(e.script)}\n${e.lane}`),nX(e.script.hash,e.lane,!1),dU.warn(`[lighting-script] the same shader (${e.pipelineKey.slice(0,80)}) failed to build without \"${e.script.ref}\" in its text: the failure is the device's, never the script's; the script shades ${LX(e.lane)} again`)})",()=>"(function(e,t){kX.delete(e),DX.add(e),AX.set(e,t);let{script:r,pipelineKey:i,word:n}=t,l=`Lighting script \"${r.ref}\" did not compile on this device for a lit surface's shader (${i.slice(0,80)}); the same shader compiles without it, so the engine's lowering of this script is at fault here, not your logic. The world shades with the previous lighting on this device until your next edit of the script. The compiler's word: ${n}`;dU.warn(`[lighting-script] ${l}`),t8({code:tLD,key:`scripted-lighting:${r.ref}`,message:l,data:{scriptRef:r.ref,pipelineKey:i,error:n}})})",()=>'(function(e,t){kX.delete(e),YX.add(e);for(let e of t.states){zX:{let e$4=e,t$3=t.script;{let e=e$4,t=t$3;if(e.active===t)break zX;e.previous=e.active,e.active=t,e.generation+=1,oX(e.previous,t),tX(e)}}}dU.warn(`[lighting-script] the same shader (${t.pipelineKey.slice(0,80)}) failed to build without "${t.script.ref}" in its text: the failure is the device\'s, never the script\'s; "${t.script.ref}" stands again`)})',()=>"(()=>(/^fn lighting_cascadeShadowPrepared\\(P: vec3<f32>, positionDx: vec3<f32>, positionDy: vec3<f32>, shadingNormal: vec3<f32>, viewDepth: f32, fragCoord: vec2<f32>\\) -> f32 \\{\\s*return ([^;{}]*) \\* lighting_cellSun\\(P, shadingNormal\\);\\s*\\}$/))",()=>'(function(e){let t=new Set(["lighting_cellRead"]);for(let r=!0;r;){r=!1;for(let[i,n]of e){if(t.has(i))continue;for(let e of f7(n.slice(n.indexOf("{")))){if(!t.has(e))continue;t.add(i),r=!0;break}}}return t})',()=>'(function(e,t,r){let i=[...f7(e)],n=new Set;for(let e=i.pop();e!==void 0;e=i.pop()){if(n.has(e))continue;if(n.add(e),r.has(e)||kz.test(e))return!1;let l=t.get(e);if(l===void 0)continue;if(kz.test(l.slice(l.indexOf("{"))))return!1;i.push(...f7(l.slice(l.indexOf("{"))))}return!kz.test(e)})',()=>'(function(e,t){if(!e.includes("fn lighting_cellRead("))return null;let r=t.indexOf(m7),i=r<0?-1:t.indexOf(S7,r);if(i<0||t.slice(r,i).includes(`\n}`))return null;let n=new Map;N7(e,n),N7(t,n);let l=(Jz??=$c0I(9)).exec(n.get("lighting_cascadeShadowPrepared")??"");let s=wz(n);if(l===null||!a7(l[1],n,s)||!a7(t.slice(r+m7.length,i),n,s))return null;let o=`  lighting_cellRead(P, vec3<f32>(0.0, 1.0, 0.0));\n`,a=e.replace(iGe,"");if(a.includes(m7)){let e=t.slice(r,i+S7.length);if(a=a.split(e).join(`${t.slice(r,i)}${o}${t.slice(i,i+S7.length)}`),a.split(m7).length!==a.split(`${o}${S7}`).length)return null}return{reach:s,defs:a,query:`${t.slice(0,i)}${o}${t.slice(i)}`}})',()=>"(function(e,t){if(!t||t.strength<=0)return;ew(),rV(e,PQ.cloudSeaSun,t.sun),e[PQ.cloudSeaSun/4+3]=t.thicknessM,rV(e,PQ.cloudSeaColor,t.color),e[PQ.cloudSeaColor/4+3]=Math.min(1,t.strength),rV(e,PQ.cloudSeaSunDirection,t.sunDirection),e[PQ.cloudSeaSunDirection/4+3]=t.saturation,rV(e,PQ.cloudSeaMap,t.map)})",()=>"(function(e,t,r){let i=Math.min(r.count,I6);t[PQ.cascadeCount/4]=i,e[PQ.clusterDepth/4+2]=r.mapSize>0?1/r.mapSize:0;let{texelWorld:n,depthRange:l}=r;for(let t=0;t<i;t++){if(e.set(r.matrices[t],PQ.cascadeMatrices/4+t*16),e[PQ.cascadeSplits/4+t]=r.splits[t],e[PQ.cascadeBias/4+t]=r.bias[t],e[PQ.cascadeNormalBias/4+t]=r.normalBias[t],e[PQ.cascadeRadius/4+t]=r.radius[t],n&&t<n.length)e[PQ.cascadeTexelWorld/4+t]=n[t];if(l&&t<l.length)e[PQ.cascadeDepthRange/4+t]=l[t]}e[PQ.sunShadowFar/4]=r.shadowFar})"]},function(){return[()=>"(function(e){return Vj7(e.replace(TQ,ZQ(Fw)).replace(eQ,nQ(nw)).replace(jWZ,`${jWZ}\n  if (!${uw}) {\n    return vec3<f32>(0.0);\n  }`).replace(h7,`  let intensity = select(0.0, passLights.iblParams.x, ${Vw});`).replace(Dz,`    if (${N6} && i > globals) {`))})",()=>'(function(e,t,r){let i=e&&r;return`fn lighting_evaluateResolvedAtSun(N: vec3<f32>, V: vec3<f32>, P: vec3<f32>, albedo: vec3<f32>, pixelRoughness: f32, metalness: f32, occlusion: f32, fragCoord: vec2<f32>, receiveShadow: f32, positionDx: vec3<f32>, positionDy: vec3<f32>${t?", Ng: vec3<f32>":""}${i?", surfaceAttribute: u32":""}, sunShadow: f32) -> vec3<f32> {\n  lighting_cloudPrepare(P);\n  let groundedOcclusion = occlusion * lighting_groundOcclusion(P, N);\n  let reflected = ${e?`lighting_scriptedPrepared(N, V, P, albedo, pixelRoughness, metalness, groundedOcclusion, fragCoord, receiveShadow, positionDx, positionDy${`${t?", Ng":""}${i?", surfaceAttribute":""}`}, sunShadow)`:"lighting_evaluateWithSunShadow(N, V, P, albedo, pixelRoughness, metalness, groundedOcclusion, fragCoord, receiveShadow, lighting_viewDepth(P), sunShadow, positionDx, positionDy)"}${i7("CELL_LIGHT_GLOW_TERM_WGSL")};\n  return ${P7};\n}`})',()=>"(function(e){let t=new Map,r=new Map,i=(e)=>e.replace(Zz,function(e,i){let n=t.get(e);if(n===void 0)n=r.get(i)??0,r.set(i,n+1),t.set(e,n);return`shade_${i}_${n}`});return[i(e[0]),e[1]===void 0?void 0:i(e[1])]})",()=>"(function(e,t){if(Oz?.defs!==e.wgslDefs||Oz.smaller!==t.wgslDefs){let r=new Map(XK(t.wgslDefs).map((e)=>[e.name,e.text])),i=XK(e.wgslDefs).flatMap((e)=>e.name!==null&&r.get(e.name)!==e.text?[e.name]:[]);return _(e,t,i);}return Oz.names})",()=>"(function(e){let t=d2.get(e.signature);if(t!==void 0){P2(e.signature,t);}let r=dH1(e.definition);d2.set(e.signature,{definition:e.definition,paint:e.paint,bounds:e.bounds,bytes:r,at:sK()}),h2+=r;let i=sK();for(let[e,t]of d2){if(h2<=Y2&&i-t.at<=T2)break;P2(e,t)}})",()=>'(function(e){if(typeof e!=="object"||e===null)return!1;let t=e;return t.kind==="mesh"&&typeof t.signature==="string"&&typeof t.definition==="object"&&t.definition!==null&&t.definition.positions instanceof Float32Array&&t.definition.signature===t.signature})',()=>"(function(e,t=null){return M5?M5.readGroundTruthDump(e,t):Promise.resolve({scenes:e.map(({worldId:e,key:t,presented:r})=>({worldId:e,key:t,presented:r,eye:null,skyline:null,pools:[],undrawn:[],error:null}))})})",()=>"(function(e,t,r){let i=()=>r.pipelines.warmScope(()=>e.warmWaterPipelines(t,r.device,r.pipelines,[...r.hints.values()]),r.lane),n=r.own?()=>r.pipelines.placeOwnScope(i):i;if(r.calm)r.pipelines.calmScope(n,r.held);else n()})",()=>'(function(e,t=!1){if(this.deadline!==null)clearTimeout(this.deadline);this.deadline=null,this.idle.disarm();let r=this.ready;if(this.endWorker(),this.rested=!1,this.keep.died(),!r)this.falls+=1;if(t||this.falls>=$E)this.down=!0;let i=[...this.asked.values()];this.asked=xK(this.asked),this.outbox=[],this.warmHeld=[],this.warmOut=xK(this.warmOut);for(let t of i)this.pendingKeys.delete(t),this.land(t,uE(e));if(!this.down)this.stand();IV.warn(`[renderer] material builder: ${e}; ${i.length} ask(s) build in place${this.down?", and every ask does from now on":"; a new helper stands"}`)})']},function(){return[()=>"(function(e,t){this.crossing.heldChars-=this.crossing.held.get(e)??0,this.crossing.held.delete(e),IV.warn(`[renderer] the material builder's helper could not hold ${e} (${t}): it crosses whole with its next ask`),this.idle.edge()})",()=>'(function(){let e=this.worker;if(this.worker=null,this.ready=!1,this.lifeWatch?.abort(B6("the builder ended the helper, so its life lock coming free is no fall")),this.lifeWatch=null,e!==null)VE?.ended(e);if(this.crossing={held:new Map,heldChars:0},this.detach?.(),this.detach=null,this.forgetEnder?.(),this.forgetEnder=null,this.forgetMark?.(),this.forgetMark=null,e===null||t6())return;try{e.postMessage({kind:"dispose"})}catch{}b6(e)})',()=>"(function(e,t){let r=UZ.get(e);return r===void 0?null:{inputAgoMs:t-r.inputAtMs,inputBy:r.inputBy,busyAgoMs:t-r.busyAtMs,busyBy:r.busyBy,measureBusyAgoMs:t-r.measureBusyAtMs,stepAgoMs:t-r.stepAtMs}})",()=>"(function(e,t){let r=yZ.get(e),i=[...r?.owed??[]].filter(([,e])=>t===void 0||e.kind===t).map(([e])=>e),n=r?.asked??[];return{owed:i,asked:t===void 0?n:n.filter((e)=>e.kind===t),turn:r?.turn?.key??null}})",()=>'(function(e){let t=e.peekStore(xdq);if(!t)return null;let r={},i=[];for(let e of t.cells.values()){let n=r[e.placeKey]??=[0,0,0,0];n[Math.min(Math.max(e.ring,Vvf),Elv)]+=1;let l=t.byCoord.get(RcZ(e.cx,e.cz))===e;let s;E8:{let e$11=t,t$9=e,r$2=l;{let e=e$11,t=t$9,r=r$2;if(e.ownPlace!==null&&t.placeKey!==e.ownPlace){s="other-place";break E8;}if(e.leaving.has(t.key)){s="leaving";break E8;}if(r&&J9P(t.tableRing)==="mesh"&&t.meshHide!==0&&!e.fades.has(t.key)){s="hidden-near";break E8;}s=null;}}if(s!==null)i.push({key:e.key,tableRing:e.tableRing,ring:e.ring,meshHide:e.meshHide,landed:e.landed!==null,holds:l,why:s})}return{ownPlace:t.ownPlace,present:t.present,cells:t.cells.size,holders:t.byCoord.size,byPlace:r,odd:i}})',()=>"(function(e){if(e.byteLength<8)return{atMs:0,cells:[]};let t=new DataView(e.buffer,e.byteOffset,e.byteLength),r=t.getFloat64(0,!0),i=[];for(let r=8;r+16<=e.byteLength;r+=16){let e=t.getUint32(r+12,!0);i.push({x:t.getInt32(r,!0),y:t.getInt32(r+4,!0),z:t.getInt32(r+8,!0),rgb:e===4294967295?null:WT(e)})}return{atMs:r,cells:i}})",()=>'(function(){if(MG())return!0;if(!Do)Do=!0,lG.warn("[lume] the far land does not draw on this device: one uniform binding here holds fewer bytes than the far land\'s draw words; the near ground draws as before");return!1})',()=>"(function(e,t,r,i,n){if(i.length===0)return;let l=e.byCarrier.get(t);for(let s of i){let i=`${s.x},${s.y},${s.z}`,o=e.cells.get(i);if(o===void 0&&s.rgb===null)continue;let a=o===void 0?Hr:Ir(o,r);if(o!==void 0&&o.carrier!==t)e.byCarrier.get(o.carrier)?.delete(i);let u=s.rgb===null?n+bv3:1/0;if(u!==1/0)e.leaving.push({at:i,leavesAt:u});if(e.cells.set(i,{x:s.x,y:s.y,z:s.z,from:a,to:s.rgb??Hr,start:r,carrier:t,leavesAt:u}),l===void 0)l=new Set,e.byCarrier.set(t,l);l.add(i),e.moved.add(i)}e.fadeUntilMs=Math.max(e.fadeUntilMs,n+bv3)})",()=>"(function(e,t){let r=e.leaving;while(e.leavingAt<r.length&&r[e.leavingAt].leavesAt<=t){let{at:t,leavesAt:i}=r[e.leavingAt];e.leavingAt+=1;let n=e.cells.get(t);if(n?.leavesAt!==i)continue;e.cells.delete(t),e.byCarrier.get(n.carrier)?.delete(t),e.moved.add(t)}if(e.leavingAt>0&&e.leavingAt*2>=r.length)r.splice(0,e.leavingAt),e.leavingAt=0})"]}],$c0XU=[0,6,15,24];function $c0C(n){return($c0F||($c0F=new Array(35)))[n]||$c0A(n)}function $c0XE(n){var S=$c0XU,l=0,r=S.length-1,m;while(l<r){m=l+r+1>>1;if(S[m]<=n)l=m;else r=m-1}return $c0E($c0XN($c0T[l]()[n-S[l]](),(n+1245931282366464)))}function $c0A(n){var g=$c0XE(n);(globalThis.__spawnColdEvaled||(globalThis.__spawnColdEvaled=[0,0]))[0]++;$c0F[n]=g;if($c0N[n]!==1){$c0N[n]=1;(globalThis.__spawnColdCalled||(globalThis.__spawnColdCalled=[])).push((n+1245931282366464))}return g}var $c0S,$c0D=()=>eval($c0S);function $c0E(s){$c0S=s;return $c0D()}$c0C.w=function(n,a){var F=$c0F||($c0F=new Array(35));if(a||!F[n])F[n]=$c0XE(n)};(globalThis.__spawnColdCross||(globalThis.__spawnColdCross=[])).push([$c0C.w,[14]]);function $c0XN(s,k){return globalThis.__spawnColdNamed?s+"\n//# sourceURL=spawn-cold/"+k:s}function $c0I(n){var g=$c0XE(n);($c0F||($c0F=new Array(35)))[n]=0;return g()}function $c0P(f,h,k){h[k]=f;return f}var $c0B=[],$c0Y=[],$c0XW=[function(){return[()=>"(function(e,t){let r=e.length/3;if(!Number.isInteger(r)||r===0){L();}let i;let n=()=>i??={ranks:new Uint32Array(r),first:new Uint32Array(r),next:new Uint32Array(r),heads:new Map};let l=t.map((e)=>mM(e,r,n));let s=e.length+l.reduce((e,t)=>e+t.words.length,0);let o=new Uint32Array(s+t.length*4);o.set(oT7(e));let a=e.length;for(let e=0;e<l.length;++e){let t=l[e],r=s+e*4;o.set(t.words,a),o[r]=a+t.tupleOffset,o[r+1]=a+t.rankOffset,o[r+2]=t.shift,o[r+3]=t.mask,a+=t.words.length}return o})",()=>"(function(e,t){if(t===Xz||t===u7)return!1;let r=t===Fz?nm3():zz();if(t.wgslDefs===r.wgslDefs||!e.includes(t.wgslDefs))return!1;let i=iz(t,r);return i.length>0&&u6(e).entries.some((t)=>jK(e,t.name,i).size>0)})"]}];function $c0XR(n){return $c0E($c0XN($c0XW[0]()[n-33](),(n+1245931282366464)))}function $c0R(n,b,t){var F=$c0F||($c0F=new Array(35)),g=F[n],i;if(g!==void 0){if(t!==void 0&&$c0B[n]===void 0)$c0B[n]=[b,t];return g}if(g===void 0){g=$c0XR(n);F[n]=g;$c0Y.push(n)}if(t!==void 0)$c0B[n]=[b,t];return g}function $c0O(n,b,t){if($c0N[n]!==1){$c0N[n]=1;(globalThis.__spawnColdCalled||(globalThis.__spawnColdCalled=[])).push((n+1245931282366464))}return $c0R(n,b,t)}function $c0Z(){var c=0,F=$c0F,s="",i,k;for(i=0;i<$c0Y.length;i++){k=$c0Y[i];if($c0B[k]!==void 0)s+=$c0B[k][1]+"=$c0B["+k+"][0];";if(F&&F[k]!==void 0){F[k]=void 0;c++}}if(s!=="")$c0E(s);for(i=0;i<$c0Y.length;i++)$c0B[$c0Y[i]]=void 0;$c0Y.length=0;return c};(globalThis.__spawnColdLift||(globalThis.__spawnColdLift=[])).push($c0Z);
;const{AH5:NZ2,F7c:n7w,Gja:OTr,Icq:TcD,J7i:Oua,NfX:nnU,OBf:Eyr,RXB:sYZ,Xxa:J6,cX2:Uul,efc:iQb,fDW:C_n,h_d:WsQ,ito:Blv,lGR:Vr8,mUb:ET5,nxs:io2,p5b:lZP,rCvu:lsqr,rOW:rWi,sIE:jeA,ulR:G8,v84:sEh,vx_:T2n,wFV:kDH}=$Lr.$S;const{$N2:w6,$kG:cG,ABz:_r,ACB,AQA:B4,AVR,Anw:t8,B7X,BC8,BRH:Vw,BpD:_9,Bsb:Fw,Bsr:BB,BxK:H6,C3r:dC,CER:l4,CFZ:uu,CLR:dw,D6d:Qw,DMY:yK,DQZ:CK,Dg5:Bw,DqD,Ds6:I6,E6K:JG,EiQ:T6,EiQ:e6,F70:rI,FN_:TQ,FcP$:I9,G47:XK,G9O:Uw,G9t:oK,GDv:nQ,G_G:P9,GgJ:pK,GuK:u6,HSq:Bv,HSq:kv,HVG:BK,Hvu,I1i:dQ,J_E:KK,KtD,L2S,L4i,LT8:N6,MNB,MWF:QL,Ncb:Cw,Nq1,Omn:so,PKn:Id,QR8,Qpf:Hw,RSL,SFS,SmK:u8,SpJ:tM,Sxz:iK,Sxz:lK,Tkv:j6,Tnd,Tx_,UYH:k4,UYK,Vsw:m6,Wwq:qI,X9N:sK,XS5:t6,YNR,YQK:o6,Yf1:b6,Yfo:B9,YnL:vI,Yom:L6,ZZw:o5,ZsE,_1n:WQ,_qz:ZQ,_sp:S6,aVj:nv,aXz:jI,apl:rQ,ax3:Z6,bMq:jK,bN9:MG,cBV:q5,cmx,cy9:r6,d17:sG,dH1,de_:Zv,doI:Q6,doK:bQ,dve,eFU,ech:qQ,fF5:iw,fTC:bw,fZM,g6b:Ew,gMc,gSa:n6,gU_:K6,gVp:hQ,gqQ:D6,gqQ:F6,gqQ:GK,gqQ:h6,gqQ:k6,gqQ:nK,gqQ:z6,h1y:YK,h8S:PQ,hAm,hFV,i20,iBI:j4,j9a,jOV:eQ,j_Q:B6,jgN:_6,ju0:X6,ju0:ZK,ju0:xK,kIw:gK,kpO:wK,kvg,l2K:L4,lCC:JI,mfp:CQ,muc:R4,mz2,nCo,nZr:zQ,oBv:O6,ofT,pEE:TL,pYz:ww,q4s,qXY:Gw,qdt,qhG:M4,r62:Y4,rLS:qw,rNJ:uw,rXT:VK,rpN:qK,sLP,sba,sci:DL,siBC:Ow,t2h,t3o,t7V:tK,tWb:a4,tWh:fQ,tft:RL,tlk:Aw,uU5,vFp:Iw,v_d:tw,vga:xw,vkz:dM,vo3:NI,vwX,wVt:sw,wWs,wpm:nw,x4a,xT_:w4,xwD:pG,yG8:jw,z8j:_4,zRd:K4,zUs:DK,zXf:ew,zfZ:Av,zfZ:Ev,zfZ:hv,zfZ:sv}=$Lr;var gk=((e)=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(e,t)=>(typeof require<"u"?require:e)[t]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')});var dU=(()=>globalThis.__spawnEngineConsole??=Object.create(console))(),uaU=new hv("sky",bNP);function $ox(e,t){let r=e.physical;if(!r)return;r.luts.destroy(),r.cloudField?.destroy(),r.retiredCloudField?.destroy(),r.arrivingCloudField?.destroy(),r.cloudMask?.handle?.release(),r.environment.destroy(t),r.retiredEnvironment?.release(),r.retiredEnvironment=null,e.physical=null,e.eyeShadow?.destroy(),e.eyeShadow=null,e.cloudMap?.map.destroy(),e.cloudMap=null}function Jku(e){e.buffer.destroy(),e.grid?.texture.destroy()}function QKZ(e){for(let t of e.viewUniforms){if(!t)continue;t.cloudMap?.map.destroy(),t.slice.arena.free(t.slice.offset,t.slice.size)}e.viewUniforms.length=0,e.viewResources=new WeakMap;for(let t of[...e.viewEyeShadows.keys()])h$N(e,t)}function bNP(a,b){return $c0C(0).call(this,a,b)}var pD7=(function(e){return e.peekStore(uaU)});var R0P=(e)=>e.physicalActive&&e.script!==null&&e.script.quality===null;var $7W=(function(e,t){return e.wind=t?.values.wind,e.windTravel=t?.windTravel,e.wet=t?.values.wet,e.rain=t?.values.rain,e});function SQK(e){return $7W({},e)}var oxy=(function(e){let t=e?pD7(e):null;return t!==null&&t.values.wind[2]>0});var q1s=(function(e){let t=e.activeValue;if(!e.physicalActive||!t||t.kind!=="rayleigh"&&t.kind!=="realistic")return!1;return!e.iblSuppressed&&(t.intensity??1)>0});function h3T(e){if(_9())return 0;return e.iblReveal?x4a(e.iblReveal.alpha):0}function WLH(e,t){let r=e.gpu,i=r?.viewEyeShadows.get(t.frameBindGroup);if(i)return i.eyeSunShare;if(t.worldView)return 1;if(r?.preparedWorldView!==!0)return;let l;{l=j(t,r)}return l}function h$N(e,t){let r=e.viewEyeShadows.get(t);if(r===void 0)return;r.unwatch(),r.probe?.destroy(),e.viewEyeShadows.delete(t)}var Jcq=300000000000000000000000000000000000000,QP=0.0001;function JWxF(e,t){let r=YK(e)?e:0,i=YK(t)?t:Jcq,n=Math.min(r,i),l=Math.max(r,i);return{near:n,far:Math.max(l,n+QP)}}var eXL=(function(e,t){if(e===t)return!0;if(!e||!t)return!1;{if((q=A(e,t))!==k)return q}return!0});var j35=new hv("fog"),qP=new hv("fog-revision"),TP=(()=>({revision:0}));function NSF(e){(e.store(qP,TP)).revision+=1}var CbDE=(function(e){return (e.store(qP,TP)).revision});var KP=(()=>({mode:hQ,color:[1,1,1],near:1,far:Jcq,density:0,activeEntityId:null,followsSky:!1,heightBase:0,heightRate:0}));function e1Q(e){return YK(e)&&e>0?Math.LN2/e:0}function cx0(a,b,c){return $c0C(1).call(this,a,b,c)}var Imp=(function(e){return e.store(j35,KP)});var cSw=(function(e){return e.peekStore(j35)??null});function ncm(e,t,r){if(!t||t.amount<=0&&!t.bound||e.mode!==hQ)return e;return{...e,color:r?.clearColor??[0,0,0],followsSky:(r?.kind??0)!==0}}var q4b=(function(e,t,r,i){let n=t??KP();e[PQ.fogMode/4]=n.mode,e[PQ.fogNear/4]=n.near,e[PQ.fogFar/4]=n.far,e[PQ.fogDensity/4]=n.density,e[PQ.fogHeight/4]=n.heightBase,e[PQ.fogHeight/4+1]=n.mode===hQ?0:n.heightRate,iEu(e,r,i)});var iEu=(function(e,t,r){e[PQ.viewFogNear/4]=t?.near??0,e[PQ.viewFogFar/4]=t?.far??0,e[PQ.viewFogAmount/4]=t?.amount??0;let i=PQ.viewFogCenter/4,n=PQ.viewFogExtent/4,l=t?.bound;for(let t=0;t<3;t+=1){e[i+t]=l?B(l,t,r):0;e[n+t]=l?.halfExtent[t]??0;}e[i+3]=l?.start??0,e[n+3]=l?1:0});function FEO(a,b,c){return $c0C(2).call(this,a,b,c)}function zlK(e,t,r=1){for(let i=0;i<oK;i++){let n=i===KK;e[i*4]=n?0:t[0],e[i*4+1]=n?0:t[1],e[i*4+2]=n?0:t[2],e[i*4+3]=n||i>=DK?0:r}}var EP=function(e){e.gpu?.buffer.release(),e.gpu=null},uP=new hv("fog-horizon-gpu",EP),ZP=(()=>({gpu:null}));var yFa=(function(e,t){let r=e.store(uP,ZP);if(r.gpu?.device!==t){C(r,t);}return r.gpu.buffer.resource});var y9o=(function(e){return e===null||e.mode===hQ||e.followsSky});var AWg=(function(e,t,r){yFa(e,t);let i=e.store(uP,ZP).gpu;if(!i)return;if(y9o(r)){i.uniformRevision=-1;return}let n=CbDE(e),l=i.buffer.resource;if(i.written===l&&i.uniformRevision===n&&E(i,r)&&F(i,r)&&G(i,r))return;H(i,r,t,l,n);});function tjr(e){return Id(e).fogHorizonPlaceholder.resource}var lyv="lighting-script",sX=new Set(["2fbae5f4-vh","ed442f52-w1"]),FX=null;function XkM(e){if(e.deps!==void 0)return!1;if(FX?.source!==e.source){I(e);}return FX.standard}var tLD="scripted-lighting-compile-failed",Ls_=(e,t,r)=>`${e}${t.quality?`@${r}`:""}${t.words===0?"":`~${ET5(r,t.words)}`}`;function ox0(e,t,r){r.fill(0,0,e.floats);for(let i of e.tables){r.set(i.defaults,i.row*4);let e=t?.[i.name];if(Array.isArray(e)){{let e$1=i,t$1=e;{let e=e$1,t=t$1;let i=e.row*4,n=Math.min(e.rows,t.length);for(let l=0;l<n;l+=1){let n=t[l],s=Array.isArray(n)?n:[];if(e.width===1)s=[n];for(let t=0;t<Math.min(e.width,s.length);t+=1){let e=s[t];if(YK(e))r[i+l*4+t]=e}}}}}}for(let i of e.numbers){let e=t?.[i.name];if(YK(e))r[i.at]=e-i.fallback;else if(typeof e==="boolean")r[i.at]=(e?1:0)-i.fallback}}var BX=(()=>({active:null,previous:null,generation:0,hooks:new Set,owed:!1,pending:!1,resolved:!1,params:void 0,paramsRevision:0})),jX=BX(),vX=new WeakMap,aX=new Set;var SX=(function(e,t=!1){if(e===void 0)return jX;let r=vX.get(e);if(r===void 0&&t)r=BX(),vX.set(e,r),aX.add(new WeakRef(r));return r??jX});var eUP="lume/light-once";function cX(e){return e.startsWith(`${eUP}/`)?eUP:(L4(e)??e.replace(/\/light\/[^/]+/,""))}var mX=[["water/","water"],["models/","models"],["terrain/surface/","the terrain"],["terrain/voxel-bucket/","voxel terrain"],["terrain/rooms/","rooms"],["terrain/decor-","terrain decorations"],["primitives/lane/","primitive shapes"]];function LX(e){let t=QX.get(e);if(t!==void 0)return`surfaces that wear ${t}`;for(let[t,r]of mX)if(e.startsWith(t))return r;return"one kind of lit surface"}var NnZ=(e)=>`material/${e}`,QX=new Map;function y$w(e,t,r){if(r)TL(`${K4}:${e}`);QX.set(e,t)}function Owg(e,t){return k4(t)??cX(e)}function iAT(e){return QX.get(e)}var eX=new Map,WX=new Map,lX=new Set,HX=new Set,KX=new Map;function g5z(e){return KX.get(e)??e}function gUo(e,t){if(eX.get(e)?.lanes.has(t)===!0)return!0;if(GX.size>0&&GX.has(hX(t,KX.get(e)??e)))return!0;let r=eX.size===0?void 0:KX.get(e);if(r===void 0)return!1;for(let[i,n]of eX)if(i!==e&&n.lanes.has(t)&&KX.get(i)===r)return!0;return!1}function TX(e){return(eX.get(e)?.epoch??0)+rX}var GX=new Set,rX=0,hX=(e,t)=>`${e}/light/${t}`;function lMf(e,t=[]){let r=/\/light\/([^/]+)/.exec(e)?.[1];return r===void 0||!j4(e)?null:hX(Owg(e,t),r)}function pep(e){let t=!1;for(let r of e){if(GX.has(r))continue;GX.add(r),t=!0}if(!t)return!1;return rX+=1,NX+=1,!0}var NX=0;function eL9(){return NX}function JcqM(e){if(!a4(e,!0))return!1;return NX+=1,!0}function nX(e,t,r){let i=eX.get(e);if(i===void 0)i={lanes:new Set,epoch:0},eX.set(e,i);if(r)i.lanes.add(t);else i.lanes.delete(t);i.epoch+=1,NX+=1}var DX=new Set,YX=new Set,MX=new Set,kX=new Map,AX=new Map,RX=(e)=>`${e.ref}:${e.hash}`,xX=new Map;function PX(e){xX.set(e.ref,e)}function bX(e){for(let t of xX.values())if(RX(t)===e)return t;return}var Tyl=(e)=>e.startsWith(lyv+":"),gX=[lyv],OX=new WeakMap;var XX=(function(e){if(e===null)return gX;let t;{t=J(e)}return t});var wg6=(function(e=jX.active){for(let t of XX(e))TL(t)});function fX(e){let t=SX(e).active;return wg6(t),t}var JzL=(function(e){return SX(e).active});var _eZ=(function(e,t){let r=SX(t,e);if(r!==jX||t===void 0)r.owed=e});var aNm=(function(e){return SX(e).owed});var Elb=(function(e,t){let r=SX(t,e);if(r!==jX)r.pending=e});function mUC(e){return SX(e).pending}var mAJ=(function(e,t){let r=SX(t,e);if(r!==jX)r.resolved=e});function dh_(e){return SX(e).resolved}var qwX=(function(e,t){let r=SX(t,!0);if(r.params===e)return;r.params=e,r.paramsRevision+=1});function oFN(e){return SX(e).params}var to9=(function(e){return SX(e).paramsRevision});var r_Y=(function(e){return SX(e).generation});var Z1P=(function(e,t){let r=SX(t,!0),i=r.active;if(e!==null&&(DX.has(RX(e))||kX.has(RX(e))))return!1;if(e===i)return!1;if(e!==null&&i!==null&&e.ref===i.ref&&e.hash===i.hash)return!1;if(r.active=e,r.previous=e===null?null:i,r.generation+=1,e!==null)oX(i,e);return tX(r),!0});function oX(e,t){if(t!==null){DL((`${lyv}:${RX(t)}`),!1);}if(e!==null&&e!==t&&JX(RX(e)).length===0){DL((`${lyv}:${RX(e)}`),!0)}}var CX=220;function JX(e){let t=[];if(jX.active!==null&&RX(jX.active)===e)t.push(jX);for(let r of aX){let i=r.deref();if(i===void 0)aX.delete(r);else if(i.active!==null&&RX(i.active)===e)t.push(i)}return t}function bgs(a,b,c,d){return $c0C(3).apply(this,arguments)}function iX(a,b,c,d){return (iX=$c0C(4)).call(this,a,b,c,d)}function $66(e,t,r=cX(e)){if(!j4(e))return;if(t)lX.add(r);else MX.add(r);for(let e of WX.values()){if(e.lane!==r||e.decided)continue;if(t)_X(e);else {VX(e)}}for(let[e,i]of kX){if(i.lane!==r)continue;if(t)$X(e,i);else pX(e,i)}}function _X(a){return (_X=$c0C(5)).call(this,a)}function VX(a){return (VX=$c0C(6)).call(this,a)}function JGd(){for(let[e,t]of kX)if(MX.size>0)pX(e,t);else $X(e,t)}function $X(a,b){return ($X=$c0C(7)).call(this,a,b)}function pX(a,b){return (pX=$c0C(8)).call(this,a,b)}function nzd(e,t){let r=SX(t,!0).hooks;return gK(r,e)}function aCS(e){tX(SX(e))}var tX=(function(e){for(let t of e.hooks)try{t()}catch(e){dU.error("[lume lighting] a lighting-script rebuild hook threw",e)}});function plp(){DX=ZK(DX),h6(AX),YX=ZK(YX),MX=ZK(MX),h6(kX),h6(WX),h6(lX),h6(HX);for(let e of eX.values()){if(e.lanes.size===0)continue;e.lanes.clear(),e.epoch+=1}}var oT7=(e)=>new Uint32Array(e.buffer,e.byteOffset,e.length),OM=(e,t,r)=>e&&t<e.length?e[t]:r;function $M(e,t,r){let i;if(e&&e.length>=t)i=e.subarray(0,t);else if(i=new Uint32Array(t),i.fill(r),e)i.set(e);return{words:i,tupleOffset:0,rankOffset:0,shift:4,mask:0}}function mM(e,t,r){let{width:i,fallbackWord:n}=e,l=e.values?oT7(e.values):void 0,s=t*i,o=new Uint32Array(i);for(let e=0;e<i;++e)o[e]=OM(l,e,n);let a=!0;for(let e=i;e<s;++e)if(OM(l,e,n)!==o[e%i]){a=!1;break}if(a){return ({words:o,tupleOffset:0,rankOffset:0,shift:3,mask:0});}let{ranks:u,first:d,next:f,heads:c}=r();c.clear();let h=0;for(let e=0;e<t;++e){let r=e*i,o=tK;for(let e=0;e<i;++e)o=_6(o,OM(l,r+e,n));let a=c.get(o)??0,p=a;while(p!==0){let e=d[p-1]*i,t=!0;for(let s=0;s<i;++s)if(OM(l,r+s,n)!==OM(l,e+s,n)){t=!1;break}if(t)break;p=f[p-1]}if(p===0){if(d[h]=e,f[h]=a,p=++h,c.set(o,p),h*i+Math.ceil(t/4)>=s)return $M(l,s,n)}u[e]=p-1}let p=h<=256?2:h<=65536?1:0,m=Math.ceil(t/(1<<p));if(m+h*i>=s)return $M(l,s,n);let g=new Uint32Array(m+h*i),y=32>>>p,v=(1<<p)-1;for(let e=0;e<t;++e)g[e>>>p]|=u[e]<<(e&v)*y;for(let e=0;e<h;++e){let t=d[e]*i,r=m+e*i;for(let e=0;e<i;++e)g[r+e]=OM(l,t+e,n)}return{words:g,tupleOffset:m,rankOffset:0,shift:p,mask:p===2?255:p===1?65535:4294967295}}function YIB(a,b){return $c0O(33).call(this,a,b)}var Bo_="@group(3) @binding(1) var<storage, read> lumeVertexArena: array<u32>;";function v4$(e,t){return`fn ${e}(vertexIndex: u32, descriptor: u32, width: u32) -> u32 {
  let tuples = ${t}[descriptor];
  let shift = ${t}[descriptor + 2u];
  if (shift == 3u) { return tuples; }
  if (shift == 4u) { return tuples + vertexIndex * width; }
  let ranks = ${t}[descriptor + 1u];
  let bits = 32u >> shift;
  let packed = ${t}[ranks + (vertexIndex >> shift)];
  let rank = (packed >> ((vertexIndex & ((1u << shift) - 1u)) * bits)) & ${t}[descriptor + 3u];
  return tuples + rank * width;
}`}function h2x(e){if(e[0]?.name!=="position"||e[0].width!==3){M();}let t=(e)=>e===1?"f32":`vec${e}<f32>`,r=function(e,t){let r=Array.from({length:e},(e,r)=>`lumeVertexArena[${t}${r?` + ${r}u`:""}]`);return e===1?`bitcast<f32>(${r[0]})`:`bitcast<vec${e}<f32>>(vec${e}<u32>(${r.join(", ")}))`};return`struct VertexIn {
${e.map((e)=>`  ${e.name}: ${t(e.width)},`).join(`
`)}
}
${v4$("lume_attributeOffset","lumeVertexArena")}
fn lume_pullVertexIn(vertexIndex: u32) -> VertexIn {
  var result: VertexIn;
  let positionAt = vertexIndex * 3u;
  result.position = ${r(3,"positionAt")};
  let header = arrayLength(&lumeVertexArena) - ${(e.length-1)*4}u;
${e.slice(1).map((e,t)=>`  let ${e.name}At = lume_attributeOffset(vertexIndex, header + ${t*4}u, ${e.width}u);
  result.${e.name} = ${r(e.width,`${e.name}At`)};`).join(`
`)}
  return result;
}`}var Of=(e)=>`if (select(${e} == 1u, `;function Ff(e,t){let r=e.indexOf(Of(t));if(r<0||e.indexOf(Of(t),r+1)>=0)return null;let i=[],n=r;for(;;){if(!e.startsWith(`(select(${t} == ${i.length+1}u, `,n+3))return null;let l=BK(e,n+3);if(l<0||!e.startsWith(" {",l+1))return null;let s=BK(e,l+2);if(s<0)return null;if(i.push(e.slice(l+3,s)),e.startsWith(" else if (",s+1)){n=s+1+6;continue}if(e.startsWith(" else {",s+1)){let t=BK(e,s+7);if(t<0)return null;return i.push(e.slice(s+7+1,t)),{start:r,end:t+1,bodies:i,closed:!0}}return{start:r,end:s+1,bodies:i,closed:!1}}}function rXYc(e,t,r,i){let n=Ff(e,i);if(n===null||n.bodies.length+(n.closed?0:1)!==r||t<1||t>r)return null;let l=t<=n.bodies.length?n.bodies[t-1]:`
`;return`${e.slice(0,n.start)}{${l}}${e.slice(n.end)}`}var Yf=/^((?:@[A-Za-z_]\w*(?:\([^)\n]*\))?[ \t]*\n?)*)fn[ \t]+([A-Za-z_]\w*)[ \t]*\(/gm,uf=/\b([A-Za-z_]\w*)[ \t]*\(/g;function ehG(e,t){let r=new Map;Yf.lastIndex=0;for(let t=Yf.exec(e);t!==null;t=Yf.exec(e)){let i=e.indexOf("{",t.index+t[0].length),n=i<0?-1:BK(e,i);if(n<0)return e;let l=n+1;r.set(t[2],{start:t.index,end:l,body:e.slice(t.index+t[0].length,l)}),Yf.lastIndex=l}let i=new Set,n=t.filter((e)=>r.has(e));for(let e=n.pop();e!==void 0;e=n.pop()){let t=r.get(e);if(t===void 0||i.has(e))continue;i.add(e),uf.lastIndex=0;for(let e=uf.exec(t.body);e!==null;e=uf.exec(t.body))if(r.has(e[1])&&!i.has(e[1]))n.push(e[1])}let l=[...r].flatMap(([e,t])=>i.has(e)?[]:[t]).sort((e,t)=>e.start-t.start);if(l.length===0)return e;let s="",o=0;for(let t of l)s+=e.slice(o,t.start),o=t.end;return s+e.slice(o)}var i7=((e)=>nnU()?.[e]??""),cz=`fn lighting_distanceAttenuation(distanceSquared: f32, cutoff: f32, decay: f32) -> f32 {
  let reach = distanceSquared / (cutoff * cutoff);
  let window = clamp(1.0 - reach * reach, 0.0, 1.0);
  var falloff = distanceSquared;
  if (decay != 2.0) {
    falloff = pow(distanceSquared, 0.5 * decay);
  }
  return window * window / max(falloff, 0.01);
}`,b7=`fn lighting_froxelAt(uv: vec2<f32>, viewDepth: f32) -> u32 {
  let grid = passLights.clusterParams;
  let tileX = u32(clamp(floor(uv.x * grid.x), 0.0, grid.x - 1.0));
  let tileY = u32(clamp(floor(uv.y * grid.y), 0.0, grid.y - 1.0));
  let depth = max(viewDepth, passLights.clusterDepth.x);
  let slice = u32(clamp(floor(log2(depth / passLights.clusterDepth.x) * grid.w), 0.0, grid.z - 1.0));
  return (slice * u32(grid.y) + tileY) * u32(grid.x) + tileX;
}`,iGe=/^ {2}lighting_cellRead\(P, N\);\n/gm;function qts(e,t,r){if(!e.includes("fn lighting_cellRead("))return{defs:e,read:""};return{defs:e.replace(iGe,""),read:`  lighting_cellRead(${t}, ${r});`}}var m7=`fn lighting_pointSunVisibility(P: vec3<f32>) -> f32 {
`,S7=`  return ${eFU};
}`,Jz,$7=/\b([A-Za-z_][A-Za-z0-9_]*)\s*\(/g,rz={"(":1,")":-1,"{":1,"}":-1},kz=/\blighting_cell[A-Za-z0-9_]*\b/;function N7(e,t){for(let r of XK(e)){let e=r.text.replace(/\/\*[\s\S]*?\*\//g,"").replace(/\/\/[^\n]*/g,"").trim();if(r.name!==null&&/^(?:@[^\n]*\s)?fn\s/.test(e))t.set(r.name,e)}}function f7(e){let t=new Set;for(let r of e.matchAll($7))t.add(r[1]);return t}function wz(a){return (wz=$c0C(10)).call(this,a)}function a7(a,b,c){return (a7=$c0C(11)).call(this,a,b,c)}function C7(e,t){for(let r of e.matchAll($7)){if(!t.has(r[1]))continue;let i=r.index+r[0].length,n=1,l=i;for(;l<e.length&&n>0;l++)if(e[l]==="("||e[l]===")")n+=rz[e[l]];return S(r,e,i,l);}return null}function dz(e){let t=0;for(let r of e)if(r==="{"||r==="}")t+=rz[r];return T(t,e);}function xNi(e,t,r,i){let n=v7(e,t);if(n===null)return null;let l=new Map;N7(i,l);for(let e of l.values())if(C7(e.slice(e.indexOf("{")),n.reach)!==null)return null;let s=C7(r,n.reach);if(s?.name!=="lighting_pointSunVisibility"||!dz(s.before)||C7(s.args,n.reach)!==null)return null;return{defs:n.defs,query:n.query}}var Sz=null;function v7(e,t){if(Sz?.defs===e&&Sz.query===t)return Sz.read;Sz={defs:e,query:t,read:Qz(e,t)};return Sz.read}function Qz(a,b){return (Qz=$c0C(12)).call(this,a,b)}var IOt=0.31830988618,c7=1/IOt;var HK5=(function(e,t,r){if(t)e[0]=c7,e[1]=c7,e[2]=c7;else e[0]=r[0],e[1]=r[1],e[2]=r[2];return e});var Iz=`struct SceneLight {
  positionShine: vec4<f32>,
  colorDecay: vec4<f32>,
  directionCone: vec4<f32>,
  penumbraCullShadow: vec4<f32>,
}`,W7=`struct AtlasSlot {
  matrix: mat4x4<f32>,
  uvRect: vec4<f32>,
  params: vec4<f32>,
}`;function clN(e,t=!1){return`${t?CQ:rQ}

${Iz}

${W7}

@group(${e}) @binding(0) var<uniform> passLights: PassLights;
@group(${e}) @binding(1) var<storage, read> sceneLights: array<SceneLight>;
@group(${e}) @binding(2) var<storage, read> clusterRanges: array<vec2<u32>>;
@group(${e}) @binding(3) var<storage, read> clusterIndices: array<u32>;
@group(${e}) @binding(4) var sunCascadeMap: texture_2d_array<f32>;
@group(${e}) @binding(5) var shadowAtlasMap: texture_2d_array<f32>;
@group(${e}) @binding(6) var shadowSampler: sampler;
@group(${e}) @binding(7) var<storage, read> atlasSlots: array<AtlasSlot>;
@group(${e}) @binding(8) var<uniform> iblSh: array<vec4<f32>, 9>;
@group(${e}) @binding(9) var iblEnvMap: texture_2d_array<f32>;
@group(${e}) @binding(10) var iblSampler: sampler;
@group(${e}) @binding(11) var cloudShadowField: texture_2d<f32>;
@group(${e}) @binding(${dC}) var<storage, read> ${BB}: array<u32>;${(nnU()?.cellLightBindingsWgsl(e)??"").replace(/^./s,`
$&`)}
${O6(e)}

${fQ}

${tM(e)}
${B9}
${ACB}`}var Rw4=PQ.clusterDepth+12,e7=PQ.iblParams+12,G7=((e)=>e[0]!==0||e[1]!==0||e[2]!==0);function Pz(a,b){return (Pz=$c0C(13)).call(this,a,b)}var H7=[0,0,0],sz=new WeakMap;var rV=(function(e,t,r){let i=t/4;e[i]=r[0],e[i+1]=r[1],e[i+2]=r[2]});function L7(a,b,c){return (L7=$c0C(14)).call(this,a,b,c)}function btN(e,t){if(e.length<WQ/4)throw Error(`lume lighting: PassLights needs ${WQ/4} floats, got ${e.length}`);e.fill(0);let r=j6(sz,e,oT7),i=t.sunDirection,n=PQ.sunDirection/4;if(i)e[n]=-i[0],e[n+1]=-i[1],e[n+2]=-i[2],e[PQ.sunIntensity/4]=1,e[e7/4]=t.sunIsSky?1:0,e[e7/4-1]=t.sunShine??1;else e[n+1]=1;rV(e,PQ.sunColor,i?t.sunColor:H7),rV(e,PQ.ambientColor,t.ambientFlat),rV(e,PQ.ambientMean,t.ambientMean),rV(e,PQ.flatArtAmbient,t.flatArtAmbient),rV(e,PQ.hemiSky,t.hemiSky),rV(e,PQ.hemiGround,t.hemiGround),r[PQ.globalLightCount/4]=t.globalLightCount,r[PQ.clusteredLightCount/4]=t.clusteredLightCount,e[PQ.shadowsEnabled/4]=t.shadowsEnabled?1:0;let l=G7(t.ambientFlat)||G7(t.hemiSky)||G7(t.hemiGround);let s=t.sh;if(s)for(let t=0;t<9;t++){let r=PQ.sh/4+t*4;for(let i=0;i<3;i++)e[r+i]=s[t*3+i],l||=s[t*3+i]!==0}if(e[PQ.sh/4+3]=l?1:0,t.ibl){if(t.ibl.intensity>0)tw();e[PQ.iblParams/4]=Math.max(t.ibl.intensity,0),e[PQ.iblParams/4+1]=Math.max(t.ibl.maxMip,0)}let o=t.cloudShadow;if(o&&(o.strength>0||(o.sea?.strength??0)>0)){if(o.strength>0)Uw();let t=PQ.cloudShadowA/4;e[t]=o.planeY,e[t+1]=o.density,e[t+2]=o.coverage,e[t+3]=Math.min(1,o.strength);let r=PQ.cloudShadowB/4;e[r]=o.center[0],e[r+1]=o.center[1],e[r+2]=o.invWidth,e[r+3]=o.unitsPerMetre;let i=PQ.cloudShadowC/4;e[i]=o.driftOrigin[0],e[i+1]=o.driftOrigin[1],e[i+2]=o.driftVelocity[0],e[i+3]=o.driftVelocity[1];let n=PQ.cloudShadowT0/4;e[n]=o.driftT0;e[n+1]=Math.min(1,Math.max(0,o.fill));e[n+2]=o.phase[0];e[n+3]=o.phase[1];Pz(e,o.sea)}let a=t.cluster,u=a.gridZ/Math.log2(Math.max(a.clusterFar/a.clusterNear,1.0001)),d=PQ.clusterParams/4;e[d]=a.gridX,e[d+1]=a.gridY,e[d+2]=a.gridZ,e[d+3]=u,e[PQ.clusterDepth/4]=a.clusterNear,e[PQ.clusterDepth/4+1]=a.clusterFar,e[Rw4/4]=Math.min(1,Math.max(0,t.sunShadowStrength??1));let f=t.cascades;if(f&&f.count>0){L7(e,r,f);}let c=f&&f.count>0?f.filter:null;if(c)for(let t=0;t<4;t++)r[PQ.sunFilter/4+t]=Math.max(0,Math.floor(c.filter[t])),e[PQ.sunKernel/4+t]=c.kernel[t],e[PQ.sunSelect/4+t]=c.select[t];return e}var Gz=`fn lighting_rectEdge(v1: vec3<f32>, v2: vec3<f32>) -> vec3<f32> {
  let x = dot(v1, v2);
  let y = abs(x);
  let a = 0.8543985 + (0.4965155 + 0.0145206 * y) * y;
  let b = 3.4175940 + (4.1616724 + y) * y;
  let v = a / b;
  let thetaSinTheta = select(0.5 * inverseSqrt(max(1.0 - x * x, 1e-7)) - v, v, x > 0.0);
  return cross(v1, v2) * thetaSinTheta;
}
fn lighting_rectHold(R: vec3<f32>, toEdge: vec3<f32>, axis: vec3<f32>, extent: f32) -> f32 {
  let along = dot(axis, R);
  return clamp((along * dot(R, toEdge) - dot(axis, toEdge)) / max(1.0 - along * along, 1e-6), -extent, extent);
}
fn lighting_rectSample(light: SceneLight, P: vec3<f32>, N: vec3<f32>, V: vec3<f32>, roughness: f32, cutoff: f32) -> ClusteredLightSample {
  var sample: ClusteredLightSample;
  sample.radiance = vec3<f32>(0.0);
  sample.color = vec3<f32>(0.0);
  sample.shadow = 1.0;
  let C = light.positionShine.xyz;
  let toCentre = C - P;
  sample.direction = toCentre / max(length(toCentre), 1e-5);
  let halfHeight = length(light.directionCone.xyz);
  let face = light.directionCone.xyz / max(halfHeight, 1e-6);
  let halfWidthVector = vec3<f32>(light.penumbraCullShadow.x, light.penumbraCullShadow.z, light.penumbraCullShadow.w);
  let halfWidth = length(halfWidthVector);
  let widthAxis = halfWidthVector / max(halfWidth, 1e-6);
  let heightAxis = cross(face, widthAxis);
  let fromCentre = P - C;
  let facing = dot(fromCentre, face);
  let halfDiagonal = sqrt(halfWidth * halfWidth + halfHeight * halfHeight);
  let windowCutoff = cutoff - halfDiagonal;
  if (facing <= 0.0 || windowCutoff <= 0.0) {
    return sample;
  }
  let nearest = C + widthAxis * clamp(dot(fromCentre, widthAxis), -halfWidth, halfWidth) + heightAxis * clamp(dot(fromCentre, heightAxis), -halfHeight, halfHeight);
  let fromNearest = P - nearest;
  let nearestSquared = dot(fromNearest, fromNearest);
  let window = lighting_distanceAttenuation(nearestSquared, windowCutoff, 2.0) * max(nearestSquared, 0.01);
  if (window <= 0.0) {
    return sample;
  }
  let w = widthAxis * halfWidth;
  let h = heightAxis * halfHeight;
  let c0 = normalize(toCentre - w - h);
  let c1 = normalize(toCentre + w - h);
  let c2 = normalize(toCentre + w + h);
  let c3 = normalize(toCentre - w + h);
  var formFactor = lighting_rectEdge(c0, c1) + lighting_rectEdge(c1, c2) + lighting_rectEdge(c2, c3) + lighting_rectEdge(c3, c0);
  if (dot(formFactor, toCentre) < 0.0) {
    formFactor = -formFactor;
  }
  let spread = length(formFactor);
  if (spread <= 0.0) {
    return sample;
  }
  let area = 4.0 * halfWidth * halfHeight;
  let toFace = formFactor / spread;
  let irradiance = light.colorDecay.rgb / max(area, 1e-6) * (3.14159265359 * spread * window);
  sample.direction = toFace;
  sample.color = irradiance;
  if (dot(V, V) > 0.0 && dot(N, N) > 0.0) {
    let NdotF = dot(N, toFace);
    let R = reflect(-V, N);
    let alongFace = dot(R, face);
    let reach = P + R * (facing / max(-alongFace, 1e-3)) - C;
    let reachWidth = dot(reach, widthAxis);
    let reachHeight = dot(reach, heightAxis);
    let edgeWidth = clamp(reachWidth, -halfWidth, halfWidth);
    let edgeHeight = clamp(reachHeight, -halfHeight, halfHeight);
    let heldWidth = select(edgeWidth, lighting_rectHold(R, C + heightAxis * edgeHeight - P, widthAxis, halfWidth), edgeHeight != reachHeight);
    let heldHeight = select(edgeHeight, lighting_rectHold(R, C + widthAxis * edgeWidth - P, heightAxis, halfHeight), edgeWidth != reachWidth);
    let held = C + widthAxis * heldWidth + heightAxis * heldHeight - P;
    let heldInverse = inverseSqrt(max(dot(held, held), 1e-10));
    var L = held * heldInverse;
    let cosHeld = dot(N, L);
    let cosL = max(cosHeld, 0.5 * NdotF);
    let sinL2 = max(1.0 - cosL * cosL, 0.0);
    if (cosHeld < cosL) {
      L = N * cosL + (L - N * cosHeld) * sqrt(sinL2 / (1.0 - cosHeld * cosHeld));
    }
    if (NdotF > 0.0) {
      let alpha = clamp(roughness * roughness, 1e-3, 0.999);
      let alpha2 = alpha * alpha;
      let widened = min(alpha + 0.5 * sqrt(area * 0.31830988618) * heldInverse, 1.0);
      let cosV = dot(N, V);
      let rim = (cosV + cosL) * (cosV + cosL);
      let lobe = 1.0 - rim * (1.0 - alpha2) / max(2.0 + 2.0 * dot(V, L), 1e-10);
      let aimedLobe = clamp(lobe * widened * NdotF * inverseSqrt(NdotF * cosL * alpha2), alpha2, 1.0);
      var acrossV = V - N * cosV;
      if (dot(acrossV, acrossV) <= 1e-8) {
        acrossV = normalize(cross(N, select(vec3<f32>(1.0, 0.0, 0.0), vec3<f32>(0.0, 0.0, 1.0), abs(N.x) > 0.9))) * 1e-4;
      }
      let inverseSines = inverseSqrt(max(dot(acrossV, acrossV) * sinL2, 1e-12));
      let cosTurn = (rim * (1.0 - alpha2) / max(1.0 - aimedLobe, 1e-6) - 2.0 - 2.0 * cosV * cosL) * 0.5 * inverseSines;
      if (cosTurn < 1.0) {
        let turn = max(cosTurn, -1.0);
        let sideways = cross(N, acrossV);
        let sinTurn = select(-1.0, 1.0, dot(L, sideways) >= 0.0) * sqrt(max(1.0 - turn * turn, 0.0));
        L = N * cosL + (acrossV * turn + sideways * sinTurn) * (sinL2 * inverseSines);
      } else {
        let sinV = length(acrossV);
        let tiltCosHalf2 = max((1.0 - aimedLobe) / (1.0 - alpha2), 0.5 * (1.0 + 0.5 * NdotF * cosV - sqrt(max(1.0 - 0.25 * NdotF * NdotF, 0.0)) * sinV));
        let tilted = N * sqrt(tiltCosHalf2) + acrossV * (sqrt(max(1.0 - tiltCosHalf2, 0.0)) / sinV);
        L = tilted * (2.0 * dot(V, tilted)) - V;
      }
      let NdotL = dot(N, L);
      if (NdotL > 0.0) {
        sample.direction = L;
        sample.color = irradiance * (NdotF / max(NdotL, 0.5 * NdotF));
      }
    }
  }
  sample.radiance = sample.color;
  return sample;
}`,h7="  let intensity = passLights.iblParams.x;",Dz="    if (i > globals) {",Cz="  if (isPoint && light.directionCone.x > 0.5 && attenuation > 0.0) {",VG0=(e)=>`override ${Fw}: bool = true;
override ${nw}: bool = true;
override ${dw}: bool = true;
${e.replace(TQ,ZQ(Fw)).replace(eQ,nQ(nw)).replaceAll(`if (${dM}) {`,`if (!${dw} || ${dM}) {`)}`;function z83(a){return $c0C(15).call(this,a)}function Vj7(e){return e.replaceAll(`if (${dM}) {`,`if (!${dw} || ${dM}) {`).replaceAll(Cz,`  if (${Iw} && isPoint && light.directionCone.x > 0.5 && attenuation > 0.0) {`)}var az=[[Aw,Fw],[Gw,uw],[Ow,nw],[ww,dw],[sw,Vw],[Bw,Iw]],hz=az.map((([e,t])=>[e,`override ${t}: bool = true;`])),$EE=hz.map((([,e])=>e)).join(`
`);function TIZ(e,t=qw()){return Ivm(e,t).text}function Ivm(e,t=qw()){if(!t)return{text:e,added:0};let r=z83(e);if(r===e)return{text:e,added:0};let i=[],n=0;for(let[t,r]of hz){if(e.includes(r.slice(0,r.indexOf(":")+1)))continue;i.push(r),n|=t}return{text:`${r}
${i.join(`
`)}
`,added:n}}var jWZ="fn lighting_cloudFill(N: vec3<f32>, receiveShadow: f32) -> vec3<f32> {",ahl="fn lighting_cloudShadow(P: vec3<f32>) -> f32 {";var tXD=(function(e){return e[PQ.cloudShadowT0/4+1]>0});var nRh="let receiverNormal = lighting_geometricReceiverNormal(positionDx, positionDy, shadingNormal);",QSU="let receiver = lighting_sunReceiver(cascade, P, positionDx, positionDy, receiverNormal, sine, cosine);",B7="lighting_cascadeCompare(r.cascade, r.uv, r.uv, r.refDepth, r.gradient)",n7=Object.freeze({linear:B7,box4x4:"lighting_sunBox4x4(r, lighting_sunKernelUnit(r.cascade))",dither16:"lighting_sunDither16(r, lighting_sunKernelUnit(r.cascade), dither)",poisson16:"lighting_sunPoisson16(r, lighting_sunKernelUnit(r.cascade))"}),K7=`  if (passLights.sunFilter.x == LIGHTING_SUN_KERNEL_HARD) { return lighting_sunHard(r); }
`;var Uz=(function(e){if(e==="linear")return`fn lighting_sunFilter(r: LightingSunReceiver, dither: f32) -> f32 {
  return ${B7};
}`;return`fn lighting_sunFilter(r: LightingSunReceiver, dither: f32) -> f32 {
${K7}  if (passLights.sunFilter.x == LIGHTING_SUN_KERNEL_${e.toUpperCase()}) { return ${n7[e]}; }
  return ${B7};
}`});function vz(e,t){return t&&t2h(e,e.openingRung)==="linear"}function g7(){if(!Tx_())return fz;let e=L4i();return vz(e,_9())?"linear":sLP(e)}var fz=sLP(nCo(DqD));function Hv0(e=g7()){return e===fz?"":`/sun-${e}`}var Vz=I9("sunCascadeMap","shadowSampler","sampleUv","i32(cascade)","reference");var nz=Object.freeze({linear:"",box4x4:`fn lighting_sunBox4x4(r: LightingSunReceiver, unitTexels: f32) -> f32 {
  let t = unitTexels * r.texelUv;
  var v = 0.0;
  for (var j = -1; j <= 1; j = j + 1) {
    for (var i = -1; i <= 1; i = i + 1) {
      let offset = vec2<f32>(f32(i), f32(j)) * t;
      v = v + lighting_cascadeCompare(r.cascade, r.uv + offset, r.uv, r.refDepth, r.gradient);
    }
  }
  return v / 9.0;
}`,dither16:`fn lighting_sunSpiralDir(k: i32, sn: f32, cs: f32) -> vec2<f32> {
  let a = select(vec2<f32>(sn, cs), vec2<f32>(-cs, sn), (k & 1) == 1);
  return select(a, -a, (k & 2) == 2);
}
fn lighting_sunSpiralRing(j: i32) -> f32 {
  return select(select(1.4, 0.7, (j & 1) == 1), select(1.05, 0.35, (j & 1) == 1), (j & 2) == 2);
}
fn lighting_sunSpiralScale(m: i32) -> f32 {
  return select(select(1.0, 0.888, (m & 1) == 1), select(0.777, 0.666, (m & 1) == 1), (m & 2) == 2);
}
fn lighting_sunDitherTap(cascade: u32, sampleUv: vec2<f32>, centerUv: vec2<f32>, refDepth: f32, receiverPlaneDepthGradient: vec2<f32>) -> f32 {
  let reference = refDepth + dot(sampleUv - centerUv, receiverPlaneDepthGradient);
  ${Vz.quad}
  ${Vz.weights}
  ${Vz.reference}
  let c = select(vec4<f32>(0.0), vec4<f32>(1.0), ${Vz.test});
  return ${Vz.filtered};
}
fn lighting_sunDither16(r: LightingSunReceiver, unitTexels: f32, dither: f32) -> f32 {
  let t = unitTexels * r.texelUv;
  let theta = dither * 6.28318530718;
  let sn = sin(theta);
  let cs = cos(theta);
  var centre = 0.0;
  var v = 0.0;
  for (var k = 0; k < 17; k = k + 1) {
    let n = max(k - 1, 0);
    let j = n >> 2u;
    let m = n & 3;
    let offset = select(lighting_sunSpiralDir(j + m, sn, cs) * (lighting_sunSpiralRing(j) * lighting_sunSpiralScale(m) * t), vec2<f32>(0.0), k == 0);
    let tap = lighting_sunDitherTap(r.cascade, r.uv + offset, r.uv, r.refDepth, r.gradient);
    if (k == 0) {
      centre = tap;
    } else {
      v = v + tap;
    }
    if (k == 4) {
      if (v + centre >= 5.0) { return 1.0; }
      if (v + centre <= 0.0) { return 0.0; }
    }
  }
  return v * 0.0625;
}`,poisson16:`fn lighting_sunPoissonTap(r: LightingSunReceiver, radiusUv: f32, d: vec2<f32>) -> f32 {
  return lighting_cascadeCompare(r.cascade, r.uv + d * radiusUv, r.uv, r.refDepth, r.gradient);
}
fn lighting_sunPoisson16(r: LightingSunReceiver, unitTexels: f32) -> f32 {
  let radiusUv = 1.4 * unitTexels * r.texelUv;
  var v = 0.0;
  v = v + lighting_sunPoissonTap(r, radiusUv, vec2<f32>(-0.24721180, 0.93854231));
  v = v + lighting_sunPoissonTap(r, radiusUv, vec2<f32>(-0.57092249, 0.57640171));
  v = v + lighting_sunPoissonTap(r, radiusUv, vec2<f32>(-0.02226822, 0.51239359));
  v = v + lighting_sunPoissonTap(r, radiusUv, vec2<f32>(0.36767820, 0.72429270));
  v = v + lighting_sunPoissonTap(r, radiusUv, vec2<f32>(-0.05204980, 0.02313526));
  v = v + lighting_sunPoissonTap(r, radiusUv, vec2<f32>(-0.69270092, 0.09863317));
  v = v + lighting_sunPoissonTap(r, radiusUv, vec2<f32>(0.38967621, 0.06893869));
  v = v + lighting_sunPoissonTap(r, radiusUv, vec2<f32>(-0.02064722, -0.39081311));
  v = v + lighting_sunPoissonTap(r, radiusUv, vec2<f32>(-0.34250820, -0.69952250));
  v = v + lighting_sunPoissonTap(r, radiusUv, vec2<f32>(0.54199171, -0.32031199));
  v = v + lighting_sunPoissonTap(r, radiusUv, vec2<f32>(0.24239470, -0.71236521));
  v = v + lighting_sunPoissonTap(r, radiusUv, vec2<f32>(0.76471257, 0.59463602));
  v = v + lighting_sunPoissonTap(r, radiusUv, vec2<f32>(0.92431301, -0.05165050));
  v = v + lighting_sunPoissonTap(r, radiusUv, vec2<f32>(-0.53397357, -0.32564101));
  v = v + lighting_sunPoissonTap(r, radiusUv, vec2<f32>(0.67694408, -0.71075302));
  v = v + lighting_sunPoissonTap(r, radiusUv, vec2<f32>(-0.95939487, -0.25309730));
  return v * 0.0625;
}`});var yz=new Map;var uz=new Map;var tz=(e)=>({text:(e==="linear"?V7(x7(e)):x7(e)),folds:bw|J6()});function cI8(e=g7()){return j6(yz,e,tz).text}function pz(e=g7()){return j6(yz,e,tz).folds}var CYl=(function(e=g7()){return pz(e)|Hw|jw|Cw});function tLM(e=g7()){return j6(uz,e,M7)}var bz=`let dither = lighting_sunDither(fragCoord);
  let picked = lighting_pickCascadeBounds(P, dither);
  if (picked < 0) { return 1.0; }
  let cascade = u32(picked);
  ${QSU}
  var pcf = 1.0;
  if (receiver.inWindow) { pcf = lighting_sunFilter(receiver, dither); }
  var shadow = pcf;
  if (cascade + 1u >= passLights.cascadeCount) {
    let edge = lighting_sunEdgeFade(receiver.uv, viewDepth);`,q7=`var pcf = 1.0;
  var edgeUv = vec2<f32>(0.0);
  var lastCascade = true;
  if (passLights.cascadeCount == 1u) {
    let cascade = 0u;
    let only = passLights.cascadeMatrices[0] * vec4<f32>(P, 1.0);
    if (!(all(only.xy >= vec2<f32>(0.0)) && all(only.xy <= vec2<f32>(1.0)) && only.z >= 0.0 && only.z <= 1.0)) { return 1.0; }
    ${QSU}
    if (receiver.inWindow) { pcf = lighting_sunFilter(receiver, 0.0); }
    edgeUv = receiver.uv;
  } else {
    let picked = lighting_pickCascadeBounds(P, lighting_sunDither(fragCoord));
    if (picked < 0) { return 1.0; }
    let cascade = u32(picked);
    ${QSU}
    if (receiver.inWindow) { pcf = lighting_sunFilter(receiver, 0.0); }
    edgeUv = receiver.uv;
    lastCascade = cascade + 1u >= passLights.cascadeCount;
  }
  var shadow = pcf;
  if (lastCascade) {
    let edge = lighting_sunEdgeFade(edgeUv, viewDepth);`;function V7(e){if(!e.includes(bz))throw Error("lume lighting: the sun's pick is not the text the compare-only text rewrites");return e.replace(bz,q7)}function x7(e){return`override ${xw}: bool = true;
${kvg}
fn lighting_viewDepth(P: vec3<f32>) -> f32 {
  return -(frame.view * vec4<f32>(P, 1.0)).z;
}
fn lighting_geometricReceiverNormal(positionDx: vec3<f32>, positionDy: vec3<f32>, shadingNormal: vec3<f32>) -> vec3<f32> {
  let raw = cross(positionDx, positionDy);
  let lengthSq = dot(raw, raw);
  var geometric = shadingNormal;
  if (lengthSq > 1e-12) {
    geometric = raw * inverseSqrt(lengthSq);
  }
  if (dot(geometric, shadingNormal) < 0.0) {
    geometric = -geometric;
  }
  return geometric;
}
struct LightingReceiverPlaneDepth {
  gradient: vec2<f32>,
  valid: bool,
}
fn lighting_receiverPlaneDepth(cascade: u32, positionDx: vec3<f32>, positionDy: vec3<f32>) -> LightingReceiverPlaneDepth {
  let shadowDx = (passLights.cascadeMatrices[cascade] * vec4<f32>(positionDx, 0.0)).xyz;
  let shadowDy = (passLights.cascadeMatrices[cascade] * vec4<f32>(positionDy, 0.0)).xyz;
  let determinant = shadowDx.x * shadowDy.y - shadowDx.y * shadowDy.x;
  let determinantScale = max(length(shadowDx.xy) * length(shadowDy.xy), 1e-12);
  if (abs(determinant) <= determinantScale * 1e-5) {
    return LightingReceiverPlaneDepth(vec2<f32>(0.0), false);
  }
  let gradient = vec2<f32>(shadowDy.y * shadowDx.z - shadowDx.y * shadowDy.z, shadowDx.x * shadowDy.z - shadowDy.x * shadowDx.z) / determinant;
  if (!all(gradient == gradient) || any(abs(gradient) > vec2<f32>(1e20))) {
    return LightingReceiverPlaneDepth(vec2<f32>(0.0), false);
  }
  return LightingReceiverPlaneDepth(gradient, true);
}
fn lighting_cascadeCompare(cascade: u32, sampleUv: vec2<f32>, centerUv: vec2<f32>, refDepth: f32, receiverPlaneDepthGradient: vec2<f32>) -> f32 {
  let sampleDepth = refDepth + dot(sampleUv - centerUv, receiverPlaneDepthGradient);
  return lume_shadowCompare(sunCascadeMap, shadowSampler, sampleUv, i32(cascade), sampleDepth);
}
struct LightingSunReceiver {
  cascade: u32,
  uv: vec2<f32>,
  refDepth: f32,
  gradient: vec2<f32>,
  texelUv: f32,
  inWindow: bool,
}
const LIGHTING_SUN_KERNEL_UNIT_MAX_TEXELS: f32 = ${L2S}.0;
const LIGHTING_SUN_KERNEL_LINEAR: u32 = ${QR8.linear}u;
const LIGHTING_SUN_KERNEL_BOX4X4: u32 = ${QR8.box4x4}u;
const LIGHTING_SUN_KERNEL_DITHER16: u32 = ${QR8.dither16}u;
const LIGHTING_SUN_KERNEL_POISSON16: u32 = ${QR8.poisson16}u;
const LIGHTING_SUN_KERNEL_HARD: u32 = ${BC8}u;
fn lighting_sunKernelUnit(cascade: u32) -> f32 {
  let metres = passLights.sunKernel.y;
  let texelWorld = passLights.cascadeTexelWorld[cascade];
  if (metres <= 0.0 || texelWorld <= 0.0) { return passLights.cascadeRadius[cascade]; }
  return clamp(metres / texelWorld, 1.0, LIGHTING_SUN_KERNEL_UNIT_MAX_TEXELS);
}
fn lighting_sunReceiver(cascade: u32, P: vec3<f32>, positionDx: vec3<f32>, positionDy: vec3<f32>, receiverNormal: vec3<f32>, sine: f32, cosine: f32) -> LightingSunReceiver {
  let biased = P + receiverNormal * (passLights.cascadeNormalBias[cascade] * sine);
  let coord = passLights.cascadeMatrices[cascade] * vec4<f32>(biased, 1.0);
  let uv = coord.xy;
  var receiverPlaneDepthGradient = vec2<f32>(0.0);
  var fractionalSamplingSafety = 0.0;
  var depthScale = 1.0;
  let texelUv = max(passLights.clusterDepth.z, 1e-6);
  let receiverPlane = lighting_receiverPlaneDepth(cascade, positionDx, positionDy);
  if (receiverPlane.valid) {
    let maxGradient = (2.0 / 0.35) * abs(passLights.cascadeBias[cascade]) / texelUv;
    let gradientLength = length(receiverPlane.gradient);
    if (gradientLength > maxGradient) {
      receiverPlaneDepthGradient = receiverPlane.gradient * (maxGradient / gradientLength);
    } else {
      receiverPlaneDepthGradient = receiverPlane.gradient;
    }
    fractionalSamplingSafety = min(texelUv * dot(vec2<f32>(1.0), abs(receiverPlaneDepthGradient)), 0.01);
  } else {
    depthScale = 1.0 + min(sine / max(cosine, 0.15), 2.0);
  }
  let refDepth = coord.z + passLights.cascadeBias[cascade] * depthScale - fractionalSamplingSafety;
  let inWindow = uv.x >= 0.0 && uv.x <= 1.0 && uv.y >= 0.0 && uv.y <= 1.0 && refDepth >= 0.0 && refDepth <= 1.0;
  return LightingSunReceiver(cascade, uv, refDepth, receiverPlaneDepthGradient, texelUv, inWindow);
}
fn lighting_sunHard(r: LightingSunReceiver) -> f32 {
  let size = vec2<f32>(textureDimensions(sunCascadeMap, 0));
  let texel = clamp(floor(r.uv * size), vec2<f32>(0.0), size - 1.0);
  return lighting_cascadeCompare(r.cascade, (texel + 0.5) / size, r.uv, r.refDepth, r.gradient);
}
${nz[e]}
${Uz(e)}
fn lighting_sunDither(fragCoord: vec2<f32>) -> f32 {
  return lighting_interleavedGradientNoise(fragCoord);
}
fn lighting_pickCascadeBounds(P: vec3<f32>, dither: f32) -> i32 {
  let count = i32(passLights.cascadeCount);
  let band = passLights.sunSelect.y;
  for (var c = 0; c < count - 1; c = c + 1) {
    let coord = passLights.cascadeMatrices[c] * vec4<f32>(P, 1.0);
    let guard = (lighting_sunKernelUnit(u32(c)) * 1.5 + 1.0) * passLights.clusterDepth.z;
    let inner = 0.5 - guard - dither * band * 0.5;
    let d = abs(coord.xy - vec2<f32>(0.5));
    if (max(d.x, d.y) < inner && coord.z > 0.0 && coord.z < 1.0) { return c; }
  }
  let last = passLights.cascadeMatrices[count - 1] * vec4<f32>(P, 1.0);
  if (all(last.xy >= vec2<f32>(0.0)) && all(last.xy <= vec2<f32>(1.0)) && last.z >= 0.0 && last.z <= 1.0) { return count - 1; }
  return -1;
}
${KtD}
fn lighting_sunEdgeFade(uv: vec2<f32>, viewDepth: f32) -> f32 {
  let start = passLights.sunSelect.z;
  let end = passLights.sunSelect.w;
  if (end <= start) { return 0.0; }
  let extent = max(abs(uv.x - 0.5), abs(uv.y - 0.5)) * 2.0;
  let spatial = clamp((extent - start) / (end - start), 0.0, 1.0);
  let gate = passLights.sunKernel.z;
  let far = passLights.cascadeSplits[max(passLights.cascadeCount, 1u) - 1u];
  var distanceGate = 1.0;
  if (gate > 0.0) { distanceGate = clamp((viewDepth - far * (1.0 - gate)) / max(far * gate, 1e-3), 0.0, 1.0); }
  return spatial * distanceGate;
}
fn lighting_cloudBeam(field: f32, threshold: f32, opacity: f32) -> f32 {
  let density = clamp((field - threshold) / ${vI}, 0.0, 1.0);
  let transmittance = exp(-density * opacity * ${rI.toFixed(1)});
  return clamp((transmittance - ${qI}) / ${1-qI}, 0.0, 1.0);
}
var<private> lighting_cloud: f32 = 1.0;
fn lighting_cloudPrepare(P: vec3<f32>) {
  lighting_cloud = lighting_cloudShadow(P + frame.renderOrigin);
}
${ahl}
  let a = passLights.cloudShadowA;
  let strength = a.w;
  if (strength <= 0.0) {
    return 1.0;
  }
  let sun = passLights.sunDirection;
  let rise = a.x - P.y;
  if (rise <= 0.0 || sun.y <= 0.02) {
    return 1.0;
  }
  let b = passLights.cloudShadowB;
  let foot = P.xz + sun.xz * (rise / sun.y);
  let c = passLights.cloudShadowC;
  let planePos = foot * b.w - (c.xy + c.zw * (frame.time - passLights.cloudShadowT0.x));
  let uv = (planePos - b.xy) * b.z + 0.5;
  let eye = frame.cameraPosition + frame.renderOrigin;
  let faceHeight = abs(a.x - eye.y);
  let fade = 1.0 - smoothstep(max(f32(${o6}) * faceHeight, f32(${wK})), max(f32(${Q6}) * faceHeight, f32(${wK*3})), distance(vec3<f32>(foot.x, a.x, foot.y), eye));
  let rim = (1.0 - smoothstep(0.46, 0.5, max(abs(uv.x - 0.5), abs(uv.y - 0.5)))) * fade;
  let dims = vec2<f32>(textureDimensions(cloudShadowField));
  let span = max(dims - 1.0, vec2<f32>(1.0));
  let wrap = uv * span + passLights.cloudShadowT0.zw - 0.5;
  let far = textureSampleLevel(cloudShadowField, iblSampler, (wrap - floor(wrap / span) * span + 0.5) / dims, 0.0);
  let threshold = 1.0 - a.z;
  let visibility = min(mix(lighting_cloudBeam(fma(far.a, ${JI}, far.r), threshold, a.y), 1.0, 1.0 - rim), lighting_cloudBeam(threshold + ${NI} * smoothstep(${jI}, 1.0, a.z), threshold, a.y));
  let lowSun = smoothstep(0.02, 0.15, sun.y);
  return mix(1.0, visibility, strength * lowSun);
}
${jWZ}
  let fill = passLights.cloudShadowT0.y;
  if (fill <= 0.0 || receiveShadow <= 0.5) {
    return vec3<f32>(0.0);
  }
  let loss = 1.0 - lighting_cloud;
  return passLights.sunColor * passLights.sunIntensity * (fill * loss * max(passLights.sunDirection.y, 0.0) * (N.y * 0.5 + 0.5) * 0.31830988618);
}
fn lighting_cascadeShadowPrepared(P: vec3<f32>, positionDx: vec3<f32>, positionDy: vec3<f32>, shadingNormal: vec3<f32>, viewDepth: f32, fragCoord: vec2<f32>) -> f32 {
  return lighting_cascadeMapShadow(P, positionDx, positionDy, shadingNormal, viewDepth, fragCoord) * lighting_cloudShadow(P + frame.renderOrigin)${i7("CELL_LIGHT_SUN_TERM_WGSL")};
}
${i7("CELL_LIGHT_READ_WGSL").replace(/.$/s,`$&
`)}fn lighting_groundOcclusion(P: vec3<f32>, N: vec3<f32>) -> f32 {
  return 1.0${i7("CELL_LIGHT_SKY_TERM_WGSL")};
}
fn lighting_skyAt(P: vec3<f32>, N: vec3<f32>) -> f32 {
  return 1.0${i7("CELL_LIGHT_SKY_AT_TERM_WGSL")};
}

fn lighting_cascadeMapShadow(P: vec3<f32>, positionDx: vec3<f32>, positionDy: vec3<f32>, shadingNormal: vec3<f32>, viewDepth: f32, fragCoord: vec2<f32>) -> f32 {
  if (!${xw}) {
    return 1.0;
  }
  let arrival = passLights.clusterDepth.w;
  if (passLights.shadowsEnabled < 0.5 || passLights.cascadeCount == 0u || arrival <= 0.0) {
    return 1.0;
  }
  let shadowFar = passLights.sunShadowFar;
  if (viewDepth >= shadowFar) {
    return 1.0;
  }
  ${nRh}
  let cosine = clamp(dot(receiverNormal, passLights.sunDirection), 0.0, 1.0);
  let sine = sqrt(max(1.0 - cosine * cosine, 0.0));
  let dither = lighting_sunDither(fragCoord);
  let picked = lighting_pickCascadeBounds(P, dither);
  if (picked < 0) { return 1.0; }
  let cascade = u32(picked);
  ${QSU}
  var pcf = 1.0;
  if (receiver.inWindow) { pcf = lighting_sunFilter(receiver, dither); }
  var shadow = pcf;
  if (cascade + 1u >= passLights.cascadeCount) {
    let edge = lighting_sunEdgeFade(receiver.uv, viewDepth);
    if (passLights.sunKernel.w > 0.5) {
      let shaped = edge + pcf;
      shadow = clamp(shaped * shaped, 0.0, 1.0);
    } else {
      shadow = mix(pcf, 1.0, edge);
    }
  }
  shadow = mix(shadow, 1.0, lighting_sunReachFade(viewDepth, shadowFar));
  if (arrival < 1.0) {
    shadow = mix(1.0, shadow, arrival);
  }
  return shadow;
}
fn lighting_cascadeShadow(P: vec3<f32>, N: vec3<f32>, viewDepth: f32, fragCoord: vec2<f32>) -> f32 {
  let positionDx = dpdx(P);
  let positionDy = dpdy(P);
  return lighting_cascadeShadowPrepared(P, positionDx, positionDy, N, viewDepth, fragCoord);
}`}function E7(e,t,r){return`  let light = sceneLights[lightIndex];
  let lightVector = light.positionShine.xyz - P;
  let distanceSquared = dot(lightVector, lightVector);
  let cutoff = light.penumbraCullShadow.y;
  if (distanceSquared >= cutoff * cutoff || light.directionCone.w < -3.5) {
    if (${iw} && light.directionCone.w < -3.5 && distanceSquared < cutoff * cutoff) {
      let rect = lighting_rectSample(light, P, N, V, roughness, cutoff);
      return ${r};
    }
    return ${t};
  }
  let lightDirection = lightVector * inverseSqrt(max(distanceSquared, 1e-10));
  if (dot(N, lightDirection) <= ${e}) {
    return ${t};
  }
  var attenuation = lighting_distanceAttenuation(distanceSquared, cutoff, light.colorDecay.w);
  let isPoint = light.directionCone.w < -1.5;
  if (!isPoint) {
    attenuation = attenuation * smoothstep(light.directionCone.w, light.penumbraCullShadow.x, dot(-lightDirection, light.directionCone.xyz));
  }
  if (isPoint && light.directionCone.x > 0.5 && attenuation > 0.0) {
    attenuation = attenuation * lighting_fanReach(u32(light.directionCone.x), lightVector);
  }
  if (attenuation <= 0.0) {
    return ${t};
  }
  let lightColor = light.colorDecay.rgb * attenuation;
  var lightShadow = 1.0;
  let slotBase = light.penumbraCullShadow.z;
  if (${Qw} && passLights.shadowsEnabled > 0.5 && slotBase >= 0.0 && receiveShadow > 0.5) {
    let faceIndex = lighting_atlasFaceIndex(i32(slotBase), isPoint, P - light.positionShine.xyz);
    let proj = lighting_atlasProject(faceIndex, P, N, lightDirection);
    var shadowTerm = 1.0;
    if (proj.inFrustum) {
      shadowTerm = lighting_atlasCompareTap(proj);
    }
    lightShadow = mix(1.0, shadowTerm, light.penumbraCullShadow.w);
  }
${i7("CELL_LIGHT_LOCAL_TERM_WGSL")}`}function M7(e){return`${cI8(e)}
${cz}
fn lighting_fanPoint(base: u32, index: u32) -> vec4<f32> {
  let record = sceneLights[base + (index >> 2u)];
  switch (index & 3u) {
    case 0u { return record.positionShine; }
    case 1u { return record.colorDecay; }
    case 2u { return record.directionCone; }
    default { return record.penumbraCullShadow; }
  }
}
fn lighting_fanReach(back: u32, toLight: vec3<f32>) -> f32 {
  let header = arrayLength(&sceneLights) - back;
  let head = sceneLights[header];
  let count = u32(head.positionShine.x);
  if (count < 2u) {
    return 0.0;
  }
  let d = vec2<f32>(dot(-toLight, head.colorDecay.xyz), dot(-toLight, head.directionCone.xyz));
  let base = header + 1u;
  var turned = atan2(d.y, d.x) - head.positionShine.z;
  turned = turned - floor(turned / 6.28318530718) * 6.28318530718;
  var lo = 0u;
  var hi = count;
  loop {
    if (hi - lo <= 1u) {
      break;
    }
    let mid = (lo + hi) >> 1u;
    if (lighting_fanPoint(base, mid).z <= turned) {
      lo = mid;
    } else {
      hi = mid;
    }
  }
  let a = lighting_fanPoint(base, lo);
  let wraps = lo + 1u >= count;
  let b = lighting_fanPoint(base, select(lo + 1u, 0u, wraps));
  if (select(b.z, 6.28318530718, wraps) - a.z >= 3.14159265359) {
    return 0.0;
  }
  let edge = b.xy - a.xy;
  return select(0.0, 1.0, edge.x * (d.y - a.y) - edge.y * (d.x - a.x) >= 0.0);
}
${b7}
fn lighting_clusterIndex(fragCoord: vec2<f32>, viewDepth: f32) -> u32 {
  if (!${N6} || passLights.clusteredLightCount == 0u) {
    return 0u;
  }
  return lighting_froxelAt(fragCoord / frame.viewportSize, viewDepth);
}
fn lighting_clusterListBase(c: u32) -> u32 {
  return clusterRanges[c].x;
}
override ${N6}: bool = true;
override ${Qw}: bool = true;
override ${iw}: bool = true;
fn lighting_clusterListCount(c: u32) -> u32 {
  if (!${N6}) {
    return 0u;
  }
  ${zQ}
}
fn lighting_atlasFaceIndex(baseIndex: i32, isPoint: bool, lightToSurface: vec3<f32>) -> i32 {
  if (!isPoint) {
    return baseIndex;
  }
  let absDir = abs(lightToSurface);
  var face = 0;
  if (absDir.x >= absDir.y && absDir.x >= absDir.z) {
    face = select(1, 0, lightToSurface.x >= 0.0);
  } else if (absDir.y >= absDir.z) {
    face = select(3, 2, lightToSurface.y >= 0.0);
  } else {
    face = select(5, 4, lightToSurface.z >= 0.0);
  }
  return baseIndex + face;
}
struct AtlasProjection {
  inFrustum: bool,
  baseUv: vec2<f32>,
  windowLo: vec2<f32>,
  windowHi: vec2<f32>,
  texelUv: f32,
  referenceDepth: f32,
}
fn lighting_atlasProject(faceIndex: i32, P: vec3<f32>, N: vec3<f32>, L: vec3<f32>) -> AtlasProjection {
  let slot = atlasSlots[faceIndex];
  var proj: AtlasProjection;
  let faceAxis = vec3<f32>(slot.matrix[0].w, slot.matrix[1].w, slot.matrix[2].w);
  let eyeDepth = dot(vec4<f32>(faceAxis, slot.matrix[3].w), vec4<f32>(P, 1.0));
  if (eyeDepth <= 0.0) {
    return proj;
  }
  let texelWorld = eyeDepth * slot.params.y;
  let cosine = clamp(abs(dot(N, L)), ${Tnd}, 1.0);
  let sine = sqrt(max(1.0 - cosine * cosine, 0.0));
  let axisCosine = abs(dot(N, faceAxis));
  let axisSine = sqrt(max(1.0 - axisCosine * axisCosine, 0.0));
  let raySlope = axisSine * abs(dot(faceAxis, L)) / cosine;
  let biased = P + N * (texelWorld * ${q4s.toFixed(1)} * sine);
  let lightCoord = slot.matrix * vec4<f32>(biased, 1.0);
  if (lightCoord.w <= 0.0) {
    return proj;
  }
  let projected = lightCoord.xyz / lightCoord.w;
  let faceUv = clamp(projected.xy, vec2<f32>(0.0), vec2<f32>(1.0));
  let slopeWorld = texelWorld * (${YNR} * raySlope + ${gMc});
  let depthBias = slopeWorld * slot.params.x / (lightCoord.w * lightCoord.w) + ${RSL};
  let referenceDepth = projected.z - depthBias;
  proj.inFrustum = referenceDepth <= 1.0;
  let gutterUv = slot.params.z * ${hAm.toFixed(1)};
  proj.windowLo = slot.uvRect.xy + vec2<f32>(gutterUv);
  proj.windowHi = slot.uvRect.xy + slot.uvRect.zw - vec2<f32>(gutterUv);
  proj.baseUv = slot.uvRect.xy + faceUv * slot.uvRect.zw;
  proj.texelUv = slot.params.z;
  proj.referenceDepth = referenceDepth;
  return proj;
}
${P9}
fn lighting_atlasCompareTap(proj: AtlasProjection) -> f32 {
  let t0 = lume_atlasShadowCompare(shadowAtlasMap, shadowSampler, clamp(proj.baseUv + vec2<f32>(-1.0, 0.5) * proj.texelUv, proj.windowLo, proj.windowHi), 0, proj.referenceDepth);
  let t1 = lume_atlasShadowCompare(shadowAtlasMap, shadowSampler, clamp(proj.baseUv + vec2<f32>(0.5, 1.0) * proj.texelUv, proj.windowLo, proj.windowHi), 0, proj.referenceDepth);
  let t2 = lume_atlasShadowCompare(shadowAtlasMap, shadowSampler, clamp(proj.baseUv + vec2<f32>(1.0, -0.5) * proj.texelUv, proj.windowLo, proj.windowHi), 0, proj.referenceDepth);
  let t3 = lume_atlasShadowCompare(shadowAtlasMap, shadowSampler, clamp(proj.baseUv + vec2<f32>(-0.5, -1.0) * proj.texelUv, proj.windowLo, proj.windowHi), 0, proj.referenceDepth);
  return (t0 + t1 + t2 + t3) * 0.25;
}
struct ClusteredLightSample {
  radiance: vec3<f32>,
  direction: vec3<f32>,
  color: vec3<f32>,
  shadow: f32,
}
${Gz}
fn lighting_sampleClusteredLight(lightIndex: u32, P: vec3<f32>, N: vec3<f32>, V: vec3<f32>, roughness: f32, receiveShadow: f32, facingFloor: f32) -> ClusteredLightSample {
  var sample: ClusteredLightSample;
  sample.radiance = vec3<f32>(0.0);
  sample.color = vec3<f32>(0.0);
  sample.shadow = 1.0;
  sample.direction = vec3<f32>(0.0);
${E7("facingFloor","sample","rect")}
  sample.direction = lightDirection;
  sample.shadow = lightShadow;
  sample.color = lightColor;
  sample.radiance = lightColor * lightShadow;
  return sample;
}`}var lz=`fn lighting_modelSunShadow(N: vec3<f32>, P: vec3<f32>, fragCoord: vec2<f32>, receiveShadow: f32) -> f32 {
  let positionDx = dpdx(P);
  let positionDy = dpdy(P);
  if (receiveShadow <= 0.5 || dot(N, passLights.sunDirection) <= 0.0) {
    return 1.0;
  }
  return lighting_cascadeShadowPrepared(P, positionDx, positionDy, N, lighting_viewDepth(P), fragCoord);
}`,w7=(e,t,r)=>`  for (var i = 0u; i < passLights.globalLightCount; i = i + 1u) {
    let light = sceneLights[i];
${t}
  }
  let clusterIndex = lighting_clusterIndex(fragCoord, ${e});
  let listBase = lighting_clusterListBase(clusterIndex);
  let listCount = lighting_clusterListCount(clusterIndex);
  let lastEntry = arrayLength(&clusterIndices) - 1u;
  var nextIndex = clusterIndices[min(listBase, lastEntry)];
  for (var i = 0u; i < listCount; i = i + 1u) {
    let lightIndex = nextIndex;
    nextIndex = clusterIndices[min(listBase + i + 1u, lastEntry)];
${r}
  }`;function U7(e=g7()){return`${tLM(e)}

${o0q}

${cFn}
${lz}
${I7}
fn lighting_wrapClusteredIrradiance(N: vec3<f32>, P: vec3<f32>, fragCoord: vec2<f32>, wrap: f32) -> vec3<f32> {
  var sum = vec3<f32>(0.0);
${w7("lighting_viewDepth(P)",`    let dotNL = clamp((dot(N, -light.directionCone.xyz) + wrap) / (1.0 + wrap), 0.0, 1.0);
    sum = sum + light.colorDecay.rgb * dotNL;`,`    let s = lighting_sampleClusteredLight(lightIndex, P, N, vec3<f32>(0.0), 1.0, 1.0, -wrap);
    let dotNL = clamp((dot(N, s.direction) + wrap) / (1.0 + wrap), 0.0, 1.0);
    sum = sum + s.radiance * dotNL;`)}
  return sum;
}`}var nzJ=(e)=>e?`${clN(1)}
${U7()}`:`${qQ}
${o0q}
${cFn}`;function Mz(e=g7()){return`${tLM(e)}

${o0q}

${cFn}

${lz}

fn lighting_phongClusteredDirect(N: vec3<f32>, V: vec3<f32>, P: vec3<f32>, albedo: vec3<f32>, roughness: f32, fragCoord: vec2<f32>) -> vec3<f32> {
  var sum = vec3<f32>(0.0);
${w7("lighting_viewDepth(P)",`    let L = -light.directionCone.xyz;
    sum = sum + albedo * light.colorDecay.rgb * max(dot(N, L), 0.0) * 0.31830988618 + shade_blinnSpecular(N, V, L, roughness, light.colorDecay.rgb * light.positionShine.w);`,`    let s = lighting_sampleClusteredLight(lightIndex, P, N, V, roughness, 1.0, 0.0);
    sum = sum + albedo * s.radiance * max(dot(N, s.direction), 0.0) * 0.31830988618 + shade_blinnSpecular(N, V, s.direction, roughness, s.radiance * sceneLights[lightIndex].positionShine.w);`)}
  return sum;
}`}function d7(e=g7()){return`${tLM(e)}

${o0q}

${cFn}

${lz}

fn lighting_toonClusteredDirect(N: vec3<f32>, P: vec3<f32>, steps: f32, fragCoord: vec2<f32>) -> vec3<f32> {
  var sum = vec3<f32>(0.0);
${w7("lighting_viewDepth(P)","    sum = sum + light.colorDecay.rgb * shade_toonBandFactor(dot(N, -light.directionCone.xyz), steps);",`    let s = lighting_sampleClusteredLight(lightIndex, P, N, vec3<f32>(0.0), 1.0, 1.0, 0.0);
    sum = sum + s.radiance * shade_toonBandFactor(dot(N, s.direction), steps);`)}
  return sum;
}`}var o0q=`
fn lighting_shIrradiance(N: vec3<f32>) -> vec3<f32> {
  let x = N.x;
  let y = N.y;
  let z = N.z;
  var result = passLights.sh[0].rgb * 0.886227;
  result = result + passLights.sh[1].rgb * (1.023328 * y);
  result = result + passLights.sh[2].rgb * (1.023328 * z);
  result = result + passLights.sh[3].rgb * (1.023328 * x);
  result = result + passLights.sh[4].rgb * (0.858086 * x * y);
  result = result + passLights.sh[5].rgb * (0.858086 * y * z);
  result = result + passLights.sh[6].rgb * (0.743125 * z * z - 0.247708);
  result = result + passLights.sh[7].rgb * (0.858086 * x * z);
  result = result + passLights.sh[8].rgb * (0.429043 * (x * x - y * y));
  return max(result, vec3<f32>(0.0));
}
fn lighting_ambientIrradiance(N: vec3<f32>) -> vec3<f32> {
  if (passLights.sh[0].w <= 0.0) {
    return vec3<f32>(0.0);
  }
  let hemi = mix(passLights.hemiGround, passLights.hemiSky, N.y * 0.5 + 0.5);
  return passLights.ambientColor + hemi + lighting_shIrradiance(N);
}
fn lighting_iblShIrradiance(N: vec3<f32>) -> vec3<f32> {
  let x = N.x;
  let y = N.y;
  let z = N.z;
  var result = iblSh[0].rgb * 0.282095;
  result += iblSh[1].rgb * (0.488603 * y);
  result += iblSh[2].rgb * (0.488603 * z);
  result += iblSh[3].rgb * (0.488603 * x);
  result += iblSh[4].rgb * (1.092548 * x * y);
  result += iblSh[5].rgb * (1.092548 * y * z);
  result += iblSh[6].rgb * (0.315392 * (3.0 * z * z - 1.0));
  result += iblSh[7].rgb * (1.092548 * x * z);
  result += iblSh[8].rgb * (0.546274 * (x * x - y * y));
  return max(result, vec3<f32>(0.0));
}`;var cFn=`
fn lighting_indirectIrradiance(N: vec3<f32>) -> vec3<f32> {
  return lighting_ambientIrradiance(N) + lighting_iblShIrradiance(N) * (passLights.iblParams.x * 3.14159265359);
}`;var I7=`
fn lighting_wrapSkyIrradiance(N: vec3<f32>) -> vec3<f32> {
  if (frame.flatArt > 0.5) {
    return passLights.flatArtAmbient;
  }
  return lighting_indirectIrradiance(N);
}`;var y7=`${o0q}
fn lighting_dfgApprox(roughness: f32, dotNV: f32) -> vec2<f32> {
  let c0 = vec4<f32>(-1.0, -0.0275, -0.572, 0.022);
  let c1 = vec4<f32>(1.0, 0.0425, 1.04, -0.04);
  let r = c0 * roughness + c1;
  let a004 = min(r.x * r.x, exp2(-9.28 * dotNV)) * r.x + r.y;
  return vec2<f32>(-1.04, 1.04) * a004 + r.zw;
}
struct LightingScatter {
  single: vec3<f32>,
  multi: vec3<f32>,
}
fn lighting_multiscatter(f0: vec3<f32>, fab: vec2<f32>) -> LightingScatter {
  let FssEss = f0 * fab.x + vec3<f32>(fab.y);
  let Ess = fab.x + fab.y;
  let Ems = 1.0 - Ess;
  let Favg = f0 + (vec3<f32>(1.0) - f0) * 0.047619;
  let Fms = FssEss * Favg / (vec3<f32>(1.0) - Favg * Ems);
  var scatter: LightingScatter;
  scatter.single = FssEss;
  scatter.multi = Fms * Ems;
  return scatter;
}
fn lighting_iblEnvironment(N: vec3<f32>, V: vec3<f32>, P: vec3<f32>, albedo: vec3<f32>, roughness: f32, metalness: f32, receiveShadow: f32) -> vec3<f32> {
  let intensity = passLights.iblParams.x;
  let fill = lighting_cloudFill(N, receiveShadow);
  if (intensity <= 0.0 && fill.r + fill.g + fill.b <= 0.0) {
    return vec3<f32>(0.0);
  }
  let fab = lighting_dfgApprox(roughness, clamp(dot(N, V), 0.0, 1.0));
  let dielectric = lighting_multiscatter(shade_specularF0, fab);
  let metallic = lighting_multiscatter(albedo, fab);
  let single = mix(dielectric.single, metallic.single, metalness);
  let multi = mix(dielectric.multi, metallic.multi, metalness);
  let diffuse = albedo * (1.0 - metalness) * (vec3<f32>(1.0) - dielectric.single - dielectric.multi);
  if (intensity <= 0.0) {
    return (multi + diffuse) * fill;
  }
  let r4 = roughness * roughness * roughness * roughness;
  let direction = normalize(mix(reflect(-V, N), N, r4));
  let radiance = lume_cubeSampleLevel(iblEnvMap, iblSampler, direction, roughness * passLights.iblParams.y, passLights.iblParams.y + 1.0).rgb * intensity;
  let cosineIrradiance = lighting_iblShIrradiance(N) * intensity + fill;
  return radiance * single + (multi + diffuse) * cosineIrradiance;
}`;var O7="fn lighting_evaluate(N: vec3<f32>, V: vec3<f32>, P: vec3<f32>, albedo: vec3<f32>, roughness: f32, metalness: f32, occlusion: f32, fragCoord: vec2<f32>, receiveShadow: f32) -> vec3<f32>";var T7="N, V, P, albedo, roughness, metalness, occlusion, fragCoord, receiveShadow";var l7={geometryNormal:!1,attribute:!1,materialInputs:[]};var Kz=((e=l7)=>T7+", positionDx, positionDy"+(e.geometryNormal?", Ng":"")+(e.attribute?", surfaceAttribute":"")+e.materialInputs.map((e)=>`, ${e.param}`).join(""));var Ez=(function(e,t){let r=(t.geometryNormal?", Ng: vec3<f32>":"")+(t.attribute?", surfaceAttribute: u32":"")+t.materialInputs.map((e)=>`, ${e.param}: ${MNB(e.node.type)}`).join("");return r===""?e:U(e,r)});var P7="select(reflected, min(reflected, vec3<f32>(1.0)), frame.toneMap > 1.5)";var Q7=((e,t)=>t===""?e:e.replace(/^fn (\w+)\(/,`fn $1${t}(`));var F7=((e,t=l7,r="")=>`${Ez(Q7(O7,r),t)} {
  let positionDx = dpdx(P);
  let positionDy = dpdy(P);
  let pixelRoughness = lighting_pixelRoughness(N, roughness);
  let groundedOcclusion = occlusion * lighting_groundOcclusion(P, N);
  let reflected = ${e}(${Kz(t).replace("roughness","pixelRoughness").replace("occlusion","groundedOcclusion")})${i7("CELL_LIGHT_GLOW_TERM_WGSL")};
  return ${P7};
}`);var xz=O7.replace("lighting_evaluate(","lighting_evaluatePrepared(").replace("receiveShadow: f32)","receiveShadow: f32, positionDx: vec3<f32>, positionDy: vec3<f32>)");var Yz=O7.replace("lighting_evaluate(","lighting_evaluateWithSunShadow(").replace("receiveShadow: f32)","receiveShadow: f32, viewDepth: f32, sunShadow: f32, positionDx: vec3<f32>, positionDy: vec3<f32>)");var _7={suffix:"",lobe:"shade_cookTorranceSun",indirect:"(shade_ambientPbr(N, V, albedo, roughness, metalness, lighting_ambientIrradiance(N)) + lighting_iblEnvironment(N, V, P, albedo, roughness, metalness, receiveShadow))",facingFloor:"0.0"};var Rz={suffix:"Physical",lobe:"shade_physicalLight",indirect:"shade_physicalIndirect(N, V, P, albedo, roughness, metalness, receiveShadow)",facingFloor:"SHADE_PHYSICAL_FACING_FLOOR"};function D7(e=_7){let t=e.suffix;return`
fn lighting_clusteredLight${t}(lightIndex: u32, N: vec3<f32>, V: vec3<f32>, P: vec3<f32>, albedo: vec3<f32>, roughness: f32, metalness: f32, receiveShadow: f32) -> vec3<f32> {
${E7(e.facingFloor,"vec3<f32>(0.0)",`${e.lobe}(N, V, rect.direction, albedo, roughness, metalness, rect.radiance, light.positionShine.w)`)}
  return ${e.lobe}(N, V, lightDirection, albedo, roughness, metalness, lightColor * lightShadow, light.positionShine.w);
}
${Q7(Yz,t)} {
  var color = vec3<f32>(0.0);
  let sunRadiance = passLights.sunColor * passLights.sunIntensity;
  if (sunRadiance.r + sunRadiance.g + sunRadiance.b > 0.0) {
    color = color + ${e.lobe}(N, V, passLights.sunDirection, albedo, roughness, metalness, sunRadiance, passLights.iblParams.z) * sunShadow;
  }
${w7("viewDepth",`    color = color + ${e.lobe}(N, V, -light.directionCone.xyz, albedo, roughness, metalness, light.colorDecay.rgb, light.positionShine.w);`,`    color = color + lighting_clusteredLight${t}(lightIndex, N, V, P, albedo, roughness, metalness, receiveShadow);`)}
  color = color + ${e.indirect} * occlusion;
  return color;
}
${Q7(xz,t)} {
  lighting_cloudPrepare(P);
  let viewDepth = lighting_viewDepth(P);
  let sunShadow = lighting_sunShadowPrepared(N, P, viewDepth, fragCoord, receiveShadow, positionDx, positionDy, true);
  return lighting_evaluateWithSunShadow${t}(${T7}, viewDepth, sunShadow, positionDx, positionDy);
}
${F7(`lighting_evaluatePrepared${t}`,l7,t)}`}var Hz=({N:e,V:t,P:r,albedo:i,roughness:n,metalness:l,occlusion:s,receiveShadow:o})=>`lighting_evaluatePhysical(${e}, ${t}, ${r}, ${i}, ${n}, ${l}, ${s??"1.0"}, in.position.xy, ${o??"1.0"})`,$z=((e)=>({get defs(){return e()},call:Hz}));function mz(e){let t={geometryNormal:e.readsGeometryNormal===!0,attribute:e.readsAttribute===!0,materialInputs:e.materialInputs??[]},r=e.canSkipEvaluation?`
${Ez(Yz,t)} {
  return lighting_scriptedPrepared(${Kz(t)}, sunShadow);
}
${Ez(xz,t)} {
  return lighting_scripted(${Kz(t)});
}`:"";return`${e.defs}
${r}

${F7("lighting_scripted",t)}`}var xYN=(function(e){return Lz(Boolean(e.programKey),e.readsGeometryNormal===!0,e.readsAttribute===!0)});var Lz=(function(e,t,r){let i=e?"lighting_scripted":"lighting_evaluatePrepared",n=e&&r;return`fn lighting_evaluateResolved(N: vec3<f32>, V: vec3<f32>, P: vec3<f32>, albedo: vec3<f32>, pixelRoughness: f32, metalness: f32, occlusion: f32, fragCoord: vec2<f32>, receiveShadow: f32, positionDx: vec3<f32>, positionDy: vec3<f32>${t?", Ng: vec3<f32>":""}${n?", surfaceAttribute: u32":""}) -> vec3<f32> {
  let groundedOcclusion = occlusion * lighting_groundOcclusion(P, N);
  let reflected = ${i}(N, V, P, albedo, pixelRoughness, metalness, groundedOcclusion, fragCoord, receiveShadow, positionDx, positionDy${t?", Ng":""}${n?", surfaceAttribute":""})${i7("CELL_LIGHT_GLOW_TERM_WGSL")};
  return ${P7};
}`});function r7(a,b,c){return (r7=$c0C(16)).call(this,a,b,c)}function j7(e=fX(),t=g7()){let r=e!==null?mz(e):D7();return`${tLM(t)}

${y7}

${`${mz2()?B7X:""}fn lighting_sunShadowPrepared(N: vec3<f32>, P: vec3<f32>, viewDepth: f32, fragCoord: vec2<f32>, receiveShadow: f32, positionDx: vec3<f32>, positionDy: vec3<f32>, sunFacingGate: bool) -> f32 {
  let sunRadiance = passLights.sunColor * passLights.sunIntensity;
  if (sunRadiance.r + sunRadiance.g + sunRadiance.b > 0.0) {
    if (receiveShadow > 0.5 && (!sunFacingGate || dot(N, passLights.sunDirection) > 0.0)) {
      return lighting_cascadeMapShadow(P, positionDx, positionDy, N, viewDepth, fragCoord) * lighting_cloud${i7("CELL_LIGHT_BARE_SUN_TERM_WGSL")}${mz2()?ZsE:""};
    }
  }
  return 1.0${i7("CELL_LIGHT_BARE_SUN_TERM_WGSL")};
}`}

${_r}

${r}`}function X7(e=JzL(),t=g7(),r=!1){let i=p7(Boolean(e?.hash),e?.readsGeometryNormal===!0,e?.readsAttribute===!0,e?.materialInputs?.length??0,e?.ref??"");let n=null;let l=null;let s=null;let o=null;return{programKey:e?.hash??"",get programWord(){s??=e===null?"":Az(e,t,n??=j7(e,t));return s},...r?{materialProgram:!0,...e===null?{}:{ownProgram:e}}:{},get textIdentity(){o??={key:`clustered/${t}/${e===null?"standard":this.programWord}`,taints:XX(e)};return o},...e===null||e.canSkipEvaluation?{preparedEvaluation:{sunFacingGate:e===null,usesSun:e?.hasLightFolds!==!1}}:{},...e?.readsGeometryNormal?{readsGeometryNormal:!0}:{},...e?.readsAttribute?{readsAttribute:!0}:{},...e?.readsScreenSteps?{readsScreenSteps:!0}:{},...e?.surfaceArms!==void 0?{surfaceArms:e.surfaceArms}:{},...e?.discards?{discards:!0}:{},...e?.materialInputs!==void 0?{materialInputs:e.materialInputs.map((e)=>e.node)}:{},wgslDefs:clN(1,e?.params!==void 0),get evaluateDefs(){return wg6(e),n??=j7(e,t),n},...e===null?{physicalEvaluate:$z(()=>l??=D7(Rz))}:{},wrapEvaluateDefs:U7(t),phongEvaluateDefs:Mz(t),toonEvaluateDefs:d7(t),foldDefsCarryClusterTaps:!0,declaredFolds:CYl(t),sunDirection:"passLights.sunDirection",sunRadiance:"(passLights.sunColor * passLights.sunIntensity)",ambientColor:"passLights.ambientMean",flatArtAmbientColor:"passLights.flatArtAmbient",...i}}var p7=(function(e,t,r,i,n){let l=(t)=>e&&r?`, ${t??"0u"}`:"";return{indirectIrradiance:(e)=>`lighting_indirectIrradiance(${e})`,evaluate:({N:e,V:r,P:s,albedo:o,roughness:a,metalness:u,occlusion:d,receiveShadow:f,geometryNormal:c,attribute:h,materialInputs:p})=>`lighting_evaluate(${e}, ${r}, ${s}, ${o}, ${a}, ${u}, ${d??"1.0"}, in.position.xy, ${f??"1.0"}${t?`, ${c??e}`:""}${l(h)}${qz(i,n,p)})`,...i>0?{}:{evaluateUnderBranch:({N:i,V:n,P:s,albedo:o,roughness:a,metalness:u,occlusion:d,receiveShadow:f,geometryNormal:c,attribute:h},p)=>({defs:Lz(e,t,r),steps:[`  let lume_litDx = ${p?.dx??`dpdx(${s})`};`,`  let lume_litDy = ${p?.dy??`dpdy(${s})`};`,`  let lume_litRoughness = lighting_pixelRoughness(${i}, ${a});`],call:`lighting_evaluateResolved(${i}, ${n}, ${s}, ${o}, lume_litRoughness, ${u}, ${d??"1.0"}, in.position.xy, ${f??"1.0"}, lume_litDx, lume_litDy${t?`, ${c??i}`:""}${l(h)})`}),evaluateAtVertex:{defs:()=>r7(e,t,r),call:({N:e,V:r,P:i,albedo:n,roughness:s,metalness:o,occlusion:a,receiveShadow:u,geometryNormal:d,attribute:f},c,h)=>`lighting_evaluateResolvedAtSun(${e}, ${r}, ${i}, ${n}, ${s}, ${o}, ${a??"1.0"}, ${c}, ${u??"1.0"}, vec3<f32>(0.0), vec3<f32>(0.0)${t?`, ${d??e}`:""}${l(f)}, ${h})`,sunShadow:({N:t,P:r,receiveShadow:i},n,l)=>`lighting_sunShadowPrepared(${t}, ${r}, lighting_viewDepth(${r}), in.position.xy, ${i??"1.0"}, ${n}, ${l}, ${e?"false":"true"})`}}}});function qz(e,t,r){if(e===0)return"";if(r?.length!==e){W(t,e,r);}return r.map((e)=>`, ${e}`).join("")}var ez=new WeakMap;function fr6(e){let t=ez.get(e);if(t!==void 0)return t;let r=e.textIdentity;if(r===void 0||!r.key.startsWith("clustered/")||e.materialProgram||e.materialInputs!==void 0)return null;let{evaluateDefs:i,wrapEvaluateDefs:n,phongEvaluateDefs:l,toonEvaluateDefs:s}=e;if(i===void 0||n===void 0||l===void 0||s===void 0||!e.foldDefsCarryClusterTaps)return null;let o={key:r.key,taints:r.taints,programKey:e.programKey??"",programWord:e.programWord??"",...e.preparedEvaluation===void 0?{}:({preparedEvaluation:e.preparedEvaluation}),readsGeometryNormal:e.readsGeometryNormal===!0,readsAttribute:e.readsAttribute===!0,readsScreenSteps:e.readsScreenSteps===!0,surfaceArms:e.surfaceArms??0,discards:e.discards===!0,ref:r.key,wgslDefs:e.wgslDefs,evaluateDefs:i,...e.physicalEvaluate===void 0?{}:({physicalEvaluateDefs:e.physicalEvaluate.defs}),wrapEvaluateDefs:n,phongEvaluateDefs:l,toonEvaluateDefs:s,declaredFolds:e.declaredFolds??0,sunDirection:e.sunDirection,sunRadiance:e.sunRadiance,ambientColor:e.ambientColor,flatArtAmbientColor:e.flatArtAmbientColor};return ez.set(e,o),o}function ymp(e){let t,r,i;{{let t=[e.wgslDefs,e.evaluateDefs??"",e.wrapEvaluateDefs??"",e.phongEvaluateDefs??"",e.toonEvaluateDefs??"",e.sunDirection,e.sunRadiance,e.ambientColor,e.flatArtAmbientColor,e.programKey??"",e.programWord??"",e.materialProgram?"m":"",e.readsGeometryNormal?"g":"",e.readsAttribute?"a":"",e.readsScreenSteps?"s":"",String(e.materialInputs?.length??0)],r=2166136261,i=625341585;
D[0]=t,D[1]=r,D[2]=i}t=D[0];r=D[1];i=D[2]}for(let e of t){for(let t=0;t<e.length;t+=1){let n=e.charCodeAt(t);r=Math.imul(r^n,16777619),i=Math.imul(i^n,1540483477)+625341585|0}r=Math.imul(r^65535,16777619)}return`${(r>>>0).toString(16)}:${(i>>>0).toString(16)}:${t.reduce((e,t)=>e+t.length,0)}`}function Y7(e){return w6(e).toString(16)}function oAB(e){if(!e.programKey)return"";return e.programWord===void 0||e.programWord===""?e.programKey:e.programWord}var fX9=(function(e,t){if(!e?.programKey)return;let r=e.textIdentity?.taints;if(r!==void 0)QL(t,r)});function Az(e,t,r){if(e.materialInputs!==void 0)return e.hash;let i=`${e.readsGeometryNormal?"Ng":""}${e.readsAttribute?"At":""}${e.canSkipEvaluation?`/skip${e.hasLightFolds===!1?"0":"1"}`:""}`;return Y7(`${t}
${clN(1,e.params!==void 0)}
${r}
${i}`)}function tYa(e,t,r){if(!t.programKey)return[];let i=[];if(r?.programKey&&oAB(r)!==oAB(t))i.push(`${e}/light/${oAB(r)}`);return i.push(e),i}var z7=new Map,s7=new WeakMap;function P2_(e,t){return xqT(t)??(e.programKey&&gUo(e.programKey,t)?ueV():e)}function xqT(e){if(_4(e,l4)){{if(u7!==null)return u7;return u7={...nm3()},u7}}if(!_4(e))return null;return _4(e,M4)?nm3():zz()}function B12(e){let t=e.surfaceArms??0;if(t<2)return e;let r=oz.get(e);if(r===void 0){r=Bz(e,t);oz.set(e,r);}return r}var oz=new WeakMap;function Bz(e,t){let r=(e)=>rXYc(e,t,t,Ew)??e;let [i,n]=R7([r(e.wgslDefs),e.evaluateDefs===void 0?void 0:r(e.evaluateDefs)]);let l=`plain/${Y7(`${i}
${n??""}
${e.readsGeometryNormal?"Ng":""}${e.readsAttribute?"At":""}${e.preparedEvaluation===void 0?"":"/prepared"}${e.evaluateUnderBranch===void 0?"":"/branch"}`)}`;return{...e,wgslDefs:i,...n!==void 0?{evaluateDefs:n}:{},...e.wrapEvaluateDefs!==void 0?{wrapEvaluateDefs:r(e.wrapEvaluateDefs)}:{},...e.phongEvaluateDefs!==void 0?{phongEvaluateDefs:r(e.phongEvaluateDefs)}:{},...e.toonEvaluateDefs!==void 0?{toonEvaluateDefs:r(e.toonEvaluateDefs)}:{},programWord:l,...e.textIdentity!==void 0?{textIdentity:{key:`clustered/${l}`,taints:e.textIdentity.taints}}:{},surfaceArms:void 0}}var Zz=/\bshade_(node|variable|fn)_(\d+)\b/g;function R7(a){return (R7=$c0C(17)).call(this,a)}var Fz=null,Xz=null,u7=null,k7=`fn lighting_watchdogCapture(N: vec3<f32>) -> vec3<f32> {
  var e = iblSh[0].rgb * 0.282095 + iblSh[1].rgb * (0.488603 * N.y) + iblSh[2].rgb * (0.488603 * N.z) + iblSh[3].rgb * (0.488603 * N.x);
  e += iblSh[4].rgb * (1.092548 * N.x * N.y) + iblSh[5].rgb * (1.092548 * N.y * N.z) + iblSh[6].rgb * (0.315392 * (3.0 * N.z * N.z - 1.0));
  e += iblSh[7].rgb * (1.092548 * N.x * N.z) + iblSh[8].rgb * (0.546274 * (N.x * N.x - N.y * N.y));
  return max(e, vec3<f32>(0.0)) * (passLights.iblParams.x * 3.14159265359);
}
fn lighting_watchdogSky(N: vec3<f32>) -> vec3<f32> {
  let capture = lighting_watchdogCapture(N);
  if (passLights.sh[0].w <= 0.0) {
    return passLights.ambientColor + capture;
  }
  let hemi = mix(passLights.hemiGround, passLights.hemiSky, N.y * 0.5 + 0.5);
  var sh = passLights.sh[0].rgb * 0.886227;
  sh += passLights.sh[1].rgb * (1.023328 * N.y) + passLights.sh[2].rgb * (1.023328 * N.z) + passLights.sh[3].rgb * (1.023328 * N.x);
  sh += passLights.sh[4].rgb * (0.858086 * N.x * N.y) + passLights.sh[5].rgb * (0.858086 * N.y * N.z) + passLights.sh[6].rgb * (0.743125 * N.z * N.z - 0.247708);
  sh += passLights.sh[7].rgb * (0.858086 * N.x * N.z) + passLights.sh[8].rgb * (0.429043 * (N.x * N.x - N.y * N.y));
  return passLights.ambientColor + hemi + max(sh, vec3<f32>(0.0)) + capture;
}`,Tz="passLights.flatArtAmbient",Wz=`${Iz}

@group(1) @binding(1) var<storage, read> sceneLights: array<SceneLight>;
@group(1) @binding(2) var<storage, read> clusterRanges: array<vec2<u32>>;
@group(1) @binding(3) var<storage, read> clusterIndices: array<u32>;

${k7}`,t7=`fn lighting_watchdogDirect(N: vec3<f32>, V: vec3<f32>, P: vec3<f32>, albedo: vec3<f32>, roughness: f32, metalness: f32, fragCoord: vec2<f32>) -> vec3<f32> {
  var color = shade_cookTorranceSun(N, V, normalize(passLights.sunDirection), albedo, roughness, metalness, passLights.sunColor * passLights.sunIntensity, passLights.iblParams.z);
  for (var i = 0u; i < passLights.globalLightCount; i++) {
    color += shade_cookTorranceSun(N, V, -sceneLights[i].directionCone.xyz, albedo, roughness, metalness, sceneLights[i].colorDecay.rgb, sceneLights[i].positionShine.w);
  }
  let range = clusterRanges[lighting_froxelAt(fragCoord / frame.viewportSize, -(frame.view * vec4<f32>(P, 1.0)).z)];
  for (var i = 0u; i < range.y; i++) {
    let light = sceneLights[clusterIndices[range.x + i]];
    let lightVector = light.positionShine.xyz - P;
    let lightDistance = length(lightVector);
    let L = lightVector / max(lightDistance, 1e-5);
    let cutoff = light.penumbraCullShadow.y;
    if (light.directionCone.w < -3.5 || lightDistance >= cutoff || dot(N, L) <= 0.0) {
      continue;
    }
    var attenuation = 1.0 / max(pow(lightDistance, light.colorDecay.w), 0.01) * pow(clamp(1.0 - pow(lightDistance / cutoff, 4.0), 0.0, 1.0), 2.0);
    if (light.directionCone.w >= -1.5) {
      attenuation *= smoothstep(light.directionCone.w, light.penumbraCullShadow.x, dot(-L, light.directionCone.xyz));
    }
    color += shade_cookTorranceSun(N, V, L, albedo, roughness, metalness, light.colorDecay.rgb * attenuation, light.positionShine.w);
  }
  return color;
}`;function zz(){if(Fz!==null)return Fz;return Fz={...o7(uu(),Wz,({N:e,V:t,P:r,albedo:i,roughness:n,metalness:l})=>`lighting_watchdogDirect(${e}, ${t}, ${r}, ${i}, ${n}, ${l}, in.position.xy)`),evaluateDefs:`${b7}
${t7}`},Fz}function o7(e,t,r){let i=(e)=>`lighting_watchdogSky(${e})`;return{...e,wgslDefs:`${e.wgslDefs}
${t}`,flatArtAmbientColor:Tz,indirectIrradiance:i,evaluate:(e)=>`(${r(e)} + shade_ambientPbr(${e.N}, ${e.V}, ${e.albedo}, ${e.roughness}, ${e.metalness}, ${i(e.N)})${e.occlusion===void 0?"":` * (${e.occlusion})`})`}}function nm3(){if(Xz!==null)return Xz;let e=uu();return Xz=o7(e,k7,({N:t,V:r,albedo:i,roughness:n,metalness:l})=>`shade_cookTorranceSun(${t}, ${r}, ${e.sunDirection}, ${i}, ${n}, ${l}, ${e.sunRadiance}, passLights.iblParams.z)`),Xz}function XQp(e){return e===u7}var Oz=null;function iz(a,b){return (iz=$c0C(18)).call(this,a,b)}function _kT(a,b){return $c0O(34).call(this,a,b)}function t5B(e,t){return e.wrapEvaluateDefs===void 0?`select(${e.indirectIrradiance(t)}, ${e.flatArtAmbientColor}, frame.flatArt > 0.5)`:`lighting_wrapSkyIrradiance(${t})`}function eNV(e){if(e===Fz)return R4;if(e===u7)return l4;return e===Xz?w4:""}function _DM(e){return e.programKey?`/light/${oAB(e)}`:eNV(e)}function Cuf(e,t){if(e===Fz)return Y4(t,M4);return e===Xz||e===u7?null:t}function y5j(e,t,r,i){if(e===Xz&&i!==void 0)return{watchdogSmaller:i,watchdogLane:Y4(t,l4),watchdogFloor:!0};let n=Cuf(e,t);return n===null?null:{watchdogSmaller:B4(r,e===Fz),watchdogLane:n}}function Zrj(e,t,r){if(t===null)return e;let i=NnZ(t.hash);y$w(i,t.ref,!1);if(r!==null){PX(r);e=Z7(r,!0);}return P2_(e,i)}function R2z(e){let t=e.ownProgram;if(!e.materialProgram||t===void 0)return null;return{key:`${t.ref}:${t.hash}/${e.programWord??""}`,program:t}}function R46(e){return Z7(e,!0)}var A7=(e)=>X7(null,e);function ueV(){return j6(z7,g7(),A7)}var N0E=(function(e){let t=JzL(e);return t===null?ueV():Z7(t,!1)});function Z7(e,t){let r=g7();let i=e6(s7,e);let n=TX(e.hash);let l=i.get(r);if(l?.epoch!==n){l={module:X7(e,r,t),epoch:n};i.set(r,l);if(!t){{let e$2=e.hash,t$2=oAB(l.module);{let e=e$2,t=t$2;KX.set(e,t)}}}}return l.module}var XsG=16,Liq=(e)=>e.width===void 0?0:-(e.width*e.tileSize)/2,bxz=(e)=>e.height===void 0?0:e.height*e.tileSize/2,R8n=(e,t)=>`${e},${t}`,enZ="terrain/stream/",mNu="terrain/tilemap/",pXE="terrain/tilemap-chunk",GM3=(e,t,r)=>`${mNu}${e}/${t},${r}`,y3j=((e,t)=>e===pXE&&n6(t)&&t.cells===null),qM=6,FM=XsG*XsG,zM=1,TM=2,XM=4;function DM(e){if((e&zM)!==0)return{lit:!0};if((e&XM)!==0)return{lit:!1};return{}}var kM=function(){let e=0;return(t)=>(e+=t)-t};var RM=new TextDecoder;var a2k=function(e){let t=new DataView(e.buffer,e.byteOffset,e.byteLength);let r=kM();let i=(t)=>t>0?RM.decode(e.subarray(r(0),r(t)+t)):null;let n=t.getUint8(r(1));if(n!==qM)throw Error(`[tilemap-chunk-lane] unsupported codec version ${n}`);let l=i(t.getUint16(r(2),!0))??"",s=t.getFloat32(r(4),!0),o=t.getUint32(r(4),!0),a=t.getUint32(r(4),!0),u=i(t.getUint16(r(2),!0))??"",d=t.getUint16(r(2),!0),f=t.getUint8(r(1)),c=t.getFloat32(r(4),!0),h=t.getUint8(r(1)),p=i(t.getUint16(r(2),!0)),m=i(t.getUint32(r(4),!0)),g=t.getInt32(r(4),!0),y=t.getInt32(r(4),!0),v=t.getUint32(r(4),!0),w=null;if(t.getUint8(r(1))===1){w=new Uint16Array(FM);for(let e=0;e<FM;e++)w[e]=t.getUint16(r(2),!0)}let b=p?{ref:p,...m?{params:JSON.parse(m)}:{}}:void 0;return{placeId:l,def:{tileSize:s,...o>0?{width:o}:{},...a>0?{height:a}:{},tileset:u,...d>0?{tilesetColumns:d}:{},...f>0?{tilesetFrames:f}:{},...c>0?{tilesetFps:c}:{},...DM(h),...b?{material:b}:{},...(h&TM)!==0?{upright:!0}:{}},chunkX:g,chunkY:y,cells:w,revision:v}};var VR=new Map;var $R=new Map;var HR=new WeakMap;var JU=[];var bR={count:0};var AR=0;var WR=null;var MU=new WeakSet;var hR=0;var vU=!1;var pR=!1;var UFu=0;var uU=new Map;var mR="";var SU=-1;var UR=(function(e,t){if(e>SU)SU=e,mR=t});var b0H=(function(){qU:{if(GR.more===0)break qU;uU.set(GR.key,(uU.get(GR.key)??0)+GR.more),GR.more=0}GR.key="";if(uU.size===0)return"";let e="";for(let t=uU.size;t>0;t-=1)SU=-1,uU.forEach(UR),e=e===""?`${mR}:${SU}`:`${e},${mR}:${SU}`,uU.set(mR,-1);return uU=X6(uU),e});function XR(e){r6(uU,e)}var EX=30,IR=0,eR=!1,KR=!1,QR=!1;function ZP1(e,t){if(MU.has(t))return;MU.add(t),r6(VR,e);let r=function(){if(t.removeEventListener("dispose",r),!MU.has(t))return;MU.delete(t),VR.set(e,Math.max(0,(VR.get(e)??0)-1))};t.addEventListener("dispose",r)}function EBB(e,t){(WR??$R).set(e,Math.max(0,t));let r=t>0&&!nR.has(e);if(HU.word>=0)HU.word=Math.max(HU.word,r?2:1);else if(r&&yR!==null&&zU!==null&&(zU.get(yR)??null)===null)zU.set(yR,e)}var nR=new Set(["decoration-sway","voxel-surface-blink","voxel-surface-flow","voxel-sway","portal-shimmer"]),yR=null,zU=null,rR=new Map,vR=new WeakMap;function tR(e){return e===void 0?rR:T6(vR,e)}var HU={word:-1};function qsp(e,t,r="judge"){yR=e;zU=tR(t);if(r==="judge")zU.set(e,null);HU.word=r==="settle"?0:-1}function Ep5(){if(HU.word===1&&yR!==null)zU?.set(yR,null);HU.word=-1,yR=null,zU=null}function L49(e,t){return(t===void 0?rR:vR.get(t))?.get(e)??null}function DD1(e,t,r,i){(i===void 0?$R:IU(i).counts).set(t,Math.max(0,r));if(!nR.has(t)){tR(i).set(e,r>0?t:null)}}var Nfq=(function(){AR+=1,bR.count=0});var IU=(function(e){let t=HR.get(e);if(t===void 0)t={counts:new Map,epoch:-1},HR.set(e,t);if(t.epoch!==AR)t.epoch=AR,JU[bR.count]=t,bR.count+=1;return t});var lP8=(function(e){let t=WR;return WR=IU(e).counts,t});var Q$J=(function(e){WR=e});function kP_(e){HR.delete(e),vR.delete(e)}var NR=0,PR=function(e){NR+=e},FU=function(e){NR+=iz4(e)};function iz4(e){let t=(VR.get(e)??0)+($R.get(e)??0);for(let r=0;r<bR.count;r+=1)t+=JU[r].counts.get(e)??0;return t}var pAk=(function(e){return e||iz4("fx")>0});var WU=new Set(["model-fade","primitive-fade","texture-ease","array-ease","terrain-floor-fade","terrain-lattice","terrain-morph","shells-fill","sky-fade","light-fade","sun-depth-bounds","entity-fade","water-fade","held-hand-off","decoration-transition"]);function j2J(){return NR=0,WU.forEach(FU),NR}var qX=new Set(["model-fade","primitive-fade","terrain-morph","light-fade","entity-fade","water-fade","held-hand-off"]),hU=function(e){if(!qX.has(e))FU(e)};function $hY(){return NR=0,WU.forEach(hU),NR}function mJs(e){z6(e);for(let t of WU)if(iz4(t))e.add(t)}function eax3(e,t,r){for(let i of e)if(!iz4(i)||qX.has(i)&&t>=(i==="terrain-morph"?r:2*wWs))e.delete(i);return e.size}var SR=[],_R=SR,TR=new Map,AU=(function(e,t){if(e<=0)return;let r=`${t}:${e}`,i=_R.length;while(i>0&&_R[i-1].localeCompare(r)>0)_R[i]=_R[i-1],i-=1;_R[i]=r}),jU=function(e,t){TR.set(t,0)},PU=(function(e,t){TR.set(t,(TR.get(t)??0)+e)});var EhM=(function(){let e=[];_R=e;VR.forEach(AU);TR.forEach(jU);{let e=PU;$R.forEach(e);for(let t=0;t<bR.count;t+=1)JU[t].counts.forEach(e)}TR.forEach(AU);_R=SR;return e});function e6i(){vU=!0}function lm_(){pR=!0}function z2Z(e=1){hR=Math.max(hR,0,Math.floor(e)),lR?.()}var lR=null;var XY4=(function(e){lR=e});function Wyk(){UFu++,lR?.();let e=!1;return function(){if(e)return;e=!0,UFu=Math.max(0,UFu-1)}}function NXR(){eR=!0}function ViK(e){if(e===KR)return;if(KR=e,e)return;hR=Math.max(hR,1),QR=!0}var vj7=(function(){return KR});var Xvi=(function(e,t){let r=eR;if(eR=t,QR)return QR=!1,!0;return r&&($(e))});var fR="transform/world-scale",KU=new Set([fR,"transform/body-turn-center","draw/born","draw/spawn-grow","draw/landing","tome/local-feet-position","tome/local-rotation","tome/local-scale","tome/pivot-meters","tome/attachment-anchor","tome/attachment-anchor-bone"]),iR=new Set(["fx/program-owed","fx/program-failed"]),fU="renderer/",RR=new Map,UU=new Map,yX="draw/light",tU=new Set([yX,"draw/skybox","draw/fog"]),bDG=!1;var W3X=(function(e){bDG=e});var _U=new Set(["draw/ground","draw/bones","draw/ik","draw/mixer"]);function QTP(e){return bDG&&e.kind===4&&_U.has(e.compName)}function IDa(e){let t=UU.get(e);return t!==void 0&&t>0&&RR.get(e)===t}var A7g=(function(e){let t=0;for(let r=0;r<e.length;r++){let v$1;kU:{let e$5=e[r];{let e=e$5;if(e.kind!==4){v$1=!1;break kU;}if(tU.has(e.compName)){v$1=!0;break kU;}if(e.compName!==fR){v$1=!1;break kU;}v$1=IDa(e.entityId);}}if(v$1)t+=1;}return t});var BR=new Set,hDh=new Set(["tome/parent","draw/visibility","draw/visibility-override","draw/viewer-fade","tome/first-person-visible","tome/layers","tome/layout","draw/first-person-body","draw/clip-plane","draw/visible-range"]);function aZk(e,t){if((RR.get(e)??0)<=0)return!1;return!t.hiddenByAuthoredWord(e)||t.anchoredByUi(e)}function wU(e,t){let r=t.entityId;if(t.kind===3)r6(e,r);else if(t.kind===5){let t=(e.get(r)??0)-1;if(t>0)e.set(r,t);else e.delete(r)}else if(!e.has(r))e.set(r,1)}var GU=(function(e,t){let r=e.entityId;if(e.kind===1)return RR.delete(r),UU.delete(r),BR.add(r),!1;if(e.kind===2){{let e=r;let t=RR.get(e);return RR.delete(e),UU.delete(e),t!==void 0&&t>0}}let i=e.compName;if(i.startsWith(fU))return!0;if(y3j(i,e.value)){{let e=r;let t=RR.get(e);(RR.delete(e),UU.delete(e),t!==void 0&&t>0);}return t.readsRow(i);}if(!t.readsRow(i)||iR.has(i))return!1;if(KU.has(i))return aZk(r,t);if(hDh.has(i))return!(e.kind===3&&BR.has(r));{if(wU(RR,e),e.compName===yX)wU(UU,e)}return !0});var IDK=(function(e,t){let r=null;z6(BR);let i=0;for(;i<e.length;i++){let n=e[i];if(GU(n,t)){r=n,i+=1;break}}for(;i<e.length;i++){let r=e[i];if(!(r.kind!==1&&r.kind!==2&&(KU.has(r.compName)||hDh.has(r.compName)||r.compName.startsWith(fU))))GU(r,t)}return z6(BR),r});var PAt=(function(e){if(GR.key!==""&&e===GR.row){GR.more+=1;return}qU$:{if(GR.more===0)break qU$;uU.set(GR.key,(uU.get(GR.key)??0)+GR.more),GR.more=0}GR.row=e;GR.key=`row:${e}`;XR(GR.key)});var GR={row:"",key:"",more:0};function a4Z(e){if(e.batchInFlight){if(IR<EX){return (IR++,zR(!1,"batch-hold","batch-hold"));}}else if(IR>0)IR=0,hR=Math.max(hR,1);let t=JR(e)??(e.compilerPaced?"compiler-paced":null);if(t!==null){let r=rU.has(t)?CR(e):t;if(vU=!1,pR=!1,hR>0&&(t==="forced"||r==="forced"))hR--;XR(t);return zR(!0,t,r)}return zR(!1,"clean",null)}var nU=new Map;function zR(e,t,r){let i=T6(nU,t),n=i.get(r);if(n===void 0)n=Object.freeze({render:e,reason:t,timeOnlyRefusal:r}),i.set(r,n);return DU=n,n}var DU=null;function PWT(){let e=DU?.reason;return e==="census"||e==="fx"||e==="look-history"||e==="audio-meter"||e==="canvas-tail"||e==="compiler-paced"}var rU=new Set(["ops","scene","held-scene","census","fx","look-history","audio-meter","canvas-tail","compiler-paced"]);var CR=(function(e){if(e.cameraChanged)return"camera";if(UFu>0)return"present-hold";if(hR>0)return"forced";if(e.capturesPending)return"captures";if(e.compilerActive)return"compiler";if(e.assetsChanged)return"assets";if(e.prepareWake)return"prepare-wake";return null});function A9m(e,t){return e.render&&(t.stillCamera&&t.lookHistory!==!0||KR)&&(t.sceneShown&&t.firstFrameRendered||t.bootPreparing)&&!t.canvasAsked&&t.eyeOwesSeed!==!0}function d68(e){return e.resident&&e.skippedDraws===0&&e.arrivingDraws===0}function BSs(e){return d68(e)&&(e.transitions===0||e.metWalking===0||e.eyeMoved&&e.loadedWalkedMs>=wWs)}function EW_(e,t){return e&&t.sceneShown&&t.firstFrameRendered&&!t.pictureAsked}function JR(e){let t=e.stillCamera!==!0&&!KR;if(t&&e.opsCount>0)return"ops";if(e.sceneOwesFrame)return"scene";if(e.heldSceneOwesFrame)return"held-scene";if(t&&e.cameraChanged)return"camera";if(UFu>0)return"present-hold";if(hR>0)return"forced";if(e.capturesPending)return"captures";if(e.compilerActive)return"compiler";if(!t&&!KR&&pAk(e.fxRowsPending===!0))return"fx";if(!t&&!KR&&e.lookHistory)return"look-history";if(!t){return ba(e);}if(e.assetsChanged)return"assets";let v$4;{NR=0;VR.forEach(PR);{let e=PR;$R.forEach(e);for(let t=0;t<bR.count;t+=1)JU[t].counts.forEach(e)}v$4=NR;}if(v$4>0)return"census";if(vU)return"audio-meter";if(pR)return"canvas-tail";if(e.prepareWake)return"prepare-wake";return null}function z9Q(){$R=X6($R),HR=new WeakMap,JU.length=0,bR.count=0,WR=null,z6(uU),GR.key="",GR.more=0,z6(RR),z6(UU),z6(BR),hR=0,vU=!1,pR=!1,IR=0,eR=!1,DU=null}var og=()=>z2Z(1);function i6C(e,t,r=og){let i=t;return e.onArrival(r),{load:(t=i)=>e.load(t),prime:(t)=>t3o(e,t??i),arriving:()=>e.state()==="arriving",setImporter:function(e){i=e??t},seed:function(t){if(e.seed(t),t===null)e.onArrival(r)}}}function mg(e,t,r){let i=new Map,n=Bv(e.name+"-door-hold",function(e){i.delete(e)}),l=function(e,t,i,n){n.warmScope(()=>r(e,t,i,n),"arriving")},s=i6C(e,t,function(e){for(let[t,{device:r,pipelines:n}]of i)l(e,t,r,n);k6(i),z2Z(1)});return{slot:s,warm(t,r,o){let a=e.peek();if(a!==null)return l(a,t,r,o);i.set(t,{device:r,pipelines:o}),n(t),s.prime()},forget(e){i.delete(e)},seed(e){s.seed(e),k6(i)}}}function nN7(e){return(t,r)=>function(...i){let n=e();return n?n[t](...i):r}}var QI=()=>dve(()=>$Lo("./"+globalThis.__spawnBuilt.doors["27bcbef3"]).then(()=>import("./"+globalThis.__spawnBuilt.doors["27bcbef3"]))),bI=QI,aI=null,LI=!1,MI=null,ZI=!1;var zI=vwX("scripted materials",()=>bI(),function(){let e=zI.loaded();if(e!==null){{if(LI){let t=aI;LI=!1,aI=null,e.setScriptedMaterialAssets(t)}if(ZI){let t=MI;ZI=!1,MI=null,e.setScriptedMaterialLibraryMissRequester(t)}}}z2Z(1)});var qEu=(function(){return zI.loaded()});function g5q(){return zI.arriving()}function cg2(e){zI.prime(e)}var _yi=(function(e){let t=zI.loaded();if(t){t.setScriptedMaterialAssets(e);return}aI=e,LI=!0});var x4z=(function(e){let t=zI.loaded();if(t){t.setScriptedMaterialLibraryMissRequester(e);return}MI=e,ZI=!0});function K2I(e){return zI.loaded()?.compileScriptedMaterialAhead(e)??!1}function Dxx(e,t,r=null){if(e.pendingMissRequests.size>0)cg2();zI.loaded()?.flushScriptedMaterialLibraryMissRequests(e,t,r)}function BvW(e,t,r,i){return zI.loaded()?.parkScriptedMaterials(e,t,r,i)??[]}function M68(){return zI.loaded()?.getRecoveryEligibleScriptedMaterialRefs()??[]}function FjI(e){return zI.loaded()?.getScriptedMaterialParkReason(e)??null}function Bvy(e){return zI.loaded()?.unparkScriptedMaterial(e)??[]}function zsL(){return zI.loaded()?.unparkAllScriptedMaterials()??[]}function uqs(){return zI.loaded()?.getParkedScriptedMaterialRefs()??[]}function af7(){return zI.loaded()?.scriptedMaterialParkRegister()??[]}function Qwg(e,t){return zI.loaded()?.isScriptedMaterialParked(e,t)??!1}function XCz(e,t){return zI.loaded()?.isScriptedMaterialParkedStill(e,t)??!1}function vna(e,t){return zI.loaded()?.scriptedMaterialParkIsInert(e,t)??!1}function icS(e){return zI.loaded()?.extractScriptedMaterialRefFromError(e)??null}function ZD3(e,t,r,i=!1){return zI.loaded()?.parkScriptedMaterialBuildFailure(e,t,r,i)??!1}function Cy_(e,t,r,i){zI.loaded()?.reportScriptedMaterialBuildFailure(e,t,r,i)}var Y2=201326592,T2=60000,d2=new Map,h2=0,P2=function(e,t){d2.delete(e),h2-=t.bytes};function a2(a){return (a2=$c0C(19)).call(this,a)}function gB1(e){let t=e.rode;if(t===void 0||t.length===0)return{batch:e,unrode:[]};let r,i,n,l,s,c,h;{ca(e,t);r=D[0];i=D[1];n=D[2];l=D[3];s=D[4];c=D[5];h=D[6]}return{batch:{...h,...s.length===0&&c!==void 0?{appliedMark:c}:{},definitions:r,...i.some((e)=>e!==null)?{paints:i}:{},...n.some((e)=>e!==null)?{bounds:n}:{},...l.some((e)=>e!==null)?{drawn:l}:{}},unrode:s}}var qR=4096,CMf=new Map,sR=new Map,jR=new Set,gR=new Set,OR=new Map,kR=function(e,t){let r=OR.get(e);return r!==void 0&&(t-r|0)<0};var UEY=(function(e,t,r){let i=CMf.get(e);if(r===null){CMf.delete(e);return}if(i!==void 0&&i.road!==r)i.road.close();CMf.set(e,{road:r,epoch:t});let n=iK({realm:"renderer",door:"member-road",admits:ER,onWord:(e)=>e.kind==="mesh"?a2(e):FR(e.fill,e.placeId,e.bytes,r)});r.onmessage=n.onMessage,r.onmessageerror=n.onMessageError});var uR=function(e){if(typeof e!=="object"||e===null)return!1;let t=e;return t.kind==="shellTile"&&typeof t.fill==="number"&&typeof t.placeId==="string"&&t.bytes instanceof Uint8Array};var wR=function(a){return (wR=$c0C(20)).call(this,a)};var ER=(e)=>uR(e)||wR(e);function FR(e,t,r,i){let n={fill:e,placeId:t,bytes:r,road:i};if(jR.delete(e)||gR.has(t)||kR(t,e)){jog(n);return}let l=sR.get(e);if(l!==void 0)jog(l);sR.set(e,n),z2Z(1)}function Wfp(e){let t=sR.get(e);if(t!==void 0)sR.delete(e);return t}function jog(e){let t=e.bytes.buffer;if(!(t instanceof ArrayBuffer)||t.byteLength===0)return;let r={kind:"given",buffers:[t]};try{e.road.postMessage(r,[t])}catch{}}function Lv4(e){for(let t of e){let e=sR.get(t);if(e!==void 0){sR.delete(t),jog(e);continue}jR.add(t)}if(jR.size<=qR)return;for(let e of jR)if(jR.delete(e),jR.size<=qR)break}function qok(e,t){for(let[t,r]of sR){if(r.placeId!==e)continue;sR.delete(t),jog(r)}if(t)gR.add(e)}function KAs(e,t){if(gR.delete(e),t===null)return;OR.set(e,t);for(let[t,r]of sR){if(r.placeId!==e||!kR(e,t))continue;sR.delete(t),jog(r)}}var N3T=(function(){for(let e of CMf.values())e.road.close();nK(CMf),nK(sR),nK(jR),nK(gR),nK(OR)});var Sv=()=>dve(()=>$Lo("./"+globalThis.__spawnBuilt.doors["3f58c632"]).then(()=>import("./"+globalThis.__spawnBuilt.doors["3f58c632"]))),pv=qdt("text",Sv),Pv=mg(pv,Sv,(e,t,r,i)=>e.warmTextPipeline(t,r,i));var fgy=(function(){return pv.peek()});var wv=Pv.slot.load,jqH=Pv.slot.prime,lv=Pv.slot.arriving,p5o=Pv.warm,xXD=Pv.forget;var MCy=(function(e,t){return pv.peek()?.hasText(e,t)??!1});function X44(e){return pv.peek()?.textEntityIds(e)??[]}var v$i=(function(e,t){return pv.peek()?.textWorldBounds(e,t)??null});function lBi(e,t,r,i,n){return pv.peek()?.raycastTexts(e,t,r,i,n)??[]}function JHT(e,t){return pv.peek()?.textDrawSuppression(e,t)??null}var Fv=Pv.seed;var nUt=vwX("sprite material",()=>dve(()=>$Lo("./"+globalThis.__spawnBuilt.doors["64d72c30"]).then(()=>import("./"+globalThis.__spawnBuilt.doors["64d72c30"]))),()=>z2Z(1)),uq4=new Map,z9S={revision:0},t$=null;function EeM(e,t,r,i){if(!(t>0)||!(r>0))return null;let n=uq4.get(e);if(n?.width===t&&n.height===r&&n.layers===i)return n;let l={op:"textureTexels",textureId:e,width:t,height:r,layers:i};return uq4.set(e,l),z9S.revision++,t$?.(l),l}var xlK=(function(e){t$=e});function Pty(){return[...uq4.values()]}var vK=new WeakMap;function z9o(e,t,r){let i=vK.get(e);if(i===void 0){if(!r)return;i={ids:new Set,revision:0},vK.set(e,i)}if(r===i.ids.has(t))return;if(r)i.ids.add(t);else i.ids.delete(t);i.revision+=1}function aYt(e){return vK.get(e)??null}var BW=()=>dve(()=>$Lo("./"+globalThis.__spawnBuilt.doors["3b5b7971"]).then(()=>import("./"+globalThis.__spawnBuilt.doors["3b5b7971"]))),KW=()=>dve(()=>$Lo("./"+globalThis.__spawnBuilt.doors["e2fd9e23"]).then(()=>import("./"+globalThis.__spawnBuilt.doors["e2fd9e23"]))),PW=qdt("vector",BW),cW=qdt("panel",KW),mW=mg(PW,BW,(e,t,r,i)=>e.warmVectorDrawPipeline(t,r,i)),WW=mg(cW,KW,(e,t,r,i)=>e.warmPanelPipeline(t,r,i)),SNH=()=>PW.peek()??cW.peek()?.art??null,aMi=()=>cW.peek(),NW=mW.slot.load,niq=mW.slot.prime,fW=WW.slot.load,ggA=WW.slot.prime,it$=WW.warm,K3U=mW.warm;function KkE(e){mW.forget(e),WW.forget(e),aMi()?.disposePanelSceneRecords(e)}function PFu(e){return SNH()?.vectorEntityIds(e)??[]}function bhi(e,t){return SNH()?.vectorWorldBounds(e,t)??null}function P_x(e,t,r,i,n){return SNH()?.raycastVectors(e,t,r,i,n)??[]}function O3x(e,t){return SNH()?.vectorBodyStands(e,t)??!1}function H45(e){return PW.onArrival(e)}var xKR=WW.slot.arriving;function gFw(){return cW.refusal()}function lLJ(e){return cW.onArrival(e)}var TW=mW.seed,tW=WW.seed,uW=mW.slot.setImporter,$W=WW.slot.setImporter;var oF=()=>dve(()=>$Lo("./"+globalThis.__spawnBuilt.doors["f2ad4e7d"]).then(()=>import("./"+globalThis.__spawnBuilt.doors["f2ad4e7d"]))),xF=qdt("portals",oF),LF=function(){z2Z(1)};xF.onArrival(LF);function E5w(e){return xF.load(e)}function qHL(e){t3o(xF,e)}var i2W=(function(){return xF.state()==="arriving"});var Fzw=(function(){return xF.peek()});var vSd=(function(e){return xF.onArrival(e)});var cQ=()=>dve(()=>$Lo("./"+globalThis.__spawnBuilt.doors["d11956ca"]).then(()=>import("./"+globalThis.__spawnBuilt.doors["d11956ca"]))),oQ=qdt("wisps",cQ),YQ=mg(oQ,cQ,(e,t,r,i)=>e.warmWispPipelines(t,r,i));var Alp=(function(){return oQ.peek()});var jQ=YQ.slot.load,QrU=YQ.slot.prime,BQ=YQ.slot.arriving,xZs=YQ.warm,Iju=YQ.forget;function i4t(e,t){return oQ.peek()?.hasWisp(e,t)??!1}function o_X(e){return oQ.peek()?.wispEntityIds(e)??[]}function SIz(e,t){return oQ.peek()?.wispWorldBounds(e,t)??null}var _Q=YQ.seed;var t5=()=>dve(()=>$Lo("./"+globalThis.__spawnBuilt.doors["8ae92141"]).then(()=>import("./"+globalThis.__spawnBuilt.doors["8ae92141"])),"terrain"),L5=qdt("terrain",t5),M5=null,P5=nN7(()=>M5),g5=new Map,J5=nv("terrain-door-hold",g5,()=>({})),r5=null,G5=new Map;var z5=function(e){M5=e;{if(r5!==null)e.setDecorationsSwitch(r5);r5=null;for(let[t,r]of G5)e.holdHorizonAhead(t,r.entityId,r.value,r.config);F6(G5);for(let[t,r]of g5){if(r.texelDensity!==void 0)e.setTerrainSceneTexelDensity(t,r.texelDensity);if(r.farGlass!==void 0)e.setTerrainSceneFarGlass(t,r.farGlass);if(r.floorsAsked)e.askTerrainPlaceFloors(t)}F6(g5)}z2Z(1)};var Y5=i6C(L5,t5,z5);var YFG=(function(){return M5});function sAa(e,t){if(M5===null)return null;return t?M5.terrainSurfaceCoarseWgsl(e):M5.terrainSurfaceBufferCode(e)}var{load:T5,prime:HtD}=Y5;var qZC=(function(){return ofT("terrain")});var LYv=Y5.arriving,dpE=L5.onArrival;function aYp(e){if(!M5){r5=e;return}if(M5.setDecorationsSwitch(e))z2Z(1)}function w0V(e,t,r,i,n){let l=`${e}|${t}`;if(M5){M5.holdHorizonAhead(l,r,i,n);return}if(i===null)G5.delete(l);else G5.set(l,{entityId:r,value:i,config:n})}var bm0=(function(e,t,r,i){M5?.adoptHorizonAhead(e,t,r,i)});function ZTM(e,t){if(M5){M5.setTerrainSceneTexelDensity(e,t);return}J5(e).texelDensity=t}function o5A(e,t){if(M5){M5.setTerrainSceneFarGlass(e,t);return}J5(e).farGlass=t}var M94=P5("setTerrainShadowCasting",void 0);function JDY(e){if(M5)return M5.terrainSceneTexelDensity(e);return g5.get(e)?.texelDensity??1/0}function PEO(e){g5.delete(e),M5?.disposeTerrainSceneResources(e)}var I8o=P5("sampleTerrainGroundHeight",null),GaM=P5("sampleTerrainDrawnSpan",!1),sIm=P5("terrainDrawnSpanRevision",-1);function rbP(e,t,r,i,n,l){return M5?M5.raycastTerrain(e,t,r,i,n,l):[]}var zMn=P5("scriptedGroundDrawAt",null),ajn=P5("refreshScriptedDecorationMaterials",void 0),WWq=P5("countDecorationLayersWearingScriptedMaterial",0),mVf=P5("refreshScriptedGroundMaterials",void 0),cWv=P5("countGroundsWearingScriptedMaterial",0),rPG=P5("countScriptedGroundMaterials",void 0),ns0=P5("terrainDecorationsModule",null),rGZ=P5("primeTerrainDecorations",void 0),F4L=P5("collectTerrainChunkRecordIds",[]),NYr=P5("terrainDecorationDensityHoldsRead",null),NiZ=P5("collectTerrainSceneDebug",null);function FG2(e,t,r=!1){return M5?M5.collectDecorationBandCensus(e,t,r):Promise.resolve(null)}function c8R(a){return $c0C(21).apply(this,arguments)}var ObO=P5("sayLookGround",void 0),k8E=P5("tendTerrainDeckSolids",void 0),vwy=P5("collectDecorationRecipeCensus",[]),f8Q=P5("collectDecorationLayerRollup",[]),b5=Object.freeze({residentChunks:0,heightmapPools:0,heightmapPoolBytes:0,cpuMirrorBytes:0,buckets:0,chunks:0,quads:0,arenaBytes:0}),pR6=P5("collectTerrainResidentStats",b5),ciN=P5("collectTerrainTextureResidencyRows",[]),Xrq=P5("collectTerrainAtlasFillRows",[]);function zHU(e,t){if(M5)return M5.terrainGroundDebt(e,t);return Y5.arriving()?"terrain/family":null}var bPp=P5("terrainRowOwesPicture",!1);function ywf(e){return M5?M5.terrainPlaceOwesPicture(e):Y5.arriving()}function Tbc(e){return M5?.terrainGroundTextured(e)===!0}function m_u(e){if(M5)return M5.terrainGroundBegun(e);return L5.state()!=="arriving"}function nxC(e){if(M5)return M5.terrainGroundPictured(e);return L5.state()!=="arriving"}function E7o(e,t,r){return M5?M5.terrainStandUndrawn(e,t,r):[]}var pNY=P5("terrainSampledLayerIds",null);function mGa(e){if(M5){M5.askTerrainPlaceFloors(e);return}J5(e).floorsAsked=!0}function k76(e,t=!1){if(M5)return M5.settleTerrainFirstLoadOwed(e,t);return Y5.arriving()?1:0}var zD7=P5("terrainDecorationBedBuilds",0),v5=P5("terrainGroundAbsent",!1),ofq=P5("sweepTerrainTexturePendingBreadcrumbs",void 0);var ne=(()=>globalThis.__spawnEngineConsole??=Object.create(console))(),xe=()=>dve(()=>$Lo("./"+globalThis.__spawnBuilt.doors["a75a880f"]).then(()=>import("./"+globalThis.__spawnBuilt.doors["a75a880f"]))),qe=qdt("water",xe),he=new Map,Le=kv("water-door-hold",function(e){he.delete(e)}),le=function(a,b,c){return (le=$c0C(22)).call(this,a,b,c)},Se=new Map,Ee=kv("water-door-ripple-turn",function(e){Se.delete(e)}),Ae=function(e){for(let[t,r]of Se)e.setWaterRippleFollowsWaves(t,r);GK(Se);for(let[t,r]of he)le(e,t,r);GK(he),z2Z(1)},de=i6C(qe,xe,Ae),te=de.load,iD5=de.prime;var tSh=(function(e,t,r,i){if(i.length===0)return;let n=he.get(e),l=r.openWarmLane()==="late"?"late":"arriving",s=n!==void 0&&dQ.indexOf(n.lane)<dQ.indexOf(l)?n.lane:l,o={device:t,pipelines:r,hints:new Map(n?.hints),lane:s,calm:r.inCalmScope&&n?.calm!==!1,held:r.inHeldScope&&n?.held!==!1,own:r.inPlaceOwnScope||n?.own===!0};for(let e of i)o.hints.set(e.key,e);let a=qe.peek();ne.info(`[lume water] ${o.hints.size} recipe(s) named by a held place: ${a?"its code is in, warmed now":da()}`);if(a)le(a,e,o);else he.set(e,o),Le(e),iD5()});function nE_(e){he.delete(e),Se.delete(e)}var mAJY=(function(e,t){let r=qe.peek();if(r){r.setWaterRippleFollowsWaves(e,t);return}Se.set(e,t),Ee(e)});var rCa=(function(){return qe.peek()});var zgQ=qe.onArrival;var IV=(()=>globalThis.__spawnEngineConsole??=Object.create(console))();function VJ(e){let t=e.source.length;for(let r of Object.values(e.deps??{}))t+=r.length;return t}var QJ=new WeakMap,BJ=0;function rJ(e,t,r,i,n){let l=e.held.get(t);if(l===void 0)return n.hold.push([t,i]),{held:t,value:r};return e.held.delete(t),e.held.set(t,l),{held:t}}function RJ(e,t){let r={hold:[],forget:[]};if("family"in t)return{wire:t,plan:r};let i=new Set;let n=function(t){let n=rJ(e,`e:${t.hash}`,t,VJ(t),r);return i.add(n.held),n};let l=function(t){let n;{let e$6=t;{let e=e$6;let t=QJ.get(e);if(t===void 0){let r=0;for(let t of Object.values(e))if(typeof t==="string")r+=t.length;BJ+=1,t={key:`l:${BJ}`,chars:r},QJ.set(e,t)}n=t;}}return i.add(n.key),rJ(e,n.key,t,n.chars,r)};let s;if("program"in t)s={...t,entry:n(t.entry)};else if("fx"in t){s=ea(s,t,n,l)}else{let e=n(t.entry);s={...t,entry:e,lighting:l(t.lighting)}}let o=e.heldChars;for(let[,e]of r.hold)o+=e;for(let[t,n]of e.held){if(o<=8388608)break;if(i.has(t))continue;r.forget.push(t),o-=n}return{wire:s,plan:r}}function UJ(e,t){let r={hold:[],forget:[]},i=`e:${t.hash}`;if(e.held.has(i))return{part:null,plan:r};let n=rJ(e,i,t,VJ(t),r),l=e.heldChars+VJ(t);for(let[t,i]of e.held){if(l<=8388608)break;r.forget.push(t),l-=i}return{part:n,plan:r}}var HE=15000;var RE=30000;var BE=64;var $E=3;var JE=1;var uE=(e)=>({kind:"elsewhere",why:e,reports:{scripted:[],engine:[]}});var VE=null;var pE=!1;var mE=()=>VE??=UYK({name:"material builder",url:()=>new URL(H6("worker-material-builder.mjs"),import.meta.url),options:{type:"module",name:tE()},apart:ZE});function tE(){let e=Reflect.get(globalThis,"name"),t=u8(typeof e==="string"?e:null);return t===""?"lume-material-builder":`${VK} ${JSON.stringify({words:t,realm:"material-builder"})}`}function ZE(){let e=Reflect.get(globalThis,"name");return SFS()&&u8(typeof e==="string"?e:null)===""}var hE=null;var vnk=(function(e){hE=e});var kE=null;var Dpz=(function(e){kE=e});class GE{constructor(e={}){this.options=void 0;this.worker=null;this.crossing={held:new Map,heldChars:0};this.detach=null;this.ready=!1;this.awaitingStand=!1;this.down=!1;this.falls=0;this.nextId=1;this.asked=new Map;this.pendingKeys=new Set;this.replies=new Map;this.keptReplies=new Map;this.kept=new Set;this.wakes=new Map;this.outbox=[];this.warmHeld=[];this.warmOut=new Set;this.deadline=null;this.lifeWatch=null;this.forgetEnder=null;this.rested=!1;this.stoodAtMs=0;this.forgetMark=null;this.keep=j9a(m6);this.idle=Nq1((()=>this.restAfterMs()),(e)=>this.rest(e),this.keep);this.options=e}get serving(){return this.ready&&!this.down}get loading(){return pE&&!this.ready&&!this.down&&(this.worker!==null||this.rested)}stand(){if(this.down||this.worker!==null||this.awaitingStand)return;try{let e=null,t=(t)=>{if(e!==null&&this.worker===e)this.fall(`its script did not load (${t})`)};if(e=this.options.createWorker?this.options.createWorker(t):this.bear(t),e===null)return;let r=lK({realm:"renderer",door:"renderer<-material-builder",onWord:(t)=>{if(this.worker!==e)return;if(t.kind==="family-door-report"){ja.call(this,t);}else if(t.kind==="ready")this.serve();else if(t.kind==="unavailable")this.fall(t.message,!this.ready);else if(t.kind==="scans")hE?.(t.scans),this.idle.edge();else if(t.kind==="unheld")this.unheld(t.held,t.why);else this.landAsk(t.id,t.reply)},onUnreadable:(t)=>{if(this.worker===e)this.fall(`a reply did not cross (${t.code})`)}});this.detach=CK(e,r),e.onerror=(t)=>{if(t.preventDefault(),this.worker===e)this.fall(t.message||"the material builder's realm did not load",!this.ready)},this.worker=e,this.rested=!1,this.stoodAtMs=Hvu(),this.keep.born(this.stoodAtMs),this.watchLife(e),this.forgetMark?.(),this.forgetMark=Z6(()=>this.idle.edge()),this.forgetEnder?.(),this.forgetEnder=S6("material-builder",()=>{if(this.worker===null)return!1;return this.fall("the terminate door ended it",!0),!0})}catch(e){ka.call(this,e);}}bear(e){let t=mE();let r=t.bear(e);if(r!==null)return r;if(t.state()==="refused")this.fall(`the material builder cannot start here (${t.refusal()?.cause??"refused"})`,!0);else if(!this.awaitingStand){this.awaitingStand=!0;let e=t.onOpen(()=>{e(),this.awaitingStand=!1,this.stand()})}return null}take(e){let t=this.replies.get(e)??this.keptReplies.get(e);if(t!==void 0)return this.replies.delete(e),this.keptReplies.delete(e),this.kept.delete(e),t;return this.pendingKeys.has(e)?"pending":null}crossEntry(e){let t=this.serving?this.worker:null;if(t===null)return!1;let{part:r,plan:i}=UJ(this.crossing,e);if(r===null)return!1;try{t.postMessage({kind:"hold",part:r,forget:i.forget})}catch{return!1}{let e$7=this.crossing,t$4=i;{let e=e$7,t=t$4;for(let r of t.forget){ga(e,r);}for(let[r,i]of t.hold)e.held.set(r,i),e.heldChars+=i}}this.idle.edge();return !0}ask(e,t,r=!1,i){if(this.pendingKeys.has(e)||this.replies.has(e)||this.keptReplies.has(e))return;if(this.wake(),(this.serving||this.loading?this.worker:null)===null){la.call(this,e);return}let n=this.nextId++;if(this.asked.set(n,e),this.pendingKeys.add(e),this.idle.edge(),r&&this.warmOut.size>=JE){this.warmHeld.push({id:n,key:e,ask:t});return}if(r)this.warmOut.add(n);this.send(n,t,i)}wake(){this.stand()}hurry(e){let t=this.warmHeld.findIndex((t)=>t.key===e);if(t<0)return;let[r]=this.warmHeld.splice(t,1);if(r!==void 0&&this.asked.has(r.id))this.send(r.id,r.ask)}send(e,t,r){if(this.outbox.push({id:e,ask:t,first:r}),this.outbox.length===1&&this.ready)queueMicrotask(()=>this.post());if(this.deadline===null)this.armDeadline()}sendHeldWarms(){while(this.warmOut.size<JE&&this.warmHeld.length>0){let e=this.warmHeld.shift();if(e===void 0||!this.asked.has(e.id))continue;this.warmOut.add(e.id),this.send(e.id,e.ask)}}serve(){this.ready=!0,this.falls=0;let e=this.outbox.length;if(IV.info(`[renderer] the material builder serves ${Math.round(Hvu()-this.stoodAtMs)} ms after its realm stood${e>0?`; ${e} ask(s) waited for its realm and cross now`:""}`),this.armDeadline(),e>0)this.post();this.idle.edge(),kE?.()}post(){if(!this.ready)return;let e=this.outbox.filter((e)=>this.asked.has(e.id));this.outbox=[];let t=this.worker;if(t===null||e.length===0)return;let r=this.held(),i=e.map((e)=>this.wire(e));let v$2;NE:{let e$9=t,t$6=i;{let e=e$9,t=t$6;try{{v$2=(e.postMessage({kind:"builds",asks:t}),null);break NE;}}catch(e){{v$2=K6(e);break NE;}}}}if(v$2===null){this.armDeadline();return}ma.call(this,r,e,t);}held(){return{held:new Map(this.crossing.held),heldChars:this.crossing.heldChars}}wire(e){let{wire:t,plan:r}=RJ(this.crossing,e.ask);{let e$8=this.crossing,t$5=r;{let e=e$8,t=t$5;for(let r of t.forget){ga(e,r);}for(let[r,i]of t.hold)e.held.set(r,i),e.heldChars+=i}}return {...e,ask:t,forget:r.forget}}pending(e){return this.pendingKeys.has(e)}whenLanded(e,t,r=!1){if(r){na.call(this,e);}if(this.replies.has(e)||this.keptReplies.has(e)||!this.pendingKeys.has(e)){t();return}let i=this.wakes.get(e);if(i===void 0)this.wakes.set(e,[t]);else i.push(t)}spent(e){this.replies.delete(e),this.keptReplies.delete(e),this.kept.delete(e)}letGo(e){if(!this.kept.delete(e))return;let t=this.keptReplies.get(e);if(t===void 0)return;this.keptReplies.delete(e),this.standUntaken(e,t)}dispose(){this.down=!0,this.fall("the renderer ended its material builder",!0)}landAsk(e,t){let r=this.asked.get(e);if(r===void 0)return;this.asked.delete(e);this.pendingKeys.delete(r);{let e=t;if(e.kind==="built"||e.kind==="arms"||e.kind==="fx")G8(e.image.graph,e);else {ha(e);}if("realmPrint"in e)Object.assign(e,{realmPrint:TcD(e.realmPrint,e)});if("ownLighting"in e&&e.ownLighting!==null){ia(e);}}this.land(r,t);if(this.warmOut.delete(e))this.sendHeldWarms();this.armDeadline(),this.idle.edge()}land(e,t){if(this.kept.has(e))this.keptReplies.set(e,t);else this.standUntaken(e,t);let r=this.wakes.get(e);if(r===void 0)return;this.wakes.delete(e);for(let e of r)e()}standUntaken(e,t){this.replies.set(e,t);while(this.replies.size>BE)if(qK(this.replies)===void 0)break}watchLife(e){let t=new AbortController;this.lifeWatch=t,sba(e,{who:"the material builder's helper",signal:t.signal,ended:()=>{if(this.worker===e)this.fall("its process ended")}})}armDeadline(){if(this.deadline!==null)clearTimeout(this.deadline);if(this.deadline=null,this.asked.size===this.warmHeld.length||this.ready)return;pa.call(this);}fall(a){return $c0C(23).apply(this,arguments)}unheld(a,b){return $c0C(24).call(this,a,b)}restAfterMs(){return this.worker!==null&&this.ready&&!this.down&&pE&&this.asked.size===0&&this.outbox.length===0?RE:null}rest(e){if(this.restAfterMs()===null)return;this.endWorker(),this.rested=!0,IV.info(`[renderer] the material builder rests after ${e} ms idle: its helper is ended, and the next ask stands a fresh one`)}firstPicture(){this.idle.edge()}endWorker(){return $c0P($c0C(25),GE.prototype,"endWorker").call(this)}}var jE=null,LE=null;var Ko5=(function(e){if(pE=e,e)LE?.firstPicture()});function duP(){return pE}function D4c(){return jE}function TRl(){return jE?.wake?.(),jE}function eSs(e,t,r){let i=e.get(t);if(i!==void 0)return i==="asked";if(!pE||!Wc2()||TRl()===null)return!1;return e.set(t,"asked"),OTr(()=>r(function(r){e.set(t,r??"here"),z2Z(1)})),!0}var Wc2=(function(){return jE!==null&&(jE.serving||jE.loading===!0)});var I05=(function(e){if(LE!==null&&LE!==e)LE.dispose();LE=null,jE=e});function rr6(e={}){if(e.createWorker===void 0&&typeof Worker>"u"){I05(null);return}if(LE!==null&&jE===LE)return;let t=new GE(e);I05(t),LE=t}var ZZ=1000,hmf=5000,BZ=1000,$Z=0.001,aZ=0.000000125,UZ=new WeakMap;function cZ(e){let t=UZ.get(e);if(t===void 0){t=qa(t,e)}return t}function Ia1(e,t,r,i,n,l=null){let s=cZ(e),o=e.requestedKeyCount,a=mZ(e,yZ.get(e)?.building??null),u=!a&&o!==s.requested,d=a||s.stepAtMs>=s.frameAtMs,f=IZ(e,i,n||d,a,u,!0);if(f!==null){if(s.busyAtMs=t,s.busyBy=f,f!==dZ||IZ(e,i,n||d,a,u,!1)!==null)s.measureBusyAtMs=t}s.requested=o;s.frameAtMs=t;if(r!==s.input){{s.input=r,s.inputAtMs=t,s.inputBy="pointer input";
}}if(l!==null&&EZ(s,l)){{s.eyeMovedAtMs=t,s.inputAtMs=t,s.inputBy="the eye moved";
}}so.stood=t-s.eyeMovedAtMs>=wWs,s.frameTrials=i&&!a&&t-s.stepAtMs>=BZ}var dZ="frames without room";function IZ(e,t,r,i,n,l){if(!t)return"the opening's builds";if(!r){return ("a compile start or a load in flight");}if(l&&!bQ())return dZ;if(i)return null;if(n)return"a pipeline asked";return e.buildsInFlight>0?"a build in flight":null}function VWV(a,b){return $c0C(26).call(this,a,b)}function EZ(e,t){let{pos:r,rot:i}=t,n=e.eye;if(n===null)return e.eye=Float64Array.of(...r,...i),!1;let l=i[0]*n[3]+i[1]*n[4]+i[2]*n[5]+i[3]*n[6],s=Math.sqrt((i[0]*i[0]+i[1]*i[1]+i[2]*i[2]+i[3]*i[3])*(n[3]*n[3]+n[4]*n[4]+n[5]*n[5]+n[6]*n[6])),o=r[0]-n[0],a=r[1]-n[1],u=r[2]-n[2],d=Math.sqrt(o*o+a*a+u*u)>$Z||s>0&&1-Math.abs(l)/s>aZ;return n.set(r),n.set(i,3),d}function _RO(e,t,r){let i=UZ.get(e);return i!==void 0&&t-i.inputAtMs>=ZZ&&t-(r===!0?i.measureBusyAtMs:i.busyAtMs)>=hmf&&t-i.stepAtMs>=BZ}function EUf(e){return UZ.get(e)?.frameTrials===!0}function eZ(e,t){let r=cZ(e);r.requested=e.requestedKeyCount,r.stepAtMs=t}var yZ=new WeakMap;var ySy=(function(e,t){let r=t||e.compilesCostFrames;return e.setCalmOwer((t,r)=>GTQ(e,"far",t,r),r),e.setSpeculationPaced(t||e.eachBuildFreezesTheFrames),r});var R7s=(function(e){let t=e.compilesCostFrames;if(t)e.setCalmOwer((t,r)=>GTQ(e,"far",t,r),!0);else e.oweHeldWarmsQueued();return t});function GTQ(e,t,r,i){let v$3;{let t=yZ.get(e);if(t===void 0){t=ua(t,e)}v$3=t;}v$3.owed.set(r,{kind:t,build:i,wants:null})}function QPu(e,t,r,i){let n;{let t=yZ.get(e);if(t===void 0){t=ua(t,e)}n=t;}if(n.turn?.key===t){let t=_RO(e,r,!0);if(t)n.turn.held=!0;return t}if(!n.owed.has(t))n.owed.set(t,{kind:"look",build:null,wants:i});return!1}var mZ=(e,t)=>t!==null&&!e.returnLeaves(t)&&t.pipeline===null&&!t.failed;function cdk(e,t){let r=yZ.get(e);if(r===void 0)return null;if(r.turn!==null){{let{key:i,wants:n,held:l}=r.turn;if(n()){if(!l||_RO(e,t,!0))return null;r.owed.set(i,{kind:"look",build:null,wants:n})}return r.turn=null,eZ(e,t),null
}}if(mZ(e,r.building))return eZ(e,t),null;if(r.building=null,r.owed.size===0||e.queueRestsUnderBuilds)return null;let i=e.picturePlayed&&(t-cZ(e).inputAtMs>=ZZ)&&!e.speculationWaitsForDraws&&!e.hostCompilesInline||_RO(e,t);if(!i&&!_RO(e,t,!0))return null;{let t$8=r,r$1=t,i$1=t-cZ(e).inputAtMs,n$1=i;{let t=t$8,r=r$1,i=i$1,n=n$1;for(let[l,s]of t.owed){if(!n&&s.kind!=="highlight"&&s.kind!=="look")continue;t.owed.delete(l);if(s.build===null){if(!s.wants?.())continue;t.turn={key:l,wants:s.wants,held:!1}}else{let i=s.build();if(!mZ(e,i)){{cZ(e).requested=e.requestedKeyCount;
}continue}eZ(e,r),t.building=i}return t.asked.push({key:l,kind:s.kind,atMs:r,quietMs:i}),l}return null}}}function Z93(a,b){return $c0C(27).call(this,a,b)}var BUw=cmx();function RBx(e,t,r){BUw.warm(e,t,()=>GTQ(e,"highlight",t,r))}var jr=()=>dve(()=>$Lo("./"+globalThis.__spawnBuilt.doors["14495802"]).then(()=>import("./"+globalThis.__spawnBuilt.doors["14495802"]))),Fr=qdt("sprites",jr),Er=null,kr=nN7(()=>Er),Zr=new Set,Cr=Zv("sprites-door-hold",Zr);var mr=function(e){Er=e;{for(let t of Zr)e.ensureSpriteStore(t);D6(Zr)}z2Z(1)};var xr=i6C(Fr,jr,mr);var yJY=(function(){return Er});var{load:zr,prime:JLP,arriving:Qr}=xr;var K$D=(function(e){if(Er)Er.ensureSpriteStore(e);else Cr(e)});var PLY=kr("hasSprite",!1),l5S=kr("authoredSpriteOf",null),r1U=kr("hasSpriteInstances",!1),EEh=kr("setSpriteOutline",void 0),qNX=kr("setSpriteInstancesOutline",void 0),_$p=kr("spriteEntityIds",[]);var jM4=(function(e,t){return Er?Er.spriteWorldBounds(e,t):null});var llu=kr("spriteDrawSuppression",null),MBq=kr("raycastSprites",[]),fFJ=kr("collectSpriteLaneDebug",[]);function ffr(e){if(Er)return Er.pictureSpriteTexturesUnresolved(e);return xr.arriving()?["sprites/family"]:[]}var ax=16384,vx=32768,ix=1073741824,Ex=33554432,Jx=67108864,RcZ=((e,t)=>e>=-ax&&e<ax&&t>=-ax&&t<ax?(e+ax)*vx+(t+ax):ix+(e+Ex)*Jx+(t+Ex)),Zto=(e)=>e<ix?Math.floor(e/vx)-ax:Math.floor((e-ix)/Jx)-Ex,BSm=(e)=>e<ix?e%vx-ax:(e-ix)%Jx-Ex,A2O=(e,t)=>RcZ(AVR(e),AVR(t)),Vvf=0,DiH=1,$QO=2,Elv=3,xdq=new Ev("rings"),VFg=(()=>({minCx:0,maxCx:0,minCz:0,maxCz:0,count:0,stale:!1}));var n3z=(function(e){let t=e.peekStore(xdq);if(t)return t;return Q8(e)});var Q8=(function(e){return e.store(xdq,(function(){let t=new Set,r={scene:e,cells:new Map,byCoord:new Map,ownPlace:null,fades:new Map,fadeEnds:{ends:[],keys:[]},present:!1,dirtyCellQueues:[t],lightCells:t,landedKeys:new Set,farByPlace:new Map,farRing:-1,groundKeys:new Set,discKeys:new Set,discPlaces:[],destroyedKeys:new Set,leaving:new Set,farCells:new Set,farBox:VFg(),tickVisits:0,lastNowMs:0,fold:null,addLightCell:(e)=>t.add(e),lightCellScale:(t)=>1-Math.abs(BTV(e,t,r.lastNowMs))};return e.register({id:"rings",holdsPose:(()=>!1),notesHeldAdds:!0,prepare:((e)=>r.fold?.(r,e))}),r}))});var J9P=(function(e){if(e===$QO)return"skyline";return e===Elv?"nothing":"mesh"});function cBv(a){return $c0C(28).call(this,a)}function BTV(e,t,r){return hFV(aZ_(e,t),r)}function aZ_(e,t){let r=e.peekStore(xdq);if(!r?.present)return 0;return r.byCoord.get(t)?.meshHide??0}var Whv=(function(e,t,r){let i=e.peekStore(xdq);if(!i?.fades.size||t.size===0)return;if(t.size<i.fades.size){for(let e of t.keys()){let t=i.byCoord.get(e);if(t!==void 0&&i.fades.has(t.key))r(e)}return}for(let e of i.fades.keys()){let n=i.cells.get(e);if(!n)continue;let l=RcZ(n.cx,n.cz);if(i.byCoord.get(l)===n&&t.has(l))r(l)}});function g8(e,t,r){let i=e.ends[t],n=e.keys[t];e.ends[t]=e.ends[r],e.keys[t]=e.keys[r],e.ends[r]=i,e.keys[r]=n}function bI$(e,t,r){let{ends:i,keys:n}=e,l=i.length;i.push(t),n.push(r);while(l>0){let t=l-1>>1;if(i[t]<=i[l])break;g8(e,t,l),l=t}}function Zfd(e){let{ends:t,keys:r}=e,i=t.length;if(i===0)return;let n=r[0],l=t[i-1],s=r[i-1];if(t.length=i-1,r.length=i-1,i>1){t[0]=l,r[0]=s;let n=0,o=i-1;for(;;){let r=2*n+1;if(r>=o)break;let i=r+1,l=i<o&&t[i]<t[r]?i:r;if(t[n]<=t[l])break;g8(e,l,n),n=l}}return n}var Bgt=(function(e){let t=new Set;return n3z(e).dirtyCellQueues.push(t),t});function tvO(e,t){let r=e.peekStore(xdq)?.dirtyCellQueues,i=r?.indexOf(t)??-1;if(r!==void 0&&i>=0)r.splice(i,1);t.clear()}function cRf(e,t){let r=e.peekStore(xdq);return r?.present!==!0||r.byCoord.has(t)}function zLd(e,t){let r=e.peekStore(xdq);return r?.present===!0&&r.byCoord.get(t)?.tableRing===Vvf}function aGU(e,t){let r=e.peekStore(xdq);if(!r?.present)return null;let i=r.cells.get(t);return i===void 0?null:J9P(i.ring)==="skyline"}var UBZ=(function(e){return e.peekStore(xdq)?.fades.size??0});var BI=new Av("scene-world"),tI=(()=>({worldId:null,place:null})),w7c=(e)=>e.peekStore(BI)?.worldId??null,zaz=(e)=>e.peekStore(BI)?.place??null,ej8=(e)=>e.peekStore(xdq)?.ownPlace??w7c(e)??void 0,fI=null;function QKC(e){let t=fI;return fI=e,t}var IGm=()=>fI&&ej8(fI);var o6u=(function(e,t,r=null){let i=e.store(BI,tI);i.worldId=t,i.place=r});Reflect.has(globalThis,"86bd216da0cc303e");var MZH=(function(e){let t=e.viewOcclusion;if(t===void 0||xa(e))return null;let r=K3,i=e.camera;if(r.grid===t&&r.revision===t.revision&&r.camera===i&&msN(r.view,i.view)&&msN(r.projection,i.projection))return r.verdict;return r.grid=t,r.revision=t.revision,r.camera=i,r.view.set(i.view),r.projection.set(i.projection),r.verdict=t.matches(i.view,i.projection)?t:null,r.verdict});var K3={grid:null,revision:-1,camera:null,view:new Float32Array(16),projection:new Float32Array(16),verdict:null},r3=new Float64Array(24),vpL=[0,0,0];function po4(e,t,r,i=vpL){if(e===null)return!1;return ya(t,r,i,e);}function msN(e,t,r=0){for(let i=0;i<16;i+=1)if(e[r+i]!==t[i])return!1;return!0}function KVW(e,t,r=0,i=e.length){for(let n=0;n<i;n+=1)if(e[n]!==t[r+n])return!1;return!0}function bVx(e,t){for(let r=0;r<16;r+=1)if(Math.abs(e.view[r]-t.view[r])>0.00001||Math.abs(e.projection[r]-t.projection[r])>0.00001)return!1;return!0}var KTr="terrain/emissive",bv3=1000;function WT(e){let t=2**((e>>>27)-15-9);return[(e&511)*t,(e>>>9&511)*t,(e>>>18&511)*t]}function ebS(a){return $c0C(29).call(this,a)}var lG=(()=>globalThis.__spawnEngineConsole??=Object.create(console))(),Lo=()=>dve(()=>$Lo("./"+globalThis.__spawnBuilt.doors["d47eb3fc"]).then(()=>import("./"+globalThis.__spawnBuilt.doors["d47eb3fc"]))),xo=qdt("terrain shells",Lo),bo=[],Eo=function(e){let t=bo;bo=[];for(let r of t)if(r.bytes===null)e.forgetShells(r.scene,r.id);else e.landShellsRow(r.scene,r.id,r.bytes);if(t.length>0)z2Z(1)};xo.onArrival(Eo);var _o=qdt("shells ground text",()=>dve(()=>$Lo("./"+globalThis.__spawnBuilt.doors["e289e97d"]).then(()=>import("./"+globalThis.__spawnBuilt.doors["e289e97d"]))));_o.onArrival(function(e){if(pG())sG(e.SHELLS_GROUND_TEXT)});function zkM(){if(cG()!==null||!Ro())return;let e=_o.peek();if(e!==null){sG(e.SHELLS_GROUND_TEXT);return}JG(),t3o(_o)}var f4N=(function(e){return xo.peek()?.parkedLandReach(e)??0});var Do=!1;function Ro(){return (Ro=$c0C(30)).call(this)}function ElQ(e,t,r){if(!(r instanceof Uint8Array))return;if(!Ro())return;zkM();let i=xo.peek();if(i!==null){i.landShellsRow(e,t,r);return}bo.push({scene:e,id:t,bytes:r}),t3o(xo)}function HX8(e,t){let r=xo.peek();if(r!==null)r.forgetShells(e,t);else if(bo.length>0)bo.push({scene:e,id:t,bytes:null})}function Cfl(e){return xo.peek()?.shellsLands(e)??[]}function vv8(e){if(bo.length>0)bo=bo.filter((t)=>t.scene!==e);xo.peek()?.disposeShellsScene(e)}var Wk=()=>dve(()=>$Lo("./"+globalThis.__spawnBuilt.doors["09396255"]).then(()=>import("./"+globalThis.__spawnBuilt.doors["09396255"]))),mk=qdt("terrain voxel buckets",Wk),lk=i6C(mk,Wk),M$Z=lk.prime,Ky5=(e,t)=>e==="terrain/place-voxel-materials"||e==="terrain/place-ground"&&typeof t==="object"&&t!==null&&("kind"in t)&&t.kind==="voxel";function WKJ(e,t){if(Ky5(e,t))M$Z()}var{peek:EsM,onArrival:oEe}=mk,pk=lk.seed,a46=new sv("terrain-emissive"),P16=()=>({cells:new Map,byCarrier:new Map,moved:new Set,writer:null,leaving:[],leavingAt:0,fadeUntilMs:0}),Hr=[0,0,0];function Ir(e,t){let r=Math.max(0,Math.min(1,(t-e.start)/bv3));return[e.from[0]+(e.to[0]-e.from[0])*r,e.from[1]+(e.to[1]-e.from[1])*r,e.from[2]+(e.to[2]-e.from[2])*r]}function xmv(a,b,c,d,e){return $c0C(31).call(this,a,b,c,d,e)}function IeU(e,t){let r=e.byCarrier.get(t);if(r===void 0)return;e.byCarrier.delete(t);for(let t of r)e.cells.delete(t),e.moved.add(t)}function tet(a,b){return $c0C(32).call(this,a,b)};
Object.defineProperties($Lr,Object.getOwnPropertyDescriptors({$$4:zsL,$66,$7W,$87:g5z,$QO,$f0:_kT,$hY,$ox,A2O,A7g,A9m,ABs:M68,AQI:bxz,AWg,Alp,AqF:xNi,Ar0:tet,B3p:_DM,BSm,BSs,BUw,Blv,Brz:cFn,CZc:DD1,C_k:eSs,CbDE,Cfl,Cs3:z83,Cy_,D4c,DiH,Dxx,E5w,E7o,EBB,EEh,EUf,EW_,EhM,Eh_:zLd,ElQ,Elb,Elv,Ep5,EsM,Eyr,F4L,F61:aZ_,FAd:Hv0,FEO,FG2,Fzw,G$D:v4$,G6S:gUo,H45,H8m:Vvf,HFv:ymp,HK5,HX8,H_q:qok,HtD,I05,I53:KAs,I8o,I96C:Qwg,IDK,IDa,IGm,Ia1,IeU,Iju,Imp,J9P,JDY,JGd,JHT,JLP,JWxF,J_p:TIZ,Jcq,JcqM,Jku,JzL,K$D,K2I,K3U,KTr,KVW,KkE,Ko5,Ky5,L49,LYv,Le$:ObO,Ls_,M$Z,M94,MCy,MZH,McP:xdq,N0E,N3T,NSF,NXR,NYr,NZ2,NZj:NnZ,Nec:aYt,Nfq,NiZ,O3x,OTr,OVv:y5j,Oua,Owg,P16,P2_,PAt,PEO,PFu,PLY,PV2:tvO,PWT,PeD:B12,Pty,Q$J,QJb:Ivm,QKC,QKZ,QLX:y$w,QPu,QSU,QTP,QnO:nm3,QrU,QtK:UBZ,R$o:Bgt,R0P,R46,R7s,RBx,RDr:z9S,RJg:GTQ,RYm:MBq,RcZ,Rw4,Rwm:GaM,S2P:R2z,SIz,SNH,T2n,TCI:CYl,TRl,Tbc,TkD:VG0,Tyl,U0L:YIB,UEY,V$Z:Lv4,V9$:P_x,VFg,VWV,ViK,Vj7,Vr8,W3X,WKJ,WLH,WWq,Wc2,Whv,WsQ,Wyk,X44,XCz,XY4,XkM,Xrq,Xvi,YFG,YrV:dh_,Z1P,Z4F:n7w,Z93,ZD3,ZSe:cI8,ZTM,Zfd,Zto,_$p,_RO,_Vk:vna,_eZ,_sD:Bo_,_yi,a2k,a46,a4Z,aCS,aGU,aHg:bv3,aMi,aNm,aYp,aZk,af7,ahl,aj4:cx0,ajn,b0H,bI$,bNP,bPp,bVx,bgs,bhi,bm0,btN,bxj:vnk,c8R,cBv,cSw,cWv,cdk,cg2,ciN,cjo:XQp,clN,d4P:$EE,d68,dBL:o0q,dcT:tLD,doq:ej8,dpE,duP,e1Q,e4A:uqs,e6i,eL9,eUP,eXL,eax3,ebS,ehG,em3:Zrj,enZ,eza:qts,f$$:Bvy,f4N,f8Q,fFJ,fJn:R8n,fX9,ffr,fgy,fqX:GM3,g5q,gB1,gFw,get UFu(){return UFu},get bDG(){return bDG},ggA,h$N,h3T,hDh,hNy:XsG,hmf,i2W,i3z:fr6,i4t,i6C,iAT,iD5,iEu,iGe,iQb,icS,io2,iqs:h2x,it$,iz4,j2J,j35,jC$:uq4,jM4,jWZ,jeA,jqH,js8:BTV,k76,k8E,kDH,kEQ:ET5,kP_,l5S,lE1:Cuf,lLJ,lMf,lP8,lZP,liM:C_n,llu,lm_,lsqr,lyv,m4S:cRf,mAJ,mAJY,mGa,mJs,mNu,mUC,mVf,mXM:Wfp,m_b:TcD,m_u,msN,myS:tYa,n3z,nE_,nN7,nOUB:wg6,nRh,nUt,ncm,ngu:Uul,niq,nnU,nnw:oT7,ns0,nxC,nzJ,nzd,o5A,o6u,oAB,oEe,oFN,o_X,ofq,oge:jog,or_:BvW,ox0,oxy,p5o,pAk,pD7,pJh:eNV,pNY,pR6,pXE,pep,plp,pnd:vv8,po4,q1s,q4b,qEu,qHL,qNX,qZC,qsp,qwX,r1U,r2Q:Liq,rCa,rGZ,rIh:FjI,rPG,rWi,rXYc,r_Y,rbP,rr6,sAa,sEh,sYZ,sm6:Dpz,tLM,tSh,tXD,tjr,to9,uSb:zMn,uaU,ueV,v$i,vSd,vWX:t5B,vZ7:ZP1,vj7,vwy,w0V,w7c,wqF:vpL,x4z,x8n:lBi,xKR,xXD,xYN,xZs,xeM:CMf,xf_:IOt,xlK,xmv,y0n:xqT,y3j,y9o,yFa,yJY,ySy,y_F:SQK,ywf,z2Z,z9Q,z9o,zD7,zHU,zKZ:sIm,zX2:EeM,zaz,zgQ,zkM,zlK}));

function j(t,r){let n=1/0,l,s=fZM(t);for(let e of r.viewEyeShadows.values()){let t=e.preparedEye[0]-s[0],r=e.preparedEye[1]-s[1],i=e.preparedEye[2]-s[2],o=t*t+r*r+i*i;if(o<n)n=o,l=e.eyeSunShare}
return l}
function A(e,t){if(e.start!==t.start)return!1;for(let r=0;r<3;r+=1)if(e.center[r]!==t.center[r]||e.halfExtent[r]!==t.halfExtent[r])return!1;
return k}
function B(l,t,r){return(l.center[t]-(r?.camera.position[t]??0)-(r?.renderOrigin?.[t]??0))}
function C(r,t){r.gpu?.buffer.release(),r.gpu={device:t,buffer:o5(t,{label:"lume fog horizon",size:pK,usage:200},q5),uniformRevision:-1,written:null,staging:new Float32Array(yK/4)};
}
function E(i,r){return(i.staging[0]===Math.fround(r.color[0]))}
function F(i,r){return(i.staging[1]===Math.fround(r.color[1]))}
function G(i,r){return(i.staging[2]===Math.fround(r.color[2]))}
function H(i,r,t,l,n){zlK(i.staging,r.color,0),t.queue.writeBuffer(l,0,i.staging),i.uniformRevision=n,i.written=l
}
function I(e){FX={source:e.source,standard:sX.has(uU5(e.source))};
}
function J(e){let t=OX.get(e);if(t===void 0){t=[lyv,(`${lyv}:${RX(e)}`)];OX.set(e,t);}
return t}

function L(){throw Error("lume indexed attributes need xyz vertices");
}
function M(){throw Error("lume indexed attributes need position first");
}
function S(r,e,i,l){return{name:r[1],before:e.slice(0,r.index),args:e.slice(i,l-1)}
}
function T(t,e){if(t!==0||/\breturn\b/.test(e))return!1;let r=e.slice(Math.max(e.lastIndexOf(";"),e.lastIndexOf("{"),e.lastIndexOf("}"))+1).trim();return/^(?:(?:let|var)\s+[A-Za-z_][A-Za-z0-9_]*\s*(?::[^=]*)?=|[A-Za-z_][A-Za-z0-9_.]*\s*=(?!=))/.test(r)&&!r.includes("&&")&&!r.includes("||")
}
function U(e,r){return(e.replace(/\) -> vec3<f32>$/,`${r}) -> vec3<f32>`))}
function W(t,e,r){throw Error(`internal: the lighting() of "${t}" reads ${e} of its material's inputs, and the lane passed ${r?.length??0}`);
}



function _(e,t,i){return Oz={defs:e.wgslDefs,smaller:t.wgslDefs,names:i},i
}
function $(e){return(e.opsCount>0||e.assetsChanged||e.sceneOwesFrame===!0)}

function ba(e){if(e.pictureArrives)return"arrival";if(e.assetsChanged)return"assets";if(e.prepareWake)return"prepare-wake";if(e.eyeOwesSeed)return"eye-seed";return null
}
function ca(e,t){let r=[...e.definitions],i=e.definitions.map((t,r)=>e.paints?.[r]??null),n=e.definitions.map((t,r)=>e.bounds?.[r]??null),l=e.definitions.map((t,r)=>e.drawn?.[r]??null),s=[];for(let[o,a]of t.entries()){let t=d2.get(a);if(t===void 0){s.push(a);continue}P2(a,t);r.push(t.definition);i.push(t.paint);n.push(t.bounds);l.push(e.rodeDrawn?.[o]??null)}let{rode:o,rodeDrawn:a,paints:u,bounds:d,drawn:f,appliedMark:c,...h}=e;
D[0]=r,D[1]=i,D[2]=n,D[3]=l,D[4]=s,D[5]=c,D[6]=h}
function da(){return(`held until its code loads (${qe.state()})`)}
function ea(s,t,n,l){s={...t,scripted:t.scripted===null?null:{...t.scripted,entry:n(t.scripted.entry)},lighting:l(t.lighting)};
return s}
function ga(e,r){e.heldChars-=e.held.get(r)??0,e.held.delete(r);
}
function ha(e){if(e.kind==="program"&&e.image!==null)G8(e.image,e);else if(e.kind==="family")Object.assign(e,{code:TcD(e.code,e)}),Object.assign(e.door,{doorText:TcD(e.door.doorText,e.door)});
}
function ia(e){Object.assign(e,{ownLighting:TcD(e.ownLighting,e)})
}
function ja(t){let{message:e,data:r}=t.report;if(i20("warn",`[matbuild] [family-door] ${e}`,r?.door??""),r?.phase==="parked")this.fall(e)
}
function ka(e){this.fall(`the material builder could not stand: ${K6(e)}`,!0)
}
function la(e){this.land(e,uE("the material builder is not serving"));
}
function ma(r,e,t){this.crossing=r;for(let r of e){let e=this.held();let i;NE$:{let e$10=t,t$7=[this.wire(r)];{let e=e$10,t=t$7;try{{i=(e.postMessage({kind:"builds",asks:t}),null);break NE$;}}catch(e){{i=K6(e);break NE$;}}}}if(i===null)continue;this.crossing=e;let n=this.asked.get(r.id);if(n===void 0)continue;this.asked.delete(r.id),this.pendingKeys.delete(n),this.land(n,uE(`the ask did not cross: ${i}`))}this.armDeadline(),this.idle.edge()
}
function na(e){this.kept.add(e);let t=this.replies.get(e);if(t!==void 0)this.replies.delete(e),this.keptReplies.set(e,t)
}
function pa(){this.deadline=setTimeout(()=>this.fall(`the material builder's realm did not say ready for ${HE} ms`),HE)
}
function qa(t,e){t={input:NaN,inputAtMs:-1/0,eyeMovedAtMs:-1/0,inputBy:"",requested:NaN,busyAtMs:1/0,busyBy:"no frame yet",measureBusyAtMs:1/0,stepAtMs:-1/0,frameAtMs:NaN,eye:null,frameTrials:!1},UZ.set(e,t);
return t}



function ua(t,e){t={owed:new Map,building:null,turn:null,asked:[]},yZ.set(e,t);
return t}


function xa(e){return(e.cullOcclusion!==void 0&&e.cullOcclusion.count!==1)}
function ya(t,r,i,e){for(let e=0;e<24;e+=1)r3[e]=t[r+e%3+(e/3>>e%3&1)*3]-i[e%3];return e.hidesPoints(r3,8)
}
function k(){}var q;function D(){}

;import{O as $Lo,R as $Lr}from"./52e971dc2a986655.mjs";export{$66,$7W,$EE,$QO,$hY,$ox,A2O,A7g,A9m,AWg,Alp,B12,BSm,BSs,BTV,BUw,Bgt,Blv,Bo_,BvW,Bvy,CMf,CYl,C_n,CbDE,Cfl,Cuf,Cy_,D4c,DD1,DiH,Dpz,Dxx,E5w,E7o,EBB,EEh,ET5,EUf,EW_,EeM,EhM,ElQ,Elb,Elv,Ep5,EsM,Eyr,F4L,FEO,FG2,FjI,Fzw,GM3,GTQ,GaM,H45,HK5,HX8,HtD,Hv0,I05,I8o,IDK,IDa,IGm,IOt,Ia1,IeU,Iju,Imp,Ivm,J9P,JDY,JGd,JHT,JLP,JWxF,Jcq,JcqM,Jku,JzL,K$D,K2I,K3U,KAs,KTr,KVW,KkE,Ko5,Ky5,L49,LYv,Liq,Ls_,Lv4,M$Z,M68,M94,MBq,MCy,MZH,N0E,N3T,NSF,NXR,NYr,NZ2,Nfq,NiZ,NnZ,O3x,OTr,ObO,Oua,Owg,P16,P2_,PAt,PEO,PFu,PLY,PWT,P_x,Pty,Q$J,QKC,QKZ,QPu,QSU,QTP,QrU,Qwg,R0P,R2z,R46,R7s,R8n,RBx,RcZ,Rw4,SIz,SNH,SQK,T2n,TIZ,TRl,Tbc,TcD,Tyl,UBZ,UEY,UFu,Uul,VFg,VG0,VWV,ViK,Vj7,Vr8,Vvf,W3X,WKJ,WLH,WWq,Wc2,Wfp,Whv,WsQ,Wyk,X44,XCz,XQp,XY4,XkM,Xrq,XsG,Xvi,YFG,YIB,Z1P,Z93,ZD3,ZP1,ZTM,Zfd,Zrj,Zto,_$p,_DM,_RO,_eZ,_kT,_yi,a2k,a46,a4Z,aCS,aGU,aMi,aNm,aYp,aYt,aZ_,aZk,af7,ahl,ajn,b0H,bDG,bI$,bNP,bPp,bVx,bgs,bhi,bm0,btN,bv3,bxz,c8R,cBv,cFn,cI8,cRf,cSw,cWv,cdk,cg2,ciN,clN,cx0,d68,dh_,dpE,duP,e1Q,e6i,eL9,eNV,eSs,eUP,eXL,eax3,ebS,ehG,ej8,enZ,f4N,f8Q,fFJ,fX9,ffr,fgy,fr6,g5q,g5z,gB1,gFw,gUo,ggA,h$N,h2x,h3T,hDh,hmf,i2W,i4t,i6C,iAT,iD5,iEu,iGe,iQb,icS,io2,it$,iz4,j2J,j35,jM4,jWZ,jeA,jog,jqH,k76,k8E,kDH,kP_,l5S,lBi,lLJ,lMf,lP8,lZP,llu,lm_,lsqr,lyv,mAJ,mAJY,mGa,mJs,mNu,mUC,mVf,m_u,msN,n3z,n7w,nE_,nN7,nRh,nUt,ncm,niq,nm3,nnU,ns0,nxC,nzJ,nzd,o0q,o5A,o6u,oAB,oEe,oFN,oT7,o_X,ofq,ox0,oxy,p5o,pAk,pD7,pNY,pR6,pXE,pep,plp,po4,q1s,q4b,qEu,qHL,qNX,qZC,qok,qsp,qts,qwX,r1U,rCa,rGZ,rPG,rWi,rXYc,r_Y,rbP,rr6,sAa,sEh,sIm,sYZ,t5B,tLD,tLM,tSh,tXD,tYa,tet,tjr,to9,tvO,uaU,ueV,uq4,uqs,v$i,v4$,vSd,vj7,vna,vnk,vpL,vv8,vwy,w0V,w7c,wg6,x4z,xKR,xNi,xXD,xYN,xZs,xdq,xlK,xmv,xqT,y$w,y3j,y5j,y9o,yFa,yJY,ySy,ymp,ywf,z2Z,z83,z9Q,z9S,z9o,zD7,zHU,zLd,zMn,zaz,zgQ,zkM,zlK,zsL};
