;const{h$e:N}=$Ss;
var q="spawn.world-lane:",x=function(F,c){let j=Reflect.construct,I=function(X,$){return j(F,c(X,$),new.target??I)};I.prototype=F.prototype;try{Object.defineProperty(F.prototype,"constructor",{value:I,writable:!0,configurable:!0,enumerable:!1})}catch{}return I},z=`function sealWorldWorker(names, lane, realm) {
var own = "" + sealWorldWorker;
var owns = Object.prototype.hasOwnProperty;
var protoOf = Object.getPrototypeOf;
var define = Object.defineProperty;
var apply = Reflect.apply;
var construct = Reflect.construct;
var drop = Reflect.deleteProperty;
var spell = String;
var Refusal = TypeError;
var iterator = Symbol.iterator;
var none = [];
var fixed = function (value) {
return { __proto__: null, value: value, writable: false, configurable: false, enumerable: false };
};
var HostLane = realm.BroadcastChannel;
var removed = [];
for (var i = 0; i < names.length; i += 1) {
var found = false;
for (var owner = realm; owner !== null; owner = protoOf(owner)) {
if (!apply(owns, owner, [names[i]])) continue;
found = true;
if (!drop(owner, names[i])) {
try {
define(owner, names[i], fixed(undefined));
} catch (held) {}
}
}
if (found && realm[names[i]] === undefined) removed[removed.length] = names[i];
}
var stood = false;
if (typeof lane === "string" && typeof HostLane === "function") {
var Lane = function BroadcastChannel(name) {
if (!new.target) throw new Refusal("Failed to construct 'BroadcastChannel': Please use the 'new' operator.");
if (arguments.length === 0) throw new Refusal("Failed to construct 'BroadcastChannel': 1 argument required, but only 0 present.");
var word = spell(name);
var made = construct(HostLane, [lane + word], new.target);
define(made, "name", { __proto__: null, value: word, writable: false, configurable: false, enumerable: true });
return made;
};
Lane.prototype = HostLane.prototype;
try {
define(HostLane.prototype, "constructor", { __proto__: null, value: Lane, writable: true, configurable: true, enumerable: false });
} catch (held) {}
try {
define(realm, "BroadcastChannel", fixed(Lane));
stood = true;
} catch (held) {}
}
var Host = realm.Worker;
if (typeof Host !== "function") return { __proto__: null, removed: removed, lane: stood };
var UrlClass = URL;
var objectUrl = URL.createObjectURL;
var hrefOf = Object.getOwnPropertyDescriptor(URL.prototype, "href").get;
var BlobClass = Blob;
var quote = JSON.stringify;
var place = realm.location;
var base = place ? spell(place.href) : undefined;
var call = "(" + own + ")(" + quote(names) + ", " + quote(lane) + ", self);\\n";
var sealModule = null;
var addressOf = function (text) {
var given = false;
var next = function () {
if (given) return { __proto__: null, done: true, value: undefined };
given = true;
return { __proto__: null, done: false, value: text };
};
var parts = [text];
define(parts, iterator, fixed(function () {
return { __proto__: null, next: next };
}));
var blob = new BlobClass(parts, { __proto__: null, type: "text/javascript", endings: "transparent" });
return spell(apply(objectUrl, UrlClass, [blob]));
};
var admit = function (url, options) {
var href = spell(url);
try {
href = spell(apply(hrefOf, new UrlClass(href, base), none));
} catch (unparsed) {}
var module = !!options && options.type === "module";
var born = { __proto__: null, type: module ? "module" : "classic" };
if (options && options.name !== undefined) born.name = spell(options.name);
if (options && options.credentials !== undefined) born.credentials = spell(options.credentials);
if (!module) return [addressOf(call + "importScripts(" + quote(href) + ");\\n"), born];
if (sealModule === null) sealModule = addressOf(call);
return [addressOf("import " + quote(sealModule) + ";\\nimport " + quote(href) + ";\\n"), born];
};
var Born = function Worker(url, options) {
return construct(Host, admit(url, options), new.target || Born);
};
Born.prototype = Host.prototype;
try {
define(Host.prototype, "constructor", { __proto__: null, value: Born, writable: true, configurable: true, enumerable: false });
} catch (held) {}
define(realm, "Worker", fixed(Born));
return { __proto__: null, removed: removed, lane: stood };
}`;var J=function(F,c,j){return N(`return ${z}`)()(c,j,F)};var U=Symbol.for("spawn.realmGlobal"),v=function(){let F=Reflect.get(globalThis,U);return typeof F==="object"&&F!==null?F:globalThis},V=Symbol.for("spawn.realmSealReport"),B=function(F){return Reflect.get(F,V)??null},T=B(v()),M=()=>T,Q=(F)=>T??=B(F),Z=function(F,c=v()){if(T!==null)return T;if(T=B(c)??F,T===F)Object.defineProperty(c,V,{value:F,writable:!1,configurable:!1,enumerable:!1});return T};;
Object.assign($Ss,{A5t:v,C_m:x,DmT:J,J_w:U,N5$:Z,T7M:q,jrE:M,rYR:Q});

;import{S as $Ss}from"./8470e5fcd747a5a5.mjs";export{J as DmT,M as jrE,Q as rYR,U as J_w,Z as N5$,q as T7M,v as A5t,x as C_m};
