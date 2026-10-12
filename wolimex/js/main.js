// P.P.U.H. WOLIMEX – interakcje (każda sekcja działa tylko, gdy jej element jest na stronie).
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
  matchMedia("(min-width: 1061px)").addEventListener("change", (e) => { if (e.matches) setDrawer(false); });
  const sentinel = document.createElement("div");
  sentinel.style.cssText = "position:absolute;top:0;height:40px;width:1px;pointer-events:none";
  document.body.prepend(sentinel);
  new IntersectionObserver(([en]) => { pastTop = !en.isIntersecting; nav.classList.toggle("is-stuck", pastTop || !drawer.hidden); }).observe(sentinel);

  // ---------- Pojawianie ----------
  const groups = new Map();
  $$(".reveal").forEach((el) => { const k = el.parentElement, i = groups.get(k) || 0; el.style.setProperty("--rd", `${Math.min(i, 5) * 70}ms`); groups.set(k, i + 1); });
  const ro = new IntersectionObserver((ents) => ents.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); ro.unobserve(en.target); } }), { rootMargin: "0px 0px -6% 0px", threshold: .08 });
  $$(".reveal, [data-tl]").forEach((el) => ro.observe(el));

  // ---------- Liczniki (start) ----------
  const nums = $$("[data-count]");
  if (nums.length && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const co = new IntersectionObserver((ents) => ents.forEach((en) => {
      if (!en.isIntersecting) return;
      co.unobserve(en.target);
      const el = en.target, to = +el.dataset.count, from = to > 1000 ? to - 40 : 0, t0 = performance.now(), dur = 1400;
      const step = (t) => { const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3); el.textContent = String(Math.round(from + (to - from) * e)); if (p < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    }), { threshold: .6 });
    nums.forEach((n) => co.observe(n));
  }

  // ---------- Oferta: aktywny dział w pasku ----------
  const tabsA = $$(".tab[href^='#']");
  if (tabsA.length) {
    const so = new IntersectionObserver((ents) => ents.forEach((en) => {
      if (en.isIntersecting) tabsA.forEach((c) => {
        const on = c.getAttribute("href") === `#${en.target.id}`;
        c.classList.toggle("is-on", on);
        if (on) c.scrollIntoView({ inline: "nearest", block: "nearest" });
      });
    }), { rootMargin: "-35% 0px -60% 0px" });
    tabsA.forEach((c) => { const t = $(c.getAttribute("href")); if (t) so.observe(t); });
  }

  // ---------- Realizacje: filtr ----------
  const rt = $("[data-rtable]");
  if (rt) {
    const rows = $$(".rt", rt), btns = $$("[data-rf]"), cnt = $("[data-rcount]");
    const word = (n) => (n === 1 ? "realizację" : (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14)) ? "realizacje" : "realizacji");
    btns.forEach((b) => b.addEventListener("click", () => {
      btns.forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      let n = 0;
      rows.forEach((r) => { const on = b.dataset.rf === "all" || r.dataset.cat === b.dataset.rf; r.hidden = !on; if (on) n++; });
      cnt.textContent = `Pokazano ${n} ${word(n)}`;
    }));
  }

  // ---------- Pływający telefon: tylko gdy nie widać innego przycisku dzwonienia ----------
  const fab = $("[data-fab]"), seen = new Set();
  const fo = new IntersectionObserver((ents) => { ents.forEach((en) => { en.isIntersecting ? seen.add(en.target) : seen.delete(en.target); }); fab.classList.toggle("is-on", seen.size === 0); });
  $$('main a[href^="tel:"], .cta-band a[href^="tel:"]').forEach((a) => fo.observe(a));

  // ---------- Mapa (siedziba + kopalnia + żwirownia) ----------
  const mapEl = $("#map");
  if (mapEl) {
    const PLACES = [
      { pos: [49.73716, 20.40167], name: "WOLIMEX: siedziba, wyroby betonowe, sprzęt (ul. Tarnowska 33, Limanowa)", label: "Siedziba, Limanowa", ico: "ph-buildings" },
      { pos: [49.67902, 20.54952], name: "Kopalnia piaskowca, Męcina", label: "Kopalnia, Męcina", ico: "ph-mountains" },
      { pos: [49.87102, 20.75304], name: "Zakład uszlachetniania kruszyw, Charzewice", label: "Żwirownia, Charzewice", ico: "ph-funnel" },
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
        PLACES.forEach((p) => L.marker(p.pos, { title: p.name, alt: p.name, icon: L.divIcon({ className: "", html: `<div class="map-pin"><i class="ph ${p.ico}" aria-hidden="true"></i></div>`, iconSize: [36, 36], iconAnchor: [18, 18] }) })
          .addTo(map).bindPopup(p.name).bindTooltip(p.label, { permanent: true, direction: "right", offset: [20, 0], className: "map-label" }));
        if (matchMedia("(pointer: coarse)").matches) map.dragging.disable();
      };
      s.onerror = () => { mapEl.innerHTML = '<p style="padding:24px">Mapa się nie wczytała. Siedziba: ul. Tarnowska 33, Limanowa.</p>'; };
      document.body.append(s);
    }, { rootMargin: "400px" });
    mo.observe(mapEl);
  }

  $("[data-year]").textContent = new Date().getFullYear();
})();
