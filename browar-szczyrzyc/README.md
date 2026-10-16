# Szczyrzycki Browar Cystersów: propozycja strony

Statyczna strona (HTML + CSS + JS). Trzy podstrony: `index.html`, `piwa.html`, `kontakt.html`.
Dane piw siedzą w `js/main.js` (tablica `PIWA`).

Obecna strona klienta: `browarszczyrzyc.pl` — stopka mówi 2015, brak `meta viewport`, więc na telefonie
trzeba ją rozsuwać palcami, i brak HTTPS (przeglądarki pokazują ostrzeżenie „niezabezpieczona”).

## Źródła treści
- Historia browaru, opisy i składy 13 piw, restauracja Marysieńka, Dom Pielgrzyma, adresy,
  telefony i e-maile: `browarszczyrzyc.pl` (stan 10.2026). Strona kodowana w ISO-8859-2.
- Zdjęcia: slider z ich strony (`img/slider/*.jpg`) — browar, źródło, składniki, proces warzenia.
- Logo: `img/logo.png` z ich strony.

## Co strona ma
- Oś czasu historii od 1628 roku, złożona z faktów z ich podstrony o historii.
- Wszystkie 13 piw ze stylem, ekstraktem, zawartością alkoholu i pełnym składem (woda, słody,
  chmiele, drożdże, dodatki). Filtry po rodzaju: jasne, ciemne, pszeniczne, IPA i mocne.
- Wyszukiwarka po nazwie, stylu, słodzie i chmielu — ignoruje polskie znaki.
- Pływający przycisk telefonu na telefonach, `noindex`, pasek demo, tagi OG.

## Do potwierdzenia z browarem
- **Godziny otwarcia** — nie ma ich nigdzie na starej stronie, ani dla browaru, ani dla restauracji.
- **Gdzie kupić piwo** — strona nie mówi, czy jest sprzedaż na miejscu, sklep internetowy czy tylko
  dystrybucja. Dla browaru to najważniejsza informacja po samym opisie piw.
- **Aktualność oferty** — czy wszystkie 13 piw jest nadal warzonych (strona jest z 2015 roku).
- **Ceny** — na starej stronie nie ma żadnych.
- **Zdjęcia piw** — na stronie nie ma ani jednego zdjęcia butelki osobno, tylko wspólny baner.
  Zdjęcia poszczególnych piw bardzo by tu pomogły.
- **Restauracja Marysieńka** — opis mówi „Restauracja Marysia”, a tytuł podstrony „Marysieńka”.
  Trzeba ustalić właściwą nazwę; na propozycji jest Marysieńka.

## Wdrożenie u klienta
Usunąć `.demo-bar` i ustawić `--demo-h: 0px`, zamienić `noindex` na `canonical` z docelową domeną,
podać pełne adresy w `og:*`. Po zmianie CSS/JS podbić `?v=` w trzech plikach HTML.
