'use strict';
const products = {
 candle: { title: 'Scented candle', description: 'A warm glow, a gentle scent, a moment just for you. Explore a candle ritual for slow evenings and everyday pauses.', label: 'The art of slowing down.' },
 reed: { title: 'Reed diffuser', description: 'A quiet, continuous presence. Discover fragrances designed to bring a welcoming feeling to living rooms, entryways and personal spaces.', label: 'A beautiful, lasting presence.' },
 crystal: { title: 'Crystal diffuser', description: 'A sculptural scent ritual. Pair decorative crystals with your preferred fragrance to create a personal accent for a desk, bedside or reading corner.', label: 'Scent, in a different light.' },
 gift: { title: 'The ritual gift set', description: 'Explore beautifully presented crystal diffuser gift sets, including glass dome, sculpted bowl and botanical glass designs. Contact us to discuss your preferred collection and fragrance.', label: 'Beautiful to give. Lovely to keep.' }
};
const scents = [
 ['Santal & Amber','Woody','Sandalwood · amber · musk'],['Cedar & Fig','Woody','Cedar · fig leaf · green woods'],['Hinoki Forest','Woody','Hinoki · cypress · moss'],['Oud & Saffron','Woody','Oud · saffron · dry woods'],['Vetiver & Moss','Woody','Vetiver · oakmoss · earth'],
 ['Rose & Peony','Floral','Rose · peony · soft musk'],['Jasmine Tea','Floral','Jasmine · tea leaf · musk'],['White Neroli','Floral','Neroli · orange blossom · petitgrain'],['Iris & Violet','Floral','Iris · violet · powder'],['Tuberose at Dusk','Floral','Tuberose · jasmine · cream'],
 ['Bergamot & Lime','Citrus','Bergamot · lime · green tea'],['Yuzu & Ginger','Citrus','Yuzu · ginger · lemon'],['Mandarin Grove','Citrus','Mandarin · orange leaf · cedar'],['Grapefruit & Basil','Citrus','Grapefruit · basil · vetiver'],['Lemon Verbena','Citrus','Lemon · verbena · green leaf'],
 ['Sea Salt & Sage','Fresh','Sea salt · sage · driftwood'],['White Tea','Fresh','White tea · bergamot · musk'],['Lavender Linen','Fresh','Lavender · clean linen · musk'],['Eucalyptus Mint','Fresh','Eucalyptus · mint · green notes'],['Rain & Bamboo','Fresh','Bamboo · watery notes · green leaf'],
 ['Vanilla & Tonka','Gourmand','Vanilla · tonka · soft woods'],['Pistachio Cream','Gourmand','Pistachio · almond · vanilla'],['Coconut & Sandalwood','Gourmand','Coconut · sandalwood · cream'],['Coffee & Cacao','Gourmand','Coffee · cacao · vanilla'],['Pear & Freesia','Gourmand','Pear · freesia · soft amber'],
 ['Amber & Cashmere','Warm','Amber · cashmere woods · musk'],['Black Tea & Spice','Warm','Black tea · cardamom · cedar'],['Incense & Myrrh','Warm','Incense · myrrh · resins'],['Suede & Santal','Warm','Suede · sandalwood · musk'],['Cardamom & Cedar','Warm','Cardamom · cedar · amber']
].map(([name,family,notes],index)=>({id:`fragrance-${index+1}`,name,family,notes,products:family==='Gourmand'?['candle','reed']:['candle','reed','crystal']}));
const dialog = document.querySelector('#product-dialog');
const content = document.querySelector('#dialog-content');
const escapeHtml = str => str.replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
function productDetail(key,scent){
 const product=products[key];
 const photo=key==='reed'?'assets/reeds/reed-03.webp':key==='crystal'?'assets/crystals/crystal-04.webp':key==='gift'?'assets/crystals/crystal-11.webp':'assets/still-life.svg';
 content.innerHTML=`<p class="eyebrow">LANARVE · THE COLLECTION</p><img class="dialog-image" src="${photo}" alt="${product.title} — Lanarve"><h2 class="dialog-heading">${product.title}</h2><p class="dialog-description">${product.description}</p>${scent?`<p><strong>${escapeHtml(scent.name)}</strong><br>${escapeHtml(scent.notes)}</p>`:''}<p class="catalog-note">Fragrance pairing and specifications are subject to confirmation. Contact our team for product details.</p><a class="text-link" href="#contact" id="enquire-link">Product enquiries ↗</a>`;
 if(!dialog.open)dialog.showModal();
 content.querySelector('#enquire-link').addEventListener('click',()=>dialog.close());
}
function scentDetail(scent){
 content.innerHTML=`<p class="eyebrow">${scent.family.toUpperCase()} · FRAGRANCE NO. ${String(scents.indexOf(scent)+1).padStart(2,'0')}</p><h2 class="dialog-heading">${escapeHtml(scent.name)}</h2><p class="dialog-description">${escapeHtml(scent.notes)}</p><p>Discover this fragrance direction in:</p><div class="dialog-products">${scent.products.map(key=>`<button data-match="${key}">${products[key].title} ↗</button>`).join('')}</div><p class="catalog-note">Suggested product pairings for this concept catalogue; final availability to be confirmed.</p>`;
 if(!dialog.open)dialog.showModal();
 content.querySelectorAll('[data-match]').forEach(button=>button.addEventListener('click',()=>productDetail(button.dataset.match,scent)));
}
document.querySelector('#product-grid').innerHTML=['candle','reed','crystal'].map((key,index)=>`<button class="product-card" data-product="${key}" id="product-${key}"><div class="product-image ${key}"><img src="${key==='reed'?'assets/reeds/reed-03.webp':key==='crystal'?'assets/crystals/crystal-04.webp':'assets/still-life.svg'}" alt="${products[key].title} — Lanarve" loading="lazy"><span class="product-number">0${index+1}</span></div><h3>${products[key].title}</h3><p>${products[key].label}</p><span class="product-link">EXPLORE COLLECTION <span>↗</span></span></button>`).join('');
document.querySelectorAll('[data-product]').forEach(button=>button.addEventListener('click',()=>productDetail(button.dataset.product)));
let family='All';
const filters=document.querySelector('.filters');
filters.innerHTML=['All',...new Set(scents.map(s=>s.family))].map(f=>`<button class="${f==='All'?'active':''}" aria-pressed="${f==='All'}" data-family="${f}">${f==='All'?'All fragrances':f}</button>`).join('');
function renderScents(){
 const query=document.querySelector('#scent-search').value.trim().toLowerCase();
 const matches=scents.filter(s=>(family==='All'||s.family===family)&&`${s.name} ${s.notes} ${s.family}`.toLowerCase().includes(query));
 document.querySelector('#scent-grid').innerHTML=matches.map(s=>`<a class="scent-card" href="#${s.id}" data-scent="${s.id}"><span class="scent-family">${s.family}</span><span class="arrow">↗</span><h3>${escapeHtml(s.name)}</h3><span class="notes">${escapeHtml(s.notes)}</span></a>`).join('');
 document.querySelector('#empty').hidden=matches.length>0;
 document.querySelectorAll('[data-scent]').forEach(link=>link.addEventListener('click',event=>{event.preventDefault();history.replaceState(null,'',link.getAttribute('href'));scentDetail(scents.find(s=>s.id===link.dataset.scent));}));
}
filters.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>{family=button.dataset.family;filters.querySelectorAll('button').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});renderScents();}));
document.querySelector('#scent-search').addEventListener('input',renderScents);
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
const menu=document.querySelector('.menu-toggle');
menu.addEventListener('click',()=>{const open=document.querySelector('nav').classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});
document.querySelectorAll('nav a').forEach(link=>link.addEventListener('click',()=>{document.querySelector('nav').classList.remove('open');menu.setAttribute('aria-expanded','false');document.querySelectorAll('nav a').forEach(a=>a.classList.toggle('active',a===link));}));
document.querySelector('#year').textContent=new Date().getFullYear();
renderScents();
const initial=scents.find(s=>`#${s.id}`===location.hash);if(initial)scentDetail(initial);

