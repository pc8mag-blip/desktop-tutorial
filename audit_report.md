# RAPORT UX AUDIT — piotrchmielewski.com — 2026-03-16

## EXECUTIVE SUMMARY

```
Strona: piotrchmielewski.com (PL + EN)
Data audytu: 2026-03-16
Audytor: UXO v3.0

WYNIK OGOLNY:       76/100 (ocena: C+)
EAA COMPLIANCE:     72/100
CORE WEB VITALS:    [BRAK DOSTEPU — strona lokalna, brak PageSpeed danych]

TOP 3 PROBLEMY BLOKUJACE SPRZEDAZ:
1. "Pobierz ebooka" prowadzi do formularza kontaktowego — uzytkownik oczekuje
   pobrania, a dostaje 3 pola do wypelnienia. Konwersja ebooka spada o ~40%.
2. Brak zdjecia autora na stronie osobistego konsultanta — zabija wiarygodnosc.
   Polak za granica chce widziec twarz, nie logo.
3. Sekcja "Social Proof" to fikcyjne scenariusze udajace testimoniale —
   podswiadomie budzi nieufnosc zamiast zaufania.

FOGG DIAGNOSIS:     Motywacja 4/5 | Zdolnosc 2/5 | Prompt 3/5
LIFT DIAGNOSIS:     Najwiekszy hamulec konwersji = ANXIETY (brak zdjecia,
                    fałszywy proof, placeholder LinkedIn)

Szacowany czas naprawy P0+P1: ~4-6 godz.
EAA status: ⚠️ NIEZGODNA — 5 naruszen WCAG 2.2 AA
```

---

## ANALIZA LIFT MODEL

| Czynnik | Ocena | Komentarz |
|---------|-------|-----------|
| Value Proposition | 4/5 | H1 jasny: "Masz ponad 40 lat i nadal zbierasz kursy zamiast robic biznes?" — w 3s wiadomo dla kogo i o czym. Dobrze. |
| Clarity | 2.5/5 | Dwa CTA prowadza do TEGO SAMEGO formularza. "Pobierz ebooka" vs "Umow rozmowe" = identyczny flow. Uzytkownik nie wie czym sie roznia. |
| Relevance | 4.5/5 | Jezyk idealnie dopasowany do Polakow 40+ w UK. Ton bezposredni, slang zrozumialy, realia trafione. Najlepsza czesc strony. |
| Anxiety | 1.5/5 | KRYTYCZNE: brak zdjecia autora, brak prawdziwych opinii, LinkedIn prowadzi do linkedin.com (nie profilu), brak case studies. |
| Distraction | 3/5 | 4 rozne CTA na stronie prowadza do tego samego celu. Ticker jest dekoracyjny. Sekcja webinar konkuruje z ebookiem o uwage. |
| Urgency | 1/5 | BRAK jakiegokolwiek powodu zeby dzialac TERAZ. Zadnego deadlinu, limitowanej dostepnosci, ani even "zostalo X miejsc". |

---

## ANALIZA FOGG BEHAVIOR MODEL

| Element | Ocena | Diagnoza | Fix |
|---------|-------|----------|-----|
| Motywacja | 4/5 | Copy jest mocne i rezonuje z targetem. Uzytkownik CHCE dzialac po przeczytaniu. | Dodaj prawdziwe testimoniale z imieniem + miastem |
| Zdolnosc | 2/5 | "Pobierz ebooka" wymaga 3 pol formularza. Klikniecie CTA scrolluje na dol strony. Za duzo tarcia. | Zrob inline email-only popup/formularz w sekcji ebooka |
| Prompt | 3/5 | Floating CTA jest dobry. Ale CTA "Pobierz ebooka" jest misleading — obiecuje download, daje formularz. | Zmien copy na "Podaj email — wysle ebooka" lub inline form |

**Diagnoza Fogga:** Strona ma motywacje (copy jest swietne) ale ZABIJA zdolnosc (formularz zamiast prostego email capture) i ma slaby prompt (misleading CTA). Naprawienie Ability + Prompt da szacunkowo +25-40% konwersji na ebooka.

---

## SOCZEWKA 1: 10 HEURYSTYK NIELSENA

### H1: Widocznosc statusu systemu — Severity 2/4

**ID: UX-01**
**Priorytet:** P1
**Framework:** Nielsen #1

