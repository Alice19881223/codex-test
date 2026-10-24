"""Import reviewed spring/summer candle and gift-box pairs from both owner archives.
Usage: python3 scripts/import-spring-summer.py /path/to/春夏系列1.zip /path/to/春夏系列2.zip
Pillow is used only for image authoring. Normal builds use the checked-in assets.
"""
from pathlib import Path
from io import BytesIO
from contextlib import ExitStack
import hashlib,json,sys,zipfile
from PIL import Image,ImageOps
from product_records import item_no
ROOT=Path(__file__).resolve().parents[1]
DESIGNS=[
 ('Spring Muse', '淡紫格纹春花瓷杯蜡烛-1.png', '紫罗兰格纹春日香薰礼盒-2.png', 'morning-light', 'peony-lychee', 'lavender', 'Lilac checks and small meadow flowers suggest the first flowers of spring. Peony & Lychee brings a bright, airy floral direction to the pastel palette.'),
 ('Sunlit Linen', '阳光亚麻条纹香薰蜡烛-2.png', '阳光亚麻蜡烛礼盒-7.png', 'morning-light', 'soft-linen', 'gold', 'Butter-yellow and sky-blue stripes with a small bow recall freshly aired linen and open windows on a warm summer morning.'),
 ('Palm Coast', '棕榈海岸珐琅香氛蜡烛-1.png', 'Lanarve棕榈海岸香氛蜡烛礼盒-3.png', 'morning-light', 'sea-salt-driftwood', 'blue', 'A blue-framed palm tree and soft aqua waves evoke long, light summer days by the coast, paired with a sea-air and driftwood fragrance direction.'),
 ('Blue Garden', '蓝花园地中海风格香氛蜡烛-2.png', '蓝园香薰蜡烛与典雅礼盒-4.png', 'morning-light', 'bergamot-neroli', 'blue', 'Cobalt garden scrollwork and fine ornamental borders recall a shaded Mediterranean courtyard in summer, paired with bright bergamot and neroli.'),
 ('Tangerine Stripes', 'Lanarve 象牙橙纹珠饰蜡烛.png', 'Lanarve香薰蜡烛与高级礼盒.png', 'morning-light', 'grapefruit-bergamot', 'amber', 'Ivory and tangerine stripes with a rounded bead-like handle suggest fresh citrus and sunlit spring-to-summer mornings.'),
 ('Coastal Stripes', '深墨绿条纹兰纳维香氛蜡烛.png', 'Lanarve香薰蜡烛与礼盒.png', 'morning-light', 'lime-basil', 'blue', 'Deep teal and ivory stripes with a warm orange bead-like handle bring a fresh coastal mood to a summer table; lime and basil add a crisp green direction.'),
 ('Sunlit Solstice', '陶土橙太阳脸艺术蜡烛-1.png', 'Lanarve香薰蜡烛与礼盒-3.png', 'morning-light', 'lemon-verbena', 'amber', 'A golden sun face and little stars on terracotta orange celebrate the long light of summer, paired with bright lemon and leafy verbena.'),
 ('Violet Grove', '兰纳维紫罗兰林境条纹香薰蜡烛-1.png', 'Lanarve紫罗兰香氛蜡烛礼盒-6.png', 'a-moment-of-quiet', 'lavender-cedarwood', 'lavender', 'Lilac and green stripes, a scalloped rim and a small bow suggest a quiet spring garden, paired with lavender and soft cedarwood.'),
 ('Peace on Earth', '鼠尾草绿和平鸽蜡烛-1.png', '和平之地鼠尾草绿香薰礼盒-2.png', 'a-moment-of-quiet', 'green-tea-cedarwood', 'sage', 'A soft sage-green vessel with a white dove and olive branch invites a calm spring pause, paired with fresh green tea and gentle cedarwood.'),
 ('Ivory Blessing', '手绘橄榄枝祝福香氛蜡烛-3.png', '象牙白 Blessed 香薰蜡烛礼盒-4.png', 'a-moment-of-quiet', 'white-tea-bergamot', 'ivory', 'Ivory with an olive-branch blessing motif suggests a light, restful spring interior. White Tea & Bergamot offers a fresh, understated fragrance direction.'),
 ('Mist Blue Blessing', '雾蓝磨砂玻璃蜡烛-3.png', '雾蓝色 Blessed 香薰蜡烛礼盒-4.png', 'a-moment-of-quiet', 'sea-salt-driftwood', 'blue', 'Mist blue and a dark olive-branch blessing motif recall the quiet of an early summer shoreline, paired with sea salt and soft driftwood.'),
 ('Ivory Olive Dove', '鸽语橄榄象牙香薰蜡烛-2.png', '象牙白烛与雅致礼盒-4.png', 'a-moment-of-quiet', 'soft-linen', 'ivory', 'An ivory-toned translucent vessel with a fine dove and olive branch recalls clean linen and gentle light through an open spring window.'),
 ('Sage Olive Dove', '鼠尾草橄榄鸽玻璃香薰蜡烛-1.png', '鼠尾草绿蜡烛与礼盒-3.png', 'a-moment-of-quiet', 'white-tea-rosemary', 'sage', 'Muted sage green with a fine dove and olive branch suggests a shaded summer herb garden, paired with white tea and fresh rosemary.'),
 ('Garden Companions', 'Lanarve红蓝飞鸟手工水泥蜡烛-1 (2).png', '兰纳维双鸟水泥蜡烛礼盒-2 (2).png', 'close-to-you', 'jasmine-orange-blossom', 'sand', 'Two birds in warm red and deep blue among small branches evoke a shared spring garden, paired with jasmine and orange blossom.'),
 ('Blush Heart', '蓝眼爱心粉彩香氛蜡烛-1.png', '粉色心眼香薰蜡烛礼盒-2.png', 'close-to-you', 'rose-green-leaves', 'blush', 'A layered heart-and-eye motif, pastel pink and warm checks suggest an affectionate spring gift, paired with fresh rose and green leaves.'),
 ('Palm Heart', '象牙色棕榈心眼玻璃蜡烛-2.png', 'Lanarve奢华蜡烛与配套礼盒-4.png', 'close-to-you', 'fig-green-leaves', 'ivory', 'A warm ivory vessel with a palm tree, small hearts and a sun motif captures a summer escape together, paired with fig and green leaves.'),
]
SERIES={'morning-light':'Spring & Summer Light','a-moment-of-quiet':'Spring & Summer Stillness','close-to-you':'Spring & Summer Together'}
FEATURES={
 'morning-light':{'title':'Spring light, summer breeze','description':'Meadow flowers, fresh linen, citrus stripes and coastal palms. A bright spring and summer edit with suggested floral, citrus and sea-air fragrances.'},
 'a-moment-of-quiet':{'title':'A softer season','description':'Olive branches, doves and gentle garden colours. Quiet spring mornings and shaded summer afternoons, paired with suggested tea, lavender and soft-wood fragrances.'},
 'close-to-you':{'title':'Shared gardens, sunlit days','description':'Two birds, affectionate hearts and a palm-tree escape. A spring and summer gifting edit with suggested fresh floral and green-leaf fragrances.'},
}
def read(n):return json.loads((ROOT/'assets'/n).read_text())
def write(n,d):(ROOT/'assets'/n).write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n')
def main():
 products=read('candle-products.json');scents=read('fragrances.json');display=read('product-display.json');assignments=read('product-fragrances.json');media=read('image-manifest.json');added=[];sources=[]
 series=set(SERIES.values());old_images={p['image'] for p in products if p['series'] in series};products=[p for p in products if p['series'] not in series]
 for profile in scents:profile['matches']=[m for m in profile['matches'] if not(m['category']=='candle' and m['image'] in old_images)]
 folder=ROOT/'assets/candles/spring-summer';folder.mkdir(parents=True,exist_ok=True)
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
  for name,single,box,collection,scent,palette,description in DESIGNS:
   src=image(single);pack=image(box)
   p={'id':'spring-summer-'+Path(src).stem,'name':name,'series':SERIES[collection],'productType':'Scented candle','image':src,'packagingImage':pack,'images':[src,pack],'assignedScent':scent,'season':'Spring & Summer','seasonalCollection':collection,'designDescription':description+' Suggested seasonal fragrance pairing; final formulation and availability are confirmed with your sample.'}
   products.append(p);added.append(p);display[src]={'palette':palette};assignments[item_no('candle',src)]={'scent':scent,'basis':'Suggested spring/summer scene, colour and fragrance pairing; final formulation and availability subject to sample confirmation'}
   next(s for s in scents if s['id']==scent)['matches'].append({'category':'candle','image':src,'name':name,'series':p['series']})
 collections=read('candle-collections.json')
 for c in collections:
  pages=[[k for k in page if k.split(' | ')[0] not in series] for page in c['pages']];pages=[page for page in pages if page]
  new=[p['series']+' | '+p['name'] for p in added if p['seasonalCollection']==c['slug']]
  if new:
   c['pages']=[new]+pages;c['productKeys']=[k for page in c['pages'] for k in page];c['manualPageOrder']=True;c['seasonalFeature']=FEATURES[c['slug']]
 for n,d in [('candle-products.json',products),('fragrances.json',scents),('product-display.json',display),('product-fragrances.json',assignments),('image-manifest.json',media),('candle-collections.json',collections),('spring-summer-source-manifest.json',{'sourceArchives':[Path(arg).name for arg in sys.argv[1:]],'season':'Spring & Summer','products':added,'images':sources,'collectionCounts':{slug:sum(p['seasonalCollection']==slug for p in added) for slug in SERIES}})]:write(n,d)
 print('Imported 16 spring/summer designs and 32 photographs across three existing collections.')
if __name__=='__main__':main()
