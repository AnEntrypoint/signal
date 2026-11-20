
;var G=/^\/(?:cdn|magic)\/[^?#]+\.(?:woff2|woff|ttf|otf)(?=[?#]|$)/i;var J=(function(j,B){try{let q=new URL(j);return q.origin===B&&G.test(q.pathname)}catch{return!1}});var K=(function(j,B,q,E=((x)=>fetch(x))){let x=()=>q({kind:"value.bytes",id:j.id,ok:!1});if(!J(j.url,B))return x(),Promise.resolve();return E(j.url).then((async function(z){if(!z.ok)return z.body?.cancel().catch(function(){return}),x();let C=await z.arrayBuffer(),D=z.headers.get("content-type");q({kind:"value.bytes",id:j.id,ok:!0,bytes:C,...D?{contentType:D}:{}},[C])}),()=>x())});;

;import"./d3a25ac8-d7e2938308309bd9.mjs";export{J as borrowableValueUrl,K as answerValueAsk};