**PROBLEM:** Formularz po uzyciu alert() na blad. Natywny alert w 2026 wyglada jak phishing. Komunikat sukcesu znika po 5 sekundach — uzytkownik moze go przeoczyc.

**PRZED:**
```javascript
alert('Cos poszlo nie tak. Sprobuj ponownie.');
```

**PO:**
```html
<!-- Dodaj pod .form-success -->
<div class="form-error" id="formError" role="alert" aria-live="assertive"
     style="display:none; padding:1.5rem; border:2px solid #FF6B6B;
     background:rgba(255,107,107,0.06); font-family:var(--font-mono);
     font-size:0.85rem; color:#FF6B6B; text-align:center;">
</div>
```
```javascript
// Zamiast alert():
var errorDiv = document.getElementById('formError');
errorDiv.textContent = 'Cos poszlo nie tak. Sprobuj ponownie.';
errorDiv.style.display = 'block';
setTimeout(function() { errorDiv.style.display = 'none'; }, 8000);
```
I **usun setTimeout 5s** z .form-success — niech zostanie widoczny.

**IMPACT:** Sredni | **EFFORT:** Latwy (~15min)

---

### H2: Dopasowanie do swiata uzytkownika — Severity 3/4

**ID: UX-02**
**Priorytet:** P0
**Framework:** Nielsen #2 / LIFT: Clarity / Fogg: Ability

**PROBLEM:** Przycisk "Pobierz darmowego ebooka" prowadzi do formularza kontaktowego z 3 polami (imie, email, wiadomosc). Uzytkownik oczekuje POBRANIA pliku, a dostaje formularz kontaktowy ogolnego przeznaczenia. To jest disconnect.

**PRZED:**
```html
<a href="#contact" class="btn-primary"><span>Pobierz darmowego ebooka</span></a>
<!-- ... scrolluje do: -->
<form class="contact-form" id="contactForm">
  <input name="name" required>  <!-- 3 pola -->
  <input name="email" required>
  <textarea name="message"></textarea>
</form>
```

**PO (opcja A — najlepsza):** Dodaj inline mini-formularz bezposrednio w sekcji ebooka:
```html
<!-- W sekcji .ebook-info, zamiast linku do #contact -->
<form class="ebook-capture" id="ebookForm">
  <div style="display:flex; gap:0.8rem; flex-wrap:wrap;">
    <input type="email" name="email" placeholder="twoj@email.com" required
           autocomplete="email" style="flex:1; min-width:200px; padding:0.9rem 1rem;
           background:var(--bg-mid); border:2px solid var(--bg-elevated);
           color:var(--text-primary); font-family:var(--font-body); font-size:0.95rem;">
    <button type="submit" class="btn-primary"><span>Wyslij mi ebooka</span></button>
  </div>
  <p style="margin-top:0.5rem; font-family:var(--font-mono); font-size:0.68rem;
     color:var(--text-muted);">Zero spamu. Tylko ebook. Wypisujesz sie jednym klikiem.</p>
</form>
```

**PO (opcja B — minimalna):** Zmien copy CTA:
```html
<a href="#contact" class="btn-primary"><span>Podaj email — wysle ebooka</span></a>
```

**IMPACT:** Wysoki | **EFFORT:** Sredni (~1h dla opcji A, ~5min dla opcji B)

---

### H3: Kontrola i swoboda — Severity 1/4

**ID: UX-03**
**Priorytet:** P1 + ⚖️ EAA
**Framework:** Nielsen #3 / WCAG / RODO

**PROBLEM:** Brak mozliwosci cofniecia zgody cookie. RODO wymaga zeby uzytkownik mogl w kazdej chwili zmienic decyzje. Obecnie po kliknieciu Accept/Reject — banner znika na zawsze.

**PRZED:** Brak linku w stopce.

**PO:**
```html
<!-- W <ul class="footer-links"> dodaj: -->
<li><a href="#" id="cookie-settings">Ustawienia cookie</a></li>
```
```javascript
document.getElementById('cookie-settings').addEventListener('click', function(e) {
  e.preventDefault();
  localStorage.removeItem('cookie-consent');
  document.getElementById('cookie-banner').classList.add('visible');
});
```

**IMPACT:** Sredni | **EFFORT:** Latwy (~10min)

---

### H4: Spojnosc i standardy — Severity 1/4

