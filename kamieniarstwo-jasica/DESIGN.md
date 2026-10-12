---
name: kamieniarstwo-jasica
base: awesome-design-md/tesla (adaptacja dla zakładu kamieniarskiego)
description: |
  "Showroom" jak u Tesli: interfejs prawie znika, produkt (nagrobek sfotografowany na białym tle) mówi sam.
  Biel i jasny popiel (Light Ash), trzy odcienie grafitu na tekst, wagi tylko 400/500, normalny tracking,
  przyciski z narożnikami 4px, przejścia 0.33s. Jedyny kolor: bordo z logo zakładu (#660411), spokojne
  i godne, pasujące do branży; tylko na głównych przyciskach, ikonach faktów i pinezkach mapy.

colors:
  primary: "#660411"     # bordo z logo
  primary-hover: "#82081a"
  canvas: "#ffffff"
  ash: "#f4f4f4"         # Tesla Light Ash
  line: "#e6e6e6"
  ink: "#171a20"         # Tesla Carbon Dark
  body: "#393c41"        # Graphite
  mute: "#5c5e62"        # Pewter

typography:
  family: DM Sans 400/500 (zamiennik Universal Sans), letter-spacing normal
  hero: clamp(2.4rem, 5.2vw, 3.75rem) / 1.12 / 500
  h2: clamp(1.85rem, 3.6vw, 2.5rem) / 1.2 / 500

rounded:
  all: 4px (przyciski, karty, chipy), kropki karuzeli i pauza: koło
---

## Zasady
- Bez cieni i gradientów (poza szkłem nawigacji). Głębia tylko ze zdjęć i bieli.
- Logo klienta bez zmian (w ciemnym trybie na białej plakietce, żeby było czytelne).
- Ton spokojny: krótkie zdania, bez wykrzykników i "promocji".

## Komponenty sygnaturowe (image-to-code)
1. Karuzela realizacji w hero (kropki jak Tesla, pauza, przesunięcie palcem, wyłączona przy reduced motion).
2. Pasek 4 faktów z liniami włosowymi.
3. Galeria 53 realizacji z filtrem kategorii, licznikiem i podglądem w <dialog> (strzałki, swipe, Esc).
4. Kroki zamówienia z bordową linią rysowaną przy wejściu w widok.
