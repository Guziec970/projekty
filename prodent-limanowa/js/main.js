// Prodent – interakcje. Godziny z prodent-kunicka.pl.
(() => {
  "use strict";
  document.documentElement.classList.add("js");
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  // ---------- Godziny i karta "Gabinet dziś" (czas w Polsce) ----------
  // [otwarcie, zamknięcie] w minutach; brak = nieczynne
  const GABINET = { 1: [480, 840], 2: [480, 840], 3: [780, 1170], 5: [780, 1170] };
  const fmt = (m) => `${Math.floor(m / 60)}:${String(m % 60).padStart(2, "0")}`;
  const DAYS = ["niedziela", "poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota"];
  function nowPL() {
    const p = Object.fromEntries(new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Warsaw", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" })
      .formatToParts(new Date()).map((x) => [x.type, x.value]));
    return { day: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(p.weekday), mins: +p.hour * 60 + +p.minute };
  }
  function nextOpen(day) {
    for (let i = 1; i <= 7; i++) { const d = (day + i) % 7; if (GABINET[d]) return { d, h: GABINET[d] }; }
  }
  function updateToday() {
    const { day, mins } = nowPL();
    const h = GABINET[day];
    const hoursEl = $("[data-today-hours]"), st = $("[data-today-status]");
    let open = false, text;
    if (h) {
      hoursEl.textContent = `${fmt(h[0])}-${fmt(h[1])}`;
      open = mins >= h[0] && mins < h[1];
      if (open) text = `Otwarte, do ${fmt(h[1])}`;
      else if (mins < h[0]) text = `Otwieramy o ${fmt(h[0])}`;
    }
    if (!h || (!open && mins >= h[1])) {
      const n = nextOpen(day);
      if (!h) hoursEl.textContent = "Dziś nieczynne";
      text = `Zapraszamy: ${n.d === (day + 1) % 7 ? "jutro" : DAYS[n.d]} od ${fmt(n.h[0])}`;
    }
    st.textContent = text;
    st.classList.toggle("is-open", open);
    $$("[data-hours] tr").forEach((tr) => tr.classList.toggle("is-today", +tr.dataset.day === day));
  }
  updateToday();
  setInterval(updateToday, 60000);

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
  sentinel.style.cssText = "position:absolute;top:0;height:40px;width:1px;pointer-events:none";
  document.body.prepend(sentinel);
  new IntersectionObserver(([en]) => { pastTop = !en.isIntersecting; nav.classList.toggle("is-stuck", pastTop || !drawer.hidden); }).observe(sentinel);

  // ---------- Pojawianie ----------
  const groups = new Map();
  $$(".reveal").forEach((el) => { const k = el.parentElement, i = groups.get(k) || 0; el.style.setProperty("--rd", `${Math.min(i, 5) * 70}ms`); groups.set(k, i + 1); });
  const ro = new IntersectionObserver((ents) => ents.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); ro.unobserve(en.target); } }), { rootMargin: "0px 0px -6% 0px", threshold: .08 });
  $$(".reveal").forEach((el) => ro.observe(el));

  // ---------- Pływający telefon: tylko gdy nie widać innego przycisku dzwonienia ----------
  const fab = $("[data-fab]"), seen = new Set();
  const fo = new IntersectionObserver((ents) => { ents.forEach((en) => { en.isIntersecting ? seen.add(en.target) : seen.delete(en.target); }); fab.classList.toggle("is-on", seen.size === 0); });
  $$('main a[href^="tel:"]').forEach((a) => fo.observe(a));

  // ---------- Mapa ----------
  const mapEl = $("#map"), POS = [49.704033, 20.423256];
  const mo = new IntersectionObserver(([en]) => {
    if (!en.isIntersecting) return;
    mo.disconnect();
    const css = document.createElement("link"); css.rel = "stylesheet"; css.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"; document.head.append(css);
    const s = document.createElement("script"); s.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    s.onload = () => {
      const L = window.L;
      const map = L.map(mapEl, { scrollWheelZoom: false }).setView(POS, 16);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' }).addTo(map);
      L.marker(POS, { title: "Prodent, ul. Ogrodowa 4", icon: L.divIcon({ className: "", html: '<div class="map-pin"><i class="ph ph-tooth" aria-hidden="true"></i></div>', iconSize: [40, 40], iconAnchor: [20, 20] }) }).addTo(map);
      if (matchMedia("(pointer: coarse)").matches) map.dragging.disable();
    };
    s.onerror = () => { mapEl.innerHTML = '<p style="padding:24px">Mapa się nie wczytała. Jesteśmy przy ul. Ogrodowej 4 w Limanowej.</p>'; };
    document.body.append(s);
  }, { rootMargin: "400px" });
  mo.observe(mapEl);

  $("[data-year]").textContent = new Date().getFullYear();
})();
