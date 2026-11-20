import{C as $c0K}from"./52e971dc2a986655.mjs";var $c0C,$c0T=[function(){return[()=>"(function(q,H,x){for(let z=0;z<16;z++)q[z]=H[z];q[16]=x.camera.position[0],q[17]=x.camera.position[1],q[18]=x.camera.position[2],q[19]=Z()/1000,q[20]=x.renderOrigin?.[0]??0,q[21]=x.renderOrigin?.[1]??0,q[22]=x.renderOrigin?.[2]??0,q[23]=1})",()=>"(function(q){return`@group(${q}) @binding(${$}) var coverFloor: texture_2d<f32>;\n\nfn cover_underGround(position: vec4<f32>) -> bool {\n  return position.z < textureLoad(coverFloor, vec2<i32>(position.xy) / ${C}, 0).x;\n}`})"]}],$c0XU=[0];var $c0S,$c0D=()=>eval($c0S);function $c0E(s){$c0S=s;return $c0D()}$c0C=$c0K($c0T,$c0XU,$c0E,2,328052297957376);(globalThis.__spawnColdCross||(globalThis.__spawnColdCross=[])).push([$c0C.w,[1]]);
;const{MN3:X,UcB:Z,_rr:Q,wRZ:M}=$Lr;
var C=4,$=15,D=[M(0,1,"uniform"),Q($,2,"unfilterable-float")],T=96;function U(a,b,c){return (U=$c0C(0)).call(this,a,b,c)}function W(a){return (W=$c0C(1)).call(this,a)}var V=function(q,H,x,z,J){let F=z.viewSlot??0,K=z.bindGroupLayouts.slice();K[F]=H.getBindGroupLayout(D,"lume cover view");let A=X(q).coverFragmentModules;let B=z.fragmentEntry!==void 0&&x.fragment!==void 0?{...x.fragment,entryPoint:z.fragmentEntry,targets:[]}:{module:A[F]??=q.createShaderModule({label:`lume cover fragment ${F}`,code:(`${W(F)}

@fragment
fn fs_cover(@builtin(position) position: vec4<f32>) {
  if (cover_underGround(position)) {
    discard;
  }
}`)}),entryPoint:"fs_cover",targets:[]};return{...x,label:J,layout:q.createPipelineLayout({label:J,bindGroupLayouts:K}),fragment:B,primitive:{...x.primitive,cullMode:"none"}}};
;

;import{R as $Lr}from"./52e971dc2a986655.mjs";export{$ as Bvg,C as UPX,D as BXh,T as sXe,U as ONM,V as BHX,W as Nmt};
