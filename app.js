'use strict';
const dialog=document.querySelector('#product-dialog');
const content=document.querySelector('#dialog-content');
const escapeHtml=str=>str.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const categoryNames={candle:'Scented candles',reed:'Reed diffusers',crystal:'Crystal diffusers',gift:'Gift collections',christmas:'Christmas collection',sachets:'Scented tablets and sachets'};
const catalogues={candle:candleProducts,reed:reedProducts,crystal:crystalProducts,gift:giftProducts,christmas:christmasProducts,sachets:sachetsProducts};
function openPhoto(photo,category,scent){
 const page=productPages[category]?.[photo.image];if(page)location.assign(page+(scent?'?scent='+encodeURIComponent(scent.id):''));
}
function notePyramid(scent){return `<dl class="note-pyramid">${[['Top notes',scent.top],['Heart notes',scent.heart],['Base notes',scent.base]].map(([label,notes])=>`<div><dt>${label}</dt><dd>${escapeHtml(notes.join(' · '))}</dd></div>`).join('')}</dl>`;}
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
const menu=document.querySelector('.menu-toggle');menu.addEventListener('click',()=>{const open=document.querySelector('header nav').classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});
const yearLabel=document.querySelector('#year');
if(yearLabel)yearLabel.textContent=new Date().getFullYear();
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
  const raw=Number(query.get('page'));const collection=document.body.dataset.collection;const total=collection&&cat===category?Number(document.body.dataset.collectionCount):catalogues[cat].length;const page=Math.min(Number.isSafeInteger(raw)&&raw>0?raw:1,(collection&&cat===category?Number(document.body.dataset.collectionPages)||Math.ceil(total/12):Number(document.body.dataset.cataloguePages)||Math.ceil(total/12)));
  const target=collection&&cat===category?`${cat==='reed'?'reeds':'candles'}-${collection}${page===1?'':`-${page}`}.html`:cat==='sachets'?(page===1?'sachets.html':`sachets-${page}.html`):cat==='christmas'?(page===1?'christmas-collection.html':`christmas-collection-${page}.html`):cat==='gift'?(page===1?'gift-collection.html':`gift-collection-${page}.html`):(cat==='candle'&&page===1?'products.html':`products-${cat}-${page}.html`);
  location.replace(target);
 }
}
const selectedProduct=new URLSearchParams(location.search).get('product');
if(selectedProduct&&grid){const category=document.body.dataset.category;const photo=catalogues[category]?.find(p=>p.image===selectedProduct||p.legacyImages?.includes(selectedProduct));if(photo){const scent=scents.find(s=>s.id===new URLSearchParams(location.search).get('scent'));openPhoto(photo,category,scent);}}
// The fragrance button opens an inline menu; every scent goes straight to a product.
const fragranceNavigation=document.querySelector('.fragrance-navigation');
const fragranceToggle=fragranceNavigation?.querySelector('.fragrance-toggle');
function setFragranceMenu(open){if(!fragranceNavigation)return;fragranceNavigation.classList.toggle('is-open',open);fragranceToggle.setAttribute('aria-expanded',String(open));}
fragranceNavigation?.addEventListener('pointerenter',event=>{if(event.pointerType!=='touch')setFragranceMenu(true);});
fragranceNavigation?.addEventListener('pointerleave',()=>{if(!fragranceNavigation.contains(document.activeElement))setFragranceMenu(false);});
fragranceNavigation?.addEventListener('focusin',()=>setFragranceMenu(true));
fragranceNavigation?.addEventListener('focusout',event=>{if(!fragranceNavigation.contains(event.relatedTarget))setFragranceMenu(false);});
fragranceToggle?.addEventListener('click',()=>setFragranceMenu(true));
document.addEventListener('pointerdown',event=>{if(!fragranceNavigation?.contains(event.target))setFragranceMenu(false);});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&fragranceNavigation?.classList.contains('is-open')){fragranceToggle.focus();setFragranceMenu(false);}});
if(new URLSearchParams(location.search).get('fragrances')==='open'){
 if(matchMedia('(max-width:1200px)').matches){document.querySelector('header nav').classList.add('open');menu.setAttribute('aria-expanded','true');}
 setFragranceMenu(true);
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
