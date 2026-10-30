"""Import 38 reviewed Christmas product/packaging pairs from seven owner archives."""
from pathlib import Path
from contextlib import ExitStack
from io import BytesIO
import hashlib,json,re,sys,zipfile
from PIL import Image,ImageOps
from product_records import item_no

ROOT=Path(__file__).resolve().parents[1]
DESIGNS=[
 ('Snowman Moonlit Cottage','冬蓝雪景浮雕圣诞蜡烛.png','冬日蓝调雪人香薰礼盒.png','pine-cedarwood','blue','Winter Night & Snow','A moonlit cottage, snowman and tiny winter trees form a gentle blue Christmas-night scene.'),
 ('Golden Winter Reindeer','冬日金色驯鹿香氛蜡烛-1 (1).png','冬日驯鹿蜡烛礼盒-2 (1).png','amber-vanilla','gold','Golden Christmas Wishes','A fine golden reindeer with holly and tiny stars brings an elegant Christmas wish to an ivory-toned ground.'),
 ('Crimson Winter Fir','冬青圣诞红杯香薰蜡烛-3.png','冬日冷杉红烛礼盒-5.png','fir-cedarwood','burgundy','Christmas Hearth & Story','A white fir-tree line drawing on rich red glass creates a simple, classic Christmas statement.'),
 ('Ice Star Wish','冰蓝星雪香薰蜡烛-1.png','星雪之光奢华蜡烛礼盒-6.png','white-tea-bergamot','blue','Winter Night & Snow','A pale blue vessel with a dimensional winter star and snowflake details feels crisp, bright and quietly celebratory.'),
 ('Frosted Nutcracker','冰蓝胡桃夹子圣诞香薰蜡烛-3.png','冰蓝胡桃夹子圣诞蜡烛礼盒-5.png','vanilla-tonka','blue','Winter Night & Snow','A blue-and-ivory nutcracker brings storybook ceremony and a softly nostalgic mood to the season.'),
 ('Ice Blue Snowflake','冰蓝雪花香氛蜡烛-1.png','冰蓝冬雪蜡烛与奢华礼盒-2.png','white-tea-bergamot','blue','Winter Night & Snow','An ivory snowflake with delicate gold accents floats against an ice-blue winter sky.'),
 ('Home for Christmas Wreath','常青花环红结香氛烛-1.png','象牙圣诞花环蜡烛与礼盒-2.png','fir-cedarwood','ivory','Golden Christmas Wishes','A full evergreen wreath, red berries and a velvet-red bow frame a warm message of Christmas at home.'),
 ('Snowy Christmas Village','Lanarve圣诞村香氛蜡烛-1.png','圣诞村蜡烛与高级礼盒-2.png','pine-cedarwood','ivory','Christmas Hearth & Story','Painted village houses among snowy fir trees create a welcoming Christmas street at dusk.'),
 ('North Pole Workshop','北极圣诞香氛蜡烛-1.png','北极圣诞蜡烛礼盒-2.png','vanilla-tonka','ivory','Christmas Hearth & Story','A candy-cane sign points toward Santa’s workshop and candy shop in a playful North Pole vignette.'),
 ('Tartan Christmas Tree','红绿金线格纹圣诞香薰蜡烛-1.png','格纹圣诞蜡烛礼盒-2.png','fir-cedarwood','burgundy','Christmas Hearth & Story','Classic red-and-green tartan surrounds a small evergreen tree for a warm heritage Christmas look.'),
 ('Gingerbread Noel House','红白圣诞姜饼屋蜡烛-1.png','红色姜饼蜡烛与白色礼盒-2.png','gingerbread-vanilla','burgundy','Christmas Hearth & Story','An icing-white gingerbread house, peppermint details and winter greenery decorate rich red glass.'),
 ('Ivory Christmas Angel','红绿金圣诞天使蜡烛-1.png','圣诞天使蜡烛与奢华礼盒-2.png','amber-vanilla','ivory','Golden Christmas Wishes','A small red-robed Christmas angel is framed by greenery, berries and softly scattered stars.'),
 ('Sweet Home Christmas Bell','红边绿铃圣诞杯.png','圣诞陶瓷蜡烛与礼盒-2.png','apple-cinnamon','sage','Christmas Hearth & Story','A bell-shaped scene with Santa, gifts and a little tree sits on deep green with a festive red rim.'),
 ('Green Door Christmas Elf','精灵之门圣诞香薰蜡烛-1 (1).png','红门精灵圣诞蜡烛礼盒-2.png','apple-cinnamon','ivory','Christmas Hearth & Story','A cheerful elf waits beside a wreath-trimmed green door in a bright Christmas-morning scene.'),
 ('Gingerbread Christmas at Home','绯红釉姜饼屋圣诞蜡烛.png','红色圣诞蜡烛与姜饼礼盒.png','gingerbread-vanilla','burgundy','Christmas Hearth & Story','A gingerbread cottage, candy canes, snowy trees and Santa gather around a cosy red Christmas vessel.'),
 ('Waving Santa Candle','挥手圣诞老人插画蜡烛-1.png','小铃铛圣诞蜡烛礼盒.png','orange-clove','ivory','Christmas Hearth & Story','A smiling, waving Santa brings a playful hand-drawn character to an ivory-toned Christmas scene.'),
 ('Evergreen Star Tree','极简森林绿金星圣诞蜡烛-1.png','极简绿树蜡烛与象牙礼盒-2.png','fir-cedarwood','sage','Evergreen Christmas','A sculpted ivory tree with a golden star stands against deep evergreen for a clean, modern holiday look.'),
 ('Sage Rocking Horse','香槟金木马圣诞蜡烛-3.png','极简绿色摇马蜡烛礼盒-4.png','sandalwood-cashmere','sage','Evergreen Christmas','A small golden rocking horse on forest-green glass recalls treasured toys and quiet Christmas traditions.'),
 ('Crimson Christmas Angel','红釉天使圣诞香薰蜡烛-1.png','红色圣诞天使蜡烛礼盒-2.png','amber-vanilla','burgundy','Golden Christmas Wishes','A crowned angel in red and gold brings warmth, ceremony and a wishful glow to the festive table.'),
 ('Merry XMAS Robin','红色XMAS雪帽知更鸟蜡烛-1.png','红色圣诞蜡烛与象牙礼盒-2 (1).png','apple-cinnamon','burgundy','Christmas Hearth & Story','A tiny robin perched on dimensional XMAS lettering adds cheerful character to glossy red glass.'),
 ('Merry Christmas Village','红陶圣诞小镇香薰蜡烛-1.png','红色圣诞村蜡烛礼盒-2.png','orange-clove','burgundy','Christmas Hearth & Story','A colourful row of festive townhouses sits beneath a red bow inside a golden Christmas frame.'),
 ('Joy to the World Tree','兰纳维红釉圣诞树香氛蜡烛.png','圣诞红烛与象牙礼盒.png','fir-cedarwood','burgundy','Christmas Hearth & Story','A green tree, candy-cane bow and hand-lettered holiday greeting make a vivid red seasonal statement.'),
 ('Christmas Story Drum','奢华圣诞鼓形陶瓷蜡烛-1.png','圣诞鼓形蜡烛与奢华礼盒-2.png','orange-clove','burgundy','Christmas Hearth & Story','A drum-shaped design gathers Santa, a moonlit cottage, snowman and gifts into one theatrical Christmas scene.'),
 ('Cedar & Spice Tree','浆果红圣诞树香氛蜡烛-2.png','圣诞红蜡烛与森林绿礼盒-7.png','orange-clove','burgundy','Christmas Hearth & Story','A dimensional green tree on berry-red glass pairs classic evergreen colour with warm golden details.'),
 ('Red Door Christmas Elf','红门绿精灵圣诞魔法蜡烛-1.png','圣诞魔法蜡烛礼盒-2 (1).png','apple-cinnamon','ivory','Christmas Hearth & Story','A little elf stands beside a bright red wreath-trimmed door, ready to open a playful Christmas story.'),
 ('Enchanted Forest Reindeer','圣诞绿金双鹿香薰蜡烛-1.png','绿林圣诞香氛与象牙礼盒-2.png','fir-cedarwood','sage','Evergreen Christmas','Golden reindeer and snow-dusted trees gather inside a wreath-like frame on deep forest green.'),
 ('Golden Noel Angel','象牙瓷烛金色天使-2.png','酒红圣诞天使香氛礼盒-1.png','amber-vanilla','gold','Golden Christmas Wishes','A fine golden angel on an ivory-toned ground offers a quiet, luminous expression of Noël.'),
 ('Crimson Star Tree','象牙白红杉星冠蜡烛-1.png','金星红树蜡烛礼盒-2.png','fir-cedarwood','ivory','Golden Christmas Wishes','A sculpted crimson tree crowned by a gold star creates a restrained festive accent on ivory.'),
 ('Angel’s Wish Candle','金翼天使圣诞香氛蜡烛-1.png','天使心愿蜡烛礼盒-2.png','sandalwood-cashmere','ivory','Golden Christmas Wishes','A pale angel, gifts and a softly lit tree create a calm Christmas-wish scene beneath a starry sky.'),
 ('Silent Night Tree','午夜蓝极简圣诞香氛蜡烛-2.png','静夜松树圣诞蜡烛礼盒-8.png','pine-cedarwood','blue','Winter Night & Snow','A delicate silver-blue Christmas tree glows against midnight navy like a still, snowy night.'),
 ('A Little Christmas Joy Santa','圣诞老人腹部金色手写品牌.png','圣诞挥手蜡烛与奢华礼盒.png','orange-clove','ivory','Christmas Hearth & Story','A sculptural smiling Santa with a removable hat brings a playful centrepiece to the Christmas collection.'),
 ('Evergreen Minimal Tree','深林绿圣诞树香薰蜡烛-6.png','深林绿圣诞蜡烛礼盒-1.png','fir-cedarwood','sage','Evergreen Christmas','A white line-drawn fir tree shines against deep green in a simple evergreen composition.'),
 ('Nordic Forest Story','深绿釉面北欧圣诞香薰蜡烛-1.png','深绿圣诞蜡烛与精致礼盒-2.png','pine-cedarwood','sage','Evergreen Christmas','Layered trees, golden deer and a rocking horse surround a central ivory fir in a Nordic-inspired forest.'),
 ('Christmas Angel Reed Diffuser','无翼象牙色天使扩香器-1.png','深绿色圣诞扩香礼盒-2.png','amber-vanilla','ivory','Golden Christmas Wishes','A fluted ivory-toned diffuser with a wooden sphere and small golden heart suggests an abstract Christmas angel.'),
 ('Midnight Snowflake','午夜雪花香氛蜡烛-4.png','午夜雪晶奢华香氛蜡烛礼盒-7.png','pine-cedarwood','blue','Winter Night & Snow','A crisp geometric snowflake in ivory and gold stands out against a deep midnight-blue ground.'),
 ('Ivory Winter Rocking Horse','圣诞摇马陶瓷蜡烛.png','鼠尾草绿摇马香薰蜡烛礼盒.png','sandalwood-cashmere','ivory','Golden Christmas Wishes','A sage rocking horse and tiny snowman create a gentle heirloom-toy story on ivory.'),
 ('Letters to Santa','雪人圣诞信箱香薰蜡烛-1.png','圣诞雪人蜡烛礼盒-2.png','fir-cedarwood','ivory','Christmas Hearth & Story','A snowman waits beside a tree and a bright red postbox filled with letters for Santa.'),
 ('Ivory Forest Deer','象牙白鹿纹圣诞蜡烛.png','象牙鹿蜡烛与极简礼盒.png','fir-cedarwood','ivory','Golden Christmas Wishes','A single deep-green deer on an ivory-toned ground offers a clean, woodland expression of Christmas.'),
]

