"""Resolve reviewed fragrance/product associations to actual, paginated product cards."""
from pathlib import Path
from urllib.parse import urlencode
import json,re
root=Path(__file__).resolve().parents[1]
rows=json.loads((root/'assets/fragrances.json').read_text())
catalogues={c:json.loads((root/f'assets/{c}-products.json').read_text()) for c in ['candle','reed','crystal','gift','christmas','sachets']}
for scent in rows:
 assert len(scent['matches'])>=2
 scent['family']=scent['themes'][0]
 scent['notes']=' · '.join(scent['heart'])
 for match in scent['matches']:
  cat=match['category'];products=catalogues[cat];index=next(i for i,p in enumerate(products) if p['image']==match['image']);p=products[index]
  if cat in ['candle','reed']:
   collections=json.loads((root/f'assets/{cat}-collections.json').read_text());key=p['series']+' | '+p['name'];collection=next(c for c in collections if key in c['productKeys']);page=collection['productKeys'].index(key)//12+1
   target=('candles-' if cat=='candle' else 'reeds-')+collection['slug']+(f'-{page}' if page>1 else '')+'.html'
  else:
   page=index//12+1
   target=f'products-crystal-{page}.html' if cat=='crystal' else ('gift-collection' if cat=='gift' else 'christmas-collection' if cat=='christmas' else 'sachets')+(f'-{page}' if page>1 else '')+'.html'
  assert (root/target).exists(),target
  text=(root/target).read_text();assert f'data-photo="{index}"' in text,f'{target}: linked product is not on page'
  match.update(name=p['name'],series=p['series'],href=target+'?'+urlencode({'product':p['image'],'scent':scent['id']}))
(root/'assets/fragrances.json').write_text(json.dumps(rows,indent=2))
p=root/'catalog.js';text=re.sub(r'^const fragranceThemes = .*?;\n','',p.read_text(),flags=re.M);a=text.index('const scents = ');b=text.index('const candleProducts = ',a)
p.write_text(text[:a]+'const fragranceThemes = '+json.dumps(['Floral & Fruity','Warm & Woody','Fresh & Natural','Tea & Tranquility','Oriental Mystery'])+';\nconst scents = '+json.dumps(rows,indent=2)+';\n\n'+text[b:])
p=root/'fragrance.html';text=p.read_text().replace('Explore 30 fragrance directions.<br>Select a scent to discover its collection.',f'{len(rows)} fragrance directions across five themes.<br>Discover the notes and find your perfect pairing.')
text=re.sub(r'\d+ fragrance directions across five themes\.',f'{len(rows)} fragrance directions across five themes.',text)
text=text.replace('Concept collection: fragrance pairings and product availability are illustrative and will be confirmed with the final product catalogue.','Suggested fragrance profiles and product pairings. Contact us to confirm formulations and availability.')
p.write_text(text)
print(f'Fragrance library: {len(rows)} profiles; '+str(sum(len(s['matches']) for s in rows))+' specific product links verified')
