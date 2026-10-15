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
catalogues={}
for category in ['candle','reed','crystal','gift','christmas','sachets']:
 data=json.loads((stage/f'assets/{category}-products.json').read_text());catalogues[category]=data
 for product in data:
  assert (stage/product['image']).exists(),f"Missing product photo: {product['image']}"
  if product.get('packagingImage'):
   assert (stage/product['packagingImage']).exists(),f"Missing packaging photo: {product['packagingImage']}"
   assert product['image']!=product['packagingImage'],'Both product views must be distinct'
   assert product['images']==[product['image'],product['packagingImage']],'Standalone view must precede packaging'
for path in stage.glob('*.html'):
 text=path.read_text()
 category=re.search(r'data-category="([^"]+)"',text)
 if category:
  rows=catalogues[category[1]];page=int(re.search(r'data-page="(\d+)"',text)[1]);indexes=[int(x) for x in re.findall(r'data-photo="(\d+)"',text)]
  collection=re.search(r'data-collection="([^"]+)"',text)
  if collection:
   configs=json.loads((stage/f'assets/{category[1]}-collections.json').read_text());config=next(c for c in configs if c['slug']==collection[1]);lookup={x['series']+' | '+x['name']:i for i,x in enumerate(rows)};ordered=[lookup[k] for k in config['productKeys']];expected=ordered[(page-1)*12:page*12]
  else:expected=list(range((page-1)*12,min(page*12,len(rows))))
  assert indexes==expected,f'{path.name}: catalogue pagination does not match data'
 for url in re.findall(r'(?:src|href)="([^"#]+)"',path.read_text()):
  if re.match(r'^[a-z]+:',url):continue
  file=url.split('#')[0].split('?')[0]
  assert (stage/file).exists(),f'{path.name}: missing public file {file}'
# Fragrance links must target the exact product on the correct category page.
from urllib.parse import urlsplit,parse_qs
fragrances=json.loads((stage/'assets/fragrances.json').read_text())
themes={'Floral & Fruity','Warm & Woody','Fresh & Natural','Tea & Tranquility','Oriental Mystery'}
assert len({s['id'] for s in fragrances})==len(fragrances)
for scent in fragrances:
 assert all(scent[k] for k in ['top','heart','base','description','matches'])
 assert set(scent['themes'])<=themes and scent['themes']
 for match in scent['matches']:
  target=urlsplit(match['href']);query=parse_qs(target.query)
  assert query['scent']==[scent['id']] and query['product']==[match['image']]
  rows=catalogues[match['category']];index=next(i for i,p in enumerate(rows) if p['image']==match['image'])
  page=(stage/target.path).read_text()
  assert f'data-category="{match["category"]}"' in page and f'data-photo="{index}"' in page,match['href']
print(f'Verified {len(fragrances)} fragrance profiles and {sum(len(s["matches"]) for s in fragrances)} specific product links.')
print('Prepared public website; product photos, paired-view order, catalogue pagination and public links verified.')
