---
name: wolimex
base: awesome-design-md/bmw (wariant jasny, korporacyjny)
description: |
  Korporacyjny, inżynierski i spokojny. Z BMW: jeden niebieski kolor akcji, prostokątne narożniki (0px)
  na przyciskach, kartach i zakładkach, dwie skrajne wagi (800 nagłówki, 300 tekst), siatka kart działów
  ze zdjęciem i linkiem "Więcej", zakładki kategorii wersalikami z podkreśleniem, jedno ciemne pasmo.
  Niebieski = granat z logo WOLIMEX (#2e3192). Zdjęcia wyłącznie firmowe (maszyny, kopalnia, wytwórnia).

colors:
  primary: "#2e3192"     # granat z logo
  primary-hover: "#23267a"
  navy: "#161a3a"        # ciemne pasmo (BMW surface-dark z odcieniem granatu)
  canvas: "#ffffff"
  soft: "#f5f6f8"
  line: "#e2e4e8"
  ink: "#1d1f26"
  body: "#3a3d45"
  mute: "#5f636c"

typography:
  family: Archivo 300/700/800 (zamiennik BMW Type Next)
  hero: clamp(2.2rem, 4.6vw, 3.6rem) / 1.05 / 800
  h2: clamp(1.85rem, 3.6vw, 2.6rem) / 1.1 / 800
  body: 1.0625rem / 1.6 / 300
  nav/tabs: 0.8125-0.875rem / 700 / wersaliki, tracking .06-.08em

rounded: 0px wszędzie (wyjątek: brak)
---

## Komponenty sygnaturowe (image-to-code)
1. Hero: pełnoszerokie zdjęcie kopalni z białą kartą tekstu (wolny zoom zdjęcia).
2. Pasek 4 liczb z prawdziwych danych (1984, 597 km kanalizacji z listy realizacji, 300 t/h, ISO) z licznikami.
3. Karty 6 działów (3-up) + przyklejony pasek zakładek działów na podstronie oferty.
4. Tabela realizacji z filtrem kategorii i rysowana oś kalendarium.
