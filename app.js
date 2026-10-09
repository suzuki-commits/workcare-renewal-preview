(() => {
  const button = document.querySelector('.menu-button');
  const nav = document.querySelector('.site-nav');
  if (!button || !nav) return;

  const setMenu = (open) => {
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
  };
  button.addEventListener('click', () => setMenu(button.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', (event) => { if (event.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') { setMenu(false); button.focus(); }
  });
  document.addEventListener('click', (event) => {
    if (button.getAttribute('aria-expanded') === 'true' && !nav.contains(event.target) && !button.contains(event.target)) setMenu(false);
  });
  window.addEventListener('resize', () => { if (window.innerWidth > 960) setMenu(false); });
  document.querySelectorAll('[data-analytics]').forEach((element) => {
    element.addEventListener('click', () => window.dispatchEvent(new CustomEvent('workcare:cta', { detail: { id: element.dataset.analytics } })));
  });
})();
