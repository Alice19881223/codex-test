"""Remove the retired Ivory Winter Rocking Horse product and its generated assets."""
from pathlib import Path
import json,re
from product_records import item_no,product_url

ROOT=Path(__file__).resolve().parents[1]
NAME='Ivory Winter Rocking Horse'

def read(name):return json.loads((ROOT/'assets'/name).read_text())
def write(name,data):(ROOT/'assets'/name).write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')

products=read('christmas-products.json');target=next(p for p in products if p['name']==NAME);images=set(target['images']);products=[p for p in products if p['name']!=NAME]
scents=read('fragrances.json')
for scent in scents:scent['matches']=[m for m in scent['matches'] if not(m.get('category')=='christmas' and m.get('image')==target['image'])]
display=read('product-display.json');display.pop(target['image'],None)
assignments=read('product-fragrances.json');assignments.pop(item_no('christmas',target['image']),None)
identities=read('product-identities.json');identities.get('christmas',{}).pop(target['image'],None)
media=read('image-manifest.json')
for src in images:
 entry=media.pop(src,None)
 if entry:
  for variant in entry.get('variants',[]):
   path=ROOT/variant['src']
   if path.exists():path.unlink()
  path=ROOT/src
  if path.exists():path.unlink()
manifest=read('christmas-festive-stories-source-manifest.json');manifest['products']=[p for p in manifest['products'] if p['name']!=NAME];manifest['images']=[x for x in manifest['images'] if x['image'] not in images];manifest['pairCount']=len(manifest['products']);manifest['removedProducts']=[NAME]
for name,data in [('christmas-products.json',products),('fragrances.json',scents),('product-display.json',display),('product-fragrances.json',assignments),('product-identities.json',identities),('image-manifest.json',media),('christmas-festive-stories-source-manifest.json',manifest)]:write(name,data)
catalog=ROOT/'catalog.js';text=catalog.read_text();text=re.sub(r'const christmasProducts = \[.*?\n\];',lambda m:'const christmasProducts = '+json.dumps(products,ensure_ascii=False,indent=2)+';',text,count=1,flags=re.S);catalog.write_text(text)
page=ROOT/product_url('christmas',target['image'])
if page.exists():page.unlink()
print('Removed',NAME,'and',len(images),'source views.')
