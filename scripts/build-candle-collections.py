"""Build the reviewed candle mood subdirectories with static pagination."""
from pathlib import Path
import json,re,html,math
ROOT=Path(__file__).resolve().parents[1]
products=json.loads((ROOT/'assets/candle-products.json').read_text())
key=lambda p:p['series']+' | '+p['name']
# Keep first-appearance series order while making each series one continuous block.
from collections import OrderedDict
grouped=OrderedDict()
for product in products:grouped.setdefault(product['series'],[]).append(product)
products=[p for group in grouped.values() for p in group]
(ROOT/'assets/candle-products.json').write_text(json.dumps(products,ensure_ascii=False,indent=2))
path=ROOT/'assets/candle-collections.json';collections=json.loads(path.read_text())
p=ROOT/'catalog.js';source=p.read_text();source=re.sub(r'const candleProducts = \[.*?\n\];',lambda m:'const candleProducts = '+json.dumps(products,ensure_ascii=False,indent=2)+';',source,count=1,flags=re.S);p.write_text(source)
bykey={key(p):(i,p) for i,p in enumerate(products)}
icons={
 'sun':'<circle cx="32" cy="28" r="11"/><path d="M32 7V3M13 11l4 4M6 28h5m42 0h5M47 15l4-4M18 44h28M12 52h40M24 27h.1m15 0h.1M28 33q4 4 8 0"/>',
 'quiet':'<path d="M10 29c8-3 15-1 22 4 7-5 14-7 22-4v27c-8-3-15-2-22 3-7-5-14-6-22-3ZM32 33v26M39 5c-5 14 2 21 14 18-8 13-26 7-25-5 0-7 4-12 11-13Z"/>',
 'heart':'<path d="M32 54C-2 34 10 6 26 16l6 6 6-6c16-10 28 18-6 38Z"/><path d="M23 30h.1m18 0h.1M26 39q6 6 12 0"/>',
 'joy':'<circle cx="32" cy="34" r="19"/><path d="M24 30h.1m16 0h.1M23 39q9 13 18 0M12 8l2 5 6 1-5 4 1 5-4-3-5 3 1-5-4-4 6-1ZM48 6l2 4 5 1-4 3 1 5-4-2-4 2 1-5-4-3 5-1Z"/>'}
icons['everyday']='<path d="M12 29h30v15a10 10 0 0 1-10 10H22a10 10 0 0 1-10-10ZM42 32h5a7 7 0 0 1 0 14h-5M8 59h44M22 21c-7-8 7-9 0-17M33 21c-7-8 7-9 0-17"/><path d="M49 8v8m-4-4h8"/>'
for name,shape in icons.items():(ROOT/f'assets/mood-{name}.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><g fill="#e4ecd9" stroke="#486347" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">{shape}</g></svg>')
def esc(t):return html.escape(t,quote=True)
def filename(slug,page=1):return f'candles-{slug}'+(f'-{page}' if page>1 else '')+'.html'
def navigation(active=''):
 return '<nav class="candle-mood-nav" aria-label="Candle collections">'+''.join(f'<a href="{filename(c["slug"])}"'+(' aria-current="page"' if active==c['slug'] else '')+f'>{esc(c["name"])}</a>' for c in collections)+'</nav>'
overview='<section id="candle-collections" class="candle-mood-overview"><div class="candle-mood-grid">'+''.join(f'<a class="candle-mood-card" href="{filename(c["slug"])}"><img src="assets/mood-{c["icon"]}.svg" alt="" width="54" height="54"><h2>{esc(c["name"])}</h2><p>{esc(c["description"])}</p><span class="mood-count">{len(c["productKeys"])} candles <span aria-hidden="true">&#8599;</span></span></a>' for c in collections)+'</div></section>'
def card(p,index):
 name=esc(p['name']);paired=bool(p.get('packagingImage'));imgs=f'<img class="photo-single" src="{p["image"]}" alt="Lanarve {name} — product" loading="lazy">'
 if paired:
  caption='alternate view' if p.get('alternateView') else 'product with packaging'
  imgs+=f'<img class="photo-packaging" src="{p["packagingImage"]}" alt="Lanarve {name} — {caption}" loading="lazy">'
 visual=f'<span class="paired-photo">{imgs}</span>' if paired else imgs
 link=f'<a class="crystal-item" data-photo="{index}" href="{p["image"]}" aria-label="View {name}">{visual}<span class="eyebrow">{esc(p["series"])}</span><h3>{name}</h3><span class="product-link">VIEW PRODUCT <span>↗</span></span></a>'
 label='View another angle' if p.get('alternateView') else 'View packaging'
 return f'<div class="paired-product">{link}<button type="button" class="photo-toggle" aria-pressed="false" aria-label="{label} for {name}">{label}</button></div>' if paired else link
