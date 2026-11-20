{ const r = { value: 0, done: false }; r.value = null; r.done = true; }
const held = [], hold = (event) => { held.push(event); };
addEventListener("message", hold);
addEventListener("messageerror", hold);
const root = new URL(import.meta.url).searchParams.get("root") || "";
(/^[\w-]+\.mjs$/.test(root) ? import(new URL("./" + root, import.meta.url).href) : Promise.reject(new Error("the door's address names no root"))).then(() => {
  removeEventListener("message", hold);
  removeEventListener("messageerror", hold);
  for (const event of held.splice(0)) dispatchEvent(event.type === "message" ? new MessageEvent("message", { data: event.data, ports: [...event.ports] }) : new MessageEvent("messageerror"));
}, (error) => {
  setTimeout(() => { throw new Error("[worker-door] the realm's root did not load: " + (error instanceof Error ? error.message : String(error))); });
});
