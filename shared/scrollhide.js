(function(){
  let lastY = window.scrollY;
  let ticking = false;
  const hdr = document.querySelector('.header');
  if(!hdr) return;
  function onScroll(){
    const y = window.scrollY;
    if (!ticking){
      window.requestAnimationFrame(()=>{
        if (y > lastY + 6 && y > 24){
          hdr.classList.add('hide');   // scrolling down
        } else if (y < lastY - 6){
          hdr.classList.remove('hide'); // scrolling up
        }
        lastY = y;
        ticking = false;
      });
      ticking = true;
    }
  }
  window.addEventListener('scroll', onScroll, {passive:true});
})();