"""Import eight reviewed product/packaging pairs from the owner's 网站上图.zip."""
from pathlib import Path
import json,sys,zipfile,hashlib,re
from io import BytesIO
from PIL import Image,ImageOps
from product_records import item_no
ROOT=Path(__file__).resolve().parents[1]
# Reviewed image numbers refer to the archive's alphabetically ordered PNG members.
DESIGNS=[
 ('Evergreen Pudding Candle',9,1,'christmas',None,'Festive Ceramic Moments','fir-cedarwood','sage','A low fluted green vessel with an ivory-toned rim and a red accent evokes a festive pudding mould and an evergreen Christmas table.'),
 ('Winter Ballet Candle',10,3,'christmas',None,'Festive Ballet','vanilla-tonka','blue','A powder-blue ground with ballerinas, nutcracker figures, ribbons and winter foliage creates a gentle Christmas ballet scene.'),
 ('Citrus Christmas Joy Candle',16,6,'christmas',None,'Festive Ceramic Moments','orange-clove','ivory','Sunny yellow citrus motifs, tiny stars and a pale blue rim bring a bright, playful interpretation of Christmas joy.'),
 ('Midnight Ballet Candle',5,4,'candle','little-joys','Midnight Ballet','pomegranate-amber','charcoal','Dancing skeleton ballerinas, pink ribbons, roses and crescent moons on a black ground create a playful theatrical scene with a Halloween mood.'),
 ('Coastal Glow Candle',7,8,'candle','everyday-poetry','Everyday Poetry','sea-salt-driftwood','blue','Three blue fish, golden framing and olive sprigs recall Mediterranean markets and the small pleasures of coastal living.'),
 ('Blue Dove Candle',11,12,'candle','a-moment-of-quiet','Dove Reverie','white-tea-bergamot','blue','A white dove framed by flowing blue ribbons on a powder-blue ground suggests a peaceful pause and a soft, airy atmosphere.'),
 ('Blue Dove Reed Diffuser',2,15,'reed','a-quiet-pause','Dove Reverie','white-tea-bergamot','blue','A pale blue bottle with a white dove, delicate flowers and a ribbon-like frame, shown with natural-coloured reeds, evokes a calm and welcoming space.'),
 ('Lilac Current Reed Diffuser',14,13,'reed','in-bloom','Colour in Bloom','lavender-cedarwood','lavender','A lilac square bottle with flowing blue waves, warm coral shapes and a red spherical stopper brings an artistic splash of colour to everyday rituals.'),
]
def read(n):return json.loads((ROOT/'assets'/n).read_text())
def write(n,d):(ROOT/'assets'/n).write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n')
def main():
 cats={c:read(c+'-products.json') for c in ['candle','reed','christmas']};scents=read('fragrances.json');media=read('image-manifest.json');display=read('product-display.json');assignments=read('product-fragrances.json');added=[];sources=[]
 old={(c,p['image']) for c,ps in cats.items() for p in ps if p.get('id','').startswith('poetic-moments-')}
 for c in cats:cats[c]=[p for p in cats[c] if (c,p['image']) not in old]
 for s in scents:s['matches']=[m for m in s['matches'] if (m['category'],m['image']) not in old]
 folder=ROOT/'assets/poetic-moments';folder.mkdir(exist_ok=True)
 with zipfile.ZipFile(sys.argv[1]) as z:
  members=sorted(n for n in z.namelist() if n.lower().endswith('.png') and not n.startswith('__MACOSX/'));assert len(members)==16
  def image(number):
   member=members[number-1];data=z.read(member);digest=hashlib.sha256(data).hexdigest();im=ImageOps.exif_transpose(Image.open(BytesIO(data))).convert('RGB');im.thumbnail((1400,1400));dest=folder/(digest[:20]+'.webp');im.save(dest,'WEBP',quality=90,method=6);src=dest.relative_to(ROOT).as_posix();w,h=im.size;entry={'width':w,'height':h,'sourceBytes':dest.stat().st_size,'src':src,'variants':[]}
   for width in sorted({min(w,480),min(w,960),w}):
    v=dest if width==w else folder/(digest[:20]+f'-{width}.webp')
    if width!=w:
     small=im.copy();small.thumbnail((width,round(h*width/w)),Image.Resampling.LANCZOS);small.save(v,'WEBP',quality=88,method=4)
    entry['variants'].append({'src':v.relative_to(ROOT).as_posix(),'width':width,'bytes':v.stat().st_size})
   media[src]=entry;sources.append({'source':Path(member).name,'sha256':digest,'image':src,'width':w,'height':h});return src
  for name,single,box,cat,collection,series,scent,palette,description in DESIGNS:
   src=image(single);pack=image(box);p={'id':'poetic-moments-'+Path(src).stem,'name':name,'series':series,'productType':'Reed diffuser' if cat=='reed' else 'Scented candle','image':src,'packagingImage':pack,'images':[src,pack],'assignedScent':scent,'designDescription':description+' Suggested fragrance pairing; final formulation and availability are confirmed with your sample.'}
   cats[cat].append(p);added.append(dict(p,category=cat,collection=collection));display[src]={'palette':palette};assignments[item_no(cat,src)]={'scent':scent,'basis':'Suggested pairing based on the reviewed design, colour and seasonal atmosphere'};next(s for s in scents if s['id']==scent)['matches'].append({'category':cat,'image':src,'name':name,'series':series})
 for cat in ['candle','reed']:
  collections=read(cat+'-collections.json')
  for c in collections:
   new=[p for p in added if p['category']==cat and p['collection']==c['slug']];keys=[p['series']+' | '+p['name'] for p in new];flat=[k for k in c['productKeys'] if k not in keys]
   # Preserve reviewed seasonal fronts; append to the existing matching series where possible.
   for p,key in zip(new,keys):
    same=[i for i,k in enumerate(flat) if k.startswith(p['series']+' | ')];position=same[-1]+1 if same else len(flat);flat.insert(position,key)
   c['productKeys']=flat;c['pages']=[flat[i:i+12] for i in range(0,len(flat),12)]
  write(cat+'-collections.json',collections)
 order=read('catalogue-order.json');names=[p['name'] for p in added if p['category']=='christmas'];flat=[n for page in order['christmas'] for n in page if n not in names]
 # Keep the first page and prior page-two storybook edit; add before the remaining cups and ornaments.
 flat[27:27]=names;order['christmas']=[flat[i:i+12] for i in range(0,len(flat),12)]
 layouts=read('catalogue-layouts.json');lookup={p['name']:p for p in cats['christmas']};layouts['christmas']=[[lookup[n]['image'] for n in page] for page in order['christmas']]
 for cat,ps in cats.items():write(cat+'-products.json',ps)
 for n,d in [('fragrances.json',scents),('product-display.json',display),('product-fragrances.json',assignments),('image-manifest.json',media),('catalogue-order.json',order),('catalogue-layouts.json',layouts),('poetic-moments-source-manifest.json',{'sourceArchives':[Path(sys.argv[1]).name],'products':added,'images':sources})]:write(n,d)
 p=ROOT/'catalog.js';p.write_text(re.sub(r'const christmasProducts = \[.*?\n\];',lambda m:'const christmasProducts = '+json.dumps(cats['christmas'],ensure_ascii=False,indent=2)+';',p.read_text(),flags=re.S))
 print('Imported eight designs with sixteen reviewed photographs.')
if __name__=='__main__':main()
