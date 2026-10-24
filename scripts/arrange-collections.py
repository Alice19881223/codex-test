"""Save reviewed page arrangements without changing categories, product membership or images."""
from pathlib import Path
import json
from merchandising import paginate,arrange
root=Path(__file__).resolve().parents[1]
catalogues={cat:json.loads((root/f'assets/{cat}-products.json').read_text()) for cat in ['candle','reed','crystal','gift','christmas','sachets']}
for cat in ['candle','reed']:
 path=root/f'assets/{cat}-collections.json';collections=json.loads(path.read_text());lookup={p['series']+' | '+p['name']:p for p in catalogues[cat]}
 for c in collections:
  # Preserve the reviewed flat order; only the final page may contain fewer than 12.
  keys=c['productKeys'];assert len(keys)==len(set(keys)) and all(k in lookup for k in keys)
  c['pages']=[keys[i:i+12] for i in range(0,len(keys),12)]
 path.write_text(json.dumps(collections,ensure_ascii=False,indent=2))
 print(cat,{c['name']:[len(p) for p in c['pages']] for c in collections})
previous=json.loads((root/'assets/catalogue-layouts.json').read_text())
layouts={}
for cat in ['crystal','gift','christmas','sachets']:
 flat=[image for page in previous[cat] for image in page]
 assert len(flat)==len(set(flat)) and set(flat)=={p['image'] for p in catalogues[cat]}
 layouts[cat]=[flat[i:i+12] for i in range(0,len(flat),12)]
# Preserve the reviewed Christmas order, including the dedicated final ornament page.
order_path=root/'assets/catalogue-order.json'
if order_path.exists():
 order=json.loads(order_path.read_text())
 for cat,pages in order.items():
  lookup={p['name']:p for p in catalogues[cat]}
  names=[name for page in pages for name in page]
  assert len(names)==len(set(names)) and set(names)==set(lookup),f'{cat}: reviewed order must contain every product once'
  order[cat]=[names[i:i+12] for i in range(0,len(names),12)]
  layouts[cat]=[[lookup[name]['image'] for name in page] for page in order[cat]]
 order_path.write_text(json.dumps(order,ensure_ascii=False,indent=2)+'\n')
(root/'assets/catalogue-layouts.json').write_text(json.dumps(layouts,indent=2))
path=root/'assets/fragrances.json';scents=json.loads(path.read_text())
for scent in scents:
 lookup={(m['category'],m['image']):m for m in scent['matches']}
 products=[dict(next(p for p in catalogues[m['category']] if p['image']==m['image']),category=m['category']) for m in scent['matches']]
 scent['matches']=[lookup[(p['category'],p['image'])] for p in arrange(products)]
path.write_text(json.dumps(scents,indent=2))
print('Fragrance products grouped by series and palette; associations preserved.')
