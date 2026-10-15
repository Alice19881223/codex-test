'use strict';
const dialog=document.querySelector('#product-dialog');
const content=document.querySelector('#dialog-content');
const escapeHtml=str=>str.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const categoryNames={candle:'Scented candles',reed:'Reed diffusers',crystal:'Crystal diffusers',gift:'Gift collections',christmas:'Christmas collection',sachets:'Scented tablets and sachets'};
const catalogues={candle:candleProducts,reed:reedProducts,crystal:crystalProducts,gift:giftProducts,christmas:christmasProducts,sachets:sachetsProducts};
function openPhoto(photo,category,scent){
 content.innerHTML=`<p class="eyebrow">LANARVE · ${escapeHtml(photo.series)}</p>${photo.packagingImage?`<div class="detail-photo-pair"><figure><img class="crystal-detail-image" src="${photo.image}" alt="Lanarve ${escapeHtml(photo.name)} — product"><figcaption>${escapeHtml(photo.viewLabels?.[0]||'THE PRODUCT')}</figcaption></figure><figure><img class="crystal-detail-image" src="${photo.packagingImage}" alt="Lanarve ${escapeHtml(photo.name)} — product with packaging"><figcaption>${escapeHtml(photo.viewLabels?.[1]||'WITH PACKAGING')}</figcaption></figure></div>`:`<img class="crystal-detail-image" src="${photo.image}" alt="Lanarve ${escapeHtml(photo.name)}">`}<h2 class="dialog-heading">${escapeHtml(photo.name)}</h2><p class="dialog-description">${categoryNames[category]}. Contact our team for fragrance options, product specifications and ordering information.</p>${scent?`<p><strong>${escapeHtml(scent.name)}</strong><br>${escapeHtml(scent.notes)}</p>${notePyramid(scent)}<p class="catalog-note">Suggested fragrance pairing. Final product availability to be confirmed.</p>`:''}<a class="text-link" href="contact.html">Product enquiries ↗</a>`;
 if(!dialog.open)dialog.showModal();
}
function notePyramid(scent){return `<dl class="note-pyramid">${[['Top notes',scent.top],['Heart notes',scent.heart],['Base notes',scent.base]].map(([label,notes])=>`<div><dt>${label}</dt><dd>${escapeHtml(notes.join(' · '))}</dd></div>`).join('')}</dl>`;}
function scentProductLinks(scent){return `<div class="scent-pairings">${scent.matches.map(match=>`<a class="scent-product-link" href="${escapeHtml(match.href)}"><img src="${escapeHtml(match.image)}" alt="${escapeHtml(match.name)}" loading="lazy"><span><strong>${escapeHtml(match.name)}</strong><small>${escapeHtml(categoryNames[match.category])} · ${escapeHtml(match.series)}</small></span><span aria-hidden="true">↗</span></a>`).join('')}</div>`;}
function scentDetail(scent){
 content.innerHTML=`<p class="eyebrow">${escapeHtml(scent.themes.join(' · '))}</p><h2 class="dialog-heading">${escapeHtml(scent.name)}</h2>${notePyramid(scent)}<p class="dialog-description">${escapeHtml(scent.description)}</p><h3>Suggested product pairings</h3>${scentProductLinks(scent)}<p class="catalog-note">Suggested fragrance profile and design pairings; contact us to confirm formulation and availability.</p>`;
 if(!dialog.open)dialog.showModal();
}
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
const menu=document.querySelector('.menu-toggle');menu.addEventListener('click',()=>{const open=document.querySelector('header nav').classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});
document.querySelector('#year').textContent=new Date().getFullYear();
const grid=document.querySelector('#catalogue-grid');
if(grid){
 const category=document.body.dataset.category;
 const photos=catalogues[category];
 grid.querySelectorAll('[data-photo]').forEach(card=>card.addEventListener('click',event=>{event.preventDefault();openPhoto(photos[Number(card.dataset.photo)],category);}));
 grid.querySelectorAll('.photo-toggle').forEach(button=>button.addEventListener('click',()=>{
  const card=button.closest('.paired-product');const packaged=card.classList.toggle('is-packaging');
  const photo=photos[Number(card.querySelector('[data-photo]').dataset.photo)];
  button.setAttribute('aria-pressed',String(packaged));button.textContent=photo.alternateView?(packaged?'View first image':'View another angle'):(packaged?'View product':'View packaging');
  button.setAttribute('aria-label',`Show ${photo.alternateView?(packaged?'first view':'another angle'):(packaged?'product':'packaging')} for ${photo.name}`);
 }));
 // Preserve older bookmarked category/page query links.
 const query=new URLSearchParams(location.search);
 if(query.has('category')||query.has('page')){
  const cat=category==='gift'?'gift':['candle','reed','crystal','christmas','sachets'].includes(query.get('category'))?query.get('category'):category;
  const raw=Number(query.get('page'));const collection=document.body.dataset.collection;const total=collection&&cat===category?Number(document.body.dataset.collectionCount):catalogues[cat].length;const page=Math.min(Number.isSafeInteger(raw)&&raw>0?raw:1,Math.ceil(total/12));
  const target=collection&&cat===category?`${cat==='reed'?'reeds':'candles'}-${collection}${page===1?'':`-${page}`}.html`:cat==='sachets'?(page===1?'sachets.html':`sachets-${page}.html`):cat==='christmas'?(page===1?'christmas-collection.html':`christmas-collection-${page}.html`):cat==='gift'?(page===1?'gift-collection.html':`gift-collection-${page}.html`):(cat==='candle'&&page===1?'products.html':`products-${cat}-${page}.html`);
  location.replace(target);
 }
}
const selectedProduct=new URLSearchParams(location.search).get('product');
if(selectedProduct&&grid){const category=document.body.dataset.category;const photo=catalogues[category]?.find(p=>p.image===selectedProduct);if(photo){const scent=scents.find(s=>s.id===new URLSearchParams(location.search).get('scent'));openPhoto(photo,category,scent);}}
const filters=document.querySelector('.filters:not(#category-tabs)');
if(document.querySelector('#scent-grid')){
 const requestedFamily=new URLSearchParams(location.search).get('family');let family=fragranceThemes.includes(requestedFamily)?requestedFamily:'All';
 filters.innerHTML=['All',...fragranceThemes].map(f=>`<button class="${f===family?'active':''}" aria-pressed="${f===family}" data-family="${f}">${f==='All'?'All fragrances':f}</button>`).join('');
 function renderScents(){
  const query=document.querySelector('#scent-search').value.trim().toLowerCase();
  const matches=scents.filter(s=>(family==='All'||s.themes.includes(family))&&`${s.name} ${s.top.join(' ')} ${s.heart.join(' ')} ${s.base.join(' ')} ${s.description} ${s.themes.join(' ')}`.toLowerCase().includes(query));
  document.querySelector('#scent-grid').innerHTML=matches.map(s=>`<article class="scent-card"><span class="scent-family">${escapeHtml(s.themes.join(' · '))}</span><h3><button class="scent-detail-button" data-scent="${s.id}" aria-label="Explore ${escapeHtml(s.name)}">${escapeHtml(s.name)} <span aria-hidden="true">↗</span></button></h3>${notePyramid(s)}<p class="scent-scenario">${escapeHtml(s.description)}</p><h4>Suggested pairings</h4>${scentProductLinks(s)}</article>`).join('');
  document.querySelector('#empty').hidden=matches.length>0;
  document.querySelector('#scent-result-count').textContent=`${matches.length} fragrance${matches.length===1?'':'s'} · ${family==='All'?'All five themes':family}`;
  document.querySelectorAll('[data-scent]').forEach(button=>button.addEventListener('click',()=>{history.replaceState(null,'',`${location.pathname}${location.search}#${button.dataset.scent}`);scentDetail(scents.find(s=>s.id===button.dataset.scent));}));
 }
 filters.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>{family=button.dataset.family;filters.querySelectorAll('button').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});const url=new URL(location.href);family==='All'?url.searchParams.delete('family'):url.searchParams.set('family',family);url.hash='';history.replaceState(null,'',url);renderScents();}));
 document.querySelector('#scent-search').addEventListener('input',renderScents);renderScents();
 const initial=scents.find(s=>`#${s.id}`===location.hash);if(initial)scentDetail(initial);
}

