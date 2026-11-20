
;var q=128,V=32,J=new Map,W=!1,B=new Set,G=new Set;var Y=new Map;var N=(function(j,F,x=1){P(j,F,x)});function P(j,F,x){if(!Number.isFinite(x)||x<=0)return;W=!0;let v$2;C:{let j$1=F;{let j=j$1;if(!j)break C;let F={},x=0,H=Object.keys(j);for(let z=0;z<H.length;z+=1){let I=H[z],D=j[I];if(typeof D!=="string"||D.length===0)continue;F[I]=D.length>V?D.slice(0,V):D,x+=1}v$2=x>0?F:void 0;}}let H=v$2;let v$1;h:{let F$1=H;{let F=F$1;if(!F){v$1=j;break h;}let x=Object.keys(F),H=Y.get(j),z;if(H!==void 0&&Z(H.keys,x))z=H.sorted;else z=[...x].sort(((D,$)=>D.localeCompare($))),Y.set(j,{keys:x,sorted:z});let I=j;for(let D of z)I+=`\x00${D}=${F[D]}`;v$1=I;}}let z=v$1;let I=J.get(z);if(I){I.count+=x;Q(z);return}if(J.size>=q){{let D=J.get("overflow");if(D)D.count+=x;else J.set("overflow",{name:"overflow",count:x});Q("overflow");
}return}J.set(z,{name:j,...H!==void 0?{tags:H}:{},count:x});Q(z)}var Q=function(j){B.add(j),G.delete(j)};
;



;import{e2D as Z}from"./2f5a32ad-24596c0f807cb5a4.mjs";export{N as CiI};
