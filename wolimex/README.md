# P.P.U.H. WOLIMEX, Limanowa: propozycja strony

Statyczna strona (HTML + CSS + JS), jasny i ciemny tryb wg ustawień systemu.
System wizualny: `DESIGN.md` (na bazie awesome-design-md/bmw, wariant jasny; akcent: granat z logo).
Obecna strona: wolimex.com.pl (szablon z 2009 r., brak wersji mobilnej, w nagłówku słowacki napis „veľkosť písma”).

## Zakładki
index (Start), oferta (6 działów), realizacje (35 inwestycji z filtrem), o-firmie (kalendarium, certyfikaty), kontakt (5 oddziałów, mapa).
Generowane skryptem `E:/dev/projekty-zrodla/wolimex/build.py`; zmiany treści tam, potem `python -I build.py`.
CSS i JS edytuje się bezpośrednio w repo.

## Źródła treści
- Wszystkie treści (kalendarium, opisy działów, parametry maszyn, frakcje, normy, listy realizacji, kontakty), logo,
  certyfikat CWB 2013 i zdjęcia: wolimex.com.pl (stan 10.2026). Zdjęcia: `E:/dev/projekty-zrodla/wolimex/img-src`.
- Liczba 597 km to suma długości kanalizacji z 23 realizacji wymienionych na obecnej stronie (lista kończy się na 2009 r.).

## Do potwierdzenia z firmą
- aktualne realizacje po 2009 roku (obecna strona ich nie ma) i aktualne zdjęcia (obecne są małe, ok. 570 px),
- norma kruszyw: obecna strona podaje „PN-EN 12062:2004”, na propozycji przyjęto PN-EN 12620 (kruszywa do betonu), pewnie literówka,
- aktualność certyfikatów ISO 9001 i 14001 oraz parku maszyn,
- tekst „Wolimex działa od 26 lat” na obecnej stronie jest nieaktualny (firma od 1984 r.), na propozycji jest „od 1984 roku”.

## Wdrożenie u klienta
Usunąć `.demo-bar` i ustawić `--demo-h: 0px`, zamienić `noindex` na `canonical`, podać docelowe adresy w `og:*`.
Po zmianie CSS/JS podbić `V` w build.py (`?v=`).
