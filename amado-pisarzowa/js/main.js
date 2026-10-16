document.addEventListener("DOMContentLoaded", () => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const zl = (v) => v.toFixed(2).replace(".", ",") + " zł";
  const bezOgonkow = (t) => t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ł/g, "l");

  $$("[data-rok]").forEach((el) => (el.textContent = new Date().getFullYear()));

  // ---------- Menu mobilne ----------
  const burger = $("[data-burger]"), szuflada = $("[data-drawer]");
  if (burger && szuflada) {
    const przelacz = (otw) => {
      szuflada.hidden = !otw;
      burger.setAttribute("aria-expanded", String(otw));
      document.body.style.overflow = otw ? "hidden" : "";
    };
    burger.addEventListener("click", () => przelacz(szuflada.hidden));
    szuflada.addEventListener("click", (e) => { if (e.target.closest("a")) przelacz(false); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !szuflada.hidden) przelacz(false); });
  }

  // ---------- Pojawianie ----------
  if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
    $$(".reveal").forEach((el) => el.classList.add("is-in"));
  } else {
    const obs = new IntersectionObserver((w) => w.forEach((x) => {
      if (x.isIntersecting) { x.target.classList.add("is-in"); obs.unobserve(x.target); }
    }), { threshold: .12, rootMargin: "0px 0px -40px" });
    $$(".reveal").forEach((el) => obs.observe(el));
  }

  // ---------- Karta ----------
  const lista = $("[data-pizze]");
  if (lista) {
    // [nr, nazwa, skład, cena 30 cm, cena 40 cm]
    const PIZZE = [
      [1, "Tania", "sos pomidorowy, ser, pieczarki, oregano", 16, 29],
      [2, "Regionalna", "sos pomidorowy, ser, boczek, kiełbasa, cebula, pomidor, oregano", 21, 34],
      [3, "Morska", "sos pomidorowy, ser, tuńczyk, cebula, kukurydza, oregano", 21, 34],
      [4, "Studencka", "sos pomidorowy, ser, pieczarki, kurczak, szynka, oregano", 21, 34],
      [5, "Pizza kebab", "sos pomidorowy, ser, kurczak, kukurydza, ogórek kiszony, papryka, oregano", 21, 34],
      [6, "Dracula", "sos pomidorowy, ser, pieczarki, salami, boczek, papryka, zielone oliwki, oregano", 21, 34],
      [7, "Wegetariańska", "sos pomidorowy, ser, pieczarki, pomidor, cebula, kukurydza, oliwki, oregano", 21, 32],
      [8, "Domowa", "sos pomidorowy, ser, salami, cebula, oregano", 21, 34],
      [9, "Włoska", "sos pomidorowy, ser, szynka, pieczarki, oregano", 21, 34],
      [10, "Sołtysa", "sos pomidorowy, ser, cztery rodzaje mięs", 22, 35],
      [11, "Twój wybór", "sos pomidorowy, ser i cztery dowolne składniki do wyboru", 22, 35],
    ];

    const FASTFOOD = [
      ["Zapiekanka z pieczarkami", "", 10],
      ["Zapiekanka z mięsem z kebaba", "", 12],
      ["Hamburger", "", 9],
      ["Cheeseburger", "", 10],
      ["Kebab duży", "", 18],
      ["Kebab mały", "", 11],
      ["Shoarma", "", 20],
      ["Frytki", "porcja 200 g", 10],
    ];

    const DODATKI = [
      ["Dodatki mięsne", "porcja 50 g", 3],
      ["Dodatki warzywne", "porcja 50 g", 3],
      ["Ser mozzarella", "porcja 100 g", 5],
      ["Sosy: ketchup, czosnkowy, ostry", "porcja 50 g", 2],
      ["Opakowanie na pizzę", "", 3],
      ["Opakowanie na danie barowe", "", 3],
    ];

    let duza = false;      // false = 30 cm, true = 40 cm
    let pytanie = "";

    const podswietl = (txt, q) => {
      if (!q) return txt;
      const i = bezOgonkow(txt).indexOf(q);
      return i < 0 ? txt : txt.slice(0, i) + "<mark>" + txt.slice(i, i + q.length) + "</mark>" + txt.slice(i + q.length);
    };

    const rysuj = () => {
      const q = bezOgonkow(pytanie.trim());
      const pizze = PIZZE.filter(([, n, s]) => !q || bezOgonkow(n + " " + s).includes(q));
      lista.innerHTML = pizze.map(([nr, n, s, m, d]) => `
        <li class="poz">
          <span class="poz__nr">${nr}</span>
          <div>
            <h3 class="poz__nazwa">${podswietl(n, q)}</h3>
            <p class="poz__opis">${podswietl(s, q)}</p>
          </div>
          <span class="poz__cena">${zl(duza ? d : m)}</span>
        </li>`).join("") || '<li class="pusto">Nic takiego nie mamy w karcie. Spróbuj inaczej, na przykład „kebab” albo „tuńczyk”.</li>';

      let reszta = 0;
      $$("[data-grupa]").forEach((sek) => {
        const zrodlo = sek.dataset.grupa === "fastfood" ? FASTFOOD : DODATKI;
        const poz = zrodlo.filter(([n, o]) => !q || bezOgonkow(n + " " + o).includes(q));
        reszta += poz.length;
        sek.hidden = !!q && poz.length === 0;
        $("[data-lista]", sek).innerHTML = poz.map(([n, o, c]) => `
          <li class="poz poz--prosta">
            <div>
              <h3 class="poz__nazwa">${podswietl(n, q)}</h3>
              ${o ? `<p class="poz__opis">${podswietl(o, q)}</p>` : ""}
            </div>
            <span class="poz__cena">${zl(c)}</span>
          </li>`).join("");
      });

      const sekPizz = $("[data-sekcja-pizze]");
      if (sekPizz) sekPizz.hidden = !!q && pizze.length === 0;

      const info = $("[data-info]");
      if (info) {
        if (!q) { info.hidden = true; }
        else {
          const razem = pizze.length + reszta;
          info.hidden = false;
          info.textContent = razem
            ? `Znaleziono ${razem} ${razem === 1 ? "pozycję" : razem % 10 >= 2 && razem % 10 <= 4 ? "pozycje" : "pozycji"}.`
            : "Nic nie znaleźliśmy w karcie.";
        }
      }
    };

    const przel = $("[data-rozmiar]");
    if (przel) {
      przel.addEventListener("click", (e) => {
        const b = e.target.closest("button");
        if (!b) return;
        duza = b.dataset.rozmiar === "40";
        $$("button", przel).forEach((x) => x.setAttribute("aria-checked", String(x === b)));
        rysuj();
      });
    }

    const pole = $("[data-szukaj]");
    if (pole) {
      let t;
      pole.addEventListener("input", () => { clearTimeout(t); t = setTimeout(() => { pytanie = pole.value; rysuj(); }, 120); });
      pole.addEventListener("search", () => { pytanie = pole.value; rysuj(); });
    }

    rysuj();
  }

  // ---------- Pływający telefon ----------
  const fab = $("[data-fab]"), stopka = $("footer");
  if (fab && stopka && "IntersectionObserver" in window) {
    new IntersectionObserver(([w]) => fab.classList.toggle("is-hidden", w.isIntersecting), { threshold: .05 }).observe(stopka);
  }
});
