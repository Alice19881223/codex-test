"""Import seven reviewed Halloween reed diffuser and packaging pairs."""
from pathlib import Path
from contextlib import ExitStack
from io import BytesIO
import hashlib,json,re,runpy,sys,zipfile
from PIL import Image,ImageOps
from product_records import item_no

ROOT=Path(__file__).resolve().parents[1]
DESIGNS=[
 ('Berry Bat Diffuser',((2,2),(1,1)),'pomegranate-amber','burgundy','Purple Moonlight','A jewel-toned berry diffuser with black bats and tiny gold stars.'),
 ('Pink Haunted House Diffuser',((1,2),(2,8)),'rose-green-leaves','blush','Pastel Magic','A pale pink haunted house with a tiny bat and warm gold details.'),
 ('Lavender Castle Diffuser',((1,3),(2,5)),'lavender-cedarwood','lavender','Purple Moonlight','A softly glowing lavender castle, ghost and bats create a refined moonlit scene.'),
 ('Reading Ghost Diffuser',((2,9),(1,4)),'black-tea-cedarwood','ivory','Ivory Ghost Stories','A bespectacled reading ghost brings a quiet storybook note to warm ivory glass.'),
 ('Sage Witch Diffuser',((2,6),(1,5)),'green-tea-cedarwood','sage','Midnight Navy & Charcoal','A faceted sage vessel and tiny witch motif give Halloween a calm botanical mood.'),
 ('Pumpkin Bat Diffuser',((2,1),(2,4)),'pumpkin-spice','amber','Pumpkin & Amber','A jack-o’-lantern in a witch hat spreads black bat wings across vivid pumpkin orange.'),
 ('Pastel Spooky Bat Diffuser',((2,7),(2,3)),'blackcurrant-rose','blush','Pastel Magic','Pastel SPOOKY lettering and a winged bat turn Halloween bright and playful.'),
]
def read(name):return json.loads((ROOT/'assets'/name).read_text())
def write(name,data):(ROOT/'assets'/name).write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')

def main():
 if len(sys.argv)!=3:raise SystemExit('Pass 打包1.zip and 万圣节香薰.zip')
 products=read('halloween-products.json');scents=read('fragrances.json');display=read('product-display.json');assignments=read('product-fragrances.json');media=read('image-manifest.json');sources=[];added=[]
 old={p['image'] for p in products if p.get('id','').startswith('halloween-reed-2026-')};products=[p for p in products if p['image'] not in old]
 for profile in scents:profile['matches']=[m for m in profile['matches'] if not(m['category']=='halloween' and m['image'] in old)]
 folder=ROOT/'assets/halloween/reed-diffusers';folder.mkdir(parents=True,exist_ok=True)
 with ExitStack() as stack:
  archives=[stack.enter_context(zipfile.ZipFile(arg)) for arg in sys.argv[1:]];members=[]
  for archive in archives:members.append([(archive,n) for n in archive.namelist() if n.lower().endswith(('.png','.jpg','.jpeg','.webp')) and not n.startswith('__MACOSX/')])
  used=[ref for row in DESIGNS for ref in row[1]];assert len(used)==len(set(used))==sum(map(len,members))==14
  def image(ref):
   archive,member=members[ref[0]-1][ref[1]-1];data=archive.read(member);digest=hashlib.sha256(data).hexdigest();im=ImageOps.exif_transpose(Image.open(BytesIO(data))).convert('RGB');im.thumbnail((1400,1400));dest=folder/(digest[:20]+'.webp');im.save(dest,'WEBP',quality=90,method=6);src=dest.relative_to(ROOT).as_posix();w,h=im.size
   entry={'width':w,'height':h,'sourceBytes':dest.stat().st_size,'src':src,'variants':[]}
   for width in sorted({min(w,480),min(w,960),w}):
    variant=dest if width==w else folder/(digest[:20]+f'-{width}.webp')
    if width!=w:
     small=im.copy();small.thumbnail((width,round(h*width/w)),Image.Resampling.LANCZOS);small.save(variant,'WEBP',quality=88,method=4)
    entry['variants'].append({'src':variant.relative_to(ROOT).as_posix(),'width':width,'bytes':variant.stat().st_size})
   media[src]=entry;sources.append({'archive':Path(sys.argv[ref[0]]).name,'source':Path(member).name,'sha256':digest,'image':src,'width':w,'height':h});return src
  for name,refs,scent,palette,series,description in DESIGNS:
   images=[image(ref) for ref in refs];src,pack=images;product={'id':'halloween-reed-2026-'+Path(src).stem,'name':name,'series':series,'productType':'Reed diffuser','image':src,'packagingImage':pack,'images':[src,pack],'assignedScent':scent,'designDescription':description+' Suggested Halloween fragrance pairing; final formulation and availability are confirmed with your sample.'}
   products.append(product);added.append(product);display[src]={'palette':palette};assignments[item_no('halloween',src)]={'scent':scent,'basis':'Suggested pairing based on the reviewed Halloween packaging, colour and seasonal atmosphere'};next(p for p in scents if p['id']==scent)['matches'].append({'category':'halloween','image':src,'name':name,'series':series})
 for name,data in [('halloween-products.json',products),('fragrances.json',scents),('product-display.json',display),('product-fragrances.json',assignments),('image-manifest.json',media),('halloween-reed-diffusers-source-manifest.json',{'sourceArchives':[Path(x).name for x in sys.argv[1:]],'productCount':len(added),'imageCount':len(sources),'products':added,'images':sources,'placement':'Integrated into the existing premium tone groups by vessel and packaging colour.'})]:write(name,data)
 runpy.run_path(str(ROOT/'scripts/reorder-halloween-tones.py'),run_name='__main__');products=read('halloween-products.json');catalog=ROOT/'catalog.js';text=catalog.read_text();text=re.sub(r'const halloweenProducts = \[.*?\n\];',lambda m:'const halloweenProducts = '+json.dumps(products,ensure_ascii=False,indent=2)+';',text,count=1,flags=re.S);catalog.write_text(text);print('Imported seven Halloween reed diffusers with fourteen reviewed images.')
if __name__=='__main__':main()
