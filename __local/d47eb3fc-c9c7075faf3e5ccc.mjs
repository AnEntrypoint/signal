import{C as $c0K}from"./52e971dc2a986655.mjs";var $c0C,$c0T=[function(){return[()=>"(function($){let Q=0,J=0;$.forEach(function(V,j){let Y;c4:{let $=V[0],Q=V[1],J=V[2];if(A8($)&&A8(J)){Y=(J-$)/(2*O);break c4;}if(!A8(Q)){Y=null;break c4;}if(A8(J)){Y=(J-Q)/O;break c4;}if(A8($)){Y=(Q-$)/O;break c4;}Y=null;}if(Y===null)return;let q=j===1?2:1;Q+=Y*q,J+=q});return J===0?0:Q/J})",()=>"(function($){let Q=$[4];if(!A8(Q))return null;let J=o0([[$[0],$[1],$[2]],[$[3],$[4],$[5]],[$[6],$[7],$[8]]]),V=o0([[$[0],$[3],$[6]],[$[1],$[4],$[7]],[$[2],$[5],$[8]]]),j=Q;for(let Y=0;Y<9;Y+=1){let q=$[Y];if(A8(q)&&q<j)j=q}return{sx:J,sz:V,depth:Math.min(u4,Q-j+f4)}})",()=>"(function($,Q,J,V,j){if($.columns.size===0||J===i4)return 0;let Y=J<<16>>16;let q=J>>16;let K=M5(Q,Y,q);let Z=$.columns.get(K);if(Z===void 0)return 0;let X=0;for(let D of Z){let M=R9(Q,Y,D,q);let F=$.placed.get(M);if(F!==void 0)j?.(F),$.placed.delete(M);let B=$.raw.get(M);if(B===void 0)continue;$.freeLater.push(B.unit),$.raw.delete(M),$.jobs.delete(M),V?.(Y,D,q),X+=O8}return $.columns.delete(K),$.stood.delete(K),$.laid.delete(K),X})",()=>'(function($,Q){return Q.getComputePipeline("terrain/shells/change",()=>({label:H9,layout:$.createPipelineLayout({label:H9,bindGroupLayouts:[Q.getBindGroupLayout(G5,H9)]}),compute:{module:$.createShaderModule({label:H9,code:Q3}),entryPoint:"change"}}))})',()=>'(function($,Q){if($.gpu!==null&&$.gpu.device===Q&&!$.gpu.mark.lost)return $.gpu;Z$($);let J={lost:!1},V=128|8,j=64|8;return $.gpu={device:Q,mark:J,ops:x(Q,{label:"terrain shells change ops",size:4096,usage:V},J),opsWords:1024,recs:x(Q,{label:"terrain shells change records",size:4096,usage:V},J),recsWords:1024,copyHead:x(Q,{label:"terrain shells change copies",size:16,usage:j},J),writeHead:x(Q,{label:"terrain shells change writes",size:16,usage:j},J),group:null},$.gpu})',()=>'(function($,Q,J,V,j,Y){let q=[],K=$.copies.length/3,Z=$.jobs.size;if(K===0&&Z===0)return $.recordWords=0,$.stood.clear(),$.laid.clear(),q;let X=J3($,Q);let D=0;for(let C of $.jobs.values())D+=C.refs.length;let M=K*3+Z*J6+D,F=new Uint32Array(Math.max(4,M));F.set($.copies,0);let B=K*3,A=0,U=K*3+Z*J6;for(let C of $.jobs.values())F[B]=C.raw.unit,F[B+1]=(C.mode|C.k<<8)>>>0,F[B+2]=C.src>>>0,F[B+3]=C.bx>>>0,F[B+4]=C.by>>>0,F[B+5]=C.bz>>>0,F[B+6]=A,F[B+7]=C.refs.length,F.set(C.refs,U+A),A+=C.refs.length,B+=J6;if(M>X.opsWords){R(X.ops);X.opsWords=J5(X.opsWords,M);X.ops=x(Q,{label:"terrain shells change ops",size:X.opsWords*4,usage:128|8},X.mark);}if($.recordWords>X.recsWords){R(X.recs);X.recsWords=J5(X.recsWords,$.recordWords);X.recs=x(Q,{label:"terrain shells change records",size:X.recsWords*4,usage:128|8},X.mark);}if(Q.queue.writeBuffer(X.ops,0,F,0,Math.max(4,M)),$.recordWords>0)Q.queue.writeBuffer(X.recs,0,$.records,0,$.recordWords);Q.queue.writeBuffer(X.copyHead,0,new Uint32Array([0,K,0,0])),Q.queue.writeBuffer(X.writeHead,0,new Uint32Array([1,Z,K*3,U]));let P=X.group;if(P?.dir!==j||P.pool!==Y||P.ops!==X.ops||P.recs!==X.recs){let C=J.getBindGroupLayout(G5,H9),G=(I,T)=>Q.createBindGroup({label:T,layout:C,entries:[{binding:0,resource:{buffer:X.ops}},{binding:1,resource:{buffer:X.recs}},{binding:2,resource:{buffer:j}},{binding:3,resource:{buffer:Y}},{binding:4,resource:{buffer:I}}]});P={copy:G(X.copyHead,"terrain shells change copies"),write:G(X.writeHead,"terrain shells change writes"),dir:j,pool:Y,ops:X.ops,recs:X.recs},X.group=P}if(K>0){q.push({pipeline:V,bindGroups:[P.copy],dispatch:Q5(K),debugLabel:"terrain/shells/change-lists"});}if(Z>0){q.push({pipeline:V,bindGroups:[P.write],dispatch:Q5(Z*512),debugLabel:"terrain/shells/change"});}$.copies.length=0,$.jobs.clear(),$.stood.clear(),$.laid.clear(),$.recordWords=0;for(let C of $.freeLater)$.free.push(C);return $.freeLater=[],q})']},function(){return[()=>"(function($){let Q=(X)=>Math.ceil(X/65536);let J=Q($.reserveBytes+($.initialBytes??0));let V=Q($.maximumBytes);let j=typeof WebAssembly>\"u\"?null:new WebAssembly.Memory({initial:J,maximum:V});let Y=j===null?new ArrayBuffer(J*65536):j.buffer;let q=$.reserveBytes;let K=new Map;let Z={memory:j,get buffer(){return Y},alloc(X){if(!(X>0&&X%8===0)){{throw Error(`a kernel heap region is a positive multiple of 8 bytes, not ${X}`);\n}}let D=K.get(X)?.pop();if(D!==void 0)return D;let M=q,F=M+X;if(F>Y.byteLength){let B=Q(F);if(B>V){{throw RangeError(`a kernel heap's allocation failed: ${F} bytes pass its ${V} pages`);\n}}try{if(j===null){let A=new ArrayBuffer(B*65536);new Uint8Array(A).set(new Uint8Array(Y)),Y=A}else j.grow(B-Y.byteLength/65536),Y=j.buffer}catch(A){{throw RangeError(`a kernel heap's allocation failed: ${A instanceof Error?A.message:String(A)}`,{cause:A})\n}}return q=F,$.retake(Z),M}return q=F,M},free(X,D){let M=K.get(D);if(M===void 0)K.set(D,[X]);else M.push(X)},reset(){q=$.reserveBytes,K.clear()}};return Z})",()=>"(()=>({F:0,I:384,FROM:576,BUCKET:4704,F_WORDS:48,I_WORDS:48,FROM_WORDS:1032,BUCKETS:4096}))",()=>"(function($,Q){let J=null;let V=I5({reserveBytes:j3,maximumBytes:Y3,initialBytes:Q,retake:function(){if(J===null)return;let j=J.kernel;if(j!==null)j.f=new Float64Array(V.buffer,j.io+(V8??=$c0I(7)).F,(V8??=$c0I(7)).F_WORDS),j.i=new Int32Array(V.buffer,j.io+(V8??=$c0I(7)).I,(V8??=$c0I(7)).I_WORDS),c5(V,j);$(J)}});return J={heap:V,kernel:null,instancing:null},J})",()=>"(function($,Q,J){if($.kernel!==null||$.instancing!==null||$.heap.memory===null)return $.kernel;let V=R5.module();if(V===null)return null;let j=$.heap.memory;return $.instancing=O5(R5,V,j).then(function(Y){let q=Y.exports,K=q.p(),Z=$.heap.buffer;if(Q.length>(V8??=$c0I(7)).FROM_WORDS||J.length>(V8??=$c0I(7)).BUCKETS)throw Error(`the far sun's distance codes outgrow the kernel's door (${Q.length} starts, ${J.length} buckets)`);new Int32Array(Z,K+(V8??=$c0I(7)).FROM,Q.length).set(Q),new Uint16Array(Z,K+(V8??=$c0I(7)).BUCKET,J.length).set(J),$.kernel={io:K,f:new Float64Array(Z,K+(V8??=$c0I(7)).F,(V8??=$c0I(7)).F_WORDS),i:new Int32Array(Z,K+(V8??=$c0I(7)).I,(V8??=$c0I(7)).I_WORDS),way:q.a,lines:q.b,shellAt:-1,shellBytes:0,shellKey:new Uint32Array(0),shellCast:new Int32Array(0)}}).catch((Y)=>__sc.info(`[wasm] sun-sweep: this field sweeps on the JS road (${j6(Y)})`)),null})",()=>"(function($,Q,J,V){let j=Math.max(1,Math.ceil(X3/(V*O))),Y=0;for(let q=Q.n-1;q>=0;q-=1){let K=$.entries[J+q]??0;if(K===0){Y+=1;continue}if(Y>=j&&q<Q.n-1){return(Q.y0+q)*O+((K&a)!==0?O:G3($.bricks,K-1));}Y=0}return Q.top})",()=>"(function($,Q,J,V){let j=$.cell*O,Y=Q===0||j<=$7;return{W:Math.min($.W,l8),column:j,near:Y,quad:J,quadInts:V,up:M6,nearTop:Y?M6:null,key:new Int32Array(7).fill(-1),x0:0,z0:0,stands:!1,held:B6,wait:B6,waits:null,waitsNow:!1,from:null,to:null,marks:[D$(),D$(),D$()],bare:!0,empty:0,heap:null,at:-1,heldAt:-1,waitAt:-1}})",()=>'(function($){if(!$.bare)return;let Q=$.heap;if(Q===null)throw Error("a far sun level was dressed before its field said its memory");let J=$.W*$.W;if($.at<0){$.at=Q.heap.alloc(K7($));$.heldAt=$.at+J*16;$.waitAt=$.at+J*24;}Z7($,Q.heap.buffer),$.up.fill(0),$.held.fill(0),$.wait.fill(0),$.nearTop?.fill(m),$.bare=!1})']},function(){return[()=>"(function($){let Q=$.heap.heap.buffer;if($.quadAt>=0)$.quad=new Float32Array(Q,$.quadAt,$.quadWords),$.quadInts=new Int32Array(Q,$.quadAt,$.quadWords);for(let J of $.levels)if(J.quad=$.quad,J.quadInts=$.quadInts,!J.bare&&J.at>=0)Z7(J,Q)})",()=>"(function($,Q){let J=$.heap;for(let V of Q){if(V.at<0||$.levels.includes(V))continue;J.heap.free(V.at,K7(V));V.at=-1}for(let V of $.levels)V.heap=J;if($.quad.buffer===J.heap.buffer)return;J.heap.free($.quadAt,$.quadWords*4),$.quadWords=$.quad.length,$.quadAt=-1,$.quadAt=J.heap.alloc($.quadWords*4),D7($)})",()=>"(function($,Q,J,V=m){if($.nearTop===null)return;X7($);let j=$.nearTop;if(j.fill(m),J===null)return;if(P$=$,M7=Q,J.visit(R3),P$=null,V<=m)return;for(let Y=0;Y<j.length;Y+=1)if((j[Y]??m)>m&&(j[Y]??0)<V)j[Y]=V})",()=>"(function($,Q,J){let V=X8[0]??0,j=X8[1]??0;for(let Y=Q;Y<$.levels.length;Y+=1){let q=$.levels[Y];if(!q?.stands)continue;let K=V/q.column-0.5,Z=j/q.column-0.5,X=Math.floor(K),D=Math.floor(Z);if(X<q.x0||X+1>=q.x0+q.W||D<q.z0||D+1>=q.z0+q.W)continue;let M=K-X;let F=Z-D;let B=q6(X,D,q.W);let A=q6(X+1,D,q.W);let U=q6(X,D+1,q.W);let P=q6(X+1,D+1,q.W);let C=(1-M)*(1-F);let G=M*(1-F);let I=(1-M)*F;let T=M*F;for(let N=0;N<4;N+=1)J[N]=(q.up[B*4+N]??0)*C+(q.up[A*4+N]??0)*G+(q.up[U*4+N]??0)*I+(q.up[P*4+N]??0)*T;return}J[0]=m,J[1]=m,J[2]=0,J[3]=0})",()=>"(function($,Q,J,V,j,Y,q){let K=Q.W,Z=J.W,X=Q.x0,D=Q.z0,M=j.alongX?D:X,F=j.alongX?K:1,B=j.alongX?Z:1,A=D8(Y,K)*(j.alongX?1:K),U=D8(Y+j.toward,K)*(j.alongX?1:K),P=D8(Y,Z)*(j.alongX?1:Z),C=(Y&65535)<<(j.alongX?0:16),G=j.alongX?16:0,I=Q.nearTop;for(let T=0;T<K;T+=1){x3:{let J$3=V,V$3=j,j$2=Y,Y$2=T,K$1=U;{let J=J$3,V=V$3,j=j$2,Y=Y$2,K=K$1;let Z=Y+V.whole,X=Q.W;if(q||Z<0||Z+1>=X){let{x0:B,z0:A}=Q;X8[0]=j+V.toward+0.5,X8[1]=(V.alongX?A:B)+Y+V.drift+0.5,F7($,J,V,Q);break x3;}let D=V.alongX?X:1,M=K+(t8[Z]??0)*D,F=K+(t8[Z+1]??0)*D;for(let B=0;B<4;B+=1)K8[B]=(Q.up[M*4+B]??0)*(1-V.share)+(Q.up[F*4+B]??0)*V.share}}let N=Math.max((K8[0]??m)-j.fall,m),H=Math.max((K8[1]??m)-j.fall,m),z=(A+(t8[T]??0)*F)*4;Q.quad[z]=N,Q.quad[z+1]=H,Q.quad[z+2]=(K8[2]??0)+j.step,Q.quad[z+3]=(K8[3]??0)+j.step;let v=M+T,_=P+(I$[T]??0)*B;if(J.key[_]===(C|(v&65535)<<G)>>>0){let b=(J.cast[_]??0)*J.cell;if($8[0]=b,$8[1]=0,$8[2]=b,I!==null&&b<=(I[z/4]??m)+0.01)$8[2]=m;$8[3]=0}else X8[0]=Y+0.5,X8[1]=v+0.5,F7($,V,j,Q),$8[0]=K8[0]??m,$8[1]=K8[2]??0,$8[2]=K8[1]??m,$8[3]=K8[3]??0;y3(Q,z)}})",()=>"(function($,Q){let J=$8[0]??0,V=$8[1]??0,j=$8[2]??0,Y=$8[3]??0,q=$.quad[Q]??0,K=$.quad[Q+1]??0,Z=$.quad[Q+2]??0,X=$.quad[Q+3]??0,D=J>q;$.up[Q]=D?J:q,$.up[Q+2]=D?V:Z;let M=j>K;$.up[Q+1]=M?j:K,$.up[Q+3]=M?Y:X})",()=>"(function($,Q,J,V,j,Y,q,K){let Z=f5($.heap,Z6,A7);if(Z!==null){return _3($,Z,Q,J,V,j,Y,q,K);}let X=Q.W,D=$.chain,M=D.way,F=j[0]??0,B=j[2]??0,A=Math.abs(F)>=Math.abs(B),U=A?F:B,P=Math.max(Math.abs(U),0.000001),C=(A?B:F)/P,G=Math.floor(C);M.alongX=A,M.toward=U>=0?1:-1,M.drift=C,M.whole=G|0,M.share=C-G,M.fall=Q.column*(j[1]??0)/P,M.step=Q.column*Math.sqrt(F**2+B**2)/P;let{x0:I,z0:T}=Q,N=A?I:T,H=A?T:I,z=X-1,v=N+(M.toward>0?z:0),_=M.toward>0?-1:1;if(t8.length<X)t8=new Int32Array(X),I$=new Int32Array(X);for(let w=0;w<X;w+=1)t8[w]=D8(H+w,X),I$[w]=D8(H+w,J.W);let b=A?1:X,F8=A?X:1;if(K!==null&&D.fresh){let w=K();Z8[0]=w,Z8[1]=w,D.fresh=!1}let i=Y;while(i<q){let w=Math.min(q,i+Q7);for(;i<w;i+=1){let N9=v+_*i;E3($,Q,J,V,M,N9,i===0);S3(Q.quad,Q.quadInts,Q.wait,D8(N9,X)*b,X,F8)}if(K===null)continue;let l=K();if($.sweepMs+=l-(Z8[1]??l),Z8[1]=l,l-(Z8[0]??l)>=F6){D.spent=!0;break}}return i})"]},function(){return[()=>"(function($,Q,J,V,j,Y,q,K,Z){{let $$1=$.heap,J$2=V.key,V$2=V.cast;{let $=$$1,J=J$2,V=V$2;let j=J.length*8;if(j>Q.shellBytes){if(Q.shellAt>=0)$.heap.free(Q.shellAt,Q.shellBytes);Q.shellAt=-1,Q.shellBytes=j,Q.shellAt=$.heap.alloc(j),c5($.heap,Q),Q.i[q3]=Q.shellAt/4,Q.i[K3]=(Q.shellAt+j/2)/4}Q.shellKey.set(J),Q.shellCast.set(V)}}let{f:X,i:D}=Q;X[Y6]=Y[0]??0,X[Y6+1]=Y[1]??0,X[Y6+2]=Y[2]??0,X[x5]=V.cell,D[_5]=$.levels.length,D[k5]=j,D[b5]=V.W,D[w5]=J.waitAt/4,D[S5]=J.nearTop===null?-1:(J.at+J.W*J.W*32)/4,D[h5]=$.quadAt/4;for(let B=0;B<$.levels.length;B+=1){let A=$.levels[B];if(A===void 0)continue;X[E5+B]=A.column,X[y5+B]=A.x0,X[L5+B]=A.z0,D[g5+B]=A.W,D[v5+B]=A.stands?1:0,D[m5+B]=A.at/4}Q.way();let M=$.chain;if(Z!==null&&M.fresh){let B=Z();Z8[0]=B,Z8[1]=B,M.fresh=!1}let F=q;while(F<K){let B=Math.min(K,F+Q7);if(Q.lines(F,B),F=B,Z===null)continue;let A=Z();if($.sweepMs+=A-(Z8[1]??A),Z8[1]=A,A-(Z8[0]??A)>=F6){M.spent=!0;break}}return F})",()=>"(function($,Q,J,V){let j=A6(Q);if($.quad.length!==j*j*4)$.quad=new Float32Array(j*j*4),$.quadInts=new Int32Array($.quad.buffer),$.layer=new Uint32Array(j*j*4);for(let Y=0;Y<Q.length;Y+=1){let q=Q[Y];if(q===void 0)continue;let K=$.levels[Y],Z=q.cell*O;if(K?.W===Math.min(q.W,l8)&&K.column===Z&&K.near===(Y===0||Z<=$7)){if(V){{let $=K;$.key.fill(-1),$.stands=!1,$.waits=null,$.waitsNow=!1}}else O$(K);K.quad=$.quad,K.quadInts=$.quadInts,K.x0=0,K.z0=0,K.empty=0}else $.levels[Y]=q7(q,Y,$.quad,$.quadInts)}$.levels.length=Q.length,$.of=Q,$.epoch=J,$.sun[0]=0,$.sun[1]=1,$.sun[2]=0,$.still=0,$.hasAimed=!1,$.hasBefore=!1,$.step=O9,$.stepOwed=!1,$.plan=D6,$.eye[0]=0,$.eye[1]=0,$.eyeStep=0,$.lit=!1,$.chain.active=!1,$.chain.wayOn=!1,$.sent.fill(NaN),$.sweeps=0,$.sweepMs=0,$.said=!1})",()=>"(function(){let $=new Float32Array(1);let Q=new Int32Array($.buffer);let J=function(K){Q[0]=K;return (Math.min(a8,Math.round(Math.log2(1+Math.max(0,($[0]??0)))*R$)))};let V=new Int32Array(a8+2);for(let K=1;K<=a8;K+=1){$[0]=2**((K-0.5)/R$)-1;let Z=Q[0]??0;while(J(Z)>=K)Z-=1;while(J(Z)<K)Z+=1;V[K]=Z}V[a8+1]=N$;let j=V[1]??0,Y=new Uint16Array(((V[a8]??0)-j>>>z$)+1),q=1;for(let K=0;K<Y.length;K+=1){let Z=j+K*2**z$;while((V[q+1]??N$)<=Z)q+=1;Y[K]=q}return{from:V,bucket:Y}})",()=>"(function($,Q,J){let V=Q[0]??0,j=Q[1]??0,Y=Q[2]??0,q=(J[0]??0)-V,K=(J[1]??0)-j,Z=(J[2]??0)-Y,X=q*q+K*K+Z*Z,D=X<0.000000000001?1:Math.max(0,((($[0]??0)-V)*q+(($[1]??0)-j)*K+(($[2]??0)-Y)*Z)/X);x9[0]=Math.min(1,D),x9[1]=Math.min(M3,D)})",()=>'(function($,Q){let J=A6($.of),V=Math.max(1,$.levels.length);if($.gpu?.device===Q&&$.gpu.side===J&&$.gpu.layers===V&&!$.gpu.mark.lost)return $.gpu;if($.gpu!==null)P6($.gpu);if($.hold!==null&&($.hold.gpu.device!==Q||$.hold.gpu.mark.lost)){E$($);}let j={lost:!1},Y=E9(Q,{label:"terrain shells far sun",size:{width:J,height:J,depthOrArrayLayers:V},format:l5,usage:4|2},j),q=x(Q,{label:"terrain shells far sun words",size:X6*4,usage:64|8},j);$.gpu={device:Q,mark:j,texture:Y,handle:{words:q,field:Y.createView({dimension:"2d-array"})},side:J,layers:V,to:{texture:Y,origin:{x:0,y:0,z:0}},layout:{bytesPerRow:0,rowsPerImage:0},size:{width:0,height:0,depthOrArrayLayers:1}},$.sent.fill(NaN),$.chain.active=!1,$.chain.wayOn=!1,$.hasAimed=!1,$.hasBefore=!1;for(let K of $.levels)K.key.fill(-1),K.from=null,K.to=null,K.waits=null;return $.gpu})']},function(){return[()=>"(function($,Q,J){let V=$.gpu;if(V===null)return!0;if($.hold!==null||J[0]!==$.origin[0]||J[1]!==$.origin[1]||J[2]!==$.origin[2]||A6(Q)!==V.side||Math.max(1,Q.length)!==V.layers)return!1;for(let j=0;j<$.levels.length;j+=1){let Y=$.levels[j],q=Q[j];if(Y===void 0)continue;if(Y.from===null||Y.to===null)continue;if(q===void 0||Y.W!==Math.min(q.W,l8)||Y.column!==q.cell*O)return!1}return!0})",()=>"(function($){let Q=$.gpu;if(Q===null)return;$.gpu=null;if($.hold!==null||!n3($))P6(Q);else $.hold={gpu:Q,words:Float32Array.from($.words),sent:Float32Array.from($.sent),origin:Float64Array.from($.origin)}})",()=>"(function($,Q,J){let V=$.hold;if(V===null)return;if(!J||p3($,Q)){E$($);return}let j=V.words;j[2]=$.arrival[4]??0,j[4]=(V.origin[0]??0)-(P8[0]??0),j[5]=(V.origin[1]??0)-(P8[1]??0),j[6]=(V.origin[2]??0)-(P8[2]??0);let Y=$.nearBox;j[8]=(Y[0]??0)-(V.origin[0]??0),j[9]=(Y[1]??0)-(V.origin[2]??0),j[10]=(Y[2]??0)-(V.origin[0]??0),j[11]=(Y[3]??0)-(V.origin[2]??0),j[7]=Math.max((Q.nearReach??m)+(o[1]??0)-(V.origin[1]??0),(Y[4]??0)-(V.origin[1]??0));let q=!0;for(let K=2;K<W$&&q;K+=1)q=j[K]===V.sent[K];if(q)return;V.sent.set(j),V.gpu.device.queue.writeBuffer(V.gpu.handle.words,0,j)})",()=>"(function($,Q,J){M$.set(J.eye),P8.set(J.renderOrigin),o.set(Q);let V=(M$[0]??0)+(P8[0]??0)-(o[0]??0),j=(M$[2]??0)+(P8[2]??0)-(o[2]??0);r8[0]=V,r8[1]=j;let Y=J.sun;if(Y!==null)W9.set(Y.way);let q=Y!==null&&Y.casts&&(W9[1]??0)<0;if(q){let K=-(W9[0]??0),Z=Math.max(-(W9[1]??0),e5),X=-(W9[2]??0),D=$.sun;$.still=$.lit&&(K-(D[0]??0))**2+(Z-(D[1]??0))**2+(X-(D[2]??0))**2<0.00000000000001?$.still+1:0,D[0]=K,D[1]=Z,D[2]=X}if($.lit=q,(V-($.eye[0]??0))**2+(j-($.eye[1]??0))**2>D3**2)$.eye[0]=V,$.eye[1]=j,$.eyeStep+=1;for(let K=0;K<$.levels.length;K+=1){let Z=$.levels[K];if(Z===void 0)continue;$.centres[K*2]=Math.round(V/Z.column/x8),$.centres[K*2+1]=Math.round(j/Z.column/x8)}if(q&&!$.chain.active){a3($);}return q})",()=>"(function($){if($.stepOwed){let{stepTo:v,stepFrom:_}=$;$.step=Math.min(F3,Math.max(O9,2*Math.sqrt(((v[0]??0)-(_[0]??0))**2+((v[1]??0)-(_[1]??0))**2+((v[2]??0)-(_[2]??0))**2))),$.stepOwed=!1}if(!$.hasAimed){$.plan=K6;return}let Q=$.sun[0]??0,J=$.sun[1]??0,V=$.sun[2]??0,j=$.aimed[0]??0,Y=$.aimed[1]??0,q=$.aimed[2]??0,K=Math.sqrt((Q-j)**2+(J-Y)**2+(V-q)**2);if(y$($)){$.plan=K>O9/4?K6:D6;return}if(K>J7*$.step||$.hasBefore&&P7($.sun,$.before,$.aimed)){$.plan=K6;return}let Z=($.stepTo[0]??0)-($.stepFrom[0]??0),X=($.stepTo[1]??0)-($.stepFrom[1]??0),D=($.stepTo[2]??0)-($.stepFrom[2]??0),M=$.hasAimed&&Math.sqrt(Z*Z+X*X+D*D)>0.000001,F=$.before[0]??0,B=$.before[1]??0,A=$.before[2]??0,U=!M&&$.hasBefore&&Math.sqrt((j-F)**2+(Y-B)**2+(q-A)**2)>0.000001,P=Q-j,C=J-Y,G=V-q;if(M)P=Z,C=X,G=D;else if(U)P=j-F,C=Y-B,G=q-A;let I=Math.sqrt(P*P+C*C+G*G);if(I<0.00001){$.plan=D6;return}let T=P/I,N=C/I,H=G/I,z=Math.max(0,(j-Q)*T+(Y-J)*N+(q-V)*H)+$.step;$.ahead[0]=Q+T*z,$.ahead[1]=Math.max(J+N*z,e5),$.ahead[2]=V+H*z,$.plan=j7})",()=>"(function($,Q,J){let V=(J[0]??0)-(Q[0]??0),j=(J[1]??0)-(Q[1]??0),Y=(J[2]??0)-(Q[2]??0),q=Math.sqrt(V*V+j*j+Y*Y);return q>0.000001&&(($[0]??0)-(Q[0]??0))*V+(($[1]??0)-(Q[1]??0))*j+(($[2]??0)-(Q[2]??0))*Y<-O9*q})"]},function(){return[()=>"(function($,Q,J){for(let V=0;V<$.levels.length;V+=1){let j=$.levels[V],Y=Q.levels[V];if(j===void 0||Y===void 0||Y.present===0&&j.to===null)continue;let q=C7($,V,j,Y,J,U7(Q));for(let K=0;K<q.length;K+=1)if(j.key[K]!==q[K])return!0}return!1})",()=>"(function($,Q,J){for(let V=0;V<$.levels.length;V+=1)if($.levels[V]?.waits)return!1;if($.plan===K6)return B$($,!0,$.sun);if(y$($)){return t3($,Q,J)?B$($,!0,$.sun):!1;}return $.plan===j7?B$($,!1,$.ahead):!1})",()=>"(function($,Q,J,V,j){while(Q.k>=0&&(J.levels[Q.k]?.present??0)===0)Q.k-=1;let Y=Q.k;if(Y<0)return!1;let q=$.levels[Y],K=J.levels[Y];if(q===void 0||K===void 0)return!1;X7(q);q.empty=0;q.key.set(C7($,Y,q,K,j.near?.stamp??-1,U7(J)));w3(q,$.centres[Y*2]??0,$.centres[Y*2+1]??0);W3(q,V,j.near,J.nearReach??m);Q.wayOn=!0;Q.next=0;return !0})",()=>"(function($,Q,J,V,j){Q.fresh=!0,Q.spent=!1;while(Q.active&&!Q.spent){if(!Q.wayOn&&!r3($,Q,J,V,j)){$.before.set($.hasAimed?$.aimed:Q.sun),$.hasBefore=!0,$.aimed.set(Q.sun),$.hasAimed=!0,$.stepFrom.set(Q.began),$.stepTo.set($.sun),$.stepOwed=!0,Q.active=!1;break}let Y=$.levels[Q.k],q=J.levels[Q.k];if(Y===void 0||q===void 0||!Q.wayOn)break;Q.next=L3($,Y,q,Q.k,Q.sun,Q.next,Y.W,j.clock);if(Q.next>=Y.W){{let J=Y;J.stands=!0;let V=l3(J);if(V.x0=J.x0,V.z0=J.z0,V.sun.set(Q.sun),J.waits=V,J.waitsNow=Q.anchor,Q.wayOn=!1,Q.k-=1,$.sweeps+=1,$.sweeps%A3===0)__sc.info(`[shells] the far sun: ${$.sweeps} sweeps so far, ${($.sweepMs/$.sweeps).toFixed(2)} ms each on the render thread (${F6} ms a frame at most), a sample aimed ${$.step.toFixed(4)} rad ahead`)}}}})",()=>"(function($,Q){if(Q.waitsNow||Q.from===null||Q.to===null||y$($)||P7($.sun,Q.from.sun,Q.to.sun))return!0;let J=$.sun,V=Q.from.sun,j=Q.to.sun;if(x$(J,V,j),(x9[0]??1)>=1)return!0;let Y=(J7*$.step)**2,q=J[0]??0,K=J[1]??0,Z=J[2]??0;return(q-(j[0]??0))**2+(K-(j[1]??0))**2+(Z-(j[2]??0))**2>Y&&(q-(V[0]??0))**2+(K-(V[1]??0))**2+(Z-(V[2]??0))**2>Y})",()=>"(function($,Q){let J=!1;for(let V=$.levels.length-1;V>=0;V-=1){let j=$.levels[V],Y=j?.waits??null;if(j===void 0||Y===null||!G7($,j))continue;if(J)return!0;if(j.to===null)j.held.set(j.wait);let q=j.W*j.W;for(let X=0;X<q;X+=1)$.layer[X*4]=j.held[X*2]??0,$.layer[X*4+1]=j.held[X*2+1]??0,$.layer[X*4+2]=j.wait[X*2]??0,$.layer[X*4+3]=j.wait[X*2+1]??0;Q.to.origin.z=V,Q.layout.bytesPerRow=j.W*16,Q.layout.rowsPerImage=j.W,Q.size.width=j.W,Q.size.height=j.W,Q.device.queue.writeTexture(Q.to,$.layer,Q.layout,Q.size);let K=j.held;j.held=j.wait,j.wait=K;let Z=j.heldAt;j.heldAt=j.waitAt,j.waitAt=Z,j.from=j.to??Y,j.to=Y,j.waits=null,J=!0}return!1})",()=>"(function($,Q){let J=$.words;J[2]=$.arrival[4]??0;let V=$.nearBox;J[8]=(V[0]??0)-(o[0]??0),J[9]=(V[1]??0)-(o[2]??0),J[10]=(V[2]??0)-(o[0]??0),J[11]=(V[3]??0)-(o[2]??0),J[7]=Math.max(Q,(V[4]??0)-(o[1]??0))})",()=>"(function($,Q,J,V){let j=$.words;j.fill(0);j[0]=J?$.levels.length:0;j[1]=0.5*($.sun[1]??0)/Math.max(Math.abs($.sun[0]??0),Math.abs($.sun[2]??0),0.000001);j[4]=(o[0]??0)-(P8[0]??0);j[5]=(o[1]??0)-(P8[1]??0);j[6]=(o[2]??0)-(P8[2]??0);YV($,V);for(let q=0;q<$.levels.length;q+=1){let K=$.levels[q];if(K===void 0)continue;let Z=W$+q*r5;j[Z]=K.column;j[Z+1]=K.W;if(K.from===null||K.to===null){qV($,K,q,Z);continue}x$($.sun,K.from.sun,K.to.sun),j[Z+2]=x9[1]??1,j[Z+3]=K.W/2-V7,j[Z+4]=K.from.x0+K.W/2,j[Z+5]=K.from.z0+K.W/2,j[Z+6]=K.to.x0+K.W/2,j[Z+7]=K.to.z0+K.W/2}let Y=!0;for(let q=0;q<j.length&&Y;q+=1)Y=j[q]===$.sent[q];if(Y)return;$.sent.set(j),Q.device.queue.writeBuffer(Q.handle.words,0,j)})"]},function(){return[()=>"(function($,Q){let J=$.shape;if(J===null||$.levels.length===0||$.levels.length>H$)return!1;if(L8())return U6($),!1;let v$3;u3:{let Q$1=J;{let Q=Q$1;let J=o8.get($);if(J===void 0){let V=k3($.levels,Q.epoch);{v$3=(V.origin.set(Q.origin),o8.set($,V),V);break u3;}}if(J.epoch!==Q.epoch||J.of!==$.levels){let V=f3(J,$.levels,Q.origin);if(!V){c3(J);}let j=[...J.levels];b3(J,$.levels,Q.epoch,V);I3(J,j);J.origin.set(Q.origin)}v$3=J;}}let V=v$3;let j=m3(V,Q.device);let Y=i3(V,J.origin,Q);JV:{let $$2=V,Q$2=Q.near,J$4=$.move?.since??-1;{let $=$$2,Q=Q$2,J=J$4;let V=Q?.stamp??-1,j=Q?.revision??-1,Y=J>=0&&!Number.isNaN($.arrival[0]??0);if(V===$.nearStamp&&J===$.nearSince&&(!Y||j===$.nearRevision))break JV;$.nearStamp=V,$.nearSince=J,$.nearRevision=j,C$.set(p5),G$.set(p5),U$=0,T$=0,B7=J,Q?.visit(QV),$.nearBox.set(C$),$.arrivalBox.set(G$)}}let q=jV(V,$.move??null,Q.parked===!0);{let $$3=V,Q$3=$;{let $=$$3,Q=Q$3;for(let J=0;J<$.levels.length;J+=1){let V=$.levels[J],j=Q.levels[J];if(V===void 0||j===void 0)continue;if(j.present>0){V.empty=0;continue}if($.chain.active&&$.chain.k===J)continue;if(V.to!==null||V.waits!==null)O$(V);if(V.bare)continue;V.empty+=1;if(V.empty>U3){H3(V)}}}}if(Y){q=$V(V,j)||q;if(!V.chain.active&&o3(V,$,Q.near?.stamp??-1)){z3(V);}if(V.chain.active){e3(V,V.chain,$,J.origin,Q);}q=q||V.chain.active;for(let K=0;K<V.levels.length&&!q;K+=1){let Z=V.levels[K];if(Z?.waits&&G7(V,Z))q=!0}if(!q&&!V.said&&V.sweeps>0)V.said=!0,__sc.info(`[shells] the far sun stands: the land's shadow past the near ground, ${V.levels.length} levels of ${V.levels[0]?.W??0} columns, two samples a layer (the sun passed one, one is ahead); ${V.sweeps} sweeps of ${(V.sweepMs/V.sweeps).toFixed(2)} ms so far, ${F6} ms a frame at most`)}KV(V,j,Y,$.nearReach??m);d3(V,$,Y);return q})",()=>"(function($,Q){let J=o8.get($);if(J===void 0)return null;let V=J.levels.map(function(j){if(j.from===null||j.to===null)return null;return x$(Q??J.sun,j.from.sun,j.to.sun),{from:F$(j.from.sun),to:F$(j.to.sun),share:x9[1]??1}});return{sun:F$(J.sun),levels:V}})",()=>"(($,Q=!1)=>`${c$}\nconst SHELLS_NEAR_AIR = ${Q};\n@group(${$}) @binding(0) var<${g$()}> shells: ShellsDraw;\n@group(${$}) @binding(1) var<storage, read> shellDir: array<u32>;\n@group(${$}) @binding(2) var<storage, read> shellPool: array<u32>;\n@group(${$}) @binding(3) var<storage, read> shellTones: array<vec4f>;\n@group(${$}) @binding(4) var shellAlbedo: texture_2d_array<f32>;\n@group(${$}) @binding(5) var shellSampler: sampler;\n@group(${$}) @binding(6) var<storage, read> shellFloors: array<vec4f>;\n@group(${$}) @binding(${k6}) var<storage, read> shellHorizon: array<f32>;`)",()=>"(()=>(`let grown = select(vec3f(hi.w), vec3f(), all(frame.cameraPosition > lo.xyz - vec3f(hi.w)) && all(frame.cameraPosition < hi.xyz + vec3f(hi.w)));\n  out.position = frame.viewProj * vec4f(mix(lo.xyz - grown, hi.xyz + grown, corner), 1.0);`))",()=>"(()=>(`fn shell_look(ro: vec3f, rd: vec3f, h: ShellHit) -> ShellLook {\n  var out: ShellLook;\n  let p = ro + rd * h.t;\n  let pixelM = h.t * shells.paint.x / max(abs(dot(h.n, rd)), 0.15);\n  var tone = shell_tone(select(h.matter, 0u, h.thing), p, h.n, pixelM);\n  if (h.thing) {\n    let m = h.matter;\n    let srgb = vec3f(f32((m >> 11u) & 31u) / 31.0, f32((m >> 5u) & 63u) / 63.0, f32(m & 31u) / 31.0);\n    tone = vec4f(pow(srgb, vec3f(2.2)), 0.9);\n  }\n  out.albedo = tone.rgb;\n  out.N = h.n;\n  out.roughness = tone.a;\n  return out;\n}`))"]},function(){return[()=>'(function($,Q){let J=$.indexOf("fn shell_stand("),V=J<0?-1:$.indexOf(`  out.lend = false;\n`,J);if(V<0)throw Error("shells wgsl: the march text holds no stand-in head");let j=`${$.slice(0,V)}  out.lend = false;\n  out.lend = true;\n  return out;\n}${$.slice(CQ($,J))}`,Y=G6(G6(j,"fn shell_look(",(UV??=$c0I(43))),"fn shells_thingMarch(",(TV??=$c0I(45)));if(Q==="no-walk")return G6(Y,"fn shells_landWalk(",(IV??=$c0I(46)));let q=FQ(!0);return G6(Y,"fn shells_landWalk(",q.slice(q.indexOf("fn shells_landWalk(")))})',()=>"(()=>(`fn shells_thingMarch(ro: vec3f, rd: vec3f, tFrom: f32, tTo: f32, steps0: u32) -> ShellHit {\n  var h: ShellHit;\n  h.t = tTo;\n  h.thing = true;\n  h.steps = steps0;\n  return h;\n}`))",()=>"(()=>(`fn shells_noWalkColumn(k: u32, p: vec3f, at: ptr<function, vec2i>, slot: ptr<function, u32>) -> vec4u {\n  let row = shells.rows[k];\n  *at = vec2i(floor(p.xz / (row.metres.x * 8.0))) + row.anchor.xy;\n  *slot = shell_slot(k, (*at).x, (*at).y);\n  return shell_record(k, *slot);\n}\n\nfn shells_noWalkCell(k: u32, ro: vec3f, rd: vec3f, t: f32) -> vec3i {\n  let row = shells.rows[k];\n  return vec3i(floor((ro + rd * (t + 1e-3 * row.metres.x)) / row.metres.x)) + vec3i(row.anchor.x, 0, row.anchor.y) * 8;\n}\n\nfn shells_noWalkMeet(ro: vec3f, rd: vec3f, tIn: f32, tOut: f32, k: u32, e: vec4u, at: vec2i) -> f32 {\n  let tMid = 0.5 * (tIn + tOut);\n  var tm = select(SHELL_BIG, tOut, shell_solid(k, shells_noWalkCell(k, ro, rd, tOut), e, at));\n  tm = select(tm, tMid, shell_solid(k, shells_noWalkCell(k, ro, rd, tMid), e, at));\n  return select(tm, tIn, shell_solid(k, shells_noWalkCell(k, ro, rd, tIn), e, at));\n}\n\nfn shells_landWalk(ro: vec3f, rd: vec3f, tStartIn: f32, tStop: f32, dugFrom: bool) -> ShellHit {\n  var h: ShellHit;\n  h.t = tStop;\n  let count = shells.head.x;\n  let tFrom = max(tStartIn, shells_horizonFrom(rd));\n  if (count == 0u || tFrom >= SHELL_BIG) {\n    h.t = SHELL_BIG;\n    return h;\n  }\n  let rise = rd.y >= -1e-4;\n  let inv = shell_inv(rd).xz;\n  let tBand = select((shells.band.x - ro.y) / rd.y, (shells.eye.w - ro.y) / max(rd.y, 1e-6), rise);\n  let tEnd = min(min(tStop, tBand), shells.rows[count - 1u].metres.y);\n  var t = max(max(tFrom, shells.rows[0].metres.x * 8.0), select((shells.eye.w - ro.y) / rd.y, 0.0, rise));\n  var k = 0u;\n  var e: vec4u;\n  var at: vec2i;\n  var slot: u32;\n  var met = false;\n  var steps = 0u;\n  loop {\n    if (t >= tEnd || steps >= SHELLS_STEP_BUDGET) {\n      break;\n    }\n    steps++;\n    k = shell_reaching(t, count);\n    let row = shells.rows[k];\n    let p = ro + rd * (t + 1e-3 * row.metres.x);\n    let g = row.metres.x * 64.0;\n    let gl = vec2i(floor(p.xz / g));\n    let lg = shell_leave(ro.xz, inv, gl, g);\n    let tg = min(lg.x, lg.y);\n    let gTop = shell_group(k, gl.x + (row.anchor.x >> 3u), gl.y + (row.anchor.y >> 3u));\n    if (gTop != SHELLS_GROUP_OPEN && select(ro.y + rd.y * tg, p.y, rise) >= f32(gTop) * row.metres.x) {\n      t = max(tg, t) + 1e-3 * row.metres.x;\n      continue;\n    }\n    e = shells_noWalkColumn(k, p, &at, &slot);\n    var have = shell_present(e, at.x, at.y);\n    if (!have && k + 1u < count) {\n      k = count - 1u;\n      e = shells_noWalkColumn(k, p, &at, &slot);\n      have = shell_present(e, at.x, at.y);\n    }\n    let c = shells.rows[k].metres.x;\n    let lc = shell_leave(ro.xz, inv, at - shells.rows[k].anchor.xy, c * 8.0);\n    let tOut = max(min(lc.x, lc.y), t);\n    let yLo = ro.y + rd.y * select(tOut, t, rise);\n    let yHi = ro.y + rd.y * select(t, tOut, rise);\n    let cg = shell_columnGap(k, slot);\n    let low = f32((bitcast<i32>(cg) << 16u) >> 16u) * c;\n    let top = select(f32(shell_top(e)) * c, low, shell_inGap(cg, yLo, yHi, c));\n    if (have && yLo <= top) {\n      let tTop = (top - ro.y) / rd.y;\n      let tFloor = (low - ro.y) / rd.y;\n      let ahead = !rise && tFloor >= t && tFloor <= tOut;\n      var tm = select(SHELL_BIG, tTop, !rise && tTop >= t);\n      if (tm >= SHELL_BIG && !(rise && shell_nearOwns(p, shell_baseMatter(e), dugFrom))) {\n        tm = min(shells_noWalkMeet(ro, rd, t, max(select(tOut, tFloor, ahead) - c * 2.4e-3, t), k, e, at), select(SHELL_BIG, tFloor, ahead));\n      }\n      if (tm < SHELL_BIG) {\n        t = tm;\n        met = true;\n        break;\n      }\n    }\n    t = tOut + 1e-3 * c;\n  }\n  h.steps = steps;\n  if (!met || t >= tStop) {\n    h.t = select(select(SHELL_BIG, tStop, tEnd >= tStop), tStop, met);\n    return h;\n  }\n  h.hit = true;\n  h.t = t;\n  h.n = SHELL_UP;\n  h.shell = k;\n  h.cell = shells_noWalkCell(k, ro, rd, t);\n  let m = shell_cellMatter(k, h.cell, e, at);\n  h.matter = select(m, shell_baseMatter(e), m == 0u);\n  h.column = e;\n  h.columnXZ = at;\n  return h;\n}`))"]},function(){return[()=>'(function($,Q,J=null){let V=g9(J);return Q.getRenderPipeline(V,function(){let{code:j,layout:Y}=t$($,Q,V,WV(J));let q=$.createShaderModule({label:V,code:j});return{label:V,layout:Y,vertex:{module:q,entryPoint:"vs"},fragment:{module:q,entryPoint:"fs",targets:y9()},multisample:{count:1}}},I6())})',()=>'(function($=null,Q=!1,J=!1){let V=Q?`  return ShellBandOut(${_$("out","lume_motionVector(clip, frame.prevViewProj * vec4f(P, 1.0))")}, clip.z / clip.w);`:`  return ShellBandOut(${_$("out")}, clip.z / clip.w);`;return L9(["//",_9,...Q?[R6]:[],v$(!1),a$,w6(2),b9,S6(),J?z7.replace(AQ,(FV??=$c0I(42))):z7,h6($,"passLights.sunDirection"),`struct ShellBandOut {\n${S7(Q)}\n${J?`  @location(${y9(Q).length}) hit: f32,`:"  @builtin(frag_depth) depth: f32,"}\n}\n@fragment\nfn fs(in: ShellBandVs) -> ShellBandOut {\n  let rd = shell_ray(in.position);\n  let ro = shells.eye.xyz;\n  let h = shells_coverBand(ro, rd, in.lo, in.hi, in.wall > 0.5, shells_bandStop(in.position));\n  if (!h.hit) {\n    discard;\n  }\n  let look = shell_look(ro, rd, h);\n  let P = frame.cameraPosition + rd * shell_distance(h);\n  let out = lume_surfaceMarkedAt(look.N, look.albedo, look.roughness, look.metalness, 1.0, look.emissive, shell_distance(h), shell_sky(h));\n  let clip = frame.viewProj * vec4f(P, 1.0);\n${V}\n}`],`\n`)})',()=>'(function($,Q,J=null,V=!1,j=!1,Y=!1,q=!1){let K=k8();if(j||K==="no-walk"||Q8()==="drawn")return L$($,Q,J,V,j,Y,q,K,I6());return L$($,Q,J,V,!1,Y,!1,"no-walk",void 0),L$($,Q,J,V,!1,Y,!1,K,I6({standIn:B8(J,V,Y,"no-walk")}))})',()=>'(function($,Q,J,V,j,Y,q,K,Z){let X=`${q9(J,V)}${q?"/split":""}`,D=j?X:B8(J,V,Y,K),M=j?1:T8();return Q.getRenderPipeline(D,function(){let{code:F,layout:B}=t$($,Q,D,j?OV(J,V,q):w7(HV(J,V,K),"fs",M));let A=$.createShaderModule({label:D,code:F});return{label:D,layout:B,vertex:j?{module:A,entryPoint:"vs",buffers:[{arrayStride:32,stepMode:"instance",attributes:[{shaderLocation:0,offset:0,format:"float32x4"},{shaderLocation:1,offset:16,format:"float32x4"}]}]}:{module:A,entryPoint:"vs"},fragment:{module:A,entryPoint:"fs",targets:j&&q?[...y9(V),{format:z6}]:y9(V,M),...Y&&!j?{constants:{[n$]:0}}:{}},primitive:{topology:"triangle-list",cullMode:j?"back":"none"},depthStencil:S$(j),multisample:{count:M}}},Z)})',()=>'(function($,Q,J=m$(),V,j=!1,Y=null){let q=m6(j,Y);J=t7(J,q);let K=J.programKey?`${q}/light/${p7(J)}`:q;if(J.programKey)v9($,Q,o7(),void 0,j,Y);i7(J,K);return Q.getRenderPipeline(K,function(){let{code:Z,layout:X}=t$($,Q,K,RV(J,j,Y));let D=$.createShaderModule({label:K,code:Z});return{label:K,layout:X,vertex:{module:D,entryPoint:"vs"},fragment:{module:D,entryPoint:"fs",targets:x7({motion:j})},depthStencil:S$(!0),multisample:{count:T8()}}},I6(n7(!1,a7(q,J,V))))})',()=>'(function($,Q){return Q.getComputePipeline("terrain/shells/march",()=>({label:"terrain shells march",layout:$.createPipelineLayout({label:"terrain shells march",bindGroupLayouts:[Q.getBindGroupLayout(l$,"terrain shells march")]}),compute:{module:$.createShaderModule({label:"terrain shells march",code:bV(r)}),entryPoint:"march"}}))})',()=>'(function($,Q){return Q.getComputePipeline("terrain/shells/copy",()=>({label:"terrain shells copy",layout:$.createPipelineLayout({label:"terrain shells copy",bindGroupLayouts:[Q.getBindGroupLayout(u9,"terrain shells copy")]}),compute:{module:$.createShaderModule({label:"terrain shells copy",code:wV}),entryPoint:"copy"}}))})']},function(){return[()=>"(()=>({words:new Uint32Array(f$),tops:new Float32Array(L*L).fill(-1/0),bottoms:new Float32Array(L*L).fill(1/0),topWords:new Uint32Array(E6),topWordsFor:new Float64Array(4).fill(NaN),cell:j9,x0:NaN,z0:NaN,revision:-1,set:null}))",()=>"(function($,Q){let J=$.topWordsFor;if(J[0]===$.revision&&J[1]===$.x0&&J[2]===$.z0&&J[3]===Q)return $.topWords;J[0]=$.revision,J[1]=$.x0,J[2]=$.z0,J[3]=Q;let V=$.topWords,j=(Y)=>Math.max(-32767,Math.min(32767,Math.round((Y-Q)*2)));for(let Y=0;Y<L*L;Y+=1){let q=(($.words[Y>>>5]??0)>>>(Y&31)&1)===1;let K=$.tops[Y]??-1/0;let Z=$.bottoms[Y]??1/0;let X=q&&F9(K)&&F9(Z);let D=X?j(Z):e8;let M=X?j(K):e8;V[Y]=(D&65535|(M&65535)<<16)>>>0}return V})",()=>"(function($,Q,J,V){let j=Q===null?-1:EJ(Q);let Y=$.set!==Q||$.revision!==j;let q=Y?iV(Q):$.cell;let K=q*Math.ceil(dV/q);let Z=L*q/2;let X=Math.floor(J/K)*K-Z;let D=Math.floor(V/K)*K-Z;if(!Y&&$.x0===X&&$.z0===D)return;if($.set=Q,$.revision=j,$.cell=q,$.x0=X,$.z0=D,$.words.fill(0),$.tops.fill(-1/0),$.bottoms.fill(1/0),Q===null)return;D0=$,s6(Q,nV),D0=null})",()=>"(function($,Q,J){let V=$.cell,j=L*V,Y=Math.min(Q-$.x0,$.x0+j-Q,J-$.z0,$.z0+j-J);if(!(Y>0))return 0;let q=Math.floor((Q-$.x0)/V),K=Math.floor((J-$.z0)/V);for(let Z=0;Z<L&&(Z-1)*V<Y;Z+=1)for(let X=K-Z;X<=K+Z;X+=1){if(X<0||X>=L)continue;let D=X===K-Z||X===K+Z;for(let M=q-Z;M<=q+Z;M+=D?1:2*Z){if(M<0||M>=L)continue;let F=X*L+M;if((($.words[F>>>5]??0)>>>(F&31)&1)===1)continue;let B=$.x0+M*V,A=$.z0+X*V,U=Math.max(B-Q,Q-B-V,A-J,J-A-V,0);if(U<Y)Y=U}}return Y})",()=>"(function($,Q,J,V,j,Y,q){let K=$?.cover??null,Z=$?.coverSlots??null;if($===void 0||K===null||Z===null)return 0;let X=$.cell*O,D=Y-X*Math.SQRT2/2,M=Math.min(_0,Math.floor(q.length/8)),F=J[0]??0,B=J[1]??0,A=J[2]??0,U=0;for(let P of Z){if(U>=M)break;let C=K[P]??0,G=$.key[P]??E;if(C===0||G===E)continue;let I=(G<<16>>16)*X,T=(G>>16)*X,N=Math.floor((I+X/2-Q.x0)/Q.cell),H=Math.floor((T+X/2-Q.z0)/Q.cell);if(N<0||H<0||N>=L||H>=L)continue;let z=H*L+N;if(((Q.words[z>>>5]??0)>>>(z&31)&1)===0)continue;let v=I+X/2+F-V,_=T+X/2+A-j;if(D>0&&v*v+_*_<D*D)continue;let b=U*8;q[b]=I+F,q[b+1]=((C&65535)-32768)*X+B,q[b+2]=T+A,q[b+3]=0,q[b+4]=I+X+F,q[b+5]=((C>>>16)-32768)*X+B,q[b+6]=T+X+A,q[b+7]=0,U+=1}return U})",()=>"(function($,Q,J,V,j,Y,q,K,Z){let X=Math.min(_0,Math.floor(K.length/8)),D=V[0]??0,M=V[1]??0,F=V[2]??0,B=Math.min(tV,$.length),A=Q.cell;for(let U=0;U<L&&Z<X;U+=1){let P=Q.z0+U*A;for(let C=0;C<L&&Z<X;C+=1){let G=Q.x0+C*A,I=U*L+C;if(((Q.words[I>>>5]??0)>>>(I&31)&1)!==1)continue;if(!(Math.max(G+D-j,j-G-D-A,P+F-Y,Y-P-F-A,0)<q))continue;let N=-1/0;for(let v=0;v<B;v+=1){let _=$[v];if(_===void 0)continue;let b=_.cell*O,F8=Math.floor((G+A)/b-0.000001),i=Math.floor((P+A)/b-0.000001);for(let w=Math.floor(P/b);w<=i;w+=1)for(let l=Math.floor(G/b);l<=F8;l+=1){let N9=(l&65535|(w&65535)<<16)>>>0,a0=(w%_.W+_.W)%_.W*_.W+(l%_.W+_.W)%_.W;if(N9===E||_.key[a0]!==N9)continue;let t0=(_.top[a0]??0)*_.cell;if(t0>N)N=t0}}let H=(Q.tops[I]??-1/0)-J+oV;if(!(N>H))continue;let z=Z*8;K[z]=G+D,K[z+1]=H+M,K[z+2]=P+F,K[z+3]=1,K[z+4]=G+A+D,K[z+5]=N+M,K[z+6]=P+A+F,K[z+7]=0,Z+=1}}return Z})",()=>"(function($,Q,J,V,j){let Y=0,q=0,K=!1;for(let Z=0;Z<J.n;Z+=1){let X=Q.entries[V+Z]??0;if(X===0)continue;let D=!1;if((X&a)!==0)D=$[X&65535]===1;else{let M=j[X-1]??0,F=2<<s8((Q.bricks[M]??0)&65535)-1;for(let B=1;B<F&&!D;B+=1)D=$[N0(Q.bricks,M,B)]===1}if(!D)continue;if(!K)Y=J.y0+Z;K=!0,q=J.y0+Z+1}return K?(Y+32768&65535|(q+32768&65535)<<16)>>>0:0})"]},function(){return[()=>'(function($){let Q=$.store(d9,()=>({byId:new Map,places:new Map,active:null,gpu:null,registered:!1,pool:{free:[[],[],[],[],[]],freeLater:[[],[],[],[],[]],next:0,used:0,bricksLive:0,ceiling:0},deviceUnits:0,held:!1,change:D5(),lists:{free:Array.from({length:20},()=>[]),freeLater:Array.from({length:20},()=>[]),next:0,base:0,words:0},dirFixedWords:0,dirFixedStart:0,shown:!1,lastBirth:0,landingWhole:!1,frameNow:0,fixedRoom:{at:0,end:0},spare:[],pairAt:new Map,upd:new Uint32Array(a6*2),updPairs:0,bricks:new Uint32Array(M9*y),brickSlots:new Uint32Array(M9),unitsStaged:0,thingsCleared:[],thingBlocks:{fresh:[],emptied:[]},thingsIn:new Map,thingsHeld:new Set,tones:new Float32Array(mV*r*4),tonesFor:{matters:-1,hash:"",layers:-1,albedo:-1,family:!1,scripted:-1},watched:null,looks:null,worn:{from:null,fromRevision:-1,toRevision:-1},occlusion:!0,drawGroup:null,scatterGroup:null,bricksGroup:null,remapOwed:null,remapSpent:[],moveOwed:null,moveSpent:[],staged:{bricks:yQ(),pairs:yQ()},horizon:{group:null,for:new Float64Array(10).fill(NaN),stood:new Float64Array(2).fill(NaN),run:new Uint32Array(4),said:!1},prep:{group:null,stripGroup:null,strip:new Uint32Array(1024),stripCount:0,stood:new Float64Array(2).fill(NaN),for:new Float64Array(5).fill(NaN),job:cV()},light:{group:null,landed:new Uint32Array(1024),landedCount:0,of:null,lays:0,said:0,run:{next:0,owed:0,sun:[0,0,0],lit:!1},job:iJ()},sweeps:{horizon:V0(),prep:V0(),read:-1},reach:{horizon:[],prep:[],runs:[],starts:new Float64Array(0),eyeShell:-1,stands:1/0,under:0},lowestTop:{placeId:"",k:-1,present:-1,landed:-1,metres:0},eyeLocal:[0,0,0],anchor:[0,0],liveWords:null,surfaceMemo:null,eyeCovered:!1,dirBehind:!1,computeMemo:null,compute:{desc:{dispatches:[]},horizonPass:{dispatches:[],measured:"",paced:"read"},prepPass:{dispatches:[],measured:"",paced:"read"},stripPass:{dispatches:[]},lightPass:{dispatches:[]},picturePass:{dispatches:[]},horizon:null,light:null,prep:null,strip:null,picture:null},draws:null,thingsGroup:null,litMemo:null,ground:null,over:null,overMemo:null,overAsked:null,wearsLook:!1,painted:!1,paintSaid:!1,armsAsked:null,...eV(),nearCover:HQ(),pictureCover:HQ(),eyeWorld:new Float64Array(3),landParked:!1,ladderParked:!1,parkedReach:0,parkedDepth:0,coverRevision:0,band:{boxes:new Float32Array(8*_0),count:0,buffer:null,capacity:0,toRender:new Float64Array(3),built:new Float64Array(10).fill(NaN)},bandMemo:null,frame:1,sunOwed:!1,sunSeen:new Float64Array(4).fill(NaN)}));if(!Q.registered){Q.registered=!0;oQ(d$);$.register({id:G0,lightFree:!0,ground:!0,prepare:(J)=>Z2($,Q,J),compute:(J)=>E2($,Q,J),lightCompute:(J)=>_2($,Q,J),captureRefit:(J)=>o2($,Q,J),mainDraws:(J)=>qY(Q,J)});}return Q})',()=>"(function($,Q,J){let V=BJ(J,Vj);if(V===null)return;let j=$j($);if(V.kind===h.shape)j.byId.set(Q,V.placeId);let Y=j.byId.get(Q);if(Y===void 0)return;let q;{let $=j,Q=Y;let J=$.places.get(Q);if(J===void 0)J={placeId:Q,shape:null,levels:[],matters:[null],queue:[],maxTop:-1e9,minBottom:1/0,landedTiles:0,refusedTiles:0,capTiles:void 0,capScale:1,move:null,wave:!1,drawBorn:null,eyeInLand:null,nearReach:null,thingTiles:0,saidAtMs:0,unsaid:!1,drainSaid:!1,coverMatters:new Uint8Array(1),liquids:new Uint8Array(1)},$.places.set(Q,J);q=J;}if(j.active!==q){if(j.active!==null)w0(j,j.active);j.active=q}if(V.kind===h.shape){{let Q$4=j,J$5=q;{let Q=Q$4,J=J$5;let j=V.centres!==null&&Uj(J.shape,V);if(j&&Q.gpu!==null&&J.levels.length>0){Gj(Q,Q.gpu,J,V);}else{let Y=j?Q4(J.queue,V):[];if(j)J.queue=[];if(J.wave=!j&&J.drawBorn!==null&&J.levels.length>0,!j&&J.move!==null)J.move.waved=!0;Pj(Q,J);e6($,Q);J.shape=V;J.levels=b0(V);S0(Q,J);J.queue=Y}if(nJ(V.placeId,V.fillFloor),Q.gpu!==null)Q.gpu.generation+=1}}}else if(V.kind===h.room)q.capTiles=V.cap,q.capScale=V.scale;else if(V.kind===h.reach)q.nearReach=V.top;else if(V.kind===h.eye)q.eyeInLand=V.at;else if(V.kind===h.move){d2($,j,q);}else if(V.kind===h.change){Zj(j,q,V);}else if(V.kind===h.forget||V.kind===h.land){Mj(q,V);}else if(V.kind===h.matters){if(qj(q,V.first,V.ids)){Kj($,j,q);}for(let K=0;K<V.ids.length;K+=1)q.matters[V.first+K]=V.ids[K]??null;q.coverMatters=lV(q.matters),j.tonesFor.matters=-1}else if(V.kind===h.thingRows){if(q.shape!==null)q.queue.push(V)}else if(q.shape!==null&&V.epoch===q.shape.epoch)q.queue.push(V);g8(1)})"]},function(){return[()=>"(function($,Q,J){if(__sc.info(`[shells] ${J.placeId}: the matter table moved under the standing tiles; they leave and the land fills again`),w0(Q,J),e6($,Q),J.shape!==null)J.levels=b0(J.shape),S0(Q,J);if(Q.gpu!==null)Q.gpu.generation+=1})",()=>'(function($){let Q=lJ($);if(!Q)return[];let J=[];for(let V of Q.places.values()){let j=V.shape;if(j===null||V.levels.length===0)continue;J.push({placeId:V.placeId,cell:j.cell,origin:[j.origin[0],j.origin[1],j.origin[2]],ids:V.matters.map((Y)=>Y??"")})}return J})',()=>"(function($,Q,J){if(J.epoch!==Q.shape?.epoch)return;let v$4;Xj:{let $$4=Q.queue,Q$5=J.words;{let $=$$4,Q=Q$5;for(let J of $){if(J.kind===h.change){v$4=!0;break Xj;}if(J.kind===h.thingRows||J.kind===h.things)continue;let V=W*O;for(let j=0;j+p.head<=Q.length;j+=p.head+(((Q[j]??0)&255)===p.stamp?Q[j+7]??0:0)){if((Q[j]??0)>>>16!==J.shell)continue;if(J.tx>=Math.floor(((Q[j+1]??0)|0)/V)&&J.tx<=Math.floor((((Q[j+4]??0)|0)-1)/V)&&J.tz>=Math.floor(((Q[j+3]??0)|0)/V)&&J.tz<=Math.floor((((Q[j+6]??0)|0)-1)/V)){v$4=!0;break Xj;}}}v$4=!1;}}if(v$4)Q.queue.push(J);else $.change.pending.push(J.words)})",()=>"(function($,Q,J){let V=Q.thingsHeld.size;for(let j of Q.thingsIn.keys()){if(Q.thingsHeld.has(j)||!JJ($,j))continue;Q.thingsHeld.add(j),k0($,j,!0)}if(Q.thingsHeld.size!==V)__sc.info(`[shells] things drawn by their cubes: ${Q.thingsHeld.size} of ${Q.thingsIn.size} in the layer (past ${(J.shape?.split??0).toFixed(0)} m)`)})",()=>"(function($,Q){let J=lJ($);if(!J)return;let V=J.byId.get(Q);if(V===void 0)return;J.byId.delete(Q);let j=J.places.get(V);if(j!==void 0)w0(J,j);if(j!==void 0)U6(j);if(dJ(V,!0),e6($,J),J.places.delete(V),J.active?.placeId===V)J.active=null;g8(1)})",()=>"(function($,Q){for(let J of Q.levels)for(let V=0;V<J.W*J.W;V+=1)o9($,J,V),T9($,J,V);R4($);Q.levels=[];h0(Q.queue);Q.queue=[];Q.maxTop=-1e9;Q.minBottom=1/0;$.updPairs=0;$.pairAt.clear();$.unitsStaged=0;q$($.change);q4($);$.thingsCleared=[];$.thingBlocks.fresh.length=0;$.thingBlocks.emptied.length=0})",()=>"(function($,Q){let J=$.filter(function(V){if(V.kind===h.thingRows||V.kind===h.change)return!0;if(V.shell>=Q.shells)return!1;let j=V.tx*W,Y=V.tz*W;return t6(Q,V.shell,j,Y)&&t6(Q,V.shell,j+W-1,Y+W-1)});if(J.length!==$.length)h0($.filter((V)=>!J.includes(V)));return J})",()=>"(function($,Q,J,V){let{dirFixedStart:j,dirFixedWords:Y}=$;let q;{let $$5=V;{let $=$$5;let Q=0,J=0;for(let V=0;V<$.shells;V+=1){let j=$.windows[V]??n;Q+=j*j,J+=(j/n)**2}q=Q*(4+d)+J*(M8+3)+Q/(W*W);}}let K=$.fixedRoom.at;if(q>$.fixedRoom.end-$.fixedRoom.at){if($.spare.push({at:$.fixedRoom.at,end:$.fixedRoom.end}),K=Math.ceil(($.lists.base+$.lists.next)/4)*4,$.fixedRoom={at:K,end:K+q},$.lists.next=K+q-$.lists.base,Q.dirWords<K+q+n9)f0($,Q,K+q+n9,!0)}let Z=b0(V,K),X=J.levels;J.levels.forEach(function(D,M){let F=Z[M];for(let B=0;B<D.W*D.W;B+=1){Tj(V,D,F,B);Ij(V,D,F,B);if(D.key[B]!==E)o9($,D,B);if(D.things.key[B]!==E)T9($,D,B)}});J$($);for(let D of Z)D.groupDirty.fill(1),D.groupsDirty=!0,D.things.groupDirty.fill(1),D.things.groupsDirty=!0;J.levels=Z;J.shape=V;J.queue=Q4(J.queue,V);{let Q$6=j,J$7=Y;{let Q=Q$6,J=J$7;let V=0;for(let j=0;j<$.updPairs;j+=1){let Y=$.upd[j*2]??0;if(Y>=Q&&Y<J)continue;$.upd[V*2]=Y,$.upd[V*2+1]=$.upd[j*2+1]??0,V+=1}$.updPairs=V,$.pairAt.clear();for(let j=0;j<V;j+=1)$.pairAt.set($.upd[j*2]??0,j)}}$.thingsCleared=[];{let J$8=X,V$4=Z;{let J=J$8,V=V$4;for(let j of J)for(let Y=0;Y<j.GW*j.GW;Y+=1){let q=j.things.blockAt[Y]??-1;if(q>=0)l9($,q,U9);j.things.blockAt[Y]=-1}$.thingBlocks.fresh.length=0,$.thingBlocks.emptied.length=0;for(let j of V){let Y=j.things;for(let q=0;q<j.GW*j.GW;q+=1){if((Y.inGroup[q]??0)===0)continue;let K=s9($,Q,U9);Y.blockAt[q]=K;for(let Z=0;Z<n*n;Z+=1){let X=Z4(j,q,Z);let D=Y.key[X]??E;let M=K+Z*4;if(k($,M,D),D===E)continue;k($,M+1,Y.yspan[X]??0),k($,M+2,(Y.listAt[X]??0)>>>0),k($,M+3,(Y.top[X]??0)&65535)}}}}}$.dirFixedStart=K;$.dirFixedWords=K+q;$4($,Q,J)})"]},function(){return[()=>"(function($,Q,J,V){let j=Q.things,Y=j.key[V]??E;if(Y===E||J===void 0)return;let q=Y<<16>>16,K=Y>>16;if(!t6($,Q.k,q,K))return;let Z=S(K,J.W)*J.W+S(q,J.W);J.things.key[Z]=Y,J.things.top[Z]=j.top[V]??0,J.things.yspan[Z]=j.yspan[V]??0,J.things.listAt[Z]=j.listAt[V]??-1,J.things.listClass[Z]=j.listClass[V]??0,J.things.bricks[Z]=j.bricks[V]??null,J.things.brickSpan[Z]=j.brickSpan[V]??0,J.things.present+=1;let X=r9(J,Z);J.things.inGroup[X]=(J.things.inGroup[X]??0)+1,j.key[V]=E,j.bricks[V]=null,j.listAt[V]=-1,j.present-=1})",()=>"(function($,Q,J,V=!1){let j=J4(Q,J.tx,J.tz);let Y=t(J.tx,J.tz);if(Q.bornTag[j]===Y)return;Q.bornTag[j]=Y;let q=$.shown&&!V?l6()/1000:0;if(q>0)$.lastBirth=q;if(Q.born[j]===q)return;Q.born[j]=q;k($,Q.birthBase+j,j4(q))})",()=>"(function($,Q,J){let V=Q.things;if(V.key[J]===E)return;z9($,Q.k,V.key[J]??E,!0);Y4($,V.bricks[J]??null,V.brickSpan[J]??0);V.bricks[J]=null;let j=V.listAt[J]??-1;if(j>=0)l9($,j,V.listClass[J]??0);V.listAt[J]=-1,V.key[J]=E,V.present-=1;let Y=r9(Q,J);if(V.inGroup[Y]=Math.max(0,(V.inGroup[Y]??0)-1),V.inGroup[Y]===0)$.thingBlocks.emptied.push({level:Q,g:Y});X4(Q,J)})",()=>"(function($,Q,J,V){let j=J.things,Y=r9(J,V);if(j.inGroup[Y]=(j.inGroup[Y]??0)+1,(j.blockAt[Y]??-1)>=0)return;let q=s9($,Q,U9);j.blockAt[Y]=q,$.thingBlocks.fresh.push({level:J,g:Y}),k($,j.base+Y*3+2,q+1)})",()=>"(function($,Q,J,V){let j=$.pool,Y=j.free[J]?.pop()??-1;for(let q=J+1;Y<0&&q<=4;q+=1){let K=j.free[q]?.pop();if(K===void 0)continue;Y=K,j.free[q-J]?.push(K+J)}if(Y<0){if(j.next+J>j.ceiling)return-1;if(Y=j.next,j.next+=J,j.next>Q.poolUnits)D4($,Q,j.next,V)}return j.used+=J,j.bricksLive+=1,Y})",()=>"(function($,Q,J,V){let j=0;for(let q=0;q<J.length;q+=AJ(J,q))j+=1;if(S8.length<j)S8=new Uint32Array(j*2);let Y=new Int32Array(j);for(let q=0,K=0;q<j;q+=1){let Z=s8((J[K]??0)&65535);let X=Ej($,Q,Z,V);if(X<0){for(let D=0;D<q;D+=1)Q$($,Y[D]??0);return null}Y[q]=X<<2|Z-1,S8[q]=K,K+=Z*y}return Y})",()=>"(function($,Q,J){$.lists.words+=1<<J;let V=$.lists.free[J]?.pop();if(V!==void 0)return V;for(let Y of $.spare){if(Y.end-Y.at<1<<J)continue;let q=Y.at;return Y.at+=1<<J,q}let j=$.lists.base+$.lists.next;if($.lists.next+=1<<J,$.lists.base+$.lists.next>Q.dirWords)f0($,Q,$.lists.base+$.lists.next,!0);return j})",()=>'(function($,Q,J,V){let j=$.held?1+L0:1.5,Y=Math.max(Q.dirWords,1024);while(Y<J)Y=Math.ceil(Y*j/64)*64;let q=x(Q.device,{label:"terrain shells directory",size:Y*4,usage:128|8|4},Q.mark);if(V){let Z=Q.device.createCommandEncoder({label:"terrain shells directory grows"});Z.copyBufferToBuffer(Q.dir,0,q,0,Q.dirWords*4),Q.device.queue.submit([Z.finish()])}let K=Q.dir;Q.device.queue.onSubmittedWorkDone().then(()=>R(K)),Q.dir=q,Q.dirWords=Y,Q.generation+=1})',()=>'(function($,Q,J,V){let j=Math.max(Q.poolUnits,C9);if($.held)j=Math.max(Math.ceil(j*(1+L0)),Math.ceil(Math.max(J,L8()?0:B4($,V))*(1+D9)));else while(j<J)j=Math.ceil(j*1.5);j=Math.min(j,$.pool.ceiling);let Y=x(Q.device,{label:"terrain shells pool",size:Math.max(16,j*y*4),usage:128|8|4},Q.mark),q=Q.device.createCommandEncoder({label:"terrain shells pool grows"});q.copyBufferToBuffer(Q.pool,0,Y,0,Q.poolUnits*y*4),Q.device.queue.submit([q.finish()]);let K=Q.pool;Q.device.queue.onSubmittedWorkDone().then(()=>R(K)),Q.pool=Y,Q.poolUnits=j,Q.generation+=1})']},function(){return[()=>'(function($,Q,J){if($.remapSpent.length>0){let T=$.remapSpent;$.remapSpent=[],Q.device.queue.onSubmittedWorkDone().then(()=>T.forEach((N)=>R(N)))}let V=Q.device,j=V.queue,Y=$.active;if(Y===null||Y.queue.length>0||$.remapOwed!==null||$.moveOwed!==null||$.unitsStaged>0||$.updPairs>0||Q.poolUnits<=C9)return;let q=Lj($);if(Q.poolUnits<=q*(1+A4($)))return;let K=Math.min($.pool.ceiling,Math.max(C9,q));if(K>=Q.poolUnits)return;if(N8(V,J).pipeline===null)return;let Z=new Uint8Array($.pool.next),X=0;for(let T of Y.levels)X+=WQ(T,T.W,Z)+WQ(T.things,T.W,Z);A5($.change,Z);let D=new Uint32Array(Math.max(4,$.pool.next)),M=x(V,{label:"terrain shells pool",size:Math.max(16,K*y*4),usage:128|8|4},Q.mark),F=V.createCommandEncoder({label:"terrain shells pool compacts"}),B=0;for(let T=0;T<$.pool.next;){if(Z[T]===0){T+=1;continue}let N=T,H=B;while(T<$.pool.next&&Z[T]===1)D[T]=B,T+=1,B+=1;F.copyBufferToBuffer(Q.pool,N*y*4,M,H*y*4,(T-N)*y*4)}j.submit([F.finish()]);P5($.change,D);let A=new Uint32Array(Math.max(4,X*2)),U=0;for(let T of Y.levels)U=OQ(T,T.W,D,A,OQ(T.things,T.W,D,A,U));let P=x(V,{label:"terrain shells remap",size:D.byteLength,usage:128|8},Q.mark);j.writeBuffer(P,0,D);let C=x(V,{label:"terrain shells remap lists",size:A.byteLength,usage:128|8},Q.mark);j.writeBuffer(C,0,A);let G=x(V,{label:"terrain shells remap count",size:16,usage:64|8},Q.mark);j.writeBuffer(G,0,new Uint32Array([X,0,0,zQ])),$.remapOwed={lists:X,buffers:[P,C,G]};let I=Q.pool;j.onSubmittedWorkDone().then(()=>R(I)),Q.pool=M,Q.poolUnits=K,Q.generation+=1,$.pool.next=B;for(let T of $.pool.free)T.length=0})',()=>"(function($,Q,J){let V=0;for(let j=0;j<Q*Q;j+=1){if($.key[j]===E)continue;V+=1;let Y=$.bricks[j]??null;if(Y===null)continue;let q=$.brickSpan[j]??0,K=(q&65535)+(q>>>16);for(let Z=q&65535;Z<K;Z+=1){J.fill(1,G9(Y[Z]??0),G9(Y[Z]??0)+p9(Y[Z]??0))}}return V})",()=>"(function($,Q,J,V,j){for(let Y=0;Y<Q*Q;Y+=1){if($.key[Y]===E)continue;let q=$.bricks[Y]??null;if(q!==null){let K=$.brickSpan[Y]??0,Z=(K&65535)+(K>>>16);for(let X=K&65535;X<Z;X+=1){q[X]=(J[G9(q[X]??0)]??0)<<2|(q[X]??0)&3}}V[j]=$.listAt[Y]??0,V[j+1]=($.yspan[Y]??0)>>>16,j+=2}return j})",()=>"(function($,Q){let J=Q?.capTiles;if(Q===null||J===null||J===void 0&&!$.held)return $.deviceUnits;let V=Math.min($.deviceUnits,Math.max(C9,Math.ceil($.pool.used*(1+D9))));if(J===void 0)return V;let j=0;for(let q=0;q<Q.levels.length;q+=1)j+=(Q.levels[q]?.present??0)+(Q.levels[q]?.things.present??0);if(j<256)return V;let Y=Math.ceil($.pool.used/j*J*W*W*(1+D9));return Math.min($.deviceUnits,Math.max(Y,Math.ceil($.pool.used*(1+D9))))})",()=>"(function($,Q){let J=$.active;if(J===null)return 0;let V=0,j=0;for(let Y=0;Y<J.levels.length;Y+=1){let q=J.levels[Y];if(q===void 0)continue;let K=q.present+q.things.present;if(j+=K,K>0||q===Q)V+=F4(q,J.capScale)}return j<256?0:Math.ceil($.pool.used/j*V)})",()=>"(function($,Q,J,V,j){for(let Y=0;Y<Q.key.length;Y+=1){let q=Q.listAt[Y]??-1;if(Q.key[Y]===E||q<0)continue;V[j.row]=q,V[j.row+1]=j.next,V[j.row+2]=1<<(Q.listClass[Y]??0),Q.listAt[Y]=j.next,k($,J(Y),j.next),j.row+=3,j.next+=1<<(Q.listClass[Y]??0)}})",()=>'(function($,Q){let J=LQ($.staged.bricks,Q.unitRoom,M9);if(J>0&&$.unitsStaged===0)$.bricks=new Uint32Array(J*y),$.brickSlots=new Uint32Array(J),R(Q.brickWords),R(Q.brickSlots),Q.brickWords=x(Q.device,{label:"terrain shells brick uploads",size:J*y*4,usage:128|8},Q.mark),Q.brickSlots=x(Q.device,{label:"terrain shells brick slots",size:J*4,usage:128|8},Q.mark),Q.unitRoom=J,Q.generation+=1;let V=LQ($.staged.pairs,Q.updPairs,a6);if(V>0&&$.updPairs===0)$.upd=new Uint32Array(V*2),R(Q.upd),Q.upd=x(Q.device,{label:"terrain shells uploads",size:V*8,usage:128|8},Q.mark),Q.updPairs=V,$.scatterGroup=null})']},function(){return[()=>"(function($,Q,J){if(J.kind===h.thingRows||J.kind===h.change)return!1;let V=Q.levels[J.shell];if(V===void 0)return!1;let j=V.W;for(let Y=0;Y<W*W;Y+=1){let q=S(J.tz*W+Math.floor(Y/W),j)*j+S(J.tx*W+Y%W,j);if(J.kind!==h.things&&V.landedFrame[q]===$.frame)return!0;if(J.kind!==h.tile&&J.kind!==h.land&&V.things.landedFrame[q]===$.frame)return!0}return!1})",()=>"(function($,Q,J){let V=Q.levels[J.shell];if(V===void 0)return;let j=V.W;for(let Y=0;Y<W*W;Y+=1){let q=J.tx*W+Y%W,K=J.tz*W+Math.floor(Y/W),Z=S(K,j)*j+S(q,j),X=t(q,K);if(V.key[Z]===X)o9($,V,Z),V.landedFrame[Z]=$.frame,k($,(V.slotBase+Z)*4,E);if(V.things.key[Z]===X)V.things.landedFrame[Z]=$.frame,T9($,V,Z),$.thingsCleared.push({level:V,s:Z})}})",()=>"(function($,Q,J,V){let j=fJ(V.fill);if(j===void 0)return!1;let Y=PJ(j.bytes);if(Y!==null)FJ(Y.entries,Y.bricks,V.first,V.to);if(Y!==null&&P4($,Q,J,{...Y,kind:h.tile,shell:V.shell,epoch:V.epoch,tx:V.tx,tz:V.tz}))J.landedTiles+=1;else J.refusedTiles+=1;return cJ(j),!0})",()=>"(function($,Q,J,V){let j=J.levels[V.shell];if(j===void 0)return!0;if(V.kind===h.things){return aj($,Q,J,j,V);}let Y=V.bricks.length>0?u0($,Q,V.bricks,j):K4;if(Y===null)return!1;Hj($,j,V,$.landingWhole);let q=0,K=0;for(let Z=0;Z<V.columns.length;Z+=1){let X=V.columns[Z];if(X===void 0)continue;if(X.kept!==!0){cj($,Q,J,j,V,Z,X,q,Y,K);}if(q+=X.n,X.covered===!0)K+=W8}return c0($,V.bricks,Y),!0})",()=>"(function($,Q,J,V){let j=Q.W,Y=S(V,j)*j+S(J,j);if(Q.key[Y]!==t(J,V))return;for(let Z=-1;Z<=1;Z+=1)for(let X=-1;X<=1;X+=1){let D=S(V+Z,j)*j+S(J+X,j),M=Q.key[D]===t(J+X,V+Z);kQ[(Z+1)*3+X+1]=M?Q.top[D]??g:g,bQ[(Z+1)*3+X+1]=M?Q.bottom[D]??g:g}let q=s0(kQ);if(Q.surface[Y]!==q)Q.surface[Y]=q,k($,Q.hotBase+Y*d+d8,q);let v$1;e0:{let $=bQ;for(let K=0;K<9;K+=1){let Z=$[K];r0[K]=A8(Z)?-Z:g}let Q=l0(r0),J=$[4];if(Q===null||!A8(J)){v$1=0;break e0;}let V=Math.abs(Q.sx)+1+Math.abs(Q.sz),j=Math.round((-Q.sx/V+1)/2*u8),Y=Math.round((-Q.sz/V+1)/2*u8),q=Math.min(32767,J+Q.depth);v$1=(j|Y<<8|(q-g&65535)<<16)>>>0;}let K=v$1;if(Q.under[Y]===K)return;Q.under[Y]=K,k($,Q.hotBase+Y*d+n8,K)})",()=>"(function($,Q,J,V,j,Y,q){if(J.cover===null)return;let K=Q.coverMatters.includes(1)?sV(Q.coverMatters,j,Y,q,S8):0;if(K===(J.cover[V]??0))return;if(J.cover[V]=K,K!==0)J.coverSlots?.add(V);else J.coverSlots?.delete(V);$.coverRevision+=1})",()=>"(function($,Q,J,V,j){let Y=j.bricks.length>0?u0($,Q,j.bricks,V):K4;if(Y===null)return!1;let{things:q,W:K}=V,Z=0;for(let X=0;X<j.columns.length;X+=1){let D=j.columns[X];if(D===void 0)continue;let M=j.tx*W+X%W,F=j.tz*W+Math.floor(X/W),B=S(F,K)*K+S(M,K),A=t(M,F);if(D.n===0){if(q.key[B]!==A)continue;q.landedFrame[B]=$.frame,T9($,V,B),$.thingsCleared.push({level:V,s:B});continue}q.landedFrame[B]=$.frame,T9($,V,B);let U=V6(D.n);let P=s9($,Q,U);let C=-1;let G=0;let I=!0;J.minBottom=Math.min(J.minBottom,U4(j,Z,D)*V.cell);for(let H=0;H<D.n;H+=1){let z=j.entries[Z+H]??0;if(z!==0&&(z&a)===0){if(C<0)C=z-1;else if(z-1!==C+G)I=!1;G+=1,z=g0(Y[z-1]??0)}$$($,P+H,z)}G4(q,B,Y,C,G,I,j,Z,D.n);Z+=D.n;q.key[B]=A;z9($,V.k,A,!0);q.top[B]=D.top;q.yspan[B]=(D.y0&65535|D.n<<16)>>>0;q.listAt[B]=P;q.listClass[B]=U;q.present+=1;Wj($,Q,V,B);let T=v0(V,B);k($,T,A),k($,T+1,D.y0&65535|D.n<<16),k($,T+2,P),k($,T+3,D.top&65535),X4(V,B);let N=D.top*V.cell;if(N>J.maxTop)J.maxTop=N}return c0($,j.bricks,Y),J.thingTiles+=1,!0})"]},function(){return[()=>"(function($,Q){let J=Q.things;if(!J.groupsDirty)return;J.groupsDirty=!1;let{W:V,GW:j}=Q,Y=J.base,q=[];for(let Z=0;Z<j*j;Z+=1){if(J.groupDirty[Z]===0)continue;J.groupDirty[Z]=0;let X=Z%j,D=Math.floor(Z/j),M=-1073741824,F=-1,B=!1,A=[1,0,1,0];for(let C=0;C<n;C+=1)for(let G=0;G<n;G+=1){let I=(D*n+C)*V+X*n+G,T=J.key[I]??E;if(T===E)continue;let N=T<<16>>16>>3,H=T>>16>>3;A0(A,N,H);let z=t(N,H);if(F===-1)F=z;else if(F!==z)B=!0;M=Math.max(M,J.top[I]??0)}J.groupSpan.set(A,Z*4);let U=M>>>0;if(F===-1)U=Y9>>>0;else if(B)U=s;let P=F===-1||B?0:F;if(J.groupWords[Z*2]!==U||J.groupWords[Z*2+1]!==P)q.push(Z);J.groupWords.set([U,P],Z*2),k($,Y+Z*3,U),k($,Y+Z*3+1,P)}let K=J.span;J.span=Q2(J.groupSpan);{let J$9=q,V$5=K;{let J=J$9,V=V$5;let{things:j,GW:Y}=Q;if(V[0]!==j.span[0]||V[1]!==j.span[1]){for(let q=0;q<Y*Y;q+=1)if(j.groupWords[q*2]===s)J.push(q)}for(let q of new Set(J)){$2:{let Q$11=Q.k,J$12=Y,V$9=q,j$5=V,Y$5=j.span;{let Q=Q$11,J=J$12,V=V$9,j=j$5,Y=Y$5;let q=[1/0,-1/0,1/0,-1/0];for(let M of[j,Y]){let F=M[0]??R8,B=M[1]??R8;if(F<<16>>16>F>>16)continue;q[0]=Math.min(q[0]??0,F<<16>>16),q[1]=Math.max(q[1]??0,F>>16),q[2]=Math.min(q[2]??0,B<<16>>16),q[3]=Math.max(q[3]??0,B>>16)}let[K=0,Z=-1,X=0,D=-1]=q;if(K>Z)break $2;for(let M=X+S(Math.floor(V/J)-X,J);M<=D;M+=J)for(let F=K+S(V%J-K,J);F<=Z;F+=J)$.reach.horizon.push(Q,F,M,3)}}}}}})",()=>"(function($){let Q=[1,0,1,0];for(let J=0;J<$.length;J+=4){if(($[J]??1)>($[J+1]??0))continue;A0(Q,$[J]??0,$[J+2]??0),A0(Q,$[J+1]??0,$[J+3]??0)}return(Q[0]??1)>(Q[1]??0)?[R8,R8]:[P0(Q[0]??0,Q[1]??0),P0(Q[2]??0,Q[3]??0)]})",()=>"(function($,Q,J){let V=Q.length/y;if(J.length===0||V===0)return;let j=$.unitsStaged+V;if(j>$.brickSlots.length){let q=$.brickSlots.length;while(q<j)q*=2;let K=new Uint32Array(q*y);K.set($.bricks.subarray(0,$.unitsStaged*y));let Z=new Uint32Array(q);Z.set($.brickSlots.subarray(0,$.unitsStaged)),$.bricks=K,$.brickSlots=Z}$.bricks.set(Q,$.unitsStaged*y);let Y=$.unitsStaged;for(let q=0;q<J.length;q+=1){let K=J[q]??0;for(let Z=0;Z<p9(K);Z+=1){$.brickSlots[Y++]=G9(K)+Z}}$.unitsStaged=j})",()=>'(function($,Q){let J=Q.device,V=J.queue,j=$.unitsStaged;if(j===0)return 0;if(j>$.staged.bricks.most)$.staged.bricks.most=j;if(j>Q.unitRoom){R(Q.brickWords),R(Q.brickSlots);let Y=Q.unitRoom;while(Y<j)Y*=2;Q.brickWords=x(J,{label:"terrain shells brick uploads",size:Y*y*4,usage:128|8},Q.mark),Q.brickSlots=x(J,{label:"terrain shells brick slots",size:Y*4,usage:128|8},Q.mark),Q.unitRoom=Y,Q.generation+=1}return V.writeBuffer(Q.brickWords,0,$.bricks,0,j*y),V.writeBuffer(Q.brickSlots,0,$.brickSlots,0,j),V.writeBuffer(Q.brickCount,0,new Uint32Array([j,0,0,IQ])),$.unitsStaged=0,q4($),j})',()=>'(function($,Q){let J=$.updPairs;if(J===0)return 0;if(J>$.staged.pairs.most)$.staged.pairs.most=J;if(J>Q.updPairs){R(Q.upd);let V=Q.updPairs;while(V<J)V*=2;Q.upd=x(Q.device,{label:"terrain shells uploads",size:V*8,usage:128|8},Q.mark),Q.updPairs=V,$.scatterGroup=null}return Q.device.queue.writeBuffer(Q.upd,0,$.upd,0,J*2),Q.device.queue.writeBuffer(Q.count,0,new Uint32Array([J,0,0,TQ])),$.updPairs=0,$.pairAt.clear(),$.frame+=1,$.lists.freeLater.forEach(function(V,j){for(let Y of V)$.lists.free[j]?.push(Y);V.length=0}),J})']},function(){return[()=>"(function($,Q){for(let J=0;J<$.thingsCleared.length;J+=1){let V=$.thingsCleared[J];if(V?.level.things.key[V.s]===E&&(V.level.things.inGroup[r9(V.level,V.s)]??0)>0)k($,v0(V.level,V.s),E)}$.thingsCleared.length=0;{let{fresh:Q,emptied:J}=$.thingBlocks;for(let V=0;V<Q.length;V+=1){let j=Q[V],Y=j===void 0?-1:j.level.things.blockAt[j.g]??-1;if(j===void 0||Y<0)continue;for(let q=0;q<n*n;q+=1){if(j.level.things.key[Z4(j.level,j.g,q)]===E)k($,Y+q*4,E)}}Q.length=0;for(let V=0;V<J.length;V+=1){let j=J[V];if(j===void 0||(j.level.things.inGroup[j.g]??0)>0)continue;let Y=j.level.things.blockAt[j.g]??-1;if(Y<0)continue;l9($,Y,U9),j.level.things.blockAt[j.g]=-1,k($,j.level.things.base+j.g*3+2,0)}J.length=0}for(let J=0;J<Q.levels.length;J+=1){let V=Q.levels[J];if(V===void 0)continue;oj($,V);lj($,V)}})",()=>"(function($,Q,J,V){let j=$.pool,Y=function(q){if(j.next+q>$.deviceUnits)return-1;let K=j.next;if(j.next+=q,j.used+=q,j.ceiling=Math.max(j.ceiling,j.next),j.next>Q.poolUnits)D4($,Q,j.next,V);return K};return{frame:$.frame,stageWord:(q,K)=>k($,q,K),listAlloc:(q)=>s9($,Q,q),freeList:(q,K)=>l9($,q,K),unitsRun:Y,unitsBack:(q)=>void(j.used-=q),layBrick:function(q){let K=u0($,Q,q,V)?.[0]??-1;if(K<0){let Z=s8((q[0]??0)&65535),X=Y(Z);if(X<0)return-1;K=X<<2|Z-1,j.bricksLive+=1}return c0($,q,Int32Array.of(K)),K},freeBrick:(q)=>Q$($,q),brickEntry:g0,markGroup:function(q,K){let Z=J.levels[q.k];if(Z!==void 0)m0(Z,K)},noteLanded:function(q,K){z4($,q.slotBase-V.slotBase+K);let Z=q.key[K]??E;z9($,q.k,Z);let X=J.levels[q.k];if(X!==void 0&&Z!==E){C4($,X,Z<<16>>16,Z>>16)}},noteTop:function(q){if(q>J.maxTop)J.maxTop=q}}})",()=>"(function($,Q,J,V){let j=$.change;if(j.pending.length===0)return;let Y=J.levels[0];if(Y===void 0||K$(V.device,V.pipelines).pipeline===null){g8(1);return}let q=q2($,Q,J,Y);while(j.pending.length>0){let K=j.pending[0];if(K!==void 0&&!U5(j,q,J.levels,K))break;j.pending.shift()}if(j.pending.length>0)g8(1)})",()=>"(function($,Q,J){if($.change.jobs.size===0&&$.change.copies.length===0)return hQ;let V=K$(J.device,J.pipelines).pipeline;if(V===null)return hQ;return T5($.change,Q.device,J.pipelines,V,Q.dir,Q.pool)})",()=>"(function(){let $=T4?.deref()??null,Q=C0?.deref()?.active??null;if($===null||Q===null)return null;let J=a9($)?.sun?.direction??null;return{sky:J===null?null:Math.asin(Math.min(1,Math.max(-1,J[1]??0)))*180/E8,field:I7(Q,J)}})",()=>'(function($,Q){let J=v8($);let V=V$($);let j=m4(J);let Y=Q.motionVectors===!0;let q=!i9(Q);let K=T8();let Z=Q.pipelines.picturePlayed===!0;let X=$.armsAsked;let D=$.active?.coverMatters.includes(1)===!0&&Q.lightOnce===!0;if(X?.pipelines===Q.pipelines&&X.arm===J&&X.owed===V&&X.motion===Y&&X.samples===K&&X.lit===q&&X.lighting===Q.lighting&&X.played===Z&&X.cover===D&&X.ahead===j){gQ(X,Q);return}let M=X?.pipelines===Q.pipelines?X.asks:void 0,F={pipelines:Q.pipelines,arm:J,owed:V,asks:V?void 0:J,motion:Y,samples:K,lit:q,lighting:Q.lighting,played:Z,cover:D,ahead:j,open:null,coveredAsked:!1};$.armsAsked=F;let{device:B,pipelines:A}=Q;if(Q8()==="drawn"){A.warmScope(function(){N8(B,A),u6(B,A)},Z?"picture":"arriving");return}if(j!==null)A.warmScope(function(){if(q){v9(B,A,Q.lighting,void 0,Y,j);return}if(e(B,A,j,Y,!1,!0),e(B,A,j,Y),D)e(B,A,j,Y,!0);if(D)e(B,A,j,Y,!0,!1,!0)},"late");A.warmScope(function(){if(N8(B,A),u6(B,A),q){if(!V)v9(B,A,Q.lighting,void 0,Y,J);return}if(Q.lightOnce===!0)R0(B,A);if(V)return;if(F.open=e(B,A,J,Y,!1,!0),!D)return;e(B,A,J,Y,!0),e(B,A,J,Y,!0,!1,!0)},Z?"picture":"arriving");gQ(F,Q);if(M!==void 0&&(V||M!==J)){D2(A,M,V?void 0:J,Y)}})']},function(){return[()=>'(function($,Q){let J=$.open;if(J===null||$.coveredAsked||lQ(J)===null&&!J.failed&&J.withdrawn!==!0)return;$.coveredAsked=!0,Q.pipelines.warmScope(()=>void e(Q.device,Q.pipelines,$.arm,$.motion),"late")})',()=>'(function($,Q,J,V){let j=(q)=>[B8(q,V,!0),B8(q,V),q9(q,V),`${q9(q,V)}/split`,m6(V,q),B8(q,V,!0,"no-walk"),B8(q,V,!1,"no-walk")],Y=J===void 0?[]:j(J);j(Q).forEach(function(q,K){let Z=$.peekRenderHandle(q),X=Y[K];if(Z!==void 0)$.supersedeQueued(Z,X===void 0?void 0:$.peekRenderHandle(X))})})',()=>'(function($,Q){if(Q.lightOnce!==!0||Q8()==="drawn")return;let J=v8($);let V=V$($);let j=m4(J);let Y=Q.pipelines.picturePlayed===!0;let q=$.overAsked;if(q?.pipelines===Q.pipelines&&q.generation===Q.pipelines.generation&&q.arm===J&&q.owed===V&&q.played===Y&&q.ahead===j)return;let K=q?.pipelines===Q.pipelines?q.asks:void 0;$.overAsked={pipelines:Q.pipelines,generation:Q.pipelines.generation,arm:J,owed:V,asks:V?void 0:J,played:Y,ahead:j};let Z=Y?"picture":"arriving";if(!V)Q.pipelines.warmScope(()=>CJ(Q.device,Q.pipelines),Z),Q.pipelines.warmScope(()=>v6(Q.device,Q.pipelines,J),Z);let X=K===void 0||!V&&K===J?void 0:Q.pipelines.peekRenderHandle(g9(K));if(X!==void 0)Q.pipelines.supersedeQueued(X,V?void 0:Q.pipelines.peekRenderHandle(g9(J)));if(j!==null)Q.pipelines.warmScope(()=>v6(Q.device,Q.pipelines,j),"late")})',()=>'(()=>(["terrain shells horizon","terrain shells light","terrain shells prep","terrain shells strip"]))',()=>'(function($,Q,J,V){let j=[$.horizon.group,$.light.group,$.prep.group,$.prep.stripGroup][V],Y=V===U0?Q.stripList:Q.lightList;if(j!==null&&j.generation===Q.generation&&j.tones===Q.tones&&j.light===Q.light&&j.list===Y)return j.group;let q=Q.device.createBindGroup({label:(B2??=$c0I(108))[V],layout:J.getBindGroupLayout(l$,"terrain shells march"),entries:[{binding:0,resource:{buffer:Q.uniform}},{binding:1,resource:{buffer:Q.dir}},{binding:2,resource:{buffer:Q.tones}},{binding:3,resource:{buffer:Q.light}},{binding:4,resource:{buffer:[Q.horizonJob,Q.lightJob,Q.prepJob,Q.stripJob][V]}},{binding:5,resource:{buffer:Y}},{binding:6,resource:{buffer:Q.horizon}},{binding:7,resource:{buffer:Q.pool}}]}),K={group:q,generation:Q.generation,tones:Q.tones,light:Q.light,list:Y};if(V===Z9)$.horizon.group=K;else if(V===m9)$.prep.group=K;else if(V===U0)$.prep.stripGroup=K;else $.light.group=K;return q})',()=>"(function($,Q){let J=$.computeMemo;if(J?.pipelines===Q.pipelines&&J.generation===Q.pipelines.generation&&J.device===Q.device)return J;let V={pipelines:Q.pipelines,generation:Q.pipelines.generation,device:Q.device,march:u6(Q.device,Q.pipelines)};return $.computeMemo=V,V})",()=>"(function($,Q,J,V){let j=B9[0]??0,Y=B9[1]??1,q=B9[2]??0,K=1/0;if($.lit&&Q)K=2*Math.asin(Math.min(1,Math.sqrt(($.sun[0]-j)**2+($.sun[1]-Y)**2+($.sun[2]-q)**2)/2));else if($.lit===Q)K=0;if($.lit=Q,$.sun[0]=j,$.sun[1]=Y,$.sun[2]=q,K>hJ||V>0)$.owed=J;else if(K>0)$.owed=Math.min(J,$.owed+J*K/SJ)})",()=>'(function($,Q,J,V,j,Y){let q=J.lightSlots,K=Q.light,Z=K.run;if(V.shape===null||q===0)return null;let X=a9($)?.sun??null,D=X?Math.sqrt(X.direction[0]**2+X.direction[1]**2+X.direction[2]**2):0,M=X!==null&&D>0.000001;B9[0]=M?-X.direction[0]/D:0,B9[1]=M?-X.direction[1]/D:1,B9[2]=M?-X.direction[2]/D:0,P2(Z,M,q,K.landedCount);let F=Z.owed>=Math.min(wJ,q)?Math.min(Math.floor(Z.owed),X0,q):0,B=K.landedCount;if(h8("shells-light",F+B>0?1:0),F+B===0)return null;let A=Y.pipeline;if(A===null)return null;if(B>J.lightListSlots){let C=J.lightListSlots;while(C<B)C*=2;R(J.lightList),J.lightList=x(J.device,{label:"terrain shells light list",size:C*4,usage:128|8|4},J.mark),J.lightListSlots=C}if(B>0)J.device.queue.writeBuffer(J.lightList,0,K.landed,0,B);let{f:U,u:P}=K.job;if(U[0]=Z.sun[0],U[1]=Z.sun[1],U[2]=Z.sun[2],U[3]=Z.lit&&Z.sun[1]>0?1:0,P[4]=Z.next,P[5]=F,P[6]=q,P[7]=B,P[8]=o$,P[9]=y0,P[10]=r$,J.device.queue.writeBuffer(J.lightJob,0,P),K.said!==K.lays)K.said=K.lays,__sc.info(`[shells] the far land\'s sky: ${q} columns, a frame\'s sweep at most ${X0} at the sun\'s pace and every column that lands`);return Z.next=(Z.next+F)%q,Z.owed-=F,K.landedCount=0,Q.compute.light=$6(Q.compute.light,A,e9(Q,J,j.pipelines,o$),F+B,"terrain/shells/light"),Q.compute.light.command})']},function(){return[()=>'(function($,Q,J){let V=$.moveOwed,j=V===null?null:N8(J.device,J.pipelines).pipeline;if(V===null||j===null)return null;$.moveOwed=null,$.moveSpent=V.buffers;let Y=Q.device.createBindGroup({label:"terrain shells move",layout:J.pipelines.getBindGroupLayout(u9,"terrain shells copy"),entries:[{binding:0,resource:{buffer:V.buffers[0]}},{binding:1,resource:{buffer:V.buffers[1]}},{binding:2,resource:{buffer:Q.dir}},{binding:3,resource:{buffer:V.buffers[2]}}]});return{pipeline:j,bindGroups:[Y],dispatch:d6(V.lists),debugLabel:"terrain/shells/move"}})',()=>'(function($,Q,J){let V=f*_8+n0(J)*b6;if(Q.horizonWords>=V)return;let j=Q.horizon;Q.horizon=x(Q.device,{label:"terrain shells horizon",size:V*4,usage:128|8|4},Q.mark),Q.horizonWords=V,Q.generation+=1,Q.device.queue.onSubmittedWorkDone().then(()=>R(j)),J$($)})',()=>"(function($,Q){let J=$.reach.horizon,V=$.sweeps.horizon,j=f;if(J.length===0)return;let Y=($.eyeLocal[0]??0)+($.anchor[0]??0);let q=($.eyeLocal[2]??0)+($.anchor[1]??0);let K=$.uniform.f[10]??0;let Z=I2($,Q,Y,q);let X=Q.levels.length-1;for(let D=0;D+3<J.length&&V.owedUnits<j;D+=4){let M=J[D]??0,F=Q.levels[M];if(F===void 0)continue;let B=J[D+3]??0,A=F.cell*O,U=B>=2?A*n:A,P=(J[D+1]??0)*U-Y,C=(J[D+2]??0)*U-q;if(B===0&&M<=$.reach.eyeShell&&P-A<=0&&P+U+A>=0&&C-A<=0&&C+U+A>=0){t9(V,j);break}let G=Math.max(Z[M]??0,B%2===1?K:0);if(!W4(V,P,C,U,A,G,M<X?F.reach*Q.capScale:1/0))break}J.length=0})",()=>"(function($,Q,J,V,j,Y,q){if(c9(Math.max(Math.abs(Q),Math.abs(Q+V)),Math.max(Math.abs(J),Math.abs(J+V)))+j<Y)return!0;let Z=c9(Math.max(0,Q,-(Q+V)),Math.max(0,J,-(J+V)));if(Z-j>q)return!0;let X=Q-j<=0&&Q+V+j>=0&&J-j<=0&&J+V+j>=0;if((X||Z-j<Y)&&V>j){let U=V/2;for(let P=0;P<4;P+=1)if(!W4($,Q+(P&1)*U,J+(P>>1)*U,U,j,Y,q))return!1;return!0}if(X)return t9($,f),!1;let D=f/G8,M=Math.atan2(J+V/2,Q+V/2),F=0,B=0;for(let U=0;U<4;U+=1){let P=Math.atan2(J+(U>>1)*V,Q+(U&1)*V)-M,C=P-G8*Math.round(P/G8);F=Math.min(F,C),B=Math.max(B,C)}let A=Math.floor((M+F+E8)*D)-1;return n6($,f,A,Math.floor((M+B+E8)*D)+1-A+1),!0})",()=>"(function($,Q,J,V){let j=$.reach,Y=Q.levels,q=j.starts.length>=Y.length?j.starts:j.starts=new Float64Array(Y.length),K=(($.uniform.u[1]??0)&j8)!==0?0:p$;j.eyeShell=Y.length;let Z=1/0,X=0,D=0,M=1/0,F=j.under;for(let B=0;B<Y.length;B+=1){q[B]=K;let A=Y[B];if(A===void 0)continue;let U=0.8*A.reach*Q.capScale,P=O4(A,J,V,U,F);if(P>0&&j.eyeShell>B)j.eyeShell=B;K=Math.min(U,Math.max(K,P));let C=Math.min(U,A.nearMiss[6]??P);if(B>0&&Math.max(M,C)<X)Z=Math.min(Z,Math.max(D,M,C));D=X,X=U,M=C}return j.stands=M<X?Math.min(Z,Math.max(D,M)):Z,q})",()=>"(function($,Q,J,V,j){let Y=$.nearMiss;if(Y[0]===Q&&Y[1]===J&&Y[2]===$.presenceRev&&Y[3]===V&&Y[5]===j)return Y[4]??0;let q=$.cell*O,K=$.W,Z=1/0,X=1/0;for(let D=Math.floor((J-V)/q);D<=Math.floor((J+V)/q);D+=1){let M=Math.max(0,D*q-J,J-(D+1)*q);if(M<X&&M<=V)for(let F=Math.floor((Q-V)/q);F<=Math.floor((Q+V)/q);F+=1){let B=c9(Math.max(0,F*q-Q,Q-(F+1)*q),M);if(B<X&&B<=V&&$.key[S(D,K)*K+S(F,K)]!==t(F,D)){if(Z=Math.min(Z,B),Math.max(Q-F*q,(F+1)*q-Q,J-D*q,(D+1)*q-J)>j)X=Math.max(j,B)}}}return Y.set([Q,J,$.presenceRev,V,Z,j,X]),Z})"]},function(){return[()=>"(function($,Q,J){let V=$.reach,j=V.prep,Y=$.sweeps.prep;if(j.length===0)return;let q=V.runs;q.length=0;for(let X=0;X+2<j.length;X+=3){let D=j[X]??0,M=j[X+1]??0,F=j[X+2]??0,B=q.length-5;if(B>=0&&q[B]===D&&Math.floor((q[B+1]??0)/W)===Math.floor(M/W)&&Math.floor((q[B+2]??0)/W)===Math.floor(F/W))q[B+1]=Math.min(q[B+1]??M,M),q[B+2]=Math.min(q[B+2]??F,F),q[B+3]=Math.max(q[B+3]??M,M),q[B+4]=Math.max(q[B+4]??F,F);else q.push(D,M,F,M,F)}j.length=0;let K=$.prep.job.i,Z=0;for(let X=0;X<Q.levels.length&&X<I8&&Y.owedUnits<J;X+=1){let D=Q.levels[X]?.W??0,M=K[12+2*X]??0,F=K[13+2*X]??0;for(let B=0;B+4<q.length;B+=5){let A=q[B]??0;if(A<X)continue;let U=2**(A-X),P=A===X?0:1,C=Math.max(M,(q[B+1]??0)*U-P),G=Math.max(F,(q[B+2]??0)*U-P),I=Math.min(M+D-1,((q[B+3]??0)+1)*U-1+P),T=Math.min(F+D-1,((q[B+4]??0)+1)*U-1+P);for(let N=G;N<=T&&C<=I;N+=1){N2(Y,J,Z+S(N,D)*D,D,C,I-C+1)}}Z+=D*D}})",()=>'(function($,Q,J){let V=$.sweeps,j=Q.graph;if(j.gpuClocked!==!0){V.horizon.step=-1,V.prep.step=-1;return}let Y=j.lastGpuReadRevision;if(Y===V.read)return;V.read=Y;let q=j.lastGpuMeasuredMs;let K=vQ(q,"horizon",f);let Z=vQ(q,"prep",J);let X=K<0?0:q.get(A9("horizon",K))??0;let D=Z<0?0:q.get(A9("prep",Z))??0;if(X>0)V.horizon.wholeMs=q0(K,X,f);if(D>0)V.prep.wholeMs=q0(Z,D,J);let M=K0.refreshMs??K0.periodMs??GJ,F=j.lastGpuReadEnvelopesMs,B=DJ(M,F.length>0?F[F.length-1]??0:0,X+D);if(Number.isNaN(B))return;if(K>=0)V.horizon.step=j0(K,X,f,Y0(B,V.horizon.wholeMs,V.prep.wholeMs),V.horizon.step);if(Z>=0)V.prep.step=j0(Z,D,J,Y0(B,V.prep.wholeMs,V.horizon.wholeMs),V.prep.step)})',()=>'(function($,Q,J,V,j,Y){$.prep.stripCount=0;let q=J.shape;if(q===null)return null;if(!Y)return null;let K=$.sweeps.prep,Z=n0(J);z2($,J,Z);if(j===null||V.unread===!0)return null;let X=$.prep.job;let D=$.eyeWorld[0]-q.origin[0];let M=$.eyeWorld[1]-q.origin[2];let F=H4(J,0);let B=G2($,Q,J,F);let A=!1;for(let P=0;P<I8;P+=1){let C=q.windows[P]??0,G=(J.levels[P]?.cell??q.cell*2**P)*O,I=P<q.shells?Math.floor(D/G)-C/2:0,T=P<q.shells?Math.floor(M/G)-C/2:0,N=X.i[12+P*2]??0,H=X.i[13+P*2]??0;if(N===I&&H===T)continue;X.i[12+P*2]=I;X.i[13+P*2]=T;A=!0;if(!B&&P<J.levels.length){x2($,W2(J,P),C,N,H,I,T)}}if(B)$.prep.for[0]=0,$.prep.for[1]=q.epoch??-1,$.prep.for[2]=Q.horizonWords,$.prep.for[3]=F,$.prep.for[4]=$.uniform.u[0]??0,t9(K,Z);let U=(B||A)&&!o6($.prep.stood,J,Q);if(U)$.prep.stripCount=0;else {O2($,Q,V,j,Z);}if(I0(K,Z,U)===0)return null;if(X.u[4]=K.runBase,X.u[5]=K.runUnits,X.u[6]=Z,Q.device.queue.writeBuffer(Q.prepJob,0,X.u),$.compute.prep=$6($.compute.prep,j,e9($,Q,V.pipelines,m9),K.runUnits,"terrain/shells/prep"),K.runUnits===Z)$.prep.stood[0]=q.epoch??-1,$.prep.stood[1]=Q.horizonWords;return $.compute.prep.command})',()=>'(function($,Q,J,V,j){let Y=$.prep.stripCount;if(Y===0)return;if(Y>Q.stripListSlots){let K=Q.stripListSlots;while(K<Y)K*=2;R(Q.stripList),Q.stripList=x(Q.device,{label:"terrain shells strip list",size:K*4,usage:128|8|4},Q.mark),Q.stripListSlots=K}Q.device.queue.writeBuffer(Q.stripList,0,$.prep.strip,0,Y);let q=$.prep.job;q.u[4]=0,q.u[5]=0,q.u[6]=j,q.u[7]=Y,Q.device.queue.writeBuffer(Q.stripJob,0,q.u),q.u[7]=0,$.compute.strip=$6($.compute.strip,V,e9($,Q,J.pipelines,U0),Y,"terrain/shells/strip")})']},function(){return[()=>"(function($,Q,J,V,j,Y,q){if(Math.abs(Y-V)>=J||Math.abs(q-j)>=J){r6($,Q,J*J);return}let K=Math.max(Y,V),Z=Math.min(Y,V)+J;for(let X=q;X<q+J;X+=1){let D=Q+S(X,J)*J;if(X<j||X>=j+J)r6($,D,J);else{if(Y<K){{let Q$8=D,V$6=Y,j$3=K-Y;{let Q=Q$8,V=V$6,j=j$3;let Y=S(V,J),q=Math.min(j,J-Y);if(r6($,Q+Y,q),q<j)r6($,Q,j-q)}}}if(Z<Y+J){{let Q$9=D,V$7=Z,j$4=Y+J-Z;{let Q=Q$9,V=V$7,j=j$4;let Y=S(V,J),q=Math.min(j,J-Y);if(r6($,Q+Y,q),q<j)r6($,Q,j-q)}}}}}})",()=>'(function($,Q,J,V,j,Y,q,K){if(J!==null&&J.generation===$.generation)return J;let Z=[j,Y,q,K].map((X,D)=>({binding:D,resource:{buffer:X}}));return{group:$.device.createBindGroup({label:V,layout:Q.getBindGroupLayout(u9,"terrain shells copy"),entries:Z}),generation:$.generation}})',()=>'(function($,Q,J){let{active:V,gpu:j}=Q;if(!V?.shape||j?.device!==J.device){sJ($),Q.parkedReach=0,Q.parkedDepth=0;return}v4($,Q,V,J);let Y=Q.compute.desc.dispatches;Y.length=0;let q=C2(Q,j,J);if(q!==null)Y.push(q);let K=Q.remapOwed,Z=K===null?null:N8(J.device,J.pipelines).pipeline;if(K!==null&&Z!==null){Q.remapOwed=null,Q.remapSpent=K.buffers;let A=j.device.createBindGroup({label:"terrain shells remap",layout:J.pipelines.getBindGroupLayout(u9,"terrain shells copy"),entries:[{binding:0,resource:{buffer:K.buffers[0]}},{binding:1,resource:{buffer:K.buffers[1]}},{binding:2,resource:{buffer:j.dir}},{binding:3,resource:{buffer:K.buffers[2]}}]});Y.push({pipeline:Z,bindGroups:[A],dispatch:d6(K.lists),debugLabel:"terrain/shells/remap"})}if(_Q(Q)){let A=N8(J.device,J.pipelines).pipeline;if(A!==null){Y.push(...K2(Q,j,J));let U=V2(Q,j);if(U>0){Y.push({pipeline:A,bindGroups:[(Q.bricksGroup=uQ(j,J.pipelines,Q.bricksGroup,"terrain shells bricks",j.brickWords,j.brickSlots,j.pool,j.brickCount)).group],dispatch:d6(U*y),debugLabel:"terrain/shells/bricks"});}let P=j2(Q,j);if(P>0){Y.push({pipeline:A,bindGroups:[(Q.scatterGroup=uQ(j,J.pipelines,Q.scatterGroup,"terrain shells scatter",j.upd,j.brickSlots,j.dir,j.count)).group],dispatch:d6(P),debugLabel:"terrain/shells/scatter"})}}else g8(1)}let X=!_Q(Q);if(Y.length>0)J.graph.addCompute("terrain/shells",Q.compute.desc);a2($,Q,V,J);U2(Q,j,V);let D=d0(Q,J),M=D.march.pipeline;H2(Q,J,n0(V));let F=L2(Q,j,V,J,M,X);if(F!==null){fQ(J,"terrain/shells/horizon",Q.compute.horizonPass,F,A9("horizon",Q.sweeps.horizon.runStep));}let B=R2(Q,j,V,J,M,X);if(Q.prep.stripCount>0&&Q.compute.strip!==null){let A=Q.compute.stripPass;A.dispatches.length=0,A.dispatches.push(Q.compute.strip.command),J.graph.addCompute("terrain/shells/strip",A)}if(B!==null){fQ(J,"terrain/shells/prep",Q.compute.prepPass,B,A9("prep",Q.sweeps.prep.runStep));}Q.uniform.f[13]=o6(Q.horizon.stood,V,j)?1:0;Q.uniform.f[23]=M!==null&&o6(Q.prep.stood,V,j)?1:0;j.device.queue.writeBuffer(j.uniform,0,Q.uniformWords);VY(Q,j,V,J);y2($,Q,j,V,J,D.march)})',()=>'(function($,Q,J,V,j,Y){let q=$.sweeps.horizon;if(!Y)return null;T2($,J);if(j===null||V.unread===!0)return null;let K=$.horizon.for,{u:Z,f:X}=$.uniform,D=K[0]!==$.eyeLocal[0]||K[1]!==$.eyeLocal[1]||K[2]!==$.eyeLocal[2],M=H4(J,Z[3]??0),F=D||K[3]!==M||K[4]!==(J.shape?.epoch??-1)||K[5]!==Z[0]||K[6]!==X[8]||K[7]!==X[9]||K[8]!==X[10]||K[9]!==J.capScale;if(F)K[0]=$.eyeLocal[0],K[1]=$.eyeLocal[1],K[2]=$.eyeLocal[2],K[3]=M,K[4]=J.shape?.epoch??-1,K[5]=Z[0]??0,K[6]=X[8]??0,K[7]=X[9]??0,K[8]=X[10]??0,K[9]=J.capScale,t9(q,f);if(I0(q,f,F&&(D||!o6($.horizon.stood,J,Q)))===0)return null;if(!$.horizon.said)$.horizon.said=!0,__sc.info(`[shells] the eye\'s horizon stands: ${f} wedges, each its steepest land and its free band, made again when the eye moves, and a wedge again when a column it reaches moves`);let B=$.horizon.run;if(B[0]=q.runBase,B[1]=q.runUnits,B[2]=f,Q.device.queue.writeBuffer(Q.horizonJob,16,B),$.compute.horizon=$6($.compute.horizon,j,e9($,Q,V.pipelines,Z9),q.runUnits*_6,"terrain/shells/horizon"),q.runUnits===f)$.horizon.stood[0]=J.shape?.epoch??-1,$.horizon.stood[1]=Q.horizonWords;return $.compute.horizon.command})']},function(){return[()=>'(function($,Q,J){let{active:V,gpu:j}=Q;if(!V?.shape||j?.device!==J.device)return;if(Q.sunOwed||!k2(Q.sunSeen,a9($)?.sun??null)){let K=C6(V);if(v4($,Q,V,J),C6(V)!==K)$.noteContentMoved("shells-sun")}let Y=N4($,Q,j,V,J,d0(Q,J).march);if(Y===null)return;let q=Q.compute.desc.dispatches;q.length=0,q.push(Y),J.graph.addCompute("terrain/shells",Q.compute.desc)})',()=>"(function($,Q,J,V,j,Y){let q=$.find((K)=>K!==void 0&&K.present>0)?.cell??0;for(let K=-1;K<=1;K+=1){for(let Z=-1;Z<=1;Z+=1){let v$5;w2:{let Q$10=Q+K*q,J$11=J-q,V$8=V+Z*q;{let Q=Q$10,J=J$11,V=V$8;for(let q=0;q<$.length;q+=1){let K=$[q];if(K===void 0||K.present<=0)continue;let Z=Math.fround(Math.fround(K.cell)*8),X=Math.floor(Math.fround(Math.fround(Q)/Z))+Math.round(j/(K.cell*8)),D=Math.floor(Math.fround(Math.fround(V)/Z))+Math.round(Y/(K.cell*8)),M=K.W,F=(D%M+M)%M*M+(X%M+M)%M,B=K.yspan[F]??0;if(B>>>16!==0&&K.key[F]===t(X,D)){v$5=Math.floor(Math.fround(Math.fround(J)/Z))<B<<16>>16&&(K.baseMatter[F]??0)!==0;break w2;}}v$5=!1;}}if(v$5)return!0;}}return!1})",()=>"(function($,Q,J,V,j){let Y=Math.max(Math.abs($-J8.x),Math.abs(J-J8.x)),q=Math.max(Math.abs(Q-J8.z),Math.abs(V-J8.z)),K=Math.max(Math.abs(j-J8.y),Math.abs(j-(J-$)-J8.y));J8.most=Math.max(J8.most,Math.sqrt(Y*Y+K*K+q*q))})",()=>"(function($,Q,J){if(!F9($.x0))return 0;let V=Math.max(0,Math.ceil((Q-y8-$.x0)/$.cell-0.5)),j=Math.min(L-1,Math.floor((Q+y8-$.x0)/$.cell-0.5)),Y=Math.max(0,Math.ceil((J-y8-$.z0)/$.cell-0.5)),q=Math.min(L-1,Math.floor((J+y8-$.z0)/$.cell-0.5)),K=0;for(let Z=Y;Z<=q;Z+=1)for(let X=V;X<=j;X+=1){let D=Z*L+X;K+=($.words[D>>>5]??0)>>>(D&31)&1}return K})",()=>"(function($,Q,J,V){let j=$.cell,Y=Math.max(0,Math.floor((Q-V-$.x0)/j)),q=Math.min(L-1,Math.floor((Q+V-$.x0)/j)),K=Math.max(0,Math.floor((J-V-$.z0)/j)),Z=Math.min(L-1,Math.floor((J+V-$.z0)/j)),X=1/0;for(let D=K;D<=Z;D+=1)for(let M=Y;M<=q;M+=1){let F=$.bottoms[D*L+M]??1/0;if(F<X)X=F}return X})",()=>'(function($,Q,J,V,j){let Y=vJ($.landParked,Q,J??0,V);$.parkedReach=mJ($.parkedReach,Y,j);let q=Y!==null&&Y>0;if(q&&$.parkedReach!==Y)g8(1);let K=Math.round(q?Y:$.parkedReach);if(K===c6||Math.abs(K-c6)*4<Math.min(K,c6))return;c6=K,__sc.info(K>0?`[shells] the view ends ${K} m round the eye, where the land stands`:"[shells] the far land draws: the view is whole")})',()=>"(function($,Q){if(Q.pictureUnseen===!0)return!1;let J=Q.motionVectors===!0,V=v8($);if(i9(Q)){let Y=$.surfaceMemo;if(p0($)||Y?.pipelines!==Q.pipelines||Y.generation!==Q.pipelines.generation||Y.arm!==V||Y.motion!==J||Y.samples!==T8())return!1;return Y.handle!==null&&Q.pipelines.drawable(Y.handle)!==null}let j=$.litMemo;if(j?.pipelines!==Q.pipelines||j.generation!==Q.pipelines.generation||j.lighting!==Q.lighting||j.motion!==J||j.arm!==V)return!1;return Q.pipelines.drawable(j.handle)!==null})",()=>"(function($,Q,J,V){let{u:j,f:Y,i:q}=$;for(let K=0;K<Q.levels.length;K+=1){let Z=Q.levels[K];if(Z===void 0)continue;let X=V9+Z.k*J9,D=Z.cell*8;j[X]=Z.W,j[X+1]=Z.slotBase,j[X+2]=Z.GW,j[X+3]=Z.groupBase,Y[X+4]=Z.cell,Y[X+5]=Z.reach*Q.capScale,Y[X+6]=1/Z.W,Y[X+7]=1/Z.GW,q[X+8]=Math.round(J/D),q[X+9]=Math.round(V/D),q[X+10]=Z.present>0?1:0,q[X+11]=Z.hotBase,q[X+12]=Z.things.present>0?Z.things.base:-1,q[X+13]=Z.things.span[0]??R8,q[X+14]=Z.things.span[1]??R8,q[X+15]=Z.birthBase}})"]},function(){return[()=>'(function($,Q,J,V){let j=$.horizon.for,Y=$.uniform.f;if(V&&j[0]===Y[4]&&j[1]===Y[5]&&j[2]===Y[6])return"live";let q=d0($,J).march.pipeline;if(q===null)return"none";let K=$.horizon.run;K[0]=0,K[1]=f,K[2]=f,Q.device.queue.writeBuffer(Q.horizonJob,16,K),$.compute.picture=$6($.compute.picture,q,e9($,Q,J.pipelines,Z9),f*_6,"terrain/shells/picture-horizon");let Z=$.compute.picturePass;return Z.dispatches.length=0,Z.dispatches.push($.compute.picture.command),J.graph.addCompute("terrain/shells/picture-horizon",Z),"own"})',()=>'(function($,Q,J){let V=E0($),j=V?.albedo.revision??-1,Y=$.painted&&$.looks?.gpu?.device===J.device?$.looks.gpu.handle.resource:Q.noPaint,q=$.drawGroup;if(q!==null&&q.generation===Q.generation&&q.albedo===j&&q.paint===Y&&q.pipelines===J.pipelines&&q.pipelinesGeneration===J.pipelines.generation)return q.group;let K=J.device.createBindGroup({label:"terrain shells",layout:J.pipelines.getBindGroupLayout(i$,"terrain shells"),entries:[{binding:0,resource:{buffer:Q.uniform}},{binding:1,resource:{buffer:Q.dir}},{binding:2,resource:{buffer:Q.pool}},{binding:3,resource:{buffer:Q.tones}},{binding:4,resource:V?.albedo.array.view??Q.noPictureView},{binding:5,resource:Q.sampler},{binding:6,resource:{buffer:V?.albedo.floorBuffer??Q.noFloors}},{binding:w9,resource:{buffer:Y}},{binding:k6,resource:{buffer:Q.horizon}}]});return $.drawGroup={group:K,generation:Q.generation,albedo:j,paint:Y,pipelines:J.pipelines,pipelinesGeneration:J.pipelines.generation},K})',()=>"(function($,Q,J,V,j,Y){if(j!==null)return{pipeline:$,bindGroups:[Q,J,V,j],draw:{vertexCount:3,instanceCount:1},thingsDepth:!0};if(Y!==null)return{pipeline:$,bindGroups:[Q,J,V,Y],draw:{vertexCount:3,instanceCount:1},nearDepth:!0};return{pipeline:$,bindGroups:[Q,J,V],draw:{vertexCount:3,instanceCount:1}}})",()=>"(function($,Q,J,V,j,Y,q,K=null,Z=null,X=null,D=null,M=null){let F=$.draws;if(F?.lit===Q&&F.pipeline===J&&F.frameGroup===V&&F.passGroup===j&&F.group===Y&&F.things===X&&F.ground===q&&F.over===K&&F.band===Z&&F.split===M&&F.near===D&&F.boxes===$.band.count&&F.boxBuffer===$.band.buffer)return F.draws;let B=e2(J,V,j,Y,X,D),A=$.band.buffer,U=Z===null||A===null||D===null?null:{pipeline:Z,bindGroups:[V,j,Y,D],vertexBuffers:[{buffer:A,size:$.band.count*32}],draw:{vertexCount:36,instanceCount:$.band.count},nearDepth:!0,...M!==null?{bandSplit:M}:{}},P=Q?{cutout:[B],landGround:q}:{surface:[B],surfaceMarks:!0,landGround:q,...K!==null?{landOver:K}:{}};if(U!==null&&!Q)P.surfaceCutout=[U];return $.draws={draws:P,lit:Q,pipeline:J,frameGroup:V,passGroup:j,group:Y,things:X,near:D,ground:q,over:K,band:Z,split:M,boxes:$.band.count,boxBuffer:A},P})",()=>'(function($,Q,J){let V=$.thingsGroup;if(V!==null&&V.gpu===Q&&V.pipelines===J.pipelines&&V.generation===J.pipelines.generation)return V.group;let j=J.device.createBindGroup({label:"terrain shells no things",layout:J.pipelines.getBindGroupLayout(x6,O6),entries:[{binding:0,resource:Q.noThingsView}]});return $.thingsGroup={group:j,gpu:Q,pipelines:J.pipelines,generation:J.pipelines.generation},j})',()=>'(function($,Q,J,V){if($.landParked||$.ladderParked||Q8()==="drawn")return null;if(Q.lightOnce!==!0)return null;let j=g9(V),Y=$.overMemo;if(Y?.pipelines!==Q.pipelines||Y.generation!==Q.pipelines.generation||Y.key!==j||Y.handle.withdrawn===!0)Y={pipelines:Q.pipelines,generation:Q.pipelines.generation,key:j,handle:v6(Q.device,Q.pipelines,V)},$.overMemo=Y;let q=Q.pipelines.drawable(Y.handle);if(q===null)return null;let K=$.over;if(K!==null&&K.pipeline===q&&K.group===J)return K;return $.over={pipeline:q,group:J},$.over})']},function(){return[()=>"(function($,Q,J,V){let j=$.bandMemo;if($.band.count===0||j?.arm!==J||j.motion!==V||j.split.withdrawn===!0)return null;return Q.pipelines.drawable(j.split)??(J===null?null:Q.pipelines.peekRenderPipeline(`${q9(null,V)}/split`))})",()=>'(function($,Q,J,V){let j=$.band,Y=J.shape,q=J.levels[0];if(Y===null||q===void 0||V.lightOnce!==!0||$.landParked||$.ladderParked||Q8()==="drawn"){j.count=0,j.built.fill(NaN);return}let K=V.renderOrigin??i0,Z=V.camera.position[0],X=V.camera.position[2],D=$.nearCover,M=$.uniform.f[11]??0,F=Math.max(($.uniform.f[16]??0)-($.uniform.f[17]??0),q.cell/(k9*Math.max($.uniform.f[9]??0,0.000000001))),B=j.built,A=Y.origin[0]-K[0],U=Y.origin[2]-K[2];if(B[0]===$.coverRevision&&B[1]===D.x0&&B[2]===D.z0&&B[7]===D.revision&&c9((B[3]??0)-Z,(B[4]??0)-X)<f6&&Math.abs((B[5]??0)-F)<f6&&B[6]===A+U&&B[8]===J.landedTiles&&Math.abs((B[9]??0)-M)<f6)return;B[0]=$.coverRevision,B[1]=D.x0,B[2]=D.z0,B[3]=Z,B[4]=X,B[5]=F,B[6]=A+U,B[7]=D.revision,B[8]=J.landedTiles,B[9]=M,j.toRender[0]=A,j.toRender[1]=Y.origin[1]-K[1],j.toRender[2]=U;let P={words:D.words,tops:D.tops,cell:D.cell,x0:D.x0-Y.origin[0],z0:D.z0-Y.origin[2]},C=rV(J.levels,P,Y.origin[1],j.toRender,Z,X,M,j.boxes,aV(q,P,j.toRender,Z,X,F-f6,j.boxes));if(j.count=C,C===0)return;for(let G=0;G<C;G+=1)j.boxes[G*8+7]=q.cell;if(j.buffer===null||j.capacity<C)R(j.buffer),j.capacity=Math.max(64,2**Math.ceil(Math.log2(C))),j.buffer=x(Q.device,{label:"terrain shells band",size:j.capacity*32,usage:32|8},Q.mark);Q.device.queue.writeBuffer(j.buffer,0,j.boxes.buffer,0,C*32)})',()=>'(function($,Q,J,V){if($.dirBehind&&!$.eyeCovered)return Q8()==="drawn"?null:Q.pipelines.peekRenderPipeline(B8(J,V));let j=h4($,Q,J,V);if(j===null)return null;let Y=Q.pipelines.drawable(j);if(Y===null&&!p0($)&&Q8()==="drawn")Q.pipelines.noteSkippedDraw(j);return Y})',()=>'(function($,Q,J,V){let j=$.surfaceMemo,Y=T8();if(j?.pipelines!==Q.pipelines||j.generation!==Q.pipelines.generation||j.arm!==J||j.motion!==V||j.samples!==Y||j.handle?.withdrawn===!0||j.covered?.withdrawn===!0){if(Q.lightOnce===!0)R0(Q.device,Q.pipelines);j={pipelines:Q.pipelines,generation:Q.pipelines.generation,arm:J,motion:V,samples:Y,handle:$.eyeCovered?null:e(Q.device,Q.pipelines,J,V,!1,!0),covered:null},$.surfaceMemo=j}if(!$.eyeCovered)return j.handle??=e(Q.device,Q.pipelines,J,V,!1,!0);if(Q8()==="drawn")return null;return j.covered??=e(Q.device,Q.pipelines,J,V)})',()=>"(function($,Q,J,V){let j=$.litMemo,Y=j;if(Y?.pipelines!==Q.pipelines||Y.generation!==Q.pipelines.generation||Y.lighting!==Q.lighting||Y.motion!==V||Y.arm!==J||Y.handle.withdrawn===!0)Y={pipelines:Q.pipelines,generation:Q.pipelines.generation,lighting:Q.lighting,motion:V,arm:J,handle:v9(Q.device,Q.pipelines,Q.lighting,j?.lighting,V,J)},$.litMemo=Y;return Y.handle})",()=>'(function($,Q){let{gpu:J,active:V}=$;if(J?.device!==Q.device||!V?.shape)return;let j=Q8()==="drawn";if(j&&Q.pictureUnseen===!0)return;if(!S4(V.levels)){YY:{if(V$($))break YY;let J=Q.motionVectors===!0,V=v8($),j=i9(Q),Y=j?h4($,Q,V,J):g4($,Q,V,J);if(Q.motionFrameId===void 0||Y===null)break YY;let q=nQ.get($),K=j?Q.pipelines.peekRenderHandle(B8(V,J,!$.eyeCovered,"no-walk")):void 0;if(nQ.set($,{pipelines:Q.pipelines,motion:J,handle:Y,first:K}),q?.pipelines!==Q.pipelines||q.motion===J||q.handle===Y)break YY;if(Q.pipelines.supersedeQueued(q.handle,Y),q.first!==void 0&&q.first!==q.handle)Q.pipelines.supersedeQueued(q.first,K??Y)}return}if(V$($))return;let Y=s2($,J,Q);let q=Q.passBindGroup??jJ(Q.device,Q.pipelines);if(i9(Q)){let F=v8($),B=Q.motionVectors===!0,A=jY($,Q,F,B);if(F!==null&&A!==null&&!$.paintSaid)$.paintSaid=!0,__sc.info("[shells] the painted text draws: the near ground\'s paint at every distance");let U=A??(F===null||j?null:Q.pipelines.peekRenderPipeline(B8(null,B,!p0($))));if(U===null)return;V.drawBorn??=$.shown?$.frameNow:0;let P;QY:{let J=F,V=B;if($.band.count===0||$.band.buffer===null){P=null;break QY;}let j=$.bandMemo;if(j?.pipelines!==Q.pipelines||j.generation!==Q.pipelines.generation||j.arm!==J||j.motion!==V||j.handle.withdrawn===!0||j.split.withdrawn===!0)j={pipelines:Q.pipelines,generation:Q.pipelines.generation,arm:J,motion:V,handle:e(Q.device,Q.pipelines,J,V,!0),split:e(Q.device,Q.pipelines,J,V,!0,!1,!0)},$.bandMemo=j;P=Q.pipelines.drawable(j.handle)??(J===null?null:Q.pipelines.peekRenderPipeline(q9(null,V)));}return cQ($,!1,U,Q.frameBindGroup,q,Y,pQ($,J),$Y($,Q,Y,F),P,null,dQ($,J,Q),P===null?null:JY($,Q,F,B))}let K=Q.motionVectors===!0,Z=v8($),X=g4($,Q,Z,K),D=Q.pipelines.drawable(X);if(D===null&&j)Q.pipelines.noteSkippedDraw(X);let M=D??(Z===null||j?null:Q.pipelines.peekRenderPipeline(m6(K,null)));if(M===null)return;return V.drawBorn??=$.shown?$.frameNow:0,cQ($,!0,M,Q.frameBindGroup,q,Y,pQ($,J),null,null,dQ($,J,Q))})']},function(){return[()=>"(()=>({stamp:-1,revision:-1,set:null,visit:function($){if((b8??=$c0I(147)).set!==null)yJ((b8??=$c0I(147)).set,$)}}))",()=>'(function($,Q,J,V){if(Q.sunOwed=!1,!QJ()){h8("shells-sun",0);return}let j=a9($)?.sun??null,Y=Y8($)?.voxelBuckets??null,q=Y===null?-1:xJ(Y);if((b8??=$c0I(147)).stamp=q,(b8??=$c0I(147)).revision=Y===null?-1:Y.contentRevision,(b8??=$c0I(147)).set=Y,j!==null)e$.way=j.direction,e$.casts=j.castsShadow;Q.sunSeen[0]=j===null?NaN:j.direction[0],Q.sunSeen[1]=j===null?NaN:j.direction[1],Q.sunSeen[2]=j===null?NaN:j.direction[2],Q.sunSeen[3]=j?.castsShadow===!0?1:0,H8??={device:V.device,eye:$0,renderOrigin:$0,sun:null,near:null,clock:I9,parked:!1},H8.device=V.device,H8.eye=V.camera.position,H8.renderOrigin=V.renderOrigin??$0,H8.sun=j===null?null:e$,H8.near=Y===null||q<0?null:(b8??=$c0I(147)),H8.parked=P9();let K=T7(J,H8);void 0,(b8??=$c0I(147)).set=null,Q.sunOwed=K,h8("shells-sun",K?1:0)})',()=>"(function($,Q){let J=C6($.active);if($.ground?.uniform!==Q.uniform||$.ground.directory!==Q.dir||$.ground.light!==Q.light||$.ground.pool!==Q.pool||($.ground.sun??null)!==J)$.ground={uniform:Q.uniform,directory:Q.dir,light:Q.light,pool:Q.pool,...J===null?{}:{sun:J}};return $.ground})",()=>'(function($,Q){Q.saidAtMs=I9(),Q.unsaid=!1;let J=$.pool.bricksLive;__sc.info(`[shells] the renderer stands ${Q.landedTiles} tiles (${Q.refusedTiles} refused, ${Q.queue.length} waiting): columns a shell ${Q.levels.map((V)=>V.present).join(" ")}, thing columns ${Q.levels.map((V)=>V.things.present).join(" ")} (${Q.thingTiles} thing tiles), the land\'s band ${Q.minBottom.toFixed(0)} to ${Q.maxTop.toFixed(0)} m, pool ${J} bricks (${($.pool.used*y*4/1048576).toFixed(1)} MiB of ${($.pool.ceiling*y*4/1048576).toFixed(0)}), directory ${(($.gpu?.dirWords??0)*4/1048576).toFixed(1)} MiB${$.change.raw.size===0?"":`, ${$.change.raw.size} bricks changed in place (${($.change.raw.size*O8*y*4/1024).toFixed(0)} KB of the pool)`}`)})',()=>'(function($,Q,J,V,j){let Y=m8();if(Y===null||typeof V!=="object"||V===null||!(("tones"in V)||("pattern"in V)))return 0;let{overrides:q}=W0(V,J),K=O0(J,q,0),Z=Y.resolveVoxelSurfaceLook(V,{rgb:[K.color.r,K.color.g,K.color.b],roughness:K.roughness,metalness:K.metalness});if(Z===null)return 0;let X=$.looks??=Y.createVoxelSurfaceTable(),D=Y.setVoxelSurfaceLook(X,`${Q}\\x00${J}`,JSON.stringify(["tones"in V?V.tones:null,"pattern"in V?V.pattern:null,K.color,K.roughness,K.metalness]),Z);if(D===null)return 0;let M=Y.resolveVoxelGrowth("growth"in V?V.growth:void 0),F=M===null?null:Y.voxelGrownRows(M,D.look,Y.voxelSurfaceClassMeans(X,D.row));if(F!==null&&j)F[3]=1;return Y.setVoxelSurfaceGrown(X,D.row,F),D.row})',()=>'(function($,Q){let J=$.looks,V=m8();if(!$.painted||J===null||V===null)return;let j=$.watched?.surface??null,Y=j?.appear??1;if(J.data[0]!==Y)J.data[0]=Y,J.appear=Y,J.dirty??="head";let q=$.worn;if(j!==null&&(q.from!==j||q.fromRevision!==j.grownRevision||q.toRevision!==J.grownRevision))V.wearVoxelSurfaceGrown(J,j),q.from=j,q.fromRevision=j.grownRevision,q.toRevision=J.grownRevision;else if(j===null&&J.grown!==null&&J.data[5]!==Math.fround(s$))J.data[5]=s$,J.data[6]=Math.log(pJ/s$),J.data[7]=0,J.dirty="rows";if(J.dirty!==null||J.gpu?.device!==Q)V.flushVoxelSurfaceTable(J,Q)})']}],$c0XU=[0,6,13,20,25,31,39,44,47,54,61,63,71,80,87,94,99,105,113,119,123,127,135,141,147];var $c0S,$c0D=()=>eval($c0S);function $c0E(s){$c0S=s;return $c0D()}$c0C=$c0K($c0T,$c0XU,$c0E,153,4140160081985536);var $c0I=$c0C.i;
;const{$5r:K0,$HD:H0,AJG:JJ,AZn:z6,AyU:w$,B1m:n,B4L:s7,C5q:jJ,CDb:iQ,DQE:o5,DUj:BJ,E$D:S7,E4W:t5,E9O:_7,E9X:g$,EBB:h8,EiQ:V5,F9f:mJ,FIK:a5,FKD:lQ,FdJ:u$,GAa:T0,Ggy:_9,H_q:dJ,HfE:p8,I0b:a9,I53:nJ,IBc:H$,IF2:x6,IGF:L7,JDf:Y5,JHy:l7,JK_:R,Jai:L9,Jrc:VJ,K6Z:$J,KdH:S$,KwY:h$,L$P:x,LHL:FJ,LiF:CJ,MfU:x7,MwH:rQ,N0E:m$,O83:UJ,P2_:t7,PBV:W$,PvR:n7,QVV:r5,QbK:tQ,S5f:z0,SHf:uJ,T0i:R0,T6H:s8,TAf:f7,TLI:s5,TQj:k9,TjB:N6,U4E:O7,UWA:i9,UcB:l6,V$Z:i6,VaQ:p6,Weq:eQ,X46:N5,X4S:w7,X9N:Q0,XK8:y9,YWT:m,YZe:l5,ZKu:O6,_fd:h,_pM:qJ,_rr:W7,aa6:PJ,agR:l8,apl:y7,arW:u7,b8u:y8,baH:G8,bcH:e7,d17:oQ,dD4:ZJ,dxM:_$,eW_:Q8,eX6:E9,eYb:b7,e_R:N0,eyR:G0,f8q:A9,fX9:i7,fZM:sQ,gFg:Y8,gU_:j6,h1y:F9,hrB:MJ,jJo:v$,jM0:GJ,jnb:KJ,jqS:R7,jub:X6,kQP:T8,kxb:h7,lKR:H6,leN:I8,lyN:J0,mXM:fJ,mq1:m7,mum:AJ,myS:a7,mz2:QJ,nvi:R6,oAB:p7,oge:cJ,q0m:R$,qCS:c7,raX:g7,rc1:E7,rj3:YJ,sFA:d7,sWM:W8,t$F:P9,taY:c9,ts0:E8,u6h:L8,ueV:o7,vcF:v7,wRZ:c,x12:vJ,xR1:I9,xv5:W6,xzy:bJ,yfJ:k7,ynR:S,z2Z:g8,z8j:k$,zYm:p,zfZ:aQ}=$Lr;var __sc=/*@__PURE__*/(()=>globalThis.__spawnEngineConsole??=Object.create(console))();
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;var d=4,c8=($,Q)=>($&65535|(Math.min(Q,$)&65535)<<16)>>>0,d8=2,n8=3,u8=255,f8=1023,Q6=20,u4=4095,f4=2,A8=($)=>$!==void 0&&$>g;function o0(a){return (o0=$c0C(0)).call(this,a)}function l0(a){return (l0=$c0C(1)).call(this,a)}function s0($){let Q=l0($);if(Q===null)return 0;let J=Math.abs(Q.sx)+1+Math.abs(Q.sz),V=Math.round((-Q.sx/J+1)/2*f8),j=Math.round((-Q.sz/J+1)/2*f8);return(V|j<<10|Q.depth<<Q6)>>>0}var r0=new Int32Array(9);var Z5=($)=>($+1|j$<<24)>>>0;var n4=4096;var J6=8;var p4=32767;var X5=-32768;var i4=4294967295;var D5=()=>({raw:new Map,columns:new Map,free:[],freeLater:[],pending:[],records:new Uint32Array(1024),recordWords:0,jobs:new Map,copies:[],stood:new Map,placed:new Map,laid:new Map,gpu:null,bricks:0});var R9=($,Q,J,V)=>`${$}:${Q}:${J}:${V}`;var M5=($,Q,J)=>`${$}:${Q}:${J}`;var t=($,Q)=>($&65535|(Q&65535)<<16)>>>0;var $5=($)=>Math.max(-32768,Math.min(32767,$))&65535;var B5=($,Q)=>($5($)|$5(Q)<<16)>>>0;var V6=function($){let Q=0;while(1<<Q<$)Q+=1;return Q};var Y$=($)=>$&65535&~(q8|i8);function q$($){$.raw.clear(),$.columns.clear(),$.free=[],$.freeLater=[],$.pending.length=0,$.recordWords=0,$.jobs.clear(),$.copies.length=0,$.stood.clear(),$.placed.clear(),$.laid.clear()}function F5(a,b,c,d,e){return (F5=$c0C(2)).call(this,a,b,c,d,e)}function A5($,Q){for(let J of $.raw.values())Q.fill(1,J.unit,J.unit+O8);for(let J of $.placed.values())Q.fill(1,J>>>2,(J>>>2)+(J&3)+1)}function P5($,Q){for(let[J,V]of $.raw)$.raw.set(J,{unit:Q[V.unit]??0,fresh:V.fresh});for(let[J,V]of $.placed)$.placed.set(J,((Q[V>>>2]??0)<<2|V&3)>>>0);$.free=[],$.freeLater=[]}function C5($,Q){let J=$.stood.get(Q.id);if(J===void 0){let V=Q.level.yspan[Q.s]??0,j=V<<16>>16;$.stood.set(Q.id,J={y0:j,n:V>>>16,at:Q.level.listAt[Q.s]??-1,hole:j===g})}return J}function a4($,Q){if((($[Q]??0)&p.packed)!==0)return!1;let J=$[Q+7]??0;for(let V=0;V<J;V+=1){let j=$[Q+p.head+V]??0;if(j!==p.skip&&(j&65535)!==0)return!0}return!1}function t4($,Q,J,V){let{level:j,s:Y}=J,q=j.yspan[Y]??0,K=q<<16>>16,Z=q>>>16,X=V.hole&&K===g,D=X?J.lo:Math.min(K,J.lo),M=(X?J.hi+1:Math.max(K+Z,J.hi+1))-D;if(M>n4)return!1;if(!X&&D===K&&M===Z)return!0;let F=j.baseMatter[Y]??0;let B=Y$(F);let A=(F&q8)!==0;let U=V6(M+(A?W8:0));let P=Q.listAlloc(U);let C=B===0?0:(a|B)>>>0;for(let I=D;I<D+M;I+=1){if(!V.hole&&I>=V.y0&&I<V.y0+V.n)continue;Q.stageWord(P+(I-D),!V.hole&&I<V.y0?C:0)}if(!V.hole){if($.copies.push(V.at,P+(V.y0-D),V.n),A)$.copies.push(V.at+V.n,P+M,W8)}let G=j.listAt[Y]??-1;if(G>=0)Q.freeList(G,j.listClass[Y]??0);j.listAt[Y]=P;j.listClass[Y]=U;j.yspan[Y]=(D&65535|M<<16)>>>0;Q.stageWord((j.slotBase+Y)*4+1,j.yspan[Y]??0);Q.stageWord((j.slotBase+Y)*4+2,P);if(B===0&&!V.hole&&D<K){j.gap[Y]=B5(X5,D*O);}for(let I of $.columns.get(J.id)??[]){let T=$.raw.get(R9(j.k,J.bx,I,J.bz));if(T?.fresh===Q.frame){Q.stageWord(P+(I-D),Z5(T.unit))}}for(let[I,T]of $.laid.get(J.id)??[])Q.stageWord(P+(I-D),T);return!0}function r4($,Q,J,V,j,Y){let q=(J[V+1]??0)|0,K=(J[V+2]??0)|0,Z=(J[V+3]??0)|0,X=(J[V+4]??0)|0,D=(J[V+5]??0)|0,M=(J[V+6]??0)|0;if(X<=q||D<=K||M<=Z)return!0;let F=((J[V]??0)&255)===p.stamp?a4(J,V):((J[V+7]??0)&65535)!==0;let B={at:V,lo:Math.floor(K/O),hi:Math.floor((D-1)/O),top:D,bottom:K,matter:F};for(let A=Math.floor(Z/O);A<=Math.floor((M-1)/O);A+=1){for(let U=Math.floor(q/O);U<=Math.floor((X-1)/O);U+=1){let v$2;o4:{let J$1=B,V$1=U,j$1=A,Y$1=j,q$1=Y;{let J=J$1,V=V$1,j=j$1,Y=Y$1,q=q$1;let K=S(j,Q.W)*Q.W+S(V,Q.W);if(Q.key[K]!==t(V,j)){v$2=!0;break o4;}let Z=M5(Q.k,V,j);let X=Y.get(Z);if(X===void 0){if(Q.landedFrame[K]===$.frame){v$2=!1;break o4;}Y.set(Z,X={level:Q,s:K,bx:V,bz:j,id:Z,lo:1/0,hi:-1/0,matterTop:-1/0,matterBottom:1/0})}if(J.matter)X.matterTop=Math.max(X.matterTop,J.top),X.matterBottom=Math.min(X.matterBottom,J.bottom);for(let D=J.lo;D<=J.hi;D+=1)X.lo=Math.min(X.lo,D),X.hi=Math.max(X.hi,D),q.push({work:X,by:D,at:J.at});v$2=!0;}}if(!v$2)return!1;}}return!0}function l4($,Q,J,V){let{level:j,s:Y,bx:q,bz:K}=J;let Z=R9(j.k,q,V,K);let X=$.jobs.get(Z);if(X!==void 0)return X;let D=$.raw.get(Z),M=0,F=0;if(D===void 0){let A=$.free.pop()??Q.unitsRun(O8);if(A<0)return null;D={unit:A,fresh:Q.frame},$.raw.set(Z,D);let U=$.placed.get(Z);if(U!==void 0)Q.freeBrick(U),$.placed.delete(Z);let P=$.columns.get(J.id);if(P===void 0)$.columns.set(J.id,[V]);else P.push(V);let C=C5($,J),G=!C.hole&&V>=C.y0&&V<C.y0+C.n;M=G?3:1;if(G)F=C.at+(V-C.y0);else if(!C.hole&&V<C.y0){F=Y$(j.baseMatter[Y]??0);}let I=j.yspan[Y]??0;Q.stageWord((j.listAt[Y]??0)+(V-(I<<16>>16)),Z5(A));$.bricks+=1}let B={raw:D,k:j.k,bx:q,by:V,bz:K,s:Y,mode:M,src:F,refs:[]};return $.jobs.set(Z,B),B}function s4($,Q,J,V,j,Y){let{level:q,s:K,bx:Z,bz:X}=J;let D=R9(q.k,Z,V,X);let M=j[Y+p.head]??0;let F=M!==0&&(M&a)===0;let B=F?Q.layBrick(j.subarray(Y+p.head+1,Y+p.head+(j[Y+7]??0))):-1;if(F&&B<0)return;let A=$.raw.get(D);if(A!==void 0)$.freeLater.push(A.unit),$.raw.delete(D),Q.unitsBack(O8);let U=$.placed.get(D);if(U!==void 0)Q.freeBrick(U);if(F)$.placed.set(D,B);else $.placed.delete(D);let P=$.columns.get(J.id);if(P===void 0)$.columns.set(J.id,[V]);else if(!P.includes(V))P.push(V);let C=F?Q.brickEntry(B):M,G=q.yspan[K]??0;Q.stageWord((q.listAt[K]??0)+(V-(G<<16>>16)),C),V5($.laid,J.id).set(V,C),$.bricks+=1}function e4($,Q){let{level:J,s:V}=Q;if(Q.matterTop>(J.top[V]??g))J.top[V]=Q.matterTop,$.noteTop(Q.matterTop*J.cell);let j=J.bottom[V]??g;if((J.baseMatter[V]??0)===0&&Q.matterBottom<1/0&&(j===g||Q.matterBottom<j))J.bottom[V]=Q.matterBottom;let Y=(J.gap[V]??0)<<16>>16===X5&&Y$(J.baseMatter[V]??0)===0;if(Q.matterTop>-1/0&&!Y){J.gap[V]=B5(J.top[V]??0,p4);}let q=(J.slotBase+V)*4;$.stageWord(q+3,((J.top[V]??0)&65535|((J.baseMatter[V]??0)&65535)<<16)>>>0),J.walk[V]=J.top[V]??0,$.stageWord(J.hotBase+V*d,c8(J.top[V]??0,J.walk[V]??0)),$.stageWord(J.hotBase+V*d+1,(J.gap[V]??0)>>>0),$.markGroup(J,V),$.noteLanded(J,V)}function U5($,Q,J,V){let j=new Map,Y=[];for(let Z=0;Z+p.head<=V.length;Z+=p.head+(((V[Z]??0)&255)===p.stamp?V[Z+7]??0:0)){let X=J[(V[Z]??0)>>>16];if(X!==void 0&&!r4(Q,X,V,Z,j,Y))return!1}if(Y.length===0)return!0;for(let{work:Z,by:X,at:D}of Y){if(((V[D]??0)&p.packed)!==0?$.jobs.has(R9(Z.level.k,Z.bx,X,Z.bz)):$.laid.get(Z.id)?.has(X)===!0)return!1;}let q;{let Q=V;let J=$.recordWords;if(J+Q.length>$.records.length)$.records=p8($.records.subarray(0,J),Math.max($.records.length*2,J+Q.length));q=($.records.set(Q,J),$.recordWords=J+Q.length,J);}let K=new Set;for(let Z of j.values()){if(!t4($,Q,Z,C5($,Z)))K.add(Z);}for(let{work:Z,by:X,at:D}of Y){if(K.has(Z))continue;if(((V[D]??0)&p.packed)!==0){s4($,Q,Z,X,V,D);}else {l4($,Q,Z,X)?.refs.push(q+D)}}for(let Z of j.values()){if(!K.has(Z)){e4(Q,Z);}}return!0}var H9="terrain shells change",G5=[c(0,4,"read-only-storage"),c(1,4,"read-only-storage"),c(2,4,"storage"),c(3,4,"storage"),c(4,4,"uniform")],Q3=`@group(0) @binding(0) var<storage, read> ops: array<u32>;
@group(0) @binding(1) var<storage, read> recs: array<u32>;
@group(0) @binding(2) var<storage, read_write> shellDir: array<u32>;
@group(0) @binding(3) var<storage, read_write> shellPool: array<u32>;
@group(0) @binding(4) var<uniform> head: vec4u;
${K5}
fn change_was(mode: u32, src: u32, q: u32) -> u32 {
  if ((mode & 2u) == 0u) {
    return src;
  }
  let e = shellDir[src];
  if (e == 0u) {
    return 0u;
  }
  if ((e & ${a>>>0}u) != 0u) {
    return e & 0xffffu;
  }
  let slot = e - 1u;
  let nib = shell_nibble(slot, vec3i(i32(q & 7u), i32(q >> 6u), i32((q >> 3u) & 7u)));
  if (nib == 0u || (slot >> 24u) == ${j$}u) {
    return nib;
  }
  let word = shellPool[(slot & 0xffffffu) * ${y}u + (nib >> 1u)];
  return (word >> ((nib & 1u) * 16u)) & 0xffffu;
}
@compute @workgroup_size(64)
fn change(@builtin(global_invocation_id) id: vec3u, @builtin(num_workgroups) groups: vec3u) {
  let i = id.y * groups.x * 64u + id.x;
  if (head.x == 0u) {
    if (i >= head.y) {
      return;
    }
    let a = ops[3u * i];
    let b = ops[3u * i + 1u];
    let n = ops[3u * i + 2u];
    for (var q = 0u; q < n; q = q + 1u) {
      shellDir[b + q] = shellDir[a + q];
    }
    return;
  }
  let j = i >> 9u;
  if (j >= head.y) {
    return;
  }
  let q = i & 511u;
  let at = head.z + j * ${J6}u;
  let unit = ops[at];
  let mode = ops[at + 1u];
  let cellAt = unit * ${y}u + ${q5}u + q;
  var w = shellPool[cellAt];
  if ((mode & 1u) != 0u) {
    w = change_was(mode, ops[at + 2u], q);
  }
  let o = vec3i(i32(ops[at + 3u]), i32(ops[at + 4u]), i32(ops[at + 5u]));
  let c = o * 8 + vec3i(i32(q & 7u), i32(q >> 6u), i32((q >> 3u) & 7u));
  let first = head.w + ops[at + 6u];
  let n = ops[at + 7u];
  for (var r = 0u; r < n; r = r + 1u) {
    let off = ops[first + r];
    let op = recs[off];
    let lo = vec3i(i32(recs[off + 1u]), i32(recs[off + 2u]), i32(recs[off + 3u]));
    let hi = vec3i(i32(recs[off + 4u]), i32(recs[off + 5u]), i32(recs[off + 6u]));
    if (any(c < lo) || any(c >= hi)) {
      continue;
    }
    var v = recs[off + 7u];
    if ((op & 0xffu) == ${p.stamp}u) {
      let d = vec3u(c - lo);
      let size = vec3u(hi - lo);
      v = recs[off + ${p.head}u + (d.y * size.z + d.z) * size.x + d.x];
      if (v == ${p.skip}u) {
        continue;
      }
    }
    if ((op & ${p.ifAir}u) != 0u && (w & 0xffffu) != 0u) {
      continue;
    }
    w = v;
  }
  shellPool[cellAt] = select(w, 0u, (w & 0xffffu) == 0u);
  if (q == 0u && (mode & 1u) != 0u) {
    let h = unit * ${y}u;
    shellPool[h] = 0u;
    shellPool[h + 1u] = 0u;
    shellPool[h + 2u] = mode >> 8u;
    shellPool[h + 3u] = u32(o.x);
    shellPool[h + 4u] = u32(o.y);
    shellPool[h + 5u] = u32(o.z);
    shellPool[h + 6u] = 0u;
    shellPool[h + 7u] = 0u;
    shellPool[h + 8u] = 0u;
    shellPool[h + 9u] = 0u;
  }
}`;function K$(a,b){return (K$=$c0C(3)).call(this,a,b)}var Q5=function($){let Q=Math.max(1,Math.ceil($/64)),J=Math.min(Q,65535);return[J,Math.ceil(Q/J),1]},J5=function($,Q){return Y5(Q,Math.max($,1024))};function J3(a,b){return (J3=$c0C(4)).call(this,a,b)}function T5(a,b,c,d,e,f){return (T5=$c0C(5)).call(this,a,b,c,d,e,f)}function Z$($){let Q=$.gpu;if(Q===null)return;R(Q.ops),R(Q.recs),R(Q.copyHead),R(Q.writeHead),$.gpu=null}function I5(a){return (I5=$c0C(6)).call(this,a)}var z5="./d64579b2f85347cd.wasm";async function H5($,Q){let J=new URL($,Q),V=J.pathname.slice(J.pathname.lastIndexOf("/")+1);if(J.protocol==="file:"&&typeof process<"u"&&Boolean(process.versions?.node)){let q=await import(["node","fs/promises"].join(":"));try{return await q.readFile(J)}catch(K){if(typeof K==="object"&&K!==null&&"code"in K&&K.code==="ENOENT")throw new X$(`${V} is not beside this realm`);throw Error(`${V} could not be read: ${j6(K).replace(/https?:\/\/\S+/g,"the asset's address")}`,{cause:K})}}let j=await N5(J.href);if(!j.ok){if(j.status>=400&&j.status<500&&j.status!==408&&j.status!==429)throw new X$(`${V}: the asset's road answered HTTP ${j.status}`);throw Error(`${V}: HTTP ${j.status}`)}return j.arrayBuffer()}var j3=65536,Y3=67108864,V8,Y6=0,x5=3,E5=4,y5=16,L5=28,_5=0,k5=1,b5=2,w5=3,S5=4,h5=5,q3=6,K3=7,g5=8,v5=20,m5=32,R5=W5({name:"sun-sweep",bytes:()=>H5(z5,import.meta.url)});function u5(a,b){return (u5=$c0C(8)).call(this,a,b)}function f5(a,b,c){return (f5=$c0C(9)).call(this,a,b,c)}function c5($,Q){if(Q.shellAt<0)return;let J=Q.shellBytes/2;Q.shellKey=new Uint32Array($.buffer,Q.shellAt,J/4),Q.shellCast=new Int32Array($.buffer,Q.shellAt+J,J/4)}var X3=16,O9=0.008,e5=0.03,D3=8,$7=16,F6=0.5,Q7=4,M3=1.5,B3=20,J7=4,F3=0.2,A3=1024,x8=4,V7=x8+1.5,P3=8000,C3=800,n5=32,U3=120,D6=0,K6=1,j7=2,M6=new Float32Array(0),B6=new Uint32Array(0),o8=new WeakMap,A$=new WeakMap,D8=function($,Q){let J=$|0;return J<0?Q-1-(-1-J)%Q:J%Q},q6=($,Q,J)=>D8(Q,J)*J+D8($,J);function G3($,Q){let J=s5($,Q),V=s8(($[J]??0)&65535),j=J+(1<<V-1),Y=O*O*V/32;for(let q=O-1;q>0;q-=1)for(let K=0;K<Y;K+=1)if(($[j+q*Y+K]??0)!==0)return q+1;return 1}function T3(a,b,c,d){return (T3=$c0C(10)).call(this,a,b,c,d)}function Y7($,Q,J,V,j){$.cast[Q]=T3(J,V,j,$.cell);A$.set($.cast,(A$.get($.cast)??0)+1)}var D$=()=>({x0:0,z0:0,sun:new Float64Array(3)});var q7=function(a,b,c,d){return (q7=$c0C(11)).call(this,a,b,c,d)};var K7=($)=>Math.ceil($.W*$.W*($.near?36:32)/8)*8;function Z7($,Q){let J=$.W*$.W;if($.up=new Float32Array(Q,$.at,J*4),$.held=new Uint32Array(Q,$.heldAt,J*2),$.wait=new Uint32Array(Q,$.waitAt,J*2),$.near)$.nearTop=new Float32Array(Q,$.at+J*32,J)}function X7(a){return (X7=$c0C(12)).call(this,a)}function D7(a){return (D7=$c0C(13)).call(this,a)}function I3(a,b){return (I3=$c0C(14)).call(this,a,b)}function z3($){for(let Q=0;Q<$.levels.length;Q+=1){let J=$.levels[Q];if(J!==void 0)J.stands=!1}}function O$($){$.key.fill(-1),$.stands=!1,$.waits=null,$.waitsNow=!1,$.from=null,$.to=null}function H3($){if(O$($),$.up=M6,$.held=B6,$.wait=B6,$.near)$.nearTop=M6;$.bare=!0}var P$=null,M7=[0,0,0];function R3($,Q,J,V,j){let Y=P$,q=Y?.nearTop??null;if(Y===null||q===null)return;let{W:K,column:Z,x0:X,z0:D}=Y,M=M7,F=Math.max(X,Math.ceil(($-M[0])/Z-0.5))|0,B=Math.min(X+K-1,Math.ceil((J-M[0])/Z-0.5)-1)|0,A=Math.max(D,Math.ceil((Q-M[2])/Z-0.5))|0,U=Math.min(D+K-1,Math.ceil((V-M[2])/Z-0.5)-1)|0,P=j-M[1];for(let C=A;C<=U;C+=1){let G=D8(C,K)*K;for(let I=F;I<=B;I+=1){let T=G+D8(I,K);if(P>(q[T]??0))q[T]=P}}}function W3(a,b,c){return (W3=$c0C(15)).apply(this,arguments)}function O3(a,b,c){return (O3=$c0C(16)).call(this,a,b,c)}var K8=new Float32Array(4),X8=new Float64Array(2),$8=new Float64Array(4),x9=new Float64Array(2),r8=new Float64Array(2),W9=new Float64Array(3),M$=new Float64Array(3),P8=new Float64Array(3),C$=new Float64Array(5),U$=0,G$=new Float64Array(5),T$=0,B7=-1,p5=[1,1,0,0,m],o=new Float64Array(3),Z8=new Float64Array(2),U8=new Int32Array(7),t8=new Int32Array(0),I$=new Int32Array(0);function F7($,Q,J,V){let j=(X8[0]??0)*V.column,Y=(X8[1]??0)*V.column;X8[0]=J.alongX?j:Y;X8[1]=J.alongX?Y:j;O3($,Q+1,K8)}function E3(a,b,c,d,e,f,g){return (E3=$c0C(17)).call(this,a,b,c,d,e,f,g)}function y3(a,b){return (y3=$c0C(18)).call(this,a,b)}function L3(a,b,c,d,e,f,g,h){return (L3=$c0C(19)).call(this,a,b,c,d,e,f,g,h)}function _3(a,b,c,d,e,f,g,h,i){return (_3=$c0C(20)).call(this,a,b,c,d,e,f,g,h,i)}function A6($){let Q=1;for(let J=0;J<$.length;J+=1)Q=Math.max(Q,Math.min($[J]?.W??1,l8));return Q}function k3($,Q){let J=A6($),V=null,j=J*J*16,Y=0;for(let M=0;M<$.length;M+=1){let F=Math.min($[M]?.W??0,l8);j+=Math.ceil(F*F*36/8)*8,Y=Math.max(Y,($[M]?.W??0)**2)}let q=u5(function(){if(V!==null)D7(V)},j+Y*8);let K=q.heap.alloc(J*J*16);let Z=new Float32Array(q.heap.buffer,K,J*J*4);let X=new Int32Array(q.heap.buffer,K,J*J*4);let D=$.map((M,F)=>q7(M,F,Z,X));for(let M of D)M.heap=q;return V={heap:q,quadAt:K,quadWords:J*J*4,levels:D,of:$,epoch:Q,sun:Float64Array.of(0,1,0),still:0,aimed:new Float64Array(3),hasAimed:!1,before:new Float64Array(3),hasBefore:!1,step:O9,stepFrom:new Float64Array(3),stepTo:new Float64Array(3),stepOwed:!1,plan:D6,ahead:new Float64Array(3),centres:new Int32Array(H$*2),eye:new Float64Array(2),arrivalMove:null,arrival:Float64Array.of(1/0,NaN,NaN,NaN,1),eyeStep:0,lit:!1,chain:{active:!1,anchor:!1,sun:new Float64Array(3),began:new Float64Array(3),k:0,way:{alongX:!0,toward:1,drift:0,whole:0,share:0,fall:0,step:0},wayOn:!1,next:0,fresh:!1,spent:!1},quad:Z,quadInts:X,words:new Float32Array(X6),sent:new Float32Array(X6).fill(NaN),layer:new Uint32Array(J*J*4),sweeps:0,sweepMs:0,gpu:null,said:!1,origin:new Float64Array(3),hold:null,nearStamp:-2,nearRevision:-2,nearSince:-2,nearBox:new Float64Array([1,1,0,0,m]),arrivalBox:new Float64Array([1,1,0,0,m])},V}function b3(a,b,c,d){return (b3=$c0C(21)).call(this,a,b,c,d)}function w3($,Q,J){$.x0=Q*x8-$.W/2,$.z0=J*x8-$.W/2}function S3($,Q,J,V,j,Y){let q=Z6[1]??0,K=Z6[a8]??0;for(let Z=0;Z<j;Z+=1){let X=V+Z*Y;for(let D=0;D<2;D+=1){let M=$[X*4+D]??m,F=Q[X*4+2+D]??0;if(M!==M||(F&2147483647)>2139095040){J[X*2+D]=0;continue}let B=Math.min(F,K),A=0;if(F>=q){A=A7[B-q>>>z$]??0;while(B>=(Z6[A+1]??N$))A+=1}J[X*2+D]=Math.min(h3,Math.max(0,Math.round((M-m)*o5)))*1024+A}}}var h3=4194303,a8=1023,z$=16,N$=2147483647;function v3(){return (v3=$c0C(22)).call(this)}var{from:Z6,bucket:A7}=v3();function x$(a,b,c){return (x$=$c0C(23)).call(this,a,b,c)}function m3(a,b){return (m3=$c0C(24)).call(this,a,b)}function f3(a,b,c){return (f3=$c0C(25)).call(this,a,b,c)}function c3(a){return (c3=$c0C(26)).call(this,a)}function d3(a,b,c){return (d3=$c0C(27)).call(this,a,b,c)}function n3($){for(let Q of $.levels)if(Q.from!==null&&Q.to!==null)return!0;return!1}function p3($,Q){for(let J=0;J<$.levels.length;J+=1){let V=$.levels[J];if(V!==void 0&&(V.from===null||V.to===null)&&(Q.levels[J]?.present??0)>0)return!1}return!0}function E$($){if($.hold!==null)P6($.hold.gpu);$.hold=null}function P6($){R($.texture),R($.handle.words)}function i3(a,b,c){return (i3=$c0C(28)).call(this,a,b,c)}function a3(a){return (a3=$c0C(29)).call(this,a)}var y$=($)=>$.still>B3;function P7(a,b,c){return (P7=$c0C(30)).call(this,a,b,c)}function C7($,Q,J,V,j,Y){let q=J.nearTop!==null;return U8[0]=$.centres[Q*2]??0,U8[1]=$.centres[Q*2+1]??0,U8[2]=V.present,U8[3]=A$.get(V.cast)??0,U8[4]=q?$.eyeStep:0,U8[5]=q?j:0,U8[6]=q?Y:0,U8}var U7=($)=>($.nearReach??m)|0;function t3(a,b,c){return (t3=$c0C(31)).call(this,a,b,c)}function B$($,Q,J){let V=$.chain;return V.active=!0,V.anchor=Q,V.sun.set(J),V.began.set($.sun),V.k=$.levels.length-1,V.wayOn=!1,V.next=0,!0}function o3(a,b,c){return (o3=$c0C(32)).call(this,a,b,c)}function r3(a,b,c,d,e){return (r3=$c0C(33)).call(this,a,b,c,d,e)}function l3($){let Q=$.marks[0],J=$.marks[1],V=$.marks[2];if(Q!==$.from&&Q!==$.to)return Q;return J!==$.from&&J!==$.to?J:V}function e3(a,b,c,d,e){return (e3=$c0C(34)).call(this,a,b,c,d,e)}function G7(a,b){return (G7=$c0C(35)).call(this,a,b)}function $V(a,b){return ($V=$c0C(36)).call(this,a,b)}function i5($,Q,J,V,j,Y,q){$[0]=Q?J:Math.min($[0]??0,J),$[1]=Q?V:Math.min($[1]??0,V),$[2]=Q?j:Math.max($[2]??0,j),$[3]=Q?Y:Math.max($[3]??0,Y),$[4]=Q?q:Math.max($[4]??0,q)}function QV($,Q,J,V,j,Y){if(i5(C$,U$===0,$,Q,J,V,j),U$+=1,Y!==void 0&&Y<=B7)return;i5(G$,T$===0,$,Q,J,V,j),T$+=1}function VV($,Q){let J=$.arrival,V=(r8[0]??0)-(J[2]??0),j=(r8[1]??0)-(J[3]??0);return V*V+j*j>n5*n5||Q!==null&&Q!==$.arrivalMove}function jV($,Q,J){let V=$.arrival,j=t5(),Y=r8[0]??0,q=r8[1]??0;if(VV($,Q)||V[0]===1/0)V[0]=j,V[1]=NaN;if($.arrivalMove=Q,V[2]=Y,V[3]=q,!Number.isNaN(V[0]??0)){if(a5())V[0]=j;let Z=$.arrivalBox,X=Math.min(Y-((Z[0]??0)-(o[0]??0)),(Z[2]??0)-(o[0]??0)-Y,q-((Z[1]??0)-(o[2]??0)),(Z[3]??0)-(o[2]??0)-q),D=Q===null||!J,M=D&&X>=y8,F=D&&j-(V[0]??0)>=P3;if(M||F)V[0]=NaN,V[1]=j}let K=V[4]??0;return V[4]=Number.isNaN(V[0]??0)?Math.max(0,1-(j-(V[1]??0))/C3)||0:1,K>0&&(V[4]??0)<1}function YV(a,b){return (YV=$c0C(37)).call(this,a,b)}function qV($,Q,J,V){let j=$.words;if(Q.empty===0)j[V+2]=-(Q.W/2-V7);j[V+4]=($.centres[J*2]??0)*x8,j[V+5]=($.centres[J*2+1]??0)*x8}function KV(a,b,c,d){return (KV=$c0C(38)).call(this,a,b,c,d)}function T7(a,b){return (T7=$c0C(39)).call(this,a,b)}var C6=function($){let Q=$===null?void 0:o8.get($);return Q?.hold?.gpu.handle??Q?.gpu?.handle??null},F$=($)=>Math.asin(Math.min(1,Math.max(-1,$[1]??0)))*180/E8;function I7(a,b){return (I7=$c0C(40)).call(this,a,b)}function U6($){let Q=o8.get($);if(Q?.gpu)P6(Q.gpu);if(Q!==void 0){E$(Q);}o8.delete($)}var z8=32767,XQ=-32768,Y9=-2147483647,XV=1024,$9=4,n$="shellsCoveredEye",f=4096,DQ=8,h9=11,_8=3+h9,_6=1,k6=10,u={flags:2,roof:3,ground:4,top:8,matter:12},b6=16,p$=4,C8=2,i$=[{binding:0,visibility:C8,buffer:h$},c(1,C8,"read-only-storage"),c(2,C8,"read-only-storage"),c(3,C8,"read-only-storage"),W7(4,C8,"float","2d-array"),R7(5,C8,"filtering"),c(6,C8,"read-only-storage"),c(w9,C8,"read-only-storage"),c(k6,C8,"read-only-storage")],w6=(...a)=>(w6=$c0C(41))(...a),MQ=()=>`const SHELL_SOLID = ${a>>>0}u;
const SHELL_UNIT_WORDS = ${y}u;
const SHELLS_GROUP_OPEN = ${s};
const SHELLS_GROUP_WORDS = ${M8}u;
const SHELLS_HOT_WORDS = ${d}u;
const SHELLS_GAP_NONE = ${z8};
const SHELLS_HORIZON_WORDS = ${_8}u;
const SHELLS_HORIZON_BINS = ${h9}u;
const SHELLS_THINGS_NONE = ${Y9};
const SHELLS_STEP_BUDGET = ${XV}u;
const SHELLS_LEND_MOST_PX = ${k9}.0;
const SHELLS_CAVE_CUBE_LEAST_M = ${l7.toFixed(4)};
const SHELLS_CROWN_MOST_M = 8.0;
const SHELL_BIG = 1e30;
const SHELL_UP = vec3f(0.0, 1.0, 0.0);
const VOXEL_AO_CURVE = array<f32, 4>(${e7.join(", ")});

struct ShellHit {
  t: f32,
  n: vec3f,
  matter: u32,
  shell: u32,
  cell: vec3i,
  column: vec4u,
  columnXZ: vec2i,
  hit: bool,
  lent: bool,
  inside: bool,
  steps: u32,
  thing: bool,
  proud: bool,
}

fn shell_hash(x: i32, z: i32, k: u32) -> f32 {
  var h = (u32(x) * 0x8da6b343u) ^ (u32(z) * 0xd8163841u) ^ ((k + 1u) * 0xcb1ab31fu);
  h = h ^ (h >> 13u);
  h *= 0x85ebca6bu;
  h = h ^ (h >> 16u);
  return f32(h >> 8u) * (1.0 / 16777216.0);
}

${JQ}

var<private> shell_arrivalNoise: f32 = 0.0;
fn shell_bornOf(k: u32, bx: i32, bz: i32) -> f32 {
  let row = shells.rows[k];
  let tw = i32(row.slots.x) / ${W};
  let inv = row.metres.z * ${W}.0;
  return bitcast<f32>(shellDir[u32(row.things.w) + u32(shell_wrap(bz >> ${Math.log2(W)}u, tw, inv) * tw + shell_wrap(bx >> ${Math.log2(W)}u, tw, inv))]);
}
fn shell_arrived(k: u32, bx: i32, bz: i32) -> bool {
  if (shells.cover.w < 0.0) {
    return true;
  }
  let born = max(shell_bornOf(k, bx, bz), shells.cover.w);
  let age = shells.cover.z - born;
  return born <= 0.0 || age < 0.0 || shell_arrivalNoise * ${Q9/1000} <= age;
}

fn shell_groupWord(k: u32, gx: i32, gz: i32) -> u32 {
  let row = shells.rows[k];
  let g = i32(row.slots.z);
  let at = row.slots.w + SHELLS_GROUP_WORDS * u32(shell_wrap(gz, g, row.metres.w) * g + shell_wrap(gx, g, row.metres.w));
  return select(u32(SHELLS_GROUP_OPEN), shellDir[at], shellDir[at + 1u] == shell_key(gx, gz));
}

fn shell_groupGap(k: u32, gx: i32, gz: i32) -> u32 {
  let row = shells.rows[k];
  let g = i32(row.slots.z);
  let at = row.slots.w + SHELLS_GROUP_WORDS * u32(shell_wrap(gz, g, row.metres.w) * g + shell_wrap(gx, g, row.metres.w));
  return shellDir[at + 2u];
}

fn shell_columnGap(k: u32, slot: u32) -> u32 {
  return shellDir[u32(shells.rows[k].anchor.w) + slot * SHELLS_HOT_WORDS + 1u];
}

fn shell_inGap(gap: u32, yMin: f32, yMax: f32, c: f32) -> bool {
  return yMin >= f32((bitcast<i32>(gap) << 16u) >> 16u) * c && yMax < f32(bitcast<i32>(gap) >> 16u) * c;
}

fn shell_group(k: u32, gx: i32, gz: i32) -> i32 {
  let word = shell_groupWord(k, gx, gz);
  return select((bitcast<i32>(word) << 16u) >> 16u, SHELLS_GROUP_OPEN, word == u32(SHELLS_GROUP_OPEN));
}

fn shell_top(e: vec4u) -> i32 {
  return (i32(e.w << 16u)) >> 16u;
}

fn shell_thingRecord(k: u32, slot: u32) -> vec4u {
  let row = shells.rows[k];
  let sx = slot % row.slots.x;
  let sz = slot / row.slots.x;
  let block = shellDir[u32(row.things.x) + 3u * ((sz >> 3u) * row.slots.z + (sx >> 3u)) + 2u];
  if (block == 0u) {
    return vec4u(0xffffffffu, 0u, 0u, 0u);
  }
  let at = block - 1u + (((sz & 7u) << 3u) | (sx & 7u)) * 4u;
  return vec4u(shellDir[at], shellDir[at + 1u], shellDir[at + 2u], shellDir[at + 3u]);
}

fn shell_thingGroupTop(k: u32, gx: i32, gz: i32) -> f32 {
  let row = shells.rows[k];
  let sx = row.things.y;
  let sz = row.things.z;
  if (row.things.x < 0 || gx < ((sx << 16u) >> 16u) || gx > (sx >> 16u) || gz < ((sz << 16u) >> 16u) || gz > (sz >> 16u)) {
    return -SHELL_BIG;
  }
  let g = i32(row.slots.z);
  let at = u32(row.things.x) + 3u * u32(shell_wrap(gz, g, row.metres.w) * g + shell_wrap(gx, g, row.metres.w));
  let top = bitcast<i32>(shellDir[at]);
  if (top == SHELLS_THINGS_NONE) {
    return -SHELL_BIG;
  }
  if (top == SHELLS_GROUP_OPEN) {
    return SHELL_BIG;
  }
  return select(-SHELL_BIG, f32(top), shellDir[at + 1u] == shell_key(gx, gz));
}

${YQ}

fn shell_eyeUnder() -> bool {
  return shell_under(shells.eye.xyz);
}

fn shell_inv(d: vec3f) -> vec3f {
  return 1.0 / select(d, select(vec3f(-1e-9), vec3f(1e-9), d >= vec3f()), abs(d) < vec3f(1e-9));
}

fn shell_leave(o: vec2f, inv: vec2f, i: vec2i, s: f32) -> vec2f {
  return (vec2f(i + vec2i(inv >= vec2f())) * s - o) * inv;
}

fn shell_reaching(t: f32, count: u32) -> u32 {
  var k = 0u;
  loop {
    if (k + 1u >= count || shells.rows[k].metres.y > t) {
      break;
    }
    k++;
  }
  return k;
}

`,DV=`  if ((u32(shellHorizon[at + ${u.flags}u]) & 2u) == 0u) {
    return out;
  }
  let top = max(max(shellHorizon[at + ${u.top}u], shellHorizon[at + ${u.top+1}u]), max(shellHorizon[at + ${u.top+2}u], shellHorizon[at + ${u.top+3}u]));
  if (min(ro.y + rd.y * tc, ro.y + rd.y * tc1) >= top + c) {
    return out;
  }
  if ((u32(shellHorizon[at + ${u.flags}u]) & 4u) != 0u) {
    out.lend = true;
    return out;
  }
  if (min(ro.y + rd.y * tc, ro.y + rd.y * tc1) < shellHorizon[at + ${u.roof}u]) {
    out.lend = true;
    return out;
  }
  g00 = shell_preppedGround(at, 0u);
  g10 = shell_preppedGround(at, 1u);
  g01 = shell_preppedGround(at, 2u);
  g11 = shell_preppedGround(at, 3u);
`,BQ=()=>`${VQ()}

${jQ()}

fn shell_cellGround(e: vec4u, cx: i32, cz: i32, cj: f32) -> vec2i {
  let y0 = shell_y0(e);
  let n = i32(e.y >> 16u);
  let base = i32(shell_baseMatter(e));
  let thin = i32(SHELLS_CROWN_MOST_M / cj);
  var first = vec2i();
  var gap = false;
  for (var by = y0 + n - 1; by >= y0; by = by - 1) {
    let entry = shellDir[e.z + u32(by - y0)];
    if ((entry & SHELL_SOLID) != 0u && shell_land(entry & 0xffffu)) {
      return select(first, vec2i((by + 1) * 8, i32(entry & 0xffffu)), first.y == 0 || gap);
    }
    if ((entry & SHELL_SOLID) != 0u || entry == 0u) {
      gap = gap || first.y != 0;
      continue;
    }
    let slot = entry - 1u;
    for (var ly = 7; ly >= 0; ly = ly - 1) {
      let nib = shell_nibble(slot, vec3i(cx, ly, cz));
      let matter = select(0u, shell_paletteMatter(slot, nib), nib != 0u);
      if (nib == 0u || !shell_land(matter)) {
        gap = gap || first.y != 0;
      } else if (first.y == 0) {
        first = vec2i(by * 8 + ly + 1, i32(matter));
        if (shell_namedLand(matter)) {
          return first;
        }
      } else if (gap) {
        return vec2i(by * 8 + ly + 1, i32(matter));
      } else if (first.x - (by * 8 + ly) >= thin) {
        return first;
      }
    }
  }
  if (first.y == 0) {
    return vec2i(y0 * 8, base);
  }
  return select(first, vec2i(y0 * 8, base), gap && base != 0);
}

struct ShellCorner {
  e: vec4u,
  cj: f32,
  cell: vec2i,
  column: vec2i,
  j: u32,
  found: bool,
}

fn shell_cornerIn(j: u32, px: f32, pz: f32) -> ShellCorner {
  var out: ShellCorner;
  out.found = false;
  let row = shells.rows[j];
  if (row.anchor.z == 0) {
    return out;
  }
  let cj = row.metres.x;
  let bx = i32(floor(px / (cj * 8.0))) + row.anchor.x;
  let bz = i32(floor(pz / (cj * 8.0))) + row.anchor.y;
  out.e = shell_column(j, bx, bz);
  out.cj = cj;
  out.cell = vec2i(i32(floor(px / cj)) & 7, i32(floor(pz / cj)) & 7);
  out.column = vec2i(bx, bz);
  out.j = j;
  out.found = shell_present(out.e, bx, bz);
  return out;
}

fn shell_corner(first: u32, px: f32, pz: f32) -> ShellCorner {
  var out: ShellCorner;
  out.found = false;
  for (var j = first; j < shells.head.x; j++) {
    out = shell_cornerIn(j, px, pz);
    if (out.found) {
      return out;
    }
  }
  return out;
}

fn shell_sameCorner(a: ShellCorner, b: ShellCorner) -> bool {
  return a.found && b.found && a.j == b.j && all(a.column == b.column) && all(a.cell == b.cell);
}

fn shell_cornerBy(mid: ShellCorner, px: f32, pz: f32) -> ShellCorner {
  let row = shells.rows[mid.j];
  let bx = i32(floor(px / (mid.cj * 8.0))) + row.anchor.x;
  let bz = i32(floor(pz / (mid.cj * 8.0))) + row.anchor.y;
  if (bx == mid.column.x && bz == mid.column.y) {
    var out = mid;
    out.cell = vec2i(i32(floor(px / mid.cj)) & 7, i32(floor(pz / mid.cj)) & 7);
    return out;
  }
  return shell_corner(mid.j, px, pz);
}

fn shell_cornerGround(q: ShellCorner) -> vec3f {
  if (!q.found) {
    return vec3f();
  }
  let g = shell_cellGround(q.e, q.cell.x, q.cell.y, q.cj);
  return vec3f(f32(g.x - 1) * q.cj, f32(g.y), select(0.0, 1.0, g.y != 0));
}

fn shell_noGround(q: ShellCorner) -> bool {
  return q.found && (q.e.w >> 16u) == 0u && (q.e.y >> 16u) != 0u;
}

fn shell_cornerRoof(q: ShellCorner) -> f32 {
  if (!q.found || (q.e.w & ${q8<<16>>>0}u) == 0u) {
    return -SHELL_BIG;
  }
  let r = shell_roofOf(q.e, q.cell.x, q.cell.y);
  return select(f32(r) * q.cj, -SHELL_BIG, r == ${g});
}

fn shell_land(matter: u32) -> bool {
  return shellTones[matter * ${r}u + 2u].z > 0.5;
}

fn shell_namedLand(matter: u32) -> bool {
  return shellTones[matter * ${r}u + 3u].w > 0.5;
}
`;function FQ($){let Q=$?"tEnd":"min(min(tgx, tgz), tEnd)",J=$?`        let pc = ro + rd * (t + 1e-3 * c);
        lx = i32(floor(pc.x / b));
        lz = i32(floor(pc.z / b));
        let lc = shell_leave(ro.xz, inv.xz, vec2i(lx, lz), b);
        tcx = lc.x;
        tcz = lc.y;
        tc = t;
        fl &= ~SHELL_WALK_WHOLE;
        at = SHELL_AT_COLUMN;`:`        let yMin = min(yA, ro.y + rd.y * tg1);
        let gWord = shell_groupWord(k, gx + (ax >> 3u), gz + (az >> 3u));
        let whole = gWord != u32(SHELLS_GROUP_OPEN);
        let yMax = max(yA, ro.y + rd.y * tg1);
        var cross = yMin >= maxTop || yMax < minBottom || (whole && (yMin >= f32((bitcast<i32>(gWord) << 16u) >> 16u) * c || yMax < f32(bitcast<i32>(gWord) >> 16u) * c));
        if (!cross && whole) {
          let gGap = shell_groupGap(k, gx + (ax >> 3u), gz + (az >> 3u));
          cross = shell_inGap(gGap, yMin, yMax, c);
        }
        if (!cross) {
          let pc = ro + rd * (t + 1e-3 * c);
          lx = clamp(i32(floor(pc.x / b)), gx * 8, gx * 8 + 7);
          lz = clamp(i32(floor(pc.z / b)), gz * 8, gz * 8 + 7);
          let lc = shell_leave(ro.xz, inv.xz, vec2i(lx, lz), b);
          tcx = lc.x;
          tcz = lc.y;
          tc = t;
          fl = select(fl & ~SHELL_WALK_WHOLE, fl | SHELL_WALK_WHOLE, whole);
          at = SHELL_AT_COLUMN;
        } else {
          fl &= ~(SHELL_WALK_WET | SHELL_WALK_DUG);
          at = SHELL_PAST_GROUP;
        }`,V=$?"            at = SHELL_MET_COLUMN; //":`
            let y0 = shell_y0(e);
            let n = i32(e.y >> 16u);
            if (dirY < 0 && yc0 > walkY && !dugIn) {
              tc = (walkY - ro.y) * inv.y;
              fl &= ~SHELL_WALK_WET;
            }
            by = i32(floor((ro.y + rd.y * (tc + 1e-3 * c)) / b));
            byEnd = i32(floor(yc1 / b));
            if (dirY < 0 && by > y0 + n - 1) {
              by = y0 + n - 1;
            }
            if (airUnder) {
              by = max(by, y0);
              byEnd = max(byEnd, y0);
            }
            at = SHELL_AT_BRICK;`,j=$?`  h.t = select(tc, max(tc, (topY - ro.y) * inv.y), ro.y + rd.y * tc >= topY);
  h.n = SHELL_UP;
  h.matter = shell_baseMatter(e);
  h.cell = vec3i(floor((ro + rd * (h.t + 1e-3 * c)) / c)) + vec3i(ax * 8, 0, az * 8);
  h.inside = h.t <= tStart;`:`
  let tb0 = max(tc, (f32(by + select(1, 0, dirY > 0)) * c * 8.0 - ro.y) * inv.y);
  h.matter = cellSlot;
  var lo = vec3i(lx * 8, by * 8, lz * 8) + l;
  var tIn = te;
  h.t = select(tb0, te, (shells.head.y & ${j8}u) != 0u);
  if (at == SHELL_MET_BRICK) {
    lo = vec3i(floor((ro + rd * (tb0 + 1e-3 * c)) / c));
    tIn = tb0;
    h.t = tb0;
  }
  shell_met(ro, inv, rd, vec3f(lo) * c, c, tIn, &h);
  h.cell = lo + vec3i(ax * 8, 0, az * 8);
  h.inside = (fl & SHELL_WALK_INSIDE) != 0u || h.t <= tStart;
  h.proud = h.t <= handedFrom + 1e-3 * c;`,Y=$?"":`
    if (at == SHELL_AT_BRICK) {
      steps++;
      let tc1 = min(min(tcx, tcz), ${Q});
      let y0 = shell_y0(e);
      let n = i32(e.y >> 16u);
      if (steps > SHELLS_STEP_BUDGET) {
        at = SHELL_AT_END;
      } else {
        let tb0 = max(tc, (f32(by + select(1, 0, dirY > 0)) * b - ro.y) * inv.y);
        let tb1 = min(tc1, (f32(by + select(0, 1, dirY > 0)) * b - ro.y) * inv.y);
        if (tb0 < tb1 && by < y0 + n) {
          var entry = select(0u, SHELL_SOLID, (e.w >> 16u) != 0u);
          if (by >= y0) {
            entry = shellDir[e.z + u32(by - y0)];
          }
          let brick = (entry & SHELL_SOLID) != 0u;
          let brickMatter = select(entry & 0xffffu, shell_baseMatter(e), by < y0);
          let atStart = tb0 <= tStart;
          let pe = ro + rd * (tb0 + 1e-3 * c);
          let wet = (fl & SHELL_WALK_WET) != 0u;
          let dug = (fl & SHELL_WALK_DUG) != 0u;
          if (entry == 0u || (brick && by >= y0 && shell_shapedAir(brickMatter, ro + rd * tb0, c))) {
            fl &= ~(SHELL_WALK_WET | SHELL_WALK_DUG);
          } else if (brick && (wet || (atStart && by >= y0)) && shell_liquid(brickMatter)) {
            fl |= SHELL_WALK_WET | SHELL_WALK_PASSED;
          } else if (brick && shell_clear(brickMatter)) {
            fl &= ~(SHELL_WALK_WET | SHELL_WALK_DUG);
          } else if (brick && shell_nearOwns(pe, brickMatter, dug)) {
            fl |= select(0u, SHELL_WALK_WET | SHELL_WALK_PASSED, shell_liquid(brickMatter));
          } else if (brick && (fl & SHELL_WALK_ROOFED) != 0u && by < y0 && !last) {
            fl |= SHELL_WALK_LENT;
            t = tc;
            k++;
            at = SHELL_AT_SHELL;
          } else if (brick && dug && by < y0 && !last && shell_handsOn(k, tb0)) {
            fl |= SHELL_WALK_LENT;
            t = tc;
            k++;
            at = SHELL_AT_SHELL;
          } else if (brick) {
            cellSlot = brickMatter;
            fl |= select(0u, SHELL_WALK_INSIDE, dug && by < y0);
            at = SHELL_MET_BRICK;
          } else {
            cellSlot = entry - 1u;
            let bo = vec3i(lx * 8, by * 8, lz * 8);
            l = clamp(vec3i(floor(pe / c)) - bo, vec3i(), vec3i(7));
            tm = (vec3f(bo + l + max(vec3i(stX, dirY, stZ), vec3i())) * c - ro) * inv;
            te = tb0;
            fl = select(fl & ~SHELL_WALK_FIRST, fl | SHELL_WALK_FIRST, atStart);
            at = SHELL_AT_CELL;
          }
        }
        if (at == SHELL_AT_BRICK) {
          at = SHELL_PAST_BRICK;
        }
      }
    }
    if (at == SHELL_AT_CELL) {
      steps++;
      if (steps > SHELLS_STEP_BUDGET) {
        at = SHELL_AT_END;
      } else {
        let tc1 = min(min(tcx, tcz), ${Q});
        let tb0 = max(tc, (f32(by + select(1, 0, dirY > 0)) * b - ro.y) * inv.y);
        let tb1 = min(tc1, (f32(by + select(0, 1, dirY > 0)) * b - ro.y) * inv.y);
        let bo = vec3i(lx * 8, by * 8, lz * 8);
        let nib = shell_nibble(cellSlot, l);
        var cellMatter = 0u;
        if (nib != 0u) {
          cellMatter = shell_paletteMatter(cellSlot, nib);
        }
        let cp = (vec3f(bo + l) + 0.5) * c;
        let dug = (fl & SHELL_WALK_DUG) != 0u;
        if (nib == 0u || shell_shapedAir(cellMatter, cp, c) || shell_clear(cellMatter)) {
          fl &= ~(SHELL_WALK_WET | SHELL_WALK_DUG);
        } else if ((fl & (SHELL_WALK_WET | SHELL_WALK_FIRST)) != 0u && shell_liquid(cellMatter)) {
          fl |= SHELL_WALK_WET | SHELL_WALK_PASSED;
        } else if (shell_nearOwns(cp, cellMatter, dug)) {
          fl |= select(0u, SHELL_WALK_WET | SHELL_WALK_PASSED, shell_liquid(cellMatter));
        } else {
          cellSlot = cellMatter;
          at = SHELL_MET_CELL;
        }
        if (at == SHELL_AT_CELL) {
          fl &= ~SHELL_WALK_FIRST;
          let td = abs(c * inv);
          if (tm.x < tm.y && tm.x < tm.z) {
            l.x += stX;
            if (tm.x > tb1 || l.x < 0 || l.x > 7) {
              at = SHELL_PAST_BRICK;
            }
            te = tm.x;
            tm.x += td.x;
          } else if (tm.y < tm.z) {
            l.y += dirY;
            if (tm.y > tb1 || l.y < 0 || l.y > 7) {
              at = SHELL_PAST_BRICK;
            }
            te = tm.y;
            tm.y += td.y;
          } else {
            l.z += stZ;
            if (tm.z > tb1 || l.z < 0 || l.z > 7) {
              at = SHELL_PAST_BRICK;
            }
            te = tm.z;
            tm.z += td.z;
          }
        }
      }
    }
    if (at == SHELL_PAST_BRICK) {
      let y0 = shell_y0(e);
      let n = i32(e.y >> 16u);
      if (by * dirY >= byEnd * dirY || (dirY > 0 && by + 1 >= y0 + n)) {
        at = SHELL_PAST_COLUMN;
      } else {
        by += dirY;
        at = SHELL_AT_BRICK;
      }
    }`;return`const SHELL_AT_SHELL = 0u;
const SHELL_AT_GROUP = 1u;
const SHELL_AT_COLUMN = 2u;
const SHELL_AT_BRICK = 3u;
const SHELL_AT_CELL = 4u;
const SHELL_PAST_BRICK = 5u;
const SHELL_PAST_COLUMN = 6u;
const SHELL_PAST_GROUP = 7u;
const SHELL_AT_END = 8u;
const SHELL_AT_SKY = 9u;
const SHELL_MET_INSIDE = 10u;
const SHELL_MET_STAND = 11u;
const SHELL_MET_BRICK = 12u;
const SHELL_MET_CELL = 13u;
const SHELL_MET_COLUMN = 14u;
const SHELL_WALK_WET = 1u;
const SHELL_WALK_DUG = 2u;
const SHELL_WALK_PASSED = 4u;
const SHELL_WALK_UNDER = 8u;
const SHELL_WALK_ROOFED = 16u;
const SHELL_WALK_WHOLE = 32u;
const SHELL_WALK_HAVE = 64u;
const SHELL_WALK_UNDER_AIR = 128u;
const SHELL_WALK_FIRST = 256u;
const SHELL_WALK_LENT = 512u;
const SHELL_WALK_INSIDE = 1024u;

fn shells_landWalk(ro: vec3f, rd: vec3f, tStartIn: f32, tStop: f32, dugFrom: bool) -> ShellHit {
  var h: ShellHit;
  h.hit = false;
  h.lent = false;
  h.inside = false;
  h.proud = false;
  h.t = tStop;
  h.steps = 0u;
  h.matter = 0u;
  h.shell = 0u;
  let count = shells.head.x;
  if (count == 0u) {
    return h;
  }
  let maxTop = shells.eye.w;
  let minBottom = shells.band.x;
  let tFrom = shells_horizonFrom(rd);
  if (tFrom >= SHELL_BIG) {
    h.t = SHELL_BIG;
    return h;
  }
  let tStart = max(tStartIn, tFrom);
  let inv = shell_inv(rd);
  let stX = select(-1, 1, rd.x >= 0.0);
  let stZ = select(-1, 1, rd.z >= 0.0);
  let dirY = select(-1, 1, rd.y >= 0.0);
  let lendAll = (shells.head.y & ${j8}u) != 0u;
  var t = tStart;
  var k = shell_reaching(t, count);
  var steps = 0u;
  var fl = select(0u, SHELL_WALK_DUG, dugFrom);
  var at = SHELL_AT_SHELL;
  var handedFrom = -SHELL_BIG;
  var gx = 0;
  var gz = 0;
  var tgx = 0.0;
  var tgz = 0.0;
  var lx = 0;
  var lz = 0;
  var tcx = 0.0;
  var tcz = 0.0;
  var tc = 0.0;
  var topY = 0.0;
  var e = vec4u();
  var by = 0;
  var byEnd = 0;
  var cellSlot = 0u;
  var l = vec3i();
  var tm = vec3f();
  var te = 0.0;
  var metT = 0.0;
  var metN = vec3f();
  loop {
    if (at == SHELL_AT_SHELL && (k >= count || t >= tStop)) {
      at = SHELL_AT_END;
    }
    if (at >= SHELL_AT_END) {
      break;
    }
    let row = shells.rows[k];
    let c = row.metres.x;
    let b = c * 8.0;
    let g = b * 8.0;
    let last = k + 1u >= count;
    let tEnd = select(min(tStop, row.metres.y), tStop, last);
    let ax = row.anchor.x;
    let az = row.anchor.y;
    if (at == SHELL_AT_SHELL) {
      handedFrom = select(-SHELL_BIG, t, t > tStart);
      if (row.anchor.z == 0 && (last || lendAll || shells.rows[k + 1u].metres.x <= SHELLS_LEND_MOST_PX * shells.far.y * max(t, 1e-3))) {
        fl |= SHELL_WALK_LENT;
        k++;
      } else {
        let p0 = ro + rd * (t + 1e-3 * c);
        gx = i32(floor(p0.x / g));
        gz = i32(floor(p0.z / g));
        let lg = shell_leave(ro.xz, inv.xz, vec2i(gx, gz), g);
        tgx = lg.x;
        tgz = lg.y;
        at = SHELL_AT_GROUP;
      }
    }
    if (at == SHELL_AT_GROUP) {
      steps++;
      let tg1 = ${Q};
      let yA = ro.y + rd.y * t;
      if (steps > SHELLS_STEP_BUDGET) {
        at = SHELL_AT_END;
      } else if ((rd.y >= 0.0 && yA > maxTop) || (rd.y <= 0.0 && yA < minBottom)) {
        at = SHELL_AT_SKY;
      } else {
${J}
      }
    }
    if (at == SHELL_AT_COLUMN) {
      steps++;
      let tc1 = min(min(tcx, tcz), ${Q});
      let bx = lx + ax;
      let bz = lz + az;
      if (steps > SHELLS_STEP_BUDGET) {
        at = SHELL_AT_END;
      } else if (!last && tc >= row.metres.y * 0.8 && tc >= row.metres.y * (0.8 + 0.2 * shell_hash(bx >> 1u, bz >> 1u, k + 1u))) {
        t = tc;
        k++;
        at = SHELL_AT_SHELL;
      } else {
        let slot = shell_slot(k, bx, bz);
        e = vec4u();
        var have = true;
        var topCells = 0;
        var walkCells = 0;
        if ((fl & SHELL_WALK_WHOLE) != 0u) {
          let hot = shellDir[u32(row.anchor.w) + slot * SHELLS_HOT_WORDS];
          topCells = bitcast<i32>(hot << 16u) >> 16u;
          walkCells = bitcast<i32>(hot) >> 16u;
        } else {
          e = shell_record(k, slot);
          have = shell_present(e, bx, bz);
          topCells = shell_top(e);
          walkCells = topCells;
        }
        if (SHELLS_NEAR_AIR) {
          let nearBand = shell_nearBand((vec2f(f32(lx), f32(lz)) + 0.5) * b);
          let ya = ro.y + rd.y * tc;
          let yb = ro.y + rd.y * tc1;
          if (min(ya, yb) > nearBand.x && max(ya, yb) < nearBand.y) {
            if (have) {
              let p = ro + rd * (tc1 - 1e-3 * c);
              var m = 0u;
              if (p.y < f32(topCells) * c) { m = shell_cellMatter(k, vec3i(floor(p / c)) + vec3i(ax * 8, 0, az * 8), shell_record(k, slot), vec2i(bx, bz)); }
              if (shell_liquid(m) || !(shell_clear(m) || shell_through(m) || shell_shaped(m) > 0.5)) { fl = select(fl & ~(SHELL_WALK_WET | SHELL_WALK_PASSED), fl | SHELL_WALK_WET | SHELL_WALK_PASSED, shell_liquid(m)); }
            }
            have = true;
            walkCells = -32768;
            topCells = -32768;
          }
        }
        let ycMin = min(ro.y + rd.y * tc, ro.y + rd.y * tc1);
        let dug = (fl & SHELL_WALK_DUG) != 0u;
        let underBand = !lendAll && shells.head.w != 0u && !last && c < SHELLS_CAVE_CUBE_LEAST_M;
        if (have && ycMin < f32(topCells) * c && !dug && !last && shells.rows[k + 1u].metres.x <= SHELLS_LEND_MOST_PX * shells.far.y * max(tc, 1e-3) && !shell_arrived(k, bx, bz) && shell_cornerIn(k + 1u, (f32(lx) + 0.5) * b, (f32(lz) + 0.5) * b).found) {
          have = false;
        }
        if (underBand && !shell_nearHolds(ro + rd * (tc + 1e-3 * c))) {
          fl |= SHELL_WALK_LENT;
          t = tc;
          k++;
          at = SHELL_AT_SHELL;
        } else if (!have && dug) {
          if (!shell_nearHolds(ro + rd * (tc + 1e-3 * c))) {
            if (!last && shell_handsOn(k, tc)) {
              fl |= SHELL_WALK_LENT;
              t = tc;
              k++;
              at = SHELL_AT_SHELL;
            } else {
              at = SHELL_MET_INSIDE;
            }
          }
        } else if (!have && ycMin < maxTop && (last || lendAll || shells.rows[k + 1u].metres.x <= SHELLS_LEND_MOST_PX * shells.far.y * max(tc, 1e-3))) {
          fl |= SHELL_WALK_LENT;
          t = tc;
          k++;
          at = SHELL_AT_SHELL;
        } else if (!have && ycMin < maxTop) {
          let stand = shell_stand(k, ro, rd, inv, lx, lz, c, tc, tc1, tStart, (fl & SHELL_WALK_UNDER) != 0u, (fl & SHELL_WALK_WET) != 0u, slot);
          steps += stand.steps;
          fl = select(fl & ~SHELL_WALK_UNDER, fl | SHELL_WALK_UNDER, stand.under);
          if (stand.lend) {
            fl |= SHELL_WALK_LENT;
            t = tc;
            k++;
            at = SHELL_AT_SHELL;
          } else if (stand.hit) {
            metT = stand.t;
            metN = stand.n;
            cellSlot = stand.matter;
            at = SHELL_MET_STAND;
          }
        } else if (have) {
          fl &= ~SHELL_WALK_UNDER;
        }
        if (at == SHELL_AT_COLUMN) {
          topY = select(-SHELL_BIG, f32(topCells) * c, have);
          let yc0 = ro.y + rd.y * tc;
          let yc1 = ro.y + rd.y * tc1;
          let dugIn = dug && (yc0 < topY || !have);
          let walkY = ${$?"topY":"select(topY, f32(walkCells) * c, have && !dug)"};
          var dips = min(yc0, yc1) < walkY;
          if (dips && have && !dugIn && shell_inGap(shell_columnGap(k, slot), min(yc0, yc1), max(yc0, yc1), c)) {
            dips = false;
          }
          if (dips && (fl & SHELL_WALK_WHOLE) != 0u) {
            e = shell_record(k, slot);
          }
          let airUnder = (e.w >> 16u) == 0u;
          let underAir = dips && airUnder && min(yc0, yc1) < f32(shell_y0(e)) * b;
          fl &= ~(SHELL_WALK_DUG | SHELL_WALK_HAVE | SHELL_WALK_UNDER_AIR);
          fl |= select(0u, SHELL_WALK_DUG, dugIn && !(underAir && dirY > 0)) | select(0u, SHELL_WALK_HAVE, have) | select(0u, SHELL_WALK_UNDER_AIR, underAir);
          if (underAir && dirY > 0) {
            fl &= ~SHELL_WALK_WET;
          }
          if (dips && !(airUnder && max(yc0, yc1) < f32(shell_y0(e)) * b)) {
${V}
          } else {
            at = SHELL_PAST_COLUMN;
          }
        }
      }
    }${Y}
    if (at == SHELL_PAST_COLUMN) {
      let tg1 = ${Q};
      let tc1 = min(min(tcx, tcz), tg1);
      let yc1 = ro.y + rd.y * tc1;
      let have = (fl & SHELL_WALK_HAVE) != 0u;
      if ((fl & SHELL_WALK_UNDER_AIR) != 0u && dirY <= 0) {
        fl &= ~(SHELL_WALK_WET | SHELL_WALK_DUG);
      }
      let wet = (fl & SHELL_WALK_WET) != 0u && ((fl & SHELL_WALK_PASSED) != 0u || !have);
      let dug = (fl & SHELL_WALK_DUG) != 0u && (yc1 < topY || !have);
      let roofed = lendAll && have && yc1 < topY;
      fl = (fl & ~(SHELL_WALK_WET | SHELL_WALK_DUG | SHELL_WALK_PASSED | SHELL_WALK_ROOFED)) | select(0u, SHELL_WALK_WET, wet) | select(0u, SHELL_WALK_DUG, dug) | select(0u, SHELL_WALK_ROOFED, roofed);
      tc = tc1;
      if (tc >= tg1) {
        at = SHELL_PAST_GROUP;
      } else if (tcx < tcz) {
        lx += stX;
        tcx += abs(b * inv.x);
        at = SHELL_AT_COLUMN;
      } else {
        lz += stZ;
        tcz += abs(b * inv.z);
        at = SHELL_AT_COLUMN;
      }
    }
    if (at == SHELL_PAST_GROUP) {
      t = ${Q};
      if (t >= tEnd) {
        k++;
        at = SHELL_AT_SHELL;
      } else if (tgx < tgz) {
        gx += stX;
        tgx += abs(g * inv.x);
        at = SHELL_AT_GROUP;
      } else {
        gz += stZ;
        tgz += abs(g * inv.z);
        at = SHELL_AT_GROUP;
      }
    }
  }
  h.lent = (fl & SHELL_WALK_LENT) != 0u;
  h.steps = steps;
  if (at == SHELL_AT_SKY) {
    h.t = SHELL_BIG;
  }
  if (at < SHELL_MET_INSIDE) {
    return h;
  }
  let row = shells.rows[k];
  let c = row.metres.x;
  let ax = row.anchor.x;
  let az = row.anchor.y;
  h.hit = true;
  h.shell = k;
  if (at == SHELL_MET_INSIDE) {
    h.t = tc;
    h.inside = true;
    return h;
  }
  h.columnXZ = vec2i(lx + ax, lz + az);
  if (at == SHELL_MET_STAND) {
    h.t = metT;
    h.n = metN;
    h.lent = true;
    h.matter = cellSlot;
    h.cell = vec3i(floor((ro + rd * (metT + 1e-3 * c)) / c)) + vec3i(ax * 8, 0, az * 8);
    h.column = vec4u();
    return h;
  }
  h.column = e;
${j}
  return h;
}`}var MV=()=>`${MQ()}
${BQ()}

struct ShellStand {
  t: f32,
  n: vec3f,
  matter: u32,
  hit: bool,
  under: bool,
  steps: u32,
  lend: bool,
}

fn shell_preppedGround(at: u32, i: u32) -> vec3f {
  let m = shellHorizon[at + ${u.matter}u + i];
  return vec3f(shellHorizon[at + ${u.ground}u + i], m, select(0.0, 1.0, m != 0.0));
}

fn shell_stand(k: u32, ro: vec3f, rd: vec3f, inv: vec3f, lx: i32, lz: i32, c: f32, tc: f32, tc1: f32, tStart: f32, under: bool, wet: bool, slot: u32) -> ShellStand {
  var out: ShellStand;
  out.hit = false;
  out.under = false;
  out.steps = 0u;
  out.lend = false;
  let b = c * 8.0;
  let x0 = f32(lx) * b;
  let z0 = f32(lz) * b;
  var g00 = vec3f();
  var g10 = vec3f();
  var g01 = vec3f();
  var g11 = vec3f();
  let row = shells.rows[k];
  let at = ${f*_8}u + (row.slots.y - shells.rows[0].slots.y + slot) * ${b6}u;
  var prepped = false;
  if (shells.band.w > 0.5) {
    let flags = u32(shellHorizon[at + ${u.flags}u]);
    prepped = (flags & 1u) != 0u && shellHorizon[at] == f32(lx + row.anchor.x) && shellHorizon[at + 1u] == f32(lz + row.anchor.y);
  }
  if (!prepped) {
    out.lend = true;
    return out;
  }
${DV}  if (g00.z + g10.z + g01.z + g11.z < 4.0) {
    return out;
  }
  let h00 = g00.x;
  let h10 = g10.x;
  let h01 = g01.x;
  let h11 = g11.x;
  if (min(ro.y + rd.y * tc, ro.y + rd.y * tc1) >= max(max(h00, h10), max(h01, h11)) + c) {
    return out;
  }
  if (min(min(h00, h10), min(h01, h11)) > ro.y + c) {
    return out;
  }
  let stX = select(-1, 1, rd.x >= 0.0);
  let stZ = select(-1, 1, rd.z >= 0.0);
  let pc = ro + rd * (tc + 1e-3 * c);
  var l = clamp(vec2i(floor((pc.xz - vec2f(x0, z0)) / c)), vec2i(), vec2i(7));
  var tmx = (x0 + f32(l.x + select(0, 1, stX > 0)) * c - ro.x) * inv.x;
  var tmz = (z0 + f32(l.y + select(0, 1, stZ > 0)) * c - ro.z) * inv.z;
  let tdx = abs(c * inv.x);
  let tdz = abs(c * inv.z);
  let tnx = (x0 + select(0.0, b, rd.x < 0.0) - ro.x) * inv.x;
  let tnz = (z0 + select(0.0, b, rd.z < 0.0) - ro.z) * inv.z;
  var n = select(vec3f(0.0, 0.0, -f32(stZ)), vec3f(-f32(stX), 0.0, 0.0), tnx > tnz);
  var face = max(tnx, tnz) >= tc - 1e-3 * c;
  var inside = under;
  var t0 = tc;
  for (var i = 0u; i < 16u; i++) {
    out.steps++;
    let t1 = min(min(tmx, tmz), tc1);
    let u = (f32(l.x) + 0.5) * 0.125;
    let v = (f32(l.y) + 0.5) * 0.125;
    let hc = c * floor(mix(mix(h00, h10, u), mix(h01, h11, u), v) / c);
    let matter = u32(select(select(g10.y, g00.y, u < 0.5), select(g11.y, g01.y, u < 0.5), v >= 0.5));
    let passes = wet && shell_liquid(matter);
    if (hc > ro.y) {
      inside = false;
    } else if (ro.y + rd.y * t0 <= hc) {
      if (!inside && !passes && face && t0 > tStart + 1e-3 * c) {
        out.t = t0;
        out.n = n;
        out.matter = matter;
        out.hit = true;
        return out;
      }
      inside = inside || !passes;
    } else {
      inside = false;
      if (!passes && ro.y + rd.y * t1 < hc) {
        out.t = (hc - ro.y) * inv.y;
        out.n = SHELL_UP;
        out.matter = matter;
        out.hit = true;
        return out;
      }
    }
    if (t1 >= tc1) {
      break;
    }
    t0 = t1;
    face = true;
    if (tmx < tmz) {
      l.x += stX;
      tmx += tdx;
      n = vec3f(-f32(stX), 0.0, 0.0);
      if (l.x < 0 || l.x > 7) {
        break;
      }
    } else {
      l.y += stZ;
      tmz += tdz;
      n = vec3f(0.0, 0.0, -f32(stZ));
      if (l.y < 0 || l.y > 7) {
        break;
      }
    }
  }
  out.under = inside;
  return out;
}

fn shell_liquid(matter: u32) -> bool {
  return shellTones[matter * ${r}u + 2u].y > 0.5;
}

fn shell_clear(matter: u32) -> bool {
  return shellTones[matter * ${r}u + 2u].w > 0.5;
}

fn shell_shaped(matter: u32) -> f32 {
  return shellTones[matter * ${r}u + 3u].y;
}

fn shell_through(matter: u32) -> bool {
  return shellTones[matter * ${r}u + 3u].z > 0.5;
}

fn shell_nearHolds(p: vec3f) -> bool {
  let band = shell_nearBand(p.xz);
  return p.y > band.x && p.y < band.y;
}

fn shell_nearOwns(p: vec3f, matter: u32, dug: bool) -> bool {
  if (!shell_nearHolds(p)) {
    return false;
  }
  let shaped = shell_shaped(matter);
  if ((shells.head.y & ${j8}u) != 0u) {
    return shell_through(matter) || dug;
  }
  return dug || shaped < 1.5;
}

fn shell_handsOn(k: u32, t: f32) -> bool {
  let c = shells.rows[k + 1u].metres.x;
  return c <= SHELLS_CAVE_CUBE_LEAST_M || c <= SHELLS_LEND_MOST_PX * shells.far.y * max(t, 1e-3);
}

fn shell_nearCovered(p: vec2f) -> bool {
  return shell_nearBand(p).y > -SHELL_BIG;
}

fn shell_nearBand(p: vec2f) -> vec2f {
  let g = vec2i(floor((p - shells.paint.zw) * shells.band.y));
  if (any(g < vec2i()) || any(g >= vec2i(${L}))) {
    return vec2f(-SHELL_BIG);
  }
  let cell = u32(g.y * ${L} + g.x);
  let word = shells.near[cell >> 2u][cell & 3u];
  let low = i32(word << 16u) >> 16u;
  let high = i32(word) >> 16u;
  return select(vec2f(f32(low), f32(high)) * 0.5, vec2f(-SHELL_BIG), high == ${e8});
}

fn shell_nearStart(ro: vec3f, rd: vec3f, tStop: f32) -> f32 {
  let q = (ro.xz - shells.paint.zw) * shells.band.y;
  var g = vec2i(floor(q));
  if (any(g < vec2i()) || any(g >= vec2i(${L}))) {
    return 0.0;
  }
  let d = rd.xz * shells.band.y;
  let inv = shell_inv(vec3f(d, 1.0)).xy;
  let st = vec2i(select(vec2i(-1), vec2i(1), d >= vec2f()));
  var tm = (vec2f(g + max(st, vec2i())) - q) * inv;
  let td = abs(inv);
  var t = 0.0;
  for (var n = 0; n < ${2*L}; n = n + 1) {
    let t1 = min(min(tm.x, tm.y), tStop);
    let cell = u32(g.y * ${L} + g.x);
    let word = shells.near[cell >> 2u][cell & 3u];
    let high = i32(word) >> 16u;
    let low = f32(i32(word << 16u) >> 16u) * 0.5;
    let ya = ro.y + rd.y * t;
    let yb = ro.y + rd.y * t1;
    if (high == ${e8} || min(ya, yb) <= low || max(ya, yb) >= f32(high) * 0.5) {
      break;
    }
    if (t1 >= tStop) {
      return tStop;
    }
    t = t1;
    if (tm.x < tm.y) {
      g.x += st.x;
      tm.x += td.x;
    } else {
      g.y += st.y;
      tm.y += td.y;
    }
    if (any(g < vec2i()) || any(g >= vec2i(${L}))) {
      break;
    }
  }
  return max(t - 1.5 * shells.band.z, 0.0);
}

fn shell_shapedAir(matter: u32, p: vec3f, c: f32) -> bool {
  let shaped = shell_shaped(matter);
  if (shaped < 0.5) {
    return false;
  }
  let d = distance(p, shells.eye.xyz);
  if (c > SHELLS_LEND_MOST_PX * shells.far.y * max(d, 1e-3)) {
    return true;
  }
  if (shaped > 1.5) {
    let cell = vec3i(floor(p / c));
    return d < shells.cover.x - shells.cover.y * shell_hash(cell.x, cell.z, u32(cell.y & 0xffff));
  }
  return shell_nearCovered(p.xz);
}

fn shell_cellWord(k: u32, c: vec3i, near: vec4u, nearXZ: vec2i) -> vec2u {
  let bx = c.x >> 3u;
  let bz = c.z >> 3u;
  let by = c.y >> 3u;
  var e = near;
  if (bx != nearXZ.x || bz != nearXZ.y) {
    e = shell_column(k, bx, bz);
    if (!shell_present(e, bx, bz)) {
      return vec2u();
    }
  }
  let y0 = shell_y0(e);
  let n = i32(e.y >> 16u);
  if (by < y0) {
    return vec2u(select(0u, SHELL_SOLID | shell_baseMatter(e), (e.w >> 16u) != 0u), 0u);
  }
  if (by >= y0 + n) {
    return vec2u();
  }
  let entry = shellDir[e.z + u32(by - y0)];
  if (entry == 0u || (entry & SHELL_SOLID) != 0u) {
    return vec2u(entry, 0u);
  }
  return vec2u(entry, shell_nibble(entry - 1u, vec3i(c.x & 7, c.y & 7, c.z & 7)));
}

fn shell_cellMatter(k: u32, c: vec3i, near: vec4u, nearXZ: vec2i) -> u32 {
  let w = shell_cellWord(k, c, near, nearXZ);
  return select(select(0u, shell_paletteMatter(w.x - 1u, w.y), w.y != 0u), w.x & 0xffffu, (w.x & SHELL_SOLID) != 0u);
}

fn shell_solid(k: u32, c: vec3i, near: vec4u, nearXZ: vec2i) -> bool {
  let w = shell_cellWord(k, c, near, nearXZ);
  return (w.x & SHELL_SOLID) != 0u || w.y != 0u;
}

fn shell_proudFace(k: u32, cell: vec3i, ro: vec3f, rd: vec3f, inv: vec3f, lo: vec3f, size: f32, column: vec4u, columnXZ: vec2i, n0: vec3f) -> vec3f {
  let tn = (lo + select(vec3f(), vec3f(size), rd < vec3f()) - ro) * inv;
  let back = select(vec3i(1), vec3i(-1), rd > vec3f());
  var best = -SHELL_BIG;
  var n = n0;
  for (var a = 0u; a < 3u; a++) {
    let axis = select(select(vec3i(1, 0, 0), vec3i(0, 1, 0), a == 1u), vec3i(0, 0, 1), a == 2u);
    if (tn[a] > best && !shell_solid(k, cell + axis * back[a], column, columnXZ)) {
      best = tn[a];
      n = vec3f(axis * back[a]);
    }
  }
  return n;
}

fn shell_met(ro: vec3f, inv: vec3f, rd: vec3f, lo: vec3f, size: f32, enter: f32, h: ptr<function, ShellHit>) {
  let tn = (lo + select(vec3f(), vec3f(size), rd < vec3f()) - ro) * inv;
  let most = select(SHELL_BIG, enter + max(enter, 1.0) * 1e-6, (shells.head.y & ${j8}u) != 0u);
  var b = select(vec3f(-SHELL_BIG), tn, tn <= vec3f(most));
  b = select(b, tn, max(max(b.x, b.y), b.z) <= -SHELL_BIG);
  let t = max(max(b.x, b.y), b.z);
  (*h).t = max((*h).t, t);
  (*h).n = -sign(rd) * select(select(vec3f(0.0, 0.0, 1.0), SHELL_UP, b.y == t), vec3f(1.0, 0.0, 0.0), b.x == t);
}

fn shells_horizonFrom(rd: vec3f) -> f32 {
  let flat = length(rd.xz);
  if (flat <= 1e-6 || shells.paint.y <= 0.0) {
    return 0.0;
  }
  let f = (atan2(rd.z, rd.x) + 3.14159265) * ${f/G8};
  let w = (u32(f) % ${f}u) * SHELLS_HORIZON_WORDS;
  if (rd.y > shellHorizon[w] * flat) {
    return SHELL_BIG;
  }
  if (rd.y >= shellHorizon[w + 1u] * flat && rd.y < shellHorizon[w + 2u] * flat) {
    return SHELL_BIG;
  }
  var tFrom = 0.0;
  for (var j = 0u; j < ${h9}u; j++) {
    if (rd.y <= shellHorizon[w + 3u + j] * flat) {
      break;
    }
    tFrom = ${DQ}.0 * f32(1u << j);
  }
  return tFrom;
}

fn shells_landMarch(ro: vec3f, rd: vec3f, tStart: f32, tStop: f32, dugFrom: bool) -> ShellHit {
  var h = shells_landWalk(ro, rd, tStart, tStop, dugFrom);
  if (h.hit && h.proud) {
    let row = shells.rows[h.shell];
    let c = row.metres.x;
    let inv = shell_inv(rd);
    let lo = vec3f(h.cell - vec3i(row.anchor.x * 8, 0, row.anchor.y * 8)) * c;
    h.n = shell_proudFace(h.shell, h.cell, ro, rd, inv, lo, c, h.column, h.columnXZ, h.n);
  }
  return h;
}

${FQ(!1)}

override ${n$}: bool = true;
fn shells_march(ro: vec3f, rd: vec3f, tStart: f32, tStop: f32) -> ShellHit {
  var dug = false;
  var land: ShellHit;
  loop {
    land = shells_landMarch(ro, rd, tStart, tStop, dug);
    if (!land.inside || dug) {
      break;
    }
${zV}    dug = true;
  }
  if (!land.hit && land.t >= SHELL_BIG) {
    return land;
  }
  let th = shells_thingMarch(ro, rd, max(max(tStart, shells.far.z), shells_horizonFrom(rd)), select(tStop, land.t, land.hit), land.steps);
  if (th.hit) {
    return th;
  }
  return land;
}

fn shells_surfaceMarch(ro: vec3f, rd: vec3f, stop: f32) -> ShellHit {
  if ((shells.head.y & ${$9}u) != 0u) {
    var h: ShellHit;
    h.hit = true;
    h.inside = true;
    return h;
  }
  if (stop <= 0.0) {
    var none: ShellHit;
    none.t = SHELL_BIG;
    return none;
  }
  return shells_march(ro, rd, 0.0, stop);
}

fn shells_litMarch(ro: vec3f, rd: vec3f, tFrom: f32, stop: f32, first: bool) -> ShellHit {
  var start = tFrom;
  if (first) {
    if ((shells.head.y & ${$9}u) != 0u) {
      var h: ShellHit;
      h.hit = true;
      h.inside = true;
      return h;
    }
    start = shell_nearStart(ro, rd, stop);
    if (start >= stop) {
      var none: ShellHit;
      none.t = stop;
      return none;
    }
  }
  return shells_march(ro, rd, start, stop);
}

const THING_AT_SHELL = 0u;
const THING_AT_GROUP = 1u;
const THING_AT_COLUMN = 2u;
const THING_AT_BRICK = 3u;
const THING_AT_CELL = 4u;
const THING_PAST_BRICK = 5u;
const THING_PAST_COLUMN = 6u;
const THING_PAST_GROUP = 7u;
const THING_AT_END = 8u;
const THING_MET = 9u;
fn shells_thingMarch(ro: vec3f, rd: vec3f, tFrom: f32, tTo: f32, steps0: u32) -> ShellHit {
  var h: ShellHit;
  h.t = tTo;
  h.thing = true;
  let count = shells.head.x;
  let inv = shell_inv(rd);
  let stX = select(-1, 1, rd.x >= 0.0);
  let stZ = select(-1, 1, rd.z >= 0.0);
  let dirY = select(-1, 1, rd.y >= 0.0);
  let split = shells.far.z;
  var steps = steps0;
  var bandFrom = 0.0;
  var k = 0u;
  var at = THING_AT_SHELL;
  var t = 0.0;
  var tOut = 0.0;
  var gx = 0;
  var gz = 0;
  var tgx = 0.0;
  var tgz = 0.0;
  var lx = 0;
  var lz = 0;
  var tcx = 0.0;
  var tcz = 0.0;
  var tc = 0.0;
  var et = vec4u();
  var by = 0;
  var byEnd = 0;
  var entry = 0u;
  var l = vec3i();
  var tm = vec3f();
  var metT = 0.0;
  var metN = vec3f();
  var matter = 0u;
  loop {
    if (at == THING_AT_SHELL && k >= count) {
      at = THING_AT_END;
    }
    if (at >= THING_AT_END) {
      break;
    }
    let row = shells.rows[k];
    let c = row.metres.x;
    let b = c * 8.0;
    let g = b * 8.0;
    let ax = row.anchor.x;
    let az = row.anchor.y;
    if (at == THING_AT_SHELL) {
      let bandTo = select(row.metres.y, SHELL_BIG, k + 1u >= count);
      let tBand = max(bandFrom, tFrom);
      bandFrom = bandTo;
      var tIn = SHELL_BIG;
      if (row.things.x >= 0 && tBand < tTo) {
        let sx = row.things.y;
        let sz = row.things.z;
        let lo = vec2f(f32(((sx << 16u) >> 16u) - (ax >> 3u)), f32(((sz << 16u) >> 16u) - (az >> 3u))) * g;
        let hi = vec2f(f32((sx >> 16u) + 1 - (ax >> 3u)), f32((sz >> 16u) + 1 - (az >> 3u))) * g;
        let ta = (lo - ro.xz) * inv.xz;
        let tb = (hi - ro.xz) * inv.xz;
        tIn = max(max(min(ta.x, tb.x), min(ta.y, tb.y)), tBand);
        tOut = min(min(max(ta.x, tb.x), max(ta.y, tb.y)), min(bandTo, tTo));
      }
      if (tIn >= tOut) {
        k++;
      } else {
        let p0 = ro + rd * (tIn + 1e-3 * c);
        gx = i32(floor(p0.x / g));
        gz = i32(floor(p0.z / g));
        let lg = shell_leave(ro.xz, inv.xz, vec2i(gx, gz), g);
        tgx = lg.x;
        tgz = lg.y;
        t = tIn;
        at = THING_AT_GROUP;
      }
    }
    if (at == THING_AT_GROUP) {
      steps++;
      let tg1 = min(min(tgx, tgz), tOut);
      if (steps > SHELLS_STEP_BUDGET) {
        at = THING_AT_END;
      } else {
        let tTop = shell_thingGroupTop(k, gx + (ax >> 3u), gz + (az >> 3u));
        if (tTop > -SHELL_BIG && min(ro.y + rd.y * t, ro.y + rd.y * tg1) < tTop * c) {
          let pc = ro + rd * (t + 1e-3 * c);
          lx = clamp(i32(floor(pc.x / b)), gx * 8, gx * 8 + 7);
          lz = clamp(i32(floor(pc.z / b)), gz * 8, gz * 8 + 7);
          let lc = shell_leave(ro.xz, inv.xz, vec2i(lx, lz), b);
          tcx = lc.x;
          tcz = lc.y;
          tc = t;
          at = THING_AT_COLUMN;
        } else {
          at = THING_PAST_GROUP;
        }
      }
    }
    let tc1 = min(min(tcx, tcz), min(min(tgx, tgz), tOut));
    if (at == THING_AT_COLUMN) {
      steps++;
      if (steps > SHELLS_STEP_BUDGET) {
        at = THING_AT_END;
      } else {
        let bx = lx + ax;
        let bz = lz + az;
        et = shell_thingRecord(k, shell_slot(k, bx, bz));
        if (shell_present(et, bx, bz) && min(ro.y + rd.y * tc, ro.y + rd.y * tc1) < f32(shell_top(et)) * c) {
          let y0 = shell_y0(et);
          let n = i32(et.y >> 16u);
          by = clamp(i32(floor((ro.y + rd.y * tc) / b)), y0, y0 + n - 1);
          byEnd = clamp(i32(floor((ro.y + rd.y * tc1) / b)), y0, y0 + n - 1);
          at = THING_AT_BRICK;
        } else {
          at = THING_PAST_COLUMN;
        }
      }
    }
    let tb0 = max(tc, (f32(by + select(1, 0, dirY > 0)) * b - ro.y) * inv.y);
    let tb1 = min(tc1, (f32(by + select(0, 1, dirY > 0)) * b - ro.y) * inv.y);
    if (at == THING_AT_BRICK) {
      steps++;
      if (steps > SHELLS_STEP_BUDGET) {
        at = THING_AT_END;
      } else {
        entry = shellDir[et.z + u32(by - shell_y0(et))];
        if (tb0 < tb1 && entry != 0u && tb1 >= split) {
          let bo = vec3i(lx * 8, by * 8, lz * 8);
          let pe = ro + rd * (tb0 + 1e-3 * c);
          l = clamp(vec3i(floor(pe / c)) - bo, vec3i(), vec3i(7));
          tm = (vec3f(bo + l + max(vec3i(stX, dirY, stZ), vec3i())) * c - ro) * inv;
          at = THING_AT_CELL;
        } else {
          at = THING_PAST_BRICK;
        }
      }
    }
    if (at == THING_AT_CELL) {
      steps++;
      if (steps > SHELLS_STEP_BUDGET) {
        at = THING_AT_END;
      } else {
        let bo = vec3i(lx * 8, by * 8, lz * 8);
        var m = entry & 0xffffu;
        if ((entry & SHELL_SOLID) == 0u) {
          let nib = shell_nibble(entry - 1u, l);
          m = select(0u, shell_paletteMatter(entry - 1u, nib), nib != 0u);
        }
        if (m != 0u) {
          var probe: ShellHit;
          probe.t = tb0;
          shell_met(ro, inv, rd, vec3f(bo + l) * c, c, SHELL_BIG, &probe);
          if (probe.t >= split) {
            metT = probe.t;
            metN = probe.n;
            matter = m;
            at = THING_MET;
          }
        }
        if (at == THING_AT_CELL) {
          let td = abs(c * inv);
          if (tm.x < tm.y && tm.x < tm.z) {
            if (tm.x > tb1) {
              at = THING_PAST_BRICK;
            } else {
              l.x += stX;
              if (l.x < 0 || l.x > 7) {
                at = THING_PAST_BRICK;
              } else {
                tm.x += td.x;
              }
            }
          } else if (tm.y < tm.z) {
            if (tm.y > tb1) {
              at = THING_PAST_BRICK;
            } else {
              l.y += dirY;
              if (l.y < 0 || l.y > 7) {
                at = THING_PAST_BRICK;
              } else {
                tm.y += td.y;
              }
            }
          } else {
            if (tm.z > tb1) {
              at = THING_PAST_BRICK;
            } else {
              l.z += stZ;
              if (l.z < 0 || l.z > 7) {
                at = THING_PAST_BRICK;
              } else {
                tm.z += td.z;
              }
            }
          }
        }
      }
    }
    if (at == THING_PAST_BRICK) {
      if (by * dirY >= byEnd * dirY) {
        at = THING_PAST_COLUMN;
      } else {
        by += dirY;
        at = THING_AT_BRICK;
      }
    }
    if (at == THING_PAST_COLUMN) {
      let tg1 = min(min(tgx, tgz), tOut);
      tc = min(min(tcx, tcz), tg1);
      if (tc >= tg1) {
        at = THING_PAST_GROUP;
      } else if (tcx < tcz) {
        lx += stX;
        tcx += abs(b * inv.x);
        at = THING_AT_COLUMN;
      } else {
        lz += stZ;
        tcz += abs(b * inv.z);
        at = THING_AT_COLUMN;
      }
    }
    if (at == THING_PAST_GROUP) {
      t = min(min(tgx, tgz), tOut);
      if (t >= tOut) {
        k++;
        at = THING_AT_SHELL;
      } else if (tgx < tgz) {
        gx += stX;
        tgx += abs(g * inv.x);
        at = THING_AT_GROUP;
      } else {
        gz += stZ;
        tgz += abs(g * inv.z);
        at = THING_AT_GROUP;
      }
    }
  }
  h.steps = steps;
  if (at == THING_MET) {
    let row = shells.rows[k];
    let ax = row.anchor.x;
    let az = row.anchor.y;
    h.t = metT;
    h.n = metN;
    h.hit = true;
    h.matter = matter;
    h.shell = k;
    h.cell = vec3i(lx * 8, by * 8, lz * 8) + l + vec3i(ax * 8, 0, az * 8);
    h.column = shell_column(k, lx + ax, lz + az);
    h.columnXZ = vec2i(lx + ax, lz + az);
  }
  return h;
}

fn shell_tone(index: u32, p: vec3f, n: vec3f, pixelM: f32) -> vec4f {
  let tint = shellTones[index * ${r}u];
  let wear = shellTones[index * ${r}u + 1u];
  if (wear.w < 0.0) {
    return vec4f(wear.rgb, tint.a);
  }
  let layer = u32(wear.w);
  let floors = shellFloors[layer];
  let preJoin = voxel_preJoinColor(floors.z);
  var albedo = preJoin;
  if (floors.y < 1.0) {
    let uv = select(select(p.xy, p.zy, abs(n.x) > 0.5), p.xz, abs(n.y) > 0.5);
    let texels = f32(textureDimensions(shellAlbedo, 0).x);
    let lod = max(log2(max(pixelM * texels, 1e-6)), floors.x);
    albedo = mix(textureSampleLevel(shellAlbedo, shellSampler, uv, layer, lod).rgb, preJoin, floors.y);
  }
  return vec4f(albedo * (tint.rgb / max(dot(tint.rgb, vec3f(0.2126, 0.7152, 0.0722)), 1e-4)), tint.a);
}

fn shell_faceDir(n: vec3f) -> u32 {
  if (abs(n.x) > 0.5) {
    return select(1u, 0u, n.x > 0.0);
  }
  if (abs(n.y) > 0.5) {
    return select(3u, 2u, n.y > 0.0);
  }
  return select(5u, 4u, n.z > 0.0);
}


fn shell_sky(h: ShellHit) -> f32 {
  return select(1.0, 0.0, !h.hit || h.inside);
}

fn shell_standsIn(h: ShellHit) -> bool {
  return h.hit && h.lent && !h.inside && all(h.column == vec4u());
}

fn shell_distance(h: ShellHit) -> f32 {
  return select(h.t, shells.rows[0].metres.y, h.inside);
}

struct ShellLook {
  albedo: vec3f,
  N: vec3f,
  roughness: f32,
  metalness: f32,
  emissive: vec3f,
}

fn shell_coverNormal(h: ShellHit, rd: vec3f, c: f32) -> vec3f {
  let n = h.n;
  if (h.thing || !h.hit) {
    return n;
  }
  var eb = SHELL_UP;
  var ec = vec3f(0.0, 0.0, 1.0);
  if (abs(n.y) > 0.5) {
    eb = vec3f(1.0, 0.0, 0.0);
  } else if (abs(n.z) > 0.5) {
    eb = vec3f(1.0, 0.0, 0.0);
    ec = SHELL_UP;
  }
  let pixel = max(h.t * shells.far.y, 1e-6);
  let facing = abs(dot(rd, n));
  let wb = c * facing / (pixel * max(length(ec - dot(rd, ec) * rd), 1e-3));
  let wc = c * facing / (pixel * max(length(eb - dot(rd, eb) * rd), 1e-3));
  let w = min(wb, wc);
  if (w >= 1.0) {
    return n;
  }
  let u = select(ec, eb, wb <= wc);
  let ui = vec3i(u);
  let ni = vec3i(n);
  let k = h.shell;
  var side = 0u;
  for (var i = 0u; i < 4u; i++) {
    let off = select(ui, -ui, i >= 2u) + select(vec3i(), ni, (i & 1u) != 0u);
    side |= u32(shell_solid(k, h.cell + off, h.column, h.columnXZ)) << i;
  }
  let plus = (side & 3u) == 1u;
  let minus = (side & 12u) == 4u;
  if (plus && minus) {
    return n;
  }
  let share = clamp(w * (1.0 + select(0.0, 1.0, plus) + select(0.0, 1.0, minus)), 0.0, 1.0);
  return normalize(mix(-sign(dot(rd, u)) * u, n, share));
}

fn shell_surfaceOf(w: u32) -> vec3f {
  let p = vec2f(f32(w & ${f8}u), f32((w >> 10u) & ${f8}u)) * (2.0 / ${f8}.0) - 1.0;
  return normalize(vec3f(p.x, max(1.0 - abs(p.x) - abs(p.y), 0.0), p.y));
}

fn shell_underOf(w: u32) -> vec3f {
  let p = vec2f(f32(w & ${u8}u), f32((w >> 8u) & ${u8}u)) * (2.0 / ${u8}.0) - 1.0;
  return normalize(vec3f(p.x, -max(1.0 - abs(p.x) - abs(p.y), 0.0), p.y));
}

fn shell_surfaceNormal(h: ShellHit) -> vec3f {
  if (h.thing || !h.hit || h.inside) {
    return vec3f();
  }
  let k = h.shell;
  if (shell_standsIn(h)) {
    if (h.n.y < -0.5) {
      return vec3f();
    }
    let row = shells.rows[k];
    let p = (vec2f(h.cell.xz - row.anchor.xy * 8) + 0.5) * row.metres.x;
    let guess = shell_corner(k + 1u, p.x, p.y);
    if (!guess.found) {
      return vec3f();
    }
    let stood = shell_landRound(guess.j, p / (guess.cj * 8.0) + vec2f(shells.rows[guess.j].anchor.xy) - 0.5, false);
    if (dot(stood.up, stood.up) < 1e-8) {
      return vec3f();
    }
    return normalize(stood.up);
  }
  let hot = u32(shells.rows[k].anchor.w);
  let ob = vec2i(h.cell.x >> 3u, h.cell.z >> 3u);
  let os = shell_slot(k, ob.x, ob.y);
  let oe = shell_record(k, os);
  if (!shell_present(oe, ob.x, ob.y)) {
    return vec3f();
  }
  let ow = shellDir[hot + os * ${d}u + ${d8}u];
  let depth = i32(ow >> ${Q6}u);
  let f = (vec2f(h.cell.xz) + 0.5) * (1.0 / ${O}.0) - 0.5;
  let onTop = depth != 0 && h.n.y >= -0.5 && h.cell.y >= shell_top(oe) - depth;
  if (onTop) {
    let up = shell_landRound(k, f, false).up;
    if (dot(up, up) >= 1e-8) {
      return normalize(up);
    }
  }
  let ou = shellDir[hot + os * ${d}u + ${n8}u];
  if ((ou >> 16u) == 0u) {
    return vec3f();
  }
  let reach = i32(ou >> 16u) + ${g};
  let r = shell_landRound(k, f, true);
  let hasUp = depth != 0 && dot(r.up, r.up) >= 1e-8;
  let hasDown = dot(r.down, r.down) >= 1e-8;
  if (hasDown && h.n.y <= 0.5 && h.cell.y < reach) {
    return normalize(r.down);
  }
  if (hasUp && hasDown) {
    let up = normalize(r.up);
    let down = normalize(r.down);
    let foot = r.foot / r.upShare;
    let head = r.head / r.downShare;
    let mixed = normalize(mix(down, up, clamp((f32(h.cell.y) + 0.5 - head) / max(foot - head, 1.0), 0.0, 1.0)));
    if (dot(up, down) > -0.5 && dot(mixed, h.n) > -0.5) {
      return mixed;
    }
  }
  return vec3f();
}

struct ShellRound {
  up: vec3f,
  foot: f32,
  upShare: f32,
  down: vec3f,
  head: f32,
  downShare: f32,
}

fn shell_landRound(k: u32, f: vec2f, under: bool) -> ShellRound {
  let hot = u32(shells.rows[k].anchor.w);
  let b0 = vec2i(floor(f));
  let t = f - vec2f(b0);
  var r: ShellRound;
  for (var i = 0u; i < 4u; i++) {
    let o = vec2i(i32(i & 1u), i32(i >> 1u));
    let b = b0 + o;
    let slot = shell_slot(k, b.x, b.y);
    let e = shell_record(k, slot);
    if (!shell_present(e, b.x, b.y)) {
      continue;
    }
    let share = select(1.0 - t.x, t.x, o.x == 1) * select(1.0 - t.y, t.y, o.y == 1);
    let w = shellDir[hot + slot * ${d}u + ${d8}u];
    let depth = w >> ${Q6}u;
    if (depth != 0u) {
      r.up += shell_surfaceOf(w) * share;
      r.foot += f32(shell_top(e) - i32(depth)) * share;
      r.upShare += share;
    }
    if (!under) {
      continue;
    }
    let u = shellDir[hot + slot * ${d}u + ${n8}u];
    if ((u >> 16u) != 0u) {
      r.down += shell_underOf(u) * share;
      r.head += f32(i32(u >> 16u) + ${g}) * share;
      r.downShare += share;
    }
  }
  return r;
}

fn shell_look(ro: vec3f, rd: vec3f, h: ShellHit) -> ShellLook {
  var out: ShellLook;
  let row = shells.rows[h.shell];
  let c = row.metres.x;
  let p = ro + rd * h.t;
  let cosine = max(abs(dot(h.n, rd)), 0.15);
  let pixelM = h.t * shells.paint.x / cosine;
  let index = select(h.matter, 0u, h.thing);
  var tone = shell_tone(index, p, h.n, pixelM);
  var lookRow = u32(shellTones[index * ${r}u + 3u].x);
  if (h.thing) {
    let m = h.matter;
    let srgb = vec3f(f32((m >> 11u) & 31u) / 31.0, f32((m >> 5u) & 63u) / 63.0, f32(m & 31u) / 31.0);
    tone = vec4f(pow(srgb, vec3f(2.2)), 0.9);
    lookRow = 0u;
  }
  let paint = shell_paint(tone, lookRow, h, ro, rd, pixelM);
  let cubePx = c / max(h.t * shells.far.y, 1e-6);
  let jitter = shell_hash(h.cell.x * 73 + h.cell.y * 1931, h.cell.z, h.shell);
  let smoothLand = (shells.head.y & ${S9}u) != 0u && !h.thing;
  let amp = select(0.18 * clamp((cubePx - 1.0) * 0.5, 0.0, 1.0), 0.0, lookRow != 0u || smoothLand);
  var albedo = paint.rgb * (1.0 - amp * 0.5 + amp * jitter);
  let n = h.n;
  var ao = 1.0;
  let aoW = select(0.0, clamp((row.metres.y - h.t) / (0.2 * row.metres.y), 0.0, 1.0), h.shell == 0u && h.hit && !smoothLand);
  if ((shells.head.y & 1u) != 0u && aoW > 0.0) {
    let a = h.cell + vec3i(n);
    var ta = vec3i(1, 0, 0);
    var tb = vec3i(0, 0, 1);
    let f = p / c;
    var fu = fract(f.x);
    var fv = fract(f.z);
    if (abs(n.x) > 0.5) {
      ta = vec3i(0, 1, 0);
      tb = vec3i(0, 0, 1);
      fu = fract(f.y);
      fv = fract(f.z);
    } else if (abs(n.z) > 0.5) {
      ta = vec3i(1, 0, 0);
      tb = vec3i(0, 1, 0);
      fu = fract(f.x);
      fv = fract(f.y);
    }
    let k = h.shell;
    var ring = 0u;
    for (var i = 0u; i < 9u; i++) {
      if (i == 4u) {
        continue;
      }
      let du = i32(i % 3u) - 1;
      let dv = i32(i / 3u) - 1;
      ring |= u32(shell_solid(k, a + ta * du + tb * dv, h.column, h.columnXZ)) << i;
    }
    let sm0 = i32((ring >> 3u) & 1u);
    let sp0 = i32((ring >> 5u) & 1u);
    let s0m = i32((ring >> 1u) & 1u);
    let s0p = i32((ring >> 7u) & 1u);
    let smm = i32(ring & 1u);
    let spm = i32((ring >> 2u) & 1u);
    let smp = i32((ring >> 6u) & 1u);
    let spp = i32((ring >> 8u) & 1u);
    let c00 = VOXEL_AO_CURVE[select(3 - (sm0 + s0m + smm), 0, sm0 + s0m == 2)];
    let c10 = VOXEL_AO_CURVE[select(3 - (sp0 + s0m + spm), 0, sp0 + s0m == 2)];
    let c01 = VOXEL_AO_CURVE[select(3 - (sm0 + s0p + smp), 0, sm0 + s0p == 2)];
    let c11 = VOXEL_AO_CURVE[select(3 - (sp0 + s0p + spp), 0, sp0 + s0p == 2)];
    ao = mix(1.0, mix(mix(c00, c10, fu), mix(c01, c11, fu), fv), aoW);
  }
  albedo *= ao;
  out.albedo = albedo;
  var N = vec3f();
  if (smoothLand) {
    N = shell_surfaceNormal(h);
  }
  if (all(N == vec3f())) {
    N = shell_coverNormal(h, rd, c);
  }
  out.N = normalize(N + paint.tilt);
  out.roughness = paint.roughness;
  out.metalness = paint.metalness;
  out.emissive = paint.emissive;
  return out;
}

fn shell_ray(frag: vec4f) -> vec3f {
  shell_arrivalNoise = fract(52.9829189 * fract(dot(frag.xy, vec2f(0.06711056, 0.00583715))));
  let ndc = vec2f(frag.x / frame.viewportSize.x * 2.0 - 1.0, 1.0 - frag.y / frame.viewportSize.y * 2.0);
  let near = frame.inverseViewProj * vec4f(ndc, 1.0, 1.0);
  let lensW = frame.proj[3][3] - frame.proj[2][3];
  let ortho = select(0.0, frame.proj[3][3] / lensW, lensW != 0.0);
  let back = vec3f(frame.view[0][2], frame.view[1][2], frame.view[2][2]);
  return normalize((near.xyz / near.w - frame.cameraPosition) * (1.0 - ortho) - back * ortho);
}`,BV=ZQ("shell_bandCorner",KQ),AQ="out.position = frame.viewProj * vec4f(mix(lo.xyz, hi.xyz, corner), 1.0);",FV,z7=`
${BV}

struct ShellBandVs {
  @builtin(position) position: vec4f,
  @location(0) @interpolate(flat) lo: vec3f,
  @location(1) @interpolate(flat) hi: vec3f,
  @location(2) @interpolate(flat) wall: f32,
}

@vertex
fn vs(@builtin(vertex_index) v: u32, @location(0) lo: vec4f, @location(1) hi: vec4f) -> ShellBandVs {
  let corner = shell_bandCorner(v);
  var out: ShellBandVs;
  ${AQ}
  out.lo = lo.xyz;
  out.hi = hi.xyz;
  out.wall = lo.w;
  return out;
}

@group(3) @binding(0) var bandNear: texture_2d<f32>;
fn shells_bandStop(frag: vec4f) -> f32 {
  let size = vec2<i32>(textureDimensions(bandNear));
  let near = textureLoad(bandNear, min(vec2<i32>(frag.xy), size - vec2<i32>(1)), 0).x;
  if (near <= ${N6}) {
    return shells.far.x;
  }
  let ndc = vec2f(frag.x / frame.viewportSize.x * 2.0 - 1.0, 1.0 - frag.y / frame.viewportSize.y * 2.0);
  let world = frame.inverseViewProj * vec4f(ndc, near, 1.0);
  return length(world.xyz / world.w - frame.cameraPosition) * 1.0001;
}

fn shells_coverBand(ro: vec3f, rd: vec3f, boxLo: vec3f, boxHi: vec3f, wall: bool, stop: f32) -> ShellHit {
  var none: ShellHit;
  none.hit = false;
  none.lent = false;
  none.inside = false;
  none.thing = false;
  none.t = SHELL_BIG;
  none.steps = 0u;
  none.matter = 0u;
  none.shell = 0u;
  if ((shells.head.y & ${$9}u) != 0u) {
    return none;
  }
  let lo = ro + (boxLo - frame.cameraPosition);
  let hi = ro + (boxHi - frame.cameraPosition);
  let inv = shell_inv(rd);
  let ta = (lo - ro) * inv;
  let tb = (hi - ro) * inv;
  let t0 = max(max(min(ta.x, tb.x), min(ta.y, tb.y)), min(ta.z, tb.z));
  let t1 = min(min(max(ta.x, tb.x), max(ta.y, tb.y)), max(ta.z, tb.z));
  if (t1 <= max(t0, 0.0)) {
    return none;
  }
  if (t0 - 2.0 * shells.rows[0].metres.x > stop) {
    return none;
  }
  let tEnd = min(t1, stop + shells.rows[0].metres.x);
  let h = shells_landMarch(ro, rd, max(t0 - shells.rows[0].metres.x, 0.0), tEnd, shells.head.w != 0u);
  if (wall) {
    if (h.hit && !h.inside && h.t >= max(t0, 0.0) - 1e-3 && ro.y + rd.y * h.t >= lo.y - 1e-3) {
      return h;
    }
    return none;
  }
  if (h.hit && !h.inside && !h.lent && shell_shaped(h.matter) > 1.5) {
    return h;
  }
  return none;
}
`,N7=new Map;function S6($=k8()){let Q=`${PQ($)}`;let J=N7.get(Q);if(J===void 0){let V=MV();J=$==="whole"?V:GV(V,$);N7.set(Q,J)}return J}var AV="the far land walked by its columns alone, in a plain look",PV="the far land with no walk: its column tops read along the ray, flat-lit";function k8(){if(k$(f7))return"no-walk";return k$(u7)?"columns":"whole"}var CV={whole:"",columns:c7,"no-walk":d7},PQ=($)=>CV[$],I6=function($){let Q=k8();return Q==="no-walk"?$:{...$,watchdogSmaller:Q==="columns"?PV:AV}},UV;function GV(a,b){return (GV=$c0C(44)).call(this,a,b)}function G6($,Q,J){let V=$.indexOf(Q);if(V<0)throw Error(`shells wgsl: the march text holds no ${Q.trim()}`);return`${$.slice(0,V)}${J}${$.slice(CQ($,V))}`}var TV,IV;function CQ($,Q){let J=0;for(let V=$.indexOf("{",Q);V>=0&&V<$.length;V+=1){let j=$[V];if(j==="{")J+=1;else if(j==="}"&&--J===0)return V+1}throw Error("shells wgsl: an unclosed function")}var zV=`    land.inside = shells.head.w != 0u || shell_eyeUnder();
    if (!land.inside || !${n$}) {
      break;
    }
`,H7=`struct ShellPaint {
  rgb: vec3f,
  roughness: f32,
  metalness: f32,
  emissive: vec3f,
  tilt: vec3f,
}`,h6=($,Q,J=2)=>$===null?`${H7}
fn shell_paint(tone: vec4f, lookRow: u32, h: ShellHit, ro: vec3f, rd: vec3f, pixelM: f32) -> ShellPaint {
  return ShellPaint(tone.rgb, tone.a, 0.0, vec3f(), vec3f());
}`:`@group(${J}) @binding(${w9}) var<storage, read> voxelSurfaceTable: array<vec4<f32>>;
${$.fsDefs}
${$.grownDefs}
${H7}
fn shell_paint(tone: vec4f, lookRow: u32, h: ShellHit, ro: vec3f, rd: vec3f, pixelM: f32) -> ShellPaint {
  if (lookRow == 0u || !h.hit) {
    return ShellPaint(tone.rgb, tone.a, 0.0, vec3f(), vec3f());
  }
  let row = shells.rows[h.shell];
  let c = row.metres.x;
  let cellMicro = c * ${T6}.0;
  let local = h.cell - vec3i(row.anchor.x * 8, 0, row.anchor.y * 8);
  let microPos = (ro + rd * h.t - vec3f(local) * c) * ${T6}.0;
  let microOrigin = h.cell * i32(round(cellMicro));
  var step = 0u;
  if (abs(h.n.y) < 0.5) {
    let up = vec3i(0, 1, 0);
    var pair = 0u;
    for (var i = 0u; i < 2u; i++) {
      pair |= u32(shell_solid(h.shell, h.cell + select(up, vec3i(h.n) - up, i == 1u), h.column, h.columnXZ)) << i;
    }
    step = select(0u, 1u, pair == 2u);
  }
  let smoothFace = u32((shells.head.y & ${S9}u) != 0u);
  let look = vec2u(lookRow, shell_faceDir(h.n) | (step << ${$Q}u) | (smoothFace << ${QQ}u));
  let cosine = max(abs(dot(h.n, rd)), 0.15);
  let across = rd - h.n * dot(rd, h.n);
  let way = select(normalize(cross(h.n, vec3f(0.0, 0.0, 1.0) + abs(h.n.yzx))), across / max(length(across), 1e-6), length(across) > 1e-4);
  let side = cross(h.n, way);
  let microFw = (abs(way) + abs(side) * cosine) * pixelM * ${T6}.0;
  let surf = voxel_surface(look, microOrigin, microPos, microFw, 1.0 / cellMicro, VoxelSurfaceLive(-rd, SHELL_UP, 1.0, frame.worldTime));
  let grown = surf_grown(surf, look, rd * h.t, h.n, ${Q});
  return ShellPaint(grown.rgb, surf.roughness, surf.metalness, surf.emissive, grown.tilt);
}`,a$=`${y7}
@group(1) @binding(0) var<uniform> passLights: PassLights;`,NV=`@group(3) @binding(0) var surfaceNear: texture_2d<f32>;
fn shells_surfaceStop(frag: vec4f) -> f32 {
  let size = vec2<i32>(textureDimensions(surfaceNear));
  let near = textureLoad(surfaceNear, min(vec2<i32>(frag.xy), size - vec2<i32>(1)), 0).x;
  return select(0.0, shells.far.x, near <= ${N6});
}`;function HV($=null,Q=!1,J=k8()){let V=Q?`  let P = frame.cameraPosition + rd * far;
  return lume_surfaceMotion(out, select(vec2f(), lume_motionVector(frame.viewProj * vec4f(P, 1.0), frame.prevViewProj * vec4f(P, 1.0)), h.hit));`:"  return out;";return L9(["//",_9,...Q?[R6]:[],v$(Q),a$,w6(2),b9,S6(J),h6($,"passLights.sunDirection"),NV,W6,`@fragment
fn fs(@builtin(position) frag: vec4f) -> ${v7(Q)} {
  let rd = shell_ray(frag);
  let ro = shells.eye.xyz;
  let h = shells_surfaceMarch(ro, rd, shells_surfaceStop(frag));
  let look = shell_look(ro, rd, h);
  let N = select(SHELL_UP, look.N, h.hit);
  let far = shell_distance(h);
  var out = lume_surfaceUnlitAs(lume_surfaceMarkedAt(N, look.albedo, look.roughness, look.metalness, 1.0, look.emissive, far, shell_sky(h)), h.inside);
  if (h.inside) {
    out.albedo = vec4f();
    out.emissive = 0u;
  }
  if (!h.hit) {
    out.albedo = vec4f();
    out.words = vec2u();
    out.emissive = 0u;
    out.read = 0u;
  }
  if (shell_standsIn(h)) {
    out.words.y = out.words.y | ${h7}u;
  }
${V}
}`],`
`)}function RV($=m$(),Q=!1,J=null){let V=b7("pbr",$),j=V.litColor({N:"look.N",V:"V",P:"P",albedo:"look.albedo",roughness:"look.roughness",metalness:"look.metalness",emissive:"look.emissive",toonSteps:"4.0",transmission:"0.0"}),Y=Q?`struct ShellLitOut {
  @location(0) color: vec4f,
  @location(1) motion: vec4f,
  @builtin(frag_depth) depth: f32,
}`:`struct ShellLitOut {
  @location(0) color: vec4f,
  @builtin(frag_depth) depth: f32,
}`,q=Q?"  return ShellLitOut(vec4f(color, 1.0), vec4f(lume_motionVector(clip, frame.prevViewProj * vec4f(P, 1.0)), 0.0, 1.0), depth);":"  return ShellLitOut(vec4f(color, 1.0), depth);";return L9(["//",_9,Q?R6:"",$.wgslDefs,V.defs,w6(2,!0),b9,S6(),u$,s7,h6(J,$.sunDirection),W6,Y,`struct ShellLitIn {
  position: vec4f,
}
@fragment
fn fs(@builtin(position) frag: vec4f) -> ShellLitOut {
  let rd = shell_ray(frag);
  let ro = shells.eye.xyz;
  var h: ShellHit;
  var o = ro;
  var a = 0.0;
  var b = over_litStop(frag);
  for (var leg = 0u; leg < 2u; leg++) {
    let m = shells_litMarch(o, rd, a, b, leg == 0u);
    if (leg == 1u) {
      over_litPast(m);
      break;
    }
    h = m;
    if (!h.hit) {
      break;
    }
    let landClip = frame.viewProj * vec4f(frame.cameraPosition + rd * shell_distance(h), 1.0);
    if (!over_litLaw(frag, ro, rd, h, landClip.z / landClip.w)) {
      break;
    }
    o = ro + vec3f(0.0, over_litLeg.x, 0.0);
    a = over_litLeg.y;
    b = over_litLeg.z;
  }
  if (!h.hit) {
    discard;
  }
  let look = shell_look(ro, rd, h);
  let P = frame.cameraPosition + rd * shell_distance(h);
  let V = -rd;
  let in = ShellLitIn(frag);
${`${$.wgslDefs}
${V.defs}`.includes("fn lighting_cellMarkedRead(")?`  if (shell_standsIn(h)) {
    lighting_cellFarSky(shell_sky(h));
  } else {
    lighting_cellMarkedRead(P, look.N, shell_sky(h));
  }
`:""}  var color = ${j};
  if (h.inside) {
    color = vec3f();
  }
  let viewZ = -(frame.view * vec4f(P, 1.0)).z;
  color = shade_applyFog(color, viewZ, P - frame.cameraPosition);
  let clip = frame.viewProj * vec4f(P, 1.0);
  let depth = over_litOut;
${q}
}`],`
`)}var g6=($=k8())=>`${PQ($)}`;function WV($=null,Q=k8()){return L9(["//",_9,g7(),a$,w6(2,!0),b9,S6(Q),u$,h6($,"passLights.sunDirection"),"@group(3) @binding(0) var overAsk: texture_2d<f32>;",W6,`@fragment
fn fs(@builtin(position) frag: vec4f) -> LumeSurfaceOut {
  let rawDepth = textureLoad(overAsk, vec2<i32>(frag.xy), 0).x;
  if (rawDepth <= ${N6}) {
    discard;
  }
  let uv = frag.xy / vec2f(textureDimensions(overAsk));
  let world = frame.inverseViewProj * vec4f(uv.x * 2.0 - 1.0, 1.0 - uv.y * 2.0, rawDepth, 1.0);
  let toThing = world.xyz / world.w - frame.cameraPosition;
  if (max(abs(toThing.x), abs(toThing.z)) <= shells.far.w) {
    discard;
  }
  let thing = length(toThing);
  let rd = toThing / thing;
  let ro = shells.eye.xyz;
  var a = shell_nearStart(ro, rd, thing);
  var b = min(thing, shells.far.x);
  if (a >= b) {
    discard;
  }
  let under = shell_underLand(ro + toThing);
  var h: ShellHit;
  var t = 0.0;
  var skin = 0.0;
  var o = ro;
  var take = false;
  for (var leg = 0u; leg < 2u && a < b; leg++) {
    let m = shells_march(o, rd, a, b);
    if (leg == 1u) {
      take = m.hit && !m.inside;
      break;
    }
    h = m;
    t = shell_distance(m);
    let law = over_law(ro, rd, m, t, thing, under);
    take = law == OVER_COVER;
    if (law != OVER_PAST) {
      break;
    }
    skin = over_skin(m, thing);
    o = ro + vec3f(0.0, skin, 0.0);
    a = t + 1e-3 * skin;
    b = min(thing - skin, shells.far.x);
  }
  if (!take) {
    discard;
  }
  let look = shell_look(ro, rd, h);
  return lume_surfaceMarkedFlat(look.N, -h.n, look.albedo, look.roughness, look.metalness, 1.0, look.emissive, t, shell_sky(h));
}`],`
`)}var g9=($)=>`terrain/shells/over/${H6()}${$===null?"":"/painted"}${g6()}`;function v6(a,b){return (v6=$c0C(47)).apply(this,arguments)}function OV(){return (OV=$c0C(48)).apply(this,arguments)}function t$($,Q,J,V){let j=(K)=>[Q.getBindGroupLayout(m7,"lume frame"),_7(Q,L7(K,["vs","fs"])),Q.getBindGroupLayout(i$,"terrain shells"),Q.getBindGroupLayout(x6,O6)],Y=V,q=j(Y);for(let K=1;K<=b$.length&&E7($,q).length>0;K+=1)Y=r7(V,b$.slice(0,K)),q=j(Y);return{code:Y,layout:k7($,J,q,q[1])}}var B8=($,Q=!1,J=!1,V=k8())=>`terrain/shells/surface/${H6(Q,T8())}/${w$}${$===null?"":"/painted"}${J?"/open":""}${g6(V)}`;function e(a,b){return (e=$c0C(49)).apply(this,arguments)}function L$(a,b,c,d,e,f,g,h,i){return (L$=$c0C(50)).call(this,a,b,c,d,e,f,g,h,i)}var q9=($,Q=!1)=>`terrain/shells/band/${H6(Q)}/${w$}${$===null?"":"/painted"}${g6()}`;var m6=($,Q=null)=>`terrain/shells/lit/${O7({motion:$})}${Q===null?"":"/painted"}${g6()}`;function v9(a,b){return (v9=$c0C(51)).apply(this,arguments)}var UQ=Math.ceil(h9/4);var K9=Array.from({length:UQ},($,Q)=>Q);var GQ=($)=>$===0?"SHELL_LANES":`SHELL_LANES + ${$*4}u`;var xV=K9.map(($)=>`  bins${$}: vec4f,
`).join("");var EV=K9.map(($)=>`  (*e).bins${$} = select((*e).bins${$}, max((*e).bins${$}, s), j == ${GQ($)});
`).join("");var yV=K9.map(($)=>`select(vec4f(-1e30), (*e).bins${$}, ${GQ($)} <= last)`).reduce(($,Q)=>`max(${$}, ${Q})`);var LV=K9.map(($)=>`  band.bins${$} = vec4f(-1e30);
`).join("");var _V=K9.map(($)=>`      band.bins${$} = max(band.bins${$}, o.bins${$});
`).join("");var kV=K9.slice(0,-1).reduceRight(($,Q)=>`select(${$}, e.bins${Q}, j < ${(Q+1)*4}u)`,`e.bins${UQ-1}`);var bV=($)=>`${c$}
struct ShellsJob {
  sun: vec4f,
  run: vec4u,
  word: vec4u,
  windows: array<vec4i, ${I8/2}>,
}
@group(0) @binding(0) var<${g$()}> shells: ShellsDraw;
@group(0) @binding(1) var<storage, read> shellDir: array<u32>;
@group(0) @binding(2) var<storage, read> shellTones: array<vec4f>;
@group(0) @binding(3) var<storage, read_write> shellLight: array<vec2u>;
@group(0) @binding(4) var<uniform> job: ShellsJob;
@group(0) @binding(5) var<storage, read> jobList: array<u32>;
@group(0) @binding(6) var<storage, read_write> shellHorizonOut: array<f32>;
@group(0) @binding(7) var<storage, read> shellPool: array<u32>;
${MQ()}
${BQ()}

struct ShellEdge {
${xV}  best: f32,
  missing: f32,
  ground: f32,
  cloud: f32,
}
const SHELL_LANES = vec4u(0u, 1u, 2u, 3u);

fn shell_squareSlope(eye: vec2f, lo: vec2f, size: f32, rise: f32) -> f32 {
  if (rise >= 0.0) {
    let dist = length(eye - clamp(eye, lo, lo + vec2f(size)));
    return select(1e30, rise / dist, dist > 1e-4);
  }
  let far = max(abs(eye - lo), abs(eye - lo - vec2f(size)));
  return rise / max(length(far), 1e-4);
}

fn shell_squareUnderSlope(eye: vec2f, lo: vec2f, size: f32, rise: f32) -> f32 {
  if (rise > 0.0) {
    let far = max(abs(eye - lo), abs(eye - lo - vec2f(size)));
    return rise / max(length(far), 1e-4);
  }
  let dist = length(eye - clamp(eye, lo, lo + vec2f(size)));
  return select(-1e30, rise / dist, dist > 1e-4);
}

fn shell_binOf(t: f32) -> u32 {
  return u32(clamp(i32(floor(log2(max(t, 1e-3) / ${DQ}.0))) + 1, 0, ${h9}));
}

fn shell_edgeBest(e: ptr<function, ShellEdge>, slope: f32, at: f32) {
  (*e).best = max((*e).best, slope);
  let j = vec4u(shell_binOf(at));
  let s = vec4f(slope);
${EV}}

fn shell_edgeBin(e: ShellEdge, j: u32) -> f32 {
  return ${kV}[j & 3u];
}

fn shell_edgeProfile(e: ptr<function, ShellEdge>, at: f32) -> f32 {
  let last = vec4u(min(shell_binOf(at), SHELLS_HORIZON_BINS - 1u));
  let run = ${yV};
  return max(max(run.x, run.y), max(run.z, run.w));
}

fn shell_edgeBand(e: ptr<function, ShellEdge>, eye: vec2f, lo: vec2f, size: f32, gap: u32, topSlope: f32, c: f32) {
  (*e).ground = max((*e).ground, shell_squareSlope(eye, lo, size, f32((bitcast<i32>(gap) << 16u) >> 16u) * c - shells.eye.y));
  let over = bitcast<i32>(gap) >> 16u;
  if (over != SHELLS_GAP_NONE && topSlope > (*e).ground) {
    (*e).cloud = min((*e).cloud, shell_squareUnderSlope(eye, lo, size, f32(over) * c - shells.eye.y));
  }
}

fn shell_edgeWalk(k: u32, d: vec2f, t0: f32, t1: f32, bandIn: ShellEdge, voidOnly: bool) -> ShellEdge {
  var e = bandIn;
  e.missing = 1e30;
  let row = shells.rows[k];
  let ro = shells.eye.xyz;
  let c = row.metres.x;
  let b = c * 8.0;
  let g = b * 8.0;
  let inv = shell_inv(vec3f(d, 1.0)).xy;
  let stX = select(-1, 1, d.x >= 0.0);
  let stZ = select(-1, 1, d.y >= 0.0);
  let ax = row.anchor.x;
  let az = row.anchor.y;
  var t = t0;
  let p0 = ro.xz + d * (t + 1e-3 * c);
  var gx = i32(floor(p0.x / g));
  var gz = i32(floor(p0.y / g));
  let lg = shell_leave(ro.xz, inv, vec2i(gx, gz), g);
  var tgx = lg.x;
  var tgz = lg.y;
  var steps = 0u;
  loop {
    steps++;
    if (t >= t1 || steps > 4096u) {
      break;
    }
    let tg1 = min(min(tgx, tgz), t1);
    let gTop = shell_group(k, gx + (ax >> 3u), gz + (az >> 3u));
    let whole = gTop != SHELLS_GROUP_OPEN;
    var tTop = -SHELL_BIG;
    if (tg1 >= shells.far.z) {
      tTop = shell_thingGroupTop(k, gx + (ax >> 3u), gz + (az >> 3u));
    }
    var walk = true;
    if (whole && !voidOnly) {
      let groupSlope = shell_squareSlope(ro.xz, vec2f(f32(gx), f32(gz)) * g, g, max(f32(gTop), tTop) * c - ro.y);
      walk = groupSlope > shell_edgeProfile(&e, t);
      if (!walk) {
        shell_edgeBand(&e, ro.xz, vec2f(f32(gx), f32(gz)) * g, g, shell_groupGap(k, gx + (ax >> 3u), gz + (az >> 3u)), groupSlope, c);
        if (tTop > -SHELL_BIG) {
          e.ground = max(e.ground, shell_squareSlope(ro.xz, vec2f(f32(gx), f32(gz)) * g, g, tTop * c - ro.y));
        }
      }
    }
    if (walk) {
      let pc = ro.xz + d * (t + 1e-3 * c);
      var lx = clamp(i32(floor(pc.x / b)), gx * 8, gx * 8 + 7);
      var lz = clamp(i32(floor(pc.y / b)), gz * 8, gz * 8 + 7);
      let lc = shell_leave(ro.xz, inv, vec2i(lx, lz), b);
      var tcx = lc.x;
      var tcz = lc.y;
      var tc = t;
      loop {
        steps++;
        if (tc >= tg1 || steps > 4096u) {
          break;
        }
        let bx = lx + ax;
        let bz = lz + az;
        let slot = shell_slot(k, bx, bz);
        var have = true;
        var top = 0;
        var counts = true;
        if (whole && !voidOnly) {
          top = bitcast<i32>(shellDir[u32(row.anchor.w) + slot * SHELLS_HOT_WORDS] << 16u) >> 16u;
        } else {
          let rec = shell_record(k, slot);
          have = shell_present(rec, bx, bz);
          top = shell_top(rec);
          counts = !voidOnly || ((rec.w >> 16u) == 0u && (rec.y >> 16u) != 0u) || (rec.w & ${q8<<16>>>0}u) != 0u;
        }
        if (have) {
          if (counts) {
            let topSlope = shell_squareSlope(ro.xz, vec2f(f32(lx), f32(lz)) * b, b, f32(top) * c - ro.y);
            shell_edgeBest(&e, topSlope, tc);
            shell_edgeBand(&e, ro.xz, vec2f(f32(lx), f32(lz)) * b, b, shell_columnGap(k, slot), topSlope, c);
          }
        } else {
          e.missing = min(e.missing, tc);
        }
        let tcOut = min(min(tcx, tcz), tg1);
        if (tTop > -SHELL_BIG && tcOut >= shells.far.z) {
          let et = shell_thingRecord(k, slot);
          if (shell_present(et, bx, bz)) {
            let thingSlope = shell_squareSlope(ro.xz, vec2f(f32(lx), f32(lz)) * b, b, f32(shell_top(et)) * c - ro.y);
            shell_edgeBest(&e, thingSlope, tc);
            e.ground = max(e.ground, thingSlope);
          }
        }
        tc = tcOut;
        if (tcx < tcz) {
          lx += stX;
          tcx += abs(b * inv.x);
        } else {
          lz += stZ;
          tcz += abs(b * inv.y);
        }
      }
    }
    t = tg1;
    if (tgx < tgz) {
      gx += stX;
      tgx += abs(g * inv.x);
    } else {
      gz += stZ;
      tgz += abs(g * inv.y);
    }
  }
  return e;
}

const SHELLS_HORIZON_SPLIT = ${_6}u;
var<workgroup> shellHorizonFold: array<ShellEdge, 64>;

fn shells_horizon(id: vec3u) {
  let lane = id.x % 64u;
  let piece = lane % SHELLS_HORIZON_SPLIT;
  let unit = id.x / SHELLS_HORIZON_SPLIT;
  let live = unit < job.run.y;
  let w = (job.run.x + unit) % ${f}u;
  if (shells.head.w != 0u && shell_eyeUnder()) {
    if (live && piece == 0u) {
      shellHorizonOut[w * SHELLS_HORIZON_WORDS] = 1e30;
      shellHorizonOut[w * SHELLS_HORIZON_WORDS + 1u] = 1e30;
      shellHorizonOut[w * SHELLS_HORIZON_WORDS + 2u] = -1e30;
      for (var j = 0u; j < SHELLS_HORIZON_BINS; j++) {
        shellHorizonOut[w * SHELLS_HORIZON_WORDS + 3u + j] = 1e30;
      }
    }
    return;
  }
  let a0 = f32(w) * ${G8/f} - 3.14159265;
  let count = shells.head.x;
  var band: ShellEdge;
${LV}  band.best = -1e30;
  band.missing = 1e30;
  band.ground = -1e30;
  band.cloud = 1e30;
  var start = select(${p$}.0, 0.0, (shells.head.y & ${j8}u) != 0u);
  let eyeOpen = shells.head.w == 0u && !shell_eyeUnder() && (shells.head.y & ${j8}u) == 0u;
  var drawn = start;
  var standIns = false;
  for (var k = 0u; k < count; k++) {
    let row = shells.rows[k];
    let lend = select(SHELL_BIG, shells.rows[k + 1u].metres.x / (${k9}.0 * max(shells.far.y, 1e-9)), k + 1u < count);
    if (row.anchor.z == 0) {
      drawn = max(drawn, min(0.8 * row.metres.y, lend));
      continue;
    }
    let t1 = select(row.metres.y, shells.far.x, k + 1u >= count);
    let cubesFrom = select(start, min(max(start, drawn), t1), eyeOpen);
    standIns = standIns || cubesFrom > start;
    let near = start + (t1 - start) * f32(piece) / f32(SHELLS_HORIZON_SPLIT);
    let far = select(start + (t1 - start) * f32(piece + 1u) / f32(SHELLS_HORIZON_SPLIT), t1, piece + 1u == SHELLS_HORIZON_SPLIT);
    var mine = band;
    mine.missing = 1e30;
    for (var edge = 0u; edge < job.word.z; edge++) {
      let ae = select(a0, a0 + ${G8/f}, edge == 1u);
      let dir = vec2f(cos(ae), sin(ae));
      for (var part = 0u; part < 2u; part++) {
        let t0 = max(near, select(start, cubesFrom, part == 1u));
        let tEnd = select(t0, min(far, select(cubesFrom, t1, part == 1u)), live);
        if (tEnd > t0) {
          let e = shell_edgeWalk(k, dir, t0, tEnd, mine, part == 0u);
          let held = min(mine.missing, e.missing);
          mine = e;
          mine.missing = held;
        }
      }
    }
    shellHorizonFold[lane] = mine;
    workgroupBarrier();
    var missing = 1e30;
    for (var s = lane - piece; s < lane - piece + SHELLS_HORIZON_SPLIT; s++) {
      let o = shellHorizonFold[s];
      band.best = max(band.best, o.best);
${_V}      band.ground = max(band.ground, o.ground);
      band.cloud = min(band.cloud, o.cloud);
      missing = min(missing, o.missing);
    }
    workgroupBarrier();
    drawn = max(cubesFrom, min(0.8 * row.metres.y, max(missing, lend)));
    start = min(0.8 * row.metres.y, missing);
  }
  if (!live || piece != 0u) {
    return;
  }
  shellHorizonOut[w * SHELLS_HORIZON_WORDS] = select(band.best, max(band.best, 0.0), standIns && eyeOpen);
  shellHorizonOut[w * SHELLS_HORIZON_WORDS + 1u] = select(band.ground, max(band.ground, 0.0), standIns && eyeOpen);
  shellHorizonOut[w * SHELLS_HORIZON_WORDS + 2u] = band.cloud;
  var run = -1e30;
  for (var j = 0u; j < SHELLS_HORIZON_BINS; j++) {
    run = max(run, shell_edgeBin(band, j));
    shellHorizonOut[w * SHELLS_HORIZON_WORDS + 3u + j] = select(run, max(run, 0.0), standIns && eyeOpen);
  }
}

${qQ($)}

fn shells_prep(id: vec3u, groups: vec3u) {
  let t = id.y * groups.x * 64u + id.x;
  var g = 0u;
  if (t < job.run.y) {
    g = (job.run.x + t) % max(job.run.z, 1u);
  } else if (t < job.run.y + job.run.w) {
    g = jobList[t - job.run.y];
  } else {
    return;
  }
  if (g >= job.run.z) {
    return;
  }
  var k = 0u;
  var s = g;
  loop {
    if (k >= shells.head.x) {
      return;
    }
    let n = shells.rows[k].slots.x * shells.rows[k].slots.x;
    if (s < n) {
      break;
    }
    s -= n;
    k++;
  }
  let at = ${f*_8}u + g * ${b6}u;
  shellHorizonOut[at + ${u.flags}u] = 0.0;
  if (k + 1u >= shells.head.x) {
    return;
  }
  let row = shells.rows[k];
  let w = i32(row.slots.x);
  let pair = job.windows[k >> 1u];
  let least = select(pair.xy, pair.zw, (k & 1u) == 1u);
  let bx = least.x + ((i32(s % row.slots.x) - least.x) % w + w) % w;
  let bz = least.y + ((i32(s / row.slots.x) - least.y) % w + w) % w;
  if (shell_present(shell_column(k, bx, bz), bx, bz)) {
    let born = max(shell_bornOf(k, bx, bz), shells.cover.w);
    if (shells.cover.w < 0.0 || born <= 0.0 || shells.cover.z - born >= ${Q9/1000}) {
      return;
    }
  }
  let c = row.metres.x;
  let b = c * 8.0;
  let x0 = f32(bx - row.anchor.x) * b;
  let z0 = f32(bz - row.anchor.y) * b;
  shellHorizonOut[at] = f32(bx);
  shellHorizonOut[at + 1u] = f32(bz);
  let mid = shell_corner(k + 1u, x0 + 0.5 * b, z0 + 0.5 * b);
  if (!mid.found) {
    shellHorizonOut[at + ${u.flags}u] = 1.0;
    return;
  }
  let q00 = shell_cornerBy(mid, x0, z0);
  let q10 = shell_cornerBy(mid, x0 + b, z0);
  let q01 = shell_cornerBy(mid, x0, z0 + b);
  let q11 = shell_cornerBy(mid, x0 + b, z0 + b);
  let noGround = shell_noGround(q00) || shell_noGround(q10) || shell_noGround(q01) || shell_noGround(q11);
  shellHorizonOut[at + ${u.flags}u] = select(3.0, 7.0, noGround);
  shellHorizonOut[at + ${u.roof}u] = max(max(shell_cornerRoof(q00), shell_cornerRoof(q10)), max(shell_cornerRoof(q01), shell_cornerRoof(q11)));
  shellHorizonOut[at + ${u.top}u] = select(-SHELL_BIG, f32(shell_top(q00.e)) * q00.cj, q00.found);
  shellHorizonOut[at + ${u.top+1}u] = select(-SHELL_BIG, f32(shell_top(q10.e)) * q10.cj, q10.found);
  shellHorizonOut[at + ${u.top+2}u] = select(-SHELL_BIG, f32(shell_top(q01.e)) * q01.cj, q01.found);
  shellHorizonOut[at + ${u.top+3}u] = select(-SHELL_BIG, f32(shell_top(q11.e)) * q11.cj, q11.found);
  let g00 = shell_cornerGround(q00);
  var g10 = g00;
  if (!shell_sameCorner(q10, q00)) {
    g10 = shell_cornerGround(q10);
  }
  var g01 = g00;
  if (!shell_sameCorner(q01, q00)) {
    g01 = shell_cornerGround(q01);
  }
  var g11 = g10;
  if (!shell_sameCorner(q11, q10)) {
    if (shell_sameCorner(q11, q01)) {
      g11 = g01;
    } else {
      g11 = shell_cornerGround(q11);
    }
  }
  shellHorizonOut[at + ${u.ground}u] = g00.x;
  shellHorizonOut[at + ${u.ground+1}u] = g10.x;
  shellHorizonOut[at + ${u.ground+2}u] = g01.x;
  shellHorizonOut[at + ${u.ground+3}u] = g11.x;
  shellHorizonOut[at + ${u.matter}u] = g00.y;
  shellHorizonOut[at + ${u.matter+1}u] = g10.y;
  shellHorizonOut[at + ${u.matter+2}u] = g01.y;
  shellHorizonOut[at + ${u.matter+3}u] = g11.y;
}

@compute @workgroup_size(64)
fn march(@builtin(global_invocation_id) id: vec3u, @builtin(num_workgroups) groups: vec3u) {
  if (job.word.x == ${Z9}u) {
    shells_horizon(id);
  } else if (job.word.x == ${m9}u) {
    shells_prep(id, groups);
  } else {
    shells_light(id, groups);
  }
}`;var Z9=0;var o$=1;var m9=2;var r$=2;var l$=[{binding:0,visibility:4,buffer:h$},c(1,4,"read-only-storage"),c(2,4,"read-only-storage"),c(3,4,"storage"),c(4,4,"uniform"),c(5,4,"read-only-storage"),c(6,4,"storage"),c(7,4,"read-only-storage")];function u6(a,b){return (u6=$c0C(52)).call(this,a,b)}var wV=`@group(0) @binding(0) var<storage, read> srcA: array<u32>;
@group(0) @binding(1) var<storage, read> srcB: array<u32>;
@group(0) @binding(2) var<storage, read_write> dst: array<u32>;
@group(0) @binding(3) var<uniform> count: vec4u;
@compute @workgroup_size(64)
fn copy(@builtin(global_invocation_id) id: vec3u, @builtin(num_workgroups) groups: vec3u) {
  let i = id.y * groups.x * 64u + id.x;
  let phase = count.w;
  if (phase == 0u) {
    if (i >= count.x) {
      return;
    }
    dst[srcA[2u * i]] = srcA[2u * i + 1u];
  } else if (phase == 1u) {
    if (i >= count.x * ${y}u) {
      return;
    }
    dst[srcB[i / ${y}u] * ${y}u + i % ${y}u] = srcA[i];
  } else if (phase == 2u) {
    if (i >= count.x) {
      return;
    }
    let at = srcB[2u * i];
    let n = srcB[2u * i + 1u];
    for (var q = 0u; q < n; q++) {
      let e = dst[at + q];
      if (e != 0u && (e & ${a>>>0}u) == 0u) {
        dst[at + q] = (srcA[(e - 1u) & 0xffffffu] + 1u) | (e & 0xff000000u);
      }
    }
  } else {
    if (i >= count.x) {
      return;
    }
    let a = srcB[3u * i];
    let b = srcB[3u * i + 1u];
    let n = srcB[3u * i + 2u];
    for (var q = 0u; q < n; q++) {
      dst[b + q] = srcA[a + q];
    }
  }
}`,TQ=0,IQ=1,zQ=2,NQ=3,u9=[c(0,4,"read-only-storage"),c(1,4,"read-only-storage"),c(2,4,"storage"),c(3,4,"uniform")];function N8(a,b){return (N8=$c0C(53)).call(this,a,b)}var d9=new aQ("terrain-shells",function($,Q){Aj(Q)});var SV=3;var hV=536870912;var C9=16384;var D9=0.0625;var L0=0.125;var gV=0.03125;var vV=1;var n9=65536;var U9=8;var mV=64;var M9=1024;var a6=2048;var uV=240;var fV=5000;var pJ=8;var s$=pJ/3;var R8=P0(1,0);var iJ=function(){let $=new ArrayBuffer(w8);return{f:new Float32Array($),u:new Uint32Array($)}};var cV=function(){let $=new ArrayBuffer(w8),Q=new Uint32Array($);return Q[8]=m9,{u:Q,i:new Int32Array($)}};var E=4294967295;var f6=2;var dV=16;var HQ=()=>(HQ=$c0C(54))();function aJ(a,b){return (aJ=$c0C(55)).call(this,a,b)}var D0=null,nV=function($,Q,J,V,j){let Y=D0;if(Y===null)return;let q=Y.cell,K=Math.max(0,Math.ceil(($-Y.x0)/q-0.5)),Z=Math.min(L-1,Math.floor((J-Y.x0)/q-0.5)),X=Math.max(0,Math.ceil((Q-Y.z0)/q-0.5)),D=Math.min(L-1,Math.floor((V-Y.z0)/q-0.5));for(let M=X;M<=D;M+=1)for(let F=K;F<=Z;F+=1){let B=M*L+F;if(Y.words[B>>>5]=((Y.words[B>>>5]??0)|1<<(B&31))>>>0,j>(Y.tops[B]??1/0))Y.tops[B]=j;if(j-(J-$)<(Y.bottoms[B]??-1/0))Y.bottoms[B]=j-(J-$)}},f9=1/0,pV=function($,Q,J){if(J-$<f9)f9=J-$};function iV($){if($===null)return j9;return f9=1/0,s6($,pV),F9(f9)?Math.max(j9,f9):j9}function tJ(a,b,c,d){return (tJ=$c0C(56)).call(this,a,b,c,d)}function oJ(a,b,c){return (oJ=$c0C(57)).call(this,a,b,c)}var _0=8192;function aV(a,b,c,d,e,f,g){return (aV=$c0C(58)).call(this,a,b,c,d,e,f,g)}var tV=2,oV=1;function rV(a,b,c,d,e,f,g,h,i){return (rV=$c0C(59)).call(this,a,b,c,d,e,f,g,h,i)}var rJ=function($,Q){let J=$&65535&~(q8|i8);return $&~i8|(J!==0&&Q[J]===1?i8:0)},lV=($)=>Uint8Array.from($,(Q)=>Q?.endsWith(p6)===!0?1:0);function sV(a,b,c,d,e){return (sV=$c0C(60)).call(this,a,b,c,d,e)}var eV=function(){let $=new ArrayBuffer(L6*4);return{uniformWords:$,uniform:{u:new Uint32Array($),f:new Float32Array($),i:new Int32Array($)}}};function lJ($){return $.peekStore(d9)}function _K($){return $.peekStore(d9)?.parkedDepth??0}function $j(a){return ($j=$c0C(61)).call(this,a)}var Jj=4194304,M0=new Map,B0=0,Vj=function($){let Q=H0($*4),J=M0.get(Q)?.pop();if(J!==void 0)B0-=Q;return new Uint32Array(J??new ArrayBuffer(Q),0,$)},jj=function($){let Q=$.byteLength;if(!($ instanceof ArrayBuffer)||H0(Q)!==Q||B0+Q>Jj)return;let J=M0.get(Q);if(J===void 0)M0.set(Q,[$]);else if(J.includes($))return;else J.push($);B0+=Q};function kK(a,b,c){return (kK=$c0C(62)).call(this,a,b,c)}function qj($,Q,J){let V=!1;for(let j=0;j<J.length&&!V;j+=1){let Y=$.matters[Q+j];V=Y!==void 0&&Y!==null&&Y!==(J[j]??null)}return V&&$.levels.some((j)=>j.key.some((Y)=>Y!==E))}function Kj(a,b,c){return (Kj=$c0C(63)).call(this,a,b,c)}function bK(a){return $c0C(64).call(this,a)}function Zj(a,b,c){return (Zj=$c0C(65)).call(this,a,b,c)}function Mj($,Q){if(Q.kind===h.forget)i6(Q.fills);else if($.shape!==null&&Q.epoch===$.shape.epoch)$.queue.push(Q);else i6([Q.fill])}function Bj($,Q,J){for(let V of J)if(V.radius>=0)Q.thingsIn.set(V.id,V.radius);else if(Q.thingsIn.delete(V.id)&&Q.thingsHeld.delete(V.id))k0($,V.id,!1)}function k0($,Q,J){if(!VJ($,Q,J))return;J0()?.store.refreshPrimitiveVisibility($,Q),J0()?.store.refreshBespokeMeshVisibility($,Q)}function Fj(a,b,c){return (Fj=$c0C(66)).call(this,a,b,c)}function e6($,Q){for(let J of Q.thingsHeld)k0($,J,!1);Q.thingsHeld.clear(),Q.thingsIn.clear()}function wK(a,b){return (wK=$c0C(67)).call(this,a,b)}function sJ($){let Q=Y8($)?.voxelBuckets??null;if(Q!==null&&Q.handed.size>0)x0(Q,Q.handWalk.x,Q.handWalk.y,Q.handWalk.z,0)}function Aj($){let Q=$.peekStore(d9);if(!Q)return;sJ($),e6($,Q);for(let J of Q.places.values())U6(J);if(eJ(Q),Q.registered)$.unregister(G0);$.dropStore(d9)}function eJ($){let Q=$.gpu;if(!Q)return;$.gpu=null;Z$($.change);R(Q.dir);for(let J of[...$.moveOwed?.buffers??[],...$.moveSpent])R(J);if($.moveOwed=null,$.moveSpent=[],R(Q.pool),R(Q.uniform),R(Q.tones),R(Q.upd),R(Q.count),R(Q.brickWords),R(Q.brickSlots),R(Q.brickCount),R(Q.noPicture),R(Q.noFloors),R(Q.noPaint),R(Q.noThings),$.thingsGroup=null,R(Q.horizon),R(Q.light),R(Q.lightJob),R(Q.horizonJob),R(Q.prepJob),R(Q.lightList),R(Q.stripJob),R(Q.stripList),$.looks?.gpu?.handle.release(),$.looks)$.looks.gpu=null;R($.band.buffer),$.band.buffer=null,$.band.capacity=0,$.band.count=0,$.band.built.fill(NaN)}function b0($,Q=0){let J=[],V=0;for(let D=0;D<$.shells;D+=1)V+=($.windows[D]??0)**2;let j=0;for(let D=0;D<$.shells;D+=1)j+=(($.windows[D]??n)/n)**2;let Y=Q+V*4+j*M8,q=Q/4,K=Q+V*4,Z=Y+V*d,X=Z+j*3;for(let D=0;D<$.shells;D+=1){let M=$.windows[D]??n,F=M/n;J.push({k:D,cell:$.cell*2**D,reach:$.reach[D]??0,W:M,GW:F,slotBase:q,groupBase:K,hotBase:Y+(q-Q/4)*d,birthBase:X,born:new Float32Array((M/W)**2),bornTag:new Float64Array((M/W)**2).fill(-1),key:new Uint32Array(M*M).fill(E),top:new Int32Array(M*M),walk:new Int32Array(M*M),cast:new Int32Array(M*M),yspan:new Uint32Array(M*M),baseMatter:new Uint16Array(M*M),gap:new Uint32Array(M*M),surface:new Uint32Array(M*M),bottom:new Int32Array(M*M).fill(g),under:new Uint32Array(M*M),listAt:new Int32Array(M*M).fill(-1),listClass:new Int8Array(M*M),bricks:Array(M*M).fill(null),brickSpan:new Uint32Array(M*M),groupTag:new Uint32Array(F*F),groupWords:RQ(F*F,[s,0,0]),landedFrame:new Uint32Array(M*M),groupDirty:new Uint8Array(F*F),groupsDirty:!1,present:0,presenceRev:0,nearMiss:new Float64Array(7).fill(NaN),cover:D===0?new Uint32Array(M*M):null,coverSlots:D===0?new Set:null,things:{base:Z,key:new Uint32Array(M*M).fill(E),top:new Int32Array(M*M),yspan:new Uint32Array(M*M),listAt:new Int32Array(M*M).fill(-1),listClass:new Int8Array(M*M),bricks:Array(M*M).fill(null),brickSpan:new Uint32Array(M*M),landedFrame:new Uint32Array(M*M),groupDirty:new Uint8Array(F*F),groupSpan:J2(F*F),groupWords:RQ(F*F,[Y9>>>0,0]),blockAt:new Int32Array(F*F).fill(-1),inGroup:new Uint8Array(F*F),groupsDirty:!1,present:0,span:[R8,R8]}});q+=M*M;K+=F*F*M8;Z+=F*F*3;X+=(M/W)**2}return J}function RQ($,Q){let J=new Uint32Array($*Q.length);for(let V=0;V<$;V+=1)J.set(Q,V*Q.length);return J}function Pj($,Q){if(Q.levels.some((J)=>(J.coverSlots?.size??0)>0))$.coverRevision+=1;Q.levels=[];h0(Q.queue);Q.queue=[];Q.maxTop=-1e9;Q.minBottom=1/0;$.thingsCleared=[];R4($)}function w0(a,b){return (w0=$c0C(68)).call(this,a,b)}function S0($,Q){let J=Q.levels[Q.levels.length-1];if(Q.shape===null||J===void 0)return;$.dirFixedWords=J.birthBase+(J.W/W)**2,$.dirFixedStart=0,$.fixedRoom={at:0,end:$.dirFixedWords},$.spare=[],$.lists.base=$.dirFixedWords,$.lists.next=0,$.lists.words=0,$.thingBlocks.fresh.length=0,$.thingBlocks.emptied.length=0;for(let j of Q.levels)j.things.blockAt.fill(-1),j.things.inGroup.fill(0);for(let j of $.lists.free)j.length=0;for(let j of $.lists.freeLater)j.length=0;$.pool.free=[[],[],[],[],[]],$.pool.freeLater=[[],[],[],[],[]],$.pool.next=0,$.pool.used=0,$.pool.bricksLive=0,$.updPairs=0,$.pairAt.clear(),$.unitsStaged=0,q$($.change);let V=$.gpu;if(V===null)return;if(V.dirWords<$.dirFixedWords+n9)f0($,V,$.dirFixedWords+n9,!1);$4($,V,Q)}function $4($,Q,J){let V=$.dirFixedStart,j=new Uint32Array($.dirFixedWords-V);for(let Y of J.levels){let q=Y.things;for(let K=0;K<Y.W*Y.W;K+=1){let Z=(Y.slotBase+K)*4-V,X=Y.key[K]??E;if(j[Z]=X,X===E)continue;j[Z+1]=Y.yspan[K]??0,j[Z+2]=(Y.listAt[K]??0)>>>0,j[Z+3]=(Y.top[K]??0)&65535|((Y.baseMatter[K]??0)&65535)<<16,j[Y.hotBase+K*d-V]=c8(Y.top[K]??0,Y.walk[K]??0),j[Y.hotBase+K*d+1-V]=(Y.gap[K]??0)>>>0,j[Y.hotBase+K*d+d8-V]=Y.surface[K]??0,j[Y.hotBase+K*d+n8-V]=Y.under[K]??0}for(let K=0;K<Y.GW*Y.GW;K+=1)j[Y.groupBase+K*M8-V]=s,Y.groupWords.set([s,0,0],K*3),j[q.base+K*3-V]=Y9>>>0,j[q.base+K*3+2-V]=(q.blockAt[K]??-1)+1,q.groupWords.set([Y9>>>0,0],K*2);for(let K=0;K<Y.born.length;K+=1){j[Y.birthBase+K-V]=j4(Y.born[K]??0)}}Q.device.queue.writeBuffer(Q.dir,V*4,j)}var Uj=($,Q)=>$!==null&&$.cell===Q.cell&&$.origin[0]===Q.origin[0]&&$.origin[1]===Q.origin[1]&&$.origin[2]===Q.origin[2],t6=function($,Q,J,V){let j=$.windows[Q]??0,Y=$.centres?.[Q*2]??0,q=$.centres?.[Q*2+1]??0;return J>=Y-j/2&&J<Y+j/2&&V>=q-j/2&&V<q+j/2};function Q4(a,b){return (Q4=$c0C(69)).call(this,a,b)}function h0($){let Q=null;for(let J of $)if(J.kind===h.land)(Q??=[]).push(J.fill);if(Q!==null)i6(Q)}function Gj(a,b,c,d){return (Gj=$c0C(70)).call(this,a,b,c,d)}function Tj($,Q,J,V){let j=Q.key[V]??E;if(j===E||J===void 0)return;let Y=j<<16>>16,q=j>>16;if(!t6($,Q.k,Y,q))return;let K=S(q,J.W)*J.W+S(Y,J.W);J.key[K]=j;J.top[K]=Q.top[V]??0;J.walk[K]=Q.walk[V]??0;J.cast[K]=Q.cast[V]??0;J.yspan[K]=Q.yspan[V]??0;J.baseMatter[K]=Q.baseMatter[V]??0;J.gap[K]=Q.gap[V]??0;J.surface[K]=Q.surface[V]??0;J.bottom[K]=Q.bottom[V]??g;J.under[K]=Q.under[V]??0;J.listAt[K]=Q.listAt[V]??-1;J.listClass[K]=Q.listClass[V]??0;J.bricks[K]=Q.bricks[V]??null;J.brickSpan[K]=Q.brickSpan[V]??0;J.present+=1;J.presenceRev+=1;J.bornTag[J4(J,Math.floor(Y/W),Math.floor(q/W))]=t(Math.floor(Y/W),Math.floor(q/W));if(Q.cover!==null&&J.cover!==null){let Z=Q.cover[V]??0;if(J.cover[K]=Z,Q.cover[V]=0,Q.coverSlots?.delete(V),Z!==0)J.coverSlots?.add(K)}Q.key[V]=E,Q.bricks[V]=null,Q.listAt[V]=-1,Q.present-=1,Q.presenceRev+=1}function Ij(a,b,c,d){return (Ij=$c0C(71)).call(this,a,b,c,d)}var J4=($,Q,J)=>S(J,$.W/W)*($.W/W)+S(Q,$.W/W),V4=new Float32Array(1),Nj=new Uint32Array(V4.buffer),j4=function($){return V4[0]=$,Nj[0]??0};function Hj(a,b,c){return (Hj=$c0C(72)).apply(this,arguments)}function Rj($,Q,J){let V=l6()/1000;$.frameNow=V;let j=Q.drawBorn??($.shown?V:0),Y=$.lastBirth>0&&V-$.lastBirth<Q9/1000||V-j<Q9/1000;J[18]=V,J[19]=Y?j:-1,h8("shells-arrival",Y&&Q.drawBorn!==null?1:0)}function k($,Q,J){let V=$.pairAt.get(Q);if(V!==void 0){$.upd[V*2+1]=J>>>0;return}$.pairAt.set(Q,$.updPairs),$$($,Q,J)}function $$($,Q,J){if(($.updPairs+1)*2>$.upd.length)$.upd=p8($.upd,$.upd.length*2);$.upd[$.updPairs*2]=Q>>>0,$.upd[$.updPairs*2+1]=J>>>0,$.updPairs+=1}function o9($,Q,J,V=E){if(Q.key[J]!==V)Q.presenceRev+=1;if(Q.key[J]===E)return;z9($,Q.k,Q.key[J]??E);$.pool.used-=F5($.change,Q.k,Q.key[J]??E,void 0,(Y)=>Q$($,Y));Y4($,Q.bricks[J]??null,Q.brickSpan[J]??0);Q.bricks[J]=null;let j=Q.listAt[J]??-1;if(j>=0)l9($,j,Q.listClass[J]??0);Q.listAt[J]=-1;Q.key[J]=E;Q.present-=1;if(Q.cover!==null&&(Q.cover[J]??0)!==0){{Q.cover[J]=0,Q.coverSlots?.delete(J),$.coverRevision+=1;
}}m0(Q,J)}function Y4($,Q,J){if(Q===null)return;let V=(J&65535)+(J>>>16);for(let j=J&65535;j<V;j+=1)Q$($,Q[j]??0)}function q4($){$.pool.freeLater.forEach(function(Q,J){for(let V of Q)$.pool.free[J]?.push(V);Q.length=0})}var G9=($)=>$>>>2;var p9=($)=>($&3)+1;var g0=($)=>(G9($)+1|(p9($)&3)<<24)>>>0;var K4=new Int32Array(0);var S8=new Uint32Array(256);function Q$($,Q){($.unitsStaged>0?$.pool.freeLater:$.pool.free)[p9(Q)]?.push(G9(Q));$.pool.used-=p9(Q);$.pool.bricksLive-=1}function T9(a,b,c){return (T9=$c0C(73)).call(this,a,b,c)}var r9=($,Q)=>(Math.floor(Q/$.W)>>3)*$.GW+(Q%$.W>>3),v0=($,Q)=>($.things.blockAt[r9($,Q)]??0)+((Math.floor(Q/$.W)&7)<<3|Q%$.W&7)*4,Z4=($,Q,J)=>(Math.floor(Q/$.GW)*n+(J>>3))*$.W+Q%$.GW*n+(J&7);function Wj(a,b,c,d){return (Wj=$c0C(74)).call(this,a,b,c,d)}function X4($,Q){let J=Q%$.W,V=Math.floor(Q/$.W);$.things.groupDirty[(V>>3)*$.GW+(J>>3)]=1,$.things.groupsDirty=!0}function m0($,Q){let J=Q%$.W,V=Math.floor(Q/$.W);$.groupDirty[(V>>3)*$.GW+(J>>3)]=1,$.groupsDirty=!0}function Ej(a,b,c,d){return (Ej=$c0C(75)).call(this,a,b,c,d)}function u0(a,b,c,d){return (u0=$c0C(76)).call(this,a,b,c,d)}function l9($,Q,J){$.lists.freeLater[J]?.push(Q),$.lists.words-=1<<J}function s9(a,b,c){return (s9=$c0C(77)).call(this,a,b,c)}function f0(a,b,c,d){return (f0=$c0C(78)).call(this,a,b,c,d)}function D4(a,b,c,d){return (D4=$c0C(79)).call(this,a,b,c,d)}function yj(a,b,c){return (yj=$c0C(80)).call(this,a,b,c)}function WQ(a,b,c){return (WQ=$c0C(81)).call(this,a,b,c)}function OQ(a,b,c,d,e){return (OQ=$c0C(82)).call(this,a,b,c,d,e)}function M4(a,b){return (M4=$c0C(83)).call(this,a,b)}function B4(a,b){return (B4=$c0C(84)).call(this,a,b)}function F4($,Q){let J=Math.min($.W/2,Math.ceil($.reach*Q/($.cell*O)));return Math.min($.W*$.W,E8*(J+W/2)**2)}var Lj=($)=>Math.ceil(Math.max($.pool.used,$.held&&!L8()?B4($,null):0)*(1+D9));function _j($,Q){let J=0,V=0;for(let j of Q.levels){let Y=j.present+j.things.present;if(V+=Y,Y>0)J+=F4(j,Q.capScale)}return V<256||L8()?0:Math.ceil($.lists.words/V*J)}function A4($){if(L8())return gV;return $.held?L0:vV}function xQ($){let Q=0;for(let J=0;J<$.key.length;J+=1)if($.key[J]!==E&&($.listAt[J]??-1)>=0)Q+=1;return Q}function EQ(a,b,c,d,e){return (EQ=$c0C(85)).call(this,a,b,c,d,e)}function bj($,Q,J,V){let j=Q.device,Y=j.queue;if($.moveSpent.length>0){ia($,Y);}if(J.shape===null||J.levels.length===0||J.queue.length>0||$.updPairs>0||$.unitsStaged>0||$.remapOwed!==null||$.moveOwed!==null)return;let q=$.dirFixedWords-$.dirFixedStart;let K=Math.ceil(Math.max(1024,q+Math.ceil(Math.max($.lists.words,_j($,J))*(1+D9)))/64)*64;if(Q.dirWords<=K*(1+A4($))||N8(j,V).pipeline===null)return;let Z=0;for(let P of J.levels)Z+=xQ(P)+xQ(P.things)+P.things.blockAt.filter((C)=>C>=0).length;let X,F,B;{ja(j,K,Q,$,q,Y,J,Z);X=ga[0];F=ga[1];B=ga[2]}for(let P of J.levels)EQ($,P,(C)=>(P.slotBase+C)*4+2,F,B),EQ($,P.things,(C)=>v0(P,C)+2,F,B);ka(j,F,Q,Y,Z,$,q,B,X,K);}var yQ=()=>({most:0,before:0,frames:0});function LQ($,Q,J){$.frames+=1;if($.frames>=uV){la($);}let V=J;while(V<$.most||V<$.before)V*=2;return Q>=V*4?V:0}function wj(a,b){return (wj=$c0C(86)).call(this,a,b)}function Sj($,Q){if($.gpu!==null&&$.gpu.device===Q&&!$.gpu.mark.lost)return $.gpu;let J=($.gpu?.generation??0)+1;eJ($);let V=128|8|4,j=Math.min(Q.limits.maxStorageBufferBindingSize,Q.limits.maxBufferSize);$.deviceUnits=Math.floor(Math.min(j,hV)/(y*4)),$.pool.ceiling=M4($,$.active),$.held=rQ(),ZJ($.held?$.deviceUnits*y*4:0),KJ();let Y={lost:!1},q=E9(Q,{label:"terrain shells no picture",size:{width:1,height:1,depthOrArrayLayers:1},format:"rgba8unorm",usage:2|4},Y);Q.queue.writeTexture({texture:q},new Uint8Array([255,255,255,255]),{bytesPerRow:256},{width:1,height:1});let K=E9(Q,{label:"terrain shells no things",size:{width:1,height:1,depthOrArrayLayers:1},format:z6,usage:4},Y);let Z=Math.max(1024,$.dirFixedWords+n9);let X={device:Q,mark:Y,dir:x(Q,{label:"terrain shells directory",size:Z*4,usage:V},Y),dirWords:Z,pool:x(Q,{label:"terrain shells pool",size:C9*y*4,usage:V},Y),poolUnits:C9,uniform:x(Q,{label:"terrain shells draw",size:L6*4,usage:tQ()|8},Y),tones:x(Q,{label:"terrain shells tones",size:$.tones.byteLength,usage:V},Y),toneRows:$.tones.length,upd:x(Q,{label:"terrain shells uploads",size:a6*8,usage:V},Y),updPairs:a6,count:x(Q,{label:"terrain shells upload count",size:16,usage:64|8},Y),brickWords:x(Q,{label:"terrain shells brick uploads",size:M9*y*4,usage:128|8},Y),brickSlots:x(Q,{label:"terrain shells brick slots",size:M9*4,usage:128|8},Y),unitRoom:M9,brickCount:x(Q,{label:"terrain shells brick count",size:16,usage:64|8},Y),noPicture:q,noPictureView:q.createView({dimension:"2d-array"}),noFloors:x(Q,{label:"terrain shells no floors",size:16,usage:V},Y),noPaint:x(Q,{label:"terrain shells no paint",size:64,usage:V},Y),noThings:K,noThingsView:K.createView({label:"terrain shells no things"}),horizon:x(Q,{label:"terrain shells horizon",size:f*_8*4,usage:V},Y),horizonWords:f*_8,light:x(Q,{label:"terrain shells light",size:16,usage:V},Y),lightSlots:0,lightJob:x(Q,{label:"terrain shells light job",size:w8,usage:64|8},Y),horizonJob:x(Q,{label:"terrain shells horizon job",size:w8,usage:64|8},Y),prepJob:x(Q,{label:"terrain shells prep job",size:w8,usage:64|8},Y),lightList:x(Q,{label:"terrain shells light list",size:4096,usage:V},Y),lightListSlots:1024,stripJob:x(Q,{label:"terrain shells strip job",size:w8,usage:64|8},Y),stripList:x(Q,{label:"terrain shells strip list",size:4096,usage:V},Y),stripListSlots:1024,sampler:Q.createSampler({label:"terrain shells picture means",magFilter:"linear",minFilter:"linear",mipmapFilter:"linear"}),generation:J};let D=iJ();if(D.u.set([Z9,y0,r$,0],8),Q.queue.writeBuffer(X.horizonJob,0,D.u),$.gpu=X,$.tonesFor.matters=-1,$.horizon.stood.fill(NaN),$.prep.stood.fill(NaN),$.prep.group=null,$.prep.stripGroup=null,$.light.of=null,$.light.group=null,$.active?.shape){for(let M of $.active.levels)for(let F=0;F<M.W*M.W;F+=1)o9($,M,F),T9($,M,F);S0($,$.active)}return J$($),X}function hj(a,b,c){return (hj=$c0C(87)).call(this,a,b,c)}function gj(a,b,c){return (gj=$c0C(88)).call(this,a,b,c)}function vj(a,b,c,d){return (vj=$c0C(89)).call(this,a,b,c,d)}function P4(a,b,c,d){return (P4=$c0C(90)).call(this,a,b,c,d)}var _Q=($)=>$.updPairs>0||$.unitsStaged>0;function mj($,Q,J){if(Q.bottomless!==!0)return 0;let V=0;while(V<Q.n-1&&($.entries[J+V]??0)===0)V+=1;return V}function uj($,Q,J,V,j,Y){if(J.n===0||J.covered===!0)return J.top;for(let q=J.n-1;q>=j;q-=1){let K=Q.entries[V+q]??0;if(K===0||(K&a)!==0&&$[K&65535]===2)continue;let Z=(K&a)!==0?O-1:fj($,Q.bricks,S8[K-1]??0);if(Z>=0)return Math.min(J.top,(J.y0+q)*O+Z+1)}return Math.min(J.top,Y*O)}function fj($,Q,J){for(let V=O**3-1;V>=0;V-=1){let j=z0(Q,J,V);if(j!==0&&$[N0(Q,J,j)]!==2)return V>>6}return-1}function cj($,Q,J,V,j,Y,q,K,Z,X){let D=V.W,M=j.tx*W+Y%W,F=j.tz*W+Math.floor(Y/W),B=S(F,D)*D+S(M,D);o9($,V,B,t(M,F)),V.landedFrame[B]=$.frame;let A=mj(j,q,K);let U=q.y0+A;let P=Math.max(1,q.n-A);let C=q.covered===!0&&q.bottomless!==!0?j.covers??null:null;let G=V6(P+(C===null?0:W8));let I=s9($,Q,G);let T=-1;let N=0;let H=!0;let z=-1;for(let i=A;i<A+P;i+=1){let w=q.n===0?0:j.entries[K+i]??0;if(w!==0&&(w&a)===0){if(T<0)T=w-1;else if(w-1!==T+N)H=!1;N+=1;let l=z<0?(j.bricks[S8[w-1]??0]??0)>>>16&65535:0;if(l!==0)z=l;w=g0(Z[w-1]??0)}else if(w!==0&&z<0)z=w&65535;$$($,I+i-A,w)}if(z<0||q.bottomless===!0)z=0;z=rJ(ij($,C,X,I+P,z),J.liquids);V.key[B]=t(M,F);V.top[B]=q.top;V.walk[B]=uj(J.liquids,j,q,K,A,U);let v=(z&65535)!==0?-1/0:U4(j,K,q);V.bottom[B]=F9(v)?v:g;Y7(V,B,j,q,K);V.yspan[B]=(U&65535|P<<16)>>>0;V.baseMatter[B]=z&65535;let _=nj(j,q,K,A,P,U);V.gap[B]=_;V.listAt[B]=I;V.listClass[B]=G;G4(V,B,Z,T,N,H,j,K,q.n);pj($,J,V,B,j,q,K);V.present+=1;z4($,V.slotBase-(J.levels[0]?.slotBase??V.slotBase)+B);z9($,V.k,t(M,F));let b=(V.slotBase+B)*4;k($,b,t(M,F));k($,b+1,U&65535|P<<16);k($,b+2,I);k($,b+3,q.top&65535|(z&65535)<<16);k($,V.hotBase+B*d,c8(q.top,V.walk[B]??0));k($,V.hotBase+B*d+1,_);C4($,V,M,F);m0(V,B);let F8=q.top*V.cell;if(q.n>0&&F8>J.maxTop)J.maxTop=F8;J.minBottom=Math.min(J.minBottom,v*V.cell)}var kQ=new Int32Array(9),bQ=new Int32Array(9);function C4($,Q,J,V){for(let j=-1;j<=1;j+=1){for(let Y=-1;Y<=1;Y+=1){dj($,Q,J+Y,V+j)}}}function dj(a,b,c,d){return (dj=$c0C(91)).call(this,a,b,c,d)}function nj($,Q,J,V,j,Y){if(Q.n===0)return X9(Q.top,z8);if(Q.bottomless===!0)return X9(XQ,Y*O);let q=0;while(q<j&&($.entries[J+V+q]??0)!==0)q+=1;if(q>=j)return X9(Q.top,z8);let K=q;while(K<j&&($.entries[J+V+K]??0)===0)K+=1;let Z=q===0?0:F0($.bricks,$.entries[J+V+q-1]??0,!0)-O;return X9((Y+q)*O+Z,K>=j?z8:(Y+K)*O+F0($.bricks,$.entries[J+V+K]??0,!1))}function U4($,Q,J){for(let V=0;V<J.n;V+=1){let j=$.entries[Q+V]??0;if(j===0)continue;let Y=F0($.bricks,j,!1);if(Y<O)return(J.y0+V)*O+Y}return 1/0}function F0($,Q,J){if((Q&a)!==0)return J?O:0;for(let V=0;V<O**3;V+=1)if(z0($,S8[Q-1]??0,J?O**3-1-V:V)!==0)return J?O-Math.floor(V/O**2):Math.floor(V/O**2);return J?0:O}function pj(a,b,c,d,e,f,g){return (pj=$c0C(92)).call(this,a,b,c,d,e,f,g)}function ij($,Q,J,V,j){let Y=j&~q8;if(Q===null||Y===0)return Y;for(let q=0;q<W8;q+=1)$$($,V+q,Q[J+q]??0);return Y|q8}function aj(a,b,c,d,e){return (aj=$c0C(93)).call(this,a,b,c,d,e)}function G4($,Q,J,V,j,Y,q,K,Z){if(j===0)$.bricks[Q]=null,$.brickSpan[Q]=0;else if(Y)$.bricks[Q]=J,$.brickSpan[Q]=(V&65535|j<<16)>>>0;else {$.bricks[Q]=tj(q,K,Z,J);$.brickSpan[Q]=j<<16>>>0}}function tj($,Q,J,V){let j=[];for(let Y=0;Y<J;Y+=1){let q=$.entries[Q+Y]??0;if(q!==0&&(q&a)===0)j.push(V[q-1]??0)}return Int32Array.from(j)}function oj($,Q){if(!Q.groupsDirty)return;Q.groupsDirty=!1;let{W:J,GW:V}=Q;for(let j=0;j<V*V;j+=1){if(Q.groupDirty[j]===0)continue;Q.groupDirty[j]=0;let Y=j%V,q=Math.floor(j/V),K=g,Z=z8,X=g,D=z8,M=!0,F=NaN,B=NaN;for(let U=0;U<n&&M;U+=1){for(let P=0;P<n;P+=1){let C=(q*n+U)*J+Y*n+P,G=Q.key[C]??E;if(G===E){M=!1;break}let I=G<<16>>16,T=G>>16,N=I>>3,H=T>>3;if(Number.isNaN(F))F=N,B=H;else if(N!==F||H!==B){M=!1;break}K=Math.max(K,Q.top[C]??g);Z=Math.min(Z,rj(Q,C));let z=Q.gap[C]??0;X=Math.max(X,z<<16>>16),D=Math.min(D,z>>16)}}Q.groupTag[j]=M?t(F,B):0;let A=M?[X9(K,Z),t(F,B),X9(X,D)]:[s,0,s];ej($,Q,j,A);k($,Q.groupBase+j*M8,A[0]??s);k($,Q.groupBase+j*M8+1,A[1]??0);k($,Q.groupBase+j*M8+2,A[2]??s)}}function rj($,Q){if(($.top[Q]??g)<=g)return z8;return($.baseMatter[Q]??0)!==0?g:(($.yspan[Q]??0)<<16>>16)*O}function X9($,Q){let J=(V)=>Math.max(g,Math.min(32767,V))&65535;return(J($)|J(Q)<<16)>>>0}function lj(a,b){return (lj=$c0C(94)).call(this,a,b)}function ej($,Q,J,V){let j=Q.groupWords;if(j[J*3]===V[0]&&j[J*3+1]===V[1]&&j[J*3+2]===V[2])return;if(j[J*3]!==s){wQ($,Q.k,j[J*3+1]??0);}if(V[0]!==s){wQ($,Q.k,V[1]??0);}j.set(V,J*3)}function wQ($,Q,J){$.reach.horizon.push(Q,J<<16>>16,J>>16,2)}function Q2(a){return (Q2=$c0C(95)).call(this,a)}function A0($,Q,J){if(($[0]??1)>($[1]??0)){$.splice(0,4,Q,Q,J,J);return}$[0]=Math.min($[0]??Q,Q),$[1]=Math.max($[1]??Q,Q),$[2]=Math.min($[2]??J,J),$[3]=Math.max($[3]??J,J)}function J2($){return Int32Array.from({length:$*4},(Q,J)=>J%2===0?1:0)}function P0($,Q){return $&65535|Q<<16}function c0(a,b,c){return (c0=$c0C(96)).call(this,a,b,c)}function V2(a,b){return (V2=$c0C(97)).call(this,a,b)}function j2(a,b){return (j2=$c0C(98)).call(this,a,b)}function Y2(a,b){return (Y2=$c0C(99)).call(this,a,b)}function q2(a,b,c,d){return (q2=$c0C(100)).call(this,a,b,c,d)}function SQ(a,b,c,d){return (SQ=$c0C(101)).call(this,a,b,c,d)}var hQ=[];function K2(a,b,c){return (K2=$c0C(102)).call(this,a,b,c)}var T4=null,C0=null;globalThis.__spawnFarSunRead=function(){return $c0C(103).call(this)};function Z2($,Q,J){let V=Q.active;Q.shown=J.pictureUnseen!==!0;if(Q.shown&&C0?.deref()!==Q){{T4=new WeakRef($),C0=new WeakRef(Q);
}}KY(Q,Y8($)?.voxelBuckets??null);if(!V?.shape){h8("shells-fill",0);return}let j=Sj(Q,J.device);Q.pool.ceiling=M4(Q,V);wj(Q,j);bj(Q,j,V,J.pipelines);yj(Q,j,J.pipelines);SQ(Q,j,V,J);XY($,Q,j,V);let Y=Q0(),q=0,K=V.wave;V.wave=!1,Q.landingWhole=K;let Z=K||!Q.shown;while(V.queue.length>0&&(q===0||Z||Q0()-Y<SV)){let X;Dj:{let J$6=j;{let J=J$6;let j=V.queue[0];if(j===void 0||hj(Q,V,j)){X=null;break Dj;}if(j.kind===h.change){X=(V.queue.shift(),Q.change.pending.push(j.words),0);break Dj;}if(j.kind===h.land){if(!vj(Q,J,V,j)){X=null;break Dj;}{X=(V.queue.shift(),1);break Dj;}}{if((ea=fa(V,j,$,Q,J))!==da){X=ea;break Dj;}}X=0;}}if(X===null)break;q+=X}Q.landingWhole=!1;SQ(Q,j,V,J);if(Q.thingsIn.size>Q.thingsHeld.size){Fj($,Q,V);}Y2(Q,V);A2:{let $$6=Q,Q$7=j,J$10=V;{let $=$$6,Q=Q$7,J=J$10;let V=$.light.of;if(V===J.levels)break A2;if(J.shape===null||J.levels.length===0)break A2;$.light.of=J.levels;if(V!==null&&Q.lightSlots>0&&F2(V,J.levels))break A2;let j=0;{j=oa(J,j,Q,$)}}}FY(Q,J.device);V.unsaid=V.unsaid||q>0||Q.change.jobs.size>0;if(V.unsaid&&(V.queue.length===0&&!V.drainSaid||I9()-V.saidAtMs>fV)){DY(Q,V);}V.drainSaid=V.queue.length===0&&(V.drainSaid||q>0);X2(Q,J);M2(Q,J);h8("shells-fill",V.queue.length>0||Q.updPairs>0?1:0)}function X2(a,b){return (X2=$c0C(104)).call(this,a,b)}function gQ(a,b){return (gQ=$c0C(105)).call(this,a,b)}function D2(a,b,c,d){return (D2=$c0C(106)).call(this,a,b,c,d)}function M2(a,b){return (M2=$c0C(107)).call(this,a,b)}var U0=3,B2;function e9(a,b,c,d){return (e9=$c0C(109)).call(this,a,b,c,d)}var I4=function($,Q){let J=Math.max(1,Math.ceil(Q/64)),V=Math.min(J,65535);return $[0]=V,$[1]=Math.ceil(J/V),$[2]=1,$},d6=($)=>I4([1,1,1],$);function $6($,Q,J,V,j){let Y=$?.size??[1,1,1],q=$??{command:{pipeline:Q,bindGroups:[J],dispatch:Y,debugLabel:j},size:Y};return q.command.pipeline=Q,q.command.bindGroups[0]=J,I4(q.size,V),q}function d0(a,b){return (d0=$c0C(110)).call(this,a,b)}function z9($,Q,J,V=!1){if(J===E)return;let j=J<<16>>16,Y=J>>16;if($.reach.horizon.push(Q,j,Y,V?1:0),!V)$.reach.prep.push(Q,j,Y)}function z4($,Q){if($.light.landedCount===$.light.landed.length)$.light.landed=p8($.light.landed,$.light.landed.length*2);$.light.landed[$.light.landedCount]=Q,$.light.landedCount+=1}function F2($,Q){if($.length!==Q.length)return!1;for(let J=0;J<Q.length;J+=1)if($[J]?.W!==Q[J]?.W||$[J]?.slotBase!==Q[J]?.slotBase)return!1;return!0}var B9=new Float64Array(3);function P2(a,b,c,d){return (P2=$c0C(111)).call(this,a,b,c,d)}function N4(a,b,c,d,e,f){return (N4=$c0C(112)).call(this,a,b,c,d,e,f)}function C2(a,b,c){return (C2=$c0C(113)).call(this,a,b,c)}var n0=function($){let Q=0;for(let J of $.levels)Q+=J.W*J.W;return Q};function U2(a,b,c){return (U2=$c0C(114)).call(this,a,b,c)}var G2=($,Q,J,V)=>isNaN($.prep.for[0])||$.prep.for[1]!==(J.shape?.epoch??-1)||$.prep.for[2]!==Q.horizonWords||$.prep.for[3]!==V||$.prep.for[4]!==$.uniform.u[0];function H4($,Q){let J=Q===0?0:1;for(let V=0;V<$.levels.length;V+=1)if(($.levels[V]?.present??0)>0)J+=2**(V+1);return J}function J$($){$.horizon.for[3]=NaN,$.prep.for[0]=NaN,$.reach.horizon.length=0,$.reach.prep.length=0}function R4($){J$($),$.horizon.stood.fill(NaN),$.prep.stood.fill(NaN)}function T2(a,b){return (T2=$c0C(115)).call(this,a,b)}function W4(a,b,c,d,e,f,g){return (W4=$c0C(116)).call(this,a,b,c,d,e,f,g)}function I2(a,b,c,d){return (I2=$c0C(117)).call(this,a,b,c,d)}function O4(a,b,c,d,e){return (O4=$c0C(118)).call(this,a,b,c,d,e)}function z2(a,b,c){return (z2=$c0C(119)).call(this,a,b,c)}function N2($,Q,J,V,j,Y){let q=S(j,V),K=Math.min(Y,V-q);if(n6($,Q,J+q,K),K<Y)n6($,Q,J,Y-K)}var o6=($,Q,J)=>$[0]===(Q.shape?.epoch??-1)&&$[1]===J.horizonWords;function H2(a,b,c){return (H2=$c0C(120)).call(this,a,b,c)}function vQ($,Q,J){let V=XJ(J);for(let j=0;j<=V;j+=1)if($.has(A9(Q,j)))return j;return-1}function R2(a,b,c,d,e,f){return (R2=$c0C(121)).call(this,a,b,c,d,e,f)}function W2($,Q){let J=0;for(let V=0;V<Q;V+=1)J+=($.levels[V]?.W??0)**2;return J}function O2(a,b,c,d,e){return (O2=$c0C(122)).call(this,a,b,c,d,e)}function x2(a,b,c,d,e,f,g){return (x2=$c0C(123)).call(this,a,b,c,d,e,f,g)}function r6($,Q,J){let V=$.prep.stripCount+J;if(V>$.prep.strip.length){let j=$.prep.strip.length;while(j<V)j*=2;$.prep.strip=p8($.prep.strip.subarray(0,$.prep.stripCount),j)}for(let j=0;j<J;j+=1)$.prep.strip[$.prep.stripCount+j]=Q+j;$.prep.stripCount=V}function uQ(a,b,c,d,e,f,g,h){return (uQ=$c0C(124)).call(this,a,b,c,d,e,f,g,h)}function E2(a,b,c){return (E2=$c0C(125)).call(this,a,b,c)}function y2($,Q,J,V,j,Y){let q=N4($,Q,J,V,j,Y);if(q===null)return;pa(Q,q,j);}function fQ($,Q,J,V,j){J.dispatches.length=0,J.dispatches.push(V),J.measured=j,$.graph.addCompute(Q,J)}function L2(a,b,c,d,e,f){return (L2=$c0C(126)).call(this,a,b,c,d,e,f)}function _2(a,b,c){return (_2=$c0C(127)).call(this,a,b,c)}var k2=($,Q)=>Q===null?Number.isNaN($[0]??0):$[0]===Q.direction[0]&&$[1]===Q.direction[1]&&$[2]===Q.direction[2]&&$[3]===(Q.castsShadow?1:0);function x4($,Q,J,V,j){let Y;for(let K=0;K<Q.levels.length&&Y===void 0;K+=1)if((Q.levels[K]?.present??0)>0)Y=Q.levels[K];if(Y===void 0)return!1;let q=$.lowestTop;if(q.placeId!==Q.placeId||q.k!==Y.k||q.present!==Y.present||q.landed!==Q.landedTiles){let K=1/0;for(let Z=0;Z<Y.key.length;Z+=1)if(Y.key[Z]!==E)K=Math.min(K,Y.top[Z]??0);{let Y$3=Y,K$2=K;{let Y=Y$3,K=K$2;q.placeId=Q.placeId,q.k=Y.k,q.present=Y.present,q.landed=Q.landedTiles,q.metres=K*Y.cell
}}}return V<q.metres&&O4(Y,J,j,0.8*Y.reach*Q.capScale,$.reach.under)===1/0}function b2(a,b,c,d,e,f){return (b2=$c0C(128)).call(this,a,b,c,d,e,f)}var E4=($,Q)=>!Q&&($.updPairs>0||$.moveOwed!==null||$.remapOwed!==null),p0=($)=>$.eyeCovered||$.dirBehind,y4=($,Q,J,V,j,Y)=>!Q&&(J||b2($,V[4]??0,V[5]??0,V[6]??0,j,Y)),S2=($,Q,J,V)=>$!==null&&Math.abs(Q-$.x)<=$.hold&&Math.abs(J-$.y)<=$.hold&&Math.abs(V-$.z)<=$.hold,i0=[0,0,0],h2=[0,0,0],g2=20000,v2=0.9,m2=250,J8={x:0,y:0,z:0,most:0},u2=function(a,b,c,d,e){return $c0C(129).call(this,a,b,c,d,e)};function f2($,Q,J,V){return J8.x=Q,J8.y=J,J8.z=V,J8.most=0,s6($,u2),J8.most}var c2=function($,Q,J,V){if(!J)return $;return ra(V,$,Q);};function d2($,Q,J){let V=Y8($)?.voxelBuckets??null;if(V!==null)TJ(V);let j=L4(Q.nearCover,Q.eyeWorld[0]??0,Q.eyeWorld[1]??0);let Y=V===null?0:f2(V,Q.eyeWorld[0]??0,Q.eyeWorld[2]??0,Q.eyeWorld[1]??0);J.move={from:I9(),before:j,reach:Y,since:V?.contentRevision??0,waved:!1,standsSince:NaN}}function L4(a,b,c){return (L4=$c0C(130)).call(this,a,b,c)}function n2($,Q,J,V){let j=$.move;if(j===null)return P9();let Y=j.waved&&!J&&Q>=j.before*v2;if(!Y)j.standsSince=NaN;else {{if(Number.isNaN(j.standsSince))j.standsSince=V;
}}let q=V-j.from;if(!(Y&&V-j.standsSince>=m2)&&q<g2)return!1;return $.move=null,P9()}function _4($,Q){let J=Y8($)?.voxelBuckets??null;return J===null?0:zJ(J,sQ(Q,h2),!1)}function p2(a,b,c,d){return (p2=$c0C(131)).call(this,a,b,c,d)}var c6=0;function i2(a,b,c,d,e){return (i2=$c0C(132)).call(this,a,b,c,d,e)}function k4(a,b){return (k4=$c0C(133)).call(this,a,b)}var b4=($)=>eQ($.camera.projection,$.camera.isOrthographic)===1,w4=($)=>$.ladderParked&&T0();function a2($,Q,J,V){let j=J.shape;if(j===null)return;let Y=V.renderOrigin??i0,q=V.camera.position[0]+Y[0],K=V.camera.position[1]+Y[1],Z=V.camera.position[2]+Y[2],X=q-j.origin[0],D=K-j.origin[1],M=Z-j.origin[2],B=(J.levels[J.levels.length-1]?.cell??1)*8*n,A=Math.round(X/B)*B,U=Math.round(M/B)*B,P=S2(J.eyeInLand,q,K,Z),{u:C,f:G}=Q.uniform,I=qJ();Q.eyeWorld[0]=q,Q.eyeWorld[1]=Z,Q.eyeWorld[2]=K,C[1]=(Q.occlusion&&!I?1:0)|(P?$9:0)|(j.smooth===!0?S9:0),C[3]=x4(Q,J,X,D,M)?1:0,G[4]=X-A,G[5]=D,G[6]=M-U,G[7]=J.maxTop>-1e8?J.maxTop:-1e6,G[20]=Math.max(Math.min(J.minBottom,1e6),-1e6),Q.eyeLocal[0]=G[4]??0,Q.eyeLocal[1]=G[5]??0,Q.eyeLocal[2]=G[6]??0,Q.anchor[0]=A,Q.anchor[1]=U,Q.eyeCovered=y4(J.levels,P,C[3]===1,G,A,U),Q.dirBehind=E4(Q,P);let T=J.move!==null,N=T?Y8($)?.voxelBuckets??null:null;Q.ladderParked=n2(J,T?L4(Q.nearCover,q,Z):0,N!==null&&IJ(N,l6()),I9());Q.landParked=w4(Q)||b4(V)||Q8()==="drawn"&&!k4(Q,V);C[0]=Q.landParked?0:J.levels.length;G[8]=c2(j.far,J.move,P9(),T0());G[9]=l2(j);G[10]=Math.max(0,j.split-2*MJ);let H=V.camera.projection[5]??1;G[12]=2/(Math.max(H,0.000001)*Math.max(V.viewportSize[1],1)),G[13]=0;let z=Q.nearCover,v=Y8($)?.voxelBuckets??null;if(v!==null)x0(v,q,K,Z,(C[0]??0)>0&&!P9()&&J.drawBorn!==null?G[9]??0:0);tJ(z,v,q,Z);let _=_4($,V);i2(Q,_,Math.min(G[8]??0,Q.reach.stands),j.far,V.deltaSeconds*1000);Q.parkedDepth=Q.parkedReach>0?uJ(Q.parkedReach,K-p2(z,q,Z,Q.parkedReach),V.camera.view):0;Q.reach.under=oJ(z,q,Z);G[11]=Math.min(_,Q.reach.under);G[14]=z.x0-j.origin[0]-A;G[15]=z.z0-j.origin[2]-U;G[21]=1/z.cell;G[22]=z.cell;C.set(aJ(z,j.origin[1]),V9+I8*J9);let b=Y8($)?.decorations.runtimeSettings??null;G[16]=b?.far??0;G[17]=Math.min(b?.fade??0,b?.far??0);Rj(Q,J,G);t2(Q.uniform,J,A,U)}function t2(a,b,c,d){return (t2=$c0C(134)).call(this,a,b,c,d)}function o2($,Q,J){let{active:V,gpu:j}=Q,Y=V?.shape??null;if(V===null||Y===null||j?.device!==J.device||!S4(V.levels))return;let q=Q.liveWords??=new ArrayBuffer(Q.uniformWords.byteLength);new Uint32Array(q).set(new Uint32Array(Q.uniformWords));let K=J.renderOrigin??i0,Z=J.camera.position[1]+K[1]-Y.origin[1],{u:X,f:D}=Q.uniform,M=D[13]===1&&((X[1]??0)&j8)===0,F=J.camera.position[0]+K[0]-Y.origin[0],B=J.camera.position[2]+K[2]-Y.origin[2];D[4]=F-Q.anchor[0],D[5]=Z,D[6]=B-Q.anchor[1],X[1]=(X[1]??0)&~($9|j8),X[3]=x4(Q,V,F,Z,B)?1:0;let A=J.camera.position[0]+K[0],U=J.camera.position[2]+K[2],P=Y8($)?.voxelBuckets??null,C=P===null?null:LJ(P,j.device,A,Z+Y.origin[1],U),G=Q.pictureCover;G.revision=NaN;G.topWordsFor[0]=NaN;tJ(G,P,A,U);D[11]=Math.min(_4($,J),oJ(G,A,U));D[14]=G.x0-Y.origin[0]-Q.anchor[0];D[15]=G.z0-Y.origin[2]-Q.anchor[1];D[21]=1/G.cell;D[22]=G.cell;X.set(aJ(G,Y.origin[1]),V9+I8*J9);let{eyeCovered:I,dirBehind:T}=Q;Q.eyeCovered=y4(V.levels,!1,X[3]===1,D,Q.anchor[0],Q.anchor[1]);Q.dirBehind=E4(Q,!1);if(Q8()==="drawn"){X[0]=w4(Q)||b4(J)||!k4(Q,J)?0:V.levels.length;}let N=J.camera.projection[5]??1;D[12]=2/(Math.max(N,0.000001)*Math.max(J.viewportSize[1],1));let H=r2(Q,j,J,M);return D[13]=H==="none"?0:1,j.device.queue.writeBuffer(j.uniform,0,Q.uniformWords),function(){if(C?.(),Q.eyeCovered=I,Q.dirBehind=T,H==="own")Q.horizon.for[0]=NaN,Q.horizon.stood.fill(NaN);if(new Uint32Array(Q.uniformWords).set(new Uint32Array(q)),Q.gpu===j)j.device.queue.writeBuffer(j.uniform,0,Q.uniformWords)}}function r2(a,b,c,d){return (r2=$c0C(135)).call(this,a,b,c,d)}var l2=($)=>($.reach[0]??0)>0?2*$.cell/(($.reach[0]??1)*Math.max($.alpha,0.001)):0.001;function s2(a,b,c){return (s2=$c0C(136)).call(this,a,b,c)}function S4($){for(let Q=0;Q<$.length;Q+=1)if(($[Q]?.present??0)>0)return!0;return!1}function e2(a,b,c,d,e,f){return (e2=$c0C(137)).call(this,a,b,c,d,e,f)}function cQ(a,b,c,d,e,f,g){return (cQ=$c0C(138)).apply(this,arguments)}function dQ(a,b,c){return (dQ=$c0C(139)).call(this,a,b,c)}function $Y(a,b,c,d){return ($Y=$c0C(140)).call(this,a,b,c,d)}function JY(a,b,c,d){return (JY=$c0C(141)).call(this,a,b,c,d)}function VY(a,b,c,d){return (VY=$c0C(142)).call(this,a,b,c,d)}function jY(a,b,c,d){return (jY=$c0C(143)).call(this,a,b,c,d)}function h4(a,b,c,d){return (h4=$c0C(144)).call(this,a,b,c,d)}function g4(a,b,c,d){return (g4=$c0C(145)).call(this,a,b,c,d)}var nQ=new WeakMap;function qY(a,b){return (qY=$c0C(146)).call(this,a,b)}var b8,e$={way:[0,-1,0],casts:!1},$0=[0,0,0],H8=null;function v4(a,b,c,d){return (v4=$c0C(148)).call(this,a,b,c,d)}function pQ(a,b){return (pQ=$c0C(149)).call(this,a,b)}var v8=($)=>$.painted&&$.looks?.gpu?ta():null;var V$=($)=>$.wearsLook&&v8($)===null&&(ua($));var m4=($)=>$===null&&bJ()?(m8()?.VOXEL_SURFACE_ARM_TEXT??null):null;function KY($,Q){if($.watched===Q)return;{$.watched=Q,$.drawGroup=null,$.tonesFor.matters=-1
}}function ZY($,Q,J){let V=Q.liquids;if(iQ(V,J))return;Q.liquids=J;let j=V.some((Y,q)=>Y===2&&J[q]!==2);for(let Y of Q.levels){for(let q=0;q<Y.W*Y.W;q+=1){if((Y.key[q]??E)===E)continue;{let Y$4=Y,q$2=q;{let Y=Y$4,q=q$2;if(j)k($,Y.hotBase+q*d,c8(Y.top[q]??0,Y.walk[q]=Y.top[q]??0));
}}let K=Y.baseMatter[q]??0,Z=rJ(K,J);if(Z===K)continue;Y.baseMatter[q]=Z,z9($,Y.k,Y.key[q]??E),k($,(Y.slotBase+q)*4+3,(Y.top[q]??0)&65535|(Z&65535)<<16)}}}function XY($,Q,J,V){let j=Y8($)?.voxelMaterials.get(V.placeId),Y=E0(Q),q=Q.tonesFor,K=j?.materialsHash??"",Z=Y?.textureLayers.revision??-1,X=Y?.albedo.revision??-1,D=m8()!==null;if(q.matters===V.matters.length&&q.hash===K&&q.layers===Z&&q.albedo===X&&q.family===D&&q.scripted===Z0.moved)return;let F,B,A;{{q.scripted=Z0.moved,q.matters=V.matters.length,q.hash=K,q.layers=Z,q.albedo=X,q.family=D;let M=Math.max(1,V.matters.length);if(M*r*4>Q.tones.length)Q.tones=new Float32Array(M*r*4*2);Q.tones.fill(0);let F=new Uint8Array(M),B=new Uint32Array(y6),A=0;
ga[0]=F,ga[1]=B,ga[2]=A}F=ga[0];B=ga[1];A=ga[2]}Q.wearsLook=UJ()&&(Object.values(j?.materials??{}).some(_J));if(Q.wearsLook)WJ();let U=NJ(j?.materials);V.matters.forEach(function(P,C){if(P===null)return;let G=P.endsWith(p6),I=G?P.slice(0,-p6.length):P,{row:T,opacity:N}=kJ($,Q,V.placeId,I),H=j?.materials[I],z=typeof H==="object"&&H!==null&&"liquidKind"in H&&H.liquidKind!==void 0,v=RJ(H,U),_=HJ(I,H),b=typeof H==="object"&&H!==null&&"blockShaped"in H&&H.blockShaped===!0,F8=W0(H,I),i=!G&&F8.materialKey!==YJ;if(z&&!G)F[C]=1;else if(_&&!z)F[C]=2;if((i||b)&&C<y6*32)B[C>>5]=((B[C>>5]??0)|1<<(C&31))>>>0;let w=BY(Q,V.placeId,I,H,v);if(w>0)A+=1;let l=i?MY(F8):0;Q.tones.set([...T,N,z?1:0,v?1:0,_?1:0,w,G?2:Number(b),l,v&&U?1:0],C*r*4)});Q.painted=Q.wearsLook&&A>0;ZY(Q,V,F);Q.uniform.u.set(B,V9+I8*J9+E6);if(J.toneRows!==Q.tones.length){{R(J.tones),J.tones=x(J.device,{label:"terrain shells tones",size:Q.tones.byteLength,usage:128|8},J.mark),J.toneRows=Q.tones.length,J.generation+=1;
}}{J.device.queue.writeBuffer(J.tones,0,Q.tones)
}}function DY(a,b){return (DY=$c0C(150)).call(this,a,b)}function MY($){let Q=O0($.materialKey,$.overrides,0).family;if(Q==="opaque")return 0;return Q==="liquid"?1:2}function BY(a,b,c,d,e){return (BY=$c0C(151)).call(this,a,b,c,d,e)}function FY(a,b){return (FY=$c0C(152)).call(this,a,b)};




function fa(V,j,$,Q,J){V.queue.shift();if(j.kind===h.thingRows){Bj($,Q,j.rows);}else if(j.kind===h.drop){gj(Q,V,j);}else{if(P4(Q,J,V,j))V.landedTiles+=1;else V.refusedTiles+=1;jj(j.entries.buffer);return 1}
return da}

function ia($,Y){let P=$.moveSpent;$.moveSpent=[],Y.onSubmittedWorkDone().then(()=>P.forEach((C)=>R(C)))
}
function ja(j,K,Q,$,q,Y,J,Z){let X=x(j,{label:"terrain shells directory",size:K*4,usage:128|8|4},Q.mark),D=j.createCommandEncoder({label:"terrain shells directory laid again"});D.copyBufferToBuffer(Q.dir,$.dirFixedStart*4,X,0,q*4),Y.submit([D.finish()]);let M=$.dirFixedStart;for(let P of J.levels)P.slotBase-=M/4,P.groupBase-=M,P.hotBase-=M,P.things.base-=M,P.birthBase-=M;let F=new Uint32Array(Math.max(4,Z*3)),B={row:0,next:q};for(let P of J.levels){{let Q=P,J=F,V=B;let j=Q.things;for(let Y=0;Y<Q.GW*Q.GW;Y+=1){let q=j.blockAt[Y]??-1;if(q<0)continue;J[V.row]=q,J[V.row+1]=V.next,J[V.row+2]=1<<U9,j.blockAt[Y]=V.next,k($,j.base+Y*3+2,V.next+1),V.row+=3,V.next+=1<<U9}}}
ga[0]=X,ga[1]=F,ga[2]=B}
function ka(j,F,Q,Y,Z,$,q,B,X,K){let A=x(j,{label:"terrain shells directory moves",size:F.byteLength,usage:128|8},Q.mark);Y.writeBuffer(A,0,F);let U=x(j,{label:"terrain shells directory move count",size:16,usage:64|8},Q.mark);Y.writeBuffer(U,0,new Uint32Array([Z,0,0,NQ])),$.moveOwed={lists:Z,buffers:[Q.dir,A,U]},$.dirFixedStart=0,$.dirFixedWords=q,$.fixedRoom={at:0,end:q},$.spare=[],$.lists.base=q,$.lists.next=B.next-q;for(let P of $.lists.free)P.length=0;for(let P of $.lists.freeLater)P.length=0;Q.dir=X,Q.dirWords=K,Q.generation+=1
}
function la($){$.frames=0,$.before=$.most,$.most=0;
}

function oa(J,j,Q,$){for(let Y of J.levels)j+=Y.W*Y.W;R(Q.light),Q.light=x(Q.device,{label:"terrain shells light",size:Math.max(16,j*gJ*4),usage:128|8|4},Q.mark),Q.lightSlots=j,$.light.lays+=1,$.light.run.next=0,$.light.run.owed=j,$.light.landedCount=0
return j}
function pa(Q,q,j){let K=Q.compute.lightPass;K.dispatches.length=0,K.dispatches.push(q),j.graph.addCompute("terrain/shells/light",K)
}

function ra(V,$,Q){if(!V)return Math.min($,$J);return Q!==null&&Q.reach>0?Math.min($,Q.reach):$
}

function ta(){return(m8()?.VOXEL_SURFACE_ARM_TEXT??null)}
function ua($){return(m8()===null?OJ():$.painted||($.active?.matters.length??0)<=1)}







function da(){}var ea;function ga(){}

;import{R as $Lr}from"./52e971dc2a986655.mjs";import{eX5 as KQ,mW0 as ZQ}from"./f4f8fe6a2da9eb97.mjs";import{dNu as zJ}from"./c464196a0fb961c5.mjs";import{GeG as IJ,Zbv as TJ}from"./0ec9c2e50790e64d.mjs";import{$NV as Z0,HMR as E0,WX_ as kJ,zMv as _J}from"./c4f8646bbcdfbbab.mjs";import{EWH as LJ,FzW as x0,J_J as O0,LrD as EJ,_no as xJ,m8x as yJ,uOy as s6}from"./c59ab7c2-73e4fb4884307dd0.mjs";import{Urq as OJ,i3Q as m8,okQ as WJ,yrB as W0}from"./e255c66d-7a88d803a0b9f709.mjs";import"./cf59077a-57ecd4eb545e2713.mjs";import{FlK as $Q,Q4I as NJ,Si9 as w9,cMf as T6,jTf as RJ,jVq as HJ,nKD as QQ}from"./95d9a38e18ab36ba.mjs";import{HNR as gJ,USY as X0,ZXr as SJ,c9H as wJ,dHS as y0,jVu as w8,uDE as hJ,xAB as qQ,zaw as d$}from"./563e4605-c418a61c2e0645ae.mjs";import{Cnk as j$,HWC as S9,IfO as E6,Ipq as g,KeE as i8,M1k as YQ,MG9 as q8,NFc as c$,QBk as s,Qhb as L,SSH as f$,Tri as jQ,UEq as O,Umk as j9,YHA as V9,ZP$ as VQ,_Oc as M8,_W6 as y,b12 as q5,bEz as r,f6k as J9,itw as L6,nNv as JQ,ndO as W,v7G as j8,vEN as K5,vk8 as a,wHe as O8,y4M as y6,zOh as e8}from"./3996015f42da7dfa.mjs";import{EID as O5,Q4w as X$,sAx as W5}from"./30ca63f6a73d4637.mjs";import"./e94dbab78277fe45.mjs";import"./a0205ca4-12bb529582a9ac80.mjs";import"./e75523a42fdedd89.mjs";import"./8f944fa2fe6c16bd.mjs";import{$y3 as Y0,LNs as DJ,MOU as q0,Mvq as V0,V$J as XJ,aPV as j0,kJE as n6,t$9 as I0,ydL as t9}from"./19e8ac2898823807.mjs";import"./96da853180ac1b5c.mjs";import"./3b29a5f6e0fddae8.mjs";import"./f0c51ac357c8bf2e.mjs";import{F5L as b9,pmU as Q9}from"./56ed3918-9d676508c812580b.mjs";import"./3a143d46-c72a17da50e9068c.mjs";import"./73c224890e5dcb5e.mjs";import"./74261a44b2d4bab9.mjs";import"./8036015a501379d5.mjs";import{hn5 as b$,vmN as r7}from"./b281e841655ca231.mjs";import"./09723e417d25bb2f.mjs";import"./0d004466878cd8d5.mjs";import"./47cd27b7baa599f1.mjs";import"./fe1722910da55e5a.mjs";import"./c89c4d81f3aa5de7.mjs";export{Aj as disposeShellsScene,E4 as dirBehindOf,HQ as nearCoverNew,L4 as coveredRoundOf,P2 as paceRun,S2 as eyeInLandAt,_K as parkedLandReach,aJ as nearTopWordsOf,aV as bandBoxesOf,b2 as eyeUnderOf,bK as shellsLands,c2 as marchReachOf,e2 as shellsTriangleOf,g2 as MOVE_DRAWS_MOST_MS,jY as surfacePipelineOf,kK as landShellsRow,lJ as getShellsStore,lV as coverMattersOf,m2 as MOVE_STANDS_MS,n2 as farLandParkedFor,oJ as coverReachOf,oV as WALL_ABOVE_M,rJ as liquidBaseOf,rV as wallBoxesOf,sV as coverRunOf,tJ as nearCoverOf,wK as forgetShells,x4 as eyeDeepOf,y4 as eyeCoveredOf};
