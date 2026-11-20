var ld=((e)=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(e,t)=>(typeof require<"u"?require:e)[t]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')});;;;;;;;;;;;;;var bX="__spawnBuilt",$X=(e)=>uLW(e)&&typeof e.files==="object"&&e.files!==null;function aX(e=globalThis){let t=Reflect.get(e,bX);return $X(t)?t:null}function BX(e,t=globalThis){let r=aX(t)?.doors,i=uLW(r)&&Object.hasOwn(r,e)?Reflect.get(r,e):null;return typeof i==="string"&&/^(?:[\w-]+\/)*[\w-]+\.m?js$/.test(i)?i:null}function uX(e=globalThis){return aX(e)?.edges??null}var N7=new WeakMap;function G7(e){if(N7.delete(e),e.size!==0)e.clear()}function Iqw(e){if(e.size===0)return e;return e instanceof Map?new Map:new Set}function kx(e){if(e.size!==0)G7(e)}var U1=Object.defineProperty,j1=(e)=>e;function Z1(e,t){this[e]=j1.bind(null,t)}var NKp=function(e,t){for(var r in t)U1(e,r,{get:t[r],enumerable:!0,configurable:!0,set:Z1.bind(t,r)})},YLk=((e)=>ld)(function(e){return ld.apply(this,arguments)});;var r5=(()=>globalThis.__spawnEngineConsole??=Object.create(console))(),Qf=3,Rf=/import\(\s*["']((?:\.\/|https?:\/\/)[^"'\s]+\.m?js)["']\s*\)/g,bM=/import\(\s*__tomeRealmCode\(\s*["']([\w.-]+\.m?js)["']\s*\)\s*\)/g;function C6(e){let t=new Set;for(let[,r]of e.matchAll(Rf))if(r!==void 0)t.add(r);for(let[,r]of e.matchAll(bM))if(r!==void 0)t.add(`./${r}`);for(let{key:r}of oK(e)){let e=BX(r);if(e!==null)t.add(`./${e}`)}return[...t]}var a6=/([\w$]+)\(\s*(?:(["'])\.\/[^"'\s/]+\.m?js\2|"\.\/"\+globalThis\.__spawnBuilt\.doors\["\w+"\])\s*\)\s*\.then\(\s*\(\)\s*=>\s*import\(/g;function yf(e){for(let[,t]of e.matchAll(a6))if(t!=="import")return!0;return!1}function HM(){let e=Reflect.get(globalThis,SK);return jK(e,"then")?e:null}function Hb(){let e=-2128831035,t=-1640531527,r=0;return{push(i){for(let r=0;r<i.length;r+=1){let n=i[r];e=Math.imul(e^n,16777619),t=Math.imul(t+n,1540483477),t^=t>>>15}r+=i.length},done:()=>`${r}:${(e>>>0).toString(16)}:${(t>>>0).toString(16)}`}}var DM=function(e){let t=Hb();return t.push(e),t.done()};async function jb(e,t=!1,r,i){let n=e.body;if(n===null||typeof n.getReader!=="function"||typeof TextDecoder!=="function")try{return{ok:!0,text:await e.text()}}catch(e){return{ok:!1,status:null,cause:k$w(e)}}let l=QK(),s=t?Hb():null,o=new TextDecoder,a=n.getReader(),u=0,d=0,f=function(){if(r===void 0)return;let e=l.edges();for(;d<e.length;d+=1)r(e[d])};try{for(;;){let{done:e,value:t}=await a.read();if(e)break;let r=o.decode(t,{stream:!0});i?.(r),u+=t.byteLength,s?.push(t),l.push(r),f()}l.push(o.decode()),f()}catch(e){return{ok:!1,status:null,cause:k$w(e)}}return{ok:!0,edges:l.edges(),bytes:u,...s&&{print:s.done()}}}var c6=(e,t)=>IK(RK.door?.(e)??e,t),qf=async function(e,t){let r=kK.quietWatch(e,t.signal,c6);try{let i=await Of(e,r,t),n="cause"in i?i:await eK(jb(i,t.print===!0,t.onEdge,function(e){r.heard(),t.piece?.(e)}),`edges ${Uf(e)}`);return n.ok||!r.lost?n:{...n,lost:!0}}finally{r.settle()}};async function Of(e,t,r){let i;try{let n={signal:t.signal,priority:r.priority};i=await c6(e,r.reload===!0?DK(n):n)}catch(e){return{ok:!1,status:null,cause:k$w(e)}}t.heard(),r.answered?.();let n=i.headers.get("content-type");if(i.ok&&gK(n))return i;return{ok:!1,status:i.status,cause:i.ok?b(n):`HTTP ${i.status}`,headers:i.headers}}var vf="__tomeRealmCode",d6=function(e){let t=Reflect.get(globalThis,vf);if(typeof t!=="function")return null;return g(t,e);},ef=(e)=>e.startsWith("./")&&d6(e.slice(2))?.startsWith("blob:")===!0,H6=function(){if(/^https?:/.test(import.meta.url))return import.meta.url;return j();},wf=async(e)=>await import(e),w6=qf,zM=OK,lb=YK,p6=H6,hf=wf,PM=WK,Z6=!1;function Mf(e){let t=yK();if(t.keeps!==null||Z6)return;k(e,t);}var Af=new Map,S6=new Map,_6=new Map,$b=new Map,N6=function(e){let t=($b.get(e)??0)+1;return $b.set(e,t),VK(e,t)},Kf=new Map,U6=new Map,Tb=new Map,VM=new Map,W6=new Set,db=[],_f=(e,t)=>e?.map((e)=>new URL(`./${e}`,t).href)??db;async function rb(e,t){for(let r=[...e];r.length;){r=[...new Set((await Promise.all(r.map(t))).flat())].filter((t)=>!e.has(t));for(let t of r)e.add(t)}}var h6=null,Nb=(e)=>e===p6(),lM=null,SM=null,rf=function(e){if(lM?.()!==!0)return!1;if(SM===null){let e=Reflect.get(globalThis,ZK);SM=new Set(Array.isArray(e)?e.filter((e)=>typeof e==="string"):[])}return SM.has(e)},ib=new Map,B6=function(){let e=Reflect.get(globalThis,FK);return e instanceof Map?e:ib},ff=function(e){let t=B6().get(e);return t instanceof Promise?t:void 0},kM=32,Ef=[];function Jf(e,t,r){if(Ef.push({kind:e,name:Uf(t),startMs:r,endMs:JK()}),Ef.length>kM)Ef.shift()}function M6(e,t){if("edges"in t)return t.edges;return q(t,e);}function Lb(e,t){if(NK(e))return;let r=hK(e)?.status??403;throw new lK(e,r,t,`HTTP ${r}`)}var rM=(e)=>e.status===null?null:{status:e.status,headers:e.headers};async function yM(e,t,r,i,n){let l=lb(),s=t,o=0,a=()=>t.signal?.aborted===!0;for(let u=1;;u+=1){if(u>1)r?.();Lb(e,o),i?.(!0);let d=await w6(e,s);if(i?.(!1),a())return null;if(d.ok){if(PK(e,200),Mf(e),Tb.set(e,"edges"in d?d.bytes:d.text.length),t.print===!0)v(e,d);return M6(e,d)}if(d.lost===!0){if(s={...t,reload:!0},n?.(),await zM(lb()),a())return null;continue}if(PK(e,rM(d)),o+=1,d.status!==null&&d.status>=400&&d.status<500||o>=Qf)throw new lK(e,d.status,o,d.cause);if(d.status===null)s={...t,reload:!0};if(await zM(l),a())return null;l*=2}}var zb=function(e,t){let r=new AbortController;t.ask=r,t.asks+=1;let i=()=>!r.signal.aborted&&S6.get(e)===t,n={signal:r.signal,...t.pastTheCache?{reload:!0}:{},priority:t.priority,answered:function(){if(t.ask===r)t.ask=null},onEdge:function(r){if(!i())return;let n=new URL(`./${r}`,e).href;for(let e of t.early)e(n)}};yM(e,n,function(){if(i()&&t.ask===null)t.ask=r},function(e){if(i())t.onWire=e},function(){if(i())t.pastTheCache=!0}).then((t)=>t&&_f(t,e)).then(function(r){if(r===null||!i())return;Af.set(e,r),S6.delete(e),t.resolve(r)},function(r){if(!i())return;S6.delete(e),t.reject(r)})};function lf(e,t,r,i){if(!t&&Nb(e)||rf(e))return Promise.resolve(db);let n=t?void 0:ff(e);if(n===void 0)return x6(e,t,r,i);return n.then((n)=>n?db:x6(e,t,r,i),()=>x6(e,t,r,i))}function x6(e,t,r,i){let n=t?void 0:Af.get(e);if(n!==void 0)return Promise.resolve(n);let l=S6.get(e);if(l===void 0)l={...xQ3(),ask:null,asks:0,onWire:!1,pastTheCache:!1,priority:i,early:[]},S6.set(e,l),zb(e,l);if(r!==void 0)l.early.push(r);return l.promise}function Cf(e){let t=0;for(let[r,i]of S6){let n=i.ask;if(n===null||i.onWire)continue;n.abort(BK(`the read waiting on the road's clock is asked again at once: ${e}`)),zb(r,i),t+=1}if(t>0)r5.info(`[chunk-closure] ${t} chunk ask${t===1?"":"s"} with no answer yet ${t===1?"was":"were"} withdrawn and sent again (${e})`);return t}aK(Cf);async function mf(e,t={}){if(yK().keeps===!1)return;let r=p6(),i=new Set(r===null?e:e.map((e)=>new URL(e,r).href));if(t.pastTheCache===!0){await qb([...i]);return}let n=[],l=function(e){let r=lf(e,t.reread===!0,(e)=>s(e),t.priority);r.catch(function(){return}),n.push(r)},s=function(e){if(i.has(e)||yK().keeps===!1)return;i.add(e),l(e)};for(let e of[...i])l(e);for(let e=0;e<n.length;e+=1){let t=await n[e];for(let e of t)s(e);if(yK().keeps===!1)return}}async function pb(e){let t=Tb.get(e);VM.delete(e),await yM(e,{print:!0}).catch(()=>null);let r=t??Tb.get(e),i=VM.get(e),n=await yM(e,{reload:!0,print:!0}),l=r!==void 0&&Tb.get(e)!==r||i!==void 0&&VM.get(e)!==i;if(l)W6.add(e);let s=_f(n,e);return Af.set(e,s),{changed:l,edges:s}}async function qb(e){let t=[];return await rb(new Set(e),async function(e){if(Nb(e)||rf(e))return db;let r=await(U6.get(e)??pb(e));if(r.changed)t.push(e);return r.edges}),t}var vb=new Set,YM=(e,t)=>`The closure road could not read the chunks behind ${e} in this tab (${t}); the loader fetches the rest itself.`;async function sf(e){if(e.length===0)return;try{await mf(e)}catch(t){if(t instanceof lK)throw t;let r=e[0]??"";if(!vb.has(r))vb.add(r),r5.warn(`[chunk-closure] ${YM(r,k$w(t))}`)}}function X6(e,t=(e)=>Af.get(e)){let r=new Set(e);for(let e of r)for(let i of t(e)??db)r.add(i);return[...r]}var Bb=async function(e){let t="";return await yM(e,{answered:()=>void(t=""),piece:(e)=>void(t+=e)}),t},T6=(e)=>URL.createObjectURL(new Blob([e],{type:"text/javascript"})),eb=Bb,Pb,r6=new Map,WM=new Map,AM="__spawnFreshAddressMetaUrl__";class gM extends Error{constructor(e,t){var $lpt0;super(e),"url"in this?$lpd0(this,"url",void 0):this.url=void 0,"why"in this?$lpd0(this,"why",void 0):this.why=void 0;this.url=e,this.why=t}}async function j6(e){let t;try{t=await _K(()=>hf(e))}catch(t){if(nK(t)||XK(t)||pK(t))return!1;if(W6.size>0&&await J6(e,W6))return!1;throw t}return!(sb(t)&&W6.has(e))}async function BM(e,t,r){let i=t.refused.get(e);if(i!==void 0)return i!==!1;if(Nb(e)||rf(e))return t.refused.set(e,!1),!1;if(t.spelled)return nf(e,t,r);if(t.refused.set(e,"open"),!r&&!await RM(e)&&await j6(e))return t.refused.set(e,!1),!1;for(let r of await Yf(e))await BM(r,t,!1);return t.refused.set(e,!0),!0}async function nf(e,t,r){t.refused.set(e,"open");let i=!1;for(let r of await Yf(e))if(t.refused.get(r)!=="open"&&await BM(r,t,!1))i=!0;let n=r||i||r6.has(e);return t.refused.set(e,n),n}async function Yf(e){let t=uX()?.[Uf(e)];if(t!==void 0)return _f(t,e);return Nb(e)||rf(e)?db:await x6(e,!1)}async function xM(e){let t=new Set([e]);return await rb(t,(e)=>Yf(e)),t}var J6=async(e,t)=>[...await xM(e)].some((e)=>t.has(e));async function df(e,t,r){if(t.refused.get(e)!==!0)return e;let i=r6.get(e);if(i!==void 0)return i;if(r.has(e))throw new gM(e,"cycle");r.add(e);let n=new Map;for(let i of await Yf(e))if(t.refused.get(i)===!0)n.set(i,await df(i,t,r));let l;if(n.size===0)l=N6(e),await yM(l,{});else{let t=await eb(e),r=aM(e,t,(e,t)=>t?void 0:n.get(e));if(r===null)throw new gM(e,"object");l=r}return r.delete(e),t.minted.push(e),r6.set(e,l),l}async function CM(e,t,r){try{return await _K(()=>hf(t))}catch(i){if(XK(i))throw i;if(nK(i))throw new vK(t.startsWith("blob:")?e:t,i.message,r);throw i}}var oM=Promise.resolve(),dxH=()=>void(oM=null);function KM(e,t=!1,r=!1){if(oM===null)return Promise.reject(new vK(e,"no copy",t));let i=oM.then(()=>dM(e,t,r)),n=oM=i.catch(function(){return});return WM.set(n,xM(e).catch(()=>null)),n.then(()=>WM.delete(n)),i}async function dM(e,t,r){let i={refused:new Map,minted:[],spelled:r},n=!1;try{await BM(e,i,!0);let r=await df(e,i,new Set);n=!0;let l=await CM(e,r,t);return r5.info(`[chunk-closure] ${e} stands at fresh addresses (${i.minted.length} copied)`),l}catch(r){if(!n||r instanceof vK||XK(r)||pK(r))for(let e of i.minted)r6.delete(e);if(!(r instanceof gM))throw r;throw r5.warn(`[chunk-closure] ${e} has no fresh address in this realm: ${r.url} (${r.why})`),new vK(e,r.url,t)}}var RM=async(e)=>r6.size>0&&J6(e,r6);function Mb(e,t,r,i){let n=JK(),l=e[0];if(l===void 0||n-t<GK)return;r5.warn(LK(l,{startMs:t,endMs:r},{startMs:r,endMs:n},CK(i??X6(e))))}var If=new Set,bb=function(){if(Pb===void 0)y();return Pb!==null},aM=function(e,t,r){let i=MK(mK(t.replaceAll("import.meta.url",AM),(e)=>BX(e)),function(t,i){let n=new URL(`./${t}`,e).href;return r(n,i)??n});return oM!==null&&bb()?Pb?.(`const ${AM}=${JSON.stringify(e)};${i}`)??null:null},uf=(e)=>S6.size>0&&X6(e).some((e)=>S6.has(e)),Ob=new WeakSet;function Bf(e){if(e.length===0||B6().size===0)return[];let t=[];for(let r of Cb(e)??X6(e)){let e=ff(r);if(e===void 0||Ob.has(e))continue;let i=()=>void Ob.add(e);e.then(i,i),t.push(e)}return t}async function K6(e){try{return{ok:!0,module:await _K(e)}}catch(e){return{ok:!1,error:e}}}async function Df(e,t,r){let i=JK(),n=await K6(t);if(n.ok||!r||!nK(n.error))return{outcome:n,startMs:i,walkedBehind:!1};kx(Af),await sf(e);let l=JK();return{outcome:await K6(t),startMs:l,walkedBehind:!0}}async function Yb(e,t,r=!1){let i;try{i=await KM(t,!1,r)}catch(t){return kx(Af),y6(e,t)}if(Gf(t,i))return Db(e,hb());return h6?.(e),i}function V6(e){if(e.length===0||yK().keeps===!1)return;mf(e).catch(function(){return})}function Cb(e){let t=e.length===0?null:uX();return t===null?null:X6(e.map(zK),(e)=>_f(t[Uf(e)],e))}function ZM(e){return e.map((e)=>`import${JSON.stringify(e)};`).join("")}function EM(e){if(e.length<2)return;hf(`data:text/javascript;charset=utf-8,${encodeURIComponent(ZM(e))}`).catch(function(){return})}function I6(e,t){let r=Cb(e);if(r!==null)EM(r);else if(!t)V6(e);return r}var Nf=new Set,Xb=function(){for(let e of Nf)e()};function Vb(e){let t=JK(),r=(e)=>Nb(e)||rf(e)||(CK([e]).get(xK(e))??[]).some((e)=>e.startMs<t||e.initiator!=="fetch"),i=new Map,n=function(){for(let[e,t]of i){if(!r(e))continue;t.heard(),t.settle(),i.delete(e)}},l=(e,t)=>(n(),c6(e,t));for(let t of e){if(r(t)||r6.has(t))continue;let e=kK.quietWatch(t,void 0,l,{priority:"low",endOnly:!0});i.set(t,e)}return Nf.add(n),function(){Nf.delete(n);for(let e of i.values())e.settle();i.clear()}}async function Jb(e,t,r=!1){uK(void 0,Xb);let i=r?HM():null;if(i!==null)await i;let n=e.find((e)=>hK(e)?.word==="refused");if(n!==void 0)await x6(zK(n),!0);let l=JK(),s=Bf(e);if(s.length>0)await Promise.allSettled(s);let o=e.length===1&&e[0]!==void 0?zK(e[0]):null;if(o!==null&&await RM(o))return Yb(e,o,uX()!==null);let a=e.length>0&&(o===null||!bb()),u=uf(e);if(a||u)await sf(e);let d=I6(e,a||u),f=Uf(e[0]??""),c=o!==null&&d!==null?Vb(d):null,{outcome:h,startMs:p,walkedBehind:m}=await Df(e,t,!a&&o!==null);if(c?.(),h.ok){let t=h.module;if(o!==null){for(let[e,t]of WM){let r=await t;if(r===null||await J6(o,r).catch(()=>!0))await e}if(await RM(o))return Yb(e,o,uX()!==null)}if(Jf("import",e[0]??"",p),o!==null&&!a)If.add(o);if(Mb(e,l,p,d),e.length>0&&sb(t))return Db(e,hb());return h6?.(e),t}{let r=h.error,i=e.length===1?e[0]:void 0;if(XK(r)||!nK(r)||i===void 0)return kx(Af),y6(e,r);return f6(e,t,zK(i),r,m)}}async function f6(e,t,r,i,n){let l=await GM(r,i);if(l!==null)return cb(e,t,l,i.message);let s=(_6.get(r)??0)+1;if(_6.set(r,s),!n&&s===1&&r6.size===0)throw kx(Af),i;return Yb(e,r)}async function GM(e,t){let r=iK(t);if(r===null)return null;let i=xK(r);if(i===xK(e)||!i.startsWith(new URL(".",e).href))return null;return await sf([e]),X6([e]).includes(i)?null:i}async function cb(e,t,r,i){if(r6.has(r))throw new vK(r,i);return await KM(r),Jb(e,t)}async function y6(e,t){if(pK(t))await $M(t,e[0]);return(pK(t)?await import("./13d50bee41e10284.mjs").then((r)=>typeof Reflect.get(r,"stand")==="function"?r.stand(e,t,[r6,KM,aM,eb,$b,VK,zK,h6,bK,$M]):null,()=>null):null)??(XK(t)?Db(e,t):wb(e,t))}function $M(e,t){let r=bK(e,t===void 0?p6():zK(t));if(r===null)return Promise.resolve();let i=U6.get(r.chunk);if(i===void 0)i=pb(r.chunk),U6.set(r.chunk,i);return i.then(function(){return},function(){return})}var sb=(e)=>Array.isArray(e)?e.some(sb):uLW(e)&&Object.keys(e).length===0,m6="The file was cut short",hb=()=>Object.assign(SyntaxError(m6),{stack:`SyntaxError: ${m6}`}),Gf=function(e,t){if(!sb(t))return!1;return r6.delete(e),!0};async function Db(e,t,r){let i=e.map(zK),n=await sM(i),[l]=i;if(l===void 0)throw t;if(i.length>1)throw new vK(l,t.message,!0);let s=l;try{let i=await KM(s,!0);if(Gf(s,i))throw new vK(s,m6,!0);return r5.info(`[chunk-closure] ${s} ${r??(t.message===m6?"ran with no export":"did not parse")} in this realm (${t.message}); its closure was read again past the HTTP cache, and it stands at fresh addresses.`),h6?.(e),i}catch(e){if(e instanceof vK)throw e;if(XK(e))throw new vK(s,e.message,!0);if(n.length>0&&!sK(e)&&!pK(e))throw new vK(s,k$w(e),!0);throw e}}async function sM(e){if(e.length===0)return db;let t=e.join(" "),r=Kf.get(t);if(r!==void 0)return r;let i=await qb(e);return Kf.set(t,i),i}async function wb(e,t){if(e.length===0||sK(t))throw t;if((await sM(e.map(zK))).length===0)throw t;return Db(e,t instanceof Error?t:Error(String(t)),pK(t)?void 0:"threw as it ran")}function nb(e){return e.catch(function(e){if(sK(e)||pK(e))Reflect.defineProperty(e,"retriable",{value:!0,configurable:!0});throw e})}function WjK(e,t){let r=p6(),i=r===null?"":cK(e),n=r===null?[]:C6(i),l=r===null||n.some(ef)?[]:n.map((e)=>new URL(e,r).href);if(t!==void 0)wM.set(t,l);return eK(s6(nb(Jb(l,e,l.length>0&&yf(i)))),Uf(l[0]??n[0]??t??""))}var P6=0,IM=new Set;function s6(e){P6+=1;let t=function(){if(P6-=1,P6>0||IM.size===0)return;z();};return e.then(t,t),e}function Uf(e){return $K(e.split(/[?#]/)[0]??"")}var wM=new Map;;;;var X_=(()=>globalThis.__spawnEngineConsole??=Object.create(console))(),Q_=new Uint8Array(16384);;(function(){for(let e of["->","&&","||","==","!=","<=",">=","++","--","+=","-=","*=","/=","%=","&=","|=","^="])Q_[e.charCodeAt(0)*128+e.charCodeAt(1)]=1;})();var w_=1,i_=2,u_=4,J_=new Uint8Array(128);;(function(){for(let e of` 	
\r\v\f`)J_[e.charCodeAt(0)]=w_;;(function(){})();for(let e=0;e<128;e++){let t=String.fromCharCode(e);if(/[A-Za-z_]/.test(t))J_[e]=i_;if(/[0-9]/.test(t))J_[e]=u_}})();var S_="0[xX][0-9a-fA-F]*\\.?[0-9a-fA-F]*(?:[pP][+-]?[0-9]+)?[fhiu]?|[0-9]*\\.?[0-9]+(?:[eE][+-]?[0-9]+)?[fhiu]?|[0-9]+\\.?(?:[eE][+-]?[0-9]+)?[fhiu]?",D_=new RegExp(`^(?:${S_})`),v_=new RegExp(`(?:${S_})`,"y"),rD3=4096;function RDp(e,t,r){return{binding:e,visibility:t,buffer:{type:r}}}function Zyu(e,t,r){return{binding:e,visibility:t,sampler:{type:r}}}function v6R(e,t,r,i){return{binding:e,visibility:t,texture:i===void 0?{sampleType:r}:{sampleType:r,viewDimension:i}}}var L6="depth16unorm",q6="depth32float",chq=0.00000005960464477539063,u6=0.0001,H0q=u6.toFixed(6),jEz="depth32float",Zjv="rg16float",eut=0,EuQ=1,K9_="0.0",iJU="1.0",Raz="vec4<f32>(0.0, 0.0, -1.0e6, 1.0)",g6=0.00004,n6="4e-5",uM_=(e,t,r)=>`(${e} - select(0.0, 1.0, select(dot((frame.view * vec4<f32>(${t}, 0.0)).xyz, (frame.view * vec4<f32>(${r}, 1.0)).xyz) > 0.0, 0.0 > (frame.view * vec4<f32>(${t}, 0.0)).z, frame.proj[3][3] > 0.5)))`,A6="0.015625",JNY=(e,t,r,i)=>[`  var ${e}: f32 = 0.0;`,t===null?"  {":`  if (${t} != 0.0) {`,`    let ${e}N = (frame.view * vec4<f32>(${r}, 0.0)).xyz;`,`    let ${e}P = (frame.view * vec4<f32>(${i}, 1.0)).xyz;`,`    let ${e}S = 2.0 * (abs(${e}N.x) / (frame.proj[0][0] * frame.viewportSize.x) + abs(${e}N.y) / (frame.proj[1][1] * frame.viewportSize.y));`,`    let ${e}D = ${e}S * -${e}P.z;`,`    ${e} = select(${e}D / max(abs(dot(${e}N, ${e}P)), abs(${e}D) / 16.0 + 1e-30), ${e}S / max(abs(${e}N.z) * max(-${e}P.z, 0.0), ${e}S + 1e-30), frame.proj[3][3] > 0.5);`,"  }"],dp3=(e,t)=>t===null?`${e} * ${n6}`:`${e} * (${n6} + ${A6} * ${t})`,v6=`M.layer.x * ${A6} * 1.0625 * ownStep`,i6=0.00000005960464477539063,e6=4*i6/g6,Q6=e6.toExponential(6),gsg=(e,t)=>`(${e}.z + select(max(${e}.z + frame.proj[2][2] * ${e}.w, ${Q6} * ${e}.z), max(frame.proj[3][2] * ${e}.w - ${e}.z, ${Q6} * frame.proj[3][2] * ${e}.w), frame.proj[3][3] > 0.5) * (${t}))`,D6=`  out.position.z = ${gsg("out.position",`-${n6}`)};`,dlr="greater-equal";function kXg(e){if(e===void 0)return{};return A(e);}var R6="less-equal";function Yyk(e,t,r,i,n,l=L6){return{quad:`let size = vec2<f32>(textureDimensions(${e}, 0));
  let p = ${r} * size - 0.5;
  let i = floor(p);`,weights:"let w = round((p - i) * 256.0) / 256.0;",reference:`let r = ${l==="depth16unorm"?`round(clamp(${n}, 0.0, 1.0) * 65535.0) / 65535.0`:n};`,test:`vec4<f32>(r) ${R6==="less-equal"?"<=":"<"} textureGather(0, ${e}, ${t}, (i + 1.0) / size, ${i})`,filtered:"mix(mix(c.w, c.z, w.x), mix(c.x, c.y, w.x), w.y)"}}function b6(e){let t=Yyk("t","s","uv","layer","reference",e);return`t: texture_2d_array<f32>, s: sampler, uv: vec2<f32>, layer: i32, reference: f32) -> f32 {
  ${t.quad}
  ${t.weights}
  ${t.reference}
  let c = select(vec4<f32>(0.0), vec4<f32>(1.0), ${t.test});
  return ${t.filtered};
}`}var BWh=`fn lume_shadowCompare(${b6(L6)}`,l5Y=`fn lume_atlasShadowCompare(${b6(q6)}`,Y6="rg11b10ufloat",O6=Object.freeze([6,6,5]),G6=Object.freeze({rgba16float:[65504,65504,65504],rg11b10ufloat:[65024,65024,64512]}),$6=Object.freeze({samples:1,colorFormat:"rgba16float",casterFragmentStub:!1,hiddenSurfaceRemoval:!1,edgeSmoothing:!1}),o6=$6;function F6(){return o6}function S1x(e,t){let r=o6;o6=e;try{return t()}finally{o6=r}}function t6(){return F6().samples}function Cc4(){return F6().headsetFrame===!0}function z6(){return F6().sceneDepthKept!==!1}function A30(){return F6().fourSampleSurface!==!1}function scD(){return t6()===1&&z6()}var _j=/\bfield\s*\(\s*/g,Mj=/(["'`])([^"'`\\\n]+)\1\s*([,)])?/y,wj=/function\s*\*?\s*$/,Zj=function(e,t={names:new Set,computed:!1}){_j.lastIndex=0;for(let r=_j.exec(e);r;r=_j.exec(e)){{x=C(e,r,t);if(x===B)continue;}}return t},bY=/\.\s*(?:view\s*[(.]|portal\b)/;function D3H(e){let t={names:new Set,computed:!1,portal:bY.test(e.source)};Zj(e.source,t);for(let r of Object.values(e.deps??{}))Zj(r,t),t.portal||=bY.test(r);return t}var oP="payload_unreadable",YP=3,zP=100,LP=new Map,FP=!1,PP=new Map,EP=function(e){if(typeof e!=="object"||e===null)return typeof e;let t=e,r=t.type??t.kind??t.op;if(typeof r==="string")return r.slice(0,40);return Array.isArray(e)?"array":"?"},hP=function(e,t,r=0){let i=PP.get(e);if(i===void 0)PP.set(e,i={words:0,kinds:new Map,bytes:0});i.words+=1,i.bytes+=r;let n=EP(t);i.kinds.set(n,(i.kinds.get(n)??0)+1)},aP=new Map;function h5b(e,t,r){let i=aP.get(e);if(i===void 0)aP.set(e,i=new Map);let n=i.get(t);if(n===void 0)i.set(t,{words:1,ms:r});else n.words+=1,n.ms+=r}function dP(e){if(e===null)return"null: the realm could not deserialize the bytes (an allocation this tab refused)";if(e===void 0)return"undefined: an empty post";return`a ${Array.isArray(e)?"array":typeof e} that names no kind`}var kP=null,AP=null;function kAP(e){let t=`${e.realm}/${e.door}`,r=function(r,i){let n=(LP.get(t)??0)+1;if(LP.set(t,n),n<=YP||n%zP===0)if(e.team===!0);else X_.warn(`[port-door] ${e.realm} ${e.door}: ${oP} (${r}); ${i}; ${n} so far at this door`);e.onUnreadable?.({code:oP,realm:e.realm,door:e.door,face:r,detail:i,count:n})};return{onMessage(i){AP?.();let n=i.data;if(n===null||n===void 0){r("null",dP(n));return}if(e.admits!==void 0&&!e.admits(n)){r("shapeless",dP(n));return}if(FP)hP(t,n);let l=kP?.(e.door,EP(n));try{e.onWord(n,i)}finally{l?.()}},onMessageError(){r("messageerror","this realm's port refused to deserialize the bytes (messageerror)")}}}function ygd(e,t){return e.addEventListener("message",t.onMessage),e.addEventListener("messageerror",t.onMessageError),function(){e.removeEventListener?.("message",t.onMessage),e.removeEventListener?.("messageerror",t.onMessageError)}}var $v=0,yv=[];class VCM{constructor(e,t=null){this.name=void 0;this.slot=void 0;this.end=void 0;this.name=e,this.slot=$v++,this.end=t,yv[this.slot]=e}endStore(e,t){this.end?.(e,t)}}var Ozc=12,pC=new VCM("cloud-sea-map"),vI=new VCM("cloud-shadow"),xii=0.0007331378299120235,Ko0=0.05,Lcn=4,nRM=0.03,YST=0.75,oMD=0.7,of=2,tf=12,Wf=(1<<tf)-1,xf=63,$f=8,Tf=4,pf=1,Sf=$f*$f*of,Hf=65535,DuM=`
${Def}
fn sky_cloudMapUv(d: vec3<f32>) -> vec2<f32> {
  let ax = abs(d.x);
  let az = abs(d.z);
  let r = sqrt(max(1.0 - abs(d.y), 0.0));
  let a = max(ax, az);
  let b = min(ax, az);
  let ratio = select(b / a, 0.0, a == 0.0);
  var phi = atan(ratio) * ${2/Math.PI};
  if (ax < az) {
    phi = 1.0 - phi;
  }
  var v = phi * r;
  var u = r - v;
  if (d.y < 0.0) {
    let t = u;
    u = 1.0 - v;
    v = 1.0 - t;
  }
  u = u * select(-1.0, 1.0, d.x >= 0.0);
  v = v * select(-1.0, 1.0, d.z >= 0.0);
  return vec2<f32>(u, v) * 0.5 + 0.5;
}

fn sky_cloudMapWrap(texel: vec2<i32>, side: i32) -> vec2<i32> {
  var t = texel;
  if (t.x < 0) {
    t = vec2<i32>(-t.x - 1, side - 1 - t.y);
  } else if (t.x >= side) {
    t = vec2<i32>(2 * side - 1 - t.x, side - 1 - t.y);
  }
  if (t.y < 0) {
    t = vec2<i32>(side - 1 - t.x, -t.y - 1);
  } else if (t.y >= side) {
    t = vec2<i32>(side - 1 - t.x, 2 * side - 1 - t.y);
  }
  return clamp(t, vec2<i32>(0), vec2<i32>(side - 1));
}

fn sky_cloudMapOtherHalf(t: vec2<i32>, side: i32, half: f32) -> bool {
  let c = f32(side / 2);
  let d = abs(vec2<f32>(t) + 0.5 - c);
  return half != 0.0 && (d.x + d.y <= c) != (half > 0.0);
}

fn sky_cloudMapBlockOf(t: vec2<i32>, side: i32) -> u32 {
  return u32((t.y / ${$f}) * (side / ${$f}) + t.x / ${$f});
}

fn sky_cloudMapDecode(w0: u32, tag: u32) -> vec4<f32> {
  let rg = lume_unpack2x16half(w0);
  return vec4<f32>(rg.x, rg.y, 0.0, lume_half_to_f32(tag >> 18u));
}

fn sky_cloudMapCount(tag: u32) -> u32 {
  return (tag >> ${tf}u) & ${xf}u;
}

fn sky_cloudMapStamp(tag: u32) -> u32 {
  return tag & ${Wf}u;
}

fn sky_cloudMapMeta(count: u32, frame: u32) -> u32 {
  return (min(count, ${xf}u) << ${tf}u) | (frame & ${Wf}u);
}

`;function gnp(e,t,r,i){return`
fn sky_cloudMapTap${t}(texel: vec2<i32>, side: i32) -> vec2<u32> {
  let t = sky_cloudMapWrap(texel, side);
  let i = ${e}[${pf}u] + (${e}[${Tf}u + sky_cloudMapBlockOf(t, side)] & ${Hf}u) * ${Sf}u + u32((t.y & ${$f-1}) * ${$f} + (t.x & ${$f-1})) * ${of}u;
  return select(vec2<u32>(${e}[i], ${e}[i + 1u]), vec2<u32>(0u, sky_cloudMapMeta(${xf}u, ${i})), sky_cloudMapOtherHalf(t, side, ${r}));
}

fn sky_cloudMapBilinear${t}(position: vec2<f32>, side: i32) -> vec4<f32> {
  let p = position - 0.5;
  let base = vec2<i32>(floor(p));
  let f = p - floor(p);
  var sum = vec4<f32>(0.0);
  var weight = 0.0;
  for (var j = 0; j < 2; j = j + 1) {
    for (var i = 0; i < 2; i = i + 1) {
      let words = sky_cloudMapTap${t}(base + vec2<i32>(i, j), side);
      let w = select(f.x, 1.0 - f.x, i == 0) * select(f.y, 1.0 - f.y, j == 0) * select(0.0, 1.0, sky_cloudMapCount(words.y) > 0u);
      sum = sum + sky_cloudMapDecode(words.x, words.y) * w;
      weight = weight + w;
    }
  }
  return sum / max(weight, 1e-6);
}

fn sky_cloudMapRead${t}(direction: vec3<f32>, side: f32) -> vec4<f32> {
  let p = sky_cloudMapBilinear${t}(sky_cloudMapUv(direction) * side, i32(side));
  return vec4<f32>(p.rgb / max(p.a, 1e-4), p.a);
}
`}var JQV="cloudSeaMapTexels";function yB(e){return e.startsWith("shade_seaMap")||e==="shade_cloudSea"||e==="shade_cloudSeaMapped"||e==="shade_cloudSeaSlice"}var uM2=`@group(1) @binding(${Ozc}) var<storage, read> ${JQV}: array<u32>;`,MB=`fn shade_seaMapWord(i: u32) -> u32 {
  return ${JQV}[i];
}

fn shade_seaMapWords() -> u32 {
  return arrayLength(&${JQV});
}`;function wB(e,t){let r=e.indexOf("{",t);for(let t=0;r<e.length;r+=1)if(e[r]==="{")t+=1;else if(e[r]==="}"&&--t===0)break;return r+1}function pB(e,t){return t.map(function(t){let r=e.search(new RegExp(`\\bfn\\s+${t}\\s*\\(`));return r<0?"":e.slice(r,wB(e,r))}).join(`

`)}var SB=`${MB}

${pB(`${Def}
${DuM.replace(Def,"")}
${gnp(JQV,"","passLights.cloudSeaMap.y","0u")}`,["lume_half_to_f32","lume_unpack2x16half","sky_cloudMapUv","sky_cloudMapWrap","sky_cloudMapOtherHalf","sky_cloudMapBlockOf","sky_cloudMapDecode","sky_cloudMapCount","sky_cloudMapMeta","sky_cloudMapTap","sky_cloudMapBilinear","sky_cloudMapRead"]).replace(/\bsky_cloudMap/g,"shade_seaMap").replace(/\blume_(half_to_f32|unpack2x16half)\b/g,"shade_seaMapHalf_$1").replace(new RegExp(`\\b${JQV}\\[([^\\[\\]]+)\\]`,"g"),"shade_seaMapWord($1)").replace(/^[ \t]*\/\/.*\n/gm,"")}`,qlr=`  let a = passLights.cloudShadowA;
  let thickness = max(passLights.cloudSeaSun.w, 1.0);
  let baseY = a.x;
  let topY = baseY + thickness;
  let eye = frame.cameraPosition + frame.renderOrigin;
`,hOp=`  let d = toward * inverseSqrt(max(dot(toward, toward), 1e-24));
  let forward = -vec3<f32>(frame.view[0].z, frame.view[1].z, frame.view[2].z);
  let reach = max(viewZ, 0.0) / max(dot(d, forward), 1e-3);
  let endY = eye.y + d.y * reach;
`,dGv=`  let dy = select(d.y, 1e-4, abs(d.y) < 1e-4);
  let tBase = (baseY - eye.y) / dy;
  let tTop = (topY - eye.y) / dy;
  let insideLayer = eye.y > baseY && eye.y < topY;
`,e0X=`${SB}

fn shade_cloudSeaMapped(viewZ: f32, toward: vec3<f32>) -> ShadeCloudSea {
  let none = ShadeCloudSea(vec4<f32>(0.0), 1.0);
  let tint = passLights.cloudSeaColor;
${qlr}${hOp}  if (min(max(eye.y, endY), topY) <= max(min(eye.y, endY), baseY)) {
    return none;
  }
${dGv}  let tEnter = select(min(max(tBase, 0.0), max(tTop, 0.0)), 0.0, insideLayer);
  let tExit = min(max(max(tBase, 0.0), max(tTop, 0.0)), tEnter + ${_Td(gad)});
  let layer = shade_seaMapRead(d, passLights.cloudSeaMap.x);
  let share = clamp((reach - tEnter) / max(tExit - tEnter, 1.0), 0.0, 1.0);
  let alpha = (1.0 - exp2(share * log2(max(1.0 - layer.w, 1e-6)))) * min(tint.w, 1.0);
  if (alpha <= 0.0) {
    return none;
  }
  let closing = smoothstep(${_Td(YST)}, 1.0, a.z);
  let skyLight = shade_cloudSeaSky(vec3<f32>(d.x, abs(d.y), d.z));
  let ambient = mix(skyLight, vec3<f32>(dot(skyLight, vec3<f32>(0.2126, 0.7152, 0.0722))), closing);
  let lit = (passLights.cloudSeaSun.rgb * layer.x + ambient * layer.y) * tint.rgb;
  let toned = mix(vec3<f32>(dot(lit, vec3<f32>(0.2126, 0.7152, 0.0722))), lit, passLights.cloudSeaSunDirection.w);
  return ShadeCloudSea(vec4<f32>(toned, alpha), clamp(tEnter, 0.0, reach) / max(reach, 1e-3));
}

fn shade_cloudSea(viewZ: f32, toward: vec3<f32>) -> ShadeCloudSea {
  if (passLights.cloudSeaColor.w <= 0.0 || frame.proj[2][3] == 0.0) {
    return ShadeCloudSea(vec4<f32>(0.0), 1.0);
  }
  let pending = clamp(passLights.cloudSeaMap.z, 0.0, 1.0);
  let sliceOnly = passLights.cloudSeaMap.x <= 0.5 || pending >= 1.0 || shade_seaMapWords() == 0u;
  var mapped = ShadeCloudSea(vec4<f32>(0.0), 1.0);
  if (!sliceOnly) {
    mapped = shade_cloudSeaMapped(viewZ, toward);
    if (pending <= 0.0) {
      return mapped;
    }
  }
  let slice = shade_cloudSeaSlice(viewZ, toward);
  if (sliceOnly) {
    return slice;
  }
  let cover = mix(mapped.color.a, slice.color.a, pending);
  let shares = mix(mapped.color.rgb * mapped.color.a, slice.color.rgb * slice.color.a, pending) / max(cover, 1e-4);
  return ShadeCloudSea(vec4<f32>(shares, cover), min(mapped.at, slice.at));
}`,fd={"texture_2d<f32>":"texture_2d_array<f32>","texture_2d<u32>":"texture_2d_array<u32>","texture_2d<i32>":"texture_2d_array<i32>"},hd=/\btexture_2d</,nd=/\btexture_storage_2d</,Kd=XBU(),zd=XBU(),Yd=XBU(),Ed=XBU(),xd=XBU(),bd=uRd(),td={textureSample:3,textureSampleBias:3,textureSampleLevel:3,textureSampleGrad:3,textureLoad:2,textureStore:2},qd=/[A-Za-z0-9_]/,Md=47,md=42,Rd=123,Pd=125,Wd=40,pd=41,kd=59;function Xd(e){let t=[],r=0,i=0,n=e.length;for(let l=0;l<n;l+=1){let s=e.charCodeAt(l);if(s===Md){let t=e.charCodeAt(l+1);if(t===Md){let t=e.indexOf(`
`,l);l=t<0?n:t;continue}if(t===md){let t=e.indexOf("*/",l+2);l=t<0?n:t+1;continue}}if(s===Rd||s===Wd)r+=1;else if(s===Pd||s===pd){if(r-=1,r===0&&s===Pd)t.push({start:i,end:l+1}),i=l+1}else if(s===kd&&r===0)t.push({start:i,end:l+1}),i=l+1}if(i<n)t.push({start:i,end:n});return t}function gd(e,t){let r=[],i=e.indexOf("texture");for(let n of t){if(i>=0&&i<n.start)i=e.indexOf("texture",n.start);r.push(i>=0&&i<n.end)}return r}function Vd(e,t){let r=[],i=0,n=0,l=t+1;for(let s=t;s<e.length;s+=1){let t=e[s];if(t==="("||t==="[")i+=1;else if(t==="<"&&(D(s,e)))n+=1;else if(t===">"&&n>0)n-=1;else if(t===")"||t==="]"){if(i-=1,i===0){if(e.slice(l,s).trim()!=="")r.push({start:l,end:s});return{args:r,close:s}}}else if(t===","&&i===1&&n===0)r.push({start:l,end:s}),l=s+1}return null}function ed(e,t,r){if(e==="textureGather")return E(t,r);if(e==="textureSampleBaseClampToEdge"){return F(t,r);}let i=td[e];return i!==void 0&&t.length>=i&&r.has((t[0]??"").trim())?`${e}(${[...t.slice(0,i)," 0",...t.slice(i)].join(",")})`:null}function Zd(e,t){for(let r of t)if(e.includes(r))return!0;return!1}function Cd(e,t){if(t.size===0||!Zd(e,t))return e;let r="",i=0,n=/\b(textureSampleBaseClampToEdge|textureSampleLevel|textureSampleBias|textureSampleGrad|textureSample|textureLoad|textureStore|textureGather)\s*\(/g;for(let l=n.exec(e);l!==null;l=n.exec(e)){if(l.index>0&&(qd.test(e[l.index-1]??"")||e[l.index-1]==="."))continue;let s=l.index+l[0].length-1,o=Vd(e,s);if(o===null)continue;let a=ed(l[1]??"",o.args.map((r)=>Cd(e.slice(r.start,r.end),t)),t);if(a===null)continue;r+=e.slice(i,l.index)+a,i=o.close+1,n.lastIndex=i}return r+e.slice(i)}function Bd(e,t){let r=e.replace(/\s+/g,"");return fd[r]??(t&&G(r)?H(r):void 0)}function od(e,t,r,i){let n=Vd(e,t);if(n===null)return e;let l=new Set(r),s=e.slice(0,t+1),o=t+1;for(let t of n.args){let r=e.slice(t.start,t.end),n=/^\s*(\w+)\s*:\s*([\s\S]*?)\s*$/.exec(r);if(n===null)continue;let a=n[1]??"",u=n[2]??"",d=Bd(u,i);if(d===void 0){l.delete(a);continue}l.add(a);let f=r.trimEnd();s+=e.slice(o,t.start)+f.slice(0,f.length-u.length)+d+r.slice(f.length),o=t.end}return s+e.slice(o,n.close+1)+Cd(e.slice(n.close+1),l)}function wd(e,t=!1){let r=new Map;if(!hd.test(e)&&!(t&&nd.test(e)))return{code:e,bindings:r};let i=Xd(e),n=gd(e,i),l=new Set,s=/^(?:\s*(?:\/\/[^\n]*\n|\/\*[\s\S]*?\*\/))*\s*((?:@\w+(?:\([^)]*\))?\s*)*)var\s+(\w+)\s*:\s*texture_2d<\s*[fiu]32\s*>\s*;/,o=/(var\s+\w+\s*:\s*)(texture_2d<\s*[fiu]32\s*>)(\s*;)/,a=/^(?:\s*(?:\/\/[^\n]*\n|\/\*[\s\S]*?\*\/))*\s*((?:@\w+(?:\([^)]*\))?\s*)*)var\s+(\w+)\s*:\s*texture_storage_2d<[^>]*>\s*;/,u=/(var\s+\w+\s*:\s*)texture_storage_2d(<[^>]*>\s*;)/;i.forEach(function(i,o){if(!n[o])return;let u=e.slice(i.start,i.end),d=s.exec(u)??(t?a.exec(u):null);if(d===null)return;l.add(d[2]??"");let f=/@group\((\d+)\)/.exec(d[1]??""),c=/@binding\((\d+)\)/.exec(d[1]??"");if(f&&c){let e=Number(f[1]);if(!r.has(e))r.set(e,new Set);r.get(e)?.add(Number(c[1]))}});let d=function(e){if(s.test(e))return e.replace(o,(e,t,r,i)=>t+(fd[r.replace(/\s+/g,"")]??r)+i);if(t&&a.test(e))return J(e,u);return e},f="",c=0;return i.forEach(function(r,i){if(!n[i])return;let s=e.slice(r.start,r.end),o=/^((?:\s*(?:\/\/[^\n]*\n|\/\*[\s\S]*?\*\/))*\s*(?:@[\w]+(?:\([^)]*\))?\s*)*fn\s+\w+\s*)\(/.exec(s),a=o===null?d(s):od(s,o[0].length-1,l,t);if(a===s)return;f+=e.slice(c,r.start)+a,c=r.end}),{code:c===0?e:f+e.slice(c),bindings:r}}var cf="lume_storeMask",[kf,Ff,Pf]=O6,[Zf,jf,Lf]=G6[Y6],Xf=(e)=>e*8388608,gf=`override ${cf}: u32 = 0u;
fn lume_storeGrid(v: vec3<f32>, n: f32) -> vec3<f32> {
  let most = vec3<f32>(${_Td(Zf)}, ${_Td(jf)}, ${_Td(Lf)});
  let c = clamp(v, vec3<f32>(0.0), most);
  let e = max(bitcast<vec3<u32>>(c) & vec3<u32>(${rK(Xf(255))}), vec3<u32>(${rK(Xf(113))}));
  let x = c * bitcast<vec3<f32>>(vec3<u32>(${rK(Xf(254+kf))}, ${rK(Xf(254+Ff))}, ${rK(Xf(254+Pf))}) - e);
  let q = select(max(floor(x + vec3<f32>(n)), vec3<f32>(0.0)), x, floor(x) == x);
  return min(q * bitcast<vec3<f32>>(e - vec3<u32>(${rK(Xf(kf))}, ${rK(Xf(Ff))}, ${rK(Xf(Pf))})), most);
}
fn lume_storeNoise(pixel: vec2<f32>) -> f32 {
  let p = floor(pixel);
  return fract(52.9829189 * fract(dot(p, vec2<f32>(0.06711056, 0.00583715)))) + fract(dot(p, vec2<f32>(0.7548776662, 0.569840291))) - 0.5;
}
`,bf=4096,af=`vec2<f32>(frame.grainAnchor - floor(frame.grainAnchor / ${bf}.0) * ${bf}.0, floor(frame.grainAnchor / ${bf}.0))`,zf="lume_storeOnScreen",Vf=new RegExp(`\\bvar\\s*<\\s*private\\s*>\\s*${zf}\\s*:\\s*bool\\b`);function EzM(e){return`var<private> ${zf}: bool = ${e?"true":"false"};`}function eE(e){return TK(wK(e))}function EE(e){return EK(eE(e),yB)}function zEL(e){let{code:t,bindings:r}=wd(e);return{...t===e?{}:{kinded:!0},bindings:Array.from(r,([e,t])=>[e,[...t]]),doorText:EE(t)}}var Od=null,Ud=function(e,t){let r=Reflect.get(e,t);return Object(r)===r?r:void 0},id=(e)=>Od!==null?Od[e]:Ud(globalThis,e),_33=()=>id("BroadcastChannel"),EwJ=()=>Od!==null,UCy=function(e){if(Od!==null)return;Od={caches:Ud(e,"caches"),indexedDB:Ud(e,"indexedDB"),IDBKeyRange:Ud(e,"IDBKeyRange"),BroadcastChannel:Ud(e,"BroadcastChannel"),Worker:Ud(e,"Worker"),importScripts:Ud(e,"importScripts")}};var Tfx=(e,t={scripted:[],engine:[]})=>({kind:"elsewhere",why:e,reports:t});function _0n(e){try{let t=e.family.length===1?{code:e.family[0],entries:[{}]}:KK(e.family);return{kind:"family",code:t.code,entries:t.entries,door:zEL(t.code),reports:{scripted:[],engine:[]}}}catch(e){return Tfx(`the builder fell: ${k$w(e)}`)}};

function b(n){return(`${n??"no content-type"} is not JavaScript`)}
function g(t,e){let r=Reflect.apply(t,globalThis,[e]);return typeof r==="string"?r:null
}
function j(){let e=d6("");return e!==null&&/^https?:/.test(e)?e:null
}
function k(e,t){Z6=!0,PM(e).then(function(e){t.keeps??=e},function(){return})
}
function q(t,e){let r=JK(),i=qK(t.text);return Jf("scan",e,r),i
}
function v(e,d){VM.set(e,"edges"in d?d.print??String(d.bytes):DM(new TextEncoder().encode(d.text)));
}
function y(){Pb=typeof Blob==="function"&&typeof Reflect.get(URL,"createObjectURL")==="function"?T6:null;
}
function z(){let e=IM;IM=Iqw(IM);for(let t of e)t()
}
function A(e){return{depthBias:-e.units,depthBiasSlopeScale:-e.factor,depthBiasClamp:0}
}
function C(e,r,t){if(wj.test(e.slice(Math.max(0,r.index-12),r.index))){return B}let i=_j.lastIndex;Mj.lastIndex=i;let n=Mj.exec(e);if(n?.[3]!==void 0&&!(n[1]==="`"&&n[2].includes("${")))t.names.add(n[2]);else if(n!==null||e[i]!==")")t.computed=!0
}
function D(s,e){return(s>=5&&e.startsWith("array",s-5)||s>=18&&e.startsWith("texture_storage_2d",s-18))}
function E(t,r){return t.length>=4&&r.has((t[1]??"").trim())?`textureGather(${[...t.slice(0,4)," 0",...t.slice(4)].join(",")})`:null;
}
function F(t,r){let e=(t[0]??"").trim();return t.length===3&&r.has(e)?`textureSampleLevel(${e},${t[1]}, clamp(${(t[2]??"").trim()}, vec2<f32>(0.5) / vec2<f32>(textureDimensions(${e}, 0)), vec2<f32>(1.0) - vec2<f32>(0.5) / vec2<f32>(textureDimensions(${e}, 0))), 0, 0.0)`:null
}
function G(r){return(r.startsWith("texture_storage_2d<"))}
function H(r){return(`texture_storage_2d_array${r.slice(18)}`)}
function J(e,u){return e.replace(u,(e,t,r)=>`${t}texture_storage_2d_array${r}`);
}
function w(){}var x;function B(){}function I(){}

;function $lpd0(o,k,v){Object.defineProperty(o,k,{value:v,writable:!0,enumerable:!0,configurable:!0})}import"./60d2a80e-3b2a74e2c618d12a.mjs";import"./077587d08c885e27.mjs";import{A5t as E7Q,J_w as tqt,N5$ as u$h,jrE as bF7,rYR as WlV}from"./077587d08c885e27.mjs";import{$zO as BK,AFA as uK,BD0 as LK,BFb as cK,BZG as aK,DLn as lK,Dxw as _1x,FDr as NK,GPY as k$w,Gy1 as GK,H8s as hK,JgP as RK,Jhq as iK,L6z as k4y,LX8 as gK,Maf as uLW,MoU as bK,MwX as FK,Nvl as DK,OoP as by7,P17 as jUg,PUg as yK,Qia as mK,R3E as kK,SxL as PK,THI as MK,TT7 as pAN,VjQ as SK,W0O as VK,Wc9 as op0,Y7N as ngg,ZqT as xK,_80 as QK,_Lq as XYw,_m_ as rGO,a90 as otq,bBP as $K,eTn as vfI,fiz as zK,g_N as ZK,gwO as qK,hsQ as xQ3,ihr as IK,jS2 as CK,kSU as XK,lpe as JK,maI as OK,pNM as oK,scf as nK,syP as vK,t3K as baM,t5y as YK,tzY as WK,uYW as kaF,ueN as e3w,vCb as _K,vSq as sK,vVU as pK,w1n as OlA,wN9 as reG,wbX as eK,we5 as jK,yGf as mFs}from"./60d2a80e-3b2a74e2c618d12a.mjs";import"./26ceb10f-156258ddd53795f5.mjs";import"./59031fb6a4af82a1.mjs";import"./5bfc27ec75dfbbea.mjs";import"./066edad7-f7400e45e1d275b5.mjs";import{$9E1 as A2n,FN0 as zEr,FUa as hpi,Kw6 as iOc,MQF as l_6,MfJ as PVx,Nip as OuG,Nt8 as yML,OF4 as aYH,RBM as KK,SM4 as a1i,Th2 as bVy,USE as OT$,UgB as oAF,Usn as BHD,WVw as S77,XJi as jwv,Y_s as FFn,Zbs as Def,_9C as TK,_EQ as OZb,bW2 as u8m,d1B as vDR,dL1 as EK,hk2 as lsY,jRh as VeE,kxF as Vvw,mXr as wK,mZw as O7v,mix as iaN,oH_ as gad,p5V as NZA,pg12 as UQ4,r9O as y3_,rl5 as HGV,tOU as mAc,tXf as OhB,xZ$ as vN_,zAb as w9R,zpJ as Nu2}from"./066edad7-f7400e45e1d275b5.mjs";import{EGD as l_q,J_U as _Td,Nly as ahj,cPn as J8B,d5P as UmR,pATP as AXn,q_Zc as rK,tSr as eMf,wUA as utO}from"./59031fb6a4af82a1.mjs";import{BNG as nYo,LJK as srL,Lf4 as TD3,Lvt as $i6,T8y as $Oy,Ux4 as MTL,Vcr as i_3,c7E as Low,eaU as zuW,k1n as gyw,niH as S$o,yUm as e2D}from"./9b93e26679f0ec35.mjs";import{Bjog as jCw,Gkw as Zpc,Oa7 as $P0,mhQ as JPf}from"./26ceb10f-156258ddd53795f5.mjs";import{cAC as e5m}from"./5bfc27ec75dfbbea.mjs";import{$LA as h2l,D3T as ktf,vCv as sLl}from"./311be8166b11d252.mjs";import{ONL as uRd,bdT as XBU}from"./db293faeb5424f3a.mjs";import"./36e1ee31f0733f71.mjs";import{$OL as Qmx,Fym as Y4B,iDq as tDa,pkz as cAO,rEt as kCV,rfM as Wb_,t4Q as A9H}from"./36e1ee31f0733f71.mjs";export{$Oy,$P0,$i6,A2n,A30,A9H,AXn,BHD,BWh,Cc4,D3H,Def,DuM,E7Q,EuQ,EwJ,EzM,FFn,H0q,HGV,Iqw,J8B,JNY,JPf,JQV,K9_,Ko0,Lcn,Low,MTL,NKp,NZA,Nu2,O7v,OT$,OZb,OhB,OlA,OuG,Ozc,PVx,Qmx,RDp,Raz,S$o,S1x,S77,TD3,Tfx,UCy,UQ4,UmR,VCM,VeE,Vvw,Wb_,WjK,WlV,XBU,XYw,Y4B,YLk,YST,Yyk,Zjv,Zpc,Zyu,_0n,_1x,_33,_Td,a1i,aYH,ahj,bF7,bVy,baM,by7,cAO,chq,dGv,dlr,dp3,dxH,e0X,e2D,e3w,e5m,eMf,eut,gad,gnp,gsg,gyw,h2l,h5b,hOp,hpi,iJU,iOc,i_3,iaN,jCw,jEz,jUg,jwv,k$w,k4y,kAP,kCV,kXg,kaF,ktf,l5Y,l_6,l_q,lsY,mAc,mFs,nRM,nYo,ngg,oAF,oMD,op0,otq,pAN,qlr,rD3,rGO,reG,sLl,scD,srL,tDa,tqt,u$h,u8m,uLW,uM2,uM_,uRd,utO,v6R,vDR,vN_,vfI,w9R,xQ3,xii,y3_,yML,ygd,zEL,zEr,zuW};
