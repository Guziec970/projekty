// Gabinet Weterynaryjny, Dobra – interakcje (każda sekcja działa tylko, gdy jej element jest na stronie).
(() => {
  "use strict";
  document.documentElement.classList.add("js");
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- Nawigacja ----------
  const nav = $("#nav"), burger = $(".nav__burger"), drawer = $("#drawer");
  let pastTop = false;
  function setDrawer(open) {
    drawer.hidden = !open;
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Zamknij menu" : "Otwórz menu");
    burger.innerHTML = `<i class="ph ${open ? "ph-x" : "ph-list"}" aria-hidden="true"></i>`;
    document.body.style.overflow = open ? "hidden" : "";
    nav.classList.toggle("is-stuck", open || pastTop);
    if (open) $("a", drawer).focus({ preventScroll: true });
  }
  burger.addEventListener("click", () => setDrawer(drawer.hidden));
  drawer.addEventListener("click", (e) => { if (e.target.closest("a")) setDrawer(false); });
  addEventListener("keydown", (e) => { if (e.key === "Escape" && !drawer.hidden) { setDrawer(false); burger.focus(); } });
  matchMedia("(min-width: 901px)").addEventListener("change", (e) => { if (e.matches) setDrawer(false); });
  const sentinel = document.createElement("div");
  sentinel.style.cssText = "position:absolute;top:0;height:40px;width:1px;pointer-events:none";
  document.body.prepend(sentinel);
  new IntersectionObserver(([en]) => { pastTop = !en.isIntersecting; nav.classList.toggle("is-stuck", pastTop || !drawer.hidden); }).observe(sentinel);

  // ---------- Pojawianie ----------
  const groups = new Map();
  $$(".reveal").forEach((el) => { const k = el.parentElement, i = groups.get(k) || 0; el.style.setProperty("--rd", `${Math.min(i, 5) * 70}ms`); groups.set(k, i + 1); });
  const ro = new IntersectionObserver((ents) => ents.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); ro.unobserve(en.target); } }), { rootMargin: "0px 0px -6% 0px", threshold: .08 });
  $$(".reveal").forEach((el) => ro.observe(el));

  // ---------- Start: wybór zwierzęcia (zakładki ARIA) ----------
  const atabs = $("[data-atabs]");
  if (atabs) {
    const tabs = $$('[role="tab"]', atabs);
    function select(tab, focus) {
      tabs.forEach((t) => {
        const on = t === tab;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        $(`#${t.getAttribute("aria-controls")}`).hidden = !on;
      });
      if (focus) tab.focus();
    }
    tabs.forEach((t, i) => {
      t.addEventListener("click", () => select(t));
      t.addEventListener("keydown", (e) => {
        const k = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
        if (k) { e.preventDefault(); select(tabs[(i + k + tabs.length) % tabs.length], true); }
        if (e.key === "Home") { e.preventDefault(); select(tabs[0], true); }
        if (e.key === "End") { e.preventDefault(); select(tabs[tabs.length - 1], true); }
      });
    });
  }

  // ---------- Kafel gospodarstwa: delikatny parallax ----------
  const px = $("[data-parallax]");
  if (px && !reduced) {
    let ticking = false;
    const update = () => {
      const r = px.parentElement.getBoundingClientRect();
      const p = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
      px.style.setProperty("--py", `${(-p * 40).toFixed(1)}px`);
      ticking = false;
    };
    addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  // ---------- Psy i koty: podświetlenie zakresu w pasku ----------
  const chips = $$(".chip[href^='#']");
  if (chips.length) {
    const so = new IntersectionObserver((ents) => ents.forEach((en) => {
      if (en.isIntersecting) chips.forEach((c) => c.classList.toggle("is-on", c.getAttribute("href") === `#${en.target.id}`));
    }), { rootMargin: "-40% 0px -55% 0px" });
    chips.forEach((c) => { const t = $(c.getAttribute("href")); if (t) so.observe(t); });
  }

  // ---------- Pływający telefon: tylko gdy nie widać innego przycisku dzwonienia ----------
  const fab = $("[data-fab]"), seen = new Set();
  const fo = new IntersectionObserver((ents) => { ents.forEach((en) => { en.isIntersecting ? seen.add(en.target) : seen.delete(en.target); }); fab.classList.toggle("is-on", seen.size === 0); });
  $$('main a[href^="tel:"], .cta-band a[href^="tel:"]').forEach((a) => fo.observe(a));

  // ---------- Mapa ----------
  const mapEl = $("#map");
  if (mapEl) {
    const POS = [49.71729, 20.25957];
    const mo = new IntersectionObserver(([en]) => {
      if (!en.isIntersecting) return;
      mo.disconnect();
      const css = document.createElement("link"); css.rel = "stylesheet"; css.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"; document.head.append(css);
      const s = document.createElement("script"); s.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      s.onload = () => {
        const L = window.L;
        const map = L.map(mapEl, { scrollWheelZoom: false }).setView(POS, 13);
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' }).addTo(map);
        L.marker(POS, { title: "Gabinet weterynaryjny, Dobra 494", alt: "Gabinet weterynaryjny, Dobra 494", icon: L.divIcon({ className: "", html: '<div class="map-pin"><img src="img/logo.png" alt=""></div>', iconSize: [48, 48], iconAnchor: [24, 24] }) })
          .addTo(map).bindTooltip("Dobra 494", { permanent: true, direction: "right", offset: [26, 0], className: "map-label" });
        if (matchMedia("(pointer: coarse)").matches) map.dragging.disable();
      };
      s.onerror = () => { mapEl.innerHTML = '<p style="padding:24px">Mapa się nie wczytała. Gabinet: Dobra 494, przy trasie Limanowa - Mszana Dolna.</p>'; };
      document.body.append(s);
    }, { rootMargin: "400px" });
    mo.observe(mapEl);
  }

  $("[data-year]").textContent = new Date().getFullYear();
})();
