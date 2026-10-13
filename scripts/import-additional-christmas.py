"""Import visually matched gift-set views and rebuild every static gift page."""
from pathlib import Path
from PIL import Image,ImageOps
import json,re,html,math
ROOT=Path(__file__).resolve().parents[1]
sources=json.loads(Path('/workspace/christmas-additional/sources.json').read_text());lookup={r['index']:r for r in sources}
pairs=[(0,8,'Cedar Kiss','Christmas Sand Art'),(1,2,'Christmas Tree Sand Candle','Christmas Sand Art'),(9,3,'Coastal Lime','Christmas Sand Art'),(4,5,'Sea Salt & Sage','Christmas Sand Art'),(7,6,'English Pear & Freesia','Christmas Sand Art'),(10,11,'Forest Green Cone Candle','Botanical Christmas Trees'),(12,13,'Rose Pink Cone Candle','Botanical Christmas Trees'),(22,14,'Ivory Silver Trees','Winter Glass'),(19,15,'Forest Green Silver Trees','Winter Glass'),(16,21,'Charcoal Golden Reindeer','Winter Glass'),(17,37,'Champagne Winter Forest','Winter Glass'),(18,20,'Amber Christmas Cookies','Winter Glass'),(39,23,'Silver Winter Forest','Winter Glass'),(24,25,'Silver Snowflakes','Winter Glass'),(38,40,'Olive Christmas Wishes','Winter Glass'),(41,42,'Violet Christmas Village','Winter Glass'),(43,44,'Ruby Winter Forest','Winter Glass'),(46,45,'Blue Winter Forest','Winter Glass'),(26,33,'Ivory Botanical Tree Ornament','Botanical Wax Ornaments'),(30,35,'Forest Tree Ornament','Botanical Wax Ornaments'),(31,34,'Olive Tree Ornament','Botanical Wax Ornaments'),(32,36,'Burgundy Botanical Ornament','Botanical Wax Ornaments')]
folder=ROOT/'assets/christmas/paired';folder.mkdir(parents=True,exist_ok=True);manifest=[]
def asset(idx):
 r=lookup[idx];dest=folder/(r['hash'][:20]+'.webp')
 if not dest.exists():
  im=ImageOps.exif_transpose(Image.open(r['path']));im.thumbnail((1400,1400));im.convert('RGB').save(dest,'WEBP',quality=88,method=6)
 path=str(dest.relative_to(ROOT));manifest.append({**{k:v for k,v in r.items() if k!='path'},'image':path});return path
products=[]
for a,b,name,series in pairs:
 single=asset(a);packaging=asset(b)
 products.append(dict(id='christmas-pair-'+lookup[a]['hash'][:12],name=name,series=series,image=single,packagingImage=packaging,images=[single,packaging]))
