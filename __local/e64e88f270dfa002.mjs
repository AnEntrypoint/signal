;
var a=function(i,t){let r=i.get(t);if(r===void 0)i.set(t,r=[]);return r},s=function(i,t){let r=i.get(t);if(r===void 0)i.set(t,r=new Map);return r},n=function(i,t){let r=i.get(t);if(r===void 0)i.set(t,r=new Set);return r},e=function(i,t,r){let h=i.get(t);if(h?.delete(r),h?.size===0)i.delete(t)},f=function(i,t,r){let h=i.get(t);if(h===void 0)i.set(t,h=r(t));return h};function l(i,t){if(/\b(?:iPhone|iPad|iPod)\b/.test(i)||/\bMacintosh\b/.test(i)&&t>1)return!0;return/\bAppleWebKit\//.test(i)&&/\bSafari\//.test(i)&&!/(?:Chrome|Chromium|CriOS|FxiOS|Edg|EdgiOS|OPR)\//.test(i)};
Object.assign($Ss,{Bjog:n,Gkw:s,Oa7:a,aKA:l,mhQ:f,n9D:e});

;import{S as $Ss}from"./8470e5fcd747a5a5.mjs";export{a as Oa7,e as n9D,f as mhQ,l as aKA,n as Bjog,s as Gkw};
