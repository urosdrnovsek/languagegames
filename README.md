# Language Games

Free reading and vocabulary games for children aged 5–7, in **English**,
**Slovenian**, **German**, **French** and **Spanish**.

**Play online:** https://urosdrnovsek.github.io/languagegames/

Every picture is a hand-drawn SVG, so the games need no image files, no
accounts and no build step. They run in any modern browser on tablets,
phones, computers and interactive whiteboards.

## At a glance

- **13 games** for learning letters and words, practising, racing the clock
  and playing as a class.
- **413 pictured words in 26 topics**, all in five languages. The teacher can
  limit the games to some topics, for example only fruit and vegetables.
- **Words read aloud** with the device's own speech voices.
- **Reading support** for teachers to switch on: four reading fonts
  (including OpenDyslexic), coloured b, d, p, q and g, wider letter spacing,
  and a calm mode without timers or competition.
- **Players, stickers and scores** on each device: children pick an animal
  avatar, collect stickers for words they know and try to beat their best.
- **Class play without the internet**: class challenge codes, Word Bingo,
  Team Battle on the whiteboard, a QR code Class Scoreboard, and a Live
  Classroom leaderboard over the classroom Wi-Fi.
- **Private by design**: no ads, no tracking, no accounts, no cookies.
  Nothing is sent anywhere.
- **Free and open**: MIT license. Easy to host on any website or embed one
  game in a page.

## The games

**Learn**

| Game | What children do |
|---|---|
| **First Letter** (`games/letter-sounds/`) | See a picture, hear the word, tap the letter it starts with. Words whose first letter doesn't match the first sound (*sheep*, *Schaf*, *chat*) are skipped. |
| **Read and Match** (`games/picture-word/`) | Read three words and pick the one for the picture. Later rounds use words with the same first letter, so the whole word has to be read. |
| **Build the Word** (`games/build-word/`) | Tap letters to spell the pictured word. Words get longer, and from round 5 there is one extra letter that doesn't belong. |
| **Word Book** (`words.html`) | Every picture and word, by topic. Tap one to hear it. |

**Play**

| Game | What children do |
|---|---|
| **Memory Pairs** (`games/memory/`) | Turn over two cards at a time to match each picture with its word. |
| **Odd One Out** (`games/odd-one-out/`) | Three pictures from one topic and one from another: tap the odd one. |
| **Balloon Pop** (`games/balloon-pop/`) | Guess the word's letters before five balloons pop (a gentle hangman). |
| **Word Search** (`games/word-search/`) | Find the pictured words hidden left-to-right or top-to-bottom in a letter grid. Slide over a word, or tap its first and last letter. |
| **Picture Hunt** (`games/picture-hunt/`) | Read a list of 10 words and find each one's picture among 20 tiles within 3 minutes. Found words are crossed out; tapping a word reads it aloud. |

**Race** (hidden in calm mode)

| Game | What children do |
|---|---|
| **Beat the Clock** (`games/beat-clock/`) | 60 seconds to match as many pictures and words as possible. Three in a row adds 3 seconds. |
| **Word Rain** (`games/word-rain/`) | Pictures fall; tap the one for the word at the bottom before it lands. Three hearts, and it speeds up. |
| **Daily Challenge** | Beat the Clock with the same words for everyone today (`?daily=1`). |

**Play together**

