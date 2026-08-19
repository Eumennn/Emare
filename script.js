/* =========================================================
   EcoDetect — interactions
   Transform/opacity only, rAF-throttled, reduced-motion aware.
   ========================================================= */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canHover = window.matchMedia('(hover:hover) and (pointer:fine)').matches;

  /* =========================================================
     SMOOTH SCROLL — tekerlek girdisini lerp ile yumuşatır.
     Sorun çıkarsa kendini kapatır; aşağıdaki satırı false yaparak
     tamamen devre dışı bırakabilirsiniz.
     ========================================================= */
  var SMOOTH_SCROLL = true;

  var smooth = SMOOTH_SCROLL && canHover && !reduced;
  if (!smooth) document.documentElement.classList.add('no-smooth-js');

  var sTarget = window.pageYOffset;
  var sCurrent = sTarget;
  var sRunning = false;
  var sSelf = false;          /* scrollTo'yu kendimiz mi tetikledik */
  var sGuard = null;

  function maxScroll() {
    return Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  }

  /* motor kilitlenirse sayfa asla kaydırılamaz halde kalmasın */
  function disableSmooth() {
    if (!smooth) return;
    smooth = false;
    sRunning = false;
    clearTimeout(sGuard);
    window.removeEventListener('wheel', onWheel, { passive: false });
    document.documentElement.classList.add('no-smooth-js');
  }

  function watchdog() {
    clearTimeout(sGuard);
    var y0 = window.pageYOffset;
    sGuard = setTimeout(function () {
      if (window.pageYOffset === y0 && Math.abs(sTarget - y0) > 6) disableSmooth();
    }, 600);
  }

  function sStep() {
    try {
      var diff = sTarget - sCurrent;
      if (Math.abs(diff) < 0.35) {
        sCurrent = sTarget;
        sRunning = false;
        sSelf = true; window.scrollTo(0, Math.round(sCurrent));
        return;
      }
      sCurrent += diff * 0.115;               /* yumuşaklık katsayısı */
      sSelf = true; window.scrollTo(0, Math.round(sCurrent));
      window.requestAnimationFrame(sStep);
    } catch (err) {
      disableSmooth();
    }
  }

  function scrollToY(y) {
    sTarget = Math.max(0, Math.min(y, maxScroll()));
    if (!sRunning) { sRunning = true; window.requestAnimationFrame(sStep); }
  }

  /* kendi kaydırma çubuğu olan bir öğenin içindeysek karışma */
  function inScrollable(node) {
    while (node && node.nodeType === 1 && node !== document.body) {
      if (node.scrollHeight > node.clientHeight + 2) {
        var ov = getComputedStyle(node).overflowY;
        if (ov === 'auto' || ov === 'scroll') return true;
      }
      node = node.parentNode;
    }
    return false;
  }

  function onWheel(e) {
    try {
      if (e.ctrlKey || e.defaultPrevented) return;   /* pinch-zoom'a dokunma */
      if (inScrollable(e.target)) return;
      e.preventDefault();
      var d = e.deltaY;
      if (e.deltaMode === 1) d *= 18;                /* satır -> px */
      else if (e.deltaMode === 2) d *= window.innerHeight;
      scrollToY(sTarget + d);
      watchdog();
    } catch (err) {
      disableSmooth();
    }
  }

  if (smooth) {
    window.addEventListener('wheel', onWheel, { passive: false });

    /* klavye, scrollbar sürükleme, adres çubuğu vb. dışarıdan gelen kaydırmalar */
    window.addEventListener('scroll', function () {
      if (sSelf) { sSelf = false; return; }
      if (!sRunning) { sCurrent = sTarget = window.pageYOffset; }
    }, { passive: true });

    window.addEventListener('resize', function () {
      sCurrent = sTarget = window.pageYOffset;
    }, { passive: true });

    window.addEventListener('error', disableSmooth);
  }

  /* aynı yumuşaklıkla çapa (anchor) geçişleri */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (!id || id === '#') return;
      var el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      var y = el.getBoundingClientRect().top + window.pageYOffset - 96;
      if (smooth) scrollToY(y);
      else window.scrollTo({ top: Math.max(0, y), behavior: reduced ? 'auto' : 'smooth' });
      /* file:// üzerinde replaceState SecurityError atar — sessizce geç */
      try { history.replaceState(null, '', id); } catch (err) { /* yok say */ }
    });
  });

  /* ---------- scroll progress + sticky nav ---------- */
  var nav = document.getElementById('nav');
  var fill = document.getElementById('scrollbarFill');
  var heroImg = document.getElementById('heroImg');
  /* bant ve alt görselde parallax yok: ölçek uygulanınca görsel kırpılıyordu */

  var ticking = false;

  function onScroll() {
    var y = window.pageYOffset || document.documentElement.scrollTop;
    var max = document.documentElement.scrollHeight - window.innerHeight;

    if (fill) fill.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
    if (nav) nav.classList.toggle('is-stuck', y > 24);

    if (!reduced && heroImg && y < window.innerHeight * 1.2) {
      heroImg.style.transform = 'scale(1.06) translate3d(0,' + (y * 0.12).toFixed(2) + 'px,0)';
    }

    updateThumb(y, max);
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(onScroll);
    }
  }, { passive: true });

  /* =========================================================
     ÖZEL KAYDIRMA ÇUBUĞU (sağ kenar)
     ========================================================= */
  var vbar = document.getElementById('vscroll');
  var vthumb = document.getElementById('vscrollThumb');
  var vHideTimer = null;
  var vDragging = false;
  var vTrackH = 0, vThumbH = 0;

  function showBar() {
    if (!vbar) return;
    vbar.classList.add('is-visible');
    clearTimeout(vHideTimer);
    vHideTimer = setTimeout(function () {
      if (!vDragging && !vbar.matches(':hover')) vbar.classList.remove('is-visible');
    }, 1400);
  }

  function updateThumb(y, max) {
    if (!vbar || !vthumb) return;
    vTrackH = vbar.clientHeight;
    if (max <= 0) { vbar.style.display = 'none'; return; }
    vbar.style.display = '';
    var ratio = window.innerHeight / document.documentElement.scrollHeight;
    vThumbH = Math.max(46, Math.round(vTrackH * ratio));
    var top = Math.round((vTrackH - vThumbH) * (y / max));
    vthumb.style.height = vThumbH + 'px';
    vthumb.style.transform = 'translateY(' + top + 'px)';
    showBar();
  }

  if (vbar && vthumb) {
    vbar.addEventListener('pointerenter', function () { vbar.classList.add('is-visible'); clearTimeout(vHideTimer); });
    vbar.addEventListener('pointerleave', showBar);

    var dragStartY = 0, dragStartTop = 0;

    vthumb.addEventListener('pointerdown', function (e) {
      e.preventDefault();
      vDragging = true;
      vbar.classList.add('is-dragging');
      vthumb.setPointerCapture(e.pointerId);
      dragStartY = e.clientY;
      dragStartTop = (window.pageYOffset / Math.max(1, maxScroll())) * (vTrackH - vThumbH);
    });

    vthumb.addEventListener('pointermove', function (e) {
      if (!vDragging) return;
      var span = Math.max(1, vTrackH - vThumbH);
      var top = Math.min(span, Math.max(0, dragStartTop + (e.clientY - dragStartY)));
      var y = (top / span) * maxScroll();
      sCurrent = sTarget = y;          /* lerp motoruyla çakışmasın */
      sSelf = true;
      window.scrollTo(0, Math.round(y));
    });

    var endDrag = function (e) {
      if (!vDragging) return;
      vDragging = false;
      vbar.classList.remove('is-dragging');
      try { vthumb.releasePointerCapture(e.pointerId); } catch (err) { /* yok say */ }
      showBar();
    };
    vthumb.addEventListener('pointerup', endDrag);
    vthumb.addEventListener('pointercancel', endDrag);

    /* şeride tıklayınca o noktaya yumuşak geçiş */
    vbar.addEventListener('pointerdown', function (e) {
      if (e.target === vthumb) return;
      var rect = vbar.getBoundingClientRect();
      var span = Math.max(1, vTrackH - vThumbH);
      var top = Math.min(span, Math.max(0, e.clientY - rect.top - vThumbH / 2));
      var y = (top / span) * maxScroll();
      if (smooth) scrollToY(y); else window.scrollTo({ top: y, behavior: 'smooth' });
    });
  }

  onScroll();

  /* ---------- reveal on enter ---------- */
  var revealables = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealables.forEach(function (el) { io.observe(el); });
  } else {
    revealables.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- number counters ---------- */
  var counters = document.querySelectorAll('.count');
  function isEn() {
    return !!(window.EMARE_I18N && window.EMARE_I18N.lang === 'en');
  }

  function runCount(el) {
    var to = parseFloat(el.dataset.to || '0');
    var prefix = el.dataset.prefix || '';
    var locale = isEn() ? 'en-US' : 'tr-TR';
    var suffix = (isEn() ? el.dataset.suffixEn : el.dataset.suffix) || '';
    if (reduced || to === 0) {
      el.textContent = prefix + to + suffix;
      return;
    }
    var start = null, dur = 1400;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + Math.round(to * eased).toLocaleString(locale) + suffix;
      if (p < 1) window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { runCount(e.target); cio.unobserve(e.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { cio.observe(el); });
  } else {
    counters.forEach(runCount);
  }

  /* ---------- persona tabs ---------- */
  var tabs = document.querySelectorAll('.ptab');
  var cards = document.querySelectorAll('.pcard');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var i = tab.dataset.p;
      tabs.forEach(function (t) { t.classList.toggle('is-active', t === tab); });
      cards.forEach(function (c) { c.classList.toggle('is-active', c.dataset.p === i); });
    });
  });

  /* auto-rotate personas until the user interacts */
  var autoTab = null;
  if (tabs.length && !reduced) {
    var idx = 0, stopped = false;
    var personaEl = document.querySelector('.persona');
    autoTab = setInterval(function () {
      if (stopped || document.hidden) return;
      var r = personaEl.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      idx = (idx + 1) % tabs.length;
      tabs[idx].click();
    }, 5200);
    /* only a real user gesture stops it — programmatic .click() is not trusted */
    var stopAuto = function (e) {
      if (!e.isTrusted) return;
      stopped = true;
      clearInterval(autoTab);
      ['click', 'touchstart', 'keydown'].forEach(function (ev) {
        personaEl.removeEventListener(ev, stopAuto);
      });
    };
    ['click', 'touchstart', 'keydown'].forEach(function (ev) {
      personaEl.addEventListener(ev, stopAuto, { passive: true });
    });
  }

  /* ---------- deck: pointer tilt ---------- */
  var deck = document.querySelector('.deck');
  if (deck && !reduced && window.matchMedia('(hover:hover)').matches) {
    var center = deck.querySelector('.deck__card--center');
    deck.addEventListener('pointermove', function (e) {
      var r = deck.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width - 0.5;
      var py = (e.clientY - r.top) / r.height - 0.5;
      center.style.transform =
        'translateX(-50%) translateY(-20px) scale(1.02) rotateY(' +
        (px * 9).toFixed(2) + 'deg) rotateX(' + (-py * 7).toFixed(2) + 'deg)';
    });
    deck.addEventListener('pointerleave', function () {
      center.style.transform = '';
    });
  }

  /* ---------- mobile menu ---------- */
  var burger = document.getElementById('burger');
  var menu = document.getElementById('mobileMenu');
  if (burger && menu) {
    burger.addEventListener('click', function () {
      var open = menu.classList.toggle('is-open');
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        menu.classList.remove('is-open');
        burger.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- active section in nav ---------- */
  var sections = ['sorun', 'akis', 'kimler', 'kanitlar', 'planlar']
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);
  var navLinks = document.querySelectorAll('.nav__links a');

  if ('IntersectionObserver' in window && sections.length) {
    var sio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        navLinks.forEach(function (l) {
          l.classList.toggle('is-current', l.getAttribute('href') === '#' + e.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { sio.observe(s); });
  }

  /* dil değiştirme i18n.js içinde yönetiliyor */
})();
