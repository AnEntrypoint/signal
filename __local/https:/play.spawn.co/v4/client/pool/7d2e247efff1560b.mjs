;const{BuM:D,IVI:X,JaS:R,a0v:Z,fHq:_,ge4:H,nqf:$,rFh:Y,sfu:q,tJv:J}=$Lr;
;function U(j,z){return D("vec3f")`(${F(j,`${z}(P) takes a world-position node (vec3): e.g. positionWorld in a material, or ctx.worldPosition(uv) / a marched point in a look`)} - frame.renderOrigin)`}function F(j,z){if(!(j instanceof X))throw TypeError(`${z}. Got ${typeof j}.`);return Z(j,"vec3f")}function x(j){return j===void 0?_(0,0,0):F(j,"ctx.skyVisibility(P, N) takes N as a vec3 node or none")}function m(j){return D("vec3f")`(${j} + frame.renderOrigin)`}function Q(j){if(j===void 0)return 1;if(typeof j!=="object"||j===null||j instanceof X)a(j);return c(j);}function V(j,z){if(j instanceof X)return Z(j,"i32");if(typeof j==="number")return $(j,"i32");throw TypeError(`${z}(P, i) takes a light index \u2014 the Loop counter or a number. Got ${typeof j}.`)}var T=`fn lighting_windDirection() -> vec2<f32> {
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
}`;function G(){let j=R(),z=Y(T),K=Y(W);return{sunDirection:q(j,"lighting_envSunDirection",[],"vec3f"),sunRadiance:q(j,"lighting_envSunRadiance",[],"vec3f"),ambientRadiance:q(j,"lighting_envAmbientRadiance",[],"vec3f"),windDirection:q(z,"lighting_windDirection",[],"vec2f"),windSpeed:q(z,"lighting_windSpeed",[],"f32"),windTravel:q(z,"lighting_windTravel",[],"vec2f"),wet:q(K,"lighting_wet",[],"f32"),rain:q(K,"lighting_rain",[],"f32"),fogColor:(B)=>q(H(),"lighting_fogColor",[F(B,"fogColor(toward) takes a direction node (vec3): the eye \u2192 point vector, e.g. positionWorld.sub(cameraPosition) in a material or ctx.worldPosition(uv).sub(cameraPosition) in a look")],"vec3f"),sunVisibility:(B)=>q(J(),"lighting_pointSunVisibility",[U(B,"sunVisibility")],"f32"),lightsAt:(B,O)=>q(J(),"lighting_pointLightsAt",[U(B,"lightsAt"),$(Q(O),"f32")],"vec3f"),lightCount:(B)=>q(J(),"lighting_pointLightCount",[U(B,"lightCount")],"i32"),lightRadiance:(B,O)=>q(J(),"lighting_pointLightRadiance",[U(B,"lightRadiance"),V(O,"lightRadiance")],"vec3f"),lightPosition:(B,O)=>m(q(J(),"lighting_pointLightPosition",[U(B,"lightPosition"),V(O,"lightPosition")],"vec3f"))}}var A=null;function I(j){return A??=G(),b("builtin/lighting",A,j)}
;

function a(j){throw TypeError(`lightsAt(P, opts) takes an options object like { shadow: false }. Got ${j===null?"null":typeof j}.`);
}
function c(j){for(let K of Object.keys(j))if(K!=="shadow")throw TypeError(`lightsAt(P, opts): unknown option "${K}" \u2014 the one option is shadow: true (the default) folds each light's shadow in, false leaves it out.`);let z=Reflect.get(j,"shadow");if(z===void 0)return 1;if(typeof z!=="boolean")throw TypeError(`lightsAt(P, { shadow }) takes true or false. Got ${typeof z}.`);return z?1:0
}

;import{R as $Lr}from"./52e971dc2a986655.mjs";import{$g6 as b}from"./8bdcb1e2-0cc3170cbd65ce8c.mjs";export{I as hzj,U as UdC,m as PFa,x as lTN};
