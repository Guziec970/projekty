# Karczma Młyn, Kamienica: propozycja strony

Statyczna strona (HTML + CSS + JS). Trzy podstrony: `index.html`, `oferta.html`, `kontakt.html`.

Obecna strona klienta: `karczmamlyn.pl` — **sprawdzone na żywo przy szerokości 375 px**: brak
`meta viewport`, strona renderuje się na 980 px, czyli na telefonie trzeba ją rozsuwać palcami.
Do tego brak HTTPS i silnik oparty na `main.php?action=...` z licznikiem odwiedzin w stopce.

## Źródła treści
- Opis wnętrza i okolicy, oferta (specjały, imprezy, kapela, hotel), odległości z Kamienicy,
  adres, telefon, e-mail, dane rejestrowe i **godziny otwarcia**: `karczmamlyn.pl` (stan 10.2026).
  Strona kodowana w ISO-8859-2.
- Zdjęcia: trzy zdjęcia pokoi i zdjęcie karczmy z ich strony.

## Co strona ma
- Żywy status „Otwarte do 3:00" / „Zamknięte, otwieramy o 12:00", liczony w czasie polskim.
  **Obsługuje sobotę**, kiedy karczma jest czynna do 3:00 następnego dnia — w niedzielę nad ranem
  status nadal pokazuje, że jest otwarte, bo trwa sobotni wieczór.
- Odległości z Kamienicy do sześciu miejscowości jako siatka liczb — to argument dla turysty.
- Oferta rozbita na kuchnię, imprezy, kapelę i noclegi.
- Pływający przycisk telefonu, `noindex`, pasek demo, tagi OG.

## Do potwierdzenia z karczmą
- **Menu z cenami** — stara strona nie ma ani jednej ceny ani karty dań. Dla karczmy przy trasie
  turystycznej to największy brak.
- **Ceny noclegów** — pięć pokoi opisanych bez stawek i bez informacji o liczbie miejsc.
- **Zdjęcia** — na starej stronie galeria działa przez Highslide i pełne zdjęcia siedzą pod
  nieprzewidywalnymi ścieżkami; udało się odzyskać tylko cztery małe. Karczma z takim wnętrzem
  (malowidła ludowe, palenisko, kamienie młyńskie) powinna mieć porządną galerię.
- **Czy kapela nadal gra w soboty** i czy godziny są aktualne.
- Czy „Księga gości" ze starej strony ma wrócić — na propozycji jej nie ma.

## Wdrożenie u klienta
Usunąć `.demo-bar` i ustawić `--demo-h: 0px`, zamienić `noindex` na `canonical`, podać pełne adresy
w `og:*`. Po zmianie CSS/JS podbić `?v=` w trzech plikach HTML.
