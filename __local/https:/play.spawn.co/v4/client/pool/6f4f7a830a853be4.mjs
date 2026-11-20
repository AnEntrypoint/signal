;const{MJN:B}=$Ss;
var q=(x)=>typeof x==="string",z=(x)=>Array.isArray(x)?x.filter((M)=>typeof M==="string"):[],A=(x)=>typeof x==="function",C=function(x){if(typeof x!=="string")return null;let M=x.trim();return M.length>0?M:null};var p=new Set,J=new Set;function E(x,M){let N=p.size>0;if(M)p.add(x);else p.delete(x);if(N!==p.size>0)for(let j of[...J])j()}var F=(()=>p.size>0),G=function(x){return B(J,x)};;
Object.assign($Ss,{Bqd:E,E4l:A,Qjo:G,YIx:F,h0H:q,njO:C,wzV:z});

;import{S as $Ss}from"./8470e5fcd747a5a5.mjs";export{A as E4l,C as njO,E as Bqd,F as YIx,G as Qjo,q as h0H,z as wzV};
