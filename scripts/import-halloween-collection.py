"""Import 35 reviewed Halloween product/second-view pairs from six owner archives."""
from pathlib import Path
from contextlib import ExitStack
from io import BytesIO
import hashlib,json,re,runpy,sys,zipfile
from PIL import Image,ImageOps
from product_records import item_no

ROOT=Path(__file__).resolve().parents[1]
# Display order moves from classic black and pumpkin orange through friendly ghosts to pastel magic.
DESIGNS=[
 (0,16,'Pumpkin Parade','pumpkin-spice','black','Midnight Mischief','A jaunty jack-o’-lantern character glows against matte black.'),
 (2,18,'Batwing Pumpkin','orange-clove','orange','Midnight Mischief','A winged pumpkin in a witch hat brings theatrical Halloween colour.'),
 (3,19,'Midnight Witch Hat','mugwort-incense','ivory','Midnight Mischief','A graphic black witch hat creates a clean, modern seasonal design.'),
 (5,21,'Candy Corn Moon','caramel-cream','black','Midnight Mischief','Candy-corn stripes and a tiny bat give midnight black a playful twist.'),
 (6,22,'Golden Familiar','amber-vanilla','gold','Midnight Mischief','A black cat sits beneath a crescent moon in a golden window.'),
 (8,24,'Spooky Forest Night','fireside-smoked-woods','green','Midnight Mischief','Pumpkins, bats and a crescent moon gather in a deep forest-green frame.'),
 (66,53,'Bat & Pumpkin Gold','oud-saffron','black','Midnight Mischief','Raised black bats and a golden pumpkin create a polished dark-luxe finish.'),
 (48,39,'Black Cat Moon','incense-myrrh','black','Midnight Mischief','A black cat, web and pumpkin form a richly layered night scene.'),
 (65,40,'Midnight Cat Witch','oud-saffron','black','Midnight Mischief','A sculpted cat in a copper witch hat adds elegant character to black glass.'),
 (50,41,'Botanical Ghost','sandalwood-cashmere','black','Midnight Mischief','An ivory ghost framed by leafy branches softens the midnight palette.'),
 (42,58,'Haunted Pumpkin Night','fireside-smoked-woods','orange','Midnight Mischief','A glowing orange vessel wraps a haunted house and wandering ghost around the candle.'),
 (57,36,'Jack-O’-Lantern Carnival','pumpkin-spice','orange','Midnight Mischief','A smiling pumpkin and fine web lines make a vivid seasonal centrepiece.'),
 (1,17,'Boo After Dark','pomegranate-amber','burgundy','Ghost Parade','A booted little ghost says boo against deep plum glass.'),
 (7,23,'Trick or Treat Spirits','vanilla-tonka','burgundy','Ghost Parade','Two friendly ghosts meet beneath a web for a playful trick-or-treat scene.'),
 (12,13,'Floating Ghost','soft-linen','black','Ghost Parade','A softly drawn white ghost floats across clean black glass.'),
 (14,15,'Midnight Shy Ghost','vanilla-tonka','black','Ghost Parade','A wide-eyed ghost brings gentle character to a graphic monochrome vessel.'),
 (25,64,'Starry Witch Ghost','sandalwood-cashmere','ivory','Ghost Parade','A sculptural ghost in a starry black hat feels whimsical and collectable.'),
 (26,62,'Pumpkin Stripe Ghost','orange-clove','ivory','Ghost Parade','Orange stripes brighten a seated ghost in a jaunty witch hat.'),
 (27,63,'Golden Stripe Ghost','amber-vanilla','ivory','Ghost Parade','Golden stripes and shoes give the friendly ghost a warm celebratory finish.'),
 (43,10,'Pumpkin Party Glow','pumpkin-spice','orange','Ghost Parade','A smiling pumpkin-shaped candle is topped with autumn leaves and a tiny pumpkin.'),
 (44,11,'Boo & Cream Pumpkin','vanilla-tonka','ivory','Ghost Parade','An ivory pumpkin-shaped candle carries a smiling face, ghost and crescent moon.'),
 (35,34,'Pumpkin & Little Ghost','gingerbread-vanilla','ivory','Ghost Parade','A little ghost peeks over a dimensional pumpkin on warm ivory ceramic.'),
 (37,38,'Ghost & Black Cat','mugwort-incense','ivory','Enchanted Halloween','A witch-hatted ghost cuddles a black cat in a softly sculpted scene.'),
 (67,52,'Ivory Ghost Garden','white-tea-rosemary','ivory','Enchanted Halloween','Tiny ghosts, bats and pumpkins form a light botanical Halloween pattern.'),
 (49,9,'Moonlit Magic Pumpkin','lavender-cedarwood','lavender','Enchanted Halloween','A lilac pumpkin-shaped candle with a black cat and witch hat feels sweetly magical.'),
 (4,20,'Lilac Bat Spell','blackcurrant-rose','lavender','Enchanted Halloween','A graphic bat and small pumpkin sit on soft lilac ceramic.'),
 (28,29,'Woodland Toadstool','fig-green-leaves','gold','Enchanted Halloween','A sculpted woodland mushroom lid brings an enchanted-forest note to the season.'),
 (32,33,'The Witch Is In','green-tea-cedarwood','sage','Enchanted Halloween','A faceted sage vessel and tiny witch-hat handle offer a refined magical motif.'),
 (56,51,'Candy Stripe Boo','caramel-cream','orange','Pastel Spells','A friendly ghost floats across cheerful orange-and-ivory stripes.'),
 (45,47,'Pastel Spooky','peony-lychee','blush','Pastel Spells','Raised pastel lettering and a small bat turn Halloween bright and playful.'),
 (46,61,'Blush Haunted House','rose-green-leaves','blush','Pastel Spells','A softly embossed haunted house and bat sit on blush ceramic.'),
 (30,31,'Lavender Haunted House','lavender-cedarwood','lavender','Pastel Spells','A sculpted haunted-house lid crowns a detailed lavender vessel.'),
 (60,59,'Lavender Haunted Manor','blackcurrant-rose','lavender','Pastel Spells','Ghosts and castle windows rise in relief across soft lavender ceramic.'),
 (54,69,'Magenta Bat','pomegranate-amber','blush','Pastel Spells','A black bat and golden stars pop against vivid magenta glass.'),
 (68,55,'Purple Bat Mischief','blackcurrant-rose','lavender','Pastel Spells','A wide-eyed sculpted bat wraps around jewel-purple glass.'),
]

