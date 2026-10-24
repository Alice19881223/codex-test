"""Deterministic stdlib-only SEO/static-content pass over generated HTML.
Runs after page generators, before immutable asset versioning and deployment staging.
Does not change product identities, catalogue source images, scent assignments or URLs.
"""
from pathlib import Path
from urllib.parse import urljoin,urlsplit,parse_qsl,urlencode,urlunsplit
import csv,html,json,re,collections,hashlib
ROOT=Path(__file__).resolve().parents[1]
CHRISTMAS_VERSION=hashlib.sha256((ROOT/'assets/catalogue-order.json').read_bytes()).hexdigest()[:12]
CANDLE_VERSION=hashlib.sha256((ROOT/'assets/candle-collections.json').read_bytes()+(ROOT/'assets/candle-products.json').read_bytes()).hexdigest()[:12]
LISTING_VERSION=hashlib.sha256(b''.join((ROOT/'assets'/name).read_bytes() for name in ['candle-collections.json','reed-collections.json','catalogue-layouts.json','fragrances.json'])).hexdigest()[:12]
LISTING_URLS={p.name for p in ROOT.glob('*.html') if re.search(r'id="(?:catalogue-grid|fragrance-products)"',p.read_text())}
CONFIG=json.loads((ROOT/'assets/seo-config.json').read_text());ORIGIN=CONFIG['origin']
PRODUCTS=json.loads((ROOT/'assets/product-details.json').read_text());BY_URL={r['url']:r for r in PRODUCTS}
VERSIONED_PRODUCT_URLS={r['url'] for r in PRODUCTS if r['series'] in {'Wild Elegance','Everyday Poetry','Spring & Summer Light','Spring & Summer Stillness','Spring & Summer Together'}}
SCENTS={s['id']:s for s in json.loads((ROOT/'assets/fragrances.json').read_text())}
MEDIA=json.loads((ROOT/'assets/image-manifest.json').read_text()) if (ROOT/'assets/image-manifest.json').exists() else {}
REVERSE={v['src']:k for k,v in MEDIA.items()}
for k,v in MEDIA.items():
 for item in v['variants']:REVERSE[item['src']]=k
CATALOGUES={c:json.loads((ROOT/f'assets/{c}-products.json').read_text()) for c in ['candle','reed','crystal','gift','christmas','sachets']}
PHOTO={p['image']:p for rows in CATALOGUES.values() for p in rows}
CATEGORY={
 'candle':('products-current.html','Scented candles','wholesale scented candles'),
 'reed':('reed-collections.html','Reed diffusers','wholesale reed diffusers'),
 'crystal':('products-crystal-1.html','Crystal diffusers','wholesale crystal diffusers'),
 'gift':('gift-collection.html','Fragrance gift sets','wholesale fragrance gift sets'),
 'christmas':('christmas-collection.html','Christmas fragrance gifts','wholesale Christmas candles'),
 'sachets':('sachets.html','Wax tablets & fragrance sachets','wholesale wax tablets and fragrance sachets')}
COLLECTIONS={}
for cat in ['candle','reed']:
 for c in json.loads((ROOT/f'assets/{cat}-collections.json').read_text()):
  for n in range(1,len(c['pages'])+1):COLLECTIONS[('candles-' if cat=='candle' else 'reeds-')+c['slug']+(f'-{n}' if n>1 else '')+'.html']=(cat,c,n)
esc=lambda x:html.escape(str(x),quote=True)
def absolute(path):return ORIGIN+'/' if path=='index.html' else urljoin(ORIGIN+'/',path)
def plain(text):return html.unescape(re.sub(r'<[^>]+>',' ',text)).strip()
def attr(tag,name):
 m=re.search(r'(?<![\w-])'+re.escape(name)+r'="([^"]*)"',tag);return html.unescape(m[1]) if m else None
def set_attr(tag,name,value):
 pattern=r'(?<![\w-])'+re.escape(name)+r'="[^"]*"'
 pair=f'{name}="{esc(value)}"'
 return re.sub(pattern,lambda m:pair,tag,count=1) if re.search(pattern,tag) else tag[:-1]+' '+pair+'>'
def remove_attr(tag,name):return re.sub(r'\s+'+re.escape(name)+r'="[^"]*"','',tag)
def set_inner(text,id,value):
 start=re.search(r'<([a-z][\w-]*)\b[^>]*\bid="'+re.escape(id)+r'"[^>]*>',text)
 if not start:return text
 tag=start[1];depth=1
 for m in re.finditer(r'</?'+tag+r'\b[^>]*>',text[start.end():]):
  depth+=-1 if m[0].startswith('</') else 1
  if depth==0:
   end=start.end()+m.start();return text[:start.end()]+value+text[end:]
 raise ValueError('Unclosed '+id)
