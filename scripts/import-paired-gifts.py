"""Import visually matched gift-set views and rebuild every static gift page."""
from pathlib import Path
from PIL import Image,ImageOps
import json,re,html,math
ROOT=Path(__file__).resolve().parents[1]
sources=json.loads(Path('/workspace/gift-pair-import/sources.json').read_text());lookup={r['index']:r for r in sources}
pairs=[(0,1,'Emerald Duo','Colourful Rituals'),(7,2,'Cobalt Duo','Colourful Rituals'),(5,3,'Sunshine Duo','Colourful Rituals'),(6,4,'Amber Orange Duo','Colourful Rituals'),(9,8,'Five Colour Fragrance Set','Colourful Rituals'),(10,12,'Mystical Woods Duo','Quiet Rituals'),(11,13,'Red Wine & Rose Duo','Quiet Rituals'),(14,15,'Sage Green Duo','Quiet Rituals'),(16,17,'Fragrance Ritual Trio','Fragrance & Lifestyle'),(19,18,'Ruby Fragrance Trio','Fragrance & Lifestyle'),(21,20,'Amber Tray Collection','Warm Living'),(23,22,'Botanical Sage Duo','Botanical Gifts'),(24,25,'Blush Glass Dome Duo','Blush Moments'),(32,31,'Midnight Blue Duo','Quiet Rituals'),(33,30,'Soft Blush Duo','Quiet Rituals'),(27,26,'Wild Rose & Oud Duo','Square Glass')]
folder=ROOT/'assets/gifts/paired';folder.mkdir(parents=True,exist_ok=True);manifest=[]
def asset(idx):
 r=lookup[idx];dest=folder/(r['hash'][:20]+'.webp')
 if not dest.exists():
  im=ImageOps.exif_transpose(Image.open(r['path']));im.thumbnail((1400,1400));im.convert('RGB').save(dest,'WEBP',quality=88,method=6)
 path=str(dest.relative_to(ROOT));manifest.append({**{k:v for k,v in r.items() if k!='path'},'image':path});return path
products=[]
for a,b,name,series in pairs:
 single=asset(a);packaging=asset(b)
 products.append(dict(id='gift-pair-'+lookup[a]['hash'][:12],name=name,series=series,image=single,packagingImage=packaging,images=[single,packaging]))
(ROOT/'assets/gift-products.json').write_text(json.dumps(products,ensure_ascii=False,indent=2))
(ROOT/'assets/paired-gift-source-manifest.json').write_text(json.dumps({'pairs':[dict(single=a,packaging=b,name=n,series=s) for a,b,n,s in pairs],'deferred':[{'index':i,'source':lookup[i]['name'],'reason':'No standalone product photograph supplied'} for i in [28,29]],'sources':manifest},ensure_ascii=False,indent=2))
p=ROOT/'catalog.js';s=p.read_text();block='const giftProducts = '+json.dumps(products,ensure_ascii=False,indent=2)+';'
if 'const giftProducts =' in s:s=re.sub(r'const giftProducts = \[.*?\n\];',lambda m:block,s,flags=re.S)
else:s+='\n'+block+'\n'
p.write_text(s)
crystals=json.loads((ROOT/'assets/crystal-products.json').read_text());reeds=json.loads((ROOT/'assets/reed-products.json').read_text());candles=json.loads((ROOT/'assets/candle-products.json').read_text())
allproducts=products+crystals+[p for p in reeds if 'Gift Set' in p['name']]+[p for p in candles if p['series'] in ['Her · Him · Us','Floral Reverie','Christmas']]
base=(ROOT/'gifts.html').read_text();total=math.ceil(len(allproducts)/12)
def filename(n):return 'gifts.html' if n==1 else f'gifts-{n}.html'
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
print(f'{len(products)} pairs, {len(allproducts)} total gift products, {total} pages')