def read(name):return json.loads((ROOT/'assets'/name).read_text())
def write(name,data):(ROOT/'assets'/name).write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')

def main():
 products=read('christmas-products.json');scents=read('fragrances.json');display=read('product-display.json');assignments=read('product-fragrances.json');media=read('image-manifest.json');added=[];sources=[]
 old={p['image'] for p in products if p.get('id','').startswith('christmas-festive-2026-')};products=[p for p in products if p['image'] not in old]
 for profile in scents:profile['matches']=[m for m in profile['matches'] if not(m['category']=='christmas' and m['image'] in old)]
 folder=ROOT/'assets/christmas/festive-stories';folder.mkdir(parents=True,exist_ok=True)
 with ExitStack() as stack:
  archives=[stack.enter_context(zipfile.ZipFile(arg)) for arg in sys.argv[1:]]
  members={Path(n).name:(archive,n) for archive in archives for n in archive.namelist() if n.lower().endswith(('.png','.jpg','.jpeg')) and not n.startswith('__MACOSX/')}
  supplied=set(members);used={name for row in DESIGNS for name in row[1:3]};assert used==supplied,(sorted(supplied-used),sorted(used-supplied));assert len(DESIGNS)==38 and len(used)==76
  def image(name):
   archive,member=members[name];data=archive.read(member);digest=hashlib.sha256(data).hexdigest();im=ImageOps.exif_transpose(Image.open(BytesIO(data))).convert('RGB');im.thumbnail((1400,1400));dest=folder/(digest[:20]+'.webp');im.save(dest,'WEBP',quality=90,method=6);src=dest.relative_to(ROOT).as_posix();w,h=im.size
   entry={'width':w,'height':h,'sourceBytes':dest.stat().st_size,'src':src,'variants':[]}
   for width in sorted({min(w,480),min(w,960),w}):
    variant=dest if width==w else folder/(digest[:20]+f'-{width}.webp')
    if width!=w:
     small=im.copy();small.thumbnail((width,round(h*width/w)),Image.Resampling.LANCZOS);small.save(variant,'WEBP',quality=88,method=4)
    entry['variants'].append({'src':variant.relative_to(ROOT).as_posix(),'width':width,'bytes':variant.stat().st_size})
   media[src]=entry;sources.append({'source':name,'sha256':digest,'image':src,'width':w,'height':h});return src
  for name,single,box,scent,palette,series,description in DESIGNS:
   src=image(single);pack=image(box);kind='Reed diffuser' if name=='Christmas Angel Reed Diffuser' else 'Scented candle';product={'id':'christmas-festive-2026-'+Path(src).stem,'name':name,'series':series,'productType':kind,'image':src,'packagingImage':pack,'images':[src,pack],'assignedScent':scent,'designDescription':description+' Suggested festive fragrance pairing; final formulation and availability are confirmed with your sample.'}
   products.append(product);added.append(product);display[src]={'palette':palette};assignments[item_no('christmas',src)]={'scent':scent,'basis':'Suggested pairing based on the reviewed Christmas design, colour and seasonal atmosphere'};next(p for p in scents if p['id']==scent)['matches'].append({'category':'christmas','image':src,'name':name,'series':series})
 order=read('catalogue-order.json');new_names=[p['name'] for p in added];flat=[name for page in order['christmas'] for name in page if name not in new_names];lookup={p['name']:p for p in products};ornaments={'Festive Wax Ornaments','Botanical Wax Ornaments'};position=next((i for i,name in enumerate(flat) if lookup[name]['series'] in ornaments),len(flat));flat[position:position]=new_names;order['christmas']=[flat[i:i+12] for i in range(0,len(flat),12)]
 layouts=read('catalogue-layouts.json');layouts['christmas']=[[lookup[name]['image'] for name in page] for page in order['christmas']]
 manifest={'sourceArchives':[Path(arg).name for arg in sys.argv[1:]],'products':added,'images':sources,'pairCount':38,'placement':'Added after existing Christmas candles and diffusers and before wax ornaments.'}
 for name,data in [('christmas-products.json',products),('fragrances.json',scents),('product-display.json',display),('product-fragrances.json',assignments),('image-manifest.json',media),('catalogue-order.json',order),('catalogue-layouts.json',layouts),('christmas-festive-stories-source-manifest.json',manifest)]:write(name,data)
 catalog=ROOT/'catalog.js';text=catalog.read_text();text=re.sub(r'const christmasProducts = \[.*?\n\];',lambda m:'const christmasProducts = '+json.dumps(products,ensure_ascii=False,indent=2)+';',text,count=1,flags=re.S);catalog.write_text(text)
 print('Imported 38 Christmas designs with 76 reviewed photographs.')

if __name__=='__main__':main()
