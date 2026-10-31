"""Import 19 reviewed Christmas candle/packaging sets from four owner archives."""
from pathlib import Path
from contextlib import ExitStack
from io import BytesIO
import hashlib,json,re,runpy,sys,zipfile
from PIL import Image,ImageOps
from product_records import item_no

ROOT=Path(__file__).resolve().parents[1]
# name, image refs (product, packaging, optional corrected view), scent, palette, series
DESIGNS=[
 ('Ice Blue Silver Tree',((2,6),(1,1),(3,14)),'white-tea-bergamot','blue','Winter Blue Christmas'),
 ('North Pole Workshop Sign',((1,3),(1,2)),'apple-cinnamon','ivory','Classic Christmas Cheer'),
 ('North Pole Village Sign',((1,5),(1,4),(4,1)),'orange-clove','ivory','Classic Christmas Cheer'),
 ('Christmas Gift Tower',((1,6),(2,4)),'vanilla-tonka','ivory','Pastel Christmas Magic'),
 ('Minimal Christmas Eve Tree',((1,8),(3,2)),'fir-cedarwood','ivory','Golden Christmas Eve'),
 ('Pink Ribbon Wish',((1,9),(4,2)),'rose-green-leaves','blush','Pastel Christmas Magic'),
 ('Red Stripe Christmas Fir',((1,10),(3,5)),'fir-cedarwood','burgundy','Classic Christmas Cheer'),
 ('Holly Jolly Christmas',((4,3),(2,1)),'fir-cedarwood','sage','Classic Christmas Cheer'),
 ('Christmas Wishes Bows',((3,9),(2,2)),'rose-green-leaves','blush','Pastel Christmas Magic'),
 ('HO HO HO',((3,3),(2,3)),'orange-clove','ivory','Classic Christmas Cheer'),
 ('Pink Gingham Merry Wishes',((2,7),(2,8)),'vanilla-tonka','blush','Pastel Christmas Magic'),
 ('Vintage Santa Christmas',((2,9),(3,1)),'orange-clove','burgundy','Classic Christmas Cheer'),
 ('Christmas Icon Story',((3,12),(2,10)),'gingerbread-vanilla','ivory','Classic Christmas Cheer'),
 ('Pearl Candy Canes',((4,7),(3,6)),'eucalyptus-mint','blush','Pastel Christmas Magic'),
 ('Green Checkerboard Tree',((3,7),(4,6)),'fir-cedarwood','sage','Classic Christmas Cheer'),
 ('Be Merry & Bright',((4,8),(3,8)),'pine-cedarwood','sage','Classic Christmas Cheer'),
 ('Christmas Peace',((4,4),(3,10)),'incense-myrrh','ivory','Classic Christmas Cheer'),
 ('Christmas Story Signpost',((4,5),(3,11)),'apple-cinnamon','ivory','Classic Christmas Cheer'),
 ('Ivory Hand-Drawn Tree',((3,4),(3,13)),'fir-cedarwood','ivory','Classic Christmas Cheer'),
]

def read(name):return json.loads((ROOT/'assets'/name).read_text())
def write(name,data):(ROOT/'assets'/name).write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')

