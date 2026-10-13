// Dom Weselny „Walek” – interakcje (każda sekcja działa tylko, gdy jej element jest na stronie).
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
  matchMedia("(min-width: 1021px)").addEventListener("change", (e) => { if (e.matches) setDrawer(false); });
  const sentinel = document.createElement("div");
  sentinel.style.cssText = "position:absolute;top:0;height:40px;width:1px;pointer-events:none";
  document.body.prepend(sentinel);
  new IntersectionObserver(([en]) => { pastTop = !en.isIntersecting; nav.classList.toggle("is-stuck", pastTop || !drawer.hidden); }).observe(sentinel);

  // ---------- Pojawianie ----------
  const groups = new Map();
  $$(".reveal").forEach((el) => { const k = el.parentElement, i = groups.get(k) || 0; el.style.setProperty("--rd", `${Math.min(i, 5) * 70}ms`); groups.set(k, i + 1); });
  const ro = new IntersectionObserver((ents) => ents.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); ro.unobserve(en.target); } }), { rootMargin: "0px 0px -6% 0px", threshold: .08 });
  $$(".reveal").forEach((el) => ro.observe(el));

  // ---------- Galeria: filtr + podgląd (dialog) ----------
  const gal = $("[data-gallery]");
  if (gal) {
    const items = $$(".item", gal), chips = $$("[data-filter]"), countEl = $("[data-count]");
    const CATS = chips.map((c) => c.dataset.filter);
    function filter(cat) {
      chips.forEach((c) => c.setAttribute("aria-pressed", String(c.dataset.filter === cat)));
      let n = 0;
      items.forEach((it) => { const on = cat === "all" || it.dataset.cat === cat; it.hidden = !on; if (on) n++; });
      countEl.textContent = `Pokazano ${n} ${n === 1 ? "zdjęcie" : (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14)) ? "zdjęcia" : "zdjęć"}`;
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

  // ---------- Kontakt: planer terminu -> gotowy e-mail ----------
  const planner = $("[data-planner]");
  if (planner) {
    const msg = $("[data-msg]", planner);
    const dateIn = planner.elements.data;
    const today = new Date(); today.setDate(today.getDate() + 1);
    dateIn.min = today.toISOString().slice(0, 10);
    planner.addEventListener("submit", (e) => {
      e.preventDefault();
      const f = planner.elements;
      const typ = f.typ.value, data = f.data.value, goscie = f.goscie.value.trim();
      if (!data) { msg.textContent = "Wybierz datę przyjęcia, żebyśmy mogli sprawdzić termin."; dateIn.focus(); return; }
      const dataPL = new Intl.DateTimeFormat("pl-PL", { day: "numeric", month: "long", year: "numeric", weekday: "long" }).format(new Date(data + "T12:00"));
      const lines = [
        "Dzień dobry,", "",
        `chcielibyśmy zapytać o wolny termin: ${typ.toLowerCase()}, ${dataPL}.`,
        goscie ? `Przewidywana liczba gości: ${goscie}.` : "",
        f.nocleg.checked ? "Potrzebujemy też noclegów dla części gości." : "",
        "", "Prosimy o kontakt.",
        f.imie.value.trim(), f.tel.value.trim() ? `tel. ${f.tel.value.trim()}` : "",
      ].filter((l, i, arr) => l !== "" || (arr[i - 1] !== "" && i > 0));
      const href = `mailto:kontakt@walek-mordarka.pl?subject=${encodeURIComponent(`Zapytanie o termin: ${typ}, ${data}`)}&body=${encodeURIComponent(lines.join("\n"))}`;
      msg.textContent = "Otwieramy Twoją pocztę z gotową wiadomością. Jeśli nic się nie otworzyło, zadzwoń: 503 175 290.";
      location.href = href;
    });
  }

  // ---------- Mapa ----------
  const mapEl = $("#map");
  if (mapEl) {
    const POS = [49.69935, 20.46027];
    const mo = new IntersectionObserver(([en]) => {
      if (!en.isIntersecting) return;
      mo.disconnect();
      const css = document.createElement("link"); css.rel = "stylesheet"; css.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"; document.head.append(css);
      const s = document.createElement("script"); s.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      s.onload = () => {
        const L = window.L;
        const map = L.map(mapEl, { scrollWheelZoom: false }).setView(POS, 14);
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' }).addTo(map);
        L.marker(POS, { title: "Dom Weselny Walek, Mordarka 514", alt: "Dom Weselny Walek, Mordarka 514", icon: L.divIcon({ className: "", html: '<div class="map-pin"><img src="img/logo.png" alt=""></div>', iconSize: [52, 52], iconAnchor: [26, 26] }) }).addTo(map);
        if (matchMedia("(pointer: coarse)").matches) map.dragging.disable();
      };
      s.onerror = () => { mapEl.innerHTML = '<p style="padding:24px">Mapa się nie wczytała. Adres: Mordarka 514, 34-600 Limanowa.</p>'; };
      document.body.append(s);
    }, { rootMargin: "400px" });
    mo.observe(mapEl);
  }

  $("[data-year]").textContent = new Date().getFullYear();
})();
