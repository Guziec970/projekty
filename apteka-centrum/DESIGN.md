---
name: apteka-centrum
base: awesome-design-md/apple (wariant jasny, bez ciemnych kafli)
description: |
  Spokojny, czytelny system dla rodzinnej apteki w Limanowej. Z Apple bierzemy: ciszę interfejsu,
  jeden niebieski kolor interaktywny, przyciski-pigułki, karty 18px, ciasne nagłówki i fotografię
  w roli głównej. Zmiany: zamiast naprzemiennych czarnych kafli jasne tła (perła, pastelowy błękit),
  bo apteka ma być jasna i przyjazna; większy tekst bazowy (18px), bo wielu pacjentów to seniorzy.

colors:
  primary: "#0070ab"        # niebieski z krzyża w logo (#0075b2), lekko przyciemniony dla kontrastu AA
  primary-hover: "#005b8c"
  on-primary: "#ffffff"
  canvas: "#ffffff"
  soft: "#f5f7fa"           # odpowiednik canvas-parchment (chłodniejszy)
  sky: "#eaf3fa"            # pastelowy błękit: tła hero, chipy, ikony
  line: "#e1e6ec"
  ink: "#1d1d1f"            # jak Apple
  body: "#3a3a3c"
  mute: "#63666b"
  open: "#1a7f37"           # semantyczny: "otwarte teraz" (jedyny wyjątek od zasady jednego koloru)
  closed: "#b42318"         # semantyczny: "zamknięte"

typography:
  family: Inter 400/600/700 (zamiennik SF Pro; wybór pod czytelność dla starszych)
  hero: clamp(2.6rem, 6.2vw, 4.25rem) / 1.05 / 700 / -0.04em
  h2: clamp(1.9rem, 4vw, 2.6rem) / 1.1 / 700 / -0.03em
  body: 1.125rem / 1.6 (lead 1.25rem)

rounded:
  card: 18px    # Apple rounded.lg
  hero-img: 28px
  button: pill
---

## Zasady
- Jeden kolor interaktywny (niebieski). Zielony/czerwony tylko jako status otwarcia.
- Sekcje przeplatają biel i perłę (`soft`); hero i nagłówki podstron z łagodnym przejściem do błękitu.
- Bez dekoracji: żadnych gradientów poza tłem hero, cień tylko pod zdjęciami i pływającymi kartami statusu.
- Zakładki: Start, Oferta, Nasze apteki, O nas, Kontakt; aktywna jako błękitna pigułka (`aria-current`).
- Ruch: float-up przy wejściu, rozwijanie akordeonów, rysowana oś historii. Wyłączane przy reduced motion.

## Komponenty sygnaturowe (image-to-code)
1. Karty "otwarte teraz" na zdjęciu w hero (żywy status obu aptek, czas w Polsce).
2. Bento oferty bez pustych pól (1 szeroki, 1 wysoki, 2 małe, 1 szeroki).
3. Pionowe/poziome linie rytmu: oś historii 1981-dziś.
4. Akordeon pytań (e-recepta, receptura, import docelowy).