const crystalProducts = [{"name": "Peach Whisper", "image": "assets/crystals/crystal-01.webp", "series": "Glass dome"}, {"name": "Lavender Reverie", "image": "assets/crystals/crystal-02.webp", "series": "Glass dome"}, {"name": "Morning Mist", "image": "assets/crystals/crystal-03.webp", "series": "Glass dome"}, {"name": "Verdant Calm", "image": "assets/crystals/crystal-04.webp", "series": "Glass dome"}, {"name": "Cedar Relief", "image": "assets/crystals/crystal-05.webp", "series": "Sculpted bowl"}, {"name": "Ivory Texture", "image": "assets/crystals/crystal-06.webp", "series": "Sculpted bowl"}, {"name": "Ivory Relief", "image": "assets/crystals/crystal-07.webp", "series": "Sculpted bowl"}, {"name": "Amber Dusk", "image": "assets/crystals/crystal-08.webp", "series": "Sculpted bowl"}, {"name": "Blue Serenity", "image": "assets/crystals/crystal-09.webp", "series": "Botanical glass"}, {"name": "Purple Mist", "image": "assets/crystals/crystal-10.webp", "series": "Botanical glass"}, {"name": "Rose Mist", "image": "assets/crystals/crystal-11.webp", "series": "Botanical glass"}, {"name": "Botanical Light", "image": "assets/crystals/crystal-12.webp", "series": "Botanical glass"}, {"name": "Forest Reverie", "image": "assets/crystals/crystal-13.webp", "series": "Botanical glass"}];
const gallery=document.querySelector('#crystal-gallery');
gallery.innerHTML=crystalProducts.map((p,i)=>`<button class="crystal-item" data-crystal="${i}"><img src="${p.image}" alt="Lanarve ${p.name} crystal diffuser gift set" loading="lazy"><span class="eyebrow">${p.series}</span><h3>${p.name}</h3><span class="product-link">VIEW GIFT SET <span>↗</span></span></button>`).join('');
gallery.querySelectorAll('[data-crystal]').forEach(button=>button.addEventListener('click',()=>{const p=crystalProducts[Number(button.dataset.crystal)];content.innerHTML=`<p class="eyebrow">LANARVE · ${p.series}</p><img class="crystal-detail-image" src="${p.image}" alt="${p.name} crystal diffuser gift set"><h2 class="dialog-heading">${p.name}</h2><p class="dialog-description">Crystal diffuser gift set. Contact our team for fragrance options, specifications and ordering information.</p><a class="text-link" href="#contact" id="enquire-link">Product enquiries ↗</a>`;dialog.showModal();content.querySelector('#enquire-link').addEventListener('click',()=>dialog.close());}));

