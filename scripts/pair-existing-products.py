"""Apply visually reviewed companion photos to existing crystal/reed catalogue entries."""
from pathlib import Path
from PIL import Image,ImageOps
import json,re,html
ROOT=Path(__file__).resolve().parents[1]
sources=json.loads(Path('/workspace/companion-import/sources.json').read_text());lookup={r['index']:r for r in sources}
crystal={0:10,1:6,2:2,3:12,4:3,5:11,6:1,7:7,8:9,9:8,10:0,11:5,12:4}
reed_packaging={13:49,14:48,15:46,16:47,17:45,18:50,19:53,20:51,21:52,22:54,23:55,24:56}
reed_single={25:65,26:68,27:66,28:67,29:58,30:59,31:62,32:61,33:60,34:64,35:63,36:24,37:30,38:28,39:34,40:20,41:33,42:32,43:21,44:18,45:26,46:19,47:17,48:22}
folder=ROOT/'assets/companions';folder.mkdir(exist_ok=True);manifest=[]
for category,mapping,newview in [('crystal',crystal,'single'),('reed',reed_packaging,'packaging'),('reed',reed_single,'single')]:
 p=ROOT/f'assets/{category}-products.json';products=json.loads(p.read_text())
 for src,idx in mapping.items():
  record=lookup[src];dest=folder/(record['sha256'][:20]+'.webp')
  if not dest.exists():
   im=ImageOps.exif_transpose(Image.open(record['path']));im.thumbnail((1400,1400));im.convert('RGB').save(dest,'WEBP',quality=88,method=6)
  photo=str(dest.relative_to(ROOT));item=products[idx];original=item.get('packagingImage',item['image']) if newview=='single' else item['image']
  if newview=='single':item['image']=photo;item['packagingImage']=original
  else:item['packagingImage']=photo
  item['images']=[item['image'],item['packagingImage']]
  manifest.append({'category':category,'productIndex':idx,'productName':item['name'],'newView':newview,'source':record['name'],'sha256':record['sha256'],'image':photo,'single':item['image'],'packaging':item['packagingImage']})
 p.write_text(json.dumps(products,ensure_ascii=False,indent=2))
(ROOT/'assets/companion-pairing-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2))
# Keep the existing catalogue ordering; add the second view without adding a product.
def esc(x):return html.escape(x,quote=True)
def card(p,index):
 name=esc(p['name']);paired=bool(p.get('packagingImage'))
 imgs=f'<img class="photo-single" src="{p["image"]}" alt="Lanarve {name} — product" loading="lazy">'
 if paired:imgs+=f'<img class="photo-packaging" src="{p["packagingImage"]}" alt="Lanarve {name} — product with packaging" loading="lazy">'
 visual=f'<span class="paired-photo">{imgs}</span>' if paired else imgs
 link=f'<a class="crystal-item" data-photo="{index}" href="{p["image"]}" aria-label="View {name}">{visual}<span class="eyebrow">{esc(p["series"])}</span><h3>{name}</h3><span class="product-link">VIEW PRODUCT <span>↗</span></span></a>'
 return f'<div class="paired-product">{link}<button type="button" class="photo-toggle" aria-pressed="false" aria-label="Show packaging for {name}">View packaging</button></div>' if paired else link
for category in ['reed','crystal']:
 products=json.loads((ROOT/f'assets/{category}-products.json').read_text());variable=category+'Products'
 p=ROOT/'catalog.js';s=p.read_text();s=re.sub(r'const '+variable+r' = \[.*?\n\];',lambda m:'const '+variable+' = '+json.dumps(products,ensure_ascii=False,indent=2)+';',s,count=1,flags=re.S);p.write_text(s)
 for p in ROOT.glob(f'products-{category}-*.html'):
  page=int(re.search(r'-(\d+)\.html$',p.name)[1]);start=(page-1)*12;cards=''.join(card(x,start+i) for i,x in enumerate(products[start:start+12]));s=p.read_text();s=re.sub(r'(<div id="catalogue-grid"[^>]*>).*?(</div>\s*<p id="catalogue-count")',lambda m:m[1]+cards+m[2],s,flags=re.S);p.write_text(s)
print('Updated existing products:',len(manifest),'— no new catalogue entries')
