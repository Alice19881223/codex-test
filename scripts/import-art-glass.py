"""Import three reviewed art-glass diffuser and packaging pairs from 网站上图1.zip."""
from pathlib import Path
from io import BytesIO
from contextlib import ExitStack
import hashlib,json,sys,zipfile
from PIL import Image,ImageOps
from product_records import item_no
ROOT=Path(__file__).resolve().parents[1]
DESIGNS=[('Sunlit Mosaic Reed Diffuser', '阳光黄白艺术玻璃扩香瓶-1.png', '黄色艺术玻璃香薰与礼盒-2.png', 'reed', 'a-breath-of-fresh-air', 'Art Glass Reverie', 'grapefruit-bergamot', 'gold', 'Yellow and ivory-toned flowing marks on a rounded bottle recall sunlight dancing through glass. Grapefruit & Bergamot offers a bright citrus fragrance direction.'), ('Coral Petal Reed Diffuser', '珊瑚粉斑驳玻璃香薰-3.png', '珊瑚粉香薰与配套礼盒-4.png', 'reed', 'in-bloom', 'Art Glass Reverie', 'peony-lychee', 'blush', 'Soft coral-pink and ivory-toned organic markings resemble scattered petals. Peony & Lychee suggests an airy floral fragrance with a gently fruity opening.'), ('Forest Veil Reed Diffuser', '深林绿条纹香薰瓶-5.png', '森林绿玻璃扩香与象牙礼盒-6.png', 'reed', 'a-quiet-pause', 'Art Glass Reverie', 'green-tea-cedarwood', 'sage', 'Deep green vertical forms and pale translucent accents evoke light filtering through a quiet forest. Green Tea & Cedarwood provides a fresh tea-and-wood fragrance direction.')]

def read(n):return json.loads((ROOT/'assets'/n).read_text())
def write(n,d):(ROOT/'assets'/n).write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n')
def main():
 catalogues={cat:read(cat+'-products.json') for cat in ['candle','reed']};scents=read('fragrances.json');display=read('product-display.json');assignments=read('product-fragrances.json');media=read('image-manifest.json');added=[];sources=[]
 old={(cat,p['image']) for cat,rows in catalogues.items() for p in rows if p.get('id','').startswith('art-glass-import-')}
 for cat in catalogues:catalogues[cat]=[p for p in catalogues[cat] if (cat,p['image']) not in old]
 for profile in scents:profile['matches']=[m for m in profile['matches'] if (m['category'],m['image']) not in old]
 folder=ROOT/'assets/art-glass-reverie';folder.mkdir(parents=True,exist_ok=True)
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
   src=image(single);pack=image(box);p={'id':'art-glass-import-'+Path(src).stem,'name':name,'series':series,'productType':'Scented candle' if category=='candle' else 'Reed diffuser','image':src,'packagingImage':pack,'images':[src,pack],'assignedScent':scent,'designDescription':description+' Suggested fragrance pairing; final formulation and availability are confirmed with your sample.'}
   if series=='Spring & Summer Light':p.update(season='Spring & Summer',seasonalCollection=collection)
   if series=='Blue & White Landscapes':assert 'Oriental Mystery' in next(s for s in scents if s['id']==scent)['themes']
   catalogues[category].append(p);added.append(dict(p,category=category,collection=collection));display[src]={'palette':palette};assignments[item_no(category,src)]={'scent':scent,'basis':'Oriental Mystery pairing for the blue-and-white landscape design' if series=='Blue & White Landscapes' else 'Suggested pairing based on the reviewed art-glass colour and atmosphere'}
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
 for n,d in [('fragrances.json',scents),('product-display.json',display),('product-fragrances.json',assignments),('image-manifest.json',media),('art-glass-source-manifest.json',{'sourceArchives':[Path(arg).name for arg in sys.argv[1:]],'products':added,'images':sources,'fragranceRequirement':'Existing blue-and-white products retain Oriental Mystery profiles.'})]:write(n,d)
 print('Imported three art-glass reed diffusers with six reviewed photographs.')
if __name__=='__main__':main()
