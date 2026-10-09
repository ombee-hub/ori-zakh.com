// Ori Zakh — mobile menu + image lightbox
(function () {
  // Year in footer
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  // Mobile side menu (drawer)
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  var overlay = document.querySelector('.nav-overlay');
  var closeBtn = document.querySelector('.nav-close');
  function setMenu(open) {
    toggle.setAttribute('aria-expanded', open);
    nav.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) {
      overlay.hidden = false;
      requestAnimationFrame(function () { overlay.classList.add('show'); });
      closeBtn.focus();
    } else {
      overlay.classList.remove('show');
      setTimeout(function () { if (!nav.classList.contains('open')) overlay.hidden = true; }, 300);
    }
  }
  if (toggle && nav && overlay && closeBtn) {
    toggle.addEventListener('click', function () { setMenu(true); });
    closeBtn.addEventListener('click', function () { setMenu(false); toggle.focus(); });
    overlay.addEventListener('click', function () { setMenu(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) { setMenu(false); toggle.focus(); }
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 1020 && nav.classList.contains('open')) setMenu(false);
    });
  }

  // Lightbox
  var box = document.querySelector('.lightbox');
  if (!box) return;
  var img = box.querySelector('img');
  var cap = box.querySelector('figcaption');
  var items = [], index = 0, lastFocus = null;

  function show(i) {
    index = (i + items.length) % items.length;
    var a = items[index];
    img.src = a.getAttribute('href');
    img.alt = a.querySelector('img').alt;
    cap.textContent = a.dataset.caption || '';
    cap.hidden = !a.dataset.caption;
  }
  function open(a) {
    items = Array.prototype.slice.call(document.querySelectorAll('.zoom[data-group="' + a.dataset.group + '"]'));
    lastFocus = a;
    show(items.indexOf(a));
    box.hidden = false;
    document.body.style.overflow = 'hidden';
    box.querySelector('.lb-close').focus();
  }
  function close() {
    box.hidden = true;
    img.src = '';
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest('.zoom');
    if (a) { e.preventDefault(); open(a); }
  });
  box.querySelector('.lb-close').addEventListener('click', close);
  box.querySelector('.lb-prev').addEventListener('click', function () { show(index - 1); });
  box.querySelector('.lb-next').addEventListener('click', function () { show(index + 1); });
  box.addEventListener('click', function (e) { if (e.target === box) close(); });
  document.addEventListener('keydown', function (e) {
    if (box.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });

  // Swipe on touch screens
  var x0 = null;
  box.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  box.addEventListener('touchend', function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1));
    x0 = null;
  });
})();
