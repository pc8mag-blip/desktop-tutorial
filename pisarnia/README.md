# Pisarnia — modułowe narzędzie do pisania książek

Jeden plik: `pisarnia/index.html`. Otwórz w przeglądarce (lokalnie lub przez GitHub Pages pod `/pisarnia/`). Nie wymaga serwera ani instalacji.

## Jak to działa

0. **Proces** — 27 kroków w 8 fazach wg metody Katarzyny Bondy (*Maszyna do pisania. Kurs kreatywnego pisania*): temat → bohater → świat → plan fabuły → narracja → pisanie → kwarantanna → przepisywanie → krytycy → wydawca. Każdy krok ma checkbox, streszczenie instrukcji, odwołanie do rozdziału książki i arkusz roboczy (prasówka, 6 poziomów dramaturgii, treatment A4, 4 pytania, 11 punktów fabuły, 8 sekwencji, narracja, dziennik pisania, kwarantanna z licznikiem dni, pakiet dla wydawcy z eksportem, umowa, czekanie). Z 11 punktów jednym przyciskiem budujesz szkielet struktury.
1. **Wklej cegiełkę** — wklejasz fragment (scena, dialog, opis, karta postaci, wydarzenie, notatka). Tagujesz go nagłówkiem w tekście albo formularzem.
2. Narzędzie **umieszcza fragment w odpowiednim miejscu** struktury (rozdział › scena, na końcu lub na początku) albo w Biblii świata (postacie, miejsca, wątki, oś czasu).
3. **Rękopis** — wszystkie fragmenty scalone w jeden ciągły tekst w kolejności książki. Czytasz jednym ciągiem, w trybie edycji klikasz fragment i poprawiasz. Eksport do `.md`, `.txt`, druk / PDF.
4. **Struktura** — rozdziały przypisane do jednej z 8 sekwencji (3 akty), sceny z kartą wg reguł sceny Bondy (czyja · o czym · cel · konflikt · 2 punkty zwrotne · wynik · hak · zmiana), punkt fabuły dla sceny z dwóch schematów: 11 punktów Bondy albo 12 etapów drogi bohatera (Campbell/Vogler). Przenoszenie fragmentów między scenami, Skrzynka na nieprzypisane.
5. **Biblia świata** — karta postaci: archetyp (mentor, strażnik progu, zwiastun, zmiennokształtny, cień, sprzymierzeniec, trickster), CHCĘ / PRAGNĘ / RYSA, łuk, głos oraz kwestionariusz bohatera (42 pytania) z licznikiem wypełnienia. Miejsca, wątki, oś czasu, notatki.
6. **Zasady i diagnostyka** — ściąga z metody Bondy (bohater, 3 akty / 8 sekwencji / 11 punktów, 13 zasad sceny, narracja, dialog, świat, 6 poziomów, dekalog, redakcja, wydanie) i automatyczne sprawdzenie projektu: postęp procesu, sekwencje bez rozdziału, proporcje aktów, punkty fabuły bez sceny lub bez treści w planie, scena w złej sekwencji, karty scen bez konfliktu / haka / tematu, skoki POV, postacie bez CHCĘ/PRAGNĘ/rysy, kwestionariusz, słowa‑filtry, powtórzenia.

## Nagłówek tagów

Pierwsze linie wklejanego tekstu zaczynające się od `#`:

```
#typ: dialog #rozdział: 3 #scena: 2 #postać: Anna, Marek #pov: Anna #miejsce: dworzec #tagi: napięcie, zwrot
— Spóźniłeś się — powiedziała Anna.
```

| Tag | Znaczenie |
|---|---|
| `#typ:` | `scena` (proza/akcja), `dialog`, `opis`, `monolog`, `postać`, `miejsce`, `przedmiot`, `wątek`, `wydarzenie`, `notatka`, `pomysł` |
| `#rozdział:` | numer lub tytuł; nieistniejący zostanie utworzony |
| `#scena:` | numer, tytuł lub `nowa` |
| `#pozycja:` | `początek` lub `koniec` sceny (domyślnie koniec) |
| `#postać:` | postacie występujące we fragmencie (po przecinku) |
| `#pov:` | czyimi oczami widziana jest scena |
| `#miejsce:` | lokacja (trafia też do Biblii › Miejsca) |
| `#nazwa:` | nazwa karty dla typów `postać`, `miejsce`, `wątek`, `przedmiot` |
| `#tagi:` | dowolne etykiety |
| `#kiedy:` | chronologia dla `wydarzenie` (np. `dzień 3`, `1994-05`) |
| `#status:` | `szkic`, `redakcja`, `gotowe` |
| `#tytuł:` | etykieta fragmentu |

Skróty: `#r: 3`, `#s: 2`. Bez nagłówka używasz formularza obok; rozdział, scena, POV i miejsce zostają ustawione na kolejne wklejenie.

## Źródło metody

Kroki, arkusze i reguły to streszczenie metody z książki Katarzyny Bondy *Maszyna do pisania. Kurs kreatywnego pisania* (nie cytaty). Przy każdym kroku podany jest rozdział, do którego warto wrócić po szczegóły.

## Zapis danych

Projekt zapisuje się automatycznie w przeglądarce (localStorage). Przycisk **Eksport JSON** robi kopię zapasową do pliku, **Import JSON** ją wczytuje. Dane nie opuszczają Twojego komputera.
