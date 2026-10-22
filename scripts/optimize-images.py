"""Generate checked-in WebP derivatives; never mutate catalogue source images/identity keys.
Optional authoring dependency: Pillow (see requirements-images.txt). Production builds use
these committed outputs plus the manifest and do not need Pillow.
"""
from pathlib import Path
import hashlib,json,re
from PIL import Image,ImageOps
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'assets/optimized';OUT.mkdir(exist_ok=True)
paths=set()
for p in ROOT.glob('*.html'):
 for src in re.findall(r'<img\b[^>]*\bsrc="([^"]+)"',p.read_text()):
  f=ROOT/src
  if f.is_file() and f.suffix.lower() in {'.png','.jpg','.jpeg','.webp'} and not src.startswith('assets/optimized/'):
   paths.add(src)
# Re-runs retain original source identities after the HTML has already been optimized.
manifest_path=ROOT/'assets/image-manifest.json'
if manifest_path.exists():paths.update(json.loads(manifest_path.read_text()).keys())
result={};saved=0
for src in sorted(paths):
 f=ROOT/src
 with Image.open(f) as opened:
  im=ImageOps.exif_transpose(opened).copy()
 if im.mode not in {'RGB','RGBA'}:im=im.convert('RGBA' if 'transparency' in im.info else 'RGB')
 w,h=im.size;entry={'width':w,'height':h,'sourceBytes':f.stat().st_size,'src':src,'variants':[]}
 if f.stat().st_size>120000:
  digest=hashlib.sha256(f.read_bytes()).hexdigest()[:16]
  for target in sorted({min(w,480),min(w,960),min(w,1600)}):
   dest=OUT/f'{digest}-{target}.webp'
   if not dest.exists():
    resized=im.copy();resized.thumbnail((target,max(1,round(h*target/w))),Image.Resampling.LANCZOS);resized.save(dest,format='WEBP',quality=88,method=4)
   entry['variants'].append({'src':dest.relative_to(ROOT).as_posix(),'width':target,'bytes':dest.stat().st_size})
  # Don't grow an already efficient source just to enforce a file extension.
  largest=entry['variants'][-1]
  if largest['bytes']<f.stat().st_size:
   entry['src']=largest['src'];saved+=f.stat().st_size-largest['bytes']
  else:entry['variants']=[]
 result[src]=entry
manifest_path.write_text(json.dumps(result,indent=2)+'\n')
print(f'{len(result)} raster sources; {sum(bool(x["variants"]) for x in result.values())} responsive sets; largest-source saving {saved:,} bytes')
