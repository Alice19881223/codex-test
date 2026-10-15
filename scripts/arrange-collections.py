"""Save reviewed page arrangements without changing categories, product membership or images."""
from pathlib import Path
import json
from merchandising import paginate,arrange
root=Path(__file__).resolve().parents[1]
catalogues={cat:json.loads((root/f'assets/{cat}-products.json').read_text()) for cat in ['candle','reed','crystal','gift','christmas','sachets']}
for cat in ['candle','reed']:
 path=root/f'assets/{cat}-collections.json';collections=json.loads(path.read_text());lookup={p['series']+' | '+p['name']:p for p in catalogues[cat]}
 for c in collections:
  if c.get('manualPageOrder'):
   assert [key for page in c['pages'] for key in page]==c['productKeys']
   continue
  pages=paginate([lookup[k] for k in c['productKeys']]);c['pages']=[[p['series']+' | '+p['name'] for p in page] for page in pages];c['productKeys']=[key for page in c['pages'] for key in page]
 path.write_text(json.dumps(collections,ensure_ascii=False,indent=2))
 print(cat,{c['name']:[len(p) for p in c['pages']] for c in collections})
layouts={cat:[[p['image'] for p in page] for page in paginate(catalogues[cat])] for cat in ['crystal','gift','christmas','sachets']}
(root/'assets/catalogue-layouts.json').write_text(json.dumps(layouts,indent=2))
path=root/'assets/fragrances.json';scents=json.loads(path.read_text())
for scent in scents:
 lookup={(m['category'],m['image']):m for m in scent['matches']}
 products=[dict(next(p for p in catalogues[m['category']] if p['image']==m['image']),category=m['category']) for m in scent['matches']]
 scent['matches']=[lookup[(p['category'],p['image'])] for p in arrange(products)]
path.write_text(json.dumps(scents,indent=2))
print('Fragrance products grouped by series and palette; associations preserved.')
