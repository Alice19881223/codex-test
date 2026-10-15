"""Resolve reviewed fragrance/product associations to actual, paginated product cards."""
from pathlib import Path
from urllib.parse import urlencode
import json,re
from product_records import product_url
root=Path(__file__).resolve().parents[1]
rows=json.loads((root/'assets/fragrances.json').read_text())
catalogues={c:json.loads((root/f'assets/{c}-products.json').read_text()) for c in ['candle','reed','crystal','gift','christmas','sachets']}
for scent in rows:
 scent['collectionHref']='fragrance-'+scent['id']+'.html'
 assert scent['matches'], 'A fragrance collection needs at least one relevant product'
 scent['family']=scent['themes'][0]
 scent['notes']=' · '.join(scent['heart'])
 for match in scent['matches']:
  cat=match['category'];products=catalogues[cat];index=next(i for i,p in enumerate(products) if p['image']==match['image']);p=products[index]
  if cat in ['candle','reed']:
   collections=json.loads((root/f'assets/{cat}-collections.json').read_text());key=p['series']+' | '+p['name'];collection=next(c for c in collections if key in c['productKeys']);page=next(i+1 for i,keys in enumerate(collection['pages']) if key in keys)
   target=('candles-' if cat=='candle' else 'reeds-')+collection['slug']+(f'-{page}' if page>1 else '')+'.html'
  else:
   layouts=json.loads((root/'assets/catalogue-layouts.json').read_text());page=next(i+1 for i,images in enumerate(layouts[cat]) if p['image'] in images)
   target=f'products-crystal-{page}.html' if cat=='crystal' else ('gift-collection' if cat=='gift' else 'christmas-collection' if cat=='christmas' else 'sachets')+(f'-{page}' if page>1 else '')+'.html'
  assert (root/target).exists(),target
  text=(root/target).read_text();assert f'data-photo="{index}"' in text,f'{target}: linked product is not on page'
  match.update(name=p['name'],series=p['series'],catalogueHref=target,href=product_url(cat,p['image'])+'?'+urlencode({'scent':scent['id']}))
(root/'assets/fragrances.json').write_text(json.dumps(rows,indent=2))
p=root/'catalog.js';text=re.sub(r'^const fragranceThemes = .*?;\n','',p.read_text(),flags=re.M);a=text.index('const scents = ');b=text.index('const candleProducts = ',a)
p.write_text(text[:a]+'const fragranceThemes = '+json.dumps(['Floral & Fruity','Warm & Woody','Fresh & Natural','Tea & Tranquility','Oriental Mystery'])+';\nconst scents = '+json.dumps(rows,indent=2)+';\n\n'+text[b:])
# Preserve bookmarked URLs while opening the inline menu instead of a separate library view.
(root/'fragrance.html').write_text('<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="refresh" content="0;url=index.html?fragrances=open"><title>Fragrance — Lanarve</title><link rel="canonical" href="index.html?fragrances=open"></head><body><p><a href="index.html?fragrances=open">Explore fragrances by theme</a></p></body></html>')
print(f'Fragrance library: {len(rows)} profiles; '+str(sum(len(s['matches']) for s in rows))+' specific product links verified')
