
var A=new WeakMap;function B(z,q="cover"){let j=A.get(z);if(!j)j=new Map,A.set(z,j);let p=j.get(q);if(!p)p={noted:0,chunks:[],all:!1,live:!0},j.set(q,p);return p}function D(z,q){let j=A.get(z);if(!j)return;a(j,q);}function E(z){let q=A.get(z);if(!q)return;for(let j of q.values())j.noted+=1,j.all=!0,j.chunks.length=0}function F(z,q){let j=A.get(z)?.get(q);if(j?.live!==!0)return null;return j.all?"all":j.chunks}
;

function a(j,q){for(let p of j.values()){if(p.noted+=1,p.all)continue;if(p.chunks.length>=4096){p.all=!0,p.chunks.length=0;continue}p.chunks.push(q)}
}

;export{B as oKJ,D as QEI,E as JWG,F as Eaq};
