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

// Version 3: the project carousel reads photos directly from a public GitHub repository.
// Configure the repository once in gallery-config.js. No GitHub Action or gallery.json is needed.
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
  if(document.querySelectorAll('.carousel-slide').length>1){
    galleryTimer=setInterval(()=>showGallerySlide(galleryIndex+1),5000);
  }
}

function captionFromFilename(filename){
  return filename
    .replace(/\.[^.]+$/,'')
    .replace(/^\d{4}[-_]?\d{2}[-_]?\d{2}[-_]?/,'')
    .replace(/[-_]+/g,' ')
    .replace(/\b\w/g,letter=>letter.toUpperCase())
    .trim() || 'Bathroom Wizards Project';
}

function renderGallery(photos){
  galleryTrack.innerHTML='';
  galleryDots.innerHTML='';
  photos.forEach((photo,index)=>{
    const slide=document.createElement('button');
    slide.type='button';
    slide.className='carousel-slide';
    slide.setAttribute('aria-label',`Open project photo ${index+1} of ${photos.length}`);

    const image=document.createElement('img');
    image.src=photo.src;
    image.alt=photo.alt;
    image.loading=index===0?'eager':'lazy';
    image.decoding='async';

    const caption=document.createElement('span');
    caption.className='carousel-caption';
    const title=document.createElement('strong');
    title.textContent=photo.caption;
    const helper=document.createElement('small');
    helper.textContent='Click to enlarge';
    caption.append(title,helper);

    slide.append(image,caption);
    slide.addEventListener('click',()=>{
      if(!dialog||!dialogImg||!dialogText)return;
      dialogImg.src=photo.src;
      dialogImg.alt=photo.alt;
      dialogText.textContent=photo.caption;
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
  startGalleryAutoplay();
}

async function loadGallery(){
  if(!galleryTrack)return;
  const config=window.BATHROOM_WIZARDS_GALLERY||{};
  const missing=!config.owner||!config.repo||config.owner.includes('REPLACE_')||config.repo.includes('REPLACE_');
  if(missing){
    galleryStatus.textContent='Gallery setup is almost complete. Add your GitHub username and repository name to gallery-config.js.';
    return;
  }

  const folder=String(config.folder||'assets/gallery').replace(/^\/+|\/+$/g,'');
  const branch=encodeURIComponent(config.branch||'main');
  const apiUrl=`https://api.github.com/repos/${encodeURIComponent(config.owner)}/${encodeURIComponent(config.repo)}/contents/${folder}?ref=${branch}`;
  const imagePattern=/\.(avif|gif|jpe?g|png|webp)$/i;

  try{
    const response=await fetch(apiUrl,{
      headers:{Accept:'application/vnd.github+json'},
      cache:'no-store'
    });
    if(!response.ok){
      if(response.status===404)throw new Error('Repository or gallery folder was not found. Confirm the repository is public and gallery-config.js is correct.');
      if(response.status===403)throw new Error('GitHub temporarily limited gallery requests. Please refresh again in a few minutes.');
      throw new Error(`GitHub returned status ${response.status}.`);
    }
    const entries=await response.json();
    const photos=(Array.isArray(entries)?entries:[])
      .filter(item=>item.type==='file'&&imagePattern.test(item.name)&&item.download_url)
      .sort((a,b)=>b.name.localeCompare(a.name,undefined,{numeric:true,sensitivity:'base'}))
      .map(item=>{
        const caption=captionFromFilename(item.name);
        return {src:item.download_url,caption,alt:`Bathroom Wizards project: ${caption}`};
      });

    if(!photos.length)throw new Error(`No supported photos were found in ${folder}.`);
    renderGallery(photos);
  }catch(error){
    galleryStatus.hidden=false;
    galleryStatus.textContent=error.message||'Project photos could not be loaded right now.';
    console.error('Bathroom Wizards gallery:',error);
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
