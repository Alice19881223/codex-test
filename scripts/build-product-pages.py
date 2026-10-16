"""Build real-image B2B product pages; publish only supplied specifications and verified documents."""
from pathlib import Path
from urllib.parse import urlencode
import json,re,html
from product_records import item_no,product_url
root=Path(__file__).resolve().parents[1]
categories={'candle':'Scented candle','reed':'Reed diffuser','crystal':'Crystal diffuser','gift':'Fragrance gift set','christmas':'Seasonal fragrance','sachets':'Fragrance accessory'}
products={c:json.loads((root/f'assets/{c}-products.json').read_text()) for c in categories}
scents=json.loads((root/'assets/fragrances.json').read_text())
specifications=json.loads((root/'assets/product-specifications.json').read_text())
documents=json.loads((root/'assets/compliance-documents.json').read_text())
base=(root/'products-crystal-1.html').read_text()
esc=lambda value:html.escape(str(value),quote=True)
def home(category,product):
 if category in ['candle','reed']:
  key=product['series']+' | '+product['name'];cs=json.loads((root/f'assets/{category}-collections.json').read_text());c=next(c for c in cs if key in c['productKeys'])
  return ('candles-' if category=='candle' else 'reeds-')+c['slug']+'.html',c['name']
 return {'crystal':'products-crystal-1.html','gift':'gift-collection.html','christmas':'christmas-collection.html','sachets':'sachets.html'}[category],{'crystal':'Crystal diffusers','gift':'Gift setting','christmas':'Christmas','sachets':'Tablets & Sachets'}[category]
def kind(cat,p):
 if cat=='christmas':return 'Fragrance gift set' if 'Gift Set' in p['name'] else 'Scented wax ornament' if 'Ornament' in p['name'] else 'Scented candle'
 if cat=='sachets':return 'Fragrance sachet' if 'Sachet' in p['series'] else 'Scented wax tablet'
 return categories[cat]
def care(cat,p):
 if cat=='candle' or (cat=='christmas' and 'Ornament' not in p['name'] and 'Gift Set' not in p['name']):return 'Place on a stable, heat-resistant surface away from draughts, children, pets and flammable objects. Never leave a burning candle unattended. Follow the supplied wick, burn and extinguishing instructions; allow the vessel to cool before handling.'
 if cat=='reed':return 'Set the diffuser on a protected, stable surface away from direct sunlight, heat, children and pets. Follow the supplied directions when inserting or turning reeds. Avoid contact between fragrance liquid and skin, painted surfaces or furniture. Follow the product label for handling and disposal.'
 if cat=='crystal':return 'Place on a protected, stable surface. Add fragrance oil only as directed for the selected crystals and vessel. Keep oil away from skin, furniture, children and pets. Clean and maintain the vessel according to the supplied instructions.'
 return 'Follow the care instructions supplied for each component. Keep fragrance items away from children, pets, food and delicate surfaces. Store in a cool place away from direct sunlight; confirm placement and use instructions for the selected format.'
