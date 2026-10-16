NAG='''<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex, nofollow">
  <meta name="description" content="{opis}">
  <title>{tytul}</title>
  <link rel="canonical" href="https://guziec970.github.io/projekty/browar-szczyrzyc/{plik}">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="pl_PL">
  <meta property="og:site_name" content="Szczyrzycki Browar Cystersów">
  <meta property="og:title" content="{tytul}">
  <meta property="og:description" content="{opis}">
  <meta property="og:url" content="https://guziec970.github.io/projekty/browar-szczyrzyc/{plik}">
  <meta property="og:image" content="https://guziec970.github.io/projekty/browar-szczyrzyc/img/og.jpg">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="img/logo.webp">
  <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css">
  <link rel="stylesheet" href="css/style.css?v=1">
</head>
<body>
  <p class="demo-bar">Propozycja nowej strony dla Szczyrzyckiego Browaru Cystersów</p>

  <header class="nav">
    <div class="wrap nav__inner">
      <a class="marka" href="index.html">
        <img src="img/logo.webp" alt="" width="38" height="36">
        <span>Browar Szczyrzyc<small>Cystersi od 1628</small></span>
      </a>
      <nav class="nav__linki" aria-label="Główna nawigacja">
        <a href="index.html"{{a1}}>Start</a>
        <a href="piwa.html"{{a2}}>Nasze piwa</a>
        <a href="kontakt.html"{{a3}}>Kontakt</a>
      </nav>
      <a class="btn btn--zielen btn--maly" href="tel:+48660752561"><i class="ph ph-phone" aria-hidden="true"></i>660 752 561</a>
      <button class="burger" type="button" data-burger aria-expanded="false" aria-label="Menu"><i class="ph ph-list" aria-hidden="true"></i></button>
    </div>
  </header>
  <nav class="drawer" data-drawer hidden aria-label="Menu mobilne">
    <a href="index.html">Start</a>
    <a href="piwa.html">Nasze piwa</a>
    <a href="kontakt.html">Kontakt</a>
    <a href="tel:+48660752561">Zadzwoń: 660 752 561</a>
  </nav>
'''
STOPKA='''
  <footer class="stopka">
    <div class="wrap">
      <div class="stopka__siatka">
        <div>
          <h3>Szczyrzycki Browar Cystersów</h3>
          <p>Szczyrzyc 195, 34-623 Szczyrzyc</p>
          <p><a href="tel:+48660752561">660 752 561</a> · <a href="tel:+48183320573">18 332 05 73</a></p>
          <p><a href="mailto:biuro@browarszczyrzyc.pl">biuro@browarszczyrzyc.pl</a></p>
        </div>
        <div>
          <h3>Dom Pielgrzyma</h3>
          <p>Noclegi, Szczyrzyc 195</p>
          <p><a href="tel:+48183320600">18 332 06 00</a></p>
          <p><a href="mailto:noclegi@browarszczyrzyc.pl">noclegi@browarszczyrzyc.pl</a></p>
        </div>
        <div>
          <h3>Na stronie</h3>
          <p><a href="index.html">Start</a></p>
          <p><a href="piwa.html">Nasze piwa</a></p>
          <p><a href="kontakt.html">Kontakt</a></p>
        </div>
      </div>
      <p class="stopka__dol">© <span data-rok>2026</span> Szczyrzycki Browar Cystersów. Strona demonstracyjna, przygotowana jako propozycja.</p>
    </div>
  </footer>

  <a class="btn btn--zielen fab" href="tel:+48660752561" data-fab aria-label="Zadzwoń: 660 752 561"><i class="ph ph-phone" aria-hidden="true"></i>Zadzwoń</a>

  <script src="js/main.js?v=1"></script>
</body>
</html>
'''
def nag(plik,tytul,opis,akt):
    return NAG.format(plik=plik,tytul=tytul,opis=opis).replace("{a1}",' aria-current="page"' if akt==1 else '').replace("{a2}",' aria-current="page"' if akt==2 else '').replace("{a3}",' aria-current="page"' if akt==3 else '')
