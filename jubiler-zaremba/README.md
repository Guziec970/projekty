# Jubiler Zaremba, Limanowa: propozycja strony

Statyczna strona (HTML + CSS + JS). System wizualny: `DESIGN.md` (na bazie awesome-design-md/bugatti).
Obecna strona klienta (mzjubiler.pl) jest na Flashu z 2009 r., bez SSL i wersji mobilnej.

## Źródła treści
- Historia (od 1991), oferta, usługi, adresy, telefony, e-mail: mzjubiler.pl (stan 10.2026).
- Zdjęcia salonów i 2 zdjęcia obrączek: galerie z mzjubiler.pl (materiały klienta),
  oryginały w `E:/dev/projekty-zrodla/jubiler-zaremba/img-src`.
- Zdjęcia kolekcji, hero i pracowni: Unsplash (licencja Unsplash), poglądowe.
- Galeria kategorii (`img/galeria/`, 267 zdjęć): wszystkie zdjęcia ze starej strony, otwierane z kafli kolekcji
  (`#galeria-obraczki`, `#galeria-pierscionki`, `#galeria-kolczyki`, `#galeria-wisiorki`, `#galeria-bransolety`, `#galeria-inne`, `#galeria-salony`).

## Do potwierdzenia z klientem
- godziny otwarcia obu salonów (brak na obecnej stronie),
- które zdjęcie salonu to Rynek 3A, a które ul. Krakowska 5 (na stronie przypisane umownie),
- link do konta na Allegro,
- najlepiej: sesja zdjęciowa własnych wyrobów zamiast zdjęć poglądowych.

## Wdrożenie u klienta
Usunąć `.demo-bar` i ustawić `--demo-h: 0px`, zamienić `noindex` na `canonical`, podać docelowe adresy w `og:*`.
Po zmianie CSS/JS podbić `?v=` w `index.html`.
