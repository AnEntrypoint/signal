self.Worker=self.SharedWorker=void 0;self.fetch=()=>Promise.reject(new TypeError("a priming realm asks the network for nothing"));self.__spawnColdNoRead=1;
addEventListener("message",function hear(event){
const word=event.data;if(!word||word.warmPrime!=="load"||!Array.isArray(word.urls))return;
removeEventListener("message",hear);
if(word.table)self.__spawnBuilt=word.table;
const urls=word.urls;
(async()=>{for(const url of urls){const at=performance.now();let threw="";try{await import(url)}catch(error){const cause=String(error&&error.message||error);if(!String(error&&error.stack||"").split("\n").slice(1).some((line)=>line.includes(url))){postMessage({warmPrime:"threw",url,cause});return}threw=cause}postMessage({warmPrime:"loaded",url,ms:performance.now()-at,threw})}postMessage({warmPrime:"end"})})();
});