base=(ROOT/'products-current.html').read_text()
base=re.sub(r'<body[^>]*>', '<body data-category="candle" data-page="1">',base)
# The candle entrance shows the configured collections; old all-product pages redirect here.
landing=re.sub(r'<main\b[^>]*>.*?</main>',lambda m:'<main class="section candle-theme-landing">'+overview+'</main>',base,flags=re.S)
landing=re.sub(r' data-category="candle" data-page="\d+"','',landing)
for name in ['products-current.html','products.html']:(ROOT/name).write_text(landing)
for path in ROOT.glob('products-candle-*.html'):
 path.write_text('<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="refresh" content="0;url=products-current.html"><title>Lanarve Candle Collections</title></head><body><a href="products-current.html">Explore candle collections</a></body></html>')
for c in collections:
 intro_label='<p class="eyebrow">'+esc(c['eyebrow'])+'</p>' if c.get('eyebrow') else ''
 intro_extra='<p class="everyday-story">'+esc(c['story'])+'</p>' if c.get('story') else ''
 rows=[bykey[k] for k in c['productKeys']];pages=c['pages'];total=len(pages)
 for page in range(1,total+1):
  start=sum(len(part) for part in pages[:page-1]);page_rows=[bykey[k] for k in pages[page-1]];s=re.sub(r'data-category="candle" data-page="\d+"',f'data-category="candle" data-page="{page}" data-collection="{c["slug"]}" data-collection-count="{len(c["productKeys"])}" data-collection-pages="{total}"',base)
  feature=c.get('seasonalFeature') if page==1 else None
  seasonal_intro=('<section class="seasonal-feature" aria-label="Spring and summer collection"><p class="eyebrow">SPRING &amp; SUMMER EDIT</p><p><strong>'+esc(feature['title'])+'</strong></p><p class="catalog-note">'+esc(feature['description'])+'</p></section>') if feature else ''
  main=f'<main><section class="candle-mood-intro"><a class="mood-breadcrumb" href="products-current.html">Candle collections /</a><img src="assets/mood-{c["icon"]}.svg" alt="" width="64" height="64">{intro_label}<h1>{esc(c["name"])}</h1><p>{esc(c["description"])}</p>{intro_extra}</section><section class="section catalogue-page">'+navigation(c['slug'])+seasonal_intro+'<div id="catalogue-grid" class="crystal-gallery">'+''.join(card(p,index) for index,p in page_rows)+'</div>'+f'<p id="catalogue-count" class="gallery-count" aria-live="polite">Showing {start+1}–{start+len(page_rows)} of {len(rows)} candles · Page {page} of {total}</p>'
  previous=f'<a href="{filename(c["slug"],page-1)}" aria-label="Previous page">← Previous</a>' if page>1 else '<span class="disabled">← Previous</span>'
  nxt=f'<a href="{filename(c["slug"],page+1)}" aria-label="Next page">Next →</a>' if page<total else '<span class="disabled">Next →</span>'
  numbers=''.join(f'<a href="{filename(c["slug"],n)}"'+(' aria-current="page"' if n==page else '')+f'>{n}</a>' for n in range(1,total+1))
  main+='<nav id="pagination" class="pagination" aria-label="Candle collection pages">'+previous+numbers+nxt+'</nav></section></main>'
  s=re.sub(r'<main\b[^>]*>.*?</main>',lambda m:main,s,flags=re.S);s=s.replace('<title>Products — Lanarve Home Fragrance</title>',f'<title>{esc(c["name"])} — Lanarve Candles</title>');(ROOT/filename(c['slug'],page)).write_text(s)
print('Collection counts:',{c['name']:len(c['productKeys']) for c in collections})

# A smaller collection may no longer need its former final page.
for c in collections:
 total=len(c['pages'])
 for path in ROOT.glob(f'candles-{c["slug"]}-*.html'):
  match=re.search(r'-(\d+)\.html$',path.name)
  if match and int(match[1])>total:
   target=filename(c['slug'],total)
   path.write_text(f'<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta http-equiv="refresh" content="0;url={target}"><link rel="canonical" href="{target}"><title>Lanarve candle collection</title></head><body><a href="{target}">Explore the current candle collection</a></body></html>')
