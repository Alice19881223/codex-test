"""Build the four reed diffuser collections without changing product identities."""
from pathlib import Path
import json,re,html,math
ROOT=Path(__file__).resolve().parents[1]
products=json.loads((ROOT/'assets/reed-products.json').read_text())
collections=json.loads((ROOT/'assets/reed-collections.json').read_text())
bykey={p['series']+' | '+p['name']:(i,p) for i,p in enumerate(products)}
keys=[k for c in collections for k in c['productKeys']]
assert len(keys)==len(set(keys))==len(products) and set(keys)==set(bykey)
def esc(t):return html.escape(t,quote=True)
def filename(slug,page=1):return f'reeds-{slug}'+(f'-{page}' if page>1 else '')+'.html'
def navigation(active):
 return '<nav class="candle-mood-nav" aria-label="Reed diffuser collections">'+''.join(f'<a href="{filename(c["slug"])}"'+(' aria-current="page"' if active==c['slug'] else '')+f'>{esc(c["name"])}</a>' for c in collections)+'</nav>'
def card(p,index):
 name=esc(p['name']);paired=bool(p.get('packagingImage'));imgs=f'<img class="photo-single" src="{p["image"]}" alt="Lanarve {name} — product" loading="lazy">'
 if paired:
  caption='alternate view' if p.get('alternateView') else 'product with packaging'
  imgs+=f'<img class="photo-packaging" src="{p["packagingImage"]}" alt="Lanarve {name} — {caption}" loading="lazy">'
 visual=f'<span class="paired-photo">{imgs}</span>' if paired else imgs
 link=f'<a class="crystal-item" data-photo="{index}" href="{p["image"]}" aria-label="View {name}">{visual}<span class="eyebrow">{esc(p["series"])}</span><h3>{name}</h3><span class="product-link">VIEW PRODUCT <span>↗</span></span></a>'
 label='View another angle' if p.get('alternateView') else 'View packaging'
 return f'<div class="paired-product">{link}<button type="button" class="photo-toggle" aria-pressed="false" aria-label="{label} for {name}">{label}</button></div>' if paired else link
base=(ROOT/'products-reed-1.html').read_text()
base=re.sub(r'<body[^>]*>', '<body data-category="reed" data-page="1">',base)
overview='<main class="section candle-theme-landing"><section class="candle-mood-overview"><div class="candle-mood-grid">'+''.join(f'<a class="candle-mood-card" href="{filename(c["slug"])}"><img src="assets/mood-{c["icon"]}.svg" alt="" width="54" height="54"><h2>{esc(c["name"])}</h2><p>{esc(c["description"])}</p><span class="mood-count">{len(c["productKeys"])} reed diffusers <span aria-hidden="true">↗</span></span></a>' for c in collections)+'</div></section></main>'
landing=re.sub(r'<main\b[^>]*>.*?</main>',lambda m:overview,base,flags=re.S)
landing=landing.replace(' data-category="reed" data-page="1"','')
(ROOT/'products-reed-1.html').write_text(landing)
(ROOT/'reed-collections.html').write_text(landing)
for c in collections:
 rows=[bykey[k] for k in c['productKeys']];total=math.ceil(len(rows)/12)
 for page in range(1,total+1):
  start=(page-1)*12
  s=base.replace('data-category="reed" data-page="1"',f'data-category="reed" data-page="{page}" data-collection="{c["slug"]}" data-collection-count="{len(rows)}"')
  main=f'<main><section class="candle-mood-intro"><a class="mood-breadcrumb" href="reed-collections.html">Reed diffuser collections /</a><img src="assets/mood-{c["icon"]}.svg" alt="" width="64" height="64"><h1>{esc(c["name"])}</h1><p>{esc(c["description"])}</p></section><section class="section catalogue-page">'+navigation(c['slug'])+'<div id="catalogue-grid" class="crystal-gallery">'+''.join(card(p,index) for index,p in rows[start:start+12])+'</div>'+f'<p id="catalogue-count" class="gallery-count" aria-live="polite">Showing {start+1}–{min(start+12,len(rows))} of {len(rows)} reed diffusers · Page {page} of {total}</p>'
  links=f'<a href="{filename(c["slug"],page-1)}" aria-label="Previous page">← Previous</a>' if page>1 else '<span class="disabled">← Previous</span>'
  links+=''.join(f'<a href="{filename(c["slug"],n)}"'+(' aria-current="page"' if n==page else '')+f'>{n}</a>' for n in range(1,total+1))
  links+=f'<a href="{filename(c["slug"],page+1)}" aria-label="Next page">Next →</a>' if page<total else '<span class="disabled">Next →</span>'
  main+='<nav id="pagination" class="pagination" aria-label="Reed diffuser collection pages">'+links+'</nav></section></main>'
  s=re.sub(r'<main\b[^>]*>.*?</main>',lambda m:main,s,flags=re.S)
  s=re.sub(r'<title>.*?</title>',lambda m:f'<title>{esc(c["name"])} — Lanarve Reed Diffusers</title>',s)
  (ROOT/filename(c['slug'],page)).write_text(s)
print('Reed collections:',{c['name']:len(c['productKeys']) for c in collections})

for path in ROOT.glob('products-reed-*.html'):
 match=re.search(r'-(\d+)\.html$',path.name)
 if not match or int(match[1])==1:continue
 page=int(match[1]);start=(page-1)*12;text=path.read_text()
 text=re.sub(r'(<div id="catalogue-grid"[^>]*>).*?(</div>\s*<p id="catalogue-count")',lambda m:m[1]+''.join(card(p,start+i) for i,p in enumerate(products[start:start+12]))+m[2],text,flags=re.S)
 text=re.sub(r'(<p id="catalogue-count"[^>]*>).*?(</p>)',lambda m:m[1]+f'Showing {start+1}–{min(start+12,len(products))} of {len(products)} products · Page {page} of {math.ceil(len(products)/12)}'+m[2],text)
 path.write_text(text)
