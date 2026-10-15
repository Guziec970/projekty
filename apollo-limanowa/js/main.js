// Pizzeria Apollo – interakcje strony. Bez bibliotek; Leaflet doładowywany dopiero przy mapie.
(() => {
  "use strict";
  document.documentElement.classList.add("js");

  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const plnFmt = new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN", minimumFractionDigits: 2 });
  const zl = (n) => plnFmt.format(n);

  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  // przełącznik rozmiaru (menu i paragon)
  function bindSeg(seg, onChange) {
    seg.dataset.active = "m";
    seg.addEventListener("click", (e) => {
      const b = e.target.closest("[data-size]");
      if (!b || b.getAttribute("aria-checked") === "true") return;
      $$("[data-size]", seg).forEach((x) => x.setAttribute("aria-checked", String(x === b)));
      seg.dataset.active = b.dataset.size;
      onChange(b.dataset.size);
    });
    // strzałki jak w radiogroup
    seg.addEventListener("keydown", (e) => {
      if (!["ArrowLeft", "ArrowRight"].includes(e.key)) return;
      const other = $$("[data-size]", seg).find((x) => x.getAttribute("aria-checked") !== "true");
      other.click(); other.focus(); e.preventDefault();
    });
  }

  // ---------- Menu (ceny z dotychczasowej strony apollolimanowa.pl) ----------
  if (document.querySelector("[data-menu-list]")) {
  // tagi: klasyczne, kurczak, mieso, ryba, wege, ostre, cienkie
  const MENU = [
    [1, "Margherita", "ser, oregano", 24.5, 47.5, "klasyczne wege"],
    [2, "Funghi", "ser, pieczarki, kukurydza, papryka, oregano", 25.5, 48.5, "klasyczne wege"],
    [3, "Salami", "ser, salami, cebula, oregano", 27, 54.5, "mieso"],
    [4, "Vesuvio", "ser, szynka, oregano", 25.5, 51.5, "klasyczne mieso"],
    [5, "Rustica", "ser, bekon, oregano", 25.5, 52.5, "klasyczne mieso"],
    [6, "Pesciatore", "ser, tuńczyk, pieczarki, cebula, oregano", 26.5, 53.5, "ryba"],
    [7, "Wiejska", "ser, kiełbasa, cebula, ogórek kiszony, oregano", 26, 53.5, "mieso"],
    [8, "Capricciosa", "ser, pieczarki, szynka, papryka, oregano", 25.5, 53.5, "klasyczne mieso"],
    [9, "Rimini", "ser, pieczarki, bekon, cebula, oregano", 27, 53.5, "mieso"],
    [10, "Di Pollo", "ser, kurczak, kukurydza, oliwki, curry, oregano", 27, 55.5, "kurczak"],
    [11, "Peperoni", "ser, salami, papryka, peperoni, tabasco, oregano", 27, 54.5, "mieso ostre"],
    [12, "Hawajska", "ser, szynka, brzoskwinie, ananas, oregano", 26.5, 52.5, "klasyczne mieso"],
    [13, "Amore", "ser, kurczak, ananas, kukurydza, oregano", 27, 55.5, "kurczak"],
    [14, "Donatello", "ser, pieczarki, szynka, kukurydza, pomidor, oregano", 26, 53.5, "mieso"],
    [15, "Dracula", "ser, pieczarki, szynka, salami, bekon, papryka, tabasco, oregano", 27, 55.5, "mieso ostre"],
    [16, "Quatro", "ser, szynka, bekon, salami, tuńczyk, oregano", 27, 55.5, "mieso ryba"],
    [17, "Quatro Wega", "ser, pieczarki, kukurydza, pomidor, papryka, oregano", 26, 52.5, "wege"],
    [18, "Princessa", "ser, pieczarki, kurczak, kukurydza, ogórek kiszony, oregano", 27, 55.5, "kurczak"],
    [19, "Venezia", "ser, salami, pomidor, kurczak, oliwki, oregano", 27, 55.5, "kurczak mieso"],
    [20, "Rafaello", "ser, pieczarki, szynka, kurczak, oregano", 27, 55.5, "kurczak mieso"],
    [21, "Diego", "ser, pieczarki, kurczak, oregano", 26.5, 54.5, "kurczak"],
    [22, "La Bella", "ser, bekon, kukurydza, pomidor, salami, oregano", 27, 54.5, "mieso"],
    [23, "Primavera", "ser, pieczarki, bekon, tuńczyk, kukurydza, oregano", 27, 54.5, "mieso ryba"],
    [24, "Staniero", "ser, kiełbasa, kurczak, pieczarki, oregano", 27, 54.5, "kurczak mieso"],
    [25, "Frutti di Mare", "ser, owoce morza, cebula, oliwki, oregano", 27, 54.5, "ryba"],
    [26, "Classic", "ser, pieczarki, oregano", 25, 49.5, "klasyczne wege"],
    [27, "Własnej kompozycji", "3 rodzaje warzyw i 3 rodzaje wędlin do wyboru", 32, 60, ""],
    [28, "Vegetariana", "mozzarella, brokuły, pomidor, kukurydza, ser feta, rukola", 27.5, 53.5, "wege"],
    [29, "Napoli", "mozzarella, szynka parmeńska, brokuły, rukola", 28, 56.5, "mieso"],
    [30, "Parma", "mozzarella, szynka parmeńska, rukola", 27, null, "cienkie mieso"],
    [31, "Broccoli", "mozzarella, brokuły, kukurydza, pomidor, ser feta, rukola", 24.5, null, "cienkie wege"],
    [32, "Roma", "mozzarella, szynka parmeńska, oliwki, pomidor", 27, null, "cienkie mieso"],
    [33, "Focaccia", "mozzarella, bekon, salami, brokuły, ser feta", 25.5, null, "cienkie mieso"],
    [34, "Siciliana", "mozzarella, kurczak, brokuły, kukurydza", 26, null, "cienkie kurczak"],
  ].map(([no, name, desc, m, xl, tags, link]) => ({ no, name, desc, m, xl, tags: tags.split(" ").filter(Boolean), link }));

  const list = $("[data-menu-list]");
  const count = $("[data-menu-count]");
  const empty = $("[data-menu-empty]");
  const search = $("#menu-search");
  const state = { filter: "all", q: "", size: "m" };

  const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ł/g, "l");

  function highlight(text, q) {
    if (!q) return esc(text);
    const i = norm(text).indexOf(q);
    if (i < 0) return esc(text);
    return esc(text.slice(0, i)) + "<mark>" + esc(text.slice(i, i + q.length)) + "</mark>" + esc(text.slice(i + q.length));
  }

  function priceHtml(d) {
    if (state.size === "xl" && d.xl == null) return `${zl(d.m)}<small>tylko 30 cm</small>`;
    return state.size === "xl" ? zl(d.xl) : zl(d.m);
  }

  function renderMenu() {
    const q = norm(state.q.trim());
    const items = MENU.filter((d) =>
      (state.filter === "all" || d.tags.includes(state.filter)) &&
      (!q || norm(d.name + " " + d.desc).includes(q)));

    list.innerHTML = items.map((d, i) => {
      const icons =
        (d.tags.includes("ostre") ? '<i class="ph-fill ph-pepper" role="img" aria-label="ostra"></i>' : "") +
        (d.tags.includes("wege") ? '<i class="ph-fill ph-leaf" role="img" aria-label="wegetariańska"></i>' : "") +
        (d.tags.includes("cienkie") ? '<span class="dish__new">Cienkie ciasto</span>' : "");
      const name = d.link ? `<a href="${d.link}">${highlight(d.name, q)}</a>` : highlight(d.name, q);
      return `<li class="dish" style="--i:${Math.min(i, 18)}">
        <span class="dish__no">${d.no}.</span>
        <span class="dish__name">${name}${icons}</span>
        <span class="dish__price"><span class="price-swap">${priceHtml(d)}</span></span>
        <p class="dish__desc">sos pomidorowy, ${highlight(d.desc, q)}</p>
      </li>`;
    }).join("");

    count.textContent = items.length === MENU.length ? `${MENU.length} pizze w menu` : `Pokazuję ${items.length} z ${MENU.length}`;
    empty.hidden = items.length > 0;
    count.hidden = items.length === 0;
  }

  $("[data-filters]").addEventListener("click", (e) => {
    const chip = e.target.closest("[data-filter]");
    if (!chip) return;
    $$("[data-filter]").forEach((c) => { c.classList.toggle("is-on", c === chip); c.setAttribute("aria-pressed", String(c === chip)); });
    state.filter = chip.dataset.filter;
    renderMenu();
  });

  let searchTimer;
  search.addEventListener("input", () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => { state.q = search.value; renderMenu(); }, 120);
  });

  $("[data-menu-reset]").addEventListener("click", () => {
    search.value = ""; state.q = ""; state.filter = "all";
    $$("[data-filter]").forEach((c) => { const on = c.dataset.filter === "all"; c.classList.toggle("is-on", on); c.setAttribute("aria-pressed", String(on)); });
    renderMenu();
    search.focus();
  });

  bindSeg($("[data-size-switch]"), (size) => { state.size = size; renderMenu(); });

  renderMenu();
  }

  // ---------- Godziny i status "otwarte" (czas w Polsce) ----------
  const HOURS = { 0: [10, 22], 1: [9, 22], 2: [9, 22], 3: [9, 22], 4: [9, 22], 5: [9, 22], 6: [9, 23] };
  function warsawNow() {
    const p = Object.fromEntries(new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Warsaw", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23",
    }).formatToParts(new Date()).map((x) => [x.type, x.value]));
    const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(p.weekday);
    return { day, mins: +p.hour * 60 + +p.minute };
  }
  function updateStatus() {
    const { day, mins } = warsawNow();
    const [o, c] = HOURS[day];
    const open = mins >= o * 60 && mins < c * 60;
    let text;
    if (open) text = `Otwarte do ${c}:00`;
    else if (mins < o * 60) text = `Zamknięte, otwieramy o ${o}:00`;
    else text = `Zamknięte, jutro od ${HOURS[(day + 1) % 7][0]}:00`;
    $$("[data-open-status]").forEach((el) => { el.hidden = false; el.textContent = text; el.classList.toggle("is-open", open); });
    $$(".hours tr").forEach((tr) => tr.classList.toggle("is-today", tr.dataset.days.split(",").includes(String(day))));
  }
  updateStatus();
  setInterval(updateStatus, 60_000);

  // ---------- Nawigacja ----------
  const nav = $("#nav");
  const burger = $(".nav__burger");
  const drawer = $("#drawer");
  function setDrawer(open) {
    drawer.hidden = !open;
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Zamknij menu" : "Otwórz menu");
    burger.innerHTML = open ? '<i class="ph ph-x"></i>' : '<i class="ph ph-list"></i>';
    document.body.style.overflow = open ? "hidden" : "";
    nav.classList.toggle("is-stuck", open || scrolledPastTop);
    if (open) $("a", drawer).focus({ preventScroll: true });
  }
  burger.addEventListener("click", () => setDrawer(drawer.hidden));
  drawer.addEventListener("click", (e) => { if (e.target.closest("a")) setDrawer(false); });
  addEventListener("keydown", (e) => { if (e.key === "Escape" && !drawer.hidden) { setDrawer(false); burger.focus(); } });
  matchMedia("(min-width: 1081px)").addEventListener("change", (e) => { if (e.matches) setDrawer(false); });

  // tło nawigacji po zjechaniu z góry (obserwator zamiast nasłuchu scroll)
  let scrolledPastTop = false;
  const sentinel = document.createElement("div");
  sentinel.style.cssText = "position:absolute;top:0;height:24px;width:1px;pointer-events:none";
  document.body.prepend(sentinel);
  new IntersectionObserver(([en]) => {
    scrolledPastTop = !en.isIntersecting;
    nav.classList.toggle("is-stuck", scrolledPastTop || !drawer.hidden);
  }).observe(sentinel);

  // pasek "Zadzwoń" na komórce, gdy przycisk z hero zniknie z ekranu (i nie przy kontakcie)
  const callbar = $("[data-callbar]");
  const visibleCalls = new Set();
  const cbObs = new IntersectionObserver((entries) => {
    entries.forEach((en) => { en.isIntersecting ? visibleCalls.add(en.target) : visibleCalls.delete(en.target); });
    callbar.classList.toggle("is-on", visibleCalls.size === 0);
  });
  $$('main a[href^="tel:"]').forEach((a) => cbObs.observe(a));

  // ---------- Pasek z nazwami: podwojenie treści dla płynnej pętli ----------
  if (document.querySelector(".marquee__track")) {
  const track = $(".marquee__track");
  track.innerHTML += track.innerHTML;
  }

  // ---------- Pojawianie się sekcji ----------
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.classList.add("is-in");
      revealObs.unobserve(en.target);
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
  // kaskada dla elementów obok siebie
  $$(".bento .tile, .facts > div, .about__img").forEach((el, i, arr) => {
    const siblings = arr.filter((x) => x.parentElement === el.parentElement);
    el.style.setProperty("--rd", siblings.indexOf(el) * 90 + "ms");
  });
  $$(".reveal").forEach((el) => revealObs.observe(el));

  // ---------- Liczniki w "O nas" ----------
  const countObs = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      countObs.unobserve(en.target);
      const el = en.target;
      const to = +el.dataset.countTo;
      const from = +(el.dataset.countFrom || 0);
      if (reduceMotion) return;
      const t0 = performance.now(), dur = 1400;
      const step = (t) => {
        const k = Math.min(1, (t - t0) / dur);
        const eased = 1 - Math.pow(1 - k, 4);
        el.textContent = Math.round(from + (to - from) * eased);
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }, { threshold: 0.6 });
  $$("[data-count-to]").forEach((el) => countObs.observe(el));

  // ---------- Magnetyczny przycisk w hero (tylko mysz) ----------
  if (!reduceMotion && matchMedia("(hover: hover) and (pointer: fine)").matches) {
    $$(".magnetic").forEach((btn) => {
      btn.addEventListener("pointermove", (e) => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.25;
        const y = (e.clientY - r.top - r.height / 2) * 0.35;
        btn.style.transform = `translate(${x}px, ${y}px)`;
      });
      btn.addEventListener("pointerleave", () => { btn.style.transform = ""; });
    });
  }

  // ---------- Mapa ze strefą dowozu (Leaflet ładowany leniwie) ----------
  if (document.querySelector("#map")) {
  const mapEl = $("#map");
  const PIZZERIA = [49.705681, 20.421224];
  function loadMap() {
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.append(css);
    const js = document.createElement("script");
    js.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    js.onload = () => {
      const L = window.L;
      const map = L.map(mapEl, { scrollWheelZoom: false, zoomControl: true, attributionControl: true });
      // widok trzeba ustawić przed dodaniem warstw – okrąg liczy granice dopiero na zainicjowanej mapie
      map.fitBounds(L.latLng(PIZZERIA).toBounds(6000), { padding: [16, 16] });
      // kafelki OpenStreetMap (bez klucza API); ciemny wygląd nadaje filtr w CSS (.map__canvas .leaflet-tile-pane)
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);
      L.circle(PIZZERIA, { radius: 3000, color: "#ff6b4a", weight: 2, fillColor: "#d23c20", fillOpacity: 0.12, dashArray: "6 8" }).addTo(map);
      L.marker(PIZZERIA, {
        icon: L.divIcon({ className: "", html: '<div class="map-pin"><i class="ph-fill ph-pizza"></i></div>', iconSize: [46, 46], iconAnchor: [23, 23] }),
        title: "Pizzeria Apollo, Rynek 19",
      }).addTo(map);
      // dwuklik / przeciąganie na telefonie bez blokowania przewijania strony
      if (matchMedia("(pointer: coarse)").matches) map.dragging.disable();
    };
    js.onerror = () => {
      mapEl.innerHTML = '<p style="padding:24px;color:var(--muted)">Nie udało się wczytać mapy. Jesteśmy na Rynku 19 w Limanowej.</p>';
    };
    document.body.append(js);
  }
  const mapObs = new IntersectionObserver(([en]) => {
    if (en.isIntersecting) { mapObs.disconnect(); loadMap(); }
  }, { rootMargin: "400px" });
  mapObs.observe(mapEl);
  }

  $("[data-year]").textContent = new Date().getFullYear();
})();
