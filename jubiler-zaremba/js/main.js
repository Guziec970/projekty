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

  // ---------- Galeria kategorii (zdjęcia ze starej strony mzjubiler.pl) ----------
  // [numer pliku, szerokość, wysokość]; pliki: img/galeria/<litera><numer>.webp
  const FILES = {"b":[[1,520,390],[2,520,390],[3,520,390],[4,520,390],[5,520,390],[6,520,390],[7,520,390],[8,520,390],[9,520,390],[10,520,390],[11,520,390],[12,520,390],[13,520,390],[14,520,390],[15,520,390],[16,520,390],[17,520,348],[18,520,390],[19,520,390],[20,520,390],[21,520,390],[22,520,390],[23,520,390],[24,520,348],[25,520,390],[26,520,390],[27,520,390],[28,520,390],[29,520,390],[30,520,390],[31,520,390],[32,520,390],[33,520,390],[34,520,390],[35,520,390],[36,520,390]],"i":[[1,390,520],[2,520,390],[3,520,390],[4,520,390],[5,520,390],[6,520,390],[7,520,390],[8,520,390],[9,520,390],[10,520,390]],"k":[[1,520,390],[2,520,390],[3,520,390],[4,520,390],[5,520,390],[6,520,390],[7,520,390],[8,520,390],[9,520,390],[10,520,390],[11,520,390],[12,520,390],[13,520,390],[14,520,390],[15,520,348],[16,520,348],[17,520,390],[18,520,390],[19,520,390],[20,520,390],[21,520,390],[22,520,390],[23,520,390],[24,520,390],[25,520,390],[26,520,390],[27,520,390],[28,520,390],[29,520,390],[30,520,390],[31,520,390],[32,520,390],[33,520,390],[34,520,390],[35,520,390],[36,520,390],[37,520,390],[38,520,390],[39,390,520],[40,520,390]],"n":[[1,520,390],[2,520,390],[3,520,390],[4,520,390],[5,520,390],[6,520,390],[9,520,390]],"o":[[1,520,390],[2,520,390],[3,520,390],[4,520,390],[5,520,390],[6,520,390],[7,520,390],[8,520,390],[9,520,390],[10,520,390],[11,520,390],[12,520,390],[13,520,390],[14,520,390],[15,520,390],[16,520,390],[17,520,390],[18,520,390],[19,520,390],[20,520,390],[21,520,390],[22,520,390],[23,520,390],[24,520,390],[25,520,390],[26,520,390],[27,520,390],[28,520,390],[29,520,390],[30,520,390],[31,520,390],[32,520,390],[33,520,390],[34,520,390],[35,520,390],[36,520,390],[37,520,390],[38,520,390],[39,520,390],[40,520,390],[41,520,390],[42,520,390],[43,520,390],[44,520,390],[45,520,390],[46,520,390],[47,520,390],[48,520,390],[49,520,390],[50,520,390],[51,520,390],[52,520,390],[53,520,390],[54,520,390],[55,520,390],[56,520,390],[57,520,390],[58,520,390],[59,520,390],[60,520,390],[61,520,390],[62,520,390],[63,520,390],[64,520,390],[65,520,390],[66,520,390],[67,520,390],[68,520,390],[69,520,390],[70,520,390]],"p":[[1,520,390],[2,520,390],[3,520,390],[4,520,390],[5,520,390],[6,520,390],[7,520,390],[8,520,390],[9,520,390],[10,520,390],[11,520,390],[12,520,390],[13,520,390],[14,520,390],[15,520,390],[16,520,390],[17,520,390],[18,520,390],[19,520,390],[20,520,390],[21,520,390],[22,520,390],[23,520,390],[24,520,390],[25,520,390],[26,520,390],[27,520,390],[28,520,390],[29,520,390],[30,520,390],[31,520,390],[32,520,390],[33,520,390],[34,520,390],[35,520,390],[36,520,390],[37,520,390],[38,520,390],[39,520,390],[40,520,390],[41,520,390],[42,520,390],[43,520,390],[44,520,390],[45,520,390],[46,520,390],[47,520,390],[48,520,390],[49,520,390],[50,520,390],[51,520,390],[52,520,390],[53,520,390],[54,520,390],[55,520,390],[56,520,390],[57,520,390],[58,520,390],[59,520,390],[60,520,390],[61,520,390],[62,520,390],[63,520,390],[64,520,390],[65,520,390],[66,520,390],[67,520,390],[68,520,390],[69,520,390],[70,520,390]],"w":[[1,520,390],[2,520,390],[3,520,390],[4,520,390],[5,520,390],[6,520,390],[7,520,390],[8,520,390],[9,520,390],[10,520,390],[11,520,390],[12,520,390],[13,520,390],[14,520,390],[15,520,390],[16,520,390],[17,520,390],[18,520,390],[19,520,390],[20,520,390],[21,520,390],[22,520,390],[23,520,390],[24,520,390],[25,520,390],[26,520,390],[27,520,390],[28,520,390],[29,520,390],[30,520,390],[31,520,390],[32,390,520],[33,520,390],[34,390,520]]};
  const CATS = {
    obraczki: { key: "o", name: "Obrączki" },
    pierscionki: { key: "p", name: "Pierścionki" },
    kolczyki: { key: "k", name: "Kolczyki" },
    wisiorki: { key: "w", name: "Wisiorki" },
    bransolety: { key: "b", name: "Bransolety" },
    inne: { key: "i", name: "Inne wyroby" },
    salony: { key: "n", name: "Nasze salony" },
  };
  const plural = (n) => (n === 1 ? "zdjęcie" : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14) ? "zdjęcia" : "zdjęć");
  const dlg = $("[data-gallery]");
  const grid = $("[data-gallery-grid]");
  const tabs = $("[data-gallery-tabs]");
  const lb = $("[data-lightbox]"), lbImg = $("[data-lb-img]"), lbCap = $("[data-lb-cap]");
  let current = null, idx = 0, lastFocus = null;
  let openedInPage = false; // galeria otwarta kliknięciem na stronie (a nie z bezpośredniego linku)
  tabs.innerHTML = Object.entries(CATS).map(([slug, c]) => `<a href="#galeria-${slug}" data-slug="${slug}">${c.name}</a>`).join("");

  function openGallery(slug) {
    const c = CATS[slug];
    if (!c) return;
    current = slug;
    const list = FILES[c.key];
    $("[data-gallery-title]").textContent = c.name;
    $("[data-gallery-count]").textContent = `${list.length} ${plural(list.length)} z naszych salonów`;
    $$("a", tabs).forEach((a) => { if (a.dataset.slug === slug) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current"); });
    grid.innerHTML = list.map(([n, w, h], i) => `<li style="--i:${Math.min(i, 24)}"><button type="button" data-i="${i}" aria-label="${c.name}, zdjęcie ${i + 1} z ${list.length}"><img src="img/galeria/${c.key}${n}.webp" alt="" width="${w}" height="${h}" loading="${i < 12 ? "eager" : "lazy"}"></button></li>`).join("");
    if (!dlg.open) { lastFocus = document.activeElement; dlg.showModal(); document.body.style.overflow = "hidden"; }
    dlg.scrollTop = 0;
    dlg.style.setProperty("--gal-head", $(".gallery__head").offsetHeight + "px");
    $(`a[data-slug="${slug}"]`, tabs).scrollIntoView({ block: "nearest", inline: "center" });
  }
  function closeGallery() {
    closeLightbox();
    if (dlg.open) dlg.close();
    document.body.style.overflow = "";
    current = null;
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  }
  function showLightbox(i) {
    const c = CATS[current], list = FILES[c.key];
    idx = (i + list.length) % list.length;
    const [n, w, h] = list[idx];
    lbImg.src = `img/galeria/${c.key}${n}.webp`; lbImg.width = w; lbImg.height = h;
    lbImg.alt = `${c.name}, zdjęcie ${idx + 1}`;
    lbCap.textContent = `${c.name} ${idx + 1} / ${list.length}`;
    lbImg.style.animation = "none"; void lbImg.offsetWidth; lbImg.style.animation = "";
    if (lb.hidden) { lb.hidden = false; $("[data-lb-close]").focus(); }
  }
  function closeLightbox() {
    if (lb.hidden) return;
    lb.hidden = true;
    const b = $(`button[data-i="${idx}"]`, grid); if (b) b.focus();
  }
  function route() {
    const m = location.hash.match(/^#galeria-([a-z]+)$/);
    if (m && CATS[m[1]]) openGallery(m[1]);
    else if (dlg.open) closeGallery();
  }
  addEventListener("hashchange", () => { if (!dlg.open) openedInPage = true; route(); });
  route();
  function leaveGallery() {
    if (openedInPage) history.back();
    else { history.replaceState(null, "", location.pathname + location.search + "#kolekcje"); closeGallery(); }
  }

  grid.addEventListener("click", (e) => { const b = e.target.closest("button[data-i]"); if (b) showLightbox(+b.dataset.i); });
  $("[data-gallery-close]").addEventListener("click", leaveGallery);
  // zmiana kategorii w otwartej galerii podmienia adres zamiast dokładać wpis do historii
  tabs.addEventListener("click", (e) => {
    const a = e.target.closest("a[data-slug]");
    if (!a) return;
    e.preventDefault();
    history.replaceState(null, "", "#galeria-" + a.dataset.slug);
    openGallery(a.dataset.slug);
  });
  dlg.addEventListener("cancel", (e) => {
    e.preventDefault();
    if (!lb.hidden) closeLightbox(); else leaveGallery();
  });
  dlg.addEventListener("close", () => { document.body.style.overflow = ""; openedInPage = false; });
  $("[data-lb-close]").addEventListener("click", closeLightbox);
  $("[data-lb-prev]").addEventListener("click", () => showLightbox(idx - 1));
  $("[data-lb-next]").addEventListener("click", () => showLightbox(idx + 1));
  lb.addEventListener("click", (e) => { if (e.target === lb) closeLightbox(); });
  dlg.addEventListener("keydown", (e) => {
    if (lb.hidden) return;
    if (e.key === "ArrowRight") { showLightbox(idx + 1); e.preventDefault(); }
    if (e.key === "ArrowLeft") { showLightbox(idx - 1); e.preventDefault(); }
  });
  // przesuwanie palcem w powiększeniu
  let tx = null;
  lb.addEventListener("touchstart", (e) => { tx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", (e) => {
    if (tx === null) return;
    const dx = e.changedTouches[0].clientX - tx; tx = null;
    if (Math.abs(dx) > 50) showLightbox(idx + (dx < 0 ? 1 : -1));
  });

  $("[data-year]").textContent = new Date().getFullYear();
})();
