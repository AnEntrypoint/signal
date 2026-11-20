import json, sys
from PIL import Image, ImageChops, ImageStat

def out(d):
    print(json.dumps(d))
    sys.exit(0)

try:
    a = Image.open(sys.argv[1]).convert('RGB')
    b = Image.open(sys.argv[2]).convert('RGB')
except Exception as e:
    out({'present': False, 'reason': str(e)[:160]})

if a.size != b.size:
    out({'present': False, 'reason': 'size differs'})

d = ImageChops.difference(a, b).convert('L').point(lambda v: 255 if v else 0)
changed = d.histogram()[255]
w, h = a.size
bb = d.getbbox()
out({
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
