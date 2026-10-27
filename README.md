# Language Games

Free reading games for children aged 5–7, in **English** and **Slovenian**.
Every picture is a hand-drawn SVG, so the games need no image files, no
internet connection beyond loading the page, and no build step.

- **First Letter** (`games/letter-sounds/`): see a picture, hear the word, tap the letter it starts with.
- **Read and Match** (`games/picture-word/`): read three words and pick the one for the picture. Later rounds use words with the same first letter, so the child has to read the whole word.
- **Build the Word** (`games/build-word/`): tap letters to spell the pictured word. Words get longer as the game goes on, and from round 5 there is an extra letter that doesn't belong.
- **Word Book** (`words.html`): every picture and word; tap one to hear it.

Each game has 8 rounds drawn at random from a bank of 53 pictured words, so
every play-through is different.

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
| `lang` | `en`, `sl` | Language. Without it, the game uses the last choice, then the browser language. |
| `home` | `0` | Hides the button back to the game list (use it when embedding a single game). |

## Speech

Words are read aloud with the browser's built-in speech voices
(`speechSynthesis`). English voices exist on almost every device; Slovenian
voices are available on most phones and on Windows/macOS, but not everywhere.
When there is no voice for the chosen language, the games stay silent rather
than read Slovenian with an English accent. Every game can be played without
sound.

## Adding words and pictures

1. Draw the picture in `shared/pictures.js` (`P.name = '...svg shapes...'`, 100×100 viewBox).
2. Add the words to `shared/words.js`: `{ pic: 'name', en: 'word', sl: 'beseda' }`.
   If the English word's first letter isn't its first sound (like *owl* or *cheese*),
   add `noFirstLetter: ['en']` so the First Letter game skips it.

All games and the Word Book pick up new entries automatically. Build the Word
only uses words of up to 5 letters.

## Adding a language

Add the language to `LANGS`, `TEXT` and `SPEECH_LANG` in `shared/engine.js`,
its alphabet and letter names to `shared/words.js`, a word for each picture in
`LG.VOCAB`, and a button in `LG.langSwitch`.

## Files

```
index.html            game list
words.html            Word Book
games/*/index.html    one page per game
games/*/game.js       game rules
shared/engine.js      language, text, speech, sounds, game shell
shared/pictures.js    all pictures (SVG)
shared/words.js       word bank (English + Slovenian)
shared/styles.css     shared styles
```

## License

[MIT](LICENSE): free to use, copy, change and publish, including the
pictures and word lists, as long as the copyright notice is kept.
