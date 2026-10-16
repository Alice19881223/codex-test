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
   configs=json.loads((stage/f'assets/{category[1]}-collections.json').read_text());config=next(c for c in configs if c['slug']==collection[1]);lookup={x['series']+' | '+x['name']:i for i,x in enumerate(rows)};expected=[lookup[k] for k in config['pages'][page-1]]
  elif 'data-arranged-catalogue="true"' in text:
   layouts=json.loads((stage/'assets/catalogue-layouts.json').read_text());lookup={p['image']:i for i,p in enumerate(rows)};expected=[lookup[image] for image in layouts[category[1]][page-1]]
  else:expected=list(range((page-1)*12,min(page*12,len(rows))))
  assert indexes==expected,f'{path.name}: catalogue pagination does not match data'
 for url in re.findall(r'(?:src|href)="([^"#]+)"',path.read_text()):
  if re.match(r'^[a-z]+:',url):continue
  file=url.split('#')[0].split('?')[0]
  assert (stage/file).exists(),f'{path.name}: missing public file {file}'
# A series that fits on a page must remain together; layouts must not hide products.
from collections import Counter
def validate_arrangement(pages,lookup,allowed_split_series=()):
 assert all(0<len(page)<=12 for page in pages)
 flat=[key for page in pages for key in page]
 assert len(flat)==len(set(flat))
 counts=Counter(lookup[key]['series'] for key in flat)
 series_pages={}
 for number,page in enumerate(pages):
  runs=[]
  for key in page:
   series=lookup[key]['series'];series_pages.setdefault(series,set()).add(number)
   if not runs or runs[-1]!=series:runs.append(series)
  assert len(runs)==len(set(runs)),'A series is interrupted within a page'
 assert all(len(numbers)==1 for series,numbers in series_pages.items() if counts[series]<=12 and series not in allowed_split_series),'A series was split across pages'
for cat in ['candle','reed']:
 configs=json.loads((stage/f'assets/{cat}-collections.json').read_text());lookup={p['series']+' | '+p['name']:p for p in catalogues[cat]}
 for config in configs:
  assert [key for page in config['pages'] for key in page]==config['productKeys']
  validate_arrangement(config['pages'],lookup)
for cat,pages in json.loads((stage/'assets/catalogue-layouts.json').read_text()).items():
 lookup={p['image']:p for p in catalogues[cat]}
 assert {key for page in pages for key in page}==set(lookup)
 # The reviewed Christmas layout fills each page; the final ornaments and explicitly swapped character series may span pages.
 if cat=='christmas':assert all(len(page)==12 for page in pages[:-1]),'Christmas pages must be full before the last page'
 validate_arrangement(pages,lookup,allowed_split_series=('Botanical Wax Ornaments','Playful Christmas') if cat=='christmas' else ())
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
  assert query['scent']==[scent['id']]
  rows=catalogues[match['category']];index=next(i for i,p in enumerate(rows) if p['image']==match['image'])
  detail=(stage/target.path).read_text()
  assert f'data-product-category="{match["category"]}"' in detail and match['image'] in detail,match['href']
  page=(stage/match['catalogueHref']).read_text()
  assert f'data-category="{match["category"]}"' in page and f'data-photo="{index}"' in page,match['href']
for scent in fragrances:
 collection=(stage/scent['collectionHref']).read_text()
 assert f'data-fragrance="{scent["id"]}"' in collection
 from html import unescape
 images=[unescape(image) for image in re.findall(r'data-product-image="([^"]+)"',collection)]
 assert images==[match['image'] for match in scent['matches']],f'{scent["id"]}: fragrance collection must contain every associated product'
from html import unescape
expected_menu_links=[match['collectionHref'] for theme in ['Floral & Fruity','Warm & Woody','Fresh & Natural','Tea & Tranquility','Oriental Mystery'] for match in fragrances if theme in match['themes']]
for path in stage.glob('*.html'):
 text=path.read_text()
 if '<header>' in text:
  links=[unescape(url) for url in re.findall(r'class="fragrance-scent-link" href="([^"]+)"',text)]
  assert links==expected_menu_links,f'{path.name}: compact fragrance links are incomplete'
  assert 'id="scent-grid"' not in text,'The retired fragrance-card view must not be published'
# Every product has a stable, nonempty detail page and uses only its supplied images.
records=json.loads((stage/'assets/product-details.json').read_text())
assert len(records)==sum(len(items) for items in catalogues.values())
assert len({record['itemNo'] for record in records})==len(records)
for record in records:
 text=(stage/record['url']).read_text()
 assert f'data-product-reference="{record["itemNo"]}"' in text and record['image'] in text
 assert 'id="product-inquiry-form"' in text and 'id="product-page-data"' in text
 for document in record['documents']:
  assert document['verified'] is True and record['itemNo'] in document['itemNos']
  assert (stage/document['file']).is_file() and (stage/document['thumbnail']).is_file()
print(f'Verified {len(records)} full product pages, references, inquiry forms and scoped documentation.')
print(f'Verified {len(fragrances)} fragrance profiles and {sum(len(s["matches"]) for s in fragrances)} specific product links.')
print('Prepared public website; product photos, paired-view order, catalogue pagination and public links verified.')
