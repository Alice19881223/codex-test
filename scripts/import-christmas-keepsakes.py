"""Import the owner's 16-image Christmas archive as eight visually verified pairs.
Usage: python3 scripts/import-christmas-keepsakes.py /path/to/圣诞系列.zip
Only known image members are read; archive contents are not executed or extracted.
"""
from pathlib import Path
from io import BytesIO
import hashlib,json,sys,zipfile,re
from PIL import Image,ImageOps
from product_records import item_no
ROOT=Path(__file__).resolve().parents[1]
# Single product first; matching product-and-box photograph second.
PAIRS=[
 ('Festive Confetti Candle','圣诞彩点象牙瓷烛杯-2.png','圣诞奢华香薰蜡烛礼盒-5.png','apple-cinnamon','ivory','Scented candle','Ivory-coloured vessel with red, green and gold-toned dots and a fine red rim.'),
 ('Starlight Red Candle','星耀圣诞红釉瓷杯蜡烛-1.png','奢雅圣诞香薰蜡烛礼盒-6.png','orange-clove','burgundy','Scented candle','A festive red vessel with an ivory-coloured star motif, colourful dots and small gold-toned stars.'),
 ('Christmas Stocking Candle','圣诞红袜瓷杯蜡烛-3.png','圣诞香薰蜡烛与礼盒-8.png','gingerbread-vanilla','ivory','Scented candle','An ivory-coloured vessel with a red stocking motif, holly details and a contrasting green rim.'),
 ('Evergreen Tree Candle','森林绿圣诞树浮雕蜡烛杯-4.png','森林绿圣诞蜡烛礼盒-7.png','fir-cedarwood','sage','Scented candle','A forest-green vessel with a decorated Christmas tree motif and scattered star details.'),
 ('Festive Confetti Reed Diffuser','象牙红绿波点五枝圣诞扩香瓶-1.png','圣诞香氛扩香礼盒-5.png','apple-cinnamon','ivory','Reed diffuser','An ivory-coloured diffuser bottle decorated with red, green and gold-toned dots, shown with natural-coloured reeds.'),
 ('Starlight Red Reed Diffuser','红色星纹圣诞扩香瓶-2.png','圣诞红盒藤条香薰礼盒-6.png','orange-clove','burgundy','Reed diffuser','A red diffuser bottle with an ivory-coloured star motif and small gold-toned stars, shown with natural-coloured reeds.'),
 ('Christmas Stocking Reed Diffuser','圣诞红袜象牙扩香瓶-4.png','圣诞香氛扩香瓶与礼盒-7.png','gingerbread-vanilla','ivory','Reed diffuser','An ivory-coloured diffuser bottle with a red stocking motif and holly details, shown with natural-coloured reeds.'),
 ('Evergreen Tree Reed Diffuser','奢华深松绿圣诞扩香瓶-3.png','圣诞森林绿扩香礼盒-8.png','pine-cedarwood','sage','Reed diffuser','A forest-green diffuser bottle featuring a decorated Christmas tree motif and star details, shown with natural-coloured reeds.'),
]
def read_json(name):return json.loads((ROOT/'assets'/name).read_text())
def write_json(name,value):(ROOT/'assets'/name).write_text(json.dumps(value,ensure_ascii=False,indent=2)+'\n')
products=read_json('christmas-products.json');scents=read_json('fragrances.json');assignments=read_json('product-fragrances.json');display=read_json('product-display.json');manifest=[];added=[]
folder=ROOT/'assets/christmas/keepsakes';folder.mkdir(parents=True,exist_ok=True)
with zipfile.ZipFile(sys.argv[1]) as archive:
 members={Path(n).name:n for n in archive.namelist() if not n.endswith('/')}
 def image(name):
  data=archive.read(members[name]);digest=hashlib.sha256(data).hexdigest();dest=folder/(digest[:20]+'.webp')
  im=ImageOps.exif_transpose(Image.open(BytesIO(data)));im.thumbnail((1400,1400));im.convert('RGB').save(dest,'WEBP',quality=90,method=6)
  path=dest.relative_to(ROOT).as_posix();manifest.append(dict(source=name,sha256=digest,image=path,width=im.width,height=im.height));return path
 for name,single,pack,scent,palette,kind,description in PAIRS:
  first,second=image(single),image(pack);ref=item_no('christmas',first)
  p=dict(id='christmas-keepsake-'+ref.lower(),name=name,series='Christmas Keepsake '+('Diffusers' if kind=='Reed diffuser' else 'Candles'),productType=kind,image=first,packagingImage=second,images=[first,second],assignedScent=scent,designDescription=description)
  if not any(x['image']==first for x in products):products.append(p)
  added.append(p);display[first]={'palette':palette};assignments[ref]={'scent':scent,'basis':'Suggested Christmas pairing selected from the existing library for the photographed design; formulation subject to confirmation'}
  profile=next(s for s in scents if s['id']==scent)
  if not any(m['category']=='christmas' and m['image']==first for m in profile['matches']):profile['matches'].append(dict(category='christmas',image=first,name=name,series=p['series']))
order=read_json('catalogue-order.json');flat=[n for page in order['christmas'] for n in page if n not in {p['name'] for p in added}]
# Preserve first two reviewed pages. New candle block fills page three;
# diffusers follow the existing gift sets, with ornaments still at the end.
flat[32:32]=[p['name'] for p in added[:4]]
ornament=next(i for i,name in enumerate(flat) if 'Ornament' in name)
flat[ornament:ornament]=[p['name'] for p in added[4:]]
order['christmas']=[flat[i:i+12] for i in range(0,len(flat),12)]
for name,value in [('christmas-products.json',products),('fragrances.json',scents),('product-fragrances.json',assignments),('product-display.json',display),('catalogue-order.json',order),('christmas-keepsakes-source-manifest.json',{'sourceArchive':Path(sys.argv[1]).name,'products':added,'images':manifest})]:write_json(name,value)
p=ROOT/'catalog.js';text=p.read_text();text=re.sub(r'const christmasProducts = \[.*?\n\];',lambda m:'const christmasProducts = '+json.dumps(products,ensure_ascii=False,indent=2)+';',text,flags=re.S);p.write_text(text)
print('Imported 8 products / 16 images; Christmas pages:',[len(p) for p in order['christmas']])
