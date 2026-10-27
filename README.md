# Language Games

Free reading games for children aged 5–7, in **English**, **Slovenian**,
**German**, **French** and **Spanish**.
Every picture is a hand-drawn SVG, so the games need no image files, no
internet connection beyond loading the page, and no build step.

- **First Letter** (`games/letter-sounds/`): see a picture, hear the word, tap the letter it starts with.
- **Read and Match** (`games/picture-word/`): read three words and pick the one for the picture. Later rounds use words with the same first letter, so the child has to read the whole word.
- **Build the Word** (`games/build-word/`): tap letters to spell the pictured word. Words get longer as the game goes on, and from round 5 there is an extra letter that doesn't belong.
- **Picture Hunt** (`games/picture-hunt/`): read a list of 10 words and find each one's picture among 20 tiles within 3 minutes. Found words are crossed out; tapping a word reads it aloud. Stars depend on the time left.
- **Memory Pairs** (`games/memory/`): turn over two cards at a time to match each picture with its word.
- **Odd One Out** (`games/odd-one-out/`): three pictures from one topic and one from a different kind of topic; tap the odd one.
- **Balloon Pop** (`games/balloon-pop/`): guess the word's letters before five balloons pop (a gentle hangman).
- **Word Search** (`games/word-search/`): pictured words hidden left-to-right or top-to-bottom in a letter grid; slide over a word or tap its first and last letter.
- **Beat the Clock** (`games/beat-clock/`): 60 seconds to match as many pictures and words as possible; three in a row adds 3 seconds. With `?daily=1` it is the **Daily Challenge**: the same words for everyone today.
- **Word Rain** (`games/word-rain/`): pictures fall; tap the one for the word at the bottom before it lands. Three hearts, and it speeds up.
- **Tug of War** (`games/tug-of-war/`): two players on one tablet, sitting opposite; the first right answer pulls the rope.
- **Team Battle** (`games/teams/`): 2-4 teams take turns on the whiteboard; 2 points for a first-try answer, and if a team gets it wrong the next team can win 1 point.
- **Word Bingo** (`games/bingo/`): the teacher's screen calls words, each child's device shows its own 3 × 3 picture card from the same 24-word deck. No network needed.
- **Word Book** (`words.html`): every picture and word; tap one to hear it.
- **Sticker Album** (`album.html`): a word's sticker is won after answering it right 3 times in any game; one page per topic.
- **Scores** (`scores.html`): personal bests and the device leaderboard for the scored games.
- **Teacher settings** (`settings.html`, the gear on the game list): word
  topics (only animals, only fruit…), class challenge codes, reading fonts,
  coloured letters for b, d, p, q and g, wider letter spacing, calm mode,
  and the players on the device.
  A quick sum keeps children from changing them by accident.

The round-based games have 8 rounds drawn at random from a bank of 413 pictured words in
26 topics (animals, food, clothes, body, family, jobs, home, school, toys,
music, transport, places, weather, nature, seasons, colours, numbers, shapes,
sports, feelings), so every play-through is different. German nouns keep their capital letter. Words for people (jobs, family,
feelings) match the person in the picture: *Ärztin*, *enfermero*, *vesela*.

No ads, no tracking, no accounts, no cookies, and nothing is sent anywhere.
Everything stays in the browser's local storage on that device: the chosen
language, the sound setting, the teacher settings, and players (an animal
avatar with an optional nickname), their scores and stickers.

## Players, scores and challenges

- **Players**: children pick "who is playing" with the avatar button; scores
  and stickers are kept per player on that device. Teachers can remove
  players or delete all scores in the settings.
- **Class challenge**: in the settings, a teacher makes a code such as
  `K7QM-2XAB` for the chosen topics. Children enter it under "Class
  challenge" on the game list (or open the shared link), and every game then
  uses the same words in the same order on every device, so scores can be
  compared fairly. The code holds the topics, a seed and a check digit, so
  most typos are rejected. Nothing is sent over the network.
- **Daily challenge**: Beat the Clock with today's date as the seed, all topics.
- **Calm mode**: hides the race games, Tug of War and the scores, and removes
  the Picture Hunt timer, for children who find competition stressful.

## Class competitions (no internet server)

### Class Scoreboard (works anywhere, offline)

1. On the board, open **Class Scoreboard** (game list → Play together), pick a
   game (Beat the Clock, Word Rain, Memory Pairs, Word Search or Picture Hunt)
   and make the challenge. The topics come from the teacher settings.
2. Children enter the code under **Class Challenge**, or scan the QR code with
   the iPad camera, and play. Everyone gets the same words.
3. Each end screen shows a QR code with the child's avatar, name and score.
   Children hold it up to the teacher's camera; the scoreboard reads it
   (scores from another challenge or game are refused). Scores can also be
   added by hand.
4. **Show the results** puts a podium and the full list on the board.

