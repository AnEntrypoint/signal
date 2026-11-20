
var Y=!1;function G(j){Y=j}var x=()=>Y;var F="x-spawn-auth-error",b="value_name_absent";var w="-u[0-9][0-9a-z]{7}";var g=new RegExp(`${w}\\.[a-z0-9]+(?:\\.ktx2)?$`);var W={relay:null,here:null};function O(){return W.here}function D(j){W.relay=j}function N(j,J){let Q=W.relay??W.here;if(Q===null)return a();return Q.fetch(j,J)}function p(j,J=!1){(W.relay??W.here)?.warm(j,J)}function u(j){return W.here?.address(j)??null}var q=null;function T(){let j=q;if(j===null)return Promise.resolve();return j.then(function(){return},function(){return})}var H=!0;function y(){return H}var U=30000,Z=300000,k=3600000,V=5,L=1.25,X=2000,B=30000,c=(j)=>Math.min(B,X*2**Math.max(0,j-1));function S(j,J){if(J!==null&&J>Z)return J===1/0?J:Math.min(J,k);let Q=x()&&q===null;if(J!==null&&J>0)return Q?Math.min(Z,Math.round(J*L**Math.max(0,j-V))):J;return Math.min(U*2**Math.max(0,j-1),Q?k:Z)}var C="x-cook-retry-after";function m(j){let J=Number(j.headers?.get?.(C)??NaN);return Number.isFinite(J)&&J>0?J*1000:v(j)}function v(j){if(j.headers?.get?.(F)===b)return 1/0;let J=j.headers?.get?.("Retry-After");if(!J)return null;let Q=Number(J);if(isFinite(Q))return Q>0?Q*1000:null;return d(J);}
;

function a(){return Promise.reject(TypeError("asset-road: no fetcher and no relay stand in this realm"));
}
function d(J){let $=Date.parse(J);if(!Number.isFinite($))return null;let z=$-Date.now();return z>0?z:null
}

;export{D as i$S,G as TKt,N as qsk,O as bpz,S as R4i,T as EyL,c as hZL,m as rf3,p as dCM,u as jHK,v as Efy,y as v6W};
