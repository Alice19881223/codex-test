"""Publish immutable CSS/JS filenames, then update every HTML asset reference.
Run after catalogue, script or style changes so old caches cannot mix page versions.
"""
from pathlib import Path
import hashlib,re,runpy
root=Path(__file__).resolve().parents[1]
if (root/'assets/candle-collections.json').exists():runpy.run_path(str(root/'scripts/build-candle-collections.py'))
runpy.run_path(str(root/'scripts/build-christmas-pages.py'))
runpy.run_path(str(root/'scripts/update-navigation.py'))
for original in ['app.js','catalog.js','styles.css']:
 data=(root/original).read_bytes();stem,suffix=original.rsplit('.',1);v=hashlib.sha256(data).hexdigest()[:12];filename=f'{stem}-{v}.{suffix}';(root/filename).write_bytes(data)
 pattern=re.escape(stem)+r'(?:-[a-f0-9]{12})?\.'+suffix+r'(?:\?v=[^"\s]*)?'
 for p in root.glob('*.html'):
  s=p.read_text();updated=re.sub(pattern,filename,s)
  if updated!=s:p.write_text(updated)
 print(filename)
