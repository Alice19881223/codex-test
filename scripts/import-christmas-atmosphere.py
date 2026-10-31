"""Import 45 reviewed Christmas candle/packaging sets from six owner archives."""
from pathlib import Path
from contextlib import ExitStack
from io import BytesIO
import hashlib,json,re,runpy,sys,zipfile
from PIL import Image,ImageOps
from product_records import item_no

ROOT=Path(__file__).resolve().parents[1]
# name, (archive number, image number), scent, palette, series
DESIGNS=[
 ('Disco Ball Holiday',((4,14),(3,14),(3,2),(1,1)),'amber-vanilla','blush','Pastel Christmas Magic'),
 ('Candy Stripe Tree',((1,2),(1,3)),'fir-cedarwood','sage','Classic Christmas Cheer'),
 ('Golden Snowflake',((3,1),(1,4)),'white-tea-bergamot','gold','Golden Christmas Eve'),
 ('Christmas Cheer Snowman',((1,9),(3,8)),'orange-clove','ivory','Classic Christmas Cheer'),
 ('Christmas Tree & Gingerbread',((5,10),(1,5)),'gingerbread-vanilla','ivory','Classic Christmas Cheer'),
 ('Ivory Winter Village',((2,2),(1,6)),'pine-cedarwood','ivory','Classic Christmas Cheer'),
 ('Santa Merry & Bright',((1,7),(3,15)),'orange-clove','blush','Pastel Christmas Magic'),
 ('Golden Starlight Tree',((5,11),(1,8)),'fir-cedarwood','gold','Golden Christmas Eve'),
 ('Merry XMAS Market',((1,10),(3,9)),'gingerbread-vanilla','charcoal','Classic Christmas Cheer'),
 ('Blue Merry & Bright',((1,12),(1,11)),'white-tea-bergamot','blue','Winter Blue Christmas'),
 ('Ice Blue Tree',((1,13),(2,5)),'pine-cedarwood','blue','Winter Blue Christmas'),
 ('Crimson Tree',((1,14),(2,17)),'fir-cedarwood','burgundy','Classic Christmas Cheer'),
 ('Pink Christmas Forest',((1,15),(2,14)),'fir-cedarwood','blush','Pastel Christmas Magic'),
 ('Evergreen Village',((3,16),(1,16)),'pine-cedarwood','sage','Classic Christmas Cheer'),
 ('Ribbon Evergreen',((5,7),(1,17)),'fir-cedarwood','ivory','Classic Christmas Cheer'),
 ('Snowman Ho Ho Ho',((3,10),(2,1)),'orange-clove','sage','Classic Christmas Cheer'),
 ('Evergreen Tag Tree',((2,3),(2,16)),'fir-cedarwood','sage','Classic Christmas Cheer'),
 ('Golden Santa',((2,4),(3,17)),'amber-vanilla','gold','Golden Christmas Eve'),
 ('Christmas Countdown',((5,3),(2,6)),'gingerbread-vanilla','ivory','Classic Christmas Cheer'),
 ('Nutcracker Merry Christmas',((6,4),(2,7)),'vanilla-tonka','ivory','Classic Christmas Cheer'),
 ('Festive HO!',((4,1),(2,8)),'orange-clove','ivory','Classic Christmas Cheer'),
 ('Pink Checkerboard Tree',((3,7),(2,9)),'fir-cedarwood','blush','Pastel Christmas Magic'),
 ('Gingerbread Noel',((2,11),(2,10)),'gingerbread-vanilla','burgundy','Classic Christmas Cheer'),
 ('Golden Forest Reindeer',((4,2),(2,12)),'sandalwood-cashmere','gold','Golden Christmas Eve'),
 ('Letters to Santa North Pole',((2,13),(3,6)),'apple-cinnamon','burgundy','Classic Christmas Cheer'),
 ('Ivory Tree Tag',((2,15),(4,8)),'fir-cedarwood','ivory','Golden Christmas Eve'),
 ('Pink Christmas Ballet',((4,10),(3,3)),'sandalwood-cashmere','blush','Pastel Christmas Magic'),
 ('Pink Ribbon Wreath',((6,14),(6,11),(3,4)),'rose-green-leaves','blush','Pastel Christmas Magic'),
 ('Golden Christmas Ballet',((3,5),(5,13)),'sandalwood-cashmere','gold','Golden Christmas Eve'),
 ('North Pole Post',((3,11),(3,13)),'apple-cinnamon','ivory','Classic Christmas Cheer'),
 ('Snow Globe Gingerbread',((5,9),(3,12)),'gingerbread-vanilla','sage','Pastel Christmas Magic'),
 ('Pastel Christmas Train',((4,3),(6,10)),'vanilla-tonka','blush','Pastel Christmas Magic'),
 ('Christmas Icon Parade',((4,4),(4,6)),'orange-clove','ivory','Classic Christmas Cheer'),
 ('Christmas Wishes Gift',((6,8),(4,5)),'vanilla-tonka','blush','Pastel Christmas Magic'),
 ('Candy Garden',((4,9),(5,2)),'gingerbread-vanilla','ivory','Classic Christmas Cheer'),
 ('Vintage Ribbon Tree',((6,3),(4,7)),'fir-cedarwood','ivory','Classic Christmas Cheer'),
 ('Ivory Three Trees',((4,12),(4,13)),'fir-cedarwood','ivory','Golden Christmas Eve'),
 ('Magic Holiday',((5,5),(5,4)),'grapefruit-bergamot','blush','Pastel Christmas Magic'),
 ('Bright Three Trees',((5,6),(5,1)),'fir-cedarwood','blush','Pastel Christmas Magic'),
 ('Silent Night Strings',((5,14),(5,12)),'incense-myrrh','ivory','Golden Christmas Eve'),
 ('Ice Blue Snowman',((6,2),(6,1)),'white-tea-bergamot','blue','Winter Blue Christmas'),
 ('Sweet Gingerbread Wishes',((6,6),(6,9)),'gingerbread-vanilla','blush','Pastel Christmas Magic'),
 ('Christmas Cocoa',((6,7),(5,8)),'caramel-cream','blue','Pastel Christmas Magic'),
 ('Joy to the World Ballet',((6,5),(4,11)),'sandalwood-cashmere','ivory','Golden Christmas Eve'),
 ('Christmas Mittens',((6,13),(6,12)),'vanilla-tonka','blush','Pastel Christmas Magic'),
]

