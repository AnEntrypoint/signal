# Measures any track bar by bar and writes scripts/lib/data/energy.yml, which the trip reads.
# usage: python3 tools/analyse-track.py <track.mp3> <bpm> <firstBeat seconds> <cdn path>
# Per bar: rms (loudness), bass (20-150 Hz), high (2-11 kHz, the overtones), each 0..1 over the track.
# A DROP is a bar where the overtones or the loudness fall away to bass (high or rms under 70% of the
# phrase before it, and staying down the next bar). A VISION is the 8-bar phrase that ends on a drop:
# the being builds while the highs climb and is cut away on the drop. Visions never touch each other.
import sys, subprocess, numpy as np
src, bpm, fb, cdn = sys.argv[1], float(sys.argv[2]), float(sys.argv[3]), sys.argv[4]
raw = subprocess.run(["ffmpeg", "-loglevel", "error", "-i", src, "-ac", "1", "-ar", "22050", "-f", "s16le", "-"], capture_output=True).stdout
x = np.frombuffer(raw, dtype=np.int16).astype(np.float32) / 32768; sr = 22050
bar = 240 / bpm; n = int((len(x) / sr - fb) / bar); phrase = 8
R = []
for i in range(n):
    s = x[int((fb + i * bar) * sr):int((fb + (i + 1) * bar) * sr)]
    F = np.abs(np.fft.rfft(s * np.hanning(len(s)))); f = np.fft.rfftfreq(len(s), 1 / sr)
    e = lambda a, b: float(np.sqrt((F[(f >= a) & (f < b)] ** 2).sum()))
    R.append([float(np.sqrt((s ** 2).mean())), e(20, 150), e(2000, 11000)])
R = np.array(R); R /= R.max(axis=0) + 1e-9
drops = []
for i in range(phrase, n - 1):
    prev = R[i - phrase:i].mean(axis=0)
    hi = R[i, 2] < 0.7 * prev[2] and R[i + 1, 2] < 0.7 * prev[2] and prev[2] > 0.12
    lo = R[i, 0] < 0.8 * prev[0] and R[i + 1, 0] < 0.8 * prev[0]
    if (hi or lo) and (not drops or i - drops[-1] >= phrase): drops.append(i)
t = lambda i: round(fb + i * bar, 2)
visions = []
for d in drops:
    a = d - phrase
    if a < 4: continue
    if visions and a < visions[-1][1] + 1: continue
    visions.append((a, d))
with open("scripts/lib/data/energy.yml", "w") as o:
    o.write(f"# written by tools/analyse-track.py from {cdn}: per bar [rms, bass, high], 0..1\n")
    o.write(f"track: {cdn}\nbpm: {bpm}\nfirstBeat: {fb}\nbar: {bar}\n")
    o.write(f"drops: [{', '.join(str(t(d)) for d in drops)}]\n")
    o.write("visions: [" + ", ".join(f"[{t(a)}, {t(b)}]" for a, b in visions) + "]\n")
    o.write("bars:\n" + "".join(f"  - [{r[0]:.2f}, {r[1]:.2f}, {r[2]:.2f}]\n" for r in R))
print("drops", [t(d) for d in drops]); print("visions", [(t(a), t(b)) for a, b in visions])
