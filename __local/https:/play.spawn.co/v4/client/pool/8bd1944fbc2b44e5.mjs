
var q=["button","a","input","select","textarea",'[role="button"]',"[onclick]","[ondblclick]","[onmousedown]","[onmouseup]","[ontouchstart]","[ontouchend]","[onpointerdown]","[onpointerup]",'[draggable="true"]',"[ondragstart]","[ondragover]","[ondrop]","[ondragenter]","[ondragleave]","[ondragend]",".resize",".resize-x",".resize-y","[data-resizable]","[data-interactive]","[data-action]","[data-chrome-event]","[data-chrome-action]"],H=[...q,"[tabindex]"];var Q="spawn-ui-link-down";var G=[...q,'[tabindex]:not([tabindex^="-"])'];var V=(function(){return`
    ${G.map(((F)=>`.spawn-ui-link-down ${F}:not(spawn-canvas, canvas, video, :has(spawn-canvas, canvas, video))`)).join(`,
    `)} {
      filter: grayscale(0.6) brightness(0.75) !important;
      cursor: progress !important;
      transition: filter 240ms ease-out;
    }
  `});
export{H as hF9,Q as a1F,V as orP};