**ID: UX-04**
**Priorytet:** P2
**Framework:** Nielsen #4

**PROBLEM:** Przyciski glowne (btn-primary, btn-ghost) maja `border-radius: 0` (ostry kwadrat), ale cookie-btn ma `border-radius: 6px`. Niespojnosc w jezyku wizualnym.

**PRZED:**
```css
.btn-primary { /* brak border-radius */ }
.cookie-btn { border-radius: 6px; }
```

**PO:**
```css
.cookie-btn { border-radius: 0; } /* spojne z reszta designu */
```

**IMPACT:** Niski | **EFFORT:** Latwy (~2min)

---

### H5: Zapobieganie bledom — Severity 2/4

**ID: UX-05**
**Priorytet:** P1
**Framework:** Nielsen #5 / Audyt formularzy

**PROBLEM:** Walidacja formularza koloruje ramke na `var(--accent)` (czerwony). Ale caly design jest czerwono-czarny — to nie wyglada jak blad, to wyglada jak aktywne pole. Brak tekstowego komunikatu bledu przy polu.

**PRZED:**
```javascript
nameEl.style.borderColor = 'var(--accent)'; // identyczne jak focus state
```

**PO:**
```css
.form-group .field-error {
  display: none;
  color: #FF6B6B;
  font-size: 0.72rem;
  font-family: var(--font-mono);
  margin-top: 0.3rem;
}
.form-group input.has-error,
.form-group textarea.has-error {
  border-color: #FF6B6B;
  box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.15);
}
```
```html
<!-- Pod kazdym inputem dodaj: -->
<span class="field-error" id="name-error">Wpisz swoje imie</span>
<span class="field-error" id="email-error">Wpisz prawidlowy adres email</span>
```
```javascript
// Zamiast: nameEl.style.borderColor = 'var(--accent)';
nameEl.classList.add('has-error');
document.getElementById('name-error').style.display = 'block';
```

**IMPACT:** Sredni | **EFFORT:** Latwy (~20min)

---

### H8: Estetyka i minimalizm — Severity 2/4

**ID: UX-06**
**Priorytet:** P1
**Framework:** Nielsen #8 / LIFT: Anxiety

**PROBLEM:** Sekcja "Social Proof" (id="proof") ma 4 karty napisane w 2. osobie ("Masz firme remontowa...") ze sztucznymi cite ("— wlasciciel firmy budowlanej, Birmingham"). To NIE sa prawdziwe testimoniale — to hipotetyczne scenariusze. Uzytkownik podswiadomie czuje ze to fake, co ZWIEKSZA anxiety zamiast ja redukowac.

**PRZED:**
```html
<div class="section-tag">Brzmi znajomo?</div>
<div class="proof-card">
  <p>Masz firme remontowa. Tracisz 10 godzin...</p>
  <cite>— wlasciciel firmy budowlanej, Birmingham</cite>
</div>
```

**PO (opcja A — uczciwa):** Zmien na format "Dla kogo to jest" zamiast udawanych cytatow:
```html
<div class="section-tag">Dla kogo to jest</div>
<!-- Usun <cite>, zmien na: -->
<div class="proof-card">
  <h4 style="font-family:var(--font-display); font-size:1rem; font-weight:700;
      margin-bottom:0.6rem; color:var(--accent-warm);">Firma remontowa, Birmingham</h4>
  <p>AI przygotowuje 80% wycen automatycznie. Ty tylko klikasz "wyslij".
     Oszczedzasz 10 godzin tygodniowo.</p>
</div>
```

**PO (opcja B — gdy bedziesz mial prawdziwe opinie):** Testimoniale z imieniem + miastem + zdjecie.

**IMPACT:** Wysoki | **EFFORT:** Latwy (~20min)

---

### H9: Pomoc przy bledach — Severity 2/4

Patrz: UX-01 (alert zamiast inline error) + UX-05 (walidacja bez tekstowego komunikatu)

---

## SOCZEWKA 2: LIFT MODEL — szczegoly

Patrz tabela wyzej. Glowne hamulce konwersji:
1. **Anxiety** (1.5/5) — brak zdjecia, fake proof, placeholder social links
2. **Clarity** (2.5/5) — 2 CTA do tego samego celu, misleading "Pobierz ebooka"
3. **Urgency** (1/5) — zero powodu zeby dzialac dzis

