# UXO — BEZLITOSNY AUDYT UX
## Strona: piotrchmielewski.com (PL + EN)
## Data: 2026-03-16
## Audytor: UXO / Claude Code

---

## OCENA OGOLNA: **74/100 — C+**

Strona jest solidna wizualnie i ma mocny copy. Ale traci klientow na konkretnych rzeczach, ktore mozna naprawic w weekend. Najwieksze grzechy: **kolizja UI na mobile**, **brak social proof z twarzami**, **formularz zamiast jasnego lead magnetu**, i **cookie banner ktory nie dziala**.

---

## SOCZEWKA 1: 10 HEURYSTYK NIELSENA

### H1: Widocznosc statusu systemu — Severity 2/4
**Problem:** Formularz kontaktowy po wyslaniu pokazuje komunikat sukcesu przez 5 sekund i znika. Uzytkownik moze tego nie zauwazyc (np. scrollowal akurat). Brak wizualnej animacji wejscia.

**Fix:**
```css
.form-success {
  display: none;
  padding: 1.5rem;
  border: 2px solid #27ae60;
  background: rgba(39, 174, 96, 0.08);
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: #27ae60;
  text-align: center;
  animation: fadeInUp 0.4s ease;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
```
I **nie ukrywaj po 5 sekundach** — niech zostanie widoczny. Uzytkownik sam zamknie lub odejdzie.

**Problem:** Przycisk submit nie ma stanu ladowania z wyrazna animacja. `Wysylanie...` to tekst, nie spinner.