def remove_managed(text):
 text=re.sub(r'<script\b[^>]*data-seo-managed="true"[^>]*>.*?</script>','',text,flags=re.S)
 text=re.sub(r'<(?:meta|link)\b[^>]*data-seo-managed="true"[^>]*>','',text)
 # These are generated blocks, not editorial source copy; replace them idempotently.
 text=re.sub(r'<!-- seo:(.*?) -->.*?<!-- /seo:\1 -->','',text,flags=re.S)
 return text
def block(name,value):return f'<!-- seo:{name} -->{value}<!-- /seo:{name} -->'
def insert_main(text,value):return re.sub(r'(<main\b[^>]*>)',lambda m:m[1]+value,text,count=1)
def replace_main(text,value):return re.sub(r'<main\b[^>]*>.*?</main>',lambda m:value,text,count=1,flags=re.S)
def replace_h1(text,value):
 main=re.search(r'<main\b[^>]*>.*?</main>',text,re.S)
 if not main:return text
 part=re.sub(r'(<h1\b[^>]*>).*?</h1>',lambda m:m[1]+value+'</h1>',main[0],count=1,flags=re.S)
 return text[:main.start()]+part+text[main.end():]
def note_pyramid(s):return '<dl class="note-pyramid">'+''.join('<div><dt>'+label+'</dt><dd>'+esc(' · '.join(s[key]))+'</dd></div>' for label,key in [('Top notes','top'),('Heart notes','heart'),('Base notes','base')])+'</dl>'
def smells(s):return s['description'].split(';')[0]+'. A first impression of '+ ' and '.join(s['top']).lower()+' opens into '+' and '.join(s['heart']).lower()+', resting on '+' and '.join(s['base']).lower()+'.'
def static_scent(text,r):
 s=SCENTS[r['primaryScent']]
 values={'product-short-description':esc(s['description']),'product-scent-tags':''.join('<span>'+esc(t)+'</span>' for t in s['themes']),'product-key-notes':esc('. '.join(s['keyNotes'])+'.'),'product-smells-like':esc(smells(s)),'product-notes':note_pyramid(s),'product-mood':esc(s['description']),'product-spaces':esc((s['description'].split(';')[-1]).strip().capitalize())}
 chars=[next(c for c in s['character'] if c['source']==stage) for stage in ['top','heart','base']]
 values['product-character']='<h3>Scent Character</h3><div class="scent-character-bar" role="img" aria-label="'+esc(', '.join(c['label']+' ('+c['source']+' notes) '+str(c['value'])+'%' for c in chars))+'">'+''.join(f'<span class="character-tone-{i}" style="width:{c["value"]}%"></span>' for i,c in enumerate(chars))+'</div><ul class="scent-character-legend">'+''.join(f'<li><i class="character-tone-{i}"></i><span>{esc(c["label"])}<em>{c["source"].title()} notes</em></span> <small>{c["value"]}%</small></li>' for i,c in enumerate(chars))+'</ul><p class="scent-character-note">Illustrative scent impression, not ingredient percentages.</p>'
 for id,value in values.items():text=set_inner(text,id,value)
 return text
