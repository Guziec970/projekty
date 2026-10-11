# Pizzeria Apollo, Limanowa: strona www

Statyczna strona (HTML + CSS + JS, bez budowania). Wystarczy wgrać na dowolny hosting.

## Podgląd lokalny
```
python -m http.server 5180
```
Potem otwórz http://127.0.0.1:5180

## Co wgrać na serwer
`index.html`, `css/`, `js/`, `img/`. Oryginały zdjęć (2000 px) leżą poza repo: `E:/dev/projekty-zrodla/apollo-limanowa/img-src`.

## Wersja demo
Na górze jest pasek "Propozycja nowej strony" i `noindex`. Przy wdrożeniu u klienta: usunąć `.demo-bar` z HTML, ustawić `--demo-h: 0px` w CSS, zamienić `noindex` na `<link rel="canonical">` i podać pełne adresy docelowej domeny w `og:image`/`og:url`.

## Do potwierdzenia z pizzerią
- ceny i skład (przepisane z obecnej strony apollolimanowa.pl, poprawione literówki),
- godziny otwarcia i numer 570 902 600 (na starej stronie opisany jako "tymczasowy"),
- lista składników do pizzy własnej kompozycji (nr 27), wzięta ze składników z menu.

## Zdjęcia
Unsplash (licencja Unsplash: darmowe użycie, także komercyjne). Najlepiej z czasem podmienić na prawdziwe zdjęcia z pizzerii.

## Po zmianie CSS/JS
Podbij numer `?v=` przy `css/style.css` i `js/main.js` w `index.html`, żeby przeglądarki pobrały nową wersję.
