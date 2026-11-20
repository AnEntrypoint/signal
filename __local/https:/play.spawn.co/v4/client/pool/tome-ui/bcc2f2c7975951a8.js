/* spawn.js v1.4.0 — Fix console interception perf (timer thrashing, stack trace alloc) */

import * as Comlink from "./cb5ca2b4-de0740d12cb07631.mjs";

if (window.parent === window) {
  console.error("[Spawn] Not in iframe");
  throw new Error("Spawn bootstrap failed");
}

/* Log buffer for batching */
const logBuffer = [];
const LOG_BUFFER_MAX = 200;
let flushTimer = null;

/* Capture original console methods before any overrides */
const originalConsole = {
  log: console.log.bind(console),
  warn: console.warn.bind(console),
  error: console.error.bind(console),
  info: console.info.bind(console),
};

/* Helper to get error stack info (only used for unhandled rejections) */
function getLocation() {
  const error = new Error();
  const stack = error.stack || "";
  const lines = stack.split("\n");
  const relevantLine = lines[3] || lines[2] || "";
  return relevantLine.trim();
}

/* Send logs to parent */
function sendLogsToParent() {
  if (logBuffer.length === 0) return;

  const logs = [...logBuffer];
  logBuffer.length = 0;

  window.parent.postMessage(
    {
      type: "spawn:logs",
      logs: logs,
    },
    "*"
  );
}

/* Flush logs periodically — schedule once, don't re-arm on every log */
function scheduleFlush() {
  if (flushTimer) return;
  flushTimer = setTimeout(() => {
    flushTimer = null;
    sendLogsToParent();
  }, 1000);
}

/* Stringify a single log argument */
function stringifyArg(arg) {
  if (arg === null) return "null";
  if (arg === undefined) return "undefined";
  if (typeof arg !== "object") {
    try {
      return String(arg);
    } catch {
      return "[Unstringifiable]";
    }
  }
  try {
    return JSON.stringify(arg);
  } catch {
    if (arg instanceof Error) return `Error: ${arg.message}`;
    if (arg instanceof Event) return `Event: ${arg.type}`;
    if (arg instanceof HTMLElement) return `HTMLElement: <${arg.tagName.toLowerCase()}>`;
    try {
      return `[${arg.constructor?.name || "Object"}]`;
    } catch {
      return "[Object]";
    }
  }
}

/* Cache static fields — they never change within a page */
let cachedPathname = "";
let cachedUserAgent = "";
let cachedHostname = "";
function ensureCachedFields() {
  if (!cachedPathname) {
    cachedPathname = window.location.pathname;
    cachedUserAgent = navigator.userAgent;
    cachedHostname = window.location.hostname;
  }
}

/* Create log entry */
function createLogEntry(level, args) {
  ensureCachedFields();
  return {
    level,
    message: args.map(stringifyArg).join(" "),
    timestamp: Date.now(),
    pathname: cachedPathname,
    userAgent: cachedUserAgent,
    hostname: cachedHostname,
  };
}

/* Override console methods */
["log", "warn", "error", "info"].forEach((method) => {
  console[method] = function (...args) {
    // Call original method
    try {
      originalConsole[method](...args);
    } catch {}

    // Buffer the log (drop oldest if overflowing)
    if (logBuffer.length >= LOG_BUFFER_MAX) logBuffer.shift();
    logBuffer.push(createLogEntry(method, args));
    scheduleFlush();
  };
});

/* Capture unhandled errors */
window.addEventListener("error", (event) => {
  if (logBuffer.length >= LOG_BUFFER_MAX) logBuffer.shift();
  logBuffer.push({
    level: "error",
    message: `Unhandled error: ${event.message}`,
    timestamp: Date.now(),
    location: `${event.filename}:${event.lineno}:${event.colno}`,
    pathname: window.location.pathname,
    userAgent: navigator.userAgent,
    hostname: window.location.hostname,
    stack: event.error?.stack,
  });
  scheduleFlush();
});

/* Capture unhandled promise rejections */
window.addEventListener("unhandledrejection", (event) => {
  if (logBuffer.length >= LOG_BUFFER_MAX) logBuffer.shift();
  logBuffer.push({
    level: "error",
    message: `Unhandled promise rejection: ${event.reason}`,
    timestamp: Date.now(),
    location: getLocation(),
    pathname: window.location.pathname,
    userAgent: navigator.userAgent,
    hostname: window.location.hostname,
    stack: event.reason?.stack,
  });
  scheduleFlush();
});

/* Deferred resolved by parent's init */
let initResolve;
const initP = new Promise((res) => (initResolve = res));

/* Helper for game code */
function onSpawnInit(cb) {
  initP.then(cb);
}

/* Listen for parent's pong and init */
window.addEventListener("message", (ev) => {
  if (ev.source !== window.parent) return;
  if (ev.data === "spawn:pong") gotPong = true;
  if (ev.data === "spawn:init") initResolve();
});

let gotPong = false;

/* Ping parent until pong */
const pingInterval = setInterval(() => {
  if (gotPong) {
    clearInterval(pingInterval);
    return;
  }
  window.parent.postMessage("spawn:ping", "*");
}, 10);

/* Once init resolves, create proxy & set window.spawn */
initP.then(() => {
  const proxy = Comlink.wrap(Comlink.windowEndpoint(window.parent));
  Object.defineProperty(window, "spawn", { value: proxy });

  // Flush any buffered logs immediately after init
  sendLogsToParent();
});

export const proxy = Comlink.proxy;
export const _Comlink = Comlink;
