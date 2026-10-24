const {chromium}=require('playwright');const assert=require('node:assert/strict');const fs=require('node:fs');const http=require('node:http');const path=require('node:path');
const root=path.resolve(__dirname,'../_site');const types={'.html':'text/html; charset=utf-8','.js':'application/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.woff':'font/woff','.xml':'application/xml','.txt':'text/plain'};
const server=http.createServer((req,res)=>{const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);const file=path.resolve(root,'.'+pathname+(pathname.endsWith('/')?'index.html':''));if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}fs.readFile(file,(err,data)=>{if(err){res.writeHead(404,{'Content-Type':'text/html'});res.end(fs.readFileSync(path.join(root,'404.html')));return;}res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream'});res.end(data);});});
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port;const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox']});const results=[];
try{
 const routes=['index.html','products-current.html','reed-collections.html','products-crystal-1.html','gift-collection.html','christmas-collection-2.html','sachets.html','candles-morning-light-2.html','fragrance.html','fragrance-pear-freesia.html','private-label.html','contact.html','product-lnv-cnd-02454833.html'];
 for(const width of [1440,390]){const context=await browser.newContext({viewport:{width,height:1000},isMobile:width===390,hasTouch:width===390});for(const route of routes){const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));const response=await page.goto(base+'/'+route,{waitUntil:'load'});assert.equal(response.status(),200);assert.equal(await page.locator('main h1').count(),1,route+' H1');assert.equal(await page.locator('link[rel=canonical]').count(),1);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,route+' overflow at '+width);assert.deepEqual(errors,[],route+' JS errors');if(route==='index.html'){const cta=await page.locator('.hero-content .button').boundingBox();const hero=await page.locator('.hero').boundingBox();const controls=await page.locator('.hero-bottom').boundingBox();assert.ok(cta.y+cta.height<=hero.y+hero.height,'hero CTA must stay inside the hero');assert.ok(cta.y+cta.height<controls.y,'hero CTA must not overlap carousel controls');}results.push({route,width,errors});await page.close();}await context.close();}
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
   await page.goto(base+'/products-current.html');assert.equal(await page.locator('.candle-mood-card').count(),5);
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
   assert.deepEqual(await animalPage.locator('#catalogue-grid h3').allTextContents(),designs.map(d=>d.name));
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
 const summary={pageChecks:results.length,viewports:[1440,390],everydayPoetryDesigns:fs.existsSync(poetryManifest)?20:0,wildEleganceDesigns:fs.existsSync(wildManifest)?6:0,christmasPaginationCacheBypass:true,fragranceHover:true,mobileTap:true,catalogueTapPages:catalogueRoutes.length,productCardNativeNavigation:true,secondViewTouchToggle:true,productImageHover:true,importedChristmasPairs:true,escape:true,staticProductWithoutJS:true,fragranceSelectionAndReload:true,gallerySrcsetSwitch:true,inquiryBasket:true,whatsAppDraftIntercepted:true,local404:true,scope:'Local staged output; not proof of live host TLS/redirects or field CWV'};
 fs.mkdirSync(path.resolve(__dirname,'../docs/seo'),{recursive:true});fs.writeFileSync(path.resolve(__dirname,'../docs/seo/browser-results.json'),JSON.stringify(summary,null,2)+'\n');console.log(JSON.stringify(summary,null,2));
}finally{await browser.close();await new Promise(r=>server.close(r));}})().catch(e=>{console.error(e);server.close();process.exitCode=1});
