"""Validate crawlable output, truthful schema, metadata and complete static fragrance content."""
from pathlib import Path
from urllib.parse import urlsplit,unquote
from html.parser import HTMLParser
import collections,html,json,re,sys,xml.etree.ElementTree as ET
ROOT=Path(__file__).resolve().parents[1];SITE=Path(sys.argv[1]) if len(sys.argv)>1 else ROOT/'_site'
CONFIG=json.loads((ROOT/'assets/seo-config.json').read_text());ORIGIN=CONFIG['origin'];products=json.loads((SITE/'assets/product-details.json').read_text());scents={s['id']:s for s in json.loads((SITE/'assets/fragrances.json').read_text())};meta=json.loads((ROOT/'docs/seo/page-metadata.json').read_text());errors=[]
def check(ok,message):
 if not ok:errors.append(message)
def local_path(url):
 p=urlsplit(html.unescape(url))
 if p.scheme and p.netloc!=urlsplit(ORIGIN).netloc:return None
 return unquote(p.path).lstrip('/') or 'index.html'
class Page(HTMLParser):
 def __init__(self,text):
  super().__init__(convert_charrefs=True);self.links=[];self.images=[];self.canonical=[];self.robots=[];self.h1=0;self.descriptions=[];self.ids=[];self.scripts=[];self.ld=[];self.capture=False;self.buffer='';self.feed(text)
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='h1':self.h1+=1
  if a.get('id'):self.ids.append(a['id'])
  if tag=='link' and a.get('rel')=='canonical':self.canonical.append(a.get('href'))
  if tag=='meta' and a.get('name')=='description':self.descriptions.append(a.get('content'))
  if tag=='meta' and a.get('name')=='robots':self.robots.append(a.get('content'))
  if tag=='img':self.images.append(a)
  for key in ['href','src','poster']:
   if a.get(key):self.links.append(a[key])
  if a.get('srcset'):
   self.links.extend(x.strip().split(' ')[0] for x in a['srcset'].split(','))
  if tag=='script':
   if a.get('src'):self.scripts.append(a['src'])
   if a.get('type')=='application/ld+json':self.capture=True;self.buffer=''
 def handle_data(self,data):
  if self.capture:self.buffer+=data
 def handle_endtag(self,tag):
  if tag=='script' and self.capture:self.ld.append(json.loads(self.buffer));self.capture=False
pages={};titles=[];descriptions=[];graph={};product_schema_count=0
for path in sorted(SITE.glob('*.html')):
 text=path.read_text();p=Page(text);pages[path.name]=p;graph[path.name]=set()
 for url in p.links:
  target=local_path(url)
  if target is None or url.startswith(('#','mailto:','tel:','data:','javascript:')):continue
  check((SITE/target).exists(),f'{path.name}: broken local resource {url}')
  if target.endswith('.html'):graph[path.name].add(target)
 if path.name=='404.html':
  check('noindex,follow' in p.robots,'404 must be noindex');continue
 check(len(p.canonical)==1,f'{path.name}: one canonical required')
 check(len(p.descriptions)==1 and bool(p.descriptions[0]),f'{path.name}: description required')
 check(p.canonical==[meta[path.name]['canonical']],f'{path.name}: canonical does not match registry')
 check(p.canonical[0].startswith(ORIGIN+'/') and not urlsplit(p.canonical[0]).query,f'{path.name}: canonical host/query invalid')
 check((SITE/local_path(p.canonical[0])).is_file(),f'{path.name}: canonical target missing')
 if meta[path.name]['indexable']:
  check(p.h1==1,f'{path.name}: expected one H1, found {p.h1}')
  check('noindex' not in ','.join(p.robots),f'{path.name}: indexable page blocked')
  titles.append(meta[path.name]['title']);descriptions.append(p.descriptions[0])
 for img in p.images:
  check('alt' in img,f'{path.name}: missing image alt')
  check(img.get('width','').isdigit() and img.get('height','').isdigit(),f'{path.name}: missing image dimensions for {img.get("src")}')
 for ld in p.ld:
  check(ld.get('@context')=='https://schema.org',f'{path.name}: invalid schema context')
  for item in ld.get('@graph',[]):
   if item.get('@type')=='Product':
    product_schema_count+=1
    check(not any(x in item for x in ['offers','aggregateRating','review','gtin','mpn','hasCertification']),f'{path.name}: unsupported commercial claims')
    check(item.get('sku') and item.get('brand',{}).get('name')=='Lanarve',f'{path.name}: missing product identity')
    for image in item.get('image',[]):check((SITE/local_path(image)).is_file(),f'{path.name}: schema image missing')
   if item.get('@type')=='BreadcrumbList':
    positions=[x['position'] for x in item['itemListElement']];check(positions==list(range(1,len(positions)+1)),f'{path.name}: invalid breadcrumb sequence')
 for src in p.scripts:
  if re.fullmatch(r'(app|product|catalog)-[0-9a-f]{12}\.js',src):
   import hashlib
   stem=src.split('-')[0];digest=hashlib.sha256((ROOT/(stem+'.js')).read_bytes()).hexdigest()[:12];check(src==f'{stem}-{digest}.js',f'{path.name}: stale {src}')
