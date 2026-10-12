# Gabinet Stomatologiczny Prodent, Limanowa: propozycja strony

Statyczna strona z 5 zakładkami (index, leczenie, rtg, gabinet, kontakt), jasna paleta, tryb ciemny wg systemu.
Wspólny nagłówek/stopka generowane skryptem `E:/dev/projekty-zrodla/prodent/build.py` (po zmianie treści: `python -I build.py`).
System wizualny: `DESIGN.md` (na bazie awesome-design-md/wise). Logo klienta bez zmian.

## Argument do rozmowy
Na obecnej stronie (prodent-kunicka.pl) wciąż wiszą komunikaty: „Gabinet Stomatologiczny nieczynny do 01.08.2022”
oraz informacja o przyjmowaniu w czasie „4-tej fali” Covid-19. Strona nie ma SSL ani wersji mobilnej.

## Źródła treści
- Oferta (10 zakresów + pracownia RTG), godziny gabinetu i pracowni, sterylizacja, sprzęt, parking, zespół, kontakt:
  prodent-kunicka.pl (stan 10.2026). Nieaktualnych komunikatów nie przeniesiono.
- Zdjęcia: galeria z prodent-kunicka.pl (materiały klienta), oryginały w `E:/dev/projekty-zrodla/prodent/img-src`.

## Do potwierdzenia z gabinetem
- aktualne godziny (czwartek nieczynny wg starej strony),
- czy skład zespołu jest aktualny,
- czy wybielanie lampą Beyond jest nadal w ofercie.

## Wdrożenie u klienta
Usunąć `.demo-bar` i ustawić `--demo-h: 0px`, zamienić `noindex` na `canonical`, podać docelowe adresy w `og:*`.
Po zmianie CSS/JS podbić `?v=` w `index.html`.
