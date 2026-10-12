# Zakład Kamieniarski Kazimierz Jasica, Limanowa: propozycja strony

Statyczna strona (HTML + CSS + JS), jasny i ciemny tryb wg ustawień systemu.
System wizualny: `DESIGN.md` (na bazie awesome-design-md/tesla, "showroom"; akcent: bordo z logo).
Obecna strona: kamieniarstwojasica.pl (Joomla, brak wersji mobilnej i https, galerie jako małe miniatury).

## Zakładki
index (Start z karuzelą realizacji), realizacje (galeria 53 zdjęć z filtrem i podglądem), jak-zamowic, kontakt.
Generowane skryptem `E:/dev/projekty-zrodla/kamieniarstwo-jasica/build.py` (lista zdjęć w `gallery.json` obok);
zmiany treści tam, potem `python -I build.py`. CSS i JS edytuje się bezpośrednio w repo.

## Źródła treści
- Opis zakładu, kategorie, adresy (biuro ul. Ks. Łazarskiego 20, zakład Mordarka 650), telefony, e-mail, Facebook, Instagram:
  kamieniarstwojasica.pl (stan 10.2026).
- Wszystkie zdjęcia (53 realizacje, zdjęcia z cmentarza, budynek biura) i logo: z obecnej strony zakładu.
  Oryginały: `E:/dev/projekty-zrodla/kamieniarstwo-jasica/img-src`.
- Kroki zamówienia i odpowiedzi na pytania napisane do tej propozycji na podstawie opisu zakładu
  (m.in. zgoda zarządcy cmentarza to ogólna informacja).

## Do potwierdzenia z zakładem
- adres ekspozycji: strona główna podaje ul. Szwedzką 4 (biuro i ekspozycja), a kontakt i zdjęcie budynku ul. Ks. Łazarskiego 20; przyjęto Łazarskiego 20,
- godziny otwarcia biura (brak na obecnej stronie),
- czy zdjęcie z rzędami nagrobków to ich ekspozycja (podpisane jako "część wzorów stoi na naszej ekspozycji").

## Wdrożenie u klienta
Usunąć `.demo-bar` i ustawić `--demo-h: 0px`, zamienić `noindex` na `canonical`, podać docelowe adresy w `og:*`.
Po zmianie CSS/JS podbić `V` w build.py (`?v=`).
