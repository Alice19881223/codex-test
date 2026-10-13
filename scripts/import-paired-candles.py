"""Import the October paired candle collection and rebuild static candle pages.
Run once with the extracted source manifest. Pairing is visually reviewed, not inferred from filename order.
"""
from pathlib import Path
from PIL import Image,ImageOps
import json,re,hashlib,html,math
ROOT=Path(__file__).resolve().parents[1]
SOURCE=Path('/workspace/candle-pair-import/sources.json')
sources=json.loads(SOURCE.read_text());byindex={r['index']:r for r in sources}
pairs=[(0,1,'Gardenia','Vintage Florals'),(2,3,'Bluebell','Vintage Florals'),(4,5,'Amber Glass','Classic Amber'),(8,6,'Lucky No. 6','Lucky Numbers'),(9,7,'Lucky No. 2','Lucky Numbers'),(10,11,'Lucky No. 8','Lucky Numbers'),(13,12,'Ruby Bow','Lolita'),(15,14,'Blush Bow','Lolita'),(16,17,'Dark Woods','Lace Glass'),(18,19,'Baltic Amber','Lace Glass'),(20,21,'White Peach Oolong','Lace Glass'),(22,23,'Blood Orange','Lace Glass'),(24,25,'White Florals','Lace Glass'),(26,27,'Provence Lavender','Lace Glass'),(29,28,'Ivory Porcelain','Minimal Relief'),(30,31,'Gardenia','Gradient Glass'),(32,33,'Lavender','Gradient Glass'),(34,35,'Vanilla','Gradient Glass'),(43,36,'Osmanthus','Postbox'),(42,37,'Lavender','Postbox'),(44,38,'Peach Oolong','Postbox'),(39,45,'Lime Basil','Postbox'),(40,41,'Island Cotton','Postbox'),(58,59,'Ivory Oval','Oval Relief'),(46,47,'Pearl Ivory','Iridescent'),(49,48,'Obsidian','Iridescent'),(51,50,'Ivory Sunflower','Sunflower'),(53,52,'Golden Sunflower','Sunflower'),(54,56,'Iced Patchouli','Organic Glass'),(57,55,'Desert Rose','Organic Glass'),(63,60,'Ivory Deer','Deer Collection'),(61,62,'Smoky Deer','Deer Collection'),(64,65,'Birthday Celebration','Playful Birthday'),(68,67,'Pumpkin & Ghost','Halloween')]
# These distinct supplied views lack a matching standalone photo; do not invent one.
pending=[(66,'Boo & Cream — Pumpkin'),(69,'Pumpkin Party — Autumn Leaves'),(70,'Boo & Cream — Witch'),(71,'Pumpkin Party — Ghost'),(73,'Pumpkin Party — Warm Orange'),(74,'Moonlit Magic — Lavender'),(75,'Moonlit Magic — Black Cat')]
unpaired=[]  # User requested deferring variants without a standalone photo.
folder=ROOT/'assets/candles/paired';folder.mkdir(exist_ok=True)
manifest=[]
def asset(idx):
 r=byindex[idx];name=r['hash'][:20]+'.webp';out=folder/name
 if not out.exists():
  im=ImageOps.exif_transpose(Image.open(r['path']));im.thumbnail((1400,1400));im.convert('RGB').save(out,'WEBP',quality=88,method=6)
 image=str(out.relative_to(ROOT));manifest.append({**r,'image':image});return image
products=[]
for a,b,name,series in pairs:
 products.append(dict(id=f'candle-pair-{byindex[a]["hash"][:12]}',name=name,series=series,image=asset(a),packagingImage=asset(b),images=[str(folder.relative_to(ROOT)/ (byindex[a]['hash'][:20]+'.webp')),str(folder.relative_to(ROOT)/(byindex[b]['hash'][:20]+'.webp'))]))
for idx,name in unpaired:
 products.append(dict(id=f'candle-view-{byindex[idx]["hash"][:12]}',name=name,series='Halloween',image=asset(idx),view='packaging',images=[str(folder.relative_to(ROOT)/(byindex[idx]['hash'][:20]+'.webp'))]))
