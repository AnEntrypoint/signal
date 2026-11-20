
;;async function F(z,J){let q;try{q=await J(z,{headers:{Range:"bytes=0-0"}})}catch(x){return{verdict:"weaving",detail:$(x)}}let Z;{let z=q;let J=Number(z.headers?.get?.("Retry-After")??"");Z=Number.isFinite(J)&&J>0?J*1000:null;}let Q=Z!==null?{retryAfterMs:Z}:{};if(K(z,q.status))return{verdict:"weaving",...Q,...X(z,q.status)?{refused:!0}:{}};if(q.ok)return q.body?.cancel().catch(function(){}),{verdict:"ready"};let Y=`HTTP ${q.status}${q.statusText?` ${q.statusText}`:""}`;if(j(z,q.status))return{verdict:"dead",detail:await H(z,q)??Y};if(q.status===429)return{verdict:"windowed",...Q,detail:Y};return{verdict:"weaving",...Q,detail:Y}}
;

;import{B2y as H,Xxh as j,aHK as X,jTK as K}from"./a67445ffd0666cec.mjs";import{k$w as $}from"./aabb4631-33aaa860f9130c90.mjs";export{F as b0d};
