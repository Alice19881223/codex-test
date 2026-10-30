"""Replace three reviewed Halloween main images while preserving product URLs and packaging views."""
from pathlib import Path
from io import BytesIO
import hashlib,json,re,runpy,sys,zipfile
from PIL import Image,ImageOps
import product_records
from product_records import item_no

ROOT=Path(__file__).resolve().parents[1]
REPLACEMENTS={
 'Midnight Cat Witch':'浮雕双烛芯蜡烛居中展示-2.png',
 'Bat & Pumpkin Gold':'白底居中的浮雕双芯蜡烛-3.png',
 'Ivory Ghost Garden':'白色双芯浮雕蜡烛-1.png',
}
def read(name):return json.loads((ROOT/'assets'/name).read_text())
def write(name,data):(ROOT/'assets'/name).write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')

def main():
 assert len(sys.argv)==2,'Pass the owner replacement archive'
 products=read('halloween-products.json');scents=read('fragrances.json');layouts=read('catalogue-layouts.json');display=read('product-display.json');media=read('image-manifest.json');identities=read('product-identities.json');manifest=read('halloween-source-manifest.json');replaced=[]
 folder=ROOT/'assets/halloween/replacements';folder.mkdir(parents=True,exist_ok=True)
 with zipfile.ZipFile(sys.argv[1]) as archive:
  members={Path(name).name:name for name in archive.namelist() if name.lower().endswith(('.png','.jpg','.jpeg')) and not name.startswith('__MACOSX/')}
  assert set(members)==set(REPLACEMENTS.values()),(sorted(set(members)-set(REPLACEMENTS.values())),sorted(set(REPLACEMENTS.values())-set(members)))
  for product_name,filename in REPLACEMENTS.items():
   product=next(p for p in products if p['name']==product_name);old=product['image'];stable_ref=item_no('halloween',old)
   data=archive.read(members[filename]);digest=hashlib.sha256(data).hexdigest();im=ImageOps.exif_transpose(Image.open(BytesIO(data))).convert('RGB');im.thumbnail((1400,1400));dest=folder/(digest[:20]+'.webp');im.save(dest,'WEBP',quality=90,method=6);src=dest.relative_to(ROOT).as_posix();w,h=im.size
   entry={'width':w,'height':h,'sourceBytes':len(data),'src':src,'variants':[]}
   for width in sorted({min(w,480),min(w,960),w}):
    variant=dest if width==w else folder/(digest[:20]+f'-{width}.webp')
    if width!=w:
     small=im.copy();small.thumbnail((width,round(h*width/w)),Image.Resampling.LANCZOS);small.save(variant,'WEBP',quality=88,method=4)
    entry['variants'].append({'src':variant.relative_to(ROOT).as_posix(),'width':width,'bytes':variant.stat().st_size})
   media[src]=entry;identities.setdefault('halloween',{})[src]=stable_ref
   product['legacyImages']=list(dict.fromkeys(product.get('legacyImages',[])+[old]));product['image']=src;product['images']=[src,product['packagingImage']]
   if old in display:display[src]=display.pop(old)
   for page in layouts['halloween']:
    if old in page:page[page.index(old)]=src
   for scent in scents:
    for match in scent['matches']:
     if match['category']=='halloween' and match['image']==old:match['image']=src
   replaced.append({'name':product_name,'source':filename,'sha256':digest,'previousImage':old,'image':src,'width':w,'height':h,'preservedItemNo':stable_ref})
 manifest_products={p['name']:p for p in manifest['products']}
 for product in products:
  if product['name'] in REPLACEMENTS:manifest_products[product['name']].update(image=product['image'],images=product['images'],legacyImages=product['legacyImages'])
 manifest['replacementArchive']=Path(sys.argv[1]).name;manifest['replacementImages']=replaced
 for name,data in [('halloween-products.json',products),('fragrances.json',scents),('catalogue-layouts.json',layouts),('product-display.json',display),('image-manifest.json',media),('product-identities.json',identities),('halloween-source-manifest.json',manifest)]:write(name,data)
 product_records._identities=identities
 catalog=ROOT/'catalog.js';text=catalog.read_text();text=re.sub(r'const halloweenProducts = \[.*?\n\];',lambda m:'const halloweenProducts = '+json.dumps(products,ensure_ascii=False,indent=2)+';',text,count=1,flags=re.S);catalog.write_text(text)
 for script in ['build-arranged-catalogues.py','build-fragrance-library.py','build-fragrance-collections.py','build-product-pages.py','update-navigation.py']:runpy.run_path(str(ROOT/'scripts'/script),run_name='__main__')
 print('Replaced Halloween main images:',', '.join(REPLACEMENTS))

if __name__=='__main__':main()
