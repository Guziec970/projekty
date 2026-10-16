# Pizzeria Alga, Limanowa: propozycja strony

Statyczna strona (HTML + CSS + JS, bez budowania). Wystarczy wgrać na dowolny hosting.

Obecna strona klienta: `alga-limanowa.5v.pl` — darmowy hosting z reklamami wstrzykiwanymi w treść,
bez wersji mobilnej. Cała zawartość merytoryczna (menu, ceny, godziny, adres) pochodzi stamtąd.

## Zakładki
`index.html` (Start), `menu.html`, `kontakt.html`. Pisane ręcznie, bez generatora — zmiany robi się
bezpośrednio w tych plikach. Dane menu siedzą w `js/main.js` (tablica `PIZZE` i obiekt `KARTA`).

## Źródła treści
- Menu, ceny, składy, godziny otwarcia, adres i telefon: alga-limanowa.5v.pl (stan 10.2026).
- Zdjęcia: galeria z ich strony (`upload/big/*.jpg`) — sala, bar, wnętrze. To materiały klienta.
- Logo: `img/logo-new.png` z ich strony, przeskalowane do WebP.

## Co strona ma
- 34 pizze z cenami dla trzech rozmiarów (26 / 35 / 46 cm), przełącznik rozmiaru przelicza całą kartę.
- Wyszukiwarka po nazwach i składnikach, obejmuje też fast food, obiady i sosy; ignoruje polskie znaki,
  więc „pieczarki" znajdzie też wpisane jako „pieczarki" bez ogonków.
- Godziny otwarcia z żywym statusem „Otwarte do 22:00" / „Zamknięte, otwieramy o 11:00", liczonym
  w czasie polskim i odświeżanym co minutę.
- Pływający przycisk telefonu na telefonach, chowany nad stopką.
- Zdjęcia w dwóch rozmiarach (`srcset`), `noindex` i pasek demo.

## Do potwierdzenia z pizzerią
- **Dowóz**: katalogi (powiat limanowski, Restaurant Guru) podają, że Alga dowozi, ale na ich własnej
  stronie nie ma o tym ani słowa — dlatego na propozycji też nie ma. Jeśli dowożą, trzeba dopisać
  zasięg i ewentualną minimalną kwotę.
- **Ceny**: przepisane z ich strony, ale nie wiadomo, kiedy były aktualizowane.
- **Godziny**: ze strony klienta; w katalogach krążą inne (11–22 codziennie).
- **25-letnia tradycja**: hasło z ich strony, warto potwierdzić rok otwarcia, żeby dało się napisać
  konkretnie („od 1998") zamiast okrągłego „ponad 25 lat".
- **Zdjęcia jedzenia**: nie mają ani jednego. Pizzeria bez zdjęcia pizzy to największa dziura tej
  strony — kilka dobrych zdjęć z telefonu zrobi tu więcej niż jakakolwiek zmiana w kodzie.
- Czy nadal w karcie są pozycje oznaczone jako „nowość" (15 z 34 pizz).

## Wdrożenie u klienta
Usunąć `.demo-bar` z HTML i ustawić `--demo-h: 0px` w CSS, zamienić `noindex` na `canonical`
z docelową domeną, podać pełne adresy w `og:*`. Po zmianie CSS/JS podbić `?v=` w trzech plikach HTML.
