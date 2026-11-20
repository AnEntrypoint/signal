import{C as $c0K}from"./52e971dc2a986655.mjs";var $c0C,$c0T=[function(){return[()=>"(function(j,k,G,v,Q){if(j[0]*j[0]+j[1]*j[1]+j[2]*j[2]>0.5||j[3]===0)return!1;let J=q(k,j[3]),K=q(G,j[3]),y=q(v,j[4]),D=q(Q,j[4]);for(let A=y;A<=D;A++)for(let N=J;N<=K;N++){let X=N+F*A,Z=Number(X>=V)+Number(X>=Y);if((j[5+Z]>>>X-R[Z]&1)===0)return!1}return!0})"]}],$c0XU=[0];var $c0S,$c0D=()=>eval($c0S);function $c0E(s){$c0S=s;return $c0D()}$c0C=$c0K($c0T,$c0XU,$c0E,1,3105710416068608);
;const{CDb:g,FSo:H,IVz:M}=$Lr;
var F=M/H,V=22,Y=43,R=[0,V,Y],B=16777216,$=[0,0,0,0,0,0,0,0];function z(j,k,G,v){$[j]=(k&4194303)/v,$[j+1]=((k>>>V|(G&2047)<<32-V)>>>0)/v,$[j+2]=(G>>>Y-32)/v}var b=(j)=>(j-0.5)*M;function W(j,k,G,v,Q=0,J=0,K){if((G|v|Q|J)===0)return null;return z(0,Q,J,B),$[3]=b(j),$[4]=b(k),z(5,G,v,1),K!==void 0&&g(K,$)?K:[...$]}var q=(j,k)=>Math.min(F-1,Math.max(0,Math.floor((j-k)/H)));function w(a,b,c,d,e){return (w=$c0C(0)).call(this,a,b,c,d,e)}function x(j,k,G,v,Q){let J=v===void 0?"":`
    if (any(${k}.xyz != vec3<f32>(0.0))) { ${v} = 0.0; }`,K=v===void 0?"":`
    let handBits = u32(select(select(${k}.z, ${k}.y, cutBit < ${Y}u), ${k}.x, cutBit < ${V}u) * ${B}.0);
    if (((handBits >> cutShift) & 1u) != 0u) { ${v} = 1.0; }`;return`  } else if (${k}.w != 0.0) {${J}
    let cutSub = clamp(floor(((${j} + frame.renderOrigin).xz - vec2<f32>(${k}.w, ${G}.x)) / ${H}.0), vec2<f32>(0.0), vec2<f32>(${F-1}.0));
    let cutBit = u32(cutSub.x) + ${F}u * u32(cutSub.y);
    let cutWord = u32(select(select(${G}.w, ${G}.z, cutBit < ${Y}u), ${G}.y, cutBit < ${V}u));
    let cutShift = select(select(cutBit - ${Y}u, cutBit - ${V}u, cutBit < ${Y}u), cutBit, cutBit < ${V}u);
    if (((cutWord >> cutShift) & 1u) != 0u) { ${Q} }${K}`}var E=(function(j,k,G,v="discard;"){let Q=((y)=>`  if (frame.guest != 0.0) {
    if (frame.guest > 0.0 && ${y}) { ${v} }
    if (frame.guest < 0.0 && dot(frame.guestClipPlane.xyz, ${j}) + frame.guestClipPlane.w < 0.0) { ${v} }`);if("distances"in k)return`${Q(`${k.distances}.z < 0.5`)}
  } else {
    if (${k.distances}.x < 0.0) { ${v} }
    if (${k.distances}.y < 0.0) { ${v} }
  }`;let{first:J,second:K}=k;return`${Q(`dot(${J}.xyz, ${J}.xyz) <= 0.5`)}
  } else if (dot(${J}.xyz, ${J}.xyz) > 0.5) {
    if (dot(${J}.xyz, ${j} + frame.renderOrigin) + ${J}.w < 0.0) { ${v} }
    if (any(${K} != vec4<f32>(0.0)) && dot(${K}.xyz, ${j} + frame.renderOrigin) + ${K}.w < 0.0) { ${v} }
${x(j,J,K,G,v)}
  }`});
;

;import{R as $Lr}from"./52e971dc2a986655.mjs";export{E as hn7,W as MGe,w as FKy};
