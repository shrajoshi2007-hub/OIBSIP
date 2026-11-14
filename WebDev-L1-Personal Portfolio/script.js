(function(){
  var nav=document.getElementById('nav'),btn=document.getElementById('menuBtn');
  btn.addEventListener('click',function(){var o=nav.classList.toggle('open');btn.setAttribute('aria-expanded',o);btn.textContent=o?'Close':'Menu';});
  nav.addEventListener('click',function(e){if(e.target.closest('a')){nav.classList.remove('open');btn.setAttribute('aria-expanded','false');btn.textContent='Menu';}});

  document.getElementById('yr').textContent=new Date().getFullYear();

  var links=[].slice.call(document.querySelectorAll('nav a.link'));
  var ids=['home','about','skills','projects'];
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){
      if(e.isIntersecting){links.forEach(function(l){l.classList.toggle('active',l.getAttribute('href')==='#'+e.target.id);});}
    });},{rootMargin:'-40% 0px -55% 0px'});
    ids.forEach(function(id){var el=document.getElementById(id);if(el)io.observe(el);});
  }

  document.getElementById('form').addEventListener('submit',function(e){
    e.preventDefault();
    var n=document.getElementById('fn').value.trim(),m=document.getElementById('fe').value.trim(),t=document.getElementById('fm').value.trim(),note=document.getElementById('note');
    if(!n||!/^\S+@\S+\.\S+$/.test(m)||!t){note.style.color='#f0b9a8';note.textContent='Enter your name, a valid email and a message.';return;}
    note.style.color='';
    note.textContent='Opening your email app…';
    location.href='mailto:alex@example.com?subject='+encodeURIComponent('Portfolio enquiry from '+n)+'&body='+encodeURIComponent(t+'\n\n'+n+' ('+m+')');
  });
})();