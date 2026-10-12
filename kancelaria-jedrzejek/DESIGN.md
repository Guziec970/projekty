# Kancelaria Radcy Prawnego Krzysztof Jędrzejek: design system

Oparty na `awesome-design-md/ibm` (Carbon: biel, grafit, jeden akcent, płaskie kwadratowe formy),
dopasowany do kancelarii. Bez elementów marki IBM.

## Klimat
Minimalizm i powaga. Dużo bieli, cienkie linie zamiast cieni, typografia robi hierarchię.
Zdjęcia tylko czarno-białe. Jeden kolor akcentu na całej stronie.

## Kolory (jasny / ciemny wg prefers-color-scheme)
| Token | Jasny | Ciemny | Rola |
|---|---|---|---|
| `--canvas` | `#ffffff` | `#161616` | tło |
| `--surface` | `#f4f4f4` | `#262626` | pasy, pola, aktywne kafle |
| `--hairline` | `#e0e0e0` | `#393939` | linie 1px |
| `--ink` | `#161616` | `#f4f4f4` | nagłówki, tekst główny |
| `--ink-muted` | `#525252` | `#c6c6c6` | tekst pomocniczy |
| `--ink-subtle` | `#6f6f6f` | `#a8a8a8` | podpisy |
| `--primary` | `#0043ce` | `#4589ff` | linki, akcent (Carbon blue 70 / 50) |
| `--btn` | `#0043ce` | `#0f62fe` | tło przycisku głównego (biały tekst) |
| stopka | `#161616` | `#0b0b0b` | ciemna stopka |

## Typografia
IBM Plex Sans (jedna rodzina). Display 300 (60-76px), nagłówki 400, tekst 400 z `letter-spacing: .16px`,
eyebrow zdaniem (bez wersalików), 14px.

## Kształty i komponenty
- Promień 0 wszędzie. Bez cieni. Głębia = zmiana tła + linie 1px.
- Przyciski: główny (niebieski, biały tekst), trzeciorzędny (obrys w kolorze akcentu), 48px wysokości, 12x16 padding.
- Fokus: 2px w kolorze akcentu.
- Siatka 4px, sekcje 96px.
