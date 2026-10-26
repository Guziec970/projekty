# proteuss/ — propozycje z rundy prospectingu

Pięć propozycji stron dla firm, które wypadły z rozpoznania opisanego
w `proteuss-leady.md` (plik lokalny, poza repo). Każda powstała z treści
przepisanej z obecnej strony firmy — nic nie jest wymyślone poza opisami
usług i pytaniami, które są do akceptacji klienta.

**Wszystkie strony mają `noindex, nofollow` i pasek „wersja poglądowa" na górze.**
To propozycje, nie strony tych firm.

## Zawartość

| Katalog | Firma | Obecna strona | Co z nią nie tak |
|---|---|---|---|
| `alwis/` | ALWIS — Konstrukcje Aluminiowe, Kępno | alwis.com.pl | layout z 2006, brak wersji mobilnej |
| `jn-spaw/` | J.N.SPAW Józef Nowak, Jodłownik | jn-spaw.pl | brak `meta viewport`, rozjeżdża się na telefonie |
| `wspinanie-sacz/` | Klub Wysokogórski Nowy Sącz | wspinaniesacz.pl | WordPress 4.7.29 z 2016, brak `<title>` |
| `zdrowe-jelito/` | Gabinet Zdrowego Jelita (Natural-Detox), Nowy Sącz | zdrowejelito.pl | stopka „© 2013" |
| `andrema/` | ANDREMA P.W. Andrzej Jaskólski, Poznań | andrema.pl | Joomla, stopka „© 2014" |

## Sprostowanie do nazwy katalogu

Katalog nazywa się `proteuss`, bo rozpoznanie zaczęło się od PROTEUSS-a —
ale **żadnej z tych pięciu stron PROTEUSS nie robił**. Sprawdziłem stopki:

- `alwis.com.pl` → „Projekt i wykonanie: Strony internetowe Syców"
- `jn-spaw.pl` → darmowy szablon „Design by W3layouts"
- `wspinaniesacz.pl` → „Realizacja: Tworzenie stron www — Cybertree"
- `zdrowejelito.pl`, `andrema.pl` → brak podpisu wykonawcy

Trafiły na listę dlatego, że stoją na tym samym współdzielonym hostingu
(skyinet.pl) co domeny PROTEUSS-a. Sąsiedztwo na IP okazało się poszlaką,
a nie dowodem autorstwa. Dwie strony z potwierdzonym podpisem PROTEUSS-a
to `dekret-nowy-sacz/` i `ogorzalek-nowy-sacz/` w katalogu głównym repo.

Dwie uwagi geograficzne: **ALWIS jest z Kępna** (Wielkopolska), a **ANDREMA
z Poznania** — to nie ta sama firma co „P.P.H.U. Andrema S.A. w Nowym Sączu"
z listy referencyjnej PROTEUSS-a, tylko zbieżność nazw.

## Jak to jest zbudowane

```
proteuss/
├─ _system/
│  ├─ base.css   ← tokeny, siatka, nagłówek, karty, formularz, stopka
│  └─ base.js    ← menu mobilne, reveal, walidacja formularza, mailto
├─ alwis/        index.html + css/brand.css + img/favicon.svg
├─ jn-spaw/
├─ wspinanie-sacz/
├─ zdrowe-jelito/
└─ andrema/
```

`base.css` i `base.js` są wspólne dla wszystkich pięciu. Każda strona dokłada
tylko `css/brand.css`, który nadpisuje tokeny `:root` (kolor, krój, tło hero)
i dodaje własne bloki. Dzięki temu poprawka w komponencie wchodzi od razu
na wszystkie pięć stron, a każda z nich i tak wygląda inaczej.

| Strona | Kolor wiodący | Typografia | Sygnatura |
|---|---|---|---|
| alwis | chłodny błękit szkła `#2E6E9E` | Archivo + Inter | siatka rysunku warsztatowego |
| jn-spaw | iskra `#C44F0C` | Barlow Condensed + Barlow | ukośny snop iskier |
| wspinanie-sacz | czerwień chwytów `#CE4B2A` | Outfit + Inter | rozrzucone chwyty |
| zdrowe-jelito | zieleń `#3C8873` | Lora + Inter | koncentryczne fale |
| andrema | ochra warsztatowa `#A86A00` | Chivo + Inter | szrafura techniczna |

Formularze działają bez backendu — walidacja, potem `mailto:` z gotową treścią.
Adres odbiorcy jest w atrybucie `data-mail` na `<form>`.

## Do uzupełnienia przed pokazaniem klientowi

- **Adresy e-mail w formularzach** — przy `jn-spaw`, `wspinanie-sacz` i `andrema`
  wpisałem adresy wzorcowe (`kontakt@…`), bo na obecnych stronach ich nie ma.
  Do podmiany na prawdziwe albo do usunięcia formularza na rzecz samego telefonu.
- **Zdjęcia** — żadna z tych stron ich nie ma. Przy ALWIS-ie i J.N.SPAW-ie
  zdjęcia realizacji zrobią największą różnicę.
- **Zakres z ALWIS-a jest z 2006–2007 roku** — lista referencyjna urywa się
  na 2007. Trzeba zapytać, co robili przez ostatnie lata.
- **Godziny ściany wspinaczkowej** są z obecnej strony (2016) — do potwierdzenia.

## Treści medyczne — `zdrowe-jelito/`

Obecna strona obiecuje wprost, że zabieg „likwiduje zaparcia", „usuwa grzybicę"
i pozwala „pokonać kilogramy". **Nie przepisałem tych zdań.** To twierdzenia
o skutkach zdrowotnych, których nie da się poprzeć, a reklama usług zdrowotnych
jest w Polsce ograniczona przepisami — klient ryzykowałby więcej, niż zyskał.

Zamiast tego strona opisuje sam zabieg rzeczowo, ma wyraźne zastrzeżenie, że jest
to zabieg z zakresu profilaktyki i wellness, a nie metoda leczenia, oraz że
o przeciwwskazaniach decyduje wywiad przed pierwszą wizytą. Przy wdrożeniu
treść powinna przejść przez osobę odpowiedzialną merytorycznie w gabinecie.

Pominąłem też numer konta bankowego, który jest na obecnej stronie — na wersji
poglądowej nie ma powodu, żeby tam wisiał.

## Podgląd lokalny

```bash
python -m http.server 5188 --directory .
```
potem `http://localhost:5188/proteuss/<katalog>/`.
