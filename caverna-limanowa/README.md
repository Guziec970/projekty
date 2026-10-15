# Caverna Pizza & Pub, Limanowa: propozycja strony

Statyczna strona (HTML + CSS + JS). System wizualny: `DESIGN.md` (na bazie awesome-design-md/starbucks).

## Zakładki
index (Start + danie dnia), menu, przyjecia, kontakt. Generowane z `E:/dev/projekty-zrodla/caverna-limanowa/onepager.html` skryptem
`E:/dev/projekty-zrodla/split.py caverna-limanowa` (+ `patchjs.py caverna-limanowa` dla JS). Zmiany treści: edytuj onepager.html i uruchom oba skrypty.

## Źródła treści
- Menu, ceny, danie dnia, sala zabaw, przyjęcia, telefony: obecna strona caverna.pl (stan 10.2026).
- Zdjęcia: galerie z caverna.pl („Nasze dania”, „Nowe miejsce”) i logo restauracji. To ich materiały,
  użyte w propozycji dla nich; oryginały: `E:/dev/projekty-zrodla/caverna-limanowa/img-src`.

## Do potwierdzenia z restauracją
- godziny otwarcia: wzięte z wizytówki Google (pon.-czw. i niedz. 10:00-22:00, pt. i sob. 10:00-23:00), warto potwierdzić u źródła,
- cena dania dnia: na stronie są dwie wartości (30 zł w „Danie dnia”, 29 zł w „Aktualnościach”); przyjęto 30 zł,
- adres: ul. Kościuszki 9 (z obecnej strony i bazy powiatu).

## Wdrożenie u klienta
Usunąć `.demo-bar` i ustawić `--demo-h: 0px`, zamienić `noindex` na `canonical`, podać docelowe adresy w `og:*`.
Po zmianie CSS/JS podbić `?v=` w `index.html`.
