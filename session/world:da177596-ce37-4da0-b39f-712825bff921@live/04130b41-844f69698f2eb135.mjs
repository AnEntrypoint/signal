import{C as $c0K}from"./52e971dc2a986655.mjs";var $c0C,$c0T=[function(){return[()=>'(($,J)=>`  let microDx = dpdx(in.microPos);\n  let microDy = dpdy(in.microPos);\n  let microFw = abs(microDx) + abs(microDy);\n  var surf = VoxelSurface(in.color, in.surface.x, in.surface.y, in.emissive, vec3f(0.0), 0.0, 0.0);\n  if (in.look.x != 0u) { surf = voxel_surface_slant(in.look, in.microOrigin, in.microPos, microDx, microDy, in.cubeScale, VoxelSurfaceLive(${w0("frame.cameraPosition - in.worldPos")}, ${$}, clamp(dot(${J}, vec3f(0.2126, 0.7152, 0.0722)), 0.0, 1.0), frame.worldTime), select(1u, u32(voxelSurfaceTable[0].y), voxel_slant)); }\n  surf = voxel_surface_sky_wet(surf, in.look, passLights.groundWet);\n  surf = voxel_surface_emissive(surf, in.look, in.microOrigin, in.microPos, in.cubeScale, frame.worldTime);`)',()=>"(function($,J,Q,Z){let j=Math.imul($,2654435761)^Math.imul(J,2246822519)^Math.imul(Q,3266489917)^Math.imul(Z,668265263);return j=Math.imul(j^j>>>15,739982445),j=Math.imul(j^j>>>12,695872825),(j^j>>>15)>>>0})",()=>"(function($,J,Q,Z,j){let q=(P,z)=>((((P&(1<<z)-1)+0.5)/(1<<z))*(((P&(1<<z)-1)+0.5)/(1<<z))*(3-2*(((P&(1<<z)-1)+0.5)/(1<<z))));let Y=q($,Z[0]);let V=q(J,Z[1]);let H=q(Q,Z[2]);let K=$>>>Z[0];let X=J>>>Z[1];let F=Q>>>Z[2];let G=0;let U=0;let N=0;for(let P=0;P<8;P+=1){let z=P&1,C=P>>1&1,I=P>>2,D=w(K+z,X+C,F+I,j),M=(z===1?Y:1-Y)*(C===1?V:1-V)*(I===1?H:1-H);G+=(D&1023)/1023*M,U+=(D>>>10&1023)/1023*M,N+=(D>>>20&1023)/1023*M}$7[0]=G,$7[1]=U,$7[2]=N})",()=>"(function($,J,Q,Z,j){let q=1<<Z;let Y=$>>>Z;let V=J>>>Z;let H=(((($&q-1)+0.5)/q)*((($&q-1)+0.5)/q)*(3-2*((($&q-1)+0.5)/q)));let K=((((J&q-1)+0.5)/q)*(((J&q-1)+0.5)/q)*(3-2*(((J&q-1)+0.5)/q)));let X=S(w(Y,V,Q,j));let F=S(w(Y+1,V,Q,j));let G=S(w(Y,V+1,Q,j));let U=S(w(Y+1,V+1,Q,j));return j9(j9(X,F,H),j9(G,U,H),K)})",()=>"(function($,J){let Q=S(J),Z=Math.min(Math.floor(Q*$.base.count),$.base.count-1),j=$.base.shares;if(j)Z=(Q>=j[0]?1:0)+(Q>=j[1]?1:0)+(Q>=j[2]?1:0)+(Q>=j[3]?1:0);let q=S(I0(J,K9));if(q<$.rare.dark)return $.rare.darkTone;if(q>1-$.rare.light)return $.rare.lightTone;return $.base.lo+Z})",()=>"(()=>({cx:0,cy:0,cz:0,fx:0,fy:0,fz:0,hash:0,fieldX:0.5,fieldZ:0.5,drift:0.5}))",()=>"(function($,J,Q,Z,j){let q=e0(J,Q),Y=J-q*Q;if($.uneven>0){let V=c$(q,Z,j,$.uneven);let H=c$(q+1,Z,j,$.uneven);if(Y<V){q-=1;Y=Y+Q-c$(q,Z,j,$.uneven);}else if(Y>=Q+H)q+=1,Y=Y-Q-H;else Y-=V}H9.index=q,H9.inRun=Y})",()=>"(function($,J,Q,Z,j){let q=J.stands?Z:Q,Y=J.stands?Q:Z;if(J.warp>0){let D=$.world?(B??=$c0I(5)).cx+(B??=$c0I(5)).cz>>>0&65535:q;Y+=Math.floor((n$((D+0.5)/J.warpLength,9,0,j)-0.5)*2*J.warp+0.5)}if(J.wander>0)Y+=Math.floor(S(w(e0(q,J.wander),7,0,j))*2);let V=e0(Y,J.course),H=Y-V*J.course,K=J.run+Math.floor(S(w(V,11,0,j))*(J.runJitter+1)),X=J.slide*(V-2*Math.floor(V*0.5));if(J.slide<0)X=Math.floor(S(w(V,12,0,j))*K);bj(J,q+X,K,V,j);let{index:F,inRun:G}=H9,U=!1;if(J.doubles>0){let D=e0(F,2);if(S(w(D,V,14,j))<J.doubles)U=F-2*D>0.5,F=D*2}let N=w(F,V,4,j);b.base=r$($,N);let P=J.jointCourse;if(P&&J.broken<1)P=S(w(e0(q,J.brokenLength),V,17,j))<J.broken;let z=w(q,Y,18,j);if(b.joint=0,J.jointRun&&G<1&&!U||P&&H<1)b.joint=1;else if(P&&H<2&&S(I0(z,K9))<J.second)b.joint=2;let C=J.jointCourse?1:0;if(b.rim=0,H>=C&&H<C+1&&S(z)<J.rimNearShare)b.rim=J.rimNear;if(H>=J.course-1&&S(I0(z,X9))<J.rimFarShare)b.rim+=J.rimFar;b.laid=-1;let I=J.jointRun?1:0;if(J.chipShare>0&&G>=I&&G<I+1&&H>=J.course-1&&S(I0(N,l6))<J.chipShare)b.laid=J.chipTone})"]},function(){return[()=>"(function($,J,Q,Z,j,q){let Y=e0(Q,J.along),V=e0(Z,J.up),H=1e9,K=1e9,X=0,F=0,G=0,U=x(J.radius),N=x(J.radiusJitter),P=U>0?x(U+N):J.along,z=U>0?x(U+N):J.up,C=Q+0.5,I=Z+0.5;for(let R=0;R<9;R+=1){let _=(R+4)%9,O=Y+_%3-1,d=V+Math.floor(_/3)-1,i=O*J.along,o0=d*J.up,R7=x(Math.max(i-C,x(C-x(i+x(J.along*Z9))),0)/P),b$=x(Math.max(o0-I,x(I-x(o0+x(J.up*Z9))),0)/z);if((x(Math.sqrt(x(x(R7*R7)+x(b$*b$)))))>=K)continue;let v0=w(O,d,20,q);let V8=x(x(O+x(S(v0)*Z9))*J.along);let r8=x(x(d+x(S(I0(v0,K9))*Z9))*J.up);let K7=U>0?x(U+x(N*S(I0(v0,X9)))):0;let H8=x(x(C-V8)/(U>0?K7:J.along));let L7=x(x(I-r8)/(U>0?K7:J.up));let s0=(x(Math.sqrt(x(x(H8*H8)+x(L7*L7)))));if(s0<H)K=H,F=X,H=s0,X=v0,G=L7;else if(s0<K)K=s0,F=v0}b.base=x(x(r$($,X)+x(x(x(J.vertical)*G)*j))-x(x(J.radial)*H)),b.rim=0;let D=w(Q,Z,21,q),M=x(K-H),v=J.crackWidth>0&&M<x(J.crackWidth)&&S(w(Math.min(X,F),Math.max(X,F),22,q))<x(J.crackShare),L=J.gap&&H>1;b.joint=v||L?1:0;let c=U>0?H>x(J.ring):M<x(J.ring);b.laid=c&&S(D)<x(J.ringShare)?J.ringTone:-1})",()=>"(function($,J){let{fx:Q,fy:Z,fz:j}=(B??=$c0I(5));if($.axis===4)Q=(B??=$c0I(5)).fy,Z=(B??=$c0I(5)).fx;else if($.axis<3)Q=[(B??=$c0I(5)).cx,(B??=$c0I(5)).cy,(B??=$c0I(5)).cz][$.axis]??(B??=$c0I(5)).cx,Z=$.axis===0?(B??=$c0I(5)).cy:(B??=$c0I(5)).cx,j=$.axis===2?(B??=$c0I(5)).cy:(B??=$c0I(5)).cz;let q=w(Z,j,31,J),Y=Q&65535;if($.segments){let V=$.length+Math.floor(S(q)*($.jitter+1)),H=Math.floor(S(I0(q,K9))*V);return Math.floor(S(w(e0(Y+H,V),Z,j,J+6))*$.hi)}if(S(I0(q,X9))>=$.lines)return 0;return q9(n$((Y+0.5)/$.length,Z,j,J+6),$.hi,$.lo)})",()=>"(function($,J,Q,Z){let j=b.laid;Y9.lid=!1;let q=0,Y=4;for(let V=0;V<$.accents.length;V+=1){let H=$.accents[V];if(!H||H.share<=0||H.top&&J!==2||Z&&H.blink>0)continue;let K=(H.pairs?1:0)|(H.tall?2:0);if(K!==Y)q=w((B??=$c0I(5)).fx>>>(K&1),(B??=$c0I(5)).fy>>>(K>>1),(B??=$c0I(5)).fz,Q+5),Y=K;let X=[1,(B??=$c0I(5)).drift,(B??=$c0I(5)).fieldX,(B??=$c0I(5)).fieldZ][H.gate]??1;if(H.gate!==0&&X<=H.over)continue;if(S(I0(q,2654435761+V*1013904242))<H.share){if(j=H.tone,H.overJoint)Y9.lid=!0}}if(b.joint===0||Y9.lid)return j;return b.joint>1.5||S(I0((B??=$c0I(5)).hash,Oj))<$.joint.share?$.joint.b:$.joint.a})",()=>"(function($,J,Q,Z,j,q,Y=!1){let V=$.seed,H=j>>1;{let j=H;if((B??=$c0I(5)).cx=J+x0>>>0,(B??=$c0I(5)).cy=Q+x0>>>0,(B??=$c0I(5)).cz=Z+x0>>>0,(B??=$c0I(5)).hash=w((B??=$c0I(5)).cx,(B??=$c0I(5)).cy,(B??=$c0I(5)).cz,$.seed),(B??=$c0I(5)).fx=(B??=$c0I(5)).cx,(B??=$c0I(5)).fy=(B??=$c0I(5)).cy,(B??=$c0I(5)).fz=(B??=$c0I(5)).cz,!$.world&&j===0)void 0,(B??=$c0I(5)).fx=(B??=$c0I(5)).cz,(B??=$c0I(5)).fz=(B??=$c0I(5)).cx;else if(!$.world&&j===1)void 0,(B??=$c0I(5)).fy=(B??=$c0I(5)).cz,(B??=$c0I(5)).fz=(B??=$c0I(5)).cy;if($7[0]=0.5,$7[2]=0.5,$.field)o6((B??=$c0I(5)).cx,(B??=$c0I(5)).cy,(B??=$c0I(5)).cz,$.field,$.seed+2);void 0,(B??=$c0I(5)).fieldX=$7[0],(B??=$c0I(5)).fieldZ=$7[2],(B??=$c0I(5)).drift=$.drift?s6((B??=$c0I(5)).fx,(B??=$c0I(5)).fy,j,$.drift.shift,$.seed+3):0.5}b.joint=0;b.rim=0;b.laid=-1;if($.blocks){wj($,$.blocks,(B??=$c0I(5)).fx&65535,(B??=$c0I(5)).fy&65535,V);}else if($.cells){_j($,$.cells,(B??=$c0I(5)).fx&65535,(B??=$c0I(5)).fy&65535,H===1?0:1,V);}else b.base=r$($,I0((B??=$c0I(5)).hash,X9));let K=b.rim;if($.speck){let N=S(I0(w((B??=$c0I(5)).fx>>>($.speck.pairs?1:0),(B??=$c0I(5)).fy,(B??=$c0I(5)).fz,V+5),l6));K+=q9(N,1-$.speck.up,$.speck.down)}if($.grain){K+=gj($.grain,V);}let X=$.blobs?q9((B??=$c0I(5)).fieldX,$.blobs.hi,$.blobs.lo):0;let F=$.drift?q9((B??=$c0I(5)).drift,$.drift.hi,$.drift.lo):0;let G=[$.face.side,$.face.top,$.face.bottom][H===1?1+(j&1):0]??0;let U=Math.min($.clamp[1],Math.max($.clamp[0],b.base+K+X+F+G));q.tone=Math.floor(U+0.5);q.over=kj($,j,V,Y);q.base=b.base;q.cellWalk=K;q.fieldWalk=X;q.driftWalk=F;q.joint=0;if(b.joint>0)q.joint=Y9.lid?2:1;return q})"]},function(){return[()=>"(()=>({tint:[1,1,1],toward:[0,0,0],amount:0,rough:1,roughAmount:0,glow:[0,0,0]}))",()=>'(function($,J){let Q=m0($)&&!(("l"in $)&&("c"in $))?$:void 0,Z=P9(Q?Q.color:$);if(Z===void 0)return;return{rgb:Z,roughness:T(Q?.roughness,J.roughness,0,1),metalness:T(Q?.metalness,J.metalness,0,1),glow:T(Q?.glow,0,0,Y0)}})',()=>'(function($,J){let Q=H0($.course,3,1,64),Z=A0(Array.isArray($.run)?$.run[0]:$.run),j=Z===void 0||Z<1,[q,Y]=j?[a8,0]:qJ($.run,6,1,256),V=$.joint==="course"||$.joint==="both",H=J0($.broken),K=J0($.rim),X=J0($.far),F=J0($.chip),G=J0(Array.isArray($.warp)?$.warp:[$.warp]),U=j?{slide:0,uneven:0,doubles:0,jointRun:!1}:{slide:$.slide==="own"?-1:H0($.slide,0,0,q-1),uneven:H0($.uneven,0,0,Math.max(0,Math.floor((q-2)/2))),doubles:T($.doubles,0,0,1),jointRun:$.joint==="run"||$.joint==="both"};return{course:Q,run:q,runJitter:Y,...U,wander:H0($.wander,0,0,64),warp:T(G[0],0,0,8),warpLength:T(G[1],12,2,256),stands:$.stands===!0,jointCourse:V,broken:T(H[0],1,0,1),brokenLength:H0(H[1],3,1,64),second:V&&Q>=3?T($.second,0,0,1):0,rimNear:T(K[0],0,-4,4),rimNearShare:K.length>0?T(K[1],1,0,1):0,rimFar:T(X[0],0,-4,4),rimFarShare:X.length>0?T(X[1],1,0,1):0,chipShare:F.length>0?T(F[0],0,0,1):0,chipTone:J(F[1],0)}})',()=>"(function($,J){let Q=J0(Array.isArray($.size)?$.size:[$.size,$.size]),Z=J0(Array.isArray($.radius)?$.radius:[$.radius,$.radius]),j=T(Z[0],0,0,64),q=J0($.cracks),Y=J0($.ring);return{along:H0(Q[0],8,2,64),up:H0(Q[1],8,2,64),radius:j,radiusJitter:T(Z[1],j,j,64)-j,vertical:T($.vertical,0,-8,8),radial:T($.radial,0,-8,8),crackWidth:T(q[0],0,0,0.5),crackShare:q.length>0?T(q[1],1,0,1):0,ring:T(Y[0],0,0,2),ringShare:Y.length>0?T(Y[1],1,0,1):0,ringTone:J(Y[2],0),gap:$.gap===!0}})",()=>"(function($,J,Q){let Z=J0(Array.isArray($.base)?$.base:[$.base,$.base]),j=T(Z[0],Math.floor(J/2),0,J),q=T(Z[1],j,j,J),Y=J0($.shares).slice(0,5).map((N)=>T(N,0,0,1000)),V=Y.reduce((N,P)=>N+P,0),H=Y.length>1&&V>0,K=H?Y.length:A(Math.round(q-j)+1,1,F8),X=null;if(H){let N=0,P=Y.map((C)=>N+=C/V),z=(C)=>C<K-1?P[C]??2:2;X=[z(0),z(1),z(2),z(3)]}let F=G0($.rare),G=J0($.clamp),U=H0(G[0],0,0,J);return{base:{lo:j,count:K,shares:X},rare:{dark:T(F?.dark,0,0,0.5),darkTone:Q(F?.darkTone,Math.floor(j)-1),light:T(F?.light,0,0,0.5),lightTone:Q(F?.lightTone,Math.ceil(j)+K)},clamp:[U,H0(G[1],J,U,J)]}})",()=>'(function($,J){let Q=G0($);if(!Q)return null;let Z=lj[typeof Q.axis==="string"?Q.axis:""]??3,j=A0(Q.tones);if(j!==void 0&&j>=2){let[H,K]=qJ(Q.length,4,1,64);return{axis:Z,length:H,jitter:K,segments:!0,hi:Math.round(A(j,2,F8)),lo:0,lines:1}}let q=T(Q.length,8,1,64);let [Y,V]=z9(t6(q,J,o$),T(Q.up,0,0,0.5),T(Q.down,0,0,0.5));return{axis:Z,length:q,jitter:0,segments:!1,hi:Y,lo:V,lines:T(Q.lines,1,0,1)}})',()=>"(function($,J,Q,Z,j){let q=[],Y=[];for(let V of $){let H=A0(V.tone),K=H===void 0?-1:Z(H,0),X=H===void 0?YJ(V.tone,j):void 0;if(X&&q.length<J9)q.push(X),K=100+q.length-1;if(K<0)continue;let F=s$(V);let G=F===1?Q:J;let U=F!==0&&G?z9(G,T(V.cover,0.25,0.001,1),0)[0]:0;let N=A0(V.blink);let P=N!==void 0&&N>0?A(Math.round(N/O7),1,255)*O7:0;Y.push({share:T(V.share,0.02,0,1),tone:K,pairs:V.pairs===!0,tall:V.tall===!0,top:V.top===!0,overJoint:V.overJoint===!0,gate:F,over:U,blink:P,catch:P>0?Math.round(T(V.catch,0,0,1)*255)/255:0})}return{accents:Y,colours:q}})"]},function(){return[()=>"(function($,J,Q,Z,j){let q=G0($.drift);let Y=J0($.accents).filter((P)=>m0(P)).slice(0,y7);let V=J!==void 0||Y.some((P)=>s$(P)>=2);let H=q!==void 0||Y.some((P)=>s$(P)===1);let K=J0(Array.isArray(J?.size)?J.size:[J?.size,J?.size,J?.size]);let X=V?[C0(K[0],8,1,6),C0(K[1],8,1,6),C0(K[2]??K[0],8,1,6)]:null;let F=C0(q?.size,32,2,9);let G=X?U9(X,Q,o$):null;let U=H?a6(F,Q,o$):null;let N=null;if(U){let[P,z]=z9(U,T(q?.up,0,0,0.5),T(q?.down,0,0,0.5));N={shift:F,hi:P,lo:z}}return{field:X,blobs:sj(J,G),drift:N,...tj(Y,G,U,Z,j)}})",()=>'(()=>(["base","blocks","cells","grain","blobs","drift","speck","accents"]))',()=>'(function($,J){if(!m0($))return null;let{tones:Q,pattern:Z,matter:j,waveIntensity:q}=$,Y=e6.get($);if(Y===void 0||Y.tones!==Q||Y.pattern!==Z||Y.matter!==j||Y.waveIntensity!==q)Y={tones:Q,pattern:Z,matter:j,waveIntensity:q,byFallback:new Map},e6.set($,Y);let V=`${J.rgb[0]},${J.rgb[1]},${J.rgb[2]},${J.roughness},${J.metalness},${J.opacity??""}`,H=Y.byFallback.get(V);if(H!==void 0)return H;if(Y.byFallback.size>=H2)Y.byFallback.clear();let K=HJ($,J,0);return Y.byFallback.set(V,K),K})',()=>'(function($,J,Q){let Z=Array.isArray($.tones)?$.tones:void 0,j=G0($.pattern);if(Z===void 0&&j===void 0)return null;let q=pj(Z,J);let Y=j??{};let V=q.length-1;let H=(I,D)=>H0(I,D,0,V);let K=H0(Y.seed,0,0,65535);let X=(q2??=$c0I(20)).every((I)=>Y[I]===void 0);let F=G0(Y.blocks);let G=F===void 0?G0(Y.cells):void 0;let U=G0(Y.face);let N=G0(Y.edge);let P=G0(Y.states);let z={cellShift:C0((A0(Y.cell)??1)*y,y,0,7),seed:K,tones:q,...ij(Y,V,H),world:Y.frame==="world",blocks:F?cj(F,H):null,cells:G?dj(G,H):null,joint:nj(Y.joint,H),speck:rj(X?V2:Y.speck),grain:oj(Y.grain,K),...ej(Y,X?Y2:G0(Y.blobs),K,H,J),face:{top:T(U?.top,0,-4,4),side:T(U?.side,0,-4,4),bottom:T(U?.bottom,0,-4,4)},edge:{strength:T(N?.strength,0,-1,1),width:T(N?.width,0.06,0.005,0.4),bevel:N?.mode==="bevel"},states:N9.map(function(I,D){{let $=P?.[I],J=z8[D]??(fj??=$c0I(12));if(!m0($))return J;let Q=P9($.glow),Z=T($.glowIntensity,1,0,Y0);return{tint:P9($.tint)??J.tint,toward:P9($.toward)??J.toward,amount:T($.amount,J.amount,0,1),rough:T($.roughness,J.rough,0,1),roughAmount:T($.roughnessAmount,J.roughAmount,0,1),glow:Q?[Q[0]*Z,Q[1]*Z,Q[2]*Z]:J.glow}}}),cap:null,clear:jJ($,J.opacity??$J),flow:Q2(Y),lean:j2($)};let C=Q===0?G0(Y.cap):void 0;if(C)z.cap=HJ({tones:C.tones??$.tones,waveIntensity:$.waveIntensity,pattern:{cell:Y.cell,edge:Y.edge,states:Y.states,flowSpeed:Y.flowSpeed,flowDirection:Y.flowDirection,...G0(C.pattern)}},J,1);return z})',()=>"(($)=>({look:$,read:({tone:0,over:-1,base:0,cellWalk:0,fieldWalk:0,driftWalk:0,joint:0}),first:$.tones[0]??{rgb:[1,1,1],roughness:1,metalness:0,glow:0},at:0,base:0,cellWalk:0,fieldWalk:0,driftWalk:0,joints:0,joint:M9(),side:M9(),top:M9(),bottom:M9()}))",()=>"(function($,J){let{look:Q,read:Z}=$,j=Math.min(a$,$.at+J);while($.at<j){let q=$.at;if($.at+=1,q<B9){F9(Q,f0(q,1),f0(q,2),f0(q,3),4,Z),$.base+=Z.base,$.cellWalk+=Z.cellWalk,$.fieldWalk+=Z.fieldWalk,$.driftWalk+=Z.driftWalk;let V=G9(Q,Z);if(Z.joint>0)$.joints+=1;if(Z.joint===1)I9($.joint,V);I9($.side,V);continue}let Y=q-B9;I9($.top,G9(Q,F9(Q,f0(Y,4),f0(Y,5),f0(Y,6),2,Z))),I9($.bottom,G9(Q,F9(Q,f0(Y,7),f0(Y,8),f0(Y,9),3,Z)))}return $.at>=a$})"]},function(){return[()=>"(function($){let J=1/B9,{first:Q}=$;return{base:$.base*J,cellWalk:$.cellWalk*J,fieldWalk:$.fieldWalk*J,driftWalk:$.driftWalk*J,jointCover:$.joints*J,joint:C9($.joint,Q),top:C9($.top,Q),side:C9($.side,Q),bottom:C9($.bottom,Q)}})",()=>"(function($,J){let Q=FJ($);if(k7.has(Q))return!0;let Z=D9.get(Q);if(Z===void 0)D9.set(Q,Z=KJ($));if(!XJ(Z,J))return!1;{let $$2=Q,J$2=Z;{let $=$$2,J=J$2;D9.delete($);let Q=X2(J);UJ($,Q);(Q);}}return !0})",()=>"(function($){let J=0;for(let[Q,Z]of $){if(k7.has(Q)||Z.length!==U2)continue;UJ(Q,{base:Z[0]??0,cellWalk:Z[1]??0,fieldWalk:Z[2]??0,driftWalk:Z[3]??0,jointCover:Z[4]??0,joint:T9(Z,5),top:T9(Z,11),side:T9(Z,17),bottom:T9(Z,23)});J+=1}return J})",()=>"(function($,J){let Q=s,{blocks:Z,cells:j}=$;if(Z){let q=(Z.jointRun?U8.jointRun:0)|(Z.jointCourse?U8.jointCourse:0)|(Z.stands?U8.stands:0);return J(Q.unitA,Z.course,Z.run,Z.runJitter,Z.slide),J(Q.unitB,Z.uneven,Z.doubles,Z.wander,Z.warp),J(Q.unitC,q,Z.broken,Z.brokenLength,Z.second),J(Q.unitD,Z.chipShare,Z.chipTone,Z.warpLength,0),J(Q.rim,Z.rimNear,Z.rimNearShare,Z.rimFar,Z.rimFarShare),Math.max(1,0.5*Math.min(Z.course,Z.run))}if(j)return J(Q.cellsA,j.along,j.up,j.radius,j.radiusJitter),J(Q.cellsB,j.vertical,j.radial,j.crackWidth,j.crackShare),J(Q.cellsC,j.ring,j.ringShare,j.ringTone,j.gap?1:0),Math.max(1,0.5*Math.min(j.along,j.up));return 1})",()=>"(function($,J){let Q=s,{grain:Z,field:j,drift:q,speck:Y,blobs:V}=$;if(Y)J(Q.speck,Y.up,Y.down,Y.pairs?1:0,0);if(Z)J(Q.grainA,Z.axis,Z.length,Z.jitter,Z.segments?1:0),J(Q.grainB,Z.hi,Z.lo,Z.lines,0);if(j)J(Q.field,j[0],j[1],j[2],0);J(Q.blobs,V?.hi??2,V?.lo??-1,0,0),J(Q.drift,q?.shift??5,q?.hi??2,q?.lo??-1,0);for(let H=0;H<y7;H+=1){let K=$.accents[H];if(!K)continue;let X=(K.pairs?g0.pairs:0)|(K.tall?g0.tall:0)|(K.top?g0.top:0)|(K.overJoint?g0.overJoint:0)|K.gate<<g0.gateShift|A(Math.round(K.blink/O7),0,255)<<g0.blinkShift|A(Math.round(K.catch*255),0,255)<<g0.catchShift;J(Q.accents+H,K.share,K.tone,X,K.over)}})",()=>"(function($){let J=_0,Q=$.accents.some((Z)=>Z.share>0);return($.blocks?J.blocks:0)|($.cells?J.cells:0)|($.grain?J.grain:0)|($.field?J.field:0)|($.drift?J.drift:0)|($.speck?J.speck:0)|(Q?J.accents:0)|($.world?J.world:0)|(e$($)?J.blink:0)|($.flow?J.flow:0)})",()=>"(function($,J,Q,Z){let j=NJ($);let q=Q*4;J.fill(0,q,q+n*4);let Y=function(P,z,C,I,D){let M=q+P*4;J[M]=z,J[M+1]=C,J[M+2]=I,J[M+3]=D},V=function(P,z){if(z)Y(P,z.rgb[0],z.rgb[1],z.rgb[2],x9(z))},H=s,{field:K,drift:X}=$,F=$.base.shares??[-1,0,0,0];Y(H.head,$.cellShift,$.seed,Z,vJ($)),Y(H.base,$.base.lo,$.base.count,$.clamp[0],$.clamp[1]),Y(H.baseShares,F[0],F[1],F[2],F[3]),Y(H.rare,$.rare.dark,$.rare.darkTone,$.rare.light,$.rare.lightTone);let G=G2($,Y);Y(H.joint,$.joint.a,$.joint.b,$.joint.share,j.jointCover);N2($,Y);Y(H.means,j.base,j.cellWalk,j.fieldWalk,j.driftWalk);Y(H.features,G,K?0.5*2**Math.min(K[0],K[1],K[2]):1,X?0.5*2**X.shift:1,0);Y(H.face,$.face.top,$.face.side,$.face.bottom,$.clear);Y(H.edge,$.edge.strength,$.edge.width,$.edge.bevel?1:0,0);let U=y/2**$.cellShift,N=$.flow;Y(H.flow,N?N.x*U:0,N?N.z*U:0,N?N.fall*U:0,$.lean),V(H.jointMean,j.joint),V(H.classMean,j.top),V(H.classMean+1,j.side),V(H.classMean+2,j.bottom);for(let P=0;P<J9;P+=1)V(H.colours+P,$.colours[P]);for(let P=0;P<N9.length;P+=1){let z=$.states[P]??z8[P];if(!z)continue;let C=H.states+P*p$;Y(C,z.tint[0],z.tint[1],z.tint[2],z.amount),Y(C+1,z.toward[0],z.toward[1],z.toward[2],z.rough),Y(C+2,z.glow[0],z.glow[1],z.glow[2],z.roughAmount)}for(let P=0;P<$.tones.length;P+=1)V(H.tones+P,$.tones[P]);return{rgb:[j.top.rgb[0],j.top.rgb[1],j.top.rgb[2]],roughness:j.top.roughness,metalness:j.top.metalness}})"]},function(){return[()=>"(function($,J,Q,Z,j){let q=(X,F,G)=>X*F+(G-X*F)*$.amount;let Y=$.glow[0]+$.glow[1]+$.glow[2]>0;let V=0.2126*J.r+0.7152*J.g+0.0722*J.b;let H=S7.floor+S7.slope*V;let K={r:q(J.r,$.tint[0],$.toward[0]),g:q(J.g,$.tint[1],$.toward[1]),b:q(J.b,$.tint[2],$.toward[2])};return{color:K,roughness:d$(V,Q,0.2126*K.r+0.7152*K.g+0.0722*K.b,Q+($.rough-Q)*$.roughAmount),emissive:Y?{r:Z.r*j+$.glow[0]*H,g:Z.g*j+$.glow[1]*H,b:Z.b*j+$.glow[2]*H}:Z,emissiveIntensity:Y?1:j}})",()=>'(function(){let $=new Float32Array((k+MJ*n)*4);return $[X8]=1,{data:$,capacity:MJ,slots:new Map,free:[],next:0,grown:null,ownGrown:new Map,layerGround:new Map,emissive:null,emissiveCount:0,emissiveDirty:null,arm:null,dirty:"rows",gpu:null,revision:0,grownRevision:0,drew:!1,appearStartedMs:null,appear:0,terms:0}})',()=>"(function($,J){let Q=$.ownGrown.get(J)??null,Z=$.layerGround.get(J)??null;if(Z===null)return Q;let j=Q===null?new Float32Array(V0*4):Q.slice(),q=Q?.[1]??0,Y=q+Z.depth;for(let V=0;V<3;V+=1)j[4+V]=((j[4+V]??0)*q+(Z.mean[V]??0)*Z.depth)/Math.max(Y,0.000001);j[2]=((j[2]??0)*q+Z.lean*Z.depth)/Math.max(Y,0.000001);for(let V=0;V<3;V+=1)j[8+V]=((j[8+V]??0)*q+(Z.mean[V]??0)*Z.depth)/Math.max(Y,0.000001);if(j[12]=((j[12]??0)*q+Z.lean*Z.depth)/Math.max(Y,0.000001),q<=0)j[11]=Y;j[0]=A(1-(1-(q>0?Q?.[0]??0:0))*(1-Z.share),0,1);j[1]=Y;j[13]=1e9;if(q<=0){j[3]=2;let[V]=LJ($,I8(J));j[7]=0.2126*V[0]+0.7152*V[1]+0.0722*V[2]}return j})",()=>'(function($,J){let Q=W2($,J);if($.grown===null){if(Q===null)return;$.grown=new Float32Array($.capacity*V0*4);let j=b0*4;$.data[j]=$.data.length/4,$.data[j+1]=D2,$.data[j+2]=1}let Z=J*V0*4;if(Q===null)$.grown.fill(0,Z,Z+V0*4);else $.grown.set(Q.subarray(0,V0*4),Z);$.dirty="rows",$.grownRevision+=1})',()=>'(function($,J,Q,Z=0){if($.grown===null)return!1;let j=b0*4,q=Math.fround(Math.max(J,0.001)),Y=Math.fround(Math.log(Math.max(Q/Math.max(J,0.001),1.0001))),V=Math.fround(Math.max(Z,0));if($.data[j+1]===q&&$.data[j+2]===Y&&$.data[j+3]===V)return!1;if($.data[j+1]=q,$.data[j+2]=Y,$.data[j+3]=V,$.grownRevision+=1,$.gpu!==null&&$.dirty!=="rows"&&$.gpu.rows===($.data.length+$.grown.length+($.emissive?.length??0))/4)$.gpu.device.queue.writeBuffer($.gpu.handle.resource,j*4,$.data,j,4);return!0})',()=>'(function($,J,Q,Z){let j=t0*4,q=Math.fround(Math.max(J,0.001)),Y=Math.fround(Math.log(Math.max(Q/Math.max(J,0.001),1.0001))),V=Z?1:0;if($.data[j]===q&&$.data[j+1]===Y&&$.data[j+2]===V)return!1;if($.data[j]=q,$.data[j+1]=Y,$.data[j+2]=V,$.grownRevision+=1,$.gpu!==null&&$.dirty!=="rows"&&$.gpu.rows===($.data.length+($.grown?.length??0)+($.emissive?.length??0))/4)$.gpu.device.queue.writeBuffer($.gpu.handle.resource,j*4,$.data,j,4);else $.dirty="rows";return!0})',()=>'(function($,J,Q=!0){if($.grown===null)return!1;let Z=h7*4,j=!1,q=0;for(let H=0;H<$5;H+=1){let K=Math.fround(Math.max(J[H]??0,0));if(q=Math.max(q,K),$.data[Z+H]===K)continue;$.data[Z+H]=K,j=!0}let Y=t0*4+3;if($.data[Y]!==q)$.data[Y]=q,j=!0;if(!j)return!1;if(Q)$.grownRevision+=1;let V=h7+$5/4-t0;if($.gpu!==null&&$.dirty!=="rows"&&$.gpu.rows===($.data.length+($.grown?.length??0)+($.emissive?.length??0))/4)$.gpu.device.queue.writeBuffer($.gpu.handle.resource,t0*16,$.data,t0*4,V*4);else $.dirty="rows";return!0})']},function(){return[()=>'(function($,J){let Q=!1,Z=J.grown;if(Z!==null){let V=V0*4;for(let[H,K]of $.slots){let X=J.slots.get(H);if(X===void 0)continue;let F=Z.subarray(X.slot*V,(X.slot+1)*V),G=$.grown?.subarray(K.slot*V,(K.slot+1)*V);if(G===void 0?F.every((U)=>U===0):BJ(G,F))continue;xJ($,I8(K.slot),F);Q=!0}}let j=b0*4,q=t0*4,Y=$.grown!==null&&Z!==null?[j+1,j+2,j+3,q,q+1,q+2,q+3,...IJ]:[q,q+1,q+2,q+3,...IJ];for(let V of Y){let H=J.data[V]??0;if($.data[V]===H)continue;$.data[V]=H,Q=!0}if(Q)$.dirty="rows",$.grownRevision+=1;return Q})',()=>'(function($,J,Q,Z,j){let q=$.slots.get(J);if(q?.key===Q)return q;let Y=q?.slot??B2($);let V=M2(Z,$.data,I8(Y),j);$.terms|=vJ(Z);let H={slot:Y,key:Q,mean:V,look:Z};if($.slots.set(J,H),$.layerGround.has(Y))A9($,Y);return $.dirty="rows",$.grownRevision+=1,H})',()=>"(function($,J,Q,Z){let j=`${J}\\x00cap`;if(Z===null)return v9($,J),v9($,j),null;let q=0,Y=null;if(Z.cap){let H=CJ($,j,Q,Z.cap,0);q=I8(H.slot);Y=H.mean}else v9($,j);let V=CJ($,J,Q,Z,q);return{row:I8(V.slot),mean:Y??V.mean,look:Z}})",()=>'(function($,J){if($.appearStartedMs===null){if(!$.drew)return!1;$.appearStartedMs=J}if($.appear>=1)return!1;let Q=A((J-$.appearStartedMs)/C2,0,1);if(Q!==$.appear)$.appear=Q,$.data[0]=Q,$.dirty??="head";return Q<1})',()=>"(function($,J,Q){let Z=J*f;$[Z]=Q.x;$[Z+1]=Q.y;$[Z+2]=Q.z;$[Z+3]=1;$[Z+4]=Q.from[0];$[Z+5]=Q.from[1];$[Z+6]=Q.from[2];$[Z+7]=(((Q.start)/1000%X7+X7)%X7);$[Z+8]=Q.to[0];$[Z+9]=Q.to[1];$[Z+10]=Q.to[2];$[Z+11]=0})",()=>'(function($,J){let Q=G8*4;if($.emissiveDirty=null,$.emissiveCount=J.size,!J.size){if($.emissive===null)return;$.emissive=null,$.data.fill(0,Q,Q+4),$.dirty="rows";return}let Z=S2;while(Z<J.size*2)Z*=2;let j=TJ(J,Z);while(j===null)Z*=2,j=TJ(J,Z);$.emissive=j,$.data[Q+1]=Z-1,$.data[Q+2]=1,$.dirty="rows"})',()=>'(function($,J){if(J.writer!==$){J.writer=$,J.moved.clear(),t$($,J.cells);return}for(let Q of J.moved){let Z=J.cells.get(Q);if(Z!==void 0){let v$1;E2:{let J$3=Z;{let J=J$3;let Q=$.emissive;if(Q===null){v$1=!1;break E2;}let Z=Q.length/f-1,j=N8(J.x,J.y,J.z)&Z;for(let q=0;q<F7;q+=1){let Y=j*f,V=Q[Y+3]===0;if(V||Q[Y]===J.x&&Q[Y+1]===J.y&&Q[Y+2]===J.z){if(V&&($.emissiveCount+1)*2>Z+1){v$1=!1;break E2;}if(V)$.emissiveCount+=1;{v$1=(yJ(Q,j,J),J5($,j),!0);break E2;}}j=j+1&Z}v$1=!1;}}if(v$1)continue;t$($,J.cells);break}let[j,q,Y]=Q.split(",").map(Number);O2:{let J$4=j,Q$1=q,Z$1=Y;{let J=J$4,Q=Q$1,Z=Z$1;let j=$.emissive;if(j===null)break O2;let q=j.length/f-1,Y=N8(J,Q,Z)&q,V=0;for(;V<F7;V+=1){let H=Y*f;if(j[H+3]===0)break O2;if(j[H]===J&&j[H+1]===Q&&j[H+2]===Z)break;Y=Y+1&q}if(V===F7)break O2;for(let H=Y+1&q;j[H*f+3]!==0;H=H+1&q){let K=N8(j[H*f],j[H*f+1],j[H*f+2])&q;if(Y<=H?K>Y&&K<=H:K>Y||K<=H)continue;j.copyWithin(Y*f,H*f,H*f+f),J5($,Y),Y=H}j.fill(0,Y*f,Y*f+f),J5($,Y),$.emissiveCount-=1}}}if(J.moved.clear(),$.emissiveCount===0&&$.emissive!==null)t$($,J.cells)})',()=>'(function($,J){let Q=$.data.length+($.grown?.length??0);if($.emissive!==null&&$.data[G8*4]!==Q/4)$.data[G8*4]=Q/4,$.dirty="rows";let Z=(Q+($.emissive?.length??0))/4;if($.gpu?.device!==J||$.gpu.rows!==Z){$.gpu?.handle.release();$.gpu={device:J,handle:w2($,J,Z),rows:Z};$.revision+=1;$.dirty="rows";}let j=$.gpu.handle.resource;if($.dirty==="rows"){if(J.queue.writeBuffer(j,0,$.data),$.grown)J.queue.writeBuffer(j,$.data.byteLength,$.grown);if($.emissive)J.queue.writeBuffer(j,Q*4,$.emissive)}else{if($.dirty==="head")J.queue.writeBuffer(j,0,$.data,0,4);let q=$.emissiveDirty;if(q!==null&&$.emissive)J.queue.writeBuffer(j,(Q+q[0]*f)*4,$.emissive,q[0]*f,(q[1]-q[0]+1)*f)}return $.emissiveDirty=null,$.dirty=null,j})']},function(){return[()=>'(function($,J){let Q=$.indexOf(`fn ${J}(`);if(Q<0)throw Error(`voxel growth: the surface text names no function ${J}`);let Z=0;for(let j=$.indexOf("{",Q);j>=0&&j<$.length;j+=1){let q=$[j];if(q==="{")Z+=1;else if(q==="}"){if(Z-=1,Z===0)return $.slice(Q,j+1)}}throw Error(`voxel growth: the surface text\'s function ${J} does not close`)})',()=>'((j,$,Z,q)=>function(){let Y=[j.getBindGroupLayout(r2[$],l2[$])];if(a2[$])Y.push(j.getBindGroupLayout(U5,"terrain voxel growth pass"));let V=Z.createPipelineLayout({label:q,bindGroupLayouts:Y});return{label:q,layout:V,compute:{module:Z.createShaderModule({label:q,code:o2[$]()}),entryPoint:s2[$]}}})',()=>"(()=>(`\nfn growth_wind_value(p: vec2<f32>, seed: u32) -> f32 {\n  let cell = floor(p);\n  let t = p - cell;\n  let w = t * t * (3.0 - 2.0 * t);\n  let c = bitcast<vec2<u32>>(vec2<i32>(cell));\n  let a = surf_unit(surf_hash(c.x, 0u, c.y, seed));\n  let b = surf_unit(surf_hash(c.x + 1u, 0u, c.y, seed));\n  let d = surf_unit(surf_hash(c.x, 0u, c.y + 1u, seed));\n  let e = surf_unit(surf_hash(c.x + 1u, 0u, c.y + 1u, seed));\n  return mix(mix(a, b, w.x), mix(d, e, w.x), w.y);\n}\n\nfn growth_wind_air(rootWorld: vec2<f32>, dir: vec2<f32>) -> f32 {\n  let p = rootWorld - frame.windTravel;\n  let q = vec2<f32>(dot(p, dir) / ${t2}.0, dot(p, vec2<f32>(-dir.y, dir.x)) / ${e2}.0);\n  let gust = 0.75 * growth_wind_value(q, 7919u) + 0.25 * growth_wind_value(q * 2.7 + vec2<f32>(19.0, 41.0), 104729u);\n  return min(max(frame.wind.z, 0.0), ${Jq}.0) * ${$q} * (${SJ} + ${1-SJ} * smoothstep(0.3, 0.75, gust));\n}`))",()=>"(()=>(`\n  let windFree = f32((stands >> ${j5}u) & 3u);\n  let windAlongV = ((stands >> ${j5+2}u) & 1u) == 1u;\n  let windScan = vec2<f32>(f32(growth.anchorMicro.w & 3) - 1.0, f32((growth.anchorMicro.w >> 2u) & 3) - 1.0);\n  let windSign = select(select(windScan.x, windScan.y, axis == 0u), windScan.y, windAlongV);\n  let windLive = select(select(frame.wind.x, frame.wind.y, axis == 0u), frame.wind.y, windAlongV);\n  let windUv = select(vec2<f32>(windSign, 0.0), vec2<f32>(0.0, windSign), windAlongV);\n  var windTaken = 0.0;\n  if (windPart >= 1u && windSign != 0.0 && sign(windLive) == windSign) {\n    let windCell = bitcast<vec3<u32>>(vec3<i32>(rel) + anchorCell) + vec3<u32>(0x40000000u);\n    let windReach = length(frame.wind.xy);\n    let windDir = select(vec2<f32>(0.0, -1.0), frame.wind.xy / max(windReach, 1e-4), windReach > 1e-4);\n    let windAsk = growth_wind_air(rootCentre.xz + frame.renderOrigin.xz, windDir) * 2.0 + surf_unit(surf_hash(windCell.x, windCell.y, windCell.z, 3571u)) * 0.6;\n    let windSteps = clamp(floor(windAsk) + smoothstep(${1-Qq}, 1.0, fract(windAsk)), 0.0, 2.0);\n    windTaken = min(windSteps, windFree);\n  }\n  let windOff = windUv * select(0.0, select(min(windTaken, 1.0), windTaken, windPart >= 2u), windPart >= 1u);`))",()=>"(()=>`${q5}\nstruct VsOut {\n  @builtin(position) position: vec4<f32>,\n  @location(0) worldPos: vec3<f32>,\n  @location(1) along: f32,\n  @location(2) @interpolate(flat) normal: vec3<f32>,\n  @location(3) @interpolate(flat) look: vec3<u32>,\n  @location(4) viewZ: f32,\n  @location(5) @interpolate(flat) ground: vec3<f32>,\n  @location(6) @interpolate(flat) mean: u32,\n  @location(7) @interpolate(flat) cube: f32,\n  @location(8) @interpolate(flat) drift: f32,\n  @location(9) @interpolate(flat) foot: vec3<f32>,\n  @location(10) @interpolate(flat) leave: f32,\n}\n\nconst GROWTH_FLIPS_WORD = 0x5462310u;\n\n${(Zq??=$c0I(49))}\n\n@vertex\nfn vs(@builtin(vertex_index) vertexIndex: u32, @builtin(instance_index) instanceIndex: u32) -> VsOut {\n  var out: VsOut;\n  let base = ${l7}u + instanceIndex * ${K0}u;\n  let w0 = growthRecords[base];\n  let shape = growthRecords[base + 1u];\n${jq}\n  let home = growthRecords[base + 2u];\n  let stands = growthRecords[base + 3u];\n  let lookRow = home & 0xfffffu;\n  let keep = f32(stands & ${f7.keepMask}u) / 32.0;\n  let live = (bitcast<u32>(voxelChunkCells[home >> 20u].w) & ${J7}u) == ((stands >> ${f7.epochShift}u) & ${J7}u);\n  let rel = vec3<f32>(f32(w0 & 1023u), f32((w0 >> 10u) & 1023u), f32((w0 >> 20u) & 1023u)) - vec3<f32>(512.0);\n  let dir = shape & 7u;\n  let len = f32(((shape >> 3u) & 15u) + 1u);\n  let width = f32(((shape >> 7u) & 3u) + 1u);\n  let depth = f32((w0 >> ${cJ}u) + 1u);\n  let lift = f32((shape >> 9u) & 31u);\n  let lateral = (shape >> 14u) & 7u;\n  let rule = ((shape >> 18u) & 3u) | (((shape >> 30u) & 1u) << 2u);\n  let block = ((lookRow - ${k}u) / ${n}u) * ${T0}u;\n  let shift = u32(growthTable[block].y);\n  let lookBorn = u32(growthTable[block + 1u + rule * ${t}u + ${B7.counts}u].w);\n  let cellMetres = f32(1u << shift) / ${P0}.0;\n  let anchorCell = voxelChunkCells[home >> 20u].xyz >> vec3<u32>(shift);\n  let origin = growth.anchor.xyz + vec3<f32>((anchorCell << vec3<u32>(shift)) - growth.anchorMicro.xyz) / ${P0}.0;\n\n  let axis = dir >> 1u;\n  let s = select(-1.0, 1.0, (dir & 1u) == 0u);\n  let nAxis = vec3<f32>(f32(axis == 0u), f32(axis == 1u), f32(axis == 2u));\n  let uAxis = select(vec3<f32>(1.0, 0.0, 0.0), vec3<f32>(0.0, 0.0, 1.0), axis == 0u);\n  let vAxis = select(vec3<f32>(0.0, 1.0, 0.0), vec3<f32>(0.0, 0.0, 1.0), axis == 1u);\n  let rootCentre = (rel + nAxis * 0.5 + (uAxis * width + vAxis * depth) * 0.5) * cellMetres + origin;\n  let eyeDistance = distance(rootCentre, frame.cameraPosition);\n  let chunkWord = bitcast<u32>(voxelChunkCells[home >> 20u].w);\n  let seenAge = f32((u32(growth.coverY.z) - (chunkWord >> ${V5}u)) & ${P7}u) / ${u7}.0;\n  let arrivalCell = bitcast<vec3<u32>>(anchorCell + vec3<i32>(rel));\n  let bornAge = min(growth.coverY.w / ${u7}.0, select(f32((u32(growth.coverY.z) - (lookBorn - 1u)) & ${P7}u) / ${u7}.0, 1e9, lookBorn == 0u));\n  let arrived = (chunkWord & ${v8}u) != 0u && surf_unit(surf_hash(arrivalCell.x, arrivalCell.y, arrivalCell.z, 7919u)) * ${S0/1000} < min(seenAge, bornAge);\n  var grown = 0.0;\n  if (eyeDistance < keep && arrived) {\n    let edge = surf_endAt(growth.ends[0], growth.ends[1], (rootCentre - frame.cameraPosition).xz);\n    let at = select(keep, min(keep, edge * mix(LOD_BAND_START, 1.0, surf_unit(surf_hash(arrivalCell.x, arrivalCell.y, arrivalCell.z, 4093u)))), edge > 0.0);\n    if (eyeDistance < at) {\n      grown = growth.anchor.w;\n      out.leave = 1.0 - lod_band_share(eyeDistance, at);\n    }\n  }\n${(qq??=$c0I(50))}\n\n  let aside = vec2<f32>(f32(lateral == 1u) - f32(lateral == 2u), f32(lateral == 3u) - f32(lateral == 4u));\n  let uvLo = aside + windOff;\n  let uvHi = uvLo + vec2<f32>(width, depth);\n  let facePlane = dot(rel, nAxis) + select(1.0, 0.0, s > 0.0);\n  let nA = facePlane + s * windLo * grown;\n  let nB = facePlane + s * windHi * grown;\n  let relU = dot(rel, uAxis);\n  let relV = dot(rel, vAxis);\n  let boxMin = (nAxis * min(nA, nB) + uAxis * (relU + uvLo.x) + vAxis * (relV + uvLo.y)) * cellMetres + origin;\n  let boxMax = (nAxis * max(nA, nB) + uAxis * (relU + uvHi.x) + vAxis * (relV + uvHi.y)) * cellMetres + origin;\n\n  let nearSide = frame.cameraPosition > (boxMin + boxMax) * 0.5;\n  let near = select(boxMin, boxMax, nearSide);\n  let far = select(boxMax, boxMin, nearSide);\n  let flip = (GROWTH_FLIPS_WORD >> (4u * (vertexIndex % 7u))) & 7u;\n  let worldPos = select(near, far, vec3<bool>((flip & 1u) != 0u, (flip & 2u) != 0u, (flip & 4u) != 0u));\n  let corner = vertexIndex % 7u;\n  let sides = select(vec3<f32>(-1.0), vec3<f32>(1.0), nearSide);\n  let normal = vec3<f32>(f32(corner == 4u) * sides.x, select(1.0, sides.y, corner == 6u) * f32(corner != 2u && corner != 4u), f32(corner == 2u) * sides.z);\n\n  out.worldPos = worldPos;\n  out.normal = normal;\n  out.ground = nAxis * s;\n  out.along = (dot((worldPos - origin) / cellMetres, nAxis) - facePlane) * s / max(grown, 1e-3);\n  let capRow = u32(voxelSurfaceTable[lookRow].z);\n  let rampLook = select(lookRow, capRow, dir == 2u && capRow != 0u);\n  out.look = vec3<u32>(rampLook, block + 1u + rule * ${t}u, shape);\n  let grownRegion = u32(voxelSurfaceTable[${b0}].x);\n  let grownClass = select(1u, select(2u, 0u, dir == 2u), axis == 1u);\n  out.mean = select(0u, grownRegion + ((lookRow - ${k}u) / ${n}u) * ${V0}u + grownClass * ${b7}u + 1u, grownRegion != 0u);\n  out.cube = cellMetres;\n  out.foot = rootCentre - nAxis * (s * 0.5 * cellMetres);\n  let driftHead = voxelSurfaceTable[rampLook];\n  let driftFlags = u32(driftHead.w);\n  if ((driftFlags & ${_0.drift}u) != 0u) {\n    let driftRow = voxelSurfaceTable[rampLook + ${s.drift}u];\n    let driftCell = bitcast<vec3<u32>>(anchorCell + vec3<i32>(rel)) + vec3<u32>(0x40000000u);\n    var driftFrame = driftCell;\n    if ((driftFlags & ${_0.world}u) == 0u) { if (axis == 0u) { driftFrame = driftCell.zyx; } else if (axis == 1u) { driftFrame = driftCell.xzy; } }\n    let driftValue = surf_drift(driftFrame.xy, axis, u32(driftRow.x), u32(driftHead.y) + 3u);\n    out.drift = smoothstep(driftRow.y - 0.1, driftRow.y + 0.1, driftValue) - 1.0 + smoothstep(driftRow.z - 0.1, driftRow.z + 0.1, driftValue);\n  }\n  let viewPos = frame.view * vec4<f32>(worldPos, 1.0);\n  out.viewZ = -viewPos.z;\n  let coverAt = rootCentre + frame.renderOrigin.xyz;\n  let covered = dir == 2u && decor_coverClears(growth_coverHeight(coverAt.x, coverAt.z) - (facePlane * cellMetres + origin.y + frame.renderOrigin.y), f32(((shape >> 25u) & 31u) + 1u) * cellMetres);\n  out.position = select(vec4<f32>(0.0), frame.viewProj * vec4<f32>(worldPos, 1.0), live && grown > 0.0 && !covered);\n  return out;\n}`)"]},function(){return[()=>'(function($,J,Q,Z,j,q){return J.getRenderPipeline(Q,function(){let Y=Z(),V=$.createShaderModule({label:Q,code:Y}),H=i7(J,[Y]),K=n7($,Q,[J.getBindGroupLayout(T7,"lume frame"),H,J.getBindGroupLayout(G5,"terrain voxel growth")],H);return{label:Q,layout:K,vertex:{module:V,entryPoint:"vs"},fragment:{module:V,entryPoint:"fs",targets:j()},depthStencil:c7(!0),multisample:{count:q}}},wJ(!0))})',()=>'(function($=!1){return L0(["//",C7,...$?[D8]:[],EJ($),y9,"@group(1) @binding(0) var<uniform> passLights: PassLights;",jQ,k0,YQ,qQ(),`@fragment\nfn fs(in: VsOut) -> ${OJ($)} {\n${VQ}\n  lume_surfacePoint = in.worldPos;\n  return ${$?"lume_surfaceStillMotion(lume_surfaceRead(N, rgb, roughness, metalness, 1.0, emissive, vec4<f32>(in.foot - in.worldPos, -lume_surfaceAxisWord(in.ground))), in.worldPos)":"lume_surfaceRead(N, rgb, roughness, metalness, 1.0, emissive, vec4<f32>(in.foot - in.worldPos, -lume_surfaceAxisWord(in.ground)))"};\n}`],`\n`)})',()=>'(function($){if(!m0($))return null;let J=$.clump,Q=Array.isArray(J)?[C0(J[0],16,1,6),C0(J[1],16,1,6),C0(J[2],16,1,6)]:[C0(J,16,1,6),C0(J,16,1,6),C0(J,16,1,6)],Z=$.height,j=Math.round(T(Array.isArray(Z)?Z[0]:Z,1,1,16)),q=Math.round(T(Array.isArray(Z)?Z[1]:Z,j,j,16)),Y=Array.isArray($.ramp)?$.ramp:[];let v$2;{let $$3=$.on;{let $=$$3;let J=0;for(let Q of Array.isArray($)?$:[$])J|=typeof Q==="string"?Fq[Q]??0:0;v$2=J===0?a.top:J;}}return{faces:v$2,clumpShift:Q,cover:T($.cover,0.5,0,1),density:T($.density,0.3,0,1),heightMin:j,heightMax:q,width:Math.round(T($.width,1,1,4)),step:T($.step,0,0,1),head:Math.round(T($.head,0,0,4)),shade:T($.shade,0,-1,1),rampRoot:T(Y[0],0.2,0,1),rampTip:T(Y[1],0.9,0,1),tones:KQ($.tones,u9),headTones:KQ($.headTones,Y5)}})',()=>'(function($){let J=`${$.clumpShift.join(",")}/${$.cover}/${$.density}/${$.shade}/${$.heightMin}/${$.heightMax}/${$.head}/${$.width}`,Q=XQ.get(J);if(Q)return Q;let Z=RQ($.cover,$.clumpShift),j=B5.get($.clumpShift.join(","))??new Float64Array(0),q=$.density*A(1-$.shade,0,2),Y=0,V=0,H=0,K=0,X=new Float64Array(H$);for(let G=0;G<j.length;G+=Pq){K+=1;let U=A(((j[G]??0)-Z)/Math.max(1-Z,0.001),0,1);if(U<=0)continue;let N=Math.min(q*(0.35+0.65*Math.sqrt(U)),1);Y+=N,V+=1-(1-N)**($.width*$.width);for(let P of P5){let z=A($.heightMin+Math.floor(($.heightMax-$.heightMin+0.999)*U**0.6*(0.4+0.6*P)),1,H$);H+=N/P5.length*(z+$.head),X[z-1]=(X[z-1]??0)+N/P5.length}}if(Y>0)for(let G=0;G<X.length;G+=1)X[G]=(X[G]??0)/Y;let F={grows:K>0?Y/K:0,covers:K>0?V/K:0,height:Y>0?H/Y:0,tall:X};return XQ.set(J,F),F})',()=>"(function($,J,Q){let Z=[0,0,0];for(let j of T8){let q;if($.tones.length>0)q=$.tones[Math.min(Math.floor(Math.min(j,0.999)*$.tones.length),$.tones.length-1)]?.rgb;else{let Y=$.rampRoot+($.rampTip-$.rampRoot)*j,V=j>=1?J.face.top:J.face.side;q=J.tones[A(Math.round(J.clamp[0]+(J.clamp[1]-J.clamp[0])*Y+V),J.clamp[0],J.clamp[1])]?.rgb}for(let Y=0;Y<3;Y+=1)Z[Y]=(Z[Y]??0)+(q?.[Y]??0)/T8.length}if($.head>0&&$.headTones.length>0&&Q>0){let j=A($.head/Q,0,1);for(let q=0;q<3;q+=1){let Y=0;for(let V of $.headTones)Y+=(V.rgb[q]??0)/$.headTones.length;Z[q]=(Z[q]??0)*(1-j)+Y*j}}return Z})",()=>"(function($,J,Q,Z,j){let q=[0,0,0];if(Q>=Z-j&&$.headTones.length>0){for(let V of $.headTones)for(let H=0;H<3;H+=1)q[H]=(q[H]??0)+(V.rgb[H]??0)/$.headTones.length;return q}let Y=(Q+0.5)/Z;for(let V of FQ){let H;if($.tones.length>0)H=$.tones[Math.min(Math.floor(A(Y+V,0,0.999)*$.tones.length),$.tones.length-1)]?.rgb;else{let K=A($.rampRoot+($.rampTip-$.rampRoot)*Y+V,0,1);H=J.tones[A(Math.round(J.clamp[0]+(J.clamp[1]-J.clamp[0])*K+J.face.side),J.clamp[0],J.clamp[1])]?.rgb}for(let K=0;K<3;K+=1)q[K]=(q[K]??0)+(H?.[K]??0)/FQ.length}return q})"]},function(){return[()=>"(function($,J,Q){let Z=[0,0,0],j=0,q=0,Y=0,V=0;for(let K=$.side.length-1;K>=0;K-=1){let X=$.side[K]??0;if(X<=0)continue;let F=J>0?Math.exp(-J*Y)-Math.exp(-J*(Y+X)):X;Y+=X,V+=F,j+=F*A((K+0.5)*Q/c9,0,1),q+=F*(K+0.5);for(let G=0;G<3;G+=1)Z[G]=(Z[G]??0)+($.rgb[K*3+G]??0)*F}let H=1/Math.max(V,0.000000000001);return{rgb:[(Z[0]??0)*H,(Z[1]??0)*H,(Z[2]??0)*H],lean:j*H,height:q*H}})",()=>"(function($,J,Q,Z,j){let v$3;{let Z=H$+zq,j=new Float64Array(Z),q=new Float64Array(Z*3),Y=1;for(let V of $){if((V.faces&Q)===0)continue;let H=LQ(V),K=Y*H.grows;Y*=1-H.grows;for(let X=1;X<=H$;X+=1){let F=K*(H.tall[X-1]??0)*V.width;if(F<=0)continue;let G=X+V.head;for(let U=0;U<G;U+=1){let N=Iq(V,J,U,G,V.head);j[U]=(j[U]??0)+F;for(let P=0;P<3;P+=1)q[U*3+P]=(q[U*3+P]??0)+(N[P]??0)*F}}}for(let V=0;V<Z;V+=1)for(let H=0;H<3;H+=1)q[V*3+H]=(q[V*3+H]??0)/Math.max(j[V]??0,0.000000000001);v$3={side:j,rgb:q};}let q=v$3;let Y=M5(q,Tq,Z);let V=M5(q,UQ,Z);let H=0;let K=0;for(let F=0;F<3;F+=1){let G=(Y.rgb[F]??0)-(j[F]??0);H+=G*G,K+=G*((V.rgb[F]??0)-(j[F]??0))}let X=H>0.00000001?K/H:0;if(!(H>0.00000001)){let F=M5(q,0,Z),G=Y.height-F.height;X=G>0.000001?(V.height-F.height)/G:0.5}return{rgb:Y.rgb,lean:Y.lean,side:-Math.log(1-A(X,0.01,0.99))/UQ}})",()=>"(function($,J,Q){let Z=new Float32Array(V0*4),j=[a.top,a.side,a.under],q=2**J.cellShift/y;for(let Y=0;Y<3;Y+=1){let V=Y===0&&J.cap?J.cap:J,H=1,K=1,X=0,F=0,G=0,U=[0,0,0];for(let C of $){if((C.faces&(j[Y]??0))===0)continue;let I=LQ(C),D=H*I.grows;H*=1-I.grows,K*=1-I.covers;let M=D*C.width*I.height;X+=M;F+=M*d9(I.height*q);G+=M*I.height*q;let v=Mq(C,V,I.height);for(let L=0;L<3;L+=1)U[L]=(U[L]??0)+(v[L]??0)*M}if(X<=0)continue;let N=Q[Y]??[0,0,0],P=Y*b7*4;Z[P]=A(1-K,0,1),Z[P+1]=X,Z[P+2]=A(F/X,0,1),Z[P+4]=(U[0]??0)/X,Z[P+5]=(U[1]??0)/X,Z[P+6]=(U[2]??0)/X,Z[P+7]=(N[0]??0)*z5[0]+(N[1]??0)*z5[1]+(N[2]??0)*z5[2];let z=Bq($,V,j[Y]??0,q,[Z[P+4]??0,Z[P+5]??0,Z[P+6]??0]);Z[P+8]=z.rgb[0]??0,Z[P+9]=z.rgb[1]??0,Z[P+10]=z.rgb[2]??0,Z[P+11]=z.side,Z[P+12]=A(z.lean,0,1),Z[P+13]=G/X}return Z})",()=>"(function(){return{ready:!1,on:!1,scan:-1,confirmed:!1,ratio:Aq,chunks:new Map,next:new Map,staged:[],bumps:[],owed:!1,final:!1,compact:!1,asks:0,appends:0,added:0,live:0,compacted:-1,perChunk:0,unread:[],seen:0,eye:[NaN,0,0],dirty:!1,cells:null,mirror:null,anchor:[0,0,0],stagedWhole:!1,liveRead:-1,appendRecrowned:0,appendCounted:0,noted:new Map,gone:[],rewrites:new Set}})",()=>"(function($){let J=$.standing;J.on=!1,J.ready=!1,J.confirmed=!1,J.owed=!1,J.chunks.clear(),J.next.clear(),J.staged.length=0,J.bumps.length=0,J.unread.length=0,J.noted.clear(),J.gone.length=0,J.rewrites.clear()})",()=>"(function($,J,Q,Z=a7){let j=Math.abs($)+Math.abs(J);if(!(Q>0)||!(j>0.0001))return a7;let q=Math.round(Math.abs($)/j*8)/8,Y=q>0?Math.sign($):0,V=q<1?Math.sign(J):0,H=1+q*8+16*(Y+1)+64*(V+1);return H===Z.key?Z:{share:q,x:Y,z:V,key:H}})",()=>'(function(){let $=new ArrayBuffer(X5);let J=new Uint32Array(QZ);let Q=new ArrayBuffer(t9);let Z={data:new Float32Array(0),slots:0,keys:new Map,said:new Map,bladesTop:!1,tableDirty:!1,revision:0,gpu:null,scanned:{revision:-1,anchor:[0,0,0],eye:[0,0,0],near:0,far:0,widest:0,end:0,ends:new Float32Array(h0),pixel:0,boundEpoch:-1,air:a7},air:a7,pending:new Map,seen:{clock:0,steps:0,until:-1/0,born:-1/0,drawing:!1,looks:new Map,asked:new Set},why:"",cellMetres:1,coarsest:0,standing:wq(),writtenOwed:!1,asked:!1,appends:0,appendMost:0,eye:[0,0,0],scanOwed:!1,sealed:!1,anchor:[0,0,0],near:0,far:0,widest:0,pixel:0,end:0,ends:new Float32Array(h0),glide:0,glides:new Float32Array(h0),walks:!1,wanted:new Float32Array(h0),scannedAt:-1/0,nearHolds:Array.from({length:h0},F$),quadCapacity:0,listCapacity:EQ+O5,scanUniformData:$,scanInts:new Int32Array($,0,4),scanFloats:new Float32Array($,16,8),scanCaps:new Uint32Array($,48,4),scanBound:new Float32Array($,64,4),scanEnds:new Float32Array($,80,h0),scanRoom:new Float32Array($,112,4),drawUniformData:Q,drawFloats:new Float32Array(Q,0,4),drawInts:new Int32Array(Q,16,4),drawCover:new Float32Array(Q,32,8),drawWords:new Float32Array(Q),drawUniformSent:new Float32Array(t9/4).fill(NaN),census:null,scans:0,ranges:J,rangeFloats:new Float32Array(J.buffer),rangesBoxed:!1,rangesWhole:!1,count:{get triangles(){return Z.census===null?null:Z.census.drawn*6*(Z.windDraw?Z$:1)}},memo:null,windDraw:!1,windBlows:!1,windAsked:null};return Z})']},function(){return[()=>"(function($,J,Q,Z,j,q){let Y=$.standing;if(Y.on){Y.chunks.delete(J);Y.rewrites.delete(J);Y.noted.set(J,Y.seen+1);cq(Y,J,Q,Z,j,q);Y.dirty=!0;return !1;}let V=$.scanned.eye;let H=$.scanned;let K=Q-V[0];let X=Z-V[1];let F=j-V[2];let G=_Q(H.far,H.widest,H.end,H.ends,K,F,q+q7)+q7+q;if(K*K+X*X+F*F>G*G)return!1;let N=2*q/Math.sqrt(3)/$.cellMetres;return $.pending.set(J,Math.ceil(0.7*N*N)),!0})",()=>"(function($){if(h($.table),h($.list),h($.records),h($.standing),h($.retired),h($.scanUniform),h($.passWords),h($.drawUniform),h($.index),h($.ranges),h($.coverPlaceholder),!$.readbackBusy)h($.readback)})",()=>'(function($,J,Q,Z){let j=$.gpu,q=$.data.length/4;if(j?.device===J&&!j.mark.lost&&j.recordCapacity===Q&&j.listCapacity===Z&&j.tableRows===q)return j;if(j?.device===J&&!j.mark.lost){if(j.tableRows!==q)h(j.table),j.table=r(J,{label:"terrain voxel growth table",size:$.data.byteLength,usage:128|8},j.mark),j.tableRows=q,$.tableDirty=!0;if(j.listCapacity!==Z)h(j.list),j.list=r(J,{label:"terrain voxel growth list",size:(o9+Z*z7)*4,usage:128|8},j.mark),j.listCapacity=Z;if(j.recordCapacity!==Q){if($.sealed&&j.standing===null)j.standing=j.records;else h(j.records);j.records=PQ($,J,Q,j.mark);j.recordCapacity=Q;j.recordRoom=D5(Q)}return $.scanOwed=!0,$.why="planes",$.memo=null,j}if(j)$Z(j);let Y=oJ(Z$);let V={lost:!1};let H=r(J,{label:"terrain voxel growth box indices",size:Math.ceil(Y.length*2/4)*4,usage:16|8},V);J.queue.writeBuffer(H,0,new Uint16Array(Y));let K=w8(J,{label:"terrain voxel growth cover placeholder",size:{width:1,height:1,depthOrArrayLayers:vQ},format:"depth16unorm",usage:4},V),X=K.createView({label:"terrain voxel growth cover placeholder",dimension:"2d-array"}),F=r(J,{label:"terrain voxel growth pass words",size:W5.byteLength,usage:64|8},V);J.queue.writeBuffer(F,0,W5);let G={device:J,mark:V,table:r(J,{label:"terrain voxel growth table",size:$.data.byteLength,usage:128|8},V),tableRows:q,list:r(J,{label:"terrain voxel growth list",size:(o9+Z*z7)*4,usage:128|8},V),listCapacity:Z,records:PQ($,J,Q,V,!1),recordCapacity:Q,recordRoom:D5(Q),standing:null,retired:null,scanUniform:r(J,{label:"terrain voxel growth scan uniform",size:X5,usage:64|8},V),drawUniform:r(J,{label:"terrain voxel growth draw uniform",size:t9,usage:64|8},V),index:H,ranges:r(J,{label:"terrain voxel growth scan ranges",size:QZ*4,usage:128|8},V),readback:r(J,{label:"terrain voxel growth readback",size:l7*4,usage:1|8},V),readbackBusy:!1,res:_8(oq,1),binds:g8(aq),passes:k8(YY),boundEpoch:-1,scanGroup:null,emitGroup:null,passWords:F,passGroups:!1,drawGroup:null,drawCover:X,coverPlaceholder:K,coverPlaceholderView:X};return $.windDraw=!1,$.gpu=G,$.tableDirty=!0,$.sealed=!1,$.scanOwed=!0,$.why="planes",$.memo=null,$.drawUniformSent.fill(NaN),G})',()=>"(function($,J,Q,Z,j,q){let{device:Y,pipelines:V}=J,H=q!==null&&q.device===Y&&q.serial>0&&q.texels>0;$.drawCover=H?q.view:$.coverPlaceholderView;let K=$.res.buffers;K[x5]=$.scanUniform,K[A5]=Q.quadWords,K[R5]=Q.quadChunkRefs,K[L5]=Q.chunkParams,K[y5]=Q.palette,K[j$]=Z,K[q$]=$.table,K[S5]=$.list,K[mQ]=$.ranges,K[fQ]=$.records,K[pQ]=$.passWords,K[uQ]=$.drawUniform,K[cQ]=j,$.res.views[dQ]=$.drawCover;let X=d0($.binds,iQ,$.res,Y,V),F=d0($.binds,Z7,$.res,Y,V);if(X!==$.scanGroup||F!==$.emitGroup)$.boundEpoch=++VY;$.scanGroup=X,$.emitGroup=F;for(let G of sq)d0($.binds,G,$.res,Y,V);$.passGroups=!0;K[k5]=JZ($);$.drawGroup=d0($.binds,eQ,$.res,Y,V);return H?q:null})"]},function(){return[()=>"(function($,J){let Q=$.ranges;ZZ(Q);$.rangesWhole=$.scanOwed;$.rangesBoxed=!1;let Z=J.buffers.chunkQuadRangesData;if(!$.scanOwed){for(let K of $.pending.keys())K$(Q,Z[K*2]??0,Z[K*2+1]??0),h5($,J,K);return}let j=J.buffers.chunkPosesData,q=$.eye,Y=$.standing,V=Y.stagedWhole,H=V?$8:q7;if(V)Y.next.clear();for(let K of J.chunkSlots.values()){let X=K.chunkSlot*W7;let F=Math.abs(j[X+b8]??0);let G=j[X+v7]??0;let U=K.origin[0]+G-q[0];let N=K.origin[1]+G-q[1];let P=K.origin[2]+G-q[2];let C=(V?h8($.far,$.widest,$.end):_Q($.far,$.widest,$.end,$.ends,U,P,F+H))+H+F;if(U*U+N*N+P*P>C*C)continue;if(K$(Q,K.quadRange.start,K.quadCount),h5($,J,K.chunkSlot),V)Y.next.set(K.chunkSlot,f5($,q[0]+U,q[1]+N,q[2]+P,F,q,$.anchor,K.quadCount<=0))}})",()=>"(function($,J,Q,Z,j,q,Y,V){let H=q[0]??0;let K=q[1]??0;let X=q[2]??0;let F=J-H;let G=Z-X;let U=y;let N=(Y[0]??0)/U;let P=(Y[1]??0)/U;let z=(Y[2]??0)/U;let C=$.near*$.cellMetres;let I=$.end>0?$.end:1/0;let D=Math.min(I,C)+$8-0.5;let M=V||p(F,Q-K,G)+j<=D;let v=m5($);let L=P$($);let c=(O,d,i)=>O-j-i>=d-v&&O+j+i<=d+v;let R=(O,d)=>O+j>=d-v&&O-j<=d+v;let _=0;if(V||c(J,N,L)&&c(Q,P,L)&&c(Z,z,L))_=2;else if(R(J,N)&&R(Q,P)&&R(Z,z))_=1;return{x:H,y:K,z:X,cover:D,end:I,whole:M,claims:_,ax:N,ay:P,az:z,seen:$.standing.seen,wrote:$.standing.seen}})",()=>"(function($,J,Q,Z,j,q,Y,V,H,K,X){let F=j-$,G=q-J,U=Y-Q,N=p(F,G,U);if(N>=Z+V)return-1;let P=p($-H,J-K,Q-X),z=p(j-H,q-K,Y-X);if(N<=Math.abs(Z-V))return Z<=V?P+Z:z+V;let C=-1;if(P>0.000000001){let i=Z/P;if(p($+($-H)*i-j,J+(J-K)*i-q,Q+(Q-X)*i-Y)<=V)C=P+Z}if(z>0.000000001){let i=V/z;if(p(j+(j-H)*i-$,q+(q-K)*i-J,Y+(Y-X)*i-Q)<=Z)C=Math.max(C,z+V)}let I=(N*N+Z*Z-V*V)/(2*N),D=Math.sqrt(Math.max(Z*Z-I*I,0)),M=$+F/N*I,v=J+G/N*I,L=Q+U/N*I,c=H-M,R=K-v,_=X-L,O=(c*F+R*G+_*U)/N,d=Math.sqrt(Math.max(c*c+R*R+_*_-O*O,0));return Math.max(C,i0(O,d+D))})",()=>"(function($,J,Q,Z,j,q,Y,V){if(J.whole&&J.claims===2)return!1;let H=Y[0]??0,K=Y[1]??0,X=Y[2]??0,F=Q-H,G=j-X,U=($.end>0?Math.min(G$($.ends,F,G,q),V):V)+q7;if(p(F,Z-K,G)-q>=U)return!1;if(!J.whole&&PY($,J,Y,Q,Z,j,q,V)&&UY(Q,Z,j,q,H,K,X,U,J.x,J.y,J.z)>J.cover)return!0;if(J.claims===2)return!1;let N=m5($)-P$($);let P=N-Rq;let z=J.claims===1;let C=[[Q,H,J.ax],[Z,K,J.ay],[j,X,J.az]];for(let[I,D,M]of C){let v=Math.max(I-q,D-U,D-P),L=Math.min(I+q,D+U,D+P);if(v>L)return!1;if(v<M-N||L>M+N)z=!1}return!z})",()=>"(function($,J,Q,Z,j,q,Y,V,H,K){let X=V-j,F=H-q,G=K-Y,U=p(X,F,G);if(U<=0)return 0;let N=A((($-j)*X+(J-q)*F+(Q-Y)*G)/(U*U),0,1),P=Math.max(p($-j-X*N,J-q-F*N,Q-Y-G*N)-Z,0),z=U/Math.sqrt(P*P+U*U/4);return Math.min(U,p($-j,J-q,Q-Y)-p($-V,J-H,Q-K)+Z*z)})",()=>"(function($,J,Q,Z){let j=$.standing;if(j.owed||j.mirror===null||!MY($,Z))return;let{far:q,widest:Y,end:V,ends:H}=$,K=h8(q,Y,0),X=h8(q,Y,V)+$8+Wq,F=$.ranges;ZZ(F);$.rangesWhole=!1;$.rangesBoxed=!1;let G=j.staged;G.length=0,j.bumps.length=0,l.length=0,F0.length=0,B0.length=0;let U=0;for(let z of Q.chunkSlots.values()){if(IY($,J,Q,z,Z,K,X)===YZ)U+=1;}for(let[z,C]of j.chunks)if(C.seen!==j.seen)j.chunks.delete(z);for(let z=0;z+y8<=j.gone.length;z+=y8)B0.push(j.gone[z+1]??0,j.gone[z+2]??0,j.gone[z+3]??0,j.gone[z+4]??0,1/0);j.gone.length=0;let N=F0.length;j.appendRecrowned=B0.length>0?CY($,Q,Z):0;U+=(F0.length-N)/4;B0.length=0;$.scanned.ends.set(H);if(G.length===0)return;E5($,J,j.anchor,Z,$.near,q,V,jZ($),$.scanned.air,!1,!0);j.appendCounted=U>0?TY($):0;l.length=0;F0.length=0;j.final=U>0;j.asks=Math.ceil(G.length*j.perChunk);j.compact=WY($,J);let P=OQ(F[1]??0);if(P>J.listCapacity)$.listCapacity=P;j.owed=!0})"]},function(){return[()=>"(function($,J){let Q=$.standing,Z=p(J[0]-Q.eye[0],J[1]-Q.eye[1],J[2]-Q.eye[2]);if(!Q.dirty&&Z<q7&&!HZ($.scanned.ends,$.ends))return!1;Q.dirty=!1,Q.seen+=1;let j=yQ;for(let q=0;q<3;q+=1)Q.eye[q]=J[q]??0,Q.anchor[q]=Math.floor((J[q]??0)*y/j)*j;return!0})",()=>"(function($,J,Q,Z,j,q,Y){let V=$.standing,H=Q.buffers.chunkPosesData,K=Z.chunkSlot,X=K*W7,F=Math.abs(H[X+b8]??0),G=H[X+v7]??0,U=Z.origin[0]+G,N=Z.origin[1]+G,P=Z.origin[2]+G,z=U-j[0],C=N-j[1],I=P-j[2],D=z*z+C*C+I*I,M=V.chunks.get(K);if(M!==void 0)M.seen=V.seen;let v=V.rewrites.delete(K)&&M!==void 0,L=Y+F;if(D>L*L){if(M!==void 0)Y$(V,J.device,K),V.chunks.delete(K);return 0}if(Z.quadCount<=0){if(v)Y$(V,J.device,K);if(M===void 0||v)V.chunks.set(K,f5($,U,N,P,F,j,V.anchor,!0));return V.noted.delete(K),0}let c=$8,R=!1;if(M===void 0||v||GY($,M,U,N,P,F,j,q)){let d=h8($.far,$.widest,$.end)+c+F;R=D<=d*d}if(!R){if(v)Y$(V,J.device,K),V.chunks.delete(K);return l.push(K,Z.quadRange.start,Z.quadCount,U,N,P,F),0}let _=VZ($,Q,K,Z.quadRange.start,Z.quadCount,U,N,P,F,j,M!==void 0),O=V.noted.get(K);if(_&&O!==void 0)V.noted.delete(K),B0.push(U,N,P,F,O);return _?YZ:0})",()=>"(function($,J,Q,Z,j,q,Y,V,H,K,X){let F=$.standing,G=f5($,q,Y,V,H,K,F.anchor,!1);if(F.staged.push({...G,slot:Q}),X)F.bumps.push(Q);let U=G.claims>0;if(K$($.ranges,Z,j,U?0:G7.unclaimed),h5($,J,Q),U)F0.push(q,Y,V,H);return U})",()=>"(function($,J,Q){let Z=$.standing;let j=P$($);let q=0;for(let Y=0;Y+X$<=l.length;Y+=X$){let V=l[Y]??0,H=Z.chunks.get(V);if(H===void 0)continue;let K=l[Y+3]??0,X=l[Y+4]??0,F=l[Y+5]??0,G=l[Y+6]??0,U=!1;for(let P=0;P+MQ<=B0.length&&!U;P+=MQ){if((B0[P+4]??0)<=H.wrote)continue;let z=G+j+(B0[P+3]??0);U=((B0[P]??0)-K)**2+((B0[P+1]??0)-X)**2+((B0[P+2]??0)-F)**2<=z*z}if(!U)continue;let N=l[Y+2]??0;l[Y+2]=-1,VZ($,J,V,l[Y+1]??0,N,K,X,F,G,Q,!0),q+=1}return q})",()=>"(function($){let J=m5($);let Q=P$($);let Z=y;let j=$.standing.anchor.map((F)=>F/Z);let q=qZ;q.length=0;let Y=0;for(let F=0;F<F0.length;F+=4)q.push(F),Y=Math.max(Y,F0[F+3]??0);q.sort((F,G)=>(F0[F]??0)-(F0[G]??0));let{ranges:V,rangeFloats:H}=$,K=p5,X=0;for(let F=0;F+X$<=l.length;F+=X$){if((l[F+2]??0)<0||!BY(F,Q,Y)||!DY(j,J))continue;let G=V[0]??0;if(K$(V,l[F+1]??0,l[F+2]??0,G7.counted),(V[0]??0)===G)continue;let U=r7+(N7+2*G)*u0;for(let N=0;N<3;N+=1)H[U+N]=K[N]??0,H[U+u0+N]=K[3+N]??0;X+=1}return $.rangesBoxed=X>0,X})",()=>"(function($,J,Q){let Z=qZ,j=p5,q=l[$+3]??0,Y=l[$+4]??0,V=l[$+5]??0,H=(l[$+6]??0)+J,K=0,X=Z.length;while(K<X){let G=K+X>>1;if((F0[Z[G]??0]??0)<q-H-Q)K=G+1;else X=G}j.fill(1/0,0,3),j.fill(-1/0,3,6);let F=!1;for(let G=K;G<Z.length;G+=1){let U=Z[G]??0,N=F0[U]??0;if(N>q+H+Q)break;let P=F0[U+1]??0,z=F0[U+2]??0,C=F0[U+3]??0,I=H+C;if((N-q)**2+(P-Y)**2+(z-V)**2>I*I)continue;F=!0;let D=C+J;j[0]=Math.min(j[0]??0,N-D),j[1]=Math.min(j[1]??0,P-D),j[2]=Math.min(j[2]??0,z-D),j[3]=Math.max(j[3]??0,N+D),j[4]=Math.max(j[4]??0,P+D),j[5]=Math.max(j[5]??0,z+D)}return F})",()=>"(function($,J){let Q=$.standing;if(Q.appends>=xq)return!0;let Z=$.census;if(Z===null||Z.scans<Q.compacted)return!1;let j=Z.asked+Q.asks;for(let[q,Y]of Q.unread)if(q>Z.scans)j+=Y;return j>hQ*J.recordRoom||Q.added>vq*Math.max(Q.live,1)})"]},function(){return[()=>'(function($,J,Q,Z,j){let q=$.standing;if(Q.whole&&j>0)q.perChunk=Math.max(16,2*Q.asked/j);while(q.unread.length>0&&(q.unread[0]?.[0]??0)<=Q.scans)q.unread.shift();if(!q.on){q.ready=Q.whole&&Q.share>=1&&$.end>0&&Q.counted*q.ratio<=SQ*J.recordRoom;return}if(Q.scans<q.scan)return;if(!q.confirmed){if(Z!==1){q.ratio*=1.5,b5($),$.scanOwed=!0,$.why="standing";return}q.confirmed=!0}if(Q.scans>=q.compacted&&q.liveRead<q.compacted){if(q.liveRead=q.compacted,q.live=Q.asked,Q.asked>hQ*J.recordRoom)$.scanOwed=!0,$.why="room"}})',()=>"(function($,J,Q,Z){let j=$.nearHolds,q=Q!==void 0&&AQ(j,J,Z,$.wanted,$.scanned.ends),Y=0,V=0,H=!1;for(let K=0;K<h0;K+=1){let X=j[K],F=q&&X?Math.max($.wanted[K]??0,X.from,T5):0,G=q&&X?Math.max(X.glide,T5):0;if($.ends[K]=F,$.glides[K]=G,Y=Math.max(Y,F),V=Math.max(V,G),q&&X&&(X.end!==X.target||X.glide!==X.end))H=!0}if($.end=Y,$.glide=V,$.walks=H,H)D0(1)})",()=>"(function($,J,Q,Z){let j=$.scanned,q=yQ,Y=$.standing;if($.writtenOwed)E5($,J,j.anchor,j.eye,j.near,j.far,j.end,j.ends,j.air,!0,!1);if($.scanOwed){Y.owed=!1,Y.stagedWhole=(Y.on||Y.ready)&&$.end>0;for(let V=0;V<3;V+=1)$.eye[V]=Q[V]??0,$.anchor[V]=Math.floor((Q[V]??0)*y/q)*q;E5($,J,$.anchor,$.eye,$.near,$.far,$.end,Y.stagedWhole?jZ($):$.ends,$.air,!1,Y.stagedWhole)}else if(Y.on&&Z){zY($,J,Z,Q);}if(Z&&($.scanOwed||$.writtenOwed)){SY($,J,Z)}})",()=>'(function($,J,Q){let Z=$.scanned;if($.standing.on){{let Q=$.scanned;if($.end<=0)b5($),$.scanOwed=!0,$.why="reach";else if(Q.revision!==$.revision)$.why="rule";else if(Q.near!==$.near||Q.far!==$.far||Q.widest!==$.widest||Q.pixel!==$.pixel)$.why="reach";else if(Q.boundEpoch!==J.boundEpoch)$.why="planes";else if(Q.air.key!==$.air.key)$.why="wind";else if(!$.scanOwed)$.why="";if($.why!=="")$.scanOwed=!0;$.writtenOwed=!1}return}let j=p(Q[0]-Z.eye[0],Q[1]-Z.eye[1],Q[2]-Z.eye[2]);if(Z.revision!==$.revision)$.why="rule";else if(Z.near!==$.near||Z.far!==$.far||Z.widest!==$.widest||Z.pixel!==$.pixel||EY($,j))$.why="reach";else if(Z.boundEpoch!==J.boundEpoch)$.why="planes";else if(Z.air.key!==$.air.key)$.why="wind";else if(j>q7)$.why="eye";else if(!$.scanOwed)$.why="";if($.why!=="")$.scanOwed=!0;if(!$.scanOwed&&$.pending.size>0){let q=$.census,Y=0;for(let K of $.pending.values())Y+=K;let V=Math.max($.appendMost,Y),H=q===null?0:J.recordCapacity-q.asked-($.scans-q.scans)*V;if($.appends>=dq||H<V)$.scanOwed=!0,$.why="room"}$.writtenOwed=!$.scanOwed&&$.pending.size>0})',()=>"(function($,J,Q,Z,j,q,Y,V,H,K,X){let{scanInts:F,scanFloats:G,scanCaps:U}=$,N=y;for(let I=0;I<3;I+=1)F[I]=Q[I]??0,G[I]=(Z[I]??0)-(Q[I]??0)/N;F[3]=H.share<0?-1:Math.round(H.share*8)+16*((H.x<0?1:0)+(H.z<0?2:0)+(H.x===0?4:0)+(H.z===0?8:0));G[3]=X?$8:q7;G[4]=j;G[5]=q;G[6]=Y;$.scanEnds.set(V);G[7]=dJ(J.recordCapacity);U[0]=J.listCapacity;U[1]=J.recordRoom;U[2]=(K?A8.written:0)|(X?A8.standing:0);U[3]=O5;let P=$.scanRoom,z=Math.floor(SQ*J.recordRoom);P[0]=X?z:Math.floor(Math.fround(Math.fround(J.recordCapacity)*Math.fround(0.85))),P[1]=X?J.recordRoom:J.recordCapacity,P[2]=X?z:0,P[3]=0;let C=$.census;$.scanBound[0]=C===null?1:Math.min(1,C.share+($.scans-C.scans+2)*p7)})",()=>"(function($,J,Q){rq=!0,WQ();let Z=TQ(Q)&&!DQ();$.windBlows=Z,$.windAsked=null;let j=Z;if(j===$.windDraw)return;$.windDraw=j;$.memo=null;C5[0]=_5(j);J.device.queue.writeBuffer(J.records,0,C5);if(J.standing)J.device.queue.writeBuffer(J.standing,0,C5)})"]},function(){return[()=>"(function($,J){let{drawWords:Q,drawUniformSent:Z}=$,j=!0;for(let q=0;q<Q.length;q+=1)if(!Object.is(Q[q],Z[q]))j=!1;if(j)return;Z.set(Q),J.device.queue.writeBuffer(J.drawUniform,0,$.drawUniformData)})",()=>'(function($,J,Q){let Z=$.gpu;if(!Z||J.unread===!0||$.keys.size===0||Z.scanGroup===null||Z.emitGroup===null||!Z.passGroups)return!1;let{scanOwed:j,standing:q}=$,Y=!j&&q.owed;if(!j&&!$.writtenOwed&&!Y)return!1;if(hY($,Z,j))return!1;let V=Y?"append":"written";if(j)V=$.why;let H=Y&&q.compact,K=J.device,X=E8(S8,L8,0,null,K,J.pipelines),F=E8(S8,c0,0,null,K,J.pipelines);if(!X||!F)return!1;K.queue.writeBuffer(Z.list,0,nq);if(j){o7[0]=_5($.windDraw);K.queue.writeBuffer(Z.records,0,o7,0,l9);K.queue.writeBuffer(Z.records,(l9+1)*4,o7,l9+1);}if(H)K.queue.writeBuffer(Z.records,H5.kept*4,lq);K.queue.writeBuffer(Z.scanUniform,0,$.scanUniformData);let G=$.ranges;K.queue.writeBuffer(Z.ranges,0,G,0,r7+(G[0]??0)*u0);let U=r7+N7*u0;if($.rangesBoxed)K.queue.writeBuffer(Z.ranges,U*4,G,U,(G[0]??0)*2*u0);let N=Z.passes;if(Y){mY($,Z,H);}if(j||Y&&q.final)V$(Math.ceil(r9*Z.recordCapacity/K5),Q0,a9),m(N,$Y,Q0[0],Q0[1],Q0[2]);V$(Math.max(G[1]??0,1),Q0,L9),m(N,JY,Q0[0],Q0[1],Q0[2]);let P=xQ(Z.listCapacity);if(m(N,QY,P,1,1),j)m(N,ZY,1,1,1);m(N,jY,P,1,1);m(N,qY,1,1,1);J.graph.addCompute("terrain/voxel-growth",m8(N,S8,0,Z.binds,Z.res,J.frameBindGroup,K,J.pipelines));if(j){kY($,Z,J,Q);}else if(Y){pY($,Z,Q,H);}else $.appends+=1;$.writtenOwed=!1;$.scans+=1;if(!Z.readbackBusy){uY($,Z,J,j,Y,V);}return!0})',()=>'(function($,J,Q,Z){let j=$.scanned;if(j.eye[0]=$.eye[0],j.eye[1]=$.eye[1],j.eye[2]=$.eye[2],j.revision=$.revision,j.anchor[0]=$.anchor[0],j.anchor[1]=$.anchor[1],j.anchor[2]=$.anchor[2],j.near=$.near,j.far=$.far,j.widest=$.widest,j.end=$.end,j.ends.set($.ends),$.scannedAt=W0(),j.pixel=$.pixel,j.air=$.air,j.boundEpoch=J.boundEpoch,$.scanOwed=!1,$.sealed=!0,$.appends=0,$.why="",J.standing)h(J.retired),J.retired=J.standing,J.standing=null,J.res.buffers[k5]=J.records,J.drawGroup=d0(J.binds,eQ,J.res,Q.device,Q.pipelines);let q=y,Y=$.drawFloats,V=$.drawInts;for(let H=0;H<3;H+=1)Y[H]=($.anchor[H]??0)/q-(Z[H]??0),V[H]=$.anchor[H]??0;V[3]=bQ($.air);u5($,J);fY:{let J=$.standing;if(!J.stagedWhole){if(J.on)b5($);break fY;}let Q=J.next;J.next=J.chunks,J.chunks=Q,J.next.clear(),J.on=!0,J.ready=!1,J.confirmed=!1,J.scan=$.scans+1,J.compacted=$.scans+1,J.appends=0,J.added=0,J.unread.length=0,J.noted.clear(),J.gone.length=0,J.dirty=!1,J.eye[0]=$.eye[0]??0,J.eye[1]=$.eye[1]??0,J.eye[2]=$.eye[2]??0}})',()=>"(function($,J,Q,Z){let j=$.standing;for(let V of j.staged)j.chunks.set(V.slot,V);if(j.staged.length=0,j.appends=Z?1:j.appends+1,j.added=Z?j.asks:j.added+j.asks,Z)j.compacted=$.scans+1;j.unread.push([$.scans+1,j.asks]),j.owed=!1;let q=$.scanned,Y=y;for(let V=0;V<3;V+=1)q.anchor[V]=j.anchor[V]??0,q.eye[V]=j.eye[V]??0,$.drawFloats[V]=(j.anchor[V]??0)/Y-(Q[V]??0),$.drawInts[V]=j.anchor[V]??0;u5($,J)})",()=>'(function($,J,Q,Z,j,q){let Y=$.standing;J.readbackBusy=!0;let V=$.scans,H=Z?$.ranges[0]??0:0;Q.graph.addBufferReadback({src:J.records,dst:J.readback,size:l7*4}).then(function(){let K=new Uint32Array(J.readback.getMappedRange().slice(0)),X=new Float32Array(K.buffer,36,1)[0]??1;if(J.readback.unmap(),J.readbackBusy=!1,$.gpu!==J){h(J.readback);return}let F=$.census,G=K[5]??0;if(!Z&&!j&&F!==null&&G>F.asked)$.appendMost=Math.max($.appendMost,G-F.asked);let U={drawn:K[1]??0,asked:G,listed:K[6]??0,counted:K[7]??0,cut:K[8]??0,share:X,scans:V,whole:Z,why:q};if($.census=U,!Z&&G>(Y.on?J.recordRoom:J.recordCapacity))$.scanOwed=!0,$.why="room";vY($,J,U,K[H5.standing]??0,H)},function(){if(J.readbackBusy=!1,$.gpu!==J)h(J.readback)})})']},function(){return[()=>'(function($,J,Q,Z=J.lightOnce===!0){let j=$.gpu;if(!j||!$.sealed||$.keys.size===0||j.drawGroup===null)return $.seen.drawing=!1,null;let q=dY(J,Z);if(!q)return $.seen.drawing=!1,null;if(!$.seen.drawing){nY($);N$("growth",J.motionVectors===!0);}let Y=$.memo;let V=JZ(j);if(Y?.pipeline===q&&Y.frameBindGroup===J.frameBindGroup&&Y.passBindGroup===Q&&Y.drawGroup===j.drawGroup&&Y.records===V)return Y.command;let H={pipeline:q,bindGroups:[J.frameBindGroup,Q,j.drawGroup],indexBuffer:{buffer:j.index,format:"uint16"},draw:{indirect:V,offset:0,count:$.count}};return $.memo={pipeline:q,frameBindGroup:J.frameBindGroup,passBindGroup:Q,drawGroup:j.drawGroup,records:V,command:H},H})',()=>"(($)=>`const N: i32 = ${$};\nconst NM: i32 = N - 1;\nconst CELL: f32 = ${U0};\nconst DC: f32 = ${E};\nconst FOOT: i32 = ${u};\nconst Y_BIAS: f32 = ${tY}.0;\nconst Y_STEPS: f32 = ${eY}.0;\nconst NO_TOP: f32 = -1e30;\nfn bl_tex(local: vec2i) -> i32 {\n  let c = (local + blades.win.xz) & vec2i(NM);\n  return c.y * N + c.x;\n}`)",()=>'(function($){return[...$].map(function(J,Q){if(J==="u")return{binding:Q,visibility:4,buffer:{type:"uniform"}};if(J==="r")return{binding:Q,visibility:4,buffer:{type:"read-only-storage"}};if(J==="w")return{binding:Q,visibility:4,buffer:{type:"storage"}};return UZ(Q,4,"rgba32uint","2d")})})',()=>"(($)=>`\n@compute @workgroup_size(64)\nfn main(@builtin(workgroup_id) wg: vec3u, @builtin(local_invocation_index) lane: u32) {\n  let g = vec3u(wg.x * 8u + (lane & 7u), wg.y * 8u + (lane >> 3u), wg.z);\n  switch (bp.id) {\n${$}\n    default: {}\n  }\n}`)",()=>"(($)=>`\nconst SPAN: i32 = ${Z0};\nconst SPAN0: i32 = ${$/2-112};\nconst WIND_MASKS: u32 = ${Z0/8*(Z0/8)*2}u;\nconst WIND_CELLS: u32 = ${Z0/8*(Z0/8)*2+Z0*Z0*16}u;\nconst WIND_SQ: u32 = ${Z0/8*(Z0/8)*2+Z0*Z0*18}u;\nconst LAWN_CELL: u32 = 0x10000u;\nconst RING_M: i32 = ${e5};\nfn bl_windSquare() -> vec2i {\n  return clamp(vec2i(floor(blades.eye.xz)) - vec2i(RING_M), vec2i(SPAN0 / 8), vec2i(SPAN0 / 8 + SPAN / 8 - 2 * RING_M - 1));\n}\nconst LAWN_FULL: f32 = ${4*E};\nconst LAWN_TOP: f32 = ${6*E};\nfn bl_carry(lean: vec2f, l: i32) -> vec2i {\n  let u = min((f32(l) + 0.5) * (DC / 0.4), 1.0);\n  return vec2i(round(lean * (u * u / DC)));\n}\nfn bl_levels(a: i32, b: i32) -> u32 {\n  let lo = max(a, 0);\n  let hi = min(b, 31);\n  if (lo > hi) { return 0u; }\n  return (0xffffffffu >> u32(31 - hi)) & (0xffffffffu << u32(lo));\n}`)",()=>"(()=>(`\nfn bl_rayOf(px: vec2f) -> vec3f {\n  let uv = px / blades.walk.zw;\n  let near = frame.inverseViewProj * vec4f(uv.x * 2.0 - 1.0, 1.0 - uv.y * 2.0, 1.0, 1.0);\n  return normalize(near.xyz / near.w - frame.cameraPosition);\n}\nstruct BladesPoint {\n  P: vec3f,\n  groundY: f32,\n  N: vec3f,\n  rgb: vec3f,\n  roughness: f32,\n  metalness: f32,\n  emissive: vec3f,\n}\nfn bl_mergePoint(frag: vec4f) -> BladesPoint {\n  let rf = max(blades.toWin.w, 1.0);\n  let size = vec2i(blades.walk.xy);\n  let rp = min(vec2i(frag.xy / rf), size - vec2i(1));\n  let e = textureLoad(bladeHit, rp, 0);\n  let t = bitcast<f32>(e.z);\n  if (t >= 1e29) {\n    discard;\n  }\n  let face = e.y & 7u;\n  var n = vec3f(0.0, 1.0, 0.0);\n  if (face == 1u) {\n    n = vec3f(0.0, -1.0, 0.0);\n  } else if (face >= 2u) {\n    let sg = select(-1.0, 1.0, (face & 1u) == 0u);\n    n = select(vec3f(0.0, 0.0, sg), vec3f(sg, 0.0, 0.0), face < 4u);\n  }\n  let rd = bl_rayOf(frag.xy);\n  let met = frame.cameraPosition + bl_rayOf((vec2f(rp) + vec2f(0.5)) * rf) * t;\n  let facing = dot(rd, n);\n  var tp = t;\n  if (facing < -0.02) {\n    tp = clamp(dot(met - frame.cameraPosition, n) / facing, t * 0.5, t * 2.0);\n  }\n  let P = frame.cameraPosition + rd * tp;\n  let groundY = bitcast<f32>(e.w);\n  let rise = clamp((P.y - groundY) / 0.3, 0.0, 1.0);\n  let toSun = passLights.sunDirection;\n  var N = normalize(vec3f(toSun.x * 0.25 * rise, 1.0, toSun.z * 0.25 * rise));\n  if (((e.y >> 19u) & 1u) != 0u) {\n    let cubePx = ${E} / max(t * blades.air.w, 1e-6);\n    N = normalize(mix(N, n, 0.33 * smoothstep(1.0, 3.0, cubePx)));\n  }\n  let rgb = vec3f(f32(e.x & 1023u), f32((e.x >> 10u) & 1023u), f32((e.x >> 20u) & 1023u)) / 1023.0;\n  let roughness = f32((e.y >> 3u) & 255u) / 255.0;\n  let metalness = f32((e.y >> 11u) & 15u) / 15.0;\n  let glow = f32((e.y >> 15u) & 15u) / 15.0;\n  let emissive = rgb * (glow * glow * ${Y0}.0);\n  return BladesPoint(P, groundY, N, rgb, roughness, metalness, emissive);\n}`))"]},function(){return[()=>'(function($=!1,J=1){let Q=J!==1,Z=$?"lume_motionVector(at, frame.prevViewProj * vec4f(P, 1.0))":null;return L0(["//",C7,...$?[D8]:[],TZ,...Q?[MZ]:[],y9,"@group(1) @binding(0) var<uniform> passLights: PassLights;",...dZ,(cZ??=$c0I(98)),`struct BladesOut {\n${Q?`  @location(0) albedo: vec4f,\n  @location(1) words: vec4u,\n  @location(2) emissive: vec2u,\n  @location(3) read: vec2u,${$?`\n  @location(${zZ}) motion: vec4f,`:""}`:IZ($)}\n  @builtin(frag_depth) depth: f32,\n}\n@fragment\nfn fs(@builtin(position) frag: vec4f) -> BladesOut {\n  let b = bl_mergePoint(frag);\n  let P = b.P;\n  lume_surfacePoint = P;\n  let surface = lume_surfaceRead(b.N, b.rgb, b.roughness, b.metalness, 1.0, b.emissive, vec4f(0.0, b.groundY - P.y, 0.0, -3.0));\n  let at = frame.viewProj * vec4f(P, 1.0);\n${Q?`  let ms = lume_surfaceMs(surface);\n  return BladesOut(ms.albedo, ms.words, ms.emissive, ms.read, ${Z===null?"":`vec4f(${Z}, 0.0, 1.0), `}clamp(at.z / at.w, 0.0, 1.0));`:`  return BladesOut(${CZ("surface",Z)}, clamp(at.z / at.w, 0.0, 1.0));`}\n}`],`\n`)})',()=>'(function($=y0(),J=!1){let Q=S9("pbr",$),Z=`${$.wgslDefs}\n${Q.defs}`.includes("fn lighting_cellRead(")?`  lighting_cellRead(vec3f(P.x, b.groundY, P.z), vec3f(0.0, 1.0, 0.0));\n`:"",j=Q.litColor({N:"b.N",geometryNormal:"b.N",V:"V",P:"P",albedo:"b.rgb",roughness:"b.roughness",metalness:"b.metalness",emissive:"b.emissive",toonSteps:"4.0",transmission:"0.0"});return L0(["//",C7,...J?[D8]:[],$.wgslDefs,Q.defs,...dZ,(cZ??=$c0I(98)),`struct BladesLitOut {\n  @location(0) color: vec4f,\n${J?`  @location(1) motion: vec4f,\n`:""}  @builtin(frag_depth) depth: f32,\n}\nstruct BladesLitIn {\n  @builtin(position) position: vec4f,\n}\n@fragment\nfn fs(in: BladesLitIn) -> BladesLitOut {\n  let b = bl_mergePoint(in.position);\n  let P = b.P;\n  let V = ${w0("frame.cameraPosition - P")};\n${Z}  var litColor = ${j};\n  litColor += b.emissive;\n  let viewZ = -(frame.view * vec4f(P, 1.0)).z;\n  litColor = shade_applyFog(litColor, viewZ, P - frame.cameraPosition);\n  let at = frame.viewProj * vec4f(P, 1.0);\n  return BladesLitOut(vec4f(litColor, 1.0), ${J?"vec4f(lume_motionVector(at, frame.prevViewProj * vec4f(P, 1.0)), 0.0, 1.0), ":""}clamp(at.z / at.w, 0.0, 1.0));\n}`],`\n`)})',()=>'(function($,J,Q,Z,j){let q=G4[$],Y=$===Z8&&J===d8,V=`terrain/blades/${q}/${Q}${Y?"/wind":""}`;return j.getComputePipeline(V,function(){let H=j.getBindGroupLayout(N4[$],`terrain blades ${q}`),K=j.getBindGroupLayout(T7,"lume frame"),X=Z.createPipelineLayout({label:V,bindGroupLayouts:[K,H]});return{label:V,layout:X,compute:{module:Z.createShaderModule({label:V,code:$===Z8?uZ(Q,Y):P4[$](Q,NZ(Z))}),entryPoint:"main"}}})})',()=>"(function($,J,Q){let Z=$.colors,j=Z!==void 0&&Z!==null&&Z.length>=(J+1)*4,q=j?(Z[J*4]??1)*Q[0]:Q[0],Y=j?(Z[J*4+1]??1)*Q[1]:Q[1],V=j?(Z[J*4+2]??1)*Q[2]:Q[2];if(n8[0]!==q||n8[1]!==Y||n8[2]!==V)n8=[q,Y,V];return n8})",()=>"(function($){let J={x0:1/0,x1:-1/0,z0:1/0,z1:-1/0,y1:0};for(let Q of $.keys()){J.x0=Math.min(J.x0,Y6(Q));J.x1=Math.max(J.x1,Y6(Q));J.z0=Math.min(J.z0,V6(Q));J.z1=Math.max(J.z1,V6(Q));J.y1=Math.max(J.y1,q1(Q));}return J})"]},function(){return[()=>"(function($){let J=T4($);let Q=J.x1-J.x0+1;let Z=J.z1-J.z0+1;let j=J.y1+1;if(Q>n5||Z>n5)return null;let q=[],Y=new Map,V=new Uint8Array(Q*Z*j),H=[0,0,0];for(let[K,X]of $){let F=(j6(X[0])*1024+j6(X[1]))*1024+j6(X[2]);let G=Y.get(F);if(G===void 0){if(G=Math.min(q.length,254),q.length<255)q.push([X[0],X[1],X[2]]);Y.set(F,G)}V[(q1(K)*Z+V6(K)-J.z0)*Q+Y6(K)-J.x0]=G+1;for(let U=0;U<3;U+=1)H[U]=(H[U]??0)+(X[U]??0)/$.size}return{w:Q,d:Z,h:j,x0:J.x0,z0:J.z0,grid:V,palette:q,mean:H}})",()=>"(function($,J,Q,Z,j,q){let Y=[j%J,Math.floor(j/J),j%J,Math.floor(j/J)],V=[j];$[j]=q;for(let H=V.pop();H!==void 0;H=V.pop()){let K=H%J,X=Math.floor(H/J);Y[0]=Math.min(Y[0],K),Y[1]=Math.min(Y[1],X),Y[2]=Math.max(Y[2],K),Y[3]=Math.max(Y[3],X);for(let F=0;F<q6.length;F+=2){let G=K+(q6[F]??0),U=X+(q6[F+1]??0);if(G<0||U<0||G>=J||U>=Q||$[U*J+G]!==-1||!Z(G,U))continue;$[U*J+G]=q,V.push(U*J+G)}}return Y})",()=>"(function($,J,Q,Z,j){let q=(U)=>$.grid[(U*$.d+Q)*$.w+J]??0,Y=0;while(Y<$.h&&q(Y)!==0)Y+=1;let V=Y;while(V<$.h&&q(V)===0)V+=1;let H=0;while(V+H<$.h&&H<4&&q(V+H)!==0)H+=1;let K=0,X=0;for(let U=0;U<$.h;U+=1){if(q(U)===0)continue;K+=1,X=U+1}let F=Math.min(3,Math.max(0,Math.ceil(Math.log2(j)))),G=H>0&&V<M$?V+1:0;return{word:Math.min(Y,M$)|G<<6|Math.max(H,1)-1<<12|F<<14|Z%63<<16,cubes:K,lean:K*d9(X*E)}})",()=>"(function($,J){if($.indices.length<3)return null;let Q={cells:new Map,capped:new Set,px:aZ($.positions,0),pz:aZ($.positions,2)};for(let F=0;F+2<$.indices.length;F+=3){C4(Q,$,F,J);}let Z=Q.cells.size>0?B4(Q.cells):null;if(Z===null)return null;let j=function(F,G){for(let U=0;U<Z.h;U+=1)if((Z.grid[(U*Z.d+G)*Z.w+F]??0)!==0)return!0;return!1};let {part:q,boxes:Y}=W4(Z.w,Z.d,j);let V=new Uint32Array(Z.w*Z.d);let H=0;let K=0;let X=0;for(let F=0;F<Z.w*Z.d;F+=1){let G=q[F]??-1,U=Y[G];if(U===void 0)continue;let N=v4(Z,F%Z.w,Math.floor(F/Z.w),G,Math.max(U[2]-U[0]+1,U[3]-U[1]+1));V[F]=N.word,H+=1,K+=N.cubes,X+=N.lean}return{w:Z.w,d:Z.d,h:Z.h,ox:-Z.x0,oz:-Z.z0,cols:V,grid:Z.grid,palette:Z.palette,topColumns:H,sideCubes:K,sideLean:X,mean:Z.mean}})",()=>'(function($,J){let Q=$.color??"",Z=sZ.get(J);if(Z?.has(Q)===!0)return Z.get(Q)??null;if(Z===void 0)sZ.set(J,Z=new Map);let j=`${J1(J).word}|${Q}`;if(i8.has(j)){let V=i8.get(j)??null;return Z.set(Q,V),V}let q=`stamp:${Q}`;if(Q1(J))return Z1(J,q),null;let Y=x4(J,M4($.color));if(i8.size>=z4)W9(i8);return i8.set(j,Y),Z.set(Q,Y),j1(J,q),Y})',()=>'(function($,J,Q,Z){let j={weight:0,reach:0,turns:!1,top:0,cubes:0,lean:0,mean:[0,0,0]},q=J.scriptedGeometry;Q.items.forEach(function(Y,V){if($.items[Z+V]=[0,j.weight,0,0,0,0,0,0],Y.kind!=="scripted"||q===null)return;let H=q[$1(Y)];let K=H?A4(Y,H):null;let X=Math.max(M0(Y.weight,1),0);if(K===null||X<=0)return;let F;{let J=K;let Q=$.registry.stamps.get(J);if(Q===void 0)Q=$.registry.stampCount,$.registry.stampCount+=1,$.registry.stamps.set(J,Q);F=($.stamps[Q]=J,Q);}j.weight+=X,j.reach=Math.max(j.reach,K.ox,K.w-K.ox,K.oz,K.d-K.oz),j.turns||=Y.randomRotation===!0;let G=M0(Y.wind?.force);$.windForce=Math.max($.windForce,G),$.items[Z+V]=[F,j.weight,M0(Y.colorJitter?.hue),M0(Y.colorJitter?.value),Math.round(Math.max(M0(Y.sink,0.1),0)*K.h),G,0,0],j.top+=X*K.topColumns,j.cubes+=X*K.sideCubes,j.lean+=X*K.sideLean;for(let U=0;U<3;U+=1)j.mean[U]=(j.mean[U]??0)+X*K.sideCubes*(K.mean[U]??0)});return j})']},function(){return[()=>"(function($,J){let Q=j0.head,Z=Q+J*o.look,j=Z+$.layers.length*o.layer,q=j+$.items.length*o.item,Y=q+$.stamps.length*o.stamp,V=Y+$.stamps.reduce((X,F)=>X+F.cols.length,0),H=V+$.stamps.reduce((X,F)=>X+Math.ceil(F.grid.length/4),0),K=H+$.stamps.reduce((X,F)=>X+F.palette.length,0)*o.palette;return{looksAt:Q,layersAt:Z,itemsAt:j,stampsAt:q,colsAt:Y,gridAt:V,paletteAt:H,total:K}})",()=>"(function($,J,Q,Z){let j=0,q=0,Y=0;Q.stamps.forEach(function(V,H){$.set([V.w,V.d,V.h,j,q,Y,V.ox&65535|(V.oz&65535)<<16,0],Z.stampsAt+H*o.stamp),$.set(V.cols,Z.colsAt+j),j+=V.cols.length,new Uint8Array($.buffer,(Z.gridAt+q)*4,Math.ceil(V.grid.length/4)*4).set(V.grid),q+=Math.ceil(V.grid.length/4),V.palette.forEach(function(K,X){let F=Z.paletteAt+(Y+X)*o.palette;J.set(K,F),$[F+3]=255}),Y+=V.palette.length})})",()=>"(function($,J){let Q=h4($,J);let Z=new Uint32Array(Math.max(Q.total,j0.head+4));let j=new Float32Array(Z.buffer);Z.set([Q.looksAt,Q.layersAt,Q.itemsAt,Q.stampsAt,Q.colsAt,Q.gridAt,Q.paletteAt,J],0);$.looks.forEach((q,Y)=>Z.set(q,Q.looksAt+Y*o.look));$.layers.forEach(function(q,Y){let V=Q.layersAt+Y*o.layer;j.set(q.slice(0,4),V),Z.set(q.slice(4,9),V+4)});$.items.forEach(function(q,Y){let V=Q.itemsAt+Y*o.item;Z[V]=q[0]??0,j.set(q.slice(1,4),V+1),Z[V+4]=q[4]??0,j[V+5]=q[5]??0});E4(Z,j,$,Q);return Z})",()=>'(function($,J,Q,Z){let j=(Z?.bindings?.[Q.materialKey]??[]).slice(0,r5),q=j.length>0?Y1($.registry,`${J.placeId}\\x00${Q.materialKey}\\x00${j.join(",")}`,j.length,"layers"):0,Y=null;j.forEach(function(V,H){let K=Z?.layers?.[V];$.layers[q+H]=[0,0,0,0,0,0,0,0,0,0,0,0];let X=K?y4($,J,V,K,q+H):null;if(X!==null){let v$4;S4:{let $=Y,J=X;if($===null){v$4=J;break S4;}let Q=$.depth+J.depth,Z=[0,0,0];for(let j=0;j<3;j+=1)Z[j]=(($.mean[j]??0)*$.depth+(J.mean[j]??0)*J.depth)/Math.max(Q,0.000001);v$4={share:1-(1-$.share)*(1-J.share),depth:Q,mean:Z,lean:($.lean*$.depth+J.lean*J.depth)/Math.max(Q,0.000001)};}Y=v$4}});$.looks[Q.lookSlot+1]=[Q.grows?Q.lookSlot*T0+1:0,q,j.length,k+Q.lookSlot*n];return Y})',()=>"(function($,J=B$()){let Q={looks:[],layers:[],items:[],stamps:[],registry:J,windForce:0},Z=new Map,j=0,q=0,Y=1;for(let V of $){let K=V.decorations!==null&&V.decorations.settings?.enabled!==!1?V.decorations:null;if(K!==null)j=Math.max(j,M0(K.settings?.maxDistance,200)),q=Math.max(q,M0(K.settings?.fadeDistance,40));for(let X of V.looks){Y=Math.max(Y,X.lookSlot+2);let F=b4(Q,V,X,K);if(F!==null)Z.set(X.lookSlot,F)}}return{words:O4(Q,Y),lookCount:Y,layerGround:Z,maxDistance:j,fadeDistance:q,windForce:Q.windForce,stamps:Q.stamps.filter(Boolean).length,layers:Q.layers.filter((V)=>(V[0]??0)>0).length}})",()=>"(function($,J,Q,Z,j,q,Y){let V=y1;return V.records=J,V.origin=Q,V.groundHeight=Z,V.win=j,V.span=q*U0,V.out=Y,V.most=Math.min(u8,Y.length>>2),V.count=0,$.forEach(f4),V.records=null,V.out=null,V.groundHeight=M6,V.count})",()=>"(function($,J,Q,Z,j){let q=Z===null?null:D1(Z);let Y=Z===null||q===null||q.size===0?null:I1(Z);let V=J.feetWords;let H=q===null||Y===null||$.win===null||Q.unread===!0?0:p4(q,Y,P1(Q),j,$.win,J.n,V);let K=H;for(let U=0;U<H*4;U++)K+=V[U]*(U+1);if(K===$.feetKey)return;$.feetKey=K,$.feetMovedS=Q.timeSeconds,$.pressHeld=Math.max(Math.fround(Q.timeSeconds),Math.fround(0.001));let X=J.feetLeft,F=$.win===null?0:($.feetLeftWin[0]-$.win[0])*U0,G=$.win===null?0:($.feetLeftWin[1]-$.win[1])*U0;for(let U=0;U<$.feetLeftCount;U++){let N=(H+U)*4;V[N]=X[U*4]+F,V[N+1]=X[U*4+1]+G,V[N+2]=X[U*4+2],V[N+3]=1+H}if($.feetCount=H,$.pressOwed=H+$.feetLeftCount,$.pressOwed>0)J.device.queue.writeBuffer(J.feet,0,V,0,$.pressOwed*4)})"]},function(){return[()=>"(function($){let J=$.gpu;if(J){for(let Q of[J.uniform,J.phase,J.ground,J.colsA,J.colsB,J.owners,J.keptTop,J.keptInfo,J.maxima,J.wind,J.footJobs,J.feet,J.quadJobs,J.book,J.growth])h(Q);if(h(J.hit),J.look!==null)P6(J.look);J.look=null;for(let Q of J.views.values())P6(Q);J.views.clear()}$.gpu=null,$.win=null,$.dirty.clear(),$.chunkFoot.clear(),$.footChunks.clear(),$.book=null,$.bookPlaces=null,$.registry=B$(),$.logOpened=!1,$.bornMs=null})",()=>'(function($,J,Q){let Z=$.gpu;if(Z?.device===J&&Z.n===Q&&!Z.mark.lost)return Z;if(Z)d1($);let j=Q*Q;let q={lost:!1};let Y=(K,X)=>r(J,{label:`terrain blades ${K}`,size:Math.max(16,X),usage:128|8},q);let V=new Uint32Array(X6*4);let H={device:J,n:Q,uniform:r(J,{label:"terrain blades uniform",size:p8,usage:64|8},q),phase:KV(J,q),ground:Y("ground",j*4),colsA:Y("columns",j*32),colsB:Y("owners of columns",j*64),owners:Y("plants",j*8),keptTop:Y("kept tops",j*4),keptInfo:Y("kept",j*16),maxima:r(J,{label:"terrain blades maxima",size:Math.ceil(t5(Q)/4)*16,usage:128|64|8},q),wind:Y("wind",gZ*4),footJobs:Y("footprints",K6*16),quadJobs:Y("quad ranges",X6*16),feet:Y("feet",u8*32),feetWords:new Float32Array(u8*8),feetLeft:new Float32Array(u8*4),footWords:new Int32Array(K6*4),quadWords:V,quadFloats:new Float32Array(V.buffer),book:Y("book",64),bookWords:16,growth:Y("growth",16),growthRows:1,hit:null,hitView:null,hitSize:[0,0],mark:q,res:_8(k1,m1),binds:g8(p1),passes:k8(c1),merge:null,look:null,views:new Map};return $.gpu=H,$.win=null,$.feetKey=NaN,$.feetLeftCount=0,$.keepOwed=4,$.bookPlaces=null,$.growthRevision=-1,H})',()=>'(function($,J){let Q=new Uint32Array(l5*I$/4);for(let j=0;j<l5;j+=1){let q=j*I$/4;Q[q]=j,Q.set(o5,q+1)}let Z=r($,{label:"terrain blades phases",size:Q.byteLength,usage:64|8},J);return $.queue.writeBuffer(Z,0,Q),Z})',()=>"(function($,J,Q,Z,j,q){if(Z||j===null||!($>j)||!(q>0))return 0;let Y=-(J[2]??0),V=-(J[10]??0),H=i0(Y,V);if(!(H>0.000001))return 0;let K=((Q[9]??0)-1)/Math.max(Math.abs(Q[5]??1),0.000001),X=(J[5]??0)*K-(J[6]??0);if(!(X<0))return q;let F=($-j)/-X,G=(((J[1]??0)*K-(J[2]??0))*Y+((J[9]??0)*K-(J[10]??0))*V)/H*F;return G>0?Math.min(G,q):0})",()=>"(function($,J,Q,Z){let j=W0(),q=$.ahead;if(!t7($.aheadAt)||!t7(q))$.ahead=Z;else{let F=Z-q,G=Math.max(B1,Math.abs(F)/U$)*Math.max(j-$.aheadAt,0)/1000;$.ahead=Math.abs(F)<=G?Z:q+Math.sign(F)*G}$.aheadAt=j;let Y=$.centre;if(Y[0]=Q[0],Y[1]=Q[2],!($.ahead>0))return Y;let V=J.camera.view,H=-(V[2]??0),K=-(V[10]??0),X=i0(H,K);if(X>0.000001)Y[0]+=H/X*$.ahead,Y[1]+=K/X*$.ahead;return Y})",()=>"(function($,J,Q,Z,j,q,Y=0,V={rf:0,whole:0,reach:0,far:0,end:0,walkEnd:0,walkPixel:0}){let H=Math.round(J>0?J/Math.max($,0.000000001):1),K=Math.min(4,Math.max(1,H,Math.ceil(Math.sqrt(Y/GV)))),X=$*K,F=Math.max(0.5,Math.min(Q>0?Q:200,j,q>0?q:j)),G=E/(n9*X),U=Math.min(G,F);return V.rf=K,V.whole=Math.max(0.25,Math.min(E/(i9*X),U*0.75,Z>0?Math.max(F-Z,0.25):U)),V.reach=U,V.far=G,V.end=F,V.walkEnd=G*8,V.walkPixel=X,V})",()=>'(function($,J){let Q=x1(J,"blades"),Z=J.buckets.get("opaque"),j=J.finestCellSizeM;if(!$.logOpened||Q.all){if($.logOpened=!0,$.chunkFoot.clear(),$.footChunks.clear(),Z)for(let q of Z.chunkSlots.keys())X1($,Z,j,q);if($.win)r1($,$.win)}else for(let q=0;q<Q.chunks.length;q+=1)X1($,Z,j,Q.chunks[q]);Q.chunks.length=0,Q.all=!1})']},function(){return[()=>"(function($,J,Q,Z){let j=$.chunkFoot.get(Z);if(j!==void 0)for(let U=0;U<j.length;U+=1)$.dirty.add(j[U]),$.footChunks.get(j[U])?.delete(Z);$.chunkFoot.delete(Z);let q=J?.chunkSlots.get(Z);if(!q||!J)return;let Y=q.chunkSlot*4;if(Math.abs((J.buffers.chunkParamsData[Y]??0)-Q)>0.000001)return;let V=Math.max((J.buffers.chunkPosesData[q.chunkSlot*W7+v7]??0)*2,0.001),H=Math.floor((q.origin[0]+0.001)/Y7),K=Math.floor((q.origin[2]+0.001)/Y7),X=Math.floor((q.origin[0]+V-0.001)/Y7),F=Math.floor((q.origin[2]+V-0.001)/Y7),G=[];for(let U=K;U<=F;U+=1){for(let N=H;N<=X;N+=1){let P=v6(N,U);G.push(P);let z=$.footChunks.get(P);if(!z)$.footChunks.set(P,z=new Set);z.add(Z),$.dirty.add(P)}}$.chunkFoot.set(Z,G)})",()=>'(function($,J,Q,Z,j){let q=Q.growth,Y=q?.keys.size??0,V=!1;if(j!==$.bookPlaces||Y!==$.bookGrowth){$.bookPlaces=j,$.bookGrowth=Y;let H=V1(Z,$.registry);if($.book=H,H.words.length>J.bookWords)h(J.book),J.book=r(J.device,{label:"terrain blades book",size:H.words.byteLength,usage:128|8},J.mark),J.bookWords=H.words.length;J.device.queue.writeBuffer(J.book,0,H.words);let K=Q.surface;if(K){for(let X of $.layerSlots)if(!H.layerGround.has(X))Q5(K,k+X*n,null);for(let[X,F]of H.layerGround)Q5(K,k+X*n,F);$.layerSlots=new Set(H.layerGround.keys())}V=!0}if(q&&q.revision!==$.growthRevision){$.growthRevision=q.revision;let H=q.data.length/4;if(H>J.growthRows)h(J.growth),J.growth=r(J.device,{label:"terrain blades growth",size:Math.max(16,q.data.byteLength),usage:128|8},J.mark),J.growthRows=H;if(q.data.byteLength>0)J.device.queue.writeBuffer(J.growth,0,q.data);V=!0}return V})',()=>'(function($,J,Q,Z,j){let q=$.win;if(q===null)return;if($.dirty.size===0){$.footCount=0,$.quadCount=0;return}let Y=Q.n/u,V=q[0]/u,H=q[1]/u,K=MV;K.length=0;for(let z of $.dirty){let C=S$(z);let I=h$(z);if(C<V||I<H||C>=V+Y||I>=H+Y)$.dirty.delete(z);else K.push(z)}q8[0]=Z,q8[1]=j,K.sort(IV);let X=$.ready?Math.min(K.length,K6):0,{footWords:F,quadWords:G,quadFloats:U}=Q,N=0,P=J.buckets.get("opaque");for(let z=0;z<X;z+=1){let C=K[z];$.dirty.delete(C);F[z*4]=S$(C)*u;F[z*4+1]=h$(C)*u;let I=$.footChunks.get(C);if(I===void 0)continue;for(let D of I){let M=P?.chunkSlots.get(D);if(M===void 0||M.quadCount<=0||N>=X6)continue;G[N*4]=M.quadRange.start,G[N*4+1]=M.quadCount,U[N*4+2]=J.finestCellSizeM,N+=1}}if(K.length=0,$.footCount=X,$.quadCount=N,X>0)Q.device.queue.writeBuffer(Q.footJobs,0,F,0,X*4);if(N>0)Q.device.queue.writeBuffer(Q.quadJobs,0,G,0,N*4)})',()=>"(function($,J,Q,Z){let j=J/u/2,q=(Q-j)*u,Y=(Z-j)*u,V=$.win;if(V!==null&&V[0]===q&&V[1]===Y)return;let H=J/u,K=V===null?0:V[0]/u,X=V===null?0:V[1]/u;if(V===null)$.win=[q,Y];else V[0]=q,V[1]=Y;for(let F=0;F<H;F+=1){for(let G=0;G<H;G+=1){let U=q/u+G,N=Y/u+F;if(V===null||U<K||U>=K+H||N<X||N>=X+H){$.dirty.add(v6(U,N))}}}})",()=>'(function($,J,Q){if($.hit!==null&&$.hitSize[0]===J&&$.hitSize[1]===Q)return;let Z=Math.max(1,J),j=Math.max(1,Q);if($.hit!==null&&$.hitView!==null){let V={hit:$.hit,hitView:$.hitView};U1.release($.device,F1,Math.max(1,$.hitSize[0]),Math.max(1,$.hitSize[1]),V,[{destroy:()=>h(V.hit)}])}let q=U1.takeBack($.device,F1,Z,j),Y=q?.hit??w8($.device,{label:"terrain blades hit",size:{width:Z,height:j},format:"rgba32uint",usage:8|4|1},$.mark);$.hit=Y,$.hitView=q?.hitView??Y.createView({label:"terrain blades hit"}),$.hitSize=[J,Q]})']},function(){return[()=>"(function($,J,Q,Z){let j=J.frameUniforms;if(j===void 0||j.length<=v$+2)return $.x=0,$.z=1,$.sway=0,$;let q=j[v$]??0,Y=j[v$+1]??0,V=Math.max(j[v$+2]??0,0),H=Math.max(Q?.windForce??0,Z?_4:0),K=i0(q,Y)||1;return $.x=q/K,$.z=Y/K,$.sway=Math.min(H*V*w4,i5),$})",()=>"(function($,J,Q,Z,j,q,Y,V,H,K,X){let F=$.win??DV,G=Q.renderOrigin??WV,U=j.sway>0?1:0;H[0]=F[0],H[1]=J.n,H[2]=F[1],H[3]=$.frame;let N=G[0]-F[0]*U0,P=G[2]-F[1]*U0;K[4]=N;K[5]=G[1];K[6]=P;K[7]=Z.rf;K[8]=Z.whole;K[9]=1/Math.log(Math.max(Z.reach/Z.whole,1.0001));K[10]=Z.end;K[11]=Z.walkEnd;K[12]=q[0];K[13]=q[1];K[14]=Q.viewportSize[0];K[15]=Q.viewportSize[1];X[16]=V;X[17]=Y;X[18]=U;X[19]=$.book?.lookCount??0;K[20]=Q.camera.position[0]+N;K[21]=Q.camera.position[1]+G[1];K[22]=Q.camera.position[2]+P;K[23]=Q.timeSeconds;K[24]=j.x;K[25]=j.z;K[26]=j.sway;K[27]=Z.walkPixel;K[28]=$.bornMs===null?0:Math.max(W0()-$.bornMs,0.001)/1000;K[29]=m4(j.sway);K[30]=$.pressHeld;K[31]=LV;K[32]=1/Math.log(Math.max(Z.far/Z.whole,1.0001));K[33]=$.centre[0]-F[0]*U0;K[34]=$.centre[1]-F[1]*U0})",()=>'(function($,J,Q,Z,j,q,Y=null,V=M6){$.walked=!1;if(!AV($,J,Q,j))return;let H=HV($,Q.device,i1());$.ready=wV(Q,H.n);if(PV($,H,J,j,q)&&$.win)r1($,$.win);let K=(H.n/u/2-1)*Y7;let X=UV($,Q,Z,XV(Z[1],Q.camera.view,Q.camera.projection,Q.camera.isOrthographic,FV(J,Q,Z,V),K));let F=Math.floor(X[0]/Y7);let G=Math.floor(X[1]/Y7);let U=$.keptEye;let N=$.keptCentre;if(p(Z[0]-U[0],Z[1]-U[1],Z[2]-U[2])>0.005||i0(X[0]-N[0],X[1]-N[1])>0.005)U[0]=Z[0],U[1]=Z[1],U[2]=Z[2],N[0]=X[0],N[1]=X[1],$.keepOwed=4;NV($,J);CV($,H.n,F,G);if(Q.unread===!0)$.footCount=0,$.quadCount=0;else {zV($,J,H,F,G);}u4($,H,Q,Y,V);let P=Math.max(0.000001,Math.abs(Q.camera.projection[5]??1)),z=2/(P*Math.max(Q.viewportSize[1],1)),C=2/(P*Math.max((Q.cssViewport??Q.viewportSize)[1],1)),I=$.book?.maxDistance??200;W$[0]=X[0],W$[1]=Z[1],W$[2]=X[1];let D=L1($.nearHold,J,W$,!0,Math.min(I>0?I:200,K),$.nearBook),M=n1(z,C,I,$.book?.fadeDistance??0,K,D,Q.viewportSize[0]*Q.viewportSize[1],$.words);if(J.surface)Z5(J.surface,M.whole,M.reach,!0);let v=$.keepWords;if(M.whole!==v[0]||M.reach!==v[1]||M.end!==v[2]||M.far!==v[3]){v[0]=M.whole,v[1]=M.reach,v[2]=M.end,v[3]=M.far;let O=`${M.whole.toFixed(3)}|${M.reach.toFixed(3)}|${M.end.toFixed(3)}|${M.far.toFixed(3)}`;if(O!==$.keepKey)$.keepKey=O,$.keepOwed=4}let L=Math.ceil(Q.viewportSize[0]/M.rf),c=Math.ceil(Q.viewportSize[1]/M.rf);TV(H,L,c);let R=BV($.air,Q,$.book,J.growth!==null);let _=R.sway>0?1+(Math.sign(R.x)+1)*3+(Math.sign(R.z)+1):0;if(_!==$.airSide)$.airSide=_,$.keepOwed=4;vV($,H,Q,M,R);x$("blades-wind",R.sway>0?1:0);x$("blades-press",Q.timeSeconds-$.feetMovedS<bZ?1:0);x$("blades-arrival",$.bornMs!==null&&W0()-$.bornMs<S0?1:0)})',()=>"(function($,J){return $[l0]=J.uniform,$[_1]=J.phase,$[E$]=J.footJobs,$[O$]=J.ground,$[R$]=J.colsA,$[L$]=J.colsB,$[U6]=J.owners,$[I6]=J.keptTop,$[C6]=J.keptInfo,$[T6]=J.maxima,$[D6]=J.wind,$[g1]=J.feet,$[S1]=J.quadJobs,$[G6]=J.book,$[N6]=J.growth,$})",()=>'(function($,J,Q,Z){let j=$.gpu,q=J.buckets.get("opaque")?.gpu??null;if(!$.active||Q.unread===!0||j?.device!==Q.device||q===null||j.hitView===null||Z===null)return;let Y=j.n;if(!A7(V7,A$,0,Y,Q.device,Q.pipelines,z0)||!$.ready)return;let V=t1($,A$,Y,Q);let H=o1(j.res.buffers,j);H[h1]=q.quadWords,H[E1]=q.quadChunkRefs,H[O1]=q.chunkPoses,H[b1]=q.chunkParams,H[w1]=q.palette,H[B6]=Z,j.res.views[Y8]=j.hitView;let K=j.passes,X=$.footCount;if(X>0){if(m(K,e4,4,4,X),$.quadCount>0){let F=Math.min($.quadCount,65535);m(K,$V,F,Math.ceil($.quadCount/F),1)}m(K,JV,4,4,X),m(K,QV,4,4,X)}if($.keepOwed>0||X>0)$.keepOwed=Math.max($.keepOwed-1,0),m(K,ZV,Y/8,Y/32,1),m(K,jV,Y/64,Y/64,1),m(K,qV,1,1,1);if($.pressOwed>0)m(K,K1,$.pressOwed,1,1),$.pressOwed=0,j.feetLeft.set(j.feetWords.subarray(0,$.feetCount*4)),$.feetLeftCount=$.feetCount,$.feetLeftWin[0]=$.win?.[0]??0,$.feetLeftWin[1]=$.win?.[1]??0;else if(X>0&&$.feetLeftCount>0)m(K,K1,$.feetLeftCount,1,1);if(V===d8)m(K,YV,$6/2,$6/2,1);m(K,u1,Math.ceil(j.hitSize[0]/x7),Math.ceil(j.hitSize[1]/x7),1);Q.graph.addCompute("terrain/blades",m8(K,V7,V,j.binds,j.res,Q.frameBindGroup,Q.device,Q.pipelines));{let J=Q;$.walked=!0,a1($.walkedCamera,J)}})']},function(){return[()=>"(function($,J){let{view:Q,projection:Z}=J.camera;for(let j=0;j<16;j+=1)if($[j]!==(Q[j]??0))return!1;for(let j=0;j<16;j+=1)if($[16+j]!==(Z[j]??0))return!1;return $[32]===J.viewportSize[0]&&$[33]===J.viewportSize[1]})",()=>'(function($,J,Q){let Z=$.gpu;if(!$.active||!$.walked||Z?.device!==J.device||Q===null)return;if(!A7(V7,x6,0,Z.n,J.device,J.pipelines,z0))return;let j=Z.look??=$j(Z.device,Z.mark);return e1($,Z,J,j,Q,"terrain/blades/look"),function(){j.walked=!1}})',()=>'(function($,J,Q){let Z=$.gpu;if(!$.active||!$.ready||J.unread===!0||Z?.device!==J.device||Q===null)return!1;if(!A7(V7,x6,0,Z.n,J.device,J.pipelines,z0))return!1;let j=Z.views.get(J.frameBindGroup);if(j===void 0)j=$j(Z.device,Z.mark),Z.views.set(J.frameBindGroup,j);return e1($,Z,J,j,Q,"terrain/blades/view"),!0})',()=>'(function($,J,Q,Z,j,q){let Y=Math.max(0.000001,Math.abs(Q.camera.projection[5]??1)),V=2/(Y*Math.max(Q.viewportSize[1],1)),H=2/(Y*Math.max((Q.cssViewport??Q.viewportSize)[1],1)),K=(J.n/u/2-1)*Y7,X=$.book?.maxDistance??200,F=n1(V,H,X,$.book?.fadeDistance??0,K,$.words.end,Q.viewportSize[0]*Q.viewportSize[1],Z.words),G=Math.max(1,Math.ceil(Q.viewportSize[0]/F.rf)),U=Math.max(1,Math.ceil(Q.viewportSize[1]/F.rf));if(Z.hit===null||Z.held[0]<G||Z.held[1]<U){h(Z.hit);let z={width:Math.max(G,Z.held[0]),height:Math.max(U,Z.held[1])};Z.hit=w8(J.device,{label:"terrain blades look hit",size:z,format:"rgba32uint",usage:8|4},J.mark),Z.hitView=Z.hit.createView({label:"terrain blades look hit"}),Z.held[0]=z.width,Z.held[1]=z.height}Z.size[0]=G,Z.size[1]=U,l1($,J,Q,F,$.air,Z.size,0,0,Z.i32,Z.f32,Z.u32),J.device.queue.writeBuffer(Z.uniform,0,Z.bytes);let N=o1(Z.res.buffers,J);N[l0]=Z.uniform,N[B6]=j,Z.res.views[Y8]=Z.hitView;let P=t1($,x6,J.n,Q);m(Z.passes,u1,Math.ceil(G/x7),Math.ceil(U/x7),1),Q.graph.addCompute(q,m8(Z.passes,V7,P,Z.binds,Z.res,Q.frameBindGroup,Q.device,Q.pipelines)),Z.walked=!0,a1(Z.camera,Q)})',()=>'(function($,J){let Q=new ArrayBuffer(p8);return{uniform:r($,{label:"terrain blades look uniform",size:p8,usage:64|8},J),bytes:Q,i32:new Int32Array(Q),f32:new Float32Array(Q),u32:new Uint32Array(Q),hit:null,hitView:null,held:[0,0],size:[0,0],words:{rf:0,whole:0,reach:0,far:0,end:0,walkEnd:0,walkPixel:0},res:_8(k1,m1),binds:g8(p1),passes:k8(c1),merge:null,walked:!1,camera:new Float64Array(s1)}})',()=>"(function($,J){let Q=A6(J,J.device,J.pipelines);if(Q===null)return null;$.res.views[Y8]=$.hitView,$.res.buffers[l0]=$.uniform;let Z=d0($.binds,f1,$.res,J.device,J.pipelines),j=J.passBindGroup??z6(J.device,J.pipelines),q=$.merge;if(q?.pipeline===Q&&q.bindGroups[0]===J.frameBindGroup&&q.bindGroups[1]===j&&q.bindGroups[2]===Z)return q;return $.merge={pipeline:Q,bindGroups:[J.frameBindGroup,j,Z],draw:{vertexCount:3,instanceCount:1}},$.merge})",()=>"(function($,J){let{device:Q,pipelines:Z}=$,j=Z.enterLead(Z.eye.ground());Z.enterScope(O8);try{let q=A7(V7,A$,0,J,Q,Z,z0);if($.pictureUnseen!==!0)A6($,Q,Z);return q}finally{try{Z.leaveScope(O8)}finally{Z.leaveLead(j)}}})",()=>"(()=>(`@group(3) @binding(1) var voxelMirrorColor: texture_2d<f32>;\n@group(3) @binding(2) var voxelMirrorDepth: texture_2d<f32>;`))"]},function(){return[()=>"(()=>(`  let coverage = mix(paneBody.x, 1.0, paneBody.y) * alphaSample;\n`))",()=>"(function($,J){if($.split(R6).length!==2||$.split(L6).length!==2||$.split(Yj).length!==2)throw Error(\"[lume terrain] the liquid's share text lost the sampled text's fragment entry, its glow line or its cover line\");let Q=J?`${iV}\n${jj}`:jj,Z=J?`${nV}\n${qj}`:qj;return $.replace(R6,()=>`${(dV??=$c0I(141))}\n${Q}\n${R6}`).replace(L6,()=>`${Z}\n${L6}`).replace(Yj,()=>(rV??=$c0I(142)))})",()=>'(()=>({color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}}))',()=>'(function($,J,Q,Z,j=!0,q=!1){let Y=j?oV(Q,q):sV(Q,q);return J.getRenderPipeline(Y,function(){let V=(Lj(Wj(Q,Mj(),Z,q),j));let H=$.createShaderModule({label:Y,code:V});let K=i7(J,[V]);let X=n7($,Y,[J.getBindGroupLayout(T7,"lume frame"),K,J.getBindGroupLayout(Dj(Z.layout),"terrain voxel bucket surface"),J.getBindGroupLayout(Rj,"terrain voxel liquid mirror")],K);return{label:Y,layout:X,vertex:{module:H,entryPoint:"vs"},fragment:{module:H,entryPoint:"fs",targets:d7({blend:(aV??=$c0I(144)),motion:q,motionBlend:Xj})},depthStencil:c7(!1),multisample:{count:1}}},Nj)})',()=>"(function($,J,Q){O0.device=$.device,O0.pipelines=$.pipelines,O0.source=J,O0.surface=Q,O0.mirror=xj(),O0.motion=$.motionVectors===!0;let Z=$.pipelines.arrivingDrawScope(eV);return O0.device=null,O0.pipelines=null,O0.surface=null,Z.pipeline})",()=>'(function($,J,Q){let Z=function(q){return $.queue.writeTexture({texture:q},J==="colour"?new Uint8Array([0,0,0,255]):new Float32Array([Uj]),{bytesPerRow:4},{width:1,height:1}),q.createView()},j={label:`terrain voxel liquid mirror stand-in ${J}`,size:{width:1,height:1},format:J==="colour"?"rgba8unorm":Fj,usage:4|2};return Z(Ij($,j,(q)=>Q(Z(q))))})',()=>'(function($,J,Q,Z){let j=Hj.get($);if(!j){let V={colour:Vj($,"colour",function(H){V.colour=H,V.group=null}),depth:Vj($,"depth",function(H){V.depth=H,V.group=null}),water:null,picture:null,deep:null,group:null};j=V,Hj.set($,j)}let q=Z?.mirrorView??Z?.colorView??null,Y=Z?.depthView??null;if(j.group===null||j.water!==Q||j.picture!==q||j.deep!==Y){j.water=Q,j.picture=q,j.deep=Y;let V="terrain voxel liquid mirror stand-in";if(Y!==null)V=q!==null?"terrain voxel liquid mirror":"terrain voxel liquid bed";j.group=$.createBindGroup({label:V,layout:J.getBindGroupLayout(Rj,"terrain voxel liquid mirror"),entries:[{binding:0,resource:Q},{binding:1,resource:q??j.colour},{binding:2,resource:Y??j.depth}]})}return j.group})',()=>"(function($){if($0.seen)return;let J=$.chunkSlot*W7,Q=$0.poses[J+b8]??-1;if($.surfaceEntries===0||Q<0)return;let Z=H7($0.poses,J+v7);let j=H7($0.poses,J)+Z;let q=H7($0.poses,J+1)+Z;let Y=H7($0.poses,J+2)+Z;let V=j-$0.eyeX;let H=q-$0.eyeY;let K=Y-$0.eyeZ;let X=Q+Zj.metres+Zj.perMetre*Math.sqrt(V*V+H*H+K*K);let v$5;ZH:{let $$5=yj,J$6=j,Q$2=q,Z$2=Y,j$1=X;{let $=$$5,J=J$6,Q=Q$2,Z=Z$2,j=j$1;for(let q=0;q<$.length;q+=4){if(H7($,q)*J+H7($,q+1)*Q+H7($,q+2)*Z+H7($,q+3)<-j){v$5=!1;break ZH;}}v$5=!0;}}if(v$5)$0.seen=!0})",()=>"(function($,J){if($.surfaceEntries===0)return!1;return zj(Pj(J.projection,J.view,QH),yj),$0.poses=$.buffers.chunkPosesData,$0.eyeX=J.position[0],$0.eyeY=J.position[1],$0.eyeZ=J.position[2],$0.seen=!1,$.chunkSlots.forEach(jH),$0.seen})"]},function(){return[()=>"(function($,J,Q,Z){let j=Kj.get($);if(!Q){if(j?.sets.delete(J)===!0&&j.sets.size===0)j.halves=null,$.setViewportSharer(Jj,!1);return!1}let q=j??{sets:new Set,halves:null};if(!j)Kj.set($,q);if(q.sets.add(J),q.halves===Z)return!1;let Y=q.halves===null;return q.halves=Z,$.setViewportSharer(Jj,Z),Y})"]}],$c0XU=[0,8,12,19,25,32,39,47,52,58,65,69,75,82,88,93,99,104,110,117,124,129,134,142,151];var $c0S,$c0D=()=>eval($c0S);function $c0E(s){$c0S=s;return $c0D()}$c0C=$c0K($c0T,$c0XU,$c0E,152,4110782407114752);var $c0I=$c0C.i;
;const{$N2:tZ,AG4:V$,AZn:Fj,AyU:GZ,C5q:z6,CDb:BJ,Cdy:UZ,E$D:IZ,EBB:x$,GNc:bJ,Ggy:C7,Gyu:A0,HKh:N$,HfE:M8,IeY:b8,JJQ:MZ,JK_:h,JLE:zj,Jai:L0,KdH:c7,L$P:r,LNp:A,M8T:TZ,MfU:d7,MwH:N1,N0E:y0,N8U:s7,NbW:Gj,O1h:X7,OuE:_7,P2_:g9,PvR:wJ,QCU:v7,SlX:Uj,THT:z0,TjB:y6,Tp9:DQ,U4E:I7,UQ2:O8,UQz:F$,UWA:z1,UcB:W0,VR7:b9,VSF:$1,Wmi:D1,Wrp:Nj,X4S:hJ,XK8:h9,ZZw:WJ,ZeJ:NZ,_FD:P1,_S$:Pj,_rr:M7,aHg:g6,apl:y9,bcH:k9,bin:_J,bzV:g7,dOd:zZ,dxM:CZ,eX6:w8,eYb:S9,fRd:p,fX9:_9,fdD:W1,fkF:I1,fxb:BQ,gSa:m0,gzd:m9,h1y:t7,hYg:T1,hqv:c5,j2v:QJ,jJo:EJ,jq5:WQ,jvv:PZ,kQP:B8,l6l:Ij,lFv:_$,lH3:$J,lKR:E9,lSa:w0,mHV:C1,me2:M0,mq1:T7,nvi:D8,oAB:w9,oxy:TQ,pD7:CQ,pLP:M1,rUj:O9,rmZ:v1,rpN:W9,taY:i0,tcD:B1,ts0:eZ,uMP:i7,ueV:Mj,vTQ:JJ,vbn:S6,vcF:OJ,w35:W7,wRZ:g,wVV:q5,xFq:Xj,xv5:DZ,xzm:h6,yfJ:n7,z2Z:D0,zKy:E7,zw3:BZ}=$Lr;
;;;;;;;;;;;;;;;;;;;;;;;;var k=6,X8=1,y7=4,J9=4,p$=3,F8=12,s={head:0,base:1,baseShares:2,rare:3,unitA:4,unitB:5,unitC:6,unitD:7,rim:8,joint:9,cellsA:10,cellsB:11,cellsC:12,speck:13,grainA:14,grainB:15,field:16,blobs:17,drift:18,means:19,features:20,face:$9,edge:22,accents:23,jointMean:27,classMean:28,colours:31,states:35,flow:53,tones:54},n=s.tones+F8,_0={blocks:1,cells:2,grain:4,field:8,drift:16,speck:32,accents:64,world:128,blink:256,flow:512},U8={jointRun:1,jointCourse:2,stands:4},g0={pairs:1,tall:2,top:4,overJoint:8,gateShift:4,blinkShift:6,catchShift:14},O7=0.0625,b6=0.25,hj=2.5,w6=10,Ej=16,a8=65536,Y0=8,S7={floor:0.25,slope:3.5},t8=0.85;var o8={lo:0.3,hi:0.9},s8={lo:0.1,hi:0.4},G8=2,u$=3,F7=16,N8=function($,J,Q){let Z=(Math.imul($,73856093)^Math.imul(J,19349663)^Math.imul(Q,83492791))>>>0;return Z=Math.imul(Z^Z>>>16,73244475)>>>0,(Z^Z>>>16)>>>0},k6=[g(k$,2,"read-only-storage"),g(m$,1,"read-only-storage")],m6=`@group(2) @binding(${k$}) var<storage, read> voxelSurfaceTable: array<vec4<f32>>;
@group(2) @binding(${m$}) var<storage, read> voxelChunkCells: array<vec4<i32>>;`,f6=`  @location(9) @interpolate(flat) look: vec2<u32>,
  @location(10) microPos: vec3<f32>,
  @location(11) @interpolate(flat) microOrigin: vec3<i32>,
  @location(12) @interpolate(flat) cubeScale: f32,`,p6=`  let cover = palette[decoded.paletteRow + 3u];
  let faceDir = quadWords[survivorSlot].x & 7u;
  let faceValue = voxel_faceValueRead(quadWords[survivorSlot].x, quadWords[survivorSlot].y);
  let stepLevels = voxel_classLevels(decoded.shade, vec2u(0u), vec2u(((decoded.shade >> 18u) & 0x1fu) + 1u, ((decoded.shade >> 23u) & 0x1fu) + 1u));
  let oneStep = ((faceValue >> 24u) & 1u) == 1u && stepLevels.x != 3u && stepLevels.y != 3u;
  out.look = vec2u(u32(cover.z + 0.5), faceDir | (u32(cover.w + 0.5) << 3u) | (u32(oneStep) << ${e8}u) | (u32((quadWords[survivorSlot].x & ${E7>>>0}u) != 0u) << ${f$}u));
  out.microPos = decoded.localPos * ${y}.0;
  out.microOrigin = voxelChunkCells[decoded.chunkSlot].xyz;
  out.cubeScale = 1.0 / (chunkParams[decoded.chunkSlot].x * ${y}.0);`,u6=($,J)=>$c0C(0)($,J),W=s,q0=_0,K8=U8,a0=g0,k0=`${_6}
override voxel_terms = 0xffffffffu;
override voxel_slant = true;
struct VoxelSurface {
  rgb: vec3<f32>,
  roughness: f32,
  metalness: f32,
  emissive: vec3<f32>,
  tilt: vec3<f32>,
  soft: f32,
  cube: f32,
}

struct VoxelSurfaceTone {
  rgb: vec3<f32>,
  shade: vec3<f32>,
}

struct VoxelSurfaceLive {
  eye: vec3<f32>,
  sun: vec3<f32>,
  sunLight: f32,
  clock: f32,
}

struct VoxelSurfaceUnit {
  base: f32,
  joint: f32,
  rim: f32,
  laid: f32,
  jointRow: f32,
  rimRow: f32,
}

fn surf_hash(x: u32, y: u32, z: u32, seed: u32) -> u32 {
  var h = (x * 0x9E3779B1u) ^ (y * 0x85EBCA77u) ^ (z * 0xC2B2AE3Du) ^ (seed * 0x27D4EB2Fu);
  h = (h ^ (h >> 15u)) * 0x2C1B3C6Du;
  h = (h ^ (h >> 12u)) * 0x297A2D39u;
  return h ^ (h >> 15u);
}

fn surf_unit(h: u32) -> f32 {
  return f32(h >> 8u) * 5.9604645e-8;
}

fn surf_word(v: f32) -> u32 {
  return bitcast<u32>(i32(v));
}

fn surf_div(a: f32, n: f32) -> f32 {
  return floor((a + 0.5) / n);
}

fn surf_tone(row: vec4f) -> VoxelSurfaceTone {
  let glow = floor(row.w / 4096.0);
  let rest = row.w - glow * 4096.0;
  let metal = floor(rest / 256.0);
  return VoxelSurfaceTone(row.rgb, vec3f((rest - metal * 256.0) / 255.0, metal / 15.0, glow / 15.0));
}

fn surf_mix(a: VoxelSurfaceTone, b: VoxelSurfaceTone, k: f32) -> VoxelSurfaceTone {
  return VoxelSurfaceTone(mix(a.rgb, b.rgb, k), mix(a.shade, b.shade, k));
}

fn surf_ramp(tones: u32, t: f32) -> VoxelSurfaceTone {
  let low = floor(t);
  let a = surf_tone(voxelSurfaceTable[tones + u32(low)]);
  let part = t - low;
  if (part <= 0.0) { return a; }
  return surf_mix(a, surf_tone(voxelSurfaceTable[tones + u32(low) + 1u]), part);
}

fn surf_accent(base: u32, y: f32) -> VoxelSurfaceTone {
  return surf_tone(voxelSurfaceTable[select(base + ${W.tones}u + u32(y), base + ${W.colours}u + u32(y) - 100u, y >= 100.0)]);
}

fn surf_field(cell: vec3u, shift: vec3u, seed: u32) -> vec3f {
  let size = vec3u(1u) << shift;
  let node = cell >> shift;
  let f = (vec3f(cell & (size - vec3u(1u))) + vec3f(0.5)) / vec3f(size);
  let w = f * f * (vec3f(3.0) - 2.0 * f);
  var sum = vec3f(0.0);
  for (var corner = 0u; corner < 8u; corner = corner + 1u) {
    let o = vec3u(corner & 1u, (corner >> 1u) & 1u, corner >> 2u);
    let h = surf_hash(node.x + o.x, node.y + o.y, node.z + o.z, seed);
    let value = vec3f(vec3u(h, h >> 10u, h >> 20u) & vec3u(1023u)) * (1.0 / 1023.0);
    let k = mix(vec3f(1.0) - w, w, vec3f(o));
    sum = sum + value * (k.x * k.y * k.z);
  }
  return sum;
}

fn surf_drift(p: vec2u, axis: u32, shift: u32, seed: u32) -> f32 {
  let size = 1u << shift;
  let node = p >> vec2u(shift);
  let f = (vec2f(p & vec2u(size - 1u)) + vec2f(0.5)) / f32(size);
  let w = f * f * (vec2f(3.0) - 2.0 * f);
  let a = surf_unit(surf_hash(node.x, node.y, axis, seed));
  let b = surf_unit(surf_hash(node.x + 1u, node.y, axis, seed));
  let c = surf_unit(surf_hash(node.x, node.y + 1u, axis, seed));
  let d = surf_unit(surf_hash(node.x + 1u, node.y + 1u, axis, seed));
  return mix(mix(a, b, w.x), mix(c, d, w.x), w.y);
}

fn surf_line(v: f32, lineA: u32, lineB: u32, seed: u32) -> f32 {
  let node = floor(v);
  let f = v - node;
  let a = surf_unit(surf_hash(surf_word(node), lineA, lineB, seed));
  let b = surf_unit(surf_hash(surf_word(node + 1.0), lineA, lineB, seed));
  return mix(a, b, f * f * (3.0 - 2.0 * f));
}

fn surf_base(base: u32, h: u32) -> f32 {
  let row = voxelSurfaceTable[base + ${W.base}u];
  let shares = voxelSurfaceTable[base + ${W.baseShares}u];
  let rare = voxelSurfaceTable[base + ${W.rare}u];
  let u = surf_unit(h);
  var pick = min(floor(u * row.y), row.y - 1.0);
  if (shares.x >= 0.0) { pick = f32(u >= shares.x) + f32(u >= shares.y) + f32(u >= shares.z) + f32(u >= shares.w); }
  let r = surf_unit(h * 0x9E3779B1u);
  if (r < rare.x) { return rare.y; }
  if (r > 1.0 - rare.z) { return rare.w; }
  return row.x + pick;
}

fn surf_end(index: f32, courseWord: u32, seed: u32, uneven: f32) -> f32 {
  return floor((surf_unit(surf_hash(surf_word(index), courseWord, 13u, seed)) - 0.5) * (2.0 * uneven + 1.0) + 0.5);
}

fn surf_blocks(base: u32, q: vec2f, cell: vec3u, world: bool, seed: u32) -> VoxelSurfaceUnit {
  let ua = voxelSurfaceTable[base + ${W.unitA}u];
  let ub = voxelSurfaceTable[base + ${W.unitB}u];
  let uc = voxelSurfaceTable[base + ${W.unitC}u];
  let ud = voxelSurfaceTable[base + ${W.unitD}u];
  let rim = voxelSurfaceTable[base + ${W.rim}u];
  let bits = u32(uc.x);
  let stands = (bits & ${K8.stands}u) != 0u;
  let jointOnRun = (bits & ${K8.jointRun}u) != 0u;
  let jointOnCourse = (bits & ${K8.jointCourse}u) != 0u;
  let runAt = select(q.x, q.y, stands);
  var courseAt = select(q.y, q.x, stands);
  if (ub.w > 0.0) {
    let bendAt = select(runAt, f32((cell.x + cell.z) & 0xffffu), world);
    courseAt = courseAt + floor((surf_line((bendAt + 0.5) / ud.z, 9u, 0u, seed) - 0.5) * 2.0 * ub.w + 0.5);
  }
  if (ub.z > 0.0) { courseAt = courseAt + floor(surf_unit(surf_hash(surf_word(surf_div(runAt, ub.z)), 7u, 0u, seed)) * 2.0); }
  let course = surf_div(courseAt, ua.x);
  let inCourse = courseAt - course * ua.x;
  let courseWord = surf_word(course);
  var runLength = ua.y;
  if (ua.z > 0.0) { runLength = runLength + floor(surf_unit(surf_hash(courseWord, 11u, 0u, seed)) * (ua.z + 1.0)); }
  var slide = ua.w * (course - 2.0 * floor(course * 0.5));
  if (ua.w < 0.0) { slide = floor(surf_unit(surf_hash(courseWord, 12u, 0u, seed)) * runLength); }
  let run = runAt + slide;
  var index = surf_div(run, runLength);
  var inRun = run - index * runLength;
  if (ub.x > 0.0) {
    let here = surf_end(index, courseWord, seed, ub.x);
    let next = surf_end(index + 1.0, courseWord, seed, ub.x);
    if (inRun < here) {
      index = index - 1.0;
      inRun = inRun + runLength - surf_end(index, courseWord, seed, ub.x);
    } else if (inRun >= runLength + next) {
      index = index + 1.0;
      inRun = inRun - runLength - next;
    } else {
      inRun = inRun - here;
    }
  }
  var merged = false;
  if (ub.y > 0.0) {
    let pair = surf_div(index, 2.0);
    if (surf_unit(surf_hash(surf_word(pair), courseWord, 14u, seed)) < ub.y) {
      merged = index - 2.0 * pair > 0.5;
      index = pair * 2.0;
    }
  }
  let own = surf_hash(surf_word(index), courseWord, 4u, seed);
  var unit: VoxelSurfaceUnit;
  unit.base = surf_base(base, own);
  var standing = jointOnCourse;
  if (standing && uc.y < 1.0) { standing = surf_unit(surf_hash(surf_word(surf_div(runAt, uc.z)), courseWord, 17u, seed)) < uc.y; }
  var cellWord = 0u;
  if (uc.w > 0.0 || fract(rim.y) > 0.0 || fract(rim.w) > 0.0) { cellWord = surf_hash(surf_word(runAt), surf_word(courseAt), 18u, seed); }
  unit.joint = 0.0;
  if ((jointOnRun && inRun < 1.0 && !merged) || (standing && inCourse < 1.0)) {
    unit.joint = 1.0;
  } else if (standing && inCourse < 2.0 && surf_unit(cellWord * 0x9E3779B1u) < uc.w) {
    unit.joint = 2.0;
  }
  let first = f32(jointOnCourse);
  unit.rim = 0.0;
  if (inCourse >= first && inCourse < first + 1.0 && surf_unit(cellWord) < rim.y) { unit.rim = rim.x; }
  if (inCourse >= ua.x - 1.0 && surf_unit(cellWord * 0x85EBCA77u) < rim.w) { unit.rim = unit.rim + rim.z; }
  let cover = voxelSurfaceTable[base + ${W.joint}u].w;
  let s = select(0.0, min(uc.y, 1.0), jointOnCourse);
  let s2 = s * select(0.0, uc.w, ua.x >= 2.0);
  let h = clamp((ua.x * cover - s - s2) / max(ua.x - s - s2, 1e-6), 0.0, 1.0);
  unit.jointRow = h;
  if (jointOnCourse && inCourse < 1.0) {
    unit.jointRow = h + (1.0 - h) * s;
  } else if (jointOnCourse && inCourse < 2.0) {
    unit.jointRow = h + (1.0 - h) * s2;
  }
  unit.rimRow = 0.0;
  if (inCourse >= first && inCourse < first + 1.0) { unit.rimRow = rim.x * min(rim.y, 1.0); }
  if (inCourse >= ua.x - 1.0) { unit.rimRow = unit.rimRow + rim.z * min(rim.w, 1.0); }
  unit.laid = -1.0;
  let firstRun = f32(jointOnRun);
  if (ud.x > 0.0 && inRun >= firstRun && inRun < firstRun + 1.0 && inCourse >= ua.x - 1.0 && surf_unit(own * 0xC2B2AE3Du) < ud.x) { unit.laid = ud.y; }
  return unit;
}

fn surf_cells(base: u32, p: vec2f, side: f32, seed: u32) -> VoxelSurfaceUnit {
  let ca = voxelSurfaceTable[base + ${W.cellsA}u];
  let cb = voxelSurfaceTable[base + ${W.cellsB}u];
  let cc = voxelSurfaceTable[base + ${W.cellsC}u];
  let home = vec2f(surf_div(p.x, ca.x), surf_div(p.y, ca.y));
  var d1 = 1e9;
  var d2 = 1e9;
  var id1 = 0u;
  var id2 = 0u;
  var up1 = 0.0;
  let reach = select(ca.xy, vec2f(ca.z + ca.w), ca.z > 0.0);
  let centreOfCell = p + vec2f(0.5);
  for (var n = 0u; n < 9u; n = n + 1u) {
    let turn = (n + 4u) % 9u;
    let at = home + vec2f(f32(turn % 3u) - 1.0, f32(turn / 3u) - 1.0);
    let corner = at * ca.xy;
    let away = max(max(corner - centreOfCell, centreOfCell - (corner + ca.xy * ${t8})), vec2f(0.0)) / reach;
    if (length(away) >= d2) { continue; }
    let h = surf_hash(surf_word(at.x), surf_word(at.y), 20u, seed);
    let centre = (at + vec2f(surf_unit(h), surf_unit(h * 0x9E3779B1u)) * ${t8}) * ca.xy;
    var scale = ca.xy;
    if (ca.z > 0.0) { scale = vec2f(ca.z + ca.w * surf_unit(h * 0x85EBCA77u)); }
    let v = (centreOfCell - centre) / scale;
    let d = length(v);
    if (d < d1) {
      d2 = d1;
      id2 = id1;
      d1 = d;
      id1 = h;
      up1 = v.y;
    } else if (d < d2) {
      d2 = d;
      id2 = h;
    }
  }
  var unit: VoxelSurfaceUnit;
  unit.base = surf_base(base, id1) + cb.x * up1 * side - cb.y * d1;
  unit.rim = 0.0;
  let cellWord = surf_hash(surf_word(p.x), surf_word(p.y), 21u, seed);
  let crack = cb.z > 0.0 && d2 - d1 < cb.z && surf_unit(surf_hash(min(id1, id2), max(id1, id2), 22u, seed)) < cb.w;
  let gap = cc.w > 0.5 && d1 > 1.0;
  unit.joint = f32(crack || gap);
  var ring = d2 - d1 < cc.x;
  if (ca.z > 0.0) { ring = d1 > cc.x; }
  unit.laid = -1.0;
  if (ring && surf_unit(cellWord) < cc.y) { unit.laid = cc.z; }
  return unit;
}

fn surf_fade(footprint: f32, feature: f32) -> f32 {
  return 1.0 - smoothstep(${o8.lo}, ${o8.hi}, footprint / feature);
}

fn voxel_surface(look: vec2u, microOrigin: vec3i, microPos: vec3f, microFw: vec3f, cubeScale: f32, live: VoxelSurfaceLive) -> VoxelSurface {
  let dir = look.y & 7u;
  let state = (look.y >> 3u) & 7u;
  let axis = dir >> 1u;
  let positive = (dir & 1u) == 0u;
  let nrm = vec3f(f32(axis == 0u), f32(axis == 1u), f32(axis == 2u)) * select(-1.0, 1.0, positive);
  let appear = voxelSurfaceTable[0].x;
  var base = look.x;
  let cap = u32(voxelSurfaceTable[base].z);
  if (dir == 2u && cap != 0u) { base = cap; }
  let head = voxelSurfaceTable[base];
  let flags = u32(head.w) & voxel_terms;
  let features = voxelSurfaceTable[base + ${W.features}u];
  let edge = voxelSurfaceTable[base + ${W.edge}u];
  let klass = select(1u, select(2u, 0u, positive), axis == 1u);

  let cellShift = u32(head.x);
  let cellMicro = f32(1u << cellShift);
  let pixelMicro = max(max(microFw.x, microFw.y), microFw.z);
  var reach = microFw / cellMicro;
  if ((flags & ${q0.world}u) == 0u) {
    if (axis == 0u) { reach = reach.zyx; } else if (axis == 1u) { reach = reach.xzy; }
  }
  let footprint = pixelMicro / cellMicro;
  let isBlocks = (flags & ${q0.blocks}u) != 0u;
  let fadeCell = surf_fade(footprint, 1.0) * appear;
  let fadeField = surf_fade(footprint, features.y) * appear * f32((flags & ${q0.field}u) != 0u);
  let fadeDrift = surf_fade(footprint, features.z) * appear * f32((flags & ${q0.drift}u) != 0u);
  var unitSize = vec2f(1.0);
  var fadeRow = 0.0;
  var fadeInRow = 0.0;
  var rimMean = 0.0;
  if (isBlocks) {
    let ua = voxelSurfaceTable[base + ${W.unitA}u];
    let ub = voxelSurfaceTable[base + ${W.unitB}u];
    let ubits = u32(voxelSurfaceTable[base + ${W.unitC}u].x);
    let warpLength = voxelSurfaceTable[base + ${W.unitD}u].z;
    let rimRow = voxelSurfaceTable[base + ${W.rim}u];
    let line = max(1.0, min(select(${a8}.0, ub.z, ub.z > 0.0), select(${a8}.0, warpLength / max(1.0, 2.0 * ub.w), ub.w > 0.0)));
    let standsUp = (ubits & ${K8.stands}u) != 0u;
    let run = max(1.0, min(ua.y, line));
    let course = max(1.0, ua.x);
    unitSize = select(vec2f(run, course), vec2f(course, run), standsUp);
    let alongRun = select(reach.x, reach.y, standsUp);
    let upCourse = select(reach.y, reach.x, standsUp);
    fadeRow = surf_fade(max(upCourse, alongRun / line), 1.0) * appear;
    fadeInRow = surf_fade(alongRun, 1.0) * appear;
    let first = f32((ubits & ${K8.jointCourse}u) != 0u);
    rimMean = (rimRow.x * min(rimRow.y, 1.0) * f32(first < ua.x) + rimRow.z * min(rimRow.w, 1.0)) / ua.x;
  } else if ((flags & ${q0.cells}u) != 0u) {
    unitSize = max(voxelSurfaceTable[base + ${W.cellsA}u].xy, vec2f(1.0));
  }
  let fadeUnit = surf_fade(max(reach.x / unitSize.x, reach.y / unitSize.y), 1.0) * appear;
  let alive = max(max(max(fadeCell, fadeUnit), max(fadeField, fadeDrift)), fadeRow);
  let blinks = (flags & ${q0.blink}u) != 0u && appear > 0.0;
  let soft = select(0.0, smoothstep(${s8.lo}, ${s8.hi}, pixelMicro * cubeScale) * appear, axis != 1u && ((look.y >> ${e8}u) & 1u) == 1u);

  var tone = surf_tone(voxelSurfaceTable[base + ${W.classMean}u + klass]);
  if (alive > 0.0 || blinks) {
    let seed = u32(head.y);
    let low = vec3f(microOrigin & vec3i(i32((1u << cellShift) - 1u)));
    var slide = vec3f(0.0);
    if ((flags & ${q0.flow}u) != 0u) {
      let flow = voxelSurfaceTable[base + ${W.flow}u];
      slide = select(vec3f(0.0, -flow.z, 0.0), vec3f(flow.x, 0.0, flow.y), axis == 1u) * live.clock;
    }
    let slid = floor(slide);
    let point = (microOrigin >> vec3u(cellShift)) + vec3i(floor((microPos + low) / cellMicro - nrm * 0.5 - (slide - slid))) - vec3i(slid);
    let cell = bitcast<vec3u>(point) + vec3u(0x40000000u);
    let cellHash = surf_hash(cell.x, cell.y, cell.z, seed);
    var frame = cell;
    if ((flags & ${q0.world}u) == 0u) {
      if (axis == 0u) { frame = cell.zyx; } else if (axis == 1u) { frame = cell.xzy; }
    }
    let q = vec2f(frame.xy & vec2u(0xffffu));
    let tones = voxelSurfaceTable[base + ${W.base}u];
    let means = voxelSurfaceTable[base + ${W.means}u];
    let faces = voxelSurfaceTable[base + ${W.face}u];

    var fieldValue = vec3f(0.5);
    if (fadeField > 0.0) { fieldValue = surf_field(cell, vec3u(voxelSurfaceTable[base + ${W.field}u].xyz), seed + 2u); }
    var driftRow = vec4f(0.0, 2.0, -1.0, 0.0);
    var driftValue = 0.5;
    if (fadeDrift > 0.0) {
      driftRow = voxelSurfaceTable[base + ${W.drift}u];
      driftValue = surf_drift(frame.xy, axis, u32(driftRow.x), seed + 3u);
    }

    if (alive > 0.0) {
    var unit = VoxelSurfaceUnit(means.x, 0.0, 0.0, -1.0, 0.0, 0.0);
    if (fadeUnit > 0.0 || fadeRow > 0.0) {
      if (isBlocks) {
        unit = surf_blocks(base, q, cell, (flags & ${q0.world}u) != 0u, seed);
      } else if ((flags & ${q0.cells}u) != 0u) {
        unit = surf_cells(base, q, f32(axis != 1u), seed);
      } else {
        unit.base = surf_base(base, cellHash * 0x85EBCA77u);
      }
    }
    var t = mix(means.x, unit.base, fadeUnit);

    var cellWalk = means.y - rimMean;
    if (fadeCell > 0.0) {
      var walk = select(unit.rim, 0.0, isBlocks);
      if ((flags & ${q0.speck}u) != 0u) {
        let speck = voxelSurfaceTable[base + ${W.speck}u];
        let u = surf_unit(surf_hash(frame.x >> u32(speck.z), frame.y, frame.z, seed + 5u) * 0xC2B2AE3Du);
        walk = walk + f32(u > 1.0 - speck.x) - f32(u < speck.y);
      }
      if ((flags & ${q0.grain}u) != 0u) {
        let ga = voxelSurfaceTable[base + ${W.grainA}u];
        let gb = voxelSurfaceTable[base + ${W.grainB}u];
        var run = frame.x;
        var lineA = frame.y;
        var lineB = frame.z;
        if (ga.x > 3.5) {
          run = frame.y;
          lineA = frame.x;
        } else if (ga.x < 2.5) {
          let world = u32(ga.x);
          run = select(select(cell.z, cell.y, world == 1u), cell.x, world == 0u);
          lineA = select(cell.x, cell.y, world == 0u);
          lineB = select(cell.z, cell.y, world == 2u);
        }
        let lineWord = surf_hash(lineA, lineB, 31u, seed);
        let along = f32(run & 0xffffu);
        if (ga.w > 0.5) {
          let segment = ga.y + floor(surf_unit(lineWord) * (ga.z + 1.0));
          let phase = floor(surf_unit(lineWord * 0x9E3779B1u) * segment);
          walk = walk + floor(surf_unit(surf_hash(surf_word(surf_div(along + phase, segment)), lineA, lineB, seed + 6u)) * gb.x);
        } else if (surf_unit(lineWord * 0x85EBCA77u) < gb.z) {
          let n = surf_line((along + 0.5) / ga.y, lineA, lineB, seed + 6u);
          walk = walk + f32(n > gb.x) - f32(n < gb.y);
        }
      }
      cellWalk = mix(means.y - rimMean, walk, fadeCell);
    }
    if (isBlocks) { cellWalk = cellWalk + mix(rimMean, mix(unit.rimRow, unit.rim, fadeInRow), fadeRow); }
    var fieldWalk = means.z;
    if (fadeField > 0.0) {
      let blobs = voxelSurfaceTable[base + ${W.blobs}u];
      fieldWalk = mix(means.z, f32(fieldValue.x > blobs.x) - f32(fieldValue.x < blobs.y), fadeField);
    }
    var driftWalk = means.w;
    if (fadeDrift > 0.0) { driftWalk = mix(means.w, f32(driftValue > driftRow.y) - f32(driftValue < driftRow.z), fadeDrift); }
    let faceWalk = select(faces.y, select(faces.z, faces.x, positive), axis == 1u);
    t = t + cellWalk + fieldWalk + driftWalk + faceWalk;
    t = clamp(t, tones.z, tones.w);
    if (fadeCell >= 1.0) { t = floor(t + 0.5); } else { t = mix(t, floor(t + 0.5), fadeCell); }
    var near = surf_ramp(base + ${W.tones}u, t);

    var jointUnder = 1.0;
    if (fadeCell > 0.0 && unit.laid >= 0.0) { near = surf_mix(near, surf_tone(voxelSurfaceTable[base + ${W.tones}u + u32(unit.laid)]), fadeCell); }
    if ((flags & ${q0.accents}u) != 0u) {
      var word = 0u;
      var wordShape = 4u;
      var lid = 0.0;
      for (var n = 0u; n < ${y7}u; n = n + 1u) {
        let accent = voxelSurfaceTable[base + ${W.accents}u + n];
        let bits = u32(accent.z);
        if (accent.x <= 0.0 || ((bits & ${a0.top}u) != 0u && dir != 2u) || ((bits >> ${a0.blinkShift}u) & 255u) != 0u) { continue; }
        var hit = 0.0;
        if (fadeCell > 0.0) {
          let shape = bits & 3u;
          if (shape != wordShape) {
            word = surf_hash(frame.x >> (shape & 1u), frame.y >> (shape >> 1u), frame.z, seed + 5u);
            wordShape = shape;
          }
          hit = f32(surf_unit(word * (0x9E3779B1u + n * 0x3C6EF372u)) < accent.x);
        }
        let gate = (bits >> ${a0.gateShift}u) & 3u;
        var weight = hit * fadeCell;
        if (gate == 1u) {
          weight = f32(driftValue > accent.w) * fadeDrift * mix(accent.x, hit, fadeCell);
        } else if (gate == 2u) {
          weight = f32(fieldValue.x > accent.w) * fadeField * mix(accent.x, hit, fadeCell);
        } else if (gate == 3u) {
          weight = f32(fieldValue.z > accent.w) * fadeField * mix(accent.x, hit, fadeCell);
        }
        if (weight > 0.0) {
          near = surf_mix(near, surf_accent(base, accent.y), weight);
          if ((bits & ${a0.overJoint}u) != 0u) { lid = max(lid, weight); }
        }
      }
      jointUnder = 1.0 - lid;
    }
    let joint = voxelSurfaceTable[base + ${W.joint}u];
    let jointMean = surf_tone(voxelSurfaceTable[base + ${W.jointMean}u]);
    if (joint.w > 0.0) {
      var jointTone = jointMean;
      var k = joint.w * (1.0 - fadeCell);
      if (isBlocks) { k = mix(joint.w, mix(unit.jointRow, f32(unit.joint > 0.5), fadeInRow), fadeRow); }
      if (fadeCell > 0.0 && unit.joint > 0.5) {
        let second = unit.joint > 1.5 || surf_unit(cellHash * 0x27D4EB2Fu) < joint.z;
        jointTone = surf_mix(jointTone, surf_tone(voxelSurfaceTable[base + ${W.tones}u + u32(select(joint.x, joint.y, second))]), fadeCell);
        if (!isBlocks) { k = mix(joint.w, 1.0, fadeCell); }
      }
      near = surf_mix(near, jointTone, k * jointUnder);
    }
    var zero = surf_ramp(base + ${W.tones}u, clamp(means.x + means.y + means.z + means.w + faceWalk, tones.z, tones.w));
    if (joint.w > 0.0) { zero = surf_mix(zero, jointMean, joint.w); }
    tone = VoxelSurfaceTone(max(near.rgb + (tone.rgb - zero.rgb) * (1.0 - alive), vec3f(0.0)), near.shade + (tone.shade - zero.shade) * (1.0 - alive));
    }
    if (blinks) {
      var reach = microFw / cellMicro;
      if ((flags & ${q0.world}u) == 0u) {
        if (axis == 0u) { reach = reach.zyx; } else if (axis == 1u) { reach = reach.xzy; }
      }
      reach = reach * ${hj};
      let level = vec3u(clamp(ceil(log2(max(reach, vec3f(1e-6)))), vec3f(0.0), vec3f(${w6}.0)));
      let far = 1.0 - smoothstep(0.5, 1.0, max(max(reach.x, reach.y), reach.z) / ${2**w6}.0);
      for (var n = 0u; n < ${y7}u; n = n + 1u) {
        let accent = voxelSurfaceTable[base + ${W.accents}u + n];
        let bits = u32(accent.z);
        let blink = f32((bits >> ${a0.blinkShift}u) & 255u) * ${O7};
        if (blink <= 0.0 || accent.x <= 0.0 || ((bits & ${a0.top}u) != 0u && dir != 2u)) { continue; }
        let at = frame >> (level + vec3u(bits & 1u, (bits >> 1u) & 1u, 0u));
        let own = surf_hash(at.x, at.y, at.z, seed + 7u + n + (level.x << 8u) + (level.y << 16u) + (level.z << 24u));
        let phase = live.clock / blink + surf_unit(own);
        let epoch = floor(phase);
        let life = phase - epoch;
        var share = accent.x;
        let lean = f32((bits >> ${a0.catchShift}u) & 255u) / 255.0;
        if (lean > 0.0) {
          let mirror = pow(max(dot(reflect(-live.eye, nrm), live.sun), 0.0), ${Ej}.0);
          share = share * live.sunLight * (1.0 - lean * (1.0 - mirror));
        }
        var weight = f32(surf_unit(surf_hash(own, surf_word(epoch), 23u, seed)) < share) * smoothstep(0.0, ${b6}, life) * (1.0 - smoothstep(${1-b6}, 1.0, life)) * far * appear;
        let gate = (bits >> ${a0.gateShift}u) & 3u;
        if (gate == 1u) {
          weight = weight * f32(driftValue > accent.w) * fadeDrift;
        } else if (gate == 2u) {
          weight = weight * f32(fieldValue.x > accent.w) * fadeField;
        } else if (gate == 3u) {
          weight = weight * f32(fieldValue.z > accent.w) * fadeField;
        }
        if (weight > 0.0) {
          tone = surf_mix(tone, surf_accent(base, accent.y), weight);
        }
      }
    }
  }
  if (soft > 0.0) {
    tone = surf_mix(tone, surf_tone(voxelSurfaceTable[select(look.x, cap, cap != 0u) + ${W.classMean}u]), soft);
  }

  var rgb = tone.rgb;
  var roughness = tone.shade.x;
  var emissive = tone.rgb * (tone.shade.z * tone.shade.z * ${Y0}.0);

  if (state != 0u) {
    let stateRow = base + ${W.states}u + (state - 1u) * ${p$}u;
    let tint = voxelSurfaceTable[stateRow];
    let toward = voxelSurfaceTable[stateRow + 1u];
    let glow = voxelSurfaceTable[stateRow + 2u];
    emissive = emissive + glow.rgb * (${S7.floor} + ${S7.slope} * dot(rgb, vec3f(0.2126, 0.7152, 0.0722)));
    let dryRgb = rgb;
    let dryRoughness = roughness;
    rgb = mix(rgb * tint.rgb, toward.rgb, tint.w);
    roughness = wet_roughness(dryRgb, dryRoughness, rgb, mix(roughness, toward.w, glow.w));
  }

  var tilt = vec3f(0.0);
  if (edge.x != 0.0 && ((look.y >> ${f$}u) & 1u) == 0u) {
    let pixel = max(pixelMicro * cubeScale, 1e-6);
    let f = fract(microPos * cubeScale);
    let d = min(f, vec3f(1.0) - f);
    let lines = (vec3f(1.0) - smoothstep(vec3f(edge.y - pixel), vec3f(edge.y + pixel), d)) * (vec3f(1.0) - abs(nrm));
    let strength = edge.x * (1.0 - smoothstep(${s8.lo}, ${s8.hi}, pixel)) * appear;
    if (edge.z < 0.5) {
      rgb = rgb * (1.0 - strength * max(max(lines.x, lines.y), lines.z));
    } else {
      tilt = (step(vec3f(0.5), f) * 2.0 - vec3f(1.0)) * lines * strength;
    }
  }
  tilt = tilt + (vec3f(0.0, 1.0, 0.0) - nrm) * soft;
  return VoxelSurface(rgb, roughness, tone.shade.y, emissive, tilt, soft, cubeScale * ${y}.0);
}

fn voxel_surface_slant(look: vec2u, microOrigin: vec3i, microPos: vec3f, dx: vec3f, dy: vec3f, cubeScale: f32, live: VoxelSurfaceLive, taps: u32) -> VoxelSurface {
  let lx = length(dx);
  let ly = length(dy);
  let major = select(dy, dx, lx >= ly);
  let minor = select(dx, dy, lx >= ly);
  var base = look.x;
  let cap = u32(voxelSurfaceTable[base].z);
  if ((look.y & 7u) == 2u && cap != 0u) { base = cap; }
  let cellMicro = f32(1u << u32(voxelSurfaceTable[base].x));
  let features = voxelSurfaceTable[base + ${W.features}u];
  let widest = max(max(features.x, features.y), max(features.z, 1.0)) * cellMicro;
  let fwFar = abs(major / f32(taps)) + abs(minor);
  var n = u32(clamp(ceil(max(lx, ly) / max(min(lx, ly), ${o8.lo} * cellMicro)), 1.0, f32(taps)));
  if (max(max(fwFar.x, fwFar.y), fwFar.z) >= ${o8.hi} * widest) { n = 1u; }
  let stride = major / f32(n);
  let fw = abs(stride) + abs(minor);
  var sum = VoxelSurface();
  for (var i = 0u; i < n; i = i + 1u) {
    let s = voxel_surface(look, microOrigin, microPos + stride * (f32(i) + 0.5 - 0.5 * f32(n)), fw, cubeScale, live);
    sum = VoxelSurface(sum.rgb + s.rgb, sum.roughness + s.roughness, sum.metalness + s.metalness, sum.emissive + s.emissive, sum.tilt + s.tilt, sum.soft + s.soft, s.cube);
  }
  let w = 1.0 / f32(n);
  return VoxelSurface(sum.rgb * w, sum.roughness * w, sum.metalness * w, sum.emissive * w, sum.tilt * w, sum.soft * w, sum.cube);
}

fn voxel_surface_sky_wet(surfIn: VoxelSurface, look: vec2u, wet: f32) -> VoxelSurface {
  var surf = surfIn;
  if (wet <= 0.0 || look.x == 0u || (look.y & 7u) != 2u) { return surf; }
  var base = look.x;
  let cap = u32(voxelSurfaceTable[base].z);
  if (cap != 0u) { base = cap; }
  let tint = voxelSurfaceTable[base + ${W.states}u];
  let toward = voxelSurfaceTable[base + ${W.states}u + 1u];
  let glow = voxelSurfaceTable[base + ${W.states}u + 2u];
  surf.rgb = mix(surf.rgb, mix(surf.rgb * tint.rgb, toward.rgb, tint.w), wet);
  surf.roughness = wet_roughness(surfIn.rgb, surfIn.roughness, surf.rgb, mix(surf.roughness, toward.w, glow.w * wet));
  return surf;
}

fn voxel_surface_emissive(surfIn: VoxelSurface, look: vec2u, microOrigin: vec3i, microPos: vec3f, cubeScale: f32, now: f32) -> VoxelSurface {
  let words = voxelSurfaceTable[${G8}];
  if (words.z == 0.0) { return surfIn; }
  let dir = look.y & 7u;
  let axis = dir >> 1u;
  let nrm = vec3f(f32(axis == 0u), f32(axis == 1u), f32(axis == 2u)) * select(-1.0, 1.0, (dir & 1u) == 0u);
  let cell = vec3i(floor((vec3f(microOrigin) + microPos) * cubeScale - nrm * 0.5));
  let first = u32(words.x);
  let mask = u32(words.y);
  var mixed = (bitcast<u32>(cell.x) * 73856093u) ^ (bitcast<u32>(cell.y) * 19349663u) ^ (bitcast<u32>(cell.z) * 83492791u);
  mixed = (mixed ^ (mixed >> 16u)) * 0x45d9f3bu;
  var slot = (mixed ^ (mixed >> 16u)) & mask;
  for (var probe = 0u; probe < ${F7}u; probe = probe + 1u) {
    let at = first + slot * ${u$}u;
    let key = voxelSurfaceTable[at];
    if (key.w == 0.0) { return surfIn; }
    if (i32(key.x) == cell.x && i32(key.y) == cell.y && i32(key.z) == cell.z) {
      let shown = voxelSurfaceTable[at + 1u];
      let given = voxelSurfaceTable[at + 2u];
      var age = now - shown.w;
      if (age < -0.5 * ${X7}.0) { age = age + ${X7}.0; }
      var surf = surfIn;
      surf.emissive = surf.emissive + mix(shown.rgb, given.rgb, clamp(age * 1000.0 / ${g6}.0, 0.0, 1.0));
      return surf;
    }
    slot = (slot + 1u) & mask;
  }
  return surfIn;
}
`,b7=4,V0=3*b7,b0=1,t0=3,h7=4,P8=`fn surf_endPlace(d: vec2f) -> f32 {
  let run = abs(d.x) + abs(d.y);
  if (run <= 0.0) { return 0.0; }
  return 2.0 * select(select(3.0 + d.x / run, 2.0 - d.y / run, d.x <= 0.0), select(1.0 - d.x / run, d.y / run, d.x >= 0.0), d.y >= 0.0);
}

fn surf_endKnot(e0: vec4f, e1: vec4f, sector: u32) -> f32 {
  return select(e1[sector & 3u], e0[sector & 3u], sector < 4u);
}

fn surf_endAt(e0: vec4f, e1: vec4f, d: vec2f) -> f32 {
  let place = surf_endPlace(d);
  let at = floor(place);
  let i = u32(at) & 7u;
  return mix(surf_endKnot(e0, e1, i), surf_endKnot(e0, e1, (i + 1u) & 7u), place - at);
}

fn surf_endSpan(e0: vec4f, e1: vec4f, d: vec2f, spread: f32) -> f32 {
  let place = surf_endPlace(d);
  let lo = i32(floor(place - spread));
  let hi = i32(floor(place + spread)) + 1;
  var most = 0.0;
  for (var k = lo; k <= hi; k = k + 1) { most = max(most, surf_endKnot(e0, e1, u32(k + 16) & 7u)); }
  return most;
}`,c6=`${P8}

struct SurfGrown {
  rgb: vec3<f32>,
  worn: f32,
  lean: f32,
}

fn surf_grownClass(rgb: vec3f, look: vec2u, row: u32, toEye: vec3f, normal: vec3f) -> SurfGrown {
  var out: SurfGrown;
  out.rgb = rgb;
  out.worn = 0.0;
  out.lean = 0.0;
  let words = voxelSurfaceTable[${b0}];
  let share = voxelSurfaceTable[row];
  if (share.x <= 0.0) { return out; }
  var whole = words.y;
  var doublings = words.z;
  let blades = voxelSurfaceTable[${t0}u];
  var growthEnd = blades.w;
  if (share.w > 0.5) {
    if (blades.z > 0.5) {
      whole = blades.x;
      doublings = blades.y;
      growthEnd = 0.0;
    } else if (share.w > 1.5) {
      return out;
    }
  }
  let away = length(toEye);
  var unitAway = away;
  if (share.w < 0.5 && words.w > 0.0) { unitAway = away * words.w / f32(1u << u32(voxelSurfaceTable[look.x].x)); }
  var gone = clamp(log(max(unitAway, whole) / whole) / doublings, 0.0, 1.0);
  if (growthEnd > 0.0) {
    var end = growthEnd;
    if (away < growthEnd) { end = surf_endAt(voxelSurfaceTable[${h7}u], voxelSurfaceTable[${h7+1}u], toEye.xz); }
    gone = max(gone, clamp((away / end - ${_$}) / ${1-_$}, 0.0, 1.0));
  }
  if (gone <= 0.0) { return out; }
  let sine = abs(dot(normalize(normal), toEye)) / max(away, 1e-4);
  let cot = sqrt(max(1.0 - sine * sine, 0.0)) / max(sine, 0.02);
  let cover = 1.0 - (1.0 - share.x) * exp(-share.y * cot);
  let grown = voxelSurfaceTable[row + 1u];
  let top = voxelSurfaceTable[row + 2u];
  let low = 1.0 - exp(-cot * top.w);
  let luma = vec3f(0.2126, 0.7152, 0.0722);
  let walk = clamp(dot(rgb, luma) / max(grown.w, 1e-4), 0.5, 2.0);
  let worn = gone * cover;
  out.rgb = mix(rgb, mix(grown.rgb, top.rgb, low) * walk, worn);
  out.worn = worn;
  out.lean = mix(share.z, voxelSurfaceTable[row + 3u].x, low) * worn;
  return out;
}

fn surf_rootLean(toSun: vec3f, ground: vec3f, lean: f32) -> vec3f {
  return (toSun - ground * dot(toSun, ground)) * (0.25 * lean);
}

fn surf_grown(surf: VoxelSurface, look: vec2u, toEye: vec3f, normal: vec3f, toSun: vec3f) -> VoxelSurface {
  var out = surf;
  let region = u32(voxelSurfaceTable[${b0}].x);
  if (region == 0u || look.x < ${k}u || ((look.y >> 3u) & 7u) != 0u) { return out; }
  let dir = look.y & 7u;
  let klass = select(1u, select(2u, 0u, dir == 2u), (dir >> 1u) == 1u);
  let first = region + ((look.x - ${k}u) / ${n}u) * ${V0}u;
  let own = surf_grownClass(surf.rgb, look, first + klass * ${b7}u, toEye, normal);
  out.rgb = own.rgb;
  let n = normalize(normal);
  out.tilt = surf.tilt + surf_rootLean(toSun, n, own.lean);
  if (klass != 1u || ((look.y >> ${e8}u) & 1u) == 0u) { return out; }
  let up = vec3f(0.0, 1.0, 0.0);
  let hid = max(min(voxelSurfaceTable[first + 3u].y * surf.cube, 1.0), surf.soft);
  let riser = surf_grownClass(own.rgb, look, first, toEye, up);
  let worn = riser.worn * hid;
  if (worn <= 0.0) { return out; }
  let soft = max(surf.soft, worn);
  let cap = u32(voxelSurfaceTable[look.x].z);
  let toned = mix(own.rgb, surf_tone(voxelSurfaceTable[select(look.x, cap, cap != 0u) + ${W.classMean}u]).rgb, (soft - surf.soft) / max(1.0 - surf.soft, 1e-4));
  out.rgb = mix(toned, surf_grownClass(toned, look, first, toEye, up).rgb, hid);
  out.tilt = surf.tilt + (up - n) * (soft - surf.soft) + surf_rootLean(toSun, up, riser.lean * hid);
  out.soft = soft;
  return out;
}`,d6=($)=>`  if (in.look.x != 0u) { surf = surf_grown(surf, in.look, in.worldPos - frame.cameraPosition, in.worldNormal, ${$}); }`,Q9=0.07,i6=`fn voxel_paneHash(cell: vec2i, salt: u32) -> f32 {
  var h = (bitcast<u32>(cell.x) * 0x9E3779B1u) ^ (bitcast<u32>(cell.y) * 0x85EBCA77u) ^ (salt * 0xC2B2AE3Du);
  h = (h ^ (h >> 15u)) * 0x2C1B3C6Du;
  h = (h ^ (h >> 12u)) * 0x297A2D39u;
  return f32((h ^ (h >> 15u)) >> 8u) / 16777216.0;
}
fn voxel_paneSwell(p: vec2f) -> vec2f {
  let i = vec2i(floor(p));
  let f = fract(p);
  let a = voxel_paneHash(i, 1u);
  let b = voxel_paneHash(i + vec2i(1, 0), 1u);
  let c = voxel_paneHash(i + vec2i(0, 1), 1u);
  let d = voxel_paneHash(i + vec2i(1, 1), 1u);
  let u = f * f * (vec2f(3.0) - 2.0 * f);
  let k = a - b - c + d;
  return 6.0 * f * (vec2f(1.0) - f) * vec2f((b - a) + k * u.y, (c - a) + k * u.x);
}`,n6=`  let paneAcross = vec3f(1.0) - abs(normalize(in.worldNormal));
  let paneP = in.worldPos + (vec3f(0.5) - fract(in.microPos * in.cubeScale)) * paneAcross / (in.cubeScale * ${y}.0);
  let paneV = ${w0("frame.cameraPosition - paneP")};
  let paneCube = vec3f(in.microOrigin) * in.cubeScale + floor(in.microPos * in.cubeScale);
  let paneAt = paneCube.xz + vec2f(0.5);
  let paneCalm = (1.0 - smoothstep(0.35, 1.0, max(microFw.x, microFw.z) * in.cubeScale)) * step(0.5, abs(in.worldNormal.y));
  let paneLean = select(${Q9}, voxelSurfaceTable[in.look.x + ${s.flow}u].w, in.look.x != 0u);
  let paneRise = min(4.0 * abs(dot(N, paneV)), 1.0);
  let paneSlope = paneLean * paneCalm * paneRise * paneRise * paneRise * (0.6 * voxel_paneSwell(paneAt / 6.7) + 0.4 * voxel_paneSwell(mat2x2<f32>(0.8, -0.6, 0.6, 0.8) * paneAt / 3.9 + vec2f(17.0, 43.0)));
  let paneN = normalize(N + vec3f(-paneSlope.x, 0.0, -paneSlope.y));`;var x0=1073741824,w=function(a,b,c,d){return (w=$c0C(1)).call(this,a,b,c,d)},S=($)=>($>>>8)/16777216,I0=($,J)=>Math.imul($,J)>>>0,K9=2654435761,X9=2246822519,l6=3266489917,Oj=668265263,e0=($,J)=>Math.floor(($+0.5)/J),j9=($,J,Q)=>$*(1-Q)+J*Q,q9=($,J,Q)=>($>J?1:0)-($<Q?1:0);var $7=[0.5,0.5,0.5];function o6(a,b,c,d,e){return (o6=$c0C(2)).call(this,a,b,c,d,e)}function s6(a,b,c,d,e){return (s6=$c0C(3)).call(this,a,b,c,d,e)}function n$($,J,Q,Z){let j=Math.floor($),q=S(w(j,J,Q,Z)),Y=S(w(j+1,J,Q,Z));return j9(q,Y,(($-j)*($-j)*(3-2*($-j))))}function r$(a,b){return (r$=$c0C(4)).call(this,a,b)}var b={base:0,joint:0,rim:0,laid:-1},B,c$=($,J,Q,Z)=>Math.floor((S(w($,J,13,Q))-0.5)*(2*Z+1)+0.5),H9={index:0,inRun:0};function bj(a,b,c,d,e){return (bj=$c0C(6)).call(this,a,b,c,d,e)}function wj(a,b,c,d,e){return (wj=$c0C(7)).call(this,a,b,c,d,e)}var x=Math.fround,Z9=x(t8);function _j(a,b,c,d,e,f){return (_j=$c0C(8)).call(this,a,b,c,d,e,f)}function gj(a,b){return (gj=$c0C(9)).call(this,a,b)}var Y9={lid:!1};function kj(a,b,c,d){return (kj=$c0C(10)).call(this,a,b,c,d)}function F9(a,b,c,d,e,f){return (F9=$c0C(11)).apply(this,arguments)}var w7=($,J)=>w($,J,0,24301)&65535,l$=($,J)=>$-J;function U9($,J,Q){let Z=new Float64Array(Q);for(let j=0;j<Q;j+=1)o6(x0+w7(j,1),x0+w7(j,2),x0+w7(j,3),$,J+2),Z[j]=$7[0];return Z.sort(l$)}function a6($,J,Q){let Z=new Float64Array(Q);for(let j=0;j<Q;j+=1)Z[j]=s6(x0+w7(j,4),x0+w7(j,5),2,$,J+3);return Z.sort(l$)}function t6($,J,Q){let Z=new Float64Array(Q);for(let j=0;j<Q;j+=1)Z[j]=n$((w7(j,6)+0.5)/$,x0+j,x0,J+6);return Z.sort(l$)}var G9=function($,J){if(J.over>=100)return $.colours[J.over-100];return $.tones[J.over>=0?J.over:J.tone]};var BH=({tone:0,over:-1,base:0,cellWalk:0,fieldWalk:0,driftWalk:0,joint:0});var N9=["wet","hot","frozen","burnt","hot2","hot3"],U7=[[0,0,0],[0.6,0.07,0.008],[0,0,0],[0,0,0],[1.15,0.27,0.03],[1.7,1,0.38]];var z8=[{tint:[0.49,0.5,0.54],toward:[0,0,0],amount:0,rough:0.2,roughAmount:0.75,glow:U7[0]},{tint:[0.42,0.28,0.24],toward:[0.32,0.035,0.008],amount:0.18,rough:1,roughAmount:0,glow:U7[1]},{tint:[1,1,1],toward:[0.72,0.84,1],amount:0.58,rough:0.28,roughAmount:0.6,glow:U7[2]},{tint:[0.2,0.18,0.17],toward:[0.012,0.011,0.01],amount:0.55,rough:1,roughAmount:0.9,glow:U7[3]},{tint:[0.46,0.3,0.25],toward:[0.5,0.09,0.015],amount:0.2,rough:1,roughAmount:0,glow:U7[4]},{tint:[0.6,0.5,0.4],toward:[0.95,0.62,0.25],amount:0.35,rough:1,roughAmount:0,glow:U7[5]}];var fj;var T=($,J,Q,Z)=>A(A0($)??J,Q,Z);var H0=($,J,Q,Z)=>Math.round(T($,J,Q,Z));var C0=($,J,Q,Z)=>A(Math.round(Math.log2(Math.max(A0($)??J,0.000001))),Q,Z);var J0=($)=>Array.isArray($)?$:[];var G0=($)=>m0($)?$:void 0;var qJ=function($,J,Q,Z){if(!Array.isArray($))return[H0($,J,Q,Z),0];let j=H0($[0],J,Q,Z);return[j,H0($[1],j,j,Z)-j]};var P9=function($){let J=g7($);return J===void 0?void 0:_7(J&16777215)};var YJ=function(a,b){return (YJ=$c0C(13)).call(this,a,b)};var pj=function($,J){let Q=[];for(let Z of $??[]){let j=YJ(Z,J);if(j&&Q.length<F8)Q.push(j)}if(Q.length===0)Q.push({rgb:J.rgb,roughness:J.roughness,metalness:J.metalness,glow:0});return Q};var o$=1024;var z9=function($,J,Q){return[J>0?($[A(Math.floor((1-J)*$.length),0,$.length-1)]??0.5):2,Q>0?($[A(Math.floor(Q*$.length),0,$.length-1)]??0.5):-1]};var cj=function(a,b){return (cj=$c0C(14)).call(this,a,b)};var dj=function(a,b){return (dj=$c0C(15)).call(this,a,b)};var ij=function(a,b,c){return (ij=$c0C(16)).call(this,a,b,c)};var nj=function($,J){let Q=J0(Array.isArray($)?$:[$,$,0]),Z=J(Q[0],0);return{a:Z,b:J(Q[1],Z),share:T(Q[2],0,0,1)}};var rj=function($){let J=G0($),Q=A0($),Z=T(J?J.up:Q,0,0,0.5),j=T(J?J.down:Q,0,0,0.5);return Z>0||j>0?{up:Z,down:j,pairs:J?.pairs===!0}:null};var lj={x:0,y:1,z:2,along:3,up:4};var oj=function(a,b){return (oj=$c0C(17)).call(this,a,b)};var sj=function($,J){if(!$||!J)return null;let Q=T($.up,0,0,0.5),Z=T($.down,0,0,0.5);if(Q<=0&&Z<=0)return null;let[j,q]=z9(J,Q,Z);return{hi:j,lo:q}};var aj={drift:1,blobs:2,spots:3};var s$=($)=>aj[typeof $.in==="string"?$.in:""]??0;var tj=function(a,b,c,d,e){return (tj=$c0C(18)).call(this,a,b,c,d,e)};var ej=function(a,b,c,d,e){return (ej=$c0C(19)).call(this,a,b,c,d,e)};var $2=1;var J2=($)=>Array.isArray($)&&$.length===2&&typeof $[0]==="number"&&typeof $[1]==="number"?[$[0],$[1]]:void 0;var Q2=function($){let J=T($.flowSpeed,0,0,$2)*QJ;if(J<=0)return null;let[Q,Z]=ZJ(J2($.flowDirection));return{x:Q*J,z:Z*J,fall:J}};var Z2=1;var j2=function($){let J=A0($.waveIntensity);return J===void 0?Q9:A(J,0,Z2)*Q9/JJ};var q2;var Y2={size:4,up:0.24,down:0.24};var V2=0.06;function VJ(a,b){return (VJ=$c0C(21)).call(this,a,b)}var e6=new WeakMap,H2=16;function HJ(a,b,c){return (HJ=$c0C(22)).call(this,a,b,c)}var B9=1024;var K2=256;var f0=function($,J){let Q=Math.imul($+1,2654435761)^Math.imul(J,2246822519);return Q=Math.imul(Q^Q>>>15,739982445),(Q^Q>>>13)>>>0&65535};var M9=()=>({r:0,g:0,b:0,roughness:0,metalness:0,glow:0,count:0});var I9=function($,J){if(!J)return;$.r+=J.rgb[0],$.g+=J.rgb[1],$.b+=J.rgb[2],$.roughness+=J.roughness,$.metalness+=J.metalness,$.glow+=J.glow,$.count+=1};var C9=function($,J){if($.count===0)return J;let Q=1/$.count;return{rgb:[$.r*Q,$.g*Q,$.b*Q],roughness:$.roughness*Q,metalness:$.metalness*Q,glow:$.glow*Q}};var a$=B9+K2;var KJ=($)=>(KJ=$c0C(23))($);function XJ(a,b){return (XJ=$c0C(24)).call(this,a,b)}function X2(a){return (X2=$c0C(25)).call(this,a)}var F2=256,k7=new Map,D9=new Map,FJ=($)=>JSON.stringify($,(J,Q)=>J==="clear"?void 0:Q);function UJ($,J){if(k7.size>=F2)W9(k7);k7.set($,J)}function NJ($){let J=FJ($),Q=k7.get(J);if(Q!==void 0)return Q;let Z=D9.get(J)??KJ($);XJ(Z,a$);{let $$1=J,J$1=Z;{let $=$$1,J=J$1;D9.delete($);let Q=X2(J);UJ($,Q);return Q}}}function PJ(a,b){return (PJ=$c0C(26)).call(this,a,b)}var U2=29;var T9=($,J)=>({rgb:[$[J]??0,$[J+1]??0,$[J+2]??0],roughness:$[J+3]??0,metalness:$[J+4]??0,glow:$[J+5]??0});function zJ(a){return (zJ=$c0C(27)).call(this,a)}var x9=($)=>Math.round(A($.roughness,0,1)*255)+256*Math.round(A($.metalness,0,1)*15)+4096*Math.round(Math.sqrt(A($.glow,0,Y0)/Y0)*15);function G2(a,b){return (G2=$c0C(28)).call(this,a,b)}function N2(a,b){return (N2=$c0C(29)).call(this,a,b)}var e$=($)=>$.accents.some((J)=>J.share>0&&J.blink>0),vJ=function(a){return (vJ=$c0C(30)).call(this,a)},P2=($)=>e$($)||$.cap!==null&&e$($.cap),z2=($)=>$.flow!==null||$.cap!==null&&$.cap.flow!==null;function M2(a,b,c,d){return (M2=$c0C(31)).call(this,a,b,c,d)}function I2(a,b,c,d,e){return (I2=$c0C(32)).call(this,a,b,c,d,e)}var MJ=16,C2=450;function T2(){return (T2=$c0C(33)).call(this)}var I8=($)=>k+$*n;function B2($){let J=$.free.pop();if(J!==void 0)return J;if($.next>=$.capacity){if($.capacity*=2,$.data=M8($.data,(k+$.capacity*n)*4),$.grown)$.grown=M8($.grown,$.capacity*V0*4),$.data[b0*4]=$.data.length/4}return $.next+=1,$.next-1}var D2=1e9,m7=($)=>Math.floor(($-k)/n);function xJ($,J,Q){let Z=m7(J);if(Z<0||Z>=$.capacity)return;if(Q===null)$.ownGrown.delete(Z);else $.ownGrown.set(Z,Q.slice(0,V0*4));A9($,Z)}function Q5($,J,Q){let Z=m7(J);if(Z<0||Z>=$.capacity)return;if(Q===null){if(!$.layerGround.delete(Z))return}else $.layerGround.set(Z,Q);A9($,Z)}function W2(a,b){return (W2=$c0C(34)).call(this,a,b)}function A9(a,b){return (A9=$c0C(35)).call(this,a,b)}function AJ(a,b,c){return (AJ=$c0C(36)).apply(this,arguments)}function Z5(a,b,c,d){return (Z5=$c0C(37)).call(this,a,b,c,d)}var $5=8,IJ=Array.from({length:$5},($,J)=>h7*4+J);function RJ(a,b){return (RJ=$c0C(38)).apply(this,arguments)}function v2(a,b){return (v2=$c0C(39)).call(this,a,b)}function LJ($,J){let Q=s,Z=$.data,j=Z[(J+Q.head)*4+2]??0,q=(Y)=>[Z[Y*4]??0,Z[Y*4+1]??0,Z[Y*4+2]??0];return[q((j>0?j:J)+Q.classMean),q(J+Q.classMean+1),q(J+Q.classMean+2)]}function CJ(a,b,c,d,e){return (CJ=$c0C(40)).call(this,a,b,c,d,e)}function v9($,J){let Q=$.slots.get(J);if(!Q)return;if($.slots.delete(J),$.free.push(Q.slot),$.ownGrown.delete(Q.slot),$.layerGround.delete(Q.slot),$.grown)A9($,Q.slot)}function x2(a,b,c,d){return (x2=$c0C(41)).call(this,a,b,c,d)}function A2($,J){for(let Q of[...$.slots.keys()])if(Q.startsWith(J))v9($,Q)}function R2(a,b){return (R2=$c0C(42)).call(this,a,b)}var L2=($)=>$.terms|($.data[X8]>1?65536:0);function y2($,J){if($.data[X8]===J)return!1;return $.data[X8]=J,$.dirty??="head",!0}var S2=64;var f=u$*4;var yJ=function(a,b,c){return (yJ=$c0C(43)).call(this,a,b,c)};var J5=function($,J){let Q=$.emissiveDirty;if(Q===null)$.emissiveDirty=[J,J];else{if(J<Q[0])Q[0]=J;if(J>Q[1])Q[1]=J}};function TJ($,J){let Q=new Float32Array(J*f),Z=J-1;for(let j of $.values()){let q=N8(j.x,j.y,j.z)&Z,Y=0;while(Y<F7&&Q[q*f+3]!==0)q=q+1&Z,Y+=1;if(Y===F7)return null;yJ(Q,q,j)}return Q}function t$(a,b){return (t$=$c0C(44)).call(this,a,b)}function b2(a,b){return (b2=$c0C(45)).call(this,a,b)}function w2($,J,Q){return WJ(J,{label:"terrain voxel surface table",size:Q*16,usage:128|8},function(){{$.dirty="rows",$.revision+=1}})}function _2(a,b){return (_2=$c0C(46)).call(this,a,b)}var W8=6,u9=4,Y5=2,B7={place:0,shape:1,tone:2,counts:3,own:4,head:4+u9},t=4+u9+Y5,T0=1+W8*t,a={top:1,side:2,under:4},c9=0.3,T8=[0.5,0.625,0.75,0.875,1];function d9($){let J=0;for(let Q of T8)J+=Math.min(Q*$/c9,1);return J/T8.length}var i9=1.6,n9=0.6,uJ=8,r7=4,u0=4,N7=4096,K0=4,cJ=30,f7={keepMask:16383,epochShift:14,keptShift:22},j5=29,r9=8,C8=6,R0=3,dJ=($)=>Math.floor(Math.log2(Math.max(r9*$,1))),J7=255,iJ=256,v8=512,V5=10,P7=4194303,u7=64,S0=pJ,x8=Math.ceil(S0/1000*u7),p0=32,l7=16+p0,l9=10,H5={standing:12,kept:13},p7=0.015625,o9=8,z7=2,R9=16,s9=20,nJ=268435455,k2=268435455,rJ=28,G7={counted:1,unclaimed:2},A8={written:1,standing:2,oneWalk:4},L9=64,a9=16,K5=16,X0={walk:0,plan:1,seal:2,wipe:3,keep:4,back:5},lJ=4,R8=[2,0,1,2,3,0,4,0,3,4,5,0,6,0,5,6,1,0],oJ=($)=>Array.from({length:Math.max(1,$)},(J,Q)=>R8.map((Z)=>Z+7*Q)).flat(),X5=128,t9=96;function e9(a,b){return (e9=$c0C(47)).call(this,a,b)}var m2=["surf_hash","surf_unit","surf_field"].map(($)=>e9(k0,$)).join(`

`),N0=B7,P0=y,sJ=`struct GrowthScan {
  anchor: vec4<i32>,
  eye: vec4<f32>,
  reach: vec4<f32>,
  caps: vec4<u32>,
  bound: vec4<f32>,
  ends: array<vec4<f32>, 2>,
  room: vec4<f32>,
}
//`,f2=`@group(0) @binding(0) var<uniform> uniforms: GrowthScan;
@group(0) @binding(1) var<storage, read> quadWords: array<vec2<u32>>;
@group(0) @binding(2) var<storage, read> quadChunkRefs: array<u32>;
@group(0) @binding(3) var<storage, read> chunkParams: array<vec4<f32>>;
@group(0) @binding(4) var<storage, read> palette: array<vec4<f32>>;
@group(0) @binding(5) var<storage, read> voxelChunkCells: array<vec4<i32>>;
@group(0) @binding(6) var<storage, read> growthTable: array<vec4<f32>>;

${b9}`,aJ=`struct GrowthQuad {
  ok: bool,
  dir: u32,
  faceBit: u32,
  block: u32,
  lookRow: u32,
  shift: u32,
  seed: u32,
  ring: u32,
  widest: f32,
  slot: u32,
  word: u32,
  origin: vec3<i32>,
  fieldMicro: i32,
  offset: i32,
  slab: i32,
  u0: i32,
  v0: i32,
  spanU: i32,
  spanV: i32,
  kept: u32,
}

fn growth_place(axis: u32, n: i32, u: i32, v: i32) -> vec3<i32> {
  if (axis == 0u) { return vec3<i32>(n, v, u); }
  if (axis == 1u) { return vec3<i32>(u, n, v); }
  return vec3<i32>(u, v, n);
}

fn growth_placef(axis: u32, n: f32, u: f32, v: f32) -> vec3<f32> {
  if (axis == 0u) { return vec3<f32>(n, v, u); }
  if (axis == 1u) { return vec3<f32>(u, n, v); }
  return vec3<f32>(u, v, n);
}

fn growth_split(axis: u32, p: vec3<i32>) -> vec3<i32> {
  if (axis == 0u) { return vec3<i32>(p.x, p.z, p.y); }
  if (axis == 1u) { return vec3<i32>(p.y, p.x, p.z); }
  return vec3<i32>(p.z, p.x, p.y);
}

fn growth_splitf(axis: u32, p: vec3<f32>) -> vec3<f32> {
  if (axis == 0u) { return vec3<f32>(p.x, p.z, p.y); }
  if (axis == 1u) { return vec3<f32>(p.y, p.x, p.z); }
  return vec3<f32>(p.z, p.x, p.y);
}`,p2=`fn growth_faces(base: u32) -> u32 {
  return u32(growthTable[base + ${N0.place}u].x);
}

fn growth_quad(quad: u32) -> GrowthQuad {
  var q: GrowthQuad;
  q.ok = false;
  let chunkSlot = quadChunkOf(quad);
  if (chunkSlot == ${O9}u) { return q; }
  let words = quadWords[quad];
  let placement = words.x;
  let value = words.y;
  if ((placement & ${E7>>>0}u) != 0u) { return q; }
  q.offset = i32((value >> 25u) & 0x7fu);
  if (q.offset != 0 && (placement & 7u) != 2u) { return q; }
  let params = chunkParams[chunkSlot];
  let matIdx = value & ${m9}u;
  ${p9("row")}
  if (((value >> 24u) & 1u) != 0u && (((placement & 7u) >> 1u) == 1u || palette[row].w > 0.0)) { return q; }
  let cover = palette[row + ${f9}u];
  let lookRow = u32(cover.z + 0.5);
  if (lookRow < ${k}u || cover.w > 0.5) { return q; }
  let block = ((lookRow - ${k}u) / ${n}u) * ${T0}u;
  if (block + ${T0}u > arrayLength(&growthTable)) { return q; }
  let head = growthTable[block];
  if (head.x < 0.5) { return q; }
  q.dir = placement & 7u;
  q.faceBit = select(${a.side}u, select(${a.under}u, ${a.top}u, q.dir == 2u), (q.dir >> 1u) == 1u);
  if ((u32(head.w) & q.faceBit) == 0u) { return q; }
  q.widest = max(f32(u32(head.w) >> 3u), 1.0);
  q.shift = u32(head.y);
  q.fieldMicro = i32(params.x * ${P0}.0 + 0.5);
  if (q.fieldMicro < (1 << q.shift) || (q.fieldMicro & (q.fieldMicro - 1)) != 0) { return q; }
  if ((q.offset & ((1 << q.shift) - 1)) != 0) { return q; }
  q.block = block;
  q.lookRow = lookRow;
  q.seed = u32(head.z);
  q.ring = (value >> 16u) & 0xffu;
  let chunkRow = voxelChunkCells[chunkSlot];
  q.origin = chunkRow.xyz;
  q.slot = chunkSlot;
  q.word = bitcast<u32>(chunkRow.w);
  q.slab = i32((placement >> 3u) & 0x1fu);
  q.u0 = i32((placement >> 8u) & 0x1fu);
  q.v0 = i32((placement >> 13u) & 0x1fu);
  q.spanU = i32(((placement >> 18u) & 0x1fu) + 1u);
  q.spanV = i32(((placement >> 23u) & 0x1fu) + 1u);
  q.ok = true;
  return q;
}`,tJ=`
struct GrowthRect {
  ok: bool,
  rootN: i32,
  lo: vec2<i32>,
  hi: vec2<i32>,
  cellU0: i32,
  cellV0: i32,
  anchorCell: vec3<i32>,
  anchorSplit: vec3<i32>,
  anchorLow: vec3<f32>,
  eyeCells: vec3<f32>,
  cellMetres: f32,
  reachForms: f32,
}

fn growth_rect(q: GrowthQuad) -> GrowthRect {
  var r: GrowthRect;
  r.ok = false;
  let axis = q.dir >> 1u;
  let positive = (q.dir & 1u) == 0u;
  let shift = q.shift;
  let k = q.fieldMicro >> shift;
  let o = growth_split(axis, q.origin);
  r.rootN = ((o.x + (q.slab + select(0, 1, positive)) * q.fieldMicro - q.offset) >> shift) - select(1, 0, positive);
  r.cellU0 = (o.y + q.u0 * q.fieldMicro) >> shift;
  r.cellV0 = (o.z + q.v0 * q.fieldMicro) >> shift;
  r.anchorCell = uniforms.anchor.xyz >> vec3<u32>(shift);
  r.cellMetres = f32(1u << shift) / ${P0}.0;
  r.anchorLow = vec3<f32>((r.anchorCell << vec3<u32>(shift)) - uniforms.anchor.xyz) / ${P0}.0;
  let eyeCells = growth_splitf(axis, (uniforms.eye.xyz - r.anchorLow) / r.cellMetres);
  r.eyeCells = eyeCells;
  r.anchorSplit = growth_split(axis, r.anchorCell);
  let endReach = select(1e9, uniforms.reach.z, uniforms.reach.z > 0.0);
  r.reachForms = min(uniforms.reach.y * q.widest * r.cellMetres, endReach);
  let reachCells = (r.reachForms + uniforms.eye.w) / r.cellMetres;
  let off = f32(r.rootN - r.anchorSplit.x) + 0.5 - eyeCells.x;
  let circle2 = reachCells * reachCells - off * off;
  if (circle2 <= 0.0) { return r; }
  let circle = sqrt(circle2);
  r.lo = vec2<i32>(max(r.cellU0, (r.anchorSplit.y + i32(floor(eyeCells.y - circle))) & (-4)), max(r.cellV0, (r.anchorSplit.z + i32(floor(eyeCells.z - circle))) & (-4)));
  r.hi = vec2<i32>(min(r.cellU0 + q.spanU * k, r.anchorSplit.y + i32(ceil(eyeCells.y + circle)) + 1), min(r.cellV0 + q.spanV * k, r.anchorSplit.z + i32(ceil(eyeCells.z + circle)) + 1));
  r.ok = all(r.hi > r.lo);
  return r;
}

fn growth_tiles(r: GrowthRect) -> vec2<u32> {
  return (vec2<u32>(r.hi - r.lo) + vec2<u32>(${R9-1}u)) / ${R9}u;
}`,eJ=[f2,aJ,p2,tJ].join(`

`),$$=[g(0,4,"uniform"),g(1,4,"read-only-storage"),g(2,4,"read-only-storage"),g(3,4,"read-only-storage"),g(4,4,"read-only-storage"),g(5,4,"read-only-storage"),g(6,4,"read-only-storage"),g(7,4,"storage"),g(uJ,4,"read-only-storage")],F5=[...$$.slice(0,7),g(7,4,"read-only-storage"),g(8,4,"storage")];function u2(){return`
${sJ}
${eJ}
${P8}
struct GrowthList {
  count: atomic<u32>,
  extra: atomic<u32>,
  pad1: u32,
  pad2: u32,
  pad3: u32,
  pad4: u32,
  pad5: u32,
  pad6: u32,
  entries: array<u32>,
}
@group(0) @binding(7) var<storage, read_write> list: GrowthList;
struct GrowthRanges {
  count: u32,
  total: u32,
  pad0: u32,
  pad1: u32,
  rows: array<vec4<u32>>,
}
@group(0) @binding(${uJ}) var<storage, read> ranges: GrowthRanges;

@compute @workgroup_size(${L9})
fn main(@builtin(global_invocation_id) gid: vec3<u32>, @builtin(num_workgroups) grid: vec3<u32>) {
  let at = gid.x + gid.y * grid.x * ${L9}u;
  if (at >= ranges.total) { return; }
  var lo = 0u;
  var hi = ranges.count;
  for (var step = 0u; step < 16u && lo + 1u < hi; step = step + 1u) {
    let mid = (lo + hi) / 2u;
    if (ranges.rows[mid].z <= at) { lo = mid; } else { hi = mid; }
  }
  let range = ranges.rows[lo];
  let quad = range.x + (at - range.z);
  if (at - range.z >= range.y || quad >= arrayLength(&quadWords)) { return; }
  let q = growth_quad(quad);
  if (!q.ok) { return; }
  if ((uniforms.caps.z & ${A8.written}u) != 0u && (q.word & ${iJ}u) == 0u) { return; }
  let axis = q.dir >> 1u;
  let o = growth_split(axis, q.origin - uniforms.anchor.xyz);
  let plane = f32(o.x + (q.slab + select(1, 0, (q.dir & 1u) != 0u)) * q.fieldMicro - q.offset) / ${P0}.0;
  let uLo = f32(o.y + q.u0 * q.fieldMicro) / ${P0}.0;
  let vLo = f32(o.z + q.v0 * q.fieldMicro) / ${P0}.0;
  let uHi = uLo + f32(q.spanU * q.fieldMicro) / ${P0}.0;
  let vHi = vLo + f32(q.spanV * q.fieldMicro) / ${P0}.0;
  let flags = range.w;
  if ((flags & ${G7.counted}u) != 0u) {
    if (q.dir == 2u) { return; }
    let aside = f32(1 << q.shift) / ${P0}.0;
    let tall = ${s9+1}.0 * aside;
    let boxLo = growth_splitf(axis, bitcast<vec4<f32>>(ranges.rows[${N7}u + 2u * lo]).xyz);
    let boxHi = growth_splitf(axis, bitcast<vec4<f32>>(ranges.rows[${N7}u + 2u * lo + 1u]).xyz);
    if (plane - tall > boxHi.x || plane + tall < boxLo.x || uLo - aside > boxHi.y || uHi + aside < boxLo.y || vLo - aside > boxHi.z || vHi + aside < boxLo.z) { return; }
  }
  let e = growth_splitf(axis, uniforms.eye.xyz);
  let nearest = distance(vec3<f32>(plane, clamp(e.y, uLo, uHi), clamp(e.z, vLo, vHi)), e);
  if (uniforms.reach.z > 0.0 && nearest > uniforms.reach.z + uniforms.eye.w) { return; }
  if (uniforms.reach.z > 0.0) {
    let mid = growth_placef(axis, plane, 0.5 * (uLo + uHi), 0.5 * (vLo + vHi)) - uniforms.eye.xyz;
    let half = 0.5 * length(vec2<f32>(uHi - uLo, vHi - vLo));
    if (nearest > surf_endSpan(uniforms.ends[0], uniforms.ends[1], mid.xz, min(2.0 * asin(min(half / max(length(mid.xz), half), 1.0)), 4.0)) + uniforms.eye.w) { return; }
  }
  let widestFar = uniforms.reach.y * q.widest * f32(1 << q.shift) / ${P0}.0;
  if (nearest > widestFar + uniforms.eye.w) { return; }
  let cellM = f32(1 << q.shift) / ${P0}.0;
  let farW = min(widestFar, select(1e9, uniforms.reach.z, uniforms.reach.z > 0.0));
  if (nearest - uniforms.eye.w - 3.0 * cellM > farW * uniforms.bound.x) { return; }
  let rect = growth_rect(q);
  if (!rect.ok) { return; }
  let cut = growth_tiles(rect);
  var tiles = cut.x * cut.y;
  if (tiles > 1u && (atomicLoad(&list.extra) >= uniforms.caps.w || atomicAdd(&list.extra, tiles - 1u) + tiles - 1u > uniforms.caps.w)) { tiles = 1u; }
  let whole = tiles == 1u && cut.x * cut.y > 1u;
  let index = atomicAdd(&list.count, tiles);
  if (index + tiles > uniforms.caps.x) { return; }
  for (var t = 0u; t < tiles; t = t + 1u) {
    list.entries[(index + t) * ${z7}u] = quad;
    list.entries[(index + t) * ${z7}u + 1u] = select(t, ${nJ}u, whole) | (flags << ${rJ}u);
  }
}`}function c2($,J={lanes:a9,entries:1}){let Q=J.lanes*J.entries;return`
const WALK_LANES: u32 = ${J.lanes}u;
const WALK_ENTRIES: u32 = ${J.entries}u;
${sJ}
${$===void 0?eJ:[$.bindings,aJ,$.quad,tJ].join(`

`)}
${fJ}
struct GrowthListRead {
  count: u32,
  pad0: u32,
  pad1: u32,
  pad2: u32,
  pad3: u32,
  pad4: u32,
  pad5: u32,
  pad6: u32,
  entries: array<u32>,
}
struct GrowthRecords {
  indexCount: u32,
  instanceCount: u32,
  firstIndex: u32,
  baseVertex: u32,
  firstInstance: u32,
  asked: atomic<u32>,
  listed: u32,
  counted: u32,
  cut: u32,
  share: f32,
  held: f32,
  pad1: u32,
  standing: u32,
  kept: atomic<u32>,
  pad4: u32,
  pad5: u32,
  bins: array<atomic<u32>, ${p0}>,
  words: array<atomic<u32>>,
}
@group(0) @binding(7) var<storage, read> list: GrowthListRead;
@group(0) @binding(8) var<storage, read_write> records: GrowthRecords;
@group(1) @binding(0) var<uniform> growthPass: vec4<u32>;

${m2}

${P8}

${q5}

fn growth_write(rel: vec3<i32>, footV: u32, shape: u32, home: u32, stands: u32) {
  let index = atomicAdd(&records.asked, 1u);
  if (index >= uniforms.caps.y) { return; }
  let base = index * ${K0}u;
  atomicStore(&records.words[base], u32(rel.x + 512) | (u32(rel.y + 512) << 10u) | (u32(rel.z + 512) << 20u) | ((footV - 1u) << ${cJ}u));
  atomicStore(&records.words[base + 1u], shape);
  atomicStore(&records.words[base + 2u], home);
  atomicStore(&records.words[base + 3u], stands);
}

struct GrowthClaim {
  slot: u32,
  word: u32,
  mask: u32,
}

fn growth_claim_of(rel: vec3<i32>) -> GrowthClaim {
  var claim: GrowthClaim;
  claim.mask = 0u;
  let bits = u32(uniforms.reach.w);
  if (bits < ${C8+R0-2}u || bits > 30u || any(rel < vec3<i32>(-512)) || any(rel > vec3<i32>(511))) { return claim; }
  let mixed = ((u32(rel.x + 512) | (u32(rel.y + 512) << 10u) | (u32(rel.z + 512) << 20u)) * 0x9E3779B1u) & 0x3fffffffu;
  claim.mask = (1u << bits) - 1u;
  claim.slot = mixed >> (30u - bits);
  claim.word = (mixed & ((1u << (30u - bits)) - 1u)) << ${C8+R0}u;
  return claim;
}

fn growth_shape(stackBits: u32, len: u32, width: u32, lift: u32, lateral: u32, kind: u32) -> u32 {
  return stackBits | ((len - 1u) << 3u) | ((width - 1u) << 7u) | (lift << 9u) | (lateral << 14u) | (kind << 17u);
}

struct GrowthFace {
  axis: u32,
  rootN: i32,
  rectLo: vec2<i32>,
  rectHi: vec2<i32>,
  seed: u32,
  ruleCount: u32,
  classes: u32,
  headed: u32,
  cellMetres: f32,
  anchorLow: vec3<f32>,
  anchorSplit: vec3<i32>,
  anchorCell: vec3<i32>,
  chunkCell: vec3<i32>,
  out: i32,
  rank: u32,
  unclaimed: bool,
}

fn growth_open(q: GrowthQuad, face: GrowthFace, at: vec2<i32>) -> u32 {
  let span = vec2<i32>(q.spanU, q.spanV);
  let cell = vec2<u32>(clamp((at - face.rectLo) / (q.fieldMicro >> q.shift), vec2<i32>(0), span - vec2<i32>(1)));
  let levels = voxel_classLevels(voxel_ringClasses(q.ring), cell, vec2<u32>(span));
  return min(min(levels.x, levels.y), min(levels.z, levels.w));
}

fn growth_cell(face: GrowthFace, layer: u32, cu: i32, cv: i32) -> vec3<i32> {
  return growth_place(face.axis, face.rootN + face.out * i32(layer), cu, cv) - face.anchorCell;
}

fn growth_claims(face: GrowthFace, lo: vec2<i32>, hi: vec2<i32>, first: u32, last: u32, counting: bool) -> u32 {
  if ((counting && face.rank <= 1u) || face.unclaimed) { return last; }
  for (var layer = first; layer < last; layer = layer + 1u) {
    for (var cv = lo.y; cv < hi.y; cv = cv + 1) {
      for (var cu = lo.x; cu < hi.x; cu = cu + 1) {
        let claim = growth_claim_of(growth_cell(face, layer, cu, cv));
        if (claim.mask == 0u) { continue; }
        let base = uniforms.caps.y * ${K0}u;
        var slot = claim.slot;
        var word = claim.word | select(0u, face.rank, counting);
        for (var step = 0u; step < select(${1<<C8}u, 128u, counting); step = step + 1u) {
          if (counting) {
            let held = atomicMax(&records.words[base + slot], word);
            if (held == 0u || (held >> ${R0}u) == (word >> ${R0}u)) { break; }
            let moved = min(held, word);
            if (((moved >> ${R0}u) & ${(1<<C8)-1}u) == ${(1<<C8)-1}u) { break; }
            word = moved + ${1<<R0}u;
          } else {
            let held = atomicLoad(&records.words[base + slot]);
            if ((held >> ${R0}u) == (word >> ${R0}u)) {
              if ((held & ${(1<<R0)-1}u) > face.rank) { return layer; }
              break;
            }
            if (held < word) { break; }
            word = word + ${1<<R0}u;
          }
          slot = (slot + 1u) & claim.mask;
        }
      }
    }
  }
  return last;
}

struct GrowthForm {
  ok: bool,
  rule: u32,
  height: u32,
  head: u32,
  width: u32,
  headed: bool,
  keep: f32,
  h: u32,
  h2: u32,
  root: vec2<i32>,
  lo: vec2<i32>,
  hi: vec2<i32>,
}

fn growth_class(width: u32) -> u32 {
  return select(select(2u, 1u, width == 2u), 0u, width == 1u);
}

fn growth_form(q: GrowthQuad, face: GrowthFace, klass: u32, cu: i32, cv: i32, counted: bool) -> GrowthForm {
  var form: GrowthForm;
  form.ok = false;
  form.headed = false;
  let size = 1 << klass;
  let root = vec2<i32>((cu >> klass) << klass, (cv >> klass) << klass);
  let u = bitcast<vec3<u32>>(growth_place(face.axis, face.rootN, root.x, root.y)) + vec3<u32>(0x40000000u);
  let mid = size >> 1u;
  let open = f32(growth_open(q, face, root)) / 3.0;
  let uf = bitcast<vec3<u32>>(growth_place(face.axis, face.rootN, root.x + mid, root.y + mid)) + vec3<u32>(0x40000000u);
  var picked = face.ruleCount;
  var inside = 0.0;
  var h = 0u;
  for (var r = 0u; r < face.ruleCount; r = r + 1u) {
    let base = q.block + 1u + r * ${t}u;
    let place = growthTable[base + ${N0.place}u];
    if ((growth_faces(base) & q.faceBit) == 0u) { continue; }
    let width = u32(clamp(growthTable[base + ${N0.shape}u].z, 1.0, 4.0));
    if (growth_class(width) != klass) { continue; }
    let ruleSeed = face.seed + 131u * (r + 1u);
    let tone = growthTable[base + ${N0.tone}u];
    if (counted && !(tone.x >= 0.5)) { continue; }
    let hr = surf_hash(u.x, u.y, u.z, ruleSeed + 17u);
    let most = place.w * f32(size * size) * clamp(1.0 + tone.y * (1.0 - 2.0 * open), 0.0, 2.0);
    if (surf_unit(hr) >= most) { continue; }
    let clump = u32(place.y);
    let field = surf_field(uf, vec3<u32>(clump & 7u, (clump >> 3u) & 7u, (clump >> 6u) & 7u), q.seed + 131u * (r + 1u)).x;
    let into = (field - place.z) / max(1.0 - place.z, 1e-3);
    if (into <= 0.0) { continue; }
    if (surf_unit(hr) >= most * mix(0.35, 1.0, sqrt(clamp(into, 0.0, 1.0)))) { continue; }
    picked = r;
    inside = into;
    h = hr;
    break;
  }
  if (picked >= face.ruleCount) { return form; }
  let r = picked;
  let base = q.block + 1u + r * ${t}u;
  let shape = growthTable[base + ${N0.shape}u];
  let tone = growthTable[base + ${N0.tone}u];
  let width = u32(clamp(shape.z, 1.0, 4.0));
  let ruleSeed = face.seed + 131u * (r + 1u);
  let keepUnit = surf_unit(surf_hash(u.x, u.y, u.z, face.seed + 977u));
  let span = f32(width) * face.cellMetres;
  let reachFar = uniforms.reach.y * span;
  let reachNear = min(uniforms.reach.x * span, reachFar);
  let thin = clamp(0.5 * keepUnit + 0.5 * (1.0 - sqrt(clamp(inside, 0.0, 1.0))), 0.0, 1.0);
  form.keep = reachNear * pow(reachFar / max(reachNear, 1e-4), 1.0 - thin);
  let h2 = surf_hash(u.x, u.y, u.z, ruleSeed + 29u);
  let tall = pow(clamp(inside, 0.0, 1.0), 0.6) * (0.4 + 0.6 * surf_unit(h2));
  form.height = u32(clamp(shape.x + floor((shape.y - shape.x + 0.999) * tall), 1.0, ${s9-4}.0));
  form.head = u32(clamp(tone.x, 0.0, 4.0));
  form.headed = tone.x >= 0.5;
  form.width = width;
  form.rule = r;
  form.h = h;
  form.h2 = h2;
  form.root = root;
  let at = root + vec2<i32>(i32((h2 >> 20u) & 1u), i32((h2 >> 21u) & 1u)) * (size - i32(width));
  form.lo = max(at, face.rectLo);
  form.hi = min(at + vec2<i32>(i32(width)), face.rectHi);
  form.ok = all(form.hi > form.lo);
  return form;
}
fn growth_under(form: GrowthForm, lo: vec2<i32>, hi: vec2<i32>) -> u32 {
  if (!form.ok || any(hi <= form.lo) || any(lo >= form.hi)) { return 0u; }
  return select(2u, 1u, all(lo >= form.lo) && all(hi <= form.hi));
}

fn growth_settle(q: GrowthQuad, face: GrowthFace, k: u32, cu: i32, cv: i32) -> GrowthForm {
  var main: GrowthForm;
  var yielding = false;
  var yk = 0u;
  var klass = 0u;
  var at = vec2<i32>(cu, cv);
  loop {
    let f = growth_form(q, face, select(k, yk, yielding), at.x, at.y, yielding);
    var next = false;
    if (!yielding) {
      main = f;
      if (k == 0u || !main.ok || main.headed) { break; }
      klass = growth_class(main.width);
      next = true;
    } else if (growth_under(f, main.lo, main.hi) != 0u) {
      main.ok = false;
      break;
    } else {
      let size = 1 << yk;
      at.x = at.x + size;
      if (at.x >= main.hi.x) {
        at.x = (main.lo.x >> yk) << yk;
        at.y = at.y + size;
        if (at.y >= main.hi.y) {
          yk = yk + 1u;
          next = true;
        }
      }
    }
    if (next) {
      while (yk < klass && (face.headed & (1u << yk)) == 0u) { yk = yk + 1u; }
      if (yk >= klass) { break; }
      yielding = true;
      at = (main.lo >> vec2<u32>(yk)) << vec2<u32>(yk);
    }
  }
  return main;
}

fn growth_keep_on(keep: f32, floorKeep: f32, cellMetres: f32) -> f32 {
  return min(keep, floorKeep - 4.0 * cellMetres);
}

fn growth_drawn(keep: f32, share: f32) -> f32 {
  return keep * share;
}

struct GrowthStand {
  ok: bool,
  keep: f32,
  bin: u32,
  draws: bool,
}

fn growth_stand(face: GrowthFace, form: GrowthForm, lift: u32, floorKeep: f32, counting: bool) -> GrowthStand {
  var stand: GrowthStand;
  stand.ok = false;
  if (form.height + form.head <= lift) { return stand; }
  let mid = vec2<f32>(form.lo + form.hi) * 0.5 - vec2<f32>(face.anchorSplit.yz);
  let centre = growth_placef(face.axis, f32(face.rootN - face.anchorSplit.x) + 0.5, mid.x, mid.y) * face.cellMetres + face.anchorLow;
  let d = distance(centre, uniforms.eye.xyz) - uniforms.eye.w;
  var keep = form.keep;
  if (lift > 0u) { keep = growth_keep_on(keep, floorKeep, face.cellMetres); }
  if (uniforms.reach.z > 0.0) { keep = min(keep, surf_endAt(uniforms.ends[0], uniforms.ends[1], (centre - uniforms.eye.xyz).xz)); }
  if (keep <= 0.0 || d > keep) { return stand; }
  stand.bin = min(u32(clamp(d / keep, 0.0, 0.999) * ${p0}.0), ${p0-1}u);
  stand.keep = keep;
  let oneWalk = (uniforms.caps.z & 4u) != 0u;
  let counts = counting || oneWalk;
  if (!counts && d > growth_drawn(keep, records.share)) { return stand; }
  if (oneWalk && !counting && d > growth_drawn(keep, select(1.0, min(records.held + ${2*p7}, 1.0), records.held > 0.0))) { return stand; }
  stand.draws = !counting && d <= growth_drawn(keep, records.share);
  stand.ok = true;
  return stand;
}

fn growth_aside(code: u32) -> vec2<i32> {
  return vec2<i32>(i32(code == 1u) - i32(code == 2u), i32(code == 3u) - i32(code == 4u));
}

fn growth_enters(q: GrowthQuad, face: GrowthFace, cu: i32, cv: i32, code: u32) -> bool {
  let to = vec2<i32>(cu, cv) + growth_aside(code);
  if (code == 0u || any(to < face.rectLo) || any(to >= face.rectHi)) { return false; }
  let u = bitcast<vec3<u32>>(growth_place(face.axis, face.rootN, to.x, to.y)) + vec3<u32>(0x40000000u);
  if ((surf_hash(u.x, u.y, u.z, face.seed + 4051u) & 3u) + 1u != code) { return false; }
  let cell = to;
  var bits = face.classes & 7u;
  var ok2 = false;
  var lo2 = vec2<i32>(0);
  var hi2 = vec2<i32>(0);
  while (bits != 0u) {
    let k = select(firstLeadingBit(bits), 0u, (bits & 1u) != 0u);
    bits = bits & ~(1u << k);
    let f = growth_settle(q, face, k, cell.x, cell.y);
    if (!f.ok) { continue; }
    if (k == 0u) { return false; }
    let over = growth_under(f, cell, cell + vec2<i32>(1)) == 1u;
    if (k == 2u) {
      if (over) { return false; }
      ok2 = true;
      lo2 = f.lo;
      hi2 = f.hi;
    } else if (over && !(ok2 && !(any(f.hi <= lo2) || any(f.lo >= hi2)) && !(all(f.lo >= lo2) && all(f.hi <= hi2)))) {
      return false;
    }
  }
  return true;
}

fn growth_put(q: GrowthQuad, face: GrowthFace, form: GrowthForm, lift: u32, stand: GrowthStand, step: u32, side: u32, wind: u32, counting: bool) {
  let stepped = step != 0u;
  let bodyTop = select(form.height, form.height - 1u, stepped);
  let body = bodyTop > lift;
  let headLo = select(max(form.height, lift), form.height, stepped);
  let headTop = form.height + form.head;
  let headLen = select(0u, headTop - min(headLo, headTop), form.head > 0u);
  let bent = form.lo + growth_aside(step);
  let beside = form.lo + growth_aside(select(side, 0u, side == 5u));
  let sideLayer = form.height + ((form.h2 >> 17u) % max(form.head, 1u));
  if (counting || (uniforms.caps.z & 4u) != 0u) {
    atomicAdd(&records.bins[stand.bin], select(0u, 1u, body) + select(0u, 1u, stepped) + select(0u, 1u, headLen > 0u) + select(0u, 1u, side != 0u));
  }
  var own = 0u;
  var over = 0u;
  var aside = 0u;
  for (var box = 0u; box < 3u; box = box + 1u) {
    var lo = form.lo;
    var hi = form.hi;
    var first = lift;
    var last = select(headTop, bodyTop, stepped);
    if (box == 1u) {
      if (!stepped || (!counting && own != bodyTop)) { continue; }
      lo = bent;
      hi = bent + vec2<i32>(1);
      first = form.height - 1u;
      last = headTop;
    } else if (box == 2u) {
      if (side == 0u) { continue; }
      lo = beside;
      hi = beside + vec2<i32>(1);
      first = sideLayer;
      last = sideLayer + 1u;
    }
    let got = growth_claims(face, lo, hi, first, last, counting);
    if (box == 0u) { own = got; } else if (box == 1u) { over = got; } else { aside = got; }
  }
  if (counting || !stand.draws) { return; }
  if (stepped) { over = select(form.height - 1u, over, own == bodyTop); } else { over = own; }
  let bodyEnd = min(bodyTop, own);
  let headEnd = select(own, over, stepped);
  let rel = growth_place(face.axis, face.rootN, form.lo.x, form.lo.y) - face.chunkCell;
  if (any(rel < vec3<i32>(-512)) || any(rel > vec3<i32>(511))) { return; }
  let foot = vec2<u32>(form.hi - form.lo);
  let stands = u32(clamp(growth_drawn(stand.keep, records.share) * 32.0, 0.0, ${f7.keepMask}.0)) | ((q.word & 0xffu) << ${f7.epochShift}u) | (q.kept << ${f7.keptShift}u) | (wind << ${j5}u);
  let home = q.lookRow | (q.slot << 20u);
  let stackBits = q.dir | ((form.rule & 3u) << 18u) | ((form.rule >> 2u) << 30u) | (growth_open(q, face, form.lo) << 20u) | (((form.h >> 5u) & 7u) << 22u) | ((headTop - 1u) << 25u);
  for (var r = 0u; r < growthPass.w; r = r + 1u) {
    var on = false;
    var footV = 1u;
    var shape = 0u;
    if (r == 0u) {
      on = bodyEnd > lift;
      footV = foot.y;
      shape = growth_shape(stackBits, bodyEnd - lift, foot.x, lift, 0u, 0u);
    } else if (r == 1u) {
      on = stepped && over > form.height - 1u;
      shape = growth_shape(stackBits, 1u, 1u, form.height - 1u, step, 0u);
    } else if (r == 2u) {
      on = headLen > 0u && headEnd > headLo;
      footV = foot.y;
      shape = growth_shape(stackBits, headEnd - headLo, foot.x, headLo, step, 1u);
    } else {
      on = side != 0u && headEnd > sideLayer && aside > sideLayer;
      shape = growth_shape(stackBits, 1u, 1u, sideLayer, select(side, 0u, side == 5u), 1u);
    }
    if (on) { growth_write(rel, footV, shape, home, stands); }
  }
}
fn growth_walk(wg: vec3<u32>, lid0: vec3<u32>, grid: vec3<u32>, counting: bool) {
  let listed = min(list.count, uniforms.caps.x);
  let lid = vec3<u32>(lid0.x % WALK_LANES, 0u, 0u);
  for (var entry = wg.x * WALK_ENTRIES + lid0.x / WALK_LANES; entry < listed; entry += grid.x * WALK_ENTRIES) {
    growth_walkEntry(entry, lid, counting);
  }
}

fn growth_walkEntry(entry: u32, lid: vec3<u32>, counting: bool) {
  let tileWord = list.entries[entry * ${z7}u + 1u];
  let flags = tileWord >> ${rJ}u;
  if ((counting && (flags & ${G7.unclaimed}u) != 0u) || (!counting && (flags & ${G7.counted}u) != 0u)) { return; }
  let q = growth_quad(list.entries[entry * ${z7}u]);
  if (!q.ok) { return; }
  let rect = growth_rect(q);
  if (!rect.ok) { return; }
  var face: GrowthFace;
  face.axis = q.dir >> 1u;
  let axis = face.axis;
  let positive = (q.dir & 1u) == 0u;
  let k = q.fieldMicro >> q.shift;
  let rootN = rect.rootN;
  let cellMetres = rect.cellMetres;
  let anchorLow = rect.anchorLow;
  let anchorSplit = rect.anchorSplit;
  let anchorCell = rect.anchorCell;
  let reachForms = rect.reachForms;
  var lo = rect.lo;
  var hi = rect.hi;
  let tile = tileWord & ${k2}u;
  if (tile != ${nJ}u) {
    let across = growth_tiles(rect).x;
    lo = rect.lo + vec2<i32>(i32(tile % across), i32(tile / across)) * ${R9};
    hi = min(lo + vec2<i32>(${R9}), rect.hi);
    if (any(hi <= lo)) { return; }
  }
  let cellU0 = rect.cellU0;
  let cellV0 = rect.cellV0;
  face.rootN = rootN;
  face.rectLo = vec2<i32>(cellU0, cellV0);
  face.rectHi = vec2<i32>(cellU0 + q.spanU * k, cellV0 + q.spanV * k);
  face.seed = q.seed;
  face.ruleCount = min(u32(growthTable[q.block].x), ${W8}u);
  face.cellMetres = cellMetres;
  face.anchorLow = anchorLow;
  face.anchorSplit = anchorSplit;
  face.anchorCell = anchorCell;
  face.chunkCell = q.origin >> vec3<u32>(q.shift);
  face.out = select(-1, 1, positive);
  face.rank = select(select(2u + q.dir - select(0u, 2u, q.dir > 3u), 6u, q.dir == 3u), 1u, q.dir == 2u);
  face.unclaimed = (flags & ${G7.unclaimed}u) != 0u;
  face.classes = 0u;
  face.headed = 0u;
  for (var r = 0u; r < face.ruleCount; r = r + 1u) {
    let base = q.block + 1u + r * ${t}u;
    if ((growth_faces(base) & q.faceBit) == 0u) { continue; }
    let klass = 1u << growth_class(u32(clamp(growthTable[base + ${N0.shape}u].z, 1.0, 4.0)));
    face.classes = face.classes | klass;
    if (growthTable[base + ${N0.tone}u].x >= 0.5) { face.headed = face.headed | klass; }
  }
  let slack = 3.0 * cellMetres;
  let kept = select(records.share, 1.0, counting);
  let reachShare = select(records.share, select(1.0, min(records.held + ${2*p7}, 1.0), records.held > 0.0), counting || (uniforms.caps.z & 4u) != 0u);
  let eyeAt = vec2<f32>(f32(anchorSplit.y) + rect.eyeCells.y, f32(anchorSplit.z) + rect.eyeCells.z);
  let toTile = vec3<f32>(f32(rootN - anchorSplit.x) + 0.5 - rect.eyeCells.x, clamp(eyeAt, vec2<f32>(lo), vec2<f32>(hi)) - eyeAt);
  let tileNearest = length(toTile) * cellMetres - uniforms.eye.w;
  var least = 3u;
  for (var cl = 0u; cl < 3u; cl = cl + 1u) {
    if ((face.classes & (1u << cl)) == 0u) { continue; }
    if (tileNearest - slack <= growth_drawn(min(uniforms.reach.y * f32(1u << cl) * cellMetres, reachForms), reachShare)) {
      least = cl;
      break;
    }
  }
  if (least == 3u) { return; }
  face.classes = face.classes & ~((1u << least) - 1u);
  let step = 1 << least;
  let blockLo = (lo >> vec2<u32>(least)) << vec2<u32>(least);
  let blocksU = ((hi.x - 1) >> least) - (lo.x >> least) + 1;
  let blocks = blocksU * (((hi.y - 1) >> least) - (lo.y >> least) + 1);
  for (var c = i32(lid.x); c < blocks; c += i32(WALK_LANES)) {
    let here = blockLo + vec2<i32>(c % blocksU, c / blocksU) * step;
    let cu = here.x;
    let cv = here.y;
    let centre = growth_placef(axis, f32(rootN - anchorSplit.x) + 0.5, f32(cu - anchorSplit.y) + 0.5, f32(cv - anchorSplit.z) + 0.5) * cellMetres + anchorLow;
    let d = distance(centre, uniforms.eye.xyz) - uniforms.eye.w;
    if (d - slack > reachForms) { continue; }
    let across = (centre - uniforms.eye.xyz).xz;
    if (uniforms.reach.z > 0.0 && d - slack > surf_endSpan(uniforms.ends[0], uniforms.ends[1], across, min(2.0 * asin(min(slack / max(length(across), slack), 1.0)), 4.0))) { continue; }
    var lift1 = 0u;
    var floor1 = 1e9;
    var lift0 = 0u;
    var floor0 = 1e9;
    var ok2 = false;
    var lo2 = vec2<i32>(0);
    var hi2 = vec2<i32>(0);
    var hh2 = 0u;
    var keep2 = 0.0;
    let cell = vec2<i32>(cu, cv);
    var left = face.classes & 7u;
    while (left != 0u) {
      let k = firstLeadingBit(left);
      left = left & ~(1u << k);
      var form = growth_settle(q, face, k, cu, cv);
      if (k == 2u) {
        ok2 = form.ok;
        lo2 = form.lo;
        hi2 = form.hi;
        hh2 = form.height + form.head;
        keep2 = form.keep;
        if (growth_under(form, cell, cell + vec2<i32>(1)) == 1u) {
          lift0 = hh2;
          floor0 = keep2;
        }
      } else if (k == 1u) {
        if (form.ok) {
          var under = 0u;
          if (ok2 && !(any(form.hi <= lo2) || any(form.lo >= hi2))) { under = select(2u, 1u, all(form.lo >= lo2) && all(form.hi <= hi2)); }
          if (under == 2u) { form.ok = false; }
          if (under == 1u) {
            lift1 = hh2;
            floor1 = keep2;
            form.keep = growth_keep_on(form.keep, floor1, face.cellMetres);
          }
        }
        if (growth_under(form, cell, cell + vec2<i32>(1)) == 1u && form.height + form.head > lift0) {
          lift0 = form.height + form.head;
          floor0 = min(floor0, form.keep);
        }
      }
      if (!form.ok) { continue; }
      if (any(form.lo < max(here, lo)) || any(form.lo >= min(here + vec2<i32>(step), hi))) { continue; }
      let lift = select(select(lift0, lift1, k == 1u), 0u, k == 2u);
      let stand = growth_stand(face, form, lift, select(growth_drawn(select(floor0, floor1, k == 1u), kept), 1e9, k == 2u), counting);
      if (!stand.ok) { continue; }
      var step = 0u;
      var side = 0u;
      var wind = 0u;
      if (k == 0u) {
        let shape = growthTable[q.block + 1u + form.rule * ${t}u + ${N0.shape}u];
        let bends = form.height >= 2u && f32((form.h2 >> 3u) & 1023u) < shape.w * 1024.0;
        var mode = select(1u, 0u, bends);
        var qi = 0u;
        var first = 0u;
        var second = 0u;
        var cells = 0u;
        loop {
          if (mode == 1u && (form.head <= 1u || step != 0u)) { mode = 2u; }
          if (mode == 2u) {
            if (form.head > 1u && step != 0u) { side = select(0u, 5u, form.height + ((form.h2 >> 17u) % form.head) >= lift0); }
            mode = 4u;
            let air = uniforms.anchor.w;
            if (step == 0u && side == 0u && !counting && !(air < 0 || form.height + form.head < 2u)) {
              let share = f32(u32(air) & 15u) / 8.0;
              let signs = u32(air) >> 4u;
              let alongX = select(select(1u, 2u, (signs & 1u) != 0u), 0u, (signs & 4u) != 0u);
              let alongZ = select(select(1u, 2u, (signs & 2u) != 0u), 0u, (signs & 8u) != 0u);
              first = alongX;
              second = 0u;
              if (face.axis == 0u) { first = alongZ; }
              if (face.axis == 1u) {
                let u = bitcast<vec3<u32>>(growth_place(face.axis, face.rootN, cu, cv)) + vec3<u32>(0x40000000u);
                let preferX = surf_unit(surf_hash(u.x, u.y, u.z, face.seed + 6007u)) < share;
                let z = select(0u, alongZ + 2u, alongZ != 0u);
                first = select(z, alongX, preferX);
                second = select(alongX, z, preferX);
              }
              mode = 3u;
              qi = 0u;
            }
          }
          if (mode == 4u) { break; }
          var code = 0u;
          var to = vec2<i32>(cu, cv);
          if (mode < 2u) {
            code = ((((form.h2 >> select(15u, 13u, mode == 0u)) & 3u) + qi) & 3u) + 1u;
          } else {
            code = select(second, first, qi < 2u);
            to = to + growth_aside(code) * i32(qi & 1u);
          }
          let hit = growth_enters(q, face, to.x, to.y, code);
          if (mode < 2u) {
            if (hit || qi == 3u) {
              if (mode == 0u) { step = select(0u, code, hit); } else { side = select(0u, code, hit); }
              mode = mode + 1u;
              qi = 0u;
            } else {
              qi = qi + 1u;
            }
          } else {
            if (hit) { cells = (qi & 1u) + 1u; }
            if (hit && (qi & 1u) == 0u && form.height + form.head >= 5u) {
              qi = qi + 1u;
            } else if (cells != 0u) {
              wind = cells | (select(0u, 1u, code >= 3u) << 2u);
              mode = 4u;
            } else if (qi < 2u) {
              qi = 2u;
            } else {
              mode = 4u;
            }
          }
        }
      }
      growth_put(q, face, form, lift, stand, step, side, wind, counting);
    }
  }
}

fn growth_plan() {
  var sum = 0u;
  var cut = ${p0}u;
  var fit = 1.0;
  var most = 1.0;
  var full = false;
  let budget = u32(uniforms.room.x);
  let room = u32(uniforms.room.y);
  for (var i = 0u; i < ${p0}u; i = i + 1u) {
    let n = atomicLoad(&records.bins[i]);
    if (cut == ${p0}u && sum + n > budget) {
      cut = i;
      fit = (f32(i) + f32(budget - sum) / f32(max(n, 1u))) / ${p0}.0;
    }
    if (!full && sum + n > room) {
      full = true;
      most = (f32(i) + f32(room - sum) / f32(max(n, 1u))) / ${p0}.0;
    }
    sum = sum + n;
  }
  var share = fit;
  if (records.held > 0.0) { share = clamp(fit, records.held - ${p7}, records.held + ${p7}); }
  share = min(share, most);
  records.cut = cut;
  records.share = share;
  records.held = share;
  records.counted = sum;
  records.standing = select(0u, 1u, (uniforms.caps.z & ${A8.standing}u) != 0u && share >= 1.0 && f32(sum) <= uniforms.room.z);
}

fn growth_seal() {
  records.instanceCount = min(atomicLoad(&records.asked), uniforms.caps.y);
  records.listed = list.count;
}

fn growth_live(at: u32) -> bool {
  let home = atomicLoad(&records.words[at + 2u]);
  let stands = atomicLoad(&records.words[at + 3u]);
  return (bitcast<u32>(voxelChunkCells[home >> 20u].w) & ${J7}u) == ((stands >> ${f7.epochShift}u) & ${J7}u);
}

@compute @workgroup_size(${Q})
fn growth(@builtin(workgroup_id) wg: vec3<u32>, @builtin(local_invocation_id) lid: vec3<u32>, @builtin(global_invocation_id) gid: vec3<u32>, @builtin(num_workgroups) grid: vec3<u32>) {
  let phase = growthPass.y;
  if (phase == ${X0.walk}u) {
    growth_walk(wg, lid, grid, growthPass.x != 0u);
    return;
  }
  if (phase == ${X0.wipe}u) {
    let lane = gid.x + gid.y * grid.x * ${Q}u;
    let lanes = grid.x * grid.y * ${Q}u;
    for (var k = 0u; k < ${K5}u; k = k + 1u) {
      let word = uniforms.caps.y * ${K0}u + lane + k * lanes;
      if (word >= arrayLength(&records.words)) { return; }
      atomicStore(&records.words[word], 0u);
    }
    return;
  }
  if (phase == ${X0.keep}u || phase == ${X0.back}u) {
    let i = gid.x + gid.y * grid.x * ${Q}u;
    let over = uniforms.caps.y * ${K0}u;
    if (phase == ${X0.keep}u) {
      let at = i * ${K0}u;
      if (i >= min(atomicLoad(&records.asked), uniforms.caps.y) || !growth_live(at)) { return; }
      let to = over + atomicAdd(&records.kept, 1u) * ${K0}u;
      if (to + ${K0}u > arrayLength(&records.words)) { return; }
      for (var w = 0u; w < ${K0}u; w = w + 1u) { atomicStore(&records.words[to + w], atomicLoad(&records.words[at + w])); }
      return;
    }
    let kept = atomicLoad(&records.kept);
    if (i == 0u) { atomicStore(&records.asked, kept); }
    if (i >= kept) { return; }
    let held = over + i * ${K0}u;
    for (var w = 0u; w < ${K0}u; w = w + 1u) { atomicStore(&records.words[i * ${K0}u + w], atomicLoad(&records.words[held + w])); }
    return;
  }
  if (lid.x != 0u) { return; }
  if (phase == ${X0.plan}u) { growth_plan(); } else { growth_seal(); }
}`}var d2="terrain/voxel-growth-scan",i2="terrain/voxel-growth",U5=[g(0,4,"uniform")],L8=0,c0=1,J$=2,Q$=0,$Q=1,JQ=2,n2=[d2,i2],r2=[$$,F5],l2=["terrain voxel growth scan","terrain voxel growth emit"],o2=[u2,c2],s2=["main","growth"],a2=[!1,!0];function QQ($,J,Q,Z,j){let q=n2[$];return j.getComputePipeline(q,function a(){return (a.$h??=$c0C(48)(j,$,Z,q)).call(this)})}function ZQ($,J,Q,Z,j){let q=(J&1)!==0;if($===Q$){return Kq(Z,j,q);}return Vq(Z,j,Q??y0(),q)}var G5=[g(0,1,"uniform"),g(1,1,"read-only-storage"),g(2,1|2,"read-only-storage"),g(3,1|2,"read-only-storage"),g(4,1,"read-only-storage"),M7(5,1,"depth","2d-array")],jQ=`struct GrowthDraw {
  anchor: vec4<f32>,
  anchorMicro: vec4<i32>,
  cover: vec4<f32>,
  coverY: vec4<f32>,
  ends: array<vec4<f32>, 2>,
}
@group(2) @binding(0) var<uniform> growth: GrowthDraw;
@group(2) @binding(1) var<storage, read> growthRecords: array<u32>;
@group(2) @binding(2) var<storage, read> voxelSurfaceTable: array<vec4<f32>>;
@group(2) @binding(3) var<storage, read> growthTable: array<vec4<f32>>;
@group(2) @binding(4) var<storage, read> voxelChunkCells: array<vec4<i32>>;
@group(2) @binding(5) var growthCover: ${gJ};
${mJ}

fn growth_coverHeight(worldX: f32, worldZ: f32) -> f32 {
  let texels = i32(growth.cover.w);
  if (texels <= 0) { return 1e9; }
  let tx = i32(floor((worldX - growth.cover.x) * growth.cover.z));
  let tz = i32(floor((worldZ - growth.cover.y) * growth.cover.z));
  if (tx < 0 || tz < 0 || tx >= texels || tz >= texels) { return 1e9; }
  return decor_coverSurface(${kJ("growthCover","vec2<i32>(tx, tz)")}, growth.coverY.x, growth.coverY.y);
}
const VOXEL_AO_CURVE = array<f32, 4>(${k9.join(", ")});

${P8}`,Z$=3,t2=4,e2=9,$q=0.3,Jq=6,SJ=0.2,Qq=0.3,Zq,jq=`  let windTotal = f32(((shape >> 25u) & 31u) + 1u);
  let windTall = windTotal >= 5.0;
  let windBreak1 = select(select(windTotal, windTotal - 1.0, windTotal >= 2.0), ceil(windTotal * 0.5), windTall);
  let windBreak2 = select(windTotal, windTotal - max(1.0, round(windTotal * 0.2)), windTall);
  let windPart = vertexIndex / 7u;
  let windFoot = f32((shape >> 9u) & 31u);
  let windEnd = windFoot + f32(((shape >> 3u) & 15u) + 1u);
  var windLo = windFoot;
  var windHi = select(windEnd, clamp(windBreak1, windFoot, windEnd), growthRecords[0] > ${R8.length}u);
  if (windPart == 1u) { windLo = windHi; windHi = clamp(windBreak2, windFoot, windEnd); }
  else if (windPart >= 2u) { windLo = clamp(windBreak2, windFoot, windEnd); windHi = windEnd; }
  if (windHi <= windLo) { return out; }`,qq,qQ=()=>(qQ=$c0C(51))(),YQ=`struct GrowthTone {
  rgb: vec3<f32>,
  roughness: f32,
  metalness: f32,
  emissive: vec3<f32>,
  detail: f32,
}

fn growth_rootNormal(ground: vec3<f32>, face: vec3<f32>, alongMetres: f32, head: bool, detail: f32) -> vec3<f32> {
  let toSun = passLights.sunDirection;
  let lean = toSun - ground * dot(toSun, ground);
  let n = normalize(ground + lean * (0.25 * clamp(alongMetres / ${c9}, 0.0, 1.0)));
  return select(n, normalize(mix(n, face, 0.33 * detail)), head);
}

fn growth_tone(look: vec3<u32>, along: f32, drift: f32, normal: vec3<f32>, mean: u32, footprint: f32, leave: f32) -> GrowthTone {
  let shape = look.z;
  let head = ((shape >> 17u) & 1u) == 1u;
  let ao = (shape >> 20u) & 3u;
  let jitter = f32((shape >> 22u) & 7u) / 7.0;
  let total = f32(((shape >> 25u) & 31u) + 1u);
  let ruleRow = look.y;
  let toneRow = growthTable[ruleRow + ${N0.tone}u];
  let counts = growthTable[ruleRow + ${N0.counts}u];
  let f = clamp((floor(max(along, 0.0)) + 0.5) / total, 0.0, 1.0);
  var tone: VoxelSurfaceTone;
  var driftShare = 1.0;
  if (head && counts.y > 0.5) {
    tone = surf_tone(growthTable[ruleRow + ${N0.head}u + min(u32(jitter * counts.y), u32(counts.y) - 1u)]);
  } else if (counts.x > 0.5) {
    tone = surf_tone(growthTable[ruleRow + ${N0.own}u + min(u32(clamp(f + (jitter - 0.5) * 0.3, 0.0, 0.999) * counts.x), u32(counts.x) - 1u)]);
  } else {
    let span = voxelSurfaceTable[look.x + ${s.base}u];
    let face = voxelSurfaceTable[look.x + ${s.face}u];
    let lean = select(face.y, select(face.z, face.x, normal.y > 0.0), abs(normal.y) > 0.5);
    let ramp = clamp(mix(toneRow.z, toneRow.w, f) + (jitter - 0.5) * 0.3, 0.0, 1.0);
    let at = mix(span.z, span.w, ramp) + lean;
    tone = surf_ramp(look.x + ${s.tones}u, clamp(round(at + drift), span.z, span.w));
    if (drift != 0.0) { driftShare = dot(tone.rgb, vec3<f32>(0.2126, 0.7152, 0.0722)) / max(dot(surf_ramp(look.x + ${s.tones}u, clamp(round(at), span.z, span.w)).rgb, vec3<f32>(0.2126, 0.7152, 0.0722)), 1e-4); }
  }
  let rootShade = mix(VOXEL_AO_CURVE[ao] * 0.7, 1.0, smoothstep(0.0, 3.0, along));
  let detail = select(min(select(footprint, 1.0, head), leave), 1.0, mean == 0u);
  var out: GrowthTone;
  out.detail = detail;
  out.rgb = mix(voxelSurfaceTable[mean].rgb * driftShare, tone.rgb * rootShade, detail);
  out.roughness = tone.shade.x;
  out.metalness = tone.shade.y;
  out.emissive = tone.rgb * (tone.shade.z * tone.shade.z * ${Y0}.0);
  return out;
}`,VQ=`  let pixel = fwidth(in.worldPos);
  let tone = growth_tone(in.look, in.along, in.drift, in.normal, in.mean, surf_fade(max(max(pixel.x, pixel.y), pixel.z) / max(in.cube, 1e-4), 1.0), in.leave);
  let rgb = tone.rgb;
  let roughness = tone.roughness;
  let metalness = tone.metalness;
  let emissive = tone.emissive;
  let N = growth_rootNormal(in.ground, in.normal, max(in.along, 0.0) * in.cube, ((in.look.z >> 17u) & 1u) == 1u, tone.detail);`;function Yq($=y0(),J=!1){let Q=S9("pbr",$),Z=`${$.wgslDefs}
${Q.defs}`.includes("fn lighting_cellRead(")?`  lighting_cellRead(in.foot, in.ground);
`:"",j=Q.litColor({N:"N",geometryNormal:"N",V:"V",P:"in.worldPos",albedo:"rgb",roughness:"roughness",metalness:"metalness",emissive:"emissive",toonSteps:"4.0",transmission:"0.0"}),q=[];if(q.push("//"),q.push(C7),J)q.push(_J);return q.push($.wgslDefs),q.push(Q.defs),q.push(jQ),q.push(k0),q.push(YQ),q.push(qQ()),q.push(`@fragment
fn fs(in: VsOut) -> ${bJ(J)} {
${VQ}
  let V = ${w0("frame.cameraPosition - in.worldPos")};
${Z}  var litColor = ${j};
  litColor += emissive;
  litColor = shade_applyFog(litColor, in.viewZ, in.worldPos - frame.cameraPosition);
  return ${J?"lume_staticMotionFragment(vec4f(litColor, 1.0), in.worldPos)":"vec4<f32>(litColor, 1.0)"};
}`),L0(q,`
`)}function Vq($,J,Q,Z){let j=`terrain/voxel-growth/${I7({motion:Z})}`;Q=g9(Q,j);let q=Q.programKey?`${j}/light/${w9(Q)}`:j;_9(Q,q);return HQ($,J,q,()=>Yq(Q,Z),()=>d7({motion:Z}),B8())}function HQ(a,b,c,d,e,f){return (HQ=$c0C(52)).call(this,a,b,c,d,e,f)}function Hq(){return (Hq=$c0C(53)).apply(this,arguments)}function Kq($,J,Q){let Z=B8(),j=`terrain/voxel-growth/${E9(Q,Z)}`;return HQ($,J,j,()=>hJ(Hq(Q),"fs",Z),()=>h9(Q,Z),Z)}var Xq=function($){let J=m0($)&&!(("l"in $)&&("c"in $))?$:void 0,Q=g7(J?J.color:$);if(Q===void 0)return;return{rgb:_7(Q&16777215),roughness:T(J?.roughness,0.9,0,1),metalness:T(J?.metalness,0,0,1),glow:T(J?.glow,0,0,Y0)}};var KQ=function($,J){let Q=[];if(!Array.isArray($))return Q;for(let Z of $){let j=Xq(Z);if(j&&Q.length<J)Q.push(j)}return Q};var Fq={top:a.top,side:a.side,under:a.under,all:a.top|a.side|a.under};function Gq(a){return (Gq=$c0C(54)).call(this,a)}function Nq($){if($===void 0||$===null)return null;let J=[];for(let Q of Array.isArray($)?$:[$]){let Z=Gq(Q);if(Z&&Z.cover>0&&Z.density>0&&J.length<W8)J.push(Z)}return J.length>0?J:null}var N5=4096,B5=new Map;function RQ($,J){let Q=J.join(","),Z=B5.get(Q);if(!Z)Z=U9(J,0,N5),B5.set(Q,Z);if($>=1)return-1;return Z[A(Math.floor((1-$)*N5),0,N5-1)]??1}var XQ=new Map,Pq=8,H$=16,zq=4,P5=[0.125,0.375,0.625,0.875];function LQ(a){return (LQ=$c0C(55)).call(this,a)}function Mq(a,b,c){return (Mq=$c0C(56)).call(this,a,b,c)}var z5=[0.2126,0.7152,0.0722],FQ=[0,1,2,3,4,5,6,7].map(($)=>($/7-0.5)*0.3);function Iq(a,b,c,d,e){return (Iq=$c0C(57)).call(this,a,b,c,d,e)}function M5(a,b,c){return (M5=$c0C(58)).call(this,a,b,c)}var Tq=32,UQ=4;function Bq(a,b,c,d,e){return (Bq=$c0C(59)).call(this,a,b,c,d,e)}function Dq(a,b,c){return (Dq=$c0C(60)).call(this,a,b,c)}var yQ=y,q7=1,$8=8,Wq=16,SQ=0.6,vq=0.25,hQ=0.8,xq=64,Aq=1.35,Rq=8,GQ=16,Lq=($)=>2**(Math.round(Math.log2(Math.max($,0.000000001))*GQ)/GQ);function yq($,J=1,Q={near:0,far:0}){return Q.near=J/(i9*Math.max($,0.000000001)),Q.far=J/(n9*Math.max($,0.000000001)),Q}var Sq=98304;var hq=8192;var Eq=262144;var D5=($)=>2*$;var Oq=($)=>l7+D5($)*K0+r9*$;var EQ=32768;var bq=2097152;var O5=131072;var OQ=($)=>A(2**Math.ceil(Math.log2(Math.max($,1))),EQ,bq)+O5;function wq(){return (wq=$c0C(61)).call(this)}function b5(a){return (b5=$c0C(62)).call(this,a)}var a7={share:-1,x:0,z:0,key:0},bQ=($)=>$.x+1+4*($.z+1);function _q(a,b,c){return (_q=$c0C(63)).apply(this,arguments)}function gq($,J){let Q=J!==null?CQ(J)?.values.wind:void 0;return Q?_q(Q[0]??0,Q[1]??0,Q[2]??0,$):a7}function kq(){return (kq=$c0C(64)).call(this)}var wQ=($)=>$.reduce((J,Q)=>Math.max(J,Q.width),1),NQ=function($){let J=0;for(let Q of $.said.values())J=Math.max(J,wQ(Q.rules)*(2**Q.cellShift/y));return J},h8=($,J,Q)=>Q>0?Math.min($*J,Q):$*J,_Q=($,J,Q,Z,j,q,Y)=>h8($,J,Q>0?G$(Z,j,q,Y):0);function w5($,J,Q,Z,j,q,Y=!1){let V=m7(J);if(V<0)return;if(Z===null){if($.said.delete(V),$.widest=NQ($),!$.keys.delete(V))return;$.data.fill(0,V*T0*4,(V+1)*T0*4),$.tableDirty=!0,$.revision+=1;return}$.said.set(V,{lookRow:J,key:Q,rules:Z,cellShift:j,seed:q,ground:Y}),$.cellMetres=Math.min($.cellMetres,2**j/y),$.coarsest=Math.max($.coarsest,2**j/y),$.widest=NQ($);let H=$.bladesTop&&Y,K=`${Q}\x00${j}\x00${q}\x00${H?1:0}`;if($.keys.get(V)===K)return;if(V>=$.slots){let z=Math.max(16,2**Math.ceil(Math.log2(V+1)));$.data=M8($.data,z*T0*4),$.slots=z}let X=!$.keys.has(V),F=V*T0*4,G=$.data;G.fill(0,F,F+T0*4);let U=function(z,C,I,D,M){let v=F+z*4;G[v]=C,G[v+1]=I,G[v+2]=D,G[v+3]=M},N=0,P=B7;Z.forEach(function(z,C){let I=1+C*t,D=H?z.faces&~a.top:z.faces;N|=D,U(I+P.place,D,z.clumpShift[0]+8*z.clumpShift[1]+64*z.clumpShift[2],RQ(z.cover,z.clumpShift),z.density),U(I+P.shape,z.heightMin,z.heightMax,z.width,z.step),U(I+P.tone,z.head,z.shade,z.rampRoot,z.rampTip),U(I+P.counts,z.tones.length,z.headTones.length,z.faces,0),z.tones.forEach((M,v)=>U(I+P.own+v,M.rgb[0],M.rgb[1],M.rgb[2],x9(M))),z.headTones.forEach((M,v)=>U(I+P.head+v,M.rgb[0],M.rgb[1],M.rgb[2],x9(M)))});U(0,Z.length,j,q,N+8*wQ(Z));if(X){rY($,V,Z.length);}$.keys.set(V,K),$.tableDirty=!0,$.revision+=1}var y8=5;function mq(a,b,c,d,e,f){return (mq=$c0C(65)).call(this,a,b,c,d,e,f)}function fq($,J,Q,Z,j,q){let Y=$.standing;if(!Y.on)return;Y.chunks.delete(J),Y.rewrites.delete(J),Y.noted.delete(J),Y.gone.push(J,Q,Z,j,q),Y.dirty=!0}function pq($){return $.standing.on&&$.standing.mirror!==null}function uq($,J,Q,Z){let j=$.standing;if(j.rewrites.add(J),j.noted.set(J,j.seen+1),Q[0]!==Z[0]||Q[1]!==Z[1]||Q[2]!==Z[2]||Q[3]!==Z[3])j.gone.push(J,Q[0],Q[1],Q[2],Q[3]);j.dirty=!0}function cq($,J,Q,Z,j,q){let Y=$.gone;for(let V=0;V+y8<=Y.length;V+=y8){if(Y[V]!==J||Y[V+1]!==Q||Y[V+2]!==Z||Y[V+3]!==j||Y[V+4]!==q)continue;Y.splice(V,y8);return}}var dq=128;function iq($,J){w5($,k+J*n,"",null,0,0)}var I5=null;var nq=new Uint32Array(o9),o7=new Uint32Array(l7);o7[0]=R8.length;var rq=!1,_5=($)=>R8.length*($?Z$:1),C5=new Uint32Array(1),lq=new Uint32Array(1),g5=256,kQ=[[1,X0.walk],[0,X0.walk],[0,X0.plan],[0,X0.seal],[0,X0.wipe],[0,X0.keep],[0,X0.back]],W5=new Uint32Array(((kQ.length-1)*g5+16)/4);kQ.forEach(([$,J],Q)=>W5.set([$,J,0,lJ],Q*g5/4));var S8=e7(J$,1,QQ),v5=e7(JQ,2,ZQ),x5=0,A5=1,R5=2,L5=3,y5=4,j$=5,q$=6,S5=7,mQ=8,fQ=9,pQ=10,uQ=11,k5=12,cQ=13,oq=14,dQ=0,iQ=0,Z7=1,nQ=2,rQ=3,lQ=4,oQ=5,sQ=6,aQ=7,tQ=8,eQ=9,sq=[nQ,rQ,lQ,oQ,sQ,aQ,tQ],D7=($,J)=>({label:`terrain voxel growth ${$} pass`,layoutLabel:"terrain voxel growth pass",layout:U5,slots:[[pQ,J*g5,16]]}),aq=[{label:"terrain voxel growth scan",layoutLabel:"terrain voxel growth scan",layout:$$,slots:[x5,A5,R5,L5,y5,j$,q$,S5,mQ]},{label:"terrain voxel growth emit",layoutLabel:"terrain voxel growth emit",layout:F5,slots:[x5,A5,R5,L5,y5,j$,q$,S5,fQ]},D7("count",0),D7("emit",1),D7("plan",2),D7("seal",3),D7("wipe",4),D7("keep",5),D7("back",6),{label:"terrain voxel growth draw",layoutLabel:"terrain voxel growth",layout:G5,slots:[uQ,k5,cQ,q$,j$,dQ]}],tq=0,eq=1,$Y=2,JY=3,QY=4,ZY=5,jY=6,qY=7,Q7=($,J,Q=-1)=>({recipe:$,bind:J,second:Q,frameAt0:!1,label:void 0}),YY=[Q7(c0,Z7,aQ),Q7(c0,Z7,tQ),Q7(c0,Z7,sQ),Q7(L8,iQ),Q7(c0,Z7,nQ),Q7(c0,Z7,lQ),Q7(c0,Z7,rQ),Q7(c0,Z7,oQ)],Q0=[0,0,0],VY=0;function $Z(a){return ($Z=$c0C(66)).call(this,a)}function HY($){if($.gpu)$Z($.gpu);$.gpu=null,$.sealed=!1,$.memo=null,$.keys.clear()}function PQ($,J,Q,Z,j=$.windDraw){let q=r(J,{label:"terrain voxel growth records",size:Oq(Q)*4,usage:128|256|8|4},Z);o7[0]=_5(j);J.queue.writeBuffer(q,0,o7);return q}var JZ=($)=>$.standing??$.records;function KY(a,b,c,d){return (KY=$c0C(67)).call(this,a,b,c,d)}function XY(a,b,c,d,e,f){return (XY=$c0C(68)).call(this,a,b,c,d,e,f)}var QZ=r7+3*N7*u0;function ZZ($){$[0]=0,$[1]=0}function K$($,J,Q,Z=0){let j=$[0]??0,q=r7+j*u0;if(Q<=0||j>=N7||q+u0>$.length)return;let Y=$[1]??0;$[q]=J,$[q+1]=Q,$[q+2]=Y,$[q+3]=Z,$[0]=j+1,$[1]=Y+Q}function FY(a,b){return (FY=$c0C(69)).call(this,a,b)}var m5=($)=>511*$.cellMetres,P$=($)=>(s9+2)*$.coarsest;function f5(a,b,c,d,e,f,g,h){return (f5=$c0C(70)).call(this,a,b,c,d,e,f,g,h)}function UY(a,b,c,d,e,f,g,h,i,j,k){return (UY=$c0C(71)).call(this,a,b,c,d,e,f,g,h,i,j,k)}function GY(a,b,c,d,e,f,g,h){return (GY=$c0C(72)).call(this,a,b,c,d,e,f,g,h)}function NY(a,b,c,d,e,f,g,h,i,j){return (NY=$c0C(73)).call(this,a,b,c,d,e,f,g,h,i,j)}function PY($,J,Q,Z,j,q,Y,V){let H=Q[0]??0;let K=Q[2]??0;let X=$8-0.5-q7-NY(Z,j,q,Y,J.x,J.y,J.z,H,Q[1]??0,K);if(X<0)return!0;let F=$.end>0?G$($.ends,Z-H,q-K,Y):1/0;return Math.min(F,V)>J.end+X}function Y$($,J,Q){let Z=$.mirror;if(Z===null)return;let j=Q*4+3,q=Z[j]??0;if(Z[j]=q&~J7|q+1&J7,$.cells!==null)J.queue.writeBuffer($.cells,j*4,Z,j,1)}var zQ=new Float32Array(h0);function jZ($){return zQ.fill($.end),zQ}var l=[],X$=7,F0=[],qZ=[],B0=[],MQ=5,p5=new Float64Array(6);function zY(a,b,c,d){return (zY=$c0C(74)).call(this,a,b,c,d)}function MY(a,b){return (MY=$c0C(75)).call(this,a,b)}var YZ=1;function IY(a,b,c,d,e,f,g){return (IY=$c0C(76)).call(this,a,b,c,d,e,f,g)}function VZ(a,b,c,d,e,f,g,h,i,j,k){return (VZ=$c0C(77)).call(this,a,b,c,d,e,f,g,h,i,j,k)}function CY(a,b,c){return (CY=$c0C(78)).call(this,a,b,c)}function TY(a){return (TY=$c0C(79)).call(this,a)}function BY(a,b,c){return (BY=$c0C(80)).call(this,a,b,c)}function DY($,J){let Q=p5,Z=!0;for(let j=0;j<3;j+=1){let q=$[j]??0;if(Q[j]=Math.max(Q[j]??0,q-J)-q,Q[3+j]=Math.min(Q[3+j]??0,q+J)-q,(Q[j]??0)>(Q[3+j]??0))Z=!1}return Z}function WY(a,b){return (WY=$c0C(81)).call(this,a,b)}function vY(a,b,c,d,e){return (vY=$c0C(82)).call(this,a,b,c,d,e)}function h5($,J,Q){let Z=J.buffers.chunkCellsData?.[Q*4+3];if(Z!==void 0&&(Z&v8)===0)$.seen.asked.add(Q)}var f8=($)=>Math.floor($/1000*u7);var xY=($)=>v8|(f8($)&P7)<<V5;var AY=($)=>f8($)+x8;function RY(a,b,c,d){return (RY=$c0C(83)).call(this,a,b,c,d)}function HZ($,J){for(let Q=0;Q<h0;Q+=1){let Z=$[Q]??0,j=J[Q]??0;if((j>0?j:1/0)>(Z>0?Z:1/0))return!0}return!1}function LY($){let J=f8(W0());if(J<$.seen.until)$.seen.clock=J&P7,$.seen.steps=J,D0(1);else if(t7($.seen.until))$.seen.clock=J&P7,$.seen.steps=J,$.seen.until=-1/0;return $.seen.clock}function yY(a,b,c,d){return (yY=$c0C(84)).call(this,a,b,c,d)}function SY($,J,Q){FY($,Q);let Z=OQ($.ranges[1]??0);if(Z>J.listCapacity||$.scanOwed&&Z*4<=J.listCapacity)$.listCapacity=Z}function hY($,J,Q){let Z=$.listCapacity!==J.listCapacity;if(Q===$.rangesWhole&&!Z)return!1;if(Q||Z)D0(1);return!0}function EY($,J){if(!HZ($.scanned.ends,$.ends))return!1;if(J<=0||W0()-$.scannedAt>=U$*1000)return!0;return D0(1),!1}function bY(a,b,c){return (bY=$c0C(85)).call(this,a,b,c)}function E5(a,b,c,d,e,f,g,h,i,j,k){return (E5=$c0C(86)).call(this,a,b,c,d,e,f,g,h,i,j,k)}function wY($,J,Q,Z,j,q,Y=null,V=null){if($.keys.size===0){$.sealed=!1;return}if(!$.asked){$.asked=!0;for(let _=L8;_<J$;_+=1)E8(S8,_,0,null,Q.device,Q.pipelines)}let H=J.buckets.get("opaque"),K=H?.chunkSlots.size?H.gpu:null,X=J.surface?.gpu?.handle.resource??null,F=K?.chunkCells??null;if(!K||F===null||X===null){$.sealed=!1,$.scanned.boundEpoch=-1,$.scanOwed=!1,$.writtenOwed=!1;return}let G=Q.device;let U=A(2**Math.round(Math.log2(Sq*Math.max(q.budget,0.001))),hq,Eq);let N=KY($,G,U,$.listCapacity);if(N.retired)h(N.retired),N.retired=null;if($.tableDirty)G.queue.writeBuffer(N.table,0,$.data),$.tableDirty=!1;let P=XY(N,Q,K,F,X,V);$.pixel=Lq(BQ());if(I5)$.near=I5.near*q.distance,$.far=I5.far*q.distance;else {yq($.pixel,q.distance,$);}RY($,J,H,Z);$.quadCapacity=K.quadCapacity;let z=$.census?.share??1,C=$.near*$.cellMetres*z,I=$.far*$.cellMetres*z;if(J.surface&&AJ(J.surface,C,Math.max($.glide>0?Math.min(I,$.glide):I,C*2),$.cellMetres*y))D0(1);if(J.surface&&RJ(J.surface,$.glides,!$.walks))D0(1);let D=$.scanned;$.air=gq($.air,Y);$.standing.cells=F;$.standing.mirror=H?.buffers.chunkCellsData??null;bY($,N,Z);yY($,N,Z,H);let M=$.sealed?D.anchor:$.anchor,v=$.drawFloats,L=$.drawInts,c=y;v[0]=M[0]/c-(j[0]??0);v[1]=M[1]/c-(j[1]??0);v[2]=M[2]/c-(j[2]??0);v[3]=1;L[0]=M[0];L[1]=M[1];L[2]=M[2];L[3]=bQ($.sealed?D.air:a7);let R=$.drawCover;if(R.fill(0),P!==null)R[0]=P.originX,R[1]=P.originZ,R[2]=P.texels/Math.max(P.extent,0.000001),R[3]=P.texels,R[4]=P.yMin,R[5]=P.yRange;R[6]=LY($);$.drawWords.set($.glides,16);R[7]=$.seen.drawing?Math.min(Math.max($.seen.steps-$.seen.born,0),oY):0;lY($);u5($,N);_Y($,N,Y)}function _Y(a,b,c){return (_Y=$c0C(87)).call(this,a,b,c)}function u5(a,b){return (u5=$c0C(88)).call(this,a,b)}function gY(a,b,c){return (gY=$c0C(89)).call(this,a,b,c)}function kY(a,b,c,d){return (kY=$c0C(90)).call(this,a,b,c,d)}function mY($,J,Q){let Z=$.standing;for(let j of Z.bumps)Y$(Z,J.device,j);if(!Q)return;V$(J.recordRoom,Q0,a9),m(J.passes,tq,Q0[0],Q0[1],Q0[2]),m(J.passes,eq,Q0[0],Q0[1],Q0[2])}function pY(a,b,c,d){return (pY=$c0C(91)).call(this,a,b,c,d)}function uY(a,b,c,d,e,f){return (uY=$c0C(92)).call(this,a,b,c,d,e,f)}function cY($,J,Q=!1){let Z=Q?1:0;J.enterScope(s7);try{for(let j=L8;j<J$;j+=1)j7(S8,j,0,null,$,J,z0);j7(v5,Q$,Z,null,$,J,z0)}finally{J.leaveScope(s7)}}function E8($,J,Q,Z,j,q){let Y=q.enterLead(q.eye.ground());try{return j7($,J,Q,Z,j,q,O8)}finally{q.leaveLead(Y)}}function dY($,J){let Q=$.motionVectors===!0?1:0;if(J)return E8(v5,Q$,Q,null,$.device,$.pipelines);return E8(v5,$Q,Q,$.lighting??y0(),$.device,$.pipelines)}function iY(a,b,c){return (iY=$c0C(93)).apply(this,arguments)}function nY($){let J=f8(W0());$.seen.drawing=!0,$.seen.born=J,$.seen.until=Math.max($.seen.until,J+x8),D0(1)}function rY($,J,Q){let Z=f8(W0());for(let j=0;j<Q;j+=1){$.data[KZ(J,j)]=(Z&P7)+1;}$.seen.looks.set(J,Z),$.seen.until=Math.max($.seen.until,Z+x8),D0(1)}var KZ=($,J)=>($*T0+1+J*t+B7.counts)*4+3;function lY($){if($.seen.looks.size===0)return;for(let[J,Q]of $.seen.looks){if($.seen.steps<Q+x8)continue;for(let Z=0;Z<W8;Z+=1){$.data[KZ(J,Z)]=0;}$.seen.looks.delete(J),$.tableDirty=!0}}var oY=1048576;var U0=0.125;var n0=4;var E=U0/n0;var i5=0.12;var sY=aY(i5);function aY($){for(let J=0;J<14;J++){let Q=Math.min((J+0.5)*E/0.4,1);if($*Q*Q/E>=0.5)return J}return 14}var u=32,tY=2048,eY=64,M$=63,$4=256,x7=8,XZ=1000000000000000000000000000000,p8=144,n5=32,yZ=M$,j0={looks:0,layers:1,items:2,stamps:3,stampCols:4,grid:5,palette:6,lookCount:7,head:8},o={look:4,layer:12,item:8,stamp:8,palette:4},r5=4,I$=256,SZ=32,l5=6,o5=[16,8,9,4],hZ=0.35,u8=64,EZ=3,OZ=3,bZ=(EZ+OZ)*S0/1000,e=B7,wZ=64,J8=U0*wZ,d5=E*wZ,c8=`struct Blades {
  win: vec4i,
  toWin: vec4f,
  keep: vec4f,
  walk: vec4f,
  jobs: vec4u,
  eye: vec4f,
  air: vec4f,
  spare: vec4f,
  far: vec4f,
}`,s5=`// THE PHASE a dispatch runs, and the loop bounds the driver must not unroll, written once a dispatch: ${o5.join(", ")}
struct BlPhase { id: u32, n16: u32, n8: u32, n9: u32, n4: u32, p0: u32, p1: u32, p2: u32 }`,C$=($)=>(C$=$c0C(94))($),_Z=`
fn bl_groundY(key: u32) -> f32 {
  return f32(key >> 14u) / Y_STEPS - Y_BIAS;
}
fn bl_localOf(tex: vec2i) -> vec2i {
  return (tex - blades.win.xz) & vec2i(NM);
}
fn bl_colTop(g: u32) -> u32 { return g & 63u; }
fn bl_armLo1(g: u32) -> u32 { return (g >> 6u) & 63u; }
fn bl_armLen(g: u32) -> u32 { return ((g >> 12u) & 3u) + 1u; }`;function z$(a){return (z$=$c0C(95)).call(this,a)}var Q8={ground:z$("uurwrrrrrr"),keep:z$("uurrrrwwwrw"),fill:z$("uurrwwwrr"),walk:z$("urrrrrrrrusr")},a5=[M7(0,2,"uint","2d"),g(1,2,"uniform")],t5=($)=>$/8*($/8)+$/64*($/64)+1,Z0=256,gZ=Z0/8*(Z0/8)*2+Z0*Z0*18+2,kZ=($)=>(kZ=$c0C(96))($);function J4($){return L0(["//",c8,s5,"@group(1) @binding(0) var<uniform> blades: Blades;","@group(1) @binding(1) var<uniform> bp: BlPhase;","@group(1) @binding(2) var<storage, read> footJobs: array<vec4i>;","@group(1) @binding(3) var<storage, read_write> ground: array<atomic<u32>>;","@group(1) @binding(4) var<storage, read> quadJobs: array<vec4u>;","@group(1) @binding(5) var<storage, read> quadWords: array<vec2u>;","@group(1) @binding(6) var<storage, read> quadChunkRefs: array<u32>;",b9,"@group(1) @binding(7) var<storage, read> chunkPoses: array<vec4f>;","@group(1) @binding(8) var<storage, read> chunkParams: array<vec4f>;","@group(1) @binding(9) var<storage, read> palette: array<vec4f>;",C$($),WZ,vZ,xZ,AZ,RZ,LZ,`fn bl_clearPhase(g: vec3u, wg: vec3u) {
  let job = wg.z;
  if (job >= blades.jobs.y) { return; }
  let foot = footJobs[job].xy;
  let cell = foot + vec2i(g.xy & vec2u(31u));
  atomicStore(&ground[bl_tex(cell - blades.win.xz)], 0u);
}
fn bl_splatPhase(lid: u32, wg: vec3u) {
  let jobIndex = wg.x + wg.y * 65535u;
  if (jobIndex >= blades.jobs.x) { return; }
  let job = quadJobs[jobIndex];
  let finest = bitcast<f32>(job.z);
  for (var k = lid; k < job.y; k = k + 64u) {
    let quad = job.x + k;
    if (quad >= arrayLength(&quadWords)) { break; }
    let chunkSlot = quadChunkOf(quad);
    if (chunkSlot == ${O9}u) { continue; }
    let words = quadWords[quad];
    let placement = words.x;
    let value = voxel_faceValueRead(placement, words.y);
    if ((placement & 7u) != 2u || ((value >> 24u) & 1u) != 0u) { continue; }
    let params = chunkParams[chunkSlot];
    let cellSize = params.x;
    if (abs(cellSize - finest) > 1e-4) { continue; }
    let matIdx = value & ${m9}u;
    ${p9("row")}
    let cover = palette[row + ${f9}u];
    if (cover.y < 1.5) { continue; }
    let origin = chunkPoses[chunkSlot * 2u].xyz + blades.toWin.xyz;
    let slab = f32((placement >> 3u) & 0x1fu);
    let u0 = f32((placement >> 8u) & 0x1fu);
    let v0 = f32((placement >> 13u) & 0x1fu);
    let rounded = (placement & ${E7>>>0}u) != 0u;
    let dense = (placement & ${c5}u) == ${c5}u;
    let spanU = select(f32(((placement >> 18u) & 0x1fu) + 1u), 1.0, rounded);
    let spanV = select(f32(((placement >> 23u) & 0x1fu) + 1u), 1.0, rounded);
    let offset = f32((value >> 25u) & 0x7fu) / 64.0;
    let inset = palette[row].w;
    let y = select(origin.y + (slab + 1.0 - inset) * cellSize - offset, origin.y + (slab + 0.5) * cellSize, dense);
    let lo = vec2f(origin.x + u0 * cellSize, origin.z + v0 * cellSize);
    let hi = lo + vec2f(spanU, spanV) * cellSize;
    let c0 = vec2i(ceil(lo / CELL - vec2f(0.5)));
    let c1 = vec2i(ceil(hi / CELL - vec2f(0.5)));
    let lookRow = u32(cover.z + 0.5);
    var look = 0u;
    if (lookRow >= ${k}u && cover.w < 0.5) {
      look = min((lookRow - ${k}u) / ${n}u + 1u, 4095u);
    }
    let classes = voxel_ringClasses((value >> 16u) & 0xffu);
    let span = vec2u(u32(spanU), u32(spanV));
    var plane = VoxelSmoothPlane(vec3f(0.0), vec3f(0.0), false);
    if (dense) {
      plane = voxel_densityUpPlane(voxel_densityCorners(quad, placement, words.y), placement);
    } else if (rounded) {
      plane = voxel_smoothPlane(placement, words.y);
    }
    for (var cz = max(c0.y, 0); cz < min(c1.y, N); cz++) {
      for (var cx = max(c0.x, 0); cx < min(c1.x, N); cx++) {
        let at = (vec2f(f32(cx), f32(cz)) + vec2f(0.5)) * CELL;
        let rise = select(0.0, voxel_smoothRise(plane, (at - lo) / cellSize), rounded);
        let levels = voxel_classLevels(classes, min(vec2u(max((at - lo) / cellSize, vec2f(0.0))), span - vec2u(1u)), span);
        let ao = min(min(levels.x, levels.y), min(levels.z, levels.w));
        let yq = u32(clamp(round((y + rise * cellSize + Y_BIAS) * Y_STEPS), 1.0, 262143.0));
        atomicMax(&ground[bl_tex(vec2i(cx, cz))], (yq << 14u) | (ao << 12u) | look);
      }
    }
  }
}`,kZ(`    case 0u: { bl_clearPhase(g, wg); }
    case 1u: { bl_splatPhase(lane, wg); }`)],`
`)}var mZ=`const PRESSED: u32 = 0x10000u;
const PRESS_WAIT: f32 = ${EZ*S0/1000};
const PRESS_GROW: f32 = ${OZ*S0/1000};
fn bl_pressing(stamp: u32) -> bool { return stamp != 0u && (stamp == bitcast<u32>(blades.spare.z) || blades.eye.w - bitcast<f32>(stamp) < PRESS_WAIT + PRESS_GROW); }
fn bl_pressCap(stamp: u32, cell: vec2i, height: u32) -> u32 {
  if (stamp == bitcast<u32>(blades.spare.z)) { return 1u; }
  let ago = blades.eye.w - bitcast<f32>(stamp);
  if (ago < 0.0 || ago >= PRESS_WAIT + PRESS_GROW) { return 1024u; }
  let grow = clamp((ago - bl_arrivalUnit(cell + blades.win.xz) * PRESS_WAIT) / PRESS_GROW, 0.0, 1.0);
  return 1u + u32(f32(max(height, 1u) - 1u) * grow);
}
fn bl_arrivalUnit(c: vec2i) -> f32 {
  var h = (bitcast<u32>(c.x) * 0x8da6b343u) ^ (bitcast<u32>(c.y) * 0xd8163841u);
  h = (h ^ (h >> 16u)) * 0x7feb352du;
  h = (h ^ (h >> 15u)) * 0x846ca68bu;
  return f32((h ^ (h >> 16u)) >> 8u) / 16777216.0;
}`;var Q4=`fn bl_keepShare(d: f32, dh: f32, units: f32) -> f32 {
  if (dh > blades.keep.z) { return 0.0; }
  let whole = blades.keep.x;
  let byGround = 1.0 - clamp(log(max(dh / units, whole) / whole) * blades.keep.y, 0.0, 1.0);
  let bySight = 1.0 - clamp(log(max(d / units, whole) / whole) * blades.far.x, 0.0, 1.0);
  return min(min(byGround, bySight), max(blades.keep.z - dh, 1e-30) * blades.spare.w);
}`;function Z4($,J=!1){let Q=$/8,Z=$/64;return L0(["//",c8,s5,"@group(1) @binding(0) var<uniform> blades: Blades;","@group(1) @binding(1) var<uniform> bp: BlPhase;","@group(1) @binding(2) var<storage, read> footJobs: array<vec4i>;","@group(1) @binding(3) var<storage, read> ground: array<u32>;","@group(1) @binding(4) var<storage, read> colsA: array<vec4u>;","@group(1) @binding(5) var<storage, read> colsB: array<vec4u>;","@group(1) @binding(6) var<storage, read_write> keptTop: array<f32>;","@group(1) @binding(7) var<storage, read_write> keptInfo: array<vec4u>;","@group(1) @binding(8) var<storage, read_write> maxima: array<f32>;","@group(1) @binding(9) var<storage, read> feet: array<vec4f>;","@group(1) @binding(10) var<storage, read_write> wind: array<u32>;",C$($),_Z,Q4,mZ,pZ($),K4(J),`
fn bl_keepCell(tex: i32, local: vec2i, stamp: u32) {
  let key = ground[tex];
  if (key == 0u) {
    keptTop[tex] = NO_TOP;
    keptInfo[tex] = vec4u(0u, bitcast<u32>(NO_TOP), 0u, 0u);
    return;
  }
  let yG = bl_groundY(key);
  let mid = vec3f((f32(local.x) + 0.5) * CELL, yG, (f32(local.y) + 0.5) * CELL);
  let d = distance(mid, blades.eye.xyz);
  let dh = distance(mid.xz, blades.far.yz);
  var mask = 0u;
  var most = 0u;
  for (var i = 0u; i < 16u; i++) {
    let geo = (colsA[tex * 2 + i32(i >> 3u)][(i >> 1u) & 3u] >> ((i & 1u) * 16u)) & 0xffffu;
    if (geo == 0u) { continue; }
    let own = colsB[tex * 4 + i32(i >> 2u)][i & 3u];
    let units = f32(1u << ((own >> 10u) & 3u));
    let rank = (f32((own >> 2u) & 255u) + 0.5) / ${$4}.0;
    if (rank >= bl_keepShare(d, dh, units)) { continue; }
    mask = mask | (1u << i);
    let lo1 = bl_armLo1(geo);
    most = max(most, max(bl_colTop(geo), select(0u, lo1 - 1u + bl_armLen(geo), lo1 > 0u)));
  }
  keptTop[tex] = yG + f32(most) * DC;
  keptInfo[tex] = vec4u(mask | select(0u, PRESSED, mask != 0u && bl_pressing(stamp)), bitcast<u32>(yG), key & 16383u, stamp);
}
fn bl_keepFootPhase(g: vec3u, wg: vec3u) {
  let job = wg.z;
  if (job >= blades.jobs.y) { return; }
  let cellW = footJobs[job].xy + vec2i(g.xy & vec2u(31u));
  let local = cellW - blades.win.xz;
  bl_keepCell(bl_tex(local), local, 0u);
}
fn bl_keepPhase(g: vec3u) {
  if (i32(g.x) >= N || i32(g.y) * 4 >= N) { return; }
  let texXY = vec2i(i32(g.x), i32(g.y) * 4 + (blades.win.w & 3));
  bl_keepCell(texXY.y * N + texXY.x, bl_localOf(texXY), keptInfo[texXY.y * N + texXY.x].w);
}
fn bl_pressPhase(foot: u32, lane: u32) {
  let p = feet[foot];
  let lo = vec2i(floor((p.xy - vec2f(p.z)) / CELL));
  let side = i32(ceil(2.0 * p.z / CELL)) + 1;
  let held = bitcast<u32>(blades.spare.z);
  for (var k = i32(lane); k < side * side; k = k + 64) {
    let local = lo + vec2i(k % side, k / side);
    let mid = (vec2f(local) + 0.5) * CELL;
    if (any(local < vec2i(0)) || any(local >= vec2i(N)) || distance(mid, p.xy) > p.z) { continue; }
    var stamp = held;
    if (p.w > 0.0) {
      stamp = held - 1u;
      for (var f = 0; f < i32(p.w) - 1; f++) {
        if (distance(mid, feet[f].xy) <= feet[f].z) { stamp = 0u; }
      }
    }
    if (stamp != 0u) {
      let t = bl_tex(local);
      let kx = keptInfo[t].x;
      keptInfo[t].x = select(kx, kx | PRESSED, kx != 0u);
      keptInfo[t].w = stamp;
    }
  }
}
var<workgroup> row: array<f32, 64>;
fn bl_maximaPhase(g: vec3u) {
  if (i32(g.x) >= ${Q} || i32(g.y) >= ${Q}) { return; }
  var most = NO_TOP;
  for (var z = 0; z < i32(bp.n8); z++) {
    for (var x = 0; x < i32(bp.n8); x++) {
      let tex = (i32(g.y) * 8 + z) * N + i32(g.x) * 8 + x;
      if (keptInfo[tex].x != 0u) { most = max(most, keptTop[tex]); }
    }
  }
  let sq = ((vec2i(g.xy) - (blades.win.xz >> vec2u(3u))) & vec2i(${Q-1})) - bl_windSquare();
  if ((blades.jobs.z & 1u) != 0u && blades.air.z > 0.0 && all(sq >= vec2i(0)) && all(sq <= vec2i(2 * RING_M))) {
    let w = vec2i(i32(sign(blades.air.x)), i32(sign(blades.air.y)));
    let c0 = vec2i(g.xy) * 8;
    for (var z = 0; z < i32(bp.n8); z++) {
      for (var x = 0; x < i32(bp.n8); x++) {
        for (var k = 1; k < 4; k++) {
          let u = vec2i(select(0, w.x, (k & 1) != 0), select(0, w.y, (k & 2) != 0));
          if (all(u == vec2i(0))) { continue; }
          let a = (c0 + vec2i(x, z) - u) & vec2i(NM);
          let ta = a.y * N + a.x;
          let ka = keptInfo[ta];
          if (ka.x != 0u && keptTop[ta] - bitcast<f32>(ka.y) > ${sY}.5 * DC) { most = max(most, keptTop[ta]); }
        }
      }
    }
    if (most > NO_TOP * 0.5) { most = most + 2.0 * DC; }
  }
  maxima[i32(g.y) * ${Q} + i32(g.x)] = most;
}
fn bl_maximaEightPhase(i: u32) {
  let e2 = ${Z*Z}u;
  var most = NO_TOP;
  if (i < e2) {
    let sx = i32(i) % ${Z};
    let sz = i32(i) / ${Z};
    for (var z = 0; z < i32(bp.n8); z++) {
      for (var x = 0; x < i32(bp.n8); x++) {
        most = max(most, maxima[(sz * 8 + z) * ${Q} + sx * 8 + x]);
      }
    }
    maxima[${Q*Q}u + i] = most;
  }
  row[i] = most;
  workgroupBarrier();
  if (i == 0u) {
    var all = NO_TOP;
    for (var j = 0u; j < e2; j++) { all = max(all, row[j]); }
    maxima[${Q*Q}u + e2] = all;
  }
}`,kZ(`    case 0u: { bl_keepFootPhase(g, wg); }
    case 1u: { bl_keepPhase(g); }
    case 2u: { bl_maximaPhase(g); }
    case 3u: { bl_maximaEightPhase(lane); }
    case 4u: { bl_pressPhase(wg.x, lane); }
    case 5u: { bl_windPhase(g); }`)],`
`)}var fZ=`fn bk(i: u32) -> u32 { return book[i]; }
fn bkf(i: u32) -> f32 { return bitcast<f32>(book[i]); }
fn bl_look(key: u32) -> vec4u {
  if (key == 0u || key >= book[${j0.lookCount}u]) { return vec4u(0u); }
  let at = book[${j0.looks}u] + key * ${o.look}u;
  return vec4u(book[at], book[at + 1u], book[at + 2u], book[at + 3u]);
}
fn bl_unturn(rel: vec2i, r: u32) -> vec2i {
  var p = rel;
  if ((r & 2u) != 0u) { p.y = -p.y; }
  if ((r & 1u) != 0u) { p = p.yx; }
  if ((r & 4u) != 0u) { p.x = -p.x; }
  return p;
}`,j4=`
fn surf_fieldX(cell: vec3u, shift: vec3u, seed: u32) -> f32 {
  let size = vec3u(1u) << shift;
  let node = cell >> shift;
  let f = (vec3f(cell & (size - vec3u(1u))) + vec3f(0.5)) / vec3f(size);
  let w = f * f * (vec3f(3.0) - 2.0 * f);
  var sum = 0.0;
  for (var corner = 0u; corner < bp.n8; corner++) {
    let o = vec3u(corner & 1u, (corner >> 1u) & 1u, corner >> 2u);
    let h = surf_hash(node.x + o.x, node.y + o.y, node.z + o.z, seed);
    let value = f32(h & 1023u) * (1.0 / 1023.0);
    let k = mix(vec3f(1.0) - w, w, vec3f(o));
    sum = sum + value * (k.x * k.y * k.z);
  }
  return sum;
}`,q4=`
struct BlFace {
  block: u32,
  seed: u32,
  rootN: i32,
  w: u32,
}
fn bfc_rules(f: BlFace) -> u32 { return f.w & 7u; }
fn bfc_shift(f: BlFace) -> u32 { return (f.w >> 3u) & 15u; }
fn bfc_classes(f: BlFace) -> u32 { return (f.w >> 7u) & 7u; }
fn bfc_headed(f: BlFace) -> u32 { return (f.w >> 10u) & 7u; }
fn bfc_open(f: BlFace) -> f32 { return f32((f.w >> 13u) & 3u) / 3.0; }
fn bl_class(width: u32) -> u32 {
  return select(select(2u, 1u, width == 2u), 0u, width == 1u);
}
fn bl_ruleTop(face: BlFace, r: u32) -> bool {
  let base = face.block + 1u + r * ${t}u;
  return (u32(growthTable[base + ${e.counts}u].z) & ${a.top}u) != 0u;
}
fn bl_faceOf(block: u32, faceMicroY: i32, ao: u32) -> BlFace {
  var face: BlFace;
  let head = growthTable[block];
  face.block = block;
  let rules = min(u32(head.x), 6u);
  let shift = max(u32(head.y), 1u);
  face.seed = u32(head.z);
  face.rootN = faceMicroY >> shift;
  var classes = 0u;
  var headed = 0u;
  for (var r = 0u; r < rules; r++) {
    if (!bl_ruleTop(face, r)) { continue; }
    let base = block + 1u + r * ${t}u;
    let klass = 1u << bl_class(u32(clamp(growthTable[base + ${e.shape}u].z, 1.0, 4.0)));
    classes = classes | klass;
    if (growthTable[base + ${e.tone}u].x >= 0.5) { headed = headed | klass; }
  }
  face.w = rules | (min(shift, 15u) << 3u) | (classes << 7u) | (headed << 10u) | (ao << 13u);
  return face;
}
struct BlForm {
  w: u32,
}
fn bf_ok(w: u32) -> bool { return (w & 1u) != 0u; }
fn bf_headed(w: u32) -> bool { return (w & 2u) != 0u; }
fn bf_rule(w: u32) -> u32 { return (w >> 2u) & 7u; }
fn bf_height(w: u32) -> u32 { return (w >> 5u) & 31u; }
fn bf_head(w: u32) -> u32 { return (w >> 10u) & 7u; }
fn bf_hb(w: u32) -> u32 { return (w >> 13u) & 7u; }
fn bf_width(w: u32) -> i32 { return i32((w >> 16u) & 7u); }
fn bf_lo(w: u32, at: vec2i, klass: u32) -> vec2i {
  let root = (at >> vec2u(klass)) << vec2u(klass);
  return root + vec2i(i32((w >> 19u) & 1u), i32((w >> 20u) & 1u)) * ((1 << klass) - bf_width(w));
}
fn bl_formU(face: BlFace, root: vec2i) -> vec3u {
  return bitcast<vec3u>(vec3i(root.x, face.rootN, root.y)) + vec3u(0x40000000u);
}
fn bl_rule(face: BlFace, klass: u32, cu: i32, cv: i32, counted: bool, r: u32) -> BlForm {
  var out: BlForm;
  if (!bl_ruleTop(face, r)) { return out; }
  let size = 1 << klass;
  let root = vec2i((cu >> klass) << klass, (cv >> klass) << klass);
  let base = face.block + 1u + r * ${t}u;
  let width = u32(clamp(growthTable[base + ${e.shape}u].z, 1.0, 4.0));
  if (bl_class(width) != klass) { return out; }
  if (counted && !(growthTable[base + ${e.tone}u].x >= 0.5)) { return out; }
  let ruleSeed = face.seed + 131u * (r + 1u);
  let u = bl_formU(face, root);
  let place = growthTable[base + ${e.place}u];
  let tone = growthTable[base + ${e.tone}u];
  let most = place.w * f32(size * size) * clamp(1.0 + tone.y * (1.0 - 2.0 * bfc_open(face)), 0.0, 2.0);
  if (surf_unit(surf_hash(u.x, u.y, u.z, ruleSeed + 17u)) >= most) { return out; }
  let clump = u32(place.y);
  let mid = size >> 1u;
  let field = surf_fieldX(bl_formU(face, root + vec2i(mid)), vec3u(clump & 7u, (clump >> 3u) & 7u, (clump >> 6u) & 7u), ruleSeed);
  let u2 = bl_formU(face, (vec2i(cu, cv) >> vec2u(klass)) << vec2u(klass));
  let h = surf_hash(u2.x, u2.y, u2.z, ruleSeed + 17u);
  let place2 = growthTable[base + ${e.place}u];
  let tone2 = growthTable[base + ${e.tone}u];
  let most2 = place2.w * f32(size * size) * clamp(1.0 + tone2.y * (1.0 - 2.0 * bfc_open(face)), 0.0, 2.0);
  let inside = (field - place2.z) / max(1.0 - place2.z, 1e-3);
  if (inside <= 0.0) { return out; }
  if (surf_unit(h) >= most2 * mix(0.35, 1.0, sqrt(clamp(inside, 0.0, 1.0)))) { return out; }
  let h2 = surf_hash(u2.x, u2.y, u2.z, ruleSeed + 29u);
  let shape = growthTable[base + ${e.shape}u];
  let tall = pow(clamp(inside, 0.0, 1.0), 0.6) * (0.4 + 0.6 * surf_unit(h2));
  let height = u32(clamp(shape.x + floor((shape.y - shape.x + 0.999) * tall), 1.0, 16.0));
  let head = u32(clamp(tone2.x, 0.0, 4.0));
  let bends = height >= 2u && f32((h2 >> 3u) & 1023u) < shape.w * 1024.0;
  out.w = 1u | (select(0u, 2u, tone2.x >= 0.5)) | (r << 2u) | (height << 5u) | (head << 10u) | (((h >> 5u) & 7u) << 13u) | (width << 16u) | (((h2 >> 20u) & 3u) << 19u)
    | (select(0u, 1u, bends) << 21u) | (((h2 >> 15u) & 3u) << 22u) | (((h2 >> 13u) & 3u) << 24u) | (((h2 >> 17u) % max(head, 1u)) << 26u);
  return out;
}
fn bl_under(w: u32, lo: vec2i, lo2: vec2i, hi2: vec2i) -> u32 {
  let hi = lo + vec2i(bf_width(w));
  if (!bf_ok(w) || any(hi2 <= lo) || any(lo2 >= hi)) { return 0u; }
  return select(2u, 1u, all(lo2 >= lo) && all(hi2 <= hi));
}
fn bl_toneWord(rule: u32, hb: u32, head: u32, lift: u32, under: u32) -> u32 {
  return ((rule & 7u) << 14u) | (hb << 17u) | (min(head, 7u) << 20u) | (min(lift, 63u) << 23u) | ((under & 7u) << 29u);
}
fn bl_pre(f2: u32, f1in: u32, at: vec2i) -> vec2u {
  var f1 = f1in;
  let lo2 = bf_lo(f2, at, 2u);
  let lo1 = bf_lo(f1, at, 1u);
  let top2 = bf_height(f2) + bf_head(f2);
  let top1 = bf_height(f1) + bf_head(f1);
  var lift1 = 0u;
  if (bf_ok(f1)) {
    let under = bl_under(f2, lo2, lo1, lo1 + vec2i(bf_width(f1)));
    if (under == 2u) { f1 = f1 & ~1u; }
    if (under == 1u) { lift1 = top2; }
  }
  let on2 = bl_under(f2, lo2, at, at + vec2i(1)) == 1u;
  let on1 = bl_under(f1, lo1, at, at + vec2i(1)) == 1u;
  var lift0 = 0u;
  var top = 0u;
  var tone = 0u;
  if (on2) {
    lift0 = top2;
    top = top2;
    tone = bl_toneWord(bf_rule(f2), bf_hb(f2), bf_head(f2), 0u, bf_rule(f2));
  }
  if (on1 && top1 > lift0) { lift0 = top1; }
  if (on1 && top1 > top) {
    top = top1;
    tone = bl_toneWord(bf_rule(f1), bf_hb(f1), bf_head(f1), lift1, bf_rule(f2));
  }
  return vec2u(top | (lift0 << 7u) | (select(bf_rule(f2), bf_rule(f1), on1) << 14u), tone);
}
struct BlColumn {
  tone: u32,
  w: u32,
}
fn bc_top(c: BlColumn) -> u32 { return c.w & 127u; }
fn bc_height(c: BlColumn) -> u32 { return (c.w >> 7u) & 31u; }
fn bc_head(c: BlColumn) -> u32 { return (c.w >> 12u) & 7u; }
fn bc_bends(c: BlColumn) -> bool { return (c.w & 0x8000u) != 0u; }
fn bc_grows(c: BlColumn) -> bool { return (c.w & 0x10000u) != 0u; }
fn bc_empty(c: BlColumn) -> bool { return (c.w & 0x20000u) != 0u; }
fn bc_asks(c: BlColumn) -> bool { return bc_grows(c) && (bc_bends(c) || bc_head(c) > 1u); }
fn bc_armTone(c: BlColumn) -> u32 {
  let rule = (c.w >> 18u) & 7u;
  return bl_toneWord(rule, (c.w >> 21u) & 7u, bc_head(c), bc_height(c) + bc_head(c), rule);
}
fn bl_columnOf(face: BlFace, pre: vec2u, m: BlForm) -> BlColumn {
  let lift0 = (pre.x >> 7u) & 127u;
  var c: BlColumn;
  c.tone = pre.y;
  let height = bf_height(m.w);
  let head = bf_head(m.w);
  let rule = bf_rule(m.w);
  c.w = (pre.x & 127u) | (height << 7u) | (head << 12u) | select(0u, 0x20000u, !bf_ok(m.w) && lift0 == 0u) | (rule << 18u) | (bf_hb(m.w) << 21u) | (((m.w >> 22u) & 63u) << 24u);
  if (bf_ok(m.w) && height + head > lift0) {
    c.tone = bl_toneWord(rule, bf_hb(m.w), head, lift0, pre.x >> 14u);
    c.w = c.w | 0x10000u | (((m.w >> 21u) & 1u) << 15u);
  }
  return c;
}
fn bl_aside(code: u32) -> vec2i {
  return vec2i(i32(code == 1u) - i32(code == 2u), i32(code == 3u) - i32(code == 4u));
}
fn bl_takes(face: BlFace, cu: i32, cv: i32) -> u32 {
  let u = bitcast<vec3u>(vec3i(cu, face.rootN, cv)) + vec3u(0x40000000u);
  return (surf_hash(u.x, u.y, u.z, face.seed + 4051u) & 3u) + 1u;
}
fn bl_side(open: u32, pick: u32) -> u32 {
  let bits = (open >> 1u) & 15u;
  let turned = ((bits >> pick) | (bits << (4u - pick))) & 15u;
  if (turned == 0u) { return 0u; }
  return ((firstTrailingBit(turned) + pick) & 3u) + 1u;
}
struct BlStack {
  top: u32,
  step: u32,
  side: u32,
  armLo: u32,
  armLen: u32,
  tone: u32,
}
fn bl_stackEnd(c: BlColumn, open: u32) -> BlStack {
  var s: BlStack;
  s.top = bc_top(c);
  s.tone = c.tone;
  if (bc_grows(c)) {
    let height = bc_height(c);
    let head = bc_head(c);
    if (bc_bends(c)) { s.step = bl_side(open, (c.w >> 24u) & 3u); }
    if (head > 1u && s.step == 0u) { s.side = bl_side(open, (c.w >> 26u) & 3u); }
    if (s.step != 0u) {
      s.top = max(s.top, height - 1u);
      s.tone = s.tone & ~(7u << 20u);
      s.armLo = height - 1u;
      s.armLen = 1u + head;
    } else {
      s.top = max(s.top, height + head);
      if (s.side != 0u) {
        s.armLo = height + (c.w >> 28u);
        s.armLen = 1u;
      }
    }
  }
  return s;
}
fn bl_ycOf(st: u32, at: vec2i) -> vec2i { return at + vec2i(i32((st >> 23u) & 15u), i32((st >> 27u) & 15u)) - vec2i(8); }
fn bl_ycWord(d: vec2i) -> u32 { return (u32(d.x + 8) << 23u) | (u32(d.y + 8) << 27u); }
fn bl_turnAt(gc: vec2i, st: u32) -> vec2i {
  let turn = st & 7u;
  var at = gc;
  if (turn >= 2u) { at = at - bl_aside((st >> 6u) & 7u); }
  if ((turn & 1u) != 0u) { at = at + bl_aside((st >> 3u) & 7u); }
  return at;
}`;function Y4($){return L0(["//",c8,s5,"@group(1) @binding(0) var<uniform> blades: Blades;","@group(1) @binding(1) var<uniform> bp: BlPhase;","@group(1) @binding(2) var<storage, read> footJobs: array<vec4i>;","@group(1) @binding(3) var<storage, read> ground: array<u32>;","@group(1) @binding(4) var<storage, read_write> colsA: array<vec4u>;","@group(1) @binding(5) var<storage, read_write> colsB: array<vec4u>;","@group(1) @binding(6) var<storage, read_write> owners: array<vec2u>;","@group(1) @binding(7) var<storage, read> book: array<u32>;","@group(1) @binding(8) var<storage, read> growthTable: array<vec4f>;",C$($),"fn groundAt(tex: i32) -> u32 { return ground[tex]; }",["surf_hash","surf_unit"].map((J)=>e9(k0,J)).join(`
`),`${j4}
fn bl_colTop(g: u32) -> u32 { return g & 63u; }
fn bl_armLo1(g: u32) -> u32 { return (g >> 6u) & 63u; }`,fZ,`${q4}
fn bl_put(tex: i32, i: u32, run: u32, whoTone: u32, whoArm: u32) {
  let ga = tex * 2 + i32(i >> 3u);
  let gc = (i >> 1u) & 3u;
  let sh = (i & 1u) * 16u;
  let pair = colsA[ga][gc];
  var geo = (pair >> sh) & 0xffffu;
  let ob = tex * 4 + i32(i >> 2u);
  var own = colsB[ob][i & 3u];
  let t = run & 63u;
  if (t > bl_colTop(geo)) {
    geo = (geo & ~63u) | t;
    own = (own & 0x3000u) | whoTone;
  }
  let armLo = (run >> 6u) & 63u;
  if ((run & 0x7000u) != 0u && bl_armLo1(geo) == 0u && armLo >= bl_colTop(geo)) {
    geo = (geo & 63u) | ((armLo + 1u) << 6u) | ((((run >> 12u) & 7u) - 1u) << 12u);
    if (bl_colTop(geo) == 0u) { own = whoArm; }
    own = (own & ~0x3000u) | (((run >> 15u) & 3u) << 12u);
  }
  colsA[ga][gc] = (pair & ~(0xffffu << sh)) | (geo << sh);
  colsB[ob][i & 3u] = own;
}
fn bl_run(top: u32, armLo: u32, armLen: u32, came: u32) -> u32 {
  let armOk = armLen > 0u && armLo + 1u <= 63u;
  return min(top, 63u) | (select(0u, armLo, armOk) << 6u) | (select(0u, min(armLen, 4u), armOk) << 12u) | (came << 15u);
}
fn bl_who(owner: u32, rank: u32, unit: u32) -> u32 { return owner | (rank << 2u) | (unit << 10u); }
fn bl_rank(x: i32, z: i32, part: u32, seed: u32) -> u32 {
  let u = bitcast<vec2u>(vec2i(x, z)) + vec2u(0x40000000u);
  return surf_hash(u.x, part, u.y, seed + 0x51ed27u) >> 24u;
}
fn bl_cluster(layer: u32, p: vec2f, h: u32) -> bool {
  let square = bkf(layer + 1u);
  if (square <= 0.0) { return true; }
  let radius = bkf(layer + 2u);
  let falloff = bkf(layer + 3u);
  let seed = bk(layer + 4u);
  let home = vec2i(floor(p / square));
  var best = 1e30;
  for (var q = 0u; q < bp.n9; q++) {
    let s = home + vec2i(i32(q % 3u) - 1, i32(q / 3u) - 1);
    let u = bitcast<vec2u>(s) + vec2u(0x40000000u);
    let hc = surf_hash(u.x, 911u, u.y, seed);
    let centre = (vec2f(s) + vec2f(surf_unit(hc), surf_unit(hc * 0x9E3779B1u))) * square;
    best = min(best, distance(centre, p));
  }
  let whole = radius * (1.0 - falloff);
  let keep = 1.0 - clamp((best - whole) / max(radius - whole, 1e-3), 0.0, 1.0);
  return surf_unit(h * 0x85EBCA77u) < keep;
}
fn bl_fill(cellW: vec2i) {
  let tex = bl_tex(cellW - blades.win.xz);
  colsA[tex * 2] = vec4u(0u);
  colsA[tex * 2 + 1] = vec4u(0u);
  for (var q = 0; q < i32(bp.n4); q++) { colsB[tex * 4 + q] = vec4u(0u); }
  bl_fillGrowth(cellW);
  bl_fillPlants(cellW);
}
fn bl_fillGrowth(cellW: vec2i) {
  let tex = bl_tex(cellW - blades.win.xz);
  let key = groundAt(tex);
  let entry = bl_look(key & 4095u);
  if (key != 0u && entry.x != 0u) {
    let face = bl_faceOf(entry.x - 1u, i32(key >> 14u) - i32(Y_BIAS * Y_STEPS), (key >> 12u) & 3u);
      if (bfc_classes(face) != 0u) {
        let shift = bfc_shift(face);
        var gc = (cellW * ${J8}) >> vec2u(shift);
        var st = 0u;
        var cc: BlColumn;
        var fp = vec2u(0u);
        var m: BlForm;
        loop {
          var ended = false;
          if ((st & 0x4000u) == 0u) {
            var ask = true;
            if ((st & 1u) != 0u) {
              let centre = bl_turnAt(gc, st & ~0x38u);
              let takeSide = (st >> 6u) & 7u;
              var code = (st >> 3u) & 7u;
              var open = (st >> 9u) & 31u;
              loop {
                code++;
                if (code > 4u) { break; }
                let to = centre + bl_aside(code);
                if (bl_takes(face, to.x, to.y) != code) { continue; }
                if ((st & 7u) == 3u && code == takeSide) { open = open | (1u << code); continue; }
                break;
              }
              ask = code <= 4u;
              st = (st & ~(0x38u | (31u << 9u))) | (code << 3u) | (open << 9u);
            }
            if (ask) {
              st = (st & 0x3fffu) | 0x4000u | (3u << 15u);
              fp = vec2u(0u);
            } else {
              ended = true;
            }
          }
          if ((st & 0x4000u) != 0u) {
            var f = BlForm();
            var resolved = false;
            {
              let at = bl_turnAt(gc, st);
              let k = ((st >> 15u) & 3u) - 1u;
              let yielding = (st & (4u << 15u)) != 0u;
              let kk = (st >> 18u) & 3u;
              resolved = !yielding && (bfc_classes(face) & (1u << k)) == 0u;
              if (!resolved) {
                let r = (st >> 20u) & 7u;
                let yc = bl_ycOf(st, at);
                if (r >= bfc_rules(face)) {
                  resolved = true;
                } else {
                  f = bl_rule(face, select(k, kk, yielding), select(at.x, yc.x, yielding), select(at.y, yc.y, yielding), yielding, r);
                  resolved = bf_ok(f.w);
                  st = st + (1u << 20u);
                }
              }
            }
            if (resolved) {
              let at = bl_turnAt(gc, st);
              let k = i32((st >> 15u) & 3u) - 1;
              let yielding = (st & (4u << 15u)) != 0u;
              let kk = (st >> 18u) & 3u;
              var yc = bl_ycOf(st, at);
              var done = true;
              var nk = kk;
              var y = yielding;
              if (!yielding) {
                m = f;
                let narrower = bfc_headed(face) & ((1u << u32(k)) - 1u);
                if (k > 0 && bf_ok(m.w) && !bf_headed(m.w) && narrower != 0u) {
                  y = true;
                  nk = firstTrailingBit(narrower);
                  yc = (bf_lo(m.w, at, u32(k)) >> vec2u(nk)) << vec2u(nk);
                  done = false;
                }
              } else {
                let mlo = bf_lo(m.w, at, u32(k));
                let mhi = mlo + vec2i(bf_width(m.w));
                if (bl_under(f.w, bf_lo(f.w, yc, kk), mlo, mhi) != 0u) {
                  m.w = m.w & ~1u;
                } else {
                  let size = 1 << kk;
                  yc.x = yc.x + size;
                  if (yc.x >= mhi.x) {
                    yc.x = (mlo.x >> kk) << kk;
                    yc.y = yc.y + size;
                  }
                  if (yc.y < mhi.y) {
                    done = false;
                  } else {
                    let rest = bfc_headed(face) & ((1u << u32(k)) - 1u) & ~((2u << kk) - 1u);
                    if (rest != 0u) {
                      nk = firstTrailingBit(rest);
                      yc = (mlo >> vec2u(nk)) << vec2u(nk);
                      done = false;
                    }
                  }
                }
              }
              var nkk = k;
              if (done) {
                y = false;
                if (k == 2) { fp.x = m.w; } else if (k == 1) { fp = bl_pre(fp.x, m.w, at); }
                nkk = k - 1;
              }
              st = (st & 0x7fffu) | (u32(nkk + 1) << 15u) | select(0u, 4u << 15u, y) | (nk << 18u) | bl_ycWord(yc - at);
              if (nkk < 0) {
                st = st & ~0x4000u;
                let col = bl_columnOf(face, fp, m);
                if ((st & 1u) == 0u) {
                  cc = col;
                  st = st & ~(0x38u | (31u << 9u));
                  if (bc_asks(col)) { st++; } else { ended = true; }
                } else if (bc_empty(col)) {
                  st = st | (1u << (9u + ((st >> 3u) & 7u)));
                }
              }
            }
          }
          if (ended) {
            let turn = st & 7u;
            let takeSide = (st >> 6u) & 7u;
            let s = bl_stackEnd(cc, (st >> 9u) & 31u);
            var top = 0u;
            var tone = 0u;
            var armLo = 0u;
            var armLen = 0u;
            var came = 0u;
            var more = false;
            if (turn <= 1u) {
              top = s.top;
              tone = s.tone;
              if (bc_empty(cc)) {
                st = 2u | (bl_takes(face, gc.x, gc.y) << 6u);
                more = true;
              }
            } else if ((s.step == takeSide || s.side == takeSide) && s.armLen > 0u) {
              armLo = s.armLo;
              armLen = s.armLen;
              came = takeSide - 1u;
            }
            let who = bl_who(0u, bl_rank(gc.x, gc.y, 0u, face.seed), u32(clamp(firstTrailingBit(u32(max((1 << shift) / ${d5}, 1))), 0u, 3u)));
            let scale = u32(max((1 << shift) / ${d5}, 1));
            let run = bl_run(top * scale, armLo * scale, armLen * scale, came);
            let whoTone = who | tone;
            let whoArm = who | bc_armTone(cc);
            cc = BlColumn();
            m = BlForm();
            fp = vec2u(0u);
            if (top != 0u || armLen != 0u) {
              let span = i32(scale);
              let col0 = cellW * ${n0};
              let bx = vec4i(max(gc.x * span, col0.x), min((gc.x + 1) * span, col0.x + ${n0}), max(gc.y * span, col0.y), min((gc.y + 1) * span, col0.y + ${n0})) - col0.xxyy;
              for (var i = 0u; i < bp.n16; i++) {
                let c = vec2i(i32(i & 3u), i32(i >> 2u));
                if (c.x >= bx.x && c.x < bx.y && c.y >= bx.z && c.y < bx.w) { bl_put(tex, i, run, whoTone, whoArm); }
              }
            }
            if (!more) {
              st = 0u;
              gc.x = gc.x + 1;
              if (gc.x > (cellW.x * ${J8} + ${J8-1}) >> shift) {
                gc.x = (cellW.x * ${J8}) >> shift;
                gc.y = gc.y + 1;
                if (gc.y > (cellW.y * ${J8} + ${J8-1}) >> shift) { break; }
              }
            }
          }
        }
      }
  }
}
fn bl_plant(tex: i32, col0: vec2i, layer: u32, sc: vec2i, plantsIn: vec2u) -> vec2u {
  var plants = plantsIn;
  let spacing = bkf(layer);
  let lseed = bk(layer + 4u);
  let reachCols = f32(bk(layer + 8u));
  let lo = vec2f(col0) - vec2f(reachCols);
  let hi = vec2f(col0 + vec2i(${n0-1})) + vec2f(reachCols);
  let u = bitcast<vec2u>(sc) + vec2u(0x40000000u);
  let h = surf_hash(u.x, 7u, u.y, lseed);
  let site = (vec2f(f32(sc.x), f32(sc.y)) + vec2f(surf_unit(h), surf_unit(h * 0x9E3779B1u))) * spacing;
  let anchor = vec2i(floor(site));
  if (any(vec2f(anchor) < lo) || any(vec2f(anchor) > hi)) { return plants; }
  if (!bl_cluster(layer, site, h)) { return plants; }
  let itemFirst = bk(layer + 5u);
  let itemCount = bk(layer + 6u);
  let pick = surf_unit(h * 0xC2B2AE3Du) * bkf(book[${j0.items}u] + (itemFirst + itemCount - 1u) * ${o.item}u + 1u);
  var item = itemFirst;
  for (var k = 0u; k < itemCount; k++) {
    item = itemFirst + k;
    if (pick < bkf(book[${j0.items}u] + item * ${o.item}u + 1u)) { break; }
  }
  let itemAt = book[${j0.items}u] + item * ${o.item}u;
  let sink = bk(itemAt + 4u);
  let stampAt = book[${j0.stamps}u] + bk(itemAt) * ${o.stamp}u;
  let r = select(0u, (h >> 5u) & 7u, bk(layer + 7u) != 0u);
  let d = anchor - col0 + vec2i(64);
  let pref = ((item & 0x3ffu) | (r << 10u) | (u32(clamp(d.x, 0, 127)) << 13u) | (u32(clamp(d.y, 0, 127)) << 20u) | (((h >> 13u) & 31u) << 27u)) + 1u;
  let sw = i32(bk(stampAt));
  let sd = i32(bk(stampAt + 1u));
  let colsAt = book[${j0.stampCols}u] + bk(stampAt + 3u);
  let originWord = bk(stampAt + 6u);
  let whole = (bk(stampAt + 7u) & 1u) != 0u;
  var slot = 0u;
  for (var i = 0u; i < bp.n16; i++) {
    let l = bl_unturn(col0 + vec2i(i32(i & 3u), i32(i >> 2u)) - anchor, r) + vec2i(i32(originWord & 0xffffu), i32(originWord >> 16u));
    if (l.x < 0 || l.y < 0 || l.x >= sw || l.y >= sd) { continue; }
    let word = book[colsAt + u32(l.y * sw + l.x)];
    if (word == 0u) { continue; }
    if (slot == 0u) {
      if (plants.x == 0u) { plants.x = pref; slot = 1u; }
      else if (plants.y == 0u && plants.x != pref) { plants.y = pref; slot = 2u; }
      else if (plants.x == pref) { slot = 1u; }
      else { break; }
    }
    let topC = word & 63u;
    let lo1 = (word >> 6u) & 63u;
    let rank = bl_rank(anchor.x, anchor.y, select(((word >> 16u) & 63u) + 1u, 0u, whole), lseed);
    let top = select(0u, topC - min(sink, topC), topC > sink);
    var armLo = 0u;
    var armLen = 0u;
    if (lo1 > 0u && lo1 - 1u >= sink) {
      armLo = lo1 - 1u - sink;
      armLen = ((word >> 12u) & 3u) + 1u;
    }
    let who = bl_who(slot, rank, (word >> 14u) & 3u);
    bl_put(tex, i, bl_run(top, armLo, armLen, 0u), who, who);
  }
  return plants;
}
fn bl_fillPlants(cellW: vec2i) {
  let tex = bl_tex(cellW - blades.win.xz);
  var plants = vec2u(0u);
  let key = groundAt(tex);
  let entry = bl_look(key & 4095u);
  if (key == 0u) {
    owners[tex] = plants;
    return;
  }
  let col0 = cellW * ${n0};
  for (var li = 0u; li < min(entry.z, ${r5}u); li++) {
    let layer = book[${j0.layers}u] + (entry.y + li) * ${o.layer}u;
    let spacing = bkf(layer);
    if (spacing <= 0.0) { continue; }
    let reachCols = f32(bk(layer + 8u));
    let s0 = vec2i(floor((vec2f(col0) - vec2f(reachCols)) / spacing));
    let s1 = vec2i(floor((vec2f(col0 + vec2i(${n0-1})) + vec2f(reachCols)) / spacing));
    for (var sz = s0.y; sz <= s1.y; sz++) {
      for (var sx = s0.x; sx <= s1.x; sx++) {
        plants = bl_plant(tex, col0, layer, vec2i(sx, sz), plants);
      }
    }
  }
  owners[tex] = plants;
}`,`@compute @workgroup_size(8, 8)
fn main(@builtin(global_invocation_id) g: vec3u, @builtin(workgroup_id) wg: vec3u) {
  let job = wg.z;
  if (job >= blades.jobs.y) { return; }
  bl_fill(footJobs[job].xy + vec2i(g.xy & vec2u(31u)));
}`],`
`)}var V4=`struct BlFace {
  block: u32,
  rules: u32,
  shift: u32,
  seed: u32,
  rootN: i32,
  open: f32,
  classes: u32,
  headed: u32,
}
fn bl_class(width: u32) -> u32 {
  return select(select(2u, 1u, width == 2u), 0u, width == 1u);
}
fn bl_ruleTop(face: BlFace, r: u32) -> bool {
  let base = face.block + 1u + r * ${t}u;
  return (u32(growthTable[base + ${e.counts}u].z) & ${a.top}u) != 0u;
}
fn bl_faceOf(block: u32, faceMicroY: i32, ao: u32) -> BlFace {
  var face: BlFace;
  let head = growthTable[block];
  face.block = block;
  face.rules = min(u32(head.x), 6u);
  face.shift = max(u32(head.y), 1u);
  face.seed = u32(head.z);
  face.rootN = faceMicroY >> face.shift;
  face.open = f32(ao) / 3.0;
  face.classes = 0u;
  face.headed = 0u;
  for (var r = 0u; r < face.rules; r++) {
    if (!bl_ruleTop(face, r)) { continue; }
    let base = block + 1u + r * ${t}u;
    let klass = 1u << bl_class(u32(clamp(growthTable[base + ${e.shape}u].z, 1.0, 4.0)));
    face.classes = face.classes | klass;
    if (growthTable[base + ${e.tone}u].x >= 0.5) { face.headed = face.headed | klass; }
  }
  return face;
}`,H4=`const BL_AO_CURVE = array<f32, 4>(${k9.join(", ")});
struct BlTone {
  rgb: vec3f,
  roughness: f32,
  metalness: f32,
  glow: f32,
  head: bool,
}
fn bl_toneOf(t: VoxelSurfaceTone) -> BlTone {
  return BlTone(t.rgb, t.shade.x, t.shade.y, t.shade.z, false);
}
fn bl_fieldTone(face: BlFace, lookRow: u32, rule: u32, jitterQ: u32, total: f32, head: bool, along: u32, ao: u32, cu: i32, cv: i32) -> BlTone {
  let ruleRow = face.block + 1u + min(rule, 5u) * ${t}u;
  let toneRow = growthTable[ruleRow + ${e.tone}u];
  let counts = growthTable[ruleRow + ${e.counts}u];
  let jitter = f32(jitterQ) / 7.0;
  let f = clamp((f32(along) + 0.5) / max(total, 1.0), 0.0, 1.0);
  var tone: VoxelSurfaceTone;
  if (head && counts.y > 0.5) {
    tone = surf_tone(growthTable[ruleRow + ${e.head}u + min(u32(jitter * counts.y), u32(counts.y) - 1u)]);
  } else if (counts.x > 0.5) {
    tone = surf_tone(growthTable[ruleRow + ${e.own}u + min(u32(clamp(f + (jitter - 0.5) * 0.3, 0.0, 0.999) * counts.x), u32(counts.x) - 1u)]);
  } else {
    let capRow = u32(voxelSurfaceTable[lookRow].z);
    let look = select(lookRow, capRow, capRow != 0u);
    let span = voxelSurfaceTable[look + ${s.base}u];
    let faceRow = voxelSurfaceTable[look + ${s.face}u];
    let ramp = clamp(mix(toneRow.z, toneRow.w, f) + (jitter - 0.5) * 0.3, 0.0, 1.0);
    let at = mix(span.z, span.w, ramp) + faceRow.x;
    var drift = 0.0;
    let headWord = voxelSurfaceTable[look];
    let flags = u32(headWord.w);
    if ((flags & ${_0.drift}u) != 0u) {
      let driftRow = voxelSurfaceTable[look + ${s.drift}u];
      let cell = bitcast<vec3u>(vec3i(cu, face.rootN, cv)) + vec3u(0x40000000u);
      var frameCell = cell;
      if ((flags & ${_0.world}u) == 0u) { frameCell = cell.xzy; }
      let dv = surf_drift(frameCell.xy, 1u, u32(driftRow.x), u32(headWord.y) + 3u);
      drift = smoothstep(driftRow.y - 0.1, driftRow.y + 0.1, dv) - 1.0 + smoothstep(driftRow.z - 0.1, driftRow.z + 0.1, dv);
    }
    tone = surf_ramp(look + ${s.tones}u, clamp(round(at + drift), span.z, span.w));
  }
  var out = bl_toneOf(tone);
  out.rgb = out.rgb * mix(BL_AO_CURVE[ao] * 0.7, 1.0, smoothstep(0.0, 3.0, f32(along)));
  out.head = head && counts.y > 0.5;
  return out;
}
fn bl_fieldCube(face: BlFace, lookRow: u32, colW: vec2i, level: u32, arm: bool, own: u32, colTop: u32, ao: u32) -> BlTone {
  let span = max((1 << face.shift) / ${d5}, 1);
  let scale = u32(span);
  let cell = vec2i(floor(vec2f(colW) / f32(span)));
  let gl = level / scale;
  let head = (own >> 20u) & 7u;
  let lift = (own >> 23u) & 63u;
  var rule = (own >> 14u) & 7u;
  var jitter = (own >> 17u) & 7u;
  var total = f32(lift);
  var headed = head > 0u && gl + head >= lift;
  if (!arm) {
    if (gl < lift) {
      rule = own >> 29u;
      jitter = (own >> 2u) & 7u;
      headed = false;
    } else {
      let whole = max(colTop / scale, gl + 1u);
      total = f32(whole);
      headed = head > 0u && gl + head >= whole;
    }
  }
  return bl_fieldTone(face, lookRow, rule, jitter, total, headed, gl, ao, cell.x, cell.y);
}
fn bl_plantCube(pref: u32, col0: vec2i, colW: vec2i, level: u32) -> BlTone {
  var out = BlTone(vec3f(0.3, 0.5, 0.2), 1.0, 0.0, 0.0, false);
  if (pref == 0u) { return out; }
  let r1 = pref - 1u;
  let item = r1 & 0x3ffu;
  let turn = (r1 >> 10u) & 7u;
  let anchor = col0 + vec2i(i32((r1 >> 13u) & 127u), i32((r1 >> 20u) & 127u)) - vec2i(64);
  let jitterHash = (r1 >> 27u) & 31u;
  let itemAt = book[${j0.items}u] + item * ${o.item}u;
  let stamp = bk(itemAt);
  let sink = bk(itemAt + 4u);
  let stampAt = book[${j0.stamps}u] + stamp * ${o.stamp}u;
  let w = bk(stampAt);
  let d = bk(stampAt + 1u);
  let hgt = bk(stampAt + 2u);
  let origin = vec2i(i32(bk(stampAt + 6u) & 0xffffu), i32(bk(stampAt + 6u) >> 16u));
  let l = bl_unturn(colW - anchor, turn) + origin;
  let y = level + sink;
  if (l.x < 0 || l.y < 0 || u32(l.x) >= w || u32(l.y) >= d || y >= hgt) { return out; }
  let cellIndex = (y * d + u32(l.y)) * w + u32(l.x);
  let gridAt = book[${j0.grid}u] + bk(stampAt + 4u);
  let byte = (book[gridAt + (cellIndex >> 2u)] >> ((cellIndex & 3u) * 8u)) & 255u;
  if (byte == 0u) { return out; }
  let pal = book[${j0.palette}u] + (bk(stampAt + 5u) + byte - 1u) * ${o.palette}u;
  let rgb = vec3f(bkf(pal), bkf(pal + 1u), bkf(pal + 2u));
  let shade = bk(pal + 3u);
  let hueDeg = bkf(itemAt + 2u);
  let value = bkf(itemAt + 3u);
  let j = f32(jitterHash) / 31.0 * 2.0 - 1.0;
  let k = fract(f32(jitterHash) * 0.618034) * 2.0 - 1.0;
  let angle = radians(hueDeg) * j;
  let grey = vec3f(dot(rgb, vec3f(0.3333)));
  let axis = normalize(vec3f(1.0));
  let v = rgb - grey;
  let turned = v * cos(angle) + cross(axis, v) * sin(angle) + axis * dot(axis, v) * (1.0 - cos(angle));
  out.rgb = max(grey + turned, vec3f(0.0)) * max(1.0 + value * k, 0.0);
  out.roughness = f32(shade & 255u) / 255.0;
  out.metalness = f32((shade >> 8u) & 15u) / 15.0;
  out.glow = f32((shade >> 12u) & 15u) / 15.0;
  return out;
}`,e5=12,$6=(2*e5+1)*8,pZ=($)=>(pZ=$c0C(97))($),K4=($)=>`
const RING: f32 = ${e5}.0;
fn bl_metreLean(m: vec2i) -> vec2f {
  let dir = blades.air.xy;
  let p = vec2f(m + (blades.win.xz >> vec2u(3u))) + vec2f(0.5);
  let ph = dot(p, dir);
  let t = blades.eye.w;
  let g = 0.55 + 0.30 * sin(t * 1.7 - ph * 0.3 + 0.6 * sin(0.11 * p.x + 0.07 * p.y)) + 0.15 * sin(t * 3.9 - ph * 0.35);
  let d = length(vec2f(m) + vec2f(0.5) - blades.eye.xz);
  return dir * (blades.air.z * g * clamp((RING - d) * (3.0 / RING), 0.0, 1.0));
}
fn bl_windColumn(local: vec2i, q: vec2i, yW: f32) -> vec2u {
  let cell = local + (q >> vec2u(2u));
  let tex = bl_tex(cell);
  let kv = keptInfo[tex];
  let qi = u32((q.y & 3) * 4 + (q.x & 3));
  let yS = bitcast<f32>(kv.y);
  let own = keptTop[tex];
  if (((kv.x >> qi) & 1u) == 0u || own - yS <= LAWN_TOP) { return vec2u(0u); }
  let geo = (colsA[tex * 2 + i32(qi >> 3u)][(qi >> 1u) & 3u] >> ((qi & 1u) * 16u)) & 0xffffu;
  var cap = 1024u;
  if ((kv.x & PRESSED) != 0u) { cap = bl_pressCap(kv.w, cell, u32(round((own - yS) / DC))); }
  let d = i32(round((yS - yW) * (1.0 / DC)));
  let top = i32(min(bl_colTop(geo), cap));
  let lo1 = i32(bl_armLo1(geo));
  var o = bl_levels(d, d + top - 1);
  var most = top;
  if (lo1 > 0 && u32(lo1) + bl_armLen(geo) <= cap + 1u) {
    let end = lo1 - 1 + i32(bl_armLen(geo));
    o = o | bl_levels(d + lo1 - 1, d + end - 1);
    most = max(most, end);
  }
  return vec2u(o, u32(max(d + most, 0)));
}
${$?"var<workgroup> windFold: array<vec2u, 64>; //":`var<workgroup> windTop: array<atomic<u32>, 4>;
var<workgroup> windAny: array<atomic<u32>, 4>;`}
fn bl_windPhase(g: vec3u) {
  let lane = (g.y & 7u) * 8u + (g.x & 7u);
  let k = lane >> 4u;
  let ci = lane & 15u;
  let sq = bl_windSquare();
  let s = vec2i(g.xy >> vec2u(3u)) * 2 + vec2i(i32(k & 1u), i32(k >> 1u)) + sq * 8 - vec2i(SPAN0);
  let local = s + vec2i(SPAN0);
  var lean = vec2f(0.0);
  if ((blades.jobs.z & 1u) != 0u && blades.air.z > 0.0) { lean = bl_metreLean(local >> vec2u(3u)); }
  if (ci == 0u && all((s & vec2i(7)) == vec2i(0))) {
    let at = u32((s.y >> 3u) * (SPAN / 8) + (s.x >> 3u)) * 2u;
    wind[at] = bitcast<u32>(lean.x);
    wind[at + 1u] = bitcast<u32>(lean.y);
  }
  if (all(g.xy == vec2u(0u))) {
    wind[WIND_SQ] = bitcast<u32>(sq.x);
    wind[WIND_SQ + 1u] = bitcast<u32>(sq.y);
  }
  let tex = bl_tex(local);
  let own = keptTop[tex];
  let kv = keptInfo[tex];
  let yW = bitcast<f32>(kv.y);
  let laid = any(lean != vec2f(0.0)) && own > NO_TOP * 0.5;
  let lawn = laid && kv.x != 0u && own - yW <= LAWN_TOP;
${$?"  var mine = vec2u(0u);":`  if (ci == 0u) {
    atomicStore(&windTop[k], 0u);
    atomicStore(&windAny[k], select(0u, LAWN_CELL, lawn));
  }
  workgroupBarrier();`}
  if (laid) {
    let c = vec2i(i32(ci & 3u), i32(ci >> 2u));
    var m = 0u;
    var band = 0u;
    var c0 = bl_carry(lean, 0);
    for (var l = 0; l < 14; l++) {
      let cl = bl_carry(lean, l);
      if (any(cl != c0)) {
        m = m | (bl_windColumn(local, c - c0, yW).x & band);
        band = 0u;
        c0 = cl;
      }
      band = band | select(1u << u32(l), 0xffffe000u, l == 13);
    }
    let tip = bl_windColumn(local, c - c0, yW);
    m = m | (tip.x & band);
    wind[WIND_MASKS + u32(s.y * SPAN + s.x) * 16u + ci] = m;
    var hi = select(0u, firstLeadingBit(m) + 1u, m != 0u);
    if ((tip.x & band) != 0u) { hi = max(hi, tip.y + select(0u, 1u, tip.y > 32u)); }
${$?`    mine = vec2u(hi, select(0u, 1u << ci, m != 0u));
  }
  windFold[lane] = mine;
${BZ((J)=>`windFold[${J}]`,"lane",16,(J,Q)=>`vec2u(max(${J}.x, ${Q}.x), ${J}.y | ${Q}.y)`)}
  if (ci == 0u) {
    let at = WIND_CELLS + u32(s.y * SPAN + s.x) * 2u;
    let cell = windFold[lane];
    var top = own;
    if (laid) { top = max(yW + f32(cell.x) * DC, select(NO_TOP, own, lawn)); }
    wind[at] = bitcast<u32>(top);
    wind[at + 1u] = select(0u, cell.y | select(0u, LAWN_CELL, lawn), laid);
  }`:`    atomicMax(&windTop[k], hi);
    if (m != 0u) { atomicOr(&windAny[k], 1u << ci); }
  }
  workgroupBarrier();
  if (ci == 0u) {
    let at = WIND_CELLS + u32(s.y * SPAN + s.x) * 2u;
    var top = own;
    if (laid) { top = max(yW + f32(atomicLoad(&windTop[k])) * DC, select(NO_TOP, own, lawn)); }
    wind[at] = bitcast<u32>(top);
    wind[at + 1u] = select(0u, atomicLoad(&windAny[k]), laid);
  }`}
}`,X4=`
fn bl_laidSquare() -> vec2i {
  return vec2i(bitcast<i32>(wind[WIND_SQ]), bitcast<i32>(wind[WIND_SQ + 1u]));
}
fn bl_leanOf(m: vec2i) -> vec2f {
  let sm = m - vec2i(SPAN0 / 8);
  let at = u32(sm.y * (SPAN / 8) + sm.x) * 2u;
  return vec2f(bitcast<f32>(wind[at]), bitcast<f32>(wind[at + 1u]));
}
struct BlMeet {
  t: f32,
  face: u32,
  level: u32,
  arm: bool,
}
fn bl_meet(geo: u32, yG: f32, roY: f32, rdY: f32, invY: f32, tf: f32, tOut: f32, side: u32, cap: u32) -> BlMeet {
  let ya = roY + rdY * tf;
  let yb = roY + rdY * tOut;
  let ylo = min(ya, yb);
  let yhi = max(ya, yb);
  var m = BlMeet(1e30, 5u, 0u, false);
  let top = min(bl_colTop(geo), cap);
  let y1 = yG + f32(top) * DC;
  if (top != 0u && ylo < y1 && yhi >= yG) {
    if (ya > y1) {
      m.t = (y1 - roY) * invY;
      m.face = 0u;
    } else {
      m.t = tf;
      m.face = side;
    }
    m.level = u32(clamp(floor((roY + rdY * m.t - yG) / DC - 1e-3), 0.0, f32(top) - 1.0));
  }
  let lo1 = bl_armLo1(geo);
  if (lo1 > 0u && lo1 + bl_armLen(geo) <= cap + 1u) {
    let a0y = yG + f32(lo1 - 1u) * DC;
    let a1y = a0y + f32(bl_armLen(geo)) * DC;
    if (ylo < a1y && yhi >= a0y) {
      var th = tf;
      var nn = side;
      if (ya > a1y) {
        th = (a1y - roY) * invY;
        nn = 0u;
      } else if (ya < a0y) {
        th = (a0y - roY) * invY;
        nn = 1u;
      }
      if (th < m.t) {
        m.t = th;
        m.face = nn;
        m.level = u32(clamp(floor((roY + rdY * th - yG) / DC - 1e-3), f32(lo1 - 1u), f32(lo1 - 2u + bl_armLen(geo))));
        m.arm = true;
      }
    }
  }
  return m;
}
fn bl_capOf(tex: i32, kv: vec4u, cell: vec2i) -> u32 {
  if ((kv.x & PRESSED) == 0u) { return 1024u; }
  return bl_pressCap(kv.w, cell, u32(round((keptTop[tex] - bitcast<f32>(kv.y)) / DC)));
}
fn bl_windSource(hit: ptr<function, BlHit>, w: vec2i, yR: f32, lean: vec2f, l: i32) {
  let q = w - bl_carry(lean, min(l, 13));
  let qtex = bl_tex(q >> vec2u(2u));
  let qkv = keptInfo[qtex];
  let qi = u32((q.y & 3) * 4 + (q.x & 3));
  let geo = (colsA[qtex * 2 + i32(qi >> 3u)][(qi >> 1u) & 3u] >> ((qi & 1u) * 16u)) & 0xffffu;
  let ls = l - i32(round((bitcast<f32>(qkv.y) - yR) * (1.0 / DC)));
  (*hit).col = q;
  (*hit).level = u32(max(ls, 0));
  (*hit).arm = ls >= i32(bl_colTop(geo));
}
fn bl_windTall(hit: ptr<function, BlHit>, ro: vec3f, rd: vec3f, inv: vec3f, cell: vec2i, yG: f32, lean: vec2f, tc: f32, tEnd: f32, axis: u32) {
  let y32 = yG + 32.0 * DC;
  let stX = select(-1, 1, rd.x >= 0.0);
  let stZ = select(-1, 1, rd.z >= 0.0);
  let c13 = bl_carry(lean, 13);
  var ax = axis;
  var tf = tc;
  var fx = clamp(i32(floor((ro.x + rd.x * (tf + 1e-5)) / DC)), cell.x * 4, cell.x * 4 + 3);
  var fz = clamp(i32(floor((ro.z + rd.z * (tf + 1e-5)) / DC)), cell.y * 4, cell.y * 4 + 3);
  var tnx = (f32(fx + select(0, 1, stX > 0)) * DC - ro.x) * inv.x;
  var tnz = (f32(fz + select(0, 1, stZ > 0)) * DC - ro.z) * inv.z;
  for (var j = 0; j < 8; j++) {
    let tOut = min(min(tnx, tnz), tEnd);
    if (max(ro.y + rd.y * tf, ro.y + rd.y * tOut) >= y32) {
      var t0 = tf;
      var t1 = tOut;
      var f0 = select(select(3u, 2u, stX < 0), select(5u, 4u, stZ < 0), ax == 1u);
      if (ro.y + rd.y * tf < y32) {
        t0 = (y32 - ro.y) * inv.y;
        f0 = 1u;
      }
      if (ro.y + rd.y * tOut < y32) { t1 = (y32 - ro.y) * inv.y; }
      let q = vec2i(fx, fz) - c13;
      let qtex = bl_tex(q >> vec2u(2u));
      let qkv = keptInfo[qtex];
      let qi = u32((q.y & 3) * 4 + (q.x & 3));
      let yS = bitcast<f32>(qkv.y);
      if (((qkv.x >> qi) & 1u) != 0u && keptTop[qtex] - yS > LAWN_TOP) {
        let geo = (colsA[qtex * 2 + i32(qi >> 3u)][(qi >> 1u) & 3u] >> ((qi & 1u) * 16u)) & 0xffffu;
        let m = bl_meet(geo, yS, ro.y, rd.y, inv.y, t0, t1, f0, bl_capOf(qtex, qkv, q >> vec2u(2u)));
        if (m.t < 1e29) {
          (*hit).t = m.t;
          (*hit).face = m.face;
          (*hit).col = q;
          (*hit).level = m.level;
          (*hit).arm = m.arm;
          return;
        }
      }
    }
    tf = tOut;
    if (tf >= tEnd) { break; }
    if (tnx < tnz) {
      fx = fx + stX;
      tnx = tnx + abs(DC * inv.x);
      ax = 0u;
    } else {
      fz = fz + stZ;
      tnz = tnz + abs(DC * inv.z);
      ax = 1u;
    }
  }
}
fn bl_windMask(hit: ptr<function, BlHit>, ro: vec3f, rd: vec3f, inv: vec3f, cell: vec2i, yG: f32, lean: vec2f, tc: f32, tEnd: f32, axis: u32, at: u32, cols: u32) {
  let stX = select(-1, 1, rd.x >= 0.0);
  let stZ = select(-1, 1, rd.z >= 0.0);
  var ax = axis;
  var tf = tc;
  var fx = clamp(i32(floor((ro.x + rd.x * (tf + 1e-5)) / DC)), cell.x * 4, cell.x * 4 + 3);
  var fz = clamp(i32(floor((ro.z + rd.z * (tf + 1e-5)) / DC)), cell.y * 4, cell.y * 4 + 3);
  var tnx = (f32(fx + select(0, 1, stX > 0)) * DC - ro.x) * inv.x;
  var tnz = (f32(fz + select(0, 1, stZ > 0)) * DC - ro.z) * inv.z;
  for (var j = 0; j < 8; j++) {
    let tOut = min(min(tnx, tnz), tEnd);
    let ql = vec2i(fx, fz) - cell * 4;
    let ci = u32(ql.y * 4 + ql.x);
    if (all(ql >= vec2i(0)) && all(ql < vec2i(4)) && ((cols >> ci) & 1u) != 0u) {
      let la = i32(floor((ro.y + rd.y * tf - yG) * (1.0 / DC)));
      let lb = i32(floor((ro.y + rd.y * tOut - yG) * (1.0 / DC)));
      let bits = wind[at + ci] & bl_levels(min(la, lb), max(la, lb));
      if (bits != 0u) {
        let l = select(i32(firstTrailingBit(bits)), i32(firstLeadingBit(bits)), rd.y < 0.0);
        (*hit).t = tf;
        (*hit).face = select(select(3u, 2u, stX < 0), select(5u, 4u, stZ < 0), ax == 1u);
        if (l != la) {
          (*hit).face = select(1u, 0u, rd.y < 0.0);
          (*hit).t = (yG + f32(select(l, l + 1, rd.y < 0.0)) * DC - ro.y) * inv.y;
        }
        bl_windSource(hit, vec2i(fx, fz), yG, lean, l);
        return;
      }
    }
    tf = tOut;
    if (tf >= tEnd) { break; }
    if (tnx < tnz) {
      fx = fx + stX;
      tnx = tnx + abs(DC * inv.x);
      ax = 0u;
    } else {
      fz = fz + stZ;
      tnz = tnz + abs(DC * inv.z);
      ax = 1u;
    }
  }
}
fn bl_lawnWalk(hit: ptr<function, BlHit>, ro: vec3f, rd: vec3f, invY: f32, cell: vec2i, tex: i32, kv: vec4u, yG: f32, lean: vec2f, tc: f32, tEnd: f32, axis: u32) {
  let p = (vec2f(cell + blades.win.xz) + vec2f(0.5)) * CELL;
  let s = lean * (blades.spare.y / (2.5 * LAWN_FULL * 0.4 * blades.air.z)) * (0.5 + 0.5 * sin(blades.eye.w * 9.0 - dot(p, blades.air.xy) * 3.0));
  let o = ro.xz - s * (ro.y - yG);
  let d = rd.xz - s * rd.y;
  let iv = 1.0 / select(d, select(vec2f(-1e-9), vec2f(1e-9), d >= vec2f(0.0)), abs(d) < vec2f(1e-9));
  let a = (vec2f(cell) * CELL - o) * iv;
  let b = (vec2f(cell + vec2i(1)) * CELL - o) * iv;
  let tn = min(a, b);
  let tx = max(a, b);
  var tf = max(tc, max(tn.x, tn.y));
  let te = min(tEnd, min(tx.x, tx.y));
  if (tf >= te) { return; }
  var ax = select(select(1u, 0u, tn.x > tn.y), axis, tf == tc);
  var sx = select(-1, 1, select(d.x, rd.x, tf == tc) >= 0.0);
  var sz = select(-1, 1, select(d.y, rd.z, tf == tc) >= 0.0);
  let cap = bl_capOf(tex, kv, cell);
  let stX = select(-1, 1, d.x >= 0.0);
  let stZ = select(-1, 1, d.y >= 0.0);
  var fx = clamp(i32(floor((o.x + d.x * (tf + 1e-5)) / DC)), cell.x * 4, cell.x * 4 + 3);
  var fz = clamp(i32(floor((o.y + d.y * (tf + 1e-5)) / DC)), cell.y * 4, cell.y * 4 + 3);
  var tnx = (f32(fx + select(0, 1, stX > 0)) * DC - o.x) * iv.x;
  var tnz = (f32(fz + select(0, 1, stZ > 0)) * DC - o.y) * iv.y;
  for (var j = 0; j < 8; j++) {
    let tOut = min(min(tnx, tnz), te);
    let ql = vec2i(fx, fz) - cell * 4;
    let ci = u32(ql.y * 4 + ql.x);
    if (all(ql >= vec2i(0)) && all(ql < vec2i(4)) && ((kv.x >> ci) & 1u) != 0u) {
      let geo = (colsA[tex * 2 + i32(ci >> 3u)][(ci >> 1u) & 3u] >> ((ci & 1u) * 16u)) & 0xffffu;
      let m = bl_meet(geo, yG, ro.y, rd.y, invY, tf, tOut, select(select(3u, 2u, sx < 0), select(5u, 4u, sz < 0), ax == 1u), cap);
      if (m.t < 1e29) {
        (*hit).t = m.t;
        (*hit).face = m.face;
        (*hit).col = vec2i(fx, fz);
        (*hit).level = m.level;
        (*hit).arm = m.arm;
        return;
      }
    }
    tf = tOut;
    if (tf >= te) { break; }
    sx = stX;
    sz = stZ;
    if (tnx < tnz) {
      fx = fx + stX;
      tnx = tnx + abs(DC * iv.x);
      ax = 0u;
    } else {
      fz = fz + stZ;
      tnz = tnz + abs(DC * iv.y);
      ax = 1u;
    }
  }
}`;function uZ($,J=!0){let Q=$/8,Z=$/64;return L0(["//",C7,c8,"@group(1) @binding(0) var<uniform> blades: Blades;","@group(1) @binding(1) var<storage, read> keptTop: array<f32>;","@group(1) @binding(2) var<storage, read> keptInfo: array<vec4u>;","@group(1) @binding(3) var<storage, read> colsA: array<vec4u>;","@group(1) @binding(4) var<storage, read> colsB: array<vec4u>;","@group(1) @binding(5) var<storage, read> owners: array<vec2u>;","@group(1) @binding(6) var<storage, read> book: array<u32>;","@group(1) @binding(7) var<storage, read> growthTable: array<vec4f>;","@group(1) @binding(8) var<storage, read> voxelSurfaceTable: array<vec4f>;",`@group(1) @binding(9) var<uniform> maxima: array<vec4f, ${Math.ceil(t5($)/4)}>;`,"@group(1) @binding(10) var hitOut: texture_storage_2d<rgba32uint, write>;",...J?["@group(1) @binding(11) var<storage, read> wind: array<u32>;"]:[],C$($),_Z,"struct VoxelSurfaceTone { rgb: vec3f, shade: vec3f }",["surf_hash","surf_unit","surf_tone","surf_mix","surf_ramp","surf_drift"].map((j)=>e9(k0,j)).join(`

`),V4,fZ,...J?[pZ($),X4]:[],`const METRES: i32 = ${Q};
const EIGHTS: i32 = ${Z};
const ARRIVAL: f32 = ${S0/1000};
${mZ}
fn bl_maximum(i: i32) -> f32 { return maxima[i >> 2u][i & 3]; }
fn bl_metreMax(m: vec2i) -> f32 {
  let t = (m + (blades.win.xz >> vec2u(3u))) & vec2i(METRES - 1);
  return bl_maximum(t.y * METRES + t.x);
}
fn bl_eightMax(e: vec2i) -> f32 {
  let t = (e + (blades.win.xz >> vec2u(6u))) & vec2i(EIGHTS - 1);
  return bl_maximum(METRES * METRES + t.y * EIGHTS + t.x);
}
struct BlHit {
  t: f32,
  face: u32,
  col: vec2i,
  level: u32,
  arm: bool,
  steps: u32,
}
fn bl_walk(ro: vec3f, rd: vec3f) -> BlHit {
  var hit: BlHit;
  hit.t = ${XZ};
  hit.face = 5u;
  hit.steps = 0u;
  var tEnd = min(blades.keep.w, 1e9);
  let gTop = bl_maximum(METRES * METRES + EIGHTS * EIGHTS);
  let arrival = blades.spare.x;
  if (gTop <= NO_TOP * 0.5 || arrival <= 0.0) { return hit; }
  var tBeg = 0.02;
  if (rd.y < 0.0) {
    tBeg = max(tBeg, (ro.y - gTop) / -rd.y);
  } else if (rd.y > 0.0) {
    tEnd = min(tEnd, (gTop - ro.y) / rd.y);
  } else if (ro.y > gTop) {
    tEnd = 0.0;
  }
  if (tBeg >= tEnd) { return hit; }
  let inv = 1.0 / select(rd, select(vec3f(-1e-9), vec3f(1e-9), rd >= vec3f(0.0)), abs(rd) < vec3f(1e-9));
  let side = f32(N) * CELL;
  let toLo = -ro.xz * inv.xz;
  let toHi = (vec2f(side) - ro.xz) * inv.xz;
  tBeg = max(tBeg, max(min(toLo.x, toHi.x), min(toLo.y, toHi.y)) + 1e-3);
  tEnd = min(tEnd, min(max(toLo.x, toHi.x), max(toLo.y, toHi.y)) - 1e-3);
  if (tBeg >= tEnd) { return hit; }
  let stX = select(-1, 1, rd.x >= 0.0);
  let stZ = select(-1, 1, rd.z >= 0.0);
  ${J?`let windOn = (blades.jobs.z & 1u) != 0u && blades.air.z > 0.0;
  let laidSq = bl_laidSquare();
  `:""}var t = tBeg;
  var bxi = i32(floor(ro.x + rd.x * t));
  var bzi = i32(floor(ro.z + rd.z * t));
  var tbx = (f32(bxi + select(0, 1, stX > 0)) - ro.x) * inv.x;
  var tbz = (f32(bzi + select(0, 1, stZ > 0)) - ro.z) * inv.z;
  var fl = 2u << 16u;
  for (var ib = 0; ib < 96; ib++) {
    if (t >= tEnd) { break; }
    fl++;
    let sbx = bxi >> 3u;
    let sbz = bzi >> 3u;
    let tsx = (f32((sbx + select(0, 1, stX > 0)) * 8) - ro.x) * inv.x;
    let tsz = (f32((sbz + select(0, 1, stZ > 0)) * 8) - ro.z) * inv.z;
    let tsOut = min(min(tsx, tsz), tEnd);
    let eightTop = bl_eightMax(vec2i(sbx, sbz));
    if (min(ro.y + rd.y * t, ro.y + rd.y * tsOut) > eightTop) {
      if (eightTop > NO_TOP * 0.5) { fl = fl | 0x100u; }
      t = tsOut + 1e-4;
      bxi = i32(floor(ro.x + rd.x * t));
      bzi = i32(floor(ro.z + rd.z * t));
      tbx = (f32(bxi + select(0, 1, stX > 0)) - ro.x) * inv.x;
      tbz = (f32(bzi + select(0, 1, stZ > 0)) - ro.z) * inv.z;
      fl = (fl & ~(3u << 16u)) | (select(0u, 1u, tsz < tsx) << 16u);
      continue;
    }
    let tbOut = min(min(tbx, tbz), tEnd);
    let metreTop = bl_metreMax(vec2i(bxi, bzi));
    if (min(ro.y + rd.y * t, ro.y + rd.y * tbOut) >= metreTop) {
      if (metreTop > NO_TOP * 0.5) { fl = fl | 0x100u; }
    } else {
      ${J?`fl = fl & ~0x400000u;
      let sq = vec2i(bxi, bzi) - laidSq;
      if (windOn && all(sq >= vec2i(0)) && all(sq <= vec2i(2 * RING_M)) && any(bl_leanOf(vec2i(bxi, bzi)) != vec2f(0.0))) { fl = fl | 0x400000u; }
      `:""}var tc = t;
      var cxi = clamp(i32(floor((ro.x + rd.x * (tc + 1e-5)) / CELL)), bxi * 8, bxi * 8 + 7);
      var czi = clamp(i32(floor((ro.z + rd.z * (tc + 1e-5)) / CELL)), bzi * 8, bzi * 8 + 7);
      var tcx = (f32(cxi + select(0, 1, stX > 0)) * CELL - ro.x) * inv.x;
      var tcz = (f32(czi + select(0, 1, stZ > 0)) * CELL - ro.z) * inv.z;
      fl = (fl & ~(3u << 18u)) | (((fl >> 16u) & 3u) << 18u);
      for (var ic = 0; ic < 16; ic++) {
        let tcOut = min(min(tcx, tcz), tbOut);
        let tex = bl_tex(vec2i(cxi, czi));
        ${J?`let sway = (fl & 0x400000u) != 0u;
        let widx = u32((czi - SPAN0) * SPAN + cxi - SPAN0);
        var cellTop: f32;
        if (sway) {
          cellTop = bitcast<f32>(wind[WIND_CELLS + widx * 2u]);
        } else {
          cellTop = keptTop[tex];
        }`:"let cellTop = keptTop[tex];"}
        if (min(ro.y + rd.y * tc, ro.y + rd.y * tcOut) >= cellTop) {
          if (cellTop > NO_TOP * 0.5) { fl = fl | 0x100u; }
        } else {
          let kv = keptInfo[tex];
          let yG = bitcast<f32>(kv.y);
          let arrived = arrival >= ARRIVAL || bl_arrivalUnit(vec2i(cxi, czi) + blades.win.xz) * ARRIVAL < arrival;
          ${J?`var wany = 0u;
          if (sway) { wany = wind[WIND_CELLS + widx * 2u + 1u]; }
          `:""}if (${J?"select(kv.x != 0u, wany != 0u || cellTop > yG + 32.0 * DC, sway)":"kv.x != 0u"} && arrived && max(ro.y + rd.y * tc, ro.y + rd.y * tcOut) >= yG) {
            ${J?`if (sway) {
              let lean = bl_leanOf(vec2i(bxi, bzi));
              let ax = (fl >> 18u) & 3u;
              if (cellTop > yG + 32.0 * DC) { bl_windTall(&hit, ro, rd, inv, vec2i(cxi, czi), yG, lean, tc, tcOut, ax); }
              if ((wany & 0xffffu) != 0u) { bl_windMask(&hit, ro, rd, inv, vec2i(cxi, czi), yG, lean, tc, min(tcOut, hit.t), ax, WIND_MASKS + widx * 16u, wany); }
              if ((wany & LAWN_CELL) != 0u) { bl_lawnWalk(&hit, ro, rd, inv.y, vec2i(cxi, czi), tex, kv, yG, lean, tc, min(tcOut, hit.t), ax); }
              if (hit.t < 1e29) {
                hit.steps = fl & 255u;
                return hit;
              }
            } else {
            `:""}var cap = 1024u;
            if ((kv.x & PRESSED) != 0u) { cap = bl_pressCap(kv.w, vec2i(cxi, czi), u32(round((cellTop - yG) / DC))); }
            var tf = tc;
            var fx = clamp(i32(floor((ro.x + rd.x * (tf + 1e-5)) / DC)), cxi * 4, cxi * 4 + 3);
            var fz = clamp(i32(floor((ro.z + rd.z * (tf + 1e-5)) / DC)), czi * 4, czi * 4 + 3);
            var tnx = (f32(fx + select(0, 1, stX > 0)) * DC - ro.x) * inv.x;
            var tnz = (f32(fz + select(0, 1, stZ > 0)) * DC - ro.z) * inv.z;
            fl = (fl & ~(3u << 20u)) | (((fl >> 18u) & 3u) << 20u);
            for (var j = 0; j < 8; j++) {
              let tOut = min(min(tnx, tnz), tcOut);
              let q = vec2i(fx, fz);
              let ql = q - vec2i(cxi * 4, czi * 4);
              if (ql.x >= 0 && ql.x < 4 && ql.y >= 0 && ql.y < 4) {
                let ci = u32(ql.y * 4 + ql.x);
                var geo = 0u;
                if (((kv.x >> ci) & 1u) != 0u) { geo = (colsA[tex * 2 + i32(ci >> 3u)][(ci >> 1u) & 3u] >> ((ci & 1u) * 16u)) & 0xffffu; }
                if (geo != 0u) {
                  let ya = ro.y + rd.y * tf;
                  let yb = ro.y + rd.y * tOut;
                  let ylo = min(ya, yb);
                  let yhi = max(ya, yb);
                  let side = select(select(3u, 2u, stX < 0), select(5u, 4u, stZ < 0), ((fl >> 20u) & 3u) == 1u);
                  var tBest = 1e30;
                  var fBest = 5u;
                  var lvBest = 0u;
                  var armBest = false;
                  let top = min(bl_colTop(geo), cap);
                  let y1 = yG + f32(top) * DC;
                  if (top != 0u && ylo < y1 && yhi >= yG) {
                    if (ya > y1) {
                      tBest = (y1 - ro.y) * inv.y;
                      fBest = 0u;
                    } else {
                      tBest = tf;
                      fBest = side;
                    }
                    lvBest = u32(clamp(floor((ro.y + rd.y * tBest - yG) / DC - 1e-3), 0.0, f32(top) - 1.0));
                  }
                  let lo1 = bl_armLo1(geo);
                  if (lo1 > 0u && lo1 + bl_armLen(geo) <= cap + 1u) {
                    let a0y = yG + f32(lo1 - 1u) * DC;
                    let a1y = a0y + f32(bl_armLen(geo)) * DC;
                    if (ylo < a1y && yhi >= a0y) {
                      var th = tf;
                      var nn = side;
                      if (ya > a1y) {
                        th = (a1y - ro.y) * inv.y;
                        nn = 0u;
                      } else if (ya < a0y) {
                        th = (a0y - ro.y) * inv.y;
                        nn = 1u;
                      }
                      if (th < tBest) {
                        tBest = th;
                        fBest = nn;
                        lvBest = u32(clamp(floor((ro.y + rd.y * th - yG) / DC - 1e-3), f32(lo1 - 1u), f32(lo1 - 2u + bl_armLen(geo))));
                        armBest = true;
                      }
                    }
                  }
                  if (tBest < 1e29) {
                    hit.t = tBest;
                    hit.face = fBest;
                    hit.col = q;
                    hit.level = lvBest;
                    hit.arm = armBest;
                    hit.steps = fl & 255u;
                    return hit;
                  }
                }
              }
              tf = tOut;
              if (tf >= tcOut) { break; }
              if (tnx < tnz) {
                fx = fx + stX;
                tnx = tnx + abs(DC * inv.x);
                fl = fl & ~(3u << 20u);
              } else {
                fz = fz + stZ;
                tnz = tnz + abs(DC * inv.z);
                fl = (fl & ~(3u << 20u)) | (1u << 20u);
              }
            }
${J?`            }
`:""}          }
          if (ro.y + rd.y * tcOut < yG) {
            if ((fl & 0x100u) != 0u) {
              hit.steps = fl & 255u;
              return hit;
            }
            fl = fl + (1u << 9u);
            if (((fl >> 9u) & 127u) > 64u) {
              hit.steps = fl & 255u;
              return hit;
            }
          } else {
            fl = fl | 0x100u;
          }
        }
        tc = tcOut;
        if (tc >= tbOut) { break; }
        if (tcx < tcz) {
          cxi = cxi + stX;
          tcx = tcx + abs(CELL * inv.x);
          fl = fl & ~(3u << 18u);
        } else {
          czi = czi + stZ;
          tcz = tcz + abs(CELL * inv.z);
          fl = (fl & ~(3u << 18u)) | (1u << 18u);
        }
      }
    }
    t = tbOut;
    if (tbx < tbz) {
      bxi = bxi + stX;
      tbx = tbx + abs(inv.x);
      fl = fl & ~(3u << 16u);
    } else {
      bzi = bzi + stZ;
      tbz = tbz + abs(inv.z);
      fl = (fl & ~(3u << 16u)) | (1u << 16u);
    }
  }
  hit.steps = fl & 255u;
  return hit;
}`,H4,`
fn bl_walkShadePhase(g: vec3u) {
  let size = vec2u(blades.walk.xy);
  if (g.x >= size.x || g.y >= size.y) { return; }
  let rf = blades.toWin.w;
  let px = (vec2f(g.xy) + vec2f(0.5)) * rf;
  let uv = px / blades.walk.zw;
  let clip = vec4f(uv.x * 2.0 - 1.0, 1.0 - uv.y * 2.0, 1.0, 1.0);
  let near = frame.inverseViewProj * clip;
  let rd = normalize(near.xyz / near.w - frame.cameraPosition);
  let ro = frame.cameraPosition + blades.toWin.xyz;
  let h = bl_walk(ro, rd);
  let t = h.t;
  if (t >= 1e29) {
    textureStore(hitOut, g.xy, vec4u(0u, 0u, bitcast<u32>(${XZ}), 0u));
    return;
  }
  let col = h.col;
  let cell = vec2i(floor(vec2f(col) / 4.0));
  let level = min(h.level, 63u);
  let arm = h.arm;
  let tex = bl_tex(cell);
  let kv = keptInfo[tex];
  let yG = bitcast<f32>(kv.y);
  let look = kv.z;
  let ci = u32((col.y - cell.y * 4) * 4 + (col.x - cell.x * 4));
  let own = colsB[tex * 4 + i32(ci >> 2u)][ci & 3u];
  let owner = own & 3u;
  let colW = col + blades.win.xz * ${n0};
  var tone = BlTone(vec3f(0.3, 0.5, 0.2), 1.0, 0.0, 0.0, false);
  let entry = bl_look(look & 4095u);
  if (owner == 0u) {
    if (entry.x != 0u) {
      let faceMicroY = i32(round((yG + Y_BIAS) * Y_STEPS)) - i32(Y_BIAS * Y_STEPS);
      let ao = (look >> 12u) & 3u;
      let face = bl_faceOf(entry.x - 1u, faceMicroY, ao);
      let geo = (colsA[tex * 2 + i32(ci >> 3u)][(ci >> 1u) & 3u] >> ((ci & 1u) * 16u)) & 0xffffu;
      tone = bl_fieldCube(face, entry.w, colW, level, arm, own, bl_colTop(geo), ao);
    }
  } else {
    let refs = owners[tex];
    let pref = select(refs.y, refs.x, owner == 1u);
    tone = bl_plantCube(pref, (cell + blades.win.xz) * ${n0}, colW, level);
    tone.rgb = tone.rgb * mix(BL_AO_CURVE[(look >> 12u) & 3u] * 0.7, 1.0, smoothstep(0.0, 3.0, f32(level)));
  }
  let a = vec3u(round(clamp(tone.rgb, vec3f(0.0), vec3f(1.0)) * 1023.0));
  let words = h.face | (u32(round(clamp(tone.roughness, 0.0, 1.0) * 255.0)) << 3u) | (u32(round(clamp(tone.metalness, 0.0, 1.0) * 15.0)) << 11u) | (u32(round(clamp(tone.glow, 0.0, 1.0) * 15.0)) << 15u) | (select(0u, 1u, tone.head) << 19u);
  textureStore(hitOut, g.xy, vec4u(a.x | (a.y << 10u) | (a.z << 20u), words, bitcast<u32>(h.t), bitcast<u32>(yG - blades.toWin.y)));
}
@compute @workgroup_size(${x7}, ${x7})
fn main(@builtin(global_invocation_id) g: vec3u) {
  bl_walkShadePhase(g);
}`],`
`)}var cZ,dZ=[c8,"@group(2) @binding(0) var bladeHit: texture_2d<u32>;","@group(2) @binding(1) var<uniform> blades: Blades;",DZ];function F4(){return (F4=$c0C(99)).apply(this,arguments)}function U4(){return (U4=$c0C(100)).apply(this,arguments)}var T$=0,J6=1,r0=2,Z8=3,iZ=4,d8=1,nZ=2,G4=["ground","fill","keep","walk"],N4=[Q8.ground,Q8.fill,Q8.keep,Q8.walk],P4=[J4,Y4,Z4,uZ];function rZ($,J,Q,Z,j){return $===r0?PZ(Z,j,()=>FZ($,J,Q,Z,j)):FZ($,J,Q,Z,j)}function FZ(a,b,c,d,e){return (FZ=$c0C(101)).call(this,a,b,c,d,e)}var Q6=0,Z6=1,lZ=2;function oZ($,J,Q,Z,j){let q=J===1,Y=$===Z6,V=B8(),H=Y?`terrain/blades/merge/lit/${I7({motion:q})}`:`terrain/blades/merge/${E9(q,V)}/${GZ}`,K=Y?g9(Q??y0(),H):null,X=K?.programKey?`${H}/light/${w9(K)}`:H;_9(K,X);return j.getRenderPipeline(X,function(){let F=K===null?F4(q,V):U4(K,q);let G=Z.createShaderModule({label:X,code:F});let U=i7(j,[F]);return{label:X,layout:n7(Z,X,[j.getBindGroupLayout(T7,"lume frame"),U,j.getBindGroupLayout(a5,"terrain blades merge")],U),vertex:{module:G,entryPoint:"vs"},fragment:{module:G,entryPoint:"fs",targets:K===null?h9(q,V):d7({motion:q})},depthStencil:c7(!0),multisample:{count:V}}})}var z4=256,i8=new Map,sZ=new WeakMap,M4=function($){let J=$===void 0?void 0:g7($);if(J===void 0)return[1,1,1];let[Q,Z,j]=_7(J&16777215);return[Q,Z,j]};function aZ($,J){let Q=0,Z=0;for(let j=J;j<$.length;j+=3){let q=($[j]??0)/E%1,Y=Math.abs(q<0?q+1:q);if(Math.min(Y,1-Y)<0.08)Q+=1;else if(Math.abs(Y-0.5)<0.08)Z+=1}return Z>Q?E/2:0}var Y6=($)=>$%1024-512,V6=($)=>Math.floor($/1024)%1024-512,q1=($)=>Math.floor($/1048576),n8=[NaN,0,0];function I4(a,b,c){return (I4=$c0C(102)).call(this,a,b,c)}function C4($,J,Q,Z){let j=J.positions,q=J.indices[Q]??0,Y=J.indices[Q+1]??0,V=J.indices[Q+2]??0,H=j[q*3]??0,K=j[q*3+1]??0,X=j[q*3+2]??0,F=j[Y*3]??0,G=j[Y*3+1]??0,U=j[Y*3+2]??0,N=j[V*3]??0,P=j[V*3+1]??0,z=j[V*3+2]??0,C=F-H,I=G-K,D=U-X,M=N-H,v=P-K,L=z-X,c=I*L-D*v,R=D*M-C*L,_=C*v-I*M,O=p(c,R,_);if(O<0.000000000001)return;let d=c/O,i=R/O,o0=_/O,R7=J.normals;if(R7.length>=(q+1)*3&&d*(R7[q*3]??0)+i*(R7[q*3+1]??0)+o0*(R7[q*3+2]??0)<0)d=-d,i=-i,o0=-o0;let b$=I4(J,q,Z);let v0=Math.max(1,Math.ceil(Math.max(p(C,I,D),p(M,v,L),p(N-F,P-G,z-U))/(E/3)));let V8=Math.max(Math.abs(d),Math.abs(i),Math.abs(o0))>0.99?E*0.25:0;let r8=i>0.5;for(let K7=0;K7<v0;K7+=1)for(let H8=0;K7+H8<v0;H8+=1){let L7=(K7+0.3333333333333333)/v0,s0=(H8+0.3333333333333333)/v0,E6=Math.floor((H+C*L7+M*s0-d*V8-$.px)/E),w$=Math.floor((K+I*L7+v*s0-i*V8)/E),O6=Math.floor((X+D*L7+L*s0-o0*V8-$.pz)/E);if(w$<0||w$>=yZ||Math.abs(E6)>64||Math.abs(O6)>64)continue;let l8=E6+512+(O6+512)*1024+w$*1048576;if($.cells.has(l8)&&(!r8||$.capped.has(l8)))continue;if($.cells.set(l8,b$),r8)$.capped.add(l8)}}function T4(a){return (T4=$c0C(103)).call(this,a)}var j6=($)=>Math.round(Math.min(Math.max($,0),1)*1023);function B4(a){return (B4=$c0C(104)).call(this,a)}var q6=[1,0,-1,0,0,1,0,-1];function D4(a,b,c,d,e,f){return (D4=$c0C(105)).call(this,a,b,c,d,e,f)}function W4($,J,Q){let Z=new Int32Array($*J).fill(-1),j=[];for(let q=0;q<$*J;q+=1){if(Z[q]!==-1||!Q(q%$,Math.floor(q/$)))continue;j.push(D4(Z,$,J,Q,q,j.length))}return{part:Z,boxes:j}}function v4(a,b,c,d,e){return (v4=$c0C(106)).call(this,a,b,c,d,e)}function x4(a,b){return (x4=$c0C(107)).call(this,a,b)}function A4(a,b){return (A4=$c0C(108)).call(this,a,b)}function B$(){return{blocks:new Map,stamps:new Map,layers:0,items:0,stampCount:0}}function Y1($,J,Q,Z){let j=$.blocks.get(J);if(j?.n===Q)return j.at;let q=$[Z];return $[Z]+=Q,$.blocks.set(J,{at:q,n:Q}),q}function L4(a,b,c,d){return (L4=$c0C(109)).call(this,a,b,c,d)}function y4($,J,Q,Z,j){$.layers[j]=[0,0,0,0,0,0,0,0,0,0,0,0];let q=M0(Z.density);if(q<=0||Z.paintedOnly===!0||!Array.isArray(Z.items)||Z.items.length===0)return null;let Y=Z.items.length;let V=Y1($.registry,`${J.placeId}\x00${Q}\x00${Y}`,Y,"items");let H=L4($,J,Z,V);if(H.weight<=0)return null;let K=Z.cluster,X=M0(K?.clusters),F=X>0?128/Math.sqrt(X):0,G=M0(K?.radius),U=F>0?Math.min(1,eZ*G*G/(F*F)):1,N=K?.seed===void 0?tZ(`${J.placeId}:${Q}`):M0(K.seed,42)>>>0;$.layers[j]=[1/Math.sqrt(q)/E,F/E,G/E,M0(K?.falloff,0.3),N,V,Y,H.turns?1:0,Math.ceil(H.reach)+1,0,0,0];let P=E*E,z=Math.max(H.cubes,0.000001);return{share:1-Math.exp(-q*U*(H.top/H.weight)*P),depth:q*U*(H.cubes/H.weight)*P,mean:[H.mean[0]/z,H.mean[1]/z,H.mean[2]/z],lean:Math.min(H.lean/z,1)}}function h4(a,b){return (h4=$c0C(110)).call(this,a,b)}function E4(a,b,c,d){return (E4=$c0C(111)).call(this,a,b,c,d)}function O4(a,b){return (O4=$c0C(112)).call(this,a,b)}function b4(a,b,c,d){return (b4=$c0C(113)).call(this,a,b,c,d)}function V1(a){return (V1=$c0C(114)).apply(this,arguments)}var K6=8,X6=1024,w4=0.5,_4=0.03,g4=0.2,k4=E/2;function m4($){return $>0?Math.min($*g4,k4):0}var D$=[0,0,0],M6=()=>null,W$=[0,0,0],y1={records:null,origin:[0,0,0],groundHeight:M6,win:[0,0],span:0,out:null,most:0,count:0};function f4($,J){let Q=y1,Z=Q.records?.get(J),j=Q.out;if(Z===void 0||j===null)return;for(let q of $.contacts){if(q.over!==void 0||Q.count>=Q.most)continue;M1(Z.rotation,q.at,D$);let Y=Z.position[0]+Q.origin[0]+D$[0],V=Z.position[2]+Q.origin[2]+D$[2],H=Q.groundHeight(Y,V),K=T1(q.radius,H===null?0:Z.position[1]+Q.origin[1]+D$[1]-q.below-H,C1)*hZ,X=Y-Q.win[0]*U0,F=V-Q.win[1]*U0;if(!(K>0)||X<-K||F<-K||X>Q.span+K||F>Q.span+K)continue;let G=Q.count*4;j[G]=X,j[G+1]=F,j[G+2]=K,j[G+3]=0,Q.count+=1}}function p4(a,b,c,d,e,f,g){return (p4=$c0C(115)).call(this,a,b,c,d,e,f,g)}function u4(a,b,c,d,e){return (u4=$c0C(116)).call(this,a,b,c,d,e)}var V7=e7(iZ,nZ,rZ);var F6=e7(lZ,2,oZ);var A$=Uint8Array.of(T$,J6,r0,Z8);var l0=0;var E$=1;var O$=2;var R$=3;var L$=4;var U6=5;var I6=6;var C6=7;var T6=8;var S1=9;var G6=10;var N6=11;var h1=12;var E1=13;var O1=14;var b1=15;var w1=16;var B6=17;var _1=18;var g1=19;var D6=20;var k1=21;var Y8=0;var m1=1;var W6=($)=>[_1,$*I$,SZ];var c4=0;var d4=1;var i4=2;var n4=3;var r4=4;var l4=5;var o4=6;var s4=7;var f1=8;var a4=9;var t4=10;var y$=($,J)=>({label:`terrain blades ${$}`,layoutLabel:`terrain blades ${$}`,layout:Q8[$],slots:J});var H1=($)=>y$("ground",[l0,W6($),E$,O$,S1,h1,E1,O1,b1,w1]);var j8=($)=>y$("keep",[l0,W6($),E$,O$,R$,L$,I6,C6,T6,g1,D6]);var p1=[H1(0),H1(1),y$("fill",[l0,W6(0),E$,O$,R$,L$,U6,G6,N6]),j8(0),j8(1),j8(2),j8(3),y$("walk",[l0,I6,C6,R$,L$,U6,G6,N6,B6,T6,Y8,D6]),{label:"terrain blades merge",layoutLabel:"terrain blades merge",layout:a5,slots:[Y8,l0]},j8(4),j8(5)];var E0=($,J,Q)=>({recipe:$,bind:J,second:-1,frameAt0:!0,label:`terrain/blades/${Q}`});var e4=0;var $V=1;var JV=2;var QV=3;var ZV=4;var jV=5;var qV=6;var K1=7;var YV=8;var u1=9;var c1=[E0(T$,c4,"clear"),E0(T$,d4,"splat"),E0(J6,i4,"fill"),E0(r0,n4,"keep-footprints"),E0(r0,r4,"keep"),E0(r0,l4,"maxima"),E0(r0,o4,"maxima-eight"),E0(r0,a4,"press"),E0(r0,t4,"wind"),E0(Z8,s4,"walk")];function VV(){let $=new ArrayBuffer(p8);return{gpu:null,active:!1,grows:!1,win:null,dirty:new Set,chunkFoot:new Map,footChunks:new Map,logOpened:!1,book:null,bookPlaces:null,bookGrowth:0,layerSlots:new Set,registry:B$(),growthRevision:-1,frame:0,uniform:$,uniformI32:new Int32Array($),uniformF32:new Float32Array($),uniformU32:new Uint32Array($),footCount:0,quadCount:0,feetCount:0,feetKey:0,feetMovedS:-1/0,pressOwed:0,pressHeld:0,feetLeftCount:0,feetLeftWin:[0,0],walked:!1,walkedCamera:new Float64Array(s1),ready:!1,keepOwed:4,keptEye:[1/0,0,0],keptCentre:[1/0,0],centre:[0,0],ahead:0,aheadAt:NaN,keepKey:"",keepWords:[NaN,NaN,NaN,NaN],words:{rf:0,whole:0,reach:0,far:0,end:0,walkEnd:0,walkPixel:0},air:{x:0,z:1,sway:0},airSide:0,nearHold:F$(),nearBook:A1(),bornMs:null}}function d1(a){return (d1=$c0C(117)).call(this,a)}var v6=($,J)=>($+32768)*65536+(J+32768),S$=($)=>Math.floor($/65536)-32768,h$=($)=>$%65536-32768,Y7=u*U0;function HV(a,b,c){return (HV=$c0C(118)).call(this,a,b,c)}function KV(a,b){return (KV=$c0C(119)).call(this,a,b)}var i1=()=>N1()?256:512;function XV(a,b,c,d,e,f){return (XV=$c0C(120)).call(this,a,b,c,d,e,f)}function FV($,J,Q,Z){let j=J.camera.focusRise;if(t7(j))return Q[1]-j;return R1($,Q[0],Q[2],Q[1])??Z(Q[0],Q[2])}function UV(a,b,c,d){return (UV=$c0C(121)).call(this,a,b,c,d)}var GV=1e6;function n1(a,b,c,d,e,f){return (n1=$c0C(122)).apply(this,arguments)}function NV(a,b){return (NV=$c0C(123)).call(this,a,b)}function X1(a,b,c,d){return (X1=$c0C(124)).call(this,a,b,c,d)}function r1($,J){let Z=($.gpu?.n??512)/u,j=J[0]/u,q=J[1]/u;for(let Y=0;Y<Z;Y+=1){for(let V=0;V<Z;V+=1){$.dirty.add(v6(j+V,q+Y))}}}function PV(a,b,c,d,e){return (PV=$c0C(125)).call(this,a,b,c,d,e)}function zV(a,b,c,d,e){return (zV=$c0C(126)).call(this,a,b,c,d,e)}var MV=[];var q8=[0,0];var IV=($,J)=>i0(S$($)-q8[0],h$($)-q8[1])-i0(S$(J)-q8[0],h$(J)-q8[1]);function CV(a,b,c,d){return (CV=$c0C(127)).call(this,a,b,c,d)}var F1="terrain blades hit",U1=v1();function TV(a,b,c){return (TV=$c0C(128)).call(this,a,b,c)}function BV(a,b,c,d){return (BV=$c0C(129)).call(this,a,b,c,d)}var DV=[0,0],WV=[0,0,0];function vV($,J,Q,Z,j){$.frame=$.frame+1|0,l1($,J,Q,Z,j,J.hitSize,$.footCount,$.quadCount,$.uniformI32,$.uniformF32,$.uniformU32),J.device.queue.writeBuffer(J.uniform,0,$.uniform)}function l1(a,b,c,d,e,f,g,h,i,j,k){return (l1=$c0C(130)).call(this,a,b,c,d,e,f,g,h,i,j,k)}var xV=($)=>$.decorations!==null&&$.decorations.settings?.enabled!==!1||$.looks.some((J)=>J.grows);function AV($,J,Q,Z){let j=Q.dimension==="3d"&&(J.buckets.get("opaque")?.gpu??null)!==null&&Z.some(xV),q=j&&!W1();if(q!==$.active||j!==$.grows){if($.active=q,$.grows=j,$.bornMs=null,J.surface)Z5(J.surface,0,0,j)}if(J.growth){gQ:{let $$4=J.growth,J$5=j;{let $=$$4,J=J$5;if($.bladesTop===J){(!1);break gQ;}$.bladesTop=J;for(let Q of[...$.said.values()])w5($,Q.lookRow,Q.key,Q.rules,Q.cellShift,Q.seed,Q.ground);(!0);}}}return q}function RV(a,b,c,d,e,f){return (RV=$c0C(131)).apply(this,arguments)}function o1(a,b){return (o1=$c0C(132)).call(this,a,b)}var LV=1000000000000000000000000000000;function yV(a,b,c,d){return (yV=$c0C(133)).call(this,a,b,c,d)}var s1=34;function a1($,J){let{view:Q,projection:Z}=J.camera;for(let j=0;j<16;j+=1)$[j]=Q[j]??0;for(let j=0;j<16;j+=1)$[16+j]=Z[j]??0;$[32]=J.viewportSize[0],$[33]=J.viewportSize[1]}function H6(a,b){return (H6=$c0C(134)).call(this,a,b)}var x6=Uint8Array.of(Z8);function hV(a,b,c){return (hV=$c0C(135)).call(this,a,b,c)}function EV(a,b,c){return (EV=$c0C(136)).call(this,a,b,c)}function OV($,J){let Q=$.gpu?.views.get(J);if(Q===void 0)return;P6(Q),$.gpu?.views.delete(J)}function t1($,J,Q,Z){return $.air.sway>0&&A7(V7,J,d8,Q,Z.device,Z.pipelines,z0)?d8:0}function e1(a,b,c,d,e,f){return (e1=$c0C(137)).call(this,a,b,c,d,e,f)}function P6($){h($.uniform),h($.hit),$.hit=null,$.hitView=null,$.walked=!1}function $j(a,b){return ($j=$c0C(138)).call(this,a,b)}function bV($,J){let Q=$.gpu;if(!Q)return null;let Z=Q.look;if(Z?.walked&&Z.hitView!==null&&H6(Z.camera,J))return G1(Z,J);let j=Q.views.size>0?Q.views.get(J.frameBindGroup):void 0;if(j?.walked&&j.hitView!==null&&H6(j.camera,J))return G1(j,J);if(!$.walked||!Q.hitView||!H6($.walkedCamera,J))return null;let q=A6(J,J.device,J.pipelines);if(q===null)return null;Q.res.views[Y8]=Q.hitView,Q.res.buffers[l0]=Q.uniform;let Y=d0(Q.binds,f1,Q.res,J.device,J.pipelines),V=J.passBindGroup??z6(J.device,J.pipelines);if($.bornMs===null)N$("blades",J.motionVectors===!0),$.bornMs=W0(),D0(1);let H=Q.merge;if(H?.pipeline===q&&H.bindGroups[0]===J.frameBindGroup&&H.bindGroups[1]===V&&H.bindGroups[2]===Y)return H;return Q.merge={pipeline:q,bindGroups:[J.frameBindGroup,V,Y],draw:{vertexCount:3,instanceCount:1}},Q.merge}function G1(a,b){return (G1=$c0C(139)).call(this,a,b)}function A6($,J,Q){let Z=$.motionVectors===!0?1:0;if(z1($))return j7(F6,Q6,Z,null,J,Q,z0);return j7(F6,Z6,Z,$.lighting??y0(),J,Q,z0)}function wV(a,b){return (wV=$c0C(140)).call(this,a,b)}function _V($,J,Q=!1){J.enterScope(s7);try{A7(V7,A$,0,i1(),$,J,z0);j7(F6,Q6,Q?1:0,null,$,J,z0)}finally{J.leaveScope(s7)}}var v$=76;var Jj="voxel-liquid-mirror";var Qj=16;var gV=4;var kV=200;var mV=0.08;var fV=0.25;var pV=0.01;var Zj={metres:1,perMetre:0.15};var vj=($)=>$==="ultra"||$==="high";var xj=()=>vj(h6().tier);var uV=Object.freeze({color:!0,depth:!0,mirror:!0});var Aj=Object.freeze({color:!1,depth:!0});var cV=($)=>vj($)?uV:Aj;var Rj=[...Gj,M7(1,2,"unfilterable-float"),M7(2,2,"unfilterable-float")];var dV;var jj=`fn voxel_frameDepthAt(uv: vec2f) -> f32 {
  let d = vec2f(textureDimensions(voxelMirrorDepth));
  return textureLoad(voxelMirrorDepth, vec2i(clamp(uv * d, vec2f(0.0), d - 1.0)), 0).r;
}
fn voxel_paneBed(P: vec3<f32>) -> f32 {
  let c = frame.viewProj * vec4<f32>(P, 1.0);
  if (c.w < 0.05) { return -1.0; }
  let h = c.xyz / c.w;
  let uv = h.xy * vec2<f32>(0.5, -0.5) + vec2<f32>(0.5, 0.5);
  if (any(uv < vec2<f32>(0.0)) || any(uv > vec2<f32>(1.0))) { return -1.0; }
  let sceneDepth = voxel_frameDepthAt(uv);
  if (sceneDepth <= ${y6}) { return -1.0; }
  if (sceneDepth > h.z) { return 0.0; }
  let under = frame.inverseViewProj * vec4<f32>(h.xy, sceneDepth, 1.0);
  return distance(P, under.xyz / max(under.w, 1e-6));
}`;var iV=`${Cj.trim()}

fn voxel_mirrorBehind(uv: vec2<f32>, rayDepth: f32) -> f32 {
  let sceneDepth = voxel_frameDepthAt(uv);
  let stands = sceneDepth > ${y6} && all(uv >= vec2<f32>(0.0)) && all(uv <= vec2<f32>(1.0));
  return select(-1e9, viewZFromDepth(rayDepth, uv) - viewZFromDepth(sceneDepth, uv), stands);
}

fn voxel_paneMirror(P: vec3<f32>, N: vec3<f32>, V: vec3<f32>) -> vec4<f32> {
  var D = reflect(-V, N);
  D.y = abs(D.y);
  var c0 = frame.viewProj * vec4<f32>(P, 1.0);
  var c1 = frame.viewProj * vec4<f32>(P + D * ${kV}.0, 1.0);
  let wMin = 0.05;
  if (c0.w < wMin && c1.w < wMin) { return vec4<f32>(0.0); }
  if (c0.w < wMin) { c0 = mix(c0, c1, (wMin - c0.w) / max(c1.w - c0.w, 1e-6)); }
  if (c1.w < wMin) { c1 = mix(c0, c1, (c0.w - wMin) / max(c0.w - c1.w, 1e-6)); }
  let h0 = c0.xyz / max(c0.w, wMin);
  let h1 = c1.xyz / max(c1.w, wMin);
  let uv0 = h0.xy * vec2<f32>(0.5, -0.5) + vec2<f32>(0.5, 0.5);
  let uv1 = h1.xy * vec2<f32>(0.5, -0.5) + vec2<f32>(0.5, 0.5);
  let duv = uv1 - uv0;
  var tIn = 0.0;
  var tOut = 1.0;
  if (abs(duv.x) > 1e-6) {
    let a = -uv0.x / duv.x;
    let b = (1.0 - uv0.x) / duv.x;
    tIn = max(tIn, min(a, b));
    tOut = min(tOut, max(a, b));
  } else if (uv0.x < 0.0 || uv0.x > 1.0) { return vec4<f32>(0.0); }
  if (abs(duv.y) > 1e-6) {
    let a = -uv0.y / duv.y;
    let b = (1.0 - uv0.y) / duv.y;
    tIn = max(tIn, min(a, b));
    tOut = min(tOut, max(a, b));
  } else if (uv0.y < 0.0 || uv0.y > 1.0) { return vec4<f32>(0.0); }
  if (tOut <= tIn) { return vec4<f32>(0.0); }
  let dz = h1.z - h0.z;
  let stepT = (tOut - tIn) / ${Qj}.0;
  var tPrev = tIn;
  var behindPrev = false;
  var hitT = -1.0;
  var hitBehind = 0.0;
  for (var i = 0u; i < ${Qj}u; i = i + 1u) {
    let t = tIn + (f32(i) + 0.5) * stepT;
    let behind = voxel_mirrorBehind(uv0 + duv * t, h0.z + dz * t);
    if (behind > 0.0 && !behindPrev) {
      var lo = tPrev;
      var hi = t;
      var hiBehind = behind;
      for (var j = 0u; j < ${gV}u; j = j + 1u) {
        let mid = 0.5 * (lo + hi);
        let midBehind = voxel_mirrorBehind(uv0 + duv * mid, h0.z + dz * mid);
        let inFront = midBehind <= 0.0;
        lo = select(lo, mid, inFront);
        hi = select(mid, hi, inFront);
        hiBehind = select(midBehind, hiBehind, inFront);
      }
      let sceneZ = viewZFromDepth(h0.z + dz * hi, uv0 + duv * hi) - hiBehind;
      let thickness = screenMarchThickness(sceneZ);
      if (hiBehind < thickness) {
        hitT = hi;
        hitBehind = hiBehind / thickness;
        break;
      }
    }
    behindPrev = behind > 0.0;
    tPrev = t;
  }
  if (hitT < 0.0) { return vec4<f32>(0.0); }
  let uvHit = uv0 + duv * hitT;
  let size = vec2<f32>(textureDimensions(voxelMirrorColor));
  let colour = textureLoad(voxelMirrorColor, vec2<i32>(clamp(uvHit * size, vec2<f32>(0.0), size - vec2<f32>(1.0))), 0).rgb;
  let border = min(min(uvHit.x, 1.0 - uvHit.x), min(uvHit.y, 1.0 - uvHit.y));
  return vec4<f32>(colour, smoothstep(0.0, ${mV}, border) * (1.0 - smoothstep(0.5, 1.0, hitBehind)));
}`;var nV=`  if (front && in.worldNormal.y > 0.5) {
    let mirrorP = mix(in.worldPos, round(paneP * 1024.0) / 1024.0, paneCalm);
    let mirrorV = ${w0("frame.cameraPosition - mirrorP")};
    let mirror = voxel_paneMirror(mirrorP, paneN, mirrorV);
    let mirrorSky = lume_cubeSampleLevel(iblEnvMap, iblSampler, reflect(-mirrorV, paneN), roughness * passLights.iblParams.y, passLights.iblParams.y + 1.0).rgb * passLights.iblParams.x;
    let mirrorWeight = mirror.a * ${1-fV};
    litColor = max(litColor + (mirror.rgb * max(F.r, max(F.g, F.b)) - mirrorSky * F) * mirrorWeight, vec3<f32>(0.0));
  }`;var qj=`  var paneBody = vec2<f32>(in.surface.z, F.g);
  if (front && in.worldNormal.y > 0.5 && paneCalm > 0.0) {
    let paneBed = voxel_paneBed(in.worldPos);
    if (paneBed >= 0.0) {
      let paneSide = 1.0 / (in.cubeScale * ${y}.0);
      let paneDeep = floor(paneBed / paneSide + 0.5) * paneSide;
      let paneClear = select(pow(clamp(1.0 - in.surface.z, 0.0, 1.0), ${Bj}), voxelSurfaceTable[in.look.x + ${$9}u].w, in.look.x != 0u);
      let paneCrosses = exp(paneDeep * log(max(paneClear, 1e-4)) / ${Tj});
      let paneHides = clamp(${pV} + max(F.r, max(F.g, F.b)), 0.0, 1.0);
      paneBody = mix(paneBody, vec2<f32>(max(1.0 - paneCrosses, metalness), paneHides), paneCalm);
    }
  }`;var Yj=`  let coverage = mix(in.surface.z, 1.0, F.g) * alphaSample;
`;var rV;var R6=`@fragment
fn fs(`;var L6=`  litColor += emissive;
`;function Lj(a,b){return (Lj=$c0C(143)).call(this,a,b)}var oV=($,J=!1)=>`terrain/voxel-bucket/liquid/surface/water-light/${I7({motion:J})}${S6($)}/mirror`,sV=($,J=!1)=>`terrain/voxel-bucket/liquid/surface/water-light/${I7({motion:J})}${S6($)}/bed`,aV;function tV(a,b,c,d){return (tV=$c0C(145)).apply(this,arguments)}var O0={device:null,pipelines:null,source:"vertex",surface:null,mirror:!0,motion:!1};var eV=function(){let{device:$,pipelines:J,source:Q,surface:Z,mirror:j,motion:q}=O0;if($===null||J===null||Z===null)throw Error("[lume terrain] the liquid's mirror ask ran outside its scope");return tV($,J,Q,Z,j,q)};function $H(a,b,c){return ($H=$c0C(146)).call(this,a,b,c)}function Vj(a,b,c){return (Vj=$c0C(147)).call(this,a,b,c)}var Hj=new WeakMap;function JH(a,b,c,d){return (JH=$c0C(148)).call(this,a,b,c,d)}var H7=($,J)=>$[J]??0,QH=new Float32Array(16),yj=new Float32Array(24);var $0={poses:new Float32Array(0),eyeX:0,eyeY:0,eyeZ:0,seen:!1};function jH(a){return $c0C(149).call(this,a)}function qH(a,b){return (qH=$c0C(150)).call(this,a,b)}var Kj=new WeakMap;function Sj(a,b,c,d){return (Sj=$c0C(151)).call(this,a,b,c,d)}function YH($,J,Q,Z){if(Z.worldView===!0||Z.peelPass===!0)return;Sj($,J,Q!==void 0&&Q.surfaceEntries>0&&Z.lightOnce===!0&&qH(Q,Z.camera),cV(h6().tier))}function VH($,J){Sj($,J,!1,Aj)}var IX={bindings:m6,layout:k6,vsOut:f6,vs:p6,fsDefs:k0,fsPrologue:u6,paneDefs:i6,pane:n6,grownDefs:c6,grownFs:d6};;

;import{R as $Lr}from"./52e971dc2a986655.mjs";import{JYG as AQ,KCC as T5,MLm as R1,Mkp as U$,Umg as G$,VRl as h0,pMz as A1,wrO as L1}from"./c464196a0fb961c5.mjs";import"./0ec9c2e50790e64d.mjs";import{icQ as Wj,vyT as Dj}from"./cf59077a-57ecd4eb545e2713.mjs";import{ED8 as Bj,FlK as e8,Si9 as k$,UCk as $9,cMf as y,cyb as Tj,hPq as jJ,nKD as f$,w80 as m$}from"./95d9a38e18ab36ba.mjs";import{bdb as Cj,hUM as ZJ}from"./a9cc1ec7e83caf6a.mjs";import"./cfe77665f080a687.mjs";import"./a0205ca4-12bb529582a9ac80.mjs";import"./e75523a42fdedd89.mjs";import{$RF as m8,A78 as A7,BS2 as m,LGP as d0,Os6 as _8,_Gk as g8,aYQ as j7,rwx as e7,wSj as k8}from"./8f944fa2fe6c16bd.mjs";import{oKJ as x1}from"./3b29a5f6e0fddae8.mjs";import"./f0c51ac357c8bf2e.mjs";import{F5i as WZ,Ff5 as xZ,LXO as AZ,M4f as LZ,U0A as p9,YMO as f9,art as fJ,lPD as vZ,lbV as RZ,pmU as pJ}from"./56ed3918-9d676508c812580b.mjs";import{xnH as xQ}from"./528aa78d867258de.mjs";import{DrS as vQ,SWI as kJ,WKT as gJ,fEx as mJ}from"./2e5fd6befe42cca7.mjs";import{TyV as J1,hg6 as j1,smM as Q1,tXI as Z1}from"./d78d80a5-ec7dd8a579991798.mjs";import{HHM as _6,Y44 as d$}from"./3a143d46-c72a17da50e9068c.mjs";import"./73c224890e5dcb5e.mjs";import"./74261a44b2d4bab9.mjs";import"./8036015a501379d5.mjs";import"./09723e417d25bb2f.mjs";import"./0d004466878cd8d5.mjs";import"./47cd27b7baa599f1.mjs";import"./fe1722910da55e5a.mjs";import"./c89c4d81f3aa5de7.mjs";export{$H as askVoxelLiquidMirrorPipeline,A2 as releaseVoxelSurfaceOwners,AY as voxelGrowthSeenUntil,Dq as voxelGrownRows,EV as walkBladesView,HY as disposeVoxelGrowthState,I2 as moveVoxelSurfaceState,IX as VOXEL_SURFACE_ARM_TEXT,J7 as VOXEL_GROWTH_CHUNK_EPOCH_MASK,JH as voxelLiquidMirrorGroup,L2 as voxelSurfaceOwnTerms,LJ as voxelSurfaceClassMeans,Lj as voxelLiquidShareOf,Nq as resolveVoxelGrowth,OV as releaseBladesView,P2 as voxelSurfaceLookBlinks,PJ as warmVoxelSurfaceLookMeans,R2 as stepVoxelSurfaceAppear,RV as prepareBlades,S0 as VOXEL_GROWTH_ARRIVAL_MS,T2 as createVoxelSurfaceTable,VH as letGoVoxelLiquidMirror,VJ as resolveVoxelSurfaceLook,VV as createBladesState,YH as stateVoxelLiquidMirror,_2 as flushVoxelSurfaceTable,_V as warmBladesPipelines,b2 as setVoxelSurfaceEmissive,bV as bladesDraw,cY as warmVoxelGrowthPipelines,d1 as disposeBladesState,fq as noteVoxelGrowthChunkLeft,gY as dispatchVoxelGrowth,hV as captureBlades,iJ as VOXEL_GROWTH_CHUNK_WRITTEN,iY as voxelGrowthDraw,iq as releaseVoxelGrowthSlot,kq as createVoxelGrowthState,m7 as bladesLookSlotOf,mq as noteVoxelGrowthChunk,pq as voxelGrowthKeepsRewrites,uq as noteVoxelGrowthChunkRewritten,v2 as wearVoxelSurfaceGrown,v8 as VOXEL_GROWTH_CHUNK_SEEN,w5 as setVoxelGrowthRules,wY as prepareVoxelGrowth,x2 as setVoxelSurfaceLook,xJ as setVoxelSurfaceGrown,xY as voxelGrowthSeenWord,xj as voxelLiquidMirrorOn,y2 as stepVoxelSurfaceSlant,yV as dispatchBlades,z2 as voxelSurfaceLookFlows,z8 as VOXEL_SURFACE_STATE_MOVES,zJ as seedVoxelSurfaceLookMeans};
