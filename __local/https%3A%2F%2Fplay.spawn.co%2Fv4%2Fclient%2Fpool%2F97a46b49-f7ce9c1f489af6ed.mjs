;const{Csh:i1,Usd:r,Xc1:J2,J_U:C}=$Ss;var $c0F,$c0N=[],$c0T=[function(){return[()=>"(function(J,Q,$,j){let X=Q[$],B=S(X),V=(j.mieScattering+j.mieAbsorption)*h(X),z=h3(X);return J[0]=j.rayleighScattering[0]*B+V+j.ozoneAbsorption[0]*z,J[1]=j.rayleighScattering[1]*B+V+j.ozoneAbsorption[1]*z,J[2]=j.rayleighScattering[2]*B+V+j.ozoneAbsorption[2]*z,J})",()=>"(()=>({rayleighScattering:[0,0,0],mieScattering:NaN,mieAbsorption:NaN,mieAnisotropy:NaN,ozoneAbsorption:[0,0,0],groundAlbedo:[0,0,0]}))",()=>"(function(J){for(let Q=0;Q<3;Q++)void 0,(H??=$c0I(1)).rayleighScattering[Q]=J.rayleighScattering[Q],(H??=$c0I(1)).ozoneAbsorption[Q]=J.ozoneAbsorption[Q],(H??=$c0I(1)).groundAlbedo[Q]=J.groundAlbedo[Q];return (H??=$c0I(1)).mieScattering=J.mieScattering,(H??=$c0I(1)).mieAbsorption=J.mieAbsorption,(H??=$c0I(1)).mieAnisotropy=J.mieAnisotropy,(H??=$c0I(1))})",()=>"(function(J,Q,$,j){y(q,G,Q,$,R);let B=Math.max(q[G],0)/t;q[Z]=0,q[Z+1]=0,q[Z+2]=0;for(let V=0;V<t;V++){let z=(V+0.5)*B;j3[0]=Q[0]+$[0]*z,j3[1]=Q[1]+$[1]*z,j3[2]=Q[2]+$[2]*z,r(j3,0,1,q,p),q[p]-=Y;let k=v3(G2,q,p,j);q[Z]+=k[0]*B,q[Z+1]+=k[1]*B,q[Z+2]+=k[2]*B}return J[0]=Math.exp(-q[Z]),J[1]=Math.exp(-q[Z+1]),J[2]=Math.exp(-q[Z+2]),J})",()=>"(function(J,Q,$,j){let X=w2;X[0]=Math.sqrt(Math.max(1-$*$,0)),X[1]=$,X[2]=0;let B=U2;B[0]=0,B[1]=Q,B[2]=0;for(let V=0;V<3;V++)q[V3+V]=0,q[F3+V]=0;for(let V=0;V<X3;V++)N2(V,B,X,j);for(let V=0;V<3;V++)J[V]=q[V3+V]/X3/Math.max(1-q[F3+V]/X3,0.001);return J})",()=>"(function(J,Q,$,j){let X=(J%i+0.5)/i,B=(Math.floor(J/i)+0.5)/i,V=1-X*2,z=Math.sqrt(Math.max(1-V*V,0)),k=B*2*Math.PI;N[0]=z*Math.cos(k),N[1]=V,N[2]=z*Math.sin(k),y(q,G,Q,N,Y);let x=q[G];if(y(q,G,Q,N,R),x>0)q[g]=x;else q[g]=Math.max(q[G],0);q[k3]=q[g]/l3,K[0]=1,K[1]=1,K[2]=1,A[0]=0,A[1]=0,A[2]=0,_[0]=0,_[1]=0,_[2]=0;for(let W=0;W<l3;W++)E2(W,Q,$,j);if(x>0){q[z3]=x,P3(Q,N),L3();let W=f[0]*$[0]+f[1]*$[1]+f[2]*$[2];q[w]=Y,q[W3]=W;let b=f3(Y3,j);for(let L=0;L<3;L++)A[L]+=K[L]*b[L]*Math.max(W,0)*j.groundAlbedo[L]*(1/Math.PI)}for(let W=0;W<3;W++)q[V3+W]+=A[W],q[F3+W]+=_[W]})",()=>"(function(J,Q,$,j){let X=q[k3];q[z3]=(J+0.5)*X,P3(Q,N),L3(),q[W3]=f[0]*$[0]+f[1]*$[1]+f[2]*$[2];let B=q[w]-Y;q[p]=B;let V=t3(j),z=j.mieScattering*h(B),k=S(B);E[0]=j.rayleighScattering[0]*k+z,E[1]=j.rayleighScattering[1]*k+z,E[2]=j.rayleighScattering[2]*k+z;let x=f3(Y3,j),W=r3(P,f,$);for(let b=0;b<3;b++){let L=Math.exp(-V[b]*X),n=E[b]*x[b]*W*(1/(4*Math.PI));A[b]+=K[b]*(n-n*L)/V[b],_[b]+=K[b]*(E[b]-E[b]*L)/V[b],K[b]*=L}})",()=>"(function(J,Q,$,j,X,B){y(q,G,x3,Q,Y);let V=q[G];if(y(q,G,x3,Q,R),V>0&&!B)q[g]=V;else q[g]=Math.max(q[G],0);q[k3]=q[g]/m3;let z=Q[0]*$[0]+Q[1]*$[1]+Q[2]*$[2];q[s3]=_3(z),q[n3]=u3(z,j.mieAnisotropy),K[0]=1,K[1]=1,K[2]=1,J[0]=0,J[1]=0,J[2]=0;for(let k=0;k<m3;k++)p2(J,k,Q,$,j,X,B);return J})",()=>"(function(J,Q,$,j,X,B,V){let z=q[k3];if(q[z3]=(Q+0.5)*z,P3(x3,$),V&&q[w]<Y){let F=Y/Math.max(q[w],0.001);P[0]*=F,P[1]*=F,P[2]*=F,r(P,0,1,q,w)}L3(),q[W3]=f[0]*j[0]+f[1]*j[1]+f[2]*j[2];let k=q[w]-Y;q[p]=k;let x=t3(X),W=S(k),b=X.mieScattering*h(k),L=f3(Y3,X),n=r3(P,f,j),j2=q[s3],X2=q[n3];for(let F=0;F<3;F++){let p3=X.rayleighScattering[F]*W,g3=(p3*j2+b*X2)*L[F]*n+(p3+b)*B[F],T3=Math.exp(-x[F]*z);J[F]+=K[F]*(g3-g3*T3)/x[F],K[F]*=T3}})"]},function(){return[()=>"(function(J,Q=B3,$=D2){let j=y2(J),X=Math.max(-1,Math.min(1,J.sunDirection[1]));$3[0]=Math.sqrt(Math.max(1-X*X,0)),$3[1]=X,$3[2]=0,H2(o3,Y+c,X,j);let B=Math.max(-1,Math.min(1,Q)),V=Math.sqrt(Math.max(1-B*B,0));q[M]=0,q[M+1]=0,q[M+2]=0;for(let z=0;z<$;z++){let k=(z+0.5)/$*2*Math.PI;q3[0]=V*Math.cos(k),q3[1]=B,q3[2]=V*Math.sin(k);let x=A2(Z2,q3,$3,j,o3,J.openSky>0.5);for(let W=0;W<3;W++)q[M+W]+=x[W]/$}return[q[M]*J.sunIlluminance[0],q[M+1]*J.sunIlluminance[1],q[M+2]*J.sunIlluminance[2]]})",()=>'(function(J){return J.thickness!==0||J.thicknessNode!==null||u(J,"thicknessMap")!==null||J.attenuationDistanceNode!==null||J.attenuationColorNode!==null||Number.isFinite(J.attenuationDistance)&&J.attenuationDistance!==0})',()=>"(function(J){if(!U(J))return 0;let Q=0;if(E1(J))Q|=1;if(e3(J))Q|=2;if(Z3(J))Q|=4;if(J.anisotropy>0||J.anisotropyNode!==null)Q|=8;if(G3(J))Q|=16;if(J.thicknessColorNode!==null)Q|=32;if(w3(J)){if(A1(J))Q|=64;if(J.dispersion>0||J.dispersionNode!==null)Q|=192}if(D3(J)&&J.clearcoatNormalNode!==null)Q|=256;return Q})",()=>'(function(){let J=[O,...s],Q=s.length,$=J.slice(1,Q).map((X)=>`select(0u, 1u, unit.y > ${C(X)})`),j=`vec2<f32>(${C(J[0])}, ${C(J[1])})`;for(let X=1;X<Q;X+=1)j=`select(${j}, vec2<f32>(${C(J[X])}, ${C(J[X+1])}), band == ${X}u)`;return`  let band = ${$.join(" + ")};\n  let lo = shade_fogRing(select(0u, ${o-v}u + band * ${v}u, band > 0u), x);\n  let hi = shade_fogRing(${o}u + band * ${v}u, x);\n  let span = ${j};\n  return mix(lo, hi, clamp((unit.y - span.x) / (span.y - span.x), 0.0, 1.0));`})']}],$c0XU=[0,9];function $c0C(n){return($c0F||($c0F=new Array(13)))[n]||$c0A(n)}function $c0XE(n){var S=$c0XU,l=0,r=S.length-1,m;while(l<r){m=l+r+1>>1;if(S[m]<=n)l=m;else r=m-1}return $c0E($c0XN($c0T[l]()[n-S[l]](),(n+2798908274114560)))}function $c0A(n){var g=$c0XE(n);(globalThis.__spawnColdEvaled||(globalThis.__spawnColdEvaled=[0,0]))[0]++;$c0F[n]=g;if($c0N[n]!==1){$c0N[n]=1;(globalThis.__spawnColdCalled||(globalThis.__spawnColdCalled=[])).push((n+2798908274114560))}return g}var $c0S,$c0D=()=>eval($c0S);function $c0E(s){$c0S=s;return $c0D()}function $c0XN(s,k){return globalThis.__spawnColdNamed?s+"\n//# sourceURL=spawn-cold/"+k:s}function $c0I(n){var g=$c0XE(n);($c0F||($c0F=new Array(13)))[n]=0;return g()}
var __sc=/*@__PURE__*/(()=>globalThis.__spawnEngineConsole??=Object.create(console))();
var d3=new Float64Array(1),Y=6360,R=6460,c=0.2,O3=100;function B2(J){return Math.max(c,Math.round(J/O3)*O3/1000)}var I=0.01,z2=[0.005802,0.013558,0.0331],R3=8,W2=0.003996,k2=0.000444,b3=1.2,C2=Math.sqrt(Math.PI*Y/(2*b3)),b2=0.8,v2=0.95,x2=0.15,F2=[0.00065,0.001881,0.000085],c3=25,I3=15,Y2=256,f2=64,t=40,P2=32,L2=64,K2=20;function S3(J,Q,$){return y(d3,0,J,Q,$),d3[0]}function y(J,Q,$,j,X){let B=$[0]*j[0]+$[1]*j[1]+$[2]*j[2],V=$[0]*$[0]+$[1]*$[1]+$[2]*$[2]-X*X,z=B*B-V,k=Math.sqrt(Math.max(z,0)),x=-B-k,W=-B+k;if(z<0||W<0)J[Q]=-1;else if(x<0)J[Q]=W;else J[Q]=x}function S(J){return Math.exp(-J/R3)}function h(J){return Math.exp(-J/b3)}function h3(J){return Math.min(Math.max(1-Math.abs(J-c3)/I3,0),1)}function v3(a,b,c,d){return (v3=$c0C(0)).call(this,a,b,c,d)}function _3(J){return 3/(16*Math.PI)*(1+J*J)}function u3(J,Q){let $=Q*Q,j=(1-$)*(1+J*J),X=(2+$)*Math.pow(1+$-2*Q*J,1.5);return 3/(8*Math.PI)*j/Math.max(X,0.00001)}var B3=0.0175,m3=32,X3=16,l3=12,i=Math.round(Math.sqrt(X3)),D2=8,x3=[0,Y+c,0],a=[0,0,0],e=[0,0,0],G2=[0,0,0],J3=[0,0,0],P=[0,0,0],f=[0,0,0],Q3=[0,0,0],E=[0,0,0],Y3=[0,0,0],N=[0,0,0],K=[0,0,0],A=[0,0,0],_=[0,0,0],$3=[0,0,0],q3=[0,0,0],Z2=[0,0,0],o3=[0,0,0],w2=[0,0,0],U2=[0,0,0],j3=new Float64Array(3),q=new Float64Array(18),p=0,G=1,z3=2,w=3,W3=4,g=5,Z=6,V3=9,F3=12,k3=15,s3=16,n3=17,M=V3,H;function y2(a){return (y2=$c0C(2)).call(this,a)}function M2(a,b,c,d){return (M2=$c0C(3)).call(this,a,b,c,d)}function f3(J,Q){let $=q[W3],j=Math.sqrt(Math.max(1-$*$,0));return a[0]=0,a[1]=q[w],a[2]=0,e[0]=j,e[1]=$,e[2]=0,M2(J,a,e,Q)}function r3(J,Q,$){return J3[0]=J[0]+Q[0]*I,J3[1]=J[1]+Q[1]*I,J3[2]=J[2]+Q[2]*I,S3(J3,$,Y)<0?1:0}function P3(J,Q){let $=q[z3];P[0]=J[0]+Q[0]*$,P[1]=J[1]+Q[1]*$,P[2]=J[2]+Q[2]*$,r(P,0,1,q,w)}function L3(){let J=q[w];f[0]=P[0]/J,f[1]=P[1]/J,f[2]=P[2]/J}function t3(J){v3(Q3,q,p,J);for(let Q=0;Q<3;Q++)Q3[Q]=Math.max(Q3[Q],0.000001);return Q3}function H2(a,b,c,d){return (H2=$c0C(4)).call(this,a,b,c,d)}function N2(a,b,c,d){return (N2=$c0C(5)).call(this,a,b,c,d)}function E2(a,b,c,d){return (E2=$c0C(6)).call(this,a,b,c,d)}function A2(a,b,c,d,e,f){return (A2=$c0C(7)).call(this,a,b,c,d,e,f)}function p2(a,b,c,d,e,f,g){return (p2=$c0C(8)).call(this,a,b,c,d,e,f,g)}function g2(a){return $c0C(9).apply(this,arguments)}var T2="rgba16float";var d2=(J)=>J<0.1,O2=`
fn sky_equirectUv(direction: vec3<f32>) -> vec2<f32> {
  return vec2<f32>(atan2(direction.z, direction.x) * ${1/(2*Math.PI)} + 0.5, 0.5 - asin(clamp(direction.y, -1.0, 1.0)) * ${1/Math.PI});
}
`,R2=4,c2=1,I2=6,S2=7,h2=8,_2=9,u2=0,m2=1,l2=2,o2=3,s2=4,n2=`struct SkyBackground {
  horizonColor: vec3<f32>,
  kind: f32,
  zenithColor: vec3<f32>,
  screenWeight: f32,
  clearColor: vec3<f32>,
  equirectYaw: f32,
  equirectWidth: f32,
  equirectBlurLane: f32,
  equirectBlurMip: f32,
  physicalBlend: f32,
  gradientCurve: f32,
  fogSky: f32,
  flatShare: f32,
  flatCapture: f32,
  groundColor: vec3<f32>,
  groundShare: f32,
  equirectBlurLevels: f32,
  openSky: f32,
  starsWhole: f32,
  flatCloud: vec4<f32>,
}`,C3=0.05,r2=2,t2=[0.00318,0.00446,0.0068],i2=[0.00738,0.00919,0.01615],a2=1,e2=0,J1=5,Q1=20,$1=21,q1=22,j1=1,X1=0,V1=2;var B1="lightingClusterLights";var z1="lume_sampleFeedback",W1=1,k1=2;var C1=63,b1=3,v1=1,x1=2;function F1(J,Q,$){return K3(J)<<16|K3(Q)<<8|K3($)}var K3=(J)=>Math.round(Math.min(1,Math.max(0,J||0))*255),Y1=`@group(1) @binding(63) var lume_seeThroughLit: texture_2d_array<f32>;
fn lume_seeThroughLight(at: vec4f, albedo: vec3f) -> vec3f {
let p = vec2i(at.xy);
let o = textureLoad(lume_seeThroughLit, p, 0, 0).rgb;
if (textureNumLayers(lume_seeThroughLit) < 3u) { return o; }
let n = textureLoad(lume_seeThroughLit, p, 1, 0);
return select(max(o + (saturate(albedo) - n.rgb) * (textureLoad(lume_seeThroughLit, p, 2, 0).rgb - o) / (1.0 - step(vec3f(0.5), n.rgb) - n.rgb), vec3f(0.0)), o, n.a == 0.0);
}
fn lume_surfaceGlowless(out: LumeSurfaceOut) -> LumeSurfaceOut {
  var held = out;
  held.emissive = select(0u, held.emissive, ((held.emissive >> 6u) & 31u) == 31u);
  return held;
}
fn lume_seeThroughGlow(emissive: vec3<f32>, viewZ: f32, toward: vec3<f32>) -> vec3<f32> {
  if (all(emissive <= vec3<f32>(0.0))) {
    return vec3<f32>(0.0);
  }
  let glow = max(emissive, vec3<f32>(0.0)) * exp(-passLights.aerialExtinction * max(viewZ, 0.0)) * (1.0 - shade_depthFactor(viewZ, toward));
  return shade_air(glow, toward) - shade_air(vec3<f32>(0.0), toward);
}`;var f1=1,P1=2,L1=4,K1=8,D1=16,G1=32,Z1=64,w1=128,U1=256,y1=62,U=(J)=>J.shadingModel==="physical",D3=(J)=>U(J)&&(J.clearcoat>0||J.clearcoatNode!==null),G3=(J)=>U(J)&&(J.sheen>0||J.sheenNode!==null),Z3=(J)=>U(J)&&(J.iridescence>0||J.iridescenceNode!==null);function w3(J){return U(J)&&(J.transmission>0||J.transmissionNode!==null)}var i3={aoMap:(J)=>J.shadingModel!=="matcap"&&J.aoNode===null,lightMap:(J)=>J.shadingModel!=="matcap",clearcoatMap:(J)=>D3(J)&&J.clearcoatNode===null,clearcoatRoughnessMap:(J)=>D3(J)&&J.clearcoatRoughnessNode===null,sheenColorMap:(J)=>G3(J)&&J.sheenNode===null,sheenRoughnessMap:(J)=>G3(J)&&J.sheenRoughnessNode===null,iridescenceMap:(J)=>Z3(J)&&J.iridescenceNode===null,iridescenceThicknessMap:(J)=>Z3(J)&&J.iridescenceThicknessNode===null,specularIntensityMap:(J)=>U(J)&&J.specularIntensityNode===null,specularColorMap:(J)=>U(J)&&J.specularColorNode===null,transmissionMap:(J)=>U(J)&&J.transmission>0&&J.transmissionNode===null,thicknessMap:(J)=>w3(J)&&J.thicknessNode===null,anisotropyMap:(J)=>U(J)&&J.anisotropy>0&&J.anisotropyNode===null};function u(J,Q){let $=J._maps?.[Q]??null;return $!==null&&i3[Q](J)?$:null}var M1=(J)=>Object.hasOwn(i3,J);function H1(J){let Q=new Set;if(J._maps===null)return Q;for(let $ of Object.keys(J._maps)){let j=M1($)?u(J,$):null;if(j!==null)Q.add(j)}return Q}var a3=(J)=>Math.fround(((J-1)/(J+1))**2),N1=a3(1.5),e3=(J)=>J.specularIntensity!==1||J.specularIntensityNode!==null||u(J,"specularIntensityMap")!==null;function E1(J){return a3(J.ior)!==N1||J.iorNode!==null||!(J.specularColor[0]===1&&J.specularColor[1]===1&&J.specularColor[2]===1)||J.specularColorNode!==null||u(J,"specularColorMap")!==null||e3(J)}function A1(a){return (A1=$c0C(10)).call(this,a)}function p1(a){return $c0C(11).call(this,a)}var y3=2048,g1=4,m=[],U3=[];function M3(J){for(let $=0;$<m.length;$+=1)if(m[$]===J)return U3[$];let Q=`#${J.length}:${J2(J)}`;if(m.length>=g1)m.shift(),U3.shift();return m.push(J),U3.push(Q),Q}function T1(J){return J.length<y3?J:M3(J)}function d1(J,Q,$){if($.length<y3)return $;let j=J.indexOf(Q),X=j>=0?J[j+1]:void 0;return X?.startsWith(`#${$.length}:`)===!0?X:M3($)}var v=32,Q2=16,N3=v,l=N3+1,o=l+1,s=[0.08,0.2,0.4,0.7,1],$2=s.length,O1=1+$2,q2=o+$2*v,O=B3,E3=Math.ceil(q2*16/256)*256,T=E3/16,D=16,d=8,A3=D*d*16,R1=A3*4,c1=E3+A3;function I1(J){return`@group(${J}) @binding(${Q2}) var<uniform> fogHorizon: array<vec4<f32>, ${T+D*d}>;`}var S1=`fn sky_domeMirror(d: vec3<f32>) -> vec4<f32> {
  let phi = select(atan2(d.z, d.x), 0.0, abs(d.x) + abs(d.z) < 1e-6);
  let u = fract(phi * ${(1/(2*Math.PI)).toFixed(9)} + 1.0) * ${D}.0 - 0.5;
  let fu = u - floor(u);
  let c0 = u32(i32(floor(u)) + ${D}) % ${D}u;
  let c1 = (c0 + 1u) % ${D}u;
  let v = clamp((d.y * 0.5 + 0.5) * ${d}.0 - 0.5, 0.0, ${d-1}.0);
  let r0 = u32(floor(v));
  let r1 = min(r0 + 1u, ${d-1}u);
  let fv = v - floor(v);
  let a = mix(fogHorizon[${T}u + r0 * ${D}u + c0], fogHorizon[${T}u + r0 * ${D}u + c1], fu);
  let b = mix(fogHorizon[${T}u + r1 * ${D}u + c0], fogHorizon[${T}u + r1 * ${D}u + c1], fu);
  return mix(a, b, fv);
}`,H3=0.6,h1=0.6;var _1=Math.sqrt(1-O*O);function u1(){return (u1=$c0C(12)).call(this)}var m1=`fn shade_fogFarPlane() -> f32 {
  return select(3.4e38, frame.proj[3][2] / frame.proj[2][2], frame.proj[2][2] > 0.0);
}

fn shade_skyFogFactor(direction: vec3<f32>, fogSky: f32, openSky: f32) -> f32 {
  let reach = select(1.7320508 / max(passLights.fogDensity, 1e-6), passLights.fogFar, passLights.fogMode == 1.0);
  var layer = reach * ${C3};
  if (passLights.fogHeight.y > 0.0) { layer = shade_fogHeightColumn(); }
  let end = select(3.4e38, shade_fogFarPlane(), passLights.fogMode == 2.0 && passLights.fogHeight.y <= 0.0);
  let open = select(direction.y, abs(direction.y), openSky > 0.0);
  let rise = select(open, direction.y, passLights.fogHeight.y > 0.0);
  let path = select(layer / 1e-4, min(layer / max(rise, 1e-4), end), rise > 0.0);
  let authored = shade_authoredFogFactor(path) * fogSky;
  if (passLights.viewFogAmount <= 0.0) { return authored; }
  let viewPath = passLights.viewFogFar * ${C3} / max(open, 1e-4);
  let view = smoothstep(passLights.viewFogNear, max(passLights.viewFogFar, passLights.viewFogNear + 1e-4), viewPath);
  return max(authored, view * passLights.viewFogAmount);
}

fn shade_fogRing(base: u32, x: f32) -> vec3<f32> {
  let u = fract(x * ${C(1/v)} + 1.0) * ${v}.0;
  let i0 = u32(floor(u)) % ${v}u;
  let i1 = (i0 + 1u) % ${v}u;
  return mix(fogHorizon[base + i0].rgb, fogHorizon[base + i1].rgb, fract(u));
}

fn shade_fogSky(unit: vec3<f32>, turn: f32) -> vec3<f32> {
  var x = turn * ${C(v/(2*Math.PI))};
  if (fogHorizon[${l}u].w > 0.0) {
    x = sign(turn) * sqrt(abs(turn) * ${C(1/Math.PI)}) * ${C(v/2)};
  }
${u1()}
}

fn shade_fogColor(toward: vec3<f32>) -> vec3<f32> {
  let unit = toward * inverseSqrt(max(dot(toward, toward), 1e-24));
  let turn = shade_fogTurn(unit);
  let lean = shade_fogLean(unit, turn);
  let under = unit.y <= ${C(O)};
  if (under && fogHorizon[${T}u].w < 1.5) { return lean; }
  let share = max(shade_skyFogFactor(unit, fogHorizon[${o}u].w, select(0.0, 1.0, under)), 1.0 - smoothstep(${C(O)}, ${C(s[0])}, select(unit.y, -unit.y, under)));
  if (share >= 1.0) { return lean; }
  var far: vec3<f32>;
  if (under) { far = sky_domeMirror(unit).rgb; } else { far = shade_fogSky(unit, turn); }
  return mix(far, lean, share);
}`,l1=`fn shade_fogStep(x: f32) -> vec4<f32> {
  let u = fract(x * ${C(1/v)} + 1.0) * ${v}.0;
  let i0 = u32(floor(u)) % ${v}u;
  let i1 = (i0 + 1u) % ${v}u;
  return mix(fogHorizon[i0], fogHorizon[i1], fract(u));
}
fn shade_fogTurn(unit: vec3<f32>) -> f32 {
  let sun = fogHorizon[${l}u];
  let origin = select(vec2<f32>(1.0, 0.0), sun.xz, sun.w > 0.0 && dot(sun.xz, sun.xz) >= 1e-12);
  return select(atan2(origin.x * unit.z - origin.y * unit.x, dot(origin, unit.xz)), 0.0, dot(unit.xz, unit.xz) < 1e-12);
}
fn shade_fogLean(unit: vec3<f32>, turn: f32) -> vec3<f32> {
  let level = dot(unit.xz, unit.xz);
  let sun = fogHorizon[${l}u];
  var around: vec4<f32>;
  if (sun.w <= 0.0) {
    around = shade_fogStep(turn * ${C(v/(2*Math.PI))});
  } else {
    let offset = acos(clamp((dot(unit, sun.xyz) - sun.y * ${C(O)}) / max(length(sun.xz) * ${C(_1)}, 1e-6), -1.0, 1.0));
    let x = sqrt(offset * ${C(1/Math.PI)}) * ${C(v/2)};
    around = mix(shade_fogStep(-x), shade_fogStep(x), clamp(0.5 + 0.5 * turn / max(offset, 1e-6), 0.0, 1.0));
  }
  let step = mix(fogHorizon[${N3}u], around, level);
  if (step.w <= 0.0) { return step.rgb; }
  let lobe = ${C((1-H3)**2)} / (${C(1+H3**2)} - ${C(2*H3)} * dot(unit, passLights.sunDirection));
  return step.rgb * (1.0 + ${C(h1)} * step.w * min(dot(passLights.sunColor, vec3<f32>(0.2126, 0.7152, 0.0722)), 1.0) * lobe * sqrt(lobe));
}
${S1}
${m1}`;var o1=4,s1={sunDirection:"vec3<f32>",sunIntensity:"f32",sunColor:"vec3<f32>",cascadeCount:"u32",ambientColor:"vec3<f32>",globalLightCount:"u32",fogMode:"f32",fogNear:"f32",fogFar:"f32",fogDensity:"f32",shadowsEnabled:"f32",viewFogNear:"f32",viewFogFar:"f32",viewFogAmount:"f32",ambientMean:"vec3<f32>",clusteredLightCount:"u32",hemiSky:"vec3<f32>",hemiGround:"vec3<f32>",sunShadowFar:"f32",sh:"array<vec4<f32>, 9>",clusterParams:"vec4<f32>",clusterDepth:"vec4<f32>",cascadeMatrices:"array<mat4x4<f32>, 4>",cascadeSplits:"vec4<f32>",cascadeBias:"vec4<f32>",cascadeNormalBias:"vec4<f32>",cascadeRadius:"vec4<f32>",iblParams:"vec4<f32>",flatArtAmbient:"vec3<f32>",aerialExtinction:"vec3<f32>",aerialShade:"f32",aerialInscatter:"vec3<f32>",groundWet:"f32",cloudShadowA:"vec4<f32>",cloudShadowB:"vec4<f32>",cloudShadowC:"vec4<f32>",cloudShadowT0:"vec4<f32>",sunFilter:"vec4<u32>",sunKernel:"vec4<f32>",sunSelect:"vec4<f32>",cascadeTexelWorld:"vec4<f32>",cascadeDepthRange:"vec4<f32>",viewFogCenter:"vec4<f32>",viewFogExtent:"vec4<f32>",fogHeight:"vec4<f32>",cloudSeaSun:"vec4<f32>",cloudSeaColor:"vec4<f32>",cloudSeaSunDirection:"vec4<f32>",waterOverPlane:"vec4<f32>",waterOverRect:"vec4<f32>",waterOverExtinction:"vec4<f32>",cloudSeaMap:"vec4<f32>"};;
Object.assign($Ss,{$LJ:z1,$QG:w3,$jj:Z1,AJl:v2,AOz:g2,AgY:P2,AjA:Y1,Bfu:e2,Cos:X1,CyC:z2,D2i:d1,DOx:n2,DUQ:W2,EAe:L2,EHW:o1,ELS:B2,EUk:h3,EiT:l2,Eum:v,Eyl:O2,FZC:b3,Fyx:m2,GRy:S,GWt:D1,Gey:h2,H10:R3,JO4:k1,JYj:H1,Je0:b1,KwFm:W1,LDX:k2,M1h:y3,Mmh:I3,NlZ:C3,PiO:o2,Q1T:c,Rzg:L1,S6x:s1,SUw:c1,T$O:y1,U2Z:i2,UUu:F2,UXI:a2,UbN:N3,V7x:Q2,Wbe:I1,Z8o:Y2,Zd_:f2,_Cn:T2,_Te:d2,_pI:q1,b4b:t2,b_B:C1,bjL:l,bwX:Q1,c6n:R,d9jE:G1,dU6:T1,e6v:K1,e9r:h,eHO:t,fnP:E3,fvQ:q2,gYW:U1,h3u:B1,hAX:C2,hmQ:x1,jTp:d,jgE:c3,ka6:w1,l39:o,lWq:R2,lYK:R1,mnL:I2,nRI:Y,nxg:V1,oSO:$1,oem:l1,q4K:_2,qD5:r2,qbi:A3,qt_:s,rnE:K2,rww:J1,sRK:I,sfP:x2,t$e:v1,tSz:s2,tjA:j1,vKb:B3,vYU:f1,w$F:M3,wJb:F1,wQQ:b2,wXi:u2,wmy:P1,xV2:S2,y2I:c2,yi7:D,z$j:O1,zBa:u,zLh:p1});

