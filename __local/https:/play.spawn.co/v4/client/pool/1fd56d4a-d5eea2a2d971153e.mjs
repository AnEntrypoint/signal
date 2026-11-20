var $c0F,$c0N=[],$c0T=[function(){return[()=>'(function(e){if(!(oP.armed&&!oP.throwOnViolation))return!1;let t=aP.get(e);if(t===void 0)return!1;if(!SP.has(t))SP.add(t),Qo.info(`[lume] indirect-layout guard: pipeline "${t}" declares a required vertex layout on a convicted device, so its indirect draws take their direct twins`);return!0})',()=>'(function(e){let t=hL.twinless.get(e)??0;if(hL.twinless.set(e,t+1),t!==0)return;if(!hL.state.armed&&NcM()===null)return;let r="it still reaches the driver\'s indirect path";if(NcM()!==null)r="not drawn: the compiler builds no compute pipeline, and Dawn validates an indirect draw with one";else if(EIy())r="not drawn: the driver hangs on the indirect path";Qo.warn(`[lume] direct-draw arm: pipeline "${e}" draws indirectly with no direct twin; ${r}`)})',()=>"(function(e,t,r){let i=RM(e),n=RM(t),l=Math.floor(i),s=Math.floor(n),o=i-l,a=n-s,u=ely(l,s,r),d=ely(l+1,s,r),f=ely(l,s+1,r),c=ely(l+1,s+1,r),h=o*o*(3-o*2),p=a*a*(3-a*2),m=u+(d-u)*h,g=f+(c-f)*h;return m+(g-m)*p})",()=>"(function(e,t,r,i,n,l,s,o,a){let u=ihl(l,s),d=u>0.0001?l/u:0,f=u>0.0001?s/u:-1,c=DC*0.22,h=(t-i*AC)*c+a*0.31,p=(r-n*AC)*c+a*0.31,m=0.32+0.68*xM(h,p,3.1),g=(xM(h*2.7+19,p*2.7+41,7.7)-0.5)*0.5+Math.sin(o*AC*(2.6+a*2.2)+a*kC)*0.14;e[0]=d*m-f*g,e[1]=f*m+d*g})",()=>'(()=>([[1,"map-read"],[2,"map-write"],[16,"index"],[32,"vertex"],[64,"uniform"],[128,"storage"],[256,"indirect"],[512,"query"],[8,"copy-dst"],[4,"copy-src"]]))',()=>"(function(e){let t=[];for(let r of e.fragment?.targets??[])t.push(r?r.format:null);let r=t.length;while(r>0&&t[r-1]===null)r-=1;return t.length=r,{colors:t,depthStencil:e.depthStencil?.format,samples:e.multisample?.count??1}})",()=>'(function(e,t=null){let r=[];for(let i of e.entries){if(t!==null&&!t.has(i.binding))continue;let v$28;PKd:{let e=i.resource;if((uLW(e)&&"buffer"in e)){v$28=e.size??Number(e.buffer.size)-Number(e.offset??0);break PKd;}if((uLW(e)&&"mapState"in e&&"size"in e)){v$28=Number(e.size);break PKd;}v$28=null;}let e=v$28;if(e===null)continue;r.push([i.binding,e])}return r.sort((e,t)=>e[0]-t[0]),r.map(([e,t])=>`${e}:${t}`).join(",")})',()=>"(function(e,t,r){if(!this.render)return;let i=m2(t),n=e2(i);if(this.toggleKeys.set(e,n),this.building||this.toggles.has(n))return;if(!r){if(!this.pending.has(n))this.buildToggle(n,i);return}try{let{module:e,layout:t}=this.toggleParts(),r=this.within(()=>this.device.createRenderPipeline(R2(e,t,i)));this.toggles.set(n,r)}catch(e){this.toggles.set(n,null),n2(n,e)}})",()=>"(function(){if(this.rebinds+=1,this.firstRebindMs<0)this.firstRebindMs=this.now();if(this.rebinds!==this.nextSaid)return;this.nextSaid*=10,E2.warn(`[lume] storage range latch: ${this.rebinds} rebinds in ${Math.round(this.now()-this.firstRebindMs)} ms (said at 1, 10, 100, 1000 \\u2026)`)})",()=>'(function(){return this.module??=this.device.createShaderModule({label:"lume range latch toggle",code:q2}),this.layout??=this.device.createPipelineLayout({label:"lume range latch toggle",bindGroupLayouts:[]}),{module:this.module,layout:this.layout}})',()=>"(function(e,t){let r;try{let{module:e,layout:i}=this.toggleParts();r=this.within(()=>this.device.createRenderPipelineAsync(R2(e,i,t)))}catch(e){r=Promise.reject(e instanceof Error?e:Error(String(e)))}let i=r.then((t)=>{if(!this.toggles.get(e))this.toggles.set(e,t);this.pending.delete(e)},(t)=>{if(!this.toggles.has(e))this.toggles.set(e,null);this.pending.delete(e),n2(e,t)});return this.pending.set(e,i),i})"]},function(){return[()=>'(async function(){try{let{module:e,layout:t}=this.toggleParts();this.computeToggle=await this.within(()=>this.device.createComputePipelineAsync({label:"lume range latch toggle",layout:t,compute:{module:e,entryPoint:"main"}}))}catch(e){E2.warn(`[lume] storage range latch: the compute toggle did not build (${k$w(e)}), so a dispatch keeps the length of its first dispatch`)}})',()=>"(function(e,t,r,i,n,l){let s=r??null;this.groups[t]=s;this.keys[t]=this.door.keyOf(s);this.offsets[t]=ZKd(i,n,l);if(i instanceof Uint32Array&&n!==void 0&&l!==void 0)return e.setBindGroup(t,r,i,n,l);return lX_(e.setBindGroup,e,t,r,i)})",()=>'(function(e){let t=this.pipeline;if(t===null)return;let r=this.seen,i=this.drawn===t;if(this.drawn=t,r&&i&&!this.changed())return;let n=this.toggleOf(t);if(n===null){this.seen=!1;return}if(this.seen=!0,this.latch(),"end"in e)this.door.onFirstToggle?.();lX_(e.setPipeline,e,n),this.act(),lX_(e.setPipeline,e,t);let l=this.groups;for(let t=0;t<l.length;t++){let r=l[t];if(r===void 0||r===null)continue;lX_(e.setBindGroup,e,t,r,this.offsets[t])}if(r)this.door.noteRebind()})',()=>"(function(e,t){let r=t;while(q_(e.charCodeAt(r))===u_)r++;if(r>t){let i=e.charCodeAt(r),n=!0;if(i===C_){let t=r+1;while(q_(e.charCodeAt(t))===u_)t++;n=t>r+1,r=t,i=e.charCodeAt(r)}if(n&&E_.has(i))r++;else if(n&&(i===C_||H_.has(i)||q_(i)===u_))n=!1;if(n&&r-t<=64)return r-t}v_.lastIndex=t;let i=v_.exec(e)?.[0].length;if(i===void 0)return 1;return i<=64?i:g_.exec(e.slice(t,t+64))?.[0].length??1})",()=>'(function(e,t){let r=0;for(let i=t;i<e.length;i++){let t=e[i].text;if(t==="<")r++;else if(t===">"){if(r--,r===0)return i}else if(t==="("||t==="[")i=U_(e,i,t,t==="("?")":"]");else if(t===";"||t==="{"||t==="}")break}throw new W_(`no > closes the template at ${a_(e,t).start}`)})',()=>'(function(){let e=this.peek(),t=this.at+1<this.to?this.scope.tokens[this.at+1]:void 0;if(e===void 0||t===void 0)return null;if(e.end!==t.start||e.text!==t.text)return null;return e.text==="<"||e.text===">"?e.text+t.text:null})',()=>'(function(){let e=this.peek();if(e===void 0)throw new W_("a constant expression ends early");if(this.at++,e.text==="("){let e=this.shift();if(this.peek()?.text!==")")throw new W_("a constant expression\'s ( is unclosed");return this.at++,e}if(e.text==="-")return-this.primary();if(e.kind==="number"){let t=e.text.replace(/[iu]$/,"");if(/[.eEpPfh]/.test(t)&&!/^0[xX]/.test(t))throw new W_(`a float constant ${e.text} in a size`);return Number(t)}if(e.kind!=="ident")throw new W_(`a constant expression holds ${e.text}`);if((e.text==="u32"||e.text==="i32")&&this.peek()?.text==="("){let e=U_(this.scope.tokens,this.at,"(",")"),t=new baK(this.scope,this.at+1,e).read();return this.at=e+1,t}{let e$6=this.scope,t$4=e.text;{let e=e$6,t=t$4;let r=e.constValues.get(t);if(r!==void 0)return r;let i=e.consts.get(t);if(i===void 0)throw new W_(`a size names ${t}, which is no module constant`);let n=e_(e,i.start,i.end);return e.constValues.set(t,n),n}}})',()=>'(function(e,t,r){let i=e.tokens,n=a_(i,t);if(n.kind!=="ident")throw new W_(`no type at ${n.start}`);let l=n.text;if(l==="f32"||l==="i32"||l==="u32")return{kind:"scalar",scalar:l};if(l==="f16"||l==="bool")throw new W_(`a ${l} is not read here`);let s=t+1<r&&i[t+1].text==="<";let v$2;faK:{let e=l;let t=r_.exec(e);if(t){let e=f_[t[2]];if(e===void 0)throw new W_("a 16-bit vector is not read here");{v$2={kind:"vector",size:z_(t[1]),scalar:e};break faK;}}let r=T_.exec(e);if(r){if(r[3]==="h")throw new W_("a 16-bit matrix is not read here");{v$2={kind:"matrix",columns:z_(r[1]),rows:z_(r[2])};break faK;}}v$2=null;}let o=v$2??_aK(e,l,s?K_(i,t+2,B_(i,t+1)):[]);if(o!==null)return o;let a=e.cache.get(l);if(a)return a;let u=e.aliases.get(l),d=e.structs.get(l),f;if(u)f=b_(e,u.start,u.end);else if(d){f=zaK(e,l,d.start,d.end);}else throw new W_(`the type ${l} is not known here`);return e.cache.set(l,f),f})']},function(){return[()=>'(function(e,t,r){let i=e.scope.tokens,n=l_(i,";",t),l=t+1,s=i[t+1]?.text==="<"&&i[t+2]?.text==="storage";if(i[t+1]?.text==="<")l=B_(i,t+1)+1;let o=a_(i,l).text;if(e.moduleVars.add(o),i[t+1]?.text==="<"&&i[t+2]?.text==="uniform")e.uniforms.push({name:o,group:r.group,binding:r.binding,typeFrom:l+2,typeTo:n});if(!s)return n+1;if(r.group===null||r.binding===null)throw new W_(`storage ${o} has no group or binding`);let a=i[t+3]?.text===","&&i[t+4]?.text==="read_write"?"read_write":"read";return e.storage.push({group:r.group,binding:r.binding,name:o,access:a,typeFrom:l+2,typeTo:n,varAt:t,declTo:n}),n+1})',()=>'(function(e,t,r){let{scope:i}=e,n=i.tokens,l=n[t].text;if(l==="struct"){let e=U_(n,t+2,"{","}");return i.structs.set(a_(n,t+1).text,{start:t+3,end:e}),e+1}if(l==="alias"){let e=l_(n,";",t);return i.aliases.set(a_(n,t+1).text,{start:t+3,end:e}),e+1}if(l==="const"||l==="override"){let r=l_(n,";",t),s=l_(n,"=",t);if(l==="const"&&s<r)i.consts.set(a_(n,t+1).text,{start:s+1,end:r});return e.moduleVars.add(a_(n,t+1).text),r+1}if(l==="var"){return GaK(e,t,r);}if(l==="fn"){{let r$4=r.stage;{let r=r$4;let i=e.scope.tokens,n=t+2,l=U_(i,n,"(",")"),s=l_(i,"{",l),o=U_(i,s,"{","}");return e.functions.push({name:a_(i,t+1).text,stage:r,paramsFrom:n+1,paramsTo:l,bodyFrom:s+1,bodyTo:o}),o+1}}}if(l==="{")return U_(n,t,"{","}")+1;return t+1})',()=>'(function(e){let v$1;{let t=[],r=e.length,i=0;while(i<r){let n=e.charCodeAt(i);let l=q_(n);if(l===w_){i++;continue}if(n===y_){let t=UmR(e,i);if(t!==i){i=t;continue}}let s=i+1,o="punct";if(l===i_){while(s<r&&(q_(e.charCodeAt(s))&(i_|u_))!==0)s++;o="ident"}else if(l===u_||n===C_&&q_(e.charCodeAt(i+1))===u_){s=i+saK(e,i);o="number";}else if(__(n,e.charCodeAt(i+1)))s=i+2;t.push({text:e.slice(i,s),start:i,end:s,kind:o}),i=s}v$1=t;}let t=v$1;let r={scope:{structs:new Map,aliases:new Map,consts:new Map,tokens:t,cache:new Map,constValues:new Map},storage:[],uniforms:[],functions:[],moduleVars:new Set};let i={group:null,binding:null,stage:null};let n=0;while(n<t.length){if(t[n].text==="@"){let v$4;AaK:{let e$7=r.scope,t$5=n,r$3=i;{let e=e$7,t=t$5,r=r$3;let i=e.tokens,n=a_(i,t+1).text;if(c_.has(n))r.stage=n==="vertex"||n==="fragment"?n:"compute";if(i[t+2]?.text!=="("){v$4=t+2;break AaK;}let l=U_(i,t+2,"(",")");if(n==="group")r.group=e_(e,t+3,l);if(n==="binding")r.binding=e_(e,t+3,l);v$4=l+1;}}n=v$4;continue}n=$aK(r,n,i);i={group:null,binding:null,stage:null}}return r})',()=>'(()=>(new Set(["(",",","=","[","{",";",":","return","+","-","*","/","%","<",">","<=",">=","==","!=","&&","||","!","~","&","|","^","+=","-=","*=","/=","%=","&=","|=","^=","->"])))',()=>'(function(e){switch(e.kind){case"scalar":return e.scalar;case"vector":return`vec${e.size}<${e.scalar}>`;case"matrix":return`mat${e.columns}x${e.rows}<f32>`;case"array":if(e.count===null)throw new W_("a runtime-sized array is read whole");return`array<${j_(e.element)}, ${e.count}>`;case"struct":return e.name;case"atomic":throw new W_("an atomic in read-only storage")}})',()=>'(function(e){let t=`${h_}${e.decl.name}`,r=e.storage?"0u":"0u, 0",i=[`fn ${t}_t(w: u32) -> vec4<u32> {\n  let t = w >> 2u;\n  let across = textureDimensions(${t}).x;\n  return textureLoad(${t}, vec2<u32>(t & (across - 1u), t >> countTrailingZeros(across)), ${r});\n}`];if(e.needsLength)i.push(`fn ${t}_bytes() -> u32 {\n  return textureLoad(${t}, vec2<u32>(0u, textureDimensions(${t}).y - 1u), ${r}).x;\n}`);for(let t of e.loaders.values())i.push(t);return i})']},function(){return[()=>'(function(e,t,r){let{tokens:i,source:n}=e;if(t>=r)return"";let l="",s=i[t].start,o=t;while(o<r){let t=M_(e,o,r);if(t)l+=n.slice(s,t.edit.from)+t.edit.text,s=t.edit.to;o=t?t.next:o+1}return l+n.slice(s,i[r-1].end)})',()=>'(function(e,t){let{tokens:r}=e,i=e.byName.get(r[t+3]?.text??"");if(!i)return null;let n=U_(r,t+1,"(",")"),l=i.type,s=0;for(let e=t+4;e<n;e+=2){let t=r[e+1]?.text,n=r[e].text==="."&&l.kind==="struct"?l.members.find((e)=>e.name===t):void 0;if(!n)throw new W_(`arrayLength(&${i.decl.name}...) is not a member path`);s+=n.offset,l=n.type}if(l.kind!=="array"||l.count!==null)throw new W_(`arrayLength(&${i.decl.name}) of a sized type`);return{edit:{from:r[t].start,to:r[n].end,text:`((${(i.needsLength=!0,`${h_}${i.decl.name}_bytes()`)} - ${s}u) / ${l.stride}u)`},next:n+1}})',()=>'(function(e,t,r){let{tokens:i,pointers:n}=e,l=i[t].text,s=-1,o=-1;if(l==="("&&i[t+1]?.text==="*"&&i[t+3]?.text===")")[s,o]=[t+2,t+4];else if(l==="*"&&(X_??=$c0I(22)).has(i[t-1]?.text??"("))[s,o]=[t+1,t+2];else if(i[t].kind==="ident"&&i[t-1]?.text!==".")[s,o]=[t,t+1];let a=i[s]?.text??"",u=n.get(a);if(!u)return null;let d=s_(e,u.lowered,a,u.type,o,r);if(s===t&&d.next===o)throw new W_(`the pointer ${a} to ${u.lowered.decl.name} is passed on`);return V_(e,t,d,L_(u.lowered,d))})',()=>'(function(e,t,r){let{tokens:i,byName:n}=e,l=i[t];if(l.text==="arrayLength"&&i[t+1]?.text==="("&&i[t+2]?.text==="&"){return JaK(e,t);}if(l.text==="let"&&i[t+1]?.kind==="ident"){{let{tokens:i}=e,n=t+2;if(i[n]?.text===":")while(n<r&&i[n].text!=="="&&i[n].text!==";")n++;let l=i[n]?.text==="="&&i[n+1]?.text==="&"?e.byName.get(i[n+2]?.text??""):void 0;if(!l)return null;let s=s_(e,l,"",l.type,n+3,r);if(i[s.next]?.text!==";")throw new W_(`a pointer to ${l.decl.name} inside an expression`);return e.pointers.set(a_(i,t+1).text,{lowered:l,type:s.type}),V_(e,t+2,s,` = (${s.offset})`)}}let s=e.pointers.size>0?daK(e,t,r):null;if(s)return s;if(l.kind!=="ident"||i[t-1]?.text===".")return null;let o=n.get(l.text);if(!o)return null;if(i[t-1]?.text==="&"&&(X_??=$c0I(22)).has(i[t-2]?.text??"("))throw new W_(`a pointer to ${l.text}`);let a=s_(e,o,"",o.type,t+1,r);return V_(e,t,a,L_(o,a))})',()=>'(function(e){let v$5;gLz:{if(!e.includes("@vertex")){v$5=!1;break gLz;}let t=Array.from(e.matchAll(Gi),(e)=>e[1]);if(t.length===0){v$5=!1;break gLz;}v$5=new RegExp(`\\\\b(?:${t.join("|")})\\\\b(?:\\\\s*\\\\.\\\\s*[A-Za-z_]\\\\w*|\\\\s*\\\\[\\\\s*\\\\d+[iu]?\\\\s*\\\\])*\\\\s*\\\\[(?!\\\\s*\\\\d+[iu]?\\\\s*\\\\])`).test(e);}if(!v$5)return e;try{return PLz(cLz(e),e)}catch(t){if(t instanceof W_)return e;throw t}})',()=>'(function(e,t,r,i,n,l){let s=e.scope.tokens,o=t.get(r.name)??b_(e.scope,r.typeFrom,r.typeTo);t.set(r.name,o);let a=i+1;while(a<n){let t=s[a].text;if(t==="."&&o.kind==="struct"){let e=s[a+1]?.text,t=o.members.find((t)=>t.name===e);if(t===void 0)return null;o=t.type,a+=2;continue}if(t!=="["||o.kind!=="array"&&o.kind!=="matrix"&&o.kind!=="vector")return null;let r=U_(s,a,"[","]");let v$6;oLz:{let t=a+1;try{{v$6=(e_(e.scope,t,r),!0);break oLz;}}catch(e){if(e instanceof W_){v$6=!1;break oLz;}throw e}}if(!v$6)return o.kind==="vector"&&!l?null:{at:i,open:a,close:r,indexed:o};o=G_(o),a=r+1}return null})']},function(){return[()=>'(function({shape:e,picked:t,uniformAt:r,pickedSite:i},n){if(t.size===0)return n;let l=e.scope.tokens;let s=new Map;let o=function(e){let t=n.slice(l[e.at].start,l[e.open-1].end).replace(/\\s+/g,"");if(/\\/[/*]/.test(t))throw new W_(`a comment in the path ${t}`);let r=s.get(t);if(r!==void 0)return r.name;let i=`${Oi}${t.replace(/\\W+/g,"_")}_${s.size}`;let o=`fn ${i}(i: u32) -> ${j_(G_(e.indexed))} {\n${Ti(t,0,mLz(e.indexed),"  ")}}`;return s.set(t,{name:i,text:o}),i};let a=function(e,t,s){if(t>=s)return"";let u="",d=l[t].start;for(let f=t;f<s;f++){let t=r(e,f),c=t!==void 0?i(e,t,f,s):null;if(c===null)continue;u+=`${n.slice(d,l[f].start)}${o(c)}(u32(${a(e,c.open+1,c.close)}))`;d=l[c.close].end;f=c.close}return u+n.slice(d,l[s-1].end)};let u="";let d=0;for(let t of e.functions){if(t.bodyFrom>=t.bodyTo)continue;let e=a(t,t.bodyFrom,t.bodyTo);u+=n.slice(d,l[t.bodyFrom].start)+e,d=l[t.bodyTo-1].end}return u+=n.slice(d),`${u}\n\n${Array.from(s.values(),(e)=>e.text).join(`\n\n`)}\n`})',()=>"(()=>(/@interpolate\\(\\s*linear\\s*(?:,\\s*(center|centroid|sample)\\s*)?\\)/g))",()=>'(function(e,t){return(t?ULz(e):e).replace(On,"@interpolate(flat, either)").replace((hn??=$c0I(32)),(e,t)=>`@interpolate(perspective, ${t==="centroid"?"centroid":"center"})`).replace(xn,"@interpolate(perspective, center)").replace(Pn,(e,t)=>`${t}(`)})',()=>'(function(e){let t=Array.from(e.entries);if(t.some((e)=>e.sampler?.type==="comparison")||!t.some((e)=>e.texture?.sampleType==="depth"))return e;return{...e,entries:t.map((e)=>e.texture?.sampleType==="depth"?{...e,texture:{...e.texture,sampleType:"unfilterable-float"}}:e)}})',()=>'(function(e){return{format:sb1,depthWriteEnabled:e==="depth",depthCompare:e==="depth"?dlr:"always",stencilFront:{compare:"always",passOp:"increment-clamp"},stencilBack:{compare:"always",passOp:"increment-clamp"}}})',()=>"(function(){if(E6){return((G4||P6||uW&&J6)?0:mOt)|($6||OW?0:NxB)|(b6||a6?0:II1)|((A6||s6||(!0)&&C6)?0:s9h)|(EW||F6?0:zkI);}return kW?((G4||P6||uW&&J6)?0:mOt)|($6?0:NxB)|(b6?0:II1)|((A6||s6||(!1)&&C6)?0:s9h)|(EW?0:zkI):0})",()=>"(function(e,t,r,i){let n=t[r],l=ese(n),s=(i.mieScattering+i.mieAbsorption)*tWZ(n),o=Vil(n);return e[0]=i.rayleighScattering[0]*l+s+i.ozoneAbsorption[0]*o,e[1]=i.rayleighScattering[1]*l+s+i.ozoneAbsorption[1]*o,e[2]=i.rayleighScattering[2]*l+s+i.ozoneAbsorption[2]*o,e})",()=>"(()=>({rayleighScattering:[0,0,0],mieScattering:NaN,mieAbsorption:NaN,mieAnisotropy:NaN,ozoneAbsorption:[0,0,0],groundAlbedo:[0,0,0]}))",()=>"(function(e,t){let r=BC[UC],i=Math.sqrt(Math.max(1-r*r,0));oC[0]=0;oC[1]=BC[YC];oC[2]=0;PC[0]=i;PC[1]=r;PC[2]=0;{let t$7=oC,r$5=PC,i$1=t;{let t=t$7,r=r$5,i=i$1;wK(BC,cC,t,r,FsC);let n=Math.max(BC[cC],0)/_UH;BC[MC]=0,BC[MC+1]=0,BC[MC+2]=0;for(let e=0;e<_UH;e++){let l=(e+0.5)*n;KC[0]=t[0]+r[0]*l,KC[1]=t[1]+r[1]*l,KC[2]=t[2]+r[2]*l,W20(KC,0,1,BC,HC),BC[HC]-=VFZ;let s=ZK(IC,BC,HC,i);BC[MC]+=s[0]*n,BC[MC+1]+=s[1]*n,BC[MC+2]+=s[2]*n}return e[0]=Math.exp(-BC[MC]),e[1]=Math.exp(-BC[MC+1]),e[2]=Math.exp(-BC[MC+2]),e}}})",()=>"(function(e,t,r,i){let n=(e%RC+0.5)/RC,l=(Math.floor(e/RC)+0.5)/RC,s=1-n*2,o=Math.sqrt(Math.max(1-s*s,0)),a=l*2*Math.PI;tC[0]=o*Math.cos(a),tC[1]=s,tC[2]=o*Math.sin(a),wK(BC,cC,t,tC,VFZ);let u=BC[cC];if(wK(BC,cC,t,tC,FsC),u>0)BC[GC]=u;else BC[GC]=Math.max(BC[cC],0);BC[TC]=BC[GC]/LC,xC[0]=1,xC[1]=1,xC[2]=1,CC[0]=0,CC[1]=0,CC[2]=0,sC[0]=0,sC[1]=0,sC[2]=0;for(let e=0;e<LC;e++){fU8(e,t,r,i);}if(u>0){BC[bC]=u,uC(t,tC),eC();let e=rC[0]*r[0]+rC[1]*r[1]+rC[2]*r[2];BC[YC]=VFZ,BC[UC]=e;let n=zC(nC,i);for(let t=0;t<3;t++)CC[t]+=xC[t]*n[t]*Math.max(e,0)*i.groundAlbedo[t]*(1/Math.PI)}for(let e=0;e<3;e++)BC[iC+e]+=CC[e],BC[WC+e]+=sC[e]})"]},function(){return[()=>"(function(e,t,r,i){let n=BC[TC];BC[bC]=(e+0.5)*n,uC(t,tC),eC(),BC[UC]=rC[0]*r[0]+rC[1]*r[1]+rC[2]*r[2];let l=BC[YC]-VFZ;BC[HC]=l;let s=lC(i);let o=i.mieScattering*tWZ(l);let a=ese(l);gC[0]=i.rayleighScattering[0]*a+o,gC[1]=i.rayleighScattering[1]*a+o,gC[2]=i.rayleighScattering[2]*a+o;let u=zC(nC,i);let d;{let e=yC,t=rC;fC[0]=e[0]+t[0]*mp1;fC[1]=e[1]+t[1]*mp1;fC[2]=e[2]+t[2]*mp1;d=rCj(fC,r,VFZ)<0?1:0;}for(let e=0;e<3;e++){let t=Math.exp(-s[e]*n),r=gC[e]*u[e]*d*(1/(4*Math.PI));CC[e]+=xC[e]*(r-r*t)/s[e],sC[e]+=xC[e]*(gC[e]-gC[e]*t)/s[e],xC[e]*=t}})",()=>"(function(e,t,r,i,n,l,s){let o=BC[TC];if(BC[bC]=(t+0.5)*o,uC(SC,r),s&&BC[YC]<VFZ){let e=VFZ/Math.max(BC[YC],0.001);yC[0]*=e,yC[1]*=e,yC[2]*=e,W20(yC,0,1,BC,YC)}eC(),BC[UC]=rC[0]*i[0]+rC[1]*i[1]+rC[2]*i[2];let a=BC[YC]-VFZ;BC[HC]=a;let u=lC(n);let d=ese(a);let f=n.mieScattering*tWZ(a);let c=zC(nC,n);let h;{let e=yC,t=rC,r=i;fC[0]=e[0]+t[0]*mp1;fC[1]=e[1]+t[1]*mp1;fC[2]=e[2]+t[2]*mp1;h=rCj(fC,r,VFZ)<0?1:0;}let p=BC[_C];let m=BC[FC];for(let t=0;t<3;t++){let r=n.rayleighScattering[t]*d,i=(r*p+f*m)*c[t]*h+(r+f)*l[t],s=Math.exp(-u[t]*o);e[t]+=xC[t]*(i-i*s)/u[t],xC[t]*=s}})",()=>"(function(e,t=ZQr,r=VC){let i;{for(let t=0;t<3;t++)void 0,(vC??=$c0I(38)).rayleighScattering[t]=e.rayleighScattering[t],(vC??=$c0I(38)).ozoneAbsorption[t]=e.ozoneAbsorption[t],(vC??=$c0I(38)).groundAlbedo[t]=e.groundAlbedo[t];i=((vC??=$c0I(38)).mieScattering=e.mieScattering,(vC??=$c0I(38)).mieAbsorption=e.mieAbsorption,(vC??=$c0I(38)).mieAnisotropy=e.mieAnisotropy,(vC??=$c0I(38)));}let n=Math.max(-1,Math.min(1,e.sunDirection[1]));ZC[0]=Math.sqrt(Math.max(1-n*n,0));ZC[1]=n;ZC[2]=0;{let e$9=$C,t$8=VFZ+yQ4,r$6=n;{let e=e$9,t=t$8,r=r$6;let n=pC;n[0]=Math.sqrt(Math.max(1-r*r,0)),n[1]=r,n[2]=0;let l=hC;l[0]=0,l[1]=t,l[2]=0;for(let e=0;e<3;e++)BC[iC+e]=0,BC[WC+e]=0;for(let e=0;e<OC;e++){zU8(e,l,n,i);}for(let t=0;t<3;t++)e[t]=BC[iC+t]/OC/Math.max(1-BC[WC+t]/OC,0.001);(e);}}let l=Math.max(-1,Math.min(1,t)),s=Math.sqrt(Math.max(1-l*l,0));BC[XC]=0,BC[XC+1]=0,BC[XC+2]=0;for(let t=0;t<r;t++){let n=(t+0.5)/r*2*Math.PI;mC[0]=s*Math.cos(n),mC[1]=l,mC[2]=s*Math.sin(n);let v$29;{let e$50=QC,t$36=mC,r$19=ZC,i$9=i,n$3=$C,l$1=e.openSky>0.5;{let e=e$50,t=t$36,r=r$19,i=i$9,n=n$3,l=l$1;wK(BC,cC,SC,t,VFZ);let s=BC[cC];if(wK(BC,cC,SC,t,FsC),s>0&&!l)BC[GC]=s;else BC[GC]=Math.max(BC[cC],0);BC[TC]=BC[GC]/JC;let o=t[0]*r[0]+t[1]*r[1]+t[2]*r[2];BC[_C]=(3/(16*Math.PI)*(1+o*o));BC[FC]=tCj(o,i.mieAnisotropy);xC[0]=1;xC[1]=1;xC[2]=1;e[0]=0;e[1]=0;e[2]=0;for(let s=0;s<JC;s++){FU8(e,s,t,r,i,n,l);}v$29=e;}}let o=v$29;for(let e=0;e<3;e++)BC[XC+e]+=o[e]/r}return[BC[XC]*e.sunIlluminance[0],BC[XC+1]*e.sunIlluminance[1],BC[XC+2]*e.sunIlluminance[2]]})",()=>"(()=>(/\\bfn\\s+(?:shade_seaMap\\w*|shade_cloudSeaMapped|shade_cloudSea)\\s*\\(/))",()=>'(function(e){if(!(jB??=$c0I(44)).test(e)||!tB.test(e))return e;let t=e;for(let e=t.search((jB??=$c0I(44)));e>=0;e=t.search((jB??=$c0I(44)))){let r=cB(t,e);t=t.slice(0,e)+t.slice(e,r).replace(/[^\\n]+/g,"")+t.slice(r)}return t.replace(/\\bshade_cloudSeaSlice\\b/g,"shade_cloudSea")})',()=>'(function(e,t,r,i){let n=e.texture,l=t.texture;if(n.format!==l.format||!Qv.has(l.format))return!1;if((n.dimension??"2d")!=="2d"||(l.dimension??"2d")!=="2d"||(n.sampleCount??1)>1||(l.sampleCount??1)>1)return!1;if((e.aspect??"all")!=="all"||(t.aspect??"all")!=="all")return!1;if((l.usage&16)===0||(n.usage&4)===0)return!1;if((n.textureBindingViewDimension??"2d-array")!=="2d-array")return!1;let[s,o]=Mv(e.origin),[a,u]=Mv(t.origin);if(s!==0||o!==0||a!==0||u!==0)return!1;let d=t.mipLevel??0;return r===Gv(l.width,d)&&i===Gv(l.height,d)})']},function(){return[()=>'(function(){if(this.layers!==null)return this.layers;let e=this.layerCount,t=new Uint32Array(e*pv/4);for(let r=0;r<e;r+=1)t[r*pv/4]=r;return this.layers=this.device.createBuffer({label:"lume layer copy layers",size:t.byteLength,usage:72}),this.device.queue.writeBuffer(this.layers,0,t),this.layers})',()=>'(function(e,t,r,i,n){let l=this.pipelineFor(r.format),s=this.layout;if(s===null)throw Error("lume layer copy: its layout was not made");let o=this.device.createBindGroup({label:"lume layer copy",layout:s,entries:[{binding:0,resource:e},{binding:1,resource:{buffer:this.layerTable(),offset:t*pv,size:4}}]});return{pipeline:l,group:o,view:r.createView({label:"lume layer copy target",dimension:"2d",baseMipLevel:i,mipLevelCount:1,baseArrayLayer:n,arrayLayerCount:1})}})',()=>'(function(e,t,r,i,n,l){let{pipeline:s,group:o,view:a}=this.drawOf(t,r,i,n,l),u=e.forPass().beginRenderPass({label:"lume layer copy",colorAttachments:[{view:a,loadOp:"clear",storeOp:"store",clearValue:kRa}]});u.setPipeline(s),u.setBindGroup(0,o),u.draw(3),u.end()})',()=>"(function(e,t,r,i){let n=Xv.get(e);if(n===void 0)return null;let[l,s,o]=Iv(i),a=Mv(r.origin);if(a[2]===0&&o===1||!n.takes(t,r,l,s))return null;let u=Mv(t.origin),d=n.sourceView(t.texture,t.mipLevel??0),f=[];for(let e=a[2]===0?1:0;e<o;e+=1)f.push(n.drawOf(d,u[2]+e,r.texture,r.mipLevel??0,a[2]+e));return f})",()=>'(function(e,t,r,i,n){let l=Math.max(1,Math.floor(i)),s=Math.max(1,Math.floor(n)),o=e.get(r);if(o?.width===l&&o.height===s)return o;if(o){Va(o);}let[a,u]=([Math.max(1,Math.ceil(Math.max(1,Math.floor(l))/tcv)),Math.max(1,Math.ceil(Math.max(1,Math.floor(s))/tcv))]);let d=t.createTexture({label:"sky ask",size:{width:a,height:u},format:WWl,usage:20});let f=t.createTexture({label:"sky kept",size:{width:l,height:s},format:WWl,usage:21});let c=t.createTexture({label:"sky kept last",size:{width:l,height:s},format:WWl,usage:6});let h={width:l,height:s,ask:d,askView:d.createView({label:"sky ask"}),kept:f,keptView:f.createView({label:"sky kept"}),last:c,lastView:c.createView({label:"sky kept last"}),frames:0,askPass:null,keepPass:null,copy:{src:f,srcLayer:0,dst:c,dstLayer:0,width:l,height:s},askLane:null,askLaneFrom:Aa(),keepLane:null,keepLaneFrom:Aa(),lane:null,laneFrom:Aa(),dome:null};return e.set(r,h),h})',()=>'(({N:e,V:t,albedo:r,roughness:i,metalness:n,occlusion:l})=>`(shade_cookTorranceSun(${e}, ${t}, normalize(passLights.sunDirection), ${r}, ${i}, ${n}, (passLights.sunColor * passLights.sunIntensity), passLights.iblParams.z) + shade_ambientPbr(${e}, ${t}, ${r}, ${i}, ${n}, passLights.ambientColor)${l===void 0?"":` * ${l}`})`)',()=>"(()=>(`fn shade_bicubicLevel(t: texture_2d<f32>, s: sampler, uv: vec2<f32>, mip: i32) -> vec3<f32> {\n  let size = vec2<f32>(textureDimensions(t, mip));\n  let texel = 1.0 / size;\n  let scaled = uv * size + 0.5;\n  let iuv = floor(scaled);\n  let a = fract(scaled);\n  let w0 = (a * (a * (3.0 - a) - 3.0) + 1.0) / 6.0;\n  let w1 = (a * a * (3.0 * a - 6.0) + 4.0) / 6.0;\n  let w2 = (a * (a * (3.0 - 3.0 * a) + 3.0) + 1.0) / 6.0;\n  let w3 = a * a * a / 6.0;\n  let g0 = w0 + w1;\n  let g1 = w2 + w3;\n  let h0 = w1 / g0 - 1.0;\n  let h1 = w3 / g1 + 1.0;\n  let lod = f32(mip);\n  let p0 = textureSampleLevel(t, s, (iuv + vec2<f32>(h0.x, h0.y) - 0.5) * texel, lod).rgb;\n  let p1 = textureSampleLevel(t, s, (iuv + vec2<f32>(h1.x, h0.y) - 0.5) * texel, lod).rgb;\n  let p2 = textureSampleLevel(t, s, (iuv + vec2<f32>(h0.x, h1.y) - 0.5) * texel, lod).rgb;\n  let p3 = textureSampleLevel(t, s, (iuv + vec2<f32>(h1.x, h1.y) - 0.5) * texel, lod).rgb;\n  return g0.y * (g0.x * p0 + g1.x * p1) + g1.y * (g0.x * p2 + g1.x * p3);\n}\nfn shade_transmissionSample(t: texture_2d<f32>, s: sampler, uv: vec2<f32>, frost: f32) -> vec3<f32> {\n  let maxLevel = f32(textureNumLevels(t) - 1u);\n  let lod = clamp(log2(f32(textureDimensions(t, 0).x)) * frost, 0.0, maxLevel);\n  let low = floor(lod);\n  let near = shade_bicubicLevel(t, s, uv, i32(low));\n  if (low >= maxLevel) {\n    return near;\n  }\n  return mix(near, shade_bicubicLevel(t, s, uv, i32(low) + 1), lod - low);\n}\nfn shade_transmitted(scene: vec3<f32>, albedo: vec3<f32>, N: vec3<f32>, V: vec3<f32>, metalness: f32) -> vec3<f32> {\n  let f0 = mix(shade_specularF0, albedo, metalness);\n  let F = shade_fresnelSchlick(max(dot(N, V), 0.0), f0);\n  return scene * albedo * (1.0 - metalness) * (vec3<f32>(1.0) - F);\n}`))"]},function(){return[()=>"(()=>(`fn shade_volumeRay(N: vec3<f32>, V: vec3<f32>, thickness: f32, ior: f32, scale: vec3<f32>) -> vec3<f32> {\n  let bent = refract(-V, normalize(N), 1.0 / max(ior, 1e-4));\n  return select(normalize(bent), -V, dot(bent, bent) < 1e-12) * thickness * scale;\n}\nfn shade_volumeUv(P: vec3<f32>, ray: vec3<f32>) -> vec2<f32> {\n  let clip = frame.viewProj * vec4<f32>(P + ray, 1.0);\n  return clip.xy / clip.w * vec2<f32>(0.5, -0.5) + vec2<f32>(0.5);\n}\nfn shade_volumeAttenuation(ray: vec3<f32>, color: vec3<f32>, distance: f32) -> vec3<f32> {\n  return select(exp(log(max(color, vec3<f32>(1e-6))) * (length(ray) / distance)), vec3<f32>(1.0), distance == 0.0);\n}`))",()=>'(function(e){let t=(t)=>(e&t)!==0,r=[];if(t(Wuf))r.push("iridescence: f32","iridescenceFresnel: vec3<f32>","iridescenceF0Dielectric: vec3<f32>","iridescenceF0Metallic: vec3<f32>");if(t($nB))r.push("anisotropy: f32","anisotropyT: vec3<f32>","anisotropyB: vec3<f32>");if(t(ekR))r.push("sheen: vec3<f32>","sheenRoughness: f32");if(t(ohL))r.push("sssColor: vec3<f32>","sssDistortion: f32","sssAmbient: f32","sssAttenuation: f32","sssPower: f32","sssScale: f32");let i=[`struct ShadePhysical {\n${[...r,"written: f32"].map((e)=>`  ${e},`).join(`\n`)}\n}\nvar<private> shade_physical: ShadePhysical;${t(NKj)?`\nvar<private> shade_specularF90: f32 = 1.0;`:""}`];i.push(`const SHADE_PHYSICAL_FACING_FLOOR: f32 = ${t(ohL)?"-2.0":"0.0"};`);if(t(Wuf))i.push((tu??=$c0I(61)));if(t($nB))i.push((Zu??=$c0I(62)));if(t(ekR))i.push((hu??=$c0I(63)));i.push(K7u(e),E7u(e),z7u(e));return i.join(`\n`)})',()=>'(function(e){let t=[];if(e&NKj)t.push("specularF90");if(e&Wuf)t.push("iridescence","iridescenceIOR","iridescenceThickness");if(e&$nB)t.push("anisotropy","anisotropyTangent","anisotropyBitangent");if(e&ekR)t.push("sheen","sheenRoughness");if(e&ohL)t.push("thicknessColor","thicknessDistortion","thicknessAmbient","thicknessAttenuation","thicknessPower","thicknessScale");return t})',()=>'(()=>({anisotropy:"vec2<f32>",anisotropyTangent:"vec3<f32>",anisotropyBitangent:"vec3<f32>",sheen:"vec3<f32>",thicknessColor:"vec3<f32>"}))',()=>'(function(e){let t=eu(e).map((e)=>`, ${e}: ${(lu??=$c0I(57))[e]??"f32"}`),r=["  var s: ShadePhysical;","  s.written = 1.0;"];if(e&NKj)r.push("  shade_specularF90 = specularF90;");if(e&Wuf)r.push("  let dotNVi = clamp(dot(N, V), 0.0, 1.0);","  let film = shade_iridescenceFresnels(1.0, iridescenceIOR, dotNVi, iridescenceThickness, shade_specularF0, albedo);","  s.iridescence = iridescence;","  s.iridescenceFresnel = mix(film.dielectric, film.metallic, metalness);","  s.iridescenceF0Dielectric = shade_schlickToF0(film.dielectric, 1.0, dotNVi);","  s.iridescenceF0Metallic = shade_schlickToF0(film.metallic, 1.0, dotNVi);");if(e&$nB)r.push("  let strength = length(anisotropy);","  let direction = select(anisotropy / max(strength, 1e-8), vec2<f32>(1.0, 0.0), strength == 0.0);","  s.anisotropy = clamp(strength, 0.0, 1.0);","  let tangentRaw = anisotropyTangent - N * dot(N, anisotropyTangent);","  let around = normalize(cross(N, select(vec3<f32>(1.0, 0.0, 0.0), vec3<f32>(0.0, 0.0, 1.0), abs(N.x) > 0.9)));","  let tangent = select(around, normalize(tangentRaw), dot(tangentRaw, tangentRaw) > 1e-20);","  let bitangent = cross(N, tangent) * select(-1.0, 1.0, dot(cross(N, tangent), anisotropyBitangent) >= 0.0);","  s.anisotropyT = tangent * direction.x + bitangent * direction.y;","  s.anisotropyB = bitangent * direction.x - tangent * direction.y;");if(e&ekR)r.push("  s.sheen = sheen;","  s.sheenRoughness = clamp(sheenRoughness, 0.0001, 1.0);");if(e&ohL)r.push("  s.sssColor = thicknessColor;","  s.sssDistortion = thicknessDistortion;","  s.sssAmbient = thicknessAmbient;","  s.sssAttenuation = thicknessAttenuation;","  s.sssPower = thicknessPower;","  s.sssScale = thicknessScale;");return r.push("  return s;"),`fn shade_physicalSurface(N: vec3<f32>, V: vec3<f32>, albedo: vec3<f32>, metalness: f32${t.join("")}) -> ShadePhysical {\n${r.join(`\n`)}\n}`})']},function(){return[()=>'(function(e){let t=["  let s = shade_physical;","  var color = vec3<f32>(0.0);"];if(e&ohL)t.push("  let scatterHalf = normalize(L + N * s.sssDistortion);","  let scatter = pow(clamp(dot(V, -scatterHalf), 0.0, 1.0), s.sssPower) * s.sssScale;","  color = (scatter + s.sssAmbient) * s.sssColor * s.sssAttenuation * sunRadiance;");if(t.push("  let NdotL = max(dot(N, L), 0.0);","  if (NdotL <= 0.0) { return color; }","  let H = normalize(V + L);","  let NdotV = max(dot(N, V), 1e-4);","  let NdotH = max(dot(N, H), 0.0);","  var F = shade_fresnelSchlick(max(dot(H, V), 0.0), mix(shade_specularF0, albedo, metalness));"),e&Wuf)t.push("  F = mix(F, s.iridescenceFresnel, s.iridescence);");if(e&$nB)t.push("  let specular = F * shade_anisotropicLobe(V, L, H, NdotV, NdotL, NdotH, roughness, s.anisotropy, s.anisotropyT, s.anisotropyB);");else t.push("  let specular = (shade_ggxDistribution(NdotH, roughness) * shade_smithGeometry(NdotV, NdotL, roughness)) * F / max(4.0 * NdotV * NdotL, 1e-4);");if(t.push("  var lit = (vec3<f32>(1.0) - F) * (1.0 - metalness) * albedo / 3.14159265359 + specular * shine;"),e&ekR)t.push("  let sheenPeak = max(s.sheen.r, max(s.sheen.g, s.sheen.b));","  lit = lit * (1.0 - sheenPeak * max(shade_sheenAlbedo(NdotV, s.sheenRoughness), shade_sheenAlbedo(NdotL, s.sheenRoughness))) + s.sheen * (shade_sheenDistribution(s.sheenRoughness, NdotH) * shade_sheenVisibility(NdotV, NdotL));");return t.push("  return color + lit * sunRadiance * NdotL;"),`fn shade_physicalLight(N: vec3<f32>, V: vec3<f32>, L: vec3<f32>, albedo: vec3<f32>, roughness: f32, metalness: f32, sunRadiance: vec3<f32>, shine: f32) -> vec3<f32> {\n${t.join(`\n`)}\n}`})',()=>'(function(e){let t=["  let s = shade_physical;","  var f0d = shade_specularF0;","  var f0m = albedo;"];if(e&Wuf)t.push("  f0d = mix(f0d, s.iridescenceF0Dielectric, s.iridescence);","  f0m = mix(f0m, s.iridescenceF0Metallic, s.iridescence);");if(t.push(`  let f90 = ${e&NKj?"shade_specularF90":"1.0"};`,"  var color = (albedo * (1.0 - metalness) + mix(f0d, f0m, metalness)) * lighting_ambientIrradiance(N) * 0.31830988618;","  var cosineIrradiance = vec3<f32>(0.0);","  let intensity = passLights.iblParams.x;","  let fill = lighting_cloudFill(N, receiveShadow);","  if (intensity > 0.0 || fill.r + fill.g + fill.b > 0.0) {","    let fab = lighting_dfgApprox(roughness, clamp(dot(N, V), 0.0, 1.0));","    let dielectric = shade_physicalScatter(f0d, f90, fab);","    let metallic = shade_physicalScatter(f0m, 1.0, fab);","    let single = mix(dielectric.single, metallic.single, metalness);","    let multi = mix(dielectric.multi, metallic.multi, metalness);","    let diffuse = albedo * (1.0 - metalness) * (vec3<f32>(1.0) - dielectric.single - dielectric.multi);","    var radiance = vec3<f32>(0.0);","    cosineIrradiance = fill;","    if (intensity > 0.0) {",`      let reflectN = ${e&$nB?"shade_anisotropyBentNormal(N, V, roughness, s.anisotropy, s.anisotropyB)":"N"};`,"      let r4 = roughness * roughness * roughness * roughness;","      let direction = normalize(mix(reflect(-V, reflectN), reflectN, r4));","      radiance = lume_cubeSampleLevel(iblEnvMap, iblSampler, direction, roughness * passLights.iblParams.y, passLights.iblParams.y + 1.0).rgb * intensity;","      cosineIrradiance = lighting_iblShIrradiance(N) * intensity + fill;","    }","    color = color + radiance * single + (multi + diffuse) * cosineIrradiance;","  }"),e&ekR)t.push("  let sheenAlbedo = shade_sheenAlbedo(clamp(dot(N, V), 0.0, 1.0), s.sheenRoughness);","  color = color * (1.0 - max(s.sheen.r, max(s.sheen.g, s.sheen.b)) * sheenAlbedo) + cosineIrradiance * s.sheen * sheenAlbedo;");return t.push("  return color;"),`fn shade_physicalScatter(f0: vec3<f32>, f90: f32, fab: vec2<f32>) -> LightingScatter {\n  let FssEss = f0 * fab.x + vec3<f32>(f90 * fab.y);\n  let Ems = 1.0 - fab.x - fab.y;\n  let Favg = f0 + (vec3<f32>(1.0) - f0) * 0.047619;\n  var scatter: LightingScatter;\n  scatter.single = FssEss;\n  scatter.multi = FssEss * Favg / (vec3<f32>(1.0) - Favg * Ems) * Ems;\n  return scatter;\n}\nfn shade_physicalIndirect(N: vec3<f32>, V: vec3<f32>, P: vec3<f32>, albedo: vec3<f32>, roughness: f32, metalness: f32, receiveShadow: f32) -> vec3<f32> {\n${t.join(`\n`)}\n}`})']},function(){return[()=>"(()=>(`fn shade_filmSchlick(f0: f32, cosTheta: f32) -> f32 {\n  let fresnel = exp2((-5.55473 * cosTheta - 6.98316) * cosTheta);\n  return f0 * (1.0 - fresnel) + fresnel;\n}\nfn shade_filmSchlick3(f0: vec3<f32>, cosTheta: f32) -> vec3<f32> {\n  let fresnel = exp2((-5.55473 * cosTheta - 6.98316) * cosTheta);\n  return f0 * (1.0 - fresnel) + vec3<f32>(fresnel);\n}\nfn shade_filmXyz(OPD: f32) -> vec3<f32> {\n  let phase = OPD * 6.28318530718e-9;\n  let spread = vec3<f32>(4.3278e9, 9.3046e9, 6.6121e9);\n  var xyz = vec3<f32>(5.4856e-13, 4.4201e-13, 5.2481e-13) * sqrt(6.28318530718 * spread) * cos(vec3<f32>(1.6810e6, 1.7953e6, 2.2084e6) * phase) * exp(-phase * phase * spread);\n  xyz.x = xyz.x + 9.7470e-14 * sqrt(6.28318530718 * 4.5282e9) * cos(2.2399e6 * phase) * exp(-4.5282e9 * phase * phase);\n  return xyz / 1.0685e-7;\n}\nfn shade_filmOverBase(R12: f32, T121: f32, sign21: f32, filmIOR: f32, cosTheta2: f32, baseF0: vec3<f32>, xyz1: vec3<f32>, xyz2: vec3<f32>) -> vec3<f32> {\n  let xyzToRec709 = mat3x3<f32>(3.2404542, -0.9692660, 0.0556434, -1.5371385, 1.8760108, -0.2040259, -0.4985314, 0.0415560, 1.0572252);\n  let sqrtF0 = sqrt(clamp(baseF0, vec3<f32>(0.0), vec3<f32>(0.9999)));\n  let baseIOR = (vec3<f32>(1.0) + sqrtF0) / (vec3<f32>(1.0) - sqrtF0);\n  let r1 = (baseIOR - vec3<f32>(filmIOR)) / (baseIOR + vec3<f32>(filmIOR));\n  let R23 = shade_filmSchlick3(r1 * r1, cosTheta2);\n  let sign1 = sign21 * select(vec3<f32>(1.0), vec3<f32>(-1.0), baseIOR < vec3<f32>(filmIOR));\n  let R123 = clamp(R12 * R23, vec3<f32>(1e-5), vec3<f32>(0.9999));\n  let r123 = sqrt(R123);\n  let Rs = T121 * T121 * R23 / (vec3<f32>(1.0) - R123);\n  let C1 = (Rs - vec3<f32>(T121)) * r123;\n  let C2 = C1 * r123;\n  let I = vec3<f32>(R12) + Rs + C1 * 2.0 * (xyzToRec709 * (sign1 * xyz1)) + C2 * 2.0 * (xyzToRec709 * xyz2);\n  return max(I, vec3<f32>(0.0));\n}\nstruct ShadeFilm {\n  dielectric: vec3<f32>,\n  metallic: vec3<f32>,\n}\nfn shade_iridescenceFresnels(outsideIOR: f32, eta2: f32, cosTheta1: f32, thinFilmThickness: f32, dielectricF0: vec3<f32>, metallicF0: vec3<f32>) -> ShadeFilm {\n  let filmIOR = mix(outsideIOR, eta2, smoothstep(0.0, 0.03, thinFilmThickness));\n  let ratio = outsideIOR / filmIOR;\n  let cosTheta2Sq = 1.0 - ratio * ratio * (1.0 - cosTheta1 * cosTheta1);\n  let cosTheta2 = sqrt(max(cosTheta2Sq, 0.0));\n  let r0 = (filmIOR - outsideIOR) / (filmIOR + outsideIOR);\n  let R12 = shade_filmSchlick(r0 * r0, cosTheta1);\n  let T121 = 1.0 - R12;\n  let sign21 = select(-1.0, 1.0, filmIOR < outsideIOR);\n  let OPD = 2.0 * filmIOR * thinFilmThickness * cosTheta2;\n  let xyz1 = shade_filmXyz(OPD);\n  let xyz2 = shade_filmXyz(2.0 * OPD);\n  let reflectsAll = cosTheta2Sq < 0.0;\n  let dielectric = shade_filmOverBase(R12, T121, sign21, filmIOR, cosTheta2, dielectricF0, xyz1, xyz2);\n  let metallic = shade_filmOverBase(R12, T121, sign21, filmIOR, cosTheta2, metallicF0, xyz1, xyz2);\n  return ShadeFilm(select(dielectric, vec3<f32>(1.0), reflectsAll), select(metallic, vec3<f32>(1.0), reflectsAll));\n}\nfn shade_schlickToF0(f: vec3<f32>, f90: f32, cosTheta: f32) -> vec3<f32> {\n  let x = clamp(1.0 - cosTheta, 0.0, 1.0);\n  let x5 = clamp(x * x * x * x * x, 0.0, 0.9999);\n  return (f - vec3<f32>(f90) * x5) / (1.0 - x5);\n}`))"]},function(){return[()=>"(()=>(`fn shade_anisotropicLobe(V: vec3<f32>, L: vec3<f32>, H: vec3<f32>, NdotV: f32, NdotL: f32, NdotH: f32, roughness: f32, anisotropy: f32, T: vec3<f32>, B: vec3<f32>) -> f32 {\n  let alphaB = roughness * roughness;\n  let alphaT = mix(alphaB, 1.0, anisotropy * anisotropy);\n  let a2 = alphaT * alphaB;\n  let v = vec3<f32>(alphaB * dot(T, H), alphaT * dot(B, H), a2 * NdotH);\n  let w2 = a2 / dot(v, v);\n  let D = 0.31830988618 * a2 * w2 * w2;\n  let gv = NdotL * length(vec3<f32>(alphaT * dot(T, V), alphaB * dot(B, V), NdotV));\n  let gl = NdotV * length(vec3<f32>(alphaT * dot(T, L), alphaB * dot(B, L), NdotL));\n  return D * 0.5 / max(gv + gl, 1e-8);\n}\nfn shade_anisotropyBentNormal(N: vec3<f32>, V: vec3<f32>, roughness: f32, anisotropy: f32, B: vec3<f32>) -> vec3<f32> {\n  let bent = normalize(cross(cross(B, V), B));\n  let k = 1.0 - anisotropy * (1.0 - roughness);\n  return normalize(mix(bent, N, k * k * k * k));\n}`))",()=>"(()=>(`fn shade_sheenDistribution(roughness: f32, NdotH: f32) -> f32 {\n  let invAlpha = 1.0 / (roughness * roughness);\n  let sin2h = max(1.0 - NdotH * NdotH, 0.0078125);\n  return (2.0 + invAlpha) * pow(sin2h, invAlpha * 0.5) / 6.28318530718;\n}\nfn shade_sheenVisibility(NdotV: f32, NdotL: f32) -> f32 {\n  return 1.0 / (4.0 * (NdotL + NdotV - NdotL * NdotV));\n}\nfn shade_sheenAlbedo(NdotV: f32, roughness: f32) -> f32 {\n  let r2 = roughness * roughness;\n  let rInv = 1.0 / (roughness + 0.1);\n  let a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;\n  let b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;\n  return clamp(exp(a * NdotV + b), 0.0, 1.0);\n}`))",()=>'(function(e,t,r,i,n){let l=function(e){let l=`shade_volumeRay(${i.N}, ${i.V}, ${n("thickness")}, ${e}, ${n("volumeScale")})`;return{sample:`shade_transmissionSample(${t.texture}, ${t.sampler}, shade_volumeUv(${i.P}, ${l}), ${r})`,through:`shade_volumeAttenuation(${l}, ${n("attenuationColor")}, ${n("attenuationDistance")})`}};if((e&Dkm)===0){let e=l(n("ior"));return`(${e.sample} * ${e.through})`}let s=`((${n("ior")} - 1.0) * ${n("dispersion")} * 0.025)`,[o,a,u]=[l(`(${n("ior")} - ${s})`),l(n("ior")),l(`(${n("ior")} + ${s})`)];return`(vec3<f32>(${o.sample}.r, ${a.sample}.g, ${u.sample}.b) * vec3<f32>(${o.through}.r, ${a.through}.g, ${u.through}.b))`})',()=>'(function(e,t=0){let r=(t&ZYv)!==0?e.physicalEvaluate:void 0;let i=[Htp,(du??=$c0I(53)),...(t&aO7)!==0?[(au??=$c0I(54))]:[],k$O,...r!==void 0?[_7u(t)]:[]].join(`\n\n`);let n=(t)=>e.evaluate({...t,N:t.clearcoatNormal??t.N,albedo:"vec3<f32>(0.0)",roughness:t.clearcoatRoughness??"0.0",metalness:"0.0"});let l=(e)=>e.physical!==void 0&&(e.physical.features&Tra)!==0;return{defs:[i,...e.evaluateDefs?[e.evaluateDefs]:[],...r!==void 0?[r.defs]:[]].join(`\n\n`),needsLighting:!0,declaredFolds:e.evaluateDefs?(e.declaredFolds??0):0,prelude:function(e){let t=e.physical;if(t===void 0)return[];let i=[];if(l(e)){if(e.clearcoat!==void 0)i.push(`  let ${Ou}: vec3<f32> = ${n(e)};`);i.push(`  shade_specularF0 = ${t.term("specularF0")};`)}if(r!==void 0){i.push(Q7u(t.features,e,t.term));}return i},litColor:function(t){let i=(t)=>r!==void 0?r.call(t):e.evaluate(t);let s=`clamp(${t.transmission}, 0.0, 1.0)`;let o=`(${t.albedo} * (1.0 - ${s} * (1.0 - ${t.metalness})))`;let a=t.sceneBehind===void 0?i(t):`(${i({...t,albedo:o})} + ${s} * shade_transmitted(${t.sceneBehind}, ${t.albedo}, ${t.N}, ${t.V}, ${t.metalness}))`;if(t.clearcoat===void 0)return a;let u=l(t)?Ou:n(t);return`shade_clearcoatMix(${a}, ${u}, ${t.clearcoatNormal??t.N}, ${t.V}, ${t.clearcoat})`}}})']},function(){return[()=>'(function(e,t,r){let{fragment:i,depthStencil:n}=e;if(i===void 0||e.layout==="auto"||n!==void 0&&n.format!==jEz||r.includes(":faces-front"))return null;let l=bT(e);let s=e.primitive!==void 0&&r.includes(":faces-")?{...e.primitive,cullMode:"none"}:e.primitive;return{label:r,layout:e.layout,vertex:e.vertex,...s!==void 0?{primitive:s}:{},fragment:{module:i.module,entryPoint:t,constants:{...i.constants,...l===1?ET:gT},targets:[{format:ufe(l)}]},...n===void 0?{}:{depthStencil:{...n,depthWriteEnabled:!1,depthCompare:(n.depthCompare??"always")!=="always"?dlr:"always"}},multisample:{count:l}}})',()=>"(function(e,t){for(let r=1;r<RT.length;r+=1){let i=RT[r];if(i===null)continue;let n=e3w(i.finest)?i.finest:null,l=i.spoken;if(i.finest=1/0,i.spoken=0,i.rests)continue;if(l>0)i.span=l;let s=i.span>0?i.span:iT,o=n===null&&i.drawnFrom===e,a=i.unmeasuredFrom<=e&&e<=i.unmeasuredTo;if(t&&!o&&!a&&(n!==null||i.measured===null))i.measured=n,i.sink(n,0);else if(t&&a&&l>0){if(n!==null)i.measured=n;i.sink(i.measured,l)}else if(i.measured!==null){if(n===null||n>=i.measured)continue;i.measured=n,i.sink(n,0)}else if(s>0)i.sink(n,s)}})",()=>"(function(e,t){let r=t.find((e)=>A4.test(e.text));if(r!==void 0)return r.name;for(let r of t){if(!N4.test(r.type))continue;let t=M4(e,r.type)?.find((e)=>A4.test(e.text));if(t!==void 0)return`${r.name}.${t.name}`}return null})",()=>'(function(e,t){if(e===0)return 0;let r=hG==="linear";DF[0]=e;let i=r?(xG+Math.max(0,Math.round((e-VF)/SG))):vF[0];let n=Math.max(xG,Math.min(WG,i+Math.round(t)*zF));if(r){return vG(n);}return vF[0]=n,DF[0]})',()=>'(function(e,t,r){if(e!=="2d-top")return 0;let i=t[6],n=-(t[4]*t[12]+t[5]*t[13]+t[6]*t[14]),l=Math.abs(i)>YF?Math.abs(n/i):0,s=Math.abs((r[15]-r[11]*l)/r[5])/Math.max(Math.abs(i),RF)+1;if(!(s*pF>OG)||!isFinite(s))return 0;return Math.min(nF,Math.ceil(Math.log2(s*pF/OG)))})',()=>'(function(e,t,r,i=IXI){if(r==="3d")return 0;let v$30;jc1:{let i$10=0,n$4=i.orders,l$2=i.zoom;{let i=i$10,n=n$4,l=l$2;if(r!=="2d-top"){v$30=UY(e,i,l);break jc1;}let s=lG(t,i);let o=n/2-1;v$30=(s>0?o:-o)*(sG>>i)+s;}}return kF(v$30)})',()=>'(async function(e,t){let r=[],i=[];for(let e of t){if(e===void 0||typeof e.getCompilationInfo!=="function")continue;try{let v$11;{let e$16=e;{let e=e$16;let t=j3.get(e);if(t===void 0)t=d$(e.getCompilationInfo()),j3.set(e,t);v$11=t;}}let t=await v$11;for(let n of t.messages){if(n.type!=="error")continue;if(i.push(e),r.push(`WGSL :${n.lineNum}:${n.linePos} error: ${n.message}`),r.length>=h3)break}}catch{}if(r.length>=h3)break}if(r.length===0){{if(typeof e!=="object"||e===null)return e;let r=e3(t);if(r!=="")S3.set(e,r);return e}}let n=k$w(e),l=Error(`${r.join(" \\u00b7 ")}; ${n}`);return S3.set(l,e3(i)),l})',()=>'(function(e,t,r){let i=esL((TsL(IsL(t))),DB);let n=asL(t);if(n===null&&i===null&&r===null)return e;let l=e.messages.map(function(e){let t=r===null?null:UsL(r,e.lineNum,e.linePos),l=t?.line??e.lineNum,s=t?.column??e.linePos,o=i===null?s:i.columnOf(l,s),a=n===null?null:n(l,o),u=a===null?{lineNum:l,linePos:o}:{lineNum:a.line,linePos:a.column,offset:a.offset};if(i!==null)u.message=i.spelledByAuthor(l,e.message);return new Proxy(e,{get:(e,t)=>u[t]??Reflect.get(e,t)})});return new Proxy(e,{get:(e,t)=>t==="messages"?l:Reflect.get(e,t)})})']},function(){return[()=>"(function(e,t,r){if(this.parseLost!==null)return;if(r!==void 0&&e3w(r))this.helperParsedChars+=Math.max(0,r-(this.helperChars.get(e)??0)),this.helperChars.set(e,r);else if(!(t>0))this.helperChars.delete(e);let i=e3w(t)&&t>0?t:0;if(this.helperParseBytes+=i-(this.helperParses.get(e)??0),i>0)this.helperParses.set(e,i);else this.helperParses.delete(e);this.bookParse()})",()=>"(function(e){let t=bd(e.vertex);if(t.buffers!==void 0)t.buffers=Array.from(t.buffers,(e)=>e==null?e:{...e,attributes:Array.from(e.attributes,vd)});return{...e,vertex:t,...e.fragment===void 0?{}:{fragment:{...bd(e.fragment),targets:Array.from(e.fragment.targets,vd)}},...e.primitive===void 0?{}:{primitive:vd(e.primitive)},...e.depthStencil===void 0?{}:{depthStencil:vd(e.depthStencil)},...e.multisample===void 0?{}:{multisample:vd(e.multisample)}}})",()=>"(function(e){let t=this.modules.get(e);if(!this.recording||this.createModule===null||t===void 0||t.compilationHints!==void 0)return null;let r=this.createModule(t.label===void 0?{code:t.code}:{code:t.code,label:t.label});this.modules.set(r,t);{let t$12=r;{let t=t$12;let r=id.get(e);if(r!==void 0)$d(t,r)}}return {module:r,code:t.code}})",()=>'(function(e){if(!uLW(e))return null;let t=Reflect.get(e,"module"),r=Reflect.get(e,"entryPoint"),i=Reflect.get(e,"constants"),n={};if(uLW(i)){for(let[e,t]of Object.entries(i))if(typeof t==="number")n[e]=t}return{identity:uLW(t)?tiG(t)??null:null,entry:typeof r==="string"?r:null,constants:n}})',()=>'(function(e,t,r,i){if(!uLW(t))return;let n=Reflect.get(t,"label");let l=e==="compute"?[Reflect.get(t,"compute")]:[Reflect.get(t,"vertex"),Reflect.get(t,"fragment")];let s={label:typeof n==="string"?n:"",vertex:e==="render"?rN(l[0]):null,fragment:e==="render"?rN(l[1]):null,compute:e==="compute"?rN(l[0]):null};let o={kind:e,label:s.label,at:"device",sync:!(i instanceof Promise),startMs:r,settledMs:null,ok:null,chars:tOL(l)};this.builds.push(o);if(!(i instanceof Promise)){if(uLW(i)){lN(i)[dN]=s;}return}i.then((e)=>{o.settledMs=this.now();o.ok=!0;if(uLW(e)){lN(e)[dN]=s}},()=>{o.settledMs=this.now(),o.ok=!1})})',()=>'(function(e){try{let t=(this.options.createWorker??UTO)();e.worker=t,e.info=null,e.idleSinceMs=null,e.reborn=!0,this.workerStarts+=1;let r=bLT({realm:"renderer",door:"renderer<-pipeline-compiler",onWord:(r)=>{if(e.worker!==t)return;if(r.kind==="ready")e.info=r.info,this.sendHeld(e);else if(r.kind==="progress"){let t=e.jobs.get(r.id);if(t!==void 0){for(let e of t.asks){{let e$22=e.record,t$18=r;{let e=e$22,t=t$18;let r=e.worker??={timeOriginMs:t.timeOriginMs,startedAtMs:null,returnedAtMs:null,settledAtMs:null,phase:t.phase,progressAtMs:t.atMs};if(t.recipe!==void 0)e.recipe=t.recipe;if(t.recipeError!==void 0)e.recipeError=t.recipeError;if(r.phase=t.phase,r.progressAtMs=t.atMs,t.phase==="received")r.receivedAtMs=t.atMs;if(t.call!==void 0)r.startedAtMs??=t.call.enteredAtMs,r.call=t.call;if(t.phase==="awaiting-result")r.returnedAtMs=t.atMs;if(t.phase==="result-ready")r.settledAtMs=t.atMs,r.ok=t.ok}}}}}else if(r.kind==="unavailable")this.retire(e,r.message);else if(r.kind==="parse"){{let e$18=this.device,t$15=e,r$8=r.bytes,i$2=r.chars;{let e=e$18,t=t$15,r=r$8,i=i$2;WZ.get(e)?.noteHelperParse(t,r,i)}}}else if(r.kind==="compiled"){let t=e.jobs.get(r.id);if(t===void 0)return;if(e.jobs.delete(r.id),r.ok){if(this.completed+=1,t.preparedKey!==null&&r.state!==!1)this.prepared?.add(t.preparedKey,this.preparedLabels.get(t.preparedKey)??null)}else this.rejected+=1;this.finish(t,r),this.settleCapacity(),this.feed()}},onUnreadable:(r)=>{if(e.worker===t)this.retire(e,r.code)}});return e.detach=sDh(t,r),t.onerror=(r)=>{if(r.preventDefault(),e.worker===t)this.retire(e,r.message||"compiler worker failed")},t.postMessage({kind:"init",config:this.config}),e.worker===t}catch(t){return this.retire(e,k$w(t)),!1}})']},function(){return[()=>'(function(e,t=!1){let r=e.worker;e.worker=null;e.info=null;{let e$19=this.device,t$16=e,r$9=0,i$3=void 0;{let e=e$19,t=t$16,r=r$9,i=i$3;WZ.get(e)?.noteHelperParse(t,r,i)}}e.detach?.();e.detach=null;if(r===null)return;r.onerror=null;let i=wLZ();if(t||i){try{r.postMessage({kind:"dispose",...i?{stay:!0}:{}});if(i&&!e.retired){R$(CTO(r));}if(i&&!e.retired){{let e;for(let t of x$())e=t;if(e!==void 0)bS.add(e)}}return}catch{}}gD0(r)})',()=>'(function(e){if(this.state!=="active")return;let t=!1;for(let r of[...e.jobs.values()]){if(r.held!==!0||e.info===null&&this.prepared?.census().outcome==="reading")continue;if(r.held=!1,this.builtBefore(r))e.jobs.delete(r.id),r.slot=null,t=!0;else this.send(e,r)}if(!t)return;this.settleCapacity(),this.feed()})',()=>'(function(e,t){for(let r of t.asks)r.record.slot=e.index,r.record.postedAtMs=r.now();try{if(e.worker===null)throw Error("compiler helper is not standing");e.worker.postMessage({kind:"compile",id:t.id,recipe:t.recipe})}catch(r){e.jobs.delete(t.id),(this.options.warn??Fn.warn)(`[lume] auxiliary pipeline helper ${e.index+1} could not take a recipe: ${k$w(r)}; it builds on the render device`),this.finish(t,null)}})',()=>"(function(e){let t=this.waiting;this.waiting=[];for(let r=0;r<this.slots.length;r++){let i=this.slots[r];t.push(...i.jobs.values()),i.jobs=new Map,this.stopWorker(i,e)}return this.sharing=new Map,this.recorder.clear(),t})",()=>'(function(e){if(this.state!=="active"||this.waiting.length>0)return!1;let t=!1;for(let e=0;e<this.slots.length;e++){let r=this.slots[e];t||=r.jobs.size>0}let r=this.retainedBuilds>0&&!t?1:0,i=0;for(let t=0;t<this.slots.length;t++){let n=this.slots[t];if(n.worker===null||n.jobs.size>0||e!==void 0&&!this.idleOutlived(n,e))continue;if(r>0){r-=1;continue}this.stopWorker(n,!0),n.restedAtMs=e??null,n.idleSinceMs=null,i+=1}return i>0})',()=>'(function(e,t=[]){if(this.state!=="active")return;this.state="unavailable";for(let e of[...t,...this.takeJobs(!1)])this.finish(e,null);(this.options.warn??Fn.warn)(`[lume] auxiliary pipeline preparation unavailable: ${e}; builds use the render device`)})',()=>'(function(e,t){let r=this.prepared;if(r===null||this.preparedLabels.has(e))return;if(this.preparedLabels.set(e,t),r.has(e))return;let i=this.preparedMisses,n=r.census().outcome;if(n==="reading")i.beforeRead+=1;else if(n!=="read")i.noRecord+=1;else if(r.changed(e,t)){hb(i,t);}else i.fresh+=1})',()=>'(function(e){if(this.prepared===null)return null;let t=this.prepared.census(),r=this.preparedMisses,i=(e)=>e===null?"none":e.slice(0,12),n=`gave nothing: ${t.outcome} after ${Math.round(t.readMs??0)} ms`,l=`the store held ${t.stored} row(s) in all${t.elsewhere===0?"":`, ${t.elsewhere} of another browser, deleted`}${t.made?", this page made it":""}`;if(t.outcome==="read"){n=`read ${t.rows} row(s) of this browser in ${Math.round(t.readMs??0)} ms (last build ${i(t.last)}, before ${i(t.before)}; ${l})`;}else if(t.outcome==="reading")n="its read has not ended";let s=r.changed===0?"0 changed since an earlier page":`${r.changed} changed since an earlier page (${r.changedLabels.join(", ")}${r.changed>r.changedLabels.length?", \\u2026":""})`,o=`${t.written} row(s) written${t.writeFailed===null?"":`, a write failed (${t.writeFailed})`}`;return`[renderer] the browser\'s prepared-recipe record ${e}: ${n}; this page\'s recipes: ${this.preparedLabels.size} asked, ${this.preparedBeforeKeys.size} built with no helper, ${r.beforeRead} asked before the read ended, ${r.noRecord} asked after the read gave nothing, ${s}, ${r.fresh} new to this browser; ${o}`})']},function(){return[()=>'(function(){if(this.state==="disposed")return;this.snapshotAtDispose=this.snapshot(),this.state="disposed",WT.delete(this);for(let e of this.takeJobs(!0)){this.cancel(e,VT());}let e=this.deviceQueue;this.deviceQueue=[];for(let t of e){t.cancel(VT())}})',()=>"(function(e,t,r){let i=this.moduleUses.get(e);if(i===void 0)return this.moduleUses.set(e,{builds:0,programs:new Set([t]),sets:new Map([[t,e]])}),e;let n=this.options.usedModuleMissesCache===!1?null:this.recorder.twin(e);if(n===null){pb(i,t,e);return e}SUu(e,n.module);i.sets.set(t,n.module);this.moduleUses.set(n.module,{builds:0,programs:new Set([t]),sets:i.sets});r?.(n.code);return n.module})",()=>'(function(e,t){let{vertex:r,fragment:i}=e;if(i?.module===r.module){let n=this.programModule(r.module,`${xT("vertex",r)}|${xT("fragment",i)}`,t);return{descriptor:n===r.module?e:qb(e,r,n,i),modules:[[n,"vertex+fragment"]]}}let n=this.programModule(r.module,xT("vertex",r),t),l=i===void 0?void 0:this.programModule(i.module,xT("fragment",i),t),s=[[n,"vertex"]];if(l!==void 0)s.push([l,"fragment"]);if(n===r.module&&l===i?.module)return{descriptor:e,modules:s};return{descriptor:{...e,vertex:{...r,module:n},...i===void 0||l===void 0?{}:{fragment:{...i,module:l}}},modules:s}})',()=>'(function(e){return new Promise(function(t){let r=function(){i(),e.onerror=null,t()},i=sDh(e,bLT({realm:"renderer",door:"renderer<-pipeline-compiler",onWord:function(e){if(e.kind==="settled")r()},onUnreadable:r}));e.onerror=function(e){e.preventDefault(),r()}})})',()=>'(function(e,t){e.pushErrorScope("internal"),e.pushErrorScope("validation");let r;try{r=t()}catch(t){return e.popErrorScope().catch(()=>null),e.popErrorScope().catch(()=>null),Promise.reject(t)}let i=e.popErrorScope(),n=e.popErrorScope();return Promise.all([i,n]).then(function([e,t]){if(e!==null)throw c0(e,"validation");if(t!==null)throw c0(t,"internal");return r})})',()=>'(function(e){if(typeof e.createRenderPipeline!=="function"||typeof e.createComputePipeline!=="function"||typeof e.pushErrorScope!=="function"||typeof e.popErrorScope!=="function")return!1;let t=e.createRenderPipeline.bind(e),r=e.createComputePipeline.bind(e);return e.createRenderPipelineAsync=(r)=>Q0(e,()=>t(r)),e.createComputePipelineAsync=(t)=>Q0(e,()=>r(t)),l0.add(e),!0})',()=>"(()=>(`@group(0) @binding(0) var<storage, read_write> fxcRoadOut: array<u32>;\nvar<workgroup> fxcRoadWord: atomic<u32>;\n@compute @workgroup_size(1) fn main() {\n  atomicOr(&fxcRoadWord, 1u);\n  workgroupBarrier();\n  fxcRoadOut[0] = atomicLoad(&fxcRoadWord);\n}\n`))",()=>'(async function(e,t){let r=null;try{await e.createComputePipelineAsync({label:"lume fxc road probe",layout:"auto",compute:{module:e.createShaderModule({label:"lume fxc road probe",code:(Vx??=$c0I(94))}),entryPoint:"main"}})}catch(e){r=e instanceof Error?e.message.split(`\n`)[0]:String(e)}let i={fxc:r!==null,startedAtMs:t,ms:Bra()-t,held:ox.has(e)};if(dx.set(e,i),Dx.delete(e),r!==null)Fn.warn(`[lume] the device refused a workgroup atomic in ${Math.round(i.ms)} ms (${r}): its folds build in plain words`);return i.fxc})',()=>"(function(e){if(e===null)return null;try{let t=JSON.parse(e);if(!XYw(t)||t.v!==1||!Array.isArray(t.records))return null;return{records:t.records.filter(oM).map((e,t)=>({...e,t:e.t??t})),arrivedAt:e3w(t.arrivedAt)?t.arrivedAt:null}}catch{return null}})"]},function(){return[()=>"((e)=>({createShaderModule:e.createShaderModule.bind(e),createBindGroupLayout:e.createBindGroupLayout.bind(e),createPipelineLayout:e.createPipelineLayout.bind(e),createRenderPipelineAsync:e.createRenderPipelineAsync.bind(e),createComputePipelineAsync:e.createComputePipelineAsync.bind(e),pushErrorScope:e.pushErrorScope.bind(e),popErrorScope:e.popErrorScope.bind(e)}))",()=>'(async function(e,t){let r=GK(e);let i;HM:{let e$23=await this.textOf(r)??"";{let e=e$23;try{let t=JSON.parse(e);if(!XYw(t)||t.kind!=="render"&&t.kind!=="compute"||!Array.isArray(t.groups)||!baM(t.modules)||!XYw(t.descriptor)){i=null;break HM;}let r=[];for(let e of t.groups)if(e===null)r.push(null);else if(XYw(e)&&Array.isArray(e.entries))r.push({entries:e.entries.filter(XYw)});else {i=null;break HM;}{i={kind:t.kind,groups:r,modules:t.modules,descriptor:t.descriptor};break HM;}}catch{{i=null;break HM;}}}}let n=await Promise.all(t.map((e)=>this.modules.has(e)?Promise.resolve(""):this.textOf(fK(e))));let l=t.filter((e,t)=>n[t]===null).map(fK);if(i===null)l.push(r);return i===null||l.length>0?l:{recipe:i,sources:n}})',()=>'(function(e,t,r){let i=this.native;if(i===null)return null;i.pushErrorScope("validation"),r.forEach((e,r)=>{let n=t[r];if(this.modules.has(e)||typeof n!=="string")return;this.modules.set(e,i.createShaderModule({code:n}))});let n=e.groups.map((e)=>{if(e===null)return null;let t=V3y(e),r=this.groupObjects.get(t);if(r===void 0)this.groupObjects.set(t,r=i.createBindGroupLayout(e));return r}),l=V3y(e.groups),s=this.layoutObjects.get(l);if(s===void 0)this.layoutObjects.set(l,s=i.createPipelineLayout({bindGroupLayouts:n}));i.popErrorScope().catch(()=>null);let o=e.descriptor;if(e.kind==="compute"){let e=JM(o.compute,this.modules);if(e===null)return null;let t={...o,layout:s,compute:e};return i.createComputePipelineAsync(t)}let a=JM(o.vertex,this.modules),u=o.fragment===void 0?void 0:JM(o.fragment,this.modules);if(a===null||u===null)return null;let d={...o,layout:s,vertex:a,...u===void 0?{}:{fragment:u}};return i.createRenderPipelineAsync(d)})',()=>'(async function(e,t,r){let i=await this.entries(e,t);if(Array.isArray(i))return i;let n=()=>this.stand(i.recipe,i.sources,t)??Promise.reject(Error("kept stage names no module"));return()=>{let e=t.reduce((e,t,r)=>{let n=i.sources[r];return this.modules.has(t)||typeof n!=="string"?e:e+n.length},0);let l=r===void 0?n():r().then(function(e){if(!e)throw Error("no second device stood");return n()});return{chars:e,answer:d$(l)}}})',()=>"(function(e,t,r,i,n){if(this.arrival!==null)return;this.line=e,this.touches=t,this.owes=n,this.pictureOwn=i,this.arrivalWaits=r()?r:null;let l=this.takeArrival();if(this.twin===null)Fn.info(`${MM}the arrival's ${l} are not asked again: no second device stands on this adapter`)})",()=>'(function(){let e=[...this.asked];let t=e.some((e)=>(this.builds.get(e)??0)>=this.coldMs);let r=(e)=>this.modulesOf.get(e)??this.answering.get(e)?.modules??[];let i=t?e.map((e)=>({k:e,m:r(e)})).filter((e)=>e.m.length>0):[];this.arrivalMarks=new Set(i.map((e)=>e.k));this.arrivedAt=BM();this.openArrived();let n=t?[...this.bootArrival].reverse().filter((e)=>!this.arrivalMarks.has(e)):[];this.arrival=[...i,...n.map((e)=>({k:e,m:r(e)})).filter((e)=>e.m.length>0)];this.picture=i.filter((e)=>this.pictureOwn(this.keys.get(e.k)??""));this.keepTouchJob(this.arrival);this.orderDirty=!0;this.owe();this.stale=!0;this.pictureStale=!0;this.touchWhenQuiet();return this.arrival.length})']},function(){return[()=>"(function(e){if(this.afterPage===null)return;let t=e.map(({k:e,m:t})=>{let r=this.builds.get(e);return{k:e,m:t,...r===void 0?{}:{c:Math.round(r)}}}),r={v:1,...this.afterPage,records:t};this.known.delete(uK),this.pending.set(uK,JSON.stringify(r))})",()=>"(function(){let e=this.twin,t=this.reader,r=this.line,i=this.arrival;if(this.touching||this.atDevice.size>0||this.owes()||i===null||e===null||t===null||r===null)return;let n=this.touches(),l=n?i:this.picture;if(l.length===0||(n?!this.stale||this.keptRun===0:!this.pictureStale))return;if(n)this.stale=!1;else this.pictureStale=!1;this.touching=!0,this.touchArrival(e,(e)=>this.pending.has(e)?Promise.resolve(this.pending.get(e)??null):t(e),r,l,n).then((e)=>Fn.info(`${MM}the arrival's ${e.records} asked again on a second device in the page's compile line \\u00b7 ${e.unkept} past the run the store keeps \\u00b7 ${e.asked} asked \\u00b7 ${e.fast} answered at once \\u00b7 ${e.slow} compiled \\u00b7 ${e.refused} refused \\u00b7 ${e.missing} missing \\u00b7 at most ${e.inFlight} build(s) in flight of ${e.ceiling??\"no ceiling\"} \\u00b7 ${Math.round(e.wallMs)} ms whole`),(e)=>{let t=k$w(e);if(t===QM)if(n)this.stale=!0;else this.pictureStale=!0;Fn.info(`${MM}the arrival's touch ended: ${t}`)}).finally(()=>{this.touching=!1,this.touchWhenQuiet()})})",()=>"(async function(e,t,r,i,n){let l=this.clock(),s={records:i.length,unkept:0,asked:0,fast:0,slow:0,refused:0,missing:0,inFlight:0,ceiling:null,wallMs:0},o=(e)=>[...e].reverse(),a=this.keptRun;if(!n){await this.touchPass(e,t,r,o(i),s,!1,void 0,()=>!this.owes());}else{if(a===null){let n=this.firstPassFrom??i.length;await this.touchPass(e,t,r,o(i.slice(0,n)),s,!1,(e)=>this.firstPassFrom=n-1-e);a=this.keptRun=await this.touchPass(e,t,r,i,s,!0)}else await this.touchPass(e,t,r,i.slice(0,a),s,!1);s.unkept=i.length-a;await this.touchPass(e,t,r,o(i.slice(0,a)),s,!1)}return this.owe(),s.wallMs=this.clock()-l,s})",()=>'(async function(e,t,r,i,n,l,s=function(){return},o=()=>this.touches()&&!this.owes()){if(i.length===0)return 0;let a=new iM(null,t),u={device:null,asked:null,ms:0,why:"the browser handed back none"},d=()=>{if(u.asked!==null)return u.asked;let t=this.clock();return u.asked=e().catch(function(e){return u.why=k$w(e),null}).then((e)=>{if(u.ms=this.clock()-t,e===null)return!1;return u.device=e,a.on(LM(e)),!0})};try{for(let[e,{k:t,m:f}]of i.entries()){let i=await a.create(t,f,d).catch(()=>[]);if(Array.isArray(i)){n.missing+=1,s(e);continue}if(!o())throw Error(QM);let c=u.ms,h=!1,p=await r(`twin:${t}`,function(){if(o())return i();return h=!0,{chars:0,answer:Promise.resolve(null)}});if(h)throw Error(QM);if(p===null)throw Error("the page\'s compile line dropped its ask");if(u.device===null)throw this.twin=null,Error(`no second device stood: ${u.why}`);if(n.asked+=1,n.inFlight=Math.max(n.inFlight,p.inFlight),n.ceiling=p.ceiling,s(e),!p.ok){n.refused+=1;continue}if(this.touch(t,f),p.ms-(u.ms-c)>(this.builds.get(t)??1/0)*CM){if(n.slow+=1,l)return e}else n.fast+=1}}finally{let e=u.device;if(e!==null){e.destroy();y$(e)}}return i.length})',()=>"(function(e){let t=this.clock(),r=e.at;if(this.oneAtATime()){for(let i of e.ahead)if(i.answeredAt!==null&&i.answeredAt<=t)r=Math.max(r,i.answeredAt)}return e.answeredAt=t,e.ahead=[],this.atDevice.delete(e),t-r})"]},function(){return[()=>'(function(e){if(e.layout==="auto")return null;let t=this.layouts.get(e.layout),r=Ad(e),i=this.moduleKeys.get(r.vertex.module),n=r.fragment===void 0?null:this.moduleKeys.get(r.fragment.module);if(t===void 0||i===void 0||n===void 0)return null;let{layout:l,...s}=r,o=n===null||n===i?[i]:[i,n];return this.noteRecipe(Pms(e),{kind:"render",groups:t,modules:o,descriptor:{...s,vertex:TM(r.vertex,i),...r.fragment===void 0||n===null?{}:{fragment:TM(r.fragment,n)}}})})',()=>'(function(e){if(e.layout==="auto")return null;let t=this.layouts.get(e.layout);let r=({...e,compute:bd(e.compute)});let i=this.moduleKeys.get(r.compute.module);if(t===void 0||i===void 0)return null;let{layout:n,...l}=r;return this.noteRecipe(Pms(e),{kind:"compute",groups:t,modules:[i],descriptor:{...l,compute:TM(r.compute,i)}})})',()=>"(function(e,t,r){let i=(this.out.get(e)??1)-1;if(i>0)this.out.set(e,i);else this.out.delete(e);let n=this.answering.get(e);if(t){let t=r??n?.modules;if(!this.seen.has(e)&&t!==void 0)this.touch(e,t);if(n!==void 0)this.keepText(GK(e),n.text);this.answering.delete(e)}else if(i===0&&!this.seen.has(e)){this.answering.delete(e);this.order.delete(e);this.modulesOf.delete(e);this.dropped.set(e,BM());}this.orderDirty=!0,this.owe()})",()=>"(function(e,t){this.judged(t);let r=this.bootKeys;if(r===null)return;if(t>this.coldMs){if(!r.has(e)||this.gone.has(e))this.timed(e,t)}else if(!r.has(e)){let r=()=>this.timed(e,t);this.reader?.(GK(e)).then((e)=>e??r(),r)}})",()=>"(function(){if(tM===null||!this.booted||this.draining||GM!==this)return;if(this.pending.size===0&&!this.orderDirty)return;this.draining=!0;let e=tM;this.drain(e).catch(function(){return}).finally(()=>{this.draining=!1,this.owe()})})",()=>"(async function(e){await Promise.race([zM(),this.arrived]);for(let t=this.pending.entries().next();t.done!==!0;t=this.pending.entries().next()){let[r,i]=t.value;if(this.known.has(r)){this.pending.delete(r),this.unproven?.set(r,i);continue}let n=await e(r,i);if(this.pending.delete(r),n)this.known.add(r)}if(!this.orderDirty)return;this.orderDirty=!1;let t=this.reader;await KwC(async()=>{let r=t===null?null:WM(await t(QK).catch(()=>null));await e(QK,JSON.stringify(this.orderAfter(r)))})})",()=>"(function(e){let t=new Map;for(let{k:r,c:i,m:n,t:l}of e?.records??[])t.set(r,{k:r,...i===void 0?{}:{c:i},m:n,t:l});for(let[r,i]of this.order){let n=t.get(r);if(n===void 0&&e!==null&&i<this.bornAt)continue;let l=Math.min(this.builds.get(r)??1/0,n?.c??1/0),s={k:r,...l===1/0?{}:{c:Math.round(l)},m:this.modulesOf.get(r)??n?.m??[],t:Math.max(i,n?.t??i)};if(n===void 0||i>=n.t)t.delete(r);t.set(r,s)}for(let[e,r]of this.dropped)if((t.get(e)?.t??1/0)<=r)t.delete(e);for(let e of this.out.keys())t.delete(e);let r=e===null?null:e.arrivedAt,i=new Set((e?.records??[]).filter((e)=>e.a===1).map((e)=>e.k));if(this.arrivedAt!==null&&this.arrivedAt>=(r??-1/0))i=this.arrivalMarks,r=this.arrivedAt;else if(e===null||r===this.bootArrivedAt)i=this.bootArrival,r=this.bootArrivedAt;return{v:1,records:[...t.values()].sort((e,t)=>e.t-t.t).map((e)=>({...e,...i.has(e.k)?{a:1}:{}})),...r===null?{}:{arrivedAt:r}}})"]},function(){return[()=>"(function(e){for(let{k:t,c:r,m:i,a:n,t:l}of e){if(n===1)this.bootArrival.add(t);this.known.add(GK(t));for(let e of i)this.known.add(fK(e));if(r!==void 0&&!((this.builds.get(t)??1/0)<=r))this.builds.set(t,r);if(this.order.has(t))continue;this.order.set(t,l),this.modulesOf.set(t,i)}this.bootKeys=new Set(e.map((e)=>e.k)),this.booted=!0})",()=>'(function(){let e=null,t=function(){let t=Vum();if(t===void 0||typeof t.open!=="function")return Promise.resolve(null);return e??=t.open(xK).catch(()=>null)};return async function(e){return await H$t(async function(){let r=await t();let i=r===null?void 0:await r.match(e);return i?.ok===!0?i.text():null},xK).catch(()=>null)??null}})',()=>'(function(e){let v$17;drK:{let t=e.indexOf(Fz);if(t<0){v$17=e;break drK;}let r=e.slice(0,t+Fz.length),i=e.lastIndexOf(ez);v$17=i>t?`${r}${e.slice(i)}`:r;}let t=v$17.split(`\n`);let r=[];for(let e=0;e<t.length;e+=1){let i=t[e]??"";if(Oz(i)||(Ez.test(i)||Gz.test(i))||Oz(t[e+1]??""))continue;r.push(i)}return r.join(`\n`).replace(/\\n{3,}/g,`\n\n`)})',()=>'(function(e){if((e.usage&4)===0||(e.sampleCount??1)>1)return null;let t=e.format;if(t.startsWith("depth")||t.startsWith("stencil"))return null;let r;vS5:{let t=Reflect.get(e,"textureBindingViewDimension");if(t==="2d"||t==="2d-array"||t==="cube"||t==="3d"){r=t;break vS5;}if(t!==void 0){r=null;break vS5;}if(e.dimension==="3d"){r="3d";break vS5;}if(e.dimension==="1d"){r=null;break vS5;}r=Iv(e.size)[2]>1?"2d-array":"2d";}if(r===null)return null;let i="unfilterable-float";if(t.endsWith("uint"))i="uint";else if(t.endsWith("sint"))i="sint";return{view:r,sample:i,key:`${r}/${i}`}})',()=>"(function(){let e=[];for(let t=0;t<this.watched.size&&e.length<iB;t+=1){let t=this.cursor.next();if(t.done===!0){if(this.cursor=this.watched.values(),t=this.cursor.next(),t.done===!0)break}let r=this.programOf(t.value.kind);if(r.pipeline!==null&&!r.off&&this.stood(t.value.texture))e.push(t.value)}return e})",()=>'(function(e,t){this.verdicts+=1,this.drop(e.texture),srz(this.device,e.texture);let r="none";if(this.markDeleted(e.texture))r="handle";else if(ayA(this.device).deletedTextureListeners.some((t)=>t(e.texture)))r="listener";cu6("lume.texture_deleted",{owner:r});let i=e.texture.label||"(unlabeled)",n=this.deletedLabels.get(i)??{label:i,count:0,owner:r};n.count+=1,n.owner=r,this.deletedLabels.set(i,n),this.warn(`texture watch: the browser deleted "${i}" (${t}); made again by: ${r}`)})',()=>'(function(e){let t=hj(e);if(t===null)return null;let r=MMU(),i=Zpc(Zj,r),n=jCw(i,t.pass);if(!n.has(t.pipeline))n.add(t.pipeline),Hj+=1,Fn.warn(`[lume] the queue refused the pipeline "${t.pipeline}" in the pass "${t.pass}" (its attachment state does not fit the pass): its draws are left out of that pass from the next frame, and the pass draws the rest`);return t})',()=>"(()=>(`\n@vertex fn vs() -> @builtin(position) vec4<f32> {\n  return vec4<f32>(2.0, 2.0, 2.0, 1.0);\n}\n\n@fragment fn fs() {}\n`))",()=>"(function(e){let t=jC.device;if(t===null)return null;let r=UKu(e);if(r===void 0)return null;let i=jC.heads.get(r);if(i!==void 0)return i;let n=(sj.get(r));let l=n===void 0?null:XPu(t,n);return jC.heads.set(r,l),l})"]},function(){return[()=>'(function(e,t){let r=t.colors.map((e)=>e===null?null:{format:e,writeMask:0}),i=t.depthStencil;return jC.module??=e.createShaderModule({label:aC,code:(wC??=$c0I(122))}),jC.layout??=e.createPipelineLayout({label:aC,bindGroupLayouts:[]}),e.createRenderPipeline({label:aC,layout:jC.layout,vertex:{module:jC.module,entryPoint:"vs"},...r.length>0?{fragment:{module:jC.module,entryPoint:"fs",targets:r}}:{},primitive:{topology:"triangle-list"},...i!==void 0?{depthStencil:{format:i,depthWriteEnabled:!1,depthCompare:"always",...i.includes("stencil")?{stencilReadMask:0,stencilWriteMask:0}:{}}}:{},multisample:{count:t.samples}})})',()=>"(function(e,t){let r=/@workgroup_size\\s*\\(([^()]*)\\)/.exec(e);if(r===null)throw Error(`lume: compute entry '${t}' has no @workgroup_size`);let i=r[1].split(\",\").map((e)=>e.trim()).filter((e)=>e.length>0).map(function(e){let r=/^(\\d+)[iu]?$/.exec(e);if(r===null)throw Error(`lume: compute entry '${t}' sizes its workgroup with '${e}', which a fragment form cannot read`);return Number(r[1])});return[i[0]??1,i[1]??1,i[2]??1]})",()=>'(function(e,t,r,i,n,l,s,o){let[a,u,d]=l,f=a*u*d*i.threads;if(f===0&&o===void 0)return;if(a>65535||u>65535||d>65535)throw Error(`lume: \'${i.label}\' dispatches ${a}x${u}x${d}, past the 16 bits a fragment form carries a side`);let c=Math.max(1,Math.min(nTS,Math.ceil(f/_CF))),h=r.viewFor(t,c),p={label:s,colorAttachments:[{view:h,loadOp:"clear",storeOp:"discard",clearValue:{r:0,g:0,b:0,a:0}}]};if(o!==void 0)p.timestampWrites=o;let m=e.beginRenderPass(p);if(f>0){m.setPipeline(i.pipeline);let e=Math.min(n.length,i.groups);for(let t=0;t<e;t+=1){let e=n[t];if(e!==void 0)m.setBindGroup(t,e)}let t=Math.ceil(f/sD);for(let e=0;e<t;e+=1){let t=f-e*sD,r=Math.min(nTS,Math.ceil(t/_CF));m.setViewport(0,0,_CF,r,0,1),m.setScissorRect(0,0,_CF,r),m.draw(3,1,3*(e*65536+a),d*65536+u)}}m.end()})',()=>'(function(e,t,r,i,n,l="",s=0){let o={kind:r,pipeline:e.pipeline,groups:e.groups.slice(0,4),vertex:e.vertex.slice(),vertexOffsets:e.vertexOffsets.slice(),index:e.index,indexOffset:e.indexOffset,indexFormat:e.indexFormat,words:i,args:n,samples:null,query:-1,label:l,bundleDraws:s};return t.draws.push(o),o})',()=>'(function(e,t,r,i){let n=t.querySet;if(n===null||t.queries>=O9){if(n!==null&&t.pass!==null)t.pass.overflow+=1;return i()}if(!(typeof Reflect.get(e,"beginOcclusionQuery")==="function"))return i();r.query=t.queries,t.queries+=1,e.beginOcclusionQuery(r.query);try{return i()}finally{e.endOcclusionQuery()}})',()=>'(function(e,t){let r=(e,r)=>function(n,l){let s=i(this);if(s===null)return a1(t[e],this,n,l);s.tape?.push(r,n,l);if(s.pass===null||!T9(n))return a1(t[e],this,n,l);let o=x9(s,s.pass,e,null,{buffer:n,offset:b9(l,0)});return h9(this,s,o,()=>a1(t[e],this,n,l))};let i=e.recOf;let n={...t,setPipeline(e){let r=i(this);if(r!==null)r.pipeline=uLW(e)?e:null,r.tape?.push(A9,e);return a1(t.setPipeline,this,e)},setBindGroup(e,r,n,l,s){let o=i(this);if(o!==null){o.groups[b9(e,0)]=uLW(r)?r:null;o.tape?.push(K9,e,r,q9(n,l,s));}return a1(t.setBindGroup,this,e,r,n,l,s)},setVertexBuffer(e,r,n,l){let s=i(this);if(s!==null)s.vertex[b9(e,0)]=uLW(r)?r:null,s.vertexOffsets[b9(e,0)]=b9(n,0),s.tape?.push(S9,e,r,n,l);return a1(t.setVertexBuffer,this,e,r,n,l)},setIndexBuffer(e,r,n,l){let s=i(this);if(s!==null)s.index=uLW(e)?e:null,s.indexFormat=r==="uint16"?"uint16":"uint32",s.indexOffset=b9(n,0),s.tape?.push(m9,e,r,n,l);return a1(t.setIndexBuffer,this,e,r,n,l)},draw(e,r,n,l){let s=i(this);if(s===null)return a1(t.draw,this,e,r,n,l);if(s.tape?.push(C9,e,r,n,l),s.pass===null)return a1(t.draw,this,e,r,n,l);let o=x9(s,s.pass,"draw",[b9(e,0),b9(r,1),b9(n,0),b9(l,0)],null);return h9(this,s,o,()=>a1(t.draw,this,e,r,n,l))},drawIndexed(e,r,n,l,s){let o=i(this);if(o===null)return a1(t.drawIndexed,this,e,r,n,l,s);if(o.tape?.push(X9,e,r,n,l,s),o.pass===null)return a1(t.drawIndexed,this,e,r,n,l,s);let a=x9(o,o.pass,"drawIndexed",[b9(e,0),b9(r,1),b9(n,0),b9(l,0),b9(s,0)],null);return h9(this,o,a,()=>a1(t.drawIndexed,this,e,r,n,l,s))},drawIndirect:r("drawIndirect",v9),drawIndexedIndirect:r("drawIndexedIndirect",r9),executeBundles(r){let l=i(this),s=l?.pass??null;if(l===null||s===null||!Array.isArray(r))return a1(t.executeBundles,this,r);let o=r;for(let r of o){if(!uLW(r))continue;let i=e.tapeOf(r);if(i!==void 0){l9(this,n,i);continue}let v$18;{let e=r;let t=Reflect.get(e,"label");v$18=typeof t==="string"?t:"";}let o=x9(l,s,"bundle",null,null,v$18,e.bundleDraws(r));h9(this,l,o,()=>t.executeBundles.call(this,[r]))}return}};return n})']},function(){return[()=>'(function(e,t){let r=e.recOf;return{...t,setPipeline(e){let i=r(this);if(i!==null)i.pipeline=uLW(e)?e:null;return a1(t.setPipeline,this,e)},dispatchWorkgroups(e,i,n){let l=r(this);if(l?.pass)x9(l,l.pass,"dispatch",[b9(e,0),b9(i,1),b9(n,1)],null);return a1(t.dispatchWorkgroups,this,e,i,n)},dispatchWorkgroupsIndirect(e,i){let n=r(this);if(n?.pass&&T9(e))x9(n,n.pass,"dispatchIndirect",null,{buffer:e,offset:b9(i,0)});return a1(t.dispatchWorkgroupsIndirect,this,e,i)}}})',()=>"(function(e,t,r){let i=0;while(i<r.length){let n=r[i];if(n===A9)t.setPipeline.call(e,r[i+1]),i+=2;else if(n===K9){let n=r[i+3];if(n===null)t.setBindGroup.call(e,r[i+1],r[i+2]);else t.setBindGroup.call(e,r[i+1],r[i+2],n);i+=4}else if(n===S9)a1(t.setVertexBuffer,e,r[i+1],r[i+2],r[i+3],r[i+4]),i+=5;else if(n===m9)a1(t.setIndexBuffer,e,r[i+1],r[i+2],r[i+3],r[i+4]),i+=5;else if(n===C9)a1(t.draw,e,r[i+1],r[i+2],r[i+3],r[i+4]),i+=5;else if(n===X9)a1(t.drawIndexed,e,r[i+1],r[i+2],r[i+3],r[i+4],r[i+5]),i+=6;else if(n===v9)t.drawIndirect.call(e,r[i+1],r[i+2]),i+=3;else if(n===r9)t.drawIndexedIndirect.call(e,r[i+1],r[i+2]),i+=3;else return}})",()=>'(function(e,t,r){let i=e.pass;if(i===null||!(typeof Reflect.get(t,"resolveQuerySet")==="function"))return null;let n=t,l=null,s=null;if(e.querySet!==null&&e.queries>0)l=r.createBuffer({label:"lume work queries",size:e.queries*8,usage:P9|u9}),s=r.createBuffer({label:"lume work queries read",size:e.queries*8,usage:H9|k9}),n.resolveQuerySet(e.querySet,0,e.queries,l,0),n.copyBufferToBuffer(l,0,s,0,e.queries*8);let o=i.draws.filter((e)=>e.args!==null&&(e.args.buffer.usage&u9)!==0),a=null;if(o.length>0){a=r.createBuffer({label:"lume work args read",size:o.length*20,usage:H9|k9});for(let e=0;e<o.length;e+=1){let t=o[e];if(t.args!==null){n.copyBufferToBuffer(t.args.buffer,t.args.offset,a,e*20,z9(t.kind)*4)}}}return{pass:i,querySet:e.querySet,resolve:l,queries:s,args:a,argRows:o}})',()=>"(async function(e){try{if(e.queries!==null){await e.queries.mapAsync(H9);let t=new Uint32Array(e.queries.getMappedRange().slice(0));e.queries.unmap();for(let r of e.pass.draws)if(r.query>=0)r.samples=t[r.query*2]+t[r.query*2+1]*4294967296}if(e.args!==null){await e.args.mapAsync(H9);let t=new Uint32Array(e.args.getMappedRange().slice(0));e.args.unmap();for(let r=0;r<e.argRows.length;r+=1){let i=e.argRows[r];i.words=Array.from(t.subarray(r*5,r*5+z9(i.kind)))}}return!0}catch{return!1}finally{I9(e)}})",()=>'((D,A)=>function(e){if(e===null||typeof e!=="object")return;let t=Reflect.get(e,"colorAttachments");if(Array.isArray(t))for(let e=0;e<t.length;e+=1){let r=i9(t[e],"view");if(r!==null)D(A(r));let i=i9(t[e],"resolveTarget");if(i!==null)D(A(i))}let r=i9(i9(e,"depthStencilAttachment"),"view");if(r!==null)D(A(r))})',()=>'((nr,A)=>function(e){let t=i9(e,"colorAttachments"),r=(Array.isArray(t)?i9(t.find((e)=>nr(e)),"view"):null)??i9(i9(e,"depthStencilAttachment"),"view"),i=r===null?void 0:A(r),n=i===void 0?void 0:Reflect.get(i,"sampleCount");return typeof n==="number"&&n>0?n:1})',()=>'(function(e){if(typeof e!=="object"||e===null)return null;let t=Reflect.get(e,"name"),r=Reflect.get(e,"channel"),i=Reflect.get(e,"words"),n=Reflect.get(e,"waitedOn"),l=Reflect.get(e,"waitedMs");if(t!==null&&typeof t!=="string"||r!==null&&!lL(r)||!Array.isArray(i))return null;return{name:typeof t==="string"?t:null,channel:lL(r)?r:null,words:i,waitedOn:typeof n==="number"?n:0,waitedMs:typeof l==="number"?l:0}})']},function(){return[()=>'(function(e){let t=null;let r=null;let i=null;let n=null;let l=null;let s=null;let o=function(e){let v$19;QL:{if(typeof e!=="object"||e===null||Reflect.get(e,"kind")!=="removed"){v$19=null;break QL;}let t=Reflect.get(e,"names"),r=Reflect.get(e,"words");v$19=Array.isArray(t)?{names:t.filter(nH),words:typeof r==="string"?r:""}:null;}let t=v$19;if(t===null||r===null||l!==null||n!==null||!t.names.includes(r))return;l=t,s?.(t.names,t.words)};let a=async function(e){let t=sL(await e.catch(()=>null));if(t===null)return null;if(i=t.channel,r=t.name,i!==null)i.onmessage=(e)=>o(e.data);for(let e of t.words)o(e);return{name:t.name,waitedOn:t.waitedOn,waitedMs:t.waitedMs}};let u=async function(e){let t=e.adopt?.()??null,n=t===null?null:await a(t);if(n!==null)return n;let l=e.now(),s=0;try{if(i=e.openChannel(),i!==null)i.onmessage=(e)=>o(e.data);let t=await e.locks.query(),n=new Set(ZL(t.held)),a=ZL((t.pending??[]).filter((e)=>e.mode==="shared")).filter((e)=>n.has(e));s=a.length,await Promise.all(a.map((t)=>e.locks.request(t,{mode:"shared"},function(){return})));let u=e.mintName();if(u===null)return{name:null,waitedOn:s,waitedMs:e.now()-l};let d=`${KN}${u}`;return await new Promise(function(t,i){e.locks.request(d,{mode:"exclusive"},function(){return r=d,t(),new Promise(function(){return})}).catch(i)}),{name:d,waitedOn:s,waitedMs:e.now()-l}}catch{return{name:r,waitedOn:s,waitedMs:e.now()-l}}};let d=async function(e,t,r){try{let n=ZL((await e.locks.query()).held);if(!n.includes(t))n.push(t);return i?.postMessage({kind:"removed",names:n,words:r}),n}catch{return[t]}};return{stand:()=>t??=u(e),held:()=>r!==null,sayRemoved:function(t){if(l!==null)return Promise.resolve(l.names);return n??=r===null?Promise.resolve([]):d(e,r,t)},onNamed:function(e){if(s=e,l!==null)e(l.names,l.words)},end:()=>e.end()}})',()=>'(function(e){if(typeof e.createShaderModule!=="function")return;let t=e.createShaderModule.bind(e);e.createShaderModule=function(e){if(!e.code.includes("override"))return t(e);let r=new Map;let i=new Map;let n=new Map;let l=!0;let s=mAA(e.code,function({name:e,id:t,type:s,initial:o}){if(l&&=s!==null&&oo.has(s),i.set(e,s),t!==null)n.set(t,e);if(o!==null&&s!==null){r.set(e,eVq(s,o));}return o});if(s===null||i.size===0||!l)return t(e);let o=t({...e,code:s});return Ho.set(o,{code:e.code,written:r,types:i,ids:n,variants:new Map}),o}})',()=>'(function(e){if(typeof e.createShaderModule!=="function")return;let t=e.createShaderModule.bind(e);let r=function(e){let r=Ho.get(e.module);if(r===void 0||e.constants===void 0)return e;let i=new Map;for(let[t,n]of Object.entries(e.constants)){let l=r.types.has(t)?t:r.ids.get(t),s=l===void 0?null:Uo(r.types.get(l)??null,n);if(l===void 0||s===null)return e;i.set(l,s)}if([...i].every(([e,t])=>r.written.get(e)===t)){return Po(e,e.module);}let n=[...i.keys()].sort((e,t)=>e<t?-1:1).map((e)=>`${e}=${i.get(e)}`).join(";"),l=r.variants.get(n);if(l===void 0){let s=mAA(r.code,({name:e,initial:t})=>i.get(e)??t)??r.code;l=t({code:s,label:e.module.label}),r.variants.set(n,l)}return Po(e,l)};let i=function(e){let t=r(e.vertex),i=e.fragment===void 0?void 0:r(e.fragment);if(t===e.vertex&&i===e.fragment)return e;return{...e,vertex:t,...i===void 0?{}:{fragment:i}}};let n=function(e){let t=r(e.compute);return t===e.compute?e:{...e,compute:t}};let l=e.createRenderPipelineAsync?.bind(e);let s=e.createRenderPipeline?.bind(e);let o=e.createComputePipelineAsync?.bind(e);let a=e.createComputePipeline?.bind(e);if(l)e.createRenderPipelineAsync=(e)=>l(i(e));if(s)e.createRenderPipeline=(e)=>s(i(e));if(o){e.createComputePipelineAsync=(e)=>o(n(e));}if(a){e.createComputePipeline=(e)=>a(n(e))}})']},function(){return[()=>"(()=>(`@fragment fn ${yn}(@builtin(position) lume_position: vec4<f32>) -> @builtin(frag_depth) f32 {\n  return lume_position.z;\n}\n`))",()=>'(function(e){if(!e.includes("@fragment"))return{code:e,twins:new Map,entries:[]};let t=AXn(e),r=z4(t);if(r===null)return{code:e,twins:new Map,entries:[]};let i=r.map((e)=>e.name);if(e.includes(mn)){let t=new Map;for(let e of i)if(i.includes(Bn(e)))t.set(e,Bn(e));return{code:e,twins:t,entries:i.filter((e)=>!t.has(e)&&!e.startsWith("lume_depth_"))}}let n=Yk(e),l=[];for(let i of r){if(n.has(i.name)||e.includes(Jn(i.name))||e.includes(Wn(i.name))||e.includes(Bn(i.name)))continue;let r=H9t(t,i);if(r!==null)l.push(r)}if(l.length===0)return{code:e,twins:new Map,entries:i};return{code:Q4(e,l),twins:new Map(l.map((e)=>[e.entry.name,Bn(e.entry.name)])),entries:i}})',()=>'(function(e,t,r){let i=e.depthStencil,n=i!==void 0&&(e.multisample?.count??1)===1&&(i.depthWriteEnabled===!0||i.depthCompare!==void 0&&i.depthCompare!=="always"),l=e.fragment;if(l===void 0||l===null){if(!n)return e;return{...e,fragment:{module:r(),entryPoint:yn,targets:[]}}}let s=t(l.module);if(s===void 0)return e;let o=l.entryPoint??s.only;if(o===null||o===void 0)return e;let a=n?s.twins.get(o):void 0;if(a===void 0)return o===l.entryPoint?e:{...e,fragment:{...l,entryPoint:o}};return{...e,fragment:{...l,entryPoint:a}}})',()=>'(function(e){if(un.has(e))return;if(typeof e.createShaderModule!=="function"||typeof e.createRenderPipeline!=="function"||typeof e.createRenderPipelineAsync!=="function")return;un.add(e);let t=new WeakMap,r=e.createShaderModule.bind(e);e.createShaderModule=function(e){let i=_n(e.code),n=lc(i.code),l=r(n===e.code?e:{...e,code:n});if(i.entries.length>0)t.set(l,{twins:i.twins,only:i.entries.length===1?i.entries[0]:null});return l};let i=null,n=()=>i??=r({label:"lume fragment depth door",code:lc((vn??=$c0I(140)))}),l=(e)=>t.get(e),s=e.createRenderPipeline.bind(e);e.createRenderPipeline=(e)=>s(Kn(e,l,n));let o=e.createRenderPipelineAsync.bind(e);e.createRenderPipelineAsync=(e)=>o(Kn(e,l,n))})',()=>"(function(e,t){return`@vertex fn vs(@builtin(vertex_index) i: u32) -> @builtin(position) vec4f { let p = array(vec2f(-1.0, -1.0), vec2f(3.0, -1.0), vec2f(-1.0, 3.0)); return vec4f(p[i], ${(AT[0]=e,`bitcast<f32>(${kT[0]}u)`)}, 1.0); }\n@fragment fn fs() -> @location(0) vec4f { return vec4f(${t}, 1.0); }\n`})",()=>"(function(e,t){this.census.refused+=1;let r=t.split(`\n`,1)[0]??t;if(this.firstRefusal??=`${e} \\u2014 ${r}`,this.refusalsSaid.has(r))return;this.refusalsSaid.add(r),Fn.warn(`[lume] first-draw warm refused on ${e} \\u2014 ${t}`)})",()=>'(function(e){let t=T1.get(e);if(t===void 0)return null;let r=t.census,i=r.refused>0&&t.firstRefusal!==null?`${r.refused} refused (first: ${t.firstRefusal})`:`${r.refused} refused`;return`[lume] first-draw warm: ${r.asked} render pipeline${r.asked===1?"":"s"} asked, ${r.drawn} drawn at its build, ${i}, ${r.unfilled} unfilled; the queue answered the warms in ${Math.round(r.answeredMs)} ms, the longest ${Math.round(r.longestMs)} ms`})',()=>"(function(e){let t=AQ.get(e);if(t===void 0)return null;let r=[];for(let e=0;e<t.bindings.length;e++){let i=t.bindings[e]??0,n=t.resources[e]??null,l=t.buffers[e]??null;if(n!==null)r.push({binding:i,resource:n});else if(l!==null)r.push({binding:i,resource:{buffer:l,offset:t.offsets[e],size:t.sizes[e]}})}return{label:t.label,layout:t.layout,entries:r}})"]},function(){return[()=>'(function(e,t){let r=[];for(let e=0;e<t.bindings.length;e++){let i=t.bindings[e]??0,n=t.resources[e]??null,l=t.buffers[e]??null;if(n===null){if(l!==null)r.push({binding:i,resource:{buffer:this.buffer(l),offset:t.offsets[e],size:t.sizes[e]}});continue}let s=G6(n);r.push({binding:i,resource:s!==null?this.buffer(s):n})}let i=this.device.createBindGroup({label:`${t.label??"bind group"} (${this.label})`,layout:t.layout,entries:r});return this.groups.set(e,i),i})',()=>'(function(e){let t=f5.get(e);if(t)return t;let r=new Set;f5.set(e,r);LcW(e,function(e){if(r.size===0)return;Qb(r,e);});let i=e.lost;if(i!==void 0&&typeof i.then==="function")i.then(function(e){for(let t of r)t.settle(t.refusal??`the GPU device was lost (${e.reason}${e.message?`: ${e.message}`:""})`);r.clear()},function(){return});return r})',()=>'(function(e,t=Bra()){let r=S1.get(e),i=r===void 0||r.count===0?void 0:f1(r,r.count-1);if(r===void 0||i===void 0)return"; nothing in flight: no submit yet";if(i.ordinal>r.completed)return"";let n=r.retired?`, the last completion word ${Math.max(0,Math.round(t-r.retiredAtMs))} ms before`:"";return`; nothing in flight: the last submit #${i.ordinal} ${Math.max(0,Math.round(t-i.submittedAtMs))} ms before the loss${n}`})',()=>'((e)=>function(){let t=[];for(let r of e){let i=r.deref();if(!i){e.delete(r);continue}let n=Reflect.get(i,"mapState");if(typeof n==="string"&&n!=="unmapped")t.push({label:i.label===""?"(unlabeled)":i.label,mapState:n})}return t})',()=>'(function(e,t,r,i,n,l,s){let o={cancelled:!1};e.waiting=o;let a=function(){if(e.waiting===o)e.waiting=null;if(o.cancelled||!e.live)throw new DOMException("lume: the buffer was unmapped or destroyed before its map","AbortError")};return t.then(function(){return a(),L5(r,i,n,l,s)},function(e){throw a(),e})})',()=>"(function(e){if(this.released)return!0;if(J7o(this.device))return!0;let t=this.current;if(O2u(t))return!1;if(W5.has(t)){V1+=1;this.dropTrial();return this.stand(t,this.mint(u5(this.currentDescriptor)));}if(!Mb6(t)){if(this.refillOwed)this.fill(t,t);return this.refillOwed=!1,!0}let r=this.trial;if(r!==null){if(V1+=1,O2u(r))return!1;if(this.trial=null,!Mb6(r))return this.stand(t,r);r.destroy()}if(this.waitsForRoom&&!e)return!1;V1+=1;let i=this.mint(u5(this.currentDescriptor));if(this.holdsReissue||this.waitsForRoom)if(O2u(i))this.trial=i;else if(!Mb6(i))return this.stand(t,i);else i.destroy();else this.stand(t,i);if(!this.waitsForRoom)this.waitsForRoom=!0,OPO(this.roomReturned);return!Mb6(this.current)})",()=>'(function(e,t,r,i){let n=i?v$D(i.bytes,i.count):"";return`${mpH(e)}; gpu memory: ${t.textures} textures ${DbP(t.textureBytes)} (peak ${DbP(t.texturePeakBytes)}) + ${t.buffers} buffers ${DbP(t.bufferBytes)}${n.length>0?` (${n})`:""}; submits: ${r}`})',()=>'(async function(e,t){let r=[];try{for(let i of R1){let n=UB(i.width,i.height).getContext("webgpu");if(n===null)break;n.configure({device:e,format:t,alphaMode:"premultiplied"}),r.push(n)}}catch{}if(r.length===0)return null;let i=null,n=null;try{e.pushErrorScope("validation");try{let t=e.createCommandEncoder({label:"lume compositor proof"});for(let e of r){let r=e.getCurrentTexture().createView({label:"lume compositor proof"});t.beginRenderPass({label:"lume compositor proof",colorAttachments:[{view:r,loadOp:"clear",storeOp:"store",clearValue:{r:0,g:0,b:0,a:0}}]}).end()}e.queue.submit([t.finish({label:"lume compositor proof"})])}catch(e){i=k$w(e)}n=await e.popErrorScope()}catch{n=null}for(let e of r)try{e.unconfigure()}catch{}if(i!==null&&n===null)return null;return n?.message??null})']},function(){return[()=>'(function(){let e=pN4()?.gpu.rendererRaw;if(e)return e;try{let e=UB(1,1).getContext("webgl2",{powerPreference:"low-power"});if(e===null)return null;try{let t=e.getExtension("WEBGL_debug_renderer_info"),r=t===null?null:e.getParameter(t.UNMASKED_RENDERER_WEBGL);return typeof r==="string"&&r.trim().length>0?r.trim():null}finally{e.getExtension("WEBGL_lose_context")?.loseContext()}}catch{return null}})',()=>"(async function(e,t,r){try{return await af1(e,{...t,passedOver:null,softwareBehind:!0})}catch(i){if(i instanceof JB||i instanceof h5)throw i;return Fn.warn(`[lume] the compatibility device on ${b1(t.adapter)} did not stand (${k$w(i)}): lume stands on the core adapter ${b1(r)}`),af1(e,{adapter:r,attempts:t.attempts,compatibility:!1,passedOver:null})}})",()=>'((ot,e)=>function(t){let v$22;{let e$34=t;{let e=e$34;let t="unknown GPU error",r="unknown";if(typeof e==="object"&&e!==null){let i=Reflect.get(e,"message");if(typeof i==="string"&&i.length>0)t=syo(i);let n=e.constructor.name;if(n.includes("Validation"))r="validation";else if(n.includes("OutOfMemory"))r="out-of-memory";else if(n.includes("Internal"))r="internal"}v$22={type:r,message:t};}}let r=v$22;if(ot(r),r.type==="out-of-memory")e.onAllocationRefused?.({kind:"oom",label:"(uncaptured)",bytes:0,message:r.message,resource:null})})',()=>'((e)=>(t,r,i,n,l)=>function(s){if(!s)return;if(l){Fn.warn(`[lume] GPU refused a diagnostic read\'s allocation${n==="validation"?" (invalid descriptor)":""}: ${r} (${DbP(i)}): ${s.message}`);return}_l(t);let o=(t)[gl]?.live===!1;let a=J5(r);let u=_1.get(a);if(o)Fn.warn(`[lume] GPU refused an allocation its owner had already destroyed${n==="validation"?" (invalid descriptor)":""}: ${r} (${DbP(i)}): ${s.message}`);else if(u===void 0)_1.set(a,{refusals:1,sinceMs:Bra()}),Fn.warn(`[lume] GPU refused an allocation${n==="validation"?" (invalid descriptor)":""}: ${r} (${DbP(i)}): ${s.message}`);else u.refusals+=1;e.onAllocationRefused?.({kind:n,label:r,bytes:i,message:s.message,resource:t})})',()=>'(function(){let e=((this))[gl];let t=e?.nativeUnmap;if(e===void 0||t===null||t===void 0)throw TypeError("lume: an unmap on a buffer whose unmap the device never read");if(e.waiting!==null)e.waiting.cancelled=!0,e.waiting=null;return t.call(this)})',()=>'((e,ct)=>function(t,r){let i=t.shape===""?"buffer":"texture";let n=i==="buffer"?(Gm((t.usage),(Fm??=$c0I(4)))):t.shape;let l=`${i}\\x00${t.label}\\x00${t.format}\\x00${n}`;let s=e.get(l);if(s===void 0)s={kind:i,label:t.label,format:t.format,shape:n,count:0,bytes:0,drawn:0,drawnBytes:0,copied:0,copiedBytes:0},e.set(l,s);s.count+=1,s.bytes+=t.bytes;let o=ct.useOf(r);if(o==="drawn")s.drawn+=1,s.drawnBytes+=t.bytes;else if(o==="copied")s.copied+=1,s.copiedBytes+=t.bytes})',()=>'(function(e,t){let r=R4.get(e);if(r===void 0||t<=0)return[];for(let e of r.slots){if(e.ordinal!==t)continue;let r=[];for(let t=0;t<e.count;t+=1){let i=e.pipelines[t];if(i===void 0)continue;let n=Pms(i)??i.label;if(typeof n==="string"&&n.length>0)r.push(n)}return r}return[]})',()=>'(function(e){let t=ZE.get(e);if(t){let e=t.handle.view();if(t.binding.view!==e)t.binding={view:e,sampler:t.binding.sampler};return t.binding}let r=gQc(e,"lume share color placeholder","rgba8unorm",new Uint8Array([0,0,0,255])),i={view:r.view(),sampler:e.createSampler({label:"lume share color sampler",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge",magFilter:"linear",minFilter:"linear"})};return ZE.set(e,{handle:r,binding:i}),i})']},function(){return[()=>"(function(e,t){let r=u5k,i=new Uint8Array(r*t*4);for(let n=0;n<t;n++){let t=e+n,l=t<r/2?t:t-r;for(let e=0;e<r;e++){let t=e<r/2?e:e-r,s=(n*r+e)*4;for(let e=0;e<4;e++)i[s+e]=Math.round(ely(t,l,oc[e])*255)}}return i})",()=>'(function(e,t,r,i=hK){if(e===null)return{streamGpu:!1,code:null,speak:null};let n=Dfo(e);if(n==="gpu"&&t==="web")return{streamGpu:!1,code:Z9,speak:null};let l=r===null?i.ceiling:JsL((n==="gpu"?i:{floor:i.ceiling,ceiling:i.ceiling}),r);if(l===null)return{streamGpu:!1,code:D9,speak:null};return{streamGpu:n==="gpu",code:null,speak:l}})',()=>'(function(e,t){let v$23;OmR:{let e$37=t;{let e=e$37;if(!Array.isArray(e)||e.length!==2){v$23=null;break OmR;}let t=e[0],r=e[1];v$23=typeof t==="number"&&typeof r==="number"&&Number.isInteger(t)&&Number.isInteger(r)&&t<=r?{floor:t,ceiling:r}:null;}}return v$23??(typeof e==="number"&&Number.isInteger(e)?{floor:e,ceiling:e}:null)})',()=>"(function(e,t){let r=fE.get(e);if(r?.source===t)return r.whole;let i=XE.get(t),n=GE.get(t),l=BE.get(t);if(i===void 0||n===void 0||l===void 0)return t;let s=arM(i,{label:t.label,layout:l,entries:[...n]});return fE.set(e,{source:t,whole:s}),s})",()=>"(function(e,t,r){let i=IE.get(e)??e,n=XE.get(i),l=GE.get(i);if(n===void 0||l===void 0)return e;let s=QE.get(i)??MPW(n).seeThroughBlackTexel,o=nE.get(i);if(o===void 0)nE.set(i,o=new WeakMap);let a=o.get(t);if(a===void 0)o.set(t,a=new WeakMap);return a.get(s)??c9V(n,l,t,r,s,a)})",()=>"(function(e){let t=this.fenceCount,r=this.settling,i=!1,n=0;for(let l=0;l<t;l+=1){let t=this.fenceTokens[l];if(t===e)i=!0,r.armedAtMs=this.fenceArmedAtMs[l],r.newestBuild=this.fenceNewestBuild[l],r.buildsAtDevice=this.fenceBuildsAtDevice[l],r.underCover=this.fenceUnderCover[l]===1;if(t<=e)continue;this.fenceTokens[n]=t,this.fenceArmedAtMs[n]=this.fenceArmedAtMs[l],this.fenceNewestBuild[n]=this.fenceNewestBuild[l],this.fenceBuildsAtDevice[n]=this.fenceBuildsAtDevice[l],this.fenceUnderCover[n]=this.fenceUnderCover[l],n+=1}return this.fenceCount=n,i})",()=>"(function(e,t,r=0){if(!this.takeFence(e))return null;let i=this.settling;if(this.final&&!this.watchesWidth)return this.prune(),null;this.counts.fences+=1;let n=Math.max(i.armedAtMs,this.lastSettleAtMs);this.lastSettleAtMs=t;let l=Math.max(0,t-n),s=this.floor();if(this.shortestRoundTripMs===null||l<this.shortestRoundTripMs)this.shortestRoundTripMs=l;let o;if(i.buildsAtDevice===0&&this.nextBuild-1!==i.newestBuild)this.counts.overtaken+=1,o=null;else if(i.buildsAtDevice===0){if(this.counts.unheld+=1,this.baselineRoundTripMaxMs===null||l>this.baselineRoundTripMaxMs)this.baselineRoundTripMaxMs=l;o=this.final?null:this.readLapse(t)}else if(this.final)o=this.readWidth(i,t,l,n,Math.max(0,r),s);else if(this.decided&&this.verdictValue)o=this.readStormWidth(i,t,l,n,Math.max(0,r),s);else o=this.readHeld(i,t,l,n,Math.max(0,r),s);if(this.final)return o??=this.readClimb(t),this.prune(),o;if(o!==null)return o.lapsedAtMs===null?this.decide(o):o;return this.prune(),null})",()=>"(function(e,t,r,i,n,l){let s=this.readHeld(e,t,r,i,n,l,e.underCover?Sp0:SR);if(!s?.verdict)return null;this.climbCeiling=Math.min(this.climbCeiling,(Math.max(1,Math.floor((s.buildsAtDevice)/2))));this.endGeneration();if(!this.narrowWidth(s.buildsAtDevice))return null;let o=s.floorRoundTripMs+Sp0;if(!(Math.max(0,r-n)>o&&(s.buildsSettledAtMs===null||s.buildsSettledAtMs-e.armedAtMs>o)))return{...s,starvedReadings:this.starvedReadings,poolWidth:this.widthValue??1,held:!0};return this.starvedReadings=s.starvedReadings,{...s,poolWidth:this.widthValue??1}})"]},function(){return[()=>"(function(e){let t=this.widthValue,r=this.wholeAtMs,i=this.generationAnsweredAtMs;if(t===null||r===null||i===null||t>=this.climbCeiling)return null;for(let e=0;e<this.fenceCount;e+=1)if(this.fenceArmedAtMs[e]<=i)return null;let n=Math.max(t,this.generationPeak),l=Math.min(this.climbCeiling,Math.max(t+1,n)),s=this.generationUnderCover;this.endGeneration(),this.widthValue=l;let o=this.floor()??0;return{verdict:!0,fenceArmedAtMs:r,fenceSettledAtMs:e,buildsAtDevice:n,buildsSettledAtMs:i,floorRoundTripMs:o,baselineRoundTripMs:this.baselineRoundTripMaxMs,workerHeldMs:0,besideThroughMs:null,heldFromMs:r,starvedReadings:this.starvedReadings,poolWidth:l,lapsedAtMs:null,climbedFromWidth:t,...s?{climbedUnderCover:!0}:{}}})",()=>"(function(e){let t=this.reading;if(!this.decided||!this.verdictValue||t===null||this.atDevice.size>0)return null;if(this.newestBuildSettledAtMs!==null&&e-this.newestBuildSettledAtMs<=SR)return null;return this.decided=!1,this.reading=null,this.besideFrom=mnS(this.besideFrom),{...t,verdict:!0,lapsedAtMs:e}})",()=>"(function(e,t,r,i){let n=[];for(let e of t){let t=this.reachedAtMs.get(e);if(t!==void 0&&t<i)n.push([Math.max(t,r),i])}for(let[t,l]of this.settled){if(t>e.newestBuild||l<=r)continue;let s=this.reachedAtMs.get(t)??l,o=Math.min(l,i);if(s<o)n.push([Math.max(s,r),o])}n.sort((e,t)=>e[0]-t[0]);let l=0,s=-1/0;for(let[e,t]of n){if(t<=s)continue;l+=t-Math.max(e,s),s=t}return l})",()=>"(function(e,t,r,i){if(this.decided||this.baselineRoundTripMaxMs===null||r>this.baselineRoundTripMaxMs+SR)return null;for(let r of i){let i=this.besideFrom.get(r);if(i===void 0)this.besideFrom.set(r,{armedAtMs:e.armedAtMs,settledAtMs:t,buildsAtDevice:e.buildsAtDevice});else if(t-i.settledAtMs>SR)return{verdict:!1,fenceArmedAtMs:i.armedAtMs,fenceSettledAtMs:i.settledAtMs,buildsAtDevice:i.buildsAtDevice,buildsSettledAtMs:null,floorRoundTripMs:this.baselineRoundTripMaxMs,baselineRoundTripMs:this.baselineRoundTripMaxMs,workerHeldMs:0,besideThroughMs:t,heldFromMs:i.armedAtMs,starvedReadings:0,lapsedAtMs:null}}return null})",()=>"(function(){JrI(this.atDevice),JrI(this.settled),JrI(this.named),JrI(this.reachedAtMs),this.fenceCount=0,this.besideFrom=mnS(this.besideFrom),this.lastSettleAtMs=-1/0,this.newestBuildSettledAtMs=null,this.endGeneration()})",()=>"(function(){if(this.settled.size===0)return;if(this.fenceCount===0){for(let e of this.settled.keys())this.named.delete(e),this.reachedAtMs.delete(e);JrI(this.settled);return}let e=1/0;for(let t=0;t<this.fenceCount;t+=1)if(this.fenceNewestBuild[t]<e)e=this.fenceNewestBuild[t];for(let t of this.settled.keys())if(t>e)this.settled.delete(t),this.named.delete(t),this.reachedAtMs.delete(t)})",()=>'(function(e){let t=e.poolWidth??1;if(t<2)return"builds now issue one at a time and a speculative warm waits for a completed frame";if(e.climbedFromWidth!==void 0)return`where builds share a pool beside this device, it now stands at most ${t} builds at once (one at a time elsewhere)`;return`where builds share a pool beside this device, it now stands at most ${t} builds at once, half the ${e.buildsAtDevice} this frame waited for (one at a time elsewhere)`})']},function(){return[()=>"(function(e,t){let r=this.run;if(r===null)return null;if(r.expectKick){let e=r.arm;if(hZ(r,!0),r.tainted=!0,this.attempt(r,e,null,null))return null}return r.opened=!0,r.expectKick=e&&!t,r.armFrames+=1,r.arm===r.first})",()=>"(function(e,t){let r=this.run;if(r===null||!r.opened)return;if(r.kickCpuPending){if(r.kickCpuPending=!1,r.reading!==null)r.readCpuSumMs+=e,r.readCpuFrames+=1;return}if(r.cpuSumMs+=e,r.cpuFrames+=1,!t)r.served=!1})",()=>"(function(){let e=this.samples,t=this.cpuSum/e,r=this.gpuSum/e,i=Math.sqrt((Math.max(0,this.cpuSquares-e*t*t)+Math.max(0,this.gpuSquares-e*r*r))/(e*(e-1)));if(this.counts[4]+=1,this.withheld){if(r-t<=2*i)return!1;return this.withheld=!1,this.settling=!0,this.withheldGpuMs=r,this.counts[6]+=1,!0}if(this.withheldGpuMs===this.withheldGpuMs)this.relief=Math.min(this.relief,r/this.withheldGpuMs);if(this.withheldGpuMs=NaN,t-r/this.relief<=2*i)return!1;return this.withheld=!0,this.settling=!0,this.counts[5]+=1,!0})",()=>'(function(e,t,r,i){let n=e.fragment?.targets,l=e.depthStencil;if(n===void 0||(e.multisample?.count??1)!==1||l?.depthWriteEnabled!==!0)return null;return()=>({...t(),label:r,depthStencil:dnK(l),fragment:{module:i(),entryPoint:"fsDepth",targets:Array.from(n,(e)=>e&&{format:e.format,writeMask:0})}})})',()=>'(function(){let e=this.floorMsPerChar??0,t=this.slow.filter((e)=>this.outbuilt(e)).map((e)=>e.ms/e.chars),r=this.offered.filter((r)=>r>e&&(this.contradicted(r)||t.includes(r)));if(r.length>0){this.offered=this.offered.filter((e)=>!r.includes(e));let e=this.roomMs!==null&&this.widest>0?jd*this.roomMs/this.widest:1/0,t=Math.min(e,...r);this.onFloorRetired?.(t,t<e?"outbuilt":"contradicted")}if(e>0&&!this.offered.includes(e))this.offered.push(e)})',()=>'(function(e){if(typeof e!=="object"||e===null||!("verdict"in e))return;let{verdict:t}=e;let v$24;wqb:{let e$43=t;{let e=e$43;if(typeof e!=="object"||e===null){v$24=!1;break wqb;}let t={...e},r=t.cause;v$24=typeof t.code==="string"&&typeof t.decider==="string"&&Number.isInteger(t.epoch)&&typeof t.retriable==="boolean"&&typeof t.fault==="string"&&typeof r==="object"&&r!==null&&typeof{...r}.message==="string";}}return v$24?t:void 0})',()=>"(function(){let e=this.fenceArmedAtMs,t=this.judgeFenceTokens,r=this.judgeFenceOrdinals,i=new Float64Array(e.length*2),n=new Float64Array(e.length*2),l=new Float64Array(e.length*2);for(let s=this.fenceFloor+1;s<this.fencesArmed;s+=1){let o=s&e.length-1,a=s&i.length-1;i[a]=e[o],n[a]=t[o],l[a]=r[o]}this.fenceArmedAtMs=i,this.judgeFenceTokens=n,this.judgeFenceOrdinals=l})",()=>"(function(){let e=(e)=>e?.issuedAtMs===null&&e.settledAtMs===null&&!e.failed,t=[...this.buildLedger.values()].filter(e).map((e)=>e.key);return()=>{return t=this.readPass(()=>t.filter((t)=>{if(!e(this.buildLedger.get(t)))return!1;let r=this.entryAt(t);return hO(r)&&!this.owedNowhere(r)})),t.length>0}})",()=>'(function(e){let t=[];for(let r of e){let e=this.entryKeys.get(r);t.push(`${e??"(no key)"} ${HGz(r)!==null?"built":r.failed?"parked":"compiling"}${r instanceof vQ&&r.queued?`, queued${this.waitsForItsRead(r)?", waits for a frame\'s read":""}`:""}${this.ownEntry(r,e)?"":", not the cache\'s entry"}`)}return t})']},function(){return[()=>"(function(e,t){let r=this.pendingAskCapture,i=r===this.pendingAskSet?new Set:this.pendingAskSet;i.clear(),this.pendingAskCapture=i;try{return e()}finally{this.pendingAskCapture=r;for(let e of i){if(r!==null)r.add(e);if(this.stillBuilding(e))t.push(e)}i.clear()}})",()=>"(function(e,t){let r=this.renderPipelines.get(e),i=this.renderPipelines.get(t);if(r===void 0||i===void 0||!this.continuityEntries.has(r)||this.continuityEntries.has(i))return;if(this.continuityEntries.add(i),i.queued!==null)this.drainWarmQueue()})",()=>'(function(e){let t=e.entry;if(t!==null&&!t.failed)return t;let r=e.entry=this.calmScope(()=>this.warmScope(()=>this.request(this.renderPipelines,"render",e.key,()=>this.buildRenderPipeline(e.key,e.descriptor())),"late"));if(t!==null&&r!==t&&r.built!==null){{Y8+=1,R8+=1}}return r})',()=>"(function(e){let t=this.liquidTwinsBySource.get(e);if(t===void 0)return null;t.descriptor??=()=>S1x(t.record,()=>OLp(t.base(),t.ask,this.liquidTwinModule,t.key));return this.getRenderPipeline(t.key,t.descriptor)})",()=>"(function(e,t){if(!t)return this.keptCoverOverrides.delete(e),(e)=>this.resolveCoverPipeline(e);let r=this.generation,i=this.keptCoverOverrides.get(e);if(i?.generation===r)return i.override;let n=(e)=>this.resolveCoverPipeline(e);return this.keptCoverOverrides.set(e,{generation:r,override:n}),n})",()=>"(function(e){let t=this.peelPipelinesBySource.get(e);if(t===void 0||t.mode===\"source\")return e;if(t.mode===\"skip\")return null;if(t.entry===null)throw Error(`lume: postcard peel pipeline '${t.variantKey}' was never requested \\u2014 the peel replays only in the turn pendingPeelPipelines() answers null`);if(t.entry.pipeline!==null)return t.entry.pipeline;if(t.entry.failed)throw Error(`lume: postcard peel pipeline '${t.variantKey}' failed to build`);throw Error(`lume: postcard peel pipeline '${t.variantKey}' is still compiling`)})",()=>'(function(e,t){if(e.formless||!U9$())return;if(e.text===null){try{e.text=P4a(e.form.wgsl(),e.form.entryPoint)}catch(r){e.formless=!0,Tp.warn(`[lume] \'${t}\' has no fragment form: ${k$w(r)}`);return}}let r=HD+t,i=e.text.code;e.twinDescriptor??=()=>{{let e$24=this.device,t$20=e.form.layout(),r$10=i,i$4=r;{let e=e$24,t=t$20,r=r$10,i=i$4;let n=e.createShaderModule({label:i,code:r});return{label:i,layout:t,vertex:{module:n,entryPoint:"spawn_kernel_vertex"},fragment:{module:n,entryPoint:"spawn_kernel_fragment",targets:[{format:tv6,writeMask:0}]}}}}};e.twin=this.getRenderPipeline(r,e.twinDescriptor)})',()=>"(function(e,t,r,i){let n=this.resourceLease,l=null;if(n!==void 0)for(let s of r){let r=n.allocationOf(s);if(r===null)continue;if(Mb6(r))return this.refuseBindGroup(e,t,i,!1);if(O2u(r))(l??=[]).push(r)}if(l===null)return this.refuseBindGroup(e,t,i,!0);o4F(l,()=>this.judgeBindGroup(e,t,r,i))})",()=>'(function(e,t,r){return new Promise((i)=>{let n={},l=!0,s=function(){l=!1,i(null)},o=()=>{l=!1,this.outsideDrops.delete(s);let n=this.wallNowMs(),o=this.buildsInFlight,a={asker:r,ms:null,ok:!1,chars:0},u=this.lineRides.get(e);if(u===void 0)this.lineRides.set(e,[a]);else u.push(a);let d=this.issue(`${zs}${e}`,()=>{n=this.wallNowMs(),o=this.buildsInFlight;let e=t();if(a.chars=e.chars,e.chars>0)this.noteParse(e.chars);return e.answer},"warm",js),f=e3w(this.poolInflightMax)?this.admittedPoolWidth??null:null,c=(e)=>()=>{a.ms=this.wallNowMs()-n,a.ok=e,i({ok:e,ms:a.ms,inFlight:o,ceiling:f}),this.drainWarmQueue()};d.then(c(!0),c(!1))};this.idleEntries.add(n),this.outsideDrops.add(s),this.warmQueues[js].push({entry:n,pending:()=>l,waiting:()=>l?{key:e,create:t,drawnAtMs:null}:null,drawn:()=>!1,issue:o,issueParsed:()=>!1}),this.drainWarmQueue()})})']},function(){return[()=>"(function(e){if(this.bindGroupEntries.delete(e),e.cancelRetirement?.(),e.cancelRetirement=null,e.node.value!==e)return;{let e$53=e.node;{let e=e$53;let t=e;t.value=null;while(t!==null&&t.value===null&&t.children===null){let e=t.parent;if(e!==null){{let t$32=t;{let t=t$32;let r=e.children;if(r===t)e.children=null;else if(r instanceof Map){if(r.delete(t.step),r.size===1)e.children=r.values().next().value??null;else if(r.size===0)e.children=null}}}}t=e}}}})",()=>"(function(e,t,r){let i=this.refusalOf(e,t);if(i!==null)return this.refuseInPlace(e,t,i);if(e.refused)delete e.refused,e.attempts=0,e.budgetsExhausted=0,delete e.lastError;e.failed=!1,this.parkedPipelineCount=Math.max(0,this.parkedPipelineCount-1);let n=this.isDraw(),l=n?this.currentLane():this.askedLane(t),{ready:s,queued:o}=this.queuedBuild(t,r,n||this.isDrawnAsk());if(e.queued=o,e.queuedLane=l,this.kickBuild(e,t,s),n)return this.issueForDraw(e);this.enqueueWarm(e,l),this.drainWarmQueue()})",()=>"(function(e,t){if(NcM()===null)Rw4(`${e}: ${t.split(`\n`)[0]}`),Tp.warn(`[lume] this device's compiler refused '${e}' with an internal error: every compute program now draws through its smaller form, and no compute build reaches the device again`);for(let[t,r]of this.computePipelines){if(t===e||r.queued===null)continue;this.heldForText.delete(r),this.refuseInPlace(r,t,PE)}})",()=>'(function(e){let t=e.lastError??"no error text";if(e.retryAtMs===1/0)return{state:"parked",attempts:e.attempts,deterministic:e.budgetsExhausted>=qs,error:t};return{state:"retrying",attempts:e.attempts,retryInMs:Math.max(0,e.retryAtMs-this.frameNowMs),error:t}})',()=>'(function(e){let t=this.watchdogSmallerByKey.get(e);if(t!==void 0)return t;let r=$mT(e,this.buildTaintsByKey.get(e));return r===null?void 0:(r.endsWith(Xy8)?"the material\'s own colour":$1w("material",r.endsWith(Eqp)))})',()=>'(function(){return this.buildsInFlight>0?`${this.drawBuildsInFlight} draw and ${this.warmBuildsInFlight} warm build(s) at the compiler: the next warm waits for them, then for a completed playable frame`:"waiting for a completed playable frame between warm builds"})',()=>"(function(e,t,r){let i=t.queuedLane>=0?this.warmQueues[t.queuedLane]:void 0,n=i===void 0?-1:i.findIndex((e)=>e.entry===t&&e.pending());this.withdrawQueued(e,t,MQ);let l=i===void 0||n<0||r===void 0?-1:i.findIndex((e)=>e.entry===r&&e.pending());if(i!==void 0&&l>n)i.splice(n,0,...i.splice(l,1))})",()=>"(function(e,t,r,i){let n=this.sourceTurnOf(e[r]?.queued?.key),l=r;for(let s=t;s<e.length&&n!==Ts;s+=1){let t=e[s].queued;if(s===r||t===null||!i(e[s]))continue;let o=this.sourceTurnOf(t.key);if(o>=n)continue;l=s,n=o}return l})",()=>"(function(e){if(this.parseMsPerUnit===null||e===null||this.frameMinMs===1/0)return!this.parseRoomTaken&&this.parseRoomSpentMs>=0;return this.parseRoomSpentMs>=Math.min(4*this.frameMinMs*this.wholeShare,e*this.parseMsPerUnit)})",()=>"(function(e){let t=k$w(e);if(!AE(t))throw e;if(NcM()!==null)return null;return Rw4(`spawn gpu-measure compute: ${t.split(`\n`)[0]}`),sk.warn(\"[lume] this device's compiler refused 'spawn gpu-measure compute' with an internal error: the device opens at the low class, and where it stands the fragment forms every compute program draws through its smaller form and no compute build reaches the device again\"),null})"]},function(){return[()=>'(async function(e,t){let r=TK(e.adapterDescription,e.rendererRaw),{cached:i}=Cb(r,AeN(e.cached),AeN(e.carried)),n=e.session??null;if((i===null?n!==null&&LK(n.key,r):!i.rebenchOwed)||e.early!==void 0)return $Xa(e);let l=Zv$({device:e.device,adapterDescription:e.adapterDescription,stored:null,...e.bench===void 0?{}:{bench:e.bench}});if(l.kind!=="bench")return $Xa({...e,early:l});let s=l.run.then(()=>null);let a=await Promise.race([s,t.then((e)=>(e!==null&&!e.rebenchOwed&&LK(e.key,r))?e:s)]);return $Xa({...e,...a===null?{}:{cached:a},early:l})})',()=>'(function(e,t,r,i){let n=r?": the page carried it (the device gave none under this key)":"";let l=i?"; the reading taken before the init is set aside":"";let s=t.key===e?t:{...t,key:e};let o=s===t?"":`; the record of bench ${t.key.slice(0,t.key.indexOf("|"))} is kept under this bench\'s key`;let a;V2F:{let e=s;let t=ZVA(e);if(t==="provisional"){a="; it stands on its one first reading, and a second is taken behind the picture";break V2F;}if(t==="older-bench"){a="; its readings are an older bench\'s, and this bench\'s reading is taken behind the picture";break V2F;}if(t==="contended"){a="; its reading is contended, and it is taken again behind the picture";break V2F;}a="";}return{key:e,measure:hv6(s,"cache"),record:s===t?null:s,standing:s,carried:r,bench:null,benchResult:null,benchMs:0,word:`measured ${t.msPerMpx.toFixed(3)} ms/Mpx (cache, min of ${t.readings.length}); no bench${n}${l}${o}${a}`}})',()=>'(function(e){let{standing:t,run:r}=e,i=ZVA(t);if(i===null)return null;let n=t.key,l=r.benchMs,s={provisional:"the record stood on one reading: the second, taken behind the picture,","older-bench":"the record stood on an older bench\'s readings: this bench\'s, taken behind the picture,",contended:`the record stood on a contended ${t.msPerMpx.toFixed(3)} ms/Mpx: the retake behind the picture`}[i],o=(e,r)=>({key:n,measure:hv6(t,"cache"),record:null,standing:t,carried:!1,bench:r===null?null:cP(r),benchResult:r,benchMs:l,word:`${s} ${e}: the ${t.msPerMpx.toFixed(3)} ms/Mpx stands, and the record still owes the reading`});if("unread"in r)return o("found no quiet before the page was shown again",null);if("error"in r)return o(`threw (${r.error})`,null);let a=Pb(r.result,(e.now??jb)());if(a===null)return o(r.result.ended==="lost"?"lost its device":"was unmeasurable",r.result);let u=i==="contended"?VZv(t).record:t,d=EK(u,n,a),f=d.msPerMpx<u.msPerMpx,c=r.result.contended?", contended":"",h=i==="contended"?` (${pK(d)} of the epoch\'s armings spent)`:"",p=f?`${s} moved the min ${u.msPerMpx.toFixed(3)} \\u2192 ${d.msPerMpx.toFixed(3)} ms/Mpx${c} in ${l} ms`:`${s} read ${a.msPerMpx.toFixed(3)} ms/Mpx${c} in ${l} ms, and the min ${d.msPerMpx.toFixed(3)} stands${h}`;return{key:n,measure:hv6(d,f?"fresh":"cache"),record:d,standing:d,carried:!1,bench:cP(r.result),benchResult:r.result,benchMs:l,word:p}})',()=>'(function(e){let{key:t,cached:r,result:i,benchMs:n}=e,l=i.ended==="lost",s={key:t,record:null,carried:!1,bench:e.receipt,benchResult:i,benchMs:n};if(r!==null)return{...s,measure:hv6(r,"cache"),standing:r,carried:e.fromCarry,word:`${e.said} ${l?"lost its device":"unmeasurable"}: the cached ${r.msPerMpx.toFixed(3)} ms/Mpx stands`};let o=l?cb(i,e.measuredAt):null;if(o!==null)return{...s,measure:hv6(EK(null,t,o),"fresh"),standing:null,word:`measured ${o.msPerMpx.toFixed(3)} ms/Mpx (fresh) in ${n} ms, from a bench whose device was lost under it: this session\'s alone; no record keeps it, and the next boot benches`};if(l)return{...s,measure:null,standing:null,word:"unmeasurable: the device was lost under the bench; no reading, and the device asked for in its place benches"};return{...s,measure:null,standing:null,word:"unmeasurable: no reading; the unmeasured class opens, the next boot benches again"}})']},function(){return[()=>'(async function(e,t,r,i){return kJP(_K,function(r){let n=r.answer==="found"?AeN(r.value):null;if(n?.key!==e)return{outcome:"no-record"};let l=hIW(n,t,i??n.classShift);return l.record===n?{outcome:l.outcome}:{value:l.record,outcome:l.outcome}},r)})',()=>'((l,i,m,r)=>function(){{let e$41=l(),t$30=S1x(i,m);{let e=e$41,t=t$30;let i=e.depthStencil,n={};for(let[r,i]of Object.entries(e.fragment?.constants??{}))if(t.text.includes(`override ${r}`))n[r]=i;return{...e,label:r,fragment:{module:t.module,entryPoint:"fsSurface",targets:[...SH],constants:n},depthStencil:i&&{...i,depthWriteEnabled:!0,depthCompare:dlr}}}}})']}],$c0XU=[0,11,19,25,31,41,47,54,59,61,62,66,74,80,88,97,103,108,115,124,130,137,140,148,156,164,172,179,188,197,207,211];function $c0C(n){return($c0F||($c0F=new Array(230)))[n]||$c0A(n)}function $c0XE(n){var S=$c0XU,l=0,r=S.length-1,m;while(l<r){m=l+r+1>>1;if(S[m]<=n)l=m;else r=m-1}return $c0E($c0XN($c0T[l]()[n-S[l]](),(n+1342316129288192)))}function $c0A(n){var g=$c0XE(n);(globalThis.__spawnColdEvaled||(globalThis.__spawnColdEvaled=[0,0]))[0]++;$c0F[n]=g;if($c0N[n]!==1){$c0N[n]=1;(globalThis.__spawnColdCalled||(globalThis.__spawnColdCalled=[])).push((n+1342316129288192))}return g}var $c0S,$c0D=()=>eval($c0S);function $c0E(s){$c0S=s;return $c0D()}$c0C.w=function(n,a){var F=$c0F||($c0F=new Array(230));if(a||!F[n])F[n]=$c0XE(n)};(globalThis.__spawnColdCross||(globalThis.__spawnColdCross=[])).push([$c0C.w,[149,164,182,189,192,203]]);function $c0XN(s,k){return globalThis.__spawnColdNamed?s+"\n//# sourceURL=spawn-cold/"+k:s}function $c0I(n){var g=$c0XE(n);($c0F||($c0F=new Array(230)))[n]=0;return g()}function $c0P(f,h,k){h[k]=f;return f}var $c0B=[],$c0Y=[],$c0XW=[function(){return[()=>'(function(e){if(OL.size===0)return!1;let t=null,r=[];for(let i of e){let e=i.indexOf(":");if(e<0)continue;if(OL.has(i))(t??=[]).push(i.slice(0,e+1));else r.push(i)}if(t===null)return!1;return t.every((e)=>!r.some((t)=>t.startsWith(e)))})',()=>'(function(e){return e.replace("var surfaceAlbedo: texture_2d<f32>;","var surfaceAlbedo: texture_multisampled_2d<f32>;").replace("var surfaceWords: texture_2d<u32>;","var surfaceWords: texture_multisampled_2d<u32>;").replace("var surfaceEmissive: texture_2d<u32>;","var surfaceEmissive: texture_multisampled_2d<u32>;").replace("var surfaceRead: texture_2d<u32>;","var surfaceRead: texture_multisampled_2d<u32>;").replace("var surfaceDepth: texture_2d<f32>;",`var surfaceDepth: texture_depth_multisampled_2d;\nfn lume_surfaceMsWord(halves: vec2<u32>) -> u32 {\n  return halves.x | (halves.y << 16u);\n}\nfn lume_surfaceMsWords(halves: vec4<u32>) -> vec2<u32> {\n  return vec2<u32>(halves.x | (halves.y << 16u), halves.z | (halves.w << 16u));\n}\nfn lume_surfaceSeatOf(sample: u32) -> vec2<f32> {\n  let s = sample & 3u;\n  return vec2<f32>(select(select(0.375, 0.875, s == 1u), select(0.125, 0.625, s == 3u), s >= 2u), 0.125 + 0.25 * f32(s));\n}`).replace("const lume_surfaceSeat = vec2<f32>(0.5);","var<private> lume_surfaceSeat: vec2<f32> = vec2<f32>(0.5);").replace(`fn lume_surfaceMarkedDepth(px: vec2<i32>, size: vec2<f32>, read: u32) -> f32 {\n`,`fn lume_surfaceMarkedDepth(px: vec2<i32>, size: vec2<f32>, read: u32) -> f32 {\n  lume_surfaceSeat = vec2<f32>(0.5);\n`).replace("@fragment fn fs(@builtin(position) fragPos: vec4<f32>)","@fragment fn fs(@builtin(position) fragPos: vec4<f32>, @builtin(sample_index) lume_sample: u32)").replaceAll("textureLoad(surfaceWords, px, 0).xy","lume_surfaceMsWords(textureLoad(surfaceWords, px, lume_sample))").replaceAll("textureLoad(surfaceRead, px, 0).x","lume_surfaceMsWord(textureLoad(surfaceRead, px, lume_sample).xy)").replaceAll("textureLoad(surfaceEmissive, px, 0).x","lume_surfaceMsWord(textureLoad(surfaceEmissive, px, lume_sample).xy)").replaceAll("textureLoad(surfaceAlbedo, px, 0)","textureLoad(surfaceAlbedo, px, lume_sample)").replaceAll("textureLoad(surfaceDepth, px, 0).x","textureLoad(surfaceDepth, px, lume_sample)")})',()=>'(function(e){if(Ji(e,"createBindGroupLayout",(e)=>(t)=>{let r={...t,entries:Array.from(t.entries,vd)},i=e(r);if(this.recording)this.groups.set(i,r);return i}),Ji(e,"createPipelineLayout",(e)=>(t)=>{let r={...t,bindGroupLayouts:Array.from(t.bindGroupLayouts)},i=e(r),n=r.bindGroupLayouts.map((e)=>e==null?e:this.groups.get(e));if(this.recording&&r.bindGroupLayouts.every((e,t)=>e==null||n[t]!==void 0))this.layouts.set(i,{...r,bindGroupLayouts:n});return i}),typeof e.createShaderModule==="function")Ji(e,"createShaderModule",(e)=>(t)=>{let r=t.compilationHints===void 0?void 0:Array.from(t.compilationHints,(e)=>({...e})),i={...t,...r===void 0?{}:{compilationHints:r}},n=e(i),l=r?.map(({layout:e,...t})=>({...t,...e===void 0?{}:{layout:this.layout(e)}}));if(this.recording&&(r===void 0||r.every((e,t)=>e.layout===void 0||l?.[t]?.layout!==void 0)))this.modules.set(n,{...i,compilationHints:l});return n}),this.createModule=e.createShaderModule;let t=(e)=>(t)=>{let r=this.reaching;return this.reaching=null,r?.(t),e(t)};Ji(e,"createRenderPipeline",t),Ji(e,"createRenderPipelineAsync",t),Ji(e,"createComputePipeline",t),Ji(e,"createComputePipelineAsync",t)})',()=>'(function(e,t,r=()=>0){let i=`${t}\n`;let n=new Set;let l=new Set;let s=new Map;let o=new Map;let a=new Map;let u=r();let d={outcome:"reading",rows:0,readMs:null,last:null,before:null,written:0,writeFailed:null,stored:0,elsewhere:0,made:!1};let f=function(e){if(d.outcome!=="reading"&&d.outcome!==pG)return;d.outcome=e,d.readMs=r()-u};let c=function(e){d.writeFailed??=e};let h=[];let p=null;let m=!1;let g=!1;let y=null;let v=null;let w=[];let b=!1;let k=function(){if(b=!1,v===null||y===null||w.length===0)return;let e=y,r=w.filter((t)=>s.get(t)!==e);if(w=[],r.length===0)return;try{let n=v.transaction(NG,"readwrite"),l=n.objectStore(NG);for(let n of r){let r=o.get(n)??null;l.put({key:`${i}${n}`,scope:t,build:e,...r===null?{}:{label:r}}),s.set(n,e)}n.oncomplete=function(){d.written+=r.length};n.onabort=()=>c(gG(n.error,"AbortError"))}catch(e){eb(c,e);}};let x=function(){if(m||v===null||y===null)return;m=!0;let e=p?.last??null,r=e===y?p?.before??null:e,n=h.filter((e)=>e.build!==y&&e.build!==r);if(h=[],n.length===0&&e===y)return;try{let l=v.transaction(NG,"readwrite"),s=l.objectStore(NG);for(let e of n)s.delete(e.storeKey);if(e!==y)s.put({key:i,scope:t,last:y,before:r});l.onabort=()=>c(gG(l.error,"AbortError"))}catch(e){c(gG(e instanceof Error?e:null,"Error"))}};let M=new Promise(function(r){let l;try{l=e.open(AG,1)}catch(e){f(`the open threw (${gG(e instanceof Error?e:null,"Error")})`);r();return}l.onupgradeneeded=function(){try{if(!l.result.objectStoreNames.contains(NG))l.result.createObjectStore(NG,{keyPath:"key"}),d.made=!0}catch{l.transaction?.abort()}};l.onerror=function(){f(`the open failed (${gG(l.error,"Error")})`);r()};l.onblocked=function(){f(pG),r()};l.onsuccess=function(){let e=l.result;e.onversionchange=function(){e.close(),v=null};let u,c;try{let t=e.transaction(NG,"readwrite");u=t.objectStore(NG);c=u.getAll();t.oncomplete=function(){v=e,g=!0,d.last=p?.last??null,d.before=p?.before??null,f("read"),r(),x(),k()};t.onabort=function(){f(`the read ended without completing (${gG(t.error,"AbortError")})`);r()};t.onerror=function(){f(`the read failed (${gG(t.error,"Error")})`);r()}}catch(e){f(`the read threw (${gG(e instanceof Error?e:null,"Error")})`);r();return}c.onsuccess=function(){d.stored=c.result.length;for(let e of c.result){if(GG(e)&&e.scope===t&&e.key===i)p=e;else if(nG(e)&&e.scope===t&&e.key.startsWith(i)&&e.key!==i){let t=e.key.slice(i.length);n.add(t),s.set(t,e.build),h.push({storeKey:e.key,build:e.build}),d.rows+=1;let r=Reflect.get(e,"label");if(typeof r==="string"){o.set(t,r);let e=a.get(r);if(e===void 0)a.set(r,new Set([t]));else e.add(t)}}else if(tG(e))u.delete(e.key),d.elsewhere+=1}}}});return{get ready(){return g},has:(e)=>g&&n.has(e),changed(e,t){if(!g||t===null||n.has(e))return!1;return(a.get(t)?.size??0)>0},census:()=>({...d}),add(e,t=null){if(n.add(e),t!==null)o.set(e,t);if(l.has(e))return;if(l.add(e),w.push(e),!g||y===null||b)return;b=!0,queueMicrotask(k)},name(e){if(y!==null)return;if(y=e,!g)return;x(),k()},read:M}})',()=>'(async function(e,t,r){if(typeof e.createRenderBundleEncoder!=="function"||typeof e.pushErrorScope!=="function"||typeof e.popErrorScope!=="function")return"unanswerable";let i=t.fragment===void 0?[]:Array.from(t.fragment.targets,(e)=>e?.format??null);e.pushErrorScope("out-of-memory"),e.pushErrorScope("validation");let n=!1;try{let n=e.createRenderBundleEncoder({colorFormats:i,...t.depthStencil===void 0?{}:{depthStencilFormat:t.depthStencil.format},sampleCount:t.multisample?.count??1});n.setPipeline(r),n.finish()}catch{n=!0}let l=d$(e.popErrorScope()).catch(()=>null),s=d$(e.popErrorScope()).catch(()=>null),[o,a]=await Promise.all([l,s]);if(a!==null)return"refused";if(o!==null)return"invalid";return n?"unanswerable":"built"})',()=>'(function(e){if(e.preparedKey===null||this.prepared?.has(e.preparedKey)!==!0)return!1;if(this.prepared.add(e.preparedKey,this.preparedLabels.get(e.preparedKey)??null),this.preparedBefore+=e.asks.length,this.preparedBeforeKeys.add(e.preparedKey),this.sharing.get(e.key)===e)this.sharing.delete(e.key);for(let t of e.asks)t.record.settledAtMs=t.now(),t.record.outcome="prepared",t.skipped?.("prepared-before");return e.resolve({outcome:"prepared",state:"cache"}),!0})',()=>'(function(e,t,r={}){if(BT.has(e)||r.createWorker===void 0&&typeof Worker>"u")return;oT??=kMD()==="constrained"?tT:null;let i=new ATO(e,t,r,r.size??qTO(typeof navigator>"u"?void 0:navigator.hardwareConcurrency));BT.set(e,i);WT.add(i);Iqc("pipeline",()=>i.endIdleForDebug());if(r.usedModuleMissesCache!==!1){pAM(e);}i.recorder.install(e);let n=e.destroy.bind(e);e.destroy=function(){return i.dispose(),n()},e.lost.then(()=>i.dispose())})',()=>'(function(e,t,r,i,n,l=()=>!1){if(g4.has(e))return;let v$15;e1r:{let e=i;if(e===null){v$15="unknown";break e1r;}v$15=e?"holds":"answers";}let s={onBeat:(e)=>E1r(s,e),verdict:v$15,touches:0,touchesAtBeat:0,out:0,covered:!1,extraOut:l,poll:()=>t(S4),host:n,createProbe:function(){if(r===null)return null;let e=r({label:"lume word probe",size:C4,usage:W4});return typeof e?.mapAsync==="function"?e:null},probe:{buffer:null,out:!1,second:!1,askedAtMs:0,pairAskedAtMs:0,askedAtTouches:0,lost:!1},answers:v$(e),beatPending:!1,kickQueued:!1,lastBeatMs:NaN,lastStampMs:NaN,beatStepMs:NaN,framed:!1,answeredInMs:NaN,settled:function(){s.out-=1;return},refused:function(e){throw s.out-=1,e},kick:function(){{let e=s;if(e.kickQueued=!1,e.touches===e.kickTouches&&n4(e))_4(e)}},kickTouches:0,probeAnswered:function(){let e=s.probe.buffer;if(e===null)s.probe.out=!1;else {Q1r(s,e)}},probeRefused:function(){s.probe.out=!1,s.probe.lost=!0}};g4.set(e,s),e.lost.then(function(){s.probe.lost=!0,g4.delete(e)}),c4(s)})',()=>"(function(e=1){if(this.final)return!1;if(this.widthValue=this.widthValue===null?Math.max(1,Math.floor(e)):Math.min(this.widthValue,Math.max(1,Math.floor(e))),this.decided=!0,this.final=!0,this.verdictValue=!0,this.starvedReadings=2,this.reading=null,this.besideFrom=mnS(this.besideFrom),this.watchesWidth)return!0;return this.fenceCount=0,this.atDevice=mnS(this.atDevice),this.settled=mnS(this.settled),this.named=mnS(this.named),this.reachedAtMs=mnS(this.reachedAtMs),!0})",()=>"(function(e){let t=e.baselineRoundTripMs===null?\"none\":`the longest ${Math.round(e.baselineRoundTripMs)} ms`,r=e.floorRoundTripMs===null?\"no floor\":`the floor ${Math.round(e.floorRoundTripMs)} ms`;return`the submit judge has no word at the whole picture: ${e.fences} frame fence(s) read, ${e.unheld} with no build at the device (${t}; ${r}), ${e.overtaken} overtaken by a build issued after their submit, ${e.whileBuilding} back while a build stood, ${e.afterBuilds} back after their builds' words; held readings refused: ${e.noFloor} before any word, ${e.short} inside the floor plus ${Sp0} ms, ${e.buildsShort} with the builds' last word inside the floor plus ${Sp0} ms of the submit, ${e.workerHeld} covered by the worker's own still time, ${e.foreign} held past the floor plus the proof by work that was not this page's builds`})",()=>'(function(e){if(e<2)return"builds issue one at a time and a speculative warm waits for a completed frame, from the first frame";return`where builds share a pool beside this device, it stands at most ${e} builds at once once play opens (one at a time elsewhere)`})',()=>"(function(){for(let e of this.warmQueues)for(let t of e){let e=t.waiting();if(e===null||t.drawn()||this.viewLined.has(t.entry))continue;let r=this.renderPipelines.get(e.key);if(r===t.entry)this.withdrawQueued(e.key,r,new oQ(Hs))}})",()=>"(function(e,t,r){let i=e.findIndex((e)=>this.roomTakes(e)&&this.standsForLook(e));if(i>=0)return i;let n=e.findIndex((e)=>this.roomTakes(e)&&this.standsDrawn(e));if(n<0||this.speculationBehindTheLift)return-1;for(let e=t+1;e<r;e+=1)if(this.warmQueues[e].some((e)=>e.pending()&&this.standsForLook(e)))return-1;return n})",()=>"(function(e){let t=function(){return};let r=new Promise((e)=>t=e);let i=[];let n={quiet:{closed:!1,quiet:function(){if(Zk)n.quiet.closed=!0;return!n.quiet.closed&&e.buildsInFlight===0},company:()=>e.settledBuildCount,turn:()=>new Promise((e)=>i.push(e))},beat:function(){for(let e of i.splice(0))e()},run:null,composed:null,asked:r,ask:function(){n.composed??=n.run??{unread:!0,benchMs:0};t()}};return n})",()=>'(function(e,t,r,i,n){let l=i.benchMs;if("unread"in i){if(t!==null)return{key:e,measure:hv6(t,"cache"),record:null,standing:t,carried:r,bench:null,benchResult:null,benchMs:l,word:`the renderer arrived before the bench had its quiet time (a constrained phone draws first): the cached ${t.msPerMpx.toFixed(3)} ms/Mpx stands`};return{key:e,measure:null,record:null,standing:null,carried:!1,bench:null,benchResult:null,benchMs:l,word:"the renderer arrived before the bench had its quiet time (a constrained phone draws first): no reading this load; the unmeasured class opens and the next load takes the bench first"}}if(t!==null)return{key:e,measure:hv6(t,"cache"),record:null,standing:t,carried:r,bench:null,benchResult:null,benchMs:l,word:`${n} threw (${i.error}): the cached ${t.msPerMpx.toFixed(3)} ms/Mpx stands`};return{key:e,measure:null,record:null,standing:null,carried:!1,bench:null,benchResult:null,benchMs:l,word:`bench threw (${i.error}): no reading; the unmeasured class opens, the next boot benches again`}})',()=>'(function(e,t,r,i){if(t===null||r.measure!==null)return r;let n={...t,key:e};return{...r,measure:hv6(n,"cache"),record:n,standing:n,carried:!1,word:`${G2F(i)}: the ${t.msPerMpx.toFixed(3)} ms/Mpx record of these adapter words (keyed ${t.key}) stands, kept under this key`}})']}],$c0XV=[function(){return[()=>'(function(e,t,r,i,n,l){let{fillBindGroup:s,computeBindGroup:o,targetView:a}=i,u=function(i){let n=e.createCommandEncoder(),l=Math.floor(i),u=Math.round((i-l)*TP);for(let e=0;e<l+(u>0?1:0);e+=1){let r=n.beginRenderPass({colorAttachments:[{view:a,loadOp:e===0?"clear":"load",storeOp:"store"}]});r.setPipeline(t),r.setBindGroup(0,s,[e*GP]),r.draw(6,(e<l?TP:u)*TP),r.end()}if(i>0&&r!==null&&o!==null){let t=n.beginComputePass();t.setPipeline(r),t.setBindGroup(0,o),t.dispatchWorkgroups(Math.max(1,Math.round(Math.min(1,i)*ZP/f1s(e,vP)))),t.end()}return n.finish()},d=async function(t){let r=u(t),i=dP();return e.queue.submit([r]),xBe(e.queue,i,l,n)},f=new Set,c=NaN,h=!1,p=async function(){if(h)return;h=!0;while(f.size>0){let t=dP();if(t>=n){for(let e of f)e(new MP("a sample\'s work"));f.clear();break}if(await mP(Math.min(n-t,(t-c)*fP)),f.size>0&&dP()<n)e.queue.submit([])}h=!1};return{sample:d,feed:function(t){let r=u(t),i=dP();if(e.queue.submit([r]),f.size===0)c=i;return new Promise(function(r,n){let s=function(e){if(!f.delete(n))return;if(e3w(e))c=e;r({passes:t,submittedMs:i,answeredMs:e})};f.add(n),e.queue.onSubmittedWorkDone().then(()=>s(dP()),()=>s(NaN)),l.then(()=>s(NaN)),p()})}}})']}],$c0XB=0;function $c0XR(n){return $c0E($c0XN((n<229?$c0XW[0]()[n-213]:$c0XV[0]()[n-229])(),(n+1342316129288192)))}function $c0R(n,b,t){var F=$c0F||($c0F=new Array(230)),g=F[n],i;if(g!==void 0){if(t!==void 0&&$c0B[n]===void 0)$c0B[n]=[b,t];return g}if($c0XB===0&&n>=229){$c0XB=1;var u=$c0XV[0](),s=new Array(u.length);for(i=0;i<u.length;i++)s[i]=u[i]();var a=$c0E($c0XN("["+s.join(",")+"]",(229+1342316129288192)));for(i=0;i<a.length;i++)if(F[229+i]===void 0){F[229+i]=a[i];$c0Y.push(229+i)}g=F[n]}if(g===void 0){g=$c0XR(n);F[n]=g;$c0Y.push(n)}if(t!==void 0)$c0B[n]=[b,t];return g}function $c0O(n,b,t){if($c0N[n]!==1){$c0N[n]=1;(globalThis.__spawnColdCalled||(globalThis.__spawnColdCalled=[])).push((n+1342316129288192))}return $c0R(n,b,t)}function $c0Z(){var c=0,F=$c0F,s="",i,k;for(i=0;i<$c0Y.length;i++){k=$c0Y[i];if($c0B[k]!==void 0)s+=$c0B[k][1]+"=$c0B["+k+"][0];";if(F&&F[k]!==void 0){F[k]=void 0;c++}}if(s!=="")$c0E(s);for(i=0;i<$c0Y.length;i++)$c0B[$c0Y[i]]=void 0;$c0Y.length=0;return c};(globalThis.__spawnColdLift||(globalThis.__spawnColdLift=[])).push($c0Z);
var iG=((e)=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(e,t)=>(typeof require<"u"?require:e)[t]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')});;;;;;;;;;;;;function oFG(e,t,r,i,n=r.generation){let l=e.get(r);if(l?.generation===n)return l.value;let s=i(t,r);return e.set(r,{generation:n,value:s}),s};;;;;;;;;;var rD3=4096,plG={topology:"triangle-list",cullMode:"none"};function Iv(e){if(Symbol.iterator in e){let[t=1,r=1,i=1]=e;return[t,r,i]}return[e.width,e.height??1,e.depthOrArrayLayers??1]}function Cnl(e,t,r,i){return e.createBindGroup({label:t,layout:r,entries:[{binding:0,resource:{buffer:i}}]})}function RDp(e,t,r){return{binding:e,visibility:t,buffer:{type:r}}}function Zyu(e,t,r){return{binding:e,visibility:t,sampler:{type:r}}}function TLF(e,t,r,i){return{binding:e,visibility:t,storageTexture:i===void 0?{access:"write-only",format:r}:{access:"write-only",format:r,viewDimension:i}}}function v6R(e,t,r,i){return{binding:e,visibility:t,texture:i===void 0?{sampleType:r}:{sampleType:r,viewDimension:i}}}function Y0r(e,t){return{binding:e,resource:{buffer:t}}}var zdk={type:"uniform"};var xzO=(function(e){zdk.type=e?"read-only-storage":"uniform"});var SWX=()=>zdk.type==="uniform"?"uniform":"storage, read",qKI=(()=>zdk.type==="uniform"?64:128),AFF=[{binding:0,visibility:2,buffer:zdk},RDp(1,2,"read-only-storage")],UG=32768,MG=null,EG=!1,aG=1/0;var SVN=()=>aG>=UG,cQA=()=>Math.min(UG,aG),IG=new Set,bgZ=(()=>MG),P$u=(()=>EG&&MG===null);function ycn(){EG=!0}function tsB(e){if(e===null)EG=!1;if(MG===e)return;MG=e;for(let e of IG)e()}function r4A(e){return OgH(IG,e)}var $v=0,yv=[];function PT4(e){return yv[e]}class VCM{constructor(e,t=null){this.name=void 0;this.slot=void 0;this.end=void 0;this.name=e,this.slot=$v++,this.end=t,yv[this.slot]=e}endStore(e,t){this.end?.(e,t)}}var syV=(function(e,t){let r=new VCM(e,function(e,r){t(r)}),i=(()=>!0);return (function(e){e.store(r,i)})});function KFd(e,t,r,i){let n=syV(e,i??(function(e){t.delete(e)}));return function(e){let i=t.get(e);if(i===void 0)i=r(),t.set(e,i),n(e);return i}}var JLD=(function(e,t){let r=syV(e,function(e){t.delete(e)});return (function(e){t.add(e),r(e)})});var H_I=64,uZV=0.05,Db2=32,n2$=4294967295,Jog=4,uAo=4,jBl=2,zwp=3,CHj={single:0,multi:1,ring:2,shadow:3,packed:4,shadowMulti:5},E8L=6,T9b=5,u6C=2147483648,rox=3,I6c=120,IdT=-1e9,Iom=12,iF2=16,yXb=8,ddi=9,Nq5=10,Ec9=68,zl_=4,Y19=64,wWm=64;function G3B(e,t){return e*t}var SD2=33554431,afO=33554432,BaK=26,jz_=8,vOp=(e,t)=>Math.min((e&SD2)+(e>>>BaK&jz_-1),t),SWv=(e,t)=>Math.min(e&SD2,t),tbc=2147483648,Rho=1073741824,HRC=536870912,Dry=0.0001;var DG="this machine has a faster GPU the browser isn't using \u2014 download the Spawn desktop app for better fps, or set your graphics settings (Windows: Graphics settings \u2192 your browser \u2192 High performance) so the browser runs on it";class NGD{constructor(){this.bakeClock=void 0;this.bakeStands=void 0;this.bakeLetGoListeners=void 0;this.depthAtIdle=void 0;this.readbackPool=void 0;this.coverFragmentModules=void 0;this.geometryMoves=void 0;this.passGroupWholes=void 0;this.passGroupParts=void 0;this.passGroupSeeThroughParts=void 0;this.placeBufferTables=void 0;this.ownScriptTextures=void 0;this.placeScriptTextures=void 0;this.retiredScriptTextures=void 0;this.sharedWordsBuffers=void 0;this.scriptedStandIns=void 0;this.modelClampedSamplers=void 0;this.keyBuilds=void 0;this.modelParkedAssets=void 0;this.oversizedSamplers=void 0;this.neutralSources=void 0;this.scriptedClusterHome=void 0;this.scriptedGeometryHome=void 0;this.retiredSetRecordPlanes=void 0;this.skyUnseenBakeSteps=void 0;this.spriteTexelAaSamplers=void 0;this.decorationRunArrays=void 0;this.terrainTileFills=void 0;this.arraySamplers=void 0;this.composedArrays=void 0;this.surfaceSets=void 0;this.blitModules=void 0;this.waterModules=void 0;this.waterFragments=void 0;this.deletedTextureListeners=void 0;this.atlasNroPackModules=void 0;this.textureWatch=void 0;this.bakeClock={turn:0,owedUntil:0},this.bakeStands=new Map,this.bakeLetGoListeners=new Set,this.depthAtIdle=[],this.readbackPool={idle:[],acquiredSinceFrame:!1},this.coverFragmentModules=[],this.geometryMoves={count:0,frames:0,retired:[],retiring:[],boundary:null},this.passGroupWholes=new Set,this.passGroupParts=new Map,this.passGroupSeeThroughParts=new Map,this.placeBufferTables=new WeakMap,this.ownScriptTextures=new WeakMap,this.placeScriptTextures=new WeakMap,this.retiredScriptTextures={retired:[],retiring:[]},this.sharedWordsBuffers=new Map,this.scriptedStandIns=new Map,this.modelClampedSamplers=new Map,this.keyBuilds=new Map,this.modelParkedAssets=new Map,this.oversizedSamplers=new Map,this.neutralSources=new Map,this.scriptedClusterHome={arenas:new Map,owners:new Map},this.scriptedGeometryHome={geometries:new Map,leaving:new Set,templates:new Map,setTemplates:new Map,stats:{...rsj}},this.retiredSetRecordPlanes={generation:0,retired:[],retiring:[]},this.skyUnseenBakeSteps=[],this.spriteTexelAaSamplers=new Map,this.decorationRunArrays=new Map,this.terrainTileFills={buffers:[],jobs:[],words:new Int32Array(0),used:0,need:0,table:new Uint32Array(0),targets:[],plan:[],pipeline:null,staging:null,stagingBytes:0,groups:new WeakMap},this.arraySamplers=new Map,this.composedArrays=new Map,this.surfaceSets=[],this.blitModules=new Map,this.waterModules=new Map,this.waterFragments=new WeakMap,this.deletedTextureListeners=[],this.atlasNroPackModules=new Map,this.textureWatch=null}}var rsj={entries:0,holders:0,gpuBytes:0,unsharedGpuBytes:0,templates:0,templateBytes:0,templateRows:0},wa=new WeakMap;var ayA=(function(e){let t=wa.get(e);if(t===void 0)wa.set(e,t=new NGD);return t});;;;;;;;var gia=2;var UYX=8;var t6=6;var T6=8;var x6=()=>({openMs:1/0,spentMs:0,lastBeginMs:-1,holder:"",next:"",scale:1,paces:new Float64Array(T6),paceCount:0,paceSum:0,past:new Uint8Array(T6),pastRest:0,baseMs:1/0,ownMs:0,owns:new Float64Array(T6),ownsSorted:new Float64Array(T6),ownCount:0,measuredBeginMs:-1,hungMs:1/0,presentMs:0,holderSpentMs:0,floorMs:gia});var g6=x6();function vmh(e,t,r,i=1/0,n=t,l=!1){let s=e-g6.lastBeginMs;if(g6.lastBeginMs>=0&&s>0){if(g6.baseMs!==1/0){let e=Math.min(g6.scale!==1&&g6.spentMs>g6.baseMs?Math.min(s-g6.spentMs,g6.paceSum/T6):s,i),r=g6.paceCount%T6;if(g6.paceCount>=T6)g6.paceSum-=g6.paces[r],g6.pastRest-=g6.past[r];g6.paces[r]=e,g6.past[r]=e>t*t6?1:0,g6.paceSum+=e,g6.pastRest+=g6.past[r],g6.paceCount+=1}}if(g6.lastBeginMs=e,g6.holder==="")g6.next="";g6.holder="",c6.stopped=!1,g6.spentMs=0,g6.holderSpentMs=0,g6.scale=1,g6.hungMs=i;let o=n>0?n:t;if(g6.presentMs=o,!r){g6.openMs=1/0,g6.baseMs=1/0;return}let a=Math.min(UYX,Math.max(gia,o-g6.ownMs));g6.baseMs=a;let u=g6.paceCount<T6||!(t>0)||g6.pastRest*2<=T6?1:Math.max(1,g6.paceSum/T6/t),d=gia*u;if(g6.floorMs=g6.pastRest===0&&g6.paceCount>0&&t>0?gia*Math.max(1,g6.paceSum/Math.min(g6.paceCount,T6)/t):d,d>a)g6.openMs=d,g6.scale=u;else g6.openMs=a;if(!l)return;g6.ownsSorted.set(g6.owns),g6.ownsSorted.sort((e,t)=>e-t),g6.openMs=Math.max(g6.openMs,g6.ownsSorted[T6/2])}function mTY(e){let t=g6.lastBeginMs,r=t>=0&&t!==g6.measuredBeginMs&&e>=t;if(r)g6.measuredBeginMs=t,g6.ownMs=Math.min(g6.hungMs,Math.max(0,e-t-g6.spentMs)),g6.owns[g6.ownCount++%T6]=g6.ownMs;if(t>=0){{let t$1=r;{let t=t$1;let r=g6.presentMs-gia-(t?e-g6.lastBeginMs:g6.ownMs),i=DhD()?0:Math.max(gia*g6.scale,g6.openMs-g6.spentMs);if(c6.endMs=e,c6.deadlineMs=e+Math.max(r,i),c6.ranInWindow=0,clearTimeout(c6.parked),c6.parked=void 0,c6.pieces.length>0)i6()}}}}function M8u(){return g6.scale}function DhD(){return g6.baseMs>gia}var fwc=(function(){return g6.spentMs<g6.openMs});var TdJ=(function(){return Math.max(0,g6.openMs-g6.spentMs)});function J0G(){return g6.spentMs}function C3M(e){if(g6.holder===""&&(g6.next===""||g6.next===e))return g6.holder=e,g6.next="",!0;if(fwc())return!0;if(g6.next===""&&g6.holder!==e)g6.next=e;return!1}function jGX(e,t){if(!(e>0))return;if(g6.spentMs+=e,t===g6.holder)g6.holderSpentMs+=e}function tS5(e){if(g6.holder!==e&&!C3M(e))return 0;return fwc()?TdJ():Math.max(0,g6.floorMs-g6.holderSpentMs)}var c6=({pieces:[],endMs:-1,deadlineMs:-1/0,ranInWindow:0,stepPosted:!1,stopped:!1,parked:void 0,port:null});function lE5(){return g6.lastBeginMs>=0&&g6.openMs!==1/0}function bI1(e=kJ3()){if(!lE5()||c6.stopped||c6.endMs>=0&&e-c6.endMs>(Math.max(g6.presentMs,1)*t6))return 1/0;if(g6.lastBeginMs>c6.endMs)return 0;return Math.max(0,c6.deadlineMs-e)}function $ld(){if(bI1()===1/0)g6.openMs=1/0}function j9f(){c6.stopped=!0,i6()}function wZL(e,t=!1){if(c6.pieces.length===0&&!t&&bI1()>0)e();else c6.pieces.push(e),i6()}function jOO(){if(c6.pieces.length===0&&!lE5())return null;return new Promise((e)=>wZL(e,!0))}function ss6(){if(c6.parked!==void 0||c6.endMs<0)return;c6.parked=setTimeout(function(){c6.parked=void 0,i6()},(Math.max(g6.presentMs,1)*t6)+1)}function i6(){if(c6.stepPosted)return;if(c6.stepPosted=!0,Number.isFinite(bI1()))return queueMicrotask(m6);if(c6.port===null){ba();}c6.port.postMessage(0)}function m6(){if(c6.stepPosted=!1,c6.pieces.length===0)return;let e=kJ3();if((c6.ranInWindow||c6.endMs<g6.lastBeginMs)&&bI1(e)<=0){ss6();return}let t=c6.pieces.shift();c6.ranInWindow++;try{t?.()}finally{if(BnR.add(BnR.row("arrival-line"),kJ3()-e),c6.pieces.length>0)i6()}};;var Qo=(()=>globalThis.__spawnEngineConsole??=Object.create(console))(),PE="lume: this device does not build compute pipelines: its compiler refused a compute program with an internal error",lE=null,TE=null,aE=new WeakSet;function AE(e){return e.includes("Compiler encountered an internal error")}function ysT(e){return lE!==null||e}function Rw4(e){lE??=e}var sCR=(function(e){TE=aE.has(e)?null:e});var K0D=(function(){return lE===null&&TE!==null});function QHe(){return(lE??TE)!==null}var NcM=(function(){return lE});function B0c(e,t,r){return e.createComputePipelineAsync({label:t,layout:"auto",compute:{module:e.createShaderModule({label:t,code:r}),entryPoint:"main"}})}var xE=new WeakMap;function B8V(e,t,r){return xE.get(e)?.get(t)??ACR(e,t,r)}function ACR(e,t,r){let i=xE.get(e)??new Map;return xE.set(e,i),i.set(t,"building"),B0c(e,t,r).then((e)=>i.set(t,e),function(e){i.set(t,"refused"),Qo.warn(`[lume] the device refused ${t}: ${String(e)}`)}),"building"}var VP=globalThis,NP=VP.__lumeIndirectLayoutGuard??={requiresVertexLayout:new WeakMap,state:{armed:!1,throwOnViolation:!1},violations:new Map},{requiresVertexLayout:aP,state:oP,violations:uP}=NP,SP=NP.twinned??=new Set;var AAr=(function(e){if(!e)return!1;{if((ea=fa(e))!==ca)return ea}return!1});function P2I(e){if(oP.armed=e.convicted,oP.throwOnViolation=e.throwOnViolation,uP.clear(),SP.clear(),e.convicted)Qo.info("[lume] indirect-layout guard ARMED (device convicted of the WebKit/AGX indirect-clamp hang): every indirect draw is checked for a required vertex layout; silence after this line means none was found")}function Oez(a){return $c0C(0).call(this,a)}function qr3(e){if(!oP.armed)return;let t=aP.get(e);if(t===void 0)return;let r=uP.get(t)??0;uP.set(t,r+1);if(r===0){ga(t);}if(oP.throwOnViolation&&r===0){ha(t);}}var hqT=(function(){return[...uP.entries()].map(([e,t])=>({label:e,draws:t})).sort((e,t)=>t.draws-e.draws)});var N95=(function(){return oP.armed});var _2I=(function(e){let t=e;if(t.__lumeIndirectLayoutHooked===!0)return;t.__lumeIndirectLayoutHooked=!0;if(typeof e.createRenderPipelineAsync==="function"){let t=e.createRenderPipelineAsync.bind(e);e.createRenderPipelineAsync=((e)=>t(e).then((function(t){{let e$2=t,t$2=(e.label??"(unlabeled pipeline)"),r$1=e.vertex.buffers??void 0;{let e=e$2,t=t$2,r=r$1;if(AAr(r))aP.set(e,t)}}return t})))}if(typeof e.createRenderPipeline==="function"){let t=e.createRenderPipeline.bind(e);e.createRenderPipeline=function(e){let i=t(e);{let e$3=i,t$3=(e.label??"(unlabeled pipeline)"),r$2=e.vertex.buffers??void 0;{let e=e$3,t=t$3,r=r$2;if(AAr(r))aP.set(e,t)}}return i}}});var knN=4294967295,qL="lume.directDrawArm",GL=globalThis,hL=GL[qL]??={state:{armed:!1},twinless:new Map};function DQt(e){return(hL.liveTwins??=new WeakSet).add(e),e}function Rda(e){return hL.liveTwins?.has(e)===!0}function peR(e){let t=e.convicted&&hL.state.armed&&e.newDevice!==!0;if(hL.state.armed=e.convicted,e.newDevice===!0)hL.state.measured=!1;if(!e.convicted||e.newDevice===!0)hL.state.hostRoad=e.convicted&&e.hostSaid===!0;if(!t)hL.twinless.clear();if(!e.convicted)return;Qo.info(`[lume] direct-draw arm ARMED: the driver hangs on indirect draws, so each indirect draw with a direct twin draws direct over its survivor window; one without a twin ${EIy()?"is not drawn":"still draws indirect"} and is counted`)}var CTf=(function(){return hL.state.armed||hL.state.measured===!0||NcM()!==null});var Pri=(function(e,t=!1){hL.state.measured=e,hL.state.trial=t});function MTP(){return CTf()||hL.state.trial===!0}function mP7(){return CTf()&&hL.state.trial!==!0}function x4k(){return hL.state.measured===!0}var HdI=(function(){return hL.state.armed});function EIy(){return hL.state.armed&&hL.state.hostRoad===!0}function ICN(){return CTf()||(oP.armed&&!oP.throwOnViolation)}function Sy6(a){return $c0C(1).call(this,a)}var XT1=(function(){return hL.twinless});var R9D=(function(){let e=0;for(let t of hL.twinless.values())e+=t;return e});function uMX(){hL.twinless.clear()};var DC=0.8,AC=1,RM=Math.fround,kC=6.2831853;function YM(e){return e-Math.floor(e)}function ely(e,t,r){let i=RM(YM(RM(RM(e)*RM(0.1031))));let n=RM(YM(RM(RM(t)*RM(0.103))));let l=RM(YM(RM(RM(e)*RM(0.0973))));let s=RM(RM(r)+RM(33.33));let o=RM(RM(RM(i*RM(n+s))+RM(n*RM(l+s)))+RM(l*RM(i+s)));let a=RM(i+o);let u=RM(n+o);let d=RM(l+o);return RM(YM(RM(RM(a+u)*d)))}function xM(a,b,c){return (xM=$c0C(2)).call(this,a,b,c)}function k9L(e,t){return ely(e+53,t+91,0)}function eRZ(a,b,c,d,e,f,g,h,i){return $c0C(3).call(this,a,b,c,d,e,f,g,h,i)};var rW=null,MW=-1,CW=-1,FW=0,aW={kb:0,rest:0},hW={kb:0,rest:0},YW=2147483647;var zW=(function(e,t){if(t<=YW)e.kb+=t>>10,e.rest+=t&1023;else{ia(t,e);}if(e.rest>=1024)e.kb+=1,e.rest-=1024});var AW=function(){if(rW===null)return;rW[MW]=FW;rW[CW]=(aW.rest>=512?aW.kb+1:aW.kb)};var tvs=(function(e,t,r){rW=e;MW=t;CW=r;AW()});var oW=(function(e){FW+=1;AW();let t=(function(){FW=Math.max(0,FW-1);AW()});return e.then(t,t),e});var LW=(function(e){if(!(e>0))return;zW(aW,e);if(rW!==null){rW[CW]=(aW.rest>=512?aW.kb+1:aW.kb)}});var ZLG=(function(){return aW.kb*1024+aW.rest});function PdH(e){if(e>0)zW(hW,e)}var lW={kb:0,rest:0},yW=new Map;var VUn=(function(e,t="(unlabeled)"){if(!(e>0))return;zW(lW,e);let r=yW.get(t);if(r===void 0)yW.set(t,{label:t,count:1,bytes:e});else r.count+=1,r.bytes+=e});function dMI(e){let t=uLW(e)?Reflect.get(e,"label"):void 0;return typeof t==="string"&&t.length>0?t:"(unlabeled)"}var H$v=(function(e){if(yW.size===0)return[];let t=[...yW.values()].sort(((e,t)=>t.bytes-e.bytes));return yW=mnS(yW),t.length>e?t.slice(0,e):t});var fL1=(function(){return lW.kb*1024+lW.rest});var T0e=(function(){return(aW.kb+hW.kb)*1024+aW.rest+hW.rest});var fW=((e,t)=>Object.getOwnPropertyDescriptor(e,t)?.get),PW=Object.getPrototypeOf(Uint8Array.prototype),tW=fW(PW,"byteLength"),jW=fW(PW,Symbol.toStringTag),NW=fW(DataView.prototype,"byteLength"),cW=fW(ArrayBuffer.prototype,"byteLength"),QW=new Map;;(function(){for(let e of[Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array])QW.set(e.name,e.BYTES_PER_ELEMENT);})();var RW=(function(e){if(ArrayBuffer.isView(e))return Number(jW?.call(e)===void 0?NW?.call(e):tW?.call(e));return Number(e instanceof ArrayBuffer?cW?.call(e):Reflect.get(e,"byteLength"))});var mWA=(function(e,t,r){let i;eEF:{if(!ArrayBuffer.isView(e)){i=1;break eEF;}let t=jW?.call(e);if(typeof t!=="string"){i=1;break eEF;}i=QW.get(t)??Number(Reflect.get(e,"BYTES_PER_ELEMENT"));}if(r!==void 0)return Number(r)*i;return Math.max(0,RW(e)-Number(t??0)*i)});function WEF(e){if(Array.isArray(e))return Number(e[0]??0)*Number(e[1]??1)*4;if(uLW(e)){let t=Number(Reflect.get(e,"width")??0),r=Number(Reflect.get(e,"height")??1);return t*r*4}return 0}var SL=new Set,xL=null,LL=null,oL=null;function DLT(e,t){let r=e.replace(/\s+/g," ").trim();return r.length>t?`${r.slice(0,t)}\u2026`:r}var zRC=(function(e){SL.add(e),xL?.add(e)});function JNh(e,t){LL=t,oL=e}function kQD(e,t){if(LL!==null&&(t===void 0||oL===t)){for(let t of LL)e.add(t);LL=null,oL=null}if(SL.size===0)return;for(let t of SL)e.add(t);SL=mnS(SL)}function NAN(e,t){let r=SL;SL=new Set;try{return e()}finally{let e=SL;if(SL=r,e.size>0)t?.(e)}}function zSP(e){let t=xL,r=new Set;xL=r;try{return{value:e(),taints:[...r]}}finally{if(xL=t,t!==null)for(let e of r)t.add(e)}}var OL=new Set,mL=new Set,EL=0;function Z81(e,t){if(t?OL.has(e)||mL.has(e):!OL.delete(e))return;if(t)OL.add(e);else mL.add(e);EL+=1}function NL(a){return (NL=$c0O(213,NL,"NL")).call(this,a)}var q97="/lamps",GOA="/sun-sky",Eqp="/sun-and-sky",Xy8="/floor";function odz(e,t){return e+t}function WlJ(e){if(!e.startsWith("terrain/voxel-bucket/glass/")||e.includes("/through/")||e.endsWith(q97)||e.endsWith(GOA))return null;let t=e.indexOf("/light/");return t===-1?e:e.slice(0,t)}function L1q(e){let t=/^(primitives\/lane\/.+?)\/w[0-9a-f]+(?:\/|$)/.exec(e);return t===null?null:t[1]}var NOT="terrain/shells";var S3p=(function(e,t){if(e==="D3D11")return"fxc";return t?"gles":null});var Fpl="/no-walk";function FEs(e){if(!/^(?:terrain\/shells\/(?:surface|band|field|lit|walk|over)(?:\/|$))/.test(e)||e.includes(Fpl))return null;return NOT}var X4=new Set;function zRY(e,t=""){return X4.size>0&&X4.has(odz(e,t))}function vCn(e,t){if(!t)return X4.delete(e);if(X4.has(e))return!1;return X4.add(e),!0}var eLY="lit-lane";function K_P(e){if(e===void 0)return null;for(let t of e)if(t.startsWith(`${eLY}:`))return t.slice(eLY.length+1);return null}function nll(e){if(/:surface(?:-depth)?(?::cw)?(?::unbiased)?(?::after-cut)?(?::whole)?(?:\/crowd\/.*)?$/.test(e))return!1;let t=L1q(e);return t===null||!(t.includes("/surface-buffer/")||t.includes("-aperture-mask"))}function $mT(e,t){return nll(e)?K_P(t):null}function $1w(e,t){return`the ${e} lit by the sun${t?" and the sky alone":", the sky and the lamps"}`}var zJD=5000;function e08(e){return!e.picture&&(!e.inGrace||e.graceKind==="compile"||e.graceKind==="load")}var gy=new WeakMap;var ta5=(function(e){return gy.get(e)??null});function CCw(e,t){gy.set(e,t)}var quG=`struct Frame {
view: mat4x4f,
proj: mat4x4f,
viewProj: mat4x4f,
inverseViewProj: mat4x4f,
cameraPosition: vec3f,
time: f32,
viewportSize: vec2f,
deltaTime: f32,
sort2d: f32,
canvasSize: vec2f,
worldTime: f32,
bodyOpacity: f32,
wind: vec3f,
flatArt: f32,
windTravel: vec2f,
wet: f32,
rain: f32,
renderOrigin: vec3f,
ySortOrigin: f32,
guestMap: mat4x4f,
guest: f32,
lodHeight: f32,
ownOut: f32,
grainAnchor: f32,
guestClipPlane: vec4f,
prevViewProj: mat4x4f,
prevView: mat4x4f,
prevTime: f32,
prevWorldTime: f32,
prevWindTravel: vec2f,
motionValid: f32,
fadeTime: f32,
toneMap: f32,
depthFloor: f32,
audioLevel: f32,
parallelEye: f32,
gridShare: f32,
eyeParts: f32,
audioBands: array<vec4f, 8>,
inverseProj: mat4x4f,
focus: vec3f,
prevOrtho: f32,
depthRow: vec4f,
sourceOrigin: vec3f,
cssPixel: f32,
sortOrders: f32,
ySortStep: f32,
eyeRise: f32,
lensDepth: f32,
};
@group(0) @binding(0) var<uniform> frame: Frame;
`,dQJ=`${quG}
fn lume_frameClip(viewProj: mat4x4f, point: vec4f) -> vec4f {
  let clip = viewProj * point;
  return select(clip, vec4f(clip.xy, dot(frame.depthRow, point) + frame.depthFloor * clip.w, clip.w), frame.depthFloor > 0.0);
}
`;function D0z(e){return`normalize(mix(normalize(${e}), vec3<f32>(frame.view[0][2], frame.view[1][2], frame.view[2][2]), frame.parallelEye))`}function zUC(e,t="frame.viewProj"){return`lume_frameClip(${t}, ${e})`}var klf=[RDp(0,7,"uniform")],_o_=[...klf,v6R(1,2,"uint","2d"),RDp(2,2,"uniform")],aRL=16,fCC=`@group(0) @binding(1) var nearGuestIds: texture_2d<u32>;
@group(0) @binding(2) var<uniform> nearGuestDoor: vec4<u32>;
`;function cT2(e){return`  if (textureLoad(nearGuestIds, vec2<i32>(${e}.position.xy), 0).r != nearGuestDoor.x) { discard; }`}var f0=/@fragment\s+fn\s+\w+\s*\(\s*(\w+)\s*:\s*Varyings(?:Io)?\b[^{]*\{/g,M0=/@fragment\b/g;function TKx(e){let t=e.replace(/\/\/[^\n]*/g,""),r=0;return{text:`${t.replace(f0,function(e,t){return r+=1,`${e}
${cT2(t)}`})}
${fCC}`,whole:r===(t.match(M0)?.length??0)}}var cH=[`${quG.slice(0,913)}fn lume_worldFromRender(p: vec3<f32>) -> vec3<f32> {
return p + frame.renderOrigin;
}
struct PassLights {
sunDirection: vec3<f32>,
sunIntensity: f32,
sunColor: vec3<f32>,
cascadeCount: u32,
ambientColor: vec3<f32>,
globalLightCount: u32,
fogMode: f32,
fogNear: f32,
fogFar: f32,
fogDensity: f32,
shadowsEnabled: f32,
viewFogNear: f32,
viewFogFar: f32,
viewFogAmount: f32,
ambientMean: vec3<f32>,
clusteredLightCount: u32,
hemiSky: vec3<f32>,
hemiGround: vec3<f32>,
sunShadowFar: f32,
sh: array<vec4<f32>, 9>,
clusterParams: vec4<f32>,
clusterDepth: vec4<f32>,
cascadeMatrices: array<mat4x4<f32>, 4>,
cascadeSplits: vec4<f32>,
cascadeBias: vec4<f32>,
cascadeNormalBias: vec4<f32>,
cascadeRadius: vec4<f32>,
iblParams: vec4<f32>,
flatArtAmbient: vec3<f32>,
aerialExtinction: vec3<f32>,
aerialShade: f32,
aerialInscatter: vec3<f32>,
groundWet: f32,
cloudShadowA: vec4<f32>,
cloudShadowB: vec4<f32>,
cloudShadowC: vec4<f32>,
cloudShadowT0: vec4<f32>,
sunFilter: vec4<u32>,
sunKernel: vec4<f32>,
sunSelect: vec4<f32>,
cascadeTexelWorld: vec4<f32>,
cascadeDepthRange: vec4<f32>,
viewFogCenter: vec4<f32>,
viewFogExtent: vec4<f32>,
fogHeight: vec4<f32>,
cloudSeaSun: vec4<f32>,
cloudSeaColor: vec4<f32>,
cloudSeaSunDirection: vec4<f32>,
waterOverPlane: vec4<f32>,
waterOverRect: vec4<f32>,
waterOverExtinction: vec4<f32>,
cloudSeaMap: vec4<f32>,
}
struct SceneLight {
positionShine: vec4<f32>,
colorDecay: vec4<f32>,
directionCone: vec4<f32>,
penumbraCullShadow: vec4<f32>,
}
struct AtlasSlot {
matrix: mat4x4<f32>,
uvRect: vec4<f32>,
params: vec4<f32>,
}
@group(1) @binding(0) var<uniform> passLights: PassLights;
@group(1) @binding(1) var<storage, read> sceneLights: array<SceneLight>;
@group(1) @binding(2) var<storage, read> clusterRanges: array<vec2<u32>>;
@group(1) @binding(3) var<storage, read> clusterIndices: array<u32>;
@group(1) @binding(4) var sunCascadeMap: texture_2d_array<f32>;
@group(1) @binding(5) var shadowAtlasMap: texture_2d_array<f32>;
@group(1) @binding(6) var shadowSampler: sampler;
@group(1) @binding(7) var<storage, read> atlasSlots: array<AtlasSlot>;
@group(1) @binding(8) var<uniform> iblSh: array<vec4<f32>, 9>;
@group(1) @binding(9) var iblEnvMap: texture_2d_array<f32>;
@group(1) @binding(10) var iblSampler: sampler;
@group(1) @binding(11) var cloudShadowField: texture_2d<f32>;
@group(1) @binding(12) var<storage, read> cloudSeaMapTexels: array<u32>;
@group(1) @binding(16) var<uniform> fogHorizon: array<vec4<f32>, 336>;
fn shade_fogHeightShare(rise: f32) -> f32 {
let k = passLights.fogHeight.y;
let eye = frame.cameraPosition.y + frame.renderOrigin.y - passLights.fogHeight.x;
let lo = min(eye, eye + rise);
let hi = max(eye, eye + rise);
let under = max(min(hi, 0.0) - lo, 0.0);
let over = max(hi, 0.0) - max(lo, 0.0);
if (under + over < 1e-3) { return exp(-k * max(eye, 0.0)); }
let x = k * over;
let thinned = exp(-k * max(lo, 0.0)) * select((1.0 - exp(-x)) / max(x, 1e-6), 1.0 - 0.5 * x, x < 1e-3);
return (under + over * thinned) / (under + over);
}
fn shade_authoredFogFactor(viewZ: f32) -> f32 {
let range = smoothstep(passLights.fogNear, max(passLights.fogFar, passLights.fogNear + 1e-4), viewZ);
let dz = passLights.fogDensity * viewZ;
let density = 1.0 - exp(-(dz * dz));
let factor = select(select(0.0, range, passLights.fogMode == 1.0), density, passLights.fogMode == 2.0);
return clamp(factor, 0.0, 1.0);
}
fn shade_fogFactor(viewZ: f32, rise: f32) -> f32 {
var depth = viewZ;
if (passLights.fogHeight.y > 0.0) { depth = viewZ * shade_fogHeightShare(rise); }
let factor = shade_authoredFogFactor(depth);
if (passLights.viewFogAmount > 0.0) {
let viewRange = smoothstep(passLights.viewFogNear, max(passLights.viewFogFar, passLights.viewFogNear + 1e-4), viewZ);
return clamp(max(factor, viewRange * passLights.viewFogAmount), 0.0, 1.0);
}
return clamp(factor, 0.0, 1.0);
}
var<private> shade_surfaceAirLit: f32 = 0.0;
struct ShadeCloudSea {
color: vec4<f32>,
at: f32,
}
struct AirWindow {
viewProj: mat4x4<f32>,
invViewProj: mat4x4<f32>,
prevViewProj: mat4x4<f32>,
eye: vec4<f32>,
prevEye: vec4<f32>,
shift: vec4<f32>,
grid: vec4<u32>,
depth: vec4<f32>,
haze: vec4<f32>,
ground: vec4<f32>,
mist: vec4<f32>,
phase: vec4<f32>,
gains: vec4<f32>,
motes: vec4<f32>,
flags: vec4<f32>,
}
@group(1) @binding(17) var airVolume: texture_2d_array<f32>;
@group(1) @binding(18) var<uniform> airWindow: AirWindow;
@group(1) @binding(19) var airSampler: sampler;
fn lighting_pixelRoughness(N: vec3<f32>, roughness: f32) -> f32 {
let dNdx = dpdx(N);
let dNdy = dpdy(N);
let kernel = min(0.3 * (dot(dNdx, dNdx) + dot(dNdy, dNdy)), 0.2);
let a = max(roughness, 0.0525);
let a2 = a * a;
return sqrt(sqrt(clamp(a2 * a2 + kernel, 0.0, 1.0)));
}
struct LumeSurfaceOut {
@location(0) albedo: vec4<f32>,
@location(1) words: vec2<u32>,
@location(2) emissive: u32,
@location(3) read: u32,
}
var<private> lume_surfacePoint: vec3<f32>;
var<private> lume_surfaceHorizon: vec3<f32>;
fn lume_surfaceOctEncode(n: vec3<f32>) -> vec2<f32> {
let p = n.xy / (abs(n.x) + abs(n.y) + abs(n.z));
let folded = (vec2<f32>(1.0) - abs(p.yx)) * select(vec2<f32>(-1.0), vec2<f32>(1.0), p >= vec2<f32>(0.0));
return select(folded, p, n.z >= 0.0) * 0.5 + vec2<f32>(0.5);
}
fn lume_surfaceOctUp(code: vec2<u32>, full: i32) -> bool {
let c = vec2<i32>(code);
return abs(2 * c.x - full) + abs(2 * c.y - full) <= full;
}
fn lume_surfaceBendSteps(n: vec3<f32>, up: bool) -> mat2x3<f32> {
let s = select(-1.0, 1.0, up);
let a = -1.0 / (s + n.z);
let b = n.x * n.y * a;
return mat2x3<f32>(vec3<f32>(1.0 + s * n.x * n.x * a, s * b, -s * n.x), vec3<f32>(b, s + n.y * n.y * a, -n.y));
}
fn lume_surfaceGlowWord(glow: vec3f) -> u32 {
let b = bitcast<vec3u>(glow);
let kept = min(b & (((min(b, vec3u(0x7f800001u)) + 0x7fffffu) >> vec3u(31u)) - 1u), vec3u(0x477e0000u, 0x477e0000u, 0x477c0000u));
let small = vec3u(round(bitcast<vec3f>(min(kept, vec3u(0x38800000u))) * vec3f(1048576, 1048576, 524288)));
let code = small + ((max(kept, vec3u(0x38800000u)) - vec3u(0x387f0000u, 0x387f0000u, 0x387e0000u)) >> vec3u(17u, 17u, 18u));
return code.x | (code.y << 11u) | (code.z << 22u);
}
fn lume_surfaceAt(N: vec3<f32>, albedo: vec3<f32>, roughness: f32, metalness: f32, receiveShadow: f32, emissive: vec3<f32>, kind: u32, read: u32, last: u32) -> LumeSurfaceOut {
let pixelRoughness = lighting_pixelRoughness(N, roughness);
let len = sqrt(dot(N, N));
let unit = N / len;
let oct = vec2<u32>(round(lume_surfaceOctEncode(unit) * 32767.0));
let length6 = u32(round(clamp((len - 0.5) * 2.0, 0.0, 1.0) * 63.0));
let plane = cross(dpdx(lume_surfacePoint), dpdy(lume_surfacePoint));
let planeSq = dot(plane, plane);
let along = dot(plane, unit);
let planeIsNormal = (planeSq > 0.0) & (along * along >= 0.99992 * planeSq);
var out: LumeSurfaceOut;
out.albedo = vec4<f32>(max(albedo, vec3<f32>(0.0)), clamp(metalness, 0.0, 1.0));
out.words = vec2<u32>(oct.x | (oct.y << 15u) | select(0u, 0x40000000u, planeIsNormal), u32(round(clamp(pixelRoughness, 0.0, 1.0) * 4095.0)) | select(0u, 4096u, receiveShadow > 0.5) | (length6 << 13u) | (kind << 19u) | (last << 23u));
let glowWord = lume_surfaceGlowWord(emissive);
let code = vec2<u32>(round(lume_surfaceOctEncode(plane) * 4095.0));
let planeStored = (planeSq > 0.0) & !planeIsNormal & (glowWord == 0u);
let horizonAlong = dot(unit, lume_surfaceHorizon);
let horizon = planeStored & (kind == 8u) & (read == 0u) & (horizonAlong > 0.0) & (horizonAlong * horizonAlong < 0.99992 * dot(lume_surfaceHorizon, lume_surfaceHorizon));
let bendSteps = lume_surfaceBendSteps(unit, lume_surfaceOctUp(oct, 32767));
let across = vec2<f32>(dot(lume_surfaceHorizon, bendSteps[0]), dot(lume_surfaceHorizon, bendSteps[1]));
let fold = across / select(1.0, abs(across.x) + abs(across.y) + horizonAlong, horizon);
let bend = vec2<u32>(round(clamp(vec2<f32>(fold.x + fold.y, fold.x - fold.y), vec2<f32>(-1.0), vec2<f32>(1.0)) * vec2<f32>(127.0, 63.0)) + vec2<f32>(127.0, 63.0));
out.emissive = select(glowWord, (code.x & 63u) | (31u << 6u) | ((code.x >> 6u) << 11u) | (code.y << 17u) | select(0u, 536870912u, horizon), planeStored);
out.read = select(read, read | (bend.x << 16u) | (bend.y << 24u), horizon);
return out;
}
fn lume_surfaceOut(N: vec3<f32>, albedo: vec3<f32>, roughness: f32, metalness: f32, receiveShadow: f32, emissive: vec3<f32>) -> LumeSurfaceOut {
return lume_surfaceAt(N, albedo, roughness, metalness, receiveShadow, emissive, 8u, 0u, 0u);
}
struct GroundDraw {
kind: u32,
arm: u32,
three: u32,
twelve: u32,
bounds: vec4<u32>,
}
@group(2) @binding(15) var<uniform> groundDraw: GroundDraw;
override terrainFogWhole: bool = false;
struct TerrainPool {
resolution: f32,
textureResolution: f32,
chunkWorldSize: f32,
skirtDepth: f32,
verticalMin: f32,
verticalRangeInv: f32,
spacing: f32,
maxSlot: f32,
layerCount: f32,
shading: f32,
holeHeapWord: f32,
morph: f32,
fallbackColor: vec3<f32>,
morphWalk: f32,
morphFrom: vec4<f32>,
morphTo: vec4<f32>,
morphHorizon: vec4<f32>,
morphRowStep: f32,
morphErrorFrom: f32,
morphErrorTo: f32,
eyeUnder: f32,
yieldSide: f32,
renderOrigin: vec3<f32>,
blendResolution: f32,
yieldWord: f32,
}
const TERRAIN_SURFACE_DRAW_DROP: f32 = 0.002;
@group(2) @binding(0) var<uniform> pool: TerrainPool;
@group(2) @binding(1) var<storage, read> heights: array<u32>;
@group(2) @binding(2) var<storage, read> blendWords: array<u32>;
@group(2) @binding(3) var<storage, read> layerParams: array<vec4<f32>>;
@group(2) @binding(4) var albedoArray: texture_2d_array<f32>;
@group(2) @binding(5) var atlasSampler: sampler;
@group(2) @binding(6) var nroArray: texture_2d_array<f32>;
@group(2) @binding(7) var albedoFine: texture_2d_array<f32>;
@group(2) @binding(10) var nroFine: texture_2d_array<f32>;
@group(3) @binding(0) var<storage, read> slotTransforms: array<mat4x4<f32>>;
fn terrain_slotTransform(slot: u32) -> mat4x4<f32> {
let m = slotTransforms[slot];
let shift = vec3<f32>(m[0].w, m[1].w, m[2].w) - pool.renderOrigin.xyz;
return mat4x4<f32>(vec4<f32>(m[0].xyz, 0.0), vec4<f32>(m[1].xyz, 0.0), vec4<f32>(m[2].xyz, 0.0), vec4<f32>(m[3].xyz + shift, 1.0));
}
@group(3) @binding(1) var<storage, read> slotOrigins: array<vec4<f32>>;
`,`fn terrain_hash2D(p: vec2<f32>, seed: f32) -> f32 {
var p3 = fract(vec3<f32>(p.x, p.y, p.x) * vec3<f32>(0.1031, 0.103, 0.0973));
let shifted = p3 + vec3<f32>(dot(p3, p3.yzx + (vec3<f32>(seed) + vec3<f32>(33.33))));
return fract((shifted.x + shifted.y) * shifted.z);
}
fn terrain_noise2D(p: vec2<f32>, seed: f32) -> f32 {
let i = floor(p);
let f = fract(p);
let a = terrain_hash2D(i, seed);
let b = terrain_hash2D(i + vec2<f32>(1.0, 0.0), seed);
let c = terrain_hash2D(i + vec2<f32>(0.0, 1.0), seed);
let d = terrain_hash2D(i + vec2<f32>(1.0, 1.0), seed);
let u = f * f * (vec2<f32>(3.0) - f * 2.0);
return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}
@group(2) @binding(8) var groundLattice: texture_2d<f32>;
fn terrain_lattice0(p: vec2<f32>) -> f32 {
let i = floor(p);
let f = p - i;
let at = i - 256.0 * floor(i / 256.0);
return textureSampleLevel(groundLattice, atlasSampler, (at + f * f * (vec2<f32>(3.0) - f * 2.0) + vec2<f32>(0.5)) / 256.0, 0.0).r;
}
fn terrain_lattice1(p: vec2<f32>) -> f32 {
let i = floor(p);
let f = p - i;
let at = i - 256.0 * floor(i / 256.0);
return textureSampleLevel(groundLattice, atlasSampler, (at + f * f * (vec2<f32>(3.0) - f * 2.0) + vec2<f32>(0.5)) / 256.0, 0.0).g;
}
fn terrain_lattice2(p: vec2<f32>) -> f32 {
let i = floor(p);
let f = p - i;
let at = i - 256.0 * floor(i / 256.0);
return textureSampleLevel(groundLattice, atlasSampler, (at + f * f * (vec2<f32>(3.0) - f * 2.0) + vec2<f32>(0.5)) / 256.0, 0.0).b;
}
fn terrain_lattice3(p: vec2<f32>) -> f32 {
let i = floor(p);
let f = p - i;
let at = i - 256.0 * floor(i / 256.0);
return textureSampleLevel(groundLattice, atlasSampler, (at + f * f * (vec2<f32>(3.0) - f * 2.0) + vec2<f32>(0.5)) / 256.0, 0.0).a;
}
fn terrain_drift(worldXZ: vec2<f32>, scaleMeters: f32) -> vec2<f32> {
let p = worldXZ / scaleMeters;
let n = terrain_lattice0(p) * 0.6667 + terrain_lattice1(p * 2.3 + vec2<f32>(13.7, 5.1)) * 0.3333;
let h = terrain_lattice2(p * 0.7 + vec2<f32>(41.3, 27.9));
return vec2<f32>(n, h);
}
fn terrain_texRes() -> i32 {
return i32(pool.textureResolution);
}
fn terrain_heightTexel_postHead(t: u32) -> vec3<u32> {
let f = heights[t];
let s = heights[t+1u];
return vec3<u32>(t, f, select(s, 0u, s == f));
}
fn terrain_heightTexel_post(h: vec3<u32>, x: u32, z: u32, r: u32) -> f32 {
let n = (h.z&15u)+1u;
let w = 2u*n-1u;
let b = h.x+2u+((z>>2u)*((r+3u)>>2u)+(x>>2u))*n;
let i = 16u+((z&3u)*4u+(x&3u))*w;
let a = b+i/32u;
let s = i&31u;
return bitcast<f32>(h.y)+f32((heights[b]&0xffffu)+(((heights[a]>>s)|((heights[a+1u]<<1u)<<(31u-s)))&((1u<<w)-1u)))*bitcast<f32>(h.z&~15u);
}
fn terrain_heightTexel_tile(slot: u32) -> vec3<u32> {
return terrain_heightTexel_postHead(heights[slot * 6u]);
}
fn terrain_heightTexel(tile: vec3<u32>, x: i32, z: i32) -> f32 {
let texRes = i32(pool.textureResolution);
return terrain_heightTexel_post(tile, u32(clamp(x, 0, texRes - 1)), u32(clamp(z, 0, texRes - 1)), u32(texRes));
}
fn terrain_heightTexel_lattice(slot: u32) -> f32 {
let tile = heights[slot * 6u];
let stepWord = heights[tile + 1u];
return select(bitcast<f32>(stepWord & ~15u), 0.0009765625, stepWord == heights[tile]);
}
fn terrain_texel(i: i32) -> u32 {
return u32(clamp(i, 0, terrain_texRes() - 1));
}
fn terrain_heightBilinear(tile: vec3<u32>, texelF: vec2<f32>) -> f32 {
let p = texelF - vec2<f32>(0.5);
let i0 = floor(p);
let f = p - i0;
let x0 = i32(i0.x);
let z0 = i32(i0.y);
let col0 = terrain_texel(x0);
let col1 = terrain_texel(x0 + 1);
let row0 = terrain_texel(z0);
let row1 = terrain_texel(z0 + 1);
let texRes = u32(terrain_texRes());
let h00 = terrain_heightTexel_post(tile, col0, row0, texRes);
let h10 = terrain_heightTexel_post(tile, col1, row0, texRes);
let h01 = terrain_heightTexel_post(tile, col0, row1, texRes);
let h11 = terrain_heightTexel_post(tile, col1, row1, texRes);
return mix(mix(h00, h10, f.x), mix(h01, h11, f.x), f.y);
}
fn terrain_ringBilinear(tile: vec3u, texelF: vec2f, d: vec2f) -> f32 {
var sum = 0.0;
for (var i = 0u; i <= groundDraw.three; i += 2u) {
sum += terrain_heightBilinear(tile, texelF + d * (f32(i & 2u) - 1.0));
}
return sum;
}
const TERRAIN_MORPH_WALK_S: f32 = 2.0;
const TERRAIN_HORIZON_THETA_STEP: f32 = 0.008181230868723419;
fn terrain_morphCoverage(anchor: f32) -> f32 {
let a = clamp((frame.fadeTime - anchor) / TERRAIN_MORPH_WALK_S, 0.0, 1.0);
return a * a * (3.0 - 2.0 * a);
}
fn terrain_strideHeight(tile: vec3<u32>, gx: i32, gz: i32, stride: i32) -> f32 {
let x0 = (gx / stride) * stride;
let z0 = (gz / stride) * stride;
if (x0 == gx && z0 == gz) { return terrain_heightTexel(tile, gx + 1, gz + 1); }
let last = i32(pool.resolution) - 1;
let x1 = min(x0 + stride, last);
let z1 = min(z0 + stride, last);
let fx = f32(gx - x0) / f32(max(x1 - x0, 1));
let fz = f32(gz - z0) / f32(max(z1 - z0, 1));
let h10 = terrain_heightTexel(tile, x1 + 1, z0 + 1);
let h01 = terrain_heightTexel(tile, x0 + 1, z1 + 1);
if (fx + fz <= 1.0) {
let h00 = terrain_heightTexel(tile, x0 + 1, z0 + 1);
return h00 + fx * (h10 - h00) + fz * (h01 - h00);
}
let h11 = terrain_heightTexel(tile, x1 + 1, z1 + 1);
return h11 + (1.0 - fx) * (h01 - h11) + (1.0 - fz) * (h10 - h11);
}
fn terrain_localHeight(tile: vec3<u32>, local: vec2<f32>) -> f32 {
return terrain_heightBilinear(tile, local / pool.spacing + vec2<f32>(1.5));
}
fn terrain_horizonHeight(slot: u32, uv: vec2<f32>, worldXZ: vec2<f32>, outside: f32) -> f32 {
let rel = worldXZ - pool.morphHorizon.xy;
let r = length(rel);
let inner = pool.morphHorizon.z;
let seam = pool.morphHorizon.w;
let rowStep = pool.morphRowStep;
if (rowStep <= 0.0 || r < inner || r >= seam) { return outside; }
let rows = (r - inner) / rowStep;
let row = floor(rows);
let fr = rows - row;
let r0 = inner + row * rowStep;
let r1 = r0 + rowStep;
var theta = atan2(rel.y, rel.x);
if (theta < 0.0) { theta = theta + 6.283185307179586; }
let columns = theta / TERRAIN_HORIZON_THETA_STEP;
let column = floor(columns);
let fc = columns - column;
let d0 = vec2<f32>(cos(column * TERRAIN_HORIZON_THETA_STEP), sin(column * TERRAIN_HORIZON_THETA_STEP));
let d1 = vec2<f32>(cos((column + 1.0) * TERRAIN_HORIZON_THETA_STEP), sin((column + 1.0) * TERRAIN_HORIZON_THETA_STEP));
let centre = uv - rel;
var hOuter = 0.0;
var hInnerNext = 0.0;
var hInner = 0.0;
var hOuterNext = 0.0;
let tile = terrain_heightTexel_tile(slot);
for (var k = 0u; k <= groundDraw.three; k++) {
let at = select(select(select(d1 * r1, d0 * r0, k == 2u), d1 * r0, k == 1u), d0 * r1, k == 0u);
let hk = terrain_localHeight(tile, centre + at);
if (k == 0u) { hOuter = hk; } else if (k == 1u) { hInnerNext = hk; } else if (k == 2u) { hInner = hk; } else { hOuterNext = hk; }
}
var ring = 0.0;
if (abs(hInner - hOuterNext) < abs(hOuter - hInnerNext)) {
if (fr >= fc) {
ring = hInner + fr * (hOuter - hInner) + fc * (hOuterNext - hOuter);
} else {
ring = hInner + fc * (hInnerNext - hInner) + fr * (hOuterNext - hInnerNext);
}
} else if (fr + fc <= 1.0) {
ring = hInner + fr * (hOuter - hInner) + fc * (hInnerNext - hInner);
} else {
ring = hOuterNext + (1.0 - fr) * (hInnerNext - hOuterNext) + (1.0 - fc) * (hOuter - hOuterNext);
}
let edge = smoothstep(inner, inner + rowStep, r) * (1.0 - smoothstep(seam - rowStep, seam, r));
return mix(outside, ring, edge);
}
fn terrain_arrival(words: vec2<f32>) -> vec2<f32> {
if (pool.morph == 0.0 || words.y == 0.0) { return vec2<f32>(1.0); }
let scale = select(max(round(pool.morphRowStep / pool.spacing), 1.0), words.y, words.y >= 2.0);
return vec2<f32>(words.x, scale);
}
fn terrain_scaleNormal(tile: vec3<u32>, gx: i32, gz: i32, scale: i32) -> vec3<f32> {
let hL = terrain_heightTexel(tile, gx + 1 - scale, gz + 1);
let hR = terrain_heightTexel(tile, gx + 1 + scale, gz + 1);
let hD = terrain_heightTexel(tile, gx + 1, gz + 1 - scale);
let hU = terrain_heightTexel(tile, gx + 1, gz + 1 + scale);
let across = pool.spacing * 2.0 * f32(scale);
return normalize(vec3<f32>(-(hR - hL) / across, 1.0, -(hU - hD) / across));
}
fn terrain_drawnHeight(slot: u32, gx: i32, gz: i32, height: f32, transform: mat4x4<f32>, uv: vec2<f32>, words: vec2<f32>, arrival: vec2<f32>) -> f32 {
if (pool.morph == 0.0) { return height; }
if (arrival.x >= 1.0 && ((gx | gz) & 3) == 0) { return height; }
let renderXZ = (transform * vec4<f32>(uv.x, 0.0, uv.y, 1.0)).xz;
let eye = length(renderXZ - frame.cameraPosition.xz);
let walk = terrain_morphCoverage(pool.morphWalk);
let passes = select(1u, 2u, arrival.x < 1.0 && words.y >= 2.0);
var level = height;
var start = height;
var h = height;
var m = vec2<f32>(0.0);
for (var q = 0u; q < passes * 3u; q++) {
let half = q / 3u;
let step = q - half * 3u;
let unit = select(1, i32(words.y), half == 1u);
if (step == 0u) {
let reach = vec2<f32>(eye / f32(unit));
let left = clamp((reach - pool.morphFrom.xz) * pool.morphFrom.yw, vec2<f32>(0.0), vec2<f32>(1.0));
let toward = clamp((reach - pool.morphTo.xz) * pool.morphTo.yw, vec2<f32>(0.0), vec2<f32>(1.0));
m = mix(left, toward, walk);
}
let share = select(m.y, m.x, step == 1u);
if (step == 0u && half == 0u) {
h = height;
} else if (step == 0u || share > 0.0) {
let stride = terrain_strideHeight(terrain_heightTexel_tile(slot), gx, gz, select(select(4 * unit, 2 * unit, step == 1u), unit, step == 0u));
h = select(mix(h, stride, share), stride, step == 0u);
}
if (step == 2u) {
if (half == 0u) { level = h; } else { start = h; }
}
}
let hold = mix(select(0.0, 1.0, pool.morphErrorFrom > 0.0), select(0.0, 1.0, pool.morphErrorTo > 0.0), walk);
if (hold > 0.0) {
let limit = mix(pool.morphErrorFrom, pool.morphErrorTo, walk) * select(eye, 1.0, frame.proj[3][3] > 0.5);
level = mix(level, height + clamp(level - height, -limit, limit), hold);
}
if (arrival.x >= 1.0) { return level; }
if (words.y < 2.0) {
start = level;
if (words.y < 0.0) {
start = terrain_horizonHeight(slot, uv, lume_worldFromRender(vec3<f32>(renderXZ.x, 0.0, renderXZ.y)).xz, level);
}
}
return mix(start, level, terrain_arrivalAt(slot, gx, gz, arrival.x));
}
fn terrain_arrivalAt(slot: u32, gx: i32, gz: i32, share: f32) -> f32 {
let last = max(f32(i32(pool.resolution) - 1), 1.0);
let g = vec4<f32>(f32(gx), last - f32(gx), f32(gz), last - f32(gz));
let hold = select(saturate(1.0 - g / last), vec4<f32>(0.0), slotOrigins[slot * 3u + 1u] > vec4<f32>(64.25));
return mix(share, 1.0, max(max(hold.x, hold.y), max(hold.z, hold.w)));
}
fn terrain_blendTexRes() -> i32 {
return i32(pool.blendResolution) + 2;
}
fn terrain_blendRow(z: i32) -> i32 {
let texRes = terrain_blendTexRes();
return clamp(z, 0, texRes - 1) * texRes;
}
fn terrain_blendCol(x: i32) -> i32 {
return clamp(x, 0, terrain_blendTexRes() - 1);
}
fn terrain_blendEntry(slot: u32) -> u32 {
return blendWords[4u + slot];
}
fn terrain_blendCodedWord(entry: u32, texel: i32) -> u32 {
let dictionary = (entry & 0xffffffe0u);
let log = entry & 31u;
if (log == 0u) { return blendWords[dictionary]; }
let bit = u32(texel) * log;
let at = dictionary + (1u << log) + (bit >> 5u);
let shift = bit & 31u;
var code = blendWords[at] >> shift;
if (shift + log > 32u) { code |= blendWords[at + 1u] << (32u - shift); }
return blendWords[dictionary + extractBits(code, 0u, log)];
}
fn terrain_wordStep() -> i32 {
return max(i32(round((pool.blendResolution - 1.0) / max(pool.resolution - 1.0, 1.0))), 1);
}
fn terrain_wordCornerHeights(tile: vec3<u32>, gx: i32, gz: i32) -> vec4<f32> {
let step = terrain_wordStep();
let word = max(vec2<i32>(gx - 1, gz - 1), vec2<i32>(0));
let cell = word / step;
let share = 1.0 / f32(step);
let low = vec2<f32>(word - cell * step) * share;
let high = low + vec2<f32>(share);
let near = vec2<f32>(terrain_heightTexel(tile, cell.x + 1, cell.y + 1), terrain_heightTexel(tile, cell.x + 1, cell.y + 2));
let far = vec2<f32>(terrain_heightTexel(tile, cell.x + 2, cell.y + 1), terrain_heightTexel(tile, cell.x + 2, cell.y + 2));
let columnLow = mix(near, far, low.x);
let columnHigh = mix(near, far, high.x);
return vec4<f32>(mix(columnLow.x, columnLow.y, low.y), mix(columnHigh.x, columnHigh.y, low.y), mix(columnLow.x, columnLow.y, high.y), mix(columnHigh.x, columnHigh.y, high.y));
}
fn terrain_wordLayers(word: u32) -> vec3<u32> { return (vec3<u32>(word) >> vec3<u32>(26u, 20u, 14u)) & vec3<u32>(0x3fu); }
fn terrain_wordQuanta(word: u32) -> vec3<u32> {
let q = (vec2<u32>(word) >> vec2<u32>(7u, 0u)) & vec2<u32>(0x7fu);
return vec3<u32>(q, 127u - min(q.x + q.y, 127u));
}
fn terrain_layerOf(slot: u32, local: u32) -> u32 {
if (blendWords[0u] == 0u) { return local; }
return blendWords[(terrain_blendEntry(slot) & 0xffffffe0u) - 64u + local];
}
fn terrain_paramsRow(layer: u32, row: u32) -> vec4<f32> {
return layerParams[row * u32(pool.layerCount) + min(layer, u32(pool.layerCount) - 1u)];
}
fn terrain_floorGradScale(ddx: vec2<f32>, ddy: vec2<f32>, texels: vec2<f32>, lodFloor: f32) -> f32 {
if (lodFloor <= 0.0) { return 1.0; }
let a = ddx * texels;
let b = ddy * texels;
let spread = dot(a, a) + dot(b, b);
let area = abs(a.x * b.y - a.y * b.x);
let major = sqrt(0.5 * (spread + sqrt(max(spread * spread - 4.0 * area * area, 0.0))));
let footprint = area / max(major, 1e-8);
return max(exp2(lodFloor) / max(footprint, 1e-8), 1.0);
}
fn terrain_projectionShares(normal: vec3<f32>) -> vec3<f32> {
let facing = abs(normal);
let top = smoothstep(0.55, 0.8, facing.y);
let across = facing.xz / max(length(facing.xz), 1e-6);
let planes = smoothstep(vec2<f32>(0.55), vec2<f32>(0.8), across);
return vec3<f32>(top, planes / max(planes.x + planes.y, 1e-6) * (1.0 - top));
}
@group(3) @binding(5) var<storage, read> terrain_ringMemory: array<u32>;
fn terrain_seamFlush(survivorSlot: u32, own: u32, gx: i32, gz: i32, out: vec2<f32>) -> bool {
let at = select(gz, gx, out.x != 0.0);
if (at <= 0 || at >= i32(pool.resolution) - 1) { return false; }
let across = u32(i32(own) + i32(out.x) + i32(out.y) * 4);
return across < 16u && !terrain_patchYields(survivorSlot - own + across);
}
fn terrain_besidePatch(word: f32, at: u32) -> i32 {
if (word < 0.5) { return -1; }
return i32(16u * (u32(word) - 1u) + at);
}
fn terrain_patchAcross(survivorSlot: u32, own: u32, side: u32, beside: vec4<f32>) -> i32 {
let column = own % 4u;
let row = own / 4u;
if (side == 0u) { if (column > 0u) { return i32(survivorSlot) - 1; } return terrain_besidePatch(beside.x, own + 3u); }
if (side == 1u) { if (column < 3u) { return i32(survivorSlot) + 1; } return terrain_besidePatch(beside.y, own - 3u); }
if (side == 2u) { if (row > 0u) { return i32(survivorSlot) - 4; } return terrain_besidePatch(beside.z, own + 12u); }
if (row < 3u) { return i32(survivorSlot) + 4; }
return terrain_besidePatch(beside.w, own - 12u);
}
fn terrain_seamStitch(survivorSlot: u32, own: u32, at: vec2<u32>, last: u32, stride: u32) -> vec2<u32> {
let onX = at.x == 0u || at.x == last;
let onZ = at.y == 0u || at.y == last;
if (onX == onZ) { return at; }
let chunk = min(survivorSlot / 16u, u32(pool.maxSlot));
let side = select(select(3u, 2u, at.y == 0u), select(1u, 0u, at.x == 0u), onX);
let across = terrain_patchAcross(survivorSlot, own, side, slotOrigins[chunk * 3u + 2u]);
if (across < 0 || terrain_patchYields(u32(across))) { return at; }
let m = terrain_ringMemory[u32(across)];
let drawn = select(1u << m, last, m > 4u);
if (drawn <= stride) { return at; }
let p = select(at.x, at.y, onX);
let q = min(((p + drawn / 2u) / drawn) * drawn, last);
return select(vec2<u32>(q, at.y), vec2<u32>(at.x, q), onX);
}
fn terrain_lineJoined(slot: u32, side: u32, arrival: vec2<f32>) -> bool {
if (arrival.x < 1.0) { return false; }
let beside = slotOrigins[slot * 3u + 2u];
let word = beside[side];
if (word < 0.5) { return false; }
let across = min(u32(word) - 1u, u32(pool.maxSlot));
let back = slotOrigins[across * 3u + 2u];
let toward = back[side ^ 1u];
return toward == f32(slot + 1u) && terrain_arrival(slotOrigins[across * 3u].zw).x >= 1.0 && !terrain_pieceYields(across) && terrain_chunkForm(slot) == terrain_chunkForm(across);
}
fn terrain_chunkForm(slot: u32) -> bool {
return terrain_ringMemory[slot * 16u] == 6u;
}
fn terrain_pieceYields(slot: u32) -> bool {
for (var p = 0u; p < 16u; p++) { if (terrain_patchYields(slot * 16u + p)) { return true; } }
return false;
}
fn terrain_skirtLow(slot: u32, gx: i32, gz: i32, along: vec2<i32>, drawn: f32, cap: i32) -> f32 {
let at = vec2<i32>(gx, gz);
let p = dot(at, along);
let base = at - along * p;
let last = i32(pool.resolution) - 1;
let tile = terrain_heightTexel_tile(slot);
var low = min(drawn, terrain_heightTexel(tile, gx + 1, gz + 1));
for (var steps = 2; steps <= min(cap, 64); steps = steps * 2) {
let p0 = (p / steps) * steps;
let p1 = min(p0 + steps, last);
let q0 = base + along * p0;
let q1 = base + along * p1;
let f = f32(p - p0) / f32(max(p1 - p0, 1));
low = min(low, mix(terrain_heightTexel(tile, q0.x + 1, q0.y + 1), terrain_heightTexel(tile, q1.x + 1, q1.y + 1), f));
}
return low;
}
fn terrain_skirtDip(slot: u32, gx: i32, gz: i32, along: vec2<i32>, reach: i32) -> f32 {
let at = vec2<i32>(gx, gz);
let p = dot(at, along);
let base = at - along * p;
let last = i32(pool.resolution) - 1;
let q0 = max(p - reach, 1);
let q1 = min(p + reach, last - 1);
var dip = 0.0;
if (q0 > q1) { return dip; }
let a = base + along * (q0 - 1);
let b = a + along;
let tile = terrain_heightTexel_tile(slot);
var h0 = terrain_heightTexel(tile, a.x + 1, a.y + 1);
var h1 = terrain_heightTexel(tile, b.x + 1, b.y + 1);
for (var q = q0; q <= q1; q++) {
let c = base + along * (q + 1);
let h2 = terrain_heightTexel(tile, c.x + 1, c.y + 1);
dip = max(dip, (h0 + h2) * 0.5 - h1);
h0 = h1;
h1 = h2;
}
return dip;
}
fn terrain_lineRound(slot: u32, side: u32) -> f32 {
let beside = slotOrigins[slot * 3u + 2u];
let word = beside[side];
if (word < 0.5) { return 0.0; }
return max(terrain_heightTexel_lattice(min(u32(word) - 1u, u32(pool.maxSlot))) - terrain_heightTexel_lattice(slot), 0.0);
}
fn terrain_skirtY(slot: u32, gx: i32, gz: i32, along: vec2<i32>, drawn: f32, origin: vec4<f32>, sides: vec4<f32>, transform: mat4x4<f32>, uv: vec2<f32>, stride: u32, arrival: vec2<f32>) -> f32 {
let eye = frame.cameraPosition - (transform * vec4<f32>(uv.x, drawn - origin.x, uv.y, 1.0)).xyz;
let last = i32(pool.resolution) - 1;
var chord = max(min(16, (last + 3) / 4), 4);
if (arrival.x < 1.0 && origin.w >= 2.0) { chord = max(chord, 4 * i32(origin.w)); }
var cap = min(chord, 16);
let at = select(gz, gx, along.y == 1);
let chunkLine = at == 0 || at == last;
let side = select(2u, 0u, along.y == 1) + u32(at == last);
let line = sides[side];
var hang = 0.0;
var joined = false;
if (chunkLine) {
cap = select(i32(line), 16, line < 0.0);
joined = line < 0.0 && terrain_lineJoined(slot, side, arrival);
if (joined) {
let rounding = terrain_lineRound(slot, side);
if (line > -1.5) { return drawn - rounding; }
hang = max(-2.0 - line, 0.0) + rounding;
} else { hang = max(terrain_skirtDip(slot, gx, gz, along, i32(stride)), max(origin.y, (line - 64.5) * f32(eye.y > 0.0))); }
}
let focal = max(frame.proj[1][1] * frame.lodHeight * 0.5, 1.0);
let reach = select(length(eye), 1.0, frame.proj[3][3] > 0.5);
let cover = min(pool.spacing, 2.0 * reach / focal);
if (joined) { return drawn - max(hang, cover); }
return terrain_skirtLow(slot, gx, gz, along, drawn, cap) - max(hang, cover);
}
fn terrain_skirtFaces(transform: mat4x4<f32>, out: vec2<f32>, at: vec2<f32>) -> bool {
if (pool.eyeUnder > 0.5 || frame.proj[3][3] > 0.5) { return true; }
let edge = (transform * vec4<f32>(at.x, 0.0, at.y, 1.0)).xyz;
let outward = (transform * vec4<f32>(out.x, 0.0, out.y, 0.0)).xyz;
return dot(outward, frame.cameraPosition - edge) >= 0.0;
}
fn terrain_lowBilinear(tile: vec3u, texelF: vec2f) -> f32 {
let r = min(vec2f(3.0), min(texelF, f32(terrain_texRes()) - texelF) - 0.5);
return dot(2.25 / (r * r), vec2f(terrain_ringBilinear(tile, texelF, vec2f(r.x, 0.0)), terrain_ringBilinear(tile, texelF, vec2f(0.0, r.y))) - 2.0 * terrain_heightBilinear(tile, texelF));
}
fn wet_grazingGleam(roughness: f32) -> f32 {
let x = 1.0 - roughness;
return (0.0016 - 0.00088 * roughness + 0.9984 * (x * x * x + 0.0425 - 0.0275 * roughness)) / (1.0 - 0.047142832 * roughness);
}
fn wet_roughnessOfGleam(gleam: f32) -> f32 {
var lo = 0.0;
var hi = 1.0;
for (var i = 0u; i < 8u; i = i + 1u) {
let mid = 0.5 * (lo + hi);
let over = wet_grazingGleam(mid) > gleam;
lo = select(lo, mid, over);
hi = select(mid, hi, over);
}
return hi;
}
fn wet_roughness(dryRgb: vec3<f32>, dryRoughness: f32, wetRgb: vec3<f32>, wetRoughness: f32) -> f32 {
let luma = vec3<f32>(0.2126, 0.7152, 0.0722);
let dry = clamp(dot(dryRgb, luma), 0.0, 1.0);
let wet = clamp(dot(wetRgb, luma), 0.0, 1.0);
if (wet > dry) { return wetRoughness; }
let dryLight = dry + (1.0 - dry) * wet_grazingGleam(clamp(dryRoughness, 0.0, 1.0));
return max(wetRoughness, wet_roughnessOfGleam((dryLight - wet) / max(1.0 - wet, 1e-4)));
}
fn terrain_applyTint(baseColor: vec3<f32>, tintColor: vec3<f32>, strength: f32) -> vec3<f32> {
let luma = dot(baseColor, vec3<f32>(0.2126, 0.7152, 0.0722));
let tintLuma = max(dot(tintColor, vec3<f32>(0.2126, 0.7152, 0.0722)), 1e-4);
let colorized = vec3<f32>(luma) * (tintColor / tintLuma);
let multiplied = baseColor * tintColor;
let maxChannel = max(tintColor.r, max(tintColor.g, tintColor.b));
let minChannel = min(tintColor.r, min(tintColor.g, tintColor.b));
let saturation = clamp((maxChannel - minChannel) / max(maxChannel, 1e-4), 0.0, 1.0);
return mix(baseColor, mix(multiplied, colorized, saturation), strength);
}
fn terrain_applyTintFold(baseColor: vec3<f32>, tintColor: vec3<f32>, fold: vec3<f32>) -> vec3<f32> {
let luma = dot(baseColor, vec3<f32>(0.2126, 0.7152, 0.0722));
return baseColor * fold.z + tintColor * (baseColor * fold.x + luma * fold.y);
}
fn terrain_preJoinColor(word: f32, tint: vec3<f32>, fold: vec3<f32>) -> vec3<f32> {
if (word < 0.5) { return tint; }
let hex = u32(word - 1.0);
let srgb = vec3<f32>(f32((hex >> 16u) & 255u), f32((hex >> 8u) & 255u), f32(hex & 255u)) / 255.0;
let linear = select(pow(srgb * 0.9478672986 + 0.0521327014, vec3<f32>(2.4)), srgb * 0.0773993808, srgb < vec3<f32>(0.04045));
return terrain_applyTintFold(linear, tint, fold);
}
fn terrain_applyMacroNoise(color: vec3<f32>, noise: vec2<f32>, hueRadians: f32, value: f32) -> vec3<f32> {
if (hueRadians == 0.0 && value == 0.0) { return color; }
let n = noise.x;
let h = noise.y;
let shaded = color * (1.0 + (n - 0.5) * 2.0 * value);
let angle = (h - 0.5) * 2.0 * hueRadians;
let k = vec3<f32>(0.57735026919);
let cosA = cos(angle);
let sinA = sin(angle);
return max(shaded * cosA + cross(k, shaded) * sinA + k * dot(k, shaded) * (1.0 - cosA), vec3<f32>(0.0));
}
fn terrain_macroScaleOf(layer: u32) -> f32 {
return terrain_paramsRow(layer, 12u).w;
}
fn terrain_noisePlane(worldPos: vec3<f32>, plane: u32) -> vec2<f32> {
return select(select(worldPos.xy, worldPos.zy, plane == 1u), worldPos.xz, plane == 0u);
}
fn terrain_noiseShares(sideWeight: f32, sideShare: vec2<f32>) -> vec3<f32> {
return vec3<f32>(1.0 - sideWeight, sideWeight * sideShare.x, sideWeight * sideShare.y);
}
fn terrain_noiseShare(shares: vec3<f32>, plane: u32) -> f32 {
return select(select(shares.z, shares.y, plane == 1u), shares.x, plane == 0u);
}
fn terrain_jobNoise(point: vec2<f32>, k: u32, frequency: f32, isDither: bool, isMacro: bool, isMv: bool, macroScale: f32, aux: vec4<f32>, index: u32) -> f32 {
let macroP = point / macroScale;
let p = (point * 5.0) * frequency;
if (isDither) { return terrain_lattice3(point * 6.0 + vec2<f32>(f32(index) * 37.0, f32(index) * 59.0)); }
if (isMacro) {
if (k == 0u) { return terrain_lattice0(macroP); }
if (k == 1u) { return terrain_lattice1(macroP * 2.3 + vec2<f32>(13.7, 5.1)); }
return terrain_lattice2(macroP * 0.7 + vec2<f32>(41.3, 27.9));
}
if (isMv) {
if (k == 0u) { return terrain_lattice3(p); }
return terrain_lattice1(p);
}
return terrain_noise2D((point / max(aux.x, 1e-4)) * frequency, aux.y + f32(k) * 17.0);
}
fn terrain_patinaRoughness(sample: f32, intensity: f32) -> f32 {
let polished = sample * min(intensity, 1.0);
let matte = clamp(intensity - 1.0, 0.0, 1.0);
return clamp(mix(polished, 1.0, matte), 0.0, 1.0);
}
fn terrain_sideRelief(planeX: vec2<f32>, planeZ: vec2<f32>, strength: f32, sideShare: vec2<f32>, geoNormal: vec3<f32>) -> vec3<f32> {
let x = patina_packedNormalTs(vec4<f32>(planeX, 0.0, 0.0), strength) * vec3<f32>(1.0, -1.0, 1.0);
let z = patina_packedNormalTs(vec4<f32>(planeZ, 0.0, 0.0), strength) * vec3<f32>(1.0, -1.0, 1.0);
return sideShare.x * vec3<f32>(geoNormal.x * (x.z - 1.0), x.y, x.x) + sideShare.y * vec3<f32>(z.x, z.y, geoNormal.z * (z.z - 1.0));
}
fn terrain_luma(rgb: vec3<f32>) -> f32 {
return dot(rgb, vec3<f32>(0.2126, 0.7152, 0.0722));
}
fn terrain_albedoTexelAtMip(layerDdx: vec2<f32>, layerDdy: vec2<f32>, texSize: vec2<f32>) -> vec2<f32> {
let footprint = max(length(layerDdx * texSize), length(layerDdy * texSize));
let mip = floor(max(0.0, log2(max(footprint, 1e-6))));
return vec2<f32>(exp2(mip)) / texSize;
}
fn terrain_pixelEdgeUv(uv: vec2<f32>, ddx: vec2<f32>, ddy: vec2<f32>, texels: vec2<f32>, pixelEdge: f32) -> vec2<f32> {
if (pixelEdge < 0.5) { return uv; }
let at = uv * texels;
let seam = floor(at + 0.5);
let span = clamp(sqrt(ddx * ddx + ddy * ddy) * texels, vec2<f32>(1e-6), vec2<f32>(1.0));
return (seam + clamp((at - seam) / span, vec2<f32>(-0.5), vec2<f32>(0.5))) / texels;
}
fn terrain_albedoTexels(fine: vec2<f32>) -> vec2<f32> {
if (fine.x >= 1.0) { return vec2<f32>(textureDimensions(albedoFine, 0)); }
return vec2<f32>(textureDimensions(albedoArray, 0));
}
fn terrain_albedoGrad(uv: vec2<f32>, mainLayer: i32, fine: vec2<f32>, ddx: vec2<f32>, ddy: vec2<f32>) -> vec4<f32> {
if (fine.x >= 1.0) { return textureSampleGrad(albedoFine, atlasSampler, uv, i32(fine.x - 1.0), ddx, ddy); }
return textureSampleGrad(albedoArray, atlasSampler, uv, mainLayer, ddx, ddy);
}
fn terrain_albedoLevel(uv: vec2<f32>, mainLayer: i32, fine: vec2<f32>, lod: f32) -> vec4<f32> {
if (fine.x >= 1.0) { return textureSampleLevel(albedoFine, atlasSampler, uv, i32(fine.x - 1.0), lod); }
return textureSampleLevel(albedoArray, atlasSampler, uv, mainLayer, lod);
}
fn terrain_nroTexels(nfine: vec2<f32>) -> vec2<f32> {
if (nfine.x >= 1.0) { return vec2<f32>(textureDimensions(nroFine, 0)); }
return vec2<f32>(textureDimensions(nroArray, 0));
}
fn terrain_nroGrad(uv: vec2<f32>, mainLayer: i32, nfine: vec2<f32>, ddx: vec2<f32>, ddy: vec2<f32>) -> vec4<f32> {
if (nfine.x >= 1.0) { return textureSampleGrad(nroFine, atlasSampler, uv, i32(nfine.x - 1.0), ddx, ddy); }
return textureSampleGrad(nroArray, atlasSampler, uv, mainLayer, ddx, ddy);
}
fn patina_packedHeight(albedoHeightSample: vec4<f32>) -> f32 {
return albedoHeightSample.a;
}
fn patina_packedNormalTs(nroSample: vec4<f32>, strength: f32) -> vec3<f32> {
let normalXy = (nroSample.rg * 2.0 - 1.0) * strength;
let normalZ = sqrt(max(1e-4, 1.0 - clamp(dot(normalXy, normalXy), 0.0, 1.0)));
return vec3<f32>(normalXy, normalZ);
}
fn patina_packedRoughness(nroSample: vec4<f32>) -> f32 {
return nroSample.b;
}
fn stochastic_hash2(p: vec2f, seed: f32) -> f32 {
return fract(sin(dot(p, vec2f(127.1, 311.7)) + seed) * 43758.5453);
}
struct StochasticTileSample {
offsetA: vec2f,
offsetB: vec2f,
offsetC: vec2f,
weights: vec3f,
}
fn stochastic_offsetFor(corner: vec2f, instanceSeed: f32) -> vec2f {
let seeded = corner + vec2f(instanceSeed);
return vec2f(stochastic_hash2(seeded, 17.0), stochastic_hash2(seeded, 31.0));
}
fn stochastic_keepContrast(blend: vec4f, mean: vec4f, weights: vec3f) -> vec4f {
return clamp(mean + (blend - mean) * inverseSqrt(max(dot(weights, weights), 1e-6)), vec4f(0.0), vec4f(1.0));
}
fn terrain_tilePhase(origin: vec2<f32>, repeatsPerMetre: f32) -> vec2<f32> {
let high = bitcast<f32>(bitcast<u32>(repeatsPerMetre) & 0xfffff000u);
return fract(fract(origin * high) + origin * (repeatsPerMetre - high));
}
struct TerrainLayerSurface {
color: vec3<f32>,
height: f32,
heightPacked: f32,
normalTs: vec3<f32>,
roughness: f32,
metalness: f32,
emissive: vec3<f32>,
sideRelief: vec3<f32>,
}
fn terrain_layerSurface(layerIndex: u32, baseUv: vec2<f32>, tileOrigin: vec2<f32>, uvDdx: vec2<f32>, uvDdy: vec2<f32>, worldPos: vec3<f32>, heightNorm: f32, worldDdx: vec3<f32>, worldDdy: vec3<f32>, sideWeight: f32, sideShare: vec2<f32>, geoNormal: vec3<f32>, includeNro: bool, deriveNormal: bool, stopNoise: f32, meanResponse: bool) -> TerrainLayerSurface {
var surface: TerrainLayerSurface;
surface.color = vec3<f32>(0.0);
surface.height = 0.5;
surface.heightPacked = 0.0;
surface.normalTs = vec3<f32>(0.0, 0.0, 1.0);
surface.roughness = 1.0;
surface.metalness = 0.0;
surface.emissive = vec3<f32>(0.0);
surface.sideRelief = vec3<f32>(0.0);
let shading = u32(pool.shading);
let tier = shading & 3u;
let pbr = (shading & 4u) != 0u;
let carve = (shading & 512u) != 0u;
let biplanar = (shading & 256u) != 0u;
let layerType = terrain_paramsRow(layerIndex, 0u).x;
if (layerType < 0.5) {
let top = sideWeight < 1.0;
let side = biplanar && sideWeight > 1e-3;
let stochastic = tier < 2u && u32(terrain_paramsRow(layerIndex, 13u).y) == 1u;
let antiTiling = top && stochastic;
let sideJitter = side && stochastic;
let nroOn = includeNro && terrain_paramsRow(layerIndex, 11u).x >= 0.0;
let derive = top && !nroOn && deriveNormal;
let fineRow = terrain_paramsRow(layerIndex, 16u).xy;
let albedoTexels = terrain_albedoTexels(fineRow);
let nroFineRow = terrain_paramsRow(layerIndex, 17u).xy;
let pixelEdge = terrain_paramsRow(layerIndex, 17u).z;
let nroTexels = terrain_nroTexels(nroFineRow);
var topAlbedo = vec4<f32>(0.0);
var topNro = vec3<f32>(0.0);
var sideAlbedo = vec4<f32>(0.0);
var sideRough = 0.0;
var sideNroX = vec2<f32>(0.0);
var sideNroZ = vec2<f32>(0.0);
var lumaCentre = 0.0;
var lumaU = 0.0;
var lumaV = 0.0;
var jitterFirst = 0.0;
for (var t = 0u; t < groundDraw.twelve; t++) {
let isTop = t < 3u;
let isSide = t >= 6u;
let isDerive = !isTop && !isSide;
let acrossZ = t < 9u;
let k = select(t, select(t - 9u, t - 6u, acrossZ), isSide);
let planeShare = select(sideShare.y, sideShare.x, acrossZ);
var on = false;
if (isTop) { on = top && (t == 0u || antiTiling); }
else if (isDerive) { on = derive && (t != 3u || antiTiling); }
else { on = side && planeShare > 0.0 && (k == 0u || sideJitter); }
if (!on) { continue; }
let mainRow = terrain_paramsRow(layerIndex, 0u);
let uvScale = mainRow.z;
let lodFloor = terrain_paramsRow(layerIndex, 15u).xy;
let albedoLodFloor = select(lodFloor.x, fineRow.y, fineRow.x >= 1.0);
let layerUv = terrain_tilePhase(tileOrigin, uvScale) + baseUv * uvScale;
let layerDdx = uvDdx * uvScale;
let layerDdy = uvDdy * uvScale;
var uv = layerUv;
var gx = layerDdx;
var gy = layerDdy;
var w = 1.0;
let across = select(worldPos.x, worldPos.z, acrossZ);
if (isSide) {
let acrossDdx = select(worldDdx.x, worldDdx.z, acrossZ);
let acrossDdy = select(worldDdy.x, worldDdy.z, acrossZ);
uv = vec2<f32>(across, worldPos.y) * uvScale;
gx = vec2<f32>(acrossDdx, worldDdx.y) * uvScale;
gy = vec2<f32>(acrossDdy, worldDdy.y) * uvScale;
}
let jit = (isTop && antiTiling) || (isSide && sideJitter);
var weights = vec3<f32>(0.0);
if (jit) {
let cellSpace = (select(worldPos.xz, vec2<f32>(across, worldPos.y), isSide) * uvScale) / 0.50;
let cellBase = floor(cellSpace);
let cellLocal = fract(cellSpace);
let upper = step(1.0, cellLocal.x + cellLocal.y);
let weightA = upper * (cellLocal.x + cellLocal.y - 1.0) + (1.0 - upper) * (1.0 - cellLocal.x - cellLocal.y);
let weightB = upper * (1.0 - cellLocal.y) + (1.0 - upper) * cellLocal.x;
let weightC = 1.0 - weightA - weightB;
let sharpA = pow(weightA, 8.0);
let sharpB = pow(weightB, 8.0);
let sharpC = pow(weightC, 8.0);
let total = max(sharpA + sharpB + sharpC, 1e-6);
weights = vec3<f32>(sharpA, sharpB, sharpC) / total;
w = terrain_f3(weights, k);
jitterFirst = weights.x;
let corner = select(select(cellBase + vec2f(0.0, 1.0), cellBase + vec2f(1.0, 0.0), k == 1u), cellBase + vec2f(upper, upper), k == 0u);
uv = uv + stochastic_offsetFor(corner, f32(layerIndex) * 13.0);
} else if (t == 4u || t == 5u) {
let texel = terrain_albedoTexelAtMip(layerDdx * terrain_floorGradScale(layerDdx, layerDdy, albedoTexels, albedoLodFloor), layerDdy * terrain_floorGradScale(layerDdx, layerDdy, albedoTexels, albedoLodFloor), albedoTexels);
uv = layerUv + select(vec2<f32>(0.0, texel.y), vec2<f32>(texel.x, 0.0), t == 4u);
}
let albedoFloor = terrain_floorGradScale(gx, gy, albedoTexels, albedoLodFloor);
var a = terrain_albedoGrad(terrain_pixelEdgeUv(uv, gx, gy, albedoTexels, pixelEdge), i32(max(mainRow.y, 0.0)), fineRow, gx * albedoFloor, gy * albedoFloor);
if (jit) { a = stochastic_keepContrast(a, terrain_albedoLevel(uv, i32(max(mainRow.y, 0.0)), fineRow, 32.0), weights); }
var n = vec3<f32>(0.0);
if (nroOn && (isTop || pbr)) {
let nroFloor = terrain_floorGradScale(gx, gy, nroTexels, select(lodFloor.y, nroFineRow.y, nroFineRow.x >= 1.0));
n = terrain_nroGrad(terrain_pixelEdgeUv(uv, gx, gy, nroTexels, pixelEdge), i32(max(terrain_paramsRow(layerIndex, 11u).x, 0.0)), nroFineRow, gx * nroFloor, gy * nroFloor).xyz;
}
if (isTop) {
if (!antiTiling || t == 0u) { topAlbedo = a; topNro = n; }
else if (t == 1u) { topAlbedo = topAlbedo * jitterFirst + a * w; topNro = topNro * jitterFirst + n * w; }
else { topAlbedo = topAlbedo + a * w; topNro = topNro + n * w; }
} else if (isSide) {
let share = w * planeShare;
sideAlbedo += a * share;
sideRough += n.z * share;
if (acrossZ) { sideNroX += n.xy * w; } else { sideNroZ += n.xy * w; }
} else {
let luma = terrain_luma(a.rgb);
if (t == 3u) { lumaCentre = luma; } else if (t == 4u) { lumaU = luma; } else { lumaV = luma; }
}
}
let mainRow = terrain_paramsRow(layerIndex, 0u);
let uvScale = mainRow.z;
let tintRow = terrain_paramsRow(layerIndex, 1u);
let tintFold = terrain_paramsRow(layerIndex, 14u).xyz;
let pbrRow = terrain_paramsRow(layerIndex, 11u);
let pbr2Row = terrain_paramsRow(layerIndex, 13u);
var nroShift = vec2<f32>(0.0);
if (nroOn && terrain_paramsRow(layerIndex, 16u).z >= 0.5) { nroShift = terrain_paramsRow(layerIndex, 19u).rg - vec2<f32>(0.5); }
if (meanResponse && !nroOn && pbrRow.x >= 0.0) { surface.roughness = terrain_patinaRoughness(patina_packedRoughness(terrain_paramsRow(layerIndex, 19u)), pbr2Row.x); }
var meanSample = vec4<f32>(0.0);
if (carve && pbrRow.w <= 0.5 && (top || side)) {
meanSample = textureSampleLevel(albedoArray, atlasSampler, terrain_tilePhase(tileOrigin, uvScale) + baseUv * uvScale, i32(max(mainRow.y, 0.0)), 32.0);
}
if (top) {
surface.color = terrain_applyTintFold(topAlbedo.rgb, tintRow.rgb, tintFold);
if (carve) {
if (pbrRow.w > 0.5) {
surface.height = patina_packedHeight(topAlbedo);
surface.heightPacked = 1.0;
} else {
surface.height = clamp(0.5 + (terrain_luma(topAlbedo.rgb) - terrain_luma(meanSample.rgb)) * 2.00, 0.0, 1.0);
}
}
if (nroOn) {
surface.normalTs = patina_packedNormalTs(vec4<f32>(topNro.xy - nroShift, topNro.z, 0.0), pbrRow.y) * vec3<f32>(1.0, -1.0, 1.0);
surface.roughness = terrain_patinaRoughness(topNro.z, pbr2Row.x);
} else if (derive) {
if (!antiTiling) { lumaCentre = terrain_luma(topAlbedo.rgb); }
surface.normalTs = normalize(vec3<f32>(-(lumaU - lumaCentre) * 2.00, -(lumaV - lumaCentre) * 2.00, 1.0));
}
}
if (side) {
surface.color = mix(surface.color, terrain_applyTintFold(sideAlbedo.rgb, tintRow.rgb, tintFold), sideWeight);
surface.normalTs = mix(surface.normalTs, vec3<f32>(0.0, 0.0, 1.0), sideWeight);
if (carve) {
var sideHeight = 0.5;
if (pbrRow.w > 0.5) {
sideHeight = patina_packedHeight(sideAlbedo);
surface.heightPacked = 1.0;
} else {
sideHeight = clamp(0.5 + (terrain_luma(sideAlbedo.rgb) - terrain_luma(meanSample.rgb)) * 2.00, 0.0, 1.0);
}
surface.height = mix(surface.height, sideHeight, sideWeight);
}
if (pbr && nroOn) {
surface.roughness = mix(surface.roughness, terrain_patinaRoughness(sideRough, pbr2Row.x), sideWeight);
surface.sideRelief = terrain_sideRelief(sideNroX - nroShift, sideNroZ - nroShift, pbrRow.y, sideShare, geoNormal) * sideWeight;
}
}
let lodFloorRow = terrain_paramsRow(layerIndex, 15u);
surface.color = mix(surface.color, terrain_preJoinColor(lodFloorRow.w, tintRow.rgb, tintFold), lodFloorRow.z);
} else if (layerType < 1.5) {
let lodFloorRow = terrain_paramsRow(layerIndex, 15u);
surface.color = terrain_preJoinColor(lodFloorRow.w, terrain_paramsRow(layerIndex, 1u).rgb, terrain_paramsRow(layerIndex, 14u).xyz);
} else {
surface.color = terrain_paramsRow(layerIndex, 1u).rgb;
}
let tintRow = terrain_paramsRow(layerIndex, 1u);
let aux = terrain_paramsRow(layerIndex, 2u);
let baseStops = layerType >= 1.5 && (((shading & 32u) != 0u) || ((shading & 64u) != 0u));
let tintStops = ((shading & 128u) != 0u) && tintRow.a > 0.0;
for (var stopPass = select(1u, 0u, baseStops); stopPass < select(1u, 2u, tintStops); stopPass++) {
var t = heightNorm;
if (stopPass == 0u && (shading & 32u) != 0u && layerType < 2.5) {
t = stopNoise;
}
let first = select(7u, 3u, stopPass == 0u);
let stopCount = select(aux.w, aux.z, stopPass == 0u);
var stop = terrain_paramsRow(layerIndex, first);
var color = stop.rgb;
for (var k = 1u; k < groundDraw.bounds.x; k++) {
let next = terrain_paramsRow(layerIndex, first + k);
color = mix(color, next.rgb, smoothstep(stop.a, max(next.a, stop.a + 1e-4), t) * f32(stopCount > f32(k) + 0.5));
stop = next;
}
if (stopPass == 0u) { surface.color = color; } else { surface.color = terrain_applyTint(surface.color, color, tintRow.a); }
}
return surface;
}
fn terrain_f3(v: vec3<f32>, i: u32) -> f32 { return select(select(v.z, v.y, i == 1u), v.x, i == 0u); }
fn terrain_u3(v: vec3<u32>, i: u32) -> u32 { return select(select(v.z, v.y, i == 1u), v.x, i == 0u); }
fn terrain_u4(v: vec4<u32>, i: u32) -> u32 { return select(select(select(v.w, v.z, i == 2u), v.y, i == 1u), v.x, i == 0u); }
fn terrain_f4(v: vec4<f32>, i: u32) -> f32 { return select(select(select(v.w, v.z, i == 2u), v.y, i == 1u), v.x, i == 0u); }
struct TerrainEntry { index: u32, weight: f32, }
fn terrain_entry(k: u32, words: vec4<u32>, bilinear: vec4<f32>) -> TerrainEntry {
let corner = k / 3u;
let slot = k - corner * 3u;
let word = terrain_u4(words, corner);
return TerrainEntry(terrain_wordLayers(word)[slot], f32(terrain_wordQuanta(word)[slot]) / 127.0 * terrain_f4(bilinear, corner));
}
const TERRAIN_YIELD_SINK_M: f32 = 10000.0;
fn terrain_yieldCellGone(block: u32, side: u32, cells: u32, origin: vec2<u32>, last: u32, x: i32, z: i32) -> bool {
if (x < 0 || z < 0 || u32(x) >= last || u32(z) >= last) { return true; }
let cell = origin + vec2<u32>(u32(x), u32(z));
if (cell.x >= cells || cell.y >= cells) { return true; }
let chunk = (cell * side) / cells;
let bit = chunk.y * side + chunk.x;
return ((u32(bitcast<f32>(heights[block + 16u + bit / 16u])) >> (bit % 16u)) & 1u) != 0u;
}
fn terrain_yieldBlock(slot: u32, side: u32) -> u32 {
return u32(pool.yieldWord) + slot * (16u + (side * side + 15u) / 16u);
}
fn terrain_patchYields(survivor: u32) -> bool {
let side = u32(pool.yieldSide);
return side != 0u && bitcast<f32>(heights[terrain_yieldBlock(min(survivor / 16u, u32(pool.maxSlot)), side) + survivor % 16u]) < 0.0;
}
fn terrain_yieldSunk(slot: u32, patchIndex: u32, origin: vec2<u32>, last: u32, at: vec2<u32>, stride: u32) -> bool {
let side = u32(pool.yieldSide);
if (side == 0u) { return false; }
let cells = u32(pool.resolution) - 1u;
let block = terrain_yieldBlock(slot, side);
let whole = bitcast<f32>(heights[block + patchIndex]);
if (whole < 0.0) { return true; }
if (whole == 0.0 || stride != 1u) { return false; }
let x = i32(at.x);
let z = i32(at.y);
return terrain_yieldCellGone(block, side, cells, origin, last, x - 1, z - 1) && terrain_yieldCellGone(block, side, cells, origin, last, x, z - 1) && terrain_yieldCellGone(block, side, cells, origin, last, x - 1, z) && terrain_yieldCellGone(block, side, cells, origin, last, x, z);
}
struct VsOut {
@builtin(position) @invariant position: vec4<f32>,
@location(0) worldPos: vec3<f32>,
@location(1) uvMeters: vec2<f32>,
@location(2) @interpolate(flat) tileOrigin: vec2<f32>,
@location(3) @interpolate(flat) slot: u32,
@location(4) viewZ: f32,
@location(5) normalLocal: vec3<f32>,
@location(6) heightNorm: f32,
@location(12) drawnHeight: f32,
@location(13) groundBend: f32,
}
@vertex
`,`let lumeSurvivorCulled = survivorSlot == 4294967295u;
if (lumeSurvivorCulled) {
var lumeCulledOut: VsOut;
lumeCulledOut.position = vec4<f32>(2.0, 2.0, 2.0, 1.0);
return lumeCulledOut;
}
let tileChunkForm = (survivorSlot & 2147483648u) != 0u;
let tileSlot = survivorSlot & ~2147483648u;
let tileLast = u32(pool.resolution) - 1u;
let tileCells = (tileLast + 3u) / 4u;
let patchLast = select(tileCells, tileLast, tileChunkForm);
let tilePatch = tileSlot % 16u;
let tilePatchAt = vec2<u32>(tilePatch % 4u, tilePatch / 4u);
let tilePatchOrigin = select(tilePatchAt * tileCells, vec2<u32>(0u), tileChunkForm);
var ringLocal = vertexIndex;
var ringStride = patchLast;
var ringN = 2u;
var ringLevel = true;
for (var r = 0u; r < 5u; r++) {
let stride = 1u << r;
let n = (tileCells + stride - 1u) / stride + 1u;
let span = n * n + 4u * n;
if (ringLocal < span) { ringStride = stride; ringN = n; ringLevel = false; break; }
ringLocal -= span;
}
let tileGridCount = ringN * ringN;
var tileGx = 0u;
var tileGz = 0u;
var skirt = 0.0;
var skirtAlong = vec2<i32>(0, 0);
var skirtOut = vec2<f32>(0.0, 0.0);
if (ringLocal < tileGridCount) {
let cellFolds = tileChunkForm && tilePatch != 0u;
tileGx = select(min((ringLocal % ringN) * ringStride, patchLast), 0u, cellFolds);
tileGz = select(min((ringLocal / ringN) * ringStride, patchLast), 0u, cellFolds);
} else {
let s = ringLocal - tileGridCount;
var edge = s / ringN;
var p = min((s % ringN) * ringStride, patchLast);
let ringSides = tilePatchAt.x % 3u == 0u;
let ringBandX = (edge < 2u) == ringSides;
let ringTurns = select(tilePatchAt.y, tilePatchAt.x, ringBandX) == 3u;
skirt = select(1.0, 0.0, ringLevel && (edge & 1u) == 0u);
edge = select(edge, select(2u, 0u, ringBandX) + u32(ringTurns), ringLevel);
p = select(p, patchLast - p, ringLevel && (ringTurns != !ringSides));
let alongZ = edge < 2u;
let across = select(0u, patchLast, (edge & 1u) == 1u);
tileGx = select(p, across, alongZ);
tileGz = select(across, p, alongZ);
skirtAlong = vec2<i32>(i32(!alongZ), i32(alongZ));
let out = f32(edge & 1u) * 2.0 - 1.0;
skirtOut = select(vec2<f32>(0.0, out), vec2<f32>(out, 0.0), alongZ);
}
let tileLattice = vec2<u32>(tileGx, tileGz);
let tileStitch = terrain_seamStitch(tileSlot, tilePatch, vec2<u32>(tileGx, tileGz), patchLast, ringStride);
tileGx = tileStitch.x;
tileGz = tileStitch.y;
tileGx = min(tileGx + tilePatchOrigin.x, tileLast);
tileGz = min(tileGz + tilePatchOrigin.y, tileLast);
let position = vec3<f32>(f32(tileGx) * pool.spacing, 0.0, f32(tileGz) * pool.spacing);
let uv = position.xz;
var out: VsOut;
let slot = min(tileSlot / 16u, u32(pool.maxSlot));
let transform = terrain_slotTransform(slot);
let slotOrigin = slotOrigins[slot * 3u];
let slotSides = slotOrigins[slot * 3u + 1u];
let gridX = i32(round(uv.x / pool.spacing));
let gridZ = i32(round(uv.y / pool.spacing));
let heightTile = terrain_heightTexel_tile(slot);
let height = terrain_heightTexel(heightTile, gridX + 1, gridZ + 1);
let arrival = terrain_arrival(slotOrigin.zw);
let drawnHeight = terrain_drawnHeight(slot, gridX, gridZ, height, transform, uv, slotOrigin.zw, arrival);
var groundY = drawnHeight;
if (skirt > 0.5 && terrain_skirtFaces(transform, skirtOut, uv) && !terrain_seamFlush(tileSlot, tilePatch, gridX, gridZ, skirtOut)) { groundY = terrain_skirtY(slot, gridX, gridZ, skirtAlong, drawnHeight, slotOrigin, slotSides, transform, uv, ringStride, arrival); }
if (terrain_yieldSunk(slot, tilePatch, tilePatchOrigin, patchLast, tileLattice, ringStride)) { groundY -= TERRAIN_YIELD_SINK_M; }
out.drawnHeight = groundY;
let localY = groundY - slotOrigin.x - TERRAIN_SURFACE_DRAW_DROP;
let worldPos = (transform * vec4<f32>(position.x, localY, position.z, 1.0)).xyz;
out.worldPos = worldPos;
out.uvMeters = uv;
out.tileOrigin = lume_worldFromRender(transform[3].xyz).xz;
out.slot = slot;
let viewPos = frame.view * vec4<f32>(worldPos, 1.0);
out.viewZ = -viewPos.z;
out.position = frame.viewProj * vec4<f32>(worldPos, 1.0);
if (abs(out.position.w) < 0.5 * out.position.z) { out.position.w = 0.5 * out.position.z; }
let hL = terrain_heightTexel(heightTile, gridX, gridZ + 1);
let hR = terrain_heightTexel(heightTile, gridX + 2, gridZ + 1);
let hD = terrain_heightTexel(heightTile, gridX + 1, gridZ);
let hU = terrain_heightTexel(heightTile, gridX + 1, gridZ + 2);
let dx = (hR - hL) / (pool.spacing * 2.0);
let dz = (hU - hD) / (pool.spacing * 2.0);
out.normalLocal = normalize(vec3<f32>(-dx, 1.0, -dz));
if (arrival.x < 1.0) { out.normalLocal = normalize(mix(terrain_scaleNormal(heightTile, gridX, gridZ, i32(arrival.y)), out.normalLocal, arrival.x)); }
out.heightNorm = clamp((height - pool.verticalMin) * pool.verticalRangeInv, 0.0, 1.0);
out.groundBend = max(abs(hL + hR - 2.0 * height), abs(hD + hU - 2.0 * height)) / (pool.spacing * pool.spacing);
return out;
}
@diagnostic(off, derivative_uniformity) @fragment
fn fs(in: VsOut) -> LumeSurfaceOut {
let shading = u32(pool.shading);
let tier = shading & 3u;
let pbr = (shading & 4u) != 0u;
let carve = (shading & 512u) != 0u;
let detail = (shading & 8u) != 0u;
let biplanar = (shading & 256u) != 0u;
let candidateCount = 2u;
let sharpen = tier < 2u && (carve || tier == 0u);
let shadesNormals = tier < 2u && (pbr || detail);
let nroTaps = pbr && tier < 2u;
let derivesNormal = detail && tier < 2u;
let drifts = (shading >> 16u) & 3u;
let texelF = in.uvMeters / pool.chunkWorldSize * (pool.resolution - 1.0) + vec2<f32>(1.5);
let baseUv = in.uvMeters / pool.chunkWorldSize;
let baseUvMeters = in.uvMeters;
let uvDdx = dpdx(baseUvMeters);
let uvDdy = dpdy(baseUvMeters);
let worldPos = lume_worldFromRender(in.worldPos);
let worldDdx = dpdx(in.worldPos);
let worldDdy = dpdy(in.worldPos);
let noiseFootprint = max(length(worldDdx.xz), length(worldDdy.xz));
if (terrainFogWhole) {
let fog = f32(!(shade_fogFactor(in.viewZ * 0.99, (in.worldPos.y - frame.cameraPosition.y) * 0.99) >= 1.0));
let fogRow = max(fog, abs(dpdxFine(fog)));
if (max(fogRow, abs(dpdyFine(fogRow))) == 0.0) {
lume_surfacePoint = in.worldPos;
return lume_surfaceOut(vec3<f32>(0.0, 1.0, 0.0), pool.fallbackColor, 1.0, 0.0, 1.0, vec3<f32>(0.0));
}
}
let normalLocal = normalize(in.normalLocal);
let heightNorm = in.heightNorm;
let groundBend = in.groundBend;
let tile = terrain_heightTexel_tile(in.slot);
let texelB = in.uvMeters / pool.chunkWorldSize * (pool.blendResolution - 1.0) + vec2<f32>(1.5);
let gatherOrigin = floor(texelB - vec2<f32>(0.5));
let gatherFrac = texelB - vec2<f32>(0.5) - gatherOrigin;
var bilinear = vec4<f32>(
(1.0 - gatherFrac.x) * (1.0 - gatherFrac.y),
gatherFrac.x * (1.0 - gatherFrac.y),
(1.0 - gatherFrac.x) * gatherFrac.y,
gatherFrac.x * gatherFrac.y);
var gx = i32(gatherOrigin.x);
var gz = i32(gatherOrigin.y);
var sideWeight = 0.0;
var sideShare = vec2<f32>(0.0);
if (biplanar) {
let drawnCross = cross(worldDdx, worldDdy);
let drawnLength = length(drawnCross);
var drawnNormal = abs(normalLocal);
if (drawnLength > 0.0) { drawnNormal = abs(drawnCross) / drawnLength; }
if (abs(normalLocal.y) < 0.8 || drawnNormal.y < 0.55) {
let keptShares = terrain_projectionShares(normalLocal) * smoothstep(vec3<f32>(0.30), vec3<f32>(0.55), drawnNormal.yxz);
let projectionShares = keptShares + (1.0 - keptShares.x - keptShares.y - keptShares.z) * terrain_projectionShares(drawnNormal);
sideWeight = 1.0 - projectionShares.x;
sideShare = projectionShares.yz / max(projectionShares.y + projectionShares.z, 1e-6);
if (sideWeight > 0.0) {
var cornerHeights = terrain_wordCornerHeights(tile, gx, gz);
var footHeight = min(min(cornerHeights.x, cornerHeights.y), min(cornerHeights.z, cornerHeights.w));
var faceWeight = sideWeight;
let wordStep = terrain_wordStep();
if (footHeight > in.drawnHeight + 0.5 * pool.spacing && wordStep == 1) {
let low = (vec2<i32>(gx, gz) - vec2<i32>(1)) / 4 * 4 + vec2<i32>(1);
let high = min(low + vec2<i32>(4), vec2<i32>(i32(pool.resolution)));
let coarseHeights = vec4<f32>(terrain_heightTexel(tile, low.x, low.y), terrain_heightTexel(tile, high.x, low.y), terrain_heightTexel(tile, low.x, high.y), terrain_heightTexel(tile, high.x, high.y));
let coarseFoot = min(min(coarseHeights.x, coarseHeights.y), min(coarseHeights.z, coarseHeights.w));
if (coarseFoot < footHeight) {
let foot = select(select(select(high, vec2<i32>(low.x, high.y), coarseHeights.z == coarseFoot), vec2<i32>(high.x, low.y), coarseHeights.y == coarseFoot), low, coarseHeights.x == coarseFoot);
gx = select(foot.x, foot.x - 1, foot.x > gx);
gz = select(foot.y, foot.y - 1, foot.y > gz);
cornerHeights = vec4<f32>(terrain_heightTexel(tile, gx, gz), terrain_heightTexel(tile, gx + 1, gz), terrain_heightTexel(tile, gx, gz + 1), terrain_heightTexel(tile, gx + 1, gz + 1));
footHeight = coarseFoot;
bilinear = vec4<f32>(0.25);
faceWeight = 1.0;
}
}
let held = bilinear * exp2(-max(cornerHeights - vec4<f32>(in.drawnHeight), vec4<f32>(0.0)) * f32(wordStep) / pool.spacing);
let footMask = select(vec4<f32>(0.0), vec4<f32>(1.0), cornerHeights == vec4<f32>(footHeight));
bilinear = mix(bilinear, held + (1.0 - held.x - held.y - held.z - held.w) * footMask / (footMask.x + footMask.y + footMask.z + footMask.w), faceWeight);
}
}
}
let noisePlanes = terrain_noiseShares(sideWeight, sideShare);
let planeFirst = select(0u, 1u, noisePlanes.x <= 0.0);
let planeFootprint = select(noiseFootprint, max(length(worldDdx), length(worldDdy)), noisePlanes.x < 1.0);
let wordCol0 = terrain_blendCol(gx);
let wordCol1 = terrain_blendCol(gx + 1);
let wordRow0 = terrain_blendRow(gz);
let wordRow1 = terrain_blendRow(gz + 1);
let wordEntry = terrain_blendEntry(in.slot);
let word00 = terrain_blendCodedWord(wordEntry, wordRow0 + wordCol0);
let word10 = terrain_blendCodedWord(wordEntry, wordRow0 + wordCol1);
let word01 = terrain_blendCodedWord(wordEntry, wordRow1 + wordCol0);
let word11 = terrain_blendCodedWord(wordEntry, wordRow1 + wordCol1);
let words = vec4<u32>(word00, word10, word01, word11);
let oneWord = words.x == words.y && words.x == words.z && words.x == words.w;
var pick = vec3<u32>(0u);
var pickW = vec3<f32>(0.0);
let oneLayers = terrain_wordLayers(words.x);
let oneWeights = vec3<f32>(terrain_wordQuanta(words.x)) / 127.0;
let corners = groundDraw.twelve / groundDraw.three;
for (var i = 0u; i < select(groundDraw.twelve, groundDraw.three, oneWord); i++) {
var index = 0u;
var total = 0.0;
if (oneWord) {
index = terrain_u3(oneLayers, i);
let same = select(vec3<f32>(0.0), vec3<f32>(1.0), oneLayers == vec3<u32>(index));
for (var c = 0u; c < corners; c++) {
let share = terrain_f4(bilinear, c);
total += oneWeights.x * share * same.x;
total += oneWeights.y * share * same.y;
total += oneWeights.z * share * same.z;
}
} else {
index = terrain_entry(i, words, bilinear).index;
for (var j = 0u; j < groundDraw.twelve; j++) {
let ej = terrain_entry(j, words, bilinear);
total += ej.weight * f32(ej.index == index);
}
}
if ((pick.x == index && pickW.x > 0.0) || (pick.y == index && pickW.y > 0.0) || (pick.z == index && pickW.z > 0.0)) { continue; }
if (total > pickW.x) {
pick = vec3<u32>(index, pick.xy); pickW = vec3<f32>(total, pickW.xy);
} else if (total > pickW.y) {
pick = vec3<u32>(pick.x, index, pick.y); pickW = vec3<f32>(pickW.x, total, pickW.y);
} else if (total > pickW.z) {
pick.z = index; pickW.z = total;
}
}
var pickWord = 0u;
for (var c = 0u; c < candidateCount; c++) { pickWord = pickWord | (terrain_u3(pick, c) << (8u * c)); }
var rawWeightSum = 0.0;
var squareSum = 0.0;
for (var c = 0u; c < candidateCount; c++) {
let pw = terrain_f3(pickW, c);
rawWeightSum += pw;
squareSum += pw * pw;
}
let normalizedWeightSum = max(rawWeightSum, 1e-5);
let squareSumInv = 1.0 / max(squareSum, 1e-10);
var macroVariation = 1.0;
var maxAdjusted = -1.0;
var blendWidth = 0.0;
var grainShare = 0.0;
var colorSum = vec3<f32>(0.0);
var weightSum = 0.0;
var normalSum = vec3<f32>(0.0);
var sideReliefSum = vec3<f32>(0.0);
var roughnessSum = 0.0;
var metalnessSum = 0.0;
var emissiveSum = vec3<f32>(0.0);
let creaseTell = select(0.0, smoothstep(0.08, 0.4, groundBend), sharpen && !carve);
let first = select(candidateCount, 0u, sharpen);
let ditherFade = 1.0 - smoothstep(0.25, 0.75, noiseFootprint * 6.0);
for (var walk = first; walk < 2u * candidateCount; walk++) {
if (walk == candidateCount && sharpen) {
let aaWidth = max(fwidth(maxAdjusted), 1e-4);
if (carve) {
blendWidth = max(aaWidth, max(0.06, (1.0 - ditherFade) * 0.4 * grainShare));
} else {
blendWidth = aaWidth;
}
}
let whole = walk >= candidateCount;
let c = select(walk, walk - candidateCount, whole);
let index = terrain_layerOf(in.slot, (pickWord >> (8u * c)) & 0x3fu);
let weight = terrain_f3(pickW, c);
let live = weight > 0.0;
let mainRow = terrain_paramsRow(index, 0u);
let aux = terrain_paramsRow(index, 2u);
let macroScale = terrain_macroScaleOf(index);
let mvJobs = select(0u, select(1u, groundDraw.three - 1u, tier == 0u), walk == first && sharpen);
let ditherJobs = select(0u, 1u, live && sharpen);
let macroJobs = select(0u, 3u, live && whole && drifts >= 2u);
let stopJobs = select(0u, groundDraw.three, live && whole && mainRow.x >= 1.5 && mainRow.x < 2.5 && (shading & 32u) != 0u);
let macroFootprint = planeFootprint * 5.0;
var mvValue = 0.0;
var layerNoise = 0.0;
var macroN = vec3<f32>(0.0);
var stopValue = 0.0;
for (var j = 0u; j < mvJobs + ditherJobs + macroJobs + stopJobs; j++) {
let isMv = j < mvJobs;
let isDither = !isMv && j < mvJobs + ditherJobs;
let isMacro = !isMv && !isDither && j < mvJobs + ditherJobs + macroJobs;
let k = select(select(select(j - mvJobs - ditherJobs - macroJobs, j - mvJobs - ditherJobs, isMacro), 0u, isDither), j, isMv);
let frequency = ldexp(1.0, i32(k));
let amplitude = ldexp(0.5, -i32(k));
var v = 0.0;
let topAlone = isDither || isMacro || noisePlanes.x >= 1.0;
for (var plane = select(planeFirst, 0u, topAlone); plane < select(3u, 1u, topAlone); plane++) {
let share = select(terrain_noiseShare(noisePlanes, plane), 1.0, topAlone);
if (share > 0.0) { v += share * terrain_jobNoise(terrain_noisePlane(worldPos, plane), k, frequency, isDither, isMacro, isMv, macroScale, aux, index); }
}
if (isMv) {
if (tier == 0u) { mvValue += mix(0.5, v, 1.0 - smoothstep(0.25, 0.75, macroFootprint * frequency)) * amplitude; }
else { mvValue = mix(0.5, v, 1.0 - smoothstep(0.25, 0.75, macroFootprint)); }
} else if (isDither) { layerNoise = v; }
else if (isMacro) { macroN = select(macroN, vec3<f32>(v), vec3<u32>(k) == vec3<u32>(0u, 1u, 2u)); }
else { stopValue += v * amplitude; }
}
if (mvJobs > 0u) {
macroVariation = mix(0.9299999999999999, 1.07, select(mvValue, clamp(mvValue, 0.0, 1.0), tier == 0u));
}
if (ditherJobs > 0u && !whole && !carve) {
let faceCarve = smoothstep(0.55, 0.8, normalLocal.y);
maxAdjusted = max(maxAdjusted, weight / normalizedWeightSum + (layerNoise - 0.5) * ditherFade * 0.4 * faceCarve);
}
if (live && (whole || carve)) {
var surface = terrain_layerSurface(index, baseUvMeters, in.tileOrigin, uvDdx, uvDdy, worldPos, heightNorm, worldDdx, worldDdy, sideWeight, sideShare, normalLocal, whole && nroTaps && (tier == 0u || c == 0u), whole && (derivesNormal || nroTaps) && c == 0u, clamp(stopValue, 0.0, 1.0), whole && pbr);
if (pbr) { surface.metalness = clamp(terrain_paramsRow(index, 11u).z, 0.0, 1.0); }
if ((shading & 16u) != 0u) { surface.emissive = terrain_paramsRow(index, 12u).rgb; }
if (drifts >= 2u) {
let macroNoise = vec2<f32>(macroN.x * 0.6667 + macroN.y * 0.3333, macroN.z);
let macroRow = terrain_paramsRow(index, 13u);
surface.color = terrain_applyMacroNoise(surface.color, macroNoise, macroRow.w, macroRow.z);
}
var adjusted = -1.0;
let heightInfluence = 1.0 - smoothstep(48.0, 96.0, in.viewZ * frame.lensDepth);
let faceCarve = smoothstep(0.55, 0.8, normalLocal.y);
let sharpness = select(ditherFade * (1.0 - creaseTell), heightInfluence, carve);
if (sharpen) {
let normalizedWeight = weight / normalizedWeightSum;
if (carve) {
let heightBias = clamp((surface.height - 0.5) * heightInfluence, -0.18, 0.18);
let undecided = select(1.0, 1.0 - abs(heightBias) / 0.18, surface.heightPacked > 0.5);
grainShare = max(grainShare, undecided);
adjusted = normalizedWeight + (heightBias + (layerNoise - 0.5) * ditherFade * 0.4 * undecided) * faceCarve;
} else {
adjusted = normalizedWeight + (layerNoise - 0.5) * ditherFade * 0.4 * faceCarve;
}
}
if (!whole) {
maxAdjusted = max(maxAdjusted, adjusted);
} else {
let farWeight = mix(weight * weight * squareSumInv, weight / normalizedWeightSum, creaseTell);
var resolvedWeight = farWeight;
if (sharpen) {
resolvedWeight = mix(farWeight, smoothstep(maxAdjusted - blendWidth, maxAdjusted, adjusted), sharpness);
}
colorSum += surface.color * resolvedWeight;
normalSum += surface.normalTs * resolvedWeight;
sideReliefSum += surface.sideRelief * resolvedWeight;
roughnessSum += surface.roughness * resolvedWeight;
metalnessSum += surface.metalness * resolvedWeight;
emissiveSum += surface.emissive * resolvedWeight;
weightSum += resolvedWeight;
}
} else if (!whole) {
maxAdjusted = max(maxAdjusted, -1.0);
}
}
let hasBlend = weightSum > 1e-5;
let resolvedInv = 1.0 / max(weightSum, 1e-5);
var mixed = colorSum * resolvedInv;
mixed *= macroVariation;
if (drifts == 1u) {
let firstLayer = terrain_layerOf(in.slot, pickWord & 0x3fu);
let driftRow = terrain_paramsRow(firstLayer, 13u);
mixed = terrain_applyMacroNoise(mixed, terrain_drift(worldPos.xz, terrain_macroScaleOf(firstLayer)), driftRow.w, driftRow.z);
}
var finalAlbedo = clamp(select(pool.fallbackColor, mixed * mix(0.9, 1.08, heightNorm), hasBlend), vec3<f32>(0.0), vec3<f32>(1.0));
let finalEmissive = select(vec3<f32>(0.0), emissiveSum * resolvedInv, hasBlend);
let finalNormalTs = select(vec3<f32>(0.0, 0.0, 1.0), normalize(normalSum * resolvedInv + vec3<f32>(0.0, 0.0, 1e-4)), hasBlend);
let finalSideRelief = select(vec3<f32>(0.0), sideReliefSum * resolvedInv, hasBlend);
let finalRoughness = clamp(select(1.0, roughnessSum * resolvedInv, hasBlend), 0.0, 1.0);
let finalMetalness = clamp(select(0.0, metalnessSum * resolvedInv, hasBlend), 0.0, 1.0);
var N = normalLocal;
var roughness = 1.0;
var metalness = 0.0;
if (pbr) {
roughness = clamp(finalRoughness, 0.4, 1.0);
metalness = finalMetalness;
}
if (shadesNormals) {
let detailFade = 1.0 - smoothstep(60.0, 140.0, in.viewZ * frame.lensDepth) * 0.65;
let detailTs = mix(vec3<f32>(0.0, 0.0, 1.0), finalNormalTs, detailFade);
let geoTs = vec3<f32>(normalLocal.x, normalLocal.z, normalLocal.y);
let combinedTs = vec3<f32>(geoTs.xy + detailTs.xy, max(geoTs.z * detailTs.z, 1e-4));
N = normalize(vec3<f32>(combinedTs.x, combinedTs.z, combinedTs.y) + finalSideRelief * detailFade);
}
let groundWet = passLights.groundWet;
if (groundWet > 0.0) {
let facesSky = clamp(N.y, 0.0, 1.0);
let soak = groundWet * facesSky;
let lowness = clamp(terrain_lowBilinear(tile, texelF) / 0.35, 0.0, 1.0);
let puddle = smoothstep(0.2, 0.8, lowness) * groundWet * groundWet * facesSky;
let dryAlbedo = finalAlbedo;
let soaked = finalAlbedo * (1.0 - 0.45 * soak);
finalAlbedo = soaked * (1.0 - 0.35 * puddle);
let film = mix(roughness, 0.3, soak);
let soakRoughness = select(film, wet_roughness(dryAlbedo, roughness, soaked, film), passLights.iblParams.x > 0.0);
roughness = mix(soakRoughness, 0.04, puddle);
N = normalize(mix(N, vec3<f32>(0.0, 1.0, 0.0), puddle));
}
lume_surfacePoint = in.worldPos;
return lume_surfaceOut(N, finalAlbedo, roughness, metalness, 1.0, finalEmissive);
}
`],GH={vertex:["",`fn vs(@builtin(vertex_index) vertexIndex: u32, @location(3) lumeSurvivorAttr: u32) -> VsOut {
let survivorSlot = lumeSurvivorAttr;
`],storage:[`@group(3) @binding(2) var<storage, read> lume_survivors: array<u32>;
`,`fn vs(@builtin(vertex_index) vertexIndex: u32, @builtin(instance_index) lumeSurvivorInstance: u32) -> VsOut {
let survivorSlot = lume_survivors[lumeSurvivorInstance];
`]},YH=((e)=>e.reduce(((e,t,r)=>e+t+cH[r+1]),cH[0]??"")),LPQ={vertex:YH(GH.vertex),storage:YH(GH.storage)};var cGn=`struct OcclusionView {
viewProj: mat4x4<f32>,
size: vec2<f32>,
slack: f32,
shift: u32,
levels: u32,
hides: u32,
drawCount: u32,
phase: u32,
level: array<vec4<u32>, 16>,
}
const OCC_READS_MOST = 128u;
const OCC_OUTSIDE = 0u;
const OCC_CROSSING = 1u;
const OCC_PROJECTED = 2u;
struct OccBox { state: u32, least: vec2<f32>, most: vec2<f32>, nearest: f32 }
fn occ_box(lo: vec3<f32>, hi: vec3<f32>, clip: mat4x4<f32>) -> OccBox {
var outLeft = 0u;
var outRight = 0u;
var outBottom = 0u;
var outTop = 0u;
var outNear = 0u;
var outFar = 0u;
var behind = false;
var out: OccBox;
out.least = vec2<f32>(1e30);
out.most = vec2<f32>(-1e30);
out.nearest = 0.0;
let q0 = clip * vec4<f32>(lo, 1.0);
let ex = clip[0] * (hi.x - lo.x);
let ey = clip[1] * (hi.y - lo.y);
let ez = clip[2] * (hi.z - lo.z);
for (var c = 0u; c < 8u; c += 1u) {
let q = q0 + select(vec4<f32>(0.0), ex, (c & 1u) != 0u) + select(vec4<f32>(0.0), ey, (c & 2u) != 0u) + select(vec4<f32>(0.0), ez, (c & 4u) != 0u);
outLeft += select(0u, 1u, q.x < -q.w);
outRight += select(0u, 1u, q.x > q.w);
outBottom += select(0u, 1u, q.y < -q.w);
outTop += select(0u, 1u, q.y > q.w);
outNear += select(0u, 1u, q.z > q.w);
outFar += select(0u, 1u, q.z < 0.0);
if (q.w <= 1e-5) {
behind = true;
} else {
let n = q.xyz / q.w;
out.least = min(out.least, n.xy);
out.most = max(out.most, n.xy);
out.nearest = max(out.nearest, n.z);
}
}
out.state = OCC_PROJECTED;
if (outLeft == 8u || outRight == 8u || outBottom == 8u || outTop == 8u || outNear == 8u || outFar == 8u) { out.state = OCC_OUTSIDE; }
else if (behind) { out.state = OCC_CROSSING; }
return out;
}
fn occ_hidden(b: OccBox) -> bool {
let least = b.least;
let most = b.most;
let x0f = (least.x * 0.5 + 0.5) * occView.size.x - 1.0;
let x1f = (most.x * 0.5 + 0.5) * occView.size.x + 1.0;
let y0f = (0.5 - most.y * 0.5) * occView.size.y - 1.0;
let y1f = (0.5 - least.y * 0.5) * occView.size.y + 1.0;
if (x1f < 0.0 || y1f < 0.0 || x0f >= occView.size.x || y0f >= occView.size.y) { return true; }
let base = occView.level[0];
let x0 = min(u32(clamp(x0f, 0.0, occView.size.x - 1.0)) >> occView.shift, base.y - 1u);
let x1 = min(u32(clamp(x1f, 0.0, occView.size.x - 1.0)) >> occView.shift, base.y - 1u);
let y0 = min(u32(clamp(y0f, 0.0, occView.size.y - 1.0)) >> occView.shift, base.z - 1u);
let y1 = min(u32(clamp(y1f, 0.0, occView.size.y - 1.0)) >> occView.shift, base.z - 1u);
let seen = b.nearest / (1.0 - occView.slack);
var start = 0u;
loop {
if ((x1 >> start) - (x0 >> start) <= 1u && (y1 >> start) - (y0 >> start) <= 1u) { break; }
if (start + 1u >= occView.levels) { break; }
start += 1u;
}
var reads = 0u;
for (var ry = y0 >> start; ry <= y1 >> start; ry += 1u) {
for (var rx = x0 >> start; rx <= x1 >> start; rx += 1u) {
var level = start;
var tx = rx;
var ty = ry;
loop {
let at = occView.level[level];
let lx = tx << level;
let ly = ty << level;
let hx = min(((tx + 1u) << level) - 1u, base.y - 1u);
let hy = min(((ty + 1u) << level) - 1u, base.z - 1u);
var finer = false;
if (tx < at.y && ty < at.z && lx <= x1 && hx >= x0 && ly <= y1 && hy >= y0) {
if (reads >= OCC_READS_MOST) { return false; }
reads += 1u;
if (occ_texel(at.x + ty * at.y + tx) <= seen) {
if (level == 0u || (lx >= x0 && hx <= x1 && ly >= y0 && hy <= y1)) { return false; }
finer = true;
}
}
if (finer) {
level -= 1u;
tx *= 2u;
ty *= 2u;
continue;
}
loop {
if (level == start) { break; }
if ((tx & 1u) == 0u) {
tx += 1u;
break;
}
if ((ty & 1u) == 0u) {
tx -= 1u;
ty += 1u;
break;
}
tx >>= 1u;
ty >>= 1u;
level += 1u;
}
if (level == start) { break; }
}
}
}
return true;
}
`;var zK=(()=>globalThis.__spawnEngineConsole??=Object.create(console))(),Nm=16384;var Bm=(function(e){if(e&16)return"index";if(e&32)return"vertex";if(e&256)return"indirectStorage";if(e&128)return"storage";return"other"});var _m={r8unorm:1,r8snorm:1,r8uint:1,r8sint:1,stencil8:1,r16uint:2,r16sint:2,r16float:2,rg8unorm:2,rg8snorm:2,rg8uint:2,rg8sint:2,depth16unorm:2,r32uint:4,r32sint:4,r32float:4,rg16uint:4,rg16sint:4,rg16float:4,rgba8unorm:4,"rgba8unorm-srgb":4,rgba8snorm:4,rgba8uint:4,rgba8sint:4,bgra8unorm:4,"bgra8unorm-srgb":4,rgb10a2unorm:4,rgb10a2uint:4,rg11b10ufloat:4,rgb9e5ufloat:4,depth24plus:4,depth32float:4,"depth24plus-stencil8":5,"depth32float-stencil8":5,rg32uint:8,rg32sint:8,rg32float:8,rgba16uint:8,rgba16sint:8,rgba16float:8,rgba32uint:16,rgba32sint:16,rgba32float:16},Lm={"bc1-rgba-unorm":8,"bc1-rgba-unorm-srgb":8,"bc2-rgba-unorm":16,"bc2-rgba-unorm-srgb":16,"bc3-rgba-unorm":16,"bc3-rgba-unorm-srgb":16,"bc4-r-unorm":8,"bc4-r-snorm":8,"bc5-rg-unorm":16,"bc5-rg-snorm":16,"bc6h-rgb-ufloat":16,"bc6h-rgb-float":16,"bc7-rgba-unorm":16,"bc7-rgba-unorm-srgb":16,"etc2-rgb8unorm":8,"etc2-rgb8unorm-srgb":8,"etc2-rgb8a1unorm":8,"etc2-rgb8a1unorm-srgb":8,"etc2-rgba8unorm":16,"etc2-rgba8unorm-srgb":16,"eac-r11unorm":8,"eac-r11snorm":8,"eac-rg11unorm":16,"eac-rg11snorm":16,"astc-4x4-unorm":16,"astc-4x4-unorm-srgb":16},em=/^astc-(\d+)x(\d+)-/,Mm={blockWidth:1,blockHeight:1,bytesPerBlock:4},Qm=new Map;function vv1(e){let t=Qm.get(e);if(t!==void 0)return t;let r=_m[e],i=Lm[e],n=em.exec(e);if(r!==void 0)t={blockWidth:1,blockHeight:1,bytesPerBlock:r};else {let v$27;{let t$35=t;{let t=t$35;if(i!==void 0)t={blockWidth:4,blockHeight:4,bytesPerBlock:i};else if(n)t={blockWidth:Number(n[1]),blockHeight:Number(n[2]),bytesPerBlock:16};else zK.warn(`[lume] gpu-memory: no byte table entry for texture format "${e}" \u2014 counting 4 B/texel until one is added`),t=Mm;
v$27=t;}}t=v$27}return Qm.set(e,t),t}function Hj4(e,t){if(typeof e!=="object"||e===null||t===null)return 0;let r=Reflect.get(e,"format"),i=typeof r==="string"?vv1(r):Mm,[n,l,s]=Iv(t);if(!(n>0&&l>0&&s>0))return 0;return Math.ceil(n/i.blockWidth)*Math.ceil(l/i.blockHeight)*s*i.bytesPerBlock}function AX9(e){let t=vv1(e.format),[r,i,n]=Iv(e.size),l=e.mipLevelCount??1,s=e.sampleCount??1,o=e.dimension==="3d",a=0;for(let e=0;e<l;e++){let l=Math.max(1,r>>e),s=Math.max(1,i>>e),u=o?Math.max(1,n>>e):n;a+=Math.ceil(l/t.blockWidth)*Math.ceil(s/t.blockHeight)*t.bytesPerBlock*u}return a*s}function ULC(e){let[t,r,i]=Iv(e.size);let n=Gm(e.usage,km);return`${t}x${r}x${i}${e.dimension==="3d"?" 3d":""} m${e.mipLevelCount??1}${(e.sampleCount??1)>1?` s${e.sampleCount}`:""} ${n}`}var Fm,km=[[4,"sampled"],[8,"storage"],[16,"target"],[32,"transient"],[2,"copy-dst"],[1,"copy-src"]];var Gm=(function(e,t){let r=[];for(let[i,n]of t)if(e&i)r.push(n);return r.join("+")});var p0a=["models","textures","terrain","targets","transient","shadows","sky","fx","other"],sm=[["models",["lume model ","lume horde pose "]],["textures",["lume texture ","lume data texture ","lume scripted texture ","lume live texture ","lume builtin texture ","lume primitive ","lume clip "]],["terrain",["terrain "]],["targets",["lume scene ","lume bloom ","lume viewport ","lume share ","fx share ","lume post ","present target "]],["shadows",["lume lighting sun ","lume lighting shadow ","lume cloud shadow "]],["sky",["sky ","sky/","lume sky ","lume ibl ","lume lighting ibl "]],["fx",["fx "]]];var gM5=(function(e){for(let t=0;t<sm.length;t++){let r=sm[t][1];for(let i=0;i<r.length;i++)if(e.startsWith(r[i]))return sm[t][0]}return"other"});var wm=0;var ZkT=(function(){wm+=1});var U9w=(function(){wm-=1});var Tm=0;function Cjy(e){return Vm(2,e)}var Vm=(function(e,t){let r=e&1,i=e>>1&1;wm+=r,Tm+=i;try{return t()}finally{wm-=r,Tm-=i}});var xLC=(function(e,t=0){if((t&32)!==0)return"transient";let r=wm>0?"targets":gM5(e);return Tm>0&&r==="targets"?"other":r});var NpB=(function(){return{models:0,textures:0,terrain:0,targets:0,transient:0,shadows:0,sky:0,fx:0,other:0}});var p1S=(function(e,t){return e.models=t.models,e.textures=t.textures,e.terrain=t.terrain,e.targets=t.targets,e.transient=t.transient,e.shadows=t.shadows,e.sky=t.sky,e.fx=t.fx,e.other=t.other,e});var B7i=["models","lanes","scripted","materials","terrain","cells","cull","lighting","fx","sky","portals","text","frame","views","other"],bm=[["models",["lume model ","models/","lume static ","lume horde ","lume shape ","lume character ","lume pose "]],["lanes",["lume lane ","primitives/","lume sparse ","lume primitive "]],["scripted",["lume scripted "]],["materials",["Material:Scripted(","lume shared sampler slots "]],["terrain",["terrain ","tilemap "]],["cells",["cells "]],["cull",["lume cull "]],["lighting",["lume lighting ","lume sun-depth-bounds ","lume flash "]],["fx",["fx ","slab-"]],["sky",["sky ","lume sky ","lume ibl "]],["portals",["lume portal ","portal"]],["text",["lume text ","lume vector"]],["frame",["lume frame ","lume upload ","lume timestamp ","lume queue ","lume pixel-provenance ","lume debug "]]],Am=/ \(view plane \d+\)$/;var PNX=(function(e){if(Am.test(e))return"views";for(let[t,r]of bm)for(let i of r)if(e.startsWith(i))return t;return"other"});var Pgz=(function(){return{models:0,lanes:0,scripted:0,materials:0,terrain:0,cells:0,cull:0,lighting:0,fx:0,sky:0,portals:0,text:0,frame:0,views:0,other:0}});var zte=(function(e,t){return e.models=t.models,e.lanes=t.lanes,e.scripted=t.scripted,e.materials=t.materials,e.terrain=t.terrain,e.cells=t.cells,e.cull=t.cull,e.lighting=t.lighting,e.fx=t.fx,e.sky=t.sky,e.portals=t.portals,e.text=t.text,e.frame=t.frame,e.views=t.views,e.other=t.other,e});var xTo=(function(){return{buffers:0,bufferBytes:0,textures:0,textureBytes:0,texturePeakBytes:0,heldBytes:0,surfaceBytes:{present:0,page:0},bufferBytesByClass:{index:0,vertex:0,indirectStorage:0,storage:0,other:0}}});function v$D(e,t,r=3){return B7i.filter((r)=>e[r]>0||t[r]>0).sort((t,r)=>e[r]-e[t]).slice(0,r).map((r)=>`${r} ${t[r]} \u00b7 ${(e[r]/1048576).toFixed(1)}MB`).join(", ")}var tm=0,Jm=0;var P7X=(function(){return Jm+=1,Jm});var ybU=(function(e){let t=tm;return tm=e,t});var q5q=(function(e){tm=e});var Hm7=(function(){return tm});var x3$=(function(e){let t=ybU(0),r=wm,i=Tm;wm=0,Tm=0;try{return e()}finally{wm=r,Tm=i,q5q(t)}});var KLC=(function(e){return e.format===""?{label:e.label,count:e.count,bytes:e.bytes}:{label:e.label,format:e.format,count:e.count,bytes:e.bytes}});var Dm={limit:0,rows:[]};function xm(e,t=1/0){let r=Dm;if(r.limit=t,t>0)e.forEach(lLC);let i=[];for(let e=0;e<r.rows.length;e++){i.push(KLC(r.rows[e]));}while(r.rows.length>0)r.rows.pop();return i}var lLC=(function(e){if(e.count<=0)return;let t=Dm,r=t.rows;if(r.length>=t.limit){if(e.bytes<=r[r.length-1].bytes)return;r.pop()}let i=r.length;while(i>0&&r[i-1].bytes<e.bytes)i--;r.push(e);for(let e=r.length-1;e>i;e--)r[e]=r[e-1];r[i]=e});function Um(e,t,r,i,n,l){let s=e.get(t);if(s===void 0){if(n<0)return;e.set(t,s={label:r,format:i,count:0,bytes:0})}if(s.count+=n,s.bytes+=l,s.count<=0&&s.bytes===0)e.delete(t)}var zD4="view-postcard",Sm=new Set(["models","lanes","scripted","materials"]);function zLC(){let e=!1;let t=0;let r=0;let i=0;let n=0;let l=0;let s=0;let o=0;let a=0;let u=0;let d={present:0,page:0};let f=()=>Math.max(0,o+d.present+d.page);let c;let h;let p;let m=function(){let e=Math.max(0,r+n);if(e>0&&p===void 0){p=dK(function(e){c?.release();h?.setGpuHeld(0);h?.setGpuBakes(0);h?.setGpuRows(0);c=e?.owner("gpu");h=e??void 0;c?.resize(Math.max(0,r+n),tK());h?.setGpuHeld(f());h?.setGpuBakes(u);h?.setGpuRows(a)});}c?.resize(e,tK());h?.setGpuHeld(e===0?0:f());h?.setGpuBakes(e===0?0:u);h?.setGpuRows(e===0?0:a);if(e===0)p?.(),p=void 0,c=void 0,h=void 0};let g={index:0,vertex:0,indirectStorage:0,storage:0,other:0};let y=new Map;let v=NpB();let w=new Map;let b=Pgz();let k=Pgz();let x=new Map;let M=new Map;let S=[];let I=function(){for(let e=0;e<S.length;e++)S[e]()};let R=function(e,t,r){let i=Zpc(M,e);Um(i,t,t,"",1,r)};let A=function(e,t,r){let i=M.get(e);if(i===void 0)return;if(Um(i,t,t,"",-1,-r),i.size===0)M.delete(e)};return{dispose(){if(e)return;e=!0,s+=1,c?.release(),c=void 0,h?.setGpuHeld(0),h?.setGpuBakes(0),h?.setGpuRows(0),h=void 0,p?.(),p=void 0,t=r=i=n=o=u=a=d.present=d.page=0;for(let e of Object.keys(g))g[e]=0;for(let e of Object.keys(v))v[e]=0;for(let e of B7i)b[e]=k[e]=0;y.clear(),w.clear(),S.length=0,x.clear(),M.clear()},textureCensus(e){return xm(y,e)},textureBytesByKind(e){return p1S(e??NpB(),v)},bufferBytesByKind(e){return zte(e??Pgz(),b)},buffersByKind(e){return zte(e??Pgz(),k)},bufferCensus(e){I();return xm(w,e)},shareBufferBytes(t,r,i,n){if(e||i===0&&n===0)return;s+=1,Um(w,t,t,"",0,-i),Um(w,r,r,"",n,i)},readSharesAtCensus(e){S.push(e)},scopeCensus(){return[...x.entries()].map(([e,t])=>({scope:e,count:t.count,bytes:t.bytes})).sort((e,t)=>t.bytes-e.bytes)},scopeLabelCensus(e){let t=M.get(e);return t===void 0?[]:xm(t)},censusGeneration(){I();return s},info(e){let s=e??xTo();s.buffers=t,s.bufferBytes=r,s.textures=i,s.textureBytes=n,s.texturePeakBytes=l;let a=o+d.present+d.page;s.heldBytes=a>0?a:0,s.surfaceBytes.present=d.present,s.surfaceBytes.page=d.page;let u=s.bufferBytesByClass;return u.index=g.index,u.vertex=g.vertex,u.indirectStorage=g.indirectStorage,u.storage=g.storage,u.other=g.other,s},setSurfaceBytes(t,r){if(e)return;let i=Math.max(0,Math.round(Number.isFinite(r)?r:0));if(d[t]===i)return;d[t]=i,m()},noteBufferCreated(i,n,l="(unlabeled)",d=0){if(e)return;s+=1;t+=1;r+=i;o+=(Math.ceil(i/Nm)*Nm);if((l.startsWith(zD4)&&(la(l))))u+=i;let f=PNX(l);if((Sm.has(f)))a+=i;m();g[Bm(n)]+=i;Um(w,l,l,"",1,i);if(d!==0){Um(x,d,"","",1,i);R(d,l,i);}b[f]+=i,k[f]+=1},noteBufferDestroyed(i,n,l="(unlabeled)",d=0){if(e)return;s+=1;t-=1;r-=i;o-=(Math.ceil(i/Nm)*Nm);if((l.startsWith(zD4)&&(la(l))))u-=i;let f=PNX(l);if((Sm.has(f)))a-=i;m();g[Bm(n)]-=i;Um(w,l,l,"",-1,-i);if(d!==0){Um(x,d,"","",-1,-i);A(d,l,i);}b[f]-=i,k[f]-=1},noteTextureCreated(t,r="(unlabeled)",d=0,f=gM5(r),c=""){if(e)return;s+=1;i+=1;n+=t;o+=(Math.ceil(t/Nm)*Nm);if((r.startsWith(zD4)&&(la(r))))u+=t;if((f==="models"||f==="textures"))a+=t;m();l=Math.max(l,n);v[f]+=t;Um(y,(c===""?r:`${r}\x00${c}`),r,c,1,t);if(d!==0){Um(x,d,"","",1,t);R(d,r,t)}},noteTextureDestroyed(t,r="(unlabeled)",l=0,d=gM5(r),f=""){if(e)return;s+=1;i-=1;n-=t;o-=(Math.ceil(t/Nm)*Nm);if((r.startsWith(zD4)&&(la(r))))u-=t;if((d==="models"||d==="textures"))a-=t;m();v[d]-=t;Um(y,(f===""?r:`${r}\x00${f}`),r,f,-1,-t);if(l!==0){Um(x,l,"","",-1,-t);A(l,r,t)}}}};var l9t={channelWriteSeq:20,cameraHead:21,chunkRows:40,unitShare:41,benchClock:42,chipEnvelope:44,roadCpu:45,roadShip:46,trialRelief:47,chipClockStep:49},DWe={depthArm:48,occlusion:51,directDraws:53,lightReach:54},Bkm={frameNotDue:20,gpuHold:21,warmHold:22,presentSkipped:23,noDeadline:24,applyYield:25,chunkStop:26,chunkDear:27,turnPastDue:28,unitRefused:29,admitSpent:30,heldReplaySpent:40,slotMovesSpent:41,restageSpent:42,scriptedBuildSpent:43,residenceSpent:44,residenceHoldSpent:45,residenceSlotSpent:46,poolStandSpent:47,placementSettleSpent:48,coplanarFacesSpent:49,coplanarGroupsSpent:50,coplanarAssignSpent:51,coplanarArriveSpent:52,coplanarSettleYields:53,entryPrimeSpent:54,warmWindowSpent:55,modelBuildSpent:56,modelArrivalTimeUp:57,modelInstallTimeUp:58,starCountSpent:59,starPlaceSpent:60,starCatalogBytesSpent:61,starCatalogSpent:62,starCloudSpent:63,lookWorkSpent:64,gpuLoopHolds:65,gpuReadImplausible:66,stampsDeep:67,lookPassParks:68,simYield:69,wordStageQueues:70,unitsWaitOnWord:72,nextArrivalInTime:74,clusterGroupsSpent:76};var TgN=8;function frM(e,t,r,i){let n=(t)=>e&&Reflect.get(e,t);let l=`${t}PerShaderStage`;let s=n(l);let o=typeof s==="number"?s:i;let a=`${t}In${r==="vertex"?"Vertex":"Fragment"}Stage`;let u=r==="compute"||n(a);if(typeof u==="number"&&u<=o)[o,l]=[u,a];return{limit:o,limitName:l}}function Gel(e,t){let n=(frM(e,"maxStorageBuffers",("compute"),8).limit);let l=(frM(e,"maxStorageTextures",("compute"),4).limit);return{vertex:(frM(e,"maxStorageBuffers",("vertex"),8).limit),fragment:(frM(e,"maxStorageBuffers",("fragment"),8).limit),compute:n,sampled:frM(e,"maxSampledTextures","compute",16).limit,storageTextures:{vertex:(frM(e,"maxStorageTextures",("vertex"),4).limit),fragment:(frM(e,"maxStorageTextures",("fragment"),4).limit),compute:l},layout:t?{storageBuffers:n,storageTextures:l}:{storageBuffers:1/0,storageTextures:1/0}}}var oV=(function(e,t){let r=Gel(e,t);return Math.min(r.vertex,r.fragment,r.compute,r.layout.storageBuffers)<(t?16:10)});var dV=new WeakMap;var Uhq=(function(e){return dV.get(e)??null});function dwC(e,t){dV.set(e,t)}var qV=new WeakMap;function srz(e,t){let r=qV.get(e);if(r===void 0)qV.set(e,[t]);else r.push(t)}function Fo3(e){return qV.get(e)??[]}var Mu="the answer this realm's last device read on the same adapter, kept",$u="its graphics driver drops a shader program it fails to link: a draw ran with the program before it",ru=`fn tri(i: u32) -> vec4f { let p = array(vec2f(-1.0, -1.0), vec2f(3.0, -1.0), vec2f(-1.0, 3.0)); return vec4f(p[i], 0.5, 1.0); }
`,Iu=`@vertex fn vs(@builtin(vertex_index) i: u32) -> @builtin(position) vec4f { let p = array(vec2f(-1.0, -1.0), vec2f(3.0, -1.0), vec2f(-1.0, 3.0)); return vec4f(p[i], 0.5, 1.0); }
@fragment fn fs() -> @location(0) vec4f { return vec4f(1.0, 0.0, 1.0, 1.0); }
`,Wu=`struct O { @builtin(position) p: vec4f, @location(0) @interpolate(flat, either) g: f32 };
`+ru+`@vertex fn vs(@builtin(vertex_index) i: u32) -> O { var o: O; o.p = tri(i); o.g = 1.0; return o; }
@fragment fn fs(i: O) -> @location(0) vec4f { return vec4f(1.0 - i.g, i.g, 0.0, 1.0); }
`,ju="rgba8unorm",Ku=4,Au=256;function k3A(e){let[t,r,i]=[e[0],e[1],e[2]];if(r>200&&t<50&&i<50)return"links";if(t>200&&i>200&&r<50)return"drops-links";return"unknown"}var nbj=(e,t)=>uLW(e)&&typeof Reflect.get(e,t)==="function",Bu=(e)=>["createShaderModule","createRenderPipelineAsync","createTexture","createBuffer","createCommandEncoder","pushErrorScope","popErrorScope"].every((t)=>nbj(e,t))&&nbj(e.queue,"submit");async function tYn(e,t,r){let i=[],n=!1;try{return await r(i,{push:function(){e.pushErrorScope("validation"),n=!0},read:async function(t,r){n=!1;let i=await e.popErrorScope();if(i)return i;await t.mapAsync(1);let l=new Uint8Array(t.getMappedRange(0,r).slice(0));return t.unmap(),l}})}catch(e){return t(e)}finally{if(n){{let e$4=()=>void e.popErrorScope().catch(function(){return});{let e=e$4;try{e()}catch(e){}}}}for(let e of i){{let e$5=()=>e.destroy?.();{let e=e$5;try{e()}catch(e){}}}}}}async function mu(e,t,r,i){if(!Bu(e))return null;return tYn(e,()=>null,async function(n,l){let s=[Ku,Ku,1],o=e.createTexture({label:t,size:s,format:ju,usage:17});n.push(o);let a=r===null?null:e.createTexture({label:t,size:s,format:r,usage:16});if(a!==null)n.push(a);let u=e.createBuffer({label:t,size:Au*Ku,usage:9});if(n.push(u),!nbj(o,"createView")||a!==null&&!nbj(a,"createView")||!nbj(u,"mapAsync")||!nbj(u,"getMappedRange"))return null;let d=e.createCommandEncoder({label:t});if(!nbj(d,"beginRenderPass")||!nbj(d,"copyTextureToBuffer")||!nbj(d,"finish"))return null;l.push();let f=await Promise.all(i.map(function({code:r,fs:i,depthStencil:n}){let l=e.createShaderModule({label:t,code:r});return e.createRenderPipelineAsync({label:t,layout:"auto",vertex:{module:l,entryPoint:"vs"},fragment:{module:l,entryPoint:i,targets:[{format:ju}]},depthStencil:n})})),c=d.beginRenderPass({label:t,colorAttachments:[{view:o.createView(),loadOp:"clear",storeOp:"store",clearValue:{r:0,g:0,b:1,a:1}}],depthStencilAttachment:a===null?void 0:{view:a.createView(),depthLoadOp:"clear",depthStoreOp:"discard",depthClearValue:0}});for(let e of f)c.setPipeline(e),c.draw(3);c.end(),d.copyTextureToBuffer({texture:o},{buffer:u,bytesPerRow:Au},s),e.queue.submit([d.finish()]);let h=await l.read(u,4);return h instanceof Uint8Array?h:null})}async function o3A(e){let t=await mu(e,"lume link canary",null,[{code:Iu,fs:"fs"},{code:Wu,fs:"fs"}]);return t===null?"unknown":k3A(t)}var E2=(()=>globalThis.__spawnEngineConsole??=Object.create(console))(),y2=64,L2=1024,V2=256,z2=3,j2=256,P2=256,p2=`@group(0) @binding(0) var<storage, read> rows: array<u32>;
struct Read { @builtin(position) position: vec4f, @location(0) @interpolate(flat) word: vec2u }
@vertex fn vs(@builtin(vertex_index) vertex: u32) -> Read {
  let corner = array(vec2f(-1.0, -1.0), vec2f(3.0, -1.0), vec2f(-1.0, 3.0));
  var read: Read;
  read.position = vec4f(corner[vertex], 0.5, 1.0);
  read.word = vec2u(arrayLength(&rows), rows[${L2-1}u]);
  return read;
}
@fragment fn fs(read: Read) -> @location(0) vec2u { return read.word; }
`,D2=`@group(0) @binding(0) var<storage, read> rows: array<u32>;
@vertex fn vs(@builtin(vertex_index) vertex: u32) -> @builtin(position) vec4f {
  let corner = array(vec2f(-1.0, -1.0), vec2f(3.0, -1.0), vec2f(-1.0, 3.0));
  return vec4f(corner[vertex], 0.5, 1.0);
}
@fragment fn fs() -> @location(0) vec2u { return vec2u(arrayLength(&rows), rows[${L2-1}u]); }
`,H2=`@group(0) @binding(0) var<storage, read> rows: array<u32>;
@group(1) @binding(0) var<storage, read_write> word: array<u32, 2>;
@compute @workgroup_size(1) fn main() {
  word[0] = arrayLength(&rows);
  word[1] = rows[${L2-1}u];
}
`,q2=`@vertex fn vs() -> @builtin(position) vec4f { return vec4f(2.0, 2.0, 0.5, 1.0); }
@fragment fn fs() {}
@compute @workgroup_size(1) fn main() {}
`,g2=V2/4+L2-1;var l2=(function(e){if(e.length<3||e[0][0]!==y2)return"unknown";let t=((e)=>e[0]===L2&&e[1]===g2);if(t(e[1])){return t(e[2])?"holds":"unknown";}return t(e[2])?"sticks":"sticks-uncured"});var G2={render:"unknown",compute:"unknown"},O2={unknown:0,holds:1,sticks:2,"sticks-uncured":3};var cKd=(function(e,t){return O2[e]>=O2[t]?e:t});var S2=["createShaderModule","createRenderPipelineAsync","createComputePipelineAsync","createBindGroupLayout","createPipelineLayout","createBindGroup","createTexture","createBuffer","createCommandEncoder","pushErrorScope","popErrorScope"];var R2=(function(e,t,r){let i={label:"lume range latch toggle",layout:t,vertex:{module:e,entryPoint:"vs"},primitive:{topology:"point-list"},multisample:{count:r.samples}};i.fragment={module:e,entryPoint:"fs",targets:r.colors.map(((e)=>e===null?null:{format:e,writeMask:0}))};let n=r.depthStencil;if(n!==void 0)i.depthStencil=n==="stencil8"?{format:n,stencilReadMask:0,stencilWriteMask:0}:{format:n,depthWriteEnabled:!1,depthCompare:"always",stencilReadMask:0,stencilWriteMask:0};return i});function m2(a){return (m2=$c0C(5)).call(this,a)}function e2(e){return`${e.colors.map((e)=>e??"-").join(",")}/${e.depthStencil??"-"}/s${e.samples}`}async function HKd(e){if(!S2.every((t)=>nbj(e,t)))return G2;if(!nbj(e.queue,"submit")||!nbj(e.queue,"writeBuffer"))return G2;let t=frM(e.limits,"maxStorageBuffers","vertex",1).limit>0,r=frM(e.limits,"maxStorageBuffers","fragment",1).limit>0;return tYn(e,()=>G2,async function(i,n){let l=new Uint32Array((V2+L2*4)/4);for(let e=0;e<l.length;e++)l[e]=e;let s=e.createBuffer({label:"lume range latch canary rows",size:l.byteLength,usage:136});i.push(s);let o=e.createBuffer({label:"lume range latch canary slots",size:P2*z2,usage:132});i.push(o);let a=e.createBuffer({label:"lume range latch canary read",size:j2*2+P2*z2,usage:9});if(i.push(a),!nbj(a,"mapAsync")||!nbj(a,"getMappedRange"))return G2;let u=t||r?e.createTexture({label:"lume range latch canary",size:[z2,2,1],format:"rg32uint",usage:17}):null;if(u!==null)i.push(u);if(u!==null&&!nbj(u,"createView"))return G2;e.queue.writeBuffer(s,0,l),n.push();let d=e.createBindGroupLayout({label:"lume range latch canary rows",entries:[RDp(0,(t?1:0)|4,"read-only-storage")]}),f=e.createBindGroupLayout({label:"lume range latch canary slot",entries:[RDp(0,4,"storage")]}),c=e.createShaderModule({label:"lume range latch toggle",code:q2}),h=e.createPipelineLayout({label:"lume range latch toggle",bindGroupLayouts:[]}),p=e.createShaderModule({label:"lume range latch canary",code:H2}),m=t?e.createShaderModule({label:"lume range latch canary",code:p2}):null,g=r?e.createBindGroupLayout({label:"lume range latch canary fragment rows",entries:[RDp(0,2,"read-only-storage")]}):null,y=r?e.createShaderModule({label:"lume range latch fragment canary",code:D2}):null,[v,w,b,k,x]=await Promise.all([m===null?null:e.createRenderPipelineAsync({label:"lume range latch canary",layout:e.createPipelineLayout({label:"lume range latch canary",bindGroupLayouts:[d]}),vertex:{module:m,entryPoint:"vs"},fragment:{module:m,entryPoint:"fs",targets:[{format:"rg32uint"}]}}),m===null?null:e.createRenderPipelineAsync(R2(c,h,{colors:["rg32uint"],depthStencil:void 0,samples:1})),e.createComputePipelineAsync({label:"lume range latch canary",layout:e.createPipelineLayout({label:"lume range latch canary",bindGroupLayouts:[d,f]}),compute:{module:p,entryPoint:"main"}}).catch(()=>null),e.createComputePipelineAsync({label:"lume range latch toggle",layout:h,compute:{module:c,entryPoint:"main"}}).catch(()=>null),y===null||g===null?null:e.createRenderPipelineAsync({label:"lume range latch fragment canary",layout:e.createPipelineLayout({label:"lume range latch fragment canary",bindGroupLayouts:[g]}),vertex:{module:y,entryPoint:"vs"},fragment:{module:y,entryPoint:"fs",targets:[{format:"rg32uint"}]}})]),M=x===null?null:w??await e.createRenderPipelineAsync(R2(c,h,{colors:["rg32uint"],depthStencil:void 0,samples:1})),S=(t)=>[e.createBindGroup({label:"lume range latch canary short",layout:t,entries:[{binding:0,resource:{buffer:s,offset:0,size:y2*4}}]}),e.createBindGroup({label:"lume range latch canary long",layout:t,entries:[{binding:0,resource:{buffer:s,offset:V2,size:L2*4}}]})],[I,R]=S(d),A=(t)=>e.createBindGroup({label:"lume range latch canary slot",layout:f,entries:[{binding:0,resource:{buffer:o,offset:t*P2,size:8}}]}),$=e.createCommandEncoder({label:"lume range latch canary"}),z=function(e,t,[r,i],n,l){let s=$.beginRenderPass({label:"lume range latch canary",colorAttachments:[{view:n,loadOp:l===1?"clear":"load",storeOp:"store",clearValue:{r:0,g:0,b:0,a:0}}]});s.setPipeline(e),s.setScissorRect(0,l,1,1),s.setBindGroup(0,r),s.draw(3),s.setScissorRect(1,l,1,1),s.setBindGroup(0,i),s.draw(3),s.setPipeline(t),s.draw(1),s.setPipeline(e),s.setBindGroup(0,i),s.setScissorRect(2,l,1,1),s.draw(3),s.end()};if(x!==null&&M!==null&&g!==null&&u!==null)z(x,M,S(g),u.createView(),1);if(v!==null&&w!==null&&u!==null)z(v,w,[I,R],u.createView(),0);if(u!==null)$.copyTextureToBuffer({texture:u},{buffer:a,bytesPerRow:j2},[z2,2,1]);let O=b!==null&&k!==null;if(O){let e=$.beginComputePass({label:"lume range latch canary"});e.setPipeline(b),e.setBindGroup(0,I),e.setBindGroup(1,A(0)),e.dispatchWorkgroups(1),e.setBindGroup(0,R),e.setBindGroup(1,A(1)),e.dispatchWorkgroups(1),e.setPipeline(k),e.dispatchWorkgroups(1),e.setPipeline(b),e.setBindGroup(0,R),e.setBindGroup(1,A(2)),e.dispatchWorkgroups(1),e.end()}$.copyBufferToBuffer(o,0,a,j2*2,P2*z2),e.queue.submit([$.finish()]);let T=await n.read(a,j2*2+P2*z2);if(!(T instanceof Uint8Array))return G2;let C=new Uint32Array(T.buffer),N=(e,t)=>[C[e*j2/4+t*2],C[e*j2/4+t*2+1]],j=(e)=>[C[(j2*2+e*P2)/4],C[(j2*2+e*P2)/4+1]],P=v===null?"unknown":l2([N(0,0),N(0,1),N(0,2)]),E=x===null?"unknown":l2([N(1,0),N(1,1),N(1,2)]);return{render:cKd(P,E),compute:O?l2([j(0),j(1),j(2)]):"unknown",vertex:P,fragment:E}})}var w2={sticks:"a storage binding's length sticks, and a toggle pipeline's draw sets it again","sticks-uncured":"a storage binding's length sticks, and a toggle pipeline's draw does not set it again",holds:"every length holds",unknown:"not read"};function b2(e){if(!(e.render.startsWith("sticks")||e.compute.startsWith("sticks")))return null;return`[lume] storage range canary: render: ${w2[e.render]} (vertex ${e.vertex??"?"}, fragment ${e.fragment??"?"}); compute: ${w2[e.compute]}`}function BKd(a){return (BKd=$c0C(6)).apply(this,arguments)}function lX_(e,t,...r){while(r.length>0&&r[r.length-1]===void 0)r.pop();Reflect.apply(e,t,r);return}function ZKd(e,t,r){if(e===void 0)return;if(e instanceof Uint32Array&&t!==void 0&&r!==void 0)return Array.from(e.subarray(t,t+r));let i=Array.from(e);return i.length===0?void 0:i}class fKd{constructor(e,t,r,i){this.device=void 0;this.render=void 0;this.compute=void 0;this.now=void 0;this.keys=new WeakMap;this.storage=new WeakMap;this.toggleKeys=new WeakMap;this.toggles=new Map;this.computeToggle=null;this.ready=void 0;this.rebinds=0;this.firstRebindMs=-1;this.onFirstToggle=null;this.ranges=new Map;this.pending=new Map;this.nextSaid=1;this.nextUnknown=-1;this.building=!1;this.module=null;this.layout=null;this.device=e,this.render=t,this.compute=r,this.now=i,this.ready=r?this.buildComputeToggle():Promise.resolve()}noteLayout(e,t){let r=new Set;for(let e of t.entries)if(e.buffer!==void 0&&(e.buffer.type==="storage"||e.buffer.type==="read-only-storage"))r.add(e.binding);this.storage.set(e,r)}noteGroup(e,t){this.keys.set(e,this.rangeOf(BKd(t,this.storage.get(t.layout)??null)))}rangeOf(e){if(e==="")return 0;let t=this.ranges.get(e);if(t!==void 0)return t;let r=this.ranges.size+1;return this.ranges.set(e,r),r}keyOf(e){if(e===null)return 0;let t=this.keys.get(e);if(t!==void 0)return t;let r=this.nextUnknown--;return this.keys.set(e,r),r}toggleReady(e){if(!this.render||this.building)return null;let t=m2(e),r=e2(t);if(this.toggles.has(r))return null;return this.pending.get(r)??this.buildToggle(r,t)}notePipeline(a,b,c){return $c0P($c0C(7),fKd.prototype,"notePipeline").call(this,a,b,c)}toggleFor(e){let t=this.toggleKeys.get(e);if(t===void 0)return null;return this.toggles.get(t)??null}noteRebind(){return $c0P($c0C(8),fKd.prototype,"noteRebind").call(this)}wrapEncoder(e){return new gKd(this,e)}wrapBundleEncoder(e){return this.render?new EKd(this,e):e}toggleParts(){return $c0P($c0C(9),fKd.prototype,"toggleParts").call(this)}within(e){this.building=!0;try{return e()}finally{this.building=!1}}buildToggle(a,b){return $c0P($c0C(10),fKd.prototype,"buildToggle").call(this,a,b)} buildComputeToggle(){return $c0P($c0C(11),fKd.prototype,"buildComputeToggle").call(this)}}function n2(e,t){E2.warn(`[lume] storage range latch: the toggle for ${e} did not build (${k$w(t)}), so a draw on those attachments keeps the length of its first draw`)}class N2{constructor(e,t,r){this.door=void 0;this.toggleOf=void 0;this.act=void 0;this.pipeline=null;this.drawn=null;this.seen=!1;this.groups=[];this.keys=[];this.offsets=[];this.latched=[];this.door=e,this.toggleOf=t,this.act=r}setPipeline(e,t){return this.pipeline=t,lX_(e.setPipeline,e,t)}setBindGroup(a,b,c,d,e,f){return $c0C(12).call(this,a,b,c,d,e,f)}prepare(a){return $c0C(13).call(this,a)}changed(){let e=this.keys,t=this.latched;if(e.length!==t.length)return!0;for(let r=0;r<e.length;r++)if((e[r]??0)!==t[r])return!0;return!1}latch(){let e=this.keys,t=this.latched;t.length=e.length;for(let r=0;r<e.length;r++)t[r]=e[r]??0}reset(){this.pipeline=null,this.drawn=null,this.seen=!1,this.groups.length=0,this.keys.length=0,this.offsets.length=0,this.latched.length=0}}class SYm{constructor(e){this.real=void 0;this.real=e}get label(){return this.real.label}set label(e){this.real.label=e}pushDebugGroup(e){return this.real.pushDebugGroup(e)}popDebugGroup(){return this.real.popDebugGroup()}insertDebugMarker(e){return this.real.insertDebugMarker(e)}}class D0i extends SYm{constructor(...$lpa0){var $lpt0;super(...$lpa0),$lpt0="GPUCommandEncoder","__brand"in this?$lpd0(this,"__brand",$lpt0):this.__brand=$lpt0}beginRenderPass(e){return this.real.beginRenderPass(e)}beginComputePass(e){return e===void 0?this.real.beginComputePass():this.real.beginComputePass(e)}copyBufferToBuffer(e,t,r,i,n){return lX_(this.real.copyBufferToBuffer,this.real,e,t,r,i,n)}copyBufferToTexture(e,t,r){return this.real.copyBufferToTexture(e,t,r)}copyTextureToBuffer(e,t,r){return this.real.copyTextureToBuffer(e,t,r)}copyTextureToTexture(e,t,r){return this.real.copyTextureToTexture(e,t,r)}clearBuffer(e,t,r){return lX_(this.real.clearBuffer,this.real,e,t,r)}resolveQuerySet(e,t,r,i,n){return this.real.resolveQuerySet(e,t,r,i,n)}finish(e){return e===void 0?this.real.finish():this.real.finish(e)}}function AZ3(e){class t extends e{constructor(...$lpa1){var $lpt1;super(...$lpa1),$lpt1="GPURenderPassEncoder","__brand"in this?$lpd0(this,"__brand",$lpt1):this.__brand=$lpt1}setViewport(e,t,r,i,n,l){return this.real.setViewport(e,t,r,i,n,l)}setScissorRect(e,t,r,i){return this.real.setScissorRect(e,t,r,i)}setBlendConstant(e){return lX_(this.real.setBlendConstant,this.real,e)}setStencilReference(e){return lX_(this.real.setStencilReference,this.real,e)}beginOcclusionQuery(e){return lX_(this.real.beginOcclusionQuery,this.real,e)}endOcclusionQuery(){return lX_(this.real.endOcclusionQuery,this.real)}}return t}class v2 extends SYm{constructor(e,t){var $lpt2;super(t),"latch"in this?$lpd0(this,"latch",void 0):this.latch=void 0;this.latch=e}setPipeline(e){return this.latch.setPipeline(this.real,e)}setBindGroup(e,t,r,i,n){return this.latch.setBindGroup(this.real,e,t,r,i,n)}setImmediates(e,t,r,i){return lX_(this.real.setImmediates,this.real,e,t,r,i)}}class T2 extends v2{constructor(e,t){super(new N2(e,(t)=>e.toggleFor(t),()=>void t.draw(1)),t)}setIndexBuffer(e,t,r,i){return lX_(this.real.setIndexBuffer,this.real,e,t,r,i)}setVertexBuffer(e,t,r,i){return lX_(this.real.setVertexBuffer,this.real,e,t,r,i)}draw(e,t,r,i){return this.latch.prepare(this.real),lX_(this.real.draw,this.real,e,t,r,i)}drawIndexed(e,t,r,i,n){return this.latch.prepare(this.real),lX_(this.real.drawIndexed,this.real,e,t,r,i,n)}drawIndirect(e,t){return this.latch.prepare(this.real),this.real.drawIndirect(e,t)}drawIndexedIndirect(e,t){return this.latch.prepare(this.real),this.real.drawIndexedIndirect(e,t)}}class FKd extends AZ3(T2){executeBundles(e){this.latch.door.onFirstToggle?.(),this.real.executeBundles(e),this.latch.reset();return}end(){return this.real.end()}}class xKd extends v2{constructor(e,t){var $lpt3;super(new N2(e,()=>e.computeToggle,()=>void t.dispatchWorkgroups(1)),t),$lpt3="GPUComputePassEncoder","__brand"in this?$lpd0(this,"__brand",$lpt3):this.__brand=$lpt3}dispatchWorkgroups(e,t,r){return this.latch.prepare(this.real),lX_(this.real.dispatchWorkgroups,this.real,e,t,r)}dispatchWorkgroupsIndirect(e,t){return this.latch.prepare(this.real),this.real.dispatchWorkgroupsIndirect(e,t)}end(){return this.real.end()}}class EKd extends T2{constructor(...$lpa2){var $lpt4;super(...$lpa2),$lpt4="GPURenderBundleEncoder","__brand"in this?$lpd0(this,"__brand",$lpt4):this.__brand=$lpt4}finish(e){return this.real.finish(e)}}class gKd extends D0i{constructor(e,t){var $lpt5;super(t),"door"in this?$lpd0(this,"door",void 0):this.door=void 0;this.door=e}beginRenderPass(e){let t=this.real.beginRenderPass(e);return this.door.render?new FKd(this.door,t):t}beginComputePass(e){let t=e===void 0?this.real.beginComputePass():this.real.beginComputePass(e);return this.door.compute?new xKd(this.door,t):t}}var Q_=new Uint8Array(16384);;(function(){for(let e of["->","&&","||","==","!=","<=",">=","++","--","+=","-=","*=","/=","%=","&=","|=","^="])Q_[e.charCodeAt(0)*128+e.charCodeAt(1)]=1;})();var __=(e,t)=>e<128&&t<128&&Q_[e*128+t]===1,w_=1,i_=2,u_=4,J_=new Uint8Array(128);;(function(){for(let e of` 	
\r\v\f`)J_[e.charCodeAt(0)]=w_;;(function(){})();for(let e=0;e<128;e++){let t=String.fromCharCode(e);if(/[A-Za-z_]/.test(t))J_[e]=i_;if(/[0-9]/.test(t))J_[e]=u_}})();var q_=(e)=>e<128?J_[e]:0,y_=47,C_=46,S_="0[xX][0-9a-fA-F]*\\.?[0-9a-fA-F]*(?:[pP][+-]?[0-9]+)?[fhiu]?|[0-9]*\\.?[0-9]+(?:[eE][+-]?[0-9]+)?[fhiu]?|[0-9]+\\.?(?:[eE][+-]?[0-9]+)?[fhiu]?",g_=new RegExp(`^(?:${S_})`),v_=new RegExp(`(?:${S_})`,"y"),E_=new Set([102,104,105,117]),H_=new Set([101,69,120,88]);function saK(a,b){return (saK=$c0C(14)).call(this,a,b)}class W_ extends Error{}function n_(e){switch(e.kind){case"scalar":case"atomic":return 4;case"vector":return e.size===2?8:16;case"matrix":return e.rows===2?8:16;case"array":return n_(e.element);case"struct":return e.align}}function F_(e){switch(e.kind){case"scalar":case"atomic":return 4;case"vector":return e.size*4;case"matrix":return e.columns*(e.rows===2?8:16);case"array":if(e.count===null)throw new W_("a runtime-sized array has no size");return e.count*e.stride;case"struct":return e.size}}var f_={f:"f32",i:"i32",u:"u32"},$_=[2,3,4];function z_(e){let t=$_.find((t)=>String(t)===e);if(t===void 0)throw new W_(`no side ${e??""}`);return t}function a_(e,t){let r=e[t];if(r===void 0)throw new W_("the text ends early");return r}function U_(e,t,r,i,n=0){for(let l=t;l<e.length;l++)if(e[l].text===r)n++;else if(e[l].text===i){if(n--,n===0)return l}throw new W_(`no ${i} closes the ${r} at ${a_(e,t).start}`)}function B_(a,b){return (B_=$c0C(15)).call(this,a,b)}var A_=/^(array|vec[234]|mat[234]x[234]|atomic|ptr)$/;function K_(e,t,r){let i=[],n=t;for(let l=t;l<r;l++){let t=e[l].text;if(t==="("||t==="[")l=U_(e,l,t,t==="("?")":"]");else if(t==="<"&&e[l-1]?.kind==="ident"&&A_.test(e[l-1].text))l=B_(e,l);else if(t===",")i.push([n,l]),n=l+1}if(n<r)i.push([n,r]);return i}class baK{constructor(e,t,r){this.scope=void 0;this.to=void 0;this.at=void 0;this.scope=e,this.to=r,this.at=t}read(){let e=this.shift();if(this.at!==this.to)throw new W_(`a constant expression has more after it at ${a_(this.scope.tokens,this.at).start}`);return e}peek(){return this.at<this.to?this.scope.tokens[this.at]:void 0}shiftOp(){return $c0P($c0C(16),baK.prototype,"shiftOp").call(this)}primary(){return $c0C(17).call(this)}product(){let e=this.primary();for(let t=this.peek()?.text;t==="*"||t==="/"||t==="%";t=this.peek()?.text){this.at++;let r=this.primary();if(t==="*")e*=r;else e=t==="/"?Math.trunc(e/r):e%r}return e}sum(){let e=this.product();for(let t=this.peek()?.text;t==="+"||t==="-";t=this.peek()?.text){this.at++;let r=this.product();e=t==="+"?e+r:e-r}return e}shift(){let e=this.sum();for(let t=this.shiftOp();t!==null;t=this.shiftOp()){this.at+=2;let r=this.sum();e=t==="<<"?e<<r:e>>r}return e}}var e_=(e,t,r)=>new baK(e,t,r).read();var r_=/^vec([234])([fiuh])$/,T_=/^mat([234])x([234])([fh])$/,R_=/^vec([234])$/,x_=/^mat([234])x([234])$/;function p_(e,t){if(e.kind!=="scalar")throw new W_(`${t} of ${e.kind}`);return e.scalar}function _aK(e,t,r){let i=function(){let i=r[0];if(i===void 0)throw new W_(`${t} has no element type`);return b_(e,i[0],i[1])},n=R_.exec(t);if(n)return{kind:"vector",size:z_(n[1]),scalar:p_(i(),"a vector")};let l=x_.exec(t);if(l){if(p_(i(),"a matrix")!=="f32")throw new W_("a matrix of a type other than f32");return{kind:"matrix",columns:z_(l[1]),rows:z_(l[2])}}if(t==="atomic"){let e=p_(i(),"an atomic");if(e==="f32")throw new W_("an atomic of f32");return{kind:"atomic",scalar:e}}if(t==="array"){let t=i(),n=r[1]===void 0?null:e_(e,r[1][0],r[1][1]);return{kind:"array",element:t,count:n,stride:cK(F_(t),n_(t))}}return null}function b_(a,b,c){return (b_=$c0C(18)).call(this,a,b,c)}function zaK(e,t,r,i){let n=e.tokens,l=[],s=0,o=1;for(let[a,u]of K_(n,r,i)){let v$3;{let t=a;let r=e.tokens,i=null,n=null,l=t;while(r[l]?.text==="@"){let t=a_(r,l+1).text;if(r[l+2]?.text!=="("){l+=2;continue}let s=U_(r,l+2,"(",")");if(t==="align")i=e_(e,l+3,s);else if(t==="size")n=e_(e,l+3,s);l=s+1}v$3={align:i,size:n,next:l};}let r=v$3;let i=a_(n,r.next).text;if(n[r.next+1]?.text!==":")throw new W_(`struct ${t}'s member ${i} has no type`);let d=b_(e,r.next+2,u),f=r.align??n_(d),c=r.size??(d.kind==="array"&&d.count===null?0:F_(d));s=cK(s,f),l.push({name:i,type:d,offset:s}),s+=c,o=Math.max(o,f)}return{kind:"struct",name:t,members:l,align:o,size:cK(s,o)}}var c_=new Set(["vertex","fragment","compute"]);function l_(e,t,r){for(let i=r;i<e.length;i++)if(e[i].text===t)return i;throw new W_(`no ${t} after ${e[r]?.start??-1}`)}function GaK(a,b,c){return (GaK=$c0C(19)).call(this,a,b,c)}function $aK(a,b,c){return ($aK=$c0C(20)).call(this,a,b,c)}var o_=null;function d_(e){if(o_!==null&&o_.source===e)return o_.shape;let t=XaK(e);return o_={source:e,shape:t},t}function XaK(a){return (XaK=$c0C(21)).call(this,a)}function s_c(e){try{return d_(e).storage.map(({group:e,binding:t,name:r,access:i})=>({group:e,binding:t,name:r,access:i}))}catch(e){if(e instanceof W_)return[];throw e}}function jve(e){let t;try{t=d_(e)}catch(e){if(e instanceof W_)return null;throw e}let r=t.scope.tokens,i=new Map(t.functions.map((e)=>[e.name,e])),n=new Map;for(let e of t.functions){if(e.stage===null)continue;let l=new Set,s=new Set,o=[e];for(let e=o.pop();e!==void 0;e=o.pop()){if(s.has(e.name))continue;s.add(e.name),l.add(e.name);for(let n=e.bodyFrom;n<e.bodyTo;n++){let e=r[n];if(e.kind!=="ident"||r[n-1]?.text===".")continue;let s=i.get(e.text);if(s)o.push(s);else if(t.moduleVars.has(e.text))l.add(e.text)}}n.set(e.name,{stage:e.stage,names:l})}return n}var h_="lume_m_",X_;function G_(e){if(e.kind==="array")return e.element;if(e.kind==="matrix")return{kind:"vector",size:e.rows,scalar:"f32"};if(e.kind==="vector")return{kind:"scalar",scalar:e.scalar};throw new W_(`a ${e.kind} has no element`)}function j_(a){return (j_=$c0C(23)).call(this,a)}function ZaK(e,t){let r=`${h_}${e.decl.name}_t`;switch(t.kind){case"scalar":return t.scalar==="u32"?`return ${r}(w)[w & 3u];`:`return bitcast<${t.scalar}>(${r}(w)[w & 3u]);`;case"vector":{let e=`${r}(w)`;if(t.size===3)e=`${r}(w).xyz`;else if(t.size===2)e=`select(${r}(w).zw, ${r}(w).xy, (w & 2u) == 0u)`;return t.scalar==="u32"?`return ${e};`:`return bitcast<vec${t.size}<${t.scalar}>>(${e});`}case"matrix":{let r=Z_(e,G_(t)),i=t.rows===2?2:4;return`return mat${t.columns}x${t.rows}<f32>(${Array.from({length:t.columns},(e,t)=>`${r}(w + ${t*i}u)`).join(", ")});`}case"array":return`var r: ${j_(t)};
  for (var i = 0u; i < ${t.count??0}u; i++) { r[i] = ${Z_(e,t.element)}(w + i * ${t.stride/4}u); }
  return r;`;case"struct":{let r=t.members.map((t)=>`${Z_(e,t.type)}(w + ${t.offset/4}u)`);return`return ${t.name}(${r.join(", ")});`}case"atomic":throw new W_("an atomic in read-only storage")}}function Z_(e,t){let r=`${h_}${e.decl.name}_${j_(t).replace(/\W+/g,"_")}`;if(e.loaders.has(r))return r;e.loaders.set(r,"");e.loaders.set(r,`fn ${r}(w: u32) -> ${j_(t)} {
  ${ZaK(e,t)}
}`);return r}function laK(a){return $c0C(24).call(this,a)}function wbn(e,t){try{return IaK(e,t)}catch(e){if(e instanceof W_)return{refused:e.message};throw e}}function IaK(e,t){let r=d_(e),i=r.scope.tokens,n=new Map;for(let e of r.storage){let i=e.access==="read"?t(e):!1;if(i!==!1)n.set(e.name,{decl:e,type:b_(r.scope,e.typeFrom,e.typeTo),loaders:new Map,needsLength:!1,storage:i==="storage"})}if(n.size===0)return{code:e,lowered:[]};let l=[];for(let{decl:e,storage:t}of n.values())l.push({from:a_(i,e.varAt).start,to:a_(i,e.declTo).end,text:`var ${h_}${e.name}: ${t?"texture_storage_2d_array<rgba32uint, read>":"texture_2d_array<u32>"};`});for(let t of r.functions){let r=k_(i,t);for(let e of r.keys())if(n.has(e))throw new W_(`fn ${t.name} declares ${e}, a lowered variable's name`);let s={tokens:i,source:e,byName:n,pointers:new Map},o=new Map,a=t.bodyFrom;while(a<t.bodyTo){let e=M_(s,a,t.bodyTo);if(e){l.push(CaK(s,a,e,o));}a=e?e.next:a+1}for(let e of o.values()){gaK(i,r.get(e[0].base)??[],e,l)}}l.sort((e,t)=>e.from-t.from);let s="",o=0;for(let t of l)s+=e.slice(o,t.from)+t.text,o=t.to;s+=e.slice(o);let a=[...n.values()].flatMap(laK);return{code:`${s}

${a.join(`

`)}
`,lowered:[...n.values()].map(({decl:e})=>({group:e.group,binding:e.binding,name:e.name,access:e.access}))}}function k_(e,t){let r=new Map,i=(e,t)=>void r.set(e,[...r.get(e)??[],t]);for(let r=t.paramsFrom;r<t.paramsTo;r++){if(e[r].kind==="ident"&&e[r+1].text===":"){i(e[r].text,t.bodyFrom-1);}}for(let r=t.bodyFrom;r<t.bodyTo;r++){let t=e[r].text;if(t!=="let"&&t!=="var"&&t!=="const")continue;i(e[e[r+1].text==="<"?B_(e,r+1)+1:r+1].text,t==="let"&&e[r-1].text!=="("?l_(e,";",r):1/0)}return r}function CaK(e,t,r,i){let{tokens:n}=e,l=e.byName.get(n[t].text)?.type,s=r.next-t,o=s===4?"0":n[t+4]?.text,a=`${n[t].text} ${n[t+2]?.text}`;if(l?.kind==="array"&&l.stride===4&&l.element.kind==="scalar"&&n[t+2].kind==="ident"&&(s===4||s===6&&n[t+3].text==="+")&&/^\d+[iu]?$/.test(o))i.set(a,[...i.get(a)??[],{name:n[t].text,scalar:l.element.scalar,base:n[t+2].text,k:Number.parseInt(o,10),at:t,edit:r.edit}]);return r.edit}function gaK(e,t,r,i){if(t.length!==1||t[0]===1/0)return;let n=U_(e,t[0]+1,"{","}",1),l=r.filter((e)=>e.at>t[0]&&e.at<n),s=new Set(l.map((e)=>e.k)),o=Math.min(...s),a=(Math.max(...s)-o+3>>2)+1;if(a>=s.size)return;let u=`${h_}run${i.length}`,d=` let ${u}_w = u32(${r[0].base}) + ${o}u; let ${u}_s = ${u}_w & 3u;`;for(let e=0;e<a;e++)d+=` let ${u}_${e} = ${h_}${r[0].name}_t(${u}_w + ${4*e}u);`;i.push({from:e[t[0]].end,to:e[t[0]].end,text:d});for(let e of l){let t=[0,1,2,3].map((t)=>`${u}_${t+e.k-o>>2}.${"xyzw"[t+e.k-o&3]}`);e.edit.text=`bitcast<${e.scalar}>(select(select(select(${t[0]}, ${t[1]}, ${u}_s == 1u), ${t[2]}, ${u}_s == 2u), ${t[3]}, ${u}_s == 3u))`}}function xaK(a,b,c){return (xaK=$c0C(25)).call(this,a,b,c)}function s_(e,t,r,i,n,l){let{tokens:s}=e,o=i,a=[],u=0,d=n;while(d<l){let r=s[d].text;if(r==="["&&(o.kind==="array"||o.kind==="matrix")){let t=U_(s,d,"[","]"),r=G_(o);a.push(`u32(${xaK(e,d+1,t)}) * ${(o.kind==="array"?o.stride:n_(r))/4}u`);o=r;d=t+1}else if(r==="."&&o.kind==="struct"){let e=s[d+1]?.text,r=o.members.find((t)=>t.name===e);if(!r)throw new W_(`${t.decl.name} has no member ${e??""}`);u+=r.offset,o=r.type,d+=2}else break}return{offset:[r,`${u/4}u`,...a].filter((e)=>e!=="").join(" + "),type:o,next:d}}function L_(e,t){return`${Z_(e,t.type)}(${t.offset})`}var V_=(e,t,r,i)=>({edit:{from:a_(e.tokens,t).start,to:a_(e.tokens,r.next-1).end,text:i},next:r.next});function JaK(a,b){return (JaK=$c0C(26)).call(this,a,b)}function daK(a,b,c){return (daK=$c0C(27)).call(this,a,b,c)}function M_(a,b,c){return (M_=$c0C(28)).call(this,a,b,c)}function Ji(e,t,r){let i=e[t];if(typeof i==="function")Reflect.set(e,t,r(i.bind(e)))}var Oi="lume_u_",Gi=/\bvar\s*<\s*uniform\s*>\s*([A-Za-z_]\w*)/g;function ULz(a){return (ULz=$c0C(29)).call(this,a)}function ni(a,b,c,d,e,f){return (ni=$c0C(30)).call(this,a,b,c,d,e,f)}function mLz(e){if(e.kind==="array"&&e.count!==null)return e.count;if(e.kind==="matrix")return e.columns;if(e.kind==="vector")return e.size;throw new W_(`a ${e.kind} of no fixed length`)}function Ti(e,t,r,i){if(r-t===1)return`${i}return ${e}[${t}];
`;let n=t+r>>1;return`${i}if (i < ${n}u) {
${Ti(e,t,n,`${i}  `)}${i}}
${Ti(e,n,r,i)}`}function cLz(e){let t=d_(e),r=t.scope.tokens,i=new Map(t.uniforms.map((e)=>[e.name,e])),n=new Map,l=new Map,s=function(e,t){let n=r[t],s=n.kind==="ident"&&r[t-1]?.text!=="."?i.get(n.text):void 0;if(s===void 0)return;let o=l.get(e.name);if(o===void 0)l.set(e.name,o=k_(r,e));return o.has(s.name)?void 0:s},o=new Map;for(let{stage:t,names:r}of jve(e)?.values()??[])for(let e of r)jCw(o,e).add(t);let a=(e)=>o.get(e.name)?.has("vertex")===!0,u=new Map,d=new Set;for(let e of t.functions){let r=o.get(e.name);if(r===void 0)continue;for(let i=e.bodyFrom;i<e.bodyTo;i++){let l=s(e,i);if(l===void 0)continue;if(a(e)&&ni(t,n,l,i,e.bodyTo,!0)!==null)d.add(l.name);if(ni(t,n,l,i,e.bodyTo,!1)===null)continue;let o=jCw(u,l.name);for(let e of r)o.add(e)}}let f=new Set(Array.from(u).flatMap(([e,t])=>t.has("vertex")&&t.has("fragment")?[e]:[]));for(let e of f)d.add(e);return{shape:t,types:n,picked:d,uniformAt:s,pickedSite:function(e,r,i,l){if(a(e))return ni(t,n,r,i,l,!0);return f.has(r.name)?ni(t,n,r,i,l,!1):null}}}function PLz(a,b){return (PLz=$c0C(31)).apply(this,arguments)}var Rn=new WeakSet;var eZu=(function(e){return Rn.has(e)});function BP0(e){Rn.add(e)}var Vn=(function(e,t){if((t&1)===0||!eZu(e)||ma(e))return null;return e.queue.onSubmittedWorkDone()});function wa0(e,t,r,i){let n=Vn(e,1);if(n===null)return t.mapAsync(1,r,i);return n.then(()=>t.mapAsync(1,r,i))}var On=/@interpolate\(\s*flat\s*(?:,\s*first\s*)?\)/g,hn,xn=/@interpolate\(\s*perspective\s*,\s*sample\s*\)/g,Pn=/\b(dpdx|dpdy|fwidth)Fine\s*\(/g;function bP0(a,b){return (bP0=$c0C(33)).call(this,a,b)}function ZP0(e,t){if(typeof e.createShaderModule!=="function")return;let r=e.createShaderModule.bind(e);e.createShaderModule=function(e){let i=bP0(e.code,t);return r(i===e.code?e:{...e,code:i})}}var Qn={texture_depth_2d:"texture_2d<f32>",texture_depth_2d_array:"texture_2d_array<f32>",texture_depth_multisampled_2d:"texture_multisampled_2d<f32>",texture_depth_cube:"texture_cube<f32>"},En=/\b([A-Za-z_]\w*)\s*:\s*(texture_depth_2d_array|texture_depth_2d|texture_depth_multisampled_2d|texture_depth_cube)\b/g,fn=/\b(textureLoad|textureSample|textureSampleLevel|textureSampleBias|textureSampleGrad)\s*\(\s*([A-Za-z_]\w*)\b/g,sn=/\btextureGather\s*\(\s*([A-Za-z_]\w*)\b/g;function MP0(e){let t=new Set;for(let r of e.matchAll(En)){if(!(new RegExp(`\\btexture(?:Sample|Gather)Compare(?:Level)?\\s*\\(\\s*${(r[1])}\\b`).test(e)))t.add(r[1]);}if(t.size===0)return e;let r=e.replace(En,(e,r,i)=>t.has(r)?`${r}: ${Qn[i]}`:e),i=[];for(let e of r.matchAll(fn)){if(!t.has(e[2])||e.index===void 0)continue;let n=P3B(r,r.indexOf("(",e.index))+1;if(n>0)i.push(n)}let n=r;for(let e of i.sort((e,t)=>t-e))n=`${n.slice(0,e)}.x${n.slice(e)}`;return n.replace(sn,(e,r)=>t.has(r)?`textureGather(0, ${r}`:e)}function aP0(a){return (aP0=$c0C(34)).call(this,a)}function uP0(e){Ji(e,"createShaderModule",(e)=>function(t){let r=MP0(t.code);return e(r===t.code?t:{...t,code:r})});Ji(e,"createBindGroupLayout",(e)=>(t)=>e(aP0(t)))}var on=4,Sn=8;function nn(e){if(e.textureBindingViewDimension!==void 0)return e;if((e.dimension??"2d")!=="2d"||(e.usage&(on|Sn))===0||(e.sampleCount??1)>1||Iv(e.size)[2]!==1)return e;return{...e,textureBindingViewDimension:"2d-array"}}function R0F(e,t,r){return eZu(e)?{...t,textureBindingViewDimension:r}:t}var aqF="depth16unorm",Gjw="depth32float",c5x=2,roo=0.000015259021896696422,chq=0.00000005960464477539063,Ez4="r16uint",$2U="r32uint",NLX=255,p6=0.0001,H0q=p6.toFixed(6),k9X={color:{operation:"add",srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha"},alpha:{operation:"add",srcFactor:"one",dstFactor:"one-minus-src-alpha"}},WN8={color:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}},jEz="depth32float",Zjv="rg16float",u2p=k9X,ztC="r32float",XGS="rg32float",eut=0,EuQ=1,K9_="0.0",iJU="1.0",Raz="vec4<f32>(0.0, 0.0, -1.0e6, 1.0)",xEu=0.00004,lvr="4e-5",uM_=((e,t,r)=>`(${e} - select(0.0, 1.0, select(dot((frame.view * vec4<f32>(${t}, 0.0)).xyz, (frame.view * vec4<f32>(${r}, 1.0)).xyz) > 0.0, 0.0 > (frame.view * vec4<f32>(${t}, 0.0)).z, frame.proj[3][3] > 0.5)))`),OO8=0.015625,M6="0.015625",IMy=16,JNY=(e,t,r,i)=>[`  var ${e}: f32 = 0.0;`,t===null?"  {":`  if (${t} != 0.0) {`,`    let ${e}N = (frame.view * vec4<f32>(${r}, 0.0)).xyz;`,`    let ${e}P = (frame.view * vec4<f32>(${i}, 1.0)).xyz;`,`    let ${e}S = 2.0 * (abs(${e}N.x) / (frame.proj[0][0] * frame.viewportSize.x) + abs(${e}N.y) / (frame.proj[1][1] * frame.viewportSize.y));`,`    let ${e}D = ${e}S * -${e}P.z;`,`    ${e} = select(${e}D / max(abs(dot(${e}N, ${e}P)), abs(${e}D) / 16.0 + 1e-30), ${e}S / max(abs(${e}N.z) * max(-${e}P.z, 0.0), ${e}S + 1e-30), frame.proj[3][3] > 0.5);`,"  }"],dp3=((e,t)=>t===null?`${e} * ${lvr}`:`${e} * (${lvr} + ${M6} * ${t})`),z5e=`M.layer.x * ${M6} * 1.0625 * ownStep`,B6=0.00000005960464477539063,W6=4*B6/xEu,Z6=W6.toExponential(6),gsg=(e,t)=>`(${e}.z + select(max(${e}.z + frame.proj[2][2] * ${e}.w, ${Z6} * ${e}.z), max(frame.proj[3][2] * ${e}.w - ${e}.z, ${Z6} * frame.proj[3][2] * ${e}.w), frame.proj[3][3] > 0.5) * (${t}))`,cCW=(e,t)=>`(${e} + select(max(${e} + frame.proj[2][2], ${Z6} * ${e}), max(frame.proj[3][2] - ${e}, ${Z6} * frame.proj[3][2]), frame.proj[3][3] > 0.5) * (${t}))`;function kUu(e,t,r,i){return e+(i[15]>0.5?Math.max(i[14]*t-e,W6*i[14]*t):Math.max(e+i[10]*t,W6*e))*r}var jkq=`  out.position.z = ${gsg("out.position",`-${lvr}`)};`,FTW=1073741824,GiN=(e)=>`(${e} >= ${FTW}u)`;function Ig_(e){return{...e,firstInstance:(e.firstInstance??0)+FTW}}var wm3=536870912,cxt=268435456,UWi=(e)=>`(${e} & ${cxt-1}u)`,J$A=134217728,cIX=67108864,nAs=33554432,ulw=(e)=>`(${e} & ${nAs-1}u)`,ncg=(e,t)=>`  if ((${t} && (${e} & ${cxt}u) != 0u) || (!(${t}) && (${e} & ${wm3}u) != 0u)) {
    out.position = vec4f(2.0, 2.0, 0.5, 1.0);
  }`,dlr="greater-equal",M3L="greater",mEK="less-equal";function kXg(e){if(e===void 0)return{};return na(e);}var nWH=1,d6="less-equal",nEG={minFilter:"nearest",magFilter:"nearest",lodMinClamp:0,lodMaxClamp:0};var Yyk=(function(e,t,r,i,n,l=aqF){return{quad:`let size = vec2<f32>(textureDimensions(${e}, 0));
  let p = ${r} * size - 0.5;
  let i = floor(p);`,weights:"let w = round((p - i) * 256.0) / 256.0;",reference:`let r = ${l==="depth16unorm"?`round(clamp(${n}, 0.0, 1.0) * 65535.0) / 65535.0`:n};`,test:`vec4<f32>(r) ${d6==="less-equal"?"<=":"<"} textureGather(0, ${e}, ${t}, (i + 1.0) / size, ${i})`,filtered:"mix(mix(c.w, c.z, w.x), mix(c.x, c.y, w.x), w.y)"}});var o6=(function(e){let t=Yyk("t","s","uv","layer","reference",e);return`t: texture_2d_array<f32>, s: sampler, uv: vec2<f32>, layer: i32, reference: f32) -> f32 {
  ${t.quad}
  ${t.weights}
  ${t.reference}
  let c = select(vec4<f32>(0.0), vec4<f32>(1.0), ${t.test});
  return ${t.filtered};
}`});var BWh=`fn lume_shadowCompare(${o6(aqF)}`,Wp_=`fn lume_atlasShadowCompare(${o6(Gjw)}`;var voF=(function(e){return e===aqF?nWH:eut});var sb1="depth24plus-stencil8";function WXa(e){return e==="count"||e==="depth"}function hku(e){return e==="atlas"?"atlas":!1}function wek(a){return (wek=$c0C(35)).call(this,a)}function lg1(e){if(WXa(e)){return wek(e);}return{format:e==="atlas"?Gjw:aqF,depthWriteEnabled:!0,depthCompare:d6}}function Ij1(e,t=dlr){return{format:jEz,depthWriteEnabled:e,depthCompare:t}}var F__=(function(e){if(!e)return aqF;if(e==="atlas")return Gjw;return`${sb1}/census${e==="depth"?"-depth":""}`});var Y6="rg11b10ufloat",D6=Object.freeze([6,6,5]),mNi=Object.freeze({rgba16float:[65504,65504,65504],rg11b10ufloat:[65024,65024,64512]}),Q6=Object.freeze({samples:1,colorFormat:"rgba16float",casterFragmentStub:!1,hiddenSurfaceRemoval:!1,edgeSmoothing:!1}),v6=Q6,r6=["samples","colorFormat","casterFragmentStub","hiddenSurfaceRemoval","edgeSmoothing"];function y9N(e){if($Oy(v6,e,r6)&&v6.headsetFrame===!0===(e.headsetFrame===!0)&&v6.sceneDepthKept!==!1===(e.sceneDepthKept!==!1)&&v6.fourSampleSurface!==!1===(e.fourSampleSurface!==!1))return;v6=Object.freeze({...e})}var MMU=(function(){return v6});var S1x=(function(e,t){let r=v6;v6=e;try{return t()}finally{v6=r}});var OTV=(function(){return MMU().samples});var Cc4=(function(){return MMU().headsetFrame===!0});var yFv=(function(){return MMU().sceneDepthKept!==!1});function A30(){return MMU().fourSampleSurface!==!1}var f2D=(function(e){return!eZu(e)});function scD(){return OTV()===1&&yFv()}function h1Q(){return MMU().casterFragmentStub}function SEr(){return MMU().hiddenSurfaceRemoval}var j0A=(function(){let e=MMU();return e.edgeSmoothing&&e.samples===1});var lll=(function(e){return e.features.has("rg11b10ufloat-renderable")?"rg11b10ufloat":"rgba16float"});var GN8=(function(e,t){return t!=="rgba16float"||!eZu(e)});var QrL=(function(){return MMU().colorFormat});function udX(){return yFv()?"rgba16float":QrL()}function tfV(e={}){return`${e.tooling===!0?udX():QrL()}/${jEz}/s${OTV()}${e.motion?`/motion-${Zjv}`:""}`}function ny2(e={}){let t=[{format:e.tooling===!0?udX():QrL(),...e.blend?{blend:e.blend}:{},...e.writeMask!==void 0?{writeMask:e.writeMask}:{}}];if(e.motion)t.push({format:Zjv,...e.motionBlend?{blend:e.motionBlend}:{},...e.motionWriteMask!==void 0?{writeMask:e.motionWriteMask}:{}});return t}function Yk4(e,t,r,i,n){e.addRenderPass(t,{colorAttachments:[{view:i,format:$2U,store:"store"}],depthStencil:n,draws:r.mask})}function rii(e,t,r,i,n,l){e.addRenderPass(t,{colorAttachments:[{view:n,format:QrL(),load:"load",store:"store"}],depthStencil:{view:l,format:jEz,samples:1,depthReadOnly:!0},draws:r.through(i)})}var osb="lightingSunShadows",CLc="lightingFog",Epe="lightingCloudFill",YkO="lightingCloudShadow",lDy=`select(0u, passLights.globalLightCount, ${Jmk})`,GT9="lightingCellLight",b4A="lightingLocalShadows",Ju$="lightingRects",vTI="lightingCloudSea",U2A="lightingAir",nD5="lightingCapture",RGd="lightingFans",vS8="lightingFarLand",w2f="lightingFogSky",xpx="lightingSurfaceArm",wKC="LIGHTING_SURFACE_ARMS",sTq=1,eS_=2,ZTr=4,mOt=8,NxB=16,II1=32,ptm=64,ALi=128,BP9=256,vg9=512,Gop=1024,VlH=2048,s9h=4096,zkI=8192,Mb8=eS_|ZTr|VlH,tfq=[eS_,ZTr,VlH,eS_|ZTr,eS_|VlH,ZTr|VlH,Mb8],u_B=NxB|II1|ptm|ALi|BP9|vg9,MHn=mOt|ZTr|vg9,y6=!1,SW=!1,ZW=!1,I6=!1,u6=null,wW=!1,I4=null,bW=null,kW=!1,BW=!1,z6=!1,xW=!1,GW=!1,WW=!1,XW=!1,JW=!1,q6=!0,iW=!1,G4=!1,P6=!1,sW=!1,nW=-1,U6=!0,$6=!1,b6=!1,A6=!1,EW=!1,F6=!1,E6=!1,uW=!1,OW=!1,a6=!1,k6=!1,C6=!1,J6=!0,w6=new WeakSet,H6=0,n6=!1,N6=!1,TW=!1,dW=!1,KW=null,HW=null,_6=!1,R6="",VW=0,eW="",L6=0;var ose=(function(e,t=e){y6=e,SW=t,u6=null});function _xc(){return wW&&!I6}function Bg$(){return wW}var $ue=(function(){return I4??=!wW&&!ic3()});function MDD(){return bW??=$ue()&&!_sL()}function n$N(e){u6=null,wW=e}function g7l(){return u6??=SW&&_xc()}function izM(){return I6&&(dW||ic3())}var oaR=(function(e){dW=e});var j4E=(function(e){I6=e});var eKF=(function(e){ZW=e});var Zf6=(function(){return SW&&ZW});var gpW=(function(e,t=e){BW=e,z6=t});function pcp(){return BW&&!ZW&&xW}function JGj(){return y6||BW?j6():0}function j6(){return(WW?0:eS_)|(XW||JW&&q6?0:ZTr)|(iW?0:VlH)}function T9C(){let e=f6();return(SW&&!xW?sTq:0)|(y6||z6?j6():0)|e|(e&&!_W?ALi:0)}function f6(){return(y6||z6)&&!Wmw()?Gop:0}function Wmw(){return WW||TW}function $GF(){TW=!0}function yX3(e,t,r=!1,i=!1,n){if(kW=!0,G4||=e,t)b6=A6=!0;if(P6=r,n===void 0)sW=i;else BLJ(i,n)}var BLJ=(function(e,t){if(t!==nW){if(nW>=0&&U6)sW=!0;nW=t,U6=!0}if(U6&&=e,!e)sW=!1});function lhA(e,t,r,i=!1,n=!1,l=!0){if(E6=!0,uW||=e,OW||=t,a6||=r,r&&(l||KW===null))k6=!0;C6||=i||r,F6||=!n}function yJS(){EW=!0}function cjf(){A6=!0}var iC9=(function(e){J6=e});function $W(){return ($W=$c0C(36)).call(this)}function PGd(){let e=[Zf6(),Zf6()&&!I6,SW&&!ZW,kW,E6,sW,G4,P6,$6,b6,A6,EW,xW,_W,N6,KW!==null,HW!==null];return"once beside lean packed named sun-cut sun-stood sun-owed fog-stood fill-stood cloud-stood fogsky-stood lights-stood air-stood fan-stood lanes-sealed lanes-kept".split(" ").filter((t,r)=>e[r]).join(" ")}var K6d=(function(){return SW&&!ZW?(G4&&!sW?0:mOt)|($6?0:NxB)|(b6?0:II1)|((A6||s6||(!1)&&C6)?0:s9h)|(EW?0:zkI)|(N6?0:vg9):0});function neZ(){return T9C()|$W()}function nik(){return Zf6()&&!I6&&sW?mOt|(N6?0:vg9):0}function Tpt(){return SW&&!N6?vg9:0}function mas(){return Zf6()?$W()|nik()|Tpt():K6d()}function Ypd(){return JGj()|(y6&&!(G4||P6||uW&&J6)?mOt:0)|$X0()|(MYO()?((b6||a6?0:II1)|(V6||s6?0:ptm)|(_W?0:ALi)|(N6?0:vg9)):0)|TX0()}function MYO(){return!y6&&SW&&ZW&&!Cc4()}function d1F(){return y6&&dW&&!I6&&!Cc4()}function $kw(){return y6&&!Cc4()}var DW=II1|ptm|ALi;function qW(){return(b6||k6?II1:0)|(cuh()?ptm:0)|(_W||!f6()?ALi:0)}function TX0(){if(!d1F())return 0;{if(KW===null)_6=HW!==null||E6,eW=R6,L6=VW,KW=_6?DW&~(HW??0):0;return KW&~qW()
}}var UW="lit-terms:";function VFC(e){if(KW===null||!_6||eW!==e||L6!==VW)return null;return`${UW}${e}:${(DW&~(KW&~qW())).toString(36)}`}function Jrv(e,t,r=!1){if(R6=t,r)VW+=1;if(!Array.isArray(e))return;let i=`${UW}${t}:`;for(let t of e){if(typeof t!=="string"||!t.startsWith(i))continue;let e=parseInt(t.slice(i.length),36);if(Number.isSafeInteger(e)&&e>=0)HW=e&DW}}function Fe6(){return Cc4()||MYO()}function $X0(){if(!y6||!Cc4())return 0;return(xW?0:sTq)|($6||OW?0:NxB)|(b6||a6?0:II1)|(V6?0:ptm)|(_W?0:ALi)|(n6?0:BP9)|(N6?0:vg9)}var IW=[],O6=4,mW=0;function GTs(){if(!Fe6())return 0;let e;{e=qa()}return e}function Zq6(){return mW}function MYK(){return IW.slice(1)}function PYw(){return MYO()?GTs():JGj()}var K6=[[sTq,Jmk],[eS_,GT9],[ZTr,b4A],[mOt,osb],[NxB,CLc],[II1,Epe],[ptm,vTI],[ALi,U2A],[BP9,nD5],[vg9,RGd],[Gop,vS8],[VlH,Ju$],[s9h,YkO],[zkI,w2f]];function PUA(e){let t=0;for(let[r,i]of K6)if(e.includes(`override ${i}:`))t|=r;return t}function Qjt(){N6=!0}function ebK(){n6=!0}function lJy(){XW=!0}function JnW(){JW=!0}var kHm=(function(e){q6=e});function Jyn(){return{stood:XW,named:JW,castByClass:q6,deadTerms:JGj(),passFolds:T9C()}}function CJa(){iW=!0}function OO_(){xW=!0}var k5O=(function(e,t){if(t){if(!w6.has(e))w6.add(e),H6+=1;xW=!0}else if(w6.delete(e))H6-=1});function okW(){GW=!0}function iMp(){return!GW&&!!T9C()}var Z7P=(function(){return SW&&xW&&H6===0});function hT2(){WW=!0}var V6=!1;function oSr(){V6=!0}function N0P(){return V6}var s6=!1;function Qe2(){s6=!0}function PkI(){return s6}function cuh(){return V6||s6||S6}var S6=!1;function Rta(e=!0){if(e||KW===null)S6=!0}var Gq5=1,_W=!1;function N3S(){$6=!0}function xX3(){_W=!0}function ysP(e,t){if(!y6)return 0;return(e?0:Gq5)|jBr(t)}function ooS(e){return Ypd()|jBr(e)}var vU6=(()=>NxB|ptm|ALi)();function jBr(e=$6){if(!y6&&!(BW&&(dW||ic3())))return 0;return(e?0:NxB)|(V6?0:ptm)|(_W?0:ALi)}var pW=["lights","cell","shadow","sun","fog","fill","sea","air","capture","fans","land","rects","cloud","fogsky"],X6=new Map;function JX0(e){let t=pW.map((t,r)=>e&1<<r?`/${t}-fold`:"").join("");return X6.set(e,t),t}function oys(e){return X6.get(e)??JX0(e)}function AXy(e){return pW.some((t)=>e.includes(`/${t}-fold`))}function E_n(e){return e.includes("/lights-fold")}function EC0(e){if(!e)return;let t={};for(let[r,i]of K6)if(e&r)t[i]=0;return t}var v3=(()=>globalThis.__spawnEngineConsole??=Object.create(console))(),jw_=16,rj={maxBindGroups:4,maxBindingsPerBindGroup:1000,maxUniformBuffersPerShaderStage:12,maxStorageBuffersPerShaderStage:8,maxStorageBuffersInVertexStage:8,maxStorageBuffersInFragmentStage:8,maxSamplersPerShaderStage:16,maxSampledTexturesPerShaderStage:jw_,maxStorageTexturesPerShaderStage:4,maxStorageTexturesInVertexStage:4,maxStorageTexturesInFragmentStage:4},Vj=[["vertex",1],["fragment",2],["compute",4]],kj=["uniform buffers","storage buffers","samplers","sampled textures","storage textures"];function Tj(){return["compute",7,["uniform buffers","storage buffers","storage textures"]]}var Xj={"uniform buffers":"maxUniformBuffers","storage buffers":"maxStorageBuffers",samplers:"maxSamplers","sampled textures":"maxSampledTextures","storage textures":"maxStorageTextures"};function lj(e,t,r){return frM(r,Xj[e],t,rj[`${Xj[e]}PerShaderStage`]??0)}function fQ1(e,t){let r={"uniform buffers":0,"storage buffers":0,samplers:0,"sampled textures":0,"storage textures":0};for(let i of e){for(let e of i){if((e.visibility&t)!==0){{let e$8=r,t$6=e;{let e=e$8,t=t$6;if(t.buffer!==void 0)e[t.buffer.type===void 0||t.buffer.type==="uniform"?"uniform buffers":"storage buffers"]+=1;if(t.sampler!==void 0)e.samplers+=1;if(t.texture!==void 0)e["sampled textures"]+=1;if(t.storageTexture!==void 0)e["storage textures"]+=1;if(t.externalTexture!==void 0){{e["sampled textures"]+=4,e.samplers+=3,e["uniform buffers"]+=1
}}}}}}}return r}function Anw(e,t,r=!1){let i=[];for(let[n,l,s]of r?[...Vj,Tj()]:Vj){let r=fQ1(e,l);for(let e of s??kj){let{limit:l,limitName:o}=lj(e,n,t);if(r[e]>l){{let s$1=s,n$1=n,e$49=e;{let s=s$1,n=n$1,e=e$49;i.push({stage:s?"layout":n,kind:e,count:r[e],limit:l,limitName:o})
}}}}}return i}function s$2(e){return(Vj.find(([t])=>t===e)??Tj())[1]}var MiQ=(e)=>e.stage==="layout"?"across its groups and stages":`in the ${e.stage} stage`;function jaR(e){let t=Reflect.get(e,"limits");return uLW(t)?t:void 0}var Nj=new WeakMap,Ij=new WeakMap,jj=new WeakSet;function poq(e,t=(e)=>v3.warn(`[lume] ${e}`)){if(jj.has(e))return;if(jj.add(e),typeof e.createBindGroupLayout!=="function"||typeof e.createPipelineLayout!=="function")return;let r=jaR(e);if(r!==void 0)Ij.set(e,r);let i=e.createBindGroupLayout.bind(e);e.createBindGroupLayout=(function(e){let t=i(e);return Nj.set(t,Array.from(e.entries)),t});let n=e.createPipelineLayout.bind(e);e.createPipelineLayout=function(i){if(r===void 0)return n(i);let l=[];for(let e of i.bindGroupLayouts)if(e!==null&&e!==void 0)l.push(Nj.get(e)??[]);let s=!1;for(let n of Anw(l,r,eZu(e))){let v$32;{let n$5=n,s$3=s;{let n=n$5,s=s$3;t((`pipeline layout "${(i.label??"(unlabeled layout)")}" binds ${n.count} ${n.kind} ${MiQ(n)}; this device grants ${n.limit} (${n.limitName}) \u2014 the browser refuses every pipeline built over the layout`));s||=n.stage==="layout";
v$32=s;}}s=v$32}return n(s?({label:i.label,bindGroupLayouts:[]}):i)}}function gpj(e,t){let r=Ij.get(e);if(r===void 0)return[];let i=Uhq(e)?.fittedEntries(t)??null,n=[];return t.forEach(function(e,t){if(e!==null&&e!==void 0)n.push(i?.[t]??Nj.get(e)??[])}),Anw(n,r,eZu(e))}function sFa(e,t){let r=[];for(let e of t){let t=Nj.get(e);if(!t)return!1;r.push(t)}return Anw(r,Ij.get(e)??rj,eZu(e)).length===0}async function Loq(e,t,r){let i=[];for(let e=0;e<r;e++)i.push(RDp(e,t,"read-only-storage"));return e.pushErrorScope("validation"),e.createBindGroupLayout({label:"lume storage room proof",entries:i}),await e.popErrorScope().catch(()=>null)===null}async function roq(e){let t=jaR(e);if(typeof e.pushErrorScope!=="function"||typeof e.createBindGroupLayout!=="function"||t===void 0)return null;let r={};await Promise.all(Vj.map(async function([i,n]){let{limit:l,limitName:s}=lj("storage buffers",i,t),o=l;while(o>0&&!await Loq(e,n,o))o--;if(o<l)r[s]=Math.min(o,r[s]??o)}));let i=Object.entries(r);if(i.length===0)return null;let n={};for(let e of[...Object.keys(t),...Object.getOwnPropertyNames(Object.getPrototypeOf(t)??{})])if(typeof Reflect.get(t,e)==="number")n[e]=Reflect.get(t,e);return Reflect.defineProperty(e,"limits",{value:Object.freeze({...n,...r}),configurable:!0,enumerable:!0}),`the device holds ${i.map(([e,t])=>`${e} ${t}`).join(", ")}, below its report`}function RMJ(e,t,r){let i=Ij.get(e)??jaR(e)??rj,n=(l,s,o=r)=>lj(o,l,i).limit-fQ1(t,s)[o]+(o==="storage buffers"&&Uhq(e)!==null?n(l,s,"sampled textures"):0),[l,s,o]=Tj(),a=eZu(e)&&Uhq(e)===null&&o.includes(r)?n(l,s):1/0;return{vertex:Math.min(a,n("vertex",1)),fragment:Math.min(a,n("fragment",2))}}function Ov9(e){let t=RMJ(e,[],"sampled textures").fragment;return eZu(e)?va(t,e):t}var q$=new WeakSet,_$=new WeakMap;function W6k(e,t,r){if(t)q$.add(e);else q$.delete(e);if(r)_$.set(e,r)}function gyC(e){return!q$.has(e)}var P$=new WeakSet;function ofu(e){P$.add(e)}function goO(e){return P$.has(e)}function $Et(e){return gyC(e)||fS1(e)}function fS1(e){return _$.get(e)==="seam"}function Cmj(e){return _$.get(e)==="bracket"}class YHe{constructor(e,t,r=null){this.device=void 0;this.send=void 0;this.open=null;this.passes=0;this.descriptor=void 0;this.device=e,this.send=r,this.descriptor={label:t}}get encoder(){return this.open??=this.device.createCommandEncoder(this.descriptor),this.open}begin(){this.encoder}forPass(){if(this.passes>0&&$Et(this.device))this.submit();return this.passes+=1,this.encoder}get pending(){return this.open!==null}submit(){let e=this.open;if(e===null)return;let t=this.passes;if(this.open=null,this.passes=0,this.send===null)this.device.queue.submit([e.finish()]);else this.send(e.finish(),t)}}var wta=17,sM=18,FM=19,KM={viewProj:"mat4x4<f32>",invViewProj:"mat4x4<f32>",prevViewProj:"mat4x4<f32>",eye:"vec4<f32>",prevEye:"vec4<f32>",shift:"vec4<f32>",grid:"vec4<u32>",depth:"vec4<f32>",haze:"vec4<f32>",ground:"vec4<f32>",mist:"vec4<f32>",phase:"vec4<f32>",gains:"vec4<f32>",motes:"vec4<f32>",flags:"vec4<f32>"},Vzy=NK("AirWindow",KM),{offsets:Rk6,sizeBytes:bM6}=WK(KM),PM=[v6R(wta,2,"float","2d-array"),RDp(sM,2,"uniform"),Zyu(FM,2,"filtering")],RJu="airWindow.depth.w < 0.5";function XIa(e){return`${Vzy}
@group(${e}) @binding(${wta}) var airVolume: texture_2d_array<f32>;
@group(${e}) @binding(${sM}) var<uniform> airWindow: AirWindow;
@group(${e}) @binding(${FM}) var airSampler: sampler;
fn shade_airAt(color: vec3<f32>, uv: vec2<f32>, t: f32) -> vec3<f32> {
  let slices = f32(max(airWindow.grid.z, 1u));
  let w = log(max(t, 0.0) / airWindow.depth.x + 1.0) / airWindow.depth.z;
  let edge = 0.5 / slices;
  let at = clamp(w - edge, edge, 1.0 - edge) * slices - 0.5;
  let near = floor(at);
  let plane = clamp(uv, vec2<f32>(0.0), vec2<f32>(1.0));
  let top = i32(textureNumLayers(airVolume)) - 1;
  let s = mix(textureSampleLevel(airVolume, airSampler, plane, min(i32(near), top), 0.0), textureSampleLevel(airVolume, airSampler, plane, min(i32(near) + 1, top), 0.0), at - near);
  return color * (1.0 - s.a) + s.rgb;
}
fn shade_airUv(P: vec3<f32>) -> vec3<f32> {
  let clip = airWindow.viewProj * vec4<f32>(P, 1.0);
  if (clip.w <= 1e-4) {
    return vec3<f32>(0.0, 0.0, -1.0);
  }
  return vec3<f32>(clip.xy / clip.w * vec2<f32>(0.5, -0.5) + vec2<f32>(0.5), 1.0);
}
fn shade_air(color: vec3<f32>, toward: vec3<f32>) -> vec3<f32> {
  if (${RJu}) {
    return color;
  }
  let at = shade_airUv(airWindow.eye.xyz + toward);
  if (at.z < 0.0) {
    return color;
  }
  return shade_airAt(color, at.xy, length(toward));
}
fn shade_airSky(color: vec3<f32>, direction: vec3<f32>) -> vec3<f32> {
  if (${RJu}) {
    return color;
  }
  let at = shade_airUv(airWindow.eye.xyz + direction);
  if (at.z < 0.0) {
    return color;
  }
  return shade_airAt(color, at.xy, airWindow.depth.y * 2.0);
}`}var qM="return vec4<f32>(color, 1.0);";function Irj(e){let t=e.lastIndexOf(qM);if(t<0)return e;return`${e.slice(0,t)}return vec4<f32>(shade_airSky(color, direction), 1.0);${e.slice(t+qM.length)}
${XIa(1)}`}var ZM=new WeakMap;function SMP(e){let t=ZM.get(e);if(t===void 0)t=e.createSampler({label:"lume air",minFilter:"linear",magFilter:"linear",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge",addressModeW:"clamp-to-edge"}),ZM.set(e,t);return t}function Nhp(e){if(e===null)return[];return[{binding:wta,resource:e.view},Y0r(sM,e.window),{binding:FM,resource:e.sampler}]}var PK=new Float64Array(1),VFZ=6360,FsC=6460,yQ4=0.2,qK=100;function Ebj(e){return Math.max(yQ4,Math.round(e/qK)*qK/1000)}var mp1=0.01,pP6=[0.005802,0.013558,0.0331],_09=8,zrk=0.003996,KbS=0.000444,euZ=1.2,K_E=Math.sqrt(Math.PI*VFZ/(2*euZ)),usL=0.8,L3B=0.95,vD5=0.15,hXR=[0.00065,0.001881,0.000085],qmS=25,xox=15,Avp=256,HOw=64,_UH=40,hQR=32,lZM=64,cW2=20;function rCj(e,t,r){return wK(PK,0,e,t,r),PK[0]}function wK(e,t,r,i,n){let l=r[0]*i[0]+r[1]*i[1]+r[2]*i[2],s=r[0]*r[0]+r[1]*r[1]+r[2]*r[2]-n*n,o=l*l-s,a=Math.sqrt(Math.max(o,0)),u=-l-a,d=-l+a;if(o<0||d<0)e[t]=-1;else if(u<0)e[t]=d;else e[t]=u}function ese(e){return Math.exp(-e/_09)}function tWZ(e){return Math.exp(-e/euZ)}function Vil(e){return Math.min(Math.max(1-Math.abs(e-qmS)/xox,0),1)}function ZK(a,b,c,d){return (ZK=$c0C(37)).call(this,a,b,c,d)}function tCj(e,t){let r=t*t,i=(1-r)*(1+e*e),n=(2+r)*Math.pow(1+r-2*t*e,1.5);return 3/(8*Math.PI)*i/Math.max(n,0.00001)}var ZQr=0.0175,JC=32,OC=16,LC=12,RC=Math.round(Math.sqrt(OC)),VC=8,SC=[0,VFZ+yQ4,0],oC=[0,0,0],PC=[0,0,0],IC=[0,0,0],fC=[0,0,0],yC=[0,0,0],rC=[0,0,0],dC=[0,0,0],gC=[0,0,0],nC=[0,0,0],tC=[0,0,0],xC=[0,0,0],CC=[0,0,0],sC=[0,0,0],ZC=[0,0,0],mC=[0,0,0],QC=[0,0,0],$C=[0,0,0],pC=[0,0,0],hC=[0,0,0],KC=new Float64Array(3),BC=new Float64Array(18),HC=0,cC=1,bC=2,YC=3,UC=4,GC=5,MC=6,iC=9,WC=12,TC=15,_C=16,FC=17,XC=iC,vC;function zC(a,b){return (zC=$c0C(39)).call(this,a,b)}function uC(e,t){let r=BC[bC];yC[0]=e[0]+t[0]*r,yC[1]=e[1]+t[1]*r,yC[2]=e[2]+t[2]*r,W20(yC,0,1,BC,YC)}function eC(){let e=BC[YC];rC[0]=yC[0]/e,rC[1]=yC[1]/e,rC[2]=yC[2]/e}function lC(e){ZK(dC,BC,HC,e);for(let e=0;e<3;e++)dC[e]=Math.max(dC[e],0.000001);return dC}function zU8(a,b,c,d){return (zU8=$c0C(40)).call(this,a,b,c,d)}function fU8(a,b,c,d){return (fU8=$c0C(41)).call(this,a,b,c,d)}function FU8(a,b,c,d,e,f,g){return (FU8=$c0C(42)).call(this,a,b,c,d,e,f,g)}function myU(a){return $c0C(43).apply(this,arguments)}var d_b=32,QYr=16,P0V=d_b,r84=P0V+1,goi=r84+1,Ay1=[0.08,0.2,0.4,0.7,1],Lr=Ay1.length,FT4=1+Lr,PMu=goi+Lr*d_b,rr=ZQr,O87=Math.ceil(PMu*16/256)*256,Jr=O87/16,N3x=16,n2E=8,UaS=N3x*n2E*16,_pM=UaS*4,uBr=O87+UaS;function OYS(e){return`@group(${e}) @binding(${QYr}) var<uniform> fogHorizon: array<vec4<f32>, ${Jr+N3x*n2E}>;`}var vr=`fn sky_domeMirror(d: vec3<f32>) -> vec4<f32> {
  let phi = select(atan2(d.z, d.x), 0.0, abs(d.x) + abs(d.z) < 1e-6);
  let u = fract(phi * ${(1/(2*Math.PI)).toFixed(9)} + 1.0) * ${N3x}.0 - 0.5;
  let fu = u - floor(u);
  let c0 = u32(i32(floor(u)) + ${N3x}) % ${N3x}u;
  let c1 = (c0 + 1u) % ${N3x}u;
  let v = clamp((d.y * 0.5 + 0.5) * ${n2E}.0 - 0.5, 0.0, ${n2E-1}.0);
  let r0 = u32(floor(v));
  let r1 = min(r0 + 1u, ${n2E-1}u);
  let fv = v - floor(v);
  let a = mix(fogHorizon[${Jr}u + r0 * ${N3x}u + c0], fogHorizon[${Jr}u + r0 * ${N3x}u + c1], fu);
  let b = mix(fogHorizon[${Jr}u + r1 * ${N3x}u + c0], fogHorizon[${Jr}u + r1 * ${N3x}u + c1], fu);
  return mix(a, b, fv);
}`,Br=0.6,Xr=0.6,qr=Math.sqrt(1-rr*rr);function D$X(){let e=[rr,...Ay1],t=Ay1.length,r=e.slice(1,t).map((e)=>`select(0u, 1u, unit.y > ${_Td(e)})`),i=`vec2<f32>(${_Td(e[0])}, ${_Td(e[1])})`;for(let r=1;r<t;r+=1)i=`select(${i}, vec2<f32>(${_Td(e[r])}, ${_Td(e[r+1])}), band == ${r}u)`;return`  let band = ${r.join(" + ")};
  let lo = shade_fogRing(select(0u, ${goi-d_b}u + band * ${d_b}u, band > 0u), x);
  let hi = shade_fogRing(${goi}u + band * ${d_b}u, x);
  let span = ${i};
  return mix(lo, hi, clamp((unit.y - span.x) / (span.y - span.x), 0.0, 1.0));`}var Gr=`fn shade_fogFarPlane() -> f32 {
  return select(3.4e38, frame.proj[3][2] / frame.proj[2][2], frame.proj[2][2] > 0.0);
}

fn shade_skyFogFactor(direction: vec3<f32>, fogSky: f32, openSky: f32) -> f32 {
  let reach = select(1.7320508 / max(passLights.fogDensity, 1e-6), passLights.fogFar, passLights.fogMode == 1.0);
  var layer = reach * ${oBK};
  if (passLights.fogHeight.y > 0.0) { layer = shade_fogHeightColumn(); }
  let end = select(3.4e38, shade_fogFarPlane(), passLights.fogMode == 2.0 && passLights.fogHeight.y <= 0.0);
  let open = select(direction.y, abs(direction.y), openSky > 0.0);
  let rise = select(open, direction.y, passLights.fogHeight.y > 0.0);
  let path = select(layer / 1e-4, min(layer / max(rise, 1e-4), end), rise > 0.0);
  let authored = shade_authoredFogFactor(path) * fogSky;
  if (passLights.viewFogAmount <= 0.0) { return authored; }
  let viewPath = passLights.viewFogFar * ${oBK} / max(open, 1e-4);
  let view = smoothstep(passLights.viewFogNear, max(passLights.viewFogFar, passLights.viewFogNear + 1e-4), viewPath);
  return max(authored, view * passLights.viewFogAmount);
}

fn shade_fogRing(base: u32, x: f32) -> vec3<f32> {
  let u = fract(x * ${_Td(1/d_b)} + 1.0) * ${d_b}.0;
  let i0 = u32(floor(u)) % ${d_b}u;
  let i1 = (i0 + 1u) % ${d_b}u;
  return mix(fogHorizon[base + i0].rgb, fogHorizon[base + i1].rgb, fract(u));
}

fn shade_fogSky(unit: vec3<f32>, turn: f32) -> vec3<f32> {
  var x = turn * ${_Td(d_b/(2*Math.PI))};
  if (fogHorizon[${r84}u].w > 0.0) {
    x = sign(turn) * sqrt(abs(turn) * ${_Td(1/Math.PI)}) * ${_Td(d_b/2)};
  }
${D$X()}
}

fn shade_fogColor(toward: vec3<f32>) -> vec3<f32> {
  let unit = toward * inverseSqrt(max(dot(toward, toward), 1e-24));
  let turn = shade_fogTurn(unit);
  let lean = shade_fogLean(unit, turn);
  let under = unit.y <= ${_Td(rr)};
  if (under && fogHorizon[${Jr}u].w < 1.5) { return lean; }
  let share = max(shade_skyFogFactor(unit, fogHorizon[${goi}u].w, select(0.0, 1.0, under)), 1.0 - smoothstep(${_Td(rr)}, ${_Td(Ay1[0])}, select(unit.y, -unit.y, under)));
  if (share >= 1.0) { return lean; }
  var far: vec3<f32>;
  if (under) { far = sky_domeMirror(unit).rgb; } else { far = shade_fogSky(unit, turn); }
  return mix(far, lean, share);
}`;var pVv=`fn shade_fogStep(x: f32) -> vec4<f32> {
  let u = fract(x * ${_Td(1/d_b)} + 1.0) * ${d_b}.0;
  let i0 = u32(floor(u)) % ${d_b}u;
  let i1 = (i0 + 1u) % ${d_b}u;
  return mix(fogHorizon[i0], fogHorizon[i1], fract(u));
}
fn shade_fogTurn(unit: vec3<f32>) -> f32 {
  let sun = fogHorizon[${r84}u];
  let origin = select(vec2<f32>(1.0, 0.0), sun.xz, sun.w > 0.0 && dot(sun.xz, sun.xz) >= 1e-12);
  return select(atan2(origin.x * unit.z - origin.y * unit.x, dot(origin, unit.xz)), 0.0, dot(unit.xz, unit.xz) < 1e-12);
}
fn shade_fogLean(unit: vec3<f32>, turn: f32) -> vec3<f32> {
  let level = dot(unit.xz, unit.xz);
  let sun = fogHorizon[${r84}u];
  var around: vec4<f32>;
  if (sun.w <= 0.0) {
    around = shade_fogStep(turn * ${_Td(d_b/(2*Math.PI))});
  } else {
    let offset = acos(clamp((dot(unit, sun.xyz) - sun.y * ${_Td(rr)}) / max(length(sun.xz) * ${_Td(qr)}, 1e-6), -1.0, 1.0));
    let x = sqrt(offset * ${_Td(1/Math.PI)}) * ${_Td(d_b/2)};
    around = mix(shade_fogStep(-x), shade_fogStep(x), clamp(0.5 + 0.5 * turn / max(offset, 1e-6), 0.0, 1.0));
  }
  let step = mix(fogHorizon[${P0V}u], around, level);
  if (step.w <= 0.0) { return step.rgb; }
  let lobe = ${_Td((1-Br)**2)} / (${_Td(1+Br**2)} - ${_Td(2*Br)} * dot(unit, passLights.sunDirection));
  return step.rgb * (1.0 + ${_Td(Xr)} * step.w * min(dot(passLights.sunColor, vec3<f32>(0.2126, 0.7152, 0.0722)), 1.0) * lobe * sqrt(lobe));
}
${vr}
${Gr}`;var Ozc=12;var tmB=new VCM("cloud-sea-map");var $wK=()=>({map:null,words:[0,0,1],eye:new Float32Array(3),revision:0});var Nr5=(function(e){return e.createBuffer({label:"lume cloud sea map placeholder",size:16,usage:128})});function rWB(e,t,r,i){let n=t?t.buffer:null,l=t?t.side:0,s=t?t.half:0,o=t?r:1,a=e.words;if(e.eye[0]=i[0],e.eye[1]=i[1],e.eye[2]=i[2],e.map===n&&a[0]===l&&a[1]===s&&a[2]===o)return;e.map=n,a[0]=l,a[1]=s,a[2]=o,e.revision+=1}function hlQ(e,t){if(e?.map!==t)return!1;return rWB(e,null,1,e.eye),!0}function ws5(e,t){if(!e?.map)return!0;return Math.fround(t[0])===e.eye[0]&&Math.fround(t[1])===e.eye[1]&&Math.fround(t[2])===e.eye[2]}var ZF3=new VCM("cloud-shadow"),xii=0.0007331378299120235,Ko0=0.05,Lcn=4,nRM=0.03,oI=0.57;function arw(e){return oI*(1-e5m(utO,ahj,Math.min(1,Math.max(-1,e))))}var YST=0.75;function id9(e){return!Cc4()||e>=YST}var oMD=0.7,G4S=()=>({view:null,strength:0,planeY:0,density:0,coverage:0,center:[0,0],invWidth:0,phase:[0,0],driftOrigin:[0,0],driftVelocity:[0,0],driftT0:0,fill:0,thicknessM:0,seaSun:[0,0,0],seaColor:[0,0,0],seaSaturation:1,sunDirection:[0,1,0],seaStrength:0,revision:0,eyeSunShare:1}),v7o=11;var mfM=(function(e){return (e.createTexture({label:"lume cloud shadow placeholder",size:{width:1,height:1},format:"rgba16float",usage:6})).createView()});var uYi=13,gnV=14,CJD=15,xl=[v6R(uYi,2,"float","2d-array"),Zyu(gnV,2,"filtering"),RDp(CJD,2,"uniform")],Jl=656,op4="sky/cloud-map",Hf=2,WwF=256,qKR=2048,gH1=0.98,LV8=8,_Gs=32,KI2=12,Nbr=(1<<KI2)-1,mZE=63,puU=3,kpg=3,Dpw=16,RWB=8,hoq=4,Zf=0,MV4=1,Bf=2,Vf=3,TOb=RWB*RWB*Hf,eQX=2147483648,Rf=1073741824,i_x=16,cZz=65535,eAG=64,g8F=8,D6J=4096,DuM=`
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
  return u32((t.y / ${RWB}) * (side / ${RWB}) + t.x / ${RWB});
}

fn sky_cloudMapDecode(w0: u32, tag: u32) -> vec4<f32> {
  let rg = lume_unpack2x16half(w0);
  return vec4<f32>(rg.x, rg.y, 0.0, lume_half_to_f32(tag >> 18u));
}

fn sky_cloudMapCount(tag: u32) -> u32 {
  return (tag >> ${KI2}u) & ${mZE}u;
}

fn sky_cloudMapStamp(tag: u32) -> u32 {
  return tag & ${Nbr}u;
}

fn sky_cloudMapMeta(count: u32, frame: u32) -> u32 {
  return (min(count, ${mZE}u) << ${KI2}u) | (frame & ${Nbr}u);
}

`;function gnp(e,t,r,i){return`
fn sky_cloudMapTap${t}(texel: vec2<i32>, side: i32) -> vec2<u32> {
  let t = sky_cloudMapWrap(texel, side);
  let i = ${e}[${MV4}u] + (${e}[${hoq}u + sky_cloudMapBlockOf(t, side)] & ${cZz}u) * ${TOb}u + u32((t.y & ${RWB-1}) * ${RWB} + (t.x & ${RWB-1})) * ${Hf}u;
  return select(vec2<u32>(${e}[i], ${e}[i + 1u]), vec2<u32>(0u, sky_cloudMapMeta(${mZE}u, ${i})), sky_cloudMapOtherHalf(t, side, ${r}));
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
`}function kpp(){return`struct CloudMapParams {
  prevEye: vec3<f32>,
  side: f32,
  texelAngle: f32,
  historyWeight: f32,
  frame: u32,
  youngMarches: u32,
  half: f32,
  pool: u32,
  _pad0: u32,
  _pad1: u32,
}

fn sky_cloudMapWordAt(t: vec2<i32>, entry: u32, pool: u32) -> u32 {
  return pool + (entry & ${cZz}u) * ${TOb}u + u32((t.y & ${RWB-1}) * ${RWB} + (t.x & ${RWB-1})) * ${Hf}u;
}

fn sky_cloudMapDirection(uv: vec2<f32>) -> vec3<f32> {
  let u = 2.0 * uv.x - 1.0;
  let v = 2.0 * uv.y - 1.0;
  let up = abs(u);
  let vp = abs(v);
  let signedDistance = 1.0 - (up + vp);
  let r = 1.0 - abs(signedDistance);
  let phi = select((vp - up) / r + 1.0, 1.0, r == 0.0) * 0.7853981633974483;
  let y = select(-1.0, 1.0, signedDistance >= 0.0) * (1.0 - r * r);
  let s = r * sqrt(max(2.0 - r * r, 0.0));
  return vec3<f32>(select(-1.0, 1.0, u >= 0.0) * cos(phi) * s, y, select(-1.0, 1.0, v >= 0.0) * sin(phi) * s);
}

fn sky_cloudMapEncode(premultiplied: vec4<f32>, count: u32, frame: u32) -> vec2<u32> {
  return vec2<u32>(lume_pack2x16half(premultiplied.rg), (lume_half_bits(clamp(premultiplied.a, 0.0, 1.0)) << 18u) | sky_cloudMapMeta(count, frame));
}`}function vF0(){return`
${DuM}
${kpp()}
@group(0) @binding(0) var<uniform> sourceParams: CloudMapParams;
@group(0) @binding(1) var<storage, read_write> cloudMapSource: array<u32>;
@group(1) @binding(0) var<uniform> targetParams: CloudMapParams;
@group(1) @binding(1) var<storage, read_write> cloudMapTarget: array<u32>;
${gnp("cloudMapSource","Source","sourceParams.half","targetParams.frame")}

@compute @workgroup_size(${RWB}, ${RWB})
fn cloudMapResizeCs(@builtin(global_invocation_id) id: vec3<u32>) {
  let t = vec2<i32>(id.xy);
  let side = i32(targetParams.side);
  let entry = cloudMapTarget[${hoq}u + sky_cloudMapBlockOf(t, side)];
  if ((entry & ${eQX}u) == 0u) {
    return;
  }
  let sourceSide = i32(sourceParams.side);
  let at = (vec2<f32>(t) + 0.5) * (sourceParams.side / targetParams.side);
  let stamp = sky_cloudMapStamp(targetParams.frame);
  let under = sky_cloudMapTapSource(vec2<i32>(floor(at)), sourceSide);
  let samples = sky_cloudMapCount(under.y);
  let elapsed = (stamp - sky_cloudMapStamp(under.y)) & ${Nbr}u;
  let holds = samples != 0u && elapsed <= ${LV8}u && !sky_cloudMapOtherHalf(t, side, targetParams.half);
  let words = select(vec2<u32>(0u), sky_cloudMapEncode(sky_cloudMapBilinearSource(at, sourceSide), samples, stamp - elapsed), holds);
  let index = sky_cloudMapWordAt(t, entry, cloudMapTarget[${MV4}]);
  cloudMapTarget[index] = words.x;
  cloudMapTarget[index + 1u] = words.y;
}
`}function cEA(e){return`
${e}
${DuM}
${kpp()}
@group(1) @binding(0) var<uniform> cloudMapParams: CloudMapParams;
@group(1) @binding(6) var<storage, read_write> cloudMapWords: array<atomic<u32>>;
@group(1) @binding(7) var<uniform> cloudMapPhase: u32;

fn sky_cloudMapGive(at: u32, entry: u32) {
  let free = atomicAdd(&cloudMapWords[${Zf}], 1u);
  atomicStore(&cloudMapWords[atomicLoad(&cloudMapWords[${Bf}]) + free], entry & ${cZz}u);
  atomicStore(&cloudMapWords[at], 0u);
}

fn sky_cloudMapSort(block: u32, at: u32, stamp: u32) {
  let side = cloudMapParams.side;
  let perSide = u32(side) / ${RWB}u;
  let low = vec2<u32>(block % perSide, block / perSide) * ${RWB}u;
  let margin = cloudMapParams.texelAngle * ${g8F}.0 * vec2<f32>(frame.proj[0][0], frame.proj[1][1]);
  var seen = false;
  var held = false;
  for (var k = 0u; k < 9u; k = k + 1u) {
    let sample = vec2<u32>(k % 3u, k / 3u) * ${RWB/2}u;
    let clip = frame.viewProj * vec4<f32>(sky_cloudMapDirection(vec2<f32>(low + sample) / side), 0.0);
    seen = seen || (clip.w > 1e-6 && all(abs(clip.xy / clip.w) <= 1.0 + margin));
    held = held || !sky_cloudMapOtherHalf(vec2<i32>(low + min(sample, vec2<u32>(${RWB-1}u))), i32(side), cloudMapParams.half);
  }
  seen = seen && held;
  let entry = atomicLoad(&cloudMapWords[at]);
  let mapped = (entry & ${eQX}u) != 0u;
  if (seen) {
    if (mapped) {
      atomicStore(&cloudMapWords[at], ${eQX}u | (stamp << ${i_x}u) | (entry & ${cZz}u));
    } else {
      atomicStore(&cloudMapWords[at], ${Rf}u);
      atomicAdd(&cloudMapWords[${Vf}], 1u);
    }
  } else if (mapped && ((stamp - (entry >> ${i_x}u)) & ${Nbr}u) > ${LV8}u) {
    sky_cloudMapGive(at, entry);
  }
}

fn sky_cloudMapAlloc(at: u32, stamp: u32) {
  if ((atomicLoad(&cloudMapWords[at]) & ${Rf}u) == 0u) {
    return;
  }
  let taken = atomicSub(&cloudMapWords[${Zf}], 1u);
  if (taken - 1u >= cloudMapParams.pool) {
    atomicAdd(&cloudMapWords[${Zf}], 1u);
    atomicStore(&cloudMapWords[at], 0u);
    return;
  }
  let slot = atomicLoad(&cloudMapWords[atomicLoad(&cloudMapWords[${Bf}]) + taken - 1u]);
  atomicStore(&cloudMapWords[at], ${eQX}u | (stamp << ${i_x}u) | slot);
  let first = atomicLoad(&cloudMapWords[${MV4}]) + slot * ${TOb}u;
  for (var w = 0u; w < ${TOb}u; w = w + 1u) {
    atomicStore(&cloudMapWords[first + w], 0u);
  }
}

@compute @workgroup_size(${eAG})
fn cloudMapBlocksCs(@builtin(global_invocation_id) id: vec3<u32>) {
  let perSide = u32(cloudMapParams.side) / ${RWB}u;
  if (id.x >= perSide * perSide) {
    return;
  }
  let stamp = sky_cloudMapStamp(cloudMapParams.frame);
  let at = ${hoq}u + id.x;
  if (cloudMapPhase == 0u) {
    sky_cloudMapSort(id.x, at, stamp);
  } else if (cloudMapPhase == 1u) {
    if (atomicLoad(&cloudMapWords[${Vf}]) <= atomicLoad(&cloudMapWords[${Zf}])) {
      return;
    }
    let entry = atomicLoad(&cloudMapWords[at]);
    if ((entry & ${eQX}u) != 0u && ((entry >> ${i_x}u) & ${Nbr}u) != stamp) {
      sky_cloudMapGive(at, entry);
    }
  } else {
    if (id.x == 0u) {
      atomicStore(&cloudMapWords[${Vf}], 0u);
    }
    sky_cloudMapAlloc(at, stamp);
  }
}
`}var hB={stands:!1};var bmw=(function(){return hB.stands});var qcz=(function(e){return hB.stands?e:zJw(e)});var JQV="cloudSeaMapTexels";var DB=(function(e){return e.startsWith("shade_seaMap")||e==="shade_cloudSea"||e==="shade_cloudSeaMapped"||e==="shade_cloudSeaSlice"});var oB=`@group(1) @binding(${Ozc}) var<storage, read> ${JQV}: array<u32>;`,EB=`fn shade_seaMapWord(i: u32) -> u32 {
  return ${JQV}[i];
}

fn shade_seaMapWords() -> u32 {
  return arrayLength(&${JQV});
}`;var cB=(function(e,t){let r=e.indexOf("{",t);for(let t=0;r<e.length;r+=1)if(e[r]==="{")t+=1;else if(e[r]==="}"&&--t===0)break;return r+1});var Scz=(function(e,t){return t.map((function(t){let r=e.search(new RegExp(`\\bfn\\s+${t}\\s*\\(`));return r<0?"":e.slice(r,cB(e,r))})).join(`

`)});var jB,tB=/\bfn\s+shade_cloudSeaSlice\s*\(/;function zJw(a){return $c0C(45).call(this,a)}var TB=`${EB}

${Scz(`${Def}
${DuM.replace(Def,"")}
${gnp(JQV,"","passLights.cloudSeaMap.y","0u")}`,["lume_half_to_f32","lume_unpack2x16half","sky_cloudMapUv","sky_cloudMapWrap","sky_cloudMapOtherHalf","sky_cloudMapBlockOf","sky_cloudMapDecode","sky_cloudMapCount","sky_cloudMapMeta","sky_cloudMapTap","sky_cloudMapBilinear","sky_cloudMapRead"]).replace(/\bsky_cloudMap/g,"shade_seaMap").replace(/\blume_(half_to_f32|unpack2x16half)\b/g,"shade_seaMapHalf_$1").replace(new RegExp(`\\b${JQV}\\[([^\\[\\]]+)\\]`,"g"),"shade_seaMapWord($1)").replace(/^[ \t]*\/\/.*\n/gm,"")}`;var dB=`  let a = passLights.cloudShadowA;
  let thickness = max(passLights.cloudSeaSun.w, 1.0);
  let baseY = a.x;
  let topY = baseY + thickness;
  let eye = frame.cameraPosition + frame.renderOrigin;
`;var yB=`  let d = toward * inverseSqrt(max(dot(toward, toward), 1e-24));
  let forward = -vec3<f32>(frame.view[0].z, frame.view[1].z, frame.view[2].z);
  let reach = max(viewZ, 0.0) / max(dot(d, forward), 1e-3);
  let endY = eye.y + d.y * reach;
`;var qB=`  let dy = select(d.y, 1e-4, abs(d.y) < 1e-4);
  let tBase = (baseY - eye.y) / dy;
  let tTop = (topY - eye.y) / dy;
  let insideLayer = eye.y > baseY && eye.y < topY;
`;var fB=`${TB}

fn shade_cloudSeaMapped(viewZ: f32, toward: vec3<f32>) -> ShadeCloudSea {
  let none = ShadeCloudSea(vec4<f32>(0.0), 1.0);
  let tint = passLights.cloudSeaColor;
${dB}${yB}  if (min(max(eye.y, endY), topY) <= max(min(eye.y, endY), baseY)) {
    return none;
  }
${qB}  let tEnter = select(min(max(tBase, 0.0), max(tTop, 0.0)), 0.0, insideLayer);
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
}`;var WdA=NK("PassLights",yK);var uQ=WK(yK);var TcG=uQ.offsets;var M9s=uQ.sizeBytes;var dQ=256;var upy=64;var U$F=Math.ceil(M9s/256)*256+dQ;var AoK=U$F+upy*16;var yte=NK("PassLights",{...yK,lightingGap:`array<vec4<f32>, ${(U$F-M9s)/16}>`,lightingParams:`array<vec4<f32>, ${upy}>`});var At0="return clusterRanges[c].y;";function KVO(e){return e.split(At0).join("return clusterRanges[c].y * lume_paneLights;")}var hk6=0,pEu=1,$wo=2,nxa=`fn shade_fogHeightColumn() -> f32 {
  let k = passLights.fogHeight.y;
  let eye = frame.cameraPosition.y + frame.renderOrigin.y - passLights.fogHeight.x;
  return max(-eye, 0.0) + exp(-k * max(eye, 0.0)) / k;
}

fn shade_authoredFogFactor(viewZ: f32) -> f32 {
  let range = smoothstep(passLights.fogNear, max(passLights.fogFar, passLights.fogNear + 1e-4), viewZ);
  let dz = passLights.fogDensity * viewZ;
  let density = 1.0 - exp(-(dz * dz));
  let factor = select(select(0.0, range, passLights.fogMode == 1.0), density, passLights.fogMode == 2.0);
  return clamp(factor, 0.0, 1.0);
}`,R29=`fn shade_fogHeightShare(rise: f32) -> f32 {
  let k = passLights.fogHeight.y;
  let eye = frame.cameraPosition.y + frame.renderOrigin.y - passLights.fogHeight.x;
  let lo = min(eye, eye + rise);
  let hi = max(eye, eye + rise);
  let under = max(min(hi, 0.0) - lo, 0.0);
  let over = max(hi, 0.0) - max(lo, 0.0);
  if (under + over < 1e-3) { return exp(-k * max(eye, 0.0)); }
  let x = k * over;
  let thinned = exp(-k * max(lo, 0.0)) * select((1.0 - exp(-x)) / max(x, 1e-6), 1.0 - 0.5 * x, x < 1e-3);
  return (under + over * thinned) / (under + over);
}

${nxa}

fn shade_fogFactor(viewZ: f32, rise: f32) -> f32 {
  var depth = viewZ;
  if (passLights.fogHeight.y > 0.0) { depth = viewZ * shade_fogHeightShare(rise); }
  let factor = shade_authoredFogFactor(depth);
  if (passLights.viewFogAmount > 0.0) {
    let viewRange = smoothstep(passLights.viewFogNear, max(passLights.viewFogFar, passLights.viewFogNear + 1e-4), viewZ);
    return clamp(max(factor, viewRange * passLights.viewFogAmount), 0.0, 1.0);
  }
  return clamp(factor, 0.0, 1.0);
}`,P8B=`fn shade_viewFogBound(toward: vec3<f32>, center: vec4<f32>, extent: vec4<f32>) -> f32 {
  if (extent.w == 0.0) { return 0.0; }
  let q = abs(toward - center.xyz) / max(extent.xyz, vec3<f32>(1e-4));
  return smoothstep(min(center.w, 1.0 - 1e-4), 1.0, max(q.x, max(q.y, q.z)));
}`,PQ=`${P8B}

fn shade_viewFogFactor(viewZ: f32, toward: vec3<f32>) -> f32 {
  var factor = 0.0;
  if (passLights.viewFogAmount > 0.0) {
    factor = smoothstep(passLights.viewFogNear, max(passLights.viewFogFar, passLights.viewFogNear + 1e-4), viewZ) * passLights.viewFogAmount;
  }
  if (passLights.viewFogExtent.w > 0.0) {
    factor = max(factor, shade_viewFogBound(toward, passLights.viewFogCenter, passLights.viewFogExtent));
  }
  return clamp(factor, 0.0, 1.0);
}`,BOr=`${WdA}
@group(1) @binding(0) var<uniform> passLights: PassLights;
${PQ}`,RLW=((e)=>`shade_air(${e}, toward)`),Pr8=`@group(1) @binding(10) var iblSampler: sampler;
@group(1) @binding(11) var cloudShadowField: texture_2d<f32>;
${oB}`,pYA=`  var factor = shade_fogFactor(viewZ, toward.y);
  if (passLights.viewFogExtent.w > 0.0) {
    factor = max(factor, shade_viewFogBound(toward, passLights.viewFogCenter, passLights.viewFogExtent));
  }`,$Rc=((e)=>`  var factor = 0.0;
  if (${e}) {
  ${pYA.trimStart().replace("var factor = ","factor = ")}
  }`);var iZ7=(function(e){return!Jmd(e)&&!(e[TcG.viewFogAmount/4]>0)&&!(e[TcG.viewFogExtent/4+3]>0)});var Jmd=(function(e){let t=e[TcG.fogMode/4];return t===1||t===2});var lQ=`fn shade_cloudSeaPhase(cosTheta: f32, g: f32) -> f32 {
  let g2 = g * g;
  return 0.0795774715 * (1.0 - g2) / max(pow(1.0 + g2 - 2.0 * g * cosTheta, 1.5), 1e-5);
}

fn shade_cloudSeaPlane(world: vec3<f32>) -> vec2<f32> {
  return world.xz * passLights.cloudShadowB.w - (passLights.cloudShadowC.xy + passLights.cloudShadowC.zw * (frame.time - passLights.cloudShadowT0.x));
}

fn shade_cloudSeaTap(planePos: vec2<f32>) -> vec3<f32> {
  let uv = (planePos - passLights.cloudShadowB.xy) * passLights.cloudShadowB.z + 0.5;
  let rim = 1.0 - smoothstep(0.46, 0.5, max(abs(uv.x - 0.5), abs(uv.y - 0.5)));
  let dims = vec2<f32>(textureDimensions(cloudShadowField));
  let span = max(dims - 1.0, vec2<f32>(1.0));
  let wrap = uv * span + passLights.cloudShadowT0.zw - 0.5;
  let far = textureSampleLevel(cloudShadowField, iblSampler, (wrap - floor(wrap / span) * span + 0.5) / dims, 0.0);
  return vec3<f32>(fma(far.a, ${xii}, far.r), far.gb) * rim;
}

fn shade_cloudSeaColumn(planePos: vec2<f32>, z: f32, coverage: f32, sheet: f32) -> f32 {
  if (z <= 0.0 || z >= 1.0) {
    return 0.0;
  }
  let tap = shade_cloudSeaTap(planePos);
  let dome = pow(abs(z - ${_Td(hpi)}) / select(${_Td(NZA)} - ${_Td(hpi)}, ${_Td(hpi)}, z < ${_Td(hpi)}), ${_Td(l_6)}) * coverage;
  let excess = max(tap.r - (1.0 - coverage), sheet);
  let margin = excess - dome;
  if (margin <= 0.0) {
    return 0.0;
  }
  let s = smoothstep(0.0, 1.0, z);
  let detail = clamp((mix(tap.g, tap.b, s) - 0.5) * inverseSqrt(1.0 - 2.0 * s * (1.0 - s)) + 0.5, 0.0, 1.0);
  let shell = 1.0 - smoothstep(0.0, ${_Td(vDR)}, margin);
  let erode = ${_Td(FFn*vDR)} * mix(0.6, 1.0, z) * (1.0 - detail) * shell * smoothstep(0.0, ${_Td(vDR)}, excess);
  return clamp((margin - erode) / ${_Td(Vvw)}, 0.0, 1.0) * smoothstep(0.0, 0.05, z);
}

fn shade_cloudSeaSky(n: vec3<f32>) -> vec3<f32> {
  var sky = iblSh[0].rgb * 0.282095;
  sky = sky + iblSh[1].rgb * (0.488603 * n.y) + iblSh[2].rgb * (0.488603 * n.z) + iblSh[3].rgb * (0.488603 * n.x);
  sky = sky + iblSh[4].rgb * (1.092548 * n.x * n.y) + iblSh[5].rgb * (1.092548 * n.y * n.z) + iblSh[6].rgb * (0.315392 * (3.0 * n.z * n.z - 1.0));
  sky = sky + iblSh[7].rgb * (1.092548 * n.x * n.z) + iblSh[8].rgb * (0.546274 * (n.x * n.x - n.y * n.y));
  return max(sky, vec3<f32>(0.0));
}

struct ShadeCloudSea {
  color: vec4<f32>,
  at: f32,
}

fn shade_cloudSeaSlice(viewZ: f32, toward: vec3<f32>) -> ShadeCloudSea {
  let none = ShadeCloudSea(vec4<f32>(0.0), 1.0);
  let tint = passLights.cloudSeaColor;
  if (tint.w <= 0.0 || frame.proj[2][3] == 0.0) {
    return none;
  }
${dB}
${yB}  let low = max(min(eye.y, endY), baseY);
  let high = min(max(eye.y, endY), topY);
  if (high <= low) {
    return none;
  }
${qB}  let faceHeight = select(min(abs(baseY - eye.y), abs(topY - eye.y)), 0.0, insideLayer);
  let tSilhouette = min(select(1e9, tBase, tBase > 0.0), select(1e9, tTop, tTop > 0.0));
  let sliceFade = 1.0 - smoothstep(max(${_Td(bVy)} * faceHeight, ${_Td(y3_)}), max(${_Td(VeE)} * faceHeight, ${_Td(y3_*3)}), tSilhouette);
  if (sliceFade <= 0.0) {
    return none;
  }
  let silhouette = eye + d * tSilhouette;
  let coverage = a.z;
  let closing = smoothstep(${_Td(YST)}, 1.0, coverage);
  let sheet = ${_Td(oMD)} * closing;
  let excess = max(shade_cloudSeaTap(shade_cloudSeaPlane(silhouette)).r - (1.0 - coverage), sheet);
  let soft = clamp(excess / ${_Td(lsY)}, 0.0, 1.0);
  let alpha = (1.0 - exp(-soft * a.y * ${_Td(Lcn)} * (high - low) / thickness)) * sliceFade * min(tint.w, 1.0);
  if (alpha <= 0.0) {
    return none;
  }
  let sunDirection = passLights.cloudSeaSunDirection.xyz;
  let cosTheta = dot(d, sunDirection);
  let sunUp = max(sunDirection.y, 0.15);
  let sunGate = smoothstep(-0.06, -0.005, sunDirection.y);
  let sigma = a.y * ${_Td(OuG)} / thickness;
  let fill = clamp(excess / max(coverage, 1e-3), 0.0, 1.0);
  let z = select(mix(0.5, 1.0, ${_Td(hpi)} + pow(fill, ${_Td(1/l_6)}) * (${_Td(NZA)} - ${_Td(hpi)})), ${_Td(PVx)}, eye.y < baseY);
  let q = silhouette + sunDirection * (thickness * (1.0 - z) / sunUp * 0.5);
  let dq = shade_cloudSeaColumn(shade_cloudSeaPlane(q), (q.y - baseY) / thickness, coverage, sheet);
  let lightOd = (soft * 0.4 + dq * 0.6) * sigma * thickness * max(1.0 - z, 0.0) / sunUp;
  var sun = 0.0;
  var attenuation = 1.0;
  var contribution = 1.0;
  var eccentricity = 1.0;
  for (var k = 0u; k < ${OhB}u; k = k + 1u) {
    let phase = shade_cloudSeaPhase(cosTheta, 0.8 * eccentricity) * 0.8 + shade_cloudSeaPhase(cosTheta, -0.2 * eccentricity) * 0.2;
    sun = sun + attenuation * exp(-lightOd * contribution) * phase;
    attenuation = attenuation * ${_Td(w9R)};
    contribution = contribution * ${_Td(zEr)};
    eccentricity = eccentricity * ${_Td(aYH)};
  }
  let powder = mix(1.0, 1.0 - exp(-2.0 * lightOd), ${_Td(iaN)} * (1.0 - smoothstep(-0.5, 0.3, cosTheta)) * soft);
  let groundShare = max(sunDirection.y, 0.0) * ${_Td(O7v)} * (1.0 - coverage) * 0.318309886;
  let sunShare = sunGate * (sun * powder + groundShare * (1.0 - z));
  let skyShare = mix(${_Td(HGV)} + ${_Td(mAc)} * (1.0 - coverage), 1.0, z) * 0.7;
  let skyLight = shade_cloudSeaSky(vec3<f32>(d.x, abs(d.y), d.z));
  let ambient = mix(skyLight, vec3<f32>(dot(skyLight, vec3<f32>(0.2126, 0.7152, 0.0722))), closing);
  let lit = (passLights.cloudSeaSun.rgb * sunShare + ambient * skyShare) * tint.rgb;
  let toned = mix(vec3<f32>(dot(lit, vec3<f32>(0.2126, 0.7152, 0.0722))), lit, passLights.cloudSeaSunDirection.w);
  let entry = clamp(select(tSilhouette, 0.0, insideLayer), 0.0, reach);
  return ShadeCloudSea(vec4<f32>(toned, alpha), entry / max(reach, 1e-3));
}

${fB}`,BC0="  let sea = shade_cloudSea(viewZ, toward);",D0M=(e)=>`  var sea = ShadeCloudSea(vec4<f32>(0.0), 1.0);
  if (${e}) {
    sea = shade_cloudSea(viewZ, toward);
  }`,lTV=`fn shade_applyFog(color: vec3<f32>, viewZ: f32, toward: vec3<f32>) -> vec3<f32> {
  let factor = shade_depthFactor(viewZ, toward);
  let aerial = shade_aerialPerspective(color, viewZ);
${BC0}
  var seaAerial = vec3<f32>(0.0);
  var seaFactor = 0.0;
  if (sea.color.a > 0.0) {
    seaFactor = shade_depthFactor(viewZ * sea.at, toward * sea.at);
    seaAerial = shade_aerialPerspective(sea.color.rgb, viewZ * sea.at);
  }
  if (max(factor, seaFactor) <= 0.0) { return ${RLW("mix(aerial, seaAerial, sea.color.a)")}; }
  let fog = shade_fogColor(toward);
  return ${RLW("mix(mix(aerial, fog, factor), mix(seaAerial, fog, seaFactor), sea.color.a)")};
}`,Mq5=`fn shade_waterOver(point: vec3<f32>, eye: vec3<f32>) -> vec3<f32> {
  let plane = passLights.waterOverPlane;
  if (plane.y <= 0.0) { return vec3<f32>(1.0); }
  if (plane.z > 0.5) {
    let wet = select(1.0, clamp((plane.x - eye.y) / max(point.y - eye.y, 1e-4), 0.0, 1.0), point.y > plane.x);
    return exp2(-passLights.waterOverExtinction.rgb * (length(point - eye) * wet));
  }
  if (point.y >= plane.x || eye.y <= plane.x) { return vec3<f32>(1.0); }
  let drop = eye.y - point.y;
  let meet = eye.xz + (point.xz - eye.xz) * ((eye.y - plane.x) / drop);
  let rect = passLights.waterOverRect;
  if (any(meet < rect.xy) || any(meet > rect.zw)) { return vec3<f32>(1.0); }
  let path = length(point - eye) * ((plane.x - point.y) / drop);
  return exp2(-passLights.waterOverExtinction.rgb * path);
}`,RT3=`fn shade_applyFog(color: vec3<f32>, viewZ: f32, toward: vec3<f32>) -> vec3<f32> {
  let factor = shade_depthFactor(viewZ, toward);
  let aerial = shade_aerialPerspective(color, viewZ);
  if (factor <= 0.0) { return ${RLW("aerial")}; }
  return ${RLW("mix(aerial, shade_fogColor(toward), factor)")};
}`,$91=`${R29}

${PQ}

${pVv}

var<private> shade_surfaceAirLit: f32 = 0.0;

fn shade_aerialPerspective(color: vec3<f32>, viewZ: f32) -> vec3<f32> {
  let air = exp(-passLights.aerialExtinction * max(viewZ, 0.0));
  let sunlitAir = max(1.0 - passLights.aerialShade, shade_surfaceAirLit);
  return color * air + passLights.aerialInscatter * (sunlitAir * (1.0 - air));
}

fn shade_applyViewFog(color: vec3<f32>, viewZ: f32, toward: vec3<f32>) -> vec3<f32> {
  let factor = shade_viewFogFactor(viewZ, toward);
  if (factor <= 0.0) { return color; }
  return mix(color, shade_fogColor(toward), factor);
}

${lQ}

fn shade_depthFactor(viewZ: f32, toward: vec3<f32>) -> f32 {
${pYA}
  return factor;
}

${lTV}`,dIG=`fn shade_cloudSeaOver(viewZ: f32, toward: vec3<f32>) -> vec4<f32> {
  let sea = shade_cloudSea(viewZ, toward);
  if (sea.color.a <= 0.0) { return vec4<f32>(0.0); }
  let seaFactor = shade_depthFactor(viewZ * sea.at, toward * sea.at);
  let seaAerial = shade_aerialPerspective(sea.color.rgb, viewZ * sea.at);
  if (seaFactor <= 0.0) { return vec4<f32>(${RLW("seaAerial")}, sea.color.a); }
  return vec4<f32>(${RLW("mix(seaAerial, shade_fogColor(toward), seaFactor)")}, sea.color.a);
}`,Sy9=`${WdA}
@group(1) @binding(0) var<uniform> passLights: PassLights;
${OYS(1)}
@group(1) @binding(8) var<uniform> iblSh: array<vec4<f32>, 9>;
${Pr8}

${$91}

${XIa(1)}`,LjX=[RDp(0,3,"uniform"),RDp(1,2,"read-only-storage"),RDp(2,2,"read-only-storage"),RDp(3,2,"read-only-storage"),v6R(4,2,"unfilterable-float","2d-array"),v6R(5,2,"unfilterable-float","2d-array"),Zyu(6,2,"non-filtering"),RDp(7,2,"read-only-storage"),RDp(8,2,"uniform"),v6R(9,2,"float","2d-array"),Zyu(10,2,"filtering"),v6R(11,2,"float","2d"),...xl,RDp(QYr,2,"uniform"),...PM],nQ=RDp(Ozc,2,"read-only-storage"),_Q=new WeakMap,EQ={moves:0};function aQ(e,t=!1){let r=_Q.get(e);if(r===void 0)r=!t&&frM(e.limits,"maxStorageBuffers","fragment",0).limit>(rj.maxStorageBuffersInFragmentStage??8),_Q.set(e,r);let i=LjX.indexOf(nQ);if(r!==i>=0){if(r)LjX.splice(LjX.findIndex(((e)=>e.binding===v7o))+1,0,nQ);else LjX.splice(i,1);EQ.moves+=1}{let e=r;hB.stands=e}return r}var Qv=new Set(["rgba8unorm","rgba8unorm-srgb","bgra8unorm","rg8unorm","r8unorm","rgba16float","rg16float","r16float"]),pv=256,tv=`
struct At { layer: u32 }
@group(0) @binding(0) var source: texture_2d_array<f32>;
@group(0) @binding(1) var<uniform> at: At;

@vertex
fn vs(@builtin(vertex_index) index: u32) -> @builtin(position) vec4f {
  return vec4f(f32((index << 1u) & 2u) * 2.0 - 1.0, f32(index & 2u) * 2.0 - 1.0, 0.0, 1.0);
}

@fragment
fn fs(@builtin(position) position: vec4f) -> @location(0) vec4f {
  return textureLoad(source, vec2i(position.xy), i32(at.layer), 0);
}
`;function Mv(e){if(e===void 0)return[0,0,0];if(Symbol.iterator in e){let[t,r,i]=Array.from(e);return[t??0,r??0,i??0]}return[e.x??0,e.y??0,e.z??0]}var Gv=(e,t)=>Math.max(1,e>>t),kRa={r:0,g:0,b:0,a:0};class Yv{constructor(e,t=Math.max(1,e.limits?.maxTextureArrayLayers??256)){this.device=void 0;this.layerCount=void 0;this.layout=null;this.pipelineLayout=null;this.module=null;this.layers=null;this.pipelines=new Map;this.device=e,this.layerCount=t}takes(a,b,c,d){return $c0C(46).call(this,a,b,c,d)}pipelineFor(e){let t=this.pipelines.get(e);if(t!==void 0)return t;let r=this.device;return this.layout??=r.createBindGroupLayout({label:"lume layer copy",entries:[v6R(0,2,"unfilterable-float","2d-array"),{binding:1,visibility:2,buffer:{type:"uniform",minBindingSize:4}}]}),this.pipelineLayout??=r.createPipelineLayout({label:"lume layer copy",bindGroupLayouts:[this.layout]}),this.module??=r.createShaderModule({label:"lume layer copy",code:tv}),t=r.createRenderPipeline({label:`lume layer copy ${e}`,layout:this.pipelineLayout,vertex:{module:this.module,entryPoint:"vs"},fragment:{module:this.module,entryPoint:"fs",targets:[{format:e}]}}),this.pipelines.set(e,t),t}layerTable(){return $c0P($c0C(47),Yv.prototype,"layerTable").call(this)}sourceView(e,t){return e.createView({label:"lume layer copy source",dimension:"2d-array",baseMipLevel:t,mipLevelCount:1})}drawOf(a,b,c,d,e){return $c0P($c0C(48),Yv.prototype,"drawOf").call(this,a,b,c,d,e)}draw(a,b,c,d,e,f){return $c0C(49).call(this,a,b,c,d,e,f)}dispose(){this.layers?.destroy(),this.layers=null}}var Xv=new WeakMap;function CTZ(e){if(!Xv.has(e))Xv.set(e,new Yv(e))}function R74(e,t){if(!Xv.has(e))return t;if((t.usage&2)===0||(t.usage&16)!==0)return t;if((t.dimension??"2d")!=="2d"||(t.sampleCount??1)>1||!Qv.has(t.format))return t;return Iv(t.size)[2]>1?{...t,usage:t.usage|16}:t}function Shc(e,t,r,i){let n=Xv.get(e.device);if(n===void 0)return e.encoder.copyTextureToTexture(t,r,i),!1;let[l,s,o]=Iv(i),a=Mv(r.origin);if(a[2]===0&&o===1||!n.takes(t,r,l,s))return e.encoder.copyTextureToTexture(t,r,i),!1;let u=Mv(t.origin),d=t.mipLevel??0,f=r.mipLevel??0,c=null;for(let i=0;i<o;i+=1){{ea=Ba(a,i,e,t,d,u,r,f,l,s,c,n);c=za;if(ea===ya)continue;}}return!0}function NbB(a,b,c,d){return $c0C(50).call(this,a,b,c,d)}var gv="rgba8unorm",qv=4,Vv=3,uv=256,bv=uv*qv,rv=qv*qv*4;function Hv(e){let t=new Uint8Array(new ArrayBuffer(rv));for(let r=0;r<qv;r+=1)for(let i=0;i<qv;i+=1)t.set([33+i*51,18+r*59,e,255],(r*qv+i)*4);return t}function nv(e,t){for(let r=0;r<qv;r+=1)for(let i=0;i<qv*4;i+=1)if(e[r*uv+i]!==t[r*qv*4+i])return"loses";return"keeps"}var Tv=["unknown","unknown"];async function hv(e,t){if(!["createTexture","createBuffer","createCommandEncoder","pushErrorScope","popErrorScope"].every((t)=>nbj(e,t)))return Tv;if(!nbj(e.queue,"submit")||!nbj(e.queue,"writeTexture"))return Tv;return tYn(e,()=>Tv,async function(r,i){let n=7|(t===null?0:16),l=function(t){let i=e.createTexture(nn({label:"lume texture copy canary",size:[qv,qv,t],format:gv,usage:n}));return r.push(i),i},s=l(2),o=l(Vv),a=l(1),u=e.createBuffer({label:"lume texture copy canary",size:bv*2,usage:9});if(r.push(u),!nbj(u,"mapAsync")||!nbj(u,"getMappedRange"))return Tv;i.push();let d=[Hv(90),Hv(195)];for(let t=0;t<2;t+=1)e.queue.writeTexture({texture:s,origin:[0,0,t]},d[t],{bytesPerRow:qv*4},[qv,qv,1]);let f=[qv,qv,1],c={x:0,y:0,z:Vv-1},h=new YHe(e,"lume texture copy canary");if(!nbj(h.encoder,"copyTextureToTexture")||!nbj(h.encoder,"copyTextureToBuffer")||!nbj(h.encoder,"finish"))return Tv;if(t===null)h.encoder.copyTextureToTexture({texture:s},{texture:o,origin:c},f);else t.draw(h,t.sourceView(s,0),1,o,0,Vv-1);h.encoder.copyTextureToTexture({texture:s},{texture:a},f),h.encoder.copyTextureToBuffer({texture:o,origin:c},{buffer:u,bytesPerRow:uv},f),h.encoder.copyTextureToBuffer({texture:a},{buffer:u,offset:bv,bytesPerRow:uv},f),h.submit();let p=await i.read(u,bv*2);if(!(p instanceof Uint8Array))return Tv;return[nv(p,d[t===null?0:1]),nv(p.subarray(bv),d[0])]})}async function KTZ(e){let[t,r]=await hv(e,null);if(t!=="loses")return{later:t,first:r,drawn:"unknown"};let i=new Yv(e,Vv),[n]=await hv(e,i);return i.dispose(),{later:t,first:r,drawn:n}}var TTZ=(async function(e,t,r={}){if(!t)return null;let i=r.answer??await KTZ(e),n=`a copy into a later layer ${i.later}, a copy into a first layer ${i.first}${r.answer===void 0?"":` (${Mu})`}`;if(i.later!=="unknown"&&i.first!=="unknown")r.answer=i;if(i.later!=="loses")return v3.warn(`[lume] texture copy canary: ${n}`),i;if(i.drawn==="keeps"){CTZ(e);}return v3.warn(`[lume] texture copy canary: ${n}; ${i.drawn==="keeps"?"a copy into a later layer is drawn there (the draw lands)":`the draw into a later layer reads ${i.drawn}, so every copy stays the verb`}`),i});var IJU="rgba16float",S08="sky/half",cdB=0.041666666666666664,rjV=8,T62="r8unorm",uuE="sky/half tiles",TNi=60000;function Vkh(e,t){return[Math.max(1,Math.ceil(Math.max(1,Math.floor(e))/rjV)),Math.max(1,Math.ceil(Math.max(1,Math.floor(t))/rjV))]}function _Or(e,t,r,i,n){let[l,s]=([Math.max(1,Math.ceil(Math.max(1,Math.floor(i))/2)),Math.max(1,Math.ceil(Math.max(1,Math.floor(n))/2))]);let o=e.get(r);if(o?.width===l&&o.height===s)return o;o?.texture.destroy(),o?.tilesTexture.destroy();let a=t.createTexture({label:"sky half",size:{width:l,height:s},format:IJU,usage:20}),[u,d]=Vkh(i,n),f=t.createTexture({label:"sky half tiles",size:{width:u,height:d},format:T62,usage:20}),c={width:l,height:s,texture:a,view:a.createView({label:"sky half"}),pass:null,lane:null,laneFrom:{base:null,block:null,stars:null,lease:null,blur:null},passLane:null,passLaneFrom:{base:null,block:null,stars:null,lease:null,blur:null},tilesTexture:f,tilesView:f.createView({label:"sky half tiles"}),tilesPass:null,tilesLane:null,dome:null};return e.set(r,c),c}function sM9(e,t){let r=e.get(t);if(r===void 0)return;Ca(r,e,t);}function uIn(e,t,r,i,n,l){if(e.base===t&&e.block===r&&e.stars===i&&e.lease===n&&e.blur===l)return!0;return e.base=t,e.block=r,e.stars=i,e.lease=n,e.blur=l,!1}var WWl="rgba16float",tcv=4,da=tcv*tcv,aa=[0,10,2,8,5,15,7,13,1,11,3,9,4,14,6,12],Wi4=da+2,Rkn="sky/ask",IAY="sky/keep",_7o="sky/kept history";function zWg(e){return aa[e.frames%da]}var Aa=()=>({base:null,block:null,stars:null,lease:null,blur:null});function J9S(a,b,c,d,e){return $c0C(51).call(this,a,b,c,d,e)}function Va(e){e.ask.destroy(),e.kept.destroy(),e.last.destroy()}function E8k(e,t){let r=e.get(t);if(r===void 0)return;Va(r);e.delete(t)}var bG=7,_GM=8,P0P=16,DRr=32,UFt=64,fEI=128,x7T=256,rzY=512,_VC=1024,OjN=2048,oFD=4096,jRd=8192,fYE=16384,Vnb=32768;function oQA(e){let{kind:t}=e,r=t===le6,i=t,n=e.fog||e.viewFog;if(t===Rxz&&(!e.fogSky&&!e.viewFog||!n&&!e.air))return i;if(e.ortho)i|=_GM;if(e.fog)i|=P0P|(e.fogExp2?jRd:0)|(e.fogHeight?fYE:0);if(e.viewFog)i|=Vnb;if(e.air)i|=DRr;if(t===dhh&&e.curve)i|=UFt;if(t===fEu&&e.blur)i|=oFD;if(!r)return i;if(e.flat)i|=fEI;if(e.clouds)i|=e.cloudMap&&!e.flat?rzY:x7T;if(e.night)i|=_VC;if(e.tint)i|=OjN;return i}var icY=(e)=>e&bG,uQW=(e,t)=>(e&t)!==0,dG={[Rxz]:"color",[dhh]:"gradient",[le6]:"physical",[fEu]:"equirect"},KG=[[fEI,"flat"],[x7T,"clouds"],[rzY,"cloudmap"],[_VC,"night"],[OjN,"tint"],[UFt,"curve"],[oFD,"blur"],[P0P,"fog"],[jRd,"exp2"],[fYE,"height"],[Vnb,"viewfog"],[DRr,"air"],[_GM,"ortho"]];var XM=(()=>globalThis.__spawnEngineConsole??=Object.create(console))();function niY(){return{wgslDefs:Sy9,sunDirection:"normalize(passLights.sunDirection)",sunRadiance:"(passLights.sunColor * passLights.sunIntensity)",ambientColor:"passLights.ambientColor",flatArtAmbientColor:"passLights.ambientColor",indirectIrradiance:()=>"passLights.ambientColor",evaluate:(...a)=>$c0C(52)(...a)}}var WoY=`fn lume_normalMatrix3(m: mat4x4<f32>) -> mat3x3<f32> {
  let a = m[0].xyz;
  let b = m[1].xyz;
  let c = m[2].xyz;
  let k = 1.0 / max(max(max(dot(a, a), dot(b, b)), dot(c, c)), 1e-30);
  let c0 = cross(b, c) * k;
  let c1 = cross(c, a) * k;
  let c2 = cross(a, b) * k;
  let s = select(1.0, -1.0, dot(a, c0) < 0.0);
  return mat3x3<f32>(c0 * s, c1 * s, c2 * s);
}`,vzW="0.31830988618",zu=`fn shade_lambertLight(N: vec3<f32>, L: vec3<f32>, albedo: vec3<f32>, sunRadiance: vec3<f32>, ambient: vec3<f32>) -> vec3<f32> {
  let ndotl = max(dot(N, L), 0.0);
  return albedo * (sunRadiance * ndotl + ambient) * ${vzW};
}`,ku=`fn shade_blinnSpecular(N: vec3<f32>, V: vec3<f32>, L: vec3<f32>, roughness: f32, sunRadiance: vec3<f32>) -> vec3<f32> {
  let ndotl = max(dot(N, L), 0.0);
  if (ndotl <= 0.0) { return vec3<f32>(0.0); }
  let H = normalize(L + V);
  let r2 = roughness * roughness;
  let shininess = clamp(2.0 / max(r2 * r2, 1e-4) - 2.0, 1.0, 1024.0);
  return sunRadiance * pow(max(dot(N, H), 0.0), shininess);
}

fn shade_phongSun(N: vec3<f32>, V: vec3<f32>, L: vec3<f32>, albedo: vec3<f32>, roughness: f32, sunRadiance: vec3<f32>, ambient: vec3<f32>) -> vec3<f32> {
  return shade_lambertLight(N, L, albedo, sunRadiance, ambient) + shade_blinnSpecular(N, V, L, roughness, sunRadiance * passLights.iblParams.z);
}`,nu=`fn shade_toonBandFactor(ndotl: f32, steps: f32) -> f32 {
  let s = max(steps, 1.0);
  return ceil(clamp(ndotl, 0.0, 1.0) * s) / s;
}

fn shade_toonBands(N: vec3<f32>, L: vec3<f32>, albedo: vec3<f32>, sunRadiance: vec3<f32>, ambient: vec3<f32>, steps: f32) -> vec3<f32> {
  return albedo * (sunRadiance * shade_toonBandFactor(dot(N, L), steps) + ambient) * ${vzW};
}`,Vu=`fn shade_matcapUv(N: vec3<f32>, V: vec3<f32>) -> vec2<f32> {
  let viewNormal = (frame.view * vec4<f32>(N, 0.0)).xyz;
  let viewDir = normalize((frame.view * vec4<f32>(V, 0.0)).xyz);
  let x = normalize(vec3<f32>(viewDir.z, 0.0, -viewDir.x));
  let y = cross(viewDir, x);
  return vec2<f32>(dot(x, viewNormal), -dot(y, viewNormal)) * 0.495 + 0.5;
}`,BB4=0.0525,Htp=`var<private> shade_specularF0: vec3<f32> = vec3<f32>(0.04);
fn shade_ggxDistribution(NdotH: f32, roughness: f32) -> f32 {
  let a = roughness * roughness;
  let a2 = a * a;
  let d = NdotH * NdotH * (a2 - 1.0) + 1.0;
  return a2 / (3.14159265359 * d * d);
}
fn shade_smithGeometry(NdotV: f32, NdotL: f32, roughness: f32) -> f32 {
  let r = roughness + 1.0;
  let k = (r * r) / 8.0;
  let gv = NdotV / (NdotV * (1.0 - k) + k);
  let gl = NdotL / (NdotL * (1.0 - k) + k);
  return gv * gl;
}
fn shade_fresnelSchlick(cosTheta: f32, f0: vec3<f32>) -> vec3<f32> {
  return f0 + (vec3<f32>(1.0) - f0) * pow(clamp(1.0 - cosTheta, 0.0, 1.0), 5.0);
}
fn shade_cookTorranceSun(N: vec3<f32>, V: vec3<f32>, L: vec3<f32>, albedo: vec3<f32>, roughness: f32, metalness: f32, sunRadiance: vec3<f32>, shine: f32) -> vec3<f32> {
  let NdotL = max(dot(N, L), 0.0);
  if (NdotL <= 0.0) { return vec3<f32>(0.0); }
  let H = normalize(V + L);
  let NdotV = max(dot(N, V), 1e-4);
  let NdotH = max(dot(N, H), 0.0);
  let f0 = mix(shade_specularF0, albedo, metalness);
  let D = shade_ggxDistribution(NdotH, roughness);
  let G = shade_smithGeometry(NdotV, NdotL, roughness);
  let F = shade_fresnelSchlick(max(dot(H, V), 0.0), f0);
  let specular = (D * G) * F / max(4.0 * NdotV * NdotL, 1e-4);
  let kd = (vec3<f32>(1.0) - F) * (1.0 - metalness);
  let diffuse = kd * albedo / 3.14159265359;
  return (diffuse + specular * shine) * sunRadiance * NdotL;
}
fn shade_ambientPbr(N: vec3<f32>, V: vec3<f32>, albedo: vec3<f32>, roughness: f32, metalness: f32, ambient: vec3<f32>) -> vec3<f32> {
  let f0 = mix(shade_specularF0, albedo, metalness);
  return (albedo * (1.0 - metalness) + f0) * ambient * 0.31830988618;
}`,du,k$O=`fn shade_clearcoatMix(base: vec3<f32>, coat: vec3<f32>, N: vec3<f32>, V: vec3<f32>, clearcoat: f32) -> vec3<f32> {
  let weight = clamp(clearcoat, 0.0, 1.0);
  let Fc = shade_fresnelSchlick(max(dot(N, V), 0.0), vec3<f32>(0.04));
  return base * (vec3<f32>(1.0) - Fc * weight) + coat * weight;
}`,au;function _7u(a){return (_7u=$c0C(55)).call(this,a)}function eu(a){return (eu=$c0C(56)).call(this,a)}var lu;function Q7u(e,t,r){let i=eu(e).map((e)=>r(e));return`  shade_physical = shade_physicalSurface(${[t.N,t.V,t.albedo,t.metalness,...i].join(", ")});`}function K7u(a){return (K7u=$c0C(58)).call(this,a)}function E7u(a){return (E7u=$c0C(59)).call(this,a)}function z7u(a){return (z7u=$c0C(60)).call(this,a)}var tu,Zu,hu;function ysW(a,b,c,d,e){return $c0C(64).call(this,a,b,c,d,e)}var Ou="lume_physicalCoat",yu=(e,{N:t,P:r,receiveShadow:i})=>`(${e.sunRadiance} * lighting_modelSunShadow(${t}, ${r}, in.position.xy, ${i??"1.0"}))`,cu=(e,{N:t,P:r,occlusion:i})=>`(${e.indirectIrradiance(t)} * (${i??"1.0"} * lighting_groundOcclusion(${r}, ${t})))`;function v7u(e){let t=({N:t,albedo:r},i=e.sunRadiance,n=e.indirectIrradiance(t))=>`shade_lambertLight(${t}, ${e.sunDirection}, ${r}, ${i}, ${n})`;if(!e.wrapEvaluateDefs){return{defs:zu,needsLighting:!0,litColor:(e)=>t(e),declaredFolds:0};}return{defs:`${zu}

${e.wrapEvaluateDefs}`,needsLighting:!0,litColor:(r)=>`(${t(r,yu(e,r),cu(e,r))} + ${r.albedo} * lighting_wrapClusteredIrradiance(${r.N}, ${r.P}, in.position.xy, 0.0) * ${vzW})`,declaredFolds:(e.declaredFolds??0)}}function a7u(e){let t=`${zu}

${ku}`,r=({N:t,V:r,albedo:i,roughness:n},l=e.sunRadiance,s=e.indirectIrradiance(t))=>`shade_phongSun(${t}, ${r}, ${e.sunDirection}, ${i}, ${n}, ${l}, ${s})`;if(!e.phongEvaluateDefs){return{defs:t,needsLighting:!0,litColor:(e)=>`(${r(e)})`,declaredFolds:0};}return{defs:`${t}

${e.phongEvaluateDefs}`,needsLighting:!0,litColor:(t)=>`(${r(t,yu(e,t),cu(e,t))} + lighting_phongClusteredDirect(${t.N}, ${t.V}, ${t.P}, ${t.albedo}, ${t.roughness}, in.position.xy))`,declaredFolds:(e.declaredFolds??0)}}function Z7u(e){let t=({N:t,albedo:r,toonSteps:i},n=e.sunRadiance,l=e.indirectIrradiance(t))=>`shade_toonBands(${t}, ${e.sunDirection}, ${r}, ${n}, ${l}, ${i})`;if(!e.toonEvaluateDefs){return{defs:nu,needsLighting:!0,litColor:(e)=>t(e),declaredFolds:0};}return{defs:`${nu}

${e.toonEvaluateDefs}`,needsLighting:!0,litColor:(r)=>`(${t(r,yu(e,r),cu(e,r))} + ${r.albedo} * lighting_toonClusteredDirect(${r.N}, ${r.P}, ${r.toonSteps}, in.position.xy) * ${vzW})`,declaredFolds:(e.declaredFolds??0)}}function I7u(e){if(!e)return{defs:"",needsLighting:!0,litColor:({albedo:e})=>e,declaredFolds:0};return{defs:Vu,needsLighting:!0,litColor:({N:t,V:r,albedo:i})=>`(${i} * textureSample(${e.texture}, ${e.sampler}, shade_matcapUv(${t}, ${r})).rgb)`,declaredFolds:0}}function SOp(e){return{defs:e.evaluateDefs?`${Htp}

${e.evaluateDefs}`:Htp,needsLighting:!0,litColor:(t)=>e.evaluate(t),declaredFolds:e.evaluateDefs?(e.declaredFolds??0):0}}function B7u(a){return (B7u=$c0C(65)).apply(this,arguments)}function rBw(e,t,r=null,i=0){if(t.materialProgram===!0&&(e==="lambert"||e==="phong"||e==="toon"))return SOp(t);switch(e){case"unlit":return{defs:"",needsLighting:!1,litColor:({albedo:e})=>e,declaredFolds:0};case"lambert":return v7u(t);case"phong":return a7u(t);case"toon":return Z7u(t);case"matcap":return I7u(r);case"physical":return B7u(t,i);case"pbr":return SOp(t)}}var Zr=0.15,Rr=0.2,lG3=`fn lighting_pixelRoughness(N: vec3<f32>, roughness: f32) -> f32 {
  let dNdx = dpdx(N);
  let dNdy = dpdy(N);
  let kernel = min(${_Td(2*Zr)} * (dot(dNdx, dNdx) + dot(dNdy, dNdy)), ${_Td(Rr)});
  let a = max(roughness, ${_Td(BB4)});
  let a2 = a * a;
  return sqrt(sqrt(clamp(a2 * a2 + kernel, 0.0, 1.0)));
}`,wr=(e,t)=>`let ${e}A = max(${t}, ${_Td(BB4)});
  let ${e}A2 = ${e}A * ${e}A;
  let ${e} = sqrt(sqrt(clamp(${e}A2 * ${e}A2, 0.0, 1.0)));`,o3M="rgba8unorm-srgb",Tya="rg32uint",yHd="r32uint",tM2="r32uint",wrG=536870912,GIr=2147483648,CWW=32767,_i="rgba16uint",xi="rg16uint",Zi="rg16uint";var RhK=(function(e){return e===1?Yi:Ni});var Yi={albedo:o3M,words:Tya,emissive:yHd,read:tM2},Ni={albedo:o3M,words:_i,emissive:xi,read:Zi},ui=[{name:"albedo",wgsl:"vec4<f32>",format:o3M},{name:"words",wgsl:"vec2<u32>",format:Tya},{name:"emissive",wgsl:"u32",format:yHd},{name:"read",wgsl:"u32",format:tM2}],LHQ=ui.length;var v0g=(function(e=!1,t=1){let r;if(t!==1){{r=Da(t,r)}}else r=ui.map(((e)=>({format:e.format})));if(e)r.push({format:Zjv});return r});var wsy=(function(e=!1,t=1){return`surface-buffer/v4${e?`/motion-${Zjv}`:""}${t!==1?`/ms${t}`:""}`});var CaX="LumeSurfaceMsOut",m_Q=`struct LumeSurfaceMsOut {
  @location(0) albedo: vec4<f32>,
  @location(1) words: vec4<u32>,
  @location(2) emissive: vec2<u32>,
  @location(3) read: vec2<u32>,
}
fn lume_surfaceMsHalves(word: u32) -> vec2<u32> {
  return vec2<u32>(word & 65535u, word >> 16u);
}
fn lume_surfaceMs(out: LumeSurfaceOut) -> LumeSurfaceMsOut {
  return LumeSurfaceMsOut(out.albedo, vec4<u32>(lume_surfaceMsHalves(out.words.x), lume_surfaceMsHalves(out.words.y)), lume_surfaceMsHalves(out.emissive), lume_surfaceMsHalves(out.read));
}`,wi="LumeSurfaceMsMotionOut",hml=`struct LumeSurfaceMsMotionOut {
  @location(0) albedo: vec4<f32>,
  @location(1) words: vec4<u32>,
  @location(2) emissive: vec2<u32>,
  @location(3) read: vec2<u32>,
  @location(${LHQ}) motion: vec4<f32>,
}
fn lume_surfaceMsMotion(out: LumeSurfaceMotionOut) -> LumeSurfaceMsMotionOut {
  let ms = lume_surfaceMs(LumeSurfaceOut(out.albedo, out.words, out.emissive, out.read));
  return LumeSurfaceMsMotionOut(ms.albedo, ms.words, ms.emissive, ms.read, out.motion);
}`;function IsG(e,t){if(t===1)return vLk(e);return e?wi:CaX}function huG(e,t,r){let i=t===null?e:`lume_surfaceMotion(${e}, ${t})`;if(r===1)return i;return t===null?`lume_surfaceMs(${e})`:`lume_surfaceMsMotion(${i})`}var Di="lume_coverageMask",CGc=`fn lume_coverageMask(xy: vec2<f32>, cut: vec4<f32>) -> u32 {
  let cell = vec2<u32>(max(xy, vec2<f32>(0.0))) & vec2<u32>(1u);
  let turn = (cell.x * 2u + cell.y * 3u) & 3u;
  let rank = vec4<f32>((vec4<u32>(0u, 1u, 2u, 3u) + vec4<u32>(turn)) & vec4<u32>(3u));
  let at = vec4<f32>(cut.x) + cut.y * vec4<f32>(-0.125, 0.375, -0.375, 0.125) + cut.z * vec4<f32>(-0.375, -0.125, 0.125, 0.375);
  let over = at >= cut.w * (rank + (f32(turn) + 0.5) * 0.25) * 0.25;
  return select(0u, 1u, over.x) | select(0u, 2u, over.y) | select(0u, 4u, over.z) | select(0u, 8u, over.w);
}`,qp5="lume_coverage",Mi="LumeSurfaceMsCoveredOut",qi=`struct LumeSurfaceMsCoveredOut {
  @location(0) albedo: vec4<f32>,
  @location(1) words: vec4<u32>,
  @location(2) emissive: vec2<u32>,
  @location(3) read: vec2<u32>,
  @builtin(sample_mask) mask: u32,
}
fn lume_surfaceMsCovered(out: LumeSurfaceOut, mask: u32) -> LumeSurfaceMsCoveredOut {
  let ms = lume_surfaceMs(out);
  return LumeSurfaceMsCoveredOut(ms.albedo, ms.words, ms.emissive, ms.read, mask);
}`,mi="LumeSurfaceMsCoveredMotionOut",Qi=`struct LumeSurfaceMsCoveredMotionOut {
  @location(0) albedo: vec4<f32>,
  @location(1) words: vec4<u32>,
  @location(2) emissive: vec2<u32>,
  @location(3) read: vec2<u32>,
  @location(${LHQ}) motion: vec4<f32>,
  @builtin(sample_mask) mask: u32,
}
fn lume_surfaceMsCoveredMotion(out: LumeSurfaceMotionOut, mask: u32) -> LumeSurfaceMsCoveredMotionOut {
  let ms = lume_surfaceMsMotion(out);
  return LumeSurfaceMsCoveredMotionOut(ms.albedo, ms.words, ms.emissive, ms.read, ms.motion, mask);
}`;function S8m(e,t){let r=`@fragment fn ${t}(`,i=e.indexOf(r);if(i<0||e.indexOf(r,i+r.length)>=0)return null;let n=P3B(e,i+r.length-1),l=n>=0&&e.startsWith(" -> LumeSurfaceMotionOut {",n+1),s=l?"LumeSurfaceMotionOut":"LumeSurfaceOut",o=n>=0&&e.startsWith(` -> ${s} {`,n+1)?n+1:-1,a=o<0?-1:P3B(e,o+` -> ${s} `.length);if(a<0)return null;let u=0,d=e.slice(o,a),f=d.includes(`let ${qp5}: u32`),c=l?/^(\s*)return (lume_surfaceMotion\(.*\));$/gm:/^(\s*)return (lume_surfacePressedRead\(.*\));$/gm,h=d.replace(c,function(e,t,r){if(u+=1,l)return f?`${t}return lume_surfaceMsCoveredMotion(${r}, ${qp5});`:`${t}return lume_surfaceMsMotion(${r});`;return f?`${t}return lume_surfaceMsCovered(${r}, ${qp5});`:`${t}return lume_surfaceMs(${r});`});if(u===0)return null;let p=f&&!e.includes(`fn ${Di}(`)?`
${CGc}`:"",m=[m_Q,...l?[hml]:[],...f?[qi]:[],...f&&l?[Qi]:[]];return`${e.slice(0,o)}${h.replace(` -> ${s} {`,` -> ${rn1(l,f)} {`)}${e.slice(a)}
${m.join(`
`)}${p}
`}function rn1(e,t){if(e)return t?mi:wi;return t?Mi:CaX}function Lg7(e,t){let r=[...e.matchAll(new RegExp(`@fragment\\s+fn\\s+${t}\\s*\\(`,"g"))];if(r.length!==1)return null;let i=r[0].index??0,n=i+r[0][0].length-1,l=P3B(e,n),s=l<0?null:/^\s*->\s*(LumeSurfaceOut|LumeSurfaceMotionOut)\s*\{/.exec(e.slice(l+1));if(s===null)return null;let o=s[1]==="LumeSurfaceMotionOut",a=e.slice(n+1,l),u=a.replace(/@\w+(\s*\([^)]*\))?\s*/g,""),d=u.split(",").map((e)=>e.split(":")[0].trim()).filter((e)=>e.length>0),f=`lume_surfaceOne_${t}`,c=e.includes("struct LumeSurfaceMsOut")?"":`
${m_Q}`,h=o&&!e.includes(`struct ${wi}`)?`
${hml}`:"",p=o?wi:CaX;return`${e.slice(0,i)}fn ${f}(${u}) -> ${s[1]} {${e.slice(l+1+s[0].length)}${c}${h}
@fragment fn ${t}(${a}) -> ${p} {
  return ${o?"lume_surfaceMsMotion":"lume_surfaceMs"}(${f}(${d.join(", ")}));
}
`}function A0Q(e,t,r){return r===1?e:Lg7(e,t)??e}var _PG=(function(e=!1){let t=ui.map(((e,t)=>`  @location(${t}) ${e.name}: ${e.wgsl},`));if(e)t.push(`  @location(${LHQ}) motion: vec4<f32>,`);return t.join(`
`)});var FsY=(function(e,t=null){let r=ui.map(((t)=>`${e}.${t.name}`));if(t!==null)r.push(`vec4<f32>(${t}, 0.0, 1.0)`);return r.join(", ")});var Q9z=7,SgO=2,bi=!1;function Xz2(){bi=!0}function b6P(){return bi}var ci=new WeakMap,ki=!1,Li=!1;function Otj(e,t){ci.set(e,t)}function jyt(e){return ci.get(e)}function jsj(){ki=!0}var q77=(function(){return ki});function PJ2(){Li=!0}function A3N(){return Li}var pi=new WeakMap;function vgU(e){return $P0(pi,e)}function Y4s(e,t){let r=$P0(pi,e);if(r.length=0,t!==null)r.push(t)}function FtX(e,t){if(Li)return;let r=vgU(e);for(let i=0;i<r.length;i+=1){let n=r[i];if(n.pipeline!==null||n.failed)continue;e.noteSkippedDraw(n),e.promoteToDraw(n,t)}}var Xi=0.35,Pi=-9,ji=0.99992,li=`  let a = -1.0 / (s + n.z);
  let b = n.x * n.y * a;
  return mat2x3<f32>(vec3<f32>(1.0 + s * n.x * n.x * a, s * b, -s * n.x), vec3<f32>(b, s + n.y * n.y * a, -n.y));
}`,vi=`fn lume_surfaceOctUp(code: vec2<u32>, full: i32) -> bool {
  let c = vec2<i32>(code);
  return abs(2 * c.x - full) + abs(2 * c.y - full) <= full;
}
fn lume_surfaceBendSteps(n: vec3<f32>, up: bool) -> mat2x3<f32> {
  let s = select(-1.0, 1.0, up);
${li}`,Wi=`fn lume_surfaceOctEncode(n: vec3<f32>) -> vec2<f32> {
  let p = n.xy / (abs(n.x) + abs(n.y) + abs(n.z));
  let folded = (vec2<f32>(1.0) - abs(p.yx)) * select(vec2<f32>(-1.0), vec2<f32>(1.0), p >= vec2<f32>(0.0));
  return select(folded, p, n.z >= 0.0) * 0.5 + vec2<f32>(0.5);
}
fn lume_surfaceAxisWord(n: vec3<f32>) -> f32 {
  let a = abs(n);
  if (a.x >= a.y && a.x >= a.z) {
    return select(2.0, 1.0, n.x >= 0.0);
  }
  if (a.y >= a.z) {
    return select(4.0, 3.0, n.y >= 0.0);
  }
  return select(6.0, 5.0, n.z >= 0.0);
}`,b7l=2147483648,Ri=2147483648,egu=`${lG3}
struct LumeSurfaceOut {
${_PG()}
}
var<private> lume_surfacePoint: vec3<f32>;
var<private> lume_surfaceHorizon: vec3<f32>;
${Wi}
${vi}
fn lume_surfaceGlowWord(glow: vec3f) -> u32 {
  let b = bitcast<vec3u>(glow);
  let kept = min(b & (((min(b, vec3u(0x7f800001u)) + 0x7fffffu) >> vec3u(31u)) - 1u), vec3u(0x477e0000u, 0x477e0000u, 0x477c0000u));
  let small = vec3u(round(bitcast<vec3f>(min(kept, vec3u(0x38800000u))) * vec3f(1048576, 1048576, 524288)));
  let code = small + ((max(kept, vec3u(0x38800000u)) - vec3u(0x387f0000u, 0x387f0000u, 0x387e0000u)) >> vec3u(17u, 17u, 18u));
  return code.x | (code.y << 11u) | (code.z << 22u);
}
fn lume_surfaceOffsetCode(o: vec3<f32>) -> vec2<u32> {
  let a = max(abs(o.x), max(abs(o.y), abs(o.z)));
  let e = clamp(i32((bitcast<u32>(a * (2048.0 / 2047.5)) >> 23u) & 255u) - 126 - (${Pi}), 0, 15);
  let m = vec3<u32>(min(round(abs(o) * exp2(f32(11 - e - (${Pi})))), vec3<f32>(2047.0))) | select(vec3<u32>(0u), vec3<u32>(2048u), o < vec3<f32>(0.0));
  return vec2<u32>(m.x | (m.y << 12u) | ((m.z & 127u) << 24u), (m.z >> 7u) | (u32(e) << 5u));
}
fn lume_surfaceAt(N: vec3<f32>, albedo: vec3<f32>, roughness: f32, metalness: f32, receiveShadow: f32, emissive: vec3<f32>, kind: u32, read: u32, last: u32) -> LumeSurfaceOut {
  let pixelRoughness = lighting_pixelRoughness(N, roughness);
  let len = sqrt(dot(N, N));
  let unit = N / len;
  let oct = vec2<u32>(round(lume_surfaceOctEncode(unit) * 32767.0));
  let length6 = u32(round(clamp((len - 0.5) * 2.0, 0.0, 1.0) * 63.0));
  let plane = cross(dpdx(lume_surfacePoint), dpdy(lume_surfacePoint));
  let planeSq = dot(plane, plane);
  let along = dot(plane, unit);
  let planeIsNormal = (planeSq > 0.0) & (along * along >= ${ji} * planeSq);
  var out: LumeSurfaceOut;
  out.albedo = vec4<f32>(max(albedo, vec3<f32>(0.0)), clamp(metalness, 0.0, 1.0));
  out.words = vec2<u32>(oct.x | (oct.y << 15u) | select(0u, 0x40000000u, planeIsNormal), u32(round(clamp(pixelRoughness, 0.0, 1.0) * 4095.0)) | select(0u, 4096u, receiveShadow > 0.5) | (length6 << 13u) | (kind << 19u) | (last << 23u));
  let glowWord = lume_surfaceGlowWord(emissive);
  let code = vec2<u32>(round(lume_surfaceOctEncode(plane) * 4095.0));
  let planeStored = (planeSq > 0.0) & !planeIsNormal & (glowWord == 0u);
  let horizonAlong = dot(unit, lume_surfaceHorizon);
  let horizon = planeStored & (kind == 8u) & (read == 0u) & (horizonAlong > 0.0) & (horizonAlong * horizonAlong < ${ji} * dot(lume_surfaceHorizon, lume_surfaceHorizon));
  let bendSteps = lume_surfaceBendSteps(unit, lume_surfaceOctUp(oct, 32767));
  let across = vec2<f32>(dot(lume_surfaceHorizon, bendSteps[0]), dot(lume_surfaceHorizon, bendSteps[1]));
  let fold = across / select(1.0, abs(across.x) + abs(across.y) + horizonAlong, horizon);
  let bend = vec2<u32>(round(clamp(vec2<f32>(fold.x + fold.y, fold.x - fold.y), vec2<f32>(-1.0), vec2<f32>(1.0)) * vec2<f32>(127.0, 63.0)) + vec2<f32>(127.0, 63.0));
  out.emissive = select(glowWord, (code.x & 63u) | (31u << 6u) | ((code.x >> 6u) << 11u) | (code.y << 17u) | select(0u, ${wrG}u, horizon), planeStored);
  out.read = select(read, read | (bend.x << 16u) | (bend.y << 24u), horizon);
  return out;
}
fn lume_surfaceRead(N: vec3<f32>, albedo: vec3<f32>, roughness: f32, metalness: f32, receiveShadow: f32, emissive: vec3<f32>, read: vec4<f32>) -> LumeSurfaceOut {
  let code = lume_surfaceOffsetCode(read.xyz);
  return lume_surfaceAt(N, albedo, roughness, metalness, receiveShadow, emissive, u32(i32(round(read.w)) + 8), code.x, code.y);
}
fn lume_surfaceOut(N: vec3<f32>, albedo: vec3<f32>, roughness: f32, metalness: f32, receiveShadow: f32, emissive: vec3<f32>) -> LumeSurfaceOut {
  return lume_surfaceAt(N, albedo, roughness, metalness, receiveShadow, emissive, 8u, 0u, 0u);
}
fn lume_surfaceMarkedAt(N: vec3<f32>, albedo: vec3<f32>, roughness: f32, metalness: f32, receiveShadow: f32, emissive: vec3<f32>, distance: f32, sky: f32) -> LumeSurfaceOut {
  return lume_surfaceAt(N, albedo, roughness, metalness, receiveShadow, emissive, 8u, 0x80000000u | bitcast<u32>(max(distance, 0.0)), u32(round(clamp(sky, 0.0, 1.0) * 255.0)));
}
fn lume_surfaceUnlitAs(out: LumeSurfaceOut, unlit: bool) -> LumeSurfaceOut {
  var held = out;
  if (unlit) {
    held.words.y = (held.words.y & ~(15u << 19u)) | (1u << 19u);
  }
  return held;
}
fn lume_surfaceUnlit(rgb: vec3<f32>) -> LumeSurfaceOut {
  return lume_surfaceUnlitAs(lume_surfaceOut(vec3<f32>(0.0, 1.0, 0.0), rgb, 1.0, 0.0, 0.0, vec3<f32>(0.0)), true);
}
fn lume_surfaceFogOff(out: LumeSurfaceOut) -> LumeSurfaceOut {
  var held = out;
  held.words.x = held.words.x | ${Ri}u;
  return held;
}
//${CWW}
fn lume_surfaceAttributed(out: LumeSurfaceOut, value: u32) -> LumeSurfaceOut {
  var held = out;
  let plain = ((held.words.y >> 19u) & 15u) == 8u && (held.read & 0x80000000u) == 0u;
  held.read = select(held.read, (held.read & 0xffffu) | (min(value, ${CWW}u) << 16u), plain);
  return held;
}`,fi=`struct LumeSurfaceMotionOut {
${_PG(!0)}
}
fn lume_surfaceMotion(out: LumeSurfaceOut, motion: vec2<f32>) -> LumeSurfaceMotionOut {
  return LumeSurfaceMotionOut(${FsY("out","motion")});
}
fn lume_surfaceStillMotion(out: LumeSurfaceOut, worldPosition: vec3<f32>) -> LumeSurfaceMotionOut {
  let p = vec4<f32>(worldPosition, 1.0);
  return lume_surfaceMotion(out, lume_motionVector(frame.viewProj * p, frame.prevViewProj * p));
}`,CwV=`fn lume_surfaceOccluded(out: LumeSurfaceOut, occlusion: f32) -> LumeSurfaceOut {
  var held = out;
  held.read = (held.read & 0x7fff0000u) | u32(round((1.0 - clamp(occlusion, 0.0, 1.0)) * 65535.0));
  return held;
}`,_hQ=`
fn lume_surfaceCoated(out: LumeSurfaceOut, N: vec3<f32>, clearcoat: f32, clearcoatRoughness: f32) -> LumeSurfaceOut {
  let weight = u32(round(clamp(clearcoat, 0.0, 1.0) * 31.0));
  let rough = u32(round(sqrt(clamp(lighting_pixelRoughness(N, clearcoatRoughness), 0.0, 1.0)) * 15.0));
  var held = out;
  held.words.y = select(held.words.y, (held.words.y & 0x0007ffffu) | (${SgO}u << 19u) | (weight << 23u) | (rough << 28u), weight > 0u);
  return held;
}`,Ei=23,ii=8,FpQ=(1<<ii)-1,V0h="const LUME_OWN_LIGHT_SLOT: u32 = 0u;";function qkq(e){return`const LUME_OWN_LIGHT_SLOT: u32 = ${e}u;`}var gi=`${FpQ}u << ${Ei}u`,$dj=`
${V0h}
fn lume_surfaceOwnLit(out: LumeSurfaceOut) -> LumeSurfaceOut {
  var held = out;
  let plain = ((held.words.y >> 19u) & 15u) == 8u && (held.read & 0x80000000u) == 0u;
  held.words.y = select(held.words.y, (held.words.y & ~(${gi})) | (LUME_OWN_LIGHT_SLOT << ${Ei}u), plain);
  return held;
}`,Vi=new Map,di=[],zi=[],Ki=[],ti=[],Si=new Set;function j_W(e){let t=Vi.get(e.key);if(t===void 0){if(di.length<FpQ)di.push(e),zi.push(0),t=di.length;else{let r=Ki[0];if(r===void 0){if(!Si.has(e.key))Si.add(e.key),XM.warn(`[own-light] every one of the ${FpQ} slots of a material's own lighting() (the surface words' ${ii} bits) is held by a program that stands, so "${e.program.ref}" lights its surface by the world's program until a slot frees`);return 0}let i=di[r-1];if(i!==void 0)Vi.delete(i.key);di[r-1]=e,t=r}Vi.set(e.key,t)}if(zi[t-1]===0)YNM(Ki,t),ti.push(t);return zi[t-1]+=1,t}function CuZ(e){if(e<=0||!(zi[e-1]>0))return;if(zi[e-1]-=1,zi[e-1]>0)return;YNM(ti,e),Ki.push(e),Si=mnS(Si)}function eES(){return ti}function uic(e){return di[e-1]}var MIs=`fn lume_surfacePressedRead(out: LumeSurfaceOut) -> LumeSurfaceOut {
  var held = out;
  if (frame.depthFloor > 0.0) {
    held.read = (held.read & 0xffffu) | (min(u32(round(frame.proj[1][1] * 1024.0)), 32767u) << 16u);
    let kind = (held.words.y >> 19u) & 15u;
    held.words.y = held.words.y | select(0u, ${GIr}u, kind == 8u || kind == 1u);
  }
  return held;
}`,Ii="fn lume_surfaceAt(N: vec3<f32>, albedo: vec3<f32>, roughness: f32, metalness: f32, receiveShadow: f32, emissive: vec3<f32>, kind: u32, read: u32, last: u32) -> LumeSurfaceOut {",yi="let pixelRoughness = lighting_pixelRoughness(N, roughness);",oi="let plane = cross(dpdx(lume_surfacePoint), dpdy(lume_surfacePoint));";function FS9(){let e=egu.indexOf(Ii),t=e<0?-1:egu.indexOf(`
}
`,e),r=e<0||t<0?"":egu.slice(e,t+2);if(!r.includes(yi)||!r.includes(oi))throw Error("lume: lume_surfaceAt no longer reads the pixel roughness and the plane as the flat face's writer takes them, so that writer cannot be derived from it");let i=r.replace(Ii,"fn lume_surfaceAtFlat(N: vec3<f32>, albedo: vec3<f32>, roughness: f32, metalness: f32, receiveShadow: f32, emissive: vec3<f32>, kind: u32, read: u32, last: u32, plane: vec3<f32>) -> LumeSurfaceOut {").replace(yi,wr("pixelRoughness","roughness")).replace(oi,"");return`${egu.slice(0,e).replace(lG3,"")}${i}
fn lume_surfaceMarkedFlat(N: vec3<f32>, plane: vec3<f32>, albedo: vec3<f32>, roughness: f32, metalness: f32, receiveShadow: f32, emissive: vec3<f32>, distance: f32, sky: f32) -> LumeSurfaceOut {
  return lume_surfaceAtFlat(N, albedo, roughness, metalness, receiveShadow, emissive, 8u, 0x80000000u | bitcast<u32>(max(distance, 0.0)), u32(round(clamp(sky, 0.0, 1.0) * 255.0)), plane);
}`}function cuN(e){return e?`${egu}
${fi}`:egu}function vLk(e){return e?"LumeSurfaceMotionOut":"LumeSurfaceOut"}function odG(e){return e?"LumeMotionFragment":"@location(0) vec4<f32>"}var Owu=`fn lume_surfaceOctDecode(e: vec2<f32>) -> vec3<f32> {
  let f = e * 2.0 - vec2<f32>(1.0);
  var n = vec3<f32>(f.x, f.y, 1.0 - abs(f.x) - abs(f.y));
  let t = max(-n.z, 0.0);
  n.x = n.x + select(t, -t, n.x >= 0.0);
  n.y = n.y + select(t, -t, n.y >= 0.0);
  return normalize(n);
}`,$w_=`
fn lume_surfacePlaneIsNormal(words: vec2<u32>) -> bool {
  return (words.x & 0x40000000u) != 0u;
}
fn lume_surfacePlaneInEmissive(word: u32) -> bool {
  return ((word >> 6u) & 31u) == 31u;
}
fn lume_surfaceEmissivePlane(word: u32) -> vec3<f32> {
  return lume_surfaceOctDecode(vec2<f32>(f32((word & 63u) | (((word >> 11u) & 63u) << 6u)), f32((word >> 17u) & 4095u)) / 4095.0);
}
fn lume_surfaceHorizonIn(words: vec2<u32>, emissiveWord: u32) -> bool {
  return lume_surfacePlaneInEmissive(emissiveWord) && (emissiveWord & ${wrG}u) != 0u && (words.y & ${GIr}u) == 0u;
}`,EaR=`
fn lume_surfaceKind(words: vec2<u32>) -> u32 {
  return (words.y >> 19u) & 15u;
}
fn lume_surfaceReadAxis(kind: u32) -> i32 {
  return select(i32(kind) - 8, 0, kind < 8u);
}`,$i=`
fn lume_surfaceMarked(read: u32) -> bool {
  return (read & 0x80000000u) != 0u;
}`,RRg=`${$i}
fn lume_surfaceMarkedDistance(read: u32) -> f32 {
  return bitcast<f32>(read & 0x7fffffffu);
}`,XfG=`
fn lume_surfaceOcclusion(kind: u32, read: u32) -> f32 {
  return select(1.0, 1.0 - f32(read & 65535u) / 65535.0, (kind == 8u || kind == ${SgO}u) && !lume_surfaceMarked(read));
}`,I1G=`
fn lume_surfacePressedBit(words: vec2<u32>) -> bool {
  return (words.y & ${GIr}u) != 0u;
}
fn lume_surfaceAttribute(kind: u32, read: u32, words: vec2<u32>, emissiveWord: u32) -> u32 {
  return select(0u, (read >> 16u) & ${CWW}u, kind == 8u && !lume_surfaceMarked(read) && !lume_surfacePressedBit(words) && !lume_surfaceHorizonIn(words, emissiveWord));
}`,oby=`fn lume_surfaceEmissive(word: u32) -> vec3f {
  let glow = word & (((((word >> 6u) & 31u) + 1u) >> 5u) - 1u);
  let code = min(vec3u(glow & 2047u, (glow >> 11u) & 2047u, glow >> 22u), vec3u(1983u, 1983u, 991u));
  let exponent = code >> vec3u(6u, 6u, 5u);
  return vec3f((code & vec3u(63u, 63u, 31u)) | (min(exponent, vec3u(1u)) << vec3u(6u, 6u, 5u))) * bitcast<vec3f>((max(exponent, vec3u(1u)) + vec3u(106u, 106u, 107u)) << vec3u(23u));
}`,si=`
fn lume_surfaceOwnLight(words: vec2<u32>, read: u32) -> u32 {
  return select(0u, (words.y >> ${Ei}u) & ${FpQ}u, ((words.y >> 19u) & 15u) == 8u && !lume_surfaceMarked(read));
}`,dv7=`@group(2) @binding(1) var surfaceWords: texture_2d<u32>;
@group(2) @binding(3) var surfaceRead: texture_2d<u32>;
@group(2) @binding(4) var surfaceDepth: texture_2d<f32>;
${$i}
${si}`,HAU=`@group(2) @binding(0) var surfaceAlbedo: texture_2d<f32>;
@group(2) @binding(1) var surfaceWords: texture_2d<u32>;
@group(2) @binding(2) var surfaceEmissive: texture_2d<u32>;
@group(2) @binding(3) var surfaceRead: texture_2d<u32>;
@group(2) @binding(4) var surfaceDepth: texture_2d<f32>;
${Owu}
${vi}
fn lume_surfaceHorizonOf(n: vec3<f32>, words: vec2<u32>, read: u32, emissiveWord: u32) -> vec3<f32> {
  let code = vec2<u32>(words.x & 32767u, (words.x >> 15u) & 32767u);
  let steps = lume_surfaceBendSteps(n, lume_surfaceOctUp(code, 32767));
  let bend = (vec2<f32>(f32((read >> 16u) & 255u), f32((read >> 24u) & 127u)) - vec2<f32>(127.0, 63.0)) / vec2<f32>(127.0, 63.0);
  let fold = vec2<f32>(bend.x + bend.y, bend.x - bend.y) * 0.5;
  return select(vec3<f32>(0.0), normalize(steps[0] * fold.x + steps[1] * fold.y + n * (1.0 - abs(fold.x) - abs(fold.y))), lume_surfaceHorizonIn(words, emissiveWord));
}
fn lume_surfaceNormal(words: vec2<u32>) -> vec3<f32> {
  return lume_surfaceOctDecode(vec2<f32>(f32(words.x & 32767u), f32((words.x >> 15u) & 32767u)) / 32767.0) * (0.5 + f32((words.y >> 13u) & 63u) / 126.0);
}
${$w_}
fn lume_surfacePlaneSteps(n: vec3<f32>) -> mat2x3<f32> {
  let s = select(-1.0, 1.0, n.z >= 0.0);
${li}
fn lume_surfaceRoughness(words: vec2<u32>) -> f32 {
  return f32(words.y & 4095u) / 4095.0;
}
fn lume_surfaceTakesShadow(words: vec2<u32>) -> f32 {
  return select(0.0, 1.0, (words.y & 4096u) != 0u);
}
fn lume_surfaceTakesFog(words: vec2<u32>) -> bool {
  return (words.x & ${Ri}u) == 0u;
}
${EaR}
${RRg}
${XfG}
fn lume_surfaceCoat(kind: u32, words: vec2<u32>) -> vec2<f32> {
  let rough = f32(words.y >> 28u) / 15.0;
  return select(vec2<f32>(0.0), vec2<f32>(f32((words.y >> 23u) & 31u) / 31.0, rough * rough), kind == ${SgO}u);
}
${si}
${I1G}
fn lume_surfaceSky(words: vec2<u32>) -> f32 {
  return f32((words.y >> 23u) & 255u) / 255.0;
}
fn lume_surfaceOffset(read: u32, words: vec2<u32>) -> vec3<f32> {
  let last = words.y >> 23u;
  let parts = vec3<u32>(read & 4095u, (read >> 12u) & 4095u, ((read >> 24u) & 127u) | ((last & 31u) << 7u));
  let size = vec3<f32>(parts & vec3<u32>(2047u)) * exp2(f32(i32(last >> 5u) + (${Pi}) - 11));
  return select(size, -size, (parts & vec3<u32>(2048u)) != vec3<u32>(0u));
}
${oby}
fn lume_surfaceAxis(word: u32) -> vec3<f32> {
  switch (word) {
    case 1u: { return vec3<f32>(1.0, 0.0, 0.0); }
    case 2u: { return vec3<f32>(-1.0, 0.0, 0.0); }
    case 3u: { return vec3<f32>(0.0, 1.0, 0.0); }
    case 4u: { return vec3<f32>(0.0, -1.0, 0.0); }
    case 5u: { return vec3<f32>(0.0, 0.0, 1.0); }
    default: { return vec3<f32>(0.0, 0.0, -1.0); }
  }
}
fn lume_surfaceStandNormal(N: vec3<f32>, ground: vec3<f32>) -> vec3<f32> {
  let along = dot(N, ground);
  let across = N - ground * along;
  let reach = length(across);
  if (reach < 0.0001) {
    return ground;
  }
  let detail = clamp(reach / (max(along, 0.0001) * ${Xi}), 0.0, 1.0);
  return normalize(ground * (1.001 - detail) + across * (detail / reach));
}`;function REd(a){return $c0O(214).call(this,a)}var Cr4=[{binding:0,visibility:2,texture:{sampleType:"unfilterable-float",viewDimension:"2d",multisampled:!0}},{binding:1,visibility:2,texture:{sampleType:"uint",viewDimension:"2d",multisampled:!0}},{binding:2,visibility:2,texture:{sampleType:"uint",viewDimension:"2d",multisampled:!0}},{binding:3,visibility:2,texture:{sampleType:"uint",viewDimension:"2d",multisampled:!0}},{binding:4,visibility:2,texture:{sampleType:"depth",viewDimension:"2d",multisampled:!0}}],ymL=[v6R(0,2,"unfilterable-float","2d")],a8V="@group(3) @binding(0) var waterLight: texture_2d<f32>;",e26=[v6R(0,2,"unfilterable-float","2d"),v6R(1,2,"uint","2d"),v6R(2,2,"uint","2d"),v6R(3,2,"uint","2d"),v6R(4,2,"unfilterable-float","2d")];function bny(e,t,r,i,n,l,s,o){let a=e?.views??[];if(e&&a[0]===i&&a[1]===n&&a[2]===l&&a[3]===s&&a[4]===o)return e;{let u=[i,n,l,s,o],d=r.getBindGroupLayout(e26,"lume worn surface");return{group:t.createBindGroup({label:"lume worn surface",layout:d,entries:u.map((e,t)=>({binding:t,resource:e}))}),views:u}
}}var s$A="fsSampleFeedback";var ufe=(function(e){return RhK(e).read});var ET={[BK]:AsL},gT={[BK]:tsL};function UlD(a,b,c){return (UlD=$c0C(66)).call(this,a,b,c)}function bT(e){return e.multisample?.count??1}var nT=65536,$ff=16,RT=[null],jT=[],qT=0,MT=0;function zcw(){return MT}function sCX(e){let t={sink:e,finest:1/0,unmeasuredFrom:-1,unmeasuredTo:-1,measured:null,spoken:0,span:0,drawnFrom:-1,rests:!1,twinless:-1};MT+=1;let r=jT.pop();if(r!==void 0)return RT[r]=t,qT+=1,r;if(RT.length>=nT)return 0;return RT.push(t),qT+=1,RT.length-1}function kpT(e){if((RT[e]??null)===null)return;RT[e]=null,jT.push(e),qT-=1,MT+=1}function FYB(e,t){let r=RT[e]??null;if(r===null||r.rests===t)return;if(r.rests=t,r.measured=null,r.finest=1/0,r.unmeasuredFrom=r.unmeasuredTo=r.drawnFrom=r.twinless=-1,r.spoken=r.span=0,MT+=1,t)r.sink(null,0)}function OZN(){return RT.length}var Njx=(function(){return qT>0});var fT=0,dT=1,TT=0,HT=!0,eT=!1,_T=-1,LT=0,PT=2**$ff-1,DT=new Map;function sT(e){let t=Math.floor(e/$ff),r=2**(e%$ff);if(t===_T)LT|=r;else if(t>_T)DT.set(t,(DT.get(t)??0)|r)}var YOg=(function(e){dT=Math.max(1,Math.floor(e))});function l2I(){eT=!0}var HKP=(function(){let e=eT;if(eT=!1,TT+=1,HT=!e||TT>=dT,!HT)return;TT=0,fT+=1});function B2i(){return HT}function bgK(){return fT}function H2l(e,t,r){let i=Math.floor(e/$ff);if(i>_T){Fa(i);}sT(e);let n=Math.min(r,RT.length);for(let e=1;e<n;e+=1){let r=t[e];if(r===0)continue;let i=RT[e];if(i===null)continue;let n=(65536-r)/256;if(n<i.finest)i.finest=n}}function CEb(e,t,r,i=!1){let n=Math.floor(e/$ff);if(n<_T)return;sT(e);for(let e=0;e<r;e+=1){let r=RT[t[e]]??null;if(r===null)continue;if(i)r.twinless=n;if(r.unmeasuredFrom<0||r.unmeasuredTo<_T)r.unmeasuredFrom=r.unmeasuredTo=n;else r.unmeasuredFrom=Math.min(r.unmeasuredFrom,n),r.unmeasuredTo=Math.max(r.unmeasuredTo,n)}}var iT=0;function Cct(e){iT=e}function ylD(a,b){return (ylD=$c0C(67)).call(this,a,b)}function pT(e){let t=RT[e]??null;return t!==null&&(t.measured===null||t.twinless>=_T-1)}function n$2(e){for(let t=0;t<e.length;t+=1){if(pT(JT(e[t])))return!0;}return!1}function JeK(e,t){if(!(t>0))return;for(let r=0;r<e.length;r+=1){let i=JT(e[r]);let n=RT[i]??null;if(n===null||!pT(i)||!(t>n.spoken))continue;if(n.spoken===0&&n.span===0&&!n.rests){{n.drawnFrom=Math.max(_T,Math.floor(fT/$ff));
}}n.spoken=t}}var JT=(e)=>e._residency?.()[0]??0,CT=XBU();function Vgt(e,t,r=!1){if(r){{if((ea=Ha(e,t))!==ca)return ea}}if(r||t.length!==0)CT.set(e,t);return!0}function TIr(e,t,r){let i=CT.get(e);if(i===void 0)return r;let n=r;for(let e=0;e<i.length;e+=1){let r=JT(i[e]);if(r>0)t[n++]=r}return n}function IyN(e){return e%$ff}var NT=XBU(),ST=0;function sSE(e){let t=NT.get(e);if(t===void 0)t=ST%$ff,ST+=1,NT.set(e,t);return t}function yVx(e){if(typeof e!=="object"||e===null)return;let t=Reflect.get(e,"residency");return typeof t==="function"?t:void 0}var Z4=(()=>globalThis.__spawnEngineConsole??=Object.create(console))(),m4=/@fragment\s+fn\s+([A-Za-z_]\w*)\s*\(/g,N4=/^[A-Za-z_]\w*$/,A4=/@builtin\s*\(\s*position\s*\)/;var V4=(function(e){let t="",r=0;while(r<e.length){if(e[r]!=="@"){t+=e[r],r+=1;continue}r+=1;while(r<e.length&&/\w/.test(e[r]))r+=1;let i=r;while(i<e.length&&(e[i]===" "||e[i]==="\t"))i+=1;if(e[i]==="("){let t=0;for(;i<e.length;i+=1)if(e[i]==="(")t+=1;else if(e[i]===")"&&--t===0)break;r=i+1}while(r<e.length&&(e[r]===" "||e[r]==="\t"))r+=1}return t});var F4=(function(e){let t=V4(e).trim(),r=t.indexOf(":");if(r<0)return null;let i=t.slice(0,r).trim();if(!N4.test(i))return null;return{text:e.trim(),name:i,type:t.slice(r+1).trim()}});function M4(e,t){for(let r of e.matchAll(new RegExp(`\\bstruct\\s+${t}\\s*\\{`,"g"))){let t=r.index+r[0].length-1,i=P3B(e,t);if(i<0)return null;let n=eMf(e.slice(t+1,i)).map(F4);return n.every(((e)=>e!==null))?n:null}return null}var z4=(function(e){let t=[];for(let r of e.matchAll(m4)){let i=r.index+r[0].length-1,n=P3B(e,i);if(n<0)return null;let l=e.indexOf("{",n);if(l<0)return null;let s=e.slice(n+1,l).trim();if(s.length>0&&!s.startsWith("->"))return null;t.push({name:r[1],at:r.index,bodyOpen:l,params:e.slice(i+1,n),returned:s.length===0?null:s.slice(2).trim()})}return t});function XSi(a,b){return (XSi=$c0C(68)).call(this,a,b)}var T4=(function(e,t,r,i){let n=e.slice(t.at,t.bodyOpen),l=/^@fragment(\s+)fn/.exec(n)?.[1].match(/\n/g)?.length??0,s=`${`
`.repeat(l)}fn ${r}(${V4(t.params)})${i} `,o=(n.match(/\n/g)?.length??0)-(s.match(/\n/g)?.length??0);return o>0?s+`
`.repeat(o):s});var Q4=(function(e,t){let r="",i=0;for(let n of t)r+=e.slice(i,n.entry.at)+n.head,i=n.entry.bodyOpen;return`${r}${e.slice(i)}
${t.map(((e)=>e.tail)).join("")}`});var Af="lume_storeMask",of="fn lume_storeGrid(";var[uf,Sf,wf]=D6;var [Ef,bf,rf]=mNi[Y6];var hf=`override ${Af}: u32 = 0u;
fn lume_storeGrid(v: vec3<f32>, n: f32) -> vec3<f32> {
  let most = vec3<f32>(${_Td(Ef)}, ${_Td(bf)}, ${_Td(rf)});
  let c = clamp(v, vec3<f32>(0.0), most);
  let e = max(bitcast<vec3<u32>>(c) & vec3<u32>(${RK(((255)*8388608))}), vec3<u32>(${RK(((113)*8388608))}));
  let x = c * bitcast<vec3<f32>>(vec3<u32>(${RK(((254+uf)*8388608))}, ${RK(((254+Sf)*8388608))}, ${RK(((254+wf)*8388608))}) - e);
  let q = select(max(floor(x + vec3<f32>(n)), vec3<f32>(0.0)), x, floor(x) == x);
  return min(q * bitcast<vec3<f32>>(e - vec3<u32>(${RK((uf*8388608))}, ${RK((Sf*8388608))}, ${RK((wf*8388608))})), most);
}
fn lume_storeNoise(pixel: vec2<f32>) -> f32 {
  let p = floor(pixel);
  return fract(52.9829189 * fract(dot(p, vec2<f32>(0.06711056, 0.00583715)))) + fract(dot(p, vec2<f32>(0.7548776662, 0.569840291))) - 0.5;
}
`;var ef=/@location\s*\(\s*(\d+)\s*\)/;var af=/^vec([34])(?:<\s*(f32|f16)\s*>|([fh]))$/;var kf=/^(?:bool|f16|f32|i32|u32|vec[234][fhiu]|mat[234]x[234][fh])$/;var ff=(function(e,t){let r=ef.exec(e),i=af.exec(t.replace(/\s+/g,""));if(r===null||i===null)return null;return{location:Number(r[1]),width:i[1]==="3"?3:4,half:(i[2]??i[3])==="f16"||i[3]==="h"}});var qUu=(function(e,t,r){let i=((e)=>`lume_storeGrid(${e}, lume_storeNoise(${r}))`);if(!t.half)return t.width===4?`vec4<f32>(${i(`${e}.xyz`)}, ${e}.w)`:i(e);return Ia(t,i,e);});var CUu=(function(e,t){let r=t.find(((e)=>A4.test(e.text)));if(r!==void 0)return r.name;for(let r of t){let t=r.type.replace(/\s+/g,"");if(!N4.test(t)||kf.test(t))continue;let i=M4(e,t);if(i===null)return null;let n=i.find(((e)=>A4.test(e.text)));if(n!==void 0)return`${r.name}.${n.name}`}return"none"});var Cf=4096;function YsB(e,t){let r=(e%Cf+Cf)%Cf,i=(t%Cf+Cf)%Cf;return r+i*Cf}var tf=/\bstruct\s+Frame\s*\{[^}]*\bgrainAnchor\s*:\s*f32\b/,zf=/\bvar\s*<\s*uniform\s*>\s*frame\s*:\s*Frame\b/,pf=/(?<![\w.])frame\s*\./,lf=/\b(?:let|var|const)\s+frame\b/,gf=`vec2<f32>(frame.grainAnchor - floor(frame.grainAnchor / ${Cf}.0) * ${Cf}.0, floor(frame.grainAnchor / ${Cf}.0))`,Hr0="lume_storeOnScreen",Qf=new RegExp(`\\bvar\\s*<\\s*private\\s*>\\s*${Hr0}\\s*:\\s*bool\\b`);var EzM=(function(e){return`var<private> ${Hr0}: bool = ${e?"true":"false"};`});var If=/\bfn\s+([A-Za-z_]\w*)\s*\(/g,Uf=/([A-Za-z_]\w*)\s*\(/g,Xf=/(?:^|,)\s*frame\s*:/;class AUu{constructor(e){this.blank=void 0;this.heads=null;this.read=new Map;this.blank=e}of(e){let t=this.read.get(e);if(t!==void 0)return t;if(this.heads===null){let e=new Map;for(let t of this.blank.matchAll(If))e.set(t[1],t.index+t[0].length-1);this.heads=e}let r=this.heads.get(e),i=r===void 0?null:this.readAt(r);return this.read.set(e,i),i}readAt(e){let t=this.blank,r=P3B(t,e);if(r<0)return null;let i=t.indexOf("{",r),n=i<0?-1:P3B(t,i);if(n<0)return null;let l=t.slice(e+1,r),s=t.slice(i,n+1),o=pf.test(s)&&!lf.test(s)&&!Xf.test(l);return{reads:o,calls:o?[]:[...s.matchAll(Uf)].map(((e)=>e[1]))}}}var YUu=(function(e,t,r,i,n){let l=`${n}.xy`;if(!tf.test(e)||!zf.test(e)||i.some(((e)=>e.name==="frame")))return l;let s=new Set([r.name]),o=[r.name];while(o.length>0){let r=t.of(o.pop()??"");if(r===null)continue;if(r.reads){return Qf.test(e)?Ja(l):`(${l} + ${gf})`;}for(let e of r.calls){if(s.has(e))continue;s.add(e),o.push(e)}}return l});function rUu(e,t,r){if(r.returned===null)return null;let i=eMf(r.params).map(F4);if(!i.every(((e)=>e!==null)))return null;let n=CUu(e,i);if(n===null)return null;let l=r.name;let s=i.map(((e)=>e.name)).join(", ");let o=n==="none"?Ka(i):r.params.trim();let a=n==="none"?"lume_position":n;let u=N4.test(r.returned)?r.returned:V4(r.returned).trim();let d;if(N4.test(r.returned)){let t=M4(e,r.returned);if(t===null)return null;d=t.flatMap((function(e){let t=ff(e.text,e.type);return t===null?[]:[{expression:`lume_out.${e.name}`,colour:t}]}))}else{if(u.length===0||u===r.returned)return null;let e=ff(r.returned,u);d=e===null?[]:[{expression:"lume_out",colour:e}]}if(d.length===0)return null;let f=YUu(e,t,r,i,a);let c=d.map((({expression:e,colour:t})=>`  if ((${Af} & ${1<<t.location}u) != 0u) {
    ${e} = ${qUu(e,t,f)};
  }
`)).join("");let h=`@fragment fn ${l}(${o}) -> ${r.returned} {
  var lume_out = ${(`lume_storeBody_${l}`)}(${s});
${c}  return lume_out;
}
`;return{entry:r,head:T4(e,r,(`lume_storeBody_${l}`),` -> ${u}`),tail:h,locations:d.map((({colour:e})=>e.location))}}var Ff=(function(e){if(!e.includes("@fragment"))return{code:e,stores:new Map,entries:[]};let t=AXn(e),r=z4(t);if(r===null)return{code:e,stores:new Map,entries:[]};let i=r.map(((e)=>e.name)),n=[],l=e.includes(of),s=new AUu(t);for(let i of r){if(l!==e.includes(`fn ${(`lume_storeBody_${(i.name)}`)}(`))continue;let r=rUu(t,s,i);if(r!==null)n.push(r)}let o=new Map(n.map(((e)=>[e.entry.name,e.locations])));if(l||n.length===0)return{code:e,stores:o,entries:i};return{code:`${Q4(e,n)}${hf}`,stores:o,entries:i}});var Nf=(function(e,t){let r=e.fragment;if(r===void 0||r===null)return{descriptor:e,unstored:null};let i=t(r.module);if(i===void 0)return{descriptor:e,unstored:null};let n=r.entryPoint??i.only;if(n===null||n===void 0)return{descriptor:e,unstored:null};let l=0,s=Array.from(r.targets);for(let e=0;e<s.length;e+=1){let t=s[e];if(t?.format===Y6&&(t.writeMask??15)!==0)l|=1<<e}if(l===0)return{descriptor:e,unstored:null};let o=i.stores.get(n);if(o===void 0)return{descriptor:e,unstored:n};let a=o.reduce(((e,t)=>e|l&1<<t),0);if(a===0)return{descriptor:e,unstored:null};return{descriptor:{...e,fragment:{...r,constants:{...r.constants,[Af]:a}}},unstored:null}});var jf=new WeakSet,Df=new WeakMap;function GsP(e){return jf.has(e)}function SUu(e,t){let r=Df.get(e);if(r!==void 0)Df.set(t,r)}function cUu(e,t){return jf.has(e)?Nf(t,(e)=>Df.get(e)).descriptor:t}var XUu=(function(e){if(jf.has(e))return;if(typeof e.createShaderModule!=="function"||typeof e.createRenderPipeline!=="function"||typeof e.createRenderPipelineAsync!=="function")return;jf.add(e);let t=new Set,r=e.createShaderModule.bind(e);e.createShaderModule=(function(e){let t=Ff(e.code),i=r(t.code===e.code?e:{...e,code:t.code});if(t.entries.length>0)Df.set(i,{stores:t.stores,only:t.entries.length===1?t.entries[0]:null});return i});let i=((e)=>Df.get(e));let n=(function(e){let r=Nf(e,i);if(r.unstored!==null){La(e,r,t);}return r.descriptor});let l=e.createRenderPipeline.bind(e);e.createRenderPipeline=(e)=>l(n(e));let s=e.createRenderPipelineAsync.bind(e);e.createRenderPipelineAsync=((e)=>s(n(e)))});var G0S=3,wn5=6,Ci=7,nsq=0.002,x1Z=16,df9=function(e){let t=Math.max(0,Math.round(e)||0);return{coplanar:t%16,relief:Math.floor(t/16)}},sG=1e4,pF=100,yF=100,CF=sG*yF;function Ec1(e){return Math.max(yF,2*e+4)}var oG=13,nF=18,BG=30,IXI=Object.freeze({shift:0,orders:yF,zoom:0});function HF5(e){return e.shift+32*e.zoom+1024*e.orders}function BF(e){return (sG>>(e.shift))*e.orders}var SY=(function(e,t){return 2**Math.max(0,Math.min(BG,e+t))});var ZF=1e8,XG=200000000,QG=0.001,UF=0.01,uF=30*Math.PI/180,RF=Math.cos(uF);function _$K(e,{view:t,projection:r}){return e!=="3d"&&Math.abs(e==="2d-top"?t[6]:t[10])>=RF&&Math.max(r[0],r[5])>=-1.7*r[11]}var _G=UF+(QG-UF)*(ZF/XG),HGr=(QG-UF)/XG,SR2="(lume_sortOrders() / 2i)",zF=16,qG=64,TF=qG*8388608,CG=Math.floor((TF/zF-CF)/(2*CF)),SF=CG*CF+CF/2;function _c1(e,t=yF){return Math.floor(SF/BF({shift:e,orders:t})-0.5)}function rc1(e,t=yF){let r=0;while(r<oG&&e>_c1(r,t))r+=1;return r}function W4c(e){return 2**Math.max(0,Math.min(oG,Math.round(e)))}var FUn=(function(e){return SY(Math.round(e.shift),Math.round(e.zoom))});var GF=1065353216,WG=GF-zF,jG=2**-qG,vF=new Uint32Array(1),DF=new Float32Array(vF.buffer),hG="exact";function aBG(){return hG}function Sxk(e){let t=new Map;return()=>JPf(t,hG,e)}var $8v="lume_bandLens",kG=0.001;function pdf(e,t="true"){return`lume_bandLensScale(${e}.w, ${t})`}function D4U(e,t,r,i="true"){return`lume_bandLensClip(${e}, ${t}, ${r}, ${i})`}function oZc(e,t,r=""){return[`fn lume_bandLensOut${r}(vIn: ${e}, s: f32) -> ${e} {`,"  var v = vIn;",...t.map((e)=>`  v.${e} *= s;`),`  v.${$8v} = s;`,"  return v;","}",`fn lume_bandLensIn${r}(v: ${e}) -> ${e} {`,`  return lume_bandLensOut${r}(v, ${(`select(1.0, 1.0 / ${(`v.${$8v}`)}, ${(`v.${$8v}`)} > 0.0 && frame.sort2d > 0.5 && frame.proj[3][3] < 1.0)`)});`,"}"].join(`
`)}function CQA(e){return`@location(${e}) ${$8v}: f32,`}var xG=GF-TF,VF=0.00000095367431640625,SG=Math.fround((1-2*VF)/TF);function vG(e){return Math.fround(Math.fround(Math.fround(Math.max(0,e-xG))*SG)+VF)}function rF(e,t=0){let r=Math.max(-SF,Math.min(SF,Math.round(e))),i=WG-(SF-r)*zF+t;if(hG==="linear"){return vG(i);}return vF[0]=i,DF[0]}function kfT(a,b){return $c0C(69).call(this,a,b)}function G0W(e){if(hG==="exact")return e;let t=_Td(VF);return`select(${e}, bitcast<f32>(i32(round((${e} - ${t}) / ${_Td(SG)})) + ${xG}i), frame.sort2d > 0.5 && ${e} >= ${t})`}function UY(e,t,r){let i=((sG>>t)-1>>1);let n=SY(t,r);let l=(i+1)*n;let s=Math.max(-l,Math.min(l,Math.round(e*pF)));return Math.max(-i,Math.min(i,Math.floor((s+Math.floor(n/2))/n)))}function lG(e,t=0){return UY(e,t,0)}var YF=0.000001;function TG(e,t,r){let i=Math.sqrt(e*e+t*t);if(!(i>YF))return!1;if(Math.abs(e)<=YF*i)return r[0]=0,r[1]=t<0?-1:1,!0;return r[0]=e/i,r[1]=t/i,!0}function EAU(e,t,r){if(r[2]=0,e==="2d-top"&&(TG(-t[1],-t[9],r)||TG(t[2],t[10],r))){let e=-(t[0]*t[12]+t[1]*t[13]+t[2]*t[14]),i=-(t[4]*t[12]+t[5]*t[13]+t[6]*t[14]),n=-(t[8]*t[12]+t[9]*t[13]+t[10]*t[14]),l=Math.abs(t[6])>YF?i/t[6]:0,s=Math.round(r[0]*(e-l*t[2])+r[1]*(n-l*t[10]));return r[2]=isFinite(s)&&s!==0?s:0,r}return r[0]=0,r[1]=1,r}var OG=((sG>>(0))-1>>1);function yc1(a,b,c){return (yc1=$c0C(70)).call(this,a,b,c)}function CO2(e,t,r,i){e.zoom=yc1(t,r,i)}function Sik(e,t,r){if(r[0]===0)return(r[1]<0?-t:t)-r[2];return r[0]*e+r[1]*t-r[2]}function kdS(e,t){return`lume_ySortAlong(${e}, ${t})`}var sF=0.001;function k$H(e,t,r){if(r===null)return`lume_sideViewRankZPlace(${e}, ${t})`;return`lume_sideViewRankZ(${e}, ${t}, ${r.normal}, ${r.looksAway})`}function Tbo(e,t){return`lume_volumeAlong(${e}, ${t})`}function qWE(e,t,r){return`let lume_bandStep = lume_reliefStep(${e}, ${t}, ${r});`}function z0X(e,t,r,i,n,l=IXI){if(r==="3d")return 0;return rF(j7A(e,t,r,i,n,l))}function vvy(e,t){if(t!==e)t.set(e);return t[2]*=jG,t[6]*=jG,t[10]*=jG,t[14]*=jG,t}var glH=(function(e){return e==="3d"?1:1/jG});var z91=`select(1.0, ${_Td(jG)}, frame.flatArt > 0.5)`,Ubp=eut+(EuQ-eut)*jG,VG=0.5,yG=-VG*zF;function YpB(e){let t=e.sortingLayer!==void 0&&e3w(e.sortingLayer)?e.sortingLayer:0,r=e.sortingOrder!==void 0&&e3w(e.sortingOrder)?e.sortingOrder:0;return t===0&&r===0?void 0:[t,r]}function M6V(e,t){if(!t)return null;let r=e();TwU(r,t[0]);fN7(r,t[1]);return {layer:t[0],order:t[1],ranks:AF(kUn(r,t[0]),LhZ(r,t[1]),r),generation:r.generation}}function w1s(e,t){let r=e();if(r.generation===t.generation)return!1;t.generation=r.generation;let i=AF(kUn(r,t.layer),LhZ(r,t.order),r);if(i===t.ranks)return!1;return t.ranks=i,!0}function c38(e,t){if(!t)return;let r=e();YW9(r,t.layer),UOC(r,t.order)}function AF(e,t=0,r=IXI){return Math.round(HF(e,r)*BF(r)+t*(sG>>(r.shift)))}function KQT(e,t=0,r=IXI){let i=t/(sG>>(r.shift))*sG+UY(e,0,r.zoom)-VG;return _G+HGr*i}function peK(e,t="0i"){return`lume_fxBandWord(${e}, ${t})`}var aF={sortingLayer:0,sortingOrder:0,ySort:!0};function sqG(e,t,r=0,i=IXI){return MbU(aF,e,t,r,0,i)}function Jc1(e,t,r,i){return rF(HF(r,i)*BF(i)+e+t*(sG>>(i.shift)))}function cG(e){return-(e.orders/2-1)}function e2G(e,t=0,r=IXI){return Jc1(lG(e,r.shift),cG(r),t,r)}function VcM(e,t){return`lume_floorWord(${e}, ${t===void 0?"0i":`i32(${t})`})`}function vCz(e,t){return`lume_floorSheetHere(${e}, ${t})`}function sp1(e,t,r){return`(${vCz(e,t)} && i32(${r}) <= 0i)`}function Awo(a,b,c){return $c0C(71).apply(this,arguments)}function W6G(e,t){return`lume_inkWord(${e}, ${t})`}function HHj(e){return`lume_floorHere(${e})`}function VYU(e,t){return`(${HHj(e)} && i32(${t}) <= 0i)`}function g4f(e,t){let r=t===2?0:8,i=t===2?4:0,n=e[r+1]*e[i+2]-e[r+2]*e[i+1],l=e[r+2]*e[i]-e[r]*e[i+2],s=e[r]*e[i+1]-e[r+1]*e[i],o=Mxu(n,l,s);return o>0&&Math.abs(l)>=RF*o}function IZZ(e,t,r=IXI){return e==="2d-top"&&lG(t,r.shift)<=0}function jFZ(e,t,r=0,i=IXI){return IZZ(e,t,i)&&r<=0}var OF={sortingLayer:0,ySort:!0};function m6_(e,t,r=0,i=IXI){if(t==="3d")return 0;return kF(NF(OF,e,t,r,cG(i),0,i.orders,0))}var LG=(CG+1)*CF;function HF(e,t=IXI){let r=Math.floor(LG/BF(t));return Math.max(-r,Math.min(r,Math.round(e)))}function ty8(e,t=0,r){let i=typeof t==="string"?t:`${t}i`;return`lume_geometryBandWord(${e}, ${i}, ${r===void 0?"0i":`i32(${r})`})`}var mG=new Map;function xc1(){let e=mG.get(hG);if(e!==void 0)return e;let t=Xc1();let r=t.map((e)=>/^fn (\w+)\(/.exec(e)?.[1]??"");return e=t.map((e,t)=>({name:r[t]??"",text:e,calls:r.filter((i)=>i!==r[t]&&e.includes(`${i}(`))})),mG.set(hG,e),e}function IcM(e){let t=xc1();let r=new Set;let i=function(e){if(r.has(e.name))return;r.add(e.name);for(let r of e.calls){let e=t.find((e)=>e.name===r);if(e!==void 0)i(e)}};for(let r of t)if(e.includes(`${r.name}(`))i(r);if(r.size===0)return e;let n=t.filter((e)=>r.has(e.name)).map((e)=>e.text);return`${e.trimEnd()}

${n.join(`
`)}
`}function Xc1(){let e=hG==="linear",t=`${SF}i`,r=`${WG}i + ulps - (${t} - clamp(rank, -${t}, ${t})) * ${zF}i`,i=e?`f32(max(${r} - ${xG}i, 0i)) * ${_Td(SG)} + ${_Td(VF)}`:`bitcast<f32>(${r})`,n=`abs(frame.view[1].z) > ${_Td(Math.SQRT1_2)}`,l=(e)=>`dot(row, model[${e}].xyz) * inverseSqrt(max(dot(model[${e}].xyz, model[${e}].xyz), 1e-30))`,s=e?"  return select(0i, 1i, looksAway);":["  let row = vec3<f32>(frame.view[0].z, frame.view[1].z, frame.view[2].z);",`  let look = vec3<f32>(${l(0)}, ${l(1)}, ${l(2)});`,"  let up = abs(look.y) > abs(look.z);","  let across = abs(look.x) > max(abs(look.y), abs(look.z));","  let along = select(select(look.z, look.y, up), look.x, across);",`  let shift = select(select(0u, ${2*G0S}u, up), ${4*G0S}u, across) + select(${G0S}u, 0u, along >= 0.0);`,`  let level = min((relief >> shift) & ${(1<<G0S)-1}u, ${wn5}u);`,`  return select(i32(level), ${Ci}i, looksAway);`].join(`
`);return[`fn lume_sortStep() -> i32 {
  return i32(clamp(frame.sort2d, 1.0, ${2**oG}.0));
}`,`fn lume_sortOrders() -> i32 {
  return max(i32(frame.sortOrders), ${yF}i);
}`,`fn lume_zStep() -> i32 {
  return i32(clamp(frame.ySortStep, 1.0, ${2**BG}.0));
}`,`fn lume_floorSteps() -> i32 {
  return 1i - lume_sortOrders() / 2i;
}`,`fn lume_inkSteps() -> i32 {
  return lume_sortOrders() / 2i - 1i;
}`,`fn lume_orderStride() -> i32 {
  return ${sG}i / lume_sortStep();
}`,`fn lume_rankAtStep(z: f32, step: i32) -> i32 {
  let rankMax = (lume_orderStride() - 1i) / 2i;
  let bound = (rankMax + 1i) * step;
  let n = clamp(i32(floor(clamp(z * ${_Td(pF)}, -f32(bound), f32(bound)) + 0.5)), -bound, bound) + step / 2i;
  return clamp(n / step - select(0i, 1i, n % step < 0i), -rankMax, rankMax);
}`,`fn lume_zSortRank(z: f32) -> i32 {
  return lume_rankAtStep(z, lume_zStep());
}`,`fn lume_heightRank(y: f32) -> i32 {
  return lume_rankAtStep(y, lume_sortStep());
}`,`fn lume_rankWord(rank: i32, ulps: i32) -> f32 {
  return ${i};
}`,`fn lume_ySortAlong(x: f32, z: f32) -> f32 {
  let upX = frame.view[0].y;
  let upZ = frame.view[2].y;
  let upLength = sqrt(upX * upX + upZ * upZ);
  let turned = -(x * upX + z * upZ) / upLength;
  let square = select(z, -z, upZ > 0.0);
  let top = select(square, turned, abs(upX) > ${_Td(YF)} * upLength);
  return select(z, top, ${n}) - frame.ySortOrigin;
}`,`fn lume_sideView() -> bool {
  return abs(frame.view[1].z) <= ${_Td(Math.SQRT1_2)} && frame.view[2].z > 0.0;
}`,`fn lume_sideViewRankZ(anchor: vec3<f32>, point: vec3<f32>, normal: vec3<f32>, looksAway: bool) -> f32 {
  let d = point - anchor;
  let normalLength = sqrt(normal.x * normal.x + normal.y * normal.y + normal.z * normal.z);
  let offsetLength = sqrt(d.x * d.x + d.y * d.y + d.z * d.z);
  let edgeOn = normal.z <= ${_Td(YF)} * normalLength;
  let throughPlace = abs(d.x * normal.x + d.y * normal.y + d.z * normal.z) <= ${_Td(sF)} * offsetLength * normalLength;
  return select(anchor.z, select(min(point.z, anchor.z), point.z, !looksAway && edgeOn && throughPlace), lume_sideView());
}`,`fn lume_sideViewRankZPlace(anchor: vec3<f32>, point: vec3<f32>) -> f32 {
  return select(anchor.z, min(point.z, anchor.z), lume_sideView());
}`,`fn lume_volumeAlong(anchor: vec3<f32>, point: vec3<f32>) -> f32 {
  let d = point - anchor;
  let relief = frame.view[0].z * d.x + frame.view[1].z * d.y + frame.view[2].z * d.z;
  return lume_ySortAlong(anchor.x, anchor.z) + select(relief, d.z, lume_sideView());
}`,`fn lume_bandWordAt(rank: i32, orderSteps: i32, layer: i32) -> f32 {
  let orderStride = lume_orderStride();
  let layerStride = orderStride * lume_sortOrders();
  let layerMax = ${LG}i / layerStride;
  return lume_rankWord(rank + orderSteps * orderStride + clamp(layer, -layerMax, layerMax) * layerStride, 0i);
}`,`fn lume_geometryBandWord(along: f32, orderSteps: i32, layer: i32) -> f32 {
  return lume_bandWordAt(lume_zSortRank(along), orderSteps, layer);
}`,`fn lume_floorWord(y: f32, layer: i32) -> f32 {
  return lume_bandWordAt(lume_heightRank(y), lume_floorSteps(), layer);
}`,`fn lume_floorHere(y: f32) -> bool {
  return ${n} && lume_heightRank(y) <= 0i;
}`,`fn lume_floorSheetHere(normal: vec3<f32>, y: f32) -> bool {
  return ${n} && abs(normal.y) >= ${_Td(RF)} * length(normal) && lume_heightRank(y) <= 0i;
}`,`fn lume_inkWord(along: f32, height: f32) -> f32 {
  let lift = lume_heightRank(height);
  let top = lume_bandWordAt(lift, select(lume_floorSteps(), lume_inkSteps(), lift > 0i), 0i);
  return select(lume_geometryBandWord(along, 0i, 0i), top, ${n});
}`,`fn lume_fxBandWord(z: f32, layerRanks: i32) -> f32 {
  return lume_rankWord(lume_zSortRank(z) + layerRanks, ${yG}i);
}`,`fn lume_reliefStep(relief: u32, model: mat4x4<f32>, looksAway: bool) -> i32 {
${s}
}`,`fn lume_bandLensScale(w: f32, takes: bool) -> f32 {
  return select(1.0, 1.0 / w, takes && frame.sort2d > 0.5 && w > ${_Td(kG)});
}`,`fn lume_bandLensClip(clip: vec4<f32>, word: f32, scale: f32, takes: bool) -> vec4<f32> {
  return select(vec4<f32>(clip.xy, select(clip.z, word * clip.w, takes), clip.w), vec4<f32>(clip.xy * scale, word, 1.0), scale != 1.0);
}`]}function $wP(){return{generation:0,holds:new Map,layers:[],orderHolds:new Map,orderWords:[],shift:0,orders:yF,zoom:0}}function FF(e){return e!==void 0&&e3w(e)?e:0}function rG(e,t){let r=0,i=e.length;while(r<i){let n=r+i>>>1;if(e[n]<t)r=n+1;else i=n}return r}function uG(e){let t=rG(e,0);return Math.max(t,e.length-t)}function fG(e){e.generation+=1;e.orders=Ec1(uG(e.orderWords));e.shift=rc1(uG(e.layers),e.orders)}function PG(e,t,r){let i=e.get(r);if(e.set(r,(i??0)+1),i!==void 0)return!1;return t.splice(rG(t,r),0,r),!0}function mF(e,t,r){let i=e.get(r);if(i===void 0)return!1;if(i>1)return e.set(r,i-1),!1;return e.delete(r),t.splice(rG(t,r),1),!0}function wF(e,t){if(t===0)return 0;let r=rG(e,t),i=rG(e,0);if(t>0)return r-i+1;return e[r]===t?r-i:r-i-1}function TwU(e,t){let r=FF(t);if(r!==0&&PG(e.holds,e.layers,r))fG(e)}function YW9(e,t){let r=FF(t);if(r!==0&&mF(e.holds,e.layers,r))fG(e)}function fN7(e,t){let r=FF(t);if(r!==0&&PG(e.orderHolds,e.orderWords,r))fG(e)}function UOC(e,t){let r=FF(t);if(r!==0&&mF(e.orderHolds,e.orderWords,r))fG(e)}function kUn(e,t){return wF(e.layers,FF(t))}function LhZ(e,t){return wF(e.orderWords,FF(t))}function j7A(e,t,r,i=e.sortingLayer??0,n=e.sortingOrder??0,l=IXI){return NF(e,t,r,i,n,l.shift,l.orders,l.zoom)}function NF(e,t,r,i,n,l,s,o){let a=r==="3d"?0:t;let u=e.ySort?UY(a,l,o):0;let d=(sG>>l);return i*d*s+n*d+u}function MbU(e,t,r,i=e.sortingLayer??0,n=e.sortingOrder??0,l=IXI){if(r==="3d")return 0;return kF(NF(e,t,r,i,n,0,l.orders,l.zoom))}function kF(e){return UF+(QG-UF)*((e+ZF)/XG)};;var Fn=(()=>globalThis.__spawnEngineConsole??=Object.create(console))(),ik=new WeakSet,bk=new WeakSet;function wd2(e,t){if(t)bk.delete(e);else bk.add(e)}var rma=(function(e){return!bk.has(e)});var Hd2=(function(e){ik.add(e)});function vPg(e,t){for(let{pipeline:r}of e){let e=t?t(r):r;if(e!==null&&!ik.has(e))return!0}return!1}var Tk=new WeakMap,jk=new WeakSet,Vk=/@builtin\(\s*frag_depth\s*\)/,Bk=/\bstruct\s+(\w+)\s*\{([^}]*)\}/g,Jk=/@fragment\s+fn\s+(\w+)\s*\([^{]*?\)\s*->([^{]*)\{/g;function Yk(e){let t=new Set;for(let r of e.matchAll(Bk))if(Vk.test(r[2]))t.add(r[1]);let r=new Set;for(let[,i,n]of e.matchAll(Jk))if(Vk.test(n)||t.has(n.trim()))r.add(i);return r}function Jd2(e){let t=e.fragment;if(!t||e.depthStencil?.depthWriteEnabled!==!0)return!1;let r=Tk.get(t.module);if(r===void 0)return!1;return t.entryPoint===void 0||r.has(t.entryPoint)}function Kd2(e){jk.add(e)}function YpW(e){for(let{pipeline:t}of e)if(jk.has(t))return!0;return!1}var n$=new WeakMap;function K$(e){return JPf(n$,e,()=>({kinds:new Map,doors:new Map}))}function Z_4(e,t,r,i){let n=n$.get(e);if(n===void 0)return i();let l={text:r.doorText,handed:t};if(n.kinds.set(t,r),n.doors.set(r.doorText,l),r.kinded!==!0)n.doors.set(t,l);try{return i()}finally{n.kinds.delete(t),n.doors.delete(r.doorText),n.doors.delete(t)}}var $b=64;class Tb extends Error{constructor(e){var $lpt6;let t=Error.stackTraceLimit;Error.stackTraceLimit=0;super("a fresh shader text waits for the frame its parse owes"),"parsed"in this?$lpd0(this,"parsed",void 0):this.parsed=void 0;this.parsed=e,Error.stackTraceLimit=t}}var fd={"texture_2d<f32>":"texture_2d_array<f32>","texture_2d<u32>":"texture_2d_array<u32>","texture_2d<i32>":"texture_2d_array<i32>"},hd=/\btexture_2d</,kd=/\btexture_storage_2d</,dd=XBU(),zd=XBU(),Yd=XBU(),id=XBU(),xd=XBU(),gd=uRd(),ld={textureSample:3,textureSampleBias:3,textureSampleLevel:3,textureSampleGrad:3,textureLoad:2,textureStore:2},qd=/[A-Za-z0-9_]/,Md=47,md=42,Rd=123,Pd=125,Nd=40,pd=41,Od=59;var Fp_=(function(e){let t=[],r=0,i=0,n=e.length;for(let l=0;l<n;l+=1){let s=e.charCodeAt(l);if(s===Md){let t=e.charCodeAt(l+1);if(t===Md){let t=e.indexOf(`
`,l);l=t<0?n:t;continue}if(t===md){let t=e.indexOf("*/",l+2);l=t<0?n:t+1;continue}}if(s===Rd||s===Nd)r+=1;else if(s===Pd||s===pd){if(r-=1,r===0&&s===Pd)t.push({start:i,end:l+1}),i=l+1}else if(s===Od&&r===0)t.push({start:i,end:l+1}),i=l+1}if(i<n)t.push({start:i,end:n});return t});var Vd=(function(e,t){let r=[],i=0,n=0,l=t+1;for(let s=t;s<e.length;s+=1){let t=e[s];if(t==="("||t==="[")i+=1;else if(t==="<"&&(Ma(s,e)))n+=1;else if(t===">"&&n>0)n-=1;else if(t===")"||t==="]"){if(i-=1,i===0){if(e.slice(l,s).trim()!=="")r.push({start:l,end:s});return{args:r,close:s}}}else if(t===","&&i===1&&n===0)r.push({start:l,end:s}),l=s+1}return null});function ep_(e,t,r){if(e==="textureGather"){return (t.length>=4&&r.has((t[1]??"").trim())?`textureGather(${[...t.slice(0,4)," 0",...t.slice(4)].join(",")})`:null);}if(e==="textureSampleBaseClampToEdge"){{let e=(t[0]??"").trim();return t.length===3&&r.has(e)?`textureSampleLevel(${e},${t[1]}, clamp(${(t[2]??"").trim()}, vec2<f32>(0.5) / vec2<f32>(textureDimensions(${e}, 0)), vec2<f32>(1.0) - vec2<f32>(0.5) / vec2<f32>(textureDimensions(${e}, 0))), 0, 0.0)`:null
}}let i=ld[e];return i!==void 0&&t.length>=i&&r.has((t[0]??"").trim())?`${e}(${[...t.slice(0,i)," 0",...t.slice(i)].join(",")})`:null}var Rp_=(function(e,t){for(let r of t)if(e.includes(r))return!0;return!1});var Cd=(function(e,t){if(t.size===0||!Rp_(e,t))return e;let r="",i=0,n=/\b(textureSampleBaseClampToEdge|textureSampleLevel|textureSampleBias|textureSampleGrad|textureSample|textureLoad|textureStore|textureGather)\s*\(/g;for(let l=n.exec(e);l!==null;l=n.exec(e)){if(l.index>0&&(qd.test(e[l.index-1]??"")||e[l.index-1]==="."))continue;let s=l.index+l[0].length-1,o=Vd(e,s);if(o===null)continue;let a=ep_(l[1]??"",o.args.map((r)=>Cd(e.slice(r.start,r.end),t)),t);if(a===null)continue;r+=e.slice(i,l.index)+a,i=o.close+1,n.lastIndex=i}return r+e.slice(i)});var op_=(function(e,t,r,i){let n=Vd(e,t);if(n===null)return e;let l=new Set(r),s=e.slice(0,t+1),o=t+1;for(let t of n.args){let r=e.slice(t.start,t.end),n=/^\s*(\w+)\s*:\s*([\s\S]*?)\s*$/.exec(r);if(n===null)continue;let a=n[1]??"";let u=n[2]??"";let d;{let e=u,t=i;let r=e.replace(/\s+/g,"");d=fd[r]??(t&&Qa(r)?Ra(r):void 0);}if(d===void 0){l.delete(a);continue}l.add(a);let f=r.trimEnd();s+=e.slice(o,t.start)+f.slice(0,f.length-u.length)+d+r.slice(f.length),o=t.end}return s+e.slice(o,n.close+1)+Cd(e.slice(n.close+1),l)});var Dd=(function(e,t=!1){let r=new Map;if(!hd.test(e)&&!(t&&kd.test(e)))return{code:e,bindings:r};let i=Fp_(e);let v$9;{let t$9=i;{let t=t$9;let r=[],i=e.indexOf("texture");for(let n of t){if(i>=0&&i<n.start)i=e.indexOf("texture",n.start);r.push(i>=0&&i<n.end)}v$9=r;}}let n=v$9;let l=new Set;let s=/^(?:\s*(?:\/\/[^\n]*\n|\/\*[\s\S]*?\*\/))*\s*((?:@\w+(?:\([^)]*\))?\s*)*)var\s+(\w+)\s*:\s*texture_2d<\s*[fiu]32\s*>\s*;/;let o=/(var\s+\w+\s*:\s*)(texture_2d<\s*[fiu]32\s*>)(\s*;)/;let a=/^(?:\s*(?:\/\/[^\n]*\n|\/\*[\s\S]*?\*\/))*\s*((?:@\w+(?:\([^)]*\))?\s*)*)var\s+(\w+)\s*:\s*texture_storage_2d<[^>]*>\s*;/;let u=/(var\s+\w+\s*:\s*)texture_storage_2d(<[^>]*>\s*;)/;i.forEach(function(i,o){if(!n[o])return;let u=e.slice(i.start,i.end),d=s.exec(u)??(t?a.exec(u):null);if(d===null)return;l.add(d[2]??"");let f=/@group\((\d+)\)/.exec(d[1]??""),c=/@binding\((\d+)\)/.exec(d[1]??"");if(f&&c){let e=Number(f[1]);if(!r.has(e))r.set(e,new Set);r.get(e)?.add(Number(c[1]))}});let d=function(e){if(s.test(e))return e.replace(o,(e,t,r,i)=>t+(fd[r.replace(/\s+/g,"")]??r)+i);if(t&&a.test(e)){return Sa(e,u);}return e};let f="";let c=0;i.forEach(function(r,i){if(!n[i])return;let s=e.slice(r.start,r.end);let o=/^((?:\s*(?:\/\/[^\n]*\n|\/\*[\s\S]*?\*\/))*\s*(?:@[\w]+(?:\([^)]*\))?\s*)*fn\s+\w+\s*)\(/.exec(s);let a=o===null?d(s):op_(s,o[0].length-1,l,t);if(a===s)return;f+=e.slice(c,r.start)+a,c=r.end});return {code:c===0?e:f+e.slice(c),bindings:r}});var Xd=((e)=>typeof e==="object"&&e!==null&&dd.has(e)),Fd=(({texture:e,descriptor:t})=>t?.dimension??(e.dimension==="2d"&&e.depthOrArrayLayers>1?"2d-array":e.dimension??"2d"));var Jp_=(function(e){let t=zd.get(e);if(t!==void 0)return t;let r=dd.get(e);if(r===void 0||Fd(r)!=="2d")return e;let i=r.texture.createView({...r.descriptor,dimension:"2d-array",baseArrayLayer:r.descriptor?.baseArrayLayer??0,arrayLayerCount:1});return zd.set(e,i),i});var $d=(function(e,t){let r=(Zpc(id,e));for(let[e,i]of t){let t=r.get(e);if(t===void 0)r.set(e,new Set(i));else for(let e of i)t.add(e)}});var yd=(function(e,t,r){if(typeof e.getBindGroupLayout!=="function"||gd.has(e))return e;gd.add(e);let i=e.getBindGroupLayout.bind(e);let n=t==="auto"?Ta(r):[];e.getBindGroupLayout=(function(e){let r=i(e),l=t==="auto"?void 0:xd.get(t)?.[e],s=new Set(l?Yd.get(l):void 0);for(let t of n)for(let r of t.get(e)??[])s.add(r);if(s.size>0){{let e$12=r,t$10=s;{let e=e$12,t=t$10;let r=Yd.get(e);if(r===void 0)Yd.set(e,new Set(t));else for(let e of t)r.add(e)}}}return r});return e});var dp_=(function(e){if(typeof e.createView!=="function")return;let t=e.createView.bind(e);e.createView=(function(r){let i=t(r);return dd.set(i,{texture:e,descriptor:r===void 0?void 0:{...r}}),i})});var zp_=(function(e){let t=Yd.get(e.layout);if(t===void 0)return e;let r=Array.from(e.entries,((e)=>t.has(e.binding)&&Xd(e.resource)?{...e,resource:Jp_(e.resource)}:e));return{...e,entries:r}});var Wd=["createShaderModule","createBindGroupLayout","createRenderPipeline","createRenderPipelineAsync","createComputePipeline","createComputePipelineAsync"];function Xp_(e,t=!1){if(Wd.some((t)=>typeof e[t]!=="function"))return;let r=e.createShaderModule.bind(e),i=new Map,n=K$(e).kinds;e.createShaderModule=function(e){let l=n.size===0||t&&kd.test(e.code)?void 0:n.get(e.code);let s=l!==void 0||i.size===0?void 0:i.get(e.code);let {code:o,bindings:a}=l!==void 0?Ua(l):s??Dd(e.code,t);let u;try{u=r(o===e.code?e:{...e,code:o})}catch(t){Wa(t,l,s,o,e,i,a);throw t}if(s!==void 0)i.delete(e.code);if(l!==void 0)n.delete(e.code);if(a.size>0)$d(u,a);return u};let l=e.createBindGroupLayout.bind(e);e.createBindGroupLayout=function(e){let r=new Set;let i=Array.from(e.entries,function(e){if(e.texture!==void 0&&e.texture.sampleType!=="depth"&&e.texture.multisampled!==!0&&(e.texture.viewDimension??"2d")==="2d")return r.add(e.binding),{...e,texture:{...e.texture,viewDimension:"2d-array"}};if(t&&e.storageTexture!==void 0&&((e.storageTexture.viewDimension??"2d")==="2d")){return (r.add(e.binding),{...e,storageTexture:{...e.storageTexture,viewDimension:"2d-array"}});}return e});let n=l(r.size===0?e:{...e,entries:i});if(r.size>0){{let e$13=n,t$11=r;{let e=e$13,t=t$11;let r=Yd.get(e);if(r===void 0)Yd.set(e,new Set(t));else for(let e of t)r.add(e)}}}return n};Ji(e,"createPipelineLayout",(e)=>function(t){let r=e(t);return xd.set(r,Array.from(t.bindGroupLayouts)),r});let s=e.createRenderPipeline.bind(e);e.createRenderPipeline=(e)=>yd(s(e),e.layout,[e.vertex.module,e.fragment?.module]);let o=e.createRenderPipelineAsync.bind(e);e.createRenderPipelineAsync=(e)=>o(e).then((t)=>yd(t,e.layout,[e.vertex.module,e.fragment?.module]));let a=e.createComputePipeline.bind(e);e.createComputePipeline=(e)=>yd(a(e),e.layout,[e.compute.module]);let u=e.createComputePipelineAsync.bind(e);e.createComputePipelineAsync=(e)=>u(e).then((t)=>yd(t,e.layout,[e.compute.module]))}var ic=/@fragment\s+fn\s+\w+\s*\((?:[^()]|\([^()]*\))*\)\s*->\s*@builtin\s*\(/;function fDv(e,t){let r=t.returned;if(r===null||N4.test(r)||!/@builtin\s*\(/.test(r))return null;let i=V4(r).trim();if(i.length===0||!r.endsWith(i))return null;let n=r.slice(0,r.length-i.length).trim(),l=eMf(t.params).map(F4);if(!l.every((e)=>e!==null))return null;let s=l.map((e)=>e.name).join(", ");let o=t.name;let a=`struct ${(`LumeBuiltinOut_${o}`)} {
  ${n} lume_value: ${i},
}
@fragment fn ${o}(${t.params.trim()}) -> ${(`LumeBuiltinOut_${o}`)} {
  return ${(`LumeBuiltinOut_${o}`)}(${(`lume_builtinBody_${o}`)}(${s}));
}
`;return{entry:t,head:T4(e,t,(`lume_builtinBody_${o}`),` -> ${i}`),tail:a}}var lc=(function(e){if(!e.includes("@fragment")||!ic.test(e))return e;return Za(e);});var Vc=new WeakSet;var tDv=(function(e){if(Vc.has(e))return;if(typeof e.createShaderModule!=="function")return;Vc.add(e);let t=e.createShaderModule.bind(e);e.createShaderModule=(function(e){let r=lc(e.code);return t(r===e.code?e:{...e,code:r})})});function k7f(e,t){let r=lc(e);return t?Ff(r).code:r}function PId(e,t,r,i,n,l){let s=k7f(r,n);if(s===r)l([r,i]);else UP7(e,t,s,l)}function UP7(e,t,r,i){e.ask(t,{family:[r]}),e.whenLanded(t,function(){let n=e.take(t);i(n!==null&&n!=="pending"&&n.kind==="family"&&n.code===r?[r,n.door]:null,n!==null&&n!=="pending")})}function MfZ(e,t,r){e.whenLanded(t,()=>e.pending(t)?MfZ(e,t,r):r())}function zEL(e){let{code:t,bindings:r}=Dd(e);return{...t===e?{}:{kinded:!0},bindings:Array.from(r,([e,t])=>[e,[...t]]),doorText:(bsL((TsL(IsL(t))),DB))}}var s$=new Set;var d$=(function(e){s$.add(e);let t=(function(){s$.delete(e)});return e.then(t,t),e});function y$(e){let t=e.lost;if(t instanceof Promise)d$(t)}function R$(e){d$(e).catch(function(){return})}function x$(){return s$}var A$=new WeakMap,G$=new Set;var v$=(function(e){let t=A$.get(e);if(t===void 0)t={work:null,pop:null,probe:null},A$.set(e,t),G$.add(t);return t});function c$(e){if(e.work!==null)R$(e.work);if(e.pop!==null)R$(e.pop);if(e.probe!==null)R$(e.probe);e.work=null,e.pop=null,e.probe=null}function wlW(e){if(T$()===0)e();else M7B().then(e)}function T$(){for(let e of G$)c$(e);return s$.size}async function M7B(){while(T$()>0)await Promise.allSettled([...s$])}var hV=new WeakMap;var rV=(function(e,t){let r=e?.constants;if(r===void 0)return e;let i=hV.get(e.module);if(i===void 0)return e;let n=e.entryPoint;if(n===void 0){let r=i.entries.filter((e)=>e.stage===t);if(r.length!==1)return e;n=r[0].name}let l;ty2:{let e$14=i,t$13=n;{let e=e$14,t=t$13;let r=e.reads.get(t);if(r!==void 0){l=r;break ty2;}let i=BHD(e.code,t,[...e.overrides]);l=(e.reads.set(t,i),i);}}let s=Object.keys(r);if(s.every(((e)=>l.has(e)||!i.overrides.has(e))))return e;let a;{a=_a(s,l,i,r,e)}return a});function Oy2(e){let t=rV(e.vertex,"vertex"),r=e.fragment===void 0?void 0:rV(e.fragment,"fragment");if(t===e.vertex&&r===e.fragment)return e;return{...e,vertex:t,...r===void 0?{}:{fragment:r}}}var Z3=new Map,m3=/\b(?:for|while|loop)\b/g,V3=/\btexture(?:Sample|Load|Gather)\w*\s*\(/g;function VvU(e,t){return JPf(Z3,e,()=>({chars:t.length,loops:t.match(m3)?.length??0,samples:t.match(V3)?.length??0}))}var l3=new WeakMap;var A3=new WeakMap,_3=/@(vertex|fragment|compute)\b/g;function W3(e,t){let r=A3.get(e);if(r===void 0||t.length===0)return l3.get(e)?.chars;let i=t.join(" "),n=r.reached.get(i);if(n===void 0)n=csL(r.code,t),r.reached.set(i,n);return n}var i3=new WeakMap;var wGv=(function(e){return i3.get(e)?.chars??0});var tW2=(function(e){return i3.get(e)?.texts??0});function XvU(e,t){let r=i3.get(e);if(r!==void 0)r.keep=t}var p3=!1;function zCX(){return p3}var M3=null;var QhF=(function(e,t){let r=i3.get(e);M3=r===void 0||r.lost||t===null?null:{handed:r,listener:t}});var j3=new WeakMap,X3=new WeakMap,S3=new WeakMap;var tiG=(function(e){return X3.get(e)});var h3=3;function MvU(a,b){return (MvU=$c0C(72)).call(this,a,b)}function e3(e){let t=[];for(let r of e){let e=r===void 0?void 0:X3.get(r);if(e!==void 0&&!t.includes(e))t.push(e)}return t.join("+")}var O3=(function(e,t){let r=t.filter(((e)=>e!==void 0&&typeof e.getCompilationInfo==="function"));if(r.length===0)return e;return e.catch(async function(e){throw await MvU(e,r)})});var Y3=(function(e){let t=i3.get(e)?.newest??null;if(t===null||typeof t.getCompilationInfo!=="function")return null;{let e$17=t;{let e=e$17;let t=j3.get(e);if(t===void 0)t=d$(e.getCompilationInfo()),j3.set(e,t);return t}}});function d3(e){return`${e.length}:${xzz(e)}`}var a3=(function(e){let t=e;if(t.__lumeShaderModuleDoor===!0)return;if(t.__lumeShaderModuleDoor=!0,typeof e.createShaderModule!=="function")return;let r=e.createShaderModule.bind(e),i={chars:0,texts:0,live:new Map,made:new Map,newest:null,refusing:!1,refused:new Map,lost:!1,keep:null},n=(e)=>i.live.get(e)?.deref()!==void 0,l=function(e){let t=i.made.get(e);return t!==void 0&&n(t)};i3.set(e,i);let s=e.lost;if(s!==void 0)s.then(function(){if(i.lost=!0,M3?.handed===i)M3=null});let o=K$(e).doors;e.createShaderModule=function(e){let t=o.size===0?void 0:o.get(e.code);let s=t!==void 0||i.refused.size===0?void 0:i.refused.get(e.code);let a=d3(e.code);if(i.refusing&&t===void 0&&s===void 0&&!l(a)){throw new Tb(()=>l(a));}let{code:u,lineStarts:d}=s??QsL(qcz(t?.text??(bsL((TsL(IsL((e.code)))),DB))));let f=t?.handed??e.code;let c=s?.identity??d3(u);let h=!n(c);if(h&&i.refusing){$a(t,s,i,e,u,c,d,n);}if(i.refused.size>0)i.refused.delete(e.code);if(t!==void 0)o.delete(e.code);if(h){if(i.texts+=1,i.chars+=u.length,p3=Z3.has(c),M3?.handed===i)M3.listener(u.length,e.label??"");i.keep?.(c,u)}let p=r(u===e.code?e:{...e,code:u});i.live.set(c,new WeakRef(p));i.made.set(a,c);X3.set(p,c);l3.set(p,VvU(c,u));let m;qvU:{let e=u;let t=new Set;for(let r of e.matchAll(_3)){if(t.has(r[1])){m={code:e,reached:new Map};break qvU;}t.add(r[1])}m=null;}if(m!==null)A3.set(p,m);if(u!==f){wvU(p,f,d);}Ly2:{let e=p,t=u;if(!t.includes("override"))break Ly2;let{overrides:r,entries:i}=jwv(t);if(r.length===0)break Ly2;hV.set(e,{code:t,overrides:new Set(r),entries:i,reads:new Map})}if(h)i.newest=p;qd2:{let e=p,t=u;if(!Vk.test(t))break qd2;let r=Yk(t);if(r.size>0)Tk.set(e,r)}return p}});var wvU=(function(e,t,r){let i=e.getCompilationInfo;if(typeof i!=="function")return;let n;try{n=d$(i.call(e))}catch(e){n=Promise.reject(e)}let l=IvU(n,t,r);Object.defineProperty(e,"getCompilationInfo",{configurable:!0,writable:!0,value:(()=>l)})});var IvU=(function(e,t,r){let i=e.then(((e)=>e.messages.length===0?e:LvU(e,t,r)));return i.catch(function(){return}),i});function LvU(a,b,c){return (LvU=$c0C(73)).call(this,a,b,c)}class uAM{constructor(){this.modules=new Map;this.groups=new Map;this.layouts=new Map;this.samplers=new Map;this.pipelines=new Map;this.building=new Map;this.names=new WeakMap;this.unnamed=0;this.gone=new FinalizationRegistry(((e)=>e()));this.census={modules:{asked:0,made:0},groups:{asked:0,made:0},layouts:{asked:0,made:0},samplers:{asked:0,made:0},renderPipelines:0,computePipelines:0,textures:0,moduleChars:0};this.modulesApart=!1;}nameOf(e){let t=this.names.get(e);if(t===void 0)this.names.set(e,t=`#${++this.unnamed}`);return t}share(e,t,r,i){i.asked+=1;let n=e.get(t)?.deref();if(n!==void 0)return n;let l=r();return i.made+=1,this.hold(e,t,l),l}hold(e,t,r){let i=new WeakRef(r);e.set(t,i),this.gone.register(r,(function(){if(e.get(t)===i)e.delete(t)}))}pipeline(e,t,r,i){let n=e+Iz(V3y(t,(e)=>this.nameOf(e))),l=this.pipelines.get(n)?.deref(),s=l;if(r)s=l===void 0?this.building.get(n):Promise.resolve(l);if(s!==void 0)return s;this.census[e]+=1;let o=i();if(o instanceof Promise){this.building.set(n,o);let e=()=>this.building.delete(n);o.then((t)=>{e(),this.hold(this.pipelines,n,t)},e)}return o}}var $z=new WeakMap;var Iz=(function(e){let t=2166136261,r=2654435769;for(let i=0;i<e.length;i++){let n=e.charCodeAt(i);t=Math.imul(t^n,16777619),r=Math.imul(r^n,2246822507),r^=r>>>13}return`${e.length}:${(t>>>0).toString(36)}:${(r>>>0).toString(36)}`});var vAM=(function(e){let t=e??{};return[t.addressModeU??"clamp-to-edge",t.addressModeV??"clamp-to-edge",t.addressModeW??"clamp-to-edge",t.magFilter??"nearest",t.minFilter??"nearest",t.mipmapFilter??"nearest",t.lodMinClamp??0,t.lodMaxClamp??32,t.compare??"-",t.maxAnisotropy??1].join("|")});function V3y(e,t){return JSON.stringify(e,function(e,r){if(e==="label")return;if(t!==void 0&&(e==="module"||e==="layout")&&uLW(r))return t(r);if(r===null||typeof r!=="object"||Array.isArray(r))return r;let i={};for(let e of Object.keys(r).sort(((e,t)=>e<t?-1:Number(e>t))))i[e]=Reflect.get(r,e);return i})}var jAM=(function(e){return Iz(V3y(Array.from(e.entries).sort(((e,t)=>e.binding-t.binding))))});function tAM(e){if($z.has(e))return;let t=new uAM;$z.set(e,t);let r=t.census;Ji(e,"createShaderModule",(e)=>function(i){let n;{let e=i;let t=e.compilationHints;n=t===void 0?Iz(e.code):`${Iz(e.code)}|${Iz(JSON.stringify(t))}`;}let l=function(){r.moduleChars+=i.code.length;let l=e(i);return t.names.set(l,n),l};if(!t.modulesApart)return t.share(t.modules,n,l,r.modules);return r.modules.asked+=1,r.modules.made+=1,l()});Ji(e,"createBindGroupLayout",(e)=>(i)=>t.share(t.groups,jAM(i),()=>e(i),r.groups));Ji(e,"createPipelineLayout",(e)=>(i)=>t.share(t.layouts,Array.from(i.bindGroupLayouts,(e)=>e&&t.nameOf(e)).join(),()=>e(i),r.layouts));Ji(e,"createSampler",(e)=>(i)=>t.share(t.samplers,vAM(i),()=>e(i),r.samplers));Ji(e,"createRenderPipeline",(e)=>(r)=>t.pipeline("renderPipelines",r,!1,()=>e(r)));Ji(e,"createRenderPipelineAsync",(e)=>(r)=>t.pipeline("renderPipelines",r,!0,()=>e(r)));Ji(e,"createComputePipeline",(e)=>(r)=>t.pipeline("computePipelines",r,!1,()=>e(r)));Ji(e,"createComputePipelineAsync",(e)=>(r)=>t.pipeline("computePipelines",r,!0,()=>e(r)));Ji(e,"createTexture",(e)=>function(t){return r.textures+=1,e(t)})}function pAM(e){let t=$z.get(e);if(t!==void 0)t.modulesApart=!0}function BQe(e){return $z.get(e)?.census}function WzX(e,t){let r=BQe(e);if(r===void 0)return null;let i=((e,t)=>`${e} ${t.made}${t.asked>t.made?` (${t.asked} asked, ${t.asked-t.made} shared)`:""}`);return`[renderer] pipeline objects ${t}: ${i("shader modules",r.modules)} \u00b7 ${i("bind group layouts",r.groups)} \u00b7 ${i("pipeline layouts",r.layouts)} \u00b7 ${i("samplers",r.samplers)} \u00b7 render pipelines ${r.renderPipelines} \u00b7 compute pipelines ${r.computePipelines} \u00b7 textures ${r.textures}`}var ZZ=2000,FZ=1e4,KZ=63,YZ="webkit shader parse",iZ=(e)=>typeof FinalizationRegistry==="function"?new FinalizationRegistry(e):null;class SEm{constructor(e,t){this.collectorOf=void 0;this.heard=void 0;this.live=0;this.chars=0;this.collector=void 0;this.collectorOf=e,this.heard=t}book(e,t){if(this.chars+=t,this.collector??=this.collectorOf((e)=>this.move(-e)),this.collector===null){this.heard(this.live,this.chars);return}let r=t*KZ;this.collector.register(e,r),this.move(r)}move(e){this.live=Math.max(0,this.live+e),this.heard(this.live,this.chars)}}class MZ{constructor(e,t,r,i){this.door=void 0;this.descriptor=void 0;this.label=void 0;this.standing=void 0;this.reading=0;this.lastUseMs=void 0;this.door=e,this.descriptor=t,this.label=t.label??"",this.standing=r,this.lastUseMs=i}getCompilationInfo(){return this.door.moduleOf(this).getCompilationInfo()}}class dEm{constructor(e,t,r=iZ){this.create=void 0;this.now=void 0;this.standing=new Set;this.letGo=0;this.letGoChars=0;this.parsedAgain=0;this.wordsAtMs=-1/0;this.wordsLetGo=0;this.parses=void 0;this.helperParses=new Map;this.helperChars=new Map;this.booked=new WeakSet;this.helperParseBytes=0;this.helperParsedChars=0;this.parseLost=null;this.parseOwner=null;this.stopParseOwner=null;this.create=e,this.now=t,this.parses=new SEm(r,()=>this.bookParse())}ask(e){let t=new MZ(this,e,this.parse(e).module,this.now());return this.standing.add(t),t}get parseBytes(){return this.parseLost??this.parseBytesLive}get parseBytesLive(){return this.parses.live+this.helperParseBytes}noteHelperParse(a,b,c){return $c0P($c0C(74),dEm.prototype,"noteHelperParse").call(this,a,b,c)}lose(){if(this.parseLost!==null)return;this.parseLost=this.parseBytesLive,this.stopParseOwner?.(),this.stopParseOwner=null,this.parseOwner?.release(),this.parseOwner=null}parse(e){let t=this.create(e);if(this.booked.has(t))return{module:t,parsed:!1};if(this.booked.add(t),this.parseLost===null)this.parses.book(t,e.code.length);return{module:t,parsed:!0}}bookParse(){if(this.parseLost!==null)return;if(this.stopParseOwner===null&&this.parseBytesLive>0)ab.call(this);this.parseOwner?.resize(this.parseBytesLive)}moduleOf(e){if(e.standing!==null)return e.standing;let{module:t,parsed:r}=this.parse(e.descriptor);if(e.standing=t,e.lastUseMs=this.now(),r)this.parsedAgain+=1;return this.standing.add(e),e.standing}read(e){if(!(e instanceof MZ)||e.door!==this)return e;let t=this.moduleOf(e);return e.reading+=1,t}settle(e){if(!(e instanceof MZ)||e.door!==this)return;e.reading=Math.max(0,e.reading-1),e.lastUseMs=this.now()}sweep(e=this.now()){if(this.standing.size===0)return 0;let t=0;for(let r of this.standing){if(r.reading>0||e-r.lastUseMs<ZZ)continue;r.standing=null,this.standing.delete(r),t+=1,this.letGo+=1,this.letGoChars+=r.descriptor.code.length}if(this.wordsLetGo+=t,this.wordsLetGo>0&&e-this.wordsAtMs>=FZ){bb.call(this,e);}return t}census(){let e=0;for(let t of this.standing)e+=t.descriptor.code.length;return{standing:this.standing.size,standingChars:e,letGo:this.letGo,letGoChars:this.letGoChars,parsedAgain:this.parsedAgain,parseBytes:this.parseBytes,helperParseBytes:this.parseLost===null?this.helperParseBytes:0,parsedChars:this.parses.chars,helperParsedChars:this.helperParsedChars}}}var IZ=1024,tZ=(e)=>e>=IZ*IZ?`${(e/(IZ*IZ)).toFixed(2)} M`:`${Math.round(e/IZ)} K`;function Sy5(e){return`shader text parsed ${tZ(e.parsedChars)} chars here, ${tZ(e.helperParsedChars)} on the helpers`}var WZ=new WeakMap;function oEm(e,t){let r=WZ.get(e);if(r!==void 0)return r;if(typeof e.createShaderModule!=="function")return null;let i=new dEm(e.createShaderModule.bind(e),t.now,t.collectorOf);WZ.set(e,i);let n=e.lost;if(FEG(n))n.then(()=>i.lose());e.createShaderModule=(e)=>i.ask(e);let l=function(e){let t=[e.vertex.module],r={...e.vertex,module:i.read(e.vertex.module)};if(e.fragment===void 0||e.fragment===null)return{descriptor:{...e,vertex:r},read:t};return t.push(e.fragment.module),{descriptor:{...e,vertex:r,fragment:{...e.fragment,module:i.read(e.fragment.module)}},read:t}},s=(e)=>({descriptor:{...e,compute:{...e.compute,module:i.read(e.compute.module)}},read:[e.compute.module]}),o=function(t,r){if(typeof t!=="function")return;let n=t.bind(e);return function(e){let{descriptor:t,read:l}=r(e),s=function(){for(let e of l)i.settle(e)},o;try{o=n(t)}catch(e){throw s(),e}if(FEG(o))o.then(s,s);else s();return o}},a=o(e.createRenderPipelineAsync,l),u=o(e.createRenderPipeline,l),d=o(e.createComputePipelineAsync,s),f=o(e.createComputePipeline,s);if(a)e.createRenderPipelineAsync=a;if(u)e.createRenderPipeline=u;if(d)e.createComputePipelineAsync=d;if(f)e.createComputePipeline=f;return i}var mEm=(function(e,t){return t.webkit&&t.browser?oEm(e,{now:t.now}):null});var __c=(function(e){return WZ.get(e)?.sweep()??0});function bWh(e){return WZ.get(e)?.census()??null}function aGd(e,t){let r=bWh(e);return r===null?null:`[renderer] pipeline shader text ${t}: ${Sy5(r)}`}function a9u(e){return e===void 0?0:WZ.get(e)?.parseBytes??0}var oPM=(function(e){return e!==void 0&&WZ.has(e)});var bS=new WeakSet;var rS=()=>[...x$()].filter((e)=>!bS.has(e));async function AzP(){for(let e=rS();e.length>0;e=rS()){await (Promise.allSettled(e))}}function ppG(e){AzP().then(e)}function vd(e){if(Array.isArray(e))return e.map(vd);if(e===null||typeof e!=="object")return e;return Object.fromEntries(Object.entries(e).map(([e,t])=>[e,vd(t)]))}function bd(e){return{...e,...e.constants===void 0?{}:{constants:{...e.constants}}}}function Ad(a){return (Ad=$c0C(75)).call(this,a)}class RNA{constructor(){this.recording=!0;this.createModule=null;this.modules=new WeakMap;this.groups=new WeakMap;this.layouts=new WeakMap;this.reaching=null;}install(a){return $c0O(215).call(this,a)}reach(e){let t;this.reaching=(e)=>{t="compute"in e?this.compute(e):this.render(e)};try{return{made:e(),recipe:t}}finally{this.reaching=null}}twin(a){return $c0C(76).call(this,a)}layout(e){return e==="auto"?e:this.layouts.get(e)}render(e){let t=this.layout(e.layout),r=this.modules.get(e.vertex.module),i=e.fragment===void 0?void 0:this.modules.get(e.fragment.module);if(t===void 0||r===void 0||e.fragment!==void 0&&i===void 0)return null;let{fragment:n,...l}=e;return{kind:"render",descriptor:{...l,layout:t,vertex:{...e.vertex,module:r},...n===void 0?{}:{fragment:{...n,module:i}}}}}compute(e){let t=this.layout(e.layout),r=this.modules.get(e.compute.module);return t===void 0||r===void 0?null:{kind:"compute",descriptor:{...e,layout:t,compute:{...e.compute,module:r}}}}clear(){this.recording=!1,this.modules=new WeakMap,this.groups=new WeakMap,this.layouts=new WeakMap}}function FNA(e){let t=e.kind==="compute"?[e.descriptor.compute.module]:[e.descriptor.vertex.module,e.descriptor.fragment?.module];return[...new Set(t)].reduce((e,t)=>e+(t?.code.length??0),0)}var UN={createRenderPipeline:"render",createRenderPipelineAsync:"render",createComputePipeline:"compute",createComputePipelineAsync:"compute"},dN=Symbol("lume.gpuWork.program"),lN=(e)=>e;function Nap(e){return e===null?void 0:lN(e)[dN]}function rN(a){return (rN=$c0C(77)).call(this,a)}var pN=function(e){let t=uLW(e)?Reflect.get(e,"module"):null;return uLW(t)?t:null},AN=function(e){let t=uLW(e)?Reflect.get(e,"entryPoint"):null;return typeof t==="string"?[t]:[]};function tOL(e){let t=0,r=[];for(let i of e){let n=pN(i);if(n===null||r.includes(n))continue;r.push(n);let l=e.flatMap((e)=>pN(e)===n?AN(e):[]);t+=W3(n,l)??0}return t}class P5Q{constructor(e,t){this.listens=void 0;this.now=void 0;this.texts=new Map;this.builds=[];this.listens=e,this.now=t}noteText(e,t){let r=this.texts.get(e);if(r!==void 0)r.hands+=1;else this.texts.set(e,{code:t,chars:t.length,firstAtMs:this.now(),hands:1})}textOf(e){return this.texts.get(e)?.code??null}handedTexts(){return this.texts.values()}handedTextEntries(){return this.texts.entries()}notePipeline(a,b,c,d){return $c0P($c0C(78),P5Q.prototype,"notePipeline").call(this,a,b,c,d)}noteHelperBuild(e,t,r,i,n,l){if(this.listens)db.call(this,e,t,r,i,n,l);}}var oN=new WeakMap;var LD$=(function(e){return oN.get(e)});var vOL=(function(e,t,r){let i=new P5Q(t,r);oN.set(e,i);if(t){XvU(e,(e,t)=>i.noteText(e,t));}return i});var HN=256,EN=4;var AG="spawn-prepared-recipes",NG="rows",tG=(e)=>uLW(e)&&typeof Reflect.get(e,"key")==="string"&&typeof Reflect.get(e,"scope")==="string",nG=(e)=>tG(e)&&typeof Reflect.get(e,"build")==="string",GG=(e)=>tG(e)&&typeof Reflect.get(e,"last")==="string"&&(Reflect.get(e,"before")===null||typeof Reflect.get(e,"before")==="string"),gG=(e,t)=>e?.name??t,pG="the open was blocked";function yLG(a,b){return (yLG=$c0O(216,yLG,"yLG")).apply(this,arguments)}function FLG(e){let t=fsL();if(t===void 0)return null;return yLG(t,typeof navigator>"u"?"":navigator.userAgent,e)}var JG=new WeakMap,zG=(e,t)=>JPf(JG,e,()=>GsL(t));function uLG(e){let t=JSON.stringify(e,function(e,t){if(e==="label")return;if(e==="code"&&typeof t==="string"&&uLW(this)){return zG(this,t);}return t});return`${t.length}:${YhI(t)}`}function uG5(a,b,c){return (uG5=$c0O(217,uG5,"uG5")).call(this,a,b,c)}var BT=new WeakMap,WT=new Set,XT=null,hT=/^[a-f0-9]{32}$/,mT=5,aT=4,tT=1,OT=30000,GT=120000,QT=300000,oT,$T=1,lT=()=>$T,VT=()=>Error("lume: pipeline device was destroyed"),xT=(e,t)=>`${e}:${t.entryPoint??""}${JSON.stringify(Object.entries(t.constants??{}).sort(([e],[t])=>e<t?-1:Number(e>t)))}`;function qTO(e){if(!e3w(e)||e<1)return 1;return Math.min(aT,Math.floor(e))}function UTO(){let e=CsL();if(e===void 0)throw ReferenceError("Worker");return new e(vsL(SsL(new URL(o7z("worker-pipeline-compiler.mjs"),import.meta.url)),"pipeline compiler"),{type:"module",name:"lume-pipeline-compiler"})}class ATO{constructor(e,t,r,i){this.device=void 0;this.config=void 0;this.options=void 0;this.recorder=new RNA;this.slots=void 0;this.state="active";this.ceiling=void 0;this.nextId=0;this.workerStarts=0;this.completed=0;this.rejected=0;this.sharedAsks=0;this.retainedBuilds=0;this.sharing=new Map;this.waiting=[];this.recipeObjectIds=new WeakMap;this.nextRecipeObjectId=0;this.deviceBusy=!1;this.deviceLane=!1;this.deviceQueue=[];this.deviceTurns=0;this.directCompiles=0;this.moduleUses=new WeakMap;this.now=void 0;this.prepared=void 0;this.preparedBefore=0;this.preparedMisses={beforeRead:0,noRecord:0,changed:0,fresh:0,changedLabels:[]};this.preparedLabels=new Map;this.preparedBeforeKeys=new Set;this.snapshotAtDispose=null;this.device=e;this.config=t;this.options=r;this.now=r.now??QeN;this.prepared=r.prepared===void 0?FLG(this.now):r.prepared;if(XT!==null)this.prepared?.name(XT);this.prepared?.read.then(()=>{this.takePreparedWaiting();for(let e=0;e<this.slots.length;e++)this.sendHeld(this.slots[e])}),this.slots=Array.from({length:Math.max(1,Math.floor(i))},(e,t)=>({index:t,worker:null,detach:null,info:null,retired:!1,jobs:new Map,idleSinceMs:null,keepMs:OT,restedAtMs:null,reborn:!1})),this.ceiling=this.slots.length}counted(e=!0){let t=0;for(let r=0;r<this.slots.length;r++){let i=this.slots[r];if(e?i.worker!==null:!i.retired)t+=1}return t}capacity(){let e=this.postureCapacity();if(!this.windowHelper(e))return e;return Math.min(this.ceiling,this.counted(!1),e+1)}postureCapacity(){let e=this.counted(!1);return Math.min(this.ceiling,e,oT??e)}windowHelper(e=this.postureCapacity()){if(!this.deviceLane||this.state!=="active")return!1;return Math.min(this.ceiling,this.counted(!1))>e}settleCapacity(){if(this.state!=="active")return;for(let e=this.slots.length-1;e>=0&&this.counted()>this.capacity();e-=1){let t=this.slots[e];if(t.worker!==null&&t.jobs.size===0)this.stopWorker(t,!0)}}start(a){return $c0C(79).call(this,a)}stopWorker(a){return $c0P($c0C(80),ATO.prototype,"stopWorker").apply(this,arguments)}retire(e,t){if(e.retired||this.state!=="active")return;let r=e.info!==null;e.retired=!0,this.stopWorker(e);let i=[...e.jobs.values()];if(e.jobs=new Map,!r)this.ceiling=Math.min(this.ceiling,this.counted());if(this.capacity()===0){this.unavailable(t,i);return}if((this.options.warn??Fn.warn)(`[lume] auxiliary pipeline helper ${e.index+1} unavailable: ${t}; ${this.capacity()} helper(s) prepare on`),r)for(let e of i)this.finish(e,null);else{for(let e of i)e.slot=null,e.held=!1;this.waiting.push(...i)}this.feed()}idle(){let e=null;for(let t=0;t<this.slots.length;t++){let r=this.slots[t];if(r.worker!==null&&r.jobs.size===0&&(e===null||e.info===null&&r.info!==null))e=r}if(e!==null)return e;while(this.state==="active"&&this.counted()<this.capacity()){let e=this.slots.find((e)=>!e.retired&&e.worker===null);if(e===void 0)return null;if(this.start(e))return e}return null}feed(){while(this.state==="active"&&this.waiting.length>0){let e=this.idle();if(e===null||this.waiting.length===0)return;let t=0;let v$13;{let e=this.waiting[0];let t=1/0;for(let r of e.asks)t=Math.min(t,r.lane());v$13=t;}let r=v$13;{ea=fb.call(this,r,t,e);t=xa[0];r=xa[1];if(ea===ya)continue;}}}post(e,t){if(t.slot=e,e.idleSinceMs=null,e.jobs.set(t.id,t),t.held=t.preparedKey!==null&&e.info===null&&this.prepared?.census().outcome==="reading",!t.held)this.send(e,t)}sendHeld(a){return $c0P($c0C(81),ATO.prototype,"sendHeld").call(this,a)}send(a,b){return $c0C(82).call(this,a,b)}finish(e,t){if(this.sharing.get(e.key)===e)this.sharing.delete(e.key);let r="unavailable";if(t!==null)r=t.ok?"prepared":"rejected";let i=e.slot?.info??null;if(t!==null&&i!==null)LD$(this.device)?.noteHelperBuild(e.recipe.kind,e.recipe.descriptor.label??"",i.timeOriginMs+t.startedAtMs-performance.timeOrigin,i.timeOriginMs+t.settledAtMs-performance.timeOrigin,t.ok,e.sourceCodeUnits);for(let{record:n,now:l}of e.asks)if(n.settledAtMs=l(),n.outcome=r,t!==null&&i!==null)n.worker={...n.worker,timeOriginMs:i.timeOriginMs,startedAtMs:t.startedAtMs,returnedAtMs:t.returnedAtMs,settledAtMs:t.settledAtMs,phase:"complete",progressAtMs:t.settledAtMs,ok:t.ok};e.resolve({outcome:r,state:t?.ok===!0&&t.state!==!1?"helper":null})}cancel(e,t){for(let{record:t,now:r}of e.asks)t.settledAtMs=r(),t.outcome="canceled";e.reject(t)}takeJobs(a){return $c0P($c0C(83),ATO.prototype,"takeJobs").call(this,a)}retainUntil(e){this.retainedBuilds+=1;let t=()=>{this.retainedBuilds-=1};e.then(t,t)}endIdleForDebug(){if(this.state!=="active")return!1;let e=!1;for(let t=0;t<this.slots.length;t++){let r=this.slots[t];if(r.worker===null||r.jobs.size>0)continue;this.stopWorker(r,!0),e=!0}return e}releaseIdle(a){return $c0P($c0C(84),ATO.prototype,"releaseIdle").call(this,a)}idleOutlived(e,t){if(e.reborn){{e.reborn=!1,e.keepMs=e.restedAtMs!==null&&t-e.restedAtMs<=GT?Math.min(QT,e.keepMs*2):OT;
}}return e.idleSinceMs??=t,t-e.idleSinceMs>=(vrH()?OT:e.keepMs)}unavailable(a){return $c0C(85).apply(this,arguments)}namePrepared(e){this.prepared?.name(e)}builtBefore(a){return $c0P($c0O(218,ATO.prototype["builtBefore"],"ATO.prototype[\"builtBefore\"]"),ATO.prototype,"builtBefore").call(this,a)}notePreparedAsk(a,b){return $c0P($c0C(86),ATO.prototype,"notePreparedAsk").call(this,a,b)}preparedRecordWords(a){return $c0P($c0C(87),ATO.prototype,"preparedRecordWords").call(this,a)}takePreparedWaiting(){if(this.state!=="active"||this.waiting.length===0)return;this.waiting=this.waiting.filter((e)=>!this.builtBefore(e))}dispose(){return $c0C(88).call(this)}assertLive(){if(this.state==="disposed"){throw VT()}}get failed(){return this.state==="unavailable"}recipeObjectId(e){let t=this.recipeObjectIds.get(e);if(t===void 0)t=++this.nextRecipeObjectId,this.recipeObjectIds.set(e,t);return t}shareKey(e){return`${e.kind}:${JSON.stringify(e.descriptor,(e,t)=>{if(e==="label")return;return(e==="module"||e==="layout")&&uLW(t)?this.recipeObjectId(t):t})}`}prepare(e,t,r,i,n=null,l){if(this.assertLive(),this.state!=="active")return null;let s=FNA(e);let o=this.shareKey(e);let a=this.sharing.get(o);if(a!==void 0){return ib.call(this,a,t,s,r,l,i);}let u=this.idle();if(this.state!=="active")return null;let d=++this.nextId,f={id:d,startedAtMs:t(),settledAtMs:null,sourceCodeUnits:s,outcome:"pending"},c,h=new Promise(function(e,t){c={resolve:e,reject:t}}),p={id:d,recipe:e,key:o,preparedKey:n,sourceCodeUnits:s,slot:null,asks:[{record:f,now:t,lane:r,skipped:l}],promise:h,...c};if(this.sharing.set(o,p),i?.(f),u===null)this.waiting.push(p);else this.post(u,p);return h}atDevice(e,t,r){if(this.assertLive(),t)this.directCompiles+=1;return new Promise((i,n)=>{let l=()=>{this.deviceBusy=!0;let r;try{r=Promise.resolve(e())}catch(e){r=Promise.reject(e)}let l=()=>{if(t)this.directCompiles-=1;this.deviceBusy=!1,this.nextDeviceTurn()?.run()};r.then(l,l),r.then(i,n)},s=(e)=>{if(t)this.directCompiles-=1;n(e)};if(this.deviceBusy||this.deviceQueue.length>0)this.deviceQueue.push({run:l,cancel:s,lane:r,order:++this.deviceTurns});else l()})}nextDeviceTurn(){let e=this.deviceQueue;if(e.length===0)return;let t=0,r=e[0].lane();for(let i=1;i<e.length;i+=1){let n=e[i].lane();if(n<r||n===r&&e[i].order<e[t].order)t=i,r=n}return e.splice(t,1)[0]}setDeviceLane(e){if(this.deviceLane===e)return;if(this.deviceLane=e,e)this.feed();else this.settleCapacity()}deviceLaneTakes(e,t){return this.deviceLane&&this.state==="active"&&!this.windowHelper()&&this.directCompiles===0&&t()<=0&&!this.sharing.has(this.shareKey(e))&&this.idle()===null}withState(e,t,r,i){if(r===void 0)return e;return async()=>{let n=await e(),l=t?.kind==="render"&&this.state!=="disposed"?await r(n,t.descriptor):!1;return i.state?.(l?"device":"draw"),n}}async renderStateAtDevice(e,t){return await uG5(this.device,t,e)==="built"}build(e,t,r,i,n,l){let s=()=>{let l=this.handModules(t),s;try{let e=this.recorder.reach(()=>r(i));return s=e.recipe,e.made}finally{n.handed?.({recipe:s===void 0?e:s,modules:l})}};let o=n.lane??lT;let a=e===null||this.prepared===null||this.state!=="active"?null:uLG(e);if(a!==null&&e!==null)this.notePreparedAsk(a,e.descriptor.label??null);if(a!==null&&this.prepared?.has(a)===!0){return lb.call(this,a,n,l,s,o);}if(e!==null&&this.deviceLaneTakes(e,o)){return nb.call(this,n,s,e,l,o);}let u=e===null?null:this.prepare(e,n.now??this.now,o,n.note,a,n.skipped);if(u===null)ob.call(this,n,e);else oW(u);let d=u===null?this.atDevice(this.withState(s,e,l,n),!0,o):u.then(({outcome:t,state:r})=>{if(r!==null&&l!==void 0)n.state?.(r);return this.atDevice(r===null?this.withState(s,e,l,n):s,t!=="prepared",o)});return this.retainUntil(d),d}programModule(a,b,c){return $c0P($c0C(89),ATO.prototype,"programModule").call(this,a,b,c)}programRender(a,b){return $c0P($c0C(90),ATO.prototype,"programRender").call(this,a,b)}programCompute(e,t){let r=this.programModule(e.compute.module,xT("compute",e.compute),t);return{descriptor:r===e.compute.module?e:{...e,compute:{...e.compute,module:r}},modules:[[r,"compute"]]}}handModules(e){return e.map(([e,t])=>{let r=this.moduleUses.get(e),i={stages:t,builds:r?.builds??0,programSets:r?.programs.size??1,textSets:r?.sets.size??1};if(r!==void 0)r.builds+=1;return i})}room(){let e=this.directCompiles+this.waiting.length;for(let t=0;t<this.slots.length;t++){let r=this.slots[t];e+=r.jobs.size}return(this.state==="active"?Math.max(1,this.capacity())+(this.deviceLane&&!this.windowHelper()?1:0):1)-e}snapshot(){let e=[],t=0,r=0,i=null;for(let n=0;n<this.slots.length;n++){let l=this.slots[n];if(l.worker===null)continue;let s=0;for(let e of l.jobs.values())s+=e.sourceCodeUnits;t+=l.jobs.size,r+=s,i??=l.info,e.push({slot:l.index,state:l.info===null?"starting":"ready",pending:l.jobs.size,pendingSourceCodeUnits:s,worker:l.info})}for(let e of this.waiting)r+=e.sourceCodeUnits;t+=this.waiting.length;let n=this.state==="active"?"not-started":this.state;if(this.state==="active"&&e.length>0)n=e.some((e)=>e.state==="ready")?"ready":"starting";return{state:n,size:this.slots.length,retired:this.slots.filter((e)=>e.retired).length,workerStarts:this.workerStarts,completed:this.completed,rejected:this.rejected,pending:t,pendingSourceCodeUnits:r,waiting:this.waiting.length,shared:this.sharedAsks,preparedBefore:this.preparedBefore,atDevice:(this.deviceBusy?1:0)+this.deviceQueue.length,worker:i,workers:e,nativeBytes:null}}}function CTO(a){return (CTO=$c0C(91)).call(this,a)}function iTO(a,b){return (iTO=$c0O(219,iTO,"iTO")).apply(this,arguments)}var EpY=(function(e){if(XT!==null||typeof e!=="string"||!hT.test(e))return;XT=e;for(let t of WT)t.namePrepared(e)});var ErF=(function(e){oT=e?tT:null;for(let e of WT)e.settleCapacity()});var GYZ=((e,t,r)=>(e||t)&&!r);var bK2=(function(e,t){BT.get(e)?.setDeviceLane(t)});var WTO=(function(e,t){BT.get(e)?.retainUntil(t)});function Gw2(e,t){return BT.get(e)?.releaseIdle(t)??!1}var Lmy=(function(e){return BT.get(e)?.room()??null});var FT=new WeakMap;function Dvo(e){let t=FT.get(e);if(t===void 0)t=Lmy(e)===null,FT.set(e,t);return t}var FND=(function(e){return BT.get(e)?.snapshot()??null});function N7B(e,t){return BT.get(e)?.preparedRecordWords(t)??null}function okg(e){let t=BT.get(e);if(t===void 0)return null;return t.snapshotAtDispose??t.snapshot()}function Ewz(e,t,r=(t)=>e.createRenderPipelineAsync(t),i={}){let n=BT.get(e);if(n===void 0)return i.skipped?.("no-helper"),r(t);n.assertLive();let{descriptor:l,modules:s}=n.programRender(Ad(t),i.parsed);let o=cUu(e,l);let a=n.recorder.render(o);return n.build(a,s,r,o,i,(e,t)=>n.renderStateAtDevice(e,t))}function rTO(e,t,r=(t)=>e.createComputePipelineAsync(t),i={}){let n=BT.get(e);if(n===void 0)return i.skipped?.("no-helper"),r(t);n.assertLive();let{descriptor:l,modules:s}=n.programCompute(({...t,compute:bd(t.compute)}),i.parsed);let o=n.recorder.compute(l);return n.build(o,s,r,l,i)}var MD=27;function CD_(e){return QD(e,(e)=>e===WD)}var WD=27;function QD(e,t){if(!pmN(e))return!1;let r=/\bVersion\/(\d+)\./.exec(e??"");if(r===null||/\b(?:CriOS|FxiOS|EdgiOS)\//.test(e??""))return!0;return t(Number(r[1]))}var Oa={instanceRateVertexFetch:!0,buildsBlockSubmits:!1,buildsOnPresentThread:!1,timestampClock:!0,mappedRangeIsRoundTrip:!1,externalCopyReadsBack:!1,depthReadInPlace:!1,undecodedViews:!1,passBundles:!1,arrivalsKeepPace:!1,overridesInText:!1,wordsAwaitPoll:!1,usedModuleMissesCache:!1};function vFx(e){let t=pmN(e),r=T66(e);return{instanceRateVertexFetch:!t,buildsBlockSubmits:t||r,buildsOnPresentThread:r,timestampClock:!t,mappedRangeIsRoundTrip:t,externalCopyReadsBack:t,depthReadInPlace:!t,undecodedViews:!0,passBundles:CK(e),arrivalsKeepPace:t,overridesInText:r,wordsAwaitPoll:null,usedModuleMissesCache:(QD(e,(e)=>e>=MD))}}var ja=(function(e,t){if(e?.mode!=="stream"){return{...vFx(t),...e?.verdicts??{}};}return{...Oa,...e.verdicts??{}}});var oFx=(function(e,t){if(!t)return e;return{...e,buildsBlockSubmits:!0,buildsOnPresentThread:!0}});var hFx=(function(e,t){return e?.mode==="stream"||e?.verdicts?.buildsBlockSubmits!==void 0||pmN(t)});var VFx=(function(e,t,r){return e&&!r&&!t.buildsOnPresentThread});function $cZ(e,t){return{schemaVersion:e,mode:"stream",...t?{verdicts:t}:{}}}var l0=new WeakSet;var W8y=(function(e){return l0.has(e)||eZu(e)});var w1=/\badreno-5xx\b/i,G1=/\bAdreno \(TM\) 5\d\d\b/;function c0(e,t){let r=globalThis.GPUPipelineError;if(typeof r==="function")return new r(e.message,{reason:t});let i=Error(e.message);return i.name="GPUPipelineError",Object.assign(i,{reason:t})}function Q0(a,b){return (Q0=$c0C(92)).call(this,a,b)}function aJx(a){return (aJx=$c0C(93)).call(this,a)}var UJx=(function(e,t){if(t.compatibility)return!0;let v$14;iJx:{let e=t;if(e.compatibility||!/\bAndroid\b/.test(e.userAgent??"")){v$14=!1;break iJx;}v$14=w1.test(e.description)||G1.test(e.renderer??"");}if(!v$14||!aJx(e))return!1;return Fn.info("[lume] present-thread builds ARMED (an Adreno 500 series on Vulkan stops its queue under a build on the GPU process's worker thread): every pipeline builds on the GPU process's own thread, in order with the queue, and each build stops the frames for its compile"),!0});function If3(e){return MsL(e)}function cF(e,t,r){return`${e}|${t}|${r}`}var eF="below the floor, first loss";var LF="no software adapter clears the floor";var QF=(e,t)=>bF(cF(e,t,LF));function Uf3(e,t,r,i=e){let n=(e,i)=>[...e].some((e)=>e.startsWith(`${t}|${r??""}`)&&e.endsWith(`|${i}`));return!n(e,"drew")&&!n(e,"floor stood")&&(r!==null||n(e,LF))&&n(i,eF)}function hF(e){if(e.answer!=="found"||!Array.isArray(e.value))return[];return e.value.filter((e)=>typeof e==="string")}var ckJ={marks:new Set,said:function(){return}};function ryF(e=[]){for(let t of e)ckJ.marks.add(t)}async function Df3(){let e=ckJ.marks,t=await ff6(MK);if(!["found","none","no-store"].includes(t.answer))Fn.warn(`[lume] stand-lost record read: ${t.answer}, ${e.size} mark(s) kept in this realm`);return new Set([...hF(t),...e])}async function bF(e){ckJ.marks.add(e),ckJ.said(ckJ.marks);let t=e.slice(0,e.indexOf("|")+1),{wrote:r}=await kJP(MK,function(r){let i=hF(r).filter((e)=>e.startsWith(t));return i.includes(e)?{outcome:void 0}:{value:[...i,e],outcome:void 0}});return r??"held"}var g4=new WeakMap,S4=[],W4=1,C4=4,PGr={polls:0,probes:0};function y1r(){let e=globalThis.requestAnimationFrame;return{beat:typeof e==="function"?((t)=>void e.call(globalThis,t)):null,now:Bra}}var K4={beat:null,now:Bra};function J1r(a,b,c,d,e){return (J1r=$c0O(220,J1r,"J1r")).apply(this,arguments)}var n4=(function(e){return e.verdict==="holds"||e.verdict==="unknown"&&e.host.beat!==null});var U1r=(function(e,t){if(!n4(e))return t;if(e.extraOut())return e.covered=!0,c4(e),t;return rb(e,t);});function w4(e){let t=e.probe;if(e.verdict==="unknown"&&t.out&&t.askedAtTouches===e.touches&&e.host.now()-t.askedAtMs>=e.beatStepMs)e.verdict="holds"}var c4=(function(e){let t=e.host.beat;if(t===null||e.beatPending||e.probe.lost||e.verdict==="answers")return;if(e.verdict==="holds"&&!(e.out>0||e.covered||e.extraOut()))return;e.beatPending=!0,t(e.onBeat)});function E1r(e,t){e.beatPending=!1;t1r:{let r=t-e.lastBeatMs;if(e.lastBeatMs=t,e.framed||!(r>0))break t1r;e.beatStepMs=r;if(e.answeredInMs>=r){{e.verdict="unknown",e.answeredInMs=NaN}}}if(e.verdict==="answers"||e.probe.lost)return;w4(e);if(n4(e)&&(e.out>0||e.covered||e.extraOut())&&e.touches===e.touchesAtBeat)_4(e);e.touchesAtBeat=e.touches,Y4(e),c4(e)}function Y4(e){let t=e.probe;if(t.out||t.lost||e.verdict==="answers"||e.host.beat===null||!n4(e)||e.extraOut())return;v4(e,!1)}function _4(e){if(!e.extraOut())e.covered=!1;e.touches+=1,PGr.polls+=1,e.poll()}function v4(e,t){let r=e.probe;r.buffer??=e.createProbe();let i=r.buffer;if(i===null){r.lost=!0;return}if(r.out=!0,PGr.probes+=1,r.second=t,r.askedAtMs=e.host.now(),!t)r.pairAskedAtMs=r.askedAtMs;r.askedAtTouches=e.touches;let n=i.mapAsync(W4);e.answers.probe=n,n.then(e.probeAnswered,e.probeRefused)}function Q1r(e,t){let r=e.probe;if(r.out=!1,t.unmap(),e.verdict==="answers")return;if(r.askedAtTouches!==e.touches){Y4(e);return}if(!r.second){v4(e,!0);return}let i=e.host.now()-r.pairAskedAtMs;if(!e3w(e.beatStepMs)||!(i<e.beatStepMs))return;e.verdict="answers",e.answeredInMs=i,r.buffer=null,t.destroy()}var dx=new WeakMap,Dx=new WeakMap,ox=new WeakSet;function h35(e){return dx.get(e)?.fxc===!0}var Vx;var JMQ=(function(e,t){if(t!==void 0&&!/Windows/.test(t))return null;if(typeof e.createComputePipelineAsync!=="function"||typeof e.createShaderModule!=="function")return null;let r=Bra(),i=MMQ(e,r);return Dx.set(e,{read:i,startedAtMs:r}),i});function MMQ(a,b){return (MMQ=$c0C(95)).call(this,a,b)}function _mJ(e,t,r){let i=Dx.get(e);if(i===void 0)return r();return tb(e,i,t,r);}var udQ=(function(e){let t=dx.get(e);if(t!==void 0)return`${t.fxc?"fxc":"core"} ${t.ms.toFixed(1)} ms at +${Math.round(t.startedAtMs)}${t.held?" held":""}`;let r=Dx.get(e);return r===void 0?"-":`asked +${Math.round(r.startedAtMs)}`});var dra=(function(e){let t=Dx.get(e);if(t===void 0)return Promise.resolve(dx.get(e)??null);return t.read.then(()=>dx.get(e)??null)});function UMQ(e){dx.set(e,{fxc:!0,startedAtMs:0,ms:0,held:!1})}var CM=0.3333333333333333,QM="a frame is watched now",tM=null,zM=()=>null,GM=null,gM=new WeakMap,BM=()=>Date.now(),cM="spawn-pipelines-kept-order",MM="[renderer] pipelines kept: ";async function KwC(e){let t=lK();if(t===void 0)return e();let r=!1;try{await t.request(cM,function(){return r=!0,e()})}catch(t){if(r)throw t;await e()}}var oM=(e)=>XYw(e)&&typeof e.k==="string"&&baM(e.m)&&e.m.length>0&&(e.c===void 0||typeof e.c==="number"&&e.c>=0)&&(e.a===void 0||e.a===1)&&(e.t===void 0||e3w(e.t)),WM=function(a){return (WM=$c0C(96)).call(this,a)},LM=(e)=>(LM=$c0C(97))(e),TM=(e,t)=>({...e,module:t}),JM=function(e,t){if(!XYw(e)||typeof e.module!=="string")return null;let r=t.get(e.module);return r===void 0?null:{...e,module:r}};class iM{constructor(e,t){this.native=void 0;this.read=void 0;this.texts=new Map;this.modules=new Map;this.groupObjects=new Map;this.layoutObjects=new Map;this.native=e,this.read=t}on(e){this.native=e}textOf(e){let t=this.texts.get(e);if(t===void 0)this.texts.set(e,t=this.read(e).catch(()=>null));return t} entries(a,b){return $c0C(98).call(this,a,b)}stand(a,b,c){return $c0C(99).call(this,a,b,c)} create(a,b,c){return $c0C(100).call(this,a,b,c)}}class FwC{constructor(e,t,r=null,i=null){this.native=void 0;this.clock=void 0;this.twin=void 0;this.afterPage=void 0;this.order=new Map;this.modulesOf=new Map;this.builds=new Map;this.coldMs=1/0;this.oneAtATime=()=>!1;this.atDevice=new Set;this.unproven=null;this.booted=!1;this.bornAt=BM();this.dropped=new Map;this.bootKeys=null;this.bootArrival=new Set;this.gone=new Set;this.asked=new Set;this.seen=new Set;this.out=new Map;this.answering=new Map;this.known=new Set;this.pending=new Map;this.orderDirty=!1;this.draining=!1;this.openArrived=void 0;this.arrived=new Promise((e)=>this.openArrived=e);this.held=new Map;this.building=new Set;this.moduleKeys=new WeakMap;this.groups=new WeakMap;this.layouts=new WeakMap;this.replayed=null;this.arrival=null;this.arrivalMarks=this.bootArrival;this.arrivedAt=null;this.bootArrivedAt=null;this.stale=!1;this.pictureStale=!1;this.touching=!1;this.keys=new Map;this.pictureOwn=()=>!1;this.picture=[];this.reader=null;this.line=null;this.arrivalWaits=null;this.touches=()=>!0;this.owes=()=>!1;this.keptRun=null;this.firstPassFrom=null;this.native=e,this.clock=t,this.twin=r,this.afterPage=i}ask(){let e={at:this.clock(),ahead:[...this.atDevice],answeredAt:null};return this.atDevice.add(e),e}arrive(a,b,c,d,e){return $c0C(101).call(this,a,b,c,d,e)}takeArrival(){return $c0P($c0C(102),FwC.prototype,"takeArrival").call(this)}keepTouchJob(a){return $c0P($c0C(103),FwC.prototype,"keepTouchJob").call(this,a)}touchWhenQuiet(){return $c0P($c0C(104),FwC.prototype,"touchWhenQuiet").call(this)} touchArrival(a,b,c,d,e){return $c0P($c0C(105),FwC.prototype,"touchArrival").call(this,a,b,c,d,e)} touchPass(a,b,c,d,e,f){return $c0C(106).apply(this,arguments)}answer(a){return $c0C(107).call(this,a)}quiet(){if(this.arrivalWaits?.()===!1)this.arrivalWaits=null,this.takeArrival();if(this.atDevice.size===0)this.touchWhenQuiet()}judged(e){if(this.arrival!==null&&e>this.coldMs)this.stale=this.pictureStale=!0}keepText(e,t){if(!this.known.has(e))this.pending.set(e,t);else this.unproven?.set(e,t)}lost(e){this.known.delete(e);let t=this.unproven?.get(e);if(t!==void 0)this.pending.set(e,t)}noteModule(e,t){if(e.compilationHints!==void 0||this.moduleKeys.has(t))return;let r=Iz(e.code);this.moduleKeys.set(t,r),this.keepText(fK(r),e.code)}noteGroup(e,t){this.groups.set(t,{entries:Array.from(e.entries,(e)=>({...e}))})}noteLayout(e,t){let r=[];for(let t of e.bindGroupLayouts){if(t===null||t===void 0){r.push(null);continue}let e=this.groups.get(t);if(e===void 0)return;r.push(e)}this.layouts.set(t,r)}noteRender(a){return $c0P($c0C(108),FwC.prototype,"noteRender").call(this,a)}noteCompute(a){return $c0P($c0C(109),FwC.prototype,"noteCompute").call(this,a)}noteRecipe(e,t){let r=V3y(t),i=Iz(r);if(e!==void 0)this.keys.set(i,e);if(!this.seen.has(i))this.sent(i),this.answering.set(i,{text:r,modules:t.modules});return this.asked.add(i),this.owe(),i}sent(e){if(ZYD(this.out,e),this.order.has(e))this.orderDirty=!0}came(a,b,c){return $c0P($c0C(110),FwC.prototype,"came").call(this,a,b,c)}settled(e,t){if(this.out.has(e))this.came(e,t)}answered(e){this.held.delete(e)}holds(e){return this.held.has(e)||this.building.has(e)}compiled(a,b){return $c0C(111).call(this,a,b)}timed(e,t){let r=this.builds.get(e);if(r!==void 0&&r<=t)return;this.builds.set(e,t),this.orderDirty=!0,this.owe()}touch(e,t){this.seen.add(e);this.order.delete(e);this.order.set(e,BM());this.dropped.delete(e);this.modulesOf.set(e,[...t]);this.orderDirty=!0}owe(){return $c0C(112).call(this)} drain(a){return $c0C(113).call(this,a)}orderAfter(a){return $c0P($c0C(114),FwC.prototype,"orderAfter").call(this,a)}merge(a){return $c0C(115).call(this,a)}async replay(e,t,r,i,n){let l=this.clock,s=l();this.coldMs=t,this.oneAtATime=r,this.reader=i,this.unproven=new Map;let[o,a]=await Promise.all([i(QK).catch(()=>null),i(LsL).catch(()=>null)]),u=WM(o),d=u?.records??[];if(this.bootArrivedAt=u?.arrivedAt??null,a!==null)Fn.info(`${MM}the last touch after a page wrote ${a}`);this.merge(d);let f=d.slice().reverse(),c=f.filter((e)=>this.bootArrival.has(e.k)),h=[...c,...f.filter((e)=>!this.bootArrival.has(e.k))],p=c.length,m={records:d.length,arrival:p,asked:0,fast:0,slow:0,refused:0,missing:0,dropped:0,unread:0,held:0,firstSlowMs:null,readMs:l()-s,wallMs:0};this.counts=m,this.owe();let g=new iM(this.native,i);let y=new Set;let v=0;let w=!1;let b=!1;let k=new Set;let x=[];let M=Math.max(1,Math.floor(e)||1);let S=function(){if(!w&&v<h.length&&x.length<M)x.push(C())};let I=0;let R=()=>{if(I===0&&(w||v>=h.length))this.unproven=null};let A=async(e)=>{I+=1;let t=await e().catch(()=>[]);if(I-=1,!Array.isArray(t))return t;for(let e of t)this.lost(e);return null};let $=null;let z=0;let O=0;let T=async(e,t,r,i)=>{let l={answer:null},s=await n(e,()=>{if(this.asked.has(e))return{chars:0,answer:Promise.resolve(null)};m.asked+=1,this.sent(e),this.owe(),this.building.add(e);let t=this.ask(),i=r();return l.answer=i.answer.then((e)=>({pipeline:e,ms:this.answer(t)}),(e)=>{throw this.answer(t),e}),i}),o=l.answer;if(s===null)w=!0,b=!0;if(o===null)return;let a=this.builds.get(e)??1/0,u=a*CM,d=!1;try{let{pipeline:r,ms:n}=await o;d=!0;this.came(e,!0,t);this.judged(n);if(n>u){m.slow+=1;m.firstSlowMs??=n;if(i<p&&O<z){O+=1;if(!this.oneAtATime()){S()}}else if($===null&&(n<a||a<=this.coldMs))$=i;else {w=!0;R();}}else{if(m.fast+=1,i<p)z+=1;if($!==null&&i>$)$=null;S()}if(!this.asked.has(e))this.held.set(e,r)}catch{if(m.refused+=1,!d)this.came(e,!1)}finally{this.building.delete(e),this.quiet()}};let C=async()=>{while(!w&&v<h.length){let e=v++,t=h[e];if(t===void 0)continue;let{k:r,m:i}=t;if(this.asked.has(r)){y.add(r),await A(()=>g.entries(r,i));continue}let n=await A(()=>g.create(r,i));if(n===null){m.missing+=1,k.add(r);continue}if(w)break;if(y.add(r),this.asked.has(r))continue;await T(r,i,n,e)}R()};S();for(let e=0;e<x.length;e+=1)await x[e];this.unproven=null;for(let{k:e,t:t}of d){if(y.has(e)||this.asked.has(e))continue;if(b&&!k.has(e)){m.unread+=1;continue}this.order.delete(e),this.modulesOf.delete(e),this.dropped.set(e,t),this.gone.add(e),m.dropped+=1}return this.orderDirty=!0,this.owe(),m.held=this.held.size,m.wallMs=l()-s,m}}var pXa=(function(e){return gM.has(e)});function rwC(e,t,r={},i=Bra,n,l){if(r.gpu!==void 0||r.hostProfile!==void 0||!wsL(t)||gM.has(e))return;if(typeof e.createShaderModule!=="function"||typeof e.createRenderPipelineAsync!=="function"||typeof e.createComputePipelineAsync!=="function")return;let s=LM(e),o=new FwC(s,i,n??null,n===void 0?null:l??null);gM.set(e,o),GM=o;let a=function(e){try{e()}catch{}},u=function(e){try{return e()}catch{return null}};e.createShaderModule=function(e){let t=s.createShaderModule(e);a(()=>o.noteModule(e,t));return t};e.createBindGroupLayout=function(e){let t=s.createBindGroupLayout(e);a(()=>o.noteGroup(e,t));return t};e.createPipelineLayout=function(e){let t=s.createPipelineLayout(e);a(()=>o.noteLayout(e,t));return t};let d=e.createRenderPipeline.bind(e),f=e.createComputePipeline.bind(e),c=function(e,t){let r=e!==null&&o.holds(e),i=o.ask();return t.then(function(){let t=o.answer(i);if(e!==null&&r)o.answered(e);else if(e!==null)o.compiled(e,t);if(e!==null)o.settled(e,!0);o.quiet()},function(){if(o.answer(i),e!==null)o.settled(e,!1);o.quiet()}),t};e.createRenderPipelineAsync=(e)=>c(u(()=>o.noteRender(e)),s.createRenderPipelineAsync(e)),e.createComputePipelineAsync=(e)=>c(u(()=>o.noteCompute(e)),s.createComputePipelineAsync(e));let h=function(e,t){if(e!==null)o.answered(e),o.settled(e,!0);return t};e.createRenderPipeline=(e)=>h(u(()=>o.noteRender(e)),d(e));e.createComputePipeline=(e)=>h(u(()=>o.noteCompute(e)),f(e))}var eM=function(){return (eM=$c0C(116)).call(this)};function rMq(e,t){let r=gM.get(e);if(r?.replayed!==null)return null;r.replayed=r.replay(t.window,t.coldMs,t.oneAtATime??(()=>!1),t.read??eM(),t.line);return r.replayed}var cTE=(e)=>gM.get(e)?.counts;function jHG(e,t,r,i=()=>!1,n=()=>!1,l=()=>!1){gM.get(e)?.arrive(t,r,i,n,l)}function mEp(e){if(e!==void 0)gM.get(e)?.quiet()}function sle(e,t=()=>null){tM=e,zM=t,GM?.owe()}function syo(a){return $c0C(117).call(this,a)}var Fz="generated metal:",ez=" - error ";function Oz(e){return/^\s*[\^~][\^~\s]*$/.test(e)}var Ez=/^\s*(?:\d+\s*)?[\u2502|]/,Gz=/^\s*(?:[\u250c\u256d\u2570]|-{2}>)/;var ZB=250,iB=16,BB=1065353216;function HS5(a){return (HS5=$c0C(118)).call(this,a)}function QS5(e){let t={"unfilterable-float":"f32",uint:"u32",sint:"i32"}[e.sample],r={"2d":"texture_2d","2d-array":"texture_2d_array",cube:"texture_cube","3d":"texture_3d"}[e.view],i=e.view==="3d"?"let size = textureDimensions(t, 0);":"let size = vec3u(textureDimensions(t, 0), 1);",n={"2d":"1","2d-array":"textureNumLayers(t)",cube:"6","3d":"size.z"}[e.view],l={"2d":"textureLoad(t, vec2u(), 0)","2d-array":"textureLoad(t, vec2u(), 0, 0)",cube:`vec4<${t}>()`,"3d":"textureLoad(t, vec3u(), 0)"}[e.view],s=t==="u32"?l:`bitcast<vec4u>(${l})`;return`@group(0) @binding(0) var t: ${r}<${t}>;
@vertex fn vs(@builtin(vertex_index) i: u32) -> @builtin(position) vec4f {
  let c = array(vec2f(-1, -1), vec2f(3, -1), vec2f(-1, 3));
  return vec4f(c[i], 0, 1);
}
@fragment fn fs(@builtin(position) p: vec4f) -> @location(0) vec4u {
  ${i}
  if ((u32(p.x) & 1) == 0) {
    return vec4u(size.xy, ${n}, 1);
  }
  return ${s};
}
`}function cS5(e,t,r,i){if(e[t+3]!==1)return null;let n=e[t],l=e[t+1],s=e[t+2],o=`its size read ${n}x${l}x${s} where it was made ${r.width}x${r.height}x${r.layers}`;if(n!==r.width||l!==r.height||s!==r.layers)return{deleted:!0,read:o};if(!r.onePixel||i===null)return{deleted:!1,read:o};let a=r.kind.sample==="unfilterable-float"?BB:1;let u=(e,t)=>e[t]===0&&e[t+1]===0&&e[t+2]===0&&e[t+3]===a;let d=u(e,t+4)&&!u(i,0);return{deleted:d,read:d?`its one texel read (0, 0, 0, 1) where it first read [${Array.from(i).join(", ")}]`:o}}class RS5{constructor(e,t,r,i,n,l,s){this.device=void 0;this.markDeleted=void 0;this.standBuffer=void 0;this.standTexture=void 0;this.stood=void 0;this.clock=void 0;this.warn=void 0;this.watched=new Map;this.cursor=this.watched.values();this.programs=new Map;this.answer=null;this.read=null;this.flight=null;this.sentMs=-1/0;this.verdicts=0;this.deletedLabels=new Map;this.device=e,this.markDeleted=t,this.standBuffer=r,this.standTexture=i,this.stood=n,this.clock=l,this.warn=s}add(e,t){let r=HS5(t);if(r===null||this.programs.get(r.key)?.off===!0)return;let[i,n,l]=Iv(t.size),s=r.view==="cube"?6:l;this.watched.set(e,{texture:e,kind:r,width:i,height:n,layers:s,onePixel:i===1&&n===1&&s===1,madeAfterVerdict:this.verdicts>0,checks:0,first:null,group:null})}drop(e){this.watched.delete(e)}get size(){return this.watched.size}word(){let e=[];for(let[t,r]of this.programs)if(r.off)e.push(t);return{deleted:Array.from(this.deletedLabels.values(),(e)=>({...e})),untrue:e}}submitting(e){if(this.flight!==null||this.watched.size===0)return e;let t=this.clock();if(t-this.sentMs<ZB)return e;let r=this.checkCommands();if(r===null)return e;return this.sentMs=t,[...e,r]}submitted(){let e=this.flight,t=this.read?.resource??null;if(e===null||!e.owed)return;if(e.owed=!1,t===null){this.flight=null;return}wa0(this.device,t,0,iB*32).then(()=>{let r=new Uint32Array(t.getMappedRange(0,iB*32).slice(0));if(t.unmap(),this.flight===e)this.flight=null;this.checked(e,r)},()=>{if(this.flight===e)this.flight=null})}checkCommands(){this.answer??=this.standTexture(this.device,{label:"lume texture watch",size:[iB*2],format:"rgba32uint",usage:17},function(){return}),this.read??=this.standBuffer(this.device,{label:"lume texture watch read",size:iB*32,usage:9},function(){return});let e=this.answer.resource;if(!this.stood(e)||!this.stood(this.read.resource))return null;let t=this.nextMembers();if(t.length===0)return null;let r=this.device.createCommandEncoder({label:"lume texture watch"}),i=r.beginRenderPass({colorAttachments:[{view:e.createView(),loadOp:"clear",storeOp:"store"}]});for(let e=0;e<t.length;e+=1){let r=t[e],n=this.programs.get(r.kind.key);if(n?.pipeline===null||n===void 0)continue;r.group??=this.device.createBindGroup({label:"lume texture watch",layout:n.layout,entries:[{binding:0,resource:r.texture.createView({dimension:r.kind.view})}]}),i.setPipeline(n.pipeline),i.setBindGroup(0,r.group),i.setViewport(e*2,0,2,1,0,1),i.draw(3)}return i.end(),r.copyTextureToBuffer({texture:e},{buffer:this.read.resource},[iB*2]),this.flight={members:t,owed:!0},r.finish()}nextMembers(){return $c0P($c0C(119),RS5.prototype,"nextMembers").call(this)}programOf(e){let t=this.programs.get(e.key);if(t!==void 0)return t;let r=this.device.createBindGroupLayout({label:`lume texture watch ${e.key}`,entries:[{binding:0,visibility:2,texture:{sampleType:e.sample,viewDimension:e.view}}]}),i={pipeline:null,layout:r,off:!1};this.programs.set(e.key,i);let n=this.device.createShaderModule({label:`lume texture watch ${e.key}`,code:QS5(e)});return this.device.createRenderPipelineAsync({label:`lume texture watch ${e.key}`,layout:this.device.createPipelineLayout({bindGroupLayouts:[r]}),vertex:{module:n,entryPoint:"vs"},fragment:{module:n,entryPoint:"fs",targets:[{format:"rgba32uint"}]}}).then(function(e){i.pipeline=e}).catch((t)=>{i.off=!0,this.warn(`texture watch: the check of ${e.key} textures did not compile, so none is checked: ${k$w(t)}`)}),i}checked(e,t){for(let r=0;r<e.members.length;r+=1){let i=e.members[r];if(this.watched.get(i.texture)!==i)continue;let n=this.programs.get(i.kind.key);if(n===void 0||n.off)continue;let l=cS5(t,r*8,i,i.first);if(l===null)continue;if(i.checks+=1,i.first??=t.slice(r*8+4,r*8+8),!l.deleted)continue;if(i.checks===1&&i.madeAfterVerdict){n.off=!0,this.warn(`texture watch: "${i.texture.label}" (${i.kind.key}) read deleted at its first check after a texture was made again (${l.read}), so the check reads untrue for that kind on this device and stops`);continue}this.deleted(i,l.read)}}deleted(a,b){return $c0C(120).call(this,a,b)}}function FS5(e,t,r,i,n,l,s=(e)=>Fn.warn(`[lume] ${e}`)){let o=ayA(e);if(o.textureWatch!==null)return o.textureWatch;if(typeof Reflect.get(e,"createRenderPipelineAsync")!=="function")return null;return o.textureWatch=new RS5(e,t,r,i,n,l,s),o.textureWatch}function dvF(e){return ayA(e).textureWatch}var Kj=/Attachment state of \[RenderPipeline "([^"]+)"\] is not compatible with \[RenderPassEncoder "([^"]+)"\]/;function hj(e){let t=Kj.exec(e);if(t===null)return null;return{pipeline:t[1],pass:t[2]}}var Zj=new WeakMap,Hj=0;function Cj(a){return (Cj=$c0C(121)).call(this,a)}var Oj=new WeakMap;var G4Q=(function(e,t,r){let i=e.length;while(i>0&&(e[i-1]===null||e[i-1]===void 0))i-=1;let n="";for(let t=0;t<i;t+=1)n+=`${t>0?",":""}${e[t]??"-"}`;return`${n}/${t??"-"}/s${r}`});var sj=new Map;var Qj=(function(e,t){let r=[],i=t.fragment?.targets;if(i)for(let e of i)r.push(e?e.format:null);let n=t.depthStencil?.format,l=t.multisample?.count??1,s=G4Q(r,n,l);Oj.set(e,s);if(!sj.has(s)){ub(r,s,n,l);}});function UKu(e){return Oj.get(e)}function y0x(e,t){let r=Oj.get(e);return r===void 0||r!==t}var kPZ=(function(e){if(Hj===0)return;return Zj.get(MMU())?.get(e)});async function n81(e,t){let r=new Set;for(;;){let i=Hj;try{return await e()}catch(e){let n=t(e);if(n===null)throw e;let l=hj(n);if(l===null){if(Hj===i)throw e;continue}let s=`${l.pass}
${l.pipeline}`;if(r.has(s)||!(kPZ(l.pass)?.has(l.pipeline)===!0))throw e;r.add(s)}}}var wj=400,$j=new WeakMap,mj=[],qj=[],Sj=/^(?:scene|scene eye \d+|scene\.(?:surface|opaque|land)(?:[/.].*)?|scene\.light|composite|frustum-cull\/.*|present|present\.sharpen|look\.copy)$/,Gj=/^occlusion\./;function Fen(e,t){let r=$P0($j,e);for(let{name:e,message:i}of t.filter((e)=>!tj(e))){if(!r.includes(e)){let t=Yj(e);if(!r.some((e)=>Yj(e)===t))qj.push(t);r.push(e),Fn.warn(`[lume] the device refused the pass "${e}" again after a render-chain rebuild, so every frame leaves it out on this device: ${i.slice(0,wj)}`)}}return t.find(tj)}var tj=(e)=>Sj.test(e.name)||e.attachments.includes("lume canvas view");function U_x(e){$j.delete(e)}function Hom(e){return $j.get(e)??mj}function qp$(e){return Hom(e).find((e)=>Gj.test(e))??null}var Yj=(e)=>e.replace(/^scene[./ ]|[./ ].*/g,"");function Ncy(){return qj.splice(0)}var aC="lume/indirect-pass-head",wC,EC="lume.indirectPassHead",NC=globalThis,jC=NC[EC]??={device:null,heads:new Map,module:null,layout:null,drawn:0};var sPu=(function(e,t){if(t&&jC.device===e)return;if(!t&&jC.device!==e)return;jC.device=t?e:null,jC.heads=new Map,jC.module=null,jC.layout=null,jC.drawn=0});function G7N(){return jC.device!==null}function hfl(){return jC.drawn}function oCN(){jC.drawn+=1}function UfN(a){return $c0C(123).call(this,a)}function XPu(a,b){return (XPu=$c0C(124)).call(this,a,b)}function apE(e){return e.instanceRateVertexFetch?"vertex":"storage"}var hKS={float32:1,float32x2:2,float32x3:3,float32x4:4},Tf={float32:"f32",float32x2:"vec2<f32>",float32x3:"vec3<f32>",float32x4:"vec4<f32>"};function bgw(e){let{structName:t,fnName:r,bufferName:i,attributes:n,arrayStride:l,baseElementExpr:s}=e;if(l%4!==0)throw Error(`lume pulled attributes: ${t} arrayStride ${l} is not a multiple of 4 (the arena is array<f32>)`);let o=l/4,a=[],u=[];for(let e of n){if(e.offset%4!==0)throw Error(`lume pulled attributes: ${t}.${e.name} offset ${e.offset} is not a multiple of 4`);let r=hKS[e.format],n=e.offset/4;if(n+r>o)throw Error(`lume pulled attributes: ${t}.${e.name} runs past the ${l}-byte stride`);a.push(`  ${e.name}: ${Tf[e.format]},`);let s=Array.from({length:r},(e,t)=>`${i}[base + ${n+t}u]`);u.push(`  out.${e.name} = ${r===1?s[0]:`${Tf[e.format]}(${s.join(", ")})`};`)}return[`struct ${t} {`,...a,"}","",`fn ${r}(vertexIndex: u32) -> ${t} {`,`  let base = (${s}) * ${o}u;`,`  var out: ${t};`,...u,"  return out;","}"].join(`
`)}var Of="lume.survivorsPulled",Lf=globalThis,Jf=Lf[Of]??={state:{pulled:!1}};var GWN=(function(e){Jf.state.pulled=e});var a3g=(function(e){return(!e.instanceRateVertexFetch||Jf.state.pulled)&&e.indirectFirstInstance?"storage":"vertex"});function do1(e){return{arrayStride:4,stepMode:"instance",attributes:[{format:"uint32",offset:0,shaderLocation:e}]}}function tr1(e){return{binding:e,visibility:1,buffer:{type:"read-only-storage"}}}function y$A(e,t,r){return e==="storage"?`@group(${t}) @binding(${r}) var<storage, read> lume_survivors: array<u32>;`:""}var Yf="lumeSurvivorInstance";function hUf(e,t){return e==="storage"?`@builtin(instance_index) ${Yf}: u32`:vb(t)}function iXh(e,t="",r="survivorSlot"){return`${e==="storage"?`  let ${r} = lume_survivors[${t}${Yf}];`:`  let ${r} = ${t}lumeSurvivorAttr;`}
  let lumeSurvivorCulled = ${r} == ${knN}u;`}var wkn="vec4<f32>(2.0, 2.0, 2.0, 1.0)";function clD(e){if(e==="position"){return wb();}return`  if (lumeSurvivorCulled) {
    var lumeCulledOut: ${e.struct};
    lumeCulledOut.${e.position??"position"} = ${wkn};
    return lumeCulledOut;
  }`}var OWU=(function(e){return e==="storage"?"/spull":""});var Pf=new WeakMap;function sbg(e,t){let r=Pf.get(e);if(r&&r.capacity>=t)return r.buffer;let i=Math.max(64,r?.capacity??0);while(i<t)i*=2;let n=x3$(()=>e.createBuffer({label:"lume identity survivors",size:i*4,usage:168})),l=new Uint32Array(i);for(let e=0;e<i;e++)l[e]=e;return xb(e,n,l,i);}var HD="fragment/",_CF=2048,nTS=2048,LD=8,tv6="r8unorm",sD=_CF*nTS,DD="lume.fragmentKernels",rD=globalThis,tD=rD[DD]??={state:{stands:!1,made:!1}};function F4a(e,t){tD.state.stands=!t&&frM(e,"maxStorageBuffers","fragment",0).limit>=LD}function U9$(){return tD.state.stands}var msj=(function(){return tD.state.made});var wsx=(function(){return tD.state.stands?6:4});var bcQ=(function(e){return"fragmentKernel"in e});var gD=new WeakMap;function ZD(e,t){let r=gD.get(e);if(r===void 0)r={fragmentKernel:!0,pipeline:e,threads:t.threads,groups:t.groups,label:e.label},gD.set(e,r),tD.state.made=!0;return r}var fD={workgroup_id:"spawn_kernel_workgroup",local_invocation_index:"spawn_kernel_lane",local_invocation_id:"spawn_kernel_local",global_invocation_id:"spawn_kernel_workgroup * spawn_kernel_size + spawn_kernel_local",num_workgroups:"spawn_kernel_grid"},GD=/((?:@[A-Za-z_]\w*\s*(?:\([^()]*\))?\s*)+)fn\s+([A-Za-z_]\w*)\s*\(/g,RD=/\b(?:workgroupBarrier|storageBarrier|textureBarrier)\s*\(\s*\)\s*;/g,oD=/\b(?:workgroupBarrier|storageBarrier|textureBarrier)\s*\(/;function D4a(a,b){return (D4a=$c0C(125)).call(this,a,b)}function P4a(e,t="main"){let r=null;GD.lastIndex=0;for(let i=GD.exec(e);i!==null;i=GD.exec(e))if(i[2]===t&&/@compute\b/.test(i[1])){r=i;break}if(r===null)throw Error(`lume: no compute entry '${t}' in the kernel's text`);let[i,n,l]=D4a(r[1],t);let s=i*n*l;let o=r.index+r[0].length-1;let a=P3B(e,o);if(a<0)throw Error("lume: a kernel's entry has no closing parenthesis");let u=eMf(e.slice(o+1,a)),d=[],f=[];for(let e of u){let r=/^@builtin\s*\(\s*(\w+)\s*\)\s*([A-Za-z_]\w*)\s*:\s*(.+)$/s.exec(e);if(r===null)throw Error(`lume: compute entry '${t}' takes '${e}', which is no builtin a fragment form can give`);let i=fD[r[1]];if(i===void 0)throw Error(`lume: compute entry '${t}' reads the builtin '${r[1]}', which a fragment form cannot give`);d.push(`${r[2]}: ${r[3].trim()}`),f.push(i)}let c=`${e.slice(0,r.index)}fn spawn_kernel_main(${d.join(", ")}) ${e.slice(a+1).replace(/^\s*(->[^{]*)?/,"")}`;if((/\bvar\s*<\s*workgroup\s*>/.test(c)||oD.test(c))&&s>1)throw Error(`lume: compute entry '${t}' shares workgroup memory across ${s} threads, so it has no fragment form`);if(/\bworkgroupUniformLoad\b/.test(c))throw Error(`lume: compute entry '${t}' calls workgroupUniformLoad, which a fragment form does not give`);c=c.replace(/\bvar\s*<\s*workgroup\s*>/g,"var<private>").replace(RD,"");let h=`${c}
struct SpawnKernelVarying {
  @builtin(position) position: vec4<f32>,
  @location(0) @interpolate(flat) grid: vec2<u32>,
}

@vertex
fn spawn_kernel_vertex(@builtin(vertex_index) spawn_kernel_vertex_index: u32, @builtin(instance_index) spawn_kernel_instance: u32) -> SpawnKernelVarying {
  let spawn_kernel_corner = spawn_kernel_vertex_index % 3u;
  var spawn_kernel_out: SpawnKernelVarying;
  spawn_kernel_out.position = vec4<f32>(select(-1.0, 3.0, spawn_kernel_corner == 1u), select(-1.0, 3.0, spawn_kernel_corner == 2u), 0.0, 1.0);
  spawn_kernel_out.grid = vec2<u32>(spawn_kernel_vertex_index / 3u, spawn_kernel_instance);
  return spawn_kernel_out;
}

@fragment
fn spawn_kernel_fragment(spawn_kernel_in: SpawnKernelVarying) {
  let spawn_kernel_pixel = vec2<u32>(spawn_kernel_in.position.xy);
  let spawn_kernel_slab = spawn_kernel_in.grid.x >> 16u;
  let spawn_kernel_gx = spawn_kernel_in.grid.x & 0xffffu;
  let spawn_kernel_gy = spawn_kernel_in.grid.y & 0xffffu;
  let spawn_kernel_gz = spawn_kernel_in.grid.y >> 16u;
  let spawn_kernel_t = (spawn_kernel_slab * ${nTS}u + spawn_kernel_pixel.y) * ${_CF}u + spawn_kernel_pixel.x;
  let spawn_kernel_wg = spawn_kernel_t / ${s}u;
  if (spawn_kernel_wg >= spawn_kernel_gx * spawn_kernel_gy * spawn_kernel_gz) { return; }
  let spawn_kernel_lane = spawn_kernel_t - spawn_kernel_wg * ${s}u;
  let spawn_kernel_grid = vec3<u32>(spawn_kernel_gx, spawn_kernel_gy, spawn_kernel_gz);
  let spawn_kernel_workgroup = vec3<u32>(spawn_kernel_wg % spawn_kernel_gx, (spawn_kernel_wg / spawn_kernel_gx) % spawn_kernel_gy, spawn_kernel_wg / (spawn_kernel_gx * spawn_kernel_gy));
  let spawn_kernel_size = vec3<u32>(${i}u, ${n}u, ${l}u);
  let spawn_kernel_local = vec3<u32>(spawn_kernel_lane % ${i}u, (spawn_kernel_lane / ${i}u) % ${n}u, spawn_kernel_lane / ${i*n}u);
  spawn_kernel_main(${f.join(", ")});
}
`,p=0;for(let e of c.matchAll(/@group\s*\(\s*(\d+)\s*\)/g))p=Math.max(p,Number(e[1])+1);return{code:h,threads:s,groups:p}}function dCp(a,b,c,d,e,f,g,h){return $c0C(126).call(this,a,b,c,d,e,f,g,h)}var Bu2=(function(e=Reflect.get(globalThis,"name")){return new URLSearchParams(RE5(typeof e==="string"?e:null))});var zc="cellField",Mc="lume.cellFieldDial",_c=globalThis,Uc=_c[Mc]??={on:void 0};function vsa(){if(Uc.on!==void 0)return Uc.on;return Uc.on=(Bu2().get(zc)??kCv().get(zc))==="on",Uc.on}var Zc=new WeakSet,r5R=(e)=>Zc.has(e);function fPd(e,t){if(t)Zc.add(e);else Zc.delete(e)}var oSg=(e)=>e.lightOnce===!0&&e.cullSlot===void 0&&e.motionFrameId!==void 0;var a1=(function(e,t,r,i,n,l,s){if(s!==void 0)return e.call(t,r,i,n,l,s);if(l!==void 0)return e.call(t,r,i,n,l);if(n!==void 0)return e.call(t,r,i,n);if(i!==void 0)return e.call(t,r,i);if(r!==void 0)return e.call(t,r);return e.call(t)});var O9=4096;var A9=0;var K9=1;var S9=2;var m9=3;var C9=4;var X9=5;var v9=6;var r9=7;var H9=1;var u9=4;var k9=8;var P9=512;var b9=(e,t)=>typeof e==="number"?e:t;var T9=(e)=>uLW(e)&&typeof Reflect.get(e,"mapAsync")==="function";var z9=function(e){if(e==="drawIndexedIndirect")return 5;return e==="drawIndirect"?4:3};var q9=function(e,t,r){if(e instanceof Uint32Array)return typeof t==="number"&&typeof r==="number"?Array.from(e.subarray(t,t+r)):Array.from(e);if(!Array.isArray(e))return null;return e.map((e)=>b9(e,0))};var x9=function(a,b,c,d,e){return (x9=$c0C(127)).apply(this,arguments)};var h9=function(a,b,c,d){return (h9=$c0C(128)).call(this,a,b,c,d)};var V9=function(a,b){return (V9=$c0C(129)).call(this,a,b)};var Q9=function(a,b){return (Q9=$c0C(130)).call(this,a,b)};var j9r=(function(e){let t=new WeakMap;return{recorderOf(r,i){let n=t.get(r);if(n===void 0){n=i?Q9(e,r):V9(e,r);t.set(r,n);}return n}}});var l9=function(a,b,c){return (l9=$c0C(131)).call(this,a,b,c)};var o9=function(a,b,c){return (o9=$c0C(132)).call(this,a,b,c)};var I9=function(e){e.querySet?.destroy(),e.resolve?.destroy(),e.queries?.destroy(),e.args?.destroy()};var L9=function(a){return $c0C(133).call(this,a)};var p9=7;function s1P(e,t,r,i){let n=i??(e<0?-1:e-r);if(n<0)return-1;if(n>4294967295)return Math.floor(n/(t==="uint16"?2:4));return t==="uint16"?n>>>1:n>>>2}function Lww(e){if(e==="unorm10-10-10-2"||e==="unorm8x4-bgra")return 4;let t=1;if(e.includes("32"))t=4;else if(e.includes("16"))t=2;let r=e.lastIndexOf("x"),i=r>=0&&r+1<e.length?e.charCodeAt(r+1)-48:-1;return t*(i>=1&&i<=4?i:1)}var U9={instance:[],stride:[],last:[]};var Xww=(function(e){if(e===null||e===void 0)return U9;return yb(e);});function uLE(e,t,r){if(r!==void 0)return r;return e<0?-1:e-t}var fqc=(function(e,t,r,i,n,l,s){let o=e.last;for(let a=0;a<o.length;a+=1){let u=o[a];if(u<0)continue;let d=e.instance[a];if(s&&!d)continue;let f=d?l+i:n+r;if(f<=0)continue;let c=t[a]??-1;if(c<0)continue;if((f-1)*e.stride[a]+u>c)return a}return-1});function hqN(e,t,r,i,n,l,s){let o=e.instance[t];return`(slot ${t}, first ${o?s:l}, count ${o?n:i}, stride ${e.stride[t]}, last ${e.last[t]}; ${r} B bound)`}var WEa=(function(e){return e?20:16});var J9=3600,d9=25,_9=new WeakMap,UAM={epoch:0},Oje=((e)=>_9.get(e)),c9=function(){},g9=Object.freeze({}),w9=((e)=>({methods:e,names:Object.keys(e)})),Y9=(function(e){let t=e!==null&&typeof e==="object"?Reflect.get(e,"label"):void 0;return typeof t==="string"&&t!==""?t:"(unlabeled)"}),i9=(function(e,t){if(e===null||typeof e!=="object")return null;let r=Reflect.get(e,t);return r!==null&&typeof r==="object"?r:null}),a9=new WeakMap,N9=Object.prototype.hasOwnProperty;var f9=(function(e,t,r){let i=Object.getPrototypeOf(e),n=i!==null&&i!==Object.prototype?i:null,l=n!==null&&r.has(n),s=e,o=n!==null?a9.get(n):void 0,a=null,u=!1,d=t.names,f=t.methods;for(let t=0;t<d.length;t+=1){let r=d[t];if(l&&!N9.call(e,r))continue;let i=s[r];if(typeof i!=="function")continue;if(N9.call(e,r)||n===null){(a??=o!==void 0?{...o}:{})[r]=i,s[r]=f[r];continue}if(l)continue;if(o===void 0)o={},a9.set(n,o);if(o[r]===void 0)o[r]=i;if(a!==null)a[r]=o[r];n[r]=f[r],u=!0}if(u)r.add(n);return a??o??{}});function zww(e={}){let t=Symbol("lume.lease.tracked");let r=Symbol("lume.lease.dead");let i=Symbol("lume.lease.texture");let n=Symbol("lume.lease.resources");let l=Symbol("lume.lease.deadResource");let s=Symbol("lume.lease.checked");let o=Symbol("lume.lease.named");let a=Symbol("lume.lease.textureOrig");let u=Symbol("lume.lease.bytes");let d=Symbol("lume.lease.steps");let f=Symbol("lume.lease.tally");let c=Symbol("lume.lease.sets");let h=Symbol("lume.lease.heard");let p=Symbol("lume.lease.shadowMap");let m=Symbol("lume.lease.tape");let g=Symbol("lume.lease.viewTurn");let y=Symbol("lume.lease.groupTurn");let v=Symbol("lume.lease.retireWatch");let w=Symbol("lume.lease.used");let b=Symbol("lume.lease.copied");let k=(e)=>e;let x=e.throwOnDeadBind===!0;let M=e.report??((e)=>Fn.warn(e));let S=e.finishing??c9;let I=(e)=>k(e)[t]===!0;let R=(e)=>k(e)[u]??-1;let A=(e)=>k(e)[i];let z=!1;let O={any:!1,mark:r};let T=[];let C=!1;let N=function(){C=!1;let t=T;T=[];for(let e of t){{let e$26=e.resource;{let e=e$26;k(e)[r]=!0}}}if(t.length>0){UAM.epoch+=1,z=!0,O.any=!0;let r=function(){for(let e of t)e.destroy(),e.released?.()};if(e.retirementDone)e.retirementDone().then(r);else r()}for(let e of t){let t=k(e.resource)[v];if(t===void 0)continue;for(let e of t){{let e$25=e;{let e=e$25;for(let t of e.resources)k(t)[v]?.delete(e)}}e.release();}k(e.resource)[v]=void 0}};let j=function(e,t,r){if(T.push({resource:e,destroy:t,released:r}),C)return;C=!0,queueMicrotask(N)};let P=(e)=>z&&k(e)[r]===!0;let E=function(e){if(!z)return null;let t=k(e),r=t[l];if(r!==void 0)return r;if(t[s]===void 0||t[s]===UAM.epoch)return null;return F(t)};let F=function(e){e[s]=UAM.epoch;let t=e[n];if(t===void 0)return null;for(let i=0;i<t.length;i+=1){let n=t[i];if(k(n)[r]!==!0)continue;return e[l]=n,n}return null};let B=function(e,t,r){let i=k(e);if(i[n]=t,r===UAM.epoch||!z)i[s]=UAM.epoch;else F(i)};let _=0;let q=0;let L=0;let D=function(e){if(e!==null&&typeof e==="object")k(e)[w]=_};let V=function(e){if(e!==null)k(e)[b]=_};let H=function(e){let t=k(e);if(t[w]===_)return;t[w]=_;let r=t[n];if(r===void 0)return;for(let e=0;e<r.length;e+=1)k(r[e])[w]=_};let U=function(a){return (U=$c0C(134)(D,A)).call(this,a)};let K=e.turnViews??null;let Y=0;let G=0;let X=0;let J=function(){return G+=1,(Math.imul(G,2654435761)>>>21)%(J9>>1)};let Q=function(e,t){if(e.serial===t)return;if(e.serial=t,e.uses+=1,e.uses<=J9||P(e.texture))return;let r=e.createView.call(e.texture,e.descriptor);if(r===null||typeof r!=="object")return;if(e.native=r,e.uses=1,e.gen+=1,X+=1,X<d9)return;X=0,K?.askCollector()};let et=function(e,t){let r=e.entries.slice(),i=e.at,n=e.views;for(let t=0;t<n.length;t+=1){let l=r[i[t]];r[i[t]]={binding:l.binding,resource:n[t].native},e.gens[t]=n[t].gen}e.native=t({label:e.label,layout:e.layout,entries:r})};let tt=function(e,t){let r=k(e)[y];if(r===void 0||K===null)return e;if(r.serial===t)return r.native;r.serial=t;let{views:i,gens:n}=r,l=!1;for(let e=0;e<i.length;e+=1)if(Q(i[e],t),n[e]!==i[e].gen)l=!0;if(l){et(r,K.createBindGroup);}return r.native};let rt=[];let it=[];let nt=[];let lt=0;let st=function(e,t,r){if(e===null||typeof e!=="object")return;let i=i9(e,t),n=i===null?void 0:k(i)[g];if(i===null||n===void 0)return;if(Q(n,r),n.native===i||!Reflect.set(e,t,n.native))return;rt[lt]=e,it[lt]=t,nt[lt]=i,lt+=1};let ot=function(e,t){let r=Reflect.get(e,"colorAttachments");if(Array.isArray(r))for(let e=0;e<r.length;e+=1)st(r[e],"view",t),st(r[e],"resolveTarget",t);st(i9(e,"depthStencilAttachment"),"view",t)};let at=function(){for(let e=0;e<lt;e+=1){let t=rt[e];if(t!==null)Reflect.set(t,it[e],nt[e]);rt[e]=null,nt[e]=null}lt=0};let ut=new Map;let dt=0;let ft=null;let ct=0;let ht=function(e,t,r,i){dt+=1;let n=Y9(r),l=`${e}|${t}|${n}|${i}`,s=ut.get(l);if(s!==void 0){s.count+=1;return}let o={pass:e,holder:t,resource:n,kind:i,count:1};ut.set(l,o);let a=`[lume] resource lease: "${e}" ${i} "${t}" names destroyed "${n}" \u2014 not encoded (a cache kept the handle past its destroy; re-key it on what it names)`;if(M(a,o),x)throw Error(a)};let pt=function(e,t,r,i,n){dt+=1;let l=Y9(r),s=`${e}|${t}|${l}|${i}`,o=ut.get(s);if(o!==void 0){o.count+=1;return}let a={pass:e,holder:t,resource:l,kind:i,count:1};ut.set(s,a),M(`[lume] resource lease: "${e}" ${t} ${n} runs past "${l}" (${R(r)} B) \u2014 not encoded, so the frame stands (the draw named a range before its buffer grew to hold it)`,a)};let gt=function(e,t,r,i,n,l,s,o){let a=fqc(r,e.vertexBytes,i,n,l,s,o);if(a<0)return!1;let u=e.vertexBound[a]??null;if(u===null)return!1;return pt(e.pass,t,u,r.instance[a]?"instance-range":"vertex-range",hqN(r,a,e.vertexBytes[a],i,n,l,s)),!0};let yt=(e,t)=>typeof e==="number"?e:t;let vt=function(e,t,r,i,n){if(!nr(r))return!1;let l=typeof i==="number"?i:0,s=R(r);if(s<0||l+WEa(n)<=s)return!1;return pt(e.pass,t,r,"indirect-range",`(args at ${l})`),!0};let wt=[];let bt=0;let kt=function(e,t,r,i){if(bt>0){bt-=1;let n=wt[bt];n.pass=e;let l=n.bind;for(let e=0;e<l.length;e+=1)l[e]=null;let s=n.vertex;for(let e=0;e<s.length;e+=1)s[e]=null;n.index=null,n.indexBound=null,n.indexSlots=-1,n.indexFormat="uint32",n.steps=null;let o=n.vertexBound;for(let e=0;e<o.length;e+=1)o[e]=null;let a=n.vertexBytes;for(let e=0;e<a.length;e+=1)a[e]=-1;return n.poisoned=0,n.recording=r,n.namedCount=0,n.setCount=0,n.orig=t,n.draws=0,n.instances=0,n.indirectDraws=0,n.dispatches=0,n.workgroups=0,n.indirectDispatches=0,n.shadowDraws=0,n.shadowTarget=!1,n.log=null,n.rec=null,n.work=null,n.serial=i,n.epoch=UAM.epoch,n}return ({pass:e,bind:[],vertex:[],index:null,indexBound:null,indexSlots:-1,indexFormat:"uint32",steps:null,vertexBound:[],vertexBytes:[],poisoned:0,recording:r,named:[],namedCount:0,sets:[],setCount:0,names:null,orig:t,serial:i,epoch:UAM.epoch,draws:0,instances:0,indirectDraws:0,dispatches:0,workgroups:0,indirectDispatches:0,shadowDraws:0,shadowTarget:!1,log:null,rec:null,work:null});};let xt=[];let Mt=function(e){e.count=0,xt.push(e)};let St=!1;let It=function(e,t,r){if(!St)return;let i=e.log??=xt.pop()??{labels:[],draws:[],count:0};i.labels[i.count]=t,i.draws[i.count]=r,i.count+=1};let Rt=new Map;let At=new Map;let $t=function(e,t){if(t&&St)for(let t=0;t<e.count;t+=1)Rt.set(e.labels[t],(Rt.get(e.labels[t])??0)+e.draws[t]);Mt(e)};let zt=function(e,t){e.draws+=t.draws,e.instances+=t.instances,e.indirectDraws+=t.indirectDraws,e.dispatches+=t.dispatches,e.workgroups+=t.workgroups,e.indirectDispatches+=t.indirectDispatches,e.shadowDraws+=t.shadowDraws};let Ot=function(e,t){let r=k(t)[f];if(r===void 0)return;e.draws-=r.draws,e.instances-=r.instances,e.indirectDraws-=r.indirectDraws};let Tt={draws:0,instances:0,indirectDraws:0,dispatches:0,workgroups:0,indirectDispatches:0,shadowDraws:0};let Ct=!1;let jt=function(e){if(!Ct)return!1;let t=i9(e,"depthStencilAttachment");if(t!==null){{let e$27=i9(t,"view");{let e=e$27;if(e===null)return!1;let t=A(e);return t!==void 0&&k(t)[p]===!0}}}let r=i9(e,"colorAttachments");if(!Array.isArray(r)||r.length===0)return!1;{let e=i9(r[0],"view");if(e===null)return!1;let t=A(e);return t!==void 0&&k(t)[p]===!0}};let Pt=[];let Et=[];let Ft=[];let Wt=0;let Bt=null;let _t=null;let qt=!1;let Lt=function(e){for(let t=Wt-1;t>=0;t-=1)if(Pt[t]===e)return t;return-1};let Dt=function(e){if(e===Bt)return _t;let t=Lt(e);if(t<0)return null;return Bt=e,_t=Ft[t],_t};let Vt=function(e,t,r){let i=Dt(e);if(i===null||_!==0)return null;let n=i.orig;return typeof n[t]==="function"&&typeof n[r]==="function"?n:null};let Ut=function(e){if(Pt[e]===Bt)Bt=null,_t=null;for(let t=e+1;t<Wt;t+=1)Pt[t-1]=Pt[t],Et[t-1]=Et[t],Ft[t-1]=Ft[t];Wt-=1,Pt[Wt]=null,Et[Wt]=null,Ft[Wt]=null};let Kt=function(){qt=!1;for(let e=0;e<Wt;e+=1)Pt[e]=null,Et[e]=null,Ft[e]=null;Wt=0,Bt=null,_t=null};let Yt=function(e,t){let r=Lt(e);if(r>=0&&Ft[r]===t)Ut(r);let i=t.named;for(let e=0;e<t.namedCount;e+=1)i[e]=g9;t.namedCount=0;if(t.log!==null){Mt(t.log);t.log=null;}t.rec=null,t.work=null,wt[bt]=t,bt+=1};let Gt=function(e,t){for(let t=Wt-1;t>=0;t-=1)if(Et[t]===e)Ut(t);if(Yt(e,t),Wt>0&&!qt)qt=!0,queueMicrotask(Kt)};let Xt=function(e){let t=Dt(e);if(t!==null)return t;let r=a9.get(Object.getPrototypeOf(e));if(r===void 0)throw Error("lume resource lease: an encoder call reached a wrapper with no state");let i=kt(Y9(e),r,!1,(Y+=1));{let t$21=null,r$11=i;{let t=t$21,r=r$11;let i=Lt(e),n=i>=0?i:Wt;if(Pt[n]=e,Et[n]=t,Ft[n]=r,i<0)Wt+=1;Bt=e,_t=r}}return i};let Jt=function(e,t){if(!e.recording)return;let r=e.named,i=k(t),l=i[n],s=e.serial;if(l===void 0||i[o]===s)return;i[o]=s;Ab(l,k,o,s,r,e);};let Qt=function(e,t){if(!e.recording||t===null||typeof t!=="object"||!I(t))return;let r=k(t);if(r[o]===e.serial)return;r[o]=e.serial,e.named[e.namedCount]=t,e.namedCount+=1};let tr=function(e,t){if(k(t)[h]===ct)return;let r=e.sets;for(let i=0;i<e.setCount;i+=1)if(r[i]===t)return;r[e.setCount]=t,e.setCount+=1};let ir=(e)=>({group:(t)=>Jt(e,t),buffer:(t)=>Qt(e,t)});let nr=(e)=>e!==null&&typeof e==="object";let lr=function(e,t){if(!nr(t))return;let r=k(t),i=r[f];if(i!==void 0)zt(e,i);let n=r[c];if(n!==void 0){for(let e=0;e<n.length;e+=1){er:{let e$29=n[e];{let e=e$29;if(ft===null)break er;let t=k(e);if(t[h]!==ct)t[h]=ct;ft(e)}}}}};let sr=e.listens===!0;let or=null;let ar=null;let ur=j9r({recOf:(e)=>Dt(e)?.rec??null,tapeOf:(e)=>k(e)[m],bundleDraws:function(e){let t=k(e)[f];return t===void 0?0:t.draws+t.indirectDraws}});let dr=function(a){return (dr=$c0C(135)(nr,A)).call(this,a)};let fr=function(e,t){let r={passes:e.reads.map((e)=>e.pass),tally:{...t},unread:0};Promise.all(e.reads.map(L9)).then(function(t){r.unread=t.filter((e)=>!e).length,e.settle(r)})};let cr=function(t){let r=e.device;if(ar===null||r===void 0||!nr(t)||Bb(t))return null;return Db(r);};let hr=(e,t,r,i)=>ar===null?null:({label:e,compute:!1,shadow:r,sampleCount:dr(t),draws:[],queried:i!==null,overflow:0});let pr=function(e,t){if(t&&ar!==null)ar.reads.push(...e);else {for(let t of e){I9(t)}}};let mr=function(e,t,r){e.rec=({pass:r,tape:(r===null?[]:null),querySet:null,queries:0,pipeline:null,groups:[],vertex:[],vertexOffsets:[],index:null,indexOffset:0,indexFormat:"uint32"});e.orig=ur.recorderOf(e.orig,t)};function gr(e,t,r,i,n){let l=Xt(this),s=nr(t)?E(t):null;{let e$28=l,t$22=l.bind,r$12=e,i$5=s;{let e=e$28,t=t$22,r=r$12,i=i$5;if((t[r]??null)!==null)e.poisoned-=1;if(t[r]=i,i!==null)e.poisoned+=1}}if(s!==null){ht(l.pass,Y9(t),s,"bind-group");return}if(nr(t)){if(Jt(l,t),_!==0)H(t)}return a1(l.orig.setBindGroup,this,e,K!==null&&nr(t)?tt(t,l.serial):t,r,i,n)}function yr(e){let t=Xt(this);t.steps=nr(e)?k(e)[d]??null:null;if(nr(e)){if(t.recording){tr(t,e);}else {er$:{if(ft===null)break er$;let t=k(e);if(t[h]!==ct)t[h]=ct;ft(e)}}}return a1(t.orig.setPipeline,this,e)}function br(){let t=Xt(this),r=t.orig.end.call(this),i=Lt(this),n=i>=0?Et[i]:null,l=n===null?null:Dt(n);if(t.shadowTarget)t.shadowDraws=t.draws+t.indirectDraws;if(t.rec!==null&&n!==null&&l!==null&&e.device!==void 0){Fb(t,n,e,l);}if(l!==null){zt(l,t);let e=t.draws+t.indirectDraws;if(e>0){It(l,t.pass,e)}}return Yt(this,t),r}let kr=(e,t)=>function(r,i){let n=Xt(this);if(nr(r)&&P(r)){ht(n.pass,e,r,"indirect");return}if(n.poisoned>0){dt+=1;return}if(vt(n,e,r,i,t))return;if(Qt(n,r),_!==0)D(r);return n.indirectDraws+=1,a1(n.orig[e],this,r,i)};let xr={setBindGroup:gr,setPipeline:yr,setVertexBuffer(e,t,r,i){let n=Xt(this),l=e,s=nr(t)&&P(t)?t:null;{let e=n,t=n.vertex,r=l,i=s;if((t[r]??null)!==null)e.poisoned-=1;if(t[r]=i,i!==null)e.poisoned+=1}if(s!==null){ht(n.pass,"setVertexBuffer",s,"vertex");return}let o=nr(t)?t:null;if(_!==0)D(o);if(o!==n.vertexBound[l])Qt(n,o);return n.vertexBound[l]=o,n.vertexBytes[l]=o===null?-1:uLE(R(o),yt(r,0),typeof i==="number"?i:void 0),a1(n.orig.setVertexBuffer,this,e,t,r,i)},setIndexBuffer(e,t,r,i){let n=Xt(this),l=nr(e)&&P(e)?e:null;if(n.index!==null)n.poisoned-=1;if(n.index=l,l!==null){n.poisoned+=1,ht(n.pass,"setIndexBuffer",l,"index");return}let s=t==="uint16"?"uint16":"uint32",o=nr(e)?e:null;if(_!==0)D(o);if(o!==n.indexBound)Qt(n,o);return n.indexBound=o,n.indexFormat=s,n.indexSlots=n.indexBound===null?-1:s1P(R(n.indexBound),s,typeof r==="number"?r:0,typeof i==="number"?i:void 0),a1(n.orig.setIndexBuffer,this,e,t,r,i)},draw(e,t,r,i){let n=Xt(this);if(n.poisoned>0){dt+=1;return}let l=n.steps;if(l!==null&&gt(n,"draw",l,yt(e,0),yt(t,1),yt(r,0),yt(i,0),!1))return;return n.draws+=1,n.instances+=yt(t,1),a1(n.orig.draw,this,e,t,r,i)},drawIndexed(e,t,r,i,n){let l=Xt(this);if(l.poisoned>0){dt+=1;return}let s=typeof e==="number"?e:0,o=typeof r==="number"?r:0;if(l.indexSlots>=0&&o+s>l.indexSlots&&l.indexBound!==null){{pt(l.pass,"drawIndexed",l.indexBound,"index-range",(`(first ${o}, count ${s}, ${l.indexFormat}; ${l.indexSlots} bound)`));
}return}let a=l.steps;if(a!==null&&gt(l,"drawIndexed",a,0,yt(t,1),0,yt(n,0),!0))return;return l.draws+=1,l.instances+=yt(t,1),a1(l.orig.drawIndexed,this,e,t,r,i,n)},drawIndirect:kr("drawIndirect",!1),drawIndexedIndirect:kr("drawIndexedIndirect",!0),executeBundles(e){let t=Xt(this);if(Array.isArray(e)){for(let r=0;r<e.length;r+=1){let i=e[r];lr(t,i);if(_!==0&&nr(i))H(i)}}if(!z)return t.orig.executeBundles.call(this,e);let r=!1;if(Array.isArray(e))for(let t=0;t<e.length&&!r;t+=1)r=E(e[t])!==null;else for(let t of e)if(E(t)!==null){r=!0;break}if(!r)return t.orig.executeBundles.call(this,e);let i=[];for(let r of e){let n=E(r);if(n!==null){if(Array.isArray(e)){Ot(t,r);}ht(t.pass,Y9(r),n,"bundle");continue}i.push(r)}if(i.length===0)return;return t.orig.executeBundles.call(this,i)},end:br};let Mr={setBindGroup:gr,setPipeline:yr,dispatchWorkgroups(e,t,r){let i=Xt(this);if(i.poisoned>0){dt+=1;return}return i.dispatches+=1,i.workgroups+=yt(e,0)*yt(t,1)*yt(r,1),a1(i.orig.dispatchWorkgroups,this,e,t,r)},dispatchWorkgroupsIndirect(e,t){let r=Xt(this);if(nr(e)&&P(e)){ht(r.pass,"dispatchWorkgroupsIndirect",e,"dispatch");return}if(r.poisoned>0){dt+=1;return}if(_!==0)D(e);return r.indirectDispatches+=1,a1(r.orig.dispatchWorkgroupsIndirect,this,e,t)},end:br};let Sr=w9(xr);let Ir=w9(Mr);let Ar=new WeakSet;let $r=function(e,t,r,i,n,l,s=null){let o=f9(e,i,Ar),a=kt(r,o,n,l);if(s!==null||n&&sr){mr(a,i===Ir,s);}{let r=a;let i=Lt(e),n=i>=0?i:Wt;if(Pt[n]=e,Et[n]=t,Ft[n]=r,i<0)Wt+=1;Bt=e,_t=r}return a};let zr=[];let Or=[];let Tr=[];let Cr=[];let Nr=[];let jr=0;let Pr=function(e,t){let r=e!==null&&typeof e==="object"?Reflect.get(e,"label"):void 0;return typeof r==="string"&&r!==""?r:t};let Er=function(e,t,r){if(r===null||!P(r))return!1;return ht(e.pass,t,r,"copy"),!0};let Fr=(e)=>e!==null&&typeof e==="object"?e:null;let Wr=function(e,t,r,i,n){let l=i;if(e.at===0)l=t;else if(e.at===1)l=r;else if(e.at===3)l=n;else if(e.at===-1)l=typeof r==="object"&&r!==null?r:i;return e.key===""?Fr(l):i9(l,e.key)};let _r=(e,t,r)=>function(i,n,l,s,o){let a=Xt(this);if(z&&(Er(a,e,Wr(t,i,n,l,s))||r!==null&&Er(a,e,Wr(r,i,n,l,s))))return;if(_!==0){V(Wr(t,i,n,l,s));if(r!==null){V(Wr(r,i,n,l,s))}}return a1(a.orig[e],this,i,n,l,s,o)};let Dr={beginRenderPass(e){let t=Xt(this),r=Pr(e,t.pass);if(z&&e!==null&&typeof e==="object"){let t=Reflect.get(e,"colorAttachments");if(Array.isArray(t))for(let e=0;e<t.length;e+=1){let i=i9(t[e],"view"),n=i!==null?A(i):void 0;if(n!==void 0&&P(n))ht(r,"colorAttachment",n,"attachment")}else if(t!==null&&typeof t==="object"){Hb(t,A,P,ht,r);}let i=i9(i9(e,"depthStencilAttachment"),"view"),n=i!==null?A(i):void 0;if(n!==void 0&&P(n)){Ib(ht,r,n);}}if(_!==0){U(e);}let i=jt(e);if(K!==null&&e!==null&&typeof e==="object"){ot(e,t.serial);}let n=cr(e);let l;try{l=t.orig.beginRenderPass.call(this,n!==null&&nr(e)?{...e,occlusionQuerySet:n}:e)}finally{if(lt>0){at()}}if(l!==null&&typeof l==="object"){let s=$r(l,this,r,Sr,!1,t.serial,hr(r,e,i,n));if(s.shadowTarget=i,s.rec!==null)s.rec.querySet=n}else n?.destroy();return l},beginComputePass(e){let t=Xt(this),r=a1(t.orig.beginComputePass,this,e);if(r!==null&&typeof r==="object"){let i=Pr(e,t.pass);$r(r,this,i,Ir,!1,t.serial,ar!==null?Jb(i):null)}return r},copyBufferToBuffer:_r("copyBufferToBuffer",{at:0,key:""},{at:-1,key:""}),copyTextureToTexture:_r("copyTextureToTexture",{at:0,key:"texture"},{at:1,key:"texture"}),copyBufferToTexture:_r("copyBufferToTexture",{at:0,key:"buffer"},{at:1,key:"texture"}),copyTextureToBuffer:_r("copyTextureToBuffer",{at:0,key:"texture"},{at:1,key:"buffer"}),clearBuffer:_r("clearBuffer",{at:0,key:""},null),resolveQuerySet:_r("resolveQuerySet",{at:3,key:""},null),finish(e){let t=Xt(this);S();let r=a1(t.orig.finish,this,e);if(r!==null&&typeof r==="object"){zr[jr]=r,Or[jr]=Pr(e,t.pass);let i=jr*p9;Tr[i]=t.draws,Tr[i+1]=t.instances,Tr[i+2]=t.indirectDraws,Tr[i+3]=t.dispatches,Tr[i+4]=t.workgroups,Tr[i+5]=t.indirectDispatches,Tr[i+6]=t.shadowDraws,Cr[jr]=t.log,t.log=null,Nr[jr]=t.work,t.work=null,jr+=1}else if(t.work!==null){pr(t.work,!1);}Gt(this,t);return r}};let Vr=w9(Dr);let Hr=w9({...xr,...{finish(e){let t=Xt(this);S();let r=a1(t.orig.finish,this,e);if(r!==null&&typeof r==="object"&&t.namedCount>0){B(r,t.named.slice(0,t.namedCount),t.epoch);}if(r!==null&&typeof r==="object"&&t.setCount>0)k(r)[c]=t.sets.slice(0,t.setCount);for(let e=0;e<t.setCount;e+=1)t.sets[e]=g9;if(r!==null&&typeof r==="object"&&t.draws+t.indirectDraws>0)k(r)[f]={draws:t.draws,instances:t.instances,indirectDraws:t.indirectDraws,dispatches:0,workgroups:0,indirectDispatches:0,shadowDraws:0};let i=t.rec?.tape;if(r!==null&&typeof r==="object"&&i!==void 0&&i!==null&&i.length>0)k(r)[m]=i;return Yt(this,t),r}}});let Ur=w9({createView(e){let t=k(this)[a]??a9.get(Object.getPrototypeOf(this));if(t===void 0)throw Error("lume resource lease: createView reached a wrapper with no state");let r=a1(t.createView,this,e);if(r!==null&&typeof r==="object"&&I(this)){k(r)[i]=this;if(K!==null){k(r)[g]={texture:this,createView:t.createView,descriptor:e===void 0||e===null?void 0:{...e},native:r,uses:J(),serial:0,gen:0}}}return r}});let Kr=(e)=>e!==null&&typeof e==="object"?k(e)[g]:void 0;let Yr=function(e,t){let r=t.entries,i=Array.isArray(r)?r:Array.from(r),n=!1;for(let e=0;e<i.length&&!n;e+=1){n=Kr(i[e].resource)!==void 0;}if(!n)return;let l=[],s=[],o=[],a=[];for(let e=0;e<i.length;e+=1){let t=i[e];let r=t.resource;let n=Kr(r);if(n!==void 0)s.push(e),o.push(n),a.push(n.gen===0?0:-1);l.push(typeof r==="object"&&r!==null&&"buffer"in r?{binding:t.binding,resource:{buffer:r.buffer,offset:r.offset,size:r.size}}:{binding:t.binding,resource:r})}k(e)[y]={label:t.label,layout:t.layout,entries:l,at:s,views:o,gens:a,native:e,serial:0}};let Qr=function(e){let t=e.resource;if(t===null||typeof t!=="object")return null;let r=i9(t,"buffer"),i=r!==null?r:A(t);return i!==void 0&&I(i)?i:null};let ei=[];let ri=0;let hi={trackTexture(e,r=!1){if(k(e)[t]=!0,k(e)[a]=f9(e,Ur,Ar),!r)return;k(e)[p]=!0,Ct=!0},trackBuffer(e,r){if(k(e)[t]=!0,r!==void 0)k(e)[u]=r},retire:j,isDead:P,allocationOf:Qr,renderNativesOf(e){return Vt(e,"drawIndexedIndirect","setVertexBuffer")},computeNativesOf(e){return Vt(e,"dispatchWorkgroups","setPipeline")},watchSets(e){ft=e,ct+=1},namesOf(e){let t=Dt(e);if(t===null)return null;return t.recording?t.names??=ir(t):null},tallyOf:(e)=>Dt(e),takeSubmitted(e){let t=Tt;e.draws=t.draws;e.instances=t.instances;e.indirectDraws=t.indirectDraws;e.dispatches=t.dispatches;e.workgroups=t.workgroups;e.indirectDispatches=t.indirectDispatches;e.shadowDraws=t.shadowDraws;t.draws=t.instances=t.indirectDraws=t.dispatches=t.workgroups=t.indirectDispatches=t.shadowDraws=0;if(ar!==null){fr(ar,e);ar=null;}if(or!==null)ar=or,or=null},armWorkFrame(){let e=or??ar;if(e!==null)return e.done;let t=c9,r=new Promise(function(e){t=e});return or={done:r,settle:t,reads:[]},r},listens:sr,deadHolderOf:E,nativeGroupOf:function(e,t){if(_!==0)H(t);return K===null?t:tt(t,Dt(e)?.serial??(Y+=1))},refusePlain(e,t,r,i){ht(Dt(e)?.pass??Y9(e),t,r,i)},noteRefusedDraw(){dt+=1},bytesOf:R,refuseRange(e,t,r,i,n){pt(Dt(e)?.pass??Y9(e),t,r,i,n)},noteBindGroup(e,t){ri=0;let r=t.entries;if(Array.isArray(r)){for(let e=0;e<r.length;e+=1){ai:{let e$30=r[e];{let e=e$30;let t=Qr(e);if(t===null)break ai;for(let e=0;e<ri;e+=1)if(ei[e]===t)break ai;ei[ri]=t,ri+=1}}}}else {for(let e of r){ai$:{let e$31=e;{let e=e$31;let t=Qr(e);if(t===null)break ai$;for(let e=0;e<ri;e+=1)if(ei[e]===t)break ai$;ei[ri]=t,ri+=1}}}}if(ri>0){B(e,ei.slice(0,ri),-1);}for(let e=0;e<ri;e+=1)ei[e]=g9;ri=0;if(K!==null){Yr(e,t)}},notePipeline(e,t){if(t!==null)k(e)[d]=t},vertexStepsOf:(e)=>k(e)[d]??null,onRetire(e,t){if(E(e)!==null)return t(),c9;let r=k(e)[n];if(r===void 0)return c9;let i={resources:r,release:t};for(let e of r)(k(e)[v]??=new Set).add(i);return function(){{let e=i;for(let t of e.resources)k(t)[v]?.delete(e)}}},wrapCommandEncoder(e,t){$r(e,null,t!==void 0&&t!==""?t:Y9(e),Vr,!1,(Y+=1))},wrapBundleEncoder(e,t){$r(e,null,t,Hr,!0,(Y+=1))},deadWrites:O,refuseWrite(e,t){ht("queue",e,t,"write")},finishedBy:function(e){for(let t=0;t<jr;t+=1)if(zr[t]===e)return Or[t];return""},takeFinished:function(e,t){let r=Array.isArray(e)?e:null,i=0;for(let e=0;e<jr;e+=1){let n=zr[e],l=e*p9,s=Cr[e],o=Nr[e];if(r===null||r.includes(n)){if(s!==null){$t(s,r!==null);}if(o!==null){pr(o,r!==null);}if(r===null)continue;if(Tt.draws+=Tr[l],Tt.instances+=Tr[l+1],Tt.indirectDraws+=Tr[l+2],Tt.dispatches+=Tr[l+3],Tt.workgroups+=Tr[l+4],Tt.indirectDispatches+=Tr[l+5],Tt.shadowDraws+=Tr[l+6],t!==void 0&&t!==null)for(let e=0;e<p9;e+=1)t[e]+=Tr[l+e];continue}zr[i]=n,Or[i]=Or[e],Cr[i]=s,Nr[i]=o;let a=i*p9;for(let e=0;e<p9;e+=1)Tr[a+e]=Tr[l+e];i+=1}for(let e=i;e<jr;e+=1)zr[e]=null,Or[e]="",Cr[e]=null,Nr[e]=null;jr=i},takeSubmittedDraws:function(){if(!St)return;let e=Rt;return At.clear(),Rt=At,At=e,e},armSubmittedDraws:function(e){if(e===St)return;St=e,Rt.clear(),At.clear()},watchUses(e){if(!e){_=0;return}L+=1,_=L,q=L},useOf(e){if(q===0)return null;let t=k(e);if(t[w]===q)return"drawn";return t[b]===q?"copied":"none"},census(){return{refused:dt,reports:[...ut.values()].map((e)=>({...e}))}},refusedTotal:()=>dt};if(e.device!==void 0)_9.set(e.device,hi);return hi}var qN=(function(e){let t=Reflect.get(globalThis,"__spawnDoorFirstAsk");if(typeof t!=="object"||t===null)return null;let r=Reflect.get(t,e);if(Reflect.deleteProperty(t,e),!(r instanceof Promise))return null;return r});var KN="spawn-gpu:";var nH=(e)=>typeof e==="string"&&e.startsWith("spawn-gpu:");var CL="spawn-gpu-removed";var ZL=(e)=>[...new Set((e??[]).map((e)=>e.name).filter(nH))];var lL=(e)=>typeof e==="object"&&e!==null&&typeof Reflect.get(e,"postMessage")==="function";var sL=function(a){return (sL=$c0C(136)).call(this,a)};function siV(a){return (siV=$c0C(137)).call(this,a)}var vL=(function(){let e=Reflect.get(globalThis,"DedicatedWorkerGlobalScope");if(typeof e!=="function"||!(globalThis instanceof e))return null;if(typeof navigator>"u"||!/Windows/.test(navigator.userAgent))return null;let t=navigator.locks;if(t===void 0)return null;let r=Reflect.get(globalThis,"close");return{locks:t,openChannel:function(){let e=Crv();return e===void 0?null:new e(CL)},mintName:()=>typeof crypto>"u"||typeof crypto.randomUUID!=="function"?null:crypto.randomUUID(),end:function(){if(typeof r==="function")Reflect.apply(r,globalThis,[])},now:()=>performance.now(),adopt:()=>qN("hold")}}),VL;var cRl=(function(){if(VL===void 0){let e=vL();VL=e===null?null:siV(e)}return VL});var Ho=new WeakMap;function Uo(e,t){if(!e3w(t))return null;if(e==="bool")return t!==0?"true":"false";if(e==="i32"&&Number.isInteger(t))return`${t}i`;if(e==="u32"&&Number.isInteger(t)&&t>=0)return`${t}u`;return e==="f32"?_Td(t):null}var oo=new Set(["bool","i32","u32","f32"]),_o=/^(-?(?:[0-9]+\.?[0-9]*|\.[0-9]+)(?:[eE][+-]?[0-9]+)?)[iuf]?$/;function eVq(e,t){let r=_o.exec(t);if(r===null)return t;return Uo(e,Number(r[1]))??t}function ZVq(a){return (ZVq=$c0C(138)).call(this,a)}function Po(e,t){let r={...e,module:t};return delete r.constants,r}function HVq(a){return (HVq=$c0C(139)).call(this,a)}var mn="fn lume_depth_";function Bn(e){return`lume_depth_${e}`}function Jn(e){return`lume_fragment_${e}`}function Wn(e){return`LumeDepthOut_${e}`}var yn="lume_depthOnly",vn;function H9t(e,t){let r=eMf(t.params).map(F4);if(!r.every((e)=>e!==null))return null;let i=r.map((e)=>e.name).join(", ");let n=XSi(e,r);let l=n===null?[...r.map((e)=>e.text),"@builtin(position) lume_position: vec4<f32>"].join(", "):t.params.trim();let s=n??"lume_position";let o=t.name;let a=`  let lume_z = ${s}.z;
`;let u="lume_z";let d=t.params.trim();let f="";let c;if(t.returned===null)c=`@fragment fn ${o}(${d}) {
  ${Jn(o)}(${i});
}
@fragment fn ${Bn(o)}(${l}) -> @builtin(frag_depth) f32 {
${a}  ${Jn(o)}(${i});
  return ${u};
}
`;else if(N4.test(t.returned)){let r=M4(e,t.returned);if(r===null||r.length===0)return null;f=` -> ${t.returned}`,c=`@fragment fn ${o}(${d}) -> ${t.returned} {
  return ${Jn(o)}(${i});
}
struct ${Wn(o)} {
${r.map((e)=>`  ${e.text},
`).join("")}  @builtin(frag_depth) lume_depth: f32,
}
@fragment fn ${Bn(o)}(${l}) -> ${Wn(o)} {
${a}  let lume_out = ${Jn(o)}(${i});
  return ${Wn(o)}(${r.map((e)=>`lume_out.${e.name}, `).join("")}${u});
}
`}else{let e=V4(t.returned).trim();if(e.length===0||e===t.returned)return null;f=` -> ${e}`,c=`@fragment fn ${o}(${d}) -> ${t.returned} {
  return ${Jn(o)}(${i});
}
struct ${Wn(o)} {
  ${t.returned.slice(0,t.returned.length-e.length).trim()} lume_out: ${e},
  @builtin(frag_depth) lume_depth: f32,
}
@fragment fn ${Bn(o)}(${l}) -> ${Wn(o)} {
${a}  return ${Wn(o)}(${Jn(o)}(${i}), ${u});
}
`}return{entry:t,head:T4(e,t,Jn(o),f),tail:c}}function _n(a){return (_n=$c0C(141)).call(this,a)}function Kn(a,b,c){return (Kn=$c0C(142)).call(this,a,b,c)}var un=new WeakSet;function I9t(a){return (I9t=$c0C(143)).call(this,a)}var rT="depth32float",zT=1e4,YT={front:0.75,behind:0.25},kT=new Uint32Array(1),AT=new Float32Array(kT.buffer);function JNQ(a,b){return (JNQ=$c0C(144)).call(this,a,b)}function IT(e){return{front:rF(0),behind:rF(-e)}}function sNQ(e){let[t,r,i]=[e[0],e[1],e[2]];if(r>200&&t<50&&i<50)return"exact";if(t>200&&r<50&&i<50)return"ties";return"unknown"}async function KT(e,t,r,i=!1){let n=function(e,t,r){let n=JNQ(e,t);return i?{code:_n(n).code,fs:Bn("fs"),depthStencil:r}:{code:n,fs:"fs",depthStencil:r}};let l=await mu(e,"lume depth word canary",rT,[n(t,"0.0, 1.0, 0.0",{format:rT,depthWriteEnabled:!0,depthCompare:"always"}),n(r,"1.0, 0.0, 0.0",{format:rT,depthWriteEnabled:!1,depthCompare:"greater-equal"})]);return l===null?"unknown":sNQ(l)}async function ZNQ(e){let{front:t,behind:r}=YT;if(await KT(e,t,r)!=="ties")return!1;return await KT(e,t,r,!0)==="exact"}var ONQ=(async function(e,t,r={}){{let e="exact";hG=e}if(!t)return{road:"exact",fragmentDepth:!1};if(r.answer!==void 0){{let e=r.answer.road;hG=e}Fn.warn(`[lume] depth word canary: the sort band takes the ${r.answer.road} road${r.answer.fragmentDepth?" and every depth draw takes the fragment's depth":""} (${Mu})`);return r.answer;}let i=IT(1);let n=await KT(e,i.front,i.behind);let l=n==="ties"&&await ZNQ(e);let s=l?await KT(e,i.front,i.behind,!0):n;let o=l?"; plain depth writes drop on this device and the fragment's own depth holds, so every depth draw takes the fragment's depth":"";if(s!=="ties"){Fn.warn(`[lume] depth word canary: ${s}${o}`);let e={road:"exact",fragmentDepth:l};if(s==="exact")r.answer=e;return e}{let e="linear";hG=e}let a=IT(zT);let u=await KT(e,a.front,a.behind,l);Fn.warn(`[lume] depth word canary: ties; the sort band takes the linear road (${u==="exact"?"it holds":`its probe reads ${u}`})${o}`);let d={road:"linear",fragmentDepth:l};return r.answer=d,d});var fO="its graphics driver loses the copy into a uniform and the whole write of one too: the sky, the characters and the sky's light would draw black",DO=`@group(0) @binding(0) var<uniform> word: vec4f;
@vertex fn vs(@builtin(vertex_index) i: u32) -> @builtin(position) vec4f { let p = array(vec2f(-1.0, -1.0), vec2f(3.0, -1.0), vec2f(-1.0, 3.0)); return vec4f(p[i], 0.5, 1.0); }
@fragment fn fs() -> @location(0) vec4f { return word; }
`,BO={control:[0.2,0.6,1,1],first:[1,0.2,0.6,1],later:[0.6,1,0.2,1]},EO="rgba8unorm",_O=6,FO=256,GO=4096,$O=256,iO=16,IO=1;function lO(e,t,r){let i=(r.map((e)=>Math.round(e*255)));for(let r=0;r<4;r++)if(Math.abs(e[t*4+r]-i[r])>IO)return!1;return!0}function _FA(e){let{control:t,first:r,later:i}=BO;if(e.length<_O*4||!lO(e,0,t))return"unknown";if(lO(e,1,r)&&lO(e,2,i)&&lO(e,5,i))return"carries";return lO(e,3,r)&&lO(e,4,i)?"whole-writes":"loses"}var HB=["createShaderModule","createRenderPipelineAsync","createBindGroupLayout","createPipelineLayout","createBindGroup","createTexture","createBuffer","createCommandEncoder","pushErrorScope","popErrorScope"];async function UFA(e){if(!HB.every((t)=>nbj(e,t)))return"unknown";if(!nbj(e.queue,"submit")||!nbj(e.queue,"writeBuffer"))return"unknown";return tYn(e,()=>"unknown",async function(t,r){let i=e.createTexture({label:"lume uniform copy canary",size:[_O,1,1],format:EO,usage:17});t.push(i);let n=e.createBuffer({label:"lume uniform copy canary read",size:FO,usage:9});t.push(n);let l=e.createBuffer({label:"lume uniform copy canary control",size:iO,usage:72});t.push(l);let s=e.createBuffer({label:"lume uniform copy canary shared",size:GO,usage:200});t.push(s);let o=e.createBuffer({label:"lume uniform copy canary whole",size:GO,usage:72});t.push(o);let a=e.createBuffer({label:"lume uniform copy canary partial",size:GO,usage:72});if(t.push(a),!nbj(i,"createView")||!nbj(n,"mapAsync")||!nbj(n,"getMappedRange"))return"unknown";let u=e.createCommandEncoder({label:"lume uniform copy canary"});if(!nbj(u,"beginRenderPass")||!nbj(u,"finish"))return"unknown";r.push();let d=e.createBindGroupLayout({label:"lume uniform copy canary",entries:[RDp(0,2,"uniform")]});let f=e.createShaderModule({label:"lume uniform copy canary",code:DO});let c=await e.createRenderPipelineAsync({label:"lume uniform copy canary",layout:e.createPipelineLayout({label:"lume uniform copy canary",bindGroupLayouts:[d]}),vertex:{module:f,entryPoint:"vs"},fragment:{module:f,entryPoint:"fs",targets:[{format:EO}]}});let h=Cnl(e,"lume uniform copy canary control",d,l);let p=e.createBindGroup({label:"lume uniform copy canary shared",layout:d,entries:[{binding:0,resource:{buffer:s,offset:$O,size:iO}}]});let m=e.createBindGroup({label:"lume uniform copy canary whole",layout:d,entries:[{binding:0,resource:{buffer:o,offset:$O,size:iO}}]});let g=e.createBindGroup({label:"lume uniform copy canary partial",layout:d,entries:[{binding:0,resource:{buffer:a,offset:$O,size:iO}}]});let y=function(e){let t=new Float32Array(GO/4);return t.set(e,$O/4),t};let v=y(BO.first);e.queue.writeBuffer(l,0,new Float32Array(BO.control)),e.queue.writeBuffer(s,0,v),e.queue.writeBuffer(o,0,v),e.queue.writeBuffer(a,0,v);let w=i.createView(),b=function(e,t,r){e.setScissorRect(t,0,1,1),e.setBindGroup(0,r),e.draw(3)},k=u.beginRenderPass({label:"lume uniform copy canary",colorAttachments:[{view:w,loadOp:"clear",storeOp:"store",clearValue:{r:0,g:0,b:0,a:0}}]});k.setPipeline(c);b(k,0,h);b(k,1,p);b(k,3,m);b(k,5,g);k.end();e.queue.submit([u.finish()]);e.queue.writeBuffer(s,$O,new Float32Array(BO.later));e.queue.writeBuffer(o,0,y(BO.later));e.queue.writeBuffer(a,$O,new Float32Array(BO.later));let x=e.createCommandEncoder({label:"lume uniform copy canary"}),M=x.beginRenderPass({label:"lume uniform copy canary",colorAttachments:[{view:w,loadOp:"load",storeOp:"store"}]});M.setPipeline(c),b(M,2,p),b(M,4,m),b(M,5,g),M.end(),x.copyTextureToBuffer({texture:i},{buffer:n,bytesPerRow:FO},[_O,1,1]),e.queue.submit([x.finish()]);let S=await r.read(n,_O*4);return S instanceof Uint8Array?_FA(S):"unknown"})}var me=`struct U { a: array<vec4f, 4>, m: mat4x4f, v: vec4f, n: vec4u }
@group(0) @binding(0) var<uniform> u: U;
fn level(slot: u32) -> u32 {
  if (u.a[2].y > 0.5 && slot >= u32(u.a[2].x)) { return 2u; }
  return 0u;
}
fn early(slot: u32) -> vec4f {
  if (u.v.w > 0.5) { return u.v; }
  return u.a[slot % 4u];
}
fn under(slot: u32) -> vec4f {
  return u.a[slot] * u.v[slot] + u.m[slot];
}
fn walk(i: u32) -> vec4f {
  for (var lod = 0u; lod < 4u; lod += 1u) {
    let info = u.a[lod];
    if (info.w <= 0.0 || u.v[lod] <= 0.0) { continue; }
    if (info.x >= f32(i)) { return info * u.v[lod]; }
  }
  return vec4f(0.0);
}
@vertex fn vs(@builtin(vertex_index) i: u32) -> @builtin(position) vec4f {
  let k = level(i);
  var p = u.a[k] * u.v[k] + u.m[k] + early(i);
  if (u.v.z > 0.5) { p += u.a[(i + 1u) % 4u]; }
  if (u.v.y > 0.5) { p += under(i % 4u); }
  p += walk(i);
  for (var j = 0u; j < u.n.x; j++) {
    if (u.a[j % 4u].w > 0.5) { continue; }
    if (u.a[j % 4u].z > 0.5) { break; }
    p += u.m * u.a[(i + j) % 4u];
  }
  return p;
}
@fragment fn fs(@builtin(position) q: vec4f) -> @location(0) vec4f { return u.a[u32(q.x) % 4u] * q; }
`;async function B5n(e){if(!nbj(e,"createShaderModule")||!nbj(e,"createRenderPipelineAsync"))return"unknown";let t=!1,r=Reflect.get(e,"lost");if(r instanceof Promise)r.then(function(){t=!0},function(){return});try{let r=e.createShaderModule({label:"lume uniform index canary",code:me});return await e.createRenderPipelineAsync({label:"lume uniform index canary",layout:"auto",vertex:{module:r,entryPoint:"vs"},fragment:{module:r,entryPoint:"fs",targets:[{format:"rgba8unorm"}]}}),t?"unknown":"links"}catch(e){if(t||ssL(e))return"unknown";return (uLW(e)&&Reflect.get(e,"name")==="GPUPipelineError")?"refuses":"unknown"}}var ofC=(function(e,t){let r=e.usage;if((r&8)===0||(r&16)!==0)return e;if((e.dimension??"2d")!=="2d"||(e.sampleCount??1)!==1)return e;if(!D_.has(e.format)&&!(t&&e.format==="rg11b10ufloat"))return e;return{...e,usage:r|16}});var D_=new Set(["r8unorm","r8uint","r8sint","rg8unorm","rg8uint","rg8sint","rgba8unorm","rgba8unorm-srgb","rgba8uint","rgba8sint","bgra8unorm","bgra8unorm-srgb","r16uint","r16sint","r16float","rg16uint","rg16sint","rg16float","rgba16uint","rgba16sint","rgba16float","r32uint","r32sint","r32float","rg32uint","rg32sint","rg32float","rgba32uint","rgba32sint","rgba32float","rgb10a2uint","rgb10a2unorm"]);var UJi=(function(e,t,r){e.then(t,r)});var oR=function(){return};class VfD{constructor(){this.records=[];this.recordCount=0;this.spare=[];this.spareCount=0;this.judged=[];}get carried(){return this.recordCount}carry(e,t,r,i){if(i===0)return;let n=this.spareCount>0?this.spare[--this.spareCount]:{first:0,last:0,refused:!1,legs:[],count:0};n.first=e,n.last=t,n.refused=!1;for(let e=0;e<i;e+=1)n.legs[e]=r[e];n.count=i,this.records[this.recordCount++]=n}judge(e,t,r){let i=0,n=0;for(let l=0;l<this.recordCount;l+=1){let s=this.records[l];if(r&&e<=s.last&&t>=s.first)s.refused=!0;if(t>=s.last)this.judged[n++]=s;else this.records[i++]=s}this.recordCount=i;for(let e=0;e<n;e+=1){Kb.call(this,e);}}}var t1=32,y1=64,L1=128,p1=4,c1=8,x1=16,N1=1048576,B1={comparison:{compare:"less"},filtering:{magFilter:"linear",minFilter:"linear"},"non-filtering":{}},U1=4,n1=new Set(["depth16unorm","depth24plus","depth24plus-stencil8","depth32float","depth32float-stencil8"]),u1=new Set(["stencil8","depth24plus-stencil8","depth32float-stencil8"]),Y1=2000;class HK_{constructor(e,t,r){this.device=void 0;this.native=void 0;this.now=void 0;this.census={asked:0,drawn:0,refused:0,unfilled:0,answeredMs:0,longestMs:0};this.firstRefusal=null;this.refusalsSaid=new Set;this.groupEntries=new WeakMap;this.layoutGroups=new WeakMap;this.filled=new WeakMap;this.textures=new Map;this.samplers=new Map;this.readBuffer=null;this.writeBuffers=new Map;this.quiet=null;this.sayCensus=()=>{this.quiet=null;let e=oK_(this.device);if(e!==null)Fn.info(e)};this.device=e,this.native=t,this.now=r}noteGroup(e,t){this.groupEntries.set(e,Array.from(t.entries))}noteLayout(e,t){this.layoutGroups.set(e,Array.from(t.bindGroupLayouts,(e)=>e??null))}warm(e,t){this.census.asked+=1;let r=t.label??"(unlabeled)";this.device.pushErrorScope("validation");let i=!1,n=null;try{i=this.encode(e,t)}catch(e){n=k$w(e)}let l=this.device.popErrorScope();if(n!==null)return this.refuse(r,n),l.catch(()=>null),!1;if(!i)return this.census.unfilled+=1,l.catch(()=>null),!1;return l.then((e)=>{if(e===null)this.census.drawn+=1;else this.refuse(r,e.message)},(e)=>this.refuse(r,k$w(e))).then(()=>this.sayWhenQuiet()),!0}async built(e,t){if(!this.warm(e,t))return e;let r=this.now();await this.native.onSubmittedWorkDone().catch(function(){return});let i=this.now()-r;return this.census.answeredMs+=i,this.census.longestMs=Math.max(this.census.longestMs,i),e}sayWhenQuiet(){if(this.quiet!==null)clearTimeout(this.quiet);this.quiet=setTimeout(this.sayCensus,Y1)}encode(e,t){let r=this.groupsOf(t.layout),i=r===null?null:this.attachmentsOf(t);if(r===null||i===null)return!1;let n=this.native.createCommandEncoder({label:"lume first-draw warm"}),l=n.beginRenderPass({label:"lume first-draw warm",...i});l.setPipeline(e),r.forEach((e,t)=>l.setBindGroup(t,e.group,e.offsets));let s=this.sharedBuffer();return Array.from(t.vertex.buffers??[]).forEach(function(e,t){if(e!==null&&e!==void 0)l.setVertexBuffer(t,s)}),l.draw(3),l.end(),this.native.submit([n.finish()]),!0}refuse(a,b){return $c0C(145).call(this,a,b)}groupsOf(e){if(e==="auto")return null;let t=this.layoutGroups.get(e);if(t===void 0)return null;let r=[];for(let e of t){let t=e===null?null:this.fill(e);if(t===null)return null;r.push(t)}return r}fill(e){let t=this.filled.get(e);if(t!==void 0)return t;let r=this.groupEntries.get(e);let i=r===void 0?null:this.entriesOf(r);let n=r===void 0||i===null?null:{group:this.native.createBindGroup({label:"lume first-draw warm",layout:e,entries:i}),offsets:YK_(r)};return this.filled.set(e,n),n}entriesOf(e){let t=[];for(let r of e){let e=this.resourceOf(r);if(e===null)return null;t.push({binding:r.binding,resource:e})}return t}resourceOf(e){if(e.buffer!==void 0){let t=e.buffer.type??"uniform",r=t==="uniform"?this.device.limits.maxUniformBufferBindingSize:this.device.limits.maxStorageBufferBindingSize,i=Math.min(N1,r);if((e.buffer.minBindingSize??0)>i)return null;return{buffer:t==="storage"?this.writeBuffer(e.binding):this.sharedBuffer(),offset:0,size:i}}if(e.sampler!==void 0)return this.sampler(e.sampler.type??"filtering");if(e.texture!==void 0){let t=e.texture.sampleType??"float",r=e.texture.multisampled===!0;return this.view("sampled",BK_(t),e.texture.viewDimension??"2d",r?U1:1,r?p1|x1:p1)}return Mb.call(this,e);}attachmentsOf(e){let t=e.multisample?.count??1,r=Array.from(e.fragment?.targets??[],(e,r)=>e===null||e===void 0?null:{view:this.view(`color ${r}`,e.format,"2d",t,x1),loadOp:"clear",storeOp:"discard"}),i=e.depthStencil?.format;if(i===void 0)return r.some((e)=>e!==null)?{colorAttachments:r}:null;let n=this.view("depth",i,"2d",t,x1);let l=n1.has(i)?{depthLoadOp:"clear",depthStoreOp:"discard",depthClearValue:1}:{};let s=u1.has(i)?Nb():{};return{colorAttachments:r,depthStencilAttachment:{view:n,...l,...s}}}sharedBuffer(){return this.readBuffer??=this.native.createBuffer({label:"lume first-draw warm read",size:N1,usage:y1|L1|t1})}writeBuffer(e){return JPf(this.writeBuffers,e,()=>this.native.createBuffer({label:"lume first-draw warm write",size:N1,usage:L1}))}sampler(e){return JPf(this.samplers,e,()=>this.native.createSampler({label:"lume first-draw warm",...B1[e]}))}view(e,t,r,i,n){let l=`${e}:${t}:${r}:${i}:${n}`;return JPf(this.textures,l,()=>this.native.createTexture(R0F(this.device,{label:"lume first-draw warm",size:GK_(r),dimension:DK_(r),format:t,sampleCount:i,usage:n},r))).createView({dimension:r})}}function BK_(e){if(e==="depth")return"depth32float";if(e==="sint")return"r8sint";if(e==="uint")return"r8uint";return"rgba8unorm"}function DK_(e){if(e==="1d")return"1d";return e==="3d"?"3d":"2d"}function GK_(e){if(e==="1d")return[1];return e==="cube"||e==="cube-array"?[1,1,6]:[1,1]}function YK_(e){return e.filter((e)=>e.buffer?.hasDynamicOffset===!0).map(()=>0)}var T1=new WeakMap;var sK_=(function(e,t,r){if(t===null)return!1;if(T1.has(e))return!0;let i=["createBindGroupLayout","createPipelineLayout","createRenderPipeline","createRenderPipelineAsync","createTexture","createBuffer","createSampler","createBindGroup","createCommandEncoder","pushErrorScope","popErrorScope"],n=e.queue;if(i.some((t)=>typeof Reflect.get(e,t)!=="function")||typeof n?.submit!=="function"||typeof n.onSubmittedWorkDone!=="function")return!1;let l={createBindGroupLayout:e.createBindGroupLayout.bind(e),createPipelineLayout:e.createPipelineLayout.bind(e),createRenderPipeline:e.createRenderPipeline.bind(e),createRenderPipelineAsync:e.createRenderPipelineAsync.bind(e),createTexture:e.createTexture.bind(e),createBuffer:e.createBuffer.bind(e),createSampler:e.createSampler.bind(e),createBindGroup:e.createBindGroup.bind(e),createCommandEncoder:e.createCommandEncoder.bind(e),submit:e.queue.submit.bind(e.queue),onSubmittedWorkDone:e.queue.onSubmittedWorkDone.bind(e.queue)},s=new HK_(e,l,r);return T1.set(e,s),e.createBindGroupLayout=function(e){let t=l.createBindGroupLayout(e);return s.noteGroup(t,e),t},e.createPipelineLayout=function(e){let t=l.createPipelineLayout(e);return s.noteLayout(t,e),t},e.createRenderPipeline=function(e){let t=l.createRenderPipeline(e);return s.warm(t,e),t},e.createRenderPipelineAsync=(e)=>l.createRenderPipelineAsync(e).then((t)=>s.built(t,e)),!0});function oK_(a){return (oK_=$c0C(146)).call(this,a)}var Pz=new WeakMap;async function yMv(e,t){let r=t?.subgroupMinSize??0;if(!e.features.has("subgroup-size-control")||!(r>0&&r<(t?.subgroupMaxSize??0)))return;try{await e.createComputePipelineAsync({layout:"auto",compute:{module:e.createShaderModule({code:`enable subgroups, subgroup_size_control;
@subgroup_size(${r}) @compute @workgroup_size(128) fn main() {}`})}}),Pz.set(e,r)}catch(e){Fn.info(`[lume] subgroup ${r} refused: ${String(e).split(`
`)[0]}`)}}function vMb(e){return Pz.get(e)??0}var sg=["GPUError","GPUPipelineError","GPUCompilationMessage"],Lg=Symbol.for("lume.gpuWordsDoor");function hYP(e=globalThis){for(let t of sg){let r=Reflect.get(e,t);if(typeof r!=="function")continue;let i=r.prototype;if(typeof i!=="object"||i===null||Object.hasOwn(i,Lg))continue;let n;aYP:{let e=i;for(let t=e;t!==null;t=Reflect.getPrototypeOf(t)){let e=Object.getOwnPropertyDescriptor(t,"message");if(e!==void 0){n=typeof e.get==="function"?e.get:void 0;break aYP;}}}if(n===void 0)continue;Object.defineProperty(i,"message",{configurable:!0,enumerable:!0,get(){let e=n.call(this);return typeof e==="string"?syo(e):e}}),Object.defineProperty(i,Lg,{value:!0})}}var AQ=XBU(),CQ=uRd(),nM=0,fQ=!1;var G6=(function(e){if(typeof e!=="object"||e===null)return null;if("buffer"in e)return e.buffer;if("mapState"in e)return e;return null});var loo=(function(e,t){fQ=!0;let r=!1,i=0;for(let e of t.entries)if(i+=1,!r&&G6(e.resource)!==null)r=!0;if(!r)return;let n={label:t.label,layout:t.layout,bindings:Array(i),resources:Array(i),buffers:Array(i),offsets:Array(i),sizes:Array(i)},l=0;for(let e of t.entries){let t=e.resource;if(n.bindings[l]=e.binding,typeof t==="object"&&t!==null&&"buffer"in t)n.resources[l]=null,n.buffers[l]=t.buffer,n.offsets[l]=t.offset,n.sizes[l]=t.size;else n.resources[l]=t,n.buffers[l]=null,n.offsets[l]=void 0,n.sizes[l]=void 0;l+=1}AQ.set(e,n)});function doo(e,t){let r=e.resources[t];return r===null||r===void 0?e.buffers[t]??null:G6(r)}function ggH(){return fQ}function Yv5(a){return $c0C(147).call(this,a)}var XKG=(function(e){if(CQ.has(e))return;CQ.add(e),nM+=1});class mrD{constructor(e,t,r=null,i=null){this.device=void 0;this.label=void 0;this.onTwin=void 0;this.ownTwin=void 0;this.twins=new Map;this.groups=new WeakMap;this.passed=new WeakMap;this.disposals=0;this.sweepLease=null;this.sweepTwin=(e,t)=>{if(this.sweepLease?.isDead(t)!==!0)return;this.twins.delete(t),e.destroy()};this.device=e,this.label=t,this.onTwin=r,this.ownTwin=i}directTwin(e){return this.ownTwin===null?e:this.ownTwin(e)}get revision(){return nM+this.disposals}buffer(e){if(!CQ.has(e))return e;let t=this.twins.get(e);if(t===void 0)t=this.device.createBuffer({label:`${e.label} (${this.label})`,size:e.size,usage:e.usage}),this.twins.set(e,t),this.onTwin?.(e,t);return t}twinOf(e){return this.twins.get(e)}bindGroup(e){let t=this.groups.get(e);if(t!==void 0)return t;if(this.passed.get(e)===nM)return e;let r=AQ.get(e),i=!1;if(r!==void 0){for(let e=0;e<r.bindings.length;e++){let t=doo(r,e);if(t!==null&&CQ.has(t)){i=!0;break}}}if(r===void 0||!i)return this.passed.set(e,nM),e;return this.twinGroup(e,r)}twinGroup(a,b){return $c0P($c0C(148),mrD.prototype,"twinGroup").call(this,a,b)}sweep(e){if(this.twins.size===0)return;this.sweepLease=e;try{this.twins.forEach(this.sweepTwin)}finally{this.sweepLease=null}}dispose(){for(let e of this.twins.values())e.destroy();this.twins=mnS(this.twins),this.groups=new WeakMap,this.passed=new WeakMap,this.disposals+=1}}var Mz=new WeakMap;var RXn=(function(e,t){Mz.set(e,t)});function DAq(e,t,r,i,n){let l=Mz.get(e);if(l!==void 0){l(t,r,i);return}Ob(e,n,t,r,i);}var fm=!1;var gCQ=(function(e){fm=e});var rvi=()=>fm,Xwf=2048,j1=48,Il=32,X1=16,P5=536870912,aOP={bufferBytes:P5},O5={bufferBytes:2147483648},zl={bufferBytes:4294967296,workgroupBytes:65536},MB=256,GB=16,Tl=8,Vl=134217728,t5=268435456,B5=16384,zB="core-features-and-limits",o5=[zB,"timestamp-query","texture-compression-bc","texture-compression-etc2","texture-compression-astc","indirect-first-instance","shader-f16","rg11b10ufloat-renderable","subgroups","subgroup-size-control","float32-filterable"],x5="WebKit gave no words: its GPU process ended under the page, or WebKit destroyed the device itself",pl="WebKit gave no words: it lost the device on a Metal error, a command buffer's error status or the Metal device's removal";var lB=/WebGPUChild destroyed/i;function o2A(e){return lB.test(e)}var I5=/DXGI_ERROR_DEVICE_HUNG|GPU (?:Timeout|Hang)|VK_ERROR_DEVICE_LOST|vkQueueSubmit failed|\bhung\b|\bhang\b|\btimed out\b|\btimeout\b/i,k5=/CommandBufferCallbackError([A-Za-z]+)/;function Cea(e){return k5.exec(e)?.[1]??null}var LB=/VK_ERROR_OUT_OF_(?:DEVICE|HOST)_MEMORY|OUTOFMEMORY|out of memory/i,SB=/DXGI_ERROR_DEVICE_(?:REMOVED|RESET)/i,Ll=/\bvk(?:CreateSemaphore|GetSemaphoreFdKHR|ImportSemaphoreFdKHR) failed\b/,g5=/\bvkAllocateMemory failed with VK_ERROR_OUT_OF_(?:DEVICE|HOST)_MEMORY\b[\s\S]*?\bunexpected error type Internal\b|\bvkBindImageMemory failed with VK_ERROR_OUT_OF_(?:DEVICE|HOST)_MEMORY\b/,fl=/when allowed errors are \(?[A-Za-z|]+\)?/g,Bl="the device ended during its own stand";function ryy(e){return e.includes(Bl)}function FO8(e,t){if(e===null)return"";let r=[...t.features].join(",");return`; ${Bl}, at its ${e} step, before the engine asked it for any build or frame (features: ${r})`}function Y_H(e){let t=e.replace(fl,"");if(t.includes(x5))return"webkit-process-gone";if(t.includes(pl))return"webkit-metal-error";if(xsL(t)||o2A(t))return"gpu-process-gone";if(I5.test(t))return"hang";if(g5.test(t))return"import-refused";if(LB.test(t))return"memory";if(Ll.test(t))return"sync-refused";if(SB.test(t))return"device-removed";return"unnamed"}var uB=new WeakMap,r1=["internal","out-of-memory","validation"],$5=function(){return};var JWM=(function(e,t,r,i){if(!(typeof e.pushErrorScope==="function"&&typeof e.popErrorScope==="function")||!pmN(t)||r?.mode==="stream")return e.onuncapturederror=(e)=>i(e.error),!1;for(let t of r1)e.pushErrorScope(t);return!0});var El=new WeakMap;var sHp=(function(e){El.get(e)?.open()});var iYp=(function(e){El.get(e)?.close()});function ayR(e){El.get(e)?.span()}var c5=new WeakMap;function A_2(e,t){ZYD(c5,e);try{return t()}finally{c5.set(e,(c5.get(e)??1)-1)}}function LcW(e,t){let r=uB.get(e);if(!r)return function(){return};return OgH(r,t)}var f5=new WeakMap,D1=new WeakMap;function SBR(e,t){let r=C5X(e);if(r===0||r<t||!uB.has(e)||typeof e.pushErrorScope!=="function"||typeof e.popErrorScope!=="function")return Promise.resolve(null);let i=D1.get(e);if(i!==void 0&&i.ordinal>=t)return Promise.resolve(i.message);return new Promise(function(i){aWM(e).add({since:t,through:r,refusal:null,settle:i})})}var Pl=new WeakMap;function gWK(e,t){if(typeof e.pushErrorScope!=="function"||typeof e.popErrorScope!=="function")return{value:t(),word:Promise.resolve(null)};e.pushErrorScope("validation");let r,i;try{r=t()}finally{i=e.popErrorScope().then(function(t){if(t===null)return null;return Pl.get(e)?.(t),t.message},()=>null)}return{value:r,word:i}}var wl=(e)=>e.split(`
`,1)[0].trim();function v8X(e,t){return Promise.all([e,t]).then(([e,t])=>e===null||t===null?e:`${wl(t)} (the queue then refused the work: ${wl(e)})`)}function aWM(a){return (aWM=$c0C(149)).call(this,a)}var OB=new WeakMap;var Duk=(function(e,t,r,i,n){if(n===0)return;let l=OB.get(e);if(l!==void 0&&t<=r)return l.carry(t,r,i,n);Rb(n,i);});function yWM(e,t=!0){let r=jCw(uB,e),i=OB.get(e);if(t&&i===void 0)i=new VfD,OB.set(e,i);else if(!t)OB.delete(e),i=void 0;let n=i;return function(t){if(t.rejected!==null){Cj(t.rejected.message);let r=D1.get(e);if(r===void 0)D1.set(e,{ordinal:t.ordinal,message:t.rejected.message});else r.ordinal=t.ordinal,r.message=t.rejected.message}n?.judge(t.first,t.ordinal,t.rejected!==null),r.forEach(sWM,t)}}var sWM=(function(e){try{e(this)}catch{}});var bB=new WeakMap;var C5X=(function(e){return bB.get(e)?.issued??0});function jhk(e,t,r=NaN){if(C5X(e)===t){{let t=g4.get(e);if(t===void 0)return!1;w4(t);if(!n4(t)||!(t.out>0||t.covered||t.extraOut()))return!1;return _4(t),!0}}X1r:{let t$19=r;{let t=t$19;let r=g4.get(e);if(r===void 0||!e3w(t)||t<=r.lastStampMs)break X1r;{let v$33;sb:{let i=t-r.lastStampMs;if(r.lastStampMs=t,!e3w(i))break sb;if(r.framed=!0,r.beatStepMs=i,!(i<=r.answeredInMs))break sb;{let e=r;e.verdict="unknown",e.answeredInMs=NaN}c4(r)
v$33=ca;}if((ea=v$33)!==ca){(ea);break X1r;}}}}return !1}var xO8=(function(e){let t={issued:0};return bB.set(e,t),R5(e),(function(e){t.issued=e})});var FKB=12,ql=8,S1=new WeakMap,WB=!0,g1=-1/0,Al=0,Wl=100,K5=2,m5=8,h1=new Float64Array(m5),P1=new Float64Array(m5),_5={lastAtMs:NaN,stillFromMs:NaN,lastArrivalAtMs:-1/0,periodsKept:0,periodNext:0,lineMs:Wl,stretchMaxMs:0},M1=!1,al=0;function S9g(){return _5.lineMs}function IO8(e){if(!WB||!M1)return _5.stretchMaxMs;let t=e-_5.stillFromMs;return t>_5.stretchMaxMs?t:_5.stretchMaxMs}var Wg1=(function(e=Bra()){if(!WB)return;Iik(e);AO8:{let e=_5.lastAtMs-_5.lastArrivalAtMs;if(_5.lastArrivalAtMs=_5.lastAtMs,!(e>0&&e<1/0))break AO8;if(h1[_5.periodNext]=e,_5.periodNext=(_5.periodNext+1)%m5,_5.periodsKept<m5)_5.periodsKept+=1;let t=_5.periodsKept;if(t<m5)break AO8;for(let e=0;e<t;e+=1){let t=h1[e],r=e-1;while(r>=0&&P1[r]>t)P1[r+1]=P1[r],r-=1;P1[r+1]=t}let r=(P1[t-1>>1]+P1[t>>1])*(K5/2);if(_5.lineMs=r,r<Wl)_5.lineMs=Wl}});var Iik=(function(e){if(!WB)return;let t=_5,r=e-t.lastAtMs;if(r>=t.lineMs)al+=r;let i=e-t.stillFromMs;if(i>t.stretchMaxMs)t.stretchMaxMs=i;t.lastAtMs=t.stillFromMs=e,M1=!0});function mB(e){if(!WB||!M1)return al;let t=e-_5.lastAtMs;return t>=_5.lineMs&&isFinite(t)?al+t:al}function ml(e,t,r,i){return Math.max(0,r-e-(i-t))}function gGm(e,t=Bra()){if(e===WB)return;if(e3w(_5.lastAtMs))if(e)_5.lastAtMs=_5.stillFromMs=t;else Iik(t);if(e)_5.lastArrivalAtMs=-1/0;WB=e,g1=t,Al=al}function ZWM(e,t,r,i){if(!WB){return ml(e,t,g1,Al);}return(r===null?g1===-1/0:r>=g1)?ml(e,t,i,mB(i)):0}function R5(e){let t=S1.get(e);if(!t){t=Sb(t,e)}return t}var f1=(function(e,t){let r=e.labels;return r[e.first+t&r.length-1]});var nB=[null];function PWM(e){let t=e.labels,r=[],i=0;for(let n=0;n<t.length;n+=1)r.push(t[e.first+n&t.length-1]),i=Math.max(i,t[n].passes.length);let n=t.length===0?1:t.length*2;while(r.length<n){r.push(({ordinal:0,passes:Array(i).fill(""),passCount:0,submittedAtMs:NaN,unheardAtSubmitMs:0,graph:!1,writtenBytes:0,size:new Float64Array(p9),sized:!1,worded:!1,spanWord:!1,batchStamped:!1}));}e.labels=r,e.first=0}var yO8=(function(e,t){R5(e).wordless=t});var sB=(function(e,t){let r=S1.get(e);return r!==void 0&&(r.wordless||t<=r.completed)});function Q1(e,t,r,i,n){let l=n?0:r??Bra();if(!n&&(e.count===0||f1(e,e.count-1).ordinal<=e.completed)){{let e=l;if(_5.stretchMaxMs=0,M1)_5.stillFromMs=e}}if(e.wordless&&e.count>0){Ub(e);}if(e.count===e.labels.length){PWM(e);}let s=f1(e,e.count);if(e.count+=1,s.size.fill(0),s.sized=!1,s.worded=!1,s.spanWord=!1,s.batchStamped=n,s.ordinal=t,n)s.submittedAtMs=e.stampAtMs,s.unheardAtSubmitMs=e.stampUnheardMs;else e.stampAtMs=s.submittedAtMs=l,e.stampUnheardMs=s.unheardAtSubmitMs=mB(l);s.graph=i;let o=ZLG();return s.writtenBytes=o-e.uploadMark,e.uploadMark=o,s}function dO8(e,t,r,i,n,l=!1){if(t<=0)return null;let s=Q1(R5(e),t,n,!1,l);s.sized=!0;let o=s.passes,a=Array.isArray(r)?r:nB;for(let e=0;e<a.length;e+=1){let t=a[e],r=typeof t==="object"&&t!==null?i(t):"";o[e]=r===""?"(unlabeled)":r}return s.passCount=a.length,s.size}function IpN(e,t,r,i,n=r.length){if(t<=0)return;let l=R5(e),s=l.count===0?void 0:f1(l,l.count-1),o=s?.ordinal===t?s:Q1(l,t,i,!0,!1);o.graph=!0;let a=o.passes,u=n<0?Math.max(0,r.length+n):Math.min(n,r.length);for(let e=0;e<u;e+=1)a[e]=r[e];o.passCount=u}function kB(e,t,r=!1){let i=S1.get(e);if(!i)return;for(let e=i.count-1;e>=0;e-=1){let n=f1(i,e);if(n.ordinal<t)return;if(n.ordinal!==t)continue;if(n.worded=!0,n.spanWord=r,n.batchStamped)n.batchStamped=!1,n.unheardAtSubmitMs=mB(n.submittedAtMs=Bra());return}}function UO8(e,t,r=Bra()){let i=R5(e);if(t<=i.completed)return;i.completed=t;i.retired=!0;i.retiredAtMs=r;{let e=r;if(_5.stretchMaxMs=0,M1)_5.stillFromMs=e}let n=mB(r);i.retiredUnheardMs=n;let l=0;while(l<i.count){let e=f1(i,l);if(e.ordinal>t)break;if(l+=1,e.ordinal!==t||!e.graph||e.spanWord)continue;let{latencyNext:s,latencies:o}=i,a=Math.max(0,r-e.submittedAtMs-(n-e.unheardAtSubmitMs));if(o[s]=Math.max(0,r-e.submittedAtMs),o[ql+s]=a,o[2*ql+s]=WB&&e.submittedAtMs>=g1?a:0,o[3*ql+s]=r,i.latencyNext=s+1===ql?0:s+1,i.latencyCount<ql)i.latencyCount+=1}if(l-=1,l<=0)return;i.first=i.first+l&i.labels.length-1,i.count-=l}function T5(e,t){let r=[],i=e.latencyCount<ql?0:e.latencyNext;for(let n=0;n<e.latencyCount;n+=1)r.push(e.latencies[t*ql+(i+n)%ql]);return r}var r1h=(function(e){return S1.get(e)?.completed??0});function xmY(e){let t=S1.get(e);if(!t)return[];let r=[];for(let e=0;e<t.count;e+=1){let i=f1(t,e);if(i.ordinal>t.completed)r.push({ordinal:i.ordinal,passes:i.passes.slice(0,i.passCount),submittedAtMs:i.submittedAtMs,graph:i.graph})}return r}function ygr(e,t=Bra()){let r=S1.get(e);if(!r)return null;let i=xmY(e),n=i[0];if(n===void 0)return null;let l=r.retired?r.retiredAtMs:null,s=l!==null&&l>n.submittedAtMs,o=s?l:n.submittedAtMs,a;for(let e=0;e<r.count&&a===void 0;e+=1)if(f1(r,e).ordinal===n.ordinal)a=f1(r,e);let u=r.count===0?void 0:f1(r,0),d=s?r.retiredUnheardMs:a?.unheardAtSubmitMs??0;return{ordinal:n.ordinal,passes:n.passes,graph:n.graph,whole:n.ordinal===r.completed+1,alone:a?.worded===!0,lastRetired:u===void 0||u.ordinal>r.completed?null:{ordinal:u.ordinal,passes:u.passes.slice(0,u.passCount),graph:u.graph},ageMs:Math.max(0,t-n.submittedAtMs),retiredAgeMs:l===null?null:Math.max(0,t-l),queued:i.length-1,retireLatenciesMs:T5(r,0),retireAgesMs:T5(r,3).map((e)=>Math.max(0,t-e)),shownWaitMs:ZWM(o,d,l,t),shownRetireLatenciesMs:T5(r,2),heardWaitMs:ml(o,d,t,mB(t)),heardRetireLatenciesMs:T5(r,1),quietSinceHide:PO8(l),writtenBytes:a?.writtenBytes??0,size:a?.sized===!0?Array.from(a.size):[],stillStretchMs:IO8(t)}}function Ak1(e){if(!WB)return!0;let t=S1.get(e);return t!==void 0&&t.retired&&t.retiredAtMs<g1}function PO8(e){if(!WB)return!0;return g1!==-1/0&&(e===null||e<g1)}function Ccu(a){return $c0C(150).apply(this,arguments)}function Sw_(e){let t=e.length;return`${t} ${t===1?"packet":"packets"} #${e[0]}${t===1?"":` to #${e[t-1]}`}`}function oxl(e,t=1/0){let{ordinal:r,passes:i}=e,n=Math.min(i.length,t),l=`${i.slice(0,n).join(" \u00b7 ")}${i.length>n?` (+${i.length-n} more)`:""}`;if(e.graph===!1){return Vb(r,i,l);}return`#${r} (${i.length} ${i.length===1?"pass":"passes"}): ${l}`}function rGV(e){return e.map((e)=>oxl(e)).join(" | ")}function Jls(e,t=!0){let r=S1.get(e),i=[],n=[],l=!1;for(let e=0;r!==void 0&&e<r.count&&!l;e+=1){let t=f1(r,e);if(t.ordinal<=r.completed)continue;n.push(t.ordinal),l=t.worded,i.push(...t.passCount===0?["no command buffer"]:t.passes.slice(0,t.passCount))}let s=[],o=0;i.forEach(function(e,t){if(o=e===i[t-1]?o+1:1,e!==i[t+1])s.push(o>1?`${e} \u00d7${o}`:e)});let a=n.length;if(a===0||a===1&&l)return"";return`${Sw_(n)}, ${l?"the last with the word":"no word in flight"}${t?`: ${s.join(" \u00b7 ")}`:""}`}function MYR(e){let t=e.retiredAgeMs===null?"no packet had retired yet":`the last packet retired ${Math.round(e.retiredAgeMs)} ms before ${e.whole?"it":"this word"}`,r=e.retireLatenciesMs.length>0?`; the last retire latencies ${e.retireLatenciesMs.map((e)=>String(Math.round(e))).join(" \u00b7 ")} ms`:"";return`${e.whole?`submitted ${Math.round(e.ageMs)} ms before this word; `:""}${t}${r}`}var Zl=new WeakMap;var Ane=(function(e){return Zl.get(e)??null});var wGi=(function(e){let t=Zl.get(e);if(t===void 0)return;t.open=!0,t.verb="",t.ms=0,t.label=""});var jlu=(function(e){let t=Zl.get(e);if(t!==void 0)t.open=!1});var QO8=(function(e){if(typeof e!=="object"||e===null)return"";let t=Reflect.get(e,"label");if(typeof t==="string")return t;return Wb(e);});var RO8=(function(e){let t={open:!1,verb:"",ms:0,label:""};return Zl.set(e,t),t});function D5(e,t,r,i){if(r<0)return;let n=Bra()-r;if(n<=e.ms)return;e.ms=n;e.verb=t;e.label=QO8(i)}var V5=["createSampler","createBindGroupLayout","createPipelineLayout","createShaderModule","createQuerySet","createRenderPipelineAsync","createComputePipelineAsync","createRenderPipeline","createComputePipeline","importExternalTexture","pushErrorScope","popErrorScope"];var WO8=(function(e,t){let r=e.popErrorScope.bind(e);return (function(){let e=r();return t.pop=e,e})});var oO8=(function(e){return e instanceof Promise?d$(e):e});var AWM=(function(e,t,r,i,n,l){let s=l?.listens===!0?l:null;for(let l of V5){let o=Reflect.get(e,l);if(typeof o!=="function")continue;let a=l==="pushErrorScope"?1:0,u=l==="popErrorScope"?1:0,d=u===0?oO8:(function(e){if(e instanceof Promise)n.pop=e;return e}),f=(function(t,r,i,n){if(n!==void 0)return o.call(e,t,r,i,n);if(i!==void 0)return o.call(e,t,r,i);if(r!==void 0)return o.call(e,t,r);if(t!==void 0)return o.call(e,t);return o.call(e)}),c=s===null?void 0:UN[l];Reflect.set(e,l,function(e,n,o,h){if(r.close(),i.open=Math.max(0,i.open+a-u),!t.open&&c===void 0)return d(f(e,n,o,h));let p=Bra();try{let t=d(f(e,n,o,h));if(c!==void 0)s?.notePipeline(c,e,p,t);return t}finally{if(t.open)D5(t,l,p,e)}})}});var Ml=8,KB=4,_B=16,A5=32,CB=64,pB=128,j5=new Uint8Array(0);var wO8=(function(e){let t=e.queue.writeBuffer.bind(e.queue),r=typeof e.createCommandEncoder==="function"?e.createCommandEncoder.bind(e):null,i=e.createBuffer.bind(e),n=typeof e.createBindGroup==="function"?e.createBindGroup.bind(e):null,l=typeof e.createBindGroupLayout==="function"?e.createBindGroupLayout.bind(e):null,s=typeof e.createRenderBundleEncoder==="function"?e.createRenderBundleEncoder.bind(e):null,o=null,a=new Map,u=function(e,t){let r=a.get(e);if(r===void 0)r=t({label:`lume allocation probe ${e}`,entries:[RDp(0,4,e)]}),a.set(e,r);return r};return function(e){if(e.kind==="texture")return e.resource.createView(),!0;let a=e.resource;if(e.usage&Ml)return t(a,0,j5),!0;if(e.usage&KB&&r!==null){o??=i({label:"lume allocation probe target",size:4,usage:Ml});let e=r({label:"lume allocation probe"});return e.copyBufferToBuffer(a,0,o,0,0),e.finish(),!0}if(e.usage&(CB|pB)&&n!==null&&l!==null&&e.bytes>=4){let t=e.usage&CB?"uniform":"read-only-storage";n({label:"lume allocation probe",layout:u(t,l),entries:[{binding:0,resource:{buffer:a,offset:0,size:4}}]});return !0}if(e.usage&(A5|_B)&&s!==null){let t=s({label:"lume allocation probe",colorFormats:["rgba8unorm"]});if(e.usage&A5)t.setVertexBuffer(0,a);else t.setIndexBuffer(a,"uint16");return t.finish(),!0}return!1}});function ZzM(e){return X5.get(e)?.mapped()??[]}var X5=new WeakMap,T4L=new WeakMap;var CWM=(function(){let e=new Set;return{add(t){e.add(t)},drop(t){e.delete(t)},mapped:function mapped(){return (mapped.$h??=$c0C(151)(e)).call(this)}}});var gl=Symbol("lume.device.liveRow");var L5=(function(e,t,r,i,n){if(n!==void 0)return e.call(t,r,i,n);if(i!==void 0)return e.call(t,r,i);return e.call(t,r)});function EO8(a,b,c,d,e,f,g){return (EO8=$c0C(152)).call(this,a,b,c,d,e,f,g)}var rB=(function(e,t){if(e.map!==null){let r=Reflect.get(t,"mapState");if(e.waiting!==null||r!=="unmapped"&&r!=="mapped")R$(e.map);e.map=null}if(e.waiting!==null){Xb(e);}if(typeof e.native==="function")Reflect.apply(e.native,t,[]);return});var mWM=(function(){let e=new Set,t=64;return{add(r){if(e.add(r),e.size>t*2){for(let t of e)if(t.ref.deref()===void 0)e.delete(t);t=Math.max(64,e.size)}},drop(t){e.delete(t)},each(t){for(let r of e){let e=r.live?r.ref.deref():void 0;if(e!==void 0)t(r,e)}},endAll(){let t=0;for(let r of e){let e=r.ref.deref();if(e===void 0||(W5.has(e)))continue;try{rB(r,e),t+=1}catch{}}return e.clear(),t}}});var H1=new Set,O1=new WeakMap;var GO8=(function(e){d$(new Promise((function(t){O1.set(e,t);let r=e.lost;if(r instanceof Promise)r.then(t,t)})))});var Ol=!1;function eyE(){Ol=!0;let e=[...H1];for(let t of e)t.destroy();return e.length}var nO8=(function(e){if(Ol)e.destroy();else H1.add(e);return O1.get(e.device)?.(),e});var vB=new WeakSet,bl=0;var Mb6=(function(e){return bl>0&&vB.has(e)});var yB1=(function(){return bl});var i1=new WeakSet,C1=0;function O2u(e){return C1>0&&i1.has(e)}var _1=new Map,J5=(e)=>e.replace(/\d+/g,"#");function Oyd(e){return e!==null&&bl>0&&((vB.has(e)||_1.size>0&&O2u(e)&&_1.has(J5(A1(e)))))}function fO8(e){return!O2u(e)&&!Mb6(e)}function ll(e){i1.add(e),C1+=1;for(let t of Gl)t.push(e)}var Gl=new Set;function htg(){let e=[],t=0;return{made:e,within:function(r){if(t++===0)Gl.add(e);try{return r()}finally{if(--t===0)Gl.delete(e)}}}}function hOh(e,t){return new Promise(function(r){o4F(t,function(){let e=t.find((e)=>Mb6(e));r(e===void 0?null:A1(e))});e.lost?.then(()=>r(null),()=>r(null))})}function A1(e){let t=Reflect.get(e,"label");return typeof t==="string"&&t.length>0?t:"(unlabeled)"}var d1=new WeakMap;function o4F(e,t){let r=0,i=function(){if(r-=1,r===0)t()};for(let t of e){if(!O2u(t))continue;r+=1;let e=d1.get(t);if(e===void 0)d1.set(t,[i]);else e.push(i)}if(r===0)t()}var sl=[];function OPO(e){sl.push(e)}var hl=new Map;function rnY(e,t){if(e.length===0||!(t>0))return;hl.set(e,Math.floor(t))}function _l(e){vB.add(e),bl+=1;let t=q1.get(e);if(t!==void 0)s5.add(t)}var W5=new WeakSet;function rO8(e){W5.add(e);let t=q1.get(e);if(t===void 0)return!1;return s5.add(t),!0}var q1=new WeakMap,s5=new Set,$B=0,V1=0;var RKC=(function(){return $B});function dAA(){return $B+UAM.epoch}class sx${constructor(e,t,r,i){this.device=void 0;this.fill=void 0;this.make=void 0;this.current=void 0;this.currentDescriptor=void 0;this.currentGeneration=void 0;this.scope=void 0;this.depths=void 0;this.released=!1;this.refillOwed=!1;this.waitsForRoom=!1;this.holdsReissue=!1;this.trial=null;this.roomReturned=()=>{this.waitsForRoom=!1};this.wholeView=null;this.wholeViewGeneration=0;this.device=e;this.fill=r;this.make=i;this.scope=Hm7();this.depths=((wm>0?1:0)|(Tm>0?2:0));this.currentDescriptor=t;this.current=this.mint(t);this.currentGeneration=1}get resource(){return this.current}get generation(){return this.currentGeneration}get descriptor(){return this.currentDescriptor}view(){if(this.wholeView===null||this.wholeViewGeneration!==this.currentGeneration)ac.call(this);return this.wholeView}replace(e){this.dropTrial();let t=this.current;return q1.delete(t),this.currentDescriptor=e,this.current=this.mint(e),this.holdsReissue=!1,this.currentGeneration+=1,this.hearRefusalOf(t),t}hearRefusalOf(e){if(O2u(e))o4F([e],()=>this.hearRefusalOf(e));else if(Mb6(e)&&!this.released)this.refillOwed=!0,s5.add(this)}release(e=d5){if(this.released)return;this.released=!0,this.wholeView=null,s5.delete(this),q1.delete(this.current),this.dropTrial(),e(this.current)}dropTrial(){if(this.trial===null)return;cc.call(this);}settle(a){return $c0C(153).call(this,a)}stand(e,t){return this.refillOwed=!1,q1.delete(e),q1.set(t,this),this.current=t,this.holdsReissue=!0,this.currentGeneration+=1,$B+=1,this.waitsForRoom=!1,e.destroy(),this.fill(t,e),!0}mint(e){let t=ybU(this.scope);try{let t=this.depths===0?this.make(this.device,e):Vm(this.depths,(()=>this.make(this.device,e)));if(q1.set(t,this),Mb6(t))s5.add(this);return t}finally{q5q(t)}}}var d5=(e)=>e.destroy(),RB=((e,t)=>e.createBuffer(t));function u5(e){return"mappedAtCreation"in e&&e.mappedAtCreation===!0?{...e,mappedAtCreation:!1}:e}var w5=((e,t)=>e.createTexture(t)),DI0=function(){};function Pw3(e){return{destroy:()=>e.release()}}var FU6=(function(e,t,r){return new sx$(e,t,r,RB)});var z$P=(function(e,t,r){return new sx$(e,t,r,w5)});function gQc(e,t,r,i){let n=(t)=>e.queue.writeTexture({texture:t},i,{},[1,1]),l=z$P(e,{label:t,size:[1,1],format:r,usage:6},n);return n(l.resource),l}var vyO=(function(){if(s5.size===0)return;dc();});var XB=new WeakSet;var J7o=(function(e){return XB.has(e)});function eB(e){XB.add(e)}function tWM(e,t=aOP){let r={},i=e.maxTextureArrayLayers;if(e3w(i)&&i>MB)r.maxTextureArrayLayers=Math.min(Xwf,Math.floor(i));let n=e.maxSampledTexturesPerShaderStage;if(typeof n==="number"&&n>GB)r.maxSampledTexturesPerShaderStage=Math.min(n,j1);let l=e.maxSamplersPerShaderStage;if(typeof l==="number"&&l>GB)r.maxSamplersPerShaderStage=Math.min(l,Il);let s=e.maxStorageBuffersPerShaderStage;if(typeof s==="number"&&s>Tl)r.maxStorageBuffersPerShaderStage=Math.min(s,X1);let o=Math.min(r.maxStorageBuffersPerShaderStage??Tl,X1),a=e.maxStorageBuffersInFragmentStage;if(typeof a==="number"&&a>Tl)r.maxStorageBuffersInFragmentStage=Math.min(a,o);let u=e.maxStorageBuffersInVertexStage;if(typeof u==="number"&&u>Tl)r.maxStorageBuffersInVertexStage=Math.min(u,o);let d=e.maxStorageBufferBindingSize;if(e3w(d)&&d>Vl)r.maxStorageBufferBindingSize=Math.min(Math.floor(d),t.bufferBytes);let f=e.maxBufferSize;if(e3w(f)&&f>t5)r.maxBufferSize=Math.min(Math.floor(f),t.bufferBytes);let c=e.maxComputeWorkgroupStorageSize;if(t.workgroupBytes!==void 0&&e3w(c)&&c>B5)r.maxComputeWorkgroupStorageSize=Math.min(Math.floor(c),t.workgroupBytes);return Object.keys(r).length>0?r:void 0}var iO8=(function(e){let v$21;{let t=Reflect.get(e,"spawnExecutor");v$21=typeof t==="object"&&t!==null?t:null;}if(v$21)return O5;return vsa()?zl:aOP});var p4w=(function(e){if(e.isFallback)return"fallback-flag";if(RsL(e.description))return"software-rasterizer";return null});var E1=(function(e){return p4w({isFallback:YK(e),description:b1(e)})!==null});var kO8=(function(e){return tZq(e)==="apple"});var F1=(e)=>/\bAndroid\b/.test(e??"");function sO8(e,t){if(/\bbifrost\b/i.test(e))return!0;return/\bvalhall\b/i.test(e)&&F1(t)}var FB=/\bgen-12hp\b/i,Nl=/\badreno-[67]xx\b|\bbifrost\b/i,r5=/\brdna-[14]\b/i,F5=/\bgcn-\d\b/i,S5=/^\s*(unknown)?\s*$/i,e1=/\bqualcomm\b/i,z1=/\badreno-\w+/i,ybd=155;function UXe(e){let t=/(?:Chrome|Chromium)\/(\d+)/.exec(e??"");return t===null?null:Number(t[1])}function ANF(e,t,r=!1){if(r)return{family:"compatibility"};if(t===void 0)return null;if(t.includes("Macintosh")&&CK(t))return{family:"chromium-on-macos"};let i=/\badreno-([67])xx\b/i.exec(e);if(i===null||!/\bAndroid\b/.test(t))return null;return i[1]==="7"?{family:"adreno-700-on-android",shape:"seam"}:{family:"adreno-600-on-android"}}var xB=148;var jO8=(function(e,t){if(t?.mode==="stream"||!CK(e)||!/\bWindows NT \d/.test(e??""))return!1;let r=UXe(e);return r!==null&&r<=xB});function xWM(e,t,r=!1){return!r&&/\badreno-7xx\b/i.test(e)&&F1(t)}var dWM=(function(e,t){return t&&e1.test(e)});var Z5=/\bgen-12lp\b/i;var zXp=(function(e,t){return tZq(e)==="intel"&&Z5.test(e)&&/Windows NT/.test(t??"")});function ZO8(e,t){return(e1.test(e)||z1.test(e))&&F1(t)}var G5=/\bAdreno \(TM\) 740\b/,Rl=/\barm\b/i,l5=/\bMali-G72\b/,e5=/\bgen-7\b/i,NB=/\b0x0[4acd][0-9a-f]{2}\b/i;function yYf(e,t,r=!1,i=void 0){if(r&&Rl.test(e)&&l5.test(i??""))return"mali-g72";if(tZq(e)==="intel"&&e5.test(e)&&NB.test(e)&&/\bWindows NT\b/.test(t??""))return"intel-haswell";if(!e1.test(e)||!G5.test(i??""))return null;return r||F1(t)?"adreno-740":null}function jWM(e,t){if(Nl.test(e))return!1;let r=e1.test(e)&&!z1.test(e);if((S5.test(e)||r)&&F1(t))return!1;let i=tZq(e),n=/Windows NT/.test(t??"");if(i==="amd"&&n&&(r5.test(e)||F5.test(e)))return!1;if(i!=="intel"||!n)return!0;return FB.test(e)}var W1="unknown";var RKN=(function(e,t){let r=e.trim();return/Windows NT/.test(t??"")&&(r.length===0||r===W1)});var KWM=(function(e,t){if(e.degradedReason!==null)return null;if(t?.hybridProof!=="proven"||!t.highPerformanceRendererRaw)return null;let r=tZq(e.description),i=tZq(t.highPerformanceRendererRaw);return r!==null&&i!==null&&r!==i?"integrated-likely-hybrid":null});var wB=(function(e,t){return Ul?null:KWM(e,t)});var Z1=new Set(["texture-compression-bc","texture-compression-etc2","texture-compression-astc"]);function oWM(e,t){return!t&&e.has(zB)?[zB]:[]}var q5="@compute @workgroup_size(1) fn c() {} @vertex fn v() -> @builtin(position) vec4f { return vec4f(0); } @fragment fn f() -> @location(0) vec4f { return vec4f(1); }";async function YO8(e){let t=[],r,i=()=>r??=e.createShaderModule({label:"lume bare probe",code:q5}),n,l=!1,s=async function(e,r){let i=Bra(),n=await Promise.resolve().then(r).then(()=>"",(e)=>` refused (${k$w(e)})`);if(n!=="")l=!0;t.push(`${e}${n} ${Math.round(Bra()-i)} ms`)};return await s("compute pipeline",()=>e.createComputePipelineAsync({label:"lume bare probe",layout:"auto",compute:{module:i()}})),await s("render pipeline",async function(){n=await e.createRenderPipelineAsync({layout:"auto",vertex:{module:i()},fragment:{module:i(),targets:[{format:"rgba8unorm"}]}})}),await s("submit",async function(){let t=e.createTexture({size:[1,1],format:"rgba8unorm",usage:16}),r=e.createCommandEncoder(),i=r.beginRenderPass({colorAttachments:[{view:t.createView(),loadOp:"clear",storeOp:"store"}]});if(n!==void 0)i.setPipeline(n),i.draw(3);i.end(),e.queue.submit([r.finish()]),await e.queue.onSubmittedWorkDone(),t.destroy()}),{words:t.join(", "),refused:l}}var XWM=(function(e,t=!1,r=null,i=!1){return o5.filter(((n)=>e.has(n)&&!(t&&(Z1.has(n)||n===zB))&&!((r!==null||i)&&n==="timestamp-query")))});var QB=[["maxColorAttachments",8,4],["maxComputeInvocationsPerWorkgroup",256,128],["maxComputeWorkgroupSizeX",256,128],["maxComputeWorkgroupSizeY",256,128],["maxInterStageShaderVariables",16,VsL],["maxStorageBuffersInVertexStage",8,0],["maxStorageBuffersInFragmentStage",8,4],["maxStorageTexturesInVertexStage",4,0],["maxStorageTexturesInFragmentStage",4,4],["maxTextureDimension1D",8192,4096],["maxTextureDimension2D",8192,rD3],["maxUniformBufferBindingSize",65536,16384]];function a5(e,t,r){let i=[];for(let n of t){let t=Reflect.get(e,n[0]);if(typeof t==="number"&&t<n[r])i.push(`${n[0]} ${t} < ${n[r]}`)}return i.length>0?i.join(", "):null}function MWM(e,t){let r={...t};for(let[t,i]of QB){let n=Reflect.get(e,t);if(!e3w(n))continue;r[t]=Math.max(r[t]??0,Math.min(Math.floor(n),i))}let i=r.maxSamplersPerShaderStage??GB;if(r.maxSampledTexturesPerShaderStage!==void 0&&r.maxSampledTexturesPerShaderStage>i)if(i>GB)r.maxSampledTexturesPerShaderStage=i;else delete r.maxSampledTexturesPerShaderStage;return r}var $l=8,Dl=[["maxStorageBuffersPerShaderStage",$l],["maxStorageBuffersInVertexStage",$l/2],["maxStorageBuffersInFragmentStage",$l/2]];function fWM(e){let t={...e};for(let[e,r]of Dl){let i=t[e];if(i!==void 0)t[e]=Math.min(i,r)}return t}var z5=[["maxComputeInvocationsPerWorkgroup",256],["maxComputeWorkgroupSizeX",256],["maxColorAttachments",8],["maxTextureDimension2D",8192],["maxInterStageShaderVariables",16]];function SO8(e){if(e.features.has(zB))return null;let t=a5(e.limits,z5,1);return t===null?null:`no ${zB}; ${t}`}var tO8=(function(e){let t=e??(typeof GPUTextureUsage<"u"?GPUTextureUsage:void 0);if(t===null||typeof t!=="object"&&typeof t!=="function")return!1;return Reflect.get(t,"TRANSIENT_ATTACHMENT")===32});async function Xl(e){let t=!1;try{e.pushErrorScope("validation"),t=!0;let r=e.createShaderModule({label:"lume fragmentless-bundle probe",code:"@vertex fn vs() -> @builtin(position) vec4f { return vec4f(0.0, 0.0, 0.0, 1.0); }"}),i=await e.createRenderPipelineAsync({label:"lume fragmentless-bundle probe",layout:"auto",vertex:{module:r,entryPoint:"vs"},depthStencil:{format:aqF,depthWriteEnabled:!0,depthCompare:d6}}),n=e.createRenderBundleEncoder({label:"lume fragmentless-bundle probe",colorFormats:[],depthStencilFormat:aqF});n.setPipeline(i),n.draw(3),n.finish(),t=!1;let l=await e.popErrorScope();if(l)return Fn.warn(`[lume] device rejects vertex-only pipelines in render bundles (${l.message}) \u2014 caster pipelines gain an empty fragment stage (WebKit bug 319980)`),!1;return!0}catch{if(t)try{e.popErrorScope().catch(function(){return})}catch{}return!0}}async function H9i(e,t){e.features.passBundles=t,e.features.fragmentlessBundles=t?await Xl(e.device):!0}function DbP(e){return`${(e/1048576).toFixed(1)}MB`}var mpH=(function(e){let t=[e.degradedReason?`degraded:${e.degradedReason}`:null,e.integratedHint,e.hybridProof==="proven"?"hybrid-proven":null].filter(((e)=>e!==null)),r=e.renderer!==void 0&&e.renderer!==e.description?` (${e.renderer})`:"";return`adapter: ${e.description}${r}${t.length>0?` [${t.join(", ")}]`:""}`});function EWM(a,b,c,d){return (EWM=$c0C(154)).call(this,a,b,c,d)}function b1(e){let{vendor:t,architecture:r,device:i,description:n}=nK(Reflect.get(e,"info"));return[t,r,i,n].filter((e)=>e.length>0).join(" ")||W1}var YWM=(function(e){if(e.degradedReason===null)return;let t=e.degradedReason==="fallback-flag"?"WebGPU fallback-adapter flag set":"adapter info names a software rasterizer",r=`browser granted a degraded graphics adapter \u2014 games will run slowly; restarting the browser usually fixes this. Adapter: ${e.description} (${t}). Device-local browser state \u2014 game content is not the cause.`;Fn.warn(`[lume] ${r}`),RwP({code:"renderer-degraded-adapter",key:"renderer-degraded-adapter",message:r,data:{adapter:e.description,reason:e.degradedReason}})});var U5=(function(e){if(e.integratedHint===null)return;Fn.info(`[lume] rendering on ${e.description} with ${e.hybridRenderers?.highPerformance??"a faster GPU"} idle \u2014 ${DG}`)});class f9f extends Error{constructor(){super("lume: WebGPU adapter request returned null");this.name="LumeAdapterUnavailableError"}}function qZp(e){return e instanceof f9f}class BKH extends f9f{constructor(e){var $lpt7;super(),"description"in this?$lpd0(this,"description",void 0):this.description=void 0;this.name="LumeSoftwareAdapterHeldError",this.message=`lume: WebGPU adapter request returned a software adapter (${e}) to an ask for hardware`,this.description=e}}var eWM=(function(e,t,r){if(e===!0&&t!==null)throw new BKH(r)});class JB extends Error{constructor(){super("lume: this device needs the storage mirror, and this caller carries no load for it: the renderer's init acquires the device with it");this.name="LumeStorageMirrorUnloadedError"}}class h5 extends Error{constructor(){super("lume: this compatibility device needs the uniform twins, and this caller carries no load for them: the renderer's init acquires the device with them");this.name="LumeUniformTwinsUnloadedError"}}class K1 extends Error{constructor(e,t){var $lpt8;super(t),"reason"in this?$lpd0(this,"reason",void 0):this.reason=void 0;this.reason=e,this.name="LumeGpuUnavailableError"}}function lAd(e){return e instanceof K1}var zWM=(async function(e,t){let r={},i=[];try{return{device:await ZsL((async function(t){let{requiredFeatures:i,requiredLimits:n,...l}=t,s={...l,...i===void 0?{}:{requiredFeatures:Array.from(i)},...n===void 0?{}:{requiredLimits:{...n}}},o=await d$(e.requestDevice(s));GO8(o);hYP();r=s;return o}),t,function(e){i.push(e),Fn.warn(`[lume] ${e}`)}),grantedRequest:r}}catch(e){throw new CcB(i,e)}});class CcB extends Error{constructor(e,t){var $lpt9;super(k$w(t)),"rungs"in this?$lpd0(this,"rungs",void 0):this.rungs=void 0,"last"in this?$lpd0(this,"last",void 0):this.last=void 0;if(this.rungs=e,this.name="LumeDeviceMintRefusedError",this.last=qsL(t),t instanceof Error&&t.stack!==void 0)this.stack=t.stack}}function Q$q(e){return e instanceof CcB}class H5 extends Error{constructor(e,t="WebGPU compatibility-mode device"){var $lpta;super(`lume: this ${t} is below lume's floor (${e})`),"proof"in this?$lpd0(this,"proof",void 0):this.proof=void 0;this.proof=e,this.name="LumeBelowFloorError"}}function N3m(e){return e instanceof H5}var J1=["maxStorageBuffersPerShaderStage","maxStorageTexturesPerShaderStage"];function DWM(e){return[...QB.map(([e])=>e),...J1].map((t)=>`${t} ${String(Reflect.get(e.limits,t))}`).join(", ")}class Nsu extends Error{constructor(){super("the browser's graphics stopped under the page and will not restart where this tab was drawing; the drawing restarts afresh");this.name="LumeRealmGpuGoneError"}}function Uwn(e){return e instanceof Nsu}var YB=new WeakMap;var p5=(function(e){let t=YB.get(e);if(t!==void 0)return t;let r=e.getContext("webgpu");if(!r)throw new K1("no-context","lume: OffscreenCanvas did not provide a webgpu context");return YB.set(e,r),r});function QLt(){if(typeof OffscreenCanvas>"u")return null;try{return new OffscreenCanvas(1,1).getContext("webgpu")!==null}catch{return null}}var l1=(function(e,t,r,i=null,n=t){if(e.count===0){return vWM(e,t,n,r,i);}e.count-=1;let l=e.list[e.count];return l.ordinal=t,l.first=n,l});var vWM=(function(e,t,r,i,n){let l={ordinal:t,first:r,answered:(function(t){let{ordinal:r,first:n}=l;e.list[e.count++]=l,i(r,t,n)}),lost:function(){let t=l.ordinal;e.list[e.count++]=l,n?.(t)}};return l});var PB=Object.freeze({powerPreference:"low-power",featureLevel:"core"}),R1=Object.freeze([{width:1920,height:1080},{width:1920,height:993},{width:1366,height:768}]),Ul=!1,o1=null;function _Mo(){return o1}var M5=(function(e){if(e.headset)return{...sK,xrCompatible:!0};return Ul?PB:sK});function _WM(e,t,r){if(r!==sK||t.hostProfile!==void 0||typeof OffscreenCanvas!=="function")return null;if(!NVe(t.userAgent??globalThis.navigator?.userAgent))return null;return()=>kK(e,PB)}var UB=(e,t)=>new OffscreenCanvas(e,t);function $WM(a,b){return ($WM=$c0C(155)).call(this,a,b)}var gB=new WeakMap;var b8d=(function(e,t){let r=gB.get(e);if(r===void 0)return null;return r.push(t),()=>YNM(r,t)});function LO8(e){Ji(e,"createRenderPipelineAsync",(e)=>(t)=>oW(e(t))),Ji(e,"createComputePipelineAsync",(e)=>(t)=>oW(e(t)))}var yl=null;var ElH=(function(e){yl=e});var s1=null;var Eg5=(function(e){s1=e});var m1=(function(e){let t=yl;yl=null,s1=null,t?.(e)}),C5=function(){let e=s1;s1=null,e?.()};async function JO8(e,t,r,i,n,l,s,o){let a,u=null,d=!1,f=null,c=null,h=0;try{let l=t.xrCompatible===!0?{...KK,xrCompatible:!0}:KK;a=await hsL(async function(){h+=1,d=!1,f=null,u=null,c=null;let a=h===1&&n!==null?await mO8(n):null,p=a!==null?a.core:await e.requestAdapter(t),m=p?await rsL(p,E1,()=>e.requestAdapter(l)):{adapter:a!==null?a.compat:await e.requestAdapter(l),compatibility:!0};if(m.adapter===null){if(h===1&&r&&a?.said!==!0){C5();}return null}let g=p&&m.compatibility?p:null,y=i===void 0||!(s||m.compatibility||VK(m.adapter))?null:await HWM(e,t,m.adapter,g,i,o);if(y!==null)return u=b1(m.adapter),y;if(s&&!E1(m.adapter))return c={adapter:m.adapter,compatibility:m.compatibility,over:g},null;return d=m.compatibility,f=g,m.adapter},r)}catch(e){throw m1({kind:"refused",error:e instanceof Error?{name:e.name,message:e.message}:{name:"Error",message:String(e)}}),e}let{attempts:p}=a,m=a.adapter;if(!m&&c!==null)({adapter:m,compatibility:d,over:f}=c);if(!m){if(await o(null))throw new H5("the browser answers no adapter, and this page lost its device inside the bare probe on a GPU beside which it has no software adapter (stand-lost record)","GPU");throw m1({kind:"null",attempts:p}),new f9f}if(l!==null&&!d&&u===null&&!E1(m)){let r=await uO8(e,t,m,l);return AB(r,p,!1),{adapter:r,attempts:p,compatibility:d,passedOver:f}}return AB(m,p,d),{adapter:m,attempts:p,compatibility:d,passedOver:f,...u===null?{}:{roadGaveOn:u}}}async function uO8(e,t,r,i){let n=await i();if(o1=null,n===null)return o1="the low-power ask answered no adapter",r;let l=b1(n);if(E1(n)||l===b1(r))return o1=`the low-power ask answered ${E1(n)?"a software adapter":"the same GPU"} (${l})`,r;let s=TO8();if(zO8(s,r,n))return Ul=!0,Fn.warn(`[lume] the compositor draws on ${s}, another GPU than ${b1(r)}, so every canvas texture of this device would cross GPUs: this realm stands on the low-power adapter, ${l}, the compositor's GPU, and presents through the canvas.`),n;let o=null;try{o=await r.requestDevice({label:"lume compositor proof"})}catch{}let a=o===null?null:await $WM(o,k1(e));if(o?.destroy(),a===null)return o1=`the low-power adapter ${l} is another GPU, and ${o===null?"the engine's adapter minted no proof device":`the realm's canvases took the device at ${R1.map((e)=>`${e.width}x${e.height}`).join(", ")}`} (the compositor's name: ${s??"unread"})`,await kK(e,t)??n;return Ul=!0,Fn.warn(`[lume] ${b1(r)} cannot present through a canvas (the device's words: ${a.slice(0,240)}). The compositor's canvases live on another GPU, so this realm stands on the low-power adapter, ${l}, and presents through the canvas.`),n}function TO8(){return (TO8=$c0C(156)).call(this)}function zO8(e,t,r){let i=e===null?null:tZq(e);return i!==null&&i===tZq(b1(r))&&i!==tZq(b1(t))}var AB=(function(e,t,r){let i=nK(e.info);m1({kind:"adapter",info:{vendor:i.vendor,architecture:i.architecture,device:i.device,description:i.description},isFallbackAdapter:YK(e),attempts:t,...r?{compatibility:NsL(e)}:{}})});var mO8=(async function(e){let t=await e;if(typeof t!=="object"||t===null)return{core:null,compat:null,said:!1};let r=Reflect.get(t,"core"),i=Reflect.get(t,"compat");return{core:(typeof r==="object"&&r!==null&&typeof Reflect.get(r,"requestDevice")==="function")?r:null,compat:(typeof i==="object"&&i!==null&&typeof Reflect.get(i,"requestDevice")==="function")?i:null,said:Reflect.get(t,"said")===!0}});async function HWM(e,t,r,i,n,l){if(E1(r))return null;let s=b1(r);if(!n(s))return null;let o=(i!==null&&E1(i)?i:null)??await kK(e,{...t,forceFallbackAdapter:!0});if(o===null||!E1(o)||await l(o))return Fn.warn(`[lume] the road gave on ${s} under this browser, and no software adapter clears the floor: lume stands on ${s} as before`),null;return Fn.info(`[lume] the road handed back: ${s} hung twice at its lowest picture on this road under this browser, so this boot stands on ${b1(o)}, the road it held before`),o}function rWM(e){let t=Reflect.get(e,"info"),r={};for(let e of["backend","driver"]){let i=typeof t==="object"&&t!==null?Reflect.get(t,e):void 0;if(typeof i==="string"&&i.length>0)r[e]=i}return r}var k1=(function(e){return typeof e.getPreferredCanvasFormat==="function"?e.getPreferredCanvasFormat():"bgra8unorm"});var wWM=(async function(e,t,r){if(!oV(e.limits,t))return null;if(r===void 0)throw e.destroy(),new JB;try{return await r()}catch(t){throw e.destroy(),t}});function VO8(e,t,r,i,n,l,s,o,a,u,d){if(o){I9t(e);}if(t.compatibility){BP0(e);if(!d){FS5(e,rO8,FU6,z$P,fO8,Bra);}ZP0(e,u)}let f=t.buildsBlockSubmits&&!t.buildsOnPresentThread;mEm(e,{webkit:f,browser:!r.gpu&&!r.hostProfile,now:Bra});if(f){iTO(e,{adapterOptions:M5(r),requiredFeatures:Array.from(i.requiredFeatures??[]),requiredLimits:{...i.requiredLimits}},{usedModuleMissesCache:s.usedModuleMissesCache});}if(s.overridesInText){ZVq(e);}a3(e);if(s.overridesInText){HVq(e);}vOL(e,r.gpuWork===!0,Bra);Xp_(e,t.compatibility);if(t.compatibility){uP0(e);}if(t.rg11b10ufloatRenderable){XUu(e);}tDv(e);n?.installStorageMirror(e,void 0,l,Bra);a?.installUniformTwins(e);{let e$1=e.limits?.maxUniformBufferBindingSize??1/0;{let e=e$1;aG=e}}}var _O8=(function(e,t){return t&&(!e.features.has(zB)||VK(e))});var HO8=(function(e,t,r){if(!r)return t;let i=MWM(e.limits,t);return VK(e)?fWM(i):i});function pWM(e,t,r){if(!r&&SO8(e)===null)return!1;let i=(a5((e.limits),QB,2));if(i!==null)throw e.destroy(),new H5(i);Fn.warn(`[lume] WebGPU compatibility-mode device on ${mpH(t)}: lume draws on its compatibility roads (${DWM(e)})`);return !0}function CO8(e,t,r){let i=(function(e){try{let t=e?.vertex;return t===void 0?null:Xww(t.buffers)}catch{return null}});Ji(e,"createRenderPipeline",(e)=>function(n){let l=e(n);Qj(l,n);r?.notePipeline(l,n,!0);t.notePipeline(l,i(n));return l});Ji(e,"createRenderPipelineAsync",(e)=>function(n){let l=i(n);let s=e(n);s.then((function(e){if(Qj(e,n),r?.notePipeline(e,n),l!==null)t.notePipeline(e,l)}),function(){return});return NO8(s,r?.toggleReady(n)??null)})}var NO8=(function(e,t){if(t===null)return e;return e.then(async function(e){return await t,e})});var E5=(function(e,t,r){return t&&!(r===void 0&&oV(e.limits,!0))});var IB=new WeakMap;var LWM=(function(e,t){let r=IB.get(e);if(r?.adapter===t)return r;let i={adapter:t,depth:{},copy:{}};return IB.set(e,i),i});var Fl=(e)=>e?` (${Mu})`:"",b5=null;function QbW(){return b5}var tHC=(function(e){let t=e.canaries.filter(((e)=>e.ms>=0.5||e.kept)),r=t.length===0?"":`, canaries ${Math.round(t.reduce(((e,t)=>e+t.ms),0))} ms (${t.map(((e)=>`${e.name} ${e.kept?"kept":`${Math.round(e.ms)} ms`}`)).join(", ")})`;return`the device stood in ${Math.round(e.totalMs)} ms: adapter ${Math.round(e.adapterMs)} ms, device ${Math.round(e.deviceMs)} ms${r}, doors ${Math.round(e.doorsMs)} ms`});async function BO8(e,t,r,i){if(!E5(e,t,r))return;let n=i.link??await o3A(e);Fn.warn(`[lume] compatibility link canary: ${n}${Fl(i.link!==void 0)}`);if(n!=="unknown")i.link=n;if(n!=="drops-links")return;throw e.destroy(),new H5($u)}var gO8=(async function(e,t,r,i){if(!E5(e,t,r))return!0;if(i.link!=="links")return Fn.warn(`[lume] compatibility uniform index canary: not asked, the link canary read ${i.link??"unknown"}`),!0;let n=i.index??await B5n(e);Fn.warn(`[lume] compatibility uniform index canary: ${n}${Fl(i.index!==void 0)}`);if(n!=="unknown")i.index=n;return n!=="links"});async function VWM(e){if(e===void 0)return null;try{return await e()}catch(e){return Fn.warn(`[lume] the uniform twins' chunk did not load (${k$w(e)})`),null}}async function GWM(e,t,r,i,n){if(!i||!E5(e,t,r.storageMirror))return null;let l=n.uniform??await UFA(e);Fn.warn(`[lume] compatibility uniform copy canary: ${l}${Fl(n.uniform!==void 0)}`);if(l!=="unknown")n.uniform=l;if(l!=="loses"&&l!=="whole-writes")return null;if(l==="whole-writes"&&r.uniformTwins===void 0)throw e.destroy(),new h5;let s=l==="whole-writes"?await VWM(r.uniformTwins):null;if(s!==null)return s;throw e.destroy(),new H5(fO)}var pO8=(function(e,t){if(t===null||typeof e.createBindGroupLayout!=="function")return;let r=e.createBindGroupLayout.bind(e);e.createBindGroupLayout=function(e){let i=r(e);return t.noteLayout(i,e),i}});async function gWM(e,t){let r=await hWM(e,t),i=b2(r);if(i!==null)Fn.warn(i);let n=r.render==="sticks",l=r.compute==="sticks";if(!n&&!l)return null;let s=new fKd(e,n,l,Bra);return await s.ready,s}function VB(e){return`${b1(e)}|${String(YK(e))}`}function XO8(e,t,r,i,n){let l=cF(r,`${i}|${String(n)}`,"range latch");let s=cF(r,i,"drew");let o=cF(r,i,"floor stood");let a=t.has(s)||t.has(o)?null:cF(r,i,eF);return{marks:e,step:l,drew:t.has(s)?null:s,bare:t.has(l),floor:a,floorStood:o,armed:null,gone:!1}}function MO8(e,t,r){e.onFirstToggle=function(){e.onFirstToggle=null,Y5(t,r,()=>r.armed=null)}}function Y5(e,t,r){let i=()=>e.queue.onSubmittedWorkDone();i().then(i).then(i).then(function(){if(!t.gone)r()},function(){return})}var nl=new WeakMap;function Zzg(e){let t=nl.get(e);if(nl.delete(e),t!==void 0)Y5(e,t,function(){if(t.drew!==null)bF(t.drew)})}async function hWM(e,t){let r=await t.marks,i=`${t.step} read `,n=[...r].find((e)=>e.startsWith(i));if(n!==void 0){let[e,r]=n.slice(i.length).split(" "),l={render:e==="sticks"?"sticks":"holds",compute:r==="sticks"?"sticks":"holds"};return t.armed=t.bare||b2(l)===null?null:t.step,l}if(t.bare)return Fn.warn("[lume] storage range canary: not run, no latch: the device stands bare, since one on this browser and adapter was lost at an earlier stand (stand-lost record)"),{render:"holds",compute:"holds"};t.armed=t.step;let l=await HKd(e);if(!t.gone&&l.render!=="unknown")bF(`${i}${l.render} ${l.compute}`);return l}function TWM(a,b,c){return (TWM=$c0C(157)).call(this,a,b,c)}var vl=!1;async function iWM(e){let t=await e?.stand();if(!t?.waitedOn||vl)return;vl=!0,Fn.info(`[lume] gpu_hold_stood waited_on=${t.waitedOn} waited_ms=${Math.round(t.waitedMs)}: ${t.waitedOn} realm(s) of this browser that held the removed D3D12 device ended before this realm's first WebGPU ask`)}var eO8=(function(e){if(e.wordPollHost!==void 0)return e.wordPollHost;return e.gpu===void 0?y1r():K4});var I1=33554432,el=function(){try{new ArrayBuffer(I1)}catch{}};var cO8=(function(e,t,r,i){if(typeof e.createBindGroup!=="function"||r||!pmN(t)||eZu(e))return;let n=e.createBindGroup.bind(e);return{createBindGroup:function(e){return i().close(),n(e)},askCollector:el}});var DO8=(function(e,t,r,i,n,l){if(n||i.isFallback||i.description===W1||tZq(i.description)==="intel"&&/Windows NT/.test(l??""))return;let s=M5(t),o={};for(let[e,t]of Object.entries(r.requiredLimits??{}))if(typeof t==="number")o[e]=t;return{device:async function(){let t=await d$(kK(e,s));if(t===null)throw Error("the browser gave no second adapter");let n=b1(t);if(n!==i.description)throw Error(`the second adapter is ${n}, not this device's ${i.description}`);return d$(t.requestDevice(r))},ask:{adapterOptions:{...s},request:{requiredFeatures:Array.from(r.requiredFeatures??[],String),requiredLimits:o},adapter:i.description}}});async function af1(e={},t){let r=Bra();let i=Df3();let n=e.userAgent??globalThis.navigator?.userAgent;let l=If3(n);let s=async(e)=>Uf3(await i,l,e===null?null:VB(e),ckJ.marks);e.onStandStep?.("adapter");let o=e.gpu??globalThis.navigator?.gpu;if(!o)throw m1({kind:"absent"}),new K1("no-api","lume: WebGPU is unavailable \u2014 no navigator.gpu and no injected GPU implementation");if(e.gpu===void 0&&t===void 0)await iWM(cRl());let a=M5(e);let u=t??await JO8(o,a,e.adapterBootRace!==!1,e.standRoad===!0?()=>!0:e.roadGave,e.gpu===void 0&&a===sK?qN("answer"):null,_WM(o,e,a),e.standRoad===!0,s);let d=Bra();if(u.passedOver!==null)return TWM(e,u,u.passedOver);let{adapter:f,attempts:c,compatibility:h}=u;if(c>1)Fn.warn(`[lume] adapter request needed retry (attempt ${c}) \u2014 Dawn/Vulkan boot race (null adapter on a fresh GPU process)`);let p=b1(f);let m=YK(f);let g=p4w({isFallback:m,description:p});let y=VB(f);let v=await i;if(await s(f)){if(e.standRoad!==!0)return Fn.warn(`[lume] no device asked of ${p}: this browser lost one there inside the emptiest work (stand-lost record), so the device is asked of the software adapter alone`),af1({...e,standRoad:!0,refuseSoftwareAdapter:!1});if(!E1(f)&&WB&&g1<r){QF(l,y);}throw new H5(`${p}: this browser lost a device on it inside an empty compute pipeline, an empty render pipeline and a one-texel pass, and has no software adapter (stand-lost record)`,"GPU")}if(u.roadGaveOn===void 0){eWM(e.refuseSoftwareAdapter,g,p);}let w=(function(){let t=pN4()?.gpu;return e.hybridGpu??(t?.hybridProof!==void 0?{hybridProof:t.hybridProof,lowPowerRendererRaw:t.lowPowerRendererRaw??null,highPerformanceRendererRaw:t.highPerformanceRendererRaw??null}:null)});let b=w();let k=(function(){let e=pN4()?.gpu.rendererRaw;return e?ubP(e):void 0});let x=k();let M=Reflect.get(f.limits,"maxBufferSize");let S={description:p,isFallback:m,degradedReason:g,integratedHint:wB({description:p,degradedReason:g},b),hybridProof:b?.hybridProof??"unproven",hybridRenderers:b?{lowPower:b.lowPowerRendererRaw,highPerformance:b.highPerformanceRendererRaw}:null,formatsTier1:f.features.has("texture-formats-tier1"),...e3w(M)&&M>0?{largestBufferBytes:Math.floor(M)}:{},...x!==void 0?{renderer:x}:{},architecture:nK(f.info).architecture,...rWM(f),...u.roadGaveOn===void 0?{}:{roadGaveOn:u.roadGaveOn}};YWM(S);U5(S);let I=(function(){if(S.renderer===void 0){let e=k();if(e!==void 0)S.renderer=e}let e=w();if(e===null||b!==null&&e.hybridProof===b.hybridProof&&e.lowPowerRendererRaw===b.lowPowerRendererRaw&&e.highPerformanceRendererRaw===b.highPerformanceRendererRaw)return;let t=S.integratedHint;b=e;S.integratedHint=wB({description:p,degradedReason:g},b);S.hybridProof=b.hybridProof;S.hybridRenderers={lowPower:b.lowPowerRendererRaw,highPerformance:b.highPerformanceRendererRaw};if(S.integratedHint!==t)U5(S)});let R=e.label??"lume";let A=tWM(f.limits,iO8(f))??{};let $=_O8(f,h);let z=`${y}|${String($)}`;let O=XO8(i,v,l,y,$);let T=O.bare;let C={...HO8(f,A,$),...e.requiredLimits??{}};let N=T?oWM(f.features,$):XWM(f.features,$,g,e.refuseTimestamps===!0);e.onStandStep?.("mint");let{device:j,grantedRequest:P}=await zWM(f,{label:R,requiredFeatures:N,requiredLimits:C}),E=Bra(),F={step:"mint",lostAt:null,kept:""},W=function(e){if(e===null||!WB||g1>=r)return;let t=e.slice(e.lastIndexOf("|")+1);F.kept=`; the stand-lost record keeps "${t}"`,bF(e).then((e)=>Fn.warn(`[lume] stand-lost record write of "${t}": ${e}`))};j.lost.then(function(e){if(O.gone=!0,F.step!==null)F.lostAt=F.step;if(O.drew!==null&&e.reason!=="destroyed")W(O.armed)});let B=pWM(j,S,$);let _=UJx(j,{description:p,renderer:S.renderer,userAgent:n,compatibility:B});let q=LWM(o,z);let L=[];let D=async function(t,r,i){F.step=t,e.onStandStep?.(t);let n=Bra(),l=await i();return L.push({name:t,ms:Bra()-n,kept:r}),l};let V=yMv(j,f.info);await D("link",q.link!==void 0,(()=>BO8(j,B,e.storageMirror,q)));let H=await D("uniform index",q.index!==void 0,(()=>gO8(j,B,e.storageMirror,q))),U=await D("uniform copy",q.uniform!==void 0,(()=>GWM(j,B,e,u.softwareBehind===!0,q))),K=await D("depth word",q.depth.answer!==void 0,(()=>ONQ(j,B,q.depth)));await D("texture copy",q.copy.answer!==void 0,(()=>TTZ(j,E5(j,B,e.storageMirror),q.copy)));let Y=await D("range latch",!1,()=>gWM(j,O));nl.set(j,O);if(T){await j.queue.onSubmittedWorkDone().catch(function(){return});let t=O.gone||e.pageLostDeviceUnderWork===!0?null:O.floor,r=await D("bare probe",!1,()=>YO8(j)),i=!r.refused&&!O.gone;if(r.refused&&O.gone)W(t);if(Fn.warn(`[lume] the bare stand's probe: ${r.words}${O.gone?"; the device was lost during it":""}${t!==null&&i?"; it stood":F.kept}`),i&&O.floor!==null)bF(O.floorStood)}else if(Y!==null){MO8(Y,j,O);}else O.armed=null;let G=Bra();F.step="doors";if(T){UMQ(j);}else {JMQ(j,n);}await D("subgroup pin",!1,()=>V);let X=await D("storage room",!1,()=>roq(j));if(X!==null)Fn.warn(`[lume] ${X}`);let Z=T?void 0:DO8(o,e,P,S,$,n);rwC(j,n,e,void 0,Z?.device,Z?.ask);sK_(j,g,Bra);tAM(j);_2I(j);poq(j);let J=Bra();F.step=null,b5={adapterMs:d-r,deviceMs:E-d,canaries:L,doorsMs:J-G,totalMs:J-r},aQ(j,B),Fn.info(`[lume] GPU device acquired \u2014 ${mpH(S)}; ${tHC(b5)}; ${bmw()?"the cloud sea reads the dome's map":"the cloud sea draws its slice"}${T?"; stood bare after a loss at an earlier stand (stand-lost record)":""}`);let Q=oFx(ja(e.hostProfile,n),_);let et=hFx(e.hostProfile,n);let tt=VFx(g!==null,Q,et);let rt=!Q.passBundles||(q.bundle??=await Xl(j));let it={timestampQuery:j.features.has("timestamp-query")&&Q.timestampClock,textureCompressionBc:j.features.has("texture-compression-bc"),textureCompressionEtc2:j.features.has("texture-compression-etc2"),textureCompressionAstc:j.features.has("texture-compression-astc"),indirectFirstInstance:j.features.has("indirect-first-instance"),shaderF16:j.features.has("shader-f16"),rg11b10ufloatRenderable:j.features.has("rg11b10ufloat-renderable"),transientAttachments:tO8(e.textureUsage),fragmentlessBundles:rt,passBundles:Q.passBundles,instanceRateVertexFetch:e.instanceRateVertexFetch??Q.instanceRateVertexFetch,buildsBlockSubmits:Q.buildsBlockSubmits&&!tt,buildsBlockSubmitsPinned:et,cpuBuildsBesideSubmits:tt,buildsOnPresentThread:Q.buildsOnPresentThread,mappedRangeIsRoundTrip:Q.mappedRangeIsRoundTrip,externalCopyReadsBack:Q.externalCopyReadsBack,depthReadInPlace:Q.depthReadInPlace,undecodedViews:Q.undecodedViews&&!B,hiddenSurfaceRemoval:kO8(p),canvasTakesFinishedCopies:sO8(p,n),indirectDraws:e.indirectDraws??e.hostProfile?.indirectDraws??jWM(p,n),multiPassPackets:e.multiPassPackets===!0,packetShape:e.packetShape,compatibility:B};VO8(j,it,e,P,await wWM(j,it.compatibility,e.storageMirror),dWM(p,it.compatibility),Q,K.fragmentDepth,U,H,VK(f));if(!e.gpu&&!e.hostProfile)WsL();wd2(j,it.depthReadInPlace);P2I({convicted:!it.instanceRateVertexFetch,throwOnViolation:e.throwOnIndirectLayoutViolation===!0});GWN(jO8(n,e.hostProfile));F4a(j.limits,it.compatibility);peR({convicted:!it.indirectDraws,newDevice:!0,hostSaid:e.indirectDraws===void 0&&e.hostProfile?.indirectDraws===!1});sCR(j);W6k(j,it.multiPassPackets,it.compatibility?"seam":it.packetShape);gCQ(ZO8(p,n));sPu(j,xWM(p,n,B));let nt=e.headset?.presentFormat(j)??k1(o);let lt=new Map;let ot=function(t){if(t.type==="validation")Cj(t.message);let v$31;st:{let e$51=t.message;{let e=e$51;let t=(e.replace(/"[^"\n]*"|'[^'\n]*'/g,'""').replace(/\d+/g,"#"));let r=(lt.get(t)??0)+1;if(lt.set(t,r),!/^10*$/.test(String(r))){v$31=null;break st;}v$31=`${e} (echo ${r} of this word on this device, said at echo 1, 10, 100, 1000 \u2026)`;}}let r=v$31;if(r!==null)Fn.warn(`[lume] GPU ${t.type} error: ${r}`);e.onError?.(t)};let at=function at(a){return (at.$h??=$c0C(158)(ot,e)).call(this,a)};let ut=JWM(j,n,e.hostProfile,at);Pl.set(j,at);let dt=!1;j.lost.then(function(t){eB(j);if(dt)return;let v$20;$O8:{let e$32=t,t$23=pmN(n)&&e.hostProfile?.mode!=="stream";{let e=e$32,t=t$23;if(e.message!==""||!t){v$20=e.message;break $O8;}if(e.reason==="destroyed"){v$20=x5;break $O8;}if(e.reason==="unknown"){v$20=pl;break $O8;}v$20=e.message;}}let r=`${v$20}${FO8(F.lostAt,j)}`;Fn.error(`[lume] GPU device lost (${t.reason}; ${Y_H(r)}; ${r}${F.kept}; ${EWM(S,ft.info(),C5X(j),{bytes:ft.bufferBytesByKind(),count:ft.buffersByKind()})})`);e.onDeviceLost?.({reason:t.reason,message:r})});let ft=zLC();let ct=zww({device:j,listens:e.gpuWork===!0,throwOnDeadBind:e.throwOnDeadBind===!0,turnViews:cO8(j,n,e.hostProfile?.mode==="stream",()=>St),report:(e)=>Fn.warn(e),finishing:(()=>St.close()),retirementDone:(async function(){if(typeof j.queue.onSubmittedWorkDone!=="function")return;try{await j.queue.onSubmittedWorkDone()}catch{await j.lost}})});j.lost.then(()=>ft.dispose());let ht=CWM();let pt=mWM();let mt=!1;let gt=-1;X5.set(j,ht),T4L.set(j,ft);let yt=typeof j.pushErrorScope==="function"&&typeof j.popErrorScope==="function";JrI(_1);let vt={submits:0,families:new Set};let wt=(t,r,i,n,l)=>(wt=$c0C(159)(e))(t,r,i,n,l);let bt=(function(e){if(_1.size===0)return;let t=J5(e);let r=_1.get(t);if(r===void 0)return;if(_1.delete(t),Fn.warn(`[lume] GPU allocation stood again: ${e}, after ${r.refusals} refusal${r.refusals===1?"":"s"} over ${((Bra()-r.sinceMs)/1000).toFixed(1)} s`),_1.size>0||vt.submits===0)return;Fn.warn(`[lume] the queue rejected ${vt.submits} submit${vt.submits===1?"":"s"} while the device refused allocations (${vt.families.size} distinct refusal${vt.families.size===1?"":"s"}, each said once)`),vt.submits=0,vt.families.clear()});let kt=yt?j.pushErrorScope.bind(j):null;let xt=v$(j);let Mt=yt?WO8(j,xt):null;let St={open:!1,rows:[],close:(function(){if(St.open){zt()}})};let It=RO8(j);let At=function(){St.close();return (It.open?Bra():-1)};let $t=(function(){if(St.open||kt===null)return;St.open=!0,kt("out-of-memory"),kt("validation"),queueMicrotask(St.close)});let zt=function(){if(!St.open||Mt===null)return;St.open=!1;let e=St.rows;St.rows=[];let t=Mt(),r=Mt();Promise.all([t,r]).then(function([t,r]){if(e.length!==1&&(t!==null||r!==null)){Tt(e,t,r);}else {for(let i of e){{let e=i.resource;if(i1.delete(e))C1-=1}let e=r??i.refused;if(t===null&&e===null)bt(i.label);else wt(i.resource,i.label,i.bytes,"validation",i.diagnostic)(t),wt(i.resource,i.label,i.bytes,"oom",i.diagnostic)(e);Sl:{let e=i.resource;if(!Mb6(e)){IWM:{if(sl.length===0)break IWM;Zb();}}let t=d1.get(e);if(t===void 0)break Sl;d1.delete(e);for(let e of t)e()}}}},Ct)};let Ot=wO8(j);let Tt=function(e,t,r){let i=r??t;if(i===null||kt===null||Mt===null)return;let n=r!==null?"oom":"validation",l=e.length,s=!1,o=e.length>0&&e.every((e)=>e.diagnostic),a=function(){if(l-=1,l===0&&!s&&!o)ot({type:n==="oom"?"out-of-memory":"validation",message:i.message})};if(e.length===0)l=1;for(let t of e){kt("validation");let e=!1;try{e=Ot(t)}catch{e=!1}Mt().then(function(r){{let e=t.resource;if(i1.delete(e))C1-=1}if(r!==null||!e)s=!0,wt(t.resource,t.label,t.bytes,n,t.diagnostic)(i);else if(t.refused!==null)wt(t.resource,t.label,t.bytes,"oom",t.diagnostic)(t.refused);else bt(t.label);Sl$:{let e$33=t.resource;{let e=e$33;if(!Mb6(e)){IWM$:{if(sl.length===0)break IWM$;Zb();}}let t=d1.get(e);if(t===void 0)break Sl$;d1.delete(e);for(let e of t)e()}}a()},Ct)}if(e.length===0){a()}};let Ct=function(){return};let Nt=(function(e,t){return pt.drop(e),rB(e,t)});let jt=Uhq(j);let Pt=ta5(j);let Et=dvF(j);let Ft=(function(){let e=((this))[gl];if(!e?.live)return;e.live=!1;ht.drop(e.ref);ct.retire(this,(()=>{if(jt!==null)jt.retire(this);if(Pt!==null)Pt.retire(this);return Nt(e,this)}),(()=>ft.noteBufferDestroyed(e.bytes,e.usage,e.label,e.scope)));return});let Wt=function(){let e=((this))[gl];if(!e?.live)return;e.live=!1;Et?.drop(this);ct.retire(this,()=>(W5.has((this)))?pt.drop(e):Nt(e,this),(()=>ft.noteTextureDestroyed(e.bytes,e.label,e.scope,e.kind??void 0,e.format)));return};let Bt=(function(e,t,r){let i=((this))[gl];let n=i?.nativeMap;if(i===void 0||n===null||n===void 0)throw TypeError("lume: a map on a buffer whose map the device never read");let l=i.map!==null&&(i.waiting!==null||Reflect.get(this,"mapState")==="pending");let s;let o=i.waiting===null?Vn(j,e):null;if(i.waiting!==null){s=ec(s)}else if(o===null)s=L5(n,this,e,t,r);else {s=EO8(i,o,n,this,e,t,r);}if(!l)i.map=s;{let e=j,t=s;let r=g4.get(e);return r===void 0?t:U1r(r,t)}});let _t=function(){return $c0C(160).call(this)};let qt=eZu(j);let Lt=j.createBuffer.bind(j);let Dt=LD$(j);J1r(j,j.queue.submit.bind(j.queue),Lt,ja(e.hostProfile,n).wordsAwaitPoll,eO8(e),(()=>C5X(j)>r1h(j)));j.createBuffer=function(e){let t=(It.open?Bra():-1);try{if(yt)$t();let v$12;oOL:{let e$20=Dt,t$17=e;{let e=e$20,t=t$17;if(e?.listens!==!0||(t.usage&HN)===0||(t.usage&EN)!==0){v$12=t;break oOL;}v$12={...t,usage:t.usage|EN};}}let t=v$12;let r=jt===null?t:jt.bufferDescriptor(t);let i=Pt===null?r:Pt.bufferDescriptor(r);let n=Lt(i);if(Pt!==null)Pt.created(n,i);let{size:l,usage:s}=e;let o=(e.label??"")||"(unlabeled)";let a;v1:{let e=o;if(hl.size===0){a=null;break v1;}a=_b(e);}if(yt){St.rows.push({kind:"buffer",resource:n,label:o,bytes:l,usage:s,refused:a,diagnostic:((c5.get(j)??0)>0)});ll(n);}else if(a!==null)_l(n);let u=Hm7();ft.noteBufferCreated(l,s,o,u),ct.trackBuffer(n,l);let d=(i.usage&3)!==0?n.mapAsync:void 0,f=qt&&(i.usage&1)!==0?n.unmap:void 0,c={ref:new WeakRef(n),native:Reflect.get(n,"destroy"),nativeMap:typeof d==="function"?d:null,nativeUnmap:typeof f==="function"?f:null,map:null,waiting:null,bytes:l,usage:s,label:o,scope:u,kind:null,format:"",shape:"",live:!0};(n)[gl]=c;ht.add(c.ref);pt.add(c);n.destroy=Ft;if(c.nativeMap!==null)n.mapAsync=Bt;if(c.nativeUnmap!==null)n.unmap=_t;return n}finally{D5(It,"createBuffer",t,e)}};let Vt=j.createTexture.bind(j),Ht=eZu(j),Ut=j.features?.has("rg11b10ufloat-renderable")===!0;j.createTexture=function(e){let t=(It.open?Bra():-1);try{if(yt)$t();let t=Ht?R74(j,nn(e)):ofC(e,Ut);let r=Vt(t);Et?.add(r,t);let i=AX9(e);let n=(e.label??"")||"(unlabeled)";let l;v1$:{let e=n;if(hl.size===0){l=null;break v1$;}l=_b(e);}if(yt){St.rows.push({kind:"texture",resource:r,label:n,bytes:i,usage:-1,refused:l,diagnostic:((c5.get(j)??0)>0)});ll(r);}else if(l!==null)_l(r);let s=Hm7();let o=Reflect.get(r,"usage");let a=xLC(n,typeof o==="number"?o:e.usage);ft.noteTextureCreated(i,n,s,a,e.format);ct.trackTexture(r,gM5(n)==="shadows");dp_(r);let u={ref:new WeakRef(r),native:Reflect.get(r,"destroy"),nativeMap:null,nativeUnmap:null,map:null,waiting:null,bytes:i,usage:0,label:n,scope:s,kind:a,format:e.format,shape:ULC(e),live:!0};(r)[gl]=u;pt.add(u);r.destroy=Wt;return r}finally{D5(It,"createTexture",t,e)}};pO8(j,Y);if(typeof j.createBindGroup==="function"){let e=j.createBindGroup.bind(j);j.createBindGroup=function(t){let r=At();try{let r=zp_(t);let i=Pt===null?r:Pt.bindGroupDescriptor(r);let n=jt===null?e(i):jt.createBindGroup(i);Y?.noteGroup(n,i);ct.noteBindGroup(n,r);loo(n,r);return n}finally{D5(It,"createBindGroup",r,t)}}}CO8(j,ct,Y);if(typeof j.createCommandEncoder==="function"){let e=j.createCommandEncoder.bind(j);j.createCommandEncoder=function(t){let r=At();try{let r=e(t),i=Y===null?r:Y.wrapEncoder(r),n=jt===null?i:jt.wrapEncoder(i),l=Pt===null?n:Pt.wrapEncoder(n);return ct.wrapCommandEncoder(l,t?.label),l}finally{D5(It,"createCommandEncoder",r,t)}}}if(typeof j.createRenderBundleEncoder==="function"){let e=j.createRenderBundleEncoder.bind(j);j.createRenderBundleEncoder=function(t){let r=At();try{let r=e(t),i=Y===null?r:Y.wrapBundleEncoder(r),n=jt===null?i:jt.wrapBundleEncoder(i,t);return ct.wrapBundleEncoder(n,t.label??"(unlabeled bundle)"),n}finally{D5(It,"createRenderBundleEncoder",r,t)}}}let Kt=0,Yt=null,Gt=j.queue,Xt=Gt.writeBuffer.bind(Gt),Zt=ct.deadWrites,Jt=(e)=>Zt.any&&e instanceof Object&&Reflect.get(e,Zt.mark)===!0,Qt=[],er=[],tr=0,ir={label:"lume owed clears"},nr=[],lr=function(e){for(let t=0;t<tr;t++)if(Qt[t]===e)return!0;return!1},sr=function(){let e=tr;if(e===0)return;tr=0;let t=j.createCommandEncoder(ir);for(let r=0;r<e;r++){let e=Qt[r];if(Qt[r]=null,e===null||Jt(e))continue;t.clearBuffer(e,er[2*r],er[2*r+1])}nr[0]=t.finish(),Gt.submit(nr)};RXn(j,function(e,t,r){let i=tr++;Qt[i]=e,er[2*i]=t,er[2*i+1]=r});Gt.writeBuffer=function(e,t,r,i,n){let l=At();if(tr>0&&lr(e))sr();try{if(Jt(e)){ct.refuseWrite("writeBuffer",e);return}if(Kt++,LW(mWA(r,i,n)),Yt){let t=e.label||"(unlabeled)";ZYD(Yt,t)}if(Pt===null||Pt.wroteBuffer(e,t,r,i,n))if(n!==void 0)Xt(e,t,r,i,n);else if(i!==void 0)Xt(e,t,r,i);else Xt(e,t,r);if(jt!==null)jt.wroteBuffer(e,t,r,i,n);return}finally{D5(It,"queue.writeBuffer",l,e)}};if(typeof Gt.writeTexture==="function"){let e=Gt.writeTexture.bind(Gt);Gt.writeTexture=function(t,r,i,n){let l=At();try{let l=t.texture;if(Jt(l)){ct.refuseWrite("writeTexture",l);return}return LW(RW(r)-Number(Reflect.get(i,"offset")??0)),VUn(Hj4(l,n),dMI(l)),e(t,r,i,n)}finally{D5(It,"queue.writeTexture",l,t)}}}if(typeof Gt.copyExternalImageToTexture==="function"){let e=Gt.copyExternalImageToTexture.bind(Gt);Gt.copyExternalImageToTexture=function(t,r,i){let n=At();try{let n=r.texture;if(Jt(n)){ct.refuseWrite("copyExternalImageToTexture",n);return}LW(WEF(i));VUn(Hj4(n,i),dMI(n));return e(t,r,i)}finally{D5(It,"queue.copyExternalImageToTexture",n,r)}}}LO8(j);let or=0;let ar=0;let ur=xO8(j);let dr=typeof j.pushErrorScope==="function"&&typeof j.popErrorScope==="function";let fr=yWM(j,dr);let cr=Gt.submit.bind(Gt);let hr={first:0,ordinal:0,rejected:null};let pr=new Set;let mr=(function(t,r,i){try{hr.first=i,hr.ordinal=t,hr.rejected=null;let n=pr.size>0&&pr.delete(t);if(!r){fr(hr);return}let l={type:"validation",message:r.message};if(!n&&_1.size===0)ot(l);else if(!n){fc(vt,r,l,e);}hr.rejected=l,fr(hr)}catch{}});let gr={list:[],count:0};let yr={list:[],count:0};let br=typeof Gt.onSubmittedWorkDone==="function"?Gt.onSubmittedWorkDone.bind(Gt):null;yO8(j,br===null);let kr=[];if(br!==null)gB.set(j,kr);let xr=(function(e,t){for(let r=0;r<kr.length;r+=1)try{kr[r](e,t)}catch{}});let Mr=function(e){if(J7o(j)){xr(e,!0);return}UO8(j,e);if(e===C5X(j)){{let e=j;let t=g4.get(e);if(t!==void 0)Y4(t)}}xr(e,!1)};let Sr=(e)=>xr(e,!0);let Ir=function(e,t=!1){if(br===null)return!1;kB(j,e,t);let r=l1(yr,e,Mr,Sr);let i;{let e=j,t=br();let r=g4.get(e);if(r!==void 0&&n4(r))c4(r);i=t;}return xt.work=i,UJi(i,r.answered,r.lost),!0};let Ar={open:!1,first:0,last:0,worded:0};let $r=function(){if(!Ar.open||Ar.first===0||Ar.last===Ar.worded)return;if(Ir(Ar.last,!0))Ar.worded=Ar.last};let zr=function(){if(!Ar.open)return;Ar.open=!1;let{last:e,first:t,worded:r}=Ar;if(Ar.worded=0,t===0)return;if(Ar.first=0,r===e)kB(j,e);else Ir(e);if(!dr||Mt===null)return;St.close();let i=l1(gr,e,mr,null,t);UJi(Mt(),i.answered,i.lost)};let Or={open:0};let Tr=function(e){if(e!==null)at(e)};El.set(j,{open:function(){zr();Cr:{if(!ut||Or.open>0||kt===null||Mt===null||J7o(j))break Cr;St.close();for(let e=0;e<r1.length;e+=1)UJi(Mt(),Tr,$5);for(let e of r1)kt(e)}Ar.open=!0},close:zr,span:$r});Gt.submit=function(e){let t=At();if(tr>0)sr();let r=jt===null?e:jt.submitting(e),i=Pt===null?r:Pt.submitting(r),n=Et===null?i:Et.submitting(i);B1r:{let e=j;let t=g4.get(e);if(t===void 0||!n4(t))break B1r;w4(t),t.touches+=1,t.covered=!1}try{or++,ar++,ur(ar);let e=ar;ct.takeFinished(n,dO8(j,e,n,ct.finishedBy,void 0,Ar.first!==0));if(Ar.open){if(Ar.first===0){if(Ar.first=e,kt!==null)kt("validation")}Ar.last=e,cr(n);return}if(kt===null||Mt===null){cr(n),Ir(e);return}kt("validation");if(((c5.get(j)??0)>0))pr.add(e);try{cr(n),Ir(e)}finally{let t=l1(gr,e,mr);UJi(Mt(),t.answered,t.lost)}}finally{if(Pt!==null)Pt.submitted();if(jt!==null)jt.submitted();if(Et!==null)Et.submitted();D5(It,"queue.submit",t,n)}};if(br!==null){Gt.onSubmittedWorkDone=function(){let t=At();try{{let v$16;{let e=j,t=br();let r=g4.get(e);v$16=r===void 0?t:U1r(r,t);}let e=v$16;return xt.work=e,e}}finally{D5(It,"queue.onSubmittedWorkDone",t,void 0)}}}AWM(j,It,St,Or,xt,Dt);let Nr=null,jr=!1,Pr=e.canvasOptions?.copyDst===!0,Er=(function(e){e.configure({device:j,format:nt,alphaMode:"premultiplied",usage:17|(Pr?2:0)})}),Fr=(function(e,t){if(t?.copyDst!==void 0)Pr=t.copyDst;let r=p5(e);if(Nr===r&&!jr)return r;if(Nr&&Nr!==r)Nr.unconfigure();return Er(r),Nr=r,jr=!1,r}),Wr=function(e){let t=p5(e);return Er(t),t};if(e.canvas)Fr(e.canvas,e.canvasOptions);let _r=!1;let Dr=!1;let Vr=function(){if(_r)return;_r=!0;dt=!0;eB(j);Nr?.unconfigure();pt.endAll()};let Hr=function(){if(H1.delete(Ur),Dr)return;Dr=!0;j.destroy();y$(j);c$(xt)};let Ur={device:j,features:it,preferredFormat:nt,adapterInfo:S,get context(){return Nr},configureCanvas:Fr,configureShipCanvas:Wr,suspendPresentation(){if(jr||!Nr)return;jr=!0,Nr.unconfigure()},resumePresentation(){if(!jr)return;if(jr=!1,Nr)Er(Nr)},get presentationSuspended(){return jr},takeWriteBufferCallCount(){let e=Kt;return Kt=0,e},takeSubmitCallCount(){let e=or;return or=0,e},get submitsIssued(){return ar},probeQueue(){if(!dr)return Promise.resolve("unanswerable");return new Promise(function(e){let t=!1;let r=0;let i=function(r){if(t)return;t=!0,n(),e(r)};let n=LcW(j,function(e){if(e.ordinal===r){i(e.rejected===null?"accepted":"rejected")}});j.lost.then(()=>i("lost"));try{let e=j.createCommandEncoder({label:"lume queue probe"}).finish();j.queue.submit([e]),r=ar}catch{i("rejected")}})},gpuMemory(e){return ft.info(e)},setGpuSurfaceBytes(e,t){ft.setSurfaceBytes(e,t)},gpuTextureCensus(e){return ft.textureCensus(e)},gpuTextureBytesByKind(e){return ft.textureBytesByKind(e)},gpuBufferBytesByKind(e){return ft.bufferBytesByKind(e)},gpuBuffersByKind(e){return ft.buffersByKind(e)},gpuBufferCensus(e){return ft.bufferCensus(e)},gpuScopeCensus(){return ft.scopeCensus()},gpuScopeLabelCensus(e){return ft.scopeLabelCensus(e)},gpuCensusGeneration(){return ft.censusGeneration()},gpuDeadBinds(){return ct.census()},gpuUseWatch(e){if(ct.watchUses(e),mt=e,e)gt=Bra()},gpuUseCensus(){let e=new Map;pt.each(function a(b,c){return (a.$h??=$c0C(161)(e,ct)).call(this,b,c)});return {windowMs:gt<0?null:Bra()-gt,armed:mt,rows:[...e.values()].sort((e,t)=>t.bytes-e.bytes)}},setWriteBufferAttributionEnabled(e){Yt=e?Yt??new Map:null},takeWriteBufferAttribution(){if(!Yt)return null;let e=Yt;return Yt=new Map,e},grantedLimit(e){let t=Reflect.get(j.limits,e);return e3w(t)&&t>=1?Math.floor(t):null},foldDeviceProfile:I,destroy(){Vr();Hr()},destroyDrained(){if(Dr)return Promise.resolve();Vr();return j.queue.onSubmittedWorkDone().then(Hr,Hr)}};return nO8(Ur)}var a4=32,t4=XBU(),p4=XBU(),J4=[],B4=new Set,d4=[],b4=0,e4=null,q4=0,P4=0,U4=null,E4=0,R4=new WeakMap,x4=null,y4=null;function Y1I(e){if(b4+=1,e4=e,q4=C5X(e)+1,e!==U4)U4=e,E4=b4,P4=0;return b4}function RdA(){return q4!==0&&P4===q4}function ihO(e){q4=C5X(e)+1}function xCF(){e4=null,q4=0}function fQc(e,t=e4){if(t===null)return;let r=t===e4?q4:C5X(t)+1;if(p4.get(e)===r)return;p4.set(e,r);{let e$35=t,t$25=e;{let e=e$35,t=t$25;let i=e===x4?y4:R4.get(e)??null;if(i===null)i={cursor:-1,slots:[]},R4.set(e,i);x4=e,y4=i;let n=i.cursor<0?void 0:i.slots[i.cursor];if(n?.ordinal!==r){let t=i.slots;i.cursor=t.length===0?0:(i.cursor+1)%t.length;n=t[i.cursor];if(n===void 0||!sB(e,n.ordinal))n={ordinal:r,count:0,pipelines:[]},t.splice(i.cursor,0,n);else{for(let e=0;e<n.count;e+=1)n.pipelines[e]=void 0;n.count=0,n.ordinal=r}}n.pipelines[n.count]=t,n.count+=1}}if(t4.has(e))return;{let t$24=r,r$13=t;{let t=t$24,r=r$13;if(t4.set(e,t),r===e4)P4=t;KsL(e);let i=Pms(e),n=rK(e),l=e.label;if(J4.push({label:typeof l==="string"?l:"(unlabeled)",frame:b4,packet:t,...i===void 0?{}:{key:i},...n===void 0?{}:{text:n}}),J4.length>a4)J4.splice(0,J4.length-a4);if(B4.size>0&&(B4.has(f4(e))||B4.has(icW(f4(e)))))d4.push({key:f4(e),text:n,packet:t,device:r})}}}function f4(e){let t=Pms(e)??e.label;return typeof t==="string"&&t.length>0?t:"(unlabeled)"}function bHD(e){B4=mnS(B4);for(let t of e)B4.add(v2h(t));if(B4.size===0)d4.length=0}function R4r(e){let t=0;for(let r=0;r<d4.length;r+=1){let i=d4[r];if(!e(i.key,i.text,i.packet,i.device))d4[t++]=i}d4.length=t}function f52(e,t){let r=R4.get(e);if(r===void 0||t<=0)return[];for(let e of r.slots){if(e.ordinal!==t)continue;let r=[];for(let t=0;t<e.count;t+=1){let i=e.pipelines[t]?.label;r.push(typeof i==="string"&&i.length>0?i:"(unlabeled)")}return r}return[]}function v_L(a,b){return $c0C(162).call(this,a,b)}function WC6(e,t){let r=C5X(e),i=[],n=R4.get(e);if(n===void 0)return i;for(let e of n.slots){if(e.ordinal<=t||e.ordinal>r)continue;for(let t=0;t<e.count;t+=1){let r=e.pipelines[t];if(r===void 0||t4.get(r)!==e.ordinal)continue;let n=rK(r);i.push({key:f4(r),packet:e.ordinal,...n===void 0?{}:{text:n}})}}return i.sort((e,t)=>e.packet-t.packet)}function v9S(e){let t=[];for(let r=J4.length-1;r>=0;r-=1){let i=b4-J4[r].frame;if(i>=e)break;t.push({...J4[r],framesAgo:i})}return t}function l4(e){return t4.get(e)}var uhx=(function(){return b4});function r4z(e){return e!==null&&e!==void 0&&e===U4?E4:b4}function gSX(e){return e===U4}var H4={arm:null,fullSet:!1,bundles:!0,foldWords:!1,line:"every surface lane draws on the whole road"},o4=new WeakMap;var tDr=(function(e){if(e===null||e===void 0)return H4;return o4.get(e)??H4});function ddY(e,t){o4.set(e,t)}var K3g=0,j4=1,QkR=2,L4=new WeakMap,r4=new WeakMap;function o5t(e,t,r=null){if(L4.set(e,t?j4:QkR),r!==null)r4.set(e,r)}function qbK(e){return r4.get(e)??null}function J$h(e){return e===null?K3g:L4.get(e)??K3g}var tE=new WeakMap;function zRE(e){return Uu2(e).view()}function Uu2(e){let t=tE.get(e);if(t)return t;return gc(e);}var ZE=new WeakMap;function O9k(a){return $c0C(163).call(this,a)}function UQW(e,t){return{colorView:t.color?O9k(e).view:null,depthView:t.depth?zRE(e):null}}var od=new Uint8Array([255,255,255,255]),ad=new Uint8Array([0,0,0,255]);class TBV{constructor(e){this.device=void 0;this.cellLightSampler=void 0;this.cellLightStandIn=void 0;this.textureArrayStandInSampler=void 0;this.seeThroughBlackTexel=void 0;this.zeroEngineBuffer=void 0;this.scripted=void 0;this.pictureFoldSampler=void 0;this.fxFallback=void 0;this.fxPackPixelSampler=void 0;this.fxRibbonSampler=void 0;this.fogHorizonPlaceholder=void 0;this.decorationRunArrayBlitSampler=void 0;this.decorationGroundSampler=void 0;this.groundScriptedColorSampler=void 0;this.throughMarksPlaceholder=void 0;this.tilemapHoldSampler=void 0;this.tilemapPlaceholder=void 0;this.stepWordsMade=null;this.device=e,this.cellLightSampler=e.createSampler({label:"terrain cell light",minFilter:"linear",magFilter:"linear",addressModeU:"repeat",addressModeV:"repeat",addressModeW:"clamp-to-edge"});let t=((e)=>e.createView({dimension:"2d-array"}));let r=z$P(e,{label:"terrain cell light stand-in",dimension:"2d",size:{width:1,height:1,depthOrArrayLayers:1},format:"rgba8unorm",usage:4},function(e){n.view=t(e)});let i=FU6(e,{label:"terrain cell light stand-in window",size:Jl,usage:64},function(e){n.window=e});let n={view:t(r.resource),sampler:this.cellLightSampler,window:i.resource};this.cellLightStandIn=n,this.textureArrayStandInSampler=e.createSampler({label:"lume texture array stand-in sampler",magFilter:"linear",minFilter:"linear",addressModeU:"repeat",addressModeV:"repeat"});let l=(e)=>e.createView({label:"lume see-through light none",dimension:"2d-array"});let s=z$P(e,{label:"lume see-through light none",size:{width:1,height:1},format:"rgba8unorm",usage:4},(e)=>{this.seeThroughBlackTexel=l(e)});this.seeThroughBlackTexel=l(s.resource);this.zeroEngineBuffer=FU6(e,{label:"lume engine buffer stand-in",size:16,usage:128},DI0);this.scripted=XBV(e);this.pictureFoldSampler=e.createSampler({label:"lume model picture fold"});this.fxFallback=yBV(e);this.fxPackPixelSampler=e.createSampler({label:"fx sprite pack pixel sampler",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge",magFilter:"nearest",minFilter:"linear",mipmapFilter:"linear"});this.fxRibbonSampler=e.createSampler({label:"fx ribbon sampler",addressModeU:"repeat",addressModeV:"clamp-to-edge",magFilter:"linear",minFilter:"linear",mipmapFilter:"linear"});this.fogHorizonPlaceholder=FU6(e,{label:"lume fog horizon placeholder",size:uBr,usage:64},DI0);this.decorationRunArrayBlitSampler=e.createSampler({label:"terrain decor run array blit",magFilter:"nearest",minFilter:"linear",mipmapFilter:"nearest",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge"});this.decorationGroundSampler=e.createSampler({label:"terrain decor ground sampler",magFilter:"linear",minFilter:"linear",mipmapFilter:"linear",addressModeU:"repeat",addressModeV:"repeat"});this.groundScriptedColorSampler=e.createSampler({label:"terrain ground scripted colour",magFilter:"linear",minFilter:"linear",mipmapFilter:"linear",addressModeU:"repeat",addressModeV:"repeat"});this.throughMarksPlaceholder=FU6(e,{label:"lume through marks placeholder",size:4,usage:128},DI0);this.tilemapHoldSampler=e.createSampler({label:"lume tilemap hold",magFilter:"linear",minFilter:"linear",mipmapFilter:"linear"});let o=gQc(e,"lume tilemap placeholder","rgba8unorm",od);this.tilemapPlaceholder={texture:o,sampler:e.createSampler({label:"lume tilemap placeholder",magFilter:"nearest",minFilter:"nearest"})}}get stepWords(){return this.stepWordsMade??=x3$(()=>tBV(this.device))}}var td=4,cd=256;function tBV(e){let t=e.createBindGroupLayout({label:"lume step words",entries:[RDp(0,4,"uniform")]}),r=new Uint32Array(td*cd/4);for(let e=0;e<td;e+=1)r[e*cd/4]=e;let i={layout:t,groups:[]},n=function(n){e.queue.writeBuffer(n,0,r);let l=[];for(let r=0;r<td;r+=1)l.push(e.createBindGroup({label:"lume step words",layout:t,entries:[{binding:0,resource:{buffer:n,offset:r*cd,size:16}}]}));i.groups=l};return n(FU6(e,{label:"lume step words",size:r.byteLength,usage:72},n).resource),i}function e36(e,t,r,i,n,l={label:t}){let s=gQc(e,t,r,i),o=null,a=-1;return{get view(){if(o===null||a!==s.generation)o=PQO(s.resource.createView(l)),a=s.generation;return o},sampler:n}}function XBV(e){let t=e36(e,"lume scripted placeholder","rgba8unorm",od,e.createSampler({label:"lume scripted placeholder"})),r="lume scripted uint placeholder",i="lume texture array placeholder";return{white:t,uint:e36(e,"lume scripted uint placeholder","r16uint",new Uint16Array([0]),t.sampler),array:e36(e,"lume texture array placeholder","rgba8unorm-srgb",od,e.createSampler({label:"lume texture array placeholder",magFilter:"linear",minFilter:"linear"}),{label:"lume texture array placeholder",dimension:"2d-array"})}}var A9S="rgba8unorm-srgb";var yBV=(function(e){let t=((t)=>e.queue.writeTexture({texture:t},od,{bytesPerRow:4},{width:1,height:1}));let r=((t)=>e.queue.writeTexture({texture:t},ad,{bytesPerRow:4},{width:1,height:1}));let i=z$P(e,{label:"fx white fallback",size:{width:1,height:1,depthOrArrayLayers:1},format:A9S,usage:6},function(e){t(e);s.view=e.createView({dimension:"2d-array"});l.add(s.view)});t(i.resource);let n=z$P(e,{label:"fx share color placeholder",size:{width:1,height:1},format:"rgba8unorm",usage:6},function(e){r(e);s.share.colorView=e.createView()});r(n.resource);let l=new WeakSet,s={whites:l,view:i.resource.createView({dimension:"2d-array"}),sampler:e.createSampler({label:"fx sprite sampler",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge",magFilter:"linear",minFilter:"linear",mipmapFilter:"linear"}),share:{colorView:n.resource.createView(),get depthView(){return zRE(e)}}};return l.add(s.view),s});var Jd=new WeakMap;var MPW=(function(e){return Jd.get(e)??qBV(e)});var qBV=(function(e){let t=x3$((()=>new TBV(e)));return Jd.set(e,t),t});var Ed=new WeakSet;function PQO(e){return Ed.add(e),e}function giN(e){return Ed.has(e)}function Ilv(e){Ed.delete(e)}var kOY=0.5,Tz8="fsThroughDepth",LHa=`if (alpha < ${kOY.toFixed(2)}) { discard; }`;function Up(e,t,r,i,n,l){let{fragment:s,depthStencil:o}=e;if(s===void 0||o===void 0||o.depthCompare==="always"||e.layout==="auto")return null;return{label:r,layout:e.layout,vertex:e.vertex,...e.primitive!==void 0?{primitive:e.primitive}:{},fragment:{module:s.module,entryPoint:t,constants:s.constants,targets:i},depthStencil:{...o,depthWriteEnabled:n,depthCompare:l??o.depthCompare??M3L},multisample:{count:e.multisample?.count??1}}}function jIR(e,t,r){return Up(e,t,r,[],!0)}var Ubh="fsThroughCover",fU9="r16float";var bJT=(function(e){return`return vec4<f32>(${e}, 0.0, 0.0, ${e});`});function mIR(e,t,r){return Up(e,t,r,[{format:fU9,blend:WN8}],!1)}var RdK=999,K2S=`@group(2) @binding(${RdK}) var<storage, read_write> lume_throughMarks: array<atomic<u32>>;
fn lume_throughMarkIndex(p: vec4<f32>) -> u32 {
  let size: vec2<u32> = textureDimensions(lume_sceneDepthTex);
  let px: vec2<u32> = vec2<u32>(p.xy);
  let i: u32 = px.y * size.x + px.x;
  return select(arrayLength(&lume_throughMarks), i, px.x < size.x && px.y < size.y && i < arrayLength(&lume_throughMarks));
}
fn lume_throughMark(p: vec4<f32>) {
  let i: u32 = lume_throughMarkIndex(p);
  if (i < arrayLength(&lume_throughMarks)) { atomicMax(&lume_throughMarks[i], bitcast<u32>(p.z)); }
}
fn lume_throughOccluded(p: vec4<f32>) -> bool {
  let size: vec2<u32> = textureDimensions(lume_sceneDepthTex);
  let px: vec2<u32> = min(vec2<u32>(p.xy), max(size, vec2<u32>(1u)) - vec2<u32>(1u));
  return textureLoad(lume_sceneDepthTex, px, 0).x > p.z;
}
fn lume_throughTake(p: vec4<f32>) -> u32 {
  let i: u32 = lume_throughMarkIndex(p);
  if (i >= arrayLength(&lume_throughMarks)) { return 0u; }
  return atomicExchange(&lume_throughMarks[i], 0u);
}`,clT="if (lume_throughOccluded(in.position)) { discard; }",YrC=`if (alpha >= ${kOY.toFixed(2)}) { lume_throughMark(in.position); }`,i6U=["  let lume_mark: u32 = lume_throughTake(in.position);","  if (lume_mark == 0u) { discard; }","  return bitcast<f32>(lume_mark);"];function XCa(e){return MPW(e).throughMarksPlaceholder.resource}class BJN{constructor(e){this.device=void 0;this.marks=null;this.width=0;this.height=0;this.device=e}ensure(e,t){if(this.marks!==null&&this.width===e&&this.height===t)return this.marks.resource;return jc.call(this,e,t);}release(){return this.marks?.release(),this.marks=null,this.width=0,this.height=0,null}}var Xd0="fsMaterialData",qX6="rgba8unorm",GzN={r:0,g:0,b:0,a:0};function j2N(e,t,r){return Up(e,t,r,[{format:qX6}],!1,dlr)}var u5k=256,oc=[71,89,107,11],MUz=8;function pvk(a,b){return (pvk=$c0C(164)).call(this,a,b)}var mc=((e,t)=>`fn ${e}(p: vec2<f32>) -> f32 {
  let i = floor(p);
  let f = p - i;
  let at = i - ${u5k}.0 * floor(i / ${u5k}.0);
  return textureSampleLevel(groundLattice, atlasSampler, (at + f * f * (vec2<f32>(3.0) - f * 2.0) + vec2<f32>(0.5)) / ${u5k}.0, 0.0).${t};
}`),WAL=`@group(2) @binding(${MUz}) var groundLattice: texture_2d<f32>;`,Ugi=[WAL,mc("terrain_lattice0","r"),mc("terrain_lattice1","g"),mc("terrain_lattice2","b"),mc("terrain_lattice3","a")].join(`
`),mb7=`fn terrain_drift(worldXZ: vec2<f32>, scaleMeters: f32) -> vec2<f32> {
  let p = worldXZ / scaleMeters;
  let n = terrain_lattice0(p) * 0.6667 + terrain_lattice1(p * 2.3 + vec2<f32>(13.7, 5.1)) * 0.3333;
  let h = terrain_lattice2(p * 0.7 + vec2<f32>(41.3, 27.9));
  return vec2<f32>(n, h);
}`,tc=16,Jc=new WeakMap;function zvk(e){return x3$(function(){let t=u5k,r,i=z$P(e,{label:"terrain ground lattice",size:[t,t],format:"rgba8unorm",usage:6},function(t){if(Qc(e,t),r!==void 0)r.rows=0});return Qc(e,i.resource),r={texture:i,rows:0},r})}function Qc(e,t){let r=u5k;e.queue.writeTexture({texture:t},new Uint8Array(r*r*4).fill(128),{bytesPerRow:r*4,rowsPerImage:r},[r,r])}function $nL(e){return (JPf(Jc,e,zvk)).texture.view()}function xks(e){let t=(JPf(Jc,e,zvk));let r=u5k;if(t.rows>=r)return 0;return kc(r,t,e);}var cY=15,mY=8,eY=mY*4,QX2={terrain:0,bucket:1,growth:2,shells:3},MY=[3,12,4,8,9,16],jR$=`
struct GroundDraw {
  kind: u32,
  arm: u32,
  three: u32,
  twelve: u32,
  bounds: vec4<u32>,
}
@group(2) @binding(${cY}) var<uniform> groundDraw: GroundDraw;
`,zY=RDp(cY,3,"uniform");function JDr(e,t,r,i){let n;{let e$36=t,t$26=r;{let e=e$36,t=t$26;let r=new Uint32Array(mY);r[0]=e,r[1]=t;for(let e=0;e<MY.length;e++)r[2+e]=MY[e];n=r;}}let l=FU6(e,{label:i,size:eY,usage:72},(t)=>e.queue.writeBuffer(t,0,n));return e.queue.writeBuffer(l.resource,0,n),l}var OEE=9,$V4=10,pSG=[RDp(0,3,"uniform"),RDp(1,3,"read-only-storage"),RDp(2,3,"read-only-storage"),RDp(3,3,"read-only-storage"),v6R(4,3,"float","2d-array"),Zyu(5,3,"filtering"),v6R(6,3,"float","2d-array"),v6R(7,2,"float","2d-array"),v6R(MUz,2,"float","2d"),RDp(OEE,2,"uniform"),v6R($V4,2,"float","2d-array"),zY];function FAX(e){return[Y0r(0,e.pool),Y0r(1,e.heights),Y0r(2,e.blend),Y0r(3,e.layerParams),{binding:4,resource:e.albedo},{binding:5,resource:e.sampler},{binding:6,resource:e.nro},{binding:7,resource:e.albedoFine},{binding:MUz,resource:e.lattice},{binding:OEE,resource:e.layerRows},{binding:$V4,resource:e.nroFine},Y0r(cY,e.groundDraw)]}var TT5=3,HNd=2,q2c=4,LS$=5,K2e=6,jJz=3,Ust=5,O0z=12,Zry=O0z/4;function SSh(e,t,r,i){let n=t*16;for(let t=0;t<12;t++)i[t]=(t&3)===3?0:e[n+t];return i[12]=e[n+12]+(e[n+3]-r[0]),i[13]=e[n+13]+(e[n+7]-r[1]),i[14]=e[n+14]+(e[n+11]-r[2]),i[15]=1,i}function UNM(e){let t=[RDp(0,1,"read-only-storage"),RDp(1,1,"read-only-storage"),RDp(jJz,3,"read-only-storage"),RDp(Ust,1,"read-only-storage")];if(e==="storage")t.push(tr1(HNd));return t}var wwK=(e)=>("buffer"in e)?e:{buffer:e};function Jy0(e,t){let r=[{binding:0,resource:wwK(t.transforms)},Y0r(1,t.originY),Y0r(jJz,t.anchors),{binding:Ust,resource:wwK(t.ringMemory)}];if(e==="storage"&&t.survivors!==void 0)r.push({binding:HNd,resource:wwK(t.survivors)});return r}function f91(e){return e==="storage"?void 0:[do1(TT5)]}var Z9="GLASS_ARM_WEB",D9="GLASS_FALLBACK_SCHEMA_SKEW";function Dfo(e){if(!e)return"stream";try{let t=new URL(e).pathname;if(t==="/gpu")return"gpu";if(t==="/tee")return"tee"}catch{}return"stream"}function AmR(a,b,c){return (AmR=$c0C(165)).apply(this,arguments)}function tmR(a,b){return (tmR=$c0C(166)).call(this,a,b)}function dmR(e,t,r,i=hK){return e!==null&&AmR(e,t,r,i).code===null}var uhX=(function(e,t=hK){let r=HsL(e);if(r===null)return!1;let i=r.arm==="web"||r.arm==="native"?r.arm:null;return dmR(FsL(r.endpoint),i,tmR(r.hostSchemaVersion,r.hostSchemaRange),t)});var o8=new WeakMap,Y8=0,R8=0;function V8(e,t){let r=o8.has(e);if(o8.set(e,t),r)Y8+=1}function BSN(){return Y8}function lz3(){return R8}var ZtC=(function(e,t){let r=o8.get(t);return r===void 0?e:r(e)});var GE=new WeakMap,XE=new WeakMap,BE=new WeakMap,fE=new WeakMap,IE=new WeakMap,eE=new WeakMap,kE=new WeakMap,bE=new WeakMap,uE=new Map,gE=new Map,DE={moves:0},VE=new WeakMap,HE=new WeakMap,wE=new WeakMap;function E9V(e){let t=ayA(e);t.passGroupParts.clear(),t.passGroupSeeThroughParts.clear()}var arM=(function(e,t){let r=e.createBindGroup(t);GE.set(r,t.entries),XE.set(r,e),BE.set(r,t.layout);let i=ayA(e),n=i.passGroupWholes;for(let e of n)if(e.deref()===void 0)n.delete(e);n.add(new WeakRef(r));for(let[t,n]of i.passGroupParts){SE:{let t$27=r,r$14=t,i$6=n;{let t=t$27,r=r$14,i=i$6;let n=GE.get(t);if(n===void 0||!rE(n,i))break SE;let l=Zpc(bE,t);if(!l.has(r))cE(e,t,r,i,l)}}}for(let[e,t]of i.passGroupSeeThroughParts)OE(r,e,t);return r});function ufH(a,b){return $c0C(167).call(this,a,b)}var $E=(function(e){let t=ayA(e).passGroupWholes,r=[];for(let e of t){let i=e.deref();if(i===void 0)t.delete(e);else r.push(i)}return r});var rE=(function(e,t){let r=0;for(let i of e)if(t.has(i.binding))r+=1;return r===t.size});function qDF(e){return GE.get(e)}function XUF(e,t){let r=UE(e.replace(/\/\/[^\n]*/g,"")),i=[],n=new Set,l=[...t];for(let e=l.pop();e!==void 0;e=l.pop()){if(n.has(e))continue;n.add(e);let t=r.get(e);if(t===void 0)continue;i.push(t);for(let e of t.match(/[A-Za-z_]\w*/g)??[])if(r.has(e)&&!n.has(e))l.push(e)}return i}function pE(e){let t=e.replace(/\/\/[^\n]*/g,""),r=Array.from(t.matchAll(/@(?:vertex|fragment|compute)\b[^{;]*?\bfn\s+(\w+)\s*\(/g),((e)=>e[1])),i=new Map;for(let e of t.matchAll(/@group\((\d+)\)\s*@binding\((\d+)\)\s*var(?:<[^>]*>)?\s+(\w+)/g))i.set(e[3],{group:Number(e[1]),binding:Number(e[2])});return{entryPoints:r,bodies:UE(t),declared:i,named:new Map}}function UE(e){let t=new Map;for(let r of e.matchAll(/\bfn\s+(\w+)\s*\(/g)){let i=e.indexOf("{",r.index);for(let t=0;i<e.length;i+=1)if(e[i]==="{")t+=1;else if(e[i]==="}"&&--t===0)break;t.set(r[1],e.slice(r.index,i+1))}return t}function igX(e,t,r=1){return dE(e,t,r,null)}var dE=(function(e,t,r,i){if(DE.moves!==(EQ.moves)){nc();}let n=`${r}:${t.join(",")}`,l=uE.get(e),s=l?.get(n);if(s!==void 0)return s;let o=i?.get(e);if(o===void 0)o=pE(e),i?.set(e,o);let a;{let e=o;let i=new Set,n=new Set,l=[...t];for(let t=l.pop();t!==void 0;t=l.pop()){if(n.has(t))continue;n.add(t);let s=e.named.get(t);if(s===void 0){let r=e.bodies.get(t);if(r===void 0)continue;let i=new Set;for(let t of r.match(/[A-Za-z_]\w*/g)??[])if(e.bodies.has(t)||e.declared.has(t))i.add(t);e.named.set(t,s=[...i])}for(let t of s){let s=e.declared.get(t);if(s===void 0){if(!n.has(t))l.push(t)}else if(s.group===r)i.add(s.binding)}}a=i;}let u=LjX.filter(((e)=>a.has(e.binding)));let d=u.length===LjX.length?LjX:u;if(l===void 0)uE.set(e,l=new Map);return l.set(n,d),d});var xnN=(function(e,t=1){let r=gE.get(e);if(r!==void 0)return dE(e,r===""?[]:r.split(","),t,null);let i=pE(e);return gE.set(e,i.entryPoints.join(",")),dE(e,i.entryPoints,t,new Map([[e,i]]))});var XA9=(function(e,t=1){if(e.length===1)return xnN(e[0],t);let r=new Set;for(let i of e)for(let e of xnN(i,t))r.add(e.binding);return r.size===LjX.length?LjX:LjX.filter((e)=>r.has(e.binding))});var t8L=(function(e,t,r=1){return Ldr(e,XA9(t,r))});function fMI(e){let t=new Set,r=new Map;for(let i of e)for(let e of dE(i.code,[i.entry],1,r))t.add(e.binding);return t.size===LjX.length?LjX:LjX.filter((e)=>t.has(e.binding))}function Ldr(e,t,r=[]){if(t===LjX&&r.length===0){return pc(e);}let i=new Set(r.map((e)=>e.binding));let n=(t.length===0?LjX.slice(0,1):t).map((e)=>i.has(e.binding)?{...e,visibility:e.visibility|1}:e);let l=e.getBindGroupLayout(n,`lume pass-lights part ${n.map(((e)=>e.binding)).join(",")}`);if(!kE.has(l)){L9V:{let e$52=l,t$37=new Set(n.map((e)=>e.binding));{let e=e$52,t=t$37;kE.set(e,t);let r=wE.get(e);if(r===void 0)break L9V;ayA(r).passGroupParts.set(e,t);for(let i of $E(r)){SE$:{let e$38=r,t$28=i,r$15=e,i$7=t;{let e=e$38,t=t$28,r=r$15,i=i$7;let n=GE.get(t);if(n===void 0||!rE(n,i))break SE$;let l=Zpc(bE,t);if(!l.has(r))cE(e,t,r,i,l)}}}}}}return l}var Ggo=(function(e,t){if(kE.has(t))VE.set(e,t);return e});function SJN(e,t,r,i){return Ggo(e.createPipelineLayout({label:t,bindGroupLayouts:r}),i)}var RE=v6R(jK,2,"unfilterable-float","2d-array"),FE=new WeakMap,JE=new WeakMap,QE=new WeakMap,nE=new WeakMap;function hww(e,t){let r=[...t,RE],i=e.getBindGroupLayout(r,`lume see-through part ${r.map((e)=>e.binding).join(",")}`);if(!FE.has(i)){r9V:{let e$39=i,t$29=new Set(t.map((e)=>e.binding));{let e=e$39,t=t$29;FE.set(e,t);let r=wE.get(e);if(r===void 0)break r9V;ayA(r).passGroupSeeThroughParts.set(e,t);for(let i of $E(r))OE(i,e,t)}}}return i}function OE(e,t,r){let i=GE.get(e);if(i!==void 0&&rE(i,r))yE(e,t,r)}function MiM(e,t){if(FE.has(t))JE.set(e,t);return e}function IuN(e,t){if((QE.get(e)??null)===t)return;qc(t,e);}function jqZ(e){return QE.get(e)??null}function yE(a,b,c){return (yE=$c0C(168)).call(this,a,b,c)}function c9V(e,t,r,i,n,l){let s=e.createBindGroup({label:"lume see-through pass part",layout:r,entries:[...t.filter((e)=>i.has(e.binding)),{binding:jK,resource:n}]});return l.set(n,s),s}function Z9V(e,t){let r=t==="auto"?void 0:JE.get(t),i=r===void 0?void 0:FE.get(r);if(r!==void 0&&i!==void 0){V8(e,(e)=>yE(e,r,i));return}let n=t==="auto"?void 0:VE.get(t);if(n===void 0)return;HE.set(e,n);V8(e,function(e){{let t=n;let r=IE.get(e)??e,i=XE.get(r);return i===void 0?e:RAc(i,r,t)}})}function hxA(e,t,r){if(e===t)return r;if(IE.get(e)!==t)return null;let i=eE.get(e),n=XE.get(r);return i===void 0||n===void 0?null:RAc(n,r,i)}function QcC(e,t,r){let i=HE.get(r);return i===void 0?t:RAc(e,t,i)}function RAc(e,t,r){let i=kE.get(r);if(i===void 0)return t;let n=Zpc(bE,t);return n.get(r)??cE(e,t,r,i,n)}var cE=(function(e,t,r,i,n){let l=GE.get(t);if(l===void 0)return t;let s=e.createBindGroup({label:"lume lighting pass part",layout:r,entries:l.filter(((e)=>i.has(e.binding)))});return n.set(r,s),IE.set(s,t),eE.set(s,r),s});var gK=LPQ.vertex,AK=`${gK.slice(0,913)}struct Sky {
sunDirection: vec3<f32>,
sunDiskAngularRadius: f32,
sunIlluminance: vec3<f32>,
sunDiskIntensity: f32,
rayleighScattering: vec3<f32>,
mieScattering: f32,
ozoneAbsorption: vec3<f32>,
mieAbsorption: f32,
groundAlbedo: vec3<f32>,
mieAnisotropy: f32,
horizonTint: vec3<f32>,
groundLitBySky: f32,
zenithTint: vec3<f32>,
saturation: f32,
starsColor: vec3<f32>,
starsIntensity: f32,
moonDirection: vec3<f32>,
starsDensity: f32,
moonColor: vec3<f32>,
moonIntensity: f32,
cloudsColor: vec3<f32>,
milkyWayIntensity: f32,
wind: vec3<f32>,
moonEnabled: f32,
moonPhase: f32,
moonAngularRadius: f32,
starsTwinkleSpeed: f32,
starsTwinkleAmount: f32,
cloudsEnabled: f32,
cloudsCoverage: f32,
cloudsDensity: f32,
cloudsAltitudeM: f32,
cloudFieldCenter: vec2<f32>,
cloudsSpeed: f32,
cloudFieldInvWidth: f32,
cloudFieldDrift: vec2<f32>,
openSky: f32,
cloudSteps: f32,
cloudEye: vec3<f32>,
cloudInterior: f32,
cloudNearCenter: vec2<f32>,
cloudNearInvWidth: f32,
viewHeightKm: f32,
cloudMap: f32,
cloudsThicknessM: f32,
cloudFieldPhase: vec2<f32>,
cloudNearPhase: vec2<f32>,
cloudMapHalf: f32,
cloudMapPending: f32,
starsSize: f32,
}
@group(2) @binding(0) var<uniform> sky: Sky;
@group(2) @binding(1) var skyViewLut: texture_2d<f32>;
@group(2) @binding(2) var transmittanceLut: texture_2d<f32>;
@group(2) @binding(4) var cloudField: texture_2d<f32>;
@group(2) @binding(5) var lutSampler: sampler;
@group(2) @binding(9) var cloudFieldNear: texture_2d<f32>;
@group(2) @binding(10) var<storage, read> cloudMap: array<u32>;
const ATM_PLANET_RADIUS_KM: f32 = 6360.0;
const ATM_TOP_RADIUS_KM: f32 = 6460.0;
const ATM_VIEW_HEIGHT_KM: f32 = 0.2;
const ATM_PLANET_RADIUS_OFFSET_KM: f32 = 0.01;
const ATM_RAYLEIGH_SCALE_HEIGHT_KM: f32 = 8.0;
const ATM_MIE_SCALE_HEIGHT_KM: f32 = 1.2;
const ATM_MIE_FORWARD_LOBE_G: f32 = 0.95;
const ATM_MIE_FORWARD_LOBE_WEIGHT: f32 = 0.15;
const ATM_MIE_HORIZON_AIR_MASS: f32 = 91.24264645445655;
const ATM_OZONE_CENTER_KM: f32 = 25.0;
const ATM_OZONE_HALF_WIDTH_KM: f32 = 15.0;
const ATM_PI: f32 = 3.14159265358979;
struct AtmosphereMedia {
rayleighScattering: vec3<f32>,
mieScattering: f32,
ozoneAbsorption: vec3<f32>,
mieAbsorption: f32,
groundAlbedo: vec3<f32>,
mieAnisotropy: f32,
}
fn atm_henyeyGreensteinPhase(cosTheta: f32, anisotropy: f32) -> f32 {
let g2 = anisotropy * anisotropy;
let denominator = pow(1.0 + g2 - 2.0 * anisotropy * cosTheta, 1.5);
return (1.0 / (4.0 * ATM_PI)) * (1.0 - g2) / max(denominator, 1e-5);
}
fn atm_transmittanceLutUv(viewRadiusKm: f32, cosViewZenith: f32) -> vec2<f32> {
let horizon = sqrt(max(ATM_TOP_RADIUS_KM * ATM_TOP_RADIUS_KM - ATM_PLANET_RADIUS_KM * ATM_PLANET_RADIUS_KM, 0.0));
let rho = sqrt(max(viewRadiusKm * viewRadiusKm - ATM_PLANET_RADIUS_KM * ATM_PLANET_RADIUS_KM, 0.0));
let discriminant = viewRadiusKm * viewRadiusKm * (cosViewZenith * cosViewZenith - 1.0) + ATM_TOP_RADIUS_KM * ATM_TOP_RADIUS_KM;
let distanceToTop = max(-viewRadiusKm * cosViewZenith + sqrt(max(discriminant, 0.0)), 0.0);
let dMin = ATM_TOP_RADIUS_KM - viewRadiusKm;
let dMax = rho + horizon;
let xMu = (distanceToTop - dMin) / max(dMax - dMin, 1e-5);
let xR = rho / max(horizon, 1e-5);
return vec2<f32>(clamp(xMu, 0.0, 1.0), clamp(xR, 0.0, 1.0));
}
fn atm_unitToSubUvBy(value: f32, halfTexel: f32, scale: f32) -> f32 {
return (value + halfTexel) * scale;
}
fn atm_horizonCosZenith(viewHeightKm: f32) -> f32 {
let viewRadius = ATM_PLANET_RADIUS_KM + viewHeightKm;
let horizonDistance = sqrt(viewRadius * viewRadius - ATM_PLANET_RADIUS_KM * ATM_PLANET_RADIUS_KM);
return -horizonDistance / viewRadius;
}
fn atm_skyViewUvHeld(viewDirection: vec3<f32>, sunFlat: vec3<f32>, horizonZenithAngle: f32, subUv: vec4<f32>) -> vec2<f32> {
let viewZenithAngle = acos(clamp(viewDirection.y, -1.0, 1.0));
let aboveCoord = (1.0 - sqrt(max(1.0 - viewZenithAngle / max(horizonZenithAngle, 1e-4), 0.0))) * 0.5;
let belowCoord = sqrt((viewZenithAngle - horizonZenithAngle) / max(ATM_PI - horizonZenithAngle, 1e-4)) * 0.5 + 0.5;
let v = select(belowCoord, aboveCoord, viewZenithAngle < horizonZenithAngle);
let viewFlat = normalize(vec3<f32>(viewDirection.x, 0.0, viewDirection.z) + vec3<f32>(1e-5, 0.0, 0.0));
let cosAzimuth = clamp(dot(viewFlat, sunFlat), -1.0, 1.0);
let u = sqrt(0.5 - cosAzimuth * 0.5);
return vec2<f32>(atm_unitToSubUvBy(u, subUv.x, subUv.y), atm_unitToSubUvBy(v, subUv.z, subUv.w));
}
fn atm_sunLimbDarkening(centerToEdge: f32) -> vec3<f32> {
let mu = sqrt(max(1.0 - centerToEdge * centerToEdge, 0.0));
return vec3<f32>(pow(mu, 0.397), pow(mu, 0.503), pow(mu, 0.652));
}
fn atm_adjustSaturation(color: vec3<f32>, saturation: f32) -> vec3<f32> {
let luma = dot(color, vec3<f32>(0.2126, 0.7152, 0.0722));
return mix(vec3<f32>(luma), color, saturation);
}
fn atm_sampleTransmittanceLut(lut: texture_2d<f32>, lutSampler: sampler, radiusKm: f32, cosZenith: f32) -> vec3<f32> {
return textureSampleLevel(lut, lutSampler, atm_transmittanceLutUv(radiusKm, cosZenith), 0.0).rgb;
}
fn shade_mod289v3(x: vec3<f32>) -> vec3<f32> { return x - floor(x * (1.0 / 289.0)) * 289.0; }
fn shade_fade3(t: vec3<f32>) -> vec3<f32> { return t * t * t * (t * (t * 6.0 - 15.0) + 10.0); }
fn shade_permute1(x: f32) -> f32 { let y = ((x * 34.0) + 1.0) * x; return y - floor(y * (1.0 / 289.0)) * 289.0; }
fn shade_perlin3Corner(index: f32, offset: vec3<f32>) -> f32 {
var gx = index * (1.0 / 7.0);
var gy = fract(floor(gx) * (1.0 / 7.0)) - 0.5;
gx = fract(gx);
let gz = 0.5 - abs(gx) - abs(gy);
let sz = step(gz, 0.0);
gx = gx - sz * (step(0.0, gx) - 0.5);
gy = gy - sz * (step(0.0, gy) - 0.5);
let g = vec3<f32>(gx, gy, gz);
return dot(g * (1.79284291400159 - 0.85373472095314 * dot(g, g)), offset);
}
fn shade_perlin3(p: vec3<f32>) -> f32 {
let pi0 = shade_mod289v3(floor(p));
let pi1 = shade_mod289v3(floor(p) + vec3<f32>(1.0));
let pf0 = fract(p);
let pf1 = pf0 - vec3<f32>(1.0);
let fadeXyz = shade_fade3(pf0);
let hx0 = shade_permute1(pi0.x);
let hx1 = shade_permute1(pi1.x);
var sum = 0.0;
for (var column = 0u; column < 4u; column = column + 1u) {
let far = vec2<bool>((column & 2u) != 0u, (column & 1u) != 0u);
let hxy = shade_permute1(select(hx0, hx1, far.x) + select(pi0.y, pi1.y, far.y));
let weight = select(vec2<f32>(1.0) - fadeXyz.xy, fadeXyz.xy, far);
for (var side = 0u; side < 2u; side = side + 1u) {
let farZ = side != 0u;
sum = sum + shade_perlin3Corner(shade_permute1(hxy + select(pi0.z, pi1.z, farZ)), vec3<f32>(select(pf0.xy, pf1.xy, far), select(pf0.z, pf1.z, farZ))) * (weight.x * weight.y * select(1.0 - fadeXyz.z, fadeXyz.z, farZ));
}
}
return 2.2 * sum;
}
fn shade_fractal3(p: vec3<f32>, octaves: i32, lacunarity: f32, diminish: f32) -> f32 {
var result: f32 = 0.0;
var amplitude: f32 = 1.0;
var pos: vec3<f32> = p;
for (var i: i32 = 0; i < octaves; i = i + 1) {
result = result + amplitude * shade_perlin3(pos);
amplitude = amplitude * diminish;
pos = pos * lacunarity;
}
return result;
}
fn sky_fadeOut(edge0: f32, edge1: f32, value: f32) -> f32 {
return 1.0 - smoothstep(edge0, edge1, value);
}
fn sky_equirectUv(direction: vec3<f32>) -> vec2<f32> {
return vec2<f32>(atan2(direction.z, direction.x) * 0.15915494309189535 + 0.5, 0.5 - asin(clamp(direction.y, -1.0, 1.0)) * 0.3183098861837907);
}
fn sky_discMask(angle: f32, angularRadius: f32) -> f32 {
return sky_fadeOut(angularRadius - max(angularRadius * 0.06, 0.0008), angularRadius, angle);
}
fn sky_moonLayer(direction: vec3<f32>, size: f32) -> vec4<f32> {
let moonDirection = normalize(sky.moonDirection);
let angularRadius = max(sky.moonAngularRadius * size, 1e-4);
let discMask = sky_discMask(acos(clamp(dot(direction, moonDirection), -1.0, 1.0)), angularRadius);
var disc = vec3<f32>(0.0);
if (discMask > 0.0) {
let right = normalize(cross(vec3<f32>(0.0, 1.0, 0.0), moonDirection) + vec3<f32>(1e-4, 0.0, 0.0));
let up = cross(moonDirection, right);
let localX = clamp(dot(direction, right) / angularRadius, -1.0, 1.0);
let localY = clamp(dot(direction, up) / angularRadius, -1.0, 1.0);
let localZ = sqrt(max(1.0 - localX * localX - localY * localY, 0.0));
let surfaceNormal = right * localX + up * localY - moonDirection * localZ;
let phaseAngle = sky.moonPhase * 6.28318530718;
let authoredLight = right * sin(phaseAngle) + moonDirection * cos(phaseAngle);
let lightDirection = select(normalize(authoredLight), normalize(sky.sunDirection), sky.moonPhase < 0.0);
let lambert = max(dot(surfaceNormal, lightDirection), 0.0);
var mottling = vec2<f32>(0.0);
for (var leg = 0u; leg < 2u; leg = leg + 1u) {
let craterLeg = leg == 1u;
let stack = shade_fractal3(surfaceNormal * select(3.5, 9.0, craterLeg) + select(11.0, 37.0, craterLeg), select(4, 3, craterLeg), select(2.2, 2.0, craterLeg), select(0.55, 0.5, craterLeg));
mottling[leg] = clamp(stack * 0.5 + 0.5, 0.0, 1.0);
}
let maria = mottling.x;
let craters = mottling.y;
let albedo = 0.5 + maria * 0.5 - pow(craters, 2.0) * 0.25;
let earthshine = 0.03;
disc = sky.moonColor * albedo * max(lambert, earthshine) * discMask;
}
return vec4<f32>(disc * sky.moonEnabled, discMask * sky.moonEnabled);
}
const SKY_CLOUD_UNITS_PER_M: f32 = 0.0009;
const SKY_CLOUD_PSEUDO_THICKNESS: f32 = 4;
const SKY_CLOUD_EROSION: f32 = 0.6;
const SKY_CLOUD_POWDER: f32 = 0.2;
const SKY_CLOUD_BELLY_AMBIENT: f32 = 0.2;
const SKY_CLOUD_BELLY_SKY: f32 = 0.5;
const SKY_CLOUD_GROUND_BOUNCE: f32 = 0.18;
const SKY_CLOUD_EDGE: f32 = 0.05;
const SKY_CLOUD_EROSION_REACH: f32 = 0.2;
const SKY_CLOUD_SLICE_EDGE: f32 = 0.15;
const SKY_CLOUD_SLICE_DEPTH: f32 = 0.5;
const SKY_CLOUD_SLAB_REACH_M: f32 = 6000;
const SKY_CLOUD_FADE_NEAR: f32 = 6.25;
const SKY_CLOUD_FADE_FAR: f32 = 25;
const SKY_CLOUD_FADE_FLOOR_M: f32 = 3000;
const SKY_CLOUD_SLAB_OD: f32 = 5.6;
const SKY_CLOUD_MIN_STEP_M: f32 = 40;
const SKY_CLOUD_OPAQUE_T: f32 = 0.03;
const SKY_CLOUD_DOME_POWER: f32 = 2;
const SKY_CLOUD_LOBE_TOP: f32 = 0.95;
const SKY_CLOUD_LOBE_WAIST: f32 = 0.2;
const SKY_CLOUD_LIGHT_EDGE: f32 = 0.2;
const SKY_CLOUD_SLAB_SKIN: f32 = 0.1;
const SKY_CLOUD_MOON_ILLUMINANCE: f32 = 1.21;
const SKY_CLOUD_MOON_DECK_LIGHT: f32 = 0.06;
const SKY_CLOUD_MOON_BEAM: f32 = 0.036;
const SKY_SUN_TO_MOON_HANDOVER_START: f32 = -0.1045;
const SKY_SUN_TO_MOON_HANDOVER_END: f32 = -0.208;
fn sky_cloudFieldWrapUv(windowUv: vec2<f32>, phase: vec2<f32>, dims: vec2<u32>) -> vec2<f32> {
let span = max(vec2<f32>(dims) - 1.0, vec2<f32>(1.0));
let s = windowUv * span + phase - 0.5;
return (s - floor(s / span) * span + 0.5) / vec2<f32>(dims);
}
fn sky_cloudFieldRim(fieldUv: vec2<f32>) -> f32 {
return 1.0 - smoothstep(0.46, 0.5, max(abs(fieldUv.x - 0.5), abs(fieldUv.y - 0.5)));
}
fn sky_cloudFieldFarOf(far: vec4<f32>) -> vec3<f32> {
return vec3<f32>(fma(far.a, 0.0007331378299120235, far.r), far.gb);
}
fn sky_cloudClosing() -> f32 {
return smoothstep(0.75, 1.0, sky.cloudsCoverage);
}
fn sky_cloudSheet() -> f32 {
return select(0.0, 1.0 - sky.cloudsCoverage + 0.7 * sky_cloudClosing(), sky.cloudsCoverage > 0.75);
}
fn sky_cloudFieldOf(tap: vec3<f32>) -> f32 {
return max(tap.r, sky_cloudSheet());
}
fn sky_cloudDensity(field: f32) -> f32 {
let threshold = 1.0 - sky.cloudsCoverage;
return clamp((field - threshold) / SKY_CLOUD_EDGE, 0.0, 1.0);
}
fn sky_cloudPlanePos(world: vec3<f32>) -> vec2<f32> {
return world.xz * SKY_CLOUD_UNITS_PER_M - sky.cloudFieldDrift;
}
fn sky_moonShines() -> bool {
return normalize(sky.sunDirection).y < SKY_SUN_TO_MOON_HANDOVER_START && sky.moonEnabled > 0.5;
}
fn sky_lightBody() -> vec3<f32> {
return select(normalize(sky.sunDirection), normalize(sky.moonDirection), sky_moonShines());
}
fn sky_cloudClear(a: f32) -> f32 {
return clamp((1.0 - a - SKY_CLOUD_OPAQUE_T) / (1.0 - SKY_CLOUD_OPAQUE_T), 0.0, 1.0);
}
fn sky_cloudFieldFarTap(planePos: vec2<f32>) -> vec3<f32> {
let fieldUv = (planePos - sky.cloudFieldCenter) * sky.cloudFieldInvWidth + 0.5;
return sky_cloudFieldFarOf(textureSampleLevel(cloudField, lutSampler, sky_cloudFieldWrapUv(fieldUv, sky.cloudFieldPhase, textureDimensions(cloudField)), 0.0)) * sky_cloudFieldRim(fieldUv) * step(1e-6, sky.cloudFieldInvWidth);
}
const SKY_CLOUD_NEAR_FINE: f32 = 0.3;
const SKY_CLOUD_NEAR_HANDOVER: f32 = 0.42;
fn sky_cloudFieldTap(planePos: vec2<f32>, withNear: bool) -> vec3<f32> {
let nearUv = (planePos - sky.cloudNearCenter) * sky.cloudNearInvWidth + 0.5;
let nearRadius = length(nearUv - 0.5);
let nearWeight = (1.0 - smoothstep(SKY_CLOUD_NEAR_HANDOVER, 0.5, nearRadius)) * step(1e-6, sky.cloudNearInvWidth);
let farOnly = !withNear || nearWeight <= 0.0;
var nearTap = vec3<f32>(0.0);
if (!farOnly) {
let near = textureSampleLevel(cloudFieldNear, lutSampler, sky_cloudFieldWrapUv(nearUv, sky.cloudNearPhase, textureDimensions(cloudFieldNear)), 0.0);
nearTap = vec3<f32>(mix(near.r, near.a, smoothstep(SKY_CLOUD_NEAR_FINE, SKY_CLOUD_NEAR_HANDOVER, nearRadius)), near.g, near.b);
}
let far = sky_cloudFieldFarTap(planePos);
return select(mix(far, nearTap, nearWeight), far, farOnly);
}
fn sky_cloudField(planePos: vec2<f32>) -> f32 {
return sky_cloudFieldOf(sky_cloudFieldTap(planePos, true));
}
fn sky_moonIlluminance() -> vec3<f32> {
let nightFactor = 1.0 - smoothstep(SKY_SUN_TO_MOON_HANDOVER_END, SKY_SUN_TO_MOON_HANDOVER_START, normalize(sky.sunDirection).y);
return sky.moonColor * sky.moonIntensity * sky.moonEnabled * SKY_CLOUD_MOON_ILLUMINANCE * nightFactor;
}
fn sky_moonDeck() -> vec3<f32> {
return sky_moonIlluminance() * max(normalize(sky.moonDirection).y, 0.0) * SKY_CLOUD_MOON_DECK_LIGHT;
}
fn sky_cloudPlaneDistance(direction: vec3<f32>, planeY: f32) -> f32 {
let rise = planeY - sky.cloudEye.y;
return rise / select(direction.y, 1e-4, abs(direction.y) < 1e-4);
}
fn sky_cloudFill(field: f32) -> f32 {
return clamp((field - (1.0 - sky.cloudsCoverage)) / max(sky.cloudsCoverage, 1e-3), 0.0, 1.0);
}
fn sky_lobeProfile(z: f32) -> f32 {
let reach = select(SKY_CLOUD_LOBE_TOP - SKY_CLOUD_LOBE_WAIST, SKY_CLOUD_LOBE_WAIST, z < SKY_CLOUD_LOBE_WAIST);
return pow(abs(z - SKY_CLOUD_LOBE_WAIST) / reach, SKY_CLOUD_DOME_POWER);
}
fn sky_lobeHeight(fill: f32) -> f32 {
return SKY_CLOUD_LOBE_WAIST + pow(fill, 1.0 / SKY_CLOUD_DOME_POWER) * (SKY_CLOUD_LOBE_TOP - SKY_CLOUD_LOBE_WAIST);
}
fn sky_slabColumn(planePos: vec2<f32>, z: f32, edge: f32, near: bool) -> f32 {
if (z <= 0.0 || z >= 1.0) {
return 0.0;
}
let tap = sky_cloudFieldTap(planePos, near);
let dome = sky_lobeProfile(z) * sky.cloudsCoverage;
let excess = sky_cloudFieldOf(tap) - (1.0 - sky.cloudsCoverage);
let margin = excess - dome;
if (margin <= 0.0) {
return 0.0;
}
let s = smoothstep(0.0, 1.0, z);
let detail = clamp((mix(tap.g, tap.b, s) - 0.5) * inverseSqrt(1.0 - 2.0 * s * (1.0 - s)) + 0.5, 0.0, 1.0);
let shell = 1.0 - smoothstep(0.0, SKY_CLOUD_EROSION_REACH, margin);
let erode = SKY_CLOUD_EROSION * SKY_CLOUD_EROSION_REACH * mix(0.6, 1.0, z) * (1.0 - detail) * shell * smoothstep(0.0, SKY_CLOUD_EROSION_REACH, excess);
return clamp((margin - erode) / edge, 0.0, 1.0) * smoothstep(0.0, 0.05, z);
}
fn sky_cloudPhases(cosTheta: f32) -> array<f32, 5> {
var phases = array<f32, 5>();
var eccentricity = 1.0;
for (var k = 0u; k < 5u; k = k + 1u) {
phases[k] = atm_henyeyGreensteinPhase(cosTheta, 0.8 * eccentricity) * 0.8 + atm_henyeyGreensteinPhase(cosTheta, -0.2 * eccentricity) * 0.2;
eccentricity = eccentricity * 0.5;
}
return phases;
}
fn sky_cloudShares(d: f32, dq: f32, z: f32, sunUp: f32, sigma: f32, phases: array<f32, 5>, powderWeight: f32, sunGate: f32, groundShare: f32) -> vec2<f32> {
let pathLength = sky.cloudsThicknessM * max(1.0 - z, 0.0) / sunUp;
let lightOd = (d * 0.4 + dq * 0.6) * sigma * pathLength;
var sun = 0.0;
var attenuation = 1.0;
var contribution = 1.0;
for (var k = 0u; k < 5u; k = k + 1u) {
sun = sun + attenuation * exp(-lightOd * contribution) * phases[k];
attenuation = attenuation * 0.6;
contribution = contribution * 0.9;
}
let powder = mix(1.0, 1.0 - exp(-2.0 * lightOd), powderWeight * d);
let skyShare = mix(SKY_CLOUD_BELLY_AMBIENT + SKY_CLOUD_BELLY_SKY * (1.0 - sky.cloudsCoverage), 1.0, z) * 0.7;
return vec2<f32>(sunGate * (sun * powder + groundShare * (1.0 - z)), skyShare);
}
fn sky_cloudsLit(layer: vec4<f32>, direction: vec3<f32>, sunLight: vec3<f32>, ambient: vec3<f32>) -> vec4<f32> {
let moonDirection = normalize(sky.moonDirection);
let moonGlow = sky.moonColor * sky.moonIntensity * sky.moonEnabled * smoothstep(0.0, 0.25, moonDirection.y) * (atm_henyeyGreensteinPhase(dot(direction, moonDirection), 0.45) * 0.75 + 0.08) * 0.025;
let phaseCosine = select(cos(sky.moonPhase * 6.28318530718), dot(normalize(sky.sunDirection), moonDirection), sky.moonPhase < 0.0);
let bodyLight = select(sunLight, sky_moonIlluminance() * (0.5 - 0.5 * phaseCosine) * SKY_CLOUD_MOON_BEAM, sky_moonShines());
let lit = (bodyLight * layer.x + ambient * layer.y + moonGlow) * sky.cloudsColor;
return select(vec4<f32>(lit, layer.w), vec4<f32>(0.0), layer.w <= 0.0);
}
fn sky_cloudLayer(direction: vec3<f32>, steps: u32, jitter: f32) -> vec4<f32> {
let body = sky_lightBody();
let baseY = sky.cloudsAltitudeM;
let topY = baseY + sky.cloudsThicknessM;
let density = sky.cloudsDensity;
let tBase = sky_cloudPlaneDistance(direction, baseY);
let tTop = sky_cloudPlaneDistance(direction, topY);
let insideLayer = sky.cloudEye.y > baseY && sky.cloudEye.y < topY;
let reaches = select(tBase > 0.0 || tTop > 0.0, true, insideLayer);
let tEnter = select(min(max(tBase, 0.0), max(tTop, 0.0)), 0.0, insideLayer);
let faceHeight = select(min(abs(baseY - sky.cloudEye.y), abs(topY - sky.cloudEye.y)), 0.0, insideLayer);
let horizonFade = 1.0 - smoothstep(max(SKY_CLOUD_FADE_NEAR * faceHeight, SKY_CLOUD_FADE_FLOOR_M), max(SKY_CLOUD_FADE_FAR * faceHeight, SKY_CLOUD_FADE_FLOOR_M * 3.0), tEnter);
if (!reaches || horizonFade <= 0.0 || sky.cloudsEnabled < 0.5) {
return vec4<f32>(0.0);
}
let cosTheta = dot(direction, body);
let sunUp = max(body.y, 0.15);
let sunGate = smoothstep(-0.06, -0.005, body.y);
let sigma = density * SKY_CLOUD_SLAB_OD / max(sky.cloudsThicknessM, 1.0);
let phases = sky_cloudPhases(cosTheta);
let powderWeight = SKY_CLOUD_POWDER * (1.0 - smoothstep(-0.5, 0.3, cosTheta));
let groundShare = max(body.y, 0.0) * SKY_CLOUD_GROUND_BOUNCE * (1.0 - sky.cloudsCoverage) / ATM_PI;
let interior = sky.cloudInterior;
if (interior >= 1.5 && steps > 0u) {
let tExit = min(max(max(tBase, 0.0), max(tTop, 0.0)), tEnter + SKY_CLOUD_SLAB_REACH_M);
let span = max(tExit - tEnter, 1.0);
let probes = max(steps / 3u, 4u);
let probeStep = span / f32(probes);
var first = probes;
var last = 0u;
for (var i = 0u; i < probes; i = i + 1u) {
let p = sky.cloudEye + direction * (tEnter + (f32(i) + jitter) * probeStep);
let hit = sky_cloudDensity(sky_cloudFieldOf(sky_cloudFieldFarTap(sky_cloudPlanePos(p)))) > 0.0;
first = select(first, min(first, i), hit);
last = select(last, max(last, i), hit);
}
if (first >= probes) {
return vec4<f32>(0.0);
}
let tStart = tEnter + (f32(max(first, 1u) - 1u) + jitter) * probeStep;
let tEnd = tEnter + (f32(min(last + 1u, probes - 1u)) + jitter) * probeStep;
let marchSpan = max(tEnd - tStart, 1.0);
let stepLength = max(marchSpan / f32(steps), SKY_CLOUD_MIN_STEP_M);
let fineSteps = clamp(u32(ceil(marchSpan / stepLength)), 1u, steps);
var transmittance = 1.0;
var scattered = vec2<f32>(0.0);
for (var i = 0u; i < fineSteps; i = i + 1u) {
let segment = min(stepLength, marchSpan - f32(i) * stepLength);
let t = tStart + f32(i) * stepLength + jitter * segment;
let p = sky.cloudEye + direction * t;
let z = (p.y - baseY) / sky.cloudsThicknessM;
if (z <= 0.0 || z >= 1.0) {
continue;
}
let q = p + body * (max(topY - p.y, 0.0) / sunUp * 0.5);
let d = sky_slabColumn(sky_cloudPlanePos(p), z, SKY_CLOUD_SLAB_SKIN, true);
if (d <= 0.001) {
continue;
}
let dq = sky_slabColumn(sky_cloudPlanePos(q), (q.y - baseY) / sky.cloudsThicknessM, SKY_CLOUD_LIGHT_EDGE, false);
let stepOd = d * sigma * segment;
let stepTransmittance = exp(-stepOd);
let source = sky_cloudShares(d, dq, z, sunUp, sigma, phases, powderWeight, sunGate, groundShare);
let after = max(transmittance * stepTransmittance, SKY_CLOUD_OPAQUE_T);
scattered = scattered + source * (transmittance - after);
transmittance = after;
if (transmittance <= SKY_CLOUD_OPAQUE_T) {
break;
}
}
let coverage = 1.0 - transmittance;
let alpha = coverage * horizonFade;
return vec4<f32>(scattered / max(coverage, 1e-4), 0.0, alpha);
}
let tSilhouette = min(select(1e9, tBase, tBase > 0.0), select(1e9, tTop, tTop > 0.0));
let sliceFade = 1.0 - smoothstep(max(SKY_CLOUD_FADE_NEAR * faceHeight, SKY_CLOUD_FADE_FLOOR_M), max(SKY_CLOUD_FADE_FAR * faceHeight, SKY_CLOUD_FADE_FLOOR_M * 3.0), tSilhouette);
let silhouettePos = sky_cloudPlanePos(sky.cloudEye + direction * tSilhouette);
let field = sky_cloudField(silhouettePos);
let threshold = 1.0 - sky.cloudsCoverage;
let soft = clamp((field - threshold) / SKY_CLOUD_SLICE_EDGE, 0.0, 1.0);
let alpha = (1.0 - exp(-soft * density * SKY_CLOUD_PSEUDO_THICKNESS)) * sliceFade * sky.cloudsEnabled;
if (alpha <= 0.0) {
return vec4<f32>(0.0);
}
let height = sky_lobeHeight(sky_cloudFill(field));
let fromBelow = sky.cloudEye.y < baseY;
let z = select(mix(0.5, 1.0, height), SKY_CLOUD_SLICE_DEPTH, fromBelow);
let q = sky.cloudEye + direction * tSilhouette + body * (sky.cloudsThicknessM * (1.0 - z) / sunUp * 0.5);
let dq = sky_slabColumn(sky_cloudPlanePos(q), (q.y - baseY) / sky.cloudsThicknessM, SKY_CLOUD_LIGHT_EDGE, false);
return vec4<f32>(sky_cloudShares(soft, dq, z, sunUp, sigma, phases, powderWeight, sunGate, groundShare), 0.0, alpha);
}
fn sky_cloudSilhouette(direction: vec3<f32>) -> f32 {
let baseY = sky.cloudsAltitudeM;
let topY = baseY + sky.cloudsThicknessM;
let tBase = sky_cloudPlaneDistance(direction, baseY);
let tTop = sky_cloudPlaneDistance(direction, topY);
let insideLayer = sky.cloudEye.y > baseY && sky.cloudEye.y < topY;
let reaches = select(tBase > 0.0 || tTop > 0.0, true, insideLayer);
if (!reaches || sky.cloudsEnabled < 0.5) {
return 0.0;
}
let faceHeight = select(min(abs(baseY - sky.cloudEye.y), abs(topY - sky.cloudEye.y)), 0.0, insideLayer);
let tSilhouette = min(select(1e9, tBase, tBase > 0.0), select(1e9, tTop, tTop > 0.0));
let sliceFade = 1.0 - smoothstep(max(SKY_CLOUD_FADE_NEAR * faceHeight, SKY_CLOUD_FADE_FLOOR_M), max(SKY_CLOUD_FADE_FAR * faceHeight, SKY_CLOUD_FADE_FLOOR_M * 3.0), tSilhouette);
if (sliceFade <= 0.0) {
return 0.0;
}
let field = sky_cloudField(sky_cloudPlanePos(sky.cloudEye + direction * tSilhouette));
let soft = clamp((field - (1.0 - sky.cloudsCoverage)) / SKY_CLOUD_SLICE_EDGE, 0.0, 1.0);
return (1.0 - exp(-soft * sky.cloudsDensity * SKY_CLOUD_PSEUDO_THICKNESS)) * sliceFade * sky.cloudsEnabled;
}
fn sky_flatCloudCover(direction: vec3<f32>, mean: vec4<f32>) -> f32 {
if (mean.a <= 1e-4) {
return 0.0;
}
return sky_cloudSilhouette(direction);
}
fn sky_flatCloudLight(mean: vec4<f32>) -> vec3<f32> {
return mean.rgb / max(mean.a, 1e-4);
}
fn lume_half_to_f32(h: u32) -> f32 {
let sign = (h & 0x8000u) << 16u;
let exponent = (h >> 10u) & 0x1fu;
let mantissa = h & 0x3ffu;
let normal = bitcast<f32>(((exponent + 112u) << 23u) | (mantissa << 13u));
let subnormal = f32(mantissa) * 5.9604644775390625e-8;
return bitcast<f32>(sign | bitcast<u32>(select(normal, subnormal, exponent == 0u)));
}
fn lume_unpack2x16half(w: u32) -> vec2<f32> {
return vec2<f32>(lume_half_to_f32(w & 0xffffu), lume_half_to_f32(w >> 16u));
}
fn sky_cloudMapUv(d: vec3<f32>) -> vec2<f32> {
let ax = abs(d.x);
let az = abs(d.z);
let r = sqrt(max(1.0 - abs(d.y), 0.0));
let a = max(ax, az);
let b = min(ax, az);
let ratio = select(b / a, 0.0, a == 0.0);
var phi = atan(ratio) * 0.6366197723675814;
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
return u32((t.y / 8) * (side / 8) + t.x / 8);
}
fn sky_cloudMapDecode(w0: u32, tag: u32) -> vec4<f32> {
let rg = lume_unpack2x16half(w0);
return vec4<f32>(rg.x, rg.y, 0.0, lume_half_to_f32(tag >> 18u));
}
fn sky_cloudMapCount(tag: u32) -> u32 {
return (tag >> 12u) & 63u;
}
fn sky_cloudMapMeta(count: u32, frame: u32) -> u32 {
return (min(count, 63u) << 12u) | (frame & 4095u);
}
fn sky_cloudMapTap(texel: vec2<i32>, side: i32) -> vec2<u32> {
let t = sky_cloudMapWrap(texel, side);
let i = cloudMap[1u] + (cloudMap[4u + sky_cloudMapBlockOf(t, side)] & 65535u) * 128u + u32((t.y & 7) * 8 + (t.x & 7)) * 2u;
return select(vec2<u32>(cloudMap[i], cloudMap[i + 1u]), vec2<u32>(0u, sky_cloudMapMeta(63u, 0u)), sky_cloudMapOtherHalf(t, side, sky.cloudMapHalf));
}
fn sky_cloudMapBilinear(position: vec2<f32>, side: i32) -> vec4<f32> {
let p = position - 0.5;
let base = vec2<i32>(floor(p));
let f = p - floor(p);
var sum = vec4<f32>(0.0);
var weight = 0.0;
for (var j = 0; j < 2; j = j + 1) {
for (var i = 0; i < 2; i = i + 1) {
let words = sky_cloudMapTap(base + vec2<i32>(i, j), side);
let w = select(f.x, 1.0 - f.x, i == 0) * select(f.y, 1.0 - f.y, j == 0) * select(0.0, 1.0, sky_cloudMapCount(words.y) > 0u);
sum = sum + sky_cloudMapDecode(words.x, words.y) * w;
weight = weight + w;
}
}
return sum / max(weight, 1e-6);
}
fn sky_cloudMapRead(direction: vec3<f32>, side: f32) -> vec4<f32> {
let p = sky_cloudMapBilinear(sky_cloudMapUv(direction) * side, i32(side));
return vec4<f32>(p.rgb / max(p.a, 1e-4), p.a);
}
fn sky_cloudLayerShown(direction: vec3<f32>, mapSide: f32, marchDirection: vec3<f32>, steps: u32, jitter: f32) -> vec4<f32> {
let mapped = mapSide > 0.5;
var settled = vec4<f32>(0.0);
if (mapped) {
settled = sky_cloudMapRead(direction, mapSide);
if (sky.cloudMapPending <= 0.0) {
return settled;
}
}
let slice = sky_cloudLayer(select(marchDirection, direction, mapped), select(steps, 0u, mapped), select(jitter, 0.5, mapped));
if (!mapped) {
return slice;
}
let cover = mix(settled.w, slice.w, sky.cloudMapPending);
let shares = mix(settled.xyz * settled.w, slice.xyz * slice.w, sky.cloudMapPending) / max(cover, 1e-4);
return vec4<f32>(shares, cover);
}
fn sky_domeCloudSteps() -> u32 {
return select(u32(sky.cloudSteps), 0u, sky.cloudMapPending >= 1.0);
}
struct SkyHeld {
sunToward: vec3<f32>,
sunUp: f32,
sunLight: vec3<f32>,
horizonZenith: f32,
sunFlat: vec3<f32>,
tintPlain: f32,
subUv: vec4<f32>,
}
var<private> sky_held: SkyHeld;
fn sky_holdView() -> SkyHeld {
var held: SkyHeld;
held.sunToward = normalize(sky.sunDirection);
held.sunUp = sky_sunUp(held.sunToward);
held.sunLight = sky_sunRadianceOf(held.sunToward);
held.horizonZenith = acos(clamp(atm_horizonCosZenith(sky.viewHeightKm), -1.0, 1.0));
held.sunFlat = normalize(vec3<f32>(held.sunToward.x, 0.0, held.sunToward.z) + vec3<f32>(1e-5, 0.0, 0.0));
held.tintPlain = select(0.0, 1.0, sky_tintPlain());
let size = vec2<f32>(textureDimensions(skyViewLut, 0));
held.subUv = vec4<f32>(0.5 / size.x, size.x / (size.x + 1.0), 0.5 / size.y, size.y / (size.y + 1.0));
return held;
}
fn sky_transmittance(direction: vec3<f32>) -> vec3<f32> {
return atm_sampleTransmittanceLut(transmittanceLut, lutSampler, ATM_PLANET_RADIUS_KM + sky.viewHeightKm, direction.y);
}
fn sky_sunRadianceOf(sunDirection: vec3<f32>) -> vec3<f32> {
return sky.sunIlluminance * atm_sampleTransmittanceLut(transmittanceLut, lutSampler, ATM_PLANET_RADIUS_KM + sky.viewHeightKm, clamp(sunDirection.y, -1.0, 1.0));
}
fn sky_sunRadiance(sunDirection: vec3<f32>) -> vec3<f32> {
return sky_held.sunLight;
}
fn sky_sunToward() -> vec3<f32> {
return sky_held.sunToward;
}
fn sky_aureole(direction: vec3<f32>, sunDirection: vec3<f32>) -> vec3<f32> {
let lobe = atm_henyeyGreensteinPhase(dot(direction, sunDirection), ATM_MIE_FORWARD_LOBE_G) * ATM_MIE_FORWARD_LOBE_WEIGHT;
let airMass = 1.0 / (max(direction.y, 0.0) + 1.0 / ATM_MIE_HORIZON_AIR_MASS);
let mieDepth = sky.mieScattering * ATM_MIE_SCALE_HEIGHT_KM * airMass;
let sunUp = sky_held.sunUp;
return sky_sunRadiance(sunDirection) * (lobe * mieDepth * sunUp);
}
fn sky_skyView(direction: vec3<f32>, sunDirection: vec3<f32>) -> vec3<f32> {
let skyViewUv = atm_skyViewUvHeld(direction, sky_held.sunFlat, sky_held.horizonZenith, sky_held.subUv);
return textureSampleLevel(skyViewLut, lutSampler, skyViewUv, 0.0).rgb;
}
fn sky_atmosphere(direction: vec3<f32>, sunDirection: vec3<f32>) -> vec3<f32> {
return sky_skyView(direction, sunDirection) + sky_aureole(direction, sunDirection);
}
fn sky_sunDisc(direction: vec3<f32>, sunDirection: vec3<f32>, transmittance: vec3<f32>, size: f32) -> vec3<f32> {
let angularRadius = max(sky.sunDiskAngularRadius * size, 1e-4);
let angle = acos(clamp(dot(direction, sunDirection), -1.0, 1.0));
return sky.sunIlluminance * atm_sunLimbDarkening(clamp(angle / angularRadius, 0.0, 1.0)) * transmittance * sky_discMask(angle, angularRadius) * sky.sunDiskIntensity * 2.5;
}
struct SkyNight {
celestial: vec3<f32>,
moonlit: vec3<f32>,
}
fn sky_nightAir(direction: vec3<f32>) -> vec3<f32> {
let up = clamp(direction.y, 0.0, 1.0);
let horizon = vec3<f32>(0.00738, 0.00919, 0.01615);
let zenith = vec3<f32>(0.00318, 0.00446, 0.0068);
return mix(horizon, zenith, smoothstep(0.0, 0.3, up)) + horizon * 0.6 * exp(-up / 0.06);
}
fn sky_night(direction: vec3<f32>, sunDirection: vec3<f32>, transmittance: vec3<f32>) -> SkyNight {
var night: SkyNight;
night.celestial = vec3<f32>(0.0);
night.moonlit = vec3<f32>(0.0);
let nightVisibility = sky_fadeOut(-0.208, -0.035, sunDirection.y);
if (nightVisibility > 0.0) {
night.moonlit = sky_nightAir(direction) * nightVisibility;
let moon = sky_moonLayer(direction, 1.0);
night.celestial = moon.rgb * nightVisibility * transmittance;
}
return night;
}
fn sky_nightVisible(sunDirection: vec3<f32>) -> bool {
return sky_fadeOut(-0.208, -0.035, sunDirection.y) > 0.0;
}
fn sky_nightAt(direction: vec3<f32>, sunDirection: vec3<f32>) -> SkyNight {
var night: SkyNight;
if (sky_nightVisible(sunDirection)) {
night = sky_night(direction, sunDirection, sky_transmittance(direction));
}
return night;
}
fn sky_tintPlain() -> bool {
return all(sky.horizonTint == vec3<f32>(1.0)) && all(sky.zenithTint == vec3<f32>(1.0)) && sky.saturation == 1.0;
}
fn sky_sunUp(sunDirection: vec3<f32>) -> f32 {
return smoothstep(-0.03, 0.0, sunDirection.y);
}
fn sky_cloudAmbient(direction: vec3<f32>, sunDirection: vec3<f32>, moonlit: vec3<f32>) -> vec3<f32> {
let view = select(direction, vec3<f32>(direction.x, -direction.y, direction.z), direction.y < 0.0);
let skyView = sky_skyView(view, sunDirection);
let deck = vec3<f32>(dot(skyView, vec3<f32>(0.2126, 0.7152, 0.0722)));
return mix(skyView + sky_aureole(view, sunDirection), deck, sky_cloudClosing()) + moonlit + sky_moonDeck() * sky.cloudsCoverage;
}
fn sky_sunPoint(direction: vec3<f32>, sunDirection: vec3<f32>) -> vec3<f32> {
let r = max(sky.sunDiskAngularRadius, 1e-4);
if (dot(direction, sunDirection) >= 1.0 - r * r) {
return sky_sunDisc(direction, sunDirection, sky_transmittance(direction), 1.0);
}
return vec3<f32>(0.0);
}
fn sky_artistic(color: vec3<f32>, direction: vec3<f32>) -> vec3<f32> {
let elevation = smoothstep(0.0, 0.45, clamp(direction.y, 0.0, 1.0));
let tint = mix(sky.horizonTint, sky.zenithTint, elevation);
return atm_adjustSaturation(color * tint, sky.saturation);
}
var<private> sky_tintsLayer: f32 = 0.0;
var<private> sky_deck: vec4<f32>;
fn sky_radianceLayer(direction: vec3<f32>, layer: vec4<f32>, night: SkyNight) -> vec3<f32> {
let sunDirection = sky_sunToward();
let atmosphere = sky_atmosphere(direction, sunDirection);
var clouds = vec4<f32>(0.0);
if (layer.w > 0.0) {
clouds = sky_cloudsLit(layer, direction, sky_sunRadiance(sunDirection), sky_cloudAmbient(direction, sunDirection, night.moonlit));
}
sky_deck = clouds;
let clear = sky_cloudClear(clouds.a);
let total = mix(atmosphere + night.moonlit, clouds.rgb, clouds.a) + (night.celestial + sky_sunPoint(direction, sunDirection)) * clear;
if (sky_held.tintPlain > 0.5) {
return total;
}
let light = clouds.rgb * clouds.a * (1.0 - sky_tintsLayer);
return sky_artistic(total - light, direction) + light;
}
struct SkyBackground {
horizonColor: vec3<f32>,
kind: f32,
zenithColor: vec3<f32>,
screenWeight: f32,
clearColor: vec3<f32>,
equirectYaw: f32,
equirectWidth: f32,
equirectBlurLane: f32,
equirectBlurMip: f32,
physicalBlend: f32,
gradientCurve: f32,
fogSky: f32,
flatShare: f32,
halfAlone: f32,
groundColor: vec3<f32>,
groundShare: f32,
equirectBlurLevels: f32,
openSky: f32,
starsWhole: f32,
flatCloud: vec4<f32>,
}
var<private> lume_storeOnScreen: bool = true;
${gK.slice(999,2254)}${gK.slice(2462,2521)}${gK.slice(3293,3900)}fn shade_fogHeightColumn() -> f32 {
${gK.slice(3408,3522)}return max(-eye, 0.0) + exp(-k * max(eye, 0.0)) / k;
${gK.slice(3898,4729)}fn shade_fogStep(x: f32) -> vec4<f32> {
let u = fract(x * 0.03125 + 1.0) * 32.0;
let i0 = u32(floor(u)) % 32u;
let i1 = (i0 + 1u) % 32u;
return mix(fogHorizon[i0], fogHorizon[i1], fract(u));
}
fn shade_fogTurn(unit: vec3<f32>) -> f32 {
let sun = fogHorizon[33u];
let origin = select(vec2<f32>(1.0, 0.0), sun.xz, sun.w > 0.0 && dot(sun.xz, sun.xz) >= 1e-12);
return select(atan2(origin.x * unit.z - origin.y * unit.x, dot(origin, unit.xz)), 0.0, dot(unit.xz, unit.xz) < 1e-12);
}
fn shade_fogLean(unit: vec3<f32>, turn: f32) -> vec3<f32> {
let level = dot(unit.xz, unit.xz);
let sun = fogHorizon[33u];
var around: vec4<f32>;
if (sun.w <= 0.0) {
around = shade_fogStep(turn * 5.092958178940651);
} else {
let offset = acos(clamp((dot(unit, sun.xyz) - sun.y * 0.0175) / max(length(sun.xz) * 0.9998468632745717, 1e-6), -1.0, 1.0));
let x = sqrt(offset * 0.3183098861837907) * 16.0;
around = mix(shade_fogStep(-x), shade_fogStep(x), clamp(0.5 + 0.5 * turn / max(offset, 1e-6), 0.0, 1.0));
}
let step = mix(fogHorizon[32u], around, level);
if (step.w <= 0.0) { return step.rgb; }
let lobe = 0.16000000000000003 / (1.3599999999999999 - 1.2 * dot(unit, passLights.sunDirection));
return step.rgb * (1.0 + 0.6 * step.w * min(dot(passLights.sunColor, vec3<f32>(0.2126, 0.7152, 0.0722)), 1.0) * lobe * sqrt(lobe));
}
fn shade_fogFarPlane() -> f32 {
return select(3.4e38, frame.proj[3][2] / frame.proj[2][2], frame.proj[2][2] > 0.0);
}
fn shade_skyFogFactor(direction: vec3<f32>, fogSky: f32, openSky: f32) -> f32 {
let reach = select(1.7320508 / max(passLights.fogDensity, 1e-6), passLights.fogFar, passLights.fogMode == 1.0);
var layer = reach * 0.05;
if (passLights.fogHeight.y > 0.0) { layer = shade_fogHeightColumn(); }
let end = select(3.4e38, shade_fogFarPlane(), passLights.fogMode == 2.0 && passLights.fogHeight.y <= 0.0);
let open = select(direction.y, abs(direction.y), openSky > 0.0);
let rise = select(open, direction.y, passLights.fogHeight.y > 0.0);
let path = select(layer / 1e-4, min(layer / max(rise, 1e-4), end), rise > 0.0);
let authored = shade_authoredFogFactor(path) * fogSky;
if (passLights.viewFogAmount <= 0.0) { return authored; }
let viewPath = passLights.viewFogFar * 0.05 / max(open, 1e-4);
let view = smoothstep(passLights.viewFogNear, max(passLights.viewFogFar, passLights.viewFogNear + 1e-4), viewPath);
return max(authored, view * passLights.viewFogAmount);
}
@group(3) @binding(0) var<uniform> skybox: SkyBackground;
@group(3) @binding(1) var equirectTex: texture_2d<f32>;
@group(3) @binding(2) var equirectSampler: sampler;
@group(3) @binding(3) var equirectBlurCube: texture_2d_array<f32>;
fn lume_cubeFace(d: vec3<f32>) -> vec3<f32> {
let a = abs(d);
if (a.x >= a.y && a.x >= a.z) { return vec3<f32>(0.5 * (select(d.z, -d.z, d.x >= 0.0) / a.x + 1.0), 0.5 * (-d.y / a.x + 1.0), select(1.0, 0.0, d.x >= 0.0)); }
if (a.y >= a.z) { return vec3<f32>(0.5 * (d.x / a.y + 1.0), 0.5 * (select(-d.z, d.z, d.y >= 0.0) / a.y + 1.0), select(3.0, 2.0, d.y >= 0.0)); }
return vec3<f32>(0.5 * (select(-d.x, d.x, d.z >= 0.0) / a.z + 1.0), 0.5 * (-d.y / a.z + 1.0), select(5.0, 4.0, d.z >= 0.0));
}
fn lume_cubeSampleLevel(t: texture_2d_array<f32>, s: sampler, d: vec3<f32>, lod: f32, levels: f32) -> vec4<f32> {
let c = lume_cubeFace(d);
let p = f32(textureDimensions(t).x);
let b = exp2(levels - 1.0);
return textureSampleLevel(t, s, (c.xy * (p - 2.0 * b) + b) / p, i32(c.z), lod);
}
struct SkyVsOut {
@builtin(position) position: vec4<f32>,
@location(0) ndc: vec2<f32>,
@location(1) @interpolate(flat) heldSun: vec4<f32>,
@location(2) @interpolate(flat) heldLight: vec4<f32>,
@location(3) @interpolate(flat) heldFlat: vec4<f32>,
@location(4) @interpolate(flat) heldSubUv: vec4<f32>,
}
fn sky_bodySpan(across: f32, forward: f32, sine: f32) -> vec2<f32> {
let reach = across * across + forward * forward - sine * sine;
if (reach <= 0.0) { return vec2<f32>(-1e30, 1e30); }
let k = sqrt(reach);
let low = forward * k + across * sine;
let high = forward * k - across * sine;
return vec2<f32>(select(-1e30, (across * k - forward * sine) / low, low > 0.0), select(1e30, (across * k + forward * sine) / high, high > 0.0));
}
fn sky_bodyNdc(body: u32, corner: vec2<f32>) -> vec2<f32> {
if (body == 0u) { return corner * 2.0 - 1.0; }
let moon = body == 2u;
let sunRadius = max(sky.sunDiskAngularRadius, 1e-4);
let sunCos = 1.0 - sunRadius * sunRadius;
let moonRadius = max(sky.moonAngularRadius, 1e-4);
let disc = select(select(sqrt(max(1.0 - sunCos * sunCos, 0.0)), 1.0, sunCos <= 0.0), select(sin(moonRadius), 1.0, moonRadius >= 1.5), moon);
let sine = min(disc * 1.02 + 0.001, 1.0);
let toward = mat3x3<f32>(frame.view[0].xyz, frame.view[1].xyz, frame.view[2].xyz) * normalize(select(sky.sunDirection, sky.moonDirection, moon));
if (frame.proj[2][3] == 0.0 || -toward.z <= -sine) { return vec2<f32>(2.0); }
let x = sky_bodySpan(toward.x, -toward.z, sine) * frame.proj[0][0] - frame.proj[2][0];
let y = sky_bodySpan(toward.y, -toward.z, sine) * frame.proj[1][1] - frame.proj[2][1];
let pad = 4.0 / frame.viewportSize;
let low = clamp(vec2<f32>(min(x.x, x.y), min(y.x, y.y)) - pad, vec2<f32>(-1.0), vec2<f32>(1.0));
let high = clamp(vec2<f32>(max(x.x, x.y), max(y.x, y.y)) + pad, vec2<f32>(-1.0), vec2<f32>(1.0));
return low + corner * (high - low);
}
@vertex fn skyVs(@builtin(vertex_index) vertexIndex: u32, @builtin(instance_index) body: u32) -> SkyVsOut {
let corner = vec2<f32>(f32((vertexIndex << 1u) & 2u), f32(vertexIndex & 2u));
var out: SkyVsOut;
let ndc = sky_bodyNdc(body, corner);
out.position = vec4<f32>(ndc, 0.0, 1.0);
out.ndc = ndc;
let held = sky_holdView();
out.heldSun = vec4<f32>(held.sunToward, held.sunUp);
out.heldLight = vec4<f32>(held.sunLight, held.horizonZenith);
out.heldFlat = vec4<f32>(held.sunFlat, held.tintPlain);
out.heldSubUv = held.subUv;
return out;
}
fn sky_domeGradient(direction: vec3<f32>, position: vec2<f32>) -> vec3<f32> {
let screenUv = position / frame.viewportSize;
let directional = clamp(direction.y, 0.0, 1.0);
let curved = select(pow(directional, skybox.gradientCurve), directional, skybox.gradientCurve == 1.0);
let elevation = mix(curved, 1.0 - screenUv.y, skybox.screenWeight);
return mix(skybox.horizonColor, skybox.zenithColor, elevation);
}
fn sky_flatRadiance(direction: vec3<f32>, night: SkyNight) -> vec3<f32> {
let total = sky_skyView(direction, sky_sunToward()) + night.moonlit;
let cover = sky_flatCloudCover(direction, skybox.flatCloud);
return sky_artistic(total * (1.0 - cover) + (night.celestial + sky_sunPoint(direction, sky_sunToward())) * sky_cloudClear(cover), direction) + sky_flatCloudLight(skybox.flatCloud) * cover;
}
@fragment fn skyFs(in: SkyVsOut) -> @location(0) vec4<f32> {
if (skybox.kind == 1.0 && skybox.fogSky <= 0.0 && passLights.viewFogAmount <= 0.0 && skybox.groundShare <= 0.0) {
return vec4<f32>(skybox.clearColor, 1.0);
}
sky_held = SkyHeld(in.heldSun.xyz, in.heldSun.w, in.heldLight.xyz, in.heldLight.w, in.heldFlat.xyz, in.heldFlat.w, in.heldSubUv);
var direction: vec3<f32>;
if (frame.proj[2][3] != 0.0) {
let ndc = in.ndc;
direction = normalize(vec3<f32>((ndc.x + frame.proj[2][0]) / frame.proj[0][0], (ndc.y + frame.proj[2][1]) / frame.proj[1][1], -1.0) * mat3x3<f32>(frame.view[0].xyz, frame.view[1].xyz, frame.view[2].xyz));
} else {
let nearPoint = frame.inverseViewProj * vec4<f32>(in.ndc, 1.0, 1.0);
let farPoint = frame.inverseViewProj * vec4<f32>(in.ndc, 0.0, 1.0);
direction = normalize(farPoint.xyz / farPoint.w - nearPoint.xyz / nearPoint.w);
}
var color = skybox.clearColor;
let kind = skybox.kind;
if (kind == 2.0) {
color = sky_domeGradient(direction, in.position.xy);
} else if (kind == 3.0) {
let night = sky_nightAt(direction, sky_sunToward());
var radiance = vec3<f32>(0.0);
if (skybox.flatShare < 1.0) {
var layer = vec4<f32>(0.0);
if (sky.cloudMap > 0.5 || sky.cloudsEnabled > 0.5) {
let cloudJitter = fract(52.9829189 * fract(dot(in.position.xy, vec2<f32>(0.06711056, 0.00583715))));
layer = sky_cloudLayerShown(direction, sky.cloudMap, direction, sky_domeCloudSteps(), cloudJitter);
}
radiance = sky_radianceLayer(direction, layer, night);
}
if (skybox.flatShare > 0.0) {
radiance = mix(radiance, sky_flatRadiance(direction, night), skybox.flatShare);
}
color = radiance;
if (skybox.physicalBlend < 1.0) {
color = mix(sky_domeGradient(direction, in.position.xy), radiance, skybox.physicalBlend);
}
sky_deck.a = sky_deck.a * (1.0 - skybox.flatShare) * skybox.physicalBlend;
} else if (kind == 4.0) {
let cosYaw = cos(skybox.equirectYaw);
let sinYaw = sin(skybox.equirectYaw);
let rotated = vec3<f32>(direction.x * cosYaw - direction.z * sinYaw, direction.y, direction.x * sinYaw + direction.z * cosYaw);
let pixelAngle = length(fwidth(direction));
let texelsPerRadian = skybox.equirectWidth * 0.15915494309189535;
let lod = max(log2(max(pixelAngle * texelsPerRadian, 1e-6)), 0.0);
let sharp = textureSampleLevel(equirectTex, equirectSampler, sky_equirectUv(rotated), lod).rgb;
let blurred = lume_cubeSampleLevel(equirectBlurCube, equirectSampler, direction, skybox.equirectBlurMip, skybox.equirectBlurLevels).rgb;
color = mix(sharp, blurred, skybox.equirectBlurLane);
}
let fog = shade_skyFogFactor(direction, skybox.fogSky, skybox.openSky);
var fogColor = vec3<f32>(0.0);
if (fog > 0.0 || skybox.groundShare > 0.0) {
fogColor = shade_fogLean(direction, shade_fogTurn(direction));
}
if (fog > 0.0) {
color = mix(color, fogColor, fog);
let clouds = sky_deck;
let rise = sky.cloudEye.y - sky.cloudsAltitudeM - sky.cloudsThicknessM;
if (clouds.a > 0.0 && direction.y < 0.0 && rise > 0.0 && frame.proj[2][3] != 0.0) {
let reach = rise / -direction.y;
let depth = reach * max(-(frame.view * vec4<f32>(direction, 0.0)).z, 1e-3);
color = mix(color, mix(clouds.rgb, fogColor, shade_fogFactor(depth, direction.y * reach)), clouds.a * fog);
}
}
if (skybox.groundShare > 0.0) {
let lit = skybox.groundColor * (0.31830988618 * (passLights.ambientMean + max(passLights.sunDirection.y, 0.0) * passLights.sunColor * passLights.sunIntensity));
let ground = mix(lit, fogColor, shade_fogFactor(2.0 / max(-direction.y, 1e-4), direction.y));
color = mix(color, ground, skybox.groundShare * (1.0 - smoothstep(-0.002, 0.0, direction.y)));
}
return vec4<f32>(color, 1.0);
}
`,AJJ=28,OUu=(AJJ+4)*4;var mVY=(function(e){return`${e.colorFormat}/${jEz}/s${e.samples}${e.motion?"/motion":""}`});function Tun(e){return`sky/background/${mVY(e)}`}function W_m(e,t){let v$7;{let e$10=t;{let e=e$10;let t=dG[icY(e)]??"none";for(let[r,i]of KG)if((e&r)!==0)t+=`-${i}`;v$7=t;}}return`sky/background/${v$7}/${mVY(e)}`}var vV=7,Qk7=[RDp(0,vV,"uniform"),v6R(1,vV,"float","2d"),v6R(2,vV,"float","2d"),v6R(4,vV,"float","2d"),Zyu(5,vV,"filtering"),v6R(9,vV,"float","2d"),RDp(10,vV,"read-only-storage")],uWt=[RDp(0,4,"uniform"),RDp(1,4,"storage")],Oi2=[RDp(0,4,"uniform"),RDp(6,4,"storage"),RDp(7,4,"uniform")],o3z="sky/cloud-map",gMg="sky/cloud-map-blocks",Wu9="sky/cloud-map-resize";function fV(e,t,r,i,n,l){return{label:i,layout:e.createPipelineLayout({label:i,bindGroupLayouts:l.map(([e,r])=>t.getBindGroupLayout(e,r))}),compute:{module:r,entryPoint:n}}}function VV8(e,t,r){return fV(e,t,r,o3z,"cloudMapCs",[[klf,"lume frame"],[uWt,"sky cloud map"],[Qk7,"sky resources"]])}function hL8(e,t,r){return fV(e,t,r,gMg,"cloudMapBlocksCs",[[klf,"lume frame"],[Oi2,"sky cloud map blocks"]])}function stl(e,t,r){return fV(e,t,r,Wu9,"cloudMapResizeCs",[[uWt,"sky cloud map"],[uWt,"sky cloud map"]])}var PhZ=[RDp(CYC,4,"storage")],M4y="sky/flat-cloud";function o4I(e,t,r){return fV(e,t,r,M4y,"flatCloudCs",[[klf,"lume frame"],[PhZ,"sky flat cloud"],[Qk7,"sky resources"]])}var kS2=[RDp(0,2,"uniform"),v6R(1,2,"float","2d"),Zyu(2,2,"filtering"),v6R(3,2,"float","2d-array")],RV=[...kS2,RDp(jhu,2,"uniform"),v6R(wu4,2,"float","2d"),v6R(CI9,2,"float","2d"),v6R(oJD,2,"depth","2d"),v6R(V$V,1,"unfilterable-float","2d")];function OV(e){return v6R(e+epF,2,"float","2d")}var cV=[...RV,OV(jhu)];function bez(e,t){return t?e.getBindGroupLayout(cV,"sky scripted background lane (grids)"):e.getBindGroupLayout(RV,"sky scripted background lane")}var zV=RV.map(((e)=>e.binding===V$V?{...e,visibility:2}:e));function Ior(e){return e.getBindGroupLayout(zV,"sky kept keep lane")}var TV=[RDp(0,2,"uniform")];var LV=[...TV,RDp(jhu,2,"uniform")];var NV=[...LV,OV(jhu)];function S65(e,t){if(t===null)return e.getBindGroupLayout(TV,"sky offscreen lane");return t.grids?e.getBindGroupLayout(NV,"sky offscreen scripted lane (grids)"):e.getBindGroupLayout(LV,"sky offscreen scripted lane")}var mk_=[RDp(qZP,2,"uniform"),RDp(LiR,2,"storage"),RDp(g4H,2,"uniform"),RDp(v9_,2,"storage")],RVm="sky/offscreen",ThI="sky/horizon",q3M="sky/horizon mean";function HkS(e){return`${RVm}/script/${e}`}function J5k(e,t,r,i,n){let l=t.getBindGroupLayout(klf,"lume frame"),s=t.getBindGroupLayout(mk_,"sky offscreen"),o=t.getBindGroupLayout(Qk7,"sky resources");return{label:r,layout:e.createPipelineLayout({label:r,bindGroupLayouts:[l,s,o,S65(t,n)]}),vertex:{module:i,entryPoint:"fullscreenVs"},fragment:{module:i,entryPoint:"offscreenFs",targets:[{format:zkH}]}}}function I$b(e,t){return`sky/background/script/${t}/${mVY(e)}`}var xtT=Ij1(!1);var JG7=(function(e){let t=[{format:e.colorFormat}];if(e.motion)t.push({format:Zjv,writeMask:0});return t});function NVx(e,t,r,i,n){return SV(e,t,i,n,t.getBindGroupLayout(kS2,"sky background lane"),"skyVs","skyFs",JG7(r),r.samples,!0)}function SV(e,t,r,i,n,l,s,o,a,u,d){let f=t.getBindGroupLayout(klf,"lume frame"),c=t8L(t,[typeof i==="string"?i:i.code]),h=t.getBindGroupLayout(Qk7,"sky resources"),p=typeof i==="string"?e.createShaderModule({label:r,code:i}):i.module;return{label:r,layout:SJN(e,r,[f,c,h,n],c),vertex:{module:p,entryPoint:l},fragment:{module:p,entryPoint:s,targets:o,...d?{constants:d}:{}},...u?{depthStencil:xtT}:{},multisample:{count:a}}}function c6M(e,t,r,i,n,l,s=!1){return SV(e,t,i,n,bez(t,s),"skyVs","skyFs",JG7(r),r.samples,!0,l)}function jik(e,t,r,i=!1){let n=i?"kept":"half";return t==="half"||t==="tiles"?`sky/${n}/script/${e}/${t}`:`sky/${n}/script/${e}/${t}/${mVY(r)}`}function Qql(e,t,r,i,n,l,s,o=!1,a=!1){let u=a&&n==="tiles"?Ior(t):bez(t,o),d=n==="half"||n==="tiles",f=a?{half:"skyAskFs",tiles:"skyKeepFs",blend:"skyKeptFs",tile:"skyKeptFs"}:{half:"skyHalfFs",tiles:"skyHalfTilesFs",blend:"skyBlendFs",tile:"skyFs"},c=d?[{format:a?WWl:n==="half"?IJU:T62}]:JG7(l);return SV(e,t,r,i,u,a?d?"skyKeptVs":"skyVs":n==="tile"?"skyTileVs":"skyVs",f[n],c,d?1:l.samples,!d,s)}var NIw=(function(e,t,r){return t.getRenderPipeline(Tun(r),()=>(NVx(e,t,r,Tun(r),Irj(AK))))});var HV={name:"sky background",mint:(function(e){let t={colorFormat:e.contract.sceneColorFormat,samples:e.contract.samples};return{key:Tun(t),kind:"render",descriptor:(()=>(NVx((e.device),(e.pipelines),t,Tun(t),Irj(AK))))}})};var Tp=(()=>globalThis.__spawnEngineConsole??=Object.create(console))(),Lp=new WeakSet,Qp=Symbol("colourless-occluder");var lxv=(function(e){return e[Qp]=!0,e});function yp(e){let t=e.depthStencil;if(t?.format!==jEz)return!1;if(t.depthCompare!==M3L&&t.depthCompare!==dlr)return!1;let r;yaE:{let e$40=e.fragment?.targets;{let e=e$40;if(e===void 0)break yaE;for(let t of e){r=t;break yaE;}}}if(e[Qp]===!0){return (t.depthWriteEnabled===!0&&r!==null&&r!==void 0&&r.blend===void 0);}if(t.depthWriteEnabled!==!1)return!1;return (r!==null&&r!==void 0&&r.blend===void 0&&r.writeMask!==0);}function vc0(e){return Lp.has(e)}var SR=250,Sp0=1000;class bzK{constructor(e,t=!1,r=!1){this.decided=void 0;this.final=void 0;this.yieldsToRest=void 0;this.verdictValue=void 0;this.starvedReadings=0;this.widthValue=null;this.wholeAtMs=null;this.generationNewest=0;this.generationAnsweredAtMs=null;this.generationPeak=0;this.climbCeiling=1/0;this.generationUnderCover=!1;this.lastSettleAtMs=-1/0;this.newestBuildSettledAtMs=null;this.reading=null;this.nextBuild=1;this.atDevice=new Map;this.settled=new Map;this.named=new Map;this.reachedAtMs=new Map;this.fenceTokens=new Float64Array(fR);this.fenceArmedAtMs=new Float64Array(fR);this.fenceNewestBuild=new Float64Array(fR);this.fenceBuildsAtDevice=new Float64Array(fR);this.fenceUnderCover=new Float64Array(fR);this.fenceCount=0;this.settling={armedAtMs:0,newestBuild:0,buildsAtDevice:0,underCover:!1};this.besideFrom=new Map;this.nextFence=1;this.baselineRoundTripMaxMs=null;this.shortestRoundTripMs=null;this.counts={fences:0,unheld:0,overtaken:0,whileBuilding:0,afterBuilds:0,noFloor:0,short:0,buildsShort:0,workerHeld:0,foreign:0};this.yieldsToRest=r&&!t,this.verdictValue=e&&!this.yieldsToRest,this.decided=t||this.yieldsToRest,this.final=t||this.yieldsToRest}get verdict(){return this.verdictValue}get isDecided(){return this.decided}get isFinal(){return this.final}get decidedBy(){return this.reading}get starvedWidth(){return this.widthValue}get watchesWidth(){return this.final&&this.widthValue!==null}narrowWidth(e){let t=this.widthValue;if(t!==null&&e>t)return!1;let r=(Math.max(1,Math.floor(e/2)));if(t!==null&&r>=t)return!1;return this.widthValue=r,!0}get tally(){return{...this.counts,floorRoundTripMs:this.floor(),baselineRoundTripMs:this.baselineRoundTripMaxMs}}standKept(){return $c0P($c0O(221,bzK.prototype["standKept"],"bzK.prototype[\"standKept\"]"),bzK.prototype,"standKept").apply(this,arguments)}standRest(){if(this.yieldsToRest)this.yieldsToRest=!1,this.final=!1;return this.standKept()}floor(){return this.baselineRoundTripMaxMs??this.shortestRoundTripMs}buildIssued(e,t){let r=this.nextBuild;if(this.nextBuild+=1,!this.final||this.watchesWidth||this.yieldsToRest){uc.call(this,r,e,t);}return r}buildAwaitsReach(e){if(this.atDevice.has(e))this.reachedAtMs.delete(e)}buildReached(e,t){if(this.atDevice.has(e)&&!this.reachedAtMs.has(e))this.reachedAtMs.set(e,t)}buildWithdrawn(e){let t=this.atDevice.get(e);if(this.atDevice.delete(e),this.besideFrom.delete(e),this.named.delete(e),this.reachedAtMs.delete(e),t!==void 0)this.noteGenerationWord(e,Math.max(t,this.newestBuildSettledAtMs??t))}buildSettled(e,t){let r=this.atDevice.get(e);if(r===void 0||!this.atDevice.delete(e))return null;if(this.besideFrom.delete(e),this.newestBuildSettledAtMs===null||t>this.newestBuildSettledAtMs)this.newestBuildSettledAtMs=t;return vc.call(this,e,r,t);}noteGenerationWord(e,t){if(e>this.generationNewest||this.generationAnsweredAtMs!==null)return;for(let e of this.atDevice.keys())if(e<=this.generationNewest)return;this.generationAnsweredAtMs=t}fenceArmed(e,t=!1){if(this.final&&!this.watchesWidth)return 0;if(this.final&&this.wholeAtMs===null&&this.widthValue!==null&&this.atDevice.size>=this.widthValue&&this.floor()!==null)wc.call(this,e);if(this.wholeAtMs!==null&&this.generationAnsweredAtMs===null&&this.atDevice.size>this.generationPeak)xc.call(this);if(t&&this.wholeAtMs!==null&&this.generationAnsweredAtMs===null)this.generationUnderCover=!0;let r,i;{yc.call(this);r=xa[0];i=xa[1]}return this.fenceTokens[i]=r,this.fenceArmedAtMs[i]=e,this.fenceNewestBuild[i]=this.nextBuild-1,this.fenceBuildsAtDevice[i]=this.atDevice.size,this.fenceUnderCover[i]=t?1:0,this.fenceCount=i+1,r}growFenceColumns(){this.fenceTokens=$jf(this.fenceTokens,0,Float64Array),this.fenceArmedAtMs=$jf(this.fenceArmedAtMs,0,Float64Array),this.fenceNewestBuild=$jf(this.fenceNewestBuild,0,Float64Array),this.fenceBuildsAtDevice=$jf(this.fenceBuildsAtDevice,0,Float64Array),this.fenceUnderCover=$jf(this.fenceUnderCover,0,Float64Array)}takeFence(a){return $c0P($c0C(169),bzK.prototype,"takeFence").call(this,a)}fenceSettled(a,b){return $c0P($c0C(170),bzK.prototype,"fenceSettled").apply(this,arguments)}readWidth(a,b,c,d,e,f){return $c0P($c0C(171),bzK.prototype,"readWidth").call(this,a,b,c,d,e,f)}readStormWidth(e,t,r,i,n,l){let s=this.widthValue;if(s===null||s<2||e.buildsAtDevice>s)return null;return this.readHeld(e,t,r,i,n,l)}readClimb(a){return $c0P($c0C(172),bzK.prototype,"readClimb").call(this,a)}readLapse(a){return $c0P($c0C(173),bzK.prototype,"readLapse").call(this,a)}readHeld(e,t,r,i,n,l,s=Sp0){let o=[],a=null;for(let t of this.atDevice.keys())if(t<=e.newestBuild)o.push(t);for(let[t,r]of this.settled)if(t<=e.newestBuild)a=a===null?r:Math.max(a,r);if(o.length>0)this.counts.whileBuilding+=1;else this.counts.afterBuilds+=1;if(l===null)return this.counts.noFloor+=1,null;let u=Math.max(0,r-n);if(u<=l+s){if(r>l+s)this.counts.workerHeld+=1;else this.counts.short+=1;return this.readBeside(e,t,u,o)}if(o.length===0&&(a===null||a-e.armedAtMs<=l+s))return this.counts.buildsShort+=1,null;let d=this.servedMs(e,o,i,t);if(u-d>l+s)return this.counts.foreign+=1,null;return{verdict:!0,fenceArmedAtMs:e.armedAtMs,fenceSettledAtMs:t,buildsAtDevice:e.buildsAtDevice,buildsSettledAtMs:o.length>0?null:a,floorRoundTripMs:l,baselineRoundTripMs:this.baselineRoundTripMaxMs,workerHeldMs:n,besideThroughMs:null,heldFromMs:i,starvedReadings:this.starvedReadings+1,lapsedAtMs:null,servedMs:d,...this.waitedBehind(e,o)}}servedMs(a,b,c,d){return $c0P($c0C(174),bzK.prototype,"servedMs").call(this,a,b,c,d)}waitedBehind(e,t){let r=[];for(let e of t){let t=this.named.get(e);if(t!==void 0)r.push({name:t.name,issuedAtMs:t.issuedAtMs,settledAtMs:null})}for(let[t,i]of this.settled){if(t>e.newestBuild||i<=e.armedAtMs)continue;let n=this.named.get(t);if(n!==void 0)r.push({name:n.name,issuedAtMs:n.issuedAtMs,settledAtMs:i})}return r.length>0?{waitedBehind:r}:{}}readBeside(a,b,c,d){return $c0P($c0C(175),bzK.prototype,"readBeside").call(this,a,b,c,d)}deviceReset(){return $c0P($c0C(176),bzK.prototype,"deviceReset").call(this)}endGeneration(){this.wholeAtMs=null,this.generationNewest=0,this.generationAnsweredAtMs=null,this.generationPeak=0,this.generationUnderCover=!1}decide(e){if(this.decided=!0,this.verdictValue=e.verdict,this.reading=e,this.besideFrom=mnS(this.besideFrom),!e.verdict)return this.prune(),e;this.starvedReadings=e.starvedReadings,this.narrowWidth(e.buildsAtDevice);let t={...e,poolWidth:this.widthValue??1};if(this.reading=t,this.starvedReadings<2)return this.prune(),t;if(this.final=!0,this.watchesWidth)return this.climbCeiling=Math.min(this.climbCeiling,this.widthValue??1),this.prune(),t;return this.fenceCount=0,JrI(this.atDevice),JrI(this.settled),JrI(this.named),JrI(this.reachedAtMs),t}prune(){return $c0P($c0C(177),bzK.prototype,"prune").call(this)}}var fR=8;function pFw(e,t){return`freeze ${Sp0} ms width ${Math.max(1,Math.floor(t))} ${e}`}function E6_(e){let t=new RegExp(`\\bfreeze ${Sp0} ms width ([1-9][0-9]*)\\b`).exec(e??"");return t&&Number(t[1])}function k$x(a){return $c0O(222).call(this,a)}var W8p="a still camera's builds ride the pool's ceiling all the same, since nobody watches its frames (A STILL CAMERA'S FRAMES ARE NOBODY'S)";function dR(a){return (dR=$c0C(178)).call(this,a)}function PzK(e){if(e>2)return"a starved frame under the final word's width, so the width halves again";if(e===2)return"the second starved frame of this session, so the word is final";return null}function RiT(a){return $c0O(223).call(this,a)}function amD(e,t=!1){let r=(e)=>e===null?"-":`+${Math.round(e)} ms`,i=e.baselineRoundTripMs===null?`the shortest word read here took ${Math.round(e.floorRoundTripMs)} ms, no unheld word yet`:`an unheld word takes at most ${Math.round(e.baselineRoundTripMs)} ms here`;if(e.climbedFromWidth!==void 0){let n=t?W8p:dR(e),l=e.poolWidth===e.climbedFromWidth+1?"the width climbs by one":`the width climbs from ${e.climbedFromWidth} to the ${e.poolWidth} that stood`;return`pipeline builds stood ${e.buildsAtDevice} at once beside this host's frames, from the frame submitted at ${r(e.fenceArmedAtMs)} to the last of them answered at ${r(e.buildsSettledAtMs)}, and every frame armed beside them came back by ${r(e.fenceSettledAtMs)} with none held past ${e.climbedUnderCover===!0?"the freeze proof, the proof for a frame under the loading cover":"the submit proof"} (${i}): ${l}, and ${n}; a frame held past the submit proof halves the width again`}if(e.verdict||e.lapsedAtMs!==null){let n=e.buildsSettledAtMs===null?`the ${e.buildsAtDevice} build(s) then at the device still standing at that word`:`the ${e.buildsAtDevice} build(s) then at the device settled at ${r(e.buildsSettledAtMs)}`,l=e.heldFromMs>e.fenceArmedAtMs?`, ${Math.round(e.fenceSettledAtMs-e.heldFromMs)} ms after the frame ahead of it answered at ${r(e.heldFromMs)}`:"",s=e.workerHeldMs>0?`, ${Math.round(e.workerHeldMs)} ms of it this worker's own`:"",o=e.waitedBehind===void 0?"":`: ${e.waitedBehind.map((e)=>`${e.name} asked at ${r(e.issuedAtMs)}${e.settledAtMs===null?"":` and settled at ${r(e.settledAtMs)}`}`).join(", ")}`,a=`the frame submitted at ${r(e.fenceArmedAtMs)} completed at ${r(e.fenceSettledAtMs)}${l}${s}, with ${n}${o} (${i})`;if(e.held===!0)return`pipeline builds held a frame past the submit proof under the final word \u2014 measured: ${a}; the width halves: ${t?W8p:dR(e)}; the next session climbs it again by generations whose frames all come back inside the submit proof`;if(e.lapsedAtMs!==null)return`pipeline builds blocked this host's submits in a storm that ended at ${r(e.lapsedAtMs)} \u2014 measured: ${a}; no build has stood at the device for ${SR} ms, so the judge reads the next storm afresh: ${t?W8p:"builds stay one at a time until two frames complete at the unheld pace beside one"}, and a second starved frame makes the word final`;let u=PzK(e.starvedReadings)??`until this storm ends: an unheld frame's word with no build at the device for ${SR} ms reads the next storm afresh under the same pace, two frames at the unheld pace beside a build widen the pool, and a second starved frame makes the word final`;return`pipeline builds block this host's submits \u2014 measured: ${a}; ${t?W8p:dR(e)}, ${u}`}return`pipeline builds run beside this host's submits \u2014 measured: the frame submitted at ${r(e.fenceArmedAtMs)} completed at ${r(e.fenceSettledAtMs)} while a build issued before it still stood at the device, and frames still completed at ${r(e.besideThroughMs)} with it standing (${e.buildsAtDevice} at the submit; ${i}); a frame held past the floor later overturns this word`}var FVg=24;function pZ(){return{attempts:0,cpuMs:[],gpuMs:[],asks:[],termMs:[],ownMs:[]}}class gau{constructor(e,t=24){this.onAsksSpent=void 0;this.asksPerArm=void 0;this.run=null;this.sinceOwnArm=1/0;this.armFrame=void 0;this.intervalOwned=!1;this.readOwned=!1;this.arrivalOwned=!1;this.nextArrivalOwned=!1;this.latchedOwned=!1;this.term={termMs:NaN,ownMs:NaN};this.onAsksSpent=e,this.asksPerArm=t}get active(){return this.run?.kind??null}get holdsFirstArm(){let e=this.run;return e===null?null:e.arm===e.first}get reading(){let e=this.run;return e!==null&&e.reading!==null?e.kind:null}start(e,t,[r,i]=[pZ(),pZ()]){if(this.run!==null)return!1;return this.run={kind:e,first:r,second:i,arm:r,settleFrames:t,armFrames:0,settled:t<=0,opened:!1,tainted:"straddle",served:!0,expectKick:!1,cpuSumMs:0,cpuFrames:0,reading:null,readCpuSumMs:0,readCpuFrames:0,kickCpuPending:!1,voided:-2},!0}cancel(){this.run=null}yield(){let e=this.run;if(e===null)return;this.run=null;let{first:t,second:r}=e;return t.attempts=r.attempts=Math.max(t.attempts,r.attempts),[t,r]}voidPair(){let e=this.run;if(e===null)return;let t=e.first.attempts+e.second.attempts+(e.reading===null?0:1);e.voided=t-t%2}open(a,b){return $c0C(179).call(this,a,b)}kick(e){let t=this.run;if(t===null||!t.opened)return;t.expectKick=!1;let r=!t.tainted&&t.settled&&t.served&&e;t.reading=r?t.arm:null,t.readCpuSumMs=t.cpuSumMs,t.readCpuFrames=t.cpuFrames,t.kickCpuPending=!0,hZ(t,r||t.tainted==="straddle"),t.tainted=!1}noteFrameCpu(a,b){return $c0P($c0C(180),gau.prototype,"noteFrameCpu").call(this,a,b)}settle(e){let t=this.run;if(t===null)return;let r=t.reading;if(r===null)return;t.reading=null;let i=t.readCpuFrames>0?t.readCpuSumMs/t.readCpuFrames:null;this.attempt(t,r,e,i)}attempt(e,t,r,i){let n=e.first.attempts+e.second.attempts;if(r!==null&&i!==null&&n-n%2!==e.voided)t.gpuMs.push(r),t.cpuMs.push(i),t.asks.push(n),t.termMs.push(this.term.termMs),t.ownMs.push(this.term.ownMs);t.attempts+=1;let l=e.first.attempts;if(l!==e.second.attempts||!Number.isInteger(Math.log2(l/this.asksPerArm))||l<this.asksPerArm)return!1;if(this.run=null,this.onAsksSpent(e.kind,e.first,e.second)!==!1)return!0;return this.run=e,!1}}function hZ(e,t){if(t&&(e.first.attempts+e.second.attempts)%2===0)e.arm=e.arm===e.first?e.second:e.first,e.armFrames=0;e.cpuSumMs=0,e.cpuFrames=0,e.served=!0,e.settled=e.armFrames>=e.settleFrames}function sJ$(e,t,r,i){let n=[];r.asks.forEach((e,t)=>n[e^1]=i[t]);let l=[],s=[];e.asks.forEach(function(e,r){if(n[e]===void 0)return;l.push(t[r]-n[e]),s.push(e)});let o=l.length,a=Math.floor(o/10);l.sort((e,t)=>e-t).fill(l[a],0,a).fill(l[o-1-a],o-a);let u=l.reduce((e,t)=>e+t/o,0);return[u,Math.sqrt(o*l.reduce((e,t)=>e+(t-u)**2,0)/(o-1))/(o-2*a),s]}function siA(e){let t=[...e].sort((e,t)=>e-t);return(t[t.length>>1]+t[t.length-1>>1])/2}function Vnj(e){let t=[...e].sort((e,t)=>e-t),r=1/0;for(let e=1;e<t.length;e+=1){let i=t[e]-t[e-1];if(i>0&&i<r)r=i}return Number.isFinite(r)?r:0}function FOh(e,t){return t>0?Math.round(e/t)>2:e>0}class xF1{constructor(){this.withheld=!1;this.relief=1;this.withheldGpuMs=NaN;this.rule=null;this.cpuSum=0;this.cpuSquares=0;this.gpuSum=0;this.gpuSquares=0;this.samples=0;this.sinceMs=NaN;this.lastSampleMs=NaN;this.settling=!1;this.counts=new Uint32Array(7);}noteSample(e,t,r,i,n){let l=this.lastSampleMs;if(this.lastSampleMs=e,t!==this.rule)return this.forget(t);if(t===null)return!1;let s=i?.graceKind==="compile",o=i===null||!e08(i)||s&&this.withheld;if(o||!(r.gpuMs>0)||this.settling)return this.counts[o?0:1+Number(r.gpuMs>0)]+=1,this.settling=!1,this.empty(),!1;if(n)return this.counts[3]+=1,!1;if(s)this.withheldGpuMs=NaN;if(this.sinceMs!==this.sinceMs)this.sinceMs=l!==l?e:l;let{cpuMs:a,gpuMs:u}=r;if(this.cpuSum+=a,this.cpuSquares+=a*a,this.gpuSum+=u,this.gpuSquares+=u*u,this.samples+=1,e-this.sinceMs<zJD)return!1;let d=this.samples>1&&this.decide();return this.empty(),d}decide(){return $c0C(181).call(this)}reset(){this.forget(null),this.lastSampleMs=NaN,this.relief=1}forget(e){let t=this.withheld;return this.rule=e,this.withheld=!1,this.settling=!1,this.withheldGpuMs=NaN,this.empty(),t}reading(){let e=this.counts;return{rule:this.rule,withheld:this.withheld,gpuRelief:this.rule===null?null:this.relief,windows:e[4],withholds:e[5],returns:e[6]}}broken(){let e=this.counts;return{grace:e[0],noGpu:e[1],settle:e[2],drain:e[3]}}empty(){this.cpuSum=0,this.cpuSquares=0,this.gpuSum=0,this.gpuSquares=0,this.samples=0,this.sinceMs=NaN}}var RG={onMs:null,offMs:null,onCpuMs:null,onGpuMs:null,offCpuMs:null,offGpuMs:null,reads:0,reason:null};function MtU(e,t=0,r=!1){return{...RG,drawn:r,even:!1,reads:t,reason:e}}var XD0="no GPU clock";function IqV(e){if(e.drawn)return"on";return e.even?"even":"off"}class $IY{see(e){if(this.device===e)return!1;return this.device=e,this.posture=this.pinned??"unmeasured",this.measured=null,this.withdrawals=0,this.parked=void 0,this.sides.reset(),this.trialArm=!1,this.armLastFrame=!1,this.readyFrame=-1,this.ready=!1,!0}drawn(e=this.device){return this.see(e),this.posture==="on"&&!this.sides.withheld||this.posture==="trial"&&this.trialArm}held(e){return this.see(e),this.posture==="on"||this.posture==="trial"}noteReady(e){if(this.readyFrame!==this.frame)this.readyFrame=this.frame,this.ready=!1;if(e)this.ready=!0}readyAtLastCollect(){return this.ready}openFrame(e,t){this.see(e),this.frame+=1,this.trialArm=t;let r=this.drawn(e),i=r!==this.armLastFrame;return this.armLastFrame=r,i}pin(e){if(this.pinned=e,e)this.posture=e}start(){if(this.posture==="unmeasured")this.posture="trial";return this.parked}withdraw(e){if(this.posture!=="trial")return;this.posture="unmeasured",this.withdrawals+=1,this.parked=e}settle(e){this.posture=IqV(e),this.measured=e}constructor(e){this.road=void 0;this.posture="unmeasured";this.withdrawals=0;this.parked=void 0;this.pinned=null;this.sides=new xF1;this.device=null;this.measured=null;this.trialArm=!1;this.armLastFrame=!1;this.frame=0;this.readyFrame=-1;this.ready=!1;this.road=e}sidesRule(){return!this.pinned&&this.posture==="on"?this.road:null}reading(){return Oq5(this.posture,this.measured)}}function Oq5(e,t){let r=t??RG;return{posture:e,onMs:r.onMs,offMs:r.offMs,onCpuMs:r.onCpuMs,onGpuMs:r.onGpuMs,offCpuMs:r.offCpuMs,offGpuMs:r.offGpuMs,reads:r.reads,reason:r.reason}}class bq5 extends $IY{constructor(){var $lptb;super("lit"),$lptb=null,"kept"in this?$lpd0(this,"kept",$lptb):this.kept=$lptb,$lptb=!1,"wanted"in this?$lpd0(this,"wanted",$lptb):this.wanted=$lptb,$lptb=!0,"cutLastFrame"in this?$lpd0(this,"cutLastFrame",$lptb):this.cutLastFrame=$lptb,$lptb=0,"readyLanes"in this?$lpd0(this,"readyLanes",$lptb):this.readyLanes=$lptb,$lptb=0,"cutLanes"in this?$lpd0(this,"cutLanes",$lptb):this.cutLanes=$lptb,$lptb=0,"litAfters"in this?$lpd0(this,"litAfters",$lptb):this.litAfters=$lptb}see(e){if(!super.see(e))return!1;return Ac.call(this);}beginCollect(){this.readyLanes=this.cutLanes=this.litAfters=0}holdKept(){if(this.kept!==null&&this.posture==="unmeasured")this.settle(MtU(XD0))}cutDrawn(){return this.pinned?this.pinned==="on":this.posture==="trial"||!this.sides.withheld}sidesRule(){if(this.pinned||this.posture==="trial")return null;return this.posture==="on"?"lit":"cut"}readyAtLastCollect(){return this.readyLanes>0}openFrame(e,t){let r=super.openFrame(e,t),i=this.cutDrawn(),n=i!==this.cutLastFrame;return this.cutLastFrame=i,r||n}}var W9l=new bq5;function jnv(e){W9l.kept=e,W9l.holdKept()}function s4X(e){return W9l.held(e)||W9l.wanted&&W9l.posture!=="off"}function bov(e){if(W9l.see(e),W9l.wanted)return!1;return W9l.wanted=!0}function dG8(e){return W9l.see(e),W9l.pinned!=="off"}function iLz(){W9l.readyLanes+=1}function F6b(e,t){let r=siA(t.cpuMs),i=siA(t.gpuMs),n=r>i,l=!!(e.termMs?.every(Number.isFinite)&&t.termMs?.every(Number.isFinite)&&e.ownMs?.some((e)=>e>0)),s=HG(e,n,l),o=HG(t,n,l),[a,u,d]=sJ$(t,o,e,s),f=d.length,c=Math.max(0,Math.floor(Math.log2(f/FVg))),h=l?Math.sqrt(4+2*Math.LN2*(c+1)):2,p=!l||d[(FVg<<c)-1]>=e.attempts?h*u:1/0,m=Math.sqrt((4+2*Math.LN2)*f/FVg)*u;return{drawn:a>p,costs:-a>p,onMs:siA(s),offMs:siA(o),onCpuMs:siA(e.cpuMs),onGpuMs:siA(e.gpuMs),offCpuMs:r,offGpuMs:i,gapMs:a,lineMs:p,firstLineMs:m,waitedOnCpu:n,termed:l}}function HG(e,t,r){if(r)return e.termMs??e.gpuMs;return t?e.gpuMs:e.gpuMs.map((t,r)=>Math.max(t,e.cpuMs[r]))}var Art=`@fragment fn fsDepth() {}
`;function Fq5(a,b,c,d){return (Fq5=$c0C(182)).call(this,a,b,c,d)}var dnK=(e)=>({...e,depthBias:(e.depthBias??0)-4,depthBiasSlopeScale:(e.depthBiasSlopeScale??0)-1}),wG=new WeakMap;function qGC(e,t){wG.set(e,t)}function FG(e){return wG.get(e)??null}var $G=new WeakMap;function mFK(e,t,r){W9l.cutLanes+=1;let i=$G.get(e);if(i?.arm!==t||i.after!==r)$G.set(e,{arm:t,after:r})}var eG=new WeakMap;function ExY(e,t,r){W9l.litAfters+=1,wG.set(e,t),eG.set(e,r)}function bbs(e,t){W9l.cutLanes+=e,W9l.litAfters+=t}var ZG={cut:(e)=>$G.get(e)?.arm??null,both:(e)=>wG.get(e)??$G.get(e)?.arm??null,afterCut:(e)=>$G.get(e)?.after??e,afterLit:(e)=>eG.get(e)??e,afterBoth:(e)=>$G.get(e)?.after??eG.get(e)??e};function oqg(e,t,r){if((t===void 0||t.length===0)&&(r===void 0||r.length===0))return;let i=e===1&&W9l.drawn();if(W9l.cutLanes===0)return i?FG:void 0;return i?ZG.both:ZG.cut}function g1o(e){if(e===ZG.cut)return ZG.afterCut;if(e===ZG.both){return (W9l.litAfters>0?ZG.afterBoth:ZG.afterCut);}return e===FG&&W9l.litAfters>0?ZG.afterLit:void 0}var zM4="cull/select/v4",dpH="ordered-survivors/write/v1",JNj="cull/keep-all/v1";function bAS(e){if(!/Chrome\//.test(e))return null;if(/Windows/.test(e))return 30000;if(/Macintosh|Mac OS X/.test(e))return 25000;return 15000}function M9G(e){return/Chrome\//.test(e)&&/Windows/.test(e)?2000:null}var Kd=1000,Kti=2,jd=2;class NRR{constructor(){this.roomMs=null;this.msSum=0;this.charsSum=0;this.builds=0;this.floors=[];this.widest=0;this.offered=[];this.slow=[];this.texts=new Map;this.diedUnder=new Set;this.lastLong=null;this.computeKeys=new Set;this.computeFloor=0;this.computeCharsSum=0;this.computeBuilds=0;this.computeHeld=0;this.onHoldPastRoom=null;this.onFloorRetired=null;}seat(e){this.roomMs=e!==null&&e>0?e:null}get room(){return this.roomMs}noteBuilt(e,t,r="render"){if(!(e>0)||!(t>=0))return;if(r==="compute"){if(this.computeCharsSum+=e,e*++this.computeBuilds>=this.computeCharsSum&&t>=Kd)this.computeHeld=Math.max(this.computeHeld,t/e);return}if(this.msSum+=t,this.charsSum+=e,this.builds+=1,t>=Kd)this.slow.push({chars:e,ms:t});if(e>this.widest)this.widenTo(e);this.settleOffered()}settleOffered(){return $c0P($c0C(183),NRR.prototype,"settleOffered").call(this)}textSpeaks(e){return this.builds===0||e*this.builds>=this.charsSum}contradicted(e){return this.roomMs!==null&&e*this.widest>=jd*this.roomMs}widenTo(e){this.widest=e,this.floors=this.floors.filter((e)=>!this.contradicted(e))}outbuilt(e){let t=e.ms/e.chars;return this.slow.some((r)=>r.chars>e.chars&&t*r.chars>=Kti*r.ms)}slowest(){let e=0;for(let t of this.slow){let r=t.ms/t.chars;if(this.textSpeaks(t.chars)&&!this.contradicted(r)&&!this.outbuilt(t))e=Math.max(e,r)}return e}noteChars(e,t,r){if(t>0)this.texts.set(e,t);if(r==="compute")this.computeKeys.add(e)}charsOf(e){return this.texts.get(e)}noteHold(e,t,r){if(this.roomMs===null||!(t>=this.roomMs))return;if(this.computeKeys.has(e)&&t<jd*this.roomMs)this.noteLost(e,t);let i={key:e,ms:t,endedAtMs:r};this.lastLong=i,this.onHoldPastRoom?.(i)}longHoldEndedSince(e){return this.lastLong!==null&&this.lastLong.endedAtMs>=e?this.lastLong:null}noteDied(e,t){if(this.roomMs!==null&&t>=this.roomMs)return this.noteLost(e,t),"watchdog";if(this.diedUnder.has(e))return"again";return this.diedUnder.add(e),"once"}noteLost(e,t){let r=this.texts.get(e);if(r===void 0||!(t>0)||this.roomMs===null)return;let i=Math.min(t,this.roomMs)/r;if(this.computeKeys.has(e))return this.noteFloor(i,"compute");if(this.textSpeaks(r)&&!this.contradicted(i))this.floors.push(i);this.settleOffered()}noteFloor(e,t="render"){if(e===null||!Number.isFinite(e)||!(e>0))return;if(t==="compute"){this.computeFloor=Math.max(this.computeFloor,e);return}if(!this.contradicted(e))this.floors.push(e);else if(this.roomMs!==null)this.onFloorRetired?.(jd*this.roomMs/this.widest,"contradicted");this.settleOffered()}get floorMsPerChar(){return Math.max(this.slowest(),...this.floors)||null}get computeFloorMsPerChar(){return this.computeFloor||null}msPerChar(e){return Math.max(this.msSum/this.charsSum||0,this.slowest(),...this.floors,e==="compute"?Math.max(this.computeFloor,this.computeHeld):0)}pastRoom(e,t=!0,r){if(this.roomMs===null||e===void 0||!(e>0))return null;let i=e*this.msPerChar(r);return i*(t?Kti:1)>=this.roomMs?i:null}}var BRY=new NRR,YE="spawn-gpu-pool-slot-";var Lro=(function(){let e=!1,t=new Set;return{hidden:(()=>e),onEdge(e){return OgH(t,e)},say(r){if(r===e)return;e=r;for(let e of[...t])e()}}});var LE=null;function Ieh(){LE??=Lro();return LE}function a4j(e){Ieh().say(e)}var vE="spawn-gpu-pool-wait",CE=null;function $ro(){if(CE!==null)return CE;let e=new Set,t=null,r=function(){for(let t of[...e])t()},i=(function(){if(t!==null)return;let e=Crv();if(e===void 0)return;try{t=new e(vE);let i=Reflect.get(t,"unref");if(typeof i==="function")i.call(t);t.onmessage=r}catch{t=null}});CE={ring(){t?.postMessage(0),r()},onRing(r){e.add(r);i();return function(){if(e.delete(r),e.size>0||t===null)return;t.close(),t=null}}};return CE}function vro(e){if(!e3w(e)||e<1)return null;return{locks:lK,slots:Math.floor(e),sight:Ieh(),bell:$ro()}}function Ero(e,t,r,i,n){let l=Array.from({length:Math.max(1,Math.floor(e.slots))},(e,t)=>`${YE}${t}`);let s=new Map;let o=null;let a=new Set;let u=!1;let d=!1;let f=!1;let c=!1;let h=!1;let p=!1;let m=null;let g=e.sight;let v="no build of this page waits for a slot of the browser's GPU pool now, so its waits on the other slots are let go";let b=function(){let e=r();if(!f)e=n()?l.length:e+i();for(let[t,r]of s){if(s.size<=e)break;s.delete(t),r()}};let k=function(){m=null,b()};let x=function(e){if(m!==null)clearTimeout(m);m=null;{let t=o;o=null,a.clear(),t?.abort(V7k(e))}for(let e of s.values())e();s.clear()};let M=g?.onEdge(function(){if(d)return;if((g?.hidden()===!0)){x("the page is hidden, and a browser can freeze a hidden page with no word, so its ask for a slot of the browser's GPU pool is withdrawn");}t()})??null;let S=lsL(function(){if(u&&!d&&o===null)t()});let I=function(t,r=!1){if(d||t.query===void 0)return;if(c){h||=r;return}c=!0;let i=function(){if(c=!1,h){h=!1,I(t,!0);return}if(!p)return;p=!1;if(o===null||a.size===0||(g?.hidden()===!0))return;if(u)e.bell?.ring();else {{let e=v;let t=o;o=null,a.clear(),t?.abort(V7k(e))}}};t.query().then(function(e){if(f=e.pending?.some((e)=>e.name!==void 0&&s.has(e.name))===!0,f)b();i()},i)};let R=e.bell?.onRing(function(){if(d||(g?.hidden()===!0)||s.size===0)return;let t=e.locks();if(t!==void 0)I(t,!0)})??null;return{get held(){return s.size},ask(){if(d||(g?.hidden()===!0))return!1;u=!0;let r=e.locks();if(r===void 0)return o!==null;let i=o??new AbortController,f=o===null;o=i;for(let e of l){if(s.has(e)||a.has(e))continue;a.add(e);r.request(e,{signal:i.signal},function(){if(o!==i||d||(g?.hidden()===!0))return;a.delete(e);return new Promise(function(r){s.set(e,r);u=!1;t();if(o===i&&(s.size>=l.length||!u&&!(p&&n()))){{let e=v;let t=o;o=null,a.clear(),t?.abort(V7k(e))}}})}).catch(function(){return})}if(f)p=!0,I(r,!0);return!0},settle(){if((g?.hidden()===!0))return;let t=e.locks();if(t!==void 0)I(t);if(f){b();return}if(m!==null||n()||s.size<=r()+i())return;m=setTimeout(k,0)},fit:b,end(){d=!0;M?.();R?.();S();x("the device is gone, so its ask for a slot of the browser's GPU pool is withdrawn")}}}var I5d="pose",Cfi={word:0,serial:0};var $nu=(function(e){Cfi.word=e,Cfi.serial+=1});var vS=!1,WS=!1,xS=null,FS={off:!1,idle:0};function EFb(){return vS}function bCI(){vS=!0}function SQp(){if(vS)return;vS=!0,xS?.("missed")}function HbO(){if(FS.off)return;FS.off=!0,xS?.("seen")}function xPf(){return FS.off}function BUj(e=!1){if(vS=WS=!0,e)xS?.("hung")}function CHq(){vS=WS=!0,FS.idle=2}function kYW(){FS.idle=1}function dHc(e=!1){return FS.idle>(e?0:1)}var bfK=(function(){return WS});function DS(e){xS?.(e?"stands":"answered")}function feo(e){return e.some((e)=>e===I5d||e.startsWith(`${I5d}/`))}var _w5=(function(e){xS=e});var kHk=1,ho=16,$o=Math.PI/16;function Mo(e,t){return Math.max(0,Math.min(1,e+t)-Math.max(-1,e-t))}class Kep{constructor(){this.eye=null;this.stamp=0;this.grounds=new Map;}note(e){this.eye=e,this.stamp++,this.grounds=mnS(this.grounds)}sphere(e,t,r,i){let n=this.eye;if(n===null)return 0;let{view:l,projection:s}=n;if(!Number.isFinite(e+t+r+i))return 1;let o=l[0]*e+l[4]*t+l[8]*r+l[12],a=l[1]*e+l[5]*t+l[9]*r+l[13],u=l[2]*e+l[6]*t+l[10]*r+l[14];if(Mxu(o,a,u)<=i)return 1;let d=s[11]!==0;if(d&&u>=i)return 0;let f=d?Math.max(-u,i):1;return $o*Mo(s[0]*o/f+s[12],s[0]*i/f)*Mo(s[5]*a/f+s[13],s[5]*i/f)}ground(e=1/0){let t=this.eye;if(t===null)return 0;let r=this.grounds.get(e);if(r===void 0){let{view:i,projection:n}=t,l=t.eyeRise??0;r=0;for(let t=1/ho-1;t<1;t+=2/ho){let s=-n[11]*t/n[5];for(let t=1/ho-1;t<1;t+=2/ho){let o=-n[11]*t/n[0],a=i[4]*o+i[5]*s-i[6];if(a<0&&l*ihl(i[0]*o+i[1]*s-i[2],i[8]*o+i[9]*s-i[10])<=-e*a)r++}}this.grounds.set(e,r)}return r/(ho*ho)}}var o5p="terrain/surface",paq="This pipeline draws the ground, every terrain tile, so this player stands on an invisible floor while the sky and every object still render",Hh="This kernel produces the culling survivor lists every batched draw depends on, so the whole 3D scene stops rendering for this player (black canvas)",Ch=[{prefix:zM4,loses:Hh,smallerForm:JNj},{prefix:"cull/",loses:Hh,fragmentForm:!0},{prefix:HD+"cull/",loses:Hh},{prefix:"post/composite/0-/",loses:"This pipeline presents the scene color, so the picture cannot reach this player\u2019s canvas"},{prefix:o5p,loses:paq,drawJudges:!0}],Eh=(e)=>Ch.find((t)=>e.startsWith(t.prefix));function ree(e){return Eh(e)?.loses??null}function Yz1(e){return Eh(e)?.drawJudges===!0}function vkh(e){let t=Eh(e);if(t?.fragmentForm===!0&&U9$())return HD+e;return t?.smallerForm??null}function zvM(e){return ree(e)===null||Yz1(e)||vkh(e)!==null}var jh=null;var Rsh=(function(e){jh=e});function kAD(e,t){jh?.stands(e,t)}function lCp(e,t){jh?.none(e,t)}var vh={buffer:"the surface buffer arm draws the ground, lit in the light pass",lit:"the lit arm draws the ground: the ground is lit in the main pass rather than in the light pass",plain:"the plain ground draws: the ground is the material's base colour under the sun's light"};function qxL(e){return vh[e]}var HJ=new WeakSet;function _ps(e){HJ.add(e)}function y9V(e){return HJ.has(e)}var yLr=(function(e){return ayA(e).geometryMoves});var KFG=(function(e){return e===void 0?0:ayA(e).geometryMoves.count});function b8C(e,t){yLr(e).retired.push(t)}function Xgx(e,t){let r=yLr(e);r.frames+=1,r.boundary?.(t);let i=r.retiring;for(let e of i)e.destroy();i.length=0,r.retiring=r.retired,r.retired=i}var SH=v0g(!1,1).map((e,t)=>t===1||t===2?e:{...e,writeMask:0});var zAU="rgba16float",gY1=jEz,uY={depthBias:1,depthBiasSlopeScale:1,depthBiasClamp:0},z0c="fs_liquid",l6z={liquid:!0},LY=`${dQJ}
@fragment
fn ${z0c}(@builtin(position) pixel: vec4<f32>) -> @location(0) vec4<f32> {
  let uv = pixel.xy / frame.viewportSize;
  let clip = frame.inverseViewProj * vec4<f32>(uv.x * 2.0 - 1.0, 1.0 - uv.y * 2.0, pixel.z, 1.0);
  let at = clip.xyz / clip.w;
  let across = cross(dpdx(at), dpdy(at));
  let size = length(across);
  if (!(size > 0.0)) {
    return vec4<f32>(0.0, 1.0, 0.0, 1.0);
  }
  let n = across / size;
  return vec4<f32>(select(-n, n, dot(n, ${D0z("frame.cameraPosition - at")}) >= 0.0), 1.0);
}
`;function MLp(e,t){return e.layout!=="auto"&&(typeof t!=="string"||e.fragment!==void 0)}function OLp(e,t,r,i){let n=[{format:zAU}],l=e.vertex,s;if(t===!0)s={module:r(),entryPoint:z0c,targets:n};else if(typeof t==="string"){let r=e.fragment;if(r===void 0)throw Error(`[lume] the liquid twin ${i} names a fragment entry beside no fragment`);s={module:r.module,entryPoint:t,constants:r.constants,targets:n}}else{let r=t();l={...e.vertex,module:r},s={module:r,entryPoint:z0c,targets:n}}return{label:i,layout:e.layout,vertex:l,primitive:e.primitive,fragment:s,depthStencil:{format:gY1,depthWriteEnabled:!0,depthCompare:dlr,...uY},multisample:{count:1}}}function U2_(e,t,r){let i=e?.get(t);if(i){for(let e of i.taints)zRC(e);return i}let{value:n,taints:l}=zSP(r),s={wgsl:n,taints:l};return e?.set(t,s),s}var Ck=new WeakMap,rk=()=>({named:new Map,askers:new Map,byModule:new WeakMap,seen:0}),Wk={};function oOy(e,t=Wk){let r=oFG(Ck,null,e,rk,e.chainGeneration);if(!("taints"in t))return Zpc(r.byModule,t);let i=jCw(r.askers,t.key);for(let e of t.taints)i.add(e);return Zpc(r.named,t.key)}var cT=(function(e){if(e===null||e===void 0)return[];return Array.isArray(e)?e:null});var UT=(function(e){if(e===void 0)return"";return Object.keys(e).sort((e,t)=>e.localeCompare(t,"en")).map(((t)=>`${t}=${e[t]}`)).join(",")});function Cy6(e,t){let r=e.vertex;if(r===void 0||typeof r.module!=="object"||r.module===null)return null;let i=e.layout;let n=e.fragment??null;let l=e.primitive;let s=e.multisample;let o;ky6:{let e$42=r.buffers;{let e=e$42;let t=cT(e);if(t===null){o=null;break ky6;}let r=[];for(let e of t){if(e===null||e===void 0){r.push("-");continue}let t=cT(e.attributes);if(t===null){o=null;break ky6;}r.push(`${e.arrayStride}/${e.stepMode??"vertex"}/${t.map((e)=>`${e.shaderLocation}:${e.format}@${e.offset}`).join(",")}`)}o=r.join(";");}}if(o===null)return null;let a=[uLW(i)?t(i):String(i),t(r.module),r.entryPoint??"",UT(r.constants),o];if(n===null)a.push("no-fragment");else{let e=cT(n.targets);if(typeof n.module!=="object"||n.module===null||e===null)return null;a.push(t(n.module),n.entryPoint??"",UT(n.constants),e.map(((e)=>e===null||e===void 0?"-":e.format)).join(","))}return a.push(l?.topology??"triangle-list",l?.stripIndexFormat??"",l?.unclippedDepth===!0,e.depthStencil?.format??"no-depth",s?.count??1,s?.mask??4294967295,s?.alphaToCoverageEnabled===!0),a.join("|")}var clR=(function(e){if(e===void 0)return 24;return e>4?96:0});var ys=function(){return},JO=function(){return},ks=function(){return},Us=((e)=>e===void 0?[]:[e]),sQ=(e,t)=>e.length===0||t.length===0?[]:[...e,...t],QQ={contributors:new Set,keys:[]},dXG={pipeline:null,ready:new Promise(function(){return}),failed:!1};function $vu(e){return e.failed&&!e.withdrawn}function pif(e){return e instanceof vQ&&e.queued!==null&&e.reads.roomHolds(e)}class _qb{constructor(){this.cache=null;this.outside=void 0;this.into=void 0;this.fades=void 0;this.count=0;}open(e,t,r,i){return this.cache=e,this.outside=t,this.into=r,this.fades=i,this.count=0,this}take(){return this.cache=null,this.outside=void 0,this.into=void 0,this.fades=void 0,this.count}}function $Q(e){let t=Promise.reject(e);return t.catch(function(){return}),t}function xqb(e,t,r){if(!hO(e))r.delete(e)}function iqb(e){if(hO(e))this.add(e)}function Eqb(e){if(hO(e))this.count+=1}var Bs=3,qs=2,ds=500,TQ=/Program (link|compilation) failed|GPUCompuePipeline could not compile/,YQ=(e)=>TQ.test(e)||jsL(e),MHF="lume: this device does not build this pipeline: a build of it ended the browser's GPU process",Cs=new Set,fs="material/",rs=/^material\/\d+\/(?:.*\/)?(?:shadow\/|narrowed\d)/;function RaL(e){return/^material\/\d+(?:\/|$)/.test(e)}function kM5(e){Cs=new Set(e.filter(zvM))}var Bg7="lume: this device does not run this pipeline: the GPU stopped inside a packet that ran it alone",BQ=new Map,Es=[];function Iev(e){let t=new Map,r=[];for(let i of e){let e=zH_(i),n=e===null?v2h(i):icW(v2h(i));if(!zvM(n)||r.includes(i))continue;r.push(i);let l=t.get(n);if(e===null||l===null)t.set(n,null);else t.set(n,[...l??[],e])}BQ=t,Es=r}function HwX(){return Es}function d9Q(e){return Array.isArray(e)?e.filter((e)=>typeof e==="string"&&e.length>0&&!(zH_(e)===null&&RaL(e))):[]}function tn5(e){return Cs.has(e)||BQ.get(e)===null}function os(e,t){if(BQ.get(e)===null)return!0;return t!==void 0&&!!BQ.get(icW(e))?.includes(t)}var ns="lume: a resting queue does not build an idle program its stand marked",mO={keys:()=>[]};function gP6(e){mO.keys=e}var NO={move:function(e,t){return}};function VB6(e){NO.move=e}var Ks=!1;function EyP(e){Ks=e}function zQ(e){if(Cs.has(e))return MHF;return BQ.get(e)===null?Bg7:null}function aqb(e){let t=W8y(e)?bAS(globalThis.navigator?.userAgent??""):null;if(t!==null&&BRY.room!==t)Tp.info(`[lume] this device compiles each pipeline on the browser's GPU process main thread, ${t/1000} s a build: a build whose text this device's measured compile speed reads past it is not asked: its family's smaller form draws, and a family's smallest form's draws skip`);return BRY.seat(t),BRY}var XcY="lume: this device's compile speed keeps this build from the device: its text would stand there past the browser's GPU watchdog",is=2,ls=4,tQ=32768;function Mqb(e){if(!e3w(e)||e<=0)return is;return Math.max(1,Math.min(ls,Math.floor(e/4)))}var Y7P=(function(){return typeof navigator<"u"&&typeof navigator.hardwareConcurrency==="number"?navigator.hardwareConcurrency:void 0});function Ek_(){let e=typeof navigator<"u"?navigator.deviceMemory:void 0;return e3w(e)&&e>0?e:void 0}var ms=4;function gqb(e,t,r=!1,i=!1){if(i)return 1;if(r&&e3w(t)&&t>0&&t<=ms)return 1;if(!e3w(e)||e<=0)return 1/0;if(Math.floor(e)<ksL)return 1;return Math.floor(e)-2}function ACg(e){return gqb(Y7P(),Ek_(),gaM(e),zma())}function S$C(e,t){return{buildsBlockSubmits:e.buildsBlockSubmits,buildsBlockSubmitsPinned:e.buildsBlockSubmitsPinned,cpuBuildsBesideSubmits:e.cpuBuildsBesideSubmits,buildsOnPresentThread:e.buildsOnPresentThread,arrivingInflightMax:Mqb(Y7P()),poolInflightMax:t,browserPool:vro(t)??void 0}}var KQ=1,fsR=["picture","arriving","late"],Xs=fsR.indexOf("picture"),Zs=fsR.indexOf("arriving"),js=fsR.indexOf("late"),LMv=0,IQk=1,gQ=-1,Ts=-1/0,Rs=(e)=>e,hs=(e)=>e.entry;function kQ(e,t,r,i,n,l,s,o){if(e!==n)return e>n;if(t!==l)return t<l;if(r!==s)return r>s;return i>=o}var hkp=2,Txe=hkp+Zs,pgS=hkp+js,OCD=-1,RqO=0.4,Ns=-1,_s=-2,us="a new shader text was parsed on the GPU process's main thread this frame, so this draw's build issues first at the next completed playable frame",Ys="the GPU process's pool keeps a thread for the browser, so this draw's build issues first at the next settle",MQ="lume: the draw moved to another pipeline before this build issued",cQ="lume: the session that asked for this build closed before it issued",Hs="lume: no draw on this class asks this build, so its warm builds nothing";class oQ extends Error{}class RLQ extends Error{}var FOn=new Set(["effects","particles"]);function E_y(e){return e instanceof oQ}function xs(e){return e.built===null&&e.lastError!==void 0}class bQ{constructor(e,t){this.compute=void 0;this.form=void 0;this.twin=null;this.text=null;this.formless=!1;this.twinDescriptor=null;this.twinReady=null;this.compute=e,this.form=t}get pipeline(){let e=this.compute.pipeline;if(e!==null)return e;return this.formOf(this.twin===null?null:this.twin.pipeline)}get built(){let e=this.compute.built;if(e!==null)return e;return this.formOf(this.twin===null?null:HGz(this.twin))}formOf(e){return e===null||this.text===null?null:ZD(e,this.text)}get failed(){if(!this.compute.failed)return!1;return Cc.call(this);}get withdrawn(){return this.twin!==null?this.twin.withdrawn:this.compute.withdrawn}get ready(){let e=this.twin,t=this.text;if(e===null||t===null)return this.compute.ready;return this.twinReady??=e.ready.then((e)=>ZD(e,t)),this.twinReady}}var Ss=[];function p8O(e){if(e===void 0)return Ss;return typeof e==="string"?[e]:e}function Fqb(e,t){if(e===void 0||e===t)return t;if(h4Z(t,e))return t;if(h4Z(e,t))return e;let r=t.slice();for(let i=0;i<e.length;i+=1)if(!t.includes(e[i]))r.push(e[i]);return r}var nfJ={peelCull:!0},jqA={frontFaces:!0};function oaQ(e){return`${e}|front-faces`}var XQ=Object.freeze({topology:"triangle-list",cullMode:"back"});function YO(){let e=function(){return};let t={built:new Promise(function(t){e=t}),settle:function(r){if(t.settled)return;t.settled=!0;t.stood=r;e(r)},settled:!1,issued:!1,stood:!1};return t}var DQ=(e,t)=>(e+t)*(e+t+1)/2+t,uO=null;function Os(e,t){e.failed=!0,e.attempts=Bs,e.retryAtMs=1/0,e.budgetsExhausted=qs,e.lastError=t.message,e.refused=!0}function Yke(e,t){if(t===void 0||t.length===0)return e?nfJ:void 0;return e?{peelCull:!0,standIn:t}:{standIn:t}}function nO(e){if(e.frontFaces){return Dc(e);}let t;if(e.peelCull)t=nfJ;else if(e.through!==void 0)t=e.throughCover===void 0?{through:e.through}:{through:e.through,throughCover:e.throughCover};if(e.liquid!==void 0)t={...t,liquid:e.liquid};if(e.materialData!==void 0)t={...t,materialData:e.materialData};if(e.lookPlane!==void 0)t={...t,lookPlane:e.lookPlane};if(e.depthArm)t={...t,depthArm:!0};if(e.bodyProgram)t={...t,bodyProgram:!0};return e.sampleFeedback===void 0?t:{...t,sampleFeedback:e.sampleFeedback}}function Vqb(e){return/^[a-z][a-z0-9-]{0,23}(?:[/|:][a-z][a-z0-9-]{0,23})?(?=[/|:]|$)/.exec(e)?.[0].replace(/[|:]/,"/")??"other"}function vuZ(e){if(e.length===0)return;let t={};for(let r of e){let e=`${r.state==="parked"&&tn5(r.key)?"convicted":r.state} ${Vqb(r.key)}`;t[e]=(t[e]??0)+1}return t}var mQ=300;function t0U(e){let t=k$w(e).replace(/\s+/g," ").trim(),r=t.length>0?t:"unknown pipeline build failure";return r.length>mQ?`${r.slice(0,mQ)}\u2026`:r}function Tqb(a){return (Tqb=$c0C(184)).call(this,a)}var As=30000,zs="outside:",TEE=250;var qGP=(function(e){if(!Array.isArray(e))return null;let t=new Set;for(let r of e)if(typeof r==="string"&&/^[0-9a-z]{1,7}$/.test(r))t.add(r);return t});var Ps=8,qQ=0.047058823529411764,Ls=50;function Ds(e){if(e===void 0)return null;return e.settledAtMs===null?null:e.settledAtMs-e.startedAtMs}function G27(e,t=!1){let r=(e)=>`${Math.max(1,Math.round(e/1000))}s`,i=(e)=>`${e} time${e===1?"":"s"}`;switch(e.state){case"built":return"is built";case"unknown":return Ec();case"queued":{let i=`has waited ${r(e.sinceMs)} in the compiler's ${e.lane} line, ${e.ahead} build${e.ahead===1?"":"s"} ahead of it`;if(e.hold===null||!t)return i;return Fc(e,i,r);}case"at-device":return`has been preparing for ${r(e.sinceMs)}${e.oneThread?" (this device prepares one program at a time)":""}`;case"retrying":return Gc(i,e,r);case"parked":return Hc(i,e);}}function Kqb(e){switch(e.state){case"built":return"nothing holds it";case"unknown":return"no event this renderer can name";case"queued":return`until the ${e.lane} line issues it`;case"at-device":return"until the GPU compiler answers";case"retrying":return"until its retry lands";case"parked":return e.deterministic?"no event ends it this session; its draws stay skipped":"its draws stay skipped until then"}}var ZQ={parked:"refused",built:"built"};function Xib(e){return`${ZQ[e.state]??"held"}: its GPU pipeline ${G27(e,!0)} \u2014 ${Kqb(e)}`}var SQ=(e)=>e.queued!==null&&e.queuedLane===Ns;class vQ{constructor(e,t,r,i=null,n=0){this.reads=void 0;this.readyPromise=void 0;this.firstRequestedAtMs=void 0;this.queued=void 0;this.queuedLane=void 0;this.built=null;this.failed=!1;this.withdrawn=void 0;this.attempts=0;this.retryAtMs=0;this.budgetsExhausted=0;this.lastError=void 0;this.refused=void 0;this.watchesUse=!1;this.firstStoodInAtMs=-1;this.reads=e,this.readyPromise=t,this.firstRequestedAtMs=r,this.queued=i,this.queuedLane=n}get pipeline(){if(this.queued!==null)this.reads.noteFrameRead(this,!0);else if(this.watchesUse)this.reads.noteFrameUse(this);if(this.built===null&&RQ===0)as.add(this);return this.built}get ready(){if(this.queued!==null)this.reads.noteFrameRead(this,!1);return this.readyPromise}}var as=new WeakSet,bs=new WeakSet,RQ=0;var HGz=(function(e){return (e instanceof vQ||e instanceof bQ)?e.built:e.pipeline});function hO(e){return e!==void 0&&HGz(e)===null&&!e.failed}function GQ(e,t){let r=e.findIndex(t);return r<0?e.length:r}function SO(e,t){if(t>0)e.unshift(...e.splice(t,1));return t>=0}var vs=1,$s=2,jQ=4,ps=8,IQ=16;function Zqb(e){e.drop(Error(`lume: the device was cleared before the build '${e.key}' reached it`))}var Gs=(function(e,t){return{children:null,value:null,parent:e,step:t}});var ss=((e,t)=>e===t||typeof e==="number"&&typeof t==="number"&&Number.isNaN(e)&&Number.isNaN(t));var wQ=(function(e,t){let r=e.children;if(r===null){let r=Gs(e,t);return e.children=r,r}if(!(r instanceof Map)){if(ss(r.step,t))return r;let i=new Map;i.set(r.step,r);let n=Gs(e,t);return i.set(t,n),e.children=i,n}let i=r.get(t);if(i===void 0)i=Gs(e,t),r.set(t,i);return i});var Is=[];function yqb(e){let t=Is;while(t.length>e.length)t.pop();for(let r=0;r<e.length;r+=1){let i=e[r],n=r-1;while(n>=0&&t[n].binding>i.binding)t[n+1]=t[n],n-=1;t[n+1]=i}return t}var Lqb=(function(e){return Array.isArray(e)?e:Array.from(e)});var pQ=1,gs=2,cs=3,hQ=4,xQ=5;function yQ(e,t){let r=typeof e==="function"?e():e;return r.label!==void 0&&r.label.length>0?r:{...r,label:t}}var Ws=!1,Qs=[];function t5P(e){Ws=e;es+=1;if(!e){{for(let e of Qs.splice(0))e();
}}if(Js.length===0)return;{for(let e of Js.splice(0))if(e.after>=es||!w_f(e.mark??=ws))Js.push(e);else e.run()
}}var es=0,Js=[];function PJM(e){Js.push({after:es+1,run:e})}function PW_(e){if(!e)return;ws+=1,Y2H()}var HO=[];function Y2H(){if(HO.length===0)return;for(let e of HO.splice(0))e()}var ws=0;function eTU(){return!Ws}var NQ=new WeakMap,Vs=new WeakMap;function Ms(e,t){let r=e.get(t);if(r===void 0)r={inFlight:0,answeredAtMs:-1/0},e.set(t,r);return r}function WQ(e,t){e.inFlight=Math.max(0,e.inFlight-1),e.answeredAtMs=t}function NCS(e,t){{let e$46=NQ,t$33=e,r$17=t;{let e=e$46,t=t$33,r=r$17;let i=t===void 0?void 0:e.get(t);return i!==void 0&&(i.inFlight>0||i.answeredAtMs>=r)}}}function gD1(e,t){{let e$47=Vs,t$34=e,r$18=t;{let e=e$47,t=t$34,r=r$18;let i=t===void 0?void 0:e.get(t);return i!==void 0&&(i.inFlight>0||i.answeredAtMs>=r)}}}function yU6(e,t,r){if(e===void 0)return!1;let i=(ayA(e).keyBuilds);for(let[e,n]of i)if((n.inFlight>0||n.answeredAtMs>=t)&&r(e))return!0;return!1}var Fs=null,rQ=-1;function vNi(){return rQ}var MYk=(function(e,t){Fs={test:e,onChange:t,standing:0}});function cqb(e){let t=Fs;if(!t?.test(e))return null;Nc(t);return t}function HQ(e){if(e.standing<=0)return;if(e.standing-=1,e.standing===0&&e===Fs)e.onChange(!1)}function rmz(){return ws}function w_f(e){return!Ws||ws>e}function iQ(e){return()=>e}class o58{shaderModule(e,t,r=Vhz(e)){let i=this.heldModule(r);if(i===void 0){let n=(i3.has((this.device)));if(this.refusingFreshText&&!n)throw new Tb(()=>this.holdsShaderModule(e,r));let l=wGv(this.device);i=this.device.createShaderModule({code:e,label:t}),this.shaderModules.set(r,new WeakRef(i)),this.moduleTexts.set(i,{text:e,key:r}),this.moduleGone.register(i,r);let s=this.moduleWatchers.get(r);if(s!==void 0){this.moduleWatchers.delete(r);for(let e of s)e.deref()?.spend()}if(!n||wGv(this.device)>l)this.noteParse(e)}return this.holdRecent(r,i),i}holdRecent(e,t){let r=this.recentModules;if(this.moduleHeldMax===0||this.moduleHoldFolded?.()){if(r.size>0)this.letGoModulesHeldByRecentUse();return}let i;{i=Oc.call(this,r,e,t)}this.letGoModulesPastTheGrace(i)}letGoModulesPastTheGrace(e){if(e<=this.firstGraceEndsAtMs||e-this.recentSweptAtMs<1000)return;Pc.call(this,e);}setModuleHold(e,t){this.moduleHeldMax=e,this.moduleHoldFolded=t;while(this.recentModules.size>e)if(wEE(this.recentModules)===void 0)break}letGoModulesHeldByRecentUse(){PDM(this.recentModules),this.firstGraceEndsAtMs=1/0}holdsShaderModule(e,t=Vhz(e)){return this.heldModule(t)!==void 0}heldModule(e){return this.shaderModules.get(e)?.deref()}whenModuleStands(e,t){if(this.heldModule(e)!==void 0){t.spend();return}let r=this.moduleWatchers.get(e);if(r===void 0){this.moduleWatchers.set(e,[new WeakRef(t)]);return}if(r.length>=8){let e=r.filter((e)=>e.deref()!==void 0);r.length=0,r.push(...e)}r.push(new WeakRef(t))}shaderTextOf(e){return this.moduleTexts.get(e)?.text??null}keptDescriptor(e){if(e.vertex===void 0)return iQ(e);let{vertex:t,fragment:r,...i}=e,n=this.keptStage(t),l=r===void 0?void 0:this.keptStage(r);return()=>({...i,vertex:n(),...l===void 0?{}:{fragment:l()}})}keptStage(e){let{module:t,...r}=e,i=this.moduleTexts.get(t),n=i===void 0?iQ(t):this.moduleOfText(i.text,i.key,t.label);return()=>({...r,module:n()})}moduleOfText(e,t,r){return()=>this.shaderModule(e,r,t)}noteParse(e){let t=typeof e==="number"?e:e.length;if(this.frameBuildText+=t,this.textsParsed+=1,this.framesUnwatched)return;if(this.parseMsPerUnit===null)this.parseRoomTaken=!0;else this.parseRoomSpentMs-=t*this.parseMsPerUnit;if(this.parseBurstAtMs??=this.wallNowMs(),this.parseBurstUnits+=t,this.parsePaced){if(this.pageHidden)return;if(this.parseNeedsFrame=!0,this.textHeldOrder=1/0,this.parseFenceFloor=this.fencesArmed,this.parseAnsweredThrough=null,!this.pacesForFrames)this.askTextParsed();return}if(this.pacesForFrames)return;Rc.call(this);}parsedSince(e,t){let r=wGv(this.device)-t;if(r>0&&this.textsParsed===e)this.noteParse(r);return this.textsParsed-e}askTextParsed(){let e=Y3(this.device);if(e===null)return!1;let t=this.parseAnswerTicket+=1;this.parseAskedAtMs=this.wallNowMs();let r=(()=>this.noteTextParsed(t));return e.then(r,r),!0}noteParseSpeed(){if(this.parseBurstAtMs!==null&&this.parseBurstUnits>0){let e=(this.wallNowMs()-this.parseBurstAtMs)/this.parseBurstUnits;this.parseMsPerUnit=this.parseMsPerUnit===null?e:Math.min(this.parseMsPerUnit*1.05,e)}this.parseBurstAtMs=null,this.parseBurstUnits=0}noteTextParsed(e){if(e!==this.parseAnswerTicket)return;if(this.noteParseSpeed(),this.parsePaced){if(!this.parseNeedsFrame)return;let e=this.wallNowMs();if(this.parseAnswerSpanMs=Math.max(0,e-this.parseAskedAtMs),this.parseAnsweredThrough=this.fencesArmed,this.chipOutlastsTheNextParse(e))this.payParse();return}if(!this.parseAnswerOwed)return;this.parseAnswerOwed=!1,this.drainWarmQueue()}constructor(e,t={}){this.device=void 0;this.lightBooks={coats:new Map,arms:new Map,elseLights:new Map,ownAsks:new WeakMap,ownStandIns:new Map,fourRests:new Map,asked:new Map,keyShapes:new Map,seas:new Map,throughs:new Map,folds:0};this.resourceLease=void 0;this.options=void 0;this.poolInflightMax=void 0;this.shaderModules=new Map;this.moduleTexts=new WeakMap;this.moduleGone=new FinalizationRegistry((e)=>{if(this.heldModule(e)===void 0)this.shaderModules.delete(e)});this.recentModules=new Map;this.firstGraceEndsAtMs=1/0;this.recentSweptAtMs=-1/0;this.moduleHeldMax=96;this.moduleHoldFolded=null;this.moduleWatchers=new Map;this.renderPipelines=new Map;this.retryingEntries=new Set;this.nextRetryAtMs=1/0;this.computePipelines=new Map;this.peelPipelinesByBaseKey=new Map;this.peelPipelinesBySource=new WeakMap;this.coverCompanionsBySource=new WeakMap;this.throughTwinsBySource=new WeakMap;this.armsAsked=new Set;this.throughCoversBySource=new WeakMap;this.liquidTwinsBySource=new WeakMap;this.materialDataTwinsBySource=new WeakMap;this.sampleTwinsBySource=new WeakMap;this.lookPlaneTwinsBySource=new WeakMap;this.lookPlanes=!1;this.depthArmsBySource=new WeakMap;this.twinsByKey=new Map;this.frontFacesBySource=new WeakMap;this.frontFacesByKey=new Map;this.bindGroupLayoutTrie=Gs(null,void 0);this.bindGroupLayoutCount=0;this.emptyBindGroupValue=null;this.bindGroupTrie=Gs(null,void 0);this.bindGroupEntries=new Set;this.bindGroupsMinted=0;this.refusedBindGroups=new WeakSet;this.bindGroupsRefused=0;this.bindGroupRefusalSink=null;this.bindGroupObjectIds=new WeakMap;this.nextBindGroupObjectId=1;this.skippedDrawCount=0;this.arrivingDrawCount=0;this.frameArrivingRequestedAt=[];this.frameArrivingRequestedCount=0;this.parkedPipelineCount=0;this.warmDepth=0;this.idleDepth=0;this.roomDrainOwed=!1;this.slackNow=!1;this.slackDrainOwed=!1;this.refusingFreshText=!1;this.heldForText=new WeakMap;this.pictureUnseen=void 0;this.parsingAhead=!1;this.descriptorAhead=new WeakMap;this.parsedAhead=0;this.idleEntries=new WeakSet;this.outsideDrops=new Set;this.framePendingPicturePipelines=new Set;this.framePresentedPicturePipelines=new Set;this.viewDepth=0;this.frameBuildText=0;this.frameViewBuilds=0;this.viewLine=[];this.viewLined=new WeakSet;this.approachDepth=0;this.namedDrawDepth=0;this.calmDepth=0;this.heldDepth=0;this.calmOwer=null;this.calmByClass=!1;this.speculationPaced=!1;this.refutes=null;this.drops=null;this.calmOwedEntries=new WeakSet;this.calmAskedEntries=new WeakSet;this.continuityEntries=new WeakSet;this.heldAskedEntries=new WeakSet;this.heldTextOwed=new WeakSet;this.heldWarmsOwed=!1;this.buildsSlowFrames=!1;this.approaching=!1;this.framesUnwatched=!1;this.drewBefore=null;this.drewBeforeKeys=new Map;this.frameUseCount=0;this.oneBuildReadsHold=!1;this.cpuCompiles=void 0;this.queueRestsUnderBuilds=!1;this.frameOnQueue=!1;this.recoveredAdmits=null;this.restHeld=[];this.frameUnresolvedPictureSkips=0;this.frameTextureWaits=new Set;this.frameArrivingPipelines=new Set;this.frameStoodIn=new Set;this.contributor=null;this.frameHeldByContributor=new Map;this.frameHeldHandleContributor=new Map;this.drawCompletionCapture=null;this.pendingAskCapture=null;this.pendingAskSet=new Set;this.speculativeDrawCapture=null;this.speculativeDrawBase=[];this.pictureDepth=0;this.handoffDepth=0;this.arrivingDrawDepth=0;this.wholeDepth=0;this.wholeOwed=[];this.wholeUnits=new WeakMap;this.askTwinBuilt=!1;this.askUnits=null;this.parseRoomTaken=!1;this.parseRoomSpentMs=0;this.wholeShare=RqO;this.parseMsPerUnit=null;this.parseBurstAtMs=null;this.parseBurstUnits=0;this.frameMinMs=1/0;this.lastBeginMs=null;this.arrivalLeadOpen=gQ;this.leadsAround=[];this.passOpenAt=-1;this.eye=new Kep;this.arrivalLeads=new WeakMap;this.latePictureHandles=new Set;this.heldSweep=new _qb;this.picturePreparationDepth=0;this.arrivalPreparationDepth=0;this.laneDepth=fsR.map((()=>0));this.buildLedger=new Map;this.lineRides=new Map;this.buildTaintsByKey=new Map;this.retiredSeen=EL;this.withdrawnValues=new Set;this.warmQueues=fsR.map((()=>[]));this.staleLeads=[];this.keptLeads=[];this.lookFirst=!1;this.lookFades=QQ;this.lookHeld=null;this.liftHeld=null;this.liftFades=null;this.liftKeys=new Set;this.placeOwnDepth=0;this.placeOwnEntries=new Set;this.issuingForLook=!1;this.entryKeys=new WeakMap;this.frameReadEntries=new WeakSet;this.drawWatch={noteDrew:(e)=>{let t=this.buildLedger.get(e);if(t===void 0||t.drewAtMs!==void 0)return;t.drewAtMs=this.wallNowMs(),this.frameUseCount+=1}};this.kernelHandles=new WeakMap;this.compileSpeed=void 0;this.watchdogSmallerByKey=new Map;this.watchdogLaneByKey=new Map;this.materialWatchdogLanes=new Map;this.watchdogMarginKeys=new Set;this.watchdogFloorKeys=new Set;this.standInKeys=new WeakMap;this.samePictureEntries=new WeakSet;this.standInCostEntries=new WeakSet;this.effectEntries=new WeakSet;this.effectKeys=new Set;this.passEntries=new WeakMap;this.costlyAskedAt=new WeakMap;this.framesBegunCount=0;this.runVerdictSeen=[];this.keyVerdictSeen=null;this.idleTurnFrame=-1;this.idleWarm=null;this.idleWarmLane=-1;this.idleWaitFrame=-1;this.idleTurns={turns:0,holds:{unseen:0,play:0,lanes:0,compiler:0,line:0,warm:0,parse:0,pool:0,frames:0},waitSinceMs:null,rowAtMs:null};this.drainHold=null;this.drawBuildsInFlight=0;this.inBooks=new Map;this.idleBuildsStanding=0;this.climbWidth=1;this.climbFromMs=null;this.climbSettles=0;this.climbKnee=!1;this.climbStep=null;this.machineSlowed=!1;this.leasedWaitsInPass=void 0;this.drainOwed=!1;this.heldLanesFrom=null;this.lateHeldForBoot=!1;this.softwareFirst=!1;this.inPictureWindow=!1;this.pictureAsks=ps;this.bodyProgramKeys=new Set;this.arrivingRidesBeforeWorld=!1;this.warmIssueHold=!1;this.memoryRoom="room";this.warmFramePaced=!1;this.warmFrameDebt=!1;this.lastFrameDrawsWait=!1;this.textHeldOrder=1/0;this.parseNeedsFrame=!1;this.playOpened=!1;this.refills=!1;this.pageHidden=!1;this.shownShares=new WeakSet;this.pageHiddenEdgeAtMs=-1/0;this.hiddenTurn=null;this.hiddenTurnOpen=!1;this.hiddenBootPace=!1;this.hiddenDrainHeld=!1;this.deviceGone=!1;this.hiddenBuilds=void 0;this.deviceBuilds=void 0;this.keyBuilds=void 0;this.keysInFlight=new Map;this.parseAnswerOwed=!1;this.parseAnswerTicket=0;this.textsParsed=0;this.fencesArmed=0;this.fenceSettledThrough=0;this.parseFenceFloor=0;this.settleOwesFrame=!1;this.settleFenceFloor=0;this.parseAnsweredThrough=null;this.parsePayArmed=!1;this.parseAskedAtMs=0;this.parseAnswerSpanMs=null;this.loopHoldsForChip=!1;this.fenceFloor=0;this.fenceArmedAtMs=new Float64Array(8);this.fenceSpanMs=NaN;this.judgeFenceTokens=new Float64Array(8);this.judgeFenceOrdinals=new Float64Array(8);this.playableReceipts=0;this.drawsOwed=[];this.pictureLine=[];this.floors=[];this.floorOf=new WeakMap;this.frameOneAsked=!1;this.pictureHeldEntries=new WeakSet;this.frameOneDepth=0;this.frameOneAsks=new Set;this.frameOnePassedMs=0;this.pictureReadyGate=null;this.gateReads=0;this.warmBuildsInFlight=0;this.laneBuildsInFlight=fsR.map((()=>0));this.outsideBuildsInFlight=0;this.deviceEpoch=0;this.sessionCloses=0;this.arrivingWaitSinceMs=null;this.arrivingWaitReason="";this.submitJudge=void 0;this.judgeOrdinals=new WeakMap;this.deviceKeepsSubmitWord=!1;this.fxWideProgramMet=!1;this.fxWideHeard=null;this.atDevice=new Set;this.stagesBuilding=new Map;this.twinSpans={ownMs:0,siblingMs:0};this.deviceSettledAtMs=-1/0;this.poolSlots=void 0;this.poolBuildsStanding=0;this.lastBuildHoldMs=0;this.buildHoldProofThrough=0;this.heldFramesAnswered=0;this.heldFramesMs=0;this.shareFencesFrom=0;this.shareHeldFrom=0;this.shareRanMs=0;this.lastFenceAnsweredAtMs=-1/0;this.coldCensus={count:0,deviceMs:0,byHelper:{},latest:[]};this.compileSum={builds:0,ms:0,shownBuilds:0,shownMs:0,shownPastPriceMs:0,characterMs:0,staticMs:0};this.noteDeviceGone=()=>{this.deviceGone=!0,this.cancelHiddenTurn(),this.poolSlots?.end()};this.poolSlotsMoved=(()=>{this.drainWarmQueue(),this.poolSlots?.fit()});this.poolBuildsHeld=(()=>{if(!this.warmIssueHeld)return 0;let e=this.lanesReadTo(this.coverHoldsArriving?Zs:this.heldLanesFrom),t=0;for(let r=0;r<e;r+=1)for(let e of this.warmQueues[r])if(e.pending())t+=1;return t});this.payParseAtSubmit=()=>{if(this.parsePayArmed=!1,!this.parseNeedsFrame||this.parseAnsweredThrough===null||this.fencesArmed<=this.parseAnsweredThrough)return;this.payParse()};this.liquidTwinModule=()=>this.shaderModule(LY,"lume liquid twin");this.depthArmModule=()=>this.shaderModule(Art,"lume depth arm");this.askTwin=()=>{let e=uO;if(uO=null,e===null)throw Error("lume: a twin was asked with no link");let t=e.frontFaces&&!this.renderPipelines.has(e.key)?this.linkFrontFaces(e.key,e.descriptor):null;let r=t===null?e.descriptor:t.made;let i=(r)=>t===null?this.buildRenderPipeline(e.key,r):t.builds(r);let n=()=>{let t=e.gate;if(!t.issued){return i(r());}let n=()=>i(this.withKeyTaints(e.key,r));return t.built.then((t)=>t?n():this.anotherSourceBuilt(e.key).then((t)=>t?n():this.twinLeft(e)))};return this.request(this.renderPipelines,"render",e.key,t===null?n:this.gatedSource(t.link,n))};this.keptCoverOverrides=new WeakMap;this.pacedEntries=new WeakSet;this.paceDrawn=new WeakSet;this.paceTurnEntry=null;this.paceTurnPipeline=null;this.paceTurnFrame=-1;this.paceYielded=null;this.paceYieldFrame=-1;this.paceTurns=0;this.paceLastTurnMs=-1;this.readinessRevision=0;this.chainMoves=0;this.answerMoves=0;this.sessionRecord=null;this.sessionOrdinal=0;this.recordOrdinals=new WeakMap;this.recordsMet=0;this.geometryMovesSeen=0;this.geometryMoves=null;this.materialIdentityTrie=Gs(null,void 0);this.nextMaterialIdentity=0;this.materialNames=new Map;this.materialLabels=new Map;this.buildSources=new Map;this.sourceTurns=new Map;this.sourceTurnCount=0;this.frameNowMs=0;this.settledBuildCount=0;this.todayLines=new Map;this.rankDepth=0;this.runHiddenTurn=()=>{if(this.hiddenTurn=null,!this.pageHidden||this.deviceGone||this.hiddenDrainHeld||this.buildsInFlight>0)return;this.hiddenTurnOpen=!0;try{this.drainWarmQueue()}finally{this.hiddenTurnOpen=!1}};this.restStanding=null;if(this.device=e,aQ(e),typeof GPUDevice==="function"&&e instanceof GPUDevice)a3(e);this.resourceLease=Oje(e);this.hiddenBuilds=Ms(NQ,e);this.deviceBuilds=Ms(Vs,e);this.keyBuilds=(ayA(e).keyBuilds);this.options=t;this.compileSpeed=t.compileSpeed??aqb(e);this.poolInflightMax=t.poolInflightMax;this.poolSlots=t.browserPool!==void 0&&t.poolInflightMax!==void 0?Ero(t.browserPool,this.poolSlotsMoved,(()=>this.poolBuildsStanding),this.poolBuildsHeld,()=>!this.picturePlayed||this.pictureUnseen===!0):null;this.submitJudge=new bzK(t.buildsBlockSubmits===!0,t.buildsBlockSubmitsPinned===!0,t.cpuBuildsBesideSubmits===!0);let r=e.lost;if(r!==void 0)r.then(this.noteDeviceGone,this.noteDeviceGone)}get armsAskedCount(){return this.armsAsked.size}get requestedKeyCount(){return this.buildLedger.size}get buildsInFlight(){return this.drawBuildsInFlight+this.warmBuildsInFlight}get buildStands(){return this.buildsInFlight>0||this.deviceBuilds.inFlight>0}get pictureBuildsInFlight(){let e=0;for(let[t,r]of this.keysInFlight){let i=this.buildLedger.get(t);if(i===void 0)continue;let n=this.entryAt(t);if(!i.warm||i.promoted||i.drawn||n!==void 0&&as.has(n))e+=r}return e}coldDeviceCensus(){return this.coldCensus.count===0?null:this.coldCensus}compileClock(){return{...this.compileSum}}get buildsBlockSubmits(){return this.submitJudge.verdict}standKeptSubmitVerdict(e=1){if(!this.submitJudge.standKept(e))return!1;return this.drainWarmQueue(),!0}standQueueRestsUnderBuilds(){if(this.queueRestsUnderBuilds)return!1;return this.queueRestsUnderBuilds=!0,this.submitJudge.standRest(),this.drainWarmQueue(),!0}setFrameOnQueue(e){if(this.frameOnQueue===e)return;if(this.frameOnQueue=e,e||!this.framesRestUnderBuilds&&this.restHeld.length===0)return;for(let e of this.restHeld.splice(0))this.poolBuildsStanding-=1,this.book(e.key,e.lane,e.warmLane,-1),e.call();this.drainWarmQueue()}holdForRecoveredPicture(e){if(this.recoveredAdmits=e,e!==null)return;this.drainWarmQueue()}get framesRestUnderBuilds(){return this.buildsOnPresentThread||this.coverStands&&(this.queueRestsUnderBuilds||this.recoveredRests)}get queueRests(){return this.framesRestUnderBuilds||this.queueRestsUnderBuilds}get recoveredRests(){return this.recoveredAdmits!==null&&this.buildsFreezeFrames}get recoveredHoldStands(){return this.recoveredAdmits!==null&&(this.buildsGoOneAtATime||this.buildsFreezeFrames)}recoveredHolds(e,t=!1){let r=e.queued,i=this.recoveredAdmits;if(r===null||i===null||!this.recoveredHoldStands)return!1;return!((t||r.drawn||e.queuedLane<0||e.queuedLane===Xs)&&i(r.key))}get undecidedJudgeTally(){return this.submitJudge.isDecided?null:this.submitJudge.tally}get buildsFreezeFrames(){return this.buildsOnPresentThread||this.buildsBlockSubmits&&Lmy(this.device)===null}get buildsHoldPlayerFrames(){return this.buildsFreezeFrames||this.framesRestUnderBuilds}get speculationWaitsForDraws(){let{shownBuilds:e,shownMs:t,shownPastPriceMs:r}=this.compileSum;return this.buildsHoldPlayerFrames||!this.hostCompilesInline&&e>0&&(r>0||t>=Kd*e)}get eachBuildFreezesTheFrames(){return this.buildsOnPresentThread||this.hostCompilesInline&&Lmy(this.device)===null}get compilesCostFrames(){return this.eachBuildFreezesTheFrames||this.submitJudge.isFinal&&this.buildsFreezeFrames}get buildsGoOneAtATime(){if(this.hostCompilesInline)return!1;return this.buildsBlockSubmits||this.poolInflightMax===1}get hostCompilesInline(){return this.buildsOnPresentThread||this.buildsBlockSubmits&&this.options.buildsBlockSubmitsPinned===!0}get buildsOnPresentThread(){return this.options.buildsOnPresentThread===!0}get speculationBehindTheLift(){return this.buildsOnPresentThread&&this.buildsBlockSubmits}get speculationWaitsForReads(){return(this.oneBuildReadsHold||this.eachBuildFreezesTheFrames)&&!this.pageHidden&&!this.framesUnwatched}get lineOwes(){return this.outstandingBuilds()>0}get secondDeviceMayAsk(){return this.pageHidden||this.framesUnwatched&&!this.buildsGoOneAtATime}get nobodyWatches(){return this.framesUnwatched}get compilesOnCpu(){return!!this.cpuCompiles}get pacesForFrames(){return this.buildsBlockSubmits&&!this.framesUnwatched&&!this.coverHidesPoolFrames&&!this.starvedWidthRides}get coverStands(){return!this.picturePlayed||this.pictureUnseen===!0&&!this.framesUnwatched}get coverHidesPoolFrames(){return this.coverStands&&this.poolBesideTheDevice}get coverLeavesWidth(){if(!this.coverHidesPoolFrames)return null;let e=this.submitJudge.starvedWidth;return(e??0)>=2&&!this.queueRestsUnderBuilds?e:1}buildsBehindTheLift(){let e=0;for(let[t,r]of this.keysInFlight)if(this.buildLedger.get(t)?.frameOneAtMs!==void 0)e+=r;return Math.max(0,this.buildsInFlight-e)}get frameOneSetBuilds(){return this.buildsInFlight>this.buildsBehindTheLift()||this.hasPendingFrameOneDraws()}get poolCeilingNamed(){return this.poolInflightMax!==void 0&&this.poolInflightMax<1/0}get coverHoldsPool(){return this.frameOneAsked&&this.coverStands&&!this.pacesForFrames&&this.poolCeilingNamed}get coverHoldsArriving(){return this.coverHidesPoolFrames&&!this.inPictureWindow&&this.heldLanesFrom===js}get starvedWidthRides(){if(!this.picturePlayed||this.queueRestsUnderBuilds||!this.poolBesideTheDevice)return!1;return(this.submitJudge.starvedWidth??0)>=2}get arrivingShare(){return this.options.arrivingInflightMax??1/0}get arrivingBound(){let e=this.arrivingShare,t=this.starvedPoolWidth;return t===null?e:Math.max(e,t)}get starvedPoolWidth(){return this.starvedWidthRides?this.submitJudge.starvedWidth:null}get poolClimb(){return this.climbBinds?{width:this.climbWidth,step:this.climbStep,knee:this.climbKnee}:null}get climbBinds(){let e=this.poolInflightMax;return this.picturePlayed&&this.pictureUnseen===!1&&!this.framesUnwatched&&e!==void 0&&e3w(e)}setRefill(e){if(this.refills===e)return;this.refills=e,this.notePaceTurned(),this.drainLines()}get refilling(){return this.refills&&!this.buildsBlockSubmits&&!this.buildsOnPresentThread}get parsePaced(){return this.playOpened&&!this.refilling}notePaceTurned(){if(this.parsePaced){this.parseAnswerOwed=!1;return}this.parsePaid()}noteMachineSlowed(e){this.machineSlowed=e}restartClimbGeneration(e){this.climbFromMs=e,this.climbSettles=0}climbAtSettle(e,t){let r=this.poolInflightMax;if(!this.climbBinds||r===void 0)return;if(this.climbFromMs===null||e<this.climbWidth){this.restartClimbGeneration(null);return}this.climbSettles+=1;let i=this.climbWidth,n=this.machineSlowed||this.buildsSlowFrames;if(n)this.climbKnee=!0;else if(this.climbKnee&&this.climbSettles<i)return;let l=Math.max(1,Math.min(n?i-1:i+1,r));if(l===i){if(n||this.climbSettles>=i)this.restartClimbGeneration(t);return}let s=t-this.climbFromMs;if(this.climbStep={width:i,rate:s>0?this.climbSettles*1000/s:null,slowed:n},this.climbWidth=l,this.restartClimbGeneration(t),l<i)return;this.drainLines()}get poolBesideTheDevice(){return this.buildsBlockSubmits&&this.options.buildsBlockSubmits!==!0&&!this.hostCompilesInline&&this.poolCeilingNamed&&Lmy(this.device)===null}get pictureLined(){return this.pacesForFrames&&(this.lateLaneHeld||this.pictureLine.length>0)}noteFenceArmed(e=this.wallNowMs()){if(this.fencesArmed+=1,this.fencesArmed-this.fenceFloor>this.fenceArmedAtMs.length)this.growFenceRing();let t=this.fencesArmed&this.fenceArmedAtMs.length-1;if(this.fenceArmedAtMs[t]=e,this.judgeFenceTokens[t]=this.submitJudge.fenceArmed(e,!this.picturePlayed),this.judgeFenceOrdinals[t]=this.fencesArmed,this.parseNeedsFrame&&!this.parsePayArmed&&this.parseAnsweredThrough!==null&&this.fencesArmed>this.parseAnsweredThrough)this.parsePayArmed=!0,setTimeout(this.payParseAtSubmit,0);return this.fencesArmed}fenceArmedAt(e){return e>this.fenceFloor&&e<=this.fencesArmed?this.fenceArmedAtMs[e&this.fenceArmedAtMs.length-1]:NaN}growFenceRing(){return $c0P($c0C(185),o58.prototype,"growFenceRing").call(this)}payParse(){if(this.pacesForFrames)return;this.parsePaid(),this.drainLines()}noteLoopHoldsForChip(e){this.loopHoldsForChip=e}chipOutlastsTheNextParse(e){if(!this.loopHoldsForChip||this.fenceSpanMs!==this.fenceSpanMs||this.parseAnswerSpanMs===null)return!1;let t=this.fenceArmedAt(this.fenceSettledThrough+1);return t===t&&t+this.fenceSpanMs>=e+this.parseAnswerSpanMs}openBuildShare(){this.shareFencesFrom=this.fencesArmed,this.shareHeldFrom=this.heldFramesAnswered,this.shareRanMs=0}noteFenceSettled(e,t=NaN,r=0){if(Number.isNaN(t))t=this.wallNowMs();let i=e&this.fenceArmedAtMs.length-1;if(e>this.fenceFloor&&e<=this.fencesArmed){let n=this.fenceArmedAtMs[i];this.fenceSpanMs=Math.max(0,t-n),this.fenceFloor=e;let l=t-Math.max(n,this.lastFenceAnsweredAtMs)-r,s=l>SR;if(this.lastFenceAnsweredAtMs=t,this.buildsBlockSubmits){if(s)this.heldFramesAnswered+=1,this.heldFramesMs+=l;else if(l>0)this.shareRanMs+=l;let t=this.buildHoldProofThrough;if(t!==0&&(e>=t||s))this.buildHoldProofThrough=0,this.lastBuildHoldMs=s?Math.min(this.lastBuildHoldMs,l):0}}this.fenceSettledThrough=Math.max(this.fenceSettledThrough,e);let n=this.judgeFenceOrdinals[i]===e?this.judgeFenceTokens[i]:0;if(n===0)return;this.judgeFenceTokens[i]=0;let l=this.submitJudge.fenceSettled(n,t,r);if(l!==null)this.submitJudgeRead(l)}noteDeviceKeepsSubmitWord(){this.deviceKeepsSubmitWord=!0}noteFxWideProgram(){if(this.fxWideProgramMet)return;this.fxWideProgramMet=!0,this.fxWideHeard?.()}standKeptFxWideProgram(){this.fxWideProgramMet=!0}hearFxWideProgram(e){this.fxWideHeard=e}get compilesCostFramesOnThisDevice(){return this.compilesCostFrames||this.deviceKeepsSubmitWord&&Lmy(this.device)===null}submitJudgeRead(e){if(!e.verdict||this.starvedWidthRides)this.warmFramePaced=!1,this.warmFrameDebt=!1;if(this.refills)this.notePaceTurned();this.options.onBuildsBlockSubmitsMeasured?.(e),this.drainWarmQueue()}get frameNow(){return this.frameNowMs}arrivingDrawsRequestedBefore(e){let t=0,r=this.frameArrivingRequestedAt;for(let i=0;i<this.frameArrivingRequestedCount;i+=1)if(r[i]<=e)t+=1;return t}asksStillInLine(){return $c0P($c0C(186),o58.prototype,"asksStillInLine").call(this)}pendingPipelineCount(){return this.readPass(()=>{let e=0;for(let t of[this.renderPipelines,this.computePipelines])for(let r of t.values())if(hO(r)&&!this.owedNowhere(r))e+=1;return e})}owesNoDevice(e){let t=this.entryAt(e);return hO(t)&&this.owedNowhere(t)}stillOwedToCalm(e){return e.queued!==null&&!e.queued.drawn&&e.queuedLane===js&&this.calmOwedEntries.has(e)}heldDrawsStillPending(e,t,r){return this.heldStillPendingIn(this.framePendingPicturePipelines,e,t,r)+this.heldStillPendingIn(this.frameArrivingPipelines,e,t,r)}drewStandInSince(e){for(let t of this.frameStoodIn){if(t.firstStoodInAtMs!==e||!hO(t))continue;let r=this.standInKeys.get(t);if(r!==void 0&&(this.builtTwin(r)?.firstRequestedAtMs??e)<e)return!0}return!1}filmBuildsOf(e,t){if(e===void 0){let e=new Set;this.heldDrawsStillPending(t,e);let r=new Set;for(let e of[this.framePendingPicturePipelines,this.frameArrivingPipelines])for(let t of e){let e=$vu(t)?this.entryKeys.get(t):void 0;if(e!==void 0)r.add(e)}return{owed:[...e],refused:[...r]}}let r=[],i=[];for(let t of e){let e=this.entryAt(t);if(e?.built!==null)continue;if($vu(e))i.push(t);else if(!e.failed&&!this.waitsForItsRead(e))r.push(t)}return{owed:r,refused:i}}pictureHeldDraws(e,t){if(t)return this.heldStillPendingIn(this.framePresentedPicturePipelines,e,void 0,void 0);return this.framePresentedPicturePipelines.forEach(o58.countPictureHeld,this.heldSweep.open(this,e,void 0,void 0)),this.heldSweep.take()}static countPictureHeld(e){if(this.cache!==null&&!this.outside?.has(this.cache.frameHeldHandleContributor.get(e)??""))this.count+=1}heldStillPendingIn(e,t,r,i){return e.forEach(o58.countStillPending,this.heldSweep.open(this,t,r,i)),this.heldSweep.take()}static countStillPending(e){let t=this.cache;if(!t?.stillBuilding(e))return;if(this.outside?.has(t.frameHeldHandleContributor.get(e)??"")||this.fades!==void 0&&t.fadesIn(e,this.fades))return;this.count+=1;let r=t.entryKeys.get(e);if(r!==void 0)this.into?.add(r)}enterContributor(e){let t=this.contributor;return this.contributor=e,t}leaveContributor(e){this.contributor=e}heldDrawsByContributor(){return this.frameHeldByContributor}noteHeldDrawContributor(e){let t=this.contributor;if(t!==null)ZYD(this.frameHeldByContributor,t);if(e===void 0)return;let r=this.frameHeldHandleContributor.get(e);if(r===void 0)this.frameHeldHandleContributor.set(e,t);else if(r!==t)this.frameHeldHandleContributor.set(e,null)}arrivingDrawRows(){return this.drawRowsOf(this.frameArrivingPipelines)}pendingDrawRows(){return this.drawRowsOf(this.framePendingPicturePipelines)}drawRowsOf(a){return $c0P($c0C(187),o58.prototype,"drawRowsOf").call(this,a)}stillBuilding(e){return hO(e)&&this.ownEntry(e,this.entryKeys.get(e))}ownEntry(e,t){return t!==void 0&&(this.renderPipelines.get(t)===e||this.computePipelines.get(t)===e)}pendingAsksOf(a,b){return $c0P($c0C(188),o58.prototype,"pendingAsksOf").call(this,a,b)}get probing(){return this.speculativeDrawCapture!==null}speculativeDrawsOf(e,t){if(this.probing)return e();let r=new Set;return this.viewScope(()=>this.warmScope(()=>{this.speculativeDrawBase=[this.warmDepth,...this.laneDepth],this.speculativeDrawCapture=r;try{return e()}finally{this.speculativeDrawCapture=null;for(let e of r){if(!this.stillBuilding(e))continue;if(t.push(e),e instanceof vQ)this.leadTwin(e)}}},"arriving"))}leadTwin(e){this.noteFrameRead(e,!0);let t=e.queued;if(t===null||e.queuedLane<0)return;bs.add(e);let r=this.arrivalLeadOpen;this.arrivalLeadOpen=this.arrivalLeads.get(e)?.share??0;try{this.noteDrawn(e,t.key)}finally{this.arrivalLeadOpen=r}}pendingDrawCompletion(e){let t;if(e){let r=this.drawCompletionCapture,i=new Set;this.drawCompletionCapture=i;try{e()}finally{if(this.drawCompletionCapture=r,r)for(let e of i)r.add(e)}t=i}else t=[...this.framePendingPicturePipelines,...this.frameArrivingPipelines];let r=[...new Set(t)].filter((e)=>this.stillBuilding(e));if(!e){Sc.call(this,r);}return r.length===0?null:()=>r.every((e)=>!this.stillBuilding(e))}waitAsks(e,t){if(e?.built!==null)return null;if(e.queuedLane>=0&&e.queued?.drawn===!1){if(t&&this.calmOwedEntries.delete(e))this.enqueueWarm(e,js);if(!this.calmOwedEntries.has(e))this.noteDrawn(e,e.queued.key)}return this.awaitBuild(e)}hasPendingPictureDraws(){if(this.frameUnresolvedPictureSkips>0)return!0;for(let e of this.framePresentedPicturePipelines)if(hO(e)&&!this.latePictureHandles.has(e))return!0;return!1}hasPendingPresentedDraw(e=!1){for(let t of this.framePresentedPicturePipelines)if(hO(t)&&!this.twinDraws(t)&&(!e||this.inFrameOne(t))&&!(t instanceof vQ&&this.recoveredHolds(t,!0)))return!0;return!1}pendingPictureDraws(e){let t=[],r=0;for(let i of this.framePresentedPicturePipelines){if(!hO(i)||this.latePictureHandles.has(i))continue;if(r+=1,t.length<e)t.push(this.entryKeys.get(i)??"?")}return{keys:t,pending:r,unresolved:this.frameUnresolvedPictureSkips}}presentedDrawsOwed(e,t=!1){let r=new Set;for(let i of this.framePresentedPicturePipelines)if(!this.latePictureHandles.has(i))this.noteOwedDraw(i,e,r,t);for(let i of this.frameArrivingPipelines)this.noteOwedDraw(i,e,r,t);return[...r]}noteOwedDraw(e,t,r,i){if(!this.stillBuilding(e)||this.fadesIn(e,t)||i&&this.twinDraws(e)||e instanceof vQ&&this.waitsForItsRead(e))return;let n=this.entryKeys.get(e);if(n!==void 0)r.add(n)}hasPendingFrameOneDraws(){return this.framePresentedPicturePipelines.forEach(o58.countFrameOnePending,this.heldSweep.open(this,void 0,void 0,void 0)),this.heldSweep.take()>0}static countFrameOnePending(e){if(hO(e)&&this.cache?.inFrameOne(e)&&!(e instanceof vQ&&this.cache.recoveredHolds(e,!0)))this.count+=1}noteIncomingPictureLate(){this.latePictureHandles.forEach(xqb),this.framePresentedPicturePipelines.forEach(iqb,this.latePictureHandles)}get latePictureDrawCount(){return this.latePictureHandles.forEach(Eqb,this.heldSweep.open(this,void 0,void 0,void 0)),this.heldSweep.take()}retryParked(){let e=0;for(let t of[this.renderPipelines,this.computePipelines])for(let r of t.values()){if(!r.failed||r.budgetsExhausted>=qs)continue;r.attempts=0,r.retryAtMs=0,e+=1}if(e>0)this.answerMoves+=1;return e}noteSkippedDraw(e){let t=e;if(e instanceof bQ){let r=e.twin===null&&xs(e.compute)?this.entryKeys.get(e):void 0;if(r!==void 0)this.askFragmentForm(e,r);t=e.twin??e.compute}if(t===void 0)return this.notePending();if(t instanceof vQ)this.noteFrameRead(t,!0);if(this.noteFrameOne(t),this.asksFrameOne)this.leadAsked(t,kHk);let r=this.standInKeys.get(t);try{if(r!==void 0){let e=this.standingTwin(r);if(e!==null&&e.built!==null){this.noteBuiltStandInDraw(t,r,e);return}if(e!==null){this.askAgain(e),this.notePending(e);return}}this.askAgain(t),this.notePending(void 0,t)}finally{if(t instanceof vQ)this.askFloor(t)}}noteBuiltStandInDraw(e,t,r){let i=this.entryKeys.get(e),n=this.renderPipelines.get(i??""),l=this.standInCostEntries.has(e),s=this.floorOf.get(r)===!0,o=i!==void 0&&n===e;if(s&&o)this.relaneOnAsk(n,i);let a=!s&&l&&this.standInCostDrawn(),u=s?Zs:this.standLane(this.samePictureEntries.has(e),t,l,a,r);this.enterWarm(u);try{if(!s&&o)this.relaneOnAsk(n,i);if(!this.samePictureEntries.has(e))this.notePending(n===e?n:void 0,e,!0)}finally{this.leaveWarm(u)}if(a&&o)this.noteStandInCost(n,i)}promoteToDraw(e,t,r){let i=this.entryKeys.get(e);if(i===void 0)return;let n=this.entryAt(i);if(n!==e)return;if(this.speculativeDrawCapture!==null)return void this.speculativeDrawCapture.add(n);as.add(n);let l=t===void 0?-1:this.enterLead(t);try{if(n.queued!==null&&n.queuedLane>=0)if(this.transientNow()){if(!n.queued.drawn)this.noteDrawn(n,i)}else this.effectEntries.delete(n),this.notePromoted(i),this.issueForDraw(n);else if(n.queued?.drawn)this.noteFrameRead(n,!0);if(this.askFloor(n),this.leadAsked(e),r&&n.queued)n.queued.lease|=$s}finally{if(l>=0)this.leaveLead(l)}}leadAsked(e,t){let r=this.entryKeys.get(e),i=this.entryAt(r);if(i!==e||i.queued===null)return;let n=t===void 0?-1:this.enterLead(t);try{if(!this.noteOwedLead(i))return;let e=this.lineOf(i.queuedLane),t=e.indexOf(i);if(t<0)return;e.splice(t,1),e.splice(this.owedInsertAt(i.queued.drawnAtMs??null,this.leadShareOf(i),i.queuedLane),0,i)}finally{if(n>=0)this.leaveLead(n)}}askAnswersMoved(){this.answerMoves+=1}drawnAnswersMoved(){this.answerMoves+=1,this.chainMoves+=1}askAgain(e){let t=this.entryKeys.get(e),r=this.entryAt(t);if(r===e&&t!==void 0)this.relaneOnAsk(r,t)}notePending(e,t=e,r=!1){if(this.speculativeDrawCapture!==null){Tc.call(this,t);return}let i=this.isDraw();if(this.pendingAskCapture!==null&&t!==void 0)this.pendingAskCapture.add(t);let n=this.drawCompletionCapture;if(n&&t!==void 0&&(i||this.currentLane()===Zs))n.add(t);if(this.picturePreparationDepth>0)return;if(i)if(this.skippedDrawCount+=1,t===void 0){if(this.viewDepth===0)this.frameUnresolvedPictureSkips+=1}else{if(this.framePendingPicturePipelines.add(t),t instanceof vQ)this.noteFrameRead(t,!0);if(this.viewDepth===0)this.framePresentedPicturePipelines.add(t),this.pictureHeldEntries.add(t)}else if(this.currentLane()===Zs){if(this.arrivingDrawCount+=1,t!==void 0)this.frameArrivingPipelines.add(t);if(e?.queued===null)this.frameArrivingRequestedAt[this.frameArrivingRequestedCount++]=e.firstRequestedAtMs;if(r&&e!==void 0){if(e.firstStoodInAtMs<0)e.firstStoodInAtMs=this.frameNowMs;this.frameStoodIn.add(e)}}else return;this.noteHeldDrawContributor(t)}isDraw(){return this.warmDepth===0&&(this.pictureDepth>0||this.wholeDepth>0)&&!this.transientNow()}transientNow(){return this.contributor!==null&&FOn.has(this.contributor)}isDrawnAsk(){if(this.warmDepth===0&&(this.pictureDepth===0||this.transientNow()))return!0;if(this.warmDepth===0||this.currentLane()!==Zs)return!1;let e=this.arrivingDrawDepth>0&&!(this.pacesForFrames&&(this.inPictureWindow||this.heldLanesFrom===Zs));return(this.handoffDepth>0||e)&&this.viewDepth===0||this.approachDepth>0&&!this.speculationWaitsForDraws}standInCostDrawn(){if(this.warmDepth>0||this.asksForUnseenPicture()||this.pictureUnseen)return!1;return this.parsePaced}noteStandInCost(e,t){let r=this.costlyAskedNow(e);if(this.costlyAskedAt.set(e,this.framesBegunCount),e.queued===null||e.queuedLane<0||e.queued.drawn&&r)return;this.noteDrawn(e,t,!0)}costlyAskedNow(e){let t=this.costlyAskedAt.get(e);return t!==void 0&&t>=this.framesBegunCount-1}openWarmLane(){return this.warmDepth>0?fsR[this.currentLane()]:null}currentLane(){for(let e=fsR.length-1;e>=0;e-=1)if(this.laneDepth[e]>0)return e;return this.warmDepth>0?0:Zs}askLane(){return this.pictureDepth>0&&this.warmDepth===0?Xs:this.currentLane()}setWholeShare(e){this.wholeShare=e>0?e:RqO}setSpeculationPaced(e){this.speculationPaced=e}noteBuildsSlowTheFrames(e){if(this.buildsSlowFrames===e)return;if(this.buildsSlowFrames=e,!e&&this.warmBuildsWait())this.drainWarmQueue()}noteApproach(e){if(this.approaching===e)return;if(this.approaching=e,e&&this.warmBuildsWait())this.drainWarmQueue()}refuteSpeculation(e){if(e===this.refutes)return 0;if(this.refutes=e,e===null)return 0;let t=[];for(let r of[Xs,Zs])for(let i of this.warmQueues[r]){let r=i.pending()&&!i.drawn()?i.waiting()?.key:void 0;if(r===void 0||!e(r))continue;let n=this.renderPipelines.get(r),l=this.computePipelines.get(r);if(n!==void 0&&n===i.entry)t.push(()=>this.moveQueued(n,r,js));else if(l!==void 0&&l===i.entry)t.push(()=>this.moveQueued(l,r,js))}if(t.length>0)this.warmScope(()=>t.forEach((e)=>e()),"late");return t.length}withdrawRenderWarms(){return $c0P($c0O(224,o58.prototype["withdrawRenderWarms"],"o58.prototype[\"withdrawRenderWarms\"]"),o58.prototype,"withdrawRenderWarms").call(this)}dropSpeculation(e){if(e===this.drops)return 0;if(this.drops=e,e===null)return 0;let t=0;for(let r of[this.renderPipelines,this.computePipelines])for(let[i,n]of[...r]){if(!e(i))continue;let r=n.queued===null?this.buildLedger.get(i):void 0;if(n.queued===null&&(!r?.warm||r.promoted||r.drawn))continue;if(n.queued!==null&&(n.queued.drawn||n.queuedLane<0||this.viewLined.has(n)))continue;let l=this.queuedTwinOf(i);if(n.queued!==null)t+=1,this.withdrawQueued(i,n,Hs);else if(l!==null)this.withdrawQueued(l.key,l.entry,Hs);if(l!==null)t+=1}if(t>0)this.drainWarmQueue();return t}droppedHandle(e){let t=new vQ(this,$Q(new oQ(`${Hs}: ${e}`)),this.frameNowMs);return t.failed=!0,t.withdrawn=!0,t.retryAtMs=1/0,t}queuedTwinOf(e){let t=this.frontFacesByKey.get(e),r=this.renderPipelines.get(t?.key??"");if(t===void 0||r===void 0||r!==t.entry||r.queued?.drawn!==!1)return null;return{key:t.key,entry:r}}askedLane(e){let t=this.currentLane();return t<js&&this.refutes!==null&&!this.isDrawnAsk()&&this.refutes(e)?js:t}setCompilesOnCpu(e){this.cpuCompiles=e}setFramesUnwatched(e){if(this.framesUnwatched===e)return;if(this.framesUnwatched=e,!e)return;this.parsePaid(),this.parseAnswerOwed=!1,this.warmFramePaced=!1,this.warmFrameDebt=!1,this.lastBuildHoldMs=0,this.buildHoldProofThrough=0,this.openArrivingLane(),this.drainWarmQueue()}setCalmOwer(e,t=!0){this.calmOwer=e,this.calmByClass=t,this.oweHeldWarmsQueued()}oweHeldWarmsQueued(){let e=this.heldWarmsWaitForCalm,t=e&&!this.heldWarmsOwed;if(this.heldWarmsOwed=e,!t)return;let r=[];for(let e of this.warmQueues)for(let t=0;t<e.length;){let i=e[t],n=i.pending()&&!i.drawn()&&this.calmAskedEntries.has(i.entry)&&!this.viewLined.has(i.entry)?i.waiting()?.key:void 0,l=this.renderPipelines.get(n??""),s=this.computePipelines.get(n??"");if(n!==void 0&&l!==void 0&&l===i.entry)r.push(()=>this.oweQueuedToCalm(l,n));else if(n!==void 0&&s!==void 0&&s===i.entry)r.push(()=>this.oweQueuedToCalm(s,n));else{t+=1;continue}e.splice(t,1)}r.forEach((e)=>e())}oweQueuedToCalm(e,t){e.queuedLane=js;let r=this.buildLedger.get(t);if(r!==void 0&&r.lane!=="late")r.moved={atMs:this.wallNowMs(),from:r.lane,to:"late"},r.lane="late";this.oweEntryToCalm(e,t)}setOneBuildReadsHold(e){if(this.oneBuildReadsHold===e)return;if(this.oneBuildReadsHold=e,!e)this.drainWarmQueue()}setDrewBefore(e){this.drewBefore=e,this.drewBeforeKeys=mnS(this.drewBeforeKeys),this.drainWarmQueue()}frameUsedProgramNames(){let e=[];for(let t of this.buildLedger.values())if(!t.failed&&t.drewAtMs!==void 0)e.push(this.recordName(t.key));return e}drewBeforeHas(e){if(this.drewBefore===null||e===void 0)return!1;let t;{t=Wc.call(this,e)}return t}returnLeaves(e){return e instanceof vQ&&this.drewBefore!==null&&!this.continuityEntries.has(e)&&!this.drewBeforeHas(this.entryKeys.get(e))}recordName(e){return (xzz((e.replace(eK,(e)=>this.materialNames.get(e)??e))).toString(36))}get warmNeedsFrame(){return this.warmFrameDebt&&!this.pageHidden}get warmIssueHeld(){return this.warmIssueHold&&!this.pageHidden}get frameHolds(){return this.frameStandsBetweenBuilds&&(Xc.call(this))}get frameStandsBetweenBuilds(){return this.cpuCompiles!==void 0&&(this.poolInflightMax===1&&!this.cpuCompiles||this.queueRestsUnderBuilds)&&this.parsePaced&&!this.pageHidden&&!this.framesUnwatched&&!this.hostCompilesInline}noteScopedWarm(e){if(this.idleDepth>0)this.idleEntries.add(e);if(this.calmDepth>0)this.calmAskedEntries.add(e);if(this.calmDepth>0||this.viewDepth>0||this.namedDrawDepth>0)this.continuityEntries.add(e);if(this.heldDepth>0)this.heldAskedEntries.add(e)}get heldWarmsWaitForCalm(){return this.calmOwer!==null&&!this.framesUnwatched&&(this.calmByClass||Yc.call(this))}heldTextAsk(e,t){if(t!=="warm"||e.queued===null||e.queued.drawn||!this.heldAskedEntries.has(e)||this.viewLined.has(e)||this.calmOwer===null||this.framesUnwatched||!this.parsePaced||this.pageHidden||this.heldWarmsWaitForCalm)return!1;return this.ownEntry(e,e.queued.key)}oweHeldText(e,t){this.heldForText.delete(e),this.heldTextOwed.add(e),this.oweQueuedToCalm(e,t)}get inCalmScope(){return this.calmDepth>0}get inHeldScope(){return this.heldDepth>0}enterCalm(e=!1){if(this.calmDepth+=1,e)this.heldDepth+=1}leaveCalm(e=!1){if(this.calmDepth-=1,e)this.heldDepth-=1}calmScope(e,t=!1){this.enterCalm(t);try{return e()}finally{this.leaveCalm(t)}}calmOwed(){return this.calmDepth>0&&this.heldWarmsWaitForCalm}noteAsked(e,t,r,i,n,l){this.buildLedger.set(e,{key:e,kind:t,requestedAtMs:this.wallNowMs(),issuedAtMs:null,settledAtMs:null,warm:r,lane:i,promoted:!1,drawn:n,...n?{drawnAtMs:this.wallNowMs()}:{},failed:l,stages:t==="render"?2:1,taints:[]})}oweEntryToCalm(e,t){this.calmOwedEntries.add(e),this.continuityEntries.add(e),this.calmOwer?.(`far:${t}`,()=>{if(!this.calmOwedEntries.delete(e)||e.queued===null)return e;return this.heldAskedEntries.delete(e),this.heldTextOwed.delete(e),this.warmScope(()=>this.moveQueued(e,t,js),"late"),e})}namedDrawScope(e){this.namedDrawDepth+=1;try{return e()}finally{this.namedDrawDepth-=1}}viewScope(e,t=!1){if(this.viewDepth+=1,t)this.approachDepth+=1;try{return e()}finally{if(this.viewDepth-=1,t)this.approachDepth-=1}}pictureScope(e){this.pictureDepth+=1;try{return e()}finally{this.pictureDepth-=1}}notePictureSkip(e){this.pictureDepth+=1;try{this.noteSkippedDraw(e)}finally{this.pictureDepth-=1}}noteFrameOneSkip(e){this.frameOneDepth+=1;try{this.notePictureSkip(e)}finally{this.frameOneDepth-=1}}drainFloors(){for(let e=0;e<this.floors.length;){let t=this.floors[e];if(t.queued!==null&&this.recoveredHolds(t))e+=1;else if(t.queued!==null&&(this.setLeadsFloors&&this.drainFrameOne(this.lanesReadTo(this.heldLanesFrom))||this.drawBuildWaits(!0,!0)||this.pacesForFrames&&!this.compilerRoomFree))return;else if(this.floors.splice(e,1)[0].queued!==null)this.issueQueued(t,"draw")}}get compilerRoomFree(){return(Lmy(this.device)??1-this.buildsInFlight)>0}get setLeadsFloors(){return this.pacesForFrames||this.coverHoldsPool||this.starvedWidthRides||this.pictureUnseen===!1&&this.buildsGoOneAtATime}get floorsWait(){return this.floors.some((e)=>!this.recoveredHolds(e))}frameOneScope(e){this.frameOneDepth+=1;try{return this.pictureScope(e)}finally{this.frameOneDepth-=1}}get frameOneStands(){if(this.pictureUnseen!==!1)return!0;for(let e of this.frameOneAsks){if(this.standsInFrameOne(e))return!0;this.frameOneAsks.delete(e)}return!1}standsInFrameOne(e){return e.built===null&&!e.failed&&!this.twinDraws(e)&&(e.queued===null||this.frameAsks(e.queued))}noteFrameOne(e){if(this.asksFrameOne&&this.frameOneStands){if(this.frameOneAsked=!0,e instanceof vQ&&e.built===null)this.frameOneAsks.add(e);let t=this.ledgerOf(e);if(t)t.frameOneAtMs??=this.wallNowMs();if(e instanceof vQ&&e.queued!==null&&this.pictureAsks!==0)e.queued.lease|=IQ}}inFrameOne(e){return this.ledgerOf(e)?.frameOneAtMs!==void 0}get asksFrameOne(){return this.frameOneDepth>0&&this.viewDepth===0&&this.picturePreparationDepth===0&&this.laneDepth[js]===0}handoffPictureScope(e){this.handoffDepth+=1;try{return this.pictureScope(e)}finally{this.handoffDepth-=1}}awaitBuild(e){let t=e instanceof bQ?e.twin??e.compute:e;if(t instanceof vQ)this.noteFrameRead(t,!1,!0);return e.ready}arrivingDrawScope(e,t){let r=this.arrivalLeadOpen;if(t!==void 0){this.arrivalLeadOpen=(t>0?Math.min(1,Math.round(t*1000)/1000):0);}this.enterScope(IQk);try{return e()}finally{try{this.leaveScope(IQk)}finally{this.arrivalLeadOpen=r}}}enterLead(e,t){let r=this.leadsAround.length;if(this.leadsAround.push(this.arrivalLeadOpen),t&&this.passOpenAt<0)this.passOpenAt=r;this.arrivalLeadOpen=Math.max(this.arrivalLeadOpen,(e>0?Math.min(1,Math.round(e*1000)/1000):0));return r}notePresentedEye(e){this.eye.note(e)}leaveLead(e){if(this.leadsAround.length<=e)return;if(this.arrivalLeadOpen=this.leadsAround[e],e<=this.passOpenAt)this.passOpenAt=-1;this.leadsAround.length=e}enterScope(e){if(e===OCD)this.wholeDepth+=1;else if(e===IQk)this.arrivingDrawDepth+=1,this.enterWarm(Zs);else if(e>=hkp)this.enterWarm(e-hkp)}leaveScope(e){if(e===OCD)this.wholeDepth-=1;else if(e===IQk)try{this.leaveWarm(Zs)}finally{this.arrivingDrawDepth-=1}else if(e>=hkp)this.leaveWarm(e-hkp)}preparePictureScope(e,t=!0){if(this.picturePreparationDepth+=1,t)this.arrivalPreparationDepth+=1;try{return this.pictureScope(e)}finally{if(this.picturePreparationDepth-=1,t)this.arrivalPreparationDepth-=1}}get inArrivalPreparation(){return this.arrivalPreparationDepth>0}pipelineCensus(e=!0){let t=[],r=0,i=0,n=0,l=(l,s)=>{if(l.built!==null||!l.failed&&this.owedNowhere(l))return;let o=Math.max(0,this.frameNowMs-l.firstRequestedAtMs);if(l.failed)i+=1;else if(r+=1,o>n)n=o;let a=l.failed?"parked":"pending",u=l.failed&&l.budgetsExhausted>=qs;if(e){let e={key:s,state:a,forMs:o,attempts:l.attempts,deterministic:u,build:this.buildStateOf(s,l)};t.push(e)}else t.push({key:s,state:a,forMs:o,attempts:l.attempts,deterministic:u})};return this.renderPipelines.forEach(l),this.computePipelines.forEach(l),t.sort(((e,t)=>t.forMs-e.forMs)),{entries:t,pending:r,parked:i,oldestPendingMs:n,settled:this.settledBuildCount}}beginFrame(e){this.framesBegunCount+=1;let t=e??this.wallNowMs();if(this.lastBeginMs!==null&&t>this.lastBeginMs)this.frameMinMs=Math.min(this.frameMinMs*1.02,t-this.lastBeginMs);if(this.lastBeginMs=t,this.parseRoomTaken=!1,this.runVerdictSeen!==Es||this.keyVerdictSeen!==Cs)this.refuseConvictedBuilds();if(this.frameMinMs!==1/0)this.parseRoomSpentMs=Math.min(4*this.frameMinMs*this.wholeShare,this.parseRoomSpentMs+this.frameMinMs*this.wholeShare);this.drainWholeOwed();X_F:{let e=this;let t=Ck.get(e)?.value;let r=(EL);if(!t||t.seen===r)break X_F;t.seen=r;for(let e of t.named.keys()){let r=t.askers.get(e);if(!r)t.named.delete(e);else if(NL(r))t.askers.delete(e),t.seen=-1}}if(this.pictureLine.length>0)this.drainWarmQueue();let r=this.pacesForFrames&&this.warmFramePaced&&(this.skippedDrawCount>0||this.arrivingDrawCount>0);if(this.lastFrameDrawsWait=r,r)this.issueAwaitedOnFreeHelpers();if(this.skippedDrawCount=0,this.arrivingDrawCount=0,this.frameArrivingRequestedCount=0,JrI(this.framePendingPicturePipelines),JrI(this.framePresentedPicturePipelines),JrI(this.frameArrivingPipelines),JrI(this.frameStoodIn),JrI(this.frameHeldByContributor),JrI(this.frameHeldHandleContributor),this.frameUnresolvedPictureSkips=0,JrI(this.frameTextureWaits),e!==void 0)this.frameNowMs=e;if(this.frameBuildText=0,this.frameViewBuilds=0,this.frameNowMs>=this.nextRetryAtMs)this.openRetryWindows();if(this.recentModules.size>0&&this.wallNowMs()>this.firstGraceEndsAtMs)this.letGoModulesPastTheGrace(this.wallNowMs())}openRetryWindows(){let e=1/0;for(let t of this.retryingEntries)if(!t.failed||t.retryAtMs===1/0||this.frameNowMs>=t.retryAtMs)this.retryingEntries.delete(t);else e=Math.min(e,t.retryAtMs);this.nextRetryAtMs=e,this.answerMoves+=1}issueViewBuilds(){let e=0,t=0;while(e<this.viewLine.length&&!this.recoveredHoldStands&&!this.parseNeedsFrame&&!this.viewWaits()){let r=this.viewLine[e];if(!r.pending()){e+=1;continue}if(this.poolFull(!0))break;e+=1,this.frameViewBuilds+=1,t+=1,r.issue()}if(e>0)ed.call(this,e);return t}getRenderPipeline(e,t,r){if(r?.peelCull&&!this.peelPipelinesByBaseKey.has(e)){if(this.renderPipelines.has(e))throw Error(`lume: peelCull must be declared on the first request for '${e}'`);this.peelPipelinesByBaseKey.set(e,{baseKey:e,mode:"pending",source:null})}let i=r?.floor;if(typeof i==="function"&&!this.renderPipelines.has(e))i();let n=p8O(r?.standIn),l=this.standingTwin(n),s=l!==null,o=(l?.built??null)!==null,a=r?.standInCosts===!0,u=a&&o&&this.standInCostDrawn(),d=this.standLane(r?.samePicture===!0,n,a,u,l);this.noteKeyWords(e,r);let f;if(s)this.enterWarm(d);this.askUnits=r?.sourceCodeUnits??null,this.askTwinBuilt=a&&o;let c=this.noteKeyTaints(e);try{f=this.standingEntry(this.renderPipelines,e)??this.request(this.renderPipelines,"render",e,this.renderBuilder(e,t,r))}finally{if(this.askUnits=null,this.askTwinBuilt=!1,s)this.leaveWarm(d)}if(n.length>0){this.standInKeys.set(f,Fqb(this.standInKeys.get(f),n));}if(r?.samePicture)this.samePictureEntries.add(f);if(r?.paced)this.pacedEntries.add(f);if(a)this.standInCostEntries.add(f);if(u)this.noteStandInCost(f,e);if(o&&this.idleDepth===0)this.idleEntries.delete(f);if(this.noteFrameOne(f),this.notePlaceOwn(f),this.noteKeyTaints(e),c)this.ledgerKeyTaints(e,this.keyTaints(e));if(!f.failed&&r?.declaredTwin!==void 0)this.askTwinOf(this.twinsByKey.get(e));if(hO(f)){if(!s)this.notePending(f);else if(!o&&l!==null)this.askAgain(l),this.notePending(l);else if(!r?.samePicture){this.enterWarm(d);try{this.notePending(f,f,o)}finally{this.leaveWarm(d)}}}if(r?.floor!==void 0)this.floorOf.set(f,r.floor);return this.notePassAsk(f,r?.passStandsIn),this.askFloor(f),f}getThingPipeline(e,t,r){return this.getRenderPipeline(e,t,r)}askFloor(e,t=!1){let r=this.floorOf.get(e);if(r===void 0||e.queued===null&&!t)return;let i=!this.probing&&(this.warmDepth===0||this.arrivalLeadOpen!==gQ&&this.isDrawnAsk()||this.currentLane()===Zs&&!this.speculationWaitsForReads);if(r===!0){if(!i||this.viewDepth>0||!t&&this.builtTwin(this.standInKeys.get(e))!==null)return;if(!this.floors.includes(e))this.floors.push(e);this.drainFloors()}else if(i){let t=r instanceof vQ?r:r();if(t instanceof vQ)this.floorOf.set(e,t),this.askFloor(t)}}standingEntry(e,t){let r=e.get(t);if(r===void 0||r.failed&&this.retryOpens(r,t))return;return this.relaneOnAsk(r,t),r}renderBuilder(e,t,r){let i=MMU(),n=(()=>S1x(i,()=>yQ(t,e)));if(r?.watchdogLane!==void 0)this.watchdogLaneByKey.set(e,r.watchdogLane);let l=rs.test(e)?void 0:this.materialWatchdogLanes.get(eK.exec(e)?.[0]??"");if(l!==void 0)this.keyTaints(e).add(`${eLY}:${l}`);if(r?.sourceCodeUnits!==void 0)this.compileSpeed.noteChars(e,r.sourceCodeUnits);if(r?.frontFaces&&(nd(r)))throw Error(`lume: '${e}' asks a front-faced twin beside a cover, see-through, liquid, data or sample companion`);let s=r?.frontFaces?this.linkFrontFaces(e,n):null,o=null,a=(function(){let e=o??n();return o=null,e}),u=r?.cover,d=r?.through,f=r?.throughCover,c=r?.liquid,h=r?.materialData,p=r?.sampleFeedback,m=r?.lookPlane,g=r?.depthArm,y=u===void 0&&d===void 0&&f===void 0&&c===void 0&&h===void 0&&p===void 0&&m===void 0&&g===void 0?(()=>s!==null?s.builds(s.made()):this.buildRenderPipeline(e,a())):rd.call(this,a,u,i,e,d,f,g,h,p,m,c),v=r?.declaredTwin,w=s===null?y:this.gatedSource(s.link,y);if(v!==void 0){{w=sd.call(this,v,e,i,w)}}if(typeof t==="function")this.descriptorAhead.set(w,s?.ahead??(function(){o??=n()}));return w}gatedSource(e,t){return function(){if(e.gate.settled)e.gate=YO();let r=e.gate,i=t();return r.issued=!0,i.then(()=>r.settle(!0),()=>r.settle(!1)),i}}askTwinOf(e){if(e===void 0)return;if(e.entry!==null&&!e.entry.withdrawn)return;uO=e,e.entry=this.idleScope(this.askTwin)}linkFrontFaces(e,t){let r=null,i=function(){if(r===null){let{value:e,taints:i}=zSP(t);return r={descriptor:e,taints:i},e}for(let e of r.taints)zRC(e);return r.descriptor},n=oaQ(e),l={key:n,of:e,descriptor:()=>({...i(),label:n,primitive:XQ}),entry:null,gate:YO()};return this.frontFacesByKey.set(e,l),{link:l,made:i,builds:(t)=>{let r=this.buildRenderPipeline(e,t);return r.then((t)=>{if(this.frontFacesByKey.get(e)===l)this.frontFacesBySource.set(t,l)},function(){return}),r},ahead:function(){if(r===null)i()}}}askCoverCompanion(e,t){let r=this.coverCompanionsBySource.get(e);if(r===void 0)return null;let i=r.handle;if(i!==null&&(HGz(i)!==null||!i.failed))return i;return Bd.call(this,r,t);}askCoverCompanionOf(e,t,r,i){let n="companion"in r?r.companion.key:`${e}|ground-cover`;this.armsAsked.add(n);let l="companion"in r?r.companion.handle():this.getRenderPipeline(n,()=>i(this.device,this,t(),r,n));return this.companionKeepsBaseTurn(e,n),l}coverCompanionAskedOf(e){return this.armsAsked.has(`${e}|ground-cover`)}companionKeepsBaseTurn(a,b){return $c0P($c0C(189),o58.prototype,"companionKeepsBaseTurn").call(this,a,b)}resolveThroughTwin(e){return this.askThroughTwin(e)?.pipeline??null}warmThroughTwin(e){let t=this.askThroughTwin(e);if(t!==null)this.notePlaceOwn(t)}askThroughTwin(e){let t=this.throughTwinsBySource.get(e);if(t===void 0)return null;if(t.entry===null)this.armsAsked.add(t.key);return this.lateEntry(t)}lateEntry(a){return $c0P($c0C(190),o58.prototype,"lateEntry").call(this,a)}resolveThroughCover(e,t){let r=this.throughCoversBySource.get(e);if(r===void 0)return null;let i=this.lateEntry(r);if(t&&hO(i))this.notePictureSkip(i);return i.pipeline??(i.failed||!t&&this.stillOwedToCalm(i)?null:"building")}liquidTwinOf(a){return $c0P($c0C(191),o58.prototype,"liquidTwinOf").call(this,a)}linkBuilt(e,t,r){e.then((e)=>t.set(e,r),function(){return})}materialDataTwinOf(e){return this.materialDataTwinsBySource.get(e)??null}depthArmTwinOf(e){let t=this.depthArmsBySource.get(e);if(t===void 0)return null;return this.drawable(this.twinHandle(t))}sampleFeedbackTwinOf(e,t){let r=this.sampleTwinsBySource.get(e);if(r?.samples!==t)return null;return this.twinHandle(r,"arriving")}lookPlaneTwinOf(e){let t=this.lookPlaneTwinsBySource.get(e);if(t===void 0||t.handle===null&&this.compilesCostFrames)return null;return this.twinHandle(t)}twinHandle(e,t="late"){return e.handle??=this.warmScope(()=>this.getRenderPipeline(e.key,e.descriptor),t)}hasSampleFeedbackTwin(e){return this.sampleTwinsBySource.has(e)}hasFrontFaces(e){return this.frontFacesBySource.has(e)}frontFacesOf(e){let t=this.frontFacesBySource.get(e);if(t===void 0)return e;let r=t.entry;if(r===null||r.failed){{r=Gd.call(this,t,r)}}if(r.pipeline!==null)return r.pipeline;return r.failed?e:null}anotherSourceBuilt(e){let t=this.standingDeclarer(e);if(t===null)return Promise.resolve(!1);if(!t.issued)return Promise.resolve(!0);return t.built.then((t)=>t||this.anotherSourceBuilt(e))}standingDeclarer(e){for(let t of this.twinsByKey.values())if(t.key===e&&(!t.gate.settled||t.gate.stood))return t.gate;return null}twinLeft(e){let t=new oQ(`${MQ}: ${e.key}`),r=this.renderPipelines.get(e.key);if(r!==void 0&&r===e.entry)this.withdrawEntry(e.key,r,t),this.readinessRevision+=1;return Promise.reject(t)}forgetKey(e){this.renderPipelines.delete(e),this.computePipelines.delete(e),this.buildLedger.delete(e),this.buildTaintsByKey.delete(e)}emptyLines(){this.viewLine=[],this.drawsOwed.length=0,this.wholeOwed.length=0,this.pictureLine.length=0}parsePaid(){this.parseNeedsFrame=!1,this.parseAnsweredThrough=null}withdrawEntry(e,t,r){t.failed=!0,t.withdrawn=!0,t.retryAtMs=1/0,t.readyPromise=$Q(r),this.forgetKey(e)}resolveCoverPipeline(e){let t=this.coverCompanionsBySource.get(e);if(t===void 0)return e;return t.handle?.pipeline??null}coverOverrideOf(a,b){return $c0P($c0C(192),o58.prototype,"coverOverrideOf").call(this,a,b)}standingTwin(e=[]){let t=this.builtTwin(e);if(t!==null)return t;for(let t=0;t<e.length;t+=1){let r=this.renderPipelines.get(e[t]);if(r!==void 0&&!r.failed&&this.floorOf.get(r)!==!0)return r}return null}builtTwin(e=[],t=!1){for(let r=0;r<e.length;r+=1){let i=this.renderPipelines.get(e[r]);if(i!==void 0&&!i.failed&&i.built!==null&&(!t||!Ks||this.paceLets(i,i.built,!0)))return i}return null}paceLets(e,t,r){if(!this.pacedEntries.has(e)||this.paceDrawn.has(e))return!0;if(e===this.paceTurnEntry){if(l4(t)!==void 0||!this.paceTurnPassed())return!0;this.paceGiveUp()}if(!r||!this.paceTurnOpen())return!1;if(e===this.paceYielded&&uhx()===this.paceYieldFrame)return!1;return this.paceTurnEntry=e,this.paceTurnPipeline=t,this.paceTurnFrame=uhx(),this.paceTurns+=1,this.paceLastTurnMs=this.frameNowMs,!0}paceTurnOpen(){let e=this.paceTurnEntry;if(e===null||this.paceTurnPipeline===null)return!0;let t=l4(this.paceTurnPipeline);if(t===void 0){if(!this.paceTurnPassed())return!1;return this.paceGiveUp(),!0}if(!sB(this.device,t))return!1;return this.paceDrawn.add(e),this.paceTurnEntry=null,this.paceTurnPipeline=null,!0}paceTurnPassed(){return uhx()>=this.paceTurnFrame+2}paceGiveUp(){this.paceYielded=this.paceTurnEntry,this.paceYieldFrame=uhx(),this.paceTurnEntry=null,this.paceTurnPipeline=null}paces(e){let t=this.renderPipelines.get(e);return t!==void 0&&this.pacedEntries.has(t)}pacedDraw(e,t,r){let i=r?null:this.builtTwin(t,!0);if(i!==null)return i.pipeline;if(r){for(let e of t??[]){let t=this.renderPipelines.get(e);if(t!==void 0&&!t.failed&&t.built!==null&&this.paceLets(t,t.built,!1))return t.built}return null}if(e instanceof vQ)this.askFloor(e,!0);this.enterWarm(Zs);try{this.notePending(void 0,e)}finally{this.leaveWarm(Zs)}return null}standLane(e,t,r,i,n){if(i||!e||t.length===0)return Zs;if(r)return Hd.call(this,n);let l=this.renderPipelines.get(t[0]);return l!==void 0&&!l.failed&&(l.built!==null||this.floorOf.get(l)!==!0)?js:Zs}drawable(e,t=!1){let r=t?HGz(e):e.pipeline;if(r!==null&&(!Ks||this.paceLets(e,r,!t)))return r;let i=this.standInKeys.get(e);if(Ks&&(r!==null||this.builtTwin(i)!==null))return this.pacedDraw(e,i,t);let n=this.standingTwin(i)??(e instanceof vQ&&!t?(this.askFloor(e,!0),this.standingTwin(i)):null);return(t?n?.built:n?.pipeline)??null}resolvePeelPipeline(a){return $c0P($c0C(193),o58.prototype,"resolvePeelPipeline").call(this,a)}pendingPeelPipelines(e){let t=[],r=[],i=this.deviceEpoch,n=this.sessionCloses;if(this.warmScope(()=>{for(let i of e){let e=this.peelPipelinesBySource.get(i);if(e?.mode!=="variant")continue;this.warmScope(()=>{e.entry=this.request(this.renderPipelines,"render",e.variantKey,()=>this.buildRenderPipeline(e.variantKey,e.descriptor()))},"late");let n=this.waitAsks(e.entry,!0);if(n!==null)t.push(n.then(function(){return},function(t){r.push(`'${e.variantKey}' failed to build (${t0U(t)})`)}))}},"late"),t.length===0)return null;return(async()=>{if(await Promise.all(t),this.deviceEpoch!==i)throw Error("lume: postcard peel pipelines changed while capture waited: the device's pipelines were cleared");if(this.sessionCloses!==n)throw Error(`lume: postcard peel pipelines changed while capture waited: ${cQ}`);if(r.length>0)throw new RLQ(`lume: postcard peel pipeline ${r[0]}${r.length>1?`, and ${r.length-1} more`:""}`)})()}peekRenderHandle(e){return this.renderPipelines.get(e)}peekComputeHandle(e){return this.computePipelines.get(e)}peekRenderPipeline(e){return this.renderPipelines.get(e)?.built??null}keyOf(e){return this.entryKeys.get(e)??null}parkWord(e){let t=this.entryKeys.get(e),r=this.entryAt(t);if(r===void 0||r!==e||!r.failed)return null;return r.lastError??null}getKernelPipeline(e,t,r){let i=r?.fragmentForm;if(i===void 0)return this.getComputePipeline(e,t,r);let n=this.computePipelines.get(e),l=n===void 0?void 0:this.kernelHandles.get(n);if(l!==void 0&&l.twin!==null){Id.call(this,e,t,l);return l}let s=this.getComputePipeline(e,t,r),o=this.computePipelines.get(e);if(o===void 0||o!==s)return s;let a=this.kernelHandles.get(o);if(a===void 0)a=new bQ(o,i),this.kernelHandles.set(o,a),this.entryKeys.set(a,e);if(xs(o))this.askFragmentForm(a,e);return a}askFragmentForm(a,b){return $c0P($c0C(194),o58.prototype,"askFragmentForm").call(this,a,b)}getComputePipeline(e,t,r){this.noteKeyWords(e,r),this.askUnits=r?.sourceCodeUnits??null;let i;try{i=this.standingEntry(this.computePipelines,e)??this.request(this.computePipelines,"compute",e,this.computeBuilder(e,t))}finally{this.askUnits=null}if(this.noteFrameOne(i),this.notePlaceOwn(i),this.noteKeyTaints(e),hO(i))this.notePending(void 0,i);return this.notePassAsk(i),i}notePassAsk(e,t){if(this.passOpenAt>=0)this.passEntries.set(e,t)}effectAsk(e){return this.effectEntries.has(e)||this.effectKeys.has(this.entryKeys.get(e)??"")}askRank(e,t=!1){if(!(e instanceof vQ))return 4;let r=this.floorOf.get(e),i=this.twinDraws(e)||r instanceof vQ&&r.built!==null||bs.has(e)&&!as.has(e);if(!t&&e.queued?.drawn!==!0&&!this.lookHolds(e)&&!(i&&e.firstStoodInAtMs>=0))return 4;if(this.effectAsk(e))return 3;if(this.passEntries.has(e))return this.passEntries.get(e)?.()===!1?0:1;return i?2:0}noteKeyWords(e,t){if(t?.effect)this.effectKeys.add(e);if(t?.watchdogSmaller!==void 0)this.watchdogSmallerByKey.set(e,t.watchdogSmaller);if(t?.watchdogMargin)this.watchdogMarginKeys.add(e);if(t?.watchdogFloor)this.watchdogFloorKeys.add(e);if(t?.bodyProgram)this.bodyProgramKeys.add(e)}computeBuilder(e,t){let r=MMU();let i=(()=>S1x(r,()=>yQ(t,e)));let n=null;let l=()=>{let v$10;{let e=n??i();let t=rV(e.compute,"compute");v$10=t===e.compute?e:{...e,compute:t};}let t=v$10;n=null;let r=this.buildLedger.get(e)?.calls?.last;let l=this.noteBuildChars(e,t.compute?.module,Us(t.compute?.entryPoint),void 0,[]);let s=this.keptPastWatchdog(e,l);if(s!==null)return Promise.reject(s);let o=e3([t.compute?.module])||void 0;if(os(e,o))return Promise.reject(Error(Bg7));let a=O3(rTO(this.device,t,((t)=>this.callDevice(e,r,()=>this.device.createComputePipelineAsync(HK(t,e)))),this.preparationOptions(r)),[t.compute?.module]);if(o!==void 0)a.then((e)=>aK(e,o),function(){return});return a};if(typeof t==="function")this.descriptorAhead.set(l,function(){n??=i()});return l}noteKeyTaints(e){if(!(SL.size>0||LL!==null&&oL===e))return!1;let t=this.keyTaints(e);kQD(t,e);this.ledgerKeyTaints(e,t);return !0}keyTaints(e){return jCw(this.buildTaintsByKey,e)}ledgerKeyTaints(e,t){let r=this.buildLedger.get(e);if(r!==void 0&&r.taints.length!==t.size)r.taints=[...t]}withKeyTaints(e,t){return NAN(t,((t)=>{let r=this.keyTaints(e);for(let e of t)r.add(e);this.ledgerKeyTaints(e,r)}))}idleScope(e){this.idleDepth+=1;try{return this.warmScope(e,"late")}finally{this.idleDepth-=1}}warmScope(e,t="picture"){let r=fsR.indexOf(t);this.enterWarm(r);try{return e()}finally{this.leaveWarm(r)}}enterWarm(e){this.warmDepth+=1,RQ+=1,this.laneDepth[e]+=1}leaveWarm(e){if(this.warmDepth-=1,RQ-=1,this.laneDepth[e]-=1,this.warmDepth===0&&this.drainOwed)this.drainOwed=!1,this.drainWarmQueue()}finishedPictureWaitsFor(e){return(!e.warm||e.promoted||e.lane!=="late")&&!e.idle&&!this.owesNoDevice(e.key)}finishedPictureTouchMs(){let e=-1/0;for(let t of this.buildLedger.values()){if(!this.finishedPictureWaitsFor(t))continue;if(t.settledAtMs===null&&!t.failed)return null;e=Math.max(e,t.requestedAtMs,t.settledAtMs??-1/0)}return e}pictureLaneKey(e){return this.buildLedger.get(e)?.lane==="picture"}pipelineBuildLedger(){return[...this.buildLedger.values()].sort(((e,t)=>e.requestedAtMs-t.requestedAtMs))}buildsInFlightCensus(){let e=[];for(let[t,r]of this.keyBuilds)if(r.inFlight>0)e.push({key:t,inFlight:r.inFlight,answeredAtMs:e3w(r.answeredAtMs)?r.answeredAtMs:null});return{draw:this.drawBuildsInFlight,warm:this.warmBuildsInFlight,arriving:this.laneBuildsInFlight[Zs],device:this.deviceBuilds.inFlight,settled:this.settledBuildCount,keys:e,debt:{owedMs:Math.max(0,this.playerFramesOwedMs()),setMs:this.lastBuildHoldMs,heldFrames:this.heldFramesAnswered,heldMs:this.heldFramesMs}}}parsePacingCensus(){return{paced:this.parsePaced,owed:this.parseNeedsFrame,drawsOwed:this.owedDrawsQueued(),receipts:this.playableReceipts,textsParsed:this.textsParsed,parsedAhead:this.parsedAhead}}getBindGroupLayout(e,t){let r=this.bindGroupLayoutNode(e),i=r.value;if(i!==null)return i;let n=this.device.createBindGroupLayout({label:t??`lume bgl ${this.bindGroupLayoutCount}`,entries:[...e]});{let e=n,t=this.device;wE.set(e,t)}r.value=n;this.bindGroupLayoutCount+=1;return n}emptyBindGroup(){return this.emptyBindGroupValue??=this.device.createBindGroup({label:"lume empty",layout:this.getBindGroupLayout([],"lume empty"),entries:[]}),this.emptyBindGroupValue}getBindGroup(e,t=!1){let r=Lqb(e.entries);let i=this.bindGroupNode(e.layout,r);let n=i.value;if(n!==null)return n.bindGroup;return this.mintBindGroup(e,r,i,t)}bindGroupRefused(e){return this.bindGroupsRefused>0&&this.refusedBindGroups.has(e)}setBindGroupRefusalSink(e){this.bindGroupRefusalSink=e}mintBindGroup(e,t,r,i){let n=this.device,l=i&&typeof n.pushErrorScope==="function"&&typeof n.popErrorScope==="function";if(l)n.pushErrorScope("validation");let s;try{s=n.createBindGroup(t===e.entries?e:{...e,entries:t})}finally{if(l)n.popErrorScope().then((r)=>{if(r!==null&&s!==void 0)this.judgeBindGroup(s,e.label??"",t,r.message)},ks)}let o={bindGroup:s,node:r,cancelRetirement:null};return r.value=o,this.bindGroupEntries.add(o),this.bindGroupsMinted+=1,o.cancelRetirement=this.resourceLease?.onRetire(s,()=>this.evictBindGroup(o))??null,s}judgeBindGroup(a,b,c,d){return $c0P($c0C(195),o58.prototype,"judgeBindGroup").call(this,a,b,c,d)}refuseBindGroup(e,t,r,i){if(this.refusedBindGroups.has(e))return;this.refusedBindGroups.add(e),this.bindGroupsRefused+=1,this.bindGroupRefusalSink?.({label:t,message:r,own:i})}onRetire(e,t){return this.resourceLease?.onRetire(e,t)??ys}bindGroupCensus(){return{live:this.bindGroupEntries.size,minted:this.bindGroupsMinted}}preparationOptions(e){return{now:()=>this.wallNowMs(),lane:()=>e?.lane??Xs,note:function(t){if(e!==void 0)e.preparation=t},skipped:(function(t){if(e!==void 0)e.helperSkipped=t}),state:function(t){if(e!==void 0)e.state=t},parsed:(e)=>this.noteParse(e),handed:function(t){if(e!==void 0)e.handed=t}}}callDevice(e,t,r){let i={enteredAtMs:this.wallNowMs(),returnedAtMs:null,threw:!0,behind:this.atDevice.size};if(this.atDevice.size===0)this.openBuildShare();if(t!==void 0)t.deviceCall=i,this.atDevice.add(t),this.markDeviceAhead(i,this.judgeOrdinals.get(t));try{let n=r();if(i.threw=!1,t!==void 0){let r=(()=>this.noteDevicePhase(e,t,this.wallNowMs()));n.then(r,r)}return n}catch(r){Ld.call(this,t,e);throw r}finally{i.returnedAtMs=this.wallNowMs()}}buildRenderPipeline(e,t){let r=this.buildLedger.get(e);if(r)r.stages="vertex"in t?t.fragment===void 0?1:2:1;let i=t.vertex;let n=this.noteBuildChars(e,i?.module,Us(i?.entryPoint),t.fragment?.module,Us(t.fragment?.entryPoint));let l=this.keptPastWatchdog(e,n);if(l!==null)return Promise.reject(l);let s=e3([i?.module,t.fragment?.module])||void 0;if(os(e,s))return Promise.reject(Error(Bg7));let o=this.ensurePeelPipeline(e,t);let a=r?.calls?.last;let u=Oy2(t);let d=(()=>O3(Ewz(this.device,u,((t)=>this.callDevice(e,a,()=>this.device.createRenderPipelineAsync(HK(t,e)))),this.preparationOptions(a)),[t.vertex?.module,t.fragment?.module]));let f=this.afterStageTwin(e,u,a,d);if(s!==void 0)f.then((e)=>aK(e,s),function(){return});if(yp(t)){f.then((function(e){{if(yp(t))Lp.add(e)}}),function(){return});}let v$8;{let e$11=t;{let e=e$11;let t=e.depthStencil;v$8=t?.format===jEz&&t.depthWriteEnabled===!1;}}if(v$8)f.then(Hd2,function(){return});if((t.primitive?.cullMode==="back"))f.then(_ps,function(){return});f.then(((e)=>Z9V(e,t.layout)),function(){return});if((e.startsWith("primitives/lane"))){let e=t.vertex===void 0?null:this.shaderTextOf(t.vertex.module),r=e===null||e.includes("vertex_index"),i={colour:Array.from(t.fragment?.targets??[],(e)=>e?.format??null),depth:t.depthStencil?.format??null,depthCompare:t.depthStencil?.depthCompare??null,samples:t.multisample?.count??1};f.then((e)=>o5t(e,r,i),function(){return})}if(Jd2(t))f.then(Kd2,function(){return});if(o!==void 0)f.then((t)=>{if(this.peelPipelinesByBaseKey.get(e)!==o)return;o.source=t,this.peelPipelinesBySource.set(t,o)},function(){return});return f}afterStageTwin(e,t,r,i){if(Lmy(this.device)!==null)return i();let n=Cy6(t,(e)=>this.bindGroupObjectId(e));if(n===null)return i();let l=this.stagesBuilding.get(n),s={atMs:null},o=(()=>{return s.atMs=this.wallNowMs(),i()}),a;if(l===void 0||2*this.twinSpans.ownMs>this.twinSpans.siblingMs)a=o();else{let e={key:l.key,sinceMs:this.wallNowMs(),releasedAtMs:null};{a=Qd.call(this,r,e,l,o,a)}}return Sd.call(this,e,a,s,n);}ensurePeelPipeline(e,t){let r=this.peelPipelinesByBaseKey.get(e);if(r?.mode!=="pending")return r;let i=t.primitive?.topology??"triangle-list";if(i!=="triangle-list"&&i!=="triangle-strip"){Ud(e,i);}let n=t.primitive?.cullMode??"none",l;if(n==="back")l={baseKey:e,mode:"source",source:null};else if(n==="front")l={baseKey:e,mode:"skip",source:null};else{let r=`${e}|postcard-peel-cull-back`;{l=Zd.call(this,l,e,r,t)}}return this.peelPipelinesByBaseKey.set(e,l),l}rideLine(a,b,c){return $c0P($c0C(196),o58.prototype,"rideLine").call(this,a,b,c)}warm(e,t=!1){let r=[];return this.warmScope(()=>{for(let i of e){let e=i.kind==="render"?this.getRenderPipeline(i.key,i.descriptor,nO(i)):this.getComputePipeline(i.key,i.descriptor);r.push(t?this.awaitBuild(e):e.ready)}}),Promise.allSettled(r).then(JO)}clear(){for(let e of this.warmQueues)e.length=0;let e=this.outsideDrops;this.outsideDrops=mnS(e);for(let t of e)t();this.cancelHiddenTurn(),this.poolBuildsStanding=Math.max(0,this.poolBuildsStanding-this.restHeld.length),this.restHeld.splice(0).forEach(Zqb),this.emptyLines(),this.laneBuildsInFlight.fill(0),this.warmBuildsInFlight=0,this.outsideBuildsInFlight=0,this.drawBuildsInFlight=0,this.keysInFlight=mnS(this.keysInFlight),this.warmFramePaced=!1,this.warmFrameDebt=!1,this.settleOwesFrame=!1,this.parsePaid(),this.playOpened=!1,this.parseAnswerOwed=!1,this.parseAnswerTicket+=1,JrI(this.framePendingPicturePipelines),JrI(this.framePresentedPicturePipelines),JrI(this.latePictureHandles),this.frameUnresolvedPictureSkips=0,JrI(this.frameTextureWaits),this.deviceEpoch+=1,this.restartClimbGeneration(null),this.submitJudge.deviceReset();for(let e of this.renderPipelines.keys())this.dropOnePipelineEntry(e);for(let e of this.computePipelines.keys())this.dropOnePipelineEntry(e);this.peelPipelinesByBaseKey=mnS(this.peelPipelinesByBaseKey);this.peelPipelinesBySource=new WeakMap;this.coverCompanionsBySource=new WeakMap;this.throughTwinsBySource=new WeakMap;this.throughCoversBySource=new WeakMap;this.liquidTwinsBySource=new WeakMap;this.materialDataTwinsBySource=new WeakMap;this.depthArmsBySource=new WeakMap;this.sampleTwinsBySource=new WeakMap;this.lookPlaneTwinsBySource=new WeakMap;this.twinsByKey=mnS(this.twinsByKey);this.frontFacesBySource=new WeakMap;this.frontFacesByKey=mnS(this.frontFacesByKey);this.bindGroupLayoutTrie=Gs(null,void 0);this.bindGroupLayoutCount=0;E9V(this.device);for(let e of this.bindGroupEntries)this.evictBindGroup(e);this.bindGroupTrie=Gs(null,void 0),this.parkedPipelineCount=0,JrI(this.retryingEntries),this.nextRetryAtMs=1/0,this.buildLedger=mnS(this.buildLedger),JrI(this.buildTaintsByKey),this.withdrawnValues=mnS(this.withdrawnValues),this.answerMoves+=1,this.chainMoves+=1}get generation(){let e=this.foldSessionRecord(),t=(this.geometryMoves??=yLr(this.device)).count;if(t!==this.geometryMovesSeen)this.geometryMovesSeen=t,this.answerMoves+=1;return DQ(this.answerMoves,e)}get chainGeneration(){return DQ(this.chainMoves,this.foldSessionRecord())}async answered(e,t){let r=e;for(;;){if(r.pipeline!==null)return r;if(await r.ready.catch(()=>null),r.pipeline!==null||!r.withdrawn)return r;let e=t();if(e.withdrawn)return e;r=e}}foldSessionRecord(){let e=MMU();if(e===this.sessionRecord)return this.sessionOrdinal;return _d.call(this,e);}materialIdentity(e,t){let r=this.materialIdentityTrie;for(let t of e)r=wQ(r,typeof t==="string"?t:this.bindGroupObjectId(t));if(r.value===null){if(r.value=`${fs}${++this.nextMaterialIdentity}`,t!==void 0)this.materialLabels.set(r.value,t);this.materialNames.set(r.value,`${fs}~${xzz(e.filter(HGI).join(`
`)).toString(36)}`)}return r.value}materialLabelOf(e){return this.materialLabels.get(e)}coverCompanionAsked(e){let t=this.coverCompanionsBySource.get(e);return t!==void 0&&(t.handle!==null||this.coverCompanionAskedOf(t.baseKey))}throughTwinAsked(e){return(this.throughTwinsBySource.get(e)?.entry??null)!==null}entryAt(e){return e===void 0?void 0:this.renderPipelines.get(e)??this.computePipelines.get(e)}dropOnePipelineEntry(e){let t=this.entryAt(e);if(!t)return;this.forgetKey(e);let r=t.queued;if(r!==null)t.queued=null,r.reject(new oQ(`lume: pipeline '${e}' was released before its build was issued`));if(t.failed)this.parkedPipelineCount=Math.max(0,this.parkedPipelineCount-1);if(hO(t))t.failed=!0,t.withdrawn=!0,t.retryAtMs=1/0}bindGroupNode(e,t){let r=wQ(this.bindGroupTrie,this.bindGroupObjectId(e));let i;FQ:{let e$45=t;{let e=e$45;for(let t=1;t<e.length;t+=1){if(e[t].binding<e[t-1].binding){{i=yqb(e);break FQ;}}}i=e;}}for(let e=0;e<i.length;e+=1){let t=i[e];r=wQ(r,t.binding);let n=t.resource;if("buffer"in n)r=wQ(r,-this.bindGroupObjectId(n.buffer)),r=wQ(r,n.offset??0),r=wQ(r,n.size??-1);else r=wQ(r,this.bindGroupObjectId(n))}return r}bindGroupLayoutNode(e){let t=this.bindGroupLayoutTrie;let r;FQ$:{for(let t=1;t<e.length;t+=1){if(e[t].binding<e[t-1].binding){{r=yqb(e);break FQ$;}}}r=e;}for(let e=0;e<r.length;e+=1){let i=r[e];if(t=wQ(t,i.binding),t=wQ(t,i.visibility),i.buffer)t=wQ(t,pQ),t=wQ(t,i.buffer.type),t=wQ(t,i.buffer.hasDynamicOffset),t=wQ(t,i.buffer.minBindingSize);else if(i.sampler)t=wQ(t,gs),t=wQ(t,i.sampler.type);else if(i.texture)t=wQ(t,cs),t=wQ(t,i.texture.sampleType),t=wQ(t,i.texture.viewDimension),t=wQ(t,i.texture.multisampled);else if(i.storageTexture)t=wQ(t,hQ),t=wQ(t,i.storageTexture.access),t=wQ(t,i.storageTexture.format),t=wQ(t,i.storageTexture.viewDimension);else t=wQ(t,xQ)}return t}bindGroupObjectId(e){let t=this.bindGroupObjectIds.get(e);if(t!==void 0)return t;let r=this.nextBindGroupObjectId;return this.nextBindGroupObjectId+=1,this.bindGroupObjectIds.set(e,r),r}evictBindGroup(a){return $c0P($c0C(197),o58.prototype,"evictBindGroup").call(this,a)}wallNowMs(){return this.options.now?this.options.now():this.frameNowMs}request(e,t,r,i){let n=e.get(r);if(n){ae.call(this,n,r,i);return n}let l=zQ(r);if(l!==null)return this.refusedEntry(e,t,r,l);if(t==="compute"&&(NcM()!==null&&U9$()))return this.refusedEntry(e,t,r,PE);if(this.drops!==null&&!this.isDraw()&&!this.isDrawnAsk()&&this.drops(r))return this.droppedHandle(r);let s=!this.isDraw();if(s&&this.calmOwed()){return be.call(this,r,t,e,i);}if(s){let n=this.askedLane(r),l=this.isDrawnAsk(),s=this.queuedEntry(e,r,i,n,l);return this.noteScopedWarm(s),this.noteAsked(r,t,!0,fsR[n]??"picture",l,!1),this.enqueueWarm(s,n),this.drainWarmQueue(),s}if(this.noteAsked(r,t,!1,"picture",!1,!1),this.softwareFirst&&this.frameOneDepth===0){let t=this.queuedEntry(e,r,i,js,!0);return this.enqueueWarm(t,js),t}if(this.pictureLined){return ce.call(this,e,r,i);}if(this.recoveredHoldStands&&this.recoveredAdmits?.(r)!==!0||this.drawBuildWaits(this.asksFrameOne)){let t=this.queuedEntry(e,r,i,Ns,!0);return this.oweDrawsBuild(t),t}return de.call(this,e,r,i);}relaneOnAsk(e,t){if(e.queued===null){if(hO(e)&&this.isDraw()){let e=this.buildLedger.get(t),r=e?.calls?.last;if(e!==void 0&&r?.settledAtMs===null&&r.lane!==Xs)ee.call(this,e,r);}return}if(e.queuedLane===Ns)this.leadAsked(e);if(e.queuedLane<0)return;if(this.claimForWorld(e),this.heldDepth===0&&!this.isDraw())this.heldAskedEntries.delete(e);let r=this.noteContinuityAsk(e);if(this.isDraw())this.notePromoted(t),this.issueForDraw(e);else if(!this.calmOwed()&&!(this.heldDepth>0&&this.heldTextOwed.has(e))){let r=this.askedLane(t);if(this.heldTextOwed.delete(e))this.calmOwedEntries.delete(e),this.moveQueued(e,t,r);else if(r<e.queuedLane)this.moveQueued(e,t,r);else if(!e.queued.drawn&&this.isDrawnAsk()||this.arrivalLeadOpen!==gQ&&e.queued.drawn&&e.queuedLane===Zs&&this.noteLead(e))this.noteDrawn(e,t)}if(r)this.drainWarmQueue()}noteContinuityAsk(e){if(this.isDraw()||this.calmDepth===0&&this.viewDepth===0&&this.namedDrawDepth===0||this.continuityEntries.has(e))return!1;return this.continuityEntries.add(e),!0}claimForWorld(e){if(this.transientNow()||this.contributor===null&&!this.isDrawnAsk()&&!this.isDraw()||!this.effectEntries.delete(e))return;fe.call(this,e);}requeue(e,t){let r=this.warmQueues[e.queuedLane],i=r.findIndex((t)=>t.entry===e);if(i<0)return!1;let n=r.splice(i,1)[0];return r.splice(t(r),0,n),!0}viewWaits(){return this.frameViewBuilds>0&&this.frameBuildText>=tQ}issueForDraw(e){if(e.queued===null||e.queuedLane<0)return;if(this.pictureLined){this.lineUp(e),this.drainWarmQueue();return}if(this.recoveredHolds(e,!0)||(!this.queueRests&&this.ledgerOf(e)?.idle?this.idleBuildWaits:this.drawBuildWaits(this.asksFrameOne||this.inFrameOne(e)))){this.markDrawn(e.queued),e.queuedLane=Ns,this.oweDrawsBuild(e);return}{if((ea=ge.call(this,e))!==ca)return ea}}refusedEntry(e,t,r,i){let n=Error(`${i}: ${r}`),l=new vQ(this,$Q(n),this.frameNowMs);return Os(l,n),e.set(r,l),this.entryKeys.set(l,r),this.noteAsked(r,t,!this.isDraw(),"picture",!1,!0),this.parkedPipelineCount+=1,this.readinessRevision+=1,this.moveVerdictFamily(r,i),l}moveVerdictFamily(e,t){if(t===MHF||t===Bg7)NO.move(e,this.watchdogFamilyOf(e))}retryOpens(e,t){return this.frameNowMs>=e.retryAtMs||e.refused===!0&&this.refusalOf(e,t)===null}refusalOf(e,t){if(e.lastError?.startsWith(ns))return zQ(t)??ns;if(e.lastError?.startsWith(Bg7)&&(BQ.has(t)||BQ.has(icW(t))))return Bg7;return zQ(t)??((NcM()!==null&&U9$())&&this.computePipelines.get(t)===e?PE:null)}rekickParked(a,b,c){return $c0P($c0C(198),o58.prototype,"rekickParked").call(this,a,b,c)}refuseInPlace(e,t,r){let i=e.queued,n=Error(`${r}: ${t}`);if(e.queued=null,e.built=null,e.readyPromise=$Q(n),!e.failed)this.parkedPipelineCount+=1;Os(e,n);let l=this.buildLedger.get(t);if(l)l.failed=!0;this.readinessRevision+=1,i?.reject(n),this.moveVerdictFamily(t,r)}refuseConvictedBuilds(){this.runVerdictSeen=Es,this.keyVerdictSeen=Cs;for(let e of[this.renderPipelines,this.computePipelines])for(let[t,r]of e){let e=r.failed?null:zQ(t)??(os(t,this.buildLedger.get(t)?.textHash)?Bg7:null);if(e!==null)this.refuseInPlace(r,t,e)}}refuseEveryCompute(a,b){return $c0P($c0C(199),o58.prototype,"refuseEveryCompute").call(this,a,b)}queuedEntry(e,t,r,i,n){let{ready:l,queued:s}=this.queuedBuild(t,r,n),o=new vQ(this,l,this.frameNowMs,s,i);return o.watchesUse=!0,e.set(t,o),this.entryKeys.set(o,t),this.kickBuild(o,t,l),o}queuedBuild(e,t,r){let i,n=new Promise((function(e,t){i={resolve:e,reject:t}})),l={key:e,create:t,resolve:i.resolve,reject:i.reject,drawn:r,drawnAtMs:r?this.wallNowMs():null,lease:r?this.pictureAsks:0,frameLease:r?this.framesBegunCount:-1/0};return{ready:n,queued:l}}lineForView(e){if(this.viewLined.has(e))return;this.viewLined.add(e),this.viewLine.push({entry:e,pending:()=>e.queued!==null,issue:()=>this.issueQueued(e,"draw")})}noteDrawn(e,t,r=!1){if(e.queued===null)return;if(this.transientNow())this.effectEntries.add(e);if(this.markDrawn(e.queued,this.buildLedger.get(t)),this.requeue(e,(t)=>this.drawnInsertAt(t,e,e.queuedLane,r)))this.drainWarmQueue()}drawnInsertAt(e,t,r,i){if(this.arrivalLeadOpen!==gQ&&r===Zs)this.noteLead(t);if(this.effectAsk(t))return e.length;let n=this.arrivalLeads.get(t);if(n!==void 0)return this.leadsEndAt(e,n.share);return i?this.costlyStandInsEndAt(e):this.speculationStartsAt(e)}effectsStartAt(e){return GQ(e,(e)=>this.effectAsk(e.entry))}noteLead(e){let t=this.askTwinBuilt||this.standInCostEntries.has(e)&&this.twinDraws(e)?0:this.arrivalLeadOpen;if(this.leadShareOf(e)>=t)return!1;let r={share:t,atMs:this.wallNowMs()};this.arrivalLeads.set(e,r);let i=e.queued===null?void 0:this.buildLedger.get(e.queued.key);if(i)i.lead={...r};return!0}leadsEndAt(e,t){return GQ(e,(e)=>{if(!e.drawn()||this.effectAsk(e.entry))return!0;let r=this.arrivalLeads.get(e.entry);if(r===void 0)return!0;return r.share<t})}leadShareOf(e){return this.arrivalLeads.get(e)?.share??gQ}twinDraws(e){let t=this.standInKeys.get(e);return t!==void 0&&this.builtTwin(t)!==null}speculationStartsAt(e){return GQ(e,(e)=>!e.drawn()||this.effectAsk(e.entry))}yieldStaleCostlyLeads(e){let t=this.warmQueues[e],r=this.leadsEndAt(t,0),i=r;while(i<t.length&&t[i].drawn()&&this.standInCostEntries.has(t[i].entry))i+=1;let n=this.staleLeads,l=this.keptLeads;n.length=0,l.length=0;for(let e=r;e<i;e++)if(!this.costlyAskedNow(t[e].entry))n.push(t[e]);if(n.length===0)return;he.call(this,t,n,l,e);}costlyStandInsEndAt(e){let t=this.leadsEndAt(e,0);return GQ(e,(e,r)=>r>=t&&(!e.drawn()||this.effectAsk(e.entry)||!this.standInCostEntries.has(e.entry)||!this.costlyAskedNow(e.entry)))}describeBuild(e){let t=this.entryKeys.get(e),r=this.entryAt(t);if(t===void 0||r===void 0||r!==e)return{state:"unknown"};return this.buildStateOf(t,r)}buildStateOf(e,t){if(t.built!==null)return{state:"built"};if(t.failed)return this.refusedBuildState(t);let r=this.wallNowMs(),i=this.buildLedger.get(e),n=this.pacesForFrames,l=t.queued===null||!this.viewLined.has(t)?-1:this.viewLine.findIndex((e)=>e.entry===t),s=l>=0&&t.queuedLane!==Ns&&!this.warmWaits((e)=>e.entry===t),o=s?null:this.drainHold?.sinceMs??null;if(t.queued!==null){return{state:"queued",lane:fsR[t.queuedLane]??"picture",ahead:s?ie.call(this,l):this.buildsAheadOf(t),sinceMs:Math.max(0,r-(i?.requestedAtMs??r)),hold:s?("a portal view's builds wait for the next frame's text allowance"):this.queuedHold(t.queuedLane),heldForMs:o===null?null:Math.max(0,r-o),oneThread:n};}return{state:"at-device",sinceMs:Math.max(0,r-(i?.issuedAtMs??i?.requestedAtMs??r)),oneThread:n}}queuedHold(e){if(e===Ns)return this.parseNeedsFrame?us:Ys;if(e===_s)return null;return this.drainHold?.reason??null}refusedBuildState(a){return $c0P($c0C(200),o58.prototype,"refusedBuildState").call(this,a)}buildsAheadOf(e){if(e.queuedLane===_s)return this.pictureLine.findIndex((t)=>t===e);let t=0;if(e.queuedLane===Ns){for(let r of this.drawsOwed){if(r===e)return t;if(SQ(r))t+=1}return t}for(let r=0;r<=e.queuedLane;r+=1)for(let i of this.warmQueues[r]){if(i.entry===e)return t;if(i.pending())t+=1}return t}issue(e,t,r,i=0,n=!1){if(this.framesRestUnderBuilds&&this.frameOnQueue)return n&&!this.recoveredRests?null:this.holdForRest(e,t,r,i);return this.issueAtDevice(e,t,r,i,n)}issueAtDevice(e,t,r,i,n){let l=this.buildLedger.get(e),s=l?.issuedAtMs??null,o=l?.calls,a=this.warmFrameDebt,u=this.wallNowMs(),d={ordinal:(l?.calls?.count??0)+1,issuedAtMs:u,lane:r==="draw"||this.issuingForLook?Xs:i,createReturnedAtMs:null,createThrew:!1,deviceCall:null,settledAtMs:null,outcome:"pending"};if(l)l.issuedAtMs??=u,l.calls={count:d.ordinal,first:l.calls?.first??d,last:d};let f=this.pageHidden;if(f)this.hiddenBuilds.inFlight+=1;this.deviceBuilds.inFlight+=1,this.descriptorAhead.delete(t),this.poolBuildsStanding+=1;let c=l?.idle===!0;if(!c){if(this.buildsInFlight===0)this.restartClimbGeneration(u);else this.climbFromMs??=u;this.book(e,r,i,1)}let h=this.submitJudge.buildIssued(u,e);this.judgeOrdinals.set(d,h);let p=this.deviceEpoch;let m=cqb(e);let g=null;let y=null;let v=this.textsParsed;let w=wGv(this.device);let b=this.refusingFreshText;let k=rQ;this.refusingFreshText=n,rQ=l===void 0?-1:Math.max(0,u-l.requestedAtMs);try{g=this.withKeyTaints(e,(()=>{{let e$15=this.device,t$14=n,r$7=t;{let e=e$15,t=t$14,r=r$7;let i=i3.get(e);if(i===void 0||i.refusing===t)return r();i.refusing=t;try{return r()}finally{i.refusing=!t}}}}))}catch(e){if(n&&e instanceof Tb)y=e;else d.createThrew=!0,g=Promise.reject(e)}finally{if(this.refusingFreshText=b,rQ=k,d.createReturnedAtMs=this.wallNowMs(),l)l.parsed=(l.parsed??0)+this.parsedSince(v,w)}if(g===null){if(m!==null){HQ(m);}return this.withdrawIssue({key:e,record:l,issuedAtMs:s,calls:o,hidden:f,lane:r,warmLane:i,warmFrameDebt:a,ordinal:h,idle:c}),y}if(c)this.idleBuildsStanding+=1;let x=()=>{if(c=!0,this.idleBuildsStanding+=1,p===this.deviceEpoch)this.book(e,r,i,-1)};if(!c)this.inBooks.set(e,x);if(this.drainHold!==null&&this.drainHold.sinceMs!==null)this.drainHold.sinceMs=u;let M=this.buildSourceOf(e);if(M!==null)this.sourceTurns.set(M.script,{turn:++this.sourceTurnCount,identity:M.identity});let S=Ms(this.keyBuilds,e);S.inFlight+=1;let I=(t)=>{if(d.settledAtMs=this.wallNowMs(),d.outcome=t,this.settledBuildCount+=1,this.submitJudge.buildSettled(h,d.settledAtMs),f)WQ(this.hiddenBuilds,d.settledAtMs);if(WQ(this.deviceBuilds,d.settledAtMs),this.inBooks.get(e)===x)this.inBooks.delete(e);if(c)this.idleBuildsStanding-=1;WQ(S,d.settledAtMs);if(m!==null){HQ(m);}if(this.poolBuildsStanding=Math.max(0,this.poolBuildsStanding-1),this.poolSlots?.settle(),p!==this.deviceEpoch)return;if(this.frameStandsBetweenBuilds)this.settleOwesFrame=!0,this.settleFenceFloor=this.fencesArmed;if(c)return;let n=this.buildsInFlight;if(this.book(e,r,i,-1),this.climbAtSettle(n,d.settledAtMs),!this.lineOwes)this.options.onLineDrained?.()};return g.then((()=>I("fulfilled")),()=>I("rejected")),g}holdForRest(e,t,r,i){return this.poolBuildsStanding+=1,this.book(e,r,i,1),new Promise((n,l)=>{this.restHeld.push({key:e,lane:r,warmLane:i,call:()=>{this.issue(e,t,r,i).then(n,l)},drop:l})})}book(e,t,r,i){let n=(this.keysInFlight.get(e)??0)+i;if(n>0)this.keysInFlight.set(e,n);else this.keysInFlight.delete(e);if(t==="draw")this.drawBuildsInFlight=Math.max(0,this.drawBuildsInFlight+i);else{if(i>0||this.laneBuildsInFlight[r]>0)this.laneBuildsInFlight[r]+=i,this.warmBuildsInFlight+=i;if(i>0&&this.warmFramePaced&&!this.pageHidden)this.warmFrameDebt=!0;if(e.startsWith(zs))this.outsideBuildsInFlight=Math.max(0,this.outsideBuildsInFlight+i)}}withdrawIssue(e){if(e.record!==void 0)e.record.issuedAtMs=e.issuedAtMs,e.record.calls=e.calls;if(e.hidden)this.hiddenBuilds.inFlight-=1;if(this.deviceBuilds.inFlight-=1,this.poolBuildsStanding-=1,this.poolSlots?.settle(),this.submitJudge.buildWithdrawn(e.ordinal),e.idle)return;this.book(e.key,e.lane,e.warmLane,-1),this.warmFrameDebt=e.warmFrameDebt}markDeviceAhead(e,t){let r=this.device;if(typeof r.pushErrorScope!=="function"||typeof r.popErrorScope!=="function"||this.submitJudge.isDecided&&!this.submitJudge.verdict)return;if(e.aheadSettledAtMs=null,t!==void 0)this.submitJudge.buildAwaitsReach(t);r.pushErrorScope("out-of-memory");let i=()=>{if(e.aheadSettledAtMs=this.wallNowMs(),t!==void 0)this.submitJudge.buildReached(t,e.aheadSettledAtMs)};r.popErrorScope().then(i,i)}noteBuildChars(e,t,r,i,n){let l=t===void 0?void 0:(l3.get(t));let s=i===void 0||i===t?void 0:(l3.get(i));let o=(l?.chars??0)+(s?.chars??0);let a=o===0?void 0:this.buildLedger.get(e);if(a)a.text={chars:o,loops:(l?.loops??0)+(s?.loops??0),samples:(l?.samples??0)+(s?.samples??0)},a.textHash=e3([t,i]);if(this.compileSpeed.room===null)return o===0?void 0:o;let u=i===t?sQ(r,n):r;let d=(t===void 0?0:W3(t,u)??0)+(i===void 0||i===t?0:W3(i,n)??0);if(d===0)return this.compileSpeed.charsOf(e);return this.compileSpeed.noteChars(e,d,this.buildLedger.get(e)?.kind),d}keptPastWatchdog(e,t){if(t===void 0||this.compileSpeed.room===null)return null;let r=this.watchdogSmallerOf(e),i=r!==void 0&&!this.watchdogFloorKeys.has(e)||this.watchdogMarginKeys.has(e)||RaL(e),n=this.buildLedger.get(e)?.kind,l=this.compileSpeed.pastRoom(t,i,n);if(l===null)return null;let s=i?ke():"";return Error(`${XcY} (${(l/1000).toFixed(1)} s read for its ${t} characters at ${this.compileSpeed.msPerChar(n).toFixed(3)} ms a character${s}; the watchdog is ${((this.compileSpeed.room??0)/1000).toFixed(0)} s): ${e}; ${r===void 0?le():ne(r)}`)}watchdogFamilyOf(e){let t=this.watchdogLaneByKey.get(e);return{taints:[...this.buildTaintsByKey.get(e)??[]],...t!==void 0?{smallerLane:t}:{}}}watchdogSmallerOf(a){return $c0P($c0C(201),o58.prototype,"watchdogSmallerOf").call(this,a)}noteMaterialWatchdogLane(e,t){this.materialWatchdogLanes.set(e,t)}noteDevicePhase(e,t,r){let i=t.deviceCall;if(i===null||!this.atDevice.delete(t))return;let n=r-Math.max(i.aheadSettledAtMs??i.enteredAtMs,this.deviceSettledAtMs);i.ownMs=n;let l=Math.max(0,n);if(!this.pageHidden&&this.pageHiddenEdgeAtMs<=r-n){this.shownShares.add(i),this.compileSpeed.noteHold(e,n,r),this.compileSum.shownBuilds+=1,this.compileSum.shownMs+=l;let t=this.buildLedger.get(e)?.text;if(t)this.compileSum.shownPastPriceMs+=l-Ls-qQ*t.chars}if(this.compileSum.builds+=1,this.compileSum.ms+=l,e.startsWith("models/character/"))this.compileSum.characterMs+=l;else if(e.startsWith("models/static/"))this.compileSum.staticMs+=l;if(this.deviceSettledAtMs=Math.max(this.deviceSettledAtMs,r),!this.buildsBlockSubmits)return;if(this.lastBuildHoldMs=this.pageHidden||this.framesUnwatched||this.coverHidesPoolFrames||this.queueRestsUnderBuilds&&!this.picturePlayed?0:l,this.buildHoldProofThrough=0,this.lastBuildHoldMs>0&&this.heldFramesAnswered===this.shareHeldFrom&&this.fencesArmed>this.shareFencesFrom)if(this.fenceSettledThrough>=this.fencesArmed)this.lastBuildHoldMs=0;else this.buildHoldProofThrough=this.fencesArmed;else this.lastBuildHoldMs=Math.max(0,this.lastBuildHoldMs-this.shareRanMs);if(this.openBuildShare(),n<=TEE)return;let s=this.coldCensus,o=t.preparation,a=t.helperSkipped??o?.outcome??"no-helper";s.count+=1;s.deviceMs+=n;s.byHelper[a]=(s.byHelper[a]??0)+1;s.latest.push({key:e,deviceMs:n,behind:i.behind,helper:a,helperMs:Ds(o)});if(s.latest.length>Ps)s.latest.shift();if(a==="prepared"){this.options.onColdAfterHelper?.({key:e,deviceMs:n,helperMs:Ds(o),helper:o?.recipe?.fields??null,helperError:o?.recipeError??null,handed:t.handed??null,ownFromMs:r-n,settledAtMs:r})}}outstandingBuilds(){let e=0;this.readPass(()=>{for(let t of this.warmQueues)for(let r of t)if(r.entry instanceof vQ&&this.readyToIssue(r))e+=1});for(let t of this.viewLine)if(t.pending())e+=1;return this.buildsInFlight-this.outsideBuildsInFlight+e+this.owedDrawsQueued()+this.pictureLine.length}owedDrawsQueued(){return this.drawsOwed.filter((e)=>this.owedStands(e)).length}lineWaits(){return this.pictureLine.length>0||this.drawsOwed.some((e)=>this.owedStands(e))}enqueueWarm(e,t){let r=this.warmQueues[t],i={entry:e,pending:(()=>e.queued!==null&&e.queuedLane===t),waiting:()=>e.queuedLane===t?e.queued:null,drawn:(()=>e.queued?.drawn===!0),issue:(()=>this.issueQueued(e,"warm")),issueParsed:()=>this.issueQueuedParsed(e,"warm")};if(this.transientNow())this.effectEntries.add(e);if(e.queued?.drawn)r.splice(this.drawnInsertAt(r,e,t,this.standInCostEntries.has(e)&&this.costlyAskedNow(e)),0,i);else r.splice(this.effectAsk(e)?r.length:this.effectsStartAt(r),0,i)}notePromoted(e){let t=this.buildLedger.get(e);if(t===void 0)return;t.promoted=!0,t.moved={atMs:this.wallNowMs(),from:t.lane,to:"draw"},t.drawnAtMs??=t.moved.atMs}moveQueued(e,t,r){e.queuedLane=r;let i=this.buildLedger.get(t);if(i){let e=fsR[r]??"picture";i.moved={atMs:this.wallNowMs(),from:i.lane,to:e},i.lane=e}if(e.queued!==null&&this.isDrawnAsk())this.markDrawn(e.queued,i);this.enqueueWarm(e,r),this.drainWarmQueue()}markDrawn(e,t){if(e.drawn=!0,e.drawnAtMs??=this.wallNowMs(),this.stampFrame(e),t)t.drawn=!0,t.drawnAtMs??=this.wallNowMs()}leaseHeld(e){let t=e instanceof vQ?e.queued:null;return t!==null&&(t.lease!==0||this.frameAsks(t)||this.placeOwnHas(e)&&this.liftKeeps(e)||this.lastVisitDrew(e))}frameAsks(e){return e.frameLease>=this.framesBegunCount-1}leaseOf(e){return e instanceof vQ?e.queued?.lease??0:0}stampFrame(e){e.frameLease=this.framesBegunCount,e.lease|=this.pictureAsks}issueQueued(e,t){let r=e.queued;if(r===null)return;let i=this.refusalOf(e,r.key);if(i!==null)return this.refuseInPlace(e,r.key,i);let n=this.heldTextAsk(e,t);this.markSpeculation(e,r.key,t),e.queued=null;let l=this.issue(r.key,r.create,t,e.queuedLane,n);if(l===null||l instanceof Tb)return e.queued=r,this.oweHeldText(e,r.key);this.arrivalLeads.delete(e),this.kickBuild(e,r.key,l),l.then(r.resolve,r.reject)}issueQueuedParsed(e,t){let r=e.queued;if(r===null)return!1;let i=this.refusalOf(e,r.key);if(i!==null)return this.heldForText.delete(e),this.refuseInPlace(e,r.key,i),!0;let n=this.leadShareOf(e),l=this.heldForText.get(e),s=this.askRank(e)*4-n;if(s>this.textHeldOrder||l!==void 0&&!l())return this.holdForText(s);if(!fwc())return!1;let a;{a=oe.call(this,e,r,t)}if(a===null||a instanceof Tb){return pe.call(this,e,r,t,a,s);}return qe.call(this,e,r,a);}holdForText(e){return this.textHeldOrder=Math.min(this.textHeldOrder,e),!1}poolFull(e,t=!1){if(this.frameHolds)return!0;let r=this.admittedPoolWidth;if(r===void 0||this.pacesForFrames)return!1;if(this.buildsInFlight>=r)return!0;let i=t?null:this.coverLeavesWidth;if(i!==null&&(this.buildsBehindTheLift()>=i||this.frameOneSetBuilds))return!0;return!this.poolSlotFree(e)}poolSlotFree(e){let t=this.poolSlots;if(t===null||t.held>this.poolBuildsStanding)return!0;if(!e)return!1;return!t.ask()||this.poolBuildsStanding===0}warmBuildsWait(e=fsR.length){for(let t=0;t<e;t+=1)if(this.warmQueues[t].length>0)return!0;return!1}get linesRest(){return this.drawsOwed.length===0&&this.wholeOwed.length===0&&this.pictureLine.length===0&&this.floors.length===0&&!this.warmBuildsWait()}drainLines(){this.drainOwedDraws(),this.drainWarmQueue()}poolCeilingWords(){return`the GPU process's pool keeps a thread for the browser (${this.buildsInFlight} build(s) in flight of ${this.poolInflightMax??"no ceiling"})`}drainOwedDraws(){if(this.drainFloors(),this.floorsWait)return!0;this.drainWholeOwed(),this.rankDepth+=1,this.rankLines();try{if(this.pacesForFrames&&(this.drainFrameOne(this.lanesReadTo(this.heldLanesFrom))||this.buildsFreezeFrames&&this.buildsBehindTheLift()<this.buildsInFlight))return!0;this.drainFrameOne(this.buildsBlockSubmits?this.lanesReadTo(this.heldLanesFrom):0);let e=0;while(e<this.drawsOwed.length){let t=this.drawsOwed[e];if(!SQ(t))this.drawsOwed.splice(e,1);else if(!this.owedStands(t))e+=1;else if((t.queued.lease&jQ)===0&&this.playerFramesHeld())this.notePassed(t.queued.key,"f"),e+=1;else if(this.poolFull(!0))break;else if(this.pictureLined)this.lineUp(this.drawsOwed.splice(e,1)[0]);else if(!this.parseNeedsFrame){{ea=re.call(this,t,e);if(ea===ya)continue;}}else if(this.issueQueuedParsed(t,"draw"))se.call(this,t);else this.notePassed(t.queued.key,"p"),e+=1}return this.drainFrameOne(0),!1}finally{if(--this.rankDepth===0)this.restoreLines()}}frameBetweenWords(){return $c0P($c0C(202),o58.prototype,"frameBetweenWords").call(this)}drainFrameOne(e,t=-1){if(!this.frameOneStands)return!1;let r=this.pictureUnseen===!1;for(;;){let i=0,n=-1,l=5,s=1/0;for(let o=t;o<e;o++)(o<0?this.drawsOwed:this.warmQueues[o]).forEach((e,t)=>{let a=e instanceof vQ?e:e.entry;if(a instanceof vQ&&(e instanceof vQ?this.owedMayTake(e,!1):e.pending()&&this.roomTakes(e))&&this.inFrameOne(a)&&a.built===null&&!this.twinDraws(a)&&(!r||this.frameOneAsks.has(a)&&this.standsInFrameOne(a))){let e=a.firstRequestedAtMs<this.frameOnePassedMs?0:this.askRank(a,!0);if(e<l||e===l&&a.firstRequestedAtMs<s)[i,n,l,s]=[o,t,e,a.firstRequestedAtMs]}});if(n<0)return!1;if(!(this.pacesForFrames?this.compilerRoomFree:this.setLeadsFloors)||this.parseNeedsFrame||this.poolFull(i<0||this.warmBuildsWait(e),!0)||r&&this.drawWaitsForPlayerFrames())return!0;if(this.frameOnePassedMs=Math.max(this.frameOnePassedMs,s),i<0)this.issueQueued(this.drawsOwed.splice(n,1)[0],"draw");else if(this.issueWarm(this.warmQueues[i].splice(n,1)[0],i),this.hiddenTurnOpen)return!0}}issueLaneDrawnAskedBefore(e,t,r,i=gQ){if(this.issueLaneOfSmallerRank(e))return!0;if(!this.parsePaced||this.lateLaneHeld||this.softwareFirst||this.lookFirst||this.warmDepth>0||this.gateReads>0||this.warmIssueHeld||this.pageHidden||this.parseNeedsFrame||this.hiddenTurnOpen||(this.pacesForFrames?this.pictureLineHold()!==null:this.poolInflightMax===void 0||this.warmNeedsFrame)||t===null)return!1;let n=-1,l=null,s=Ts,o=gQ,a=e;for(let t of[Xs,Zs]){let r=this.laneDrawnTurnAtMs(t);if(r===null)continue;let i=this.laneDrawnHead(t),u=this.sourceTurnOf(i?.waiting()?.key),d=i===null?gQ:this.leadShareOf(i.entry),f=i===null?4:this.askRank(i.entry);if(f>e||l!==null&&kQ(f,d,u,r,a,o,s,l))continue;l=r,n=t,s=u,o=d,a=f}if(l===null)return!1;let u=this.laneDrawnHead(n);if(u===null)return!1;let d=t===1/0?s:this.sourceTurnOf(r);if(kQ(a,this.leadShareOf(u.entry),s,l,e,i,d,t))return!1;if(this.spendLaneTurn(n,u,l),this.warmQueues[n].shift(),this.drainHold=null,u.issue(),n===Zs)this.noteArrivingIssue();return!0}rankLines(){this.rankLine(this.drawsOwed,Rs),this.rankLine(this.pictureLine,Rs);for(let e=0;e<this.warmQueues.length;e+=1)this.rankLine(this.warmQueues[e],hs)}rankLine(e,t){for(let r=1;r<e.length;r+=1)if(this.askRank(t(e[r]))<this.askRank(t(e[r-1]))){if(!this.todayLines.has(e))this.todayLines.set(e,e.slice());return void e.sort((e,r)=>this.askRank(t(e))-this.askRank(t(r)))}}restoreLines(){for(let[e,t]of this.todayLines){let r=new Set(e),i=new Set(t),n=0;for(let l=0;l<e.length;l+=1){if(!i.has(e[l]))continue;while(n<t.length&&!r.has(t[n]))n+=1;if(n<t.length)e[l]=t[n++]}}this.todayLines=mnS(this.todayLines)}issueLaneOfSmallerRank(e){if(this.warmDepth>0||this.gateReads>0||this.hiddenTurnOpen)return!1;let t=-1,r=-1;for(let i=0;i<this.warmQueues.length;i+=1){let n=this.warmQueues[i];for(let l=0;l<n.length;l+=1){if(!n[l].pending()||!this.roomTakes(n[l]))continue;let s=this.askRank(n[l].entry);if(s<e)e=s,t=i,r=l}}if(r<0)return!1;return this.issueWarm(this.warmQueues[t].splice(r,1)[0],t),!0}notePassed(e,t){let r=this.buildLedger.get(e);if(r===void 0)return;r.passed??={f:0,p:0,l:0},r.passed[t]+=1}lineUp(e){if(e.queued!==null)this.markDrawn(e.queued);e.queuedLane=_s,this.noteOwedLead(e),this.pictureLine.splice(this.owedInsertAt(e.queued?.drawnAtMs??null,this.leadShareOf(e),_s),0,e)}drainPictureLine(){let e=this.pictureLine;for(let t=e.length-1;t>=0;t-=1){if(!this.recoveredHolds(e[t],!0))continue;te.call(this,e,t);}if(e.length===0)return!1;if(!this.pacesForFrames){ue.call(this,e);return!1}while(e.length>0){if(this.settleOwesFrame&&this.frameStandsBetweenBuilds)break;let t=this.pictureLineHold();if(t!==null){this.noteArrivingWait(`the first picture's line holds ${e.length} draw build(s): ${t}`);break}let r=this.turnAt(e,0);if(this.picturePlayed&&((e[r].queued?.lease??0)&jQ)===0&&this.playerFramesHeld()){ve.call(this,e);break}if(this.issueLaneDrawnAskedBefore(this.askRank(e[r]),e[r].queued?.drawnAtMs??null,e[r].queued?.key,this.leadShareOf(e[r])))continue;let[i]=e.splice(r,1);this.issueQueued(i,"draw")}return!0}ledgerOf(e){return this.buildLedger.get(this.entryKeys.get(e)??"")}pictureLineHold(){if(!this.compilerRoomFree)return Lmy(this.device)===null?"one build at the device":"every compile the pool admits is running";if(this.parseNeedsFrame)return"a new shader text owes a completed playable frame";if(this.warmIssueHeld)return"the picture's present owes its receipt";if(this.inPictureWindow&&this.lateLaneHeld&&this.pictureCanPresent())return"the picture can present";return null}supersedeLined(e){let t=this.entryKeys.get(e),r=this.pictureLine.find((t)=>t===e);if(t===void 0||!r?.queued)return!1;return this.withdrawQueued(t,r,MQ),this.drainWarmQueue(),!0}supersedeQueued(e,t){if(this.supersedeLined(e))return!0;let r=this.entryKeys.get(e),i=this.entryAt(r);if(r===void 0||i!==e||i.queued===null)return!1;return this.supersedeInPlace(r,i,t),this.drainWarmQueue(),!0}leaveBuilds(e){let t=[...this.renderPipelines].filter(([t,r])=>r.queued!==null&&e(t));for(let[e,r]of t)this.withdrawQueued(e,r,MQ);if(t.length>0)this.drainWarmQueue();return t.length}supersedeInPlace(a,b,c){return $c0P($c0C(203),o58.prototype,"supersedeInPlace").call(this,a,b,c)}withdrawProgramsThatLeft(){let e=(EL);if(e===this.retiredSeen)return 0;we.call(this,e);let r=0;{r=xe.call(this,r)}return r}withdrawQueued(e,t,r){let i=t.queued;if(i===null)return;let n=typeof r==="string"?new oQ(`${r}: ${e}`):r;t.queued=null,YNM(this.pictureLine,t),this.withdrawEntry(e,t,n),this.readinessRevision+=1,i.reject(n);for(let t of[this.twinsByKey,this.frontFacesByKey]){let r=t.get(e);if(r===void 0)continue;t.delete(e),r.gate.settle(!1);let i=this.renderPipelines.get(r.key);if(i!==void 0&&i===r.entry&&this.standingDeclarer(r.key)===null)this.withdrawQueued(r.key,i,MQ)}}openSession(){let e=this.playOpened||this.parseNeedsFrame||this.warmFramePaced||this.warmFrameDebt||this.settleOwesFrame;if(this.playOpened=!1,this.settleOwesFrame=!1,this.parsePaid(),this.parseAnswerOwed=!1,this.parseAnswerTicket+=1,this.warmFramePaced=!1,this.warmFrameDebt=!1,this.lateHeldForBoot){if(this.lateHeldForBoot=!1,this.heldLanesFrom===js)this.heldLanesFrom=null}if(this.holdSessionLanes(),e)this.drainWarmQueue()}closeSession(){this.sessionCloses+=1;let e=this.withdrawQueuedOf(this.renderPipelines)+this.withdrawQueuedOf(this.computePipelines),t=this.warmQueues[js].filter((e)=>!(e.entry instanceof vQ)&&e.pending());for(let e of this.warmQueues)e.length=0;if(this.warmQueues[js].push(...t),this.holdLateLaneForBoot(),this.emptyLines(),this.drainHold=null,this.arrivingWaitSinceMs=null,e>0)this.answerMoves+=1;return e}withdrawQueuedOf(e){let t=0;for(let[r,i]of[...e]){if(i.queued===null)continue;this.withdrawQueued(r,i,cQ),t+=1}return t}holdLateLaneForBoot(){if(this.lateLaneHeld)return;this.heldLanesFrom=js,this.lateHeldForBoot=!0}holdSessionLanes(){if(this.heldLanesFrom===null)this.heldLanesFrom=this.pacesForFrames?Zs:js}enterPictureWindow(){this.inPictureWindow=!0,this.openArrivingLane()}leavePictureWindow(){if(this.pictureAsks!==0){this.pictureAsks=0;for(let e of[this.renderPipelines,this.computePipelines])for(let t of e.values())if(t.queued!==null)t.queued.lease&=~(ps|IQ)}if(this.openArrivingLane(),!this.inPictureWindow)return;this.inPictureWindow=!1,this.pictureReadyGate=null,this.drainWarmQueue()}setPictureReadyGate(e){this.pictureReadyGate=e}pictureCanPresent(){let e=this.pictureReadyGate;if(e===null||this.gateReads>0)return!1;this.gateReads+=1;try{return e()===!0}finally{this.gateReads-=1}}notePageHidden(e){if(this.pageHidden===e)return;if(this.pageHidden=e,this.pageHiddenEdgeAtMs=this.wallNowMs(),!e){this.cancelHiddenTurn(),this.drainWarmQueue();return}this.parsePaid(),this.warmFrameDebt=!1,this.drainWarmQueue()}noteHiddenBootPace(e){if(this.hiddenBootPace===e)return;if(this.hiddenBootPace=e,e)this.cancelHiddenTurn();this.drainWarmQueue()}holdHiddenDrain(e){if(this.hiddenDrainHeld===e)return;if(this.hiddenDrainHeld=e,e)this.cancelHiddenTurn();else this.drainWarmQueue()}armHiddenTurn(){if(this.hiddenTurn!==null||this.deviceGone||this.hiddenBootPace||this.hiddenDrainHeld||this.buildsInFlight>0||!this.warmWaits())return;this.hiddenTurn=setTimeout(this.runHiddenTurn,0)}cancelHiddenTurn(){if(this.hiddenTurn===null)return;clearTimeout(this.hiddenTurn),this.hiddenTurn=null}holdWarmIssue(e){if(this.warmIssueHold===e)return;if(this.warmIssueHold=e,!e)this.drainWarmQueue()}notePlayableFrameCompleted(){this.playOpened=!0;let e=this.parseAnswerOwed&&this.parsePaced;if(e)this.parseAnswerOwed=!1;let t=!this.picturePlayed;if(this.playableReceipts+=1,t&&!this.pictureUnseen)this.poolSlots?.fit();let r=this.settleOwesFrame&&(this.fencesArmed===0||this.fenceSettledThrough>this.settleFenceFloor);if(r)this.settleOwesFrame=!1;if(this.parseNeedsFrame&&this.fencesArmed>0&&this.fenceSettledThrough<=this.parseFenceFloor){if(r)this.drainLines();return}let i=this.parseNeedsFrame;if(this.parsePaid(),!this.linesRest)this.drainOwedDraws();if(!this.pacesForFrames){if(i||e||r||t)this.drainWarmQueue();return}if(this.takeFramePace(),!this.warmNeedsFrame)this.drainWarmQueue()}takeFramePace(){this.warmFramePaced=!0,this.warmFrameDebt=!this.pageHidden&&this.buildsInFlight>0}issueParsedFromLane(e,t=!1){let r=this.warmQueues[e],i=!1;for(let e=this.firstReadyAt(r);e>=0;e=this.firstReadyAt(r,()=>!0,e+1)){let n=r[e];if(t&&i)return!1;i=!0,this.issuingForLook=this.lookFirst&&this.standsDrawn(n);let l;try{l=n.issueParsed()}finally{this.issuingForLook=!1}if(!l)continue;return r.splice(e,1),this.drainHold=null,!0}return!1}drawnWarmQueued(){for(let e=0;e<fsR.length;e++){let t=this.warmQueues[e];for(let e=0;e<t.length;e++){let r=t[e];if(!r.pending())continue;if(r.drawn())return!0;break}}return!1}get awaitingPlayableFrame(){if(this.pictureAwaitsFrame)return!0;return(this.warmNeedsFrame||this.parseNeedsFrame)&&this.warmWaits()}get pictureAwaitsFrame(){if(this.parseNeedsFrame&&this.lineWaits())return!0;return(this.warmNeedsFrame||this.parseNeedsFrame)&&this.drawnWarmQueued()}setArrivingRidesBeforeWorld(e){if(this.arrivingRidesBeforeWorld===e)return;ye.call(this,e);}narrowPool(e){if(!(e>=1)||this.poolInflightMax!==void 0&&this.poolInflightMax<=e)return;this.poolInflightMax=Math.floor(e)}widenPool(e){let t=this.poolInflightMax;if(t===void 0||!(e>t))return;this.poolInflightMax=e3w(e)?Math.floor(e):e,this.drainLines()}get poolWidth(){return this.poolInflightMax}get admittedPoolWidth(){let e=this.poolInflightMax;return e===void 0?void 0:Math.min(e,this.starvedPoolWidth??e,this.climbBinds?this.climbWidth:e)}setSoftwareFirst(e){if(this.softwareFirst===e)return;if(this.softwareFirst=e,e){this.heldLanesFrom=Zs;return}this.openArrivingLane()}openArrivingLane(){if(this.softwareFirst||this.heldLanesFrom!==Zs)return;this.heldLanesFrom=js,this.drainWarmQueue()}releaseLateLane(){if(this.softwareFirst||this.heldLanesFrom===null)return;this.heldLanesFrom=null,this.drainWarmQueue()}get picturePlayed(){return this.playableReceipts>0}get playHasOpened(){return this.playOpened}get pictureSeen(){return!this.pictureUnseen}compilerHold(){if(!this.playOpened)return"play";if(this.lateLaneHeld)return"lanes";if(this.buildStands)return"compiler";if(this.lineWaits()||this.wholeOwed.length>0)return"line";for(let e=0;e<this.viewLine.length;e++)if(this.viewLine[e].pending())return"line";for(let e=0;e<fsR.length;e++){let t=this.warmQueues[e];for(let r=0;r<t.length;r++){let i=t[r];if(!i.pending()||!(this.standsDrawn(i)&&(!i.drawn()||this.leaseHeld(i.entry))||this.leaseOf(i.entry)&IQ))continue;return this.idleWarm=i,this.idleWarmLane=e,"warm"}}return this.drawHold(!0)}drawHold(e,t=!1){if(this.parseNeedsFrame)return"parse";return ze.call(this,e,t);}takeIdleTurn(){if(this.idleTurnFrame===this.framesBegunCount||dHc(this.queueRests))return!1;let e=this.pictureSeen?this.compilerHold():"unseen",t=this.idleTurns;if(e!==null){if(this.idleWaitFrame!==this.framesBegunCount){this.idleWaitFrame=this.framesBegunCount,t.holds[e]+=1;let r=this.wallNowMs();if(t.waitSinceMs??=r,r-(t.rowAtMs??t.waitSinceMs)>=As){Ae.call(this,t,r,e);}}return!1}return Be.call(this,t);}idleWarmWords(){let e=this.idleWarm;if(e===null)return"";let t=e.entry,r=this.drawHold(!1)??"nothing";return` ('${this.entryKeys.get(t)}' in the ${fsR[this.idleWarmLane]} lane: drawn ${e.drawn()}, ask stands ${this.leaseHeld(t)}, frame one ${this.inFrameOne(t)}, look first ${this.lookFirst}, waits for a read ${this.waitsForFrameRead(e)}; a draw waits on ${r})`}promoteInIdleTurn(e){let t=this.entryKeys.get(e),r=this.queueRests;if(t!==void 0&&r&&mO.keys().includes(t)&&e instanceof vQ&&e.queued)return this.heldForText.delete(e),this.refuseInPlace(e,t,ns);let i=this.buildLedger.get(t??"");if(i)i.idle=!0;this.inBooks.get(t??"")?.();this.inBooks.delete(t??"");this.promoteToDraw(e,void 0,!0);if(r){this.restStanding=e;DS(!0);}let n=()=>{if(r)this.restStanding=null;DS(!1)};e.ready.then(n,n)}get lateLaneHeld(){return this.heldLanesFrom!==null}holdForLook(e,t=QQ){this.lookHeld=e?t:null,this.firstForHolds(e)}placeOwnScope(e){this.placeOwnDepth+=1;try{return e()}finally{this.placeOwnDepth-=1}}get inPlaceOwnScope(){return this.placeOwnDepth>0}closePlaceOwn(){this.placeOwnEntries=mnS(this.placeOwnEntries)}notePlaceOwn(e){if(this.placeOwnDepth===0||e.built!==null||e.failed)return;Ce.call(this,e);}liftJoiners(){if(!this.buildsOnPresentThread||this.compileSpeed.room===null)return[];let e=new Set;for(let t of this.placeOwnEntries){let r=hO(t)?this.entryKeys.get(t):void 0;if(r===void 0)this.placeOwnEntries.delete(t);else if(!this.stillOwedToCalm(t))e.add(r)}for(let t of this.buildLedger.values()){if(t.issuedAtMs===null||t.settledAtMs!==null||t.failed||t.text===void 0)continue;if(this.compileSpeed.pastRoom(t.text.chars,!0,t.kind)!==null)e.add(t.key)}return[...e]}keepForLift(e){this.liftKeys=new Set(e);let t=this.wallNowMs();for(let r of e){let e=this.buildLedger.get(r);if(e)e.liftAtMs??=t}if(this.liftHeld!==null&&e.length>0)this.drainWarmQueue()}holdForLift(e){if(this.liftHeld===e)return;this.liftHeld=e,this.firstForHolds(e!==null)}holdFadesForLift(e){if(this.liftFades===e)return;De.call(this,e);}firstForHolds(e){let t=this.lookFirst;if(this.lookFirst=this.lookHeld!==null||this.liftHeld!==null,this.lookFades=this.lookHeld??this.liftHeld??QQ,e||t)this.drainWarmQueue()}readyToIssue(e){return e.pending()&&!this.waitsForFrameRead(e)&&this.roomTakes(e)}roomTakes(e){if(this.recoveredHoldStands&&(!(e.entry instanceof vQ)||this.recoveredHolds(e.entry)))return!1;return e.entry instanceof vQ?!this.roomHolds(e.entry):this.memoryRoom!=="none"}roomHolds(e){return this.memoryRoom==="none"&&e.queuedLane!==Xs&&!this.leaseHeld(e)}waitsForFrameRead(e){return e.pending()&&e.entry instanceof vQ&&this.heldForRead(e.entry)}waitsForLift(e,t){return t!==Xs&&this.liftFades!==null&&!e.drawn()&&this.fadesIn(e.entry,this.liftFades)&&!this.liftKeeps(e.entry)}placeOwnHas(e){return e instanceof vQ&&this.placeOwnEntries.has(e)}owedNowhere(e){return this.stillOwedToCalm(e)||this.waitsForItsRead(e)}waitsForItsRead(e){return e.queued!==null&&(e.queuedLane>=0?this.heldForRead(e):SQ(e)&&!this.owedStands(e))}heldForRead(e){if(this.twinWaitsForLift(e)||this.recoveredHolds(e))return!0;if(!this.speculationWaitsForReads||this.leaseHeld(e))return!1;return!this.speculationFits(e)||this.idleBuildsStanding>0||this.playOpened&&!this.pictureUnseen&&this.idleWaitFrame>=this.framesBegunCount-1||this.lineWaits()||this.leasedLaneBuildWaits()}leasedLaneBuildWaits(){if(typeof this.leasedWaitsInPass==="boolean")return this.leasedWaitsInPass;let e=this.warmWaits((e)=>this.leaseHeld(e.entry));if(this.leasedWaitsInPass===null)this.leasedWaitsInPass=e;return e}warmWaits(e=()=>!0,t=0){return this.warmQueues.some((r,i)=>i>=t&&r.some((t)=>t.pending()&&e(t)))}readPass(e){if(this.leasedWaitsInPass!==void 0)return e();this.leasedWaitsInPass=null;try{return e()}finally{this.leasedWaitsInPass=void 0}}firstReadyAt(e,t=()=>!0,r=0){return this.readPass(()=>{for(let i=r;i<e.length;i+=1)if(this.readyToIssue(e[i])&&t(e[i]))return i;return-1})}markSpeculation(e,t,r){let i=this.buildLedger.get(t);if(i===void 0)return;if(i.rank=this.askRank(e),r==="warm"&&this.speculationWaitsForReads&&!this.eachBuildFreezesTheFrames&&!this.leaseHeld(e))i.idle=!0}speculationFits(e){if(this.returnLeaves(e))return!1;let t=this.entryKeys.get(e),r=this.bodyProgramKeys.has(t??"");if(this.eachBuildFreezesTheFrames)return Ee.call(this,r,e);if(this.coverStands)return!(r&&this.buildsGoOneAtATime);return!(this.speculationWaitsForDraws||this.buildsSlowFrames)||this.continuityEntries.has(e)||this.drewBeforeHas(t)}lastVisitDrew(e){return this.eachBuildFreezesTheFrames&&!this.picturePlayed&&this.drewBeforeHas(this.entryKeys.get(e))}twinWaitsForLift(e){if(this.pageHidden)return!1;let t=this.standInKeys.get(e);if(this.compilesCostFrames&&!this.framesUnwatched&&this.samePictureEntries.has(e)&&!this.standInCostEntries.has(e)){{if((ea=Fe.call(this,t))!==ca)return ea}}if(!this.coverHoldsPool||(this.poolInflightMax??1)<=1||this.pictureHeldEntries.has(e)||this.liftKeeps(e)||this.placeOwnHas(e)&&!this.samePictureEntries.has(e))return!1;let r=this.bodyProgramKeys.has(this.entryKeys.get(e)??"");if(!r&&this.samePictureEntries.has(e))return this.twinDraws(e);return(r||t!==void 0)&&this.frameOneSetBuilds}noteFrameRead(e,t,r=!1){if(t&&this.warmDepth===0)as.add(e);let i=e.queued;if(this.warmDepth>0&&!t&&!r||i===null)return;let n=!this.leaseHeld(e)&&(i.drawn||this.frameReadEntries.has(e));if(this.stampFrame(i),r)i.lease|=$s;else if(!t)i.lease|=vs;let l=this.refilling&&this.picturePlayed&&e.queuedLane>=0;if(i.drawn||this.frameReadEntries.has(e)&&!l){if(n)this.drainWarmQueue();return}let s=this.entryKeys.get(e);if(s===void 0)return;this.frameReadEntries.add(e);let o=this.buildLedger.get(s);if(o)o.readAtMs??=this.wallNowMs();if(l){this.notePromoted(s),this.issueForDraw(e);return}this.drainWarmQueue()}noteFrameUse(e){e.watchesUse=!1;let t=this.ledgerOf(e);if(t===void 0||!t.warm||t.readAtMs!==void 0||t.drawnAtMs!==void 0)return;t.usedAtMs=this.wallNowMs()}effectPassesHeldSpeculation(e){if(e[0]===void 0||this.standsDrawn(e[0]))return!1;let t=this.firstReadyAt(e,(e)=>this.effectAsk(e.entry)&&this.standsDrawn(e));return t>0&&SO(e,t)}speculationWaitsForRoom(e,t){if(t===Xs)return null;if(this.memoryRoom!=="room"&&this.memoryRoomWaits(e,t))return this.memoryRoom;if(!Ws||this.framesUnwatched||SO(e,this.firstReadyAt(e,(e)=>this.standsDrawn(e)||this.leaseHeld(e.entry))))return null;if(!this.roomDrainOwed)Ge.call(this);return"frames"}memoryRoomWaits(e,t){if(SO(e,this.firstReadyAt(e,(e)=>this.standsDrawn(e)&&(!e.drawn()||this.leaseHeld(e.entry))||this.lastVisitDrew(e.entry))))return!1;if(this.memoryRoom==="none"&&!SO(e,this.firstReadyAt(e,(e)=>!this.waitsForLift(e,t)))||this.buildsInFlight>0)return!0;if(this.slackNow||this.framesUnwatched)return!1;if(this.slackDrainOwed)return!0;return this.slackDrainOwed=!0,HO.push(()=>{this.slackDrainOwed=!1,this.slackNow=!0;try{this.drainWarmQueue()}finally{this.slackNow=!1}}),!0}frameReadLaneWaits(e,t){if(!this.recoveredHoldStands&&!this.speculationWaitsForReads&&!this.coverHoldsPool&&!this.compilesCostFrames)return!1;let r=this.lookFirst&&(t!==Xs||this.lookHeldQueuedPast(t));return!SO(e,this.firstReadyAt(e,(e)=>!this.waitsForLift(e,t)&&(!r||this.standsDrawn(e))))}laneDrawnTurnAtMs(e){let t=null;for(let r of this.warmQueues[e]){if(!r.pending())continue;if(!r.drawn()||this.effectAsk(r.entry))break;let e=r.waiting()?.drawnAtMs??null;if(e!==null&&(t===null||e<t))t=e}return t}spendLaneTurn(e,t,r){let i=t.waiting()?.drawnAtMs??null;if(i===null||i<=r)return;for(let n of this.warmQueues[e]){if(n===t||!n.pending())continue;if(!n.drawn()||this.effectAsk(n.entry))return;let e=n.waiting();if(e?.drawnAtMs!==r)continue;e.drawnAtMs=i;return}}laneDrawnHead(e){let t=this.warmQueues[e];while(t.length>0&&!t[0].pending())t.shift();this.sourceTurnIn(t);let r=t[0];return r!==void 0&&this.standsDrawn(r)?r:null}sourceTurnIn(e){let t=e[0];if(t===void 0||this.lookFirst||!t.pending()||!t.drawn()||this.standInCostEntries.has(t.entry))return;let r=this.sourceTurnOf(t.waiting()?.key);if(r===Ts)return;let i=this.leadShareOf(t.entry),n=0;for(let l=1;l<e.length&&r!==Ts;l+=1){let o;{ea=He.call(this,e,l,t,i,r);o=za;if(ea===ya)continue;if(ea===$c)break;}n=l,r=o}if(n>0)e.unshift(e.splice(n,1)[0])}turnAt(e,t,r=()=>!0){let i=this.askRank(e[t]);return this.sourceTurnAt(e,t,t,(n)=>r(n)&&this.askRank(n)===i&&this.leadShareOf(n)>=this.leadShareOf(e[t]))}lineOf(e){if(e===Ns)return this.drawsOwed;return e===_s?this.pictureLine:[]}sourceTurnAt(a,b,c,d){return $c0P($c0C(204),o58.prototype,"sourceTurnAt").call(this,a,b,c,d)}owedMayTake(e,t){return this.owedStands(e)&&!(t&&(e.queued.lease&jQ)===0)}owedStands(e){return SQ(e)&&!this.recoveredHolds(e,!0)&&(!this.oneBuildReadsHold||this.framesUnwatched||this.leaseHeld(e))}buildSourceOf(e){if(!e.startsWith(fs))return null;let t=this.buildSources.get(e);if(t!==void 0)return t;let r=e.indexOf("/",fs.length),i=r<0?e:e.slice(0,r),n=this.materialLabels.get(i),l=n?.indexOf(" [")??-1,s=n?.startsWith("Material:Scripted(")?{script:l<0?n:n.slice(0,l),identity:i}:null;return this.buildSources.set(e,s),s}sourceTurnOf(e){let t=e===void 0?null:this.buildSourceOf(e),r=t===null?void 0:this.sourceTurns.get(t.script);return r===void 0||t===null||r.identity===t.identity?Ts:r.turn}standsDrawn(e){return e.drawn()||this.lookHolds(e.entry)}lookHolds(e){let t=this.framePendingPicturePipelines,r=this.frameArrivingPipelines;if(!this.lookFirst)return!1;if(this.liftKeeps(e)||this.placeOwnHas(e))return!0;return(t.has(e)||r.has(e))&&!this.fadesIn(e,this.lookFades)}lanesReadTo(e){let t=e??fsR.length;if(this.liftHeld===null||this.liftKeys.size===0)return t;{if((ea=Ie.call(this,t))!==ca)return ea}return t}liftKeeps(e){if(this.liftHeld===null)return!1;return Je.call(this,e);}lookTurnIn(a,b,c){return $c0P($c0O(225,o58.prototype["lookTurnIn"],"o58.prototype[\"lookTurnIn\"]"),o58.prototype,"lookTurnIn").call(this,a,b,c)}standsForLook(e){return this.standsDrawn(e)&&(this.liftKeeps(e.entry)||!this.fadesIn(e.entry,this.lookFades))}lookHeldQueuedPast(e){return this.warmWaits((e)=>this.standsForLook(e),e+1)}fadesIn(e,t){let r=this.frameHeldHandleContributor.get(e);if(t.contributors.has(r??""))return!0;let i=this.entryKeys.get(e);return i!==void 0&&t.keys.some((e)=>i.startsWith(e))}get framesPaced(){return this.pacesForFrames&&this.warmFramePaced&&!this.pageHidden}playerFramesOwedMs(){if(!this.framesPaced||this.lastBuildHoldMs<=0)return 0;return Ke.call(this);}drawWaitsForPlayerFrames(){return!this.asksForUnseenPicture()&&this.playerFramesHeld()}playerFramesHeld(){if(!this.framesPaced||!this.buildsHoldPlayerFrames)return!1;return this.buildsInFlight>0||this.playerFramesOwedMs()>0}asksForUnseenPicture(){return this.viewDepth>0||this.picturePreparationDepth>0}get idleBuildWaits(){return this.floorsWait||this.parseNeedsFrame||this.settleOwesFrame&&this.frameStandsBetweenBuilds||this.drawWaitsForPlayerFrames()}drawBuildWaits(e,t=!1){if(!t&&this.floorsWait)return!0;if(this.wholeDepth>0)return!this.wholeHasRoom(this.askUnits);return this.drawHold(!0,e)!==null}oweDrawsBuild(e){if(this.wholeDepth===0)this.oweDraw(e);else{Le.call(this,e);}}wholeHasRoom(a){return $c0P($c0C(205),o58.prototype,"wholeHasRoom").call(this,a)}drainWholeOwed(){let e=0;while(e<this.wholeOwed.length){{if((ea=Me.call(this,e))!==ca&&ea!==ya)return ea;e=za;if(ea===ya)continue;}}}oweDraw(e){if(e.queued!==null&&this.asksForUnseenPicture())e.queued.lease|=jQ;this.noteOwedLead(e),this.drawsOwed.splice(this.owedInsertAt(e.queued?.drawnAtMs??null,this.leadShareOf(e)),0,e),this.drainOwedDraws()}noteOwedLead(e){if(this.arrivalLeadOpen===gQ||this.asksForUnseenPicture())return!1;let t=this.leadShareOf(e);return this.noteLead(e),this.leadShareOf(e)>t}owedInsertAt(e,t,r=Ns){let i=this.lineOf(r);if(e===null)return i.length;let n=i.length;for(;n>0;n-=1){let l=i[n-1],s=l.queued;if(s===null||l.queuedLane!==r||s.drawnAtMs===null)continue;let o=this.leadShareOf(l);if(o>t||o===t&&s.drawnAtMs<=e)break}return n}notePictureLeft(){let e=(e)=>{let t=e.queued;if(t===null||(t.lease&$s)!==0)return;Ne.call(this,t,e);};for(let t of this.warmQueues){for(let r of t){if(r.entry instanceof vQ){e(r.entry);}}}for(let t of this.drawsOwed){e(t)}}firstAwaitedAt(e,t,r){return this.firstReadyAt(e,(e)=>t||this.standsDrawn(e)||r.has(e.entry))}issueAwaitedOnFreeHelpers(){if(!this.framesPaced||this.warmIssueHeld||this.inPictureWindow&&this.pictureCanPresent())return;let e=this.heldLanesFrom??fsR.length,t=this.frameArrivingPipelines;for(;;){if(this.parseNeedsFrame||this.hiddenTurnOpen||this.drawWaitsForPlayerFrames()||this.poolFull(this.warmBuildsWait(e))||(Lmy(this.device)??0)<=0)return;let r=0;for(;r<e;r+=1){let e=this.warmQueues[r],i=this.firstAwaitedAt(e,r===Xs&&this.lastFrameDrawsWait,t);if(i<0)continue;this.issueWarm(e.splice(i,1)[0],r);break}if(r===e)return}}noteArrivingWait(e){if(this.noteDrainHold(e),this.readPass(()=>this.warmQueues[Zs].every((e)=>this.waitsForFrameRead(e))))return;if(this.arrivingWaitSinceMs===null)this.arrivingWaitSinceMs=this.wallNowMs();this.arrivingWaitReason=e}passedHoldWords(e,t,r,i,n,l){let s=((e)=>`${e} warm build${e===1?" waits":"s wait"}`),o=[];if(e!==null)o.push(e);if(t!==null)o.push(...t);if(r>0)o.push(`${s(r)} for a frame's read`);if(i>0)o.push(`${s(i)} for the cover to lift`);if(n>0){Oe(o,s,n);}if(l!==null)o.push(l);return o.join("; ")}noteArrivingIssue(){if(this.arrivingWaitSinceMs===null)return;let e=this.wallNowMs()-this.arrivingWaitSinceMs;this.arrivingWaitSinceMs=null,this.options.onArrivingWait?.(e,this.arrivingWaitReason)}noteDrainHold(e){if(!this.warmBuildsWait())return;let t=this.warmQueues.some((e)=>this.firstReadyAt(e)>=0);if(this.drainHold??={reason:e,sinceMs:null},this.drainHold.reason=e,!t)this.drainHold.sinceMs=null;else this.drainHold.sinceMs??=this.wallNowMs()}drainWarmQueue(){if(this.withdrawProgramsThatLeft(),this.linesRest){this.drainHold=null;return}fsR.forEach((e,t)=>this.yieldStaleCostlyLeads(t)),this.rankDepth+=1,this.rankLines();try{this.drainWarmLanes(),this.parseAhead()}finally{if(--this.rankDepth===0)this.restoreLines()}}setMemoryRoom(e){if(this.memoryRoom===e)return;Pe.call(this,e);}setPictureUnseen(e){if(this.pictureUnseen===e)return;let t=this.pictureUnseen;if(this.pictureUnseen=e,e)this.parseAhead();else if(!t)return;else if(this.poolSlots?.fit(),this.picturePlayed&&this.pacesForFrames&&!this.warmFramePaced)this.takeFramePace();this.drainLines()}parseAhead(){if(!this.pictureUnseen||this.memoryRoom!=="room"||this.parsingAhead||this.buildsBlockSubmits||this.framesUnwatched||this.pageHidden||this.softwareFirst||this.lookFirst||this.warmIssueHeld||this.warmDepth>0||this.gateReads>0||this.refusingFreshText||Lmy(this.device)!==null||!(i3.has((this.device))))return;this.parsingAhead=!0;try{for(;;){if(this.parsePaced?this.parseNeedsFrame:this.parseAnswerOwed)return;let e=this.nextWaitingDescriptor();if(e===null)return;let t=this.descriptorAhead.get(e.create);if(t===void 0)return;this.descriptorAhead.delete(e.create);let r=this.textsParsed,i=wGv(this.device),n=this.buildLedger.get(e.key)?.requestedAtMs;rQ=n===void 0?-1:Math.max(0,this.wallNowMs()-n);try{this.withKeyTaints(e.key,t)}catch{}rQ=-1;let l=this.parsedSince(r,i);if(l===0)continue;this.parsedAhead+=l;let s=this.buildLedger.get(e.key);if(s)s.parsed=(s.parsed??0)+l;return}}finally{this.parsingAhead=!1}}nextWaitingDescriptor(){for(let e of this.drawsOwed){let t=e.queued;if(t!==null&&e.queuedLane===Ns&&this.descriptorAhead.has(t.create))return t}let e=this.heldLanesFrom??fsR.length;return this.readPass(()=>{for(let t=0;t<e;t+=1)for(let e of this.warmQueues[t]){let t=e.waiting();if(t!==null&&this.descriptorAhead.has(t.create)&&!this.waitsForFrameRead(e))return t}return null})}drainWarmLanes(){if(this.gateReads>0||this.drainOwedDraws()||this.drainPictureLine())return;if(this.softwareFirst){this.noteArrivingWait("the software eye builds frame one first: no warm lane issues before the first picture");return}if(this.warmDepth>0){this.drainOwed=!0,this.noteArrivingWait("a warm scope is open (its set is still being requested)");return}for(let e of this.warmQueues){let t=0;for(let r of e)if(r.pending())e[t++]=r;e.length=t}if(this.pageHidden&&!this.hiddenTurnOpen&&(!this.hiddenBootPace||this.deviceGone||this.hiddenDrainHeld)){this.noteArrivingWait("the page is hidden: the warm lanes drain one build a task"),this.armHiddenTurn();return}if(this.warmIssueHeld){let e=this.poolSlots;if(e!==null&&e.held<this.poolBuildsStanding+this.poolBuildsHeld())e.ask();this.noteArrivingWait("warm issue held (between the picture's present and its second present / ship)");return}let e=this.pacesForFrames,t=e&&!this.warmFramePaced&&Lmy(this.device)!==null;if(this.issueAwaitedOnFreeHelpers(),this.warmNeedsFrame){this.noteArrivingWait(this.frameBetweenWords());return}if(e&&!t&&this.drawBuildsInFlight>0){this.noteArrivingWait(`a draw's build on a one-thread compiler (${this.drawBuildsInFlight} in flight)`);return}if(this.inPictureWindow&&(e||this.coverHidesPoolFrames)&&this.pictureCanPresent()){this.noteArrivingWait("the picture can present (one-thread compiler, inside the window)");return}let r=this.coverHoldsArriving,i=r?Zs:this.heldLanesFrom,n=i===Zs&&this.arrivingRidesBeforeWorld,l=this.framesUnwatched&&this.poolCeilingNamed,s=l?1/0:e?KQ:is,o=l?1/0:this.arrivingBound,a=l?1/0:this.arrivingShare,u=n?js:i,d=e||this.lateLaneHeld,f=!e&&this.poolCeilingNamed;if(this.coverHoldsPool)this.drainFrameOne(this.lanesReadTo(u),0);for(;;){let i=this.lanesReadTo(u);if(this.poolFull(this.warmBuildsWait(i))){this.drainFrameOne(i,0);let e=0;this.readPass(()=>{for(let t=0;t<i;t+=1)for(let r of this.warmQueues[t])if(this.waitsForFrameRead(r))e+=1});let t;if(this.frameHolds)t=this.frameBetweenWords();else if(u!==null&&!this.warmBuildsWait(i))t=`held from lane ${fsR[u]} (arriving rides ${n})`;else t=this.poolCeilingWords();this.noteArrivingWait(e>0?this.passedHoldWords(null,null,e,0,0,t):t);return}let l=0,c=null,h=!1,p=!1,m=!1,g=null,y=0,v=0,w=0;while(l<i){let n=this.warmQueues[l];if(n.length===0){l+=1;continue}let u=l===Xs&&i>Zs&&e&&this.parsePaced&&!this.inPictureWindow&&!this.lookFirst?this.laneDrawnHead(Zs):null;if(u!==null&&this.standInCostEntries.has(u.entry)&&this.costlyAskedNow(u.entry)){l=Zs,p=!0;continue}if(this.lookFirst){let t=this.lookTurnIn(n,l,i);if(t<0&&(l!==Xs||this.lookHeldQueuedPast(l))){let e=`the ${fsR[l]} lane's speculation waits for the eye's first look (${n.length} queued)`;this.noteArrivingWait(e),(g??=[]).push(e),l+=1;continue}if(SO(n,t)&&!e)break}if(this.approaching&&l!==Xs&&!n.some((e)=>e.pending()&&this.standsDrawn(e)))SO(n,n.findIndex((e)=>e.pending()&&this.continuityEntries.has(e.entry)));let b=this.speculationWaitsForRoom(n,l);if(b){let e=`${fsR[l]}: its idle warms wait for the frames' room while the frames run late (${n.length})`;if(b!=="frames")e=b==="none"?`the ${fsR[l]} lane's speculation waits for the device's memory room (${n.length} queued)`:`the ${fsR[l]} lane's speculation waits for a frame with slack, one build at a time, while the machine nears paging (${n.length} queued)`;(g??=[]).push(e),l+=1;continue}if(this.frameReadLaneWaits(n,l)){this.readPass(()=>{for(let e of n){if(!e.pending())continue;if(this.twinWaitsForLift(e.entry)||this.waitsForLift(e,l))v+=1;else if(this.waitsForFrameRead(e))y+=1;else w+=1}}),l+=1;continue}let k=!this.standsDrawn(n[0]);if(l!==Xs&&k&&(e||this.coverHidesPoolFrames)&&this.inPictureWindow){if(this.effectPassesHeldSpeculation(n))continue;this.noteArrivingWait(this.passedHoldWords(c,g,y,v,w,`the ${fsR[l]} lane's speculation waits for the picture's present (${n.length} queued, inside the window where builds block submits)`));return}let x=e&&(this.lookFirst||t)&&!k?Xs:l,M=!(f&&l===Xs)&&this.drawBuildsInFlight>0&&(e?t&&x!==Xs:x!==Zs),S=this.laneBuildsInFlight[Zs],I,R=!1,A=!e&&l!==Xs&&k&&this.speculationPaced&&!this.framesUnwatched&&this.picturePlayed&&this.buildsInFlight>0;if(e)I=(t&&x===Xs?(Lmy(this.device)??0)<=0:this.warmBuildsInFlight>=KQ)||(this.buildsHoldPlayerFrames&&x!==Xs||k)&&this.playerFramesOwedMs()>0;else if(f&&l===Xs){let e=this.parsePaced&&!d;m=e&&k&&this.laneDrawnHead(Zs)!==null,I=h=m||e&&this.warmBuildsInFlight-S>=s}else if(l===Zs)I=A||k&&(S>=(h?a:o)||r&&S>0);else I=this.warmBuildsInFlight-S>=s||A;if(!I&&l===js&&this.buildsInFlight>0)I=R=!SO(n,n.findIndex((e)=>!this.idleEntries.has(e.entry)||this.standsDrawn(e)));if(!M&&!I)break;if(!M&&!h&&this.effectPassesHeldSpeculation(n))continue;let $=`the ${fsR[l]} lane (${n.length} queued, head pending ${n[0].pending()})`,z=l===Zs?`${S} arriving of ${o} at once on this machine`:`${this.warmBuildsInFlight} warm in flight, ${S} arriving`;if(A)z=`${this.buildsInFlight} in flight, one at a time`;let O=`${$} at the in-flight bound (${z})`;if(R)O=`${$}: its idle warms wait for the frames' room while the frames run late (${z})`;let T=M?`${$} waits behind ${this.drawBuildsInFlight} draw build(s)`:O;if(l!==Xs||d&&(e||I)){if(h){l=Xs,c=null;break}this.noteArrivingWait(l<Zs?`${T}, and the loop returns before the arriving lane`:this.passedHoldWords(c,g,y,v,w,T));return}c=h?null:`${T}, and the arriving lane rides beside it`,l+=1}if(l>=i&&h)l=Xs,c=null;else if(l>=i){let e=u!==null&&this.warmQueues.slice(i).some((e)=>e.length>0)?`held from lane ${fsR[u]} (arriving rides ${n})`:null,t=this.passedHoldWords(c,g,y,v,w,e);if(t==="")this.drainHold=null;else this.noteArrivingWait(t);return}if(this.parseNeedsFrame){let e=this.issueParsedFromLane(l,m||p)?l:-1;if(e<0&&h&&!m&&l!==Xs&&this.issueParsedFromLane(Xs))e=Xs;if(e<0){this.noteArrivingWait("a new shader text was parsed on the GPU process's main thread, so the next build that hands the device a new text waits for a completed playable frame");return}if(e===Zs)this.noteArrivingIssue();if(this.hiddenTurnOpen)return;continue}let b=this.warmQueues[l][0];if(this.parseAnswerOwed&&l!==Xs&&(b===void 0||!this.standsDrawn(b))){if(this.effectPassesHeldSpeculation(this.warmQueues[l]))continue;if(!h){this.noteArrivingWait(`a new shader text is at the GPU process's main thread, so the ${fsR[l]} lane waits for its parse's answer`);return}l=Xs,c=null}this.sourceTurnIn(this.warmQueues[l]);let k=this.warmQueues[l].shift();if(!k?.pending())continue;if(this.issueWarm(k,l,c),this.hiddenTurnOpen)return}}issueWarm(e,t,r=null){if(this.drainHold=null,r!==null)this.noteDrainHold(r);this.issuingForLook=this.lookFirst&&this.standsDrawn(e);try{e.issue()}finally{this.issuingForLook=!1}if(t===Zs)this.noteArrivingIssue()}kickBuild(e,t,r){e.readyPromise=r;let i=this.deviceEpoch,n=()=>e.readyPromise!==r||i!==this.deviceEpoch;r.then((r)=>{if(n())return;if(e.built=r,typeof r==="object"&&r!==null)HK(r,t),OsL(r,this.drawWatch);e.attempts=0;if(this.computePipelines.get(t)===e){{let e=this.device;if(aE.add(e),TE===e)TE=null}}this.readinessRevision+=1,e.budgetsExhausted=0;let i=this.buildLedger.get(t),l=i?.calls?.last?.deviceCall;if(l?.ownMs!==void 0&&this.shownShares.has(l)&&this.compileSpeed.room!==null){let e=this.compileSpeed.charsOf(t);if(e!==void 0)this.compileSpeed.noteBuilt(e,l.ownMs,i?.kind)}if(i)i.settledAtMs??=this.wallNowMs(),i.failed=!1;this.drainWarmQueue(),this.options.onPipelineBuilt?.(t,{taints:this.watchdogFamilyOf(t).taints,outstanding:this.outstandingBuilds()})},(r)=>{if(n())return;if(k$w(r).startsWith(Bg7)){this.refuseInPlace(e,t,Bg7),this.drainWarmQueue();return}e.attempts+=1,e.failed=!0,e.lastError=k$w(r),this.readinessRevision+=1;let i=this.buildLedger.get(t);if(i)i.failed=!0;let l=this.computePipelines.get(t)===e&&AE(e.lastError);if(l&&U9$()&&ysT(t===JNj))this.refuseEveryCompute(t,e.lastError);let s=l||e.attempts>=Bs||YQ(e.lastError)||e.lastError.startsWith(XcY);if(s)e.budgetsExhausted+=1;if(e.retryAtMs=s?1/0:this.frameNowMs+ds*2**(e.attempts-1),!s)this.retryingEntries.add(e),this.nextRetryAtMs=Math.min(this.nextRetryAtMs,e.retryAtMs);this.parkedPipelineCount+=1;this.drainWarmQueue();this.options.onPipelineError?.(t,k$w(r),{attempts:e.attempts,terminal:s,deterministic:s&&e.budgetsExhausted>=qs,verdict:Tqb(r),text:(uLW(r)?S3.get(r):void 0),standIn:this.standInKeys.get(e)?.[0],smallerForm:this.watchdogSmallerOf(t),...this.watchdogFamilyOf(t)})});WTO(this.device,r)}}var eGH=`struct HorizonParams { center: vec3<f32>, cellSize: f32, gridMin: vec2<f32>, gridCells: vec2<u32>, layerCount: u32, ground: u32, heightMin: f32, heightSpan: f32, driftScale: f32, ringCount: u32, thetaCount: u32, holeAt: u32, riseLeft: f32, ringVertices: u32 }
`,Tx7=`struct HorizonVertex { position: vec3<f32>, normal: u32, row: f32 }
fn lume_horizon_vertex(v: u32) -> HorizonVertex {
var out: HorizonVertex;
let ringVertices = horizon.ringVertices;
if (v < ringVertices) {
let columns = horizon.thetaCount;
let row = v / columns;
let column = v - row * columns;
let rows = ringVertices / columns;
let radius = horizonLay[row];
out.position = vec3<f32>(radius * horizonLay[rows + column], bitcast<f32>(horizonVertices[v * 2u]), radius * horizonLay[rows + columns + column]);
out.normal = horizonVertices[v * 2u + 1u];
out.row = f32(min(row, rows - 2u));
} else {
let at = ringVertices * 2u + (v - ringVertices) * 5u;
out.position = vec3<f32>(bitcast<f32>(horizonVertices[at]), bitcast<f32>(horizonVertices[at + 1u]), bitcast<f32>(horizonVertices[at + 2u]));
out.normal = horizonVertices[at + 3u];
out.row = bitcast<f32>(horizonVertices[at + 4u]);
}
return out;
}
fn lume_horizon_risen(y: f32, start: f32) -> f32 {
return select(y, mix(y, start, horizon.riseLeft), horizon.riseLeft > 0.0);
}
fn lume_horizon_normal(packed: u32) -> vec3<f32> {
let e = unpack2x16snorm(packed);
return normalize(vec3<f32>(e.x, 1.0 - abs(e.x) - abs(e.y), e.y));
}
`,FZu=`@group(2) @binding(0) var<uniform> horizon: HorizonParams;
@group(2) @binding(1) var<storage, read> horizonCovered: array<u32>;
@group(2) @binding(2) var<storage, read> layerParams: array<vec4<f32>>;
@group(2) @binding(3) var albedoArray: texture_2d_array<f32>;
@group(2) @binding(4) var atlasSampler: sampler;
@group(2) @binding(5) var<storage, read> horizonCells: array<u32>;
@group(2) @binding(6) var albedoFine: texture_2d_array<f32>;
@group(2) @binding(7) var<storage, read> horizonVertices: array<u32>;
@group(2) @binding(8) var<storage, read> horizonLay: array<f32>;
struct HorizonVertexOut {
@builtin(position) position: vec4<f32>,
@location(0) worldPos: vec3<f32>,
@location(1) normal: vec3<f32>,
@location(2) viewZ: f32,
@location(3) row: f32,
}
@vertex
fn vs(@builtin(vertex_index) vertexIndex: u32, @location(4) riseFrom: f32) -> HorizonVertexOut {
let vertex = lume_horizon_vertex(vertexIndex);
let worldPos = horizon.center + vec3<f32>(vertex.position.x, lume_horizon_risen(vertex.position.y, riseFrom) - 0.05, vertex.position.z);
var out: HorizonVertexOut;
out.position = frame.viewProj * vec4<f32>(worldPos, 1.0);
if (abs(out.position.w) < 0.5 * out.position.z) { out.position.w = 0.5 * out.position.z; }
out.worldPos = worldPos;
out.normal = lume_horizon_normal(vertex.normal);
out.viewZ = -(frame.view * vec4<f32>(worldPos, 1.0)).z;
out.row = vertex.row;
return out;
}
`,tXH=`fn lume_horizon_under_a_chunk(renderPos: vec3<f32>) -> bool {
let at = lume_worldFromRender(renderPos).xz;
let h = 0.5 * fwidth(at);
return lume_horizon_drawn(at - h) && lume_horizon_drawn(at + h) && lume_horizon_drawn(at + vec2<f32>(h.x, -h.y)) && lume_horizon_drawn(at - vec2<f32>(h.x, -h.y));
}
fn lume_horizon_drawn(xz: vec2<f32>) -> bool {
let cell = floor((xz - horizon.gridMin) / horizon.cellSize);
if (cell.x < 0.0 || cell.y < 0.0) { return false; }
let cx = u32(cell.x);
let cz = u32(cell.y);
if (cx >= horizon.gridCells.x || cz >= horizon.gridCells.y) { return false; }
let word = horizonCovered[cz * ((horizon.gridCells.x + 31u) >> 5u) + (cx >> 5u)];
return ((word >> (cx & 31u)) & 1u) == 1u;
}
`,bmJ=`fn lume_horizon_holeAt(i: u32) -> f32 {
return bitcast<f32>(horizonCovered[i]);
}
fn lume_horizon_holeCutGone_side(s: vec2<f32>, f: vec2<f32>, p: vec2<f32>) -> bool {
return s.x * (p.y - f.y) - s.y * (p.x - f.x) > 0.0;
}
fn lume_horizon_holeCutGone(word: f32, base: u32, f: vec2<f32>) -> bool {
if (word == 0.0) { return false; }
if (word < 0.0) { return true; }
let at = base + u32(word) - 1u;
let count = u32(lume_horizon_holeAt(at));
let r = vec2<f32>(lume_horizon_holeAt(at + 1u), lume_horizon_holeAt(at + 2u));
let s = r - f;
var gone = false;
for (var i = 0u; i < count; i = i + 1u) {
let o = at + 3u + i * 4u;
let a = vec2<f32>(lume_horizon_holeAt(o), lume_horizon_holeAt(o + 1u));
let b = vec2<f32>(lume_horizon_holeAt(o + 2u), lume_horizon_holeAt(o + 3u));
let e = b - a;
let d1 = e.x * (f.y - a.y) - e.y * (f.x - a.x);
let d2 = e.x * (r.y - a.y) - e.y * (r.x - a.x);
if ((d1 > 0.0) != (d2 > 0.0) && lume_horizon_holeCutGone_side(s, f, a) != lume_horizon_holeCutGone_side(s, f, b)) { gone = !gone; }
}
return gone;
}
fn lume_horizon_holed(renderPos: vec3<f32>) -> bool {
let at = horizon.holeAt;
if (at == 0u) { return false; }
let cellsX = u32(lume_horizon_holeAt(at));
let cellsZ = u32(lume_horizon_holeAt(at + 1u));
let worldPos = lume_worldFromRender(renderPos);
let grid = (worldPos.xz - vec2<f32>(lume_horizon_holeAt(at + 2u), lume_horizon_holeAt(at + 3u))) / lume_horizon_holeAt(at + 4u);
let cell = floor(grid);
if (cell.x < 0.0 || cell.y < 0.0 || cell.x >= f32(cellsX) || cell.y >= f32(cellsZ)) { return false; }
let words = at + 5u;
return lume_horizon_holeCutGone(lume_horizon_holeAt(words + u32(cell.y) * cellsX + u32(cell.x)), words + cellsX * cellsZ, grid - cell);
}
`,Ppq=`fn lume_horizon_paramsRow(layer: u32, row: u32) -> vec4<f32> {
return layerParams[row * horizon.layerCount + min(layer, horizon.layerCount - 1u)];
}
`,$$=LPQ.vertex,RvD=`${$$.slice(0,2254)}${$$.slice(2462,2521)}${$$.slice(3293,3364)}fn shade_fogHeightColumn() -> f32 {
${$$.slice(3408,3522)}return max(-eye, 0.0) + exp(-k * max(eye, 0.0)) / k;
${$$.slice(3898,4265)}fn shade_fogStep(x: f32) -> vec4<f32> {
let u = fract(x * 0.03125 + 1.0) * 32.0;
let i0 = u32(floor(u)) % 32u;
let i1 = (i0 + 1u) % 32u;
return mix(fogHorizon[i0], fogHorizon[i1], fract(u));
}
fn shade_fogTurn(unit: vec3<f32>) -> f32 {
let sun = fogHorizon[33u];
let origin = select(vec2<f32>(1.0, 0.0), sun.xz, sun.w > 0.0 && dot(sun.xz, sun.xz) >= 1e-12);
return select(atan2(origin.x * unit.z - origin.y * unit.x, dot(origin, unit.xz)), 0.0, dot(unit.xz, unit.xz) < 1e-12);
}
fn shade_fogLean(unit: vec3<f32>, turn: f32) -> vec3<f32> {
let level = dot(unit.xz, unit.xz);
let sun = fogHorizon[33u];
var around: vec4<f32>;
if (sun.w <= 0.0) {
around = shade_fogStep(turn * 5.092958178940651);
} else {
let offset = acos(clamp((dot(unit, sun.xyz) - sun.y * 0.0175) / max(length(sun.xz) * 0.9998468632745717, 1e-6), -1.0, 1.0));
let x = sqrt(offset * 0.3183098861837907) * 16.0;
around = mix(shade_fogStep(-x), shade_fogStep(x), clamp(0.5 + 0.5 * turn / max(offset, 1e-6), 0.0, 1.0));
}
let step = mix(fogHorizon[32u], around, level);
if (step.w <= 0.0) { return step.rgb; }
let lobe = 0.16000000000000003 / (1.3599999999999999 - 1.2 * dot(unit, passLights.sunDirection));
return step.rgb * (1.0 + 0.6 * step.w * min(dot(passLights.sunColor, vec3<f32>(0.2126, 0.7152, 0.0722)), 1.0) * lobe * sqrt(lobe));
}
fn sky_domeMirror(d: vec3<f32>) -> vec4<f32> {
let phi = select(atan2(d.z, d.x), 0.0, abs(d.x) + abs(d.z) < 1e-6);
let u = fract(phi * 0.159154943 + 1.0) * 16.0 - 0.5;
let fu = u - floor(u);
let c0 = u32(i32(floor(u)) + 16) % 16u;
let c1 = (c0 + 1u) % 16u;
let v = clamp((d.y * 0.5 + 0.5) * 8.0 - 0.5, 0.0, 7.0);
let r0 = u32(floor(v));
let r1 = min(r0 + 1u, 7u);
let fv = v - floor(v);
let a = mix(fogHorizon[208u + r0 * 16u + c0], fogHorizon[208u + r0 * 16u + c1], fu);
let b = mix(fogHorizon[208u + r1 * 16u + c0], fogHorizon[208u + r1 * 16u + c1], fu);
return mix(a, b, fv);
}
fn shade_fogFarPlane() -> f32 {
return select(3.4e38, frame.proj[3][2] / frame.proj[2][2], frame.proj[2][2] > 0.0);
}
fn shade_skyFogFactor(direction: vec3<f32>, fogSky: f32, openSky: f32) -> f32 {
let reach = select(1.7320508 / max(passLights.fogDensity, 1e-6), passLights.fogFar, passLights.fogMode == 1.0);
var layer = reach * 0.05;
if (passLights.fogHeight.y > 0.0) { layer = shade_fogHeightColumn(); }
let end = select(3.4e38, shade_fogFarPlane(), passLights.fogMode == 2.0 && passLights.fogHeight.y <= 0.0);
let open = select(direction.y, abs(direction.y), openSky > 0.0);
let rise = select(open, direction.y, passLights.fogHeight.y > 0.0);
let path = select(layer / 1e-4, min(layer / max(rise, 1e-4), end), rise > 0.0);
let authored = shade_authoredFogFactor(path) * fogSky;
if (passLights.viewFogAmount <= 0.0) { return authored; }
let viewPath = passLights.viewFogFar * 0.05 / max(open, 1e-4);
let view = smoothstep(passLights.viewFogNear, max(passLights.viewFogFar, passLights.viewFogNear + 1e-4), viewPath);
return max(authored, view * passLights.viewFogAmount);
}
fn shade_fogRing(base: u32, x: f32) -> vec3<f32> {
let u = fract(x * 0.03125 + 1.0) * 32.0;
let i0 = u32(floor(u)) % 32u;
let i1 = (i0 + 1u) % 32u;
return mix(fogHorizon[base + i0].rgb, fogHorizon[base + i1].rgb, fract(u));
}
fn shade_fogSky(unit: vec3<f32>, turn: f32) -> vec3<f32> {
var x = turn * 5.092958178940651;
if (fogHorizon[33u].w > 0.0) {
x = sign(turn) * sqrt(abs(turn) * 0.3183098861837907) * 16.0;
}
let band = select(0u, 1u, unit.y > 0.08) + select(0u, 1u, unit.y > 0.2) + select(0u, 1u, unit.y > 0.4) + select(0u, 1u, unit.y > 0.7);
let lo = shade_fogRing(select(0u, 2u + band * 32u, band > 0u), x);
let hi = shade_fogRing(34u + band * 32u, x);
let span = select(select(select(select(vec2<f32>(0.0175, 0.08), vec2<f32>(0.08, 0.2), band == 1u), vec2<f32>(0.2, 0.4), band == 2u), vec2<f32>(0.4, 0.7), band == 3u), vec2<f32>(0.7, 1.0), band == 4u);
return mix(lo, hi, clamp((unit.y - span.x) / (span.y - span.x), 0.0, 1.0));
}
fn shade_fogColor(toward: vec3<f32>) -> vec3<f32> {
let unit = toward * inverseSqrt(max(dot(toward, toward), 1e-24));
let turn = shade_fogTurn(unit);
let lean = shade_fogLean(unit, turn);
let under = unit.y <= 0.0175;
if (under && fogHorizon[208u].w < 1.5) { return lean; }
let share = max(shade_skyFogFactor(unit, fogHorizon[34u].w, select(0.0, 1.0, under)), 1.0 - smoothstep(0.0175, 0.08, select(unit.y, -unit.y, under)));
if (share >= 1.0) { return lean; }
var far: vec3<f32>;
if (under) { far = sky_domeMirror(unit).rgb; } else { far = shade_fogSky(unit, turn); }
return mix(far, lean, share);
}
${$$.slice(10976,11626)}fn terrain_latticeWrap(i: vec2<f32>) -> vec2<f32> {
return i - 256.0 * floor((i + vec2<f32>(128.0)) / 256.0);
}
fn terrain_latticeNoise2D(p: vec2<f32>, seed: f32) -> f32 {
let i = floor(p);
let f = p - i;
let a = terrain_hash2D(terrain_latticeWrap(i), seed);
let b = terrain_hash2D(terrain_latticeWrap(i + vec2<f32>(1.0, 0.0)), seed);
let c = terrain_hash2D(terrain_latticeWrap(i + vec2<f32>(0.0, 1.0)), seed);
let d = terrain_hash2D(terrain_latticeWrap(i + vec2<f32>(1.0, 1.0)), seed);
${$$.slice(11531,11626)}fn terrain_paintNoise(p: vec2<f32>, seed: f32) -> f32 {
return clamp(terrain_noise2D(p, seed) * 0.5 + terrain_noise2D(p * 2.0, seed + 17.0) * 0.25 + terrain_noise2D(p * 4.0, seed + 34.0) * 0.125, 0.0, 1.0);
}
fn terrain_macroNoise(worldXZ: vec2<f32>, scaleMeters: f32) -> vec2<f32> {
let p = worldXZ / scaleMeters;
let n = terrain_latticeNoise2D(p, 71.0) * 0.6667 + terrain_latticeNoise2D(p * 2.3 + vec2<f32>(13.7, 5.1), 89.0) * 0.3333;
let h = terrain_latticeNoise2D(p * 0.7 + vec2<f32>(41.3, 27.9), 107.0);
return vec2<f32>(n, h);
${$$.slice(32870,33353)}${$$.slice(31585,32452)}${$$.slice(38323,38544)}fn terrain_farFootprint(ddx: vec2<f32>, ddy: vec2<f32>, texels: vec2<f32>) -> f32 {
${$$.slice(23678,23885)}return area / max(major, 1e-12);
}
fn terrain_farFloorScale(lodFloor: f32, footprint: f32) -> f32 {
return select(1.0, max(exp2(lodFloor) / max(footprint, 1e-8), 1.0), lodFloor > 0.0);
}
fn terrain_colorFromStops(s0: vec4<f32>, s1: vec4<f32>, s2: vec4<f32>, s3: vec4<f32>, t: f32, stopCount: f32) -> vec3<f32> {
var color = s0.rgb;
color = mix(color, s1.rgb, smoothstep(s0.a, max(s1.a, s0.a + 1e-4), t) * f32(stopCount > 1.5));
color = mix(color, s2.rgb, smoothstep(s1.a, max(s2.a, s1.a + 1e-4), t) * f32(stopCount > 2.5));
color = mix(color, s3.rgb, smoothstep(s2.a, max(s3.a, s2.a + 1e-4), t) * f32(stopCount > 3.5));
return color;
}
${eGH}${Tx7}${FZu}${tXH}${bmJ}${Ppq}fn lume_horizon_layer_color(layer: u32, worldXZ: vec2<f32>, heightNorm: f32, worldDdx: vec2<f32>, worldDdy: vec2<f32>, footprints: vec2<f32>, drift: vec2<f32>) -> vec3<f32> {
let mainRow = lume_horizon_paramsRow(layer, 0u);
let tintRow = lume_horizon_paramsRow(layer, 1u);
var color = lume_horizon_paramsRow(layer, 18u).rgb;
if (mainRow.x < 0.5) {
let uvScale = mainRow.z;
let gx = worldDdx * uvScale;
let gy = worldDdy * uvScale;
let fineRow = lume_horizon_paramsRow(layer, 16u).xy;
let tileUv = terrain_tilePhase(worldXZ, uvScale);
let spans = footprints * abs(uvScale);
var mean: vec4<f32>;
if (fineRow.x >= 1.0) {
let fineScale = terrain_farFloorScale(fineRow.y, spans.y);
mean = textureSampleGrad(albedoFine, atlasSampler, tileUv, i32(fineRow.x - 1.0), gx * fineScale, gy * fineScale);
} else {
let floorScale = terrain_farFloorScale(lume_horizon_paramsRow(layer, 15u).x, spans.x);
mean = textureSampleGrad(albedoArray, atlasSampler, tileUv, i32(max(mainRow.y, 0.0)), gx * floorScale, gy * floorScale);
}
color = terrain_applyTintFold(mean.rgb, tintRow.rgb, lume_horizon_paramsRow(layer, 14u).xyz);
}
if (mainRow.x >= 1.5) {
let aux = lume_horizon_paramsRow(layer, 2u);
var t = heightNorm;
if (mainRow.x < 2.5) { t = terrain_paintNoise(worldXZ / max(aux.x, 1e-4), aux.y); }
color = terrain_colorFromStops(lume_horizon_paramsRow(layer, 3u), lume_horizon_paramsRow(layer, 4u), lume_horizon_paramsRow(layer, 5u), lume_horizon_paramsRow(layer, 6u), t, aux.z);
}
if (tintRow.a > 0.0) { color = terrain_applyTint(color, terrain_colorFromStops(lume_horizon_paramsRow(layer, 7u), lume_horizon_paramsRow(layer, 8u), lume_horizon_paramsRow(layer, 9u), lume_horizon_paramsRow(layer, 10u), heightNorm, lume_horizon_paramsRow(layer, 2u).w), tintRow.a); }
let macroRow = lume_horizon_paramsRow(layer, 13u);
if (macroRow.w != 0.0 || macroRow.z != 0.0) { color = terrain_applyMacroNoise(color, terrain_macroNoise(worldXZ, lume_horizon_paramsRow(layer, 12u).w), macroRow.w, macroRow.z); }
return color;
${$$.slice(34626,34837)}fn lume_horizon_layer_response(layer: u32) -> vec2<f32> {
let pbrRow = lume_horizon_paramsRow(layer, 11u);
var roughness = 1.0;
if (pbrRow.x >= 0.0) { roughness = terrain_patinaRoughness(lume_horizon_paramsRow(layer, 19u).b, lume_horizon_paramsRow(layer, 13u).x); }
return vec2<f32>(roughness, clamp(pbrRow.z, 0.0, 1.0));
}
var<private> lume_horizon_response: vec2<f32> = vec2<f32>(1.0, 0.0);
fn lume_horizon_albedo(in: HorizonVertexOut, worldDdx: vec2<f32>, worldDdy: vec2<f32>) -> vec3<f32> {
let worldAbs = lume_worldFromRender(in.worldPos);
let heightNorm = clamp((worldAbs.y - horizon.heightMin) / max(horizon.heightSpan, 1e-4), 0.0, 1.0);
let columns = max(horizon.thetaCount, 1u);
let lastRow = max(horizon.ringCount, 1u) - 1u;
let rowAt = clamp(in.row, 0.0, f32(lastRow));
let row = min(u32(rowAt), lastRow);
let fr = rowAt - f32(row);
let rel = in.worldPos.xz - horizon.center.xz;
let around = fract(atan2(rel.y, rel.x) * 0.15915494) * f32(columns);
let column = min(u32(around), columns - 1u);
let fc = clamp(around - f32(column), 0.0, 1.0);
let cell = (row * columns + column) * 4u;
let corner0 = horizonCells[cell];
let corner1 = horizonCells[cell + 1u];
let corner2 = horizonCells[cell + 2u];
let corner3 = horizonCells[cell + 3u];
let weights = mix(mix(unpack4x8unorm(corner0), unpack4x8unorm(corner1), fc), mix(unpack4x8unorm(corner2), unpack4x8unorm(corner3), fc), fr).xyz;
let shares = weights * weights;
let footprints = vec2<f32>(terrain_farFootprint(worldDdx, worldDdy, vec2<f32>(textureDimensions(albedoArray, 0))), terrain_farFootprint(worldDdx, worldDdy, vec2<f32>(textureDimensions(albedoFine, 0))));
let drift = vec2<f32>(0.5);
var albedo = vec3<f32>(0.0);
var response = vec2<f32>(0.0);
for (var k = 0u; k < 3u; k++) {
let share = select(select(shares.z, shares.y, k == 1u), shares.x, k == 0u);
if (k > 0u && !(share > 0.0)) { continue; }
let corner = select(select(corner2, corner1, k == 1u), corner0, k == 0u);
albedo += lume_horizon_layer_color(corner >> 24u, worldAbs.xz, heightNorm, worldDdx, worldDdy, footprints, drift) * share;
response += lume_horizon_layer_response(corner >> 24u) * share;
}
let responseMixed = response / max(shares.x + shares.y + shares.z, 1e-6);
lume_horizon_response = vec2<f32>(clamp(responseMixed.x, 0.4, 1.0), clamp(responseMixed.y, 0.0, 1.0));
return albedo / max(shares.x + shares.y + shares.z, 1e-6);
${$$.slice(30678,31585)}${$$.slice(5304,9268)}fn lume_surfaceUnlitAs(out: LumeSurfaceOut, unlit: bool) -> LumeSurfaceOut {
var held = out;
if (unlit) {
held.words.y = (held.words.y & ~(15u << 19u)) | (1u << 19u);
}
return held;
}
fn lume_surfaceUnlit(rgb: vec3<f32>) -> LumeSurfaceOut {
return lume_surfaceUnlitAs(lume_surfaceOut(vec3<f32>(0.0, 1.0, 0.0), rgb, 1.0, 0.0, 0.0, vec3<f32>(0.0)), true);
}
fn lume_horizon_surface(in: HorizonVertexOut, worldDdx: vec2<f32>, worldDdy: vec2<f32>, yields: bool) -> LumeSurfaceOut {
if (horizon.ground == 0u || horizon.layerCount == 0u) { return lume_surfaceUnlit(shade_fogColor(in.worldPos - frame.cameraPosition)); }
var albedo = vec3<f32>(0.0);
if (!yields) { albedo = lume_horizon_albedo(in, worldDdx, worldDdy); }
lume_surfacePoint = in.worldPos;
var finalAlbedo = albedo;
var N = normalize(in.normal);
var roughness = lume_horizon_response.x;
${$$.slice(69359,69490)}let lowness = clamp(0.0 / 0.35, 0.0, 1.0);
${$$.slice(69563,70023)}return lume_surfaceOut(N, finalAlbedo, roughness, lume_horizon_response.y, 0.0, vec3<f32>(0.0));
}
@fragment
fn fs(in: HorizonVertexOut) -> LumeSurfaceOut {
let yields = lume_horizon_under_a_chunk(in.worldPos) | lume_horizon_holed(in.worldPos);
if (yields) { discard; }
let worldDdx = dpdx(in.worldPos).xz;
let worldDdy = dpdy(in.worldPos).xz;
return lume_horizon_surface(in, worldDdx, worldDdy, yields);
}
`,ewA=7,GCE=8,zrZ=[RDp(0,3,"uniform"),RDp(1,2,"read-only-storage"),RDp(2,2,"read-only-storage"),v6R(3,2,"float","2d-array"),Zyu(4,2,"filtering"),RDp(5,2,"read-only-storage"),v6R(6,2,"float","2d-array"),RDp(ewA,1,"read-only-storage"),RDp(GCE,1,"read-only-storage")],u4J=80,vK9=64,eh1=64,gUH=68,WD_=[{arrayStride:4,stepMode:"vertex",attributes:[{format:"float32",offset:0,shaderLocation:4}]}];var _2m=(e)=>_xc()?e:-1;function hME(e,t=""){return`terrain/horizon/${e.colorFormat}/${jEz}/s${e.samples}${e.motion?`/motion-${Zjv}`:""}${t}`}function sY0(e=!1,t=""){return`terrain/horizon/${wsy(e,OTV())}/${jEz}${t}`}function hjq(e,t,r,i,n=""){let l=[{format:r.colorFormat}];if(r.motion)l.push({format:Zjv});return $x(e,t,hME(r,n),i,l,r.samples)}function Ak$(e,t,r=!1,i=RvD,n=""){let l=OTV();return $x(e,t,sY0(r,n),A0Q(i,"fs",l),v0g(r,l),l)}function $x(e,t,r,i,n,l){let s=e.createShaderModule({label:r,code:i});let o=t.getBindGroupLayout(klf,"lume frame");let a=(Ldr(t,igX(i,["vs","fs"])));let u=SJN(e,r,[o,a,t.getBindGroupLayout(zrZ,"terrain horizon")],a);return{label:r,layout:u,vertex:{module:s,entryPoint:"vs",buffers:WD_},fragment:{module:s,entryPoint:"fs",targets:n},primitive:{topology:"triangle-list",cullMode:"back"},depthStencil:Ij1(!0),multisample:{count:l}}}var fx={name:"terrain horizon ring",heldFor:"heightmap",mint:function(e){return{key:sY0(),kind:"render",descriptor:()=>Ak$(e.device,e.pipelines),peelCull:!0}}};var AU=[`struct CullCamera {
planes: array<vec4<f32>, 6>,
camPos: vec3<f32>,
camNear: f32,
focalPixels: f32,
orthoPixels: f32,
projectionDepthScale: f32,
projectionDepthOffset: f32,
prevFocus: vec3<f32>,
rasterShare: f32,
focus: vec3<f32>,
farReach: f32,
fogCull: vec4<f32>,
skylineEye: vec3<f32>,
skylineOn: f32,
skylineSlack: vec2<f32>,
memoryOwner: f32,
lensFar: f32,
skyline: array<vec4<f32>, 256>,
coverWindow: vec4<f32>,
coverBand: vec4<f32>,
eyeGate: vec4<f32>,
eyeViewProj: array<mat4x4<f32>, 2>,
eyeCells: array<vec4<f32>, 128>,
}
struct CullGroup {
activeCount: u32,
argsSlotBase: u32,
maxDistance: f32,
padXY: f32,
padNear: f32,
padFar: f32,
lodMode: f32,
lodNear: f32,
lodFar: f32,
lodDensity: f32,
drawCount: u32,
capacity: u32,
ringT1: f32,
ringT2: f32,
ringBand: f32,
ringRadius: f32,
ringBias: u32,
sizeCullPx: f32,
packedMirror: u32,
ringErrorPx: f32,
variant: u32,
packedRadius: f32,
packedQualityKeep: f32,
ringCoarseNear: u32,
packedRegion0: vec4<f32>,
packedRegion1: vec4<f32>,
packedRegion2: vec4<f32>,
packedLaw: vec4<f32>,
packedLevelLaw: vec4<f32>,
packedLevelDraws: vec4<u32>,
transformsBase: u32,
boundsBase: u32,
survivorsBase: u32,
slotDrawsBase: u32,
drawWindowsBase: u32,
recordsBase: u32,
memoryBase: u32,
slotDrawsLength: u32,
recordsLength: u32,
workgroupStart: u32,
_planePad0: u32,
_planePad1: u32,
boundsPatches: u32,
fogs: u32,
packedNearRadius: f32,
packedCoverHeight: f32,
leaseIgnore: u32,
slotKeysAt: u32,
familySizesAt: u32,
_rowPad2: u32,
}
struct CullBatch {
count: u32,
prefixBase: u32,
laneBase: u32,
tableStride: u32,
groups: array<CullGroup, 16>,
}
@group(0) @binding(0) var<uniform> camera: CullCamera;
@group(0) @binding(1) var<storage, read_write> args: array<atomic<u32>>;
@group(1) @binding(0) var<uniform> batch: CullBatch;
@group(1) @binding(1) var<storage, read> transforms: array<mat4x4<f32>>;
@group(1) @binding(2) var<storage, read> bounds_buf: array<vec4<f32>>;
@group(1) @binding(3) var<storage, read_write> survivors: array<u32>;
@group(1) @binding(4) var<storage, read> slotDraws: array<u32>;
@group(1) @binding(5) var<storage, read> drawWindows: array<vec2<u32>>;
@group(1) @binding(6) var<storage, read> records: array<u32>;
@group(1) @binding(7) var<storage, read_write> slotMemory: array<u32>;
struct CullCascadeFits {
planes: array<vec4<f32>, 24>,
has: vec4<u32>,
hull: array<vec4<f32>, 32>,
hullCount: vec4<u32>,
props: vec4<u32>,
}
@group(1) @binding(8) var<uniform> cascadeFits: CullCascadeFits;
var<private> row: u32;
var<private> row_activeCount: u32;
var<private> row_argsSlotBase: u32;
var<private> row_maxDistance: f32;
var<private> row_padXY: f32;
var<private> row_padNear: f32;
var<private> row_padFar: f32;
`,`var<private> row_drawCount: u32;
var<private> row_capacity: u32;
var<private> row_ringT1: f32;
var<private> row_ringT2: f32;
var<private> row_ringBand: f32;
var<private> row_ringRadius: f32;
var<private> row_ringBias: u32;
`,`var<private> row_packedMirror: u32;
var<private> row_ringErrorPx: f32;
var<private> row_variant: u32;
var<private> row_packedRadius: f32;
var<private> row_packedQualityKeep: f32;
var<private> row_ringCoarseNear: u32;
`,`var<private> row_packedLaw: vec4<f32>;
var<private> row_packedLevelLaw: vec4<f32>;
var<private> row_packedLevelDraws: vec4<u32>;
var<private> row_transformsBase: u32;
var<private> row_boundsBase: u32;
var<private> row_survivorsBase: u32;
var<private> row_slotDrawsBase: u32;
var<private> row_drawWindowsBase: u32;
var<private> row_recordsBase: u32;
var<private> row_memoryBase: u32;
var<private> row_slotDrawsLength: u32;
var<private> row_recordsLength: u32;
var<private> row_workgroupStart: u32;
var<private> row_boundsPatches: u32;
`,`var<private> row_packedNearRadius: f32;
`,`var<private> row_leaseIgnore: u32;
`,`const VARIANT_MULTI = 1u;
const VARIANT_RING = 2u;
const VARIANT_SHADOW = 3u;
const VARIANT_PACKED = 4u;
const VARIANT_SHADOW_MULTI = 5u;
const SIZE_FLOOR_HYSTERESIS = 0.05;
const SLOT_STANDING = 1u;
const SLOT_FLOORED = 2u;
const SLOT_DRAW_KEY_MASK = 33554431u;
const SLOT_DRAW_FLOOR_EXEMPT = 2147483648u;
const SLOT_DRAW_FOGGED = 1073741824u;
const AGG_INVALID_KEY = 0xffffffffu;
`,`fn batchRowOf(workgroupIndex: u32) -> u32 {
var lo = 0u;
var hi = min(max(batch.count, 1u), 16u) - 1u;
loop {
if (lo >= hi) { break; }
let mid = (lo + hi + 1u) / 2u;
if (batch.groups[mid].workgroupStart <= workgroupIndex) { lo = mid; } else { hi = mid - 1u; }
}
return lo;
}
`,`fn cull_hashId(id: u32, salt: u32) -> f32 {
var x = id ^ salt;
x = x ^ (x >> 16u);
x = x * 0x7feb352du;
x = x ^ (x >> 15u);
x = x * 0x846ca68bu;
x = x ^ (x >> 16u);
return f32(x >> 8u) * (1.0 / 16777216.0);
}
fn cull_stableThreshold(id: u32, salt: u32) -> f32 {
var x = id ^ salt;
x = x ^ (x >> 16u);
x = x * 0x7feb352du;
x = x ^ (x >> 15u);
x = x * 0x846ca68bu;
x = x ^ (x >> 16u);
return f32(x) / 4294967296.0;
}
fn cull_nearKeep(distance: f32) -> f32 {
let radius = row_packedNearRadius;
if (radius <= 0.0) { return 0.0; }
let share = min(1.0, radius / max(distance, 1e-6));
return share * share;
}
`,`fn cull_packedLevelOf(term: f32, cap: f32) -> u32 {
if (term >= cap) { return row_packedLevelDraws.w; }
let steps = i32(round(log2(cap))) - i32(floor(log2(term)));
if (steps >= 4) { return 0u; }
if (steps == 3) { return row_packedLevelDraws.x; }
if (steps == 2) { return row_packedLevelDraws.y; }
return row_packedLevelDraws.z;
}
`,`fn cull_packedLevelDraw(worldPos: vec3<f32>, radius: f32, candidateId: u32) -> u32 {
`,`let cap = row_packedLevelLaw.x;
if (cap <= 0.0 || camera.focalPixels <= 0.0 || packedLevelCount() <= 1u) { return 0u; }
let distance = max(length(worldPos - camera.camPos) - radius, 0.0);
let dither = exp2((cull_hashId(candidateId, 0x2f6b3c1du) - 0.5) * 0.46893050727404595);
let term = 1.0 * distance * dither / (camera.focalPixels * max(row_packedLevelLaw.y, 1e-6));
if (term <= 0.0) { return 0u; }
`,`}
fn keyedShape() -> bool {
return row_variant == VARIANT_MULTI || row_variant == VARIANT_SHADOW || row_variant == VARIANT_SHADOW_MULTI;
}
fn windowFor(key: u32) -> vec2<u32> {
if (keyedShape()) { return drawWindows[row_drawWindowsBase + key]; }
if (row_variant == VARIANT_RING || row_variant == VARIANT_PACKED) { return vec2<u32>(key * row_capacity, row_capacity); }
return vec2<u32>(0u, row_capacity);
}
fn ringErrorRuleOn() -> bool {
return row_ringErrorPx > 0.0 && (camera.focalPixels > 0.0 || camera.orthoPixels > 0.0);
}
fn ringKeyFor(ring: u32) -> u32 {
if (ring >= 3u || ringErrorRuleOn()) { return ring; }
return min(ring + row_ringBias, 2u);
}
fn packedFadeBase() -> u32 {
return row_ringBias & 65535u;
}
`,`fn packedLevelCount() -> u32 {
if (row_packedMirror > 0u) { return row_packedMirror; }
return select(row_drawCount, packedFadeBase(), packedFadeBase() > 0u);
}
fn mainKeyFor(slot: u32, ring: u32) -> u32 {
if (keyedShape()) { let w = slotDraws[row_slotDrawsBase + slot]; return min((w & SLOT_DRAW_KEY_MASK) + select(0u, (w >> 26u) & 7u, row_variant == VARIANT_MULTI), select(row_drawCount, 6u, row_boundsPatches > 1u) - 1u); }
if (row_variant == VARIANT_RING) { return ringKeyFor(ring); }
if (row_variant == VARIANT_PACKED) { return min(ring, packedLevelCount() - 1u); }
return 0u;
}
fn instancesPerSlot(key: u32) -> u32 {
if ((row_variant == VARIANT_MULTI || row_variant == VARIANT_SHADOW_MULTI) && key < row_recordsLength) { return max(records[row_recordsBase + key], 1u); }
return 1u;
}
fn recordsShift() -> vec3<f32> {
return vec3<f32>(row_packedLaw.z, row_packedLevelLaw.z, row_packedLaw.w);
}
fn rowShift(m: mat4x4<f32>) -> vec3<f32> {
return select(vec3<f32>(0.0), vec3<f32>(m[0].w, m[1].w, m[2].w), row_boundsPatches > 1u) + recordsShift();
}
`,`fn aggFlush(key: u32, count: u32) -> u32 {
let cap = windowFor(key).y;
let argsIndex = (row_argsSlotBase + key) * 5u + 1u;
let perSlot = instancesPerSlot(key);
let base = atomicAdd(&args[argsIndex], count * perSlot) / perSlot;
if (base + count > cap) {
atomicSub(&args[argsIndex], min(count, base + count - cap) * perSlot);
}
return base;
}
`,`fn pastViewFar(c: vec3<f32>, r: f32, s: u32) -> bool {
let pad = r * (1.0 + row_padFar);
return planeDistance(5u, c) < -pad && (!keyedShape() || (slotDraws[row_slotDrawsBase + s] & 33554432u) == 0u || planeDistance(4u, c) + camera.camNear > camera.lensFar + pad);
}
`,`}
`,`}
const SPAN_WRITER_BATCH = 4294967295u;
fn cull_spanWrite(workgroup: vec3<u32>, lane: u32, grid: vec3<u32>) {
let turns = records[1u];
if (turns != 0u) {
if (lane < 32u) {
var x = bitcast<f32>(atomicLoad(&args[lane]));
for (var k = 0u; k < turns; k += 1u) {
x = fma(x, 0.9999999, 1.0e-7);
}
atomicStore(&args[lane], bitcast<u32>(x));
}
return;
}
let count = records[0u];
if (count == 0u) { return; }
let workgroupIndex = workgroup.y * grid.x + workgroup.x;
var lo = 0u;
var hi = count - 1u;
loop {
if (lo >= hi) { break; }
let mid = (lo + hi + 1u) / 2u;
if (records[4u + mid * 4u + 2u] <= workgroupIndex) { lo = mid; } else { hi = mid - 1u; }
}
let span = 4u + lo * 4u;
let entry = (workgroupIndex - records[span + 2u]) * 64u + lane;
if (entry < records[span + 1u]) {
atomicStore(&args[records[span] + entry * records[2u]], records[3u]);
}
}
@compute @workgroup_size(64)
fn main(
@builtin(workgroup_id) workgroup: vec3<u32>,
@builtin(local_invocation_index) lane: u32,
@builtin(num_workgroups) grid: vec3<u32>,
) {
if (batch.count == SPAN_WRITER_BATCH) {
cull_spanWrite(workgroup, lane, grid);
return;
}
let workgroupIndex = workgroup.y * grid.x + workgroup.x;
row = batchRowOf(workgroupIndex);
row_activeCount = batch.groups[row].activeCount;
row_argsSlotBase = batch.groups[row].argsSlotBase;
row_maxDistance = batch.groups[row].maxDistance;
row_padXY = batch.groups[row].padXY;
row_padNear = batch.groups[row].padNear;
row_padFar = batch.groups[row].padFar;
`,`row_drawCount = batch.groups[row].drawCount;
row_capacity = batch.groups[row].capacity;
row_ringT1 = batch.groups[row].ringT1;
row_ringT2 = batch.groups[row].ringT2;
row_ringBand = batch.groups[row].ringBand;
row_ringRadius = batch.groups[row].ringRadius;
row_ringBias = batch.groups[row].ringBias;
`,`row_packedMirror = batch.groups[row].packedMirror;
row_ringErrorPx = batch.groups[row].ringErrorPx;
row_variant = batch.groups[row].variant;
row_packedRadius = batch.groups[row].packedRadius;
row_packedQualityKeep = batch.groups[row].packedQualityKeep;
row_ringCoarseNear = batch.groups[row].ringCoarseNear;
`,`row_packedLaw = batch.groups[row].packedLaw;
row_packedLevelLaw = batch.groups[row].packedLevelLaw;
row_packedLevelDraws = batch.groups[row].packedLevelDraws;
row_transformsBase = batch.groups[row].transformsBase;
row_boundsBase = batch.groups[row].boundsBase;
row_survivorsBase = batch.groups[row].survivorsBase;
row_slotDrawsBase = batch.groups[row].slotDrawsBase;
row_drawWindowsBase = batch.groups[row].drawWindowsBase;
row_recordsBase = batch.groups[row].recordsBase;
row_memoryBase = batch.groups[row].memoryBase;
row_slotDrawsLength = batch.groups[row].slotDrawsLength;
row_recordsLength = batch.groups[row].recordsLength;
row_workgroupStart = batch.groups[row].workgroupStart;
row_boundsPatches = batch.groups[row].boundsPatches;
`,`row_packedNearRadius = batch.groups[row].packedNearRadius;
`,`row_leaseIgnore = batch.groups[row].leaseIgnore;
`,`let packedShape = row_variant == VARIANT_PACKED;
let ringShape = row_variant == VARIANT_RING;
let shadowView = row_variant == VARIANT_SHADOW || row_variant == VARIANT_SHADOW_MULTI;
let slot = (workgroupIndex - row_workgroupStart) * 64u + lane;
var mainKey = AGG_INVALID_KEY;
var shadowKey = AGG_INVALID_KEY;
var castMask = 0u;
var castLevel = 0u;
var ring = 0u;
`,`if (slot < row_activeCount) {
var occupied = false;
var sphere = vec4<f32>(0.0, 0.0, 0.0, -1.0);
var center = vec3<f32>(0.0);
var worldPos = vec3<f32>(0.0);
var radius = 0.0;
var candidateId = 0u;
var law3D = false;
var rootDistanceNow = 0.0;
var rootDistancePrev = 0.0;
var patchMin = vec2<f32>(0.0);
var patchSize = 0.0;
var patchTop = 0.0;
var patchFloor = 0.0;
var skylineRead = false;
var patchBoxRead = false;
if (packedShape) {
let recordBase = row_recordsBase + slot * 6u;
let packedTintCoverage = records[recordBase + 4u];
occupied = (packedTintCoverage >> 24u) != 0u;
if (occupied) {
center = vec3<f32>(
bitcast<f32>(records[recordBase]),
bitcast<f32>(records[recordBase + 1u]),
bitcast<f32>(records[recordBase + 2u]),
) + recordsShift();
worldPos = center;
candidateId = records[recordBase + 5u];
radius = row_packedRadius;
ring = cull_packedLevelDraw(worldPos, row_packedLevelLaw.w, candidateId);
law3D = row_packedLaw.x > 0.5;
rootDistanceNow = select(length(worldPos.xz - camera.focus.xz), length(worldPos - camera.focus), law3D);
rootDistancePrev = select(length(worldPos.xz - camera.prevFocus.xz), length(worldPos - camera.prevFocus), law3D);
let qualityKeep = max(row_packedQualityKeep, max(cull_nearKeep(rootDistanceNow), cull_nearKeep(rootDistancePrev)));
occupied = qualityKeep >= 1.0 || (qualityKeep > 0.0 && qualityKeep > cull_stableThreshold(candidateId, 0x9e3779b9u) - 0.0001);
}
} else {
let boundsPatches = max(row_boundsPatches, 1u);
let boundsSlot = slot / boundsPatches;
sphere = bounds_buf[row_boundsBase + boundsSlot];
occupied = sphere.w >= 0.0;
if (row_variant == VARIANT_SHADOW && slot < row_recordsLength && (records[row_recordsBase + slot] & ~row_leaseIgnore) != 0u) { occupied = false; }
if (ringShape && boundsPatches > 1u && bitcast<vec2<f32>>(drawWindows[row_drawWindowsBase + 2u * slot]).x == -1000000000.0) { occupied = false; if (camera.memoryOwner != 0.0) { slotMemory[row_memoryBase + slot] = 0u; } }
if (occupied) {
let m = transforms[row_transformsBase + boundsSlot];
let shift = rowShift(m);
var local = sphere.xyz;
var localRadius = abs(sphere.w);
if (boundsPatches > 1u) {
let patchSlot = slot % boundsPatches;
let p = vec2<f32>(f32(patchSlot % 4u), f32(patchSlot / 4u));
let half = sphere.x;
let side = 4.0;
`,`local = vec3<f32>(half * (2.0 * p.x + 1.0) / side, sphere.y, half * (2.0 * p.y + 1.0) / side);
localRadius = sqrt(max(sphere.w * sphere.w - 2.0 * half * half * (1.0 - 1.0 / (side * side)), 0.0));
patchSize = 2.0 * half / side;
patchMin = m[3].xz + shift.xz + p * patchSize;
`,`let rangeAt = 2u * slot;
if (ringShape && rangeAt + 1u < row_slotDrawsLength) {
let topWord = bitcast<f32>(slotDraws[row_slotDrawsBase + rangeAt]);
let floorWord = bitcast<f32>(slotDraws[row_slotDrawsBase + rangeAt + 1u]);
patchTop = m[3].y + shift.y + topWord;
patchFloor = m[3].y + shift.y + floorWord;
skylineRead = camera.skylineOn != 0.0;
patchBoxRead = topWord < 1e+30 && floorWord > -1e+30;
}
}
center = (m * vec4<f32>(local, 1.0)).xyz + shift;
let scaleSq = max(dot(m[0].xyz, m[0].xyz), max(dot(m[1].xyz, m[1].xyz), dot(m[2].xyz, m[2].xyz)));
radius = localRadius * sqrt(scaleSq);
worldPos = m[3].xyz + shift;
}
}
if (occupied) {
if (ringShape) {
let dRing = max(length(center.xz - camera.camPos.xz) - row_ringRadius, 0.0);
let prev = min(slotMemory[row_memoryBase + slot], 5u);
let t1 = row_ringT1 + select(row_ringBand, -row_ringBand, prev >= 1u);
let t2 = row_ringT2 + select(row_ringBand, -row_ringBand, prev >= 2u);
if (dRing > t1) { ring = 1u; }
if (dRing > t2) { ring = 2u; }
if (ringErrorRuleOn()) {
let errorsAt = row_drawWindowsBase + 2u * slot;
let e = bitcast<vec2<f32>>(drawWindows[errorsAt]);
let clipW = camera.projectionDepthScale * max(dRing, max(camera.camNear, 0.05)) + camera.projectionDepthOffset;
let pxScale = max(camera.focalPixels, camera.orthoPixels) / max(clipW, 1e-4);
let tol = row_ringErrorPx * select(vec4<f32>(1.0), vec4<f32>(1.25), vec4<u32>(prev) >= vec4<u32>(1u, 2u, 3u, 4u));
var errRing = 0u;
if (max(e.x, 0.0) * pxScale <= tol.x) { errRing = 1u; }
if (max(e.y, 0.0) * pxScale <= tol.y) { errRing = 2u; }
let coarseFar = dRing >= 120.0;
if (errRing == 2u && (coarseFar || row_ringCoarseNear != 0u)) {
let coarse = bitcast<vec2<f32>>(drawWindows[errorsAt + 1u]);
if (select(coarse.x == 0.0, max(coarse.x, 0.0) * pxScale <= tol.z, coarseFar)) { errRing = 3u; }
if (errRing == 3u && select(coarse.y == 0.0, max(coarse.y, 0.0) * pxScale <= tol.w, coarseFar)) { errRing = select(4u, 5u, coarse.y == 0.0 && row_ringCoarseNear != 0u); }
}
ring = errRing;
}
`,`}
`,`shadowKey = 6u + ringKeyFor(ring);
}
`,`castLevel = mainKeyFor(slot, ring);
}
`,`}
}
`,`}
`],KU=(e)=>e.reduce((e,t,r)=>e+t+AU[r+1],AU[0]??""),LU=KU([`var<private> row_lodMode: f32;
var<private> row_lodNear: f32;
var<private> row_lodFar: f32;
var<private> row_lodDensity: f32;
`,`var<private> row_sizeCullPx: f32;
`,`var<private> row_packedRegion0: vec4<f32>;
var<private> row_packedRegion1: vec4<f32>;
var<private> row_packedRegion2: vec4<f32>;
`,`var<private> row_fogs: u32;
`,`var<private> row_packedCoverHeight: f32;
`,`var<private> row_slotKeysAt: u32;
var<private> row_familySizesAt: u32;
`,`const AGG_PARTS = 5u;
var<workgroup> aggKeys: array<u32, 320>;
var<workgroup> aggBases: array<u32, 320>;
var<workgroup> aggPlaces: array<u32, 320>;
const SURVIVOR_KEY_NONE = 0x3ffffffu;
const SURVIVOR_RANK_BITS = 6u;
const SURVIVOR_RANK_MASK = 0x3fu;
`,`fn planeDistance(index: u32, p: vec3<f32>) -> f32 {
let plane = camera.planes[index];
return dot(plane.xyz, p) + plane.w;
}
@group(1) @binding(9) var coverMask: texture_depth_2d_array;
@group(1) @binding(10) var coverBefore: texture_depth_2d_array;
fn decor_coverTexel(mask: texture_depth_2d_array, texel: vec2<i32>, first: f32, movers: bool) -> f32 {
let layers = textureNumLayers(mask);
var held = first;
if (movers && layers > 1u) { held = min(held, textureLoad(mask, texel, 1, 0)); }
if (layers > 2u) { held = min(held, textureLoad(mask, texel, 2, 0)); }
return held;
}
fn decor_coverSurface(depth: f32, yMin: f32, yRange: f32) -> f32 {
if (depth >= 1.0) { return 1e9; }
return yMin + depth * yRange;
}
fn cull_coverHolds(depth: f32, rootY: f32, height: f32) -> bool {
let overRoot = decor_coverSurface(depth, camera.coverBand.y, camera.coverBand.z) - rootY;
return overRoot > -1.0 + 0.01 && overRoot < height + 0.35 - 0.01;
}
fn cull_heldCovered(texel: vec2<i32>, held: f32, rootY: f32, height: f32) -> bool {
return cull_coverHolds(decor_coverTexel(coverMask, texel, held, false), rootY, height) && cull_coverHolds(decor_coverTexel(coverMask, texel, held, true), rootY, height);
}
fn cull_packedCovered(root: vec3<f32>, height: f32) -> bool {
let window = camera.coverWindow;
if (window.w <= 0.0 || height <= 0.0) { return false; }
let u = (root.x - window.x) * window.z;
let v = (root.z - window.y) * window.z;
if (!(u >= 0.0 && v >= 0.0 && u < window.w && v < window.w)) { return false; }
let fu = fract(u);
let fv = fract(v);
if (fu < 0.02 || fu > 0.98 || fv < 0.02 || fv > 0.98) { return false; }
let texel = vec2<i32>(i32(floor(u)), i32(floor(v)));
return cull_heldCovered(texel, textureLoad(coverMask, texel, 0, 0), root.y, height) && (camera.coverBand.w <= 0.0 || cull_heldCovered(texel, textureLoad(coverBefore, texel, 0, 0), root.y, height));
}
fn cull_hash2D(p: vec2<f32>) -> f32 {
return fract(sin(dot(p, vec2<f32>(127.1, 311.7))) * 43758.5453123);
}
`,`fn cull_tailMayStand(distance: f32, tailThreshold: f32) -> bool {
let reach = row_packedLaw.y * max(distance, 0.0);
let near = 1.0 / max(reach, 1.0);
return near * near > tailThreshold;
}
fn cull_propMayStand(distance: f32, t: f32, region: vec4<f32>, rampThreshold: f32, tailThreshold: f32) -> bool {
let full = max(region.z, 0.0);
let ramp = 1.0 - smoothstep(full, max(region.w, full + 1e-4), distance);
return ramp > rampThreshold && cull_tailMayStand(t, tailThreshold);
}
fn cull_packedRegion(slot: u32) -> vec4<f32> {
if (slot >= u32(row_packedRegion0.x) && slot < u32(row_packedRegion0.x + row_packedRegion0.y)) { return row_packedRegion0; }
if (slot >= u32(row_packedRegion1.x) && slot < u32(row_packedRegion1.x + row_packedRegion1.y)) { return row_packedRegion1; }
if (slot >= u32(row_packedRegion2.x) && slot < u32(row_packedRegion2.x + row_packedRegion2.y)) { return row_packedRegion2; }
return vec4<f32>(0.0);
}
`,`var<private> packedFadeKey: u32;
var<private> packedFadeWords: vec2<u32>;
`,`packedFadeKey = 0xffffffffu;
`,`let draw = cull_packedLevelOf(term, cap);
let octave = log2(term) - round(log2(cap));
let edge = round(octave);
let offset = octave - edge;
let halfBand = clamp(log2(1.0 + 0.75 / max(distance, 1e-4)), 0.0625, 0.375);
if (packedFadeOn() && edge >= -3.0 && edge <= 0.0 && abs(offset) < halfBand && row_capacity <= 16777216u) {
let fine = cull_packedLevelOf(cap * exp2(edge - 0.5), cap);
let coarse = cull_packedLevelOf(cap * exp2(edge + 0.5), cap);
let share = u32(round((offset + halfBand) * 31.0 / halfBand));
if (fine != coarse && share > 0u && share < 62u && (draw == fine || draw == coarse)) {
let fineWord = 2147483648u | (share << 24u);
let coarseWord = fineWord | 1073741824u;
packedFadeKey = select(coarse, fine, draw == coarse);
packedFadeWords = select(vec2<u32>(fineWord, coarseWord), vec2<u32>(coarseWord, fineWord), draw == coarse);
}
}
return draw;
}
fn cull_cascadeFitsMet(center: vec3<f32>, radius: f32) -> u32 {
let castRadius = radius * (1.0 + row_padXY) + 0.01;
let reach = -castRadius;
let at = vec4<f32>(center, 1.0);
var met = 0u;
if ((cascadeFits.has.x == 1u) & (dot(cascadeFits.planes[0], at) >= reach) & (dot(cascadeFits.planes[1], at) >= reach) & (dot(cascadeFits.planes[2], at) >= reach) & (dot(cascadeFits.planes[3], at) >= reach) & (dot(cascadeFits.planes[4], at) >= reach) & (dot(cascadeFits.planes[5], at) >= reach) & (dot(cascadeFits.hull[0], at) >= reach) & (dot(cascadeFits.hull[1], at) >= reach) & (dot(cascadeFits.hull[2], at) >= reach) & (dot(cascadeFits.hull[3], at) >= reach) & (dot(cascadeFits.hull[4], at) >= reach) & (dot(cascadeFits.hull[5], at) >= reach) & (dot(cascadeFits.hull[6], at) >= reach) & (dot(cascadeFits.hull[7], at) >= reach)) { met = met | 1u; }
if ((cascadeFits.has.y == 1u) & (dot(cascadeFits.planes[6], at) >= reach) & (dot(cascadeFits.planes[7], at) >= reach) & (dot(cascadeFits.planes[8], at) >= reach) & (dot(cascadeFits.planes[9], at) >= reach) & (dot(cascadeFits.planes[10], at) >= reach) & (dot(cascadeFits.planes[11], at) >= reach) & (dot(cascadeFits.hull[8], at) >= reach) & (dot(cascadeFits.hull[9], at) >= reach) & (dot(cascadeFits.hull[10], at) >= reach) & (dot(cascadeFits.hull[11], at) >= reach) & (dot(cascadeFits.hull[12], at) >= reach) & (dot(cascadeFits.hull[13], at) >= reach) & (dot(cascadeFits.hull[14], at) >= reach) & (dot(cascadeFits.hull[15], at) >= reach)) { met = met | 2u; }
if ((cascadeFits.has.z == 1u && cascadeFits.props.x > 2u) & (dot(cascadeFits.planes[12], at) >= reach) & (dot(cascadeFits.planes[13], at) >= reach) & (dot(cascadeFits.planes[14], at) >= reach) & (dot(cascadeFits.planes[15], at) >= reach) & (dot(cascadeFits.planes[16], at) >= reach) & (dot(cascadeFits.planes[17], at) >= reach) & (dot(cascadeFits.hull[16], at) >= reach) & (dot(cascadeFits.hull[17], at) >= reach) & (dot(cascadeFits.hull[18], at) >= reach) & (dot(cascadeFits.hull[19], at) >= reach) & (dot(cascadeFits.hull[20], at) >= reach) & (dot(cascadeFits.hull[21], at) >= reach) & (dot(cascadeFits.hull[22], at) >= reach) & (dot(cascadeFits.hull[23], at) >= reach)) { met = met | 4u; }
return met;
`,`fn packedFadeOn() -> bool {
return (row_ringBias & 2147483648u) != 0u && packedFadeBase() > 0u;
}
`,`fn aggPlace(base: u32, key: u32, own: u32) -> vec3<u32> {
var leader = AGG_INVALID_KEY;
var rank = 0u;
var count = 0u;
for (var entry = 0u; entry < 64u; entry = entry + 1u) {
if (aggKeys[base + entry] == key) {
leader = min(leader, entry);
rank = rank + select(0u, 1u, entry < own);
count = count + 1u;
}
}
return vec3<u32>(leader, rank, count);
}
`,"",`fn skylineHides(patchMin: vec2<f32>, size: f32, top: f32) -> bool {
let half = size * 0.5;
let c = patchMin + vec2<f32>(half) - camera.skylineEye.xz;
let halfDiag = half * 1.4142135;
let slack = camera.skylineSlack.x;
let d = length(c);
let near = d - halfDiag - slack;
if (near <= 0.0) { return false; }
let far = d + halfDiag + slack;
let span = asin(min(1.0, (halfDiag + slack) / d));
let centre = atan2(c.y, c.x);
let rise = top - (camera.skylineEye.y - camera.skylineSlack.y);
let slope = select(rise / far, rise / near, rise >= 0.0);
let binRad = 0.01227184630308513;
let first = i32(floor((centre - span) / binRad));
let last = i32(floor((centre + span) / binRad));
let n = min(last - first + 1, 512);
for (var k = 0; k < n; k = k + 1) {
let b = u32(((first + k) % 512 + 512) % 512);
let words = camera.skyline[b >> 1u];
let lane = (b & 1u) * 2u;
if (!(slope < words[lane] && words[lane + 1u] < near)) { return false; }
}
return true;
}
fn eyeGateHides(e: u32, c: vec3<f32>, h: vec3<f32>, r: f32) -> bool {
let m = camera.eyeViewProj[e];
let rowW = vec3<f32>(m[0].w, m[1].w, m[2].w);
let w = dot(rowW, c) + m[3].w;
let near = camera.eyeGate[1u + e];
let reach = dot(abs(rowW), h);
let nearest = w - min(r * length(rowW), reach);
if (!(w - reach > near * 0.5) || !(nearest > near)) { return false; }
var lo = vec2<f32>(3e38);
var hi = vec2<f32>(-3e38);
for (var k = 0u; k < 8u; k = k + 1u) {
let p = c + vec3<f32>(select(-h.x, h.x, (k & 1u) != 0u), select(-h.y, h.y, (k & 2u) != 0u), select(-h.z, h.z, (k & 4u) != 0u));
let clip = m * vec4<f32>(p, 1.0);
let s = vec2<f32>((clip.x / clip.w + 1.0) * 8.0, (1.0 - clip.y / clip.w) * 8.0);
lo = min(lo, s);
hi = max(hi, s);
}
if (hi.x < 0.0 || hi.y < 0.0 || lo.x > 16.0 || lo.y > 16.0) { return true; }
let c0 = u32(clamp(floor(lo.x), 0.0, 15.0));
let c1 = u32(clamp(floor(hi.x), 0.0, 15.0));
let r0 = u32(clamp(floor(lo.y), 0.0, 15.0));
let r1 = u32(clamp(floor(hi.y), 0.0, 15.0));
if ((c1 - c0 + 1u) * (r1 - r0 + 1u) > 64u) { return false; }
let limit = nearest - nearest * 0.0002 - 0.004;
let base = e * 256u;
for (var row = r0; row <= r1; row = row + 1u) {
for (var col = c0; col <= c1; col = col + 1u) {
let i = base + row * 16u + col;
if (!(camera.eyeCells[i >> 2u][i & 3u] < limit)) { return false; }
}
}
return true;
}
fn fogHides(c: vec3<f32>, r: f32) -> bool {
let whole = camera.fogCull.x;
if (whole <= 0.0) {
return false;
}
let d = c - camera.camPos;
if (dot(camera.planes[4].xyz, d) - r < whole) {
return false;
}
let length2 = dot(d, d);
let s = sqrt(max(length2 - r * r, 0.0));
let h = length(d.xz);
if (h * s - d.y * r < 0.0 || d.y * s + h * r > camera.fogCull.y * length2) {
return false;
}
return camera.fogCull.z <= -1.0 || (h * s + d.y * r >= 0.0 && d.y * s - h * r >= camera.fogCull.z * length2);
}
fn patchBoxOutside(lo: vec3<f32>, hi: vec3<f32>, padXY: f32, padNear: f32, padFar: f32) -> bool {
let halfDiagonal = 0.5 * length(hi - lo);
for (var i = 0u; i < 6u; i = i + 1u) {
let normal = camera.planes[i].xyz;
let corner = select(lo, hi, normal >= vec3<f32>(0.0));
var slack = 0.05 + halfDiagonal * max(select(select(padFar, padNear, i == 4u), padXY, i < 4u), 0.0);
if (i == 4u) { slack = slack + camera.camNear; }
if (planeDistance(i, corner) < -slack) { return true; }
}
return false;
}
fn eyesHide(c: vec3<f32>, h: vec3<f32>, r: f32) -> bool {
let eyes = min(u32(max(camera.eyeGate.x, 0.0)), 2u);
if (eyes == 0u) { return false; }
for (var e = 0u; e < eyes; e = e + 1u) {
if (!eyeGateHides(e, c, h, r)) { return false; }
}
return true;
}
${cGn}@group(0) @binding(2) var<uniform> occView: OcclusionView;
@group(0) @binding(3) var<uniform> occTexels: array<vec4<f32>, 992>;
fn occ_texel(i: u32) -> f32 {
return occTexels[i >> 2u][i & 3u];
`,`fn sliceHides(lo: vec3<f32>, hi: vec3<f32>) -> bool {
if (occView.hides == 0u) { return false; }
let b = occ_box(lo, hi, occView.viewProj);
return b.state == OCC_PROJECTED && occ_hidden(b);
`,`row_lodMode = batch.groups[row].lodMode;
row_lodNear = batch.groups[row].lodNear;
row_lodFar = batch.groups[row].lodFar;
row_lodDensity = batch.groups[row].lodDensity;
`,`row_sizeCullPx = batch.groups[row].sizeCullPx;
`,`row_packedRegion0 = batch.groups[row].packedRegion0;
row_packedRegion1 = batch.groups[row].packedRegion1;
row_packedRegion2 = batch.groups[row].packedRegion2;
`,`row_fogs = batch.groups[row].fogs;
`,`row_packedCoverHeight = batch.groups[row].packedCoverHeight;
`,`row_slotKeysAt = batch.groups[row].slotKeysAt;
row_familySizesAt = batch.groups[row].familySizesAt;
`,`var ringFiles = true;
var ringBits = 0u;
var fadeKey = AGG_INVALID_KEY;
var mainFadeBits = 0u;
var fadeFadeBits = 0u;
`,`var ringChunk = ringShape && row_ringCoarseNear != 0u && ringErrorRuleOn();
if (ringChunk) {
let chunkErrorsAt = row_drawWindowsBase + 2u * (slot - patchSlot);
for (var q = 0u; q < 16u; q = q + 1u) {
ringChunk = ringChunk && bitcast<vec2<f32>>(drawWindows[chunkErrorsAt + 2u * q + 1u]).y == 0.0;
}
}
if (ringChunk) {
ringFiles = patchSlot == 0u || patchSlot == 15u;
ringBits = 2147483648u;
patchSize = 2.0 * half;
patchMin = m[3].xz + shift.xz;
} else {
`,`}
`,`if (camera.memoryOwner != 0.0) { slotMemory[row_memoryBase + slot] = select(ring, 6u, ringBits != 0u); }
}
let sideSlack = -(radius * (1.0 + row_padXY));
let nearSlack = -(radius * (1.0 + row_padNear) + camera.camNear);
var inFrustum = planeDistance(0u, center) >= sideSlack;
inFrustum = inFrustum && (planeDistance(1u, center) >= sideSlack);
inFrustum = inFrustum && (planeDistance(2u, center) >= sideSlack);
inFrustum = inFrustum && (planeDistance(3u, center) >= sideSlack);
inFrustum = inFrustum && (planeDistance(4u, center) >= nearSlack);
inFrustum = inFrustum && !pastViewFar(center, radius, slot);
let patchLo = vec3<f32>(patchMin.x, min(patchFloor, patchTop), patchMin.y);
let patchHi = vec3<f32>(patchMin.x + patchSize, patchTop, patchMin.y + patchSize);
inFrustum = inFrustum && !(patchBoxRead && patchBoxOutside(patchLo, patchHi, row_padXY, row_padNear, row_padFar));
inFrustum = inFrustum && !(skylineRead && skylineHides(patchMin, patchSize, patchTop));
let gatePad = max(max(row_padXY, row_padNear), max(row_padFar, 0.0));
var occRadius = radius * (1.0 + gatePad);
var occLo = center - vec3<f32>(occRadius);
var occHi = center + vec3<f32>(occRadius);
if (patchBoxRead) {
let grow = 0.05 + 0.5 * length(patchHi - patchLo) * gatePad;
occLo = patchLo - vec3<f32>(grow);
occHi = patchHi + vec3<f32>(grow);
occRadius = 0.5 * length(occHi - occLo);
}
inFrustum = inFrustum && !((ringShape || packedShape) && !shadowView && eyesHide(0.5 * (occLo + occHi), 0.5 * (occHi - occLo), occRadius));
if (inFrustum && (ringShape || packedShape) && !shadowView) {
inFrustum = !sliceHides(occLo, occHi);
}
let fogged = row_fogs != 0u || (keyedShape() && slot < row_slotDrawsLength && (slotDraws[row_slotDrawsBase + slot] & SLOT_DRAW_FOGGED) != 0u);
inFrustum = inFrustum && !(!shadowView && fogged && fogHides(center, radius * (1.0 + gatePad)));
var farKeep = true;
var keep = true;
if (!shadowView) {
let d = length(worldPos - camera.camPos);
var inRange = true;
if (row_maxDistance > 0.0) {
inRange = d <= row_maxDistance;
}
var pKeep = 1.0;
if (row_lodMode > 0.5) {
let lodFar = max(row_lodFar, row_lodNear + 1e-4);
let t = clamp((d - row_lodNear) / (lodFar - row_lodNear), 0.0, 1.0);
let smoothT = t * t * (3.0 - 2.0 * t);
let dFar = max(d - row_lodNear, 0.0);
let keepExp = pow(2.7182818, -(dFar * dFar * row_lodDensity * row_lodDensity));
let keepRange = 1.0 - smoothT;
pKeep = select(keepRange, keepExp, row_lodMode > 1.5);
}
var sizeHashKeep = true;
var slotWord = 0u;
if (!packedShape && slot < row_slotDrawsLength) { slotWord = slotDraws[row_slotDrawsBase + slot]; }
var bodyKey = select(slot, candidateId, packedShape);
if (row_slotKeysAt != 0u) { bodyKey = slotDraws[row_slotDrawsBase + row_slotKeysAt + slot]; }
let floorExempt = (slotWord & SLOT_DRAW_FLOOR_EXEMPT) != 0u;
if (!ringShape && !floorExempt && row_sizeCullPx > 0.0 && (camera.focalPixels > 0.0 || camera.orthoPixels > 0.0)) {
let viewDepth = planeDistance(4u, center) + camera.camNear;
let clipW = camera.projectionDepthScale * viewDepth + camera.projectionDepthOffset;
let pixelScale = max(camera.focalPixels, camera.orthoPixels) * select(1.0, camera.rasterShare, packedShape) / max(clipW, 1e-4);
var floorPx = row_sizeCullPx;
let verdictKey = (bodyKey ^ bitcast<u32>(sphere.w)) & 0xfffffffcu;
if (!packedShape) {
let held = slotMemory[row_memoryBase + slot];
let verdict = select(0u, held & 3u, (held & 0xfffffffcu) == verdictKey);
floorPx = floorPx * select(1.0, select(1.0 - SIZE_FLOOR_HYSTERESIS, 1.0 + SIZE_FLOOR_HYSTERESIS, verdict == SLOT_FLOORED), verdict != 0u);
}
let sizeT = clamp((max(radius, select(0.0, bitcast<f32>(slotDraws[row_slotDrawsBase + row_familySizesAt + slot]), row_familySizesAt != 0u)) * pixelScale) / floorPx - 1.0, 0.0, 1.0);
let sizeKeep = sizeT * sizeT * (3.0 - 2.0 * sizeT);
sizeHashKeep = cull_hashId(bodyKey, 0x63d83595u) < sizeKeep;
if (!packedShape) {
if (camera.memoryOwner != 0.0) { slotMemory[row_memoryBase + slot] = verdictKey | select(SLOT_FLOORED, SLOT_STANDING, sizeHashKeep); }
}
}
if (!ringShape && (slotWord & 536870912u) == 0u && camera.farReach > 0.0 && row_padFar < 1e29) {
let farT = clamp((length(center - camera.camPos) - radius - camera.farReach) / (camera.farReach * 0.25), 0.0, 1.0);
let farShare = 1.0 - farT * farT * (3.0 - 2.0 * farT);
farKeep = cull_hashId(bodyKey, 0x5bd1e995u) < farShare;
}
if (packedShape) {
let lodHash = cull_hashId(candidateId, 0xa511e9b3u);
let region = cull_packedRegion(slot);
let rampThreshold = max(cull_stableThreshold(candidateId, 0x27d4eb2fu) - 0.05 - 0.0001, 0.0);
let tailThreshold = cull_stableThreshold(candidateId, 0x165667b1u) - 0.0001;
let focusNow = length(worldPos - camera.focus);
let focusPrev = length(worldPos - camera.prevFocus);
let propRootMayBeVisible = cull_propMayStand(rootDistanceNow, focusNow, region, rampThreshold, tailThreshold) || cull_propMayStand(rootDistancePrev, focusPrev, region, rampThreshold, tailThreshold);
let coverRootMayBeVisible = cull_tailMayStand(focusNow, tailThreshold) || cull_tailMayStand(focusPrev, tailThreshold);
let rootMayBeVisible = region.y > 0.0 && (rootDistanceNow < region.w || rootDistancePrev < region.w) && select(propRootMayBeVisible, coverRootMayBeVisible, law3D);
keep = inRange && (lodHash < pKeep) && sizeHashKeep && rootMayBeVisible;
} else {
let lodHash = cull_hash2D(worldPos.xz + vec2<f32>(73.1579, 137.8631));
keep = inRange && (lodHash < pKeep) && sizeHashKeep;
}
`,`keep = keep && ringFiles;
if (ringShape && keep) {
`,`if (packedShape && keep && row_packedMirror > 0u) {
castMask = cull_cascadeFitsMet(center, radius);
`,`let covered = packedShape && !shadowView && keep && farKeep && inFrustum && cull_packedCovered(worldPos, row_packedCoverHeight);
if (keep && farKeep && inFrustum && !covered) {
mainKey = mainKeyFor(slot, ring);
if (packedShape && packedFadeKey != AGG_INVALID_KEY) {
let fadeDraw = min(packedFadeKey, packedLevelCount() - 1u);
if (fadeDraw != mainKey) {
fadeKey = packedFadeBase() + fadeDraw;
mainKey = packedFadeBase() + mainKey;
mainFadeBits = packedFadeWords.x;
fadeFadeBits = packedFadeWords.y;
}
}
}
}
}
aggKeys[lane] = mainKey;
aggKeys[64u + lane] = select(shadowKey, row_packedMirror * 1u + castLevel, (castMask & 1u) != 0u);
aggKeys[128u + lane] = select(AGG_INVALID_KEY, row_packedMirror * 2u + castLevel, (castMask & 2u) != 0u);
aggKeys[192u + lane] = select(AGG_INVALID_KEY, row_packedMirror * 3u + castLevel, (castMask & 4u) != 0u);
aggKeys[256u + lane] = fadeKey;
workgroupBarrier();
for (var part = 0u; part < AGG_PARTS; part = part + 1u) {
let at = part * 64u;
let key = aggKeys[at + lane];
if (key != AGG_INVALID_KEY && (part == 0u || batch.tableStride == 0u)) {
let place = aggPlace(at, key, lane);
aggPlaces[at + lane] = place.x | (place.y << 16u);
if (place.x == lane) { aggBases[at + lane] = aggFlush(key, place.z); }
}
}
if (batch.tableStride != 0u) {
var word = SURVIVOR_KEY_NONE << SURVIVOR_RANK_BITS;
if (mainKey != AGG_INVALID_KEY) { word = (mainKey << SURVIVOR_RANK_BITS) | (aggPlaces[lane] >> 16u); }
if (workgroupIndex - row_workgroupStart < (row_activeCount + 63u) / 64u) {
for (var key = lane; key < row_drawCount; key = key + 64u) {
var count = 0u;
for (var entry = 0u; entry < 64u; entry = entry + 1u) { count = count + select(0u, 1u, aggKeys[entry] == key); }
survivors[key * batch.tableStride + workgroupIndex] = count;
}
if (slot < row_activeCount) { survivors[batch.laneBase + workgroupIndex * 64u + lane] = word; }
}
}
workgroupBarrier();
if (batch.tableStride == 0u) {
for (var part = 0u; part < AGG_PARTS; part = part + 1u) {
let at = part * 64u;
let key = aggKeys[at + lane];
if (key != AGG_INVALID_KEY) {
let place = aggPlaces[at + lane];
let window = windowFor(key);
let writeIndex = aggBases[at + (place & 0xffffu)] + (place >> 16u);
let fadeBits = select(0u, select(mainFadeBits, fadeFadeBits, part == AGG_PARTS - 1u), part == 0u || part == AGG_PARTS - 1u);
if (writeIndex < window.y) { survivors[row_survivorsBase + window.x + writeIndex] = slot | fadeBits | ringBits; }
}
`,""]),ZO=KU(["","","","","","","","","","","",`return cull_packedLevelOf(term, cap);
`,"","",`fn cull_cascadesWithFit() -> u32 {
var met = 0u;
if (cascadeFits.has.x == 1u) { met = met | 1u; }
if (cascadeFits.has.y == 1u) { met = met | 2u; }
if (cascadeFits.has.z == 1u && cascadeFits.props.x > 2u) { met = met | 4u; }
return met;
}
fn planeDistance(index: u32, p: vec3<f32>) -> f32 {
let plane = camera.planes[index];
return dot(plane.xyz, p) + plane.w;
}
`,`fn cull_inView(center: vec3<f32>, radius: f32, worldPos: vec3<f32>, shadowView: bool, slot: u32) -> bool {
let sideSlack = -(radius * (1.0 + row_padXY));
var inView = planeDistance(0u, center) >= sideSlack && planeDistance(1u, center) >= sideSlack && planeDistance(2u, center) >= sideSlack && planeDistance(3u, center) >= sideSlack;
inView = inView && planeDistance(4u, center) >= -(radius * (1.0 + row_padNear) + camera.camNear) && !pastViewFar(center, radius, slot);
return inView && (shadowView || row_maxDistance <= 0.0 || length(worldPos - camera.camPos) <= row_maxDistance);
`,`fn keepSlot(slot: u32, key: u32) {
let window = windowFor(key);
let base = aggFlush(key, 1u);
if (base < window.y) { survivors[row_survivorsBase + window.x + base] = slot; }
`,"","","","","","","","","",`if (camera.memoryOwner != 0.0) { slotMemory[row_memoryBase + slot] = ring; }
`,`if (ringShape) {
`,`if (packedShape && row_packedMirror > 0u) {
castMask = cull_cascadesWithFit();
`,`if (cull_inView(center, radius, worldPos, shadowView, slot)) { mainKey = mainKeyFor(slot, ring); }
`,`if (mainKey != AGG_INVALID_KEY) { keepSlot(slot, mainKey); }
if (shadowKey != AGG_INVALID_KEY) { keepSlot(slot, shadowKey); }
if ((castMask & 1u) != 0u) { keepSlot(slot, row_packedMirror * 1u + castLevel); }
if ((castMask & 2u) != 0u) { keepSlot(slot, row_packedMirror * 2u + castLevel); }
if ((castMask & 4u) != 0u) { keepSlot(slot, row_packedMirror * 3u + castLevel); }
`]),QO=`${LU.slice(0,1770)}@group(1) @binding(1) var<storage, read> scratch: array<u32>;
${LU.slice(1843,2517)}${LU.slice(2804,2869)}var<private> row_variant: u32;
var<private> row_survivorsBase: u32;
${LU.slice(3682,3721)}${LU.slice(3866,3904)}${LU.slice(4156,4501)}${LU.slice(4686,5064)}${LU.slice(12544,12948)}var<workgroup> keyBases: array<u32, 64>;
${LU.slice(23645,23818)}${LU.slice(23907,24047)}${LU.slice(24432,24520)}${LU.slice(24878,24919)}${LU.slice(25506,25559)}${LU.slice(25612,25669)}${LU.slice(25875,25930)}let start = row_workgroupStart;
if (batch.prefixBase == 0u && workgroupIndex < batch.tableStride && lane < row_drawCount) {
var before = 0u;
for (var column = start; column < workgroupIndex; column = column + 1u) { before = before + scratch[lane * batch.tableStride + column]; }
keyBases[lane] = before;
}
workgroupBarrier();
let slot = (workgroupIndex - start) * 64u + lane;
if (slot >= row_activeCount) { return; }
let word = scratch[batch.laneBase + workgroupIndex * 64u + lane];
let key = word >> SURVIVOR_RANK_BITS;
if (key == SURVIVOR_KEY_NONE) { return; }
let window = windowFor(key);
var base = 0u;
if (batch.prefixBase == 0u) {
base = keyBases[key];
} else {
let counts = batch.prefixBase + key * batch.tableStride;
base = scratch[counts + workgroupIndex] - scratch[counts + start];
}
let place = base + (word & SURVIVOR_RANK_MASK);
if (place < window.y) { survivors[row_survivorsBase + window.x + place] = slot; }
}
`;var Qy=(function(e){let t=new Map;return function(){let r=wsx();return JPf(t,r,e)}});var Uy=Qy((e)=>[{binding:0,visibility:e,buffer:{type:"uniform"}},{binding:1,visibility:e,buffer:{type:"storage"}},{binding:2,visibility:e,buffer:{type:"uniform"}},{binding:3,visibility:e,buffer:{type:"uniform"}}]),Lmj=Qy((e)=>[{binding:0,visibility:e,buffer:{type:"uniform"}},{binding:1,visibility:e,buffer:{type:"read-only-storage"}},{binding:2,visibility:e,buffer:{type:"read-only-storage"}},{binding:3,visibility:e,buffer:{type:"storage"}},{binding:4,visibility:e,buffer:{type:"read-only-storage"}},{binding:5,visibility:e,buffer:{type:"read-only-storage"}},{binding:6,visibility:e,buffer:{type:"read-only-storage"}},{binding:7,visibility:e,buffer:{type:"storage"}},{binding:yXb,visibility:e,buffer:{type:"uniform"}},{binding:ddi,visibility:e,texture:{sampleType:"depth",viewDimension:"2d-array"}},{binding:Nq5,visibility:e,texture:{sampleType:"depth",viewDimension:"2d-array"}}]),QCW=(e)=>e.getBindGroupLayout(Uy(),"lume cull camera+args");function uy(e,t){return e.createPipelineLayout({label:"lume cull select",bindGroupLayouts:[QCW(t),t.getBindGroupLayout(Lmj(),"lume cull group")]})}function Ry(e,t,r,i){return{label:r,layout:uy(e,t),compute:{module:e.createShaderModule({label:r,code:i}),entryPoint:"main"}}}function gZ$(e,t){return Ry(e,t,zM4,LU)}function KmN(e,t){return Ry(e,t,dpH,QO)}function gOw(e,t){return Ry(e,t,JNj,ZO)}function cBA(e,t){return{wgsl:()=>ZO,layout:()=>uy(e,t)}}var py={name:"cull select",mint:function(e){let t=W8y(e.device);return{key:t?JNj:zM4,kind:"compute",descriptor:()=>(t?gOw:gZ$)(e.device,e.pipelines)}}};var f1s=(function(e,t){let r=Math.min(e.limits?.maxComputeInvocationsPerWorkgroup??t,e.limits?.maxComputeWorkgroupSizeX??t),i=t;while(i>1&&i>r)i>>=1;return i});function Z9b(e,t){let r=Math.min(e.limits?.maxComputeInvocationsPerWorkgroup??t*t,(e.limits?.maxComputeWorkgroupSizeY??t)*t),i=t;while(i>1&&i*t>r)i>>=1;return i}function an_(e,t){return e===t?"":`/l${e}`}function PV9(e,t,r=!1,i="",n=!1,l=!1){return`terrain/surface/${e.colorFormat}/${jEz}/s${e.samples}${e.motion?`/motion-${Zjv}`:""}${OWU(t)}${r?"/holes":""}${n?"/far":""}${l?`/unrolled${(fm?"/walk":"")}`:""}${i}`}function lgo(e,t=!1,r=!1,i=!1,n=!1){return`terrain/surface/${wsy(i,OTV())}/${jEz}${OWU(e)}${t?"/holes":""}${r?"/far":""}${n?`/unrolled${(fm?"/walk":"")}`:""}`}function oDE(e,t=!1,r=!1,i=-1){return`terrain/surface/${wsy(r,OTV())}/${jEz}${OWU(e)}${t?"/holes":""}/coarse${i<0?"":`/f${i}`}`}var MlX=(function(e){return e.startsWith("terrain/surface/")&&e.includes("/unrolled")});function dPH(e,t,r=!1,i=!1){return`${o5p}-plain${i?"-smallest":""}/${e.colorFormat}/${jEz}/s${e.samples}${e.motion?`/motion-${Zjv}`:""}${OWU(t)}${r?"/holes":""}`}function E0u(e,t,r,i,n,l=!1,s=!1,o=PV9(r,i,l,"",s)){let a=[{format:r.colorFormat}];if(r.motion)a.push({format:Zjv});return yj(e,t,o,i,n,a,r.samples,l)}function l8Q(e,t,r,i,n=!1,l=!1,s=lgo(r,n,l),o=!1){let a=OTV();return yj(e,t,s,r,typeof i==="string"?A0Q(i,"fs",a):i,v0g(o,a),a,n)}function yj(e,t,r,i,n,l,s,o){let a=typeof n==="string"?{code:n,module:e.createShaderModule({label:r,code:n}),vs:"vs",fs:"fs"}:n,{module:u,code:d}=a,f=t(klf,"lume frame"),c=Ldr({getBindGroupLayout:t},igX(d,["vs","fs"])),h=SJN(e,r,[f,c,t(pSG,"terrain pool material"),t(UNM(i),"terrain pool draw")],c);return{label:r,layout:h,vertex:{module:u,entryPoint:a.vs,buffers:f91(i)},fragment:{module:u,entryPoint:a.fs,targets:l},primitive:{topology:"triangle-list",cullMode:o?"none":"back"},depthStencil:Ij1(!0),multisample:{count:s}}}var xj={name:"terrain surface",heldFor:"heightmap",mint:function(e){let t=a3g(e.features),r=e.groundCoarse===!0,i=e.groundText?.(t,r)??(r||rvi()?null:LPQ[t]);if(i===null)return null;let n=r?oDE(t):lgo(t),l=()=>l8Q(e.device,(t,r)=>e.pipelines.getBindGroupLayout(t,r),t,i,!1,!1,n);return r?{key:n,kind:"render",descriptor:l,depthArm:!0}:{key:n,kind:"render",descriptor:l,peelCull:!0,depthArm:!0}}};;;var sk=(()=>globalThis.__spawnEngineConsole??=Object.create(console))();function YsX(e,t,r,i=PsL,n=wyp){let l=null,s=function(){t(Math.round(r()-e)),l=globalThis.setTimeout(s,n)};return l=globalThis.setTimeout(s,i),{stop(){if(l!==null)globalThis.clearTimeout(l);l=null}}}var Zk=!1;var q3S=(function(){Zk=!0});function cu0(a){return (cu0=$c0O(226,cu0,"cu0")).call(this,a)}var YNI=(function(e){return e.drawFirst?.ask(),e.gpuMeasurement});var n5=null,Q5=!1;var w2r=(function(){Q5=!0});var BJJ=(function(){return Q5});var D7Y=(function(e){n5=e});var OEs=(function(){let e=n5;return n5=null,e});var v5=!1,ak=null;var pv5=(function(e){v5=!0;let t=ak;ak=null,t?.(e)});var u2d=(function(e,t,r){if(!e.frame1Held)return;if(e.lume.features.compatibility&&!v5){ak=(i)=>u2d(e,i,`${r}, then the init's hung lines (held from +${Math.round(t)} ms)`);return}e.frame1Held=!1,e.issuedAtMs=t,e.pipelines.holdWarmIssue(!1),sk.info(`[renderer] prelude: ${e.issued.length} pipelines issued at +${Math.round(t)} ms (device at +${Math.round(e.deviceAtMs)} ms; ${e.bytes>0?`${Math.round(e.bytes/1024)} KB`:"bytes unstamped"}) \u2014 ${r}`)});var kk=null,dk=null;function $k(){if(kk===null||dk===null)return;let e=dk(kk);if(dk=null,e.length>0)Iev([...HwX(),...e])}function ENQ(e){dk=e;$k()}function yDA(e){kk=e;$k()}function gp_(e,t,r=!1,i=null,n=!1,l=void 0,s=!1,o=void 0){if(e===null)return{adopt:!1,reason:"none"};if(e.recorded.lost!==null)return{adopt:!1,reason:"device-lost"};if(r&&e.lume.adapterInfo.degradedReason!==null)return{adopt:!1,reason:"software-adapter"};if(i!==null&&e.lume.adapterInfo.degradedReason===null&&mzO(e.lume)&&i(e.lume.adapterInfo.description))return{adopt:!1,reason:"road-gave"};if(typeof t.executorStream==="string"&&t.executorStream.length>0)return{adopt:!1,reason:"executor-bridge"};if(n&&e.lume.features.timestampQuery)return{adopt:!1,reason:"stamps-refused"};if(l===!0&&!e.lume.features.multiPassPackets)return{adopt:!1,reason:"packets-multi"};if(l===!1&&e.lume.features.multiPassPackets)return{adopt:!1,reason:"packets-one"};if(o!==e.lume.features.packetShape)return{adopt:!1,reason:"packets-shape"};if(s&&LD$(e.lume.device)?.listens!==!0)return{adopt:!1,reason:"work-unheard"};return{adopt:!0}}var ZEy=(function(e){return{sceneColorFormat:lll(e.device),depthFormat:jEz,samples:1,canvasFormat:e.preferredFormat}});var NLc=[HV,py,fx,xj],vwF=[fx],XRi=[xj];var Lu=(function(e,t){if(t===void 0||t.length===0)return e;return Qe(t,e);});var fu=(function(e){let t=null;return(()=>t??=typeof e==="function"?e():e)});var q2M=(function(e,t=NLc,r=[],i=[],n=null){let l=[];e.pipelines.warmScope((function(){for(let{mint:s,heldFor:o}of t){if((o??null)!==n)continue;let t=s(e);if(t===null)continue;if(t.kind==="render"){let n=fu(t.descriptor);i.push(n);r.push(e.pipelines.getRenderPipeline(t.key,Lu(n,t.taints),nO(t)).ready)}else{let n=fu(t.descriptor);i.push(n);r.push(e.pipelines.getComputePipeline(t.key,Lu(n,t.taints)).ready)}l.push(t.key)}}));return l});var JjF=(async function(e,t){for(let r of t){try{r()}catch{continue}let t=Y3(e);if(t!==null)await t.then((function(){return}),function(){return})}});var IP=1024,lP=IP*IP/1e6,yP=64,TP=64,ZP=1048576,$P=4,YP=1/TP,LP=4,XP=2,CP=30,rkz=4*CP,QP=1/TP,xP=256,PP=3,_P=2,JP=1.5,KP=JP/(JP-1),OP=2048,GP=256,dP=(()=>g4d(l9t.benchClock,Math.round(performance.now()*sP))/sP),BP=1,sP=128,wP=6000,fP=0.1,mP=((e)=>new Promise(((t)=>setTimeout(t,Math.max(BP,e)))));class MP extends Error{constructor(e){var $lptc;super(`the GPU did not answer ${e} within the bench's ${wP} ms`),"what"in this?$lpd0(this,"what",void 0):this.what=void 0;this.what=e}}var xBe=(async function(e,t,r,i){let n=-1,l=!1,s=(function(){if(n<0)n=dP()}),o=e.onSubmittedWorkDone().then(s),a=r.then((function(){l=!0,s()})),u=null,d=t;for(;;){if(await Promise.race([o,a,mP(Math.min(i,d)-dP())]),n>=0)break;let r=dP();if(r>=i)throw new MP("a sample's work");if(r<d)continue;u=e.onSubmittedWorkDone().then(iP,iP),e.submit([]),d=r+(r-t)*fP}if(u===null||l)return n-t;if(!await Promise.race([u.then((()=>!0)),a.then((()=>!0)),mP(i-dP()).then(()=>!1)]))throw new MP("its polls");return n-t});var iP=(function(){return}),FP=`
struct Params {
  scale: vec2f,
  offset: vec2f,
  texel: vec2f,
  seed: f32,
  pad: f32,
}
@group(0) @binding(0) var<uniform> params: Params;
@group(0) @binding(1) var samp: sampler;
@group(0) @binding(2) var tex: texture_2d<f32>;

struct VSOut {
  @builtin(position) pos: vec4f,
  @location(0) uv: vec2f,
}

const GRID: u32 = ${TP}u;

@vertex
fn vs(@builtin(vertex_index) vi: u32, @builtin(instance_index) ii: u32) -> VSOut {
  let x = select(0.0, 1.0, vi == 1u || vi == 4u || vi == 5u);
  let y = select(0.0, 1.0, vi == 2u || vi == 3u || vi == 5u);
  let cell = vec2f(f32(ii % GRID), f32(ii / GRID));
  let uv = (cell + vec2f(x, y)) / f32(GRID);
  var out: VSOut;
  out.pos = vec4f(uv * 2.0 - 1.0, 0.0, 1.0);
  out.uv = uv;
  return out;
}

@fragment
fn fs(in: VSOut) -> @location(0) vec4f {
  var acc = vec4f(0.0);
  var p = in.uv * params.scale + params.offset;
  for (var i = 0u; i < ${yP}u; i = i + 1u) {
    let o = vec2f(f32(i % 8u), f32(i / 8u)) * params.texel * 4.0;
    let s = textureSampleLevel(tex, samp, p + o, 0.0);
    let w = inverseSqrt(dot(s.xyz, s.xyz) + 0.001);
    acc = acc + s * (1.0 + 0.01 * f32(i)) * w;
    p = p + (s.xy - 0.5) * 0.002 + vec2f(params.seed * 0.0001);
  }
  return acc / ${yP}.0;
}
`,vP=256,AP=((e)=>`
@group(0) @binding(0) var<storage, read_write> data: array<f32>;

@compute @workgroup_size(${e})
fn cs(@builtin(global_invocation_id) gid: vec3u) {
  let i = gid.x;
  if (i >= arrayLength(&data)) {
    return;
  }
  var v = data[i];
  for (var k = 0u; k < 64u; k = k + 1u) {
    v = fma(v, 0.999, 0.001 * f32(k));
  }
  data[i] = v;
}
`),bP=`
fn pcg(v: u32) -> u32 {
  let state = v * 747796405u + 2891336453u;
  let word = ((state >> ((state >> 28u) + 4u)) ^ state) * 277803737u;
  return (word >> 22u) ^ word;
}

@vertex
fn vs(@builtin(vertex_index) vi: u32) -> @builtin(position) vec4f {
  return vec4f(f32((vi << 1u) & 2u) * 2.0 - 1.0, f32(vi & 2u) * 2.0 - 1.0, 0.0, 1.0);
}

@fragment
fn fs(@builtin(position) at: vec4f) -> @location(0) vec4f {
  let texel = vec2u(at.xy);
  return unpack4x8unorm(pcg(texel.y * ${OP}u + texel.x));
}
`,dBe={fill:FP,compute:AP(vP),noise:bP};function gBe(e,t,r=CP){if(!e3w(t)||t<=0)return e;let i=e*r/t;if(i<4)return Math.max(QP,Math.round(i*TP)/TP);return Math.min(xP,Math.round(i/4)*4)}var DP=((e)=>e.reduce(((e,t)=>e+t),0)),tP=((e)=>DP(e.costsMs)/DP(e.passes));function UP(e){if(e.costsMs.length===0||e.costsMs.some(((e)=>!(e>=XP))))return!1;let t=e.costsMs.map((t,r)=>t/(e.passes[r]??NaN));return Math.max(...t)<=JP*Math.min(...t)}function qP(e){let t=[];for(let r of e){if(!UP(r))continue;let e=t[0];if(e===void 0||tP(r)<tP(e))t.splice(0,t.length,r);else t.push(r)}return t}function hP(e,t){let r=[],i=t*PP,n=(e,r)=>Array.from({length:PP},(n,l)=>DP(e.slice(r-i+l*t,r-i+(l+1)*t)));for(let t of e)for(let e=i;e<=t.costsMs.length;e+=i)r.push({costsMs:n(t.costsMs,e),passes:n(t.passes,e)});return r}function RP(e){for(let t=1;;t*=2){let r=hP(e,t);if(r.length<1+_P)return null;if(qP(r).length>_P)return t}}function kBe(e){let t=qP(e);return t.sort(((e,t)=>tP(e)-tP(t))),t[Math.floor(t.length/2)]??null}var uBe=(function(){let e=1/0;return{see:function(t,r){if(t>0&&e3w(r)&&r>0)e=Math.min(e,r/t)},follow:function(t,r){if(t>0&&e3w(r)&&r>0)e=r/t},double:function(){e=(e3w(e)?e:CP/$P)/2},count:()=>e3w(e)?gBe(1,e):$P}});var tBe=(function(e){if(e>=4)return Math.min(xP,Math.floor(e/4)*4);return Math.floor(e*TP)/TP});var lBe=(function(){let e=1/0,t=1/0,r=[],i=[],n=(function(t,r){if(t>0&&r>=0)e=Math.min(e,r/t)});return{see:n,fed:function(e){if(!e3w(e.answeredMs))return;r.push(e.submittedMs),i.push(e.passes);let l=0;for(let s=i.length-1;s>=0;s-=1){l+=i[s]??0;let o=e.answeredMs-(r[s]??NaN);if(n(l,o),l>0&&o>=XP)t=Math.min(t,o/l)}},allow:((t)=>Math.max(QP,Math.min(t,e>0?tBe(rkz/e):t))),perPass:()=>e,fedPerPass:()=>t}});async function vBe(e,t,r,i){let n=NaN,l=!1;for(let s=YP;;){let o=await e(s);if(i.probeMs+=o,i.leastWallMs=Math.min(i.leastWallMs,o),Number.isNaN(i.floorMs))i.floorMs=await t();let a=o>=XP&&o>=n*JP;if(a)i.grownPerPass=o/s;if(a||s>=$P)return;let u=o>=XP&&n>=Math.max(XP,i.floorMs*KP)&&o*JP>=n,d=r.allow(u?$P:Math.min($P,s*LP));if(d>s)s=d,l=!1;else if(l)return;else l=!0;n=o}}async function aBe(e,t,r,i,n){let l=[],s=(function(){let i=e(r.allow(t.count()));i.catch(iP),l.push(i)});for(let e=0;e<i.depth;e+=1){s();}let o=NaN,a=0,u=!1,d={costsMs:[],passes:[]};for(let e=l.shift();e!==void 0;e=l.shift()){let f=await e;if(!e3w(f.answeredMs))return"lost";r.fed(f);let c=f.submittedMs<=o,h=f.answeredMs-(c?o:f.submittedMs),p=Number.isNaN(o);if(o=f.answeredMs,a+=1,!(h>=XP)){if(f.passes>=xP)return await Promise.allSettled(l),"blank";if(!u){if(t.see(1,r.perPass()),a>i.depth)t.double(),a=0}}else if(!c&&!p)i.depth+=1;if(!c)n.push(d={costsMs:[],passes:[]});else{d.costsMs.push(h),d.passes.push(f.passes);let e=hP([d],1).pop();if(e!==void 0&&UP(e))u=!0,t.follow(DP(e.passes),DP(e.costsMs));if(RP(n)!==null)return await Promise.allSettled(l),"held"}while(l.length<i.depth){s()}}return"lost"}function jP(e,t){let r=e.fedPerPass();return e3w(r)?{perPass:r,from:"stream"}:{perPass:t.grownPerPass,from:"walk"}}async function rP(e){let t=uBe();let r=lBe();let i=dP();let n=0;let l=async function(i){n+=1;let l=await e.sample(i);return t.see(i,l),r.see(i,l),l};let s={probeMs:0,floorMs:NaN,leastWallMs:1/0,grownPerPass:1/0};let o=[];let a=function(t){return n+=1,e.feed(t)};let u={depth:0};let d=NaN;let f;try{await vBe(l,function(){return n+=1,e.sample(0)},r,s),d=dP(),u.depth=2+Math.ceil(Math.max(0,s.leastWallMs)/CP),f=await aBe(a,t,r,u,o)}catch(e){if(!(e instanceof MP))throw e;if(qP(hP(o,1)).length===0&&!e3w(jP(r,s).perPass))throw Number.isNaN(d)?e:new MP("a window of samples that agree");f="deadline"}let c=hP(o,1);let h=RP(o)??1;let p=h>1?null:kBe(c);let g=dP();let y=Number.isNaN(d)?g:d;let v={walk:(Math.round((y-i)*10)/10),stream:(Math.round((g-y)*10)/10),samples:n,windows:c.length,depth:u.depth,entry:h};let w=p?.passes[p.passes.length-1]??r.allow(t.count());let b=p===null?[]:p.costsMs.map((e,t)=>e*w/(p.passes[t]??w));let k=NaN;let x;if(p!==null)k=tP(p);else if(f==="deadline"||h>1)({perPass:k,from:x}=jP(r,s));let M=f==="blank"||!e3w(k)?null:k/lP,S=x===void 0||M===null?{}:{overRead:x},I=f==="lost"||f==="blank"?{ended:f}:{};return{samplesMs:b,passesPerSample:w,overheadMs:e3w(s.floorMs)?s.floorMs:0,msPerMpx:M,rounds:c.length,contended:f==="deadline",probeMs:s.probeMs,stagesMs:v,...S,...I}}var eP=new WeakMap;function LQX(e){let t=eP.get(e);if(t!==void 0)return t;let r=e.createShaderModule({code:FP});let i=e.createBindGroupLayout({entries:[{binding:0,visibility:2,buffer:{type:"uniform",hasDynamicOffset:!0,minBindingSize:32}},Zyu(1,2,"filtering"),v6R(2,2,"float")]});let n=dP();let l=e.createRenderPipelineAsync({label:"spawn gpu-measure fill",layout:e.createPipelineLayout({bindGroupLayouts:[i]}),vertex:{module:r,entryPoint:"vs"},fragment:{module:r,entryPoint:"fs",targets:[{format:"rgba8unorm"}]}});let s=NcM()===null?GBe(e):null;let o=e.createShaderModule({code:bP});let a=e.createRenderPipelineAsync({label:"spawn gpu-measure noise",layout:"auto",vertex:{module:o,entryPoint:"vs"},fragment:{module:o,entryPoint:"fs",targets:[{format:"rgba8unorm"}]}});let u={pipelines:Promise.all([l,s,a]),bindLayout:i,issuedAtMs:n,inHandAtMs:null};return u.pipelines.then(function(){u.inHandAtMs=dP()},function(){if(eP.get(e)===u)eP.delete(e)}),eP.set(e,u),u}function GBe(e){let t=e.createShaderModule({code:AP(f1s(e,vP))});return e.createComputePipelineAsync({label:"spawn gpu-measure compute",layout:"auto",compute:{module:t,entryPoint:"cs"}}).then(function(t){{if(aE.add(e),TE===e)TE=null}return t},function(a){return $c0C(206).call(this,a)})}async function nP(e,t=rP,r=function(){return}){let i=dP(),n=iP,l=new Promise((function(e){n=(()=>e(void 0))})),s=Promise.race([e.lost,l]),o;s.then((function(e){if(e!==void 0)o=`${e.reason}: ${e.message}`}),iP);let a=i+wP,u=LQX(e),d={builtMs:NaN,uploadedMs:NaN},f=(function(){let e=dP(),t=Number.isNaN(d.builtMs)?e:d.builtMs,r=Number.isNaN(d.uploadedMs)?e:d.uploadedMs;return{builds:Math.round(t-i),upload:Math.round(r-t),samples:Math.round(e-r)}}),c=null;try{let i=await XBe(u,a),[n,l]=i;d.builtMs=dP();r();c=BBe(e);let h=zBe(e,n,l,DBe(e,u,i,c),a,s);d.uploadedMs=dP();let p=await t(h);return{...p,phasesMs:f(),...p.ended==="lost"&&o!==void 0?{lostWords:o}:{}}}catch(e){if(!(e instanceof MP))throw e;return{samplesMs:[],passesPerSample:0,overheadMs:0,msPerMpx:null,rounds:0,contended:!1,phasesMs:f(),unanswered:e.what}}finally{if(n(),c!==null)c.target.destroy(),c.texture.destroy(),c.uniforms.destroy(),c.computeBuffer.destroy()}}async function XBe(e,t){let r=await Promise.race([e.pipelines,mP(t-dP()).then(()=>null)]);if(r===null)throw new MP("its three builds");return r}function BBe(e){let t=IP;return{target:e.createTexture({label:"spawn gpu-measure target",size:{width:t,height:t},format:"rgba8unorm",usage:16}),texture:e.createTexture({label:"spawn gpu-measure noise",size:{width:OP,height:OP},format:"rgba8unorm",usage:20}),uniforms:e.createBuffer({label:"spawn gpu-measure params",size:GP*xP,usage:72}),computeBuffer:e.createBuffer({label:"spawn gpu-measure compute data",size:ZP*4,usage:128})}}function DBe(e,t,r,i){let[,n,l]=r,{target:s,texture:o,uniforms:a,computeBuffer:u}=i,d=new Float32Array(GP/4*xP);for(let e=0;e<xP;e+=1){let t=GP/4*e;d[t]=0.97+e*0.0003,d[t+1]=0.97-e*0.0002,d[t+2]=e*0.0011,d[t+3]=e*0.0007,d[t+4]=1/OP,d[t+5]=1/OP,d[t+6]=e+1,d[t+7]=0}{let t=l,r=o;let i=e.createCommandEncoder({label:"spawn gpu-measure noise"}),n=i.beginRenderPass({colorAttachments:[{view:r.createView(),loadOp:"clear",storeOp:"store"}]});n.setPipeline(t),n.draw(3),n.end(),e.queue.submit([i.finish()])}e.queue.writeBuffer(a,0,d);let f=e.createSampler({magFilter:"linear",minFilter:"linear"}),c=e.createBindGroup({layout:t.bindLayout,entries:[{binding:0,resource:{buffer:a,size:32}},{binding:1,resource:f},{binding:2,resource:o.createView()}]}),h=n===null?null:e.createBindGroup({layout:n.getBindGroupLayout(0),entries:[Y0r(0,u)]});return{fillBindGroup:c,computeBindGroup:h,targetView:s.createView()}}function zBe(a,b,c,d,e,f){return (zBe=$c0R(229,zBe,"zBe")).call(this,a,b,c,d,e,f)}var kP={stream:" of the stream's fed spans",walk:" of the walk's grown wall"};function cP(e){let t=e.stagesMs===void 0?"":` (walk ${e.stagesMs.walk}, stream ${e.stagesMs.stream} ms; ${e.stagesMs.samples} samples, ${e.stagesMs.windows} windows, depth ${e.stagesMs.depth}, entry ${e.stagesMs.entry})`,r=e.phasesMs===void 0?"":` \u00b7 wall: builds ${e.phasesMs.builds} ms, upload ${e.phasesMs.upload} ms, samples ${e.phasesMs.samples} ms${t}`;if(e.unanswered!==void 0)return`unmeasurable (the GPU did not answer ${e.unanswered} within the bench's ${wP} ms deadline)${r}`;let i=e.msPerMpx===null?"unmeasurable":`${e.msPerMpx.toFixed(3)} ms/Mpx`,n=e.msPerMpx===null?"no reading":"the answering window before the loss serves this session alone";if(e.ended==="lost")i+=e.lostWords===void 0?` (the device refused a sample's answer: ${n})`:` (the device was lost under the bench, ${e.lostWords}: ${n})`;if(e.ended==="blank")i+=` (blank: a sample of ${xP} passes showed no work)`;if(e.overRead!==void 0)i+=` (${e.contended?`contended: no window of samples agreed in ${e.rounds} windows`:"held on entries"}; the work bound's over-read${kP[e.overRead]})`;else if(e.contended)i+=` (contended: the stream did not hold in ${e.rounds} windows)`;let v$26;TBe:{let e$48=e.passesPerSample;{let e=e$48;if(Number.isInteger(e)){v$26=String(e);break TBe;}let t=Math.floor(e),r=`${Math.round((e-t)*TP)}/${TP}`;v$26=t>0?`${t} ${r}`:r;}}return`${v$26} passes/sample, overhead ${e.overheadMs.toFixed(2)} ms, samples [${e.samplesMs.map((e)=>e.toFixed(2)).join(", ")}] \u2192 ${i}${r}`}class mb extends Error{}var e2F=(function(e){return (function(t){let r=e.company();let i=(function(){if(e.closed||!e.quiet()||e.company()!==r){Re();}});return nP(t,((e)=>rP({sample:(async function(t){i();let r=await e.sample(t);return i(),r}),feed:(async function(t){i();let r=await e.feed(t);return i(),r})})),i)})});var jb=(()=>Date.now());async function E2F(e,t=nP){let r=Bra();try{return{result:await t(e),benchMs:Math.round(Bra()-r)}}catch(e){return{error:k$w(e),benchMs:Math.round(Bra()-r)}}}async function KpS(e,t,r=e2F(t)){for(;;){while(!t.closed&&!t.quiet())await t.turn();if(t.closed)return{unread:!0,benchMs:0};let i=Bra();try{return{result:await r(e),benchMs:Math.round(Bra()-i)}}catch(e){if(!(e instanceof mb))return{error:k$w(e),benchMs:Math.round(Bra()-i)}}}}var LSt=(function(e,t){return e!==null&&!e.rebenchOwed&&PPU(e,t)});var Zv$=(function(e){if(LSt(e.stored,e.adapterDescription))return{kind:"record",record:e.stored};if(e.quiet!==void 0)return{kind:"bench",run:KpS(e.device,e.quiet,e.bench)};let t={closed:!1,quiet:(()=>!0),company:(()=>0),turn:()=>new Promise(function(){return})};return{kind:"bench",run:KpS(e.device,t,e.bench),setAside:function(){t.closed=!0}}});function XHy(a,b){return $c0C(207).call(this,a,b)}function y2F(a,b,c,d,e){return (y2F=$c0O(227,y2F,"y2F")).call(this,a,b,c,d,e)}var Cb=(function(e,t,r){if(t!==null&&LK(t.key,e))return{cached:t,fromCarry:!1,retake:""};if(r===null||!LK(r.key,e))return{cached:null,fromCarry:!1,retake:""};let i=!r.rebenchOwed&&hv6(r,"cache").contended===!0?VZv(r):null;if(i?.outcome!=="armed")return{cached:r,fromCarry:!0,retake:""};return{cached:i.record,fromCarry:!0,retake:`the page carried a contended ${r.msPerMpx.toFixed(3)} ms/Mpx the device did not give: `}});var U2F=(function(e,t,r,i){if(e!==null)return null;if(r!==null&&PPU(r,t))return r;return i!==null&&PPU(i,t)?i:null});function G2F(e){if("unread"in e)return"the bench found no quiet time";if("error"in e)return`bench threw (${e.error})`;return e.result.ended==="lost"?"bench lost its device":"bench unmeasurable"}function Lb(a,b,c,d){return (Lb=$c0O(228,Lb,"Lb")).call(this,a,b,c,d)}function J2F(a,b,c,d){return (J2F=$c0C(208)).call(this,a,b,c,d)}var Pb=(function(e,t){return e.ended==="lost"?null:cb(e,t)});var cb=(function(e,t){if(e.msPerMpx===null||!ysL(e.msPerMpx)||e.msPerMpx<vZa)return null;return{msPerMpx:e.msPerMpx,samplesMs:e.samplesMs,passesPerSample:e.passesPerSample,overheadMs:e.overheadMs,measuredAt:t,bench:zsL,rounds:e.rounds,...e.probeMs!==void 0?{probeMs:e.probeMs}:{},...e.contended?{contended:!0}:{},...e.overRead===void 0?{}:{overRead:e.overRead}}});function QuV(a){return $c0C(209).call(this,a)}function p2F(a){return (p2F=$c0C(210)).call(this,a)}var $Xa=(async function(e){let t=TK(e.adapterDescription,e.rendererRaw),r=AeN(e.cached),i=AeN(e.carried),{cached:n,fromCarry:l,retake:s}=Cb(t,r,i),o=e.early;if(n!==null&&!n.rebenchOwed){if(o?.kind==="bench")o.setAside?.();return J2F(t,n,l,o?.kind==="bench")}let a=e.session??null;if(n===null&&a!==null&&LK(a.key,t)){if(o?.kind==="bench")o.setAside?.();return{key:t,measure:a.measure,record:null,standing:null,carried:!1,bench:null,benchResult:null,benchMs:0,word:`measured ${a.measure.msPerMpx.toFixed(3)} ms/Mpx (this session's, from a bench whose device was lost under it); no bench, and no record keeps it`}}let u=e.now??jb;let d=o?.kind==="bench"?await o.run:await E2F(e.device,e.bench);let f=d.benchMs;let c=n!==null?"owed re-bench":"bench";let h=U2F(n,e.adapterDescription,r,i);if(!("result"in d)){let e=y2F(t,n,l,d,c);return Lb(t,h,{...e,word:s+e.word},d)}let p=d.result;let m=cP(p);let g=Pb(p,u());if(g===null){return Lb(t,h,p2F({key:t,cached:n,fromCarry:l,result:p,receipt:m,benchMs:f,said:s+c,measuredAt:u()}),d);}let y=EK(n,t,g),v=n===null||y.msPerMpx<n.msPerMpx,w=hv6(y,v?"fresh":"cache"),b=p.contended?", contended":"",k=r??i,x;if(n===null)x=`measured ${y.msPerMpx.toFixed(3)} ms/Mpx (fresh${b}) in ${f} ms: ${k===null?"the device gave no record and the page carried none":`the standing record is keyed ${k.key}, this device ${t}`}`;else if(v)x=`re-bench moved the min ${n.msPerMpx.toFixed(3)} \u2192 ${y.msPerMpx.toFixed(3)} ms/Mpx${b} in ${f} ms`;else x=`re-bench read ${g.msPerMpx.toFixed(3)} ms/Mpx${b} in ${f} ms: the min ${y.msPerMpx.toFixed(3)} stands (${pK(y)} of the epoch's armings spent)`;return{key:t,measure:w,record:y,standing:y,carried:!1,bench:m,benchResult:p,benchMs:f,word:s+x}});var kl=["heldKept","heldKeptWorld","heldKeptBook","materialsKept","pictureKept","pictureKeptModels","programsDrawn","coverKept","memoryTenure"];function zPB(e,t){let r={};for(let i of kl){let n=Reflect.get(t,i);if(n!==void 0&&Reflect.get(e,i)===void 0)r[i]=n}return r}var B9I=(async function(e){let t=await ff6(_K,e);if(t.answer==="quiet")return{record:null,answer:"quiet",late:t.late.then(xN)};return xN(t)});var xN=(function(e){if(e.answer!=="found")return{record:null,answer:e.answer};let t=AeN(e.value);if(t!==null)return{record:t,answer:"found"};return psL(e.value)?{record:null,answer:"unreadable",drewFirst:!0}:{record:null,answer:"unreadable"}});function JIk(e){return gsL(_K,$sL,e)}var EjS=(async function(e,t){let r=await kJP(_K,(function(t){let r=t.answer==="found"?AeN(t.value):null;if(t.answer==="no-store")return{outcome:{record:e,read:t.answer}};if(r?.key!==e.key)return{value:e,outcome:{record:e,read:t.answer}};let i=a9k(r,e);return i===r?{outcome:{record:r,read:t.answer}}:{value:i,outcome:{record:i,read:t.answer}}}),t);return{wrote:r.outcome.read==="no-store"?"no-store":r.wrote,record:r.outcome.record}});function S36(a,b,c,d){return $c0C(211).call(this,a,b,c,d)}var Ej=[{format:"rgba8unorm-srgb",decode:{premultiplyAlpha:"premultiply"}},{format:"rgba8unorm",decode:{premultiplyAlpha:"none",colorSpaceConversion:"none"}}];var cil=(function(e,t){if(!t.gpu&&!t.hostProfile){kwk(e.device,e.features)}});var kwk=(function(e,t){return Mwk(e),t.externalCopyReadsBack?Promise.resolve(0):gwk(e)});var oj=`@vertex fn vs() -> @builtin(position) vec4<f32> { return vec4<f32>(0.0, 0.0, 0.0, 1.0); }
@fragment fn fs() -> @location(0) vec4<f32> { return vec4<f32>(0.0); }
@compute @workgroup_size(1) fn cs() {}`;async function Mwk(e){if(CTf())return!1;try{let t=e.createShaderModule({label:"lume browser warm indirect",code:oj});let [r,i]=await Promise.all([e.createRenderPipelineAsync({label:"lume browser warm indirect draw",layout:"auto",vertex:{module:t,entryPoint:"vs"},fragment:{module:t,entryPoint:"fs",targets:[{format:"rgba8unorm"}]}}),e.createComputePipelineAsync({label:ij,layout:"auto",compute:{module:t,entryPoint:"cs"}}).then(function(){{if(aE.add(e),TE===e)TE=null}return null},(e)=>k$w(e))]);if(i!==null){Hwk(i);return !1;}if(CTf()||QHe())return!1;let n=e.createBuffer({label:"lume browser warm indirect args",size:16,usage:256}),l=e.createTexture({label:"lume browser warm indirect target",size:{width:1,height:1},format:"rgba8unorm",usage:16}),s=new YHe(e,"lume browser warm"),o=s.forPass().beginRenderPass({label:"lume browser warm indirect draw",colorAttachments:[{view:l.createView(),loadOp:"clear",storeOp:"discard"}]});return o.setPipeline(r),qr3(r),o.drawIndirect(n,0),o.end(),s.submit(),n.destroy(),l.destroy(),!0}catch{return!1}}var ij="lume browser warm compute";function Hwk(e){if(!AE(e)||NcM()!==null)return;Rw4(`${ij}: ${e.split(`
`)[0]}`),sk.warn("[lume] the driver refused an empty compute program: no compute build or indirect draw reaches this device")}var gwk=(async function(e){if(typeof e.queue?.copyExternalImageToTexture!=="function"||typeof createImageBitmap!=="function"||typeof ImageData!=="function")return 0;let t=0;for(let r of Ej){let i=null;try{i=await createImageBitmap(new ImageData(1,1),r.decode);let n=e.createTexture({label:`lume browser warm copy ${r.format}`,size:{width:1,height:1},format:r.format,usage:22});e.queue.copyExternalImageToTexture({source:i,flipY:!1},{texture:n,colorSpace:"srgb",premultipliedAlpha:!1},{width:1,height:1}),n.destroy(),t+=1}catch{}finally{i?.close()}}return t});function OwD(e){Atomics.store(new Int32Array(e),0,1)}var t_=2;function z5T(e){Atomics.compareExchange((new Int32Array(e)),0,0,t_)}var VQ=Object.defineProperty,JQ=(e)=>e;function uOy(e,t){this[e]=JQ.bind(null,t)}var _31=function(e,t){for(var r in t)VQ(e,r,{get:t[r],enumerable:!0,configurable:!0,set:uOy.bind(t,r)})},Fmr=((e)=>iG)(function(e){return iG.apply(this,arguments)});;
;Object.defineProperties($Lr,Object.getOwnPropertyDescriptors({$$h:zcw,$1$:W8p,$6P:Ak1,$8h:yQl,$A$:VFC,$BJ:mfM,$Li:tDr,$MH:F__,$N2:xzz,$Of:WXa,$U0:oDE,$W7C:Hm7,$Wk:qZP,$Zp:KbS,$_l:R29,$cr:tM2,$g4:$ff,$kG:bgZ,$rQ:mpH,$tr:DHF,$zEc:zWg,A$J:uRd,A1L:_o_,A3A:FKW,A5E:B7i,A9l:zXp,ABz:lG3,ACx:I1G,AFX:bov,AFo:Jy0,AI0:hww,AIE:eGH,AJf:HJv,ALn:hGq,APU:f2D,APt:Vnj,AQ5:vCz,AQA:$1w,AU9:Hom,AUv:sY0,AZn:ztC,A_$:z89,A_8:HdI,Abz:FFn,Ad$:I$b,Ae7:o4F,Ahoa:UFt,Ai0:bK2,AiR:dIG,Anm:Otj,Anw:RwP,AsE:CWW,AsX:Bg$,AyQ:GzN,AyU:jEz,B0s:EAU,B3W:_pM,B4A:mEK,B75:niH,BC$:qGC,BDP:a4j,BEe:ese,BEv:aji,BOW:arM,BObk:vOp,BPe:KpS,BQ7:nxa,BQG:gWK,BRH:nD5,BS7:l9t,BSG:EaR,BUF:qxL,BYX:lSE,BYs:u_B,Bb7:JGj,BdI:aBL,Bgy:id9,BiM:lhA,BlM:UXe,Bm_:lCp,Bnx:BJJ,Bp6:n81,BpD:Cc4,Bpv:Tz8,Bsb:CLc,Bsf:rGV,Bsr:JQV,BxK:o7z,C0A:ahj,C1g:siA,C22:FOn,C2J:FOh,C2z:GsP,C3r:Ozc,C4Q:l_6,C92:Wu9,CAx:UJi,CBa:ZLG,CCa:feo,CCi:Vzy,CCy:hml,CDU:msj,CDb:e2D,CDk:fEI,CER:Xy8,CFZ:niY,CGF:Gw2,CHT:JX4,CKx:Bkm,CLR:U2A,CMm:g4d,CPy:I5d,CTp:uBr,CXC:dMI,CYD:e26,CZ4:Sp0,CaC:NZA,CaK:iaN,CcE:_xc,Cdy:TLF,CiY:pXa,Cip:gnp,CvDi:BaK,CwQ:j_W,D2u:JeK,D3Z:uLE,D6P:x3$,D6d:b4A,D7m:dp3,D8C:$IY,D98:qmS,DBZ:eS_,DCA:vwF,DDJ:gp_,DEr:PYw,DG1:r4z,DIS:oys,DPz:bgw,DQ7Z:IJU,DQZ:sDh,DUb:tvs,DWx:Wmw,DX4:N3m,DZm:jOW,Db6:mbJ,DbN:f52,Dc0:Gel,Dg5:vg9,Dhe:k$H,DjX:O0z,Dmc:KQT,DpJ:Owu,Dq1:clD,Dq4:cGn,DrI:CCw,Ds6:IRe,DsT:$nB,Dvv:goi,Dw$:g7l,Dxn:ysT,DyN:i_x,E$D:_PG,E$i:wm3,E0V:Pr8,E2f:Vvw,E6K:ycn,E8P:sb1,E9O:Ldr,E9X:SWX,EAA:Fen,EBg:SYm,EBj:kpp,EIL:VcM,EJ0:PZs,EQg:TOb,ERe:hb0,ES4:d1F,EWw:QLt,EXv:lJy,EYE:k$x,EYG:Jjt,E_t:Oyd,EaQ:J7o,EbQ:wa0,Ebw:iXh,EcS:zUC,EgY:kS2,EiQ:Zpc,EjI:MaI,Ekh:TwU,En0:H0q,Eoq:Lmy,EpP:e08,EqI:Gnm,EqR:lTV,ErR:rox,EsL:XCa,EwZ:OwD,Ewn:HGI,F0Q:O2u,F1U:oCN,F3Y:ulw,F3v:AXy,F6Q:Y19,F70:Lcn,FBF:oH7,FCy:zma,FEs:EuQ,FEt:HGV,FF_:v8X,FG3:yaY,FKD:HGz,FN_:pYA,FPH:tHC,FQh:FBz,F_r:mas,FaX:OEs,FcP:Hqn,FcP$:Yyk,Fo3:o2A,Fp4:kAD,Fri:tZq,Ft0:Zjv,FuT:$w_,Fuc:$Xa,Fwc:U_x,FxG:J$h,FyT:NJx,FyW:N7B,G1R:V3y,G47:S77,G58:wGi,G7y:zJD,G9O:cjf,GAm:s_c,GBU:PV9,GDv:D0M,GEa:do1,GF9:rc9,GJk:iJU,GKo:dI0,GM8:Sy5,GNc:odG,GQD:r84,GUg:HbO,GWd:ddi,G_G:Wp_,G_f:yB1,GbA:QWA,GdY:O9k,Ggy:dQJ,Gin:aqF,Gjc:uMX,Gmz:bny,Grh:q2c,Gu1:euZ,GuK:jwv,Gvp:hIW,Gwz:NrV,GxS:PJM,Gxv:rmz,Gyu:vO8,Gzh:Nr5,H1v:$ld,H37:Ak$,H97:IAY,HFt:hL8,HHj:Sik,HIu:utO,HKD:bez,HLP:WN8,HN_:rii,HPg:zvM,HQE:K3g,HRT:n2$,HSq:syV,HTZ:OE9,HVG:P3B,HXY:wZL,HZl:FKB,HZl_:fYE,Hcg:ff6,Hed:RKC,Hi3:H$v,Hkv:Tun,Hna:Cea,Hoj:Cct,Hox:xGD,HpX:UfN,Hpe:WEa,HpjJ:qp5,Hv6:R4r,I1_:Tx7,I1i:fsR,ICa:FpQ,IGF:igX,IJq:tXH,ILi:Rkn,INI:b7X,IRN:Qk7,ITB:R0F,IUU:OjN,IWK:Ec9,IWy:L3B,IY9:v7o,IZy:jBl,I_o:cxt,IaW:jik,Iiy:Iev,Ijf:yNF,InL:HM_,IoH:zEL,Ipc:iLz,Iqf:jFo,Iru:Njx,Ix8:MTP,Iz2:YNM,Izb:zRp,J0u:Dpw,J5T:upm,J5_:h9Y,J6Q:S8m,J6_:lxv,JBf:WoY,JDf:yLf,JJQ:m_Q,JNH:PDM,JNY:S$C,JOV:cu6,JQz:WAL,JUT:MRT,JWpJ:z5e,JZN:bJT,JaML:ws5,Jai:Nu2,Jbu:JDr,Jc4:Qmc,Jcm:FND,Jcx:glH,JdP:D4U,Jef:Gop,Ji5:wKC,Jmf:gD1,Jt0:xX3,JuK:_GM,JuU:bbs,K34:jUg,K3G:v9S,K6S:WWq,K7y:mNi,KC3:rAW,KCn:HwX,KFY:Q9z,KI1:REd,KJn:ggH,KK$:c6M,KKT:$8v,KLm:dhh,KOT:uhx,KRJ:v9_,KSA:fS1,KTq:HKP,KaZ:qkq,Kcm:chq,KdH:Ij1,Kgb:kM5,Khd:Nsu,Khe:HNd,Khk:CaX,Kl_:J0G,KmW:CJD,Kmp:VYU,KoJ:S9g,KpC:wyp,KtM:k7f,Kul:Fo3,KwY:zdk,Kya:XUF,KzT:tfq,L0J:vrT,L24:MbU,L2O:Iom,L6f:lg1,L71:HRC,L8Q:Mq5,L95:vkh,LAa:OCD,LB$:Nhp,LBf:MHn,LCv:Yk4,LGK:PW_,LJ4:oZc,LJ4_:iF2,LKM:wWm,LLW:fQ1,LMb:T9b,LNd:ely,LNp:k4y,LR1:b6e,LT8:Jmk,LZG:Zry,Lc1:QIk,LfS:P7X,Lg1:ThI,LgY:bmJ,Lgs:C5X,Lkm:b6P,Lmd:Mz4,Lq0:fqc,LtY:Z7P,LwD:S36,LwQ:AoK,Lxj:rzY,Lyc:hku,M8T:egu,M9u:$vu,MDu:W6G,MGB:MiM,MIW:EjS,MLi:OO8,MMr:WWl,MN3:ayA,MPj:A2n,MQF:YpB,MQw:mZE,MT$:udX,MWF:JNh,MXP:dra,MXT:aRL,MZw:gUH,M_D:jw_,M_Q:fCC,M_g:$Et,MdA:nbj,MfI:kRa,MfU:ny2,MgJ:s$A,Mhde:nEG,Mhw:nlo,Mig:cT2,MjW:Rda,Mjh:lik,MpD:sHp,MrA:v$D,Mry:srz,Mvq:MUz,MwH:$QT,MxE:t0U,Mxl:WVR,Mzp:kPZ,N8U:Txe,NB7:q2M,NDw:_Td,NHS:Nq5,NKm:vK9,NN7:MYk,NPA:YsB,NRU:i1p,NSs:WzX,NYX:OhB,NaG:YNI,Nae:cIX,NbW:ymL,Nbm:Ek_,Ncb:VlH,NdL:Crv,Nho:zrk,Nhq:sCX,Nid:bAS,Nk_:cW2,Nm8:U9$,Nnw:jqZ,No7:baM,Npd:pmN,Npz:Vgt,NqF:kpT,Nru:K0D,Nsh:jFZ,NuZ:Art,Nuh:BQe,Nx1:T9A,Nz8:ta5,Nzf:fU9,O0U:Fmr,O17:xtT,O31:Sy6,O33:ayR,O9i:htg,O9o:ybU,OB2:xSn,OBQ:uZV,OE_:r4A,OHY:T4L,OLA:i6U,OiU:CwV,OiV:C3M,Ojw:TKx,Ona:sSE,OoO:ApN,Orb:dvF,OwJ:gia,Ozp:G7N,Ozt:U9w,P$z:vS8,P5r7:sle,P5t:PJ2,P8T:DWe,PCl:xzO,PIE:tmB,PK8:hUf,PKn:MPW,PNw:w_V,PPx:J5k,PRy:G27,PU6:mAA,PUB:qZp,PUb:zEr,PWW:Nbr,PY0:DQt,PaZ:Ubp,Pef:$wP,Pf1:Wbe,Pjz:vzW,Pl$:Xz2,Pmn:BOr,Pqk:iYp,Pt0:W6k,Pti:MD3,Pus:ICN,PvG:N3S,PvR:Yke,Pwg:jz_,PxK:a9u,Pyd:p0a,Q$g:G3B,Q0P:Jog,Q6P:UOC,QAO:UaS,QJV:Ov9,QKzX:nfJ,QLB:nAs,QMs:dpH,QMt:$nu,QQx:LHa,QX_:PT4,QaF:vNi,Qam:T66,QbK:qKI,Qf8:$cZ,Qfl:jqA,Qhk:tbc,Qhx:QbW,Qjp:NVe,Qpf:sTq,Qw6:dXG,QzT:mTY,R3A:R9D,R6b:huG,R6y:xnN,R9V:hlQ,RBS:l_q,REZ:a9k,RFX:ogj,RHQ:Jff,RIA:yU6,ROU:bI1,RU8:paq,RUv:kUu,RZB:C67,Ram:tv6,Rau:$mT,RbA:yYf,RhvQ:s$2,RjV:T62,Rlj:tcv,Rm1:qX6,RmP:h4Z,Rn8:_Wb,RoL:HHj,RrC:XHy,RrI:MDD,Rrl:mP7,Rvp:kqU,Rx7:zcR,RxZ:Bu2,S2m:Lmj,S8y:rC3,SA6:GN8,SBM:z_l,SH8:knl,SOb:ft5,SPs:ZF3,SQ0:Z9b,SQZ:Ygw,SQb:pdf,SSR:epF,SZK:gQc,SbZ:gP6,Sf$:Ppq,Sf4:kpg,SlX:eut,SmK:RE5,Smw:jnv,So3:x5$,SpJ:XIa,SwN:$wK,Sxz:bLT,SyU:rsj,Szq:AJJ,T28:$wo,T3r:tn5,TBT:voF,TC$:WwF,THT:LMv,TMs:W9l,TQa:MYR,TRF:o58,TXQ:jhk,TYO:DuM,TZy:NcM,Td7:udQ,TjB:K9_,Tkv:JPf,TpM:mp1,Tvt:oFG,TwD:a1i,TyB:B2i,TyQ:SD2,U$a:Y0r,U46:E_n,U4E:tfV,U4c:zwp,U6k:jBr,U7J:Tra,U7Jc:rnY,UDu:hfl,UDy:YkO,ULa:s1P,ULm:hjq,ULu:jsj,UOx:fEu,UQ2:IQk,US_7:BSN,UUC:EFb,UVn:LcW,UYH:K_P,UhT:SR2,UhW:wWz,UjB:frM,UnU:ErF,Upt:_Q1,Ute:XfG,V2b:Pms,V5H:__c,V7r:y9V,V8o:oPM,VA_:ufe,VC6:ic3,VCs:O87,VEu:IKx,VFO:H9i,VHJ:V$V,VT9:bWh,VV5:k5O,VZ_:nik,V_O:apE,Vfz:TT5,Vj5:lJo,Vj_:RVm,Vk4:jve,Vlh:N3x,Vm6:vv1,Vpn:wlW,Vry:XRi,Vsw:vrH,Vyt:okW,W0z:kaF,W3x:E0u,W5Y:Rho,W6U:pP6,W8g:pgS,WAi:ysP,WBl:cRl,WGq:mEp,WIY:Nap,WJ5:G0W,WNF:H_I,WO0:MHF,WQP:LiR,WR1:Uhq,WU7:Sxk,WWn:gZ$,Wa2:vD5,Wau:tYn,WiB:KVO,WkN:zQ7,Wky:zrZ,Wl5:YQB,WmQ:jCw,WpG:p4w,Wqm:$P0,Wrp:l6z,WtP:G4Q,WtZ:Rxz,Wwq:nRM,WxC:n$2,X15:Pw3,X4S:A0Q,X4r:N7q,X8_:Rta,X9N:QeN,XAr:p1S,XE9:GIr,XEf:w2f,XFy:vMb,XGU:dPH,XHo:a8V,XJZ:K2e,XK8:v0g,XOw:nnD,XS5:wLZ,XTP:hxA,XTR:Qe2,XXB:Vil,X_Q:Oje,X_S:cQA,XbD:bXU,Xb_:hqT,Xdo:Dkm,XfT:NKj,XhC:TEE,XmL:quG,Xqr:Ypd,XwP:UNM,Y0g:RvD,Y0s:z0X,Y1S:$GF,Y3e:vF0,Y6fr:sM9,Y71:V0h,Y9l:nJy,YCU:AFF,YHf:vvy,YJ1:UQW,YO3:Cr4,YQK:bVy,YUL:K6d,YUq:Ewz,YW8:MV4,YWp:Gjw,YXH:P5Q,YYd:BUj,YcO:OO_,Yf1:gD0,Yfo:BWh,Yh9:IyN,YjI:FXA,YkK:MYK,YmG:Mb8,YnL:Ko0,Yom:L6B,YpF:dG8,YpH:ygr,YrR:wbn,Ytd:vmh,Yu5:_2m,Yvt:bHD,Yvz:fL1,Yxp:d_b,Yy6:xPf,YzF:QCW,Z5r:PQO,Z9t:IuN,ZB0:u6C,ZBI:Yv5,ZF0a:_09,ZHs:ExY,ZOu:T0e,ZSZ:YsX,ZT7:RMJ,ZW4:OuG,ZYN:Tpt,ZZw:FU6,ZcG:CTf,ZcG1:dnK,ZeJ:h35,Zfq:$dj,Zg5:_Gs,Zhg:ewA,Zib:Ymi,Zic:Tbo,Zmy:mAc,ZoA:fMI,Zoa:BB4,Zu8:lAd,_1n:M9s,_2Q:Vnb,_4M:yML,_4T:a0I,_7c:PUA,_9V:qKR,_9m:M4y,_AS:$jf,_AU:oFD,_Am:IPU,_Bq:yXb,_CW:Q$q,_Cg:WlJ,_E9:MbE,_Mo:eES,_Nq:jkq,_PO:XBU,_Qw:rWB,_UD:gSX,_Uz:an_,_ZJ:A3N,_bN:N95,_eO:a_o,_f9:lx3,_jX:G4S,_pQ:NpD,_qz:$Rc,_r_:XT1,_rr:v6R,_sp:Iqc,_t1:PdH,_xs:kYW,_zA:H2l,a$B:NIw,a18:zJw,a29:F6b,a3d:E8k,a6E:z0c,a6O:k9L,a7W:y$A,a7s:eyE,a8T:$nL,a8U:Irj,aAw:$2U,aCV:zte,aDK:cBA,aDQ:w7T,aFB:qKU,aJ$:vgU,aMf:kfT,aSN:da2,aUO:H$t,aVj:KFd,aXz:YST,aYn:QuV,aZp:iZ7,a_l:kMD,adX:Wg1,aex:QsH,ag$:vc0,agc:hOh,aj7:Dvo,aja:hpi,am7:Z_4,amQ:i4k,amV:Xib,aoz:Shc,apl:WdA,arW:NOT,ax3:Jk6,axA:wn5,b18:RT3,b2i:lZM,bAE:le6,bHx:oSg,bIT:Ggo,bMV:FTW,bMq:BHD,bN9:SVN,bQI:SBR,bRS:dHc,bRo:yQ4,bSQ:NLX,bWp:stl,bWq:UQ4,bZY:j4E,bcT:h1Q,bel:Qbr,bgV:e5m,bjr:_hQ,bk7:oAF,bk_:hT2,blZ:eQX,bli:z$P,blo:vZa,bmG:nsq,bnZ:pAN,bp6:otq,brt:vyO,bs3:XcY,bx0:sp1,c2h:zAU,cA6:MIs,cBV:DI0,cCQ:y9N,cDK:aGd,cDUx:zSP,cIG:Vkh,cJq:d9Q,cMI:f1s,cPv:Ez4,cQB:VV8,cQp:ngg,cXw:ptl,cYp:mb7,c_I:af1,cap:clR,cfv:BJN,cge:zTT,ciX:iMp,ckj:gOw,cm6:k$O,csX:EDK,cvu:zD4,cwV:mzO,cwX:J9S,cxL:hkp,cy9:ZYD,cyr:usL,d17:tsB,d30:CQA,d7k:geY,d9X:pif,dAh:qbK,dEj:LPQ,dFZ:jRd,dFk:c38,dFx:E_y,dIu:_Mo,dJJ:cCW,dLq:FsC,dLr:UWi,dN3:kQZ,dOa:wu4,dOd:LHQ,dSE:M3L,dSS:Xd0,dSo:VZv,dTl:DbP,dZG:Dry,dZn:AX9,dbb:B0c,de_:JLD,dep:GCE,djr:wrG,dlA:kHk,dlU:Qjt,dnw:NbB,doI:VeE,doK:eTU,dpl:Pvu,dr7:EyP,ds7:gMg,dsm:Jyn,dxM:FsY,e3R:u8m,e52:y0x,e5p:RqO,e71:g4H,e8E:IZZ,e8a:FUn,e9O:BnR,eDL:UKu,eGP:CO2,eGu:MtU,eL$:pSG,eM3:I6c,eMC:JNj,eMa:s9h,eP0:qJ$,ePD:n3b,eRO:g4f,eSb:_$U,eTE:oaQ,eV4:bOJ,eWw:u5k,eYb:rBw,ech:Sy9,edW:xE9,ei7:fQc,eih:Tya,emc:Ilv,emd:DRr,etR:CSE,etV:Vum,euA:gWX,eyb:OlA,eyd:K_E,ez8:hKS,f0x:nTS,f1z:ddY,f2D:LD7,f33:XYw,f8D:zH_,fF5:Ju$,fI7:KI2,fI9:Zq6,fIC:EzM,fJo:_7o,fLS:RAc,fRd:Mxu,fSQ:LjX,fTC:mOt,fTk:s4X,fTm:Jrv,fWH:cEA,fZF:ZEy,faN:ufH,fbD:Avp,fcn:giN,feF:_VC,ffo:CsN,fgi:xcU,fkO:jhu,flF:uIn,fnJ:mWA,fqF:reG,fqT:W_m,fsG:hQR,fxK:wwK,g0T:zl_,g1z:x4k,g6b:xpx,gAX:RiT,gFF:u2d,gGL:uWt,gI0:vU6,gRh:ZkT,gSa:uLW,gSh:IcM,gU_:k$w,gVp:hk6,gav:j9f,gcl:Ebj,gf8:RdK,ggq:ppG,glg:Lg7,gli:Oi2,gnz:RLW,goO:Xwf,gqQ:JrI,gr2:eAG,gtE:ssJ,gtY:ryy,h1y:e3w,h7r:cZz,h8S:TcG,h8c:Ba3,h9R:onQ,hAX:iOc,hDH:Pri,hJc:Wi4,hK5:Gq5,hKa:afO,hM7:PNh,hNH:YpW,hNI:VB6,hNm:jOO,hR0:UP7,hV0:W8y,hV5:PNX,hVX:NVx,hWx:j7A,hZS:Qql,h_d:mFK,haM:cdB,has:lgo,hcu:DLP,hfI:Ncy,hiN:_w5,hjr:gGm,hnL:Cjy,htm:knN,hum:v_L,hvD:OT$,hxd:Htp,hyf:gpW,i2C:Rk6,i2Z:$Oy,i2b:b8d,i2z:jR$,i60:gM5,i6p:LBa,i7a:N0P,iBF:Rsh,iBI:nll,iBo:nej,iDo:Cfi,iEn:KmN,iFP:wkn,iFn:$V4,iGv:FYB,iH8:Utb,iJx:QhF,iLk:VUn,iOT:oOy,iWF:W20,ibe:UmR,ieR:BLJ,igm:w9R,ihj:P0P,ik6:P0V,ikl:upy,iqT:HF5,iqx:etR,irF:$Cx,isz:gaM,ivG:Y4s,iww:tM0,j$p:aPr,j18:Db2,j5E:$nH,j6L:BKH,j7K:amD,jAW:Iik,jB0:Rso,jBQ:goO,jEr:FAX,jJ$:kXg,jJo:cuN,jJt:PMu,jLV:q5q,jLW:IsG,jN3:JNY,jOO:TIr,jOV:BC0,jPt:r1h,jQT:XA9,jV$:gyC,jXN:neZ,j_Q:V7k,j_l:zGz,jbR:IpN,jbt:SgO,jgN:z_O,jki:Rmj,jkid:cil,jkr:RRg,jmR:Xgx,jqS:Zyu,jql:cTE,jtQ:MiQ,jtm:o3z,ju0:mnS,jvv:_mJ,k0E:__0,k5Z:Mb6,k6w:GVd,kC$:Awo,kDJ:sx$,kD_:fN7,kEj:$kw,kF2w:aYH,kGl:ANF,kHv:dv7,kIw:OgH,kKu:pEu,kMd:gsg,kP9:vsa,kQP:OTV,kSQ:oaR,kTI:_UH,kWy:puU,kXO:GiN,kbd_:Sw_,ke5:E8L,kfI:jaR,ki5:GPy,kl9:LS$,klC:n$N,klm:mrD,knK:LhZ,kpB:S08,kpO:y3_,kpw:bM6,kpx:T9C,kpz:B9I,kqF:ncg,kqo:RdA,ks6:xCF,kuu:CuZ,kxb:b7l,l$A:kOY,l04:myU,l2K:L1q,l90:ykH,lA$:FBb,lBr:m6_,lCC:xii,lDO:Ay1,lIg:YOg,lKR:wsy,lKY:plG,lNh:v2h,lSa:D0z,lV9:wGv,lVL:Ala,lVN:$mP,lWT:QJE,lXS:Cmj,lax:ZYv,lcn:YhI,leZ:qVg,lgv:izM,lj3:Oez,lko:Duk,ll2:Anw,lmH:rma,lmw:vnE,lnx:ZtC,loh5:K2S,lpe:rRx,lrl:YHe,lsq:FEG,luI:Hr0,m$P:o3M,m$v:gH1,m0P:u4J,m1p:PkI,m1u:IXI,m3o:yFv,m54:Hj4,mA7:UEo,mDW:wlg,mEE:zM4,mGj:tr1,mIN:sbg,mJ6:oby,mJB:HGr,mL7:l2I,mNg:Zzg,mR0:Ugi,mVU:oxl,mdD:J8B,mde:fwc,mdo:CEb,me2:op0,mfp:yte,mjR:tS5,mle:AXn,mq$:JbJ,mq1:klf,muc:q97,n0R:op4,n3Y:l5Y,n5r:Pgz,n5y:ose,nBh:g8F,nFE:_Or,nIP:RaL,nIf:GT9,nNv:dAA,nQF:O7v,nQL:xEu,nTZ:A30,nV5:_$K,nV9:kHU,nYK:ZVA,nYq:Ccu,nZr:At0,ndt:QHe,nei:sRc,niS:zkI,njo:Cnl,nk1:A9S,nl8:VFZ,nmF:QPc,nmw:ACg,nvL:zRE,nym:uM_,nzp:z5T,o$4:z91,o3C:qp$,o42:S3p,o8C:uuE,oAJ:gad,oFW:qya,oMe:hqN,oNb:Ig_,oO0R:cZh,oR5:ubP,oRc:jJz,oRs:jyt,oTB:NpB,oTw:OPO,oVY:peR,oVe:kUn,oaZ:lDy,odY:PGd,okJ:Bg7,ooJ:CD_,ov3:AAr,ovx:XD0,oxJ:J$A,oyC:Zmr,p0Y:Kti,p0g:lsY,p2D:j0A,p2g$:SWv,p6C:Dfo,p7E:o5p,pBc:Yz1,pCa:xks,pDU:eMf,pEE:zRC,pGn:CI9,pIA:vq6,pJp:MMU,pJp5:SIf,pML:kCv,pPa:CGc,pPy:LCW,pU0:kdS,pW8:BbH,pYa:JG7,pYz:ALi,pec:OYS,pfC:EC0,pfK:E6_,pjj:gWn,pqb:kHm,pro:RWB,pu3:uic,pv3:Ior,px6:ybd,pyp:EpY,q43:QrL,q66:Y2H,q9K:QkR,qGQ:Zf6,qH5:tWZ,qH_:kJP,qQY:S65,qRi:ooS,qUg:BRY,qVW:gau,qXY:II1,qYo:lhh,q_m:yBC,qa9:FtX,qaQ:l8Q,qd6:Y7P,qdK:A_2,qdz:OZN,qeB:hoq,qey:_xl,qgE:c5x,qhG:Eqp,qmi:ZzM,qtH:DAq,r1G:icY,r2d:lP4,r2n:MYO,r34:roo,r5I:PVx,r62:odz,r9y:XMr,rA2:Iue,rBa:FVg,rC0:lE5,rFbc:W4c,rLS:Fe6,rNJ:Epe,rTM:pN4,rV2:uQW,rVF:bmw,rXT:VkB,r_Q:f9f,raX:FS9,rau:NLc,rb_:syo,rc1:gpj,rd3:TNi,rjc:AaL,rjv:b8C,rl2:yHd,rpN:wEE,rpz:msB,rsY:ekR,rvA:SEr,rwD:oJD,ryY:ysW,rzk:Uwn,s0Tz:e2G,s0r:icW,s2H:n2E,s2W:Cpz,s3o:Raz,s6S:hJz,s7R:k9X,sAG:rjV,sB4:QX2,sD$:KFG,sFA:Fpl,sUb:qDF,sVa:hjz,sX6:Vo5,sXN:clT,sZt:S1x,s_l:Jmd,sbj:TZg,scb:dCp,sci:Z81,shi:U2_,siBC:ptm,skO:Aed,sr4:x7T,su7:B8V,sxt:YW9,syT:iC9,szE:_CF,szN:Ane,t5K:eRZ,t7V:IDf,tAt:zPB,tDqN:CYC,tF8:t5P,tG1:rkz,tHb:scD,tKs:lz3,tPW:vDR,tR7:HAU,tW3:aO7,tWb:vCn,tWh:$91,tXw:Gb_,tZ9:eZu,t_t:TgN,taY:ihl,tdb:M8u,tft:DLT,thB:GTs,tiF:xox,tiW:w1s,tkM:IdT,tlk:NxB,tnE:Rw4,tno:oQA,tpy:ree,tqX:NAN,tqo:JnW,tt6:CcB,ttb:aOP,ttk:XGS,tuG:Y1I,txN:ofu,txa:FZu,u$7:WC6,u$X:CJa,u2H:IMy,u36:ty8,u77:OEE,u9Q:wsx,uBa:wta,uCw:lX_,uG9:Jls,uLV:FT4,uMP:t8L,uMk:M6V,uUE:zkH,uU_:fPd,uV2:PId,uWb:D0i,ubA:tiG,ubr:qGP,ue0:en8,ugz:$rp,un5:UYX,unL:rvi,uqX:P8B,uyl:Muz,uzt:arw,v1E:$ue,v1n:o4I,v67:O47,vFQ:MlX,vFp:RGd,vKj:RLQ,vPP:mk_,vQa:rQq,vR8:TmG,vUE:_31,vXT:Wuf,v_d:ebK,v_t:SSh,vbn:OWU,vcF:vLk,vgR:EIy,vga:osb,vjP:df9,vkC:gY1,vkm:yVx,vkz:RJu,vmf:hv6,vo3:oMD,vow:Vhz,vqE:SQp,vu_:p8O,vuy:uAo,vvW:OUu,vvm:IqV,vx_:SMP,w$R:g1o,w4i:yJS,w56:qWE,wA$:bgK,wDU:c_H,wE8:pVv,wG5:KvY,wGc:D6J,wK4:mKO,wP$9:bCI,wRG:RKN,wRZ:RDp,wT2:oqg,wTD:aBG,wVg:xmY,wVt:BP9,wa3:HkS,wda:YrC,wf4:pFw,wkC:dwC,wn$:HOw,wns:cuh,wpg:sqG,wpm:vTI,wvO:DhD,wwn:CHq,wy2:e36,wy_:M9G,wzN:_hv,x31:LD$,x8B:QYr,xCs:WD_,xEg:bcQ,xFq:u2p,xH6:AZ3,xQp:UAM,xR1:Bra,xRo:eCX,xT_:GOA,xU6:PhZ,xVz:eKF,xWp:AhA,x_M:SOp,xbK:hXR,xdB:CHj,xdX:r5R,xuF:MfZ,xwD:P$u,xzP:vuZ,xzU:tW2,y2r:PDO,y3K:sJ$,y7_:LV8,y97:Y_H,yAY:uYi,yBJ:wrq,yBW:f91,yE3:Ust,yF9:jHG,yG8:ZTr,yJT:gnV,yKJ:hME,yLx:G0S,yMo:PGr,yOI:PEZ,ySH:rDG,ySu:dlr,yU5:QcC,yVd:jlu,yWa:XKG,yXI7:yX3,yYC:GYZ,yat:NCS,yfJ:SJN,yhv:U$F,yiE:peK,yn8:ndr,ynR:SZv,ynn:TmM,yu7:TdJ,yvh:Uu2,yxd:lll,z2c:qr3,z6s:FEs,z7r:a3g,z8j:zRY,zEY:vPg,zGL:zCX,zIx:eh1,zLX:x1Z,zMp:q77,zMu:q3M,zN1:RhK,zOk:ohL,zPi:pcp,zRd:eLY,zUV:w_f,zVE:mVY,zWa:oBK,zXf:oSr,za_:jGX,zcs:Def,zeT:Ubh,zfX:ihO,zfZ:VCM,zfi:nWH,zhK:rD3,zhq:ZQr,zkh:sFa,zkl:xTo,znz:bfK,zpv:yLr,zsO:R74,zs_:Zu8,ztE:hZZ,zy$:lvr,zy7:okg}));

function ba(){let e=new MessageChannel,t=e.port1;t.onmessage=m6,t.unref?.(),c6.port=e.port2
}
function fa(e){for(let t of e){if(!t)continue;let e=t.attributes;if(t.arrayStride>0&&(Array.isArray(e)?e.length>0:e[Symbol.iterator]().next().done!==!0))return!0}
return ca}
function ga(t){Qo.warn(`[lume] indirect-layout guard VIOLATION: pipeline "${t}" declares a required vertex layout and is drawn indirectly on a convicted device, the shape that hangs the AGX tiler: move it to the storage attribute arm or make the draw direct`);
}
function ha(t){throw Error(`lume indirect-layout guard: pipeline "${t}" declares a required vertex layout AND is drawn indirectly on a device convicted of the WebKit/AGX indirect-clamp hang. Move this subsystem to the storage attribute arm, or make the draw direct.`)
}
function ia(t,e){let r=Math.floor(t/1024);e.kb+=r|0,e.rest+=t-r*1024|0
}

function la(e){return(e.length===zD4.length||e.charCodeAt(zD4.length)===32)}
function ma(e){return(typeof e.queue.onSubmittedWorkDone!=="function")}
function na(e){return{depthBias:-e.units,depthBiasSlopeScale:-e.factor,depthBiasClamp:0}
}


function qa(){let e=Ypd();if(IW[0]!==e){if(IW.unshift(e),IW.length>O6)IW.length=O6;mW+=1}
return e}




function va(t,e){return(Math.min(t,RMJ(e,[],"samplers").fragment))}
function Ba(a,i,e,t,d,u,r,f,l,s,c,n){if(a[2]+i===0){e.encoder.copyTextureToTexture({texture:t.texture,mipLevel:d,origin:{x:0,y:0,z:u[2]+i}},{texture:r.texture,mipLevel:f,origin:{x:0,y:0,z:0}},{width:l,height:s,depthOrArrayLayers:1});{return za=c,ya}}c??=n.sourceView(t.texture,d),n.draw(e,c,u[2]+i,r.texture,f,a[2]+i)
za=c}
function Ca(r,e,t){r.texture.destroy(),r.tilesTexture.destroy(),e.delete(t)
}
function Da(t,r){let e=RhK(t);r=[{format:e.albedo},{format:e.words},{format:e.emissive},{format:e.read}]
return r}

function Fa(i){if(_T>=0){ylD(_T,LT===PT);}_T=i,LT=DT.get(i)??0;for(let e of DT.keys())if(e<=i)DT.delete(e)
}

function Ha(e,t){let r=CT.get(e);if(r!==void 0)return r.length===t.length&&r.every((e,r)=>e._residency===t[r]._residency)
return ca}
function Ia(t,i,e){return t.width===4?`vec4<f16>(vec4<f32>(${i(`vec3<f32>(${e}.xyz)`)}, f32(${e}.w)))`:`vec3<f16>(${i(`vec3<f32>(${e})`)})`
}
function Ja(l){return(`select(${l} + ${gf}, ${l}, ${Hr0})`)}
function Ka(i){return([...i.map((e)=>e.text),"@builtin(position) lume_position: vec4<f32>"].join(", "))}
function La(e,r,t){let i=`${e.label??"a pipeline"} (${r.unstored})`;if(!t.has(i))t.add(i),Z4.warn(`[lume] store door: ${i} writes ${Y6} from an entry the door could not store, so its gradients keep the format's steps`)
}
function Ma(s,e){return(s>=5&&e.startsWith("array",s-5)||s>=18&&e.startsWith("texture_storage_2d",s-18))}


function Qa(r){return(r.startsWith("texture_storage_2d<"))}
function Ra(r){return(`texture_storage_2d_array${r.slice(18)}`)}
function Sa(e,u){return e.replace(u,(e,t,r)=>`${t}texture_storage_2d_array${r}`);
}
function Ta(r){return(r.flatMap(((e)=>e===void 0?[]:[(Zpc(id,e))])))}
function Ua(l){return({code:l.doorText,bindings:new Map(l.bindings.map(([e,t])=>[e,new Set(t)]))})}
function Wa(t,l,s,o,e,i,a){if(t instanceof Tb&&l===void 0&&s===void 0&&o!==e.code){if(i.size>=$b)wEE(i);i.set(e.code,{code:o,bindings:a})}
}


function Za(e){let t=AXn(e),r=z4(t);if(r===null)return e;let i=[];for(let e of r){let r=fDv(t,e);if(r!==null)i.push(r)}return i.length===0?e:Q4(e,i)
}
function _a(s,l,i,r,e){let o={};for(let e of s)if(l.has(e)||!i.overrides.has(e))o[e]=r[e];let a={...e,constants:o};if(Object.keys(o).length===0)delete a.constants;
return a}
function $a(t,s,i,e,u,c,d,n){if(t===void 0&&s===void 0){if(i.refused.size>=$b)wEE(i.refused);i.refused.set(e.code,{code:u,identity:c,lineStarts:d})}throw new Tb(()=>n(c))
}
function ab(){this.stopParseOwner=dK((e)=>{this.parseOwner?.release(),this.parseOwner=e?.owner("gpu",YZ)??null,this.parseOwner?.resize(this.parseBytesLive)});
}
function bb(e){let t=this.census();Fn.info(`[lume] shader texts let go: ${this.wordsLetGo} module(s) since the last word; ${t.letGo} in all (${Math.round(t.letGoChars/1024)} K chars), ${t.standing} standing (${Math.round(t.standingChars/1024)} K chars), ${t.parsedAgain} parsed again for a later build; ${Math.round(t.parseBytes/1048576)} MB of parse uncollected; ${Sy5(t)}`),this.wordsAtMs=e,this.wordsLetGo=0
}
function db(e,t,r,i,n,l){this.builds.push({kind:e,label:t,at:"helper",sync:!1,startMs:r,settledMs:i,ok:n,chars:l})
}
function eb(c,e){c(gG(e instanceof Error?e:null,"Error"))
}
function fb(r,t,e){for(let e=1;e<this.waiting.length;e+=1){let i;{let e$21=this.waiting[e];{let e=e$21;let t=1/0;for(let r of e.asks)t=Math.min(t,r.lane());i=t;}}if(i<r||i===r&&this.waiting[e].id<this.waiting[t].id)t=e,r=i}let[i]=this.waiting.splice(t,1);if(this.builtBefore(i)){return xa[0]=t,xa[1]=r,ya}this.post(e,i)
xa[0]=t,xa[1]=r}

function hb(i,t){if(i.changed+=1,t!==null&&i.changedLabels.length<mT)i.changedLabels.push(t)
}
function ib(a,t,s,r,l,i){let e={id:a.id,startedAtMs:t(),settledAtMs:null,sourceCodeUnits:s,outcome:"pending",shared:!0,...a.slot===null||a.held===!0?{}:{slot:a.slot.index}};return a.asks.push({record:e,now:t,lane:r,skipped:l}),this.sharedAsks+=1,i?.(e),a.promise
}
function lb(a,n,l,s,o){if(this.prepared.add(a,this.preparedLabels.get(a)??null),n.skipped?.("prepared-before"),this.preparedBefore+=1,this.preparedBeforeKeys.add(a),l!==void 0)n.state?.("cache");let e=this.atDevice(s,!1,o);return this.retainUntil(e),e
}
function nb(n,s,e,l,o){n.skipped?.("device-lane");let t=this.atDevice(this.withState(s,e,l,n),!0,o);return this.retainUntil(t),t
}
function ob(n,e){n.skipped?.(e===null&&!this.failed?"no-recipe":"unavailable");
}
function pb(i,t,e){if(i.programs.add(t),!i.sets.has(t))i.sets.set(t,e);
}
function qb(e,r,n,i){return({...e,vertex:{...r,module:n},fragment:{...i,module:n}})}
function rb(e,t){e.out+=1;q1r:{if(e.kickQueued)break q1r;e.kickQueued=!0,e.kickTouches=e.touches,queueMicrotask(e.kick)}c4(e);return t.then(e.settled,e.refused)
}

function tb(e,i,t,r){ox.add(e);let n=i.read.then(()=>t.warmScope(r,"late").ready);return n.catch(function(){return}),{pipeline:null,ready:n,failed:!1}
}
function ub(r,s,n,l){let e=r.length;while(e>0&&r[e-1]===null)e-=1;sj.set(s,{colors:r.slice(0,e),depthStencil:n,samples:l})
}
function vb(t){return(`@location(${t}) lumeSurvivorAttr: u32`)}
function wb(){return`  if (lumeSurvivorCulled) { return ${wkn}; }`;
}
function xb(e,n,l,i){return e.queue.writeBuffer(n,0,l),Pf.set(e,{buffer:n,capacity:i}),n
}
function yb(e){let t=[],r=[],i=[],n=!1;for(let l of e){if(l===null||l===void 0){t.push(!1),r.push(0),i.push(-1);continue}let e=0;for(let t of l.attributes){e=Math.max(e,t.offset+Lww(t.format));}t.push(l.stepMode==="instance"),r.push(l.arrayStride),i.push(e),n=!0}return n?{instance:t,stride:r,last:i}:U9
}

function Ab(l,k,o,s,r,e){for(let t=0;t<l.length;t+=1){let i=l[t],n=k(i);if(n[o]===s)continue;n[o]=s,r[e.namedCount]=i,e.namedCount+=1}
}
function Bb(t){return(Reflect.get(t,"occlusionQuerySet")!==void 0)}
function Db(r){return r.createQuerySet({label:"lume work occlusion",type:"occlusion",count:O9})
}

function Fb(t,n,e,l){let r=o9(t.rec,n,e.device);if(r!==null)(l.work??=[]).push(r)
}

function Hb(t,A,P,ht,r){for(let e of t){let t=i9(e,"view"),i=t!==null?A(t):void 0;if(i!==void 0&&P(i))ht(r,"colorAttachment",i,"attachment")}
}
function Ib(ht,r,n){ht(r,"depthStencilAttachment",n,"attachment")
}
function Jb(i){return({label:i,compute:!0,shadow:!1,sampleCount:1,draws:[],queried:!1,overflow:0})}
function Kb(e){let t=this.judged[e],r=t.refused;for(let e=0;e<t.count;e+=1){let i=t.legs[e];t.legs[e]=oR;try{i(r)}catch{}}t.count=0,this.spare[this.spareCount++]=t
}
function Mb(e){if(e.storageTexture!==void 0)return this.view(`storage ${e.binding}`,e.storageTexture.format,e.storageTexture.viewDimension??"2d",1,c1);return null
}
function Nb(){return({stencilLoadOp:"clear",stencilStoreOp:"discard"})}
function Ob(e,n,t,r,i){let s=e.createCommandEncoder({label:`${n} clear`});s.clearBuffer(t,r,i),e.queue.submit([s.finish()])
}
function Qb(r,e){for(let t of r){if(t.refusal===null&&e.rejected!==null&&e.ordinal>=t.since)t.refusal=e.rejected.message;if(e.ordinal<t.through)continue;r.delete(t),t.settle(t.refusal)}
}
function Rb(n,i){for(let e=0;e<n;e+=1)try{i[e](!1)}catch{}
}
function Sb(t,e){t={completed:0,retired:!1,retiredAtMs:0,retiredUnheardMs:0,latencies:new Float64Array(4*ql),latencyNext:0,latencyCount:0,labels:[],first:0,count:0,wordless:!1,uploadMark:ZLG(),stampAtMs:NaN,stampUnheardMs:NaN},S1.set(e,t);
return t}
function Ub(e){e.first=e.first+e.count&e.labels.length-1,e.count=0;
}
function Vb(r,i,l){return`#${r} outside the graph: ${i.length===0?"no command buffer":l}`;
}
function Wb(e){let r=Reflect.get(e,"texture");return typeof r==="object"&&r!==null&&typeof Reflect.get(r,"label")==="string"?String(Reflect.get(r,"label")):""
}
function Xb(e){e.waiting.cancelled=!0,e.waiting=null;
}

function Zb(){let e=sl;sl=[],queueMicrotask(function(){for(let t of e)t()})
}
function _b(e){for(let[t,r]of hl){if(!e.startsWith(t))continue;if(r<=1)hl.delete(t);else hl.set(t,r-1);return{message:`debug: the take refused "${e}" as a device short of memory does`}}return null
}
function ac(){this.wholeView=this.current.createView(),this.wholeViewGeneration=this.currentGeneration;
}
function cc(){q1.delete(this.trial),this.trial.destroy(),this.trial=null
}
function dc(){let e=V1;for(let t of s5)if(t.settle(V1===e))s5.delete(t)
}
function ec(s){s=Promise.reject(new DOMException("lume: a map on a buffer whose map is pending","OperationError"));
return s}
function fc(vt,r,l,e){vt.submits+=1;let t=J5(r.message);if(!vt.families.has(t))vt.families.add(t),Fn.warn(`[lume] GPU ${l.type} error: ${l.message}`);e.onError?.(l)
}
function gc(e){let r=gQc(e,"lume share depth placeholder",ztC,Float32Array.of(eut));return tE.set(e,r),r
}
function jc(e,t){return this.release(),this.width=e,this.height=t,this.marks=FU6(this.device,{label:"lume through marks",size:Math.max(4,e*t*4),usage:128},DI0),this.marks.resource
}
function kc(r,t,e){let i=Math.min(tc,r-t.rows);e.queue.writeTexture({texture:t.texture.resource,origin:[0,t.rows]},pvk(t.rows,i),{bytesPerRow:r*4,rowsPerImage:i},[r,i]);t.rows+=i;return r-t.rows
}
function nc(){uE=mnS(uE);gE=mnS(gE);DE.moves=(EQ.moves);
}
function pc(e){return e.getBindGroupLayout(LjX,"lume pass-lights");
}
function qc(t,e){{Y8+=1,R8+=1}if(t===null)QE.delete(e);else QE.set(e,t);let r=XE.get(e);if(r!==void 0)for(let[t,i]of ayA(r).passGroupSeeThroughParts)OE(e,t,i)
}


function uc(r,e,t){if(this.atDevice.set(r,e),this.reachedAtMs.set(r,e),t!==void 0)this.named.set(r,{name:t,issuedAtMs:e})
}
function vc(e,r,t){if(!this.reachedAtMs.has(e))this.reachedAtMs.set(e,r);if(this.fenceCount>0)this.settled.set(e,t);else this.named.delete(e),this.reachedAtMs.delete(e);return this.noteGenerationWord(e,t),null
}
function wc(e){this.wholeAtMs=e,this.generationNewest=this.nextBuild-1,this.generationPeak=0;
}
function xc(){this.generationPeak=this.atDevice.size,this.generationNewest=this.nextBuild-1;
}
function yc(){let r=this.nextFence;this.nextFence+=1;let i=this.fenceCount;if(i===this.fenceTokens.length)this.growFenceColumns();
xa[0]=r,xa[1]=i}
function Ac(){return this.wanted=!1,this.cutLastFrame=!0,this.beginCollect(),this.holdKept(),!0
}

function Cc(){if(this.twin!==null)return this.twin.failed;return this.formless||!U9$()
}
function Dc(e){return e.peelCull?{peelCull:!0,frontFaces:!0}:jqA;
}
function Ec(){return"is not a build this renderer's pipeline cache knows";
}
function Fc(e,i,r){return e.heldForMs===null?`${i}; ${e.hold}`:`${i}; the line has issued nothing for ${r(e.heldForMs)}: ${e.hold}`
}
function Gc(i,e,r){return`was refused by the GPU ${i(e.attempts)} ("${e.error}") and retries in ${r(e.retryInMs)}`;
}
function Hc(i,e){return`was refused by the GPU ${i(e.attempts)} and is parked${e.deterministic?" for the session: the same rejection every attempt":" until the tab resumes or the world resets"} ("${e.error}")`
}


function Nc(t){if(t.standing+=1,t.standing===1)t.onChange(!0);
}
function Oc(r,e,t){let i=this.wallNowMs(),n=r.get(e);if(n===void 0)r.set(e,{module:t,atMs:i});else r.delete(e),n.module=t,n.atMs=i,r.set(e,n);while(r.size>this.moduleHeldMax)if(wEE(r)===void 0)break;if(this.firstGraceEndsAtMs===1/0)this.firstGraceEndsAtMs=i+60000;
return i}
function Pc(e){this.recentSweptAtMs=e,this.firstGraceEndsAtMs=1/0;let t=this.recentModules;for(let r of t.values()){if(e-r.atMs<=60000){this.firstGraceEndsAtMs=r.atMs+60000;break}wEE(t)}
}
function Rc(){if(this.askTextParsed())this.parseAnswerOwed=!0
}
function Sc(r){for(let e of r)if(e instanceof vQ)this.waitAsks(e)
}
function Tc(t){let e=this.speculativeDrawBase;if(t!==void 0&&(this.warmDepth===e[0]||this.laneDepth[js]<=e[js+1]&&this.laneDepth[Zs]>e[Zs+1]))this.speculativeDrawCapture.add(t);
}
function Wc(e){let t=this.drewBeforeKeys.get(e);if(t===void 0)this.drewBeforeKeys.set(e,t=this.drewBefore.has(this.recordName(e)));
return t}
function Xc(){return(this.settleOwesFrame||(this.queueRests?this.buildStands:this.buildsInFlight>0))}
function Yc(){return(this.submitJudge.isDecided&&this.submitJudge.verdict)}
function ed(e){this.viewLine=this.viewLine.slice(e).filter((e)=>e.pending());
}
function nd(r){return(r.cover!==void 0||r.through!==void 0||r.throughCover!==void 0||r.liquid!==void 0||r.materialData!==void 0||r.sampleFeedback!==void 0)}
function rd(a,u,i,e,d,f,g,h,p,m,c){return(()=>{let t=a(),r=typeof u==="function"?S1x(i,u):u??null,n=this.buildRenderPipeline(e,t);if(r!==null)this.linkBuilt(n,this.coverCompanionsBySource,{baseKey:e,descriptor:this.keptDescriptor(t),ask:r,handle:null});let l=`${e}|through`;let s=typeof d==="function"?S1x(i,d):d;let o=typeof s==="string"?jIR(t,s,l):null;if(o!==null)this.linkBuilt(n,this.throughTwinsBySource,{key:l,descriptor:this.keptDescriptor(o),entry:null});let y=`${e}|through-cover`;let v=typeof f==="function"?S1x(i,f):f;let w=typeof v==="string"?mIR(t,v,y):null;if(w!==null)this.linkBuilt(n,this.throughCoversBySource,{key:y,descriptor:this.keptDescriptor(w),entry:null});let b=`${e}|arm`;let k=g?Fq5(t,this.keptDescriptor(t),b,this.depthArmModule):null;if(k!==null)this.linkBuilt(n,this.depthArmsBySource,{key:b,descriptor:k,handle:null});let x=`${e}|data`;let M=typeof h==="function"?S1x(i,h):h;let S=typeof M==="string"?j2N(t,M,x):null;let I=S&&this.buildRenderPipeline(x,S).catch(()=>null);let R=`${e}|sample`;let A=p===void 0||bT(t)>1&&!f2D(this.device)?null:UlD(t,p,R);if(A!==null){this.linkBuilt(n,this.sampleTwinsBySource,{key:R,samples:bT(A),descriptor:this.keptDescriptor(A),handle:null});}if(m!==void 0){let r=`${e}|plane`,l=this.keptDescriptor(t);this.lookPlanes=!0;this.linkBuilt(n,this.lookPlaneTwinsBySource,{key:r,descriptor:function descriptor(){return (descriptor.$h??=$c0C(212)(l,i,m,r)).call(this)},handle:null})}if(c!==void 0&&MLp(t,c))this.linkBuilt(n,this.liquidTwinsBySource,{key:`${e}|liquid`,base:this.keptDescriptor(t),ask:c,record:i,descriptor:null});return I?Promise.all([n,I]).then(([e,t])=>{if(t)this.materialDataTwinsBySource.set(e,t);return e}):n})}
function sd(v,e,i,w){let t={key:v.key,of:e,descriptor:()=>S1x(i,()=>yQ(v.descriptor(),v.key)),entry:null,gate:YO(),...v.frontFaces?{frontFaces:!0}:{}};this.twinsByKey.set(e,t),w=this.gatedSource(t,w)
return w}
function Bd(r,t){return r.handle=this.askCoverCompanionOf(r.baseKey,r.descriptor,r.ask,t),r.handle
}
function Gd(t,r){uO=t,r=this.idleScope(this.askTwin),t.entry=r;let e=this.twinsByKey.get(t.of);if(e?.frontFaces)this.askTwinOf(this.frontFacesByKey.get(e.key))
return r}
function Hd(n){return n!==null&&!(this.approachDepth>0&&this.parsePaced)?js:Zs;
}
function Id(e,t,l){if(this.warmScope(()=>{if(this.standingEntry(this.computePipelines,e)===void 0)this.request(this.computePipelines,"compute",e,this.computeBuilder(e,t))},"late"),l.compute.built===null)this.askFragmentForm(l,e);
}
function Ld(t,e){if(t!==void 0)this.noteDevicePhase(e,t,this.wallNowMs());
}
function Qd(r,e,l,o,a){if(r!==void 0)r.twin=e;let t=null,i=(r)=>{let i=this.wallNowMs();if(e.releasedAtMs=i,r&&l.called.atMs!==null)t=i-l.called.atMs;return o()};a=l.build.then(()=>i(!0),()=>i(!1)),a.then(()=>{if(t===null||e.releasedAtMs===null)return;this.twinSpans.ownMs+=this.wallNowMs()-e.releasedAtMs,this.twinSpans.siblingMs+=t},function(){return})
return a}
function Sd(e,a,s,n){let u={key:e,build:a,called:s};this.stagesBuilding.set(n,u);let d=(()=>{if(this.stagesBuilding.get(n)===u)this.stagesBuilding.delete(n)});return a.then(d,d),a
}
function Ud(e,i){throw Error(`lume: peelCull requires a triangle pipeline ('${e}' is ${i})`);
}
function Zd(l,e,r,t){l={baseKey:e,mode:"variant",source:null,variantKey:r,descriptor:this.keptDescriptor(({...t,label:r,primitive:{...t.primitive,topology:t.primitive?.topology??"triangle-list",cullMode:"back"}})),entry:null}
return l}
function _d(e){this.sessionRecord=e;let t=this.recordOrdinals.get(e);if(t===void 0)this.recordOrdinals.set(e,t=this.recordsMet++);return this.sessionOrdinal=t
}
function ae(n,r,i){if(this.idleDepth===0&&!this.isDraw())this.idleEntries.delete(n);if(this.relaneOnAsk(n,r),n.failed&&this.retryOpens(n,r))this.rekickParked(n,r,i);
}
function be(r,t,e,i){this.noteAsked(r,t,!0,"late",!1,!1);let n=this.queuedEntry(e,r,i,js,!1);return this.oweEntryToCalm(n,r),n
}
function ce(e,r,i){let t=this.queuedEntry(e,r,i,_s,!0);return this.lineUp(t),this.drainWarmQueue(),t
}
function de(e,r,i){if(this.viewDepth>0){if(this.viewWaits()){let t=this.queuedEntry(e,r,i,Zs,!1);return this.lineForView(t),t}this.frameViewBuilds+=1}let o=this.issue(r,i,"draw"),a=new vQ(this,o,this.frameNowMs);return e.set(r,a),this.entryKeys.set(a,r),this.kickBuild(a,r,o),a
}
function ee(e,r){e.moved={atMs:this.wallNowMs(),from:fsR[r.lane]??"picture",to:"draw"},r.lane=Xs
}
function fe(e){this.requeue(e,(t)=>e.queued?.drawn?this.drawnInsertAt(t,e,e.queuedLane,!1):this.effectsStartAt(t))
}
function ge(e){if(this.viewDepth>0){if(this.viewWaits()){this.lineForView(e);return}this.frameViewBuilds+=1}this.issueQueued(e,"draw")
return ca}
function he(t,n,l,e){for(let e=0;e<t.length;e++)if(!n.includes(t[e]))l.push(t[e]);let s=this.speculationStartsAt(l);let v$25;Cqb:{let e$44=t,t$31=l,r$16=n,i$8=s;{let e=e$44,t=t$31,r=r$16,i=i$8;for(let n=0;n<e.length;n++){let l;if(n<i)l=t[n];else if(n<i+r.length)l=r[n-i];else l=t[n-r.length];if(e[n]!==l){v$25=!1;break Cqb;}}v$25=!0;}}if(!v$25){let t=l.slice(0,s);for(let e=0;e<n.length;e++)t.push(n[e]);for(let e=s;e<l.length;e++)t.push(l[e]);this.warmQueues[e]=t}n.length=0,l.length=0
}
function ie(l){return(this.viewLine.slice(0,l).filter((e)=>e.pending()).length)}

function ke(){return(`, a read that can be low by ${Kti} times`)}
function le(){return("its family has no smaller form, so its draws skip")}
function ne(r){return(`its family asks ${r} in its place`)}
function oe(e,r,t){this.markSpeculation(e,r.key,t),e.queued=null;let o=kJ3(),a;try{a=this.issue(r.key,r.create,t,e.queuedLane,!0)}finally{jGX(kJ3()-o)}
return a}
function pe(e,r,t,a,s){if(e.queued=r,this.heldTextAsk(e,t))return this.oweHeldText(e,r.key),!0;if(a===null)return!1;return this.heldForText.set(e,a.parsed),this.holdForText(s)
}
function qe(e,r,a){return this.heldForText.delete(e),this.kickBuild(e,r.key,a),a.then(r.resolve,r.reject),!0
}
function re(t,e){let r=t.queued,i=this.playerFramesHeld(),n=this.turnAt(this.drawsOwed,e,(e)=>this.owedMayTake(e,i)),l=this.drawsOwed[n].queued?.key;if(this.issueLaneDrawnAskedBefore(this.askRank(t),r.drawnAtMs,l,this.leadShareOf(t))){this.notePassed(r.key,"l");{return ya}}this.issueQueued(this.drawsOwed.splice(n,1)[0],"draw")
}
function se(t){this.drawsOwed.splice(this.drawsOwed.indexOf(t),1);
}
function te(e,t){let[r]=e.splice(t,1);r.queuedLane=Ns,this.oweDrawsBuild(r)
}
function ue(e){for(let t of e.splice(0))if(!this.frameStandsBetweenBuilds||t.queued===null||!this.drawBuildWaits(this.inFrameOne(t)))this.issueQueued(t,"draw");else t.queuedLane=Ns,this.oweDrawsBuild(t);
}
function ve(e){this.noteArrivingWait(`the first picture's line holds ${e.length} draw build(s): the player is owed the frames the last build held`);
}
function we(e){this.retiredSeen=e;let t=!1;for(let e of this.withdrawnValues){if((OL.has(e)))continue;this.withdrawnValues.delete(e),t=!0}if(t)this.answerMoves+=1;
}
function xe(r){for(let[e,t]of[...this.buildTaintsByKey]){if(!NL(t))continue;let i=this.entryAt(e);if(!i?.queued)continue;for(let e of t){if((OL.has(e)))this.withdrawnValues.add(e);}this.withdrawQueued(e,i,MQ),r+=1}
return r}
function ye(e){if(this.arrivingRidesBeforeWorld=e,e)this.drainWarmQueue()
}
function ze(e,t){if(this.poolFull(e,t))return"pool";return this.drawWaitsForPlayerFrames()?"frames":null
}
function Ae(t,r,e){t.rowAtMs=r;let i=t.holds;Tp.info(`[lume] a program waits for the compiler's idle time ${((r-t.waitSinceMs)/1000).toFixed(0)} s (${t.turns} idle turns taken): ${e} holds it now${e==="warm"?this.idleWarmWords():""}; the frames it waited: unseen ${i.unseen}, play ${i.play}, lanes ${i.lanes}, compiler ${i.compiler}, line ${i.line}, warm ${i.warm}, parse ${i.parse}, pool ${i.pool}, frames ${i.frames}`)
}
function Be(t){return t.waitSinceMs=null,t.rowAtMs=null,this.idleTurnFrame=this.framesBegunCount,t.turns+=1,!0
}
function Ce(e){this.placeOwnEntries.add(e);let t=this.ledgerOf(e);if(t)t.ownAtMs??=this.wallNowMs()
}
function De(e){if(this.liftFades=e,e===null)this.drainWarmQueue()
}
function Ee(r,e){return this.pictureAsks!==0&&!this.picturePlayed&&!r&&e.queuedLane===Xs;
}
function Fe(t){let e=t?.[0]??"",r=this.renderPipelines.get(e);if(r?.built&&!r.failed&&(this.buildLedger.get(e)?.calls?.last.deviceCall?.ownMs??0)>=SR)return!0
return ca}
function Ge(){this.roomDrainOwed=!0;{let e=()=>{this.roomDrainOwed=!1,this.drainWarmQueue()};if(Ws)Qs.push(e);else e()}
}
function He(e,l,t,i,r){let s=e[l];if(!s.pending()){return ya}if(!s.drawn()||this.effectAsk(s.entry)!==this.effectAsk(t.entry)||this.leadShareOf(s.entry)!==i){return $c}if(this.standInCostEntries.has(s.entry)){return ya}let o=this.sourceTurnOf(s.waiting()?.key);if(o>=r){return ya}
za=o}
function Ie(t){for(let e=fsR.length-1;e>=t;e-=1)if(this.warmQueues[e].some((e)=>e.pending()&&this.liftKeeps(e.entry)))return e+1;
return ca}
function Je(e){let t=this.entryKeys.get(e);return t!==void 0&&this.liftKeys.has(t)
}
function Ke(){return this.lastBuildHoldMs-(this.wallNowMs()-this.deviceSettledAtMs)
}
function Le(e){if(this.askUnits!==null)this.wholeUnits.set(e,this.askUnits);this.wholeOwed.push(e)
}
function Me(e){let t=this.wholeOwed[e];if(!SQ(t)){this.wholeOwed.splice(e,1);{return za=e,ya}}if(this.recoveredHolds(t,!0)){e+=1;{return za=e,ya}}if(!this.wholeHasRoom(this.wholeUnits.get(t)??null))return;this.wholeOwed.splice(e,1),this.issueQueued(t,"draw")
return za=e,ca}
function Ne(t,e){t.drawn=!1,t.drawnAtMs=null,t.frameLease=-1/0,t.lease&=~(vs|ps),this.frameReadEntries.delete(e),this.arrivalLeads.delete(e)
}
function Oe(o,s,n){o.push(`${s(n)} for the eye's first look`);
}
function Pe(e){if(this.memoryRoom=e,e!=="none")this.drainWarmQueue()
}
function Qe(t,e){return function(){for(let e of t)zRC(e);return typeof e==="function"?e():e}
}
function Re(){throw new mb("the quiet time ended")
}
function ca(){}var ea;function $c(){}function ya(){}var za;function xa(){}

;function $lpd0(o,k,v){Object.defineProperty(o,k,{value:v,writable:!0,enumerable:!0,configurable:!0})}import"./743eb90f0b6430ee.mjs";import"./60d2a80e-3b2a74e2c618d12a.mjs";import"./30aa681e95656ed9.mjs";import"./26ceb10f-156258ddd53795f5.mjs";import"./29e4af6f64ccf417.mjs";import"./59f8a5d8-d777575bdae834e6.mjs";import"./9b93e26679f0ec35.mjs";import"./55474339-8dbd8ce6215205e2.mjs";import"./6c6cfe9d-88f26afa029b98db.mjs";import{$R4 as n3b,$mX as qya,$vS as T9A,DS1 as a_o,EDk as IKx,Etg as fK,GZy as _$U,Grr as ksL,HTf as H$t,IHo as Gb_,K$C as YQB,Lyf as Vo5,NBri as wlg,Ph1 as RsL,QDe as __0,QZ$ as ZYD,Qp7 as bOJ,RTD as qVg,T9k as xGD,TKB as NJx,WeH as gWn,XJx as _K,Xm3 as lP4,dX5 as hb0,dxu as wsL,f3w as $QT,fx_ as uK,gkn as Rso,hGX as bXU,jnL as sK,kSy as QeN,khN as l5Y,lz2 as YNM,plrY as vsL,q1A as KK,q2sG as zma,qKM as pN4,rCX as ubP,rP3 as MK,rbM as GK,sMs as QK,sOp as SIf,sc1 as _sL,u7g as hZZ,vIR as LD7,vuT as kMD,wJc as LsL,wkt as xK,xr$B as QIk,xri as tZq,z17 as gaM,zBY as b6e,zxl as ic3}from"./6c6cfe9d-88f26afa029b98db.mjs";import{$xp as L6B,$zO as V7k,CM9 as IDf,CQ8 as FEG,G7W as NpD,GPY as k$w,Kk9 as ssL,L6z as k4y,LNy as vO8,LYb as qKU,MJN as OgH,Maf as uLW,Mb3 as xzz,N_Z as Aed,Nko as PDO,Nn0 as HJv,OoP as by7,P17 as jUg,R9n as wrq,TKG as jsL,TT7 as pAN,Wc9 as op0,XSB as PZs,Xc1 as YhI,Y7N as ngg,_Lq as XYw,_Qd as w_V,a90 as otq,aHD as ft5,bTQ as xsL,dm0 as cZh,h38 as DLP,j39 as jOW,lXb as mKO,nCY as FBb,oLf as z_O,p1z as Rmj,sGy as CSE,t3K as baM,uYW as kaF,ueN as e3w,v88 as WVR,w1n as OlA,wN9 as reG,wPO as RwP,wrG as JX4,wsw as QWA}from"./60d2a80e-3b2a74e2c618d12a.mjs";import{Azg as wLZ,BDb as nlo,H50 as LCW,Hmo as x5$,MLK as h9Y,SBw as nJy,Wfe as Ymi,_3Q as lsL,gSH as g4d,iI9 as gD0,m5H as xE9,mK0 as eCX,p3K as lK,pig as Zmr,pzi as niH,qBd as Hqn,t03 as yQl,x0Z as SsL,xKy as sRc,zb1 as OE9}from"./55474339-8dbd8ce6215205e2.mjs";import{EGD as l_q,J_U as _Td,Nly as ahj,cPn as J8B,d5P as UmR,pATP as AXn,q_Zc as RK,sPi as P3B,tSr as eMf,wUA as utO}from"./59031fb6a4af82a1.mjs";import"./5bfc27ec75dfbbea.mjs";import"./066edad7-f7400e45e1d275b5.mjs";import{$9E1 as A2n,$LJ as BK,$QG as FBz,$jj as aO7,AjA as FXA,Bfu as qZP,Cos as PNh,D2i as BbH,DOx as nej,EHW as IRe,EiT as dhh,Eyl as yNF,FN0 as zEr,FUa as hpi,Fm9 as asL,FtC as esL,Fyx as Rxz,GWt as ekR,Gey as oJD,JO4 as tsL,JYj as TZg,Je0 as MbE,Kw6 as iOc,KwFm as AsL,Lvy as QsL,MQF as l_6,MfJ as PVx,Nip as OuG,NlZ as oBK,Nt8 as yML,OF4 as aYH,PiO as le6,RBM as tM0,RdF as VsL,Rzg as Wuf,S6x as yK,SM4 as a1i,T$O as ZYv,Th2 as bVy,U2Z as i4k,USE as OT$,UXI as kHU,UgB as oAF,UmU as vq6,Usn as BHD,WVw as S77,XJi as jwv,Y_s as FFn,Zbs as Def,_9C as TsL,_Cn as zkH,_EQ as NK,_KC as rQq,_Te as _xl,_pI as v9_,b4b as qJ$,bW2 as u8m,b_B as jK,bwX as LiR,d1B as vDR,d9jE as ohL,dL1 as bsL,dU6 as Vhz,e6v as $nB,gYW as WWq,h3u as Jmk,hk2 as lsY,hmQ as XMr,igo as UsL,iia as mAA,jRh as VeE,ka6 as Dkm,kxF as Vvw,lJg as cK,lWq as jhu,mXr as IsL,mZw as O7v,mix as iaN,mnL as wu4,nQe as IPU,nxg as ApN,oH_ as gad,oSO as g4H,p5V as NZA,pg12 as UQ4,q4K as V$V,qD5 as etR,r9O as y3_,rb1 as csL,rl5 as HGV,rww as CYC,t$e as zQ7,tOU as mAc,tSz as fEu,tXf as OhB,tjA as gWX,vYU as Tra,w$F as GsL,wJb as Qmc,wXi as Mz4,wmy as NKj,xV2 as CI9,xZ$ as WK,y2I as epF,zAb as w9R,zBa as yBC,zLh as CsN,zWZ as TmM,zpJ as Nu2}from"./066edad7-f7400e45e1d275b5.mjs";import{GRx as aBL,JHw as kQZ,T8y as $Oy,UPf as h4Z,yUm as e2D}from"./9b93e26679f0ec35.mjs";import"./efbe309b-fde27a9a6882a0c8.mjs";import"./2b94eb755d27040b.mjs";import"./db293faeb5424f3a.mjs";import"./1d880ee6-36affc126cfb6269.mjs";import{$VS as Muz,AOt as vrT,BmTA as mbJ,CAz as qsL,CaY as i1p,Cfr as z89,D4y as O47,DMz as v2h,Dje as nK,FAD as zH_,Fhr as icW,I5f as _hv,Igi as wyp,Iyo as YK,JN3 as Qbr,J_d as OsL,JtW as ykH,KNl as hv6,Kes as PPU,Kl1 as rRx,LB5 as rsL,LUb as zcR,MNl as HM_,N98s as ysL,O6_ as MD3,OIu as lhh,PMj as rK,QOy as FsL,QQi as EK,SIZ as c_H,SUj as Pvu,Sm1 as Ba3,SyY as rc9,TXj as zsL,Urp as _Wb,Uwn as GVd,V$U as Utb,WTU as zGz,WoX as Cit,Wv1 as ZsL,XKP as JsL,XrO as yaY,YZJ as HK,Ya6 as aK,Yyo as AeN,ZPl as N7q,ZVA as zRp,_45 as LBa,_TM as QPc,_k8 as VK,_zb as vZa,baq as mzO,blu as xSn,bxa as aPr,ccY as hsL,dot as hIW,e$U as PsL,eMT as rAW,f7_ as Ygw,fJg as kK,fer as b7X,fyI as ssJ,g4i as KsL,hMa as ZVA,hNU as aji,i87 as HsL,i8y as _Q1,iH3 as xcU,iJh as AhA,j1R as PEZ,jSr as $rp,jzL as jFo,k$a as NsL,l6B1 as $sL,lLR as upm,lcf as pK,lhF as Wl9,m6_ as hK,mBM as DHF,mF7 as a9k,maF as psL,n7T as lJo,nY8 as MaI,oAAs as NrV,oqT as zTT,ov2 as ptl,pp9 as VZv,q0qK as nnD,qT0 as VkB,qU72 as QJE,qZi as geY,qig as FKW,r$_ as eK,r5_ as TK,rXG as KvY,sNJ as LK,sev as Jjt,sk_ as $nH,tD0 as RE5,tEX as GPy,u1$X as lik,u9Q as QsH,v1C as Ala,vE5 as C67,vGF as kqU,vW8 as Pms,wjp as w7T,wnK as TmG,xR_ as hJz,ypA as MRT,z3da as lx3,z9f as Cpz,zWb as a0I}from"./1d880ee6-36affc126cfb6269.mjs";import{Bjog as jCw,Gkw as Zpc,Oa7 as $P0,mhQ as JPf,n9D as Wbe}from"./26ceb10f-156258ddd53795f5.mjs";import"./6f4f7a830a853be4.mjs";import{Bqd as Zu8,Qjo as Jk6,YIx as vrH,h0H as HGI,njO as en8,wzV as rDG}from"./6f4f7a830a853be4.mjs";import{CfH as kJ3,Q3$ as Bra,UPw as BnR,WzV as ogj,aZt as knl,nQm as UEo,wmt as lSE}from"./2b94eb755d27040b.mjs";import"./f11f54a2bd263bff.mjs";import"./1db0beb7673c4ef7.mjs";import{AfZ as tK,BIL as da2,Csh as ihl,MHd as Mxu,MsAF as z_l,QVw as dK,UNz as msB,Usd as W20,_Uz as AaL,aJW as JbJ,cGz as hjz,dOp as $Cx,ktt as dI0,lOP as $jf,pzU as onQ,ryV as $mP,v2w as yLf}from"./1db0beb7673c4ef7.mjs";import{PIN as SZv,UaH as Jff,cAC as e5m,cqR as Gnm}from"./5bfc27ec75dfbbea.mjs";import{FCV as Iqc,QNo as ff6,bpY as vnE,gHe as kJP,hKZ as oH7,hne as gsL,lWk as wWz,mcz as ndr,ozx as cu6,u7z as EDK,wpo as WsL,z3d as MsL}from"./efbe309b-fde27a9a6882a0c8.mjs";import{IoT as Vum,PAL as CsL,b_V as fsL,flf as Crv}from"./30aa681e95656ed9.mjs";import{J03 as sDh,M6B as mnS,MlN as PDM,Qix as bLT,YIO as wEE,dhG as Iue,l9c0 as JrI,q5v as o7z,yi4 as rC3}from"./59f8a5d8-d777575bdae834e6.mjs";import{ONL as uRd,bdT as XBU}from"./db293faeb5424f3a.mjs";import{oBZ as NVe,s4l as T66,wDz as pmN,xm_ as CK}from"./743eb90f0b6430ee.mjs";import{Cka as kCv,zAR as hGq}from"./29e4af6f64ccf417.mjs";import"./4710582d60103e43.mjs";import{kHH as cc2}from"./4710582d60103e43.mjs";export{$1w,$2U,$8v,$91,$Cx,$Et,$GF,$IY,$Oy,$P0,$QT,$Rc,$V4,$Xa,$cZ,$dj,$ff,$jf,$kw,$ld,$mP,$mT,$nB,$nH,$nL,$nu,$rp,$ue,$vu,$wK,$wP,$w_,$wo,A0Q,A2n,A30,A3N,A9S,AAr,ACg,AFF,AJJ,ALi,ANF,AX9,AXn,AXy,AZ3,A_2,AaL,AeN,Aed,AhA,Ak$,Ak1,Ala,Ane,Anw,AoK,ApN,Art,At0,Avp,Awo,Ay1,B0c,B2i,B7i,B8V,B9I,BB4,BC0,BHD,BJJ,BJN,BKH,BLJ,BOr,BP9,BQe,BRY,BSN,BUj,BWh,Ba3,BaK,BbH,Bg$,Bg7,Bkm,BnR,Bra,Bu2,C3M,C5X,C67,CCw,CD_,CEb,CGc,CHj,CHq,CI9,CJD,CJa,CLc,CO2,CQA,CSE,CTf,CWW,CYC,CaX,Cc4,CcB,Cct,Ccu,Cea,Cfi,Cit,Cjy,Cmj,Cnl,Cpz,Cr4,Crv,CsN,CuZ,CwV,D0M,D0i,D0z,D4U,D6J,D7Y,DAq,DHF,DI0,DLP,DLT,DQt,DRr,DWe,Db2,DbP,Def,Dfo,DhD,Dkm,Dpw,Dry,DuM,Duk,Dvo,E0u,E6_,E8L,E8k,EAU,EC0,EDK,EFb,EIy,ENQ,E_n,E_y,EaR,Ebj,Ec9,Eg5,EjS,Ek_,ElH,EpY,Epe,Eqp,ErF,EuQ,Ewz,ExY,EyP,Ez4,EzM,F6b,FAX,FBb,FBz,FEG,FEs,FFn,FKB,FKW,FND,FOh,FOn,FS9,FT4,FTW,FU6,FUn,FVg,FXA,FYB,FZu,F__,Fe6,Fen,Fmr,Fo3,FpQ,Fpl,FsC,FsY,FtX,G0S,G0W,G27,G3B,G4Q,G4S,G7N,GCE,GIr,GN8,GOA,GPy,GT9,GTs,GVd,GYZ,Gb_,Gel,Ggo,GiN,Gjw,Gnm,Gop,Gq5,GsP,Gw2,GzN,H$t,H$v,H0q,H2l,H9i,HAU,HF5,HGI,HGV,HGr,HGz,HHj,HJv,HKP,HM_,HNd,HOw,HRC,H_I,HbO,HdI,Hj4,HkS,Hm7,Hom,Hqn,Hr0,Htp,HwX,I$b,I1G,I5d,I6c,IAY,ICN,IDf,II1,IJU,IKx,IMy,IPU,IQk,IRe,IXI,IZZ,IcM,IdT,Ieh,Iev,Ig_,Iik,Ij1,Ilv,Iom,Ior,IpN,IqV,Iqc,Irj,IsG,IuN,Iue,IyN,J$A,J$h,J0G,J5k,J7o,J8B,J9S,JDr,JG7,JGj,JIk,JLD,JNY,JNh,JNj,JPf,JQV,JX4,JbJ,JeK,Jff,JjF,Jjt,Jk6,Jls,Jmd,Jmk,JnW,Jog,JrI,Jrv,Ju$,Jy0,Jyn,K0D,K2S,K2e,K3g,K6d,K9_,KFG,KFd,KI2,KQT,KVO,K_E,K_P,KbS,KmN,Ko0,KpS,Kti,KvY,L1q,L3B,L6B,LBa,LCW,LD$,LD7,LHQ,LHa,LMv,LPQ,LQX,LS$,LSt,LV8,LcW,Lcn,Ldr,Lg7,LhZ,LiR,LjX,Lmj,Lmy,M3L,M4y,M6V,M8u,M9G,M9s,MD3,MDD,MHF,MHn,MIs,MMU,MPW,MRT,MTP,MUz,MV4,MYK,MYO,MYR,MYk,MaI,Mb6,Mb8,MbE,MbU,MfZ,MiM,MiQ,MlX,Mq5,MtU,Muz,Mxu,Mz4,N0P,N3S,N3m,N3x,N7B,N7q,N95,NAN,NCS,NIw,NJx,NKj,NLX,NLc,NOT,NVe,NVx,NZA,Nap,NbB,Nbr,NcM,Ncy,Nhp,Njx,NpB,NpD,Nq5,Nr5,NrV,Nsu,Nu2,NxB,O0z,O2u,O47,O7v,O87,O9k,OCD,OE9,OEE,OEs,OO8,OO_,OPO,OT$,OTV,OUu,OWU,OYS,OZN,Oez,OgH,OhB,Oi2,OjN,Oje,OlA,Otj,OuG,Ov9,OwD,Owu,Oyd,Ozc,P$u,P0P,P0V,P3B,P5Q,P7X,P8B,PDM,PDO,PEZ,PGd,PGr,PId,PJ2,PJM,PMu,PNX,PNh,PPU,PQO,PT4,PUA,PV9,PVx,PW_,PYw,PZs,PdH,Pgz,PhZ,PkI,Pms,Ppq,Pr8,Pri,Pvu,Pw3,Q$q,Q9z,QCW,QHe,QIk,QJE,QLt,QPc,QWA,QX2,QYr,QbW,Qbr,QcC,Qe2,QeN,QhF,Qjt,Qk7,QkR,Qmc,Qql,QrL,QsH,QuV,R0F,R29,R4r,R74,R9D,RAc,RDp,RE5,REd,RGd,RJu,RKC,RKN,RLQ,RLW,RMJ,RRg,RT3,RVm,RWB,RaL,Raz,RdA,RdK,Rda,RhK,Rho,RiT,Rk6,Rkn,Rmj,RqO,Rsh,Rso,Rta,RvD,Rw4,RwP,Rxz,S$C,S08,S1x,S36,S3p,S65,S77,S8m,S9g,SBR,SD2,SEr,SIf,SJN,SMP,SOp,SQp,SR2,SSh,SVN,SWX,SWv,SYm,SZv,SgO,Shc,Sik,Sp0,Sw_,Sxk,Sy5,Sy6,Sy9,T0e,T4L,T62,T66,T9A,T9C,T9b,TEE,TIr,TKx,TLF,TNi,TOb,TT5,TZg,Tbo,TcG,TdJ,TgN,ThI,TmG,TmM,Tpt,Tra,Tun,TwU,Tx7,Txe,Tya,Tz8,U$F,U2A,U2_,U9$,U9w,UAM,UEo,UFt,UJi,UKu,UNM,UOC,UP7,UQ4,UQW,UWi,UXe,UYX,U_x,UaS,Ubh,Ubp,UfN,Ugi,Uhq,UmR,Ust,Utb,Uu2,Uwn,V$V,V0h,V3y,V7k,VB6,VCM,VFC,VFZ,VUn,VV8,VYU,VZv,VcM,VeE,Vgt,Vhz,Vil,VkB,Vkh,VlH,Vnb,Vnj,Vo5,Vum,Vvw,Vzy,W20,W4c,W6G,W6k,W8p,W8y,W9l,WAL,WC6,WD_,WEa,WN8,WVR,WWl,WWq,WXa,W_m,Wbe,WdA,Wg1,Wi4,Wl9,WlJ,Wmw,WoY,Wp_,Wu9,Wuf,WwF,WzX,XA9,XBU,XCa,XD0,XGS,XHy,XIa,XKG,XMr,XRi,XT1,XUF,XYw,XcY,Xd0,XfG,Xgx,Xib,Xwf,Xy8,Xz2,Y0r,Y19,Y1I,Y2H,Y4s,Y7P,YHe,YNI,YNM,YOg,YQB,YST,YW9,Y_H,Ygw,YhI,Yk4,YkO,Yke,Ymi,YpB,YpW,Ypd,YrC,YsB,YsX,Yv5,Yyk,Yz1,Z7P,Z81,Z9b,ZEy,ZF3,ZLG,ZQr,ZTr,ZVA,ZYD,ZYv,Z_4,Zf6,Zjv,ZkT,Zmr,Zpc,Zq6,Zry,ZtC,Zu8,Zv$,Zyu,ZzM,Zzg,_$K,_$U,_09,_2m,_31,_7o,_CF,_GM,_Gs,_Mo,_Or,_PG,_Q1,_Td,_UH,_VC,_Wb,__0,__c,_hQ,_hv,_mJ,_o_,_pM,_w5,_xc,_xl,a0I,a1i,a3g,a4j,a8V,a9k,a9u,aBG,aBL,aGd,aO7,aOP,aPr,aRL,aYH,a_o,af1,afO,ahj,aji,amD,an_,apE,aqF,arM,arw,ayA,ayR,b4A,b6P,b6e,b7X,b7l,b8C,b8d,bAS,bCI,bHD,bI1,bJT,bK2,bLT,bM6,bOJ,bVy,bWh,bXU,baM,bbs,bcQ,bez,bfK,bgK,bgZ,bgw,bmJ,bmw,bny,bov,by7,c38,c5x,c6M,cBA,cCW,cEA,cGn,cIX,cQA,cRl,cT2,cTE,cW2,cZh,cZz,c_H,cc2,cdB,chq,cil,cjf,ckJ,clD,clR,clT,cu0,cu6,cuN,cuh,cxt,d1F,d9Q,dAA,dCp,dG8,dHc,dI0,dIG,dMI,dPH,dQJ,dXG,d_b,da2,ddY,ddi,df9,dhh,dlr,dnK,do1,dp3,dpH,dra,dv7,dvF,dwC,e08,e26,e2D,e2G,e36,e3w,e5m,eAG,eCX,eES,eGH,eKF,eLY,eMf,eQX,eRZ,eS_,eTU,eZu,ebK,egu,eh1,ekR,ely,en8,epF,ese,etR,euZ,eut,ewA,eyE,f1s,f2D,f52,f91,f9f,fCC,fEI,fEu,fL1,fMI,fN7,fPd,fQ1,fQc,fS1,fU9,fYE,feo,ff6,fqc,frM,fsR,ft5,fwc,g1o,g4H,g4d,g4f,g7l,g8F,gD0,gD1,gGm,gH1,gM5,gMg,gOw,gP6,gQc,gSX,gUH,gWK,gWX,gWn,gY1,gZ$,gaM,gad,gau,geY,ggH,giN,gia,glH,gnV,gnp,goO,goi,gpW,gp_,gpj,gsg,gyC,h1Q,h35,h4Z,h9Y,hGq,hIW,hJz,hKS,hL8,hME,hOh,hQR,hT2,hUf,hXR,hZZ,hb0,hfl,hjq,hjz,hk6,hkp,hku,hlQ,hml,hoq,hpi,hqN,hqT,htg,huG,hv6,hww,hxA,i1p,i4k,i6U,iC9,iF2,iJU,iLz,iMp,iOc,iXh,iYp,iZ7,i_x,iaN,ic3,icW,icY,id9,igX,ihO,ihl,izM,j0A,j4E,j7A,j9f,jBl,jBr,jCw,jEz,jFZ,jFo,jGX,jHG,jJz,jOO,jOW,jR$,jRd,jUg,j_W,jaR,jhk,jhu,jik,jkq,jlu,jnv,jqA,jqZ,jsj,jve,jw_,jwv,jyt,jz_,k$H,k$O,k$w,k$x,k4y,k5O,k7f,k9L,k9X,kAD,kCv,kHU,kHk,kHm,kJ3,kJP,kM5,kMD,kOY,kPZ,kQZ,kRa,kS2,kUn,kUu,kXg,kYW,kaF,kdS,kfT,klf,knN,knl,kpT,kpg,kpp,kqU,l2I,l5Y,l6z,l8Q,l9t,lAd,lCp,lDy,lE5,lG3,lJo,lJy,lP4,lSE,lTV,lX_,lZM,l_6,l_q,le6,lg1,lgo,lhA,lhh,lik,lll,lsY,lvr,lx3,lxv,lz3,m6_,mAA,mAc,mEK,mEp,mFK,mKO,mNi,mOt,mP7,mTY,mVY,mWA,mZE,m_Q,mas,mb7,mbJ,mfM,mk_,mnS,mp1,mpH,mrD,msB,msj,myU,mzO,n$2,n$N,n2$,n2E,n3b,n81,nAs,nD5,nEG,nJy,nRM,nTS,nWH,nbj,ncg,ndr,neZ,nej,nfJ,ngg,niH,niY,nik,nll,nlo,nnD,nsq,nxa,ny2,o2A,o3M,o3z,o4F,o4I,o58,o5p,o7z,oAF,oBK,oCN,oDE,oFD,oFG,oH7,oJD,oMD,oOy,oPM,oQA,oSg,oSr,oZc,oaQ,oaR,oby,odG,odz,ofu,ogj,ohL,okW,okg,onQ,ooS,op0,op4,oqg,osb,ose,otq,oxl,oys,p0a,p1S,p4w,p8O,pAN,pEu,pFw,pN4,pP6,pSG,pVv,pXa,pYA,paq,pcp,pdf,peK,peR,pgS,pif,plG,pmN,ppG,ptl,ptm,puU,pv5,q2M,q2c,q3M,q3S,q5q,q77,q97,qDF,qGC,qGP,qJ$,qKI,qKR,qKU,qVg,qWE,qX6,qZP,qZp,qbK,qkq,qmS,qp$,qp5,qr3,quG,qxL,qya,r1h,r4A,r4z,r5R,r84,rAW,rBw,rC3,rD3,rDG,rGV,rMq,rQq,rRx,rWB,rc9,reG,ree,rii,rjV,rkz,rma,rmz,rnY,roo,rox,rsj,rvi,ryF,ryy,rzY,s$2,s$A,s1P,s4X,s9h,sCX,sDh,sFa,sHp,sJ$,sM9,sRc,sSE,sTq,sY0,s_c,sb1,sbg,scD,siA,sle,sp1,sqG,srz,ssJ,stl,sx$,syV,syo,t0U,t5P,t8L,tDr,tHC,tM0,tM2,tS5,tW2,tWZ,tXH,tYn,tZq,ta5,tbc,tcv,tfV,tfq,tiG,tmB,tn5,tr1,tsB,tv6,tvs,ty8,u2d,u2p,u4J,u5k,u6C,u8m,uAo,uBr,uIn,uLE,uLW,uMX,uM_,uQW,uRd,uWt,uYi,uZV,u_B,ubP,udQ,udX,ufH,ufe,uhX,uhx,uic,ulw,upm,upy,usL,utO,uuE,v$D,v0g,v2h,v6R,v7o,v8X,v9S,v9_,vCn,vCz,vD5,vDR,vF0,vK9,vLk,vMb,vNi,vO8,vOp,vPg,vS8,vTI,vU6,vZa,v_L,vc0,vg9,vgU,vkh,vmh,vnE,voF,vq6,vrH,vrT,vsa,vuZ,vv1,vvy,vwF,vyO,vzW,w1s,w2f,w2r,w7T,w9R,wEE,wGi,wGv,wKC,wLZ,wWm,wWz,wZL,w_V,w_f,wa0,wbn,wkn,wlW,wlg,wm3,wn5,wrG,wrq,ws5,wsx,wsy,wta,wu4,wwK,wyp,x1Z,x3$,x4k,x5$,x7T,xCF,xE9,xEu,xGD,xPf,xSn,xTo,xX3,xcU,xii,xks,xmY,xnN,xox,xpx,xtT,xzO,xzz,y$A,y0x,y3_,y9N,y9V,yB1,yBC,yDA,yFv,yHd,yJS,yLf,yLr,yML,yNF,yQ4,yQl,yU6,yVx,yX3,yXb,yYf,yaY,ybU,ybd,ycn,ygr,ykH,ymL,ysP,ysT,ysW,yte,z$P,z0X,z0c,z5T,z5e,z89,z91,zAU,zCX,zD4,zEL,zEr,zGz,zH_,zJD,zJw,zM4,zPB,zQ7,zRC,zRE,zRY,zRp,zSP,zTT,zUC,zWg,zXp,z_O,z_l,zcR,zcw,zdk,zkH,zkI,zl_,zma,zrZ,zrk,ztC,zte,zvM,zwp};import{R as $Lr}from"./52e971dc2a986655.mjs";
