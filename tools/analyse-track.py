# Measures ANY track from its file alone and retimes the whole show to it.
# usage: python3 tools/analyse-track.py <track.mp3> <cdn path> [--bpm N --first S to override]
# Finds: tempo (onset autocorrelation, 70-190 bpm), first beat (phase that best fits the onsets),
# duration, per bar [rms, bass 20-150 Hz, high 2-11 kHz] 0..1, drops (overtones or loudness falling
# to bass), the kick's span (bars with real bass), and vision windows (32 bars climbing into a drop).
# Writes scripts/lib/data/energy.yml whole, and in score.yml the music/bpm/firstBeat/duration/kick lines,
# the deck's two long stretches (split at the drop nearest the middle) and the sections, rescaled to the length.
import sys, re, subprocess, numpy as np
a = sys.argv[1:]; src, cdn = a[0], a[1]
opt = lambda k: float(a[a.index(k) + 1]) if k in a else None
raw = subprocess.run(["ffmpeg", "-loglevel", "error", "-i", src, "-ac", "1", "-ar", "22050", "-f", "s16le", "-"], capture_output=True).stdout
x = np.frombuffer(raw, dtype=np.int16).astype(np.float32) / 32768; sr = 22050; dur = len(x) / sr
# onset envelope: positive spectral flux on 512-sample hops
hop, win = 512, 1024; fr = (len(x) - win) // hop
S = np.abs(np.fft.rfft(np.lib.stride_tricks.sliding_window_view(x, win)[::hop][:fr] * np.hanning(win), axis=1))
S = np.log1p(S * 50); flux = np.maximum(S[1:] - S[:-1], 0).sum(axis=1); flux = np.concatenate([[0], flux])
flux -= np.convolve(flux, np.ones(16) / 16, "same"); flux = np.maximum(flux, 0); fps = sr / hop
bpm = opt("--bpm")
if not bpm:
    ac = np.correlate(flux, flux, "full")[len(flux) - 1:]
    best, bpm = -1, 120
    for b in np.arange(70, 190.01, 0.25):
        lag = 60 / b * fps; v = 0
        for m in (1, 2, 4): i = lag * m; v += ac[int(i)] * (1 - i % 1) + ac[int(i) + 1] * (i % 1)
        if v > best: best, bpm = v, b
    if bpm < 95: bpm *= 2   # a dance track counts its kick, not the half bar
    bpm = round(bpm * 4) / 4
beat = 60 / bpm
fb = opt("--first")
if fb is None:
    ph = np.arange(0, beat, 0.01); n = int(dur / beat)
    sc = [sum(flux[min(len(flux) - 1, int((p + k * beat) * fps))] for k in range(n)) for p in ph]
    fb = float(ph[int(np.argmax(sc))])
fb = round(fb, 2); bar = 4 * beat; n = int((dur - fb) / bar); phrase = 8
R = []
for i in range(n):
    s = x[int((fb + i * bar) * sr):int((fb + (i + 1) * bar) * sr)]
    F = np.abs(np.fft.rfft(s * np.hanning(len(s)))); f = np.fft.rfftfreq(len(s), 1 / sr)
    e = lambda lo, hi: float(np.sqrt((F[(f >= lo) & (f < hi)] ** 2).sum()))
    R.append([float(np.sqrt((s ** 2).mean())), e(20, 150), e(2000, 11000)])
R = np.array(R); R /= R.max(axis=0) + 1e-9
drops = []
for i in range(phrase, n - 1):
    prev = R[i - phrase:i].mean(axis=0)
    hi = R[i, 2] < 0.7 * prev[2] and R[i + 1, 2] < 0.7 * prev[2] and prev[2] > 0.12
    lo = R[i, 0] < 0.8 * prev[0] and R[i + 1, 0] < 0.8 * prev[0]
    if (hi or lo) and (not drops or i - drops[-1] >= phrase): drops.append(i)
t = lambda i: round(fb + i * bar, 2)
kick = [i for i in range(n) if R[i, 1] > 0.5]
kf, kt = (t(kick[0]), t(kick[-1] + 1)) if kick else (t(0), t(n))
visions = []   # 32 bars climbing into a drop, never touching (fewer bars if the track is short)
span = 32 if n >= 96 else 16
for d in drops:
    s0 = d - span
    if s0 < 4 or (visions and s0 < visions[-1][1] + 4): continue
    visions.append((s0, d))
with open("scripts/lib/data/energy.yml", "w") as o:
    o.write(f"# written by tools/analyse-track.py from {cdn}: per bar [rms, bass, high], 0..1\n")
    o.write(f"track: {cdn}\nbpm: {bpm}\nfirstBeat: {fb}\nbar: {round(bar, 4)}\n")
    o.write(f"drops: [{', '.join(str(t(d)) for d in drops)}]\n")
    o.write(f"# VISION SCENES: a being's own scene holds the {span} bars that climb into a drop, measured per track\n")
    o.write("visions: [" + ", ".join(f"[{t(p)}, {t(q)}]" for p, q in visions) + "]\n")
    o.write("bars:\n" + "".join(f"  - [{r[0]:.2f}, {r[1]:.2f}, {r[2]:.2f}]\n" for r in R))
# score.yml: timing lines, deck stretches and sections follow the track
sp = "scripts/lib/data/score.yml"; s = open(sp).read()
old = float(re.search(r"^duration: ([\d.]+)", s, re.M).group(1))
intro, outro = t(min(8, n // 8)), (t(drops[-2]) if len(drops) >= 2 and t(drops[-2]) > dur * 0.75 else round(dur - min(18, dur * 0.1), 2))
mid = min((t(d) for d in drops if intro + 24 < t(d) < outro - 24), key=lambda v: abs(v - (intro + outro) / 2), default=round((intro + outro) / 2, 2))
for k, v in (("music", cdn), ("bpm", bpm), ("firstBeat", fb), ("duration", round(dur, 2)), ("kickFrom", kf), ("kickTo", kt)):
    s = re.sub(rf"^{k}:[ \t]*[^\s#]+", f"{k}: {v}", s, count=1, flags=re.M)   # keeps a trailing comment's spacing
s = re.sub(r"^  segments: \[[^\n#]*\]", f"  segments: [[{intro}, {mid}], [{mid}, {outro}]]", s, count=1, flags=re.M)
def sec(m):  # sections rescaled from the track they were written for onto this one's intro..outro
    a0, b0 = float(m.group(2)), float(m.group(3))
    f = lambda v: 0 if v == 0 else round(dur, 2) if v >= old else round(v * dur / old, 2)
    return f"{m.group(1)}[{f(a0)}, {f(b0)}]"
blk = re.search(r"^sections:\n((?:  .*\n)+)", s, re.M)
if blk and abs(dur - old) > 0.5:
    s = s[:blk.start(1)] + re.sub(r"(^  \w+:\s+)\[([\d.]+), ([\d.]+)\]", sec, blk.group(1), flags=re.M) + s[blk.end(1):]
open(sp, "w").write(s)
print("bpm", bpm, "firstBeat", fb, "duration", round(dur, 1), "bars", n)
print("drops", [t(d) for d in drops]); print("visions", [(t(p), t(q)) for p, q in visions]); print("deck", [[intro, mid], [mid, outro]], "kick", kf, kt)
