/* Biuro Rachunkowe Bożena Ogorzałek — interakcje strony */
(function () {
  'use strict';

  document.documentElement.classList.add('js');

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* rok w stopce */
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  /* kreska pod nagłówkiem po przewinięciu */
  var hdr = document.getElementById('hdr');
  function onScroll() {
    if (hdr) hdr.classList.toggle('stuck', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* menu mobilne */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');

  function closeNav() {
    if (!nav || !burger) return;
    nav.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }

  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeNav();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && !burger.contains(e.target)) closeNav();
    });
  }

  /* pojawianie się sekcji przy przewijaniu */
  var items = document.querySelectorAll('.rv');

  if (reduce || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(items, function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var d = parseInt(entry.target.dataset.d || '0', 10) * 85;
        setTimeout(function () { entry.target.classList.add('in'); }, d);
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    Array.prototype.forEach.call(items, function (el) { io.observe(el); });
  }

  /* ── formularz ────────────────────────────────────────
     Bez backendu: po walidacji składa wiadomość i otwiera
     program pocztowy. Podmiana na wysyłkę serwerową: README.
  ----------------------------------------------------- */
  var ODBIORCA = 'biuro@ogorzalek.nsacz.net';

  var frm = document.getElementById('frm');
  var note = document.getElementById('frmNote');

  function setErr(id, msg) {
    var f = document.getElementById(id);
    var slot = document.querySelector('.err[data-for="' + id + '"]');
    if (slot) slot.textContent = msg || '';
    if (f) {
      if (msg) f.setAttribute('aria-invalid', 'true');
      else f.removeAttribute('aria-invalid');
    }
    return !msg;
  }

  function validate() {
    var ok = true;
    var nm = document.getElementById('x-name');
    var ml = document.getElementById('x-mail');
    var ms = document.getElementById('x-msg');

    ok = setErr('x-name', nm.value.trim().length < 2 ? 'Podaj imię i nazwisko.' : '') && ok;
    ok = setErr('x-mail', /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(ml.value.trim()) ? '' : 'Podaj poprawny adres e-mail.') && ok;
    ok = setErr('x-msg', ms.value.trim().length < 10 ? 'Napisz krótko, czego dotyczy sprawa.' : '') && ok;

    return ok;
  }

  if (frm) {
    frm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (note) note.textContent = '';

      if (!validate()) {
        var bad = frm.querySelector('[aria-invalid="true"]');
        if (bad) bad.focus();
        return;
      }

      var d = {
        name: document.getElementById('x-name').value.trim(),
        mail: document.getElementById('x-mail').value.trim(),
        tel: document.getElementById('x-tel').value.trim(),
        kind: document.getElementById('x-kind').value,
        msg: document.getElementById('x-msg').value.trim()
      };

      var body = [
        'Imię i nazwisko: ' + d.name,
        'E-mail: ' + d.mail,
        'Telefon: ' + (d.tel || '—'),
        'Sprawa: ' + d.kind,
        '',
        'Wiadomość:',
        d.msg,
        '',
        '— wysłane z formularza na ogorzalek.nsacz.net'
      ].join('\n');

      window.location.href = 'mailto:' + ODBIORCA +
        '?subject=' + encodeURIComponent('Zapytanie ze strony — ' + d.kind) +
        '&body=' + encodeURIComponent(body);

      if (note) {
        note.textContent = 'Otwieramy Twój program pocztowy z gotową wiadomością. ' +
          'Jeśli się nie otworzył, napisz na ' + ODBIORCA + ' lub zadzwoń: 18 444 30 65.';
      }
    });

    frm.addEventListener('input', function (e) {
      var id = e.target.id;
      if (id && e.target.getAttribute('aria-invalid') === 'true') setErr(id, '');
    });
  }
})();
