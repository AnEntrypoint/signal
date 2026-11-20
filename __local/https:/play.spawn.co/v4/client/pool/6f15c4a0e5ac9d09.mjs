
;async function F(z,J){let q;try{q=await J(z,{headers:{Range:"bytes=0-0"}})}catch(x){return{verdict:"weaving",detail:$(x)}}let Z;{let z=q;let J=Number(z.headers?.get?.("Retry-After")??"");Z=Number.isFinite(J)&&J>0?J*1000:null;}let Q=Z!==null?{retryAfterMs:Z}:{};if(K(z,q.status))return{verdict:"weaving",...Q,...X(z,q.status)?{refused:!0}:{}};if(q.ok)return q.body?.cancel().catch(function(){}),{verdict:"ready"};let Y=`HTTP ${q.status}${q.statusText?` ${q.statusText}`:""}`;if(j(z,q.status))return{verdict:"dead",detail:await H(z,q)??Y};if(q.status===429)return{verdict:"windowed",...Q,detail:Y};return{verdict:"weaving",...Q,detail:Y}}
;

;import{BAC as X,KYI as j,OjE as H,QkR as K,k$w as $}from"./aabb4631-4c1a133406cb98f1.mjs";export{F as b0d};
