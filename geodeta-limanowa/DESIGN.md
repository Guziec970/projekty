---
name: geodeta-limanowa
base: awesome-design-md/stripe (adaptacja dla biura geodezyjnego)
description: |
  Precyzyjny, techniczny, ale jasny system. Ze Stripe: ciemnogranatowy tusz, jeden indygo-granatowy kolor
  interaktywny, małe promienie (przyciski 6px, karty 12px), siatki z włosowymi liniami, delikatne cienie
  w odcieniu granatu. Zamiast gradientowej mgiełki Stripe: jasna lawendowa poświata i rysujące się poziomice
  (motyw mapy topograficznej). Granat jest wzięty z róży wiatrów w logo (#2a2562).

colors:
  primary: "#2a2562"     # granat z logo; przyciski, aktywna zakładka, ikony
  primary-hover: "#3b349a"
  ink: "#16133a"
  body: "#3c4257"        # jak Stripe ink-secondary
  mute: "#5f6780"
  canvas: "#ffffff"
  soft: "#f6f8fc"        # Stripe canvas-soft
  tint: "#eeedfa"        # lawendowa poświata, tła ikon
  line: "#e3e6ef"
  mark: "#fedf67"        # żółć z logo: tylko znacznik "jesteś tu" (aktywny etap, współrzędne)

typography:
  family: Hanken Grotesk 400/600/700 (zamiennik Söhne)
  hero: clamp(2.7rem, 6.4vw, 4.6rem) / 1.02 / 700 / -0.04em
  h2: clamp(1.85rem, 3.8vw, 2.6rem) / 1.12 / 700

rounded:
  button: 6px
  card: 12px
  chip: pill
---

## Komponenty sygnaturowe (image-to-code)
1. Poziomice rysowane w tle hero (SVG, stroke-dashoffset) + plakietka ze współrzędnymi biura.
2. "Na którym etapie jesteś?": 4 etapy budowy jako zakładki ARIA, każdy pokazuje potrzebne usługi.
3. Siatka usług z liniami włosowymi (gapless, jak tabele Stripe).
4. Proces w 5 krokach z przerywaną linią, ikony wypełniają się po wejściu w widok.
