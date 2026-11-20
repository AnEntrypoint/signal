
;function I(b,q,A,z){if(b&&A)z(b);if(A)return q;if(q)q.standing=b;return q??G(b,z)}function G(b,q){if(!b)return null;let A=G(b.standing,q),z=F(b.shade),j=z!==null&&C(z);if(b.standing=j?null:A,!j)return b;return q(b),A}function J(b,q,A){let z=q(b);for(let j=b;j;j=j.standing){let B=j===b?z:q(j);if(!A(B))continue;return j.drew=!0,B}return z}function K(b,q){let A=b.standing!==null,z=b,j=b.standing;b.standing=null,b.drew=!1;while(j){let B=j.standing;if(j.standing=null,j.drew)z=z.standing=j;else q(j);j.drew=!1,j=B}return A}
;

;import{AYY as F,ZgU as C}from"./acb621c0-7b0d25d79a8a57b8.mjs";export{I as tSx,J as N4N,K as Yc5};
