(() => {
 const header = document.querySelector('.site-header');
 const menuButton = header.querySelector('.menu-button');
 const menu = document.getElementById('menu');
 const stickyCta = document.querySelector('.sticky-cta');
 const heroCta = document.getElementById('hero-cta');
 const offer = document.getElementById('offer');

 // ヘッダー：ファーストビューを過ぎたら細くし、980円ボタンを出す
 const onScroll = () => header.classList.toggle('is-compact', scrollY > 120);
 addEventListener('scroll', onScroll, {passive: true});
 onScroll();

 // 目次メニュー
 const setMenu = open => {
  menu.hidden = !open;
  menuButton.setAttribute('aria-expanded', open);
  menuButton.querySelector('.visually-hidden').textContent = open ? '目次を閉じる' : '目次を開く';
 };
 menuButton.addEventListener('click', () => setMenu(menu.hidden));
 menu.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
 document.addEventListener('keydown', e => { if (e.key === 'Escape' && !menu.hidden) { setMenu(false); menuButton.focus(); } });
 document.addEventListener('click', e => { if (!menu.hidden && !header.contains(e.target)) setMenu(false); });

 // 下部の購入バー：ヒーローのボタンが見えなくなってから、オファーが見えるまで表示
 let heroVisible = true, offerVisible = false;
 const updateSticky = () => stickyCta.classList.toggle('is-visible', !heroVisible && !offerVisible);
 new IntersectionObserver(([e]) => { heroVisible = e.isIntersecting || e.boundingClientRect.top > 0; updateSticky(); }).observe(heroCta);
 new IntersectionObserver(([e]) => { offerVisible = e.isIntersecting; updateSticky(); }).observe(offer);

 // PC目次の現在地
 const navLinks = [...document.querySelectorAll('.side-nav a')];
 const io = new IntersectionObserver(entries => entries.forEach(entry => {
  if (!entry.isIntersecting) return;
  navLinks.forEach(a => {
   const active = a.hash === '#' + entry.target.id;
   a.classList.toggle('active', active);
   active ? a.setAttribute('aria-current', 'location') : a.removeAttribute('aria-current');
  });
 }), {rootMargin: '-20% 0px -60% 0px'});
 document.querySelectorAll('main section[id]').forEach(el => io.observe(el));

 // 動きはファーストビューの1回だけ：写真が開き、袋が着地する
 if (!matchMedia('(prefers-reduced-motion: reduce)').matches && window.Motion) {
  const {animate} = Motion;
  animate('.hero-photo img', {scale: [1.08, 1], opacity: [0, 1]}, {duration: 1.1, ease: [.22, 1, .36, 1]});
  animate('.hero-pack', {y: [60, 0], rotate: [-4, 6], opacity: [0, 1]}, {duration: .9, delay: .45, ease: [.34, 1.4, .64, 1]});
 }
})();
