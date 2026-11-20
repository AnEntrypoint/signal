
var Q=1280;var K=["image/jpeg","image/png","image/webp"];function U(j){if(j===void 0)return{};if(typeof j!=="object"||j===null||Array.isArray(j))return null;let F=Reflect.get(j,"type"),k=Reflect.get(j,"quality"),B=Reflect.get(j,"maxSize"),J={};if(F!==void 0){if(typeof F!=="string"||!(K.includes(F)))return null;J.type=F}if(k!==void 0){if(typeof k!=="number"||!Number.isFinite(k)||k<0||k>1)return null;J.quality=k}if(B!==void 0){if(typeof B!=="number"||!Number.isFinite(B)||B<1)return null;J.maxSize=Math.floor(B)}return J}
export{Q as k3i,U as $P3};
