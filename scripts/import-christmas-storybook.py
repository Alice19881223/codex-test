"""Import reviewed Christmas candle/diffuser and gift-box pairs from both owner archives.
Usage: python3 scripts/import-christmas-storybook.py /path/to/圣诞系列1.zip /path/to/圣诞系列2.zip
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
 ('Sage Forest Candle', '鼠尾草森林玻璃蜡烛-1.png', '蜡烛与礼盒白底展示-2.png', 'green-tea-cedarwood', 'sage', 'Scented candle', 'Sage-green glass with fine pale fir trees and falling snow creates a soft winter forest scene.'),
 ('Sage Forest Reed Diffuser', 'Sage Forest 标准扩香瓶-3.png', '兰纳薇香薰瓶与配套礼盒-5.png', 'green-tea-cedarwood', 'sage', 'Reed diffuser', 'A sage-green bottle with fine pale fir trees and snow, shown with natural-coloured reeds.'),
 ('Christmas Keepsake Glass Candle', '圣诞纪念双芯玻璃蜡烛-6.png', 'Lanarve玻璃蜡烛与配套礼盒-10.png', 'orange-clove', 'sage', 'Scented candle', 'Deep green glass with rocking horses, snow globes, ribbons and gingerbread figures recalls treasured Christmas keepsakes.'),
 ('Christmas Keepsake Glass Reed Diffuser', '圣诞玻璃扩香瓶-9.png', '玻璃香薰与配套礼盒-13.png', 'orange-clove', 'sage', 'Reed diffuser', 'A deep green bottle with rocking horses, ribbons and festive keepsake illustrations, shown with reeds.'),
 ('Lilac Gingerbread Candle', '薰衣草姜饼双芯玻璃蜡烛-26.png', '兰纳维蜡烛与配套礼盒-28.png', 'gingerbread-vanilla', 'lavender', 'Scented candle', 'Gingerbread figures, lilac-coloured trees and decorated hearts form a softly coloured Christmas story.'),
 ('Lilac Gingerbread Reed Diffuser', '薰衣草姜饼扩香瓶-23.png', 'Lanarve玻璃香薰与礼盒-27.png', 'gingerbread-vanilla', 'lavender', 'Reed diffuser', 'A light bottle with gingerbread figures, lilac-coloured trees and decorated hearts, shown with reeds.'),
 ('Pink Gingerbread Candle', '粉色姜饼圆柱玻璃蜡烛-20.png', '兰纳维蜡烛与配套礼盒-24.png', 'gingerbread-vanilla', 'blush', 'Scented candle', 'Pink glass with gingerbread cottages, biscuit stars, hearts and little figures evokes a cosy Christmas kitchen.'),
 ('Pink Gingerbread Reed Diffuser', '粉色姜饼玻璃扩香瓶-22.png', '香薰玻璃扩香瓶与配套礼盒-25.png', 'gingerbread-vanilla', 'blush', 'Reed diffuser', 'A pink bottle with gingerbread cottages, biscuit stars and hearts, shown with reeds and coordinated gift packaging.'),
 ('Merry Evergreen Candle', 'Merry Evergreen 双芯玻璃香薰蜡烛-16.png', '兰纳维玻璃蜡烛与礼盒-19.png', 'fir-cedarwood', 'ivory', 'Scented candle', 'An ivory-toned ground with evergreen trees, red bows and tiny gifts celebrates a classic festive forest.'),
 ('Merry Evergreen Reed Diffuser', 'Merry Evergreen玻璃香薰扩香瓶-18.png', 'Lanarve玻璃香薰与配套礼盒-21.png', 'fir-cedarwood', 'ivory', 'Reed diffuser', 'An ivory-toned bottle with evergreen trees, red bows and small festive gifts, shown with reeds.'),
 ('Winter Cottage Candle', '冬日小屋圆柱双芯蜡烛-4.png', 'Lanarve香薰蜡烛与礼盒-7.png', 'pine-cedarwood', 'sage', 'Scented candle', 'Snow-covered cottages, fir branches and warm window details create a quiet winter village scene.'),
 ('Winter Cottage Reed Diffuser', '冬日小屋扩香瓶-8.png', '兰纳薇玻璃香薰与配套礼盒-11.png', 'pine-cedarwood', 'sage', 'Reed diffuser', 'A soft green winter-cottage bottle with snowy trees and warm window details, shown with reeds.'),
 ('Festive Dachshund Candle', '节日腊肠犬蜡烛-12.png', 'Lanarve蜡烛与礼盒套装-15.png', 'apple-cinnamon', 'sage', 'Scented candle', 'Festive dachshunds in Santa hats and checked winter accessories bring a playful Christmas story to deep green glass.'),
 ('Festive Dachshund Reed Diffuser', '节日腊肠犬香薰瓶-14.png', '玻璃扩香器与配套礼盒-17.png', 'apple-cinnamon', 'sage', 'Reed diffuser', 'A deep green bottle decorated with festive dachshunds, Santa hats and winter accessories, shown with reeds.'),
 ('Crimson Cottage Glow Candle', 'Lanarve姜饼屋红色圣诞香薰蜡烛.png', '加高圣诞香薰礼盒.png', 'orange-clove', 'burgundy', 'Scented candle', 'Vivid red glass with an ivory gingerbread-house door, little hearts and a scalloped snow-like border captures a welcoming Christmas cottage.'),
]
def read(n):return json.loads((ROOT/'assets'/n).read_text())
def write(n,d):(ROOT/'assets'/n).write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n')
def main():
 products=read('christmas-products.json');scents=read('fragrances.json');display=read('product-display.json');assignments=read('product-fragrances.json');media=read('image-manifest.json');added=[];sources=[]
 old_images={p['image'] for p in products if p.get('id','').startswith('christmas-storybook-')};products=[p for p in products if p['image'] not in old_images]
 for profile in scents:profile['matches']=[m for m in profile['matches'] if not(m['category']=='christmas' and m['image'] in old_images)]
 folder=ROOT/'assets/christmas/storybook-glass';folder.mkdir(parents=True,exist_ok=True)
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
  for name,single,box,scent,palette,kind,description in DESIGNS:
   src=image(single);pack=image(box)
   p={'id':'christmas-storybook-'+Path(src).stem,'name':name,'series':'Christmas Storybook Glass','productType':kind,'image':src,'packagingImage':pack,'images':[src,pack],'assignedScent':scent,'designDescription':description+' Suggested Christmas fragrance pairing; final formulation and availability are confirmed with your sample.'}
   products.append(p);added.append(p);display[src]={'palette':palette};assignments[item_no('christmas',src)]={'scent':scent,'basis':'Suggested Christmas scene, colour and fragrance pairing; final formulation and availability subject to sample confirmation'}
   next(s for s in scents if s['id']==scent)['matches'].append({'category':'christmas','image':src,'name':name,'series':p['series']})
 order=read('catalogue-order.json');new_names=[p['name'] for p in added];flat=[name for page in order['christmas'] for name in page if name not in new_names];flat[12:12]=new_names
 order['christmas']=[flat[i:i+12] for i in range(0,len(flat),12)]
 layouts=read('catalogue-layouts.json');lookup={p['name']:p for p in products};layouts['christmas']=[[lookup[name]['image'] for name in page] for page in order['christmas']]
 for n,d in [('christmas-products.json',products),('fragrances.json',scents),('product-display.json',display),('product-fragrances.json',assignments),('image-manifest.json',media),('catalogue-order.json',order),('catalogue-layouts.json',layouts),('christmas-storybook-source-manifest.json',{'sourceArchives':[Path(arg).name for arg in sys.argv[1:]],'products':added,'images':sources,'placement':'Twelve new designs on page two; three continue at the start of page three; first page unchanged.'})]:write(n,d)
 p=ROOT/'catalog.js';text=p.read_text();import re
 text=re.sub(r'const christmasProducts = \[.*?\n\];',lambda m:'const christmasProducts = '+json.dumps(products,ensure_ascii=False,indent=2)+';',text,flags=re.S);p.write_text(text)
 print('Imported 15 Christmas designs with 30 matched photographs; inserted after the first 12 products.')
if __name__=='__main__':main()
