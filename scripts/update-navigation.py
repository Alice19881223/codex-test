from pathlib import Path
import os
os.chdir(Path(__file__).resolve().parents[1])
import re
icons={
'home':'<path d="m9 30 23-20 23 20M16 27v28h32V27M27 55V40h10v15"/><path d="M40 15c-2-9 4-12 13-12 0 9-5 15-13 12Z"/>',
'candle':'<path d="M19 28h26v24a6 6 0 0 1-6 6H25a6 6 0 0 1-6-6ZM32 28v-6"/><path d="M32 20c-9-4-6-11 0-17 0 6 9 12 0 17Z"/><path d="M26 39h.1m12 0h.1M28 47q4 4 8 0M48 20l4-4m-2 11h5"/>',
'reed':'<path d="M19 29h26v23a6 6 0 0 1-6 6H25a6 6 0 0 1-6-6ZM25 29 18 7m14 22V4m7 25 8-22"/><path d="M26 40h.1m12 0h.1M28 48q4 4 8 0"/>',
'crystal':'<path d="m14 35 11-15 14 2 11 13-16 23ZM14 35h36M25 20l-2 15 11 23 7-23-2-13M23 35h18"/><path d="m8 16 2-5 2 5 5 2-5 2-2 5-2-5-5-2ZM48 9l2-4 2 4 4 2-4 2-2 4-2-4-4-2Z"/>',
'gift':'<path d="M12 27h40v29H12ZM9 20h46v7H9ZM32 20v36M32 20C13 22 13 6 21 7c7 0 11 13 11 13Zm0 0c19 2 19-14 11-13-7 0-11 13-11 13Z"/>',
'christmas':'<path d="m32 4 2 5 6 1-5 4 1 6-4-3-4 3 1-6-5-4 6-1Z"/><path d="m31 21-12 13h6L13 46h9L15 54h34l-7-8h9L39 34h6L33 21M28 54v7h8v-7"/><circle cx="31" cy="34" r="2"/><circle cx="37" cy="45" r="2"/><path d="M26 45h.1"/>',
'sachets':'<path d="M10 18h20v32H10ZM20 18v-5c0-9 14-9 14 0"/><path d="M19 31c-7-8-14 3 0 10 14-7 7-18 0-10Z"/><path d="M39 26h13l5 28H34ZM39 22l6 4 7-4M40 37h.1m9 0h.1M41 43q3 3 6 0"/>',
'fragrance':'<path d="M32 35v24m0-12c-12-10-20-9-21-1 8 5 16 5 21 1m0 5c12-10 20-9 21-1-8 5-16 5-21 1"/><path d="M32 12c-9-15-22-1-12 8-17 0-14 19 1 18-8 13 12 20 16 7 8 11 23-3 12-12 17-5 7-22-6-15 0-15-15-19-11-6Z"/><circle cx="33" cy="27" r="5"/>',
'contact':'<rect x="8" y="19" width="48" height="34" rx="7"/><path d="m10 22 22 17 22-17M11 49l14-12m28 12L39 37M32 11c-8-9-17 2 0 10 17-8 8-19 0-10Z"/>'}
for key,paths in icons.items():
 Path(f'assets/nav-{key}.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><g fill="#e5ecd9" stroke="#486347" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">{paths}</g></svg>')
items=[('home','Who we are','index.html'),('candle','Scented candles','products-current.html'),('reed','Reed diffusers','products-reed-1.html'),('crystal','Crystal diffusers','products-crystal-1.html'),('gift','Gift setting','gift-collection.html'),('christmas','Christmas','christmas-collection.html'),('sachets','Tablets &amp; Sachets','sachets.html'),('fragrance','Fragrance','fragrance.html'),('contact','Let’s connect','contact.html')]
for p in Path('.').glob('*.html'):
 s=p.read_text()
 if '<header>' not in s:continue
 cat=re.search(r'data-category="([^"]+)"',s)
 active=cat[1] if cat else ('candle' if p.name in ['products-current.html','products.html'] else 'reed' if p.name=='products-reed-1.html' else 'home' if p.name=='index.html' else 'fragrance' if p.name=='fragrance.html' else 'contact' if p.name=='contact.html' else '')
 nav='<nav aria-label="Main navigation">'+''.join(f'<a class="nav-picture {"active" if k==active else ""}" href="{href}"'+(' aria-current="page"' if k==active else '')+f'><img src="assets/nav-{k}.svg" alt="" width="38" height="38"><span>{label}</span></a>' for k,label,href in items)+'</nav>'
 s=re.sub(r'<nav aria-label="Main navigation">.*?</nav>',lambda m:nav,s,count=1,flags=re.S)
 icon=active if active in icons else 'candle'
 s=s.replace('← Previous',f'<img class="page-picture" src="assets/nav-{icon}.svg" alt="" width="26" height="26"><span>‹ Previous</span>').replace('Next →',f'<span>Next ›</span><img class="page-picture" src="assets/nav-{icon}.svg" alt="" width="26" height="26">')
 s=s.replace('aria-label="Previous banner">←','aria-label="Previous banner"><span aria-hidden="true">‹</span><img src="assets/nav-candle.svg" alt="" width="22" height="22">').replace('aria-label="Next banner">→','aria-label="Next banner"><img src="assets/nav-candle.svg" alt="" width="22" height="22"><span aria-hidden="true">›</span>')
 p.write_text(s)
