# Biuro Rachunkowe „DEKRET" Sp. z o.o., Nowy Sącz: propozycja strony

Statyczna strona (HTML + CSS + JS), jeden plik `index.html`, bez zależności i bez build-stepu.
Obecna strona: dekret.nsacz.net (layout na tabelkach, treść pocięta na JPG-i, stopka „©2006 PROTEUSS",
brak wersji mobilnej i meta description).

## Kierunek wizualny
Editorial-luxury: granat `#0B1623`, mosiądz `#A8823F`, papierowa biel `#FBF9F5` — trzy barwy, siatka 8pt.
Cormorant Garamond na nagłówki, Inter na tekst. Sygnatury: hero z wygaszoną siatką księgi rachunkowej,
mosiężne kreski zamiast punktorów, monogramy zamiast zdjęć stockowych.

## Sekcje
Hero, pięć usług (księgowość jako karta wiodąca), proces przejścia z innego biura w 4 krokach,
o biurze z tabelą danych rejestrowych, zespół, FAQ (6 pytań), kontakt z formularzem i mapą.

## Źródła treści
- Usługi, adres, telefon, e-maile, motto „…na nas możesz liczyć": dekret.nsacz.net (stan 10.2026).
- KRS 0000030586, NIP 734-28-00-374, REGON 492036873, kapitał 50 000 zł, zarząd (Irena Gajdosz — prezes,
  Ewa Dominika Halastra — wiceprezes): rejestr.io, aleo.com.
- Godziny otwarcia: cityon.pl — jedyne źródło, **wymagają potwierdzenia**.
- Opisy usług, proces i FAQ: napisane na nowo, do akceptacji biura.
- Zdjęć brak — zamiast nich monogramy i wzory CSS.

## Do potwierdzenia z biurem
- godziny pracy (pn–pt 8:00–16:00 tylko wg katalogu CityOn),
- sąd rejestrowy: strona biura podaje Kraków-Śródmieście XII Wydz., rejestry wskazują Nowy Sącz,
- czy radca prawny Witold Gajdosz ma mieć własny adres e-mail (teraz kieruje do formularza),
- zdjęcia biura i zespołu, jeśli chcą zamiast monogramów,
- treść polityki prywatności — checkbox RODO w formularzu nie ma do czego linkować.

## Formularz
Bez backendu: po walidacji składa wiadomość i otwiera klienta pocztowego (`mailto:`).
Adres odbiorcy to stała `ODBIORCA` w `js/main.js`. Docelowo podmienić na `fetch()` do endpointu
albo `action` na formularzu.

## Podgląd lokalny
`python -m http.server 5188` w katalogu repo, potem `http://localhost:5188/dekret-nowy-sacz/`.
Tak samo robi konfiguracja `projekty` w `.claude/launch.json`.

## Wdrożenie u klienta
Zamienić `noindex` na `canonical` do docelowej domeny, podać właściwe adresy w `og:*`, dodać
obraz OG 1200×630, `sitemap.xml` i `robots.txt`. Firma nie ma profilu Google Business ani
żadnych opinii w sieci — przy 25 latach na rynku warto to założyć razem ze stroną.
