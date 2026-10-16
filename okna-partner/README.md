# PARTNER (PARTNER-ALMA Stach, Król Sp. j.), Limanowa: propozycja strony

Statyczna strona (HTML + CSS + JS). Cztery podstrony: `index.html`, `oferta.html`,
`realizacje.html`, `kontakt.html`.

Obecna strona klienta: `okna-partner.pl` — bez `meta viewport`, więc na telefonie wyświetla się
jak na monitorze. W stopce rok 2013.

## Źródła treści
- Opis firmy (rok założenia 1997, budynek przy Ceglarskiej od 2007, dotacje UE i park maszynowy CNC
  w 2008, certyfikat ISO w 2009, eksport do UE od 2005), lista produktów, adres, NIP, telefony i
  maile działów: `okna-partner.pl` (stan 10.2026).
- Zdjęcia: galeria realizacji z ich strony (`/img/gallery/*.jpg`), z ich własnym znakiem wodnym.

## Co strona ma
- Hero na zdjęciu realizacji zamiast slidera.
- Oferta w dwunastu pozycjach, opisy krótkie i oparte wyłącznie na tym, co firma sama wymienia.
- Cztery działy kontaktu jako osobne karty — sekretariat, detal, obiekty, eksport — żeby klient
  trafiał od razu pod właściwy numer, zamiast dzwonić na centralę.
- Galeria dwunastu realizacji, zdjęcia w dwóch rozmiarach (`srcset`).
- Pływający przycisk telefonu, `noindex`, pasek demo, tagi OG.

## Do potwierdzenia z firmą
- **Godziny pracy** — nie ma ich na starej stronie, ani dla sekretariatu, ani dla biur handlowych.
- **Biura handlowe** — stara strona ma osobną podstronę z listą punktów, ale nie zdążyłem jej
  przenieść. To ważne dla klienta detalicznego: gdzie fizycznie obejrzeć okno.
- **Opisy produktów** — moje są celowo oszczędne, bo stara strona opisuje produkty hasłowo.
  Warto je rozwinąć o systemy, profile i parametry (Uw), bo to decyduje przy wyborze okien.
- **Formularz wyceny** — stara strona ma „wypełnij formularz i skorzystaj z indywidualnej wyceny".
  Na propozycji jest w tym miejscu telefon; formularz wymaga backendu albo usługi zewnętrznej.
- **Certyfikaty, nagrody, dotacje** — mają osobne podstrony, nieprzeniesione.

## Wdrożenie u klienta
Usunąć `.demo-bar` i ustawić `--demo-h: 0px`, zamienić `noindex` na `canonical`, podać pełne adresy
w `og:*`. Po zmianie CSS/JS podbić `?v=` w czterech plikach HTML.
