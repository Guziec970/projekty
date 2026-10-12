# Gabinet Weterynaryjny lek. wet. Piotr Joniec, Dobra: propozycja strony

Statyczna strona (HTML + CSS + JS), jasny i ciemny tryb wg ustawień systemu.
System wizualny: `DESIGN.md` (na bazie awesome-design-md/airbnb; akcent: żółć z logo z bykiem).
Obecna strona: weterynarzlimanowa.pl (brak wersji mobilnej i https, pusta galeria, na każdej podstronie
widoczny tekst „skrypt google analitics”).

## Zakładki
index (Start), psy-i-koty, gospodarstwo, kontakt. Generowane skryptem
`E:/dev/projekty-zrodla/weterynarz-dobra/build.py`; zmiany treści tam, potem `python -I build.py`.
CSS i JS edytuje się bezpośrednio w repo.

## Źródła treści
- Zakres usług, adres, telefon, nazwisko lekarza: weterynarzlimanowa.pl (stan 10.2026).
- Logo: oryginał ze starej strony (131 px), tylko przycięty do koła. Do wdrożenia przydałby się większy plik.
- Zdjęcia: Unsplash (poglądowe), lista w `E:/dev/projekty-zrodla/weterynarz-dobra/img-src/ZRODLA.txt`.
- Sekcja „Przed wizytą” to ogólne wskazówki napisane do tej propozycji.

## Do potwierdzenia z gabinetem
- godziny przyjęć (na obecnej stronie ich nie ma, dlatego na propozycji też nie) i czy są wizyty domowe / wyjazdy do gospodarstw,
- adres e-mail (brak na obecnej stronie),
- przypisanie usług do zwierząt na Starcie (np. co dokładnie dla królików), prawdziwe zdjęcia gabinetu.

## Wdrożenie u klienta
Usunąć `.demo-bar` i ustawić `--demo-h: 0px`, zamienić `noindex` na `canonical`, podać docelowe adresy w `og:*`.
Po zmianie CSS/JS podbić `V` w build.py (`?v=`).