SERVICE_MAIN='''<main><section class="section seo-service-intro"><p class="eyebrow">PRIVATE LABEL · OEM / ODM</p><h1>Home fragrance, made for your brand.</h1><p>Develop a coordinated home fragrance collection with Lanarve in Ningbo, China. We welcome enquiries from independent homeware shops, gift retailers, lifestyle stores and small brands.</p><div class="seo-actions"><a class="button dark" href="contact.html">Discuss your collection ↗</a><a class="text-link" href="brochures.html">Explore seasonal brochures ↗</a></div></section><section class="section seo-service-products"><h2>Choose the formats for your collection</h2><p>Start with a design from our catalogue, then discuss the fragrance, brand presentation and packaging you need.</p><div class="seo-category-links"><a href="products-current.html">Scented candles</a><a href="reed-collections.html">Reed diffusers</a><a href="products-crystal-1.html">Crystal diffusers</a><a href="gift-collection.html">Fragrance gift sets</a><a href="christmas-collection.html">Christmas collections</a></div></section><section class="section seo-service-options"><h2>Private label and customization options</h2><div class="seo-service-grid"><article><h3>Fragrance direction</h3><p>Explore the <a href="fragrance.html">fragrance library</a>, from florals and fresh notes to tea and woods. Availability and the final formulation are confirmed for your selected design.</p></article><article><h3>Vessel and presentation</h3><p>Discuss your preferred design, colour, finish and decoration. Changes are assessed against the chosen format and production requirements.</p></article><article><h3>Logo, labels and gift packaging</h3><p>Share your artwork and intended retail presentation. Box format, materials, inserts and pack contents are agreed as part of the quotation.</p></article></div></section><section class="section seo-service-process"><h2>From an idea to an agreed specification</h2><ol><li><strong>Share your brief.</strong> Tell us your product formats, intended market, quantity and preferred fragrance direction.</li><li><strong>Review the options.</strong> Discuss design, decoration and packaging, and request the relevant product specification.</li><li><strong>Confirm a sample.</strong> Review the proposed sample and artwork before agreeing the order details.</li><li><strong>Agree your quotation.</strong> Confirm MOQ, final specifications, production schedule, packing and applicable documentation with our team.</li></ol><h2>What to include in your enquiry</h2><p>Send the product name or item number, quantity, destination country, preferred scent, packaging brief and any product documentation requirements. MOQ, specifications and production lead time depend on the agreed brief; no universal minimum is published.</p><a class="button dark" href="contact.html">Request a private label quotation ↗</a></section></main>'''
def build_special_pages():
 base=(ROOT/'contact.html').read_text()
 base=remove_managed(base)
 service=replace_main(base,SERVICE_MAIN)
 service=service.replace('class="nav-picture active"','class="nav-picture"').replace(' aria-current="page"','')
 (ROOT/'private-label.html').write_text(service)
 base=remove_managed((ROOT/'products-crystal-1.html').read_text())
 base=re.sub(r'<body[^>]*>','<body>',base)
 base=base.replace('class="nav-picture active"','class="nav-picture"').replace(' aria-current="page"','')
 base=re.sub(r'class="nav-picture fragrance-toggle[^"]*"','class="nav-picture fragrance-toggle active"',base)
 cards=''.join('<article><h2><a href="'+esc(s['collectionHref'])+'">'+esc(s['name'])+'</a></h2><p>'+esc(s['description'])+'</p><p class="seo-fragrance-notes">'+esc(' · '.join(s['keyNotes']))+'</p></article>' for s in SCENTS.values())
 library='<main><section class="section seo-library-intro"><p class="eyebrow">FRAGRANCE DIRECTIONS</p><h1>Fragrance options for your home fragrance collection</h1><p>Explore scent directions for candles, reed diffusers, crystals and gift sets. These are suggested design pairings; final formulation and availability are confirmed with your sample or quotation.</p><p><a class="text-link" href="private-label.html">Plan a private label collection ↗</a></p><div class="seo-fragrance-library">'+cards+'</div></section></main>'
 base=replace_main(base,library);base=re.sub(r'<meta\b[^>]*http-equiv="refresh"[^>]*>','',base)
 (ROOT/'fragrance.html').write_text(base)
 (ROOT/'404.html').write_text('''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><title>Page not found | Lanarve</title><style>body{margin:0;background:#f7f5ef;color:#35372d;font:18px/1.7 Arial,sans-serif}main{max-width:780px;padding:70px 25px;margin:auto}img{width:260px;height:auto}h1{font-size:42px;line-height:1.2}a{color:#294b31}li{margin:12px 0}</style></head><body><main><a href="/" aria-label="Lanarve home"><img src="/assets/lanarve-logo-green.svg" alt="Lanarve" width="300" height="79"></a><h1>We couldn’t find that page.</h1><p>The address may be outdated. Explore our current collections or contact us with the product you are looking for.</p><ul><li><a href="/">Lanarve home</a></li><li><a href="/products-current.html">Scented candles</a></li><li><a href="/reed-collections.html">Reed diffusers</a></li><li><a href="/gift-collection.html">Fragrance gift sets</a></li><li><a href="/contact.html">Contact Lanarve</a></li></ul></main></body></html>''')