records=[];page_map={c:{} for c in products}
for cat,rows in products.items():
 for p in rows:
  ref=item_no(cat,p['image']);url=product_url(cat,p['image']);collection_href,collection=home(cat,p)
  assert p.get('assignedScent'),f'{ref}: missing assigned fragrance'
  recommended=[s['id'] for s in scents if any(m['category']==cat and m['image']==p['image'] for m in s['matches'])]
  related=[]
  for other_cat,other_rows in products.items():
   for other in other_rows:
    if other_cat==cat and other['image']==p['image']:continue
    shared=sum(any(m['category']==other_cat and m['image']==other['image'] for m in s['matches']) for s in scents if s['id'] in recommended)
    score=(100 if other_cat==cat and other['series']==p['series'] else 0)+shared*5+(1 if other_cat!=cat else 0)
    if score>1:related.append((score,other_cat,other))
  related=sorted(related,key=lambda x:-x[0])[:4]
  spec=specifications.get(ref,{})
  certs=[d for d in documents if d.get('verified') is True and ref in d.get('itemNos',[]) and (root/d.get('file','__missing__')).is_file()]
  for d in certs:
   assert d.get('thumbnail') and (root/d['thumbnail']).is_file(),'Verified documents require an actual preview image'
  title=p['name'] if kind(cat,p).lower() in p['name'].lower() else p['name']+' '+kind(cat,p)
  record=dict(itemNo=ref,category=cat,image=p['image'],name=p['name'],title=title,url=url,series=p['series'],collection=collection,collectionHref=collection_href,suggestedScents=recommended,primaryScent=p['assignedScent'],specifications=spec,documents=certs)
  records.append(record);page_map[cat][p['image']]=url
  images=[p['image']]+([p['packagingImage']] if p.get('packagingImage') else [])
  labels=p.get('viewLabels',['Product','Product & packaging'])
  gallery='<div class="product-main-image"><img id="product-main-image" src="'+esc(images[0])+'" alt="'+esc(title)+'" width="900" height="900" fetchpriority="high"></div>'
  gallery+='<div class="product-thumbnails" aria-label="Product gallery">'+''.join(f'<button type="button" data-gallery-src="{esc(image)}" aria-pressed="{str(i==0).lower()}" aria-label="View {esc(labels[min(i,len(labels)-1)])}"><img src="{esc(image)}" alt="{esc(labels[min(i,len(labels)-1)])}" width="100" height="100"></button>' for i,image in enumerate(images))+'</div>'
  gallery+='<p id="gallery-caption" class="product-caption">'+esc(labels[0])+'</p>'
  package='<figure class="product-packaging"><img src="'+esc(p['packagingImage'])+'" alt="'+esc(p['name'])+' packaging or alternate view" loading="lazy"><figcaption>'+esc(labels[-1])+'</figcaption></figure>' if p.get('packagingImage') else ''
  details={'Item No.':ref,'Product type':kind(cat,p),'Collection':p['series'],'Design / colour':'As photographed; final selection confirmed with sample','Capacity / net weight':spec.get('capacity','Request the specification for this design'),'Dimensions':spec.get('dimensions','Confirmed with your selected specification')}
  details_html='<dl class="product-spec-list">'+''.join(f'<div><dt>{esc(k)}</dt><dd>{esc(v)}</dd></div>' for k,v in details.items())+'</dl>'
  highlights={'candle':['Decorative candle design','Private label enquiries welcome'],'reed':['Flame-free fragrance format','Private label enquiries welcome'],'crystal':['Decorative crystal fragrance format','Flame-free use'],'gift':['Coordinated fragrance collection','Gift presentation shown'],'christmas':['Seasonal decorative design','Festive gifting concept'],'sachets':['Compact fragrance format','Private label enquiries welcome']}[cat]
  sections=[('Product Highlights','<ul>'+''.join('<li>'+esc(item)+'</li>' for item in highlights)+'</ul>'),('Product Details',details_html),('Materials & Craftsmanship','<p>'+esc(spec.get('materials','Discuss vessel, finish, fragrance composition and component specifications with our team. The photographs show the current design reference.'))+'</p>'),('Alternate Views' if p.get('alternateView') else 'Packaging',package+'<p>Packaging shown is a design reference. Box format, material, insert, pack contents and dimensions are confirmed in your quotation.</p>'),('Use & Care','<p>'+esc(care(cat,p))+'</p>')]
  if cat in ['reed','crystal']:sections.append(('Refills & Replacements','<p>Ask about compatible fragrance oil'+(' and replacement reeds' if cat=='reed' else '')+' for this design. Compatibility, supply format and availability are confirmed before ordering.</p>'))
  if spec.get('performance'):sections.append(('Fragrance Performance','<p>'+esc(spec['performance'])+'</p>'))
  sections.extend([('Private Label & Customization','<p>Discuss your logo, fragrance direction, labels, vessel finish and packaging. Requested changes are reviewed against the selected design and production requirements.</p>'),('MOQ, Sampling & Production Lead Time','<dl class="product-spec-list"><div><dt>Shown design</dt><dd>MOQ and availability are confirmed for your requested quantity.</dd></div><div><dt>Private label</dt><dd>MOQ depends on the fragrance, decoration and packaging brief.</dd></div><div><dt>Sampling</dt><dd>Request an existing-design or customized sample. Preparation time and sample costs are confirmed after review.</dd></div><div><dt>Production</dt><dd>Lead time is confirmed after final specifications, artwork and sample approval.</dd></div></dl>'),('Packing Information','<p>Request carton quantity, outer-carton dimensions, gross/net weight and packing specifications for your selected product and order.</p>')])
  cert_html=''.join(f'<a class="compliance-document" href="{esc(d["file"])}" target="_blank" rel="noopener"><img src="{esc(d["thumbnail"])}" alt="{esc(d["title"])} document preview" loading="lazy"><span>{esc(d["title"])}</span></a>' for d in certs)
  sections.append(('Documentation & Market Requirements',cert_html+'<p>Tell us your destination market and documentation requirements. Our team will confirm which product-specific specifications, safety documents and test reports can be provided for the selected formulation and packaging.</p>'))
  accordion=''.join(f'<details class="product-accordion"><summary>{label}</summary><div>{body}</div></details>' for label,body in sections)
  related_html=''.join(f'<a class="product-related-card" href="{product_url(c,o["image"])}"><img src="{esc(o["image"])}" alt="{esc(o["name"])}" loading="lazy"><span>{esc(o["name"])}</span></a>' for _,c,o in related)
  main=f'''<main class="product-detail-page"><div class="product-breadcrumb"><a href="{collection_href}">{esc(collection)}</a><span>/</span><span>{esc(p['name'])}</span></div><section class="product-overview"><div class="product-gallery" aria-label="Product Gallery">{gallery}</div><div class="product-purchase"><p class="eyebrow">LANARVE · {esc(p['series'])}</p><h1>{esc(title)}</h1><p class="product-reference">Item No. <strong>{ref}</strong></p><a class="product-collection-link" href="{collection_href}">Collection: {esc(collection)} ↗</a><p id="product-short-description">A thoughtfully presented fragrance design for beautiful everyday spaces.</p><div id="product-scent-tags" class="product-scent-tags"></div><div class="product-options"><h2>Available Options</h2><label>Fragrance direction<select id="product-fragrance"><option value="">Discuss fragrance options</option></select></label><label>Presentation<select id="product-presentation"><option value="Shown design">Shown design</option><option value="Gift packaging enquiry">Gift packaging enquiry</option><option value="Private label enquiry">Private label enquiry</option></select></label><label>Capacity / net weight requirement<input id="product-capacity" type="text" maxlength="120" placeholder="Tell us your preferred specification"></label><label>Requested quantity<input id="product-quantity" type="number" min="1" max="10000000" step="1" value="1" required></label></div><p class="product-confirmation-note">Fragrance availability, specifications and purchasing terms are confirmed in your quotation.</p><div class="product-primary-actions"><button type="button" class="button dark" id="add-to-inquiry">Add to Inquiry</button><button type="button" class="product-secondary-button" id="request-sample">Request a Sample ↗</button></div><p id="product-action-status" role="status"></p><details class="inquiry-basket"><summary>Inquiry list (<span id="inquiry-count">0</span>)</summary><div id="inquiry-items"></div><a href="#product-enquiry" class="text-link">Request a quote ↗</a></details></div></section><section class="product-scent-story" id="product-scent-story"><div><div class="product-key-notes-block"><h2>Key Notes</h2><p id="product-key-notes" class="product-key-notes"></p></div><div class="smells-like-card"><h2>Smells Like…</h2><p id="product-smells-like">Choose a fragrance direction above to explore its notes and mood.</p></div><div id="product-notes"></div><div id="product-character"></div></div><div><h2>The Inspiration</h2><p id="product-inspiration">Create a fragrance moment around your brand and the spaces your customers love.</p><h2>The Mood &amp; Moment</h2><p id="product-mood">Discuss your intended room, season and gifting occasion with our team.</p><h3>Ideal Spaces</h3><p id="product-spaces">Space and atmosphere suggestions follow the selected fragrance direction.</p><p class="product-confirmation-note">Fragrance directions are suggested pairings for this design.</p></div></section><section class="product-information"><p class="eyebrow">DESIGN, CARE &amp; SOURCING</p><h2>Made for your collection</h2>{accordion}</section><section class="product-related"><p class="eyebrow">THOUGHTFULLY PAIRED</p><h2>Complete the Collection</h2><div class="product-related-grid">{related_html}</div></section><section id="product-enquiry" class="product-enquiry"><div><p class="eyebrow">LET’S CREATE SOMETHING BEAUTIFUL</p><h2>Request a Quote</h2><p>Tell us about your collection. Your enquiry includes this product, its item number and your selected requirements.</p><p class="enquiry-delivery-note">Your enquiry opens in WhatsApp for you to review before sending.</p><p><a href="https://wa.me/8615968902361">+86 159 6890 2361 ↗</a><br><a href="https://wa.me/8618368239527">+86 183 6823 9527 ↗</a></p></div><form id="product-inquiry-form"><p id="enquiry-selection-summary" class="product-selection-summary" aria-live="polite"></p><label class="enquiry-product-label">Product reference<input id="enquiry-product-reference" value="{esc(title+' · '+ref)}" readonly></label><label>Request type<select name="requestType" id="enquiry-request-type"><option value="Quotation">Quotation</option><option value="Sample request">Sample request</option></select></label><label>Company<input name="company" required maxlength="160" autocomplete="organization"></label><label>Contact name<input name="contactName" required maxlength="120" autocomplete="name"></label><label>Email<input name="email" type="email" required maxlength="180" autocomplete="email"></label><label>Destination country / region<input name="destination" required maxlength="120" autocomplete="country-name"></label><label>Customization, packing or documentation requirements<textarea name="requirements" rows="4" maxlength="3000" placeholder="Logo, fragrance, packaging, destination-market documentation…"></textarea></label><label>Sales contact<select name="salesContact"><option value="8615968902361">+86 159 6890 2361</option><option value="8618368239527">+86 183 6823 9527</option></select></label><label class="inquiry-checkbox"><input type="checkbox" id="include-inquiry-list" checked> Include products saved in my inquiry list</label><button type="submit" class="button dark">Open WhatsApp with enquiry ↗</button><button type="button" id="download-inquiry" class="product-secondary-button">Download enquiry summary</button><p id="enquiry-status" role="status"></p></form></section></main>'''
  text=re.sub(r'<body[^>]*>',f'<body data-product-category="{cat}" data-product-reference="{ref}">',base)
  text=re.sub(r'<title>.*?</title>',lambda m:f'<title>{esc(title)} — Lanarve</title>',text)
  text=re.sub(r'<main\b[^>]*>.*?</main>',lambda m:main,text,flags=re.S)
  payload=json.dumps(record,ensure_ascii=True).replace('<','\\u003c')
  if not related:text=re.sub(r'<section class="product-related">.*?</section>','',text,flags=re.S)
  text=text.replace('</head>','<script src="product.js" defer></script></head>')
  text=text.replace('</body>',f'<script type="application/json" id="product-page-data">{payload}</script></body>')
  (root/url).write_text(text)
