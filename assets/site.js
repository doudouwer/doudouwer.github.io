(function(){
  var still=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // scroll reveal
  var els=document.querySelectorAll('.pub,.item,h2');
  if('IntersectionObserver' in window && !still){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.08});
    els.forEach(function(el){el.classList.add('reveal');io.observe(el)});
  }
  // teaser lightbox
  var lb=document.createElement('div');lb.className='lb';lb.innerHTML='<img alt="">';document.body.appendChild(lb);
  function close(){lb.classList.remove('on')}
  lb.onclick=close;document.addEventListener('keydown',function(e){if(e.key==='Escape')close()});
  document.querySelectorAll('.thumb.img img').forEach(function(im){im.onclick=function(){lb.firstChild.src=im.src;lb.classList.add('on')}});
})();
