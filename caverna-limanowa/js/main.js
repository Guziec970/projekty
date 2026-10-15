// Caverna – interakcje. Treści (menu, ceny, danie dnia) przepisane z caverna.pl.
(() => {
  "use strict";
  document.documentElement.classList.add("js");
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const pln = new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN", minimumFractionDigits: 2 });
  const zl = (n) => pln.format(n);

  // ---------- Pizza ----------
  if (document.querySelector("[data-pizzas]")) {
  const PIZZE = [
    ["Małgosia", "oregano", 32, 35], ["Kasia", "szynka, pieczarki", 34, 37],
    ["Marysia", "ananas, kurczak", 35, 40], ["Malwina", "szynka, pieczarki, groszek, kukurydza", 37, 41],
    ["Karolina", "salami, kabanos, papryka konserwowa", 39, 43], ["Jowita", "szynka, kabanos, kiełbasa, papryka, cebula", 43, 46],
    ["Zosia", "tuńczyk, oliwki, cebula", 41, 45], ["Rafał", "kiełbasa wiejska, ogórek kiszony, cebula", 41, 45],
    ["Roma", "brokuły, ser feta, czosnek", 41, 45], ["Michał", "bazylia, pomidory, mozzarella, kukurydza", 41, 46],
    ["Wojtek", "boczek, kurczak, pieczarki, cebula", 41, 46], ["Anka", "ser pleśniowy, mozzarella, ser wędzony", 40, 45],
    ["Regina", "szpinak, rukola, pomidory, bekon, czosnek, feta", 46, 50], ["Alicja", "własna kompozycja: 5 składników do wyboru", 46, 50, true],
    ["Kuba", "papryka, feta, oliwki, szpinak, cebula", 47, 50], ["Marcin", "salami, cebulka prażona, polędwiczki, kabanos", 47, 50],
    ["Monika", "boczek, rukola, konfitura z czerwonej cebuli, camembert z zielonym pieprzem", 47, 50],
  ];
  const pizzaList = $("[data-pizzas]");
  let size = "m";
  let query = "";
  const norm = (t) => t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ł/g, "l");
  function renderPizzas(animatePrice) {
    const q = norm(query.trim());
    const trafione = PIZZE.map((p, i) => [p, i]).filter(([[name, desc]]) => !q || norm(name + " " + desc).includes(q));
    pizzaList.innerHTML = trafione.map(([[name, desc, m, l, own], i], k) => `
      <li class="pz reveal is-in${own ? " pz--own" : ""}" style="--rd:${(k % 3) * 70}ms">
        <span class="pz__no">${i + 1}</span>
        <h3 class="pz__name" translate="no">${name}</h3>
        <p class="pz__desc">${own ? desc : "sos pomidorowy, ser, " + desc}</p>
        <p class="pz__price"><span class="${animatePrice ? "price-swap" : ""}">${zl(size === "l" ? l : m)}</span><small>${size === "l" ? "36 cm" : "30 cm"}</small></p>
      </li>`).join("");
    return trafione.length;
  }
  renderPizzas(false);
  $$(".pz", pizzaList).forEach((el) => el.classList.remove("is-in")); // pierwsze wejście animuje obserwator

  const szukaj = $("[data-menu-search]");
  if (szukaj) {
    const info = $("[data-search-info]");
    let timer;
    const szukajTeraz = () => {
      query = szukaj.value;
      const ilePizz = renderPizzas(false);
      $$(".pz", pizzaList).forEach((el) => el.classList.add("is-in"));
      document.dispatchEvent(new CustomEvent("menu:szukaj", { detail: { q: query } }));
      const dania = Number(document.body.dataset.wynikDania || 0);
      if (!query.trim()) { info.hidden = true; return; }
      const razem = ilePizz + dania;
      info.hidden = false;
      info.textContent = razem
        ? `Znaleziono ${razem} ${razem === 1 ? "pozycję" : razem < 5 ? "pozycje" : "pozycji"}: ${ilePizz} w pizzach, ${dania} w kuchni.`
        : "Nic nie znaleziono. Spróbuj innego słowa, np. kurczak albo zupa.";
    };
    szukaj.addEventListener("input", () => { clearTimeout(timer); timer = setTimeout(szukajTeraz, 120); });
    szukaj.addEventListener("search", szukajTeraz);
  }

  const seg = $("[data-size-switch]");
  seg.dataset.active = "m";
  seg.addEventListener("click", (e) => {
    const b = e.target.closest("[data-size]");
    if (!b || b.dataset.size === size) return;
    size = b.dataset.size;
    seg.dataset.active = size;
    $$("[data-size]", seg).forEach((x) => x.setAttribute("aria-checked", String(x === b)));
    renderPizzas(true);
  });
  seg.addEventListener("keydown", (e) => {
    if (!["ArrowLeft", "ArrowRight"].includes(e.key)) return;
    const other = $$("[data-size]", seg).find((x) => x.dataset.size !== size);
    other.click(); other.focus(); e.preventDefault();
  });
  }

  // ---------- Kuchnia ----------
  if (document.querySelector("[data-tabs]")) {
  const KUCHNIA = {
    "Dania mięsne": [
      ["Polędwica Chateaubriand", "z łódeczkami i grillowanymi warzywami", "300 g", 139],
      ["Talerz mięs z grilla", "polędwiczka wieprzowa, polędwica wołowa, filet z kurczaka, ziemniaczki w ziołach, sałatka grecka", "300 g", 75],
      ["Trzy mięsa w salsie", "polędwiczka wieprzowa, polędwica wołowa, filet z kurczaka, ziemniaczki jak z ogniska, mix sałat", "300 g", 75],
      ["Grillowana polędwiczka na ragout grzybowym", "z ziemniakami i mixem sałat", "200 g", 59],
      ["Żeberka BBQ", "z frytkami i sałatką ze świeżych warzyw", "300 g", 47],
      ["Gyros drobiowy", "frytki, sałatka grecka, sos tysiąca wysp, sos czosnkowy, pita", "300 g", 47],
      ["Placek po zbójnicku", "placek ziemniaczany, gulasz wołowy, zestaw surówek", "300 g", 47],
      ["Roladka drobiowa z serem", "z frytkami i zestawem surówek", "200 g", 45],
      ["Schabowy", "z ziemniakami i kapustą zasmażaną", "200 g", 45],
      ["Kotlet drobiowy", "z frytkami i zestawem surówek", "200 g", 45],
    ],
    "Ryby": [
      ["Dorsz w zielonej panierce", "placuszki z cukinii, sos tzatziki, sałata", "400 g", 69],
      ["Sandacz w sosie cytrynowo-maślanym", "ryż curry i zielone warzywa", "400 g", 66],
      ["Grillowany łosoś z mango", "ryż i sałata z sosem vinaigrette", "300 g", 62],
      ["Filet z morszczuka w panierce", "z frytkami i zestawem surówek", "300 g", 40],
    ],
    "Zupy": [
      ["Żur limanowski na zakwasie", "", "350 ml", 25], ["Krem pomidorowy z pieczoną papryką", "", "350 ml", 25],
      ["Barszcz z uszkami", "", "350 ml", 22], ["Rosół z makaronem", "", "350 ml", 19], ["Strogonow + pita", "", "350 ml", 39],
    ],
    "Burgery": [
      ["Burger Szefa + frytki", "wołowina 200 g, bekon, jajko sadzone, cheddar, gouda, sałata, rukola, pomidor, pikle, cebula, sosy", "300 g", 56],
      ["Burger Classic + frytki", "wołowina 200 g, bekon, cheddar, sałata, pomidor, pikle, cebula, sos tysiąca wysp, sos deli", "250 g", 49],
      ["Kurczak Burger + frytki", "polędwiczka z kurczaka, bekon, sałata, pomidor, ogórek, cebula, sosy", "200 g", 49],
    ],
    "Makarony": [
      ["Pappardelle z polędwiczkami w borowikach", "", "500 g", 45], ["Tagliatelle z łososiem", "", "500 g", 45],
      ["Tagliatelle z boczkiem, cukinią i parmezanem", "", "500 g", 40], ["Penne z zielonym pesto i mozzarellą", "", "500 g", 40],
    ],
    "Sałatki": [
      ["Art-Deco", "rukola, pomidor koktajlowy, tuńczyk, jajko, kukurydza, ogórek, sosy, pita", "400 g", 40],
      ["Z grillowanym kurczakiem", "sałata, pomidor, papryka, kukurydza, cebula, oliwki, sosy, pita", "400 g", 40],
      ["Grecka", "sałata, ogórek, pomidor, papryka, feta, oliwki, vinaigrette, pita", "350 g", 35],
    ],
    "Dla dzieci": [
      ["Naleśniki", "z serem, dżemem albo nutellą, podane z owocami", "200 g", 32],
      ["Nuggetsy z kurczaka", "", "200 g", 28],
    ],
    "To i owo": [
      ["Quesadilla z kurczakiem", "tortilla, cheddar, kurczak, kukurydza, papryka, sos tysiąca wysp", "350 g", 42],
      ["Wrap z nuggetsami", "", "250 g", 29],
      ["Pierogi ruskie", "", "11 szt.", 27], ["Pierogi z mięsem", "", "11 szt.", 27],
      ["Pierogi z truskawkami lub serem", "", "11 szt.", 27],
    ],
  };
  const tabs = $("[data-tabs]");
  const dishes = $("[data-dishes]");
  const cats = Object.keys(KUCHNIA);
  tabs.innerHTML = cats.map((c, i) => `<button type="button" class="tab" role="tab" id="tab-${i}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" aria-controls="dishes">${c}</button>`).join("");
  dishes.id = "dishes";
  let aktywnaKat = 0;
  function showCat(i, focus) {
    $$(".tab", tabs).forEach((t, j) => { t.setAttribute("aria-selected", String(i === j)); t.tabIndex = i === j ? 0 : -1; });
    dishes.setAttribute("aria-labelledby", `tab-${i}`);
    dishes.innerHTML = KUCHNIA[cats[i]].map(([n, d, w, p], k) => `
      <article class="dish" style="--i:${k}">
        <h3>${n} <span class="dish__w">${w}</span></h3>
        <span class="dish__price">${zl(p)}</span>
        ${d ? `<p class="dish__desc">${d}</p>` : ""}
      </article>`).join("");
    const t = $$(".tab", tabs)[i];
    if (focus) t.focus();
    t.scrollIntoView({ block: "nearest", inline: "nearest", behavior: reduceMotion ? "auto" : "smooth" });
  }
  tabs.addEventListener("click", (e) => { const t = e.target.closest(".tab"); if (t) { aktywnaKat = $$(".tab", tabs).indexOf(t); showCat(aktywnaKat); } });
  tabs.addEventListener("keydown", (e) => {
    const i = $$(".tab", tabs).findIndex((t) => t.getAttribute("aria-selected") === "true");
    if (e.key === "ArrowRight") { showCat((i + 1) % cats.length, true); e.preventDefault(); }
    if (e.key === "ArrowLeft") { showCat((i - 1 + cats.length) % cats.length, true); e.preventDefault(); }
  });
  dishes.innerHTML = ""; // wypełniamy po wejściu sekcji w widok, żeby animacja była widoczna

  const kitchenObs = new IntersectionObserver(([en]) => { if (en.isIntersecting) { kitchenObs.disconnect(); showCat(0); } }, { threshold: .2 });
  kitchenObs.observe($("#kuchnia"));

  const normK = (t) => t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ł/g, "l");
  document.addEventListener("menu:szukaj", (e) => {
    const q = normK((e.detail.q || "").trim());
    kitchenObs.disconnect();
    if (!q) {
      tabs.hidden = false;
      document.body.dataset.wynikDania = "0";
      showCat(aktywnaKat);
      return;
    }
    tabs.hidden = true;
    const trafione = [];
    cats.forEach((c) => KUCHNIA[c].forEach(([n, d, w, p]) => {
      if (normK(n + " " + (d || "")).includes(q)) trafione.push([c, n, d, w, p]);
    }));
    document.body.dataset.wynikDania = String(trafione.length);
    dishes.removeAttribute("aria-labelledby");
    dishes.innerHTML = trafione.map(([c, n, d, w, p], k) => `
      <article class="dish is-in" style="--i:${k}">
        <span class="dish__cat">${c}</span>
        <h3>${n} <span class="dish__w">${w}</span></h3>
        <span class="dish__price">${zl(p)}</span>
        ${d ? `<p class="dish__desc">${d}</p>` : ""}
      </article>`).join("") || '<p class="menu-empty">Brak dań pasujących do wyszukiwania.</p>';
  });
  }

  // ---------- Godziny i status "otwarte" (czas w Polsce) ----------
  if (document.querySelector("[data-open-status], .hours")) {
    const HOURS = { 0: [10, 22], 1: [10, 22], 2: [10, 22], 3: [10, 22], 4: [10, 22], 5: [10, 23], 6: [10, 23] };
    function czasWPolsce() {
      const cz = Object.fromEntries(new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/Warsaw", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23",
      }).formatToParts(new Date()).map((x) => [x.type, x.value]));
      const dzien = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(cz.weekday);
      return { dzien, minuty: +cz.hour * 60 + +cz.minute };
    }
    function odswiezStatus() {
      const { dzien, minuty } = czasWPolsce();
      const [od, do_] = HOURS[dzien];
      const otwarte = minuty >= od * 60 && minuty < do_ * 60;
      let tekst;
      if (otwarte) tekst = `Otwarte do ${do_}:00`;
      else if (minuty < od * 60) tekst = `Zamknięte, otwieramy o ${od}:00`;
      else tekst = `Zamknięte, jutro od ${HOURS[(dzien + 1) % 7][0]}:00`;
      $$("[data-open-status]").forEach((el) => { el.hidden = false; el.textContent = tekst; el.classList.toggle("is-open", otwarte); });
      $$(".hours tr").forEach((tr) => tr.classList.toggle("is-today", tr.dataset.days.split(",").includes(String(dzien))));
    }
    odswiezStatus();
    setInterval(odswiezStatus, 60000);
  }

  // ---------- Danie dnia ----------
  if (document.querySelector("[data-days]")) {
  const DAYS = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];
  const DANIE = {
    1: ["Zupa kalafiorowa z ziemniakami", "Makaron z kurczakiem"],
    2: ["Zupa jarzynowa", "De volaille z ziemniakami i zestawem surówek"],
    3: ["Zupa pomidorowa z makaronem", "Roladka wieprzowa w sosie pieczarkowym z ziemniakami i surówkami"],
    4: ["Barszcz z uszkami", "Kotlet schabowy z ziemniakami i kapustą zasmażaną"],
    5: ["Zupa ogórkowa z ziemniakami", "Morszczuk panierowany z ziemniakami i zestawem surówek"],
    6: ["Rosół z makaronem", "Nuggetsy z kurczaka z ziemniakami i zestawem surówek"],
  };
  const today = new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Warsaw" })).getDay();
  const daysEl = $("[data-days]");
  daysEl.innerHTML = [1, 2, 3, 4, 5, 6].map((d) =>
    `<button type="button" class="day${d === today ? " is-today" : ""}" role="tab" data-day="${d}" aria-selected="false">${d === today ? "Dziś" : DAYS[d].slice(0, 3) + "."}</button>`).join("");
  function showDay(d) {
    $$(".day", daysEl).forEach((b) => b.setAttribute("aria-selected", String(+b.dataset.day === d)));
    const label = $("[data-daily-label]");
    const menu = $("[data-daily-menu]");
    if (!DANIE[d]) {
      label.textContent = "Dziś niedziela";
      menu.innerHTML = '<li class="is-closed">W niedzielę dania dnia nie ma. Zapraszamy od poniedziałku, a pizza i karta są dostępne jak zawsze.</li>';
      return;
    }
    label.textContent = d === today ? `Dziś, ${DAYS[d].toLowerCase()}` : DAYS[d];
    menu.innerHTML = `<li><span>Zupa</span>${DANIE[d][0]}</li><li><span>Drugie danie</span>${DANIE[d][1]}</li>`;
  }
  daysEl.addEventListener("click", (e) => { const b = e.target.closest(".day"); if (b) showDay(+b.dataset.day); });
  showDay(DANIE[today] ? today : 0);
  }

  // ---------- Wachlarz zdjęć: lekko podąża za myszą ----------
  if (document.querySelector("[data-fan]")) {
  const fan = $("[data-fan]");
  setTimeout(() => fan.classList.add("is-ready"), 2100);
  if (!reduceMotion && matchMedia("(hover: hover) and (pointer: fine)").matches) {
    const hero = $(".hero");
    hero.addEventListener("pointermove", (e) => {
      if (!fan.classList.contains("is-ready")) return;
      const r = hero.getBoundingClientRect();
      const dx = (e.clientX - r.left) / r.width - .5, dy = (e.clientY - r.top) / r.height - .5;
      $$(".fan__card", fan).forEach((c, i) => {
        const k = (i + 1) * 7;
        c.style.setProperty("--px", `${dx * k}px`);
        c.style.setProperty("--py", `${dy * k}px`);
      });
    });
  }
  }

  // ---------- Nawigacja ----------
  const nav = $("#nav"), burger = $(".nav__burger"), drawer = $("#drawer");
  let pastTop = false;
  const sub = document.body.classList.contains("subpage");
  if (sub) nav.classList.add("is-stuck");
  function setDrawer(open) {
    drawer.hidden = !open;
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Zamknij menu" : "Otwórz menu");
    burger.innerHTML = `<i class="ph ${open ? "ph-x" : "ph-list"}" aria-hidden="true"></i>`;
    document.body.style.overflow = open ? "hidden" : "";
    nav.classList.toggle("is-stuck", open || pastTop || sub);
    if (open) $("a", drawer).focus({ preventScroll: true });
  }
  burger.addEventListener("click", () => setDrawer(drawer.hidden));
  drawer.addEventListener("click", (e) => { if (e.target.closest("a")) setDrawer(false); });
  addEventListener("keydown", (e) => { if (e.key === "Escape" && !drawer.hidden) { setDrawer(false); burger.focus(); } });
  matchMedia("(min-width: 1101px)").addEventListener("change", (e) => { if (e.matches) setDrawer(false); });

  const sentinel = document.createElement("div");
  sentinel.style.cssText = "position:absolute;top:0;height:40px;width:1px;pointer-events:none";
  document.body.prepend(sentinel);
  new IntersectionObserver(([en]) => { pastTop = !en.isIntersecting; nav.classList.toggle("is-stuck", pastTop || !drawer.hidden || sub); }).observe(sentinel);

  // pływający przycisk telefonu: widoczny tylko, gdy na ekranie nie ma innego przycisku dzwonienia
  const callbar = $("[data-callbar]");
  const visibleCalls = new Set();
  const cbObs = new IntersectionObserver((ents) => {
    ents.forEach((en) => { en.isIntersecting ? visibleCalls.add(en.target) : visibleCalls.delete(en.target); });
    callbar.classList.toggle("is-on", visibleCalls.size === 0);
  });
  $$('main a.btn[href^="tel:"]').forEach((a) => cbObs.observe(a));

  // ---------- Pojawianie się ----------
  const revealObs = new IntersectionObserver((ents) => {
    ents.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); revealObs.unobserve(en.target); } });
  }, { rootMargin: "0px 0px -8% 0px", threshold: .12 });
  $$(".reveal").forEach((el) => revealObs.observe(el));


  // ---------- Mapa ----------
  if (document.querySelector("#map")) {
  const mapEl = $("#map");
  const POS = [49.705162, 20.422258];
  const mapObs = new IntersectionObserver(([en]) => {
    if (!en.isIntersecting) return;
    mapObs.disconnect();
    const css = document.createElement("link"); css.rel = "stylesheet"; css.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"; document.head.append(css);
    const js = document.createElement("script"); js.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    js.onload = () => {
      const L = window.L;
      const map = L.map(mapEl, { scrollWheelZoom: false });
      map.setView(POS, 16);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' }).addTo(map);
      L.marker(POS, { title: "Caverna, ul. Kościuszki 9", icon: L.divIcon({ className: "", html: '<div class="map-pin"><img src="img/logo.png" alt=""></div>', iconSize: [52, 52], iconAnchor: [26, 26] }) }).addTo(map);
      if (matchMedia("(pointer: coarse)").matches) map.dragging.disable();
    };
    js.onerror = () => { mapEl.innerHTML = '<p style="padding:24px">Mapa się nie wczytała. Jesteśmy przy ul. Kościuszki 9.</p>'; };
    document.body.append(js);
  }, { rootMargin: "400px" });
  mapObs.observe(mapEl);
  }

  $("[data-year]").textContent = new Date().getFullYear();
})();