const carousel=document.querySelector('.home-page .hero');
if(carousel){
 const slides=[...carousel.querySelectorAll('.hero-slide')];const dots=[...carousel.querySelectorAll('[data-slide]')];const pause=carousel.querySelector('#carousel-pause');const reduced=matchMedia('(prefers-reduced-motion: reduce)');let active=0;let userPaused=reduced.matches;let timer;
 const names=['SCENTED CANDLES','REED DIFFUSERS','CRYSTAL DIFFUSERS'];const links=['products-current.html','reed-collections.html','products-crystal-1.html'];
 function show(index){active=(index+slides.length)%slides.length;slides.forEach((slide,i)=>{slide.classList.toggle('is-active',i===active);slide.setAttribute('aria-hidden',String(i!==active));});dots.forEach((dot,i)=>{dot.classList.toggle('is-active',i===active);dot.setAttribute('aria-pressed',String(i===active));});document.querySelector('#slide-label').textContent=`0${active+1} / 03 · ${names[active]}`;document.querySelector('#hero-collection-link').href=links[active];carousel.querySelectorAll('.carousel-arrow img').forEach(img=>{img.src=`assets/nav-${['candle','reed','crystal'][active]}.svg`;});}
 function stop(){clearInterval(timer);timer=undefined;}
 function start(){stop();if(!userPaused&&!document.hidden&&!carousel.contains(document.activeElement))timer=setInterval(()=>show(active+1),6500);}
 function syncPause(){carousel.classList.toggle('is-motion-paused',userPaused);pause.setAttribute('aria-pressed',String(userPaused));pause.setAttribute('aria-label',userPaused?'Start banner rotation':'Pause banner rotation');pause.textContent=userPaused?'▷':'Ⅱ';}
 dots.forEach(dot=>dot.addEventListener('click',()=>{show(Number(dot.dataset.slide));start();}));carousel.querySelectorAll('[data-direction]').forEach(button=>button.addEventListener('click',()=>{show(active+Number(button.dataset.direction));start();}));pause.addEventListener('click',()=>{userPaused=!userPaused;syncPause();start();});carousel.addEventListener('focusin',stop);carousel.addEventListener('focusout',()=>setTimeout(start,0));document.addEventListener('visibilitychange',start);reduced.addEventListener('change',()=>{if(reduced.matches){userPaused=true;syncPause();start();}});syncPause();start();
}
