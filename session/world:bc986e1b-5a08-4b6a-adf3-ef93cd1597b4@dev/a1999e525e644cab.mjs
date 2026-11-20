;const{B6B:j,HVu:I,PQv:U,QuY:N,YMf:W,axY:B,dve:X,nYm:q,qdt:V,sJN:P,xJ6:G}=$Lr;
;var _=30000;function E(z,x=new Set){return z(function(J){if(J?.buffer instanceof ArrayBuffer)x.add(J.buffer)}),[...x]}async function Q(z,x){let J=q(z,x)||I(z,x)?await N(x):null,Z=J===null&&x.status===404&&B(z,x.status),$=Z?(await P(z,x)).reserved:null;if(J===null&&!Z)W(x);return{ok:!1,fault:"answer",status:x.status,retryAfterMs:U(x),...J?{cookFailed:J}:{},...j(x)?{cookStartedHere:!0}:{},...G(x)?{queued:!0}:{},...$!==null?{reserved:$}:{}}}var Y=V("meshopt decoder",()=>X(()=>$Lo("./"+globalThis.__spawnBuilt.doors["e98b480e"]).then(()=>import("./"+globalThis.__spawnBuilt.doors["e98b480e"]))));async function R(z=L){return(await Y.load()).initMeshoptDecoder(z)}async function F(z=L){let x=await Y.attempt();if(x===null){{throw Error("the meshopt decoder's chunk did not arrive in this realm");
}}return x.initMeshoptDecoder(z)}function M(){return Y.attempt()}var K=V("meshopt simplifier",()=>X(()=>$Lo("./"+globalThis.__spawnBuilt.doors["c08f3b5e"]).then(()=>import("./"+globalThis.__spawnBuilt.doors["c08f3b5e"]))));async function D(z=L){return(await K.load()).initMeshoptSimplifier(z)}async function v(z=L){let x=await K.attempt();if(x===null)throw Error("the meshopt simplifier's chunk did not arrive in this realm");return x.initMeshoptSimplifier(z)}
;



;import{O as $Lo,R as $Lr}from"./52e971dc2a986655.mjs";import{XZz as L}from"./c69020056aa9c8be.mjs";export{D as D2I,E as OZg,F as RpC,M as y1s,Q as puo,R as ZhA,_ as JXw,v as eff};
