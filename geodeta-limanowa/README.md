# Usługi geodezyjne mgr inż. Piotr Libura, Limanowa: propozycja strony

Statyczna strona (HTML + CSS + JS), jasny i ciemny tryb wg ustawień systemu.
System wizualny: `DESIGN.md` (na bazie awesome-design-md/stripe; akcent: granat z róży wiatrów w logo).
Obecna strona: geodeta.limanowa.pl (WordPress z demo-motywu, na Starcie i w „O nas” niewypełniony tekst
„Nasza firma powstała w xxxx roku”, w stopce „Quper - Construction Multipurpose WordPress Theme”, brak https).

## Zakładki
index (Start), uslugi, jak-to-dziala, kontakt. Generowane skryptem
`E:/dev/projekty-zrodla/geodeta-limanowa/build.py`; zmiany treści tam, potem `python -I build.py`.
CSS i JS edytuje się bezpośrednio w repo.

## Źródła treści
- Lista 6 usług, adres (Rynek 5, wejście od ul. Kowalskiego), telefon, e-mail, NIP, REGON: geodeta.limanowa.pl (stan 10.2026).
- Logo (róża wiatrów) z obecnej strony, bez zmian.
- Objaśnienia usług („Kiedy?”, „Co przygotować?”), kroki współpracy i odpowiedzi na pytania to ogólne informacje
  o pracy geodety, napisane do tej propozycji.
- Zdjęcia: Unsplash (poglądowe), lista w `E:/dev/projekty-zrodla/geodeta-limanowa/img-src/ZRODLA.txt`.

## Do potwierdzenia z geodetą
- opisy usług i kroki współpracy (czy zgadzają się z praktyką biura),
- rok założenia firmy (na obecnej stronie „xxxx”), godziny pracy biura, obszar działania („Limanowa i okolice”),
- prawdziwe zdjęcia z pomiarów.

## Wdrożenie u klienta
Usunąć `.demo-bar` i ustawić `--demo-h: 0px`, zamienić `noindex` na `canonical`, podać docelowe adresy w `og:*`.
Po zmianie CSS/JS podbić `V` w build.py (`?v=`).
