# Apteka „Centrum”, Limanowa: propozycja strony

Statyczna strona (HTML + CSS + JS), jasny i ciemny tryb wg ustawień systemu.
System wizualny: `DESIGN.md` (na bazie awesome-design-md/apple, wariant jasny; akcent: niebieski z krzyża w logo).
Obecna strona: aptekacentrum.com.pl (Flash/ramki z ok. 2006 r., brak https i wersji mobilnej).

## Zakładki
index (Start), oferta, apteki (Nasze apteki), o-nas, kontakt. Generowane skryptem
`E:/dev/projekty-zrodla/apteka-centrum/build.py`; zmiany treści tam, potem `python -I build.py`.
CSS i JS edytuje się bezpośrednio w repo. Godziny są w dwóch miejscach: `HOURS` w build.py i `APTEKI` w js/main.js.

## Co działa
- Status „otwarte teraz / otwieramy o…” dla obu aptek (czas w Polsce, odświeżany co 30 s), dzisiejszy dzień w tabelach godzin.
- Mapa z obiema aptekami (Leaflet + OpenStreetMap), przycisk „Trasa” do Google Maps.

## Źródła treści
- Historia, właściciele, nagrody, działalność społeczna, oferta, adresy, telefony, e-mail, godziny: aptekacentrum.com.pl (stan 10.2026).
- Zdjęcia zespołu (2011) z obecnej strony, przycięte (bez wpisanego adresu). Pozostałe zdjęcia: Unsplash (poglądowe),
  lista w `E:/dev/projekty-zrodla/apteka-centrum/img-src/ZRODLA.txt`.
- Odpowiedzi w pytaniach (e-recepta, receptura, import docelowy) to ogólne informacje, napisane do tej propozycji.

## Do potwierdzenia z apteką
- godziny apteki w Sowlinach: zakładka Kontakt podaje pn-pt 8:00-19:00, sob 8:00-14:00, a podstrona apteki 7:30-20:00 (jak Centrum); przyjęto Kontakt,
- godziny w święta i ewentualne dyżury (status „otwarte” nie uwzględnia świąt),
- czy zamawianie brakujących leków i pomoc przy imporcie docelowym są opisane zgodnie z praktyką,
- nowe zdjęcia zespołu i wnętrz (obecne są z 2011 r.), logo: krzyż i napis odtworzone w CSS.

## Wdrożenie u klienta
Usunąć `.demo-bar` i ustawić `--demo-h: 0px`, zamienić `noindex` na `canonical`, podać docelowe adresy w `og:*`.
Po zmianie CSS/JS podbić `V` w build.py (`?v=`).
