"""Import visually reviewed Everyday Poetry photos from the four lifestyle archives.
Usage: python3 scripts/import-everyday-poetry.py /path/to/生活主题系列.zip /path/to/打包1.zip /path/to/打包2.zip /path/to/Downloads.zip
Only known image members are read. Missing views are documented, never invented.
"""
from pathlib import Path
from io import BytesIO
import hashlib,json,sys,zipfile
from contextlib import ExitStack
from PIL import Image,ImageOps
from product_records import item_no
ROOT=Path(__file__).resolve().parents[1]
DESIGNS=[
 ('Sweet Pear', '甜梨复古条纹香薰蜡烛-2.png', '甜梨复古蜡烛礼盒-3.png', 'pear-freesia', 'gold', 'Orange-and-cream stripes frame illustrated golden pears: a small orchard story for an everyday table.'),
 ('Morning Ritual', '薰衣草条纹早餐仪式蜡烛-1 (1).png', '薰衣草条纹晨间仪式蜡烛礼盒-4 (1).png', 'vanilla-tonka', 'lavender', 'Lavender-coloured stripes, a breakfast cup, pastry and newspaper turn a slow morning into a little ritual.'),
 ('Ciao Bella', 'Ciao地中海复古艺术蜡烛-6.png', 'Lanarve Ciao Bella 地中海蜡烛礼盒-7.png', 'bergamot-neroli', 'burgundy', 'Strawberries, lemons and a blue ornamental border surround a warm Italian greeting on a vivid red field.'),
 ('Dolce Vita Golden Pasta', 'Dolce Vita意式彩绘蜡烛-9.png', '金色意面蜡烛与配套礼盒-1.png', 'lime-basil', 'ivory', 'An illustrated plate of pasta, tomatoes and basil celebrates the poetry of a shared Italian table. This is a decorative design; the suggested scent is a citrus-and-herb direction.'),
 ('Dolce Vita Blue Pasta', '蓝色意面主题香薰蜡烛-2.png', 'DOLCE VITA 意式意面蜡烛礼盒-10 (1).png', 'white-tea-rosemary', 'blush', 'Blue pasta, cherry tomatoes and green leaves on a pink field with a cobalt border celebrate an unhurried Italian table.'),
 ('Coastal Days', '海岸沙丁鱼条纹蜡烛-5.png', '海岸日·沙丁鱼香薰蜡烛礼盒-8 (1).png', 'grapefruit-bergamot', 'gold', 'Orange-and-cream stripes frame three blue fish, bringing the feel of an easy coastal lunch to a favourite table.'),
 ('Sea Breeze', '海风沙丁鱼香薰蜡烛-2.png', '海风香薰蜡烛与薄荷礼盒-6.png', 'sea-salt-driftwood', 'sage', 'A mint-coloured vessel with a blue sardine-tin illustration, inspired by unhurried coastal afternoons.'),
 ('Salt & Sunshine', '地中海蓝釉沙丁鱼蜡烛-3.png', '海盐阳光香氛蜡烛礼盒-7.png', 'bergamot-neroli', 'blue', 'Pale blue, a coral-red sardine tin and three illustrated fish capture a cheerful seaside pantry.'),
 ('Coastal Muse', '珊瑚蓝框沙丁鱼香薰蜡烛-1.png', '海岸香薰礼盒-5.png', 'white-tea-bergamot', 'burgundy', 'A coral-red vessel with a blue-framed fish illustration recalls a handwritten note from a quiet harbour.'),
 ('Lagoon & Lemon', '泻湖柠檬复古沙丁鱼香氛蜡烛-2.png', 'Lanarve鱼纹香薰蜡烛礼盒-4.png', 'lemon-verbena', 'sage', 'Turquoise water colours, bright lemons, little flowers and sardines evoke an easy summer lunch beside the sea.'),
 ('Blue Harbour', '晴港蓝鱼香氛蜡烛-5.png', 'Lanarve鱼韵香薰蜡烛礼盒-6.png', 'sea-salt-driftwood', 'gold', 'Sunny yellow, blue fish and a small anchor celebrate a bright harbour and a table open to the sea breeze.'),
 ('Harbour Parade', '海岸条纹蓝鱼蜡烛-11.png', 'Lanarve复古鱼纹蜡烛礼盒-12.png', 'lemon-verbena', 'gold', 'Rows of blue fish, little stars and warm yellow borders capture the bustle and sunshine of a harbour morning.'),
 ('Riviera Three Fish', '里维埃拉三鱼香氛蜡烛-16.png', 'Lanarve鱼纹香薰蜡烛礼盒-17.png', 'fig-green-leaves', 'sage', 'Three illustrated fish, green checks and a coral-red rim bring the relaxed colour of a Riviera market to everyday spaces.'),
 ('Coral Reverie', '珊瑚双鱼复古香薰蜡烛-8.png', '兰纳维鱼纹香氛蜡烛礼盒-10.png', 'grapefruit-bergamot', 'burgundy', 'Coral pink, golden fish and dark blue leaves form a lively coastal postcard with coordinated gift packaging.'),
 ('Crimson Currents', '珊瑚红复古双鱼香薰蜡烛-13.png', 'Lanarve鱼纹香薰蜡烛礼盒-14.png', 'pomegranate-amber', 'burgundy', 'Silver-blue fish move through a deep red field with small stars and flowing botanical details.'),
 ('Sunset Shoal', '落日鱼群复古香氛蜡烛-1.png', 'Lanarve复古鱼纹香氛蜡烛礼盒-3.png', 'amber-vanilla', 'blue', 'A radiant sunset, a dark blue ground and a colourful shoal suggest the last warm light over a harbour.'),
 ('Midnight Catch', '午夜捕捞复古鱼纹香薰蜡烛-7.png', 'Lanarve鱼纹香薰蜡烛礼盒-9.png', 'black-tea-cedarwood', 'blue', 'Warm orange fish, a midnight-blue background and little stars tell the story of a quiet harbour after dusk.'),
 ('Mediterranean Days', '地中海沙丁鱼图案蓝釉香氛蜡烛-4.png', '蔚蓝地中海香氛蜡烛礼盒-8.png', 'lime-basil', 'blue', 'Navy blue, fine red borders and stacked colourful sardines recall a Mediterranean pantry.'),
 ('Crab & Tide', '海风红蟹复古蜡烛-11.png', 'Lanarve海风螃蟹蜡烛礼盒-12.png', 'sea-salt-driftwood', 'blue', 'A bright red crab, blue-and-ivory stripes and small seashells turn a seaside memory into a cheerful everyday ritual.'),
 ('Peach Anchovies', '粉彩凤尾鱼香氛蜡烛-18.png', 'Lanarve鱼纹香薰蜡烛礼盒-19.png', 'pomegranate-amber', 'blush', 'Peach pink, fine blue leaves, citrus slices and three illustrated fish evoke a sunlit postcard from the coast.'),
]
BOX_ONLY=set()
def read(n):return json.loads((ROOT/'assets'/n).read_text())
def write(n,d):(ROOT/'assets'/n).write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n')
def main():
 products=read('candle-products.json');scents=read('fragrances.json');display=read('product-display.json');assignments=read('product-fragrances.json');media=read('image-manifest.json');added=[];sources=[]
 previous={p['name']:p for p in products if p['series']=='Everyday Poetry'}
 identities=read('product-identities.json')
 old_refs={name:item_no('candle',p['image']) for name,p in previous.items()}
 old_images={p['image'] for p in previous.values()}
 products=[p for p in products if p['series']!='Everyday Poetry']
 for profile in scents:profile['matches']=[m for m in profile['matches'] if not(m['category']=='candle' and m['image'] in old_images)]
 folder=ROOT/'assets/candles/everyday-poetry';folder.mkdir(parents=True,exist_ok=True)
 with ExitStack() as stack:
  archives=[stack.enter_context(zipfile.ZipFile(arg)) for arg in sys.argv[1:]]
  members={Path(n).name:(z,n) for z in archives for n in z.namelist() if not n.endswith('/') and not n.startswith('__MACOSX/')}
  def image(name):
   archive,member=members[name];data=archive.read(member);digest=hashlib.sha256(data).hexdigest();im=ImageOps.exif_transpose(Image.open(BytesIO(data))).convert('RGB');im.thumbnail((1400,1400));dest=folder/(digest[:20]+'.webp');im.save(dest,'WEBP',quality=90,method=6);src=dest.relative_to(ROOT).as_posix();w,h=im.size
   entry={'width':w,'height':h,'sourceBytes':dest.stat().st_size,'src':src,'variants':[]}
   for width in sorted({min(w,480),min(w,960),w}):
    v=dest if width==w else folder/(digest[:20]+f'-{width}.webp')
    if width!=w:
     small=im.copy();small.thumbnail((width,round(h*width/w)),Image.Resampling.LANCZOS);small.save(v,'WEBP',quality=88,method=4)
    entry['variants'].append({'src':v.relative_to(ROOT).as_posix(),'width':width,'bytes':v.stat().st_size})
   media[src]=entry;sources.append({'source':name,'sha256':digest,'image':src,'width':w,'height':h});return src
  for name,single,box,scent,palette,description in DESIGNS:
   src=image(single);pack=image(box) if box else None
   p={'id':'everyday-poetry-'+Path(src).stem,'name':name,'series':'Everyday Poetry','productType':'Scented candle','image':src,'images':[src]+([pack] if pack else []),'assignedScent':scent,'designDescription':description+' Suggested fragrance pairing; final formulation and availability are confirmed with your sample.'}
   if pack:p['packagingImage']=pack
   if name in BOX_ONLY:p.update(view='packaging',viewLabels=['Product & gift packaging'])
   ref=old_refs.get(name,item_no('candle',src));identities.setdefault('candle',{})[src]=ref
   products=[old for old in products if old['image']!=src];products.append(p);added.append(p);display[src]={'palette':palette};assignments[ref]={'scent':scent,'basis':'Suggested everyday scene and colour pairing; final formulation and availability subject to sample confirmation'}
   for profile in scents:
    profile['matches']=[m for m in profile['matches'] if not(m['category']=='candle' and m['image']==src)]
    if profile['id']==scent:profile['matches'].append({'category':'candle','image':src,'name':name,'series':'Everyday Poetry'})
 collections=read('candle-collections.json');keys=[p['series']+' | '+p['name'] for p in added]
 collections=[c for c in collections if c['slug']!='everyday-poetry']
 collections.append({'slug':'everyday-poetry','name':'Everyday Poetry','description':'Illustrated candles for the poetry of everyday life.','productKeys':keys,'icon':'everyday','pages':[keys[i:i+12] for i in range(0,len(keys),12)],'manualPageOrder':True})
 for n,d in [('candle-products.json',products),('product-identities.json',identities),('fragrances.json',scents),('product-display.json',display),('product-fragrances.json',assignments),('image-manifest.json',media),('candle-collections.json',collections),('everyday-poetry-source-manifest.json',{'sourceArchives':[Path(arg).name for arg in sys.argv[1:]],'collection':'everyday-poetry','products':added,'images':sources,'boxOnly':sorted(BOX_ONLY),'missingStandalone':[],'missingPackaging':[],'pairingNotes':'All 20 designs have matching product and gift-box photographs. Golden pasta and blue pasta are distinct designs.'})]:write(n,d)
 print('Imported 20 Everyday Poetry designs from 40 supplied photographs; all 20 designs have visually reviewed product and packaging pairs.')
if __name__=='__main__':main()
