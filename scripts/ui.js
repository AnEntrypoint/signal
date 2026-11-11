// The HUD: a roll button when idle; letterbox, a thin progress line and a cut button while rolling.
import { CINE, cineTime, sectionAt } from './lib/cine.js'
import { dealDeck, sceneTime } from './lib/deck.js'

const STYLE = `<style>
@keyframes cine-grow { from { width: 0 } to { width: 100% } }
@keyframes cine-bar { from { height: 0 } to { height: 9vh } }
</style>`

export default function render(ctx, player) {
  const t = cineTime(ctx)
  const key = ctx.world.inputs?.actions?.cine?.label
  if (t == null) {
    return `${STYLE}<div style="position:absolute;left:24px;top:24px;display:flex;gap:12px;align-items:center;font-family:inherit">
      <button onclick="sendAction('cine')" style="pointer-events:auto;background:#07040f;border:1px solid #ff3fb4;color:#ffd0f0;padding:10px 18px;font-size:18px;letter-spacing:.2em;box-shadow:0 0 18px #ff3fb455;cursor:pointer">▶ ROLL${key ? ` <span style="opacity:.6">[${key}]</span>` : ''}</button>
      <span style="color:#9a8fc0;font-size:14px;letter-spacing:.15em">3:18 · ${CINE.bpm} bpm</span>
    </div>`
  }
  // the same text for half a second at a time: the page only restyles when something visibly changes
  const bars = t < 0.6 ? `animation:cine-bar .6s ease-out ${-Math.floor(t * 10) / 10}s forwards` : 'height:9vh'
  const pct = Math.min(100, Math.floor((t / CINE.duration) * 400) / 4)
  return `${STYLE}
    <div style="position:absolute;left:0;right:0;top:0;background:#000;${bars}"></div>
    <div style="position:absolute;left:0;right:0;bottom:0;background:#000;${bars}"></div>
    <div style="position:absolute;left:0;bottom:0;height:2px;background:#ff3fb4;box-shadow:0 0 10px #ff3fb4;width:${pct}%;transition:width .5s linear"></div>
    <div style="position:absolute;left:24px;bottom:3vh;color:#9a8fc0;font-size:12px;letter-spacing:.4em;text-transform:uppercase">${sectionAt(sceneTime(t, dealDeck(ctx.world.state.cine?.seed ?? 0)))}</div>
    <button onclick="sendAction('cine')" style="pointer-events:auto;position:absolute;right:90px;top:3vh;background:none;border:1px solid #ff3fb466;color:#ff9fdc;padding:4px 10px;font-size:13px;letter-spacing:.2em">↻ NEW ROLL${key ? ` [${key}]` : ''}</button>`
}
