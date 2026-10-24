"""Create paginated static fragrance collections with 12 products per page."""
from pathlib import Path
import json,re,html
root=Path(__file__).resolve().parents[1]
scents=json.loads((root/'assets/fragrances.json').read_text())
base=(root/'products-crystal-1.html').read_text()
categories={'candle':'Scented candles','reed':'Reed diffusers','crystal':'Crystal diffusers','gift':'Gift setting','christmas':'Christmas','sachets':'Tablets & Sachets'}
catalogues={c:{p['image']:p for p in json.loads((root/f'assets/{c}-products.json').read_text())} for c in categories}
esc=lambda value:html.escape(value,quote=True)
for scent in scents:
 cards=[]
 for match in scent['matches']:
  product=catalogues[match['category']][match['image']];name=esc(product['name'])
  images=f'<img class="photo-single" src="{esc(product["image"])}" alt="Lanarve {name}" loading="lazy">'
  if product.get('packagingImage'):
   images=f'<span class="paired-photo">{images}<img class="photo-packaging" src="{esc(product["packagingImage"])}" alt="{name} with packaging" loading="lazy"></span>'
  card=f'<a class="crystal-item fragrance-collection-product" data-product-image="{esc(product["image"])}" href="{esc(match["href"])}">{images}<span class="eyebrow">{esc(categories[match["category"]])}</span><h3>{name}</h3><p class="fragrance-product-series">{esc(product["series"])}</p><span class="product-link">VIEW PRODUCT <span aria-hidden="true">↗</span></span></a>'
  cards.append('<div class="paired-product">'+card+'</div>' if product.get('packagingImage') else card)
 notes='<dl class="note-pyramid">'+''.join(f'<div><dt>{label}</dt><dd>{esc(" · ".join(scent[key]))}</dd></div>' for label,key in [('Top notes','top'),('Heart notes','heart'),('Base notes','base')])+'</dl>'
 total=(len(cards)+11)//12
 def filename(page):return scent['collectionHref'] if page==1 else scent['collectionHref'].replace('.html',f'-{page}.html')
 for page in range(1,total+1):
  shown=cards[(page-1)*12:page*12]
  links=(f'<a href="{filename(page-1)}" aria-label="Previous page">← Previous</a>' if page>1 else '<span class="disabled">← Previous</span>')
  links+=''.join(f'<a href="{filename(n)}"'+(' aria-current="page"' if n==page else '')+f'>{n}</a>' for n in range(1,total+1))
  links+=(f'<a href="{filename(page+1)}" aria-label="Next page">Next →</a>' if page<total else '<span class="disabled">Next →</span>')
  main=f'<main><section class="section fragrance-collection-intro"><a class="mood-breadcrumb" href="index.html?fragrances=open">Fragrance collections /</a><p class="eyebrow">{esc(" · ".join(scent["themes"]))}</p><h1>{esc(scent["name"])}</h1><p class="fragrance-collection-description">{esc(scent["description"])}</p>{notes}</section><section class="section fragrance-collection-catalogue"><div class="fragrance-collection-heading"><h2>Explore this scent</h2><p>{len(cards)} suggested product pairings</p></div><div id="fragrance-products" class="crystal-gallery">'+''.join(shown)+f'</div><p class="gallery-count">Showing {(page-1)*12+1}–{min(page*12,len(cards))} of {len(cards)} products · Page {page} of {total}</p><nav id="fragrance-pagination" class="pagination" aria-label="Fragrance collection pages">'+links+'</nav><p class="catalog-note">Suggested fragrance profile and design pairings. Contact us to confirm formulations and availability.</p></section></main>'
  text=re.sub(r'<body[^>]*>',f'<body data-fragrance="{scent["id"]}" data-fragrance-page="{page}" data-fragrance-pages="{total}">',base)
  text=re.sub(r'<title>.*?</title>',lambda m:f'<title>{esc(scent["name"])} — Lanarve Fragrance Collection</title>',text)
  text=re.sub(r'<main\b[^>]*>.*?</main>',lambda m:main,text,flags=re.S)
  (root/filename(page)).write_text(text)
 for path in root.glob(scent['collectionHref'].replace('.html','-*.html')):
  match=re.search(r'-(\d+)\.html$',path.name)
  if match and int(match[1])>total:
   target=filename(total)
   path.write_text(f'<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="refresh" content="0;url={target}"><title>Lanarve fragrance collection</title></head><body><a href="{target}">Explore fragrance options</a></body></html>')
print(f'Built {len(scents)} fragrance collections with 12 products per page.')
