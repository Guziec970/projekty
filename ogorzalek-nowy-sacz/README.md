# Biuro Rachunkowe Bożena Ogorzałek, Nowy Sącz: propozycja strony

Statyczna strona (HTML + CSS + JS), jeden `index.html`, bez zależności i bez build-stepu.
Obecna strona: ogorzalek.nsacz.net (ta sama agencja co przy `dekret-nowy-sacz/`, wersja 2016 —
layout na tabelkach, brak meta viewport i meta description, link „CRM" w stopce zwraca 404).

## Kierunek wizualny
Celowo inny niż `dekret-nowy-sacz/`, bo to ta sama branża w tym samym mieście i w tym samym
repo: jasne hero zamiast ciemnego, zieleń butelkowa `#17322B` z glinką `#B35C3C` zamiast
granatu z mosiądzem, Spectral + DM Sans zamiast Cormorant + Inter, lista redakcyjna usług
zamiast kafelków.

Sygnatury: cztery linie telefoniczne jako karta w hero (nie przypis), pionowe linie arkusza
przecinające hero, zespół złożony jak stopka redakcyjna czasopisma.

## Sekcje
Hero z kartą telefonów, pasek z mottem i czterema liczbami, siedem usług jako numerowana lista
w dwóch kolumnach, o biurze z danymi do faktury, zespół w dwóch działach, sześć pytań, kontakt
z formularzem i mapą.

## Źródła treści
- Adres, cztery numery, e-maile, skład obu działów, zakres usług, świadectwo kwalifikacyjne
  Min. Fin. nr 15812/00 i motto „Liczenie to nasza specjalność": ogorzalek.nsacz.net (stan 10.2026).
- NIP 734-11-73-780, REGON 492688989, PKD 69.20.Z, data rozpoczęcia działalności 2001-01-02:
  egospodarka.pl, opinia-o-firmie.pl.
- Opisy usług i pytania: napisane na nowo, do akceptacji biura.
- Zdjęć brak — zamiast nich typografia i linie.

## Do potwierdzenia z biurem
- **Godziny otwarcia** — nie ma ich ani na stronie firmy, ani w żadnym katalogu, więc strona
  ich nie podaje. Po potwierdzeniu dopisać w sekcji Kontakt, w stopce i w JSON-LD
  (`openingHoursSpecification`).
- Czy skład obu działów jest aktualny — stara strona jest z 2016 roku, a Dorota Jasińska
  i Małgorzata Janisz figurują w obu działach jednocześnie.
- Czy CRM dla klientów nadal działa pod innym adresem — `/crm/index.php` zwraca 404.
  Jeśli tak, dodać do nawigacji przycisk „Panel klienta".
- Czy biuro chce pokazywać imienną listę zespołu wraz z adresami e-mail (tak jest dziś,
  ale warto zapytać ponownie).
- Zdjęcia biura i zespołu, jeśli chcą.

## Formularz
Bez backendu: po walidacji składa wiadomość i otwiera klienta pocztowego (`mailto:`).
Adres odbiorcy to stała `ODBIORCA` w `js/main.js`. Docelowo podmienić na `fetch()` do endpointu
albo `action` na formularzu.

Pod formularzem jest klauzula informacyjna (art. 13 RODO), a nie checkbox zgody — podstawą
przetwarzania jest kontakt przed zawarciem umowy, nie zgoda. Przy wdrożeniu podlinkować
politykę prywatności.

## Podgląd lokalny
`python -m http.server 5188` w katalogu repo, potem `http://localhost:5188/ogorzalek-nowy-sacz/`.

## Wdrożenie u klienta
Zamienić `noindex` na `canonical` do docelowej domeny, podać właściwe adresy w `og:*`, dodać
obraz OG 1200×630, `sitemap.xml` i `robots.txt`. Firma nie ma wiarygodnych opinii w sieci
(Panorama Firm ma jedną z 2018 z cudzymi danymi, GoWork pusty szablon) — profil Google Business
byłby tu pierwszym krokiem.
