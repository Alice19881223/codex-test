"""Import five reviewed rabbit diffuser and packaging pairs into Little Daydreams."""
from pathlib import Path
from io import BytesIO
import hashlib,json,re,sys,zipfile
from PIL import Image,ImageOps
from product_records import item_no

ROOT=Path(__file__).resolve().parents[1]
DESIGNS=[
 ('Heart-Eyed Bunny Reed Diffuser','兔心香薰瓶-9.png','手绘兔心香薰与礼盒-10.png','rose-green-leaves','blush','A wide-eyed rabbit surrounded by little red hearts captures an affectionate, spontaneous drawing full of personality.'),
 ('Sunshine Bunny Reed Diffuser','黄兔图案玻璃扩香瓶-7.png','兰纳维黄兔香薰礼盒-8.png','lemon-verbena','gold','A bright yellow rabbit with playful bows and hearts feels sunny, curious and completely uninhibited.'),
 ('Bunny Best Friends Reed Diffuser','黄粉兔友扩香瓶-5.png','彩兔香薰礼盒焕新-6.png','pear-freesia','lavender','Two colourful rabbit friends bring together lively marks, bold colour and the easy joy of childhood friendship.'),
 ('Pink Garden Bunny Reed Diffuser','粉色兔子香薰瓶-1.png','粉兔香薰与手绘礼盒-3.png','peony-lychee','blush','A pink rabbit, rosy flowers and expressive brush marks turn the bottle into a small, cheerful garden story.'),
 ('Golden Bunny Reed Diffuser','金兔扩香瓶-2.png','金橙兔耳扩香礼盒-4.png','grapefruit-bergamot','gold','An orange-gold rabbit with long green ears and a tiny red flower brings a bright, humorous spark to the collection.'),
]

def read(name):return json.loads((ROOT/'assets'/name).read_text())
def write(name,data):(ROOT/'assets'/name).write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')

def main():
 products=read('reed-products.json');scents=read('fragrances.json');media=read('image-manifest.json');display=read('product-display.json');assignments=read('product-fragrances.json');added=[];sources=[]
 old={p['image'] for p in products if p.get('id','').startswith('little-daydreams-')}
 products=[p for p in products if p['image'] not in old]
 for scent in scents:scent['matches']=[m for m in scent['matches'] if not(m['category']=='reed' and m['image'] in old)]
 folder=ROOT/'assets/little-daydreams';folder.mkdir(exist_ok=True)
 with zipfile.ZipFile(sys.argv[1]) as archive:
  members={Path(n).name:n for n in archive.namelist() if n.lower().endswith(('.png','.jpg','.jpeg')) and not n.startswith('__MACOSX/')}
  def image(name):
   data=archive.read(members[name]);digest=hashlib.sha256(data).hexdigest();im=ImageOps.exif_transpose(Image.open(BytesIO(data))).convert('RGB');im.thumbnail((1400,1400));dest=folder/(digest[:20]+'.webp');im.save(dest,'WEBP',quality=90,method=6);src=dest.relative_to(ROOT).as_posix();w,h=im.size
   entry={'width':w,'height':h,'sourceBytes':dest.stat().st_size,'src':src,'variants':[]}
   for width in sorted({min(w,480),min(w,960),w}):
    variant=dest if width==w else folder/(digest[:20]+f'-{width}.webp')
    if width!=w:
     small=im.copy();small.thumbnail((width,round(h*width/w)),Image.Resampling.LANCZOS);small.save(variant,'WEBP',quality=88,method=4)
    entry['variants'].append({'src':variant.relative_to(ROOT).as_posix(),'width':width,'bytes':variant.stat().st_size})
   media[src]=entry;sources.append({'source':name,'sha256':digest,'image':src,'width':w,'height':h});return src
  for name,single,box,scent,palette,description in DESIGNS:
   src=image(single);pack=image(box);product={'id':'little-daydreams-'+Path(src).stem,'name':name,'series':'Little Daydreams','productType':'Reed diffuser','image':src,'packagingImage':pack,'images':[src,pack],'assignedScent':scent,'designDescription':description+' Suggested fragrance pairing; final formulation and availability are confirmed with your sample.'}
   products.append(product);added.append(product);display[src]={'palette':palette};assignments[item_no('reed',src)]={'scent':scent,'basis':"Suggested pairing for the colour and mood of the owner's daughter's drawing"};next(s for s in scents if s['id']==scent)['matches'].append({'category':'reed','image':src,'name':name,'series':'Little Daydreams'})
 collections=read('reed-collections.json');collections=[c for c in collections if c['slug']!='little-daydreams'];keys=[p['series']+' | '+p['name'] for p in added]
 collections.append({'slug':'little-daydreams','name':'Little Daydreams','description':'An innocent and joyful expression from my daughter.','icon':'little-daydreams','productKeys':keys,'pages':[keys],'relatedProducts':[{'category':'candle','series':'Jellyfish','name':'Jellyfish Egg Candle'},{'category':'candle','series':'Jellyfish','name':'Jellyfish Glass Candle'},{'category':'candle','series':'Birthday Wishes','name':'Birthday Surprise Egg'}]})
 candle_products=read('candle-products.json')
 for candle in candle_products:
  if candle['name'] in {'Jellyfish Egg Candle','Jellyfish Glass Candle'}:
   candle.pop('packagingImage',None);candle.pop('images',None);candle.pop('viewLabels',None)
 for name,data in [('reed-products.json',products),('candle-products.json',candle_products),('reed-collections.json',collections),('fragrances.json',scents),('image-manifest.json',media),('product-display.json',display),('product-fragrances.json',assignments),('little-daydreams-source-manifest.json',{'sourceArchives':[Path(sys.argv[1]).name],'theme':'Little Daydreams','introduction':'An innocent and joyful expression from my daughter.','products':added,'images':sources,'relatedProducts':collections[-1]['relatedProducts']})]:write(name,data)
 catalog=ROOT/'catalog.js';text=catalog.read_text();text=re.sub(r'const reedProducts = \[.*?\n\];',lambda m:'const reedProducts = '+json.dumps(products,ensure_ascii=False,indent=2)+';',text,count=1,flags=re.S);catalog.write_text(text)
 print('Imported five Little Daydreams reed diffusers with ten reviewed photographs.')

if __name__=='__main__':main()
