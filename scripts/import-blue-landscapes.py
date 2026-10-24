"""Import reviewed butterfly and blue-and-white landscape product/packaging pairs.
Usage: python3 scripts/import-blue-landscapes.py /path/to/春夏系列3.zip /path/to/青花瓷系列.zip
Existing catalogue membership and flat product order are preserved.
"""
from pathlib import Path
from io import BytesIO
from contextlib import ExitStack
import hashlib,json,sys,zipfile
from PIL import Image,ImageOps
from product_records import item_no
ROOT=Path(__file__).resolve().parents[1]
DESIGNS=[
 ('Meadow Butterfly','黄绿色棋盘蝴蝶蜡烛-2.png','黄绿棋盘格蝴蝶蜡烛礼盒-1.png','candle','morning-light','Spring & Summer Light','lime-basil','sage','A smiling butterfly in yellow-green checks on an ivory-toned background captures the lightness of a spring meadow and early summer. Lime & Basil is a suggested crisp citrus-and-herb fragrance direction.'),
 ('Blue & White Landscape Candle','蓝白山水香氛蜡烛.png','微信图片_20261024142344_307_2.png','candle','a-moment-of-quiet','Blue & White Landscapes','incense-myrrh','blue','Cobalt-blue mountains, pavilions, trees and water on an ivory-toned vessel recall classical blue-and-white landscape decoration. Incense & Myrrh from the Oriental Mystery fragrance family offers a quiet, resinous direction for this contemplative scene.'),
 ('Blue & White Landscape Reed Diffuser','青花山水香薰扩香瓶-1.png','兰维香薰与山水礼盒-2.png','reed','a-quiet-pause','Blue & White Landscapes','oud-saffron','blue','A blue-and-white landscape bottle with mountains, pavilions and water, shown with natural-coloured reeds. Oud & Saffron from the Oriental Mystery fragrance family adds warm woods, saffron and a softly spiced sense of depth.'),
]
def read(n):return json.loads((ROOT/'assets'/n).read_text())
def write(n,d):(ROOT/'assets'/n).write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n')
def main():
 catalogues={cat:read(cat+'-products.json') for cat in ['candle','reed']};scents=read('fragrances.json');display=read('product-display.json');assignments=read('product-fragrances.json');media=read('image-manifest.json');added=[];sources=[]
 old={(cat,p['image']) for cat,rows in catalogues.items() for p in rows if p.get('id','').startswith('blue-landscape-import-')}
 for cat in catalogues:catalogues[cat]=[p for p in catalogues[cat] if (cat,p['image']) not in old]
 for profile in scents:profile['matches']=[m for m in profile['matches'] if (m['category'],m['image']) not in old]
 folder=ROOT/'assets/blue-landscapes';folder.mkdir(parents=True,exist_ok=True)
 with ExitStack() as stack:
  archives=[stack.enter_context(zipfile.ZipFile(arg)) for arg in sys.argv[1:]]
  members={Path(n).name:(z,n) for z in archives for n in z.namelist() if not n.endswith('/') and not n.startswith('__MACOSX/')}
  def image(name):
   z,member=members[name];data=z.read(member);digest=hashlib.sha256(data).hexdigest();im=ImageOps.exif_transpose(Image.open(BytesIO(data))).convert('RGB');im.thumbnail((1400,1400));dest=folder/(digest[:20]+'.webp');im.save(dest,'WEBP',quality=90,method=6);src=dest.relative_to(ROOT).as_posix();w,h=im.size
   entry={'width':w,'height':h,'sourceBytes':dest.stat().st_size,'src':src,'variants':[]}
   for width in sorted({min(w,480),min(w,960),w}):
    v=dest if width==w else folder/(digest[:20]+f'-{width}.webp')
    if width!=w:
     small=im.copy();small.thumbnail((width,round(h*width/w)),Image.Resampling.LANCZOS);small.save(v,'WEBP',quality=88,method=4)
    entry['variants'].append({'src':v.relative_to(ROOT).as_posix(),'width':width,'bytes':v.stat().st_size})
   media[src]=entry;sources.append({'source':name,'sha256':digest,'image':src,'width':w,'height':h});return src
  for name,single,box,category,collection,series,scent,palette,description in DESIGNS:
   src=image(single);pack=image(box);p={'id':'blue-landscape-import-'+Path(src).stem,'name':name,'series':series,'productType':'Scented candle' if category=='candle' else 'Reed diffuser','image':src,'packagingImage':pack,'images':[src,pack],'assignedScent':scent,'designDescription':description+' Suggested fragrance pairing; final formulation and availability are confirmed with your sample.'}
   if series=='Spring & Summer Light':p.update(season='Spring & Summer',seasonalCollection=collection)
   if series=='Blue & White Landscapes':assert 'Oriental Mystery' in next(s for s in scents if s['id']==scent)['themes']
   catalogues[category].append(p);added.append(dict(p,category=category,collection=collection));display[src]={'palette':palette};assignments[item_no(category,src)]={'scent':scent,'basis':'Oriental Mystery pairing for the blue-and-white landscape design' if series=='Blue & White Landscapes' else 'Suggested spring/summer citrus-and-herb pairing'}
   next(s for s in scents if s['id']==scent)['matches'].append({'category':category,'image':src,'name':name,'series':series})
 for category,rows in catalogues.items():
  collections=read(category+'-collections.json')
  for c in collections:
   additions=[p for p in added if p['category']==category and p['collection']==c['slug']]
   keys=[p['series']+' | '+p['name'] for p in additions];flat=[key for key in c['productKeys'] if key not in keys]
   for p in additions:
    key=p['series']+' | '+p['name'];same=[i for i,k in enumerate(flat) if k.startswith(p['series']+' | ')]
    if same:position=same[-1]+1
    elif category=='candle':position=sum(k.startswith('Spring & Summer Stillness | ') for k in flat)
    else:position=0
    flat.insert(position,key)
   c['productKeys']=flat;c['pages']=[flat[i:i+12] for i in range(0,len(flat),12)]
  write(category+'-collections.json',collections);write(category+'-products.json',rows)
 for n,d in [('fragrances.json',scents),('product-display.json',display),('product-fragrances.json',assignments),('image-manifest.json',media),('blue-landscapes-source-manifest.json',{'sourceArchives':[Path(arg).name for arg in sys.argv[1:]],'products':added,'images':sources,'fragranceRequirement':'Both blue-and-white landscape products use Oriental Mystery profiles.'})]:write(n,d)
 print('Imported butterfly candle, blue-and-white candle and reed diffuser with six reviewed photographs.')
if __name__=='__main__':main()
