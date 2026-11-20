;const{me2:G}=$Lr;
var K=Object.freeze({scaleX:1,scaleY:1,offsetX:0,offsetY:0}),k=Object.freeze([0.5,0]);function Q(b){let v$1;V:{if(typeof b!=="object"||b===null||Array.isArray(b)){v$1=!1;break V;}v$1=c(b);}if(!v$1)return null;return a(b);}function W(b){if(!Array.isArray(b))return k[0];let j=b[0];return G(j,k[0])}function Y(b){if(!Array.isArray(b))return k[1];let j=b[1];return G(j,k[1])}function $(b){return[W(b),Y(b)]}function f(b){return{uvRect:Q(b.uvRect)??K,anchor:$(b.anchor)}}
;

function a(b){return{offsetX:b.x,offsetY:b.y,scaleX:b.width,scaleY:b.height}
}
function c(b){let{x:j,y:J,width:q,height:B}=b;return typeof j==="number"&&typeof J==="number"&&typeof q==="number"&&typeof B==="number"&&Number.isFinite(j)&&Number.isFinite(J)&&Number.isFinite(q)&&Number.isFinite(B)&&q!==0&&B!==0
}

;import{R as $Lr}from"./52e971dc2a986655.mjs";export{K as cZv,Q as U3G,W as lU0,Y as lKp,f as EtR};
