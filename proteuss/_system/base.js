/* Wspólne zachowania dla propozycji z katalogu proteuss/
   Adres odbiorcy formularza bierze z atrybutu data-mail na <form>. */
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  /* nagłówek */
  var hd = document.getElementById('hd');
  function onScroll(){ if (hd) hd.classList.toggle('stuck', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* menu mobilne */
  var burger = document.getElementById('burger'), nav = document.getElementById('nav');
  function closeNav(){ if (nav && burger){ nav.classList.remove('open'); burger.setAttribute('aria-expanded','false'); } }
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e){ if (e.target.closest('a')) closeNav(); });
    document.addEventListener('keydown', function (e){ if (e.key === 'Escape') closeNav(); });
    document.addEventListener('click', function (e){
      if (!nav.contains(e.target) && !burger.contains(e.target)) closeNav();
    });
  }

  /* pojawianie się sekcji */
  var items = document.querySelectorAll('.rv');
  if (reduce || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(items, function (el){ el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var d = parseInt(en.target.dataset.d || '0', 10) * 85;
        setTimeout(function (){ en.target.classList.add('in'); }, d);
        io.unobserve(en.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    Array.prototype.forEach.call(items, function (el){ io.observe(el); });
  }

  /* formularz — walidacja + mailto, bez backendu */
  var frm = document.getElementById('frm');
  if (!frm) return;
  var note = document.getElementById('note');
  var MAIL = frm.dataset.mail || '';
  var TEL  = frm.dataset.tel  || '';

  function setErr(id, msg) {
    var f = document.getElementById(id), slot = document.querySelector('.err[data-for="' + id + '"]');
    if (slot) slot.textContent = msg || '';
    if (f) { if (msg) f.setAttribute('aria-invalid','true'); else f.removeAttribute('aria-invalid'); }
    return !msg;
  }

  frm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (note) note.textContent = '';

    var nm = document.getElementById('f-name'), ml = document.getElementById('f-mail'), ms = document.getElementById('f-msg');
    var ok = true;
    ok = setErr('f-name', nm.value.trim().length < 2 ? 'Podaj imię i nazwisko.' : '') && ok;
    ok = setErr('f-mail', /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(ml.value.trim()) ? '' : 'Podaj poprawny adres e-mail.') && ok;
    ok = setErr('f-msg',  ms.value.trim().length < 10 ? 'Napisz krótko, czego dotyczy sprawa.' : '') && ok;
    if (!ok) { var bad = frm.querySelector('[aria-invalid="true"]'); if (bad) bad.focus(); return; }

    var tel = document.getElementById('f-tel'), kind = document.getElementById('f-kind');
    var body = [
      'Imię i nazwisko: ' + nm.value.trim(),
      'E-mail: ' + ml.value.trim(),
      'Telefon: ' + (tel && tel.value.trim() ? tel.value.trim() : '—'),
      kind ? 'Sprawa: ' + kind.value : null,
      '', 'Wiadomość:', ms.value.trim(),
      '', '— wysłane z formularza na stronie'
    ].filter(Boolean).join('\n');

    window.location.href = 'mailto:' + MAIL +
      '?subject=' + encodeURIComponent('Zapytanie ze strony' + (kind ? ' — ' + kind.value : '')) +
      '&body=' + encodeURIComponent(body);

    if (note) {
      note.textContent = 'Otwieramy Twój program pocztowy z gotową wiadomością. Jeśli się nie otworzył, napisz na ' +
        MAIL + (TEL ? ' lub zadzwoń: ' + TEL : '') + '.';
    }
  });

  frm.addEventListener('input', function (e) {
    if (e.target.id && e.target.getAttribute('aria-invalid') === 'true') setErr(e.target.id, '');
  });
})();