PAGES={
 'index.html':('Wholesale Candles & Private Label Home Fragrance | Lanarve','Explore scented candles, reed diffusers, crystal diffusers and fragrance gift sets from Lanarve. Discuss wholesale, private label and OEM/ODM enquiries.','wholesale home fragrance manufacturer','Supplier discovery / broad B2B sourcing'),
 'products-current.html':('Wholesale Scented Candles & Private Label Designs | Lanarve','Browse Lanarve scented candle designs by collection. Explore coordinated colours and fragrance directions, then enquire about wholesale and private label options.','wholesale scented candles','Candle category / retail assortment'),
 'reed-collections.html':('Wholesale Reed Diffusers & Private Label Options | Lanarve','Discover Lanarve reed diffuser collections for homeware and gift retailers. Discuss fragrance, bottle presentation, packaging and private label requirements.','wholesale reed diffusers','Diffuser category / sourcing'),
 'products-crystal-1.html':('Wholesale Crystal Diffusers & Fragrance Designs | Lanarve','Explore Lanarve crystal diffuser designs for decorative home fragrance collections. Enquire about fragrance direction, presentation and private label options.','wholesale crystal diffusers','Crystal category / design discovery'),
 'gift-collection.html':('Wholesale Fragrance Gift Sets & Private Label | Lanarve','Discover coordinated Lanarve fragrance gift sets for gift shops and lifestyle stores. Discuss your product pairing, scent, branding and packaging brief.','wholesale fragrance gift sets','Gift set category / B2B gifting'),
 'christmas-collection.html':('Wholesale Christmas Candles & Fragrance Gifts | Lanarve','Explore Lanarve Christmas candle and fragrance gift designs. Build a coordinated festive assortment and discuss branding, fragrance and packaging requirements.','wholesale Christmas candles','Seasonal purchasing'),
 'sachets.html':('Wholesale Wax Tablets & Fragrance Sachets | Lanarve','Browse Lanarve decorative wax tablets and fragrance sachets. Explore compact gifting designs and discuss scent, labels, packaging and wholesale enquiries.','wholesale fragrance sachets','Accessory category / gifting'),
 'private-label.html':('Private Label Candles & Home Fragrance OEM/ODM | Lanarve','Plan a private label home fragrance collection with Lanarve. Discuss candle and diffuser designs, fragrance, logo, packaging, samples and your OEM/ODM brief.','private label home fragrance','Customization / supplier qualification'),
 'fragrance.html':('Fragrance Library for Candles & Diffusers | Lanarve','Explore Lanarve fragrance directions, key notes and suggested product pairings for candles, diffusers and gift sets. Discuss the scent for your private label brief.','private label fragrance options','Scent selection / support for sourcing'),
 'contact.html':('Contact Lanarve | Wholesale & Private Label Enquiries','Contact Lanarve in Ningbo about wholesale candles, diffusers, gift sets and private label projects. Share your product reference, quantity and destination market.','Lanarve wholesale enquiry','Enquiry / conversion'),
 'brochures.html':('Home Fragrance Wholesale Brochures | Lanarve','Download Lanarve spring/summer and autumn/winter product brochures. Explore colour-led candle, diffuser and gift set designs for your next retail collection.','Lanarve wholesale catalogue','Catalogue download / assortment planning'),
 'company-film.html':('Lanarve Company & Home Fragrance Film','Watch Lanarve’s company and product film, featuring production details, candles, reed diffusers, crystals and fragrance gift sets. Explore our wholesale collections.','Lanarve company film','Branded supplier research')}
CATEGORY_INTROS={
 'products-current.html':('Wholesale scented candles','Explore candle designs grouped by everyday moments. Build a coordinated assortment for your shop or brand, then discuss fragrance and packaging options.'),
 'reed-collections.html':('Wholesale reed diffusers','Explore flame-free fragrance designs by collection. Compare colours and presentation, then enquire about fragrance direction, branding and packaging.'),
 'products-crystal-1.html':('Wholesale crystal diffusers','Discover decorative crystal fragrance formats for your collection. Select a design and discuss fragrance oil, presentation and packaging requirements.'),
 'gift-collection.html':('Wholesale fragrance gift sets','Compare coordinated fragrance pairings for retail gifting. Ask us about the shown design, your preferred scent and a branded packaging brief.'),
 'christmas-collection.html':('Christmas candles & fragrance gifts','Explore a coordinated festive range for your shop or brand. Discuss product references, quantities, scent direction and Christmas packaging.'),
 'sachets.html':('Wax tablets & fragrance sachets','Explore compact fragrance designs for thoughtful gifting. Confirm your chosen format, fragrance direction, labels and packaging with our team.')}
def category_first(cat):return CATEGORY[cat][0]
def image_url(src):return absolute(MEDIA.get(src,{}).get('src',src))
def product_kind(r):
 p=PHOTO[r['image']]
 if p.get('productType'):return p['productType']
 if r['category']=='christmas':return 'Fragrance Gift Set' if 'Gift Set' in p['name'] else 'Scented Wax Ornament' if 'Ornament' in p['name'] else 'Scented Candle'
 if r['category']=='sachets':return 'Fragrance Sachet' if 'Sachet' in p['series'] else 'Scented Wax Tablet'
 return {'candle':'Scented Candle','reed':'Reed Diffuser','crystal':'Crystal Diffuser','gift':'Fragrance Gift Set'}[r['category']]
