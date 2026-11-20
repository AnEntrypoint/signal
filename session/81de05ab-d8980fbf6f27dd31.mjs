
;;;;var Rq=0.22;function Wq(q){let J=Number.isFinite(q)?Math.max(0,q):0;return Math.min(0.5,Rq*J)}var WJ=Qq("tome/juice-ui-sink",{snapshot:"live-channel",versioned:!0});var V=334,Zq=0.5,$q=0.08,Iq=3*V,mq=V,_=334,jq=150,zq=$q;var Bq=0.4;var v=(function(){return{lastCallAt:-1/0,trainStartAt:-1/0,lastAcceptedAt:-1/0,lastDimAt:-1/0,busyUntil:-1/0,glowUntil:-1/0}});function O(q,J,Q){let W=J-q.lastCallAt<V,Y=W?q.trainStartAt:J,Z={...q,lastCallAt:J,trainStartAt:Y};if(W&&q.glowUntil>q.lastCallAt||W&&J-Y>=Iq){let B=J+mq;return{decision:{kind:"glow",holdUntil:B},state:{...Z,glowUntil:B,busyUntil:-1/0}}}if(J-q.lastAcceptedAt>=V&&J>=q.busyUntil)return{decision:{kind:"accept"},state:{...Z,lastAcceptedAt:J,busyUntil:J+(Q.busyMs??0),glowUntil:-1/0}};if(Q.surface==="entity-flash"&&J-q.lastDimAt>=V)return{decision:{kind:"dim",amplitude:$q},state:{...Z,lastDimAt:J}};return{decision:{kind:"drop"},state:Z}}function g(){return Yq()}var Aq=4.5,hq={title:{fontPx:18,lineHeight:1.2},line:{marginPx:6,fontPx:14,lineHeight:1.35,rows:2},gesture:{marginPx:10,fingertipPx:34,stickPx:40,chipPx:36},tabName:{marginPx:8,fontPx:14,lineHeight:1.2},dots:{marginPx:10,dotPx:11},skipChip:{marginPx:14,heightPx:32}},X=hq,Eq=Math.ceil(X.title.fontPx*X.title.lineHeight+X.line.marginPx+X.line.rows*X.line.fontPx*X.line.lineHeight+Math.max(X.gesture.marginPx+Math.max(X.gesture.fingertipPx,X.gesture.stickPx,X.gesture.chipPx),X.tabName.marginPx+X.tabName.fontPx*X.tabName.lineHeight)+X.dots.marginPx+X.dots.dotPx+X.skipChip.marginPx+X.skipChip.heightPx);var Kq=(()=>`calc(${Aq}rem + ${Eq}px + ${Xq("top")})`);var c="tome-juice-hud",p="tome-juice-announce-root",fq="tome-juice-hud-styles",R="tome-juice-toasts",d="tome-juice-announce",I="tome-juice-screenfx",l="tome-juice-letterbox-top",i="tome-juice-letterbox-bottom",Mq="tome-juice-vignette",a="tome-juice-screen-flash",N="tome-juice-page-outline",wq=220,_q=260,vq=0.03,Sq=7919871,Oq=0.45,Cq=3,gq=1,t=0.26,r=0,n=1,C=null,u=null,y=null,G=null,z=null,L=0,T=!1,Vq=v(),$=null,Gq=v(),kq=0,b=!1,Fq=new WeakSet,K=null,Pq=!1;function Nq(){if(typeof document>"u")return;let q=k(h(),I);if(!E(q,"div"))return;if(K)q.style.inset="auto",q.style.left=`${K.left}px`,q.style.top=`${K.top}px`,q.style.width=`${K.width}px`,q.style.height=`${K.height}px`;else q.style.removeProperty("inset"),q.style.removeProperty("left"),q.style.removeProperty("top"),q.style.removeProperty("width"),q.style.removeProperty("height")}function HJ(q){let J=dq();if(!J)return!1;return J.showToast(q),!0}function UJ(q){let v$2;lq:{let v$4;rq:{if(typeof document>"u"||!document.body){v$4=null;break rq;}o(document);let q=document.getElementById(p);if(q instanceof HTMLDivElement){v$4=q;break rq;}let J=document.createElement("div");J.id=p,J.setAttribute("aria-live","polite");let Q=document.getElementById("spawn-ui-root");if(Q?.parentElement)Q.parentElement.insertBefore(J,Q);else document.body.appendChild(J);v$4=J;}let q=v$4;if(!q){v$2=null;break lq;}let J=q.querySelector(`#${d}`);if(!J)J=document.createElement("div"),J.id=d,q.appendChild(J);v$2=J;}let J=v$2;if(!J)return!1;aq(J,q);return !0}function LJ(q){if(typeof window>"u")return!1;let J=H();if(!J)return!1;u=D(J,u,l),y=D(J,y,i);let Q=Number.isFinite(q)?Math.max(0,q):0;let W=Q>0.001;let Y=W?`${Number((Wq(Q)*100).toFixed(4))}%`:"0px";for(let Z of[u,y])Z.style.height=Y,Z.style.opacity=W?"1":"0",Z.style.visibility=W?"visible":"hidden";return!0}function MJ(q,J){let Q=H();if(!Q)return!1;G=D(Q,G,Mq);let W=s(q);if(W<=0.001)return G.style.opacity="0",G.style.visibility="hidden",!0;let[Y,Z,j]=P(J),B=s(1-Math.pow(1-W,1.6)),f=Math.round(80-45*B),M=Math.round(f+(100-f)*0.45),S=Math.round(f+(100-f)*0.8);return G.style.opacity=`${B}`,G.style.visibility="visible",G.style.background=`radial-gradient(circle at center, rgba(${Y}, ${Z}, ${j}, 0) ${f}%, rgba(${Y}, ${Z}, ${j}, 0.25) ${M}%, rgba(${Y}, ${Z}, ${j}, 0.7) ${S}%, rgba(${Y}, ${Z}, ${j}, 1) 100%)`,!0}function SJ(q){let J=H();if(!J)return!1;z=D(J,z,a);let Q=x(q.duration,vq,Number.MAX_VALUE);let W=Math.round(Q*1000);let Y=g();let Z=x(q.intensity,0,Y?Zq:1);if(Z<=0)return!0;let j=performance.now();if(Y){let{decision:B,state:f}=O(Vq,j,{surface:"screen-wash"});if(Vq=f,B.kind==="drop")return!0;if(B.kind==="glow"){sq(q.color,B.holdUntil,j);return !0}}yq({color:q.color,peak:Z,durationMs:W});return !0}function yq(q){let J=H();if(!J)return;z=D(J,z,a);let[Q,W,Y]=P(q.color),Z=++L;T=!1,z.style.transition="none",z.style.background=`rgb(${Q} ${W} ${Y})`,z.style.opacity=`${q.peak}`,z.style.visibility="visible",z.offsetWidth,z.style.transition=`opacity ${q.durationMs}ms ease-out`,z.style.opacity="0",window.setTimeout(function(){if(Z!==L||!z)return;z.style.visibility="hidden"},q.durationMs)}function sq(q,J,Q){if(!z)return;let W=z,Y=++L;if(!T){let[Z,j,B]=P(q);W.style.background=`rgb(${Z} ${j} ${B})`,T=!0}W.style.transition=`opacity ${jq}ms ease-out`,W.style.opacity=`${zq}`,W.style.visibility="visible",window.setTimeout(function(){if(Y!==L||!z)return;T=!1,z.style.transition=`opacity ${_}ms ease-out`,z.style.opacity="0",window.setTimeout(function(){if(Y!==L||!z)return;z.style.visibility="hidden"},_)},Math.max(0,Math.round(J-Q)))}var m="--outline-persistent-opacity";function CJ(q={}){let J=H();if(!J)return!1;if(Tq(J),!$)return!1;let Q=typeof q.color==="number"?q.color:Sq;let W=U(q.duration,Oq);let Y=U(q.width,Cq);let Z=Math.max(1,Math.round(U(q.pulses,gq)));let j=$.classList.contains("persistent")?x(parseFloat($.style.getPropertyValue(m)||`${t}`),r,n):0;let B=x(Math.max(0.8,j+0.62),r,n);let [f,M,S]=P(Q);let e=g();let qq=Math.max(e?V:0,Math.round(W*1000/Z));if(e){let Jq=performance.now(),{decision:w,state:bq}=O(Gq,Jq,{surface:"outline-pulse",busyMs:qq*Z});if(Gq=bq,w.kind==="drop")return!0;if(w.kind==="glow"){cq(f,M,S,Y,w.holdUntil,Jq);return !0}}return b=!1,$.style.setProperty("--outline-r",`${f}`),$.style.setProperty("--outline-g",`${M}`),$.style.setProperty("--outline-b",`${S}`),$.style.setProperty("--outline-width",`${Y}px`),$.style.setProperty("--outline-pulse-ms",`${qq}ms`),$.style.setProperty("--outline-pulses",`${Z}`),$.style.setProperty("--outline-pulse-start-opacity",`${j}`),$.style.setProperty("--outline-pulse-end-opacity",`${j}`),$.style.setProperty("--outline-pulse-peak-opacity",`${B}`),$.classList.remove("active"),$.offsetWidth,$.classList.add("active"),F($),!0}function cq(q,J,Q,W,Y,Z){if(!$)return;let j=$,B=++kq;if(j.classList.remove("active"),!b)j.style.setProperty("--outline-r",`${q}`),j.style.setProperty("--outline-g",`${J}`),j.style.setProperty("--outline-b",`${Q}`),j.style.setProperty("--outline-width",`${W}px`),b=!0;j.style.opacity=`${Bq}`,F(j),window.setTimeout(function(){if(B!==kq||!$)return;b=!1,$.style.opacity="",F($)},Math.max(0,Math.round(Y-Z)))}function NJ(q){let J=H();if(!J)return!1;if(Tq(J),!$)return!1;if(!q)return $.classList.remove("persistent"),$.style.setProperty(m,"0"),F($),!0;let Q=typeof q.color==="number"?q.color:Sq,W=U(q.width,Cq),Y=x(q.opacity??t,r,n),[Z,j,B]=P(Q);return $.style.setProperty("--outline-r",`${Z}`),$.style.setProperty("--outline-g",`${j}`),$.style.setProperty("--outline-b",`${B}`),$.style.setProperty("--outline-width",`${W}px`),$.style.setProperty(m,`${Y}`),$.classList.add("persistent"),F($),!0}function F(q){let v$1;pq:{if(q.classList.contains("active")||q.style.opacity!==""){v$1=!0;break pq;}if(!q.classList.contains("persistent")){v$1=!1;break pq;}v$1=parseFloat(q.style.getPropertyValue(m)||`${t}`)>0;}if(v$1){q.style.visibility="visible";return}if(parseFloat((q.ownerDocument.defaultView??window).getComputedStyle(q).opacity)>0)return;q.style.visibility="hidden"}function dq(){if(C)return C;let v$3;iq:{if(typeof document>"u"){v$3=null;break iq;}let q=h();if(!q.body){v$3=null;break iq;}o(q);let J=k(q,c);if(E(J,"div")){v$3=J;break iq;}let Q=q.createElement("div");v$3=(Q.id=c,Q.setAttribute("aria-live","polite"),A(q,q.body).appendChild(Q),Q);}let q=v$3;if(!q)return null;let J=q.querySelector(`#${R}`);if(!J)J=document.createElement("div"),J.id=R,q.appendChild(J);C={showToast:(Q)=>nq(J,Q)};return C}function H(){if(typeof document>"u")return null;let q=h();if(!q.body)return null;o(q);uq:{if(Pq)break uq;Pq=!0,Dq(function(q){let J=K;if(K=q?{left:q.left,top:q.top,width:q.width,height:q.height}:null,!J&&!K)return;if(J&&K?.left===J.left&&K.top===J.top&&K.width===J.width&&K.height===J.height)return;Nq()})}let J=k(q,I);if(E(J,"div"))return xq(q,J),J;let Q=q.createElement("div");if(Q.id=I,Q.setAttribute("aria-hidden","true"),!xq(q,Q)){let W=k(q,"spawn-ui-root");if(W?.parentElement)W.parentElement.insertBefore(Q,W);else A(q,q.body).appendChild(Q)}if(K)Nq();return Q}function xq(q,J){let Q=k(q,Hq);if(!Q?.parentElement)return!1;if(J.style.zIndex="auto",J.nextSibling!==Q)Q.parentElement.insertBefore(J,Q);return!0}function D(q,J,Q){if(J&&J.parentElement!==q)J.remove();else if(J?.isConnected)return J;let W=q.querySelector(`#${Q}`);if(W)return W;let Y=document.createElement("div");return Y.id=Q,q.appendChild(Y),Y}function Tq(q){let J=D(q,$,N);if($=J,!Fq.has(J))Fq.add(J),J.addEventListener("animationend",function(){J.classList.remove("active"),F(J)},{passive:!0}),J.addEventListener("transitionend",function(Q){if(Q.propertyName==="opacity")F(J)},{passive:!0})}function o(q){if(k(q,fq))return;Uq();let J=document.createElement("style");J.id=fq;J.textContent=`
    #${c} {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 9999;
      font-family: 'Geist Pixel Square', system-ui, sans-serif;
      color: #fff;
    }

    #${p} {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 9;
      font-family: 'Geist Pixel Square', system-ui, sans-serif;
      color: #fff;
    }

    #${I} {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 9998;
      font-family: 'Geist Pixel Square', system-ui, sans-serif;
    }

    #${Mq} {
      position: absolute;
      inset: 0;
      opacity: 0;
      z-index: 1;
      transition: opacity 120ms ease-out;
      background: radial-gradient(circle at center, rgba(0, 0, 0, 0) 38%, rgba(0, 0, 0, 0.2) 62%, rgba(0, 0, 0, 0.5) 80%, rgba(0, 0, 0, 0.85) 92%, rgba(0, 0, 0, 1) 100%);
    }

    #${N} {
      position: absolute;
      inset: 0;
      opacity: 0;
      visibility: hidden;
      z-index: 4;
      border: var(--outline-width, 3px) solid rgba(var(--outline-r, 120), var(--outline-g, 216), var(--outline-b, 255), 0.9);
      box-sizing: border-box;
      filter: drop-shadow(0 0 12px rgba(var(--outline-r, 120), var(--outline-g, 216), var(--outline-b, 255), 0.35));
      transition: opacity 140ms ease-out, border-color 140ms ease-out, border-width 140ms ease-out;
    }

    #${N}.persistent {
      opacity: var(--outline-persistent-opacity, 0.26);
    }

    #${N}.active {
      animation: tome-juice-page-outline var(--outline-pulse-ms, 450ms) ease-out var(--outline-pulses, 1);
    }

    #${a} {
      position: absolute;
      inset: 0;
      opacity: 0;
      visibility: hidden;
      z-index: 3;
      mix-blend-mode: screen;
    }

    #${l},
    #${i} {
      position: absolute;
      left: 0;
      right: 0;
      height: 0;
      opacity: 0;
      background: #000;
      z-index: 2;
      transition: height 120ms ease-out, opacity 120ms ease-out;
    }

    #${l} {
      top: 0;
    }

    #${i} {
      bottom: 0;
    }

    #${R} {
      position: absolute;
      top: 10vh;
      left: 0;
      right: 0;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      align-items: center;
      z-index: 3;
      pointer-events: none;
    }

    /* On a touch screen the top band is god mode's: the undo/redo cluster at 1rem and the first-time hint's fixed card under it \u2014 a toast at 10vh painted over the hint's words and, in landscape, over the cluster. The column starts at the bottom of the tallest card the hint grammar composes, on the forwarded safe-area inset the card follows. */
    @media (pointer: coarse) {
      #${R} {
        top: ${Kq()};
      }
    }

    .tome-juice-toast {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      max-width: min(92vw, 40rem);
      text-align: center;
      padding: 0.5rem 1rem;
      border-radius: 999px;
      background: rgba(8, 10, 14, 0.78);
      border: 1px solid var(--toast-border, rgba(255, 255, 255, 0.22));
      color: var(--toast-color, #ffffff);
      font-size: 1.125rem;
      letter-spacing: 0.04em;
      box-shadow: 0 10px 28px rgba(0, 0, 0, 0.35), 0 0 18px var(--toast-glow, rgba(255, 255, 255, 0.12));
      backdrop-filter: blur(10px);
      opacity: 0;
      transform: translateY(-6px) scale(0.98);
      animation: tome-juice-toast-in 180ms ease-out forwards;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.35);
    }

    .tome-juice-toast.exit {
      animation: tome-juice-toast-out 200ms ease-in forwards;
    }

    .tome-juice-toast img {
      width: 20px;
      height: 20px;
      object-fit: contain;
      filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.35));
    }

    .tome-juice-toast__icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 20px;
      min-height: 20px;
      font-size: 1rem;
      line-height: 1;
      filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.35));
    }

    #${d} {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      z-index: 3;
    }

    .tome-juice-announce {
      max-width: min(90vw, 1080px);
      padding: 0 1rem;
      text-transform: uppercase;
      letter-spacing: -0.01em;
      font-size: clamp(52px, 10vw, 128px);
      line-height: 1;
      color: var(--announce-color, #ffd36f);
      text-shadow:
        0 0 80px var(--announce-glow, rgba(255, 211, 111, 0.6)),
        0 0 40px var(--announce-glow, rgba(255, 211, 111, 0.4)),
        0 2px 0 rgba(0, 0, 0, 0.8);
      opacity: 0;
      transform: scale(1.15);
      animation: tome-juice-announce-in 320ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    .tome-juice-announce.exit {
      animation: tome-juice-announce-out 200ms ease-in forwards;
    }

    .tome-juice-announce__subtitle {
      margin-top: 1rem;
      font-size: clamp(16px, 2.2vw, 28px);
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.7);
      text-shadow: 0 2px 0 rgba(0, 0, 0, 0.6);
    }

    @keyframes tome-juice-toast-in {
      from { opacity: 0; transform: translateY(-10px) scale(0.98); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    @keyframes tome-juice-toast-out {
      from { opacity: 1; transform: translateY(0) scale(1); }
      to { opacity: 0; transform: translateY(-12px) scale(0.98); }
    }

    @keyframes tome-juice-announce-in {
      from { opacity: 0; transform: scale(1.15); }
      to { opacity: 1; transform: scale(1); }
    }

    @keyframes tome-juice-announce-out {
      from { opacity: 1; transform: scale(1); }
      to { opacity: 0; transform: scale(0.96); }
    }

    @keyframes tome-juice-page-outline {
      0% {
        opacity: var(--outline-pulse-start-opacity, 0);
        transform: scale(1.006);
      }
      24% {
        opacity: var(--outline-pulse-peak-opacity, 0.95);
        transform: scale(1);
      }
      100% {
        opacity: var(--outline-pulse-end-opacity, 0);
        transform: scale(1);
      }
    }
  `;A(q,q.head).appendChild(J)}function nq(q,J){let Q=document.createElement("div");Q.className="tome-juice-toast";let W=J.color??16777215;{let q$1=Q,J$1=W;{let q=q$1,J=J$1;let[Q,W,Y]=P(J);q.style.setProperty("--toast-color",`rgb(${Q} ${W} ${Y})`),q.style.setProperty("--toast-border",`rgba(${Q}, ${W}, ${Y}, 0.32)`),q.style.setProperty("--toast-glow",`rgba(${Q}, ${W}, ${Y}, 0.18)`)}}if(J.icon){let j;eq:{let q$3=J.icon;{let q=q$3;let J=q.trim();if(J.length===0){j=null;break eq;}let v$5;qJ:{let q$4=J;{let q=q$4;let J=q.trim();if(!J){v$5=null;break qJ;}let Q=Lq(J);v$5=Q===J&&!J.startsWith("/")&&!J.startsWith("cdn/")&&!J.startsWith("assets/")&&!J.startsWith("http://")&&!J.startsWith("https://")&&!J.startsWith("data:")&&!J.startsWith("blob:")?null:Q;}}let Q=v$5;if(Q){let Y=document.createElement("img");{j=(Y.src=Q,Y.alt="",Y.decoding="async",Y.loading="lazy",Y);break eq;}}let W=document.createElement("span");j=(W.className="tome-juice-toast__icon",W.textContent=J,W.setAttribute("aria-hidden","true"),W);}}if(j)Q.appendChild(j)}let Y=document.createElement("span");Y.textContent=J.message,Q.appendChild(Y),q.insertBefore(Q,q.firstChild);let Z=J.duration*1000;window.setTimeout(()=>Q.classList.add("exit"),Math.max(0,Z-wq)),window.setTimeout(()=>Q.remove(),Z)}function aq(q,J){q.textContent="";let Q=document.createElement("div");Q.className="tome-juice-announce";let W=typeof J.color==="number"?J.color:JJ(J.style);{let q$2=Q,J$2=W;{let q=q$2,J=J$2;let[Q,W,Y]=P(J);q.style.setProperty("--announce-color",`rgb(${Q} ${W} ${Y})`),q.style.setProperty("--announce-glow",`rgba(${Q}, ${W}, ${Y}, 0.5)`)}}let Y=document.createElement("div");if(Y.textContent=J.text,Q.appendChild(Y),J.subtitle){let j=document.createElement("div");j.className="tome-juice-announce__subtitle",j.textContent=J.subtitle,Q.appendChild(j)}q.appendChild(Q);let Z=J.duration*1000;window.setTimeout(()=>Q.classList.add("exit"),Math.max(0,Z-_q)),window.setTimeout(()=>Q.remove(),Z)}function P(q){let J=q>>>0;return[J>>16&255,J>>8&255,J&255]}function JJ(q){switch(q){case"danger":return 16731471;case"discovery":return 5949690;case"death":return 9342611;case"epic":default:return 16765807}}
;

;import{$_w as Qq}from"./4f765d71501e87ea.mjs";import{xBc as Lq}from"./6fa7fcc7a5a3257e.mjs";import{cJd as Uq}from"./9e3c1770-218baebe9e059946.mjs";import{A84 as Hq,CGF as h,EQ7 as Dq,QxN as E,Rmj as s,_24 as Yq,dY0 as A,kaF as U,kin as Xq,mKO as x,xCp as k}from"./aabb4631-1df0904cd068376f.mjs";export{CJ as V4a,HJ as oC2,LJ as usY,MJ as Z3J,NJ as dc1,SJ as t6$,UJ as vpE};
