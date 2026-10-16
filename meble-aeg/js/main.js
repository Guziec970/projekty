document.addEventListener("DOMContentLoaded", () => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  $$("[data-rok]").forEach((el) => (el.textContent = new Date().getFullYear()));

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

  if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
    $$(".reveal").forEach((el) => el.classList.add("is-in"));
  } else {
    const obs = new IntersectionObserver((w) => w.forEach((x) => {
      if (x.isIntersecting) { x.target.classList.add("is-in"); obs.unobserve(x.target); }
    }), { threshold: .12, rootMargin: "0px 0px -40px" });
    $$(".reveal").forEach((el) => obs.observe(el));
  }

  const fab = $("[data-fab]"), stopka = $("footer");
  if (fab && stopka && "IntersectionObserver" in window) {
    new IntersectionObserver(([w]) => fab.classList.toggle("is-hidden", w.isIntersecting), { threshold: .05 }).observe(stopka);
  }
});
