# Gabinet Stomatologiczny Prodent: design system

Oparty na `awesome-design-md/wise` (szałwiowe tło, jeden limonkowy akcent, zaokrąglone karty, ciężki display),
dopasowany do gabinetu. Logo klienta zostaje bez zmian. Bez elementów marki Wise.

## Klimat
Czysto, spokojnie, przyjaźnie. „Świeżo jak mięta”: szałwia + limonka nawiązują do zielonych foteli w gabinecie.
Zdjęcia: prawdziwy gabinet i zespół (materiały klienta).

## Kolory (wariant jasny, wielostronicowy)
| Token | Jasny | Ciemny | Rola |
|---|---|---|---|
| `--canvas` | `#ffffff` | `#111410` | tło strony |
| `--mint` | `#eef8ea` | `#18221a` | tło sekcji: zieleń jak fotele |
| `--sky` | `#eaf3fb` | `#161d24` | tło sekcji: błękit jak logo |
| `--sun` | `#fff6dc` | `#231f14` | tło sekcji: słońce jak ściany gabinetu |
| `--ink` | `#0e0f0c` | `#eef1ec` | nagłówki i tekst |
| `--body` | `#474a46` | `#c2c6bf` | tekst pomocniczy |
| `--mute` | `#5c5e5b` | `#9a9e97` | podpisy |
| `--primary` | `#9fe870` | `#9fe870` | przyciski i aktywna zakładka (ciemny tekst) |
| `--primary-pale` | `#e2f6d5` | `#24331b` | tło aktywnej zakładki, wyróżnienia |
| `--ink-deep` | `#163300` | `#cdffad` | linki, tekst na akcencie |

Strona ma 5 zakładek (Start, Leczenie, Pracownia RTG, Gabinet i zespół, Kontakt), generowanych
z `E:/dev/projekty-zrodla/prodent/build.py` (wspólny nagłówek i stopka).

## Typografia
- Plus Jakarta Sans 800: nagłówki (zamiennik Wise Sans 900).
- Inter 400/600: tekst, przyciski, etykiety (jak w Wise).

## Kształty
- Karty i przyciski: promień 24px; chipy: pigułka. Bez ostrych rogów.
- Bez gradientów, cienie tylko bardzo delikatne na pływających kartach.
