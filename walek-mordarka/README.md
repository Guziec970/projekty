# Dom Weselny „Walek”, Mordarka: propozycja strony

Statyczna strona (HTML + CSS + JS), jasny i ciemny tryb. System wizualny: `DESIGN.md` (awesome-design-md/claude; akcent: czerwień z logo).
Zakładki: index, sala, kuchnia, galeria (26 zdjęć z filtrem i podglądem), kontakt (planer "Zapytaj o termin" tworzy gotowy e-mail).
Generator: `E:/dev/projekty-zrodla/walek-mordarka/build.py` (`python -I build.py`).

## Źródła
Treści, logo i wszystkie zdjęcia: walek-mordarka.pl (stan 10.2026).

## Do potwierdzenia
- na obecnej stronie wisi "testowa aktualność" i terminy "2023/2026": aktualne wolne terminy, ceny/pakiety,
- czy dodatkowa sala na 60 osób służy też na chrzciny/komunie (opisane jako przykłady).

## Wdrożenie
Usunąć `.demo-bar`, `--demo-h: 0px`, `noindex` -> `canonical`, adresy w `og:*`; po zmianie CSS/JS podbić `V`.
