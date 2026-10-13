"""Stage only public website files for the GitHub Pages deployment artifact."""
from pathlib import Path
import shutil,json,re
root=Path(__file__).resolve().parents[1];stage=root/'_site'
if stage.exists():shutil.rmtree(stage)
stage.mkdir()
for pattern in ['*.html','*.css','*.js']:
 for path in root.glob(pattern):shutil.copy2(path,stage/path.name)
shutil.copytree(root/'assets',stage/'assets')
(stage/'.nojekyll').touch()
crystals=json.loads((stage/'assets/crystal-products.json').read_text());reeds=json.loads((stage/'assets/reed-products.json').read_text())
assert len(crystals)==13 and len(reeds)==69
assert sum(bool(x.get('packagingImage')) for x in crystals)==13
assert sum(bool(x.get('packagingImage')) for x in reeds)==36
assert len(json.loads((stage/'assets/christmas-products.json').read_text()))==35
for path in stage.glob('*.html'):
 for url in re.findall(r'(?:src|href)="([^"#]+)"',path.read_text()):
  if re.match(r'^[a-z]+:',url):continue
  file=url.split('#')[0].split('?')[0]
  assert (stage/file).exists(),f'{path.name}: missing public file {file}'
print('Prepared public website; companion photos, 35 Christmas products and local links verified.')