const reedProducts = [{"name": "Colour Collection", "image": "assets/reeds/reed-01.webp", "series": "Reed diffuser collection"}, {"name": "Seven-Colour Gift Set", "image": "assets/reeds/reed-02.webp", "series": "Reed diffuser gift set"}, {"name": "Rain Forest Reed Diffuser", "image": "assets/reeds/reed-03.webp", "series": "Reed diffuser"}, {"name": "Rain Forest Bottle & Box", "image": "assets/reeds/reed-04.webp", "series": "Fragrance bottle and packaging"}];
const reedGallery=document.querySelector('#reed-gallery');
reedGallery.innerHTML=reedProducts.map((p,i)=>`<button class="crystal-item" data-reed="${i}"><img src="${p.image}" alt="Lanarve ${p.name}" loading="lazy"><span class="eyebrow">${p.series}</span><h3>${p.name}</h3><span class="product-link">VIEW COLLECTION <span>↗</span></span></button>`).join('');
reedGallery.querySelectorAll('[data-reed]').forEach(button=>button.addEventListener('click',()=>{const p=reedProducts[Number(button.dataset.reed)];content.innerHTML=`<p class="eyebrow">LANARVE · ${p.series}</p><img class="crystal-detail-image" src="${p.image}" alt="Lanarve ${p.name}"><h2 class="dialog-heading">${p.name}</h2><p class="dialog-description">Contact our team for fragrance options, product specifications and ordering information.</p><a class="text-link" href="#contact" id="enquire-link">Product enquiries ↗</a>`;dialog.showModal();content.querySelector('#enquire-link').addEventListener('click',()=>dialog.close());}));
