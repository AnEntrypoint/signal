;
var s=[32,0,65,2,1,106,34,33,3,128,11,4,13,64,6,253,10,7,15,116,127,5,8,12,40,16,19,54,20,9,27,255,113,17,42,67,24,23,146,148,18,14,22,45,70,69,56,114,101,21,25,63,75,136,108,28,118,29,73,115],i=((r)=>r>96?r-97:r>64?r-39:r+4);var h=(function(r,o){let n=new Uint8Array(o),a=0;for(let e=0;e<r.length;e++){let t=i(r.charCodeAt(e));n[a++]=t<60?s[t]:(t-60)*64+i(r.charCodeAt(++e))}if(a!==o)throw Error("meshopt program length does not match its pinned binary");return n.buffer});;
Object.assign($Ss,{Zwn:h});

;import{S as $Ss}from"./8470e5fcd747a5a5.mjs";export{h as Zwn};
