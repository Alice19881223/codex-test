"""Import the owner's visually reviewed animal-print candle photos.
Usage: python3 scripts/import-wild-elegance.py /path/to/豹纹系列.zip
Pillow is an optional authoring dependency; the normal build uses saved assets.
"""
from pathlib import Path
from io import BytesIO
import hashlib,json,sys,zipfile
from PIL import Image,ImageOps
from product_records import item_no
ROOT=Path(__file__).resolve().parents[1]
# Reviewed pairs: product first, matching gift-box photograph second.
DESIGNS=[
 ('Golden Leopard','exec-7175ac31-4a4d-4f6f-b753-29f98d8e3b31.png','exec-f9feeafa-371d-44ca-8a7f-e515bd92e62f.png','amber-vanilla','gold','Golden cream with warm brown leopard rosettes. Amber & Vanilla is suggested for its soft resinous warmth and golden, enveloping character.'),
 ('Ember Leopard','exec-775f473e-d31e-48f3-bd23-5295e15440d6.png','exec-c84c9bd2-67ab-4863-9db2-991cb1eb07f2.png','pomegranate-amber','burgundy','Vivid orange-red with dark leopard rosettes. Pomegranate & Amber is suggested for its juicy fruit, pink pepper and warm amber contrast.'),
 ('Blue Leopard','exec-4a801a00-b00a-4d33-843e-1f8e84c9ebf7.png','exec-7efab03a-c9c8-43c5-9e94-1190f765be88.png','sea-salt-driftwood','blue','Powder blue with deep blue leopard rosettes. Sea Salt & Driftwood is suggested for its cool sea-breeze, sage and softly weathered wood character.'),
 ('Blush Leopard','exec-68772946-a067-4e35-a817-60bc3e0f2782.png',None,'peony-lychee','blush','Blush pink with dark rose-toned leopard rosettes, photographed beside a coordinated gift box. Peony & Lychee is suggested for its playful fruit and soft floral character.'),
 ('Sandstone Spots','杏色斑点陶瓷香薰蜡烛-3.png','暖杏斑点香氛蜡烛礼盒-4.png','sandalwood-cashmere','sand','Warm apricot-ivory with small dark animal-inspired spots. Sandalwood & Cashmere is suggested for its tactile, softly spiced woods and warm musk.'),
 ('Ivory Zebra','黑白斑马纹陶瓷蜡烛-1.png','斑马纹瓷香薰蜡烛与精品礼盒-2.png','black-tea-cedarwood','ivory','Ivory with sweeping black zebra stripes. Black Tea & Cedarwood is suggested for its crisp bergamot, dark tea and dry cedarwood contrast.'),
]
def read(name):return json.loads((ROOT/'assets'/name).read_text())
def write(name,data):(ROOT/'assets'/name).write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
def main():
 products=read('candle-products.json');scents=read('fragrances.json');display=read('product-display.json');assignments=read('product-fragrances.json');media=read('image-manifest.json');sources=[];added=[]
 folder=ROOT/'assets/candles/wild-elegance';folder.mkdir(parents=True,exist_ok=True)
 with zipfile.ZipFile(sys.argv[1]) as archive:
  members={Path(n).name:n for n in archive.namelist() if not n.endswith('/')}
  def image(name):
   data=archive.read(members[name]);digest=hashlib.sha256(data).hexdigest();im=ImageOps.exif_transpose(Image.open(BytesIO(data))).convert('RGB');im.thumbnail((1400,1400))
   dest=folder/(digest[:20]+'.webp');im.save(dest,'WEBP',quality=90,method=6);src=dest.relative_to(ROOT).as_posix();w,h=im.size
   entry={'width':w,'height':h,'sourceBytes':dest.stat().st_size,'src':src,'variants':[]}
   for width in sorted({min(w,480),min(w,960),w}):
    variant=dest if width==w else folder/(digest[:20]+f'-{width}.webp')
    if width!=w:
     resized=im.copy();resized.thumbnail((width,round(h*width/w)),Image.Resampling.LANCZOS);resized.save(variant,'WEBP',quality=88,method=4)
    entry['variants'].append({'src':variant.relative_to(ROOT).as_posix(),'width':width,'bytes':variant.stat().st_size})
   media[src]=entry;sources.append({'source':name,'sha256':digest,'image':src,'width':w,'height':h});return src
  for name,single,box,scent,palette,description in DESIGNS:
   src=image(single);pack=image(box) if box else None
   p={'id':'wild-elegance-'+Path(src).stem,'name':name,'series':'Wild Elegance','productType':'Scented candle','image':src,'images':[src]+([pack] if pack else []),'assignedScent':scent,'designDescription':description+' Suggested fragrance pairing; final formulation and availability are confirmed with your sample.'}
   if pack:p['packagingImage']=pack
   else:p.update(view='packaging',viewLabels=['Product & gift packaging'])
   products=[old for old in products if old['image']!=src];products.append(p);added.append(p)
   display[src]={'palette':palette};assignments[item_no('candle',src)]={'scent':scent,'basis':'Suggested colour and animal-print design pairing; final formulation and availability subject to sample confirmation'}
   for profile in scents:
    profile['matches']=[m for m in profile['matches'] if not(m['category']=='candle' and m['image']==src)]
    if profile['id']==scent:profile['matches'].append({'category':'candle','image':src,'name':name,'series':'Wild Elegance'})
 collections=read('candle-collections.json');keys=[p['series']+' | '+p['name'] for p in added]
 for c in collections:
  c['pages']=[[k for k in page if k not in keys] for page in c['pages']];c['pages']=[page for page in c['pages'] if page]
  c['productKeys']=[k for k in c['productKeys'] if k not in keys]
  if c['slug']=='little-joys':
   c['description']='Expressive animal prints and playful candle designs to brighten the everyday. Discover Wild Elegance: leopard rosettes, spotted neutrals and zebra stripes with suggested colour-led fragrances.'
   c['pages']=[keys]+c['pages'];c['productKeys']=[k for page in c['pages'] for k in page];c['manualPageOrder']=True
 for name,value in [('candle-products.json',products),('fragrances.json',scents),('product-display.json',display),('product-fragrances.json',assignments),('image-manifest.json',media),('candle-collections.json',collections),('wild-elegance-source-manifest.json',{'sourceArchive':Path(sys.argv[1]).name,'series':'Wild Elegance','collection':'little-joys','products':added,'images':sources,'missingStandalone':['Blush Leopard']})]:write(name,value)
 print('Imported 6 Wild Elegance designs, 5 paired views and 1 supplied product-with-box view.')
if __name__=='__main__':main()
