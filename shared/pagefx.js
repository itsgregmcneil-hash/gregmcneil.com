// Lightweight cross-page fade transitions
(function(){
  const onReady = () => {
    document.body.classList.add('fade-init');
    requestAnimationFrame(() => document.body.classList.add('fade-in'));
  };
  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', onReady);
  } else { onReady(); }

  // Delegate link clicks for local .html navigations
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if(!a) return;
    // ignore new tabs or external links
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const href = a.getAttribute('href');
    if (!href) return;
    if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('#')) return;
    if (!href.endsWith('.html')) return; // only apply to local pages
    e.preventDefault();
    const go = () => { window.location.href = href; };
    document.body.classList.remove('fade-in');
    document.body.classList.add('fade-out');
    // Use the same duration as CSS (240ms) + a tiny buffer
    setTimeout(go, 260);
  });
})();