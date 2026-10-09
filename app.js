'use strict';
const dialog=document.querySelector('#product-dialog');
const content=document.querySelector('#dialog-content');
const escapeHtml=str=>str.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const categoryNames={candle:'Scented candles',reed:'Reed diffusers',crystal:'Crystal diffusers',gift:'Gift collections'};
const catalogues={candle:candleProducts,reed:reedProducts,crystal:crystalProducts,gift:[...crystalProducts,...reedProducts.filter(p=>p.name.includes('Gift Set')),...candleProducts.filter(p=>['Her · Him · Us','Floral Reverie','Christmas'].includes(p.series))]};
function openPhoto(photo,category,scent){
 content.innerHTML=`<p class="eyebrow">LANARVE · ${escapeHtml(photo.series)}</p><img class="crystal-detail-image" src="${photo.image}" alt="Lanarve ${escapeHtml(photo.name)}"><h2 class="dialog-heading">${escapeHtml(photo.name)}</h2><p class="dialog-description">${categoryNames[category]}. Contact our team for fragrance options, product specifications and ordering information.</p>${scent?`<p><strong>${escapeHtml(scent.name)}</strong><br>${escapeHtml(scent.notes)}</p><p class="catalog-note">Suggested fragrance pairing. Final product availability to be confirmed.</p>`:''}<a class="text-link" href="contact.html">Product enquiries ↗</a>`;
 if(!dialog.open)dialog.showModal();
}
function productDetail(key,scent){openPhoto(catalogues[key][0],key,scent)}
function scentDetail(scent){
 content.innerHTML=`<p class="eyebrow">${scent.family.toUpperCase()} · FRAGRANCE NO. ${String(scents.indexOf(scent)+1).padStart(2,'0')}</p><h2 class="dialog-heading">${escapeHtml(scent.name)}</h2><p class="dialog-description">${escapeHtml(scent.notes)}</p><p>Discover this fragrance direction in:</p><div class="dialog-products">${scent.products.map(key=>`<button data-match="${key}">${products[key].title} ↗</button>`).join('')}</div><p class="catalog-note">Suggested product pairings; final availability to be confirmed.</p>`;
 if(!dialog.open)dialog.showModal();
 content.querySelectorAll('[data-match]').forEach(button=>button.addEventListener('click',()=>productDetail(button.dataset.match,scent)));
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
 // Preserve older bookmarked category/page query links.
 const query=new URLSearchParams(location.search);
 if(query.has('category')||query.has('page')){
  const cat=category==='gift'?'gift':['candle','reed','crystal'].includes(query.get('category'))?query.get('category'):category;
  const raw=Number(query.get('page'));const page=Math.min(Number.isSafeInteger(raw)&&raw>0?raw:1,Math.ceil(catalogues[cat].length/12));
  const target=cat==='gift'?(page===1?'gifts.html':`gifts-${page}.html`):(cat==='candle'&&page===1?'products.html':`products-${cat}-${page}.html`);
  location.replace(target);
 }
}
const filters=document.querySelector('.filters:not(#category-tabs)');
if(document.querySelector('#scent-grid')){
 let family='All';filters.innerHTML=['All',...new Set(scents.map(s=>s.family))].map(f=>`<button class="${f==='All'?'active':''}" aria-pressed="${f==='All'}" data-family="${f}">${f==='All'?'All fragrances':f}</button>`).join('');
 function renderScents(){const query=document.querySelector('#scent-search').value.trim().toLowerCase();const matches=scents.filter(s=>(family==='All'||s.family===family)&&`${s.name} ${s.notes} ${s.family}`.toLowerCase().includes(query));document.querySelector('#scent-grid').innerHTML=matches.map(s=>`<a class="scent-card" href="#${s.id}" data-scent="${s.id}"><span class="scent-family">${s.family}</span><span class="arrow">↗</span><h3>${escapeHtml(s.name)}</h3><span class="notes">${escapeHtml(s.notes)}</span></a>`).join('');document.querySelector('#empty').hidden=matches.length>0;document.querySelectorAll('[data-scent]').forEach(link=>link.addEventListener('click',e=>{e.preventDefault();history.replaceState(null,'',link.getAttribute('href'));scentDetail(scents.find(s=>s.id===link.dataset.scent));}));}
 filters.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>{family=button.dataset.family;filters.querySelectorAll('button').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});renderScents();}));document.querySelector('#scent-search').addEventListener('input',renderScents);renderScents();const initial=scents.find(s=>`#${s.id}`===location.hash);if(initial)scentDetail(initial);
}

const productMenuToggle=document.querySelector('.product-menu-toggle');
const productMenu=document.querySelector('#product-menu');
function closeProductMenu(){productMenu.hidden=true;productMenuToggle.setAttribute('aria-expanded','false');}
productMenuToggle.addEventListener('click',()=>{const open=productMenu.hidden;productMenu.hidden=!open;productMenuToggle.setAttribute('aria-expanded',String(open));});
document.addEventListener('click',e=>{if(!e.target.closest('.product-navigation'))closeProductMenu();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!productMenu.hidden){closeProductMenu();productMenuToggle.focus();}});

const carousel=document.querySelector('.home-page .hero');
if(carousel){
 const slides=[...carousel.querySelectorAll('.hero-slide')];const dots=[...carousel.querySelectorAll('[data-slide]')];const pause=carousel.querySelector('#carousel-pause');const reduced=matchMedia('(prefers-reduced-motion: reduce)');let active=0;let userPaused=reduced.matches;let timer;
 const names=['SCENTED CANDLES','REED DIFFUSERS','CRYSTAL DIFFUSERS'];const links=['products-current.html','products-reed-1.html','products-crystal-1.html'];
 function show(index){active=(index+slides.length)%slides.length;slides.forEach((slide,i)=>{slide.classList.toggle('is-active',i===active);slide.setAttribute('aria-hidden',String(i!==active));});dots.forEach((dot,i)=>{dot.classList.toggle('is-active',i===active);dot.setAttribute('aria-pressed',String(i===active));});document.querySelector('#slide-label').textContent=`0${active+1} / 03 · ${names[active]}`;document.querySelector('#hero-collection-link').href=links[active];}
 function stop(){clearInterval(timer);timer=undefined;}
 function start(){stop();if(!userPaused&&!document.hidden&&!carousel.matches(':hover')&&!carousel.contains(document.activeElement))timer=setInterval(()=>show(active+1),6500);}
 function syncPause(){pause.setAttribute('aria-pressed',String(userPaused));pause.setAttribute('aria-label',userPaused?'Start banner rotation':'Pause banner rotation');pause.textContent=userPaused?'▷':'Ⅱ';}
 dots.forEach(dot=>dot.addEventListener('click',()=>{show(Number(dot.dataset.slide));start();}));carousel.querySelectorAll('[data-direction]').forEach(button=>button.addEventListener('click',()=>{show(active+Number(button.dataset.direction));start();}));pause.addEventListener('click',()=>{userPaused=!userPaused;syncPause();start();});carousel.addEventListener('mouseenter',stop);carousel.addEventListener('mouseleave',start);carousel.addEventListener('focusin',stop);carousel.addEventListener('focusout',()=>setTimeout(start,0));document.addEventListener('visibilitychange',start);reduced.addEventListener('change',()=>{if(reduced.matches){userPaused=true;syncPause();start();}});syncPause();start();
}
