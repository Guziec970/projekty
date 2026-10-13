---
name: walek-mordarka
base: awesome-design-md/claude (adaptacja dla domu weselnego)
description: |
  Redakcyjny, ciepły i elegancki. Z "claude": szeryfowe nagłówki + humanistyczny sans, spokojne tło,
  jeden ciepły akcent na przyciskach, zaokrąglone przyciski. Zmiany: zamiast kremu biel i szałwia
  (jak zielone ściany z mchu w ich sali), akcentem jest czerwień z logo lokalu (#970000).
  Zdjęcia wyłącznie z obecnej strony lokalu (sala, łuk ślubny, wejście, dania, słodki stół).

colors:
  primary: "#8e1219"     # czerwień z logo
  primary-hover: "#730d13"
  canvas: "#ffffff"
  sage: "#eef2ec"        # tła sekcji
  line: "#e3e6e1"
  ink: "#1d211e"
  body: "#3d433f"
  mute: "#616862"

typography:
  display: Cormorant Garamond 500/600 (serif uzasadniony: branża ślubna, elegancja), kursywa do akcentu w tytule
  body: Jost 400/500
  hero: clamp(3rem, 8vw, 6rem) / 1.02

rounded:
  button: pill
  card/photo: 12px
---

## Komponenty sygnaturowe (image-to-code)
1. Pełnoekranowe hero z salą i łukiem ślubnym (powolny zoom), tytuł z kursywą.
2. Pasek 4 liczb (270 gości, 60 noclegów, 60 osób, od 2005).
3. Nakładające się kadry (sala + słodki stół) i "trio" zdjęć kuchni.
4. Planer "Zapytaj o termin": rodzaj, data, goście, noclegi -> gotowy e-mail (bez wysyłania danych przez stronę).