def optimize_image(tag,path):
 original=REVERSE.get(attr(tag,'src'),attr(tag,'src'));info=MEDIA.get(original)
 if not info:return tag
 tag=set_attr(tag,'src',info['src']);tag=set_attr(tag,'width',info['width']);tag=set_attr(tag,'height',info['height']);tag=set_attr(tag,'decoding','async')
 klass=attr(tag,'class') or '';id=attr(tag,'id');is_hero='hero-slide' in klass
 # The carousel image's class can be on its parent, so identify by home hero source.
 home_hero=path=='index.html' and original in ['assets/lanarve-candle-editorial.png','assets/lanarve-reed-editorial.png','assets/lanarve-crystal-editorial.png']
 primary=(path=='index.html' and original=='assets/lanarve-candle-editorial.png') or id=='product-main-image'
 if primary:tag=set_attr(set_attr(tag,'loading','eager'),'fetchpriority','high')
 elif 'brand-wordmark' not in klass:tag=set_attr(tag,'loading','lazy')
 if info['variants']:
  tag=set_attr(tag,'srcset',', '.join(v['src']+' '+str(v['width'])+'w' for v in info['variants']))
  sizes='(max-width: 650px) 92vw, 50vw' if id=='product-main-image' else '100vw' if home_hero else '(max-width: 650px) 44vw, (max-width: 1100px) 30vw, 24vw'
  if original.startswith('assets/fragrance-'):sizes='(max-width: 650px) 40vw, 200px'
  if 'thumbnail' in klass:sizes='100px'
  tag=set_attr(tag,'sizes',sizes)
 # Product-specific alt text for original generic thumbnails/packaging.
 if path in BY_URL:
  r=BY_URL[path];alt=attr(tag,'alt') or ''
  if original==r['image']:tag=set_attr(tag,'alt',r['name']+' — '+product_kind(r).lower()+' design by Lanarve')
  elif original==PHOTO[r['image']].get('packagingImage'):tag=set_attr(tag,'alt',r['name']+' — packaging or alternate product view')
 return tag