**Fix:** Dodaj prosty spinner CSS zamiast samego tekstu:
```css
.btn-primary.loading span::after {
  content: '';
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
  margin-left: 8px;
  vertical-align: middle;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

### H2: Zgodnosc miedzy systemem a swiatem — Severity 1/4
**Problem:** Przycisk „Pobierz darmowego ebooka" prowadzi do formularza kontaktowego, nie do bezposredniego pobierania. Uzytkownik oczekuje pobrac plik, a dostaje formularz z polami Imie/Email/Wiadomosc. Disconnect jest wyrazny.

**Fix P0:**
- Zmien tekst CTA na: **„Podaj email — wyśle ebooka"** lub **„Wpisz email, wyślę Ci ebooka"**
- Albo (lepiej): stworz oddzielny mini-formularz z TYLKO polem email, bez pola wiadomosc, bezposrednio w sekcji ebooka.

### H3: Kontrola i wolnosc uzytkownika — Severity 1/4
**OK.** Skip link jest. Back-to-top jest. Menu mobilne sie zamyka. Nawigacja jest czytelna.

Drobny problem: brak mozliwosci cofniecia zgody cookie bez czyszczenia localStorage. Wg RODO uzytkownik powinien moc **w kazdej chwili** zmienic decyzje.

**Fix:** Dodaj w stopce link „Ustawienia cookie" ktory ponownie wyswietla banner:
```html
<li><a href="#" id="cookie-settings">Ustawienia cookie</a></li>
```
```javascript
document.getElementById('cookie-settings').addEventListener('click', function(e) {
  e.preventDefault();
  localStorage.removeItem('cookie-consent');
  document.getElementById('cookie-banner').classList.add('visible');
});
```

### H4: Spojnosc i standardy — Severity 1/4
**Problem:** Przyciski nie maja `border-radius` — sa kwadratowe. Ale cookie banner ma `border-radius: 6px`. Niespojnosc.

**Fix:** Albo daj `border-radius: 0` na cookie-btn (spójne z reszta), albo dodaj subtelny radius wszedzie:
```css
.btn-primary, .btn-ghost { border-radius: 2px; }
.cookie-btn { border-radius: 2px; }
```

### H5: Zapobieganie bledom — Severity 2/4
**Problem:** Walidacja formularza koloruje ramke na `var(--accent)` czyli czerwony. Ale caly design jest czerwono-czarny — to nie wyglada jak blad, to wyglada jak aktywne pole. Uzytkownik nie widzi co jest nie tak.

**Fix:**
```css
.form-group input.error {
  border-color: #FF6B6B;
  box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.15);
}
```
I dodaj tekstowy komunikat bledu pod polem:
```html
<span class="form-error" style="display:none; color:#FF6B6B; font-size:0.72rem; font-family:var(--font-mono); margin-top:0.3rem;">Podaj prawidłowy email</span>
```

### H6: Rozpoznawanie zamiast pamietania — Severity 0/4
**OK.** Nawigacja jest widoczna, sekcje maja jasne nazwy, CTA sa powtorzone.

### H7: Elastycznosc i efektywnosc — Severity 1/4
**OK ogolnie.** Smooth scroll dziala. Floating CTA bar to dobry pattern. Paralax jest subtelny.

### H8: Estetyka i minimalizm — Severity 1/4
**Problem:** Sekcja „Social Proof" ma 4 karty — ale to NIE SA testimonialy. To sa hipotetyczne scenariusze pisane w 2. osobie. Uzytkownik po 3 sekundach rozpoznaje ze to nie sa prawdziwe opinie.

**Fix:** Zmien naglowek sekcji z „Brzmi znajomo?" na **„Kogo szukam"** lub **„Dla kogo to jest"** — bo to jest de facto opis persony, nie proof. Nie udawaj testimonialu.

### H9: Pomoc w rozpoznawaniu i naprawie bledow — Severity 2/4
**Problem:** Blad formularza (`alert('Cos poszlo nie tak')`) to natywny alert(). W 2026. Na stronie za setki zlotych. To wyglada jak phishing.

**Fix:** Uzyj tego samego `.form-success` diva ale ze stylem bledu:
```javascript
// Zamiast alert():
var errorDiv = document.getElementById('formError');
errorDiv.textContent = 'Cos poszlo nie tak. Sprobuj ponownie.';
errorDiv.style.display = 'block';
```

### H10: Pomoc i dokumentacja — Severity 1/4
**OK.** FAQ jest dobre i odpowiada na realne pytania. Kontakt jest latwy do znalezienia.

---

## SOCZEWKA 2: WIARYGODNOSC I POZADALNOSC

### Ocena: 3.2/5

**Co dziala dobrze:**
- Ton jest autentyczny i wyroznia sie od 99% stron AI-consultantow
- Copy jest MOCNE — ostre, bezposrednie, zapamietywalne
- FAQ dobrze adresuje obiekcje
- Oferta jest jasna — 3 opcje, zero komplikacji

**Co zabija wiarygodnosc:**

1. **BRAK ZDJECIA (P0)** — strona osobistego konsultanta BEZ ZDJECIA autora. To jak CV bez imienia. Uzytkownik nie wie do kogo mowi. W sekcji „O mnie" jest tekst, sa statystyki, jest cytat — ale NI MA TWARZY.

   **Fix:** Dodaj zdjecie min. 400x400px w sekcji about. Profesjonalne, ale nie korporacyjne. Moze selfie z laptopem? Cokolwiek > nic.

2. **FALSZYWY SOCIAL PROOF (P1)** — Karty w sekcji „Brzmi znajomo?" wygladaja jak testimoniale ale to fikcyjne scenariusze. Uzytkownik czuje podswiadomie ze to jest fake.

   **Fix:** Przeredaguj na format „Persona" a nie „Cytat":
   ```
   ZAMIAST: "Masz firme remontowa..."
   NAPISZ: "Firma remontowa, Birmingham — AI przygotowuje 80% wycen automatycznie"
   ```
   Albo calkowicie usun cytaty i zrob sekcje „Dla kogo to jest" z ikonkami/bulletami.

3. **PLACEHOLDER LINKI (P1)** — LinkedIn w stopce prowadzi do `https://linkedin.com` (strona glowna LinkedIn, nie profil). Facebook nie istnieje. To wyglada na strone-scam.

   **Fix:** Usun linki do social media dopoki nie masz prawdziwych profili. Lepiej 0 linkow niz fake linki.

4. **BRAK DOWODOW KOMPETENCJI (P2)** — „15+ lat w UK" i „AI specjalizacja" to statystyki bez dowodow. Brak case studies, brak certyfikatow, brak zdjec z eventow/webinarow.

---

## SOCZEWKA 3: MOBILE CHECK

### Ocena: 3.5/5

**Co dziala:**
- Responsywnosc jest ogolnie dobra — grid przechodzi w 1 kolumne
- Hamburger menu dziala poprawnie
- Touch targets na przyciskach sa wystarczajace (padding 1rem)
- `100dvh` zamiast `100vh` — dobrze

**PROBLEMY:**

