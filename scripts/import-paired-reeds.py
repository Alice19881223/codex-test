"""Import visually matched gift-set views and rebuild every static gift page."""
from pathlib import Path
from PIL import Image,ImageOps
import json,re,html,math
ROOT=Path(__file__).resolve().parents[1]
sources=json.loads(Path('/workspace/reed-oct14/sources.json').read_text());lookup={r['index']:r for r in sources}
pairs=[(5,0,'First Encounter','Ribbon Glass'),(6,1,'French Neighbourhood','Ribbon Glass'),(3,2,'Brilliant Love','Ribbon Glass'),(4,7,'Zen Tea','Ribbon Glass'),(8,9,'Moonlit Gardenia — Tall','Ribbed Ceramic'),(12,10,'Moonlit Gardenia — Rounded','Ribbed Ceramic'),(13,11,'Sage & Sandalwood — Rounded','Ribbed Ceramic'),(14,15,'Sage & Sandalwood — Tall','Ribbed Ceramic'),(17,16,'Ebony & Rose Infusion','Botanical Glass'),(18,19,'Graphite Jasmine','Matte Glass'),(21,20,'Mountain Rain','Colour Glass'),(22,23,'Cloud Pine','Colour Glass'),(24,25,'Golden Osmanthus','Colour Glass'),(26,31,'Osmanthus Blossom','Floral Glass'),(29,27,'Peach Blossom — Branches','Floral Glass'),(30,28,'Peach Blossom — Petals','Floral Glass'),(32,33,'Black Daisy','Sculpted Floral'),(34,37,'Sage Daisy','Sculpted Floral'),(36,35,'Ivory Daisy','Sculpted Floral'),(38,39,'White Musk Stone','Stone Diffuser'),(41,40,'Deep Brown Oval','Oval Diffuser'),(42,43,'Warm Brown Oval','Oval Diffuser'),(45,44,'Curved Reeds','Double Glass'),(46,48,'Peony Blossom','Triangular Glass'),(49,47,'English Pear & Freesia','Triangular Glass')]
folder=ROOT/'assets/reeds/paired';folder.mkdir(parents=True,exist_ok=True);manifest=[]
def asset(idx):
 r=lookup[idx];dest=folder/(r['hash'][:20]+'.webp')
 if not dest.exists():
  im=ImageOps.exif_transpose(Image.open(r['path']));im.thumbnail((1400,1400));im.convert('RGB').save(dest,'WEBP',quality=88,method=6)
 path=str(dest.relative_to(ROOT));manifest.append({**{k:v for k,v in r.items() if k!='path'},'image':path});return path
products=[]
for a,b,name,series in pairs:
 single=asset(a);packaging=asset(b)
 products.append(dict(id='reed-pair-'+lookup[a]['hash'][:12],name=name,series=series,image=single,packagingImage=packaging,images=[single,packaging]))
existing=json.loads((ROOT/'assets/reed-products.json').read_text())
new_ids={p['id'] for p in products}
products+=[p for p in existing if p.get('id') not in new_ids]
(ROOT/'assets/reed-products.json').write_text(json.dumps(products,ensure_ascii=False,indent=2))
(ROOT/'assets/paired-reed-oct14-source-manifest.json').write_text(json.dumps({'pairs':[dict(single=a,packaging=b,name=n,series=s) for a,b,n,s in pairs],'sources':manifest},ensure_ascii=False,indent=2))
p=ROOT/'catalog.js';s=p.read_text();block='const reedProducts = '+json.dumps(products,ensure_ascii=False,indent=2)+';'
if 'const reedProducts =' in s:s=re.sub(r'const reedProducts = \[.*?\n\];',lambda m:block,s,flags=re.S)
else:s+='\n'+block+'\n'
p.write_text(s)
allproducts=products
base=(ROOT/'products-reed-1.html').read_text();total=math.ceil(len(allproducts)/12)
def filename(n):return f'products-reed-{n}.html'

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
print(f'{len(pairs)} new pairs, {len(allproducts)} total reed products, {total} pages')

