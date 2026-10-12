# Kancelaria Radcy Prawnego Krzysztof Jędrzejek, Limanowa: propozycja strony

Statyczna strona (HTML + CSS + JS), jasny i ciemny tryb wg ustawień systemu.
System wizualny: `DESIGN.md` (na bazie awesome-design-md/ibm, Carbon). Obecna strona: kancelaria.limanowa.pl
(Flash, ramki z lat 2000, brak wersji mobilnej).

## Zakładki
index (Start + dla kogo), uslugi, zespol, wspolpraca, kontakt. Generowane z `E:/dev/projekty-zrodla/kancelaria-jedrzejek/onepager.html` skryptem
`E:/dev/projekty-zrodla/split.py kancelaria-jedrzejek` (+ `patchjs.py kancelaria-jedrzejek` dla JS). Zmiany treści: edytuj onepager.html i uruchom oba skrypty.

## Źródła treści
- Wszystkie treści (historia, zespół, 17 dziedzin prawa z opisami, współpraca, praca, kontakt, NIP/REGON):
  kancelaria.limanowa.pl (stan 10.2026), poprawione literówki i myślniki.
- Zdjęcia: Unsplash (licencja Unsplash), czarno-białe, poglądowe.

## Do potwierdzenia z kancelarią
- czy lista obsługiwanych instytucji jest aktualna i czy kancelaria chce ją pokazywać,
- czy ogłoszenie o pracy (aplikant / prawnik) jest nadal aktualne,
- zdjęcia zespołu (teraz inicjały) i biura, jeśli chcą.

## Wdrożenie u klienta
Usunąć `.demo-bar` i ustawić `--demo-h: 0px`, zamienić `noindex` na `canonical`, podać docelowe adresy w `og:*`.
Po zmianie CSS/JS podbić `?v=` w `index.html`.
