(() => {
 const media = matchMedia('(prefers-reduced-motion: reduce)');
 const cleanups = [];
 function stopMotion(){cleanups.splice(0).forEach(stop=>stop());document.querySelectorAll('.reveal,.hero-pack,.hero-word,.cat-frame,.stage-pack,.floating-kibble,.steam-visual i').forEach(el=>{el.style.opacity='';el.style.transform='';});}
 function startMotion(){
  stopMotion(); if(media.matches || !window.Motion) return;
  const {animate,scroll,inView}=Motion;
  const keep=a=>{cleanups.push(()=>a.stop());return a;};
  keep(animate('.hero-pack',{y:[0,-9,0],rotate:[-9,-6,-9]},{duration:6,repeat:Infinity,ease:'easeInOut'}));
  cleanups.push(scroll(animate('.hero-word',{y:[0,110]},{ease:'linear'}),{target:document.querySelector('.hero'),offset:['start start','end start']}));
  cleanups.push(scroll(animate('.cat-frame',{y:[0,32]},{ease:'linear'}),{target:document.querySelector('.hero'),offset:['start start','end start']}));
  document.querySelectorAll('.reveal').forEach(el=>{cleanups.push(inView(el,()=>{keep(animate(el,{opacity:[0,1],y:[18,0]},{duration:.7,ease:[.22,1,.36,1]}));},{margin:'0px 0px -30px 0px'}));});
  cleanups.push(scroll(animate('.stage-pack',{rotate:[-7,6,-4],scale:[.94,1.04,.97]},{ease:'linear'}),{target:document.querySelector('.feature-story'),offset:['start start','end end']}));
  cleanups.push(scroll(animate('.floating-kibble',{y:[22,-23],rotate:[-5,6]},{ease:'linear'}),{target:document.querySelector('.small-bites'),offset:['start end','end start']}));
  cleanups.push(inView('.steam-visual',()=>{const a=animate('.steam-visual i',{y:[5,-8],opacity:[.15,.6]},{duration:2,repeat:Infinity,repeatType:'reverse',ease:'easeInOut'});cleanups.push(()=>a.stop());return()=>a.stop();}));
 }
 startMotion();media.addEventListener('change',startMotion);
 const navLinks=[...document.querySelectorAll('.right-side nav a')];
 const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){navLinks.forEach(a=>{const active=a.hash==='#'+entry.target.id;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}});},{rootMargin:'-10% 0px -60% 0px'});
 document.querySelectorAll('section[id]').forEach(el=>observer.observe(el));
 const head=document.querySelector("header");const onScroll=()=>head.classList.toggle("is-scrolled",scrollY>4);addEventListener("scroll",onScroll,{passive:true});onScroll();
})();
