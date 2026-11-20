;const{Ln4:D}=$Lr;
var A=new WeakMap;function H(q){let j=D(null,{flipY:!1,wrap:"repeat"});return j._measured=!0,A.set(j,q),j}function J(q,j){A.set(q,j)}function K(q,j,B){let z=new Set;for(let C of q){if(C.meta.kind!=="textureSample")continue;let k=C.meta.texture,y=A.get(k);if(!y||z.has(k))continue;if(z.add(k),j?.bindRef!==void 0){j.bindRef(y,k,!0,B);continue}k.handle=j?.retain(y)??null,j?.retainOnLoad(y,function(E){k.handle=E,B?.(k)})}return[...z]}
;

;import{R as $Lr}from"./52e971dc2a986655.mjs";export{H as vPv,J as x28,K as vpf};