1. **KOLIZJA FLOATING CTA + COOKIE BANNER (P0)**

   Floating CTA jest na `z-index: 999`, cookie banner na `z-index: 10000`. Oba sa fixed na dole ekranu. Gdy uzytkownik scrolluje i nie zaakceptowal cookies, cookie banner zaslania floating CTA. **ALE** — cookie banner jest renderowany PO `</script>`, wiec JS probuje nim sterowac ZANIM istnieje w DOM (bo skrypt jest wyzej niz HTML bannera).

   **Fix krytyczny:** Przenies HTML cookie bannera PRZED tag `<script>`, albo (lepiej) przenies caly JS cookie consent na koniec, po bannerze.

   Ale to nie jedyny problem — po zaakceptowaniu cookies, floating CTA przejmuje pozycje na dole. To blokuje tresc na malym ekranie. Na 480px floating CTA ma `flex-direction: column` i zajmuje ~120px wysokosci.

   **Fix:** Dodaj `padding-bottom` do body gdy floating CTA jest widoczny, lub zmniejsz floating CTA na mobile:
   ```css
   @media (max-width: 480px) {
     .floating-cta {
       padding: 0.5rem 0.8rem;
       gap: 0.4rem;
     }
     .floating-cta .btn-primary,
     .floating-cta .btn-ghost {
       padding: 0.6rem 1rem;
       font-size: 0.82rem;
     }
   }
   ```

2. **NAV-LINKS FONT SIZE (P2)** — `0.72rem` na bazie 18px = ~13px. Na mobile (16px base) = ~11.5px. To jest na granicy czytelnosci. Ale nav-links jest ukryty na mobile (hamburger), wiec OK.

3. **EBOOK COVER TRANSFORM (P2)** — `transform: rotate(-2deg)` na mobile moze powodowac lekkie obciecie krawedzi na niektorych urzadzeniach.

---

## SOCZEWKA 4: UX COPY & MIKROINTERAKCJE

### Ocena: 4/5 — NAJLEPSZA CZESC STRONY

