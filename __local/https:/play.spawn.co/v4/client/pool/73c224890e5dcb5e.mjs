var $c0F,$c0N=[],$c0T=[function(){return[()=>"(function(u,$,y,g,v,H,C,U=0,E=(y+4-1>>2)-1){if(q[0]=g,q[1]=v,H[C]=j[0],H[C+1]=j[1],v===g)return 0;let G=(j[1]&15)+1;j[1]&=-16;let J=1/q[1];let D=(y+4-1>>2);let K=2*G-1;let F=C+2;H.fill(0,F+U*D*G,F+(E+1)*D*G);for(let Q=U*D;Q<(E+1)*D;Q++){I(u,$,y,g,J,Q,D);let B=F+Q*G,M=Y[16];H[B]=M;for(let V=0;V<16;V++){let O=Y[V]-M,T=16+V*K,z=B+(T>>>5),A=T&31;H[z]|=O<<A,H[z+1]|=O>>>1>>>31-A}}return D*G})",()=>"(function(u,$,y,g,v,H,C){let U=65535,E=0;for(let G=0;G<16;G++){let J=Math.min(H%C*4+(G&3),y-1),D=Math.min(Math.floor(H/C)*4+(G>>2),y-1),K=(u[$+D*y+J]-g)*v,F=K<65535?K|0:0;Y[G]=F,U=Math.min(U,F),E=Math.max(E,F)}return Y[16]=U,E-U})"]}],$c0XU=[0];function $c0C(n){return($c0F||($c0F=new Array(2)))[n]||$c0A(n)}function $c0XE(n){var S=$c0XU,l=0,r=S.length-1,m;while(l<r){m=l+r+1>>1;if(S[m]<=n)l=m;else r=m-1}return $c0E($c0XN($c0T[l]()[n-S[l]](),(n+2817132812304384)))}function $c0A(n){var g=$c0XE(n);(globalThis.__spawnColdEvaled||(globalThis.__spawnColdEvaled=[0,0]))[0]++;$c0F[n]=g;if($c0N[n]!==1){$c0N[n]=1;(globalThis.__spawnColdCalled||(globalThis.__spawnColdCalled=[])).push((n+2817132812304384))}return g}var $c0S,$c0D=()=>eval($c0S);function $c0E(s){$c0S=s;return $c0D()}function $c0XN(s,k){return globalThis.__spawnColdNamed?s+"\n//# sourceURL=spawn-cold/"+k:s}

var W=(function(u,$){return`fn ${u}_side(s: vec2<f32>, f: vec2<f32>, p: vec2<f32>) -> bool {
  return s.x * (p.y - f.y) - s.y * (p.x - f.x) > 0.0;
}

fn ${u}(word: f32, base: u32, f: vec2<f32>) -> bool {
  if (word == 0.0) { return false; }
  if (word < 0.0) { return true; }
  let at = base + u32(word) - 1u;
  let count = u32(${$}(at));
  let r = vec2<f32>(${$}(at + 1u), ${$}(at + 2u));
  let s = r - f;
  var gone = false;
  for (var i = 0u; i < count; i = i + 1u) {
    let o = at + 3u + i * 4u;
    let a = vec2<f32>(${$}(o), ${$}(o + 1u));
    let b = vec2<f32>(${$}(o + 2u), ${$}(o + 3u));
    let e = b - a;
    let d1 = e.x * (f.y - a.y) - e.y * (f.x - a.x);
    let d2 = e.x * (r.y - a.y) - e.y * (r.x - a.x);
    if ((d1 > 0.0) != (d2 > 0.0) && ${u}_side(s, f, a) != ${u}_side(s, f, b)) { gone = !gone; }
  }
  return gone;
}`});var p=6,n=1,x=3,c=4,N=5,i=2;var b=9;function f(u,$){let y=(u+4-1>>2);return 2+y*y*$}var j=new Uint32Array(4),q=new Float32Array(j.buffer),Y=new Uint16Array(17);function k(u,$,y,g,v,H=!1){let C=y*y;if(u===null||u.length<$+C)return g[v]=g[v+1]=0,0;let U;{let y$1=$+C;{let y=y$1;let g=1/0,v=-1/0;for(let H=$;H<y;H++){let C=u[H];if(C-C!==0)continue;if(C<g)g=C;if(C>v)v=C}U=(Z[0]=g,Z[1]=v,Z);}}let E=U[0]<=U[1]?U[0]:0;if(!(U[0]<U[1]))return g[v]=g[v+1]=0.0009765625*Math.floor(E/0.0009765625),0;let G;{let u=U[1]-E;let $=0.0009765625;while($*65533<u)$*=2;G=$;}let K;{K=a(G,E,y,u,$)}if(j[1]|=K-1,q[2]=g[v],q[3]=g[v+1],H&&j[2]!==j[3]&&(j[1]^j[3])<16&&(j[1]&15)<=(j[3]&15)&&E>=q[2]&&(U[1]-q[2])/G<65535)return(j[3]&15)+1;return g[v]=q[0],g[v+1]=q[1],K}function R(a,b,c,d,e,f,g){return (R=$c0C(0)).apply(this,arguments)}function I(a,b,c,d,e,f,g){return (I=$c0C(1)).call(this,a,b,c,d,e,f,g)}var Z=new Float64Array(2);function P(u,$,y){return`fn ${u}Head(${$}t: u32) -> vec3<u32> {
let f = ${y("t")};
let s = ${y("t+1u")};
return vec3<u32>(t, f, select(s, 0u, s == f));
}
fn ${u}(${$}h: vec3<u32>, x: u32, z: u32, r: u32) -> f32 {
let n = (h.z&15u)+1u;
let w = 2u*n-1u;
let b = h.x+2u+((z>>2u)*((r+3u)>>2u)+(x>>2u))*n;
let i = 16u+((z&3u)*4u+(x&3u))*w;
let a = b+i/32u;
let s = i&31u;
return bitcast<f32>(h.y)+f32((${y("b")}&0xffffu)+(((${y("a")}>>s)|((${y("a+1u")}<<1u)<<(31u-s)))&((1u<<w)-1u)))*bitcast<f32>(h.z&~15u);
}`}function _(u){return`${P(`${u}_post`,"",($)=>`heights[${$}]`)}

fn ${u}_tile(slot: u32) -> vec3<u32> {
  return ${u}_postHead(heights[slot * 6u]);
}

fn ${u}(tile: vec3<u32>, x: i32, z: i32) -> f32 {
  let texRes = i32(pool.textureResolution);
  return ${u}_post(tile, u32(clamp(x, 0, texRes - 1)), u32(clamp(z, 0, texRes - 1)), u32(texRes));
}

fn ${u}_lattice(slot: u32) -> f32 {
  let tile = heights[slot * 6u];
  let stepWord = heights[tile + 1u];
  return select(bitcast<f32>(stepWord & ~15u), 0.0009765625, stepWord == heights[tile]);
}`}
;

function a(G,E,y,u,$){if(q[0]=G*Math.floor(E/G),q[1]=G,j[1]===j[0])q[0]=0;let J=(y+4-1>>2);let D=0;for(let F=0;F<J*J;F++)D=Math.max(D,I(u,$,y,q[0],1/G,F,J));let K=34-Math.clz32(D)>>1;
return K}

;export{N as NP4,P as CfE,R as cfi,W as QE8,_ as j6w,b as cT2,c as pVs,f as olX,i as tOI,k as _ii,n as S12,p as i7u,x as aG_};
