# Meble A.E.G., Laskowa: propozycja strony

Statyczna strona (HTML + CSS + JS). Trzy podstrony: `index.html`, `realizacje.html`, `kontakt.html`.

Obecna strona klienta: `mebleaeg.pl` — bez `meta viewport`, więc na telefonie wyświetla się jak na
monitorze. Strona kodowana w cp1250, z banerami ze stocka (amerykańska kuchnia z granitowym blatem).

## Źródła treści
- Opis firmy, oferta (meble kuchenne, pokojowe, biurowe, łazienkowe, szafy wnękowe), zasada
  „pomiar i transport gratis", obszar działania i dane kontaktowe: `mebleaeg.pl` (stan 10.2026).
- Zdjęcia: galeria realizacji z ich strony (`/files/gallery_picture/*.jpg`) — prawdziwe zdjęcia mebli
  u klientów. **Banery ze stocka pominąłem świadomie**: pokazywały cudzą kuchnię, nie ich pracę.

## Co strona ma
- Hero na prawdziwym zdjęciu realizacji, nie na stocku.
- Oferta w pięciu kategoriach, opisy napisane na podstawie ich tekstów.
- „Od pomiaru do montażu" — cztery kroki współpracy, złożone z tego, co mówi ich strona.
- Galeria dziesięciu realizacji, zdjęcia w dwóch rozmiarach (`srcset`), miniatury 480 px dla telefonów.
- Pływający przycisk telefonu, `noindex`, pasek demo, tagi OG.

## Do potwierdzenia z firmą
- **Godziny pracy** — nie ma ich na starej stronie.
- **Adres warsztatu** — podany jest tylko „34-602 Laskowa 853". Warto potwierdzić, czy to adres
  warsztatu, czy tylko korespondencyjny, i czy można przyjechać obejrzeć materiały.
- **E-mail** — stara strona nie podaje żadnego, jedyny kontakt to telefon.
- **Obszar działania** — strona wymienia Limanową, Bochnię i Laskową; czy jeżdżą dalej?
- **Zdjęcia** — te z galerii są autentyczne, ale robione telefonem, często z bałaganem w tle.
  Kilka zdjęć zrobionych po montażu, przy dziennym świetle i z uprzątniętym blatem, podniosłoby
  wrażenie z całej strony.
- Czy firma ma NIP/nazwę do stopki (teraz jest tylko „Meble A.E.G. Andrzej Gołąb").

## Wdrożenie u klienta
Usunąć `.demo-bar` i ustawić `--demo-h: 0px`, zamienić `noindex` na `canonical`, podać pełne adresy
w `og:*`. Po zmianie CSS/JS podbić `?v=` w trzech plikach HTML.