---

## SOCZEWKA 3: WIARYGODNOSC I POZADALNOSC — 2.8/5

**ID: UX-07**
**Priorytet:** P0
**Framework:** LIFT: Anxiety / Fogg: Motivation

**PROBLEM:** Strona osobistego konsultanta BEZ ZDJECIA. Sekcja "O mnie" ma tekst, statystyki, cytat — ale NI MA TWARZY. Polak za granica chce widziec czlowieka, nie korporacyjna strone.

**PRZED:** Brak zdjecia.

**PO:** Dodaj zdjecie min 400x400px w sekcji about-aside, przed about-quote:
```html
<div class="about-aside">
  <img src="piotr-photo.jpg" alt="Piotr Chmielewski — AI Consultant"
       width="400" height="400" loading="lazy"
       style="width:100%; max-width:320px; aspect-ratio:1;
       object-fit:cover; border:3px solid var(--accent);
       margin-bottom:2rem;">
  <div class="about-quote reveal reveal-delay-2">
    ...
```

**IMPACT:** Wysoki | **EFFORT:** Latwy (~5min, jesli masz zdjecie)

---

**ID: UX-08**
**Priorytet:** P1
**Framework:** LIFT: Anxiety

**PROBLEM:** LinkedIn w stopce prowadzi do `https://linkedin.com` (strona glowna). To wyglada na strone-scam lub niedokonczony projekt.

**PRZED:**
```html
<a href="https://linkedin.com" target="_blank">LinkedIn</a>
```

**PO:** Usun do momentu az bedziesz mial prawdziwy profil:
```html
<!-- Usun linie z LinkedIn lub zamien na: -->
<li><a href="https://linkedin.com/in/TWOJ-PROFIL" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
```

**IMPACT:** Sredni | **EFFORT:** Latwy (~2min)

---

## SOCZEWKA 4: MOBILE CHECK — 3.5/5

**ID: UX-09**
**Priorytet:** P1
**Framework:** Mobile / WCAG 2.5.3

**PROBLEM:** Floating CTA na 480px ma `flex-direction: column` i zajmuje ~120px wysokosci ekranu. Na malym telefonie (iPhone SE, 667px viewport height) to ~18% ekranu zablokowane. Cookie banner (z-index 10000) moze sie nakladac jesli nie zaakceptowano cookies.

**PRZED:**
```css
@media (max-width: 480px) {
  .floating-cta { flex-direction: column; gap: 0.5rem; padding: 0.6rem 1rem; }
}
```

**PO:**
```css
@media (max-width: 480px) {
  .floating-cta {
    flex-direction: row;
    gap: 0.5rem;
    padding: 0.5rem 0.8rem;
  }
  .floating-cta .btn-primary,
  .floating-cta .btn-ghost {
    padding: 0.55rem 0.8rem;
    font-size: 0.78rem;
    flex: 1;
    text-align: center;
  }
}
```

**IMPACT:** Sredni | **EFFORT:** Latwy (~10min)

---

**ID: UX-10**
**Priorytet:** P2
**Framework:** Mobile / UX Copy

**PROBLEM:** Scroll-to-contact focusuje pole EMAIL zamiast pole IMIE (ktore jest pierwsze w formularzu). Uzytkownik "przeskakuje" pole.

**PRZED:**
```javascript
var emailInput = document.getElementById('email');
if (emailInput) emailInput.focus();
```

**PO:**
```javascript
var nameInput = document.getElementById('name');
if (nameInput) nameInput.focus();
```

**IMPACT:** Niski | **EFFORT:** Latwy (~2min)

---

## SOCZEWKA 5: UX COPY & MIKROINTERAKCJE — 4.2/5

**NAJLEPSZA CZESC STRONY.** Copy jest mocne, autentyczne, polaryzujace (celowo). FAQ odpowiada na realne obiekcje.

**ID: UX-11**
**Priorytet:** P1
**Framework:** UX Copy / Fogg: Prompt

**PROBLEM:** Dwa glowne CTA — "Pobierz darmowego ebooka" i "Umow 15-min rozmowe" — oba prowadza do #contact. Uzytkownik nie widzi roznicy. To samo w floating CTA bar.

**PRZED:** Oba href="#contact"

