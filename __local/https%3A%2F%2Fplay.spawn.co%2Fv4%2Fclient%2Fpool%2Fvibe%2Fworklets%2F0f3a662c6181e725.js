// Envelope-follower worklet — drives signal-driven sidechain ducking.
// Input: kick-bus signal. Output: -depth × envelope (negative; sums into target gains).
// Targets' outGain.gain has nominal value 1; this signal subtracts to dip them on kicks.

class SidechainFollower extends AudioWorkletProcessor {
  static get parameterDescriptors() {
    return [
      { name: 'attack', defaultValue: 0.005, minValue: 0.001, maxValue: 0.5, automationRate: 'k-rate' },
      { name: 'release', defaultValue: 0.12, minValue: 0.01, maxValue: 1.0, automationRate: 'k-rate' },
      { name: 'depth', defaultValue: 0.4, minValue: 0, maxValue: 1.0, automationRate: 'k-rate' },
    ];
  }

  constructor() {
    super();
    this.env = 0;
    // A processor whose process() returns true is kept alive and run every render quantum, connected or not; the sampler's "stop" ends it.
    this.alive = true;
    this.port.onmessage = (e) => {
      if (e.data && e.data.type === 'stop') this.alive = false;
    };
  }

  process(inputs, outputs, params) {
    if (!this.alive) return false;
    const out = outputs[0];
    if (!out.length) return true;
    const inp = inputs[0];
    const a = Math.exp(-1 / Math.max(1, params.attack[0] * sampleRate));
    const r = Math.exp(-1 / Math.max(1, params.release[0] * sampleRate));
    const depth = params.depth[0];
    const blockLen = out[0].length;
    for (let i = 0; i < blockLen; i++) {
      let peak = 0;
      if (inp && inp.length > 0) {
        for (let ch = 0; ch < inp.length; ch++) {
          const v = inp[ch][i];
          const av = v < 0 ? -v : v;
          if (av > peak) peak = av;
        }
      }
      if (peak > this.env) this.env = peak * (1 - a) + this.env * a;
      else this.env = this.env * r;
      const sub = -depth * (this.env > 1 ? 1 : this.env);
      for (let ch = 0; ch < out.length; ch++) out[ch][i] = sub;
    }
    return true;
  }
}

registerProcessor('sidechain-follower', SidechainFollower);