def read(name):return json.loads((ROOT/'assets'/name).read_text())
def write(name,data):(ROOT/'assets'/name).write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')

def main():
 if len(sys.argv)!=7:raise SystemExit('Pass six archives in order: 打包3, 打包2, 打包1, 打包5, 打包4, 打包6')
 products=read('christmas-products.json');scents=read('fragrances.json');display=read('product-display.json');assignments=read('product-fragrances.json');media=read('image-manifest.json');sources=[];added=[]
 old={p['image'] for p in products if p.get('id','').startswith('christmas-atmosphere-2026-')};products=[p for p in products if p['image'] not in old]
 for profile in scents:profile['matches']=[m for m in profile['matches'] if not(m['category']=='christmas' and m['image'] in old)]
 folder=ROOT/'assets/christmas/atmosphere-2026';folder.mkdir(parents=True,exist_ok=True)
 with ExitStack() as stack:
  archives=[stack.enter_context(zipfile.ZipFile(arg)) for arg in sys.argv[1:]]
  members=[]
  for archive in archives:
   members.append([(archive,n) for n in archive.namelist() if n.lower().endswith(('.png','.jpg','.jpeg')) and not n.startswith('__MACOSX/')])
  used=[ref for row in DESIGNS for ref in row[1]];assert len(used)==len(set(used))==sum(map(len,members))==93
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
  for name,refs,scent,palette,series in DESIGNS:
   images=[image(ref) for ref in refs];src,pack=images[:2]
   description=f'{name} brings {atmosphere[series]} to a coordinated candle and gift-box presentation. Suggested festive fragrance pairing; final formulation and availability are confirmed with your sample.'
   product={'id':'christmas-atmosphere-2026-'+Path(src).stem,'name':name,'series':series,'productType':'Scented candle','image':src,'packagingImage':pack,'images':[src,pack],'assignedScent':scent,'designDescription':description}
   products.append(product);added.append(product);display[src]={'palette':palette};assignments[item_no('christmas',src)]={'scent':scent,'basis':'Suggested pairing based on the reviewed Christmas design and seasonal atmosphere'};next(p for p in scents if p['id']==scent)['matches'].append({'category':'christmas','image':src,'name':name,'series':series})
 for name,data in [('christmas-products.json',products),('fragrances.json',scents),('product-display.json',display),('product-fragrances.json',assignments),('image-manifest.json',media),('christmas-atmosphere-2026-source-manifest.json',{'sourceArchives':[Path(x).name for x in sys.argv[1:]],'productCount':len(added),'imageCount':len(sources),'products':added,'images':sources,'placement':'Classic red, green and ivory; pastel celebration; winter blue; ivory and gold; existing sand art and ornaments last.'})]:write(name,data)
 catalog=ROOT/'catalog.js';text=catalog.read_text();text=re.sub(r'const christmasProducts = \[.*?\n\];',lambda m:'const christmasProducts = '+json.dumps(products,ensure_ascii=False,indent=2)+';',text,count=1,flags=re.S);catalog.write_text(text)
 runpy.run_path(str(ROOT/'scripts/reorder-christmas-colours.py'),run_name='__main__')
 print(f'Imported {len(added)} Christmas products from {len(sources)} reviewed images.')
if __name__=='__main__':main()
