---
name: bella-limanowa
base: awesome-design-md/pinterest (adaptacja dla gabinetu kosmetycznego)
description: |
  Jasny, fotograficzny system dla gabinetu kosmetycznego Bella (Limanowa, Laskowa). Z Pinterestu bierzemy
  zasadę "zdjęcie na pierwszym planie": spokojne, jasne tła, siatkę zdjęć w zaokrąglonych kafelkach,
  przyjazny grotesk z ciasnym trackingiem w nagłówkach i JEDEN nasycony kolor: czerwień z logo Belli.
  Zamiast kremowej szarości Pinteresta: biel i pudrowy róż (pastel), żeby strona była lekka i "kosmetyczna".

colors:
  primary: "#cc0a1e"        # czerwień z logo Belli (logo: #d10000-#d50000), tylko CTA, aktywna zakładka, akcenty
  primary-pressed: "#a8081a"
  on-primary: "#ffffff"
  canvas: "#ffffff"
  blush: "#fdf2f3"          # tło sekcji (zamiast surface-soft)
  petal: "#f9e4e7"          # karty, chipy, kafelki (zamiast surface-card)
  line: "#f0dde1"           # hairline
  ink: "#241a1d"            # nagłówki
  body: "#4d4447"           # tekst
  mute: "#6b6064"           # podpisy (AA na blush)
  dark:
    canvas: "#151113"
    blush: "#1f181b"
    petal: "#2a2124"
    line: "#3a2e32"
    ink: "#f7eef0"
    body: "#d6cacd"
    mute: "#ab9fa3"
    primary: "#e3263a"
    primary-text: "#ff7b87"

typography:
  family: Manrope (zamiennik Pin Sans wg DESIGN.md Pinteresta), 400/600/800
  wordmark: Great Vibes, tylko znak słowny "Bella" (odwzorowanie napisu z logo); nigdzie indziej
  display-xl: clamp(2.6rem, 6vw, 4.4rem) / 1.05 / 800 / -0.03em
  heading-xl: clamp(1.9rem, 4vw, 2.75rem) / 1.1 / 800 / -0.02em
  heading-md: 1.125rem / 1.3 / 700
  body-md: 1rem / 1.6 / 400 (lead 1.1875rem)
  button: 1rem / 600

rounded:
  md: 16px     # przyciski, karty, kafelki zdjęć (jak Pinterest)
  lg: 32px     # duże zdjęcia (hero, feature), modal
  full: 9999px # chipy filtrów, pigułki na zdjęciach, przyciski ikon

spacing:
  base: 8px
  section: clamp(64px, 9vw, 112px)
  grid-gutter: 12px (masonry), 24px (karty)
---

## Zasady

- **Zdjęcie prowadzi.** Kafelki zdjęć bez ramek i cieni, promień 16px (duże: 32px). Głębia z fotografii, nie z CSS.
- **Jeden akcent.** Czerwień Belli tylko na: główny CTA (telefon), aktywna zakładka, aktywny chip, numeracja/ikonki.
  Żadnych innych kolorów akcentowych. Tła sekcji przeplatają biel i pudrowy róż (`blush`).
- **Kształty:** trzy wartości promienia (16 / 32 / pigułka), bez ostrych narożników.
- **Chipy jak w Pintereście:** domyślnie `petal`, aktywny odwrócony (`ink` tło, biały tekst).
- **Pigułka na zdjęciu** (`button-pill-on-image`): biała, mała, w rogu kafelka, nazwa strefy zabiegów.
- **Zakładki:** Start, Zabiegi, Podologia, Makijaż permanentny, O nas, Kontakt. Aktywna: `aria-current="page"`
  + czerwona kreska pod linkiem.
- **Ruch:** łagodne pojawianie (float-up, stagger 70ms), rozwijanie akordeonów i "plastrów" stref na Starcie,
  wolny pasek nazw zabiegów. Wszystko wyłączone przy `prefers-reduced-motion`.
- **Ciemny tryb** wg systemu: ciepła, prawie czarna śliwka zamiast czerni, czerwień rozjaśniona dla kontrastu.

## Komponenty sygnaturowe (image-to-code)

1. Warstwowe kadry w hero (duże zdjęcie 4:5 + mniejszy nachodzący kadr).
2. "Plastry" stref (hover-accordion): Twarz / Ciało / Oczy i brwi / Dłonie / Stopy, rozwijają się po najechaniu,
   na telefonie zwykła lista kafelków.
3. Masonry zdjęć (kolumny, mieszane proporcje 4:5 / 1:1 / 3:2) jak siatka pinów.
4. Pasek nazw zabiegów (marquee), pauza po najechaniu i przy reduced motion.
