# Gabinet Kosmetyczny Bella, Limanowa i Laskowa: propozycja strony

Statyczna strona (HTML + CSS + JS), jasny i ciemny tryb wg ustawień systemu.
System wizualny: `DESIGN.md` (na bazie awesome-design-md/pinterest: zdjęcia na pierwszym planie, jeden akcent,
tu czerwień z logo Belli, pudrowy róż zamiast kremowej szarości). Obecna strona: bella.limanowa.pl
(ciemny szablon z ok. 2012 r., brak wersji mobilnej, pusta galeria).

## Zakładki
index (Start), zabiegi, podologia, makijaz-permanentny, o-nas, kontakt. Generowane skryptem
`E:/dev/projekty-zrodla/bella-limanowa/build.py` (treści zabiegów w `content.py` obok). Zmiany treści: edytuj
te pliki i uruchom `python -I build.py`. CSS i JS edytuje się bezpośrednio w repo.

## Źródła treści
- Opis gabinetu, 31 zabiegów (opisy, wskazania, przeciwwskazania, zalecenia), adresy i telefony:
  bella.limanowa.pl (stan 10.2026), skrócone i poprawione (literówki, brak polskich znaków w „O nas”).
- Zdjęcia: Unsplash (licencja Unsplash), poglądowe; lista w `E:/dev/projekty-zrodla/bella-limanowa/img-src/ZRODLA.txt`.
  Zdjęcia ze starej strony to stockowe banery z wtopionym tekstem, więc nie zostały użyte.
- Logo: w nagłówku znak słowny „Bella” odwzorowuje napis z logo (bez czerwonego trójkąta); oryginalne logo jest w obrazku og.

## Do potwierdzenia z gabinetem
- adres w Limanowej: kontakt podaje ul. J. Marka 9, a „O nas” wspomina ul. MBB 8 (Szafir) z 2011 r.; przyjęto Marka 9,
- godziny otwarcia i cennik (na obecnej stronie ich nie ma, dlatego na propozycji też nie),
- czy wszystkie zabiegi są nadal w ofercie (np. LipoCryo, Wimpernwelle, SNS) oraz piercing z banera starej strony,
- cena rollera do Mesoboost (60 zł wg obecnej strony),
- znak słowny zamiast trójkątnego logo, prawdziwe zdjęcia gabinetu i zespołu.

## Wdrożenie u klienta
Usunąć `.demo-bar` i ustawić `--demo-h: 0px`, zamienić `noindex` na `canonical`, podać docelowe adresy w `og:*`.
Po zmianie CSS/JS podbić `V` w build.py (`?v=`).
