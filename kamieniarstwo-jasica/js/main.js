// Zakład Kamieniarski Kazimierz Jasica – interakcje (każda sekcja działa tylko, gdy jej element jest na stronie).
(() => {
  "use strict";
  document.documentElement.classList.add("js");
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

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

  // ---------- Realizacje: filtr + podgląd (dialog) ----------
  const gal = $("[data-gallery]");
  if (gal) {
    const items = $$(".item", gal), chips = $$("[data-filter]"), countEl = $("[data-count]");
    const CATS = chips.map((c) => c.dataset.filter);
    function filter(cat) {
      chips.forEach((c) => c.setAttribute("aria-pressed", String(c.dataset.filter === cat)));
      let n = 0;
      items.forEach((it) => { const on = cat === "all" || it.dataset.cat === cat; it.hidden = !on; if (on) n++; });
      countEl.textContent = `Pokazano ${n} ${n === 1 ? "realizację" : (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14)) ? "realizacje" : "realizacji"}`;
    }
    chips.forEach((c) => c.addEventListener("click", () => {
      filter(c.dataset.filter);
      history.replaceState(null, "", c.dataset.filter === "all" ? location.pathname : `#${c.dataset.filter}`);
    }));
    const h = location.hash.slice(1);
    if (CATS.includes(h)) filter(h);

    const lb = $("[data-lb]"), lbImg = $("[data-lb-img]"), lbCap = $("[data-lb-cap]");
    let cur = 0, opener = null;
    const visible = () => items.filter((it) => !it.hidden);
    function open(i) {
      const list = visible(); cur = (i + list.length) % list.length;
      const img = $("img", list[cur]);
      lbImg.src = img.dataset.full; lbImg.alt = img.alt;
      lbCap.textContent = `${img.alt} (${cur + 1} z ${list.length})`;
    }
    gal.addEventListener("click", (e) => {
      const b = e.target.closest("[data-open]"); if (!b) return;
      opener = b; open(visible().indexOf(b.parentElement)); lb.showModal();
    });
    $("[data-lb-close]").addEventListener("click", () => lb.close());
    $("[data-lb-prev]").addEventListener("click", () => open(cur - 1));
    $("[data-lb-next]").addEventListener("click", () => open(cur + 1));
    lb.addEventListener("keydown", (e) => { if (e.key === "ArrowLeft") open(cur - 1); if (e.key === "ArrowRight") open(cur + 1); });
    lb.addEventListener("click", (e) => { if (e.target === lb) lb.close(); });
    lb.addEventListener("close", () => { if (opener) opener.focus(); });
    let sx = null;
    lb.addEventListener("touchstart", (e) => { sx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", (e) => { if (sx === null) return; const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 40) open(cur + (dx < 0 ? 1 : -1)); sx = null; });
  }

  // ---------- Pływający telefon: tylko gdy nie widać innego przycisku dzwonienia ----------
  const fab = $("[data-fab]"), seen = new Set();
  const fo = new IntersectionObserver((ents) => { ents.forEach((en) => { en.isIntersecting ? seen.add(en.target) : seen.delete(en.target); }); fab.classList.toggle("is-on", seen.size === 0); });
  $$('main a[href^="tel:"], .cta-band a[href^="tel:"]').forEach((a) => fo.observe(a));

  // ---------- Mapa (biuro + zakład) ----------
  const mapEl = $("#map");
  if (mapEl) {
    const PLACES = [
      { pos: [49.70971, 20.41786], name: "Biuro i ekspozycja, ul. Ks. Łazarskiego 20", label: "Biuro i ekspozycja", ico: "ph-storefront" },
      { pos: [49.69299, 20.46146], name: "Zakład, Mordarka 650", label: "Zakład", ico: "ph-factory" },
    ];
    const mo = new IntersectionObserver(([en]) => {
      if (!en.isIntersecting) return;
      mo.disconnect();
      const css = document.createElement("link"); css.rel = "stylesheet"; css.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"; document.head.append(css);
      const s = document.createElement("script"); s.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      s.onload = () => {
        const L = window.L;
        const map = L.map(mapEl, { scrollWheelZoom: false });
        map.fitBounds(L.latLngBounds(PLACES.map((p) => p.pos)), { padding: [70, 70] });
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' }).addTo(map);
        PLACES.forEach((p) => L.marker(p.pos, { title: p.name, alt: p.name, icon: L.divIcon({ className: "", html: `<div class="map-pin"><i class="ph ${p.ico}" aria-hidden="true"></i></div>`, iconSize: [40, 40], iconAnchor: [20, 20] }) })
          .addTo(map).bindPopup(p.name).bindTooltip(p.label, { permanent: true, direction: "right", offset: [22, 0], className: "map-label" }));
        if (matchMedia("(pointer: coarse)").matches) map.dragging.disable();
      };
      s.onerror = () => { mapEl.innerHTML = '<p style="padding:24px">Mapa się nie wczytała. Biuro: ul. Ks. Łazarskiego 20, Limanowa (obok cmentarza). Zakład: Mordarka 650.</p>'; };
      document.body.append(s);
    }, { rootMargin: "400px" });
    mo.observe(mapEl);
  }

  $("[data-year]").textContent = new Date().getFullYear();
})();
