document.addEventListener("DOMContentLoaded", () => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const zl = (v) => (v == null ? "—" : v.toFixed(2).replace(".", ",") + " zł");
  const bezOgonkow = (t) => t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ł/g, "l");
  const mniejRuchu = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- Rok w stopce ----------
  $$("[data-rok]").forEach((el) => (el.textContent = new Date().getFullYear()));

  // ---------- Menu mobilne ----------
  const burger = $("[data-burger]"), szuflada = $("[data-drawer]");
  if (burger && szuflada) {
    const przelacz = (otwarte) => {
      szuflada.hidden = !otwarte;
      burger.setAttribute("aria-expanded", String(otwarte));
      document.body.style.overflow = otwarte ? "hidden" : "";
    };
    burger.addEventListener("click", () => przelacz(szuflada.hidden));
    szuflada.addEventListener("click", (e) => { if (e.target.closest("a")) przelacz(false); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !szuflada.hidden) przelacz(false); });
  }

  // ---------- Pojawianie się sekcji ----------
  if (!mniejRuchu && "IntersectionObserver" in window) {
    const obs = new IntersectionObserver((wpisy) => {
      wpisy.forEach((w) => { if (w.isIntersecting) { w.target.classList.add("is-in"); obs.unobserve(w.target); } });
    }, { threshold: .12, rootMargin: "0px 0px -40px" });
    $$(".reveal").forEach((el) => obs.observe(el));
  } else {
    $$(".reveal").forEach((el) => el.classList.add("is-in"));
  }

  // ---------- Godziny otwarcia (czas w Polsce) ----------
  // [otwarcie, zamknięcie] w godzinach; 0 = niedziela
  const GODZINY = { 0: [12, 22], 1: [11, 22], 2: [11, 22], 3: [11, 22], 4: [11, 22], 5: [11, 24], 6: [12, 24] };
  if ($("[data-status]") || $(".hours")) {
    const terazWPolsce = () => {
      const cz = Object.fromEntries(new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/Warsaw", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23",
      }).formatToParts(new Date()).map((x) => [x.type, x.value]));
      return { dzien: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(cz.weekday), minuty: +cz.hour * 60 + +cz.minute };
    };
    const odswiez = () => {
      const { dzien, minuty } = terazWPolsce();
      const [od, doo] = GODZINY[dzien];
      const otwarte = minuty >= od * 60 && minuty < doo * 60;
      const doTekst = doo === 24 ? "północy" : `${doo}:00`;
      const tekst = otwarte ? `Otwarte do ${doTekst}`
        : minuty < od * 60 ? `Zamknięte, otwieramy o ${od}:00`
        : `Zamknięte, jutro od ${GODZINY[(dzien + 1) % 7][0]}:00`;
      $$("[data-status]").forEach((el) => { el.hidden = false; el.textContent = tekst; el.classList.toggle("is-open", otwarte); });
      $$(".hours tr").forEach((tr) => tr.classList.toggle("is-today", (tr.dataset.dni || "").split(",").includes(String(dzien))));
    };
    odswiez();
    setInterval(odswiez, 60000);
  }

  // ---------- Menu ----------
  const lista = $("[data-pizze]");
  if (lista) {
    const PIZZE = [
    [1, "Margherita", "sos pomidorowy, oregano, ser", 23.00, 26.00, 36.00],
    [2, "Al Funghi", "sos pomidorowy, pieczarki, oregano, ser", 24.00, 27.00, 38.00],
    [3, "Wegetariańska", "sos pomidorowy, pieczarki, groszek, kukurydza, papryka, cebula, ser", 24.00, 27.00, 39.00],
    [4, "Puchata", "sos pomidorowy, majonez, ser, oregano", 24.00, 27.00, 38.00, true],
    [5, "Cztery sery", "sos pomidorowy, 4 rodzaje sera, oregano", null, 27.00, 38.00],
    [6, "Szynka", "sos pomidorowy, pieczarki, szynka, ser, cebula, oregano", 25.00, 31.00, 43.00],
    [7, "Salami", "sos pomidorowy, pieczarki, salami, ser, cebula, oregano", 25.00, 31.00, 43.00],
    [8, "Alla Romana", "sos pomidorowy, pieczarki, tuńczyk, oliwki, oregano, ser", 25.00, 33.00, 43.00],
    [9, "Hawai", "sos pomidorowy, szynka, ananas, oregano, ser", 25.00, 31.00, 43.00],
    [10, "Bolognese", "sos pomidorowy, mięso mielone, oregano, ser", null, 32.00, 43.00],
    [11, "Alla Baskaiola", "sos pomidorowy, boczek, cebula, oregano, ser", 25.00, 33.00, 44.00],
    [12, "Pizza Szefa", "sos pomidorowy, kiełbasa pepperoni, pomidor, ogórek, oregano, ser", 25.00, 32.00, 44.00, true],
    [13, "Calzone", "sos pomidorowy, pieczarki, szynka, boczek, cebula, kukurydza, papryka, groszek, ser, oregano", 25.00, 33.00, 46.00],
    [14, "Z kurczakiem", "sos pomidorowy, kurczak, ananas, papryka, oregano, ser", 25.00, 34.00, 46.00],
    [15, "Firmowa", "sos pomidorowy, szynka, bekon, salami, pepperoni, papryka, czosnek, oregano, ser", null, 35.00, 47.00],
    [16, "Cztery pory roku", "sos pomidorowy, pieczarki, szynka, salami, tuńczyk, papryka, jarzyny, ser", null, 33.00, 46.00],
    [17, "Szatańska", "sos pomidorowy, pieczarki, kiełbasa pepperoni, boczek, papryka pepperoni, chilli, cebula, oregano, ser", 26.00, 35.00, 46.00],
    [18, "Chłopska", "sos pomidorowy, pieczarki, boczek, kiełbasa wiejska, ogórek kiszony, oliwki, papryka, oregano, ser", null, 36.00, 46.00],
    [19, "Familijna", "sos pomidorowy, pieczarki, kiełbasa wiejska, boczek, szynka, papryka, groszek, kukurydza, oregano, ser", null, 37.00, 47.00],
    [20, "Po Zbóju", "ser, sos pomidorowy, oregano, papryka, cebula, mięso drobiowe, bekon", null, 37.00, 48.00],
    [21, "Como", "mięso drobiowe, sos, ser, papryka, sosy, sałata, cebula", null, 36.00, 46.00, true],
    [22, "Carbonara", "ser, sos śmietankowy carbonara (boczek + cebula)", null, 36.00, 46.00],
    [23, "Totmes", "mięso drobiowe orientalnie przyprawione, pomidor, oliwki, papryka, papryka chilli, ser", null, 35.00, 46.00, true],
    [24, "Bacon", "sos pomidorowy, ser mozarella, boczek, kapary, oregano, papryka, oliwki", null, 37.00, 48.00, true],
    [25, "Prosciutto", "sos pomidorowy, ser mozarella, szynka dojrzewająca, pomidorki koktajlowe, rukola, oregano", null, 38.00, 49.00, true],
    [26, "Tyrolska", "sos pomidorowy, ser mozarella, ser ricotta, rukola, bekon, parówki", null, 38.00, 48.00, true],
    [27, "Capricciosa", "sos pomidorowy, ser mozarella, karczochy, bekon, rukola", null, 38.00, 48.00, true],
    [28, "Grecka", "sos pomidorowy, pieczarki, mięso kebabowe, cebula, oregano, ser", 25.00, 37.00, 46.00, true],
    [29, "Amerykano", "pieczarki, sos, ser, frytki, szynka/salami", null, 36.00, 44.00, true],
    [30, "Ala Mateo", "ser, pieczarki, sos pomidorowy, boczek, kiełbasa pepperoni, mięso kebabowe, ogórek kiszony, papryka, cebula, oregano", null, 37.00, 49.00, true],
    [31, "Alga", "sos pomidorowy, ser mozarella, bekon specjal, oliwki, pomidorki koktajlowe, mozarella kulkowa, rukola", null, 38.00, 48.00, true],
    [32, "Spinaci", "ser, sos pomidorowy, ser mozarella, szynka dojrzewająca, feta, szpinak, cebula czerwona", null, 39.00, 49.00, true],
    [33, "Baca", "ser, sos pomidorowy, oscypek, żurawina, sos żurawinowy, rukola, ser mozarella", null, 38.00, 47.00, true],
    [34, "Turecka", "ser, sos pomidorowy, mięso kebabowe, czerwona cebula, papryka, ogórek, sos czosnkowy, oregano, ser mozarella", 29.00, 38.00, 47.00, true],
    ];

    const KARTA = {
      "Fast food": [
        ["Rotolo di calzone", "z szynką, warzywa, sosy", 18],
        ["Rotolo turco", "z mięsem kebabowym, ogórek, cebula, sosy", 18],
        ["Tortilla chicken duża", "", 17],
        ["Chicken burger", "", 15],
        ["Al chicken burger", "", 14],
        ["Hamburger", "", 12],
        ["Hamburger chłopski", "", 13],
        ["Hamburger firmowy", "", 13],
        ["Cheeseburger", "", 13],
        ["Zapiekanka firmowa", "szynka lub salami lub boczek", 16],
        ["Kebab w bułce duży", "", 16],
        ["Kebab rozkładany", "", 20],
        ["Shoarma w bułce", "mięso, frytki, sosy", 19],
        ["Frytki", "", 8],
        ["Frytki z serem", "", 11],
      ],
      "Dania obiadowe": [
        ["Kotlet schabowy", "frytki, surówki", 21],
        ["Kotlet drobiowy", "frytki, surówki", 21],
        ["Kotlet drobiowy z grilla z jarzynami", "frytki, surówki", 21],
        ["Risotto z kurczakiem", "kurczak, ryż lub frytki, surówki", 21],
        ["Shoarma", "drobiowa z przyprawami orientalnymi, frytki, surówki", 23],
        ["Miruna w chrupiącej panierce", "frytki, surówki", 23],
        ["Zestaw party", "kurczak w chrupiącej panierce, frytki", 28],
      ],
      "Sosy i dodatki": [
        ["Ketchup", "", 2],
        ["Sos czosnkowy", "", 2],
        ["Sos jogurtowy", "", 2],
        ["Salsa piccante", "", 2],
        ["Sos meksykański", "", 2],
        ["Sos amerykański", "", 2],
        ["Opakowanie średnie", "", 2],
        ["Opakowanie małe", "", 1],
      ],
    };

    const ROZMIARY = [
      { id: "m", etykieta: "Mała", opis: "26 cm", i: 3 },
      { id: "s", etykieta: "Średnia", opis: "35 cm", i: 4 },
      { id: "xxl", etykieta: "XXL", opis: "46 cm", i: 5 },
    ];
    let rozmiar = 1;          // domyślnie średnia
    let pytanie = "";

    const podswietl = (tekst, q) => {
      if (!q) return tekst;
      const i = bezOgonkow(tekst).indexOf(q);
      if (i < 0) return tekst;
      return tekst.slice(0, i) + "<mark>" + tekst.slice(i, i + q.length) + "</mark>" + tekst.slice(i + q.length);
    };

    const rysujPizze = () => {
      const q = bezOgonkow(pytanie.trim());
      const kol = ROZMIARY[rozmiar].i;
      const trafione = PIZZE.filter(([, nazwa, skl]) => !q || bezOgonkow(nazwa + " " + skl).includes(q));
      lista.innerHTML = trafione.map((p) => {
        const cena = p[kol];
        return `<li class="poz${cena == null ? " poz--brak" : ""}">
          <span class="poz__nr">${p[0]}</span>
          <div class="poz__tresc">
            <h3 class="poz__nazwa">${podswietl(p[1], q)}${p[6] ? ' <span class="znacznik">nowość</span>' : ""}</h3>
            <p class="poz__opis">${podswietl(p[2], q)}</p>
          </div>
          <span class="poz__cena">${cena == null ? "w tym rozmiarze niedostępna" : zl(cena)}</span>
        </li>`;
      }).join("") || '<li class="pusto">Nic nie znaleźliśmy. Spróbuj innego słowa, na przykład „pieczarki” albo „kebab”.</li>';
      return trafione.length;
    };

    const rysujReszte = () => {
      const q = bezOgonkow(pytanie.trim());
      let ile = 0;
      $$("[data-dzial]").forEach((sek) => {
        const nazwa = sek.dataset.dzial;
        const poz = (KARTA[nazwa] || []).filter(([n, o]) => !q || bezOgonkow(n + " " + o).includes(q));
        ile += poz.length;
        sek.hidden = q && poz.length === 0;
        const ul = $("[data-lista]", sek);
        ul.innerHTML = poz.map(([n, o, c]) => `<li class="poz poz--prosta">
            <div class="poz__tresc">
              <h3 class="poz__nazwa">${podswietl(n, q)}</h3>
              ${o ? `<p class="poz__opis">${podswietl(o, q)}</p>` : ""}
            </div>
            <span class="poz__cena">${zl(c)}</span>
          </li>`).join("");
      });
      return ile;
    };

    const info = $("[data-info]");
    const odswiezMenu = () => {
      const a = rysujPizze(), b = rysujReszte();
      const sekcjaPizz = $("[data-sekcja-pizze]");
      if (sekcjaPizz) sekcjaPizz.hidden = pytanie.trim() !== "" && a === 0;
      if (!info) return;
      if (!pytanie.trim()) { info.hidden = true; return; }
      const razem = a + b;
      info.hidden = false;
      info.textContent = razem
        ? `Znaleziono ${razem} ${razem === 1 ? "pozycję" : razem % 10 >= 2 && razem % 10 <= 4 && (razem < 12 || razem > 14) ? "pozycje" : "pozycji"}: ${a} w pizzach, ${b} w reszcie karty.`
        : "Nic nie znaleźliśmy w całej karcie.";
    };

    // przełącznik rozmiaru
    const przel = $("[data-rozmiary]");
    if (przel) {
      przel.innerHTML = ROZMIARY.map((r, i) =>
        `<button type="button" role="radio" aria-checked="${i === rozmiar}" data-r="${i}">${r.etykieta}<small>${r.opis}</small></button>`).join("");
      przel.addEventListener("click", (e) => {
        const b = e.target.closest("[data-r]");
        if (!b || +b.dataset.r === rozmiar) return;
        rozmiar = +b.dataset.r;
        $$("[data-r]", przel).forEach((x) => x.setAttribute("aria-checked", String(x === b)));
        odswiezMenu();
      });
    }

    // wyszukiwarka
    const pole = $("[data-szukaj]");
    if (pole) {
      let timer;
      pole.addEventListener("input", () => {
        clearTimeout(timer);
        timer = setTimeout(() => { pytanie = pole.value; odswiezMenu(); }, 120);
      });
      pole.addEventListener("search", () => { pytanie = pole.value; odswiezMenu(); });
    }

    odswiezMenu();
  }

  // ---------- Pływający telefon na mobile ----------
  const fab = $("[data-fab]");
  if (fab) {
    const stopka = $("footer");
    if (stopka && "IntersectionObserver" in window) {
      const o = new IntersectionObserver(([w]) => fab.classList.toggle("is-hidden", w.isIntersecting), { threshold: .05 });
      o.observe(stopka);
    }
  }
});