def main():
 if len(sys.argv)!=5:raise SystemExit('Pass four archives in order: 打包1, 打包2, 打包3, 打包4')
 products=read('christmas-products.json');scents=read('fragrances.json');display=read('product-display.json');assignments=read('product-fragrances.json');media=read('image-manifest.json');sources=[];added=[]
 old={p['image'] for p in products if p.get('id','').startswith('christmas-atmosphere-round2-')};products=[p for p in products if p['image'] not in old]
 for profile in scents:profile['matches']=[m for m in profile['matches'] if not(m['category']=='christmas' and m['image'] in old)]
 folder=ROOT/'assets/christmas/atmosphere-round2';folder.mkdir(parents=True,exist_ok=True)
 with ExitStack() as stack:
  archives=[stack.enter_context(zipfile.ZipFile(arg)) for arg in sys.argv[1:]];members=[]
  for archive in archives:members.append([(archive,n) for n in archive.namelist() if n.lower().endswith(('.png','.jpg','.jpeg','.webp')) and not n.startswith('__MACOSX/')])
  used=[ref for row in DESIGNS for ref in row[1]];assert len(used)==len(set(used))==40
  omitted={(1,7),(2,5)};assert set(used)|omitted=={(a+1,i+1) for a,items in enumerate(members) for i in range(len(items))}
  def image(ref):
   archive,member=members[ref[0]-1][ref[1]-1];data=archive.read(member);digest=hashlib.sha256(data).hexdigest();im=ImageOps.exif_transpose(Image.open(BytesIO(data))).convert('RGB');im.thumbnail((1400,1400));dest=folder/(digest[:20]+'.webp');im.save(dest,'WEBP',quality=90,method=6);src=dest.relative_to(ROOT).as_posix();w,h=im.size
   entry={'width':w,'height':h,'sourceBytes':dest.stat().st_size,'src':src,'variants':[]}
   for width in sorted({min(w,480),min(w,960),w}):
    variant=dest if width==w else folder/(digest[:20]+f'-{width}.webp')
    if width!=w:
     small=im.copy();small.thumbnail((width,round(h*width/w)),Image.Resampling.LANCZOS);small.save(variant,'WEBP',quality=88,method=4)
    entry['variants'].append({'src':variant.relative_to(ROOT).as_posix(),'width':width,'bytes':variant.stat().st_size})
   media[src]=entry;sources.append({'archive':Path(sys.argv[ref[0]]).name,'source':Path(member).name,'sha256':digest,'image':src,'width':w,'height':h});return src
  atmosphere={'Classic Christmas Cheer':'classic red, green and ivory Christmas storytelling','Pastel Christmas Magic':'playful pink and pastel holiday colour','Winter Blue Christmas':'cool blue winter light','Golden Christmas Eve':'quiet ivory and gold celebration'}
  scent_ids={x['id'] for x in scents}
  for name,refs,scent,palette,series in DESIGNS:
   assert scent in scent_ids
   images=[image(ref) for ref in refs];src,pack=images[:2];description=f'{name} brings {atmosphere[series]} to a coordinated candle and gift-box presentation. Suggested festive fragrance pairing; final formulation and availability are confirmed with your sample.'
   product={'id':'christmas-atmosphere-round2-'+Path(src).stem,'name':name,'series':series,'productType':'Scented candle','image':src,'packagingImage':pack,'images':[src,pack],'assignedScent':scent,'designDescription':description}
   products.append(product);added.append(product);display[src]={'palette':palette};assignments[item_no('christmas',src)]={'scent':scent,'basis':'Suggested pairing based on the reviewed Christmas design and seasonal atmosphere'};next(p for p in scents if p['id']==scent)['matches'].append({'category':'christmas','image':src,'name':name,'series':series})
 assert len({x['sha256'] for x in sources})==40
 for name,data in [('christmas-products.json',products),('fragrances.json',scents),('product-display.json',display),('product-fragrances.json',assignments),('image-manifest.json',media),('christmas-atmosphere-round2-source-manifest.json',{'sourceArchives':[Path(x).name for x in sys.argv[1:]],'productCount':len(added),'uniqueImageCount':len(sources),'exactDuplicatesOmitted':2,'products':added,'images':sources,'placement':'Classic Christmas, pastel celebration, winter blue and ivory-gold atmosphere groups; sand art and ornaments remain last.'})]:write(name,data)
 catalog=ROOT/'catalog.js';text=catalog.read_text();text=re.sub(r'const christmasProducts = \[.*?\n\];',lambda m:'const christmasProducts = '+json.dumps(products,ensure_ascii=False,indent=2)+';',text,count=1,flags=re.S);catalog.write_text(text)
 runpy.run_path(str(ROOT/'scripts/reorder-christmas-colours.py'),run_name='__main__');print(f'Imported {len(added)} Christmas products from {len(sources)} unique reviewed images.')
if __name__=='__main__':main()
