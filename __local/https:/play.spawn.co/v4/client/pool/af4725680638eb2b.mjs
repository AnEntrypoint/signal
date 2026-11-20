
var k={position:{format:"float32x3",stride:12,encoding:"raw"},normal:{format:"snorm16x2",stride:4,encoding:"oct16"},uv:{format:"float32x2",stride:8,encoding:"raw"},uvB:{format:"float32x2",stride:8,encoding:"raw"},color:{format:"unorm8x4",stride:4,encoding:"srgb8"},joints:{format:"uint16x4",stride:8,encoding:"raw"},weights:{format:"unorm16x4",stride:8,encoding:"weight16"},tangent:{format:"uint32",stride:4,encoding:"octTangent"}},m=[["position",null,"position","position"],["normal","hasNormal","normal","normal"],["uv","hasUv","uv0","uv"],["uv1","hasUv1","uv1","uv"],["uv2","hasUv2","uv2","uv"],["uv3","hasUv3","uv3","uv"],["color","hasColor","color","color"]],R={oct16:{components:3,words:1},srgb8:{components:4,words:1},weight16:{components:4,words:2},octTangent:{components:4,words:1},index16:{components:2,words:1}};function h(H,j){return j?H.color:null}function S(H,j){if(j==="index16")return Math.ceil(H.byteLength/8);return Math.floor(H.byteLength/4/R[j].components)}function q(H){let{components:j,words:I}=R[H];return{packed:I*4,source:j*4}}function v(H,j){if(j==="raw")return H.byteLength;return S(H,j)*R[j].words*4}var p=4096,T=null,W=null;function f(){let H=new Float64Array(256);for(let j=1;j<256;j+=1){let I=H[j-1],J=1;for(;;){let L=I+(J-I)/2;if(L<=I||L>=J)break;if(Math.round((L<=0.0031308?L*12.92:1.055*L**0.4166666666666667-0.055)*255)>=j)J=L;else I=L}H[j]=J}return H}function C(H){let j=new Uint8Array(p+1),I=0;for(let J=0;J<=p;J+=1){while(I<255&&H[I+1]<=J/p)I+=1;j[J]=I}return j}var G=function(H){let j=(H>0?Math.min(H,1):0);let I=T??=f();let L=(W??=C(I))[j*p|0];return L<255&&I[L+1]<=j?L+1:L};var P=[0,0];function _(H,j,I){return z(H,j,I,P)?((Math.round(Math.min(1,Math.max(-1,(P[0])))*32767)&65535)|(Math.round(Math.min(1,Math.max(-1,(P[1])))*32767)&65535)<<16)>>>0:0}function z(H,j,I,J){let L=Math.abs(H)+Math.abs(j)+Math.abs(I);if(!(L>0&&L<1/0))return!1;J[0]=E(H,j,I,L);J[1]=E(j,H,I,L);return !0}var E=(H,j,I,J)=>I>=0?H/J:(1-Math.abs(j/J))*(H>=0?1:-1);function B(H,j,I,J){return(_(H,j,I)&4294901759|(J>=0?65536:0))>>>0}function x(H,j,I,J){return(G(H)|G(j)<<8|G(I)<<16|Math.round((J>0?Math.min(J,1):0)*255)<<24)>>>0}function b(H,j,I,J,L){{let v$1;e:{if(H==="index16"){for(let M=0;M<J;M++){let Q=(I+M)*2;L[M]=(j[Q]&65535|(Q+1<j.length?(j[Q+1]&65535)<<16:0))>>>0}break e;}
v$1=c;}if((d=v$1)!==c)return d}if(H==="oct16"){for(let M=0;M<J;M++){let Q=(I+M)*3;L[M]=_(j[Q],j[Q+1],j[Q+2])}return}{let v$2;i:{if(H!=="weight16"){let M=H==="srgb8"?x:B;for(let Q=0;Q<J;Q++){let X=(I+Q)*4;L[Q]=M(j[X],j[X+1],j[X+2],j[X+3])}break i;}
v$2=c;}if((d=v$2)!==c)return d}for(let M=0;M<J;M++){let Q=(I+M)*4;y:{let H$1=j[Q],j$1=j[Q+1],I$1=j[Q+2],J$1=j[Q+3],M$1=M*2;{let H=H$1,j=j$1,I=I$1,J=J$1,M=M$1;let Q=H>0?H:0,X=j>0?j:0,U=I>0?I:0,O=J>0?J:0,D=Q+X+U+O;if(!(D>0)||!Number.isFinite(D)){L[M]=0,L[M+1]=0;break y;}let F=65535/D,Y=Math.round(Q*F),Z=Math.round(X*F),$=Math.round(U*F),V=Math.round(O*F),N=65535-(Y+Z+$+V);if(Y>=Z&&Y>=$&&Y>=V)Y+=N;else if(Z>=$&&Z>=V)Z+=N;else if($>=V)$+=N;else V+=N;L[M]=(Y|Z<<16)>>>0,L[M+1]=($|V<<16)>>>0}}}}var w=`fn lume_modelOctDecode(e: vec2<f32>) -> vec3<f32> {
  var n = vec3<f32>(e.x, e.y, 1.0 - abs(e.x) - abs(e.y));
  let t = max(-n.z, 0.0);
  n.x = n.x + select(t, -t, n.x >= 0.0);
  n.y = n.y + select(t, -t, n.y >= 0.0);
  return normalize(n);
}

fn lume_modelSrgbDecode(c: vec4<f32>) -> vec4<f32> {
  let lo = c.rgb / 12.92;
  let hi = pow((c.rgb + vec3<f32>(0.055)) / 1.055, vec3<f32>(2.4));
  return vec4<f32>(select(hi, lo, c.rgb <= vec3<f32>(0.04045)), c.a);
}`,g=`fn lume_modelTangentDecode(word: u32) -> vec4<f32> {
  let e = unpack2x16snorm(word & 0xfffeffffu);
  return vec4<f32>(lume_modelOctDecode(e), select(-1.0, 1.0, (word & 0x10000u) != 0u));
}`;function l(H,j){return H==="oct16"?`lume_modelOctDecode(${j})`:`lume_modelSrgbDecode(${j})`}
;



function c(){}var d;function a(){}

;export{S as jAo,_ as XFK,b as wXU,g as d6W,h as bve,k as Pfl,l as n7E,m as jiN,q as aRg,v as R2h,w as GTU,x as oYK,z as LDz};
