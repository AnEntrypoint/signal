import{C as $c0K}from"./52e971dc2a986655.mjs";var $c0C,$c0T=[function(){return[()=>"(function($,Z,Q,X,J){if(!X){if(!J){{let $$1=Z,Z$2=Q;{let $=$$1,Z=Z$2;for(let Q=Z;Q<$.length;Q++)T8($[Q])}}}$.output.length=0,$.slice=null;return}let K=$.slice;if(!J||K?.buffer!==X.buffer||K.offset!==X.offset||K.size!==X.size){let V=0,Y=$.runs;$.output.length=Y.length;for(let U=0;U<Y.length;U++){let q=Y[U];if(Array.isArray(q)){$.output[U]=Ty($,q[0],X,V,q.length);V+=q.length;}else $.output[U]=T8(q)}$.slice=X}for(let V=0;V<$.output.length;V++)Z[Q+V]=$.output[V];Z.length=Q+$.output.length})",()=>"(()=>({flags:0,rel:1,drawn:8,holdAt:15,holdTurn:18,takenAt:22,takenTurn:25,fingers:29,fingerWords:4,words:29+i6*4}))",()=>"(function($,Z,Q,X,J,K){let V=$[3];if(!(V>0)||!(Z>0))return!0;let Y=Q[X+4],U=Q[X+5],q=Q[X+6],z=Q[X+12]-$[0],j=Q[X+13]-$[1],G=Q[X+14]-$[2],B=Math.sqrt(Y*Y+U*U+q*q),M=Math.sqrt(z*z+j*j+G*G);return Z*B*V*(J?HA:1)>=M*K})",()=>"(function($){let Z=this.closures;for(let X=0;X<Z.length;X++){let J=Z[X];if(V0(J.mask,$))return J}let v$3;{let Z=0;for(let X=0;X<$.length;X++)if($[X]===1)Z++;let Q=new Int32Array(Z);Z=0;for(let X=0;X<$.length;X++)if($[X]===1)Q[Z++]=X;v$3={mask:$.slice(),list:Q,count:Z};}let Q=v$3;if(Z.length<d4)Z.push(Q);else Z[this.closureNext++%d4]=Q;return Q})",()=>"(function($,Z){if($<=this.reachWords&&Z<=this.gripWords)return;let Q=new Float32Array(Math.max($,this.reachWords)+Math.max(Z,this.gripWords));if($<=this.reachWords)Q.set(this.state.subarray(0,this.reachWords),0);this.reachWords=Math.max($,this.reachWords),this.gripWords=Math.max(Z,this.gripWords),this.state=Q})",()=>"(function($,Z,Q,X){let J=$.joints.length,K=$.target;K.fill(0),c9.fill(0);for(let U=0;U<J;U++)c9[U]=1;let V=o9($,Z,Q,X,K,null,0);for(let U=0;U<=V;U++)c9[U]=0;let Y=V>=0;for(let U=0;U<4*Gg;U++){let v$10;{let Z=$.target,Q=!1;for(let X=0;X<$.joints.length;X++)if(e6[X]=c9[X]===1?Math.min($.caps[X],Z[X]+$.ratios[X]*gG):Z[X],e6[X]!==Z[X])Q=!0;v$10=Q;}if(!v$10)break;let v$8;oG:{let $=J;for(let Z=$-1;Z>=0;Z--)if(c9[Z]===0){v$8=Z+1;break oG;}v$8=0;}let q=o9($,Z,Q,X,e6,K,v$8);if(q<0){{let Z=$.target;for(let Q=0;Q<$.joints.length;Q++)if(Z[Q]=e6[Q],Z[Q]>=$.caps[Q])c9[Q]=0}continue}Y=!0;{let J$32=q;{let J=J$32;let K=$.joints.length,V=$.target,Y=0,U=1,q=J;for(let z=0;z<CA;z++){let j=(Y+U)/2;for(let B=0;B<K;B++)FG[B]=V[B]+(e6[B]-V[B])*j;let v$9;oG$:{let $=K;for(let Z=$-1;Z>=0;Z--)if(c9[Z]===0){v$9=Z+1;break oG$;}v$9=0;}let G=o9($,Z,Q,X,FG,V,v$9);if(G<0)Y=j;else U=j,q=G}for(let z=0;z<K;z++)V[z]+=(e6[z]-V[z])*Y;for(let z=0;z<=q&&z<K;z++)c9[z]=0}}}return Y})",()=>"(function($,Z,Q){let X=new Float64Array(3),J=$[0]*Z[0]+$[1]*Z[1]+$[2]*Z[2];for(let U=0;U<3;U++)X[U]=$[U]-Z[U]*J;let K=Float64Array.from(X);if(!h$(K))K.set($);let V=o6(Z,K,new Float64Array(3)),Y=[];for(let U=-mA;U<=fA;U++)for(let q=-YG;q<=YG;q++){let z=[0,1,2].map((j)=>(K[j]*U+V[j]*q)*uA*Q);Y.push({at:z,slide:p$(z,X)})}return Y.sort((U,q)=>U.slide-q.slide),Float64Array.from(Y.flatMap((U)=>U.at))})",()=>"(function($,Z,Q,X){let J=uG*$.span*Z,K=-1;for(let V=0;V<3;V++){IZ(d9,$.probes,V*3,Z),s9(d9,l0,d9);for(let Y=0;Y<3;Y++){l9.set($.normal);if(Y>0){rG($.across,Y===1?VG:-VG,l9,l9);}D$(z$,l9,l9);let U=Q.cast(X,d9,l9,J);if(U>=0&&(K<0||U<K))K=U,r6.set(l9),y2.set(d9)}}return K})"]},function(){return[()=>"(function($,Z){let Q=$.hands,{u32:X,f32:J}=Z$(jZ.words+Q.length*(Q$??=$c0I(1)).words);X[jZ.hands]=Q.length;Q.forEach(function(K,V){let Y=jZ.words+V*(Q$??=$c0I(1)).words,U=0;if(K.holding)U|=SV;if(K.support.active)U|=CV;if(K.armPosed)U|=kV;if(K.items.length>0&&V0(K.solvedItems,K.items))U|=yV;else {let v$59;{let U$6=U;{let U=U$6;if(K.items.length>0&&Z?.drawnPose(K.items[0],eG,$B)===!0)U|=AV,J.set(eG,Y+(Q$??=$c0I(1)).drawn),J.set($B,Y+(Q$??=$c0I(1)).drawn+3);\nv$59=U;}}U=v$59}X[Y+(Q$??=$c0I(1)).flags]=U,J.set(K.solvedRel,Y+(Q$??=$c0I(1)).rel),J.set(K.support.pos,Y+(Q$??=$c0I(1)).holdAt),J.set(K.support.rot,Y+(Q$??=$c0I(1)).holdTurn),J.set(K.support.takenPos,Y+(Q$??=$c0I(1)).takenAt),J.set(K.support.takenRot,Y+(Q$??=$c0I(1)).takenTurn),K.fingers.slice(0,i6).forEach(function(q,z){let j=Y+(Q$??=$c0I(1)).fingers+z*(Q$??=$c0I(1)).fingerWords;J[j]=q.posed?1:0;for(let G=0;G<Math.min(q.joints.length,H2);G++)J[j+1+G]=q.target[G]})});return X})",()=>"(function($,Z,Q,X){let J=0,K=0;for(let V of $.children){MY.setFromMatrixPosition(B0.view(Q.world,$.index*16));let Y=0;for(let q=V;X(q);q=q.children[0]??null){if(FY.setFromMatrixPosition(B0.view(Q.world,q.index*16)),TZ.subVectors(FY,MY),TZ.lengthSq()<J8*J8)continue;if(TZ.normalize(),Y===0)WB.copy(TZ);Y+=1,MY.copy(FY)}if(Y<2)continue;let U=TZ.dot(Z)-WB.dot(Z);J+=U,K+=Math.sign(U)}return J<0&&K<0})",()=>'(function($,Z,Q){for(let X of this.effectors){if(X.kind!=="reach"||X.superseded||!(X.walk.snapped(Z,Z-Q)>0))continue;if(X.bone.index!==$&&X.chain?.end.index!==$)continue;return X.walking=X.walk.snapped(Z,Z-Q)!==X.walk.goal,X}return null})',()=>'(function($,Z){let Q=this.ikRig,X=$?.channels?.head;if(!Q||this.carried?.length||X?.rides||$?.reach||$?.aim||$?.ground||this.effectors.some((J)=>!X||J.bone!==Q.head))return!1;for(let J of i2)if(J!=="head"&&$?.channels?.[J])return!1;if(X)Z(Q.head?.index??-1);Z(Q.hips.index);for(let J of Q.spine)Z(J.index);for(let J of[Q.leftLeg,Q.rightLeg]){if(!J)continue;Z(J.end.index);for(let K of J.end.children)if(K.isJoint)Z(K.index)}for(let J of this.feet)if(Z(J.chain.end.index),J.ball)Z(J.ball.index);if(this.dropBone)Z(this.dropBone.index);return!0})',()=>"(function($){let Z=this.ikRig;if(!Z)return null;if(Z.leftArm?.end===$)return Z.leftArm;if(Z.rightArm?.end===$)return Z.rightArm;if(Z.leftLeg?.end===$)return Z.leftLeg;if(Z.rightLeg?.end===$)return Z.rightLeg;return null})",()=>"(function($,Z,Q){let X=$.chain;if(!X)return;s2(X,0,cB,TY,OB);let[J,K,V]=OB.a;if(!(J>0)||Math.abs(K-J)+Math.abs(V-J)>J*0.0001)return;Z.rideBody=!0;gB(Q.at,J,Z.rideAt);Z.rideTurn=!Q.turn?null:hg(Q.turn,Z.rideTurnAt);Z.ridePole=!Q.pole?null:gB(Q.pole,J,Z.ridePoleAt)})",()=>"(function($){if($.owed||$.reach?.heldStamps.includes(NaN)===!0||$.gripIn>0||$.gripReread)return NaN;let Z=1/0;if($.reach!==null&&$.nextEdge<Z)Z=$.nextEdge;if($.reachStands&&$.reachUntil<Z)Z=$.reachUntil;if($.gripStands&&$.gripUntil<Z)Z=$.gripUntil;return Z})",()=>"(function($,Z,Q){let X=$.position.length-$.position.length%3;if(X>0){let U=new Float64Array(X);{let X$11=U;{let X=X$11;let J=$.position,K=Q?$.joints:null,V=Q?$.weights:null,Y=K&&V?4:1;for(let U=0;U<J.length/3;U++){let q=J[U*3],z=J[U*3+1],j=J[U*3+2],G=0,B=0,M=0;for(let L=0;L<Y;L++){let F=V!==null&&K!==null?V[U*4+L]:1;if(F===0)continue;let H=V!==null&&K!==null?K[U*4+L]*16:0;G+=F*(Z[H]*q+Z[H+4]*z+Z[H+8]*j+Z[H+12]),B+=F*(Z[H+1]*q+Z[H+5]*z+Z[H+9]*j+Z[H+13]),M+=F*(Z[H+2]*q+Z[H+6]*z+Z[H+10]*j+Z[H+14])}X[U*3]=G,X[U*3+1]=B,X[U*3+2]=M}}}return U}let{min:J,max:K}=$.bounds;for(let U=0;U<3;U++)if(!i(J[U])||!i(K[U])||J[U]>K[U])return new Float64Array(0);let V=Q?Math.floor(Z.length/16):1,Y=new Float64Array(V*24);for(let U=0;U<V;U++){let q=U*16;for(let z=0;z<8;z++){let j=z&1?K[0]:J[0],G=z&2?K[1]:J[1],B=z&4?K[2]:J[2],M=(U*8+z)*3;Y[M]=Z[q]*j+Z[q+4]*G+Z[q+8]*B+Z[q+12],Y[M+1]=Z[q+1]*j+Z[q+5]*G+Z[q+9]*B+Z[q+13],Y[M+2]=Z[q+2]*j+Z[q+6]*G+Z[q+10]*B+Z[q+14]}}return Y})"]},function(){return[()=>"(function($,Z,Q){let X=new Map;for(let J of $)for(let K=0;K<J.length;K+=3){let V=J[K],Y=J[K+1],U=J[K+2],q=Math.min(2,Math.floor((V-Z[0])/Math.max(Q[0]-Z[0],0.000000001)*3)),z=Math.min(2,Math.floor((U-Z[2])/Math.max(Q[2]-Z[2],0.000000001)*3)),j=q+z*3,G=X.get(j);if(!G||Y<G[1])X.set(j,[V,Y,U])}return X})",()=>"(function($,Z,Q,X,J){if(Z.skinIndex===null)return Q.subarray(Z.nodeIndex*16,Z.nodeIndex*16+16);let K=$.skins[Z.skinIndex];if(!K.joints.every((Y)=>X.has(Y)))return null;let V=J.get(Z.skinIndex);if(!V)V=new Float32Array(K.joints.length*16),v$(K,Q,V),J.set(Z.skinIndex,V);return V})",()=>"(function($){return{nodes:[],skins:$===null?[]:[$],materials:[],min:[1/0,1/0,1/0],max:[-1/0,-1/0,-1/0],offset:[0,0,0],velocity:[0,0,0],clear:!1,floor:-1/0,elapsed:0,spin:[0,0,0],rotation:Float32Array.of(1,0,0,0,1,0,0,0,1)}})",()=>"(function($,Z,Q){let X=$.rig;if(!Q?.length||!Z.length||X===null)return;let J=(z)=>p$(z.max,z.min);let K=Z.reduce((z,j)=>J(z)>=J(j)?z:j);let V=new Set(Z.flatMap((z)=>z.nodes));let Y=Q.filter((z)=>!V.has(z));let U=new Float32Array(Y.length*16);let q=X.world;Y.forEach((z,j)=>U.set(q.subarray(z*16,z*16+16),j*16)),K.followers={nodes:Y,world:U}})",()=>"(function($,Z,Q,X,J){let K={height:0,normalX:0,normalY:1,normalZ:0},V=1/0;for(let Y=0;Y<$.contactPoints.length;Y+=3){V=Math.min(V,$.contactPoints[Y+1]+Q-RY($,$.contactPoints[Y]+Z,$.contactPoints[Y+2]+X,J,K));}return V})",()=>'(function($,Z){$.phase="pieces";let Q=($.min[0]+$.max[0])*0.5,X=($.min[2]+$.max[2])*0.5,J={height:0,normalX:0,normalY:1,normalZ:0};$.pieces.forEach(function(K,V){let Y=(K.min[0]+K.max[0])*0.5,U=(K.min[2]+K.max[2])*0.5,q=Y-Q,z=U-X,j=E8(q,z);if(j>0.000001)q/=j,z/=j;else{let G=V*2.399963229728653;q=Math.cos(G),z=Math.sin(G)}K.velocity=[$.velocity[0]*0.4+q*0.85,0.8,$.velocity[2]*0.4+z*0.85];K.spin=[-z*4.2,V%2?-0.9:0.9,q*4.2];K.floor=RY($,Y+$.offsetX,U+$.offsetZ,Z,J)})})',()=>'(function($,Z,Q){$.piecesElapsed+=Z;let X={height:0,normalX:0,normalY:1,normalZ:0};for(let J of $.pieces){if(J.clear)continue;J.elapsed+=Z;cO:{let $$22=J;{let $=$$22;let Z=c($.spin[0],$.spin[1],$.spin[2]);if(Z===0)break cO;let Q=$.spin[0]/Z,X=$.spin[1]/Z,J=$.spin[2]/Z,K=Math.cos(Z*$.elapsed),V=Math.sin(Z*$.elapsed),Y=1-K,U=$.rotation;U[0]=Y*Q*Q+K,U[1]=Y*Q*X+V*J,U[2]=Y*Q*J-V*X,U[3]=Y*Q*X-V*J,U[4]=Y*X*X+K,U[5]=Y*X*J+V*Q,U[6]=Y*Q*J+V*X,U[7]=Y*X*J-V*Q,U[8]=Y*J*J+K}}J.offset[0]+=J.velocity[0]*Z;J.offset[1]+=J.velocity[1]*Z-4.905*Z*Z;J.offset[2]+=J.velocity[2]*Z;J.velocity[1]-=9.81*Z;let K=(J.min[0]+J.max[0])*0.5+$.offsetX+J.offset[0],V=(J.min[2]+J.max[2])*0.5+$.offsetZ+J.offset[2];J.floor=RY($,K,V,Q,X);J.clear=nO(J)+$.offsetY+J.offset[1]<J.floor-0.03}if($.pieces.every((J)=>J.clear))$.phase="clear"})',()=>'(function($,Z,Q){if($.phase==="clear"){$.piecesElapsed=Math.min(2,$.piecesElapsed+Z);return}if($.elapsed+=Z,$.phase==="pieces"){SM($,Z,Q);return}for(let X=0;X<2&&Z>0;X++){let J=OY($,Z);if(gY($,...J,Q)>0){[$.offsetX,$.offsetY,$.offsetZ]=J,$.velocity[1]-=9.81*Z;return}let K=0,V=Z;for(let U=0;U<12;U++){let q=(K+V)*0.5;if(gY($,...OY($,q),Q)>0)K=q;else V=q}[$.offsetX,$.offsetY,$.offsetZ]=OY($,V);let Y=gY($,$.offsetX,$.offsetY,$.offsetZ,Q);if(i(Y))$.offsetY-=Y;$.velocity[1]-=9.81*V;Z-=V;$.landed=!0;if($.phase==="fall")$.phase="bounce",$.velocity[0]*=0.55,$.velocity[2]*=0.55,$.velocity[1]=Math.max(0,-$.velocity[1]*0.18);else{dO($,Q);SM($,Z,Q);return}}})']},function(){return[()=>'(function($,Z,Q){let X=$.nativeRelease;if(!X)return;X.appliedStamp=-1;let J=X.groups;for(let K of J){let V=K.phase==="clear";if(K.firstFrame){if(K.firstFrame=!1,K.firstDelta>0)CM(K,K.firstDelta,Q)}else if(i(Z)&&Z>0)CM(K,Z,Q);if(V){for(let Y of K.materials){let U=$.materialSlots[Y.index];if(U.hidden)continue;U.hidden=!0,$.leftOutOwed=!0}continue}for(let Y of K.materials){let U=$.materialSlots[Y.index],q=Y.hidden||K.pieces.some((z)=>z.clear&&z.materials.includes(Y.index));if(U.hidden!==q)$.leftOutOwed=!0;U.hidden=q;for(let z=0;z<12;z++)U.data[z]=Y.data[z];for(let z=16;z<19;z++)U.data[z]=Y.data[z];U.dirty=!0}}OZ($)})',()=>'(function($,Z,Q){let X={verdict:"agree",rows:0,missed:0,worstGap:0,kind:""};if(Q[RZ]!==bY)return X.verdict="unread",X;let J=new Float32Array(Q.buffer,Q.byteOffset,Q.length),K=[0,0,0],V=[0,0,0],Y=[0,0],U=0,q=!1;for(let j of $){if(j.kind===q1){if(J[U+1]===pY)return X.verdict="unread",X.kind="unrun",X;if(K[2]+=1,J[U]>0.5!==Z[U]>0.5||J[U+1]>0.5!==Z[U+1]>0.5)V[2]+=1}else{let G=0;for(let B=0;B+16<=j.words;B+=16){let M;$w:{let $$26=J,Z$30=U+B,Q$20=Z,X$12=U+B;{let $=$$26,Z=Z$30,Q=Q$20,X=X$12;let J=0;for(let K=0;K<16;K++){let V=$[Z+K],Y=Q[X+K];if(V!==V||Y!==Y){if(V!==V&&Y!==Y)continue;{M=1/0;break $w;}}let U=V>Y?V-Y:Y-V;if(U>J)J=U}M=J;}}if(K[j.kind]+=1,M>tO)G+=1;if(M>Y[j.kind])Y[j.kind]=M}if(V[j.kind]+=G,G*32>j.words)q=!0}U+=j.words}if(V[2]>0||q)X.verdict="miss";let z=V[1]>V[0]||V[1]===V[0]&&Y[1]>Y[0]?1:0;if(V[2]>0)z=2;return X.rows=K[0]+K[1]+K[2],X.missed=V[0]+V[1]+V[2],X.worstGap=Math.max(Y[0],Y[1]),X.kind=rO[z],X})',()=>'(async function($,Z,Q,X){let J=new Uint32Array(Y1);J[RZ]=mY;let K=0;for(let q of X){for(let z=0;z<q.words;z++)J[K+z]=q.at+z;K+=q.words}let V=$.createBuffer({label:"lume pose proof words",size:J.byteLength,usage:128|8}),Y=$.createTexture({label:"lume pose proof",size:[$6,wZ],format:"r32uint",usage:16|1}),U=$.createBuffer({label:"lume pose proof read",size:Y1*4,usage:1|8});try{$.queue.writeBuffer(V,0,J);let q=$.createCommandEncoder({label:"lume pose proof"}),z=q.beginRenderPass({label:"lume pose proof",colorAttachments:[{view:Y.createView(),loadOp:"clear",storeOp:"store",clearValue:{r:mY,g:0,b:0,a:0}}]});z.setPipeline(Q),K=0;for(let G of X){let B=$.createBindGroup({label:"lume pose proof",layout:Z,entries:[{binding:0,resource:{buffer:G.buffer}},{binding:1,resource:{buffer:V}}]});z.setBindGroup(0,B),z.draw(G.words,1,K,0),K+=G.words}z.draw(1,1,RZ,0),z.end(),q.copyTextureToBuffer({texture:Y},{buffer:U,bytesPerRow:$6*4,rowsPerImage:wZ},[$6,wZ]),$.queue.submit([q.finish()]),await U.mapAsync(1);let j=new Uint32Array(U.getMappedRange().slice(0));return U.unmap(),j}finally{V.destroy(),Y.destroy(),U.destroy()}})',()=>'(async function($,Z){let Q=$.createBuffer({label:"lume pose proof read",size:Y1*4,usage:1|8});try{let X=$.createCommandEncoder({label:"lume pose proof"}),J=0;for(let V of Z)X.copyBufferToBuffer(V.buffer,V.at*4,Q,J*4,V.words*4),J+=V.words;$.queue.submit([X.finish()]),await Q.mapAsync(1);let K=new Uint32Array(Q.getMappedRange().slice(0));return Q.unmap(),K[RZ]=bY,K}finally{Q.destroy()}})',()=>"(function($){let Z=$.mixer.activeLayerList;if(Z.length===0)return!0;let Q=$.skinBind;if(Q===null||$.skinParentFace!==null)return!1;for(let X=0;X<Z.length;X++){if(!Kw(Q,Z[X].clip))return!1;}return!0})"]},function(){return[()=>"(function($,Z){let Q=oM.get(Z.remaps);if(Q!==void 0)return Q;let X=!1,J=$.asset.parsed.skins;for(let K=0;K<Z.remaps.length&&!X;K++){let V=Z.remaps[K],Y=J[K];if(!Y||!V||V.unboundCount===0&&!V.noBone)continue;let U=$.jointBoxes[K],q=U!==void 0&&U.length>=Y.joints.length*6;for(let z=0;z<Y.joints.length&&!X;z++){if(V.parentNode[z]>=0||W1(Z,Y.joints[z])>=0)continue;X=!q||U[z*6]<=U[z*6+3]}}return oM.set(Z.remaps,X),X})",()=>"(function($,Z,Q,X,J){let K=$.asset.parsed.skins[X],V=Z.remaps[X];if(!K||!V){if($.rig!==null)v$(K,$.rig.world,J);return}let Y=Q.jointWorldStore(),U=Q.root(),q=$.jointBoxes[X],z=q!==void 0&&q.length>=K.joints.length*6&&tM.get(J)===V;if(!z)tM.set(J,V);for(let j=0;j<K.joints.length;j++){if(z&&j>0&&!(q[j*6]<=q[j*6+3]))continue;let G=V.parentNode[j];if(G>=0&&(G+1)*16<=Y.length)Q.deriveJointWorld?.(G),F1(Y,G*16,Z.unit,uZ,0);else if(!tY($,Z,K.joints[j],Y,U,Q,uZ,0))continue;f(uZ,0,K.inverseBindMatrices,j*16,J,j*16)}})",()=>"(function($,Z,Q,X,J,K,V,Y,U,q,z,j=1,G=null){let B=$.model;if(K<0||Q[K]>=0||(K+1)*16>B.length)return!1;let M=X?.[K]??-1,L=Q[M];if(L>=0&&(L+1)*16<=V.length){if(U?.deriveJointWorld?.(L),k0(B,M*16,sM,0),f(sM,0,B,K*16,Z6,0),G!==null&&(L+1)*16<=G.length)f(G,L*16,Z6,0,Z6,0);oY(Z6,0,j);f(V,L*16,Z6,0,q,z);return !0}if(J!==null&&Z[K]?.name===$F)return f(Y.a,Y.o,J,K*16,q,z),!0;let F=$.bindCorrection;if(F)f(F,0,B,K*16,Z6,0);return f(Y.a,Y.o,F?Z6:B,F?0:K*16,q,z),!0})",()=>"(function($,Z){let{collapseUnder:Q,nodes:X}=Z,J=null;if(Q!==null&&Q.length===X&&Z.row>=0){if(dZ.length<X)dZ=new Uint8Array(X);dZ.fill(0,0,X);for(let z of Z.reads)fZ(Q,z.node);for(let z of Z.carried)fZ(Q,z.node);for(let z of Z.riders)if(z.role===V$)fZ(Q,z.joint);let K=Z.character,V=K?.springs?.table?.nodes;if(V!==void 0)for(let z=0;z<V.length;z++)fZ(Q,V[z]);let Y=K?.passes.row??null,U=K?.rig??null;if(Y!==null&&U!==null)for(let z of Object.values(Y))fZ(Q,U.getBoneByName(z)?.index??-1);let q=0;for(let z=0;z<X;z++){let v$20;{let $$30=Q,Z$35=z;{let $=$$30,Z=Z$35;let Q=$[Z];v$20=Q<0||Q===Z||dZ[Q]===1;}}if(v$20)q++;}if(q<X){J=new Uint32Array(1+q),J[0]=q;let z=1;for(let j=0;j<X;j++){let v$21;{let $$31=Q,Z$36=j;{let $=$$31,Z=Z$36;let Q=$[Z];v$21=Q<0||Q===Z||dZ[Q]===1;}}if(v$21)J[z++]=j}}}if(J!==null&&V0(Z.blendWords,J))return;if(J===null&&Z.blend<0)return;{let Q=Z.blendWords;if(Z.blend>=0&&Q!==null){hc($,Z,Q);}Z.blend=-1,Z.blendWords=null}if(J!==null)Z.blend=l1($.bake,J),Z.blendWords=J;if(Z.row<0)return;o0($,Z.row+R.blend,Z.blend>=0?Z.blend:A)})",()=>"(function($,Z){let Q=_.get($),X=Q?.skins[Z],J=$.skins[Z];if(Q===void 0||X===void 0||J===void 0)return;if(X.floats!==J.data.length){let K=Q.table,V=q7(K,J.data.length,X.table);V.held=X.held;V.collapsed=X.collapsed;Ow(K,X,V);Q.skins[Z]=V;Q.bindings=B7;lZ(K,X);b8(K,Q)}mU(Q.table,Q,Z)})",()=>'(function($,Z,Q){let X=Math.min(Z.floats,Q.floats);if(X<=0)return;let J=$.page.mirrorF32;if(J.copyWithin(Q.slot,Z.slot,Z.slot+X),J.copyWithin(Q.previous,Z.previous,Z.previous+X),$.cpuCurrent){for(let q of[Q.slot,Q.previous])$.device.queue.writeBuffer($.page.buffer,q*4,J,q,X);return}let K=X*4;if($.carry===null||$.carryBytes<K*2)$.carry?.release(),$.carryBytes=Math.max(K*2,$.carryBytes*2,4096),$.carry=j7($.device,{label:"lume pose slot carry",size:$.carryBytes,usage:4|8},gw);let V=$.page.buffer,Y=$.carry.resource,U=$.device.createCommandEncoder({label:"lume pose slot carry"});U.copyBufferToBuffer(V,Z.slot*4,Y,0,K),U.copyBufferToBuffer(V,Z.previous*4,Y,K,K),U.copyBufferToBuffer(Y,0,V,Q.slot*4,K),U.copyBufferToBuffer(Y,K,V,Q.previous*4,K),$.device.queue.submit([U.finish()])})']},function(){return[()=>"(function($,Z,Q,X){let J=Rw;J.set(Q.subarray(0,16),q$.offset),J.set(X??hL,q$.hold);let K=Z.local>=0;for(let Y=0;Y<q$.floats&&K;Y++)K=Z.localWords[Y]===J[Y];if(K)return;Z.localWords.set(J);let V=new Uint32Array(q$.floats);if(new Float32Array(V.buffer).set(J),Z.local>=0)$.bake.page.ranges.free(Z.local,q$.floats);if(Z.local=l1($.bake,V),Z.row<0)return;o0($,Z.row+R.local,Z.local)})",()=>"(function($,Z,Q,X,J){let K=0,V=X9($);for(let Y=0;Y<V.length;Y+=1){let U=V[Y],q=$[U];if(q===void 0||q===null)continue;let z=m1(Z,$,Y,U);if(z<0)continue;hF(q,bZ);let j=bZ[0]!==0||bZ[1]!==0||bZ[2]!==0;pF(q,J6);let G=J6[0]!==0||J6[1]!==0||J6[2]!==0,B=u1(q),M=B!==1;if(!j&&!G&&!M)continue;if(Q!==null&&X!==null){let L=J+K*T0.words;if(j)oF(eY,bZ);let{a:F,o:H}=eY;Q[L+T0.node]=z,Q[L+T0.flags]=(j?V2:0)|(G?Y2:0)|(M?YV:0),X[L+T0.scale]=B,X[L+T0.turn]=j?F[H]:0,X[L+T0.turn+1]=j?F[H+1]:0,X[L+T0.turn+2]=j?F[H+2]:0,X[L+T0.turn+3]=j?F[H+3]:1,X[L+T0.move]=J6[0],X[L+T0.move+1]=J6[1],X[L+T0.move+2]=J6[2]}K+=1}return K})",()=>"(function($,Z){let{rigid:Q,character:X}=Z;if(Q===null||X===null)return;let J=X.rigidData,K=X.rigidPrimitives.length;for(let V=0;V<K;V++){let Y=V*C8,U=J.subarray(Y+16,Y+C8);U$($,Q.slot+Y+16,U),U$($,Q.previous+Y+16,U),U$($,Q.slot+Y+k8,J.subarray(Y+k8,Y+k8+1))}})",()=>"(function($,Z){let Q=$[Z+y0.tick],X=$[s.delay],J=Q+X;if(($[s.flags]&oX)!==0){let K=$[s.clockTick],V=$[s.clockAt];if(K<Q)J=Math.max(J,V+(Q-K)/Math.min(1,$[s.slewRate]))}if(($[s.flags]&f5)!==0){{J=vc($,J,X)}}return J+1})",()=>"(function($,Z,Q,X,J,K,V){let Y=$[Q+r.flags]!==rX;$[Q+r.flags]=rX,Y=$U(Z,Q+r.anchor,X[0]+V[0])||Y,Y=$U(Z,Q+r.anchor+2,X[1]+V[1])||Y,Y=$U(Z,Q+r.anchor+4,X[2]+V[2])||Y;for(let U=0;U<4;U++){let v$24;{let $$40=Z,Z$48=Q+i5+U,Q$30=J[U];{let $=$$40,Z=Z$48,Q=Q$30;let X=$[Z];v$24=($[Z]=Q,$[Z]!==X);}}Y=v$24||Y;}for(let U=0;U<3;U++){let v$25;{let $$41=Z,Z$49=Q+o5+U,Q$31=K[U];{let $=$$41,Z=Z$49,Q=Q$31;let X=$[Z];v$25=($[Z]=Q,$[Z]!==X);}}Y=v$25||Y;}return Y})",()=>"(function($,Z,Q,X){let J=VR;if(J.set(Q),X!==null)f(J,0,X,0,J,0);let K=!0;for(let Y=0;Y<16;Y++){if(Z.root[Y]===J[Y])continue;K=!1;break}if(K)return!1;if(Z.root.set(J),Z.row<0)return!0;let V=Z.row+R.root;return $.mirrorF32.set(Z.root,V),M0($,V,V+16),G6($,Z,eR),!0})",()=>'(function($,Z,Q,X,J,K){if(m8()){let Y=Promise.reject(Error(`\'${K}\' refused`));return Y.catch(function(){return}),{pipeline:null,ready:Y,failed:!0}}let V;{let Z=_F($);V=B2%Z===0?Z:0;}return Z.warmScope(()=>Z.getComputePipeline(YU(X,V),()=>({label:`lume ${K}`,layout:$.createPipelineLayout({bindGroupLayouts:[Q.layout]}),compute:{module:Z.shaderModule((V>0?`enable subgroups, subgroup_size_control;\n${J.replaceAll("@compute",`@subgroup_size(${V}) @compute`)}`:J),"lume pose"),entryPoint:K}}),{watchdogMargin:!0}),"late")})',()=>"(function($,Z,Q){let X;{let Z=_F($);X=B2%Z===0?Z:0;}for(let J of M$){if(Q[J]===Y$){Q[J]=Z.peekComputeHandle(YU(J,X))??Y$;}}for(let J=0;J<x0.length;J++){Q.waves[J]??=Z.peekComputeHandle(YU(x0[J].entry,X))??null}})",()=>"(function($,Z){let Q=Yq($,{},Z.parsed,Z.mixer),X=new Float32Array(Q.scratchFloats);X.set(RU,0),k$($.device,$.scratch,Q.scratch-P0,X);let J=Q.block;if(J!==null){let K=new Float32Array(J.floats);k$($.device,$.page,J.slot,K),k$($.device,$.page,J.previous,K)}return Q})"]},function(){return[()=>"(function($,Z,Q,X,J){let K=$.bake.page.mirror,V=Q.skins.some((U)=>U.job!==null),Y=Math.min(Q.nodes*16+16,Math.floor((V?J/2:J)/16)*16);if(Y>=16)X.push({buffer:Z.scratch,at:Q.scratch+Q.nodes*10,words:Y,kind:pM}),J-=Y;for(let U of Q.skins){if(U.job===null||U.held||U.collapsed||U.table<0)continue;let q=Math.min((K[U.table+n8.joints]+1)*16,Math.floor(J/16)*16);if(q<16)break;X.push({buffer:Z.page,at:U.slot,words:q,kind:U1}),J-=q}return J})",()=>"(function($){let{mirror:Z,seenHost:Q,poses:X}=$;for(let J of X){if(!J.heldSeen){vF($,J.row,0);}}if(Q.scratch.length<$.scratch.words)Q.scratch=new Float32Array($.scratch.words);if(Q.placed.length<X.length*R9)Q.placed=new Float32Array(X.length*R9);D2($.bake.page.mirror,Z,Q.scratch,Q.placed);for(let J of X){let K=Z[J.row+R.scratch];if(K>=P0&&K!==A&&Q.scratch[K-N$]>0.5){vF($,J.row,s8)}}Z[T.seenViews]=Z[T.seenLights]=Z[T.seenGate]=0,M0($,0,T.words)})",()=>"(function($,Z){let Q=$.census.seen.watch;if(Q.left<=0||$.seenWatch!==null)return;Q.left-=1;let{mirror:X,mirrorF32:J}=$,K=new Float32Array($.scratch.words),V=X[T.poseCount],Y=X[T.poseList],U=new Float32Array(V);for(let j=0;j<V;j++){let G=X[Y+j]+R.bound+3;if(U[j]=J[G],J[G]>0)J[G]*=kR}D2($.bake.page.mirror,X,K,new Float32Array(V*R9));let q=new Set;for(let j=0;j<V;j++){let G=X[Y+j];J[G+R.bound+3]=U[j];let B=X[G+R.scratch];if((X[G+R.flags]&(s8|t8))===0&&X[G+R.wearer]===A&&X[G+R.seenWith]===A&&U[j]>=0&&K[B-N$]>0.5&&K[B-i8]>0.5)q.add(G)}if(q.size===0)return;let z={frame:$.frame,stamp:J[T.seenFrame],rows:q,ran:!1,flying:!1};$.seenWatch=z,Z.addSubmitCommitHook(()=>void(z.ran=!0),void 0,(j)=>void(z.ran&&=!j))})",()=>'(function($){let Z=$.seenWatch,Q=$.census.seen.watch;if(Z===null||Z.flying||Z.frame===$.frame)return;if(!Z.ran||$.flushedFrame!==Z.frame||$.flushCount!==1||!$.seenGated){if(!Z.ran)Q.unrun+=1;$.seenWatch=null;return}Z.flying=!0;let X=()=>void($.seenWatch=null);Kq($).then(function(J){X();let K=J.bodies.filter((U)=>Z.rows.has(U.row)),V=K.filter((U)=>!(U.gpu[1]>0.5&&U.gpu[2]>0.5));if(Q.frames+=1,Q.bodies+=K.length,Q.missed+=V.length,V.length===0||m8()||R1()||++Q.missedFrames<AR)return;WU(),V6("lume.crowd_pose_proof",{verdict:"seen_miss"});let Y=V[0];__sc.warn(`[lume] pose proof: seen words miss on ${Q.missedFrames} frames, ${V.length} of ${K.length} at ${Z.stamp} (${Y.entity}: ${Y.gpu.join(" ")})`)},X)})',()=>'(function($){let Z=$.scratch.words*4,Q=$.world;if(Q===null||$.worldBytes<Z){let X={label:"lume pose world blocks",size:Z,usage:kU};if(Q===null)Q=O1(()=>j7($.device,X,function(){})),$.world=Q;else $.retired.push({buffer:Q.replace(X),frame:$.frame});$.worldBytes=Z}return Q.resource})',()=>'(function($,Z,Q){let X=$.groups,J=$.bake.page.buffer,K=rZ($.device).buffer;if(X!==null&&X.layout===Z.layout&&X.rows===Q&&X.bake===J&&X.scratch===$.scratch.buffer&&X.page===$.page.buffer&&X.state===$.state.buffer&&X.reads===K&&X.world===$.world?.resource)return X.group;let V=JN($),Y=$.device.createBindGroup({label:"lume pose",layout:Z.layout,entries:TU([J,Q,$.scratch.buffer,$.page.buffer,$.state.buffer,K,V])});return $.groups={layout:Z.layout,rows:Q,bake:J,scratch:$.scratch.buffer,page:$.page.buffer,state:$.state.buffer,reads:K,world:V,group:Y},Y})']},function(){return[()=>"(function($,Z,Q,X,J){let K=$.desc.dispatches,V=$.commands[K.length];if(V===void 0)$.commands.push(V={pipeline:Z,bindGroups:Q,dispatch:[0,0,1],debugLabel:J});let Y=X<65535?X:65535;V.pipeline=Z,V.bindGroups=Q,V.debugLabel=J,V.dispatch[0]=Y,V.dispatch[1]=(X+Y-1)/Y|0,K.push(V)})",()=>"(function($,Z){let Q=$.guarded;if(Q===0){$.mirrorF32.set(Z,0);return}Jq($.guard,Q>>1);let X=0;for(let J=0;J<Q&&X<Z.length;J+=2){let K=Math.min($.guard[J],Z.length);if(K>X)$.mirrorF32.set(Z.subarray(X,K),X);X=Math.max(X,$.guard[J+1])}if(X<Z.length)$.mirrorF32.set(Z.subarray(X),X)})",()=>'(function($,Z){let Q=$.mirror,X=Q[T.seen];if(Z.mode=gF[X]??"none",Z.flushes=[],$.flushedFrame===$.frame)for(let q=0;q<$.flushCount;q++)Z.flushes.push(q<CU?`${$.flushBys[q]} ${gF[$.flushModes[q]]??"none"}`:"more");Z.views=Q[T.seenViews],Z.eyes=Math.min(Q[T.seenEyes],Z.views),Z.lights=Q[T.seenLights],Z.pressure=Math.round($.posePressure*100)/100,Z.room=NU.word,Z.reaching=$.reachList.count,Z.cadences=[0,0,0,0];for(let q of $.poses)Z.cadences[Math.min(3,Math.max(0,q.cadence-1))]+=1;let J=Q[T.poseCount];if(Z.judged=J,Z.seen=0,Z.why=[],Z.bodies=[],J===0)return;let K=new Map;for(let q of $.bodies)if(q.row>=0)K.set(q.row,q);let V=new Float32Array($.scratch.words),Y=new Float32Array(J*R9);D2($.bake.page.mirror,Q,V,Y);let U=new Map;for(let q=0;q<J;q++){let z=Q[Q[T.poseList]+q],j=K.get(z)??null,G=Q[z+R.scratch],B=G>=P0&&G!==A,M=tZ(X,V,G,N$)>0.5,L=q*R9,F;if(X===p6||!B)F="no seen step";else if(X===w9)F="every view";else if((Q[z+R.flags]&s8)!==0)F=j!==null&&!j.heldSeen?"the CPU\'s seen step":"lens";else if(Q[z+R.wearer]!==A||Q[z+R.seenWith]!==A){let W=Q[z+R.wearer]!==A?Q[z+R.wearer]:Q[z+R.seenWith];F=`on ${K.get(W)?.mixer.bodyEntity??"a row"}`}else {F=aR(Y[L],Z.eyes,Z.views);}let H=B&&X!==p6?Q[z+R.flags]:0;if((H&t8)!==0)F+=", held: a body on it";if((H&E9)!==0)F+=", read";if(M)Z.seen+=1;let N=M?F:"unseen";if(U.set(N,(U.get(N)??0)+1),Z.bodies.length>=IN)continue;let I=j?.bound;Z.bodies.push({entity:j?.mixer.bodyEntity??`row ${z}`,role:j===null?"?":sR[j.role]??String(j.role),seen:M,eye:B&&X!==p6?V[G-i8]>0.5:!0,by:F,bound:I===void 0?[]:Array.from(I,V7),at:Array.from(Y.subarray(L+1,L+5),V7),eyeM:V7(c(Y[L+1]-$.view[0],Y[L+2]-$.view[1],Y[L+3]-$.view[2])),reach:j?.reachIn??!1,cadence:j?.cadence??1})}Z.why=[...U].sort((q,z)=>z[1]-q[1])})',()=>'(function($,Z,Q){let X=[];if(($&(l5|d5))!==0)X.push("unknown bound");for(let J=0;J<Q;J++)if(($&1<<J)!==0)X.push(J<Z?`eye${J}`:`cascade${J-Z}`);for(let J=0;J<vU;J++)if(($&1<<p5+J)!==0)X.push(`light${J}`);return X.length===0?"no view":X.join(" ")})',()=>"(function($,Z,Q){return $.primitives.some(function(X,J){let K=FQ(Z,$,J);if(K===null)return!1;let{material:V,nodeName:Y,primitiveId:U}=K,q=LQ(Z,V.name,Y,U);if(q&&Q.has(q.key))return!1;let z=FJ(Z,V.name,Y,U);return KW({uv:X.uv,color:zW(X,LJ(Z.material?.overrides??null,z))},V,HJ(z))})})",()=>'(function($){let Z=!0,Q=!0;for(let X of $.members){if($.lane.bodyStandsByItsDraw(X.laneId))return"now";if($.lane.bodyStandsUnseen(X.laneId))continue;if($.lane.bodyParkedUnseen(X.laneId))return"now";Z=!1,Q&&=PJ($,X)==="blends"}if(Z)return"ready";return Q?"now":"builds"})']},function(){return[()=>"(function(){let $={models:0,parts:0,members:0,unseen:0,groups:0,bodies:0,byLevel:[],refused:0,prims:0,builds:0,awake:0,bytes:0,largest:0,...j8},Z=xW;if(Z===null)return $;$.models=Z.states.size,$.prims=Z.prims.size,$.builds=Z.builds.length,$.awake=Z.awake.size;for(let Q of Z.prims)for(let X of Q.levels){if(!X.held||X.slice===null)continue;$.bytes+=X.slice.size,$.largest=Math.max($.largest,X.slice.size)}for(let Q of Z.states){$.parts+=Q.members.length;for(let X of Q.members){if(X.clustersRefused===!0)$.refused+=1;let J=X.clusters??null;if(J===null)continue;if($.members+=1,$.bodies+=J.bodies.length,!J.shown){$.unseen+=1;continue}$.groups+=J.at.length;for(let K=0;K<J.at.length;K++)$.byLevel[J.at[K]]=($.byLevel[J.at[K]]??0)+1}}for(let Q=0;Q<$.byLevel.length;Q++)$.byLevel[Q]??=0;return $})",()=>"(function($,Z){let Q=Z.prim,X=Z.group.overrides;return Q.skinIndex===null&&Q.morph===null&&Q.index!==null&&Q.surface.indices!==null&&!$.visual.cullBypassFrustum&&$.visual.clipPlane===null&&X?.underwaterEnabled!==!0&&X?.drawsOver===void 0&&Q.levels.length>0})",()=>"(function($){let Z=$.cut;if(Z===null)return;let Q=$.prim.levels;for(let X=1;X<$.levels.length;X++)$.leaving.add($.levels[X]),Sq($.levels[X]);if(x7($),$.levels=[$.levels[0],...Q.map((X)=>TW(X.error))],$.rows=Q,$.errors=Q.map((X)=>X.error),Z.groups===1)for(let X=0;X<$.levels.length;X++)$.levels[X].starts=Uint32Array.of(0),$.levels[X].counts=Uint32Array.of(X===0?$.prim.indexCount:Q[X-1].indexCount);if($.ladders.length!==Z.groups||$.ladders[0].levels.length!==Math.min(Q.length,N9)){$.ladders=mE($,Z);}for(let[X,J]of $.holders){let K=X.clusters??null;if(K===null||K.clusters!==$)continue;EW(J,X,K)}kq($)})",()=>"(function($,Z){let Q=Math.min($.levels.length-1,N9),X=`${L6($.asset)}:p${$.primitiveIndex}:r${++DW}`;return Array.from({length:Z.groups},(J,K)=>({key:`${X}:g${K}`,levels:Array(Q).fill(null),serial:0}))})",()=>"(function($){for(let Z=0;Z<$.ladders.length;Z++){let Q=$.ladders[Z];for(let X=1;X<=Q.levels.length;X++){let J=$.levels[X];Q.levels[X-1]=J!==void 0&&Cq(J)&&!J.refused&&J.counts[Z]>0?{slice:J.slice,format:J.format,firstIndex:J.starts[Z],indexCount:J.counts[Z]}:null}Q.serial+=1}})",()=>"(function($,Z,Q,X){let J=Z.clusters??null;if(J===null)return;Z.clusters=null;let K=J.clusters;for(let V of J.bodies)$.lane.remove(V,Q,X);if(J.bodies.length===0)$.lane.setLevel(Z.laneId,0);for(let V=0;V<J.at.length;V++)if(J.at[V]>0)jJ(K,J.levels[J.at[V]]);if(K.members-=1,jJ(K,K.levels[0]),K.members===0){for(let V of K.levels)if(V.users<=0)K.leaving.add(V)}x7(K)})",()=>"(function($,Z){let Q=Z.clusters??null;if(Q===null)return;if(vq($,Z))return M9($,Z,!1);if(BJ(Z.group.overrides))return;for(let X=0;X<Q.bodies.length;X++)if(!yq($,Z,Q,X,Q.bodies[X]))return M9($,Z,!0)})",()=>"(function($,Z,Q){let X=Z.clusters??null,J=X?.shown===!0;Hq($,Z,J&&X.bodies.length>0,Z.laneId);if(Q){RW$:{let $$46=Z;{let $=$$46;$.clustersRefused=!0;let Z=B6.get($.prim);if(Z===void 0)break RW$;Z.holders.delete($),x7(Z)}}}if(J)$.lane.sync(Z.laneId,IQ($,Z))})",()=>"(function($,Z,Q){let X=Q.clusters;for(let J=0;J<Q.at.length;J++){if(Q.at[J]===0)continue;jJ(X,Q.levels[Q.at[J]]),$.lane.setLevel(Q.bodies[J]??Z.laneId,0)}Q.at.fill(0),Q.levels=X.levels,Q.bands=Pq,Q.short=0})"]},function(){return[()=>"(function($,Z,Q){let X=Q.clusters;if(Q.levels!==X.levels)EW($,Z,Q);if(Q.ladders=X.ladders,Q.bodies.length===0)return $.lane.sync(Z.laneId,xQ($,Z));for(let J=0;J<Q.bodies.length;J++)if(!yq($,Z,Q,J,Q.bodies[J]))return!1;return!0})",()=>"(function($,Z,Q,X,J,K){let V=Q.clusters??null;if(V===null){if(Q.clustersRefused===!0||Z.unseen===!0||!OE(Z,Q))return;let U=wE($,Z,Q,X);let q=U.cut;if(q===null||q.groups>1&&!AW($,U,U.levels[0])){return CW(U.levels[0],Q,Z);}bE(Z,Q,U,q);return}if(vq(Z,Q))return M9(Z,Q,!1);let Y=V.clusters;if(Y.rows!==Q.prim.levels)vW(Y);if(V.ladders!==Y.ladders&&!hE(Z,Q,V))return M9(Z,Q,!0);if(!V.shown){for(let U of V.bodies){if(Z.lane.bodyStandsByItsDraw(U)||Z.lane.bodyParkedUnseen(U))return M9(Z,Q,!0);if(!Z.lane.bodyStandsUnseen(U))return}for(let U of V.bodies)Z.lane.showInPlace(U);if(V.shown=!0,!Z.lane.sync(Q.laneId,IQ(Z,Q,MW)))M9(Z,Q,!0);return}lE($,Z,Q,V,J,K)})",()=>"(function($,Z,Q,X,J,K){let V=X.clusters,Y=X.at.length,U=J.length/z8;if(j8.judged+=Y,X.bands.length!==Y*U*2)X.bands=new Float64Array(Y*U*2);let q=X.bands,z=0;for(let j=0;j<Y;j++){let G=Math.min(V.errors.length,N9);for(let L=0;L<U;L++){let F=(j*U+L)*2;if(K(X.spheres,j*4,L*z8))q.fill(NaN,F,F+2);else {G=Math.min(G,cE(X,j,J,L*z8,X.at[j],q,F))}}let B;nE:{let Z=V,Q=j,X=G;for(let J=Math.min(X,Z.levels.length-1);J>=0;J--){let K=Z.levels[J];if(K.refused)continue;if(!AW($,Z,K)){B=-1-J;break nE;}if(K.counts[Q]>0){B=J;break nE;}}B=0;}if(B<0){z+=1;CW(V.levels[-1-B],Q,Z);continue}let M=X.at[j];if(B===M)continue;j8.moves+=1;Z.lane.setLevel(X.bodies[j]??Q.laneId,B);if(B>0){OW(V,V.levels[B]);}if(M>0)jJ(V,V.levels[M]);X.at[j]=B}X.short=z})",()=>"(function($,Z,Q,X,J,K,V){if(K[V]=-1/0,K[V+1]=1/0,!(Q[X+3]>0))return 0;let U=_W($.spheres,Z*4,Q,X),q=$.clusters;for(let z=Math.min(q.errors.length,N9);z>=1;z--){let j=J===z?YW:1,G=q.errors[z-1]*$.scale/j;if(G<=U)return K[V]=G,q.rows[z-1].indexCount<q.prim.indexCount?z:0;K[V+1]=Math.min(K[V+1],G)}return 0})",()=>"(function($,Z){for(let Q of Z.sources.keys())if(vQ().scriptedExternalGeometryHeld($.device,Q))return!0;if(Z.slice===null)return!1;for(let Q of $.lanes)if(Q.ladderSliceLeaving(Z.slice))return!0;return!1})",()=>"(function($,Z,Q,X,J){let K=F9.get($);if(K===void 0)return!1;xW=K;oE(K);aE(K,Z);if(K.eyes.length!==Q.length||K.eyes.some((V,Y)=>Y%z8===3&&V>0!==Q[Y]>0)||!V0(J,K.looks)){K.eyes=Float64Array.from(Q),K.looks=[...J],K.cells.clear();for(let V of K.states){K.stirred.add(V);for(let Y of V.members)Y.rest=void 0}}else if(!V0(K.eyes,Q)){K.eyes.set(Q);Q_(K,Q,X);}rE(K,Z,Q,X);tE(K);for(let V of K.awake.keys())if(V.clusters?.shown===!1)return!0;return K.builds.length>0})",()=>"(function($,Z,Q){let X=Q.clusters;if(!X)return;let J=$.eyes.length/z8;let K=Dq(J);let V=[];for(let Y=0;Y<X.at.length;Y++){let[U,q,z]=[0,1,2].map((L)=>Math.floor(X.spheres[Y*4+L]/GQ)),j=`${U},${q},${z}`,G=$.cells.get(j);if(G===void 0){let L=GQ/2;G={key:j,x:U*GQ+L,y:q*GQ+L,z:z*GQ+L,r:0,seats:[],rows:new Float64Array(K*4),lo:new Float64Array(J).fill(-1/0),hi:new Float64Array(J).fill(1/0)},$.cells.set(j,G)}let B=G.seats.length*K;if(B+K>G.rows.length){let L=new Float64Array(G.rows.length*2);L.set(G.rows),G.rows=L}let M={cell:G,at:G.seats.length,member:Q,state:Z};G.seats.push(M),V.push(M),G.rows.set(X.spheres.subarray(Y*4,Y*4+4),B),G.rows.set(X.bands.subarray(Y*J*2,(Y+1)*J*2),B+4),fW(G,B,J)}Q.rest=V})"]},function(){return[()=>"(function($,Z,Q){let X=$.rows;$.r=Math.max($.r,c(X[Z]-$.x,X[Z+1]-$.y,X[Z+2]-$.z)+X[Z+3]);for(let J=0;J<Q;J++){let K=X[Z+4+J*2];if(isNaN(K))continue;$.lo[J]=Math.max($.lo[J],K),$.hi[J]=Math.min($.hi[J],X[Z+5+J*2])}})",()=>"(function($){for(let Z of $.rest??[]){let{cell:Q}=Z,X=Q.seats.pop();if(X===void 0||X===Z)continue;let J=Dq(Q.lo.length);Q.rows.copyWithin(Z.at*J,X.at*J,X.at*J+J),Q.seats[Z.at]=X,X.at=Z.at}$.rest=void 0})",()=>"(function($,Z,Q){let X=Z.length/z8;let J=Dq(X);for(let K of $.cells.values()){j8.cells+=1;let v$31;X_:{let $$48=K,Q$42=X;{let $=$$48,Q=Q$42;for(let X=0;X<Q;X++){let J=X*z8,K=Z[J+3];if(!(K>0)||$.lo[X]===-1/0&&$.hi[X]===1/0)continue;let V=c($.x-Z[J],$.y-Z[J+1],$.z-Z[J+2]),Y=0.000000001*(V+$.r)+0.000000001,U=zJ(Math.max(V-$.r-Y,0),K,Z[J+4],Z[J+5],qJ),q=zJ(V+$.r+Y,K,Z[J+4],Z[J+5],qJ);if(!(U>=$.lo[X]&&q<$.hi[X])){v$31=!1;break X_;}}v$31=!0;}}if(v$31)continue;K.r=0,K.lo.fill(-1/0),K.hi.fill(1/0),j8.tested+=K.seats.length;let V=K.seats.filter((Y,U)=>(fW(K,U*J,X),!mW(K.rows,U*J,K.rows,U*J+4,Z,Q)));for(let Y of V)TJ(Y.member),$.awake.set(Y.member,Y.state)}for(let[K,V]of $.cells)if(V.seats.length===0)$.cells.delete(K)})",()=>'(function($,Z){let Q=`${(WQ($,$.skinned?"model:skinned":"model:rigid")+($.hasMorph?":morph":""))}${Z?"":"|norecv"}`;let X=pW.get(Q);if(X)return X;let{attributes:J,buffers:K}=Wq($,$.skinned),V={key:Q,vertexLayout:{arrayStride:12,attributes:J},vertexBuffers:K,...$.skinned?{skinned:!0}:{nativeModelMatrix:!0,fixedFunction:!0},sortBand2d:!0,sortBandRelief:!0,modelMaterial:!0,...$.hasMorph?{morph:!0}:{},...Z?{}:{receiveShadow:!1}};return pW.set(Q,V),V})',()=>"(function($,Z,Q,X,J){if($.asset!==Z.asset||(X?.script.ref??null)!==$.whole||(Q.shadow?.receiveShadow!==!1)!==$.receives||J.size!==$.parts.size)return!1;if(!j_($.morph,Z)||RI(Q,X,J)!==$.views)return!1;if(J.size>0){if(hq=$.parts,pq=!0,J.forEach(z_),hq=null,!pq)return!1}return dW(Q.model.subScripts,$.authored,!1)&&dW(Q.model.parts,$.hidden,!0)})",()=>'(function($,Z,Q){let X=0;if($!==void 0)for(let J in $){let K=$[J];if(!Object.hasOwn($,J)||Q&&!(typeof K==="object"&&K!==null&&Reflect.get(K,"visible")===!1))continue;if(!Z.has(J))return!1;X++}return X===Z.size})',()=>'(function($,Z,Q,X){let J=$.asset,K=new Map,V=!1;for(let Y=0;Y<J.primitives.length;Y++){let U=J.primitives[Y];if(!H6(U))continue;let q=FQ(Z,J,Y),z=q&&LQ(Z,q.material.name,q.nodeName,q.primitiveId),j=null,G,B;if(z){let H=X.get(z.key);if(!H)continue;j=z.key,G=H,B=F6(Z,z.key)}else if(Q)G=Q.script,B=Q.overrides,V=!0;else continue;let M=NQ(U,$.morphSlotByPrim[Y]!==void 0);let L=`${(WQ(M,M.skinned?"model:skinned":"model:rigid")+(M.hasMorph?":morph":""))}|m${U.materialIndex??"d"}|${j===null?"whole":`p:${j}`}`;let F=K.get(L)??{sig:M,materialIndex:U.materialIndex,partKey:j,script:G,overrides:B,primitives:[]};F.primitives.push(Y),K.set(L,F)}return{byGroup:K,wholeCovers:V}})',()=>"(function($,Z,Q,X,J){let{byGroup:K,wholeCovers:V}=G_($,Q,X,J);let Y=[];let U=(Q.shadow?.receiveShadow!==!1);for(let q of K.values()){Y.push({pending:q,claimId:lq(q.partKey),layout:K_(q.sig,U),surface:DJ($.asset,q.materialIndex,q.sig,q.partKey!==null),viewId:V_(Z,q)});}return{slots:Y,wholeCovers:V}})"]},function(){return[()=>"(function($){$.materialDraws.clear();for(let Z of $.packedStreams.values())Z.lease.release();$.packedStreams.clear();for(let Z of $.inkFieldBinds.values())Z.inkRecord.release();$.inkFieldBinds.clear(),$.inkFieldAsk=null})",()=>"(function($,Z){let Q=new Set($.groups);for(let X of $.held.values())Q.add(X);for(let X of Q){if(!Z?.has(X)){{let $=X;Xz($),yI($.wire),$.preparedLayout?.retained?.release(),$.retained.release()}}}$.groups.length=0,$.byPrimitive.clear(),$.held.clear()})",()=>"(function($,Z){let Q=$.held.get(Z);if(Q===void 0)return;$.held.delete(Z);for(let X of $.held.values())if(X===Q)return;if($.groups.includes(Q))return;{let $=Q;Xz($),yI($.wire),$.preparedLayout?.retained?.release(),$.retained.release()}})",()=>"(function($,Z){T7($);let Q=new Set;if(Z!==null)for(let[X,J]of $.byPrimitive){let K=Z.byPrimitive.get(X);if(K===void 0)continue;let V=$.held.get(X);if(K.retained.record===J.retained.record){if(J.drew)K.drew=!0;if(V!==void 0)Z.held.set(X,V),Q.add(V);continue}let Y=J.drew?J:V;if(Y===void 0)continue;Z.held.set(X,Y),Q.add(Y)}Jz($,Q)})",()=>'(function($,Z,Q,X,J,K,V,Y){let U=Y?N_($,Z,Q,J,K,V):null;if(U==="stage")return"stage";let q=0;for(let z of Q.groups){let j=2*q++,G=z.partKey===null?K?.script:V.get(z.partKey);if(!G)return!1;let B=z.partKey===null?K?.overrides:F6(J,z.partKey),M=z.retained.record,L=M.owned?M.key:U?.[j]??eq(Z.library,G,B,z.layout.key,z.surface.key,void 0,z.view?.entityId,Z.lighting.programKey);if((M.owned||L!==M.key)&&(iq(Z.library,G.ref)!==M.entry.hash||!$.tryPatchParams(M,G,B,z.layout.key,z.surface.key,Z.lighting.programKey??"",U?.[j+1]??void 0,!0))){lI(Z,z,G,L);let F=$.acquire(Z,G,B,z.layout,z.surface,null,z.view?.entityId??null,"own-paint",!1,Qz(X,z.partKey));if(!F)return!1;L_(Z,Q,z,z.retained,F)}z.script=G,z.overrides=B,z.rebuildCounted=null}return!0})',()=>'(function($,Z,Q,X,J,K){let V=Q.planned,Y=0,U=!1;for(let q of Q.groups){let z=q.partKey===null?J?.script:K.get(q.partKey);if(!z)return V;let j=q.partKey===null?J?.overrides:F6(X,q.partKey),G=q.retained.record,B=G.owned?G.key:eq(Z.library,z,j,q.layout.key,q.surface.key,void 0,q.view?.entityId,Z.lighting.programKey);if(B===G.key&&!G.owned){V[Y++]=B,V[Y++]=null;continue}let M=iq(Z.library,z.ref)===G.entry.hash?$.paramsPatch(G,z,j,q.layout.key,q.surface.key,Z.lighting.programKey??""):null;if(V[Y++]=B,V[Y++]=M,M!==null)continue;lI(Z,q,z,B),U=!0}return U?"stage":V})',()=>"(function($,Z,Q,X,J,K,V,Y,U,q){let z=h8.get(Q);if(z?.structuralKey===Y){if(z.moved=!0,z.stage=q,z.arriving.size>0)SJ($,Z,X,z,[...z.arriving]),CJ($,Z,Q,X,z,U,q);else if(!Q.appeared){if(z.asked.size>0)SJ($,Z,X,z,oI(z));CJ($,Z,Q,X,z,U,q)}return}let{slots:j,wholeCovers:G}=EI(Q,X,J,K,V),B={structuralKey:Y,whole:K,claims:V,wholeCovers:G,slots:j,got:new Map,asked:new Map,waking:new Set,arriving:new Set,failedClaims:new Set,built:null,moved:!1,stage:q};if(h8.set(Q,B),SJ($,Z,X,B,j),z!==void 0)sI(z);CJ($,Z,Q,X,B,U,q)})",()=>'(function($,Z,Q,X,J){let K=P7();for(let V of J){let Y=X.asked.get(V);X.asked.delete(V);X.arriving.delete(V);if(!X.failedClaims.has(V.claimId)){{let J$15=V;{let J=J$15;let V=$.acquireOwnOrPending(Z,J.pending.script,J.pending.overrides,J.layout,J.surface,"own-paint",Qz(Q,J.pending.partKey),J.viewId);if(V===null&&gJ(Z,J.pending.script))X.arriving.add(J);else if(V===null){W_(X,J.claimId,K);}else if(TI(V))X.asked.set(J,V.pending);else X.got.set(J,V)}}}if(Y===void 0||X.asked.get(V)===Y)continue;if(X.arriving.has(V))K?.letGo(Y);else K?.spent(Y)}})']},function(){return[()=>"(function($){for(let X of $.got.values())X.release();$.got.clear();let Z=P7();if(Z!==null)for(let X of $.asked.values())Z.letGo(X);$.asked.clear(),$.waking.clear(),$.arriving.clear();let Q=$.built?.state??null;if($.built=null,Q!==null)Jz(Q)})",()=>"(function($,Z,Q,X,J,K,V){let Y=$[Q];if(Y?.binding===X&&Y.resource.buffer===J&&Y.resource.offset===K&&Y.resource.size===V)return $;if($===Z)$=Z.slice();return $[Q]={binding:X,resource:{buffer:J,offset:K,size:V}},$})",()=>"(function($,Z,Q){let X=$.scripted;if(!X?.groups.some((Y)=>Y.overrides?.underwaterEnabled===!0)){SQ($);return}let J=Q?.()??null;if(!J){SQ($);return}let K=wJ.get($);if(K?.lane!==J)SQ($),K={lane:J,ids:new Set},wJ.set($,K);let V=new Set;for(let[Y,U]of X.byPrimitive){if(U.overrides?.underwaterEnabled!==!0||$.materialSlots[Y]?.hidden)continue;let q=$.asset.primitives[Y],z=`${Z.id}#scripted:${Y}`;V.add(z);J.syncMedium(z,{signature:`${$.modelId}:p${Y}`,owner:Z.ownerEntityId,surface:!1,vertexSource:function(){{let Z$66=Y;{let Z=Z$66;let Q=$.scripted,X=Q?.byPrimitive.get(Z),J=$.materialSlots[Z];if(!Q||!X||!J||J.hidden||!$.visible)return null;let K=X.retained.record;if(!MI(K,$.mirrored).pipeline)return null;if(K.assembled.skinnedModel)Q.frames?.read?.($);let V=$.asset.primitives[Z],Y=pJ($,Z,X);if(!Y)return null;let U=V.skinIndex===null?$.rigidIndexByPrim[Z]:0;if(U<0)return null;return vQ().scriptedVertexSourceFromRecord(K,I7(V,X.sig,X.sig.skinned),Y,U)}}},build:IJ((j)=>WJ(q.surface,j)),overrides:{...U.overrides,waveIntensity:0,swellAmplitude:0,surfaceYOffset:0,opacity:0},composeMatrix:(j,G)=>O9(j,G,Z)})}for(let Y of K.ids)if(!V.has(Y))J.syncMedium(Y,null);K.ids=V})",()=>'(function($,Z,Q,X,J=null,K=null,V=!1,Y=null,U=!1,q=null,z=0){let j=$.scripted,G=j?.byPrimitive.get(Z);if(!j||!G)return null;let B;try{let v$33;y_:{let Q$45=j,X$24=G,J$16=Q,K$9=X,V$7=J,Y$3=K,U$3=V,q$1=Y,z$1=U,j$1=q,G$1=z;{let Q=Q$45,X=X$24,J=J$16,K=K$9,V=V$7,Y=Y$3,U=U$3,q=q$1,z=z$1,j=j$1,G=G$1;let B=aW($,Z,X,J,K,V,Y,U,!1,q,z,j,G);if(B===N6){v$33=B;break y_;}let M=Q.held.get(Z);if(M!==void 0&&(B===OJ||B===B8)){let F=aW($,Z,M,J,K,V,Y,U,!0,q,!1,j,G);if(F&&typeof F==="object"){v$33=F;break y_;}}let L=lJ($,Z);if(B===OJ){v$33=L?zz:null;break y_;}if(B&&typeof B==="object")X.drew=!0;if(B!==B8&&B!==qz)Kz(Q,Z);v$33=B===B8&&L?hJ:B;}}B=v$33;if(!z&&B&&typeof B==="object")T8(B.command),T8(B.twin)}catch(M){let L=Eq.threw(`the scripted draw of ${G.retained.record.ref}`,(k_??=$c0I(92)),M);if(L===null)throw M;return G.drawFault=L,null}if(G.drawFault!==null)Eq.healed(G.drawFault),G.drawFault=null;return B})',()=>'(()=>("the fixed shader drew its part in its file\'s paint in this collect, and every other part and body drew; it runs again in the next"))',()=>"(function($,Z,Q,X){let J=Q===null?$.instance.getPipelineHandle(Z):Jx(Q,$,Z);if(J===null)return null;if(J.pipeline!==null)return J.pipeline;if(J.failed)return D7;let K=Q?.drawable(J)??null;if(K!==null)return K;return Q?.promoteToDraw(J,X),null})",()=>"(function($,Z,Q,X){let J=2*$.posedWorldSphere[3],K=Q.camera.isOrthographic,V=$.asset.mapTexelTiles[Z]*($.body!==null&&$.body.scale>0?$.body.scale:1);return JI(V<J?V:J,X,XI(Q),K,mJ(Q.camera.projection,K))})"]},function(){return[()=>"(function($,Z){let Q=$.scripted;if(Q===null)return;for(let[X,J]of Q.byPrimitive){if($.materialSlots[X]?.hidden===!0)continue;for(let V of uq(fq(J.retained.record).shade)?.ids??[])Z(V);let K=Q.held.get(X);if(K!==void 0)for(let V of uq(fq(K.retained.record).shade)?.ids??[])Z(V)}})",()=>"(function($,Z,Q){if(!H6(Q))return null;let X=Q.index?$.materialSlots[Z]?.level??-1:-1,J=X>=0?Q.levels[X]:void 0;if(J?.indexCount===0)return null;let K=u_;return K.index=J?.index??Q.index,K.indexCount=J?.index?J.indexCount:Q.indexCount,K})",()=>"(function($,Z,Q,X,J){let K=Vx($.instance);if(!Z||K.walk!==Z||K.pipeline!==Q||K.share!==X){let V=J?fJ(J).uniform.buffer:void 0;if(!J||!K.lease||!K.group||K.word!==((K.lease).moves()*4294967296+NI())||K.uniforms!==V||J.pipelines.bindGroupRefused(K.group)){K.group=$.instance.getBindGroup(X,Q);K.lease=J?h_($):null;K.word=K.lease?((K.lease).moves()*4294967296+NI()):0;K.uniforms=V;}K.walk=Z,K.pipeline=Q,K.share=X,K.variant=null}return K.group})",()=>"(function($,Z,Q,X){let{record:J,variant:K}=$,V=J.instance,Y=Vx(V);if(Y.walk!==Z||Y.variant!==K||Y.share!==Q)try{let U=V.peekPipeline(K);if(!U||tq(J)!==null)return null;Yx(J,Z,U,Q,X),Y.variant=K,Y.wantsSpan=nq(V.measuredRefs)}catch{return null}return Y.pipeline===$.twin.pipeline&&Y.group===$.twin.bindGroups[2]?Y:null})",()=>"(function($,Z,Q){let{record:X,variant:J}=$,K=this.looks.get(X);if(!K)this.looks.set(X,K=new Map);let V=K.get(J);if(!V)K.set(J,V={draw:$,span:0});if(X.instance.measuredRefs.length){let Y=Gz(Z,Q,!0,!1);if(Y!==void 0)V.span=Math.max(V.span,dJ(Z,$.primIndex,Q,Y))}})",()=>"(function($,Z){for(let[Q,X]of this.assets)if(Q.disposed||Q.levelsRevision!==X)return!1;for(let Q of this.outlines)if(!Mx(Q))return!1;for(let Q of this.looks.values())for(let{draw:X,span:J}of Q.values()){let K=Ux(X,Z,$.viewportShare??null,$);if(!K)return!1;if(K.wantsSpan&&J>0)uJ(X.record.instance.measuredRefs,J)}return!0})",()=>'(function($,Z,Q){let X=Q.frame;if(!X||!$.scripted?.byPrimitive.has(Z))return"fixed";let J=X.viewportShare??null,K=jz($,Z,X.frameBindGroup,X.passBindGroup??UI(X.device,X.pipelines),J,X.pipelines,AQ(X),X);if(K===qz||K===N6||K===zz||K===hJ)return null;if(K===null||K===B8)return"fixed";let V=FI(K.record,J,Q,$.mirrored);if(V==="none")return"fixed";if(V===null)return null;if(K.record.assembled.skinnedModel)$.scripted.frames?.read?.($);let Y=K.twin;return{...Y,pipeline:V.pipeline,bindGroups:[Y.bindGroups[0],Y.bindGroups[1],V.materialGroup,Y.bindGroups[3]]}})',()=>"(function($,Z,Q,X,J,K=null){let V=$.scripted?.held.get(Z),Y=V?.retained.record===Q.record?V:$.scripted?.byPrimitive.get(Z),U=Q.record;if(!Y||U.assembled.inkField===void 0||U.assembled.wireframe===!0)return null;let q=p_(Y,U,J,$.mirrored,K);if(!q)return null;let z=l_($,Z,Y,U,X);if(!z)return null;let j=Q.twin,{vertexBuffers:G,indexBuffer:B}=j,[M,L,F]=j.bindGroups,H=z.drawn;if(H?.pipeline===q&&H.bindGroups[0]===M&&H.bindGroups[1]===L&&H.bindGroups[2]===F&&H.bindGroups[3]===z.bindGroup&&H.vertexBuffers===G&&H.indexBuffer===B&&H.draw===j.draw)return H;return z.drawn={pipeline:q,bindGroups:[M,L,F,z.bindGroup],...G?{vertexBuffers:G}:{},...B?{indexBuffer:B}:{},draw:j.draw}})"]},function(){return[()=>'(function($,Z,Q,X,J){let K=$.inkFieldAsk,V=Q?.generation??-1,Y=J===null?mq(X):bJ(mq(X),Z,yQ(J));if(K!==null&&K.record===Z&&K.variant===Y&&K.generation===V&&K.handle.pipeline!==null)return K.handle.pipeline;let U=Q===null?Z.instance.getPipelineHandle(Y):Q.warmScope(()=>Z.instance.getPipelineHandle(Y),"arriving");return $.inkFieldAsk={record:Z,variant:Y,generation:V,handle:U},U.pipeline})',()=>'(function($,Z,Q,X,J){let K=Z.meta,V=K.kind==="wgslExpr"&&"parts"in K?` ${K.parts.join("$").slice(0,40)}`:"",Y=`${K.kind}${"op"in K?` ${String(K.op)}`:""}${"fn"in K?` ${String(K.fn)}`:""}${"name"in K?` ${String(K.name)}`:""}${V}/${Z.type}`;if(J>=32)return Y;for(let U of Z.inputs){if(!U.type.endsWith("f"))continue;let q;try{q=U.mul(0.000000000001)}catch{continue}if($(q,Q,X).box===null)return Bx($,U,Q,X,J+1)}return Y})',()=>'(function($,Z,Q,X,J){let K=(z)=>z?.meta.kind==="op2"&&z.meta.op==="-"&&z.inputs.length===2&&z.inputs[1]!==void 0&&Q(z.inputs[1]),V=Z;if(Z.meta.kind==="op2"&&Z.meta.op==="*"&&Z.inputs.length===2)V=Z.inputs.find(K);if(V===void 0||!K(V))return null;let Y=V.inputs[0];if(Y===void 0)return null;let U=RJ(Y,[]);if(U.filter(Q).length!==1)return null;let q=[];for(let z of U){if(Q(z))continue;let j=$(z,X,J),G=j.box;if(G===null||G.lo.some((B)=>B!==0)||G.hi.some((B)=>B!==0))return null;q.push(...j.slots)}return q})',()=>'(function($,Z,Q,X,J=!1){let K=$.scripted,V=K?.byPrimitive.get(Z)?.retained.record;if(!V)return E0.noRecord+=1,null;if(Lz(K,V,Q))return null;let Y=$.skinnedModelSlots[Z],U=V.shade.positionNode,q=$.asset.primitives[Z],z=rW.get(q);if(!z)rW.set(q,z=new WeakMap);let j=X,G=null;if(!J){if(G=Y?Y.outlineStretch??=gI(Y.data,W9.model):AI,!G||!Y&&U)return E0.noFrame+=1,null;if(Y?.outlineKey!==void 0&&Y.outlineEye===X)j=Y.outlineKey;else if(j=`${G[0]}/${G[1]}/${X??"-"}`,Y)Y.outlineKey=j,Y.outlineEye=X}let B=z.get(V);if(!B)z.set(V,B=new Map);let M=$z(V),L=B.get(j);if(L==="noSplit")return E0.noSplit+=1,null;if(L!==void 0&&Mx(L,M))return L;if(U===null||U===void 0){let u={record:V,slots:[],values:[],world:0};return B.set(j,u),u}let F=RJ(U,[]),H=(u)=>u.meta.kind==="input"&&u.meta.name==="positionLocal";if(F.filter(H).length!==1||F.length<2)return B.set(j,"noSplit"),E0.noSplit+=1,null;let I=bq.loaded();if(I===null)return bq.prime(),E0.arriving+=1,gQ;let W=G&&OI(G);let P=q.morph?void 0:$.asset.parsed.meshes[q.meshIndex]?.primitives[q.primitiveIndex]?.bounds;let x=X===null?void 0:2**(X/jx);let D=zI(V.shade);let v={positionLo:c_,positionHi:d_,restNormalReach:null,normalLocalIsRest:!1,uniformValue:M,modelStretch:W??void 0,eyeNear:x,geometryLo:P?.min,geometryHi:P?.max};let k=new Set;let S=i_(I,F,H,D,v,k);let C=[...k];let E={record:V,slots:C,values:C.flatMap((u)=>[...M(u)]),world:S===0?0:S*(W?.[1]??1/0)};return B.set(j,E),E})',()=>'(function($,Z,Q){if(eW(Z)!=="front")return E0.twinSide+=1,!0;let X=$?.byPrimitive.get(Q)?.retained.record;if(X===void 0)return!1;let J=eW(X);if(J===null||J==="front")return E0.sourceSide+=1,!0;if(X.shade.positionNode!==null&&X.shade.positionNode!==void 0)return E0.sourceMoves+=1,!0;return!1})',()=>"(function($,Z,Q,X,J,K){let V=0;for(let Y of Z){if(Q(Y))continue;let U=n_($,Y,Q,X,J);if(U!==null){for(let j of U)K.add(j);continue}let q=$(Y,X,J);for(let j of q.slots)K.add(j);let z=q.box;if(z===null){let j=`noBoxAt:${Bx($,Y,X,J,0)}`;return E0[j]=(E0[j]??0)+1,E0.noBox++,1/0}V+=c(Math.max(-z.lo[0],z.hi[0]),Math.max(-z.lo[1],z.hi[1]),Math.max(-z.lo[2],z.hi[2]))}return V})"]},function(){return[()=>"(function($,Z,Q){let X=this.levels[Z[4]];for(let J=Z[0];J<=Z[2];J+=1){for(let K=Z[1];K<=Z[3];K+=1){if(Q!==void 0&&J>=Q[0]&&J<=Q[2]&&K>=Q[1]&&K<=Q[3])continue;let V=((J+S7)*nJ+(K+S7));let Y=X.get(V);if(Y===void 0)continue;if(Y.delete($),Y.size!==0)continue;X.delete(V),this.spare.push(Y)}}})",()=>'(function($,Z,Q,X){let J=vx(Z),K=$.pose,V=Z.nodes;if(Q===null){if(X)for(let U of J.nodes)Px(V[U].rotation,[1,0,0],0,K,U*s$+xz);return!1}let Y=!1;for(let U of["left","right"]){let q=Q[U],z=J[U];if(q===null||z===null)continue;for(let j=0;j<z.length;j+=1){let G=Math.min(1,Math.max(0,(q[j]??0)/Tx));for(let B of z[j])Px(V[B.node].rotation,B.axis,G*B.closed,K,B.node*s$+xz),Y=!0}}return Y})',()=>"(function($,Z,Q){return{bone:$,parent:$.parent,child:Z,particle:{value:[0,0,0],velocity:[0,0,0]},prevTip:[0,0,0],bodyTip:[0,0,0],swingAbove:null,swingTurn:new J0,swingShift:new O,swingOffset:[0,0,0],row:Q,initialized:!1,base:new Float32Array([0,0,0,1]),written:new Float32Array([0,0,0,1]),hasWritten:!1,followers:[],restDepth:null,reach:1}})",()=>"(function($,Z){let Q=new Map;if($.forEachJoint(function(U){let q=fQ(U.name,Z);if(q>=0)Q.set(U,q)}),Q.size===0)return[];let X=[];let J=function(U){let q=[],z=[],j=U;while(j){let G=j.children.filter((B)=>Q.has(B));q.push(xu(j,G[0]??Iu(j,$),Q.get(j)??0));if(G.length>1)z=G;j=G.length===1?G[0]:null}X.push({bones:q,reach:({pivot:new Float64Array(3),placed:!1,last:-1,seen:-1,kept:new Int32Array(1),keptOf:null,keptRadius:0})});for(let G of z)J(G)};for(let U of Q.keys()){let q=U.parent;if(q&&Q.has(q))continue;J(U)}let K=new Set(X.flatMap((U)=>U.bones.map((q)=>q.bone)));let V=function(U,q){for(let z of U.children){if(K.has(z))continue;q.push(z);V(z,q)}};for(let U of X){for(let q of U.bones){V(q.bone,q.followers);}}let Y=new Map;for(let U of X)for(let q of U.bones)Y.set(q.bone,q);for(let U of X)for(let q of U.bones){let z=q.bone.parent;while(z&&!K.has(z))z=z.parent;q.swingAbove=z?Y.get(z)??null:null}return X})",()=>"(function($,Z,Q,X){return Z.map(function(J){let K=Oz(J),V=Q.get(K);if(V)return V;let Y=J.entity===void 0;let U={spec:J,rig:Y?$:null,bone:Y?ix($,J.bone):null,center:new O,tail:new O,capsule:J.tail!==void 0,radius:J.radius,mid:new O,reach:0};return Q.set(K,U),X.push(U),U})})",()=>"(function($){let Z=$.particle;Z.value[0]=o.x,Z.value[1]=o.y,Z.value[2]=o.z,Z.velocity[0]=0,Z.velocity[1]=0,Z.velocity[2]=0,$.prevTip[0]=o.x,$.prevTip[1]=o.y,$.prevTip[2]=o.z,$.swingOffset[0]=A0.x,$.swingOffset[1]=A0.y,$.swingOffset[2]=A0.z,$.bodyTip[0]=o.x-A0.x,$.bodyTip[1]=o.y-A0.y,$.bodyTip[2]=o.z-A0.z,$.initialized=!0})",()=>"(function($,Z){if($.child)o.copy($.child.position).applyMatrix4($.bone.matrixWorld);else{if($.parent)Dz.setFromMatrixPosition($.parent.matrixWorld);else Dz.set(p.x,p.y+1,p.z);D0.subVectors(p,Dz);let X=D0.length();if(X*X<z0)X=kx*Z,D0.set(0,-1,0);else D0.multiplyScalar(1/X);o.copy(p).addScaledVector(D0,X)}let Q=o.distanceTo(p);return Q*Q<z0?kx*Z:Q})",()=>"(function($,Z,Q,X){D6.subVectors(Z,$);let J=D6.lengthSq();if(J<z0)return X.copy($),0;let K=Math.min(1,Math.max(0,((Q.x-$.x)*D6.x+(Q.y-$.y)*D6.y+(Q.z-$.z)*D6.z)/J));return X.copy($).addScaledVector(D6,K),K})"]},function(){return[()=>"(function($,Z,Q){if(L0.copy(Q).normalize(),H0.copy(X0).addScaledVector(L0,-X0.dot(L0)),H0.lengthSq()<z0)return!1;H0.normalize(),uQ.crossVectors(L0,H0),t.subVectors(F$,p);let X=2*$*t.dot(H0),J=2*$*t.dot(uQ),K=Z*Z-t.lengthSq()-$*$,V=E8(X,J);if(V<0.000000000001||Math.abs(K)>V)return!1;let Y=Math.atan2(J,X);let v$34;vu:{let $=K/V;if($<-1){v$34=-1;break vu;}v$34=$>1?1:$;}let U=Math.acos(v$34);let q=Rx(Y+U);let z=Rx(Y-U);let j=Math.abs(z)<Math.abs(q)?z:q;return X0.copy(H0).multiplyScalar(Math.cos(j)).addScaledVector(uQ,Math.sin(j)),N0.copy(F$).addScaledVector(X0,$),!0})",()=>"(function($,Z,Q){t.subVectors(N0,p);let X=t.length();if(X<=0.000001)return;if(H0.copy(p).addScaledVector(t,Z/X),L0.subVectors(H0,F$),L0.lengthSq()>=$*$){N0.copy(H0);return}if(Q&&Cu($,Z,Q))return;t.subVectors(N0,p),L0.subVectors(F$,p);let J=L0.lengthSq();if(J<z0)return;let K=Math.sqrt(J),V=(J+Z*Z-$*$)/(2*K),Y=Z*Z-V*V;if(Y<=0)return;if(L0.multiplyScalar(1/K),H0.copy(t).addScaledVector(L0,-t.dot(L0)),H0.lengthSq()<z0)H0.copy(D0).addScaledVector(L0,-D0.dot(L0));if(H0.lengthSq()<z0)wz(L0,H0);else H0.normalize();N0.copy(p).addScaledVector(L0,V).addScaledVector(H0,Math.sqrt(Y)),X0.subVectors(N0,F$).multiplyScalar(1/$)})",()=>"(function($,Z){if(!$)return y7(mQ,0,$,Z);let Q=mQ,X=$[0]/(c(Q[0],Q[1],Q[2])||1),J=$[1]/(c(Q[4],Q[5],Q[6])||1),K=$[2]/(c(Q[8],Q[9],Q[10])||1);return Z.set(Q[0]*X+Q[4]*J+Q[8]*K+Q[12],Q[1]*X+Q[5]*J+Q[9]*K+Q[13],Q[2]*X+Q[6]*J+Q[10]*K+Q[14])})",()=>"(function($,Z,Q){let X=Z.bone;if(!X||Z.rig!==null&&Z.rig!==Q)return _x;let J=Q;let K;yu:{let $=Q;let Z=Ex.get($);if(Z){K=Z;break yu;}K=(Z=f0($.nodes,$.bindCorrection),Ex.set($,Z),Z);}let V;Ou:{let Z$69=Q,Q$48=K;{let Z=Z$69,Q=Q$48;if($.child){V=y7(Q,$.child.index,void 0,p8);break Ou;}y7(Q,$.bone.index,void 0,p8);let X=$.parent;if(X&&X!==Z.rootAnchor)y7(Q,X.index,void 0,F8);else if(X)F8.set(0,0,0);else F8.set(p8.x,p8.y+1,p8.z);V=p8.set(2*p8.x-F8.x,2*p8.y-F8.y,2*p8.z-F8.z);}}let Y=y7(K,$.bone.index,void 0,Au);let U=K;{let $$53=J,Z$70=!0,Q$49=C7;{let $=$$53,Z=Z$70,Q=Q$49;let{rootMatrix:X,bindCorrection:J}=$;if(J===null)for(let K=0;K<16;K++)Q[K]=X.a[X.o+K];else k0(J,0,ux,0),f(X.a,X.o,ux,0,Q,0);if(Z)Q[12]=0,Q[13]=0,Q[14]=0;(Q);}}mx(C7,V);mx(C7,Y);let q=J.bindCorrection;if(X!==J.rootAnchor)f(C7,0,U,X.index*16,mQ,0);else if(q!==null)f(C7,0,q,0,mQ,0);else mQ.set(C7);let z=Z.spec.radius;if(!(z>0))return _x;let j=$D(Q),G=j;if(fx(Z.spec.offset,RQ),aJ.subVectors(V,Y).multiplyScalar($.reach).add(Y),Z.spec.tail){fx(Z.spec.tail,Sz),ex(RQ,Sz,V,F8);let B=V.distanceTo(F8)/z;return ZD(Y,aJ,RQ,Sz,F8),{tip:B,segment:bx(Y,aJ,F8)/z,chainScale:j,shapeScale:G}}return{tip:V.distanceTo(RQ)/z,segment:bx(Y,aJ,RQ)/z,chainScale:j,shapeScale:G}})",()=>"(function($,Z,Q,X,J){let K=Z.x-$.x,V=Z.y-$.y,Y=Z.z-$.z,U=X.x-Q.x,q=X.y-Q.y,z=X.z-Q.z,j=$.x-Q.x,G=$.y-Q.y,B=$.z-Q.z,M=K*K+V*V+Y*Y,L=U*U+q*q+z*z,F=U*j+q*G+z*B,H;if(L<z0)H=0;else if(M<z0)H=Math.min(1,Math.max(0,F/L));else{let N=K*j+V*G+Y*B,I=K*U+V*q+Y*z,W=M*L-I*I,P=W>z0*M*L?Math.min(1,Math.max(0,(I*F-N*L)/W)):0;if(H=(I*P+F)/L,H<0)H=0,P=Math.min(1,Math.max(0,-N/M));else if(H>1)H=1,P=Math.min(1,Math.max(0,(I-N)/M))}J.set(Q.x+U*H,Q.y+q*H,Q.z+z*H)})"]},function(){return[()=>"(function($,Z,Q,X,J){let K=$.particle,V=!1;for(let Y=0;Y<Mu;Y++){t.subVectors(N0,p);let U=t.length();if(U<=0.000001)return V;if(t.multiplyScalar(1/U),uQ.copy(p).addScaledVector(t,J),Z.capsule)ZD(p,uQ,Z.center,Z.tail,F$);else F$.copy(Z.center);L0.subVectors(F$,p);let q=Math.min(J,Math.max(0,L0.dot(t)));H0.copy(p).addScaledVector(t,q).addScaledVector(F$,-1);let z=Q-_Q;if(H0.lengthSq()>=z*z)return V;let j=L0.lengthSq(),G=Math.max(0,Q-_Q);if(j<=G*G)return V;let B=Math.sqrt(j);L0.multiplyScalar(1/B);let M=t.dot(L0),L=Math.max(0,j-Q*Q),F=J*J>=L?Math.sqrt(L)/B:(J*J+L)/(2*J*B);if(M<=F)return V;if(H0.copy(t).addScaledVector(L0,-M),H0.lengthSq()<z0)H0.copy(D0).addScaledVector(L0,-D0.dot(L0));if(H0.lengthSq()<z0)wz(L0,H0);else H0.normalize();let H=Math.sqrt(Math.max(0,1-F*F));X0.copy(N0),N0.copy(p).addScaledVector(L0,F*X).addScaledVector(H0,H*X),X0.subVectors(N0,X0);let N=X0.lengthSq();if(N>z0){X0.multiplyScalar(1/Math.sqrt(N));let I=K.velocity[0]*X0.x+K.velocity[1]*X0.y+K.velocity[2]*X0.z;if(I<0)K.velocity[0]-=X0.x*I,K.velocity[1]-=X0.y*I,K.velocity[2]-=X0.z*I}V=!0}return V})",()=>"(function($){let Z=O0[0],Q=O0[1],X=O0[2],J=O0[3],K=O0[4],V=O0[5],Y=$.center,U=J*J+K*K+V*V,q=Z-Y.x,z=Q-Y.y,j=X-Y.z,G=J*q+K*z+V*j,B=0,M=0,L=0,F=0,H=0;if($.capsule){let P=$.tail;L=P.x-Y.x,F=P.y-Y.y,H=P.z-Y.z;let x=L*L+F*F+H*H,D=L*q+F*z+H*j;if(x<z0)B=U<z0?0:Math.min(1,Math.max(0,-G/U));else if(U<z0)M=Math.min(1,Math.max(0,D/x));else{let v=J*L+K*F+V*H,k=U*x-v*v;if(B=k>z0*U*x?Math.min(1,Math.max(0,(v*D-G*x)/k)):0,M=(v*B+D)/x,M<0)M=0,B=Math.min(1,Math.max(0,-G/U));else if(M>1)M=1,B=Math.min(1,Math.max(0,(v-G)/U))}}else if(U>=z0)B=Math.min(1,Math.max(0,-G/U));let N=q+J*B-L*M,I=z+K*B-F*M,W=j+V*B-H*M;return N*N+I*I+W*W})",()=>"(function($,Z){let Q=N0.x-p.x,X=N0.y-p.y,J=N0.z-p.z,K=Math.sqrt(Q*Q+X*X+J*J),V=K>0.000001?Math.max(K,$*Z)/K:0;O0[0]=p.x,O0[1]=p.y,O0[2]=p.z,O0[3]=Q*V,O0[4]=X*V,O0[5]=J*V,A$[0]=O0[0]+0.5*O0[3],A$[1]=O0[1]+0.5*O0[4],A$[2]=O0[2]+0.5*O0[5];let Y=0.5*K*V;A$[3]=Y;let U=$K;if(U===null)return!1;let q=QD+2*Y;return U.seen=Math.max(U.seen,q),q<=U.last})",()=>"(function($,Z,Q,X,J,K,V){let Y=$.reach,U=V??bu,q=Z.length,z=!1,j=hx(X,Y)&&V!==null,G=A$[0],B=A$[1],M=A$[2],L=A$[3];for(let F=j?U[0]:0;F<q;F=j?U[F+1]:F+1){let H=Z[F];if(!H.bone)continue;let N=H.radius+Q,I=H.capsule?H.mid:H.center,W=L+(H.capsule?H.reach:0)+N+kz,P=G-I.x,x=B-I.y,D=M-I.z;if(P*P+x*x+D*D>W*W)continue;let v=N+kz;let k=fu(H);if(k>v*v)continue;let S;{let Z$71=H,Q$50=J;{let Z=Z$71,Q=Q$50;$.restDepth??=new WeakMap;let X=$.restDepth,J=X.get(Z);if(J===void 0||Eu(J.chainScale,Q)){J=Ru($,Z,Q);X.set(Z,J);}S=J;}}let C;mu:{let Z=H,Q=Math.min(N,Math.max(0,S.tip*H.radius-_Q));let J=!1;if(Z.capsule){let U=ex(Z.center,Z.tail,N0,F$);J=U>0&&U<1}else F$.copy(Z.center);X0.subVectors(N0,F$);let K=X0.lengthSq();if(K>=Q*Q){C=!1;break mu;}if(K<z0){if(X0.subVectors(N0,p),X0.lengthSq()<z0)X0.set(0,1,0);X0.normalize()}else X0.multiplyScalar(1/Math.sqrt(K));N0.copy(F$).addScaledVector(X0,Q);ku(Q,X,J?D6:null);let V=$.particle,Y=V.velocity[0]*X0.x+V.velocity[1]*X0.y+V.velocity[2]*X0.z;if(Y<0)V.velocity[0]-=X0.x*Y,V.velocity[1]-=X0.y*Y,V.velocity[2]-=X0.z*Y;C=!0;}let E=Math.min(N,Math.max(0,S.segment*H.radius-_Q));let u=E-_Q;let y=K&&(C||k<u*u)&&uu($,H,E,X,X*Y);if(!C&&!y)continue;z=!0,j=hx(X,Y)&&V!==null,G=A$[0],B=A$[1],M=A$[2],L=A$[3]}return z})"]},function(){return[()=>"(function($,Z,Q,X,J){let v$35;hu:{let $$54=Z,Z$72=Q;{let $=$$54,Z=Z$72;let Q=$K;if(Q===null){v$35=null;break hu;}let X=Q.pivot;if(!Q.placed)X[0]=p.x,X[1]=p.y,X[2]=p.z,Q.placed=!0;let J=p.x-X[0],K=p.y-X[1],V=p.z-X[2];if(QD=Math.sqrt(J*J+K*K+V*V),Q.last<0){v$35=null;break hu;}if(Q.keptOf===null){{let $$104=Q,Z$119=$,Q$78=Z;{let $=$$104,Z=Z$119,Q=Q$78;let X=Z.length;if($.kept.length<X+1)$.kept=new Int32Array(X+1);let{kept:J,pivot:K}=$,V=X;J[X]=X;for(let Y=X-1;Y>=0;Y--){let U=Z[Y],q=U.capsule?U.mid:U.center,z=$.last+(U.capsule?U.reach:0)+U.radius+Q+kz+Hu,j=K[0]-q.x,G=K[1]-q.y,B=K[2]-q.z;if(U.bone&&!(j*j+G*G+B*B>z*z))V=Y;J[Y]=V}$.keptOf=Z,$.keptRadius=Q}}}v$35=Q.keptOf===$&&Z<=Q.keptRadius?Q.kept:null;}}let K=v$35;let V=!1;for(let Y=0;Y<yx;Y++){if(!px($,Z,Q,X,J,!0,K))return V;V=!0}for(let Y=0;Y<yx;Y++)if(!px($,Z,Q,X,J,!1,K))break;return V})",()=>"(function($){let Z=$.bone;if(eJ.setFromUnitVectors(D0,t),Z.getWorldQuaternion(Ax),gx.multiplyQuaternions(eJ,Ax),$.parent)$.parent.getWorldQuaternion(Pz);else Pz.identity();Z.quaternion.copy(Pz).invert().multiply(gx),$.written[0]=Z.quaternion.x,$.written[1]=Z.quaternion.y,$.written[2]=Z.quaternion.z,$.written[3]=Z.quaternion.w,$.hasWritten=!0,Z.refreshMatrixWorld()})",()=>"(function($,Z){let Q=t.dot(D0),X=$*j$/180,J=Math.cos(X);if(Q>=J)return;if(D9.copy(t).addScaledVector(D0,-Q),D9.lengthSq()<z0)wz(D0,D9);else D9.normalize();let K=Math.sin(X);t.copy(D0).multiplyScalar(J).addScaledVector(D9,K);let V=D9.x*J-D0.x*K,Y=D9.y*J-D0.y*K,U=D9.z*J-D0.z*K,q=(Z[0]-l8[0])*V+(Z[1]-l8[1])*Y+(Z[2]-l8[2])*U;if(q<=0)return;Z[0]-=V*q,Z[1]-=Y*q,Z[2]-=U*q})",()=>"(function($,Z,Q,X){for(let J of $.chains)for(let K of J.bones){if(!K.initialized)continue;K.particle.value[0]-=Z,K.particle.value[1]-=Q,K.particle.value[2]-=X,K.prevTip[0]-=Z,K.prevTip[1]-=Q,K.prevTip[2]-=X,K.bodyTip[0]-=Z,K.bodyTip[1]-=Q,K.bodyTip[2]-=X}if($.frame.valid)$.frame.position.x-=Z,$.frame.position.y-=Q,$.frame.position.z-=X})",()=>"(function($,Z,Q,X=!1){Z.rootAnchor.matrixWorld.decompose(k7,P6,yz);let J=$.frame;if(J.valid&&!nu(J)){OQ.subVectors(k7,J.position),Tz.copy(J.quaternion).invert().premultiply(P6);let K=gq*Math.max(Q,Oq),V=!X&&OQ.lengthSq()>K*K,Y=NaN;for(let U of $.chains)for(let q of U.bones){if(V)q.initialized=!1;if(!q.initialized)continue;Cz(q.bodyTip,J.position,Tz,OQ,1);let z=X?1:1-$.rows[q.row].amount;if(z<=0)continue;if(z!==Y)wQ.identity().slerp(Tz,z),Y=z;Cz(q.particle.value,J.position,wQ,OQ,z),Cz(q.prevTip,J.position,wQ,OQ,z);let j=q.particle.velocity;y$.set(j[0],j[1],j[2]).applyQuaternion(wQ),j[0]=y$.x,j[1]=y$.y,j[2]=y$.z;let G=q.swingOffset;y$.set(G[0],G[1],G[2]).applyQuaternion(wQ),G[0]=y$.x,G[1]=y$.y,G[2]=y$.z}}J.position.copy(k7),J.quaternion.copy(P6),J.valid=!0})",()=>"(function($,Z){if($.boneCount===0)return;let Q=Math.abs(Z.rootAnchor.getWorldScale(nx).y)||1;for(let X of $.chains)for(let J of X.bones){if(!J.initialized)continue;if(XD(J),rx(J,Q),D0.subVectors(o,p),t.set(J.particle.value[0]-p.x,J.particle.value[1]-p.y,J.particle.value[2]-p.z),D0.lengthSq()<z0||t.lengthSq()<z0)continue;D0.normalize(),t.normalize(),JD(J);for(let K of J.followers)K.refreshMatrixWorld()}Z.settleWorldMatrices()})"]},function(){return[()=>"(function($,Z){Az=0,gz=0;let Q=$.air;if(Q===null||!$.blown||!Q(M8))return;{let v$64;nd:{let X=M8[2];if(!(X>0))break nd;let J=$.frame.position.x+M8[5],K=$.frame.position.z+M8[6];if(Number.isNaN($.airPhase))$.airPhase=lx(J,K);$.airClock+=Z,dx(vz,J,K,M8[3],M8[4],M8[0],M8[1],$.airClock,$.airPhase),Az=vz[0]*X,gz=vz[1]*X\nv$64=aa;}if((ba=v$64)!==aa)return ba}})",()=>"(function($,Z,Q,X){let J={points:new Map,inverseBind:new Map,skinOf:new Map,slotOf:new Map,heightMesh:0},K=$.meshes??[],V=1/0,Y=-1/0;for(let U=0;U<$.nodes.length;U++){let q=$.nodes[U];if(q.meshIndex===null||q.skinIndex===null||!Z.has(q.skinIndex)||X.has(U))continue;let z=$.skins[q.skinIndex],j=K[q.meshIndex];if(!z||!j)continue;for(let G of j.primitives){if(!G.joints||!G.weights)continue;V=Math.min(V,G.bounds.min[1]);Y=Math.max(Y,G.bounds.max[1]);Jm:{let $$55=J,Z$73=z,Q$52=q.skinIndex,X$26=G,J$19=Q;{let $=$$55,Z=Z$73,Q=Q$52,X=X$26,J=J$19;let{joints:K,weights:V,position:Y}=X;if(!K||!V)break Jm;let U=Y.length/3;for(let q=0;q<U;q++){let z=ID(V,q);if(z<0)continue;let j=K[q*4+z],G=Z.joints[j];if(G===void 0||J.has(G))continue;let B=$.inverseBind.get(G);if(!B)B=new B0().setFromArray(Z.inverseBindMatrices,j*16),$.inverseBind.set(G,B),$.skinOf.set(G,Q),$.slotOf.set(G,j);h0.set(Y[q*3],Y[q*3+1],Y[q*3+2]).applyMatrix4(B),EJ($.points,G).push(h0.x,h0.y,h0.z)}}}}}return J.heightMesh=Y>V?Y-V:0,J})",()=>"(function($,Z,Q,X,J,K){let V=(z)=>J.get(z)??WD(Z,z),Y=-1,U=function(z){for(let j of z){if(K.has(j))continue;let G=V(j),B=G?_z(X,G):null;if(B)Y=j;let M=B??U($.nodes[j].children);if(M)return M}return null},q=U($.nodes[Q].children);if(q)return{tail:q,from:Y};return od($,Q,V,X);})",()=>"(function($,Z){let Q=0,X=$.length-1;for(let J=2*Math.ceil(Math.log2($.length+1));Q<X;J--){if(J===0)return $.subarray(Q,X+1).sort(),$[Z];let K=$[Q],V=$[Q+X>>>1],Y=$[X],U=Math.max(Math.min(K,V),Math.min(Math.max(K,V),Y)),q=Q,z=X;for(let j=Q;j<=z;){let G=$[j];if(G<U)$[j++]=$[q],$[q++]=G;else if(G>U)$[j]=$[z],$[z--]=G;else j++}if(Z<q)X=q-1;else if(Z>z)Q=z+1;else return U}return $[Z]})",()=>"(function($,Z,Q,X,J,K,V){let Y=X.get(Z);if(!Y)return null;let U;{let $=Y;let{a:Z,o:Q}=$;U=c(Z[Q],Z[Q+1],Z[Q+2])||1;}let q=Vm($,$.skins[Q],Z,Y,X,J);let z=V(q);if(z===void 0)return;if(z<au*K*U)return null;let{tail:j}=q,G=j?c(j[0],j[1],j[2]):0;return{nodeIndex:Z,tail:j,radius:z,weight:z*(z+G)/(U*U)}})",()=>"(function($,Z,Q,X){let J=[];let {points:K,inverseBind:V,skinOf:Y,heightMesh:U}=Km($,Z,Q,X);if(U<=0)return J;for(let[q,z]of K){let j=Y.get(q);if(z.length/3<ND||j===void 0)continue;let G=xD($,q,j,V,Q,U,function({tail:B}){{let $=z,Z=B;let Q=$.length/3;if(Ez.length<Q)Ez=new Float32Array(Q);let X=Ez.subarray(0,Q);for(let J=0;J<Q;J++){X[J]=Qm($[J*3],$[J*3+1],$[J*3+2],Z);}return Um(X,Math.min(Q-1,Math.floor(eu*(Q-1))))}});if(G)J.push(G)}return J.sort((q,z)=>z.weight-q.weight)})",()=>'(function($,Z,Q,X){let J=[...Z].sort((U,q)=>U-q).join(","),K=HD($)?.bodyClouds?.find((U)=>U.skins.join(",")===J);if(!K)return null;for(let U of X){let q=$.nodes[U];if(q.meshIndex!==null&&q.skinIndex!==null&&Z.has(q.skinIndex))return null}let V=new Map;for(let U of K.joints)if(!Q.has(U.node))V.set(U.node,new B0().setFromArray($.skins[U.skin].inverseBindMatrices,U.slot*16));let Y=[];if(K.heightMesh<=0)return Y;for(let U of K.joints){if(U.count<ND||Q.has(U.node))continue;let q=xD($,U.node,U.skin,V,Q,K.heightMesh,({from:z})=>U.radii.get(z));if(q===void 0)return null;if(q)Y.push(q)}return Y.sort((U,q)=>q.weight-U.weight)})']},function(){return[()=>'(function($,Z,Q,X=Gm){let J=[];let v$36;qm:{let J=Xm($,Q);let K=`${[...Z].sort((q,z)=>q-z).join(",")}|${[...J].sort((q,z)=>q-z).join(",")}|${[...X].sort((q,z)=>q-z).join(",")}`;let V=FD.get($);let Y=V?.get(K);if(Y){v$36=Y;break qm;}let U=J.size===0?[]:jm($,J,Z,X)??zm($,J,Z,X);if(!V)V=new Map,FD.set($,V);v$36=(V.set(K,U),U);}for(let K of v$36){if(J.length>=ru)break;if(!(K.nodeIndex>=0&&K.nodeIndex<$.nodes.length))continue;J.push({node:K.nodeIndex,tail:K.tail,radius:K.radius})}return J})',()=>'(function($,Z){let Q=[...Z].sort((V,Y)=>V-Y).join(","),X=LD.get($),J=X?.get(Q);if(J)return J;let v$38;{let Z$75=new Set(Z);{let Z=Z$75;let Q=new Map,X=new Map,J=$.meshes??[];for(let K of $.nodes){if(K.meshIndex===null||K.skinIndex===null)continue;let V=$.skins[K.skinIndex],Y=J[K.meshIndex];if(!V||!Y)continue;for(let U of Y.primitives){Hm($,K.skinIndex,V,U,Z,Q,X)}}v$38=X;}}let v$71;{let $=v$38;let Z=new Map;for(let[Q,X]of $){X.sort((K,V)=>K-V);let J=X[Math.min(X.length-1,Math.floor(Bm*(X.length-1)))];if(J>1)Z.set(Q,J)}v$71=Z;}let K=v$71;if(!X)X=new Map,LD.set($,X);return X.set(Q,K),K})',()=>"(function($,Z,Q,X,J,K,V){let{joints:Y,weights:U,position:q}=X;if(!Y||!U)return;let z=q.length/3;for(let j=0;j<z;j++){let G=ID(U,j);if(G<0)continue;let B=Y[j*4+G],M=Q.joints[B];if(M===void 0||!J.has(M))continue;let L=`${Z}:${B}`,F=K.get(L);if(!F){let v$37;Fm:{let Z$74=Q,Q$53=B,X$27=M;{let Z=Z$74,Q=Q$53,X=X$27;let J=new B0().setFromArray(Z.inverseBindMatrices,Q*16);let v$70;Mm:{let Q$79=X,X$41=J;{let Q=Q$79,X=X$41;let J=$.nodes[Q],K=J.parent>=0?WD(Z,J.parent):null;if(K){v$70=_z(X,K);break Mm;}let{translation:V,rotation:Y,scale:U}=J;h0.set(-V.x,-V.y,-V.z).applyQuaternion($m.set(Y.x,Y.y,Y.z,Y.w).invert());let q=[h0.x/(U.x||1),h0.y/(U.y||1),h0.z/(U.z||1)];v$70=q[0]*q[0]+q[1]*q[1]+q[2]*q[2]<0.00000001?null:q;}}let K=v$70;if(!K){v$37={axis:[0,0,0],restLen:0,inverseBind:J};break Fm;}let V=c(K[0],K[1],K[2]);v$37={axis:[-K[0]/V,-K[1]/V,-K[2]/V],restLen:V,inverseBind:J};}}F=v$37;K.set(L,F);}if(!(F.restLen>0))continue;h0.set(q[j*3],q[j*3+1],q[j*3+2]).applyMatrix4(F.inverseBind);let H=(h0.x*F.axis[0]+h0.y*F.axis[1]+h0.z*F.axis[2])/F.restLen,N=V.get(M);if(N)N.push(H);else V.set(M,[H])}})",()=>"(function($){let Z=$.nodes,Q=Z.map(()=>[]);Z.forEach(function(V,Y){if(V.parent>=0&&V.parent<Z.length)Q[V.parent].push(Y)});let X=new Uint8Array(Z.length);for(let V of $.skins)if(V.part!==!0){for(let Y of V.joints)if(Y>=0&&Y<Z.length)X[Y]=1}let J=[];let K=function(V){if(X[V]===1)J.push(V);for(let Y of Q[V]){K(Y)}};Z.forEach(function(V,Y){if(!(V.parent>=0&&V.parent<Z.length)){K(Y)}});return {kids:Q,joint:X,order:J}})",()=>"(function($,Z){let Q=A,X=Z.boneOf,J=!1;if($.entity!==void 0){let Y=Z.bodyOf($.entity);if(Y===null)J=!0;else Q=Y.row,X=Y.boneOf}let K=A;if(!J&&$.bone!==void 0){let Y=X($.bone);if(Y<0)J=!0;else K=Y}let V=($.tail?m5:0)|(J?v4:0);return{owner:Q,node:K,flags:V,radius:$.radius,offset:$.offset??[0,0,0],tail:$.tail??[0,0,0]}})",()=>'(()=>({wearer:null,entity:"",bone:-1,homes:null,hangBy:null,noBoneRest:null}))',()=>"(function($,Z,Q,X,J,K){let V=$.springs,Y=V?.table??null;if(V===null||Y===null)return;let U=q0($);if(U===null||U.role===Z0||U.row<0||K){if(K&&V.stoodOn!==null)L7($,t0);if(V.stoodOn!==null)V.fresh=!0;V.stoodOn=null;return}let q=U.table;let z=V.scene===null?A:um(q,V.scene);let j=Q!==null&&Q.wornOn(Z,(bQ??=$c0I(144)))&&(bQ??=$c0I(144)).wearer!==null&&(bQ??=$c0I(144)).wearer!==$&&F7((bQ??=$c0I(144)).wearer)!==A?(bQ??=$c0I(144)):null;Em($,V,Q,z,j,hz);if(U!==V.stoodOn||V.fresh||!V0(V.reads,hz)){_m($,V,U,Q,z,j);}let G=V.scene;let B=j?.entity??null;let M=J?-1:Om(Rm(V,B??Z,bD,fD(),mD(),q.frameSeconds),q.frameSeconds);if(!Object.is(M,V.gap))V.gap=M,nD=M,n1($,t0,e.gap,e.gap+1,Am);let L=G===null?NaN:wm(G,Z,B);if(!Object.is(L,V.cuts))V.cuts=L,pz=L,n1($,t0,e.cuts,e.cuts+1,gm);if(X)n1($,t0,e.placed,e.placed+1,wD)})"]},function(){return[()=>"(function($,Z,Q,X,J,K){let V=Q(Z),Y=$.bodyTickOf===Z?$.bodyTick:NaN;$.bodyTick=V,$.bodyTickOf=Z;let U=$.bodyStoodSeconds+Math.max(K,0),q=$.bodyStoodSeconds+(X>K?X:Math.max(K,0)),z=V-Y;if(z-z===0&&J>0){let j=Math.min(Math.max(0,z)*J,q);return $.bodyStoodSeconds=j===0?U:0,j===0&&X===0?0:Math.max(K,j)}if($.bodyStoodSeconds=X===0?U:0,!(X>=0))return K;return X===0?0:Math.max(K,Math.min(X,U))})",()=>"(function($,Z,Q,X,J,K){if(K.length=0,K.push(X,$.hiddenMeshNodes),J!==null&&J.wearer!==null)K.push(J.wearer,F7(J.wearer),J.bone,J.homes,J.wearer.hiddenMeshNodes);for(let V of Z.entities){let Y=Q?.characterOf(V)??null;K.push(Y,Y===null?A:F7(Y))}})",()=>"(function($,Z){let v$22;{let Q=a$.words;let X=BF.get($);if(X===void 0)BF.set($,X=new WeakMap);let J=X.get(Z);if(J===void 0)X.set(Z,J=G$($,Q));v$22=J;}let Q=v$22;let X=_D.get($);if(X===void 0)_D.set($,X=new WeakMap);if(X.get(Z)!==$.frame){X.set(Z,$.frame);iD=Z;{let Z$39=Q,Q$26=a$.words,X$15=mm;{let Z=Z$39,Q=Q$26,X=X$15;X($.mirror,Z),M0($,Z,Z+Q),G6($,null,JE)}}}return Q})",()=>"(function($,Z){let Q=$.faces;if(!Q||Q.faceStarts.length===0||!(Z>=Q.faceStarts[0]))return[null,null];let X=0,J=Q.faceStarts.length-1;while(X<J){let K=X+J+1>>1;if(Q.faceStarts[K]<=Z)X=K;else J=K-1}return[Q.primitives[X],Z-Q.faceStarts[X]]})",()=>"(function($,Z,Q,X,J){let K=[],V=J.maxDistance;if(X.geometry!==null){for(let M of $.raycastInstances(Z,Q,X.geometry,J)){let[L,F]=fm(X,M.faceIndex);if(K.push({instanceId:M.instanceId,distance:M.distance,point:M.point,normal:M.normal,primitive:L,triangle:F,u:M.barycentric[0],v:M.barycentric[1]}),J.firstHitOnly&&M.distance<V)V=M.distance}}let Y=X.copies;if(Y===void 0)return K;let U=c(Z.direction[0],Z.direction[1],Z.direction[2]);if(!(U>0))return K;let q=Z.direction[0]/U,z=Z.direction[1]/U,j=Z.direction[2]/U,G=new Map,B=Y.shape.length;for(let M=0;M<Q.length;M++){let L=Q[M].modelMatrix;k0(L,0,tD,0);let F=tD,[H,N,I]=Z.origin;T6.origin[0]=F[0]*H+F[4]*N+F[8]*I+F[12],T6.origin[1]=F[1]*H+F[5]*N+F[9]*I+F[13],T6.origin[2]=F[2]*H+F[6]*N+F[10]*I+F[14],T6.direction[0]=F[0]*q+F[4]*z+F[8]*j,T6.direction[1]=F[1]*q+F[5]*z+F[9]*j,T6.direction[2]=F[2]*q+F[6]*z+F[10]*j;for(let W=0;W<B;W++){let P=W*6;qK[0]=Y.boxes[P],qK[1]=Y.boxes[P+1],qK[2]=Y.boxes[P+2],zK[0]=Y.boxes[P+3],zK[1]=Y.boxes[P+4],zK[2]=Y.boxes[P+5];let x=$P(T6,qK,zK);if(x===null||!(x<=V))continue;let D=Y.shape[W],v=G.get(D);if(v===void 0)v={instances:[],owners:[],primitives:[]},G.set(D,v);let k=new Float32Array(16);f(L,0,Y.worlds,W*16,k,0),v.instances.push({modelMatrix:k,bounds:Y.shapes[D].bounds}),v.owners.push(M),v.primitives.push(Y.primitive[W])}}for(let[M,L]of G)for(let F of $.raycastInstances(Z,L.instances,Y.shapes[M].geometry,{maxDistance:V,firstHitOnly:J.firstHitOnly}))if(K.push({instanceId:L.owners[F.instanceId],distance:F.distance,point:F.point,normal:F.normal,primitive:L.primitives[F.instanceId],triangle:F.faceIndex,u:F.barycentric[0],v:F.barycentric[1]}),J.firstHitOnly&&F.distance<V)V=F.distance;if(K.sort((M,L)=>M.distance-L.distance),J.firstHitOnly&&K.length>1)K.length=1;return K})",()=>'(function($,Z){if($.primitives.length===0)return null;let Q=$.kind==="static"?null:Q6($.parsed);let X=[];let J=[];let K=pm($,Z);$.primitives.forEach(function(q,z){if(q.restWorld!==null)return;let j;bm:{let Z=q;if(Q===null){j=Z.surface.positions;break bm;}let X=$.parsed.meshes[Z.meshIndex]?.primitives[Z.primitiveIndex],J=Z.skinIndex!==null&&X?ZP($.parsed,Z.skinIndex,X,Q):null;if(J){j=J;break bm;}let K=Z.surface.positions.slice();j=(eD(K,Q,Z.nodeIndex*16),K);}if(j.length<3)return;X.push({positions:j,indices:q.surface.indices}),J.push(z)});let V=rD(X),Y=V.indices.length===0?null:Z.pickGeometryOf(V.positions,V.indices,null);if(Y===null||Y.bvh.nodeCount===0)return K===null?null:{geometry:null,bounds:K.bounds,copies:K.copies};let U=jK(Y.bvh);if(K!==null)QP(U,K.bounds);return{geometry:Y,bounds:U,faces:{faceStarts:V.faceStarts,primitives:Uint32Array.from(J)},...K===null?{}:{copies:K.copies}}})']},function(){return[()=>"(function($,Z){let Q=[],X=new Map,J=[],K=[],V=[],Y=[],U={min:[1/0,1/0,1/0],max:[-1/0,-1/0,-1/0]},q={min:[0,0,0],max:[0,0,0]};for(let z=0;z<$.primitives.length;z++){let j=$.primitives[z],G=j.restWorld;if(G===null)continue;let{positions:B,indices:M}=j.surface;if(B.length===0)continue;let L=X.get(B)??[],F=L.find((H)=>H.indices===M);if(F===void 0){let H=Z.pickGeometryOf(B,M,null),{bvh:N}=H;if(F={indices:M,shape:N.nodeCount===0?-1:Q.length},N.nodeCount>0)Q.push({geometry:H,bounds:jK(N)});L.push(F),X.set(B,L)}if(F.shape<0)continue;MJ(Q[F.shape].bounds,G,q),J.push(F.shape),K.push(z);for(let H=0;H<16;H++)V.push(G[H]);Y.push(q.min[0],q.min[1],q.min[2],q.max[0],q.max[1],q.max[2]),QP(U,q)}if(J.length===0)return null;return{copies:{shapes:Q,shape:Uint32Array.from(J),primitive:Uint32Array.from(K),worlds:Float32Array.from(V),boxes:Float32Array.from(Y)},bounds:U}})",()=>"(function($){let Z=aD.get($);if(Z!==void 0)return Z;let Q=A7();if(Q===null)return null;let{positions:X,indices:J}=$.surface,K=Q.pickGeometryOf(X,J,null),{bvh:V}=K,Y=V.nodeCount===0?null:{geometry:K,bounds:jK(V)};return aD.set($,Y),Y})",()=>'(function($,Z,Q,X){let J;lm:{let $$58=$??null,Z$77=Q??null;{let $=$$58,Z=Z$77;if($===Z){J="same";break lm;}if($===null||Z===null){J="dress";break lm;}J=GK($,Z,dm);}}if(J==="dress")return"dress";return pd(Z,X,J);})',()=>'(function($,Z,Q){if($===Z)return"same";let X="same";for(let J in Z){if(!hQ(Z,J))continue;let K=Q(J);let V=K===null?om($,Z,J):K($[J],Z[J]);if(V==="dress")return"dress";if(V==="params")X="params"}for(let J in $)if(hQ($,J)&&!hQ(Z,J)&&(Q(J)===null||$[J]!==void 0))return"dress";return X})',()=>"(function($,Z){let Q=-1;for(let X=0;X<$.nodes.length;X++){let J=$.nodes[X];if(J.meshIndex===null)continue;let K=$.meshes[J.meshIndex];if(!K)continue;for(let V of K.primitives)Q+=1,Z(Q,V,J.meshIndex,X,J.skinIndex)}})",()=>'(function($,Z,Q,X){if(X.kind==="frame"){let K=new Float32Array(Z.length);for(let V=0;V*16<Z.length;V++)f(X.childToParent,0,Z,V*16,K,V*16);return{palettes:DP($,K),nodes:K}}return{palettes:$.skins.map(function(K,V){let Y=new Float32Array(K.joints.length*16),U=X.parentNodeByJoint[V];for(let q=0;q<K.joints.length;q++){let z=U?.[q]??-1;if(z>=0&&(z+1)*16<=Q.length)F1(Q,z*16,X.unit,YP,0),f(YP,0,K.inverseBindMatrices,q*16,Y,q*16);else f(Z,K.joints[q]*16,K.inverseBindMatrices,q*16,Y,q*16)}return Y}),nodes:Z}})',()=>"(function($,Z,Q,X,J,K){if(X&&Z.joints&&Z.weights){$.fill(0);let V=0;for(let Y=0;Y<4;Y++){let U=Z.weights[Q*4+Y];if(U===0)continue;let z=Z.joints[Q*4+Y]*16;if(z+16>X.length)continue;for(let j=0;j<16;j++)$[j]+=X[z+j]*U;V+=U}if(V>0)return}for(let V=0;V<16;V++)$[V]=J[K+V]})",()=>"(function($,Z){return $.nodeIndex===Z.nodeIndex&&$.skinIndex===Z.skinIndex&&V0($.primitive.position,Z.primitive.position)&&V0($.primitive.joints,Z.primitive.joints)&&V0($.primitive.weights,Z.primitive.weights)})",()=>"(function($){let{points:Z,order:Q,bounds:X,stack:J,positions:K}=$;if(J.length>0){for(let Y=0;J.length>0&&Y<UP;){let U=J.pop()??0,q=J.pop()??0;if(U<=q)continue;Y+=U-q;let z=q+U>>1;let v$41;Zf:{let $$60=Z,Z$78=Q,Q$55=q,X$29=U,J$21=X,K$13=z;{let $=$$60,Z=Z$78,Q=Q$55,X=X$29,J=J$21,K=K$13;let V=1/0,Y=1/0,U=1/0,q=-1/0,z=-1/0,j=-1/0;for(let F=Q;F<X;F++){let H=Z[F]*3,N=$[H],I=$[H+1],W=$[H+2];if(N<V)V=N;if(N>q)q=N;if(I<Y)Y=I;if(I>z)z=I;if(W<U)U=W;if(W>j)j=W}let G=K*6;J[G]=V,J[G+1]=Y,J[G+2]=U,J[G+3]=q,J[G+4]=z,J[G+5]=j;let B=q-V,M=z-Y,L=j-U;if(B>=M&&B>=L){v$41=0;break Zf;}if(M>=L){v$41=1;break Zf;}v$41=2;}}let j=v$41;if(U-q<=xP)continue;{let $$59=Q,Q$54=j,X$28=q,J$20=U-1,K$12=z;{let $=$$59,Q=Q$54,X=X$28,J=J$20,K=K$12;while(J>X){let V=Z[$[K]*3+Q],Y=X,U=J;if(pQ($,X,K),Z[$[J]*3+Q]>V)pQ($,X,J);while(Y<U){pQ($,Y,U),Y++,U--;while(Z[$[Y]*3+Q]<V)Y++;while(Z[$[U]*3+Q]>V)U--}if(Z[$[X]*3+Q]===V)pQ($,X,U);else U++,pQ($,U,J);if(U<=K)X=U+1;if(K<=U)J=U-1}}}J.push(q,z,z+1,U)}return null}let V=Math.min(Q.length,$.copied+UP);for(let Y=$.copied;Y<V;Y++){let U=Q[Y]*3;K[Y*3]=Z[U],K[Y*3+1]=Z[U+1],K[Y*3+2]=Z[U+2]}return $.copied=V,V<Q.length?null:{order:Q,bounds:X,positions:K}})"]},function(){return[()=>"(function({parentPrims:$,nodeCount:Z}){let Q=[],X=0;for(let J=0;J<$.length;J++){if(Q.some((K)=>PP($[K],$[J])))continue;Q.push(J),X+=$[J].primitive.position.length/3}if(X===0)return null;return{kept:Q,at:0,v:0,n:0,points:new Float32Array(X*3),primRef:new Int32Array(X),vertex:new Int32Array(X),nodes:new Int32Array(X*4).fill(-1),carried:new Uint8Array(Z),min:new Float64Array(3).fill(1/0),max:new Float64Array(3).fill(-1/0),tree:null}})",()=>"(function($,Z){let{parentRest:Q,parentPalettes:X,parentPrims:J,jointNodes:K}=$,{points:V,primRef:Y,vertex:U,nodes:q,carried:z,min:j,max:G}=Z,B=zf;for(let F=0;Z.at<Z.kept.length&&F<qP;){let H=Z.kept[Z.at],N=J[H],I=N.skinIndex!==null?X[N.skinIndex]??null:null,W=N.primitive.position,P=Math.min(W.length/3,Z.v+qP-F);for(let x=Z.v;x<P;x++){tz(B,N.primitive,x,I,Q,N.nodeIndex*16);let D=W[x*3],v=W[x*3+1],k=W[x*3+2],S=Z.n++;for(let C=0;C<3;C++){let E=B[C]*D+B[4+C]*v+B[8+C]*k+B[12+C];V[S*3+C]=E,j[C]=Math.min(j[C],E),G[C]=Math.max(G[C],E)}Y[S]=H;U[S]=x;Uf:{let $$61=N,Z$79=x,Q$56=N.skinIndex!==null?K[N.skinIndex]:void 0,X$30=q,J$22=S*4,K$14=z;{let $=$$61,Z=Z$79,Q=Q$56,X=X$30,J=J$22,K=K$14;let{joints:V,weights:Y}=$.primitive,U=0;if(Q&&V&&Y)for(let q=0;q<4;q++){let z=Y[Z*4+q]>0?Q[V[Z*4+q]]??-1:-1;if(z<0||z>=K.length)continue;X[J+U++]=z,K[z]=1}if(U>0||$.nodeIndex>=K.length)break Uf;X[J]=$.nodeIndex,K[$.nodeIndex]=1}}}if(F+=P-Z.v,Z.v=P,P<W.length/3)break;Z.at+=1,Z.v=0}if(Z.at<Z.kept.length)return;if(Z.tree===null){if(![0,1,2].every((F)=>isFinite(j[F])&&isFinite(G[F]))){$.cloud=null,$.cloudBuild=null;return}Z.tree=TP(V,Int32Array.from({length:Z.n},(F,H)=>H));return}let M=vP(Z.tree);if(!M)return;let L=Math.ceil(Math.log2(Z.n+1))+2;$.cloud={...M,points:V,primRef:Y,vertex:U,nodes:q,carried:z,extent:Math.max(G[0]-j[0],G[1]-j[1],G[2]-j[2]),carrierStart:null,carrierPoints:null,carrierTrees:new Map,treeBuilds:new Map,stackLo:new Int32Array(L),stackHi:new Int32Array(L),stackD:new Float64Array(L)},$.cloudBuild=null})",()=>"(function($,Z){if($.carrierTrees.has(Z))return!0;let Q=$.treeBuilds.get(Z);if(!Q){let{carrierStart:J,carrierPoints:K}=$;if(J===null||K===null){let{nodes:V}=$,Y=$.carried.length;J=new Int32Array(Y+1);for(let q=0;q<V.length;q++){if(zP(V,q))J[V[q]+1]+=1;}for(let q=0;q<Y;q++)J[q+1]+=J[q];K=new Int32Array(J[Y]);let U=J.slice(0,Y);for(let q=0;q<V.length;q++){if(zP(V,q))K[U[V[q]]++]=q>>2;}$.carrierStart=J,$.carrierPoints=K}Q=TP($.points,K.slice(J[Z],J[Z+1])),$.treeBuilds.set(Z,Q)}let X=vP(Q);if(!X)return!1;return $.treeBuilds.delete(Z),$.carrierTrees.set(Z,X),!0})",()=>"(function($){let Z=jP.get($);if(Z)return Z;let Q=Q6($),X=DP($,Q),J=[];sz($,(V,Y,U,q,z)=>J.push({primitive:Y,meshIndex:U,nodeIndex:q,skinIndex:z}));let K={parentRest:Q,parentPalettes:X,parentPrims:J,jointNodes:$.skins.map((V)=>V.joints),nodeCount:$.nodes.length,cloud:void 0,cloudBuild:null};return jP.set($,K),K})",()=>"(function($,Z,Q,X,J){let K=Z*6,V=0;if(Q<$[K])V=$[K]-Q;else if(Q>$[K+3])V=Q-$[K+3];let Y=0;if(X<$[K+1])Y=$[K+1]-X;else if(X>$[K+4])Y=X-$[K+4];let U=0;if(J<$[K+2])U=$[K+2]-J;else if(J>$[K+5])U=J-$[K+5];return V*V+Y*Y+U*U})",()=>"(function($,Z,Q,X,J,K,V){let{order:Y,bounds:U}=Z,{stackLo:q,stackHi:z,stackD:j}=$,G=Y.length;if(G===0)return K;q[0]=0,z[0]=G,j[0]=iz(U,G>>1,Q,X,J);let B=1;while(B>0){if(B-=1,j[B]>V)continue;let M=q[B];let L=z[B];let F=L-M<=xP;let H=M+L>>1;let N;{let $$62=Z,Z$80=F?M:H,Q$57=F?L:H+1,X$31=Q,J$23=X,K$15=J,V$10=K,Y$5=V;{let $=$$62,Z=Z$80,Q=Q$57,X=X$31,J=J$23,K=K$15,V=V$10,Y=Y$5;let{positions:U,order:q}=$;for(let z=Z;z<Q;z++){let j=MK(U,z,X,J,K);if(j<Y||j===Y&&q[z]<V)Y=j,V=q[z]}N=V;}}if(N!==K)K=N,V=MK($.points,N,Q,X,J);if(!F){let v$43;Hf:{let Z$81=U,Q$58=M,X$32=H,J$24=L,K$16=Q,V$11=X,Y$6=J,U$4=V,q$2=B;{let Z=Z$81,Q=Q$58,X=X$32,J=J$24,K=K$16,V=V$11,Y=Y$6,U=U$4,q=q$2;let z=X>Q?iz(Z,Q+X>>1,K,V,Y):1/0,j=J>X+1?iz(Z,X+1+J>>1,K,V,Y):1/0;if(z<=j){let B=BK($,X+1,J,j,U,q);{v$43=BK($,Q,X,z,U,B);break Hf;}}let G=BK($,Q,X,z,U,q);v$43=BK($,X+1,J,j,U,G);}}B=v$43}}return K})"]},function(){return[()=>"(function($,Z,Q,X,J,K){let V=1/0,Y=-1;if(J>=0&&Ff($.nodes,J,K))V=MK($.points,J,Z,Q,X),Y=J;if(K===null)return GP($,$,Z,Q,X,Y,V);for(let U=0;U<4;U++){let q=K[U];if(q<0||$.carried[q]!==1||K.indexOf(q)<U)continue;let v$42;Gf:{let Z=q;for(;;){let Q=$.carrierTrees.get(Z);if(Q){v$42=Q;break Gf;}CP($,Z)}}let z=GP($,v$42,Z,Q,X,Y,V);if(z!==Y)Y=z,V=MK($.points,z,Z,Q,X)}return Y})",()=>"(function($,Z,Q,X,J){let K=$.count;if(K===$.indices.length){let V=new Uint32Array(K*2);V.set($.indices),$.indices=V;let Y=new Float32Array(K*6);Y.set($.position),$.position=Y}$.indices[K]=Z,$.position[K*3]=Q,$.position[K*3+1]=X,$.position[K*3+2]=J,$.count=K+1})",()=>'(function($,Z,Q,X,J){let{cloud:K,frames:V,placement:Y,want:U}=$,{primitive:q,nodeIndex:z,skinIndex:j}=Z,G=q.position,B=j!==null?V.palettes[j]??null:null,{nearest:M,inverse:L}=Q,F=If;for(let H=X;H<J;H++){tz(F,q,H,B,V.nodes,z*16);let v$40;em:{let $=F,Z=MP;let Q=$[0],X=$[4],J=$[8],K=$[1],V=$[5],Y=$[9],U=$[2],q=$[6],z=$[10],j=Q*(V*z-Y*q)-X*(K*z-Y*U)+J*(K*q-V*U);if(!(Math.abs(j)>0.000000000000000001)){v$40=!1;break em;}let G=1/j;v$40=(Z[0]=(V*z-Y*q)*G,Z[3]=(J*q-X*z)*G,Z[6]=(X*Y-J*V)*G,Z[1]=(Y*U-K*z)*G,Z[4]=(Q*z-J*U)*G,Z[7]=(J*K-Q*Y)*G,Z[2]=(K*q-V*U)*G,Z[5]=(X*U-Q*q)*G,Z[8]=(Q*V-X*K)*G,!0);}if(!v$40)continue;L.set(MP,H*9);let N=G[H*3];let I=G[H*3+1];let W=G[H*3+2];let P;xf:{let $$63=U,Z$82=q,Q$59=H,X$33=j,J$25=Y,K$17=K.carried;{let $=$$63,Z=Z$82,Q=Q$59,X=X$33,J=J$25,K=K$17;if($.fill(-1),J.kind==="frame")$[0]=J.node??-1;else if(X!==null&&Z.joints&&Z.weights){let V=J.parentNodeByJoint[X];for(let Y=0;Y<4;Y++)if(Z.weights[Q*4+Y]>0)$[Y]=V?.[Z.joints[Q*4+Y]]??-1}for(let V=0;V<4;V++)if($[V]>=0&&K[$[V]]===1){P=!0;break xf;}P=!1;}}let x=P?Bf(K,U):-1;if(x>=0)return $.treeNode=x,H;let D=Nf(K,F[0]*N+F[4]*I+F[8]*W+F[12],F[1]*N+F[5]*I+F[9]*W+F[13],F[2]*N+F[6]*I+F[10]*W+F[14],$.seed,P?U:null);if(D<0)continue;$.seed=D,M[H]=D,$.matchStart[D+1]+=1}return J})',()=>"(function($,Z,Q,X,J,K){let V=Z.primitive.morphTargets[X],Y=V.indices[J],U=Q+Y,q=$.start.length-1,z=$.linear??=new Float32Array(q*9),j=$.linearReady??=new Uint8Array(q),G=U*9;if(j[U]===0){let{parentRest:x,parentPalettes:D}=$.surface;tz(L8,Z.primitive,Y,Z.skinIndex!==null?D[Z.skinIndex]??null:null,x,Z.nodeIndex*16),z[G]=L8[0],z[G+1]=L8[1],z[G+2]=L8[2],z[G+3]=L8[4],z[G+4]=L8[5],z[G+5]=L8[6],z[G+6]=L8[8],z[G+7]=L8[9],z[G+8]=L8[10],j[U]=1}let B=V.position[J*3],M=V.position[J*3+1],L=V.position[J*3+2],F=z[G]*B+z[G+3]*M+z[G+6]*L,H=z[G+1]*B+z[G+4]*M+z[G+7]*L,N=z[G+2]*B+z[G+5]*M+z[G+8]*L;if(F===0&&H===0&&N===0)return K;let I=$.start[U],W=$.start[U+1];if(K<0){let x=$.parentParsed.meshes[Z.meshIndex]?.targetNames[X]??String(X);if(K=$.keyByName.get(x)??-1,K<0)K=$.firsts.length,$.keyByName.set(x,K),$.firsts.push({name:x,parentMesh:Z.meshIndex,parentTarget:X,child:$.matchChild[I],vertex:$.matchVertex[I]})}$.padParent=Math.max($.padParent,Math.abs(F),Math.abs(H),Math.abs(N));let P=$.firsts[K];for(let x=I;x<W;x++){let D=$.matchChild[x],v=$.matchVertex[x],k=$.lookups[D].inverse,S=v*9,C=k[S]*F+k[S+3]*H+k[S+6]*N,E=k[S+1]*F+k[S+4]*H+k[S+7]*N,u=k[S+2]*F+k[S+5]*H+k[S+8]*N;Wf($.lanes[D][K]??={indices:new Uint32Array(BP),position:new Float32Array(BP*3),count:0},v,C,E,u);$.entryCounts[D]+=1;$.padChild=Math.max($.padChild,Math.abs(C),Math.abs(E),Math.abs(u));if(D<P.child||D===P.child&&(v<P.vertex||v===P.vertex&&Z.meshIndex===P.parentMesh&&X<P.parentTarget))P.child=D,P.vertex=v,P.parentMesh=Z.meshIndex,P.parentTarget=X}return K})"]},function(){return[()=>"(function($){let Z=[],Q=[],X=[];sz($,function(J,K,V,Y,U){if(kP($,K,V))return;let q={primitive:K,meshIndex:V,nodeIndex:Y,skinIndex:U},z=K.position.length/3,j=Z.findIndex((G)=>PP(G,q));if(j<0)j=Q.length,Z.push(q),Q.push({primIndex:J,vertexCount:z,nearest:new Int32Array(z).fill(-1),inverse:new Float32Array(z*9)});X.push({primIndex:J,vertexCount:z,lookup:j})});return {rests:Z,lookups:Q,childPrims:X}})",()=>"(function($,Z,Q,X,J){let K=rm(X,Q6(X),Z.parentRest,J);let {rests:V,lookups:Y,childPrims:U}=Sf(X);return{parentParsed:$,surface:Z,cloud:Q,frames:K,placement:J,rests:V,childPrims:U,lookups:Y,want:new Int32Array(4),at:0,vertex:0,seed:-1,treeNode:-1,matchStart:new Int32Array(Q.order.length+1),fill:null,walk:null}})",()=>"(function($,Z){let v$44;Af:{for(;$.at<$.lookups.length;$.at++,$.vertex=0,$.seed=-1){let Q=$.lookups[$.at];while($.vertex<Q.vertexCount){if(d8(Z)){v$44=!1;break Af;}if($.treeNode>=0){if(CP($.cloud,$.treeNode))$.treeNode=-1;continue}$.vertex=Df($,$.rests[$.at],Q,$.vertex,Math.min(Q.vertexCount,$.vertex+Qf))}}v$44=!0;}if(!v$44)return null;let Q;gf:{if($.walk){Q=$.walk;break gf;}if($.fill===null){if(d8(Z)){Q=null;break gf;}$.fill=wf($.matchStart)}for(;;){if(d8(Z)){Q=null;break gf;}let v$73;Rf:{let $$106=$.fill,Z$121=$.lookups;{let $=$$106,Z=Z$121;let{cursor:Q,matchChild:X,matchVertex:J}=$;for(let K=Xf;$.at<Z.length;$.at++,$.v=0){let V=Z[$.at].nearest,Y=Math.min(V.length,$.v+K);for(let U=$.v;U<Y;U++){let q=V[U];if(q<0)continue;X[Q[q]]=$.at,J[Q[q]]=U,Q[q]+=1}if(K-=Y-$.v,$.v=Y,Y<V.length){v$73=!1;break Rf;}}v$73=!0;}}if(v$73)break}$.walk=Ef($,$.fill);Q=$.walk;}if(Q===null||!Of($.surface.parentPrims,Q,Z)||d8(Z))return null;return _f($.childPrims,Q.walk)})",()=>"(function($,Z,Q){for(;Z.ref<$.length;Z.ref++,Z.target=0,Z.matched=null){let X=Z.refBase[Z.ref];if(X<0)continue;Z.matched??=mf(Z.walk.start,X,$[Z.ref].primitive.position.length/3);if(Z.matched===null)continue;for(let J=$[Z.ref].primitive.morphTargets;Z.target<J.length;Z.target++,Z.entry=0,Z.key=-1){let K=J[Z.target].indices.length;do{if(d8(Q))return!1;{let $$64=Z,Z$83=X,Q$60=Z.matched,X$34=Math.min(K,Z.entry+Jf);{let $=$$64,Z=Z$83,Q=Q$60,X=X$34;let J=$.walk.surface.parentPrims[$.ref],K=J.primitive.morphTargets[$.target].indices;for(let V=$.entry;V<X;V++){if(Q[K[V]]!==1)continue;$.key=vf($.walk,J,Z,$.target,V,$.key)}$.entry=X}}}while(Z.entry<K)}}return!0})",()=>"(function($,Z){let{lookups:Q,cloud:X,surface:J}=$,{matchChild:K,matchVertex:V}=Z;return{walk:{surface:J,parentParsed:$.parentParsed,start:$.matchStart,matchChild:K,matchVertex:V,lookups:Q,lanes:Q.map(()=>[]),entryCounts:new Int32Array(Q.length),firsts:[],keyByName:new Map,linear:null,linearReady:null,padParent:0,padChild:0},refBase:uf(X,J.parentPrims.length),ref:0,target:0,entry:0,key:-1,matched:null}})",()=>"(function($,Z){let{lanes:Q,entryCounts:X,firsts:J,padParent:K,padChild:V}=Z;let Y=ff(J);return{keys:Y.map((q)=>({name:J[q].name,parentMesh:J[q].parentMesh,parentTarget:J[q].parentTarget})),prims:bf($,Y,Q,X),padParent:K,padChild:V}})",()=>"(function($,Z,Q,X){let J=[],K=[];for(let{primIndex:V,vertexCount:Y,lookup:U}of $){if(X[U]===0)continue;let q=K[U];if(!q){q=Z.map((z)=>hf(Q[U][z]));K[U]=q;}J.push({primIndex:V,vertexCount:Y,targets:q,entryCount:X[U]})}return J})"]},function(){return[()=>"(function($,Z,Q,X){let J=Z.onDevice.get($);if(J===void 0){let K=new Map,V=[],Y=q8($),U=Z.rows.map(function(q){let z=K.get(q.words);if(z)return z;let j=Y.alloc(Math.ceil(q.words.byteLength/4)*4,`follow ${Q}`);return K.set(q.words,j),V.push({slice:j,words:q.words}),j});J={device:$,packed:Z,buffers:U,users:0,waiters:0,writes:V,writing:0,written:0},Z.onDevice.set($,J)}for(;J.writing<J.writes.length;J.writing++,J.written=0){let{slice:K,words:V}=J.writes[J.writing];while(J.written<V.length){if(d8(X))return null;let Y=Math.min(Vf,V.length-J.written);$.queue.writeBuffer(K.buffer,K.offset+J.written*4,V,J.written,Y),J.written+=Y}}return J})",()=>'(function($,Z){if($.kind==="skin")return`skin:${$.unit}:${$.parentNodeByJoint.map((V)=>V.join(",")).join("|")}`;let Q=$.childToParent,X=Math.max(oz(Q,0),Number.MIN_VALUE)*FP,J=Math.max(Z,Number.MIN_VALUE)*FP,K=[];for(let V=0;V<12;V++)if(V%4!==3)K.push(Math.round(Q[V]/X));for(let V=12;V<15;V++)K.push(Math.round(Q[V]/J));return`frame:${$.node??-1}:${K.join(",")}`})',()=>"(function($,Z,Q,X,J){if($.pack===null){let v$45;af:{let K=az(Z);if(!SP(K,J)){v$45=null;break af;}if($.job===void 0){if(d8(J)){v$45=null;break af;}$.job=K.cloud?kf(Z,K,K.cloud,Q,X):null}v$45=$.job===null?Cf:yf($.job,J);}let K=v$45;if(K===null)return null;$.job=null,$.pack={transfer:K,rows:[],wordsOf:new Map,at:0,pack:null}}{let $$66=$.pack,Z$85=J;{let $=$$66,Z=Z$85;let Q=$.transfer.prims;for(;$.at<Q.length;$.at++){let V=Q[$.at],Y=$.wordsOf.get(V.targets)??null;if(Y===null){let U=$.pack??=IP(V.targets,V.vertexCount);do{if(d8(Z))return null;Y=WP(U,Kf)}while(Y===null);$.pack=null,$.wordsOf.set(V.targets,Y)}$.rows.push({primIndex:V.primIndex,words:Y,entryCount:V.entryCount})}let{keys:X,padParent:J,padChild:K}=$.transfer;return{keys:X,rows:$.rows,padParent:J,padChild:K,onDevice:new WeakMap}}}})",()=>"(function($,Z,Q,X,J){let K=HP(nf,Z,Q);if(!Mf(Q))return of;let V=az(Z),Y=V.cloud===void 0?void 0:K.get(LP(X,V.cloud?.extent??0))?.deref();if(Y)return Y;let U=gP(J);if(U===null||!SP(V,U))return dQ=!0,null;let q=LP(X,V.cloud?.extent??0);let z=HP(rf,Z,Q);let j=z.get(q)?.deref();if(j===void 0){j={job:void 0,pack:null};for(let[B,M]of z)if(M.deref()===void 0)z.delete(B);z.set(q,new WeakRef(j))}lQ($,j);let G=tf(j,Z,Q,X,U);if(G===null)return dQ=!0,null;z.delete(q);for(let[B,M]of K)if(M.deref()===void 0)K.delete(B);return K.set(q,new WeakRef(G)),G})",()=>"((Q)=>function(G){{let $$65=G.targetNames,Z$84=Q.asset.parsed;{let $=$$65,Z=Z$84;let Q=new Int32Array($.length*2).fill(-1),X=!1;for(let J=0;J<$.length;J++){let K=$[J];for(let V=0;V<Z.meshes.length;V++){let Y=Z.meshes[V].targetNames.indexOf(K);if(Y<0)continue;Q[J*2]=V,Q[J*2+1]=Y,X=!0;break}}return X?Q:null}}})",()=>"(function($,Z,Q,X,J,K){let V=$[Z*3],Y=$[Z*3+1],U=$[Z*3+2],q=$[Q*3],z=$[Q*3+1],j=$[Q*3+2],G=$[X*3]-q,B=$[X*3+1]-z,M=$[X*3+2]-j,L=$[J*3]-q,F=$[J*3+1]-z,H=$[J*3+2]-j,N=V-q,I=Y-z,W=U-j,P=G*N+B*I+M*W,x=L*N+F*I+H*W,D=1,v=0,k=0;if(!(P<=0&&x<=0)){let S=V-$[X*3],C=Y-$[X*3+1],E=U-$[X*3+2],u=G*S+B*C+M*E,y=L*S+F*C+H*E,g=V-$[J*3],w=Y-$[J*3+1],b=U-$[J*3+2],h=G*g+B*w+M*b,U0=L*g+F*w+H*b,I0=P*y-u*x,Q0=h*x-P*U0,K0=u*U0-h*y;if(u>=0&&y<=u)D=0,v=1;else if(U0>=0&&h<=U0)D=0,k=1;else if(I0<=0&&P>=0&&u<=0)v=P/(P-u),D=1-v;else if(Q0<=0&&x>=0&&U0<=0)k=x/(x-U0),D=1-k;else if(K0<=0&&y-u>=0&&h-U0>=0)k=(y-u)/(y-u+(h-U0)),D=0,v=1-k;else{let m=1/(K0+Q0+I0);v=Q0*m,k=I0*m,D=1-v-k}}K[0]=D,K[1]=v,K[2]=k,K[3]=c(q+G*v+L*k-V,z+B*v+F*k-Y,j+M*v+H*k-U)})"]},function(){return[()=>"(function($,Z,Q,X,J,K,V){for(let Y=Q.start[X];Y<Q.start[X+1];Y++){let U=Q.list[Y];if(K[U/3]===J+1)continue;K[U/3]=J+1;Jb($,J,Z[U],Z[U+1],Z[U+2],O7);if(O7[3]>=V[0])continue;V[0]=O7[3],V[1]=U,V[2]=O7[0],V[3]=O7[1],V[4]=O7[2]}})",()=>"(function($,Z,Q,X,J,K){{let $$69=X,Z$88=Q,Q$62=J,X$35=K;{let $=$$69,Z=Z$88,Q=Q$62,X=X$35;let{start:J,list:K}=Z;Q.fill(-1);let V=0,Y=0;for(let U=0;U<$.length;U++){let q=$[U];if(Q[q]!==-1)continue;Q[q]=q,X[Y++]=q}while(V<Y){let U=X[V++];for(let q=J[U];q<J[U+1];q++){let z=K[q];if(Q[z]!==-1)continue;Q[z]=Q[U],X[Y++]=z}}}}let v$48;{let $$70=X,Z$89=J.length;{let $=$$70,Z=Z$89;let Q=$.length-$.length%3,X=new Uint32Array(Z+1);for(let V=0;V<Q;V++)X[$[V]+1]+=1;for(let V=0;V<Z;V++)X[V+1]+=X[V];let J=X.slice(0,Z),K=new Uint32Array(X[Z]);for(let V=0;V+2<$.length;V+=3)K[J[$[V]]++]=V,K[J[$[V+1]]++]=V,K[J[$[V+2]]++]=V;v$48={start:X,list:K};}}let V=v$48;let Y=new Int32Array(Math.floor(X.length/3));let {start:U,list:q}=Q;let z=[];let j=[];for(let G=0;G<J.length;G++){let B=J[G];if(B<0||B===G)continue;v9[0]=1/0,v9[1]=-1,RP($,X,V,B,G,Y,v9);for(let N=U[G];N<U[G+1];N++){let I=J[q[N]];if(I>=0&&I!==B)RP($,X,V,I,G,Y,v9)}let M=v9[1];if(M<0)continue;let L=X[M],F=X[M+1],H=X[M+2];if(Z[L]===Z[G]&&Z[F]===Z[G]&&Z[H]===Z[G])continue;z.push(G,L,F,H),j.push(v9[2],v9[3],v9[4])}return{vertices:Uint32Array.from(z),places:Float32Array.from(j)}})",()=>"(function($){let Z=$.passes;if($.rig===null||$.headsetPose||$.fingers||$.fingersLaid||$.springs!==null||Z.reachStands||Z.gripStands||$.skinParentFace)return;for(let Q of $.skinnedModelSlots){if(!Q?.rig)continue;Q.rig=null,Q.written=-1}$.rig=null,$.rigMinted=!1})",()=>'(function($,Z){let Q=$.springs;if(Q===null)return;if(Q.stoodOn===null||Q.shapes===Q.named)return;Q.named=Q.shapes;let X=Q.wornOn?"the body this is worn on":"the body\'s own",J=Q.rows.filter((U)=>U.colliders!==null).length,K=X;if(J===Q.rows.length)K="authored";else if(J>0)K=`${J} of ${Q.rows.length} rows authored, the rest ${X}`;let V=(Q.table===null?0:Q.table.words[n0.chains]);let Y=YK(Q).length;G1({code:"jiggle-body-shapes",key:`jiggle-body-shapes:${$.modelId}:${Z.ownerEntityId}:${Q.shapes}`,message:`${$.modelId}: ${V} chain(s), ${Y} spring bone(s), ${Q.shapes} body shape(s) (${K})`,data:{entityId:Z.ownerEntityId,modelId:$.modelId,chains:String(V),springs:String(Y),shapes:String(Q.shapes),source:K}})})',()=>"(function($,Z,Q){let X=$$($)===null?$.poseBoundInput?.reach:void 0,J=$.asset.parsed.skins[Q].joints,K=X===void 0?1/0:0;for(let V=0;X&&V<Z.length;V++)if(Z[V]!==0)K=Math.max(K,X[J[V]]);return K*$.posedWorldSphere[3]/$.poseBound[3]})",()=>"(function($,Z,Q,X=!1){let J=-1;for(let K=0;K<$.skins.length;K++){let V=$.skins[K],Y=V.headJoints;if(Y===null||V.pointCollapsed)continue;J=Math.max(J,0);let U=Kj($,Z,null,Q?Sb($,Y,K):0);if(!(U>0))continue;Lj($);let q=t7($,K),z=Math.min(U,Xv($.jointBoxes[K],q,0,V.jointCount,Y,Z,Q,X));if(z>J)J=z;if(J>=1)break}return J>=1?1:J})",()=>"(function($,Z){let Q;{let $=Y0[tQ];Q=Y0[X5]===1&&$<AK?AK:$;}let X=Y0[r0];let J=Y0[d7]===1;let K=Y0[tQ]>=1&&!J;let V=K||!J&&Z[i$]===1&&X>0;if(Z[i$]=V?1:0,K||J||ES($))return Q;if(V&&Y0[X5]===1)return 1;if(X>=1)return Q;OS($,Z,!0);let Y=Y0[r0];if(Y<=0)return Q;return V?1:-Y})"]},function(){return[()=>"(function($,Z,Q){let X=$.rig;if(X===null||$.skinBind||$.ragdoll||$.nativeRelease||Z.ragdollPose||$.rigidPrimitives.length>0)return!1;UX($,Z),Q.fill(1/0,0,3),Q.fill(-1/0,3,6);let J=$.asset.parsed.skins;for(let V=0;V<J.length;V++){let Y=$.jointBoxes[V];if(!Y)continue;let U=J[V].joints.length;if(NK.length<U*16)NK=new Float32Array(U*16);v$(J[V],X.model,NK);for(let q=0;q<Math.min(U,Math.floor(Y.length/6));q++){if(!(Y[q*6]<=Y[q*6+3]))continue;f(X.rootMatrix.a,X.rootMatrix.o,NK,q*16,iP,0);{let $$76=Q,Z$93=iP,Q$63=Y,X$36=q*6;{let $=$$76,Z=Z$93,Q=Q$63,X=X$36;for(let J=0;J<3;J++){let K=Z[J]*Q[X],V=Z[J]*Q[X+3],Y=Z[4+J]*Q[X+1],U=Z[4+J]*Q[X+4],q=Z[8+J]*Q[X+2],z=Z[8+J]*Q[X+5];$[J]=Math.min($[J],Math.min(K,V)+Math.min(Y,U)+Math.min(q,z)+Z[12+J]),$[3+J]=Math.max($[3+J],Math.max(K,V)+Math.max(Y,U)+Math.max(q,z)+Z[12+J])}}}}}if(!isFinite(Q[0]+Q[1]+Q[2]+Q[3]+Q[4]+Q[5]))return!1;let K=c7($,Z.world);for(let V=0;V<3;V++)Q[V]-=K,Q[3+V]+=K;return!0})",()=>'(function($,Z,Q,X){return`entity "${$}" has been moving for ${RK}+ frames while its skinned model "${Z}" shows the bind pose (the T-pose) \\u2014 this rig never bound: its mixer channels (${Q.join(", ")}) found no clip to play, not even a stand-in. Available clips: ${X}. A model with no clips needs a rigged body and a clip by address (cdn/clip-<words>.glb); a masked channel needs a bone the skeleton has.`})',()=>'(function($,Z,Q,X){let J=Q.map((K)=>`${K.channel} played "${K.clip}" and stopped when its duration: ${K.duration} ran out`).join("; ");return`entity "${$}" is moving while its skinned model "${Z}" shows the bind pose (the T-pose) \\u2014 its animation channels bound and played, then ended: ${J}. On an animation channel, duration is how long the channel plays before it fades out, not the clip\'s length; the model and its clips are fine. Available clips: ${X.join(", ")}. To keep the clip going, write the channel without duration (a looping clip plays until the channel changes); to cross-fade between clips, use blendIn and blendOut.`})',()=>'(function($,Z){let Q=[...$.mixer.clipsByKey.values()].map((Y)=>Y.name);let v$51;ub:{let $$77=$.mixer,Z$94=Z.mixer;{let $=$$77,Z=Z$94;let Q=[];if(!Z){v$51=Q;break ub;}for(let X of Object.keys(Z)){let J=$.expiredChannels.get(X),K=Z[X]?.clip;if(J&&typeof K==="string"&&K!=="")Q.push({channel:X,clip:J.clip,duration:J.duration})}v$51=Q;}}let X=v$51;let J=j1(`${$.modelId}:${Z.ownerEntityId}`,180);if(X.length>0){let Y=_b(Z.ownerEntityId,$.modelId,X,Q);G3("skinned-rig-channels-expired",`rig-channels-expired:${J}`,Y,{entityId:Z.ownerEntityId,modelId:$.modelId,channels:X.map((U)=>U.channel).join(", "),clips:X.map((U)=>U.clip).join(", "),durations:X.map((U)=>String(U.duration)).join(", ")});return}let K=Z.mixer?Object.keys(Z.mixer).map((Y)=>`${Y}: "${Z.mixer?.[Y]?.clip??""}"`):[];let V=Eb(Z.ownerEntityId,$.modelId,K,Q.join(", ")||"(none)");G3("skinned-rig-never-bound",`rig-never-bound:${J}`,V,{entityId:Z.ownerEntityId,modelId:$.modelId})})',()=>"(function($,Z){let Q=$.skinBind,X=Q?Q.draw??=$C():bb,J=S$($).bindCorrection,K=J&&J[0]>0?J[0]:1,V=Q?.remaps??null,Y=Z.character?Z.visual?.world??null:null;if(Q&&Y&&X.readMark===y6&&X.readFrame===Z&&X.readWorld===Y&&X.remaps===V&&X.ratio===K&&X.asset===$.asset)return X;if(Q)X.readMark=Y?y6:-1,X.readFrame=Z,X.readWorld=Y;let U=Q===null;if(X.remaps!==V||X.ratio!==K||X.asset!==$.asset){X.remaps=V;X.ratio=K;X.asset=$.asset;X.looseArm=Q!==null&&ZF($,Q);hb($,K,X);U=!0;}let q=ZC(Z);if(!sP(q,X.jointFrame,X.jointCorrection,X.jointKey))X.jointFrame=q,X.jointCorrection=q.character?S$(q.character).bindCorrection:null,U=!0;if(X.looseArm&&Z!==q&&!sP(Z,X.rootFrame,X.rootCorrection,X.rootKey))X.rootFrame=Z,X.rootCorrection=Z.character?S$(Z.character).bindCorrection:null,U=!0;if(!U)return X;if(EK(X.jointKey,X.jointCorrection,X.bound),X.looseArm)if(Z===q)X.loose.set(X.bound);else EK(X.rootKey,X.rootCorrection,X.loose);lb(X);return X})"]},function(){return[()=>"(function($,Z,Q,X){let J=Z===$&&Q===($.character?S$($.character).bindCorrection:null),K=$.character?$.visual:null,V,Y=0;if(K)V=K.world;else({a:V,o:Y}=$.root());for(let U=0;U<16;U++){let q=V[Y+U];if(X[U]!==q)J=!1,X[U]=q}return J})",()=>"(function($,Z,Q,X,J){let K=V5($,Z);if(Q===zj){if(!Z.poseBody(J))return!1}else if(Q===XC)Z.restSphere(J);else Z.bodySphere(J);if(J.radius+=K.boundRadius+X,K.looseSphere[3]>=0)eT(J,K.looseSphere,X);return!0})",()=>"(function($,Z,Q,X,J=null){if(Q)return YX($,Q,zj,0,X);let K;{if(!KC($)){rb($);}K=$.poseBound;}if(K[3]<0)return!1;let V=J??VX($,Z),Y=S$($).bindCorrection,U=V.poseBound;if(V.poseSerial!==V.serial||V.poseCorrection!==Y||U[0]!==K[0]||U[1]!==K[1]||U[2]!==K[2]||U[3]!==K[3]){let q=Z;if(Y)f(Z,0,Y,0,aP,0),q=aP;let z=bT(q,K[0],K[1],K[2],K[3],V.pose);V.poseFinite=i(z.x+z.y+z.z+z.radius),V.poseSerial=V.serial,V.poseCorrection=Y,U.set(K)}return C9(V.pose,X),V.poseFinite})",()=>"(function($,Z,Q){let X=Q.frames;if(!X||X.revision!==Q.recordRevision||!$.visible||$.rigMinted||(Q.held?.size??0)>0||Q.groups.some((K)=>K.view!==null))return!1;let J=X.nodes;if(J.length>0&&Z.placed)return!1;if(J.length===0)return!0;if($.skinBind)return $.rig===null&&$.mixer.activeLayerList.length===0&&$.skinParent!==null&&$.skinParent.character!==null;if(D8($)||$.mixer.inertia||$.bones||$.nativeRelease||!Mj($,Z,J))return!1;for(let{clip:K}of $.mixer.activeLayerList){let V=B1(K);if(!V)return!1;for(let Y of J)for(let U=Y;U>=0;U=$.asset.parsed.nodes[U].parent)if(V.nodes.has(U))return!1}return!0})",()=>"(function($,Z,Q,X=!0){let J=n$($),K=$.rig;if(J!==J||K===null||$.replayRow||x8||$.ragdoll||Z.ragdollPose||$.skinBind)return!1;let V=jh($,X);for(let Y=0;Y<Q.length;Y++)for(let U=Q[Y];U>=0;U=K.nodes[U].parent)if(V.includes(U))return!1;return!0})",()=>"(function($,Z,Q){let X=n$($),J=l($);if(J.setRootMatrix(Q),$.readerFrame===X)return;let K=J.nodes.length,V=H3.get($);if(V?.stood.length!==K)H3.set($,V={clock:NaN,stood:new Float64Array(K).fill(NaN),marks:new Uint8Array(K),list:new Int32Array(K),path:new Int32Array(K)});if(V.clock!==X)V.stood.fill(NaN),V.clock=X;U8($);let{stood:Y,marks:U,list:q,path:z}=V,j=J.pose,G=$.mixer.restPose,B=0;for(let M=0;M<Z.length;M++){let L=0;for(let F=Z[M];F>=0&&Y[F]!==X&&U[F]===0;F=J.nodes[F].parent)z[L++]=F,U[F]=1;while(L>0){let F=z[--L];q[B++]=F;for(let H=F*10,N=H+10;H<N;H++)j[H]=G[H]}}if(B===0)return;_6($.mixer,j,U,q,B),cK(J,$.bones,$.bodyFrame,U);for(let M=0;M<B;M++){let L=q[M];J.restandBone(L),U[L]=0,Y[L]=X}zh+=B})",()=>"(function($,Z,Q){let X=$T.get($),J=$.hiddenMeshNodes;if(X?.rig===Z&&X.hidden===J&&V0(X.hands,Q))return X.nodes;let K=[];for(let Y of Q)K.push(Y.index);for(let Y of Tj($.asset))if(!J.has(Y.node)&&Q.some((U)=>U.name===Y.bone))K.push(Y.node);let V=Int32Array.from(K);return $T.set($,{rig:Z,hands:[...Q],hidden:J,nodes:V}),V})",()=>"(function($){let Z=$.readerVisual;if(Z===null)return;let Q=l($).nodes.length,X=D8($)!==null||$.ragdoll!==null||Z.ragdollPose||K1($.nativeRelease)?null:rU($,Q);UX($,Z,!1,X?.scratch.subarray(Q*10,Q*26)??null)})",()=>"(function($,Z){let Q=l($);let X=uK($)>0?uK($):0.016666666666666666;let J=$.mixer.activeLayerList;for(let V=0;V<J.length;V++)J[V].time=Math.max(0,J[V].time-J[V].speed*X);W3($,Z);let K=Q.world;if(WK.length<K.length)WK=new Float32Array(K.length);WK.set(K);for(let V=0;V<J.length;V++)J[V].time=J[V].time+J[V].speed*X;W3($,Z);{let Z=ZT;let Q=_.get($),X=Q?.rootMoves,J=X===void 0?0:X[3]-X[7],K=Q!==void 0&&X!==void 0&&X[3]>=Q.table.prevT&&J>0;for(let V=0;V<3;V++)Z[V]=K&&X!==void 0?(X[V]-X[4+V])/J:0}for(let V=0;V<3;V++)QT[V]=ZT[V]*X;OM:{let Z=WK,Q=QT;let J=$.rig;if(J===null||!(X>0)||!lO($)){$.nativeReleaseMotion=null;break OM;}let K=$.nativeReleaseMotion??=new Map;K.clear();for(let V of $.mixer.activeLayerList){if(!(V.currentWeight>0)||!(V.targetWeight>0))continue;for(let Y of V.clip.release?.nodes??[]){if(K.has(Y)||!bO($,Y))continue;let U=Y*16,q=J.nodeWorld(Y),z=[0,0,0];for(let j=0;j<3;j++)z[j]=(q[U+12+j]-Z[U+12+j]+Q[j])/X;K.set(Y,z)}}}OZ($,K$)})"]},function(){return[()=>"(function($){let Z=$.nativeRelease,Q=[],X=[];if(Z)for(let J of Z.groups){for(let K of J.pieceBySkin.keys())if(!Q.includes(K))Q.push(K);for(let K of J.pieceByNode.keys())for(let V=0;V<$.rigidPrimitives.length;V++)if($.asset.primitives[$.rigidPrimitives[V]].nodeIndex===K&&!X.includes(V))X.push(V)}$.releaseHeld=Q.length+X.length>0,$.releaseRowsFirst=!0,$.kept.heldRows=null,uU($,Q,X),$.pickEar?.()})",()=>"(function($,Z,Q,X){if(X.fresh)X.last.set(X.rows),X.fresh=!1;if(Q>=0){vL:{let Z$37=Q,Q$25=X.rows,X$14=X.last;{let Z=Z$37,Q=Q$25,X=X$14;let J=_.get($),K=J?.rigid??null;if(J===void 0||K===null)break vL;let V=Z*C8,Y=$.rigidData.subarray(V+k8,V+k8+1);U$(J.table,K.slot+V,Q),U$(J.table,K.previous+V,X),U$(J.table,K.slot+V+k8,Y),U$(J.table,K.previous+V+k8,Y)}}}else {TL:{let Q$24=X.rows,X$13=X.last;{let Q=Q$24,X=X$13;let J=_.get($)?.skins[Z];if(J===void 0)break TL;if(!J.held)break TL;let K=_.get($)?.table;if(K===void 0)break TL;U$(K,J.slot,Q),U$(K,J.previous,X)}}}X.last.set(X.rows)})",()=>"(function($,Z){let Q=$.skinBind;if(Q===null||q0($)===null)return;let X=XT.get($.asset);if(X===void 0)XT.set($.asset,X=$.skins.map((K,V)=>V));uU($,X,Wh);let J=l($);U8($),Nj($,J),Z.jointWorld();for(let K=0;K<$.skins.length;K++){let V=$.skins[K];N1($,Q,Z,K,V.rows),V.worldRows=!0;let Y=(V.jointCount+1)*16,U=I3($,K,Y);wC(U.rows);U.rows.set(V.rows.subarray(0,V.jointCount*16),16);x3($,K,-1,U)}$.readerPaletteFrame=n$($)})",()=>'(function($,Z,Q,X){if(X[0]=-1,X[2]=$.clock||$.line?1:0,!($.speed>0)||$.loop==="pingpong")return;let J=WX($.clip,Q)[Z],K=J<0?null:$.clip.channels[J];if(K===null||K.interpolation!=="LINEAR"&&K.interpolation!=="STEP"||K.times.length===0)return;let{times:V,values:Y}=K,U=V.length,q=(N)=>Y[N*3]===0&&Y[N*3+1]===0&&Y[N*3+2]===0,z=!1;for(let N=0;N<U&&!z;N++)z=q(N);if(!z)return;let j=K.interpolation==="LINEAR",G=(N)=>N<0?q(0):q(N)&&(!j||N+1>=U||q(N+1)),B=c3($),M=-1;while(M+1<U&&V[M+1]<=B)M++;let L=G(M);let F=1/0;for(let N=M+1;N<U;N++){if(G(N)!==L){F=V[N];break}}let H=$.clipStart+$.clipSpan;if(F>H)F=$.loop==="loop"?H:1/0;X[0]=L?1:0,X[1]=F===1/0?F:Math.max(0,F-B)/$.speed})',()=>"(()=>({position:{x:0,y:0,z:0},rotation:{x:0,y:0,z:0,w:1},scale:{x:1,y:1,z:1},size:{x:1,y:1,z:1}}))",()=>"(function($,Z,Q){let X=Z.wearer?.character??null,J=X?.readerVisual??null;if(X===null||J===null)return;if(_K[0]=Z.joint,!Fj(X,J,_K,J.world))I8(X,J);let K=(mh??=$c0I(209));l(X).nodeTransformInto(Z.joint,K);let V=Z.localWords;for(let U=0;U<4;U++)FT[U]=V[q$.hold+U];LK(K.rotation,FT);let Y=K.size??K.scale;f6(MT,0,K.position.x,K.position.y,K.position.z,K.rotation.x,K.rotation.y,K.rotation.z,K.rotation.w,Y.x,Y.y,Y.z),f(MT,0,V,q$.offset,Q.world,0),Zk($,J.world,Q.world)})",()=>"(function($){if($.scripted)$.scripted.frames=void 0;kY($,$.passes),b0($);for(let Z of $.materialSlots){if(Z.offset>=0)$.uniformArena?.free(Z.offset,Z.data.byteLength);Z.offset=-1,Z.dirty=!0}for(let Z of $.skinnedModelSlots){if(Z&&Z.offset>=0)$.uniformArena?.free(Z.offset,Z.data.byteLength);if(Z)Z.offset=-1,Z.written=-1}$.storageArena=null,$.uniformArena=null})",()=>"(function($,Z,Q){let X=W9,J=$$(Z);for(let K of Q){let V=Z.asset.primitives[K];if(V.skinIndex===null)continue;let Y=Z.skinnedModelSlots[K];if(!Y)Y={data:new Float32Array(Kv),offset:-1,written:-1,rig:null,rootStamp:0,nodeWrite:0},Z.skinnedModelSlots[K]=Y;if(!Zp(Z,Y,J,V.skinIndex,V.nodeIndex))continue;Y.outlineStretch=void 0,Y.outlineKey=void 0;let U=Z.rig,q=J1(Z.nativeRelease,null,V.skinIndex);if(X1(Z.nativeRelease,null,V.skinIndex,Y.data,X.model,1),k0(Y.data,X.model,Y.data,X.modelInverse),Y.offset<0)Y.offset=$.alloc(Y.data.byteLength);$.write(Y.offset,Y.data),Y.written=q?-1:Y.offset,Y.rig=J===null?U:null,Y.rootStamp=U?.rootStamp??0,Y.nodeWrite=U?.modelWriteOf(V.nodeIndex)??0}})"]},function(){return[()=>"(function($,Z,Q,X,J,K,V){if(!j9($)||!$.shadowVisible)return!1;for(let z=0;z<$.skins.length;z++)if(Qj($,z)===void 0)return!1;UX($,Z);let Y=Gp($,Q);if(!Y&&$.rigidPrimitives.length===0||!V(Z))return!0;let U=K.length;let q=Y?Bp($,Q,X,J,K,U):X;Mp($,Q,q,J,K,U);return !0})",()=>"(function($,Z,Q,X,J,K){let V=$.rigidPrimitives.length>0&&$.rig!==null?A7():null;if(V===null)return;let Y=l($),U=Q;for(let q=0;q<$.rigidPrimitives.length;q++){let z=$.rigidPrimitives[q];if($.materialSlots[z].pointCollapsed)continue;let j=$.asset.primitives[z],G=cz(j);if(!G)continue;let B=Y.nodeWorld(j.nodeIndex);rQ.modelMatrix.set(B.subarray(j.nodeIndex*16,j.nodeIndex*16+16)),rQ.bounds=G.bounds;for(let M of V.raycastInstances(Z,Gk,G.geometry,{maxDistance:U,firstHitOnly:X}))J.push({distance:M.distance,point:[M.point[0],M.point[1],M.point[2]],normal:[M.normal[0],M.normal[1],M.normal[2]],node:j.nodeIndex,meshPrimitive:j.primitiveIndex,triangle:M.faceIndex,u:M.barycentric[0],v:M.barycentric[1]});if(X)U=Hk(J,K,U)}})",()=>'(function($,Z,Q,X){if(X!==void 0&&X.dimension!=="3d")return O3(S3($,X),X.dimension,0,X.sortGrid);if(!Z||!Q)return 0;return($.world[12]-Z.camX)*Q[0]+($.world[13]-Z.camY)*Q[1]+($.world[14]-Z.camZ)*Q[2]})',()=>"(function($,Z,Q,X,J){let K=$.body.scale>0?$.body.scale:1;if(!J||Z.scripted?.levelView!==$||$.pixel!==X||$.scale!==K){for(let[V,Y]of $.parts){let U=Z.materialSlots[V],q=fK(Z.asset.primitives[V],X,K,U.heldLevel);if(q!==Y.level)return!1;if(U.level=q,J)U.heldLevel=q}$.pixel=X,$.scale=K}return Ck($,Z,Q,J)})",()=>"(function($,Z,Q,X,J,K){if($.parts.set(Q,{draw:X,level:J,hidden:K}),!$.looks.some((V)=>V.record===X.record&&V.variant===X.variant))$.looks.push(X);if((eK(Z.asset.parsed)?.[Q]??-1)>=0)$.twins.push(Q)})",()=>"(function($,Z,Q,X){let J=$.body,K=mT(X);if(Q===null||J===null||!(K>0))return null;let V=mJ(X.camera.projection,X.camera.isOrthographic),Y=n7($,Z.world,Ip),U=Math.max(c(Y.x-Q.camX,Y.y-Q.camY,Y.z-Q.camZ)-Y.radius,0),q=vj($,Z,xp);TK.metres=q3(kT,U,V,J.table.lodBias,K);let z=q3(kT,Math.max(c(q[0]-Q.camX,q[1]-Q.camY,q[2]-Q.camZ)-q[3],0),V,J.table.lodBias,K);TK.levelMetres=z<J.own?0:z;TK.step=Gx(U);return TK})",()=>"(function($,Z,Q,X){if(!(Z>0)||!$.index)return-1;let J=$.levels;for(let K=J.length-1;K>=0;K--){let V=J[K];if(V.index===null)continue;if(V.error*Q<=(X===K?Z*wk:Z))return V.indexCount<$.indexCount?K:-1}return-1})",()=>'(function($,Z,Q,X,J,K,V){let Y=Q==="3d"||Q===void 0,U=Y?Z:O3(X,Q,Hv($.record),K),q=Y?$.record.shade.renderOrder:0,z=$.record.assembled.coversWhole===!0,j=$.record.sceneColor;$.command.readsSceneColor=j;let G=Gv($.record.assembled);if($.back)$.back.readsSceneColor=j,J.push({command:$.back,sortDepth:U,sortOrder:q,coversWhole:z,adds:G,bound:V});J.push({command:$.command,sortDepth:U,sortOrder:q,coversWhole:z,adds:G,bound:V})})',()=>"(function($,Z,Q,X,J){let K=$.skinBind;if(K===null||!tY($,K,X,Q,Z.rig.rootMatrix,Z,Rj,0))return!1;if(J===void 0)return!0;let V=W1(K,X);let Y=V>=0?X6(K,V):-1;if(Y<0)return l($).nodeSizeInto(X,J),!0;return Z.rig.nodeSizeInto(Y,J),l($).nodeSizeInto(X,vK,V),J.x*=vK.x,J.y*=vK.y,J.z*=vK.z,!0})",()=>"(function($,Z){let Q=pk.get(Z);if(Q?.below.length===$.nodes.length)return Q;let X={below:new Float64Array($.nodes.length),chainScale:new Float64Array($.nodes.length)};return uj($,[{clip:Z,maskNodes:null}],Ap,X.below,X.chainScale),pk.set(Z,X),X})"]},function(){return[()=>"(function($){let Z=lk.get($);if(Z!==void 0)return Z;let Q=new Float64Array($.nodes.length).fill(-1);for(let J=0;J<$.skins.length;J++){let K=$.skins[J],V=E6($,J);for(let Y=0;Y<K.joints.length;Y++){let U=K.joints[Y];if(U<0||U>=Q.length)continue;let q=aK(V,Y*6,K.inverseBindMatrices,Y*16);if(q>Q[U])Q[U]=q}}return te(Q,$);})",()=>"(function($,Z,Q,X,J,K){let{corners:V,correction:Y}=sk($),U=rK({nodes:$.nodes,layers:Z,bones:null,boneNode:()=>-1,corners:V,reach:X,chainScale:J,stretchedBy:K},Q);if(Y!==null&&U[3]>=0){let q=U[0],z=U[1],j=U[2];U[0]=Y[0]*q+Y[4]*z+Y[8]*j+Y[12];U[1]=Y[1]*q+Y[5]*z+Y[9]*j+Y[13];U[2]=Y[2]*q+Y[6]*z+Y[10]*j+Y[14];U[3]*=ak(Y)}return U})",()=>"(function($,Z,Q,X){let J=Math.min(Q,Math.floor($.length/6)),K=!1;for(let V=0;V<J;V++){let Y=V*6;if(!($[Y]<=$[Y+3]))continue;if(!isFinite($[Y]+$[Y+1]+$[Y+2]+$[Y+3]+$[Y+4]+$[Y+5]))return!1;K=!0}if(!K)return!1;return X[0]=Z[12],X[1]=Z[13],X[2]=Z[14],X[3]=0,!0})",()=>"(function($,Z,Q,X){let J=Z.asset.parsed,K=Q.layers.activeLayerList;$X($,rk(J),0,X);if(K.length===0)return $;let v$75;op:{let $$107=(Zy.set(zy(Q,J,K).sphere),Zy),Z$126=Q,Q$81=J;{let $=$$107,Z=Z$126,Q=Q$81;let X=Z.layers.inertia;if($[3]<0||!nK(X)){v$75=$;break op;}let J=Z.layers.activeLayerList;let K=J.length===1&&J[0].maskNodes===null&&pj(X,bj)===0?ok(Q,J[0].clip):zy(Z,Q,J);$[3]+=Vy(X,Q.nodes,K.below,K.chainScale,tk(Q));v$75=$;}}return $X($,v$75,0,X)})",()=>"(function($,Z,Q){let X=$.reach,J=$.layers.inertia,K=pj(J,bj)>0,V=K?J?.offsets[0]??null:null,Y=K?J?.offsets[1]??null:null,U=X.clips.length===Q.length&&X.below.length===Z.nodes.length&&X.a===V&&X.b===Y;for(let q=0;U&&q<Q.length;q++)U=X.clips[q]===Q[q].clip&&X.masks[q]===Q[q].maskNodes;if(U)return X;if(X.below.length!==Z.nodes.length)X.below=new Float64Array(Z.nodes.length),X.chainScale=new Float64Array(Z.nodes.length);uj(Z,Q,X.sphere,X.below,X.chainScale,K?bj:void 0),X.clips.length=0,X.masks.length=0;for(let q of Q)X.clips.push(q.clip),X.masks.push(q.maskNodes);return X.a=V,X.b=Y,X})",()=>"(function($,Z){let Q=$.asset.parsed;U8(Z);let X=hj.get(Q);if(X===void 0)X={pose:d$(Q.nodes),world:new Float32Array(Q.nodes.length*16),correction:X8(Q)},hj.set(Q,X);return _6(Z.layers,X.pose),DZ(Q.nodes,X.pose,X.world),X.world})",()=>"(function($,Z,Q,X){let J=$.asset.parsed,K=hj.get(J)?.correction??null,V=J.skins[Z],Y=V.joints.length;if(k9.length<Y*16)k9=new Float32Array(Y*16);v$(V,Q,k9);for(let U=0;U<Y;U++){if(K!==null)f(K,0,k9,U*16,mj,0);else mj.set(k9.subarray(U*16,U*16+16));f(X,0,mj,0,k9,U*16)}return Y})",()=>"(function($,Z,Q,X,J,K,V,Y){if(!(Y>0))return 0;let U=X.x-J,q=X.y-K,z=X.z-V;if(Math.sqrt(U*U+q*q+z*z)>X.radius+2*Y)return 0;let j=$.asset.parsed,G=jy($,Z),B=0;for(let M=0;M<j.skins.length;M++){let L=p7(j,M);if(!L)continue;let F=Gy($,M,G,Q),H=Ky(L,k9,0,F,J,K,V,Y,null,b7(j,M),Z);if(H>B)B=H;if(B>=1)return 1}return B})",()=>"(function($,Z,Q,X,J,K,V){let Y=$.animStates.get(Z);if(Y===void 0)return!1;let v$29;{let $=Y;let Z=_.get($)?.block??null;v$29=Z===null?null:{slot:Z.slot/16,previous:Z.previous/16};}if(v$29===null)return!1;let U=dj($,Y,Z.world);if(q5[0]=U.x,q5[1]=U.y,q5[2]=U.z,pK(Q,q5,U.radius)===null||!V(Z))return!0;let q=$.asset.parsed,z=jy($,Y),j=K.length,G=X;for(let B=0;B<q.skins.length;B++){let M=p7(q,B);if(!M)continue;let L=Gy($,B,z,Z.world),F=K.length;if(dK(M,b7(q,B),k9,0,L,Q.origin,Q.direction,G,J,K),!J||K.length===F)continue;if(F>j&&K[j].distance<=K[F].distance)K.length=F;else K[j]=K[F],K.length=j+1;G=K[j].distance}return!0})"]}],$c0XU=[0,8,16,24,29,35,44,50,56,65,72,80,88,95,103,109,117,122,126,132,139,146,152,161,167,171,178,184,191,196,205,213,223];var $c0S,$c0D=()=>eval($c0S);function $c0E(s){$c0S=s;return $c0D()}$c0C=$c0K($c0T,$c0XU,$c0E,232,4420850398789632);var $c0I=$c0C.i;function $c0P(f,h,k){h[k]=f;return f}
;const{$19:MJ,$3F:BJ,$85:bB,$Fv:DU,$Tm:nF,$U7:uT,AbP:Q6,AnY:w3,Anw:G1,B0s:wT,B3n:u1,BUt:x9,BhV:IU,BxK:$G,C5q:UI,C7h:iT,CDb:V0,CHQ:f,CKx:aN,CPy:w1,CV3:q3,Czu:kG,D2u:uJ,D4c:P7,D6P:O1,EFh:cV,Ee_:nT,EiQ:H$,EtH:t$,F4u:bD,FAr:R3,FKD:c$,Fgs:jK,FyT:CY,G7z:Z4,GMn:hB,GUg:WU,GZ7:T9,H4r:eN,HHj:RT,HL_:VI,HfE:E1,HnT:G7,IWJ:b5,IjU:XG,Iqo:l$,Isb:s0,JDf:TN,JFU:qJ,JOV:V6,J_a:S1,Jnq:rM,KLy:fD,KOT:HU,KVW:aZ,KkB:hT,LSp:S8,MVs:bK,MX4:B4,Mit:X8,MvF:JI,N8U:Rq,NDn:y0,Nvu:B0,OHa:_T,OiV:tN,Otq:XI,PSg:f7,PTQ:MX,QfU:k0,Qw6:Y$,QwT:vN,Qyu:eF,R2N:K$,R2P:pT,SH8m:sX,SOb:DY,T5e:tT,TSz:AQ,Tkv:g9,To5:KK,Toe:MZ,U$A:b9,UUC:m8,UV$:aT,UYK:QG,UjB:hM,VJs:mD,VP5:hQ,W5v:h5,Weq:mJ,WmQ:aM,Wqm:EJ,WxC:nq,X2X:MQ,X7r:tX,XFy:_F,XhT:xU,Y0i:VU,Yom:j1,Ywc:cT,Yy6:R1,ZZw:j7,_MH:h3,_yk:s,a6O:lx,aI3:rF,aUt:IJ,aXK:s2,aXl:ZK,ag$:u6,aj7:EF,bFu:AG,bLw:O,bRS:mF,bUl:$P,bXy:r7,bZ8:v0,baH:EQ,cBV:$I,cGF:Wx,cc6:fT,cvT:lF,dQX:yQ,dlA:fF,drP:bT,e1O:qq,fLS:ZI,fRd:c,fVj:n4,fYG:fz,f_1:pK,frJ:C$,gdn:f6,gow:_3,gqQ:L9,h1H:I6,h1y:i,hWE:Eq,iDo:NU,iMS:hK,iUJ:oT,igL:pB,j8Z:A8,jB0:x$,jJb:bF,jYa:WJ,jox:_q,jpp:fj,ju0:Wz,kCP:XZ,kvy:QK,lAA:AN,lH4:p$,lb_:gN,leZ:nQ,m1u:Y3,mde:g7,mi9:i2,moE:P$,msN:M6,nCD:lT,nNv:ET,nRE:eM,oeT:U5,opK:U3,ouX:Xy,owT:E3,ozr:Tx,p2g:oj,pD7:uD,pLP:D$,pPG:XK,pSo:Jy,pcf:X9,pk6:Q4,qa9:QI,qd6:ZG,r5W:cx,rRm:SU,rbQ:JP,rgH:Jv,rn5:KI,rpN:aB,rpz:fB,s4D:YI,s6B:dT,sD$:_J,sGE:_1,sNa:d0,sq5:NJ,t5K:dx,t9J:f5,tEP:dF,tUx:oX,taY:E8,ts0:j$,tsB:fJ,tvJ:cF,uGX:fQ,uZN:sD,ubO:mT,uceT:rZ,un5:NP,vUE:rp,vqE:uF,wRZ:uY,wpg:O3,x$i:C9,xR1:a0,xRo:rN,xip:hF,xzE:t2,ydq:A7,yfJ:$4,yld:J0,yu7:GJ,za_:H9,zao:sT,zay:pF,zkh:ej}=$Lr;;;;;var __sc=/*@__PURE__*/(()=>globalThis.__spawnEngineConsole??=Object.create(console))();
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;var ep={};rp(ep,{writePoseSeenSphere:()=>KQ,writePoseRider:()=>fU,writeCharacterLeftOut:()=>s7,wornNearHidden:()=>uS,warmPoseKernel:()=>lH,wantPoseReadback:()=>UQ,unseenInputsSerial:()=>uk,unseenBodyWakes:()=>MC,unmatchedJointWorldInto:()=>mZ,tickCharacter:()=>cC,takeShapeFollowsOwed:()=>AP,takePoseSlot:()=>xH,takeParamsWrite:()=>kS,takeLandedShareReader:()=>Ik,syncCharacterScriptedMaterial:()=>Vz,syncCharacterFlash:()=>qj,syncCharacterClipPlane:()=>J5,stepRigReach:()=>NM,statePosePlace:()=>TH,statePoseOwner:()=>CH,stashMixerLayers:()=>Iy,stashBodyPasses:()=>XM,standStalePoseBound:()=>Hj,standReaderPose:()=>I8,standReaderPalettes:()=>UX,standPosePlace:()=>NH,standHordeMember:()=>pp,stagedLookReading:()=>nI,stageArrivingPose:()=>iC,skinBoundSpansAlongPlanes:()=>hS,skinBoundCasterSphere:()=>JC,skinBoundBodySphere:()=>aQ,shiftJiggleRenderOrigin:()=>KD,shiftCharacterRenderOrigin:()=>cS,setScreenReplayLayers:()=>Jk,setRowClips:()=>Hy,setPoseView:()=>HH,setPoseRenderOrigin:()=>FH,setPosePressureForMeasurement:()=>WL,setPoseMotion:()=>LH,setPoseBodyPlace:()=>gH,setKeptAuthoredClips:()=>Ny,setCharacterPiecesOwed:()=>zS,setCharacterPiecesHeld:()=>MS,setCharacterMorph:()=>XX,setCharacterMixer:()=>a3,setCharacterJiggle:()=>VK,setCharacterHoldsWorn:()=>GS,setCharacterHeadsetPose:()=>$j,setCharacterFingers:()=>e3,setCharacterBoundListener:()=>SC,setCharacterBones:()=>r3,setAuthoredClipLibrary:()=>Fy,scriptedRecordMoves:()=>pI,scriptedClaimsOwed:()=>xk,scriptedCharacterTexturesComing:()=>Xx,scriptedCharacterTextureArriving:()=>Bz,scriptedCharacterPrimitives:()=>Cj,scriptedCharacterPrimitiveOverlay:()=>Hx,scriptedCharacterPrimitiveMasks:()=>Lx,scriptedCharacterPrimitiveEligible:()=>H6,scriptedCharacterPrimitiveCasts:()=>Fx,scriptedCharacterPictures:()=>Qx,scriptedCharacterOutlineMaskDraw:()=>qx,scriptedCharacterEyesDraw:()=>Nx,screenReplayStands:()=>xC,sameJiggleSelection:()=>ax,rigReachGrounds:()=>WM,rigReachBoundInputs:()=>IM,retainRestingBody:()=>Pk,restingPoseSeen:()=>LC,restingBodyDraws:()=>Dk,restCharacterGate:()=>vC,reresolveHordeAnimStates:()=>bp,replayDrawsBody:()=>Kk,refreshHordeAuthoredClips:()=>hp,refreshClipAddressesOnMixerState:()=>z5,refreshAuthoredFramesOnMixerState:()=>j5,refreshAuthoredClipsOnMixerState:()=>G5,refitVerdict:()=>W0,refitHullHiddenCaster:()=>mC,readerPoseStoodCount:()=>kC,readPoseTruth:()=>Kq,readArrivingClips:()=>xS,raycastHordeMember:()=>ap,raycastCharacterPose:()=>Bk,raycastCharacterPart:()=>Lk,poseTableWrites:()=>xN,poseTableOf:()=>q6,poseTableCensus:()=>NN,poseSlotEpoch:()=>zL,poseSightFor:()=>o1,poseRiderStands:()=>AL,poseRiderRows:()=>gL,posePosed:()=>j9,posePoseRows:()=>LN,posePlaceRefusal:()=>AH,posePaletteSlice:()=>JJ,poseMovedThisFrame:()=>qH,poseMixerNow:()=>U8,poseEveryBodyForGlass:()=>UN,poseCasts:()=>s1,poseBodyOf:()=>q0,poseAnimatingCount:()=>HN,poseAnimates:()=>KJ,pointPoseSlot:()=>e1,placeRigReach:()=>HM,placeMoves:()=>nU,placeJiggle:()=>zD,parseWitnessSteps:()=>Ok,packOwedPasses:()=>tC,onSaviFaceClipsArrival:()=>My,notePoseWorld:()=>gC,notePoseWalled:()=>dL,notePoseRiderSight:()=>nL,notePoseOwner:()=>wj,nextCharacterParsePiece:()=>qS,newPoseGateWords:()=>lL,namePosePlace:()=>PH,moveCharacterRuntime:()=>NS,materialMixRevision:()=>iK,markWornReadsMoved:()=>nS,leavePoseRider:()=>yL,leavePosePlace:()=>IH,leavePose:()=>b0,leaveCharacterScriptedScene:()=>aI,landCharacterGate:()=>pC,judgePoseEyes:()=>zN,jointHoldTurn:()=>_j,jointAnchorOf:()=>Ej,jiggleSpringsSlowerThan:()=>YD,jiggleFeelsWind:()=>jD,hordeMemberWorldSphere:()=>dj,hordeMemberPoseRows:()=>lp,hordeMemberCasterMoved:()=>tp,hordeMemberBound:()=>np,hordeInstanceNearHide:()=>sp,hordeClipsOfAsset:()=>Rp,hordeBatchKey:()=>Yy,holdJigglePose:()=>Rz,growCharacterRuntime:()=>WS,growCharacterPickBox:()=>Mk,freeStatedPlace:()=>vH,freePoseSlot:()=>DH,forgetAuthoredClipWorld:()=>Ly,followArrivingParent:()=>TS,flushPoseFrame:()=>Xq,enterPoseRider:()=>kL,ensureCharacterShapeFollow:()=>Q5,endPoseTable:()=>HL,emitBodyView:()=>yj,dressCharacterRuntime:()=>t3,drawCharacterMixer:()=>IS,disposeHordeBatch:()=>mp,disposeCharacterRuntime:()=>HS,detachHordeBatchVisual:()=>up,createSkinnedChildBind:()=>M1,createRigReach:()=>LM,createJiggleVisualState:()=>tx,createHordeBatch:()=>Ep,createCharacterRuntime:()=>YS,createArrivingCharacter:()=>US,clipDoorAddressOf:()=>By,clearCharacterScriptedMaterial:()=>kQ,characterViewNearHide:()=>Y5,characterViewGates:()=>bC,characterSpansAlongPlanes:()=>mS,characterSkinWorldRows:()=>t7,characterSkinParent:()=>oS,characterScriptedLookStaged:()=>dI,characterScriptedDraws:()=>kk,characterRowAsksTick:()=>NC,characterRig:()=>l,characterRidingHeld:()=>xj,characterRiddenBodyFade:()=>RS,characterRestSphere:()=>K5,characterReachWeights:()=>rC,characterPosedBounds:()=>pS,characterPoseRests:()=>Bj,characterPoseDueAt:()=>WC,characterPiecesReading:()=>jS,characterPiecesHeld:()=>BS,characterPartsDebug:()=>RC,characterPartFrame:()=>Fk,characterOwnReach:()=>Wk,characterNearHidesWholeAt:()=>AS,characterMounted:()=>eC,characterMorphPadWorld:()=>c7,characterLightEpoch:()=>IC,characterLevelSphere:()=>vj,characterLevelRefusals:()=>yk,characterLeftOutParts:()=>Ij,characterHoldOf:()=>s3,characterHeldWhole:()=>FS,characterGateHide:()=>hC,characterFirstLookStaged:()=>cI,characterFarReach:()=>aS,characterFaceInto:()=>oC,characterEyeReaches:()=>PC,characterEyeReach:()=>DC,characterEyeClear:()=>TC,characterCasterScale:()=>Sj,characterBoundStands:()=>o7,characterBodySphere:()=>n7,carryCharacterScriptedMaterial:()=>rI,captureRefitCharacterVisible:()=>lC,buildSkinBoundHomes:()=>iY,bodyDrawResources:()=>kj,beginPoseFrame:()=>EH,batchScriptedParts:()=>sj,attachHordeBatchVisual:()=>_p,assetRidingParts:()=>Tj,arrivingScriptedProgramsStand:()=>eI,applyJigglePass:()=>UD,applyJiggleParams:()=>sx,applyCharacterMaterial:()=>JX,allocateCharacterRuntime:()=>Z5,allocateCharacterRig:()=>$5,advanceStagedScriptedLook:()=>iI,adoptLandedClipsOnMixerState:()=>Wy,LEVEL_WITNESSES_NONE:()=>Aj,LEVEL_WITNESSES_MINT:()=>gj,CharacterSection:()=>Hz});var nj=new WeakMap;class F5{constructor(){this.sources=[];this.output=[];this.programs=new Map;this.commands=new WeakMap;this.runs=[];this.orders=new Float64Array(0);this.rows=new Uint32Array(0);this.slice=null;}stands($,Z,Q){if(this.sources.length!==Q)return!1;for(let X=0;X<Q;X++)if(this.differs($[Z+X],X))return!1;return this.programsStand()}fit($,Z){let Q=$.length-Z,X=this.stands($,Z,Q);if(!X){Py(this,$,Z,Q);}return X}differs($,Z){return $!==this.sources[Z]||($.order??0)!==this.orders[Z]}programsStand(){for(let{batch:$,pipeline:Z}of this.programs.values())if($.pipeline()!==Z)return!1;return!0}}class m6 extends F5{constructor(...$lpa0){var $lpt0;super(...$lpa0),$lpt0=[],"gaps"in this?$lpd0(this,"gaps",$lpt0):this.gaps=$lpt0,$lpt0=[],"ends"in this?$lpd0(this,"ends",$lpt0):this.ends=$lpt0,$lpt0=0,"start"in this?$lpd0(this,"start",$lpt0):this.start=$lpt0,$lpt0=0,"before"in this?$lpd0(this,"before",$lpt0):this.before=$lpt0,$lpt0=0,"liveEnd"in this?$lpd0(this,"liveEnd",$lpt0):this.liveEnd=$lpt0,$lpt0=0,"next"in this?$lpd0(this,"next",$lpt0):this.next=$lpt0,$lpt0=!1,"changed"in this?$lpd0(this,"changed",$lpt0):this.changed=$lpt0,$lpt0=[],"target"in this?$lpd0(this,"target",$lpt0):this.target=$lpt0,$lpt0=null,"arena"in this?$lpd0(this,"arena",$lpt0):this.arena=$lpt0,$lpt0=-1,"offset"in this?$lpd0(this,"offset",$lpt0):this.offset=$lpt0}begin($,Z){if(this.target=$,this.start=this.liveEnd=$.length,this.next=0,this.ends.length=0,this.changed=!1,!Z)this.gaps.length=0}mark(){this.before=this.target.length-this.start}gap(){this.gaps.push(this.before,this.target.length-this.start)}live(){let $=this.gaps[this.next++],Z=this.gaps[this.next++],Q=this.target,X=Q.length;if(X-this.liveEnd!==Z-$)this.changed=!0;for(let J=this.liveEnd;!this.changed&&J<X;J++)this.changed=this.differs(Q[J],$+J-this.liveEnd);this.ends.push(X-this.start),this.liveEnd=X}emit(){let $=this.target,Z=this.rows.length?this.output:this.sources;$.length=this.start;for(let Q=0;Q<Z.length;Q++)$.push(Z[Q])}release(){if(this.offset>=0)this.arena?.freeAfterSubmit(this.offset);this.offset=-1,this.arena=null}batch($,Z){if($&&!this.changed&&this.programsStand()&&Z===this.arena&&(!this.slice||this.slice.buffer===Z.buffer)){this.emit();return}let Q=this.target,X=this.start;if($){let V=Q.slice(X);Q.length=X;let Y=0,U=0;for(let q=0;q<this.ends.length;q++){let z=this.gaps[q*2],j=this.gaps[q*2+1];while(Y<z)Q.push(this.sources[Y++]);this.gaps[q*2]=Q.length-X;while(U<this.ends[q])Q.push(V[U++]);this.gaps[q*2+1]=Q.length-X,Y=j}while(Y<this.sources.length)Q.push(this.sources[Y++])}let J=this.fit(Q,X);if(!J||this.arena!==Z){if(this.release(),this.arena=Z,this.rows.length)this.offset=Z.alloc(this.rows.byteLength),Z.write(this.offset,this.rows)}let K=this.offset<0?null:{buffer:Z.buffer,offset:this.offset,size:this.rows.byteLength};tj(this,Q,X,K,J)}}var ij=new WeakMap;function T8($){let Z=$.partBatch;if(Z?.single&&!$.bindGroups[3])$.bindGroups[3]=Z.single();return $}function sj($,Z,Q=0){let X=$.length-Q,J=Z&&ij.get(Z);if(X<2||!Z){J?.delete($);{let Z$1=Q;{let Z=Z$1;for(let Q=Z;Q<$.length;Q++)T8($[Q])}}return}let K=$[Q].partOwner??$[Q],V=J?.get($)?.get(K);if(!V){{let v$76;ea:{let J$33=J,V$14=V;{let J=J$33,V=V$14;let U,q=Q;for(;q<$.length;q++){let z=$[q];if(!aj(z))continue;if(U!==void 0&&z.partOwner!==U)break;U=z.partOwner}if(q===$.length){J?.delete($);{let Z$3=Q;{let Z=Z$3;for(let Q=Z;Q<$.length;Q++)T8($[Q])}}break ea;}if(!J)ij.set(Z,J=new WeakMap);V=new F5,J.set($,new WeakMap([[K,V]]))
v$76=(da[0]=J,da[1]=V,aa);}}if((ba=v$76)!==aa)return ba;J=da[0];V=da[1]}}let Y=V.fit($,Q);tj(V,$,Q,V.rows.length?Z.write(V.rows):null,Y)}function tj(a,b,c,d,e){return (tj=$c0C(0)).call(this,a,b,c,d,e)}function FX($,Z){return u6($)||oj(Z)}function aj($){let Z=$.draw;return!!$.partBatch&&!FX($.pipeline,$.order)&&!("indirect"in Z)&&!Z.runs&&(Z.instanceCount??1)===1&&(Z.firstInstance??0)===0}function Py($,Z,Q,X){let{runs:J,programs:K}=$;if(J.length=0,$.sources.length=X,$.orders.length<X)$.orders=new Float64Array(X);K.clear();let V=new Map,Y=new Map,U=-1,q=0;for(let j=0;j<X;j++){let G=Z[Q+j];$.sources[j]=G;let B=G.partOwner,M=$.orders[j]=G.order??0,L=J.length;if(!B)U=L;else if(aj(G)){let F=G.partBatch;let v$1;Dy:{let $=G;let Z=nj.get($);if(Z!==void 0){v$1=Z;break Dy;}let{partBatch:Q,draw:X}=$,J=$.indexBuffer,K=[S0($.pipeline),S0(Q.family),S0(Q.group)];for(let Y=0;Y<3;Y++){let U=(Y===2?Q.material:null)??$.bindGroups[Y];K.push(U?S0(U):0)}K.push(J?S0(J.buffer):0,J?.format,J?.offset??0,J?.size??-1,X.indexCount??-1,X.vertexCount??-1,X.baseVertex??0,X.firstIndex??0,X.firstVertex??0);for(let Y of $.vertexBuffers??[])K.push(S0(Y.buffer),Y.offset??0,Y.size??-1);let V=K.join("/");v$1=(nj.set($,V),V);}let H=v$1+(M?`|${M}`:"");let N=V.get(H);if(N!==void 0&&N>U&&N>(Y.get(B)??-1)){let I=K.get(F.family);if(!I){let W=F.pipeline();if(W)K.set(F.family,I={batch:F,pipeline:W});else K.set(F,{batch:F,pipeline:W})}if(I){L=N;let W=J[L];if(Array.isArray(W))W.push(G),q++;else J[L]=[W,G],q+=2}}if(L===J.length)V.set(H,L)}if(L===J.length)J.push(G);if(B)Y.set(B,L)}if($.rows.length!==q*4)$.rows=new Uint32Array(q*4);let z=0;for(let j of J)if(Array.isArray(j))for(let G of j){if(G.partBatch)$.rows.set(G.partBatch.row,z);z+=4}}function Ty($,Z,Q,X,J){let K=Z.partBatch,V=K&&$.programs.get(K.family)?.pipeline;if(!K||!V)return T8(Z);let Y=$.commands.get(Z),U=Y?.vertexBuffers?.at(-1);if(Y?.pipeline===V&&Y.order===Z.order&&U?.buffer===Q.buffer&&U.offset===Q.offset&&U.size===Q.size&&!("indirect"in Y.draw)&&Y.draw.firstInstance===X&&Y.draw.instanceCount===J)return Y;let q={pipeline:V,bindGroups:[Z.bindGroups[0],Z.bindGroups[1],K.material??Z.bindGroups[2],K.group],vertexBuffers:[...Z.vertexBuffers??[],Q],indexBuffer:Z.indexBuffer,draw:{...Z.draw,firstInstance:X,instanceCount:J}};return MX(q,Z.order??0),$.commands.set(Z,q),q}var o$=Z4,vy={arrayStride:16,stepMode:"instance",attributes:[{shaderLocation:LX,offset:0,format:"uint32x4"}]},Sy=new WeakMap,rj=new WeakMap,H5=($)=>$===N5||$===X4;function Cy($,Z,Q,X,J,K){let V=rj.get(K);if(V!==void 0)return V;if(Q4($)||!Q.some((j)=>H5(j.binding)))return null;let Y=X.partSource(J,K);if(!Y)return null;let U=Z.getBindGroupLayout(Q.map((j)=>H5(j.binding)?{...j,buffer:{type:"read-only-storage"}}:j),"lume indexed skin rows");let q=[...Y.groups,U];let z=ej($,q)?{draw:U,pipeline:$4($,"lume indexed skin rows",q,q[1])}:null;return rj.set(K,z),z}function K4($,Z,Q,X,J,K,V,Y,U,q){let{maxVertexBuffers:z=8,maxVertexAttributes:j=16,maxStorageBufferBindingSize:G=134217728,maxUniformBufferBindingSize:B=65536,minStorageBufferOffsetAlignment:M=o$,minUniformBufferOffsetAlignment:L=o$}=$.limits??{};if(U>=z||LX>=j)return;let F=Cy($,Z,X,K,V,Y);let H=new Uint32Array(4);let N=[];let I=0;for(let v of J){let{binding:k,resource:{buffer:S,offset:C=0,size:E=S.size-C}}=v;if(k===0){if(C%64||E%64||S.size>G)return;H[0]=C/64,H[1]=E/64,N.push({binding:k,resource:{buffer:S}})}else if(H5(k)){let u=Math.max(o$,F?M:L),y=F?G:B,g=Math.floor(Math.min(S.size,y)/u)*u;if(g===0||C%o$||E>o$||I&&I!==g/o$)return;let w=Math.min(Math.floor(C/g)*g,Math.floor((S.size-g)/u)*u);if(C+E>w+g)return;if(!F)I=g/o$;H[k===N5?2:3]=(C-w)/o$,N.push({binding:k,resource:{buffer:S,offset:w,size:g}})}else N.push(v)}let W=q&&J4.get(q),P=W?H[2]*W.slots+W.index:0;if(P>4294967295)W=void 0;else if(W)H[2]=P;let x=`${I}/${W?.slots??0}/${W?.stride??0}`,D=g9(H$(Sy,Y),x,()=>({generation:-1}));return{family:D,material:W?.group,group:Z.getBindGroup({label:"lume scripted skin pages",layout:F?.draw??Q,entries:N}),pipeline(){if(D.generation!==Z.generation||D.handle===void 0||D.handle?.withdrawn){D.generation=Z.generation;D.handle=Z.warmScope(()=>ky($,Z,K,V,Y,x,I,F,W),"arriving");}return D.handle?.pipeline??null},row:H}}function ky($,Z,Q,X,J,K,V,Y,U){let q=Q.partSource(X,J);if(!q)return;let z=`${q.key}|skin-slots:${K}`,j=Z.peekRenderHandle(z);if(j&&!j.withdrawn)return j;let{vertex:G,fragment:B,...M}=q.descriptor();if(!B)return null;let{module:L,...F}=G,{module:H,...N}=B,I=Z.shaderTextOf(L),W=Z.shaderTextOf(H);if(I===null||W===null)return null;let P=$.limits?.maxInterStageShaderVariables??16,x=L5(I,V,P,!0,U),D=I===W?x:L5(W,V,P,!1,U);if(x===null||D===null)return null;let v=`${M.label} instanced skins`,k=q.options.lookPlane,S={...q.options,standIn:void 0,lookPlane:k&&(function(){let C=k(),E=L5(C.text,V,P,!1,U);return E===null?C:{module:Z.shaderModule(E,`${v} look plane`),text:E}})};return Z.getRenderPipeline(z,function(){let C=Z.shaderModule(x,v);return{...M,layout:Y?.pipeline??M.layout,label:v,vertex:{...F,module:C,buffers:[...F.buffers??[],vy]},fragment:{...N,module:x===D?C:Z.shaderModule(D,v)}}},S)}function L5($,Z,Q,X,J){let K=/struct Varyings \{([^}]*)\}/.exec($);if(!K)return null;let V=/struct VaryingsIo\{([^}]*)\}/.exec($),Y=(z)=>`@location(${z.split("@location").length-1}) @interpolate(flat) lumePartMaterial: u32,`;if((V??K)[1].split("@location").length>Q-($.includes("@builtin(front_facing)")?1:0))return null;let U=$.replace(K[0],`var<private> lumePart: vec4<u32>;
struct Varyings {${K[1]}  ${Y(K[1])}
}`);if(V){U=U.replace(V[0],`struct VaryingsIo{${V[1]}${Y(V[1])}}`).replaceAll("var o:VaryingsIo;","var o:VaryingsIo;o.lumePartMaterial=v.lumePartMaterial;").replace("var v:Varyings;","var v:Varyings;lumePart.z=o.lumePartMaterial;");}let q=function(z,j,G,B,M){let L=`var<uniform> ${z}: ${j};`;if(!U.includes(L))return;U=U.replace(L,`var<${B?"uniform":"storage, read"}> ${z}: array<LumePart${j}${B?`, ${B}`:""}>;
struct LumePart${j}{@size(${M}) value:${j}}`),U=U.replace(new RegExp(`(?<![.\\w])${z}\\.`,"g"),`${z}[${G}].value.`)};if(q("modelMaterial","ModelMaterial",J?`lumePart.z / ${J.slots}u`:"lumePart.z",Z,o$),q("skinnedModel","SkinnedModel","lumePart.w",Z,o$),J)q("material","Material",`lumePart.z % ${J.slots}u`,J.slots,J.stride);if(U=U.replaceAll("arrayLength(&jointMatrices)","lumePart.y").replaceAll("jointMatrices[","jointMatrices[lumePart.x + "),X){let z=/@vertex fn vs\(([^\n]*?)\) ?-> ?(Varyings(?:Io)?) ?\{/.exec(U);if(!z||!U.includes("var vsOut: Varyings;")||!U.includes("var<storage, read> jointMatrices:"))return null;let j=[...z[1].split(", ").filter((G)=>G!=="@builtin(instance_index) instanceIndex: u32"),`@location(${LX}) lumePartInput: vec4<u32>`];U=U.replace(z[0],`@vertex fn vs(${j.join()}) -> ${z[2]} {lumePart=lumePartInput;let instanceIndex=0u;`),U=U.replace("var vsOut: Varyings;","var vsOut: Varyings;vsOut.lumePartMaterial=lumePart.z;")}return U.replace(/(@fragment fn \w+\((\w+): Varyings\b[^\n]*?\{)/g,`$1
  lumePart.z = $2.lumePartMaterial;`)}function V4($,Z,Q,X,J){let K=1,V=0,Y=0,U=1;if(X==="+z")K=-1,U=-1;else if(X==="+x")K=0,V=1,Y=-1,U=0;else if(X==="-x")K=0,V=-1,Y=1,U=0;if($.fill(0),$[0]=Z[0]*K,$[2]=Z[2]*Y,$[5]=Z[1],$[8]=Z[0]*V,$[10]=Z[2]*U,$[13]=Z[1]*Q,J)$[12]=J[0],$[13]+=J[1],$[14]=J[2];$[15]=1}function HX($,Z){let Q=Z.geomScale,X=Z.model.offset;if(V4($,Q,0,Z.model.forward),$[13]=Q[1]*Z.groundOffset,X)$[12]=X[0],$[13]+=X[1],$[14]=X[2]}function Gl($,Z){let Q=Z.geomScale,X=Z.model.forward,J=Z.model.offset;if(Q[0]===0||Q[1]===0||Q[2]===0)return!1;let K=-(J?.[0]??0)/Q[0],V=-(Q[1]*Z.groundOffset+(J?.[1]??0))/Q[1],Y=-(J?.[2]??0)/Q[2];if(X==="+z")$[0]=-K,$[2]=-Y;else if(X==="+x")$[0]=-Y,$[2]=K;else if(X==="-x")$[0]=Y,$[2]=-K;else $[0]=K,$[2]=Y;return $[1]=V,!0}var U4=new Float32Array(16),q4=new Float32Array(16),z4=new Float32Array(16);function O9($,Z,Q){r7(U4,0,Z.position,Z.rotation,yy(Z,Q)),Ay(q4,Q),f(U4,0,q4,0,$,0)}function yy($,Z){let Q=Z.heldPlace;return Q!==void 0&&Q!==null?$.scale:Z.heldScale??$.scale}function Ay($,Z){let Q=Z.heldPlace;if(Q!==void 0&&Q!==null){$.set(Q);return}let J=Z.local;if(J){fa($,J);}else f6($,0,0,0,0,0,0,0,1,1,1,1);let K=Z.model.forward,V=Z.model.offset;if(Z.geomScale[0]!==1||Z.geomScale[1]!==1||Z.geomScale[2]!==1||Z.groundOffset!==0||K!==void 0||V!==void 0)HX(z4,Z),f($,0,z4,0,$,0)}var E0={skipped:0,drawn:0,slotRefused:0,noRecord:0,twinSide:0,sourceSide:0,sourceMoves:0,noSplit:0,noBox:0,arriving:0,noFrame:0,noEye:0};function M4($){if($.skins.length===0)return null;if(B4($)||$.meshes.some((X)=>X.targetNames.length>0))return null;let v$2;{let $$3=$.animations;{let $=$$3;let Z=new Map;for(let Q of $){let X=Q.name.toLowerCase();if(!Z.has(X))Z.set(X,Q)}v$2=[...Z.values()].filter(G4);}}let Z=v$2;if(Z.length===0)return null;let Q=$.nodes.filter((X)=>X.meshIndex!==null);if(Q.length===0||Q.some((X)=>X.skinIndex===null))return null;for(let X of $.animations)for(let J of X.channels){let K=W5(J.path);if(K>=0&&J.targetNode>=0&&J.targetNode<$.nodes.length&&!I5(J,K))return null}return{clips:Z.map((X,J)=>({key:X.name.toLowerCase(),index:J,clip:X,duration:O$(X)}))}}var A=4294967295,g$={nodes:0,levels:1,corrected:2,levelStart:3,levelNodes:4,parent:5,preorder:6,subtree:7,rest:8,order:9,chainStart:10,chainNodes:11,correction:12,morph:28,words:29},F4=16,n8={joints:0,source:1,right:2,words:3};function $Z($){let{count:Z,order:Q,orderPos:X,subtreeSize:J,parentOf:K,restPose:V,bindCorrection:Y}=e7($),U=new Int32Array(Z).fill(-1),q=0;for(let C of Q)q=Math.max(q,(U[C]=K[C]<0?0:U[K[C]]+1)+1);let z=new Uint32Array(q+1);for(let C of Q)z[U[C]+1]+=1;for(let C=0;C<q;C++)z[C+1]+=z[C];let j=Q.slice().sort((C,E)=>U[C]-U[E]),G=g$.words,B=G+q+1,M=B+Q.length,L=M+Z,F=L+Z,H=F+Z,N=new Uint32Array(Z+1);for(let C=0;C<Z;C++)N[C+1]=N[C]+(U[C]<0?0:U[C]%F4+1);let I=H+Z,W=I+Z+1,P=W+N[Z],x=[],D=[];$.meshes?.forEach(function(C,E){if(C.targetNames.length===0)return;x.push(Math.max(0,$.nodes.findIndex((u)=>u.meshIndex===E)),C.targetNames.length);for(let u=0;u<C.targetNames.length;u++)D.push(C.weights[u]??0)});let v=P+Z*s$,{u32:k,f32:S}=Z$(v+2+x.length+D.length);k.set([Z,q,Y===null?0:1,G,B,M,L,F,P,H,I,W]),k[g$.morph]=v,k.set([x.length/2,D.length,...x],v),S.set(D,v+2+x.length),S.set(Y??t$,g$.correction),k.set(z,G),k.set(j,B);for(let C=0;C<Z;C++)k[M+C]=K[C]<0?A:K[C];k.set(X,L),k.set(J,F),k.set(Q,H),k.set(N,I);for(let C=0;C<Z;C++){let E=C;for(let u=N[C+1];u>N[C];u--)k[W+u-1]=E,E=K[E]}return S.set(V.subarray(0,Z*s$),P),k}var NX=-1,x5=-2,j4=new WeakMap;function WX($,Z){let Q=j4.get($);if(Q?.length===Z)return Q;let X=new Int32Array(Z).fill(NX);for(let J=0;J<$.channels.length;J++){let K=$.channels[J],V=K.targetNode;if(V<0||V>=Z||X[V]!==NX||W5(K.path)!==2||!I5(K,2))continue;X[V]=K.values.every((Y)=>Y===0)?x5:J}return j4.set($,X),X}function D5($){return n8.words+$*17}function P5($,Z){let Q=$.length;let X=n8.words+Q;let {u32:J,f32:K}=Z$(D5(Q));J.set([Q,n8.words,X]);for(let V=0;V<Q;V++)J[n8.words+V]=$[V]>=0?$[V]:A;return K.set(Z.subarray(0,Q*16),X),J};var e={gap:0,cuts:1,placed:2,place:3,rest:4,worn:5,wornRest:6,wornBone:7,homes:8,knobCount:9,knobs:10,shapeCount:11,shapes:12,lists:13,hang:14,serial:15,words:16},b6={nodes:0,kinds:1,mats:2,words:3},E5=4294967294,_5=4294967293,u5=4294967292,w$={amount:0,zeta:1,gravity:2,wind:3,radius:4,limit:5,list:6,count:7,words:8},v8={owner:0,node:1,flags:2,radius:3,offset:4,tail:7,words:10},m5=1,T4=2,v4=4,a$={dirX:0,dirZ:1,speed:2,travelX:3,travelZ:4,origin:5,words:11},n0={bones:0,chains:1,waves:2,roots:3,rows:4,waveStart:5,chain:6,bone:7,follow:8,root:9,rowBones:10,words:11},h6={first:0,count:1,words:2},R$={node:0,parent:1,child:2,row:3,above:4,reach:5,follow:6,followCount:7,words:8},QZ={nodes:0,worlds:1,inverse:2,words:3},Ey={frame:0,rootT:1,rootQ:4,origin:8,clocked:14,clock:15,cuts:17,placed:18,airClock:19,airPhase:20,phased:21,mount:22,mode:39,carry:40,step:41,air:45,depths:49,words:56},_y={inited:0,particle:1,velocity:4,prevTip:7,bodyTip:10,swingOffset:13,swingTurn:16,swingShift:20,words:23},uy={center:0,tail:3,mid:6,radius:9,reach:10,live:11,words:12},my={tip:0,span:1,words:2};function S4($,Z){return Ey.words+$*_y.words+Z*uy.words+$*Z*my.words}var u0={root:0,mid:1,end:2,leg:3,arm:4,pole:5,poleSerial:6,words:7},i0={trunk:0,internalSign:1,crease:2,down:5,front:8,foreAxis:11,palm:14,radial:17,restElbow:20,restWrist:24,halfTurn:28,words:29},M2={targetDir:0,poleDir:3,swivel:6,down:9,front:12,hang:15,handAxis:18,handPalm:21,handThumb:24,handHinge:27,cosRoot:30,sinRoot:31,bend:32,hand:33,reach:34,internalSign:35,solved:36,swing:40,swBand:44,swMode:47,swAt:48,swBest:49,swBestMiss:50,swFound:51,swStep:52,swSide:53,swOutside:54,swInside:55,swHalvings:56,swHalf:57,swFrom:58,halfTurn:61,turnMost:62,extent:59,go:60,words:63},UZ=116,qZ=55,k4=30,y4={body:0,feet:UZ,words:UZ+B2*qZ},F2={serial:0,valid:1,pole:2,frame:5,drawn:9,words:12},n6={leftArm:0,rightArm:i0.words,words:2*i0.words},A4=0,g4=1,O4=2,w4=3,R4=4,$0={effectors:0,effectorsAt:1,feet:2,feetAt:3,front:4,feetOffset:7,drop:8,ground:9,gait:10,origin:11,poles:17,footSlots:18,effectorSlots:19,floor:20,seen:21,words:22},E4=0.0625,g0={d:0,n:1,x:2,y:3,z:4,on:5,frame:6,turned:13,turn:14,support:18,dy:19},zZ=0,L2=1,BV=2,j0={flags:0,bone:1,chain:2,share:9,face:10,target:13,ride:16,rideAt:17,rideTurn:20,ridePole:24,pole:27,rotation:30,weight:34,weightAt:35,weightAtLow:36,goal:37,rate:38,maxYaw:39,maxPitch:40,slot:41,serial:42,words:43},MV=1,FV=2,LV=4,HV=8,NV=16,WV=32,IV=64,xV=128,DV=256,PV=512,TV={serial:0,drawn:1,drawnAt:2,weight:5,target:6,now:9,live:10,owed:11,words:12},C0={bone:0,chain:1,legLen:8,restHeight:9,restReach:10,weight:11,weightAt:12,weightAtLow:13,goal:14,slot:15,serial:16,gait:17,handed:18,handedBy:19,ball:20,restRise:21,words:22},vV={serial:0,handled:1,anchorX:2,anchorY:3,anchorZ:4,anchorYaw:5,plantX:6,plantZ:7,plantLocalX:8,plantLocalZ:9,plantClipX:10,plantClipZ:11,locked:12,releasing:13,carrying:14,carryX:15,carryY:16,carryZ:17,weight:18,prevX:19,prevZ:21,prevLocalX:22,prevLocalZ:23,hasPrev:24,speed:25,clipSpeed:26,clipVelX:27,clipVelZ:28,clipClimb:29,prevLocalY:30,strideRun:31,strideSpeed:32,strideLast:33,outrun:34,conformOwned:35,clipStillSeconds:36,stepping:37,stepT:38,stepSeconds:39,stepFromX:40,stepFromY:41,stepFromZ:42,handed:43,handX:44,handY:45,handZ:46,flying:47,flyX:48,flyY:49,flyZ:50,flyShare:51,flyGround:52,floorY:53,floorShare:54,outWeight:55,outX:56,outY:57,outZ:58,normalX:59,normalY:60,normalZ:61,inFootX:62,inFootY:63,inFootZ:64,inHipX:65,inHipY:66,inHipZ:67,inClipX:68,inClipZ:69,inStrideX:70,inStrideZ:71,inSwingX:72,inSwingZ:73,inStrideKnown:74,inWeight:75,inLegLen:76,inRestHeight:77,inRestReach:78,live:79,carried:80,freeMode:81,heelLift:82,frame:83,job:83+qZ,tmp:83+qZ+k4,words:83+qZ+k4+M2.words},a8={inited:0,origin:1,pelvisOffset:7,pelvisTarget:8,seat:9,lastX:10,lastY:11,lastZ:12,hasLast:13,referenceY:14,slopeX:15,slopeZ:16,poseX:17,poseZ:18,planeFrom:19,velocityX:20,velocityZ:21,speed:22,space:23,spaceTurn:24,away:28,spaceSupport:29,stood:30,inFloor:31,frame:32,job:32+UZ,tmp:32+UZ+30,words:32+UZ+30+M2.words};var m$={clips:0,entries:1,entryWords:2},W$={floor:0,movesDrop:1,period:2,dirX:3,dirZ:4,feet:5,foot0:6,footWords:3},r8={hands:0,handsAt:1,words:2},e$={bone:0,right:1,chain:2,fingers:9,fingersAt:10,words:11},$8={joints:0,thumb:1,joint:2,axis:5,rest:14,cap:26,words:29},i6=5,H2=3,jZ={hands:0,words:1},Q$,SV=1,CV=2,kV=4,yV=8,AV=16,c6={weight:0,support:1,applied:2,words:2+i6*H2},N2={inited:0,hands:1,round:1+2*c6.words,held:2+2*c6.words,holdTurn:3+2*c6.words,tmp:7+2*c6.words,words:7+2*c6.words+M2.words};var m4=0.12;var f4=2;var W2=0.1;var I2=0.0001,b4=0.663;var h4=0.08,GZ=0.35,x2=10;var Nc=new Float32Array(y4.words);var p4=4096;function jA($,Z,Q,X,J,K=!0){ZZ($,Z,Q,e8,X,e8,J);i4(Z,MZ,K);{ZZ(l4,l4,e8,e8,e8,e8,o4)}}function FZ($,Z,Q,X,J,K,V,Y=MZ){ZZ($,Z,Q,X,J,K,V);try{{let $$4=Z,Z$5=Y;{let $=$$4,Z=Z$5;Z.run(OX,$[T.poseCount]),Z.run(IX,$[T.blendCount]),Z.run(SX,$[T.poseCount]),i4($,Z,!0);let Q=$[T.springsCount];Z.run(_X,Q),Z.run(EX,Q);let X=$[T.springsAfterCount];Z.run(RX,X),Z.run(wX,X),Z.run(TX,$[T.mountCount]),Z.run(vX,$[T.jobCount])}}}finally{{ZZ(l4,l4,e8,e8,e8,e8,o4)}}}function D2($,Z,Q,X){ZZ($,Z,Q,e8,e8,X,o4);let J=Z[T.poseCount];for(let K=0;K<J;K++)L4(K);{ZZ(l4,l4,e8,e8,e8,e8,o4)}}function i4($,Z,Q){let X=$[T.reachCount];Z.run(gX,X),Z.run(kX,X);for(let K=0;Q&&K<p4&&X>0;K++){Z.run(AX,X),Z.run(yX,X),Z.run(CX,X);let V=!1;for(let Y=0;Y<X;Y++)V=H4(Y)||V;if(!V)break}let J=$[T.gripCount];Z.run(PX,J);for(let K=0;K<f4&&J>0;K++)Z.run(xX,J),Z.run(DX,J)}var EV=W2,_V=1+Math.ceil(Math.log(GZ/I2)/(x2*W2)),BA=2,BZ={reads:0,passes:0,most:0,walked:0};function MA($,Z){if(BZ.reads+=1,BZ.passes+=$,BZ.walked+=$*Z,$>BZ.most)BZ.most=$}var uV=1000,f$=0,gV=T.words,OV=gV+1,b$=OV+1,e8=new Float32Array(0),l4=new Uint32Array(0),o4=new Float64Array(0),s4=4;var t4=new Uint32Array(1),FA=new Float32Array(t4.buffer);function LA($,Z){return t4[0]=$[Z],FA[0]}var HA=1.15;function fV(a,b,c,d,e,f){return (fV=$c0C(2)).call(this,a,b,c,d,e,f)}var I$=P0,d4=4;function c4($,Z,Q,X,J,K,V){for(let Y=0;Y<V;Y++){let U=K[Y];for(let q=U*10,z=q+10;q<z;q++)Q[X+q]=$[Z+q];for(let q=J*10+U*16,z=q+16;q<z;q++)Q[X+q]=$[Z+q]}for(let Y=J*wV,U=Y+16;Y<U;Y++)Q[X+Y]=$[Z+Y]}class LZ{constructor($){this.n=void 0;this.bake=void 0;this.tables=new Map;this.scratch=void 0;this.world=new Float64Array(0);this.state=new Float32Array(0);this.reachWords=0;this.gripWords=0;this.clips=new Map;this.rows=new Uint32Array(0);this.rowsF32=new Float32Array(0);this.closures=[];this.closureNext=0;this.everyNode=void 0;this.posed=void 0;this.view=null;this.levelHeld=!1;this.now=0.5;this.dt=0.5;this.n=$.nodes.length,this.bake=$Z($),this.posed=new Float32Array($9(this.n,0)),this.scratch=new Float32Array(I$+this.posed.length),this.everyNode=new Int32Array(this.n);for(let Z=0;Z<this.n;Z++)this.everyNode[Z]=Z}blockOf($){let Z=this.clips.get($);if(Z===void 0)this.clips.set($,Z=this.clips.size+1);return Z}nameClip($,Z){this.clips.set($,Z)}reset(){this.state.fill(0),this.levelHeld=!1}run($,Z,Q,X,J,K,V=[],Y=null,U=!1,q=null,z=!0){this.now=Z,this.dt=Q,this.runFrame($,X,J,K,V,Y,U,q,z)}runFrame($,Z,Q,X,J=[],K=null,V=!1,Y=null,U=!0){if(Q===null&&X===null)return;let q=this.n,z=Q===null?A:this.tableAt(Q.table),j=X===null?A:this.tableAt(X.table);if(this.holdState(Q?.stateWords??0,X?.stateWords??0),K!==null){if(K.reach!==null&&Q!==null)this.state.set(K.reach.subarray(0,Math.min(K.reach.length,Q.stateWords)),0);if(K.grip!==null&&X!==null)this.state.set(K.grip.subarray(0,Math.min(K.grip.length,X.stateWords)),this.reachWords)}let G=I$+$9(q,J.length);if(this.scratch.length<G)this.scratch=new Float32Array(G);if(this.world.length<this.scratch.length)this.world=new Float64Array(this.scratch.length);let B=this.scratch,M=$.pose,L=$.model,F=$.rootMatrix.a,H=$.rootMatrix.o,N=Y===null?null:this.closureOf(Y),I=N===null?this.everyNode:N.list,W=N===null?q:N.count;for(let w=0;w<W;w++){let b=I[w];for(let h=b*10,U0=h+10;h<U0;h++)B[I$+h]=M[h];for(let h=b*16,U0=h+16;h<U0;h++)B[I$+q*10+h]=L[h]}for(let w=0;w<16;w++)B[I$+q*wV+w]=F[H+w];let P=b$+R.layers0,x=P+J.length*a.words,D=x+(Q?.inputs.length??0),v=D+(X?.inputs.length??0),k=v+m9*F0.words;if(this.rows.length<k)this.rows=new Uint32Array(k+(k>>1)),this.rowsF32=new Float32Array(this.rows.buffer);let S=this.rows,C=this.rowsF32;if(S.fill(0,0,k),C[f$+T.nowT]=this.now,C[f$+T.nowTLow]=this.now-C[f$+T.nowT],C[f$+T.nowC]=C[f$+T.nowT],C[f$+T.nowCLow]=C[f$+T.nowTLow],C[f$+T.dt]=this.dt,Q!==null)C[f$+T.seenFrame]=this.state[a8.stood]+1;let E=this.view;if(E!==null){S[f$+T.seen]=E.seen,B[I$-N$]=1;let w=E.seen===w9||Q===null||fV(E.words,LA(Q.inputs,$0.seen),F,H,this.levelHeld,1);this.levelHeld=E.eye&&w,B[I$-i8]=this.levelHeld?1:0}S[gV]=b$,S[OV]=b$,S[T.reachList]=gV,S[T.reachCount]=Q===null?0:1,S[T.gripList]=OV,S[T.gripCount]=X===null?0:1,S[b$+R.rig]=0,S[b$+R.scratch]=I$,S[b$+R.layers]=J.length,S[b$+R.wearer]=A,S[b$+R.place]=A,S[b$+R.blend]=A,S[b$+R.morph]=A,S[b$+R.passes]=v;for(let w=0;w<J.length;w++){let b=J[w],h=P+w*a.words;S[h+a.clip]=this.blockOf(b.clip),S[h+a.flags]=b.override?l6:0,S[h+a.maskStart]=A,S[h+a.maskEnd]=A,C[h+a.speed]=b.speed,B[I$+$9(q,w)+KV.weight]=b.currentWeight}if(S.fill(A,v,v+m9*F0.words),Q!==null)S.set(Q.inputs,x),S[v+m0*F0.words+F0.inputs]=x,S[v+m0*F0.words+F0.state]=0,S[v+m0*F0.words+F0.table]=z;if(X!==null)S.set(X.inputs,D),S[v+y8*F0.words+F0.inputs]=D,S[v+y8*F0.words+F0.state]=this.reachWords,S[v+y8*F0.words+F0.table]=j;let u=this.bake,y=V||K!==null,g=V?Math.min(Z,BA):Z;if(y)c4(B,I$,this.posed,0,q,I,W);for(let w=0;w<g;w++){if(y&&w>0)c4(this.posed,0,B,I$,q,I,W);S[f$+T.rest]=V&&w>0?1:0;jA(u,S,B,this.state,this.world,U)}if(y){MA(g,W);}for(let w=0;w<W;w++)for(let b=I[w]*10,h=b+10;b<h;b++)M[b]=B[I$+b];$.updateWorldMatrices(null,Y)}closureOf(a){return $c0P($c0C(3),LZ.prototype,"closureOf").call(this,a)}tableAt($){let Z=this.tables.get($);if(Z!==void 0)return Z;return ga.call(this,$);}holdState(a,b){return $c0P($c0C(4),LZ.prototype,"holdState").call(this,a,b)}}var HZ=[OX,IX,SX,gX,kX,AX,yX,CX,PX,xX,DX,_X,EX,RX,wX,TX,vX];var bV=16,a4=65535;function hV($){return $<<16}function Z9($,Z){return new $(pV()?new SharedArrayBuffer(Z*$.BYTES_PER_ELEMENT):new ArrayBuffer(Z*$.BYTES_PER_ELEMENT))}var WA=2,e4=()=>performance.now(),f9=[],G0={stand:null,control:null,epoch:0,wave:0,bind:null,bound:0,stints:null,fresh:!1};function IA($){return{held:1,trial:0,posed:0,stint:new Float64Array(6),due:new Float64Array(Math.max(1,$)+1)}}function xA({held:$,posed:Z,due:Q}){let X=$+1<Q.length&&Z>=Q[$+1],J=$>1&&Z>=Q[$-1];if(X&&!(J&&Q[$-1]<Q[$+1]))return $+1;return J?$-1:$}function JG(){A8.ended=!0}function lV(){G0.bound=0;for(let $=f9.pop();$!==void 0;$=f9.pop()){{let $$99=$;{let $=$$99;G0.stand?.ended($),$.terminate()
}}}}var vA={run($,Z){A8.indexes+=Z;let Q=G0.control;if(Z<=1||Q===null||A8.threads===1)return MZ.run($,Z);let X=Math.min(Z,A8.threads*WA);{let $$8=Q,Z$9=HZ.indexOf($),Q$4=Z;{let $=$$8,Z=Z$9,Q=Q$4;G0.wave++;let J=hV(G0.wave);Atomics.store($,2,J|a4),Atomics.store($,5,Z),Atomics.store($,6,Q),Atomics.store($,4,0),Atomics.store($,3,X),Atomics.store($,2,J),Atomics.store($,0,G0.wave),Atomics.notify($,0)}}let v$4;r4:{let $$7=Q,Z$8=G0.wave;{let $=$$7,Z=Z$8;let Q=hV(Z);let X=0;for(;;){let J=Atomics.load($,2);if((J&-65536)!==Q){v$4=X;break r4;}let K=J&65535,V=Atomics.load($,3);if(K>=V){v$4=X;break r4;}if(Atomics.compareExchange($,2,J,J+1)!==J)continue;let Y=Atomics.load($,6),U=Math.ceil(Y/V),q=HZ[Atomics.load($,5)];try{for(let z=K*U,j=Math.min(Y,z+U);z<j;z++)q(z)}catch{Atomics.store($,7,1)}X+=1,Atomics.add($,4,1)}}}let J=v$4;b9.rendererChunks+=J,b9.laneChunks+=X-J;while(Atomics.load(Q,4)<X);}};function SA($,Z,Q){let X=G0.stand??=QG({name:"pose lane",url:()=>new URL($G("worker-pose-lane.mjs"),import.meta.url),options:{type:"module",name:"pose-lane"}});G0.fresh=!1;while(f9.length<$){let K=X.bear(JG,void 0,!1,!0);if(K===null)break;f9.push(K)}for(;G0.bound<f9.length;G0.bound++)f9[G0.bound].postMessage((Q[1]=G0.bound,Q));let J=Math.min($,f9.length);if(Atomics.load(Z,8)!==J)G0.fresh=!0,Atomics.store(Z,8,J),Atomics.notify(Z,8);return J}var gG=6*j$/180,CA=6,kA=0.2,OG=[1,1.15,0.8],wG=[90,105,80].map(($)=>$*j$/180),RG=[0.35,1,0.9],EG=[40,70,70].map(($)=>$*j$/180),yA=0.85,AA=0.6,gA=0.002,OA=1*j$/180,wA=30,i9=3,_G=0.5,RA=16,uG=0.75,EA=2,a6=0.1,nV=3,VG=35*j$/180,_A=1.25,uA=0.1,mA=3,fA=8,YG=2;function bG($,Z,Q){let{orderPos:X,subtreeSize:J}=Z.shape,K=(q,z)=>X[q]<=X[z]&&X[z]<X[q]+J[q],V="",Y=!1;for(let q of $.hands){let z=E2($,q);if(Q===null||!$Y(q,z))continue;{{let Y$7=Y,q$3=q,V$12=V;{let Y=Y$7,q=q$3,V=V$12;Y||=q.support.missed!==0;for(let j of X9(Q)){let G=Z.getBoneByName(j)?.index??-1;if(K(G,q.bone.index)!==(!z.reached&&K(G,z.bone.index))||K(q.bone.index,G))V+=j+JSON.stringify(Q[j])}
da[0]=Y,da[1]=V}}Y=da[0];V=da[1]}}let U=Y&&V!==$.toldTurns;return $.toldTurns=V,U}function bA($,Z){$.posedRead=$.posedRevision;let Q=$.posedRow??{},X=new Set,J=new Set;for(let K of X9(Q)){let V=Z.getBoneByName(K);if(V===null||!Q[K])continue;if(X.add(V.index),!kG(Q[K]))J.add(V.index)}for(let K of $.hands){for(let Y of K.fingers)Y.posedByRow=Y.joints.some((U)=>X.has(U.index));let V=K.chain;K.armPosedByRow=V!==null&&(X.has(V.root.index)||X.has(V.mid.index)||X.has(V.end.index)&&!J.has(V.end.index))}}var iV=1,oV=2,sV=4;function pA($,Z,Q){for(let X=0;X<$.length;X+=1)if((Z[$[X].index]&Q)!==0)return!0;return!1}var lA=6;var R8=[];function hG($,Z,Q,X,J,K,V,Y=[]){let U=$.door;if(U===null)return 0;let q=V>0&&i($.closedAt)?Math.max(0,K-$.closedAt):1/0;if(V>0)$.closedAt=K;if(!$.resolved||$.rig!==Q){{$.rig=Q;$.resolved=!0;$.hands=Q?$g(Z,Q):[];$.bonesByName.clear();$.heldRead.length=0;$.revision+=1;$.posedRead=-1;
}}if($.posedRead!==$.posedRevision){bA($,Z);}if($.hands.length===0)return 0;x$(R8);U.heldBy(X,R8);{let Q$6=U;{let Q=Q$6;let K;aA:{let Z=$.heldRead;if(Z.length>0&&dG(Z)){K=!1;break aA;}K=(Z.length=0,Z.push(...R8),!0);}for(let V of $.hands){if(K){rA($,Z,V);}x$(V.items);let Y=J(V.bone.index);if(V.reached=Y!==null,V.fingers.every((z)=>z.posedByRow))continue;let U=Y?.object??null,q=U===null?null:Q.itemOf(U,X);if(q===null){if(V.items.push(...V.heldIds),V.own!==(V.own=V.heldOwn??""))V.solvedItems.length=0;continue}V.items.push(q);for(let z of V.heldIds)if(z!==q)V.items.push(z);V.own=""}}}if($.hands.some((G)=>G.items.length>0)){{let Q=Y;na($,Z,Q);}}let z=aV(Y)+2*a6,j=0;for(let G of $.hands){let B=E2($,G);if(G.items.length>0){if(!R2(G,B,J)){Mg:{let Z$14=G,Q$9=B,X$5=Z,J$4=U,K$2=J,V$2=K;{let Z=Z$14,Q=Q$9,X=X$5,J=J$4,K=K$2,V=V$2;{if((ba=sa(Z,K,Q,X,$,J,V))!==aa){(ba);break Mg;}}}}}}else{if(G.support.byReach!==""){{let G$2=G;{let G=G$2;G.support.byReach="",G.support.active=!1;
}}}if(Hg(G,B,Z,U,J,q,z))cG($,G,Z,U,G.armPosed?null:B,null,K);else G.holding=!1,G.solvedItems.length=0,G.hasLastPose=!1,G.waited=0}let M=sA(G,B,J,K,V,z);if(M>0&&(j===0||M<j))j=M}return j}function aV($){let Z=0;for(let Q of $){if(Q.currentWeight!==Q.targetWeight)return NaN;if(Q.currentWeight===0||O2(Q)||!rV(Q,$))continue;let X=(Q.loop==="pingpong"?2:1)*Q.clipSpan/Math.abs(Q.speed);if(Q.loop==="once"||Z!==0&&Z!==X)return NaN;Z=X}return Z}function rV($,Z){return $.currentWeight>n9||$.additive||!Z.some((Q)=>Q.currentWeight>n9&&Q.override===$.override&&!Q.additive&&Q.maskNodes===null&&oA(Q.clip,$.clip))}var UG=new WeakMap;function oA($,Z){let Q=UG.get(Z);if(Q?.[0]!==$)UG.set(Z,Q=[$,Z.channels.every((X)=>$.channels.some((J)=>J.targetNode===X.targetNode&&J.path===X.path))]);return Q[1]}function sA($,Z,Q,X,J,K){let V=J>0?Math.max(1,Math.round(a6/J)):1;if($.items.length>0){if(!V0($.solvedItems,$.items)||$.waited>0)return 1;let Y=0;if(!$.holding&&$.retryAt!==1/0)Y=J>0&&X<$.retryAt?Math.ceil(($.retryAt-X)/J):1;if(R2($,Z,Q))return 0;return $.items.every((U)=>$.heldIds.includes(U))?Y:Math.min(V,Y||V)}if($Y($,Z)&&!($.support.missed>=K))return $.support.near>=nV?1:V;return 0}function R2($,Z,Q){if(!$.holding||$.waited>0||$.support.byReach!==""||!V0($.solvedItems,$.items))return!1;let X=Q($.bone.index);if(!X?.object||!X.rotation||X.walking||!$.meetsReach)return!1;if(Z!==null&&Z.items[0]===$.items[0])return!1;return $.items.every((J,K)=>K===0||$.heldIds.includes(J))}function pG($,Z,Q){let X=!1;for(let J of $.hands){if(J.support.active||J.support.near>0)Q=!0;if(Z(J.bone.index)===null)continue;if(X=!0,J.items.length>0&&!R2(J,E2($,J),Z))Q=!0}return X&&Q}function eV($,Z){let Q=$.door;if(Q===null)return!1;x$(R8),Q.heldBy(Z,R8);let X=dG($.heldRead);return x$(R8),!X}function dG($){return $.length===R8.length&&R8.every((Z,Q)=>Z===$[Q]||Z.id===$[Q].id&&Z.bone===$[Q].bone&&Z.own===$[Q].own)}function rA($,Z,Q){Q.heldIds.length=0;let X="";for(let J of R8){if(eA($,Z,J.bone)?.index!==Q.bone.index)continue;X=X===null||J.own===void 0?null:`${X}${J.own},`,Q.heldIds.push(J.id)}Q.heldOwn=X}function $Y($,Z){return $.chain!==null&&Z!==null&&Z.items.length>0&&(Z.holding||Z.retryAt!==1/0)&&!$.reached}function E2($,Z){return $.hands.find((Q)=>Q!==Z)??null}function eA($,Z,Q){let X=$.bonesByName.get(Q);if(X===void 0)$.bonesByName.set(Q,X=Z.getBoneByName(Q));return X}function $g($,Z){let Q=d$($.nodes);return[Z.rightArm&&qG(Z.rightArm,!0,Q),Z.leftArm&&qG(Z.leftArm,!1,Q)].filter((X)=>X!==null)}var Zg=/(end|tip|nub|top|[^0-9]4|_04)$/i;function qG($,Z,Q){let X=$.end,J=[],K=new Set;for(let N of X.children){let I=P2(N.name);if(I<0||K.has(I)||!N.isJoint)continue;let W=Qg(X,N,I,Q);if(W===null)continue;K.add(I),J.push(W)}let V=J.filter((N)=>N.kind>0).sort((N,I)=>N.kind-I.kind),Y=w2(V.map((N)=>[N.rest[0],N.rest[1],N.rest[2]]),Z);if(Y===null)return null;let U=Float64Array.from(Y.normal);let q=Float64Array.from(Y.across);let z=J.filter(function(N){{let $=N,Z=U;let Q=g8($.rest.subarray(3,6),$.rest.subarray(0,3),new Float64Array(3));if(!h$(Q))return!1;if(o6(Q,Z,$.axis),!h$($.axis))return!1;let X=$.frames,J=new Float64Array(4),K=new Float64Array(3);for(let V=0;V<$.joints.length;V++){QY(X.subarray(V*4,V*4+4),J);D$(J,$.axis,K);h$(K);$.localAxes.set(K,V*3);}return!0}});if(!z.some((N)=>N.kind>0))return null;let j=new Float64Array(9),G=0,B=0;for(let N of V){let I=N.rest.subarray(N.joints.length*3,N.joints.length*3+3);G+=c(I[0],I[1],I[2])/V.length,B+=N.radius/V.length;for(let W=0;W<3;W++)j[W]+=N.rest[W]/(2*V.length),j[3+W]+=N.rest[W]/V.length,j[6+W]+=(N.rest[W]+N.rest[3+W])/(2*V.length)}let M=Fg(j.subarray(3,6),U,G);let L=new Float64Array(7);let F=new Float64Array(7);let H={active:!1,item:"",pos:new Float64Array(3),rot:new Float64Array(4),takenPos:new Float64Array(3),takenRot:Float64Array.of(0,0,0,1),followPos:new Float64Array(3),followRot:Float64Array.of(0,0,0,1),move:0,byReach:"",reachObject:"",probeIn:0,near:0,last:0,missed:0};return{bone:X,right:Z,fingers:z,normal:U,probes:j,takes:M,across:q,span:G,gap:B*_A,bones:Float64Array.from(J.flatMap((N)=>[...N.rest.subarray(0,3)])),band:Math.min(...z.map((N)=>N.radius)),chain:$,support:H,armPosed:!1,armPosedByRow:!1,reached:!1,items:[],own:"",heldIds:[],heldOwn:"",solvedItems:[],solvedRel:L,solvedRot:L.subarray(3,7),holding:!1,meetsReach:!1,lastPose:F,lastRot:F.subarray(3,7),hasLastPose:!1,waited:0,fold:!1,retryAt:NaN,retryEvery:_G}}function Qg($,Z,Q,X){let J=[],K=Z;while(K!==null)J.push(K),K=K.children.find((x)=>x.isJoint)??K.children[0]??null;if(J.length>2&&/meta|palm/.test(P$(J[0].name)))J.shift();let V=null;if(J.length>1&&(J.length>i9||Zg.test(J[J.length-1].name)))V=J.pop()??null;let Y=J.slice(0,i9);if(Y.length<2)return null;let U=Y.length,q=new Float64Array(3*(U+1)),z=new Float64Array(4*U),j=new Float64Array(4*U),G=new Float64Array(3),B=Float64Array.of(0,0,0,1),M=Float64Array.of(1,1,1),L=[];for(let x=Y[0];x!==null&&x!==$;x=x.parent)L.unshift(x);if(L[0]?.parent!==$)return null;let F=new Float64Array(3),H=new Float64Array(4),N=0;for(let x of[...L,...Y.slice(1)]){let D=x.index*10;{let x$1=D;{let x=x$1;for(let D=0;D<3;D++)F[D]=X[x+D]*M[D];D$(B,F,F)}}s9(G,F,G);H.set(X.subarray(D+3,D+7));l$(B,H,B);for(let v=0;v<3;v++)M[v]*=X[D+7+v];if(x===Y[N])q.set(G,N*3),z.set(H,N*4),j.set(B,N*4),N+=1}if(V!==null){{let x=V.index*10;for(let D=0;D<3;D++)F[D]=X[x+D]*M[D];D$(B,F,F)}}else for(let x=0;x<3;x++)F[x]=(q[(U-1)*3+x]-q[(U-2)*3+x])*0.8;for(let x=0;x<3;x++)q[U*3+x]=q[(U-1)*3+x]+F[x];let W=c(q[3]-q[0],q[4]-q[1],q[5]-q[2]);if(!(W>0))return null;let P=Q===0;return{kind:Q,joints:Y,rest:q,axis:new Float64Array(3),localAxes:new Float64Array(3*U),restQuats:z,ratios:P?RG:OG,caps:P?EG:wG,radius:W*kA,target:new Float64Array(U),posed:!1,posedByRow:!1,held:!1,crossed:!1,touched:!1,frames:j}}var Q8=new Float64Array(3),w8=new Float64Array(4),l0=new Float64Array(3),z$=new Float64Array(4),t6=new Float64Array(7),zG=t6.subarray(3,7);function cG($,Z,Q,X,J,K,V){if(!X.ready()||!X.drawnPose(Z.items[0],Q8,w8))return!1;let Y=J9(Q,Z.bone,l0,z$);if(Y<=0)return!1;let U=K?.walking?null:K?.target;Z.meetsReach=!!U&&!!K?.rotation&&p$(l0,U)<=Z.band*Y&&A2(z$,K.rotation)*Z.span<=Z.band;let q=J!==null;if(q){XY(Q8,w8,Z.support.pos,Z.support.rot,l0,z$);Wg:{let $$14=Z.support,Z$16=J;{let $=$$14,Z=Z$16;{let v$78;va:{let X=ZY(Z,Q,O8,k2);if(X<=0)break va;D$($.followRot,O8,O8);s9(O8,$.followPos,O8);D$(g2,O8,O8);{let $=O8,Z=X;$[0]*=Z,$[1]*=Z,$[2]*=Z}s9(tV,O8,l0);l$($.followRot,k2,k2);l$(g2,k2,z$)
v$78=aa;}if((ba=v$78)!==aa){(ba);break Wg;}}}}}g8(Q8,l0,t6);KY(z$,t6,t6,w8,zG);let z=Z.fold;Z.fold=!1;let j=!z&&(q||Z.own!==""||X.instant===!0||Z.hasLastPose&&p$(Q8,Z.lastPose)<gA&&A2(w8,Z.lastRot)<OA);Z.lastPose.set(Q8,0),Z.lastPose.set(w8,3),Z.hasLastPose=!0;let G=V0(Z.solvedItems,Z.items),B=!(p$(t6,Z.solvedRel)<=Z.band*Y&&A2(zG,Z.solvedRot)*Z.span<=Z.band);if(G&&!B&&(Z.holding||V<Z.retryAt))return!1;let M=!G||!Z.holding;if(!j){if(!M||z)return!1;if(Z.waited+=1,Z.waited<wA)return!1}if(Z.waited=0,!G)Z.solvedItems.length=0,Z.solvedItems.push(...Z.items);Z.solvedRel.set(t6);let L=Z.holding,F=X.skipped?.()??0,H=M&&Z.own!=="";Z.holding=H?Jg(Z,Y,X,Q,F):iG(Z,Y,X,M);if(((X.skipped?.()??0)!==F)){if(Z.solvedItems.length=0,Z.holding=!1,L)$.revision+=1;return!1}if(Z.holding){if(!L)$.revision+=1;return!0}if(H)Z.retryAt=1/0;else{if(L||!G)Z.retryEvery=_G;Z.retryAt=V+Z.retryEvery,Z.retryEvery=Math.min(RA,Z.retryEvery*2)}return!0}var jG=new WeakMap;function Jg($,Z,Q,X,J){let K=$.fingers.reduce((z,j,G)=>z|Number(j.posed)<<G,0),V=$.solvedRel,Y=jG.get(X.nodes)?.get($.bone.index);if(Y?.own===$.own&&Y.posed===K&&Y.targets.length===$.fingers.length&&c(V[0]/Z-Y.rel[0],V[1]/Z-Y.rel[1],V[2]/Z-Y.rel[2])<=$.band&&A2($.solvedRot,Y.rel.subarray(3,7))*$.span<=$.band)return $.fingers.forEach(function(z,j){z.target.set(Y.targets[j]),[z.held,z.crossed,z.touched]=Y.fits[j]}),Y.met;let U=iG($,Z,Q,!0);if(((Q.skipped?.()??0)!==J))return!1;return H$(jG,X.nodes).set($.bone.index,{own:$.own,posed:K,rel:Float64Array.of(V[0]/Z,V[1]/Z,V[2]/Z,V[3],V[4],V[5],V[6]),met:U,targets:$.fingers.map((z)=>z.target.slice()),fits:$.fingers.map((z)=>[z.held,z.crossed,z.touched])}),U}function J9($,Z,Q,X){$.nodeWorldInto(Z.index,GG,BG,MG),Q.set(GG.a),X.set(BG.a);let J=MG.a;return J[0]*J[1]*J[2]?(Math.abs(J[0])+J[1]+J[2])/3:0}var GG=new O,BG=new J0,MG=new O;function iG($,Z,Q,X){let J=!1;for(let K of $.fingers){if(K.posed){if(X)K.held=!1,K.target.fill(0);continue}if(X||!Ug(K,$,Z,Q)){K.held=Kg(K,$,Z,Q);if(!K.held){{let $=K;{let Z=$.kind===0?AA:yA;for(let Q=0;Q<$.joints.length;Q++)$.target[Q]*=Z
}}}{let $$12=K,Z$13=$,Q$8=Z,X$4=Q;{let $=$$12,Z=Z$13,Q=Q$8,X=X$4;{$.crossed=o9($,Z,Q,X,$.target,null,0,0)>=0,$.touched=o9($,Z,Q,X,$.target,null,0,2*$.radius)>=0
}}}}if(K.held&&K.kind>0)J=!0}return J}var e6=new Float64Array(i9),FG=new Float64Array(i9),c9=new Uint8Array(i9);function Kg(a,b,c,d){return (Kg=$c0C(5)).call(this,a,b,c,d)}function Ug($,Z,Q,X){if(!$.crossed&&o9($,Z,Q,X,$.target,null,0,0)>=0)return!1;return!$.touched||o9($,Z,Q,X,$.target,null,0,2*$.radius)>=0}var Gg=Math.ceil(Math.max(...wG,...EG)/(gG*Math.min(...OG,...RG))),T2=new Float64Array(3*(i9+1)),LG=new Float64Array(3*(i9+1)),Z8=new Float64Array(3),v2=new Float64Array(3),s6=new Float64Array(3),h9=new Float64Array(3),NZ=new Float64Array(3),S2=new Float64Array(3),p9=new Float64Array(3),C2=new Float64Array(3);function HG($,Z,Q){let X=$.joints.length,J=$.rest;Q.set(J.subarray(0,3));let K=0;for(let V=1;V<=X;V++){K+=Z[V-1];for(let Y=0;Y<3;Y++)Z8[Y]=J[V*3+Y]-J[(V-1)*3+Y];rG($.axis,K,Z8,Z8);for(let Y=0;Y<3;Y++)Q[V*3+Y]=Q[(V-1)*3+Y]+Z8[Y]}}function o9($,Z,Q,X,J,K,V,Y=$.radius){HG($,J,T2);let U=$.joints.length;for(let z=V;z<U;z++){for(let j=0;j<3;j++)s6[j]=T2[z*3+j],h9[j]=T2[(z+1)*3+j],Z8[j]=h9[j]-s6[j];if(o6($.axis,Z8,v2),!h$(v2))continue;for(let j=0;j<3;j++)s6[j]+=v2[j]*Y,h9[j]+=v2[j]*Y;if(z===U-1){let j=c(Z8[0],Z8[1],Z8[2]);for(let G=0;G<3;G++)h9[G]+=Z8[G]/j*Y}if(NG(Z,Q,X,s6,h9))return z}if(K===null)return-1;HG($,K,LG);let q=U*3;return s6.set(LG.subarray(q,q+3)),h9.set(T2.subarray(q,q+3)),NG(Z,Q,X,s6,h9)?U-1:-1}function NG($,Z,Q,X,J){IZ(NZ,X,0,Z),IZ(S2,J,0,Z),s9(NZ,l0,NZ),s9(S2,l0,S2),g8(S2,NZ,p9);let K=c(p9[0],p9[1],p9[2]);if(!(K>0))return!1;{let $=p9,Z=1/K;$[0]*=Z,$[1]*=Z,$[2]*=Z}for(let V=0;V<K;){for(let U=0;U<3;U++)C2[U]=NZ[U]+p9[U]*V;let Y=Q.cast($.items,C2,p9,K-V);if(Y<0)return!1;V+=Y;for(let U=0;U<3;U++)C2[U]=X[U]+(J[U]-X[U])*V/K;let v$11;Bg:{let Z=C2;let Q=$.bones;for(let X=0;X<Q.length;X+=3){let J=Q[X]*Q[X]+Q[X+1]*Q[X+1]+Q[X+2]*Q[X+2],K=J>0?Math.max(0,Math.min(1,(Z[0]*Q[X]+Z[1]*Q[X+1]+Z[2]*Q[X+2])/J)):0;if(c(Z[0]-Q[X]*K,Z[1]-Q[X+1]*K,Z[2]-Q[X+2]*K)<$.gap){v$11=!0;break Bg;}}v$11=!1;}if(!v$11)return!0;V+=K*0.001}return!1}function sG($,Z,Q,X,J,K){if($.items.length===0)return!1;if(Z||!V0($.solvedItems,$.items))return X.drawnPose($.items[0],J,K);if(J9(Q,$.bone,WG,IG)<=0)return!1;XY(WG,IG,$.solvedRel,$.solvedRot,J,K);return !0}var WG=new Float64Array(3),IG=new Float64Array(4);var xG=[""],DG=new Float64Array(3);function Fg(a,b,c){return (Fg=$c0C(6)).call(this,a,b,c)}function Hg($,Z,Q,X,J,K,V){let Y=$.support;if(!$Y($,Z)||Y.active&&Y.item!==Z.items[0])return Y.active=!1,Y.near=0,!1;let U,q;{let v$58;ta:{if(!sG(Z,R2(Z,$,J),Q,X,Q8,w8)){v$58=!1;break ta;}let U=J9(Q,$.bone,l0,z$);if(U<=0){v$58=!1;break ta;}if(Y.active){XY(Q8,w8,Y.pos,Y.rot,Q9,Ig);if(p$(Q9,l0)>EA*$.span*U){v$58=(Y.active=!1,!1);break ta;}if(Y.probeIn-=K,Y.probeIn<=0&&X.ready()){Y.probeIn=a6;let M=CG($,U,X,Z.items);if(M>=0&&M-$.gap*U<Y.move&&PG($,Z,Q,M,U)){v$58=($.items.push(...Z.items),!0);break ta;}}{v$58=(aG(Y,Z,Q),$.items.push(...Z.items),!0);break ta;}}let q=Y.near>=nV;
v$58=(da[0]=U,da[1]=q,aa);}if((ba=v$58)!==aa)return ba;U=da[0];q=da[1]}if(!X.ready()||Y.missed>=V)return!1;if(Y.probeIn-=K,Y.probeIn>0&&!q)return!1;let z=a6-Y.probeIn;Y.probeIn=a6;let j=CG($,U,X,Z.items);if(j<0)return Y.near=0,Y.missed=z>2*a6?0:Y.missed+z,!1;Y.missed=0;let G=Y.near>0?Math.min(j,Y.last):j,B=Y.near>0&&j<Y.last;if(!q)Y.near+=1;if(Y.last=j,Y.near<nV||B)return!1;{let U$5=U;{let U=U$5;if(!PG($,Z,Q,G,U))return!1;return Y.active=!0,Y.item=Z.items[0],Y.near=0,$.items.push(...Z.items),!0
}}}function PG($,Z,Q,X,J){let K=$.support;K.move=X-$.gap*J;for(let V=0;V<3;V++)Q9[V]=l0[V]+r6[V]*K.move-Q8[V];return tG(K,Z,Q)}function tG($,Z,Q){KY(w8,Q9,$.pos,z$,$.rot);if(!(ZY(Z,Q,$.takenPos,$.takenRot)>0))return!1;return $.followPos.fill(0),$.followRot.set(Ng),!0}var Ng=Float64Array.of(0,0,0,1),TG=new Float64Array(3),vG=new Float64Array(4),tV=new Float64Array(3),g2=new Float64Array(4),SG=new Float64Array(4),O8=new Float64Array(3),k2=new Float64Array(4);function ZY($,Z,Q,X){let J=J9(Z,$.bone,tV,g2);if(J<=0)return J;g8(l0,tV,Q);{let $=Q,Z=1/J;$[0]*=Z,$[1]*=Z,$[2]*=Z}KY(g2,Q,Q,z$,X);return J}function aG($,Z,Q){if(!(ZY(Z,Q,TG,vG)>0))return;QY($.takenRot,SG);l$(vG,SG,$.followRot);D$($.followRot,$.takenPos,$.followPos);g8(TG,$.followPos,$.followPos)}function QY($,Z){Z[0]=-$[0],Z[1]=-$[1],Z[2]=-$[2],Z[3]=$[3]}var Q9=new Float64Array(3),Ig=new Float64Array(4),r6=new Float64Array(3),d9=new Float64Array(3);function IZ($,Z,Q,X){for(let J=0;J<3;J++)$[J]=Z[Q+J]*X;D$(z$,$,$)}var l9=new Float64Array(3),y2=new Float64Array(3);function CG(a,b,c,d){return (CG=$c0C(7)).call(this,a,b,c,d)}function XY($,Z,Q,X,J,K){D$(Z,Q,J),s9(J,$,J),l$(Z,X,K)}function s9($,Z,Q){Q[0]=$[0]+Z[0],Q[1]=$[1]+Z[1],Q[2]=$[2]+Z[2]}function KY($,Z,Q,X,J){QY($,dV);D$(dV,Z,Q);l$(dV,X,J)}var dV=new Float64Array(4);function rG($,Z,Q,X){let J=Math.sin(Z/2);WZ[0]=$[0]*J,WZ[1]=$[1]*J,WZ[2]=$[2]*J,WZ[3]=Math.cos(Z/2),D$(WZ,Q,X)}var WZ=new Float64Array(4);function A2($,Z){let Q=Math.abs($[0]*Z[0]+$[1]*Z[1]+$[2]*Z[2]+$[3]*Z[3]);return 2*Math.acos(Math.min(1,Q))}function ZB($){let Z=r8.words;for(let K of $)Z+=e$.words+K.fingers.length*$8.words;let{u32:Q,f32:X}=Z$(Z);Q[r8.hands]=$.length,Q[r8.handsAt]=r8.words;let J=r8.words+$.length*e$.words;return $.forEach(function(K,V){let Y=r8.words+V*e$.words;Q[Y+e$.bone]=K.bone.index,Q[Y+e$.right]=K.right?1:0;let U=Y+e$.chain,q=K.chain;if(Q.fill(A,U,U+u0.words),q!==null)Q[U+u0.root]=q.root.index,Q[U+u0.mid]=q.mid.index,Q[U+u0.end]=q.end.index,Q[U+u0.leg]=0;Q[Y+e$.fingers]=Math.min(K.fingers.length,i6),Q[Y+e$.fingersAt]=J-Y,K.fingers.slice(0,i6).forEach(function(z){let j=Math.min(z.joints.length,H2);Q[J+$8.joints]=j,Q[J+$8.thumb]=z.kind===0?1:0;for(let G=0;G<j;G++)Q[J+$8.joint+G]=z.joints[G].index,X.set(z.localAxes.subarray(G*3,G*3+3),J+$8.axis+G*3),X.set(z.restQuats.subarray(G*4,G*4+4),J+$8.rest+G*4),X[J+$8.cap+G]=z.caps[G];J+=$8.words})}),Q.slice(0,J)}var eG=new Float64Array(3),$B=new Float64Array(4);function QB(a,b){return (QB=$c0C(8)).call(this,a,b)}var XB=0.15;function t9($,Z){let Q=new Uint8Array($.length),X=[];for(let J of Z){let K=[];for(let V=J;V>=0&&Q[V]===0;V=$[V].parent)Q[V]=1,K.push(V);for(let V=K.length-1;V>=0;V--)X.push(K[V])}return X}function VY($,Z){let Q=new Uint8Array($.length);for(let X of Z)Q[X]=1;return Q}function $7($,Z,Q){let X=VY($,Z);return{...Q,channels:Q.channels.filter((J)=>X[J.targetNode]===1)}}var xg=60,JB=0;function UY($,Z,Q,X,J,K){let V=Z.length,Y=xZ(X),U=d$($),q=new Float32Array($.length*16),z=new Float64Array(J*V*3),j=(B)=>B.path!=="rotation"&&B.interpolation!=="CUBICSPLINE"&&(UB(B)&KB)!==0;_2({...X,channels:X.channels.filter(j)},Y,U);let G={...X,channels:X.channels.filter((B)=>!j(B))};for(let B=0;B<J;B+=1){_2(G,Y+B*K,U),DZ($,U,q,Q);for(let M=0;M<V;M+=1)z.set(q.subarray(Z[M]*16+12,Z[M]*16+15),(B*V+M)*3)}return z}function YY($,Z,Q,X,J,K,V){let Y=(X*Z+Q)*3,U=Y+Z*3;return(($[U]-$[Y])*J+($[U+2]-$[Y+2])*K)/V}function Tg($,Z,Q,X,J,K,V,Y){let U=[...Y.keys()].filter((q)=>Y[q]===1&&V[q]>0);for(let q=0;q+1<Z;q+=1)if(U.length>1&&U.every((z)=>-YY($,Q,z,q,X,J,K)>=V[z]/2))return!0;return!1}function qB($,Z,Q){let X=Z.length;let J=new Float64Array(X);let K=new Float64Array(X);let V=new Uint8Array(X);let Y={dirX:JB,dirZ:JB,back:J,swing:K,moves:V,walks:!1};let U=t9($,Z);let q=Z.map((W)=>VY($,t9($,[W])));let z=$7($,U,Q);let j=z.channels;if(!j.every((W)=>(YB(W)&VB)!==0))return Y;for(let W of j)for(let P=0;P<X;P+=1)V[P]|=q[P][W.targetNode];let G=O$(Q),B=j.length>0&&G>0?Math.round(G*xg)+1:0;if(B<3||!Number.isSafeInteger(B*X*3))return Y;let M=G/(B-1),L=UY($,Z,U,z,B,M),F={x:0,z:0};for(let W=0;W<X;W+=1){{let $$15=L,Z$17=B,Q$11=X,X$7=W,J$5=F;{let $=$$15,Z=Z$17,Q=Q$11,X=X$7,J=J$5;let K=1/0,V=-1/0;for(let U=0;U<Z;U+=1){let q=$[(U*Q+X)*3+1];K=Math.min(K,q),V=Math.max(V,q)}let Y=K+(V-K)*XB;for(let U=1;U<Z;U+=1){let q=((U-1)*Q+X)*3,z=(U*Q+X)*3;if($[q+1]>Y||$[z+1]>Y)continue;J.x-=$[z]-$[q],J.z-=$[z+2]-$[q+2]}}}}let H=E8(F.x,F.z);if(!(H>0))return Y;let N=F.x/H,I=F.z/H;for(let W=0;W<X;W+=1){{let $$16=L,Z$18=B,Q$12=X,X$8=W,J$6=N,K$3=I,V$3=M,Y$1=J,U$1=K;{let $=$$16,Z=Z$18,Q=Q$12,X=X$8,J=J$6,K=K$3,V=V$3,Y=Y$1,U=U$1;let q=YY($,Q,X,Z-2,J,K,V);for(let z=0;z+1<Z;z+=1){let j=YY($,Q,X,z,J,K,V);Y[X]=Math.max(Y[X],-Math.max(j,q)),U[X]=Math.max(U[X],Math.min(j,q)),q=j}}}}return{dirX:N,dirZ:I,back:J,swing:K,moves:V,walks:Tg(L,B,X,N,I,M,J,V)}}var vg=24;function zB($,Z,Q){let X=Z.ends;if(X.length===0)return 0;let J=t9($,X),K=O$(Q),V=K>0?vg:1,Y=UY($,X,J,$7($,J,Q),V,K/V),U=1/0;for(let q=0;q<V;q+=1)for(let z=0;z<X.length;z+=1){let j=Y[(q*X.length+z)*3+1]-Z.restHeights[z];if(j<U)U=j}return i(U)?Math.max(0,U):0}var J8=0.0001,IB="headfront",Sg=new O(0,0,-1),Cg=new O(0,0,1),kg=new O(1,0,0),yg=new O(-1,0,0);function p2($){if($==="+z")return Cg;if($==="+x")return kg;if($==="-x")return yg;return Sg}var LY=["hips","spine","spine1","spine2","neck","head","leftupleg","leftleg","leftfoot","lefttoebase","rightupleg","rightleg","rightfoot","righttoebase","leftshoulder","leftarm","leftforearm","lefthand","rightshoulder","rightarm","rightforearm","righthand"],Ag=["spine","spine1","spine2"],gg={hips:"Hips",spine:"Spine",spine1:"Spine1",spine2:"Spine3",neck:"Neck",head:"Head",leftupleg:"LeftUpLeg",leftleg:"LeftLeg",leftfoot:"LeftFoot",lefttoebase:"LeftToeBase",rightupleg:"RightUpLeg",rightleg:"RightLeg",rightfoot:"RightFoot",righttoebase:"RightToeBase",leftshoulder:"LeftShoulder",leftarm:"LeftArm",leftforearm:"LeftForeArm",lefthand:"LeftHand",rightshoulder:"RightShoulder",rightarm:"RightArm",rightforearm:"RightForeArm",righthand:"RightHand"};function Og($,Z){let Q=new Map;for(let J of $)if(!Q.has(J.name))Q.set(J.name,J);let X=new Map;for(let J of LY){let K=Z[gg[J]],V=K===void 0?void 0:Q.get(K);if(V!==void 0)X.set(J,V)}return X}var jB=new O,qY=new O,GB=new O,u2=new J0,vZ=new O,BB=new O,MB=new O;function xB($,Z){let Q=new Map,X=new Set;for(let J of LY)for(let K=0;K<$.length;K++)if(Z[K]===J){Q.set(J,$[K]),X.add($[K]);break}for(let J of LY){if(Q.has(J))continue;for(let K=0;K<$.length;K++)if(!X.has($[K])&&Z[K].includes(J)){Q.set(J,$[K]),X.add($[K]);break}}return Q}function b2($,Z){let Q=$.parent;while(Q!==null){if(Q===Z)return!0;Q=Q.parent}return!1}function DB($,Z){for(let Q of $.children){if(P$(Q.name).includes(Z))return Q;let X=DB(Q,Z);if(X)return X}return null}function TB($,Z,Q,X){B0.view($,Z.index*16).decompose(BB,u2,vZ),u2.invert();let J=new O;if(Q){if(MB.setFromMatrixPosition(B0.view($,Q.index*16)),J.subVectors(MB,BB).applyQuaternion(u2),J.lengthSq()>=J8*J8)return J.normalize()}return xa(J,X);}function l2($,Z,Q,X){let J=$.bindCorrection;return((J===null?Q:J[1]*Z+J[5]*Q+J[9]*X+J[13])+$.groundLift)/$.bindScale}var Y9=($,Z)=>Z!==null&&$.bones[Z.index]===Z;function vB($,Z,Q){let X=Z.parent;if(!Y9($,X))return null;let J=X.parent;if(!Y9($,J))return null;return SZ(J,X,Z,Q)}function NY($,Z){let Q=null;for(let X=0;X<Z.length;X++){let J=Z[X].parent;if(!Y9($,J))return null;if(Q===null){Q=J;continue}let K=Q;while(Y9($,K)&&K!==J&&!b2(J,K))K=K.parent;if(!Y9($,K))return null;Q=K}return Q}function kB($,Z){let Q=[],X=[];$.forEachJoint(function(K){Q.push(K),X.push(P$(K.name))});let J=Q.length>0?xB(Q,X).get("head"):void 0;if(!J)return null;return{head:J,face:(TB((f0($.nodes)),J,DB(J,IB),Z))}}var zY=new J0,jY=new J0,FB=new J0,PZ=new J0,Z7=new J0,GY=new O,BY=new O,LB=new O,HB=new O,V9=new O,CZ=new O,Q7=new O,NB=new O,MY=new O,FY=new O,WB=new O,TZ=new O,wg=new O(0,-1,0);function f2($,Z){for(let Q of $.children){let X=P$(Q.name);for(let K of Z)if(X.includes(K))return Q;let J=f2(Q,Z);if(J)return J}return null}function Rg(a,b,c,d){return (Rg=$c0C(9)).call(this,a,b,c,d)}function K9($,Z){if($.addScaledVector(Z,-$.dot(Z)),$.lengthSq()<J8*J8)return!1;return $.normalize(),!0}function Eg($,Z){let Q=$.skins.find((q)=>q.part!==!0),X=Z.head??Z.spine[Z.spine.length-1]??null;if(!Q||!Z.leftArm||!Z.rightArm||!X)return null;let J=new Float32Array($.nodes.length*16),K=new Uint8Array($.nodes.length);for(let q=0;q<Q.joints.length;q++){let z=Q.joints[q];if(z<0||z>=$.nodes.length||(q+1)*16>Q.inverseBindMatrices.length)continue;B0.view(J,z*16).setFromArray(Q.inverseBindMatrices,q*16).invert(),K[z]=1}if(K[Z.leftArm.root.index]!==1||K[Z.rightArm.root.index]!==1||K[Z.hips.index]!==1||K[X.index]!==1)return null;V9.setFromMatrixPosition(B0.view(J,Z.leftArm.root.index*16));let V=new O().subVectors(V9,CZ.setFromMatrixPosition(B0.view(J,Z.rightArm.root.index*16)));if(V.lengthSq()<J8*J8)return null;V.normalize(),V9.setFromMatrixPosition(B0.view(J,X.index*16));let Y=new O().subVectors(V9,CZ.setFromMatrixPosition(B0.view(J,Z.hips.index*16)));if(!K9(Y,V))return null;let U=new O().crossVectors(V,Y).normalize();return{world:J,bound:K,down:Y.multiplyScalar(-1),front:U}}function m2($,Z,Q,X,J){if(J===null)return null;let K=(H)=>H!==null&&(X.bound===null||X.bound[H.index]===1);if(!K(Z.root)||!K(Z.mid)||!K(Z.end)||Y9($,J)&&!K(J))return null;let V=X.world,Y={crease:new O,trunk:J,down:new O,front:new O,internalSign:1,foreAxis:new O,palm:new O,radial:new O,restElbow:new J0,restWrist:new J0,halfTurn:0};B0.view(V,Z.root.index*16).decompose(GY,zY,vZ),B0.view(V,Z.mid.index*16).decompose(BY,jY,vZ),B0.view(V,Z.end.index*16).decompose(LB,FB,vZ);let{front:U,down:q}=X,z=!1;if(Y9($,J))B0.view(V,J.index*16).decompose(V9,PZ,vZ),z=K9(NB.subVectors(V9,GY),q);else PZ.identity();if(HB.subVectors(BY,GY).normalize(),Y.crease.copy(U),!K9(Y.crease,HB))return null;Y.crease.applyQuaternion(Z7.copy(zY).invert()).normalize(),Y.internalSign=Q?1:-1,PZ.invert(),Y.down.copy(q).applyQuaternion(PZ),Y.front.copy(U).applyQuaternion(PZ);let j=Y.foreAxis.subVectors(LB,BY).normalize(),G=f2(Z.end,["index"]),B=f2(Z.end,["pinky","little"]),M=!1;if(K(G)&&K(B))V9.setFromMatrixPosition(B0.view(V,G.index*16)),CZ.setFromMatrixPosition(B0.view(V,B.index*16)),Y.radial.subVectors(V9,CZ),M=K9(Y.radial,j);let L=M;if(M)if(Q)Y.palm.crossVectors(j,Y.radial);else Y.palm.crossVectors(Y.radial,j);else{if(Y.palm.copy(q),!K9(Y.palm,j))Y.palm.copy(U);if(!K9(Y.palm,j))return null;if(Q)Y.radial.crossVectors(Y.palm,j);else Y.radial.crossVectors(j,Y.palm)}if(f2(Z.end,["thumb"])===null&&Rg(Z.end,Y.palm,X,K))Y.palm.multiplyScalar(-1),Y.radial.multiplyScalar(-1),L=!0;if(Q7.copy(q),z)Q7.add(NB);let F=L&&(K9(Q7,j)||K9(Q7.copy(U),j));return Y.halfTurn=F?-Math.atan2(CZ.crossVectors(Q7,Y.palm).dot(j),Q7.dot(Y.palm)):0,Z7.copy(jY).invert(),j.applyQuaternion(Z7).normalize(),Y.palm.applyQuaternion(Z7).normalize(),Y.radial.applyQuaternion(Z7).normalize(),Y.restElbow.copy(zY).invert().multiply(jY),Y.restWrist.copy(Z7).multiply(FB),Y}function SZ($,Z,Q,X){if(!$||!Z||!Q)return null;if(!b2(Z,$)||!b2(Q,Z))return null;jB.setFromMatrixPosition(B0.view(X,$.index*16)),qY.setFromMatrixPosition(B0.view(X,Z.index*16)),GB.setFromMatrixPosition(B0.view(X,Q.index*16));let J=jB.distanceTo(qY),K=qY.distanceTo(GB);if(J<J8||K<J8)return null;return{root:$,mid:Z,end:Q,rootLen:J,midLen:K,arm:null,leg:!1}}function _g($,Z,Q,X){let J=[],K=[];if($.forEachJoint(function(F){J.push(F),K.push(P$(F.name))}),J.length===0)return null;let V=Z?Og(J,Z):xB(J,K);let Y=V.get("hips");if(!Y)return null;let U=Q??f0($.nodes),q=SZ(V.get("leftupleg"),V.get("leftleg"),V.get("leftfoot"),U),z=SZ(V.get("rightupleg"),V.get("rightleg"),V.get("rightfoot"),U),j=SZ(V.get("leftarm"),V.get("leftforearm"),V.get("lefthand"),U),G=SZ(V.get("rightarm"),V.get("rightforearm"),V.get("righthand"),U);if(!q&&!z&&!j&&!G)return null;if(q)q.leg=!0;if(z)z.leg=!0;let B=[];for(let F of Ag){let H=V.get(F);if(!H)break;B.push(H)}let M=V.get("head")??null;let L={hips:Y,spine:B,neck:V.get("neck")??null,head:M,headFace:M?(TB(U,M,DB(M,IB),X)):new O(0,0,-1),leftLeg:q,rightLeg:z,leftArm:j,rightArm:G};ug($,L,U,X);return L}function yB($,Z,Q){let X=$.shape.humanoids.get(Q);if(X?.row!==Z){let J=new h2($,d$($.nodes),$.shape);J.setRoleRow(()=>Z);let K=f0($.nodes);$.shape.humanoids.set(Q,X={rig:J,row:Z,rest:K,ikRig:_g(J,Z,K,Q)})}return X}function ug($,Z,Q,X){let J=Eg($,Z);let K={world:Q,bound:null,down:wg,front:p2(X)};let V=Z.leftArm&&Z.rightArm?NY($,[Z.leftArm.root,Z.rightArm.root]):null;let Y=function(U){let q=U.root.parent;return Y9($,q)&&q.parent!==null?q.parent:q};if(Z.leftArm){let U=V??Y(Z.leftArm);Z.leftArm.arm=(J&&m2($,Z.leftArm,!0,J,U))??m2($,Z.leftArm,!0,K,U)}if(Z.rightArm){let U=V??Y(Z.rightArm);Z.rightArm.arm=(J&&m2($,Z.rightArm,!1,J,U))??m2($,Z.rightArm,!1,K,U)}}var o2=0.001,mg=75*j$/180,fg=45*j$/180,d2=8,PY=300000000000000000000000000000000000000,WY=8;class lB{constructor($){this.u32=void 0;this.f32=void 0;this.length=0;this.out=void 0;this.u32=new Uint32Array($),this.f32=new Float32Array(this.u32.buffer),this.out=this.u32.subarray(0,0)}reset($){if($>this.u32.length)ya.call(this,$);this.length=0}view(){if(this.out.buffer!==this.u32.buffer||this.out.length!==this.length)this.out=this.u32.subarray(0,this.length);return this.out}take($){let Z=this.length;if(Z+$>this.u32.length)za.call(this,Z,$);return this.u32.fill(0,Z,Z+$),this.length=Z+$,Z}}function c2($,Z,Q,X){return $[0]=Z,$[1]=Q,$[2]=X,$}function n2($,Z){if(Z)$.push(Z.root.index,Z.mid.index,Z.end.index)}function AB($,Z){if(Z){l$($,dB(Z),$)}}function dB($){return yZ(bg,-$[0],-$[1],-$[2],$[3])}var bg=[0,0,0,1];function yZ($,Z,Q,X,J){return $[0]=Z,$[1]=Q,$[2]=X,$[3]=J,$}function gB($,Z,Q){let X=cB.a,J=TY.a;return t2(Q,-J[0],-J[1],-J[2],J[3],($.x-X[0])/Z,($.y-X[1])/Z,($.z-X[2])/Z),Q}function hg({x:$,y:Z,z:Q,w:X},J){return l$(dB(TY.a),yZ(J,$,Z,Q,X),J)}var cB=new O,TY=new J0,OB=new O,pg=[0,0,0,1],IY=[],wB=[];function AZ($,Z,Q,X,J){$.f32[Z]=Q,$.f32[Z+1]=X,$.f32[Z+2]=J}function RB($,Z,Q){let X=$.f32,J=(K,V)=>X.set("w"in V?[V.x,V.y,V.z,V.w]:[V.x,V.y,V.z],Z+K);$.u32[Z+i0.trunk]=Q.trunk.name==="__rig_root__"?A:Q.trunk.index,X[Z+i0.internalSign]=Q.internalSign,J(i0.crease,Q.crease),J(i0.down,Q.down),J(i0.front,Q.front),J(i0.foreAxis,Q.foreAxis),J(i0.palm,Q.palm),J(i0.radial,Q.radial),J(i0.restElbow,Q.restElbow),J(i0.restWrist,Q.restWrist),X[Z+i0.halfTurn]=Q.halfTurn}function lg($){let Z=Z$(n6.words);if($?.leftArm?.arm)RB(Z,n6.leftArm,$.leftArm.arm);if($?.rightArm?.arm)RB(Z,n6.rightArm,$.rightArm.arm);return Z.u32}function dg($,Z){if(Z===$?.leftLeg)return A4;if(Z===$?.rightLeg)return g4;if(Z===$?.leftArm)return O4;if(Z===$?.rightArm)return w4;return-1}function cg($,Z){if(!Z.arm)return A;if(Z===$?.leftArm)return n6.leftArm;if(Z===$?.rightArm)return n6.rightArm;return A}var vY=Math.log(GZ/I2)/x2,ng=new WeakMap;function nB($,Z,Q){let X=H$(ng,Q),J=X.get(Z.key);if(J)return J;let K=ig($,Z,Q);let V=EB.get(K)??og($,Z,Q);return EB.set(K,V),X.set(Z.key,V),V}var EB=new Map;function ig($,Z,Q){let X=t9($,Z.ends),J=X.map((V)=>[V,$[V].parent,$[V].translation,$[V].rotation,$[V].scale]),K=$7($,X,Q).channels.map((V)=>[V.targetNode,V.path,V.interpolation,DY(V.times),DY(V.values)]);return JSON.stringify([Z.key,Q.start,Q.duration,J,K])}function og($,Z,Q){let X=Z$(W$.foot0+Z.ends.length*W$.footWords);X.f32[W$.floor]=Z.drop<0?0:zB($,Z,Q);X.u32[W$.movesDrop]=Z.drop>=0&&Q.channels.some((K)=>K.targetNode===Z.drop&&K.path==="translation")?1:0;X.f32[W$.period]=O$(Q);let J=qB($,Z.ends,Q);X.f32[W$.dirX]=J.dirX,X.f32[W$.dirZ]=J.dirZ,X.u32[W$.feet]=J.moves.length;for(let K=0;K<J.moves.length;K++){let V=W$.foot0+K*W$.footWords;X.f32[V]=J.back[K],X.f32[V+1]=J.swing[K],X.u32[V+2]=J.moves[K]*(J.walks?2:1)}return X.u32}function sg($,Z){let Q=m$.entries+$.clips.length*m$.entryWords;for(let X=0;X<$.clips.length;X++)Q+=nB($.nodes,Z,$.clips[X].clip).length;return Q}function tg($,Z,Q){let X=$.take(m$.entries+Z.clips.length*m$.entryWords);$.u32[X+m$.clips]=Z.clips.length;for(let J=0;J<Z.clips.length;J++){let K=nB(Z.nodes,Q,Z.clips[J].clip),V=$.take(K.length);$.u32.set(K,V),$.u32[X+m$.entries+J*m$.entryWords]=Z.clips[J].block,$.u32[X+m$.entries+J*m$.entryWords+1]=V-X}return X}var _B=new Map;function a2($){let Z=$.join(","),Q=_B.get(Z);if(Q)return Q;return _B.set(Z,$),$}class kZ{constructor(){this.w0=0;this.at=0;this.goal=0;this.rate=PY;}value($){let Z=$-this.at;if(!(Z>0))return this.w0;let Q=this.rate*Z;return this.goal>this.w0?Math.min(this.goal,this.w0+Q):Math.max(this.goal,this.w0-Q)}snapped($,Z){return Math.abs(this.goal-this.value(Z))<o2?this.goal:this.value($)}edge($,Z,Q){this.w0=this.value($),this.at=$,this.goal=Z,this.rate=Q}}function uB($,Z,Q){for(let X=Z;X>=0;X=$[X].parent)if(X===Q)return!0;return!1}class r2{constructor($,Z,Q){this.rig=void 0;this.facing=void 0;this.ikRig=void 0;this.model=void 0;this.chains=new Map;this.fronts=new Map;this.poles=new Map;this.effectors=[];this.feet=[];this.settles=!1;this.dropBone=null;this.groundedAt=NaN;this.feetKey="";this.boundSerial=0;this.feetRead=null;this.words=new lB(0);this.packed={inputs:new Uint32Array(0),stateWords:0,nextEdge:1/0,rounds:0};this.serials=0;this.poleSlots=WY;this.footSlots=WY;this.effectorSlots=WY;this.nextLeafPole=R4;this.released=[];this.freeingFeet=[];this.freeingEffectors=[];this.freeFeet=[];this.freeEffectors=[];this.usedFeet=0;this.usedEffectors=0;this.heldRoots=[];this.heldStamps=[];this.carried=null;this.carriedFeet=wB;this.drawn=!1;this.prev=0.5;this.supportOn=void 0;this.supportWord=0;this.supportMoves=[0,0,0];this.stands=!1;this.rig=$;this.facing=Q;this.model=yB($,Z,Q);this.ikRig=this.model.ikRig}takeMoves($,Z){$.standSupportFrame(Z),this.supportMoves=$.supportMoves}supportOf($){if($!==this.supportOn){this.supportOn=$;this.supportWord=(xY=xY%rg+1,xY);}return this.supportWord}table(){return lg(this.ikRig)}reachOn(a,b,c){return $c0P($c0C(10),r2.prototype,"reachOn").call(this,a,b,c)}effectorWeights($){let Z=0;for(let Q of this.effectors)Z+=Q.walk.value($);return{count:this.effectors.length,weight:Z}}grounds(){return this.feet.length>0}leavesGround($){return this.eachFoot($,$?.feet===!1?0:1,!1)}walking($,Z){for(let{walk:Q}of this.effectors)if(Q.value($)!==Q.goal||Z&&Q.goal>0)return!0;return!1}engaged(){return this.effectors.length>0||this.grounds()}solveClosure(a,b){return $c0P($c0C(11),r2.prototype,"solveClosure").call(this,a,b)}poseBoundInputs($,Z,Q=NaN){let X=this.ikRig,J=(GZ+h4)/b4,K=!(this.groundedAt<=Q)||this.carried!==null;if(X&&K){if(n2($,X.leftLeg),n2($,X.rightLeg),n2($,X.leftArm),n2($,X.rightArm),X.head)$.push(X.head.index);if(X.neck)$.push(X.neck.index);let q=X.leftLeg??X.rightLeg;if(q)Z.push(X.hips.index,J*r9(q))}for(let q of this.effectors){if($.push(q.bone.index),q.chain)$.push(q.chain.root.index,q.chain.mid.index);if(q.share)$.push(q.share.index)}let V=0;for(let q of this.feet)$.push(q.chain.root.index,q.chain.mid.index,q.chain.end.index),V=Math.max(V,r9(q.chain));let Y=this.feet.length>0,U=K&&Y&&this.dropBone!==X?.hips?this.dropBone:null;if(!K&&(Y||Q<this.groundedAt+vY))U=this.dropBone??X?.hips??null;if(U)Z.push(U.index,J*V)}pack($){this.standSupportFrame($.heldFrames);let Z=this.settles&&this.drawn&&this.carried===null;if(this.prev=$.now-$.elapsed,this.feet.length>0||this.groundedAt!==this.groundedAt)this.groundedAt=$.now;this.heldRoots.length=0,this.heldStamps.length=0;let Q=this.freeingFeet,X=this.freeingEffectors;for(let K=0;K<Q.length;K++)this.freeFeet.push(Q[K]);for(let K=0;K<X.length;K++)this.freeEffectors.push(X[K]);Q.length=0,X.length=0,this.released.length=0,this.reconcileEffectors($),this.reconcileFeet($),this.handReleasedReaches();let J=this.emit($);return this.drawn=!0,this.stands=Z&&this.released.length===0,J}limbOf($){let Z=this.chains.get($);if(Z===void 0){Z=this.rigLimbEnding($)??vB(this.model.rig,$,this.model.rest);this.chains.set($,Z);}return Z}rigLimbEnding(a){return $c0P($c0C(12),r2.prototype,"rigLimbEnding").call(this,a)}frontOf($){let Z=this.fronts.get($);if(!Z){let v$13;{let Z=this.model.rest,Q=this.facing;let X=null;for(let J of $.children)if(P$(J.name).includes(IB)){X=J;break}v$13=TB(Z,$,X,Q);}Z=v$13;this.fronts.set($,Z);}return Z}effectorFor($,Z){for(let Q=0;Q<this.effectors.length;Q++){let X=this.effectors[Q];if(X.bone===Z&&X.kind===$&&!X.superseded)return X}return null}takeEffectorSlot(){return this.freeEffectors.pop()??this.usedEffectors++}takeFootSlot(){return this.freeFeet.pop()??this.usedFeet++}seeReach($,Z,Q,X,J,K=null,V=null,Y=NaN,U=NaN){let q=this.effectorFor(Z,Q);if(q?.walk.goal===0&&q.walk.value(this.prev)>=o2&&J.weight>0)q.superseded=!0,q=null;let z=J.cross,j=z&&J.rides&&!z.to.rides,G=this.seeEffector($,q,Z,Q,X,K,V,j?z.to:J,Y,U),B=G.cross;if(G.cross=null,!z)return;let M=G.cross=this.seeEffector($,B&&this.effectors.includes(B)?B:null,Z,Q,X,K,V,j?J:z.to,Y,U);M.superseded=!0,M.blendOut=0,M.walk.edge(this.prev,M.walk.goal*(j?1-z.at:z.at),PY)}seeEffector($,Z,Q,X,J,K,V,Y,U,q){if(!Z){{Z=Aa.call(this,Z,Q,X,J,K,V,U,q)}}else if(J&&Z.walk.goal>0&&!(Y.weight>0))this.released.push(Z);Z.chain=J,Z.share=K,Z.face=V;let z=this.placeInto($,Y.target,Y.held,Z.target);if(this.aimWeight(Z,Y,z!==!1),Z.maxYaw=U,Z.maxPitch=q,Z.ride=null,Z.rideBody=!1,Z.rideTurn=null,Z.ridePole=null,Z.pole=null,Z.rotation=null,Z.object=null,Z.seen=!0,this.seeRide($,Z,Y.rides),Q==="reach"&&"bone"in Y)this.seeReachShape($,Z,Y),Z.object=Y.object??null;return Z}aimWeight($,Z,Q){let X=$.walk;if(Z===null?X.goal===0:$.blendIn===Z.blendIn&&$.blendOut===Z.blendOut&&(X.goal===Z.weight||!Q&&Z.weight>=X.goal))return;{if(Z!==null)$.blendIn=Z.blendIn,$.blendOut=Z.blendOut;
}let J=Z===null?0:Math.min(Z.weight,Q?1/0:X.goal),K=J>X.value(this.prev)?$.blendIn:$.blendOut;X.edge(this.prev,J,K>0?1/K:PY)}heldMoved($){for(let Z=0;Z<this.heldRoots.length;Z++)if($?.stampOf?.(this.heldRoots[Z])!==this.heldStamps[Z])return!0;return!1}heldFrame($,Z){let Q=$.heldFrames;if(!Q)return!1;return this.heldRoots.push(Z),this.heldStamps.push(Q.stampOf?.(Z)??NaN),Q.frameOf(Z,U9)}standSupportFrame($,Z,Q=0){let X=this.supportOn;if(X===void 0)return-1;let J=this.packed.inputs,K=J[$0.ground];if(K===A||J[K+g0.support]===0||!$?.frameOf(X,U9))return-1;let V=this.words.f32,Y=K+g0.frame,U=!1;for(let q=0;q<7;q++){let z=Math.fround(U9[q])-V[Y+q];if(q<3&&z!==0&&J[K+g0.on]!==0){let j=$0.origin+2*q;this.supportMoves[q]+=z,a9(V,j,V[j]+V[j+1]-z)}U||=z!==0,V[Y+q]=U9[q]}if(!U)return-1;return Z?.set(J.subarray(Y,Y+7),Q+Y),Z?.set(J.subarray($0.origin,$0.origin+6),Q+$0.origin),Y}placeInto($,Z,Q,X){if(Q===void 0){return c2(X,Z.x-$.origin[0],Z.y-$.origin[1],Z.z-$.origin[2]);}return Ca.call(this,$,Q,X,Z);}seeRide($,Z,Q){if(!Q)return;if(Q.bone===bB)this.seeBodyRide($,Z,Q);else{let X=this.model.rig.getBoneByName(Q.bone);if(!X||!X.isJoint||X===Z.bone)return;Z.ride=X;c2(Z.rideAt,Q.at.x,Q.at.y,Q.at.z);Z.rideTurn=!Q.turn?null:yZ(Z.rideTurnAt,Q.turn.x,Q.turn.y,Q.turn.z,Q.turn.w);Z.ridePole=!Q.pole?null:c2(Z.ridePoleAt,Q.pole.x,Q.pole.y,Q.pole.z)}AB(Z.rideTurnAt,$.holds?.[Z.bone.index])}seeBodyRide(a,b,c){return $c0P($c0C(13),r2.prototype,"seeBodyRide").call(this,a,b,c)}seeReachShape($,Z,Q){if(Q.pole)Z.pole=this.placeInto($,Q.pole,Q.poleHeld,Z.poleAt)||null;let{rotation:X,held:J}=Q;if(!X||J!==void 0&&!this.heldFrame($,J))return;let K=yZ(Z.rotationAt,X.x,X.y,X.z,X.w),V=U9;Z.rotation=J===void 0?K:l$(yZ(KO,V[3],V[4],V[5],V[6]),K,K);AB(Z.rotation,$.holds?.[Z.bone.index])}seeBagChannels($,Z,Q){for(let X=0;X<i2.length;X++){let J=i2[X],K=Q[J];if(!K)continue;{ba=Da.call(this,J,Z,$,K);if(ba===ma)continue;}}}seeBoneLeaves($,Z){let Q=Z.reach??IY;for(let J=0;J<Q.length;J++){let K=Q[J],V=this.model.rig.getBoneByName(K.bone),Y=V&&this.limbOf(V);if(V&&Y)this.seeReach($,"reach",V,Y,K)}let X=Z.aim??IY;for(let J=0;J<X.length;J++){let K=X[J],V=this.model.rig.getBoneByName(K.bone);if(V)this.seeReach($,"aim",V,null,K,null,this.frontOf(V),pB,hB)}}carry(){return{effectors:this.effectors.map(($)=>({effector:{...$,walk:Object.assign(new kZ,$.walk)},bone:$.bone.name,share:$.share?.name??null,ride:$.ride?.name??null})),feet:this.feet.map(($)=>({name:this.footName($.bone),walk:Object.assign(new kZ,$.walk)})),drawn:this.drawn}}adopt($){if(this.carried=$.effectors,this.carriedFeet=$.feet,$.drawn)this.drawn=!0}seatCarried(){let $=this.carried;if(this.carried=null,!$)return;for(let Z of $){let Q=this.model.rig.getBoneByName(Z.bone);if(!Q||!Q.isJoint||this.effectorFor(Z.effector.kind,Q))continue;let X=Z.effector.kind==="reach"?this.limbOf(Q):null;if(Z.effector.kind==="reach"&&!X)continue;let J=Z.ride===null?null:this.model.rig.getBoneByName(Z.ride);this.effectors.push({...Z.effector,bone:Q,chain:X,share:Z.share===null?null:this.model.rig.getBoneByName(Z.share),face:Z.effector.kind==="aim"?this.frontOf(Q):null,ride:J&&J.isJoint&&J!==Q?J:null,seen:!1,superseded:!1,slot:this.takeEffectorSlot(),serial:++this.serials}),this.boundSerial+=1}}reconcileEffectors($){this.seatCarried();let Z=$.ik;if(Z){if(Z.channels&&this.ikRig)this.seeBagChannels($,this.ikRig,Z.channels);this.seeBoneLeaves($,Z)}for(let Q=this.effectors.length-1;Q>=0;Q--){let X=this.effectors[Q];if(!X.seen&&X.walk.goal>0){Ea.call(this,X);}if(X.seen=!1,X.walk.goal===0&&X.walk.snapped($.now,this.prev)<o2)Fa.call(this,Q,X);}}footFor($){let Z=this.feet;for(let Q=0;Q<Z.length;Q++)if(Z[Q].bone===$)return Z[Q];return null}footName($){if(this.ikRig?.leftLeg?.end===$)return"LeftFoot";if(this.ikRig?.rightLeg?.end===$)return"RightFoot";return $.name}seeFoot($,Z,Q){let X=this.footFor($);if(!X){let J;{let Z=this.model.rest,Q=XO;let X=$.index*16;J=Q.set(Z[X+12],Z[X+13],Z[X+14]);}let K=l2(this.rig,J.x,J.y,J.z);let V=J.y;let Y=E8(J.x,J.z);let U=this.seatBall($,J.x,K,J.z);let q=this.carriedFeet.length>0?this.footName($):"";let z=this.carriedFeet.find((G)=>G.name===q);let j=new kZ;if(j.w0=this.drawn&&!this.settles?0:Q,z)j.w0=z.walk.value(this.prev);j.goal=Q,j.at=this.prev,j.rate=d2,X={bone:$,chain:Z,restHeight:Math.max(0,K),restAnkle:V,restReach:Y,ball:U.bone,restRise:U.rise,walk:j,seen:!0,slot:this.takeFootSlot(),serial:++this.serials,handed:0,handedBy:0},this.feet.push(X),this.feetChanged();return}if(X.walk.goal!==Q)X.walk.edge(this.prev,Q,d2);if(this.settles)X.walk.w0=Q;X.seen=!0}seatBall($,Z,Q,X){let J=null,K=0,V=0;for(let Y of $.children){if(!Y.isJoint)continue;let U;{let $=Y,Z=this.model.rest,Q=JO;let X=$.index*16;U=Q.set(Z[X+12],Z[X+13],Z[X+14]);}let q=l2(this.rig,U.x,U.y,U.z);let z=E8(U.x-Z,U.z-X);if(q>=Q||z<=V)continue;V=z,J=Y,K=Q-q}return{bone:J,rise:K}}ownFeetWeight($){let Z=$.ik;return Z?.feet!==!1&&(!$.held||Z?.feet||Z?.feetOffset!==void 0)?1:0}rigFootWeight($,Z,Q,X){if(!$)return X;{let v$60;Ga:{for(let J=0;J<$.length;J++)if($[J].bone===Z.end.name){v$60=$[J].weight;break Ga;}for(let J=0;J<$.length;J++)if(P$($[J].bone)===(Q===0?"leftfoot":"rightfoot")){v$60=$[J].weight;break Ga;}
v$60=aa;}if((ba=v$60)!==aa)return ba}return X}reconcileFeet($){this.eachFoot($.ik,this.ownFeetWeight($),!0),this.carriedFeet=wB;let Z=!1;for(let Q=this.feet.length-1;Q>=0;Q--){let X=this.feet[Q];if(!X.seen&&X.walk.goal!==0)X.walk.edge(this.prev,0,d2);if(X.seen=!1,X.walk.goal===0&&(this.settles||X.walk.value($.now)<=0))this.feet.splice(Q,1),this.freeingFeet.push(X.slot),Z=!0}if(Z)this.feetChanged()}eachFoot($,Z,Q){let X=this.ikRig,J=$?.ground;for(let V=0;X&&V<2;V++){let Y=V===0?X.leftLeg:X.rightLeg,U=Y?this.rigFootWeight(J,Y,V,Z):0;if(!Y||!(U>0))continue;if(!Q)return!0;this.seeFoot(Y.end,Y,U)}let K=J??IY;for(let V=0;V<K.length;V++){let Y=K[V],U=Y.weight>0?this.model.rig.getBoneByName(Y.bone):null,q=U&&!(X&&(X.leftLeg?.end===U||X.rightLeg?.end===U))?this.limbOf(U):null;if(!U||!q)continue;if(!Q)return!0;this.seeFoot(U,q,Y.weight)}return!1}feetChanged(){if(this.feetRead=null,this.boundSerial+=1,this.feet.length===0){this.feetKey="";return}let $=this.feet.map((Q)=>Q.chain.root),Z=this.ikRig?.hips??null;this.dropBone=Z&&$.every((Q)=>Q!==Z&&(Q===Z||b2(Q,Z)))?Z:NY(this.model.rig,$);this.feetKey=`${this.feet.map((Q)=>`${Q.bone.index}:${Q.restAnkle}`).join(",")}|${this.dropBone?.index??-1}`}handReleasedReaches(){for(let $=0;$<this.released.length;$++){{ba=Ha.call(this,$);if(ba===ma)continue;}}}feetOf(){if(this.feet.length===0)return null;return this.feetRead??={ends:this.feet.map(($)=>$.bone.index),restHeights:this.feet.map(($)=>$.restAnkle),drop:this.dropBone?.index??-1,key:this.feetKey}}poleOf($){let Z=this.poles.get($);if(!Z){let Q=dg(this.ikRig,$);Z=Q>=0?{slot:Q,serial:Q+1}:Ia.call(this),this.poles.set($,Z)}return Z}putChain($,Z,Q){let X=$.u32;X[Z+u0.root]=Q.root.index;X[Z+u0.mid]=Q.mid.index;X[Z+u0.end]=Q.end.index;X[Z+u0.leg]=Q.leg?1:0;X[Z+u0.arm]=cg(this.ikRig,Q);let J=this.poleOf(Q);X[Z+u0.pole]=J.slot,X[Z+u0.poleSerial]=J.serial}rounds(){let $=this.feet,Z=this.effectors,Q=0;for(let X=0;X<$.length;X++){let J=$[X];for(let K=0;K<Z.length;K++){let V=Z[K];if(V.kind==="reach"&&V.bone===J.bone){Q++;break}}}return($.length>0&&this.legsStandApart()?1:$.length)+(Z.length===0?0:Z.length+Q+1)}legsStandApart(){let $=this.rig.nodes,Z=this.feet;for(let Q=0;Q<Z.length;Q++){for(let X=Q+1;X<Z.length;X++){let J=Z[Q].chain.root.index,K=Z[X].chain.root.index;if(uB($,J,K)||uB($,K,J))return!1}}return!0}emit($){while(this.footSlots<this.usedFeet)this.footSlots*=2;while(this.effectorSlots<this.usedEffectors)this.effectorSlots*=2;let Z=$.ground,Q=this.feetOf(),X=Q&&$.gait&&$.gait.clips.length>0?$.gait:null,J=this.words,K=this.effectors,V=this.feet;J.reset($0.words+K.length*j0.words+V.length*C0.words+(!Z?0:g0.dy+Z.dy.length)+(!X||!Q?0:sg(X,Q)));J.take($0.words);let{u32:Y,f32:U}=J,q=p2(this.facing);AZ(J,$0.front,q.x,q.y,q.z);U[$0.feetOffset]=$.ik?.feetOffset??0;Y[$0.drop]=this.dropBone?.index??A;U[$0.floor]=l2(this.rig,0,0,0);U[$0.seen]=ag(this.ikRig);for(let B=0;B<3;B++)a9(U,$0.origin+2*B,$.origin[B]-this.supportMoves[B]);Y[$0.footSlots]=this.footSlots,Y[$0.effectorSlots]=this.effectorSlots,Y[$0.effectors]=K.length,Y[$0.effectorsAt]=J.length;let z=1/0;for(let B=0;B<K.length;B++){let M=K[B],L=M.walk,F=J.take(j0.words);if(this.putEffector(J,F,M),M.kind==="reach")U[$0.seen]=Math.max(U[$0.seen],r9(M.chain));if(L.goal===0&&L.w0>0)z=Math.min(z,L.at+(L.w0-o2)/L.rate)}Y[$0.feet]=V.length,Y[$0.feetAt]=J.length;for(let B=0;B<V.length;B++){let M=V[B],L=M.walk,F=J.take(C0.words);if(Y[F+C0.bone]=M.bone.index,this.putChain(J,F+C0.chain,M.chain),U[F+C0.legLen]=M.chain.rootLen+M.chain.midLen,U[F+C0.restHeight]=M.restHeight,U[F+C0.restReach]=M.restReach,U[F+C0.weight]=L.w0,a9(U,F+C0.weightAt,L.at),U[F+C0.goal]=L.goal,Y[F+C0.slot]=M.slot,Y[F+C0.serial]=M.serial,Y[F+C0.gait]=B,Y[F+C0.handed]=M.handed,Y[F+C0.handedBy]=M.handedBy,Y[F+C0.ball]=M.ball?.index??A,U[F+C0.restRise]=M.restRise,L.goal===0&&L.w0>0)z=Math.min(z,L.at+L.w0/d2)}Y[$0.ground]=!Z?A:$O(J,Z,$,Z.on!==void 0&&($.heldFrames?.frameOf(Z.on,U9)||this.heldFrame($,Z.on))?this.supportOf(Z.on):0);Y[$0.gait]=!X||!Q?A:tg(J,X,Q);while(this.poleSlots<this.nextLeafPole)this.poleSlots*=2;Y[$0.poles]=this.poleSlots;let j=a8.words+this.poleSlots*F2.words+this.footSlots*vV.words+this.effectorSlots*TV.words,G=this.packed;return G.inputs=J.view(),G.stateWords=j,G.nextEdge=z,G.rounds=this.rounds(),G}putEffector($,Z,Q){let{u32:X,f32:J}=$,K=0;if(Q.kind==="aim")K|=MV;if(Q.chain&&(Q.chain===this.ikRig?.leftArm||Q.chain===this.ikRig?.rightArm))K|=FV;if(Q.rideTurn)K|=LV;if(Q.ridePole)K|=HV;if(Q.rideBody)K|=PV;if(Q.pole)K|=NV;if(Q.rotation)K|=WV;if(Q.superseded)K|=IV;if(Q.face)K|=xV;if(Q.chain)K|=DV;X[Z+j0.flags]=K;X[Z+j0.bone]=Q.bone.index;if(Q.chain)this.putChain($,Z+j0.chain,Q.chain);else {{X.fill(A,Z+j0.chain,Z+j0.chain+u0.words);
}}X[Z+j0.share]=Q.share?.index??A;if(Q.face){{AZ($,Z+j0.face,Q.face.x,Q.face.y,Q.face.z);
}}if(J.set(Q.target,Z+j0.target),X[Z+j0.ride]=Q.rideBody?0:Q.ride?.index??A,J.set(Q.rideAt,Z+j0.rideAt),Q.rideTurn)J.set(Q.rideTurn,Z+j0.rideTurn);if(Q.ridePole)J.set(Q.ridePole,Z+j0.ridePole);if(Q.pole)J.set(Q.pole,Z+j0.pole);J.set(Q.rotation??pg,Z+j0.rotation);let V=Q.walk;J[Z+j0.weight]=V.w0,a9(J,Z+j0.weightAt,V.at),J[Z+j0.goal]=V.goal,J[Z+j0.rate]=V.rate,J[Z+j0.maxYaw]=Q.maxYaw,J[Z+j0.maxPitch]=Q.maxPitch,X[Z+j0.slot]=Q.slot,X[Z+j0.serial]=Q.serial}}function ag($){if(!$)return 0;let Z=Math.max(r9($.leftLeg),r9($.rightLeg));return(Z>0?Z:Na($))*E4}function r9($){return!$?0:$.rootLen+$.midLen}var rg=16777215,xY=0;function $O($,Z,Q,X){let J=$.take(g0.dy+Z.dy.length),K=$.u32,V=$.f32,Y=Z.on!==void 0,U=Z.turn,q=zZ;if(U&&!Y)q=L2;else if(U&&X)q=BV;if(V[J+g0.d]=Z.d,K[J+g0.n]=Z.grid.n,K[J+g0.turned]=q,K[J+g0.support]=X,U&&q!==zZ)V.set(U,J+g0.turn);if(q===L2&&U){let z=ZO(U,Q.origin);AZ($,J+g0.x,Z.grid.x-z[0],Z.grid.y-z[1],Z.grid.z-z[2])}else if(Y)AZ($,J+g0.x,Z.grid.x,Z.grid.y,Z.grid.z);else AZ($,J+g0.x,Z.grid.x-Q.origin[0],Z.grid.y-Q.origin[1],Z.grid.z-Q.origin[2]);if(K[J+g0.on]=Y&&q===zZ?1:0,X)V.set(U9.subarray(0,7),J+g0.frame);return V.set(Z.dy,J+g0.dy),J}var mB=[0,0,0];function ZO($,Z){let Q=fB($[0],$[1],$[2],$[3]);return t2(mB,-$[0]/Q,-$[1]/Q,-$[2]/Q,$[3]/Q,Z[0],Z[1],Z[2]),mB}function QO($,Z){if(Z==="leftArm")return $.leftArm;if(Z==="rightArm")return $.rightArm;if(Z==="leftLeg")return $.leftLeg;return $.rightLeg}var XO=new O,JO=new O,U9=new Float64Array(11),KO=[0,0,0,1];var e9=null;function eB($){return{row:$,heldFrames:null,grip:({door:null,rig:null,resolved:!1,hands:[],bonesByName:new Map,revision:0,posedRow:null,posedRevision:0,posedRead:-1,toldTurns:"",clipTurned:new Uint8Array(0),clipTurnedNodes:[],clipTurnRead:[],clipTurnReadOwn:!1,clipTurnReadOn:null,ownClips:!1,closedAt:NaN,heldRead:[]}),owed:!0,reach:null,reachTable:null,reachInputs:null,reachStateWords:0,carried:null,held:!1,holds:null,origin:new Float64Array(3),chain:new Float32Array(16).fill(NaN),clips:[],nextEdge:1/0,reachUntil:1/0,reachStands:!1,gripTable:null,gripWords:null,gripIn:0,gripForEye:0,gripRead:"",gripReread:!1,gripRested:new Set,gripUntil:1/0,gripStands:!1,read:null,revision:0,bound:({turned:[-1],shifts:[],packer:null,serial:-1})}}function ZM(a){return (ZM=$c0C(14)).call(this,a)}function kY($,Z){if(Z.reachStands)e9?.leave($,m0);Z.reachStands=!1;{if(Z.gripStands)e9?.leave($,y8);Z.gripStands=!1,Z.gripWords=null}Z.gripReread=!1;Z.gripForEye=0;Z.owed=!0}var X7=new Map,VO=32;function XM($,Z){let Q=$.reach?.carry()??$.carried;if(Q===null||Q.effectors.length===0&&Q.feet.length===0)return;if(X7.delete(Z),X7.set(Z,Q),X7.size>VO)aB(X7)}function KM($,Z,Q,X=NaN){$.reach?.poseBoundInputs(Z,Q,X);for(let J of $.grip.hands){for(let K of J.fingers)Z.push(K.joints[0].index);if(J.chain)Z.push(J.chain.root.index)}}function yY($){return $.revision+$.grip.revision}function VM($,Z){if($[0]===Z[0]&&$[1]===Z[1]&&$[2]===Z[2])return!1;return $.set(Z),!0}function qO($,Z){if(Z===null){if(isNaN($[0]))return!1;return $[0]=NaN,!0}let Q=!1;for(let X=0;X<16;X++){if($[X]===Z[X])continue;$[X]=Z[X],Q=!0}return Q}var Z1=[],iB={nodes:[],clips:Z1},zO=[0,0,0];class YM{constructor(){this.now=0.5;this.elapsed=0.5;this.ik=null;this.ground=null;this.origin=zO;this.held=!1;this.heldFrames=null;this.chain=null;this.gait=null;this.holds=null;}}var X$=new YM;function UM($,Z,Q){let X=Z1[$];if(X===void 0)Z1.push({clip:Z,block:Q});else X.clip=Z,X.block=Q}function qM($,Z){if(Z1.length=$,$===0)return null;return iB.nodes=Z,iB}function jO($){let Z=0;for(let Q=0;Q<$.blocks.length&&Q<$.clips.length;Q++){if($.blocks[Q].at>=0){UM(Z++,$.clips[Q],$.blocks[Q].at);}}return qM(Z,$.nodes)}function BO($,Z,Q){if($===null)return{inputs:Z.inputs,stateWords:Z.stateWords,table:Q};return $.inputs=Z.inputs,$.stateWords=Z.stateWords,$.table=Q,$}function zM($,Z,Q,X,J,K,V,Y){X$.ik=$,X$.ground=Z,X$.origin=Q,X$.held=X,X$.heldFrames=J,X$.chain=K,X$.gait=V,X$.holds=Y}var e2=[],$1=[];function GM($,Z){if(Z.packer===$&&Z.serial===$.boundSerial)return!1;if(Z.packer=$,Z.serial=$.boundSerial,e2.length=0,$1.length=0,$.poseBoundInputs(e2,$1),V0(Z.turned,e2)&&V0(Z.shifts,$1))return!1;return CY(Z.turned,e2),CY(Z.shifts,$1),!0}function MO($,Z,Q,X){let v$14;{let $$18=Z,Z$21=Q,Q$14=X.facing;{let $=$$18,Z=Z$21,Q=Q$14;let X=$.reach,J=X;if(J?.rig!==Z||J.facing!==Q){let K=J?.carry()??$.carried;if(J=new r2(Z,$.row,Q),X)J.takeMoves(X,$.heldFrames);if(K!==null)J.adopt(K);$.carried=null,$.reach=J,$.reachTable=a2(J.table()),$.owed=!0,$.gripTable=null}v$14=J;}}let J=v$14;let v$15;{let $$19=Z,Z$22=J,Q$15=X;{let $=$$19,Z=Z$22,Q=Q$15;let X=VM($.origin,Q.origin)||$.owed||Q.now>=$.nextEdge||Z.heldMoved($.heldFrames)||Q.held!==$.held||Q.holds!==$.holds;if(qO($.chain,Q.chain))X=!0;let J=$.clips,K=Q.blocks,V=J.length===K.length;for(let Y=0;V&&Y<K.length;Y++)V=J[Y]===K[Y].at;if(!V){J.length=K.length;for(let Y=0;Y<K.length;Y++)J[Y]=K[Y].at;X=!0}v$15=X;}}if(!v$15){if(Z.reachStands&&X.now>=Z.reachUntil)e9?.leave($,m0),Z.reachStands=!1;return!1}Z.owed=!1;Z.held=X.held;Z.holds=X.holds;zM(X.ik,X.ground,X.origin,X.held,Z.heldFrames,X.chain,jO(X),X.holds);X$.now=X.now;X$.elapsed=X.elapsed;let K=J.pack(X$);Z.reachInputs=K.inputs,Z.reachStateWords=K.stateWords;let V=J.engaged();if(V)Z.reachUntil=1/0;else if(Z.reachUntil===1/0)Z.reachUntil=X.now+vY;let Y=!V&&(!Z.reachStands||X.now>=Z.reachUntil);if(Z.nextEdge=Y?K.nextEdge:Math.min(K.nextEdge,Z.reachUntil),Y){if(Z.reachStands)e9?.leave($,m0);Z.reachStands=!1}else if(Z.reachTable!==null)Z.reachStands=e9?.stand($,m0,K.inputs,K.stateWords,Z.reachTable,!1,K.rounds,J.grounds())??!1;if(GM(J,Z.bound))Z.revision+=1;return!0}var oB=new WeakMap,FO=0;function _8($){let Z=oB.get($);if(Z===void 0)oB.set($,Z=FO++);return Z}function LO($,Z){let Q=$.reach,X=aV(Z.layers),J=`${$.grip.posedRevision}|`,K=NaN;for(let V of Z.layers)if(J+=`,${_8(V.clip)}:${V.maskNodes&&_8(V.maskNodes)}:${V.targetWeight}`,O2(V))J+=`@${V.time}`;else if(X>0&&rV(V,Z.layers)){let Y=V.time/V.speed;if(K!==K)K=Y;J+=`~${(Math.round((Y-K)*1e6/X)%1e6+1e6)%1e6}`}J+="|";for(let V of $.grip.hands){let Y=Q?.reachOn(V.bone.index,Z.now,Z.elapsed)??null;J+=Y===null?"-,":`${Y.object??"."},`}return J}function Wi($,Z){let v$7;{let $$11=$.grip;{let $=$$11;let Q=!1;for(let X of $.hands){if(!X.items.includes(Z))continue;X.solvedItems.length=0,X.fold=Q=!0}v$7=Q;}}if(!v$7)return!1;return $.gripIn=1,!0}function sB($,Z,Q){return!!Z&&!!$.reachOn(Z.end.index,Q.now,Q.elapsed)?.object}function HO($,Z,Q,X,J,K){let V=Z.gripReread;Z.gripReread=J;let{grip:Y,reach:U}=Z;if(J||Y.door===null||U===null)return;if(Z.gripStands&&Q.now>=Z.gripUntil){{if(Z.gripStands)e9?.leave($,y8);Z.gripStands=!1,Z.gripWords=null}}if(K&&Z.gripForEye>0)return;let q=U.ikRig;if(Y.resolved&&Y.rig===q&&Y.hands.length===0)return;if(!Y.resolved&&!(q!==null&&(eV(Y,Q.ownerEntityId)||sB(U,q.rightArm,Q)||sB(U,q.leftArm,Q))))return;let z=Z.gripForEye;Z.gripForEye=0;let j=Z.gripIn===1||z>0,G=z===2||!Y.resolved||Y.rig!==q||eV(Y,Q.ownerEntityId);if(G)Z.gripRested.clear();if(Z.gripIn>1)Z.gripIn-=1;let B=X||G||j||V||Y.posedRead!==Y.posedRevision?LO(Z,Q):Z.gripRead;if(B!==Z.gripRead)Z.gripRead=B,G=!0;if(G)for(let N of Y.hands)N.support.missed=Z.gripRested.has(B)?1/0:0;else if(!j)return;if(K){Z.gripForEye=G?2:1,Z.gripIn=0;return}let M=(N)=>U.reachOn(N,Q.now,Q.elapsed);let L=WO($,Z,Q,pG(Y,M,G));Z.gripIn=hG(Y,L,q,Q.ownerEntityId,M,Q.now,Q.elapsed,Q.layers);if(Z.gripIn===0&&Y.hands.some((N)=>N.support.missed))Z.gripRested.add(B);if(Y.hands.length===0)return;Z.gripTable??=a2(ZB(Y.hands));let F=Y.hands.some((N)=>N.holding||N.support.active);if(F)Z.gripUntil=1/0;else if(Z.gripUntil===1/0)Z.gripUntil=Q.now+m4;if(!F&&!Z.gripStands)return;let H=QB(Y,Y.door);if(Z.gripWords!==null&&V0(H,Z.gripWords))return;Z.gripWords=H,Z.gripStands=e9?.stand($,y8,H,N2.words,Z.gripTable,!1,Y.hands.length,Y.hands.some((N)=>N.own!==""))??!1}var SY=[];function NO($){SY.length=0;for(let Z of $.hands)SY.push(Z.bone);return SY}function WO($,Z,Q,X){let{reach:J,grip:K}=Z;let V=!X&&K.resolved&&K.rig===(J?.ikRig??null)&&K.hands.length>0?NO(K):null;let Y=Q.readerRig($,V);if(J===null||Z.reachTable===null||!X)return Y;let U=Z.reachInputs;if(U===null)return Y;let q=Z.read??=new LZ({nodes:Q.nodes,skins:Q.skins});return q.reset(),q.run(Y,Q.now+uV,EV,_V,{inputs:U,stateWords:Z.reachStateWords,table:Z.reachTable},null,[],null,!0),Q.readerSpoiled($),Y}var tB=($,Z,Q,X)=>$&&Z!==null&&X!==null?{inputs:Z,stateWords:Q,table:X}:null;function MM($,Z,Q,X,J,K,V,Y,U){let q=K?.states[m0]??null;let z=K?.states[y8]??null;let j=tB($.reachStands&&(K===null||q!==null),$.reachInputs,$.reachStateWords,$.reachTable);let G=tB($.gripStands&&(K===null||z!==null),$.gripWords,N2.words,$.gripTable);if(j===null&&G===null)return;let B=$.read??=new LZ({nodes:V,skins:Y});if(U!==null)for(let M=0;M<J.length;M++){let L=U.get(J[M].clip.channels)?.get(V.length);if(L!==void 0)B.nameClip(J[M].clip,L.at)}if(K!==null){B.run(Z,Q,X,1,j,G,J,{reach:q,grip:z});return}B.reset(),B.run(Z,Q+uV,EV,_V,j,G,J,null,!0)}class FM{constructor(){this.owed=!0;this.packer=null;this.table=null;this.pass=null;this.read=null;this.clock=0.5;this.stepSeconds=0.5;this.nextEdge=1/0;this.origin=new Float64Array(3);this.clips=[];this.solved=new Float32Array(0);this.revision=0;this.bound={turned:[-1],shifts:[],packer:null,serial:-1};this.view=null;this.clock=0,this.stepSeconds=0}}function LM(){return new FM}function HM($){$.read?.reset()}function NM($,Z,Q,X,J,K,V){if($.stepSeconds>0)$.clock+=$.stepSeconds;let{packer:Y,read:U}=$;if(Y?.rig!==Z||U===null)Y=$.packer=new r2(Z,null,void 0),$.table=a2(Y.table()),U=$.read=new LZ({nodes:Z.nodes,skins:[]}),$.owed=!0;let q;{let Z$24=Y,Q$17=J,X$10=$.clock>=$.nextEdge,J$8=K,K$5=V;{let Z=Z$24,Q=Q$17,X=X$10,J=J$8,K=K$5;Z.standSupportFrame(J);let V=VM($.origin,Q)||$.owed||X||Z.heldMoved(J);let Y=$.clips.length===K.length;for(let U=0;Y&&U<K.length;U++)Y=$.clips[U]===K[U].clip;if(!Y)$.clips=K.map((U)=>U.clip),V=!0;q=V;}}if(q){$.owed=!1;let v$16;{let $$20=U,Z$23=V,Q$16=Z;{let $=$$20,Z=Z$23,Q=Q$16;for(let X=0;X<Z.length;X++){UM(X,Z[X].clip,$.blockOf(Z[X].clip));}v$16=qM(Z.length,Q.nodes);}}zM(Q,X,J,!1,K,null,v$16,null);X$.now=$.clock;X$.elapsed=$.stepSeconds;let z=Y.pack(X$);$.pass=$.table===null?null:BO($.pass,z,$.table);$.nextEdge=z.nextEdge;if(GM(Y,$.bound))$.revision+=1}if($.pass===null)return q;U.view=$.view;U.now=$.clock;U.dt=$.stepSeconds;U.runFrame(Z,1,$.pass,null,V);let v$17;DO:{let Z$25=Z.pose,Q$18=Z.nodes.length*xO;{let Z=Z$25,Q=Q$18;if($.solved.length!==Q){v$17=($.solved=Z.slice(0,Q),!0);break DO;}let X=$.solved,J=!1;for(let K=0;K<Q;K++)if(X[K]!==Z[K])X[K]=Z[K],J=!0;v$17=J;}}return v$17||q}var xO=10;function WM($){return $.packer?.grounds()??!1}function IM($,Z,Q){$.packer?.poseBoundInputs(Z,Q)}var PO=[`@group(0) @binding(0) var<storage,read> bake: array<u32>;
@group(0) @binding(1) var<storage,read> rows: array<u32>;
@group(0) @binding(2) var<storage,read_write> scratch: array<f32>;
@group(0) @binding(3) var<storage,read_write> page: array<f32>;
@group(0) @binding(4) var<storage,read_write> state: array<f32>;
@group(0) @binding(5) var<storage,read_write> readPlane: array<f32>;
@group(0) @binding(6) var<storage,read_write> worldBlock: array<f32>;
var<workgroup> wgRow: u32;
`,`const NONE: u32 = 4294967295u;
`,`const WG: u32 = 128u;
`,`fn bf(i: u32) -> f32 {
return bitcast<f32>(bake[i]);
}
`,`fn rf(i: u32) -> f32 {
return bitcast<f32>(rows[i]);
}
`,`fn finiteWord(x: f32) -> bool {
return (bitcast<u32>(x) & 2139095040u) != 2139095040u;
}
const FLOOR: f32 = 0.001;
`,`fn since(clockWord: u32,hi: f32,lo: f32) -> f32 {
let d = rf(clockWord) - hi;
return d + (rf(clockWord + 1u) - lo);
}
fn walkWeight(from_: f32,to: f32,rate: f32,seconds: f32) -> f32 {
if (!(seconds > 0.0)) {
return from_;
}
let step = rate * seconds;
if (to > from_) {
return min(to,from_ + step);
}
return max(to,from_ - step);
}
`,`fn presenceOf(now: f32,from_: f32,to: f32) -> f32 {
if ((now == to) || ((from_ > 1.0) == (to > 1.0))) {
return min(now,1.0);
}
let start = min(from_,1.0);
let end = min(to,1.0);
return start + (end - start) * min(1.0,max(0.0,(now - from_) / (to - from_)));
}
fn arrivalAt(now: f32,from_: f32,to: f32,arrivalFrom: f32,rate: f32,seconds: f32) -> f32 {
var start = arrivalFrom;
if (rate > 0.0) {
let walked = arrivalFrom + rate * max(seconds,0.0);
if (walked < 1.0) {
return walked;
}
start = 1.0;
}
if (to == 0.0) {
if (now < from_) {
return start * now / from_;
}
return start;
}
if ((now == to) || (to == from_)) {
return 1.0;
}
return min(1.0,start + (1.0 - start) * (now - from_) / (to - from_));
}
fn wrap(x: f32,period: f32) -> f32 {
var r = x - period * floor(x / period);
if (r >= period) {
r = r - period;
}
if (r < 0.0) {
r = r + period;
}
return r;
}
fn layerState(row: u32,layer: u32,ev: u32) {
let flags = rows[layer + 1u];
let span = rf(layer + 5u);
var clock = 4u;
var lag = 0.0;
if ((flags & 64u) != 0u) {
clock = 6u;
lag = rf(row + 39u);
}
let ran = since(clock,rf(layer + 8u),rf(layer + 9u)) - lag;
let x = rf(layer + 7u) + ran * rf(layer + 6u);
var t = 0.0;
if (span > 0.0) {
if ((flags & 256u) != 0u) {
t = clamp(x,0.0,span);
} else if ((flags & 512u) != 0u) {
t = wrap(x,span + span);
if (t > span) {
t = span + span - t;
}
} else {
t = wrap(x,span);
}
}
let walked = since(4u,rf(layer + 14u),rf(layer + 15u));
let target_ = rf(layer + 11u);
var w = rf(layer + 10u);
if ((flags & 128u) == 0u) {
w = walkWeight(w,target_,rf(layer + 12u),walked);
if (abs(target_ - w) < FLOOR) {
w = target_;
}
w = max(w,rf(layer + 13u));
}
let from_ = rf(layer + 16u);
let override_ = (flags & 1u) != 0u;
let released = (flags & 32u) != 0u;
var presence = 0.0;
if (override_) {
presence = presenceOf(w,from_,target_);
}
var arrival = 0.0;
if (!released) {
arrival = arrivalAt(w,from_,target_,rf(layer + 17u),rf(layer + 18u),walked);
}
var derived = flags & (1u | 32u | 1024u);
if (w == FLOOR) {
derived = derived | 2u;
}
if (w >= FLOOR) {
derived = derived | 4u;
}
if (w > FLOOR) {
derived = derived | 8u;
}
if (override_ && (presence >= 1.0)) {
derived = derived | 16u;
}
scratch[ev] = rf(layer + 4u) + t;
scratch[ev + 1u] = 0.0;
scratch[ev + 2u] = w;
scratch[ev + 3u] = presence;
scratch[ev + 4u] = arrival;
scratch[ev + 5u] = f32(derived);
}
`,`fn layerStateAt(pose: u32,n: u32,l: u32) -> u32 {
return pose + n * 26u + 16u + l * 6u;
}
`,`fn stateFlags(ev: u32) -> u32 {
return u32(scratch[ev + 5u]);
}
fn slerpFlat(a: vec4f,bIn: vec4f,tIn: f32) -> vec4f {
let t = clamp(tIn,0.0,1.0);
var b = bIn;
var c = dot(a,bIn);
if (c < 0.0) {
c = -c;
b = -bIn;
}
var w1 = 1.0 - t;
var w2 = t;
if (!(1.0 - c < 0.00001)) {
let theta = acos(min(1.0,c));
let s = sin(theta);
w1 = sin((1.0 - t) * theta) / s;
w2 = sin(t * theta) / s;
}
let q = a * w1 + b * w2;
let len = sqrt(dot(q,q));
if (len < 1e-12) {
return vec4f(0.0,0.0,0.0,1.0);
}
return q * (1.0 / len);
}
`,`const QUAT_FRACTION_STEP: f32 = 0.0000013487005;
const SQRT1_2: f32 = 0.70710678;
`,`fn quatFraction(fraction: u32) -> f32 {
return f32(fraction) * QUAT_FRACTION_STEP - SQRT1_2;
}
fn keyQuat(first: u32,second: u32) -> vec4f {
let a = quatFraction(first & 1048575u);
let b = quatFraction((first >> 20u) | ((second & 255u) << 12u));
let c = quatFraction((second >> 8u) & 1048575u);
let largest = second >> 28u;
let d = sqrt(max(1.0 - (a * a + b * b + c * c),0.0));
let x = select(a,d,(largest == 0u));
let y = select(select(b,d,(largest == 1u)),a,(largest == 0u));
let z = select(select(c,d,(largest == 2u)),b,(largest < 2u));
let w = select(c,d,(largest == 3u));
return vec4f(x,y,z,w);
}
fn keyVec(values: u32,at: u32,stride: u32,target_: u32) -> vec4f {
let b = values + at * stride;
if (target_ != NONE) {
return vec4f(bf(b + target_),0.0,0.0,0.0);
}
if (stride == 2u) {
return keyQuat(bake[b],bake[b + 1u]);
}
var w = 0.0;
if (stride == 4u) {
w = bf(b + 3u);
}
return vec4f(bf(b),bf(b + 1u),bf(b + 2u),w);
}
fn atOrPast(hi: f32,lo: f32,key: f32) -> bool {
return (hi > key) || ((hi == key) && (lo >= 0.0));
}
fn keyTime(times: u32,grid: u32,k: u32) -> f32 {
return bf(grid + ((bake[times + (k >> 1u)] >> ((k & 1u) << 4u)) & 65535u));
}
fn keyAt(times: u32,grid: u32,n: u32,t: f32,tLo: f32) -> u32 {
var lo = 0u;
var hi = n;
loop {
if (!(hi - lo > 1u)) { break; }
let mid = (lo + hi) >> 1u;
if (atOrPast(t,tLo,keyTime(times,grid,mid))) {
lo = mid;
} else {
hi = mid;
}
}
return lo;
}
fn trackValue(clip: u32,rec: u32,t: f32,tLo: f32,target_: u32) -> vec4f {
let times = clip + bake[rec];
let values = clip + bake[rec + 1u];
let n = bake[rec + 2u];
let word = bake[rec + 3u];
let kind = word & 3u;
let stride = word >> 4u;
let grid = clip + bake[clip + 2u];
let k = keyAt(times,grid,n,t,tLo);
let a = keyVec(values,select(k,k * 3u + 1u,(kind == 2u)),stride,target_);
if (((k + 1u >= n) || (kind == 1u)) || !atOrPast(t,tLo,keyTime(times,grid,k))) {
return a;
}
let t0 = keyTime(times,grid,k);
let delta = keyTime(times,grid,k + 1u) - t0;
var f = 0.0;
if (delta > 0.0) {
f = (f32(t - t0) + tLo) / delta;
}
let b = keyVec(values,select(k + 1u,k * 3u + 4u,(kind == 2u)),stride,target_);
if (kind == 2u) {
let f2 = f * f;
let f3 = f2 * f;
let h00 = 2.0 * f3 - 3.0 * f2 + 1.0;
let h10 = f3 - 2.0 * f2 + f;
let h01 = -2.0 * f3 + 3.0 * f2;
let h11 = f3 - f2;
let hermite = a * h00 + keyVec(values,k * 3u + 2u,stride,target_) * (h10 * delta) + (b * h01 + keyVec(values,k * 3u + 3u,stride,target_) * (h11 * delta));
if ((word & 4u) != 0u) {
let len = sqrt(dot(hermite,hermite));
if (len < 1e-12) {
return vec4f(0.0,0.0,0.0,1.0);
}
return hermite * (1.0 / len);
}
return hermite;
}
if ((word & 4u) != 0u) {
return slerpFlat(a,b,f);
}
return a + (b - a) * f;
}
fn trackOf(layer: u32,node: u32,lane: u32,pre: u32) -> u32 {
let clip = rows[layer];
let rec = bake[clip + bake[clip + 1u] + node * 4u + lane];
if (rec == 0u) {
return NONE;
}
let maskStart = rows[layer + 2u];
if ((maskStart != NONE) && ((pre < maskStart) || (pre >= rows[layer + 3u]))) {
return NONE;
}
return clip + rec;
}
fn slotLane(row: u32,evAt: u32,layerCount: u32,node: u32,lane: u32,pre: u32,over: bool,fullPose: bool,crossing: bool,adding: bool,cur: vec4f,target_: u32) -> vec4f {
let releasedRow = (rows[row + 3u] & 64u) != 0u;
var total = 0.0;
var share = 0.0;
var covered = false;
var seen = 0u;
var drawn = 0.0;
var under = 0.0;
var keeper = NONE;
let sumCount = select(layerCount,u32(0),adding);
for (var l = 0u; l < sumCount; l++) {
let layer = row + 51u + l * 19u;
let ev = evAt + l * 6u;
let flags = stateFlags(ev);
let inOver = (flags & 1u) != 0u;
if ((flags & 1024u) != 0u) {
continue;
}
if (!over && inOver) {
if (((flags & 16u) != 0u) && (trackOf(layer,node,lane,pre) != NONE)) {
covered = true;
}
continue;
}
let released = (flags & 32u) != 0u;
let sums = (inOver == over) && ((flags & 8u) != 0u);
let holds = releasedRow && select(((flags & 8u) != 0u),((flags & 4u) != 0u),released);
if (!(sums || holds) || (trackOf(layer,node,lane,pre) == NONE)) {
continue;
}
let weight = scratch[ev + 2u];
let draws = !released && ((flags & 8u) != 0u);
total += select(0.0,weight,sums);
share += select(0.0,scratch[ev + 3u],sums);
seen = seen | select(u32(1),u32(2),released);
let arrival = scratch[ev + 4u];
drawn += select(0.0,arrival,draws);
under += select(0.0,arrival,(draws && (inOver != over)));
keeper = select(keeper,l,(released && (inOver == over)));
}
let kept = seen == u32(2);
var accum = select(1.0 - total,0.0,((total >= 1.0) || fullPose));
let whole = min(share,1.0);
accum = select(accum,1.0 - whole,crossing);
let part = select(1.0,whole / total,(crossing && (total > 0.0)));
let keep = select(0.0,max(0.0,1.0 - drawn),(keeper != NONE));
let keeping = select(NONE,keeper,(keep > 0.0));
accum = select(accum,under + min(accum,max(0.0,drawn - under - total)),(keep > 0.0));
var v = cur;
for (var l = 0u; l < layerCount; l++) {
let layer = row + 51u + l * 19u;
let ev = evAt + l * 6u;
let flags = stateFlags(ev);
let inOver = (flags & 1u) != 0u;
let live = flags & (4u | 1024u);
if (select(((inOver != over) || (live != 4u)),(live != (4u | 1024u)),adding)) {
continue;
}
let rec = trackOf(layer,node,lane,pre);
let keeps = l == keeping;
let floorYields = ((flags & 2u) != 0u) && ((total != 0.0) || ((flags & 32u) != 0u));
if ((rec == NONE) || select((kept || floorYields),false,(keeps || adding))) {
continue;
}
let word = bake[rec + 3u];
let past = (target_ != NONE) && (target_ >= (word >> 4u));
if (adding && (((word & 8u) != 0u) || past)) {
continue;
}
let clip = rows[layer];
let sample = select(trackValue(clip,rec,scratch[ev],scratch[ev + 1u],target_),v,past);
let weight = scratch[ev + 2u];
if (adding) {
v = addInto(v,sample,keyVec(clip + bake[rec + 1u],select(u32(0),u32(1),((word & 3u) == 2u)),(word >> 4u),target_),weight,lane);
continue;
}
let w = select(weight * part,keep,keeps);
let effective = w / (accum + w);
accum += w;
v = blendInto(v,sample,effective,lane);
}
return select(v,cur,covered);
}
fn addInto(v: vec4f,sample: vec4f,first: vec4f,w: f32,lane: u32) -> vec4f {
if (lane == 1u) {
return quatMul(v,slerpFlat(vec4f(0.0,0.0,0.0,1.0),quatMul(vec4f(-first.x,-first.y,-first.z,first.w),sample),w));
}
return v + (sample - first) * w;
}
fn blendInto(v: vec4f,sample: vec4f,effective: f32,lane: u32) -> vec4f {
if (effective >= 1.0) {
return sample;
}
if (lane == 1u) {
return slerpFlat(v,sample,effective);
}
return v + (sample - v) * effective;
}
`,`fn quatMul(a: vec4f,b: vec4f) -> vec4f {
return vec4f(a.x * b.w + a.w * b.x + a.y * b.z - a.z * b.y,a.y * b.w + a.w * b.y + a.z * b.x - a.x * b.z,a.z * b.w + a.w * b.z + a.x * b.y - a.y * b.x,a.w * b.w - a.x * b.x - a.y * b.y - a.z * b.z);
}
`,`fn quatRotate(q: vec4f,v: vec3f) -> vec3f {
let axis = vec3f(q.x,q.y,q.z);
let t = cross(axis,v) * 2.0;
return v + t * q.w + cross(axis,t);
}
`,`fn poseT(p: u32) -> vec3f {
return vec3f(scratch[p],scratch[p + 1u],scratch[p + 2u]);
}
`,`fn poseQ(p: u32) -> vec4f {
return vec4f(scratch[p + 3u],scratch[p + 4u],scratch[p + 5u],scratch[p + 6u]);
}
fn poseS(p: u32) -> vec3f {
return vec3f(scratch[p + 7u],scratch[p + 8u],scratch[p + 9u]);
}
`,`fn putQ(p: u32,q: vec4f) {
scratch[p + 3u] = q.x;
scratch[p + 4u] = q.y;
scratch[p + 5u] = q.z;
scratch[p + 6u] = q.w;
}
`,`fn boneMoveAxisLengths(row: u32,rig: u32,pose: u32,n: u32,node: u32) -> vec3f {
var ax = vec3f(1.0,0.0,0.0);
var ay = vec3f(0.0,1.0,0.0);
var az = vec3f(0.0,0.0,1.0);
let parents = rig + bake[rig + 5u];
var parent = bake[parents + node];
for (var depth = 0u; ((parent != NONE) && (parent < n)) && (depth < n); depth++) {
let pp = pose + parent * 10u;
let q = poseQ(pp);
let s = poseS(pp);
ax = quatRotate(q,ax * s);
ay = quatRotate(q,ay * s);
az = quatRotate(q,az * s);
parent = bake[parents + parent];
}
if (bake[rig + 2u] != 0u) {
let c = rig + 12u;
let correction = mat3x3f(bf(c),bf(c + 1u),bf(c + 2u),bf(c + 4u),bf(c + 5u),bf(c + 6u),bf(c + 8u),bf(c + 9u),bf(c + 10u));
ax = correction * ax;
ay = correction * ay;
az = correction * az;
}
if ((rows[row + 3u] & 4u) != 0u) {
let fr = row + 5u;
let frame = mat3x3f(rf(fr),rf(fr + 1u),rf(fr + 2u),rf(fr + 3u),rf(fr + 4u),rf(fr + 5u),rf(fr + 6u),rf(fr + 7u),rf(fr + 8u));
ax = frame * ax;
ay = frame * ay;
az = frame * az;
}
return vec3f(length(ax),length(ay),length(az));
}
`,`fn axisMove(shift: f32,measured: f32) -> f32 {
if (shift == 0.0) {
return 0.0;
}
return shift / measured;
}
fn axisMeasures(shift: f32,measured: f32) -> bool {
if (shift == 0.0) {
return true;
}
return ((measured > 0.0) && finiteWord(measured)) && finiteWord(shift);
}
fn applyBones(row: u32,rig: u32,pose: u32,n: u32) {
let count = rows[row + 4u];
let base = row + 51u + rows[row + 2u] * 19u;
for (var b = 0u; b < count; b++) {
let r = base + b * 10u;
let node = rows[r];
if (node >= n) {
continue;
}
let flags = rows[r + 1u];
let p = pose + node * 10u;
let turn = vec4f(rf(r + 2u),rf(r + 2u + 1u),rf(r + 2u + 2u),rf(r + 2u + 3u));
if ((flags & 4u) != 0u) {
scratch[p] = rf(r + 6u);
scratch[p + 1u] = rf(r + 6u + 1u);
scratch[p + 2u] = rf(r + 6u + 2u);
putQ(p,turn);
continue;
}
if ((flags & 8u) != 0u) {
putQ(p,turn);
continue;
}
if ((flags & 1u) != 0u) {
putQ(p,quatMul(poseQ(p),turn));
}
if ((flags & 2u) == 0u) {
continue;
}
let shift = vec3f(rf(r + 6u),rf(r + 6u + 1u),rf(r + 6u + 2u));
let axes = boneMoveAxisLengths(row,rig,pose,n,node);
if (!((axisMeasures(shift.x,axes.x) && axisMeasures(shift.y,axes.y)) && axisMeasures(shift.z,axes.z))) {
continue;
}
let t = poseT(p) + vec3f(axisMove(shift.x,axes.x),axisMove(shift.y,axes.y),axisMove(shift.z,axes.z));
scratch[p] = t.x;
scratch[p + 1u] = t.y;
scratch[p + 2u] = t.z;
}
for (var b = 0u; b < count; b++) {
let r = base + b * 10u;
let node = rows[r];
if ((node >= n) || ((rows[r + 1u] & 16u) == 0u)) {
continue;
}
let p = pose + node * 10u;
let k = rf(r + 9u);
scratch[p + 7u] = scratch[p + 7u] * k;
scratch[p + 8u] = scratch[p + 8u] * k;
scratch[p + 9u] = scratch[p + 9u] * k;
}
}
`,`fn compose(p: u32) -> mat4x4f {
return turnScaleAt(poseQ(p),poseS(p),vec4f(scratch[p],scratch[p + 1u],scratch[p + 2u],1.0));
}
`,`fn scratchMat(o: u32) -> mat4x4f {
return mat4x4f(vec4f(scratch[o],scratch[o + 1u],scratch[o + 2u],scratch[o + 3u]),vec4f(scratch[o + 4u],scratch[o + 5u],scratch[o + 6u],scratch[o + 7u]),vec4f(scratch[o + 8u],scratch[o + 9u],scratch[o + 10u],scratch[o + 11u]),vec4f(scratch[o + 12u],scratch[o + 13u],scratch[o + 14u],scratch[o + 15u]));
}
`,`fn bakeMat(o: u32) -> mat4x4f {
return mat4x4f(vec4f(bf(o),bf(o + 1u),bf(o + 2u),bf(o + 3u)),vec4f(bf(o + 4u),bf(o + 5u),bf(o + 6u),bf(o + 7u)),vec4f(bf(o + 8u),bf(o + 9u),bf(o + 10u),bf(o + 11u)),vec4f(bf(o + 12u),bf(o + 13u),bf(o + 14u),bf(o + 15u)));
}
`,`fn putScratchColumn(o: u32,v: vec4f) {
scratch[o] = v.x;
scratch[o + 1u] = v.y;
scratch[o + 2u] = v.z;
scratch[o + 3u] = v.w;
}
fn putScratchMat(o: u32,m: mat4x4f) {
putScratchColumn(o,m[0u]);
putScratchColumn(o + 4u,m[1u]);
putScratchColumn(o + 8u,m[2u]);
putScratchColumn(o + 12u,m[3u]);
}
`,`fn putPageColumn(o: u32,v: vec4f) {
page[o] = v.x;
page[o + 1u] = v.y;
page[o + 2u] = v.z;
page[o + 3u] = v.w;
}
fn putPageMat(o: u32,m: mat4x4f) {
putPageColumn(o,m[0u]);
putPageColumn(o + 4u,m[1u]);
putPageColumn(o + 8u,m[2u]);
putPageColumn(o + 12u,m[3u]);
}
`,`fn zeroColumn(v: vec4f) -> bool {
return (((v.x == 0.0) && (v.y == 0.0)) && (v.z == 0.0)) && (v.w == 0.0);
}
fn collapses(m: mat4x4f) -> bool {
let at = m[3u];
return (((((zeroColumn(m[0u]) && zeroColumn(m[1u])) && zeroColumn(m[2u])) && (at.w == 1.0)) && finiteWord(at.x)) && finiteWord(at.y)) && finiteWord(at.z);
}
`,`fn curveAt(o: u32,t: f32) -> f32 {
if (!(t < rf(o))) {
return 0.0;
}
return rf(o + 1u) + t * (rf(o + 2u) + t * (rf(o + 3u) + t * (rf(o + 4u) + t * (rf(o + 5u) + t * rf(o + 6u)))));
}
fn offsetLane(o: u32,component: u32,t: f32) -> vec4f {
let c = o + component * 7u;
return vec4f(curveAt(c,t),curveAt(c + 7u,t),curveAt(c + 2u * 7u,t),0.0);
}
fn offsetTurn(o: u32,t: f32,q: vec4f) -> vec4f {
let r = offsetLane(o,3u,t);
let angle = sqrt(r.x * r.x + r.y * r.y + r.z * r.z);
if (angle == 0.0) {
return q;
}
let k = sin(angle * 0.5) / angle;
let turned = quatMul(vec4f(r.x * k,r.y * k,r.z * k,cos(angle * 0.5)),q);
let l = length(turned);
if (l > 0.0) {
return turned * (1.0 / l);
}
return q;
}
fn offsetOf(o: u32,lane: u32,t: f32,v: vec4f) -> vec4f {
if (lane == 1u) {
return offsetTurn(o,t,v);
}
return v + offsetLane(o,select(u32(0),u32(6),(lane == 2u)),t);
}
fn blendLane(row: u32,evAt: u32,rig: u32,pose: u32,node: u32,lane: u32,layerCount: u32,flags: u32,offsets: u32,n: u32,target_: u32,item: u32) {
let at = select(select(u32(0),u32(3),(lane == 1u)),u32(7),(lane == 2u));
let r = rig + bake[rig + 8u] + node * 10u + at;
let lanes = rig + bake[rig + 28u];
var w = 0.0;
if (lane == 1u) {
w = bf(r + 3u);
}
let pre = bake[rig + bake[rig + 6u] + node];
var v = vec4f(bf(r),bf(r + 1u),bf(r + 2u),w);
if (lane == 3u) {
v = vec4f(bf(lanes + 2u + bake[lanes] * 2u + item),0.0,0.0,0.0);
}
var driven = false;
var adds = false;
for (var l = 0u; l < layerCount; l++) {
let layer = row + 51u + l * 19u;
if ((rows[layer + 1u] & 1024u) != 0u) {
adds = adds || (trackOf(layer,node,lane,pre) != NONE);
} else {
driven = driven || (trackOf(layer,node,lane,pre) != NONE);
}
}
for (var j = 0u; j < 5u; j++) {
let over = (j == 2u) || (j == 3u);
let adding = j == 4u;
if ((lane == 3u) && (j == 1u)) {
continue;
}
if ((j == 1u) || (j == 3u)) {
let slotWords = n * 63u + select(u32(0),bake[lanes + 1u] * 7u,(rows[row + 50u] != NONE));
for (var s = select(u32(0),u32(1),(over && (lane != 3u))); s < select(u32(1),u32(2),over); s++) {
let swap = row + 32u + s * 3u;
let t = max(since(4u,rf(swap),rf(swap + 1u)),0.0);
let block = offsets + select(u32(0),slotWords,((s == 1u) && ((flags & 16u) != 0u)));
if (((flags & select(u32(16),u32(32),(s == 1u))) == 0u) || !(t < rf(swap + 2u))) {
continue;
}
if (lane == 3u) {
v = v + vec4f(curveAt(block + n * 63u + item * 7u,t),0.0,0.0,0.0);
} else {
v = offsetOf(block + node * 63u,lane,t,v);
}
}
continue;
}
if (select(((over && ((flags & 2u) == 0u)) || !driven),!adds,adding)) {
continue;
}
v = slotLane(row,evAt,layerCount,node,lane,pre,over,(((flags & 1u) != 0u) && !over),(((flags & 8u) != 0u) && over),adding,v,target_);
}
if (lane == 3u) {
let w = rows[row + 50u] + item * 2u;
let verdict = verdictOf(pose);
if ((verdict > 1.5) && (verdict < 2.5)) {
page[w + 1u] = v.x;
} else if (rows[11u] == 0u) {
page[w + 1u] = page[w];
}
page[w] = v.x;
return;
}
let p = pose + node * 10u + at;
scratch[p] = v.x;
scratch[p + 1u] = v.y;
scratch[p + 2u] = v.z;
if (lane == 1u) {
scratch[p + 3u] = v.w;
}
}
fn restNonFinite(rig: u32,pose: u32,node: u32) {
let p = pose + node * 10u;
var ok = true;
for (var k = 0u; k < 10u; k++) {
ok = ok && finiteWord(scratch[p + k]);
}
if (!ok) {
let r = rig + bake[rig + 8u] + node * 10u;
for (var k = 0u; k < 10u; k++) {
scratch[p + k] = bf(r + k);
}
}
}
`,`fn modelOf(rig: u32,pose: u32,model: u32,node: u32) -> mat4x4f {
let parent = bake[rig + bake[rig + 5u] + node];
let local = compose(pose + node * 10u);
if (parent == NONE) {
return local;
}
let pm = scratchMat(model + parent * 16u);
if (collapses(pm)) {
let at = pm[3u];
return mat4x4f(vec4f(0.0,0.0,0.0,0.0),vec4f(0.0,0.0,0.0,0.0),vec4f(0.0,0.0,0.0,0.0),vec4f(at.x,at.y,at.z,1.0));
}
return pm * local;
}
`,`fn composeNode(rig: u32,pose: u32,model: u32,node: u32) {
putScratchMat(model + node * 16u,modelOf(rig,pose,model,node));
}
`,`fn walkLevels(rig: u32,pose: u32,model: u32,levels: u32,tid: u32) {
let levelStart = rig + bake[rig + 3u];
let levelNodes = rig + bake[rig + 4u];
for (var d = 0u; d < levels; d++) {
let last = bake[levelStart + d + 1u];
for (var i = bake[levelStart + d] + tid; i < last; i += WG) {
composeNode(rig,pose,model,bake[levelNodes + i]);
}
storageBarrier();
workgroupBarrier();
}
}
fn childModel(pm: mat4x4f,local: mat4x4f) -> mat4x4f {
var m = pm * local;
if (collapses(pm)) {
let at = pm[3u];
m = mat4x4f(vec4f(0.0,0.0,0.0,0.0),vec4f(0.0,0.0,0.0,0.0),vec4f(0.0,0.0,0.0,0.0),vec4f(at.x,at.y,at.z,1.0));
}
return scratchFloats(m);
}
fn scratchFloats(m: mat4x4f) -> mat4x4f {
return mat4x4f(vec4f(f32(m[0u].x),f32(m[0u].y),f32(m[0u].z),f32(m[0u].w)),vec4f(f32(m[1u].x),f32(m[1u].y),f32(m[1u].z),f32(m[1u].w)),vec4f(f32(m[2u].x),f32(m[2u].y),f32(m[2u].z),f32(m[2u].w)),vec4f(f32(m[3u].x),f32(m[3u].y),f32(m[3u].z),f32(m[3u].w)));
}
fn walkChains(rig: u32,pose: u32,model: u32,levels: u32,tid: u32) {
let levelStart = rig + bake[rig + 3u];
let levelNodes = rig + bake[rig + 4u];
let parents = rig + bake[rig + 5u];
let starts = rig + bake[rig + 10u];
let chain = rig + bake[rig + 11u];
for (var top = 0u; top < levels; top += 16u) {
if (top > 0u) {
storageBarrier();
workgroupBarrier();
}
let last = bake[levelStart + min(top + 16u,levels)];
for (var i = bake[levelStart + top] + tid; i < last; i += WG) {
let node = bake[levelNodes + i];
let first = bake[starts + node];
let head = bake[chain + first];
let above = bake[parents + head];
let local = compose(pose + head * 10u);
var m = scratchFloats(local);
if (above != NONE) {
m = childModel(scratchMat(model + above * 16u),local);
}
for (var k = first + 1u; k < bake[starts + node + 1u]; k++) {
m = childModel(m,compose(pose + bake[chain + k] * 10u));
}
putScratchMat(model + node * 16u,m);
}
}
}
@compute @workgroup_size(WG)
fn seen_main(@builtin(workgroup_id) lume_wid: vec3u,@builtin(num_workgroups) lume_groups: vec3u,@builtin(local_invocation_index) tid: u32) {
let index: u32 = lume_wid.x + lume_wid.y * lume_groups.x;
if ((tid == 0u) && (index < rows[1u])) {
let at = rows[rows[0u] + index];
let top = seenTop(at);
var placed = mat4x4f(vec4f(0.0,0.0,0.0,0.0),vec4f(0.0,0.0,0.0,0.0),vec4f(0.0,0.0,0.0,0.0),vec4f(0.0,0.0,0.0,0.0));
var topPlaced = placed;
let roots = select(u32(1),u32(2),(top != NONE));
for (var k = 0u; k < roots; k++) {
let root = placedRoot(select(at,top,(k == 1u)));
if (k == 0u) {
placed = root;
} else {
topPlaced = root;
}
}
if (judgeSeen(at,placed,topPlaced)) {
putScratchMat(scratchRootOf(at),placed);
}
}
if (tid == 0u) {
wgRow = posingAt(index);
}
let row = workgroupUniformLoad(&wgRow);
if (row == NONE) {
return;
}
let evAt = layerStateAt(rows[row + 1u],bake[rows[row]],0u);
let layerCount = rows[row + 2u];
for (var l = tid; l < layerCount; l += WG) {
layerState(row,row + 51u + l * 19u,evAt + l * 6u);
}
}
fn derivedRowFlags(row: u32,evAt: u32,layerCount: u32) -> u32 {
var over = 0u;
var crosses = 0u;
for (var l = 0u; l < layerCount; l++) {
let ev = evAt + l * 6u;
let sf = stateFlags(ev);
let lf = select(u32(0),sf,((sf & 1u) != 0u));
over = over | (lf & 4u);
crosses = crosses | select(u32(0),8u,(((lf & 8u) != 0u) && (scratch[ev + 3u] != min(scratch[ev + 2u],1.0))));
}
return rows[row + 3u] | select(u32(0),2u | crosses,(over != 0u));
}
fn posingAt(body: u32) -> u32 {
if (body >= rows[1u]) {
return NONE;
}
let row = rows[rows[0u] + body];
return select(NONE,row,rowPoses(row));
}
@compute @workgroup_size(WG)
fn blend_main(@builtin(workgroup_id) lume_wid: vec3u,@builtin(num_workgroups) lume_groups: vec3u,@builtin(local_invocation_index) tid: u32) {
let index: u32 = lume_wid.x + lume_wid.y * lume_groups.x;
if (index >= rows[801u]) {
return;
}
let word = rows[rows[800u] + index];
let shift = rows[799u];
let first = (word & ((u32(1) << shift) - 1u)) * 128u;
let row = posingAt((word >> shift));
if (row == NONE) {
holdWeights((word >> shift),first,tid);
return;
}
let rig = rows[row];
let n = bake[rig];
let blend = rows[row + 49u];
var count = n;
if (blend != NONE) {
count = bake[blend];
}
let lanes = rig + bake[rig + 28u];
let end = min(first + 128u,count * 3u + select(u32(0),bake[lanes + 1u],(rows[row + 50u] != NONE)));
if (first + tid >= end) {
return;
}
let pose = rows[row + 1u];
let evAt = layerStateAt(pose,n,0u);
let layerCount = rows[row + 2u];
let flags = derivedRowFlags(row,evAt,layerCount);
let offsets = row + 51u + layerCount * 19u + rows[row + 4u] * 10u;
for (var item = first + tid; item < end; item += WG) {
var at = item;
var lane = 0u;
if (at >= count) {
at -= count;
lane = 1u;
}
if (at >= count) {
at -= count;
lane = 2u;
}
var node = at;
var target_ = NONE;
if ((at < count) && (blend != NONE)) {
node = bake[blend + 1u + at];
}
if (at >= count) {
at -= count;
lane = 3u;
target_ = at;
var e = 0u;
loop {
if (!(target_ >= bake[lanes + 3u + e * 2u])) { break; }
target_ -= bake[lanes + 3u + e * 2u];
e++;
}
node = bake[lanes + 2u + e * 2u];
}
blendLane(row,evAt,rig,pose,node,lane,layerCount,flags,offsets,n,target_,at);
}
}
fn holdWeights(body: u32,first: u32,tid: u32) {
if ((body >= rows[1u]) || (rows[11u] != 0u)) {
return;
}
let row = rows[rows[0u] + body];
let morph = rows[row + 50u];
if ((morph == NONE) || !poseSeen(rows[row + 1u])) {
return;
}
let rig = rows[row];
let end = min(first + 128u,bake[rig + bake[rig + 28u] + 1u]);
for (var k = first + tid; k < end; k += WG) {
page[morph + k * 2u + 1u] = page[morph + k * 2u];
}
}
@compute @workgroup_size(WG)
fn pose_main(@builtin(workgroup_id) lume_wid: vec3u,@builtin(num_workgroups) lume_groups: vec3u,@builtin(local_invocation_index) tid: u32) {
let index: u32 = lume_wid.x + lume_wid.y * lume_groups.x;
if (tid == 0u) {
wgRow = posingAt(index);
}
let row = workgroupUniformLoad(&wgRow);
if (row == NONE) {
return;
}
let rig = rows[row];
let n = bake[rig];
let pose = rows[row + 1u];
let model = pose + n * 10u;
let blend = rows[row + 49u];
var count = n;
if (blend != NONE) {
count = bake[blend];
}
for (var at = tid; at < count; at += WG) {
var node = at;
if (blend != NONE) {
node = bake[blend + 1u + at];
}
restNonFinite(rig,pose,node);
}
storageBarrier();
workgroupBarrier();
if (tid == 0u) {
applyBones(row,rig,pose,n);
}
storageBarrier();
workgroupBarrier();
if (WG == 1u) {
walkLevels(rig,pose,model,bake[rig + 1u],tid);
} else {
walkChains(rig,pose,model,bake[rig + 1u],tid);
}
}
fn placeNow(p: u32) -> f32 {
let d = rf(21u) - rf(p + 3u);
return d + (rf(22u) - rf(p + 4u));
}
fn placeLocalAnchor(p: u32,axis: u32) -> f32 {
return rf(p + 5u + axis * 2u) + rf(p + 5u + axis * 2u + 1u);
}
fn placeAnchor(p: u32,axis: u32) -> f32 {
let d = rf(p + 5u + axis * 2u) - rf(23u + axis * 2u);
return d + (rf(p + 5u + axis * 2u + 1u) - rf(23u + axis * 2u + 1u));
}
fn placeRow(p: u32,i: u32) -> u32 {
return p + 66u + (rows[p + 39u] + i) % rows[p + 40u] * 11u;
}
fn placeClockAt(p: u32,now: f32) -> f32 {
let flags = rows[p];
let delay = rf(p + 11u);
let target_ = now - delay;
var out = target_;
if ((flags & 1u) != 0u) {
var t = rf(p + 12u);
var d = rf(p + 13u);
if (t > d - delay) {
out = max(t,target_);
if ((flags & 2u) != 0u) {
let stands = (flags & 4u) != 0u;
let newest = rf(placeRow(p,rows[p + 2u] - 1u));
let line = t + max(0.0,now - d) * rf(p + 15u);
if (stands && (t >= newest)) {
out = max(t,target_);
} else if (stands && (line >= newest)) {
out = max(newest,target_);
} else {
out = max(target_,line);
}
}
} else {
let rate = rf(p + 14u);
var runs = 0u;
if ((flags & 8u) != 0u) {
runs = rows[p + 1u];
}
let at = p + 66u + rows[p + 40u] * 11u;
var done = false;
for (var guard = 0u; guard <= runs + 2u; guard++) {
if (!done) {
let reach = d - delay;
if (t >= reach) {
out = max(t,target_);
done = true;
}
var hit = false;
for (var i = 0u; i < runs; i++) {
let start = rf(at + i * 2u);
let end = rf(at + i * 2u + 1u);
if (((!done && !hit) && (start <= t)) && (t < end)) {
hit = true;
if (end >= reach) {
out = max(target_,reach);
done = true;
} else {
t = end;
}
}
}
if (!done) {
var next = 1e+30;
var found = false;
for (var i = 0u; i < runs; i++) {
let start = rf(at + i * 2u);
if (!found && (start > t)) {
next = start;
found = true;
}
}
let meets = d + (reach - t) / (rate - 1.0);
let enters = d + (next - t) / rate;
if ((now < meets) && (now < enters)) {
out = t + max(0.0,now - d) * rate;
done = true;
} else if (meets <= enters) {
out = target_;
done = true;
} else {
t = next;
d = enters;
}
}
}
}
if (!done) {
out = target_;
}
}
}
return out;
}
fn placeBracket(p: u32,tick: f32) -> vec4f {
let n = rows[p + 2u];
let first = rf(placeRow(p,0u));
let last = rf(placeRow(p,n - 1u));
var out = vec4f(0.0,0.0,0.0,0.0);
if ((tick >= last) && (tick > first)) {
out = vec4f(f32(n - 1u),f32(n - 1u),0.0,0.0);
} else if (tick > first) {
var upper = n - 1u;
var found = false;
for (var i = 1u; i < n; i++) {
if (!found && (rf(placeRow(p,i)) >= tick)) {
upper = i;
found = true;
}
}
let upperTick = rf(placeRow(p,upper));
let lowerTick = rf(placeRow(p,upper - 1u));
if (upperTick == tick) {
out = vec4f(f32(upper),f32(upper),0.0,0.0);
} else {
let span = upperTick - lowerTick;
var a = 0.0;
if (span > 0.0) {
a = (tick - lowerTick) / span;
}
var turnA = a;
let turned = rf(p + 16u);
if ((((rows[p] & 64u) != 0u) && (lowerTick < turned)) && (turned <= upperTick)) {
turnA = 0.0;
}
out = vec4f(f32(upper - 1u),f32(upper),a,turnA);
}
}
return out;
}
`,`fn rf3(row: u32) -> vec3f {
return vec3f(rf(row),rf(row + 1u),rf(row + 2u));
}
`,`fn rf4(row: u32) -> vec4f {
return vec4f(rf(row),rf(row + 1u),rf(row + 2u),rf(row + 3u));
}
`,`fn placeNlerp(a: vec4f,bIn: vec4f,t: f32) -> vec4f {
var b = bIn;
if (dot(a,bIn) < 0.0) {
b = -bIn;
}
let q = a + (b - a) * t;
let len = length(q);
var out = vec4f(0.0,0.0,0.0,1.0);
if (len > 0.000001) {
out = q * (1.0 / len);
}
return out;
}
fn placeMatrix(p: u32) -> mat4x4f {
let pose = placePose(p);
let flags = rows[p];
let q = vec4f(pose[1u].x,pose[1u].y,pose[1u].z,pose[1u].w);
let size = vec3f(pose[2u].x,pose[2u].y,pose[2u].z);
var feet = vec3f(pose[0u].x,pose[0u].y,pose[0u].z);
if ((flags & 128u) != 0u) {
let point = rf3(p + 17u);
feet = feet - quatRotate(q,vec3f(point.x * size.x,point.y * size.y,point.z * size.z));
}
if ((flags & 256u) != 0u) {
let lift = rf(p + 20u);
feet = vec3f(feet.x - 2.0 * (q.x * q.y - q.z * q.w) * lift,feet.y + 2.0 * (q.x * q.x + q.z * q.z) * lift,feet.z - 2.0 * (q.y * q.z + q.x * q.w) * lift);
}
return turnScaleAt(q,size,vec4f(feet.x,feet.y,feet.z,1.0));
}
fn overPlace(p: u32) -> u32 {
var out = NONE;
if ((rows[p] & 512u) == 0u) {
let slot = rows[p + 41u];
if (slot != NONE) {
out = rows[slot];
}
}
return out;
}
fn placePose(p0: u32) -> mat4x4f {
var top = p0;
var depth = 0u;
for (var i = 0u; i < 4u; i++) {
let up = overPlace(top);
if (up != NONE) {
top = up;
depth = depth + 1u;
}
}
var pose = mat4x4f(vec4f(0.0,0.0,0.0,0.0),vec4f(0.0,0.0,0.0,1.0),vec4f(1.0,1.0,1.0,0.0),vec4f(0.0,0.0,0.0,0.0));
for (var level = 4u + 1u; level > 0u; level--) {
if (level <= depth + 1u) {
var c = p0;
for (var k = 1u; k < level; k++) {
c = overPlace(c);
}
pose = juiced(c,placeAt(c,pose,(level == depth + 1u)));
}
}
return pose;
}
fn juiced(p: u32,pose: mat4x4f) -> mat4x4f {
var out = pose;
if ((rows[p] & (8192u | 512u)) == 8192u) {
let j = p + 55u;
let age = rf(29u) - rf(j + 9u) + (rf(30u) - rf(j + 9u + 1u));
if (age <= 1.0) {
let off = rf3(j) + rf3(j + 3u) * age;
let s = rf3(j + 6u);
out = mat4x4f(vec4f(pose[0u].x + off.x,pose[0u].y + off.y,pose[0u].z + off.z,0.0),vec4f(pose[1u].x,pose[1u].y,pose[1u].z,pose[1u].w),vec4f(pose[2u].x * s.x,pose[2u].y * s.y,pose[2u].z * s.z,0.0),vec4f(0.0,0.0,0.0,0.0));
}
}
return out;
}
fn placeAt(p: u32,over: mat4x4f,top: bool) -> mat4x4f {
let flags = rows[p];
let composes = !top && ((flags & (2048u | 4096u)) != 0u);
var out = over;
if (top && ((flags & 512u) != 0u)) {
let t = p + 11u;
let s = p + 15u;
out = mat4x4f(vec4f(placeAnchor(p,0u),placeAnchor(p,1u),placeAnchor(p,2u),0.0),vec4f(rf(t),rf(t + 1u),rf(t + 2u),rf(t + 3u)),vec4f(rf(s),rf(s + 1u),rf(s + 2u),0.0),vec4f(0.0,0.0,0.0,0.0));
} else if ((!top && !composes) && ((flags & 1024u) != 0u)) {
let r = p + 42u;
let turn = vec4f(over[1u].x,over[1u].y,over[1u].z,over[1u].w);
let grown = vec3f(rf(r) * (1.0 + (over[2u].x - 1.0) * rf(r + 3u)),rf(r + 1u) * (1.0 + (over[2u].y - 1.0) * rf(r + 3u + 1u)),rf(r + 2u) * (1.0 + (over[2u].z - 1.0) * rf(r + 3u + 2u)));
let feet = vec3f(over[0u].x,over[0u].y,over[0u].z) + quatRotate(turn,grown);
var q = quatMul(turn,vec4f(rf(r + 6u),rf(r + 6u + 1u),rf(r + 6u + 2u),rf(r + 6u + 3u)));
let len = length(q);
if (len > 0.0) {
q = q * (1.0 / len);
}
out = mat4x4f(vec4f(feet.x,feet.y,feet.z,0.0),q,vec4f(rf(r + 10u),rf(r + 10u + 1u),rf(r + 10u + 2u),0.0),vec4f(0.0,0.0,0.0,0.0));
} else {
let tick = timelineTick(p);
let own = timelinePoseAt(p,tick);
out = own;
if (composes && ((flags & 2048u) != 0u)) {
out = childOver(p,over,own);
} else if (composes) {
out = supportOver(p,over,own,tick);
}
}
return out;
}
fn supportOver(p: u32,deck: mat4x4f,own: mat4x4f,tick: f32) -> mat4x4f {
let r = p + 42u;
let count = u32(rf(r));
let at = p + 66u + rows[p + 40u] * 11u + rows[p + 1u] * 2u;
let firstTick = rf(at);
let lastRow = at + (count - 1u) * 4u;
var local = rf3(lastRow + 1u);
if (tick <= firstTick) {
local = rf3(at + 1u);
} else if (tick < rf(lastRow)) {
var upper = count - 1u;
var found = false;
for (var i = 1u; i < count; i++) {
if (!found && (rf(at + i * 4u) >= tick)) {
upper = i;
found = true;
}
}
let hi = at + upper * 4u;
let lo = hi - 4u;
let span = rf(hi) - rf(lo);
var a = 0.0;
if (span > 0.0) {
a = (tick - rf(lo)) / span;
}
let l0 = rf3(lo + 1u);
local = l0 + (rf3(hi + 1u) - l0) * a;
}
var feet = vec3f(own[0u].x,own[0u].y,own[0u].z);
if (!((rf(r + 1u) > 0.5) && (tick < firstTick))) {
feet = vec3f(deck[0u].x,deck[0u].y,deck[0u].z) + quatRotate(vec4f(deck[1u].x,deck[1u].y,deck[1u].z,deck[1u].w),local);
}
return mat4x4f(vec4f(feet.x,feet.y,feet.z,0.0),vec4f(own[1u].x,own[1u].y,own[1u].z,own[1u].w),vec4f(own[2u].x,own[2u].y,own[2u].z,0.0),vec4f(0.0,0.0,0.0,0.0));
}
fn childOver(p: u32,parent: mat4x4f,local: mat4x4f) -> mat4x4f {
let r = p + 42u;
let lq = vec4f(local[1u].x,local[1u].y,local[1u].z,local[1u].w);
let ls = vec3f(local[2u].x,local[2u].y,local[2u].z);
let sp = vec3f(ls.x * rf(r + 3u),ls.y * rf(r + 3u + 1u),ls.z * rf(r + 3u + 2u));
let anchor = vec3f(rf(r),rf(r + 1u),rf(r + 2u));
let stage = vec3f(local[0u].x,local[0u].y,local[0u].z) + (sp - quatRotate(lq,sp)) + anchor;
let pq = vec4f(parent[1u].x,parent[1u].y,parent[1u].z,parent[1u].w);
let ps = vec3f(parent[2u].x,parent[2u].y,parent[2u].z);
let feet = vec3f(parent[0u].x,parent[0u].y,parent[0u].z) + quatRotate(pq,vec3f(stage.x * ps.x,stage.y * ps.y,stage.z * ps.z));
let q = quatMul(pq,lq);
return mat4x4f(vec4f(feet.x,feet.y,feet.z,0.0),q,vec4f(ps.x * ls.x,ps.y * ls.y,ps.z * ls.z,0.0),vec4f(0.0,0.0,0.0,0.0));
}
fn timelineTick(p: u32) -> f32 {
let n = rows[p + 2u];
return min(placeClockAt(p,placeNow(p)),rf(placeRow(p,n - 1u)));
}
fn timelinePoseAt(p: u32,tick: f32) -> mat4x4f {
let now = placeNow(p);
let flags = rows[p];
let b = placeBracket(p,tick);
let lower = placeRow(p,u32(b.x));
let upper = placeRow(p,u32(b.y));
let a = b.z;
let lp = rf3(lower + 1u);
let ls = rf3(lower + 8u);
var pos = lp + (rf3(upper + 1u) - lp) * a;
var size = ls + (rf3(upper + 8u) - ls) * a;
var q = rf4(lower + 4u);
if (b.x != b.y) {
q = placeNlerp(q,rf4(upper + 4u),b.w);
}
if ((flags & 16u) != 0u) {
let f = p + 21u;
var at = tick;
if ((flags & 32u) != 0u) {
at = now;
}
let elapsed = at - rf(f + 16u);
let ticks = rf(f + 17u);
var u = 1.0;
if (ticks > 0.0) {
u = elapsed / ticks;
}
if ((u < 1.0) && (elapsed >= 0.0)) {
let w = u * u * (3.0 - 2.0 * u);
let old = rf3(f) + rf3(f + 3u) * elapsed;
pos = old + (pos - old) * w;
let fromScale = rf3(f + 13u);
size = fromScale + (size - fromScale) * w;
let spin = rf3(f + 10u) * elapsed;
let angle = length(spin);
var from_ = rf4(f + 6u);
if (angle > 1e-12) {
let k = sin(angle / 2.0) / angle;
from_ = quatMul(vec4f(spin.x * k,spin.y * k,spin.z * k,cos(angle / 2.0)),from_);
}
var to = q;
if (dot(from_,q) < 0.0) {
from_ = -from_;
}
to = from_ + (q - from_) * w;
let len = length(to);
if (len > 1e-8) {
q = to * (1.0 / len);
}
}
}
var at = vec3f(placeAnchor(p,0u),placeAnchor(p,1u),placeAnchor(p,2u));
if ((flags & 2048u) != 0u) {
at = vec3f(placeLocalAnchor(p,0u),placeLocalAnchor(p,1u),placeLocalAnchor(p,2u));
}
return mat4x4f(vec4f(at.x + pos.x,at.y + pos.y,at.z + pos.z,0.0),q,vec4f(size.x,size.y,size.z,0.0),vec4f(0.0,0.0,0.0,0.0));
}
fn placedRoot(row: u32) -> mat4x4f {
let o = row + 16u;
let own = mat4x4f(vec4f(rf(o),rf(o + 1u),rf(o + 2u),rf(o + 3u)),vec4f(rf(o + 4u),rf(o + 5u),rf(o + 6u),rf(o + 7u)),vec4f(rf(o + 8u),rf(o + 9u),rf(o + 10u),rf(o + 11u)),vec4f(rf(o + 12u),rf(o + 13u),rf(o + 14u),rf(o + 15u)));
let p = rows[row + 43u];
var out = own;
if (p != NONE) {
out = placeMatrix(p) * own;
}
return out;
}
fn paletteRow(table: u32,model: u32,root: u32,r: u32) -> mat4x4f {
if (r == 0u) {
return scratchMat(root);
}
let j = r - 1u;
let src = bake[table + bake[table + 1u] + j];
var local = bakeMat(table + bake[table + 2u] + j * 16u);
if (src != NONE) {
local = scratchMat(model + src * 16u) * local;
}
return scratchMat(root) * local;
}
`,`fn worldTurn(w: mat4x4f) -> vec4f {
return turnOfColumns(vec3f(w[0u].x,w[0u].y,w[0u].z),vec3f(w[1u].x,w[1u].y,w[1u].z),vec3f(w[2u].x,w[2u].y,w[2u].z));
}
`,`fn turnOfColumns(c0: vec3f,c1: vec3f,c2: vec3f) -> vec4f {
let sy = length(c1);
let sz = length(c2);
let sx = select(length(c0),-length(c0),(dot(c0,cross(c1,c2)) < 0.0));
let r0 = c0 * select(0.0,1.0 / sx,(sx != 0.0));
let r1 = c1 * select(0.0,1.0 / sy,(sy != 0.0));
let r2 = c2 * select(0.0,1.0 / sz,(sz != 0.0));
let q = basisTurn(r0,r1,r2);
if (((sx == 0.0) && (sy == 0.0)) && (sz == 0.0)) {
return vec4f(0.0,0.0,0.0,1.0);
}
if (((sx == 0.0) || (sy == 0.0)) || (sz == 0.0)) {
return unitTurn(q);
}
return q;
}
fn basisTurn(r0: vec3f,r1: vec3f,r2: vec3f) -> vec4f {
let r00 = r0.x;
let r01 = r1.x;
let r02 = r2.x;
let r10 = r0.y;
let r11 = r1.y;
let r12 = r2.y;
let r20 = r0.z;
let r21 = r1.z;
let r22 = r2.z;
let trace = r00 + r11 + r22;
var q = vec4f(0.0,0.0,0.0,1.0);
if (trace > 0.0) {
let s = 0.5 / sqrt(trace + 1.0);
q = vec4f((r21 - r12) * s,(r02 - r20) * s,(r10 - r01) * s,0.25 / s);
} else if ((r00 > r11) && (r00 > r22)) {
let s = 2.0 * sqrt(1.0 + r00 - r11 - r22);
q = vec4f(0.25 * s,(r01 + r10) / s,(r02 + r20) / s,(r21 - r12) / s);
} else if (r11 > r22) {
let s = 2.0 * sqrt(1.0 + r11 - r00 - r22);
q = vec4f((r01 + r10) / s,0.25 * s,(r12 + r21) / s,(r02 - r20) / s);
} else {
let s = 2.0 * sqrt(1.0 + r22 - r00 - r11);
q = vec4f((r02 + r20) / s,(r12 + r21) / s,0.25 * s,(r10 - r01) / s);
}
return q;
}
`,`fn jointSize(rig: u32,pose: u32,node: u32) -> vec3f {
let nodes = bake[rig];
let parents = rig + bake[rig + 5u];
let rest = rig + bake[rig + 8u];
var x = 1.0;
var y = 1.0;
var z = 1.0;
var n = node;
for (var depth = 0u; ((n != NONE) && (n < nodes)) && (depth < nodes); depth++) {
let p = pose + n * 10u;
let r = rest + n * 10u;
let rx = bf(r + 7u);
let ry = bf(r + 8u);
let rz = bf(r + 9u);
if (rx != 0.0) {
x = x * (scratch[p + 7u] / rx);
}
if (ry != 0.0) {
y = y * (scratch[p + 8u] / ry);
}
if (rz != 0.0) {
z = z * (scratch[p + 9u] / rz);
}
n = bake[parents + n];
}
return vec3f(x,y,z);
}
fn jointFrame(w: mat4x4f,node: u32,rig: u32,pose: u32,hold: vec4f) -> mat4x4f {
return turnScaleAt(quatMul(worldTurn(w),hold),jointSize(rig,pose,node),w[3u]);
}
`,`fn turnScaleAt(q: vec4f,s: vec3f,at: vec4f) -> mat4x4f {
let x2 = q.x + q.x;
let y2 = q.y + q.y;
let z2 = q.z + q.z;
let xx = q.x * x2;
let xy = q.x * y2;
let xz = q.x * z2;
let yy = q.y * y2;
let yz = q.y * z2;
let zz = q.z * z2;
let wx = q.w * x2;
let wy = q.w * y2;
let wz = q.w * z2;
return mat4x4f(vec4f((1.0 - (yy + zz)) * s.x,(xy + wz) * s.x,(xz - wy) * s.x,0.0),vec4f((xy - wz) * s.y,(1.0 - (xx + zz)) * s.y,(yz + wx) * s.y,0.0),vec4f((xz + wy) * s.z,(yz - wx) * s.z,(1.0 - (xx + yy)) * s.z,0.0),vec4f(at.x,at.y,at.z,1.0));
}
`,`fn worldScale(w: mat4x4f) -> vec3f {
let c0 = w[0u];
let c1 = w[1u];
let c2 = w[2u];
var sx = sqrt(c0.x * c0.x + c0.y * c0.y + c0.z * c0.z);
let det = c0.x * (c1.y * c2.z - c1.z * c2.y) - c1.x * (c0.y * c2.z - c0.z * c2.y) + c2.x * (c0.y * c1.z - c0.z * c1.y);
if (det < 0.0) {
sx = -sx;
}
return vec3f(sx,sqrt(c1.x * c1.x + c1.y * c1.y + c1.z * c1.z),sqrt(c2.x * c2.x + c2.y * c2.y + c2.z * c2.z));
}
`,`fn unitTurn(q: vec4f) -> vec4f {
let l = length(q);
if (l > 0.0) {
return q * (1.0 / l);
}
return vec4f(0.0,0.0,0.0,1.0);
}
`,`fn readFrameOf(w: mat4x4f,root: mat4x4f,model: u32,rig: u32,pose: u32,node: u32) -> mat4x4f {
if (!collapses(w)) {
return w;
}
let nodes = bake[rig];
let parents = rig + bake[rig + 5u];
var turn = unitTurn(poseQ(pose + node * 10u));
var standing = root;
var n = bake[parents + node];
var found = false;
for (var depth = 0u; ((!found && (n != NONE)) && (n < nodes)) && (depth < nodes); depth++) {
let above = root * scratchMat(model + n * 16u);
if (collapses(above)) {
turn = quatMul(unitTurn(poseQ(pose + n * 10u)),turn);
n = bake[parents + n];
} else {
standing = above;
found = true;
}
}
return turnScaleAt(unitTurn(quatMul(worldTurn(standing),turn)),worldScale(standing),w[3u]);
}
fn jointRead(job: u32,tid: u32,flags: u32) {
if (tid != 0u) {
return;
}
let at = rows[job];
let node = rows[job + 2u];
let rig = rows[job + 6u];
let pose = rows[job + 7u];
let model = rows[job + 3u];
let block = rows[job + 1u];
let root = scratchMat(rows[job + 4u]);
var m = root;
var size = vec3f(1.0,1.0,1.0);
if (node != NONE) {
m = readFrameOf(root * scratchMat(model + node * 16u),root,model,rig,pose,node);
size = jointSize(rig,pose,node);
}
if ((flags & 64u) != 0u) {
m = m * pageMatAt(block + 16u);
}
readPlane[at] = 1.0;
putReadColumn(at + 1u,m[0u]);
putReadColumn(at + 1u + 3u,m[1u]);
putReadColumn(at + 1u + 6u,m[2u]);
putReadColumn(at + 1u + 9u,m[3u]);
let owner = root * pageMatAt(block);
let p = owner[3u];
let q = worldTurn(owner);
let k = worldScale(owner);
let f = at + 13u;
readPlane[f] = p.x;
readPlane[f + 1u] = p.y;
readPlane[f + 2u] = p.z;
readPlane[f + 3u] = q.x;
readPlane[f + 4u] = q.y;
readPlane[f + 5u] = q.z;
readPlane[f + 6u] = q.w;
readPlane[f + 7u] = k.x;
readPlane[f + 8u] = k.y;
readPlane[f + 9u] = k.z;
readPlane[at + 23u] = size.x;
readPlane[at + 23u + 1u] = size.y;
readPlane[at + 23u + 2u] = size.z;
var solve = 0.0;
if ((flags & 32u) != 0u) {
solve = 1.0;
}
readPlane[at + 26u] = solve;
}
fn putReadColumn(o: u32,v: vec4f) {
readPlane[o] = v.x;
readPlane[o + 1u] = v.y;
readPlane[o + 2u] = v.z;
}
fn pageMatAt(o: u32) -> mat4x4f {
return mat4x4f(vec4f(page[o],page[o + 1u],page[o + 2u],page[o + 3u]),vec4f(page[o + 4u],page[o + 5u],page[o + 6u],page[o + 7u]),vec4f(page[o + 8u],page[o + 9u],page[o + 10u],page[o + 11u]),vec4f(page[o + 12u],page[o + 13u],page[o + 14u],page[o + 15u]));
}
fn jointRider(job: u32,tid: u32,slot: u32,previous: u32,block: u32,model: u32,root: u32,writes: bool,fresh: bool,moves: bool) {
let parts = bake[block + 1u];
for (var r = tid; r < parts; r += WG) {
if (moves) {
for (var k = 0u; k < 16u; k++) {
page[previous + r * 16u + k] = page[slot + r * 16u + k];
}
}
}
if (!writes) {
return;
}
let node = bake[block];
let h = block + 4u;
let frame = jointFrame(scratchMat(root) * scratchMat(model + node * 16u),node,rows[job + 6u],rows[job + 7u],vec4f(bf(h),bf(h + 1u),bf(h + 2u),bf(h + 3u)));
for (var r = tid; r < parts; r += WG) {
let m = frame * bakeMat(block + 8u + r * 16u);
putPageMat(slot + r * 16u,m);
if (fresh) {
putPageMat(previous + r * 16u,m);
}
}
}
fn unrideRows(job: u32,tid: u32) {
let slot = rows[job];
for (var r = tid; r < bake[rows[job + 2u] + 1u]; r += WG) {
if (page[slot + r * 16u + 15u] != 0.0) {
for (var k = 0u; k < 16u; k++) {
page[slot + r * 16u + k] = 0.0;
}
}
}
}
@compute @workgroup_size(WG)
fn palette_main(@builtin(workgroup_id) lume_wid: vec3u,@builtin(num_workgroups) lume_groups: vec3u,@builtin(local_invocation_index) tid: u32) {
let index: u32 = lume_wid.x + lume_wid.y * lume_groups.x;
if (index >= rows[3u]) {
return;
}
let job = rows[2u] + index * 8u;
if (!poseSeen(rows[job + 7u])) {
if ((tid == 0u) && ((rows[job + 5u] & 16u) != 0u)) {
readPlane[rows[job]] = 0.0;
}
if ((rows[job + 5u] & 8u) != 0u) {
unrideRows(job,tid);
}
return;
}
let slot = rows[job];
let previous = rows[job + 1u];
let table = rows[job + 2u];
let model = rows[job + 3u];
let root = rows[job + 4u];
let flags = rows[job + 5u];
let writes = (flags & 1u) != 0u;
let verdict = verdictOf(rows[job + 7u]);
let fresh = ((flags & 2u) != 0u) || ((verdict > 1.5) && (verdict < 2.5));
let moves = ((previous != NONE) && !fresh) && (rows[11u] == 0u);
if ((flags & 8u) != 0u) {
jointRider(job,tid,slot,previous,table,model,root,writes,fresh,moves);
return;
}
if ((flags & 16u) != 0u) {
jointRead(job,tid,flags);
return;
}
if ((flags & 4u) != 0u) {
let parts = bake[table];
for (var r = tid; r < parts; r += WG) {
let o = r * 48u;
let node = bake[table + 1u + r];
if (node == NONE) {
continue;
}
if (moves) {
for (var k = 0u; k < 16u; k++) {
page[previous + o + k] = page[slot + o + k];
}
}
if (!writes) {
continue;
}
let sort = page[slot + o + 3u];
putPageMat(slot + o,scratchMat(root) * scratchMat(model + node * 16u));
page[slot + o + 3u] = sort;
if (fresh && (previous != NONE)) {
for (var k = 0u; k < 16u; k++) {
page[previous + o + k] = page[slot + o + k];
}
}
}
return;
}
let joints = bake[table];
for (var r = tid; r < joints + 1u; r += WG) {
let o = r * 16u;
if (moves) {
for (var k = 0u; k < 16u; k++) {
page[previous + o + k] = page[slot + o + k];
}
}
if (!writes) {
continue;
}
let m = paletteRow(table,model,root,r);
putPageMat(slot + o,m);
if (fresh && (previous != NONE)) {
putPageMat(previous + o,m);
}
}
}
`,`fn scratchRootOf(row: u32) -> u32 {
let nodes = bake[rows[row]];
return rows[row + 1u] + nodes * 26u;
}
`,`@compute @workgroup_size(WG)
fn mount_main(@builtin(workgroup_id) lume_wid: vec3u,@builtin(num_workgroups) lume_groups: vec3u,@builtin(local_invocation_index) tid: u32) {
let index: u32 = lume_wid.x + lume_wid.y * lume_groups.x;
if (tid == 0u) {
var seenRow = NONE;
if ((index < rows[10u]) && poseSeen(rows[rows[rows[9u] + index] + 1u])) {
seenRow = rows[rows[9u] + index];
}
wgRow = seenRow;
}
let row = workgroupUniformLoad(&wgRow);
if (row == NONE) {
return;
}
if ((rows[row + 3u] & 128u) != 0u) {
hangRowTogether(row,rows[row + 40u],rows[row + 42u],false,tid);
storageBarrier();
workgroupBarrier();
hangRowTogether(row,rows[row + 40u],rows[row + 42u],true,tid);
return;
}
if (tid == 0u) {
putScratchMat(scratchRootOf(row),mountRootOf(row));
}
}
`,`fn seenWords(pose: u32) -> bool {
return ((rows[31u] != 0u) && (pose >= 3u)) && (pose != NONE);
}
fn verdictOf(pose: u32) -> f32 {
var v = 1.0;
if (seenWords(pose)) {
v = scratch[pose - 1u];
}
return v;
}
`,`fn poseSeen(pose: u32) -> bool {
return verdictOf(pose) > 0.5;
}
`,`fn rowPoses(row: u32) -> bool {
let v = verdictOf(rows[row + 1u]);
return (v > 0.5) && (v <= 2.5);
}
`,`fn sphereMeets(o: u32,c: vec3f,r: f32) -> bool {
for (var p = 0u; p < 6u; p++) {
let q = o + p * 4u;
if (rf(q) * c.x + rf(q + 1u) * c.y + rf(q + 2u) * c.z + rf(q + 3u) < -r) {
return false;
}
}
return true;
}
fn gateHides(c: vec3f,r: f32) -> bool {
let g = 525u;
let near = rf(g);
if (!(near > 0.0)) {
return false;
}
let m = g + 1u;
let wx = rf(m + 3u);
let wy = rf(m + 7u);
let wz = rf(m + 11u);
let w = wx * c.x + wy * c.y + wz * c.z + rf(m + 15u);
let nearest = w - r * sqrt(wx * wx + wy * wy + wz * wz);
let boxNearest = w - r * (abs(wx) + abs(wy) + abs(wz));
if (!(boxNearest > near * 0.5) || !(nearest > near)) {
return false;
}
let half = f32(16) * 0.5;
var loX = 3e+38;
var loY = 3e+38;
var hiX = -3e+38;
var hiY = -3e+38;
for (var k = 0u; k < 8u; k++) {
let px = c.x + select(-r,r,((k & 1u) != 0u));
let py = c.y + select(-r,r,((k & 2u) != 0u));
let pz = c.z + select(-r,r,((k & 4u) != 0u));
let cw = wx * px + wy * py + wz * pz + rf(m + 15u);
let sx = ((rf(m) * px + rf(m + 4u) * py + rf(m + 8u) * pz + rf(m + 12u)) / cw + 1.0) * half;
let sy = (1.0 - (rf(m + 1u) * px + rf(m + 5u) * py + rf(m + 9u) * pz + rf(m + 13u)) / cw) * half;
loX = min(loX,sx);
loY = min(loY,sy);
hiX = max(hiX,sx);
hiY = max(hiY,sy);
}
let side = f32(16);
if ((((hiX < 0.0) || (hiY < 0.0)) || (loX > side)) || (loY > side)) {
return true;
}
let c0 = u32(clamp(floor(loX),0.0,side - 1.0));
let c1 = u32(clamp(floor(hiX),0.0,side - 1.0));
let r0 = u32(clamp(floor(loY),0.0,side - 1.0));
let r1 = u32(clamp(floor(hiY),0.0,side - 1.0));
if ((c1 - c0 + 1u) * (r1 - r0 + 1u) > 64u) {
return false;
}
let limit = nearest - nearest * 0.0002 - 0.004;
for (var row = r0; row <= r1; row++) {
for (var col = c0; col <= c1; col++) {
if (!(rf(m + 16u + row * 16u + col) < limit)) {
return false;
}
}
}
return true;
}
fn hullHolds(v: u32,c: vec3f,r: f32) -> bool {
let count = min(rows[260u + v],8u);
for (var e = 0u; e < count; e++) {
let q = 268u + (v * 8u + e) * 4u;
if (rf(q) * c.x + rf(q + 1u) * c.y + rf(q + 2u) * c.z + rf(q + 3u) < -r) {
return false;
}
}
return true;
}
fn placedBound(row: u32,root: mat4x4f) -> vec4f {
let b = row + 44u;
let r = rf(b + 3u);
var out = vec4f(0.0,0.0,0.0,-1.0);
if ((r >= 0.0) && ((rows[row + 3u] & 2048u) != 0u)) {
out = vec4f(rf(b),rf(b + 1u),rf(b + 2u),r);
} else if (r >= 0.0) {
let c4 = root * vec4f(rf(b),rf(b + 1u),rf(b + 2u),1.0);
let x = vec3f(root[0u].x,root[0u].y,root[0u].z);
let y = vec3f(root[1u].x,root[1u].y,root[1u].z);
let z = vec3f(root[2u].x,root[2u].y,root[2u].z);
out = vec4f(c4.x,c4.y,c4.z,r * sqrt(max(max(dot(x,x),dot(y,y)),dot(z,z))));
}
return out;
}
fn boundViews(row: u32,root: mat4x4f,whole: bool) -> u32 {
let flags = rows[row + 3u];
let eyed = (flags & 512u) == 0u;
let casts = (flags & 1024u) == 0u;
let s = placedBound(row,root);
if (!(s.w >= 0.0)) {
return select(u32(0),65536u,eyed) | select(u32(0),131072u,casts);
}
let c = vec3f(s.x,s.y,s.z);
let radius = s.w;
let views = rows[33u];
let eyes = min(rows[35u],views);
let walled = ((flags & 32768u) != 0u) && (rf(525u) > 0.0);
var first = 0u;
var last = views;
if (!eyed) {
first = eyes;
}
if (!casts) {
last = eyes;
}
var met = 0u;
for (var v = first; v < last; v++) {
if ((sphereMeets(36u + v * 24u,c,radius) && hullHolds(v,c,radius)) && !((walled && (v < eyes)) && gateHides(c,radius))) {
met = met | (u32(1) << v);
}
if ((!whole && (met != 0u)) && (((met & ((u32(1) << eyes) - 1u)) != 0u) || (v + 1u >= eyes))) {
break;
}
}
var lights = 0u;
if (casts && (whole || (met == 0u))) {
lights = rows[34u];
}
for (var l = 0u; l < lights; l++) {
let o = 228u + l * 4u;
let d = c - vec3f(rf(o),rf(o + 1u),rf(o + 2u));
let reach = radius + rf(o + 3u);
if (dot(d,d) <= reach * reach) {
met = met | (u32(1) << (8u + l));
}
}
return met;
}
fn sightOf(met: u32) -> u32 {
let eyes = min(rows[35u],rows[33u]);
var sight = 0u;
if (met != 0u) {
sight = 1u;
}
if ((met & (((u32(1) << eyes) - 1u) | 65536u)) != 0u) {
sight = 2u;
}
return sight;
}
fn aboveOf(row: u32) -> u32 {
let wearer = rows[row + 40u];
return select(rows[row + 48u],wearer,(wearer != NONE));
}
fn sightOfRow(row: u32,own: bool,root: mat4x4f) -> u32 {
var sight = 0u;
if ((rows[31u] == 1u) || ((rows[row + 3u] & 256u) != 0u)) {
sight = 2u;
} else if (own) {
sight = sightOf(boundViews(row,root,false));
}
return sight;
}
fn judgeSeen(row: u32,root: mat4x4f,topRoot: mat4x4f) -> bool {
let pose = rows[row + 1u];
var seen = true;
if (seenWords(pose)) {
let top = topOf(row);
let bits = chainSeen(row,root,top,topRoot);
seen = (bits & 5u) != 0u;
var eye = 0.0;
if ((bits & 10u) != 0u) {
eye = 1.0;
}
scratch[pose - 2u] = eye;
stampSeen(pose,seen,cadenceHolds(row,top));
}
return seen;
}
fn cadenceHolds(row: u32,top: u32) -> bool {
let k = ((rows[row + 3u] & 24576u) >> 13u) + 1u;
var holds = false;
if ((k > 1u) && (rows[31u] == 2u)) {
holds = (u32(rf(32u)) + (top >> 2u) + (top >> 6u)) % k != 0u;
}
return holds;
}
fn topOf(row: u32) -> u32 {
var top = row;
for (var depth = 0u; depth < 8u; depth++) {
let wearer = aboveOf(top);
if (wearer != NONE) {
top = wearer;
}
}
return top;
}
fn seenOf(row: u32,own: bool,root: mat4x4f) -> u32 {
let sight = sightOfRow(row,own,root);
let flags = rows[row + 3u];
return select(sight,u32(3),((sight > 1u) || ((sight > 0u) && ((flags & 65536u) != 0u)))) | min(flags & 4096u,1u);
}
fn chainSeen(row: u32,root: mat4x4f,top: u32,topRoot: mat4x4f) -> u32 {
var bits = seenOf(row,(top == row),root);
if ((top != row) && (rows[top + 1u] >= 3u)) {
bits = bits | (seenOf(top,(aboveOf(top) == NONE),topRoot) << 2u);
}
return bits;
}
fn seenTop(row: u32) -> u32 {
let pose = rows[row + 1u];
var out = NONE;
if (seenWords(pose)) {
let top = topOf(row);
if ((top != row) && (rows[top + 1u] >= 3u)) {
out = top;
}
}
return out;
}
fn stampSeen(pose: u32,seen: bool,holds: bool) {
var v = 0.0;
if (seen) {
let frame = rf(32u);
let stamp = scratch[pose - 3u];
v = 2.0;
if ((stamp == frame) || (stamp + 1.0 == frame)) {
v = 1.0;
if (holds) {
v = 3.0;
}
}
scratch[pose - 3u] = frame;
}
scratch[pose - 1u] = v;
}
`,`fn invertAffine(m: mat4x4f) -> mat4x4f {
let a = vec3f(m[0u].x,m[0u].y,m[0u].z);
let b = vec3f(m[1u].x,m[1u].y,m[1u].z);
let c = vec3f(m[2u].x,m[2u].y,m[2u].z);
let r0 = cross(b,c);
let r1 = cross(c,a);
let r2 = cross(a,b);
let det = dot(a,r0);
if ((det == 0.0) || !finiteWord(det)) {
return mat4x4f(vec4f(1.0,0.0,0.0,0.0),vec4f(0.0,1.0,0.0,0.0),vec4f(0.0,0.0,1.0,0.0),vec4f(0.0,0.0,0.0,1.0));
}
let k = 1.0 / det;
let t = vec3f(m[3u].x,m[3u].y,m[3u].z);
let tx = -dot(r0,t) * k;
let ty = -dot(r1,t) * k;
let tz = -dot(r2,t) * k;
return mat4x4f(vec4f(r0.x * k,r1.x * k,r2.x * k,0.0),vec4f(r0.y * k,r1.y * k,r2.y * k,0.0),vec4f(r0.z * k,r1.z * k,r2.z * k,0.0),vec4f(tx,ty,tz,1.0));
}
`,`fn hangRowTogether(row: u32,worn: u32,hang: u32,after: bool,tid: u32) {
let rig = rows[row];
let n = bake[rig];
let pose = rows[row + 1u];
let model = pose + n * 10u;
let wornRig = rows[worn];
let wornModel = rows[worn + 1u] + bake[wornRig] * 10u;
let lift = invertAffine(scratchMat(model + n * 16u)) * scratchMat(wornModel + bake[wornRig] * 16u);
let count = bake[hang];
let kinds = hang + bake[hang + 1u];
let mats = hang + bake[hang + 2u];
let order = rig + bake[rig + 9u];
for (var i = tid; i < count; i += WG) {
let node = bake[order + i];
let kind = bake[kinds + node];
if (!after) {
if (kind < 4294967292u) {
putScratchMat(model + node * 16u,lift * scratchMat(wornModel + kind * 16u));
}
} else if (kind == 4294967293u) {
putScratchMat(model + node * 16u,lift * bakeMat(mats + node * 16u) * scratchMat(model + node * 16u));
} else if (kind == 4294967292u) {
putScratchMat(model + node * 16u,lift * bakeMat(mats + node * 16u));
}
}
if (!after) {
storageBarrier();
workgroupBarrier();
let levelStart = rig + bake[rig + 3u];
let levelNodes = rig + bake[rig + 4u];
let preorder = rig + bake[rig + 6u];
let levels = bake[rig + 1u];
for (var d = 0u; d < levels; d++) {
let last = bake[levelStart + d + 1u];
for (var i = bake[levelStart + d] + tid; i < last; i += WG) {
let node = bake[levelNodes + i];
if ((bake[preorder + node] < count) && (bake[kinds + node] == 4294967294u)) {
composeNode(rig,pose,model,node);
}
}
storageBarrier();
workgroupBarrier();
}
}
}
`,`fn mountRootOf(row: u32) -> mat4x4f {
var hops = 0u;
var top = row;
for (var depth = 0u; depth < 8u; depth++) {
let wearer = rows[top + 40u];
if (wearer == NONE) {
break;
}
hops = hops + 1u;
top = wearer;
}
var m = scratchMat(scratchRootOf(top));
for (var k = 0u; k < hops; k++) {
var hop = row;
for (var s = k + 1u; s < hops; s++) {
hop = rows[hop + 40u];
}
let wearer = rows[hop + 40u];
let rig = rows[wearer];
let pose = rows[wearer + 1u];
let model = pose + bake[rig] * 10u;
let joint = rows[hop + 41u];
let local = rows[hop + 42u];
let h = local + 16u;
m = jointFrame(m * scratchMat(model + joint * 16u),joint,rig,pose,vec4f(bf(h),bf(h + 1u),bf(h + 2u),bf(h + 3u))) * bakeMat(local);
}
return m;
}
`,`fn restStep() -> bool {
return rows[20u] != 0u;
}
`,`const WG: u32 = 32u;
`,`fn rowLayerCount(row: u32) -> u32 {
return rows[row + 2u];
}
fn rowLayerClip(row: u32,l: u32) -> u32 {
return rows[row + 51u + l * 19u];
}
fn rowLayerWeight(row: u32,l: u32) -> f32 {
let pose = rows[row + 1u];
let n = bake[rows[row]];
return scratch[layerStateAt(pose,n,l) + 2u];
}
`,`fn frameSeconds() -> f32 {
return rf(8u);
}
`,`fn worldAt(model: u32,n: u32,node: u32) -> u32 {
return model - n * 10u + min(node,n) * 16u;
}
`,`fn worldMat(o: u32) -> mat4x4f {
return mat4x4f(vec4f(worldBlock[o],worldBlock[o + 1u],worldBlock[o + 2u],worldBlock[o + 3u]),vec4f(worldBlock[o + 4u],worldBlock[o + 5u],worldBlock[o + 6u],worldBlock[o + 7u]),vec4f(worldBlock[o + 8u],worldBlock[o + 9u],worldBlock[o + 10u],worldBlock[o + 11u]),vec4f(worldBlock[o + 12u],worldBlock[o + 13u],worldBlock[o + 14u],worldBlock[o + 15u]));
}
`,`fn putWorldMat(o: u32,m: mat4x4f) {
worldBlock[o] = m[0u].x;
worldBlock[o + 1u] = m[0u].y;
worldBlock[o + 2u] = m[0u].z;
worldBlock[o + 3u] = m[0u].w;
worldBlock[o + 4u] = m[1u].x;
worldBlock[o + 5u] = m[1u].y;
worldBlock[o + 6u] = m[1u].z;
worldBlock[o + 7u] = m[1u].w;
worldBlock[o + 8u] = m[2u].x;
worldBlock[o + 9u] = m[2u].y;
worldBlock[o + 10u] = m[2u].z;
worldBlock[o + 11u] = m[2u].w;
worldBlock[o + 12u] = m[3u].x;
worldBlock[o + 13u] = m[3u].y;
worldBlock[o + 14u] = m[3u].z;
worldBlock[o + 15u] = m[3u].w;
}
`,`fn standWorld(rig: u32,model: u32,tid: u32) {
let n = bake[rig];
let root = scratchMat(model + n * 16u);
for (var node = tid; node < n; node += WG) {
putWorldMat(worldAt(model,n,node),root * scratchMat(model + node * 16u));
}
if (tid == 0u) {
putWorldMat(worldAt(model,n,NONE),root);
}
}
`,`fn passWord(row: u32,kind: u32,w: u32) -> u32 {
let table = rows[row + 38u];
var at = NONE;
if (table != NONE) {
at = rows[table + kind * 3u + w];
}
return at;
}
`,`fn xyzOf(v: vec4f) -> vec3f {
return vec3f(v.x,v.y,v.z);
}
`,`fn poseEyeSees(pose: u32) -> bool {
return !seenWords(pose) || (scratch[pose - 2u] > 0.5);
}
`,`const LIMB_DEGENERATE: f32 = 1e-12;
const LIMB_PI: f32 = 3.1415927;
const REACH_MAX_SCALE: f32 = 0.999;
const REACH_SOFT_START_SCALE: f32 = 0.98;
const REACH_MIN_PAD: f32 = 0.001;
const POLE_TRUST_MIN_SIN: f32 = 0.04;
const POLE_TRUST_MAX_SIN: f32 = 0.2;
const POLE_MAX_TURN_PER_SECOND: f32 = 6.2831853;
const WRIST_FLEXION: f32 = 1.3962634;
const WRIST_EXTENSION: f32 = 1.2217305;
const WRIST_RADIAL: f32 = 0.34906585;
const WRIST_ULNAR: f32 = 0.5235988;
const WRIST_EDGE_STEPS: u32 = 6u;
const FOREARM_TURN: f32 = 1.3962634;
const TWIST_NAMED_COS: f32 = 0.25881905;
const SHOULDER_EXTENSION_SIN: f32 = 0.8660254;
const SHOULDER_INTERNAL: f32 = 1.2217305;
const SHOULDER_EXTERNAL: f32 = 1.57079633;
const COS_ELBOW_FOLD: f32 = 0.8660254;
const HUMERUS_FADE_COS: f32 = -0.7;
const LOOK_NECK_SHARE: f32 = 0.3;
const LOOK_LEVEL_EPSILON: f32 = 0.000001;
const SWIVEL_STEPS: f32 = 36.0;
const SWIVEL_EDGE_STEPS: u32 = 10u;
`,`fn parentNode(rig: u32,node: u32) -> u32 {
return bake[rig + bake[rig + 5u] + node];
}
`,`fn nodeWorld(model: u32,n: u32,node: u32) -> mat4x4f {
return worldMat(worldAt(model,n,node));
}
`,`fn matPos(m: mat4x4f) -> vec3f {
return xyzOf(m[3u]);
}
`,`fn matTurn(o: u32) -> vec4f {
return turnOfColumns(vec3f(worldBlock[o],worldBlock[o + 1u],worldBlock[o + 2u]),vec3f(worldBlock[o + 4u],worldBlock[o + 5u],worldBlock[o + 6u]),vec3f(worldBlock[o + 8u],worldBlock[o + 9u],worldBlock[o + 10u]));
}
`,`fn nodePos(model: u32,n: u32,node: u32) -> vec3f {
let o = worldAt(model,n,node);
return vec3f(worldBlock[o + 12u],worldBlock[o + 13u],worldBlock[o + 14u]);
}
`,`fn limbMap(model: u32,n: u32) -> mat4x4f {
let root = worldMat(worldAt(model,n,4294967295u));
let size = length(root[1u]);
let sx = length(root[0u]);
let sz = length(root[2u]);
if (sx * size * sz == 0.0) {
return root;
}
return mat4x4f(root[0u] * (size / sx),root[1u],root[2u] * (size / sz),root[3u]) * invertAffine(root);
}
`,`fn limbPoint(m: mat4x4f,p: vec3f,w: f32) -> vec3f {
return xyzOf(m * vec4f(p.x,p.y,p.z,w));
}
`,`fn qConj(q: vec4f) -> vec4f {
return vec4f(-q.x,-q.y,-q.z,q.w);
}
`,`fn state3(o: u32) -> vec3f {
return vec3f(state[o],state[o + 1u],state[o + 2u]);
}
`,`fn state4(o: u32) -> vec4f {
return vec4f(state[o],state[o + 1u],state[o + 2u],state[o + 3u]);
}
`,`fn putState3(o: u32,v: vec3f) {
state[o] = v.x;
state[o + 1u] = v.y;
state[o + 2u] = v.z;
}
`,`fn putState4(o: u32,v: vec4f) {
state[o] = v.x;
state[o + 1u] = v.y;
state[o + 2u] = v.z;
state[o + 3u] = v.w;
}
`,`fn softReach(dist: f32,upperLen: f32,lowerLen: f32,fold: f32) -> f32 {
let full = upperLen + lowerLen;
let maxReach = full * REACH_MAX_SCALE;
let softStart = full * REACH_SOFT_START_SCALE;
var out = dist;
if (out > softStart) {
let span = maxReach - softStart;
out = maxReach - span * exp((softStart - dist) / span);
}
var minReach = sqrt(upperLen * upperLen + lowerLen * lowerLen - 2.0 * upperLen * lowerLen * fold) + REACH_MIN_PAD;
if (fold >= 1.0) {
minReach = abs(upperLen - lowerLen) + REACH_MIN_PAD;
}
if (out < minReach) {
out = minReach;
}
return out;
}
`,`fn limbReach(model: u32,n: u32,root: u32,mid: u32,end: u32,arm: u32,target_: vec3f) -> vec3f {
let m = limbMap(model,n);
let worldRoot = nodePos(model,n,root);
let rootPos = limbPoint(m,worldRoot,1.0);
let midPos = limbPoint(m,nodePos(model,n,mid),1.0);
let upperLen = length(midPos - rootPos);
let lowerLen = length(limbPoint(m,nodePos(model,n,end),1.0) - midPos);
let targetDist = length(limbPoint(m,target_,1.0) - rootPos);
if (((targetDist * targetDist < LIMB_DEGENERATE) || (upperLen * upperLen < LIMB_DEGENERATE)) || (lowerLen * lowerLen < LIMB_DEGENERATE)) {
return target_;
}
let reach = softReach(targetDist,upperLen,lowerLen,select(1.0,COS_ELBOW_FOLD,(arm != 4294967295u)));
return (target_ - worldRoot) * (reach / targetDist) + worldRoot;
}
`,`fn select01(b: bool) -> f32 {
if (b) {
return 1.0;
}
return 0.0;
}
`,`const SWIVEL_FIRST: f32 = 0.0;
const SWIVEL_STEPPING: f32 = 1.0;
const SWIVEL_EDGE: f32 = 2.0;
const SWIVEL_REFINE: f32 = 3.0;
const SWIVEL_DONE: f32 = 4.0;
const SWIVEL_EVALUATIONS: u32 = 1024u;
`,`const REACH_INF: f32 = 3e+38;
const REACH_EPSILON: f32 = 0.001;
const REACH_MAX_DT: f32 = 0.1;
const REACH_FOOT_MAX_TILT: f32 = 0.55850536;
const REACH_PELVIS_EPSILON: f32 = 0.0001;
const REACH_REFERENCE_LEG: f32 = 0.663;
const FOOT_TELEPORT_DISTANCE_SQ: f32 = 2.25;
const FOOT_WEIGHT_RAMP: f32 = 8.0;
const REST_RAMP: f32 = 2.0;
const FOOT_REFERENCE_SMOOTH: f32 = 15.0;
const FOOT_ANCHOR_TRACK_SPEED: f32 = 1.5;
const FOOT_CONFORM_LIFT_MAX: f32 = 0.08;
const FOOT_PELVIS_DROP_MAX: f32 = 0.35;
const FOOT_PELVIS_SMOOTH: f32 = 10.0;
const FOOT_NORMAL_MIN_COS: f32 = 0.85;
const FOOT_PLANT_WEIGHT: f32 = 0.5;
const FOOT_STRETCH_RELEASE: f32 = 0.97;
const FOOT_TWIST_RELEASE: f32 = 0.5235988;
const FOOT_CONFORM_LIFT_FLOOR: f32 = 0.03;
const FOOT_CARRIED_STEP_TRAIL: f32 = 0.15;
const FOOT_CARRIED_STEP_LEAD: f32 = 0.9;
const FOOT_CARRIED_STEP_LIFT: f32 = 0.12;
const FOOT_CARRIED_SETTLE: f32 = 0.5;
const FOOT_CARRIED_STEP_SECONDS: f32 = 0.32;
const FOOT_CARRIED_PLANT_STILL: f32 = 0.1;
const FOOT_BODY_VELOCITY_SMOOTH: f32 = 15.0;
const FOOT_SUPPORT_SMOOTH: f32 = 10.0;
const FOOT_SUPPORT_SLOPE_MAX: f32 = 1.0;
const SUPPORT_SCATTER_MIN: f32 = 0.001;
const SUPPORT_SLOPE_EPSILON: f32 = 0.000001;
const SUPPORT_GROUND_REACH_MIN: f32 = 0.2;
const HIP_HEIGHT_FRACTION: f32 = 0.92;
const RELEASE_DONE_WEIGHT: f32 = 0.01;
const FRAME_GROUND_MIN_UP: f32 = 0.1;
const REACH_TWO_PI: f32 = 6.2831853;
const REACH_PI: f32 = 3.1415927;
const GATE_SWING_RELEASE_SPEED: u32 = 0u;
const GATE_PLANT_SPEED: u32 = 1u;
const GATE_CONFORM_LIFT: u32 = 2u;
const GATE_SWING_RELEASE_LIFT: u32 = 3u;
const GATE_STEP_FADE_START: u32 = 4u;
const GATE_STEP_MAX: u32 = 5u;
const GATE_REFERENCE_MAX_LAG: u32 = 6u;
const GATE_STRETCH_MARGIN: u32 = 7u;
const GATE_STEP_RISE_MAX: u32 = 8u;
const PLANE_NONE: f32 = 0.0;
const PLANE_WRAPPER: f32 = 1.0;
const PLANE_FEET: f32 = 2.0;
var<workgroup> fw: array<f32,1876>;
`,`fn loadFrame(from_: u32,to: u32,words: u32,tid: u32,invocations: u32) {
for (var k = tid; k < words; k += invocations) {
fw[to + k] = state[from_ + k];
}
}
`,`fn storeFrame(from_: u32,to: u32,words: u32,tid: u32,invocations: u32) {
for (var k = tid; k < words; k += invocations) {
state[to + k] = fw[from_ + k];
}
}
`,`fn frame3(o: u32) -> vec3f {
return vec3f(fw[o],fw[o + 1u],fw[o + 2u]);
}
`,`fn frame4(o: u32) -> vec4f {
return vec4f(fw[o],fw[o + 1u],fw[o + 2u],fw[o + 3u]);
}
`,`fn putFrame3(o: u32,v: vec3f) {
fw[o] = v.x;
fw[o + 1u] = v.y;
fw[o + 2u] = v.z;
}
`,`fn putFrame4(o: u32,v: vec4f) {
fw[o] = v.x;
fw[o + 1u] = v.y;
fw[o + 2u] = v.z;
fw[o + 3u] = v.w;
}
`,`fn on(x: f32) -> bool {
return x > 0.5;
}
`,`fn gate(fr: u32,g: u32) -> f32 {
return fw[fr + 30u + g];
}
`,`fn writeGate(fr: u32,g: u32,value: f32,floorValue: f32) {
let gated = value * fw[fr + 57u];
var v = floorValue;
if (gated > floorValue) {
v = gated;
}
fw[fr + 30u + g] = v;
}
`,`fn footSlotAt(st: u32,inputs: u32,slot: u32) -> u32 {
return st + 241u + rows[inputs + 17u] * 12u + slot * 231u;
}
`,`fn footSlot(st: u32,inputs: u32,i: u32) -> u32 {
return footSlotAt(st,inputs,rows[footEntry(inputs,i) + 15u]);
}
`,`fn effectorSlotAt(st: u32,inputs: u32,slot: u32) -> u32 {
return st + 241u + rows[inputs + 17u] * 12u + rows[inputs + 18u] * 231u + slot * 12u;
}
`,`fn footEntry(inputs: u32,i: u32) -> u32 {
return inputs + rows[inputs + 3u] + i * 22u;
}
`,`fn effectorEntry(inputs: u32,e: u32) -> u32 {
return inputs + rows[inputs + 1u] + e * 43u;
}
`,`fn freshFoot(fs: u32,serial: u32) {
for (var k = 0u; k < 231u; k++) {
state[fs + k] = 0.0;
}
state[fs] = f32(serial);
state[fs + 25u] = REACH_INF;
state[fs + 26u] = REACH_INF;
state[fs + 31u] = -1.0;
state[fs + 32u] = REACH_INF;
state[fs + 53u] = -REACH_INF;
}
fn stopBody(st: u32) {
state[st + 20u] = 0.0;
state[st + 21u] = 0.0;
state[st + 22u] = 0.0;
}
`,`fn letGo(fs: u32) {
state[fs + 12u] = 0.0;
state[fs + 13u] = 0.0;
state[fs + 14u] = 0.0;
}
`,`fn resetFootOnTeleport(fs: u32) {
letGo(fs);
state[fs + 18u] = 0.0;
for (var k = 0u; k < 3u; k++) {
state[fs + 2u + k] = 0.0;
}
state[fs + 5u] = 0.0;
state[fs + 6u] = 0.0;
state[fs + 7u] = 0.0;
state[fs + 8u] = 0.0;
state[fs + 9u] = 0.0;
state[fs + 10u] = 0.0;
state[fs + 11u] = 0.0;
state[fs + 24u] = 0.0;
state[fs + 35u] = 0.0;
state[fs + 37u] = 0.0;
state[fs + 38u] = 0.0;
state[fs + 36u] = 0.0;
state[fs + 27u] = 0.0;
state[fs + 28u] = 0.0;
state[fs + 29u] = 0.0;
state[fs + 31u] = -1.0;
state[fs + 33u] = 0.0;
state[fs + 34u] = 0.0;
state[fs + 43u] = 0.0;
state[fs + 47u] = 0.0;
}
fn placeGrounding(st: u32,inputs: u32) {
let feet = rows[inputs + 18u];
for (var s = 0u; s < feet; s++) {
resetFootOnTeleport(footSlotAt(st,inputs,s));
}
state[st + 7u] = 0.0;
state[st + 19u] = PLANE_NONE;
state[st + 13u] = 0.0;
stopBody(st);
}
fn standTurnedSpace(st: u32,fr: u32,inputs: u32) {
let gnd = groundOf(inputs);
var kind = 0u;
if (gnd != 4294967295u) {
kind = rows[gnd + 13u];
}
fw[fr + 104u] = select01((kind != 0u));
var regrounds = false;
if (kind == 0u) {
regrounds = state[st + 23u] != 0.0;
state[st + 23u] = 0.0;
} else {
let raw = rf4(gnd + 14u);
let a = raw * (1.0 / sqrt(raw.x * raw.x + raw.y * raw.y + raw.z * raw.z + raw.w * raw.w));
var q = a;
var p = vec3f(0.0,0.0,0.0);
if (kind == 2u) {
q = quatMul(rf4(gnd + 6u + 3u),a);
p = rf3(gnd + 6u);
}
putFrame4(fr + 105u,q);
putFrame3(fr + 109u,p);
let held = state4(st + 24u);
let support = f32(rows[gnd + 18u]);
regrounds = !((((((state[st + 23u] == f32(kind)) && (state[st + 29u] == support)) && (held.x == raw.x)) && (held.y == raw.y)) && (held.z == raw.z)) && (held.w == raw.w));
state[st + 23u] = f32(kind);
state[st + 29u] = support;
putState4(st + 24u,raw);
}
if (regrounds) {
placeGrounding(st,inputs);
}
}
fn dirIn(fr: u32,v: vec3f) -> vec3f {
var out = v;
if (on(fw[fr + 104u])) {
out = quatRotate(qConj(frame4(fr + 105u)),v);
}
return out;
}
fn pointIn(fr: u32,x: vec3f) -> vec3f {
var out = x;
if (on(fw[fr + 104u])) {
out = quatRotate(qConj(frame4(fr + 105u)),x - frame3(fr + 109u));
}
return out;
}
fn shiftOrigin(st: u32,inputs: u32,moved: vec3f) {
var d = moved;
if (state[st + 23u] == f32(1)) {
let raw = state4(st + 24u);
d = quatRotate(qConj(raw * (1.0 / sqrt(raw.x * raw.x + raw.y * raw.y + raw.z * raw.z + raw.w * raw.w))),moved);
} else if (state[st + 23u] == f32(2)) {
d = vec3f(0.0,0.0,0.0);
}
if (on(state[st + 13u])) {
state[st + 10u] -= d.x;
state[st + 11u] -= d.y;
state[st + 12u] -= d.z;
state[st + 14u] -= d.y;
}
let feet = rows[inputs + 18u];
for (var s = 0u; s < feet; s++) {
let fs = footSlotAt(st,inputs,s);
if ((on(state[fs + 12u]) || on(state[fs + 13u])) || on(state[fs + 37u])) {
state[fs + 2u] -= d.x;
state[fs + 3u] -= d.y;
state[fs + 4u] -= d.z;
state[fs + 6u] -= d.x;
state[fs + 7u] -= d.z;
}
if (on(state[fs + 37u])) {
state[fs + 40u] -= d.x;
state[fs + 41u] -= d.y;
state[fs + 42u] -= d.z;
}
if (on(state[fs + 43u])) {
state[fs + 44u] -= d.x;
state[fs + 45u] -= d.y;
state[fs + 46u] -= d.z;
}
if (on(state[fs + 24u])) {
state[fs + 19u] -= d.x;
state[fs + 21u] -= d.z;
}
}
let effectors = rows[inputs + 19u];
for (var s = 0u; s < effectors; s++) {
let es = effectorSlotAt(st,inputs,s);
for (var k = 0u; k < 3u; k++) {
state[es + 2u + k] -= moved[k];
state[es + 6u + k] -= moved[k];
}
}
}
`,`fn probe(gnd: u32,at: u32) -> f32 {
return rf(gnd + 19u + at);
}
fn sampleGridAt(gnd: u32,fr: u32,x: f32,z: f32) -> bool {
let d = rf(gnd);
let n = rows[gnd + 1u];
let nf = f32(n);
let side = 2u * n + 1u;
let gx = max(0.0,min(2.0 * nf,(x - rf(gnd + 2u)) / d + nf));
let gz = max(0.0,min(2.0 * nf,(z - rf(gnd + 4u)) / d + nf));
let ix = min(2u * n - 1u,u32(floor(gx)));
let iz = min(2u * n - 1u,u32(floor(gz)));
let tx = gx - f32(ix);
let tz = gz - f32(iz);
let at = iz * side + ix;
var h00 = probe(gnd,at);
var h10 = probe(gnd,at + 1u);
var h01 = probe(gnd,at + side);
var h11 = probe(gnd,at + side + 1u);
let m00 = finiteWord(h00);
let m10 = finiteWord(h10);
let m01 = finiteWord(h01);
let m11 = finiteWord(h11);
let met = select01(m00) + select01(m10) + select01(m01) + select01(m11);
if (met == 0.0) {
return false;
}
let mean = (select0(h00,m00) + select0(h10,m10) + select0(h01,m01) + select0(h11,m11)) / met;
if (!m00) {
h00 = mean;
}
if (!m10) {
h10 = mean;
}
if (!m01) {
h01 = mean;
}
if (!m11) {
h11 = mean;
}
fw[fr + 20u] = ((h10 - h00) * (1.0 - tz) + (h11 - h01) * tz) / d;
fw[fr + 21u] = ((h01 - h00) * (1.0 - tx) + (h11 - h10) * tx) / d;
fw[fr + 19u] = rf(gnd + 3u) + h00 * (1.0 - tx) * (1.0 - tz) + h10 * tx * (1.0 - tz) + h01 * (1.0 - tx) * tz + h11 * tx * tz;
return true;
}
fn select0(v: f32,met: bool) -> f32 {
if (met) {
return v;
}
return 0.0;
}
fn sampleGround(gnd: u32,fr: u32) -> bool {
if (gnd == 4294967295u) {
return false;
}
let x = fw[fr + 15u];
let z = fw[fr + 16u];
let framed = rows[gnd + 5u] != 0u;
if (framed && (rows[gnd + 18u] == 0u)) {
return false;
}
var at = vec3f(0.0,0.0,0.0);
var q = vec4f(0.0,0.0,0.0,1.0);
if (framed) {
at = rf3(gnd + 6u);
q = rf4(gnd + 6u + 3u);
}
let local = quatRotate(qConj(q),vec3f(x - at.x,fw[fr + 24u + 1u] - at.y,z - at.z));
var px = x;
var pz = z;
if (framed) {
px = local.x;
pz = local.z;
}
if (!sampleGridAt(gnd,fr,px,pz)) {
return false;
}
let sx = fw[fr + 20u];
let sz = fw[fr + 21u];
let invLen = 1.0 / sqrt(sx * sx + 1.0 + sz * sz);
var nrm = vec3f(-sx * invLen,invLen,-sz * invLen);
var height = fw[fr + 19u];
if (framed) {
let g = at + quatRotate(q,vec3f(px,height,pz));
nrm = quatRotate(q,nrm);
if (!(nrm.y > FRAME_GROUND_MIN_UP)) {
return false;
}
height = g.y - (nrm.x * (x - g.x) + nrm.z * (z - g.z)) / nrm.y;
}
fw[fr + 11u] = height;
fw[fr + 12u] = nrm.x;
fw[fr + 13u] = nrm.y;
fw[fr + 14u] = nrm.z;
return true;
}
fn sampleAt(gnd: u32,fr: u32,x: f32,z: f32) -> bool {
fw[fr + 15u] = x;
fw[fr + 16u] = z;
return sampleGround(gnd,fr);
}
`,`fn seatHoldsHips(st: u32,fr: u32,inputs: u32,gnd: u32) -> bool {
state[st + 31u] = 0.0;
if (!sampleAt(gnd,fr,fw[fr + 24u],fw[fr + 24u + 2u])) {
return false;
}
let seat = fw[fr + 11u];
let lag = gate(fr,GATE_REFERENCE_MAX_LAG);
if (!(seat - fw[fr + 24u + 1u] > lag)) {
return false;
}
let feet = rows[inputs + 2u];
var floors = 0.0;
for (var i = 0u; i < feet; i++) {
let fs = footSlot(st,inputs,i);
if (on(state[fs + 79u])) {
if (!sampleAt(gnd,fr,state[fs + 62u],state[fs + 64u]) || (seat - fw[fr + 11u] > lag)) {
return true;
}
floors = 1.0;
}
}
state[st + 31u] = floors;
return floors == 0.0;
}
fn followWrapper(st: u32,fr: u32,inputs: u32,seated: bool) {
let wx = fw[fr + 24u];
let wy = fw[fr + 24u + 1u];
let wz = fw[fr + 24u + 2u];
let dt = fw[fr + 22u];
if (on(state[st + 13u])) {
let dx = wx - state[st + 10u];
let dy = wy - state[st + 11u];
let dz = wz - state[st + 12u];
if (dx * dx + dy * dy + dz * dz > FOOT_TELEPORT_DISTANCE_SQ) {
let feet = rows[inputs + 2u];
for (var i = 0u; i < feet; i++) {
let fs = footSlot(st,inputs,i);
if (on(state[fs + 79u])) {
resetFootOnTeleport(fs);
}
}
state[st + 7u] = 0.0;
state[st + 9u] = select01(seated);
state[st + 14u] = wy;
state[st + 19u] = PLANE_NONE;
stopBody(st);
} else {
if (dt > 0.0) {
state[st + 22u] = sqrt(dx * dx + dz * dz) / dt;
let blend = closeOf(FOOT_BODY_VELOCITY_SMOOTH,dt);
state[st + 20u] += (dx / dt - state[st + 20u]) * blend;
state[st + 21u] += (dz / dt - state[st + 21u]) * blend;
}
state[st + 14u] += (wy - state[st + 14u]) * closeOf(FOOT_REFERENCE_SMOOTH,dt);
let lag = gate(fr,GATE_REFERENCE_MAX_LAG);
state[st + 14u] = min(wy + lag,max(wy - lag,state[st + 14u]));
}
} else {
state[st + 14u] = wy;
state[st + 9u] = select01(seated);
stopBody(st);
}
state[st + 10u] = wx;
state[st + 11u] = wy;
state[st + 12u] = wz;
state[st + 13u] = 1.0;
}
fn measureFoot(fr: u32,fs: u32) {
let dt = fw[fr + 22u];
let footX = state[fs + 62u];
let footY = state[fs + 63u];
let footZ = state[fs + 64u];
let localX = footX - fw[fr + 24u];
let localZ = footZ - fw[fr + 24u + 2u];
let localY = footY - fw[fr + 24u + 1u];
let hasPrev = on(state[fs + 24u]);
if (hasPrev && (dt > 0.0)) {
let dx = footX - state[fs + 19u];
let dz = footZ - state[fs + 21u];
state[fs + 25u] = sqrt(dx * dx + dz * dz) / dt;
let lx = localX - state[fs + 22u];
let lz = localZ - state[fs + 23u];
state[fs + 26u] = sqrt(lx * lx + lz * lz) / dt;
state[fs + 27u] = lx / dt;
state[fs + 28u] = lz / dt;
state[fs + 29u] = (localY - state[fs + 30u]) / dt;
} else if (!hasPrev) {
state[fs + 25u] = REACH_INF;
state[fs + 26u] = REACH_INF;
state[fs + 27u] = 0.0;
state[fs + 28u] = 0.0;
state[fs + 29u] = 0.0;
}
state[fs + 30u] = localY;
state[fs + 19u] = footX;
state[fs + 21u] = footZ;
state[fs + 22u] = localX;
state[fs + 23u] = localZ;
state[fs + 24u] = 1.0;
}
fn fitSupportPlane(st: u32,fr: u32,inputs: u32,still: bool) -> bool {
let plantGate = gate(fr,GATE_PLANT_SPEED);
let unit = fw[fr + 56u];
let feet = rows[inputs + 2u];
var count = 0.0;
var mx = 0.0;
var my = 0.0;
var mz = 0.0;
var sxx = 0.0;
var szz = 0.0;
var sxz = 0.0;
var sxy = 0.0;
var szy = 0.0;
for (var k = 0u; k < 2u; k++) {
if (k == 1u) {
if (count < 3.0) {
return false;
}
mx = mx / count;
my = my / count;
mz = mz / count;
}
for (var i = 0u; i < feet; i++) {
let fs = footSlot(st,inputs,i);
if (!on(state[fs + 79u]) || (still && !(state[fs + 25u] < plantGate))) {
continue;
}
let x = state[fs + 62u];
let y = state[fs + 63u] - state[fs + 77u] * unit;
let z = state[fs + 64u];
if (k == 0u) {
count += 1.0;
mx += x;
my += y;
mz += z;
} else {
let dx = x - mx;
let dz = z - mz;
let dy = y - my;
sxx += dx * dx;
szz += dz * dz;
sxz += dx * dz;
sxy += dx * dy;
szy += dz * dy;
}
}
}
let det = sxx * szz - sxz * sxz;
let spread = sxx + szz;
if (!(det > SUPPORT_SCATTER_MIN * spread * spread)) {
return false;
}
fw[fr + 88u] = (sxy * szz - szy * sxz) / det;
fw[fr + 89u] = (szy * sxx - sxy * sxz) / det;
return true;
}
fn readPoseLean(st: u32,fr: u32,inputs: u32,live: u32) -> f32 {
if (live >= 3u) {
for (var k = 0u; k < 2u; k++) {
if ((k == 1u) && (state[st + 19u] == PLANE_FEET)) {
return PLANE_NONE;
}
if (fitSupportPlane(st,fr,inputs,(k == 0u))) {
return PLANE_FEET;
}
}
}
let upY = max(fw[fr + 64u + 1u],0.001);
fw[fr + 88u] = -fw[fr + 64u] / upY;
fw[fr + 89u] = -fw[fr + 64u + 2u] / upY;
return PLANE_WRAPPER;
}
fn readGroundLean(st: u32,fr: u32,inputs: u32,gnd: u32) {
var reach = SUPPORT_GROUND_REACH_MIN;
let feet = rows[inputs + 2u];
for (var i = 0u; i < feet; i++) {
let fs = footSlot(st,inputs,i);
if (on(state[fs + 79u])) {
reach = max(reach,state[fs + 78u] * fw[fr + 56u]);
}
}
fw[fr + 88u] = 0.0;
fw[fr + 89u] = 0.0;
let wx = fw[fr + 24u];
let wz = fw[fr + 24u + 2u];
var east = 0.0;
var west = 0.0;
var south = 0.0;
for (var k = 0u; k < 4u; k++) {
var x = wx;
var z = wz;
if (k == 0u) {
x = wx + reach;
} else if (k == 1u) {
x = wx - reach;
} else if (k == 2u) {
z = wz + reach;
} else {
z = wz - reach;
}
if (!sampleAt(gnd,fr,x,z)) {
return;
}
let h = fw[fr + 11u];
if (k == 0u) {
east = h;
} else if (k == 1u) {
west = h;
} else if (k == 2u) {
south = h;
} else {
fw[fr + 88u] = (east - west) / (2.0 * reach);
fw[fr + 89u] = (south - h) / (2.0 * reach);
}
}
}
fn updateSupportPlane(st: u32,fr: u32,inputs: u32,gnd: u32,live: u32) {
let first = state[st + 19u] == PLANE_NONE;
let from_ = readPoseLean(st,fr,inputs,live);
if (from_ != PLANE_NONE) {
state[st + 17u] = fw[fr + 88u];
state[st + 18u] = fw[fr + 89u];
state[st + 19u] = from_;
}
readGroundLean(st,fr,inputs,gnd);
let groundX = fw[fr + 88u];
let groundZ = fw[fr + 89u];
let ground = sqrt(groundX * groundX + groundZ * groundZ);
var slopeX = 0.0;
var slopeZ = 0.0;
if (ground > SUPPORT_SLOPE_EPSILON) {
let shared_ = min(min(ground,FOOT_SUPPORT_SLOPE_MAX),max(0.0,(state[st + 17u] * groundX + state[st + 18u] * groundZ) / ground));
if (shared_ > SUPPORT_SLOPE_EPSILON) {
slopeX = groundX / ground * shared_;
slopeZ = groundZ / ground * shared_;
}
}
if (first) {
state[st + 15u] = slopeX;
state[st + 16u] = slopeZ;
} else {
let blend = closeOf(FOOT_SUPPORT_SMOOTH,fw[fr + 22u]);
if (abs(slopeX - state[st + 15u]) < SUPPORT_SLOPE_EPSILON) {
state[st + 15u] = slopeX;
} else {
state[st + 15u] = state[st + 15u] + (slopeX - state[st + 15u]) * blend;
}
if (abs(slopeZ - state[st + 16u]) < SUPPORT_SLOPE_EPSILON) {
state[st + 16u] = slopeZ;
} else {
state[st + 16u] = state[st + 16u] + (slopeZ - state[st + 16u]) * blend;
}
}
}
`,`const FOOT_MODE_STEP: u32 = 0u;
const FOOT_MODE_LOCK: u32 = 1u;
`,`fn readFootGrounding(st: u32,fr: u32,inputs: u32,gnd: u32) {
writeGate(fr,GATE_SWING_RELEASE_SPEED,0.6,0.4);
writeGate(fr,GATE_PLANT_SPEED,0.25,0.16);
writeGate(fr,GATE_CONFORM_LIFT,FOOT_CONFORM_LIFT_MAX,FOOT_CONFORM_LIFT_FLOOR);
writeGate(fr,GATE_SWING_RELEASE_LIFT,0.04,0.015);
writeGate(fr,GATE_STEP_FADE_START,0.15,0.05);
writeGate(fr,GATE_STEP_MAX,0.25,0.1);
writeGate(fr,GATE_REFERENCE_MAX_LAG,0.05,0.05);
writeGate(fr,GATE_STRETCH_MARGIN,0.05,0.05);
writeGate(fr,GATE_STEP_RISE_MAX,0.3,0.1);
let seated = seatHoldsHips(st,fr,inputs,gnd);
followWrapper(st,fr,inputs,seated);
let dt = fw[fr + 22u];
let seatBlend = easeOf(dt);
if (seated) {
state[st + 9u] += (1.0 - state[st + 9u]) * seatBlend;
} else {
state[st + 9u] -= state[st + 9u] * seatBlend;
}
let yaw = fw[fr + 27u];
fw[fr + 28u] = cos(yaw);
fw[fr + 29u] = sin(yaw);
}
fn footsGrounding(st: u32,fr: u32,inputs: u32,gnd: u32,live: u32) {
let feet = rows[inputs + 2u];
updateSupportPlane(st,fr,inputs,gnd,live);
var stepping = 0.0;
for (var i = 0u; i < feet; i++) {
let fs = footSlot(st,inputs,i);
if (on(state[fs + 79u]) && on(state[fs + 37u])) {
stepping += 1.0;
}
}
fw[fr + 86u] = stepping;
fw[fr + 87u] = f32(((live + 1u) >> 1u));
}
`,`fn closeOf(rate: f32,dt: f32) -> f32 {
if (restStep()) {
return 1.0;
}
return 1.0 - exp(-rate * dt);
}
fn easeOf(dt: f32) -> f32 {
return closeOf(FOOT_PELVIS_SMOOTH,dt);
}
fn levelRampOf(dt: f32) -> f32 {
return 0.5 * rampOf(dt);
}
`,`fn weightShare(st: u32) -> f32 {
return min(1.0,max(0.0,2.0 - 2.0 * state[st + 28u]));
}
fn footShare(st: u32) -> f32 {
return sqrt(weightShare(st));
}
`,`fn rampOf(dt: f32) -> f32 {
if (restStep()) {
return REST_RAMP;
}
return FOOT_WEIGHT_RAMP * dt;
}
`,`fn gaitOf(gait: u32,clip: u32) -> u32 {
if (gait == 4294967295u) {
return 4294967295u;
}
let count = rows[gait];
for (var c = 0u; c < count; c++) {
let at = gait + 1u + c * 2u;
if (rows[at] == clip) {
return gait + rows[at + 1u];
}
}
return 4294967295u;
}
fn layerHolds(row: u32,rig: u32,l: u32,node: u32) -> bool {
let layer = row + 51u + l * 19u;
let start = rows[layer + 2u];
if (start == 4294967295u) {
return true;
}
let pre = bake[rig + bake[rig + 6u] + node];
return (pre >= start) && (pre < rows[layer + 3u]);
}
fn poseFloor(row: u32,rig: u32,gait: u32,drop: u32,maxFloor: f32) -> f32 {
var weighted = 0.0;
var total = 0.0;
let layers = rowLayerCount(row);
for (var l = 0u; l < layers; l++) {
let weight = rowLayerWeight(row,l);
if ((weight < REACH_EPSILON) || !layerHolds(row,rig,l,drop)) {
continue;
}
let rec = gaitOf(gait,rowLayerClip(row,l));
if ((rec == 4294967295u) || (rows[rec + 1u] == 0u)) {
continue;
}
let clipFloor = rf(rec);
total += weight;
if (clipFloor <= maxFloor) {
weighted += weight * clipFloor;
}
}
if (total <= 0.0) {
return 0.0;
}
if (total >= 1.0) {
return weighted / total;
}
return weighted;
}
fn layerRate(row: u32,l: u32,period: f32) -> f32 {
let layer = row + 51u + l * 19u;
let flags = rows[layer + 1u];
let speed = rf(layer + 6u);
var clock = 4u;
if ((flags & 64u) != 0u) {
clock = 6u;
}
let x = rf(layer + 7u) + since(clock,rf(layer + 8u),rf(layer + 9u)) * speed;
if (((flags & 256u) != 0u) && !((x >= 0.0) && (x <= period))) {
return 0.0;
}
if ((flags & 512u) != 0u) {
let span = rf(layer + 5u);
if (span > 0.0) {
let twice = span + span;
let t = x - twice * floor(x / twice);
if (t > period) {
return -speed;
}
}
}
return speed;
}
fn poseStrideOf(row: u32,rig: u32,gait: u32,fr: u32,fs: u32,k: u32,node: u32) {
var sw = 0.0;
var sbx = 0.0;
var sbz = 0.0;
var ssx = 0.0;
var ssz = 0.0;
var ow = 0.0;
var obx = 0.0;
var obz = 0.0;
var osx = 0.0;
var osz = 0.0;
var known = 0.0;
let layers = rowLayerCount(row);
for (var l = 0u; l < layers; l++) {
let weight = rowLayerWeight(row,l);
if ((weight <= REACH_EPSILON) || !layerHolds(row,rig,l,node)) {
continue;
}
let rec = gaitOf(gait,rowLayerClip(row,l));
if ((rec == 4294967295u) || (k >= rows[rec + 5u])) {
continue;
}
let foot = rec + 6u + k * 3u;
if (rows[foot + 2u] == 0u) {
continue;
}
known = max(known,f32(rows[foot + 2u]));
let s = weight * layerRate(row,l,rf(rec + 2u));
let dirX = rf(rec + 3u);
let dirZ = rf(rec + 4u);
let back = rf(foot);
let swing = rf(foot + 1u);
if ((rows[row + 51u + l * 19u + 1u] & 1u) != 0u) {
ow += weight;
obx += s * back * dirX;
obz += s * back * dirZ;
osx += s * swing * dirX;
osz += s * swing * dirZ;
} else {
sw += weight;
sbx += s * back * dirX;
sbz += s * back * dirZ;
ssx += s * swing * dirX;
ssz += s * swing * dirZ;
}
}
state[fs + 74u] = known;
if (known == 0.0) {
state[fs + 70u] = 0.0;
state[fs + 71u] = 0.0;
state[fs + 72u] = 0.0;
state[fs + 73u] = 0.0;
return;
}
var shared_ = 1.0;
if (sw > 1.0) {
shared_ = 1.0 / sw;
}
var own = 1.0;
if (ow > 1.0) {
own = 1.0 / ow;
}
var left = 0.0;
if (ow < 1.0) {
left = (1.0 - ow) * shared_;
}
let wq = vec4f(fw[fr + 60u],fw[fr + 60u + 1u],fw[fr + 60u + 2u],fw[fr + 60u + 3u]);
let unit = fw[fr + 56u];
let stride = dirIn(fr,quatRotate(wq,vec3f(obx * own + sbx * left,0.0,obz * own + sbz * left)));
let swing = dirIn(fr,quatRotate(wq,vec3f(osx * own + ssx * left,0.0,osz * own + ssz * left)));
state[fs + 70u] = stride.x * unit;
state[fs + 71u] = stride.z * unit;
state[fs + 72u] = swing.x * unit;
state[fs + 73u] = swing.z * unit;
}
fn boneRowMove(row: u32,rig: u32,pose: u32,n: u32,r: u32,node: u32) -> vec3f {
let shift = vec3f(rf(r + 6u),rf(r + 6u + 1u),rf(r + 6u + 2u));
let axes = boneMoveAxisLengths(row,rig,pose,n,node);
return vec3f(axisUnits(shift.x,axes.x),axisUnits(shift.y,axes.y),axisUnits(shift.z,axes.z));
}
fn axisUnits(shift: f32,measured: f32) -> f32 {
if ((shift == 0.0) || !(measured > 0.0)) {
return 0.0;
}
return shift / measured;
}
fn clipFootOf(row: u32,rig: u32,pose: u32,model: u32,n: u32,limbRoot: u32,p: vec3f) -> vec3f {
var x = p.x;
var y = p.y;
var z = p.z;
let count = rows[row + 4u];
if (count == 0u) {
return p;
}
let base = row + 51u + rows[row + 2u] * 19u;
for (var b = parentNode(rig,limbRoot); (b != 4294967295u) && (b < n); b = parentNode(rig,b)) {
var turn = vec4f(0.0,0.0,0.0,1.0);
var move_ = vec3f(0.0,0.0,0.0);
var laid = false;
for (var i = 0u; i < count; i++) {
let r = base + i * 10u;
let flags = rows[r + 1u];
if ((rows[r] != b) || ((flags & 4u) != 0u)) {
continue;
}
if ((flags & 1u) != 0u) {
turn = quatMul(turn,vec4f(rf(r + 2u),rf(r + 2u + 1u),rf(r + 2u + 2u),rf(r + 2u + 3u)));
laid = true;
}
if ((flags & 2u) != 0u) {
move_ = move_ + boneRowMove(row,rig,pose,n,r,b);
laid = true;
}
}
if (!laid) {
continue;
}
let w = nodeWorld(model,n,b);
let c0 = w[0u];
let c1 = w[1u];
let c2 = w[2u];
let c3 = w[3u];
let l0 = sqrt(c0.x * c0.x + c0.y * c0.y + c0.z * c0.z);
let l1 = sqrt(c1.x * c1.x + c1.y * c1.y + c1.z * c1.z);
let l2 = sqrt(c2.x * c2.x + c2.y * c2.y + c2.z * c2.z);
if ((((((turn.x != 0.0) || (turn.y != 0.0)) || (turn.z != 0.0)) && (l0 > 0.0)) && (l1 > 0.0)) && (l2 > 0.0)) {
let vx = x - c3.x;
let vy = y - c3.y;
let vz = z - c3.z;
let u = vec3f((c0.x * vx + c0.y * vy + c0.z * vz) / l0,(c1.x * vx + c1.y * vy + c1.z * vz) / l1,(c2.x * vx + c2.y * vy + c2.z * vz) / l2);
let back = quatRotate(qConj(turn),u);
let rx = back.x / l0;
let ry = back.y / l1;
let rz = back.z / l2;
x = c3.x + c0.x * rx + c1.x * ry + c2.x * rz;
y = c3.y + c0.y * rx + c1.y * ry + c2.y * rz;
z = c3.z + c0.z * rx + c1.z * ry + c2.z * rz;
}
if (((move_.x != 0.0) || (move_.y != 0.0)) || (move_.z != 0.0)) {
let pw = nodeWorld(model,n,parentNode(rig,b));
let p0 = pw[0u];
let p1 = pw[1u];
let p2 = pw[2u];
x -= p0.x * move_.x + p1.x * move_.y + p2.x * move_.z;
y -= p0.y * move_.x + p1.y * move_.y + p2.y * move_.z;
z -= p0.z * move_.x + p1.z * move_.y + p2.z * move_.z;
}
}
return vec3f(x,y,z);
}
fn chainArm(table: u32,chain: u32) -> u32 {
let arm = rows[chain + 4u];
if (arm == 4294967295u) {
return 4294967295u;
}
return table + arm;
}
fn effectorWeight(e: u32,elapsed: f32) -> f32 {
let w0 = rf(e + 34u);
let goal = rf(e + 37u);
let rate = rf(e + 38u);
let seconds = since(4u,rf(e + 35u),rf(e + 36u));
if (abs(goal - walkWeight(w0,goal,rate,seconds - elapsed)) < REACH_EPSILON) {
return goal;
}
return walkWeight(w0,goal,rate,seconds);
}
fn footWeight(e: u32) -> f32 {
return walkWeight(rf(e + 11u),rf(e + 14u),FOOT_WEIGHT_RAMP,since(4u,rf(e + 12u),rf(e + 13u)));
}
`,`fn jobOf(st: u32) -> u32 {
return st + 148u;
}
`,`const REACH_JOB_NONE: f32 = 0.0;
const REACH_JOB_LIMB: f32 = 1.0;
const REACH_JOB_LOOK: f32 = 2.0;
const REACH_JOB_ALIGN: f32 = 3.0;
const REACH_PHASE_FEET: f32 = 0.0;
const REACH_PHASE_EFFECTORS: f32 = 1.0;
const REACH_PHASE_FADING: f32 = 2.0;
const REACH_PHASE_RIDES: f32 = 3.0;
const REACH_PHASE_DONE: f32 = 4.0;
`,`fn nextPhase(fr: u32,phase: f32) {
fw[fr + 96u] = phase;
fw[fr + 97u] = 0.0;
fw[fr + 98u] = 0.0;
}
`,`fn groundOf(inputs: u32) -> u32 {
if (rows[inputs + 9u] == 4294967295u) {
return 4294967295u;
}
return inputs + rows[inputs + 9u];
}
`,`fn readGroundFeet(row: u32,rig: u32,st: u32,fr: u32,inputs: u32,live: u32) {
let feet = rows[inputs + 2u];
let unit = fw[fr + 56u];
var leg = 0.0;
var grounded = 0.0;
for (var i = 0u; i < feet; i++) {
let e = footEntry(inputs,i);
let fs = footSlotAt(st,inputs,rows[e + 15u]);
if (on(state[fs + 79u])) {
leg = max(leg,rf(e + 8u));
grounded = max(grounded,state[fs + 75u]);
}
}
var modelScale = unit;
if (leg > 0.0) {
modelScale = leg * unit / REACH_REFERENCE_LEG;
}
fw[fr + 57u] = modelScale;
fw[fr + 23u] = rf(inputs + 7u) * modelScale;
grounded = min(1.0,grounded) * footShare(st);
let drop = rows[inputs + 8u];
let layers = rowLayerCount(row);
var floorWorld = 0.0;
if ((((drop != 4294967295u) && (live > 0u)) && (layers > 0u)) && (unit > 0.0)) {
let maxFloorWorld = max(FOOT_CONFORM_LIFT_MAX * modelScale,FOOT_CONFORM_LIFT_FLOOR);
floorWorld = poseFloor(row,rig,gaitAt(inputs),drop,maxFloorWorld / unit) * unit * grounded;
}
fw[fr + 58u] = floorWorld;
}
fn gaitAt(inputs: u32) -> u32 {
var gait = rows[inputs + 10u];
if (gait != 4294967295u) {
gait = inputs + gait;
}
return gait;
}
fn heelLiftOf(model: u32,n: u32,fr: u32,e: u32,ankle: vec3f) -> f32 {
let ball = rows[e + 20u];
var lift = 0.0;
if (ball != 4294967295u) {
let rise = dot(ankle - nodePos(model,n,ball),frame3(fr + 112u));
lift = max(0.0,rise - rf(e + 21u) * fw[fr + 56u]);
}
return lift;
}
fn readFoot(row: u32,rig: u32,pose: u32,model: u32,n: u32,fr: u32,e: u32,fs: u32,gait: u32,floorWorld: f32) {
let chain = e + 1u;
let root = rows[chain];
state[fs + 76u] = rf(e + 8u);
state[fs + 77u] = rf(e + 9u);
state[fs + 78u] = rf(e + 10u);
let hip = nodePos(model,n,root);
let foot = nodePos(model,n,rows[chain + 2u]);
let lift = heelLiftOf(model,n,fr,e,foot);
state[fs + 82u] = lift;
let hipIn = pointIn(fr,hip);
let footIn = pointIn(fr,foot);
putState3(fs + 65u,vec3f(hipIn.x,hipIn.y - floorWorld,hipIn.z));
putState3(fs + 62u,vec3f(footIn.x,footIn.y - floorWorld - lift,footIn.z));
let clip = pointIn(fr,clipFootOf(row,rig,pose,model,n,root,foot));
state[fs + 68u] = clip.x;
state[fs + 69u] = clip.z;
poseStrideOf(row,rig,gait,fr,fs,rows[e + 17u],rows[e]);
}
fn handOver(model: u32,n: u32,st: u32,inputs: u32,table: u32,f: u32,fs: u32) {
let fr = 0u;
let es = effectorSlotAt(st,inputs,rows[f + 19u]);
state[fs + 43u] = 1.0;
if (on(state[es + 1u])) {
putState3(fs + 44u,pointIn(fr,state3(es + 2u)));
return;
}
let chain = f + 1u;
let end = rows[chain + 2u];
let w = state[es + 5u];
let reached = limbReach(model,n,rows[chain],rows[chain + 1u],end,chainArm(table,chain),state3(es + 6u));
let s = nodePos(model,n,end);
putState3(fs + 44u,pointIn(fr,s + (reached - s) * w));
}
fn standReach(st: u32,inputs: u32) {
let fr = 0u;
let o = inputs + 11u;
let so = st + 1u;
if (state[st] == 0.0) {
for (var k = 0u; k < 6u; k++) {
state[so + k] = rf(o + k);
}
state[st] = 1.0;
}
let moved = vec3f(rf(o) - state[so] + (rf(o + 1u) - state[so + 1u]),rf(o + 2u) - state[so + 2u] + (rf(o + 3u) - state[so + 3u]),rf(o + 4u) - state[so + 4u] + (rf(o + 5u) - state[so + 5u]));
if (((moved.x != 0.0) || (moved.y != 0.0)) || (moved.z != 0.0)) {
shiftOrigin(st,inputs,moved);
for (var k = 0u; k < 6u; k++) {
state[so + k] = rf(o + k);
}
}
let elapsed = max(frameSeconds(),0.0);
fw[fr + 55u] = elapsed;
fw[fr + 22u] = min(elapsed,REACH_MAX_DT);
fw[fr + 95u] = 0.0;
fw[fr + 99u] = 0.0;
}
fn readReachFeet(st: u32,inputs: u32) -> u32 {
let feet = rows[inputs + 2u];
var live = 0u;
for (var i = 0u; i < feet; i++) {
let f = footEntry(inputs,i);
let fs = footSlotAt(st,inputs,rows[f + 15u]);
if (state[fs] != f32(rows[f + 16u])) {
freshFoot(fs,rows[f + 16u]);
}
let w = footWeight(f) * footShare(st);
state[fs + 75u] = w;
let stands = !((w <= 0.0) && (rf(f + 14u) == 0.0));
state[fs + 79u] = select01(stands);
if (stands) {
live++;
}
}
return live;
}
fn readReachEffectors(st: u32,inputs: u32) -> bool {
let effectors = rows[inputs];
let elapsed = fw[55u];
var acting = false;
for (var i = 0u; i < effectors; i++) {
let e = effectorEntry(inputs,i);
let es = effectorSlotAt(st,inputs,rows[e + 41u]);
if (state[es] != f32(rows[e + 42u])) {
for (var k = 0u; k < 12u; k++) {
state[es + k] = 0.0;
}
state[es] = f32(rows[e + 42u]);
}
let w = effectorWeight(e,elapsed) * weightShare(st);
state[es + 9u] = w;
let stands = !((w < REACH_EPSILON) && (rf(e + 37u) == 0.0));
state[es + 10u] = select01(stands);
acting = acting || stands;
}
return acting;
}
fn handOvers(model: u32,n: u32,st: u32,inputs: u32,table: u32) {
let feet = rows[inputs + 2u];
for (var i = 0u; i < feet; i++) {
let f = footEntry(inputs,i);
let fs = footSlotAt(st,inputs,rows[f + 15u]);
if (on(state[fs + 79u]) && (state[fs + 1u] != f32(rows[f + 18u]))) {
state[fs + 1u] = f32(rows[f + 18u]);
handOver(model,n,st,inputs,table,f,fs);
}
}
}
fn standWrapper(model: u32,n: u32,fr: u32,inputs: u32) {
let root = nodeWorld(model,n,4294967295u);
let wq = matTurn(worldAt(model,n,4294967295u));
let c1 = root[1u];
var unit = abs(sqrt(c1.x * c1.x + c1.y * c1.y + c1.z * c1.z));
if (unit == 0.0) {
unit = 1.0;
}
let up = quatRotate(wq,vec3f(0.0,1.0,0.0));
putFrame3(fr + 112u,up);
putFrame3(fr + 24u,pointIn(fr,matPos(root) - up * (rf(inputs + 20u) * unit)));
for (var k = 0u; k < 4u; k++) {
fw[fr + 60u + k] = wq[k];
}
fw[fr + 56u] = unit;
let front = rf3(inputs + 4u);
putFrame3(fr + 67u,front);
putFrame3(fr + 64u,dirIn(fr,up));
let forward = dirIn(fr,quatRotate(wq,front));
fw[fr + 27u] = 0.0;
if (forward.x * forward.x + forward.z * forward.z > 1e-12) {
fw[fr + 27u] = atan2(-forward.x,-forward.z);
}
}
fn recordEffectors(st: u32,inputs: u32) {
let effectors = rows[inputs];
for (var i = 0u; i < effectors; i++) {
let e = effectorEntry(inputs,i);
let es = effectorSlotAt(st,inputs,rows[e + 41u]);
let w = state[es + 9u];
state[es + 5u] = w;
if ((rows[e + 16u] == 4294967295u) || (w < REACH_EPSILON)) {
putState3(es + 6u,rf3(e + 13u));
}
}
}
`,`var<workgroup> wgReachRow: u32;
var<workgroup> wgDropMoved: u32;
var<workgroup> wgDropMove: vec4f;
var<workgroup> wgDropMoveWorld: vec4f;
fn reachRow(index: u32) -> u32 {
var row = 4294967295u;
if ((index < rows[13u]) && rowPoses(rows[rows[12u] + index])) {
row = rows[rows[12u] + index];
}
return row;
}
`,`fn reach_stand(row: u32) -> u32 {
let rig = rows[row];
let n = bake[rig];
let pose = rows[row + 1u];
let model = pose + n * 10u;
let inputs = passWord(row,0u,0u);
let st = passWord(row,0u,1u);
let table = passWord(row,0u,2u);
let fr = 0u;
standReach(st,inputs);
let live = readReachFeet(st,inputs);
let acting = readReachEffectors(st,inputs);
standTurnedSpace(st,fr,inputs);
handOvers(model,n,st,inputs,table);
recordEffectors(st,inputs);
let grounding = (live > 0u) || (abs(state[st + 7u]) > REACH_PELVIS_EPSILON);
fw[fr + 101u] = select01(grounding);
fw[fr + 102u] = select01(acting);
fw[fr + 103u] = 0.0;
state[jobOf(st)] = REACH_JOB_NONE;
for (var i = 0u; i < rows[inputs + 2u]; i++) {
state[footSlot(st,inputs,i) + 138u] = REACH_JOB_NONE;
}
if (grounding || acting) {
nextPhase(fr,REACH_PHASE_FEET);
standWrapper(model,n,fr,inputs);
} else {
nextPhase(fr,REACH_PHASE_DONE);
}
if (grounding) {
readGroundFeet(row,rig,st,fr,inputs,live);
}
return live;
}
fn standLevel(row: u32,st: u32,inputs: u32) -> bool {
let pose = rows[row + 1u];
var seen = poseEyeSees(pose);
let ramp = levelRampOf(min(max(frameSeconds(),0.0),REACH_MAX_DT));
let anew = verdictOf(pose) > 1.5;
let frame = rf(32u);
let stood = state[st + 30u];
if ((stood != frame) && (stood + 1.0 != frame)) {
state[st + 28u] = 1.0;
}
state[st + 30u] = frame;
let leaves = rows[524u] != 0u;
if (seen && leaves) {
if (anew) {
state[st + 28u] = 1.0;
}
state[st + 28u] = min(1.0,state[st + 28u] + ramp);
if (state[st + 28u] >= 1.0) {
seen = false;
}
}
if (!seen) {
let fr = 0u;
state[st + 28u] = 1.0;
fw[fr + 101u] = 0.0;
fw[fr + 102u] = 0.0;
fw[fr + 95u] = 0.0;
nextPhase(fr,REACH_PHASE_DONE);
} else if (!leaves) {
let away = state[st + 28u];
let fresh = anew || ((away >= 1.0) && (rows[798u] != 0u));
if (fresh || (away >= 1.0)) {
placeGrounding(st,inputs);
settleHandOvers(st,inputs);
}
state[st + 28u] = select(max(0.0,away - ramp),0.0,fresh);
}
return seen;
}
fn settleHandOvers(st: u32,inputs: u32) {
let feet = rows[inputs + 2u];
for (var i = 0u; i < feet; i++) {
let f = footEntry(inputs,i);
state[footSlotAt(st,inputs,rows[f + 15u]) + 1u] = f32(rows[f + 18u]);
}
}
fn reachStandStage(row: u32,tid: u32) {
let st = passWord(row,0u,1u);
let fr = 0u;
let inputs = passWord(row,0u,0u);
let feet = rows[inputs + 2u];
standWorld(rows[row],rows[row + 1u] + bake[rows[row]] * 10u,tid);
storageBarrier();
workgroupBarrier();
var live = 0u;
if (tid == 0u) {
live = reach_stand(row);
}
storageBarrier();
workgroupBarrier();
let readsFeet = on(fw[fr + 101u]);
if (readsFeet) {
let rig = rows[row];
let n = bake[rig];
let pose = rows[row + 1u];
let floorWorld = fw[fr + 58u];
for (var i = tid; i < feet; i += WG) {
let e = footEntry(inputs,i);
let fs = footSlotAt(st,inputs,rows[e + 15u]);
if (on(state[fs + 79u])) {
readFoot(row,rig,pose,pose + n * 10u,n,fr,e,fs,gaitAt(inputs),floorWorld);
}
}
}
storageBarrier();
workgroupBarrier();
if ((tid == 0u) && readsFeet) {
readFootGrounding(st,fr,inputs,groundOf(inputs));
}
storageBarrier();
workgroupBarrier();
if (readsFeet) {
for (var i = tid; i < feet; i += WG) {
let fs = footSlot(st,inputs,i);
if (on(state[fs + 79u])) {
measureFoot(fr,fs);
}
}
}
storageBarrier();
workgroupBarrier();
if ((tid == 0u) && readsFeet) {
footsGrounding(st,fr,inputs,groundOf(inputs),live);
}
}
`,`fn stateFrame(row: u32) -> u32 {
return passWord(row,0u,1u) + 32u;
}
`,`@compute @workgroup_size(WG)
fn reach_stand_main(@builtin(workgroup_id) lume_wid: vec3u,@builtin(num_workgroups) lume_groups: vec3u,@builtin(local_invocation_index) tid: u32) {
let index: u32 = lume_wid.x + lume_wid.y * lume_groups.x;
let body = reachRow(index);
if (body != 4294967295u) {
loadFrame(stateFrame(body),0u,116u,tid,WG);
}
workgroupBarrier();
if (tid == 0u) {
var stands = 4294967295u;
if (body != 4294967295u) {
let st = passWord(body,0u,1u);
fw[115u] = 0.0;
if (standLevel(body,st,passWord(body,0u,0u))) {
stands = body;
}
}
wgReachRow = stands;
}
let row = workgroupUniformLoad(&wgReachRow);
if (row != 4294967295u) {
reachStandStage(row,tid);
}
workgroupBarrier();
if (body != 4294967295u) {
storeFrame(0u,stateFrame(body),116u,tid,WG);
}
}
`,`fn composeWorldNode(rig: u32,pose: u32,model: u32,node: u32) {
let m = modelOf(rig,pose,model,node);
putScratchMat(model + node * 16u,m);
let n = bake[rig];
putWorldMat(worldAt(model,n,node),scratchMat(model + n * 16u) * m);
}
`,`fn shiftUnder(rig: u32,model: u32,node: u32,move_: vec4f,moveWorld: vec4f,tid: u32) {
let n = bake[rig];
let pre = bake[rig + bake[rig + 6u] + node];
let end = pre + bake[rig + bake[rig + 7u] + node];
let order = rig + bake[rig + 9u];
for (var i = pre + 1u + tid; i < end; i += WG) {
let under = bake[order + i];
let m = model + under * 16u + 12u;
scratch[m] += move_.x;
scratch[m + 1u] += move_.y;
scratch[m + 2u] += move_.z;
let w = worldAt(model,n,under) + 12u;
worldBlock[w] += moveWorld.x;
worldBlock[w + 1u] += moveWorld.y;
worldBlock[w + 2u] += moveWorld.z;
}
}
`,`fn vNormalize(v: vec3f) -> vec3f {
let len = length(v);
if (len > 0.0) {
return v * (1.0 / len);
}
return v;
}
`,`fn dirOut(fr: u32,v: vec3f) -> vec3f {
var out = v;
if (on(fw[fr + 104u])) {
out = quatRotate(frame4(fr + 105u),v);
}
return out;
}
`,`fn groundMoves(gnd: u32) -> bool {
return (gnd != 4294967295u) && (rows[gnd + 5u] != 0u);
}
fn stepFade(fr: u32) {
let deficit = fw[fr + 18u];
let rise = fw[fr + 47u];
let tuned = gate(fr,GATE_STEP_FADE_START);
let band = gate(fr,GATE_STEP_MAX) - tuned;
if (deficit > 0.0) {
let top = max(rise,gate(fr,GATE_STEP_RISE_MAX));
if (deficit <= top - band) {
fw[fr + 18u] = 1.0;
} else if (deficit >= top) {
fw[fr + 18u] = 0.0;
} else {
fw[fr + 18u] = (top - deficit) / band;
}
return;
}
var widen = 0.0;
if (rise > tuned) {
widen = rise - tuned;
}
let start = -(tuned + widen);
if (deficit >= start) {
fw[fr + 18u] = 1.0;
return;
}
let most = -(gate(fr,GATE_STEP_MAX) + widen);
if (deficit <= most) {
fw[fr + 18u] = 0.0;
} else {
fw[fr + 18u] = (deficit - most) / (start - most);
}
}
fn conformHeight(fr: u32) {
fw[fr + 17u] = fw[fr + 46u] / max(fw[fr + 13u],FOOT_NORMAL_MIN_COS) + fw[fr + 23u];
}
fn twistedPast(fr: u32,fs: u32) -> bool {
let wrapped = fw[fr + 27u] - state[fs + 5u] - REACH_TWO_PI * truncTurns((fw[fr + 27u] - state[fs + 5u]) / REACH_TWO_PI);
if (wrapped > REACH_PI) {
return abs(wrapped - REACH_TWO_PI) > FOOT_TWIST_RELEASE;
}
if (wrapped <= -REACH_PI) {
return abs(wrapped + REACH_TWO_PI) > FOOT_TWIST_RELEASE;
}
return abs(wrapped) > FOOT_TWIST_RELEASE;
}
fn truncTurns(x: f32) -> f32 {
if (x < 0.0) {
return -floor(-x);
}
return floor(x);
}
fn holdTwist(fr: u32,fs: u32,gnd: u32) {
let raw = fw[fr + 27u] - state[fs + 5u];
var twist = raw - REACH_TWO_PI * truncTurns(raw / REACH_TWO_PI);
if (twist > REACH_PI) {
twist -= REACH_TWO_PI;
} else if (twist <= -REACH_PI) {
twist += REACH_TWO_PI;
}
if (abs(twist) <= FOOT_TWIST_RELEASE) {
return;
}
var turn = twist + FOOT_TWIST_RELEASE;
if (twist > 0.0) {
turn = twist - FOOT_TWIST_RELEASE;
}
let c = cos(turn);
let s = sin(turn);
let wx = fw[fr + 24u];
let wz = fw[fr + 24u + 2u];
let fromX = state[fs + 2u];
let fromZ = state[fs + 4u];
let dx = fromX - wx;
let dz = fromZ - wz;
let toX = wx + dx * c + dz * s;
let toZ = wz - dx * s + dz * c;
var was = 0.0;
var rise = 0.0;
var reads = 0u;
for (var k = 0u; k < 2u; k++) {
if (!sampleAt(gnd,fr,select(fromX,toX,(k == 1u)),select(fromZ,toZ,(k == 1u)))) {
break;
}
reads++;
if (k == 0u) {
was = fw[fr + 11u];
} else {
rise = fw[fr + 11u] - was;
}
}
state[fs + 2u] = toX;
state[fs + 4u] = toZ;
state[fs + 5u] += turn;
if (reads == 2u) {
state[fs + 3u] += rise;
}
}
fn readFootIn(st: u32,fr: u32,fs: u32) {
let unit = fw[fr + 56u];
let footX = state[fs + 62u];
let footZ = state[fs + 64u];
let hipX = state[fs + 65u];
let hipZ = state[fs + 67u];
let wx = fw[fr + 24u];
let wz = fw[fr + 24u + 2u];
for (var k = 0u; k < 3u; k++) {
fw[fr + 39u + k] = state[fs + 62u + k];
fw[fr + 73u + k] = state[fs + 65u + k];
fw[fr + 49u + k] = state[fs + 72u + k];
}
fw[fr + 45u] = state[fs + 76u] * unit;
fw[fr + 46u] = state[fs + 77u] * unit;
fw[fr + 47u] = state[fs + 78u] * unit;
fw[fr + 48u] = state[st + 15u] * (footX - wx) + state[st + 16u] * (footZ - wz);
fw[fr + 76u] = state[st + 15u] * (hipX - wx) + state[st + 16u] * (hipZ - wz);
fw[fr + 77u] = state[fs + 70u];
fw[fr + 78u] = state[fs + 71u];
fw[fr + 42u] = state[fs + 68u];
fw[fr + 43u] = state[fs + 69u];
}
fn trackStride(st: u32,fr: u32,fs: u32) {
let plantGate = gate(fr,GATE_PLANT_SPEED);
let vx = state[st + 20u];
let vz = state[st + 21u];
let body = sqrt(vx * vx + vz * vz);
fw[fr + 52u] = state[st + 22u];
fw[fr + 53u] = 0.0;
fw[fr + 85u] = 0.0;
fw[fr + 54u] = -1.0;
if ((body > 0.0) && (fw[fr + 51u] > 0.0)) {
let back = (fw[fr + 77u] * vx + fw[fr + 78u] * vz) / body;
let ahead = (fw[fr + 49u] * vx + fw[fr + 50u] * vz) / body;
var swing = -back;
if (ahead > -back) {
swing = ahead;
}
var carry = -ahead;
if (back > -ahead) {
carry = back;
}
if ((swing > plantGate) && (fw[fr + 51u] == 1.0)) {
fw[fr + 54u] = carry;
} else {
fw[fr + 54u] = REACH_INF;
}
}
if (body <= plantGate) {
state[fs + 33u] = 0.0;
state[fs + 31u] = -1.0;
state[fs + 34u] = 0.0;
return;
}
let along = (state[fs + 27u] * vx + state[fs + 28u] * vz) / body;
fw[fr + 53u] = along;
let last = state[fs + 33u];
var forward = last;
if (along < last) {
forward = along;
}
var back = -last;
if (along > last) {
back = -along;
}
if (abs(along) < abs(last)) {
fw[fr + 85u] = along;
} else {
fw[fr + 85u] = last;
}
state[fs + 33u] = along;
if (forward > plantGate) {
if (state[fs + 31u] > 0.0) {
state[fs + 32u] = state[fs + 31u];
}
state[fs + 31u] = 0.0;
state[fs + 34u] = 0.0;
} else if ((state[fs + 31u] >= 0.0) && (back > state[fs + 31u])) {
state[fs + 31u] = back;
}
if (state[fs + 29u] > plantGate) {
state[fs + 34u] = 0.0;
}
}
fn outrunsStride(fr: u32,fs: u32,gnd: u32) -> bool {
let plantGate = gate(fr,GATE_PLANT_SPEED);
if ((gnd == 4294967295u) || groundMoves(gnd)) {
return false;
}
if ((fw[fr + 53u] > plantGate) || (state[fs + 29u] > plantGate)) {
return false;
}
let clip = fw[fr + 54u];
let outrun = select(max(state[fs + 32u],state[fs + 31u]),clip,(clip >= 0.0));
return fw[fr + 52u] > outrun + plantGate;
}
fn plantFoot(fr: u32,fs: u32) {
state[fs + 12u] = 1.0;
state[fs + 13u] = 0.0;
state[fs + 14u] = 0.0;
state[fs + 37u] = 0.0;
state[fs + 47u] = 0.0;
state[fs + 35u] = 1.0;
for (var k = 0u; k < 3u; k++) {
state[fs + 2u + k] = fw[fr + 3u + k];
}
state[fs + 5u] = fw[fr + 27u];
state[fs + 6u] = fw[fr + 3u];
state[fs + 7u] = fw[fr + 5u];
state[fs + 10u] = fw[fr + 42u];
state[fs + 11u] = fw[fr + 43u];
let dx = fw[fr + 42u] - fw[fr + 24u];
let dz = fw[fr + 43u] - fw[fr + 24u + 2u];
state[fs + 8u] = dx * fw[fr + 28u] - dz * fw[fr + 29u];
state[fs + 9u] = dx * fw[fr + 29u] + dz * fw[fr + 28u];
}
fn takeHandedFoot(st: u32,fr: u32,fs: u32,gnd: u32) {
state[fs + 43u] = 0.0;
if (on(state[fs + 37u])) {
fw[fr + 86u] -= 1.0;
}
state[fs + 37u] = 0.0;
letGo(fs);
state[fs + 34u] = 0.0;
let hx = state[fs + 44u];
let hy = state[fs + 45u];
let hz = state[fs + 46u];
let grounded = sampleAt(gnd,fr,hx,hz);
if (grounded) {
conformHeight(fr);
}
if (!grounded || (hy - fw[fr + 11u] - fw[fr + 17u] > gate(fr,GATE_CONFORM_LIFT))) {
state[fs + 47u] = 1.0;
state[fs + 48u] = hx - fw[fr + 39u];
state[fs + 49u] = hy - fw[fr + 40u] - state[st + 7u];
state[fs + 50u] = hz - fw[fr + 41u];
state[fs + 51u] = 1.0;
state[fs + 52u] = 0.0;
state[fs + 18u] = 1.0;
return;
}
if (state[fs + 25u] >= REACH_INF) {
state[fs + 25u] = 0.0;
state[fs + 26u] = 0.0;
}
fw[fr + 3u] = hx;
fw[fr + 4u] = hy;
fw[fr + 5u] = hz;
plantFoot(fr,fs);
state[fs + 18u] = 1.0;
}
fn frameNormal(fr: u32,x: f32,y: f32,z: f32) {
fw[fr + 6u] = x;
fw[fr + 7u] = y;
fw[fr + 8u] = z;
}
fn frameTarget(fr: u32,x: f32,y: f32,z: f32) {
fw[fr + 3u] = x;
fw[fr + 4u] = y;
fw[fr + 5u] = z;
}
fn sampleNormalToFrame(fr: u32) {
frameNormal(fr,fw[fr + 12u],fw[fr + 13u],fw[fr + 14u]);
}
fn evalHandedFoot(st: u32,fr: u32,fs: u32,gnd: u32) -> bool {
let plantGate = gate(fr,GATE_PLANT_SPEED);
let animX = fw[fr + 39u];
let animY = fw[fr + 40u];
let animZ = fw[fr + 41u];
fw[fr] = 1.0;
let fx = state[fs + 48u];
let fy = state[fs + 49u];
let fz = state[fs + 50u];
let gap = sqrt(fx * fx + fy * fy + fz * fz);
var share = 0.0;
if (gap > 0.0) {
let legLen = fw[fr + 45u];
let sx = fw[fr + 49u];
let sz = fw[fr + 50u];
var close = 0.0;
if (fw[fr + 51u] > 0.0) {
close = sqrt(sx * sx + sz * sz);
}
if (!(close > plantGate)) {
close = FOOT_CARRIED_STEP_TRAIL * (1.0 + FOOT_CARRIED_STEP_LEAD) * legLen / (FOOT_CARRIED_STEP_SECONDS * sqrt(legLen));
}
share = state[fs + 51u] - close * fw[fr + 22u] / gap;
if (!(share > 0.0) || restStep()) {
share = 0.0;
}
}
state[fs + 51u] = share;
frameTarget(fr,animX + fx * share,animY + state[st + 7u] + fy * share,animZ + fz * share);
var floorAt = -REACH_INF;
var ground = 0.0;
state[fs + 35u] = 0.0;
if (sampleAt(gnd,fr,fw[fr + 3u],fw[fr + 5u])) {
fw[fr + 18u] = fw[fr + 11u] - state[st + 14u] - fw[fr + 48u];
stepFade(fr);
let fade = fw[fr + 18u];
if (fade > 0.0) {
conformHeight(fr);
let height = fw[fr + 17u];
floorAt = fw[fr + 11u] + height;
let lift = animY - fw[fr + 24u + 1u] - fw[fr + 48u] - height + state[fs + 82u];
if (on(state[fs + 35u])) {
state[fs + 35u] = select01((lift <= gate(fr,GATE_CONFORM_LIFT) + gate(fr,GATE_SWING_RELEASE_LIFT)));
} else {
state[fs + 35u] = select01((lift <= gate(fr,GATE_CONFORM_LIFT)));
}
if (on(state[fs + 35u])) {
ground = fade;
}
}
}
let was = state[fs + 52u];
let ramp = rampOf(fw[fr + 22u]);
state[fs + 52u] = select(max(ground,was - ramp),min(ground,was + ramp),(was < ground));
if (floorAt > -REACH_INF) {
fw[fr + 4u] += (floorAt - fw[fr + 4u]) * state[fs + 52u];
}
let under = fw[fr + 4u] < floorAt;
if (fw[fr + 4u] <= floorAt) {
fw[fr + 4u] = floorAt;
sampleNormalToFrame(fr);
fw[fr + 1u] = 1.0;
if (under) {
return false;
}
}
if (share == 0.0) {
state[fs + 47u] = 0.0;
state[fs + 18u] = was;
fw[fr] = 0.0;
fw[fr + 1u] = 0.0;
frameTarget(fr,animX,animY,animZ);
frameNormal(fr,0.0,1.0,0.0);
return true;
}
return false;
}
fn startCarriedStep(st: u32,fr: u32,fs: u32) {
let legLen = fw[fr + 45u];
let vx = state[st + 20u];
let vz = state[st + 21u];
let speed = sqrt(vx * vx + vz * vz);
let walk = FOOT_CARRIED_STEP_SECONDS * sqrt(legLen);
var pace = walk;
if (speed > 0.0) {
pace = FOOT_CARRIED_STEP_TRAIL * (1.0 + FOOT_CARRIED_STEP_LEAD) * legLen / (2.0 * speed);
}
state[fs + 37u] = 1.0;
state[fs + 38u] = 0.0;
state[fs + 39u] = select(walk,pace,((pace < walk) && !on(state[fs + 34u])));
for (var k = 0u; k < 3u; k++) {
state[fs + 40u + k] = state[fs + 2u + k];
}
letGo(fs);
fw[fr + 86u] += 1.0;
}
fn releaseCarriedStep(fr: u32,fs: u32) {
state[fs + 37u] = 0.0;
state[fs + 12u] = 1.0;
state[fs + 13u] = 1.0;
state[fs + 14u] = 0.0;
state[fs + 5u] = fw[fr + 27u];
}
fn overClipPlane(st: u32,fr: u32) {
let x = fw[fr + 92u];
let y = fw[fr + 93u];
let z = fw[fr + 94u];
let animX = fw[fr + 39u];
let animZ = fw[fr + 41u];
fw[fr + 82u] = y - (fw[fr + 40u] + state[st + 15u] * (x - animX) + state[st + 16u] * (z - animZ));
}
fn stepCarriedFoot(st: u32,fr: u32,fs: u32,gnd: u32,carried: bool) -> bool {
if (!carried) {
return true;
}
let stepSeconds = state[fs + 39u];
var reached = 1.0;
if (stepSeconds > 0.0) {
reached = state[fs + 38u] + fw[fr + 22u] / stepSeconds;
}
let t = min(1.0,reached);
state[fs + 38u] = t;
let left = (1.0 - reached) * stepSeconds;
let vx = state[st + 20u];
let vz = state[st + 21u];
let speed = sqrt(vx * vx + vz * vz);
var leadSeconds = 0.0;
if (speed > 0.0) {
leadSeconds = min(FOOT_CARRIED_STEP_LEAD * FOOT_CARRIED_STEP_TRAIL * fw[fr + 45u] / speed,stepSeconds);
}
var carry = 1.0;
if (on(state[fs + 34u]) && (speed > 0.0)) {
carry = 1.0 + fw[fr + 85u] / speed;
}
let toX = fw[fr + 39u] + vx * (carry * left + leadSeconds);
let toZ = fw[fr + 41u] + vz * (carry * left + leadSeconds);
if (!sampleAt(gnd,fr,toX,toZ)) {
return true;
}
let wx = fw[fr + 24u];
let wz = fw[fr + 24u + 2u];
fw[fr + 18u] = fw[fr + 11u] - state[st + 14u] - (state[st + 15u] * (toX - wx) + state[st + 16u] * (toZ - wz));
stepFade(fr);
let fade = fw[fr + 18u];
if (fade <= 0.0) {
return true;
}
conformHeight(fr);
let toY = fw[fr + 11u] + fw[fr + 17u];
let ease = t * t * (3.0 - 2.0 * t);
let fromX = state[fs + 40u];
let fromY = state[fs + 41u];
let fromZ = state[fs + 42u];
frameTarget(fr,fromX + (toX - fromX) * ease,fromY + (toY - fromY) * ease + FOOT_CARRIED_STEP_LIFT * fw[fr + 45u] * sin(REACH_PI * t),fromZ + (toZ - fromZ) * ease);
sampleNormalToFrame(fr);
fw[fr] = fade;
for (var k = 0u; k < 3u; k++) {
state[fs + 2u + k] = fw[fr + 3u + k];
}
if (t >= 1.0) {
fw[fr + 1u] = 1.0;
fw[fr + 92u] = toX;
fw[fr + 93u] = toY;
fw[fr + 94u] = toZ;
overClipPlane(st,fr);
fw[fr + 2u] = fw[fr + 82u] * fade;
plantFoot(fr,fs);
}
return false;
}
fn trackAnchor(st: u32,fr: u32,fs: u32) {
conformHeight(fr);
let height = fw[fr + 17u];
fw[fr + 83u] = height;
sampleNormalToFrame(fr);
let anchorPlane = state[st + 15u] * (state[fs + 2u] - fw[fr + 24u]) + state[st + 16u] * (state[fs + 4u] - fw[fr + 24u + 2u]);
fw[fr + 18u] = fw[fr + 11u] - state[st + 14u] - anchorPlane;
if (fw[fr + 18u] > 0.0) {
stepFade(fr);
if (fw[fr + 18u] <= 0.0) {
return;
}
}
let anchorTarget = fw[fr + 11u] + height;
let maxTrack = anchorTrackOf(fr);
let trackDelta = anchorTarget - state[fs + 3u];
if (abs(trackDelta) <= maxTrack) {
state[fs + 3u] += trackDelta;
} else if (trackDelta > 0.0) {
state[fs + 3u] += maxTrack;
} else {
state[fs + 3u] -= maxTrack;
}
fw[fr + 18u] = state[fs + 3u] - height - state[st + 14u] - anchorPlane;
stepFade(fr);
}
fn anchorDrop(st: u32,fr: u32,fs: u32,carried: bool) {
if (carried) {
for (var k = 0u; k < 3u; k++) {
fw[fr + 92u + k] = state[fs + 2u + k];
}
overClipPlane(st,fr);
fw[fr + 81u] = fw[fr + 82u] * fw[fr + 80u];
} else {
fw[fr + 81u] = (state[fs + 3u] - fw[fr + 40u]) * fw[fr + 80u];
}
}
fn followClip(fr: u32,fs: u32) {
let c = fw[fr + 28u];
let s = fw[fr + 29u];
let clipX = fw[fr + 42u];
let clipZ = fw[fr + 43u];
let dx = clipX - fw[fr + 24u];
let dz = clipZ - fw[fr + 24u + 2u];
let localX = dx * c - dz * s - state[fs + 8u];
let localZ = dx * s + dz * c - state[fs + 9u];
let stepX = localX * c + localZ * s;
let stepZ = -localX * s + localZ * c;
let stepSq = stepX * stepX + stepZ * stepZ;
var share = 0.0;
if (stepSq > 0.0) {
share = max(0.0,min(1.0,((clipX - state[fs + 10u]) * stepX + (clipZ - state[fs + 11u]) * stepZ) / stepSq));
}
state[fs + 2u] = state[fs + 6u] + share * stepX;
state[fs + 4u] = state[fs + 7u] + share * stepZ;
}
fn nearestSteps(st: u32,fr: u32,inputs: u32,fs: u32) -> bool {
let feet = rows[inputs + 2u];
var nearest = 4294967295u;
var best = REACH_INF;
for (var j = 0u; j < feet; j++) {
let other = footSlotAt(st,inputs,rows[footEntry(inputs,j) + 15u]);
if ((other == fs) || !on(state[other + 79u])) {
continue;
}
let dx = state[other + 62u] - fw[fr + 39u];
let dz = state[other + 64u] - fw[fr + 41u];
let d = dx * dx + dz * dz;
if (d < best) {
best = d;
nearest = other;
}
}
return (nearest != 4294967295u) && on(state[nearest + 37u]);
}
fn trailsClip(st: u32,fr: u32,fs: u32) -> bool {
let plantGate = gate(fr,GATE_PLANT_SPEED);
let vx = state[st + 20u];
let vz = state[st + 21u];
var share = 1.0;
var dx = state[fs + 2u] - fw[fr + 39u];
var dz = state[fs + 4u] - fw[fr + 41u];
if (vx * vx + vz * vz < plantGate * plantGate) {
share = FOOT_CARRIED_SETTLE;
let ox = fw[fr + 39u] - fw[fr + 24u];
let oz = fw[fr + 41u] - fw[fr + 24u + 2u];
let localX = ox * fw[fr + 28u] - oz * fw[fr + 29u];
let localZ = ox * fw[fr + 29u] + oz * fw[fr + 28u];
let c = cos(state[fs + 5u]);
let s = sin(state[fs + 5u]);
dx = state[fs + 2u] - (fw[fr + 24u] + localX * c + localZ * s);
dz = state[fs + 4u] - (fw[fr + 24u + 2u] - localX * s + localZ * c);
}
if (share == 1.0) {
let lead = (dx * vx + dz * vz) / (vx * vx + vz * vz);
if (lead > 0.0) {
dx -= lead * vx;
dz -= lead * vz;
}
}
let trail = FOOT_CARRIED_STEP_TRAIL * fw[fr + 45u] * share;
return dx * dx + dz * dz > trail * trail;
}
fn anchorBeyondReach(st: u32,fr: u32,fs: u32) -> bool {
let animX = fw[fr + 39u];
let animY = fw[fr + 40u];
let animZ = fw[fr + 41u];
let hipX = fw[fr + 73u];
let hipY = fw[fr + 74u];
let hipZ = fw[fr + 75u];
let footHeight = fw[fr + 83u];
let commanded = fw[fr + 84u];
let legLen = fw[fr + 45u];
let referenceY = state[st + 14u];
let centreY = min(referenceY + (hipY - fw[fr + 24u + 1u]),referenceY + fw[fr + 76u] + HIP_HEIGHT_FRACTION * (legLen + footHeight));
let accommodated = max(-FOOT_PELVIS_DROP_MAX * fw[fr + 57u],min(state[st + 7u],commanded));
let rootY = centreY + accommodated;
let ax = state[fs + 2u] - hipX;
let ay = state[fs + 3u] - rootY;
let az = state[fs + 4u] - hipZ;
let anchorDistance = sqrt(ax * ax + ay * ay + az * az);
if (anchorDistance <= FOOT_STRETCH_RELEASE * legLen) {
return false;
}
let cx = animX - hipX;
let cy = animY - centreY;
let cz = animZ - hipZ;
return anchorDistance > sqrt(cx * cx + cy * cy + cz * cz) + gate(fr,GATE_STRETCH_MARGIN);
}
fn noteFloorUnderClip(st: u32,fr: u32,gnd: u32) {
if (!sampleAt(gnd,fr,fw[fr + 39u],fw[fr + 41u])) {
return;
}
fw[fr + 18u] = fw[fr + 11u] - state[st + 14u] - fw[fr + 48u];
stepFade(fr);
if (!(fw[fr + 18u] > 0.0)) {
return;
}
conformHeight(fr);
fw[fr + 9u] = fw[fr + 11u] + fw[fr + 17u];
fw[fr + 10u] = fw[fr + 18u];
}
fn lockedFootSteps(st: u32,fr: u32,fs: u32,gnd: u32,inputs: u32,carried: bool) -> bool {
if (!on(state[fs + 13u]) && !on(state[fs + 34u])) {
followClip(fr,fs);
}
fw[fr + 80u] = 1.0;
if (!sampleAt(gnd,fr,state[fs + 2u],state[fs + 4u])) {
state[fs + 13u] = 1.0;
return false;
}
trackAnchor(st,fr,fs);
let height = fw[fr + 83u];
fw[fr + 80u] = fw[fr + 18u];
if (on(state[fs + 13u])) {
return false;
}
fw[fr + 83u] = height;
anchorDrop(st,fr,fs,carried);
fw[fr + 84u] = fw[fr + 81u];
let stretched = anchorBeyondReach(st,fr,fs);
if (carried && (stretched || (((!on(state[fs + 34u]) && (fw[fr + 86u] < fw[fr + 87u])) && trailsClip(st,fr,fs)) && !nearestSteps(st,fr,inputs,fs)))) {
return true;
}
if ((stretched || twistedPast(fr,fs)) || (fw[fr + 40u] - fw[fr + 24u + 1u] - fw[fr + 48u] - height + state[fs + 82u] > gate(fr,GATE_CONFORM_LIFT) + gate(fr,GATE_SWING_RELEASE_LIFT))) {
state[fs + 13u] = 1.0;
}
return false;
}
fn lockedFootTarget(st: u32,fr: u32,fs: u32,gnd: u32,carried: bool) {
let animX = fw[fr + 39u];
let animY = fw[fr + 40u];
let animZ = fw[fr + 41u];
if (on(state[fs + 13u])) {
if (!on(state[fs + 14u])) {
state[fs + 14u] = 1.0;
holdTwist(fr,fs,gnd);
state[fs + 15u] = state[fs + 2u] - animX;
state[fs + 16u] = state[fs + 3u] - animY;
state[fs + 17u] = state[fs + 4u] - animZ;
}
frameTarget(fr,animX + state[fs + 15u],animY + state[fs + 16u],animZ + state[fs + 17u]);
noteFloorUnderClip(st,fr,gnd);
return;
}
frameTarget(fr,state[fs + 2u],state[fs + 3u],state[fs + 4u]);
let fade = fw[fr + 80u];
if (fade <= 0.0) {
state[fs + 13u] = 1.0;
return;
}
fw[fr] = fade;
fw[fr + 1u] = 1.0;
anchorDrop(st,fr,fs,carried);
fw[fr + 2u] = fw[fr + 81u];
fw[fr + 9u] = state[fs + 3u];
fw[fr + 10u] = fade;
}
`,`fn footHeldModes(st: u32,fr: u32,fs: u32,gnd: u32,inputs: u32,held: bool) {
var mode = FOOT_MODE_LOCK;
if (on(state[fs + 37u])) {
mode = FOOT_MODE_STEP;
}
var carried = held;
for (var turn = 0u; turn < 4u; turn++) {
if (mode == FOOT_MODE_STEP) {
if (!stepCarriedFoot(st,fr,fs,gnd,carried)) {
return;
}
releaseCarriedStep(fr,fs);
carried = false;
mode = FOOT_MODE_LOCK;
} else {
if (!lockedFootSteps(st,fr,fs,gnd,inputs,carried)) {
lockedFootTarget(st,fr,fs,gnd,carried);
return;
}
startCarriedStep(st,fr,fs);
carried = true;
mode = FOOT_MODE_STEP;
}
}
}
fn footFreeModes(st: u32,fr: u32,fs: u32,gnd: u32) {
if (on(state[fs + 47u]) && !evalHandedFoot(st,fr,fs,gnd)) {
return;
}
evalFreeFoot(st,fr,fs,gnd);
}
fn evalFreeFoot(st: u32,fr: u32,fs: u32,gnd: u32) {
let animY = fw[fr + 40u];
if (!sampleAt(gnd,fr,fw[fr + 39u],fw[fr + 41u])) {
state[fs + 35u] = 0.0;
return;
}
let wrapperDeficit = fw[fr + 11u] - state[st + 14u] - fw[fr + 48u];
fw[fr + 18u] = wrapperDeficit;
stepFade(fr);
let fade = fw[fr + 18u];
if (fade <= 0.0) {
state[fs + 35u] = 0.0;
return;
}
conformHeight(fr);
let height = fw[fr + 17u];
fw[fr + 4u] = fw[fr + 11u] + height;
fw[fr + 9u] = fw[fr + 4u];
fw[fr + 10u] = fade;
sampleNormalToFrame(fr);
let clipLift = animY - fw[fr + 24u + 1u] - fw[fr + 48u] - height + state[fs + 82u];
if (on(state[fs + 35u])) {
state[fs + 35u] = select01((clipLift <= gate(fr,GATE_CONFORM_LIFT) + gate(fr,GATE_SWING_RELEASE_LIFT)));
} else {
state[fs + 35u] = select01((clipLift <= gate(fr,GATE_CONFORM_LIFT)));
}
if (on(state[fs + 35u])) {
fw[fr] = fade;
fw[fr + 1u] = 1.0;
if (fw[fr + 44u] < gate(fr,GATE_PLANT_SPEED)) {
fw[fr + 2u] = (fw[fr + 11u] + height - animY) * fade;
} else {
fw[fr + 2u] = wrapperDeficit * fade;
}
}
}
fn updateFootHeld(st: u32,fr: u32,fs: u32,gnd: u32,inputs: u32) {
if (on(state[fs + 43u])) {
takeHandedFoot(st,fr,fs,gnd);
}
let dt = fw[fr + 22u];
let speed = state[fs + 25u];
let clipSpeed = state[fs + 26u];
fw[fr] = 0.0;
fw[fr + 1u] = 0.0;
fw[fr + 2u] = REACH_INF;
frameTarget(fr,fw[fr + 39u],fw[fr + 40u],fw[fr + 41u]);
frameNormal(fr,0.0,1.0,0.0);
fw[fr + 9u] = -REACH_INF;
fw[fr + 10u] = 0.0;
let plantGate = gate(fr,GATE_PLANT_SPEED);
let carried = (((clipSpeed < plantGate) && (fw[fr + 45u] > 0.0)) && (gnd != 4294967295u)) && !groundMoves(gnd);
if (clipSpeed < plantGate) {
state[fs + 36u] += dt;
} else {
state[fs + 36u] = 0.0;
}
trackStride(st,fr,fs);
let locked = on(state[fs + 12u]);
if ((((locked && !on(state[fs + 13u])) && !on(state[fs + 37u])) && !carried) && outrunsStride(fr,fs,gnd)) {
state[fs + 34u] = 1.0;
}
let held = carried || on(state[fs + 34u]);
if (((on(state[fs + 12u]) && !on(state[fs + 13u])) && (speed > gate(fr,GATE_SWING_RELEASE_SPEED))) && !held) {
state[fs + 13u] = 1.0;
}
fw[fr + 44u] = speed;
state[fs + 80u] = select01(carried);
let free = !on(state[fs + 37u]) && !on(state[fs + 12u]);
state[fs + 81u] = select01(free);
if (!free) {
footHeldModes(st,fr,fs,gnd,inputs,held);
}
}
fn updateFootFree(st: u32,fr: u32,fs: u32,gnd: u32) {
if (on(state[fs + 81u])) {
footFreeModes(st,fr,fs,gnd);
}
let dt = fw[fr + 22u];
let speed = state[fs + 25u];
let clipSpeed = state[fs + 26u];
let plantGate = gate(fr,GATE_PLANT_SPEED);
let carried = on(state[fs + 80u]);
let step = rampOf(dt);
let desired = fw[fr];
let weight = state[fs + 18u];
state[fs + 18u] = select(max(desired,weight - step),min(desired,weight + step),(weight < desired));
if (on(state[fs + 13u]) && (state[fs + 18u] <= RELEASE_DONE_WEIGHT)) {
letGo(fs);
}
let owns = on(fw[fr + 1u]);
let free = (((!on(state[fs + 12u]) && !on(state[fs + 37u])) && owns) && (desired >= 1.0)) && (state[fs + 18u] > FOOT_PLANT_WEIGHT);
if ((free && (clipSpeed < plantGate)) && ((speed < plantGate) || (carried && (state[fs + 36u] >= FOOT_CARRIED_PLANT_STILL * sqrt(fw[fr + 45u]))))) {
plantFoot(fr,fs);
} else if ((free && (speed >= plantGate)) && outrunsStride(fr,fs,gnd)) {
plantFoot(fr,fs);
state[fs + 34u] = 1.0;
}
for (var k = 0u; k < 6u; k++) {
state[fs + 56u + k] = fw[fr + 3u + k];
}
state[fs + 53u] = fw[fr + 9u];
state[fs + 54u] = fw[fr + 10u];
state[fs + 55u] = state[fs + 18u];
}
fn holdOverFloor(st: u32,inputs: u32) {
let feet = rows[inputs + 2u];
for (var i = 0u; i < feet; i++) {
let fs = footSlot(st,inputs,i);
if (!on(state[fs + 79u])) {
continue;
}
let floorAt = state[fs + 53u];
if (!(floorAt > -REACH_INF)) {
continue;
}
let row = state[fs + 75u];
if (!(row > 0.0)) {
continue;
}
let posed = state[fs + 63u] + state[st + 7u];
if (posed >= floorAt) {
continue;
}
if (state[fs + 57u] < floorAt) {
state[fs + 57u] = floorAt;
}
let least = (floorAt - posed) / (state[fs + 57u] - posed) * state[fs + 54u];
let kept = state[fs + 18u];
if (kept >= least) {
continue;
}
if (on(state[fs + 14u])) {
for (var k = 0u; k < 3u; k += 2u) {
state[fs + 15u + k] *= kept / least;
state[fs + 56u + k] = state[fs + 83u + 39u + k] + state[fs + 15u + k];
}
}
state[fs + 18u] = least;
state[fs + 55u] = least * min(row,1.0);
}
}
fn groundFootHeld(st: u32,fr: u32,fs: u32,gnd: u32,inputs: u32) {
readFootIn(st,fr,fs);
updateFootHeld(st,fr,fs,gnd,inputs);
}
fn groundFootFree(st: u32,fr: u32,fs: u32,gnd: u32) {
updateFootFree(st,fr,fs,gnd);
let seat = state[st + 9u];
if ((seat > 0.0) && (state[fs + 57u] < state[fs + 63u])) {
state[fs + 55u] *= 1.0 - seat;
}
let row = state[fs + 75u];
if (row < 1.0) {
state[fs + 55u] *= select(0.0,row,(row > 0.0));
if ((row > 0.0) && (fw[fr + 2u] < REACH_INF)) {
fw[fr + 2u] *= row;
}
}
}
fn footDeficit(fs: u32) -> f32 {
var deficit = REACH_INF;
if (!(state[fs + 75u] <= 0.0)) {
deficit = state[fs + 83u + 2u];
}
return deficit;
}
fn landFootGrounding(st: u32,fr: u32,inputs: u32) {
let feet = rows[inputs + 2u];
var minDeficit = REACH_INF;
for (var i = 0u; i < feet; i++) {
let fs = footSlot(st,inputs,i);
if (on(state[fs + 79u])) {
minDeficit = min(minDeficit,footDeficit(fs));
}
}
let dt = fw[fr + 22u];
if (minDeficit >= REACH_INF) {
state[st + 8u] = 0.0;
} else {
let most = FOOT_PELVIS_DROP_MAX * fw[fr + 57u];
state[st + 8u] = max(-most,min(most * state[st + 31u],minDeficit)) * (1.0 - state[st + 9u]) * pelvisShare(st);
}
let was = state[st + 7u];
state[st + 7u] += (state[st + 8u] - was) * easeOf(dt);
if (rows[524u] != 0u) {
let home = was * pelvisHomeOf(st,dt);
if ((state[st + 7u] - home) * was >= 0.0) {
state[st + 7u] = home;
}
}
holdOverFloor(st,inputs);
}
`,`fn pelvisHomeOf(st: u32,dt: f32) -> f32 {
let before = min(1.0,max(0.0,1.0 - 2.0 * max(0.0,state[st + 28u] - levelRampOf(dt))));
let home = select(0.0,pelvisShare(st) / before,(before > 0.0));
return home;
}
fn pelvisShare(st: u32) -> f32 {
return min(1.0,max(0.0,1.0 - 2.0 * state[st + 28u]));
}
fn anchorTrackOf(fr: u32) -> f32 {
if (restStep()) {
return REACH_INF;
}
return FOOT_ANCHOR_TRACK_SPEED * fw[fr + 57u] * fw[fr + 22u];
}
`,`fn intoFrame(model: u32,n: u32,parent: u32,p: vec3f) -> vec3f {
let m = nodeWorld(model,n,parent);
let a = m[0u];
let b = m[1u];
let c = m[2u];
let t = m[3u];
let v = vec3f(p.x - t.x,p.y - t.y,p.z - t.z);
let r0 = cross(vec3f(b.x,b.y,b.z),vec3f(c.x,c.y,c.z));
let r1 = cross(vec3f(c.x,c.y,c.z),vec3f(a.x,a.y,a.z));
let r2 = cross(vec3f(a.x,a.y,a.z),vec3f(b.x,b.y,b.z));
let det = a.x * r0.x + a.y * r0.y + a.z * r0.z;
if (det == 0.0) {
return v;
}
return vec3f(dot(r0,v) / det,dot(r1,v) / det,dot(r2,v) / det);
}
fn applyPelvisOffset(rig: u32,pose: u32,model: u32,n: u32,st: u32,fr: u32,drop: u32) -> bool {
let offset = state[st + 7u] - fw[fr + 58u];
let moves = abs(offset) > REACH_PELVIS_EPSILON;
if (moves) {
let world = nodePos(model,n,drop);
let local = intoFrame(model,n,parentNode(rig,drop),world + dirOut(fr,vec3f(0.0,offset,0.0)));
let p = pose + drop * 10u;
scratch[p] = local.x;
scratch[p + 1u] = local.y;
scratch[p + 2u] = local.z;
}
return moves;
}
`,`fn landGroundFeet(rig: u32,pose: u32,model: u32,n: u32,st: u32,fr: u32,inputs: u32) -> bool {
landFootGrounding(st,fr,inputs);
putFrame3(fr + 70u,vNormalize(dirOut(fr,vec3f(-state[st + 15u],1.0,-state[st + 16u]))));
let drop = rows[inputs + 8u];
var moved = false;
if (drop != 4294967295u) {
moved = applyPelvisOffset(rig,pose,model,n,st,fr,drop);
}
return moved;
}
`,`fn grounds() -> bool {
let fr = 0u;
return (fw[fr + 96u] != REACH_PHASE_DONE) && on(fw[fr + 101u]);
}
fn reach_land(row: u32) {
let st = passWord(row,0u,1u);
let fr = 0u;
let inputs = passWord(row,0u,0u);
let rig = rows[row];
let n = bake[rig];
let pose = rows[row + 1u];
let model = pose + n * 10u;
var moved = 0u;
if (landGroundFeet(rig,pose,model,n,st,fr,inputs)) {
let at = model + rows[inputs + 8u] * 16u + 12u;
let was = vec3f(scratch[at],scratch[at + 1u],scratch[at + 2u]);
composeWorldNode(rig,pose,model,rows[inputs + 8u]);
let move_ = vec3f(scratch[at],scratch[at + 1u],scratch[at + 2u]) - was;
let r = model + n * 16u;
wgDropMove = vec4f(move_.x,move_.y,move_.z,0.0);
wgDropMoveWorld = vec4f(scratch[r] * move_.x + scratch[r + 4u] * move_.y + scratch[r + 8u] * move_.z,scratch[r + 1u] * move_.x + scratch[r + 5u] * move_.y + scratch[r + 9u] * move_.z,scratch[r + 2u] * move_.x + scratch[r + 6u] * move_.y + scratch[r + 10u] * move_.z,0.0);
moved = 1u;
}
wgDropMoved = moved;
fw[fr + 95u] = 1.0;
}
fn reachFeetStage(row: u32,tid: u32) {
if (tid != 0u) {
return;
}
let st = passWord(row,0u,1u);
let fr = 0u;
let inputs = passWord(row,0u,0u);
let gnd = groundOf(inputs);
let feet = rows[inputs + 2u];
for (var i = 0u; i < feet; i++) {
let fs = footSlot(st,inputs,i);
if (on(state[fs + 79u])) {
groundFootHeld(st,fr,fs,gnd,inputs);
storeFrame(fr,fs + 83u,55u,0u,1u);
}
}
}
fn reachLandStage(row: u32,tid: u32) {
let st = passWord(row,0u,1u);
let inputs = passWord(row,0u,0u);
let gnd = groundOf(inputs);
let feet = rows[inputs + 2u];
let fr = 116u + tid * 55u;
for (var i = tid; i < feet; i += WG) {
let fs = footSlot(st,inputs,i);
if (on(state[fs + 79u])) {
loadFrame(fs + 83u,fr,55u,0u,1u);
groundFootFree(st,fr,fs,gnd);
storeFrame(fr,fs + 83u,55u,0u,1u);
}
}
storageBarrier();
workgroupBarrier();
if (tid == 0u) {
reach_land(row);
}
storageBarrier();
if (workgroupUniformLoad(&wgDropMoved) != 0u) {
let rig = rows[row];
shiftUnder(rig,rows[row + 1u] + bake[rig] * 10u,rows[inputs + 8u],wgDropMove,wgDropMoveWorld,tid);
}
}
`,`@compute @workgroup_size(WG)
fn reach_ground_main(@builtin(workgroup_id) lume_wid: vec3u,@builtin(num_workgroups) lume_groups: vec3u,@builtin(local_invocation_index) tid: u32) {
let index: u32 = lume_wid.x + lume_wid.y * lume_groups.x;
let body = reachRow(index);
if (body != 4294967295u) {
loadFrame(stateFrame(body),0u,116u,tid,WG);
}
workgroupBarrier();
if (tid == 0u) {
var feet = 4294967295u;
if ((body != 4294967295u) && grounds()) {
feet = body;
}
wgReachRow = feet;
}
let row = workgroupUniformLoad(&wgReachRow);
if (row == 4294967295u) {
return;
}
reachFeetStage(row,tid);
storageBarrier();
workgroupBarrier();
reachLandStage(row,tid);
storeFrame(0u,stateFrame(row),116u,tid,WG);
}
`,`fn recomposeWorldSubtree(rig: u32,pose: u32,model: u32,node: u32,held: u32) {
let preorder = rig + bake[rig + 6u];
let subtree = rig + bake[rig + 7u];
let order = rig + bake[rig + 9u];
let pre = bake[preorder + node];
let end = pre + bake[subtree + node];
var heldAt = NONE;
if (held != NONE) {
heldAt = bake[preorder + held];
}
for (var i = pre; i < end; i++) {
let at = bake[order + i];
if (((heldAt != NONE) && (i <= heldAt)) && (heldAt < i + bake[subtree + at])) {
continue;
}
composeWorldNode(rig,pose,model,at);
}
}
`,`fn nodeTurn(model: u32,n: u32,node: u32) -> vec4f {
return matTurn(worldAt(model,n,node));
}
`,`fn qNormalize(q: vec4f) -> vec4f {
let len = sqrt(dot(q,q));
if (len < 1e-12) {
return vec4f(0.0,0.0,0.0,1.0);
}
return vec4f(q.x / len,q.y / len,q.z / len,q.w / len);
}
`,`fn qSlerp(a: vec4f,b: vec4f,t: f32) -> vec4f {
if (t <= 0.0) {
return a;
}
if (t >= 1.0) {
return b;
}
var c = dot(a,b);
var bb = b;
if (c < 0.0) {
c = -c;
bb = -b;
}
var w1 = 1.0 - t;
var w2 = t;
if (!(1.0 - c < 0.00001)) {
let theta = acos(min(1.0,c));
let s = sin(theta);
w1 = sin((1.0 - t) * theta) / s;
w2 = sin(t * theta) / s;
}
return qNormalize(a * w1 + bb * w2);
}
`,`fn qFromUnit(f: vec3f,t: vec3f) -> vec4f {
let r = dot(f,t) + 1.0;
if (r < 1e-8) {
if (abs(f.x) > abs(f.z)) {
return qNormalize(vec4f(-f.y,f.x,0.0,0.0));
}
return qNormalize(vec4f(0.0,-f.z,f.y,0.0));
}
let c = cross(f,t);
return qNormalize(vec4f(c.x,c.y,c.z,r));
}
`,`fn lenSq(v: vec3f) -> f32 {
return dot(v,v);
}
`,`fn setLocalTurn(rig: u32,pose: u32,model: u32,node: u32,q: vec4f) {
putQ(pose + node * 10u,q);
composeWorldNode(rig,pose,model,node);
}
`,`fn swingJoint(rig: u32,pose: u32,model: u32,n: u32,node: u32,swing: vec4f,weight: f32) {
var world = vec4f(0.0,0.0,0.0,1.0);
var frame = world;
for (var k = 0u; k < 2u; k++) {
let q = nodeTurn(model,n,select(node,parentNode(rig,node),(k == 1u)));
if (k == 0u) {
world = q;
} else {
frame = q;
}
}
swingFrom(rig,pose,model,node,swing,weight,world,frame);
}
`,`fn swingFrom(rig: u32,pose: u32,model: u32,node: u32,swing: vec4f,weight: f32,world: vec4f,frame: vec4f) {
let solved = quatMul(swing,world);
var local = quatMul(qConj(frame),solved);
if (weight < 1.0) {
local = qSlerp(poseQ(pose + node * 10u),local,weight);
}
setLocalTurn(rig,pose,model,node,local);
}
`,`fn alignFoot(rig: u32,pose: u32,model: u32,n: u32,foot: u32,normalIn: vec3f,weight: f32,maxTilt: f32,up: vec3f) {
if ((weight <= 0.0) || (maxTilt <= 0.0)) {
return;
}
let normalLenSq = lenSq(normalIn);
if (normalLenSq < LIMB_DEGENERATE) {
return;
}
let normal = normalIn * (1.0 / sqrt(normalLenSq));
let tilt = acos(clamp(dot(normal,up),-1.0,1.0));
if (tilt < 1e-7) {
return;
}
var swing = qFromUnit(up,normal);
if (tilt > maxTilt) {
swing = qSlerp(vec4f(0.0,0.0,0.0,1.0),swing,maxTilt / tilt);
}
swingJoint(rig,pose,model,n,foot,swing,weight);
recomposeWorldSubtree(rig,pose,model,foot,foot);
}
`,`fn poleSlotAt(st: u32,slot: u32,serial: u32) -> u32 {
if (slot == 4294967295u) {
return 4294967295u;
}
let at = st + 241u + slot * 12u;
if (state[at] != f32(serial)) {
state[at] = f32(serial);
state[at + 1u] = 0.0;
}
return at;
}
`,`fn pointOut(fr: u32,x: vec3f) -> vec3f {
var out = x;
if (on(fw[fr + 104u])) {
out = frame3(fr + 109u) + quatRotate(frame4(fr + 105u),x);
}
return out;
}
`,`fn chainPole(st: u32,chain: u32) -> u32 {
return poleSlotAt(st,rows[chain + 5u],rows[chain + 6u]);
}
fn wrapperTurn(fr: u32) -> vec4f {
return vec4f(fw[fr + 60u],fw[fr + 60u + 1u],fw[fr + 60u + 2u],fw[fr + 60u + 3u]);
}
fn poleHint(fr: u32,behind: bool) -> vec3f {
var front = frame3(fr + 67u);
if (behind) {
front = front * -1.0;
}
return quatRotate(wrapperTurn(fr),front);
}
`,`fn reachOn(st: u32,inputs: u32,bone: u32) -> u32 {
let effectors = rows[inputs];
for (var i = 0u; i < effectors; i++) {
let e = effectorEntry(inputs,i);
let flags = rows[e];
if (((rows[e + 1u] != bone) || ((flags & 1u) != 0u)) || ((flags & 64u) != 0u)) {
continue;
}
if (on(state[effectorSlotAt(st,inputs,rows[e + 41u]) + 10u])) {
return e;
}
}
return 4294967295u;
}
fn footSlotOn(st: u32,inputs: u32,bone: u32) -> u32 {
let feet = rows[inputs + 2u];
for (var i = 0u; i < feet; i++) {
let f = footEntry(inputs,i);
let fs = footSlotAt(st,inputs,rows[f + 15u]);
if (on(state[fs + 79u]) && (rows[f] == bone)) {
return fs;
}
}
return 4294967295u;
}
`,`fn putWord(o: u32,v: u32) {
if (v == 4294967295u) {
state[o] = -1.0;
} else {
state[o] = f32(v);
}
}
`,`fn word(o: u32) -> u32 {
let f = state[o];
if (f < 0.0) {
return 4294967295u;
}
return u32(f);
}
`,`fn limbJob(st: u32,fr: u32,jb: u32,chain: u32,target_: vec3f,hint: vec3f,weight: f32) {
state[jb] = REACH_JOB_LIMB;
putWord(jb + 1u,rows[chain]);
putWord(jb + 2u,rows[chain + 1u]);
putWord(jb + 3u,rows[chain + 2u]);
state[jb + 4u] = f32(rows[chain + 3u]);
putWord(jb + 5u,rows[chain + 4u]);
let pole = chainPole(st,chain);
if (pole == 4294967295u) {
putWord(jb + 6u,4294967295u);
} else {
putWord(jb + 6u,pole - st);
}
putState3(jb + 7u,target_);
state[jb + 10u] = 1.0;
putState3(jb + 11u,hint);
state[jb + 14u] = weight;
state[jb + 15u] = fw[fr + 22u];
state[jb + 16u] = 0.0;
state[jb + 20u] = 0.0;
}
`,`fn limbJobEnds(st: u32,flags: u32,pole: vec3f,rot: vec4f) {
let jb = jobOf(st);
state[jb + 16u] = f32(flag01(((flags & 16u) != 0u)));
putState3(jb + 17u,pole);
state[jb + 20u] = f32(flag01(((flags & 32u) != 0u)));
putState4(jb + 21u,rot);
}
`,`fn alignJob(fr: u32,jb: u32,foot: u32,normal: vec3f,weight: f32) {
state[jb] = REACH_JOB_ALIGN;
putWord(jb + 1u,foot);
putState3(jb + 7u,normal);
putState3(jb + 11u,frame3(fr + 70u));
state[jb + 14u] = weight;
state[jb + 25u] = REACH_FOOT_MAX_TILT;
}
fn footNormal(fr: u32,fs: u32) -> vec3f {
return dirOut(fr,vec3f(state[fs + 59u],state[fs + 60u],state[fs + 61u]));
}
fn footTarget(fr: u32,fs: u32) -> vec3f {
return pointOut(fr,vec3f(state[fs + 56u],state[fs + 57u] + state[fs + 82u],state[fs + 58u]));
}
fn groundedFootJob(st: u32,fr: u32,jb: u32,f: u32,fs: u32,sub: f32) {
let weight = state[fs + 55u];
if (sub == 0.0) {
limbJob(st,fr,jb,f + 1u,footTarget(fr,fs),poleHint(fr,false),weight);
return;
}
alignJob(fr,jb,rows[f + 1u + 2u],footNormal(fr,fs),weight * footShare(st));
}
`,`fn effectorJob(st: u32,fr: u32,e: u32,weight: f32,target_: vec3f,pole: vec3f,rot: vec4f) -> bool {
let flags = rows[e];
if ((flags & 1u) != 0u) {
if ((flags & 128u) == 0u) {
return false;
}
let jb = jobOf(st);
state[jb] = REACH_JOB_LOOK;
putWord(jb + 1u,rows[e + 1u]);
putWord(jb + 2u,rows[e + 9u]);
putState3(jb + 11u,rf3(e + 10u));
putState3(jb + 7u,target_);
state[jb + 14u] = weight;
state[jb + 25u] = rf(e + 39u);
state[jb + 26u] = rf(e + 40u);
putState3(jb + 27u,frame3(fr + 67u));
return true;
}
if ((flags & 256u) == 0u) {
return false;
}
limbJob(st,fr,jobOf(st),e + 2u,target_,poleHint(fr,((flags & 2u) != 0u)),weight);
limbJobEnds(st,flags,pole,rot);
return true;
}
fn flag01(b: bool) -> u32 {
if (b) {
return 1u;
}
return 0u;
}
fn reachFromGroundJob(model: u32,n: u32,st: u32,fr: u32,inputs: u32,e: u32,es: u32,weight: f32) -> bool {
let flags = rows[e];
if (((((flags & 1u) != 0u) || ((flags & 256u) == 0u)) || !(rf(e + 37u) > 0.0)) || !on(fw[fr + 95u])) {
return false;
}
let fs = footSlotOn(st,inputs,rows[e + 1u]);
if (fs == 4294967295u) {
return false;
}
let ground = state[fs + 55u];
if (!(ground > REACH_EPSILON)) {
return false;
}
let chain = e + 2u;
let end = rows[chain + 2u];
let w = min(1.0,weight);
let s = nodePos(model,n,end);
let g = s + (footTarget(fr,fs) - s) * ground;
let x = g + (rf3(e + 13u) - g) * w;
state[es + 1u] = 1.0;
putState3(es + 2u,x);
limbJob(st,fr,jobOf(st),chain,x,poleHint(fr,((flags & 2u) != 0u)),1.0);
var rot = rf4(e + 30u);
if (((flags & 32u) != 0u) && (w < 1.0)) {
rot = qSlerp(nodeTurn(model,n,end),rot,w);
}
limbJobEnds(st,flags,rf3(e + 27u),rot);
return true;
}
fn groundHeldAlignJob(st: u32,fr: u32,inputs: u32,e: u32,weight: f32) {
let fs = footSlotOn(st,inputs,rows[e + 1u]);
alignJob(fr,jobOf(st),rows[e + 2u + 2u],footNormal(fr,fs),state[fs + 55u] * (1.0 - min(1.0,weight)));
}
fn turnsFrom(e: u32) -> u32 {
let flags = rows[e];
if ((flags & 1u) != 0u) {
if ((flags & 128u) == 0u) {
return 4294967295u;
}
if (rows[e + 9u] != 4294967295u) {
return rows[e + 9u];
}
return rows[e + 1u];
}
if ((flags & 256u) == 0u) {
return 4294967295u;
}
return rows[e + 2u];
}
fn standsUnder(rig: u32,joint: u32,bone: u32) -> bool {
for (var at = joint; at != 4294967295u; at = parentNode(rig,at)) {
if (at == bone) {
return true;
}
}
return false;
}
fn owedAt(st: u32,inputs: u32,e: u32) -> bool {
return on(state[effectorSlotAt(st,inputs,rows[e + 41u]) + 11u]);
}
fn nextRide(rig: u32,st: u32,inputs: u32) -> u32 {
let effectors = rows[inputs];
var first = 4294967295u;
for (var i = 0u; i < effectors; i++) {
let e = effectorEntry(inputs,i);
if (!owedAt(st,inputs,e)) {
continue;
}
if (first == 4294967295u) {
first = i;
}
let ride = rows[e + 16u];
var waits = false;
for (var o = 0u; (o < effectors) && !waits; o++) {
let other = effectorEntry(inputs,o);
if ((o != i) && owedAt(st,inputs,other)) {
let from_ = turnsFrom(other);
waits = (from_ != 4294967295u) && standsUnder(rig,ride,from_);
}
}
if (!waits) {
return i;
}
}
return first;
}
fn owedRides(st: u32,fr: u32,inputs: u32) {
let effectors = rows[inputs];
var owed = 0.0;
for (var i = 0u; i < effectors; i++) {
let e = effectorEntry(inputs,i);
let es = effectorSlotAt(st,inputs,rows[e + 41u]);
let due = (on(state[es + 10u]) && (rows[e + 16u] != 4294967295u)) && (state[es + 9u] >= REACH_EPSILON);
state[es + 11u] = select01(due);
if (due) {
owed += 1.0;
}
}
fw[fr + 100u] = owed;
}
fn rideJob(rig: u32,model: u32,n: u32,st: u32,fr: u32,inputs: u32) -> bool {
let e = effectorEntry(inputs,nextRide(rig,st,inputs));
let es = effectorSlotAt(st,inputs,rows[e + 41u]);
state[es + 11u] = 0.0;
fw[fr + 100u] -= 1.0;
let flags = rows[e];
var joint = rows[e + 16u];
var size = 1.0;
if ((flags & 512u) != 0u) {
joint = 4294967295u;
size = length(nodeWorld(model,n,4294967295u)[1u]);
}
let at = nodePos(model,n,joint);
let turn = nodeTurn(model,n,joint);
let target_ = at + quatRotate(turn,rf3(e + 17u) * size);
var rot = rf4(e + 30u);
if (((flags & 4u) != 0u) && ((flags & 32u) != 0u)) {
rot = quatMul(turn,rf4(e + 20u));
}
var pole = rf3(e + 27u);
if (((flags & 8u) != 0u) && ((flags & 16u) != 0u)) {
pole = at + quatRotate(turn,rf3(e + 24u) * size);
}
putState3(es + 6u,target_);
return effectorJob(st,fr,e,state[es + 9u],target_,pole,rot);
}
fn inSubtree(rig: u32,a: u32,b: u32) -> bool {
let preorder = rig + bake[rig + 6u];
let pa = bake[preorder + a];
let pb = bake[preorder + b];
return (pb <= pa) && (pa < pb + bake[rig + bake[rig + 7u] + b]);
}
fn legMeetsStood(rig: u32,st: u32,inputs: u32,first: u32,i: u32) -> bool {
let root = rows[footEntry(inputs,i) + 1u];
var meets = false;
for (var j = first; j < i; j++) {
let f = footEntry(inputs,j);
let other = rows[f + 1u];
if ((state[footSlotAt(st,inputs,rows[f + 15u]) + 138u] == REACH_JOB_LIMB) && (inSubtree(rig,root,other) || inSubtree(rig,other,root))) {
meets = true;
}
}
return meets;
}
fn feetPhaseJob(rig: u32,st: u32,fr: u32,inputs: u32) -> bool {
let feet = rows[inputs + 2u];
let first = u32(fw[fr + 97u]);
var stood = false;
var waits = 4294967295u;
if (on(fw[fr + 95u])) {
for (var i = first; (i < feet) && (waits == 4294967295u); i++) {
let f = footEntry(inputs,i);
let fs = footSlotAt(st,inputs,rows[f + 15u]);
if ((on(state[fs + 79u]) && (state[fs + 55u] > REACH_EPSILON)) && (reachOn(st,inputs,rows[f]) == 4294967295u)) {
if (stood && legMeetsStood(rig,st,inputs,first,i)) {
waits = i;
} else {
groundedFootJob(st,fr,fs + 138u,f,fs,0.0);
stood = true;
}
}
}
}
if (waits != 4294967295u) {
fw[fr + 97u] = f32(waits);
} else {
nextPhase(fr,REACH_PHASE_EFFECTORS);
}
return stood;
}
fn advanceTwo(fr: u32) {
if (fw[fr + 98u] == 0.0) {
fw[fr + 98u] = 1.0;
} else {
fw[fr + 98u] = 0.0;
fw[fr + 97u] += 1.0;
}
}
`,`fn effectorsPhaseJob(model: u32,n: u32,st: u32,fr: u32,inputs: u32) -> bool {
let i = u32(fw[fr + 97u]);
if (i >= rows[inputs]) {
nextPhase(fr,REACH_PHASE_FADING);
return false;
}
let e = effectorEntry(inputs,i);
let es = effectorSlotAt(st,inputs,rows[e + 41u]);
let w = state[es + 9u];
if (fw[fr + 98u] != 0.0) {
groundHeldAlignJob(st,fr,inputs,e,w);
advanceTwo(fr);
return true;
}
fw[fr + 97u] += 1.0;
if (!on(state[es + 10u])) {
return false;
}
state[es + 1u] = 0.0;
if (w < REACH_EPSILON) {
return false;
}
if (rows[e + 16u] != 4294967295u) {
fw[fr + 99u] = 1.0;
return false;
}
if (reachFromGroundJob(model,n,st,fr,inputs,e,es,w)) {
if (w < 1.0) {
fw[fr + 97u] -= 1.0;
fw[fr + 98u] = 1.0;
}
return true;
}
return effectorJob(st,fr,e,w,rf3(e + 13u),rf3(e + 27u),rf4(e + 30u));
}
fn fadingPhaseJob(st: u32,fr: u32,inputs: u32,acting: bool) -> bool {
let i = u32(fw[fr + 97u]);
if ((!acting || !on(fw[fr + 95u])) || (i >= rows[inputs + 2u])) {
nextPhase(fr,REACH_PHASE_RIDES);
return false;
}
let f = footEntry(inputs,i);
let fs = footSlotAt(st,inputs,rows[f + 15u]);
let reach = reachOn(st,inputs,rows[f]);
if ((((!on(state[fs + 79u]) || (state[fs + 55u] <= REACH_EPSILON)) || (reach == 4294967295u)) || (rf(reach + 37u) > 0.0)) || (rows[reach + 16u] != 4294967295u)) {
fw[fr + 97u] += 1.0;
return false;
}
groundedFootJob(st,fr,jobOf(st),f,fs,fw[fr + 98u]);
advanceTwo(fr);
return true;
}
fn ridesPhaseJob(rig: u32,model: u32,n: u32,st: u32,fr: u32,inputs: u32) -> bool {
if (!on(fw[fr + 99u])) {
nextPhase(fr,REACH_PHASE_DONE);
return false;
}
if (fw[fr + 98u] == 0.0) {
owedRides(st,fr,inputs);
fw[fr + 98u] = 1.0;
}
if (!(fw[fr + 100u] > 0.0)) {
nextPhase(fr,REACH_PHASE_DONE);
return false;
}
return rideJob(rig,model,n,st,fr,inputs);
}
fn nextReachJob(rig: u32,model: u32,n: u32,st: u32,fr: u32,inputs: u32,acting: bool) -> bool {
let phase = fw[fr + 96u];
if (phase == REACH_PHASE_FEET) {
return feetPhaseJob(rig,st,fr,inputs);
}
if (phase == REACH_PHASE_EFFECTORS) {
return effectorsPhaseJob(model,n,st,fr,inputs);
}
if (phase == REACH_PHASE_FADING) {
return fadingPhaseJob(st,fr,inputs,acting);
}
if (phase == REACH_PHASE_RIDES) {
return ridesPhaseJob(rig,model,n,st,fr,inputs);
}
return false;
}
`,`fn runAlignJob(rig: u32,pose: u32,model: u32,n: u32,jb: u32) {
alignFoot(rig,pose,model,n,word(jb + 1u),state3(jb + 7u),state[jb + 14u],state[jb + 25u],state3(jb + 11u));
state[jb] = REACH_JOB_NONE;
}
`,`fn reach_plan(row: u32) {
let st = passWord(row,0u,1u);
let fr = 0u;
let jb = jobOf(st);
let rig = rows[row];
let n = bake[rig];
let pose = rows[row + 1u];
let model = pose + n * 10u;
let inputs = passWord(row,0u,0u);
let acting = on(fw[fr + 102u]);
let steps = f32(4u * (rows[inputs + 2u] + rows[inputs]) + 8u);
loop {
if (!(fw[fr + 96u] != REACH_PHASE_DONE)) { break; }
if (fw[fr + 103u] >= steps) {
nextPhase(fr,REACH_PHASE_DONE);
return;
}
fw[fr + 103u] += 1.0;
if (nextReachJob(rig,model,n,st,fr,inputs,acting)) {
if (state[jb] != REACH_JOB_ALIGN) {
return;
}
runAlignJob(rig,pose,model,n,jb);
}
}
}
`,`@compute @workgroup_size(WG)
fn reach_plan_main(@builtin(workgroup_id) lume_wid: vec3u,@builtin(num_workgroups) lume_groups: vec3u,@builtin(local_invocation_index) tid: u32) {
let index: u32 = lume_wid.x + lume_wid.y * lume_groups.x;
let row = reachRow(index);
if ((tid == 0u) && (row != 4294967295u)) {
let fr = 0u;
loadFrame(stateFrame(row),fr,116u,0u,1u);
reach_plan(row);
if (fw[fr + 96u] != REACH_PHASE_DONE) {
fw[fr + 115u] += 1.0;
}
storeFrame(fr,stateFrame(row),116u,0u,1u);
}
}
`,`fn limbTurn(m: mat4x4f,model: u32,n: u32,node: u32) -> vec4f {
let o = worldAt(model,n,node);
let linear = mat3x3f(m[0u].x,m[0u].y,m[0u].z,m[1u].x,m[1u].y,m[1u].z,m[2u].x,m[2u].y,m[2u].z);
let w = linear * mat3x3f(worldBlock[o],worldBlock[o + 1u],worldBlock[o + 2u],worldBlock[o + 4u],worldBlock[o + 5u],worldBlock[o + 6u],worldBlock[o + 8u],worldBlock[o + 9u],worldBlock[o + 10u]);
return turnOfColumns(w[0u],w[1u],w[2u]);
}
`,`fn qAxisAngle(axis: vec3f,angle: f32) -> vec4f {
let s = sin(angle / 2.0);
return vec4f(axis.x * s,axis.y * s,axis.z * s,cos(angle / 2.0));
}
`,`fn reject(v: vec3f,axis: vec3f) -> vec3f {
return v - axis * dot(v,axis);
}
`,`fn bendTrust(sinBend: f32) -> f32 {
return clamp((sinBend - POLE_TRUST_MIN_SIN) / (POLE_TRUST_MAX_SIN - POLE_TRUST_MIN_SIN),0.0,1.0);
}
`,`fn signedAngle(a: vec3f,b: vec3f,axis: vec3f) -> f32 {
return atan2(dot(cross(a,b),axis),dot(a,b));
}
`,`fn bake3(o: u32) -> vec3f {
return vec3f(bf(o),bf(o + 1u),bf(o + 2u));
}
fn bake4(o: u32) -> vec4f {
return vec4f(bf(o),bf(o + 1u),bf(o + 2u),bf(o + 3u));
}
`,`fn planeCandidate(targetDir: vec3f,bendNormal: vec3f) -> vec4f {
let p = cross(targetDir,bendNormal);
if (lenSq(p) < LIMB_DEGENERATE) {
return vec4f(p.x,p.y,p.z,0.0);
}
let u = vNormalize(p);
return vec4f(u.x,u.y,u.z,1.0);
}
fn rememberedPole(poleAt: u32,word: u32,limbFrame: vec4f) -> vec3f {
let prev = state3(poleAt + word);
let written = state4(poleAt + 5u);
let carry = quatMul(limbFrame,qConj(written));
return quatRotate(carry,prev);
}
fn limitPoleTurn(prev: vec3f,pole: vec3f,targetDir: vec3f,most: f32) -> vec3f {
let turn = signedAngle(prev,pole,targetDir);
if ((most < 0.0) || !(abs(turn) > most)) {
return pole;
}
let clamped = clampAbs(turn,most);
let c2 = cross(targetDir,prev);
return vNormalize(prev * cos(clamped) + c2 * sin(clamped));
}
fn selectPole(poleAt: u32,upper: vec3f,rootToEnd: vec3f,targetDir: vec3f,limbFrame: vec4f,rootPos: vec3f,hasHint: bool,hint: vec3f,hasPole: bool,poleWorld: vec3f,leg: bool,isArm: bool,most: f32) -> vec3f {
let bendNormal = cross(upper,rootToEnd);
var valid = false;
if (poleAt != 4294967295u) {
valid = state[poleAt + 1u] > 0.5;
}
var pole = vec3f(0.0,0.0,0.0);
var given = false;
if (hasPole) {
pole = reject(poleWorld - rootPos,targetDir);
if (!(lenSq(pole) < LIMB_DEGENERATE)) {
pole = vNormalize(pole);
given = true;
}
}
if (!given) {
let picked = pickPoleCandidate(hasHint,hint,leg,bendNormal,upper,rootToEnd,targetDir);
pole = xyzOf(picked);
if (picked.w < 0.5) {
if (isArm && hasHint) {
pole = leanPoleToHint(hint,pole,bendNormal,upper,rootToEnd,targetDir);
}
if (valid) {
pole = holdPolePlane(poleAt,limbFrame,pole,bendNormal,upper,rootToEnd,targetDir,most);
}
}
}
if (poleAt != 4294967295u) {
putState3(poleAt + 2u,pole);
state[poleAt + 1u] = 1.0;
}
return pole;
}
fn pickPoleCandidate(hasHint: bool,hint: vec3f,leg: bool,bendNormal: vec3f,upper: vec3f,rootToEnd: vec3f,targetDir: vec3f) -> vec4f {
let bendSq = lenSq(bendNormal);
let plane = planeCandidate(targetDir,bendNormal);
let planar = (bendSq >= LIMB_DEGENERATE) && (plane.w > 0.5);
let floorSq = POLE_TRUST_MIN_SIN * POLE_TRUST_MIN_SIN * lenSq(upper) * lenSq(rootToEnd);
if (planar && ((!hasHint || !leg) || (bendSq >= floorSq))) {
return vec4f(plane.x,plane.y,plane.z,0.0);
}
if (hasHint) {
let p = reject(hint,targetDir);
if (lenSq(p) >= LIMB_DEGENERATE) {
let u = vNormalize(p);
return vec4f(u.x,u.y,u.z,select01(leg));
}
}
if (planar) {
return vec4f(plane.x,plane.y,plane.z,0.0);
}
var axis = vec3f(0.0,1.0,0.0);
if (abs(targetDir.x) < 0.9) {
axis = vec3f(1.0,0.0,0.0);
}
let u = vNormalize(reject(axis,targetDir));
return vec4f(u.x,u.y,u.z,0.0);
}
`,`fn bendSine(bendNormal: vec3f,upper: vec3f,rootToEnd: vec3f) -> f32 {
return length(bendNormal) / max(length(upper) * length(rootToEnd),1e-9);
}
fn leanPoleToHint(hint: vec3f,pole: vec3f,bendNormal: vec3f,upper: vec3f,rootToEnd: vec3f,targetDir: vec3f) -> vec3f {
let trust = bendTrust(bendSine(bendNormal,upper,rootToEnd));
if (trust >= 1.0) {
return pole;
}
var h = reject(hint,targetDir);
if (lenSq(h) < LIMB_DEGENERATE) {
return pole;
}
h = vNormalize(h);
let keep = 1.0 - trust;
let p = pole * trust + h * keep;
if (lenSq(p) < LIMB_DEGENERATE) {
return h;
}
return vNormalize(p);
}
fn holdPolePlane(poleAt: u32,limbFrame: vec4f,pole: vec3f,bendNormal: vec3f,upper: vec3f,rootToEnd: vec3f,targetDir: vec3f,most: f32) -> vec3f {
let sinBend = bendSine(bendNormal,upper,rootToEnd);
var prev = reject(rememberedPole(poleAt,2u,limbFrame),targetDir);
if (lenSq(prev) < LIMB_DEGENERATE) {
return pole;
}
prev = vNormalize(prev);
let trust = bendTrust(sinBend);
var p = pole;
if ((trust < 1.0) && !restStep()) {
let keep = 1.0 - trust;
p = pole * trust + prev * keep;
if (lenSq(p) < LIMB_DEGENERATE) {
p = prev;
} else {
p = vNormalize(p);
}
}
return limitPoleTurn(prev,p,targetDir,most);
}
fn armMiss(tmp: u32,swivel: f32) -> f32 {
let cosRoot = state[tmp + 30u];
let sinRoot = state[tmp + 31u];
let c = cos(swivel);
let s = sin(swivel);
let t = state3(tmp);
let pole = state3(tmp + 3u) * c + state3(tmp + 6u) * s;
let axis = t * cosRoot + pole * sinRoot;
let goal = t * sinRoot - pole * cosRoot;
let front = state3(tmp + 12u);
let down = state3(tmp + 9u);
var miss = max(0.0,-dot(axis,front) - SHOULDER_EXTENSION_SIN);
let raised = dot(down,axis);
let fade = clamp((raised + 1.0) / (HUMERUS_FADE_COS + 1.0),0.0,1.0);
if ((fade > 0.0) && (state[tmp + 32u] > POLE_TRUST_MIN_SIN)) {
let hung = swung(state3(tmp + 15u),down,axis,raised);
let turn = state[tmp + 35u] * signedAngle(hung,goal,axis);
miss += fade * past(turn,-SHOULDER_EXTERNAL,SHOULDER_INTERNAL);
}
if (state[tmp + 33u] > 0.5) {
miss += wristMiss(tmp,axis);
}
return miss;
}
fn wristMiss(tmp: u32,axis: vec3f) -> f32 {
let t = state3(tmp);
var f = t * state[tmp + 34u] - axis;
let len = length(f);
if (len * len < LIMB_DEGENERATE) {
return 0.0;
}
f = f * (1.0 / len);
let ha = state3(tmp + 18u);
let hp = state3(tmp + 21u);
let hr = state3(tmp + 24u);
let along = dot(f,ha);
let byPalm = dot(f,hp);
let byThumb = dot(f,hr);
let off = sqrt(byPalm * byPalm + byThumb * byThumb);
var miss = 0.0;
if (off > 1e-9) {
let towardPalm = -byPalm / off;
let towardThumb = -byThumb / off;
let bend = atan2(off,along);
if (bend > wristMost(towardPalm,towardThumb)) {
let edge = wristEdge(bend * towardPalm,bend * towardThumb);
miss = hypot(bend * towardPalm - edge.x,bend * towardThumb - edge.y);
}
}
let h = cross(axis,f);
let hinge = length(h);
if ((hinge < 0.000001) || (along < -1.0 + 0.000001)) {
return miss;
}
let sv = swung(state3(tmp + 27u),ha,f,along);
return miss + forearmPast(state[tmp + 61u],signedAngle(h,sv,f));
}
fn swung(v: vec3f,a: vec3f,b: vec3f,c: f32) -> vec3f {
let k = cross(a,b);
return v * c + cross(k,v) + k * (dot(k,v) / (1.0 + c));
}
fn forearmPast(halfTurn: f32,turn: f32) -> f32 {
return max(0.0,abs(wrapAngle(turn - 0.5 * halfTurn)) - FOREARM_TURN - 0.5 * abs(halfTurn));
}
fn past(x: f32,low: f32,high: f32) -> f32 {
return max(0.0,max(low - x,x - high));
}
`,`fn swivelOfStep(tmp: u32) -> f32 {
return state[tmp + 53u] * state[tmp + 52u] * (LIMB_PI / SWIVEL_STEPS);
}
fn swivelSide(tmp: u32,side: f32) {
state[tmp + 53u] = side;
state[tmp + 52u] = 1.0;
state[tmp + 47u] = SWIVEL_STEPPING;
state[tmp + 48u] = swivelOfStep(tmp);
}
fn swivelAdvance(tmp: u32) {
state[tmp + 52u] += 1.0;
if (state[tmp + 52u] > 2.0 * SWIVEL_STEPS) {
state[tmp + 47u] = SWIVEL_REFINE;
state[tmp + 56u] = 0.0;
state[tmp + 53u] = -1.0;
state[tmp + 57u] = LIMB_PI / SWIVEL_STEPS / 2.0;
state[tmp + 58u] = state[tmp + 49u];
state[tmp + 48u] = state[tmp + 58u] - state[tmp + 57u];
return;
}
state[tmp + 48u] = swivelOfStep(tmp);
}
fn swivelStepped(tmp: u32,miss: f32) {
if (miss > 0.0) {
if (miss < state[tmp + 50u]) {
state[tmp + 50u] = miss;
state[tmp + 49u] = state[tmp + 48u];
}
swivelAdvance(tmp);
return;
}
state[tmp + 54u] = state[tmp + 53u] * (state[tmp + 52u] - 1.0) * (LIMB_PI / SWIVEL_STEPS);
state[tmp + 55u] = state[tmp + 48u];
state[tmp + 56u] = 0.0;
state[tmp + 47u] = SWIVEL_EDGE;
state[tmp + 48u] = (state[tmp + 54u] + state[tmp + 55u]) / 2.0;
}
fn swivelHalved(tmp: u32,miss: f32) {
if (miss > 0.0) {
state[tmp + 54u] = state[tmp + 48u];
} else {
state[tmp + 55u] = state[tmp + 48u];
}
state[tmp + 56u] += 1.0;
if (state[tmp + 56u] < f32(SWIVEL_EDGE_STEPS)) {
state[tmp + 48u] = (state[tmp + 54u] + state[tmp + 55u]) / 2.0;
return;
}
let above = state[tmp + 53u] > 0.0;
state[tmp + 44u + u32(select01(above))] = state[tmp + 55u];
if (above) {
state[tmp + 51u] = 1.0;
state[tmp + 47u] = SWIVEL_DONE;
return;
}
swivelSide(tmp,1.0);
}
fn swivelRefined(tmp: u32,miss: f32) {
if (miss < state[tmp + 50u]) {
state[tmp + 50u] = miss;
state[tmp + 49u] = state[tmp + 48u];
}
state[tmp + 53u] += 2.0;
if (state[tmp + 53u] > 1.0) {
state[tmp + 53u] = -1.0;
state[tmp + 57u] = state[tmp + 57u] / 2.0;
state[tmp + 56u] += 1.0;
state[tmp + 58u] = state[tmp + 49u];
}
if (state[tmp + 56u] >= f32(SWIVEL_EDGE_STEPS)) {
state[tmp + 47u] = SWIVEL_DONE;
return;
}
state[tmp + 48u] = state[tmp + 58u] + state[tmp + 53u] * state[tmp + 57u];
}
fn swivelInsideRanges(arm: u32,tmp: u32,poleDir: vec3f,trunk: vec4f,folds: bool) -> vec3f {
let down = quatRotate(trunk,bake3(arm + 5u));
let front = quatRotate(trunk,bake3(arm + 8u));
putState3(tmp + 9u,down);
putState3(tmp + 12u,front);
putState3(tmp + 15u,vNormalize(reject(front,down)));
let swivel = cross(state3(tmp),poleDir);
putState3(tmp + 6u,swivel);
putState3(tmp + 3u,poleDir);
state[tmp + 35u] = bf(arm + 1u);
state[tmp + 47u] = SWIVEL_FIRST;
state[tmp + 48u] = 0.0;
state[tmp + 49u] = 0.0;
state[tmp + 51u] = 0.0;
for (var evaluation = 0u; (evaluation < SWIVEL_EVALUATIONS) && (state[tmp + 47u] != SWIVEL_DONE); evaluation++) {
let miss = armMiss(tmp,state[tmp + 48u]);
let mode = state[tmp + 47u];
if (mode == SWIVEL_FIRST) {
if (miss <= 0.0) {
return poleDir;
}
state[tmp + 50u] = miss;
swivelSide(tmp,-1.0);
} else if (mode == SWIVEL_STEPPING) {
swivelStepped(tmp,miss);
} else if (mode == SWIVEL_EDGE) {
swivelHalved(tmp,miss);
} else {
swivelRefined(tmp,miss);
}
}
var best = state[tmp + 49u];
if (state[tmp + 51u] > 0.5) {
let middle = 0.5 * (state[tmp + 44u] + state[tmp + 44u + 1u]);
let half = max(0.5 * (state[tmp + 44u + 1u] - state[tmp + 44u]),1e-9);
var rest = 0.0;
if (folds) {
rest = 1.0 - min(abs(middle) / half,1.0);
}
let rest2 = rest * rest;
let toward = 1.0 - 2.0 * select01((middle > 0.0));
best = middle + toward * half * (1.0 - rest2 * rest2);
}
return vNormalize(poleDir * cos(best) + swivel * sin(best));
}
`,`fn hypot(x: f32,y: f32) -> f32 {
return sqrt(x * x + y * y);
}
fn wristEdge(palm: f32,thumb: f32) -> vec3f {
let a = select(WRIST_EXTENSION,WRIST_FLEXION,(palm >= 0.0));
let b = select(WRIST_ULNAR,WRIST_RADIAL,(thumb >= 0.0));
let px = abs(palm);
let py = abs(thumb);
var tx = 0.70710678;
var ty = 0.70710678;
for (var k = 0u; k < WRIST_EDGE_STEPS; k++) {
let ex = (a * a - b * b) * tx * tx * tx / a;
let ey = (b * b - a * a) * ty * ty * ty / b;
let r = hypot(a * tx - ex,b * ty - ey);
let q = hypot(px - ex,py - ey);
if (q < 1e-12) {
break;
}
tx = min(1.0,max(0.0,(px - ex) * r / q + ex) / a);
ty = min(1.0,max(0.0,(py - ey) * r / q + ey) / b);
let t = hypot(tx,ty);
tx = tx / t;
ty = ty / t;
}
return vec3f(select(-a,a,(palm >= 0.0)) * tx,select(-b,b,(thumb >= 0.0)) * ty,0.0);
}
`,`fn wristMost(towardPalm: f32,towardThumb: f32) -> f32 {
let palm = towardPalm / select(WRIST_EXTENSION,WRIST_FLEXION,(towardPalm >= 0.0));
let thumb = towardThumb / select(WRIST_ULNAR,WRIST_RADIAL,(towardThumb >= 0.0));
return 1.0 / sqrt(max(palm * palm + thumb * thumb,1e-12));
}
`,`fn solveLimbA(rig: u32,model: u32,n: u32,root: u32,mid: u32,end: u32,leg: bool,arm: u32,poleAt: u32,target_: vec3f,hasHint: bool,hint: vec3f,weight: f32,dt: f32,hasPole: bool,poleWorld: vec3f,hasEnd: bool,endWorld: vec4f,tmp: u32) {
state[tmp + 60u] = 0.0;
if (weight <= 0.0) {
return;
}
let frame = limbMap(model,n);
let rootPos = limbPoint(frame,nodePos(model,n,root),1.0);
let midPos = limbPoint(frame,nodePos(model,n,mid),1.0);
let endPos = limbPoint(frame,nodePos(model,n,end),1.0);
let aim = limbPoint(frame,target_,1.0);
let hintIn = limbPoint(frame,hint,0.0);
let poleIn = limbPoint(frame,poleWorld,1.0);
let upper = midPos - rootPos;
let lower = endPos - midPos;
let upperLenSq = lenSq(upper);
let lowerLenSq = lenSq(lower);
if ((upperLenSq < LIMB_DEGENERATE) || (lowerLenSq < LIMB_DEGENERATE)) {
return;
}
let upperLen = sqrt(upperLenSq);
let lowerLen = sqrt(lowerLenSq);
var targetDir = aim - rootPos;
let targetDist = length(targetDir);
if (targetDist * targetDist < LIMB_DEGENERATE) {
targetDir = endPos - rootPos;
if (lenSq(targetDir) < LIMB_DEGENERATE) {
return;
}
targetDir = vNormalize(targetDir);
} else {
targetDir = targetDir * (1.0 / targetDist);
}
let isArm = arm != 4294967295u;
let reach = softReach(targetDist,upperLen,lowerLen,select(1.0,COS_ELBOW_FOLD,isArm));
let cosRoot = clamp((upperLenSq + reach * reach - lowerLenSq) / (2.0 * upperLen * reach),-1.0,1.0);
let sinRoot = sqrt(max(0.0,1.0 - cosRoot * cosRoot));
var limbFrame = vec4f(0.0,0.0,0.0,1.0);
var trunk = limbFrame;
var trunkNode = 0u;
if (isArm) {
trunkNode = bake[arm];
}
let turns = select(u32(1),u32(2),isArm);
for (var k = 0u; k < turns; k++) {
let q = limbTurn(frame,model,n,select(parentNode(rig,root),trunkNode,(k == 1u)));
if (k == 0u) {
limbFrame = q;
} else {
trunk = q;
}
}
let drawn = (poleAt != 4294967295u) && (state[poleAt + 1u] > 0.5);
state[tmp + 62u] = select(-1.0,POLE_MAX_TURN_PER_SECOND * dt,drawn);
var poleDir = selectPole(poleAt,upper,endPos - rootPos,targetDir,limbFrame,rootPos,hasHint,hintIn,hasPole,poleIn,leg,isArm,state[tmp + 62u]);
putState3(tmp,targetDir);
state[tmp + 30u] = cosRoot;
state[tmp + 31u] = sinRoot;
if (isArm) {
state[tmp + 32u] = sinRoot * reach / lowerLen;
state[tmp + 33u] = select01((hasEnd && !hasPole));
if (hasEnd) {
state[tmp + 34u] = reach / upperLen;
state[tmp + 61u] = bf(arm + 28u);
let wrist = quatMul(endWorld,qConj(bake4(arm + 24u)));
let foreAxis = bake3(arm + 11u);
putState3(tmp + 18u,quatRotate(wrist,foreAxis));
putState3(tmp + 21u,quatRotate(wrist,bake3(arm + 14u)));
putState3(tmp + 24u,quatRotate(wrist,bake3(arm + 17u)));
let hinge = reject(quatRotate(qConj(bake4(arm + 20u)),bake3(arm + 2u)),foreAxis);
putState3(tmp + 27u,quatRotate(wrist,vNormalize(cross(foreAxis,hinge))));
}
poleDir = swivelInsideRanges(arm,tmp,poleDir,trunk,hasPole);
}
if (drawn) {
let prev = reject(rememberedPole(poleAt,9u,limbFrame),targetDir);
if (!(lenSq(prev) < LIMB_DEGENERATE)) {
poleDir = limitPoleTurn(vNormalize(prev),poleDir,targetDir,state[tmp + 62u]);
}
}
if (poleAt != 4294967295u) {
putState3(poleAt + 9u,poleDir);
putState4(poleAt + 5u,limbFrame);
}
putState3(tmp + 3u,poleDir);
state[tmp + 59u] = reach;
state[tmp + 60u] = 1.0;
}
`,`fn wrapAngle(a: f32) -> f32 {
let turn = 2.0 * LIMB_PI;
let x = a + LIMB_PI;
return x - turn * floor(x / turn) - LIMB_PI;
}
`,`fn clampAbs(v: f32,limit: f32) -> f32 {
return clamp(v,-limit,limit);
}
`,`fn clampLook(dir: vec3f,characterYaw: f32,maxYaw: f32,maxPitch: f32) -> vec3f {
let pitch = clampAbs(asin(clamp(dir.y,-1.0,1.0)),maxPitch);
var relative = 0.0;
if (dir.x * dir.x + dir.z * dir.z >= LIMB_DEGENERATE) {
relative = clampAbs(wrapAngle(atan2(-dir.x,-dir.z) - characterYaw),maxYaw);
}
let yaw = characterYaw + relative;
let cp = cos(pitch);
return vec3f(-sin(yaw) * cp,sin(pitch),-cos(yaw) * cp);
}
fn characterYaw(model: u32,n: u32,front: vec3f) -> f32 {
let f = quatRotate(nodeTurn(model,n,4294967295u),front);
if (f.x * f.x + f.z * f.z >= LIMB_DEGENERATE) {
return atan2(-f.x,-f.z);
}
return 0.0;
}
fn neckYawWeight(turn: f32) -> f32 {
let behind = abs(turn) / (0.5 * LIMB_PI) - 1.0;
return select(1.0 - behind * behind * (3.0 - 2.0 * behind),1.0,(behind <= 0.0));
}
fn lookTurn(from_: vec3f,to: vec3f,share: f32,neck: bool) -> vec4f {
let fromLevel = sqrt(from_.x * from_.x + from_.z * from_.z);
let toLevel = sqrt(to.x * to.x + to.z * to.z);
var out = vec4f(0.0,0.0,0.0,1.0);
if ((fromLevel < LOOK_LEVEL_EPSILON) || (toLevel < LOOK_LEVEL_EPSILON)) {
out = qSlerp(out,qFromUnit(from_,to),share);
} else {
let fromYaw = atan2(-from_.x,-from_.z);
let turn = wrapAngle(atan2(-to.x,-to.z) - fromYaw);
var yaw = turn * share;
if (neck) {
yaw = yaw * neckYawWeight(turn);
}
let pitch = (atan2(to.y,toLevel) - atan2(from_.y,fromLevel)) * share;
let heading = fromYaw + yaw;
out = quatMul(qAxisAngle(vec3f(cos(heading),0.0,-sin(heading)),pitch),qAxisAngle(vec3f(0.0,1.0,0.0),yaw));
}
return out;
}
`,`fn solveLook(rig: u32,pose: u32,model: u32,n: u32,head: u32,neck: u32,face: vec3f,target_: vec3f,weight: f32,maxYaw: f32,maxPitch: f32,front: vec3f) {
if (weight <= 0.0) {
return;
}
var desired = target_ - nodePos(model,n,head);
if (lenSq(desired) < LIMB_DEGENERATE) {
return;
}
desired = vNormalize(desired);
let yaw = characterYaw(model,n,front);
var clamped = clampLook(desired,yaw,maxYaw,maxPitch);
let first = select(u32(1),u32(0),(neck != 4294967295u));
for (var k = first; k < 2u; k++) {
let neckTurn = k == 0u;
let joint = select(head,neck,neckTurn);
var headTurn = vec4f(0.0,0.0,0.0,1.0);
var world = headTurn;
var frame = headTurn;
for (var j = 0u; j < 3u; j++) {
var node = head;
if (j == 1u) {
node = joint;
} else if (j == 2u) {
node = parentNode(rig,joint);
}
let q = nodeTurn(model,n,node);
if (j == 0u) {
headTurn = q;
} else if (j == 1u) {
world = q;
} else {
frame = q;
}
}
swingFrom(rig,pose,model,joint,lookTurn(quatRotate(headTurn,face),clamped,select(1.0,LOOK_NECK_SHARE,neckTurn),neckTurn),weight,world,frame);
if (neckTurn) {
composeWorldNode(rig,pose,model,head);
desired = target_ - nodePos(model,n,head);
if (lenSq(desired) >= LIMB_DEGENERATE) {
clamped = clampLook(vNormalize(desired),yaw,maxYaw,maxPitch);
}
}
}
recomposeWorldSubtree(rig,pose,model,select(head,neck,(neck != 4294967295u)),4294967295u);
}
`,`fn jobArm(jb: u32,table: u32) -> u32 {
let arm = word(jb + 5u);
if (arm == 4294967295u) {
return 4294967295u;
}
return table + arm;
}
`,`fn jobPole(jb: u32,st: u32) -> u32 {
let pole = word(jb + 6u);
if (pole == 4294967295u) {
return 4294967295u;
}
return st + pole;
}
fn runLimbJob(rig: u32,pose: u32,model: u32,n: u32,st: u32,table: u32,jb: u32,tmp: u32) {
let kind = state[jb];
if (kind == REACH_JOB_LIMB) {
solveLimbA(rig,model,n,word(jb + 1u),word(jb + 2u),word(jb + 3u),(state[jb + 4u] > 0.5),jobArm(jb,table),jobPole(jb,st),state3(jb + 7u),(state[jb + 10u] > 0.5),state3(jb + 11u),state[jb + 14u],state[jb + 15u],(state[jb + 16u] > 0.5),state3(jb + 17u),(state[jb + 20u] > 0.5),state4(jb + 21u),tmp);
} else if (kind == REACH_JOB_LOOK) {
solveLook(rig,pose,model,n,word(jb + 1u),word(jb + 2u),state3(jb + 11u),state3(jb + 7u),state[jb + 14u],state[jb + 25u],state[jb + 26u],state3(jb + 27u));
state[jb] = REACH_JOB_NONE;
}
}
`,`fn roundJobAt(st: u32,inputs: u32,k: u32) -> u32 {
var jb = jobOf(st);
if (k < rows[inputs + 2u]) {
jb = footSlotAt(st,inputs,rows[footEntry(inputs,k) + 15u]) + 138u;
}
return jb;
}
fn roundTmpOf(st: u32,jb: u32) -> u32 {
var tmp = st + 178u;
if (jb != jobOf(st)) {
tmp = jb - 138u + 168u;
}
return tmp;
}
`,`fn reach_limb(row: u32,k: u32) {
let st = passWord(row,0u,1u);
let jb = roundJobAt(st,passWord(row,0u,0u),k);
if (state[jb] == REACH_JOB_NONE) {
return;
}
let rig = rows[row];
let n = bake[rig];
let pose = rows[row + 1u];
runLimbJob(rig,pose,pose + n * 10u,n,st,passWord(row,0u,2u),jb,roundTmpOf(st,jb));
}
`,`fn roundJobs(row: u32) -> u32 {
return rows[passWord(row,0u,0u) + 2u] + 1u;
}
`,`@compute @workgroup_size(WG)
fn reach_limb_main(@builtin(workgroup_id) lume_wid: vec3u,@builtin(num_workgroups) lume_groups: vec3u,@builtin(local_invocation_index) tid: u32) {
let index: u32 = lume_wid.x + lume_wid.y * lume_groups.x;
let row = reachRow(index);
if (row != 4294967295u) {
let jobs = roundJobs(row);
for (var k = tid; k < jobs; k += WG) {
reach_limb(row,k);
}
}
}
`,`fn composeBetween(rig: u32,pose: u32,model: u32,top: u32,bone: u32) {
var count = 0u;
var p = parentNode(rig,bone);
loop {
if (!(((p != 4294967295u) && (p != top)) && (count < 64u))) { break; }
count++;
p = parentNode(rig,p);
}
for (var k = count; k > 0u; k--) {
var node = bone;
for (var s = 0u; s < k; s++) {
node = parentNode(rig,node);
}
composeWorldNode(rig,pose,model,node);
}
}
`,`fn turnHumerusToBend(arm: u32,tmp: u32,dirNew: vec3f) {
let t = state3(tmp);
let p = state3(tmp + 3u);
let goal = t * state[tmp + 31u] - p * state[tmp + 30u];
let solved = state4(tmp + 36u);
let crease = reject(quatRotate(solved,bake3(arm + 2u)),dirNew);
if (lenSq(crease) < LIMB_DEGENERATE) {
return;
}
let armTurn = qAxisAngle(dirNew,signedAngle(crease,goal,dirNew));
putState4(tmp + 36u,quatMul(armTurn,solved));
putState4(tmp + 40u,quatMul(armTurn,state4(tmp + 40u)));
}
`,`fn twistAbout(q: vec4f,axis: vec3f) -> f32 {
let along = dot(xyzOf(q),axis);
let spin = select(along,-along,(q.w < 0.0));
let w = abs(q.w);
let live = select01((w * w + spin * spin >= LIMB_DEGENERATE));
return 2.0 * live * atan2(spin,w + 1.0 - live);
}
`,`fn holdWrist(rig: u32,pose: u32,model: u32,n: u32,frame: mat4x4f,arm: u32,root: u32,mid: u32,weight: f32,endWorld: vec4f) -> vec4f {
let w = min(1.0,weight);
var midWorld = vec4f(0.0,0.0,0.0,1.0);
var rootWorld = midWorld;
for (var k = 0u; k < 2u; k++) {
let q = limbTurn(frame,model,n,select(mid,root,(k == 1u)));
if (k == 0u) {
midWorld = q;
} else {
rootWorld = q;
}
}
let restWrist = bake4(arm + 24u);
let a = bake3(arm + 11u);
var q = quatMul(quatMul(qConj(midWorld),endWorld),qConj(restWrist));
let turn = twistAbout(q,a);
let along = dot(xyzOf(q),a);
let named = min(1.0,sqrt(q.w * q.w + along * along) / TWIST_NAMED_COS);
let trust = named * named * (3.0 - 2.0 * named);
let pronation = twistAbout(quatMul(qConj(bake4(arm + 20u)),quatMul(qConj(rootWorld),midWorld)),a);
let halfTurn = bf(arm + 28u);
let low = min(min(-FOREARM_TURN,halfTurn - FOREARM_TURN),pronation);
let high = max(max(FOREARM_TURN,halfTurn + FOREARM_TURN),pronation);
let middle = 0.5 * (low + high);
let most = min(0.5 * (high - low),LIMB_PI);
let off = wrapAngle(pronation + turn - middle);
let start = max(most,LIMB_PI - most);
let carried = (middle + clamp(off,-most,most) * (1.0 - clamp((abs(off) - start) / max(LIMB_PI - start,0.0001),0.0,1.0)) - pronation) * trust;
q = quatMul(qConj(qAxisAngle(a,turn)),q);
if (q.w < 0.0) {
q = -q;
}
let qv = xyzOf(q);
let sinHalf = length(qv);
if (sinHalf > 1e-9) {
let angle = 2.0 * atan2(sinHalf,q.w);
let axis = qv * (1.0 / sinHalf);
let bent = cross(axis,a);
let np = bake3(arm + 14u);
let nr = bake3(arm + 17u);
let towardPalm = dot(bent,np);
let towardThumb = dot(bent,nr);
if (angle > wristMost(towardPalm,towardThumb)) {
let edge = wristEdge(angle * towardPalm,angle * towardThumb);
let held = hypot(edge.x,edge.y);
q = qAxisAngle(cross(a,(np * edge.x + nr * edge.y) * (1.0 / held)),held);
}
}
q = quatMul(midWorld,quatMul(quatMul(qAxisAngle(a,carried),qSlerp(vec4f(0.0,0.0,0.0,1.0),q,trust)),restWrist));
setLocalTurn(rig,pose,model,mid,quatMul(poseQ(pose + mid * 10u),qAxisAngle(a,carried * w)));
return qSlerp(endWorld,q,w);
}
fn solveLimbB(rig: u32,pose: u32,model: u32,n: u32,root: u32,mid: u32,end: u32,arm: u32,weight: f32,hasEnd: bool,endWorld: vec4f,tmp: u32) {
if (state[tmp + 60u] == 0.0) {
return;
}
let frame = limbMap(model,n);
let rootPos = limbPoint(frame,nodePos(model,n,root),1.0);
let midPos = limbPoint(frame,nodePos(model,n,mid),1.0);
let endPos = limbPoint(frame,nodePos(model,n,end),1.0);
var upper = midPos - rootPos;
var lower = endPos - midPos;
let upperLen = sqrt(lenSq(upper));
let lowerLen = sqrt(lenSq(lower));
let targetDir = state3(tmp);
let cosRoot = state[tmp + 30u];
let sinRoot = state[tmp + 31u];
let reach = state[tmp + 59u];
let poleDir = state3(tmp + 3u);
let isArm = arm != 4294967295u;
let along = upperLen * cosRoot;
let off = upperLen * sinRoot;
let midSolved = rootPos + targetDir * along + poleDir * off;
let endSolved = rootPos + targetDir * reach;
let between = parentNode(rig,mid) != root;
var limbFrame = vec4f(0.0,0.0,0.0,1.0);
var worldQ = limbFrame;
var worldQB = limbFrame;
var endWorldQuat = limbFrame;
var midFrame = limbFrame;
let turns = select(u32(4),u32(5),between);
for (var k = 0u; k < turns; k++) {
var node = root;
if (k == 0u) {
node = parentNode(rig,root);
} else if (k == 2u) {
node = mid;
} else if (k == 3u) {
node = end;
} else if (k == 4u) {
node = parentNode(rig,mid);
}
let q = limbTurn(frame,model,n,node);
if (k == 0u) {
limbFrame = q;
} else if (k == 1u) {
worldQ = q;
} else if (k == 2u) {
worldQB = q;
} else if (k == 3u) {
endWorldQuat = q;
} else {
midFrame = q;
}
}
var limbBetween = vec4f(0.0,0.0,0.0,1.0);
if (between) {
limbBetween = quatMul(qConj(worldQ),midFrame);
}
upper = upper * (1.0 / upperLen);
let dirNew = vNormalize(midSolved - rootPos);
putState4(tmp + 40u,qFromUnit(upper,dirNew));
putState4(tmp + 36u,quatMul(state4(tmp + 40u),worldQ));
if (isArm) {
turnHumerusToBend(arm,tmp,dirNew);
}
let swing = state4(tmp + 40u);
let solved = state4(tmp + 36u);
lower = quatRotate(swing,lower * (1.0 / lowerLen));
let dirLower = vNormalize(endSolved - midSolved);
let solvedB = quatMul(qFromUnit(lower,dirLower),quatMul(swing,worldQB));
putQ(pose + root * 10u,qSlerp(poseQ(pose + root * 10u),quatMul(qConj(limbFrame),solved),weight));
putQ(pose + mid * 10u,qSlerp(poseQ(pose + mid * 10u),quatMul(qConj(quatMul(solved,limbBetween)),solvedB),weight));
if (hasEnd) {
endWorldQuat = qSlerp(endWorldQuat,endWorld,weight);
}
for (var k = 0u; k < 2u; k++) {
let atMid = k == 1u;
composeWorldNode(rig,pose,model,select(root,mid,atMid));
if (atMid && isArm) {
endWorldQuat = holdWrist(rig,pose,model,n,frame,arm,root,mid,weight,endWorldQuat);
}
composeBetween(rig,pose,model,select(root,mid,atMid),select(mid,end,atMid));
}
setLocalTurn(rig,pose,model,end,quatMul(qConj(limbTurn(frame,model,n,parentNode(rig,end))),endWorldQuat));
recomposeWorldSubtree(rig,pose,model,root,end);
}
`,`fn runBendJob(rig: u32,pose: u32,model: u32,n: u32,table: u32,jb: u32,tmp: u32) {
if (state[jb] != REACH_JOB_LIMB) {
return;
}
solveLimbB(rig,pose,model,n,word(jb + 1u),word(jb + 2u),word(jb + 3u),jobArm(jb,table),state[jb + 14u],(state[jb + 20u] > 0.5),state4(jb + 21u),tmp);
state[jb] = REACH_JOB_NONE;
}
`,`fn reach_bend(row: u32,k: u32) {
let st = passWord(row,0u,1u);
let inputs = passWord(row,0u,0u);
let jb = roundJobAt(st,inputs,k);
if (state[jb] != REACH_JOB_LIMB) {
return;
}
let rig = rows[row];
let n = bake[rig];
let pose = rows[row + 1u];
runBendJob(rig,pose,pose + n * 10u,n,passWord(row,0u,2u),jb,roundTmpOf(st,jb));
if (k < rows[inputs + 2u]) {
let f = footEntry(inputs,k);
groundedFootJob(st,0u,jb,f,footSlotAt(st,inputs,rows[f + 15u]),1.0);
runAlignJob(rig,pose,pose + n * 10u,n,jb);
}
}
`,`@compute @workgroup_size(WG)
fn reach_bend_main(@builtin(workgroup_id) lume_wid: vec3u,@builtin(num_workgroups) lume_groups: vec3u,@builtin(local_invocation_index) tid: u32) {
let index: u32 = lume_wid.x + lume_wid.y * lume_groups.x;
let row = reachRow(index);
if (row != 4294967295u) {
loadFrame(stateFrame(row),0u,116u,tid,WG);
}
workgroupBarrier();
if (row != 4294967295u) {
let jobs = roundJobs(row);
for (var k = tid; k < jobs; k += WG) {
reach_bend(row,k);
}
}
}
`,`const GRIP_BLEND_SECONDS: f32 = 0.12;
`,`fn gripEase(before: f32,want: f32,step: f32) -> f32 {
if (want > before) {
return min(want,before + step);
}
return max(want,before - step);
}
fn writeHand(rig: u32,pose: u32,model: u32,ht: u32,hin: u32,hs: u32,weight: f32) {
let fingers = bake[ht + 9u];
for (var f = 0u; f < fingers; f++) {
if (rf(hin + 29u + f * 4u) > 0.5) {
continue;
}
let ft = ht + bake[ht + 10u] + f * 29u;
let joints = bake[ft];
for (var j = 0u; j < joints; j++) {
let node = bake[ft + 2u + j];
let closed = quatMul(bake4(ft + 14u + j * 4u),qAxisAngle(bake3(ft + 5u + j * 3u),state[hs + 2u + f * 3u + j]));
putQ(pose + node * 10u,qSlerp(poseQ(pose + node * 10u),closed,weight));
}
recomposeWorldSubtree(rig,pose,model,bake[ft + 2u],4294967295u);
}
}
fn easeFingers(ht: u32,hin: u32,hs: u32,before: f32,step: f32) {
let fingers = bake[ht + 9u];
for (var f = 0u; f < fingers; f++) {
let ft = ht + bake[ht + 10u] + f * 29u;
let joints = bake[ft];
for (var j = 0u; j < joints; j++) {
let target_ = rf(hin + 29u + f * 4u + 1u + j);
let a = hs + 2u + f * 3u + j;
var shown = state[a];
if (before == 0.0) {
shown = target_;
}
let reach = step * max(bf(ft + 26u + j),0.001);
var next = target_;
if (!(abs(target_ - shown) <= reach)) {
if (target_ > shown) {
next = shown + reach;
} else {
next = shown - reach;
}
}
state[a] = next;
}
}
}
fn grip_hands(rig: u32,pose: u32,model: u32,n: u32,inputs: u32,stateAt: u32,table: u32) {
state[stateAt] = 1.0;
state[stateAt + 35u] = 0.0;
let dt = max(frameSeconds(),0.0);
var step = 0.0;
if (dt > 0.0) {
step = dt / GRIP_BLEND_SECONDS;
}
let hands = min(bake[table],rows[inputs]);
for (var h = 0u; h < hands; h++) {
let ht = table + bake[table + 1u] + h * 11u;
let hin = inputs + 1u + h * 49u;
let hs = stateAt + 1u + h * 17u;
let flags = rows[hin];
var wantSupport = 0.0;
if (((flags & 2u) != 0u) && ((flags & 4u) == 0u)) {
wantSupport = 1.0;
}
state[hs + 1u] = gripEase(state[hs + 1u],wantSupport,step);
let holding = (flags & 1u) != 0u;
var want = 0.0;
if (holding) {
want = 1.0;
}
let before = state[hs];
let weight = gripEase(before,want,step);
state[hs] = weight;
if (holding) {
easeFingers(ht,hin,hs,before,step);
}
if (weight > 0.0) {
writeHand(rig,pose,model,ht,hin,hs,weight);
}
}
}
`,`fn gripRow(index: u32,tid: u32) -> u32 {
var row = 4294967295u;
if (((tid == 0u) && (index < rows[15u])) && rowPoses(rows[rows[14u] + index])) {
row = rows[rows[14u] + index];
}
return row;
}
var<workgroup> wgGripRow: u32;
`,`@compute @workgroup_size(WG)
fn grip_hands_main(@builtin(workgroup_id) lume_wid: vec3u,@builtin(num_workgroups) lume_groups: vec3u,@builtin(local_invocation_index) tid: u32) {
let index: u32 = lume_wid.x + lume_wid.y * lume_groups.x;
if (tid == 0u) {
wgGripRow = gripRow(index,tid);
}
let row = workgroupUniformLoad(&wgGripRow);
if (row == 4294967295u) {
return;
}
let rig = rows[row];
let n = bake[rig];
let pose = rows[row + 1u];
standWorld(rig,pose + n * 10u,tid);
storageBarrier();
workgroupBarrier();
if (tid == 0u) {
grip_hands(rig,pose,pose + n * 10u,n,passWord(row,1u,0u),passWord(row,1u,1u),passWord(row,1u,2u));
}
}
`,`fn gripFrame(model: u32,n: u32,bone: u32) -> mat4x4f {
let m = nodeWorld(model,n,bone);
let a = m[0u];
let b = m[1u];
let c = m[2u];
let sx = sqrt(a.x * a.x + a.y * a.y + a.z * a.z);
let sy = sqrt(b.x * b.x + b.y * b.y + b.z * b.z);
let sz = sqrt(c.x * c.x + c.y * c.y + c.z * c.z);
var scale = 0.0;
var turn = vec4f(0.0,0.0,0.0,1.0);
if (((sx > 0.0) && (sy > 0.0)) && (sz > 0.0)) {
scale = (sx + sy + sz) / 3.0;
let q = basisTurn(vec3f(a.x / sx,a.y / sx,a.z / sx),vec3f(b.x / sy,b.y / sy,b.z / sy),vec3f(c.x / sz,c.y / sz,c.z / sz));
var len = sqrt(q.x * q.x + q.y * q.y + q.z * q.z + q.w * q.w);
if (len == 0.0) {
len = 1.0;
}
turn = vec4f(q.x / len,q.y / len,q.z / len,q.w / len);
}
return mat4x4f(vec4f(m[3u].x,m[3u].y,m[3u].z,scale),turn,vec4f(0.0,0.0,0.0,0.0),vec4f(0.0,0.0,0.0,0.0));
}
fn holdArmPlane(rig: u32,pose: u32,model: u32,n: u32,ht: u32,hin: u32,other: u32,otherIn: u32,weight: f32,st: u32) -> bool {
let chain = ht + 2u;
if ((bake[chain] == 4294967295u) || (other == 4294967295u)) {
return false;
}
let flags = rows[otherIn];
if ((flags & (8u | 16u)) == 0u) {
return false;
}
let by = gripFrame(model,n,bake[other]);
let byScale = by[0u].w;
let byPos = xyzOf(by[0u]);
let byTurn = by[1u];
var at = vec3f(0.0,0.0,0.0);
var turn = vec4f(0.0,0.0,0.0,1.0);
if ((flags & 8u) != 0u) {
if (byScale == 0.0) {
return false;
}
at = byPos + quatRotate(byTurn,rf3(otherIn + 1u));
turn = quatMul(byTurn,rf4(otherIn + 1u + 3u));
} else {
at = rf3(otherIn + 8u);
turn = rf4(otherIn + 8u + 3u);
}
var target_ = at + quatRotate(turn,rf3(hin + 15u));
var endTurn = quatMul(turn,rf4(hin + 18u));
let wrist = gripFrame(model,n,bake[ht]);
if ((wrist[0u].w > 0.0) && (byScale > 0.0)) {
let byInverse = qConj(byTurn);
let nowAt = quatRotate(byInverse,(xyzOf(wrist[0u]) - byPos) * (1.0 / byScale));
let followTurn = quatMul(quatMul(byInverse,wrist[1u]),qConj(rf4(hin + 25u)));
let followAt = nowAt - quatRotate(followTurn,rf3(hin + 22u));
let local = quatRotate(followTurn,quatRotate(byInverse,(target_ - byPos) * (1.0 / byScale))) + followAt;
target_ = byPos + quatRotate(byTurn,local) * byScale;
endTurn = quatMul(byTurn,quatMul(followTurn,quatMul(byInverse,endTurn)));
}
putState4(st + 37u,endTurn);
let mid = bake[chain + 1u];
solveLimbA(rig,model,n,bake[chain],mid,bake[chain + 2u],(bake[chain + 3u] != 0u),4294967295u,4294967295u,target_,false,target_,weight,0.0,true,nodePos(model,n,mid),true,endTurn,st + 41u);
return true;
}
fn otherHandOf(hands: u32,h: u32) -> u32 {
for (var o = 0u; o < hands; o++) {
if (o != h) {
return o;
}
}
return 4294967295u;
}
fn grip_arm(rig: u32,pose: u32,model: u32,n: u32,inputs: u32,stateAt: u32,table: u32) {
state[stateAt + 36u] = 0.0;
let hands = min(bake[table],rows[inputs]);
let h = u32(state[stateAt + 35u]);
if (h >= hands) {
return;
}
let support = state[stateAt + 1u + h * 17u + 1u];
if (!(support > 0.0)) {
return;
}
let o = otherHandOf(hands,h);
var other = 4294967295u;
var otherIn = 4294967295u;
if (o != 4294967295u) {
other = table + bake[table + 1u] + o * 11u;
otherIn = inputs + 1u + o * 49u;
}
let ht = table + bake[table + 1u] + h * 11u;
let hin = inputs + 1u + h * 49u;
if (holdArmPlane(rig,pose,model,n,ht,hin,other,otherIn,support,stateAt)) {
state[stateAt + 36u] = 1.0;
}
}
`,`@compute @workgroup_size(WG)
fn grip_arm_main(@builtin(workgroup_id) lume_wid: vec3u,@builtin(num_workgroups) lume_groups: vec3u,@builtin(local_invocation_index) tid: u32) {
let index: u32 = lume_wid.x + lume_wid.y * lume_groups.x;
let row = gripRow(index,tid);
if (row == 4294967295u) {
return;
}
let rig = rows[row];
let n = bake[rig];
let pose = rows[row + 1u];
grip_arm(rig,pose,pose + n * 10u,n,passWord(row,1u,0u),passWord(row,1u,1u),passWord(row,1u,2u));
}
`,`fn holdArmBend(rig: u32,pose: u32,model: u32,n: u32,ht: u32,weight: f32,st: u32) {
let chain = ht + 2u;
solveLimbB(rig,pose,model,n,bake[chain],bake[chain + 1u],bake[chain + 2u],4294967295u,weight,true,state4(st + 37u),st + 41u);
}
fn grip_bend(rig: u32,pose: u32,model: u32,n: u32,stateAt: u32,table: u32) {
let h = u32(state[stateAt + 35u]);
if (state[stateAt + 36u] > 0.5) {
let ht = table + bake[table + 1u] + h * 11u;
holdArmBend(rig,pose,model,n,ht,state[stateAt + 1u + h * 17u + 1u],stateAt);
state[stateAt + 36u] = 0.0;
}
state[stateAt + 35u] = f32(h + 1u);
}
`,`@compute @workgroup_size(WG)
fn grip_bend_main(@builtin(workgroup_id) lume_wid: vec3u,@builtin(num_workgroups) lume_groups: vec3u,@builtin(local_invocation_index) tid: u32) {
let index: u32 = lume_wid.x + lume_wid.y * lume_groups.x;
let row = gripRow(index,tid);
if (row == 4294967295u) {
return;
}
let rig = rows[row];
let n = bake[rig];
let pose = rows[row + 1u];
grip_bend(rig,pose,pose + n * 10u,n,passWord(row,1u,1u),passWord(row,1u,2u));
}
`,`const SPR_MAX_DT: f32 = 0.1;
const SPR_GRAVITY: f32 = 9.8;
const SPR_AIR_DRAG: f32 = 2.0;
const SPR_WIND_LEAN: f32 = 0.5;
const SPR_FREQ_AT: f32 = 2.2;
const SPR_FREQ_LEN: f32 = 0.25;
const SPR_FREQ_FLOOR: f32 = 0.02;
const SPR_FREQ_MIN: f32 = 1.5;
const SPR_FREQ_MAX: f32 = 9.0;
const SPR_TELEPORT_MIN: f32 = 2.0;
const SPR_TELEPORT_LENGTHS: f32 = 8.0;
const SPR_DEGENERATE_LEN: f32 = 0.1;
const SPR_EPS_SQ: f32 = 1e-12;
const SPR_SWEEPS: u32 = 3u;
const SPR_CONTACT_MARGIN: f32 = 0.001;
const SPR_SEGMENT_TURNS: u32 = 4u;
const SPR_SEGMENT_TOLERANCE: f32 = 0.0001;
const SPR_PLACED_SPEED: f32 = 90.0;
const SPR_PLACED_MIN_DT: f32 = 0.016666667;
const SPR_NO_DEPTH: f32 = 1e+30;
const SPR_PI: f32 = 3.1415927;
const SPR_TAU: f32 = 6.2831853;
const SPR_GUST_SCALE: f32 = 0.8;
const SPR_GUST_SPEED: f32 = 1.0;
const SPR_SKIP: u32 = 0u;
const SPR_STEP: u32 = 1u;
const SPR_HOLD: u32 = 2u;
const SPR_MOVED: u32 = 1u;
const SPR_JUMPED: u32 = 2u;
const SPR_PLACED: u32 = 4u;
const SPR_WHOLE: u32 = 8u;
const SPR_DEPTHS: u32 = 16u;
var<workgroup> wgSprRow: u32;
var<workgroup> wgSprMode: u32;
var<workgroup> wgSprCarry: u32;
var<workgroup> wgSprStep: vec4f;
var<workgroup> wgSprAir: vec4f;
var<workgroup> wgSprMove: vec4f;
var<workgroup> wgSprTurn: vec4f;
`,`fn sprLengthOr1(v: vec3f) -> f32 {
let len = length(v);
return select(len,1.0,(len == 0.0));
}
`,`fn sprScratchLinear(o: u32) -> mat3x3f {
return mat3x3f(scratch[o],scratch[o + 1u],scratch[o + 2u],scratch[o + 4u],scratch[o + 5u],scratch[o + 6u],scratch[o + 8u],scratch[o + 9u],scratch[o + 10u]);
}
fn sprScratchAt(o: u32) -> vec3f {
return vec3f(scratch[o + 12u],scratch[o + 13u],scratch[o + 14u]);
}
fn sprCollapsed(o: u32) -> bool {
for (var k = 0u; k < 12u; k++) {
if (scratch[o + k] != 0.0) {
return false;
}
}
return (((scratch[o + 15u] == 1.0) && finiteWord(scratch[o + 12u])) && finiteWord(scratch[o + 13u])) && finiteWord(scratch[o + 14u]);
}
fn sprWorldTurn(rig: u32,pose: u32,model: u32,root: u32,node: u32) -> vec4f {
let rootLinear = sprScratchLinear(root);
var m = rootLinear;
var turns = vec4f(0.0,0.0,0.0,1.0);
var collapsed = false;
if (node != 4294967295u) {
if (!sprCollapsed(model + node * 16u)) {
m = rootLinear * sprScratchLinear(model + node * 16u);
} else {
collapsed = true;
turns = qNormalize(poseQ(pose + node * 10u));
var at = parentNode(rig,node);
loop {
if (!((at != 4294967295u) && sprCollapsed(model + at * 16u))) { break; }
turns = quatMul(qNormalize(poseQ(pose + at * 10u)),turns);
at = parentNode(rig,at);
}
if (at != 4294967295u) {
m = rootLinear * sprScratchLinear(model + at * 16u);
}
}
}
let base = turnOfColumns(m[0u],m[1u],m[2u]);
if (!collapsed) {
return base;
}
return qNormalize(quatMul(base,turns));
}
`,`fn sprBoneRec(table: u32,b: u32) -> u32 {
return table + bake[table + 7u] + b * 8u;
}
fn sprJoint(stateAt: u32,b: u32) -> u32 {
return stateAt + 56u + b * 23u;
}
fn sprShapeNow(stateAt: u32,bones: u32,s: u32) -> u32 {
return stateAt + 56u + bones * 23u + s * 12u;
}
fn sprDepthAt(stateAt: u32,bones: u32,shapes: u32,b: u32,s: u32) -> u32 {
return stateAt + 56u + bones * 23u + shapes * 12u + (b * shapes + s) * 2u;
}
fn sprKnob(inputs: u32,row: u32) -> u32 {
return inputs + rows[inputs + 10u] + row * 8u;
}
`,`fn sprShapeRec(inputs: u32,s: u32) -> u32 {
return inputs + rows[inputs + 12u] + s * 10u;
}
fn sprSerial(word: u32) -> f32 {
return f32(word & 16777215u) + 1.0;
}
fn sprRowRig(row: u32) -> u32 {
return rows[row];
}
fn sprRowPose(row: u32) -> u32 {
return rows[row + 1u];
}
fn sprRowModel(row: u32) -> u32 {
return sprRowPose(row) + bake[sprRowRig(row)] * 10u;
}
fn sprRowRoot(row: u32) -> u32 {
return sprRowModel(row) + bake[sprRowRig(row)] * 16u;
}
fn sprFract(x: f32) -> f32 {
return x - floor(x);
}
fn sprHash(px: f32,py: f32,seed: f32) -> f32 {
let x = f32(sprFract(f32(f32(px) * f32(0.1031))));
let y = f32(sprFract(f32(f32(py) * f32(0.103))));
let z = f32(sprFract(f32(f32(px) * f32(0.0973))));
let s = f32(f32(seed) + f32(33.33));
let d = f32(f32(f32(x * f32(y + s)) + f32(y * f32(z + s))) + f32(z * f32(x + s)));
return f32(sprFract(f32(f32(f32(x + d) + f32(y + d)) * f32(z + d))));
}
fn sprNoise(px: f32,py: f32,seed: f32) -> f32 {
let x = f32(px);
let y = f32(py);
let ix = floor(x);
let iy = floor(y);
let fx = x - ix;
let fy = y - iy;
let a = sprHash(ix,iy,seed);
let b = sprHash(ix + 1.0,iy,seed);
let c = sprHash(ix,iy + 1.0,seed);
let d = sprHash(ix + 1.0,iy + 1.0,seed);
let ux = fx * fx * (3.0 - fx * 2.0);
let uy = fy * fy * (3.0 - fy * 2.0);
let ab = a + (b - a) * ux;
let cd = c + (d - c) * ux;
return ab + (cd - ab) * uy;
}
fn sprGust(x: f32,z: f32,travelX: f32,travelZ: f32,dirX: f32,dirZ: f32,clock: f32,phase: f32) -> vec3f {
let len = sqrt(dirX * dirX + dirZ * dirZ);
let windX = select(0.0,dirX / len,(len > 0.0001));
let windZ = select(-1.0,dirZ / len,(len > 0.0001));
let size = SPR_GUST_SCALE * 0.22;
let u = (x - travelX * SPR_GUST_SPEED) * size + phase * 0.31;
let v = (z - travelZ * SPR_GUST_SPEED) * size + phase * 0.31;
let lean = 0.32 + 0.68 * sprNoise(u,v,3.1);
let shimmer = (sprNoise(u * 2.7 + 19.0,v * 2.7 + 41.0,7.7) - 0.5) * 0.5 + sin(clock * SPR_GUST_SPEED * (2.6 + phase * 2.2) + phase * SPR_TAU) * 0.14;
return vec3f(windX * lean - windZ * shimmer,0.0,windZ * lean + windX * shimmer);
}
fn sprBlown(inputs: u32,table: u32) -> bool {
let count = rows[inputs + 9u];
let perRow = table + bake[table + 10u];
let tableRows = bake[table + 4u];
for (var r = 0u; (r < count) && (r < tableRows); r++) {
if ((bake[perRow + r] > 0u) && (rf(sprKnob(inputs,r) + 3u) > 0.0)) {
return true;
}
}
return false;
}
fn sprOriginShift(place: u32,seen: u32) -> vec3f {
if (place == 4294967295u) {
return vec3f(0.0,0.0,0.0);
}
let o = place + 5u;
let x = rf(o) - state[seen] + (rf(o + 1u) - state[seen + 1u]);
let y = rf(o + 2u) - state[seen + 2u] + (rf(o + 3u) - state[seen + 3u]);
let z = rf(o + 4u) - state[seen + 4u] + (rf(o + 5u) - state[seen + 5u]);
return vec3f(x,y,z);
}
fn sprHead(root: u32,inputs: u32,stateAt: u32,table: u32) {
let head = stateAt;
let nowHi = rf(4u);
let nowLo = rf(5u);
var raw = frameSeconds();
if (state[head + 14u] > 0.5) {
raw = nowHi - state[head + 15u] + (nowLo - state[head + 15u + 1u]);
}
state[head + 14u] = 1.0;
state[head + 15u] = nowHi;
state[head + 15u + 1u] = nowLo;
var carry = 0u;
let placed = sprSerial(rows[inputs + 2u]);
let placedSeen = max(state[head + 18u],1.0);
state[head + 18u] = placed;
if (placed != placedSeen) {
state[head] = 0.0;
carry = carry | SPR_PLACED;
}
var mode = SPR_STEP;
let step = min(max(raw,0.0),SPR_MAX_DT);
var gap = 0.0;
if (!(step > 0.0)) {
mode = SPR_SKIP;
} else {
let cutsWord = rows[inputs + 1u];
let cuts = select(sprSerial(cutsWord),0.0,(cutsWord == 4294967295u));
let seen = state[head + 17u];
state[head + 17u] = cuts;
let cut = ((cuts > 0.0) && (seen > 0.0)) && (cuts != seen);
let asked = rf(inputs);
let picture = select(asked,raw,(asked < 0.0));
if (picture <= 0.0) {
mode = SPR_HOLD;
carry = carry | SPR_WHOLE;
} else {
gap = max(max(raw,picture),step);
if (cut) {
carry = carry | SPR_WHOLE;
}
}
}
let rootLinear = sprScratchLinear(root);
let at = sprScratchAt(root);
let turn = turnOfColumns(rootLinear[0u],rootLinear[1u],rootLinear[2u]);
let place = rows[inputs + 3u];
if (mode != SPR_SKIP) {
if (state[head] > 0.5) {
let was = state3(head + 1u) - sprOriginShift(place,head + 8u);
let wasTurn = state4(head + 4u);
let still = ((((((at.x == was.x) && (at.y == was.y)) && (at.z == was.z)) && (turn.x == wasTurn.x)) && (turn.y == wasTurn.y)) && (turn.z == wasTurn.z)) && (turn.w == wasTurn.w);
if (!still) {
let move_ = at - was;
carry = carry | SPR_MOVED;
let fast = SPR_PLACED_SPEED * max(gap,SPR_PLACED_MIN_DT);
if (((carry & SPR_WHOLE) == 0u) && (lenSq(move_) > fast * fast)) {
carry = carry | SPR_JUMPED;
}
wgSprMove = vec4f(move_.x,move_.y,move_.z,0.0);
wgSprTurn = quatMul(turn,qConj(wasTurn));
}
}
putState3(head + 1u,at);
putState4(head + 4u,turn);
state[head] = 1.0;
if (place != 4294967295u) {
for (var k = 0u; k < 6u; k++) {
state[head + 8u + k] = rf(place + 5u + k);
}
}
}
wgSprMode = mode;
wgSprCarry = carry;
let lens = vec3f(length(rootLinear[0u]),length(rootLinear[1u]),length(rootLinear[2u]));
wgSprStep = vec4f(step,gap,select(lens.y,1.0,(lens.y == 0.0)),0.0);
wgSprAir = vec4f(0.0,0.0,0.0,0.0);
if (((mode == SPR_STEP) && (place != 4294967295u)) && sprBlown(inputs,table)) {
let speed = rf(place + 2u);
if (speed > 0.0) {
let o = place + 5u;
let x = rf(o) + at.x + rf(o + 1u);
let z = rf(o + 4u) + at.z + rf(o + 5u);
if (state[head + 21u] < 0.5) {
state[head + 20u] = sprHash(x + 53.0,z + 91.0,0.0);
state[head + 21u] = 1.0;
}
let clock = state[head + 19u] + step;
state[head + 19u] = clock;
let gust = sprGust(x,z,rf(place + 3u),rf(place + 4u),rf(place),rf(place + 1u),clock,state[head + 20u]);
wgSprAir = vec4f(gust.x * speed,0.0,gust.z * speed,0.0);
}
}
if (mode == SPR_STEP) {
sprMount(root,inputs,stateAt);
let kept = head + 49u;
let serial = sprSerial(rows[inputs + 15u]);
let skew = vec3f(dot(rootLinear[0u],rootLinear[1u]),dot(rootLinear[0u],rootLinear[2u]),dot(rootLinear[1u],rootLinear[2u]));
if ((((rows[inputs + 5u] != 4294967295u) || (state[kept] != serial)) || (length(lens - state3(kept + 1u)) > 0.00001 * length(lens))) || (length(skew - state3(kept + 4u)) > 0.00001 * dot(lens,lens))) {
state[kept] = serial;
putState3(kept + 1u,lens);
putState3(kept + 4u,skew);
wgSprCarry = carry | SPR_DEPTHS;
}
}
}
fn sprMount(root: u32,inputs: u32,stateAt: u32) {
let worn = rows[inputs + 5u];
let bone = rows[inputs + 7u];
if ((worn == 4294967295u) || (bone == 4294967295u)) {
return;
}
let rest = rows[inputs + 4u];
let lift = scratchMat(root) * bakeMat(rest + bake[rest + 2u]);
let bodyNow = scratchMat(sprRowRoot(worn)) * scratchMat(sprRowModel(worn) + bone * 16u);
let mount = invertAffine(bodyNow) * lift;
for (var c = 0u; c < 4u; c++) {
putState4(stateAt + 22u + c * 4u,mount[c]);
}
}
fn sprCarryBone(stateAt: u32,inputs: u32,table: u32,b: u32,carry: u32) {
let j = sprJoint(stateAt,b);
if ((carry & (SPR_PLACED | SPR_JUMPED)) != 0u) {
state[j] = 0.0;
}
if ((state[j] < 0.5) || ((carry & SPR_MOVED) == 0u)) {
return;
}
let move_ = vec3f(wgSprMove.x,wgSprMove.y,wgSprMove.z);
let turn = wgSprTurn;
let wasBodyTip = state3(j + 10u);
let wasParticle = state3(j + 1u);
let wasPrevTip = state3(j + 7u);
let wasVelocity = state3(j + 4u);
let wasSwingOffset = state3(j + 13u);
putState3(j + 10u,quatRotate(turn,wasBodyTip));
var share = 1.0;
if ((carry & SPR_WHOLE) == 0u) {
share = 1.0 - rf(sprKnob(inputs,bake[sprBoneRec(table,b) + 3u]));
}
let part = qSlerp(vec4f(0.0,0.0,0.0,1.0),turn,share);
let left = move_ * (1.0 - share);
putState3(j + 1u,quatRotate(part,wasParticle) - left);
putState3(j + 7u,quatRotate(part,wasPrevTip) - left);
if (share > 0.0) {
putState3(j + 4u,quatRotate(part,wasVelocity));
putState3(j + 13u,quatRotate(part,wasSwingOffset));
}
}
fn sprShapeFrame(rig: u32,pose: u32,model: u32,root: u32,inputs: u32,stateAt: u32,bones: u32,s: u32) {
let rec = sprShapeRec(inputs,s);
let o = sprShapeNow(stateAt,bones,s);
let flags = rows[rec + 2u];
if ((flags & 4u) != 0u) {
state[o + 11u] = 0.0;
return;
}
let owner = rows[rec];
var ownRig = rig;
var ownPose = pose;
var ownModel = model;
var ownRoot = root;
var from_ = vec3f(0.0,0.0,0.0);
if (owner != 4294967295u) {
ownRig = sprRowRig(owner);
ownPose = sprRowPose(owner);
ownModel = sprRowModel(owner);
ownRoot = sprRowRoot(owner);
from_ = sprScratchAt(ownRoot) - sprScratchAt(root);
}
let node = rows[rec + 1u];
var at = from_;
var turn = vec4f(0.0,0.0,0.0,1.0);
var sy = 0.0;
let rootLinear = sprScratchLinear(ownRoot);
if (node == 4294967295u) {
turn = turnOfColumns(rootLinear[0u],rootLinear[1u],rootLinear[2u]);
sy = length(rootLinear[1u]);
} else {
let world = rootLinear * sprScratchLinear(ownModel + node * 16u);
at = from_ + rootLinear * sprScratchAt(ownModel + node * 16u);
turn = sprWorldTurn(ownRig,ownPose,ownModel,ownRoot,node);
sy = length(world[1u]);
}
var k = 1.0;
if ((flags & 2u) != 0u) {
k = select(sy,1.0,(sy == 0.0));
}
let center = quatRotate(turn,rf3(rec + 4u) * k) + at;
putState3(o,center);
state[o + 9u] = rf(rec + 3u) * k;
state[o + 11u] = 1.0;
if ((flags & 1u) != 0u) {
state[o + 11u] = 2.0;
let tail = quatRotate(turn,rf3(rec + 7u) * k) + at;
putState3(o + 3u,tail);
putState3(o + 6u,(center + tail) * 0.5);
state[o + 10u] = 0.5 * length(center - tail);
}
}
fn sprRestAt(rest: u32,node: u32) -> vec3f {
let o = rest + bake[rest + 1u] + node * 16u;
return vec3f(bf(o + 12u),bf(o + 13u),bf(o + 14u));
}
fn sprRestMat(rest: u32,node: u32) -> mat4x4f {
return bakeMat(rest + bake[rest + 1u] + node * 16u);
}
fn sprSegmentDistance(a: vec3f,b: vec3f,p: vec3f) -> f32 {
let ab = b - a;
let segLenSq = dot(ab,ab);
var t = 0.0;
if (!(segLenSq < SPR_EPS_SQ)) {
t = min(1.0,max(0.0,dot(p - a,ab) / segLenSq));
}
return length(p - a - ab * t);
}
`,`fn sprClosestOnSegment(a: vec3f,b: vec3f,p: vec3f) -> vec4f {
let seg = b - a;
let segLenSq = dot(seg,seg);
if (segLenSq < SPR_EPS_SQ) {
return vec4f(a.x,a.y,a.z,0.0);
}
let t = min(1.0,max(0.0,dot(p - a,seg) / segLenSq));
let q = a + seg * t;
return vec4f(q.x,q.y,q.z,t);
}
fn sprClosestBetween(p: vec3f,q: vec3f,a: vec3f,b: vec3f) -> vec3f {
let d1 = q - p;
let d2 = b - a;
let r = p - a;
let aa = dot(d1,d1);
let ee = dot(d2,d2);
let ff = dot(d2,r);
var t = 0.0;
if (ee < SPR_EPS_SQ) {
t = 0.0;
} else if (aa < SPR_EPS_SQ) {
t = min(1.0,max(0.0,ff / ee));
} else {
let cc = dot(d1,r);
let bb = dot(d1,d2);
let denom = aa * ee - bb * bb;
var s = 0.0;
if (denom > SPR_EPS_SQ * aa * ee) {
s = min(1.0,max(0.0,(bb * ff - cc * ee) / denom));
}
t = (bb * s + ff) / ee;
if (t < 0.0) {
t = 0.0;
} else if (t > 1.0) {
t = 1.0;
}
}
return a + d2 * t;
}
`,`fn sprRestShapePoint(m: mat4x4f,local: vec3f,scaled: bool) -> vec3f {
if (scaled) {
return limbPoint(m,local,1.0);
}
let p = vec3f(local.x / sprLengthOr1(xyzOf(m[0u])),local.y / sprLengthOr1(xyzOf(m[1u])),local.z / sprLengthOr1(xyzOf(m[2u])));
return limbPoint(m,p,1.0);
}
fn sprCarryHome(rig: u32,rest: u32,homes: u32,bodyRest: u32,node: u32,p: vec3f) -> vec4f {
var at = node;
loop {
if (!((at != 4294967295u) && (bake[homes + at] == 4294967295u))) { break; }
at = parentNode(rig,at);
}
if ((at == 4294967295u) || (bake[homes + at] >= bake[bodyRest])) {
return vec4f(0.0,0.0,0.0,0.0);
}
let carry = sprRestMat(bodyRest,bake[homes + at]) * invertAffine(sprRestMat(rest,at));
let q = limbPoint(carry,p,1.0);
return vec4f(q.x,q.y,q.z,1.0);
}
fn sprRestEnds(rig: u32,inputs: u32,stateAt: u32,node: u32,parent: u32,child: u32) -> mat4x4f {
let rest = rows[inputs + 4u];
var tip = vec3f(0.0,0.0,0.0);
if (child != 4294967295u) {
tip = sprRestAt(rest,child);
} else {
let at = sprRestAt(rest,node);
var core = vec3f(0.0,0.0,0.0);
if (parent != 4294967295u) {
core = sprRestAt(rest,parent);
}
tip = at * 2.0 - core;
}
let pivot = sprRestAt(rest,node);
var road = 0.0;
var wornTip = tip;
var wornPivot = pivot;
let worn = rows[inputs + 5u];
if (worn != 4294967295u) {
let shapeRest = rows[inputs + 6u];
let homes = rows[inputs + 8u];
if (homes != 4294967295u) {
let tipHome = sprCarryHome(rig,rest,homes,shapeRest,select(node,child,(child != 4294967295u)),tip);
let pivotHome = sprCarryHome(rig,rest,homes,shapeRest,node,pivot);
if ((tipHome.w != 0.0) && (pivotHome.w != 0.0)) {
road = 1.0;
wornTip = vec3f(tipHome.x,tipHome.y,tipHome.z);
wornPivot = vec3f(pivotHome.x,pivotHome.y,pivotHome.z);
}
} else {
let bone = rows[inputs + 7u];
if (bone != 4294967295u) {
let m = stateAt + 22u;
let mount = mat4x4f(state4(m),state4(m + 4u),state4(m + 8u),state4(m + 12u));
let lift = sprRestMat(shapeRest,bone) * mount;
road = 2.0;
wornTip = limbPoint(lift,tip,1.0);
wornPivot = limbPoint(lift,pivot,1.0);
}
}
}
return mat4x4f(vec4f(tip.x,tip.y,tip.z,0.0),vec4f(pivot.x,pivot.y,pivot.z,0.0),vec4f(wornTip.x,wornTip.y,wornTip.z,road),vec4f(wornPivot.x,wornPivot.y,wornPivot.z,0.0));
}
fn sprRestDepthFrom(rig: u32,root: u32,inputs: u32,ends: mat4x4f,reach: f32,shape: u32) -> vec4f {
let none = vec4f(SPR_NO_DEPTH,SPR_NO_DEPTH,0.0,0.0);
let owner = rows[shape];
let flags = rows[shape + 2u];
let scaled = (flags & 2u) != 0u;
var tip = xyzOf(ends[0u]);
var pivot = xyzOf(ends[1u]);
var shapeRest = rows[inputs + 4u];
var shapeRoot = root;
var shapeRig = rig;
if (owner != 4294967295u) {
let worn = rows[inputs + 5u];
let road = ends[2u].w;
if (((owner != worn) || (road == 0.0)) || ((road == 2.0) && scaled)) {
return none;
}
shapeRest = rows[inputs + 6u];
shapeRoot = sprRowRoot(worn);
shapeRig = sprRowRig(worn);
tip = xyzOf(ends[2u]);
pivot = xyzOf(ends[3u]);
}
let placed = scratchMat(shapeRoot) * bakeMat(shapeRest + bake[shapeRest + 2u]);
let still = mat4x4f(placed[0u],placed[1u],placed[2u],vec4f(0.0,0.0,0.0,1.0));
tip = limbPoint(still,tip,1.0);
pivot = limbPoint(still,pivot,1.0);
let shapeNode = rows[shape + 1u];
var frame = still * bakeMat(shapeRig + 12u);
if (shapeNode != 4294967295u) {
frame = still * sprRestMat(shapeRest,shapeNode);
}
var radius = rf(shape + 3u);
if (scaled) {
radius = radius * sprLengthOr1(xyzOf(frame[1u]));
}
if (!(radius > 0.0)) {
return none;
}
let center = sprRestShapePoint(frame,rf3(shape + 4u),scaled);
let end = (tip - pivot) * reach + pivot;
if ((flags & 1u) != 0u) {
let tail = sprRestShapePoint(frame,rf3(shape + 7u),scaled);
let near = sprClosestOnSegment(center,tail,tip);
let tipRatio = length(tip - vec3f(near.x,near.y,near.z)) / radius;
let core = sprClosestBetween(pivot,end,center,tail);
return vec4f(tipRatio,sprSegmentDistance(pivot,end,core) / radius,0.0,0.0);
}
return vec4f(length(tip - center) / radius,sprSegmentDistance(pivot,end,center) / radius,0.0,0.0);
}
fn sprKeepHead(stateAt: u32) {
state[stateAt + 39u] = f32(wgSprMode);
state[stateAt + 40u] = f32(wgSprCarry);
putState4(stateAt + 41u,wgSprStep);
putState4(stateAt + 45u,wgSprAir);
}
fn springs_head(rig: u32,pose: u32,model: u32,n: u32,tid: u32,inputs: u32,stateAt: u32,table: u32) {
let root = model + n * 16u;
let bones = bake[table];
if (tid == 0u) {
sprHead(root,inputs,stateAt,table);
sprKeepHead(stateAt);
}
storageBarrier();
workgroupBarrier();
let mode = workgroupUniformLoad(&wgSprMode);
let carry = workgroupUniformLoad(&wgSprCarry);
for (var b = tid; b < bones; b += WG) {
sprCarryBone(stateAt,inputs,table,b,carry);
}
let shapes = rows[inputs + 11u];
if (mode == SPR_STEP) {
for (var s = tid; s < shapes; s += WG) {
sprShapeFrame(rig,pose,model,root,inputs,stateAt,bones,s);
}
var most = 0u;
if ((carry & SPR_DEPTHS) != 0u) {
for (var k = 0u; k < rows[inputs + 9u]; k++) {
most = max(most,rows[sprKnob(inputs,k) + 7u]);
}
}
var b = 0u;
var i = tid;
for (var pair = tid; pair < bones * most; pair += WG) {
loop {
if (!(i >= most)) { break; }
i -= most;
b++;
}
sprBoneDepth(rig,root,inputs,stateAt,table,bones,shapes,b,i);
i += WG;
}
}
}
fn sprBoneDepth(rig: u32,root: u32,inputs: u32,stateAt: u32,table: u32,bones: u32,shapes: u32,b: u32,i: u32) {
let rec = sprBoneRec(table,b);
let knob = sprKnob(inputs,bake[rec + 3u]);
if (i < rows[knob + 7u]) {
let s = rows[inputs + rows[knob + 6u] + i];
let ends = sprRestEnds(rig,inputs,stateAt,bake[rec],bake[rec + 1u],bake[rec + 2u]);
let depth = sprRestDepthFrom(rig,root,inputs,ends,bf(rec + 5u),sprShapeRec(inputs,s));
let d = sprDepthAt(stateAt,bones,shapes,b,s);
state[d] = depth.x;
state[d + 1u] = depth.y;
}
}
`,`fn sprRowOf(index: u32,tid: u32,list: u32,count: u32) -> u32 {
if (tid == 0u) {
var row = 4294967295u;
if (index < rows[count]) {
let at = rows[rows[list] + index];
if (rowPoses(at) && (poseEyeSees(rows[at + 1u]) || (rows[at + 48u] != 4294967295u))) {
row = at;
}
}
wgSprRow = row;
}
return workgroupUniformLoad(&wgSprRow);
}
`,`fn sprHeadOf(index: u32,tid: u32,list: u32,count: u32) {
let row = sprRowOf(index,tid,list,count);
if (row == 4294967295u) {
return;
}
let rig = rows[row];
let n = bake[rig];
let pose = rows[row + 1u];
let model = pose + n * 10u;
if (rows[row + 40u] != 4294967295u) {
if (tid == 0u) {
putScratchMat(model + n * 16u,mountRootOf(row));
}
storageBarrier();
workgroupBarrier();
}
let inputs = passWord(row,2u,0u);
let hang = rows[inputs + 14u];
if (hang != 4294967295u) {
hangRowTogether(row,rows[inputs + 5u],hang,false,tid);
storageBarrier();
workgroupBarrier();
}
springs_head(rig,pose,model,n,tid,inputs,passWord(row,2u,1u),passWord(row,2u,2u));
}
@compute @workgroup_size(WG)
fn springs_head_main(@builtin(workgroup_id) lume_wid: vec3u,@builtin(num_workgroups) lume_groups: vec3u,@builtin(local_invocation_index) tid: u32) {
let index: u32 = lume_wid.x + lume_wid.y * lume_groups.x;
sprHeadOf(index,tid,16u,17u);
}
@compute @workgroup_size(WG)
fn springs_after_head_main(@builtin(workgroup_id) lume_wid: vec3u,@builtin(num_workgroups) lume_groups: vec3u,@builtin(local_invocation_index) tid: u32) {
let index: u32 = lume_wid.x + lume_wid.y * lume_groups.x;
sprHeadOf(index,tid,18u,19u);
}
`,`fn recomposeSubtree(rig: u32,pose: u32,model: u32,node: u32) {
let pre = bake[rig + bake[rig + 6u] + node];
let end = pre + bake[rig + bake[rig + 7u] + node];
let order = rig + bake[rig + 9u];
for (var i = pre; i < end; i++) {
composeNode(rig,pose,model,bake[order + i]);
}
}
`,`fn sprNodeAt(root: u32,model: u32,node: u32) -> vec3f {
return sprScratchLinear(root) * sprScratchAt(model + node * 16u);
}
`,`fn sprPerpendicular(axis: vec3f) -> vec3f {
var out = vec3f(1.0,0.0,0.0);
if (abs(axis.y) < 0.9) {
out = vec3f(0.0,1.0,0.0);
}
return vNormalize(out - axis * dot(out,axis));
}
fn sprCapsuleSide(minDist: f32,restLen: f32,axisIn: vec3f,offset: vec3f,core: vec3f,bonePos: vec3f) -> mat4x4f {
let miss = mat4x4f(vec4f(0.0,0.0,0.0,0.0),vec4f(0.0,0.0,0.0,0.0),vec4f(0.0,0.0,0.0,0.0),vec4f(0.0,0.0,0.0,0.0));
let axis = vNormalize(axisIn);
var side = offset - axis * dot(offset,axis);
if (lenSq(side) < SPR_EPS_SQ) {
return miss;
}
side = vNormalize(side);
let ring = cross(axis,side);
let toCore = core - bonePos;
let alpha = 2.0 * minDist * dot(toCore,side);
let beta = 2.0 * minDist * dot(toCore,ring);
let gamma = restLen * restLen - lenSq(toCore) - minDist * minDist;
let rho = sqrt(alpha * alpha + beta * beta);
if ((rho < 1e-12) || (abs(gamma) > rho)) {
return miss;
}
let centre = atan2(beta,alpha);
let half = acos(clamp(gamma / rho,-1.0,1.0));
let plus = wrapAngle(centre + half);
let minus = wrapAngle(centre - half);
let psi = select(plus,minus,(abs(minus) < abs(plus)));
let normal = side * cos(psi) + ring * sin(psi);
let seat = core + normal * minDist;
return mat4x4f(vec4f(seat.x,seat.y,seat.z,1.0),vec4f(normal.x,normal.y,normal.z,0.0),vec4f(0.0,0.0,0.0,0.0),vec4f(0.0,0.0,0.0,0.0));
}
fn sprReseat(minDist: f32,restLen: f32,onSide: bool,axis: vec3f,particle: vec3f,core: vec3f,bonePos: vec3f,dirAnim: vec3f,offset: vec3f) -> mat4x4f {
let keep = mat4x4f(vec4f(particle.x,particle.y,particle.z,0.0),vec4f(offset.x,offset.y,offset.z,0.0),vec4f(0.0,0.0,0.0,0.0),vec4f(0.0,0.0,0.0,0.0));
let toTip = particle - bonePos;
let len = length(toTip);
if (len <= 0.000001) {
return keep;
}
let bare = bonePos + toTip * (restLen / len);
if (lenSq(bare - core) >= minDist * minDist) {
return mat4x4f(vec4f(bare.x,bare.y,bare.z,0.0),vec4f(offset.x,offset.y,offset.z,0.0),vec4f(0.0,0.0,0.0,0.0),vec4f(0.0,0.0,0.0,0.0));
}
if (onSide) {
let seat = sprCapsuleSide(minDist,restLen,axis,offset,core,bonePos);
if (seat[0u].w > 0.5) {
return seat;
}
}
let toCore = core - bonePos;
let dSq = lenSq(toCore);
if (dSq < SPR_EPS_SQ) {
return keep;
}
let d = sqrt(dSq);
let h = (dSq + restLen * restLen - minDist * minDist) / (2.0 * d);
let ringSq = restLen * restLen - h * h;
if (ringSq <= 0.0) {
return keep;
}
let along = toCore * (1.0 / d);
var side = toTip - along * dot(toTip,along);
if (lenSq(side) < SPR_EPS_SQ) {
side = dirAnim - along * dot(dirAnim,along);
}
if (lenSq(side) < SPR_EPS_SQ) {
side = sprPerpendicular(along);
} else {
side = vNormalize(side);
}
let seat = bonePos + along * h + side * sqrt(ringSq);
let normal = (seat - core) * (1.0 / minDist);
return mat4x4f(vec4f(seat.x,seat.y,seat.z,0.0),vec4f(normal.x,normal.y,normal.z,0.0),vec4f(0.0,0.0,0.0,0.0),vec4f(0.0,0.0,0.0,0.0));
}
fn sprDropInward(j: u32,normal: vec3f) {
let v = state3(j + 4u);
let inward = dot(v,normal);
if (inward < 0.0) {
putState3(j + 4u,v - normal * inward);
}
}
fn sprPushTip(j: u32,now: u32,minDist: f32,restLen: f32,particle: vec3f,bonePos: vec3f,dirAnim: vec3f) -> vec4f {
let center = state3(now);
var core = center;
var onSide = false;
var axis = vec3f(0.0,0.0,0.0);
if (state[now + 11u] > 1.5) {
let tail = state3(now + 3u);
let near = sprClosestOnSegment(center,tail,particle);
core = vec3f(near.x,near.y,near.z);
onSide = (near.w > 0.0) && (near.w < 1.0);
axis = tail - center;
}
var offset = particle - core;
let distSq = lenSq(offset);
if (distSq >= minDist * minDist) {
return vec4f(particle.x,particle.y,particle.z,0.0);
}
if (distSq < SPR_EPS_SQ) {
offset = particle - bonePos;
if (lenSq(offset) < SPR_EPS_SQ) {
offset = vec3f(0.0,1.0,0.0);
}
offset = vNormalize(offset);
} else {
offset = offset * (1.0 / sqrt(distSq));
}
let pushed = core + offset * minDist;
let seat = sprReseat(minDist,restLen,onSide,axis,pushed,core,bonePos,dirAnim,offset);
sprDropInward(j,xyzOf(seat[1u]));
return vec4f(seat[0u].x,seat[0u].y,seat[0u].z,1.0);
}
fn sprClearSegment(j: u32,now: u32,minDist: f32,restLen: f32,reachLen: f32,particleIn: vec3f,bonePos: vec3f,dirAnim: vec3f) -> vec4f {
var particle = particleIn;
var moved = 0.0;
let capsule = state[now + 11u] > 1.5;
let center = state3(now);
let tail = state3(now + 3u);
for (var turn = 0u; turn < SPR_SEGMENT_TURNS; turn++) {
let toTip = particle - bonePos;
let len = length(toTip);
if (len <= 0.000001) {
break;
}
let dir = toTip * (1.0 / len);
let end = bonePos + dir * reachLen;
var core = center;
if (capsule) {
core = sprClosestBetween(bonePos,end,center,tail);
}
let toCore = core - bonePos;
let along = min(reachLen,max(0.0,dot(toCore,dir)));
let off = bonePos + dir * along - core;
let clear = minDist - SPR_SEGMENT_TOLERANCE;
if (lenSq(off) >= clear * clear) {
break;
}
let dSq = lenSq(toCore);
let inside = max(0.0,minDist - SPR_SEGMENT_TOLERANCE);
if (dSq <= inside * inside) {
break;
}
let dist = sqrt(dSq);
let axis = toCore * (1.0 / dist);
let cosNow = dot(dir,axis);
let tangentSq = max(0.0,dSq - minDist * minDist);
var cosTarget = (reachLen * reachLen + tangentSq) / (2.0 * reachLen * dist);
if (reachLen * reachLen >= tangentSq) {
cosTarget = sqrt(tangentSq) / dist;
}
if (cosNow <= cosTarget) {
break;
}
var side = dir - axis * cosNow;
if (lenSq(side) < SPR_EPS_SQ) {
side = dirAnim - axis * dot(dirAnim,axis);
}
if (lenSq(side) < SPR_EPS_SQ) {
side = sprPerpendicular(axis);
} else {
side = vNormalize(side);
}
let sinTarget = sqrt(max(0.0,1.0 - cosTarget * cosTarget));
let was = particle;
particle = bonePos + axis * (cosTarget * restLen) + side * (sinTarget * restLen);
let stepped = particle - was;
let stepSq = lenSq(stepped);
if (stepSq > SPR_EPS_SQ) {
sprDropInward(j,stepped * (1.0 / sqrt(stepSq)));
}
moved = 1.0;
}
return vec4f(particle.x,particle.y,particle.z,moved);
}
fn sprSpanSq(p: vec3f,d1: vec3f,a: vec3f,b: vec3f,capsule: bool) -> f32 {
let aa = dot(d1,d1);
let r = p - a;
let cc = dot(d1,r);
var s = 0.0;
var t = 0.0;
var d2 = vec3f(0.0,0.0,0.0);
if (capsule) {
d2 = b - a;
let ee = dot(d2,d2);
let ff = dot(d2,r);
if (ee < SPR_EPS_SQ) {
if (!(aa < SPR_EPS_SQ)) {
s = min(1.0,max(0.0,-cc / aa));
}
} else if (aa < SPR_EPS_SQ) {
t = min(1.0,max(0.0,ff / ee));
} else {
let bb = dot(d1,d2);
let denom = aa * ee - bb * bb;
if (denom > SPR_EPS_SQ * aa * ee) {
s = min(1.0,max(0.0,(bb * ff - cc * ee) / denom));
}
t = (bb * s + ff) / ee;
if (t < 0.0) {
t = 0.0;
s = min(1.0,max(0.0,-cc / aa));
} else if (t > 1.0) {
t = 1.0;
s = min(1.0,max(0.0,(bb - cc) / aa));
}
}
} else if (aa >= SPR_EPS_SQ) {
s = min(1.0,max(0.0,-cc / aa));
}
let e = r + d1 * s - d2 * t;
return dot(e,e);
}
fn sprSpan(particle: vec3f,bonePos: vec3f,restLen: f32,reach: f32) -> vec3f {
let toTip = particle - bonePos;
let len = length(toTip);
if (len > 0.000001) {
return toTip * (max(len,restLen * reach) / len);
}
return vec3f(0.0,0.0,0.0);
}
fn sprSweep(inputs: u32,stateAt: u32,bones: u32,b: u32,j: u32,list: u32,count: u32,jointRadius: f32,restLen: f32,reach: f32,particleIn: vec3f,bonePos: vec3f,dirAnim: vec3f,whole: bool) -> vec4f {
let shapes = rows[inputs + 11u];
var particle = particleIn;
var moved = 0.0;
var span = sprSpan(particle,bonePos,restLen,reach);
for (var i = 0u; i < count; i++) {
let mid = bonePos + span * 0.5;
let half = 0.5 * length(span);
let s = rows[list + i];
let now = sprShapeNow(stateAt,bones,s);
if (state[now + 11u] < 0.5) {
continue;
}
let capsule = state[now + 11u] > 1.5;
let radius = state[now + 9u];
let contact = radius + jointRadius;
var centre = state3(now);
var shapeReach = 0.0;
if (capsule) {
centre = state3(now + 6u);
shapeReach = state[now + 10u];
}
let bound = half + shapeReach + contact + SPR_CONTACT_MARGIN;
if (lenSq(mid - centre) > bound * bound) {
continue;
}
let near = contact + SPR_CONTACT_MARGIN;
let spanSq = sprSpanSq(bonePos,span,state3(now),state3(now + 3u),capsule);
if (spanSq > near * near) {
continue;
}
let d = sprDepthAt(stateAt,bones,shapes,b,s);
let depth = vec4f(state[d],state[d + 1u],0.0,0.0);
let tipped = sprPushTip(j,now,min(contact,max(0.0,depth.x * radius - SPR_SEGMENT_TOLERANCE)),restLen,particle,bonePos,dirAnim);
particle = vec3f(tipped.x,tipped.y,tipped.z);
let segmentMin = min(contact,max(0.0,depth.y * radius - SPR_SEGMENT_TOLERANCE));
let clear = segmentMin - SPR_SEGMENT_TOLERANCE;
var boneMoved = false;
if (whole && ((tipped.w > 0.5) || (spanSq < clear * clear))) {
let cleared = sprClearSegment(j,now,segmentMin,restLen,restLen * reach,particle,bonePos,dirAnim);
particle = vec3f(cleared.x,cleared.y,cleared.z);
boneMoved = cleared.w > 0.5;
}
if ((tipped.w > 0.5) || boneMoved) {
moved = 1.0;
span = sprSpan(particle,bonePos,restLen,reach);
}
}
return vec4f(particle.x,particle.y,particle.z,moved);
}
fn sprWriteSwing(rig: u32,pose: u32,model: u32,root: u32,node: u32,parent: u32,delta: vec4f) {
var world = vec4f(0.0,0.0,0.0,1.0);
var parentWorld = vec4f(0.0,0.0,0.0,1.0);
for (var k = 0u; k < 2u; k++) {
var at = node;
if (k == 1u) {
at = parent;
}
let turn = sprWorldTurn(rig,pose,model,root,at);
if (k == 0u) {
world = turn;
} else {
parentWorld = turn;
}
}
putQ(pose + node * 10u,quatMul(qConj(parentWorld),quatMul(delta,world)));
composeNode(rig,pose,model,node);
}
fn sprAnimatedTip(pose: u32,model: u32,root: u32,node: u32,parent: u32,child: u32,bonePos: vec3f,modelScale: f32) -> vec4f {
var tip = bonePos;
if (child != 4294967295u) {
let m = scratchMat(model + node * 16u);
tip = sprScratchLinear(root) * limbPoint(m,poseT(pose + child * 10u),1.0);
} else {
var parentPos = vec3f(0.0,0.0,0.0);
if (parent != 4294967295u) {
parentPos = sprNodeAt(root,model,parent);
}
var dir = bonePos - parentPos;
var restLen = length(dir);
if (restLen * restLen < SPR_EPS_SQ) {
restLen = SPR_DEGENERATE_LEN * modelScale;
dir = vec3f(0.0,-1.0,0.0);
} else {
dir = dir * (1.0 / restLen);
}
tip = bonePos + dir * restLen;
}
var len = length(tip - bonePos);
if (len * len < SPR_EPS_SQ) {
len = SPR_DEGENERATE_LEN * modelScale;
}
return vec4f(tip.x,tip.y,tip.z,len);
}
fn sprSnap(j: u32,tip: vec3f,swing: vec3f) {
putState3(j + 1u,tip);
putState3(j + 4u,vec3f(0.0,0.0,0.0));
putState3(j + 7u,tip);
putState3(j + 13u,swing);
putState3(j + 10u,tip - swing);
state[j] = 1.0;
}
fn sprSpringStep(j: u32,target_: vec3f,frequency: f32,zetaIn: f32,dt: f32) {
if (dt <= 0.0) {
return;
}
let omega = 2.0 * SPR_PI * max(frequency,0.001);
let zeta = min(max(zetaIn,0.01),1.0);
let x0 = state3(j + 1u) - target_;
let v0 = state3(j + 4u);
if (zeta < 0.9999) {
let omegaD = omega * sqrt(1.0 - zeta * zeta);
let decay = exp(-zeta * omega * dt);
let c = cos(omegaD * dt);
let s = sin(omegaD * dt);
let b = (v0 + x0 * (zeta * omega)) * (1.0 / omegaD);
let x = (x0 * c + b * s) * decay;
putState3(j + 1u,target_ + x);
putState3(j + 4u,x * (-zeta * omega) + (b * c - x0 * s) * (decay * omegaD));
return;
}
let decay = exp(-omega * dt);
let b = v0 + x0 * omega;
putState3(j + 1u,target_ + (x0 + b * dt) * decay);
putState3(j + 4u,(v0 - b * (omega * dt)) * decay);
}
fn sprLimit(j: u32,limitDeg: f32,dirAnim: vec3f,dirDyn: vec3f,tipRate: vec3f) -> vec3f {
let c = dot(dirDyn,dirAnim);
let limit = limitDeg * SPR_PI / 180.0;
let cosLimit = cos(limit);
if (c >= cosLimit) {
return dirDyn;
}
var across = dirDyn - dirAnim * c;
if (lenSq(across) < SPR_EPS_SQ) {
across = sprPerpendicular(dirAnim);
} else {
across = vNormalize(across);
}
let sinLimit = sin(limit);
let out = dirAnim * cosLimit + across * sinLimit;
let wall = across * cosLimit - dirAnim * sinLimit;
let v = state3(j + 4u);
let through = dot(v - tipRate,wall);
if (through > 0.0) {
putState3(j + 4u,v - wall * through);
}
return out;
}
fn sprStepBone(rig: u32,pose: u32,model: u32,root: u32,inputs: u32,stateAt: u32,table: u32,bones: u32,b: u32) {
let rec = sprBoneRec(table,b);
let node = bake[rec];
let parent = bake[rec + 1u];
let child = bake[rec + 2u];
let above = bake[rec + 4u];
let reach = bf(rec + 5u);
let knob = sprKnob(inputs,bake[rec + 3u]);
let j = sprJoint(stateAt,b);
let dt = wgSprStep.x;
let gap = wgSprStep.y;
let modelScale = wgSprStep.z;
composeNode(rig,pose,model,node);
let bonePos = sprNodeAt(root,model,node);
let tipRead = sprAnimatedTip(pose,model,root,node,parent,child,bonePos,modelScale);
let tip = vec3f(tipRead.x,tipRead.y,tipRead.z);
let restLen = tipRead.w;
var swing = vec3f(0.0,0.0,0.0);
var swingTurn = vec4f(0.0,0.0,0.0,1.0);
var swingShift = vec3f(0.0,0.0,0.0);
if (above != 4294967295u) {
let ja = sprJoint(stateAt,above);
swingTurn = state4(ja + 16u);
swingShift = state3(ja + 20u);
swing = tip - quatRotate(qConj(swingTurn),tip - swingShift);
}
putState4(j + 16u,swingTurn);
putState3(j + 20u,swingShift);
let w = swing - state3(j + 13u);
let inited = state[j] > 0.5;
if (inited && (gap > dt)) {
let lost = 1.0 - dt / gap;
let shift = (tip - state3(j + 7u) - w) * lost;
putState3(j + 1u,state3(j + 1u) + shift);
putState3(j + 7u,state3(j + 7u) + shift);
}
let off = state3(j + 1u) - tip;
let far = max(SPR_TELEPORT_MIN,SPR_TELEPORT_LENGTHS * restLen);
let offSq = lenSq(off);
if ((!inited || !finiteWord(offSq)) || (offSq > far * far)) {
sprSnap(j,tip,swing);
return;
}
let frequency = min(max(SPR_FREQ_AT / sqrt(max(restLen,SPR_FREQ_FLOOR) / SPR_FREQ_LEN),SPR_FREQ_MIN),SPR_FREQ_MAX);
let omega = 2.0 * SPR_PI * frequency;
let zeta = rf(knob + 1u);
let airDrag = min(SPR_AIR_DRAG,2.0 * omega * (1.0 - zeta));
let zetaTotal = zeta + airDrag / (2.0 * omega);
let share = rf(knob + 2u);
var hang = (tip - bonePos) * ((1.0 - share) / restLen);
hang = vec3f(hang.x,hang.y - share * SPR_GRAVITY / (omega * omega * restLen),hang.z);
let hangLen = length(hang);
if (hangLen * hangLen < SPR_EPS_SQ) {
hang = (tip - bonePos) * (1.0 / restLen);
} else {
hang = hang * (1.0 / hangLen);
}
let force = rf(knob + 3u);
let blow = select(0.0,force * SPR_WIND_LEAN,(force > 0.0));
let sag = bonePos + hang * restLen - tip + vec3f(blow * wgSprAir.x,0.0,blow * wgSprAir.z);
let prevTip = state3(j + 7u);
let u = (tip - prevTip) * (1.0 / dt);
let lag = airDrag / (omega * omega);
let follow = zeta / (omega * dt);
putState3(j + 13u,swing);
let bodyLag = 2.0 * zeta / (omega * gap);
let bodyTip = state3(j + 10u);
let a = tip - swing - bodyTip;
putState3(j + 10u,bodyTip + a);
putState3(j + 4u,state3(j + 4u) - u);
let target_ = prevTip - u * lag - w * follow - a * bodyLag + sag;
sprSpringStep(j,target_,frequency,zetaTotal,dt);
putState3(j + 1u,state3(j + 1u) + (tip - prevTip));
putState3(j + 4u,state3(j + 4u) + u);
putState3(j + 7u,tip);
var particle = state3(j + 1u);
var dirAnim = tip - bonePos;
var dirDyn = particle - bonePos;
if ((lenSq(dirAnim) < SPR_EPS_SQ) || (lenSq(dirDyn) < SPR_EPS_SQ)) {
sprSnap(j,tip,swing);
return;
}
dirAnim = vNormalize(dirAnim);
dirDyn = vNormalize(dirDyn);
let limit = rf(knob + 5u);
if (limit < 180.0) {
dirDyn = sprLimit(j,limit,dirAnim,dirDyn,u);
}
particle = bonePos + dirDyn * restLen;
let v = state3(j + 4u);
putState3(j + 4u,v - dirDyn * dot(v - u,dirDyn));
let count = rows[knob + 7u];
if (count > 0u) {
let list = inputs + rows[knob + 6u];
let jointRadius = rf(knob + 4u);
var moved = false;
var whole = true;
var sweep = 0u;
for (var at = 0u; at < 2u * SPR_SWEEPS; at++) {
let swept = sprSweep(inputs,stateAt,bones,b,j,list,count,jointRadius,restLen,reach,particle,bonePos,dirAnim,whole);
particle = vec3f(swept.x,swept.y,swept.z);
if (swept.w < 0.5) {
break;
}
if (whole) {
moved = true;
}
sweep++;
if (sweep == SPR_SWEEPS) {
if (!whole) {
break;
}
whole = false;
sweep = 0u;
}
}
if (moved) {
dirDyn = particle - bonePos;
if (lenSq(dirDyn) < SPR_EPS_SQ) {
putState3(j + 1u,particle);
return;
}
dirDyn = vNormalize(dirDyn);
}
}
putState3(j + 1u,particle);
let delta = qFromUnit(dirAnim,dirDyn);
sprWriteSwing(rig,pose,model,root,node,parent,delta);
putState4(j + 16u,quatMul(delta,swingTurn));
putState3(j + 20u,quatRotate(delta,swingShift - bonePos) + bonePos);
}
fn sprHoldBone(rig: u32,pose: u32,model: u32,root: u32,stateAt: u32,table: u32,b: u32) -> bool {
let j = sprJoint(stateAt,b);
if (state[j] < 0.5) {
return false;
}
let rec = sprBoneRec(table,b);
let node = bake[rec];
let parent = bake[rec + 1u];
composeNode(rig,pose,model,node);
let bonePos = sprNodeAt(root,model,node);
let tipRead = sprAnimatedTip(pose,model,root,node,parent,bake[rec + 2u],bonePos,wgSprStep.z);
let dirAnim = vec3f(tipRead.x,tipRead.y,tipRead.z) - bonePos;
let dirDyn = state3(j + 1u) - bonePos;
if ((lenSq(dirAnim) < SPR_EPS_SQ) || (lenSq(dirDyn) < SPR_EPS_SQ)) {
return false;
}
sprWriteSwing(rig,pose,model,root,node,parent,qFromUnit(vNormalize(dirAnim),vNormalize(dirDyn)));
return true;
}
fn sprChain(rig: u32,pose: u32,model: u32,root: u32,inputs: u32,stateAt: u32,table: u32,bones: u32,c: u32,held: bool,follows: bool) {
let rec = table + bake[table + 6u] + c * 2u;
let first = bake[rec];
let end = first + bake[rec + 1u];
let follow = table + bake[table + 8u];
for (var b = first; b < end; b++) {
if (held) {
if (!sprHoldBone(rig,pose,model,root,stateAt,table,b)) {
continue;
}
} else {
sprStepBone(rig,pose,model,root,inputs,stateAt,table,bones,b);
}
if (follows) {
let bone = sprBoneRec(table,b);
let from_ = follow + bake[bone + 6u];
let count = bake[bone + 7u];
for (var k = 0u; k < count; k++) {
composeNode(rig,pose,model,bake[from_ + k]);
}
}
}
}
fn sprReadHead(stateAt: u32) {
wgSprMode = u32(state[stateAt + 39u]);
wgSprCarry = u32(state[stateAt + 40u]);
wgSprStep = state4(stateAt + 41u);
wgSprAir = state4(stateAt + 45u);
}
fn springs_chains(rig: u32,pose: u32,model: u32,n: u32,tid: u32,inputs: u32,stateAt: u32,table: u32) {
if (tid == 0u) {
sprReadHead(stateAt);
}
workgroupBarrier();
let mode = workgroupUniformLoad(&wgSprMode);
let held = (mode == SPR_HOLD) || (mode == SPR_SKIP);
let root = model + n * 16u;
let bones = bake[table];
let waves = bake[table + 2u];
let waveStart = table + bake[table + 5u];
for (var w = 0u; w < waves; w++) {
let end = bake[waveStart + w + 1u];
for (var c = bake[waveStart + w] + tid; c < end; c += WG) {
sprChain(rig,pose,model,root,inputs,stateAt,table,bones,c,held,(w + 1u < waves));
}
storageBarrier();
workgroupBarrier();
}
}
fn springs_end(rig: u32,pose: u32,model: u32,tid: u32,table: u32) {
let roots = bake[table + 3u];
let rootList = table + bake[table + 9u];
for (var r = tid; r < roots; r += WG) {
recomposeSubtree(rig,pose,model,bake[rootList + r]);
}
}
`,`fn sprChainsOf(index: u32,tid: u32,list: u32,count: u32) {
let row = sprRowOf(index,tid,list,count);
if (row == 4294967295u) {
return;
}
let rig = rows[row];
let n = bake[rig];
let pose = rows[row + 1u];
let model = pose + n * 10u;
let inputs = passWord(row,2u,0u);
let table = passWord(row,2u,2u);
springs_chains(rig,pose,model,n,tid,inputs,passWord(row,2u,1u),table);
storageBarrier();
workgroupBarrier();
springs_end(rig,pose,model,tid,table);
let hang = rows[inputs + 14u];
if (hang != 4294967295u) {
storageBarrier();
workgroupBarrier();
hangRowTogether(row,rows[inputs + 5u],hang,true,tid);
}
}
@compute @workgroup_size(WG)
fn springs_chains_main(@builtin(workgroup_id) lume_wid: vec3u,@builtin(num_workgroups) lume_groups: vec3u,@builtin(local_invocation_index) tid: u32) {
let index: u32 = lume_wid.x + lume_wid.y * lume_groups.x;
sprChainsOf(index,tid,16u,17u);
}
@compute @workgroup_size(WG)
fn springs_after_chains_main(@builtin(workgroup_id) lume_wid: vec3u,@builtin(num_workgroups) lume_groups: vec3u,@builtin(local_invocation_index) tid: u32) {
let index: u32 = lume_wid.x + lume_wid.y * lume_groups.x;
sprChainsOf(index,tid,18u,19u);
}
`],J$=($)=>`
`+$.map((Z)=>PO[Z]).join(""),PM=J$([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47]),TO=J$([0,48,1,49,3,4,5,6,8,50,51,10,12,13,15,17,20,52,53,54,55,56,57,29,30,33,37,41,43,58,45,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110]),vO=J$([0,48,1,49,4,5,10,13,15,19,20,22,24,26,52,53,54,111,112,56,29,30,35,41,43,59,60,61,64,67,113,74,75,76,77,78,80,81,83,84,86,87,89,92,114,94,115,96,116,98,117,100,118,103,105,119,107,120,109,121]),SO=J$([0,1,49,4,5,10,12,13,15,16,19,20,22,24,26,52,53,54,111,122,56,29,30,33,35,37,41,43,59,60,61,63,64,123,124,67,125,126,127,68,70,71,128,74,75,129,130,131,76,77,78,79,80,83,132,86,88,89,90,114,133,96,99,134,135,102,136,137,103,138,139,140,141,104,142,143,107,144,109,145]),CO=J$([0,48,1,49,3,5,10,12,13,15,16,19,20,22,24,26,52,53,54,111,122,56,57,33,35,37,41,43,45,59,60,63,64,65,66,146,123,124,67,125,126,147,113,148,127,149,150,151,68,69,70,71,128,72,152,74,153,75,154,155,156,157,158,159,160,130,161,76,86,89,96,102,137,103,162,163,107,164,165,166,167]),kO=J$([0,1,49,3,5,10,12,13,15,16,19,20,22,24,26,52,53,54,111,122,56,57,33,35,37,41,43,45,59,60,63,64,65,66,146,123,124,67,125,126,147,113,148,127,150,151,68,69,70,71,128,168,74,75,169,155,170,156,171,158,129,130,131,76,77,79,80,83,132,86,89,114,133,96,99,134,102,136,137,103,138,140,162,143,172,107,164,173,109,166,174]),yO=J$([0,1,49,3,4,5,51,10,12,15,16,19,20,22,24,26,52,54,55,111,122,56,35,41,43,59,124,125,147,151,75,175,176,177,178]),AO=J$([0,48,1,49,3,4,5,10,12,13,52,53,56,57,29,30,33,37,41,43,45,59,60,61,64,65,66,146,67,113,148,127,149,150,151,68,69,70,71,72,152,74,153,75,154,155,156,157,158,159,175,179,177,180]),gO=J$([0,1,49,3,5,10,12,13,15,16,19,20,22,24,26,52,53,54,111,122,56,57,33,35,37,41,43,45,59,60,64,65,66,146,124,67,125,126,147,113,148,127,150,151,68,69,71,128,168,74,75,169,155,170,156,171,158,175,181,177,182]),xM=J$([0,1,49,3,4,5,51,10,12,13,15,19,20,21,22,24,26,27,56,57,29,32,33,34,35,37,39,41,43,58,45,46,47,59,60,66,124,67,125,127,68,69,70,71,75,183,184,185,186,187,188,189,190,191]),DM=J$([0,1,49,3,4,5,10,12,13,14,15,16,19,20,21,22,24,26,27,192,56,57,33,35,37,41,43,58,45,46,59,60,66,124,67,126,113,127,68,69,70,71,75,158,183,185,193,186,188,194,190,195]),gZ=J$([0,48,1,49,3,4,5,6,8,50,51,10,12,13,15,17,20,52,53,54,55,56,57,29,30,33,37,41,43,58,45,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,19,22,24,26,111,112,35,113,114,115,116,117,118,119,120,121,16,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174]),AY=J$([0,1,49,3,4,5,51,10,12,15,16,19,20,22,24,26,52,54,55,111,122,56,35,41,43,59,124,125,147,151,75,175,176,177,178,48,13,53,57,29,30,33,37,45,60,61,64,65,66,146,67,113,148,127,149,150,68,69,70,71,72,152,74,153,154,155,156,157,158,159,179,180,126,128,168,169,170,171,181,182]),Q1=J$([0,1,49,3,4,5,51,10,12,13,15,19,20,21,22,24,26,27,56,57,29,32,33,34,35,37,39,41,43,58,45,46,47,59,60,66,124,67,125,127,68,69,70,71,75,183,184,185,186,187,188,189,190,191,14,16,192,126,113,158,193,194,195]),x0=[{wgsl:TO,family:gZ,entry:"reach_stand_main",kind:0,after:!1,rounds:!1,list:12,count:13,bodiesPerWorkgroup:1},{wgsl:vO,family:gZ,entry:"reach_ground_main",kind:0,after:!1,rounds:!1,list:12,count:13,bodiesPerWorkgroup:1},{wgsl:SO,family:gZ,entry:"reach_plan_main",kind:0,after:!1,rounds:!0,list:12,count:13,bodiesPerWorkgroup:1},{wgsl:CO,family:gZ,entry:"reach_limb_main",kind:0,after:!1,rounds:!0,list:12,count:13,bodiesPerWorkgroup:1},{wgsl:kO,family:gZ,entry:"reach_bend_main",kind:0,after:!1,rounds:!0,list:12,count:13,bodiesPerWorkgroup:1},{wgsl:yO,family:AY,entry:"grip_hands_main",kind:1,after:!1,rounds:!1,list:14,count:15,bodiesPerWorkgroup:1},{wgsl:AO,family:AY,entry:"grip_arm_main",kind:1,after:!1,rounds:!0,list:14,count:15,bodiesPerWorkgroup:1},{wgsl:gO,family:AY,entry:"grip_bend_main",kind:1,after:!1,rounds:!0,list:14,count:15,bodiesPerWorkgroup:1},{wgsl:xM,family:Q1,entry:"springs_head_main",kind:2,after:!1,rounds:!1,list:16,count:17,bodiesPerWorkgroup:1},{wgsl:DM,family:Q1,entry:"springs_chains_main",kind:2,after:!1,rounds:!1,list:16,count:17,bodiesPerWorkgroup:1},{wgsl:xM,family:Q1,entry:"springs_after_head_main",kind:2,after:!0,rounds:!1,list:18,count:19,bodiesPerWorkgroup:1},{wgsl:DM,family:Q1,entry:"springs_after_chains_main",kind:2,after:!0,rounds:!1,list:18,count:19,bodiesPerWorkgroup:1}];var TM=new WeakMap;function wO(a,b,c){return (wO=$c0C(15)).call(this,a,b,c)}function vM($,Z,Q){for(let X=0;X<$.length;X+=3)for(let J=0;J<3;J++){let K=$[X+J];if(K<Z[J])Z[J]=K;if(K>Q[J])Q[J]=K}}function RO(a,b,c){return (RO=$c0C(16)).call(this,a,b,c)}function EO(a,b,c,d,e){return (EO=$c0C(17)).call(this,a,b,c,d,e)}function _O($,Z){let Q=Z.skinIndex===null?"node:"+Z.nodeIndex:"skin:"+Z.skinIndex,X=$.get(Q);if(!X){X=uO(Z.skinIndex);$.set(Q,X);}if(!X.nodes.includes(Z.nodeIndex))X.nodes.push(Z.nodeIndex);return X}function uO(a){return (uO=$c0C(18)).call(this,a)}function kM($,Z){let Q=$.rig;if(Q===null)return null;let X=$.asset.parsed,J=[...wY(X.nodes,[Z])],K=new Set(J),V=new Float32Array(J.length*16),Y=Q.world;J.forEach((W,P)=>V.set(Y.subarray(W*16,W*16+16),P*16));let U=[],q=new Map,z=[1/0,1/0,1/0],j=[-1/0,-1/0,-1/0],G=new Map,B=new Map,M=[];for(let W=0;W<$.asset.primitives.length;W++){let P=$.asset.primitives[W],x=X.nodes[P.nodeIndex],D=G.get(P.nodeIndex)??0;if(G.set(P.nodeIndex,D+1),!K.has(P.nodeIndex))continue;let v=$.materialSlots[W];if(U.push({index:W,data:new Float32Array(v.data),hidden:v.hidden}),v.hidden||v.data[T$.baseColor+3]<=0||v.data[T$.opacity]<=0||x.meshIndex===null)continue;let k=X.meshes[x.meshIndex]?.primitives[D];if(!k)continue;let S=EO(X,P,Y,K,B);if(S===null)continue;let C=wO(k,S,P.skinIndex!==null);if(C.length===0)continue;let E=_O(q,P);E.materials.push(W),vM(C,E.min,E.max),vM(C,z,j),M.push(C)}if(!i(z[0])||Math.max(j[0]-z[0],j[1]-z[1],j[2]-z[2])<=0.0000001)return null;let L=RO(M,z,j);let F=Float32Array.from([...L.values()].flat());let H=new Map;let N=new Map;for(let W of q.values()){for(let P of W.nodes)if(!H.has(P))H.set(P,W);for(let P of W.skins)if(!N.has(P))N.set(P,W)}let I=mO(Q);return{root:Z,nodes:J,world:V,followers:null,piecesElapsed:0,materials:U,min:z,max:j,elapsed:0,firstFrame:!0,firstDelta:0,offsetX:0,offsetY:0,offsetZ:0,velocity:[...$.nativeReleaseMotion?.get(Z)??[0,0,0]],contactPoints:F,floor:I,landed:!1,phase:"fall",pieces:[...q.values()],pieceByNode:H,pieceBySkin:N}}function mO($){let Z=$.rootMatrix,Q=Z.a[Z.o+13];return isFinite(Q)?Q:0}function RY($,Z,Q,X,J){return X(Z,Q,J)?J.height:$.floor}function yM(a,b,c){return (yM=$c0C(19)).call(this,a,b,c)}function AM($,Z,Q,X,J,K){for(let V=0;V<Z.length;V++)$.writeNodeWorld(Z[V],Q,V*16,X,J,K)}function bO($,Z){let Q=$.rig;if(Q===null)return!1;let X=TM.get($.asset);if(!X)TM.set($.asset,X=new Map);let J=X.get(Z);if(!J){let K=wY($.asset.parsed.nodes,[Z]);J=[];for(let V=0;V<$.asset.primitives.length;V++)if(K.has($.asset.primitives[V].nodeIndex))J.push(V);X.set(Z,J)}for(let K of J){let V=$.asset.primitives[K],Y=$.materialSlots[K];if(Y.hidden||Y.data[3]<=0||Y.data[T$.opacity]<=0)continue;let U=V.skinIndex===null?V.nodeIndex:Z,q=U*16,z=Q.nodeWorld(U),j=z[q],G=z[q+1],B=z[q+2],M=z[q+4],L=z[q+5],F=z[q+6],H=z[q+8],N=z[q+9],I=z[q+10];if(j*j+G*G+B*B+M*M+L*L+F*F+H*H+N*N+I*I>0.00000000000001)return!0}return!1}var EY=new WeakSet;function J7($){let Z=$.activeLayerList;for(let Q=0;Q<Z.length;Q++)if((Z[Q].clip.release?.nodes.length??0)>0&&Z[Q].targetWeight>0)return!0;return!1}function hO($,Z){for(let Q=0;Q<Z.length;Q++){let X=$.nativeRelease?.groups;if(X===void 0||!pO(X,Z[Q]))return!1}return!0}function pO($,Z){for(let Q=0;Q<$.length;Q++)if($[Q].root===Z)return!0;return!1}var _Y=0;function RM(){return _Y}function EM($,Z){if(Z===null)return;for(let Q of Z){let X=Q.layer.clip.release;if(!X)continue;let J=[];for(let K of X.nodes){if($.nativeRelease?.groups.some((Y)=>Y.root===K))continue;let V=kM($,K);if(V){J.push(V),V.firstDelta=Q.elapsed;let Y=$.nativeRelease??={groups:[],appliedStamp:-1};Y.groups.push(V),Y.appliedStamp=-1,_Y+=1}}yM($,J,X.followers),Q.layer.time=Q.time,EY.add(Q.layer)}}function lO($){let Z=$.mixer.activeLayerList;for(let Q=0;Q<Z.length;Q++){let X=Z[Q],J=X.clip.release;if(X.currentWeight>0&&X.targetWeight>0&&J&&J.nodes.length>0)return!0}return!1}function _M($,Z){let Q=new Set;for(let X of Object.values(Z??{}))if(X&&typeof X.clip==="string"&&(X.weight??1)>0)Q.add(X.clip.toLowerCase());if($.nativeRelease){let X=new Set;for(let J of Q){if($.mixer.activeLayerList.some((K)=>K.clip.name.toLowerCase()===J&&K.targetWeight>0))continue;for(let K of $.mixer.clipsByKey.get(J)?.release?.nodes??[])X.add(K)}if($.nativeRelease.appliedStamp=-1,$.nativeRelease.groups=$.nativeRelease.groups.filter(function(J){if(!X.has(J.root))return!0;for(let K of J.materials)$.materialSlots[K.index].hidden=K.hidden;return $.leftOutOwed=!0,!1}),!$.nativeRelease.groups.length)$.nativeRelease=null}for(let X of $.mixer.activeLayerList){let J=X.clip.release;if(!J||X.currentWeight<=0||X.targetWeight<=0||Q.has(X.clip.name.toLowerCase()))continue;if(J.continueWith.some((V)=>Q.has(V.toLowerCase())))continue;if(X.loop==="once"&&(X.speed>=0?X.time>=O$(X.clip):X.time<=0))continue;let K=[];for(let V of J.nodes){if($.nativeRelease?.groups.some((U)=>U.nodes.includes(V)))continue;let Y=kM($,V);if(Y){K.push(Y);let U=$.nativeRelease??={groups:[],appliedStamp:-1};U.groups.push(Y),U.appliedStamp=-1,_Y+=1}}yM($,K,J.followers)}}function gY(a,b,c,d,e){return (gY=$c0C(20)).call(this,a,b,c,d,e)}function OY($,Z){return[$.offsetX+$.velocity[0]*Z,$.offsetY+$.velocity[1]*Z-4.905*Z*Z,$.offsetZ+$.velocity[2]*Z]}function dO(a,b){return (dO=$c0C(21)).call(this,a,b)}function nO($){let Z=$.rotation;return($.min[1]+$.max[1])*0.5+(Math.abs(Z[1])*($.max[0]-$.min[0])+Math.abs(Z[4])*($.max[1]-$.min[1])+Math.abs(Z[7])*($.max[2]-$.min[2]))*0.5}function SM(a,b,c){return (SM=$c0C(22)).call(this,a,b,c)}function CM(a,b,c){return (CM=$c0C(23)).call(this,a,b,c)}function OZ($,Z=K$){let{nativeRelease:Q,rig:X}=$;if(!Q||X===null||Q.appliedStamp===X.worldStamp)return;Pa(Q,X,Z);}function uM(a,b,c){return (uM=$c0C(24)).call(this,a,b,c)}function mM($){let Z=$.nativeRelease;if(Z===null)return;Qa(Z,$);}function iO($,Z){for(let Q of $.pieces)if(Q.clear&&Q.materials.includes(Z))return!0;return!1}function X1($,Z,Q,X,J,K){if($===null)return;{if((ba=Ra($,Z,Q,K,J,X))!==aa)return ba}}function fM($,Z,Q){if(Q!==null)return $.pieceBySkin.get(Q);return Z!==null?$.pieceByNode.get(Z):void 0}function J1($,Z,Q,X=!1){if($===null)return!1;for(let J of $.groups){if((X||J.phase==="pieces"||J.phase==="clear")&&fM(J,Z,Q))return!0;}return!1}function K1($){return $?.groups.some((Z)=>Z.phase!=="clear"||Z.followers!==null&&Z.piecesElapsed<2)??!1}var tO=0.5,$6=256,wZ=64,Y1=$6*wZ,mY=4294967295,bY=1397774158,RZ=Y1-1,hY=RZ,pY=Math.fround(150000000000000000000000000000000000000),aO=`@group(0) @binding(0) var<storage, read> palette: array<f32>;
@group(0) @binding(1) var<storage, read> words: array<u32>;

struct Point {
  @builtin(position) at: vec4f,
  @location(0) @interpolate(flat) bits: u32,
}

@vertex fn vs(@builtin(vertex_index) p: u32) -> Point {
  let x = p % ${$6}u;
  let y = p / ${$6}u;
  var out: Point;
  out.at = vec4f((f32(x) + 0.5) / ${$6}.0 * 2.0 - 1.0, 1.0 - (f32(y) + 0.5) / ${wZ}.0 * 2.0, 0.0, 1.0);
  let at = words[p];
  out.bits = ${bY}u;
  if (at != ${mY}u) {
    out.bits = bitcast<u32>(palette[at]);
  }
  return out;
}

@fragment fn fs(point: Point) -> @location(0) u32 {
  return point.bits;
}
`,pM=0,U1=1,q1=2,rO=["pose","palette","seen"],fY=new WeakMap,eO="lume-pose-proof";function EZ($){return hM($.limits,"maxStorageBuffers","vertex",1).limit>0}function z1($,Z){let Q=fY.get($);if(Q?.generation===$.generation)return Q;let X=$.getBindGroupLayout([uY(0,1,"read-only-storage"),uY(1,1,"read-only-storage")],"lume pose proof"),J=$.warmScope(()=>$.getRenderPipeline(eO,function(){let V=$.shaderModule(aO,"lume pose proof");return{label:"lume pose proof",layout:Z.createPipelineLayout({bindGroupLayouts:[X]}),vertex:{module:V,entryPoint:"vs"},fragment:{module:V,entryPoint:"fs",targets:[{format:"r32uint"}]},primitive:{topology:"point-list"}}}),"late"),K={generation:$.generation,layout:X,handle:J};return fY.set($,K),K}function _Z($){let Z=fY.get($);return Z?.generation===$.generation?Z:null}function lM(a,b,c){return (lM=$c0C(25)).call(this,a,b,c)}function dM(a,b,c,d){return (dM=$c0C(26)).call(this,a,b,c,d)}function lY(a,b){return (lY=$c0C(27)).call(this,a,b)}var cM=new WeakMap;function nY($){let Z=cM.get($);if(Z===void 0){let Q=e7($);cM.set($,Z={model:Q.restModel,bindCorrection:Q.bindCorrection})}return Z}function S$($){return $.rig??nY($.asset.parsed)}function M1($){return{spec:$,builtForParent:0,remaps:[],parentNodeByChildNode:null,hangByChildNode:null,noBoneRest:null,draw:null,unit:1}}function X6($,Z){return $?.parentNodeByChildNode?.[Z]??-1}function Qw($,Z,Q,X){let J=Q[Z]??Z,K=$.getBoneByName(J);return K?.isJoint?K.index:rM(X,J)?.index??-1}var $F="neutral_bone",Xw=new WeakMap;function Jw($,Z,Q,X){let J=Z.joints.length,K=new Int32Array(J),V=[],Y=0,U=!1,q=!1;for(let z=0;z<J;z++){let j=Z.joints[z],G=$.nodes[j]?.name,B=Q[j]??-1;if(K[z]=B,B>=0)continue;if(G===$F){U=!0;continue}Y++;let M;Zw:{let $$27=$.nodes,Z$31=j;{let $=$$27,Z=Z$31;for(let X=$[Z]?.parent;X>=0;X=$[X]?.parent)if(Q[X]>=0){M=X;break Zw;}M=-1;}}if(M>=0)q=!0,X[j]=M;else V.push(G||`#${j}`)}return{remap:{parentNode:K,noBone:U,unboundCount:Y,hangs:q},unhung:V}}function iY($,Z,Q){let X=[];Z.forEachJoint((F)=>X.push(F));let J=eM(X,(F)=>F.name),K=new Int32Array($.nodes.length).fill(-1),V=e7($).restModel,Y=Z.shape.restModel,U=-1,q=0,z=0,j=[];for(let F of $.skins){for(let H of F.joints){let N=$.nodes[H]?.name;let I=N?K[H]=Qw(Z,N,Q,J):-1;if(I<0)continue;if(U<0)U=cY(V,z=H*16)/cY(Y,q=I*16);let W=nM(V,z,H*16);if(W){j.push(nM(Y,q,I*16)/W)}}}let G=new Int32Array(K.length).fill(-1),B=[],M=[];for(let F of $.skins){let H=Jw($,F,K,G);B.push(H.remap),M.push(H.unhung)}let L=B.some((F)=>F.noBone)?Q6($):null;return{byNode:K,hangByNode:G,remaps:B,noBoneRest:L,unhungBySkin:M,unit:10**Math.round(Math.log10(U*(j.sort((F,H)=>F-H)[j.length>>1]??1)))||1}}function nM($,Z,Q){return c($[Q+12]-$[Z+12],$[Q+13]-$[Z+13],$[Q+14]-$[Z+14])}function F1($,Z,Q,X,J){for(let K=0;K<16;K++)X[J+K]=$[Z+K]*(K<12?Q:1)}function oY($,Z,Q){for(let X=0;X<16;X++)if(~X&3)$[Z+X]*=Q}function L1($,Z,Q){if(S0(Q.skeleton)===Z.builtForParent&&Z.remaps.length===$.asset.parsed.skins.length)return;let{byNode:X,hangByNode:J,remaps:K,noBoneRest:V,unhungBySkin:Y,unit:U}=iY($.asset.parsed,Q.rig,Z.spec.map),q=[...new Set(Y.flat())];if(Z.remaps=K,Z.parentNodeByChildNode=X,Z.hangByChildNode=J,Z.noBoneRest=V,Z.unit=U,Z.builtForParent=S0(Q.skeleton),q.length===0)return;let z=aM(Xw,$.asset);if(z.has(Q.modelId))return;z.add(Q.modelId);let j=`model-skin-child-unbound-joints:${j1(`${$.modelId} ${Q.modelId}`,160)}`,G=[];Q.rig.forEachJoint(function(F){if(F.name)G.push(F.name)});let B=q.join(", "),M=G.join(", "),L=`skinned child model "${$.modelId}" (attachment: { skin: true } on a child of "${Q.modelId}") has ${q.length} joint${q.length===1?"":"s"} that match no bone on the parent's rig, with no matching bone above them: ${B}. Those joints keep the garment's own motion at the body's root and do not follow the body's bones. Bones match by name (case-insensitive). The parent's bones are: ${M||"(none)"}. Fix: rename one of those joints, or a joint above them, to the body bone it hangs from, or map it: attachment: { skin: { map: { "${q[0]}": "<parent bone>" } } }.`;__sc.warn(`[model] ${L}`),G1({code:"model-skin-child-unbound-joints",key:j,message:L,data:{childModel:$.modelId,parentModel:Q.modelId,unbound:B,parentBones:M}})}var iM=new WeakMap;function Kw($,Z){let Q=$.parentNodeByChildNode;if(Q===null||Z.release!==void 0)return!1;let X=B1(Z);if(!X||X.scalars||X.weights)return!1;let J=iM.get(Q);if(J===void 0)iM.set(Q,J=new WeakMap);let K=J.get(Z);if(K!==void 0)return K;let V=[...X.nodes].every((Y)=>Q[Y]>=0);return J.set(Z,V),V}function H1(a){return (H1=$c0C(28)).call(this,a)}function sY($){return $.parentNodeByChildNode!==null&&$.remaps.some((Z)=>Z.hangs)}var oM=new WeakMap;function ZF(a,b){return (ZF=$c0C(29)).call(this,a,b)}var dY=new Uint8Array(0),sM=new Float32Array(16),Z6=new Float32Array(16),uZ=new Float32Array(16),tM=new WeakMap;function N1(a,b,c,d,e){return (N1=$c0C(30)).call(this,a,b,c,d,e)}function tY($,Z,Q,X,J,K,V,Y){let U=Z.parentNodeByChildNode;if(U===null)return!1;return mZ(S$($),$.asset.parsed.nodes,U,Z.hangByChildNode,Z.noBoneRest,Q,X,J,K,V,Y,Z.unit)}function mZ(a,b,c,d,e,f,g,h,i,j,k){return $c0C(31).apply(this,arguments)}function W1($,Z){return $.hangByChildNode?.[Z]??-1}var Vw=1;function YU($,Z){return Z>0?`lume-pose-${$}/sg${Z}`:`lume-pose-${$}`}var u8=0,Z0=1,V$=2,Y8=3,V8=4,Uw=3,CU=4,kU=128|8|4,qw=2,yU=4,UL=0.0001,qL=0.1,XF=new WeakMap,B7=0,Y7=null;function zL(){return B7}var C1=new WeakMap,_=new WeakMap,JF=new WeakSet,zw=0,UU=4096;function p1($,Z,Q,X){return O1(()=>$.createBuffer({label:Z,size:Q*4,usage:X}))}function P1($,Z,Q,X){let J=Z9(Uint32Array,Q);return{buffer:p1($,Z,Q,kU),words:Q,ranges:new PU(Q,X),label:Z,alignWords:X,generation:0,mirror:J,mirrorF32:new Float32Array(J.buffer),guarding:!1,guard:new Uint32Array(16),guarded:0}}function GL($,Z,Q){let X=$.device,J=Z.words-Z.ranges.freeTotal,K=Math.max(Math.ceil((J+Q)*bF),Z.words+Q+Z.alignWords),V=Math.ceil(K/Z.alignWords)*Z.alignWords,Y=p1(X,Z.label,V,kU);if("cpuCurrent"in $&&!$.cpuCurrent){{let q=X.createCommandEncoder({label:`${Z.label} growth`});q.copyBufferToBuffer(Z.buffer,0,Y,0,Z.words*4),X.queue.submit([q.finish()])
}}else k1(X,Y,Z);$.retired.push({buffer:Z.buffer,frame:"cpuCurrent"in $?$.frame:HU()}),Z.buffer=Y,Z.ranges.grow(V),Z.words=V,Z.generation+=1;let U=Z9(Uint32Array,V);U.set(Z.mirror),Z.mirror=U,Z.mirrorF32=new Float32Array(U.buffer)}function k1($,Z,Q){let X=Q.ranges.allocatedHighWater;if(X>0)$.queue.writeBuffer(Z,0,Q.mirrorF32,0,X)}function k$($,Z,Q,X){$.queue.writeBuffer(Z.buffer,Q*4,X);Z.mirrorF32.set(X,Q);if(Z.guarding){Va(Z,Q,X);}}function pZ($,Z,Q,X){let J=$;if(Z+2>J.length)J=new Uint32Array(J.length*2),J.set($);return J[Z]=Q,J[Z+1]=X,J}function KF($,Z,Q){if(Q<=Z.ranges.freeTotal)return;if(!("cpuCurrent"in $))AU($);let X=Q-Z.ranges.freeTotal;if(X>0)GL($,Z,X)}function BL($,Z,Q,X){let J=(U,q)=>Math.ceil(q/U.alignWords)*U.alignWords;let K=Z.asset.parsed.skins;let V=0;let Y=J($.bake.page,X);for(let U=0;U<Z.skins.length;U++){V+=2*J($.page,Z.skins[U].data.length);if(Q(U)){Y+=J($.bake.page,D5(K[U]?.joints.length??0));}}KF($,$.page,V),KF($.bake,$.bake.page,Y)}function U6($,Z,Q){let X=Z.ranges.allocate(Q);while(X===null)GL($,Z,Q),X=Z.ranges.allocate(Q);return X}function jw($){let Z=XF.get($);if(Z!==void 0)return Z;let Q={device:$,page:P1($,"lume pose bake",UU,1),rigs:new WeakMap,clips:new WeakMap,blocks:new Set,skinTables:new WeakMap,wornTables:new Map,rigidTables:new Map,passTables:new WeakMap,retired:[]};return XF.set($,Q),Q}function qU($,Z){for(let Q=$.length-1;Q>=0;Q--){if(Z-$[Q].frame<Uw)continue;$[Q].buffer.destroy(),$.splice(Q,1)}}function l1($,Z){let Q=$.page.ranges.allocate(Z.length);if(Q===null)AU($),Q=U6($,$.page,Z.length);return $.device.queue.writeBuffer($.page.buffer,Q*4,Z),$.page.mirror.set(Z,Q),Q}function AU($){for(let Z of $.blocks){if(Z.holders>0)continue;let Q=Z.clip?.deref();if(Q)VL([Q],[$.page.mirror.slice(Z.at,Z.at+Z.words)]);Z.keys.delete(Z.key.deref?.()??Z.key),$.page.ranges.free(Z.at,Z.words),$.blocks.delete(Z)}}function M7($,Z,Q,X,J){let K=Object.assign({at:l1($,Z),words:Z.length,holders:0,keys:Q,key:X instanceof Object?new WeakRef(X):X},J);return $.blocks.add(K),Q.set(X,K),K}function f8($,Z){if(!$.bakeHolds.has(Z))$.bakeHolds.add(Z),Z.holders+=1;return Z.at}function d1($,Z=null){let Q=$.table.bake,X=$.parsed,J=Q.rigs.get(X.meshes);if(!J){let K=Z??$Z(X);J=M7(Q,K,Q.rigs,X.meshes,{rigWords:K})}return f8($,J),J}function Bw($,Z,Q){let X=Q.nodes.length,J=H$($.clips,Z.channels);return J.get(X)??M7($,KL(Z,X),J,X,{clip:new WeakRef(Z)})}var VF=new Float32Array(16),YF=new Float32Array(16);function UF($,Z,Q,X,J){let K=$.skinBind,V=$.asset.parsed,Y=K?.parentNodeByChildNode??null;if(K===null||Y===null||Z<0||Z>=V.nodes.length)return-2;let U=Y[Z];if(U>=0)return X.fill(0,J,J+16),X[J]=X[J+5]=X[J+10]=K.unit,X[J+15]=1,U;let q=K.hangByChildNode?.[Z]??-1;if(q>=0&&Y[q]>=0){k0(Q,q*16,YF,0);f(YF,0,Q,Z*16,X,J);oY(X,J,K.unit);return Y[q];}if(K.noBoneRest!==null&&(Z+1)*16<=K.noBoneRest.length&&V.nodes[Z]?.name==="neutral_bone")return d0(X,J,K.noBoneRest,Z*16,16),-1;let z=S$($).bindCorrection;if(z!==null)f(z,0,Q,Z*16,X,J);else d0(X,J,Q,Z*16,16);return-1}var qF=new WeakMap;function zF($){let Z=qF.get($);if(Z===void 0)Z=f0($.nodes),qF.set($,Z);return Z}var I1=new Float32Array(16),jF=new Float32Array(16);function Mw($,Z,Q,X,J){let K=$.table.bake,V=Z.skinBind,Y=V?.remaps[Q];if(V===null||Y===void 0||V.parentNodeByChildNode===null)return null;if(J!==null&&(J.skinBind?.parentNodeByChildNode??null)===null)return null;let U=Z.asset.parsed,q=J===null?"":`|${_8(J.asset.parsed)}|${JSON.stringify(J.skinBind?.spec.map??{})}`,z=`${_8(U)}|${Q}|${_8(X)}|${JSON.stringify(V.spec.map)}${q}`,j=K.wornTables.get(z);if(j)return f8($,j);let G=U.skins[Q];let B=zF(U);let M=J===null?null:zF(J.asset.parsed);let L=G.joints.length;let F=new Int32Array(L).fill(-1);let H=new Float32Array(L*16);for(let N=0;N<L;N++){let I=N*16,W=G.joints[N],P=UF(Z,W,B,I1,0);if(P===-2){H[I]=H[I+5]=H[I+10]=H[I+15]=1;continue}if(J!==null&&M!==null&&P>=0){if(P=UF(J,P,M,jF,0),P===-2)P=-1;f(jF,0,I1,0,VF,0),I1.set(VF)}f(I1,0,G.inverseBindMatrices,I,H,I),F[N]=P}return f8($,M7(K,P5(F,H),K.wornTables,z))}function ML($,Z,Q){let X=$.table.bake,J=Z.skins[Q],K=Z.nodes.length;return f8($,X.skinTables.get(J)??M7(X,P5(J.joints.map((V)=>V>=0&&V<K?V:-1),J.inverseBindMatrices),X.skinTables,J))}function q6($){let Z=C1.get($);if(Z?.device===$.device)return Z;let Q=$.device;let X=Math.max(1,iF(Q)/4);let J=Z9(Uint32Array,4096);let K=tU(Q,$.pipelines,!H7($.pipelines));let V={device:Q,pipelines:$.pipelines,bake:jw(Q),scratch:P1(Q,"lume pose scratch",UU,4),page:P1(Q,"lume pose palettes",Math.ceil(UU/X)*X,X),state:P1(Q,"lume pose pass states",4096,4),world:null,worldBytes:0,rowsBuffer:null,rowsBufferWords:0,mirror:J,mirrorF32:new Float32Array(J.buffer),ranges:new PU(J.length-T.words),dirty:new Uint32Array(64),dirtyCount:0,poseAt:0,poseCap:0,poses:[],jobAt:0,jobCap:0,jobs:[],mountAt:0,mountCap:0,mounts:[],waveLists:x0.map(()=>({at:-1,cap:0,count:0})),readbacks:[],passes:[],wanted:[],kindRounds:[0,0,0],reachHolders:[],reachList:{at:-1,cap:0,count:0},blendChunks:{at:-1,cap:0,count:0},blendChunksStale:!1,springsShown:!0,posePressure:1,roomRead:-1,roomRun:0,roundsHeld:[new Map,new Map,new Map],wavesStale:!1,freshJobs:[],blendStale:[],heapT:[],heapC:[],due:[],bodies:new Set,unposed:[],animating:0,nowT:NaN,prevT:NaN,nowC:NaN,prevC:NaN,epochC:NaN,frameSeconds:0,frame:0,dispatchedFrame:-1,inFrame:!1,dispatches:0,drawsMotion:!0,lookStands:!1,seenGated:!1,originOwed:!1,seenWatch:null,seenHost:{scratch:new Float32Array(0),placed:new Float32Array(0)},flushBys:["","","",""],flushModes:new Uint8Array(CU),flushCount:0,flushedFrame:-1,kernel:K,readsMirror:new Float32Array(0),readPlane:null,cpuFrames:0,reachOwed:!1,reachWalksOut:!1,reachHands:!1,cpuCurrent:!0,cpuAhead:!1,cpuCopy:null,pagePairs:new Uint32Array(64),readPairs:new Uint32Array(16),groups:null,retired:[],carry:null,carryBytes:0,proof:{state:QJ.has(Q)?"agree":"owed",body:null,leaves:!1,gap:0,rows:0},census:{bodies:0,mounts:0,members:0,carried:0,edges:0,mixerEdges:0,uploads:0,uploadWords:0,animating:0,places:0,wholes:0,stated:0,heads:0,writes:new Float64Array(K6.length),form:"waiting",refused:null,proof:"owed",proofGap:0,cpuFrames:0,reachOutFrames:0,cpuUploads:0,cpuCopies:0,seen:{mode:"none",flushes:[],views:0,eyes:0,lights:0,judged:0,seen:0,why:[],bodies:[],pressure:1,room:0,reaching:0,cadences:[0,0,0,0],watch:{left:QN.has(Q)?0:LU,frames:0,bodies:0,missed:0,missedFrames:0,unrun:0,moved:0}},nodes:0,blended:0,idleAsked:[],pages:{bake:{words:0,growths:0},scratch:{words:0,growths:0},page:{words:0,growths:0},state:{words:0,growths:0}}},origin:new Float64Array(3),view:new Float32Array(s4),movesUntil:-1/0};return V.poseAt=G$(V,16),V.poseCap=16,V.jobAt=G$(V,16*_0.words),V.jobCap=16,V.mountAt=G$(V,4),V.mountCap=4,$Q(V),C1.set($,V),V}function q0($){return _.get($)??null}function FL($,Z){let Q=_.get($);if(Q===void 0||Q.row<0||Q.table.mirror[Q.row+R.morph]===A)return-1;let X=Q.morphAt;for(let J=0;J<Z;J++)X+=Q.parsed.meshes[J].targetNames.length*2;return X}function HL($){let Z=C1.get($);if(Z===void 0)return;C1.delete($);for(let Q of[...Z.bodies])b0(Q.key);Qq(Z);for(let Q of[Z.scratch,Z.page,Z.state])Q.buffer.destroy();Z.rowsBuffer?.destroy(),Z.world?.release(),Z.carry?.release();for(let Q of Z.readbacks)Q.buffer.destroy();qU(Z.retired,1/0),AU(Z.bake)}function G$($,Z){let Q=$.ranges.allocate(Z);while(Q===null){{let v$61;{let Q$75=Q;{let Q=Q$75;let X=Math.max($.mirror.length*2,$.mirror.length+Z*2),J=Z9(Uint32Array,X);J.set($.mirror),$.mirror=J,$.mirrorF32=new Float32Array(J.buffer),$.ranges.grow(X-T.words),Q=$.ranges.allocate(Z)
v$61=Q;}}Q=v$61}}return Q+T.words}function B$($,Z,Q){$.ranges.free(Z-T.words,Q)}function o0($,Z,Q){$.mirror[Z]=Q,M0($,Z,Z+1)}function M0($,Z,Q){if(Q<=Z)return;let X=$.dirtyCount;if(X+2>$.dirty.length)$.dirty=E1($.dirty,$.dirty.length*2);$.dirty[X]=Z,$.dirty[X+1]=Q,$.dirtyCount=X+2}function $Q($){let Z=$.mirror;Z[T.poseList]=$.poseAt,Z[T.poseCount]=$.poses.length,Z[T.jobList]=$.jobAt,Z[T.jobCount]=$.jobs.length,Z[T.mountList]=$.mountAt,Z[T.mountCount]=$.mounts.length,M0($,0,T.words),$.blendChunksStale=!0}var aY=[];function Fw($,Z){return Z.row>=0&&$.mirror[Z.row+R.morph]!==A?Z.morphTargets:0}function Lw($){$.blendChunksStale=!1;let Z=$.poses;aY.length=Z.length;let Q=0;for(let K=0;K<Z.length;K++){Q+=Math.ceil((aY[K]=3*(Z[K].blendWords?.[0]??Z[K].nodes)+Fw($,Z[K]))/zV);}let X=$.blendChunks;gU:{let Z$32=X,Q$21=Q;{let Z=Z$32,Q=Q$21;if(Q<=Z.cap)break gU;Xa(Z,$,Q);}}let J=$.mirror;X.count=J[T.blendCount]=aF(J,X.at,aY),J[T.blendList]=X.at,M0($,X.at,X.at+X.count),M0($,T.blendShift,T.blendCount+1)}function NL($,Z,Q,X,J){let K=G$($,Q*2*X);return $.mirror.copyWithin(K,Z,Z+J*X),B$($,Z,Q*X),M0($,K,K+J*X),K}var nZ={items:"poses",at:"poseAt",cap:"poseCap",index:"poseIndex"},U7={items:"mounts",at:"mountAt",cap:"mountCap",index:"mountIndex"};function iZ($,Z,Q){let X=$[Z.items];if(X.length===$[Z.cap]){{$[Z.at]=NL($,$[Z.at],$[Z.cap],1,X.length);$[Z.cap]*=2;
}}Q[Z.index]=X.length,X.push(Q),y1($,Z,Q),$Q($)}function y1($,Z,Q){if($.wavesStale||=Q.passTable>=0,$.blendChunksStale=!0,Q[Z.index]>=0)o0($,$[Z.at]+Q[Z.index],Q.row)}function A1($,Z,Q){let X=Q[Z.index];if(X<0)return;let J=$[Z.items],K=J.pop();if(K!==void 0&&K!==Q)J[X]=K,K[Z.index]=X,y1($,Z,K);Q[Z.index]=-1,$Q($)}function Hw($){$.wavesStale=!1;let{poses:Z,reachHolders:Q}=$;Q.length=0;for(let X=0;X<Z.length;X++)if(T1(Z[X],m0,!1))Q.push(Z[X]);for(let X=0;X<x0.length;X++){let J=x0[X],K=$.waveLists[X],V=0;for(let Y=0;Y<Z.length;Y++)if(T1(Z[Y],J.kind,J.after))V++;if(J.kind===m0){K.count=V;continue}gU$:{let Z=K,Q=V;if(Q<=Z.cap)break gU$;Xa(Z,$,Q);}V=0;for(let Y=0;Y<Z.length;Y++)if(T1(Z[Y],J.kind,J.after))$.mirror[K.at+V++]=Z[Y].row;if(K.count=V,V>0)M0($,K.at,K.at+V);o0($,J.list,Math.max(K.at,0)),o0($,J.count,V)}}function Nw($,Z,Q){let{reachHolders:X,reachList:J}=$;gU$$:{let Z=J,Q=X.length;if(Q<=Z.cap)break gU$$;Xa(Z,$,Q);}let K=Z!==E$,V=$.mirror,Y=$.state.mirrorF32,U=$.cpuCurrent,q=!1,z=!1,j=0,G=!1;for(let B=0;B<X.length;B++){let M=X[B],L=M.passes[m0];if(L===null||M.row<0)continue;let F=K;if(!F&&M.eyeIn){F=(V[M.row+R.flags]&E9)!==0;let I=$.mirrorF32[L.inputs+$0.seen],W=M.character?.rig?.rootMatrix;F||=fV($.view,I,W?W.a:M.root,W?W.o:0,M.reachIn,$.posePressure)}if(!K)M.reachIn=F;if(!F)continue;let H=M.character?.passes,N=H?.reach?.standSupportFrame(H.heldFrames,V,L.inputs)??-1;if(N>=0)M0($,L.inputs+N,L.inputs+N+7),M0($,L.inputs+$0.origin,L.inputs+$0.origin+6);if(U&&L.state>=0&&Y[L.state+a8.stood]===Q&&Y[L.state+a8.away]<1)q=!0;if(U&&V[L.inputs+$0.effectors]>0)z=!0;if(V[J.at+j]!==M.row)V[J.at+j]=M.row,G=!0;j++}if(G)M0($,J.at,J.at+j);V[T.reachList]=Math.max(J.at,0),V[T.reachCount]=j,J.count=j,$.reachOwed=q,$.reachHands=z}function Ww($,Z,Q){if(Z.row<0)return!0;let X=$.mirror[Z.row+R.flags];if(Z.heldSeen||(X&t8)!==0||Z.wearer!==null||Z.seenWith!==null)return!0;if((X&JZ)!==0)return!1;let J=aL(Z,rL);if(!(J[3]>=0))return!0;let K=Math.min(Q.eyes,Q.planes.length);$:for(let V=0;V<K;V++){let Y=Q.planes[V];for(let U=0;U<24;U+=4)if(Y[U]*J[0]+Y[U+1]*J[1]+Y[U+2]*J[2]+Y[U+3]<-J[3])continue $;return!0}return!1}var Iw=2,xw=4,zU=null;function WL($){zU=$}function Dw($){if(zU!==null){$.posePressure=zU;return}let Z=NU;if(Z.serial===$.roomRead)return;$.roomRead=Z.serial;if(Z.word<0){Za($);}else if(Z.word>0&&++$.roomRun>=xw){_a($);}}function Pw($,Z,Q){if(Z!==E$)return;let{poses:X,view:J}=$,K=J[3],V=(Q||$.posePressure>1)&&K>0,Y=Math.max($.frameSeconds,0.004166666666666667);for(let U=0;U<2;U++){for(let q=0;q<X.length;q++){let z=X[q];if(z.row<0)continue;let j=z.wearer!==null||z.seenWith!==null;if(j!==(U===1))continue;let G=aL(z,rL),B=z.cadenceAt,M=G[0]-B[0],L=G[1]-B[1],F=G[2]-B[2],H=B[3]===$.frame-1?Math.sqrt(M*M+L*L+F*F):1/0;B[0]=G[0],B[1]=G[1],B[2]=G[2],B[3]=$.frame;let N=1;if(V&&j&&!z.reachIn&&z.role!==V8){let v$19;{let $=z;let Z=$;{Z=$a(Z)}v$19=Z;}N=v$19.cadence;}else if(V&&!z.reachIn&&!z.heldSeen&&($.mirror[z.row+R.flags]&(t8|E9))===0&&G[3]>0){let I=G[0]-J[0],W=G[1]-J[1],P=G[2]-J[2],x=Math.max(Math.sqrt(I*I+W*W+P*P)-G[3],G[3]),D=(G[3]*vw*Y+H)*K/x;N=Math.max(1,Math.min(Tw,Math.floor(Sw/D)))}if(N===z.cadence)continue;z.cadence=N,JQ($,z)}}}var Tw=4,vw=2,Sw=1;function c1($,Z){return x0[Z].kind===m0?$.reachList.count:$.waveLists[Z].count}function T1($,Z,Q){return $.row>=0&&$.passes[Z]?.after===Q}function OU($,Z,Q){if(Z.job!==null)return Z.job.words.set(Q),jU($,Z.job);if($.jobs.length===$.jobCap){{$.jobAt=NL($,$.jobAt,$.jobCap,_0.words,$.jobs.length);$.jobCap*=2;
}}let X={index:$.jobs.length,words:Q,fresh:!0};$.jobs.push(X),jU($,X),$.freshJobs.push(X),$Q($),Z.job=X}function jU($,Z){let Q=$.jobAt+Z.index*_0.words;if($.mirror.set(Z.words,Q),Z.fresh)$.mirror[Q+_0.flags]|=q2;M0($,Q,Q+_0.words)}function ZQ($,Z){let Q=Z.job;if(Z.job=null,Q===null||Q.index<0)return;let X=Q.index,J=$.jobs.pop();if(J!==void 0&&J!==Q)$.jobs[X]=J,J.index=X,jU($,J);Q.index=-1,$Q($)}function wU($,Z,Q,X,J,K){return{bindings:B7,table:$,character:Q,key:Z,mixer:X,parsed:J,role:K,wearer:null,via:null,riders:new Set,carried:new Set,row:-1,rowCap:0,poseIndex:-1,mountIndex:-1,scratch:-1,scratchFloats:0,morphAt:-1,morphTargets:0,nodes:0,layerRoom:0,skins:[],rigid:null,block:null,clips:[],clipKeys:[],bakeHolds:new Set,joint:0,root:Float32Array.from(Q?.rig?.rootMatrix.a.subarray(Q.rig.rootMatrix.o,Q.rig.rootMatrix.o+16)??t$),local:-1,hang:-1,localWords:new Float32Array(q$.floats),edgeT:1/0,edgeC:1/0,collapseEdgeT:1/0,collapseEdgeC:1/0,heapT:-1,heapC:-1,lagMs:0,posedFrame:-1,reachIn:!1,eyeIn:!0,cadence:1,cadenceAt:Float64Array.of(0,0,0,-2),reads:new Set,readFrameWords:new Float32Array(16),readSolves:!1,readWanted:-2,readSince:-1,passWrote:-1,landed:null,bound:Float32Array.of(0,0,0,-1),heldSeen:!1,walled:!1,seenWith:null,seenBy:new Set,sight:GU,unlisted:!1,held:!1,collapseUnder:null,blend:-1,blendWords:null,blendStale:!1,passTable:-1,passes:[null,null,null],movedFrame:-1,movedAt:0,animating:!1,rootCollapsed:!1,replaying:!1,rootMoves:new Float64Array(8),place:null,stated:-1,writes:new Float64Array(K6.length)}}function q7($,Z,Q){let X=U6($,$.page,Z),J=U6($,$.page,Z);B7+=1;if(x1.length<Z){bc(Z);}let K=x1.subarray(0,Z);return k$($.device,$.page,X,K),k$($.device,$.page,J,K),{slot:X,previous:J,floats:Z,table:Q,job:null,current:null,last:null,held:!1,collapsed:!1}}var x1=new Float32Array(0);function lZ($,Z){B7+=1,$.page.ranges.free(Z.slot,Z.floats),$.page.ranges.free(Z.previous,Z.floats),ZQ($,Z)}var RU=Float32Array.of(-2,0,0);function EU($,Z,Q,X){let J=P0+$9(Q,X);if(Z.scratch>=0&&Z.scratchFloats>=J)return;if(Z.scratch>=0){{$.scratch.ranges.free(Z.scratch-P0,Z.scratchFloats);
}}if(Z.scratch=U6($,$.scratch,J)+P0,Z.scratchFloats=J,k$($.device,$.scratch,Z.scratch-P0,RU),$q($,Z.row),Z.nodes!==Q)$.blendChunksStale=!0;if(Z.nodes=Q,Z.layerRoom=X,Z.row>=0)o0($,Z.row+R.scratch,Z.scratch);b8($,Z);for(let K of Z.riders)if(K.role===Z0)b8($,K)}function _U($){let Z=$.role===Z0&&$.wearer!==null?$.wearer:$,Q=Z.scratch+Z.nodes*10;return{model:Q,root:Q+Z.nodes*16,pose:Z.scratch}}function b8($,Z){if(Z.scratch<0&&Z.role!==Z0)return;let{model:Q,root:X,pose:J}=_U(Z),K=function(V,Y){if(V.table<0)return;if(V.held||V.collapsed||Z.unlisted){ZQ($,V);return}let U=Uint32Array.of(V.slot,V.previous,V.table,Q,X,Y,0,J);OU($,V,U)};for(let V of Z.skins)K(V,d6);if(Z.rigid!==null)K(Z.rigid,d6|z2);for(let V of Z.carried)RL($,Z,V);for(let V of Z.reads)aU($,Z,V)}function uU($,Z,Q){let X=_.get($);if(X===void 0||X.role===Z0||X.block!==null)return;let J=X.table,K=!1;for(let Y=0;Y<X.skins.length;Y++){let U=Z.includes(Y);if(X.skins[Y].held===U)continue;X.skins[Y].held=U,K=!0}let V=X.rigid;if(V!==null){let Y=PL(X,$,Q);if(V.table!==Y)V.table=Y,K=!0}if(K)b8(J,X)}function kw($,Z){let Q=$.scripted?.byPrimitive;if(Q===void 0||Q.size===0)return!1;let X=$.asset.primitives;for(let J of Q.keys())if(X[J]?.skinIndex===Z)return!0;return!1}function z6($){if($===null||$===void 0||$.blendStale||$.role===Z0||$.role===Y8)return;if($.collapseUnder===null&&$.blend<0)return;gc($);}function yw($){let Z=$.blendStale;for(let Q=0;Q<Z.length;Q++){let X=Z[Q];X.blendStale=!1;if(X.row>=0||X.blend>=0){Aw($,X)}}Z.length=0,$.blendChunksStale=!0}var dZ=new Uint8Array(0);function fZ($,Z){if(Z>=0&&Z<$.length&&$[Z]>=0)dZ[$[Z]]=1}function Aw(a,b){return (Aw=$c0C(32)).call(this,a,b)}function PL($,Z,Q=[]){let X=$.table.bake,J=`${_8(Z.asset)}|${Q.join(",")}`,K=X.rigidTables.get(J);if(K)return f8($,K);let V=Z.rigidPrimitives,Y=new Uint32Array(1+V.length);Y[0]=V.length;for(let U=0;U<V.length;U++)Y[1+U]=Q.includes(U)?A:Z.asset.primitives[V[U]].nodeIndex;return f8($,M7(X,Y,X.rigidTables,J))}function j6($,Z,Q=null,X=null){if(Z.rig===null)return null;let K=_.get(Z)??null;if(K!==null&&K.table!==$)b0(Z),K=null;let V=Q?.wearer??X?.wearer??null,Y=V===null?null:_.get(V)??null,U=Y?.table===$&&Y.row>=0&&(Y.role===u8||Y.role===V$),q=u8;if(U&&Q!==null)q=V$;else if(U&&X!==null)q=V8;let z=q===V8&&X!==null?hU($.bake,X.hang):null;let j=z?.at??-1;if(K?.role===q&&(q!==V$||K.wearer===Y&&K.joint===Q?.joint)&&(q!==V8||K.wearer===Y&&K.hang===j)){if(q===V$&&Q!==null)MF($,K,Q.offset,Q.hold);return K}let G=K?.root??null;if(K!==null)b0(Z);if(K=wU($,Z,Z,Z.mixer,Z.asset.parsed,q),z!==null)f8(K,z);if(G!==null)K.root.set(G);if(q===u8&&$.census.seen.watch.frames<LU&&!QN.has($.device)&&!JF.has(Z))JF.add(Z),$.census.seen.watch.left=LU;_.set(Z,K),$.bodies.add(K);let B=Z.asset.parsed,M=B.nodes.length;EU($,K,M,Z.mixer.activeLayerList.length+yU);let L=$.bake.rigs.has(B.meshes)?null:$Z(B);if(BL($,Z,(F)=>!$.bake.skinTables.has(B.skins[F]),L?.length??0),L!==null)d1(K,L);for(let F=0;F<Z.skins.length;F++)K.skins.push(q7($,Z.skins[F].data.length,ML(K,Z.asset.parsed,F))),mU($,K,F);if(Z.rigidPrimitives.length>0){K.rigid=q7($,Z.rigidPrimitives.length*C8,PL(K,Z));ow($,K);}if(q===V$&&Q!==null&&Y!==null)K.wearer=Y,K.joint=Q.joint,Y.riders.add(K),z6(Y);if(q===V8&&Y!==null)K.wearer=Y,K.hang=j,Y.riders.add(K);if(t1($,K),XQ($,K),c0(K.wearer),q===V$&&Q!==null)MF($,K,Q.offset,Q.hold),iZ($,U7,K);if(q===V8)iZ($,U7,K);DN($,K);IU();return K}function SL($,Z,Q,X){let J=_.get(Q)??null,K=J?.role===Z0?J:null,V=K!==null?K.wearer:J;if(V?.table!==$||V.scratch<0||K?.character===null)return b0(Z),!1;let Y=_.get(Z)??null,U=_8(X);if(Y!==null&&(Y.table!==$||Y.role!==Z0||Y.wearer!==V||Y.via!==K||Y.joint!==U))b0(Z),Y=null;if(Y!==null)return!0;Y=wU($,Z,Z,Z.mixer,Z.asset.parsed,Z0),Y.wearer=V,Y.via=K,Y.joint=U,V.riders.add(Y),K?.riders.add(Y),_.set(Z,Y),$.bodies.add(Y),c0(V),BL($,Z,()=>!1,0);for(let q=0;q<Z.skins.length;q++){let z=Mw(Y,Z,q,X,K?.character??null);if(z===null)return b0(Z),!1;Y.skins.push(q7($,Z.skins[q].data.length,z)),mU($,Y,q)}return b8($,Y),$.unposed.push(Y),c0(Y),!0}function mU($,Z,Q){let X=Z.skins[Q],J=Z.character?.skins[Q];if(X===void 0||J===void 0)return;let K=(J.jointCount+1)*16,V=J.data.subarray(K);if(V.length===0)return;U$($,X.slot+K,V),U$($,X.previous+K,V)}function CL(a,b){return (CL=$c0C(33)).call(this,a,b)}var gw=function($){return};function Ow(a,b,c){return (Ow=$c0C(34)).call(this,a,b,c)}function b0($){let Z=_.get($);if(Z===void 0)return;if(Z.character!==null)Z.character.bodyRows.epoch=-1;let Q=Z.table;if(_.delete($),Q.bodies.delete(Z),Z.place?.bodies.delete(Z),Z.place=null,Z.stated>=0)B$(Q,Z.stated,Y6);Z.stated=-1;for(let X of[...Z.riders])if(b0(X.key),X.character!==null)Y7?.(X.character);if(Z.wearer?.riders.delete(Z),Z.via?.riders.delete(Z),Z.role===V$)z6(Z.wearer);if(Z.seenWith?.seenBy.delete(Z),c0(Z.wearer),c0(Z.seenWith),sZ(Q.heapT,Z,!0),sZ(Q.heapC,Z,!1),Z.animating)Q.animating-=1;if(A1(Q,nZ,Z),A1(Q,U7,Z),Z.block!==null){for(let X of Z.skins)ZQ(Q,X);lZ(Q,Z.block),Z.block=null}else for(let X of Z.skins)lZ(Q,X);if(Z.skins.length=0,Z.rigid!==null)lZ(Q,Z.rigid);if(Z.rigid=null,Z.character!==null)Y7?.(Z.character);for(let X of Z.carried){wL(Q,X);}if(Z.carried.clear(),Z.reads.size>0)IU();for(let X of[...Z.reads])dH(X);if($q(Q,Z.row),Z.row>=0)B$(Q,Z.row,Z.rowCap);if(Z.row=-1,Z.scratch>=0)Q.scratch.ranges.free(Z.scratch-P0,Z.scratchFloats);if(Z.scratch=-1,Z.morphAt>=0)Q.page.ranges.free(Z.morphAt,Z.morphTargets*2);if(Z.morphAt=-1,Z.local>=0)Q.bake.page.ranges.free(Z.local,q$.floats);Z.local=-1;{let $$32=Q;{let $=$$32;let Q=Z.blendWords;if(Z.blend>=0&&Q!==null){hc($,Z,Q);}Z.blend=-1,Z.blendWords=null}}Z.collapseUnder=null;for(let X=0;X<Z.passes.length;X++)uL(Q,Z,X);if(Z.passTable>=0)B$(Q,Z.passTable,F0.words*m9);Z.passTable=-1;bL(Z,0);{let $$29=Z;{let $=$$29;for(let Z of $.bakeHolds)Z.holders-=1;$.bakeHolds.clear()}}}function kL($,Z,Q,X,J,K=!1){let V=_.get($),Y=Math.floor(Q.length/16);if(V===void 0||V.role!==u8&&V.role!==V$||V.scratch<0||Z<0||Z>=V.nodes||Y<1)return null;let U={body:V,node:Z,parts:Y,slot:q7(V.table,Y*16,-1),block:-1,words:new Float32Array(r$.offsets-r$.hold+Y*16),hosted:K,sight:J};return V.carried.add(U),z6(V),fU(U,Q,X),c0(V),U}function yL($){wL($.body.table,$);$.body.carried.delete($);z6($.body);c0($.body)}function fU($,Z,Q){let X=$.slot;if(X===null)return;let J=$.words,K=Q??hL,V=$.block>=0;for(let q=0;q<4&&V;q++)V=J[q]===Math.fround(K[q]);for(let q=0;q<$.parts*16&&V;q++)V=J[4+q]===Math.fround(Z[q]);if(V)return;J.set(K,0),J.set(Z.subarray(0,$.parts*16),4);let Y=new Uint32Array(r$.offsets+$.parts*16);Y[r$.node]=$.node,Y[r$.parts]=$.parts,new Float32Array(Y.buffer).set(J,r$.hold);let U=$.body.table;OL:{let $$33=U,Z$38=$;{let $=$$33,Z=Z$38;if(Z.block<0)break OL;$.bake.page.ranges.free(Z.block,r$.offsets+Z.parts*16),Z.block=-1}}$.block=l1(U.bake,Y);X.table=$.block;RL(U,$.body,$)}function AL($){return $.slot!==null&&_.get($.body.key)===$.body}function gL($,Z=!1){let Q=$.slot;if(Q===null)return-1;return(Z?Q.previous:Q.slot)/16}function wL($,Z){if(Z.slot!==null)lZ($,Z.slot);Z.slot=null;OL$:{if(Z.block<0)break OL$;$.bake.page.ranges.free(Z.block,r$.offsets+Z.parts*16),Z.block=-1}}function RL($,Z,Q){let X=Q.slot;if(X===null||Q.block<0||Z.scratch<0)return;if(Z.unlisted)return ZQ($,X);let{model:J,root:K}=_U(Z),V=Uint32Array.of(X.slot,X.previous,Q.block,J,K,d6|j2,d1(Z).at,Z.scratch);OU($,X,V)}var rY=new Float64Array(1);{let $={stand:bU,leave:L7};e9=$}function bU($,Z,Q,X,J,K,V=0,Y=!0){let U=_.get($);if(U===void 0||U.role===Z0)return!1;let q=U.table,z=U.passes[Z];if(z===null||z.tableWords!==J||z.inputsCap<Q.length||z.stateFloats<X||z.after!==K||z.rounds!==V||!(z.inputs>=0&&aZ(Q,q.mirror,z.inputs)))U.passWrote=q.frame;if(z===null||z.after!==K)q.wavesStale=!0;mL(q,Z,z===null?-1:z.rounds,V);let j=z;if(j===null)j={inputs:-1,inputsCap:0,state:-1,stateFloats:0,table:A,tableWords:null,after:K,rounds:V,pictureOnly:Y},U.passes[Z]=j;if(j.after=K,j.rounds=V,j.pictureOnly=Y,j.inputsCap<Q.length){if(j.inputs>=0)B$(q,j.inputs,j.inputsCap);j.inputsCap=Math.max(4,Q.length+(Q.length>>2)),j.inputs=G$(q,j.inputsCap)}if(q.mirror.set(Q,j.inputs),M0(q,j.inputs,j.inputs+Q.length),G6(q,U,QE+Z),j.stateFloats<X){if(j.state>=0)q.state.ranges.free(j.state,j.stateFloats);j.state=U6(q,q.state,X),j.stateFloats=X,k$(q.device,q.state,j.state,new Float32Array(X))}if(J!==j.tableWords){j.tableWords=J;j.table=J===null?A:f8(U,hU(q.bake,J));}return fL(q,U),cU(q,U,!0),!0}function n1($,Z,Q,X,J){let K=_.get($),V=K?.passes[Z]??null;if(K===void 0||V===null||X>V.inputsCap)return!1;return J(K.table.mirror,V.inputs),M0(K.table,V.inputs+Q,V.inputs+X),K.passWrote=K.table.frame,G6(K.table,K,XE+Z),!0}function QQ($,Z){return f8($,hU($.table.bake,Z))}var BF=new WeakMap;function F7($){let Z=_.get($)?.row??-1;return Z>=0?Z:A}function L7($,Z){let Q=_.get($);if(Q===void 0)return;if(Q.passes[Z]===null)return;if(Q.passWrote=Q.table.frame,uL(Q.table,Q,Z),fL(Q.table,Q),Q.passes.every((X)=>X===null))cU(Q.table,Q,b1(Q.mixer))}function uL($,Z,Q){let X=Z.passes[Q];if(X===null)return;if($.wavesStale=!0,mL($,Q,X.rounds,-1),X.inputs>=0)B$($,X.inputs,X.inputsCap);if(X.state>=0)$.state.ranges.free(X.state,X.stateFloats);Z.passes[Q]=null}function mL($,Z,Q,X){let J=$.roundsHeld[Z];if(Q>=0){let K=(J.get(Q)??1)-1;if(K>0)J.set(Q,K);else J.delete(Q)}if(X>=0)J.set(X,(J.get(X)??0)+1);if(X>$.kindRounds[Z])$.kindRounds[Z]=X;else if(Q===$.kindRounds[Z]&&!J.has(Q)){let K=0;for(let V of J.keys())if(V>K)K=V;$.kindRounds[Z]=K}}function fL($,Z){let Q=F0.words*m9;if(Z.passes.every((J)=>J===null)){if(Z.passTable>=0)B$($,Z.passTable,Q);Z.passTable=-1}else{if(Z.passTable<0)Z.passTable=G$($,Q);let J=$.mirror;for(let K=0;K<m9;K++){let V=Z.passes[K],Y=Z.passTable+K*F0.words;J[Y+F0.inputs]=V===null?A:V.inputs,J[Y+F0.state]=V===null?A:V.state,J[Y+F0.table]=V===null?A:V.table}M0($,Z.passTable,Z.passTable+Q)}if(Z.row>=0)o0($,Z.row+R.passes,Z.passTable>=0?Z.passTable:A);let X=Z.passes.some((J)=>J?.pictureOnly);if(X===Z.readSolves)return;Z.readSolves=X;for(let J of Z.reads)aU($,Z,J)}function hU($,Z){return $.passTables.get(Z)??M7($,Z,$.passTables,Z)}function bL($,Z){let Q=$.clips;for(let X=Z;X<Q.length;X++)Q[X].holders-=1;if(Q.length>Z)Q.length=$.clipKeys.length=Z}function ww($,Z,Q,X){let J=$.clips[Z];if(J===Q&&$.clipKeys[Z]===X)return;if(J!==void 0)J.holders-=1;Q.holders+=1,$.clips[Z]=Q,$.clipKeys[Z]=X}function MF(a,b,c,d){return (MF=$c0C(35)).call(this,a,b,c,d)}var Rw=new Float32Array(q$.floats),hL=[0,0,0,1],Ew=[0,1,2,4,5,6,8,9,10],bZ=new Float64Array(3),J6=new Float64Array(3),eY=new J0;function FF($,Z,Q,X,J){return R.layers0+Z*a.words+Q*T0.words+X*($.nodes*Q2+J*_9)}function _w($){return $.rigWords[$.rigWords[g$.morph]+1]}function uw($,Z,Q){let X=Z.character;if(X===null||Q===0||!f1(Z.mixer,"weights"))return A;if(Z.morphAt<0)Z.morphAt=U6($,$.page,Q*2),Z.morphTargets=Q,k$($.device,$.page,Z.morphAt,new Float32Array(Q*2)),X.bodyRows.morphEdge+=1;return Z.morphAt}function XQ($,Z){if(Z.role===Z0)return;let Q=Z.character,X=Q?.rig??null;if(Q!==null&&X===null)return;let J=Z.mixer,K=J.activeLayerList;if(K.length>Z.layerRoom)EU($,Z,Z.nodes,K.length+yU);let V=Q!==null&&X!==null?(Q.bones===null?0:VH(Q.bones,X,null,null,0))+(Q.boneSets?.count??0):0;let Y=(J.inertia?.offsets[0]!==null&&J.inertia!==null?1:0)+(J.inertia?.offsets[1]!==null&&J.inertia!==null?1:0);let U=d1(Z);let q=uw($,Z,_w(U));let z=q===A?0:Z.morphTargets;let j=FF(Z,K.length,V,Y,z);if(j>Z.rowCap){let x=FF(Z,K.length+qw,V+2,Y,z);let D=G$($,x);if($q($,Z.row),Z.row>=0)B$($,Z.row,Z.rowCap);Z.row=D,Z.rowCap=x,y1($,nZ,Z),y1($,U7,Z);for(let v of Z.riders){if(!oZ(v)||v.row<0)continue;o0($,v.row+R.wearer,D)}}let{mirror:G,mirrorF32:B}=$,M=Z.row;if(G[M+R.morph]!==q){if($.blendChunksStale=!0,Q!==null)Q.bodyRows.morphEdge+=1}G.fill(0,M,M+j);let L=Z.parsed;G[M+R.morph]=q;G[M+R.rig]=U.at;G[M+R.scratch]=Z.scratch;G[M+R.layers]=K.length;G[M+R.bones]=V;G[M+R.passes]=Z.passTable>=0?Z.passTable:A;G[M+R.wearer]=oZ(Z)&&Z.wearer!==null?Z.wearer.row:A;G[M+R.joint]=Z.joint;G[M+R.place]=SH(Z);B.set(Z.bound,M+R.bound);G[M+R.seenWith]=sL(Z);G[M+R.blend]=Z.blend>=0?Z.blend:A;let F=Z.local>=0?Z.local:A;G[M+R.local]=Z.role===V8?Z.hang:F,B[M+R.lag]=Z.lagMs*0.001;let H=JH(J)|(Z.role===V8?e5:0)|pL(Z),N=Q?.bodyFrame??null;if(N!==null){H|=s5;for(let x=0;x<9;x++)B[M+R.frame+x]=N[Ew[x]]}if(X!==null)B.set(Z.root,M+R.root);else {B.set(KE(L),M+R.root);}let I=XL(K);for(let x=0;x<K.length;x++){nw($,Z,x,K[x],L,U.rigWords,M+R.layers0+x*a.words,J,I);}bL(Z,K.length);let W=M+R.layers0+K.length*a.words;if(Q!==null&&X!==null){W=iw($,Q,X,W);}let P=J.inertia;if(P!==null)for(let x=0;x<2;x++){let D=P.offsets[x];if(D===null)continue;ZL(P,x,B,W,Z.nodes);let v=J.tickedT-P.elapsed[x],k=Math.fround(v),S=R.inertiaAt+x*3;if(B[M+S]=k,B[M+S+1]=v-k,B[M+S+2]=D.span,H|=x===0?t5:a5,W+=Z.nodes*Q2,z===0)continue;for(let C=0;C<D.scalars.length;C++){let E=D.scalars[C];if(E<D.materialFrom)for(let u=0;u<_9;u++)B[W+E*_9+u]=D.scalarCurves[C*_9+u]}W+=z*_9}if(G[M+R.flags]=H,M0($,M,W),Z.movedFrame=$.frame,Z.movedAt=xU(),cU($,Z,b1(J)||Z.passTable>=0),$.census.edges+=1,Q!==null)Z.rootCollapsed=X!==null&&$H(Z.root,0),Y7?.(Q)}function pL($){let Z=(K8.of=0,K8.depth=0,BU($),K8.of);let Q=$.posedFrame<0;return($.heldSeen?s8:0)|($.held?t8:0)|($.reads.size>0?E9:0)|((Z&lU)===0?JZ:0)|((Z&i1)===0?KZ:0)|(Q?0:$.cadence-1)<<$V|($.role===Y8?$2:0)|($.walled?Z2:0)}var mw=s8|t8|E9|JZ|KZ|ZV|$2|Z2;function lL(){return new Float32Array(sF)}function dL($,Z){let Q=q0($);if(Q===null||Q.walled===Z)return;Q.walled=Z,JQ(Q.table,Q)}function fw($){for(let Z of $.riders)if(oZ(Z)&&(Z.heldSeen||Z.held))return!0;for(let Z of $.seenBy)if((Z.heldSeen||Z.held)&&!(oZ(Z)&&Z.wearer!==null))return!0;return!1}function oZ($){return $.role===V$||$.role===V8}function JQ($,Z){if(Z.row<0)return;let Q=Z.row+R.flags,X=$.mirror[Q],J=X&~mw|pL(Z);if(J===X)return;if(o0($,Q,J),((J^X)&KZ)!==0&&Z.character!==null)Y7?.(Z.character)}var lU=1,i1=2,GU=lU|i1;function o1($,Z){return(($&G7)!==0?lU:0)|($!==0&&Z?i1:0)}function nL($,Z){if($.sight===Z)return;$.sight=Z,c0($.body)}function s1($){let Z=_.get($);return Z!==void 0&&((K8.of=0,K8.depth=0,BU(Z),K8.of)&i1)!==0}var K8={of:0,depth:0};function BU($){if(K8.depth>YZ){K8.of=GU;return}if(K8.of|=$.sight,K8.of===GU)return;{K8.depth+=1,$.carried.forEach(bw),$.riders.forEach(BU),$.seenBy.forEach(BU),K8.depth-=1
}}function bw($){K8.of|=$.sight}function c0($){let Z=$??null;for(let Q=0;Z!==null&&Q<=YZ;Q++){if(_.get(Z.key)!==Z)return;Z.held=fw(Z);JQ(Z.table,Z);pw:{let $$102=Z;{let $=$$102;let Z;hw:{if($.character?.stand.shut!==!0||$.heldSeen){Z=!1;break hw;}{let v$88;jc:{for(let Z of $.riders)if(!Z.unlisted){v$88=!1;break jc;}for(let Z of $.seenBy)if(!Z.unlisted){v$88=!1;break jc;}for(let Z of $.carried)if(Z.sight!==0){v$88=!1;break jc;}
v$88=aa;}if((ba=v$88)!==aa){Z=ba;break hw;}}Z=!0;}if(Z===$.unlisted)break pw;let Q=$.table;$.unlisted=Z;Q.wavesStale=!0;if(Z){{if(A1(Q,nZ,$),A1(Q,U7,$),$.scratch>=0&&$.role!==Z0)k$(Q.device,Q.scratch,$.scratch-P0,RU)
}}else{{if($.role!==Z0)iZ(Q,nZ,$);if(oZ($))iZ(Q,U7,$);z9($.key)
}}b8(Q,$);for(let X of $.riders)if(X.role===Z0)b8(Q,X)}}Z=Z.wearer??Z.seenWith}}function sL($){return $.seenWith!==null&&$.seenWith.row>=0?$.seenWith.row:A}function KQ($,Z,Q,X,J){let K=_.get($);if(K===void 0)return;let V=$.rig;if(J<0||V===null){cZ(K,0,0,0,-1);return}let Y=V.rootMatrix;k0(Y.a,Y.o,LF,0);let U=LF,q=s0(Y.a,Y.o),z=U[0]*Z+U[4]*Q+U[8]*X+U[12],j=U[1]*Z+U[5]*Q+U[9]*X+U[13],G=U[2]*Z+U[6]*Q+U[10]*X+U[14],B=q>0?h1(J)/q:NaN;if(!i(z+j+G+B)){cZ(K,0,0,0,-1);return}let M=2**Math.round(Math.log2(lw/q));cZ(K,Math.round(z/M)*M,Math.round(j/M)*M,Math.round(G/M)*M,Math.ceil(B/M+1)*M)}var lw=0.0009765625,LF=new Float32Array(16);function aL($,Z){let Q=$.bound;if(Z[3]=Q[3]>=0?Q[3]:-1,!(Q[3]>=0)||$.role===Y8)return Z[0]=Q[0],Z[1]=Q[1],Z[2]=Q[2],Z;let X=$.character?.rig??null,J=X===null?$.root:X.rootMatrix.a,K=X===null?0:X.rootMatrix.o;return Z[0]=J[K]*Q[0]+J[K+4]*Q[1]+J[K+8]*Q[2]+J[K+12],Z[1]=J[K+1]*Q[0]+J[K+5]*Q[1]+J[K+9]*Q[2]+J[K+13],Z[2]=J[K+2]*Q[0]+J[K+6]*Q[1]+J[K+10]*Q[2]+J[K+14],Z[3]=Q[3]*s0(J,K),Z}var rL=new Float64Array(4);function cZ($,Z,Q,X,J){let K=$.bound,V=J>=0?J:-1;if(K[0]===Math.fround(Z)&&K[1]===Math.fround(Q)&&K[2]===Math.fround(X)&&K[3]===Math.fround(V))return;{if((ba=mc(K,Z,Q,X,V,$))!==aa)return ba}}function $H($,Z){return $[Z]===0&&$[Z+1]===0&&$[Z+2]===0&&$[Z+4]===0&&$[Z+5]===0&&$[Z+6]===0&&$[Z+8]===0&&$[Z+9]===0&&$[Z+10]===0}function JH($){let Z=$.activeLayerList,Q=dw;Q[0]=0;let X=!1;for(let J=0;J<Z.length;J++){let K=Z[J];if(!K.override&&!K.additive&&K.maskNodes===null)Q[0]+=K.released&&K.targetWeight>0?K.channelWeight:K.targetWeight;X||=K.released}return(Q[0]>=1-n9||$.fullPoseArriving?eX:0)|(X?r5:0)}var dw=new Float64Array(1);function KH($){let Z=$.targetWeight===0||$.released?$.blendOut:$.blendIn,Q=Z>0?$.blendScale/Z:1/0;return Math.min(Q,$.spreadRate)}var HF=340282346638528860000000000000000000000,NF=new WeakMap;function nw($,Z,Q,X,J,K,V,Y,U){let{mirror:q,mirrorF32:z}=$;let j=Bw($.bake,X.clip,J);ww(Z,Q,j,X.clip);let G=Z.replaying?null:X.clock??X.line,B=X.override?l6:0;if(X.additive)B|=JV;if(X.released)B|=QV;if(X.loop==="once")B|=J2;else if(X.loop==="pingpong")B|=K2;if(Y.fullPoseArriving&&X.targetWeight<X.currentWeight&&X.currentWeight>=n9&&!X.key.includes($L))B|=XV;let M=X.loop==="once"?X.playhead:X.time,L=Y.tickedT;if(G){B|=X2;M=G.time;if($.epochC!==$.epochC){oc($,G);}L=(G.atMs-$.epochC)*0.001}q[V+a.clip]=j.at;q[V+a.flags]=B;q[V+a.maskStart]=A;q[V+a.maskEnd]=A;if(X.maskNodes!==null){let I;cw:{let $=X.maskNodes,Z=J;let Q=NF.get($);if(Q!==void 0){I=Q;break cw;}I=nc($,Z);}if(I>=0){let W=K[K[g$.preorder]+I];q[V+a.maskStart]=W,q[V+a.maskEnd]=W+K[K[g$.subtree]+I]}}z[V+a.start]=X.clipStart,z[V+a.span]=X.clipSpan,z[V+a.speed]=X.speed-X.speed===0?X.speed:0;let F=X.clipSpan;if(X.loop==="once")F=0;else if(X.loop==="pingpong")F*=2;if(F>0){if(M%=F,M<0)M+=F}z[V+a.playhead]=M-M===0?M:0,z[V+a.timeAt]=L,z[V+a.timeAtLow]=L-z[V+a.timeAt],z[V+a.weight]=X.currentWeight-X.currentWeight===0?X.currentWeight:0,z[V+a.target]=X.targetWeight-X.targetWeight===0?X.targetWeight:0;let H=KH(X);z[V+a.rate]=H>HF||H!==H?HF:H,z[V+a.floor]=JL(X,U),z[V+a.weightAt]=Y.tickedT,z[V+a.weightAtLow]=Y.tickedT-z[V+a.weightAt],z[V+a.blendFrom]=X.blendFrom;let N=X.released&&!(X.arrivalRate>0);z[V+a.arrivalFrom]=N?0:X.arrivalFrom,z[V+a.arrivalRate]=X.arrivalRate}function VH(a,b,c,d,e){return (VH=$c0C(36)).call(this,a,b,c,d,e)}function iw($,Z,Q,X){let{mirror:J,mirrorF32:K}=$,V=X;if(Z.bones!==null)V+=VH(Z.bones,Q,J,K,X)*T0.words;let Y=Z.boneSets;if(Y===null)return V;{let V$13=V;{let V=V$13;for(let U=0;U<Y.count;U++){let q=V+U*T0.words,z=U*7;J[q+T0.node]=Y.nodes[U],J[q+T0.flags]=Y.kinds[U]===Vw?VV:U2,d0(K,q+T0.turn,Y.words,z+3,4),d0(K,q+T0.move,Y.words,z,3)}return V+Y.count*T0.words
}}}function YH($,Z){if((Z.character?.rig??null)===null||Z.row<0)return;let Q=Z.row+R.root;$.mirrorF32.set(Z.root,Q),M0($,Q,Q+16),G6($,Z,rR);let X=Z.root;UH($,Z,X[12],X[13],X[14],X)}function UH($,Z,Q,X,J,K){dU($,Z);let V=Z.rootMoves;if(V[3]!==$.nowT)V.copyWithin(4,0,4);V[0]=Q,V[1]=X,V[2]=J,V[3]=$.nowT;let Y=$H(K,0);if(Y===Z.rootCollapsed)return;{if(Z.rootCollapsed=Y,Z.character!==null)Y7?.(Z.character)
}}function dU($,Z){let Q=SU(Z.mixer.bodyEntity);if(Q===Z.lagMs||Z.row<0)return;Z.lagMs=Q,$.mirrorF32[Z.row+R.lag]=Q*0.001,M0($,Z.row+R.lag,Z.row+R.lag+1),G6($,Z,$E)}function ow(a,b){return (ow=$c0C(37)).call(this,a,b)}function U$($,Z,Q){k$($.device,$.page,Z,Q)}function cU($,Z,Q){if(Q===Z.animating)return;Z.animating=Q,$.animating+=Q?1:-1}function t1($,Z){let Q=$.inFrame&&i($.prevT),X=Q?$.prevT:$.nowT;if(!i(X))return;eZ(Z.mixer,X,a1(Z,Q?$.prevC:$.nowC))}function a1($,Z){if(!i(Z))return;return Z-SU($.mixer.bodyEntity)}function n$($){let Z=_.get($);if(Z===void 0)return NaN;let Q=Z.table.nowT,X=_1();return X!==null&&(X.timeSeconds>Q||Q!==Q)?X.timeSeconds:Q}function U8($){let Z=_.get($);if(Z===void 0)return;let Q=Z.table,X=n$($);if(!i(X))return;eZ(Z.mixer,X,a1(Z,X>Q.nowT||Q.nowT!==Q.nowT?rF():Q.nowC))}function sw($){return $.unlisted&&$.edgeT!==-1/0&&$.reads.size===0&&!J7($.mixer)}function z9($){let Z=_.get($);if(Z===void 0||Z.role===Z0)return;if(Z.table.inFrame){wH(Z.table,Z);return}Z.edgeT=-1/0,z7(Z.table.heapT,Z,!0)}function qH($){let Z=_.get($);return Z!==void 0&&(Z.animating||Z.movedFrame===Z.table.frame||Z.place!==null&&nU(Z.place))}function zH($,Z){let Q=_.get($);return Q===void 0||jH(Q,Z)}function jH($,Z){if($.movedAt>Z||$.passTable>=0&&!tw($)||$.replaying||$.edgeT===-1/0||b1($.mixer))return!0;return ($.wearer!==null&&$.wearer!==$&&jH($.wearer,Z));}function tw($){iH($);let Z=$.landed;return Z!==null&&$.readSince>=0&&Z.stoodFrom>=$.readSince&&Z.stoodFrom<Z.frame&&$.passWrote<Z.stoodFrom}function nU($){return DU[0]<$.movesUntil}function iU($){let Z=_.get($);if(Z===void 0||Z.role===Z0)return;Z.replaying=!0,XQ(Z.table,Z),Z.replaying=!1}function GH($){let Z=_.get($);if(Z===void 0)return;let Q=Z.table;if(!i(Q.nowT))return;eZ(Z.mixer,Q.nowT,a1(Z,Q.nowC))}function r1($){let Z=_.get($);if(Z!==void 0&&Z.role!==Z0)XQ(Z.table,Z)}var aw=32,rw=16;function FH($,Z){$.origin.set(Z)}function LH($,Z){$.drawsMotion=Z}function HH($,Z,Q){if(Z===null){{let $$5=$.view,Z$6=0,Q$2=0,X$1=0,J$1=0;{let $=$$5,Z=Z$6,Q=Q$2,X=X$1,J=J$1;$[0]=Z,$[1]=Q,$[2]=X,$[3]=J>0?J/n4:0}}}else {{let $$6=$.view,Z$7=Z.camX,Q$3=Z.camY,X$2=Z.camZ,J$2=Q;{let $=$$6,Z=Z$7,Q=Q$3,X=X$2,J=J$2;$[0]=Z,$[1]=Q,$[2]=X,$[3]=J>0?J/n4:0}}}}function K7($,Z,Q){$[Z]=Q,$[Z+1]=Q-$[Z]}function NH($,Z,Q,X,J){let K;{let $=Q;let Z=($[s.flags]&sX)!==0?$[s.relate+tX.rows]:0;K=r.head+$[s.cap]*u$.words+$[s.runs]*WH+Z*S8.words;}let V=Z;let Y=!1;if(V?.table!==$||V.room<K){{V=tc(K,$,V,J)}Y=!0}V.over=J;let U=S1(Q,Q[s.rows]-1),q=V.at;$.census.places+=1;let v$23;{let $$39=$.mirror,Z$47=$.mirrorF32,Q$29=q,X$18=Q,J$10=X,K$6=V.ground,V$4=Y;{let $=$$39,Z=Z$47,Q=Q$29,X=X$18,J=J$10,K=K$6,V=V$4;let Y=S1(X,X[s.rows]-1),U=V||X[s.dirty]===dF||K[4]!==X[s.cap];if(!U&&Math.abs(X[Y+y0.tick]-K[0])>aw)U=!0;for(let q=0;q<3&&!U;q++)if(Math.abs(X[Y+y0.pos+q]-K[1+q])>rw)U=!0;if(U)K[0]=Math.floor(X[Y+y0.tick]),K[1]=X[Y+y0.pos],K[2]=X[Y+y0.pos+1],K[3]=X[Y+y0.pos+2],K[4]=X[s.cap];QR($,Z,Q,X,J,K,U);v$23=U;}}if(v$23)$.census.wholes+=1;$.mirror[q+r.over]=J<0?A:J;M0($,q,q+K);V.movesUntil=JR(Q,U);if(V.movesUntil>$.movesUntil)$.movesUntil=V.movesUntil;{let z=Q[s.rows],j=Q[s.tickSeconds];for(let G of V.bodies){let B=G.rootMoves;for(let L=0;L<3;L++)B[L]=Q[U+y0.pos+L]-$.origin[L];if(B[3]=$.nowT,z<2){B.copyWithin(4,0,4);continue}let M=S1(Q,z-2);for(let L=0;L<3;L++)B[4+L]=Q[M+y0.pos+L]-$.origin[L];B[7]=$.nowT-(Q[U+y0.tick]-Q[M+y0.tick])*j}}return V}var WH=2,ew=5;function QR($,Z,Q,X,J,K,V){let Y=X[s.runs],U=X[s.rows],q=X[s.cap],z=K[0],j=K[1],G=K[2],B=K[3],M=X[s.flags];if(J[3]!==0)M|=c5;if(J[4]!==0)M|=n5;$[Q+r.flags]=M,$[Q+r.runs]=Y,$[Q+r.rows]=U,$[Q+r.first]=X[s.first],$[Q+r.cap]=q,d0(Z,Q+r.relate,X,s.relate,lF),d0(Z,Q+r.juice,X,s.juice,XZ.arrived),K7(Z,Q+r.juice+XZ.arrived,X[s.juice+XZ.arrived]),K7(Z,Q+r.baseTick,z),K7(Z,Q+r.anchor,j),K7(Z,Q+r.anchor+2,G),K7(Z,Q+r.anchor+4,B);let L=(M&oX)!==0;Z[Q+r.delay]=X[s.delay],Z[Q+r.clockTick]=L?X[s.clockTick]-z:0,Z[Q+r.clockAt]=L?X[s.clockAt]-z:0,Z[Q+r.catchRate]=X[s.catchRate],Z[Q+r.slewRate]=X[s.slewRate],Z[Q+r.turnedAt]=(M&h5)!==0?X[s.turnedAt]-z:0,Z[Q+r.stand]=J[0],Z[Q+r.stand+1]=J[1],Z[Q+r.stand+2]=J[2],Z[Q+r.lift]=J[4];let F=s.fade,H=Q+r.fade;Z[H+_$.pos]=X[F+C$.pos]-j,Z[H+_$.pos+1]=X[F+C$.pos+1]-G,Z[H+_$.pos+2]=X[F+C$.pos+2]-B,d0(Z,H+_$.vel,X,F+C$.vel,3),d0(Z,H+_$.spin,X,F+C$.spin,3),d0(Z,H+_$.scale,X,F+C$.scale,3),d0(Z,H+_$.turn,X,F+C$.turn,4),Z[H+_$.start]=X[F+C$.start]-z,Z[H+_$.ticks]=X[F+C$.ticks];let N=X[s.dirty];for(let D=0;D<q;D++){if(!V&&(N&1<<D)===0)continue;let v=s.head+D*y0.words,k=Q+r.head+D*u$.words;Z[k+u$.tick]=X[v+y0.tick]-z,Z[k+u$.pos]=X[v+y0.pos]-j,Z[k+u$.pos+1]=X[v+y0.pos+1]-G,Z[k+u$.pos+2]=X[v+y0.pos+2]-B,d0(Z,k+u$.turn,X,v+y0.turn,4),d0(Z,k+u$.scale,X,v+y0.scale,3)}let I=Q+r.head+q*u$.words,W=cF(X);for(let D=0;D<Y;D++){let v=X[W+2*D],k=X[W+2*D+1];Z[I]=v>-o8?v-z:-o8,Z[I+1]=k<o8?k-z:o8,I+=2}if((M&sX)===0)return;{I=uc(X,Z,I,z)}}function XR($,Z,Q){let X=!1,J=T.placeTick,K=T.placeSeconds;$[J]=Z[0],$[J+1]=Z[0]-$[J],$[K]=Z[1],$[K+1]=Z[1]-$[K];for(let V=0;V<3;V++){let Y=T.originX+2*V;X||=$[Y]!==Q[V],$[Y]=Q[V],$[Y+1]=Q[V]-$[Y]}return X}function JR(a,b){return (JR=$c0C(38)).call(this,a,b)}function IH($){let Z=$.table;for(let Q of $.bodies)Q.place=null,$J(Z,Q);$.bodies.clear(),B$(Z,$.at,$.room),$.room=0,$.named=-1}function xH($){let Z=G$($,1);return o0($,Z,A),Z}function e1($,Z,Q){let X=Q<0?A:Q;if($.mirror[Z]===X)return;o0($,Z,X)}function DH($,Z){B$($,Z,1)}function PH($,Z){$.named=Z,e1($.table,Z,$.at)}function TH($,Z,Q,X,J){let K=Z<0?G$($,Y6):Z;if(!kH($.mirror,$.mirrorF32,K,Q,X,J,KR)&&Z>=0)return K;return $.census.heads+=1,M0($,K,K+Y6),K}function vH($,Z){B$($,Z,Y6)}var KR=[0,0,0];function $J($,Z){if(Z.row<0)return;o0($,Z.row+R.place,SH(Z));G6($,Z,ZE)}function SH($){if($.place!==null)return $.place.at;return $.stated>=0?$.stated:A}function ZJ($){return $.role===u8&&($.place!==null||$.stated>=0)}function CH($,Z,Q,X,J,K,V){let Y=_.get($);if(Y?.role!==u8||$.rig===null)return;let U=Y.table,q=Y.stated<0;if(q)Y.stated=G$(U,Y6);let z=Y.stated,j=kH(U.mirror,U.mirrorF32,z,Z,Q,X,J)||q;if(j)U.census.stated+=1,M0(U,z,z+Y6);if(Y.place===null)$J(U,Y);if(yH(U,Y,K,$.rig.bindCorrection)||j)Y.movedFrame=U.frame,Y.movedAt=xU();UH(U,Y,Z[0],Z[1],Z[2],V)}function kH(a,b,c,d,e,f,g){return (kH=$c0C(39)).call(this,a,b,c,d,e,f,g)}function $U($,Z,Q){let X=$[Z],J=$[Z+1];return K7($,Z,Q),$[Z]!==X||$[Z+1]!==J}function yH(a,b,c,d){return (yH=$c0C(40)).call(this,a,b,c,d)}function AH($){let Z=_.get($);if(Z===void 0)return"no body on the table";if(Z.role===Z0)return"worn";if(Z.role===V$)return"mount";if(Z.role===Y8)return"horde member";if(Z.role!==u8)return"hung";return $.rig===null?"no rig":null}function gH($,Z,Q){let X=_.get($);if(X?.role!==u8||$.rig===null)return!1;let J=X.table;if(X.place!==Z){wc(X,Z);$J(J,X)}if(Z===null||Q===null)return Z===null;return yH(J,X,Q,$.rig.bindCorrection),dU(J,X),!0}var VR=new Float32Array(16);function YR($,Z){if(Z[0]=1/0,Z[1]=1/0,Z[4]=$.tickedT,i($.tickedAtMs))Z[5]=$.tickedAtMs;else Z[5]=0;let Q=$.activeLayerList;for(let J=0;J<Q.length;J++){let K=Q[J],V=(K.clock??K.line??null)!==null;Z[2]=QL(K);q9(Z,V);if(K.arrivalRate>0){xc(Z,K);}Z[3]=KH(K);if(K.currentWeight!==K.targetWeight&&Z[3]>0){Z[2]=Math.abs(K.targetWeight-K.currentWeight)/Z[3];q9(Z,!1);if(K.targetWeight===0){yc(Z,K);}}if(K.duration!==null&&K.targetWeight>0)Z[2]=K.duration-K.elapsed,q9(Z,V);let v$18;gM:{let $=K,Q=2;let X=$.clip.release;if(X?.at===void 0||EY.has($)||$.targetWeight<=0||$.speed<=0){v$18=!1;break gM;}if(Z[Q]=X.at-$.clipStart,Z[Q]<0)Z[Q]=0;v$18=!0;}if(v$18&&K.time<Z[2])Z[2]=(Z[2]-K.time)/K.speed,q9(Z,V);if(K.pendingSwap!==null&&K.clipSpan>0&&K.speed!==0&&K.loop!=="once"){zc(K,Z);q9(Z,V)}}let X=$.inertia;if(X!==null)for(let J=0;J<2;J++){let K=X.offsets[J];if(K===null)continue;Z[2]=K.span-X.elapsed[J],q9(Z,!1)}Z[0]-=UL,Z[1]-=qL}function q9($,Z){if(!($[2]>0))$[2]=0;if(Z){if($[5]+$[2]*1000<$[1])$[1]=$[5]+$[2]*1000}else if($[4]+$[2]<$[0])$[0]=$[4]+$[2]}var ZU=new Float64Array(6);function OH($,Z){if(Z.role===Z0)return;let Q=Z.mixer;YR(Q,ZU);Z.edgeT=Math.min(ZU[0],Z.collapseEdgeT);if(i(Q.tickedAtMs))Z.edgeC=Math.min(ZU[1],Z.collapseEdgeC)+Z.lagMs;else Z.edgeC=1/0;z7($.heapT,Z,!0),z7($.heapC,Z,!1)}function IF($){let Z=$.activeLayerList,Q=Z.length;for(let X=0;X<Z.length;X++){let J=Z[X],K=J.targetWeight*977|0;Q=Math.imul(Q,31)+(J.released?7:3)+K+(J.pendingSwap!==null?11:0)+_8(J.clip)&1073741823}return Q}function wH($,Z){let Q=Z.mixer;t1($,Z);let X=IF(Q);if(eZ(Q,$.nowT,a1(Z,$.nowC),!0),dU($,Z),XQ($,Z),$.census.mixerEdges+=1,OH($,Z),IF(Q)!==X)Z.edgeT=$.nowT,z7($.heapT,Z,!0)}function MU($,Z,Q,X){let J=Q?$.edgeT:$.edgeC,K=Q?Z.edgeT:Z.edgeC;return X?J<=K:J<K}function oU($,Z,Q,X){let J=$[Z],K=$[Q];if($[Z]=K,$[Q]=J,X)K.heapT=Z,J.heapT=Q;else K.heapC=Z,J.heapC=Q}function FU($,Z,Q){while(Z>0){let X=Z-1>>1;if(MU($[X],$[Z],Q,!0))return;oU($,Z,X,Q),Z=X}}function RH($,Z,Q){for(;;){let X=Z*2+1,J=X+1,K=Z;if(X<$.length&&MU($[X],$[K],Q,!1))K=X;if(J<$.length&&MU($[J],$[K],Q,!1))K=J;if(K===Z)return;oU($,Z,K,Q),Z=K}}function z7($,Z,Q){let X=Q?Z.heapT:Z.heapC,J=Q?Z.edgeT<1/0:Z.edgeC<1/0;if(X<0){if(!J)return;if($.push(Z),Q)Z.heapT=$.length-1;else Z.heapC=$.length-1;FU($,$.length-1,Q);return}if(!J){sZ($,Z,Q);return}FU($,X,Q),RH($,Q?Z.heapT:Z.heapC,Q)}function xF($,Z,Q,X){while(Z.length>0&&(Q?Z[0].edgeT<=$.nowT:Z[0].edgeC<=$.nowC)){let J=Z[0];sZ(Z,J,Q),sZ(Q?$.heapC:$.heapT,J,!Q),X.push(J)}}function sZ($,Z,Q){let X=Q?Z.heapT:Z.heapC;if(X<0)return;let J=$.length-1;if(X!==J)oU($,X,J,Q);if($.pop(),Q)Z.heapT=-1;else Z.heapC=-1;if(X<$.length)FU($,X,Q),RH($,Q?$[X].heapT:$[X].heapC,Q)}function EH($,Z){if($.inFrame&&Z===$.nowT)return;if($.frame+=1,$.inFrame=!0,$.dispatches=0,eF(rY,0),$.nowT-$.nowT===0)$.prevT=$.nowT;else $.prevT=Z;if($.nowC-$.nowC===0)$.prevC=$.nowC;else $.prevC=rY[0];if($.nowT=Z,$.nowC=rY[0],Z-$.prevT>0)$.frameSeconds=Z-$.prevT;else $.frameSeconds=0;let Q=$.due;xF($,$.heapT,!0,Q),xF($,$.heapC,!1,Q);for(let X=0;X<Q.length;X++){if(_.get(Q[X].key)===Q[X]&&!sw(Q[X]))wH($,Q[X]);}Q.length=0;qU($.retired,$.frame);qU($.bake.retired,HU());IR($)}function sU($){let Z=$.kernel;if(Z!==null&&Z.generation===$.pipelines.generation)return Z;return Ac($);}function H7($){return $.buildsGoOneAtATime||$.hostCompilesInline}var M$=["seen","blend","pose","mount","palette"],_H=M$.map(($)=>`${$}_main`);function tU($,Z,Q){let X=(V,Y)=>({binding:V,visibility:4,buffer:{type:Y?"read-only-storage":"storage"}}),K={layout:Z.getBindGroupLayout([X(0,!0),X(1,!0),X(2,!1),X(3,!1),X(4,!1),X(5,!1),X(6,!1)],"lume pose"),seen:Y$,blend:Y$,pose:Y$,waves:x0.map(()=>null),wanted:x0.map(()=>!1),mount:Y$,palette:Y$,generation:Z.generation};if(Q){{let Q=K;for(let X of M$){mH($,Z,Q,X)}}}else bH($,Z,K);return K}function mH($,Z,Q,X){if(Q[X]!==Y$)return Q[X];return Q[X]=fH($,Z,Q,X,PM,`${X}_main`)}function fH(a,b,c,d,e,f){return (fH=$c0C(41)).call(this,a,b,c,d,e,f)}function bH(a,b,c){return (bH=$c0C(42)).call(this,a,b,c)}function hH($,Z,Q){let X=Z.waves[Q];if(X!==null)return X;if(!H7($.pipelines))return pH($,Z,Q);return Z.wanted[Q]=!0,Y$}function pH($,Z,Q){let X=x0[Q];return Z.waves[Q]=fH($.device,$.pipelines,Z,X.entry,EF($.device)?X.family:X.wgsl,X.entry)}function lH($){if(H7($.pipelines))return;if($.pipelines.calmScope(()=>tU($.device,$.pipelines,!0)),!m8()&&!QJ.has($.device)&&EZ($.device))z1($.pipelines,$.device)}function YQ($,Z,Q,X=null){let J=_.get($);if(J===void 0||J.role===Z0||J.role===Y8||J.scratch<0||Z<-1||Z>=J.nodes||Z<0&&X===null||Q<0)return null;let K=J.table;rZ(K.device,Q+1);let V=K.page.generation,Y=U6(K,K.page,u9.floats);if(K.page.generation!==V)B7+=1;let U={body:J,node:Z,slot:Q,block:Y,offset:X!==null,job:null,ran:()=>U.job?.fresh===!1,stands:()=>U.body.reads.has(U)&&_.get(U.body.key)===U.body,leave:()=>dH(U)};if(U$(K,Y+u9.frame,J.readFrameWords),X!==null)U$(K,Y+u9.offset,X);return J.reads.add(U),z6(J),aU(K,J,U),c0(J),U}function dH($){let Z=$.body;if(!Z.reads.delete($))return;z6(Z);let Q=Z.table;if(ZQ(Q,$),$.block>=0)Q.page.ranges.free($.block,u9.floats);$.block=-1,c0(Z)}var hZ=new Float32Array(16);function aU($,Z,Q){if(Z.scratch<0||Q.block<0)return;let{model:X,root:J}=_U(Z),K=d6|G2|(Z.readSolves?UV:0)|(Q.offset?qV:0),V=Uint32Array.of(Q.slot*VZ.slots,Q.block,Q.node<0?A:Q.node,X,J,K,d1(Z).at,Z.scratch);OU($,Q,V)}var qR=3;function UQ($){let Z=_.get($);if(Z!==void 0){iH(Z)}}function iH($){if($.readWanted=$.table.frame,$.readSince>=0)return;{$.readSince=$.table.frame,$.table.wanted.push($)
}}function rU($,Z){let Q=_.get($);if(Q?.landed?.nodes!==Z||Q.readSince<0||Q.landed.frame<Q.readSince||Q.table.cpuAhead&&!XJ(Q.table,Q))return null;return UQ($),Q.landed}function zR($,Z){let Q={buffer:p1($.device,"lume pose readback",Z,1|8),floats:Z,busy:!1,frame:0,entries:[],copies:[],copyPass:{buffers:[]},map:function(){{let $=Q;let Z;try{Z=$.buffer.mapAsync(1)}catch{$.busy=!1;return}Z.then($.landed,$.failed)}},landed:function(){try{let X=new Float32Array(Q.buffer.getMappedRange());aH(X,X,Q.entries,Q.frame)}finally{Q.buffer.unmap(),Q.busy=!1}},failed:function(){Q.busy=!1}};return Q}function oH($){let Z=$.wanted,Q=0;for(let X=0;X<Z.length;X++){let J=Z[X];if($.frame-J.readWanted>1||_.get(J.key)!==J){J.readSince=-1;continue}Z[Q++]=J}return Z.length=Q,tH($,sH,null)}var sH=[];function tH($,Z,Q){let X=$.wanted,J=0,K=0;for(let V=0;V<X.length;V++){let Y=X[V];if(Y.scratch<0)continue;if(J===Z.length){{Z.push({body:null,nodes:0,at:0,stateCount:0,states:[]});
}}let U=Z[J++];U.body=Y,U.nodes=Y.nodes;let q=$9(Y.nodes,0);if(U.at=Q?K:Y.scratch,Q)DF(Q,$.scratch.buffer,Y.scratch*4,K*4,q*4);K+=q;let z=0;for(let j=0;j<Y.passes.length;j++){let G=Y.passes[j];if(G===null||G.state<0)continue;if(z===U.states.length){{U.states.push({kind:0,at:0,floats:0});
}}let B=U.states[z++];B.kind=j;B.at=Q?K:G.state;B.floats=G.stateFloats;if(Q){{let K$18=K;{let K=K$18;DF(Q,$.state.buffer,G.state*4,K*4,G.stateFloats*4);
}}}K+=G.stateFloats}U.stateCount=z}for(let V=J;V<Z.length;V++)Z[V].body=null;return K}var BR="pose/read";function DF($,Z,Q,X,J){let K=$.copyPass.buffers,V=$.copies[K.length];if(V===void 0)$.copies.push(V={src:Z,dst:$.buffer,size:J,srcOffset:Q,dstOffset:X});V.src=Z,V.dst=$.buffer,V.srcOffset=Q,V.dstOffset=X,V.size=J,K.push(V)}function aH($,Z,Q,X){for(let J=0;J<Q.length;J++){let K=Q[J],V=K.body;if(V===null)break;let Y=V.landed;if(Y!==null&&Y.frame>X)continue;let U=$9(K.nodes,0);let q=Y?.scratch.length===U?Y:({frame:0,stoodFrom:X,nodes:K.nodes,scratch:new Float32Array(U),states:[null,null,null]});if(q!==Y||Y.frame<V.readSince||Y.stoodFrom<=V.passWrote||!aZ(Y.scratch,$,K.at))q.stoodFrom=X;q.frame=X,q.nodes=K.nodes,q.scratch.set($.subarray(K.at,K.at+U));for(let z=0;z<q.states.length;z++){let j=Y?.states[z]??null;q.states[z]=null;for(let G=0;G<K.stateCount;G++){let B=K.states[G];if(B.kind!==z)continue;let M=j!==null&&j.length===B.floats?j:new Float32Array(B.floats);M.set(Z.subarray(B.at,B.at+B.floats)),q.states[z]=M}}V.landed=q}}var qQ=0,rH=1;function eU($,Z,Q,X){let J=qQ;for(let K=0;K<x0.length;K++){if(x0[K].kind!==Q||x0[K].after!==X)continue;let V=hH($,Z,K);if(V.failed)return 2;if(c$(V)===null)J=rH}return J}function HR($,Z){let Q=$.pipelines;if(H7(Q)){NR:{let Q=$.pipelines;if(bH($.device,Q,Z),mF(Q.queueRests)||g1($,Z,!1,!1)===null||!($.cpuAhead&&Q.pictureSeen&&Q.restStanding===null&&!Q.idleBuildWaits||Q.takeIdleTurn()))break NR;$N($,g1($,Z,!0,!1))}return}{let $$42=$.device,Z$50=Q,Q$32=Z;{let $=$$42,Z=Z$50,Q=Q$32;for(let X of M$){mH($,Z,Q,X)}}}let X=eH(Q);if(Q.playHasOpened)for(let J=0;J<M$.length;J++)Q.promoteToDraw(Z[M$[J]],X,!0);for(let J=0;J<x0.length;J++){if(c1($,J)===0)continue;let K=hH($,Z,J);if(X!==void 0&&$.waveLists[J].count>0&&!K.failed)Q.promoteToDraw(K,X,!0)}if(g1($,Z,!1,!0)===Y$&&Q.takeIdleTurn())$N($,g1($,Z,!0,!0))}function eH($){return $.playHasOpened&&$.pictureSeen?fF:void 0}function $N($,Z){if(Z===null)return;$.pipelines.promoteInIdleTurn(Z);let Q=$.pipelines.keyOf(Z);if(Q!==null){WR:{let Z$53=Q,Q$33=$.pipelines.idleTurns;{let Z=Z$53,Q=Q$33;let X=$.census.idleAsked;if(X.includes(Z))break WR;{X.push(Z),__sc.info(`[lume] the pose program '${Z}' is asked at idle turn ${Q.turns}, the CPU form posing: ${$.cpuAhead}`)
}}}}}function g1($,Z,Q,X){for(let J=0;J<M$.length;J++){let K=M$[J],V=Z[K];if(V===Y$){return Q?mH($.device,$.pipelines,Z,K):V;}if(!V.failed&&c$(V)===null)return V}let v$27;{let Q=$.proof.state;v$27=(Q==="owed"||Q==="proving")&&zQ(Z)&&EZ($.device);}if(v$27){let J=_Z($.pipelines);if(J===null)return Q?z1($.pipelines,$.device).handle:Y$;if(!J.handle.failed&&c$(J.handle)===null)return J.handle}for(let J=0;J<x0.length;J++){if(!X&&!Z.wanted[J]&&c1($,J)===0)continue;let K=Z.waves[J];if(K===null)return Q?pH($,Z,J):Y$;if(!K.failed&&c$(K)===null)return K}return null}var QJ=new WeakSet,QN=new WeakSet;function IR($){let Z=$.proof;if(Z.leaves)QU($);if(Z.leaves=!1,Z.state!=="owed"&&Z.state!=="proving"||m8())return;let Q=sU($),X=QJ.has($.device);if(X||Zq(Q)!==null){QU($),Z.state=X?"agree":"owed";return}let v$28;{let Z$54=Q;{let Z=Z$54;let Q=$.proof.state;v$28=(Q==="owed"||Q==="proving")&&zQ(Z)&&EZ($.device);}}if(v$28){{let v$81;Lc:{let K=$.pipelines,V=H7(K)?_Z(K):z1(K,$.device);if(V!==null&&K.playHasOpened){K.promoteToDraw(V.handle,eH(K),!0);}if(V?.handle.failed===!0){QU($),$.proof.state="unbuilt",V6("lume.crowd_pose_proof",{verdict:"unbuilt"}),__sc.warn("[lume] pose proof: no program");break Lc;}if((V?.handle.pipeline??null)===null)break Lc;
v$81=aa;}if((ba=v$81)!==aa)return ba}}else if(!zQ(Q))return;{let v$82;Mc:{if(Z.state==="proving")break Mc;let J;{let Z;{let v$90;{let Z=null,Q=-1;for(let X of $.poses){if(X.role===V8||X.row<0||X.parsed.nodes.length===0||X===$.proof.body)continue;let J=(X.parsed.skins.length>0?2:0)+(X.mixer.activeLayerList.length>0?1:0);if(J<=Q)continue;if(Z=X,Q=J,J===3)break}
v$90=Z;}Z=v$90}J=Z;}if(J===null)break Mc;Z.body=DR($,J);Z.state="proving"
v$82=aa;}if((ba=v$82)!==aa)return ba}}function QU($){let Z=$.proof.body;if(Z===null)return;b0(Z.key),$.proof.body=null}function DR(a,b){return (DR=$c0C(43)).call(this,a,b)}function PR($,Z,Q){if(Z.heldSeen=Q===null,Q!==null){let[X,J,K,V]=Q.planes[0].subarray(16,20),[Y,U,q]=$.view,z=1-(X*Y+J*U+K*q+V);cZ(Z,Y+X*z,U+J*z,q+K*z,0.5)}JQ($,Z)}var TR="pose/proof";function v1($,Z,Q){return $.createBuffer({label:Z,size:Math.max(16,Math.ceil(Q/4)*4),usage:128|8|4})}function XU($){$.scratch.destroy(),$.page.destroy(),$.reads.destroy()}function vR($,Z){let Q=$.proof.body;if($.proof.state!=="proving"||Q===null||Q.row<0||Q.scratch<0)return null;if(!zQ(Z))return null;if(EZ($.device)&&Pc($))return null;return Qc($);}function PF(a,b,c,d,e){return (PF=$c0C(44)).call(this,a,b,c,d,e)}function CR($,Z,Q,X){let J=$.proof,K=J.body,V=$.device,Y=EZ(V),U=Y?_Z($.pipelines):null,q=U===null?null:c$(U.handle);if(K===null||Y&&q===null||!XJ($,K)){XU(X);return}let z=[{buffer:X.scratch,at:K.scratch-i8,words:2,kind:q1}],j=PF($,X,K,z,hY-2);for(let I=0;I<$.poses.length&&j>=32;I++){let W=$.poses[I];if(W!==K&&((W.role===u8||W.role===Y8)&&W.row>=0&&W.scratch>=0&&W.mountIndex<0&&W.wearer===null&&W.passTable<0&&XJ($,W)))j=PF($,X,W,z,j)}let G=0;for(let I of z)G+=I.words;let B=new Float32Array(G),M=0;for(let I of z){let W=I.kind===U1?$.page.mirrorF32:$.scratch.mirrorF32;B.set(W.subarray(I.at,I.at+I.words),M),M+=I.words}V.queue.writeBuffer(X.scratch,(K.scratch-i8)*4,new Float32Array(2).fill(pY));let L=$.mirror.slice();L[T.mountCount]=0,L[T.reachCount]=0,L[T.gripCount]=0,L[T.springsCount]=0,L[T.springsAfterCount]=0;let F=v1(V,"lume pose proof rows",L.byteLength);V.queue.writeBuffer(F,0,L);let H=V.createBindGroup({label:"lume pose proof",layout:Z.layout,entries:TU([$.bake.page.buffer,F,X.scratch,X.page,$.state.buffer,X.reads,JN($)])}),N={desc:{dispatches:[],measured:w1},commands:[],group:[H]};VN($,Z,N,!1);Q.addCompute(TR,N.desc);J.state="flying";Q.addSubmitCommitHook(function(){J.leaves=!0;let I=Y&&U!==null&&q!==null?dM(V,U.layout,q,z):lY(V,z);F.destroy();XU(X);I.then((W)=>TF($,lM(z,B,W)),()=>TF($,{verdict:"unread",rows:0,missed:0,worstGap:0,kind:""}))},function(){if(J.leaves=!0,F.destroy(),XU(X),J.state==="flying")J.state="owed"})}function JU($){return`${$.missed} of ${$.rows} rows miss, the worst by ${i($.worstGap)?`${$.worstGap.toExponential(2)} m`:"no number"}, ${$.kind}`}function TF($,Z){let Q=$.proof;if(Q.state!=="flying")return;if(Q.gap=Z.worstGap,Q.rows=Z.rows,Z.verdict==="agree")Q.state="agree",QJ.add($.device),V6("lume.crowd_pose_proof",{verdict:"palettes_agree"}),__sc.info(`[lume] pose proof: rows agree (${JU(Z)})`);else if(Z.verdict==="miss"&&Z.kind==="seen"&&!R1())Q.state="owed",WU(),V6("lume.crowd_pose_proof",{verdict:"seen_miss"}),__sc.warn(`[lume] pose proof: seen words miss (${JU(Z)})`);else if(Z.verdict==="miss")Q.state="miss",uF(),V6("lume.crowd_pose_proof",{verdict:"palettes_miss"}),__sc.warn(`[lume] pose proof: rows miss (${JU(Z)})`);else Q.state="unread",V6("lume.crowd_pose_proof",{verdict:"unread"}),__sc.info(`[lume] pose proof: ${Z.kind==="unrun"?"no pass":"no mark"}`)}var LU=30,kR=0.8;function yR(a){return (yR=$c0C(45)).call(this,a)}function vF($,Z,Q){let X=Z+R.flags,J=$.mirror[X]&~s8|Q;if(Z>=0&&J!==$.mirror[X])o0($,X,J)}var AR=2;function gR(a,b){return (gR=$c0C(46)).call(this,a,b)}function $q($,Z){if($.seenWatch?.rows.delete(Z)===!0)$.census.seen.watch.moved+=1}function OR(a){return (OR=$c0C(47)).call(this,a)}function XN($,Z,Q){let X=sU($);return eU($,X,Z,Q)===qQ||Zq(X)!==null}function JN(a){return (JN=$c0C(48)).call(this,a)}function wR(a,b,c){return (wR=$c0C(49)).call(this,a,b,c)}function KN(a,b,c,d,e){return (KN=$c0C(50)).call(this,a,b,c,d,e)}function VN($,Z,Q,X){for(let J=0;J<M$.length;J++){if(J===3&&X){{for(let X=0;X<x0.length;){let J=x0[X],K=X+1;if(J.rounds)while(K<x0.length&&x0[K].rounds&&x0[K].kind===J.kind&&x0[K].after===J.after)K++;if((J.kind!==t0||J.after||$.springsShown)&&c1($,X)>0&&eU($,Z,J.kind,J.after)===qQ){{let X$43=X,K$20=K;{let X=X$43,K=K$20;let V=J.rounds?$.kindRounds[J.kind]:1;for(let Y=0;Y<V;Y++){for(let U=X;U<K;U++){LR:{let X=U;{let v$89;Jc:{let J=Z.waves[X],K=J===null?null:c$(J),V=c1($,X);if(K===null||V===0)break Jc;let Y=x0[X].bodiesPerWorkgroup;KN(Q,K,Q.group,(V+Y-1)/Y|0,x0[X].entry)
v$89=aa;}if((ba=v$89)!==aa){(ba);break LR;}}}}}
}}}X=K}}}let K=$.jobs.length;if(J===1)K=$.blendChunks.count;else if(J<3)K=$.poses.length;else if(J===3)K=X?$.mounts.length:0;let V=c$(Z[M$[J]]);if(K>0&&V!==null)KN(Q,V,Q.group,K,_H[J])}}function ER($,Z,Q,X,J){if($.cpuAhead){{{for(let Z of[$.scratch,$.state])k1($.device,Z.buffer,Z);for(let Z of $.wanted)Z.readSince=$.frame;$.cpuAhead=!1
}}}$.cpuCurrent=!1,$.census.form="gpu";let K;{let Z=$.dispatches;let Q=$.passes[Z];if(Q===void 0){let v$83;{let Q$82=Q;{let Q=Q$82;$.passes.push(Q={desc:{dispatches:[],measured:w1},commands:[],group:[null]});
v$83=Q;}}Q=v$83}K=(x$(Q.desc.dispatches),Q);}K.group[0]=wR($,Z,X);$.seenGated=J===E$;VN($,Z,K,!0);Q.addCompute(w1,K.desc);jR:{let Z$52=Q;{let Z=Z$52;let Q=oH($);if(Q===0)break jR;{let v$80;Dc:{let X=$.readbacks,J=null,K=-1;for(let V=0;V<X.length;V++){let Y=X[V];if(Y.busy)continue;if(Y.floats>=Q){J=Y;break}if(K<0)K=V}if(J===null){if(K<0&&X.length>=qR)break Dc;J=zR($,Math.ceil(Math.max(Q,1024)*1.5));if(K>=0)X[K].buffer.destroy(),X[K]=J;else X.push(J)}x$(J.copyPass.buffers),tH($,J.entries,J),J.busy=!0,J.frame=$.frame,Z.addBufferCopies(BR,J.copyPass),Z.addSubmitCommitHook(J.map,J.failed)
v$80=aa;}if((ba=v$80)!==aa){(ba);break jR;}}}}}function _R($,Z,Q){return zQ(Z)&&!($.reachOwed&&($.reachWalksOut||Q!==qQ))}function zQ($){if(m8())return!1;for(let Z=0;Z<M$.length;Z++)if(c$($[M$[Z]])===null)return!1;return!0}function Zq($){if(m8())return"pose_proof";for(let Z=0;Z<M$.length;Z++)if($[M$[Z]].failed)return _H[Z];return null}function uR($,Z,Q,X){let J=$.scratch.mirrorF32,K=$.readPlane??($.readPlane=rZ($.device)),V=K.records*VZ.slots;if($.readsMirror.length<V){{let U=Z9(Float32Array,V);U.set($.readsMirror),$.readsMirror=U
}}if(D1.length<J.length)D1=Z9(Float64Array,J.length);let Y=Q?mR($):null;if(Y!==null){{FZ($.bake.page.mirror,$.mirror,J,$.page.mirrorF32,$.state.mirrorF32,$.readsMirror,D1,fR($,Y));
}}else {KG:{let $$9=$.bake.page.mirror,Z$10=$.mirror,Q$5=J,X$3=$.page.mirrorF32,J$3=$.state.mirrorF32,K$1=$.readsMirror,V$1=D1;{let $=$$9,Z=Z$10,Q=Q$5,X=X$3,J=J$3,K=K$1,V=V$1;let Y=A8.ended||XG()||!pV();if(Y){lV();}if(Y||Z[T.poseCount]<=1){{(FZ($,Z,Q,X,J,K,V));break KG;}}let U=e4();let q=G0.stints??=IA(ZG()??1);let z=G0.control??=Z9(Int32Array,bV+q.due.length);G0.epoch=G0.epoch+1|0;let j=G0.bind;if(j===null||j[3]!==$||j[4]!==Z||j[5]!==Q||j[6]!==X||j[7]!==J||j[8]!==K||j[9]!==V){j=ja(j,z,$,Z,Q,X,J,K,V)}ka(z,q,j,$,Z,Q,X,J,K,V,U);}}}pR($,K.buffer,Y);{let Z$55=X,Q$34=Y;{let Z=Z$55,Q=Q$34;let X=0,J=$.scratch.mirrorF32,K=$.mirror[T.seen];for(let U=0;U<$.poses.length;U++){let q=$.poses[U].scratch;if(Q?.has(q)===!0)continue;let z=tZ(K,J,q,N$);if(z>0.5&&z<=2.5)X+=1}let V=VU.indexOf(Z),Y=V<0?VU.length-1:V;b9.flushes[Y]+=1,b9.bodies[Y]+=X,b9.kept+=Q?.size??0}}{let Z=J,Q=$.state.mirrorF32;oH($),aH(Z,Q,sH,$.frame)}$.cpuAhead=!0;$.seenGated=Z===E$;$.census.form="cpu";$.cpuFrames+=1;$.census.cpuFrames=$.cpuFrames}var D1=new Float64Array(0);function mR($){let Z=new Set,Q=$.scratch.mirrorF32;for(let X of $.poses){let J=X.scratch;if(J<P0||J===A)Z.add(J);else{let K=Q[J-N$];if(K>0.5&&K<=2.5)Z.add(J)}}return Z}var SF=[T.poseList,T.blendList,T.poseList,T.reachList,T.reachList,T.reachList,T.reachList,T.reachList,T.gripList,T.gripList,T.gripList,T.springsList,T.springsList,T.springsAfterList,T.springsAfterList,T.mountList,T.jobList];function fR($,Z){let Q=$.mirror;return{run(X,J){let K=HZ.indexOf(X),V=Q[SF[K]],Y=Q[T.blendShift],U=Q[T.poseList];for(let q=0;q<J;q++){let z=Q[V+q];if(K===1)z=Q[U+(z>>>Y)];let j=K===SF.length-1?Q[V+q*_0.words+_0.pose]:Q[z+R.scratch];if(!Z.has(j))X(q)}}}}var hR=64;function pR($,Z,Q){let X=$.mirror,J=$.bake.page.mirror,K=$.scratch.mirrorF32,V=0,Y=0;for(let U=0;U<$.jobs.length;U++){let q=$.jobAt+U*_0.words,z=X[q+_0.flags],j=X[q+_0.slot];if((z&G2)!==0){$.readPairs=pZ($.readPairs,Y,j,j+VZ.slots),Y+=2;continue}let G=X[q+_0.pose];if(!(tZ(X[T.seen],K,G,N$)>0.5)||Q?.has(G)===!0)continue;let B=X[q+_0.table],M=(J[B+n8.joints]+1)*16;if((z&j2)!==0)M=J[B+r$.parts]*16;else if((z&z2)!==0)M=J[B]*C8;$.pagePairs=pZ($.pagePairs,V,j,j+M),V+=2;let L=X[q+_0.previous];if(L===A)continue;$.pagePairs=pZ($.pagePairs,V,L,L+M),V+=2}for(let U=0;U<$.poses.length;U++){let q=$.poses[U];if(q.morphAt<0||q.row<0||X[q.row+R.morph]===A||!(tZ(X[T.seen],K,q.scratch,N$)>0.5)||Q?.has(q.scratch)===!0)continue;$.pagePairs=pZ($.pagePairs,V,q.morphAt,q.morphAt+q.morphTargets*2),V+=2}$.census.cpuUploads=0,CF($,$.page.buffer,$.page.mirrorF32,$.pagePairs,V,hR),CF($,Z,$.readsMirror,$.readPairs,Y,0)}function CF($,Z,Q,X,J,K){if(J===0)return;Jq(X,J>>1);let V=X[0],Y=X[1];for(let U=2;U<J;U+=2){let q=X[U],z=X[U+1];if(q<=Y+K){if(z>Y)Y=z;continue}kF($,Z,Q,V,Y),V=q,Y=z}kF($,Z,Q,V,Y)}function kF($,Z,Q,X,J){let K=J<Q.length?J:Q.length;if(K<=X)return;$.device.queue.writeBuffer(Z,X*4,Q,X,K-X),$.census.cpuUploads+=1}function dR($,Z){if($.cpuCopy!==null)return;let Q=$.scratch.ranges.allocatedHighWater,X=$.state.ranges.allocatedHighWater,J=$.page.ranges.allocatedHighWater,K=Math.max(4,(Q+X+J)*4),V=O1(()=>j7($.device,{label:"lume pose cpu copy",size:K,usage:1|8},function(){})),Y=V.resource,U=[],q=0;for(let[B,M]of[[$.scratch.buffer,Q],[$.state.buffer,X],[$.page.buffer,J]]){if(M>0)U.push({src:B,dst:Y,size:M*4,srcOffset:0,dstOffset:q});q+=M*4}let z={held:V,scratch:Q,state:X,page:J,copies:{buffers:U},done:!1};$.cpuCopy=z;{let Z=!0;for(let Q of[$.scratch,$.state,$.page])Q.guarding=Z,Q.guarded=0}let j=function(){z.done=!0;if($.cpuCopy===z){Qq($);}V.release()};let G=function(){if(!z.done&&$.cpuCopy===z){let B=new Float32Array(Y.getMappedRange(0,K));{let Z$56=z,Q$35=B,X$19=B.subarray(Q),J$11=B.subarray(Q+X);{let Z=Z$56,Q=Q$35,X=X$19,J=J$11;Z.done=!0;KU($.scratch,Q.subarray(0,Z.scratch));KU($.state,X.subarray(0,Z.state));KU($.page,J.subarray(0,Z.page));$.cpuCurrent=!0;$.cpuAhead=!1;$.census.cpuCopies+=1;Qq($)}}Y.unmap()}j()};if(U.length>0)Z.addBufferCopies(cR,z.copies);Z.addSubmitCommitHook(function(){let B;try{B=Y.mapAsync(1)}catch{j();return}B.then(G,j)},j)}var cR="pose/cpu-copy";function KU(a,b){return (KU=$c0C(51)).call(this,a,b)}function Qq($){$.cpuCopy=null;{let Z=!1;for(let Q of[$.scratch,$.state,$.page])Q.guarding=Z,Q.guarded=0}}function Xq($,Z,Q=null,X="frame"){if($.seenWatch!==null){OR($);}if($.blendStale.length>0){yw($);}if($.bodies.size===0&&$.dirtyCount===0)return;if($.dispatches>0&&$.dirtyCount===0&&$.freshJobs.length===0&&!($.seenGated&&Q===null)){$.inFrame=!1;return}let J=$.census.form==="cpu"&&$.dispatches>0&&$.dispatchedFrame===$.frame&&$.dirtyCount===0&&$.freshJobs.length===0,K=$.mirrorF32,V=K[T.seenFrame];if(K[T.nowT]=$.nowT,K[T.nowTLow]=$.nowT-K[T.nowT],$.nowC-$.nowC===0){if($.epochC!==$.epochC)$.epochC=Math.floor($.nowC*0.001)*1000;K[T.nowC]=($.nowC-$.epochC)*0.001,K[T.nowCLow]=($.nowC-$.epochC)*0.001-K[T.nowC]}else K[T.nowC]=K[T.nowCLow]=0;if($.dispatches===0)K[T.dt]=$.frameSeconds;else K[T.dt]=0;if(XR(K,DU,$.origin))$.originOwed=!0;let Y=$.originOwed?null:Q,U=R1()&&!m8();$.mirror[T.previousStands]=$.dispatches===0&&$.drawsMotion?0:1;let q=sU($),z=jN($,Y),j=z===E$&&Y!==null;if($.proof.body!==null){PR($,$.proof.body,!U&&j&&Y.eyes>0?Y:null);}M0($,0,T.words);$.inFrame=!1;if($.wavesStale){Hw($);}if($.blendChunksStale){Lw($);}Dw($);let G=!j;for(let x=0;x<$.poses.length;x++)G||=$.poses[x].eyeIn&&T1($.poses[x],t0,!1);$.springsShown=G;Nw($,z,V);let B=$.proof.state;let M=!m8()&&(B==="agree"||B==="unread"||B==="unbuilt");let L=$.reachOwed||$.reachHands?eU($,q,m0,!1):qQ;let F=$.reachHands&&L===rH;let H=M&&!F&&_R($,q,L);let N=M&&!H&&!F&&zQ(q);$.reachWalksOut=N;$.mirror[T.reachOut]=N?1:0;Pw($,z,!H);if(U&&z===E$){yR($);}let I=$.device,W=$.mirror.length;if($.rowsBuffer===null||$.rowsBufferWords<W){if($.rowsBuffer!==null)$.retired.push({buffer:$.rowsBuffer,frame:$.frame});$.rowsBufferWords=W,$.rowsBuffer=p1(I,"lume pose rows",W,128|8),$.dirtyCount=0,M0($,0,W)}if(GN($),$.poses.length+$.jobs.length===0)return;$.census.refused=Zq(q);HR($,q);if(H){ER($,q,Z,$.rowsBuffer,z);lV();if(z===E$&&!U){gR($,Z)}}else if($.cpuCurrent){let x=vR($,q);uR($,z,J,X);if(N)$.census.reachOutFrames+=1;if(x!==null){CR($,q,Z,x)}}else{dR($,Z);$.census.form="waiting";return}$.dispatches+=1;$.originOwed=!1;$.dispatchedFrame=$.frame;WN($,X,$.mirror[T.seen]);iR($);let P=$.freshJobs;for(let x=0;x<P.length;x++){let D=P[x];if(D.fresh=!1,D.index>=0){let v=$.jobAt+D.index*_0.words+_0.flags;o0($,v,$.mirror[v]&~q2)}}$.freshJobs.length=0}function UN($,Z){if(!$.seenGated||$.dispatchedFrame!==$.frame)return;if($.census.form!=="gpu"){Xq($,Z,null,"glass");return}jN($,null),$.seenGated=!1,M0($,0,T.words),GN($),WN($,"glass",w9)}function iR($){let Z=$.unposed,Q=$.census.form==="cpu",X=0;for(let J=0;J<Z.length;J++){let K=Z[J];if(K.posedFrame>=0)continue;if(Q&&!XJ($,K))Z[X++]=K;else K.posedFrame=$.frame,JQ($,K)}Z.length=X}function XJ($,Z){let Q=Z.role===Z0&&Z.wearer!==null?Z.wearer.scratch:Z.scratch;return tZ($.mirror[T.seen],$.scratch.mirrorF32,Q,N$)>0.5}function tZ($,Z,Q,X){return $===p6||Q<P0||Q===A?1:Z[Q-X]}var oR=8388608;function qN($){return $!==null&&$.planes.length<=tF&&$.lights.length<=vU}function zN($,Z,Q){let X=$.origin;let J=qN(Z)&&X[0]===Q[0]&&X[1]===Q[1]&&X[2]===Q[2];for(let K=0;K<$.poses.length;K++){$.poses[K].eyeIn=!J||Ww($,$.poses[K],Z)}}function jN($,Z){let{mirror:Q,mirrorF32:X}=$;let J=qN(Z)?E$:w9;if(Q[T.seen]=J,Q[T.seenLook]=$.lookStands?1:0,X[T.seenFrame]=$.frame%oR,Q[T.seenViews]=0,Q[T.seenLights]=0,X[T.seenGate]=0,J!==E$||Z===null)return J;if(Z.gate!==void 0&&Z.gate!==null)X.set(Z.gate,T.seenGate);for(let K=0;K<Z.planes.length;K++){let V=Z.planes[K];d0(X,T.seenPlanes+K*24,V,0,24);let Y=Z.hulls[K],U=Math.min(Z.hullCounts[K]??0,aX);Q[T.seenHullCounts+K]=U,d0(X,T.seenHulls+K*aX*4,Y,0,U*4)}for(let K=0;K<Z.lights.length;K++){{let K$19=K;{let K=K$19;let V=Z.lights[K],Y=T.seenSpheres+K*4;X[Y]=V.x,X[Y+1]=V.y,X[Y+2]=V.z,X[Y+3]=V.radius
}}}return Q[T.seenViews]=Z.planes.length,Q[T.seenEyes]=Z.eyes,Q[T.seenLights]=Z.lights.length,J}function GN($){let{dirtyCount:Z,rowsBuffer:Q}=$;if(Z===0||Q===null)return;let X=$.dirty;Jq(X,Z>>1);let J=X[0],K=X[1];for(let V=2;V<Z;V+=2){let Y=X[V],U=X[V+1];if(Y<=K+8){if(U>K)K=U;continue}yF($,Q,J,K),J=Y,K=U}yF($,Q,J,K),$.dirtyCount=0}function yF($,Z,Q,X){$.device.queue.writeBuffer(Z,Q*4,$.mirror,Q,X-Q),$.census.uploads+=1,$.census.uploadWords+=X-Q}function Jq($,Z){for(let Q=(Z>>1)-1;Q>=0;Q--)AF($,Q,Z);for(let Q=Z-1;Q>0;Q--){{let Z$57=0,Q$36=Q;{let Z=Z$57,Q=Q$36;let X=$[Z*2],J=$[Z*2+1];$[Z*2]=$[Q*2],$[Z*2+1]=$[Q*2+1],$[Q*2]=X,$[Q*2+1]=J}}AF($,0,Q)}}function AF($,Z,Q){let X=Z;for(;;){let J=X*2+1,K=J+1,V=X;if(J<Q&&$[J*2]>$[V*2])V=J;if(K<Q&&$[K*2]>$[V*2])V=K;if(V===X)return;{let Z$58=X,Q$37=V;{let Z=Z$58,Q=Q$37;let X=$[Z*2],J=$[Z*2+1];$[Z*2]=$[Q*2],$[Z*2+1]=$[Q*2+1],$[Q*2]=X,$[Q*2+1]=J}}X=V}}function MN($,Z,Q){let X=Q?Z.last:Z.current,J=$.page.buffer;if(X?.buffer!==J)if(X={buffer:J,offset:(Q?Z.previous:Z.slot)*4,size:Z.floats*4,key:-++zw},Q)Z.last=X;else Z.current=X;return X}function JJ($,Z,Q=!1){let X=_.get($),J=X?.skins[Z];if(X===void 0||J===void 0)return null;return MN(X.table,J,Q)}function FN($,Z=!1){let Q=_.get($);if(Q===void 0)return null;if(Q.rigid===null)return null;return MN(Q.table,Q.rigid,Z)}function LN($,Z){let Q=_.get($);if(Q===void 0)return!1;Z.skins.fill(-1),Z.rigid.fill(-1);for(let K=0;K<$.skins.length;K++){let V=Q.skins[K];if(V===void 0)return!1;Z.skins[K*3]=V.slot/16,Z.skins[K*3+1]=V.previous/16,Z.skins[K*3+2]=$.skins[K].headJoints===null?-1:(V.slot+V.floats)/16-1}let X=Q.rigid,J=$.rigidPrimitives;if(J.length>0&&X===null)return!1;for(let K=0;K<J.length&&X!==null;K++){Wc(Z,J,K,X);}return!0}function j9($,Z=!1){let Q=_.get($);if(Q===void 0)return!1;return Q.posedFrame>=0?Q.table.dispatchedFrame>=Q.posedFrame:Z&&Q.table.census.form==="gpu"}function HN($){return $.animating}function KJ($){return _.get($)?.animating===!0}function NN($){let Z=$.census,Q=0,X=0,J=0,K=0,V=0,Y=0;for(let U of $.bodies){if(K+=U.carried.size,U.row>=0)V+=U.nodes,Y+=U.blendWords?.[0]??U.nodes;if(U.role===Z0)Q+=1;else if(U.role===V$)X+=1;else if(U.role===Y8)J+=1}Z.bodies=$.bodies.size-Q-J,Z.members=J,Z.mounts=X,Z.carried=K,Z.animating=$.animating,Z.nodes=V,Z.blended=Y,Z.proof=$.proof.state,Z.proofGap=$.proof.gap;for(let[U,q]of[[Z.pages.bake,$.bake.page],[Z.pages.scratch,$.scratch],[Z.pages.page,$.page],[Z.pages.state,$.state]])U.words=q.words,U.growths=q.generation;tR($,Z.seen);return Z}function WN($,Z,Q){if($.flushedFrame!==$.frame)$.flushedFrame=$.frame,$.flushCount=0;let X=$.flushCount++;if(X>=CU)return;$.flushBys[X]=Z,$.flushModes[X]=Q}var gF=["none","every","views"],sR=["body","worn","mount","member","hung"],IN=256;function tR(a,b){return (tR=$c0C(52)).call(this,a,b)}function aR(a,b,c){return (aR=$c0C(53)).call(this,a,b,c)}async function Kq($){let Z=$.mirror,Q=new Map;for(let q of $.bodies)Q.set(q.row,q);let X=[],J=[];for(let q=0;q<Math.min(Z[T.poseCount],IN);q++){let z=Q.get(Z[Z[T.poseList]+q]);if(z===void 0||z.scratch<P0)continue;J.push({buffer:$.scratch.buffer,at:z.scratch-P0,words:P0,kind:q1}),X.push(z)}let K=hY-J.length*P0,V=[];for(let q of X){let z=0;for(let j of q.skins)if(j.job!==null){if((K-=j.floats)>=0)J.push({buffer:$.page.buffer,at:j.slot,words:z=j.floats,kind:U1});break}V.push(z)}let Y=new Float32Array((await lY($.device,J)).buffer),U=X.length*P0;return{seenFrame:$.mirrorF32[T.seenFrame],bodies:X.map(function(q,z){let j=[];for(let G=U+12,B=U+=V[z];G<B;G+=16)j.push(V7(Y[G]),V7(Y[G+1]),V7(Y[G+2]));return Xc(q,Y,z,j);})}}function V7($){return Math.round($*100)/100}var K6=["root","chain","lag","place word","reach stood","grip stood","springs stood","reach edited","grip edited","springs edited","rows block"],rR=0,eR=1,$E=2,ZE=3,QE=4,XE=7,JE=10;function G6($,Z,Q){if($.census.writes[Q]+=1,Z!==null)Z.writes[Q]+=1}function xN($,Z){let Q=[];for(let K=0;K<K6.length;K++)if($.census.writes[K]>0)Q.push([K6[K],$.census.writes[K]]);Q.sort((K,V)=>V[1]-K[1]);let X=[];for(let K of $.bodies){let V=0;for(let Y=0;Y<K6.length;Y++)V+=K.writes[Y];if(V>0)X.push([K,V])}X.sort((K,V)=>V[1]-K[1]);let J=X.slice(0,Z).map(function([K,V]){let Y=[];for(let U=0;U<K6.length;U++)if(K.writes[U]>0)Y.push(`${K6[U]} ${K.writes[U]}`);return`${K.mixer.bodyEntity} \u00d7${V} (${Y.join(", ")})`});return{writes:Q,writers:J}}var OF=4,wF=new WeakMap;function Vq($){let Z=wF.get($);if(Z!==void 0)return Z;let Q=[],X=0;for(let K of $.skins)Q.push(X),X+=Math.ceil((K.joints.length+2)/OF)*OF;let J={starts:Q,rows:X};return wF.set($,J),J}var RF=new WeakMap;function KE($){let Z=RF.get($);if(Z===void 0)RF.set($,Z=X8($)??t$);return Z}function Yq($,Z,Q,X){let J=_.get(Z)??null;if(J!==null&&(J.table!==$||J.mixer!==X))b0(Z),J=null;if(J!==null)return J;{let v$62;{let J$27=J;{let J=J$27;J=wU($,Z,null,X,Q,Y8),_.set(Z,J),$.bodies.add(J),EU($,J,Q.nodes.length,X.activeLayerList.length+yU);
v$62=J;}}J=v$62}let{starts:K,rows:V}=Vq(Q),Y=V>0?q7($,V*16,-1):null;J.block=Y;let U=new Float32Array(16);for(let q=0;Y!==null&&q<Q.skins.length;q++){{let q$4=q,J$28=J;{let q=q$4,J=J$28;let z=Q.skins[q].joints.length,j=K[q]*16;J.skins.push({slot:Y.slot+j,previous:Y.previous+j,floats:(z+2)*16,table:ML(J,Q,q),job:null,current:null,last:null,held:!1,collapsed:!1});let G=(z+1)*16;k$($.device,$.page,Y.slot+j+G,U),k$($.device,$.page,Y.previous+j+G,U)
}}}t1($,J);XQ($,J);DN($,J);return J}function DN($,Z){iZ($,nZ,Z),b8($,Z),OH($,Z),$.unposed.push(Z),c0(Z)}var zq=2048,VE=8192,PN=192,VJ=64;class jq{constructor(){this.units=0;}spend($=1){if(this.units+=$,this.units<VE)return!1;return this.units=0,!0}}function*SN($,Z,Q=zq){let X=Math.floor($.length/3),J=Math.floor(Z.length/3);if(J<=Q){{let Q$38=X,X$20=J;{let Q=Q$38,X=X$20;let J=Float32Array.of(1/0,1/0,1/0,-1/0,-1/0,-1/0);for(let K=0;K<X*3;K++)yN(J,0,$,Z[K]);return ({groups:1,vertexGroup:new Uint32Array(Q),boxes:J,triangles:Uint32Array.of(X)});}}}let K=new jq,V=yield*zE($,X,K),{componentOf:Y,components:U}=yield*YE(Z,V,X,J,K),q=new Uint32Array(U),z=yield*kN(U,K);for(let G=0;G<J;G++){let B=Y[Z[G*3]]-1;q[B]+=1;for(let M=0;M<3;M++)yN(z,B,$,Z[G*3+M]);if(K.spend(3))yield}let j=yield*jE(z,q,U,Q,K);return yield*UE(Y,j,z,q,X,K)}function*YE($,Z,Q,X,J){let K=new Int32Array(Q);for(let q=0;q<Q;q++)if(K[q]=q,J.spend())yield;for(let q=0;q<X;q++){let z=Z[$[q*3]];if(qq(K,z,Z[$[q*3+1]]),qq(K,z,Z[$[q*3+2]]),J.spend())yield}let V=new Int32Array(Q),Y=new Int32Array(Q),U=0;for(let q=0;q<X*3;q++){let z=$[q];if(V[z]===0){let j=vN(K,Z[z]);if(Y[j]===0)Y[j]=++U;V[z]=Y[j]}if(J.spend())yield}return{componentOf:V,components:U}}function*UE($,Z,Q,X,J,K){let V=X.length,Y=0;for(let j=0;j<V;j++)Y=Math.max(Y,Z[j]+1);let U=new Uint32Array(J);for(let j=0;j<J;j++){let G=$[j]-1;if(U[j]=G<0?0:Z[G],K.spend())yield}let q=yield*kN(Y,K),z=new Uint32Array(Y);for(let j=0;j<V;j++){let G=Z[j];z[G]+=X[j];for(let B=0;B<3;B++)q[G*6+B]=Math.min(q[G*6+B],Q[j*6+B]),q[G*6+3+B]=Math.max(q[G*6+3+B],Q[j*6+3+B]);if(K.spend())yield}return{groups:Y,vertexGroup:U,boxes:q,triangles:z}}function*CN($,Z){let Q=new jq,X=$.groups,J=new Uint32Array(X),K=Math.floor(Z.length/3);for(let z=0;z<K;z++)if(J[$.vertexGroup[Z[z*3]]]+=3,Q.spend())yield;let V=new Uint32Array(X),Y=0;for(let z=0;z<X;z++)V[z]=Y,Y+=Math.ceil(J[z]/PN)*PN;let U=new Uint32Array(Math.max(Y,3)),q=V.slice();for(let z=0;z<K;z++){let j=$.vertexGroup[Z[z*3]],G=q[j];if(U[G]=Z[z*3],U[G+1]=Z[z*3+1],U[G+2]=Z[z*3+2],q[j]=G+3,Q.spend(3))yield}return{list:U,starts:V,counts:J}}function*zE($,Z,Q){let X=new Uint32Array($.buffer,$.byteOffset,Z*3),J=TN(Z*2,1),K=J-1,V=new Int32Array(J),Y=new Int32Array(Z);for(let U=0;U<Z;U++){let q=X[U*3],z=X[U*3+1],j=X[U*3+2],G=(Math.imul(q,73856093)^Math.imul(z,19349663)^Math.imul(j,83492791))&K;for(;;){let B=V[G]-1;if(B<0){V[G]=U+1,Y[U]=U;break}if(X[B*3]===q&&X[B*3+1]===z&&X[B*3+2]===j){Y[U]=B;break}G=G+1&K}if(Q.spend())yield}return Y}function*kN($,Z){let Q=new Float32Array($*6);for(let X=0;X<$;X++)if(Q[X*6]=Q[X*6+1]=Q[X*6+2]=1/0,Q[X*6+3]=Q[X*6+4]=Q[X*6+5]=-1/0,Z.spend())yield;return Q}function yN($,Z,Q,X){for(let J=0;J<3;J++){let K=Q[X*3+J];if(K<$[Z*6+J])$[Z*6+J]=K;if(K>$[Z*6+3+J])$[Z*6+3+J]=K}}function*jE($,Z,Q,X,J){let K=new Uint32Array(Q),V=new Float32Array(Q*3);for(let j=0;j<Q;j++){K[j]=j;for(let G=0;G<3;G++)V[j*3+G]=($[j*6+G]+$[j*6+3+G])/2;if(J.spend())yield}let Y=new Int32Array(Q),U=new Float64Array(VJ),q=0,z=[0,Q];while(z.length>=2){let j=z.pop()??0;let G=z.pop()??0;let B=yield*GE(K,V,Z,G,j,J);let M;{let $=B;let Z=0;if($.high[1]-$.low[1]>$.high[Z]-$.low[Z])Z=1;if($.high[2]-$.low[2]>$.high[Z]-$.low[Z])Z=2;M=Z;}let L=B.high[M]-B.low[M];let F=B.total<=X||j-G<=1;if(!F&&!(L>0)){let W=G+(j-G>>1);z.push(W,j,G,W);continue}if(F){for(let W=G;W<j;W++)if(Y[K[W]]=q,J.spend())yield;q+=1;continue}let H=yield*ME(K,V,Z,G,j,M,B,U,J),N=yield*FE(K,V,G,j,M,H,J),I=N===G||N===j?G+(j-G>>1):N;z.push(I,j,G,I)}return Y}function*GE($,Z,Q,X,J,K){let V={total:0,low:[1/0,1/0,1/0],high:[-1/0,-1/0,-1/0]};for(let Y=X;Y<J;Y++){let U=$[Y];V.total+=Q[U];for(let q=0;q<3;q++)V.low[q]=Math.min(V.low[q],Z[U*3+q]),V.high[q]=Math.max(V.high[q],Z[U*3+q]);if(K.spend())yield}return V}function*ME($,Z,Q,X,J,K,V,Y,U){Y.fill(0);let q=V.low[K],z=VJ/(V.high[K]-q);for(let B=X;B<J;B++){let M=$[B];if(Y[Math.min(VJ-1,Math.floor((Z[M*3+K]-q)*z))]+=Q[M],U.spend())yield}let j=0,G=1;for(;G<VJ;G++)if(j+=Y[G-1],j*2>=V.total)break;return q+G/z}function*FE($,Z,Q,X,J,K,V){let Y=Q,U=X-1;while(Y<=U){if(Z[$[Y]*3+J]<K)Y+=1;else{let q=$[Y];$[Y]=$[U],$[U]=q,U-=1}if(V.spend())yield}return Y}var LE=8192,Mq=16,_N=($)=>($===0?Mq:jQ[G9[$][3]].stride)/4,Gq=new WeakMap;function uN($,Z,Q){let X=Gq.get($);if(X===void 0)Gq.set($,X=new Map);let J=X.get(Z);if(J!==void 0&&J.state!=="failed")return J.holds+=1,J;let K=Q.flatMap(function(q,z){let j=$.parsed.meshes[q.meshIndex]?.primitives[q.primitiveIndex];let G;{let Z=q.nodeIndex;let Q=$.parsed.nodes[Z],X=Q===void 0?void 0:$.parsed.nodes[Q.parent];G=X!==void 0&&Q.name.startsWith(`${X.name}#`)?Number(Q.name.slice(X.name.length+1)):NaN;}let B=(G>=0&&EN(q.bounds.max[1]-q.bounds.min[1])?4294967296:0)+(Math.imul(z+1,2654435761)>>>0);return j===void 0||q.restWorld===null?[]:[{prim:q,row:j,rest:q.restWorld,copy:G,order:B}]}).sort((q,z)=>q.order-z.order);let V=new Uint32Array(K.length+1);let Y=0;for(let[q,{prim:z}]of K.entries())V[q+1]=V[q]+(z.surface.indices?.length??z.vertexCount),Y+=z.vertexCount;let U={asset:$,key:Z,copies:K,streams:[],index:null,indexFormat:"uint32",owned:[],vertexCount:Y,prefix:V,bounds:null,fixed:K.filter(({order:q})=>q<4294967296).length,state:"owed",holds:1,sources:new Map};return X.set(Z,U),U}function mN($,Z){for(let Q of Z.owned)q8($).release(Q);Z.owned=[],Z.streams=[],Z.index=null}function fN($,Z,Q){if(Z.holds>0)return!0;if(Z.state==="baking")return!1;for(let J of Z.sources.values())if(J.external!==void 0&&Q(J.external.key))return!1;mN($,Z);let X=Gq.get(Z.asset);if(X?.get(Z.key)===Z)X.delete(Z.key);return!0}function NE($,Z,Q,{prim:X,row:J,rest:K,copy:V}){let[Y,,,U]=G9[Q];let q=_N(Q);let z=X.vertexCount;let j=new Float32Array($.buffer);let G=J[Y]??new Float32Array(z*4);if(Q===0){let M=Bq({position:J.position,restWorld:K});for(let L=0;L<z;L++)j.set(M.subarray(L*3,L*3+3),Z+L*q),$[Z+L*q+3]=V;return}if(Q===1)G=wN({normal:J.normal,restWorld:K})??G;let{encoding:B}=jQ[U];if(B==="raw")j.set(G.subarray(0,z*q),Z);else RN(B,G,0,z,$.subarray(Z))}function*bN({copies:$,prefix:Z},Q,X){let J=0;for(let[K,{prim:V,row:Y,rest:U}]of $.entries()){let q=B9(U,0)?YJ(V.surface.indices,V.vertexCount):V.surface.indices;for(let z=Z[K];z<Z[K+1];z++)Q[z]=J+(q?.[z-Z[K]]??z-Z[K]);if(X?.set(Bq({position:Y.position,restWorld:U}),J*3),J+=V.vertexCount,(K&1023)===1023)yield}}function hN($){let Z={positions:new Float32Array($.vertexCount*3),indices:new Uint32Array($.prefix[$.copies.length])};return Array.from(bN($,Z.indices,Z.positions)),Z}function*pN($,Z,Q){let X=Q.copies[0].prim,J=Q.copies.length===1,K=q8($),V=`copy-bake ${Z.modelId}`;try{for(let U=0;U<G9.length;U++){let q=G9[U][2];let z=_N(U);if(X[q]===null)continue;if(J&&U>1){Q.streams.push(X[q]);continue}let j=new Uint32Array(Q.vertexCount*z),G=0,B=0;for(let L of Q.copies){NE(j,G,U,L);G+=L.prim.vertexCount*z;B+=L.prim.vertexCount;if(B>=LE)B=0,yield;if(Q.holds<=0||Z.disposed)return}let M=K.alloc(j.byteLength,V);$.queue.writeBuffer(M.buffer,M.offset,j.buffer,0,j.byteLength),Q.streams.push(M),Q.owned.push(M)}if(Q.bounds=ON(new Float32Array(Q.copies.flatMap(({prim:{bounds:U}})=>[...U.min,...U.max]))),J&&X.index!==null&&!B9(Q.copies[0].rest,0)){Q.index=X.index,Q.indexFormat=X.indexFormat??"uint32",Q.state="ready";return}let Y=new Uint32Array(Q.prefix[Q.copies.length]);yield*bN(Q,Y),Q.index=K.alloc(Y.byteLength,V),Q.owned.push(Q.index),$.queue.writeBuffer(Q.index.buffer,Q.index.offset,Y.buffer,0,Y.byteLength),Q.state="ready"}catch{Z.copiesRefused=!0}finally{if(Q.state!=="ready"){Q.state="failed";mN($,Q)}}}function NQ($,Z=!1){return{skinned:$.skinIndex!==null,hasMorph:Z,hasNormal:$.normal!==null,hasUv:$.uv0!==null,hasUv1:$.uv1!==null,hasUv2:$.uv2!==null,hasUv3:$.uv3!==null,hasColor:$.color!==null}}function WQ($,Z="model"){return`${Z}:p${$.hasNormal?"n":""}${$.hasUv?"u":""}${$.hasUv1?"v":""}${$.hasUv2?"w":""}${$.hasUv3?"x":""}${$.hasColor?"c":""}`}function Wq($,Z){let Q=[],X=[],J=0,K=function(V,Y){let{format:U,stride:q,encoding:z}=jQ[Y];Q.push({name:V,format:U,offset:0,shaderLocation:J,...z==="oct16"||z==="srgb8"?{encoding:z}:{}}),X.push({arrayStride:q,attributes:[{format:U,offset:0,shaderLocation:J}]}),J+=1};for(let[V,Y,,U]of G9)if(Y===null||$[Y])K(V,U);if(Z)K("joints","joints"),K("weights","weights");return{attributes:Q,buffers:X}}var lN=new Map;function xJ($,Z=!1){let Q=WQ($,Z?"copies":void 0),X=lN.get(Q);if(X)return X;let{attributes:J,buffers:K}=Wq($,!1);if(Z){let Y={format:"uint32",offset:12,shaderLocation:J.length};J.push({name:QW,...Y}),K[0]={arrayStride:Mq,attributes:[...K[0].attributes,Y]}}let V={key:Q,vertexLayout:{arrayStride:K[0].arrayStride,attributes:J},vertexBuffers:K,lanes:(NJ().store).NO_SCRIPTED_VERTEX_LANES,fixedFunction:!0,sortBand2d:!0,sortBandRelief:!0,bodyOpacity:!0};return lN.set(Q,V),V}function I7($,Z,Q=!1){let X=[];for(let[,J,K]of G9){let V=$[K];if(V!==null&&(J===null||Z[J]))X.push(V)}if(Q&&$.joints&&$.weights)X.push($.joints,$.weights);return X}var WE=1,dN=new WeakMap;function L6($){let Z=dN.get($);if(Z===void 0)Z=WE++,dN.set($,Z);return`${$.modelId}@${Z}`}var IE=new WeakMap;function xE($){return g9(IE,$,(Z)=>Object.create(Z,{standIn:{value:8421631}}))}function DJ($,Z,Q,X=!1,J=!1,K=!1){let V=(Z!==null?$.materials[Z]:void 0)??$.defaultMaterial,Y=V.source.baseColorFactor,U=[Q.hasUv,Q.hasUv1??!1,Q.hasUv2??!1,Q.hasUv3??!1],q=JW(V.source,(D)=>U[D]===!0),z=U[q]?V.baseColorTexture:null,j=z!==null?$.textures[z]:void 0,G=X&&U[q],B=XW(V.source)?.transform??null,M=Fq(B)?null:B,L=J&&j===void 0&&!Q.hasColor,F="";if(L)F=K?"h":"o";let{normalTexture:H,metallicRoughnessTexture:N,occlusionTexture:I,metallicFactor:W,roughnessFactor:P}=V.source,x=[];for(let[D,v,k]of[["normal",H,H?.scale??1],["metalRough",N,1],["occlusion",I,I?.strength??1]]){let S=v&&U[v.texCoord]?$.textures[v.texture]:void 0;if(v&&S){x.push({slot:D,handle:D==="normal"?xE(S):S,uv:v.texCoord,transform:Fq(v.transform)?null:v.transform,scale:k,factors:[W,P]})}}return{key:`${L6($)}#m${Z??"d"}u${q}${G?"p":""}${F}${x.length>0?VW:""}`,color:[Y[0],Y[1],Y[2]],...j?{textureHandle:j}:{},...j||G?{textureUv:q,...M!==null?{textureTransform:M}:{}}:{},partPicture:G,vertexColor:Q.hasColor,...L?{ownPaint:!0}:{},...L&&K?{ownPaintUnseen:!0}:{},maps:x}}var cN=new WeakMap;function Iq($,Z,Q,X,J,K,V,Y,U){let{min:q,max:z}=U,j=p$(z,q)/2,G=ZW(U)?[0,0,0]:eN(U);return{signature:$,lanes:Q.lanes,skinned:!1,parts:()=>null,external:{key:$,model:Z,layout:Q,vertexBuffers:X,positionStride:Q.vertexBuffers[0].arrayStride,indexBuffer:J,indexFormat:K,indexCount:V,vertexCount:Y,localCenter:G,localRadius:isFinite(j)&&j>0?j:1}}}var nN=new WeakMap,PE=0;function TE($){let Z=nN.get($);if(Z===void 0)nN.set($,Z=++PE);return Z}function GW($,Z,Q,X){let J=`${Z.id}#scripted:${Q.modelId}:${TE(Q)}:${X}`;while($.leaving.has(J))J+="~";return J}var BW={kind:"whole"},MW={kind:"caster"};function IQ($,Z,Q=BW){let{visual:X,asset:J}=$,K=Z.group,V=Q.kind!=="group";return{script:K.script,overrides:K.overrides,geometry:Q.kind==="group"?Q.geometry:vE(J,Z),...V?{medium:{build:IJ((Y)=>WJ(Z.bake?hN(Z.bake):Z.prim.surface,Y))}}:{},...SE(Z,Q),castShadow:V&&X.shadow?.castShadow!==!1,receiveShadow:X.shadow?.receiveShadow!==!1,stands:!0,pickable:!1,composeMatrix:(Y,U)=>O9(Y,U,X),liftLayer:()=>0,resync:$.resync,owner:X.ownerEntityId,...K.partKey===void 0?{}:{part:K.partKey},surface:K.surface,parkedLook:K.parkedLook,cameraHiddenCasts:!0,...Q.kind==="caster"?{castsOnly:!0}:{},...X.cullBypassFrustum?{cullBypassFrustum:!0}:{}}}function vE($,{group:Z,bake:Q,primitiveIndex:X,prim:J}){if(!Q?.index){{let Z$59=X,Q$39=J,X$21=Z.sig,J$12=Z.layout;{let Z=Z$59,Q=Q$39,X=X$21,J=J$12;let K=cN.get(Q)??Iq(`${L6($)}:p${Z}`,$.modelId,J,I7(Q,X),Q.index,Q.indexFormat??"uint32",Q.indexCount,Q.vertexCount,Q.localBounds);return cN.set(Q,K),K}}}let K=Math.max(1,Q.fixed+Math.round((Math.min(1,gN().decorationDensityScale/AN))*(Q.copies.length-Q.fixed)));let V=Q.prefix[K];let Y=Q.sources.get(V)??Iq(`${Q.key}:k${V}`,Q.asset.modelId,xJ(Z.sig,!0),Q.streams,K===Q.copies.length?Q.index:gW(Q.index,0,V*4),Q.indexFormat,V,Q.vertexCount,Q.bounds??$W());return Q.sources.set(V,Y),Y}function SE($,Z){if(Z.kind==="group")return{ladder:Z.ladder,opaqueOnly:!0};let Q=$.clusters??null;return Z.kind==="whole"&&Q!==null&&Q.cut.groups===1?{ladder:Q.ladders[0]}:{}}function xQ($,Z){let Q=Z.clusters??null;return IQ($,Z,Q===null||!Q.shown||Q.cut.groups===1?BW:MW)}function xq($,Z){for(let Q=0;Q<Z.length;Q++){let X=Z[Q];if($.lane.sync(X.laneId,IQ($,X)))continue;for(let J=0;J<Q;J++)$.lane.remove(Z[J].laneId);return!1}return!0}function FW($,Z,Q){let X=new Map;for(let V of Z){if(V.prim.restWorld===null)continue;let Y=X.get(V.group)??[];Y.push(V),X.set(V.group,Y)}let J=[],K=[];for(let V of X.values()){let Y=V.length<2||V[0].prim.indexCount>3*zq;for(let U of Y?V.map((q)=>[q]):[V]){let q=uN($,`${L6($)}:b${U[0].primitiveIndex}x${U.length}`,U.map((z)=>z.prim));(q.state==="ready"&&!PQ(Q,U[0].group.script)?K:J).push({...U[0],laneId:`${U[0].laneId}:copies`,bake:q,clustersRefused:!Y||B9(q.copies[0].rest,0)})}}if(X.size>0)Z.splice(0,Z.length,...Z.filter((V)=>V.prim.restWorld===null),...K);return J}function ws($,Z,Q,X,J,K,V){if(W7(Z,J.ref)||Q.copiesRefused)return null;let Y=new Map,U=[],q=Nq(Z,{script:J,overrides:K});Q.primitives.forEach(function(G,B){if(G.index&&!G.indexCount)return;let M=NQ(G),L=`${WQ(M)}|m${G.materialIndex??"d"}`,F=Y.get(L);if(!F){let H=xJ(M),N=DJ(Q,G.materialIndex,M);F={sig:M,layout:H,surface:N,script:J,overrides:K,parkedLook:q},Y.set(L,F)}U.push({laneId:GW($,X,Q,B),group:F,primitiveIndex:B,prim:G})});let z=FW(Q,U,Z);if(U.length+z.length===0)return null;let j={lane:$,asset:Q,visual:X,groups:[...Y.values()],members:U,resync:V,script:J,overrides:K,overridesKey:N7(K??null),copiesOwed:z};if(!xq(j,U)){{let $=[...U,...z];for(let Z of $)if(Z.bake)Z.bake.holds-=1;return null}}return PW(j),j}function iN($,Z=!1,Q=!1){for(let X of $.members){if(Z||!Q)Hq($,X,Z);else Hq($,X,X.clusters?.shown===!0,X.laneId);$.lane.remove(X.laneId,Z)}gE($);$.members.length=0;$.groups.length=0}function Rs($,Z=new Set){for(let Q of $.members){HW(Q,Z);}return Z}function HW($,Z){if(Z.add($.laneId),$.clusters)for(let Q of $.clusters.bodies)Z.add(Q);return Z}var oN=new Set;function Es($,Z,Q){for(let X of $.members){if(X.bake)continue;let J=X.primitiveIndex*2,K=Q?.[J+1]??-1;L9(oN);for(let V of HW(X,oN)){(NJ().store).rideScriptedLaneBody(Z,V,K<0?-1:Q?.[J]??-1,K)}}}function _s($,Z,Q,X){if(W7($,Q.ref)||Z.joinRefused)return iN(Z),!1;let J=Nq($,{script:Q,overrides:X});for(let K of Z.groups)K.script=Q,K.overrides=X,K.parkedLook=J;Z.script=Q,Z.overrides=X,Z.overridesKey=N7(X??null),TQ(Z);for(let K of Z.members){if(Z.lane.sync(K.laneId,xQ(Z,K))){wW(Z,K);continue}return iN(Z),!1}return!0}function us($){return NW($,(Z)=>Z?.visible()??!1)}function ms($){return $.members.length>0&&!NW($,(Z)=>!(Z?.viewCulled()??!1))}function NW($,Z){for(let Q of $.members){let X=Q.clusters;for(let J of X?.shown===!0&&X.bodies.length>0?X.bodies:[Q.laneId])if(Z($.lane.entities.get(J)))return!0}return!1}function fs($){if($.members.length===0)return!1;let Z=!1;for(let Q of $.members){let X=$.lane.entities.get(Q.laneId)?.foldsToPoint()??null;if(X===!1)return!1;if(X===null)Z=!0}return Z?null:!0}function WW($){let Z={};for(let[Q,X]of $)Z[Q]=X.ref;return N7(Z)}function DQ($,Z,Q,X){let J=new Map;if(!Q.model.subScripts||Z.copiesRefused)return J;Z.primitives.forEach(function(K,V){if(X&&!X(K))return;let Y=IW(Q,Z,V);if(!Y||J.has(Y.key)||W7($,Y.script.ref)||CE($,Y.script))return;J.set(Y.key,Y.script)});return J}function IW($,Z,Q){let X=FQ($,Z,Q);return X&&LQ($,X.material.name,X.nodeName,X.primitiveId)}function CE($,Z){return HQ($,Z.ref)===void 0&&!MQ($,Z.ref,!1)}function kE(a,b,c){return (kE=$c0C(54)).call(this,a,b,c)}function bs($,Z,Q,X,J,K,V=DQ(Z,Q,J)){if(V.size===0)return null;let Y=!kE(Q,J,V);let U=new Map;let q=new Map;Q.primitives.forEach(function(G,B){if(G.index&&!G.indexCount)return;let M=IW(J,Q,B);if(!M)return;let L=V.get(M.key);if(!L)return;let F=NQ(G),H=`${WQ(F)}|m${G.materialIndex??"d"}|p:${M.key}`,N=U.get(H);if(!N){let P=xJ(F),x=DJ(Q,G.materialIndex,F,!0,!0,Y);N={sig:F,layout:P,surface:x,script:L,overrides:F6(J,M.key),parkedLook:"own-paint",partKey:M.key},U.set(H,N)}let I={laneId:GW($,X,Q,B),group:N,primitiveIndex:B,prim:G},W=q.get(M.key);if(W)W.push(I);else q.set(M.key,[I])});let z={lane:$,asset:Q,visual:X,groups:[],members:[],partKeys:[],owedKeys:[],refsKey:"",resync:K,copiesOwed:[]},j=[];for(let[G,B]of q){let M=FW(Q,B,Z);if(xq(z,B)){for(let F of B)z.members.push(F);z.copiesOwed.push(...M);continue}{let $=[...B,...M];for(let Z of $)if(Z.bake)Z.bake.holds-=1;(null);}let L=V.get(G);if(V.delete(G),L!==void 0&&PQ(Z,L))j.push(G)}if(V.size===0&&j.length===0)return null;z.groups=[...U.values()].filter((G)=>V.has(G.partKey));z.owedKeys=j.sort((G,B)=>G.localeCompare(B));z.partKeys=[...V.keys(),...j].sort((G,B)=>G.localeCompare(B));z.refsKey=WW(V);PW(z);return z}function PQ($,Z){return MQ($,Z.ref,HQ($,Z.ref)!==void 0)}function hs($,Z){for(let Q of Z.groups)if(PQ($,Q.script))return!0;return!1}function ps($,Z,Q,X){if(Z.owedKeys.length===0)return!1;let J=DQ($,Q,X);for(let K of Z.owedKeys){let V=J.get(K);if(V!==void 0&&PQ($,V))return!0}return!1}function ls($){$.unseen=!0,TQ($);for(let Z of $.members)$.lane.setHide(Z.laneId,-1)}function ds($){$.unseen=!1,TQ($);for(let Z of $.members)$.lane.showInPlace(Z.laneId)}function cs(a){return (cs=$c0C(55)).call(this,a)}function ns($,Z,Q,X){return yE($,Z,Q,X)&&AE(Z)}function yE($,Z,Q,X){if(Z.owedKeys.length>0||Z.joinRefused)return!1;let J=DQ($,Q,X);if(J.size!==Z.partKeys.length||WW(J)!==Z.refsKey)return!1;TQ(Z);for(let K of Z.groups){let V=J.get(K.partKey);if(!V)return!1;K.script=V,K.overrides=F6(X,K.partKey)}return!0}function AE($){TQ($);for(let Z of $.members){if(!$.lane.sync(Z.laneId,xQ($,Z)))return!1;wW($,Z)}return!0}var z8=6,Dq=($)=>4+2*$,GQ=8,j8={steps:0,judged:0,walked:0,stepped:0,reboxed:0,swept:0,moves:0,cells:0,tested:0},xW=null;function is(){return $c0C(56).call(this)}var F9=new WeakMap,B6=new WeakMap,DW=0,Pq=new Float64Array(0),sN=new Float32Array(16);function os($){for(let Z of $.primitives){let Q=B6.get(Z);if(Q===void 0)continue;let X=qW(Q.device);for(let J of[...Q.levels,...Q.leaving])if(J.held&&J.slice!==null&&X.lost(J.slice))return!0}return!1}function PW($){let Z=$.lane,Q=F9.get(Z);if(Q===void 0){F9.set(Z,Q={lane:Z,states:new Set,builds:[],prims:new Set,sweep:new Set,awake:new Map,stirred:new Set,eyes:new Float64Array(0),looks:[],cells:new Map,owing:new Set,letGo:[],keep:(Math.min(1,gN().decorationDensityScale/AN))});}if(Q.states.add($),Q.stirred.add($),$.copiesOwed.length>0)Q.owing.add($);for(let X of $.members){let J=B6.get(X.prim);if(J!==void 0&&J.bake===X.bake&&Tq($,X))J.holders.set(X,$)}}function gE($){let Z=F9.get($.lane);if(Z===void 0)return;Z.states.delete($),Z.stirred.delete($),Z.owing.delete($);for(let Q of[...$.members,...$.copiesOwed]){if(Q.bake)Z.letGo.push(Q.bake),Q.bake.holds-=1;Z.awake.delete(Q);TJ(Q);RW:{let $=Q;$.clustersRefused=!0;let Z=B6.get($.prim);if(Z===void 0)break RW;Z.holders.delete($),x7(Z)}}}function TQ($){let Z=F9.get($.lane);if(Z?.states.has($)===!0)Z.stirred.add($)}function OE($,Z){return Tq($,Z)&&PJ($,Z)==="opaque"}function Tq(a,b){return (Tq=$c0C(57)).call(this,a,b)}function PJ($,Z){let Q=$.lane.bodyBlends(Z.laneId);if(Q===null)return"waits";return Q||BJ(Z.group.overrides)?"blends":"opaque"}function vq($,Z){return!Tq($,Z)||PJ($,Z)==="blends"}function TW($){return{error:$,starts:null,counts:null,slice:null,format:"uint32",held:!1,serial:0,users:0,queued:!1,refused:!1,sources:new Map,waiters:new Map}}function wE($,Z,Q,X){let{prim:J,bake:K}=Q,V=B6.get(J);if(V?.device===X&&V.bake===K)return V.holders.set(Q,Z),V.lanes.add($.lane),V;let Y=NQ(J),U=TW(0);return U.queued=!0,V={home:$,prim:J,primitiveIndex:Q.primitiveIndex,asset:Z.asset,device:X,layout:xJ(Y,K!==void 0),buffers:K===void 0?I7(J,Y):K.streams,bake:K,cut:null,rows:J.levels,levels:[U],errors:[],ladders:[],members:0,holders:new Map([[Q,Z]]),leaving:new Set,lanes:new Set([$.lane])},B6.set(J,V),$.prims.add(V),$.builds.push(RE(V)),V}function*RE($){let Z=$.levels[0];try{let Q=$.prim.surface.indices;if(Q===null)return;let X=yield*SN($.prim.surface.positions,Q);if($.cut=X,vW($),X.groups===1)yield*kW($,Z,null);else yield*SW($,Z)}finally{Z.queued=!1,Sq(Z),x7($)}}function vW(a){return (vW=$c0C(58)).call(this,a)}function*SW($,Z){try{let Q=$.cut,X=$.levels.indexOf(Z);if(Q===null||X<0)return;let v$30;EE:{let Z$60=X;{let Z=Z$60;let Q=$.prim;if(Z===0){v$30=Q.surface.indices;break EE;}let X=$.rows[Z-1];if(X.list!==void 0){v$30=X.list;break EE;}let J=$.asset.parsed.lods?.[Z-1]?.indices[Q.ordinal];if(J===void 0){v$30=null;break EE;}v$30=Q.mirrored?YJ(J,0):J;}}let J=v$30;if(J===null){Z.refused=!0;return}if(Q.groups===1){yield*kW($,Z,J);return}let K=yield*CN(Q,J);if(!$.levels.includes(Z))return;Z.starts=K.starts,Z.counts=K.counts;let Y=q8($.device).alloc(K.list.byteLength,`cluster-groups ${$.asset.modelId}`);yield*yW($.device,Y,K.list),BQ($,Z,Y,!0,"uint32")}finally{Z.queued=!1,Sq(Z),x7($)}}function Sq($){for(let[Z,Q]of $.waiters){Z.waits=void 0;_E:{let $$45=Z,Z$61=Q;{let $=$$45,Z=Z$61;let Q=F9.get(Z.lane);if(Q?.states.has(Z)!==!0)break _E;TJ($),Q.awake.set($,Z)}}}$.waiters.clear()}function CW($,Z,Q){if(!$.queued)return;Z.waits=$,$.waiters.set(Z,Q)}function*kW($,Z,Q){let X=$.levels.indexOf(Z),J=X>0?$.rows[X-1]:null;if(X===0&&$.prim.index!==null)return BQ($,Z,$.prim.index,!1,$.prim.indexFormat??"uint32");if(J!==null&&J.index!==null)return BQ($,Z,J.index,!1,"uint32");if(Q===null)return;let K=q8($.device),V=K.join(Q);if(V!==null)return BQ($,Z,V,!0,"uint32");let Y=K.alloc(Q.byteLength,`cluster-groups ${$.asset.modelId}`);yield*yW($.device,Y,Q),K.publish(Q,Y),BQ($,Z,Y,!0,"uint32")}function*yW($,Z,Q){for(let X=0;X<Q.byteLength;X+=Lq){if(X>0)yield;$.queue.writeBuffer(Z.buffer,Z.offset+X,Q.buffer,Q.byteOffset+X,Math.min(Lq,Q.byteLength-X))}}function BQ($,Z,Q,X,J){Z.slice=Q,Z.format=J,Z.held=X,Z.serial=++DW,Z.sources=new Map,kq($)}function Cq($){return $.slice!==null&&$.starts!==null&&$.counts!==null}function AW($,Z,Q){if(Cq(Q))return!0;if(Q.queued||Q.refused||Z.cut===null)return!1;return Q.queued=!0,$.builds.push(SW(Z,Q)),!1}function gW($,Z,Q){let X=UW();return{get buffer(){return $.buffer},get offset(){return $.offset+Z},size:Q,id:X}}function uE($,Z,Q,X){let J=`${L6($.asset)}:p${$.primitiveIndex}:c${Q.serial}:g${X}`,K=Q.sources.get(J);if(K!==void 0)return K;let V=Z.boxes,Y=X*6,U=Q.format==="uint16"?2:4,q={min:[V[Y],V[Y+1],V[Y+2]],max:[V[Y+3],V[Y+4],V[Y+5]]},z=Iq(J,$.asset.modelId,$.layout,$.buffers,gW(Q.slice,Q.starts[X]*U,Q.counts[X]*U),Q.format,Q.counts[X],$.prim.vertexCount,$.bake===void 0?q:MJ(q,$.bake.copies[0].rest));return Q.sources.set(J,z),z}function mE(a,b){return (mE=$c0C(59)).call(this,a,b)}function kq(a){return (kq=$c0C(60)).call(this,a)}function OW($,Z){Z.users+=1,$.leaving.delete(Z)}function jJ($,Z){if(Z.users-=1,Z.users===0&&(Z!==$.levels[0]||$.members===0))$.leaving.add(Z),x7($)}var fE=0;function bE($,Z,Q,X){let J=X.groups,K={clusters:Q,cut:X,ladders:Q.ladders,levels:Q.levels,bodies:[],shown:J===1,at:new Int32Array(J),spheres:new Float64Array(J*4),scale:0,world:new Float32Array(16),bands:Pq,short:0};Q.members+=1;Z.clusters=K;OW(Q,Q.levels[0]);if(J===1){if($.lane.setLevel(Z.laneId,0),!$.lane.sync(Z.laneId,xQ($,Z)))M9($,Z,!0);return}for(let V=0;V<J;V++){let Y=`${Z.laneId}:c${++fE}`;if(K.bodies.push(Y),!yq($,Z,K,V,Y))return M9($,Z,!0);$.lane.setHide(Y,-1)}}function yq($,Z,Q,X,J){let K=Q.clusters.levels[0];if(!Cq(K))return!1;return $.lane.sync(J,IQ($,Z,{kind:"group",geometry:uE(Q.clusters,Q.cut,K,X),ladder:Q.ladders[X]}))}function Hq(a,b,c,d){return (Hq=$c0C(61)).call(this,a,b,c,d)}function wW(a,b){return (wW=$c0C(62)).call(this,a,b)}function M9(a,b,c){return (M9=$c0C(63)).call(this,a,b,c)}function EW(a,b,c){return (EW=$c0C(64)).call(this,a,b,c)}function hE(a,b,c){return (hE=$c0C(65)).call(this,a,b,c)}function pE(a,b,c,d,e,f){return (pE=$c0C(66)).call(this,a,b,c,d,e,f)}function lE($,Z,Q,X,J,K){let V=Z.visual;if(!M6(X.world,V.world)){j8.reboxed+=1;let Y=X.scale;iE:{let $$47=X,Z$62=V.world,Q$40=Q.prim.restWorld;{let $=$$47,Z=Z$62,Q=Q$40;let X=$.world;for(let Y=0;Y<16;Y++)X[Y]=Z[Y];let J=X;if(Q!==null)f(X,0,Q,0,sN,0),J=sN;$.scale=s0(X,0);let K=s0(J,0),V=$.clusters.cut?.boxes;if(V===void 0)break iE;for(let Y=0;Y<$.at.length;Y++){let U=Y*6,q=(V[U]+V[U+3])/2,z=(V[U+1]+V[U+4])/2,j=(V[U+2]+V[U+5])/2,G=Y*4;for(let B=0;B<3;B++)$.spheres[G+B]=J[B]*q+J[4+B]*z+J[8+B]*j+J[12+B];$.spheres[G+3]=c(V[U+3]-V[U],V[U+4]-V[U+1],V[U+5]-V[U+2])/2*K}}}if(X.scale!==Y)X.bands=Pq}if(X.short===0&&uW(X,J,K))return;j8.walked+=1;dE($,Z,Q,X,J,K)}function dE(a,b,c,d,e,f){return (dE=$c0C(67)).call(this,a,b,c,d,e,f)}function cE(a,b,c,d,e,f,g){return (cE=$c0C(68)).call(this,a,b,c,d,e,f,g)}function _W($,Z,Q,X){let J=Math.max(c($[Z]-Q[X],$[Z+1]-Q[X+1],$[Z+2]-Q[X+2])-$[Z+3],0);return zJ(J,Q[X+3],Q[X+4],Q[X+5],qJ)}function uW($,Z,Q){let X=$.at.length,J=Z.length/z8;if($.bands.length!==X*J*2||X===0)return!1;for(let K=0;K<X;K++)if(!mW($.spheres,K*4,$.bands,K*J*2,Z,Q))return!1;return!0}function mW($,Z,Q,X,J,K){for(let V=0;V<J.length;V+=z8,X+=2){let Y=isNaN(Q[X]);if(Y!==K($,Z,V))return!1;if(Y||!(J[V+3]>0))continue;let U=_W($,Z,J,V);if(!(U>=Q[X]&&U<Q[X+1]))return!1}return!0}function oE($){if($.builds.length===0||!tN("clusters"))return;let Z=a0(),Q=GJ(),X=i(Q)?Z+Q:-1/0,J=!1;while($.builds.length>0&&!(J&&rN(aN.clusterGroupsSpent,a0()>=X))){let v$63;{let J$29=J;{let J=J$29;if(J=!0,j8.steps+=1,$.builds[0].next().done===!0)$.builds.shift();
v$63=J;}}J=v$63}H9(a0()-Z)}function sE(a,b){return (sE=$c0C(69)).call(this,a,b)}function x7($){$.home.sweep.add($)}function tE($){for(let Z of $.sweep){ad(Z,$);}}function aE($,Z){let Q=new Set;for(let J of $.owing){bd(J,$,Z,Q);}for(let J of Q)J.resync();let X=(Math.min(1,gN().decorationDensityScale/AN));if(X!==$.keep){{for(let J of $.states)for(let K of J.members)if(K.bake)J.lane.sync(K.laneId,xQ(J,K))
}}$.keep=X;if($.letGo.length>0){dd($,Z);}}function ss(a,b,c,d,e){return (ss=$c0C(70)).call(this,a,b,c,d,e)}function rE($,Z,Q,X){for(let J of $.stirred){{let J$30=J;{let J=J$30;for(let K of J.members)$.awake.set(K,J);
}}}$.stirred.clear();for(let[J,K]of $.awake){eE:{let Z$63=K,Q$41=J,X$22=Z,J$13=Q,K$7=X;{let Z=Z$63,Q=Q$41,X=X$22,J=J$13,K=K$7;j8.stepped+=1;TJ(Q);pE($,Z,Q,X,J,K);let V;$_:{let $$103=Z,Z$118=Q,Q$77=J,X$40=K;{let $=$$103,Z=Z$118,Q=Q$77,X=X$40;{let J=Z.clusters??null;if(J===null){{V=Z.waits===void 0&&Z.clustersRefused!==!0&&$.unseen!==!0&&!vq($,Z)&&!BJ(Z.group.overrides)?"awake":"never";break $_;}}if(!J.shown||PJ($,Z)==="waits"){V="awake";break $_;}{V=uW(J,Q,X)?"rests":"awake";break $_;}
}}}if(V==="awake"){$.awake.set(Q,Z);break eE;}$.awake.delete(Q);if(V==="rests"){Z_($,Z,Q)}}}}}function Z_(a,b,c){return (Z_=$c0C(71)).call(this,a,b,c)}function fW(a,b,c){return (fW=$c0C(72)).call(this,a,b,c)}function TJ(a){return (TJ=$c0C(73)).call(this,a)}function Q_(a,b,c){return (Q_=$c0C(74)).call(this,a,b,c)}function ts($,Z){let Q=F9.get($);if(Q===void 0)return 0;let X=Q.eyes.length===Z*z8,J=0;for(let K of Q.states){for(let V of K.members){if(V.clusters?.shown===!0&&(!X||J_(K,V)))J+=1;}}return J}function J_($,Z){let Q=Z.clusters??null;if(Q===null||!Q.shown)return!1;return Q.short>0||!$.lane.bodyAtRest(Z.laneId)||Q.bodies.some((X)=>!$.lane.bodyAtRest(X))}var gq=90,Oq=0.016666666666666666,es={key:Aq,script:{ref:Aq,params:{...bW}}};function $t($){let{materialKey:Z,subOverrides:Q,subScripts:X,...J}=$;return J}function hW($){if($.material)return $.material;return $.model.materialKey?{key:$.model.materialKey}:null}var pW=new Map;function K_(a,b){return (K_=$c0C(75)).call(this,a,b)}function V_($,Z){return AJ(Z.overrides)===null?null:`${$.id}#view:${Z.primitives.join(",")}`}function H6($){return $.skinIndex===null||$.joints!==null&&$.weights!==null}function RI($,Z,Q){let X=Z!==null&&AJ(Z.overrides)!==null?"whole":"",J=$.model.subOverrides;if(Q.size>0&&J){for(let K in J)if(Q.has(K)&&AJ(J[K])!==null)X+=`|p:${K}`}return X}var lW=new WeakMap;function U_($,Z,Q,X){let J=new Map,K={};for(let[G,B]of X)K[G]=B.ref,J.set(G,B.ref);let V=Object.keys(Z.model.subScripts??{}).sort((G,B)=>G.localeCompare(B));let Y=qI(Z);let U=$.asset.primitives.flatMap((G,B)=>$.morphSlotByPrim[B]?[B]:[]);let q=(Z.shadow?.receiveShadow!==!1);let z=RI(Z,Q,X);return{key:N7({asset:L6($.asset),whole:Q?{ref:Q.script.ref}:null,parts:K,authored:V,hidden:Y,morph:U,receives:q,...z===""?{}:{views:z}}),asset:$.asset,whole:Q?.script.ref??null,parts:J,authored:new Set(V),hidden:new Set(Y),morph:U,receives:q,views:z}}function q_(a,b,c,d,e){return (q_=$c0C(76)).call(this,a,b,c,d,e)}var hq=null,pq=!0;function z_($,Z){if(hq?.get(Z)!==$.ref)pq=!1}function j_($,Z){let Q=0;for(let X=0;X<Z.asset.primitives.length;X++){if(!Z.morphSlotByPrim[X])continue;if($[Q]!==X)return!1;Q++}return Q===$.length}function dW(a,b,c){return (dW=$c0C(77)).call(this,a,b,c)}function G_(a,b,c,d){return (G_=$c0C(78)).call(this,a,b,c,d)}var lq=($)=>$===null?"whole":`p:${$}`;function Qz($,Z){let Q={entityId:$.id,geometry:$.assetId,object:$.ownerEntityId};return Z===null?Q:{...Q,part:Z}}function EI(a,b,c,d,e){return (EI=$c0C(79)).call(this,a,b,c,d,e)}function _I($,Z,Q){Q.add($);for(let[X,J]of Z){if(X.claimId!==$)continue;J.release(),Z.delete(X)}}function gJ($,Z){return MQ($.library,Z.ref,HQ($.library,Z.ref)!==void 0)}function B_($,Z,Q){if(Z!==null&&gJ($,Z.script))return!0;for(let X of Q.values())if(gJ($,X))return!0;return!1}var uI=Symbol("look-on-its-way");function mI($,Z,Q,X,J,K,V,Y,U){let q=new Map;for(let M of K){let L=V.get(M);if(L===void 0||Y.has(M.claimId))continue;let F=EJ(q,M.claimId),{pending:H,layout:N,surface:I}=M;F.push({device:$.device,materialDrawLayout:$.pipelines.getBindGroupLayout(L.record.drawPlan.layoutEntries,"lume scripted native draw"),materialDraws:new Map,packedStreams:new Map,inkFieldAsk:null,inkFieldBinds:new Map,wire:new Map,drawFault:null,sig:H.sig,layout:N,retained:L,preparedLayout:null,primitives:H.primitives,materialIndex:H.materialIndex,surface:I,partKey:H.partKey,script:H.script,overrides:H.overrides,drew:!1,draws:new WeakMap,rebuildCounted:null,view:M.viewId===null?null:{entityId:M.viewId,scene:null,pictureHandle:null,pictureDepthHandle:null,apertureHandle:null}})}let z=[];for(let M of q.values())z.push(...M);if(z.length===0)return null;let j=new Map;for(let M of z)for(let L of M.primitives)j.set(L,M);let G=[...X.keys()].filter((M)=>!Y.has(lq(M))).sort((M,L)=>M.localeCompare(L));let B=Q!==null&&(!U||!Y.has(lq(null)));return{structuralKey:J,shapeFollow:Z.shapeFollow,groups:z,byPrimitive:j,partKeys:G,wholeActive:B,held:new Map,recordRevision:0,planned:[],eye:void 0}}function Xz(a){return (Xz=$c0C(80)).call(this,a)}function Jz(a,b){return (Jz=$c0C(81)).call(this,a,b)}function Kz(a,b){return (Kz=$c0C(82)).call(this,a,b)}function bI(a,b){return (bI=$c0C(83)).call(this,a,b)}var hI=0;function pI(){return hI}function T7($){$.recordRevision++,hI++}function L_($,Z,Q,X,J){if(Q.drew&&J.record!==X.record){let K={...Q,retained:X,preparedLayout:null,inkFieldAsk:null,drawFault:null};for(let V of Q.primitives){F_:{let $$50=Z,Z$65=V,Q$44=K;{let $=$$50,Z=Z$65,Q=Q$44;if($.held.get(Z)===Q)break F_;Kz($,Z),$.held.set(Z,Q)}}}Q.materialDraws=new Map,Q.packedStreams=new Map,Q.inkFieldBinds=new Map,Q.inkFieldAsk=null,Q.wire=new Map}else Xz(Q),X.release();Q.draws=new WeakMap,Q.retained=J,T7(Z),Q.drew=!1,Q.materialDrawLayout=$.pipelines.getBindGroupLayout(J.record.drawPlan.layoutEntries,"lume scripted native draw")}function H_(a,b,c,d,e,f,g,h){return (H_=$c0C(84)).call(this,a,b,c,d,e,f,g,h)}function lI($,Z,Q,X){let J=Z.retained.record;if(Z.rebuildCounted!==X&&J.lightingKey===PI($.lighting.programKey??"",J.entry))jI($.library,J.shade,Q);Z.rebuildCounted=X}function N_(a,b,c,d,e,f){return (N_=$c0C(85)).call(this,a,b,c,d,e,f)}function Vz($,Z,Q,X,J,K){if(!Z){kQ(Q);return}let V=hW(X),Y=V?.script,U=Y!==void 0&&!W7(Z.library,Y.ref)?{script:Y,overrides:V?.overrides}:null,q={model:X.model,material:X.material,shadow:X.shadow},z=X.model.subScripts?DQ(Z.library,Q.asset,q,H6):D_;if(U===null&&z.size===0){kQ(Q);return}let j;Y_:{let $$49=Q,Z$64=q,Q$43=U,X$23=z;{let $=$$49,Z=Z$64,Q=Q$43,X=X$23;let J=lW.get($);if(J!==void 0&&q_(J,$,Z,Q,X)){j=J.key;break Y_;}let K=U_($,Z,Q,X);j=(lW.set($,K),K.key);}}let G=Q.scripted;let B=K!==void 0&&P7()?.serving===!0;if(G!==null&&G.structuralKey===j&&tI(G,U,z)&&H_($,Z,G,X,q,U,z,B)===!0){CQ(Q),G.shapeFollow=Q.shapeFollow,dq(Q,X,J);return}if(K!==void 0&&(B||B_(Z,U,z))){if(G!==null)G.shapeFollow=Q.shapeFollow;cW($,Z,Q,X,q,U,z,j,J,K);return}CQ(Q);{if((ba=gd($,Z,Q,X,q,U,z,j,K,G,J))!==aa)return ba}}var h8=new Map;function dI($){return h8.has($)}function cI($){let Z=h8.get($);return Z!==void 0&&!Yz($,Z)}function nI($){let Z=h8.get($);if(Z===void 0)return null;return{slots:Z.slots.length,got:Z.got.size,asked:Z.asked.size,arriving:Z.arriving.size,failed:Z.failedClaims.size,built:Z.built!==null,moved:Z.moved,redresses:Yz($,Z)}}function Yz($,Z){let Q=$.scripted;return Q!==null&&Q.structuralKey===Z.structuralKey&&tI(Q,Z.whole,Z.claims)}function cW(a,b,c,d,e,f,g,h,i,j){return (cW=$c0C(86)).call(this,a,b,c,d,e,f,g,h,i,j)}function iI($,Z,Q,X,J,K){let V=h8.get(Q);if(V===void 0)return;if(Z===null){CQ(Q);return}if(V.stage=K,V.asked.size>0)SJ($,Z,X,V,oI(V));CJ($,Z,Q,X,V,J,K)}function oI($){let Z=P7(),Q=[],X;for(let[J,K]of $.asked){if(Z!==null&&$.waking.has(K))continue;if(X??=K,K===X)Q.push(J)}return Q}function W_($,Z,Q){_I(Z,$.got,$.failedClaims);for(let[X,J]of $.asked){if(X.claimId!==Z)continue;$.asked.delete(X),Q?.letGo(J)}for(let X of $.arriving)if(X.claimId===Z)$.arriving.delete(X)}function SJ(a,b,c,d,e){return (SJ=$c0C(87)).call(this,a,b,c,d,e)}function CJ($,Z,Q,X,J,K,V){if(J.asked.size>0||J.arriving.size>0){let q=P7();for(let z of J.asked.values()){if(J.waking.has(z))continue;if(q===null)V.due();else {J.waking.add(z);q.whenLanded(z,function(){{let $=J,Z=z;$.waking.delete(Z),$.stage.due()}},!0)}}return}if(J.built===null)J.built={state:mI(Z,Q,J.whole,J.claims,J.structuralKey,J.slots,J.got,J.failedClaims,J.wholeCovers)},J.got.clear();let Y=J.built.state;if((Q.appeared||Yz(Q,J))&&Y!==null&&!$x(Q,Y,Z.pipelines,KI(),V.bandWords(),V.settled))return;h8.delete(Q),J.built=null;let U=Q.scripted;if(Uz(Q,Y),U)bI(U,Y);if(dq(Q,X,K),J.moved)Vz($,Z,Q,X,K,V)}function sI(a){return (sI=$c0C(88)).call(this,a)}function CQ($){let Z=h8.get($);if(!Z)return;h8.delete($),sI(Z)}var D_=new Map;function tI($,Z,Q){if(Z!==null&&!$.wholeActive)return!1;for(let X of Q.keys())if(!$.partKeys.includes(X))return!1;return!0}function kQ($){CQ($),SQ($);let Z=$.scripted;if(!Z)return;Uz($,null),T7(Z),Jz(Z)}function Uz($,Z){if($.scripted=Z,!Z)$.lookArriving=$.lookTexturesComing=!1}function aI($){CQ($),SQ($)}function rI($,Z,Q){let X=Q.scripted;if(X===null)return;for(let J of[...X.held.keys()])Kz(X,J);if(Z===null||!X.groups.every(function(J){{let Q=J;if(Q.device!==Z.device)return!1;let X=$.carry(Z,Q.retained,Q.overrides,Q.layout);if(X===null)return!1;return Xz(Q),Q.draws=new WeakMap,Q.preparedLayout?.retained?.release(),Q.preparedLayout=null,Q.retained=X,Q.materialDrawLayout=Z.pipelines.getBindGroupLayout(X.record.drawPlan.layoutEntries,"lume scripted native draw"),!0}})){kQ(Q);return}T7(X)}var qz="share-missing",B8="arriving",hJ="arriving-unseen",N6="texture-coming",zz="unseen",OJ="paint",T_=[];function G8(a,b,c,d,e,f,g){return (G8=$c0C(89)).call(this,a,b,c,d,e,f,g)}function nW($,Z,Q=!1){return Z.skinIndex!==null?JJ($,Z.skinIndex,Q):FN($,Q)}function pJ($,Z,Q,X=Q.retained.record,J=T_){let K=J,V=$.asset.primitives[Z];if(!$.storageArena)return null;let Y=nW($,V);if(Y===null)return null;let U=X.drawPlan;for(let q=0;q<U.sources.length;q++){let z=U.sources[q],j=U.layoutEntries[q].binding;switch(z){case"instances":case"jointMatrices":K=G8(K,J,q,j,Y.buffer,Y.offset,Y.size);break;case"modelMaterial":{let G=$.materialSlots[Z],B=$.uniformArena;if(!G||!B||G.offset<0)return null;K=G8(K,J,q,j,B.buffer,G.offset,G.data.byteLength);break}case"skinnedModel":{let G=$.skinnedModelSlots[Z],B=$.uniformArena;if(!G||!B||G.offset<0)return null;K=G8(K,J,q,j,B.buffer,G.offset,G.data.byteLength);break}case"morphDeltas":case"morphParams":{let G=$.morphSlotByPrim[Z],B=G?.rows??V.morph?.buffer,M=G&&$.body?.table.morphReadOf($.body,Z);if(!B||!M?.params)return null;if(z==="morphParams")K=G8(K,J,q,j,M.params,M.paramsOffset,M.paramsSize);else K=M.rows===null?G8(K,J,q,j,B.buffer,B.offset,B.size):G8(K,J,q,j,M.rows,M.rowsOffset,M.rowsSize);break}case"morphPoses":K=G8(K,J,q,j,Y.buffer);break;case"priorInstances":case"priorJointMatrices":{let G=$.motionFrame?.motionFrameId===void 0?Y:nW($,V,!0)??Y;K=G8(K,J,q,j,G.buffer,G.offset,G.size);break}case"priorMorph":{let G=$.body?.table.morphReadOf($.body,Z,!0);if(!G?.params)return null;K=G8(K,J,q,j,G.params,G.paramsOffset,G.paramsSize);break}case"packed":{let G=X.assembled.nativeVertexInputs?.packed;if(!G)return null;let B=Q.packedStreams.get(Z);if(B?.primitive!==V||B.plan!==G){B?.lease.release();let M=I7(V,Q.sig,Q.sig.skinned),L=G.streams.map(function({slot:F,stride:H}){let N=M[F];if(!N)throw Error("lume model shader requested a missing native vertex stream");return{slice:N,stride:H}});B={primitive:V,plan:G,lease:SI(Q.device).acquire(L,V.vertexCount)},Q.packedStreams.set(Z,B)}K=G8(K,J,q,j,B.lease.buffer);break}default:throw Error(`lume scripted character: ${X.ref} reads ${z} at binding ${j}`)}}return U.sources.length===K.length?K:K.slice(0,U.sources.length)}function v_($,Z,Q,X,J){let K=Q.materialDraws.get(Z),V=pJ($,Z,Q,X,K?.entries);if(V===null)return null;let Y=X.assembled.motion&&J?Q.retained.record.motionSource:null,U=Y??Q.materialDrawLayout;if(V===K?.entries&&U===K.layoutKey)return K;let q=Y&&J?J.getBindGroupLayout(X.drawPlan.layoutEntries,"lume scripted native motion"):Q.materialDrawLayout,z=`lume scripted native material ${$.modelId}#${Z}`,j=Q.device,G,B={entries:V,layoutKey:U,get:()=>G??=J?J.getBindGroup({label:z,layout:q,entries:V}):j.createBindGroup({label:z,layout:q,entries:V})};return Q.materialDraws.set(Z,B),B}var iW=new WeakMap;function S_($){let Z=iW.get($);if(!Z)iW.set($,Z={});return Z}var wJ=new WeakMap;function SQ($){let Z=wJ.get($);if(!Z)return;hd(Z,$);}function dq(a,b,c){return (dq=$c0C(90)).call(this,a,b,c)}function jz(a,b,c,d){return (jz=$c0C(91)).apply(this,arguments)}var k_;function lJ($,Z){return $.scripted?.byPrimitive.get(Z)?.retained.record.assembled.cullMode==="front"}function eI($,Z,Q,X,J,K){let V=$.scripted;return V===null||$x($,V,Z,Q,X,J,K)}function $x($,Z,Q,X,J,K,V=!0){let Y=!0;for(let[U,q]of Z.byPrimitive){if($.materialSlots[U]?.hidden===!0||!(V||lJ($,U)))continue;if(Kx($,U,$.asset.primitives[U])===null)continue;A_:{let $$51=Q,Z$67=q.retained.record,Q$46=$.mirrored,J$17=YI(),K$10=J,V$8="arriving",Y$4=function(z){Q.promoteToDraw(z),Y=!1,K(z)};{let $=$$51,Z=Z$67,Q=Q$46,J=J$17,K=K$10,V=V$8,Y=Y$4;let U=J?rq(Z):Z;if(U===null)break A_;let q=bJ(oq(U,Q,X,VI()),U,K);for(let z of sq(q).ordered){let j=Jx($,U,z,V);if(j===null||c$(j)!==null||j.failed)continue;Y(j)}}}}return Y}var D7="parked";function g_(a,b,c,d){return (g_=$c0C(93)).call(this,a,b,c,d)}function Gz($,Z,Q,X){let J=$.posedWorldSphere;if(!Q||X||Z===null||!(J[3]>=0))return;let[K,V,Y]=Z.camera.position,U=c(J[0]-K,J[1]-V,J[2]-Y)-J[3];return isFinite(U)?Math.max(0,U):void 0}function O_($,Z,Q,X,J){let K=Z.instance.measuredRefs;if(X===void 0||Q===null||K.length===0||!nq(K))return;uJ(K,dJ($,J,Q,X))}function dJ(a,b,c,d){return (dJ=$c0C(94)).call(this,a,b,c,d)}function w_($,Z,Q,X,J){if($.appeared||X===void 0||Q===null)return;let K=dJ($,J,Q,X);if(K>0)xI(Z,K)}function Zx($,Z){if(!$.appeared&&aq(Z)!==null)return N6;return tq(Z)===null?null:OJ}function Qx(a,b){return $c0C(95).call(this,a,b)}function Xx($){return Bz($)!==null}function Bz($){let Z=$.scripted;if(Z===null||$.appeared)return null;for(let[Q,X]of Z.byPrimitive){if($.materialSlots[Q]?.hidden===!0)continue;let J=X.retained.record;if(Zx($,J)===N6)return aq(J)}return null}function R_($){if($===null)return;$.enterScope(Rq);try{$.noteSkippedDraw()}finally{$.leaveScope(Rq)}}function cq($,Z,Q,X,J){return Q?$.instance.peekPipeline(Z):g_($,Z,X,J)}var oW="no-back",wq="no-wait";function E_($,Z,Q,X,J,K){if(Z===null)return wq;let V=cq($,Z,X,J,K);if(Q===null||Q===D7)return wq;if(GI(Q,V===D7?null:V))return wq;if(J!==null)QI(J,K);return null}var kJ=null,yJ=null;function __(){let $=kJ,Z=yJ;return $===null||Z===null?null:$.instance.getPipelineHandle(Z)}function Jx($,Z,Q,X="arriving"){let J=kJ,K=yJ;kJ=Z,yJ=Q;try{return $.warmScope(__,X)}finally{kJ=J,yJ=K}}var u_={index:null,indexCount:0};function Kx(a,b,c){return (Kx=$c0C(96)).call(this,a,b,c)}function m_($,Z,Q,X,J){let K=Z.assembled.wireframe===!0?kI($.device,$.wire,Q,"uint32",X):null;return K===null?{index:Q,args:J,lines:!1}:{index:K,args:CI(J,K),lines:!0}}function f_($,Z,Q){if(Q===null)return Z;return Z.arm===void 0?BI($,Z):null}function b_($,Z,Q,X,J){if(X===null&&J===null)return $;let[K,,V,Y]=$.bindGroups;return{...$,bindGroups:[J??K,X===null?Q:ZI(Z,Q,X),V,Y]}}var sW=new WeakMap;function Vx($){let Z=sW.get($);if(!Z)sW.set($,Z={walk:-1,pipeline:null,share:null,group:null,variant:null,wantsSpan:!1,lease:null,word:0,uniforms:void 0});return Z}function Yx(a,b,c,d,e){return (Yx=$c0C(97)).call(this,a,b,c,d,e)}function h_($){let Z=II($);return Z===0||Z===1&&!$.assembled.storages?.length?WI($):null}function Ux(a,b,c,d){return (Ux=$c0C(98)).call(this,a,b,c,d)}function Mz($,Z,Q,X,J,K){let V=Ux($,Z,Q,J);if(!V)return!1;let Y=V.wantsSpan?Gz(X,J,K,!1):void 0;if(Y!==void 0)uJ($.record.instance.measuredRefs,dJ(X,$.primIndex,J,Y));return!0}class Fz{constructor(){this.looks=new Map;this.outlines=new Set;this.assets=new Map;this.readsMorph=!1;}clear(){L9(this.looks),L9(this.assets),L9(this.outlines),this.readsMorph=!1}add(a,b,c){return $c0C(99).call(this,a,b,c)}stands(a,b){return $c0C(100).call(this,a,b)}}function aW($,Z,Q,X,J,K,V,Y,U,q,z,j,G){let B=$.motionFrame?.motionVectors===!0,M=B?rq(Q.retained.record):Q.retained.record;if(M===null)return null;let L=$.asset.primitives[Z],F=Kx($,Z,L);if(F===null)return null;let H=Gz($,q,z,U);w_($,M,q,H,Z);let N=$.posedWorldSphere;let I=H===void 0?void 0:V?.eye.sphere(N[0],N[1],N[2],N[3]);let W=U?null:Zx($,M);if(W===OJ)return W;let{index:P,indexCount:x}=F;let D=P?.id??0;let v=v_($,Z,Q,M,V);if(!v)return B8;let k=oq(M,$.mirrored,Y,q?.seeThroughLit===!0);let S=q===null?k:bJ(k,M,yQ(q));let C=f_(M,S,j);if(C===null)return zz;let E=cq(M,C,U,V,I);let u=sq(C);let y=u.back===null?oW:cq(M,u.back,U,V,I);let g=E_(M,u.writer,E,U,V,I);if(E===null||y===null||g===null)return B8;if(E===D7||y===D7||g===D7)return null;let w=y===oW?null:y;if(W===N6){R_(V);return W;}let b=Q.view;if(b?.scene&&$.motionFrame!==void 0)NJ().store.scriptedLaneOf(b.scene).pointWearerView(b.scene,$.motionFrame,b,M);if(!DI(M,K))return qz;let h=Yx(M,G,E,K);if(!h)return B8;O_($,M,q,H,Z);let U0=L.skinIndex===null?$.rigidIndexByPrim[Z]:0;if(U0<0)return null;let I0=C.arm==="surface",Q0=M.transparent,K0=M.shade.alphaTest>0||M.shade.depthNode!==null,m=$.drawNearHide<0,p0=Q.draws,d=p0.get(X);if(!d)p0.set(X,d=new Map);let n=d.get(Z),R0=_J(Q.device);if(n&&!u6(E)){let A9=n.twin.bindGroups;if(n.twin.pipeline===E&&A9[1]===J&&A9[2]===h&&n.native===v&&n.command.bindGroups[0]===(j??X)&&(n.back?.pipeline??null)===w&&n.record===M&&n.variant===C&&n.transparent===Q0&&n.cutout===K0&&n.inside===m&&n.moves===R0&&n.prim===L&&n.indexId===D&&n.indexCount===x&&n.vertexCount===L.vertexCount&&n.firstInstance===U0)return n}let L$=I7(L,Q.sig,Q.sig.skinned);let y9=M.assembled.nativeVertexInputs?.slots;let a7=(y9?y9.map((A9)=>L$[A9]):L$).map((A9)=>({...A9}));let xy=P?{indexCount:x,instanceCount:1,firstInstance:U0}:{vertexCount:L.vertexCount,instanceCount:1,firstInstance:U0};let jX=m_(Q,M,P,L.vertexCount,xy);let GX=V&&Q.sig.skinned&&!B&&!Q0&&!m&&!jX.lines&&w===null&&j===null&&!u6(E)&&(I0||C.arm===void 0)?K4(Q.device,V,Q.materialDrawLayout,Q.retained.record.drawPlan.layoutEntries,v.entries,M.instance,C,E,a7.length,h):void 0;let B5={pipeline:E,bindGroups:[X,J,h,GX?null:v.get()],vertexBuffers:a7,...jX.index?{indexBuffer:{...jX.index,format:"uint32"}}:{},draw:jX.args};let BX=b_(B5,Q.device,J,M.instance.passLayoutOf(C),j);BX.partOwner=S_($);if(GX)GX.single=v.get,B5.partBatch=BX.partBatch=GX;let cj={native:v,prim:L,moves:R0,indexId:D,indexCount:x,vertexCount:L.vertexCount,firstInstance:U0,inside:m,command:BX,twin:B5,record:M,primIndex:Z,variant:C,transparent:Q0,cutout:K0,surface:I0,back:w===null?null:{...BX,pipeline:w}};if(!u6(E))d.set(Z,cj);return cj}function qx(a,b,c){return $c0C(101).call(this,a,b,c)}function zx(a,b,c,d,e){return (zx=$c0C(102)).apply(this,arguments)}function p_(a,b,c,d,e){return (p_=$c0C(103)).call(this,a,b,c,d,e)}var vJ=new Float32Array(4);function l_($,Z,Q,X,J){let K=Q.retained.record.motionSource?.ctx,V=Q.inkFieldBinds.get(Z),Y=K&&pJ($,Z,Q,X,V?.entries);if(!K||!Y)return null;if(V&&(V.record!==X||V.inkFrom!==V.inkRecord.resource||V.entries!==Y))V.inkRecord.release(),V=void 0;if(!V){let U=j7(Q.device,{label:`lume scripted native ink ${$.modelId}#${Z}`,size:16,usage:64|8},$I);_q(vJ,0,J),Q.device.queue.writeBuffer(U.resource,0,vJ);let q=vI(K,`lume scripted native ink field ${$.modelId}#${Z}`,{entries:Y,layoutEntries:X.drawPlan.layoutEntries},U.resource);V={record:X,entries:Y,ink:J,inkRecord:U,inkFrom:U.resource,bindGroup:q,drawn:null},Q.inkFieldBinds.set(Z,V)}else if(V.ink!==J)_q(vJ,0,J),Q.device.queue.writeBuffer(V.inkRecord.resource,0,vJ),V.ink=J;return V}var gQ="arriving",rW=new WeakMap,d_=[1048576,1048576,1048576],c_=[-1048576,-1048576,-1048576],jx=4;function Gx($){return $>=0.00390625&&i($)?Math.floor(Math.log2($)*jx):null}function eW($){let Z=$.assembled;if($.transparent||$.drawsNothing||Z.blend!==void 0||Z.depthStencil?.depthWriteEnabled!==!0||$.shade.depthNode!==null)return null;return Z.cullMode}function Bx(a,b,c,d,e){return (Bx=$c0C(104)).call(this,a,b,c,d,e)}function n_(a,b,c,d,e){return (n_=$c0C(105)).call(this,a,b,c,d,e)}function RJ($,Z){if($.meta.kind==="op2"&&$.meta.op==="+"&&$.inputs.length===2)RJ($.inputs[0],Z),RJ($.inputs[1],Z);else Z.push($);return Z}function cJ(a,b,c,d){return (cJ=$c0C(106)).apply(this,arguments)}function Lz(a,b,c){return (Lz=$c0C(107)).call(this,a,b,c)}function i_(a,b,c,d,e,f){return (i_=$c0C(108)).call(this,a,b,c,d,e,f)}function Mx($,Z=$z($.record)){let Q=0;for(let X of $.slots){let J=Z(X);for(let K=0;K<J.length;K++,Q++)if(!Object.is(J[K],$.values[Q]))return!1}return Q===$.values.length}function Fx($,Z){return $.scripted?.byPrimitive.get(Z)?.retained.record.casts!==!1}function Lx($,Z){let Q=$.scripted?.byPrimitive.get(Z)?.retained.record;return Q!==void 0&&!Q.transparent&&Q.shade.depthTest}function Hx($,Z){let Q=$.scripted?.byPrimitive.get(Z)?.retained.record;return Q!==void 0&&!Q.shade.depthTest}function Nx($,Z,Q){let X=$.scripted?.byPrimitive.get(Z);if(!X)return null;let J=X.retained.record,K=Q==="owner"?LI(J):HI(J),V=$.scripted?.colourGroup,Y=V&&X.draws.get(V)?.get(Z);if(!K?.pipeline||Y===void 0)return null;let U=$.scripted?.frames;if(J.assembled.skinnedModel&&U)U.read?.($),U.hiddenView=void 0;let q=pJ($,Z,X);if(!q)return null;return{command:Y.twin,pipeline:K.pipeline,drawEntries:q,drawLayoutEntries:J.drawPlan.layoutEntries}}class v7{constructor(){this.held=new Float64Array(128);this.heldLength=-1;this.next=new Float64Array(128);this.at=0;this.grid=null;}stands($,Z){this.at=0,this.push($.camX),this.push($.camY),this.push($.camZ),this.push($.forwardX),this.push($.forwardZ),this.push($.lensScale??-1),this.push($.orthographicWeight??-1),this.pushRow($.planes,$.planes.length);let Q=$.secondViews;if(this.push(Q?.length??-1),Q!==void 0)jd.call(this,Q);let X=$.secondEyes;if(this.push(X?.length??-1),X!==void 0)for(let z=0;z<X.length;z+=1)this.pushRow(X[z],3);let J=$.occlusion??null,K=J===this.grid;if(this.grid=J,J!==null)this.push(J.revision);let V=$.lensEye;if(this.push(V===void 0?-1:1),V!==void 0)kd.call(this,V);if(this.push(Z===null?-1:Z.count),Z!==null){for(let j=0;j<Z.count;j+=1){this.pushRow(Z.planes[j],Z.planes[j].length);let G=Z.hullCounts[j];this.pushRow(Z.hulls[j],G*4),this.push(Z.texels?.[j]??0)}let z=Z.lights;this.push(z.length);for(let j=0;j<z.length;j+=1){ld.call(this,z,j);}}let Y=this.at,U=K&&Y===this.heldLength;if(U){let z=this.held,j=this.next;for(let G=0;G<Y;G+=1)if(z[G]!==j[G]){U=!1;break}}let q=this.held;return this.held=this.next,this.next=q,this.heldLength=Y,U}push($){if(this.at===this.next.length)this.grow(this.at+1);this.next[this.at]=$,this.at+=1}pushRow($,Z){if(this.push(Z),this.at+Z>this.next.length)this.grow(this.at+Z);let Q=this.next,X=this.at;for(let J=0;J<Z;J+=1)Q[X++]=$[J];this.at=X}grow($){let Z=this.next.length*2;while(Z<$)Z*=2;this.next=E1(this.next.subarray(0,this.at),Z)}}class Hz{constructor(){this.looks=new Fz;this.eye=new v7;this.held=new W6;this.scratch=new W6;this.live=[];this.characters=[];this.lanes=[new m6,new m6,new m6,new m6];this.empty=[];this.ready=!1;this.still=!1;this.raw=[];this.matrices=[];this.own=void 0;this.ridden=void 0;this.page=-1;this.kept=new Set;}begin($,Z,Q,X,J){if(!$)this.ready=!1,L9(this.kept),this.live.length=this.characters.length=0,this.looks.clear(),this.raw.length=0;this.lanes[0].begin(Z,$),this.lanes[1].begin(Q,$),this.lanes[2].begin(X??this.empty,$),this.lanes[3].begin(J??this.empty,$)}finish($,Z){this.ready=this.kept.size>0;let Q=fJ($).storage;for(let X of this.lanes)X.batch(Z,Q);if(Q.hasPending)Wx($.graph,Q)}dispose(){for(let $ of this.lanes)$.release()}}var Iz=8,Ja=0.5,nJ=2097152,S7=nJ>>1;function I9($,Z){return Math.min(Math.max(Math.floor($/Z),-S7),S7-1)}class Ix{constructor(){this.levels=[];this.spans=new Map;this.spare=[];}file($,Z,Q,X){if(!(X>=0)||!i(Z+Q+X)){this.drop($);return}let J=(Math.max(0,Math.ceil(Math.log2(2*X/Iz))));let K=Iz*2**J;let V=I9(Z-X,K);let Y=I9(Q-X,K);let U=I9(Z+X,K);let q=I9(Q+X,K);let z=this.spans.get($);if(z?.[0]===V&&z[1]===Y&&z[2]===U&&z[3]===q&&z[4]===J)return;while(this.levels.length<=J)this.levels.push(new Map);let j=this.levels[J],G=Int32Array.of(V,Y,U,q,J),B=z?.[4]===J?z:void 0;if(z!==void 0)this.unfile($,z,B&&G);for(let M=V;M<=U;M+=1){for(let L=Y;L<=q;L+=1){if(B!==void 0&&M>=B[0]&&M<=B[2]&&L>=B[1]&&L<=B[3])continue;let F=((M+S7)*nJ+(L+S7));let H=j.get(F);if(H===void 0)j.set(F,H=this.spare.pop()??new Set);H.add($)}}if(z===void 0)this.spans.set($,G);else z.set(G)}drop($){let Z=this.spans.get($);if(Z===void 0)return;this.unfile($,Z),this.spans.delete($)}unfile(a,b,c){return $c0P($c0C(109),Ix.prototype,"unfile").call(this,a,b,c)}within($,Z,Q,X){for(let J=0;J<this.levels.length;J+=1){let K=this.levels[J],V=Iz*2**J,Y=I9($-Q,V),U=I9($+Q,V),q=I9(Z-Q,V),z=I9(Z+Q,V);if((U-Y+1)*(z-q+1)>K.size){for(let[j,G]of K){md(j,Y,U,q,z,G,X);}}else {for(let j=Y;j<=U;j+=1){for(let G=q;G<=z;G+=1){let B=K.get(((j+S7)*nJ+(G+S7)));if(B!==void 0)for(let M of B)X(M)}}}}}clear(){this.levels=this.levels.map(($)=>Wz($)),this.spans=Wz(this.spans),this.spare.length=0}}class xx{constructor(){this.at=[];this.visuals=[];}file($,Z){if(!i(Z))return;let Q=this.at,X=this.visuals,J=Q.length;Q.push(Z),X.push($);while(J>0){let K=J-1>>1;if(Q[K]<=Z)break;Q[J]=Q[K],X[J]=X[K],J=K}Q[J]=Z,X[J]=$}takeDue($,Z){let Q=this.at;while(Q.length>0&&Q[0]<=$)Z(this.pop())}pop(){let $=this.at,Z=this.visuals,Q=Z[0],X=$.pop()??0,J=Z.pop()??Q,K=$.length;if(K>0){let V=0;for(;;){let Y=2*V+1;if(Y>=K)break;let U=Y+1,q=U<K&&$[U]<$[Y]?U:Y;if($[q]>=X)break;$[V]=$[q],Z[V]=Z[q],V=q}$[V]=X,Z[V]=J}return Q}get size(){return this.at.length}clear(){this.at.length=0,this.visuals.length=0}}class s_{constructor(){this.members=new Map;this.inside=I6();this.shown=!0;}add($,Z,Q){let X=this.inside;if(X.wasCulled=!0,this.members.size===0)X.x=Q.x,X.y=Q.y,X.z=Q.z,X.radius=Q.radius,X.maxDistanceSq=$.cullMaxDistanceSq;else{let J=c(X.x-Q.x,X.y-Q.y,X.z-Q.z);X.radius=Math.min(X.radius,Q.radius-J);let K=Math.max(0,Math.sqrt($.cullMaxDistanceSq)-J);X.maxDistanceSq=Math.min(X.maxDistanceSq,K*K)}this.members.set($,Z)}holds($){let Z=this.inside.radius>=0&&!x9(this.inside,$),Q=this.shown&&Z;return this.shown=Z,Q}}var iJ=new WeakMap;function Ka(){return{count:0,reach:new Ix,timed:new xx,playing:new Set,casting:new Set,scripted:new Map,scriptView:new v7,scriptNear:NaN,scriptViewMoved:!1,scriptSlots:-1,scriptLinks:-1,scriptFirstPerson:-1,census:{seen:!1,stale:!0,view:new v7},riders:new WeakMap,wearers:iJ,holders:new Map,growing:new Map,growReach:0,reachers:new Set,eyeOwed:new Set,lightEpoch:0}}var t_=[1.25,1.5,1],a_=[0.35,0.5,0.7],r_={left:"lefthand",right:"righthand"},e_=3,Dx=new WeakMap,oJ=($,Z)=>$.subarray(Z*16+12,Z*16+15);function Qu($,Z,Q,X){let J=[-1,-1,-1,-1,-1];for(let Y of $[Q].children){let U=Y>=0&&Y<$.length?P2($[Y].name):-1;if(U>=0&&J[U]<0)J[U]=Y}let K=oJ(Z,Q);let V=w2(J.flatMap(function(Y,U){if(U===0||Y<0)return[];let q=oJ(Z,Y);return[[q[0]-K[0],q[1]-K[1],q[2]-K[2]]]}),X==="right");if(V===null)return null;return J.map(function(Y,U){if(Y<0)return[];let q;{let Z=Y;let Q=[];for(let X=Z;X>=0&&X<$.length&&Q.length<e_;X=$[X].children[0]??-1)Q.push(X);q=Q;}let z=g8(oJ(Z,q[q.length>1?1:0]),q.length>1?oJ(Z,q[0]):K,new Float64Array(3));if(!h$(z))z.set(V.forward);let j=o6(z,V.normal,new Float64Array(3));if(!h$(j))return[];let G=U===0?a_:t_;return q.flatMap(function(B,M){let L;$u:{let $$52=Z,Z$68=B,Q$47=j;{let $=$$52,Z=Z$68,Q=Q$47;let X=new Float64Array(3),J=new Float64Array(3);for(let K=0;K<3;K+=1){if(J.set($.subarray(Z*16+K*4,Z*16+K*4+3)),!h$(J)){L=null;break $u;}X[K]=J[0]*Q[0]+J[1]*Q[1]+J[2]*Q[2]}L=h$(X)?X:null;}}return L===null?[]:[{node:B,axis:L,closed:G[Math.min(M,G.length-1)]}]})})}function vx($){let Z=Dx.get($);if(Z!==void 0)return Z;let Q=$.nodes;let X=f0(Q);let J=function(U){let q=Q.findIndex((z)=>P$(z.name)===r_[U]);return q<0?null:Qu(Q,X,q,U)};let K=J("left");let V=J("right");let Y={left:K,right:V,nodes:[K,V].flatMap((U)=>(U??[]).flatMap((q)=>q.map((z)=>z.node)))};return Dx.set($,Y),Y}function Sx($){return vx($).nodes}function Px($,Z,Q,X,J){let K=Math.sin(Q/2),V=Z[0]*K,Y=Z[1]*K,U=Z[2]*K,q=Math.cos(Q/2);X[J]=$.w*V+$.x*q+$.y*U-$.z*Y,X[J+1]=$.w*Y-$.x*U+$.y*q+$.z*V,X[J+2]=$.w*U+$.x*Y-$.y*V+$.z*q,X[J+3]=$.w*q-$.x*V-$.y*Y-$.z*U}function Cx(a,b,c,d){return (Cx=$c0C(110)).call(this,a,b,c,d)}var Xu=0.1,Ju=9.8,Ku=2,Vu=0.5,Yu=2.2,Uu=0.25,qu=0.02,zu=1.5,ju=9,Gu=2,Bu=8,kx=0.1,z0=0.000000000001,yx=3,kz=0.001,Mu=4,_Q=0.0001,Fu=0.05,Lu=0.01,Hu=0.0001,o=new O,p=new O,Dz=new O,N0=new O,D0=new O,t=new O,X0=new O,D9=new O,nx=new O,yz=new O,Ax=new J0,Pz=new J0,eJ=new J0,gx=new J0,sJ=new O,tJ=new J0,F$=new O,D6=new O,L0=new O,H0=new O,uQ=new O,k7=new O,P6=new J0,OQ=new O,Tz=new J0,wQ=new J0,y$=new O,A0=new O,Nu=new J0,P9=new O,Az=0,gz=0,M8=new Float64Array(7),vz=new Float64Array(2);function Iu($,Z){for(let Q of Z.nodes[$.index].children){let X=Z.bones[Q];if(X.isJoint)return X}return null}function xu(a,b,c){return (xu=$c0C(111)).call(this,a,b,c)}function Du(a,b){return (Du=$c0C(112)).call(this,a,b)}function ix($,Z){return Z===void 0?$.rootAnchor:$.getBoneByName(Z)}function Oz($){return`${$.entity??""}|${$.bone??""}|${$.radius}|${$.offset?$.offset.join(","):""}|${$.tail?$.tail.join(","):""}`}function Pu(a,b,c,d){return (Pu=$c0C(113)).call(this,a,b,c,d)}function ox($,Z){let Q=[],X=new Map,J=[];for(let K of $.rows){J.push(K.colliders===null?[]:Pu(Z,K.colliders,X,Q));}$.rowColliders=J,$.colliders=Q}function sx($,Z,Q){$.rows=Q;$.blown=GD($.chains,Q);ox($,Z)}function tx($,Z){let Q=ZK($).map(QK);let X=Du(Z,Q);let J=0;for(let V of X)J+=V.bones.length;let K={rows:Q,frame:{valid:!1,position:new O,quaternion:new J0},chains:X,boneCount:J,colliders:[],rowColliders:[],air:null,cuts:null,cutsSeen:NaN,blown:GD(X,Q),airClock:0,airPhase:NaN};return ox(K,Z),K}function ax($,Z){if($.length!==Z.length)return!1;for(let Q=0;Q<$.length;Q++)if(!V0($[Q].bones,Z[Q].bones))return!1;return!0}function Tu($,Z){return Math.abs($.x-Z[0])<0.0000001&&Math.abs($.y-Z[1])<0.0000001&&Math.abs($.z-Z[2])<0.0000001&&Math.abs($.w-Z[3])<0.0000001}function Ox(a){return (Ox=$c0C(114)).call(this,a)}function wx($){$.particle.value[0]=N0.x,$.particle.value[1]=N0.y,$.particle.value[2]=N0.z}function rx(a,b){return (rx=$c0C(115)).call(this,a,b)}function Su($,Z){for(let Q of $){let X=Q.spec,J=X.entity!==void 0&&Z?Z(X.entity):null;if(X.entity!==void 0&&(J?.rig??null)!==Q.rig){Q.rig=J?.rig??null;Q.bone=Q.rig?ix(Q.rig,X.bone):null;}let K=Q.bone;if(K&&J)s2(J.rig.world,K.index*16,sJ,tJ,yz);else K?.decomposeWorld(sJ,tJ,yz);if(J?.releaseJoints(),!K)continue;Q.radius=X.radius;let V=X.offset;if(Q.center.set(V?V[0]:0,V?V[1]:0,V?V[2]:0).applyQuaternion(tJ).add(sJ),X.tail)Q.tail.set(X.tail[0],X.tail[1],X.tail[2]).applyQuaternion(tJ).add(sJ),Q.mid.copy(Q.center).add(Q.tail).multiplyScalar(0.5),Q.reach=0.5*Q.center.distanceTo(Q.tail)}}function ex(a,b,c,d){return (ex=$c0C(116)).call(this,a,b,c,d)}function wz($,Z){if(Math.abs($.y)<0.9)Z.set(0,1,0);else Z.set(1,0,0);Z.addScaledVector($,-Z.dot($)).normalize()}function Rx($){let Z=$-EQ*Math.floor(($+j$)/EQ);return Z<=-j$?Z+EQ:Z}function Cu(a,b,c){return (Cu=$c0C(117)).call(this,a,b,c)}function ku(a,b,c){return (ku=$c0C(118)).call(this,a,b,c)}var Ex=new WeakMap;var p8=new O,RQ=new O,Sz=new O,F8=new O,Au=new O,aJ=new O,_x={tip:1/0,segment:1/0,chainScale:NaN,shapeScale:NaN},gu=0.00001;function y7($,Z,Q,X){let J=Z*16,K=Q?Q[0]:0,V=Q?Q[1]:0,Y=Q?Q[2]:0;return X.set($[J]*K+$[J+4]*V+$[J+8]*Y+$[J+12],$[J+1]*K+$[J+5]*V+$[J+9]*Y+$[J+13],$[J+2]*K+$[J+6]*V+$[J+10]*Y+$[J+14])}var ux=new Float32Array(16),C7=new Float32Array(16),mQ=new Float32Array(16),rJ=[0,0,0];function mx($,Z){rJ[0]=Z.x,rJ[1]=Z.y,rJ[2]=Z.z,y7($,0,rJ,Z)}function $D($){let Z=$.rootMatrix.a,Q=$.rootMatrix.o;return Math.sqrt(Z[Q+4]*Z[Q+4]+Z[Q+5]*Z[Q+5]+Z[Q+6]*Z[Q+6])}function fx(a,b){return (fx=$c0C(119)).call(this,a,b)}function Ru(a,b,c){return (Ru=$c0C(120)).call(this,a,b,c)}function Eu($,Z){return Math.abs($D(Z)-$)>gu*$}function bx($,Z,Q){let X=Z.x-$.x,J=Z.y-$.y,K=Z.z-$.z,V=X*X+J*J+K*K,Y=V<z0?0:Math.min(1,Math.max(0,((Q.x-$.x)*X+(Q.y-$.y)*J+(Q.z-$.z)*K)/V));return c(Q.x-$.x-X*Y,Q.y-$.y-J*Y,Q.z-$.z-K*Y)}function ZD(a,b,c,d,e){return (ZD=$c0C(121)).call(this,a,b,c,d,e)}function uu(a,b,c,d,e){return (uu=$c0C(122)).call(this,a,b,c,d,e)}var O0=new Float64Array(6);function fu(a){return (fu=$c0C(123)).call(this,a)}var $K=null,QD=0,A$=new Float64Array(4),bu=new Int32Array(1);function hx(a,b){return (hx=$c0C(124)).call(this,a,b)}function px(a,b,c,d,e,f,g){return (px=$c0C(125)).call(this,a,b,c,d,e,f,g)}function lu(a,b,c,d,e){return (lu=$c0C(126)).call(this,a,b,c,d,e)}function XD($){let Z=$.bone;if($.hasWritten&&Tu(Z.quaternion,$.written))Z.quaternion.set($.base[0],$.base[1],$.base[2],$.base[3]);$.base[0]=Z.quaternion.x,$.base[1]=Z.quaternion.y,$.base[2]=Z.quaternion.z,$.base[3]=Z.quaternion.w,$.hasWritten=!1,Z.refreshMatrixWorld(),p.setFromMatrixPosition(Z.matrixWorld)}function JD(a){return (JD=$c0C(127)).call(this,a)}function du(a,b){return (du=$c0C(128)).call(this,a,b)}var x6=new Float64Array(6),l8=new Float64Array(3);function cu($,Z,Q,X,J,K,V){XD($);let Y=rx($,X),U=$.particle,q=$.swingAbove;if(q)A0.subVectors(o,q.swingShift).applyQuaternion(Nu.copy(q.swingTurn).invert()),A0.subVectors(o,A0),$.swingTurn.copy(q.swingTurn),$.swingShift.copy(q.swingShift);else A0.set(0,0,0),$.swingTurn.identity(),$.swingShift.set(0,0,0);let z=$.swingOffset,j=A0.x-z[0],G=A0.y-z[1],B=A0.z-z[2],M=$.prevTip;if($.initialized&&Q>Z){let m=1-Z/Q,p0=(o.x-M[0]-j)*m,d=(o.y-M[1]-G)*m,n=(o.z-M[2]-B)*m;U.value[0]+=p0,U.value[1]+=d,U.value[2]+=n,M[0]+=p0,M[1]+=d,M[2]+=n}X0.set(U.value[0]-o.x,U.value[1]-o.y,U.value[2]-o.z);let L=Math.max(Gu,Bu*Y),F=X0.lengthSq();if(!$.initialized||!Number.isFinite(F)||F>L*L){Ox($);return}let H=Math.min(Math.max(Yu/Math.sqrt(Math.max(Y,qu)/Uu),zu),ju),N=EQ*H,I=XK(J.bounce),W=Math.min(Ku,2*N*(1-I)),P=I+W/(2*N),x=J.gravity;P9.subVectors(o,p).multiplyScalar((1-x)/Y),P9.y-=x*Ju/(N*N*Y);let D=P9.length();if(D*D<z0)P9.subVectors(o,p).multiplyScalar(1/Y);else P9.multiplyScalar(1/D);let v=J.wind>0?J.wind*Vu:0,k=p.x+P9.x*Y-o.x+v*Az,S=p.y+P9.y*Y-o.y,C=p.z+P9.z*Y-o.z+v*gz,E=(o.x-M[0])/Z,u=(o.y-M[1])/Z,y=(o.z-M[2])/Z,g=W/(N*N),w=I/(N*Z);z[0]=A0.x,z[1]=A0.y,z[2]=A0.z;let b=$.bodyTip,h=2*I/(N*Q),U0=o.x-A0.x-b[0],I0=o.y-A0.y-b[1],Q0=o.z-A0.z-b[2];if(b[0]+=U0,b[1]+=I0,b[2]+=Q0,U.velocity[0]-=E,U.velocity[1]-=u,U.velocity[2]-=y,x6[0]=M[0]-g*E-w*j-h*U0+k,x6[1]=M[1]-g*u-w*G-h*I0+S,x6[2]=M[2]-g*y-w*B-h*Q0+C,x6[3]=H,x6[4]=P,x6[5]=Z,cx(U,x6),U.value[0]+=o.x-M[0],U.value[1]+=o.y-M[1],U.value[2]+=o.z-M[2],U.velocity[0]+=E,U.velocity[1]+=u,U.velocity[2]+=y,M[0]=o.x,M[1]=o.y,M[2]=o.z,l8[0]=E,l8[1]=u,l8[2]=y,N0.set(U.value[0],U.value[1],U.value[2]),D0.subVectors(o,p),t.subVectors(N0,p),D0.lengthSq()<z0||t.lengthSq()<z0){Ox($);return}D0.normalize();t.normalize();if(J.limit<180){du(J.limit,U.velocity);}N0.copy(p).addScaledVector(t,Y);let K0=(U.velocity[0]-l8[0])*t.x+(U.velocity[1]-l8[1])*t.y+(U.velocity[2]-l8[2])*t.z;U.velocity[0]-=t.x*K0;U.velocity[1]-=t.y*K0;U.velocity[2]-=t.z*K0;if(K.length>0&&lu($,K,J.radius,Y,V)){t.subVectors(N0,p);if(t.lengthSq()<z0){wx($);return}t.normalize()}wx($);JD($);$.swingTurn.premultiply(eJ);$.swingShift.subVectors($.swingShift,p).applyQuaternion(eJ).add(p)}function KD(a,b,c,d){return $c0C(129).call(this,a,b,c,d)}function Cz($,Z,Q,X,J){y$.set($[0]-Z.x,$[1]-Z.y,$[2]-Z.z).applyQuaternion(Q).add(Z).addScaledVector(X,J),$[0]=y$.x,$[1]=y$.y,$[2]=y$.z}function VD(a,b,c){return (VD=$c0C(130)).apply(this,arguments)}function nu($){let{position:Z,quaternion:Q}=$;return k7.x===Z.x&&k7.y===Z.y&&k7.z===Z.z&&P6.x===Q.x&&P6.y===Q.y&&P6.z===Q.z&&P6.w===Q.w}function Rz(a,b){return $c0C(131).call(this,a,b)}function YD($,Z){let Q=Z*Z;for(let X of $.chains)for(let J of X.bones){let K=J.particle.velocity;if(J.initialized&&K[0]*K[0]+K[1]*K[1]+K[2]*K[2]>Q)return!1}return!0}function UD($,Z,Q,X=null,J=Q,K=null){if($.boneCount===0)return;let V=Math.min(Math.max(Q,0),Xu);if(V<=0)return;if(K!==null){{let Z=K;for(let Q of $.chains){if(qD(Q,Z))continue;for(let X of Q.bones)X.initialized=!1}}}let Y=ou($);if(J<=0){VD($,Z,0,!0),Rz($,Z);return}{let Q$51=V,X$25=Math.max(Q,J),J$18=X,K$11=Y,V$9=K;{let Q=Q$51,X=X$25,J=J$18,K=K$11,V=V$9;let Y=Math.abs(Z.rootAnchor.getWorldScale(nx).y)||1;VD($,Z,X,K);su($,Q);let U=$.colliders;if(U.length>0){Su(U,J);}for(let q of $.chains){if(!qD(q,V))continue;let z=q.reach;z.placed=!1,z.keptOf=null,z.seen=-1,$K=z;for(let j of q.bones){cu(j,Q,Math.max(X,Q),Y,$.rows[j.row],$.rowColliders[j.row]??U,Z);for(let G of j.followers)G.refreshMatrixWorld()}$K=null,z.last=z.seen>=0?z.seen*(1+Fu)+Lu:-1}}}Z.settleWorldMatrices()}function qD($,Z){if(Z===null)return!0;for(let Q of $.bones)if(Z[Q.bone.index]===1)return!0;return!1}function ou($){let Z=$.cuts===null?NaN:$.cuts(),Q=$.cutsSeen;return $.cutsSeen=Z,Z-Z===0&&Q-Q===0&&Z!==Q}function zD($){for(let Z of $.chains)for(let Q of Z.bones)Q.initialized=!1;$.frame.valid=!1}function jD($){if($.air===null||!$.blown)return!1;return $.air(M8)&&M8[2]>0}function GD($,Z){for(let Q of $)for(let X of Q.bones)if(Z[X.row].wind>0)return!0;return!1}function su(a,b){return (su=$c0C(132)).call(this,a,b)}var ND=32,au=0.02,ru=24,eu=0.8,h0=new O,$m=new J0,BD=new B0,MD=new B0,Ez=new Float32Array(0);function WD($,Z){let Q=$.joints.indexOf(Z);return Q>=0?new B0().setFromArray($.inverseBindMatrices,Q*16):null}function _z($,Z){return BD.copy(Z).invert(),MD.multiplyMatrices($,BD),h0.setFromMatrixPosition(MD),h0.lengthSq()<0.00000001?null:[h0.x,h0.y,h0.z]}function Qm($,Z,Q,X){if(X===null)return c($,Z,Q);let J=X[0]*X[0]+X[1]*X[1]+X[2]*X[2],K=J<0.000000000001?0:Math.min(1,Math.max(0,($*X[0]+Z*X[1]+Q*X[2])/J));return c($-X[0]*K,Z-X[1]*K,Q-X[2]*K)}function Xm($,Z){let Q=new Set;for(let X of Z)$.skins.forEach(function(J,K){if(J.joints.includes(X))Q.add(K)});return Q}function ID($,Z){let Q=-1,X=0;for(let J=0;J<4;J++){let K=$[Z*4+J];if(K>X)X=K,Q=J}return Q}function Km(a,b,c,d){return (Km=$c0C(133)).call(this,a,b,c,d)}function Vm(a,b,c,d,e,f){return (Vm=$c0C(134)).call(this,a,b,c,d,e,f)}function Um(a,b){return (Um=$c0C(135)).call(this,a,b)}var FD=new WeakMap;function xD(a,b,c,d,e,f,g){return (xD=$c0C(136)).call(this,a,b,c,d,e,f,g)}function zm(a,b,c,d){return (zm=$c0C(137)).call(this,a,b,c,d)}function jm(a,b,c,d){return (jm=$c0C(138)).call(this,a,b,c,d)}var Gm=new Set;function uz(a,b,c){return (uz=$c0C(139)).apply(this,arguments)}var Bm=0.98,LD=new WeakMap;function DD(a,b){return (DD=$c0C(140)).call(this,a,b)}function Hm(a,b,c,d,e,f,g){return (Hm=$c0C(141)).call(this,a,b,c,d,e,f,g)}var Wm=32;function Im(a){return (Im=$c0C(142)).call(this,a)}function xm($,Z,Q){for(let X of $[Q].children)if(Z[X]===1)return X;return-1}function TD($,Z,Q=(X)=>DD($,X)){let X=$.nodes;let {kids:J,joint:K,order:V}=Im($);let Y=new Map;for(let y of V){let g=fQ(X[y].name,Z);if(g>=0)Y.set(y,g)}if(Y.size===0)return null;let U=[];let q=function(y){let g=[],w=[],b=y;while(b>=0){let h=J[b].filter((U0)=>Y.has(U0));g.push({node:b,tip:h[0]??xm(X,K,b),row:Y.get(b)??0,above:-1,reach:1,follow:[]});if(h.length>1)w=h;b=h.length===1?h[0]:-1}U.push(g);for(let h of w)q(h)};for(let y of Y.keys()){let g=X[y].parent;if(g>=0&&g<X.length&&Y.has(g))continue;q(y)}let z=new Set;for(let y of U)for(let g of y)z.add(g.node);let j=function(y,g){for(let w of J[y]){if(z.has(w))continue;g.push(w);j(w,g)}};let G=new Map;U.forEach(function(y,g){for(let w of y){j(w.node,w.follow);G.set(w.node,g)}});let B=U.flatMap((y)=>y.filter((g)=>g.tip<0).map((g)=>g.node)),M=B.length>0?Q(B):new Map;for(let y of U)for(let g of y){let w=X[g.node].parent;while(w>=0&&w<X.length&&!z.has(w))w=X[w].parent;g.above=w>=0&&w<X.length?w:-1;let b=g.tip<0?M.get(g.node):void 0;if(b!==void 0&&i(b)&&b>1)g.reach=b}let L=U.map(()=>0);U.forEach(function(y,g){let w=y[0].above;if(w>=0)L[g]=L[G.get(w)??g]+1});let F=L.reduce((y,g)=>Math.max(y,g),0)+1,H=U.map((y,g)=>g).sort((y,g)=>L[y]-L[g]||y-g),N=H.flatMap((y)=>U[y]),I=new Map(N.map((y,g)=>[y.node,g])),W=N.flatMap((y)=>y.follow),P=H.filter((y)=>U[y][0].above<0).map((y)=>U[y][0].node),x={waveStart:n0.words,chain:0,bone:0,follow:0,root:0,rowBones:0,end:0};x.chain=x.waveStart+F+1,x.bone=x.chain+U.length*h6.words,x.follow=x.bone+N.length*R$.words,x.root=x.follow+W.length,x.rowBones=x.root+P.length,x.end=x.rowBones+Z.length;let{u32:D,f32:v}=Z$(x.end);D[n0.bones]=N.length,D[n0.chains]=U.length,D[n0.waves]=F,D[n0.roots]=P.length,D[n0.rows]=Z.length,D[n0.waveStart]=x.waveStart,D[n0.chain]=x.chain,D[n0.bone]=x.bone,D[n0.follow]=x.follow,D[n0.root]=x.root,D[n0.rowBones]=x.rowBones;for(let y=0;y<=F;y++)D[x.waveStart+y]=H.filter((g)=>L[g]<y).length;let k=0;H.forEach(function(y,g){D[x.chain+g*h6.words+h6.first]=k,D[x.chain+g*h6.words+h6.count]=U[y].length,k+=U[y].length});let S=0;N.forEach(function(y,g){let w=x.bone+g*R$.words,b=X[y.node].parent;D[w+R$.node]=y.node,D[w+R$.parent]=b>=0&&b<X.length?b:A,D[w+R$.child]=y.tip>=0?y.tip:A,D[w+R$.row]=y.row,D[w+R$.above]=y.above>=0?I.get(y.above)??A:A,v[w+R$.reach]=y.reach,D[w+R$.follow]=S,D[w+R$.followCount]=y.follow.length,S+=y.follow.length}),D.set(W,x.follow),D.set(P,x.root);for(let y of N)D[x.rowBones+y.row]+=1;let C=new Set;let E=function(y){if(C.has(y))return;C.add(y);for(let g of J[y]){E(g)}};for(let y of V){if(fQ(X[y].name,Z)>=0){E(y);}}let u=new Set;for(let y of U){let g=X[y[0].node].parent;if(g>=0&&g<X.length)u.add(g)}return{words:D,nodes:N.map((y)=>y.node),excluded:C,anchors:u}}function SD($,Z,Q){return uz($,new Set,Z,Q)}function CD($){let Z=$.nodes.length,Q=QZ.words,X=Q+Z*16,{u32:J,f32:K}=Z$(X+16);J[QZ.nodes]=Z,J[QZ.worlds]=Q,J[QZ.inverse]=X;let V=X8($),Y=f0($.nodes,V);K.set(Y,Q);let U=new Float32Array(16);if(V!==null)k0(V,0,U,0);else U.set(yD);return K.set(U,X),J}function kD($){let Z=new Uint32Array($.length);for(let Q=0;Q<$.length;Q++)Z[Q]=$[Q]>=0?$[Q]:A;return Z}var yD=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],Dm="neutral_bone";function mz($,Z,Q,X,J){let K=$.length,V=b6.words,Y=V+K,{u32:U,f32:q}=Z$(Y+K*16);U[b6.nodes]=K,U[b6.kinds]=V,U[b6.mats]=Y;for(let z=0;z<K;z++){let j=Y+z*16;q.set(yD,j);let G=Z[z]??-1,B=Q?.[z]??-1;if(G>=0)U[V+z]=G;else if(B>=0&&(Z[B]??-1)>=0)U[V+z]=E5;else if(X!==null&&(z+1)*16<=X.length&&$[z].name===Dm)U[V+z]=u5,q.set(X.subarray(z*16,z*16+16),j);else if(U[V+z]=_5,J!==null)q.set(J.subarray(0,16),j)}return U}function Pm(a,b){return (Pm=$c0C(143)).call(this,a,b)}function PD($,Z){return{owner:Z,node:$.node,flags:T4|($.tail?m5:0),radius:$.radius,offset:[0,0,0],tail:$.tail??[0,0,0]}}function AD($,Z,Q=null){let X=$.worn?.bone===null,J=$.worn===null?[]:$.worn.shapes.map((H)=>PD(H,$.worn?.row??A)),K=X?[]:$.ownShapes.map((H)=>PD(H,A)),V=J.length===0?K:[...K,...J].slice(0,Wm),Y=[],U=new Map,q=[],z=!1;for(let H of $.rows){if(H.colliders===null){z=!0,q.push([]);continue}q.push(H.colliders.map(function(N){let I=Oz(N),W=U.get(I);if(W===void 0){W=Y.length;U.set(I,W);Y.push(Pm(N,$));}return W}))}let j=z?[...Y,...V]:Y;$.rows.forEach(function(H,N){if(H.colliders===null)q[N]=V.map((I,W)=>Y.length+W)});let G=q.reduce((H,N)=>H+N.length,0),B={knobs:e.words,shapes:0,lists:0,end:0};B.shapes=B.knobs+$.rows.length*w$.words,B.lists=B.shapes+j.length*v8.words,B.end=B.lists+G;let{u32:M,f32:L}=Z$(B.end);if(L[e.gap]=-1,M[e.cuts]=A,M[e.serial]=(Q?.[e.serial]??0)+1,Q!==null)for(let H of[e.gap,e.cuts,e.placed])M[H]=Q[H];M[e.place]=$.place,M[e.rest]=$.rest,M[e.worn]=$.worn?.row??A,M[e.wornRest]=$.worn?.rest??A,M[e.wornBone]=$.worn?.bone??A,M[e.homes]=(X?$.worn?.homes:null)??A,M[e.hang]=(X?$.worn?.hang:null)??A,M[e.knobCount]=$.rows.length,M[e.knobs]=B.knobs,M[e.shapeCount]=j.length,M[e.shapes]=B.shapes,M[e.lists]=B.lists;let F=B.lists;$.rows.forEach(function(H,N){let I=B.knobs+N*w$.words;L[I+w$.amount]=H.amount,L[I+w$.zeta]=XK(H.bounce),L[I+w$.gravity]=H.gravity,L[I+w$.wind]=H.wind,L[I+w$.radius]=H.radius,L[I+w$.limit]=H.limit,M[I+w$.list]=F,M[I+w$.count]=q[N].length,M.set(q[N],F),F+=q[N].length});j.forEach(function(H,N){let I=B.shapes+N*v8.words;M[I+v8.owner]=H.owner,M[I+v8.node]=H.node,M[I+v8.flags]=H.flags,L[I+v8.radius]=H.radius;for(let W=0;W<3;W++)L[I+v8.offset+W]=H.offset[W],L[I+v8.tail+W]=H.tail[W]});return {words:M,stateFloats:S4(Z.nodes.length,j.length)}}function OD($,Z,Q){$[Z+e.cuts]=Q===null||!i(Q)?A:Q>>>0&16777215}function wD($,Z){$[Z+e.placed]=$[Z+e.placed]+1&16777215}function RD($,Z,Q,X,J){let K=new Float32Array($.buffer,$.byteOffset,$.length);K[Z+a$.dirX]=Q?.[0]??0,K[Z+a$.dirZ]=Q?.[1]??0,K[Z+a$.speed]=Q===null?0:Q[2],K[Z+a$.travelX]=X?.[0]??0,K[Z+a$.travelZ]=X?.[1]??0;for(let V=0;V<3;V++)a9(K,Z+a$.origin+V*2,J[V])}var Tm=new WeakMap,vm=new WeakMap,Sm=new WeakMap,JK=new WeakMap;function ED($){return g9(vm,$,CD)}function km($){return g9(Sm,$,kD)}function ym($,Z,Q){let X=JK.get(Q);if(X===void 0)JK.set(Q,X=mz($.asset.parsed.nodes,Q,Z.hangBy,Z.noBoneRest,$.rig?.bindCorrection??null));return X}function VK($,Z,Q){let X=$.springs;if(!Z){if(X!==null)L7($,t0);return $.springs=null,0}let J=ZK(Z).map(QK);let v$39;{let $$56=$.asset.parsed,Z$76=J;{let $=$$56,Z=Z$76;let Q=H$(Tm,$),X=Z.map((K)=>K.bones===null?"*":K.bones.join("\x01")).join("\x02"),J=Q.get(X);if(J===void 0){Q.set(X,J=TD($,Z));}v$39=J;}}let K=v$39;let V=X?.table===K;let Y=[...new Set(J.flatMap((U)=>(U.colliders??[]).flatMap((q)=>q.entity===void 0?[]:[q.entity])))];if($.springs={rows:J,table:K,entities:Y,scene:Q===void 0?X?.scene??null:Q,stoodOn:V?X.stoodOn:null,words:V?X.words:null,reads:[],fresh:!V,awaitsClouds:!1,own:V?X.own:null,ownHidden:V?X.ownHidden:null,shapes:0,wornOn:!1,named:-1,gap:V?X.gap:NaN,cuts:V?X.cuts:NaN,bodyTick:V?X.bodyTick:NaN,bodyTickOf:V?X.bodyTickOf:null,bodyStoodSeconds:V?X.bodyStoodSeconds:0},K===null)L7($,t0);return K===null?0:K.nodes.length}function lD($,Z){let Q=$.springs;if(Q===null||Q.scene===Z)return;Q.scene=Z,Q.reads.length=0}function YK($){return $.table?.nodes??[]}var bQ,hz=[];function cD(a,b,c,d,e,f){return (cD=$c0C(145)).call(this,a,b,c,d,e,f)}var nD=0;var pz=NaN;var Am=function($,Z){{let Q=nD;new Float32Array($.buffer,$.byteOffset,$.length)[Z+e.gap]=Q}};var gm=($,Z)=>OD($,Z,Number.isNaN(pz)?null:pz);function Om($,Z){return Math.abs($-Z)<=0.000001?-1:$}function wm($,Z,Q){let X=fz($,Z);if(Q===null||Q===Z)return X;let J=fz($,Q);if(Number.isNaN(X))return J;return Number.isNaN(J)?X:X+J}function Rm(a,b,c,d,e,f){return (Rm=$c0C(146)).call(this,a,b,c,d,e,f)}function Em(a,b,c,d,e,f){return (Em=$c0C(147)).call(this,a,b,c,d,e,f)}function _m($,Z,Q,X,J,K){let V=Z.table;if(V===null)return;let Y=$.asset.parsed,U=K?.wearer??null;if(Z.awaitsClouds=bz.clouds.has(Y.meshes)||U!==null&&bz.clouds.has(U.asset.parsed.meshes),Z.awaitsClouds)return;let q=Z.fresh||Q!==Z.stoodOn;if(q)L7($,t0);if(Z.own===null||Z.ownHidden!==$.hiddenMeshNodes){Z.own=(uz(Y,V.excluded,V.anchors,($.hiddenMeshNodes)));Z.ownHidden=$.hiddenMeshNodes;}let z=null;if(K!==null&&U!==null){let L=U.asset.parsed,F=new Set;if(K.homes===null)F.add(K.bone);else for(let H of K.homes)if(H>=0)F.add(H);z={row:F7(U),rest:QQ(Q,ED(L)),entity:K.entity,bone:K.homes===null?K.bone:null,homes:K.homes===null?null:QQ(Q,km(K.homes)),hang:K.homes===null?null:QQ(Q,ym($,K,K.homes)),shapes:SD(L,F,U.hiddenMeshNodes)}}let j=z!==null;let G={rows:Z.rows,ownShapes:Z.own,boneOf:(L)=>$.rig?.getBoneByName(L)?.index??-1,bodyOf:function(L){let F=X?.characterOf(L)??null,H=F===null?A:F7(F);if(F===null||H===A)return null;return j=!0,{row:H,boneOf:(N)=>F.rig?.getBoneByName(N)?.index??-1}},worn:z,place:J,rest:QQ(Q,ED(Y))};let {words:B,stateFloats:M}=AD(G,V,q?null:Z.words);if(!bU($,t0,B,M,V.words,j))return;if(Z.stoodOn=Q,Z.words=B,Z.fresh=!1,Z.shapes=B[e.shapeCount],Z.wornOn=z!==null,Z.reads.length=0,Z.reads.push(...hz),q)Z.gap=NaN,Z.cuts=NaN}var _D=new WeakMap;function um(a,b){return (um=$c0C(148)).call(this,a,b)}var iD=null;var mm=function($,Z){let Q=iD;if(Q===null)return;let X=uD(Q);RD($,Z,X?.values.wind??null,X?.windTravel??null,KK(Q).origin)};var oD=Object.freeze({maxDistanceSq:160000,bypassFrustum:!1}),lz=2;function Qr($,Z){let Q=sD($,Z);return Q===null?oD.maxDistanceSq:Math.max(oD.maxDistanceSq,Q)}function UK($,Z,Q,X){$.x=Q.x,$.y=Q.y,$.z=Q.z,$.radius=Q.radius;let J=Z.cullMaxDistanceSq,K=X.radius/lz;return $.maxDistanceSq=K>1?J*K*K:J,$.bypassFrustum=Z.cullBypassFrustum,$.lens=Z.viewmodelLens,$.wasCulled=Z.wasCulled,$}function fm(a,b){return (fm=$c0C(149)).call(this,a,b)}var tD=new Float32Array(16),qK=[0,0,0],zK=[0,0,0],T6={origin:[0,0,0],direction:[0,0,0]};function jr(a,b,c,d,e){return (jr=$c0C(150)).call(this,a,b,c,d,e)}var dz=new WeakMap;function hm(a,b){return (hm=$c0C(151)).call(this,a,b)}function QP($,Z){for(let Q=0;Q<3;Q++)$.min[Q]=Math.min($.min[Q],Z.min[Q]),$.max[Q]=Math.max($.max[Q],Z.max[Q])}function pm(a,b){return (pm=$c0C(152)).call(this,a,b)}function Gr($){return dz.get($)}function Br($){let Z=dz.get($);if(Z!==void 0)return Z;let Q=A7();if(Q===null)return null;let X=hm($,Q);return dz.set($,X),X}var aD=new WeakMap;function cz(a){return (cz=$c0C(153)).call(this,a)}function KP(a,b,c,d){return (KP=$c0C(154)).call(this,a,b,c,d)}function dm($){return $==="script"?VP:null}function cm($){if($==="subScripts")return sm;if($==="parts")return tm;return null}function nm(){return VP}function im(){return am}function GK(a,b,c){return (GK=$c0C(155)).call(this,a,b,c)}function om($,Z,Q){return hQ($,Q)&&JP($[Q],Z[Q])?"same":"dress"}function sm($,Z){if($===Z)return"same";if(!T9($)||!T9(Z))return"dress";return GK($,Z,nm)}function tm($,Z){if($===Z)return"same";if(!T9($)||!T9(Z))return"dress";return GK($,Z,im)}function am($,Z){if($===void 0&&Z!==void 0)return"dress";return (T9($)?$.visible:$)===(T9(Z)?Z.visible:Z)?"same":"dress"}function VP($,Z){if($===Z)return"same";if(!T9($)||!T9(Z)||$.ref!==Z.ref)return"dress";return $.params===Z.params?"same":"params"}var xP=16;function sz(a,b){return (sz=$c0C(156)).call(this,a,b)}function DP($,Z){return $.skins.map(function(Q){let X=new Float32Array(Q.joints.length*16);for(let J=0;J<Q.joints.length;J++)f(Z,Q.joints[J]*16,Q.inverseBindMatrices,J*16,X,J*16);return X})}var YP=new Float32Array(16);function rm(a,b,c,d){return (rm=$c0C(157)).call(this,a,b,c,d)}function tz(a,b,c,d,e,f){return (tz=$c0C(158)).call(this,a,b,c,d,e,f)}function PP(a,b){return (PP=$c0C(159)).call(this,a,b)}function pQ($,Z,Q){let X=$[Z];$[Z]=$[Q],$[Q]=X}function d8($){if(!$.begun)return $.begun=!0,!1;return $.deadline!==1/0&&a0()>=$.deadline}var UP=16384,qP=2048,Qf=64,Xf=65536,Jf=4096,Kf=16384,Vf=65536;function TP($,Z){let Q=Z.length;return{points:$,order:Z,bounds:new Float32Array(Q*6),stack:[0,Q],positions:new Float32Array(Q*3),copied:0}}function vP(a){return (vP=$c0C(160)).call(this,a)}function Yf($,Z,Q){return $.meshes[Z]?.weights[Q]??0}function qf(a){return (qf=$c0C(161)).apply(this,arguments)}var zf=new Float32Array(16);function jf(a,b){return (jf=$c0C(162)).call(this,a,b)}function SP($,Z){while($.cloud===void 0){if(d8(Z))return!1;let Q=$.cloudBuild??qf($);if(Q===null)$.cloud=null;else {$.cloudBuild=Q;jf($,Q)}}return!0}function zP($,Z){let Q=$[Z];if(Q<0)return!1;for(let X=Z&-4;X<Z;X++)if($[X]===Q)return!1;return!0}function CP(a,b){return (CP=$c0C(163)).call(this,a,b)}function Bf($,Z){for(let Q=0;Q<4;Q++){let X=Z[Q];if(X>=0&&$.carried[X]===1&&!$.carrierTrees.has(X))return X}return-1}var jP=new WeakMap;function az(a){return (az=$c0C(164)).call(this,a)}function Mf($){let Z=!1;sz($,function(Q,X,J){if(!Z&&!kP($,X,J))Z=!0});return Z}function iz(a,b,c,d,e){return (iz=$c0C(165)).call(this,a,b,c,d,e)}function MK($,Z,Q,X,J){let K=$[Z*3]-Q,V=$[Z*3+1]-X,Y=$[Z*3+2]-J;return K*K+V*V+Y*Y}function Ff($,Z,Q){if(Q===null)return!0;for(let X=Z*4,J=X+4;X<J;X++){let K=$[X];if(K>=0&&(Q[0]===K||Q[1]===K||Q[2]===K||Q[3]===K))return!0}return!1}function BK($,Z,Q,X,J,K){if(!(X<=J))return K;return $.stackLo[K]=Z,$.stackHi[K]=Q,$.stackD[K]=X,K+1}function GP(a,b,c,d,e,f,g){return (GP=$c0C(166)).call(this,a,b,c,d,e,f,g)}function Nf(a,b,c,d,e,f){return (Nf=$c0C(167)).call(this,a,b,c,d,e,f)}var BP=16;function Wf(a,b,c,d,e){return (Wf=$c0C(168)).call(this,a,b,c,d,e)}var If=new Float32Array(16),L8=new Float32Array(16),MP=new Float32Array(9);function Df(a,b,c,d,e){return (Df=$c0C(169)).call(this,a,b,c,d,e)}function kP($,Z,Q){let X=$.meshes[Q];return Z.morphTargets.length>0||X!==void 0&&X.targetNames.length>0}var Pf={indices:new Uint32Array(0),position:new Float32Array(0),normal:null};function vf(a,b,c,d,e,f){return (vf=$c0C(170)).call(this,a,b,c,d,e,f)}function Sf(a){return (Sf=$c0C(171)).call(this,a)}var Cf={keys:[],prims:[],padParent:0,padChild:0};function kf(a,b,c,d,e){return (kf=$c0C(172)).call(this,a,b,c,d,e)}function yf(a,b){return (yf=$c0C(173)).call(this,a,b)}function Of(a,b,c){return (Of=$c0C(174)).call(this,a,b,c)}function wf($){let Z=$.length-1;for(let Q=0;Q<Z;Q++)$[Q+1]+=$[Q];return{cursor:$.slice(0,Z),matchChild:new Int32Array($[Z]),matchVertex:new Int32Array($[Z]),at:0,v:0}}function Ef(a,b){return (Ef=$c0C(175)).call(this,a,b)}function _f(a,b){return (_f=$c0C(176)).call(this,a,b)}function uf($,Z){let Q=new Int32Array(Z).fill(-1);for(let X=$.order.length-1;X>=0;X--)Q[$.primRef[X]]=X-$.vertex[X];return Q}function mf($,Z,Q){let X=null;for(let J=0;J<Q;J++){if($[Z+J+1]===$[Z+J])continue;X??=new Uint8Array(Q),X[J]=1}return X}function ff($){return $.map((Z,Q)=>Q).sort((Z,Q)=>$[Z].child-$[Q].child||$[Z].vertex-$[Q].vertex||$[Z].parentTarget-$[Q].parentTarget)}function bf(a,b,c,d){return (bf=$c0C(177)).call(this,a,b,c,d)}function hf($){return $?{indices:$.indices.subarray(0,$.count),position:$.position.subarray(0,$.count*3),normal:null}:Pf}function lf($,Z){return $.getBoneByName(Z)?.index??-1}function df($,Z,Q,X){if(Q.bone===null){let j=$.skinBind;if(!j||S0(Z.asset)!==j.builtForParent)return null;return{kind:"skin",parentNodeByJoint:j.remaps.map((G)=>G.parentNode),unit:j.unit}}let J=X(Z);let K=lf(J,Q.bone);if(K<0||(K+1)*16>J.model.length)return null;let V=az(Z.asset.parsed).parentRest,Y=new Float32Array(16);k0(J.nodeWorld(K),K*16,Y,0);let U=new Float32Array(16),q=X($).rootMatrix;f(Y,0,q.a,q.o,U,0);let z=new Float32Array(16);return f(V,K*16,U,0,z,0),{kind:"frame",childToParent:z,node:K}}function cf(a,b,c,d){return (cf=$c0C(178)).call(this,a,b,c,d)}var nf=new WeakMap,FP=0.0001;function LP(a,b){return (LP=$c0C(179)).call(this,a,b)}var of={keys:[],rows:[],padParent:0,padChild:0,onDevice:new WeakMap};function HP($,Z,Q){let X=$.get(Z);if(!X)X=new WeakMap,$.set(Z,X);return H$(X,Q)}function tf(a,b,c,d,e){return (tf=$c0C(180)).call(this,a,b,c,d,e)}var rf=new WeakMap,nz=new WeakMap;function lQ($,Z){let Q=nz.get($);if(Q===Z)return;if(Z===null)nz.delete($);else nz.set($,Z);if(Z!==null&&"buffers"in Z)Z.waiters+=1;if(Q!==void 0&&"buffers"in Q)Q.waiters-=1,yP(Q)}function yP($){if($.users>0||$.waiters>0)return;let Z=q8($.device);for(let Q of new Set($.buffers))Z.release(Q);if($.packed.onDevice.get($.device)===$)$.packed.onDevice.delete($.device)}var dQ=!1;function AP(){let $=dQ;return dQ=!1,$}function gP($){if($.clock!==null)return $.clock;if(!g7())return null;$.started=a0();$.clock={deadline:$.started+Zb(),begun:!1};return $.clock}function ef(a,b,c,d,e){return (ef=$c0C(181)).call(this,a,b,c,d,e)}function $b($,Z,Q,X){let J=Z.onDevice.get($);if(J!==void 0&&J.writing===J.writes.length)return J;let K=gP(X);let V=K===null?null:cf($,Z,Q,K);if(V===null)dQ=!0;return V}function Zb(){let $=GJ();return $===1/0?NP:$}function OP($,Z,Q,X,J){let K=df(Z,Q,X,J);if(!K)return lQ(Z,null),null;let V={started:0,clock:null};let Y=ef(Z,Q.asset.parsed,Z.asset.parsed,K,V);let U=Y!==null&&Y.rows.length>0?$b($,Y,`${Z.modelId} on ${Q.modelId}`,V):null;if(V.clock!==null)H9(a0()-V.started);if(Y===null)return"fitting";if(Y.rows.length>0){if(U===null)return lQ(Z,Y.onDevice.get($)??Y),"fitting";U.users+=1}lQ(Z,null);let q=U?Y.rows.map((G,B)=>({primIndex:G.primIndex,buffer:U.buffers[B],words:G.words,entryCount:G.entryCount})):[];let z=Z.morphMeshes.filter((G)=>G.meshIndex>=0).map(function a(b){return (a.$h??=$c0C(182)(Q)).call(this,b)});let j=J(Q).rootMatrix;return{parentAsset:S0(Q.asset),parentEntityId:X.entityId,bone:X.bone,childAsset:S0(Z.asset),packed:Y,gpu:U,keys:Y.keys,fittedAt:Float32Array.from(Y.keys,(G)=>Yf(Q.asset.parsed,G.parentMesh,G.parentTarget)),rows:q,ownTargets:z,padWorld:Y.padParent*oz(j.a,j.o),padModel:Y.padChild}}function wP($){let Z=$.gpu;if($.gpu=null,$.rows.length=0,!Z)return;Z.users-=1,yP(Z)};var v6={levels:[],joint:new Uint16Array(0),position:new Float32Array(0),empty:!0};var O7=new Float64Array(4);function Jb(a,b,c,d,e,f){return (Jb=$c0C(183)).call(this,a,b,c,d,e,f)}function RP(a,b,c,d,e,f,g){return (RP=$c0C(184)).call(this,a,b,c,d,e,f,g)}var v9=new Float64Array(5);function Yb(a,b,c,d,e,f){return (Yb=$c0C(185)).call(this,a,b,c,d,e,f)}var Ub={vertices:new Uint32Array(0),places:new Float32Array(0)};function EP($,Z){let{position:Q,joints:X,weights:J,indices:K}=$;if(X===null||J===null||K===null||Z.length===0)return v6;let V=Q.length/3;if(V===0||X.length<V*4||J.length<V*4)return v6;let v$46;Qb:{let $$67=X,Z$86=J,Q$61=V;{let $=$$67,Z=Z$86,Q=Q$61;let X=new Uint16Array(Q),J=-1,K=!1;for(let V=0;V<Q;V++){let Y=-1;for(let U=0;U<4;U++){if(!(Z[V*4+U]>0))continue;let q=$[V*4+U];if(Y!==-1&&q!==Y){v$46=null;break Qb;}Y=q}if(Y===-1){v$46=null;break Qb;}if(X[V]=Y,J===-1)J=Y;else if(Y!==J)K=!0}v$46=K?X:null;}}let Y=v$46;if(Y===null)return v6;return qd(Z,Q,K,Y,V);}function mP($){return $.levels.some((Z)=>Z.vertices.length>0)?{levels:$.levels,joint:$.joint,position:$.position,empty:!1}:v6}function $S($){let Z=new ArrayBuffer((kK+$*3)*4),Q={params:Z,paramsU32:new Uint32Array(Z),paramsF32:new Float32Array(Z),writes:0,written:-1};Q.paramsU32[Nv.targetCount]=$;for(let X=0;X<$;X++)Q.paramsU32[kK+X*3]=A;return Q}var ZS=0,QS=1,o3=2,B3=3,XS=0,JS=1,E7=new Float32Array(16),fP=new Float32Array(16),bP=new Float32Array(16),S6={position:{x:0,y:0,z:0},rotation:{x:0,y:0,z:0,w:1},scale:{x:1,y:1,z:1}};function KS($){return{jointBoxes:$.skins.map((Z,Q)=>E6($,Q)),bodyFields:$.skins.map((Z,Q)=>p7($,Q)),bodySurfaces:$.skins.map((Z,Q)=>b7($,Q))}}function VS($,Z=[]){let Q=[],X=[],J=[],K=[];for(let V=0;V<$.primitives.length;V++){let Y=$.primitives[V].morph;if(!Y)continue;let U=X[Y.meshIndex];if(!U){let z=$.parsed.meshes[Y.meshIndex],j=z?.targetNames.length??Y.targetCount,G=Z[Y.meshIndex];U=G?.weights.length===j?G:{meshIndex:Y.meshIndex,targetNames:z?.targetNames??[],weights:new Float32Array(j),overrideIndex:new Int32Array(0),overrideWeight:new Float32Array(0),overrideCount:0,parentTargets:null,fittedAt:null,targetIndex:null,lane:$S(j),edge:-1},X[Y.meshIndex]=U,Q.push(U)}let q={primIndex:V,meshIndex:Y.meshIndex,mesh:U,lane:U.lane,rows:null};J.push(q),K[V]=q}return{morphMeshes:Q,morphMeshByIndex:X,morphSlots:J,morphSlotByPrim:K,ownMorph:null}}function YS($,Z,Q,X,J=null,K=null,V=null,Y=null){let U=Z5($,Z,Q,X,J,V,Y);return t3(U,Z,K),U}function US($,Z,Q,X,J,K,V,Y){let U=Z5($,Z,Q,X,J,K,V);return U.mirrored=B9(Z.world,0),JX(U,Z,Y),U}function qS($){let Z=$.parsed,Q=hP.get(Z)??0;if(Q>=2)return null;return rd(Q,Z);}var hP=new WeakMap,gK=new WeakMap,pP=new WeakMap,OK=new WeakSet,wK=new WeakSet;function zS($,Z,Q){if(Z===null)pP.delete($);let X=Z!==null&&Jv(pP,$,Q)?Z:null;if(X===null)gK.delete($);else gK.set($,X);return X}function jS($){return{owed:gK.get($)??null,held:OK.has($),holdsWorn:wK.has($)}}function GS($,Z){if(Z)wK.add($);else wK.delete($)}function BS($){return OK.has($)}function MS($,Z){if(Z)OK.add($);else OK.delete($)}function FS($){return s3($)!==null}function s3($){if($.appeared)return null;if($.lookOwed||$.lookTexturesComing)return"look";if($.picturesOnHead)return"pictures";if(gK.has($))return"pieces";if(wK.has($))return"worn";if(!$.ownStandIn&&$.mixer.wholeClipComing&&(!$.mixer.activeLayerList.some((Z)=>Z.maskFrom===null)))return"clip";return null}function $5($,Z){let Q=new h2($.parsed,d$($.parsed.nodes));Q.groundLift=$.groundOffset;Q.setRoleRow(()=>Z);return {rig:Q,heads:zp($.parsed,Q),rowJoints:Z}}function l($){return $.rig??qb($)}function qb($){let{rig:Z}=$5($.asset,$.passes.row);if(Z.updateWorldMatrices(),$.rig=Z,$.rigMinted=!0,$.stand.rest&&$.scripted)i7?.($);return Z}function LS(a){return (LS=$c0C(186)).call(this,a)}function zb($){return()=>$.rowJoints}function Z5($,Z,Q,X,J,K,V,Y=null){let U=Y??$5($,V),{rig:q,heads:z}=U,j=sK($.parsed.nodes,$.parsed.animations,Z.id,Q,$.parsed.skins,$.parsed.meshes,$.baseStandIn,$.bakeFailure,$.parsed.materials,$.parsed.clipsAwaited);j.roleRow=zb(U);j.bodyEntity=Z.ownerEntityId;let G=[],B=Array($.primitives.length).fill(-1);for(let L=0;L<$.primitives.length;L++)if($.primitives[L].skinIndex===null)B[L]=G.length,G.push(L);return{asset:$,modelId:Q,rig:q,rigMinted:!1,mixer:j,passes:eB(V),groundSampler:X,springs:null,springsLinks:K,hiddenMeshNodes:new Set,...VS($),morph:null,bones:null,headsetPose:null,fingers:null,fingersLaid:!1,bonesBound:mv(),boneSets:null,setsOwed:!1,ragdollHolds:!1,drawnPose:null,drawnPoseFrame:-1,replayRow:!1,releaseHeld:!1,leftOutOwed:!1,releaseRowsFirst:!1,bodyFrame:null,readerFrame:-1,readerPassed:!1,readerPaletteFrame:-1,readerVisual:null,rootMoved:!1,ragdoll:null,nativeRelease:null,nativeReleaseMotion:null,skins:$.parsed.skins.map(function(L,F){{let $=L.joints.length,Z=z?.[F]??null;let Q=new Float32Array(N8+$*16+16);if(Q[0]=Q[5]=Q[10]=Q[15]=1,Z)jk(Z,Q,N8+$*16);let X=Z?.joints??null;return{pointCollapsed:!1,jointCount:$,rows:Q.subarray(N8,N8+$*16),rootRow:Q.subarray(0,N8),worldRows:!1,rowsCollapsed:!1,data:Q,headJoints:X,eyeHides:[]}}}),materialSlots:$.primitives.map(function(L,F){{let Z=L,Q=F;let X=SS($,Z);return{material:X,data:Float32Array.from(X.uniform),pointCollapsed:!1,level:-1,heldLevel:-1,offset:-1,mount:null,transparent:u3($,Q,X,null,null,null),overlay:!1,renderOrder:0,drawsOver:null,alphaTest:X.alphaMode==="MASK",doubleSided:X.doubleSided,vertexColors:!0,dirty:!0,lightEpoch:0,hidden:!1,line:null}}}),sortLayers:null,pickEar:null,drawn:{material:null,model:null},animatedMaterial:{bindings:[],seen:-1},nearHide:0,drawNearHide:0,...KS($.parsed),posedSphere:new Float32Array([0,0,0,-1]),posedWorldSphere:new Float32Array([0,0,0,-1]),blendBound:v0(),posedBoundRevision:-1,bodySpheres:null,poseBound:new Float32Array([0,0,0,-1]),poseBoundClips:null,poseBoundOwed:!1,poseBoundStamp:{bones:-1,ik:-1,springs:null,fingers:!1,revision:0},poseBoundInput:null,hullHidden:!1,memo:{skinSpheres:new Float32Array($.parsed.skins.length*4),skinSpheresLive:!1},stand:{shut:!1,firstOwed:3,rest:!1,woke:!1,wokeUnseen:!1,edges:0,visited:-1,fitting:!1,followedAt:-1},kept:{casterSphere:null,published:new Float64Array([NaN,NaN,NaN,NaN,NaN]),heldRows:null,mountLocal:null,mountRoot:null},hideEye:Tb(),hideMode:ZS,hideDrawGate:!1,rigidPrimitives:G,rigidIndexByPrim:B,rigidData:new Float32Array(Math.max(1,G.length)*Pv),skinnedModelSlots:[],scripted:null,skinBind:null,skinParent:null,skinParentFace:null,shapeFollow:null,shapeParent:null,shapeParentFrame:null,followPadWorld:0,followPadModel:0,mountCtx:J,mountAppearanceDirty:!1,storageArena:null,uniformArena:null,unregisterBonePoseProvider:null,visible:!0,shadowVisible:!0,appeared:!1,collectedBody:null,doorReady:!1,casterDoor:!1,lookArriving:!1,ownStandIn:!1,localOwnBody:!1,bothSidesWritten:!1,headShownToItsEye:!1,lookTexturesComing:!1,picturesOnHead:!1,lookOwed:!1,cameraHidden:!1,mirrored:!1,renderOrigin:[0,0,0],body:null,bodyRows:{skins:new Int32Array($.parsed.skins.length*3),rigid:new Int32Array($.primitives.length*2),epoch:-1,visibility:-1,origin:new Float64Array([NaN,0,0]),morphOwed:!0,materialSeen:-1,morphEdge:0},mixerWord:null,bindPoseMovingFrames:0}}function t3($,Z,Q){Ov($.mixer);JM:{let $$17=$.passes,Z$20=$.mixer.entityId;{let $=$$17,Z=Z$20;let Q=X7.get(Z);if(Q===void 0)break JM;if(X7.delete(Z),$.reach!==null)$.reach.adopt(Q);else $.carried=Q;$.owed=!0}}$.unregisterBonePoseProvider=hk($,Z,$.modelId,Q);$.sortLayers=Q?h3(Q):null;a3($,Z);JX($,Z,Q?KK(Q).origin:K$);if(Z.jiggle)VK($,Z.jiggle,Q);if(Z.morph)XX($,Z.morph);if(Z.bones)r3($,Z.bones);if(Z.fingers)e3($,Z.fingers);if(Z.headsetPose)$j($,Z.headsetPose)}function HS($){n3($.hideEye[R6],0);$.hideEye[R6]=0;$.nearHide=0;$.unregisterBonePoseProvider?.();$.unregisterBonePoseProvider=null;oQ($);{lQ($,null)}$.springs=null;Yk($);for(let Z of $.materialSlots)Z.mount?.dispose(),Z.mount=null}function NS($,Z,Q,X,J,K,V){if($.unregisterBonePoseProvider?.(),oQ($),Yk($),$.mountCtx?.source!==J?.source)for(let Y of $.materialSlots)Y.mount?.dispose(),Y.mount=null;$.asset=Q;$.sortLayers=h3(K);$.mountCtx=J;$.groundSampler=X;$.springsLinks=V;lD($,K);e0($);$.unregisterBonePoseProvider=hk($,Z,$.modelId,K)}function WS($,Z){oQ($);{lQ($,null)}$.asset=Z;if($.rig!==null)$.rig.groundLift=Z.groundOffset;Object.assign($,KS(Z.parsed)),$.memo.skinSpheresLive=!1;for(let X of $.materialSlots)X.level=-1,X.heldLevel=-1,X.dirty=!0;let Q=$.ownMorph;Object.assign($,VS(Z,$.morphMeshByIndex)),XX($,$.morph,Q),$.bodyRows.morphOwed=!0,$.poseBoundClips=null,$.posedBoundRevision=-1,e0($)}function IS($,Z){{c0(_.get($))}let Q=$.mixer;Q.swapsAtOnce=!Z;let X=Z;for(let J of Q.activeLayerList){if(Z||J.pendingSwap===null)continue;Av(Q,J,!0),X=!0}if(X)z9($)}function a3($,Z){{let Z=_.get($);if(Z!==void 0)t1(Z.table,Z)}if(j9($)&&$.rig){if(f7($.mixerWord)&&!f7(Z.mixer)){{W3($,Z);Qk($)}}if(J7($.mixer)||$.nativeRelease){{if(J7($.mixer))OC($,Z);_M($,Z.mixer);Wj($);if($.leftOutOwed)s7($)
}}}$.mixerWord=Z.mixer,ZX($.mixer,Z.mixer),z9($),e0($)}function xS($,Z,Q,X){return gv($.mixer,Z.mixer,Q,X)}function jb(a,b){return (jb=$c0C(187)).call(this,a,b)}function Gb($){let Z=new Set,Q=new Set;for(let J=0;J<$.materialSlots.length;J++){let K=$.asset.primitives[J].nodeIndex;if($.materialSlots[J].hidden)Q.add(K);else Z.add(K)}for(let J of Z)Q.delete(J);let X=$.hiddenMeshNodes;if(Q.size===X.size&&[...Q].every((J)=>X.has(J)))return;$.hiddenMeshNodes=Q}function r3($,Z){if($.bones=Z,$.ragdoll!==null||$.ragdollHolds)$.setsOwed=!0;let Q=$.passes.grip;let X=$.rig!==null&&bG(Q,$.rig,Z);if(fv($.bonesBound,Z)||X){{let $=Q;$.posedRow=Z,$.posedRevision+=1}}else Q.posedRow=Z;{let v$74;Vp:{let Q=Kp;if(Q.length=0,$.headShownToItsEye=!1,Z===null){v$74=Q;break Vp;}let X=Jp;X.length=0;let J=null,K=X9(Z);for(let V=0;V<K.length;V+=1){let Y=K[V],U=Z[Y]?.visibleInFirstPerson;if(U===void 0)continue;J??=l($);let q=J.getBoneByName(Y);if(q===null)continue;if(!U){{if(!X.includes(q.index))X.push(q.index);
}continue}$.headShownToItsEye||=Dj(J)?.head===q}if(J){{let J$31=J;{let J=J$31;for(let V=0;V<X.length;V++){if(!Yp(J,X[V],X))Q.push(X[V])}
}}}v$74=Q;}let Q=v$74;let X=$.asset.parsed.skins;for(let J=0;J<$.skins.length;J++){let K=$.skins[J],V=X[J];if(V===void 0||V0(K.eyeHides,Q))continue;{let Z$125=K,Q$80=V,X$42=Q;{let Z=Z$125,Q=Q$80,X=X$42;let J=N8+Z.jointCount*16,K=[];if(X.length>0){let U=l($);for(let q of X){let z=zk(Q,qk(U.boneAt(q),U.count),null);if(z)K.push(z)}}let V=J+16*(K.length+1);if(Z.data.length!==V){let U=new Float32Array(V);U.set(Z.data.subarray(0,J)),U.set(Z.data.subarray(Z.data.length-16),V-16),Z.data=U,Z.rows=U.subarray(N8,J),Z.rootRow=U.subarray(0,N8)}for(let U=0;U<K.length;U++)jk(K[U],Z.data,V-16*(U+2));let Y=V-16;Z.data[Y+15]=Z.data[Y+15]%yK+yK*K.length,Z.eyeHides=X.slice()}}CL($,J)}}e0($);r1($);qX($,null);i7?.($)}function e3($,Z){if($.fingers===Z)return;$.fingers=Z,$.setsOwed=!0,e0($)}function $j($,Z){$.headsetPose=Z,$.setsOwed=!0,e0($)}function XX($,Z,Q=Z){$.bodyRows.morphEdge+=1,$.morph=Z,$.ownMorph=Q;let X=0,J=Z?Object.keys(Z):[],K=J.map((U)=>/^\d+$/.test(U)?Number(U):-1),V=new Int32Array(J.length),Y=new Float32Array(J.length);for(let U of $.morphMeshes){let q=U.meshIndex<0,z=0;for(let j=0;j<J.length;j++){if(q&&(Q===null||!Object.hasOwn(Q,J[j])))continue;let G;{let $$108=U,Z$127=J[j];{let $=$$108,Z=Z$127;let Q=$.targetIndex;if(Q===null){let X=dP.get($.targetNames);if(X===void 0){X=new Map;for(let J=0;J<$.targetNames.length;J++)if(!X.has($.targetNames[J]))X.set($.targetNames[J],J);dP.set($.targetNames,X)}$.targetIndex=Q=X}G=Q.get(Z)??-1;
}}if(G<0&&K[j]<U.targetNames.length)G=K[j];if(G<0||!Z)continue;V[z]=G,Y[z]=Z[J[j]],z+=1}U.overrideIndex=V.slice(0,z),U.overrideWeight=Y.slice(0,z),U.overrideCount=z,X+=z}return X}var dP=new WeakMap;var H8=new Float64Array(3);function DS($){let Z=0;for(let Q=$;Q!==null;Q=Q.shapeParent)Z+=Q.bodyRows.morphEdge;return Z}function Fb($){let Z=DS($);for(let Q of $.morphMeshes)if(Q.edge!==Z)return!0;return!1}function PS($,Z,Q,X,J){H8[1]=X,H8[2]=J;for(let q=Z.overrideCount-1;q>=0;q--){if(Z.overrideIndex[q]!==Q)continue;return H8[0]=Z.overrideWeight[q],A}let K=Z.parentTargets,V=$.shapeParent,Y=V!==null&&K!==null&&K[Q*2]>=0?V.morphMeshByIndex[K[Q*2]]:void 0;if(Y&&V!==null&&K!==null){let q=Z.fittedAt?.[Q]??0;return PS(V,Y,K[Q*2+1],X+Math.min(0,q),J+Math.max(0,q))}H8[0]=Z.meshIndex>=0?$.asset.parsed.meshes[Z.meshIndex]?.weights[Q]??0:0;let U=Z.meshIndex>=0?FL($,Z.meshIndex):-1;return U<0?A:U+Q*2}function Q5($,Z,Q){let X=Q&&Q.chain!==!0&&Q.character.morphMeshes.length>0?Q.character:null;Z.shapeParent=X;if(X===null||Q===null){if(Z.shapeFollow)oQ(Z);{let $=Z;lQ($,null)}return !0}let J=Z.shapeFollow;if(S0(X.asset)===J?.parentAsset&&S0(Z.asset)===J.childAsset&&J.parentEntityId===Q.entityId&&J.bone===Q.bone)return!0;{let v$65;vd:{if(lv(X.asset.parsed)){v$65=!0;break vd;}pv(X.asset.parsed);let K=OP($.device,Z,X,Q,l);if(J)oQ(Z);if(K==="fitting"){v$65=!1;break vd;}if(K){Hb(Z,K);}
v$65=aa;}if((ba=v$65)!==aa)return ba}return!0}function TS($,Z,Q,X,J,K){if(Q&&Z.skinBind?.spec!==Q)Z.skinBind=M1(Q);if(Z.skinBind&&X)L1(Z,Z.skinBind,X);return l(Z).setRootMatrix(K),Q5($,Z,J)}function Hb($,Z){$.shapeFollow=Z,$.bodyRows.morphEdge+=1;for(let Q=0;Q<$.morphMeshes.length;Q++)$.morphMeshes[Q].parentTargets=Z.ownTargets[Q]??null;if(Z.keys.length>0&&Z.rows.length>0){let Q=new Int32Array(Z.keys.length*2);for(let J=0;J<Z.keys.length;J++)Q[J*2]=Z.keys[J].parentMesh,Q[J*2+1]=Z.keys[J].parentTarget;let X={meshIndex:-1,targetNames:Z.keys.map((J)=>J.name),weights:new Float32Array(Z.keys.length),overrideIndex:new Int32Array(0),overrideWeight:new Float32Array(0),overrideCount:0,parentTargets:Q,fittedAt:Z.fittedAt,targetIndex:null,lane:$S(Z.keys.length),edge:-1};$.morphMeshes.push(X);for(let J of Z.rows){let K={primIndex:J.primIndex,meshIndex:-1,mesh:X,lane:X.lane,rows:J.buffer};$.morphSlots.push(K),$.morphSlotByPrim[J.primIndex]=K}}$.bodyRows.morphOwed=!0;$.followPadWorld=Z.padWorld;$.followPadModel=Z.padModel;XX($,$.morph,$.ownMorph);vS($)}function oQ($){let Z=$.shapeFollow;if(Z===null)return;$.shapeFollow=null;let Q=[];for(let X of $.morphSlots){if(X.rows===null){Q.push(X);continue}$.morphSlotByPrim[X.primIndex]=void 0}$.morphSlots=Q,$.bodyRows.morphOwed=!0,$.morphMeshes=$.morphMeshes.filter((X)=>X.meshIndex>=0);for(let X of $.morphMeshes)X.parentTargets=null;$.bodyRows.morphEdge+=1;wP(Z);$.followPadWorld=0;$.followPadModel=0;vS($)}function vS($){let Z=$.scripted;if(Z)mK.delete(Z),Z.levelView=void 0,T7(Z);$.poseBoundClips=null}function SS($,Z){return Z.materialIndex!==null?$.materials[Z.materialIndex]:$.defaultMaterial}function Wb($,Z,Q,X,J){Z.material=J;let V=$.scripted?.byPrimitive.has(Q)===!0?X:null;if(Mv(Z.mount?.ref??null,V))return;Z.mount?.dispose();Z.mount=V===null||$.mountCtx===null?null:wd($,V)}function Ib($,Z,Q){if(!Z||Q===null)return;xd(Q,$,Z);}function CS($,Z,Q,X,J,K=!1){let V=T$,Y=$.material.source,U=Z&&Q!==null?Z.values:null,q=(Q??0)*w6,z=O6(X,J,"emissive"),j=O6(X,J,"emissiveIntensity")??(U?U[q+A6.emissiveStrength]:Y.emissiveStrength),G=Z&&Q!==null&&oK(Z,Q,"emissiveFactor"),B=nv(Y,$.mount,z!==null),M=cv(Y,$.mount,g6(X)??g6(J));if(K||G||z!==null||M!==null||j!==Y.emissiveStrength||B!==(Y.emissiveTexture!==null)){{dv($.data,V.emissive,V.emissiveMap,Y,z,j,G&&U?U:Y.emissiveFactor,G?q+A6.emissiveFactor:0,B,M)
}}}function xb($,Z,Q,X,J){let K=$.mixer.materialAnimation;if(!K||Q===null||K.lanes[Q]===0)return;let V=R7(K,Q,"baseColorFactor"),Y=Q*w6;$.animatedMaterial.bindings.push({slot:Z,materialIndex:Q,color:V&&g6(X)===null&&g6(J)===null&&!m3(Z.mount),alpha:V&&sv(Z.material.source,X)===null,metallic:R7(K,Q,"metallicFactor")&&O6(X,J,"metalness")===null&&b3(Z.mount)===null,roughness:R7(K,Q,"roughnessFactor")&&O6(X,J,"roughness")===null&&f3(Z.mount,X)===null,emissive:R7(K,Q,"emissiveFactor")||R7(K,Q,"emissiveStrength"),sub:X,top:J,previous:K.values.slice(Y,Y+w6),emissiveAnimated:oK(K,Q,"emissiveFactor")})}function Db($){let Z=$.mixer.materialAnimation;if(!Z)return;let Q=$.animatedMaterial,X=iK(Z);if(Q.seen===X)return;Q.seen=X;let J=T$,K=A6,V=Z.values,Y=$.animatedMaterial.bindings;for(let U=0;U<Y.length;U++){let q=Y[U],z=q.materialIndex*w6,j=q.previous,G=oK(Z,q.materialIndex,"emissiveFactor"),B=q.emissiveAnimated!==G;for(let L=0;L<w6;L++){let F=V[z+L];if(j[L]===F)continue;j[L]=F,B=!0}if(!B)continue;q.emissiveAnimated=G;let M=q.slot;if(q.color)for(let L=0;L<3;L++)M.data[J.baseColor+L]=Z.values[z+K.baseColorFactor+L];if(q.alpha){let L=Z.values[z+K.baseColorFactor+3];M.data[J.baseColor+3]=L}if(q.metallic)M.data[J.metallic]=iQ(Z.values[z+K.metallicFactor],q.sub,"metalnessMap");if(q.roughness)M.data[J.roughness]=iQ(Z.values[z+K.roughnessFactor],q.sub,"roughnessMap");if(q.emissive)CS(M,Z,q.materialIndex,q.sub,q.top,!0);M.dirty=!0}}var cP=new WeakMap;function Pb($){let Z=cP.get($.asset);if(Z===void 0||Z.length<$.materialSlots.length){let Q=$.asset.parsed.nodes;Z=$.asset.primitives.map(function(X,J){let K=Q[X.nodeIndex]?.name??"",V=`${X.nodeIndex}:${J}`;return{node:K,primitive:V,lowered:{node:K.toLowerCase(),primitive:V.toLowerCase()},fileHidden:Yv(Q,X.nodeIndex)}}),cP.set($.asset,Z)}return Z}var HK=new Uint8Array(0);function JX($,Z,Q=K$){if($.scripted)mK.delete($.scripted);if(HK.length<$.materialSlots.length)HK=new Uint8Array($.materialSlots.length);$.animatedMaterial.bindings.length=0,$.animatedMaterial.seen=-1;let X={model:Z.model,material:Z.material};let J=Z.material?.overrides??null;let K=T$;let V=Pb($);$.bothSidesWritten=!1;for(let Y=0;Y<$.materialSlots.length;Y++){let U=$.materialSlots[Y],q=$.asset.primitives[Y],z=V[Y],j=z.node,G=FJ(X,U.material.name,j,z.primitive,z.lowered),B=G!==null||J!==null;Wb($,U,Y,$.mountCtx?HJ(G,J):null,ov($.modelId,SS($.asset,q),G,J));let M=U.material.source;ev(U.data,U.material.uniform,Bv(G,J,U.mount));U.data[K.alphaCutoff]=tv(U.material,G,J);U.alphaTest=av(U.material,G,J);Ib(U,$.mixer.materialAnimation,q.materialIndex);if(m3(U.mount))U.data[K.baseColor]=1,U.data[K.baseColor+1]=1,U.data[K.baseColor+2]=1;let L=b3(U.mount);if(L!==null)U.data[K.metallic]=L;let F=f3(U.mount,G);if(F!==null)U.data[K.roughness]=F;let H=B?g6(G)??g6(J):null;if(H!==null)lT(U.data,K.baseColor,H);if(CS(U,$.mixer.materialAnimation,q.materialIndex,G,J),B){let I=O6(G,J,"metalness");if(I!==null)U.data[K.metallic]=I;let W=O6(G,J,"roughness");if(W!==null)U.data[K.roughness]=W}U.data[K.metallic]=iQ(U.data[K.metallic],G,"metalnessMap"),U.data[K.roughness]=iQ(U.data[K.roughness],G,"roughnessMap"),rv(U.data,M,G,J),U.overlay=Uv(J,G),U.renderOrder=qv(J,G),U.drawsOver=jv(J,G),U.line=zv(J,G),U.transparent=U.overlay||u3($.asset,Y,U.material,U.mount,J,G);let N=J?.side==="double"||G?.side==="double";$.bothSidesWritten||=N;U.doubleSided=U.material.doubleSided||N;U.vertexColors=LJ(J,G);HK[Y]=U.hidden?1:0;U.hidden=Vv(X,U.material.name,j,z.primitive,z.fileHidden,z.lowered);xb($,U,q.materialIndex,G,J);U.dirty=!0}mM($);for(let Y=0;Y<$.materialSlots.length;Y++)if(HK[Y]===1!==$.materialSlots[Y].hidden)$.leftOutOwed=!0;if($.leftOutOwed)s7($);Gb($);qj($,Z);J5($,Z,Q);dS($);$.drawn.material=Z.material;$.drawn.model=Z.model}function kS($,Z){let Q=$.drawn;if(Q.model===null||KP(Q.material,Q.model,Z.material,Z.model)!=="params")return!1;return Q.material=Z.material,Q.model=Z.model,!0}function yS($,Z,Q,X,J,K=null){Xj($,Zj(Z,Q,X,J),K);return Y0[r0]}function AS($,Z,Q,X,J,K=null){yS($,Z,Q,X,J,K);let v$50;{let $=Y0[tQ];v$50=Y0[X5]===1&&$<AK?AK:$;}return v$50>=1}var i$=W8+3,KX=i$+1,R6=KX+1,sQ=R6+1,w0=new Float64Array(sQ+24);function Zj($,Z,Q,X){return w0[0]=$,w0[1]=Z,w0[2]=Q,w0[3]=X,w0}function Tb(){let $=new Float64Array(sQ+24);return $[3]=bK.near,$[W8+2]=-1,$.fill(NaN,sQ),$}var Y0=new Float64Array(4),r0=0,d7=1,X5=2,tQ=3,rz=new Float64Array(2);function Qj($,Z){let Q=$.bodyFields[Z];if(Q!==void 0)return Q;let X=p7($.asset.parsed,Z);if(X!==void 0)$.bodyFields[Z]=X;return X}function Xj($,Z,Q){let X=0;Y0[d7]=0,Y0[X5]=0;let J=Kj($,Z,Q);if(J>0)Lj($);let K=!1,V=J>0&&$.memo.skinSpheresLive&&$.readerVisual?c7($,$.readerVisual.world):0;for(let U=0;J>0&&U<$.skins.length;U++){let q=Qj($,U);if(!q)continue;let z=$.skins[U];if(z.pointCollapsed)continue;let j=$.memo.skinSpheresLive?gS($.memo.skinSpheres,U*4,Z,V,Q):J;if(!(j>0))continue;let G=t7($,U);$v(q,G,0,z.jointCount,Z,Q,rz,$.bodySurfaces[U]??null,z);let B=Math.min(rz[0],j);if(B>X)X=B;if(rz[1]===1)K=!0;if(X>=1)break}let Y=X>=1?1:X;Y0[r0]=Y;vb($,Z,Y,K)}function vb($,Z,Q,X){if(Y0[tQ]=Q,!(Q>0))return;let J=Z[3];Z[3]=J*2;let K=Vj($,Z,!1);if(Z[3]=J,Y0[X5]=1,Y0[tQ]=Math.min(Q,Math.max(0,K)),X&&K<1)Y0[d7]=1}function Kj($,Z,Q=null,X=0){if($$($)===null)Hj($,$.readerVisual);let J=$.posedWorldSphere;if(!(X<1/0))return 1;return gS(J,0,Z,o7($)?0:J[3]*0.5+1,Q,Math.max(Z[3],X),X>Z[3]?X:void 0)}function Sb(a,b,c){return (Sb=$c0C(188)).call(this,a,b,c)}function gS($,Z,Q,X,J,K=Q[3],V=Math.min(K,Zv)){let Y=$[Z+3];if(!(Y>=0))return 1;let U=Math.sqrt((Q[0]-$[Z])**2+(Q[1]-$[Z+1])**2+(Q[2]-$[Z+2])**2)-Y-X,q=Qv(U,K,V);if(J===null||!(V>0))return q;let z=Math.abs(J[16]*$[Z]+J[17]*$[Z+1]+J[18]*$[Z+2]+J[19])-Y-X;for(let j=0;j<16;j+=4)if(J[j]*$[Z]+J[j+1]*$[Z+1]+J[j+2]*$[Z+2]+J[j+3]<-Y-X)z=V;return Math.max(q,1-z/V)}function OS($,Z,Q=!1){Y0[r0]=Math.max(0,Vj($,Z,Q))}function Vj(a,b,c){return (Vj=$c0C(189)).apply(this,arguments)}var Cb=[0,0,-1];function Uj(a,b){return (Uj=$c0C(190)).call(this,a,b)}function wS($){let Z;{let $=Y0[tQ];Z=Y0[X5]===1&&$<AK?AK:$;}let Q=Y0[d7]!==1&&(Y0[tQ]>=1||$[i$]===1&&Y0[r0]>0);return $[i$]=Q?1:0,Q?1:Z}function RS($,Z,Q,X=0){let J=Y5($,Z,Q,X),K=Uj($,w0);if(K<0)return 0;return K>=1?1:J}function ES($){for(let Z=0;Z<$.skins.length;Z++){let Q=$.skins[Z].data;if(Q[Q.length-1]>=yK)return!0}return!1}function yb($,Z,Q,X,J=!1,K=0){w0[i$]=0;if(!Z){Y5($,Q,X,K);return J?Uj($,w0):wS(w0);}{let V=Zj(Q.camX,Q.camY,Q.camZ,X);{let $=V,Z=Q.planes;$[W8]=Z[16],$[W8+1]=Z[17],$[W8+2]=Z[18]}return _S($,V,Q.planes)
}}function _S($,Z,Q){if($.bothSidesWritten&&!$.localOwnBody)return 0;kb:{let Q=$.localOwnBody&&$.headShownToItsEye;OS($,Z);if(!$.localOwnBody||!Q&&Y0[r0]>=1||!ES($)){if(Q)Y0[r0]=0;break kb;}let X=Math.max(Y0[r0],Vj($,Z,!1,!0)),J=$.readerVisual?.world,K=J!==void 0&&J[8]*Z[W8]+J[9]*Z[W8+1]+J[10]*Z[W8+2]<0;if(Y0[r0]=X>0&&K&&$.nearHide<=-1?1:X,Q)Y0[r0]=Y0[r0]<1?0:-p3}if(Y0[r0]>0)return-Y0[r0];return Xj($,Z,Q),Y0[r0]>0?AK:0}function Ab($,Z,Q,X,J){let K=$.hideEye;K[0]=Z?Z.camX:0;K[1]=Z?Z.camY:0;K[2]=Z?Z.camZ:0;K[3]=Q;if(Z){{let $$73=K,Z$90=Z.planes;{let $=$$73,Z=Z$90;$[W8]=Z[16],$[W8+1]=Z[17],$[W8+2]=Z[18]}}K.set(Z.planes,sQ);}else K.set(Cb,W8),K.fill(NaN,sQ);let V=J.riddenByView?B3:QS;if(J.firstPersonVisible)V=o3;$.hideMode=Z&&X&&!J.wasCameraAttached?V:ZS,$.hideDrawGate=X}function uS($){return $.hideEye[R6]===1}var nP=new Float32Array(4);function mS($,Z,Q,X){Lj($);fS(X,Z.length);for(let J=0;J<$.skins.length;J++){let K=$.skins[J],V=$.jointBoxes[J];if(!V||K.pointCollapsed)continue;let Y=t7($,J),U=Math.min(K.jointCount,Math.floor(V.length/6),Math.floor(Y.length/16));for(let q=0;q<U;q++)M3(X,Z,Y,q*16,V,q*6,V,q*6+3)}if($.rigidPrimitives.length>0&&$.rig){let J=l($);for(let K=0;K<$.rigidPrimitives.length;K++){let V=$.rigidPrimitives[K];if($.materialSlots[V].pointCollapsed)continue;let Y=$.asset.primitives[V];M3(X,Z,J.nodeWorld(Y.nodeIndex),Y.nodeIndex*16,Y.bounds.min,0,Y.bounds.max,0)}}return bS(X,Z.length,c7($,Q))}function fS($,Z){for(let Q=0;Q<Z;Q++)$[2*Q]=1/0,$[2*Q+1]=-1/0}function bS($,Z,Q){for(let X=0;X<Z;X++){let J=$[2*X],K=$[2*X+1];if(!(J<=K)||!isFinite(J+K))return!1;$[2*X]=J-Q,$[2*X+1]=K+Q}return!0}function M3($,Z,Q,X,J,K,V,Y){if(!(J[K]<=V[Y]))return;for(let U=0;U<Z.length;U++){let q=Z[U],z=q[0]*Q[X]+q[1]*Q[X+1]+q[2]*Q[X+2],j=q[0]*Q[X+4]+q[1]*Q[X+5]+q[2]*Q[X+6],G=q[0]*Q[X+8]+q[1]*Q[X+9]+q[2]*Q[X+10],B=q[0]*Q[X+12]+q[1]*Q[X+13]+q[2]*Q[X+14]+q[3],M=z*J[K],L=z*V[Y],F=j*J[K+1],H=j*V[Y+1],N=G*J[K+2],I=G*V[Y+2],W=Math.min(M,L)+Math.min(F,H)+Math.min(N,I)+B,P=Math.max(M,L)+Math.max(F,H)+Math.max(N,I)+B;if(W<$[2*U])$[2*U]=W;if(P>$[2*U+1])$[2*U+1]=P}}var ez=new Float32Array(1024);function hS($,Z,Q,X){let J=$.skinBind;if(J===null)return!1;L1($,J,Z);fS(X,Q.length);let K=$.asset.parsed.skins;for(let V=0;V<K.length;V++){let Y=$.jointBoxes[V];if(!Y||$.skins[V]?.pointCollapsed)continue;let U=K[V].joints.length;if(ez.length<U*16)ez=new Float32Array(U*16);let q=ez;N1($,J,Z,V,q);let z=Math.min(U,Math.floor(Y.length/6));for(let j=0;j<z;j++)M3(X,Q,q,j*16,Y,j*6,Y,j*6+3)}return bS(X,Q.length,pb($,V5($,Z)))}var NK=new Float32Array(1024),iP=new Float32Array(16);function pS(a,b,c){return $c0C(191).call(this,a,b,c)}function c7($,Z){let Q=$.asset.morphPad;if(!(Q>0))return 0;return Q*QX*s0(Z,0)}function lS($,Z){$.pickEar?.();if($k($)){Cd($);return}$.memo.skinSpheresLive=!1,h7(Z,$.posedSphere,0,$.posedWorldSphere,0)}function dS($){let Z=T$,Q=Math.fround($.nearHide),X=$.hideEye.subarray(0,3);for(let J of $.materialSlots)J.data[Z.nearHide]=Q,J.data.set(X,Z.words+1),J.dirty=!0}function qj($,Z){let Q=Math.max(0,Math.min(1,Z.flash?.amount??0)),X=Z.flash?.color??[0,0,0],J=T$;for(let K of $.materialSlots){for(let V=0;V<3;V++)K.data[J.flash+V]=X[V]*Q;K.dirty=!0}}var Rb=new Float32Array(8);function J5($,Z,Q=K$){let X=_T(Rb,0,Z.clipPlane,Q);for(let J of $.materialSlots)J.data.set(X,T$.clipPlane),J.dirty=!0}function cS($,Z,Q,X,J,K){if($.rig){$.rig.shiftRootRenderOrigin(Q,X,J);BH:{let Z$45=Q,Q$28=X,X$17=J;{let Z=Z$45,Q=Q$28,X=X$17;let J=_.get($);if(J===void 0||J.role===Z0||ZJ(J))break BH;J.root[12]-=Z,J.root[13]-=Q,J.root[14]-=X,YH(J.table,J)}}}if($.posedWorldSphere[3]>=0)$.posedWorldSphere[0]-=Q,$.posedWorldSphere[1]-=X,$.posedWorldSphere[2]-=J,$.memo.skinSpheresLive=!1,$.pickEar?.();e0($);for(let V of $.skinnedModelSlots){if(!V||V.offset<0)continue;uT(V.data,W9.model,Q,X,J),k0(V.data,W9.model,V.data,W9.modelInverse)}if($.renderOrigin[0]=K[0],$.renderOrigin[1]=K[1],$.renderOrigin[2]=K[2],Z.clipPlane)J5($,Z,K)}var RK=30;function Eb(a,b,c,d){return (Eb=$c0C(192)).call(this,a,b,c,d)}function _b(a,b,c,d){return (_b=$c0C(193)).call(this,a,b,c,d)}function fb(a,b){return (fb=$c0C(194)).call(this,a,b)}var y6=0;function nS(){y6+=1}class iS{constructor($,Z){this.character=void 0;this.visual=void 0;this.origin=K$;this.bodyMark=-1;this.bodyWorld=null;this.body=v0();this.restMark=-1;this.restWorld=null;this.rest=v0();this.character=$;this.visual=Z}get ownerEntityId(){return this.visual.ownerEntityId}get modelId(){return this.character.modelId}get skeleton(){return this.character.asset}get rig(){return l(this.character)}jointWorld(){return I8(this.character,this.visual),l(this.character).world}jointWorldStore(){I8(this.character,this.visual);let $=l(this.character);return $.nodes.length>0?$.nodeWorld(0):$.world}deriveJointWorld($){l(this.character).ensureNodeWorld($)}root(){return l(this.character).rootMatrix}bodySphere($){let Z=this.visual.world;if(this.bodyMark!==y6||this.bodyWorld!==Z)n7(this.character,Z,this.body),this.bodyMark=y6,this.bodyWorld=Z;return C9(this.body,$)}restSphere($){let Z=this.visual.world;if(this.restMark!==y6||this.restWorld!==Z)l7(this.character.asset,Z,this.rest),this.restMark=y6,this.restWorld=Z;return C9(this.rest,$)}poseBody($){return zC(this.character,this.visual.world,null,$)}held(){return!1}standJoints($,Z){let Q=this.character,X=this.visual,J=$&&_1()?.readBase?.(X.ownerEntityId,gT)===!0;return this.origin=A3(Q,X,Z,J?gT:null),l(Q).world}jointsOrigin(){return this.origin}releaseJoints(){}}function oS($,Z){let Q=$.skinParentFace??=new iS($,Z);return Q.visual=Z,Q}function n7($,Z,Q){let X=$$($);if(X)return aQ($,X,Q);return sS($,VX($,Z),Q)}function sS($,Z,Q){if($k($)){Dd(Q);}else C9(Z.grown,Q);V1:{let $$23=$.nativeRelease,Z$27=Q;{let $=$$23,Z=Z$27;if($===null)break V1;Sa($,Z);}}Q.radius+=$.followPadWorld;return Q}var F3=v0();function tS($,Z,Q){return Q?Q.restSphere(F3):K5($,Z,F3)}function aS($,Z){let Q=Z.cullMaxDistanceSq;let X=tS($,Z.world,$.skinParent).radius/lz;let J=Math.sqrt(X>1?Q*X*X:Q);return isFinite(J)?J:0}function K5($,Z,Q){return C9(VX($,Z).rest,Q)}class rS{constructor(){this.world=new Float32Array(16);this.posed=new Float32Array(4);this.asset=null;this.bounds=null;this.morphPad=0;this.rest=v0();this.grown=v0();this.serial=0;this.poseSerial=-1;this.poseBound=new Float32Array(4);this.poseCorrection=null;this.poseFinite=!1;this.pose=v0();}}function VX($,Z){let Q=$.bodySpheres??=new rS,X=$.posedSphere,J=Q.posed,K=$.asset;if(Q.asset===K&&Q.bounds===K.bounds&&Q.morphPad===K.morphPad&&aZ(J,X)&&M6(Q.world,Z))return Q;return l7(K,Z,Q.rest),C9(Q.rest,Q.grown),$X(Q.grown,X,0,Z),Q.world.set(Z),J.set(X),Q.asset=K,Q.bounds=K.bounds,Q.morphPad=K.morphPad,Q.serial+=1,Q}var oP=new WeakMap;function eS($){let Z=oP.get($);if(Z!==void 0)return Z;let Q=0,X=f0($.nodes);for(let J of $.nodes){if(J.meshIndex===null||J.skinIndex===null)continue;let K=0;for(let V of $.meshes[J.meshIndex]?.primitives??[])K=Math.max(K,V.morphMaxDelta);if(K>0)Q=Math.max(Q,K*s0(Tv($,X,J.skinIndex),0))}if(!i(Q))Q=0;return oP.set($,Q),Q}function $C(){return{bound:new Float32Array(16),loose:new Float32Array(16),boundRadius:0,looseSphere:new Float64Array(4),jointFrame:null,jointCorrection:null,jointKey:new Float32Array(16),rootFrame:null,rootCorrection:null,rootKey:new Float32Array(16),ratio:NaN,remaps:null,asset:null,looseArm:!1,boundLocalRadius:0,looseLocal:new Float64Array(4),readMark:-1,readFrame:null,readWorld:null}}var bb=$C();function V5(a,b){return (V5=$c0C(195)).call(this,a,b)}function sP(a,b,c,d){return (sP=$c0C(196)).call(this,a,b,c,d)}function EK($,Z,Q){if(Z)f($,0,Z,0,Q,0);else Q.set($);return Q}function ZC($){let Z=$.character;if(Z?.skinBind&&sY(Z.skinBind)){let Q=$$(Z);if(Q){return ZC(Q)}}return $}function hb($,Z,Q){let X=$.asset.bounds,J=eS($.asset.parsed)*QX;Q.boundLocalRadius=X.radius/Z+J,Q.looseLocal.set(X.center),Q.looseLocal[3]=X.radius+J*Z}function pb($,Z){let Q=eS($.asset.parsed)*QX,X=s0(Z.bound,0);return Z.looseArm?Q*Math.max(X,s0(Z.loose,0)*Z.ratio):Q*X}function lb($){$.boundRadius=h1($.boundLocalRadius*s0($.bound,0));let Z=$.looseSphere;if($.looseArm){if(h7($.loose,$.looseLocal,0,Z,0),isFinite(Z[0]+Z[1]+Z[2]+Z[3]))return}Z[3]=-1}var QC=0,XC=1,zj=2;function YX(a,b,c,d,e){return (YX=$c0C(197)).call(this,a,b,c,d,e)}var db=v0();function aQ($,Z,Q){return YX($,Z,QC,$.followPadWorld,Q),Q}function JC($,Z,Q){return YX($,Z,QC,0,Q),Q}function jj($,Z,Q,X,J,K){if(X){return Fd($,X,J,K,Z);}let V=VX($,Q),Y=$$($);if(Y)aQ($,Y,J);else sS($,V,J);V1$:{let $$24=$.nativeRelease,Z$28=J;{let $=$$24,Z=Z$28;if($===null)break V1$;Sa($,Z);}}UK(K,Z,J,V.rest);return V}var tP=new WeakMap,nb=new Float32Array(6);function KC($){let Z=$.poseBoundClips;if(Z===null||$.poseBoundStamp.bones!==$.bonesBound.revision||$.poseBoundStamp.ik!==yY($.passes)||$.poseBoundStamp.springs!==$.springs||$.poseBoundStamp.fingers!==($.fingers!==null))return!1;let Q=$.mixer.activeLayerList;if(Z.length!==Q.length)return!1;for(let X=0;X<Q.length;X+=1)if(Z[X]!==Q[X].clip)return!1;return!0}var VC=[],YC=[];function ab($){return{nodes:$.asset.parsed.nodes,layers:$.mixer.activeLayerList,bones:null,boneNode:(Z)=>l($).getBoneByName(Z)?.index??-1,corners:new Float64Array(0),reach:new Float64Array(0),chainScale:new Float64Array(0),turnedBy:VC,shiftedBy:YC}}function rb($){let Z=$.poseBoundClips===null;if(Z&&!g7()){$.poseBoundOwed=!0;return}let Q=Z?a0():0;let X=$.poseBoundInput??=ab($);if(X.nodes=$.asset.parsed.nodes,X.layers=$.mixer.activeLayerList,X.bones=$.bones,X.reach?.length!==X.nodes.length)X.reach=new Float64Array(X.nodes.length);if(X.chainScale?.length!==X.nodes.length)X.chainScale=new Float64Array(X.nodes.length);let J;ib:{let $$80=$.asset.parsed;{let $=$$80;let Z=tP.get($);if(Z){J=Z;break ib;}let Q=new Float32Array($.nodes.length).fill(-1);for(let X=0;X<$.skins.length;X+=1){{let Z$123=X;{let Z=Z$123;let X=$.skins[Z],J=E6($,Z);for(let K=0;K<X.joints.length;K+=1){let V=X.joints[K];if(V<0||V>=Q.length)continue;let Y=aK(J,K*6,X.inverseBindMatrices,K*16);if(Y>Q[V])Q[V]=Y}}}}for(let X=0;X<$.nodes.length;X+=1){sb:{let Z$124=X;{let Z=Z$124;let X=$.nodes[Z];if(X.meshIndex===null||X.skinIndex!==null)break sb;{if((ba=Gd($,X,Q,Z))!==aa){(ba);break sb;}}}}}J=(tP.set($,Q),Q);}}let K=($.asset.morphPad+$.followPadModel)*QX;if(X.corners.length!==J.length)X.corners=new Float64Array(J.length);for(let V=0;V<J.length;V+=1)X.corners[V]=J[V]>=0?J[V]+K:-1;UC($,VC,YC);rK(X,$.poseBound);$.poseBoundStamp.revision++;$.poseBoundClips=hv($.mixer.activeLayerList,$.poseBoundClips??[]);$.poseBoundStamp.bones=$.bonesBound.revision;$.poseBoundStamp.ik=yY($.passes);$.poseBoundStamp.springs=$.springs;$.poseBoundStamp.fingers=$.fingers!==null;if(Z)H9(a0()-Q)}function UC($,Z,Q,X=!0,J=NaN){x$(Z);x$(Q);if(X){KM($.passes,Z,Q,J);}if($.fingers){Hd($,Z);}if($.springs!==null){Id($,Z);}}var aP=new Float32Array(16);function zC(a,b,c,d){return (zC=$c0C(198)).apply(this,arguments)}var eb=v0(),rP=0,Gj=1,S9=2,$h=3,eP=-1;function Zh($,Z,Q,X,J,K,V=!0,Y=null){let U=eb;if(!zC($,Q,X,U,Y))return S9;if(V&&!pT(J,Z.viewmodelLens,U)&&(Z.viewmodelLens!==null||!hT(J,U))||fT(J.secondViews,U))return S9;if(Z.shadow?.castShadow===!1&&!s1($))return rP;if(iT(K,U))return oT(K,U)?$h:S9;return nT(K,U)?Gj:rP}function jC($,Z){return GC($,Z)||K1($.nativeRelease)}function GC($,Z){return Z.ragdollPose?$.ragdoll?.poseApplied!==Z.ragdollPoseSerial:$.ragdoll!==null}function BC($,Z,Q,X,J,K,V,Y,U,q){let z=K;let j=U;let G=j&&V?Kh($,Z,Q,X,J,z,V):null;if(G)z=G,j=x9(G,V);if(j){if(z.bypassFrustum)return eP;if(z.bypassFrustum=!0,x9(z,V))return eP}else if(!q)return S9;if(Y===null||V===null||jC($,Z))return S9;return Zh($,Z,Q,X,V,Y,!q,J)}var Qh=I6(),Xh=v0();function Jh($,Z,Q,X,J){let K=Xh;if(X)YX($,X,XC,$.followPadWorld,K);else C9((J??VX($,Q)).rest,K).radius+=$.followPadWorld;return UK(Qh,Z,K,J?.rest??tS($,Q,X))}function Kh($,Z,Q,X,J,K,V){if(!i(K.maxDistanceSq)||!U3(V,K))return null;let Y=Jh($,Z,Q,X,J);return U3(V,Y)?null:Y}var Vh=I6(),Yh=v0();function MC($,Z,Q,X,J,K){if(Q===0)return $.hullHidden=!1,!1;if(jC($,Z))return!0;let v$53;{let V=Vh,Y=jj($,Z,Z.world,K,Yh,V),U=(Q&G7)===0;v$53=BC($,Z,Z.world,K,Y,V,X,J,x9(V,X),U);}let V=v$53;if(V>=S9)return!0;return $.hullHidden=V===Gj,!1}function LC($,Z,Q,X,J,K){if(Q===0)return!1;let v$54;{let V=Vh,Y=jj($,Z,Z.world,K,Yh,V),U=(Q&G7)===0;v$54=BC($,Z,Z.world,K,Y,V,X,J,x9(V,X),U);}return v$54>=S9}var L3=new Float64Array(1);function HC($,Z){return $.springs!==null||!!$.ragdoll||!!Z.ragdollPose||!!$.nativeRelease||$.releaseHeld||!!$.headsetPose||$.setsOwed||!!$.replayRow||!!x8}function Bj($,Z){if(L3[0]=1/0,HC($,Z)||$.mountAppearanceDirty||$.stand.fitting)return!1;let Q=$.mixer;if(Uk($)||$.morphMeshes.length>0&&Fb($))return!1;if(Q.activeLayerList.length===0&&$.bindPoseMovingFrames<RK&&f7(Z.mixer))return!1;if(Z.ground?.on!==void 0||$.bodyRows.epoch<0)return!1;if($.skinBind&&$.skinParent===null)return!1;if($.skinParent?.character===null)return!1;let X=$.scripted&&q0($)?.role===Z0?1/0:ZM($.passes);if(Number.isNaN(X)||$.scripted&&!qh($,Z,$.scripted))return!1;return L3[0]=X,!0}function qh(a,b,c){return (qh=$c0C(199)).call(this,a,b,c)}function NC($,Z){if(!Bj($,Z))return!0;let Q=q0($),X=$.passes;if(Q===null||Q.role===Z0||X.reach===null)return!1;if(X.grip.hands.length>0&&(X.grip.posedRead!==X.grip.posedRevision))return!0;if(!X.reachStands&&!Z.ik&&!Z.ground)return!1;let J=X.clips,K=Q.clips;if(J.length!==K.length)return!0;for(let V=0;V<K.length;V++)if(J[V]!==K[V].at)return!0;return!1}function WC(){return L3[0]}var IC=i3;function xC(){return x8!==null}function DC($,Z){let Q=$.posedWorldSphere[3];if(!(Q>=0))return-1;return Q+(o7($)?0:Q*0.5+1)+Z*2}function PC($,Z,Q){if(Z===null)return!0;return Kj($,Zj(Z.camX,Z.camY,Z.camZ,Q),Z.planes)>0}function TC($){let Z=$.hideEye;return $.nearHide===0&&Z[i$]===0&&Z[KX]===0&&Z[R6]===0}function vC($,Z){Z.wasCulled=!1,$.hullHidden=!1,$.shadowVisible=!0,$.visible=!$.cameraHidden&&$.drawNearHide<1,$.drawGateShut=!$.visible}var i7=null;function SC($){i7=$}var CC=0;function kC(){return CC}function I8($,Z,Q=!0){let X=D8($);if(X)Pj($,X,Z);let J=l($),K=n$($);J.setRootMatrix(Z.world);if(K!==K||$.readerFrame!==K||$.readerPassed!==Q){if($.readerPassed||$.readerFrame===-1)J.pose.set($.mixer.restPose.subarray(0,J.pose.length));$.readerFrame=K,$.readerPassed=Q;let Y=Q?q0($):null,U=Y&&rU($,J.nodes.length);if(Y!==null&&U!==null&&Y.table.cpuAhead&&U.frame===Y.table.frame&&K===Y.table.nowT){{J.pose.set(U.scratch.subarray(0,J.nodes.length*10)),J.updateWorldMatrices();
}}else{CC+=1,U8($);let q=$.replayRow&&(x8?.swapMoment(Z.ownerEntityId,$.mixer,SK)===!0);if(Nj($,J),q)x8?.restoreLayers($.mixer);if(Y!==null){Mh:{let Z=Y,Q=J,X=U;{let v$84;Od:{MM($.passes,Q,Z.table.nowT,Z.table.frameSeconds,$.mixer.activeLayerList,X,$.asset.parsed.nodes,$.asset.parsed.skins,Z.table.bake.clips);let J=$.springs;if(J===null||!X?.states[t0])break Od;for(let K of YK(J))for(let V=K*10+3;V<K*10+7;V++)Q.pose[V]=X.scratch[V];Q.updateWorldMatrices()
v$84=aa;}if((ba=v$84)!==aa){(ba);break Mh;}}}}}}if(Q)UQ($);let V=$$($);if(V&&$.skinBind){QF:{let Z=$.skinBind,Q=V;{let v$79;Ta:{let X=Z.parentNodeByChildNode,J=$.rig;if(X===null||J===null||!sY(Z))break Ta;let K=Q.jointWorld(),V=J.nodes,Y=J.worldMatrixOrder,U=(dY.length>=V.length?dY:dY=new Uint8Array(V.length)).fill(0,0,V.length);for(let q=0;q<Y.length;q++){let z=Y[q],j=X[z];if(j>=0&&(j+1)*16<=K.length){F1(K,j*16,Z.unit,uZ,0),J.writeNodeWorld(z,uZ,0,0,0,0),U[z]=1;continue}let G=V[z].parent;if(G>=0&&U[G]===1)J.refreshBone(z),U[z]=1}
v$79=aa;}if((ba=v$79)!==aa){(ba);break QF;}}}}OZ($,K$)}var H3=new WeakMap,zh=0;function Mj(a,b,c){return (Mj=$c0C(200)).apply(this,arguments)}function jh($,Z){if(UC($,w7,$3,Z&&($.passes.reachStands||$.passes.gripStands),n$($)),!Z)x$(w7);for(let J=0;J<$3.length;J+=2)w7.push($3[J]);let Q=$.boneSets;if(Q){{for(let J=0;J<Q.count;J++)w7.push(Q.nodes[J]);
}}let X=$.nativeRelease;if(X){{for(let J of X.groups)w7.push(J.root,...J.followers?.nodes??Gh);
}}return w7}var w7=[],$3=[],Gh=[];function Fj($,Z,Q,X,J=!0){if(D8($)||!Mj($,Z,Q,J))return!1;return yC($,Q,X),!0}var _K=new Int32Array(1);function yC(a,b,c){return (yC=$c0C(201)).call(this,a,b,c)}var $T=new WeakMap;function Bh(a,b,c){return (Bh=$c0C(202)).call(this,a,b,c)}function UX($,Z,Q=!1,X=null){let J=n$($);if(J===J&&($.readerPaletteFrame===J||X&&$.readerPaletteFrame===-2-J)&&!Q)return;$.readerPaletteFrame=X===null?J:-2-J;let K=$.skinBind,V=$$($);if(K&&V!==null){Pd(V,$,K);return}let Y=l($);if(X===null)I8($,Z);else Y.setRootMatrix(Z.world);let U=$.asset.parsed.skins,q=Y.rootMatrix;for(let z=0;z<$.skins.length;z++){let j=$.skins[z];if(j.pointCollapsed&&!Q)continue;v$(U[z],X??Y.model,j.rows),j.worldRows=!1;for(let G=0;G<16;G++)j.rootRow[G]=q.a[q.o+G]}{Bd($);}}function Lj(a){return (Lj=$c0C(203)).call(this,a)}function qX($,Z){if($.poseBoundClips===null&&q0($)===null){$.poseBoundOwed=!0;return}let Q;{if(!KC($)){rb($);}Q=$.poseBound;}$.posedBoundRevision=$.poseBoundStamp.revision;let X=$.posedSphere;if(!(Q[3]>=0)){X[3]=-1,$.posedWorldSphere[3]=-1,$.pickEar?.();return}let J=S$($).bindCorrection;if(J===null)X.set(Q);else h7(J,Q,0,X,0);$.memo.skinSpheresLive=!1;let K=Z?.world??$.readerVisual?.world??null;if(K)lS($,K)}function o7($,Z=0){if($.poseBoundOwed||$.ragdoll!==null||$.ragdollHolds||$.nativeRelease!==null||D8($)!==null)return!1;let Q=$$($);if(Q){return Qd(Z,Q);}return $.posedSphere[3]>=0&&AC($)}function Hj($,Z){if(AC($))return;qX($,Z),i7?.($)}function AC($){return KC($)&&$.poseBoundStamp.revision===$.posedBoundRevision}function N3($,Z){if($.body)return;if($.skinBind){KQ($,0,0,0,-1);return}let Q=n7($,Z,Lh);KQ($,Q.x,Q.y,Q.z,Q.radius+c7($,Z))}var Lh=v0();function gC($,Z){let Q=Z.world;$.rootMoved=!0;MH:{let Z$46=Q;{let Z=Z$46;let Q=_.get($),X=$.rig;if(X===null)break MH;if(X.setRootMatrix(Z),Q===void 0||Q.role===Z0||ZJ(Q))break MH;{let J=X.rootMatrix;Q.root.set(J.a.subarray(J.o,J.o+16)),YH(Q.table,Q)
}}}if(Xk($,Z)||$.readerFrame!==n$($))e0($);else $.readerPaletteFrame=-1;if($.posedSphere[3]>=0)lS($,Q);N3($,Q)}{let $$28=function($){e0($);{let $$101=$.passes;{let $=$$101;if($.grip.hands.some((Z)=>Z.support.missed!==0))$.gripReread=!0}}qX($,null);Dh($);if($.rig!==null&&J7($.mixer)){Hh:{let Z=$.readerVisual;if(Z===null)break Hh;let Q;{let Z;{let v$87;{let Z=null,Q=$.mixer.activeLayerList;for(let X=0;X<Q.length;X++){let J=Q[X],K=J.clip.release,V=K?.at===void 0?void 0:K.at-xZ(J.clip);if(!K||EY.has(J)||V===void 0||J.currentWeight<=0||J.targetWeight<=0||J.speed<=0||J.time<V)continue;if(hO($,K.nodes))continue;(Z??=[]).push({layer:J,time:J.time,elapsed:(J.time-V)/J.speed}),J.time=V}
v$87=Z;}Z=v$87}Q=Z;}if(Q===null)break Hh;OC($,Z);EM($,Q);Wj($);e0($)}}i7?.($)};{let $=$$28;Y7=$}}var WK=new Float32Array(0),ZT=[0,0,0],QT=[0,0,0];function W3($,Z){let Q=l($);Q.setRootMatrix(Z.world),Nj($,Q)}function Nj($,Z){_6($.mixer,Z.pose);cK(Z,$.bones,$.bodyFrame);th:{let $$95=Z,Z$111=$.boneSets;{let $=$$95,Z=Z$111;if(Z===null)break th;{let Q=$.pose;for(let X=0;X<Z.count;X++){let J=Z.nodes[X]*s$;for(let K=Z.kinds[X]===JS?3:0;K<7;K++)Q[J+K]=Z.words[X*7+K];$.touchBone(Z.nodes[X])}
}}}Z.updateWorldMatrices()}function OC(a,b){return (OC=$c0C(204)).call(this,a,b)}function Wj(a){return (Wj=$c0C(205)).call(this,a)}function I3($,Z,Q){let X=$.kept.heldRows??=new Map,J=X.get(Z);if(J?.rows.length!==Q)J={rows:new Float32Array(Q),last:new Float32Array(Q),fresh:!0},X.set(Z,J);return J}function x3(a,b,c,d){return (x3=$c0C(206)).call(this,a,b,c,d)}function wC($){for(let Z=0;Z<16;Z++)$[Z]=Z%5===0?1:0}var XT=new WeakMap,Wh=[];function Ih(a,b){return (Ih=$c0C(207)).call(this,a,b)}var xh=Math.fround(0.001),Z3=new Int32Array(0),JT=new Uint8Array(0);function Dh($){let Z=$.asset.parsed,Q=Z.nodes,X=Q.length;if(Z3.length<X){Sd(X);}let J=JT,K=Z3;_7[0]=1/0,_7[1]=1/0;let V=(_.get($)?.rootCollapsed===!0);let Y=!V&&$.skinBind===null;J.fill(0,0,X);let U=Y?Ph($,J,X):0;if(U===0)K.fill(-1,0,X);else{Td(K,X,Q,J);}let q=Z.skins,z=$.nativeRelease,j=!1;for(let G=0;G<$.skins.length;G++){let B=$.skins[G];if(!V&&J1(z,null,G,!0))continue;let M=Y&&Sh(q[G].joints,$.jointBoxes[G]??null,K,X);let L=V||M;if(B.rowsCollapsed===M&&B.pointCollapsed===L)continue;{j=Ud(B,L,j,M)}}for(let G=0;G<$.rigidPrimitives.length;G++){{ba=Vd($,G,V,z,Y,X,K,j);j=ca;if(ba===ma)continue;}}IL:{let Z$33=Y?_7[0]:1/0,Q$22=Y?_7[1]:1/0;{let Z=Z$33,Q=Q$22;let X=_.get($);if(X===void 0||X.role===Z0)break IL;let J=X.mixer,K=i(J.tickedAtMs),V=K?Z:Math.min(Z,Q);X.collapseEdgeT=i(V)?J.tickedT+V-UL:1/0;if(X.collapseEdgeT<X.edgeT){dc(X);}X.collapseEdgeC=K&&i(Q)?J.tickedAtMs+Q*1000-qL:1/0;if(X.collapseEdgeC+X.lagMs<X.edgeC){ec(X);}let Y=!1;for(let U=0;U<X.skins.length;U++){let q=$.skins[U]?.pointCollapsed===!0&&!kw($,U);if(X.skins[U].collapsed===q)continue;X.skins[U].collapsed=q,Y=!0}if(Y)b8(X.table,X)}}xL:{let Z$34=U===0?null:K,Q$23=X;{let Z=Z$34,Q=Q$23;let X=_.get($);if(X===void 0||X.role===Z0||X.role===Y8)break xL;if(Z===null){if(X.collapseUnder===null)break xL;X.collapseUnder=null}else{{if((ba=fc(X,Q,Z))!==aa){(ba);break xL;}}}z6(X)}}if(j)s7($)}function RC($){let Z=$.body,Q=[];if(Z===null||Z.disposed)return{listed:0,listedTriangles:0,parts:Q};let X=$.asset.primitives,J=$.asset.parsed.nodes,K=$.nativeRelease?.groups??[],V=0,Y=0;for(let U of Z.table.itemsDebugOf(Z)){let q=X[U.primIndex],z=$.materialSlots[U.primIndex],j=q.skinIndex,G="";for(let M=0;M<K.length&&G==="";M++){let L=j!==null?K[M].pieceBySkin.get(j):K[M].pieceByNode.get(q.nodeIndex);if(L===void 0)continue;G=`${M}.${K[M].pieces.indexOf(L)}${L.clear?"c":""}`}let B=Math.floor((q.index?q.indexCount:q.vertexCount)/3);if(U.live)V+=1,Y+=B;Q.push({p:U.primIndex,node:J[q.nodeIndex]?.name??"",tris:B,item:U.item,live:U.live,out:U.out,hidden:z?.hidden===!0,collapsed:EC($,z,j),release:G,levels:U.levels,refused:U.refused,paint:U.paint})}return{listed:V,listedTriangles:Y,parts:Q}}function s7($){$.leftOutOwed=!1;let Z=$.body;if(Z===null||Z.disposed)return;Z.table.setLeftOutParts(Z,Ij($))}var Q3=new Uint8Array(0);function EC($,Z,Q){return(Q===null?Z?.pointCollapsed:$.skins[Q]?.pointCollapsed)===!0}function Ij($){let Z=$.asset.primitives;if(Q3.length<Z.length)Q3=new Uint8Array(Z.length);let Q=Q3;for(let X=0;X<Z.length;X++){let J=Z[X].skinIndex,K=$.materialSlots[X];Q[X]=K?.hidden===!0||EC($,K,J)?1:0}return Q}var X3=new Uint8Array(0),KT=new Float64Array(0),VT=new Float64Array(0),J3=new Uint8Array(0);function Ph($,Z,Q){let X=$.asset.parsed.nodes,J=$.mixer,K=J.activeLayerList;if(X3.length<Q){{X3=new Uint8Array(Q),KT=new Float64Array(Q),VT=new Float64Array(Q);
}}let V=X3,Y=KT,U=VT;V.fill(0,0,Q),Y.fill(0,0,Q),U.fill(0,0,Q);let q=!0,z=!1;for(let F=0;F<K.length;F++){let H=K[F];if(H.currentWeight!==H.targetWeight)q=!1;if(H.released)z=!0;if(H.additive)continue;let N=WX(H.clip,Q);let I=H.maskNodes;let W=H.currentWeight>xh;let P=H.speed===0||H.loop==="once"&&((H.speed>0?H.time>=H.clipSpan:H.time<=0));for(let x=0;x<Q;x++){let D=N[x];if(D===NX||I!==null&&!I.has(x))continue;let v=V[x]|1;if(D!==x5&&!(P&&vh(H,x,Q))){{let v$67;{let x$2=x,v$66=v;{let x=x$2,v=v$66;if(P)C6[0]=-1;else {Th(H,x,Q,C6);}if(C6[0]!==1)v|=2;let k=C6[2];if(C6[0]>=0&&C6[1]<_7[k])_7[k]=C6[1]
v$67=v;}}v=v$67}}if(W&&H.override)U[x]+=H.currentWeight;else if(W)v|=8,Y[x]+=H.currentWeight;V[x]=v}}let j=((JH(J)&eX)!==0);let G=0;for(let F=0;F<Q;F++){let H=V[F],N=X[F].scale,I=N.x===0&&N.y===0&&N.z===0,W=(H&2)===0,P=(H&8)!==0&&(j||Y[F]>=1);if(H===0)Z[F]=I?1:0;else if(W&&(I||q&&!z&&(P||U[F]>=1)))Z[F]=1;G+=Z[F]}if(nK(J.inertia)){{let v$68;{let G$3=G;{let G=G$3;if(J3.length<Q)J3=new Uint8Array(Q);let F=J3;F.fill(0,0,Q),Cv(J.inertia,F,Q);for(let H=0;H<Q;H++){if(F[H]===0||Z[H]===0)continue;Z[H]=0,G-=1}
v$68=G;}}G=v$68}}let{bones:B,rig:M}=$;if(B===null||M===null)return G;let L=X9(B);for(let F=0;F<L.length;F+=1){let H=m1(M,B,F,L[F]);if(H>=0&&H<Q&&Z[H]===0&&u1(B[L[F]])===0)Z[H]=1,G+=1}return G}var _C=-2;function uC($,Z,Q,X,J){let K=Q[X];if(K!==_C)return K;let V=$[X].parent,U=V>=0&&V<J?uC($,Z,Q,V,J):-1;if(U<0)U=Z[X]===1?X:-1;return Q[X]=U,U}var IK=new Float32Array(4),_7=new Float64Array([1/0,1/0]);function Th(a,b,c,d){return (Th=$c0C(208)).call(this,a,b,c,d)}var C6=new Float64Array(3);function vh($,Z,Q){let X=WX($.clip,Q)[Z];if(X<0)return!1;return rT($.clip.channels[X],c3($),IK),IK[0]===0&&IK[1]===0&&IK[2]===0}function Sh($,Z,Q,X){let J=$.length,K=!1;if(Z!==null&&Z.length>=J*6)for(let Y=0;Y<J&&!K;Y++)K=Z[Y*6]<=Z[Y*6+3];let V=-2;for(let Y=0;Y<J;Y++){if(K&&Z!==null&&!(Z[Y*6]<=Z[Y*6+3]))continue;let U=$[Y],q=U>=0&&U<X?Q[U]:-1;if(q<0||V!==-2&&q!==V)return!1;V=q}return V>=0}function e0($){$.readerFrame=-1,$.readerPaletteFrame=-1;let Z=H3.get($);if(Z)Z.clock=NaN}function mC($){if(!$.hullHidden)return!1;return $.hullHidden=!1,$.shadowVisible=!0,!0}function Y5($,Z,Q,X=0){let J=yS($,Z.camX,Z.camY,Z.camZ,Q,Z.planes);{let $$74=w0,Z$91=Z.planes;{let $=$$74,Z=Z$91;$[W8]=Z[16],$[W8+1]=Z[17],$[W8+2]=Z[18]}}w0[i$]=X;return J}var Ch=v0(),kh=I6(),W0={masked:!1,cameraHidden:!1,culled:!1,nearHide:NaN,ridden:!1,held:0,uploaded:!1,visible:!1,drawNearHide:0,worn:0},D3=new hK("skinned characters' riding holds",()=>new WeakSet);function xj($,Z){if(Z===null)return $.hideEye[i$];return D3.peek(Z)?.has($)===!0?1:0}var P3=new hK("skinned characters' step holds",()=>new WeakMap);class fC{constructor(){this.held=new WeakMap;this.judged=0;}empty(){this.judged+=1}land($,Z){let Q=this.held.get($);if(Q){Q.judged=this.judged,Q.hide=Z;return}let X={judged:this.judged,hide:NaN};X.hide=Z,this.held.set($,X)}hideOf($){let Z=this.held.get($);return Z?.judged===this.judged?Z.hide:NaN}}var yh=new hK("skinned characters' view gates",()=>new fC);function bC($){let Z=dT($);return Z===null?null:yh.in(Z)}function hC($,Z){if(Z===null)return $.visible?$.drawNearHide:NaN;return Z.hideOf($)}function pC($,Z){if(Z){_d(Z,$);return}$.drawNearHide=W0.drawNearHide,$.visible=W0.visible}function lC($,Z,Q,X,J,K=null,V=bK.near,Y=null,U=0,q=null,z=!0){let j=xj(Z,q);if(j!==0){YT:{let $$83=Z,Z$99=q,Q$65=0;{let $=$$83,Z=Z$99,Q=Q$65;if(Z===null){$.hideEye[i$]=Q;break YT;}if(Q===1)D3.in(Z).add($);else D3.peek(Z)?.delete($)}}}let G=q===null?Z.hideEye[KX]:P3.peek(q)?.get(Z)??0;if(G!==0){UT:{let $$85=Z,Z$101=q,Q$67=0;{let $=$$85,Z=Z$101,Q=Q$67;if(Z===null){$.hideEye[KX]=Q;break UT;}if(Q!==0)P3.in(Z).set($,Q);else P3.peek(Z)?.delete($)}}}if(W0.masked=J===0,W0.cameraHidden=!1,W0.culled=!1,W0.nearHide=NaN,W0.ridden=Q.riddenByView,W0.held=0,W0.uploaded=!1,W0.visible=!1,W0.drawNearHide=Z.drawNearHide,W0.worn=0,J===0)return!1;let B=(J&G7)===0,M=Q.world,L=Ch,F=kh;jj(Z,Q,M,K,L,F);let H=x9(F,X),N=!H&&!B,I=q0(Z)!==null;{let $$87=Z,Z$103=K;{let $=$$87,Z=Z$103;if($.skinParent=$.skinBind?Z:null,$.skinBind&&Z)L1($,$.skinBind,Z)}}nC($,Z,Q,K,Y);let W=!I&&q0(Z)!==null;if(W)T3($,Z,Y);let P=0,x=!1;if(N&&X!==null&&!Q.wasCameraAttached&&z){P=yb(Z,Q.firstPersonVisible,X,V,Q.riddenByView,j);x=!Q.firstPersonVisible&&Y0[d7]===1;W0.nearHide=P;let C=w0[i$];W0.held=C;if(C!==0){YT$:{let $$84=Z,Z$100=q,Q$66=C;{let $=$$84,Z=Z$100,Q=Q$66;if(Z===null){$.hideEye[i$]=Q;break YT$;}if(Q===1)D3.in(Z).add($);else D3.peek(Z)?.delete($)}}}}W0.cameraHidden=B,W0.culled=H,W0.uploaded=W;let D=_3(),v=D?l3(P,G):P,k=D?Dv(P,G):0;if(k!==0){UT$:{let $$86=Z,Z$102=q,Q$68=k;{let $=$$86,Z=Z$102,Q=Q$68;if(Z===null){$.hideEye[KX]=Q;break UT$;}if(Q!==0)P3.in(Z).set($,Q);else P3.peek(Z)?.delete($)}}}let S=U>0||v>0?Math.max(v,U):v;return W0.drawNearHide=S,W0.visible=N&&S<1,W0.worn=v>=1||x?1:0,W}var Ah=I6(),gh=v0();function cC($,Z,Q,X,J,K=bK.near,V=null,Y=null,U=null,q=K$){let z=Z.renderOrigin;z[0]=q[0],z[1]=q[1],z[2]=q[2];let j=i3();if(j!==0){{let $$93=Z,Z$109=j;{let $=$$93,Z=Z$109;de($,Z);}}}{let $$88=Z,Z$104=V;{let $=$$88,Z=Z$104;if($.skinParent=$.skinBind?Z:null,$.skinBind&&Z)L1($,$.skinBind,Z)}}let G=q0(Z),B=G===null&&Z.stand.firstOwed!==0?a0():-1;if(nC($,Z,Q,V,U),B>=0)H9(a0()-B);cL:{let $$36=Z,Z$42=o1(J,Q.shadow?.castShadow!==!1);{let $=$$36,Z=Z$42;let Q=_.get($);if(Q===void 0||Q.sight===Z)break cL;Q.sight=Z,c0(Q)}}if(Z.releaseHeld&&q0(Z)!==G)Wj(Z);qT(Z,Q,q,1);bh:{let $$92=Z,Z$108=Q;{let $=$$92,Z=Z$108;if((Z.ragdollAwaited&&Z.ragdollPose===null&&$.ragdoll===null)!==$.ragdollHolds){hh($,Z);}if(!$.setsOwed&&!GC($,Z)&&$.headsetPose===null)break bh;Vk($,Z)}}qT(Z,Q,q,2);nh:{let $$94=Z,Z$110=Q;{let $=$$94,Z=Z$110;let Q=x8,X=Q===null?null:q0($);if(Q===null||X===null||X.role===Z0||$.rig===null)break nh;GH($);let J=Z.ragdollPose??null;SK.ragdoll=J;if(!Q.swapLayers(Z.ownerEntityId,$.mixer,SK)){{(ee($));break nh;}}$.replayRow=!0;let K=SK.ragdoll;if(K!==null||J!==null||$.boneSets!==null){fe($,K,Z,J);}else iU($);Q.restoreLayers($.mixer),e0($)}}Nh:{let $$82=Z,Z$98=Q;{let $=$$82,Z=Z$98;let{nativeRelease:Q,rig:X}=$;if(Q===null||X===null||!$.releaseHeld)break Nh;if(!K1(Q)&&!$.releaseRowsFirst)break Nh;Rd(X,Z,$,Q);}}if(Z.poseBoundOwed){Fh:{let $$81=Z,Z$97=Q;{let $=$$81,Z=Z$97;if($.poseBoundClips===null&&!g7())break Fh;$.poseBoundOwed=!1,qX($,Z),i7?.($)}}}if(J===0){Q.wasCulled=!1;Z.visible=!1;Z.shadowVisible=!1;Z.hullHidden=!1;pU:{let $$34=Z,Z$40=!1;{let $=$$34,Z=Z$40;let Q=_.get($);if(Q===void 0||Q.heldSeen===Z)break pU;Q.heldSeen=Z,c0(Q)}}{let $=Z;if($.rigMinted&&q0($)?.role===Z0)LS($)}BT:{let $$89=Z,Z$105=Q,Q$69=q;{let $=$$89,Z=Z$105,Q=Q$69;if(!$.mountAppearanceDirty)break BT;$.mountAppearanceDirty=!1,JX($,Z,Q)}}T3($,Z,U);return !1;}let M=(J&G7)===0,L=Q.world,F=gh,H=Ah,N=jj(Z,Q,L,V,F,H),I=x9(H,X);Q.wasCulled=I;pU$:{let $$35=Z,Z$41=Q.viewmodelKey!==null&&!I;{let $=$$35,Z=Z$41;let Q=_.get($);if(Q===void 0||Q.heldSeen===Z)break pU$;Q.heldSeen=Z,c0(Q)}}if(V!==null&&Z.skinBind!==null){cb:{let $$79=Z,Z$96=V;{let $=$$79,Z=Z$96;{if((ba=Ed($,Z))!==aa){(ba);break cb;}}}}}Ab(Z,X,K,!I&&!M,Q);let P=BC(Z,Q,L,V,N,H,X,Y,I,M),x=P>=S9;Z.shadowVisible=x;Z.cameraHidden=M;Z.hullHidden=P===Gj;Z.mirrored=B9(L,0);BT$:{let $$90=Z,Z$106=Q,Q$70=q;{let $=$$90,Z=Z$106,Q=Q$70;if(!$.mountAppearanceDirty)break BT$;$.mountAppearanceDirty=!1,JX($,Z,Q)}}{let $$75=Z,Z$92=Q;{let $=$$75,Z=Z$92;$.readerVisual=Z;let Q=0,X=!1;if($.hideMode===QS||$.hideMode===B3){w0.set($.hideEye);Xj($,w0,null);X=Y0[d7]===1;Q=$.hideMode===B3?Uj($,w0):wS(w0);}else if($.hideMode===o3)w0.set($.hideEye),Q=_S($,w0,null);if(_3())Q=l3(Q,$.hideEye[KX]);let J=Q>=1||X?1:0;if(n3($.hideEye[R6],J),$.hideEye[R6]=J,Q!==$.nearHide||Q<0)$.nearHide=Q,dS($);$.drawNearHide=Q,$.visible=$.hideDrawGate&&Q<1}}T3($,Z,U);if(!x){{let $=Z;if($.rigMinted&&q0($)?.role===Z0)LS($)}}else {mb:{let $$78=Z,Z$95=Q,Q$64=Z.rootMoved;{let $=$$78,Z=Z$95,Q=Q$64;if($.bindPoseMovingFrames>=RK)break mb;if(!($.mixer.activeLayerList.length===0&&f7(Z.mixer))||!Q||f7(Z.mixer,kv)){$.bindPoseMovingFrames=0;break mb;}if($.bindPoseMovingFrames++,$.bindPoseMovingFrames<RK)break mb;fb($,Z)}}Z.rootMoved=!1;}return x&&KJ(Z)}function qT($,Z,Q,X){let J=$.stand.firstOwed&X;if(J&&!g7())return;let K=J&&a0();if(X===1){wh:{if($.springs===null)break wh;let Q=Z.ownerEntityId,X=x8?.drawsBody(Q)===!0,J=x8?.placesBody(Q)===!0;cD($,Q,$.springsLinks,J,X,$.ragdoll!==null||Z.ragdollPose!==null);jb($,Z)}}else sC($,Z,Q,$.stand.shut,!0);if(!J)return;if(H9(a0()-K),X!==1||$.springs?.awaitsClouds!==!0)$.stand.firstOwed^=X}var zT=new Float32Array(16),Oh={position:[0,0,0],rotation:[0,0,0,1],scale:[1,1,1]};function nC($,Z,Q,X,J){let K=q6($);if(Z.skinBind!==null&&X===null){b0(Z);return}if(Z.skinBind){{if((ba=$d(X,K,Z,Q))!==aa)return ba}}let V=q0(Z)?.table!==K;if(V){{Xk(Z,Q),l(Z).setRootMatrix(Q.world),e0(Z),qX(Z,Q);
}}let Y=J?.fold??null,U=Y!==null&&J?.bone&&Z.skinBind===null?Ej(J.character,J.bone):null;if(Y!==null&&U!==null&&q0(U.character)?.table===K){be(Y,Q,K,Z,U,V);return}if(j6(K,Z),V)N3(Z,Q.world)}function iC($,Z,Q,X=!1){if(q0(Z)===null)l(Z).setRootMatrix(Q.world),j6(q6($),Z);return j9(Z,X)}var jT=new WeakMap,Rh=new O,GT=new J0,Eh=new O;function Dj($,Z){let Q=jT.get($);if(Q===void 0||Q!==null&&Z!==void 0&&Q.facing!==Z){let X=kB($,Z);Q=X===null?null:{head:X.head,face:X.face,facing:Z},jT.set($,Q)}return Q}function oC($,Z,Q){let X=Dj(l($),Z);if(!X)return!1;return X.head.matrixWorld.decompose(Rh,GT,Eh),Q.copy(X.face).applyQuaternion(GT).normalize(),!0}function D8($){let Z=q0($);return Z!==null&&Z.role===V$&&(Z.wearer?.character??null)!==null?Z:null}var _h={now:0,elapsed:0,ik:null,ground:null,origin:K$,held:!1,facing:void 0,off:!1,ownerEntityId:"",nodes:[],skins:[],clips:[],blocks:[],layers:[],chain:null,holds:null,readerRig:function($,Z){if(u7===null)return l($);if(Z!==null&&$.readerFrame!==n$($)&&Fj($,u7,Bh($,l($),Z),u7.world,!1))return l($);return I8($,u7,!1),l($)},readerSpoiled:($)=>e0($)};var u7=null;function sC($,Z,Q,X,J=!1){let K=q0($);if(K===null||K.role===Z0)return;let V=_h;V.now=K.table.nowT;V.elapsed=K.table.frameSeconds;V.ik=Z.ik;V.ground=Z.ground;V.origin=Q;V.held=Z.wasCameraAttached;V.facing=Z.model.forward;V.off=$.ragdoll!==null;V.ownerEntityId=Z.ownerEntityId;V.nodes=$.asset.parsed.nodes;V.skins=$.asset.parsed.skins;V.clips=K.clipKeys;V.blocks=K.clips;V.layers=$.mixer.activeLayerList;V.chain=(ZJ(K)?K.root:null);V.holds=bk($);u7=Z;$M:{let Z$19=$.passes,Q$13=l($),X$9=V,J$7=X,K$4=J&&!K.eyeIn;{let Z=Z$19,Q=Q$13,X=X$9,J=J$7,K=K$4;if(X.off){kY($,Z);break $M;}HO($,Z,X,MO($,Z,Q,X),J,K)}}{let $=V;u7=null,$.ik=null,$.ground=null,$.origin=K$,$.facing=void 0,$.ownerEntityId="",$.nodes=cQ,$.skins=cQ,$.clips=cQ,$.blocks=cQ,$.layers=cQ,$.chain=null,$.holds=null}}var cQ=[];function tC($,Z,Q,X){if($.passes.owed){sC($,Z,Q,aC($,X,Z.ownerEntityId))}}function aC($,Z,Q){if(!$.stand.shut)return!1;return Z===null||E3(Z,Q,null)!==0||tT(Z,Q)===0}function rC($){let Z=q0($)?.table.nowT??NaN;return $.passes.reach?.effectorWeights(Z)??{count:0,weight:0}}function eC($){return D8($)!==null}function $k($){let Z=D8($),Q=Z?.wearer?.character??null;if(Z===null||Q===null||!(Q.posedWorldSphere[3]>=0))return!1;return ce($,Z,Q);}var m7=new Float32Array(4),mh,MT=new Float32Array(16),FT=[0,0,0,1],LT=new Float32Array(16);function Pj(a,b,c){return (Pj=$c0C(210)).call(this,a,b,c)}function Zk($,Z,Q){let X=$.kept;k0(Z,0,LT,0),f(LT,0,Q,0,X.mountLocal??=new Float32Array(16),0),(X.mountRoot??=new Float32Array(16)).set(Z)}function hh($,Z){$.ragdollHolds=!$.ragdollHolds,$.setsOwed=!0;let Q=q0($)?.table.frame??-1;if(!$.ragdollHolds||$.drawnPose!==null&&Q-$.drawnPoseFrame<=1)return;I8($,Z,!1),Qk($)}function Qk($){let{pose:Z}=l($);($.drawnPose??=new Float32Array(Z.length)).set(Z),$.drawnPoseFrame=q0($)?.table.frame??-1}function Xk($,Z){let Q=$.bodyFrame;let X;Y4:{let $$2=dh,Z$4=Z.geomScale,Q$1=Z.model.forward;{let $=$$2,Z=Z$4,Q=Q$1;if(Z[0]===1&&Z[1]===1&&Z[2]===1&&Q===void 0){X=null;break Y4;}X=(V4($,Z,0,Q),$);}}if(X===null?Q===null:Q!==null&&M6(Q,X))return!1;return $.bodyFrame=X?.slice()??null,r1($),!0}var dh=new Float32Array(16),x8=null;function Jk($){x8=$}function Kk($){return x8?.drawsBody($)===!0}var SK={ragdoll:null},ch=d3();function Vk($,Z,Q=!1){$.setsOwed=!1;let X=l($);X.setRootMatrix(Z.world);let J=Z.ragdollPose&&($.ragdoll??=d3()),K=Q?null:J;if(K?.clips&&K.poseApplied===Z.ragdollPoseSerial)X.pose.set(K.clips);else if(U8($),_6($.mixer,X.pose),K)(K.clips??=new Float32Array(X.pose.length)).set(X.pose);cK(X,$.bones,$.bodyFrame);let V=K3.length<X.pose.length?K3=new Float32Array(X.pose.length):K3;V.set(X.pose);let Y=$.ragdollHolds&&!Q?$.drawnPose:null;if(Y)X.pose.set(Y);if($.fingers!==null||$.fingersLaid){$.fingersLaid=Cx(X,$.asset.parsed,$.fingers,$.fingersLaid);}X.updateWorldMatrices();if(J&&Z.ragdollPose){J.blendRemaining=0;vv(J,X,$.asset.parsed,Z.ragdollPose,ih(Z));J.poseApplied=Z.ragdollPoseSerial;}else if($.ragdoll){if(!Sv($.ragdoll,X,uK($)))$.ragdoll=null}if($.headsetPose)uv($.headsetPose,X,$.asset.parsed,$.renderOrigin);$.boneSets=oh(X,V,$.boneSets,Y!==null||Z.ragdollPose!==null);e0($);if(Q)iU($);else r1($)}var K3=new Float32Array(0),HT=new Float32Array(16);function ih($){let Z=$.ragdollEntityFrame;if(Z)return Z;return HT.set($.world),HT}function oh($,Z,Q,X){let J=$.pose,K=$.nodes.length,V=Q!==null&&Q.nodes.length>=K?Q:{nodes:new Int32Array(K),kinds:new Uint8Array(K),words:new Float32Array(K*7),count:0},Y=0;for(let U=0;U<K;U++){let q=X?XS:sh(J,Z,U);if(q<0)continue;let z=U*s$;V.nodes[Y]=U,V.kinds[Y]=q;for(let j=0;j<7;j++)V.words[Y*7+j]=J[z+j];Y+=1}return V.count=Y,Y===0?null:V}function sh($,Z,Q){let X=Q*s$;for(let J=0;J<7;J++)if($[X+J]!==Z[X+J])return J<3?XS:JS;return-1}function uK($){return q0($)?.table.frameSeconds??0}function T3($,Z,Q){Z.storageArena=$.characterStorage;Z.stand.fitting=!Q5($,Z,Q);{let $$72=Z;{let $=$$72;let Z=DS($);for(let Q of $.morphMeshes){if(Q.edge===Z)continue;Q.edge=Z;{let Z$122=Q;{let Z=Z$122;let{paramsU32:Q,paramsF32:X}=Z.lane;for(let J=0;J<Z.weights.length;J++){let K=kK+J*3,V=PS($,Z,J,0,0),Y=H8[0]-Math.min(Math.max(H8[0],H8[1]),H8[2]);Z.weights[J]=Y,Q[K]=V,X[K+1]=V===A?Y:H8[1],X[K+2]=V===A?Y:H8[2]}}}Q.lane.writes+=1}}}{let $=Z;if(Uk($))U8($),_6($.mixer,null);Db($)}ah:{let Q=Z.scripted;if(!Q)break ah;let X=Q.frames;if(!X||X.revision!==Q.recordRevision){{let v$85;{let X$44=X;{let X=X$44;X={revision:Q.recordRevision,nodes:[],parts:[]};for(let J of Q.groups){if(!J.retained.record.assembled.skinnedModel)continue;for(let K of J.primitives){let V=Z.asset.primitives[K];if(X.nodes.push(V.nodeIndex),V.skinIndex!==null)X.parts.push(K)}}Q.frames=X
v$85=X;}}X=v$85}}if(X.nodes.length===0)break ah;if(Z.uniformArena=$.characterUniforms,X.hiddenView&&Q.eye===X.hiddenView&&Q.held.size===0){X.read=NT;break ah;}NT(Z)}eh:{let Q=Z.scripted;if(Q===null)break eh;{let X=$.characterUniforms;Z.uniformArena=X;for(let J of Q.byPrimitive.keys()){let K=Z.materialSlots[J];if(!K.dirty&&K.offset>=0)continue;if(K.offset<0)K.offset=X.alloc(K.data.byteLength);X.write(K.offset,K.data),K.dirty=!1}
}}}function Yk(a){return (Yk=$c0C(211)).call(this,a)}function NT($){let Z=$.scripted?.frames,Q=$.uniformArena;if(!Z||!Q)return;Z.read=void 0;let X=Z.nodes,J=$.readerVisual;if(J!==null&&Mj($,J,X)){let K=D8($);if(K)Pj($,K,J);yC($,X,J.world)}else if(J!==null&&$.rig!==null)I8($,J);$p(Q,$,Z.parts)}function Uk($){let Z=$.mixer;return Z.materialAnimation!==null&&(!Z.scalarsAtRest||f1(Z,"scalars"))}function $p(a,b,c){return ($p=$c0C(212)).call(this,a,b,c)}function Zp($,Z,Q,X,J){let K=W9.model,V=$.rig,Y=Z.offset>=0&&Z.written===Z.offset;if(Q!==null||V===null){if(Q){{let Z$112=Q,Q$71=X,X$37=J,J$26=xK;{let Z=Z$112,Q=Q$71,X=X$37,J=J$26;let K=V5($,Z),V=S$($),Y=$.skinBind?.remaps[Q],q=K.looseArm&&Y!==void 0&&!Y.hangs&&Y.parentNode.every((z)=>z<0)?EK(K.loose,V.bindCorrection,v3):K.bound;f(q,0,V.model,X*16,J,0)}}}else{let U=nY($.asset.parsed);EK($.readerVisual?.world??t$,U.bindCorrection,v3),f(v3,0,U.model,J*16,xK,0)}if(Y&&Z.rig===null&&M6(Z.data,xK,K))return!1;{let $$96=xK,Z$113=0,Q$72=Z.data,X$38=K;{let $=$$96,Z=Z$113,Q=Q$72,X=X$38;let J=Z*16;for(let K=0;K<16;K++)Q[X+K]=$[J+K]}}return !0}if(Y&&Z.rig===V&&Z.rootStamp===V.rootStamp&&Z.nodeWrite===V.modelWriteOf(J))return!1;{let $$97=V.nodeWorld(J),Z$114=J,Q$73=Z.data,X$39=K;{let $=$$97,Z=Z$114,Q=Q$73,X=X$39;let J=Z*16;for(let K=0;K<16;K++)Q[X+K]=$[J+K]}}return !0}var xK=new Float32Array(16),v3=new Float32Array(16);var Jp=[],Kp=[];function Yp($,Z,Q){for(let X=$.nodes[Z].parent;X>=0&&X<$.nodes.length;X=$.nodes[X].parent)if(Q.includes(X))return!0;return!1}function qk($,Z){let Q=new Int32Array(Z).fill(-1),X=0,J=[$];for(let K=J.pop();K!==void 0;K=J.pop()){if(K.index<Q.length)Q[K.index]=X++;for(let V=0;V<K.children.length;V++)J.push(K.children[V])}return Q}function zk($,Z,Q){let X=$.joints,J=new Uint8Array(X.length),K=-1,V=Z.length;for(let z=0;z<X.length;z++){let j=X[z],G=j>=0&&j<Z.length?Z[j]:-1;if(G<0)continue;if(J[z]=1,G<V)V=G,K=z}if(K<0)return null;let Y=Q===null?-1:X.indexOf(Q.index),U=Y>=0?Y:K,q=$.inverseBindMatrices;if(q.length<(U+1)*16)return{joints:J,pivot:U,pivotBind:[0,0,0]};return k0(q,U*16,DK,0),{joints:J,pivot:U,pivotBind:[DK[12],DK[13],DK[14]]}}function jk($,Z,Q){let X=$.joints,J=Math.min(X.length,Iv);for(let K=0;K<Wv;K++){let V=0;for(let Y=0;Y<z3;Y++){let U=K*z3+Y;if(U<J&&X[U]!==0)V+=2**Y}Z[Q+K]=V}Z.set($.pivotBind,Q+12),Z[Q+15]=$.pivot}var WT=new WeakMap,DK=new Float32Array(16);function zp($,Z){let Q=WT.get($);if(Q!==void 0)return Q;let X=Dj(Z)?.head,J=X?qk(X,Z.count):null,K=X&&J?$.skins.map((V)=>zk(V,J,X.parent)):null;if(K?.every((V)=>V===null))K=null;return WT.set($,K),K}var PK=new Float32Array(1024);function t7($,Z){let Q=$.skins[Z];if(Q.worldRows)return Q.rows;let X=Q.jointCount*16;if(PK.length<X)PK=new Float32Array(X);for(let J=0;J<Q.jointCount;J++)f(Q.rootRow,0,Q.rows,J*16,PK,J*16);return PK}var rQ={modelMatrix:new Float32Array(16),bounds:{min:[0,0,0],max:[0,0,0]}},Gk=[rQ];function Bk(a,b,c,d,e,f,g){return $c0C(213).call(this,a,b,c,d,e,f,g)}function Mk($,Z){let Q=$.posedWorldSphere;if(!(Q[3]>=0)||jp($))return!1;for(let X=0;X<3;X++)Z.min[X]=Math.min(Z.min[X],Q[X]-Q[3]),Z.max[X]=Math.max(Z.max[X],Q[X]+Q[3]);return!0}function jp($){if($.rigidPrimitives.length===0)return!1;return le($);}function Gp($,Z){let Q=$.posedWorldSphere;if(!(Q[3]>=0))return!0;return pK(Z,Q,Q[3])!==null}function Bp($,Z,Q,X,J,K){let V=Q,Y=$.hideMode===o3&&$.nearHide<=-1&&$.nearHide>p3;for(let U=0;U<$.skins.length;U++){let q=$.skins[U],z=Qj($,U),j=$.bodySurfaces[U];if(!z||!j||q.pointCollapsed)continue;if(dK(z,j,t7($,U),0,q.jointCount,Z.origin,Z.direction,V,X,J,Y?q.headJoints:null),X)V=Hk(J,K,V)}return V}function Mp(a,b,c,d,e,f){return (Mp=$c0C(214)).call(this,a,b,c,d,e,f)}var IT=new WeakMap;function Tj($){let Z=IT.get($);if(Z)return Z;let Q=$.parsed,X=[],J=Ev(Q);for(let K=0;K<Q.nodes.length;K++){let V=Q.nodes[K].skinIndex;if(Q.nodes[K].meshIndex===null||V===null||!Rv(Q.skins[V]))continue;let Y=_v(Q,J,K),U=Y>=0?Q.nodes[Y].name:"";if(U==="")continue;me($,K,X,U);}return IT.set($,X),X}function Fk($,Z,Q,X){let J=l($);return J9(J,J.boneAt(Z.node),Q,X)>0}function Lk($,Z,Q,X){let J=A7();if(J===null)return-1;let K=l($).nodeWorld(Z.node);rQ.modelMatrix.set(K.subarray(Z.node*16,Z.node*16+16));let V=-1;for(let Y of Z.primitives){if($.materialSlots[Y].hidden)continue;let U=cz($.asset.primitives[Y]);if(!U)continue;rQ.bounds=U.bounds;for(let q of J.raycastInstances(Q,Gk,U.geometry,{maxDistance:V<0?X:V,firstHitOnly:!0}))if(V<0||q.distance<V)V=q.distance}return V}function Hk($,Z,Q){if($.length<=Z)return Q;let X=Z;for(let J=Z+1;J<$.length;J++)if($[J].distance<$[X].distance)X=J;return $[Z]=$[X],$.length=Z+1,$[Z].distance}var Fp=[0,1,0];function S3($,Z){if(Z===void 0||Z.dimension==="3d")return $.world[14];return ne($,Z);}function DT(a,b,c,d){return (DT=$c0C(215)).call(this,a,b,c,d)}function vj($,Z,Q){let v$55;{let Z=$;for(let Q=0,X=iJ.get($);Q<8&&X?.readerVisual;Q++,X=iJ.get(X))Z=X;v$55=Z;}let X=v$55;let J=$$(X);let K=J?.character===null?J.restSphere(PT):K5(X,(X.readerVisual??Z).world,PT);return Q[0]=K.x,Q[1]=K.y,Q[2]=K.z,Q[3]=K.radius,Q}var PT=v0();function Sj($,Z){let Q=$$($);if(Q===null)return Math.max(s0(Z.world,0),0.1);let X=V5($,Q);return Math.max(s0(X.bound,0)/X.ratio,X.looseArm?s0(X.loose,0):0,0.1)}function Wk($,Z){let v$56;{let Z=$;for(let Q=0,X=iJ.get($);Q<8&&X?.readerVisual;Q++,X=iJ.get(X))Z=X;v$56=Z;}let Q=v$56;return Q===$?0:oe(Q,Z)}var C3=!1;function Ik(){let $=C3;return C3=!1,$}function xk($,Z,Q,X){let{scripted:J,body:K}=$;if(J===null||K===null)return!1;let V=K.words.scriptedParts;if(J.fullClaims===V)return!1;let Y=-1;for(let U of J.byPrimitive.keys()){let q=$.materialSlots[U];if(q?.hidden===!0||V?.has(U)===!0)continue;if(q===void 0)return!0;if(Y<0)Y=Oj($,Z,Q,X)?.levelMetres??0;let z=$.asset.primitives[U];if(z.levels[fK(z,Y,K.scale>0?K.scale:1,q.heldLevel)]?.indexCount!==0)return!0}return!1}function Cj($){let Z=$.scripted;if(Z===null||Z.byPrimitive.size===0)return null;return pe(Z,$);}class eQ{constructor($,Z,Q,X,J,K,V){this.body=void 0;this.claims=void 0;this.frameGroup=void 0;this.pass=void 0;this.epoch=void 0;this.uniforms=void 0;this.arm=void 0;this.looks=[];this.lists=null;this.parts=new Map;this.twins=[];this.alpha=[];this.depth=NaN;this.along=NaN;this.pixel=NaN;this.scale=NaN;this.minPixel=0;this.maxPixel=1/0;this.body=$;this.claims=Z;this.frameGroup=Q;this.pass=X;this.epoch=J;this.uniforms=K;this.arm=V}}function Dk($,Z,Q,X,J,K,V){let Y=$.scripted,U=Y?.eye;if(!(U instanceof eQ)||!U.lists||U.alpha.length||Y?.levelView!==U||Y.colourGroup!==Q.frameBindGroup||U.frameGroup!==Q.frameBindGroup||U.pass!==X||U.arm!==vk(Q,$,AQ(Q),!0,!1)||!(U.body===$.body&&!U.body.disposed&&j9($)&&U.body.table.bodyShown(U.body)&&U.claims===U.body.words.scriptedParts&&U.uniforms===$.uniformArena?.buffer&&U.epoch===Tk($,U.body,V)))return null;if(U.twins.length||U.minPixel>0||U.maxPixel<1/0){let q=Oj($,Z,J,Q),z=(q?.levelMetres??0)/(U.body.scale>0?U.body.scale:1);if(z<U.minPixel||z>=U.maxPixel||!Ck(U,$,q,!0))return null}if(!Sk(U,K,Q.viewportShare??null,$,Q,!0))return null;if(U!==Y.frames?.hiddenView)Y.frames?.read?.($);return U.lists}function Pk($,Z,Q){let X=$.scripted,J=X?.eye;if(!(J instanceof eQ)||!X||J.alpha.length||X.held.size||$.bodyRows.morphOwed)return!1;let K=!1;for(let[V,Y]of J.parts){if(!Y.draw)continue;let U=X.byPrimitive.get(V);if(!U||(Y.draw.command.order??0)!==Y.draw.record.shade.renderOrder||U.sig.hasMorph!==($.morphSlotByPrim[V]!==void 0))return!1;if(U.sig.hasMorph)K=!0}if(K&&!J.body.table.morphSettled(J.body))return!1;if(J.twins.length){let V=eK($.asset.parsed);for(let Y of J.twins){let U=J.parts.get(Y);if(!U?.draw||!V)return!1;let q=V[Y];if(!U.hidden){if(Lz(X,U.draw.record,q))continue;return!1}let z=cJ($,Y,q,null,!0);if(!z||z===gQ||z.world!==0)return!1;if(z.slots.length)Q.outlines.add(z)}}for(let V of J.looks)Q.add(V,$,Z);if(Q.assets.set($.asset,$.asset.levelsRevision),K)Q.readsMorph=!0;return!0}function kj($){return _J($)+ET()}var V3=new W6,mK=new WeakMap;function Tk($,Z,Q){return Q+($.scripted?.recordRevision??0)+(q0($)?.bindings??0)+(Z.table.posePage?.generation??0)+$.asset.levelsRevision+Z.table.morphBindingEpoch(Z)}function vk($,Z,Q,X,J){return Number(Q)|Number(Z.mirrored)<<1|Number(Z.drawNearHide<0)<<2|Number(yQ($))<<3|Number(X)<<4|Number($.seeThroughLit===!0)<<5|Number(J)<<6}function Sk($,Z,Q,X,J,K){for(let V of $.looks)if(!Mz(V,Z,Q,X,J,K))return!1;return!0}function Ck($,Z,Q,X){for(let J of $.twins)if((X&&Q!==null&&y3(Z,J,Q))!==$.parts.get(J)?.hidden)return!1;return!0}function Lp(a,b,c,d,e){return (Lp=$c0C(216)).call(this,a,b,c,d,e)}function TT(a,b,c,d,e,f){return (TT=$c0C(217)).call(this,a,b,c,d,e,f)}function yj($,Z){if(nQ(Z.opaque,$[0]),nQ(Z.cutout,$[1]),Z.surface)nQ(Z.surface.surface,$[2]),nQ(Z.surface.surfaceCutout,$[3])}function kk($,Z,Q,X,J,K,V,Y,U,q,z,j,G,B=null,M=0,L){if($.motionFrame=q,z&&B!=="judge")$.lookArriving=!1,$.lookTexturesComing=!1;let{scripted:F,body:H}=$;if(F===null)return!1;let N=L??F,I=N===F?Q:N;if(B!=="judge"&&V!==null)F.colourGroup=Q;if(H===null||!j9($)){if(B==="collect")N.eye=null;return B==="judge"&&N.eye!==null}let W=H.words.scriptedParts,P=Q===q.frameBindGroup?AQ(q):q.viewmodelLightOnce===!0,x=Oj($,Z,J,q),D=x===null||j!==null?0:x.levelMetres,v=M!==0&&$.appeared&&!q.motionVectors&&j===null&&G===null&&(V!==null||B!==null)&&!V?.section&&F.held.size===0,k,S=null;if(v){if(k=mK.get(F),!k)mK.set(F,k=new WeakMap);let I0=vk(q,$,P,z,V===null),Q0=Tk($,H,kj(q.device)),K0=$.uniformArena?.buffer,m=k.get(I);if(m?.body===H&&m.frameGroup===Q&&m.claims===W&&m.pass===X&&m.arm===I0&&m.epoch===Q0&&m.uniforms===K0){let p0=Lp(m,$,x,D,z)&&Sk(m,M,Y,$,q,z);if(p0&&m.lists!==null){if(V!==null&&m!==F.frames?.hiddenView)F.frames?.read?.($);F.levelView=m;let d=m.alpha.length!==0,n=d?DT(Z,J,K,q):0,R0=d?S3(Z,q):0;if(B==="judge")return m!==N.eye||d&&(m.depth!==n||m.along!==R0);if(V){yj(m.lists,V),$.blendBound.radius=NaN;for(let L$ of m.alpha)Ek(L$,n,q.dimension,R0,V.alpha,q.sortGrid??Y3,Rk($,Z))}if(B==="collect")N.eye=m,m.depth=n,m.along=R0;return!1}if(p0)S=m;else{S=new eQ(H,W,Q,X,Q0,K0,I0);for(let[d,n]of m.parts){let R0=$.materialSlots[d];if(!n.draw||R0.hidden||fK($.asset.primitives[d],D,H.scale>0?H.scale:1,R0.heldLevel)!==n.level)continue;if(!Mz(n.draw,M,Y,$,q,z))continue;if(R0.level=n.level,z)R0.heldLevel=n.level;let L$=z&&x!==null&&y3($,d,x);TT(S,$,d,n.draw,n.level,L$)}if(B==="judge"){if(k.set(I,S),F.levelView===m)F.levelView=void 0;return!0}}}if(B!=="judge")S??=new eQ(H,W,Q,X,Q0,K0,I0)}let C=N.eye instanceof W6?N.eye:null;if(B==="judge"&&C===null)return!0;F.levelView=S??void 0;let E=DT(Z,J,K,q),u=q.dimension??"3d",y=S3(Z,q);$.blendBound.radius=NaN;let g=B===null?null:V3;g?.reset(),g?.push(E),g?.push(y),g?.push(V===null?0:1);let w=0,b=!1,h=!0;F.byPrimitive.forEach(function(I0,Q0){let K0=$.materialSlots[Q0];if(K0.hidden)return;let m=S?.parts.get(Q0),p0=$.asset.primitives[Q0];if(!m){if(K0.level=fK(p0,D,H.scale>0?H.scale:1,K0.heldLevel),z)K0.heldLevel=K0.level}let d=m?m.draw:jz($,Q0,Q,X,Y,U,P,q,z,j,M),n=d===null&&p0.levels[K0.level]?.indexCount===0;if(z){if(d===B8||d===hJ)w|=1;if(d===N6)w|=2;if(B!=="judge")I0.waits=d===B8||d===null&&!n}if(S&&!m&&B!=="judge"&&n&&H6(p0))m={draw:null,level:K0.level,hidden:!1},S.parts.set(Q0,m);if(W?.has(Q0)!==!0){if(m?.draw!==null)h=!1;if(d!==null&&typeof d==="object")b=!0;return}let R0=m?.hidden??(z&&x!==null&&y3($,Q0,x)),L$=!R0&&V!==null&&d!==null&&typeof d==="object"?d:null,y9=null;if(L$!==null&&V!==null){if(L$.record.assembled.skinnedModel)F.frames?.read?.($);if(B!=="judge"){Pp(L$,E,G,u,y,V,q.sortGrid??Y3,$,Z);}let a7=K0?.line??null;if(V.ink!==null&&a7!==null&&!($.nearHide>0)&&j===null){y9=zx($,Q0,L$,a7,U,q);if(B!=="judge"&&y9!==null)V.ink.push(y9)}}if(g)g.push(Q0),g.push(S0(L$)),g.push(S0(y9));if(S!==null&&!m&&B!=="judge"){if(!K0||!d||typeof d!=="object"||d.record!==I0.retained.record||d.back||I0.view||d.record.sceneColor||d.record.sceneDepth||!d.transparent&&FX(d.command.pipeline,d.record.shade.renderOrder)||K0.line!==null||d.variant.arm!==void 0&&d.variant.arm!=="surface")h=!1;else TT(S,$,Q0,d,K0.level,R0)}});let U0=b||!Dp(Cj($),W);if(g?.push(w),B==="judge")return U0||C===null||!V3.equals(C);if(z)$.lookArriving=(w&1)!==0,$.lookTexturesComing=(w&2)!==0;if(S!==null&&!U0){if(k?.set(I,S),h){let I0=[[],[],[],[]];S.scale=H.scale>0?H.scale:1,S.pixel=D,S.minPixel=0,S.maxPixel=1/0;for(let K0 of F.byPrimitive.keys()){let m=S.parts.get(K0);if(!m)continue;let p0=$.asset.primitives[K0].levels;for(let n=Math.max(0,m.level);n<p0.length;n++){if(!p0[n].index)continue;let R0=p0[n].error;if(n===m.level)S.minPixel=Math.max(S.minPixel,R0/wk);else S.maxPixel=Math.min(S.maxPixel,R0)}if(m.hidden||!m.draw)continue;let d=m.draw;if(d.transparent)S.alpha.push(d);else I0[(d.surface?2:0)+(d.cutout?1:0)].push(d.command)}S.lists=I0;let Q0=F.frames;if(z&&S.alpha.length===0&&Q0&&Q0.parts.length===Q0.nodes.length&&Q0.parts.length>0&&Q0.parts.every((K0)=>S.parts.get(K0)?.hidden))Q0.hiddenView=S;if(W?.size===F.byPrimitive.size)F.fullClaims=W;S.depth=E,S.along=y}}else k?.delete(I);if(B==="collect"){if(S!==null&&h&&!U0)N.eye=S;else{let I0=C??new W6;I0.copyFrom(V3),N.eye=I0}if(N===F&&F.frames?.hiddenView&&F.frames.hiddenView!==N.eye)F.frames.hiddenView=void 0}return U0}function yk($,Z){let Q=$.asset.primitives,X=$.bones!==null||($.boneSets?.count??0)>0||$.headsetPose!==null||$.springs!==null||$.nativeRelease!==null;for(let K of $.mixer.activeLayerList)if(K.currentWeight>0||K.targetWeight>0)X=!0;let J=!1;k3=!1;for(let K=0;K<Q.length&&K<Z.length;K++){let V=Q[K];if(Z[K]=0,V.skinIndex===null)continue;let Y=CT($,V,V.levels,X),U=CT($,V,V.casterLevels,X);if(Y<0&&U<0)continue;J=!0,Z[K]=Math.max(Y,0)&j3|(Math.max(U,0)&j3)<<8}if(!J)return Aj;return k3?gj:Hp}var Aj=0,Hp=1,gj=2,k3=!1,vT=new WeakMap,ST=new WeakMap,Np=(1<<N9)-1;function CT($,Z,Q,X){if(Q.length===0)return-1;let J=vT.get(Q);if(J===void 0){J=Wp($,Z,Q);vT.set(Q,J);}let K=Ak(J);if(K===null)return k3=!0,X?Np:0;if(K.empty)return K===v6?-1:0;let V;{if((ba=qe(X,K))!==aa)return ba;V=ca}return V}function Ak($){if(!("lists"in ($.held)))return $.held;let v$49;{let $$71=$.held;{let $=$$71;let{lists:Z,levels:Q}=$;if(Q.length<Z.length){let X=Z[Q.length];Q.push(!X||X.length<3||X===$.indices?Ub:Yb($.position,$.joint,$.edges,X,$.owner,$.queue))}v$49=Q.length>=Z.length;}}return v$49?$.held=mP($.held):null}function Wp($,Z,Q){let X=$.asset.parsed,J=X.meshes[Z.meshIndex]?.primitives[Z.primitiveIndex];if(J===void 0)return{lists:[],held:v6};let K=Q===Z.casterLevels?X.casterLods:X.lods,V=Q.map(function(Y,U){let q=K?.[U]?.indices[Z.ordinal];return q?.length===Y.indexCount?q:null});return gk(J,V)}function gk($,Z){let Q=Z.find((V)=>V!==null)??$,X=ST.get(Q),J=S0($);if(X?.primitive===J&&V0(X.lists,Z))return X;let K={primitive:J,lists:Z,held:EP($,Z)};return ST.set(Q,K),K}function*Ok($){let Z=0;for(let Q of $.meshes.flatMap((X)=>X.primitives)){for(let X of[$.lods??[],$.casterLods??[]]){let J=gk(Q,X.map((K)=>K.indices[Z]??null));yield;while(Ak(J)===null)yield}Z++}}var TK={metres:0,step:null,levelMetres:0},kT=new Float64Array(cT),Ip=v0(),xp=new Float32Array(4),wk=1.25;function Oj(a,b,c,d){return (Oj=$c0C(218)).call(this,a,b,c,d)}function fK(a,b,c,d){return (fK=$c0C(219)).call(this,a,b,c,d)}function y3($,Z,Q){let J=eK($.asset.parsed)?.[Z]??-1;if(J<0)return!1;let K=$.materialSlots[Z],V=$.materialSlots[J];if(K===void 0||V===void 0||K.transparent||K.overlay||V.hidden||V.transparent||V.overlay)return E0.slotRefused+=1,!1;let Y=$.scripted?.frames?.read,U=cJ($,Z,J,Q.step,Y!==void 0);if(Y&&U&&U!==gQ&&U.world!==0)Y($),U=cJ($,Z,J,Q.step);if(U===null||U===gQ)return!1;if(!(Q.metres>0))return E0.noEye+=1,!1;if(U.world<Q.metres)return E0.skipped+=1,!0;return E0.drawn+=1,!1}function Dp($,Z){if(($?.size??0)!==(Z?.size??0))return!1;for(let X of $??[])if(Z?.has(X)!==!0)return!1;return!0}function Rk($,Z){let Q=$.blendBound;if(Number.isNaN(Q.radius))if(o7($))n7($,Z.world,Q);else Q.radius=-1;return Q.radius>=0?Q:void 0}function Ek(a,b,c,d,e,f,g){return (Ek=$c0C(220)).call(this,a,b,c,d,e,f,g)}function Pp($,Z,Q,X,J,K,V,Y,U){if($===null||typeof $!=="object")return;if($.record.sceneColor||$.record.sceneDepth){if(K.section)K.section.shareReaders=!0;C3=!0}if(K.section)T8($.command);if(Q){let z=Lv($.record,$.variant);if(z?.pipeline)Q.push({...T8($.twin),pipeline:z.pipeline})}if($.transparent){Ek($,Z,X,J,K.alpha,V,Rk(Y,U));return}MX($.command,$.record.shade.renderOrder);if(FX($.command.pipeline,$.record.shade.renderOrder)&&$.command.depth!==Z)$.command.depth=Z;let q=$.surface?K.surface:null;if($.cutout)(q!==null?q.surfaceCutout:K.cutout).push($.command);else(q!==null?q.surface:K.opaque).push($.command)}function _k($,Z,Q,X){f6(Q,0,Z.position.x-X[0],Z.position.y-X[1],Z.position.z-X[2],Z.rotation.x,Z.rotation.y,Z.rotation.z,Z.rotation.w,Z.scale.x,Z.scale.y,Z.scale.z);let J=$.local;if(J)r7(bP,0,J.position,J.rotation,J.scale),f(Q,0,bP,0,Q,0);HX(fP,$),f(Q,0,fP,0,Q,0)}function A3($,Z,Q,X,J){let K=X?$.renderOrigin:K$;if(X)_k(Z,X,E7,K);else {{let $$98=Z,Z$115=Q,Q$74=E7;{let $=$$98,Z=Z$115,Q=Q$74;if(Z)O9(Q,R3(Z,$.ownerEntityId),$);else Q.set($.world)}}}if(!J||!Fj($,Z,J,E7)){{let Q=E7;I8($,Z);let X=l($);(X.setRootMatrix(Q),OZ($,K$),X);}}return K}function CK($,Z){$.position.x+=Z[0],$.position.y+=Z[1],$.position.z+=Z[2]}var uk=RM,yT=new Float32Array(16),AT=new Float32Array(16),k6=new Float32Array(0),Sp={a:Float32Array.of(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),o:0};function Cp($){if(k6.length<$*16){k6=new Float32Array($*16);for(let Z=0;Z<$;Z++)k6[Z*16]=k6[Z*16+5]=k6[Z*16+10]=k6[Z*16+15]=1}return k6}function wj($,Z){if(Z===null||!((_.get($)?.reads.size??0)>0))return;f6(yT,0,Z.position[0]??0,Z.position[1]??0,Z.position[2]??0,Z.rotation[0]??0,Z.rotation[1]??0,Z.rotation[2]??0,Z.rotation[3]??1,Z.scale[0]??1,Z.scale[1]??1,Z.scale[2]??1);nH:{let Z=yT;let Q=_.get($);if(Q===void 0||Q.reads.size===0)break nH;{if((ba=Bc(Q,Z))!==aa){(ba);break nH;}}}}function g3($,Z,Q){return $.passes.grip.door?.holdTurns?.(Z,Q)??null}var gT={position:{x:0,y:0,z:0},rotation:{x:0,y:0,z:0,w:1},scale:{x:1,y:1,z:1}};function $$($){let{skinBind:Z,skinParent:Q}=$;if(!Z||!Q)return null;return S0(Q.skeleton)===Z.builtForParent?Q:null}var Rj=new Float32Array(16),vK={x:1,y:1,z:1};function mk(a,b,c,d,e){return (mk=$c0C(221)).call(this,a,b,c,d,e)}function yp($,Z,Q,X,J,K){let V=Z.standJoints(Q,X),Y=mk($,Z,V,J,K.size);if(Y)w3(Rj,0,K),CK(K,Z.jointsOrigin());return Z.releaseJoints(),Y}var OT=new WeakMap,fk=new WeakMap;function Ej($,Z){if($.rig===null)return null;let Q=$.rig.getBoneByName(Z);if(!Q?.isJoint)return null;let X=$$($);if(X===null)return{character:$,node:Q.index,held:!0};return se($,Q,X);}function bk($){let Z=fk.get($);return Z===void 0?null:g3($,Z.modelId,Z.ownerEntityId)}function _j($,Z){return bk($)?.[Z]??null}function hk($,Z,Q,X){let J=Z.ownerEntityId;fk.set($,{modelId:Q,ownerEntityId:J});let K=OT.get($.asset);if(!K){let q=l($).jointOrder(),z=Array.from(q,(j)=>$.asset.parsed.nodes[j].name||"");OT.set($.asset,K={jointNames:z,jointNodes:q})}let{jointNames:V,jointNodes:Y}=K;function U(q,z,j,G,B=null){let M=l($).getBoneByName(q);if(!M?.isJoint)return!1;let L=M.index,F=$$($),H=F?X6($.skinBind,L):-1;if(F&&H>=0){if(F.standJoints(G,X),F.rig.nodeTransformInto(H,j),G)CK(j,F.jointsOrigin());return F.releaseJoints(),!0}let N;_K[0]=L;if(G&&z&&!F&&(aC($,X,J)||B!==null&&X!==null&&(E3(X,B)===0||aT(X,B)===-1)))N=$.renderOrigin,_k(Z,z,E7,N),l($).setRootMatrix(E7);else N=A3($,Z,X,z,_K);if(F&&yp($,F,G,X,L,j))return!0;l($).nodeTransformInto(L,j);let I=g3($,Q,J)?.[L];if(I)LK(j.rotation,I);return CK(j,N),!0}return sT(J,Q,{feedback:{jointNames:V,roleJoints:$.passes.row,readJoint:function(q,z){let j;kp:{let Z=Y[z]??0,Q=q;let X=$$($),J=$.skinBind;if(X===null||J===null||X.character===null){j=YQ($,Z,Q);break kp;}let K=X6(J,Z);if(K>=0){j=YQ(X.character,K,Q);break kp;}let V=YQ($,Z,Q);if(V!==null||J.parentNodeByChildNode===null){j=V;break kp;}j=re(X,$,J,Z,Q);}if(j!==null)wj(j.body.character??$,X===null?null:R3(X,J));return j}},answersBone:(q)=>l($).getBoneByName(q)?.isJoint===!0,poseMoves:(q)=>(HC($,Z)||!!$.skinBind||D8($)!==null||zH($,q)),writeBoneTransform:(q,z,j)=>U(q,z,j,!1),writeDrawnBoneTransform:(q,z,j,G)=>U(q,z,j,!0,G),forEachBoneWorldTransform:function(q,z){let j=A3($,Z,X,q);let G=$$($);let B=G?G.standJoints(!1,X):null;let M=g3($,Q,J);let L=l($);for(let F=0;F<Y.length;F++){let H=Y[F],N=G?X6($.skinBind,H):-1;if(G&&B&&N>=0)G.rig.nodeTransformInto(N,S6);else if(G&&B&&mk($,G,B,H,S6.size))w3(Rj,0,S6);else{L.nodeTransformInto(H,S6),CK(S6,j);let I=M?.[H];if(I)LK(S6.rotation,I)}z(V[F],S6)}G?.releaseJoints()}})}var ik=32,pk=new WeakMap,Ap=new Float32Array(4);function ok(a,b){return (ok=$c0C(222)).call(this,a,b)}var lk=new WeakMap;function sk(a){return (sk=$c0C(223)).call(this,a)}function tk($){let Z=sk($).correction;return Z===null?1:ak(Z)}function ak($){return Math.max(U5($[0],$[1],$[2]),U5($[4],$[5],$[6]),U5($[8],$[9],$[10]))}function uj(a,b,c,d,e,f){return (uj=$c0C(224)).call(this,a,b,c,d,e,f)}var dk=new WeakMap;function rk($){let Z=dk.get($);if(Z!==void 0)return Z;let Q=f0($.nodes);let X=X8($);let v$57;wp:{let Z=ck.get($);if(Z!==void 0){v$57=Z;break wp;}let Q=$.nodes,X=new Uint8Array(Q.length),J=!1;for(let K of $.skins)for(let V of K.joints)for(let Y=V;Y>=0&&Y<Q.length&&X[Y]===0;Y=Q[Y].parent){X[Y]=1;let U=Q[Y].scale;if(!(U.x>0&&U.y>0&&U.z>0))J=!0}v$57=(ck.set($,J),J);}let J=v$57;let K=[];let V=0;for(let U=0;U<$.skins.length;U++){let q=$.skins[U],z=new Float32Array(q.joints.length*16);if(v$(q,Q,z),X!==null)for(let j=0;j<q.joints.length;j++)f(X,0,z,j*16,z,j*16);if(J&&U<ik&&tK(z,q.joints.length,0,E6($,U)))V|=1<<U;K.push(z)}let Y=new Float32Array(4);gp:{let Z=K,Q=V>>>0,X=Y,J=0;{let v$86;ue:{let K=!1;for(let V=0;V<$.skins.length;V++){let Y=E6($,V),U=$.skins[V].joints.length;if(V<ik&&(Q&1<<V)!==0?!Op(Y,Z[V],U,P8):!lK(Y,Z[V],0,U,P8))continue;if(!K)c8.x=P8[0],c8.y=P8[1],c8.z=P8[2],c8.radius=P8[3],K=!0;else nk(c8,P8[0],P8[1],P8[2],P8[3])}if(!K){X[J+3]=-1;break ue;}X[J]=c8.x,X[J+1]=c8.y,X[J+2]=c8.z,X[J+3]=c8.radius
v$86=aa;}if((ba=v$86)!==aa){(ba);break gp;}}}dk.set($,Y);return Y}var P8=new Float32Array(4),c8=Object.assign(v0(),{radius:-1});function Op(a,b,c,d){return (Op=$c0C(225)).call(this,a,b,c,d)}var ck=new WeakMap;function Rp($){if($.hordeClips!==void 0)return $.hordeClips;let Z=M4($.parsed);return $.hordeClips=Z,Jy(),Z}var ek=new WeakMap,$y=0;function Yy($,Z,Q,X){let J=ek.get(Z);if(J===void 0)$y+=1,J=$y,ek.set(Z,J);let K=`${$}@${J}`,V=Q===""?K:`${K}:material:${Q}`;return X?`${V}:mirror`:V}function Ep($,Z,Q,X,J,K){return{key:Yy($,Z,X,J),modelId:$,asset:Z,clips:Q,materialSignature:X,mirrored:J,slots:[],animStates:new Map,warnedMissingClips:new Set,warnedStaticClips:new Set,warnedNoSkeletonMap:!1,rowOf:K,movedPixel:1/0}}function _p($,Z,Q=NaN){$.slots.push(Z);let X=fp($,Z);if(i(Q))X.tickedT=Q;let J={mixer:null,layers:X,body:null,nearHide:0,caster:new fj,published:new fj,record:new Float64Array(5).fill(NaN),reach:{clips:[],masks:[],sphere:new Float32Array(4),below:new Float64Array(0),chainScale:new Float64Array(0),a:null,b:null}};return $.animStates.set(Z,J),J}function up($,Z){let Q=$.animStates.get(Z);if(Q!==void 0)b0(Q);$.animStates.delete(Z);let X=$.slots.indexOf(Z);if(X>=0){let J=$.slots.pop();if(J&&X<$.slots.length)$.slots[X]=J}return $.slots.length===0}function mp($){for(let Z of $.animStates.values())b0(Z);$.slots.length=0,$.animStates.clear()}function fp($,Z){let Q=$.asset,X=Q.parsed;return{...sK(X.nodes,X.animations,Z.id,$.modelId,X.skins,X.meshes,Q.baseStandIn,Q.bakeFailure,X.materials,X.clipsAwaited),bodyEntity:Z.ownerEntityId,roleRow:$.rowOf,warnedMissingClips:$.warnedMissingClips,warnedStaticClips:$.warnedStaticClips}}function bp($){for(let[Z,Q]of $.animStates)if(lj($,Q,()=>z5(Q.layers)),j5(Q.layers))Uy($,Z,Q)}function hp($,Z,Q){for(let[X,J]of $.animStates)if(G5(J.layers,Z),Q(X))Uy($,X,J)}function Uy($,Z,Q){{let $=Q;let Z=_.get($);if(Z!==void 0)t1(Z.table,Z)}lj($,Q,()=>ZX(Q.layers,Z.mixer));Q.mixer=Z.mixer;z9(Q)}function lj($,Z,Q){if($.warnedNoSkeletonMap){ve(Z);}if(Q(),Z.layers.warnedNoSkeletonMap)$.warnedNoSkeletonMap=!0}function pp($,Z,Q,X){if(Yq(q6($),X,Z.asset.parsed,X.layers),Q.mixer===X.mixer)return!1;{let $=X;let Z=_.get($);if(Z!==void 0)t1(Z.table,Z)}lj(Z,X,()=>ZX(X.layers,Q.mixer));X.mixer=Q.mixer;z9(X);return !0}function lp($,Z){let Q;{let $$44=Z;{let $=$$44;let Z=_.get($)?.block??null;Q=Z===null?null:{slot:Z.slot/16,previous:Z.previous/16};}}if(Q===null)return null;let X=$.asset.parsed,{starts:J}=Vq(X),K=new Int32Array(X.skins.length*3);for(let V=0;V<X.skins.length;V++)K[V*3]=Q.slot+J[V],K[V*3+1]=Q.previous+J[V],K[V*3+2]=-1;return{skins:K,rigid:dp}}var dp=new Int32Array(0),cp=v0();function np($,Z,Q){let X=qy(l7($.asset,t$,cp),$,Z,t$);return Q[0]=X.x,Q[1]=X.y,Q[2]=X.z,Q[3]=X.radius,Q}var Zy=new Float32Array(4);function qy(a,b,c,d){return (qy=$c0C(226)).call(this,a,b,c,d)}var bj=[];function zy(a,b,c){return (zy=$c0C(227)).call(this,a,b,c)}var k9=new Float32Array(512),mj=new Float32Array(16),hj=new WeakMap;function jy(a,b){return (jy=$c0C(228)).call(this,a,b)}function Gy(a,b,c,d){return (Gy=$c0C(229)).call(this,a,b,c,d)}function sp(a,b,c,d,e,f,g,h){return $c0C(230).call(this,a,b,c,d,e,f,g,h)}var Qy=v0(),zX=new Float64Array(4);function dj($,Z,Q){let X=Z.body?.bound;if(X===void 0)return qy(l7($.asset,Q,Qy),$,Z,Q);return zX[0]=X[0],zX[1]=X[1],zX[2]=X[2],zX[3]=X[3],Xy(Q,zX,Qy)}function tp($,Z,Q){let X=dj($,Z,Q);Z.caster.x=X.x;Z.caster.y=X.y;Z.caster.z=X.z;Z.caster.radius=X.radius;{let $$38=Z,Z$44=X.x,Q$27=X.y,X$16=X.z,J$9=X.radius;{let $=$$38,Z=Z$44,Q=Q$27,X=X$16,J=J$9;let K=_.get($);if(K?.role===Y8)cZ(K,Z,Q,X,J)}}}var q5=[0,0,0];function ap(a,b,c,d,e,f,g){return $c0C(231).call(this,a,b,c,d,e,f,g)};


function fa($,J){r7($,0,J.position,J.rotation,J.scale);
}
function ga($){let Q=this.bake.length,X=new Uint32Array(Q+$.length);return X.set(this.bake),X.set($,Q),this.bake=X,this.tables.set($,Q),Q
}


function ja(j,z,$,Z,Q,X,J,K,V){j=G0.bind=[G0.epoch,0,z,$,Z,Q,X,J,K,V],G0.bound=0,Atomics.store(z,10,G0.epoch),Atomics.notify(z,0),Atomics.notify(z,8);
return j}
function ka(z,q,j,$,Z,Q,X,J,K,V,U){Atomics.store(z,1,G0.epoch);let v$5;DA:{let $=q;let Z,Q;{let v$77;ha:{let Z=$.stint;if($.trial!==0){if(Z[3]<2){v$77=$.trial;break ha;}let X=Z[4]/Z[5]/(Z[1]/Z[2]),J=!(X<1),K=J?X:1/X;{v$77=($.due[J?$.trial:$.held]=$.posed*(K<1/0?K:1),$.held=J?$.held:$.trial,$.trial=0,Z.fill(0),$.held);break ha;}}let Q=xA($);
v$77=(da[0]=Z,da[1]=Q,aa);}if((ba=v$77)!==aa){v$5=ba;break DA;}Z=da[0];Q=da[1]}if(Z[0]>=2&&Q!==$.held)$.trial=Q;v$5=$.trial||$.held;}let G=SA(v$5-1,z,j);A8.threads=G+1,A8.indexes=0;try{FZ($,Z,Q,X,J,K,V,vA)}finally{let B=G;while(B>0&&Atomics.load(z,bV+B-1)===G0.epoch)B--;PA:{let $=q,Z=e4()-U,Q=A8.indexes,X=!G0.fresh&&B===0;$.posed+=Q;let J=$.trial===0?0:3;if(!X)break PA;let K=$.stint;K[J]++,K[J+1]+=Z,K[J+2]+=Q}if(Atomics.exchange(z,7,0)!==0)JG()}
}

function na($,Z,Q){if($.clipTurned.length!==Z.bones.length)$.clipTurned=new Uint8Array(Z.bones.length),$.clipTurnedNodes.length=0;let X=$.clipTurned;let v$6;{let Z$11=Q;{let Z=Z$11;let Q=$.clipTurnRead,X=$.clipTurnReadOn===$.clipTurned&&$.clipTurnReadOwn===$.ownClips&&Q.length===Z.length*lA,J=0;for(let K of Z){for(let V of[K.clip,K.clip.channels,K.clip.name,K.clipKey,K.maskNodes,K.currentWeight>0]){let v$69;{let $$100=Q,Z$116=J++,Q$76=V;{let $=$$100,Z=Z$116,Q=Q$76;let X=$[Z]===Q;v$69=($[Z]=Q,X);}}X=v$69&&X;}}v$6=(Q.length=J,$.clipTurnReadOwn=$.ownClips,$.clipTurnReadOn=$.clipTurned,X);}}if(!v$6){for(let J of $.clipTurnedNodes)X[J]=0;$.clipTurnedNodes.length=0;for(let J of Q){iA:{let Z$117=J;{let Z=Z$117;let Q;nA:{let $$10=Z,Z$12=$.ownClips;{let $=$$10,Z=Z$12;if(!($.currentWeight>0)){Q=0;break nA;}if(AG($.clipKey)){Q=iV;break nA;}if(cV($.clipKey)||cV($.clip.name)){Q=0;break nA;}Q=Z&&!yG($.clip.name)?oV|sV:oV;}}if(Q===0)break iA;let X=$.clipTurned;for(let J of Z.clip.channels){let K=J.targetNode;if(J.path!=="rotation"||K<0||K>=X.length||(X[K]&Q)===Q||Z.maskNodes!==null&&!Z.maskNodes.has(K))continue;if(X[K]===0)$.clipTurnedNodes.push(K);X[K]|=Q}}}}}for(let J of $.hands){let K=J.items.length>0?J:E2($,J),V=K!==null&&K.own!==""?iV|oV|sV:iV|sV,Y=!1;for(let q of J.fingers){let z=q.posedByRow||pA(q.joints,X,V);if(z!==q.posed)Y=!0;q.posed=z}if(Y)J.solvedItems.length=0;let U=J.chain;J.armPosed=J.armPosedByRow||U!==null&&((X[U.root.index]|X[U.mid.index]|X[U.end.index])&V)!==0}
}




function sa(Z,K,Q,X,$,J,V){let Y=Z.support,U=Z.items[0],q=K(Z.bone.index),z=q?.object??"",j=q!==null&&z!==""&&!q.rotation&&Q!==null&&Q.heldIds[0]===U&&Z.chain!==null&&!Z.armPosed&&!Z.fingers.some((B)=>B.posed);if(!j||Y.item!==U||Y.reachObject!==z)Y.byReach="";if(Y.active=Y.byReach==="taking"||Y.byReach==="taken",j&&Y.byReach===""&&q.walking)return;if(Y.active&&Q!==null&&J9(X,Z.bone,l0,z$)>0)aG(Y,Q,X);if(!cG($,Z,X,J,Y.active?Q:null,q,V)||!j)return;if(Y.byReach==="taking"){Y.byReach=Z.holding?"taken":"refused",Y.active=Z.holding;return}if(Y.byReach!=="")return;let v$12;Lg:{let $$13=Z,Z$15=Q,Q$10=X,X$6=J;{let $=$$13,Z=Z$15,Q=Q$10,X=X$6;if(!X.ready()||!sG(Z,!1,Q,X,Q8,w8)){v$12=!1;break Lg;}let J=J9(Q,$.bone,l0,z$);if(J<=0){v$12=!1;break Lg;}let K=uG*$.span*J,V=$.gap*J;D$(z$,$.normal,r6),xG[0]=$.items[0];let Y=-1;for(let q=0;q<$.takes.length&&Y<0;q+=3){IZ(DG,$.takes,q,J);for(let z=0;z<3;z++)y2[z]=l0[z]+DG[z]-r6[z]*K;Y=X.cast(xG,y2,r6,K+V)}if(Y<0){v$12=!1;break Lg;}IZ(d9,$.probes,3,J);let U=$.support;for(let q=0;q<3;q++)Q9[q]=y2[q]+r6[q]*(Y-V)-d9[q];v$12=(U.move=p$(Q9,l0),g8(Q9,Q8,Q9),tG(U,Z,Q));}}if(!v$12)return;Y.item=U,Y.reachObject=z,Y.byReach="taking",Y.active=!0,Z.solvedItems.length=0
return aa}




function xa(J,X){return J.copy(p2(X)).applyQuaternion(u2).normalize()
}
function ya($){this.u32=new Uint32Array(Math.max($,this.u32.length*2)),this.f32=new Float32Array(this.u32.buffer);
}
function za(Z,$){throw Error(`pass words sized ${this.u32.length}, asked ${Z+$}`);
}
function Aa(Z,Q,X,J,K,V,U,q){let j=new kZ;j.at=this.prev,Z={kind:Q,bone:X,chain:J,share:K,face:V,target:[0,0,0],ride:null,rideBody:!1,rideAt:[0,0,0],rideTurn:null,ridePole:null,pole:null,rotation:null,rideTurnAt:[0,0,0,1],ridePoleAt:[0,0,0],poleAt:[0,0,0],rotationAt:[0,0,0,1],object:null,walk:j,blendIn:NaN,blendOut:NaN,maxYaw:U,maxPitch:q,seen:!1,superseded:!1,cross:null,slot:this.takeEffectorSlot(),serial:++this.serials},this.effectors.push(Z),this.boundSerial+=1
return Z}

function Ca($,Q,X,Z){if(!this.heldFrame($,Q))return!1;let J=U9;t2(X,J[3],J[4],J[5],J[6],Z.x,Z.y,Z.z);return c2(X,J[0]+X[0],J[1]+X[1],J[2]+X[2])
}
function Da(J,Z,$,K){if(J==="head"){if(Z.head)this.seeReach($,"aim",Z.head,null,K,Z.neck,Z.headFace,K.maxYaw??mg,K.maxPitch??fg);{return ma}}let V=QO(Z,J);if(V)this.seeReach($,"reach",V.end,V,K)
}
function Ea(X){if(X.chain&&!X.superseded)this.released.push(X);this.aimWeight(X,null,!1)
}
function Fa(Q,X){this.effectors.splice(Q,1),this.boundSerial+=1,this.freeingEffectors.push(X.slot)
}

function Ha($){let Z=this.released[$],Q=this.footFor(Z.bone);if(!Q||Q.walk.goal<=0||!Z.chain){return ma}Q.handed+=1,Q.handedBy=Z.slot,Q.walk.w0=Q.walk.goal,Q.walk.at=this.prev
}
function Ia(){return({slot:this.nextLeafPole++,serial:1000+ ++this.serials})}


function Na($){return(Math.max(r9($.leftArm),r9($.rightArm)))}

function Pa(Q,X,Z){let J=Q.groups;for(let K=0;K<J.length;K++){let V=J[K];AM(X,V.nodes,V.world,V.offsetX+Z[0],V.offsetY+Z[1],V.offsetZ+Z[2]);fO:{let $$21=X,Z$26=V,Q$19=Z;{let $=$$21,Z=Z$26,Q=Q$19;let X=Z.followers;if(!X)break fO;let J=Z.piecesElapsed,K=Z.offsetY+(Z.phase==="pieces"||Z.phase==="clear"?0.8*J-4.905*J*J:0);AM($,X.nodes,X.world,Z.offsetX+Q[0],K+Q[1],Z.offsetZ+Q[2])}}}Q.appliedStamp=X.worldStamp
}
function Qa(Z,$){for(let Q of Z.groups){for(let X of Q.materials){let J=$.materialSlots[X.index];X.hidden=J.hidden;J.hidden=X.hidden||Q.phase==="clear"||iO(Q,X.index)}}
}
function Ra($,Z,Q,K,J,X){for(let V of $.groups){if(V.phase!=="pieces"&&V.phase!=="clear")continue;let Y=fM(V,Z,Q);if(!Y)continue;for(let U=0;U<K;U++){let q=J+U*16,z=Y.rotation,j=(Y.min[0]+Y.max[0])*0.5+V.offsetX,G=(Y.min[1]+Y.max[1])*0.5+V.offsetY,B=(Y.min[2]+Y.max[2])*0.5+V.offsetZ;for(let M=0;M<4;M++){let L=q+M*4,F=X[L]-(M===3?j:0),H=X[L+1]-(M===3?G:0),N=X[L+2]-(M===3?B:0);X[L]=z[0]*F+z[3]*H+z[6]*N+(M===3?j+Y.offset[0]:0),X[L+1]=z[1]*F+z[4]*H+z[7]*N+(M===3?G+Y.offset[1]:0),X[L+2]=z[2]*F+z[5]*H+z[8]*N+(M===3?B+Y.offset[2]:0)}}return}
return aa}
function Sa($,Z){for(let Q of $.groups){if(Q.phase==="clear")continue;for(let X of Q.phase==="pieces"?Q.pieces:[null]){if(X?.clear)continue;let J=X?.min??Q.min,K=X?.max??Q.max,V=X?.offset??[0,0,0],Y=(J[0]+K[0])*0.5+Q.offsetX+V[0],U=(J[1]+K[1])*0.5+Q.offsetY+V[1],q=(J[2]+K[2])*0.5+Q.offsetZ+V[2],z=c(K[0]-J[0],K[1]-J[1],K[2]-J[2])*0.5,j=c(Y-Z.x,U-Z.y,q-Z.z);if(j+z>Z.radius)Z.radius=j+z}}
}


function Va(Z,Q,X){Z.guard=pZ(Z.guard,Z.guarded,Q,Q+X.length),Z.guarded+=2
}

function Xa(Z,$,Q){if(Z.at>=0)B$($,Z.at,Z.cap);Z.cap=Math.max(16,Q*2),Z.at=G$($,Z.cap)
}

function Za($){$.roomRun=0,$.posePressure=Math.min(Iw,$.posePressure*1.25);
}
function _a($){$.roomRun=0,$.posePressure=Math.max(1,$.posePressure/1.25)
}
function $a(Z){for(let Q=0;Q<YZ;Q++){let X=Z.wearer??Z.seenWith;if(X===null)break;Z=X}
return Z}

function bc(Z){x1=new Float32Array(Math.max(Z,x1.length*2,256));
}

function dc(X){X.edgeT=X.collapseEdgeT,z7(X.table.heapT,X,!0);
}
function ec(X){X.edgeC=X.collapseEdgeC+X.lagMs,z7(X.table.heapC,X,!1);
}
function fc(X,Q,Z){let J=X.collapseUnder;if(J!==null&&J.length===Q){let K=!0;for(let V=0;V<Q&&K;V++)K=J[V]===Z[V];if(K)return}X.collapseUnder=J!==null&&J.length===Q?J:new Int32Array(Q),X.collapseUnder.set(Z.subarray(0,Q))
return aa}
function gc($){$.blendStale=!0,$.table.blendStale.push($)
}
function hc($,Z,Q){$.bake.page.ranges.free(Z.blend,Q.length);
}




function mc(K,Z,Q,X,V,$){if(K[0]=Z,K[1]=Q,K[2]=X,K[3]=V,$.row<0)return;$.table.mirrorF32.set(K,$.row+R.bound),M0($.table,$.row+R.bound,$.row+R.bound+4)
return aa}
function nc($,Z){let X=-1;for(let J of $){let K=Z.nodes[J]?.parent??-1;if(K<0||!$.has(K)){X=J;break}}return NF.set($,X),X
}
function oc($,G){$.epochC=Math.floor(G.atMs*0.001)*1000;
}




function tc(K,$,V,J){let z=K+8*WH,j=G$($,z);if(V?.table===$)B$($,V.at,V.room);if(V?.table!==$)V={table:$,at:j,room:z,ground:new Float64Array(ew),movesUntil:-1/0,bodies:new Set,over:J,named:-1};else V.at=j,V.room=z;for(let G of V.bodies)$J($,G);if(V.named>=0)e1($,V.named,j);
return V}
function uc(X,Z,I,z){let P=X[s.relate+tX.rows],x=nF(X);for(let D=0;D<P;D++){let v=x+D*S8.words,k=X[v+S8.tick];Z[I+S8.tick]=k>-o8?k-z:-o8,d0(Z,I+S8.local,X,v+S8.local,3),I+=S8.words}
return I}
function vc($,J,X){let K=s.fade,V=$[K+C$.start]+$[K+C$.ticks];J=Math.max(J,($[s.flags]&b5)!==0?V:V+X)
return J}
function wc(X,Z){if(X.place?.bodies.delete(X),X.place=Z,Z!==null)Z.bodies.add(X);
}
function xc(Z,K){Z[2]=(1-K.arrivalFrom)/K.arrivalRate,q9(Z,!1);
}
function yc(Z,K){Z[2]=(K.currentWeight-n9)/Z[3],q9(Z,!1)
}
function zc(K,Z){if(K.speed>0)Z[2]=((K.loop==="pingpong"?2:1)*K.clipSpan-K.time)/K.speed;else Z[2]=K.time/-K.speed;
}
function Ac($){let Q=tU($.device,$.pipelines,!H7($.pipelines));return $.kernel=Q,Q
}
function Bc(Q,Z){if(k0(Q.root,0,hZ,0),!ZJ(Q))f(hZ,0,Z,0,hZ,0);let v$26;UR:{let $$43=Q.readFrameWords,Z$51=hZ;{let $=$$43,Z=Z$51;for(let Q=0;Q<16;Q++)if(Math.abs($[Q]-Z[Q])>0.000001*(1+Math.abs(Z[Q]))){v$26=!1;break UR;}v$26=!0;}}if(v$26)return;Q.readFrameWords.set(hZ);for(let X of Q.reads)if(X.block>=0)U$(Q.table,X.block+u9.frame,Q.readFrameWords)
return aa}












function Pc($){return((_Z($.pipelines)?.handle.pipeline??null)===null)}
function Qc($){let X=$.device,J={scratch:v1(X,"lume pose proof scratch",$.scratch.words*4),page:v1(X,"lume pose proof palettes",$.page.words*4),reads:v1(X,"lume pose proof reads",rZ(X).buffer.size)};return k1(X,J.scratch,$.scratch),k1(X,J.page,$.page),J
}





function Wc(Z,J,K,X){Z.rigid[J[K]*2]=(X.slot+K*C8)/16,Z.rigid[J[K]*2+1]=(X.previous+K*C8)/16;
}
function Xc(q,Y,z,j){return{entity:q.mixer.bodyEntity,row:q.row,gpu:[...Y.subarray(z*P0,(z+1)*P0)],palettes:j}
}




function ad(Z,$){j8.swept+=1;for(let Q of Z.lanes)if(Q!==$.lane&&!F9.get(Q)?.states.size&&Q.leaving.size===0)Z.lanes.delete(Q);for(let Q of Z.leaving){if(Q.users>0){Z.leaving.delete(Q);continue}if(Q.queued||sE(Z,Q))continue;if(Q.held&&Q.slice!==null)q8(Z.device).release(Q.slice);if(Q.slice=null,Q.held=!1,Q.sources=new Map,Z.cut!==null&&Z.cut.groups!==1)Q.starts=null,Q.counts=null;Z.leaving.delete(Q),kq(Z)}if(Z.members===0&&Z.holders.size===0&&Z.leaving.size===0&&!Z.levels.some((Q)=>Q.queued)){if($.prims.delete(Z),B6.get(Z.prim)===Z)B6.delete(Z.prim)}if(Z.leaving.size===0)$.sweep.delete(Z)
}
function bd(J,$,Z,Q){let K=J.copiesOwed;for(let V=K.length-1;V>=0;V--){let Y=K[V].bake;if(Y===void 0)continue;if(Y.state==="owed")$.builds.push(pN(Z,J.asset,Y)),Y.state="baking";if(Y.state==="baking"||Y.state==="ready"&&PQ(J.lane.library,K[V].group.script))continue;let U=K[V];if(Y.state==="ready"&&xq(J,[U])){if(K.splice(V,1),J.members.push(U),J.unseen===!0)J.lane.setHide(U.laneId,-1);$.stirred.add(J);continue}if(J.joinRefused=!0,$.owing.delete(J),!J.asset.disposed)Q.add(J);break}if(K.length===0)$.owing.delete(J)
}

function dd($,Z){$.letGo=$.letGo.filter((J)=>!fN(Z,J,(K)=>vQ().scriptedExternalGeometryHeld(Z,K)))
}


function gd($,Z,Q,X,q,U,z,j,K,G,J){let v$32;M_:{let J$14=q,K$8=U,V$6=z,Y$2=j,U$2=K!==void 0;{let J=J$14,K=K$8,V=V$6,Y=Y$2,U=U$2;let{slots:q,wholeCovers:z}=EI(Q,X,J,K,V);if(q.length===0){v$32=null;break M_;}let j=new Set,G=new Map;for(let B of q){if(j.has(B.claimId))continue;let M=$.acquire(Z,B.pending.script,B.pending.overrides,B.layout,B.surface,null,B.viewId,"own-paint",!1,Qz(X,B.pending.partKey));if(M){G.set(B,M);continue}if(U&&gJ(Z,B.pending.script)){for(let L of G.values())L.release();{v$32=uI;break M_;}}_I(B.claimId,G,j)}v$32=mI(Z,Q,K,V,Y,q,G,j,z);}}let M=v$32;if(M===uI){if(G!==null)G.shapeFollow=Q.shapeFollow;if(K!==void 0)cW($,Z,Q,X,q,U,z,j,J,K);return}if(Uz(Q,M),G)bI(G,M);dq(Q,X,J)
return aa}
function hd(Z,$){for(let Q of Z.ids)Z.lane.syncMedium(Q,null);wJ.delete($)
}
function jd(Q){for(let z=0;z<Q.length;z+=1)this.pushRow(Q[z],Q[z].length);
}
function kd(V){this.pushRow(V.view,V.view.length),this.pushRow(V.projection,V.projection.length);
}
function ld(z,j){let G=z[j];this.push(G.x),this.push(G.y),this.push(G.z),this.push(G.radius)
}
function md(j,Y,U,q,z,G,X){let B=Math.floor(j/nJ)-S7,M=j%nJ-S7;if(B>=Y&&B<=U&&M>=q&&M<=z)for(let L of G)X(L)
}

function od($,Q,V,X){for(let z=$.nodes[Q].parent;z>=0;z=$.nodes[z].parent){let j=V(z),G=j?_z(X,j):null;if(G)return{tail:G,from:z}}return{tail:null,from:-1}
}
function pd(Z,X,J){let K=GK(Z,X,cm);if(K==="dress")return"dress";return J==="params"||K==="params"?"params":"same"
}
function qd(Z,Q,K,Y,V){let v$47;{let $$68=K,Z$87=V;{let $=$$68,Z=Z$87;let Q=new Uint32Array(Z+1);for(let K=0;K<$.length-$.length%3;K++)Q[$[K]+1]+=2;for(let K=0;K<Z;K++)Q[K+1]+=Q[K];let X=Q.slice(0,Z),J=new Uint32Array(Q[Z]);for(let K=0;K+2<$.length;K+=3){let V=$[K],Y=$[K+1],U=$[K+2];J[X[V]++]=Y,J[X[V]++]=U,J[X[Y]++]=V,J[X[Y]++]=U,J[X[U]++]=V,J[X[U]++]=Y}v$47={start:Q,list:J};}}return{lists:Z,position:Q,indices:K,joint:Y,edges:v$47,owner:new Int32Array(V),queue:new Uint32Array(V),levels:[]}
}
function rd(Q,Z){return function(){if(Q===0)yv(Z);else for(let X=0;X<Z.skins.length;X++)b7(Z,X);hP.set(Z,Q+1)}
}




function wd($,V){return(Fv($.mountCtx,V,function(){$.mountAppearanceDirty=!0}))}
function xd(Q,$,Z){let X=T$,J=Q*w6;for(let K=0;K<4;K++)$.data[X.baseColor+K]=Z.values[J+A6.baseColorFactor+K];$.data[X.metallic]=Z.values[J+A6.metallicFactor],$.data[X.roughness]=Z.values[J+A6.roughnessFactor]
}


function Bd($){let Z=$.memo.skinSpheres,Q=0;if(Z.length===$.skins.length*4)for(let X=0;X<$.skins.length;X++){let J=$.skins[X],K=$.jointBoxes[X];if(Z[X*4+3]=-1,!K||J.pointCollapsed||!lK(K,J.data,N8,J.jointCount,nP))continue;h7(J.rootRow,nP,0,Z,X*4),Q+=1}$.memo.skinSpheresLive=Q>0
}
function Cd($){$.memo.skinSpheresLive=!1,$.posedWorldSphere.set(m7);
}
function Dd(Q){Q.x=m7[0],Q.y=m7[1],Q.z=m7[2],Q.radius=m7[3];
}
function Ed($,Z){let Q=db,X=YX($,Z,zj,0,Q),J=$.posedWorldSphere,K=Math.fround(X?Q.x:0),V=Math.fround(X?Q.y:0),Y=Math.fround(X?Q.z:0),U=Math.fround(X?Q.radius:-1);if(J[0]===K&&J[1]===V&&J[2]===Y&&J[3]===U)return;$.memo.skinSpheresLive=!1,J[0]=K,J[1]=V,J[2]=Y,J[3]=U,$.pickEar?.()
return aa}
function Fd($,X,J,K,Z){aQ($,X,J);V1$$:{let $$25=$.nativeRelease,Z$29=J;{let $=$$25,Z=Z$29;if($===null)break V1$$;Sa($,Z);}}UK(K,Z,J,X.restSphere(F3));return null;
}
function Gd($,X,Q,Z){let J=$.meshes[X.meshIndex];if(!J)return;for(let K of J.primitives){let v$52;{let $=K.position,Z=nb;Z[0]=Z[1]=Z[2]=1/0,Z[3]=Z[4]=Z[5]=-1/0;for(let Q=0;Q+2<$.length;Q+=3)for(let X=0;X<3;X+=1){if($[Q+X]<Z[X])Z[X]=$[Q+X];if($[Q+X]>Z[X+3])Z[X+3]=$[Q+X]}v$52=Z;}let V=bv(v$52,0,0,0,0);if(V>Q[Z])Q[Z]=V}
return aa}
function Hd($,Z){for(let K of Sx($.asset.parsed))Z.push(K);
}
function Id($,Z){for(let K of YK($.springs))Z.push(K)
}






function Pd(V,$,K){V.standJoints(!1,null);for(let z=0;z<$.skins.length;z++)N1($,K,V,z,$.skins[z].rows),$.skins[z].worldRows=!0;V.releaseJoints();
}
function Qd(Z,Q){return Z<4&&Q.character!==null&&o7(Q.character,Z+1);
}
function Rd(X,Z,$,Q){X.setRootMatrix(Z.world);uM($,$.releaseRowsFirst?0:uK($),$.groundSampler);$.releaseRowsFirst=!1;let J=$.asset.parsed.skins;for(let K of Q.groups){for(let V of K.pieceBySkin.keys()){let Y=J[V],U=Y.joints.length,q=I3($,V,(U+1)*16);wC(q.rows);for(let j=0;j<U;j++)if(Y.joints[j]>=0&&Y.joints[j]<X.nodes.length)X.ensureNodeWorld(Y.joints[j]);v$(Y,X.nodeWorld(0),q.rows.subarray(16)),X1(Q,null,V,q.rows,16,U),x3($,V,-1,q);let z=tK(q.rows,U,16,$.jointBoxes[V]??null);if($.skins[V].pointCollapsed!==z)$.skins[V].pointCollapsed=z,$.leftOutOwed=!0}for(let V of K.pieceByNode.keys())for(let Y=0;Y<$.rigidPrimitives.length;Y++){if($.asset.primitives[$.rigidPrimitives[Y]].nodeIndex!==V)continue;let U=I3($,-1-Y,16),q=X.nodeWorld(V);for(let G=0;G<16;G++)U.rows[G]=q[V*16+G];X1(Q,V,null,U.rows,0,1),x3($,-1,Y,U);let z=$.materialSlots[$.rigidPrimitives[Y]],j=wv(U.rows,0);if(z.pointCollapsed!==j)z.pointCollapsed=j,$.leftOutOwed=!0}}if($.leftOutOwed)s7($)
}
function Sd(X){Z3=new Int32Array(X),JT=new Uint8Array(X);
}
function Td(K,X,Q,J){K.fill(_C,0,X);for(let G=0;G<X;G++)uC(Q,J,K,G,X)
}
function Ud(B,L,j,M){if(B.pointCollapsed!==L)j=!0;B.rowsCollapsed=M,B.pointCollapsed=L
return j}
function Vd($,G,V,z,Y,X,K,j){let B=$.rigidPrimitives[G],M=$.asset.primitives[B].nodeIndex,L=$.materialSlots[B];if(!V&&J1(z,M,null,!0)){return ca=j,ma}let F=V||Y&&M>=0&&M<X&&K[M]>=0;if(L.pointCollapsed===F){return ca=j,ma}L.pointCollapsed=F,j=!0
ca=j}




function _d(Z,$){Z.land($,W0.visible?W0.drawNearHide:NaN);
}
function $d(X,K,Z,Q){let q=X?.character??null;if(q!==null&&X!==null&&q0(q)?.table===K){let v$72;pD:{let $$105=Z,Z$120=K;{let $=$$105,Z=Z$120;let Q=$.skinBind?.parentNodeByChildNode??null,X=$.skinBind?.remaps.some((K)=>K.hangs)??!1;if(($.springs?.table??null)===null||Q===null||!X){v$72=!1;break pD;}v$72=XN(Z,t0,!0);}}if(v$72){l(Z).setRootMatrix(Q.world);j6(K,Z);tL:{let $$37=Z,Z$43=q;{let $=$$37,Z=Z$43;let Q=_.get($);if(Q===void 0)break tL;let X=Z===null?null:_.get(Z)??null;if(Q.seenWith!==X){let V=Q.seenWith;V?.seenBy.delete(Q),X?.seenBy.add(Q),Q.seenWith=X,c0(V),c0(X)}if(Q.row<0)break tL;let J=Q.row+R.seenWith;let K=sL(Q);if(Q.table.mirror[J]!==K)o0(Q.table,J,K)}}return}let z;hD:{let $$57=Z;{let $=$$57;let Z=$.skinBind,Q=Z?.parentNodeByChildNode??null;if(Z===null||Q===null||!Z.remaps.some((J)=>J.hangs)){z=null;break hD;}if(H1($)&&$.bones===null&&($.boneSets?.count??0)===0){z=null;break hD;}let X=JK.get(Q);if(X===void 0)JK.set(Q,X=mz($.asset.parsed.nodes,Q,Z.hangByChildNode,Z.noBoneRest,$.rig?.bindCorrection??null));z=X;}}if(z){l(Z).setRootMatrix(Q.world),j6(K,Z,null,{wearer:q,hang:z});return}if(SL(K,Z,q,X.skeleton)&&H1(Z)&&!Z.rigMinted)LS(Z);return}if(q===null&&X!==null){l(Z).setRootMatrix(Q.world);j6(K,Z);Ih(Z,X);return}
return aa}

function be(Y,Q,K,Z,U,V){let q=Oh;for(let z=0;z<3;z++)q.position[z]=Y[z],q.scale[z]=Y[7+z];for(let z=0;z<4;z++)q.rotation[z]=Y[3+z];O9(zT,q,Q);j6(K,Z,{wearer:U.character,joint:U.node,offset:zT,hold:U.held?_j(U.character,U.node):null});fh:{let $$91=Z,Z$107=Q;{let $=$$91,Z=Z$107;let Q=D8($),X=Q?.wearer?.character??null,J=X?.readerVisual?.world??null;if(Q===null||X===null||J===null)break fh;if(X.readerFrame===n$(X)){Pj($,Q,Z);break fh;}let{mountLocal:K,mountRoot:V}=$.kept;if(K===null||V===null){Zk($,J,Z.world);break fh;}if(M6(V,J))break fh;f(J,0,K,0,Z.world,0),V.set(J)}}if(V)N3(Z,Q.world);
}
function ce($,Z,Q){let X=$.posedSphere,J=m7;if(X[3]>=0)J.set(X);else J.set($.asset.bounds.center),J[3]=Math.max(0,$.asset.bounds.radius);h7(Z.localWords,J,0,J,0);let K=c(J[0],J[1],J[2])+J[3];return J.set(Q.posedWorldSphere),J[3]+=K,!0
}
function de($,Z){for(let Q of $.materialSlots){if(Q.lightEpoch===Z)continue;if(Q.lightEpoch=Z,iv(Q.material.source)!==null)$.mountAppearanceDirty=!0}
}
function ee($){if(!$.replayRow)return;$.replayRow=!1,e0($),z9($);return
}
function fe($,K,Z,J){let V=$.ragdoll;$.ragdoll=K!==null?ch:null,Z.ragdollPose=K,Vk($,Z,!0),Z.ragdollPose=J,$.ragdoll=V,$.setsOwed=!0
}





function le($){return $.ragdoll!==null||$.nativeRelease!==null||($.readerVisual?.ragdollPose??null)!==null
}
function me($,K,X,U){let q=[];for(let z=0;z<$.primitives.length;z++)if($.primitives[z].nodeIndex===K)q.push(z);X.push({node:K,bone:U,primitives:q})
}
function ne($,Z){return RT($.world[12],$.world[14],wT(Z.dimension,Z.camera.view,Fp))
}
function oe(Q,Z){return((Q.asset.installedLevels?.[0]?.error??0)*Sj(Q,Q.readerVisual??Z))}
function pe(Z,$){let Q=new Set;return Z.byPrimitive.forEach(function(X,J){if(lJ($,J)||(X.drew||Z.held.has(J))&&X.waits!==!0)Q.add(J)}),Q
}
function qe(X,K){if(!X)return 0;let V=0,Y=Math.min(K.levels.length,N9);for(let U=0;U<Y;U++)if(K.levels[xv(K.levels.length,U)].vertices.length>0)V|=1<<U;
return ca=V,aa}
function re(X,$,J,Z,Q){let Y=X.rig.nodes.length;if(!mZ(S$($),$.asset.parsed.nodes,J.parentNodeByChildNode,J.hangByChildNode,J.noBoneRest,Z,Cp(Y),Sp,null,AT,0,J.unit))return null;let U=W1(J,Z);let q=U>=0?X6(J,U):-1;return YQ(X.character,q,Q,AT)
}
function se($,Q,X){let J=X6($.skinBind,Q.index);return J>=0&&X.character!==null?{character:X.character,node:J,held:!1}:null
}
function te(Q,$){let X={corners:Q,correction:X8($)};return lk.set($,X),X
}

function ve(Z){Z.layers.warnedNoSkeletonMap=!0;
}
function aa(){}var ba;function ma(){}var ca;function da(){}

;function $lpd0(o,k,v){Object.defineProperty(o,k,{value:v,writable:!0,enumerable:!0,configurable:!0})}import{R as $Lr}from"./52e971dc2a986655.mjs";import"./2ab06278-a2898865a05320d8.mjs";import"./28eaa8f9-50fa1514558f9aa0.mjs";import"./9ea24b35-1e1b57998df92b8d.mjs";import"./6b955a52-ea78f70fb95b96b1.mjs";import{BW6 as uv}from"./956b72aa3a68d79e.mjs";import{umO as n3}from"./b28c6f6a953450f5.mjs";import{FGW as Xv,Fwk as Qv,GAe as kI,MoA as E6,N9h as eT,QDp as yI,VVS as CI,X4K as Zv,bcQ as bq,bto as $X,cu9 as p7,ecm as gI,g23 as nk,kOV as b7,kei as OI,o4C as lK,o5m as dK,r9Z as AI,w3h as W8,yWk as h7,z4Q as $v,ztU as Ky}from"./10e5b222-e1464c216d94aa2c.mjs";import{BOe as iF,BZq as W6,Bl3 as l7,H8x as tv,JDm as rv,Kte as cv,MRF as nv,VSl as ov,_II as pv,cyX as sv,e5W as dv,gCO as av,h9E as QX,n0a as ev,oel as lv,osh as TU,q_g as iv,sRv as h1,uxP as S0,wpf as zJ,xkr as eK,zLc as i3}from"./f0362e1f-eff9ade7dd8da291.mjs";import{DKe as a9,EOl as W5,OdT as VL,W57 as Z$,oKo as pV,wlv as KL,xAK as I5}from"./1845d8bbf74647c4.mjs";import{X0k as w2}from"./056898f033f268f7.mjs";import{KR2 as ZP}from"./1fef30ca331af59b.mjs";import{JPv as _v,JpE as Rv,WgY as Ev}from"./f82d1baf495fa89d.mjs";import{Dhp as HD,Eau as bz}from"./6c07f16090fdcfce.mjs";import{Dlz as ZW,OAX as $W}from"./6a0d40afa11486f2.mjs";import{F70 as Av,GX0 as QL,MTV as ZX,MWB as eZ,MWg as My,NjJ as kv,OzO as c3,PWz as Fy,RUy as j5,RxD as JL,Vyo as gv,W2B as _6,bJ4 as Hy,cEP as Ov,dE0 as yv,iI0 as Ny,ilW as z5,in5 as G5,ixI as sK,jMc as Wy,ksG as Iy,ozB as f1,r9y as XL,sGq as Ly,vP3 as B1}from"./85579231-5fdb0c653b39a648.mjs";import{A97 as R9,B4y as wV,Btj as o8,CNX as s8,CiA as C8,DLW as F0,DoC as _0,EJi as m9,Fdo as T,Fsq as JV,GDZ as a,Gw3 as j2,H0E as t0,IZ0 as m0,JRW as VZ,Jr5 as b1,KZX as YV,L0g as u9,Lfy as t8,M37 as l5,MKv as J2,MYg as KZ,MurX as _9,NYP as UV,OEI as pj,QXy as u$,Q_i as w9,RJG as t5,RYk as U2,STg as Q2,T_w as Y2,TvN as N$,UsZ as tF,Vla as n9,W5b as d5,X4O as KV,X8y as Z2,XZx as K2,Yy5 as i8,ZTc as VV,b52 as l6,bC7 as o5,bD4 as XV,bGb as p5,bmm as O2,d8I as eX,efc as By,ejI as i5,fVb as $V,faC as n5,fnD as rX,gZc as JZ,gZn as nK,gdU as QV,gg2 as ZV,gmh as B2,gzR as P0,h$I as q2,hnR as $2,iAe as q$,kHE as R,kIK as YZ,keV as qV,kzK as aX,l_w as sF,m2m as s5,mGI as T0,n4$ as z2,nCr as e5,nNu as d6,nvX as c5,o_Q as ZL,omt as X2,ouU as zV,pW$ as G2,q$S as E$,qWl as aF,s0L as k8,sNR as Cv,svr as Vy,tYo as yG,tfz as V2,tm5 as y8,tzT as Y6,uxK as a5,vCl as r,vnJ as $L,wDJ as r5,wQD as r$,wY8 as vU,xH8 as _$,xKf as p6,y_J as $9,z9c as E9}from"./1786bd7d-4f238f45bc4fcb3c.mjs";import{PQt as oK,Rvf as A6,a6U as iK,cdh as w6,hmE as R7}from"./ba0f2f24924aaf9a.mjs";import{iut as VB,mYr as KB,ozU as YB,zOT as UB}from"./514809330c66318e.mjs";import{_H6 as SI}from"./128cad34f6c19beb.mjs";import{AEA as h2,D4k as fv,DCk as tK,DET as oF,HEF as hv,JdV as vQ,LXY as bv,N2b as aK,StB as vv,TJI as rK,TtN as e7,emp as mv,hyT as wv,iTc as d3,iUE as m1,tnx as Sv,xRb as cK}from"./9d9bc12a-e29a5ee001a31e07.mjs";import{De5 as l3,Mik as p3,P5h as N8,RuK as AK,rrs as T$,rv7 as Dv,x12 as Pv}from"./449c1aed-1cac84dffce26c54.mjs";import{Pfl as jQ,bve as zW,jiN as G9,wXU as RN}from"./af4725680638eb2b.mjs";import{AOm as VW,B0D as rq,EC6 as BI,Ep9 as DI,HP3 as xI,IqC as GI,Ji_ as II,Kg1 as MI,LVe as oq,MTC as HI,Mq$ as Hv,SIx as vI,Tx1 as WI,Wwg as J4,YDU as LI,bt1 as $z,dkJ as Lv,doh as eq,eIc as sq,fYl as bJ,kCz as tq,mei as aq,pnp as fq,roe as mq,smX as NI,tTQ as FI,uDe as PI,z21 as TI}from"./de5348d4-ef532106910629cb.mjs";import{C2S as b3,F0L as Bv,HKU as Mv,IhW as HJ,fMZ as f3,h2Fk as KW,mUQ as Fv,pTW as m3}from"./0e28a35f3c3d2584.mjs";import{$po as Gv,SU$ as N5,_UO as W9,dHR as Kv,hvK as X4,iX3 as LX,yfG as QW}from"./eb1cfbd7-9ca70ed6fcce44db.mjs";import{MMr as Aq,PuS as iq,TE5 as uq,YYk as W7,c7w as zI,kOI as bW,mjx as HQ,tcR as jI,w7CS as Nq}from"./acb621c0-7b0d25d79a8a57b8.mjs";import{$Xn as LQ,B7o as zv,BXG as N7,Ch7 as O6,P2E as FJ,QYi as qv,RCw as Yv,TbQ as g6,Xnq as iQ,deo as jv,fqP as Vv,jeY as Uv,kP6 as qI,ncO as FQ,tcQ as u3,wNR as LJ,zJk as F6}from"./2dd03b3c-ae3bad06f00c2956.mjs";import{IMw as AJ}from"./f437588d0894b236.mjs";import{JEw as f0,tnM as cY}from"./b6a503490fc23cd3.mjs";import{qSl as Tv}from"./e89c4f25046f70a6.mjs";import{$Ob as IP,$u2 as ON,AVC as rD,CJM as WP,G_p as wN,Y3U as eD,fuJ as YJ,lg8 as B9,pyn as Bq,qbS as oz}from"./4f29534f39c39839.mjs";import{or9 as wY}from"./aa1ae7ade66c43fb.mjs";import{MkI as Fq,vur as XW,ydu as JW}from"./131b3a88fea8aaa4.mjs";import{JBV as s$,SUk as O$,Wga as xZ,hPO as xz,igj as d$,iuo as G4,oYj as _2,paT as DZ,peV as v$,sCd as rT}from"./3a1d23fd02ea6481.mjs";import{BTO as G3,D3n as Lq,GJr as qW,LDQ as UW,rFL as q8}from"./56906242-8226fe4eb27aaad5.mjs";import{A7D as z3,Dnl as N9,Nv9 as yK,QQA as j3,XVJ as Iv,XpT as xv,dE6 as Wv,eX0 as Nv,oyo as YW,vgS as kK}from"./c5a6cab2-79b40d38888397e0.mjs";import{SqI as PU}from"./a0930bf163362e48.mjs";import{IAf as EN}from"./47cd27b7baa599f1.mjs";import{BGa as yX,BVl as RX,CaN as _X,GYC as H4,Jyc as P2,RT6 as PX,UAr as OX,U_8 as gX,_bs as L4,gGb as DX,jNY as xX,jrV as AX,k1r as CX,ki_ as vX,lvi as wX,oks as kX,q1l as o6,r_G as EX,uKA as g8,uKC as TX,uuv as ZZ,vBq as IX,xPv as h$,zDJ as SX}from"./2ab06278-a2898865a05320d8.mjs";import{oEp as LK}from"./6b955a52-ea78f70fb95b96b1.mjs";export{$5 as jU4,$j as SLM,$t as jX4,AE as hCl,AH as _r6,AL as lzQ,AP as I2s,AS as mju,Aj as XfR,Ay as HtM,BS as uKb,Bj as HMr,Bk as XRe,Br as pMd,Bz as DZX,CH as pME,Cj as ka5,DC as UIh,DH as $Dg,DQ as a8C,Dk as Ybj,E0 as b1h,EH as WFB,Ej as XCD,Ep as Eo8,Es as KVK,FH as fMK,FS as m$K,Fk as F4s,Fx as dln,GS as OvP,Gl as ZIc,Gr as Yzf,H6 as bKS,HH as Luk,HL as bmE,HM as sVG,HN as CO4,HS as f9f,Hj as CwN,Hx as o_p,Hz as vlI,I8 as ppU,IC as tLl,IH as oY3,IM as FPh,IS as c91,Ij as xoh,Ik as qIK,Iz as VNN,J5 as xQO,JC as njb,JJ as m9F,JX as qHS,Ja as jOd,Jk as eaZ,K5 as Led,KD as LDV,KJ as XKa,KQ as qxK,Ka as SkM,Kk as FgG,Kq as anr,LC as wSr,LH as J2p,LM as rfV,LN as oU3,Lk as Zot,Lx as q5R,M1 as wGm,MC as doX,MS as qen,Mk as Pp_,NC as iLP,NH as Q$7,NM as PGt,NN as wyc,NS as FxN,Nx as x6_,O9 as COS,Ok as t8d,PC as _VS,PH as A9T,Pk as Bht,Q5 as wA4,Qr as AYI,Qx as aKe,RC as v93,RS as HKY,Rp as beZ,Rs as cjk,Rz as YZw,SC as PA3,Sj as zlz,TC as l1P,TH as yOx,TQ as Rmg,TS as DhX,Tj as z1U,U8 as gSx,UD as IgH,UK as Ib5,UN as tE1,UQ as VHp,US as Fnl,UX as MYc,V4 as JoF,VK as XRK,Vz as z9B,W0 as I1y,WC as A_D,WL as VP1,WM as mfC,WS as YNF,Wi as Y$k,Wk as ACB,XM as uXh,XX as C53,Xq as XLY,Xx as oQH,Y5 as m_W,YD as NOY,YS as Klh,Yy as MMre,Z5 as VL8,_j as Kuq,_p as Ake,_s as y7V,a3 as Gth,aI as zuz,aQ as _Vn,aS as UsG,ap as DU4,ax as Map,b0 as K3W,bC as i9A,bp as xQF,bs as gWT,c7 as Fim,cC as b5s,cI as ZSZ,cS as _PM,cs as heq,dI as UUr,dL as KDg,dj as pi3,ds as cWE,e1 as mjz,e3 as GHz,eC as Xxw,eI as XTg,ep as Dyz,es as Tlv,fU as Qhg,fs as qwt,gC as XFO,gH as jdB,gL as Fwj,gj as rt_,hC as D4D,hS as Q$r,hW as NA7,hp as nyd,hs as kn1,iC as WFw,iI as BUU,iN as mrn,iY as OSD,is as Og1,j9 as FT_,jD as we2,jS as OmG,jr as Z4H,kC as xta,kL as NHp,kQ as ixP,kS as R$d,kj as VnQ,kk as wpNo,l as y1N,lC as kS_,lH as KrD,lL as VJf,lp as GIq,ls as Ssi,lz as wOa,mC as m3O,mS as oC2,mZ as Boo,mp as ID6,ms as Nyf,n7 as EYI,nI as ipJ,nL as T6y,nS as MvA,nU as i4R,np as erq,ns as Oj5,o1 as vFb,o7 as $Gi,oC as SZi,oD as qwB,oS as WUG,os as D0W,pC as ZCu,pI as Sfc,pS as K3O,pp as UpF,ps as V$5,q0 as MAT,q6 as nrs,qH as HBK,qS as F6H,qj as j2g,qx as eJB,r3 as YO5,rC as yEX,rI as vUs,s1 as $c_,s3 as GO4,s7 as _Fa,s_ as UfL,sj as lX_,sp as hox,ss as wSR,sx as n$7,t3 as qVL,t7 as AOw,tC as iKx,tp as ele,ts as hjV,tx as cYm,uS as DCkM,uk as fni,up as TS8,us as lIf,v7 as BGN,vC as QVG,vH as CE6,vj as hZU,wj as D9i,ws as s5B,xC as beg,xH as u5C,xN as wP7,xS as W0k,xj as vio,xk as hK3,yE as jPX,yL as XJn,yj as sKS,yk as iBn,yy as hja,z8 as tSW,zD as hKS,zL as q13,zN as RLJ,zS as $GJ};
