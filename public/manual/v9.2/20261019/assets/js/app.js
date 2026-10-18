(function(){
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var progress = document.getElementById('progress');
  var backtop = document.getElementById('backtop');
  var drawer = document.getElementById('tocDrawer');
  var backdrop = document.getElementById('tocBackdrop');
  var fab = document.getElementById('tocFab');
  if(drawer)drawer.setAttribute('aria-hidden','true');
  var drawerNav = document.getElementById('tocDrawerNav');
  if (drawerNav) drawerNav.innerHTML = document.getElementById('tocnav').innerHTML;
  var drawerClose=document.createElement('button'); drawerClose.className='manual-drawer-close'; drawerClose.textContent='×'; drawerClose.setAttribute('aria-label',document.getElementById('manual-strings').querySelector('[data-ui=closeMenu]').textContent); drawer.insertBefore(drawerClose,drawer.firstChild); drawerClose.addEventListener('click',closeDrawer);
  var sideLinks = [].slice.call(document.querySelectorAll('#tocnav a'));
  var drawerLinks = [].slice.call(document.querySelectorAll('#tocDrawerNav a'));
  var links = sideLinks.concat(drawerLinks);
  var secs = sideLinks.map(function(a){ return document.querySelector(a.getAttribute('href')); });
  function closeDrawer(){
    if (!drawer) return;
    var wasOpen=drawer.classList.contains('open');
    drawer.classList.remove('open');
    drawer.removeAttribute('role');drawer.removeAttribute('aria-modal');drawer.setAttribute('aria-hidden','true');if(wasOpen)fab.focus();
    backdrop.classList.remove('open');
    fab.setAttribute('aria-expanded', 'false');
  }
  function openDrawer(){
    if (!drawer) return;
    drawer.classList.add('open');
    drawer.setAttribute('role','dialog');drawer.setAttribute('aria-modal','true');drawer.setAttribute('aria-hidden','false');drawerClose.focus();
    backdrop.classList.add('open');
    fab.setAttribute('aria-expanded', 'true');
  }
  if (fab) fab.addEventListener('click', function(){ drawer.classList.contains('open') ? closeDrawer() : openDrawer(); });
  if (backdrop) backdrop.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape') closeDrawer(); });
  window.addEventListener('resize', function(){ if (window.innerWidth > 1160) closeDrawer(); });
  links.forEach(function(a){
    a.addEventListener('click', function(e){
      e.preventDefault();
      var hash = a.getAttribute('href');
      var target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({behavior: reduce ? 'auto' : 'smooth', block: 'start'});
        try { if (history.replaceState) history.replaceState(null, '', hash); } catch (err) {}
      }
      closeDrawer();
    });
  });

  function onScroll(){
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    progress.style.width = (max > 0 ? (h.scrollTop / max * 100) : 0) + '%';
    backtop.classList.toggle('show', h.scrollTop > 900);
    var idx = 0;
    for (var i = 0; i < secs.length; i++) {
      if (secs[i] && secs[i].getBoundingClientRect().top < 170) idx = i;
    }
    sideLinks.forEach(function(a, i){ a.classList.toggle('active', i === idx); });
    drawerLinks.forEach(function(a, i){ a.classList.toggle('active', i === idx); });
  }
  var ticking = false;
  document.addEventListener('scroll', function(){
    if (!ticking) { ticking = true; requestAnimationFrame(function(){ onScroll(); ticking = false; }); }
  }, {passive:true});
  onScroll();
  backtop.addEventListener('click', function(){ window.scrollTo({top:0, behavior: reduce ? 'auto' : 'smooth'}); });

  /* reveal on scroll */
  var els = [].slice.call(document.querySelectorAll('figure,.card,.kpi,.tbl,.steps,.diagram,.cmp,.note,.warn,.tip,.sec-head,.deck'));
  els.forEach(function(el){ el.classList.add('reveal'); });
  if (!reduce && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, {rootMargin: '0px 0px -6% 0px', threshold: 0.05});
    els.forEach(function(el){ io.observe(el); });
  } else {
    els.forEach(function(el){ el.classList.add('in'); });
  }

  /* count-up KPIs */
  function runCount(el){
    var target = parseInt(el.getAttribute('data-count'), 10) || 0;
    if (reduce) { el.textContent = target; return; }
    var t0 = null, dur = 900;
    function tick(ts){
      if (t0 === null) t0 = ts;
      var p = Math.min(1, (ts - t0) / dur);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  var kpis = [].slice.call(document.querySelectorAll('.kpi b[data-count]'));
  if ('IntersectionObserver' in window) {
    var ko = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting) { runCount(e.target); ko.unobserve(e.target); }
      });
    }, {threshold: 0.4});
    kpis.forEach(function(el){ ko.observe(el); });
  } else {
    kpis.forEach(runCount);
  }

  /* before / after slider */
  var cmp = document.getElementById('cmp');
  if (cmp) {
    var range = cmp.querySelector('input[type=range]');
    var auto = !reduce, raf = null;
    function sync(){ cmp.style.setProperty('--pos', range.value + '%'); }
    function stopAuto(){ auto = false; if (raf) cancelAnimationFrame(raf); }
    function sweep(){
      if (!auto) return;
      var t0 = performance.now(), dur = 5200;
      function frame(ts){
        if (!auto) return;
        var p = Math.min(1, (ts - t0) / dur);
        range.value = (50 + 30 * Math.sin(p * Math.PI * 2)).toFixed(1);
        sync();
        if (p < 1) raf = requestAnimationFrame(frame);
      }
      raf = requestAnimationFrame(frame);
    }
    range.addEventListener('input', function(){ stopAuto(); sync(); });
    range.addEventListener('pointerdown', stopAuto);
    cmp.addEventListener('pointerdown', stopAuto);
    sync();
    if (auto && 'IntersectionObserver' in window) {
      var co = new IntersectionObserver(function(entries){
        entries.forEach(function(e){ if (e.isIntersecting) { sweep(); co.disconnect(); } });
      }, {threshold: 0.45});
      co.observe(cmp);
    }
  }
  /* ---------------- operation demos ---------------- */
  var stringRoot = document.getElementById('manual-strings');
  function ui(key){ var node=stringRoot.querySelector('[data-ui="'+key+'"]');return node ? node.textContent : ''; }
  var DEMOS = {};
  var geometry={dtf:[[25,88,1],[43,33,1.28],[72,26,1.38],[78,88,1.28]],sub:[[35,22,1],[79,28,1.3],[78,88,1.3],[38,55,1.2]]};
  [].slice.call(stringRoot.querySelectorAll('[data-demo-strings]')).forEach(function(group){
    var key=group.getAttribute('data-demo-strings');
    DEMOS[key]=[].slice.call(group.children).map(function(step,i){var g=geometry[key][i];return {x:g[0],y:g[1],z:g[2],n:('0'+(i+1)).slice(-2),t:step.querySelector('b').textContent,d:step.querySelector('span').textContent};});
  });
  [].slice.call(document.querySelectorAll('.demo')).forEach(function(root){
    var key = root.getAttribute('data-demo');
    var steps = DEMOS[key];
    if (!steps) return;
    var img = root.querySelector('.demo-stage img');
    var cur = root.querySelector('.demo-cursor');
    var ring = root.querySelector('.demo-ring');
    var capN = root.querySelector('.demo-bar .n');
    var capT = root.querySelector('.demo-txt b');
    var capD = root.querySelector('.demo-txt span');
    var dots = root.querySelector('.demo-dots');
    var idx = 0, timer = null, paused = false, inView = false;
    steps.forEach(function(_, i){
      var b = document.createElement('button');
      b.setAttribute('aria-label', ui('step') + ' ' + (i + 1));
      b.addEventListener('click', function(){ go(i); restart(); });
      dots.appendChild(b);
    });
    function go(i){
      idx = i;
      var s = steps[i];
      img.style.transformOrigin = s.x + '% ' + s.y + '%';
      img.style.transform = 'scale(' + s.z + ')';
      cur.style.left = s.x + '%';
      cur.style.top = s.y + '%';
      ring.style.left = s.x + '%';
      ring.style.top = s.y + '%';
      ring.classList.remove('ping');
      void ring.offsetWidth;
      ring.classList.add('ping');
      capN.textContent = s.n;
      capT.textContent = s.t;
      capD.textContent = s.d;
      [].slice.call(dots.children).forEach(function(b, j){ b.classList.toggle('active', j === i); });
    }
    function advance(){
      if (paused || reduce || !inView || document.hidden) return;
      go((idx + 1) % steps.length);
      timer = setTimeout(advance, 4200);
    }
    function restart(){
      clearTimeout(timer);
      if (!paused && !reduce && inView && !document.hidden) timer = setTimeout(advance, 4200);
    }
    root.addEventListener('pointerenter', function(){ paused = true; clearTimeout(timer); });
    root.addEventListener('pointerleave', function(){ paused = false; restart(); });
    root.querySelector('[data-next]').addEventListener('click', function(){ go((idx + 1) % steps.length); restart(); });
    root.querySelector('[data-prev]').addEventListener('click', function(){ go((idx + steps.length - 1) % steps.length); restart(); });
    go(0);
    document.addEventListener('visibilitychange',function(){if(document.hidden)clearTimeout(timer);else restart();});
    if ('IntersectionObserver' in window) {
      var dio = new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          inView=e.isIntersecting; clearTimeout(timer); if (inView) { restart(); }
        });
      }, {threshold: 0.35});
      dio.observe(root);
    } else {
      inView = true; restart();
    }
  });

  /* ---------------- before / after gallery ---------------- */
  var ba = document.getElementById('ba');
  if (ba && ba.querySelector('.ba-tabs')) {
    var tabs = [].slice.call(ba.querySelectorAll('.ba-tabs button'));
    var panels = [].slice.call(ba.querySelectorAll('.ba-panel'));
    var gi = 0, gt = null, gpaused = false, galleryInView = false;
    function showPanel(i){
      gi = i;
      tabs.forEach(function(t, j){ t.classList.toggle('active', j === i); });
      panels.forEach(function(p, j){ p.classList.toggle('active', j === i); });
    }
    function cycle(){
      if (gpaused || reduce || !galleryInView || document.hidden) return;
      gt = setTimeout(function(){ showPanel((gi + 1) % panels.length); cycle(); }, 6200);
    }
    tabs.forEach(function(t, i){
      t.addEventListener('click', function(){
        showPanel(i); clearTimeout(gt); gpaused = true;
      });
    });
    ba.addEventListener('pointerenter', function(){ gpaused = true; clearTimeout(gt); });
    ba.addEventListener('pointerleave', function(){ gpaused = false; clearTimeout(gt); cycle(); });
    document.addEventListener('visibilitychange',function(){clearTimeout(gt);if(!document.hidden)cycle();});
    showPanel(0);
    if ('IntersectionObserver' in window) {
      var bio = new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          galleryInView=e.isIntersecting; clearTimeout(gt); if(galleryInView){cycle();}
        });
      }, {threshold: 0.35});
      bio.observe(ba);
    } else {
      galleryInView = true; cycle();
    }
  }


  /* ---------------- image lightbox ---------------- */
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lbImg');
  var lbCap = document.getElementById('lbCap');
  var lbClose = document.getElementById('lbClose');
  if (lb && lbImg) {
    var previousFocus;
    function openLB(src, alt, cap){
      previousFocus=document.activeElement;
      lbImg.src = src;
      lbImg.alt = alt || '';
      lbCap.textContent = cap || '';
      lb.classList.add('open');
      document.body.classList.add('no-scroll');
      lbClose.focus();
    }
    function closeLB(){
      lb.classList.remove('open');
      document.body.classList.remove('no-scroll');
      lbImg.removeAttribute('src');
      if(previousFocus)previousFocus.focus();
    }
    [].slice.call(document.querySelectorAll('figure img')).forEach(function(img){
      img.setAttribute('tabindex', '0');
      img.setAttribute('role', 'button');
      img.setAttribute('title', ui('zoom'));
      function open(){ var fig = img.closest('figure'); var cap = fig ? fig.querySelector('figcaption') : null;
        openLB(img.getAttribute('data-full') || img.src, img.alt, cap ? cap.textContent : ''); }
      img.addEventListener('click', open);
      img.addEventListener('keydown', function(e){ if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
    });
    lbClose.addEventListener('click', closeLB);
    lb.addEventListener('click', function(e){ if (e.target === lb) closeLB(); });
    document.addEventListener('keydown', function(e){ if (lb.classList.contains('open')){if(e.key==='Escape')closeLB();if(e.key==='Tab'){e.preventDefault();lbClose.focus();}} });
  }

  [].slice.call(document.querySelectorAll('[data-manual-language]')).forEach(function(link){link.addEventListener('click',function(){if(/^#s\d+$/.test(location.hash))link.hash=location.hash;});});
  var initial=document.body.getAttribute('data-initial-section');
  if(!location.hash && /^s\d+$/.test(initial||'')){
    var destination=document.getElementById(initial);
    if(destination){try{history.replaceState(null,'','#'+initial);}catch(e){} destination.scrollIntoView({block:'start',behavior:'auto'});}
  }
})();
