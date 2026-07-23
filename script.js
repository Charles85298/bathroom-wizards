const header=document.querySelector('.site-header');
const menu=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');
window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>20));
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',open)});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const counter=document.querySelector('.counter');
if(counter){const countObserver=new IntersectionObserver(([entry])=>{if(!entry.isIntersecting)return;let value=0;const target=Number(counter.dataset.target);const timer=setInterval(()=>{value+=2;counter.textContent=value+'+';if(value>=target){counter.textContent=target+'+';clearInterval(timer)}},24);countObserver.disconnect()},{threshold:.7});countObserver.observe(counter)}

const dialog=document.querySelector('.lightbox');
const dialogImg=dialog.querySelector('img');
const dialogText=dialog.querySelector('p');
document.querySelectorAll('.gallery-card').forEach(card=>card.addEventListener('click',()=>{dialogImg.src=card.dataset.image;dialogImg.alt=card.querySelector('img').alt;dialogText.textContent=card.dataset.caption;dialog.showModal()}));
dialog.querySelector('.lightbox-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});

const comparison=document.querySelector('.comparison');
if(comparison){const range=comparison.querySelector('input');const after=comparison.querySelector('.comparison-after');const handle=comparison.querySelector('.comparison-handle');range.addEventListener('input',()=>{after.style.width=range.value+'%';handle.style.left=range.value+'%'})}

document.querySelectorAll('[data-placeholder="true"]').forEach(link=>link.addEventListener('click',e=>{if(link.getAttribute('href')==='#google-reviews-url'){e.preventDefault();alert('Add your Google Reviews URL in index.html before publishing.')}}));

document.getElementById('year').textContent=new Date().getFullYear();

if(window.L){const phoenix=[33.4484,-112.0740];const map=L.map('map',{scrollWheelZoom:false}).setView(phoenix,8);L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; OpenStreetMap contributors'}).addTo(map);L.circle(phoenix,{radius:112654,weight:2,color:'#e3b95f',fillColor:'#756bff',fillOpacity:.14}).addTo(map);L.marker(phoenix).addTo(map).bindPopup('Bathroom Wizards<br>Phoenix Metro Service Area');}
