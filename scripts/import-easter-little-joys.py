"""Import the reviewed Easter candle edit into Little Joys.

Usage: python3 scripts/import-easter-little-joys.py /path/to/打包1.zip ... /path/to/打包5.zip [/path/to/additional.zip]
"""
from contextlib import ExitStack
from io import BytesIO
from pathlib import Path
import hashlib, json, sys, zipfile

from PIL import Image, ImageOps
from product_records import item_no

ROOT = Path(__file__).resolve().parents[1]
SERIES = 'Easter Little Joys'

# product archive/file, packaging archive/file, name, scent, palette, Easter description
DESIGNS = [
 ('打包1','复活节彩绘香薰蜡烛-3.png','打包2','复活节条纹彩蛋蜡烛礼盒-13.png','Painted Easter Egg','peony-lychee','blush','A hand-painted Easter egg in blush, mint and soft yellow brings folk-inspired spring colour to the table. Peony & Lychee adds a bright floral-fruit lift for Easter gifting.'),
 ('打包1','复活节薄荷彩蛋香薰蜡烛-7.png','打包5','波浪彩蛋复活节香薰礼盒-14.png','Mint Folk Egg','osmanthus-green-tea','sage','A decorative Easter egg sits on cool mint ceramic with tiny tulip-like details. Osmanthus & Green Tea echoes the pastel palette with a light, fresh spring character.'),
 ('打包1','春日花卉复活节香薰蜡烛-6 (1).png','打包1','春日花语复活节蜡烛礼盒-15 (1).png','Easter Flower Wreath','jasmine-orange-blossom','ivory','A soft wreath of spring flowers frames a Happy Easter message on warm ivory ceramic. Jasmine & Orange Blossom extends the design with luminous white florals.'),
 ('打包1','淡黄兔跃复活节香薰蜡烛-1 (1).png','打包5','跃兔复活节蜡烛礼盒-9.png','Meadow Leap Rabbit','fig-green-leaves','gold','A white rabbit leaps through new leaves and meadow flowers on butter-yellow ceramic. Fig & Green Leaves brings the freshness of an Easter garden.'),
 ('打包1','粉彩彩蛋奢华香薰蜡烛-2.png','打包2','春花彩蛋香薰蜡烛礼盒-10.png','Blue Daisy Egg','white-tea-bergamot','blue','A pale blue Easter egg filled with daisies and fine gold lines feels crisp and celebratory. White Tea & Bergamot keeps the pairing airy and sunlit.'),
 ('打包1','粉彩斑点陶瓷香薰蜡烛-5.png','打包4','象牙礼盒与香薰蜡烛-6.png','Blush Speckled Egg','rose-green-leaves','blush','A cracked-egg rim and speckled blush glaze turn this sculptural candle into a playful Easter centrepiece. Rose & Green Leaves balances sweetness with fresh spring foliage.'),
 ('打包1','粉蓝小鸭复活节香薰蜡烛-2.png','打包5','雨伞小鸭复活节香薰蜡烛礼盒-8.png','Rainy Day Duckling','lemon-verbena','blue','A cheerful duckling carries a yellow umbrella through a powder-blue Easter scene. Lemon & Verbena adds a clean citrus brightness after a spring shower.'),
 ('打包1','粉蓝格纹兔子复活节蜡烛-3.png','打包3','蓝格棕兔复活节蜡烛礼盒-8 (1).png','Blue Gingham Bunny','vanilla-tonka','blue','A chocolate-brown rabbit in blue gingham overalls gives Easter gifting a storybook charm. Vanilla & Tonka adds a soft, comforting sweetness.'),
 ('打包2','复活节兔子花卉蜡烛-1.png','打包2','复活节花卉兔彩蛋蜡烛礼盒-6.png','Easter Meadow Rabbit','jasmine-orange-blossom','ivory','Spring flowers and a tiny rabbit fill an egg-shaped Happy Easter frame. Jasmine & Orange Blossom captures the feeling of a garden opening in spring.'),
 ('打包2','复活节兔影玻璃蜡烛-1.png','打包2','高端复活节蜡烛与配套礼盒-2.png','Hop into Spring','pear-freesia','ivory','A green rabbit silhouette completes the playful HOP lettering on translucent ivory glass. Pear & Freesia gives the Easter message a light, joyful freshness.'),
 ('打包2','开心果陶瓷彩蛋香氛蜡烛-3.png','打包4','香薰蜡烛与精致礼盒-4.png','Pistachio Egg Charm','green-tea-cedarwood','sage','A tiny speckled egg hangs from a natural bow on pistachio-green ceramic. Green Tea & Cedarwood keeps this refined Easter design calm and gently grounded.'),
 ('打包5','象牙兔与胡萝卜复活节香薰蜡烛-4.png','打包2','胡萝卜兔复活节香薰蜡烛礼盒-12.png','Carrot Garden Bunny','fig-green-leaves','sage','An ivory rabbit holds a carrot among small white flowers on garden-green glass. Fig & Green Leaves complements its fresh Easter garden story.'),
 ('打包2','蓝蛋金带复活节香薰蜡烛-5.png','打包4','雏菊彩蛋复活节蜡烛礼盒-11.png','Golden Daisy Egg','white-tea-rosemary','ivory','Blue daisies and delicate gold bands decorate an ivory Easter egg motif. White Tea & Rosemary adds a clean herbal breeze to the polished seasonal design.'),
 ('打包3','蜜蜂浮雕奢华香薰蜡烛-1.png','打包3','奢华香氛蜡烛与蜂纹礼盒-2.png','Honeybee Basket','amber-vanilla','gold','Woven yellow-and-ivory texture and small raised bees celebrate the first busy days of spring. Amber & Vanilla suggests warm honeyed light for an Easter table.'),
 ('打包3','奶油黄复活节小鸡花卉蜡烛-4.png','打包3','破壳小鸡复活节蜡烛礼盒-9.png','Blossom Shell Chick','peony-lychee','gold','A newly hatched chick peeks from a floral Easter egg on creamy yellow glass. Peony & Lychee makes the design feel soft, bright and celebratory.'),
 ('打包3','奶油黄小鸡复活节香薰蜡烛-8.png','打包5','小鸡复活节蜡烛礼盒-16.png','Little Yellow Chick','lemon-verbena','gold','A fluffy yellow chick stands among tiny spring flowers in a warm Easter palette. Lemon & Verbena brings a sunny citrus-green direction.'),
 ('打包3','鼠尾草格纹兔子复活节蜡烛-2.png','打包3','绿格纹白兔复活节蜡烛礼盒-7.png','Sage Gingham Bunny','white-tea-rosemary','sage','A white rabbit in sage gingham overalls sits among delicate flowers. White Tea & Rosemary supports the quiet, garden-fresh Easter palette.'),
 ('打包4','象牙兔耳彩蛋蜡烛-5 (1).png','打包4','兔耳彩蛋香薰蜡烛礼盒-10.png','Bunny-Ear Egg','vanilla-tonka','ivory','Tall pink-lined ears rise from a cracked ivory egg to create a sculptural Easter keepsake. Vanilla & Tonka adds a soft, familiar warmth.'),
 ('打包5','象牙兔耳复活节香薰蜡烛-3.png','打包4','兔耳浮雕复活节蜡烛礼盒-7.png','Blush Bunny Ears','rose-green-leaves','ivory','Raised blush bunny ears and a small ribbon give ivory ceramic a gentle Easter detail. Rose & Green Leaves keeps the floral pairing fresh rather than sweet.'),
 ('打包4','兔耳黄鸭复活节蜡烛礼盒-10.png',None,None,'Easter Duckling','lemon-lavender','sage','A yellow Easter duckling and pink bunny ears brighten mint-green glass with a friendly spring character. Lemon & Lavender pairs sunny citrus with a calm floral finish.'),
 ('打包4','天鹅彩蛋复活节香薰蜡烛-4.png','打包5','白鹅彩蛋复活节蜡烛礼盒-9.png','Easter Swan Egg','soft-linen','ivory','A white spring bird carries a blue floral Easter egg beneath delicate gold lettering. Soft Linen keeps the ivory design clean, gentle and giftable.'),
 ('打包5','白鹅春日复活节香氛蜡烛-1.png','打包4','条纹白鹅复活节蜡烛礼盒-6.png','Hello Spring Goose','lime-basil','sage','A white goose walks through green stripes, tiny eggs and spring flowers. Lime & Basil gives the playful Easter illustration a crisp green freshness.'),
]

