'use strict';
(() => {
 const node=document.querySelector('#product-page-data');if(!node)return;
 const product=JSON.parse(node.textContent);const $=selector=>document.querySelector(selector);const field=$('#product-fragrance');
 const inspirations={
  'Floral & Fruity':'Think of petals opening in gentle sunlight and ripe fruit on a summer table. A softly expressive fragrance direction for everyday celebrations.',
  'Warm & Woody':'Think of a quiet room, warm timber and a favourite soft throw. A comforting fragrance direction for slow evenings and welcoming spaces.',
  'Fresh & Natural':'Think of open windows, dewy greenery and a bright citrus breeze. A clean, uplifting fragrance direction for a fresh start to the day.',
  'Tea & Tranquility':'Think of freshly steeped tea, delicate blossoms and a moment of stillness. A composed fragrance direction for reading, reflection and gentle daily rituals.',
  'Oriental Mystery':'Think of glowing resins, textured woods and a lingering trail of spice. A deeper fragrance direction for intimate evenings and reflective spaces.'
 };
 function group(label,items){if(!items.length)return '';return `<optgroup label="${escapeHtml(label)}">${items.map(s=>`<option value="${s.id}">${escapeHtml(s.name)}</option>`).join('')}</optgroup>`;}
 const suggested=scents.filter(s=>product.suggestedScents.includes(s.id));
 field.innerHTML='<option value="">Discuss fragrance options</option>'+group('Suggested for this design',suggested)+group('Other directions to discuss',scents.filter(s=>!product.suggestedScents.includes(s.id)));
 const requested=new URLSearchParams(location.search).get('scent');
 if(scents.some(s=>s.id===requested))field.value=requested;
 else if(suggested.length){const ranked=suggested.map(s=>({s,score:s.name.toLowerCase().split(/[^a-z]+/).filter(word=>word.length>3&&product.name.toLowerCase().includes(word)).length})).sort((a,b)=>b.score-a.score);field.value=ranked[0].s.id;}
 function selectedScent(){return scents.find(s=>s.id===field.value);}
 function updateScent(){
  const s=selectedScent();$('#product-short-description').textContent=s?s.description:'A thoughtfully presented fragrance design for beautiful everyday spaces.';
  $('#product-scent-tags').innerHTML=s?s.themes.map(theme=>`<span>${escapeHtml(theme)}</span>`).join(''):'';
  $('#product-key-notes').textContent=s?'Key notes: '+[...new Set([...s.heart,...s.base])].slice(0,4).join(' · '):'';
  $('#product-smells-like').textContent=s?`${s.description.split(';')[0]}. A first impression of ${s.top.join(' and ').toLowerCase()} opens into ${s.heart.join(' and ').toLowerCase()}, resting on ${s.base.join(' and ').toLowerCase()}.`:'Choose a fragrance direction above to explore its notes and mood.';
  $('#product-notes').innerHTML=s?notePyramid(s):'';
  $('#product-character').innerHTML=s?`<h3>Scent Character</h3><p>${escapeHtml(s.description.split(';')[0])}</p>`:'';
  $('#product-inspiration').textContent=s?inspirations[s.themes[0]]:'Create a fragrance moment around your brand and the spaces your customers love.';
  $('#product-mood').textContent=s?s.description:'Discuss your intended room, season and gifting occasion with our team.';
  $('#product-spaces').textContent=s?(s.description.split(';')[1]||s.description).trim().replace(/^./,c=>c.toUpperCase()):'Space and atmosphere suggestions follow the selected fragrance direction.';
  updateSelectionSummary();
  const url=new URL(location.href);s?url.searchParams.set('scent',s.id):url.searchParams.delete('scent');history.replaceState(null,'',url);
 }
 field.addEventListener('change',updateScent);updateScent();
 document.querySelectorAll('[data-gallery-src]').forEach(button=>button.addEventListener('click',()=>{
  $('#product-main-image').src=button.dataset.gallerySrc;$('#product-main-image').alt=product.title+' — '+button.getAttribute('aria-label');
  document.querySelectorAll('[data-gallery-src]').forEach(other=>other.setAttribute('aria-pressed',String(other===button)));
  $('#gallery-caption').textContent=button.querySelector('img').alt;
 }));
 function updateSelectionSummary(){const s=selectedScent();$('#enquiry-selection-summary').textContent=`Fragrance: ${s?.name||'Discuss fragrance options'} · ${$('#product-presentation').value} · Capacity / net weight: ${$('#product-capacity').value.trim()||'Specification to confirm'} · Quantity requested: ${$('#product-quantity').value||'Please specify'}`;}
 ['#product-presentation','#product-capacity','#product-quantity'].forEach(selector=>$(selector).addEventListener('input',updateSelectionSummary));
 const storageKey='lanarve-product-inquiry-v1';
 function basket(){try{const data=JSON.parse(localStorage.getItem(storageKey)||'[]');return Array.isArray(data)?data.filter(item=>item&&typeof item.itemNo==='string'&&typeof item.key==='string'&&['name','fragrance','capacity','presentation','url'].every(key=>typeof item[key]==='string')&&Number.isSafeInteger(item.quantity)&&item.quantity>0&&item.quantity<=10000000).slice(0,200):[];}catch{return [];}}
 function currentItem(){
  const quantityInput=$('#product-quantity');if(!quantityInput.reportValidity())return null;
  const s=selectedScent();const item={itemNo:product.itemNo,name:product.title,url:location.pathname.split('/').pop()+location.search,fragrance:s?.name||'Discuss fragrance options',capacity:$('#product-capacity').value.trim()||'Specification to confirm',presentation:$('#product-presentation').value,quantity:Number(quantityInput.value)};
  item.key=JSON.stringify([item.itemNo,item.fragrance,item.capacity,item.presentation]);return item;
 }
 function renderBasket(){const items=basket();$('#inquiry-count').textContent=String(items.length);$('#inquiry-items').innerHTML=items.length?items.map((item,index)=>`<div class="inquiry-line"><div><strong>${escapeHtml(item.name)}</strong><small>${escapeHtml(item.itemNo)} · ${escapeHtml(item.fragrance)} · Quantity ${item.quantity}</small></div><button type="button" data-remove-inquiry="${index}" aria-label="Remove ${escapeHtml(item.name)} from inquiry">Remove</button></div>`).join(''):'<p>Your saved product enquiries will appear here.</p>';
  document.querySelectorAll('[data-remove-inquiry]').forEach(button=>button.addEventListener('click',()=>{const saved=basket();saved.splice(Number(button.dataset.removeInquiry),1);try{localStorage.setItem(storageKey,JSON.stringify(saved));renderBasket();}catch{$('#product-action-status').textContent='Unable to update the saved list in this browser.';}}));
 }
 $('#add-to-inquiry').addEventListener('click',()=>{
  const item=currentItem();if(!item)return;const items=basket();const index=items.findIndex(saved=>saved.key===item.key);if(index>=0)items[index]=item;else items.push(item);
  try{localStorage.setItem(storageKey,JSON.stringify(items));renderBasket();$('#product-action-status').textContent='Added to your inquiry list. Continue browsing or request a quote below.';}catch{$('#product-action-status').textContent='Your browser could not save the list. You can still request this item using the form below.';}
 });renderBasket();
 $('#request-sample').addEventListener('click',()=>{$('#enquiry-request-type').value='Sample request';$('#product-quantity').value='1';updateSelectionSummary();$('#include-inquiry-list').checked=false;$('#product-enquiry').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});$('#product-inquiry-form input[name="company"]').focus({preventScroll:true});});
 function enquiry(){
  const item=currentItem();if(!item)return null;const form=$('#product-inquiry-form');if(!form.reportValidity())return null;const values=new FormData(form);
  const items=$('#include-inquiry-list').checked?basket():[];const index=items.findIndex(saved=>saved.key===item.key);if(index>=0)items[index]=item;else items.push(item);
  const lines=[`Lanarve — ${values.get('requestType')}`,`Company: ${values.get('company')}`,`Contact: ${values.get('contactName')}`,`Email: ${values.get('email')}`,`Destination: ${values.get('destination')}`,'',...items.flatMap((line,i)=>[`${i+1}. ${line.name}`,`Item No.: ${line.itemNo}`,`Fragrance direction: ${line.fragrance}`,`Capacity / net weight: ${line.capacity}`,`Presentation: ${line.presentation}`,`Quantity requested: ${line.quantity}`,`Product: https://alice19881223.github.io/codex-test/${line.url}`,'']),`Customization / packing / documentation: ${values.get('requirements')||'Please advise'}`];
  return {text:lines.join('\n'),contact:values.get('salesContact')};
 }
 $('#product-inquiry-form').addEventListener('submit',event=>{event.preventDefault();const message=enquiry();if(!message)return;$('#enquiry-status').textContent='Opening WhatsApp with your enquiry. Review and send it there.';window.open('https://wa.me/'+message.contact+'?text='+encodeURIComponent(message.text),'_blank','noopener,noreferrer');});
 $('#download-inquiry').addEventListener('click',()=>{const message=enquiry();if(!message)return;const blob=new Blob([message.text],{type:'text/plain;charset=utf-8'});const url=URL.createObjectURL(blob);const link=document.createElement('a');link.href=url;link.download='Lanarve-enquiry-'+product.itemNo+'.txt';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);$('#enquiry-status').textContent='Your enquiry summary has been downloaded.';});
})();
