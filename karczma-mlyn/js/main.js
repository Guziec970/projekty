document.addEventListener("DOMContentLoaded", () => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

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

  // ---------- Godziny otwarcia ----------
  // [otwarcie, zamknięcie] w godzinach; wartość > 24 oznacza zamknięcie po północy.
  // 0 = niedziela. Sobota: 12:00 - 3:00 następnego dnia, czyli [12, 27].
  const GODZINY = { 0: [12, 23], 1: [12, 22], 2: [12, 22], 3: [12, 22], 4: [12, 22], 5: [12, 22], 6: [12, 27] };
  if ($("[data-status]") || $(".godziny")) {
    const terazWPolsce = () => {
      const cz = Object.fromEntries(new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/Warsaw", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23",
      }).formatToParts(new Date()).map((x) => [x.type, x.value]));
      return { dzien: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(cz.weekday), minuty: +cz.hour * 60 + +cz.minute };
    };
    const napisz = (g) => (g >= 24 ? `${g - 24}:00` : `${g}:00`);

    const odswiez = () => {
      const { dzien, minuty } = terazWPolsce();
      const [od, doo] = GODZINY[dzien];
      const wczoraj = GODZINY[(dzien + 6) % 7];

      // czy trwa jeszcze wczorajszy wieczór, przeciągnięty po północy
      const zWczoraj = wczoraj[1] > 24 && minuty < (wczoraj[1] - 24) * 60;
      const dzisiaj = minuty >= od * 60 && minuty < doo * 60;
      const otwarte = zWczoraj || dzisiaj;

      let tekst;
      if (zWczoraj) tekst = `Otwarte do ${napisz(wczoraj[1])}`;
      else if (dzisiaj) tekst = `Otwarte do ${napisz(doo)}`;
      else if (minuty < od * 60) tekst = `Zamknięte, otwieramy o ${od}:00`;
      else tekst = `Zamknięte, jutro od ${GODZINY[(dzien + 1) % 7][0]}:00`;

      $$("[data-status]").forEach((el) => { el.hidden = false; el.textContent = tekst; el.classList.toggle("is-open", otwarte); });
      $$(".godziny tr").forEach((tr) => tr.classList.toggle("is-today", (tr.dataset.dni || "").split(",").includes(String(dzien))));
    };
    odswiez();
    setInterval(odswiez, 60000);
  }

  // ---------- Pływający telefon ----------
  const fab = $("[data-fab]"), stopka = $("footer");
  if (fab && stopka && "IntersectionObserver" in window) {
    new IntersectionObserver(([w]) => fab.classList.toggle("is-hidden", w.isIntersecting), { threshold: .05 }).observe(stopka);
  }
});
