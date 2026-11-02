"""Import ten reviewed Halloween candle/packaging pairs and apply tone-led merchandising."""
from pathlib import Path
from contextlib import ExitStack
from io import BytesIO
import hashlib,json,re,runpy,sys,zipfile
from PIL import Image,ImageOps
from product_records import item_no

ROOT=Path(__file__).resolve().parents[1]
DESIGNS=[
 ('Mummy Goose',((1,2),(1,1)),'orange-clove','ivory','Ivory Ghost Stories','A mummy-costumed little goose stands in an orange gothic window with tiny bats.'),
 ('Book of Spells Ghost',((3,1),(2,1)),'vanilla-tonka','ivory','Ivory Ghost Stories','A friendly dimensional ghost reads from a little book of spells.'),
 ('Ghost Reading Club',((2,2),(2,3)),'black-tea-cedarwood','ivory','Ivory Ghost Stories','Three book-loving ghosts form a quiet, illustrated Halloween reading club.'),
 ('Wise Little Ghost',((2,4),(2,5)),'amber-vanilla','ivory','Ivory Ghost Stories','A bespectacled ghost in a warm knit hat reads by autumn light.'),
 ('Purple Witch Ghost',((2,6),(2,7)),'lavender-cedarwood','lavender','Purple Moonlight','A smiling ghost in a purple witch hat carries a glowing jack-o’-lantern.'),
 ('Pumpkin & Black Cat',((2,8),(2,9)),'mugwort-incense','ivory','Ivory Ghost Stories','A tiny ghost, heirloom pumpkin and black cat create an understated autumn vignette.'),
 ('Pumpkin Cottage Night',((3,2),(3,3)),'pumpkin-spice','blue','Midnight Navy & Charcoal','A glowing pumpkin cottage, little witch and ghost sit beneath a deep navy moonlit sky.'),
 ('Moonlit Witch Ghost',((3,4),(3,5)),'fireside-smoked-woods','blue','Midnight Navy & Charcoal','A friendly witch ghost carries a pumpkin through a richly painted blue forest night.'),
 ('Purple Ghost Forest',((3,7),(3,6)),'lavender-cedarwood','lavender','Purple Moonlight','White ghosts drift through a violet woodland filled with pumpkins and moonlight.'),
 ('Deep Teal Ghost Night',((3,9),(3,8)),'pine-cedarwood','sage','Midnight Navy & Charcoal','A cheerful ghost glows among pumpkins in a dark teal enchanted forest.'),
]
def read(name):return json.loads((ROOT/'assets'/name).read_text())
def write(name,data):(ROOT/'assets'/name).write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')

def main():
 if len(sys.argv)!=4:raise SystemExit('Pass the goose archive, 打包7.zip and 打包8.zip')
 products=read('halloween-products.json');scents=read('fragrances.json');display=read('product-display.json');assignments=read('product-fragrances.json');media=read('image-manifest.json');sources=[];added=[]
 old={p['image'] for p in products if p.get('id','').startswith('halloween-elegant-night-')};products=[p for p in products if p['image'] not in old]
 for profile in scents:profile['matches']=[m for m in profile['matches'] if not(m['category']=='halloween' and m['image'] in old)]
 folder=ROOT/'assets/halloween/elegant-night';folder.mkdir(parents=True,exist_ok=True)
 with ExitStack() as stack:
  archives=[stack.enter_context(zipfile.ZipFile(arg)) for arg in sys.argv[1:]];members=[]
  for archive in archives:members.append([(archive,n) for n in archive.namelist() if n.lower().endswith(('.png','.jpg','.jpeg','.webp')) and not n.startswith('__MACOSX/')])
  used=[ref for row in DESIGNS for ref in row[1]];assert len(used)==len(set(used))==sum(map(len,members))==20
  def image(ref):
   archive,member=members[ref[0]-1][ref[1]-1];data=archive.read(member);digest=hashlib.sha256(data).hexdigest();im=ImageOps.exif_transpose(Image.open(BytesIO(data))).convert('RGB');im.thumbnail((1400,1400));dest=folder/(digest[:20]+'.webp');im.save(dest,'WEBP',quality=90,method=6);src=dest.relative_to(ROOT).as_posix();w,h=im.size
   entry={'width':w,'height':h,'sourceBytes':dest.stat().st_size,'src':src,'variants':[]}
   for width in sorted({min(w,480),min(w,960),w}):
    variant=dest if width==w else folder/(digest[:20]+f'-{width}.webp')
    if width!=w:
     small=im.copy();small.thumbnail((width,round(h*width/w)),Image.Resampling.LANCZOS);small.save(variant,'WEBP',quality=88,method=4)
    entry['variants'].append({'src':variant.relative_to(ROOT).as_posix(),'width':width,'bytes':variant.stat().st_size})
   media[src]=entry;sources.append({'archive':Path(sys.argv[ref[0]]).name,'source':Path(member).name,'sha256':digest,'image':src,'width':w,'height':h});return src
  scent_ids={p['id'] for p in scents}
  for name,refs,scent,palette,series,description in DESIGNS:
   assert scent in scent_ids;images=[image(ref) for ref in refs];src,pack=images
   product={'id':'halloween-elegant-night-'+Path(src).stem,'name':name,'series':series,'productType':'Scented candle','image':src,'packagingImage':pack,'images':[src,pack],'assignedScent':scent,'designDescription':description+' Suggested Halloween fragrance pairing; final formulation and availability are confirmed with your sample.'}
   products.append(product);added.append(product);display[src]={'palette':palette};assignments[item_no('halloween',src)]={'scent':scent,'basis':'Suggested pairing based on the reviewed Halloween design, colour and seasonal atmosphere'};next(p for p in scents if p['id']==scent)['matches'].append({'category':'halloween','image':src,'name':name,'series':series})
 for name,data in [('halloween-products.json',products),('fragrances.json',scents),('product-display.json',display),('product-fragrances.json',assignments),('image-manifest.json',media),('halloween-elegant-night-source-manifest.json',{'sourceArchives':[Path(x).name for x in sys.argv[1:]],'productCount':len(added),'imageCount':len(sources),'products':added,'images':sources,'placement':'Midnight navy and charcoal, purple moonlight, pumpkin and amber, ivory ghost stories, then pastel magic.'})]:write(name,data)
 runpy.run_path(str(ROOT/'scripts/reorder-halloween-tones.py'),run_name='__main__');products=read('halloween-products.json');catalog=ROOT/'catalog.js';text=catalog.read_text();text=re.sub(r'const halloweenProducts = \[.*?\n\];',lambda m:'const halloweenProducts = '+json.dumps(products,ensure_ascii=False,indent=2)+';',text,count=1,flags=re.S);catalog.write_text(text);print(f'Imported {len(added)} Halloween products from {len(sources)} reviewed images.')
if __name__=='__main__':main()
