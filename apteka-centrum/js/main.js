// Apteka „Centrum” – interakcje. Godziny z aptekacentrum.com.pl (zakładka Kontakt).
(() => {
  "use strict";
  document.documentElement.classList.add("js");
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  // ---------- Godziny i status "otwarte teraz" (czas w Polsce) ----------
  // dzień tygodnia (0 = niedziela) -> [otwarcie, zamknięcie] w minutach; brak = nieczynne
  const APTEKI = {
    centrum: { 1: [450, 1200], 2: [450, 1200], 3: [450, 1200], 4: [450, 1200], 5: [450, 1200], 6: [450, 840] },
    sowliny: { 1: [480, 1140], 2: [480, 1140], 3: [480, 1140], 4: [480, 1140], 5: [480, 1140], 6: [480, 840] },
  };
  const DAYS = ["niedzielę", "poniedziałek", "wtorek", "środę", "czwartek", "piątek", "sobotę"];
  const fmt = (m) => `${Math.floor(m / 60)}:${String(m % 60).padStart(2, "0")}`;
  function nowPL() {
    const p = Object.fromEntries(new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Warsaw", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" })
      .formatToParts(new Date()).map((x) => [x.type, x.value]));
    return { day: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(p.weekday), mins: +p.hour * 60 + +p.minute };
  }
  function state(key) {
    const H = APTEKI[key], { day, mins } = nowPL(), h = H[day];
    if (h && mins >= h[0] && mins < h[1]) {
      const left = h[1] - mins;
      return { open: true, text: left <= 60 ? `Otwarte jeszcze ${left} min, do ${fmt(h[1])}` : `Otwarte teraz, do ${fmt(h[1])}` };
    }
    if (h && mins < h[0]) return { open: false, text: `Zamknięte, otwieramy dziś o ${fmt(h[0])}` };
    for (let i = 1; i <= 7; i++) {
      const d = (day + i) % 7;
      if (H[d]) return { open: false, text: `Zamknięte, otwieramy ${i === 1 ? "jutro" : "w " + DAYS[d]} o ${fmt(H[d][0])}` };
    }
  }
  function updateStatus() {
    const { day } = nowPL();
    $$("[data-status]").forEach((el) => {
      const s = state(el.dataset.status);
      el.classList.toggle("is-open", s.open);
      el.classList.toggle("is-closed", !s.open);
      $("[data-now]", el).textContent = s.text;
    });
    $$("[data-hours] tr").forEach((tr) => {
      const d = tr.dataset.days;
      tr.classList.toggle("is-today", d === String(day) || (d === "1-5" && day >= 1 && day <= 5));
    });
  }
  updateStatus();
  setInterval(updateStatus, 30000);

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
  matchMedia("(min-width: 1001px)").addEventListener("change", (e) => { if (e.matches) setDrawer(false); });
  const sentinel = document.createElement("div");
  sentinel.style.cssText = "position:absolute;top:0;height:40px;width:1px;pointer-events:none";
  document.body.prepend(sentinel);
  new IntersectionObserver(([en]) => { pastTop = !en.isIntersecting; nav.classList.toggle("is-stuck", pastTop || !drawer.hidden); }).observe(sentinel);

  // ---------- Pojawianie ----------
  const groups = new Map();
  $$(".reveal").forEach((el) => { const k = el.parentElement, i = groups.get(k) || 0; el.style.setProperty("--rd", `${Math.min(i, 5) * 70}ms`); groups.set(k, i + 1); });
  const ro = new IntersectionObserver((ents) => ents.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); ro.unobserve(en.target); } }), { rootMargin: "0px 0px -6% 0px", threshold: .08 });
  $$(".reveal, [data-tl]").forEach((el) => ro.observe(el));

  // ---------- Oferta: podświetlenie działu w pasku ----------
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

  // ---------- Mapa (dwie apteki) ----------
  const mapEl = $("#map");
  if (mapEl) {
    const PLACES = [
      { pos: [49.70676, 20.42163], name: "Apteka Centrum, Rynek 2", label: "Apteka Centrum" },
      { pos: [49.72302, 20.40370], name: "Apteka w Sowlinach, ul. W. Witosa 3", label: "Sowliny" },
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
        PLACES.forEach((p) => L.marker(p.pos, { title: p.name, alt: p.name, icon: L.divIcon({ className: "", html: '<div class="map-pin"><i class="ph ph-first-aid" aria-hidden="true"></i></div>', iconSize: [42, 42], iconAnchor: [21, 21] }) })
          .addTo(map).bindPopup(p.name).bindTooltip(p.label, { permanent: true, direction: "right", offset: [24, 0], className: "map-label" }));
        if (matchMedia("(pointer: coarse)").matches) map.dragging.disable();
      };
      s.onerror = () => { mapEl.innerHTML = '<p style="padding:24px">Mapa się nie wczytała. Apteki: Rynek 2 oraz ul. W. Witosa 3 w Limanowej.</p>'; };
      document.body.append(s);
    }, { rootMargin: "400px" });
    mo.observe(mapEl);
  }

  $("[data-year]").textContent = new Date().getFullYear();
})();
