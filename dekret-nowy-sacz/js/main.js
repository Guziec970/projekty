/* DEKRET — interakcje strony */
(function () {
  'use strict';

  document.documentElement.classList.add('js');

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── rok w stopce ───────────────────────────────────── */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ── cień nagłówka po przewinięciu ──────────────────── */
  var header = document.getElementById('siteHeader');
  function onScroll() {
    if (!header) return;
    header.classList.toggle('is-stuck', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── menu mobilne ───────────────────────────────────── */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');

  function closeNav() {
    if (!nav || !burger) return;
    nav.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
  }

  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
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

  /* ── pojawianie się sekcji przy przewijaniu ─────────── */
  var revealables = document.querySelectorAll('.reveal');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(revealables, function (el) {
      el.classList.add('is-in');
    });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var delay = parseInt(entry.target.dataset.delay || '0', 10) * 90;
        setTimeout(function () { entry.target.classList.add('is-in'); }, delay);
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    Array.prototype.forEach.call(revealables, function (el) { io.observe(el); });
  }

  /* ── formularz zapytania ────────────────────────────────
     Bez backendu: po walidacji składa gotową wiadomość
     i otwiera program pocztowy. Aby wysyłać przez serwer,
     patrz README.md → "Formularz".
  ------------------------------------------------------- */
  var ODBIORCA = 'irena.gajdosz@dekret.nsacz.net';

  var form = document.getElementById('contactForm');
  var note = document.getElementById('formNote');

  function setError(id, message) {
    var field = document.getElementById(id);
    var slot = document.querySelector('.field__error[data-for="' + id + '"]');
    if (slot) slot.textContent = message || '';
    if (field) {
      if (message) field.setAttribute('aria-invalid', 'true');
      else field.removeAttribute('aria-invalid');
    }
    return !message;
  }

  function validate() {
    var ok = true;
    var name = document.getElementById('f-name');
    var mail = document.getElementById('f-email');
    var msg = document.getElementById('f-msg');
    var rodo = document.getElementById('f-rodo');

    ok = setError('f-name', name.value.trim().length < 2 ? 'Podaj imię i nazwisko.' : '') && ok;
    ok = setError('f-email', /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(mail.value.trim()) ? '' : 'Podaj poprawny adres e-mail.') && ok;
    ok = setError('f-msg', msg.value.trim().length < 10 ? 'Opisz krótko, czego dotyczy zapytanie.' : '') && ok;
    ok = setError('f-rodo', rodo.checked ? '' : 'Zgoda jest wymagana, aby odpowiedzieć na zapytanie.') && ok;

    return ok;
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (note) note.textContent = '';

      if (!validate()) {
        var firstBad = form.querySelector('[aria-invalid="true"]');
        if (firstBad) firstBad.focus();
        return;
      }

      var data = {
        name: document.getElementById('f-name').value.trim(),
        email: document.getElementById('f-email').value.trim(),
        phone: document.getElementById('f-phone').value.trim(),
        scope: document.getElementById('f-scope').value,
        message: document.getElementById('f-msg').value.trim()
      };

      var body = [
        'Imię i nazwisko: ' + data.name,
        'E-mail: ' + data.email,
        'Telefon: ' + (data.phone || '—'),
        'Zakres: ' + data.scope,
        '',
        'Wiadomość:',
        data.message,
        '',
        '— wysłane z formularza na dekret.nsacz.net'
      ].join('\n');

      var href = 'mailto:' + ODBIORCA +
        '?subject=' + encodeURIComponent('Zapytanie o wycenę — ' + data.scope) +
        '&body=' + encodeURIComponent(body);

      window.location.href = href;

      if (note) {
        note.textContent = 'Otwieramy Twój program pocztowy z gotową wiadomością. ' +
          'Jeśli się nie otworzył, napisz na ' + ODBIORCA + ' lub zadzwoń: 18 444 23 25.';
      }
    });

    form.addEventListener('input', function (e) {
      var id = e.target.id;
      if (id && e.target.getAttribute('aria-invalid') === 'true') setError(id, '');
    });
  }
})();
