"""Import three Christmas storybook candle pairs immediately before sand art."""
from pathlib import Path
from io import BytesIO
import hashlib,json,re,runpy,sys,zipfile
from PIL import Image,ImageOps
from product_records import item_no

ROOT=Path(__file__).resolve().parents[1]
DESIGNS=[
 ('Santa’s Christmas Story',1,2,'orange-clove','sage','Santa sits among a Christmas tree and gifts inside a ribbon-trimmed storybook frame.'),
 ('Gift-Bearing Reindeer',3,4,'fir-cedarwood','ivory','A softly illustrated reindeer carries a red saddle filled with wrapped Christmas gifts.'),
 ('Gingerbread Baker',5,6,'gingerbread-vanilla','ivory','A cheerful gingerbread baker in a tall chef’s hat brings a warm festive-kitchen character.'),
]
def read(name):return json.loads((ROOT/'assets'/name).read_text())
def write(name,data):(ROOT/'assets'/name).write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')

def main():
 if len(sys.argv)!=2:raise SystemExit('Pass 圣诞.zip')
 products=read('christmas-products.json');scents=read('fragrances.json');display=read('product-display.json');assignments=read('product-fragrances.json');media=read('image-manifest.json');sources=[];added=[]
 old={p['image'] for p in products if p.get('id','').startswith('christmas-storybook-finale-')};products=[p for p in products if p['image'] not in old]
 for profile in scents:profile['matches']=[m for m in profile['matches'] if not(m['category']=='christmas' and m['image'] in old)]
 folder=ROOT/'assets/christmas/storybook-finale';folder.mkdir(parents=True,exist_ok=True)
 with zipfile.ZipFile(sys.argv[1]) as archive:
  members=[n for n in archive.namelist() if n.lower().endswith(('.png','.jpg','.jpeg','.webp')) and not n.startswith('__MACOSX/')];assert len(members)==6
  def image(index):
   member=members[index-1];data=archive.read(member);digest=hashlib.sha256(data).hexdigest();im=ImageOps.exif_transpose(Image.open(BytesIO(data))).convert('RGB');im.thumbnail((1400,1400));dest=folder/(digest[:20]+'.webp');im.save(dest,'WEBP',quality=90,method=6);src=dest.relative_to(ROOT).as_posix();w,h=im.size
   entry={'width':w,'height':h,'sourceBytes':dest.stat().st_size,'src':src,'variants':[]}
   for width in sorted({min(w,480),min(w,960),w}):
    variant=dest if width==w else folder/(digest[:20]+f'-{width}.webp')
    if width!=w:
     small=im.copy();small.thumbnail((width,round(h*width/w)),Image.Resampling.LANCZOS);small.save(variant,'WEBP',quality=88,method=4)
    entry['variants'].append({'src':variant.relative_to(ROOT).as_posix(),'width':width,'bytes':variant.stat().st_size})
   media[src]=entry;sources.append({'archive':Path(sys.argv[1]).name,'source':Path(member).name,'sha256':digest,'image':src,'width':w,'height':h});return src
  for name,single,box,scent,palette,description in DESIGNS:
   src=image(single);pack=image(box);product={'id':'christmas-storybook-finale-'+Path(src).stem,'name':name,'series':'Christmas Storybook Finale','productType':'Scented candle','image':src,'packagingImage':pack,'images':[src,pack],'assignedScent':scent,'designDescription':description+' Suggested festive fragrance pairing; final formulation and availability are confirmed with your sample.'}
   products.append(product);added.append(product);display[src]={'palette':palette};assignments[item_no('christmas',src)]={'scent':scent,'basis':'Suggested pairing based on the reviewed Christmas design and seasonal atmosphere'};next(p for p in scents if p['id']==scent)['matches'].append({'category':'christmas','image':src,'name':name,'series':product['series']})
 for name,data in [('christmas-products.json',products),('fragrances.json',scents),('product-display.json',display),('product-fragrances.json',assignments),('image-manifest.json',media),('christmas-storybook-finale-source-manifest.json',{'sourceArchive':Path(sys.argv[1]).name,'productCount':len(added),'imageCount':len(sources),'products':added,'images':sources,'placement':'After all other Christmas candles and immediately before Christmas sand art.'})]:write(name,data)
 runpy.run_path(str(ROOT/'scripts/reorder-christmas-colours.py'),run_name='__main__');products=read('christmas-products.json');catalog=ROOT/'catalog.js';text=catalog.read_text();text=re.sub(r'const christmasProducts = \[.*?\n\];',lambda m:'const christmasProducts = '+json.dumps(products,ensure_ascii=False,indent=2)+';',text,count=1,flags=re.S);catalog.write_text(text);print('Imported three Christmas storybook designs immediately before sand art.')
if __name__=='__main__':main()
