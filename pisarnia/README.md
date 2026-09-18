# Pisarnia — modułowe narzędzie do pisania książek

Jeden plik: `pisarnia/index.html`. Otwórz w przeglądarce (lokalnie lub przez GitHub Pages pod `/pisarnia/`). Nie wymaga serwera ani instalacji.

## Jak to działa

1. **Wklej cegiełkę** — wklejasz fragment (scena, dialog, opis, karta postaci, wydarzenie, notatka). Tagujesz go nagłówkiem w tekście albo formularzem.
2. Narzędzie **umieszcza fragment w odpowiednim miejscu** struktury (rozdział › scena, na końcu lub na początku) albo w Biblii świata (postacie, miejsca, wątki, oś czasu).
3. **Rękopis** — wszystkie fragmenty scalone w jeden ciągły tekst w kolejności książki. Czytasz jednym ciągiem, w trybie edycji klikasz fragment i poprawiasz. Eksport do `.md`, `.txt`, druk / PDF.
4. **Struktura** — rozdziały, akty, sceny z kartą (cel · konflikt · wynik · zmiana), beaty struktury trzyaktowej, przenoszenie fragmentów między scenami, Skrzynka na nieprzypisane.
5. **Zasady i diagnostyka** — ściąga z warsztatu pisarskiego i automatyczne sprawdzenie projektu: proporcje aktów, brakujące beaty, sceny bez konfliktu lub POV, skoki POV w scenie, postacie bez karty, słowa‑filtry, powtórzenia.

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

## Zapis danych

Projekt zapisuje się automatycznie w przeglądarce (localStorage). Przycisk **Eksport JSON** robi kopię zapasową do pliku, **Import JSON** ją wczytuje. Dane nie opuszczają Twojego komputera.