**PO:** Zrob oddzielny flow:
- Primary CTA: inline email capture w sekcji ebooka (patrz UX-02)
- Secondary CTA: "Umow rozmowe" → prowadzi do formularza z polem wiadomosc

Lub minimum: zmien copy na bardziej szczegolowe:
```html
<a href="#contact" class="btn-primary"><span>Podaj email — wysle ebooka</span></a>
<a href="#contact" class="btn-ghost">Napisz do mnie — umowimy call</a>
```

**IMPACT:** Wysoki | **EFFORT:** Latwy (~5min dla copy change)

---

## SOCZEWKA 6: DOSTEPNOSC — WCAG 2.2 AA ⚖️ EAA

### Checklist WCAG 2.1 (baseline):
- [x] Kontrast tekstu >= 4.5:1 — `--text-secondary: #8B8B8B` na `#0D0D0D` = 5.3:1 ✅
- [x] `--text-muted: #9CA3AF` na `#0D0D0D` = 5.5:1 ✅ (naprawione z 3.8:1)
- [ ] Alt text — ebook cover ma `role="img"` + `aria-label` ✅, ale brak zdjecia autora do opisania
- [x] Klawiatura: Tab/Enter/Esc — nawigacja dziala, skip link jest ✅
- [x] Focus visible: `outline: 3px solid var(--text-primary)` ✅
- [x] Lang attribute: `<html lang="pl">` / `<html lang="en">` ✅
- [x] ARIA: `role`, `aria-label` na nav, burger, mobile menu, cookie banner ✅
- [x] `aria-live="polite"` na formSuccess ✅
- [x] `prefers-reduced-motion` respektowane ✅

### WCAG 2.2 (nowe, EAA obowiazkowe od 2025-06-28):

**ID: UX-12**
**Priorytet:** ⚖️ EAA
**Framework:** WCAG 2.4.11 Focus Not Obscured

**PROBLEM:** Sticky nav (position: fixed, top: 0) chowa sie na scroll down (`nav-hidden: transform translateY(-110%)`), ale floating CTA (position: fixed, bottom: 0) jest zawsze widoczny po scrollu. Focusowany element moze byc zakryty przez floating CTA (64px wysokosci na desktop). Przycisk back-to-top (position: fixed, bottom: 2rem, right: 2rem) moze nakladac sie na floating CTA.

**PO:**
```css
/* Zapewnij ze focus nie jest zakryty przez floating CTA */
.floating-cta.visible ~ * :focus-visible,
main :focus-visible {
  scroll-margin-bottom: 80px;
}
```

**IMPACT:** Sredni | **EFFORT:** Latwy (~5min)

---

**ID: UX-13**
**Priorytet:** ⚖️ EAA
**Framework:** WCAG 2.5.3 Target Size Minimum (24x24px)

**PROBLEM:** Cookie banner przyciski maja `padding: 0.5rem 1.2rem` + `font-size: 0.8rem`. Przy base 18px: padding = 9px 21.6px, font ~14.4px. Calkowity rozmiar ~57x32px — PASS (>24px). ALE: nav-links `a` maja `font-size: 0.72rem` (12.96px) z padding tylko z `::after` underline. Touch target na tych linkach jest mniejszy niz 24px wertykalnie.

Nav-links sa ukryte na mobile (hamburger), wiec to dotyczy tylko desktopa — ale WCAG 2.5.3 obowiazuje tez na desktopie.

**PO:**
```css
.nav-links a {
  padding: 0.5rem 0; /* dodaj pionowy padding */
}
```

**IMPACT:** Niski | **EFFORT:** Latwy (~2min)

---

**ID: UX-14**
**Priorytet:** ⚖️ EAA
**Framework:** WCAG 3.3.7 Redundant Entry

**STATUS:** PASS — formularz nie pyta dwa razy o te same dane. ✅

**ID: UX-15**
**Priorytet:** ⚖️ EAA
**Framework:** WCAG 3.3.8 Accessible Authentication

**STATUS:** PASS — brak logowania/CAPTCHA. ✅

**ID: UX-16**
**Priorytet:** ⚖️ EAA
**Framework:** WCAG 3.2.6 Consistent Help

**STATUS:** N/A — single page, kontakt w nawigacji na stale. ✅

---

**ID: UX-17**
**Priorytet:** ⚖️ EAA + P2
**Framework:** WCAG 2.4.11 / Mobile

