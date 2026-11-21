import json, os, sys
from PIL import Image, ImageChops, ImageStat

def emit(d):
    print(json.dumps(d))
    sys.exit(0)

def changed_mask(a, b):
    d = ImageChops.difference(a, b).convert('L').point(lambda v: 255 if v else 0)
    return d.histogram()[255], d.getbbox()

def compare(fa, fb):
    try:
        a = Image.open(fa).convert('RGB')
        b = Image.open(fb).convert('RGB')
    except Exception as e:
        emit({'present': False, 'reason': str(e)[:160]})
    if a.size != b.size:
        emit({'present': False, 'reason': 'size differs'})
    changed, bb = changed_mask(a, b)
    w, h = a.size
    emit({
        'present': True,
        'w': w,
        'h': h,
        'changed': changed,
        'changedFrac': round(changed / (w * h), 6),
        'bbox': list(bb) if bb else None,
        'bboxW': (bb[2] - bb[0]) if bb else 0,
        'bboxH': (bb[3] - bb[1]) if bb else 0,
        'meanRGB': [round(x, 1) for x in ImageStat.Stat(a).mean],
    })

def pair(fa, fb):
    a = Image.open(fa).convert('RGB')
    b = Image.open(fb).convert('RGB')
    if a.size != b.size:
        return {'changed': 0, 'bbox': None, 'size': 'differs'}
    changed, bb = changed_mask(a, b)
    return {'changed': changed, 'bbox': list(bb) if bb else None}

def series(run):
    try:
        seriesData = json.load(open(os.path.join(run, 'series.json')))
    except Exception as e:
        emit({'present': False, 'reason': 'series.json: ' + str(e)[:120]})
    if not seriesData or len(seriesData[0]['files']) < 2:
        emit({'present': False, 'reason': 'fewer than two canvas shots'})
    results = []
    for c in seriesData:
        fs = c['files']
        pairs = [pair(fs[k], fs[k + 1]) for k in range(len(fs) - 1)]
        results.append({'i': c['i'], 'w': c['w'], 'h': c['h'], 'pairs': pairs, 'changedPairs': sum(1 for p in pairs if p['changed'] > 0)})
    main = results[0]
    w, h = main['w'], main['h']
    changing = [p for p in main['pairs'] if p['changed'] > 0]
    boxes = [p['bbox'] for p in changing if p['bbox']]
    union = [min(b[0] for b in boxes), min(b[1] for b in boxes), max(b[2] for b in boxes), max(b[3] for b in boxes)] if boxes else None
    peak = max(changing, key=lambda p: p['changed']) if changing else {'changed': 0}
    mean = ImageStat.Stat(Image.open(seriesData[0]['files'][0]).convert('RGB')).mean
    emit({
        'present': True,
        'w': w,
        'h': h,
        'pairCount': len(main['pairs']),
        'changedPairs': main['changedPairs'],
        'changed': peak['changed'],
        'changedFrac': round(peak['changed'] / (w * h), 6),
        'bbox': union,
        'bboxW': (union[2] - union[0]) if union else 0,
        'bboxH': (union[3] - union[1]) if union else 0,
        'meanRGB': [round(x, 1) for x in mean],
        'canvases': [{'i': r['i'], 'w': r['w'], 'h': r['h'], 'changedPairs': r['changedPairs']} for r in results],
    })

if sys.argv[1] == 'series':
    series(sys.argv[2])
else:
    compare(sys.argv[1], sys.argv[2])
