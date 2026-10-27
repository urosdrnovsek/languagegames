# Language Games

Free reading games for children aged 5–7, in **English**, **Slovenian**,
**German**, **French** and **Spanish**.
Every picture is a hand-drawn SVG, so the games need no image files, no
internet connection beyond loading the page, and no build step.

- **First Letter** (`games/letter-sounds/`): see a picture, hear the word, tap the letter it starts with.
- **Read and Match** (`games/picture-word/`): read three words and pick the one for the picture. Later rounds use words with the same first letter, so the child has to read the whole word.
- **Build the Word** (`games/build-word/`): tap letters to spell the pictured word. Words get longer as the game goes on, and from round 5 there is an extra letter that doesn't belong.
- **Picture Hunt** (`games/picture-hunt/`): read a list of 10 words and find each one's picture among 20 tiles within 3 minutes. Found words are crossed out; tapping a word reads it aloud. Stars depend on the time left.
- **Word Book** (`words.html`): every picture and word; tap one to hear it.

The round-based games have 8 rounds drawn at random from a bank of 103 pictured words
(animals, food, toys and things, nature, body), so every play-through is
different. German nouns keep their capital letter.

No ads, no tracking, no accounts, no cookies, and nothing is sent anywhere.
The only things stored are the chosen language and the sound on/off setting,
in the browser's local storage.

## Running it

Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Publishing on a website

Upload the whole folder as-is (any static host works: GitHub Pages, Netlify,
or a normal web server). Keep the folder structure: the games load their
shared files from `shared/`.

### Embedding one game on another site

```html
<iframe
  src="https://YOUR-HOST/languagegames/games/build-word/index.html?lang=sl&home=0"
  width="100%" height="720" style="border:0; max-width:760px"
  title="Build the Word" allow="autoplay"></iframe>
```

URL options:

| Option | Values | Effect |
|---|---|---|
| `lang` | `en`, `sl`, `de`, `fr`, `es` | Language. Without it, the game uses the last choice, then the browser language. |
| `home` | `0` | Hides the button back to the game list (use it when embedding a single game). |

## Speech

Words are read aloud with the browser's built-in speech voices
(`speechSynthesis`). English, German, French and Spanish voices exist on
almost every phone, tablet and computer. Slovenian voices are much rarer:
Windows usually has one, but iPhones, iPads and most Android phones don't.
On Linux, browsers need `speech-dispatcher` and a voice engine such as
`espeak-ng` installed. `voice-test.html` shows which voices a browser has. When there is no voice for the chosen language, the
games stay silent rather than read Slovenian with an English accent, and a
note on the start screen says so. Every game can be played without sound.

## Adding words and pictures

1. Draw the picture in `shared/pictures.js` (`P.name = '...svg shapes...'`, 100×100 viewBox).
2. Add a row to the table in `shared/words.js`:
   `name | word | beseda | Wort | mot | palabra` (en, sl, de, fr, es).

The First Letter game automatically skips words whose first letter doesn't
match their first sound (*sheep*, *Schaf*, *chat*, *huevo*…), using the rules
in `SKIP_FIRST`. Add exceptions the rules miss to `SKIP_FIRST_WORDS`.

All games and the Word Book pick up new entries automatically. Build the Word
only uses single words of up to 5 letters.

## Adding a language

1. In `shared/words.js`: add the code to `LG.LANGS`, a column to the table,
   and entries in `SKIP_FIRST` and `LG.ALPHABET`.
2. In `shared/engine.js`: add the game text to `TEXT`, the voice to
   `SPEECH_LANG`, and the name to `LANG_NAMES`.

## Files

```
index.html            game list
words.html            Word Book
voice-test.html       shows which speech voices a browser has
games/*/index.html    one page per game
games/*/game.js       game rules
shared/engine.js      language, text, speech, sounds, game shell
shared/pictures.js    all pictures (SVG)
shared/words.js       word bank (all five languages)
shared/styles.css     shared styles
```

## License

[MIT](LICENSE): free to use, copy, change and publish, including the
pictures and word lists, as long as the copyright notice is kept.
