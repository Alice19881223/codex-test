const {chromium}=require('playwright');const assert=require('node:assert/strict');const fs=require('node:fs');const http=require('node:http');const path=require('node:path');
const root=path.resolve(__dirname,'../_site');const types={'.html':'text/html; charset=utf-8','.js':'application/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.woff':'font/woff','.xml':'application/xml','.txt':'text/plain'};
const server=http.createServer((req,res)=>{const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);const file=path.resolve(root,'.'+pathname+(pathname.endsWith('/')?'index.html':''));if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}fs.readFile(file,(err,data)=>{if(err){res.writeHead(404,{'Content-Type':'text/html'});res.end(fs.readFileSync(path.join(root,'404.html')));return;}res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream'});res.end(data);});});
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port;const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox']});const results=[];
try{
 const routes=['index.html','products-current.html','reed-collections.html','products-crystal-1.html','gift-collection.html','christmas-collection-2.html','halloween-collection-2.html','sachets.html','candles-morning-light-2.html','fragrance.html','fragrance-pear-freesia.html','private-label.html','contact.html','product-lnv-cnd-02454833.html'];
 for(const width of [1440,390]){const context=await browser.newContext({viewport:{width,height:1000},isMobile:width===390,hasTouch:width===390});for(const route of routes){const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));const response=await page.goto(base+'/'+route,{waitUntil:'load'});assert.equal(response.status(),200);assert.equal(await page.locator('main h1').count(),1,route+' H1');assert.equal(await page.locator('link[rel=canonical]').count(),1);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,route+' overflow at '+width);assert.deepEqual(errors,[],route+' JS errors');if(route==='index.html'){const cta=await page.locator('.hero-content .button').boundingBox();const hero=await page.locator('.hero').boundingBox();const controls=await page.locator('.hero-bottom').boundingBox();assert.ok(cta.y+cta.height<=hero.y+hero.height,'hero CTA must stay inside the hero');assert.ok(cta.y+cta.height<controls.y,'hero CTA must not overlap carousel controls');}results.push({route,width,errors});await page.close();}await context.close();}
 // Every product listing must be full except its final page, including fragrance results.
 const listingFiles=fs.readdirSync(root).filter(name=>name.endsWith('.html')&&/id="(?:catalogue-grid|fragrance-products)"/.test(fs.readFileSync(path.join(root,name),'utf8')));
 for(const name of listingFiles){
  const text=fs.readFileSync(path.join(root,name),'utf8'),fragrance=text.includes('id="fragrance-products"');
  const count=(text.match(fragrance?/data-product-image="/g:/data-photo="/g)||[]).length;
  const current=Number(text.match(fragrance?/data-fragrance-page="(\d+)"/:/data-page="(\d+)"/)[1]);
  const total=Number(text.match(fragrance?/data-fragrance-pages="(\d+)"/:/data-(?:collection|catalogue)-pages="(\d+)"/)[1]);
  assert.ok(count>0&&count<=12,name+' must show 1–12 products');if(current<total)assert.equal(count,12,name+' must be full');
 }
 // The independent Halloween catalogue follows Christmas and preserves every reviewed product pair.
 const halloweenManifest=JSON.parse(fs.readFileSync(path.join(root,'assets/halloween-source-manifest.json'))),halloweenProducts=JSON.parse(fs.readFileSync(path.join(root,'assets/halloween-products.json'))),halloweenLayouts=JSON.parse(fs.readFileSync(path.join(root,'assets/catalogue-layouts.json'))).halloween;
 assert.equal(halloweenManifest.pairCount,35);assert.equal(halloweenManifest.images.length,70);assert.equal(halloweenProducts.length,37);assert.deepEqual(halloweenLayouts.map(page=>page.length),[12,12,12,1]);assert.ok(halloweenProducts.every(product=>product.images.length===2&&product.image!==product.packagingImage&&product.assignedScent));
 if(halloweenManifest.replacementImages){const records=JSON.parse(fs.readFileSync(path.join(root,'assets/product-details.json')));assert.equal(halloweenManifest.replacementImages.length,3);for(const replacement of halloweenManifest.replacementImages){const product=halloweenProducts.find(item=>item.name===replacement.name),record=records.find(item=>item.category==='halloween'&&item.image===replacement.image);assert.ok(product&&record);assert.equal(record.itemNo,replacement.preservedItemNo);assert.ok(product.legacyImages.includes(replacement.previousImage));assert.equal(product.images[0],replacement.image);}}
 const halloweenFlat=halloweenLayouts.flat();assert.equal(new Set(halloweenFlat).size,37);assert.deepEqual(halloweenFlat,halloweenProducts.map(product=>product.image));
 for(const width of [1440,390]){
  const context=await browser.newContext({viewport:{width,height:1000},isMobile:width===390,hasTouch:width===390}),page=await context.newPage();await page.goto(base+'/halloween-collection.html');
  const navLabels=await page.locator('header nav>.nav-picture span').allTextContents(),christmasIndex=navLabels.indexOf('Christmas'),halloweenIndex=navLabels.indexOf('Halloween');assert.equal(halloweenIndex,christmasIndex+1);assert.equal(await page.locator('header a[href^="halloween-collection.html"] img[src*="nav-halloween"]').count(),1);assert.deepEqual(await page.locator('.halloween-mood-strip span').allTextContents(),['MIDNIGHT & PUMPKIN','FRIENDLY GHOSTS','ENCHANTED CERAMICS','PASTEL SPELLS']);
  for(const route of ['halloween-collection.html','halloween-collection-2.html','halloween-collection-3.html','halloween-collection-4.html']){await page.goto(base+'/'+route);assert.match(await page.locator('.halloween-intro').evaluate(el=>getComputedStyle(el,'::after').backgroundImage),/halloween-ghost-simple-2026\.svg/);assert.equal(await page.locator('link[rel="stylesheet"]').getAttribute('href'),fs.readFileSync(path.join(root,'halloween-collection.html'),'utf8').match(/<link rel="stylesheet" href="([^"]+)/)[1]);}
  const reviewed=[halloweenProducts[0],halloweenProducts[12],halloweenProducts[24],...['Midnight Cat Witch','Bat & Pumpkin Gold','Ivory Ghost Garden'].map(name=>halloweenProducts.find(product=>product.name===name))];for(const product of reviewed){const pageNumber=halloweenLayouts.findIndex(images=>images.includes(product.image))+1,route='halloween-collection'+(pageNumber>1?'-'+pageNumber:'')+'.html';await page.goto(base+'/'+route);const card=page.locator('#catalogue-grid a.crystal-item').filter({has:page.getByRole('heading',{name:product.name,exact:true})}),wrapper=card.locator('xpath=..');assert.equal(await card.locator('.paired-photo img').count(),2);if(width===390){await wrapper.locator('.photo-toggle').click();assert.equal(await wrapper.locator('.photo-toggle').getAttribute('aria-pressed'),'true');}else{await card.hover();await page.waitForTimeout(500);assert.equal(await card.locator('.photo-packaging').evaluate(el=>getComputedStyle(el).opacity),'1');}await card.click();assert.equal(await page.locator('#product-fragrance').inputValue(),product.assignedScent);assert.equal(await page.locator('[data-gallery-src]').count(),2);assert.equal(await page.locator('#product-main-image').getAttribute('src'),product.image);assert.match(await page.locator('details').filter({has:page.getByText('Use & Care',{exact:true})}).textContent(),/Never leave a burning candle unattended/);}
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'Halloween overflow');await context.close();
 }
 const relocationManifestPath=path.join(root,'assets/selected-candle-reorganization-manifest.json');
 if(fs.existsSync(relocationManifestPath)){
  const manifest=JSON.parse(fs.readFileSync(relocationManifestPath)),candles=JSON.parse(fs.readFileSync(path.join(root,'assets/candle-products.json'))),records=JSON.parse(fs.readFileSync(path.join(root,'assets/product-details.json'))),collections=JSON.parse(fs.readFileSync(path.join(root,'assets/candle-collections.json')));
  assert.deepEqual(manifest.movedToHalloween,['Little Pumpkin Ghost','Midnight Ballet Candle']);assert.equal(manifest.removed,'Pumpkin & Ghost');assert.deepEqual(manifest.movedToCloseToYou,['Ivory Daisy','Emerald Bubbles']);assert.deepEqual(manifest.movedToEverydayPoetry,['Happy Fries']);
  assert.equal(candles.some(p=>p.name==='Pumpkin & Ghost'),false);assert.equal(records.some(r=>r.name==='Pumpkin & Ghost'),false);assert.equal(fs.existsSync(path.join(root,'product-lnv-cnd-28f66704.html')),false);
  for(const name of manifest.movedToHalloween){assert.equal(candles.some(p=>p.name===name),false);assert.ok(halloweenProducts.find(p=>p.name===name));assert.ok(records.find(r=>r.category==='halloween'&&r.name===name));}
  const expectedCollections={'Ivory Daisy':'close-to-you','Emerald Bubbles':'close-to-you','Happy Fries':'everyday-poetry'};
  for(const [name,slug] of Object.entries(expectedCollections)){const product=candles.find(p=>p.name===name),key=product.series+' | '+name;assert.equal(collections.find(c=>c.slug===slug).productKeys.filter(item=>item===key).length,1);assert.equal(collections.filter(c=>c.productKeys.includes(key)).length,1);}
  for(const width of [1440,390]){
   const context=await browser.newContext({viewport:{width,height:1000},isMobile:width===390,hasTouch:width===390}),page=await context.newPage();
   for(const name of manifest.movedToHalloween){const product=halloweenProducts.find(p=>p.name===name),pageNumber=halloweenLayouts.findIndex(images=>images.includes(product.image))+1,route='halloween-collection'+(pageNumber>1?'-'+pageNumber:'')+'.html',record=records.find(r=>r.category==='halloween'&&r.image===product.image);await page.goto(base+'/'+route);const card=page.locator('#catalogue-grid a.crystal-item').filter({has:page.getByRole('heading',{name,exact:true})}),wrapper=card.locator('xpath=..');assert.equal(await card.locator('.paired-photo img').count(),2);if(width===390){await wrapper.locator('.photo-toggle').click();assert.equal(await wrapper.locator('.photo-toggle').getAttribute('aria-pressed'),'true');}else{await card.hover();await page.waitForTimeout(500);assert.equal(await card.locator('.photo-packaging').evaluate(el=>getComputedStyle(el).opacity),'1');}await card.click();assert.equal(new URL(page.url()).pathname,'/'+record.url);}
   for(const [name,slug] of Object.entries(expectedCollections)){const product=candles.find(p=>p.name===name),collection=collections.find(c=>c.slug===slug),pageNumber=collection.pages.findIndex(keys=>keys.includes(product.series+' | '+name))+1,route='candles-'+slug+(pageNumber>1?'-'+pageNumber:'')+'.html';await page.goto(base+'/'+route);const card=page.locator('#catalogue-grid a.crystal-item').filter({has:page.getByRole('heading',{name,exact:true})});assert.equal(await card.count(),1);await card.click();assert.equal(new URL(page.url()).pathname,'/'+records.find(r=>r.category==='candle'&&r.image===product.image).url);}
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'relocated candle overflow');await context.close();
  }
 }
 const scentsForPaging=JSON.parse(fs.readFileSync(path.join(root,'assets/fragrances.json'))),pagedScent=scentsForPaging.find(s=>s.matches.length>12);
 assert.ok(pagedScent);const pagingContext=await browser.newContext();const pagingPage=await pagingContext.newPage();
 await pagingPage.goto(base+'/'+pagedScent.collectionHref);assert.equal(await pagingPage.locator('#fragrance-products [data-product-image]').count(),12);
 await pagingPage.locator('#fragrance-pagination a').filter({hasText:/^2$/}).click();assert.ok(pagingPage.url().includes('-2.html'));
 assert.equal(await pagingPage.locator('#fragrance-products [data-product-image]').count(),Math.min(12,pagedScent.matches.length-12));
 await pagingPage.locator('#fragrance-pagination a').filter({hasText:/^1$/}).click();assert.equal(await pagingPage.locator('#fragrance-products [data-product-image]').count(),12);await pagingContext.close();
 // The butterfly belongs in Morning Light; both blue-and-white designs use Oriental Mystery.
 const landscapeManifest=path.join(root,'assets/blue-landscapes-source-manifest.json');
 if(fs.existsSync(landscapeManifest)){
  const designs=JSON.parse(fs.readFileSync(landscapeManifest)).products;
  const records=JSON.parse(fs.readFileSync(path.join(root,'assets/product-details.json')));
  const scents=JSON.parse(fs.readFileSync(path.join(root,'assets/fragrances.json')));
  assert.equal(designs.length,3);assert.equal(designs.filter(d=>d.series==='Blue & White Landscapes').length,2);
  for(const design of designs.filter(d=>d.series==='Blue & White Landscapes'))assert.equal(scents.find(s=>s.id===design.assignedScent).themes[0],'Oriental Mystery');
  for(const width of [1440,390]){
   const ctx=await browser.newContext({viewport:{width,height:1000},isMobile:width===390,hasTouch:width===390});const page=await ctx.newPage();
   for(const design of designs){
    const prefix=design.category==='candle'?'candles-':'reeds-',record=records.find(r=>r.category===design.category&&r.image===design.image);assert.ok(record);
    await page.goto(base+'/'+prefix+design.collection+'.html');await page.locator('#catalogue-grid a[href^="'+record.url+'"]').click();await page.waitForURL(url=>url.pathname==='/'+record.url);
    assert.equal(await page.locator('#product-fragrance').inputValue(),design.assignedScent);assert.ok(new URL(page.url()).searchParams.get('v'));
    assert.equal(await page.locator('#product-main-image').getAttribute('src'),design.image);await page.locator('#product-main-image').evaluate(img=>img.decode());
    assert.equal(await page.locator('[data-gallery-src]').count(),2);await page.locator('[data-gallery-src]').nth(1).click();assert.equal(await page.locator('#product-main-image').getAttribute('src'),design.packagingImage);await page.locator('#product-main-image').evaluate(img=>img.decode());
    if(design.series==='Blue & White Landscapes')assert.match(await page.locator('#product-scent-tags').textContent(),/Oriental Mystery/);
    const care=await page.locator('details').filter({has:page.getByText('Use & Care',{exact:true})}).textContent();
    if(design.category==='reed'){assert.match(care,/inserting or turning reeds/);assert.doesNotMatch(care,/burning candle/);}else assert.match(care,/Never leave a burning candle unattended/);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,design.name+' overflow');
   }
   await ctx.close();
  }
 }
 // Reviewed upload pairs must remain discoverable with their assigned scent and gallery.
 const momentsManifest=path.join(root,'assets/poetic-moments-source-manifest.json');
 if(fs.existsSync(momentsManifest)){
  const manifest=JSON.parse(fs.readFileSync(momentsManifest));
  const records=JSON.parse(fs.readFileSync(path.join(root,'assets/product-details.json')));
  assert.equal(manifest.products.length,8);assert.equal(manifest.images.length,16);
  for(const width of [1440,390]){
   const ctx=await browser.newContext({viewport:{width,height:1000},isMobile:width===390,hasTouch:width===390});const page=await ctx.newPage();
   for(const design of manifest.products){
    const record=records.find(r=>r.image===design.image);assert.ok(record);
    const route=listingFiles.find(name=>{const text=fs.readFileSync(path.join(root,name),'utf8');return !name.startsWith('fragrance-')&&text.includes('id="catalogue-grid"')&&text.includes('>'+design.name+'</h3>');});assert.ok(route,design.name+' listed');
    await page.goto(base+'/'+route);await page.locator('#catalogue-grid a.crystal-item').filter({has:page.getByRole('heading',{name:design.name,exact:true})}).click();
    assert.equal(new URL(page.url()).pathname,'/'+record.url);assert.equal(await page.locator('#product-fragrance').inputValue(),design.assignedScent);
    assert.equal(await page.locator('#product-main-image').getAttribute('src'),design.image);await page.locator('#product-main-image').evaluate(img=>img.decode());
    assert.equal(await page.locator('[data-gallery-src]').count(),2);await page.locator('[data-gallery-src]').nth(1).click();assert.equal(await page.locator('#product-main-image').getAttribute('src'),design.packagingImage);await page.locator('#product-main-image').evaluate(img=>img.decode());
    const care=await page.locator('details').filter({has:page.getByText('Use & Care',{exact:true})}).textContent();
    assert.match(care,design.category==='reed'?/inserting or turning reeds/:/Never leave a burning candle unattended/);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,design.name+' overflow');
   }
   await ctx.close();
  }
 }
 // Little Daydreams combines five new reed diffusers with four accurately labelled candle designs.
 const daydreamManifest=path.join(root,'assets/little-daydreams-source-manifest.json');
 if(fs.existsSync(daydreamManifest)){
  const manifest=JSON.parse(fs.readFileSync(daydreamManifest));
  const records=JSON.parse(fs.readFileSync(path.join(root,'assets/product-details.json')));
  const collection=JSON.parse(fs.readFileSync(path.join(root,'assets/reed-collections.json'))).find(c=>c.slug==='little-daydreams');
  assert.equal(manifest.products.length,5);assert.equal(manifest.images.length,10);assert.equal(collection.relatedProducts.length,3);
  assert.deepEqual(collection.relatedProducts.map(p=>p.name),['Jellyfish Egg Candle','Jellyfish Glass Candle','Birthday Surprise Egg']);
  for(const width of [1440,390]){
   const ctx=await browser.newContext({viewport:{width,height:1000},isMobile:width===390,hasTouch:width===390});const page=await ctx.newPage();
   await page.goto(base+'/reed-collections.html');await page.locator('.candle-mood-card').filter({hasText:'Little Daydreams'}).click();
   assert.equal(await page.locator('main h1').textContent(),'Little Daydreams');assert.match(await page.locator('.candle-mood-intro').textContent(),/An innocent and joyful expression from my daughter/);
   assert.equal(await page.locator('#catalogue-grid h3').count(),8);assert.equal(await page.locator('[data-photo]').count(),5);assert.equal(await page.locator('.little-daydream-related').count(),3);assert.equal(await page.locator('.little-daydream-related-heading').count(),0);assert.equal(await page.getByText('Jellyfish & Harbour Stories',{exact:true}).count(),0);
   for(const design of manifest.products){
    const record=records.find(r=>r.category==='reed'&&r.image===design.image);assert.ok(record);await page.goto(base+'/'+record.url);assert.equal(await page.locator('#product-fragrance').inputValue(),design.assignedScent);assert.equal(await page.locator('[data-gallery-src]').count(),2);await page.locator('#product-main-image').evaluate(img=>img.decode());await page.locator('[data-gallery-src]').nth(1).click();assert.equal(await page.locator('#product-main-image').getAttribute('src'),design.packagingImage);await page.locator('#product-main-image').evaluate(img=>img.decode());const care=await page.locator('details').filter({has:page.getByText('Use & Care',{exact:true})}).textContent();assert.match(care,/inserting or turning reeds/);
   }
   await page.goto(base+'/reeds-little-daydreams.html');for(const related of collection.relatedProducts){const card=page.locator('.little-daydream-related').filter({hasText:related.name});assert.equal(await card.count(),1);if(related.series==='Jellyfish'){assert.equal(await card.locator('.paired-photo img').count(),2);const wrapper=card.locator('xpath=..');assert.equal(await wrapper.locator('.photo-toggle').count(),1);if(width===390){await wrapper.locator('.photo-toggle').click();assert.equal(await wrapper.locator('.photo-toggle').getAttribute('aria-pressed'),'true');}else{await card.hover();await page.waitForTimeout(500);assert.equal(await card.locator('.photo-packaging').evaluate(el=>getComputedStyle(el).opacity),'1');}}await card.click();assert.match(await page.locator('details').filter({has:page.getByText('Use & Care',{exact:true})}).textContent(),/Never leave a burning candle unattended/);if(related.series==='Jellyfish')assert.equal(await page.locator('[data-gallery-src]').count(),2);await page.goBack();}
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'Little Daydreams overflow');await ctx.close();
  }
 }
 // Christmas storybook products remain complete after colour-led merchandising changes.
 const storybookManifest=path.join(root,'assets/christmas-storybook-source-manifest.json');
 if(fs.existsSync(storybookManifest)){
  const manifest=JSON.parse(fs.readFileSync(storybookManifest)),designs=manifest.products;
  const records=JSON.parse(fs.readFileSync(path.join(root,'assets/product-details.json')));
  const order=JSON.parse(fs.readFileSync(path.join(root,'assets/catalogue-order.json'))).christmas;
  assert.equal(designs.length,15);assert.equal(manifest.images.length,30);assert.equal(designs.filter(d=>d.productType==='Reed diffuser').length,7);
  const orderedNames=order.flat();assert.ok(designs.every(d=>orderedNames.filter(name=>name===d.name).length===1));
  for(const width of [1440,390]){
   const ctx=await browser.newContext({viewport:{width,height:1000},isMobile:width===390,hasTouch:width===390});const page=await ctx.newPage();
   await page.goto(base+'/christmas-collection-2.html');assert.deepEqual(await page.locator('#catalogue-grid h3').allTextContents(),order[1]);
   await page.locator('#pagination a').filter({hasText:/^3$/}).click();assert.equal(await page.locator('#catalogue-grid h3').count(),12);
   assert.deepEqual(await page.locator('#catalogue-grid h3').allTextContents(),order[2]);
   await page.locator('#pagination a').filter({hasText:/^2$/}).click();assert.ok(new URL(page.url()).searchParams.get('v'));
   for(const design of designs){
    const record=records.find(r=>r.image===design.image);assert.ok(record);await page.goto(base+'/'+record.url);
    assert.equal(await page.locator('#product-fragrance').inputValue(),design.assignedScent);
    assert.equal(await page.locator('#product-main-image').getAttribute('src'),design.image);await page.locator('#product-main-image').evaluate(img=>img.decode());
    assert.equal(await page.locator('[data-gallery-src]').count(),2);await page.locator('[data-gallery-src]').nth(1).click();assert.equal(await page.locator('#product-main-image').getAttribute('src'),design.packagingImage);await page.locator('#product-main-image').evaluate(img=>img.decode());
    const care=await page.locator('details').filter({has:page.getByText('Use & Care',{exact:true})}).textContent();
    if(design.productType==='Reed diffuser'){assert.match(care,/inserting or turning reeds/);assert.doesNotMatch(care,/burning candle/);}else assert.match(care,/Never leave a burning candle unattended/);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,design.name+' overflow');
   }
   await ctx.close();
  }
 }
 // The 2026 festive-stories upload is fully paired and uses the Christmas layout and product care.
 const festiveStoriesManifest=path.join(root,'assets/christmas-festive-stories-source-manifest.json');
 if(fs.existsSync(festiveStoriesManifest)){
  const manifest=JSON.parse(fs.readFileSync(festiveStoriesManifest)),designs=manifest.products;
  const records=JSON.parse(fs.readFileSync(path.join(root,'assets/product-details.json'))),order=JSON.parse(fs.readFileSync(path.join(root,'assets/catalogue-order.json'))).christmas;
  assert.equal(designs.length,38);assert.equal(manifest.images.length,76);assert.equal(designs.filter(d=>d.productType==='Scented candle').length,37);assert.equal(designs.filter(d=>d.productType==='Reed diffuser').length,1);assert.ok(designs.every(d=>d.images.length===2&&d.image!==d.packagingImage));
  const merchandising=JSON.parse(fs.readFileSync(path.join(root,'assets/christmas-merchandising-groups.json'))),flat=order.flat(),grouped=merchandising.groups.flatMap(group=>group.products);
  assert.deepEqual(merchandising.groups.map(group=>group.products.length),[86,37,12,20,5,7]);assert.deepEqual(merchandising.pageCounts,[12,12,12,12,12,12,12,12,12,12,12,12,12,11]);assert.deepEqual(flat,grouped);assert.ok(designs.every(design=>flat.includes(design.name)));
  const representatives=['Snowman Moonlit Cottage','Gingerbread Christmas at Home','Evergreen Star Tree','Golden Noel Angel','Christmas Angel Reed Diffuser'].map(name=>designs.find(d=>d.name===name));
  for(const width of [1440,390]){
   const ctx=await browser.newContext({viewport:{width,height:1000},isMobile:width===390,hasTouch:width===390}),page=await ctx.newPage();await page.goto(base+'/christmas-collection.html');assert.equal(await page.locator('.christmas-mood-strip').count(),0);assert.match(await page.locator('.christmas-intro').evaluate(el=>getComputedStyle(el).backgroundImage),/gradient/);
   for(const design of representatives){const pageNumber=order.findIndex(items=>items.includes(design.name))+1,route='christmas-collection'+(pageNumber>1?'-'+pageNumber:'')+'.html';await page.goto(base+'/'+route);const card=page.locator('#catalogue-grid a.crystal-item').filter({has:page.getByRole('heading',{name:design.name,exact:true})}),wrapper=card.locator('xpath=..');assert.equal(await card.locator('.paired-photo img').count(),2);if(width===390){await wrapper.locator('.photo-toggle').click();assert.equal(await wrapper.locator('.photo-toggle').getAttribute('aria-pressed'),'true');}else{await card.hover();await page.waitForTimeout(500);assert.equal(await card.locator('.photo-packaging').evaluate(el=>getComputedStyle(el).opacity),'1');}await card.click();const record=records.find(r=>r.image===design.image);assert.equal(new URL(page.url()).pathname,'/'+record.url);assert.equal(await page.locator('#product-fragrance').inputValue(),design.assignedScent);assert.equal(await page.locator('[data-gallery-src]').count(),2);const care=await page.locator('details').filter({has:page.getByText('Use & Care',{exact:true})}).textContent();if(design.productType==='Reed diffuser'){assert.match(care,/inserting or turning reeds/);assert.doesNotMatch(care,/burning candle/);}else assert.match(care,/Never leave a burning candle unattended/);}
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'festive stories overflow');await ctx.close();
  }
 }
 // Spring/summer additions belong to three existing themes, with reviewed seasonal front pages.
 const seasonalManifest=path.join(root,'assets/spring-summer-source-manifest.json');
 if(fs.existsSync(seasonalManifest)){
  const manifest=JSON.parse(fs.readFileSync(seasonalManifest)),designs=manifest.products;
  const records=JSON.parse(fs.readFileSync(path.join(root,'assets/product-details.json')));
  const collections=JSON.parse(fs.readFileSync(path.join(root,'assets/candle-collections.json')));
  assert.equal(designs.length,16);assert.equal(manifest.images.length,32);assert.deepEqual(manifest.collectionCounts,{'morning-light':7,'a-moment-of-quiet':6,'close-to-you':3});
  assert.ok(designs.every(d=>d.images.length===2&&d.image!==d.packagingImage));
  for(const width of [1440,390]){
   const ctx=await browser.newContext({viewport:{width,height:1000},isMobile:width===390,hasTouch:width===390});const page=await ctx.newPage();
   for(const slug of Object.keys(manifest.collectionCounts)){
    const collection=collections.find(c=>c.slug===slug),expected=designs.filter(d=>d.seasonalCollection===slug);
    await page.goto(base+'/products-current.html');assert.equal(await page.locator('.candle-mood-card').count(),6);
    await page.locator('.candle-mood-card').filter({hasText:collection.name}).click();assert.ok(new URL(page.url()).searchParams.get('v'));
    assert.equal(await page.locator('main h1').textContent(),collection.name);
    assert.deepEqual(await page.locator('#catalogue-grid h3').allTextContents(),collection.pages[0].map(k=>k.split(' | ')[1]));assert.equal(await page.locator('#catalogue-grid h3').count(),12);assert.deepEqual((await page.locator('#catalogue-grid h3').allTextContents()).slice(0,expected.length),expected.map(d=>d.name));
    assert.match(await page.locator('.seasonal-feature').textContent(),/SPRING & SUMMER EDIT/);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,slug+' seasonal overflow');
    await page.locator('#pagination a').filter({hasText:/^2$/}).click();assert.equal(await page.locator('.seasonal-feature').count(),0);
    await page.locator('#pagination a').filter({hasText:/^1$/}).click();assert.ok(new URL(page.url()).searchParams.get('v'));
    assert.deepEqual(await page.locator('#catalogue-grid h3').allTextContents(),collection.pages[0].map(k=>k.split(' | ')[1]));assert.equal(await page.locator('#catalogue-grid h3').count(),12);assert.deepEqual((await page.locator('#catalogue-grid h3').allTextContents()).slice(0,expected.length),expected.map(d=>d.name));
   }
   for(const design of designs){
    const record=records.find(r=>r.image===design.image);assert.ok(record);await page.goto(base+'/'+record.url);
    assert.equal(await page.locator('#product-fragrance').inputValue(),design.assignedScent);
    assert.equal(await page.locator('#product-main-image').getAttribute('src'),design.image);
    assert.match(await page.locator('.product-design-description').textContent(),/spring|summer/i);
    assert.equal(await page.locator('[data-gallery-src]').count(),2);await page.locator('#product-main-image').evaluate(img=>img.decode());
    await page.locator('[data-gallery-src]').nth(1).click();assert.equal(await page.locator('#product-main-image').getAttribute('src'),design.packagingImage);await page.locator('#product-main-image').evaluate(img=>img.decode());
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,design.name+' seasonal detail overflow');
   }
   await ctx.close();
  }
  const ctx=await browser.newContext({javaScriptEnabled:false});const page=await ctx.newPage();
  await page.goto(base+'/candles-morning-light.html');const first=page.locator('#catalogue-grid a[data-photo]').first(),href=await first.getAttribute('href');await first.click();await page.waitForURL(base+'/'+href);assert.equal(await page.locator('#product-notes dd').count(),3);await ctx.close();
 }
 // The curated candle edit keeps all twelve reviewed product/box pairs in their matching themes.
 const curatedManifestPath=path.join(root,'assets/curated-candle-gifts-source-manifest.json');
 if(fs.existsSync(curatedManifestPath)){
  const manifest=JSON.parse(fs.readFileSync(curatedManifestPath)),designs=manifest.products;
  const records=JSON.parse(fs.readFileSync(path.join(root,'assets/product-details.json'))),collections=JSON.parse(fs.readFileSync(path.join(root,'assets/candle-collections.json')));
  const placement={'Quiet Botanicals':'a-moment-of-quiet','For Mum, With Love':'close-to-you','Garden Joys':'little-joys','Spring Garden':'morning-light','Poetic Botanicals':'everyday-poetry'};
  const placementOverrides={'Midnight Poppy':'close-to-you','Golden Midnight Bloom':'close-to-you','Ivory Daisy':'close-to-you','Emerald Bubbles':'close-to-you'};
  assert.equal(designs.length,12);assert.equal(manifest.images.length,24);assert.ok(designs.every(d=>d.images.length===2&&d.image!==d.packagingImage&&d.designDescription&&d.assignedScent));
  for(const design of designs){const collection=collections.find(c=>c.slug===(placementOverrides[design.name]||placement[design.series]));assert.ok(collection);assert.equal(collection.productKeys.filter(key=>key===design.series+' | '+design.name).length,1);assert.ok(records.find(record=>record.category==='candle'&&record.image===design.image));}
  const representatives=['Midnight Poppy','Oakheart for Mum','Ivory Daisy','Blue Linen Botanicals','Golden Midnight Bloom'].map(name=>designs.find(d=>d.name===name));
  for(const width of [1440,390]){
   const ctx=await browser.newContext({viewport:{width,height:1000},isMobile:width===390,hasTouch:width===390}),page=await ctx.newPage();
   for(const design of representatives){
    const record=records.find(r=>r.category==='candle'&&r.image===design.image),route=listingFiles.find(name=>!name.startsWith('fragrance-')&&fs.readFileSync(path.join(root,name),'utf8').includes('>'+design.name+'</h3>'));assert.ok(route,design.name+' listed');
    await page.goto(base+'/'+route);const card=page.locator('#catalogue-grid a.crystal-item').filter({has:page.getByRole('heading',{name:design.name,exact:true})}),wrapper=card.locator('xpath=..');assert.equal(await card.locator('.paired-photo img').count(),2);
    if(width===390){await wrapper.locator('.photo-toggle').click();assert.equal(await wrapper.locator('.photo-toggle').getAttribute('aria-pressed'),'true');}else{await card.hover();await page.waitForTimeout(500);assert.equal(await card.locator('.photo-packaging').evaluate(el=>getComputedStyle(el).opacity),'1');}
    await card.click();assert.equal(new URL(page.url()).pathname,'/'+record.url);assert.equal(await page.locator('#product-fragrance').inputValue(),design.assignedScent);assert.equal(await page.locator('[data-gallery-src]').count(),2);assert.ok((await page.locator('.product-design-description').textContent()).trim().length>80);assert.match(await page.locator('details').filter({has:page.getByText('Use & Care',{exact:true})}).textContent(),/Never leave a burning candle unattended/);
   }
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'curated candle detail overflow');await ctx.close();
  }
 }
 // The 中国风 directory combines every reviewed Mahjong pair with the existing Chinese-inspired candle edit.
 const mahjongManifestPath=path.join(root,'assets/mahjong-source-manifest.json');
 if(fs.existsSync(mahjongManifestPath)){
  const manifest=JSON.parse(fs.readFileSync(mahjongManifestPath)),designs=manifest.products,blueManifest=JSON.parse(fs.readFileSync(path.join(root,'assets/blue-white-botanicals-source-manifest.json'))),blueDesigns=blueManifest.products,records=JSON.parse(fs.readFileSync(path.join(root,'assets/product-details.json'))),collections=JSON.parse(fs.readFileSync(path.join(root,'assets/candle-collections.json'))),collection=collections.find(c=>c.slug==='chinese-style'),scents=JSON.parse(fs.readFileSync(path.join(root,'assets/fragrances.json')));
  assert.equal(designs.length,7);assert.equal(manifest.images.length,14);assert.equal(manifest.pairedCount,7);assert.equal(manifest.integratedExistingKeys.length,8);assert.equal(collection.name,'Chinese Artistry');assert.equal(collection.icon,'chinese-style');assert.equal(collection.productKeys.length,22);assert.deepEqual(collection.pages.map(page=>page.length),[12,10]);assert.equal(manifest.relocations['Poetic Botanicals | Golden Midnight Bloom'],'close-to-you');
  assert.equal(blueDesigns.length,7);assert.equal(blueManifest.images.length,14);assert.equal(blueManifest.pairedCount,7);assert.ok(blueDesigns.every(d=>scents.find(s=>s.id===d.assignedScent).themes.includes('Oriental Mystery')));assert.deepEqual(collection.productKeys,Object.values(blueManifest.orderedSections).flat());assert.ok(fs.existsSync(path.join(root,'assets/mood-chinese-style.svg')));
  for(const key of collection.productKeys)assert.equal(collections.reduce((count,c)=>count+c.productKeys.filter(item=>item===key).length,0),1,key+' belongs to one candle directory');
  assert.ok([...designs,...blueDesigns].every(d=>d.images.length===2&&d.image!==d.packagingImage&&d.assignedScent&&d.designDescription.length>140));
  const representatives=['Fortune Tile','East Wind','Red Dragon','Bamboo Sparrow'].map(name=>designs.find(d=>d.name===name)).concat(['Blue Willow Arch','Porcelain Garden','Ink Lotus'].map(name=>blueDesigns.find(d=>d.name===name)));
  for(const width of [1440,390]){
   const ctx=await browser.newContext({viewport:{width,height:1000},isMobile:width===390,hasTouch:width===390}),page=await ctx.newPage();
   await page.goto(base+'/products-current.html');const directory=page.locator('.candle-mood-card').filter({has:page.getByRole('heading',{name:'Chinese Artistry',exact:true})});assert.equal(await directory.count(),1);assert.equal(await directory.locator('img').getAttribute('src'),'assets/mood-chinese-style.svg');await directory.click();assert.ok(new URL(page.url()).searchParams.get('v'));assert.equal(await page.locator('main h1').textContent(),'Chinese Artistry');assert.match(await page.locator('.candle-mood-intro').textContent(),/CHINESE ARTISTRY|Mahjong/);
   for(const design of representatives){
    const record=records.find(r=>r.category==='candle'&&r.image===design.image),pageNumber=collection.pages.findIndex(pageKeys=>pageKeys.includes(design.series+' | '+design.name))+1,route='candles-chinese-style'+(pageNumber>1?'-'+pageNumber:'')+'.html';assert.ok(record);await page.goto(base+'/'+route);
    const card=page.locator('#catalogue-grid a.crystal-item').filter({has:page.getByRole('heading',{name:design.name,exact:true})}),wrapper=card.locator('xpath=..');assert.equal(await card.locator('.paired-photo img').count(),2);
    if(width===390){await wrapper.locator('.photo-toggle').click();assert.equal(await wrapper.locator('.photo-toggle').getAttribute('aria-pressed'),'true');}else{await card.hover();await page.waitForTimeout(500);assert.equal(await card.locator('.photo-packaging').evaluate(el=>getComputedStyle(el).opacity),'1');}
    await card.click();assert.equal(new URL(page.url()).pathname,'/'+record.url);assert.equal(await page.locator('#product-fragrance').inputValue(),design.assignedScent);assert.equal(await page.locator('[data-gallery-src]').count(),2);assert.match(await page.locator('details').filter({has:page.getByText('Use & Care',{exact:true})}).textContent(),/Never leave a burning candle unattended/);
   }
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'中国风 detail overflow');await ctx.close();
  }
 }
 // The gifting and Sage Lace edit preserves every supplied product/packaging pair across candle and reed themes.
 const giftLaceManifestPath=path.join(root,'assets/gift-and-sage-lace-source-manifest.json');
 if(fs.existsSync(giftLaceManifestPath)){
  const manifest=JSON.parse(fs.readFileSync(giftLaceManifestPath)),designs=manifest.products,records=JSON.parse(fs.readFileSync(path.join(root,'assets/product-details.json'))),candleCollections=JSON.parse(fs.readFileSync(path.join(root,'assets/candle-collections.json'))),reedCollections=JSON.parse(fs.readFileSync(path.join(root,'assets/reed-collections.json')));
  assert.equal(designs.length,5);assert.equal(manifest.images.length,10);assert.equal(manifest.pairedCount,5);assert.deepEqual(manifest.collectionCounts,{'candle/close-to-you':2,'candle/little-joys':1,'candle/a-moment-of-quiet':1,'reed/a-quiet-pause':1});assert.ok(designs.every(d=>d.images.length===2&&d.image!==d.packagingImage&&d.assignedScent&&d.designDescription.length>130));
  for(const design of designs){const collections=design.category==='candle'?candleCollections:reedCollections,collection=collections.find(c=>c.slug===design.collection),key=design.series+' | '+design.name;assert.equal(collection.productKeys.filter(item=>item===key).length,1);assert.ok(records.find(r=>r.category===design.category&&r.image===design.image));}
  assert.ok([...candleCollections,...reedCollections].every(collection=>collection.pages.slice(0,-1).every(page=>page.length===12)),'every non-final candle and reed page contains twelve products');
  for(const width of [1440,390]){
   const ctx=await browser.newContext({viewport:{width,height:1000},isMobile:width===390,hasTouch:width===390}),page=await ctx.newPage();
   for(const design of designs){
    const record=records.find(r=>r.category===design.category&&r.image===design.image),route=listingFiles.find(name=>!name.startsWith('fragrance-')&&fs.readFileSync(path.join(root,name),'utf8').includes('>'+design.name+'</h3>'));assert.ok(record&&route,design.name+' published');await page.goto(base+'/'+route);
    const card=page.locator('#catalogue-grid a.crystal-item').filter({has:page.getByRole('heading',{name:design.name,exact:true})}),wrapper=card.locator('xpath=..');assert.equal(await card.locator('.paired-photo img').count(),2);
    if(width===390){await wrapper.locator('.photo-toggle').click();assert.equal(await wrapper.locator('.photo-toggle').getAttribute('aria-pressed'),'true');}else{await card.hover();await page.waitForTimeout(500);assert.equal(await card.locator('.photo-packaging').evaluate(el=>getComputedStyle(el).opacity),'1');}
    await card.click();assert.equal(new URL(page.url()).pathname,'/'+record.url);assert.equal(await page.locator('#product-fragrance').inputValue(),design.assignedScent);assert.equal(await page.locator('[data-gallery-src]').count(),2);const care=await page.locator('details').filter({has:page.getByText('Use & Care',{exact:true})}).textContent();if(design.category==='reed'){assert.match(care,/inserting or turning reeds/);assert.doesNotMatch(care,/burning candle/);}else assert.match(care,/Never leave a burning candle unattended/);
   }
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'gift and Sage Lace detail overflow');await ctx.close();
  }
 }
 // The Easter edit is a continuous Little Joys story with every unique supplied photograph preserved.
 const easterManifestPath=path.join(root,'assets/easter-little-joys-source-manifest.json');
 if(fs.existsSync(easterManifestPath)){
  const manifest=JSON.parse(fs.readFileSync(easterManifestPath)),designs=manifest.products,records=JSON.parse(fs.readFileSync(path.join(root,'assets/product-details.json'))),collection=JSON.parse(fs.readFileSync(path.join(root,'assets/candle-collections.json'))).find(c=>c.slug==='little-joys');
  assert.equal(designs.length,28);assert.equal(manifest.images.length,55);assert.equal(manifest.pairedCount,27);assert.equal(manifest.singleCompositionCount,1);assert.equal(manifest.duplicateSourceFilesExcluded.length,3);assert.match(collection.description+collection.story,/Easter/);
  assert.deepEqual(collection.productKeys.slice(6,34),designs.map(d=>d.series+' | '+d.name));assert.deepEqual(collection.pages.map(page=>page.length),[12,12,12,12]);assert.ok(designs.every(d=>d.season==='Easter'&&/Easter|spring/i.test(d.designDescription)&&d.assignedScent));
  const representatives=['Painted Easter Egg','Rainy Day Duckling','Honeybee Basket','Bunny-Ear Egg','Easter Duckling','Spring Bunny Wreath'].map(name=>designs.find(d=>d.name===name));
  for(const width of [1440,390]){
   const ctx=await browser.newContext({viewport:{width,height:1000},isMobile:width===390,hasTouch:width===390}),page=await ctx.newPage();
   await page.goto(base+'/candles-little-joys.html');assert.match(await page.locator('.candle-mood-intro').textContent(),/Easter edit/);
   for(const design of representatives){
    const record=records.find(r=>r.category==='candle'&&r.image===design.image),htmlName=design.name.replaceAll('&','&amp;'),route=listingFiles.find(name=>!name.startsWith('fragrance-')&&fs.readFileSync(path.join(root,name),'utf8').includes('>'+htmlName+'</h3>'));assert.ok(record&&route,design.name+' published');await page.goto(base+'/'+route);
    const card=page.locator('#catalogue-grid a.crystal-item').filter({has:page.getByRole('heading',{name:design.name,exact:true})});assert.equal(await card.locator('.photo-single').count(),1);
    if(design.packagingImage){const wrapper=card.locator('xpath=..');assert.equal(await card.locator('.photo-packaging').count(),1);if(width===390){await wrapper.locator('.photo-toggle').click();assert.equal(await wrapper.locator('.photo-toggle').getAttribute('aria-pressed'),'true');}else{await card.hover();await page.waitForTimeout(500);assert.equal(await card.locator('.photo-packaging').evaluate(el=>getComputedStyle(el).opacity),'1');}}
    await card.click();assert.equal(new URL(page.url()).pathname,'/'+record.url);assert.equal(await page.locator('#product-fragrance').inputValue(),design.assignedScent);assert.equal(await page.locator('[data-gallery-src]').count(),design.packagingImage?2:1);assert.match(await page.locator('.product-design-description').textContent(),/Easter|spring/i);assert.match(await page.locator('details').filter({has:page.getByText('Use & Care',{exact:true})}).textContent(),/Never leave a burning candle unattended/);
   }
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'Easter detail overflow');await ctx.close();
  }
 }
 // Lifestyle messages and coastal motifs retain every supplied product/packaging pair and use theme-led fragrance assignments.
 const lifestyleOceanManifestPath=path.join(root,'assets/lifestyle-ocean-source-manifest.json');
 if(fs.existsSync(lifestyleOceanManifestPath)){
  const manifest=JSON.parse(fs.readFileSync(lifestyleOceanManifestPath)),designs=manifest.products,records=JSON.parse(fs.readFileSync(path.join(root,'assets/product-details.json'))),collections=JSON.parse(fs.readFileSync(path.join(root,'assets/candle-collections.json')));
  const placement={'Joyful Little Things':'little-joys','Words in Bloom':'close-to-you','Coastal Daydreams':'everyday-poetry'},placementOverrides={'Happy Fries':'everyday-poetry'};
  assert.equal(designs.length,19);assert.equal(manifest.images.length,38);assert.equal(manifest.pairedCount,19);assert.deepEqual(manifest.collectionCounts,{'close-to-you':5,'everyday-poetry':13,'little-joys':1});
  assert.ok(designs.every(d=>d.images.length===2&&d.image!==d.packagingImage&&d.assignedScent&&d.designDescription.length>120));
  for(const design of designs){const collection=collections.find(c=>c.slug===(placementOverrides[design.name]||placement[design.series]));assert.equal(collection.productKeys.filter(key=>key===design.series+' | '+design.name).length,1);assert.ok(records.find(r=>r.category==='candle'&&r.image===design.image));}
  assert.ok(collections.every(collection=>collection.pages.slice(0,-1).every(page=>page.length===12)),'every non-final collection page contains twelve products');
  const representatives=['Happy Fries','Gratitude in Bloom','Blue Shoal','Golden Hour Tide','Moon & Little Star'].map(name=>designs.find(d=>d.name===name));
  for(const width of [1440,390]){
   const ctx=await browser.newContext({viewport:{width,height:1000},isMobile:width===390,hasTouch:width===390}),page=await ctx.newPage();
   for(const design of representatives){
    const record=records.find(r=>r.category==='candle'&&r.image===design.image),htmlName=design.name.replaceAll('&','&amp;'),route=listingFiles.find(name=>!name.startsWith('fragrance-')&&fs.readFileSync(path.join(root,name),'utf8').includes('>'+htmlName+'</h3>'));assert.ok(record&&route,design.name+' published');await page.goto(base+'/'+route);
    const card=page.locator('#catalogue-grid a.crystal-item').filter({has:page.getByRole('heading',{name:design.name,exact:true})}),wrapper=card.locator('xpath=..');assert.equal(await card.locator('.paired-photo img').count(),2);
    if(width===390){await wrapper.locator('.photo-toggle').click();assert.equal(await wrapper.locator('.photo-toggle').getAttribute('aria-pressed'),'true');}else{await card.hover();await page.waitForTimeout(500);assert.equal(await card.locator('.photo-packaging').evaluate(el=>getComputedStyle(el).opacity),'1');}
    await card.click();assert.equal(new URL(page.url()).pathname,'/'+record.url);assert.equal(await page.locator('#product-fragrance').inputValue(),design.assignedScent);assert.equal(await page.locator('[data-gallery-src]').count(),2);assert.ok((await page.locator('.product-design-description').textContent()).trim().length>100);
   }
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'lifestyle and ocean detail overflow');await ctx.close();
  }
 }
 // The independent lifestyle theme must be reachable as a fifth collection.
 const poetryManifest=path.join(root,'assets/everyday-poetry-source-manifest.json');
 if(fs.existsSync(poetryManifest)){
  const designs=JSON.parse(fs.readFileSync(poetryManifest)).products;
  const records=JSON.parse(fs.readFileSync(path.join(root,'assets/product-details.json')));
  const collection=JSON.parse(fs.readFileSync(path.join(root,'assets/candle-collections.json'))).find(c=>c.slug==='everyday-poetry');
  assert.equal(designs.length,20);
  assert.equal(designs.filter(d=>d.packagingImage).length,20);
  assert.equal(designs.find(d=>d.name==='Dolce Vita Golden Pasta').images.length,2);
  assert.equal(designs.find(d=>d.name==='Dolce Vita Blue Pasta').images.length,2);
  for(const width of [1440,390]){
   const ctx=await browser.newContext({viewport:{width,height:1000},isMobile:width===390,hasTouch:width===390});const page=await ctx.newPage();
   await page.goto(base+'/products-current.html');assert.equal(await page.locator('.candle-mood-card').count(),6);
   await page.locator('.candle-mood-card').filter({hasText:'Everyday Poetry'}).click();assert.ok(new URL(page.url()).searchParams.get('v'));
   assert.equal(await page.locator('main h1').textContent(),'Everyday Poetry');assert.equal(await page.locator('.everyday-story').count(),0);
   const sharedStyle=()=>{const intro=document.querySelector('.candle-mood-intro'),title=intro.querySelector('h1'),nav=document.querySelector('.candle-mood-nav a[aria-current]');return [getComputedStyle(intro).backgroundColor,getComputedStyle(intro).backgroundImage,getComputedStyle(intro).borderBottomWidth,getComputedStyle(title).color,getComputedStyle(title).fontFamily,getComputedStyle(nav).backgroundColor];};
   const expectedStyle=await page.evaluate(sharedStyle);const reference=await ctx.newPage();await reference.goto(base+'/candles-morning-light.html');assert.deepEqual(expectedStyle,await reference.evaluate(sharedStyle),'Everyday Poetry must use the shared collection styles');await reference.close();
   for(let i=0;i<collection.pages.length;i++){
    if(i)await page.locator('#pagination a').filter({hasText:new RegExp('^'+(i+1)+'$')}).click();
    assert.deepEqual(await page.locator('#catalogue-grid h3').allTextContents(),collection.pages[i].map(k=>k.split(' | ')[1]));
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'Everyday Poetry collection overflow');
   }
   await page.locator('#pagination a').filter({hasText:/^1$/}).click();assert.ok(new URL(page.url()).searchParams.get('v'));
   for(const design of designs){
    const record=records.find(r=>r.image===design.image);assert.ok(record);
    await page.goto(base+'/'+record.url);assert.equal(await page.locator('#product-fragrance').inputValue(),design.assignedScent);
    assert.equal(await page.locator('[data-gallery-src]').count(),design.images.length);assert.equal(await page.locator('#product-main-image').getAttribute('src'),design.image);
    await page.locator('#product-main-image').evaluate(img=>img.decode());
    if(design.packagingImage){await page.locator('[data-gallery-src]').nth(1).click();await page.locator('#product-main-image').evaluate(img=>img.decode());}
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,design.name+' detail overflow');
   }
   await ctx.close();
  }
  const ctx=await browser.newContext({javaScriptEnabled:false});const page=await ctx.newPage();
  await page.goto(base+'/candles-everyday-poetry.html');const first=page.locator('#catalogue-grid a[data-photo]').first();const href=await first.getAttribute('href');await first.click();await page.waitForURL(base+'/'+href);assert.equal(await page.locator('#product-notes dd').count(),3);await ctx.close();
 }
 // Each imported animal-print design must open from the collection with its own scent and supplied views.
 const wildManifest=path.join(root,'assets/wild-elegance-source-manifest.json');
 if(fs.existsSync(wildManifest)){
  const designs=JSON.parse(fs.readFileSync(wildManifest)).products;
  const records=JSON.parse(fs.readFileSync(path.join(root,'assets/product-details.json')));
  assert.equal(designs.length,6);
  for(const width of [1440,390]){
   const animalContext=await browser.newContext({viewport:{width,height:1000},isMobile:width===390,hasTouch:width===390});const animalPage=await animalContext.newPage();
   await animalContext.route(base+'/candles-little-joys.html',route=>route.fulfill({status:200,contentType:'text/html',body:'<h1>Old Little Joys collection</h1>'}));
   await animalPage.goto(base+'/index.html');if(width===390)await animalPage.locator('.menu-toggle').tap();await animalPage.locator('header a.nav-picture').filter({hasText:'Scented candles'}).click();
   await animalPage.locator('.candle-mood-card').filter({hasText:'Little Joys'}).click();assert.ok(new URL(animalPage.url()).searchParams.get('v'));
   await animalContext.unroute(base+'/candles-little-joys.html');
   assert.equal(await animalPage.locator('#catalogue-grid h3').count(),12);assert.deepEqual((await animalPage.locator('#catalogue-grid h3').allTextContents()).slice(0,designs.length),designs.map(d=>d.name));
   for(const image of await animalPage.locator('#catalogue-grid .photo-single').all()){const box=await image.boundingBox();assert.ok(Math.abs(box.height-box.width)<2,'Animal-print card photographs must remain square');}
   for(const design of designs){
    const record=records.find(r=>r.image===design.image&&r.category==='candle');assert.ok(record);
    await animalPage.goto(base+'/candles-little-joys.html');
    await animalPage.locator('#catalogue-grid a[href^="'+record.url+'"]').click();await animalPage.waitForURL(url=>url.pathname==='/'+record.url);assert.ok(new URL(animalPage.url()).searchParams.get('v'));
    assert.equal(await animalPage.locator('#product-fragrance').inputValue(),design.assignedScent);
    assert.ok((await animalPage.locator('h1').textContent()).includes(design.name));
    assert.equal(await animalPage.locator('[data-gallery-src]').count(),design.images.length);
    assert.equal(await animalPage.locator('#product-main-image').getAttribute('src'),design.image);
    if(design.name==='Blush Leopard'){assert.equal(record.url,'product-lnv-cnd-c29ff4da.html');assert.equal(design.images.length,2);}
    await animalPage.locator('#product-main-image').evaluate(img=>img.decode());
    if(design.packagingImage){await animalPage.locator('[data-gallery-src]').nth(1).click();await animalPage.locator('#product-main-image').evaluate(img=>img.decode());assert.match(await animalPage.locator('#gallery-caption').textContent(),/packaging/i);}
    else assert.match(await animalPage.locator('#gallery-caption').textContent(),/Product & gift packaging/);
    assert.equal(await animalPage.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,design.name+' overflow');
   }
   await animalContext.close();
  }
  const animalNoJS=await browser.newContext({javaScriptEnabled:false});const animalPage=await animalNoJS.newPage();
  for(const design of designs){const record=records.find(r=>r.image===design.image);await animalPage.goto(base+'/'+record.url);assert.equal(await animalPage.locator('#product-fragrance').inputValue(),design.assignedScent);assert.equal(await animalPage.locator('#product-notes dd').count(),3);}
  await animalNoJS.close();
 }
 // Simulate an older cached unversioned page and exercise the real 1 -> 2 -> 1 links.
 const christmasContext=await browser.newContext();const christmasPage=await christmasContext.newPage();
 await christmasContext.route(base+'/christmas-collection.html',route=>route.fulfill({status:200,contentType:'text/html',body:'<h1>Old cached Christmas assortment</h1>'}));
 await christmasPage.goto(base+'/index.html');
 await christmasPage.locator('header a.nav-picture').filter({hasText:'Christmas'}).click();
 const christmasVersion=new URL(christmasPage.url()).searchParams.get('v');assert.ok(christmasVersion,'Christmas menu must bypass old cached pages');
 const expectedChristmas=JSON.parse(fs.readFileSync(path.join(root,'assets/catalogue-order.json'))).christmas;
 assert.deepEqual(await christmasPage.locator('#catalogue-grid h3').allTextContents(),expectedChristmas[0]);
 await christmasPage.locator('#pagination a').filter({hasText:/^2$/}).click();
 assert.equal(new URL(christmasPage.url()).searchParams.get('v'),christmasVersion);
 assert.deepEqual(await christmasPage.locator('#catalogue-grid h3').allTextContents(),expectedChristmas[1]);
 await christmasPage.locator('#pagination a').filter({hasText:/^1$/}).click();
 assert.equal(new URL(christmasPage.url()).searchParams.get('v'),christmasVersion);
 assert.deepEqual(await christmasPage.locator('#catalogue-grid h3').allTextContents(),expectedChristmas[0]);
 await christmasContext.close();
 const context=await browser.newContext({viewport:{width:1440,height:1000}});const p=await context.newPage();const errors=[];p.on('pageerror',e=>errors.push(e.message));await p.goto(base+'/index.html');await p.locator('.fragrance-toggle').hover();await p.waitForFunction(()=>getComputedStyle(document.querySelector('.fragrance-dropdown')).visibility==='visible');assert.equal(await p.locator('.fragrance-toggle').getAttribute('aria-expanded'),'true');assert.ok(await p.locator('.fragrance-scent-link').count()>=39);await p.locator('.fragrance-scent-link').first().hover();assert.equal(await p.locator('.fragrance-toggle').getAttribute('aria-expanded'),'true');await p.keyboard.press('Escape');assert.equal(await p.locator('.fragrance-toggle').getAttribute('aria-expanded'),'false');
 await p.locator('#carousel-pause').click();const before=await p.locator('[data-slide].is-active').getAttribute('data-slide');await p.locator('[data-direction="1"]').click();assert.notEqual(await p.locator('[data-slide].is-active').getAttribute('data-slide'),before);
 await p.goto(base+'/product-lnv-cnd-02454833.html');const initial=await p.locator('#product-smells-like').textContent();await p.locator('#product-fragrance').selectOption('pear-freesia');assert.notEqual(await p.locator('#product-smells-like').textContent(),initial);assert.match(await p.locator('#product-notes').textContent(),/Pear/);assert.match(p.url(),/scent=pear-freesia/);await p.reload();assert.equal(await p.locator('#product-fragrance').inputValue(),'pear-freesia');
 const buttons=p.locator('[data-gallery-src]');assert.ok(await buttons.count()>1);await buttons.nth(1).click();const image=p.locator('#product-main-image');assert.equal(await image.getAttribute('src'),await buttons.nth(1).getAttribute('data-gallery-src'));assert.equal(await image.getAttribute('srcset'),await buttons.nth(1).getAttribute('data-gallery-srcset'));await p.locator('#add-to-inquiry').click();assert.equal(await p.locator('#inquiry-count').textContent(),'1');assert.ok((await p.evaluate(()=>localStorage.getItem('lanarve-product-inquiry-v1')))?.includes('pear-freesia'));await p.locator('#request-sample').click();assert.equal(await p.locator('#enquiry-request-type').inputValue(),'Sample request');
 await p.locator('[name=company]').fill('SEO smoke test');await p.locator('[name=contactName]').fill('Test Buyer');await p.locator('[name=email]').fill('test@example.com');await p.locator('[name=destination]').fill('United Kingdom');let opened='';await context.route('https://wa.me/**',route=>{opened=route.request().url();return route.fulfill({status:200,body:'Test interception: no message sent'});});await p.getByRole('button',{name:'Open WhatsApp with enquiry'}).click();await p.waitForTimeout(200);const popupPages=context.pages().filter(x=>x!==p);for(const popup of popupPages)await popup.close();assert.ok(opened.includes('wa.me/'),'enquiry should open WhatsApp draft, no message is sent');assert.ok(decodeURIComponent(opened).includes('Product: https://www.lanarve.com/product-lnv-cnd-02454833.html?scent=pear-freesia'),'draft must use the canonical production domain');assert.deepEqual(errors,[]);
 const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:900}});const staticPage=await nojs.newPage();await staticPage.goto(base+'/product-lnv-cnd-02454833.html');assert.match(await staticPage.locator('#product-key-notes').textContent(),/Gardenia/);assert.equal(await staticPage.locator('#product-notes dd').count(),3);assert.ok((await staticPage.locator('#product-character').textContent()).includes('Top notes'));assert.equal(await staticPage.locator('noscript a[href="contact.html"]').count(),1);await nojs.close();
 const mobile=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});const mp=await mobile.newPage();await mp.goto(base+'/index.html');await mp.locator('.menu-toggle').tap();await mp.locator('.fragrance-toggle').tap();await mp.waitForFunction(()=>getComputedStyle(document.querySelector('.fragrance-dropdown')).visibility==='visible');assert.equal(await mp.locator('.fragrance-toggle').getAttribute('aria-expanded'),'true');// Regression: real taps must follow every catalogue page's product links,
 // including candle collection templates that have no catalogue script.
 const catalogueRoutes=fs.readdirSync(root).filter(name=>name.endsWith('.html')&&fs.readFileSync(path.join(root,name),'utf8').includes('id="catalogue-grid"'));
 const mobileErrors=[];mp.on('pageerror',e=>mobileErrors.push(e.message));
 for(const route of catalogueRoutes){
  await mp.goto(base+'/'+route);const first=mp.locator('#catalogue-grid a[data-photo]').first();
  if(!await first.count())continue;
  const destination=await first.getAttribute('href');
  const toggle=mp.locator('.paired-product>.photo-toggle').first();
  if(await toggle.count()){
   const before=mp.url();await toggle.tap();assert.equal(mp.url(),before,'second-view button must not navigate');
   assert.equal(await toggle.getAttribute('aria-pressed'),'true');
   const second=toggle.locator('..').locator('.photo-packaging');
   await mp.waitForFunction(img=>Number(getComputedStyle(img).opacity)===1,await second.elementHandle());
   assert.ok(await second.evaluate(img=>img.complete&&img.naturalWidth>0),'second image must load');
   await toggle.tap();assert.equal(await toggle.getAttribute('aria-pressed'),'false');
  }
  await first.tap();await mp.waitForURL(base+'/'+destination);assert.equal(await mp.locator('#product-page-data').count(),1,route+' must open product detail');
 }
 assert.deepEqual(mobileErrors,[],'catalogue tap JS errors');
 await p.goto(base+'/candles-little-joys.html');
 const paired=p.locator('.paired-product .crystal-item').first();await paired.hover();
 await p.waitForFunction(img=>Number(getComputedStyle(img).opacity)===1,await paired.locator('.photo-packaging').elementHandle());
 assert.ok(await paired.locator('.photo-packaging').evaluate(img=>img.complete&&img.naturalWidth>0),'desktop hover image must load');
 // Imported Christmas pairs must keep their recommended scent, care and links.
 const christmasManifest=path.join(root,'assets/christmas-keepsakes-source-manifest.json');
 if(fs.existsSync(christmasManifest)){
  const imported=JSON.parse(fs.readFileSync(christmasManifest)).products;
  const records=JSON.parse(fs.readFileSync(path.join(root,'assets/product-details.json')));
  const layouts=JSON.parse(fs.readFileSync(path.join(root,'assets/catalogue-layouts.json'))).christmas;
  for(const product of imported){
   const record=records.find(r=>r.category==='christmas'&&r.image===product.image);
   const number=layouts.findIndex(page=>page.includes(product.image))+1;
   const collection='christmas-collection'+(number===1?'':'-'+number)+'.html';
   await mp.goto(base+'/'+collection);
   const card=mp.locator('#catalogue-grid a[href="'+record.url+'"]');
   const toggle=card.locator('..').locator('.photo-toggle');await toggle.tap();
   assert.equal(await toggle.getAttribute('aria-pressed'),'true');
   await mp.waitForFunction(img=>img.complete&&img.naturalWidth>0&&Number(getComputedStyle(img).opacity)===1,await card.locator('.photo-packaging').elementHandle());
   await card.tap();await mp.waitForURL(base+'/'+record.url);
   assert.equal(await mp.locator('#product-fragrance').inputValue(),product.assignedScent);
   assert.match(await mp.locator('main h1').textContent(),new RegExp(product.name));
   assert.match(await mp.locator('main').textContent(),new RegExp(product.productType));
   const care=await mp.locator('details').filter({has:mp.getByText('Use & Care',{exact:true})}).textContent();
   if(product.productType==='Reed diffuser'){assert.match(care,/inserting or turning reeds/);assert.doesNotMatch(care,/burning candle/);}
   else assert.match(care,/Never leave a burning candle unattended/);
   await p.goto(base+'/'+collection);const desktopCard=p.locator('#catalogue-grid a[href="'+record.url+'"]');
   await desktopCard.hover();await p.waitForFunction(img=>img.complete&&img.naturalWidth>0&&Number(getComputedStyle(img).opacity)===1,await desktopCard.locator('.photo-packaging').elementHandle());
  }
 }
 // Native links must also survive absent optional catalogue data.
 await mp.route('**/catalog*.js',route=>route.abort());await mp.goto(base+'/candles-little-joys.html');
 const native=mp.locator('#catalogue-grid a[data-photo]').first();const nativeTarget=await native.getAttribute('href');await native.tap();await mp.waitForURL(base+'/'+nativeTarget);
 await mobile.close();
 const missing=await p.request.get(base+'/__missing-seo-test.html');assert.equal(missing.status(),404);assert.ok((await missing.text()).includes('We couldn’t find that page'));await context.close();
 const summary={pageChecks:results.length,viewports:[1440,390],festiveStoriesDesigns:fs.existsSync(festiveStoriesManifest)?38:0,littleDaydreamsDesigns:fs.existsSync(daydreamManifest)?8:0,poeticMomentsDesigns:fs.existsSync(momentsManifest)?8:0,blueLandscapeAndButterflyDesigns:fs.existsSync(landscapeManifest)?3:0,christmasStorybookDesigns:fs.existsSync(storybookManifest)?15:0,fullProductPages:true,springSummerDesigns:fs.existsSync(seasonalManifest)?16:0,everydayPoetryDesigns:fs.existsSync(poetryManifest)?20:0,wildEleganceDesigns:fs.existsSync(wildManifest)?6:0,christmasPaginationCacheBypass:true,fragranceHover:true,mobileTap:true,catalogueTapPages:catalogueRoutes.length,productCardNativeNavigation:true,secondViewTouchToggle:true,productImageHover:true,importedChristmasPairs:true,escape:true,staticProductWithoutJS:true,fragranceSelectionAndReload:true,gallerySrcsetSwitch:true,inquiryBasket:true,whatsAppDraftIntercepted:true,local404:true,scope:'Local staged output; not proof of live host TLS/redirects or field CWV'};
 fs.mkdirSync(path.resolve(__dirname,'../docs/seo'),{recursive:true});fs.writeFileSync(path.resolve(__dirname,'../docs/seo/browser-results.json'),JSON.stringify(summary,null,2)+'\n');console.log(JSON.stringify(summary,null,2));
}finally{await browser.close();await new Promise(r=>server.close(r));}})().catch(e=>{console.error(e);server.close();process.exitCode=1});