ADDITIONAL_DESIGNS = [
 ('补充包','ChatGPT Image 2026年10月30日 14_01_09.png','补充包','ChatGPT Image 2026年10月30日 14_00_42.png','Confetti Bunny','pear-freesia','ivory','A tiny white rabbit and scattered spring flowers decorate a softly irregular ivory vessel. Pear & Freesia gives this playful Easter bunny a fresh, airy sweetness.'),
 ('补充包','ChatGPT Image 2026年10月30日 14_01_22.png','补充包','ChatGPT Image 2026年10月30日 14_00_47.png','Confetti Easter Egg','peony-lychee','ivory','A small pastel-speckled egg brings a quiet Easter detail to warm ivory ceramic. Peony & Lychee adds a delicate floral-fruit note to the confetti palette.'),
 ('补充包','ChatGPT Image 2026年10月30日 14_01_31.png','补充包','ChatGPT Image 2026年10月30日 14_00_52.png','Easter Delivery','lemon-verbena','ivory','A mint-green truck carries a row of colourful Easter eggs through a miniature spring scene. Lemon & Verbena keeps the cheerful delivery bright and crisp.'),
 ('补充包','ChatGPT Image 2026年10月30日 14_01_37.png','补充包','ChatGPT Image 2026年10月30日 14_00_56.png','Spring Joy Wreath','rose-green-leaves','ivory','A small bunny-ear wreath forms the O in JOY, surrounded by flowers and pastel eggs. Rose & Green Leaves gives the Easter message a fresh garden character.'),
 ('补充包','bunny-ears-product.png','补充包','bunny-ears-packaging.png','Petal Bunny Ears','vanilla-tonka','ivory','Dimensional bunny ears emerge from soft green leaves on natural ivory ceramic. Vanilla & Tonka adds a gentle, comforting warmth to this tactile Easter keepsake.'),
 ('补充包','bunny-wreath-product.png','补充包','bunny-wreath-packaging.png','Spring Bunny Wreath','jasmine-orange-blossom','ivory','A raised rabbit silhouette sits inside a delicate floral wreath with a tiny bow. Jasmine & Orange Blossom extends the refined Easter design with luminous spring florals.'),
]

