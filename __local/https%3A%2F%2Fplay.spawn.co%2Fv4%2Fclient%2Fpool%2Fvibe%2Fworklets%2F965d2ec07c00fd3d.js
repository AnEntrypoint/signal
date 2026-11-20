// Granular pitch-shifter worklet — overlap-add Hann grains.
// Pitch shift via per-grain resampling rate; grain SCHEDULING rate is fixed at 1.0
// so the playback duration is preserved. (Native BufferSourceNode.playbackRate
// changes both pitch and duration; this fixes the chipmunky-pitched-up problem.)
//
// Owner sends 'load' (mono or stereo Float32Arrays) then 'play' with timing.
// Sample-accurate start via currentFrame + the requested playAtSec.

class GranularPlayer extends AudioWorkletProcessor {
  constructor() {
    super();
    this.bufferL = null;
    this.bufferR = null;
    this.bufferLength = 0;
    this.startFrame = -1;
    this.releaseFrame = Infinity;
    this.releaseDur = 0;
    this.stopFrame = Infinity;
    this.pitchRatio = 1;
    this.userGain = 1;
    this.grainSize = 2048; // ~43ms at 48k
    this.hopSize = 512; // 4× overlap → smooth crossfades
    this.outPos = 0;
    this.lastGrainOut = -2048;
    this.grains = [];
    this._buildWindow();
    this.alive = true;
    this.port.onmessage = (e) => this._msg(e.data);
  }

  _buildWindow() {
    const N = this.grainSize;
    const w = new Float32Array(N);
    // Hann × 4-overlap normalization (sum of 4 overlapping Hanns at any offset ≈ 2.0).
    const norm = 1 / 2.0;
    for (let i = 0; i < N; i++) {
      w[i] = 0.5 * (1 - Math.cos((2 * Math.PI * i) / (N - 1))) * norm;
    }
    this.window = w;
  }

  _msg(m) {
    if (m.type === "load") {
      this.bufferL = m.bufferL;
      this.bufferR = m.bufferR ?? m.bufferL;
      this.bufferLength = this.bufferL.length;
    } else if (m.type === "play") {
      this.startFrame = Math.round(m.playAtSec * sampleRate);
      this.pitchRatio = m.pitchRatio ?? 1;
      this.userGain = m.gain ?? 1;
      this.releaseFrame = m.releaseStartSec !== undefined && isFinite(m.releaseStartSec) ? Math.round(m.releaseStartSec * sampleRate) : Infinity;
      this.releaseDur = Math.max(1, (m.releaseDur ?? 0.05) * sampleRate);
      this.stopFrame = m.stopSec !== undefined && isFinite(m.stopSec) ? Math.round(m.stopSec * sampleRate) : Infinity;
      this.outPos = 0;
      this.lastGrainOut = -this.hopSize - 1;
      this.grains.length = 0;
    } else if (m.type === "stop") {
      this.alive = false;
    }
  }

  process(_inputs, outputs) {
    const out = outputs[0];
    if (!out.length || !this.alive) return false;
    const blockLen = out[0].length;
    const numCh = out.length;
    if (this.startFrame < 0 || !this.bufferL) {
      for (let c = 0; c < numCh; c++) out[c].fill(0);
      return true;
    }
    if (currentFrame >= this.stopFrame) {
      for (let c = 0; c < numCh; c++) out[c].fill(0);
      this.port.postMessage({ type: "finished" });
      return false;
    }
    for (let i = 0; i < blockLen; i++) {
      const absFrame = currentFrame + i;
      if (absFrame < this.startFrame) {
        for (let c = 0; c < numCh; c++) out[c][i] = 0;
        continue;
      }
      // Spawn a grain every hopSize output samples. srcStart advances at the OUTPUT
      // rate (not pitchRatio); each grain reads source at pitchRatio internally. Together
      // these decouple duration (output rate) from pitch (within-grain rate).
      if (this.outPos - this.lastGrainOut >= this.hopSize) {
        const srcStart = this.outPos;
        if (srcStart < this.bufferLength) this.grains.push({ outStart: this.outPos, srcStart });
        this.lastGrainOut = this.outPos;
      }
      // Sum active grains.
      let sumL = 0,
        sumR = 0;
      for (let g = this.grains.length - 1; g >= 0; g--) {
        const gr = this.grains[g];
        const gp = this.outPos - gr.outStart;
        if (gp >= this.grainSize) {
          this.grains.splice(g, 1);
          continue;
        }
        const srcIdx = gr.srcStart + gp * this.pitchRatio;
        if (srcIdx >= this.bufferLength - 1) continue;
        const w = this.window[gp];
        const sI = srcIdx | 0;
        const f = srcIdx - sI;
        const lA = this.bufferL[sI],
          lB = this.bufferL[sI + 1];
        const rA = this.bufferR[sI],
          rB = this.bufferR[sI + 1];
        sumL += (lA + (lB - lA) * f) * w;
        sumR += (rA + (rB - rA) * f) * w;
      }
      // Release envelope.
      let env = 1;
      if (absFrame >= this.releaseFrame) {
        const t = (absFrame - this.releaseFrame) / this.releaseDur;
        env = t >= 1 ? 0 : 1 - t;
      }
      const G = env * this.userGain;
      out[0][i] = sumL * G;
      if (numCh > 1) out[1][i] = sumR * G;
      this.outPos++;
    }
    return true;
  }
}

registerProcessor("granular-player", GranularPlayer);
