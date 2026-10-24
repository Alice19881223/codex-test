"""Build the reviewed reed diffuser collections without changing product identities."""
from pathlib import Path
import json,re,html,math
from product_records import product_url
ROOT=Path(__file__).resolve().parents[1]
products=json.loads((ROOT/'assets/reed-products.json').read_text())
candle_products=json.loads((ROOT/'assets/candle-products.json').read_text())
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
def related_card(p):
 name=esc(p['name']);src=esc(p['image']);url=product_url('candle',p['image'])
 return f'<a class="crystal-item little-daydream-related" href="{url}" aria-label="View {name}"><img class="photo-single" src="{src}" alt="Lanarve {name} — candle" loading="lazy"><span class="eyebrow">More of her drawings · Candle</span><h3>{name}</h3><span class="product-link">VIEW PRODUCT <span>↗</span></span></a>'
base=(ROOT/'products-reed-1.html').read_text()
base=re.sub(r'<body[^>]*>', '<body data-category="reed" data-page="1">',base)
overview='<main class="section candle-theme-landing"><section class="candle-mood-overview"><div class="candle-mood-grid">'+''.join(f'<a class="candle-mood-card" href="{filename(c["slug"])}"><img src="assets/mood-{c["icon"]}.svg" alt="" width="54" height="54"><h2>{esc(c["name"])}</h2><p>{esc(c["description"])}</p><span class="mood-count">{len(c["productKeys"])+len(c.get("relatedProducts",[]))} {"designs" if c.get("relatedProducts") else "reed diffusers"} <span aria-hidden="true">↗</span></span></a>' for c in collections)+'</div></section></main>'
landing=re.sub(r'<main\b[^>]*>.*?</main>',lambda m:overview,base,flags=re.S)
landing=landing.replace(' data-category="reed" data-page="1"','')
(ROOT/'products-reed-1.html').write_text(landing)
(ROOT/'reed-collections.html').write_text(landing)
for c in collections:
 rows=[bykey[k] for k in c['productKeys']];pages=c['pages'];total=len(pages)
 for page in range(1,total+1):
  start=sum(len(part) for part in pages[:page-1]);page_rows=[bykey[k] for k in pages[page-1]]
  related=[]
  if page==total:
   for item in c.get('relatedProducts',[]):related.append(next(p for p in candle_products if p['series']==item['series'] and p['name']==item['name']))
  s=base.replace('data-category="reed" data-page="1"',f'data-category="reed" data-page="{page}" data-collection="{c["slug"]}" data-collection-count="{len(rows)}" data-collection-pages="{total}"')
  related_title='<div class="little-daydream-related-heading"><p class="eyebrow">MORE OF HER DRAWINGS</p><h2>Jellyfish &amp; Harbour Stories</h2><p>These supplied designs are candles, so their product pages retain the correct candle format and care instructions.</p></div>' if related else ''
  main=f'<main><section class="candle-mood-intro"><a class="mood-breadcrumb" href="reed-collections.html">Reed diffuser collections /</a><img src="assets/mood-{c["icon"]}.svg" alt="" width="64" height="64"><h1>{esc(c["name"])}</h1><p>{esc(c["description"])}</p></section><section class="section catalogue-page">'+navigation(c['slug'])+'<div id="catalogue-grid" class="crystal-gallery">'+''.join(card(p,index) for index,p in page_rows)+related_title+''.join(related_card(p) for p in related)+'</div>'+f'<p id="catalogue-count" class="gallery-count" aria-live="polite">Showing {start+1}–{start+len(page_rows)+len(related)} of {len(rows)+len(c.get("relatedProducts",[]))} designs · Page {page} of {total}</p>'
  links=f'<a href="{filename(c["slug"],page-1)}" aria-label="Previous page">← Previous</a>' if page>1 else '<span class="disabled">← Previous</span>'
  links+=''.join(f'<a href="{filename(c["slug"],n)}"'+(' aria-current="page"' if n==page else '')+f'>{n}</a>' for n in range(1,total+1))
  links+=f'<a href="{filename(c["slug"],page+1)}" aria-label="Next page">Next →</a>' if page<total else '<span class="disabled">Next →</span>'
  main+='<nav id="pagination" class="pagination" aria-label="Reed diffuser collection pages">'+links+'</nav></section></main>'
  s=re.sub(r'<main\b[^>]*>.*?</main>',lambda m:main,s,flags=re.S)
  s=re.sub(r'<title>.*?</title>',lambda m:f'<title>{esc(c["name"])} — Lanarve Reed Diffusers</title>',s)
  (ROOT/filename(c['slug'],page)).write_text(s)
print('Reed collections:',{c['name']:len(c['productKeys']) for c in collections})

# Retire unthemed legacy pagination so bookmarks open the current collection entrance.
for path in ROOT.glob('products-reed-*.html'):
 if path.name=='products-reed-1.html':continue
 path.write_text('<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="refresh" content="0;url=reed-collections.html"><title>Lanarve Reed Diffusers</title></head><body><a href="reed-collections.html">Explore reed diffuser collections</a></body></html>')