(root/'assets/product-details.json').write_text(json.dumps(records,indent=2))
# Keep product cards clean: one descriptive name, with the whole card linking to its page.
for path in root.glob('*.html'):
 text=path.read_text();original=text;category=re.search(r'<body[^>]*data-category="([^"]+)"',text)
 if category:
  cat=category[1]
  def link(match):
   anchor=match[0];index=int(re.search(r'data-photo="(\d+)"',anchor)[1]);url=page_map[cat][products[cat][index]['image']]
   return re.sub(r'href="[^"]*"',f'href="{url}"',anchor,count=1)
  text=re.sub(r'<a\b[^>]*data-photo="\d+"[^>]*>',link,text)
 def clean_card(match):
  card=re.sub(r'<span class="eyebrow">.*?</span>','',match[0],flags=re.S)
  card=re.sub(r'<span class="product-link">.*?</span>(?:</span>)?','',card,flags=re.S)
  card=re.sub(r'<p class="fragrance-product-series">.*?</p>','',card,flags=re.S)
  card=re.sub(r'<p class="product-card-fragrance">.*?</p>','',card,flags=re.S)
  href=re.search(r'href="([^"?]+)',card)
  record=next((r for r in records if href and r['url']==href[1]),None)
  if record:
   scent=next(s for s in scents if s['id']==record['primaryScent'])
   card=card.replace('</h3>','</h3><p class="product-card-fragrance">'+esc(scent['name'])+'</p>',1)
  return card
 text=re.sub(r'<a\b[^>]*class="[^"]*\bcrystal-item\b[^"]*"[^>]*>.*?</a>',clean_card,text,flags=re.S)
 text=re.sub(r'<button\b[^>]*class="photo-toggle"[^>]*>.*?</button>','',text,flags=re.S)
 if text!=original:path.write_text(text)

p=root/'catalog.js';text=re.sub(r'\nconst productPages = \{.*?\n\};\n?', '\n',p.read_text(),flags=re.S);p.write_text(text.rstrip()+'\n\nconst productPages = '+json.dumps(page_map,indent=2)+';\n')
print(f'Built {len(records)} full product pages using existing photos; {sum(len(r["documents"]) for r in records)} verified document attachments.')
