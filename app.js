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
 const isGift=location.pathname.endsWith('gifts.html');const tabs=document.querySelector('#category-tabs');let category,page;
 function readState(){const query=new URLSearchParams(location.search);category=isGift?'gift':['candle','reed','crystal'].includes(query.get('category'))?query.get('category'):'candle';const raw=Number(query.get('page'));page=Number.isSafeInteger(raw)&&raw>0?raw:1;page=Math.min(page,Math.ceil(catalogues[category].length/12));}
 function change(nextCategory,nextPage){const url=new URL(location.href);url.searchParams.set('category',nextCategory);url.searchParams.set('page',nextPage);history.pushState(null,'',url);readState();render();grid.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});document.querySelector('#pagination [aria-current="page"]').focus({preventScroll:true});}
 function render(){
  if(tabs){tabs.innerHTML=['candle','reed','crystal'].map(key=>`<button data-category="${key}" class="${key===category?'active':''}" aria-pressed="${key===category}">${categoryNames[key]}</button>`).join('');tabs.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>change(button.dataset.category,1)));document.querySelector('#catalogue-title').textContent=categoryNames[category];}
  const photos=catalogues[category];const start=(page-1)*12;grid.replaceChildren();photos.slice(start,start+12).forEach((photo,offset)=>{const card=document.createElement('button');card.type='button';card.className='crystal-item';card.dataset.photo=String(start+offset);card.innerHTML=`<img src="${photo.image}" alt="Lanarve ${escapeHtml(photo.name)}" loading="lazy"><span class="eyebrow">${escapeHtml(photo.series)}</span><h3>${escapeHtml(photo.name)}</h3><span class="product-link">VIEW PRODUCT <span>↗</span></span>`;card.addEventListener('click',()=>openPhoto(photo,category));grid.append(card);});
  const total=Math.ceil(photos.length/12);document.querySelector('#catalogue-count').textContent=`Showing ${start+1}–${Math.min(start+12,photos.length)} of ${photos.length} products · Page ${page} of ${total}`;
  const pager=document.querySelector('#pagination');pager.innerHTML=`<button data-page="${page-1}" ${page===1?'disabled':''} aria-label="Previous page">← Previous</button>${Array.from({length:total},(_,i)=>`<button data-page="${i+1}" ${page===i+1?'aria-current="page"':''} aria-label="Page ${i+1}">${i+1}</button>`).join('')}<button data-page="${page+1}" ${page===total?'disabled':''} aria-label="Next page">Next →</button>`;pager.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>change(category,Number(button.dataset.page))));
 }
 readState();render();window.addEventListener('popstate',()=>{readState();render()});
}
const filters=document.querySelector('.filters:not(#category-tabs)');
if(document.querySelector('#scent-grid')){
 let family='All';filters.innerHTML=['All',...new Set(scents.map(s=>s.family))].map(f=>`<button class="${f==='All'?'active':''}" aria-pressed="${f==='All'}" data-family="${f}">${f==='All'?'All fragrances':f}</button>`).join('');
 function renderScents(){const query=document.querySelector('#scent-search').value.trim().toLowerCase();const matches=scents.filter(s=>(family==='All'||s.family===family)&&`${s.name} ${s.notes} ${s.family}`.toLowerCase().includes(query));document.querySelector('#scent-grid').innerHTML=matches.map(s=>`<a class="scent-card" href="#${s.id}" data-scent="${s.id}"><span class="scent-family">${s.family}</span><span class="arrow">↗</span><h3>${escapeHtml(s.name)}</h3><span class="notes">${escapeHtml(s.notes)}</span></a>`).join('');document.querySelector('#empty').hidden=matches.length>0;document.querySelectorAll('[data-scent]').forEach(link=>link.addEventListener('click',e=>{e.preventDefault();history.replaceState(null,'',link.getAttribute('href'));scentDetail(scents.find(s=>s.id===link.dataset.scent));}));}
 filters.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>{family=button.dataset.family;filters.querySelectorAll('button').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});renderScents();}));document.querySelector('#scent-search').addEventListener('input',renderScents);renderScents();const initial=scents.find(s=>`#${s.id}`===location.hash);if(initial)scentDetail(initial);
}
