# Jubiler Zaremba: design system

Oparty na `awesome-design-md/bugatti` (surowy luksus: czerń, fotografia, typografia), dopasowany do jubilera.
Bez elementów marki Bugatti.

## Klimat
Prawie czarne tło, biel i szarości, jedyne „kolory” dają zdjęcia złota. Dużo powietrza (sekcje ~120px).

## Kolory
| Token | Hex | Rola |
|---|---|---|
| `--canvas` | `#070707` | tło (kompromis: DESIGN.md chce #000, taste-skill zakazuje czystej czerni) |
| `--surface` | `#141414` | rzadkie karty |
| `--hairline` | `#262626` | linie podziału |
| `--ink` | `#ffffff` | nagłówki |
| `--body` | `#cccccc` | tekst |
| `--muted` | `#999999` | podpisy, stopka |
| `--link` | `#c3d9f3` | jedyny kolor niemonochromatyczny: linki w tekście |

## Typografia (trójca, zamienniki fontów Bugatti)
- **Saira Condensed 400**: nagłówki, WERSALIKI, tracking 2-4px (znak firmowy 6px). Nigdy bold.
- **Cormorant Garamond 400**: tekst ciągły, zdania normalnie, bez trackingu.
- **IBM Plex Mono 400**: przyciski, nawigacja, podpisy; wersaliki, tracking 2-2.5px.

## Kształty i komponenty
- Promień: 0 wszędzie; wyjątek: przyciski i ikony = pigułka/koło.
- Przycisk główny: przezroczysty, obrys 1px biały, pigułka, 44px wysokości.
- Bez cieni, bez gradientów (wyjątek: przyciemnienie zdjęcia pod tekstem dla kontrastu).
- Komórki „spec”: wartość (Saira 20-32px) + podpis (Plex Mono 11px), linie hairline między grupami.