The scores never leave the teacher's device. QR codes are drawn with
[qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator) (MIT) and
read with [jsQR](https://github.com/cozmo/jsQR) (Apache 2.0), both bundled in
`shared/vendor/` with their licenses.

### Live Classroom (classroom Wi-Fi, teacher's computer)

A live leaderboard while the children play. The teacher's computer runs a
small program (`classroom/classroom.py`, Python standard library only) that
serves the games to the iPads over the classroom Wi-Fi. Nothing is sent to
the internet; players' avatars, names and scores live only in the program's
memory and are gone when it stops.

**Starting it**

1. Download this project (on GitHub: **Code → Download ZIP**) and unzip it.
2. Make sure Python 3 is installed:
   - **Mac**: usually already there. If not, macOS offers to install it the
     first time (the "command line developer tools").
   - **Windows**: install it from [python.org](https://www.python.org/downloads/)
     and tick **"Add python.exe to PATH"**.
3. In the `classroom` folder, double-click **start-classroom.command** (Mac),
   **start-classroom.bat** (Windows) or run `start-classroom.sh` (Linux).
   The first time on a Mac, right-click it and choose **Open**. If the
   computer asks whether to allow incoming network connections, allow it.
4. The board opens in the browser (`http://localhost:8000/live/board.html`).
   Pick a game, open the lobby, and the board shows a QR code and address.
5. Children scan the QR code on their iPads (same Wi-Fi), tap **Join**, and
   wait. Press **Start the game**: every iPad starts the same challenge, and
   the board shows a live leaderboard. **End the game** shows the podium.

Board actions (start, end, remove a player) only work on the teacher's
computer itself. Up to 60 players can join.

**If the iPads can't connect**: many school networks stop devices from
talking to each other ("client isolation"), and only the school's IT can
change that. A phone hotspot from the teacher's phone, with the computer and
iPads joined to it, is a quick workaround. Also check that the computer's
firewall allowed the program.

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
| `font` | `andika`, `opendyslexic`, `lexend`, `atkinson` | Reading font. |
| `colors` | any of `bdpqg`, e.g. `bdpq` | Gives these letters their own colour. |
| `spacing` | `1` | Wider spacing between letters. |
| `topics` | comma-separated topic ids, e.g. `fruit,vegetables` | Only words from these topics. |
| `challenge` | a class challenge code, e.g. `K7QM-2XAB` | Starts that challenge (the same words on every device). |
| `calm` | `1` | Calm mode: no countdowns, records or leaderboards. |
| `daily` | `1` | On Beat the Clock: the Daily Challenge. |

Topic ids: `farm`, `wild`, `water`, `bugs`, `fruit`, `vegetables`, `food`,
`clothes`, `body`, `family`, `jobs`, `home`, `household`, `toys`, `music`,
`school`, `transport`, `places`, `sky`, `nature`, `seasons`, `colours`,
`numbers`, `shapes`, `sports`, `feelings`. With small topics the games repeat words; when a topic
is too small for a game (for example under 4 words for Picture Hunt), that
game also uses words from other topics.

URL options win over the teacher settings saved on the device. The settings
page shows the exact options for the current settings, ready to copy.

## Fonts

The reading fonts are bundled in `shared/fonts/` (no Google Fonts or other
outside requests) under the SIL Open Font License; see the `LICENSE-*.txt`
files there. A device only downloads a font once it's chosen.

- **Andika** (SIL International): designed for beginning readers, with the single-storey a and g.
- **OpenDyslexic** (Abbie Gonzalez): weighted letter bottoms for dyslexic readers.
- **Lexend** (Bonnie Shaver-Troup, Thomas Jockin): designed to improve reading fluency.
- **Atkinson Hyperlegible** (Braille Institute): maximally distinct letter shapes.

Comic Neue was considered but left out: it lacks č, š and ž, so Slovenian
words would mix two fonts.

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
   `name | word | beseda | Wort | mot | palabra` (en, sl, de, fr, es),
   and add the picture name to its topic in `TOPIC_WORDS`.

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
settings.html         teacher settings
album.html            sticker album
scoreboard.html       Class Scoreboard (QR score collection)
live/board.html       Live Classroom board (teacher's computer)
live/join.html        Live Classroom join page (iPads)
classroom/            the Live Classroom program and launchers
scores.html           personal bests and device leaderboard
games/*/index.html    one page per game
games/*/game.js       game rules
shared/engine.js      language, text, speech, sounds, players, scores,
                      stickers, challenge codes, timers, game shell
shared/pictures.js    all pictures (SVG)
shared/words.js       word bank (all five languages)
shared/styles.css     shared styles
shared/fonts/         bundled reading fonts and their licenses
shared/vendor/        bundled QR code libraries and their licenses
```

## License

[MIT](LICENSE): free to use, copy, change and publish, including the
pictures and word lists, as long as the copyright notice is kept.
