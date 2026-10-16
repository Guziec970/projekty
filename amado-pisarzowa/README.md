# Pizzeria Amado, Pisarzowa: propozycja strony

Statyczna strona (HTML + CSS + JS, bez budowania). Trzy podstrony: `index.html`, `menu.html`, `kontakt.html`.
Dane karty siedzą w `js/main.js` (tablice `PIZZE`, `FASTFOOD`, `DODATKI`).

Obecna strona klienta: `pizzeriaamado.pl` — stała wersja desktopowa z 2012 roku (tak mówi stopka),
bez `viewport`, więc na telefonie wyświetla się jak na monitorze i trzeba ją rozsuwać palcami.
Oparta na Cufonie, bibliotece do podmiany fontów, której nikt nie używa od kilkunastu lat.

## Źródła treści
- Karta, ceny, składy, dodatki, zasada „ostatnie zamówienia 30 minut przed zamknięciem": `pizzeriaamado.pl/menu.html` (stan 10.2026).
- Adres, telefon, e-mail: `pizzeriaamado.pl/kontakt.html`.
- Zdjęcia: slider i miniatury z ich strony (`images/slider_*.png`, `images/img_home_*.jpg`).

## Do potwierdzenia z pizzerią
- **Godziny otwarcia** — nie ma ich nigdzie na starej stronie, jest tylko wzmianka o ostatnich
  zamówieniach pół godziny przed zamknięciem. Bez godzin strona nie powie klientowi, kiedy dzwonić,
  a to najczęściej szukana informacja. Jak będą, dołożę tabelę z żywym statusem „otwarte/zamknięte",
  taką jak w Cavernie i Aldze.
- **Dowóz** — stara strona o nim nie wspomina, więc na propozycji też go nie ma.
- **Ceny** — przepisane jeden do jednego, ale strona ma w stopce 2012 rok, więc mogą być nieaktualne.
- **Dokładny adres** — podane jest tylko „Pisarzowa Pękalówka, przy drodze na stadion Olimpii".
  Do mapy i nawigacji przydałby się numer domu.
- **Zdjęcia** — te na stronie są małe (682 px) i wyglądają na stockowe. Kilka własnych zdjęć pizzy
  i lokalu zrobi tu największą różnicę.

## Co strona ma
- Przełącznik rozmiaru 30/40 cm przelicza ceny całej pizzy.
- Wyszukiwarka po nazwach i składnikach, obejmuje też kebaby i dodatki, ignoruje polskie znaki.
- Pływający przycisk telefonu na telefonach, chowany nad stopką.
- `noindex`, pasek demo, tagi OG.

## Wdrożenie u klienta
Usunąć `.demo-bar` i ustawić `--demo-h: 0px`, zamienić `noindex` na `canonical` z docelową domeną,
podać pełne adresy w `og:*`. Po zmianie CSS/JS podbić `?v=` w trzech plikach HTML.
