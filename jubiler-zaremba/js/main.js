// Jubiler Zaremba – interakcje. Bez bibliotek; Leaflet doładowywany przy mapie.
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
  matchMedia("(min-width: 1025px)").addEventListener("change", (e) => { if (e.matches) setDrawer(false); });

  const sentinel = document.createElement("div");
  sentinel.style.cssText = "position:absolute;top:0;height:60px;width:1px;pointer-events:none";
  document.body.prepend(sentinel);
  new IntersectionObserver(([en]) => { pastTop = !en.isIntersecting; nav.classList.toggle("is-stuck", pastTop || !drawer.hidden); }).observe(sentinel);

  // ---------- Akordeon kolekcji: na klawiaturze i dotyku rozwija fokusowany pasek ----------
  const slices = $$(".slice");
  slices.forEach((s) => s.addEventListener("focus", () => slices.forEach((x) => x.classList.toggle("is-open", x === s))));

  // ---------- Pojawianie się ----------
  const groups = new Map();
  $$(".reveal").forEach((el) => {
    const k = el.parentElement;
    const i = groups.get(k) || 0;
    el.style.setProperty("--rd", `${Math.min(i, 4) * 110}ms`);
    groups.set(k, i + 1);
  });
  const ro = new IntersectionObserver((ents) => {
    ents.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); ro.unobserve(en.target); } });
  }, { rootMargin: "0px 0px -8% 0px", threshold: .1 });
  $$(".reveal").forEach((el) => ro.observe(el));

  // ---------- Okrągły przycisk telefonu: tylko gdy nie widać innego telefonu ----------
  const fab = $("[data-fab]");
  const seen = new Set();
  const fo = new IntersectionObserver((ents) => {
    ents.forEach((en) => { en.isIntersecting ? seen.add(en.target) : seen.delete(en.target); });
    fab.classList.toggle("is-on", seen.size === 0);
  });
  $$('main a[href^="tel:"]').forEach((a) => fo.observe(a));

  // ---------- Mapa z dwoma salonami ----------
  const mapEl = $("#map");
  const SHOPS = [
    { pos: [49.706597, 20.42199], name: "Rynek 3A" },
    { pos: [49.721956, 20.40356], name: "ul. Krakowska 5" },
  ];
  const mo = new IntersectionObserver(([en]) => {
    if (!en.isIntersecting) return;
    mo.disconnect();
    const css = document.createElement("link"); css.rel = "stylesheet"; css.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"; document.head.append(css);
    const js = document.createElement("script"); js.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    js.onload = () => {
      const L = window.L;
      const map = L.map(mapEl, { scrollWheelZoom: false });
      map.fitBounds(L.latLngBounds(SHOPS.map((s) => s.pos)).pad(.35));
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' }).addTo(map);
      SHOPS.forEach((s) => L.marker(s.pos, { title: s.name, icon: L.divIcon({ className: "", html: '<div class="map-pin"></div>', iconSize: [18, 18], iconAnchor: [9, 9] }) })
        .addTo(map).bindTooltip(s.name, { permanent: true, direction: "right", offset: [12, 0] }));
      if (matchMedia("(pointer: coarse)").matches) map.dragging.disable();
    };
    js.onerror = () => { mapEl.innerHTML = '<p style="padding:24px">Mapa się nie wczytała. Salony: Rynek 3A oraz ul. Krakowska 5 w Limanowej.</p>'; };
    document.body.append(js);
  }, { rootMargin: "400px" });
  mo.observe(mapEl);

  $("[data-year]").textContent = new Date().getFullYear();
})();
