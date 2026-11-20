import{C as $c0K}from"./52e971dc2a986655.mjs";var $c0C,$c0T=[function(){return[()=>"(function(q){let v$2;{let q$1=q.constraints?.slopeRange;{let q=q$1;let[J,B]=O(q,[0,1],0,90);v$2=B>1?[1-Math.cos(J*b/180),1-Math.cos(B*b/180)]:[J,B];}}let J=v$2;let B=O(q.constraints?.heightRange,[-f,f],-f,f);return{slopeMin:J[0],slopeMax:J[1],heightMin:B[0],heightMax:B[1]}})",()=>"(function(q){let{width:J,height:B,widthRange:$,heightRange:G}=n(q);if(J<=0||B<=0)return null;let j=[$[0]/J,$[1]/J],Y=[G[0]/B,G[1]/B],V=q.randomRotation===!0;if(!V&&j[0]===j[1]&&Y[0]===Y[1])return null;return{widthScale:j,heightScale:Y,randomRotation:V}})",()=>'(function(q,J){let B=q.kind==="scripted"?q:null,$=B?.scale??(J?J.widthScale:null),G=B?.scale??(J?J.heightScale:null),j=J!==null||q.kind==="sprite"||B!==null&&(B.scale!==void 0||B.randomRotation===!0);return{widthMin:$?$[0]:1,widthMax:$?$[1]:1,heightMin:G?G[0]:1,heightMax:G?G[1]:1,turns:J?.randomRotation===!0||B!==null&&B.randomRotation===!0,varies:j}})',()=>"(function(q,J,B,$,G){let j=U(J),Y=U(B),V=1,S=1,x=0;if(q.varies){if(V=q.widthMin+(q.widthMax-q.widthMin)*k(U(j+7),U(Y+13),0),S=q.heightMin+(q.heightMax-q.heightMin)*k(U(j+19),U(Y+23),0),q.turns)x=k(U(j+42),U(Y+19),0)*l}$[G+3]=V,$[G+4]=S,$[G+5]=m-x})"]}],$c0XU=[0];var $c0S,$c0D=()=>eval($c0S);function $c0E(s){$c0S=s;return $c0D()}$c0C=$c0K($c0T,$c0XU,$c0E,4,19772234268672);(globalThis.__spawnColdCross||(globalThis.__spawnColdCross=[])).push([$c0C.w,[0,2]]);
;const{LNd:k,LNp:F,NDw:Q,VSF:T,ZqQ:p,bgV:M,h1y:L,lbZ:m,ts0:b}=$Lr;
function a(q,J){let B=Math.max(0,J.fullRadius);let $=Math.max(B+0.000001,J.zeroRadius);let G=(Math.min(1,Math.max(0,((q-B)/($-B)))));return 1-G*G*(3-2*G)}function X(q,J){let B=(q^J)>>>0;return B=(B^B>>>16)>>>0,B=Math.imul(B,2146121005)>>>0,B=(B^B>>>15)>>>0,B=Math.imul(B,2221713035)>>>0,B=(B^B>>>16)>>>0,B/4294967296}var v=2246822507,D=668265263,Z=0.05;function e(q,J,B=!1){let $=(Math.min(1,Math.max(0,q)));if($<=0)return 0;if($>=1)return 1;let G=X(J,D);if(B)return G<$?1:0;return M(G-Z,G+Z,$)}var P=374761393;function qq(q,J){if(q>=1)return 1;if(!(q>0))return 0;return X(J,P)<q?1:0}var y=2654435769;function Bq(q,J){if(!(J>0))return 0;let B=Math.min(1,J/Math.max(q,0.000001));return B*B}var R=1;function Jq(q,J){if(q>=1)return 1;if(q<=0)return 0;return X(J,v)<q?1:0}var W=7.5,H=[2,4],$q=900,c=0.5,g=0.7;function A(q){return Math.min(1,(q/W)**2)*M(H[0],H[1],q)}function Gq(q,J,B,$,G=!1){if(G)return 1;let v$1;{let G=Math.max(0,$)/Math.max(q,0.001),j=Math.min(1,Math.max(-1,J*G));v$1=(Math.min(1,Math.max(-1,(J+Math.max(0,B))*G))-j)*0.5;}return 1-M(c,g,v$1)}var N=[W,W*3];var jq=0.25,z=[4.74,2.99,H[0]],K=[1,A(z[0]),A(z[1]),0];var Qq=`
fn decor_footprintDensity(footprintPx: f32) -> f32 {
  let full = min(1.0, (footprintPx / ${Q(W)}) * (footprintPx / ${Q(W)}));
  return full * smoothstep(${Q(H[0])}, ${Q(H[1])}, footprintPx);
}

fn decor_footprintWear(footprintPx: f32) -> f32 {
  return 1.0 - smoothstep(${Q(N[0])}, ${Q(N[1])}, footprintPx);
}

fn decor_levelFraction(level: u32) -> f32 {
  if (level == 0u) { return 1.0; }
  if (level == 1u) { return ${Q(K[1])}; }
  if (level == 2u) { return ${Q(K[2])}; }
  return 0.0;
}

fn decor_levelKeep(densityFraction: f32, level: u32) -> f32 {
  let hi = decor_levelFraction(level);
  let lo = decor_levelFraction(level + 1u);
  return clamp((densityFraction - lo) / max(hi - lo, 1e-6), 0.0, 1.0);
}

fn decor_smoothVisibility(distanceToFocus: f32, fullRadiusInput: f32, zeroRadiusInput: f32) -> f32 {
  let fullRadius = max(fullRadiusInput, 0.0);
  let zeroRadius = max(zeroRadiusInput, fullRadius + 1e-4);
  return 1.0 - smoothstep(fullRadius, zeroRadius, distanceToFocus);
}

fn decor_stableThreshold(candidateId: u32, salt: u32) -> f32 {
  var value = candidateId ^ salt;
  value ^= value >> 16u;
  value *= 0x7feb352du;
  value ^= value >> 15u;
  value *= 0x846ca68bu;
  value ^= value >> 16u;
  return f32(value) / 4294967296.0;
}

fn decor_distanceKeep(rootVisibility: f32, candidateId: u32, groundCover: bool) -> f32 {
  let keep = clamp(rootVisibility, 0.0, 1.0);
  if (keep <= 0.0) { return 0.0; }
  if (keep >= 1.0) { return 1.0; }
  let threshold = decor_stableThreshold(candidateId, 0x${D.toString(16)}u);
  if (groundCover) { return select(0.0, 1.0, threshold < keep); }
  return smoothstep(threshold - ${Q(Z)}, threshold + ${Q(Z)}, keep);
}

fn decor_tailKeep(tail: f32, candidateId: u32) -> f32 {
  if (tail >= 1.0) { return 1.0; }
  return select(0.0, 1.0, decor_stableThreshold(candidateId, 0x${P.toString(16)}u) < tail);
}

fn decor_qualityKeep(keep: f32, candidateId: u32) -> f32 {
  if (keep >= 1.0) { return 1.0; }
  return select(0.0, 1.0, decor_stableThreshold(candidateId, 0x${y.toString(16)}u) < keep);
}

fn decor_nearKeep(distance: f32, radius: f32) -> f32 {
  if (radius <= 0.0) { return 0.0; }
  let share = min(1.0, radius / max(distance, 1e-6));
  return share * share;
}

fn decor_nearArrivalWear(distance: f32, radius: f32, floor: f32, candidateId: u32) -> f32 {
  if (radius <= 0.0) { return 0.0; }
  let threshold = decor_stableThreshold(candidateId, 0x${y.toString(16)}u);
  if (threshold < floor) { return 0.0; }
  let share = radius / max(distance, 1e-6);
  return 1.0 - clamp((share * share - threshold) / (${Q(R)} * max(threshold, 1e-6)), 0.0, 1.0);
}

fn decor_staticKeep(coverage: f32, candidateId: u32) -> f32 {
  if (coverage >= 1.0) { return 1.0; }
  if (coverage <= 0.0) { return 0.0; }
  return select(0.0, 1.0, decor_stableThreshold(candidateId, 0x85ebca6bu) < coverage);
}
`;var E=p,zq=[1337,7919,4217],_=0.15,f=340282346600000000000000000000000000000;function s(...q){let J=2166136261;for(let B of q)J^=B>>>0,J=Math.imul(J,16777619);return J>>>0}function w(q){let J=5381;for(let B=0;B<q.length;B++)J=(J<<5)+J+q.charCodeAt(B)|0;return Math.abs(J)}var u=(q)=>w(q.replace(/^(scatter:#[^#|]*)#[^|]*/,"$1"));function Mq(q,J,B){let $=q.kind==="sprite"?q.texture:T(q);return s(u(J),B+1,w(q.kind),w($))}function fq(q,J,B,$=1){return Math.max(0,q.weight??1)/Math.max(B,0.000000001)*Math.max(0,J.density)*Math.max(0,$)}var O=function(q,J,B,$){if(!Array.isArray(q)||q.length!==2||!L(q[0])||!L(q[1]))return[J[0],J[1]];let G=F(q[0],B,$),j=F(q[1],B,$);return G<=j?[G,j]:[j,G]};function kq(a){return (kq=$c0C(0)).call(this,a)}function n(q){let J=q.height??[0.45,0.75],B=q.width??J,$=q.sink??_;return{width:(B[0]+B[1])*0.5,height:(J[0]+J[1])*0.5,sink:$,widthRange:B,heightRange:J}}function Xq(a){return (Xq=$c0C(1)).call(this,a)}var Fq=8;function I(q,J){let B=(q^J)>>>0;return B^=B>>>16,B=Math.imul(B,2146121005)>>>0,B^=B>>>15,B=Math.imul(B,2221713035)>>>0,B^=B>>>16,B/4294967296}function Lq(q){return{x:I(q,2654435769)-0.5,z:I(q,2246822507)-0.5}}function bq(q){return q<=E}function wq(q,J){return J*Math.max(1,q.scale?.[1]??1)}function Sq(q){return q>0.000000001?1/Math.sqrt(q):0}var r=4.5,o=(q)=>Math.max(0,K[q]-K[q+1]);function xq(q,J,B){if(B<=0)return[];let $=Math.max(0,q);if(J&&$<r)return[{index:B-1,perM2:$}];return z.map((G,j)=>({index:Math.min(j,B-1),perM2:$*o(j)}))}function yq(a,b){return (yq=$c0C(2)).call(this,a,b)}var l=6.28318530718,U=Math.fround;function Aq(a,b,c,d,e){return $c0C(3).call(this,a,b,c,d,e)}
;

;import{R as $Lr}from"./52e971dc2a986655.mjs";export{$q as TW5,A as VhG,Aq as Q7O,Bq as OZs,D as GpH,E as DsW,Fq as iSm,Gq as Clx,Jq as _v7,K as nUU,Lq as SY6,Mq as D4M,N as hkK,P as Huf,Qq as aFe,Sq as IuP,W as yeK,X as jpP,Xq as kqr,Z as Ckn,a as pZa,bq as IAf,c as Gwp,e as DFP,fq as GjU,g as EJ8,jq as D9n,kq as z9g,n as vPL,o as UqC,qq as nza,r as nZ2S,s as tFo,u as KK9,wq as i0W,xq as lR9,y as gF3,yq as u5Q,z as MKd,zq as faCX};
