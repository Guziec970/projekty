document.addEventListener("DOMContentLoaded", () => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
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

  // ---------- Piwa ----------
  const lista = $("[data-piwa]");
  if (lista) {
    // nazwa, styl, grupa, Plato, alkohol, słody, chmiele, drożdże, dodatki
    const PIWA = [
      ["Generał", "Lager", "jasne", 16, 6.3, "monachijski, pilzneński, melanoidynowy", "Marynka, Lubelski", "W-34/70", ""],
      ["Opackie", "Lager", "jasne", 14, 6.2, "pilzneński, wiedeński, karmelowy", "Lubelski, Marynka", "W-34/70", ""],
      ["Przeora", "Altbier", "ciemne", 12.5, 5.6, "pilzneński, monachijski, carared", "Marynka, Spalt Select", "Saflager W-34/70", ""],
      ["Grodzisko", "Dunkelweizen", "pszeniczne", 12, 5.2, "pilzneński, pszeniczny ciemny, karmelowy pszeniczny", "Lubelski", "WB-06", ""],
      ["Szczyrzycanka", "Saison", "pszeniczne", 13, 5.5, "pilzneński, pszeniczny, monachijski, zakwaszający, płatki owsiane", "Spalt Select, EKG", "Saflager W-34/70", ""],
      ["Szczyrzycanka w wiśniowym sadzie", "Saison", "pszeniczne", 13, 5.5, "pilzneński, pszeniczny, monachijski, zakwaszający, płatki owsiane", "EKG (East Kent Golding), Spalt Select", "Safbrew S-33", "wiśnia kandyzowana"],
      ["Pils Klasztorny", "Pils", "jasne", 10, 3.9, "pilzneński, karmelowy, klon", "Lubelski, Marynka", "Saflager W-34/70", ""],
      ["Z Pigwą", "Pils", "jasne", 10, 3.9, "pilzneński, karmelowy, klon", "Lubelski", "Saflager W-34/70", "owoce pigwy, osad naturalny"],
      ["IPA", "India Pale Ale", "ipa", 17, 7.2, "pale ale, karmelowy jasny, karmelowy ciemny", "Magnum, Citra, Crystal, Chinook", "US-05", ""],
      ["English IPA", "English IPA", "ipa", 14, 5.7, "pale ale, pszeniczny jasny, Caramunich typ II", "Magnum, EKG, Epic", "S-04", ""],
      ["Ekstra", "West Coast IPA", "ipa", 16, 6.9, "pilzneński, pszeniczny, zakwaszający", "Centennial, Cascade, Citra", "US-05", ""],
      ["Sporne", "Imperial Black IPA", "ipa", 19, 8, "pale ale, monachijski I, pszeniczny jasny, karmelowy wasserhell, klasztorny Abbey, Carafa Special I", "Tomahawk, Simcoe, Centennial, Columbus", "US-05", ""],
      ["Eliksir", "Black IPA", "ipa", 16, 7, "pale ale, monachijski, pszeniczny, karmelowy wasserhell, klasztorny Abbey, Carafa I, II, III", "Tomahawk, Simcoe, Centennial, Columbus", "US-05", ""],
    ];

    const GRUPY = [
      ["wszystkie", "Wszystkie"],
      ["jasne", "Jasne"],
      ["ciemne", "Ciemne"],
      ["pszeniczne", "Pszeniczne"],
      ["ipa", "IPA i mocne"],
    ];

    let grupa = "wszystkie";
    let pytanie = "";

    const filtry = $("[data-filtry]");
    if (filtry) {
      filtry.innerHTML = GRUPY.map(([id, et], i) =>
        `<button type="button" class="chip" aria-pressed="${i === 0}" data-grupa="${id}">${et}</button>`).join("");
      filtry.addEventListener("click", (e) => {
        const b = e.target.closest("[data-grupa]");
        if (!b) return;
        grupa = b.dataset.grupa;
        $$("[data-grupa]", filtry).forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
        rysuj();
      });
    }

    const podswietl = (txt, q) => {
      if (!q) return txt;
      const i = bezOgonkow(txt).indexOf(q);
      return i < 0 ? txt : txt.slice(0, i) + "<mark>" + txt.slice(i, i + q.length) + "</mark>" + txt.slice(i + q.length);
    };

    function rysuj() {
      const q = bezOgonkow(pytanie.trim());
      const widoczne = PIWA.filter(([n, styl, gr, , , slody, chmiele]) =>
        (grupa === "wszystkie" || gr === grupa) &&
        (!q || bezOgonkow([n, styl, slody, chmiele].join(" ")).includes(q)));

      lista.innerHTML = widoczne.map(([n, styl, , plato, alk, slody, chmiele, drozdze, dodatki]) => `
        <article class="piwo reveal is-in">
          <header class="piwo__gora">
            <h3 class="piwo__nazwa">${podswietl(n, q)}</h3>
            <span class="piwo__styl">${podswietl(styl, q)}</span>
          </header>
          <p class="piwo__liczby"><strong>${String(alk).replace(".", ",")}%</strong> alk. · ${String(plato).replace(".", ",")}° Plato</p>
          <dl class="piwo__skl">
            <div><dt>Woda</dt><dd>źródlana</dd></div>
            <div><dt>Słody</dt><dd>${podswietl(slody, q)}</dd></div>
            <div><dt>Chmiele</dt><dd>${podswietl(chmiele, q)}</dd></div>
            <div><dt>Drożdże</dt><dd>${drozdze}</dd></div>
            ${dodatki ? `<div><dt>Dodatki</dt><dd>${dodatki}</dd></div>` : ""}
          </dl>
        </article>`).join("") || '<p class="pusto">Nic takiego nie warzymy. Spróbuj inaczej, na przykład „lager” albo „Marynka”.</p>';

      const info = $("[data-info]");
      if (info) {
        const pelne = grupa === "wszystkie" && !q;
        info.hidden = pelne;
        if (!pelne) info.textContent = `${widoczne.length} z ${PIWA.length} piw`;
      }
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
