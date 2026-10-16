"""Render series-preserving pages for the non-mood product catalogues."""
from pathlib import Path
import json,re,html
root=Path(__file__).resolve().parents[1]
layouts=json.loads((root/'assets/catalogue-layouts.json').read_text())
def esc(t):return html.escape(t,quote=True)
def filename(cat,page=1):
 if cat=='crystal':return f'products-crystal-{page}.html'
 return {'gift':'gift-collection','christmas':'christmas-collection','sachets':'sachets'}[cat]+(f'-{page}' if page>1 else '')+'.html'
def card(p,index):
 name=esc(p['name']);paired=bool(p.get('packagingImage'));imgs=f'<img class="photo-single" src="{p["image"]}" alt="Lanarve {name} — product" loading="lazy">'
 if paired:imgs=f'<span class="paired-photo">{imgs}<img class="photo-packaging" src="{p["packagingImage"]}" alt="{name} — second view" loading="lazy"></span>'
 a=f'<a class="crystal-item" data-photo="{index}" href="{p["image"]}" aria-label="View {name}">{imgs}<span class="eyebrow">{esc(p["series"])}</span><h3>{name}</h3><span class="product-link">VIEW PRODUCT ↗</span></a>'
 label='View another angle' if p.get('alternateView') else 'View packaging'
 return '<div class="paired-product">'+a+f'<button type="button" class="photo-toggle" aria-pressed="false" aria-label="{label} for {name}">{label}</button></div>' if paired else a
for cat,pages in layouts.items():
 products=json.loads((root/f'assets/{cat}-products.json').read_text());lookup={p['image']:(i,p) for i,p in enumerate(products)};base=(root/filename(cat)).read_text();total=len(pages)
 for page,images in enumerate(pages,1):
  start=sum(len(part) for part in pages[:page-1]);text=re.sub(r'<body[^>]*>',f'<body data-category="{cat}" data-page="{page}" data-catalogue-pages="{total}" data-arranged-catalogue="true">',base)
  text=re.sub(r'(<div id="catalogue-grid"[^>]*>).*?(</div>\s*<p id="catalogue-count")',lambda m:m[1]+''.join(card(lookup[image][1],lookup[image][0]) for image in images)+m[2],text,flags=re.S)
  text=re.sub(r'(<p id="catalogue-count"[^>]*>).*?</p>',lambda m:m[1]+f'Showing {start+1}–{start+len(images)} of {len(products)} products · Page {page} of {total}</p>',text)
  links=f'<a href="{filename(cat,page-1)}" aria-label="Previous page">← Previous</a>' if page>1 else '<span class="disabled">← Previous</span>'
  links+=''.join(f'<a href="{filename(cat,n)}"'+(' aria-current="page"' if n==page else '')+f'>{n}</a>' for n in range(1,total+1))
  links+=f'<a href="{filename(cat,page+1)}" aria-label="Next page">Next →</a>' if page<total else '<span class="disabled">Next →</span>'
  text=re.sub(r'(<nav id="pagination"[^>]*>).*?</nav>',lambda m:m[1]+links+'</nav>',text,flags=re.S)
  if cat=='gift':text=re.sub(r'<p class="eyebrow">\d+ THOUGHTFULLY PAIRED GIFT SETS</p>\s*<h2>For someone <em>extraordinary\.</em></h2>','',text)
  if cat=='christmas':text=re.sub(r'<p class="eyebrow">FESTIVE COLLECTIONS</p>\s*<h2 class="catalogue-title">Christmas favourites</h2>','',text)
  if cat=='christmas':text=re.sub(r'\d+ DESIGNS · THE LANARVE CHRISTMAS COLLECTION',f'{len(products)} DESIGNS · THE LANARVE CHRISTMAS COLLECTION',text)
  (root/filename(cat,page)).write_text(text)
 # Keep historical gift/Christmas URLs consistent with their current pages.
 pattern={'gift':'gifts*.html','christmas':'christmas*.html','crystal':'products-crystal-*.html','sachets':'sachets*.html'}[cat]
 for path in root.glob(pattern):
  match=re.search(r'-(\d+)\.html$',path.name);page=int(match[1]) if match else 1
  if path.name not in [filename(cat,n) for n in range(1,total+1)]:
   target=filename(cat,min(page,total))
   path.write_text(f'<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="refresh" content="0;url={target}"><title>Lanarve collection</title></head><body><a href="{target}">Explore the collection</a></body></html>')
 print(cat,'arranged pages:',[len(page) for page in pages])
