// Gabinet Kosmetyczny Bella – interakcje (zakładki: każda sekcja działa tylko, gdy jej element jest na stronie).
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
  matchMedia("(min-width: 1181px)").addEventListener("change", (e) => { if (e.matches) setDrawer(false); });
  const sentinel = document.createElement("div");
  sentinel.style.cssText = "position:absolute;top:0;height:40px;width:1px;pointer-events:none";
  document.body.prepend(sentinel);
  new IntersectionObserver(([en]) => { pastTop = !en.isIntersecting; nav.classList.toggle("is-stuck", pastTop || !drawer.hidden); }).observe(sentinel);

  // ---------- Pojawianie ----------
  const groups = new Map();
  $$(".reveal").forEach((el) => { const k = el.parentElement, i = groups.get(k) || 0; el.style.setProperty("--rd", `${Math.min(i, 5) * 70}ms`); groups.set(k, i + 1); });
  const ro = new IntersectionObserver((ents) => ents.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); ro.unobserve(en.target); } }), { rootMargin: "0px 0px -6% 0px", threshold: .08 });
  $$(".reveal, [data-tl]").forEach((el) => ro.observe(el));

  // ---------- Plastry stref (Start) ----------
  const slices = $("[data-slices]");
  if (slices) {
    const items = $$(".slice", slices);
    const activate = (s) => items.forEach((x) => x.classList.toggle("is-active", x === s));
    items.forEach((s) => {
      s.addEventListener("mouseenter", () => activate(s));
      s.addEventListener("focus", () => activate(s));
    });
    // na dotyku pierwszy tap rozwija plaster, drugi przechodzi do zabiegów (tylko układ poziomy)
    slices.addEventListener("click", (e) => {
      const s = e.target.closest(".slice");
      if (s && !s.classList.contains("is-active") && matchMedia("(min-width: 901px)").matches) { e.preventDefault(); activate(s); }
    });
  }

  // ---------- Zabiegi: filtr kategorii + otwieranie z adresu ----------
  const cats = $("[data-cats]");
  if (cats) {
    const chips = $$(".chip"), groupsEl = $$("[data-group]", cats);
    const ids = groupsEl.map((g) => g.dataset.group);
    function filter(cat, scroll) {
      chips.forEach((c) => c.setAttribute("aria-pressed", String(c.dataset.cat === cat)));
      groupsEl.forEach((g) => g.classList.toggle("is-filtered-out", cat !== "all" && g.dataset.group !== cat));
      if (scroll) $(".chips-bar").scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
      $$(".reveal", cats).forEach((el) => el.classList.add("is-in"));
    }
    chips.forEach((c) => c.addEventListener("click", () => {
      filter(c.dataset.cat, true);
      history.replaceState(null, "", c.dataset.cat === "all" ? location.pathname : `#${c.dataset.cat}`);
    }));
    function fromHash() {
      const id = decodeURIComponent(location.hash.slice(1));
      if (!id) return;
      if (ids.includes(id)) { filter(id, false); requestAnimationFrame(() => $(`#${id}`).scrollIntoView()); return; }
      const t = document.getElementById(id);
      if (t && t.classList.contains("tr")) {
        filter("all", false);
        if (t.tagName === "DETAILS") t.open = true;
        requestAnimationFrame(() => t.scrollIntoView());
      }
    }
    fromHash();
    addEventListener("hashchange", fromHash);
  }

  // ---------- Podologia: zakładki problemów ----------
  const ptabs = $("[data-ptabs]");
  if (ptabs) {
    const tabs = $$('[role="tab"]', ptabs);
    function select(tab, focus) {
      tabs.forEach((t) => {
        const on = t === tab;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        $(`#${t.getAttribute("aria-controls")}`).hidden = !on;
      });
      if (focus) tab.focus();
      if (matchMedia("(max-width: 860px)").matches) tab.scrollIntoView({ inline: "center", block: "nearest", behavior: reduced ? "auto" : "smooth" });
    }
    tabs.forEach((t, i) => {
      t.addEventListener("click", () => select(t));
      t.addEventListener("keydown", (e) => {
        const k = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
        if (k) { e.preventDefault(); select(tabs[(i + k + tabs.length) % tabs.length], true); }
        if (e.key === "Home") { e.preventDefault(); select(tabs[0], true); }
        if (e.key === "End") { e.preventDefault(); select(tabs[tabs.length - 1], true); }
      });
    });
    const fromHash = () => {
      const t = tabs.find((x) => x.getAttribute("aria-controls") === location.hash.slice(1));
      if (t) { select(t); requestAnimationFrame(() => ptabs.scrollIntoView()); }
    };
    fromHash();
    addEventListener("hashchange", fromHash);
  }

  // ---------- Pływający telefon: tylko gdy nie widać innego przycisku dzwonienia ----------
  const fab = $("[data-fab]"), seen = new Set();
  const fo = new IntersectionObserver((ents) => { ents.forEach((en) => { en.isIntersecting ? seen.add(en.target) : seen.delete(en.target); }); fab.classList.toggle("is-on", seen.size === 0); });
  $$('main a[href^="tel:"], .cta-band a[href^="tel:"]').forEach((a) => fo.observe(a));

  // ---------- Mapa (dwa gabinety) ----------
  const mapEl = $("#map");
  if (mapEl) {
    const PLACES = [
      { pos: [49.70447, 20.41997], name: "Bella Limanowa, ul. Józefa Marka 9", label: "Limanowa" },
      { pos: [49.76155, 20.44881], name: "Bella Laskowa, Laskowa 419", label: "Laskowa" },
    ];
    const mo = new IntersectionObserver(([en]) => {
      if (!en.isIntersecting) return;
      mo.disconnect();
      const css = document.createElement("link"); css.rel = "stylesheet"; css.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"; document.head.append(css);
      const s = document.createElement("script"); s.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      s.onload = () => {
        const L = window.L;
        const map = L.map(mapEl, { scrollWheelZoom: false });
        map.fitBounds(L.latLngBounds(PLACES.map((p) => p.pos)), { padding: [60, 60] });
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' }).addTo(map);
        PLACES.forEach((p) => L.marker(p.pos, { title: p.name, alt: p.name, icon: L.divIcon({ className: "", html: '<div class="map-pin"><i class="ph ph-sparkle" aria-hidden="true"></i></div>', iconSize: [44, 44], iconAnchor: [22, 22] }) }).addTo(map).bindPopup(p.name).bindTooltip(p.label, { permanent: true, direction: "right", offset: [24, 0], className: "map-label" }));
        if (matchMedia("(pointer: coarse)").matches) map.dragging.disable();
      };
      s.onerror = () => { mapEl.innerHTML = '<p style="padding:24px">Mapa się nie wczytała. Gabinety: Limanowa, ul. Józefa Marka 9 oraz Laskowa 419.</p>'; };
      document.body.append(s);
    }, { rootMargin: "400px" });
    mo.observe(mapEl);
  }

  $("[data-year]").textContent = new Date().getFullYear();
})();