existing=json.loads((ROOT/'assets/candle-products.json').read_text());existing=[p for p in existing if not p.get('id','').startswith(('candle-pair-','candle-view-'))]
products+=existing
(ROOT/'assets/candle-products.json').write_text(json.dumps(products,ensure_ascii=False,indent=2))
(ROOT/'assets/paired-candle-source-manifest.json').write_text(json.dumps({'pairs':[{'single':a,'packaging':b,'name':n,'series':s} for a,b,n,s in pairs],'missingStandalone':[x[0] for x in pending],'excludedDuplicate':{'index':72,'sameAs':71},'sources':[{k:v for k,v in row.items() if k!='path'} for row in manifest]},ensure_ascii=False,indent=2))
p=ROOT/'catalog.js';s=p.read_text();s=re.sub(r'const candleProducts = \[.*?\n\];',lambda m:'const candleProducts = '+json.dumps(products,ensure_ascii=False,indent=2)+';',s,count=1,flags=re.S);p.write_text(s)
# Use the existing complete page shell so shared navigation and footer stay intact.
base=(ROOT/'products-current.html').read_text();total=math.ceil(len(products)/12)
def filename(n):return 'products-current.html' if n==1 else f'products-candle-{n}.html'
def esc(t):return html.escape(t,quote=True)
def card(p,index):
 paired=bool(p.get('packagingImage'));name=esc(p['name']);alt=f'Lanarve {name}'
 images=f'<img class="photo-single" src="{p["image"]}" alt="{alt}{" with packaging" if p.get("view")=="packaging" else " — product"}" loading="lazy">'
 if paired:images+=f'<img class="photo-packaging" src="{p["packagingImage"]}" alt="{alt} — product with packaging" loading="lazy">'
 photo=f'<span class="paired-photo">{images}</span>' if paired else images
 link=f'<a class="crystal-item" data-photo="{index}" href="{p["image"]}" aria-label="View {name}">{photo}<span class="eyebrow">{esc(p["series"])}</span><h3>{name}</h3><span class="product-link">VIEW PRODUCT <span>↗</span></span></a>'
 return f'<div class="paired-product">{link}<button type="button" class="photo-toggle" aria-pressed="false" aria-label="Show packaging for {name}">View packaging</button></div>' if paired else link
for page in range(1,total+1):
 s=re.sub(r'data-page="\d+"',f'data-page="{page}"',base);start=(page-1)*12
 cards=''.join(card(p,start+i) for i,p in enumerate(products[start:start+12]))
 s=re.sub(r'(<div id="catalogue-grid"[^>]*>).*?(</div>\s*<p id="catalogue-count")',lambda m:m[1]+cards+m[2],s,flags=re.S)
 s=re.sub(r'(<p id="catalogue-count"[^>]*>).*?(</p>)',lambda m:m[1]+f'Showing {start+1}–{min(start+12,len(products))} of {len(products)} products · Page {page} of {total}'+m[2],s)
 prev=f'<a href="{filename(page-1)}" aria-label="Previous page">← Previous</a>' if page>1 else '<span class="disabled">← Previous</span>'
 nxt=f'<a href="{filename(page+1)}" aria-label="Next page">Next →</a>' if page<total else '<span class="disabled">Next →</span>'
 nums=''.join(f'<a href="{filename(n)}" aria-label="Page {n}"'+(' aria-current="page"' if n==page else '')+f'>{n}</a>' for n in range(1,total+1))
 s=re.sub(r'(<nav id="pagination"[^>]*>).*?(</nav>)',lambda m:m[1]+prev+nums+nxt+m[2],s)
 (ROOT/filename(page)).write_text(s)
 if page==1:(ROOT/'products.html').write_text(s)
print(f'{len(pairs)} paired products, {len(unpaired)} existing-view products; {len(products)} total candles; {total} pages')
