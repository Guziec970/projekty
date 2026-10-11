# Caverna Pizza & Pub: design system

Oparty na `awesome-design-md/starbucks` (struktura kolorów, typografia, komponenty), dopasowany do wnętrza
i logo Caverny. Bez elementów marki Starbucks.

## Klimat
Ciepła restauracja z butelkowo-zielonymi fotelami, drewnem i czerwonym neonem „Restauracja Caverna”.
Kremowe tło zamiast białego, zielone pasy jako „wnęki”, neon tylko w jednym miejscu (hero).

## Kolory (role)
| Token | Hex | Rola |
|---|---|---|
| `--house` | `#1E3932` | ciemne pasy: hero, przyjęcia, stopka |
| `--uplift` | `#2b5148` | dekoracje na ciemnych pasach |
| `--brand` | `#006241` | nagłówki na jasnym tle |
| `--accent` | `#00754A` | przyciski (biały tekst) |
| `--mint` | `#d4e9e2` | jasne zielone tła, aktywne zakładki |
| `--gold` | `#cba258` | tylko „Danie dnia” (złoto z logo) |
| `--canvas` | `#f2f0eb` | tło strony |
| `--ceramic` | `#edebe9` | sekcje rozdzielające |
| `--card` | `#ffffff` | karty |
| `--ink` | `rgba(0,0,0,.87)` | tekst na jasnym |
| `--ink-soft` | `rgba(0,0,0,.58)` | tekst pomocniczy |
| `--neon` | `#ff3b4e` | wyłącznie neon w hero |

Rytm: zielony hero → krem → białe karty → zielony pas (przyjęcia) → krem → zielona stopka.

## Typografia
- Manrope (zamiennik SoDoSans), tracking `-0.01em`. Hierarchia wagą i kolorem, nie samym rozmiarem.
- Kalam: imiona pizz (jak imiona na kubkach) i drobne odręczne dopiski.
- Yellowtail: tylko neon „Caverna” w hero.

## Komponenty
- Przyciski: pigułka 50px, `scale(.95)` przy kliknięciu, akcent `#00754A` / biały na zielonym / obrys.
- Karty: 12px, cień `0 0 .5px rgba(0,0,0,.14), 0 1px 1px rgba(0,0,0,.24)`.
- „Frap”: okrągły pływający przycisk telefonu 56px, prawy dół, cień `0 0 6px rgba(0,0,0,.24), 0 8px 12px rgba(0,0,0,.14)`.
- Nawigacja: cień trzywarstwowy, pigułki linków.
- Bez gradientów jako wypełnień (wyjątek: przyciemnienie zdjęć pod tekstem).
