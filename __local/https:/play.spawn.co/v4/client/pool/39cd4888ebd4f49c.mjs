
var E=(g)=>g==="Chrome OS"||g==="ChromeOS";function G(g,q){if(q!=="arm"&&q!=="x86")return null;let z=E(g);if(!(q==="x86"?z||g==="Linux"||g==="Windows"||g==="macOS":z||g==="Linux"||g==="macOS"))return null;return Math.floor(((z&&q==="arm"?137438953472:1099511627776)-21474836480)/8590000128)}function I(g){return g!==null&&g<18}var j=null,D=null;function K(){if(j!==null)return j;let g=typeof navigator>"u"?void 0:navigator.userAgentData,q=typeof g?.platform==="string"?g.platform:null,z=g?.getHighEntropyValues;if(!E(q)||typeof z!=="function")return D=!1,j=Promise.resolve(!1),j;return a(z,g,q);}function N(){if(j===null)K();return D}
;

function a(z,g,q){return j=z.call(g,["architecture"]).then((B)=>I(G(q,typeof B?.architecture==="string"?B.architecture:null)),()=>!1),j.then((B)=>D=B),j
}

;export{K as LCy,N as ydZ};
