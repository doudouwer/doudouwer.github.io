(function(){
  var still=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // scroll reveal
  var els=document.querySelectorAll('.pub,.item,h2');
  if('IntersectionObserver' in window && !still){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.08});
    els.forEach(function(el){el.classList.add('reveal');io.observe(el)});
  }
  // side navigation with scroll-spy
  (function(){
    var zh=document.documentElement.lang.indexOf('zh')===0;
    var intro=document.querySelector('.intro');if(!intro)return;
    intro.id='about';
    var secs=[{id:'about',label:zh?'简介':'About',el:intro}];
    document.querySelectorAll('h2').forEach(function(h,i){h.id='sec'+(i+1);secs.push({id:h.id,label:h.textContent,el:h})});
    var nav=document.createElement('nav');nav.className='side';nav.setAttribute('aria-label',zh?'页面导航':'Page sections');
    var links={};
    secs.forEach(function(s){var a=document.createElement('a');a.href='#'+s.id;a.innerHTML='<i></i><span>'+s.label+'</span>';nav.appendChild(a);links[s.id]=a});
    document.body.appendChild(nav);
    function spy(){
      var y=window.innerHeight*.35,cur=secs[0].id;
      secs.forEach(function(s){if(s.el.getBoundingClientRect().top<=y)cur=s.id});
      if(window.innerHeight+window.scrollY>=document.documentElement.scrollHeight-4)cur=secs[secs.length-1].id;
      for(var k in links)links[k].classList.toggle('on',k===cur);
      var a=links[cur];if(nav.scrollWidth>nav.clientWidth&&nav.scrollHeight<=nav.clientHeight+2)nav.scrollTo({left:a.offsetLeft-nav.clientWidth/2+a.offsetWidth/2});
    }
    window.addEventListener('scroll',spy,{passive:true});window.addEventListener('resize',spy);spy();
  })();
  // teaser lightbox
  var lb=document.createElement('div');lb.className='lb';lb.innerHTML='<img alt="">';document.body.appendChild(lb);
  function close(){lb.classList.remove('on')}
  lb.onclick=close;document.addEventListener('keydown',function(e){if(e.key==='Escape')close()});
  document.querySelectorAll('.thumb.img img').forEach(function(im){im.onclick=function(){lb.firstChild.src=im.src;lb.classList.add('on')}});
})();
