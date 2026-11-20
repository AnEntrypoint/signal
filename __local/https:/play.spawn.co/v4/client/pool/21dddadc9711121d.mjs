;;;;;;;;;;;;;;;
;;function H(G,_){return j("vec3f")`(${A(G,`${_}(P) takes a world-position node (vec3): e.g. positionWorld in a material, or ctx.worldPosition(uv) / a marched point in a look`)} - frame.renderOrigin)`}function A(G,_){if(!(G instanceof V))throw TypeError(`${_}. Got ${typeof G}.`);return K(G,"vec3f")}function n(G){return G===void 0?q(0,0,0):A(G,"ctx.skyVisibility(P, N) takes N as a vec3 node or none")}function B(G){return j("vec3f")`(${G} + frame.renderOrigin)`}function D(G){if(G===void 0)return 1;if(typeof G!=="object"||G===null||G instanceof V)a(G);return b(G);}function T(G,_){if(G instanceof V)return K(G,"i32");if(typeof G==="number")return $(G,"i32");throw TypeError(`${_}(P, i) takes a light index \u2014 the Loop counter or a number. Got ${typeof G}.`)}var J=`fn lighting_windDirection() -> vec2<f32> {
  let reach = length(frame.wind.xy);
  return select(vec2<f32>(0.0, -1.0), frame.wind.xy / max(reach, 1e-4), reach > 1e-4);
}

fn lighting_windSpeed() -> f32 {
  return max(frame.wind.z, 0.0);
}

fn lighting_windTravel() -> vec2<f32> {
  return frame.windTravel;
}`,W=`fn lighting_wet() -> f32 {
  return clamp(frame.wet, 0.0, 1.0);
}

fn lighting_rain() -> f32 {
  return clamp(frame.rain, 0.0, 1.0);
}`;function X(){let G=F(),_=Y(J),S=Y(W);return{sunDirection:L(G,"lighting_envSunDirection",[],"vec3f"),sunRadiance:L(G,"lighting_envSunRadiance",[],"vec3f"),ambientRadiance:L(G,"lighting_envAmbientRadiance",[],"vec3f"),windDirection:L(_,"lighting_windDirection",[],"vec2f"),windSpeed:L(_,"lighting_windSpeed",[],"f32"),windTravel:L(_,"lighting_windTravel",[],"vec2f"),wet:L(S,"lighting_wet",[],"f32"),rain:L(S,"lighting_rain",[],"f32"),fogColor:(I)=>L(Q(),"lighting_fogColor",[A(I,"fogColor(toward) takes a direction node (vec3): the eye \u2192 point vector, e.g. positionWorld.sub(cameraPosition) in a material or ctx.worldPosition(uv).sub(cameraPosition) in a look")],"vec3f"),sunVisibility:(I)=>L(O(),"lighting_pointSunVisibility",[H(I,"sunVisibility")],"f32"),lightsAt:(I,U)=>L(O(),"lighting_pointLightsAt",[H(I,"lightsAt"),$(D(U),"f32")],"vec3f"),lightCount:(I)=>L(O(),"lighting_pointLightCount",[H(I,"lightCount")],"i32"),lightRadiance:(I,U)=>L(O(),"lighting_pointLightRadiance",[H(I,"lightRadiance"),T(U,"lightRadiance")],"vec3f"),lightPosition:(I,U)=>B(L(O(),"lighting_pointLightPosition",[H(I,"lightPosition"),T(U,"lightPosition")],"vec3f"))}}var Z=null;function u(G){return Z??=X(),z("builtin/lighting",Z,G)}
;

function a(G){throw TypeError(`lightsAt(P, opts) takes an options object like { shadow: false }. Got ${G===null?"null":typeof G}.`);
}
function b(G){for(let S of Object.keys(G))if(S!=="shadow")throw TypeError(`lightsAt(P, opts): unknown option "${S}" \u2014 the one option is shadow: true (the default) folds each light's shadow in, false leaves it out.`);let _=Reflect.get(G,"shadow");if(_===void 0)return 1;if(typeof _!=="boolean")throw TypeError(`lightsAt(P, { shadow }) takes true or false. Got ${typeof _}.`);return _?1:0
}

;import"./36bad4b5-c35867ec88f49b93.mjs";import"./6013db8f3213cfbc.mjs";import"./26ceb10f-49e18729068cd5df.mjs";import"./4953a97fb1e990b7.mjs";import"./46b1c77c67f7de91.mjs";import"./9959d013-206ed91ad8a1f4fe.mjs";import"./e5b41542678465dc.mjs";import"./f81c9654-bc62d8684fd20379.mjs";import"./59031fb6a4af82a1.mjs";import"./bfa01a2f-723b97e3b6c6dddd.mjs";import"./97a46b49-6989b287046b7cf1.mjs";import"./3cfbfb472a64e141.mjs";import"./2998d8b4-fc0f4b775b52b986.mjs";import"./9b93e26679f0ec35.mjs";import"./13edbdb4-f3014b8bf4f5e3aa.mjs";import{$g6 as z,BuM as j,IVI as V,a0v as K,fHq as q,nqf as $,rFh as Y,sfu as L}from"./75f9d7a9-b9b452ef9ed9d1b4.mjs";import{$NpA as c,$OU as E,MY0 as O,QQU as y,ZG8 as F,ay9 as k,dKP as C,gVd as P,rj9 as x,wtY as Q}from"./13edbdb4-f3014b8bf4f5e3aa.mjs";export{B as PFa,C as d2M,E as pno,H as UdC,O as tJv,P as qP$,Q as ge4,c as q7S,k as Ksq,n as lTN,u as hzj,x as UaV,y as eFU};
