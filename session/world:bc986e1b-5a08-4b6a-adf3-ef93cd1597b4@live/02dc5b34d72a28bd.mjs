var $c0F,$c0N=[],$c0T=[function(){return[()=>'(function(q,z){let B=K(K(q)?.extras),A=B?K(B.spawnRelease):null;if(!A)return{release:null,invalid:!1};let G=L(A,"nodes"),M=L(A,"continueWith"),H=L(A,"followers"),D=A.at,P=(E)=>typeof E==="number"&&Number.isInteger(E)&&E>=0&&E<z;if(D!==void 0&&((typeof D!=="number"||!Number.isFinite(D)||D<0))||(A.followers!==void 0&&!Array.isArray(A.followers))||!H.every(P)||!G.length||!G.every(P)||d(M))return{release:null,invalid:!0};return{release:{nodes:[...new Set(G)],continueWith:M,...typeof D==="number"?{at:D}:{},...H.length?{followers:[...new Set(H)]}:{}},invalid:!1}})']}],$c0XU=[0];function $c0C(n){return($c0F||($c0F=new Array(1)))[n]||$c0A(n)}function $c0XE(n){var S=$c0XU,l=0,r=S.length-1,m;while(l<r){m=l+r+1>>1;if(S[m]<=n)l=m;else r=m-1}return $c0E($c0XN($c0T[l]()[n-S[l]](),(n+3574384356753408)))}function $c0A(n){var g=$c0XE(n);(globalThis.__spawnColdEvaled||(globalThis.__spawnColdEvaled=[0,0]))[0]++;$c0F[n]=g;if($c0N[n]!==1){$c0N[n]=1;(globalThis.__spawnColdCalled||(globalThis.__spawnColdCalled=[])).push((n+3574384356753408))}return g}var $c0S,$c0D=()=>eval($c0S);function $c0E(s){$c0S=s;return $c0D()}function $c0XN(s,k){return globalThis.__spawnColdNamed?s+"\n//# sourceURL=spawn-cold/"+k:s}

;var K=(q)=>typeof q==="object"&&q!==null&&!Array.isArray(q)?q:null,L=(q,z)=>Array.isArray(q[z])?q[z]:[];function X(a,b){return (X=$c0C(0)).call(this,a,b)}function V(q,z){return Q(q,[...z].flatMap((B)=>B?[...B.nodes,...B.followers??[]]:[]))}function Y(q){return V(q.nodes,[...q.animations.map((z)=>z.release),...q.awaitedReleases??[]])}
;



function d(M){return(M.some((E)=>typeof E!=="string"))}
function a(){}

;import{or9 as Q}from"./aa1ae7ade66c43fb.mjs";export{K as GN1,L as jAj,X as xHC,Y as N_V};