check(len(titles)==len(set(titles)),'Duplicate indexable titles');check(len(descriptions)==len(set(descriptions)),'Duplicate indexable descriptions')
for r in products:
 text=(SITE/r['url']).read_text();s=scents[r['primaryScent']];visible=html.unescape(text)
 check(r['itemNo'] in visible and r['name'] in visible,f'{r["url"]}: missing identity')
 notes_match=re.search(r'id="product-notes"[^>]*>(.*?)</dl>',text,re.S)
 static_notes=html.unescape(notes_match[1]) if notes_match else ''
 for note in s['top']+s['heart']+s['base']:check(note in static_notes,f'{r["url"]}: assigned note absent from the static note pyramid: {note}')
 for id in ['product-key-notes','product-notes','product-character']:
  check(not re.search(r'id="'+id+r'"[^>]*>\s*</',text),f'{r["url"]}: empty static scent block {id}')
 check('product-inquiry-form' in text and 'product-page-data' in text,f'{r["url"]}: enquiry workflow absent')
check(product_schema_count==len(products),'Expected one Product schema per current product')
for resource in re.findall(r'url\([\'\"]?([^\'\")]+)',(ROOT/'styles.css').read_text()):
 if not resource.startswith(('http:','https:','data:')):check((SITE/resource).is_file(),'Missing CSS resource '+resource)
xml=ET.parse(SITE/'sitemap.xml');locs=[x.text for x in xml.findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}loc')];expected={m['canonical'] for m in meta.values() if m['indexable']}
check(len(locs)==len(set(locs)) and set(locs)==expected,'Sitemap must exactly cover final canonical indexable URLs')
check(all(not urlsplit(u).query for u in locs),'Sitemap contains query URLs')
robot=(SITE/'robots.txt').read_text();check('Disallow: /\n' not in robot and ORIGIN+'/sitemap.xml' in robot,'robots blocks site or has incorrect sitemap')
check('Disallow: /product' not in robot,'robots must not block products')
visited=set();todo=['index.html']
while todo:
 n=todo.pop()
 if n in visited:continue
 visited.add(n);todo.extend(graph.get(n,set())-visited)
for n,m in meta.items():
 if m['indexable']:check(n in visited,f'Indexable page not reachable from homepage: {n}')
if errors:
 for e in errors:print('ERROR:',e)
 raise SystemExit(1)
print(f'SEO PASS: {len(locs)} sitemap URLs, {len(products)} static products, unique metadata, truthful schema, all indexable pages linked, image dimensions and local resources valid.')
