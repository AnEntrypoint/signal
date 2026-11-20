var $c0F,$c0N=[],$c0T=[function(){return[()=>'(function(j){if(j===void 0)return 1;if(typeof j!=="object"||j===null||j instanceof Z){{throw TypeError(`lightsAt(P, opts) takes an options object like { shadow: false }. Got ${j===null?"null":typeof j}.`);\n}}{for(let U of Object.keys(j))if(U!=="shadow")throw TypeError(`lightsAt(P, opts): unknown option "${U}" \\u2014 the one option is shadow: true (the default) folds each light\'s shadow in, false leaves it out.`);let B=Reflect.get(j,"shadow");if(B===void 0)return 1;if(typeof B!=="boolean")throw TypeError(`lightsAt(P, { shadow }) takes true or false. Got ${typeof B}.`);return B?1:0\n}})']}],$c0XU=[0];function $c0C(n){return($c0F||($c0F=new Array(1)))[n]||$c0A(n)}function $c0XE(n){var S=$c0XU,l=0,r=S.length-1,m;while(l<r){m=l+r+1>>1;if(S[m]<=n)l=m;else r=m-1}return $c0E($c0XN($c0T[l]()[n-S[l]](),(n+122441679503360)))}function $c0A(n){var g=$c0XE(n);(globalThis.__spawnColdEvaled||(globalThis.__spawnColdEvaled=[0,0]))[0]++;$c0F[n]=g;if($c0N[n]!==1){$c0N[n]=1;(globalThis.__spawnColdCalled||(globalThis.__spawnColdCalled=[])).push((n+122441679503360))}return g}var $c0S,$c0D=()=>eval($c0S);function $c0E(s){$c0S=s;return $c0D()}function $c0XN(s,k){return globalThis.__spawnColdNamed?s+"\n//# sourceURL=spawn-cold/"+k:s}

