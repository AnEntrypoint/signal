;const{G_z:M,_PO:G,gSa:J,utv:I}=$Lr;
var R=Object.prototype,j=Array.prototype;var U=G(),H=(q)=>q instanceof Date||q instanceof RegExp||q instanceof Error||q instanceof ArrayBuffer||ArrayBuffer.isView(q)||typeof Blob<"u"&&q instanceof Blob;var C=new WeakSet;var K=function(q){let z=Object.getPrototypeOf(q);return J(z)&&C.has(z)};var F=function(q,z=new WeakSet){if(!J(q))return!1;if(U.has(q)||K(q))return!0;if(M(q))return!1;if(z.has(q))return!1;if(z.add(q),Array.isArray(q))return q.some((W)=>F(W,z));if(q instanceof Map){for(let[W,Z]of q)if(F(W,z)||F(Z,z))return!0;return!1}return c(q,z);};var V=function(q,z=new WeakMap){if(!J(q))return q;let W=z.get(q);if(W!==void 0)return W;let Z=U.get(q),$=Z??q;if(Z){let Q=z.get(Z);if(Q!==void 0)return Q}if(Array.isArray($)){let Q=[];if(z.set(q,Q),Z)z.set(Z,Q);for(let Y of Object.keys(Z?q:$))Q[Number(Y)]=V(Reflect.get(q,Y),z);let X=Reflect.get(q,"length");if(typeof X==="number")Q.length=X;return Q}if($ instanceof Map){let Q=new Map;z.set(q,Q);for(let[X,Y]of $)Q.set(V(X,z),V(Y,z));return Q}if($ instanceof Set){let Q=new Set;z.set(q,Q);for(let X of $)Q.add(V(X,z));return Q}if(H($))return $;let B={};if(z.set(q,B),Z)z.set(Z,B);for(let Q of Object.keys(Z?q:$))I(B,Q,V(Reflect.get(q,Q),z));return B};var m=function(q,z){try{return structuredClone(q,z)}catch(W){{if(!(W instanceof DOMException&&W.name==="DataCloneError")||!F(q))throw W;return structuredClone(V(q),z)
}}};
;

function c(q,z){if(q instanceof Set){for(let W of q)if(F(W,z))return!0;return!1}if(H(q))return!1;return Object.values(q).some((W)=>F(W,z))
}


;import{R as $Lr}from"./52e971dc2a986655.mjs";export{m as yK2};
