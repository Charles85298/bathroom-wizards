document.getElementById('year')?.append(new Date().getFullYear());
const menu=document.querySelector('.menu');
const nav=document.querySelector('.nav-links');
menu?.addEventListener('click',()=>nav.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

if(document.body.classList.contains('portfolio-home')){
  window.addEventListener('pointermove',e=>{
    document.documentElement.style.setProperty('--mouse-x',`${e.clientX}px`);
    document.documentElement.style.setProperty('--mouse-y',`${e.clientY}px`);
  });
  const sections=[...document.querySelectorAll('.content-section[id]')];
  const links=[...document.querySelectorAll('.section-nav a')];
  const activeObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        links.forEach(link=>link.classList.toggle('active',link.getAttribute('href')===`#${entry.target.id}`));
      }
    });
  },{rootMargin:'-20% 0px -65% 0px'});
  sections.forEach(section=>activeObserver.observe(section));
}
