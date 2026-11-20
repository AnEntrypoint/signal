
;var $=128,Q=32,J=new Map,q=!1,W=new Set,B=new Set;var V=new Map;var N=(function(j,H,x=1){C(j,H,x)});function C(j,H,x){if(!Number.isFinite(x)||x<=0)return;q=!0;let I=j;let v$2;h:{let j$2=H;{let j=j$2;if(!j)break h;let H={},x=0,I=Object.keys(j);for(let z=0;z<I.length;z+=1){let F=I[z],D=j[F];if(typeof D!=="string"||D.length===0)continue;H[F]=D.length>Q?D.slice(0,Q):D,x+=1}v$2=x>0?H:void 0;}}let z=v$2;let v$1;G:{let j$1=I,H$1=z;{let j=j$1,H=H$1;if(!H){v$1=j;break G;}let x=Object.keys(H),I=V.get(j),z;if(I!==void 0&&Y(I.keys,x))z=I.sorted;else z=[...x].sort(((D,Z)=>D.localeCompare(Z))),V.set(j,{keys:x,sorted:z});let F=j;for(let D of z)F+=`\x00${D}=${H[D]}`;v$1=F;}}let F=v$1;if(!J.has(F)&&J.size>=$)F=I="overflow",z=void 0;let D=J.get(F);if(D)D.count+=x;else J.set(F,{name:I,...z!==void 0?{tags:z}:{},count:x});{let j=F;W.add(j),B.delete(j)}}
;

;import{e2D as Y}from"./2f5a32ad-a57e1e85bb0765e9.mjs";export{N as CiI};
