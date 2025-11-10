
(function(){
  const dlg = document.getElementById('proj-modal');
  if(!dlg) return;
  const mMedia = document.getElementById('pm-media');
  const mTitle = document.getElementById('pm-title');
  const mDesc  = document.getElementById('pm-desc');
  const mLinks = document.getElementById('pm-links');
  const close  = document.getElementById('pm-close');

  function openModal(cfg){
    mTitle.textContent = cfg.title || 'Project';
    mDesc.textContent = cfg.desc || '';
    mMedia.innerHTML = cfg.image ? 
      `<img src="${cfg.image}" alt="" style="width:100%;height:auto;display:block">` : '';
    mLinks.innerHTML = '';
    if(cfg.linkHref){
      const a = document.createElement('a');
      a.href = cfg.linkHref; a.target = '_blank'; a.rel = 'noopener';
      a.textContent = cfg.linkLabel || 'Open';
      a.style.padding = '8px 12px'; a.style.border = '1px solid var(--line)'; a.style.borderRadius = '10px';
      a.style.textDecoration = 'none'; a.style.color = 'var(--ink)'; a.style.background = 'var(--card)';
      mLinks.appendChild(a);
    }
    dlg.showModal();
  }

  document.addEventListener('click', (e)=>{
    const btn = e.target.closest('.more-info');
    if(!btn) return;
    e.preventDefault();
    openModal({
      title: btn.dataset.title,
      desc: btn.dataset.desc,
      image: btn.dataset.image,
      linkHref: btn.dataset.linkHref,
      linkLabel: btn.dataset.linkLabel
    });
  });

  dlg.addEventListener('click', (e)=>{
    const rect = dlg.getBoundingClientRect();
    if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) dlg.close();
  });
  close && close.addEventListener('click', ()=> dlg.close());
  document.addEventListener('keydown', (e)=>{ if(e.key==='Escape' && dlg.open) dlg.close(); });
})();
