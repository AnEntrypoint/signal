
var j=Symbol.for("spawn.realmGlobal"),q=function(){let c=Reflect.get(globalThis,j);return typeof c==="object"&&c!==null?c:globalThis},u=Symbol.for("spawn.realmSealReport"),v=function(c){return Reflect.get(c,u)??null},x=v(q());
export{q as EKM};