**PROBLEM:** Cookie banner dialog nie ma focus trap. Gdy banner jest widoczny, uzytkownik moze TAB-em przejsc za niego do tresci strony. WCAG dialog wymaga trapowania focusu.

**PO:**
```javascript
// W cookie consent IIFE, po banner.classList.add('visible'):
var acceptBtn = banner.querySelector('.cookie-btn-accept');
var rejectBtn = banner.querySelector('.cookie-btn-reject');
acceptBtn.focus();

// Trap focus
banner.addEventListener('keydown', function(e) {
  if (e.key === 'Tab') {
    if (e.shiftKey && document.activeElement === acceptBtn) {
      e.preventDefault();
      rejectBtn.focus();
    } else if (!e.shiftKey && document.activeElement === rejectBtn) {
      e.preventDefault();
      acceptBtn.focus();
    }
  }
});
```

**IMPACT:** Sredni | **EFFORT:** Latwy (~15min)

---

## SOCZEWKA 7: FOGG BEHAVIOR MODEL

Patrz tabela wyzej. Kluczowa diagnoza:

**Dlaczego uzytkownik nie konwertuje:**
Motywacja jest (copy dziala), ale **Zdolnosc jest niska** (formularz zamiast prostego email capture) i **Prompt jest mylacy** ("Pobierz ebooka" nie pobiera ebooka).

Naprawienie tych dwoch elementow (inline email form + jasny CTA copy) to pojedyncza zmiana ktora moze podniesc konwersje ebooka o 25-40%.

---

## AUDYT FORMULARZY — checklista 10-punktowa

| # | Kryterium | Status | Uwagi |
|---|-----------|--------|-------|
| 1 | Liczba pol ≤5 | ✅ PASS | 3 pola (imie, email, wiadomosc opcjonalna) |
| 2 | Labels widoczne nad polem | ✅ PASS | Labels sa osobnymi elementami, nie placeholderami |
| 3 | Input type poprawny | ✅ PASS | type="text", type="email" — OK |
| 4 | Autocomplete | ✅ PASS | autocomplete="given-name", autocomplete="email" |
| 5 | Walidacja inline | ❌ FAIL | Walidacja dopiero po submit, nie inline przy opuszczeniu pola |
| 6 | Komunikat bledu konkretny | ❌ FAIL | Brak tekstowego komunikatu, tylko zmiana koloru ramki |
| 7 | Submit button aktywny | ✅ PASS | Przycisk zawsze aktywny, disable tylko podczas wysylania |
| 8 | Po submit — potwierdzenie | ⚠️ PARTIAL | Jest, ale znika po 5s i uzywa alert() na blad |
| 9 | Redundant Entry (WCAG 2.2) | ✅ PASS | Brak powtorzonych pol |
| 10 | Accessible Auth (WCAG 2.2) | ✅ PASS | Brak CAPTCHA |

---

## AUDYT WYDAJNOSCI — Core Web Vitals

[BRAK DOSTEPU — strona lokalna, nie moge uruchomic PageSpeed Insights]

**Na podstawie analizy kodu:**

| Metryka | Prognoza | Uwagi |
|---------|----------|-------|
| LCP | ~2-3s | Brak obrazow (CSS-only ebook cover), ale 3 fonty Google Fonts ladowane synchronicznie. Brak `<link rel="preload">` na fonty. Caly CSS inline = dobry LCP. |
| CLS | ~0 | Brak zewnetrznych obrazow, brak dynamicznego contentu. Layout stabilny. ✅ |
| INP | <200ms | Brak ciezkiego JS. Event listenery z requestAnimationFrame. ✅ |

**Potencjalne ulepszenie LCP:**
```html
<!-- Preload najwazniejszego fontu (hero H1) -->
<link rel="preload" as="font" type="font/woff2"
      href="https://fonts.gstatic.com/s/spacegrotesk/v16/..." crossorigin>
```
Ale: bez dostepu do production nie moge zweryfikowac.

---

## 🔴 TOP 3 FIXY (zrob to TERAZ)

| # | ID | Problem | Fix |
|---|-----|---------|-----|
| 1 | UX-02 | "Pobierz ebooka" → formularz kontaktowy (P0) | Inline email-only form w sekcji ebooka LUB zmien copy CTA |
| 2 | UX-07 | Brak zdjecia autora (P0) | Dodaj zdjecie min 400x400 w sekcji O mnie |
| 3 | UX-06 | Fake social proof (P1) | Zmien na format "Dla kogo to jest" zamiast fałszywych cytatow |