;;;var A="lightingClusterLights";var k="builtin/lighting point queries (lightsAt, lightCount, lightRadiance, lightPosition, sunVisibility) read the per-pixel light grid \u2014 they work in fragment slots (colorNode, emissiveNode, look passes), not in positionNode or other vertex-stage code. sunDirection, sunRadiance, and ambientRadiance work everywhere.",_="builtin/lighting fogColor(toward) reads the fog's colour table, which only the fragment stage binds \u2014 it works in fragment slots (colorNode, emissiveNode, look passes), not in positionNode or other vertex-stage code.",f=`fn lighting_fogColor(toward: vec3<f32>) -> vec3<f32> {
  return shade_fogColor(toward);
}`,L="lighting_cascadeShadowPrepared(P, vec3<f32>(0.0), vec3<f32>(0.0), vec3<f32>(0.0, 1.0, 0.0), lighting_viewDepth(P), seed)",b=`fn lighting_envSunDirection() -> vec3<f32> {
  return passLights.sunDirection;
}

fn lighting_envSunRadiance() -> vec3<f32> {
  return passLights.sunColor * passLights.sunIntensity;
}

fn lighting_envAmbientRadiance() -> vec3<f32> {
  return passLights.ambientMean;
}`,M=`const LIGHTING_NO_CLUSTER: u32 = 0xffffffffu;
const LIGHTING_NO_LIGHT: u32 = 0xffffffffu;
fn lighting_pointCluster(P: vec3<f32>) -> u32 {
  let clip = frame.viewProj * vec4<f32>(P, 1.0);
  if (clip.w <= 0.0) {
    return LIGHTING_NO_CLUSTER;
  }
  let ndc = clip.xy / clip.w;
  if (any(ndc < vec2<f32>(-1.0)) || any(ndc > vec2<f32>(1.0))) {
    return LIGHTING_NO_CLUSTER;
  }
  return lighting_froxelAt(clamp(ndc * vec2<f32>(0.5, -0.5) + vec2<f32>(0.5), vec2<f32>(0.0), vec2<f32>(1.0)), lighting_viewDepth(P));
}
fn lighting_pointSetEnd() -> u32 {
  return passLights.globalLightCount + select(0u, passLights.clusteredLightCount, ${A});
}
fn lighting_pointReaches(lightIndex: u32, P: vec3<f32>) -> bool {
  let light = sceneLights[lightIndex];
  let toLight = light.positionShine.xyz - P;
  let cutoff = light.penumbraCullShadow.y;
  let distanceSq = dot(toLight, toLight);
  if (distanceSq >= cutoff * cutoff) {
    return false;
  }
  if (light.directionCone.w < -3.5) {
    return dot(toLight, light.directionCone.xyz) < 0.0;
  }
  return light.directionCone.w < -1.5 || dot(-toLight / max(sqrt(distanceSq), 1e-5), light.directionCone.xyz) > light.directionCone.w;
}
fn lighting_pointLightRecord(P: vec3<f32>, i: i32) -> u32 {
  if (i < 0) {
    return LIGHTING_NO_LIGHT;
  }
  let c = lighting_pointCluster(P);
  if (c != LIGHTING_NO_CLUSTER) {
    if (u32(i) >= lighting_clusterListCount(c)) {
      return LIGHTING_NO_LIGHT;
    }
    return clusterIndices[lighting_clusterListBase(c) + u32(i)];
  }
  var left = u32(i);
  let end = lighting_pointSetEnd();
  for (var j = passLights.globalLightCount; j < end; j++) {
    if (lighting_pointReaches(j, P)) {
      if (left == 0u) {
        return j;
      }
      left--;
    }
  }
  return LIGHTING_NO_LIGHT;
}
fn lighting_pointLightCount(P: vec3<f32>) -> i32 {
  let c = lighting_pointCluster(P);
  if (c != LIGHTING_NO_CLUSTER) {
    return i32(lighting_clusterListCount(c));
  }
  var count = 0;
  let end = lighting_pointSetEnd();
  for (var j = passLights.globalLightCount; j < end; j++) {
    if (lighting_pointReaches(j, P)) {
      count++;
    }
  }
  return count;
}
fn lighting_pointLightRadiance(P: vec3<f32>, i: i32) -> vec3<f32> {
  let light = lighting_pointLightRecord(P, i);
  if (light == LIGHTING_NO_LIGHT) {
    return vec3<f32>(0.0);
  }
  return lighting_sampleClusteredLight(light, P, vec3<f32>(0.0), vec3<f32>(0.0), 1.0, 1.0, -2.0).radiance;
}
fn lighting_pointLightPosition(P: vec3<f32>, i: i32) -> vec3<f32> {
  let light = lighting_pointLightRecord(P, i);
  if (light == LIGHTING_NO_LIGHT) {
    return P + vec3<f32>(0.0, 1.0, 0.0);
  }
  return sceneLights[light].positionShine.xyz;
}
fn lighting_pointLightsAt(P: vec3<f32>, receiveShadow: f32) -> vec3<f32> {
  var sum = vec3<f32>(0.0);
  let c = lighting_pointCluster(P);
  let clustered = c != LIGHTING_NO_CLUSTER;
  var listBase = 0u;
  var first = passLights.globalLightCount;
  var end = 0u;
  if (clustered) {
    listBase = lighting_clusterListBase(c);
    first = 0u;
    end = lighting_clusterListCount(c);
  } else {
    end = lighting_pointSetEnd();
  }
  for (var i = first; i < end; i = i + 1u) {
    var lightIndex = i;
    if (clustered) {
      lightIndex = clusterIndices[listBase + i];
    }
    sum = sum + lighting_sampleClusteredLight(lightIndex, P, vec3<f32>(0.0), vec3<f32>(0.0), 1.0, receiveShadow, -2.0).radiance;
  }
  return sum;
}
fn lighting_pointSunVisibility(P: vec3<f32>) -> f32 {
  let clip = frame.viewProj * vec4<f32>(P, 1.0);
  var seed = vec2<f32>(0.0);
  if (clip.w > 0.0) {
    seed = (clip.xy / clip.w * vec2<f32>(0.5, -0.5) + vec2<f32>(0.5)) * frame.viewportSize;
  }
  return ${L};
}`,D=null;var R=null;function O(){return R??=K(M,{fragmentOnly:k}),R}var q=null;function Y(j,B){return V("vec3f")`(${G(j,`${B}(P) takes a world-position node (vec3): e.g. positionWorld in a material, or ctx.worldPosition(uv) / a marched point in a look`)} - frame.renderOrigin)`}function G(j,B){if(!(j instanceof Z))throw TypeError(`${B}. Got ${typeof j}.`);return F(j,"vec3f")}function E(j){return V("vec3f")`(${j} + frame.renderOrigin)`}function N(a){return (N=$c0C(0)).call(this,a)}function S(j,B){if(j instanceof Z)return F(j,"i32");if(typeof j==="number")return $(j,"i32");throw TypeError(`${B}(P, i) takes a light index \u2014 the Loop counter or a number. Got ${typeof j}.`)}var y=`fn lighting_windDirection() -> vec2<f32> {
  let reach = length(frame.wind.xy);
  return select(vec2<f32>(0.0, -1.0), frame.wind.xy / max(reach, 1e-4), reach > 1e-4);
}

fn lighting_windSpeed() -> f32 {
  return max(frame.wind.z, 0.0);
}

fn lighting_windTravel() -> vec2<f32> {
  return frame.windTravel;
}`,P=`fn lighting_wet() -> f32 {
  return clamp(frame.wet, 0.0, 1.0);
}

fn lighting_rain() -> f32 {
  return clamp(frame.rain, 0.0, 1.0);
}`;function x(){let j=(D??=K(b),D);let B=K(y);let U=K(P);return{sunDirection:z(j,"lighting_envSunDirection",[],"vec3f"),sunRadiance:z(j,"lighting_envSunRadiance",[],"vec3f"),ambientRadiance:z(j,"lighting_envAmbientRadiance",[],"vec3f"),windDirection:z(B,"lighting_windDirection",[],"vec2f"),windSpeed:z(B,"lighting_windSpeed",[],"f32"),windTravel:z(B,"lighting_windTravel",[],"vec2f"),wet:z(U,"lighting_wet",[],"f32"),rain:z(U,"lighting_rain",[],"f32"),fogColor:(J)=>z((q??=K(f,{fragmentOnly:_}),q),"lighting_fogColor",[G(J,"fogColor(toward) takes a direction node (vec3): the eye \u2192 point vector, e.g. positionWorld.sub(cameraPosition) in a material or ctx.worldPosition(uv).sub(cameraPosition) in a look")],"vec3f"),sunVisibility:(J)=>z(O(),"lighting_pointSunVisibility",[Y(J,"sunVisibility")],"f32"),lightsAt:(J,X)=>z(O(),"lighting_pointLightsAt",[Y(J,"lightsAt"),$(N(X),"f32")],"vec3f"),lightCount:(J)=>z(O(),"lighting_pointLightCount",[Y(J,"lightCount")],"i32"),lightRadiance:(J,X)=>z(O(),"lighting_pointLightRadiance",[Y(J,"lightRadiance"),S(X,"lightRadiance")],"vec3f"),lightPosition:(J,X)=>E(z(O(),"lighting_pointLightPosition",[Y(J,"lightPosition"),S(X,"lightPosition")],"vec3f"))}}var T=null;var s={records:{},entries:[["builtin/lighting",function(j){{T??=x();return W("builtin/lighting",T,j)}}]]};;




;import{$O8 as K,$g6 as W,L$u as V,aFT as F,hiU as Z,rjS as z,tq7 as $}from"./80ce81ba-083cf25db4698b45.mjs";import"./5f1977e6deccae83.mjs";import"./1dc340d57b62442d.mjs";export{s as LIGHTING_FAMILY};
