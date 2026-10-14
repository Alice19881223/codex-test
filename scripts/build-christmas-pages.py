"""Rebuild Christmas pagination from the published catalogue, including relocated candles."""
from pathlib import Path
import json,re,math,html
root=Path(__file__).resolve().parents[1]
rows=json.loads((root/'assets/christmas-products.json').read_text())
base=(root/'christmas-collection.html').read_text()
def filename(n):return 'christmas-collection'+(f'-{n}' if n>1 else '')+'.html'
def card(p,i):
 name=html.escape(p['name'],quote=True);imgs=f'<img class="photo-single" src="{p["image"]}" alt="Lanarve {name}" loading="lazy">'
 if p.get('packagingImage'):imgs=f'<span class="paired-photo">{imgs}<img class="photo-packaging" src="{p["packagingImage"]}" alt="{name} with packaging" loading="lazy"></span>'
 a=f'<a class="crystal-item" data-photo="{i}" href="{p["image"]}">{imgs}<span class="eyebrow">{html.escape(p["series"])}</span><h3>{name}</h3><span class="product-link">VIEW PRODUCT ↗</span></a>'
 return '<div class="paired-product">'+a+f'<button type="button" class="photo-toggle" aria-pressed="false" aria-label="View packaging for {name}">View packaging</button></div>' if p.get('packagingImage') else a
total=math.ceil(len(rows)/12)
for page in range(1,total+1):
 start=(page-1)*12;s=re.sub(r'data-page="\d+"',f'data-page="{page}"',base)
 s=re.sub(r'(<div id="catalogue-grid"[^>]*>).*?(</div>\s*<p id="catalogue-count")',lambda m:m[1]+''.join(card(p,start+i) for i,p in enumerate(rows[start:start+12]))+m[2],s,flags=re.S)
 s=re.sub(r'(<p id="catalogue-count"[^>]*>).*?(</p>)',lambda m:m[1]+f'Showing {start+1}–{min(start+12,len(rows))} of {len(rows)} products · Page {page} of {total}'+m[2],s)
 links=(f'<a href="{filename(page-1)}" aria-label="Previous page">← Previous</a>' if page>1 else '<span class="disabled">← Previous</span>')
 links+=''.join(f'<a href="{filename(n)}"'+(' aria-current="page"' if n==page else '')+f'>{n}</a>' for n in range(1,total+1))
 links+=f'<a href="{filename(page+1)}" aria-label="Next page">Next →</a>' if page<total else '<span class="disabled">Next →</span>'
 s=re.sub(r'(<nav id="pagination"[^>]*>).*?</nav>',lambda m:m[1]+links+'</nav>',s,flags=re.S)
 (root/filename(page)).write_text(s)
for path in root.glob('christmas*.html'):
 if path.name.startswith('christmas-collection'):continue
 match=re.search(r'-(\d+)\.html$',path.name);page=int(match[1]) if match else 1
 path.write_text((root/filename(min(page,total))).read_text())
print(f'Christmas: {len(rows)} products, {total} pages')