def build():
 build_special_pages();keyword_rows=[];redirects=[];indexable=[];allmeta={};names=collections.Counter((r['name'],r['category']) for r in PRODUCTS)
 for path in sorted(ROOT.glob('*.html')):
  if path.name=='404.html':continue
  name=path.name;text=remove_managed(path.read_text());redirect=re.search(r'http-equiv="refresh"[^>]*content="[^"]*url=([^";]+)',text);target=html.unescape(redirect[1]) if redirect else None
  canonical_name=name;h1=None;crumbs=[('Home','index.html')];schema=[];intent='';primary='';page=1
  if target:
   # Relative query-free canonical points to the real destination; retain visible fallback.
   target_path=urlsplit(target).path
   assert (ROOT/target_path).is_file(),(name,target)
   canonical_name=target_path;title='Collection moved | Lanarve';description='Explore the current Lanarve product collection.'
   redirects.append((name,target,'HTML meta refresh (HTTP 200 on GitHub Pages; not a server 301)'))
  elif name in BY_URL:
   r=BY_URL[name];s=SCENTS[r['primaryScent']];kind=product_kind(r)
   label=r['name'] if any(word in r['name'].lower() for word in ['candle','diffuser','gift set','fragrance set','wax tablet','sachet','ornament']) else r['name']+' '+kind
   title=label+(' — '+r['series'] if names[(r['name'],r['category'])]>1 else '')+' | Lanarve'
   description=f'Explore {r["name"]} from Lanarve’s {r["series"]} designs. Discuss {s["name"]} fragrance, private label presentation and packaging for your collection.'
   text=static_scent(text,r);text=replace_h1(text,esc(label))
   text=re.sub(r'<div class="product-breadcrumb">.*?</div>','',text,flags=re.S)
   # Keep scent detail static; changing a selected option remains a client-side enhancement.
   intro=f'<p class="seo-product-intro">Explore {esc(r["name"])} from the {esc(r["series"])} series for your retail or private label collection. Discuss fragrance, presentation and packaging options.</p><p class="seo-product-links"><a href="private-label.html">Private label options</a></p>'
   text=set_inner(text,'product-inspiration',esc('Explore '+s['name']+' for the '+r['name']+' design. '+s['description']))
   text=text.replace('<p class="product-reference">',block('product-intro',intro)+'<p class="product-reference">',1)
   cat=r['category'];crumbs.append((CATEGORY[cat][1],category_first(cat)))
   if r['collectionHref']!=category_first(cat):crumbs.append((r['collection'],r['collectionHref']))
   crumbs.append((r['name'],name));primary=r['name']+' '+kind.lower()+' private label';intent='Design-specific product enquiry'
   schema.append({'@type':'Product','@id':absolute(name)+'#product','name':label,'sku':r['itemNo'],'url':absolute(name),'brand':{'@type':'Brand','name':CONFIG['brand']},'category':kind,'image':[image_url(x) for x in PHOTO[r['image']].get('images',[r['image']])], 'description':plain(intro)+' '+s['description'],'additionalProperty':[{'@type':'PropertyValue','name':'Design series','value':r['series']},{'@type':'PropertyValue','name':'Suggested fragrance direction','value':s['name']}]})
  elif name in COLLECTIONS:
   cat,c,page=COLLECTIONS[name];noun='Candles' if cat=='candle' else 'Reed Diffusers'
   title=f'{c["name"]} {noun}'+(f' — Page {page}' if page>1 else '')+' | Lanarve'
   description=f'Explore {c["name"]}, a Lanarve {noun.lower()} collection. {c["description"]} Discuss wholesale, fragrance and private label options.'+(f' Page {page} of {len(c["pages"])}.' if page>1 else '')
   primary=c['name']+' '+noun.lower()+' wholesale';intent='Theme / coordinated retail assortment';crumbs+=[(CATEGORY[cat][1],category_first(cat)),(c['name']+(f' — Page {page}' if page>1 else ''),name)]
   text=insert_main(text,block('collection-context','<p class="seo-collection-context">'+esc(c['name'])+' '+noun.lower()+' for wholesale and private label collections. <a href="private-label.html">Explore customization options</a>.</p>'))
  elif re.search(r'data-fragrance="([^"]+)"',text):
   s=SCENTS[re.search(r'data-fragrance="([^"]+)"',text)[1]];title=s['name']+' Candles & Diffuser Options | Lanarve';description='Explore '+s['name']+' fragrance notes and suggested Lanarve candle, diffuser and gift pairings. Discuss your private label scent and packaging brief.';primary=s['name']+' home fragrance';intent='Scent discovery / product pairings';crumbs+=[('Fragrance library','fragrance.html'),(s['name'],name)]
   page=int(attr(re.search(r'<body[^>]*>',text)[0],'data-fragrance-page') or 1)
   if page>1:
    title=title.replace(' | Lanarve',f' — Page {page} | Lanarve');description+=f' Page {page}.'
  else:
   # Give each paginated category its own canonical and metadata, not page 1's canonical.
   rootname=name
   for prefix,first in [('products-crystal-','products-crystal-1.html'),('gift-collection-','gift-collection.html'),('christmas-collection-','christmas-collection.html')]:
    m=re.match(re.escape(prefix)+r'(\d+)\.html$',name)
    if m:rootname=first;page=int(m[1]);break
   if name=='products.html':rootname='products-current.html';canonical_name='products-current.html'
   if name=='products-reed-1.html':rootname='reed-collections.html';canonical_name='reed-collections.html'
   if rootname not in PAGES:raise ValueError('Unclassified public page: '+name)
   title,description,primary,intent=PAGES[rootname]
   if page>1:title=title.replace(' | Lanarve',f' — Page {page} | Lanarve');description+=f' Page {page}.'
   if rootname in CATEGORY_INTROS:
    heading,body=CATEGORY_INTROS[rootname]
    main=re.search(r'<main\b[^>]*>.*?</main>',text,re.S)
    has_h1=bool(main and re.search(r'<h1\b',main[0]))
    intro='<section class="seo-category-intro">'+('' if has_h1 else '<h1>'+esc(heading)+'</h1>')+'<p>'+esc(body)+' <a href="private-label.html">Explore private label options</a>.</p></section>'
    if has_h1:text=replace_h1(text,esc(heading))
    text=insert_main(text,block('category-intro',intro))
   if rootname=='index.html':
    text=replace_h1(text,'Wholesale home fragrance.<br><em>For your brand.</em>')
    intro='<section class="section seo-buyer-intro"><h2>Build your next home fragrance collection.</h2><p>Explore <a href="products-current.html">scented candles</a>, <a href="reed-collections.html">reed diffusers</a>, <a href="products-crystal-1.html">crystal diffusers</a> and <a href="gift-collection.html">fragrance gift sets</a> for homeware shops, gift retailers, lifestyle stores and small brands. Discuss wholesale supply, <a href="private-label.html">private label and OEM/ODM options</a> with Lanarve in Ningbo, China.</p></section>'
    text=text.replace('</main>',block('buyer-intro',intro)+'</main>',1)
    schema.extend([{'@type':'Organization','@id':ORIGIN+'/#organization','name':CONFIG['brand'],'legalName':CONFIG['legalName'],'url':ORIGIN+'/','logo':absolute('assets/lanarve-logo-green.svg'),'address':{'@type':'PostalAddress','addressLocality':'Ningbo','addressRegion':'Zhejiang','addressCountry':'CN'},'contactPoint':[{'@type':'ContactPoint','contactType':'sales','email':email,'telephone':phone,'availableLanguage':'English'} for email,phone in zip(CONFIG['emails'],CONFIG['phones'])]},{'@type':'WebSite','@id':ORIGIN+'/#website','url':ORIGIN+'/','name':CONFIG['brand'],'publisher':{'@id':ORIGIN+'/#organization'}}])
   if name!='index.html':crumbs.append(({'private-label.html':'Private label & OEM/ODM','fragrance.html':'Fragrance library','contact.html':'Contact','brochures.html':'Brochures','company-film.html':'Company film'}.get(rootname,CATEGORY_INTROS.get(rootname,(plain(title.split('|')[0]),))[0])+(f' — Page {page}' if page>1 else ''),name))
  if not target and 'id="catalogue-grid"' in text:
   catalogue_heading=COLLECTIONS[name][1]['name']+' designs' if name in COLLECTIONS else 'Explore available designs'
   text=text.replace('<div id="catalogue-grid"',block('catalogue-heading','<h2 class="seo-catalogue-heading">'+esc(catalogue_heading)+'</h2>')+'<div id="catalogue-grid"',1)
  # Strip inherited/generated SEO metadata before writing the page's own values.
  text=re.sub(r'<title>.*?</title>',lambda m:'<title>'+esc(title)+'</title>',text,count=1,flags=re.S)
  text=re.sub(r'<meta\b[^>]*(?:name="(?:description|robots|twitter:[^"]+)"|property="og:[^"]+")[^>]*>','',text)
  text=re.sub(r'<link\b[^>]*rel="canonical"[^>]*>','',text)
  noindex=bool(target) or name=='products-reed-1.html';canonical=absolute(canonical_name)
  if len(crumbs)>1 and not target:
   # Avoid duplicated category/home nodes and show exactly what the breadcrumb JSON-LD describes.
   clean=[]
   for label,url in crumbs:
    if not clean or url!=clean[-1][1]:clean.append((label,url))
   crumbs=clean
   schema.append({'@type':'BreadcrumbList','itemListElement':[{'@type':'ListItem','position':i,'name':label,'item':absolute(url)} for i,(label,url) in enumerate(crumbs,1)]})
   nav='<nav class="seo-breadcrumbs" aria-label="Breadcrumb">'+''.join(('<span aria-current="page">'+esc(label)+'</span>' if i==len(crumbs)-1 else '<a href="'+esc(url)+'">'+esc(label)+'</a>')+(' <span aria-hidden="true">/</span> ' if i<len(crumbs)-1 else '') for i,(label,url) in enumerate(crumbs))+'</nav>'
   text=insert_main(text,block('breadcrumbs',nav))
  if not target:
   # Collection pages can inherit an informational landing template on a rebuild.
   # Restore the data needed by legacy query redirects on actual catalogue grids.
   if 'id="catalogue-grid"' in text:
    text=re.sub(r'<script\b[^>]*src="catalog(?:-[a-f0-9]{12})?\.js"[^>]*></script>','',text)
    text=re.sub(r'(<script\b[^>]*src="app(?:-[a-f0-9]{12})?\.js"[^>]*></script>)',r'<script src="catalog.js" defer></script>\1',text,count=1)
   # Shared navigation no longer requires the 283 KB catalogue on informational pages.
   if name not in BY_URL and 'id="catalogue-grid"' not in text:text=re.sub(r'<script\b[^>]*src="catalog(?:-[a-f0-9]{12})?\.js"[^>]*></script>','',text)
   # A useful no-script path to enquire, alongside the enhanced WhatsApp form.
   if name in BY_URL:text=text.replace('</main>',block('noscript','<noscript><p class="seo-noscript">For a quote, <a href="contact.html">contact Lanarve</a> and include item '+esc(BY_URL[name]['itemNo'])+'. Fragrance selection and the enquiry builder use JavaScript; this page’s product information remains available without it.</p></noscript>')+'</main>',1)
   text=re.sub(r'<img\b[^>]*>',lambda m:optimize_image(m[0],name),text)
   def gallery_button(m):
    tag=m[0];src=REVERSE.get(attr(tag,'data-gallery-src'),attr(tag,'data-gallery-src'));info=MEDIA.get(src)
    if not info:return tag
    tag=set_attr(tag,'data-gallery-src',info['src'])
    return set_attr(tag,'data-gallery-srcset',', '.join(v['src']+' '+str(v['width'])+'w' for v in info['variants'])) if info['variants'] else tag
   text=re.sub(r'<button\b[^>]*data-gallery-src="[^"]+"[^>]*>',gallery_button,text)
  image=image_url(BY_URL[name]['image']) if name in BY_URL else image_url('assets/lanarve-candle-editorial.png')
  tags=f'<link data-seo-managed="true" rel="canonical" href="{esc(canonical)}"><meta data-seo-managed="true" name="description" content="{esc(description)}"><meta data-seo-managed="true" name="robots" content="'+('noindex,follow' if noindex else 'index,follow')+'">'
  for key,value in [('og:type','product' if name in BY_URL else 'website'),('og:site_name','Lanarve'),('og:title',title),('og:description',description),('og:url',canonical),('og:image',image),('og:image:alt',BY_URL[name]['name']+' fragrance design' if name in BY_URL else 'Lanarve home fragrance collection')]:tags+=f'<meta data-seo-managed="true" property="{key}" content="{esc(value)}">'
  tags+='<meta data-seo-managed="true" name="twitter:card" content="summary_large_image">'
  if schema:tags+='<script data-seo-managed="true" type="application/ld+json">'+json.dumps({'@context':'https://schema.org','@graph':schema},ensure_ascii=True).replace('<','\\u003c')+'</script>'
  text=text.replace('</head>',tags+'</head>',1)
  # Version collection navigation with the reviewed order so pagination cannot
  # return visitors to an older cached Christmas assortment. Canonicals stay clean.
  text=re.sub(r'(<a\b[^>]*\bhref=")(christmas-collection(?:-\d+)?\.html)(?:\?v=[a-f0-9]+)?(")',lambda m:m[1]+m[2]+'?v='+CHRISTMAS_VERSION+m[3],text)
  text=re.sub(r'(<a\b[^>]*\bhref=")((?:products-current|candles-[a-z0-9-]+)\.html)(?:\?v=[a-f0-9]+)?(")',lambda m:m[1]+m[2]+'?v='+CANDLE_VERSION+m[3],text)
  def version_candle_product(m):
   url=urlsplit(html.unescape(m[2]))
   if url.scheme or url.netloc or url.path not in VERSIONED_PRODUCT_URLS|LISTING_URLS:return m[0]
   query=dict(parse_qsl(url.query));query['v']=LISTING_VERSION if url.path in LISTING_URLS else CANDLE_VERSION
   return m[1]+esc(urlunsplit(('','',url.path,urlencode(query),url.fragment)))+m[3]
  text=re.sub(r'(<a\b[^>]*\bhref=")([^\"]+)(")',version_candle_product,text)
  path.write_text(text)
  allmeta[name]={'title':title,'description':description,'canonical':canonical,'indexable':not noindex and canonical_name==name,'type':'product' if name in BY_URL else 'redirect' if target else 'collection' if name in COLLECTIONS else 'page'}
  if canonical_name!=name and not target:redirects.append((name,canonical_name,'Canonical alias (preserved HTTP 200 content; no new server redirect)'))
  if allmeta[name]['indexable']:
   indexable.append(name);keyword_rows.append([name,primary,intent,'Keyword hypothesis; no measured volume or difficulty',title])
 # Keep sitemap entries deterministic; do not pretend every rebuild modified every page.
 sitemap='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+''.join('  <url><loc>'+html.escape(absolute(n))+'</loc></url>\n' for n in sorted(indexable))+'</urlset>\n'
 (ROOT/'sitemap.xml').write_text(sitemap)
 (ROOT/'robots.txt').write_text('User-agent: *\nAllow: /\nDisallow: /assets/downloads/\n\nSitemap: '+ORIGIN+'/sitemap.xml\n')
 report=ROOT/'docs/seo';report.mkdir(parents=True,exist_ok=True)
 (report/'page-metadata.json').write_text(json.dumps(allmeta,indent=2)+'\n')
 with (report/'keyword-map.csv').open('w',newline='') as f:
  w=csv.writer(f,lineterminator="\n");w.writerow(['URL path','Primary phrase / topic','Search intent','Evidence status','Title']);w.writerows(keyword_rows)
 with (report/'url-map.csv').open('w',newline='') as f:
  w=csv.writer(f,lineterminator="\n");w.writerow(['Existing URL (retained)','Preferred destination','Mechanism / hosting limitation']);w.writerows(redirects)
 print(f'SEO: {len(indexable)} indexable URLs, {len(PRODUCTS)} static product profiles, {len(redirects)} legacy/alias mappings')
if __name__=='__main__':build()
