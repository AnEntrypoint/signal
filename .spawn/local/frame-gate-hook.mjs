export const FRAME_GATE_CHUNK = '_v4_client_pool_a0fe32d7-32342e395a0c0bd8.mjs';

export function frameGateHookBody() {
  return [
    ';globalThis.__spawnFrameGate=()=>({',
    'cd:CD!==null,firstFrameRendered:CD===null?null:CD.firstFrameRendered,zm:Zm!==null,',
    'ox,CI,rj:RJ,ir:iR,rjq,kn:Kn!==null,eh:Eh!==null,erLen:er.length,eI,',
    'ha6:ha6(),warm:Ky(),a2x:A2x(),',
    'l1:CD===null?null:l1(CD),vnf:CD===null?null:VNf(CD),presSusp:CD===null?null:CD.lume.presentationSuspended,',
    'knDevice:Kn!==null&&CD!==null&&Kn.device===CD.lume.device,',
    'knSize:Kn!==null&&CD!==null&&Kn.width===CD.canvas.width&&Kn.height===CD.canvas.height,',
    'sf:Sf,bj:BJ(),w9:W9,sfGeBj:Sf>=BJ(),sfGeW9:Sf>=W9,je:Je,fq:Fq,gf:Gf,lv:LV,',
    'nbfReason:ox==="canvas"?"road-canvas":CI!=="bare"?"ci-not-bare":!RJ?"rj-false":ha6()?"ha6-held":Ky()?"warm-den":null});',
  ].join('\n');
}