def read(name):return json.loads((ROOT/'assets'/name).read_text())
def write(name,data):(ROOT/'assets'/name).write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')

def main():
 assert len(sys.argv)==7,'Pass 打包1.zip through 打包6.zip'
 products=[];scents=read('fragrances.json');display=read('product-display.json');assignments=read('product-fragrances.json');media=read('image-manifest.json');sources=[]
 for profile in scents:profile['matches']=[match for match in profile['matches'] if match['category']!='halloween']
 folder=ROOT/'assets/halloween/paired';folder.mkdir(parents=True,exist_ok=True)
 with ExitStack() as stack:
  opened={Path(arg).stem:stack.enter_context(zipfile.ZipFile(arg)) for arg in sys.argv[1:]}
  members=[]
  for n in range(1,7):
   archive=opened[f'打包{n}'];members.extend((archive,name) for name in sorted(archive.namelist(),key=lambda x:Path(x).name) if name.lower().endswith(('.png','.jpg','.jpeg')) and not name.startswith('__MACOSX/'))
  assert len(members)==70
  used=[i for row in DESIGNS for i in row[:2]];assert len(used)==70 and set(used)==set(range(70))
  def image(index):
   archive,member=members[index];data=archive.read(member);digest=hashlib.sha256(data).hexdigest();im=ImageOps.exif_transpose(Image.open(BytesIO(data))).convert('RGB');im.thumbnail((1400,1400));dest=folder/(digest[:20]+'.webp');im.save(dest,'WEBP',quality=90,method=6);src=dest.relative_to(ROOT).as_posix();w,h=im.size
   entry={'width':w,'height':h,'sourceBytes':len(data),'src':src,'variants':[]}
   for width in sorted({min(w,480),min(w,960),w}):
    variant=dest if width==w else folder/(digest[:20]+f'-{width}.webp')
    if width!=w:
     small=im.copy();small.thumbnail((width,round(h*width/w)),Image.Resampling.LANCZOS);small.save(variant,'WEBP',quality=88,method=4)
    entry['variants'].append({'src':variant.relative_to(ROOT).as_posix(),'width':width,'bytes':variant.stat().st_size})
   media[src]=entry;sources.append({'sourceArchive':Path(archive.filename).name,'source':Path(member).name,'sourceIndex':index,'sha256':digest,'image':src,'width':w,'height':h});return src
  for single,box,name,scent,palette,series,description in DESIGNS:
   palette={'black':'charcoal','orange':'amber','green':'sage'}.get(palette,palette)
   src=image(single);pack=image(box);p={'id':'halloween-2026-'+Path(src).stem,'name':name,'series':series,'productType':'Scented candle','image':src,'packagingImage':pack,'images':[src,pack],'assignedScent':scent,'designDescription':description+' Suggested Halloween fragrance pairing; final formulation and availability are confirmed with your sample.'}
   products.append(p);display[src]={'palette':palette};assignments[item_no('halloween',src)]={'scent':scent,'basis':'Suggested pairing based on the reviewed Halloween design, colour and seasonal atmosphere'};next(x for x in scents if x['id']==scent)['matches'].append({'category':'halloween','image':src,'name':name,'series':series})
 order=read('catalogue-order.json');order['halloween']=[[p['name'] for p in products[i:i+12]] for i in range(0,len(products),12)]
 layouts=read('catalogue-layouts.json');layouts['halloween']=[[p['image'] for p in products[i:i+12]] for i in range(0,len(products),12)]
 manifest={'sourceArchives':[Path(arg).name for arg in sys.argv[1:]],'products':products,'images':sources,'pairCount':35,'pageCounts':[12,12,11],'placement':'Independent Halloween catalogue after Christmas in the main navigation.'}
 for name,data in [('halloween-products.json',products),('fragrances.json',scents),('product-display.json',display),('product-fragrances.json',assignments),('image-manifest.json',media),('catalogue-order.json',order),('catalogue-layouts.json',layouts),('halloween-source-manifest.json',manifest)]:write(name,data)
 catalog=ROOT/'catalog.js';text=catalog.read_text();block='const halloweenProducts = '+json.dumps(products,ensure_ascii=False,indent=2)+';';text=re.sub(r'\nconst halloweenProducts = \[.*?\n\];\n','\n',text,flags=re.S);text=text.replace('\nconst sachetsProducts =', '\n'+block+'\n\nconst sachetsProducts =');catalog.write_text(text)
 base=(ROOT/'christmas-collection.html').read_text();main='''<main><section class="section halloween-intro"><p class="eyebrow">THE LANARVE HALLOWEEN COLLECTION</p><h1>Halloween candles,<br>with a little magic.</h1><p>Friendly ghosts, smiling pumpkins, playful bats and enchanted details—made for charming autumn displays and memorable seasonal gifting.</p><a class="button dark" href="#halloween-products">Meet the collection <span aria-hidden="true">↗</span></a></section><div class="halloween-mood-strip" aria-label="Halloween collection moods"><span>MIDNIGHT &amp; PUMPKIN</span><span>FRIENDLY GHOSTS</span><span>ENCHANTED CERAMICS</span><span>PASTEL SPELLS</span></div><section id="halloween-products" class="section catalogue-page"><div id="catalogue-grid" class="crystal-gallery"></div><p id="catalogue-count" class="gallery-count" aria-live="polite"></p><nav id="pagination" class="pagination" aria-label="Halloween collection pages"></nav></section></main>'''
 base=re.sub(r'<body[^>]*>','<body data-category="halloween" data-page="1" data-catalogue-pages="3" data-arranged-catalogue="true">',base);base=re.sub(r'<main\b[^>]*>.*?</main>',main,base,flags=re.S);base=re.sub(r'<title>.*?</title>','<title>Halloween Candles — Lanarve</title>',base);(ROOT/'halloween-collection.html').write_text(base)
 for script in ['build-arranged-catalogues.py','build-fragrance-library.py','build-fragrance-collections.py','build-product-pages.py','update-navigation.py']:runpy.run_path(str(ROOT/'scripts'/script),run_name='__main__')
 print('Imported 35 Halloween candle designs with 70 reviewed photographs.')

if __name__=='__main__':main()
