
;var C=null,B=[],x=new Set,H=64;var I=function(){let j=B;B=[],x=G(x);let q=C;if(q===null)return;for(let z of j)try{q.tell(z)}catch{}},J=null;var O=function(j){{let j$1=TypeError(j);{let j=j$1;if(C===null)return j;let q=J??C.now();if(q===null)return j;let{scriptRef:z,hook:D}=q,F=`${z??""}\x00${D??""}\x00${j.message}`;if(x.has(F)||x.size>=H)return j;if(x.add(F),B.length===0)queueMicrotask(I);return B.push({error:j,scriptRef:z,hook:D}),j}}};
;

;import{mnS as G}from"./2f5a32ad-a6f50af7d4c28063.mjs";export{O as vcx};
