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
const dialogImg=dialog?.querySelector('img');
const dialogText=dialog?.querySelector('p');
dialog?.querySelector('.lightbox-close')?.addEventListener('click',()=>dialog.close());
dialog?.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});

const comparison=document.querySelector('.comparison');
if(comparison){const range=comparison.querySelector('input');const after=comparison.querySelector('.comparison-after');const handle=comparison.querySelector('.comparison-handle');range.addEventListener('input',()=>{after.style.width=range.value+'%';handle.style.left=range.value+'%'})}

document.querySelectorAll('[data-placeholder="true"]').forEach(link=>link.addEventListener('click',e=>{const href=link.getAttribute('href')||'';if(href.startsWith('#')){e.preventDefault();const platform=link.dataset.platform||'profile';alert(`Add your ${platform} URL in index.html before publishing.`);}}));

document.getElementById('year').textContent=new Date().getFullYear();

// Version 2.0 interactions
window.addEventListener('load',()=>{window.setTimeout(()=>document.querySelector('.site-loader')?.classList.add('loaded'),260)});

// Auto-populated project carousel. gallery.json is generated from assets/gallery.
const galleryTrack=document.getElementById('gallery-track');
const galleryDots=document.getElementById('gallery-dots');
const galleryStatus=document.getElementById('gallery-status');
const galleryCarousel=document.querySelector('.gallery-carousel');
let galleryIndex=0;
let galleryTimer;

function showGallerySlide(index){
  const slides=[...document.querySelectorAll('.carousel-slide')];
  const dots=[...document.querySelectorAll('.carousel-dot')];
  if(!slides.length)return;
  galleryIndex=(index+slides.length)%slides.length;
  galleryTrack.style.transform=`translateX(-${galleryIndex*100}%)`;
  slides.forEach((slide,i)=>slide.setAttribute('aria-hidden',i!==galleryIndex));
  dots.forEach((dot,i)=>{
    dot.classList.toggle('active',i===galleryIndex);
    dot.setAttribute('aria-current',i===galleryIndex?'true':'false');
  });
}

function startGalleryAutoplay(){
  clearInterval(galleryTimer);
  galleryTimer=setInterval(()=>showGallerySlide(galleryIndex+1),5000);
}

async function loadGallery(){
  if(!galleryTrack)return;
  try{
    const response=await fetch(`gallery.json?v=${Date.now()}`,{cache:'no-store'});
    if(!response.ok)throw new Error('Gallery manifest not found');
    const data=await response.json();
    const photos=Array.isArray(data.photos)?data.photos:[];
    if(!photos.length)throw new Error('No project photos are available yet');

    galleryTrack.innerHTML='';
    galleryDots.innerHTML='';
    photos.forEach((photo,index)=>{
      const slide=document.createElement('button');
      slide.type='button';
      slide.className='carousel-slide';
      slide.setAttribute('aria-label',`Open project photo ${index+1} of ${photos.length}`);
      slide.dataset.image=photo.src;
      slide.dataset.caption=photo.caption||'';

      const image=document.createElement('img');
      image.src=photo.src;
      image.alt=photo.alt||photo.caption||'Bathroom Wizards project photo';
      image.loading=index===0?'eager':'lazy';

      const caption=document.createElement('span');
      caption.className='carousel-caption';
      caption.innerHTML=`<strong>${photo.caption||'Bathroom Wizards Project'}</strong><small>Click to enlarge</small>`;
      slide.append(image,caption);
      slide.addEventListener('click',()=>{
        if(!dialog||!dialogImg||!dialogText)return;
        dialogImg.src=photo.src;
        dialogImg.alt=image.alt;
        dialogText.textContent=photo.caption||'';
        dialog.showModal();
      });
      galleryTrack.appendChild(slide);

      const dot=document.createElement('button');
      dot.type='button';
      dot.className='carousel-dot';
      dot.setAttribute('aria-label',`Show project photo ${index+1}`);
      dot.addEventListener('click',()=>{showGallerySlide(index);startGalleryAutoplay();});
      galleryDots.appendChild(dot);
    });
    galleryStatus.hidden=true;
    showGallerySlide(0);
    if(photos.length>1)startGalleryAutoplay();
  }catch(error){
    galleryStatus.textContent='Project photos are being updated. Please check back soon.';
    console.error(error);
  }
}

document.querySelector('.carousel-prev')?.addEventListener('click',()=>{showGallerySlide(galleryIndex-1);startGalleryAutoplay();});
document.querySelector('.carousel-next')?.addEventListener('click',()=>{showGallerySlide(galleryIndex+1);startGalleryAutoplay();});
galleryCarousel?.addEventListener('mouseenter',()=>clearInterval(galleryTimer));
galleryCarousel?.addEventListener('mouseleave',startGalleryAutoplay);
galleryCarousel?.addEventListener('focusin',()=>clearInterval(galleryTimer));
galleryCarousel?.addEventListener('focusout',startGalleryAutoplay);
loadGallery();

const quoteModal=document.querySelector('.quote-modal');
document.querySelectorAll('.quote-trigger').forEach(button=>button.addEventListener('click',()=>quoteModal?.showModal()));
quoteModal?.querySelector('.quote-close')?.addEventListener('click',()=>quoteModal.close());
quoteModal?.addEventListener('click',event=>{if(event.target===quoteModal)quoteModal.close()});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&quoteModal?.open)quoteModal.close()});