**Co jest doskonale:**
- Ton jest unikalny, zapamietywalny, polaryzujacy (celowo) — to dobrze
- Naglowki sa mocne i jasne
- Hero copy trafia w target audience od pierwszego zdania
- FAQ odpowiada na realne obiekcje (nie „Jak dlugo trwa dostawa")

**Problemy:**

1. **CTA CONFUSION (P1)** — Dwa glowne CTA: „Pobierz darmowego ebooka" i „Umow 15-min rozmowe" — oba prowadza do TEGO SAMEGO formularza kontaktowego (#contact). Uzytkownik nie wie czym sie roznia. To samo w floating CTA bar.

   **Fix:** Zrob oddzielny flow dla ebooka (tylko email) i oddzielny dla rozmowy (pelny formularz). Lub zmien CTA na:
   - Primary: „Wyslij mi ebooka" (email only)
   - Secondary: „Porozmawiajmy" (formularz)

2. **COOKIE BANNER BRAK POLSKICH ZNAKOW (P1)** — Tekst bannera to: „Ta strona korzysta z plikow cookie" — bez polskich znakow (ó, ę, ą). „Akceptuje" zamiast „Akceptuję". „Wiecej" zamiast „Więcej".

   **Fix:**
   ```html
   <p>Ta strona korzysta z plików cookie (Google Analytics) w celu analizy ruchu. Twoje dane są anonimizowane. <a href="...">Więcej informacji</a>.</p>
   <button class="cookie-btn cookie-btn-accept">Akceptuję</button>
   ```

3. **SCROLL-TO-FORM FOCUSES EMAIL (P2)** — Klikniecie „Pobierz darmowego ebooka" scrolluje do #contact i po 600ms focusuje pole EMAIL. To pomija pole IMIE. Powinno focusowac IMIE bo jest pierwszy w formularzu.

   **Fix:**
   ```javascript
   // Linia ~2163: zmien 'email' na 'name'
   var nameInput = document.getElementById('name');
   if (nameInput) nameInput.focus();
   ```

---

## SOCZEWKA 5: DOSTEPNOSC (WCAG)

### Ocena: 3.5/5

**Co jest dobre:**
- Skip link jest
- `aria-label` na nawigacji, hamburgerze, mobile menu
- `aria-hidden="true"` na dekoracyjnych elementach
- `role="dialog"` na mobile menu
- `lang="pl"` / `lang="en"` na HTML
- `hreflang` alternates sa
- Focus-visible z outline 3px — dobry

**Problemy:**

1. **KONTRAST (P1)** — `var(--text-secondary): #8B8B8B` na `var(--bg-deep): #0D0D0D`:
   - Kontrast: **5.3:1** — PASS dla normalnego tekstu (minimum 4.5:1)
   - Ale `var(--text-muted): #6B7280` na `#0D0D0D` = **3.8:1** — **FAIL** dla normalnego tekstu
   - Dotyczy: labeli formularza, stat-labels, credentials, footer copy, footer links

   **Fix:**
   ```css
   :root {
     --text-muted: #9CA3AF; /* z 6B7280 na 9CA3AF = kontrast ~5.5:1 */
   }
   ```

2. **BRAK ARIA-LIVE NA FORMULARZU (P2)** — Komunikat sukcesu/bledu nie jest oznaczony `aria-live="polite"`. Screen reader nie przeczyta go automatycznie.

   **Fix:**
   ```html
   <div class="form-success" id="formSuccess" role="status" aria-live="polite">
   ```

3. **TICKER ANIMATION (P2)** — Ticker (marquee) nie zatrzymuje sie dla `prefers-reduced-motion: reduce`.

   **Fix:**
   ```css
   @media (prefers-reduced-motion: reduce) {
     .ticker-track { animation: none; }
     .hero .reveal, .reveal { transition-duration: 0s; }
   }
   ```

4. **COOKIE BANNER NIE MA FOCUS TRAP (P2)** — Gdy banner jest widoczny, uzytkownik moze TAB-em przejsc za niego. Wg RODO i WCAG, dialog powinien trapowac focus.

---

## TOP 10 FIXOW — OD NAJWAZNIEJSZEGO

| # | Priorytet | Problem | Czas |
|---|-----------|---------|------|
| 1 | P0 | Cookie banner jest PONIZEJ scriptu — JS go nie znajdzie przy pierwszym uzyciu | 15 min |
| 2 | P0 | „Pobierz ebooka" prowadzi do formularza kontaktowego — disconnect | 30 min |
| 3 | P0 | Brak zdjecia autora na stronie osobistej | 5 min (jak masz zdjecie) |
| 4 | P1 | Falszywy social proof — scenariusze udajace testimoniale | 20 min |
| 5 | P1 | LinkedIn placeholder link (linkedin.com zamiast profilu) | 2 min |
| 6 | P1 | Cookie banner bez polskich znakow | 5 min |
| 7 | P1 | Kontrast --text-muted za niski (3.8:1 vs wymagane 4.5:1) | 2 min |
| 8 | P1 | alert() zamiast inline error message | 15 min |
| 9 | P2 | Brak aria-live na komunikatach formularza | 2 min |
| 10 | P2 | Ticker nie respektuje prefers-reduced-motion | 5 min |

---

## KOLIZJA FLOATING CTA + COOKIE BANNER — DETALE

To jest krytyczny bug. Oto co sie dzieje:

1. Skrypt cookie consent (linie ~2247-2295 w PL) szuka `document.getElementById('cookie-banner')`
2. HTML cookie bannera jest w liniach ~2298-2303 — **PONIZEJ** zamkniecia `</script>`
3. W momencie wykonania skryptu, element **jeszcze nie istnieje w DOM**
4. Wiec `banner = null`, wiec warunek `else if (banner)` jest false
5. Banner **nigdy sie nie pokaze** dla nowego uzytkownika

**To znaczy ze caly mechanizm RODO/cookie consent jest MARTWY.**

**Fix natychmiastowy:** Przenies `<div id="cookie-banner">` PRZED tag `<script>`, np. zaraz po `<footer>`.

---

## PODSUMOWANIE

| Soczewka | Ocena |
|----------|-------|
| Heurystyki Nielsena | 72/100 |
| Wiarygodnosc | 64/100 (brak zdjecia to killer) |
| Mobile | 76/100 |
| Copy & Mikrointerakcje | 82/100 |
| Dostepnosc | 74/100 |
| **SREDNIA WAZONA** | **74/100 — C+** |

**Strona ma solidny fundament** — design jest czysty, copy jest mocne, struktura jest logiczna. Ale traci na brakach wiarygodnosci (zdjecie, prawdziwy social proof) i na bugach technicznych (cookie banner, formularz). Naprawienie TOP 5 fixow podniesie ocene do B (80+).
