// Kancelaria Jędrzejek – interakcje. Treść dziedzin prawa z kancelaria.limanowa.pl (poprawione literówki).
(() => {
  "use strict";
  document.documentElement.classList.add("js");
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  // ---------- Zakres usług ----------
  if (document.querySelector("[data-area-list]")) {
  const AREAS = [{"t":"Prawo cywilne","g":[{"h":"","intro":"","items":["Sprawy o zapłatę (w tym odzyskiwanie należności, windykacja)","Ochrona dóbr osobistych","Odszkodowania, zadośćuczynienia","Podział majątku, zniesienie współwłasności","Cofnięcie darowizny","Rozwiązanie dożywocia","Prawo spadkowe","Stwierdzenie nabycia spadku","Dział spadku","Zabezpieczenie spadku","Przyjęcie bądź odrzucenie spadku","Stwierdzenie nieważności testamentu","Sporządzanie testamentów, wydziedziczanie","Dochodzenie zachowku","Dochodzenie wykonania zapisów, poleceń","Dochodzenie uznania spadkobierców i zapisobierców za niegodnych dziedziczenia"]}]},{"t":"Odszkodowania","g":[{"h":"","intro":"","items":["Szkody na osobie (urazy, uszkodzenia ciała, cierpienia psychiczne, śmierć osoby bliskiej w wypadku)","Odszkodowanie i zadośćuczynienie","Szkody na mieniu","Wypadki komunikacyjne","Wypadek przy pracy","Wypadek w rolnictwie","Błędy lekarskie","Roszczenia od Skarbu Państwa","Waloryzacja polis z lat 80. (posagowych, na życie)","Roszczenia z polisolokat"]}]},{"t":"Prawo rodzinne","g":[{"h":"","intro":"","items":["Rozwód","Separacja","Alimenty","Sprawy dotyczące władzy rodzicielskiej","Sprawy dotyczące kontaktów z małoletnimi","Unieważnienie małżeństwa","Zaprzeczenie i ustalenie ojcostwa","Rozdzielność majątkowa","Podział majątku wspólnego (w tym także osób żyjących w konkubinacie)"]}]},{"t":"Nieruchomości","g":[{"h":"","intro":"","items":["Ustanowienie służebności drogi koniecznej","Ustanowienie służebności, w tym służebności przesyłu","Zasiedzenie nieruchomości","Uwłaszczenie","Rozgraniczenie","Ochrona własności","Ochrona posiadania","Sprawy o wynagrodzenie za korzystanie z nieruchomości","Sprawy o kwestionowanie zasadności zmiany wysokości opłat za użytkowanie wieczyste","Wnioski o wpisy do ksiąg wieczystych","Obsługa prawna transakcji sprzedaży nieruchomości"]}]},{"t":"Prawo pracy i ubezpieczeń społecznych","g":[{"h":"Prawo pracy","intro":"","items":["Sprawy o zapłatę wynagrodzenia, odprawy, ekwiwalentu za urlop","Sprawy o odszkodowanie za niezgodne z prawem rozwiązanie stosunku pracy, mobbing","Sprawy o przywrócenie do pracy","Sprawy o ustalenie istnienia stosunku pracy","Sprawy o odszkodowanie z tytułu wypadku przy pracy","Doradztwo oraz reprezentowanie pracowników i pracodawców we wzajemnych sporach","Negocjacje związkowe","Przygotowywanie i opiniowanie aktów prawnych z zakresu prawa pracy (regulaminów, zarządzeń, pism, umów o pracę, o zakazie konkurencji, kontraktów menedżerskich)"]},{"h":"Prawo ubezpieczeń społecznych","intro":"","items":["Odwołania od decyzji ZUS i KRUS w sprawach rent, emerytur, świadczeń przedemerytalnych","O uwzględnienie okresów pracy w warunkach szczególnych"]}]},{"t":"Umowy","g":[{"h":"","intro":"Analiza i sporządzanie projektów umów cywilnoprawnych.","items":["Umowa najmu","Umowa dzierżawy","Umowa sprzedaży","Umowa użyczenia","Umowa darowizny","Umowa dostawy","Umowa o dzieło","Umowa zlecenia","Umowa współpracy","Umowa o pracę","Kontrakt menedżerski","Umowy przedwstępne"]}]},{"t":"Prawo spółek","g":[{"h":"Tworzenie i rejestracja spółek","intro":"","items":["Spółek osobowych (spółka jawna, spółka partnerska, spółka komandytowa)","Spółek kapitałowych (spółka z ograniczoną odpowiedzialnością, spółka akcyjna)","Spółek o charakterze mieszanym (spółka komandytowo-akcyjna)","Przekształcenia spółek","Opracowywanie projektów umów, statutów, regulaminów i innych aktów prawnych związanych z funkcjonowaniem przedsiębiorstwa","Obsługa walnych zgromadzeń, zgromadzeń wspólników, posiedzeń rad nadzorczych, opracowywanie projektów uchwał","Zaskarżanie uchwał wspólników","Sprawy sądowe pomiędzy wspólnikami","Prowadzenie negocjacji i prób ugodowych","Zmiany umów i statutów spółek, innych dokumentów korporacyjnych (regulaminów zarządu, rady nadzorczej)","Likwidacja spółki"]}]},{"t":"Prawo upadłościowe i naprawcze","g":[{"h":"","intro":"","items":["Doradztwo w zakresie postępowania upadłościowego i naprawczego","Ogłoszenie upadłości likwidacyjnej i z możliwością zawarcia układu","Postępowanie naprawcze","Zgłaszanie wierzytelności","Przygotowywanie wniosków, odpowiedzi","Upadłość konsumencka","Likwidacja podmiotu","Udział w negocjacjach dotyczących możliwości zawarcia układu","Reprezentowanie interesów dłużnika","Reprezentowanie wierzyciela i nadzór nad prawidłowością postępowania"]}]},{"t":"Prawo administracyjne","g":[{"h":"","intro":"","items":["Prawo budowlane: wnioski, zgłoszenia, pozwolenia, odwołania od decyzji, reprezentowanie w postępowaniu administracyjnym","Prawo ochrony środowiska, prawo wodne, inne dziedziny prawa administracyjnego","Prawo celne","Ochrona własności intelektualnej i przemysłowej","Reprezentacja przed organami administracji państwowej i sądami administracyjnymi","Sporządzanie skarg i odwołań"]},{"h":"Prawo zamówień publicznych","intro":"","items":["Przygotowywanie oferty","Odwołania w postępowaniu o zamówienia publiczne","Kompleksowa obsługa"]}]},{"t":"Prawo spółdzielcze i mieszkaniowe","g":[{"h":"","intro":"","items":["Spółdzielcze lokatorskie prawo do lokalu mieszkalnego","Spółdzielcze własnościowe prawo do lokalu mieszkalnego","Ustanowienie odrębnej własności lokalu","Sprawy o eksmisję","Sprawy o zapłatę czynszu","Sprawy o zameldowanie i wymeldowanie","Sprawy o wstąpienie w stosunek najmu","Sprawy o nakazanie spółdzielni złożenia oświadczenia woli o przekształceniu spółdzielczego prawa do lokalu w prawo odrębnej własności","Zaskarżanie uchwał wspólnot mieszkaniowych i spółdzielni","Udział z głosem doradczym w zgromadzeniach właścicieli, walnych zgromadzeniach członków","Doradztwo prawne przy kupnie i sprzedaży nieruchomości - analiza umów ze spółdzielniami i deweloperami"]}]},{"t":"Windykacja należności","g":[{"h":"","intro":"","items":["Należności przedsiębiorców","Należności osób prywatnych","Działania na drodze polubownej, uczestnictwo w negocjacjach, mediacji","Obsługa prawna na etapie postępowania sądowego, zabezpieczającego i egzekucyjnego","Ugody w sprawach spłaty zadłużenia, zastępstwo prawne i procesowe"]}]},{"t":"Ochrona danych osobowych: RODO","g":[{"h":"","intro":"Obsługa zgodna z RODO i ustawą o ochronie danych osobowych z 2018 roku.","items":["Przeprowadzamy szkolenia w zakresie ochrony danych osobowych kierowane do przedsiębiorców, instytucji publicznych i ich pracowników","Opracowujemy kompletną dokumentację spełniającą warunki RODO indywidualnie dostosowaną do klienta","Zapewniamy bieżącą aktualizację dokumentacji i dostosowujemy ją do ewentualnych zmian przepisów"]}]},{"t":"Postępowanie egzekucyjne i zabezpieczające","g":[{"h":"","intro":"","items":["Powództwo przeciwegzekucyjne","Zaskarżanie czynności komornika","Ochrona przed nieuzasadnioną egzekucją","Ustalanie i poszukiwanie majątku dłużnika","Ochrona interesów dłużnika w postępowaniu egzekucyjnym","Udział w postępowaniu egzekucyjnym po stronie wierzyciela","Ochrona byłych małżonków, spadkobierców lub wspólników przed egzekucją","Ochrona osób trzecich, których rzeczy zostały zajęte przy okazji egzekucji z obcego majątku"]}]},{"t":"Ochrona konsumenta","g":[{"h":"","intro":"","items":["Dochodzenie należności konsumenckich","Roszczenia z tytułu rękojmi, gwarancji i niezgodności towaru konsumpcyjnego z umową","Spory na tle umów kredytowych, pożyczek, tzw. chwilówek","Klauzule abuzywne (niedopuszczalne zapisy w umowach z konsumentami)","Spory konsumenckie z umów komisowych - sprawy o wady towaru nabytego w komisie","Prawo odstąpienia od umowy zawartej na odległość","Kredyty we frankach - nieważność klauzul abuzywnych, dochodzenie praw tzw. frankowiczów"]}]},{"t":"Obrony w sprawach karnych","g":[{"h":"","intro":"Zapewniamy osobom podejrzanym oraz oskarżonym skuteczną pomoc i obronę na każdym etapie postępowania karnego, to jest.","items":["W postępowaniu przygotowawczym","W postępowaniu przed sądem pierwszej instancji","W postępowaniu przed sądem drugiej instancji","W postępowaniu karnym wykonawczym","W postępowaniu kasacyjnym","W postępowaniu o wznowienie postępowania"]}]},{"t":"Wykroczenia","g":[{"h":"","intro":"","items":["Sprawy z oskarżenia prywatnego","Reprezentacja pokrzywdzonego","Występowanie w roli oskarżyciela posiłkowego","Obrona w sprawach o wykroczenia","Obrona w sprawach o wykroczenia skarbowe","Doradztwo w sprawach wykroczeń i wykroczeń skarbowych"]}]},{"t":"Fundacje i Stowarzyszenia","g":[{"h":"","intro":"","items":["Zakładanie i rejestracja","Projekt statutu","Obsługa prawna"]}]}];
  const list = $("[data-area-list]");
  const panel = $("[data-area-panel]");
  const mobile = matchMedia("(max-width: 900px)");
  let active = 0;
  list.innerHTML = AREAS.map((a, i) => `<button type="button" class="area-tab" role="tab" id="area-tab-${i}" aria-controls="area-panel" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${esc(a.t)}<i class="ph ph-caret-right" aria-hidden="true"></i></button>`).join("");
  panel.id = "area-panel";
  const tabsEl = $$(".area-tab", list);

  function renderPanel(i) {
    const a = AREAS[i];
    panel.setAttribute("aria-labelledby", `area-tab-${i}`);
    panel.innerHTML = `<div class="panel-in"><h3>${esc(a.t)}</h3>${a.g.map((g) =>
      (g.h ? `<h4>${esc(g.h)}</h4>` : "") + (g.intro ? `<p class="intro">${esc(g.intro)}</p>` : "") +
      (g.items.length ? `<ul>${g.items.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : "")).join("")}
      <div class="areas__cta"><a class="btn btn--tertiary" href="#kontakt">Umów konsultację<i class="ph ph-arrow-right" aria-hidden="true"></i></a></div></div>`;
  }
  function select(i, { focus = false, toggle = false } = {}) {
    // na telefonie ponowne kliknięcie zwija panel
    if (toggle && mobile.matches && i === active && !panel.hidden) { panel.hidden = true; tabsEl[i].setAttribute("aria-expanded", "false"); return; }
    active = i;
    tabsEl.forEach((t, j) => { t.setAttribute("aria-selected", String(i === j)); t.tabIndex = i === j ? 0 : -1; });
    renderPanel(i);
    panel.hidden = false;
    if (mobile.matches) {
      tabsEl[i].after(panel);
      tabsEl.forEach((t, j) => t.setAttribute("aria-expanded", String(i === j)));
      if (toggle) tabsEl[i].scrollIntoView({ block: "nearest", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    }
    if (focus) tabsEl[i].focus();
  }
  function placePanel() {
    if (mobile.matches) { tabsEl[active].after(panel); }
    else { list.after(panel); panel.hidden = false; tabsEl.forEach((t) => t.removeAttribute("aria-expanded")); }
  }
  list.addEventListener("click", (e) => { const t = e.target.closest(".area-tab"); if (t) select(tabsEl.indexOf(t), { toggle: true }); });
  list.addEventListener("keydown", (e) => {
    const k = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    if (k) { select((active + k + AREAS.length) % AREAS.length, { focus: true }); e.preventDefault(); }
    if (e.key === "Home") { select(0, { focus: true }); e.preventDefault(); }
    if (e.key === "End") { select(AREAS.length - 1, { focus: true }); e.preventDefault(); }
  });
  mobile.addEventListener("change", placePanel);
  select(0);
  placePanel();
  }

  // ---------- Nawigacja ----------
  const burger = $(".nav__burger"), drawer = $("#drawer");
  function setDrawer(open) {
    drawer.hidden = !open;
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Zamknij menu" : "Otwórz menu");
    burger.innerHTML = `<i class="ph ${open ? "ph-x" : "ph-list"}" aria-hidden="true"></i>`;
    document.body.style.overflow = open ? "hidden" : "";
    if (open) $("a", drawer).focus({ preventScroll: true });
  }
  burger.addEventListener("click", () => setDrawer(drawer.hidden));
  drawer.addEventListener("click", (e) => { if (e.target.closest("a")) setDrawer(false); });
  addEventListener("keydown", (e) => { if (e.key === "Escape" && !drawer.hidden) { setDrawer(false); burger.focus(); } });
  matchMedia("(min-width: 1057px)").addEventListener("change", (e) => { if (e.matches) setDrawer(false); });

  // ---------- Pojawianie ----------
  const groups = new Map();
  $$(".reveal").forEach((el) => { const k = el.parentElement, i = groups.get(k) || 0; el.style.setProperty("--rd", `${Math.min(i, 5) * 70}ms`); groups.set(k, i + 1); });
  const ro = new IntersectionObserver((ents) => ents.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); ro.unobserve(en.target); } }), { rootMargin: "0px 0px -6% 0px", threshold: .08 });
  $$(".reveal").forEach((el) => ro.observe(el));

  // ---------- Mapa ----------
  if (document.querySelector("#map")) {
  const mapEl = $("#map"), POS = [49.706266, 20.424526];
  const mo = new IntersectionObserver(([en]) => {
    if (!en.isIntersecting) return;
    mo.disconnect();
    const css = document.createElement("link"); css.rel = "stylesheet"; css.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"; document.head.append(css);
    const s = document.createElement("script"); s.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    s.onload = () => {
      const L = window.L;
      const map = L.map(mapEl, { scrollWheelZoom: false }).setView(POS, 16);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' }).addTo(map);
      L.marker(POS, { title: "Kancelaria, ul. M. B. Bolesnej 11A", icon: L.divIcon({ className: "", html: '<div class="map-pin"></div>', iconSize: [20, 20], iconAnchor: [10, 10] }) }).addTo(map);
      if (matchMedia("(pointer: coarse)").matches) map.dragging.disable();
    };
    s.onerror = () => { mapEl.innerHTML = '<p style="padding:24px">Mapa się nie wczytała. Biuro: ul. M. B. Bolesnej 11A, Limanowa.</p>'; };
    document.body.append(s);
  }, { rootMargin: "400px" });
  mo.observe(mapEl);
  }

  $("[data-year]").textContent = new Date().getFullYear();
})();