| Game | What children do |
|---|---|
| **Team Battle** (`games/teams/`) | 2–4 teams (lion, penguin, frog, bee) take turns on the whiteboard. 2 points for a right first answer; after a wrong answer the next team can steal it for 1 point. 3, 5 or 8 questions per team. |
| **Tug of War** (`games/tug-of-war/`) | Two children on one tablet, sitting opposite each other. The first right answer pulls the rope. |
| **Word Bingo** (`games/bingo/`) | The teacher's screen calls the words; each child's device shows its own 3 × 3 picture card from the same 24-word deck. No network needed. |
| **Class Challenge**, **Class Scoreboard**, **Live Classroom** | Class competitions, see [Playing as a class](#playing-as-a-class). |

The round-based games have 8 rounds drawn at random, so every play-through is
different. Every game can be played without sound.

## Words and pictures

The word bank has 413 pictured words in 26 topics: farm animals, wild
animals, water animals, bugs, fruit, vegetables, food, clothes, body, family,
jobs, home, household, toys, music, school, transport, places, sky and
weather, nature, seasons, colours, numbers, shapes, sports and feelings.

- German nouns keep their capital letter.
- Words for people (jobs, family, feelings) match the person in the picture:
  *Ärztin*, *enfermero*, *vesela*.
- When a chosen topic is too small for a game, that game adds words from
  other topics.

## Teacher settings

The gear on the game list opens the teacher settings (`settings.html`). A
quick sum keeps children from changing them by accident.

- **Word topics**: only the topics the class is working on.
- **Reading font**: Andika, OpenDyslexic, Lexend or Atkinson Hyperlegible
  (see [Fonts](#fonts)).
- **Coloured letters**: b, d, p, q and g each get their own colour, for
  children who mix them up.
- **Letter spacing**: wider spacing between letters.
- **Calm mode**: hides the race games, Tug of War and the scores, and removes
  the Picture Hunt timer, for children who find competition stressful.
- **Class challenge codes** and the **players** on the device.

The settings page also shows the URL options for the current settings, ready
to copy into a link or an embedded game.

## Players, stickers and scores

- **Players**: children pick "who is playing" with the avatar button: an
  animal and an optional nickname. Without one they play as a guest such as
  "Fox 37". Teachers can remove players or delete all scores in the settings.
- **Sticker Album** (`album.html`): a word's sticker is won after answering it
  right 3 times in any game, with one album page per topic.
- **Scores** (`scores.html`): personal bests and the device leaderboard for
  Beat the Clock, Word Rain, Memory Pairs, Word Search and Picture Hunt.

Everything is stored in the browser's local storage on that device only.

## Playing as a class

None of these need an internet server.

| Way | Good for | What you need |
|---|---|---|
| **Class challenge** | Everyone plays the same words, compare scores by hand | Just the games |
| **Word Bingo** | The whole class at once, each child with a device | Just the games |
| **Team Battle** | Teams in front of the whiteboard | One screen |
| **Class Scoreboard** | A podium of the class's scores, collected by QR code | A camera on the teacher's computer or tablet |
| **Live Classroom** | A live leaderboard on the board while the children play | The teacher's computer, Python and a shared Wi-Fi |

### Class challenge

In the settings, a teacher makes a code such as `K7QM-2XAB` for the chosen
topics. Children enter it under **Class Challenge** on the game list (or open
the shared link), and every game then uses the same words in the same order
on every device, so scores can be compared fairly. The code holds the topics,
a seed and a check digit, so most typos are rejected. Nothing is sent over
the network.

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

The children play on their iPads and the board shows a live leaderboard,
then a podium. The teacher's computer runs a small program
(`classroom/classroom.py`) that serves the games to the iPads over the
classroom Wi-Fi. Nothing is sent to the internet: the players' avatars,
names and scores live only in the program's memory and are gone when it
stops.

#### What you need

- **The teacher's computer**: a Mac, Windows PC or Linux computer, ideally
  connected to the projector or whiteboard.
- **Python 3**: free; the program uses only its standard library, so nothing
  else has to be installed.
- **The children's devices**: iPads, or any tablet, phone or Chromebook with a
  browser. Nothing is installed on them.
- **One Wi-Fi network** that the computer and all the devices are connected
  to.

#### One-time setup

1. **Download the games.** On https://github.com/urosdrnovsek/languagegames
   click **Code → Download ZIP**, and unzip it, for example into
   `Documents`. Keep all the folders together.
2. **Check that Python 3 is installed.**
   - **Mac**: open **Terminal** and type `python3 --version`. If a version
     number appears, it's ready. If macOS offers to install the "command line
     developer tools", click **Install** and wait for it to finish.
   - **Windows**: install Python from
     [python.org/downloads](https://www.python.org/downloads/). In the
     installer, tick **"Add python.exe to PATH"** before clicking **Install
     Now**. To check, open **Command Prompt** and type `py --version`.
   - **Linux**: Python 3 is almost always installed; check with
     `python3 --version`.
3. **Start it once to allow it.** Open the `classroom` folder and start the
   launcher for your computer:
   - **Mac**: **right-click** `start-classroom.command` and choose **Open**,
     then **Open** again. (A plain double-click is blocked the first time
     because the file comes from the internet.) If asked whether "python3"
     may accept incoming network connections, click **Allow**.
   - **Windows**: double-click `start-classroom.bat`. If "Windows protected
     your PC" appears, click **More info → Run anyway**. When Windows
     Firewall asks, allow access on **Private networks**. If the school Wi-Fi
     is marked as a *public* network on this computer, tick **Public
     networks** as well.
   - **Linux**: run `classroom/start-classroom.sh` in a terminal.

A black window opens with the addresses, and the board opens in the
browser. From now on a double-click on the launcher is enough.

#### Before the lesson

- Connect the computer and the iPads to the **same Wi-Fi**.
- Choose the **topics** in the teacher settings on the computer
  (the board uses them) and the **language** with the language button on the
  board. The iPads get the same words and language.
- Test with one iPad: scan the code on the board and check that it joins. If
  it doesn't, see [If the iPads can't connect](#if-the-ipads-cant-connect).

#### During the lesson

1. **Start the program** with the launcher. Keep its black window open (it
   can be minimised) for the whole lesson.
2. The board opens at `http://localhost:8000/live/board.html`. If it doesn't,
   type that address in the computer's browser. (If port 8000 is taken, the
   program uses the next free one and shows the address in its window.)
3. **Choose a game** (Beat the Clock, Word Rain, Memory Pairs, Word Search or
   Picture Hunt) and press **Join the class game**. The board shows a QR code
   and an address such as `http://192.168.1.23:8000/live/join.html`.
4. **The children join**: they scan the QR code with the iPad camera (or type
   the address in Safari), choose their animal and name if they want, and
   tap **Join**. Their avatars appear on the board. Tap the **×** on an
   avatar to remove someone who joined by mistake.
5. Press **Start the game**. Every iPad starts the same game with the same
   words, and the board shows a live leaderboard: the most points first for
   Beat the Clock and Word Rain, and finished-and-fastest first for the
   others. The iPads tell the children to look at the board when they finish.
   A child who joins late still gets into the game.
6. Press **End the game** to show the podium and the results.
7. **Another round**: press **New game** and choose a game again. The children
   scan the new QR code (or reload the join page) and tap **Join**.
8. **Finish**: close the program's black window (or press **Ctrl+C** in it).
   All names and scores are deleted.

The board only works on the teacher's computer itself, so children can't
start or end games or remove players from their iPads. Up to 60 players can
join.

#### If the iPads can't connect

| Problem | What to do |
|---|---|
| The iPad can't open the address | Check that the iPad and the computer are on the **same Wi-Fi**. Many school networks stop devices from talking to each other ("client isolation"); only the school's IT can change that. A quick workaround: turn on the **hotspot** on the teacher's phone and connect the computer and the iPads to it. The games need no internet, so this uses almost no mobile data. |
| It worked at home but not at school | The firewall may be blocking the program. On Windows, allow Python on the network type the school Wi-Fi uses (**Settings → Windows Security → Firewall & network protection → Allow an app through firewall**). On a Mac, check **System Settings → Network → Firewall → Options**. |
| The board says the classroom program is needed | The program isn't running, or the board was opened as a file. Start the launcher and use the `http://localhost:…` address. |
| The board asks to be opened on the computer running the program | The board was opened from another device. Open it on the teacher's computer, at `http://localhost:8000/live/board.html`. |
| The black window closes immediately (Windows) | Python isn't installed or not on PATH. Reinstall it and tick **"Add python.exe to PATH"**. |
| "Permission denied" (Mac or Linux) | In a terminal, go to the `classroom` folder and run `python3 classroom.py`. |
| The QR code shows the wrong address | The computer has several networks (for example Wi-Fi and a cable). The black window lists every address; type the one for the Wi-Fi on the iPads. |

Options for the program: `python3 classroom.py --port 8080` uses another
port, and `--no-browser` doesn't open the board automatically.

## Privacy

No ads, no tracking, no accounts, no cookies, and nothing is sent anywhere.
Everything stays in the browser's local storage on that device: the chosen
language, the sound setting, the teacher settings, and players (an animal
avatar with an optional nickname), their scores and stickers. The Live
Classroom keeps names and scores only in the teacher's computer's memory
during the lesson.

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
