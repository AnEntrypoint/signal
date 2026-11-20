//# allFunctionsCalledOnLoad
(()=>{"use strict";(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,573188,t=>{t.i(247167);var e=t.i(843476),n=t.i(458914),r=t.i(497925),a=t.i(271645);let o="data-auth-verdict",i=String.raw`(function () {
  try {
    var loc = window.location, root = document.documentElement;
    var query = new URLSearchParams(loc.search);
    var host = String(loc.hostname || '').trim().toLowerCase();
    var bare = host.replace(/^\[|\]$/g, '');
    var parts = bare.split('.').map(function (part) { return parseInt(part, 10); });
    var privateIpv4 = parts.length === 4 &&
      parts.every(function (n) { return n === n && n >= 0 && n <= 255; }) &&
      (parts[0] === 10 || (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) || (parts[0] === 192 && parts[1] === 168));
    var devHost = ['localhost', '127.0.0.1', '::1', '[::1]'].indexOf(host) >= 0 || /\.localhost$/.test(host) ||
      privateIpv4 || /\.(local|lan)$/.test(bare) || /\.ngrok(-free)?\.app$/.test(host);
    var door = query.get('prod') === 'true' ? 'sign-in'
      : ${"false"} && devHost ? 'dev'
      : devHost || host === 'next.spawn.co' || /\.vercel\.app$/.test(host) ? 'manual' : 'sign-in';
    root.setAttribute('${"data-email-door"}', door);
    var verdict = query.get(${JSON.stringify(n.AUTH_ERROR_PARAM)});
    if (verdict && ${JSON.stringify(Object.keys(n.AUTH_VERDICTS))}.indexOf(verdict) >= 0) {
      root.setAttribute('${o}', verdict);
    } else {
      root.removeAttribute('${o}');
    }
  } catch (e) {}
})();`,s=()=>()=>{};function u(){return(0,a.useSyncExternalStore)(s,()=>!1,()=>!0)}t.s(["AUTH_VERDICT_PENDING_CLASS",0,{"sign-in-unfinished":"[html:not([data-auth-verdict=sign-in-unfinished])_&]:hidden","invite-only":"[html:not([data-auth-verdict=invite-only])_&]:hidden"},"AuthAddressStamp",0,function(){return u()?(0,e.jsx)("script",{dangerouslySetInnerHTML:{__html:i}}):null},"EMAIL_DOOR_PENDING_CLASS",0,"[html:not([data-email-door=manual])_&]:hidden","EMAIL_DOOR_STANDS_HIDDEN_CLASS",0,"[html[data-email-door=manual]_&]:hidden","EMAIL_SIGN_IN_PENDING_CLASS",0,"[html:not([data-email-door=manual]):not([data-email-door=sign-in])_&]:hidden","EMAIL_SIGN_UP_SWITCH_PENDING_CLASS",0,"[html[data-email-door=sign-in]_&]:hidden","authVerdictAt",0,function(t){let e=new URLSearchParams(t.search).get(n.AUTH_ERROR_PARAM);return e&&Object.hasOwn(n.AUTH_VERDICTS,e)?e:void 0},"emailDoorAt",0,function(t,e="production"){if("true"===new URLSearchParams(t.search).get("prod"))return"sign-in";let n=(0,r.d)(t.hostname);return"development"===e&&n?"dev":n||(0,r.g)(t.hostname)?"manual":"sign-in"},"useStaticRender",0,u])},197234,t=>{var e=t.i(843476),n=t.i(63027),r=t.i(271645);let a=(0,r.createContext)(null);function o(t,e,n){return t&&(null===e||n&&"sign-in"===e)}let i=(0,r.createContext)(!1);t.s(["AuthModeScope",0,function({children:t}){let n=(0,r.useState)(null);return(0,e.jsx)(a.Provider,{value:n,children:t})},"EmailRoadContext",0,i,"cardHeadline",0,function(t,e,r,a=!1){return null===r||o(void 0!==t,r,a)?t??("sign-up"===e?n.x:n.f):"sign-up"===r?n.x:n.f},"cornerSignInStands",0,function(t,e){return"sign-up"===t&&"sign-in"!==e},"keepsDoorWords",0,o,"useAuthModeOverride",0,function(){let t=(0,r.useContext)(a),e=(0,r.useState)(null);return t??e},"useEmailRoad",0,function(){return(0,r.useContext)(i)}])},230643,366263,t=>{var e=t.i(271645);let n=!1,r=new Set;t.s(["W",0,function(t){n!==t&&(n=t,r.forEach(t=>t()))},"P",0,function(){return(0,e.useSyncExternalStore)(t=>(r.add(t),()=>r.delete(t)),()=>n,()=>!1)}],230643),t.s(["R",0,{shown:"sms_country_refusal_shown",sent:"sms_country_refusal_email_sent"},"E",0,"sms_country_refusal"],366263)}])})();