;import{L as $Sl,S as $Ss}from"./8470e5fcd747a5a5.mjs";export{$1 as oSO,A3 as qbi,B1 as h3u,B2 as ELS,B3 as vKb,C1 as b_B,C2 as hAX,C3 as NlZ,D as yi7,D1 as GWt,E3 as fnP,F1 as wJb,F2 as UUu,G1 as d9jE,H1 as JYj,I as sRK,I1 as Wbe,I2 as mnL,I3 as Mmh,J1 as rww,K1 as e6v,K2 as rnE,L1 as Rzg,L2 as EAe,M3 as w$F,N3 as UbN,O1 as z$j,O2 as Eyl,P1 as wmy,P2 as AgY,Q1 as bwX,Q2 as V7x,R as c6n,R1 as lYK,R2 as lWq,R3 as H10,S as GRy,S2 as xV2,T1 as dU6,T2 as _Cn,U1 as gYW,V1 as nxg,W1 as KwFm,W2 as DUQ,X1 as Cos,Y as nRI,Y1 as AjA,Y2 as Z8o,Z1 as $jj,_2 as q4K,a2 as UXI,b1 as Je0,b2 as wQQ,b3 as FZC,c as Q1T,c1 as SUw,c2 as y2I,c3 as jgE,d as jTp,d1 as D2i,d2 as _Te,e2 as Bfu,f1 as vYU,f2 as Zd_,g2 as AOz,h as e9r,h2 as Gey,h3 as EUk,i2 as U2Z,j1 as tjA,k1 as JO4,k2 as LDX,l as bjL,l1 as oem,l2 as EiT,m2 as Fyx,n2 as DOx,o as l39,o1 as EHW,o2 as PiO,p1 as zLh,q1 as _pI,q2 as fvQ,r2 as qD5,s as qt_,s1 as S6x,s2 as tSz,t as eHO,t2 as b4b,u as zBa,u2 as wXi,v as Eum,v1 as t$e,v2 as AJl,w1 as ka6,w3 as $QG,x1 as hmQ,x2 as sfP,y1 as T$O,y3 as M1h,z1 as $LJ,z2 as CyC};