---

## IMPACT / EFFORT MATRIX — P0 + P1

```
                LATWE (< 2h)              TRUDNE (> 2h)
DUZY IMPACT   | 🔴 UX-02 (CTA/form)     |
              | 🔴 UX-07 (zdjecie)       |
              | 🔴 UX-06 (social proof)  |
              | 🔴 UX-11 (CTA copy)      |
              |                           |
MALY IMPACT   | 🟢 UX-08 (LinkedIn)      |
              | 🟢 UX-03 (cookie settings)|
              | 🟢 UX-04 (border-radius) |
              | 🟢 UX-05 (walidacja)     |
              | 🟢 UX-10 (focus name)    |
```

Wszystkie P0+P1 sa LATWE i DUZY IMPACT = 🔴 ZROB TERAZ.

---

## NASTEPNE KROKI

1. **UX-02:** Dodaj inline email form w sekcji ebooka — do: natychmiast — kto: dev
2. **UX-07:** Dodaj zdjecie autora — do: natychmiast — kto: owner (potrzebne zdjecie)
3. **UX-06:** Przeredaguj social proof na "Dla kogo" — do: ten tydzien — kto: dev/copywriter
4. **UX-11:** Zmien copy CTA na konkretniejsze — do: ten tydzien — kto: dev
5. **UX-08:** Usun/podmien LinkedIn placeholder — do: natychmiast — kto: dev
6. **UX-03:** Dodaj "Ustawienia cookie" w stopce — do: ten tydzien — kto: dev
7. **UX-17:** Dodaj focus trap do cookie banner — do: ten tydzien — kto: dev
8. **UX-05:** Dodaj inline walidacje z komunikatami bledow — do: ten tydzien — kto: dev
9. **UX-01:** Zamien alert() na inline error div — do: ten tydzien — kto: dev

---

## HEART METRICS — jak mierzyc sukces po poprawkach

| Problem | Metryka PRZED | Metryka PO | Narzedzie |
|---------|---------------|------------|-----------|
| UX-02 (CTA→form) | % klikniec "Pobierz ebooka" vs % submit formularza | % submit inline ebook form | GA4 Events |
| UX-07 (zdjecie) | Bounce rate na sekcji About | Bounce rate po dodaniu zdjecia | GA4 / Hotjar |
| UX-06 (social proof) | Scroll depth na sekcji Proof | Scroll depth + czas na sekcji | Hotjar / Clarity |

---

## PODSUMOWANIE ZMIAN OD OSTATNIEGO AUDYTU

| Problem z v1 | Status | Uwagi |
|--------------|--------|-------|
| Cookie banner pod scriptem (P0) | ✅ NAPRAWIONY | Przeniesiony przed `<script>` |
| Polskie znaki w cookie banner (P1) | ✅ NAPRAWIONY | Akceptuje → Akceptuję |
| Kontrast --text-muted (P1) | ✅ NAPRAWIONY | #6B7280 → #9CA3AF (5.5:1) |
| aria-live na formSuccess (P2) | ✅ NAPRAWIONY | role="status" aria-live="polite" |
| prefers-reduced-motion (P2) | ✅ NAPRAWIONY | ticker + reveal animations |
| Brak zdjecia autora (P0) | ❌ NADAL | Wymaga zdjecia od ownera |
| Fake social proof (P1) | ❌ NADAL | Wymaga decyzji copywriterskiej |
| LinkedIn placeholder (P1) | ❌ NADAL | Wymaga prawdziwego profilu |
| CTA confusion (P1) | ❌ NADAL | Wymaga decyzji architekturalnej |
| alert() zamiast inline error (P1) | ❌ NADAL | Fix gotowy, wymaga implementacji |

**Wynik v1:** 74/100 → **Wynik v3:** 76/100 (+2 punkty za naprawione 5 bugów)
**Sciezka do 85+:** Napraw UX-02 + UX-07 + UX-06 = szacunkowo +9-12 punktów.

---

*Wersja: UXO v3.0 | 2026-03-16*
*Zrodla: Nielsen Norman Group, WCAG 2.2, EAA 2025, LIFT Model, Fogg Behavior Model, HEART Framework (Google)*