existing=json.loads((ROOT/'assets/christmas-products.json').read_text())
new_ids={p['id'] for p in products}
products+= [p for p in existing if p.get('id') not in new_ids]
(ROOT/'assets/christmas-products.json').write_text(json.dumps(products,ensure_ascii=False,indent=2))
(ROOT/'assets/paired-christmas-additional-source-manifest.json').write_text(json.dumps({'pairs':[dict(single=a,packaging=b,name=n,series=s) for a,b,n,s in pairs],'deferred':[{'index':27,'source':lookup[27]['name'],'reason':'Product-plus-packaging photograph not supplied'},{'index':29,'source':lookup[29]['name'],'reason':'Closed packaging only'}],'alternatePackaging':[{'index':28,'source':lookup[28]['name'],'productSingle':26}],'sources':manifest},ensure_ascii=False,indent=2))
p=ROOT/'catalog.js';s=p.read_text();block='const christmasProducts = '+json.dumps(products,ensure_ascii=False,indent=2)+';'
if 'const christmasProducts =' in s:s=re.sub(r'const christmasProducts = \[.*?\n\];',lambda m:block,s,flags=re.S)
else:s+='\n'+block+'\n'
p.write_text(s)
allproducts=products
base=(ROOT/'products-current.html').read_text().replace('data-category="candle"','data-category="christmas"').replace('Products — Lanarve Home Fragrance','Christmas — Lanarve Home Fragrance')
main='<main><section class="christmas-intro"><p class="eyebrow">THE LANARVE CHRISTMAS COLLECTION</p><h1>A little magic.<br>A warmer Christmas.</h1><p>Thoughtful fragrance gifts, festive candles and little seasonal rituals.</p><a class="button dark" href="#christmas-products">Explore Christmas <span aria-hidden="true">&#8599;</span></a></section><section id="christmas-products" class="section catalogue-page"><p class="eyebrow">FESTIVE COLLECTIONS</p><h2 class="catalogue-title">Christmas favourites</h2><div id="catalogue-grid" class="crystal-gallery"></div><p id="catalogue-count" class="gallery-count" aria-live="polite"></p><nav id="pagination" class="pagination" aria-label="Christmas collection pages"></nav></section></main>'
base=re.sub(r'<main>.*?</main>',lambda m:main,base,flags=re.S)
base=base.replace('href="products-current.html" aria-current="page" class="active"','href="products-current.html"')
base=base.replace('class="nav-christmas"','class="nav-christmas active" aria-current="page"')
total=math.ceil(len(allproducts)/12)

def filename(n):return 'christmas.html' if n==1 else f'christmas-{n}.html'
def esc(t):return html.escape(t,quote=True)
def card(p,index):
 name=esc(p['name']);paired=bool(p.get('packagingImage'));imgs=f'<img class="photo-single" src="{p["image"]}" alt="Lanarve {name} — product" loading="lazy">'
 if paired:imgs+=f'<img class="photo-packaging" src="{p["packagingImage"]}" alt="Lanarve {name} — product with packaging" loading="lazy">'
 visual=f'<span class="paired-photo">{imgs}</span>' if paired else imgs
 link=f'<a class="crystal-item" data-photo="{index}" href="{p["image"]}" aria-label="View {name}">{visual}<span class="eyebrow">{esc(p["series"])}</span><h3>{name}</h3><span class="product-link">VIEW PRODUCT <span>↗</span></span></a>'
 return f'<div class="paired-product">{link}<button type="button" class="photo-toggle" aria-pressed="false" aria-label="Show packaging for {name}">View packaging</button></div>' if paired else link
for page in range(1,total+1):
 s=re.sub(r'data-page="\d+"',f'data-page="{page}"',base);start=(page-1)*12
 s=re.sub(r'(<div id="catalogue-grid"[^>]*>).*?(</div>\s*<p id="catalogue-count")',lambda m:m[1]+''.join(card(p,start+i) for i,p in enumerate(allproducts[start:start+12]))+m[2],s,flags=re.S)
 s=re.sub(r'(<p id="catalogue-count"[^>]*>).*?(</p>)',lambda m:m[1]+f'Showing {start+1}–{min(start+12,len(allproducts))} of {len(allproducts)} products · Page {page} of {total}'+m[2],s)
 previous=f'<a href="{filename(page-1)}" aria-label="Previous page">← Previous</a>' if page>1 else '<span class="disabled">← Previous</span>'
 nxt=f'<a href="{filename(page+1)}" aria-label="Next page">Next →</a>' if page<total else '<span class="disabled">Next →</span>'
 nums=''.join(f'<a href="{filename(n)}" aria-label="Page {n}"'+(' aria-current="page"' if n==page else '')+f'>{n}</a>' for n in range(1,total+1))
 s=re.sub(r'(<nav id="pagination"[^>]*>).*?(</nav>)',lambda m:m[1]+previous+nums+nxt+m[2],s)
 (ROOT/filename(page)).write_text(s)
print(f'{len(products)} pairs, {len(allproducts)} total Christmas products, {total} pages')

