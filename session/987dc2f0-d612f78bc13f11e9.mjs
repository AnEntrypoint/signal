import{C as $c0K}from"./52e971dc2a986655.mjs";var $c0C,$c0T=[function(){return[()=>"(function(J,$,Q,M=0,W=0){let I=W>0&&M>0;if($<=0&&!I)return 0;if(Q.orthographic===!0){let K=Q.focal*Q.focal/Q.aspect;if(!I)return J*K;return M+$<=0?0:J*Math.min(K,1/(TJ*M*M))}let N=Math.max(0.5,$),H=Q.focal*Q.focal/(N*N*Q.aspect);if(I){let K=Math.min(2*M,Math.max(0,M+$));H=Math.min(H,K/W)}return J*H})",()=>"(function(J,$,Q,M,W,I,N){let H=$[0]??0,K=$[5]??0,L=J[0]*Q+J[4]*M+J[8]*W,D=J[1]*Q+J[5]*M+J[9]*W,j=J[2]*Q+J[6]*M+J[10]*W,P=N?1:Math.max(0.5,-j),R=(H*L+($[8]??0)*j+($[12]??0))/P,Z=(K*D+($[9]??0)*j+($[13]??0))/P,V=Math.abs(H)*I*0.5/P,G=Math.abs(K)*I*0.5/P,A=Math.max(0,Math.min(R+V,1)-Math.max(R-V,-1)),Y=Math.max(0,Math.min(Z+G,1)-Math.max(Z-G,-1));return A*Y*0.25})",()=>"(function(J,$,Q,M,W,I,N,H,K){let L=$-J.origin[0],D=Q-J.origin[1],j=M-J.origin[2],P=J.planes;for(let f=0;f<6;f++){let _=f*4;if(P[_]*L+P[_+1]*D+P[_+2]*j+P[_+3]<-K)return 0}let R=L-J.cam[0],Z=D-J.cam[1],V=j-J.cam[2],G=J.view,A=J.orthographic,Y=G[0]*R+G[4]*Z+G[8]*V,y=G[1]*R+G[5]*Z+G[9]*V,X=G[2]*R+G[6]*Z+G[10]*V,C=G[0]*W+G[4]*I+G[8]*N,l=G[1]*W+G[5]*I+G[9]*N,v=G[2]*W+G[6]*I+G[10]*N,S=Y-C,T=y-l,U=X-v,k=Y+C,g=y+l,q=X+v;if(!A){let f=-U,_=-q;if(Math.max(f,_)<0.5)S=k=Y,T=g=y,U=q=-0.5;else if(f<0.5){let z=(0.5-f)/(_-f);S+=(k-S)*z,T+=(g-T)*z,U+=(q-U)*z}else if(_<0.5){let z=(0.5-_)/(f-_);k+=(S-k)*z,g+=(T-g)*z,q+=(U-q)*z}}let E=A?1:-U,B=A?1:-q,F=J.projection,w=(F[0]*S+F[4]*T+F[8]*U+F[12])/E,c=(F[1]*S+F[5]*T+F[9]*U+F[13])/E,p=(F[0]*k+F[4]*g+F[8]*q+F[12])/B,d=(F[1]*k+F[5]*g+F[9]*q+F[13])/B,s=Math.abs(F[0]),o=Math.abs(F[5]),GJ=(p-w)/Math.max(s,0.000000000000000000000000000001),WJ=(d-c)/Math.max(o,0.000000000000000000000000000001);h[0]=GJ,h[1]=WJ,SJ(h,0,1,h,2);let a=h[2],IJ=a>0.000001?GJ/a:1,HJ=a>0.000001?WJ/a:0,n=0.5*(H<0?-H:H),u=s*IJ*n,m=o*HJ*n,x=-s*HJ*n,b=o*IJ*n,i=w-(u+x)/E,r=c-(m+b)/E,t=p+(u-x)/B,e=d+(m-b)/B,JJ=p+(u+x)/B,QJ=d+(m+b)/B,ZJ=w-(u-x)/E,$J=c-(m-b)/E,fJ=0.5*Math.abs((JJ-i)*($J-e)-(QJ-r)*(ZJ-t)),kJ=Math.max(0,Math.min(Math.max(i,t,JJ,ZJ),1)-Math.max(Math.min(i,t,JJ,ZJ),-1)),YJ=Math.max(0,Math.min(Math.max(r,e,QJ,$J),1)-Math.max(Math.min(r,e,QJ,$J),-1)),MJ=w-u/E,VJ=c-m/E,KJ=p+u/B-MJ,DJ=d+m/B-VJ,LJ=1+Math.abs(x/E+x/B)*0.5,FJ=1+Math.abs(b/E+b/B)*0.5,NJ=Math.abs(KJ)<0.000000001?0.000000001:KJ,jJ=Math.abs(DJ)<0.000000001?0.000000001:DJ,qJ=(-LJ-MJ)/NJ,AJ=(LJ-MJ)/NJ,OJ=(-FJ-VJ)/jJ,UJ=(FJ-VJ)/jJ,CJ=Math.max(Math.min(qJ,AJ),Math.min(OJ,UJ),0),zJ=Math.min(Math.max(qJ,AJ),Math.max(OJ,UJ),1),XJ=Math.max(zJ-CJ,0);return Math.min(Math.min(fJ*XJ,kJ*YJ)*0.25,1)})",()=>"(function(J,$,Q,M,W,I){if(!(I>0))return 0;let N=$-J.origin[0],H=Q-J.origin[1],K=M-J.origin[2],L=J.planes;for(let g=0;g<6;g++){let q=g*4;if(L[q]*N+L[q+1]*H+L[q+2]*K+L[q+3]<-W)return 0}let D=N-J.cam[0],j=H-J.cam[1],P=K-J.cam[2],R=Math.sqrt(I),Z=J.view,V=J.projection,G=V[0]??0,A=V[5]??0,Y=Z[0]*D+Z[4]*j+Z[8]*P,y=Z[1]*D+Z[5]*j+Z[9]*P,X=Z[2]*D+Z[6]*j+Z[10]*P,C=J.orthographic?1:Math.max(0.5,-X),l=(G*Y+(V[8]??0)*X+(V[12]??0))/C,v=(A*y+(V[9]??0)*X+(V[13]??0))/C,S=Math.abs(G)*R*0.5/C,T=Math.abs(A)*R*0.5/C,U=Math.max(0,Math.min(l+S,1)-Math.max(l-S,-1)),k=Math.max(0,Math.min(v+T,1)-Math.max(v-T,-1));return U*k*0.25})",()=>"((Q,J)=>function(H,K){let L=(Math.floor(H/gJ));Q.length=0;let D=0;for(let P of J.values()){let R=-1,Z=0;for(let V=0;V<O;V++){if(P.stamps[V]<=L-O)continue;if(R===-1||P.weighted[V]>Z)R=V,Z=P.weighted[V]}if(R===-1)continue;if(Z<uJ){D+=1;continue}Q.push({label:P.label,texture:P.texture,blend:P.blend,alive:P.alive[R],coverage:P.coverage[R],alpha:isNaN(P.alpha[R])?void 0:P.alpha[R],costWeight:P.weights[R],weightedCoverage:Z,agoSeconds:(L-P.stamps[R])*gJ})}Q.sort((P,R)=>R.weightedCoverage-P.weightedCoverage);let j=Math.max(0,Q.length-EJ);if(j>0)Q.length=EJ;if(K)K.pastTop=j,K.underFloor=D;return Q})"]}],$c0XU=[0];var $c0S,$c0D=()=>eval($c0S);function $c0E(s){$c0S=s;return $c0D()}$c0C=$c0K($c0T,$c0XU,$c0E,5,2728817136238592);
;const{EiQ:_J,h1y:BJ,sVa:SJ,ts0:TJ}=$Lr;
var gJ=0.5,O=6,uJ=0.01,EJ=3,mJ=1,xJ=2,bJ=0.5,yJ=3,lJ=2,vJ=1;function sJ(J,$,Q,M){if($){J.sink="sprite";J.texture=$.textures?.[0]??$.texture;J.blend=$.blend??"alpha";J.soft=RJ($.soft);}else {aa(Q,J,M);}}function RJ(J){return BJ(J)&&J>0||void 0}function hJ(J,$=!1){return(J==="distort"?xJ:mJ)+($?bJ:0)}function oJ(J,$=!1){let Q=J[5]??0,M=J[0]??0,W=M!==0?Q/M:1;return{focal:Q/2,aspect:W>0?W:1,orthographic:$}}function wJ(a,b,c){return (wJ=$c0C(0)).apply(this,arguments)}function iJ(J,$,Q,M=0,W=0){return Math.min(1,wJ(J,$,Q,M,W))}function rJ(a,b,c,d,e,f,g){return (rJ=$c0C(1)).call(this,a,b,c,d,e,f,g)}var tJ=`
fn fxStreakScreenShare(proj: mat4x4f, center: vec3f, halfSpan: vec3f, width: f32) -> f32 {
  let orthographic = proj[3].w != 0.0;
  var a = center - halfSpan;
  var b = center + halfSpan;
  if (!orthographic) {
    let depthA = -a.z;
    let depthB = -b.z;
    if (max(depthA, depthB) < 0.5) {
      a = vec3f(center.xy, -0.5);
      b = a;
    } else if (depthA < 0.5) {
      a = mix(a, b, (0.5 - depthA) / (depthB - depthA));
    } else if (depthB < 0.5) {
      b = mix(b, a, (0.5 - depthB) / (depthA - depthB));
    }
  }
  let wA = select(-a.z, 1.0, orthographic);
  let wB = select(-b.z, 1.0, orthographic);
  let na = (proj * vec4f(a, 1.0)).xy / wA;
  let nb = (proj * vec4f(b, 1.0)).xy / wB;
  let scale = vec2f(abs(proj[0].x), abs(proj[1].y));
  let line = (nb - na) / max(scale, vec2f(1e-30));
  let lineLength = length(line);
  let along = select(vec2f(1.0, 0.0), line / max(lineLength, 1e-30), lineLength > 1e-6);
  let cap = scale * along * (0.5 * width);
  let side = scale * vec2f(-along.y, along.x) * (0.5 * width);
  let q0 = na - (cap + side) / wA;
  let q1 = nb + (cap - side) / wB;
  let q2 = nb + (cap + side) / wB;
  let q3 = na - (cap - side) / wA;
  let diagonalA = q2 - q0;
  let diagonalB = q3 - q1;
  let area = 0.5 * abs(diagonalA.x * diagonalB.y - diagonalA.y * diagonalB.x);
  let lo = min(min(q0, q1), min(q2, q3));
  let hi = max(max(q0, q1), max(q2, q3));
  let onBox = max(min(hi, vec2f(1.0)) - max(lo, vec2f(-1.0)), vec2f(0.0));
  let start = na - cap / wA;
  let span = nb + cap / wB - start;
  let reach = vec2f(1.0) + abs(side / wA + side / wB) * 0.5;
  let safeSpan = select(span, vec2f(1e-9), abs(span) < vec2f(1e-9));
  let t0 = (-reach - start) / safeSpan;
  let t1 = (reach - start) / safeSpan;
  let enter = max(max(min(t0.x, t1.x), min(t0.y, t1.y)), 0.0);
  let leave = min(min(max(t0.x, t1.x), max(t0.y, t1.y)), 1.0);
  let inside = max(leave - enter, 0.0);
  return min(min(area * inside, onBox.x * onBox.y) * 0.25, 1.0);
}
`,h=new Float64Array(3);function eJ(a,b,c,d,e,f,g,h,i){return (eJ=$c0C(2)).call(this,a,b,c,d,e,f,g,h,i)}function JQ(a,b,c,d,e,f){return (JQ=$c0C(3)).call(this,a,b,c,d,e,f)}var cJ={slash:{label:"slash (bespoke)",costWeight:yJ},shockwave:{label:"shockwave (bespoke)",costWeight:lJ},decal:{label:"decal (bespoke)",costWeight:vJ}},PJ=new WeakMap;function QQ(J,$,Q,M){if(Q<=0||M<=0)return;let W=_J(PJ,J),I=W.get($);if(!I){{let v$1;{let I$1=I;{let I=I$1;let N=cJ[$];I={instant:{key:`bespoke/${$}`,label:N.label,texture:null,blend:null,alive:0,coverage:0,costWeight:N.costWeight},fresh:!1},W.set($,I)
v$1=I;}}I=v$1}}I.instant.alive=Q,I.instant.coverage=Math.min(1,M),I.fresh=!0}function ZQ(J){let $=PJ.get(J);if(!$)return!1;for(let Q of $.values())if(Q.fresh)return!0;return!1}function $Q(J,$){let Q=PJ.get(J);if(!Q)return;for(let M of Q.values()){if(!M.fresh)continue;M.fresh=!1,$.push(M.instant)}}function MQ(){let J=new Map,$=[],Q=[],W=-1/0,I=-1/0,N=function(H,K){for(let L=0;L<O;L++)if(H.stamps[L]>W-O)return;J.delete(K),$.push(H)};return{isEmpty:()=>J.size===0,update(H,K,L=0){let D=(Math.floor(H/gJ));let j=D===I?Math.min(L,K.length):0;I=D;for(let P=j;P<K.length;P++){let R=K[P],Z=J.get(R.key);if(!Z){Z=$.pop()??({label:"",texture:null,blend:null,stamps:new Int32Array(O),weighted:new Float64Array(O),coverage:new Float64Array(O),weights:new Float64Array(O),alpha:new Float64Array(O).fill(NaN),alive:new Int32Array(O)});Z.stamps.fill(-1);J.set(R.key,Z);}Z.label=R.label,Z.texture=R.texture,Z.blend=R.blend;let V=D%O;if(Z.stamps[V]!==D)Z.stamps[V]=D,Z.weighted[V]=0,Z.coverage[V]=0,Z.weights[V]=1,Z.alpha[V]=NaN,Z.alive[V]=0;let G=R.costWeight??hJ(R.blend),A=R.coverage*G;if(A>=Z.weighted[V])Z.weighted[V]=A,Z.coverage[V]=R.coverage,Z.weights[V]=G,Z.alpha[V]=R.alpha??NaN,Z.alive[V]=R.alive}if(D===W)return;W=D,J.forEach(N)},report:function report(a,b){return (report.$h??=$c0C(4)(Q,J)).call(this,a,b)}}}
;

function aa(Q,J,M){if(Q){J.sink="ribbon";J.texture=Q.texture??null;J.blend=Q.blend??(Q.material?null:"alpha");J.soft=J.blend===null?void 0:RJ(Q.soft);}else if(M){J.sink="mesh";J.texture=null;J.blend=M.blend??(M.material?null:"opaque");J.soft=J.blend===null||J.blend==="opaque"?void 0:RJ(M.soft)}
}



;import{R as $Lr}from"./52e971dc2a986655.mjs";export{$Q as kWK,EJ as Pe6,JQ as ToS,MQ as PYQ,QQ as z5i,ZQ as XUm,eJ as puV,hJ as $NI,iJ as Kji,oJ as mya,rJ as KwS,sJ as vmC,tJ as z2$,wJ as d7D};
