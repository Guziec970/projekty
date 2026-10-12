---
name: weterynarz-dobra
base: awesome-design-md/airbnb (adaptacja dla gabinetu weterynaryjnego)
description: |
  Ciepły, fotograficzny system jak Airbnb: biała baza, zdjęcia zwierząt w roli głównej, miękkie zaokrąglenia,
  umiarkowane wagi i jeden "prąd" marki. Zamiast Rausch: żółć z logo gabinetu (byk w żółtym kole, #f1c713),
  zawsze z ciemnym tekstem (kontrast ~11:1). Tła sekcji: delikatna mięta, nawiązanie do zieleni starej strony.

colors:
  primary: "#f1c713"       # żółć z logo; przyciski, aktywna zakładka (kreska), ikony po najechaniu, pasek CTA
  primary-hover: "#e0b600"
  on-primary: "#1f1a00"
  canvas: "#ffffff"
  mint: "#eef6ef"          # tła sekcji (neutralne, nie akcent)
  line: "#e3e8e3"
  ink: "#222222"           # jak Airbnb
  body: "#3f3f3f"
  mute: "#616a62"
  link: "#2d6a34"          # tekst linków (żółć jako tekst nie ma kontrastu); podkreślenie żółte

typography:
  family: Nunito Sans 400/600/800 (zamiennik okrągłego Airbnb Cereal)
  hero: clamp(2.5rem, 5.6vw, 4rem) / 1.06 / 800
  h2: clamp(1.85rem, 3.8vw, 2.5rem) / 1.12 / 800
  body: 1.0625rem / 1.6

rounded:
  button: 10px   # Airbnb rounded.sm
  card: 16px     # Airbnb rounded.md/lg
  large: 32px    # Airbnb rounded.xl: hero, panele, kafel gospodarstwa
  chip: pill
---

## Zasady
- Zdjęcie prowadzi, interfejs cichy. Cień tylko jeden poziom (jak Airbnb), na panelach i kartach po najechaniu.
- Żółć tylko jako tło z ciemnym tekstem: przyciski, aktywne podkreślenia, kropki list, pasek "Umów wizytę".
- Logo klienta bez zmian, jedynie przycięte do koła.
- Zakładki: Start, Psy i koty, Gospodarstwo, Kontakt (aktywna: pogrubienie + żółta kreska, `aria-current`).

## Komponenty sygnaturowe (image-to-code)
1. Pasek kategorii jak w Airbnb (ikony zwierząt) przełączający panel ze zdjęciem i listą (zakładki ARIA).
2. Siatka zakresów leczenia z ikonami (ikona robi się żółta po najechaniu).
3. Kafel "Masz gospodarstwo?" z delikatnym parallaxem zdjęcia pastwiska.
4. Odznaka z logo nachodząca na zdjęcie w hero (wjazd z obrotem).