def read(name): return json.loads((ROOT/'assets'/name).read_text())
def write(name,data): (ROOT/'assets'/name).write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')

def main():
 assert len(sys.argv) in (6,7),'Pass 打包1.zip through 打包5.zip and optionally one additional archive'
 products=read('candle-products.json');scents=read('fragrances.json');display=read('product-display.json');assignments=read('product-fragrances.json');media=read('image-manifest.json');identities=read('product-identities.json');collections=read('candle-collections.json')
 previous=[p for p in products if p['series']==SERIES];previous_images={p['image'] for p in previous};previous_keys={p['series']+' | '+p['name'] for p in previous}
 for product in previous:
  ref=item_no('candle',product['image']);assignments.pop(ref,None);identities.setdefault('candle',{}).pop(product['image'],None)
 products=[p for p in products if p['series']!=SERIES]
 for profile in scents:profile['matches']=[m for m in profile['matches'] if not(m['category']=='candle' and m['image'] in previous_images)]
 folder=ROOT/'assets/candles/easter-little-joys';folder.mkdir(parents=True,exist_ok=True);added=[];sources=[]
 with ExitStack() as stack:
  archives={Path(arg).stem:stack.enter_context(zipfile.ZipFile(arg)) for arg in sys.argv[1:6]}
  if len(sys.argv)==7:archives['补充包']=stack.enter_context(zipfile.ZipFile(sys.argv[6]))
  members={(archive_name,Path(member).name):(archive,member) for archive_name,archive in archives.items() for member in archive.namelist() if member.lower().endswith(('.png','.jpg','.jpeg')) and not member.startswith('__MACOSX/')}
  def image(archive_name,filename):
   archive,member=members[(archive_name,filename)];data=archive.read(member);digest=hashlib.sha256(data).hexdigest();im=ImageOps.exif_transpose(Image.open(BytesIO(data))).convert('RGB');im.thumbnail((1400,1400));dest=folder/(digest[:20]+'.webp');im.save(dest,'WEBP',quality=90,method=6);src=dest.relative_to(ROOT).as_posix();w,h=im.size
   entry={'width':w,'height':h,'sourceBytes':len(data),'src':src,'variants':[]}
   for variant_width in sorted({min(w,480),min(w,960),w}):
    variant=dest if variant_width==w else folder/(digest[:20]+f'-{variant_width}.webp')
    if variant_width!=w:
     small=im.copy();small.thumbnail((variant_width,round(h*variant_width/w)),Image.Resampling.LANCZOS);small.save(variant,'WEBP',quality=88,method=4)
    entry['variants'].append({'src':variant.relative_to(ROOT).as_posix(),'width':variant_width,'bytes':variant.stat().st_size})
   media[src]=entry;sources.append({'sourceArchive':archive_name+'.zip','source':filename,'sha256':digest,'image':src,'width':w,'height':h});return src
  designs=DESIGNS+(ADDITIONAL_DESIGNS if len(sys.argv)==7 else [])
  for single_archive,single_name,box_archive,box_name,name,scent,palette,description in designs:
   src=image(single_archive,single_name);pack=image(box_archive,box_name) if box_archive else None;ref=item_no('candle',src);identities.setdefault('candle',{})[src]=ref
   product={'id':'easter-2026-'+Path(src).stem,'name':name,'series':SERIES,'productType':'Scented candle','image':src,'images':[src]+([pack] if pack else []),'assignedScent':scent,'season':'Easter','designDescription':description+' Suggested Easter fragrance pairing; final formulation and availability are confirmed with your sample.'}
   if pack:product['packagingImage']=pack
   else:product.update(view='product and gift-box composition',viewLabels=['Product & gift packaging'])
   products.append(product);added.append(product);display[src]={'palette':palette};assignments[ref]={'scent':scent,'basis':'Suggested pairing based on the supplied Easter design, spring palette and seasonal motif.'};next(profile for profile in scents if profile['id']==scent)['matches'].append({'category':'candle','image':src,'name':name,'series':SERIES})
 collection=next(c for c in collections if c['slug']=='little-joys');flat=[key for key in collection['productKeys'] if key not in previous_keys];new_keys=[p['series']+' | '+p['name'] for p in added];insert=next((i+1 for i,key in reversed(list(enumerate(flat))) if key.startswith('Wild Elegance | ')),0);flat[insert:insert]=new_keys;collection['productKeys']=flat;collection['pages']=[flat[i:i+12] for i in range(0,len(flat),12)];collection['manualPageOrder']=True;collection['description']='Playful candles for little celebrations: Easter eggs, spring rabbits, ducklings, cheerful animals and expressive patterns, paired with bright floral, citrus and green fragrance directions.';collection['story']='Our Easter edit brings together painted eggs, garden rabbits, chicks and spring geese in soft seasonal colour, with fresh floral, citrus, tea and green fragrance directions.'
 manifest={'sourceArchives':[Path(arg).name for arg in sys.argv[1:]],'collection':'little-joys','series':SERIES,'productCount':len(added),'imageCount':len(sources),'pairedCount':sum(bool(p.get('packagingImage')) for p in added),'singleCompositionCount':sum(not p.get('packagingImage') for p in added),'products':added,'images':sources,'duplicateSourceFilesExcluded':['打包5/波浪彩蛋复活节香薰礼盒-14 (1).png','打包3/春花彩蛋香薰蜡烛礼盒-10 (1).png','打包5/雏菊彩蛋复活节蜡烛礼盒-11 (1).png'],'singleComposition':['Easter Duckling'],'additionalArchive':Path(sys.argv[6]).name if len(sys.argv)==7 else None}
 for name,data in [('candle-products.json',products),('fragrances.json',scents),('product-display.json',display),('product-fragrances.json',assignments),('image-manifest.json',media),('product-identities.json',identities),('candle-collections.json',collections),('easter-little-joys-source-manifest.json',manifest)]:write(name,data)
 print(f'Imported {len(added)} Easter Little Joys candles from {len(sources)} unique supplied photographs.')

if __name__=='__main__':main()
