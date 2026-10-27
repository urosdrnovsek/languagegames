// Shared game engine: language, UI text, speech, sound effects and the game
// shell (top bar, progress, start and finish screens) used by every game.
(function () {
  const LG = (window.LG = window.LG || {});
  const LANGS = LG.LANGS;
  // Folder of the shared files, for loading the QR libraries on demand.
  const SHARED = new URL('.', (document.currentScript && document.currentScript.src) || location.href);
  const params = new URLSearchParams(location.search);

  function store(key, value) {
    try {
      if (value === undefined) return localStorage.getItem(key);
      localStorage.setItem(key, value);
    } catch (e) {
      return null;
    }
  }

  // ---------- Language ----------

  LG.lang = (function () {
    const fromUrl = params.get('lang');
    if (LANGS.includes(fromUrl)) return fromUrl;
    const saved = store('lg-lang');
    if (LANGS.includes(saved)) return saved;
    const browser = (navigator.language || '').slice(0, 2).toLowerCase();
    return LANGS.includes(browser) ? browser : 'en';
  })();
  document.documentElement.lang = LG.lang;

  LG.setLang = function (lang) {
    if (!LANGS.includes(lang) || lang === LG.lang) return;
    store('lg-lang', lang);
    params.set('lang', lang);
    location.search = params.toString();
  };

  // Link to another page, keeping the current language and settings.
  LG.link = function (path) {
    const p = new URLSearchParams(params);
    p.set('lang', LG.lang);
    // Keep a class challenge going on the next page, even in a new tab.
    if (LG.challenge) p.set('challenge', LG.challenge.code);
    return path + '?' + p.toString();
  };

  const TEXT = {
    en: {
      appTitle: 'Language Games',
      hubSubtitle: 'Fun games for learning to read',
      play: 'Play',
      playAgain: 'Play again',
      allGames: 'All games',
      sound: 'Sound on or off',
      listen: 'Listen',
      wellDone: 'Well done!',
      finished: 'You finished every round!',
      tryAgain: 'Try again.',
      praise: ['Great job!', 'Yes!', 'Super!', 'Well done!', 'Brilliant!'],
      privacy: 'No ads. No tracking. Just learning.',
      wordsCount: '{n} words to discover',
      letterSounds: 'First Letter',
      letterSoundsDesc: 'Which letter does the word start with?',
      letterPrompt: '{word}. Which letter does {word} start with?',
      letterCorrect: '{word} starts with {letter}.',
      pictureWord: 'Read and Match',
      pictureWordDesc: 'Read the words and find the one for the picture.',
      pictureWordPrompt: 'Which word goes with this picture?',
      buildWord: 'Build the Word',
      buildWordDesc: 'Put the letters in the right order.',
      buildPrompt: 'Spell {word}.',
      voiceMissing: "This device has no English voice, so words won't be read aloud. You can still play!",
      pictureHunt: 'Picture Hunt',
      pictureHuntDesc: 'Read the words and find all their pictures before the time runs out.',
      huntPrompt: 'Find the pictures for all the words!',
      timeUp: "Time's up!",
      huntFoundSome: 'You found {n} of {total}. Try again!',
      huntWon: 'You found all the pictures!',
      timeLeft: 'Time left',
      teacherSettings: 'Teacher settings',
      forTeachers: 'For teachers',
      gateTitle: 'For grown-ups',
      gateQuestion: 'What is {a} + {b}?',
      gateOk: 'OK',
      gateWrong: 'Not quite. Try again.',
      fontHeading: 'Font',
      fontHelp: 'Choose the letters children see in every game.',
      font_default: 'Standard',
      fontDesc_default: "The device's own rounded font.",
      fontDesc_andika: 'Made for children learning to read, with the simple a and g they learn to write.',
      fontDesc_opendyslexic: 'Heavier letter bottoms help keep letters from flipping and turning.',
      fontDesc_lexend: 'Designed to make reading easier and faster.',
      fontDesc_atkinson: 'Every letter is shaped to look as different from the others as possible.',
      colorsHeading: 'Coloured letters',
      colorsHelp: 'Give letters that children often mix up their own colour.',
      spacingHeading: 'Letter spacing',
      spacingLabel: 'Wider spacing between letters',
      previewHeading: 'Preview',
      linkHeading: 'Settings for websites',
      linkHelp: 'These settings are saved on this device. To use them on a website that embeds the games, add this to the end of each game link:',
      linkNone: 'Nothing to add: these are the standard settings.',
      copy: 'Copy',
      copied: 'Copied!',
      reset: 'Back to standard settings',
      topicsHeading: 'Word topics',
      topicsHelp: 'Choose the topics you are practising, and the games use only those words. With no topic chosen, all words are used.',
      allTopics: 'All topics',
      topicsCount: '{n} words chosen',
      topicsFew: 'With so few words, some games also use words from other topics.',
      topic_farm: 'Pets & farm animals',
      topic_wild: 'Wild animals',
      topic_water: 'Sea & water animals',
      topic_bugs: 'Bugs & small animals',
      topic_fruit: 'Fruit',
      topic_vegetables: 'Vegetables',
      topic_food: 'Food & drink',
      topic_clothes: 'Clothes',
      topic_body: 'Body',
      topic_home: 'Home & furniture',
      topic_household: 'Things at home',
      topic_toys: 'Toys & play',
      topic_school: 'School',
      topic_transport: 'Transport',
      topic_nature: 'Nature & plants',
      topic_jobs: 'Jobs',
      topic_places: 'Places',
      topic_music: 'Music',
      topic_sky: 'Weather & sky',
      topic_family: 'Family & people',
      topic_colours: 'Colours',
      topic_numbers: 'Numbers',
      topic_shapes: 'Shapes',
      topic_sports: 'Sports',
      topic_feelings: 'Feelings',
      topic_seasons: 'Seasons & time',
      sectionLearn: 'Learn',
      sectionPlay: 'Play',
      sectionRace: 'Race the clock',
      sectionTogether: 'Play together',
      sectionMe: 'My progress',
      whoPlays: 'Who is playing?',
      newPlayer: 'New player',
      guest: 'Guest',
      playerName: 'Name (optional)',
      save: 'Save',
      newSticker: 'New sticker: {word}!',
      stickers: 'Sticker Album',
      stickersDesc: 'Collect a sticker for every word you learn.',
      stickerHelp: 'Get a word right {n} times in any game to win its sticker.',
      stickerCount: '{n} of {total}',
      scores: 'Scores',
      scoresDesc: 'The best scores on this device.',
      noScores: 'No scores yet. Play a game!',
      calmScores: 'Scores are hidden in calm mode.',
      newRecord: 'New record!',
      yourScore: 'Score: {score}',
      yourBest: 'Your best: {score}',
      pointsN: '{n} points',
      gameOver: 'Game over!',
      dailyChallenge: 'Daily Challenge',
      dailyDesc: "Today's words are the same for everyone. How many can you match in 60 seconds?",
      classChallenge: 'Class Challenge',
      classChallengeDesc: 'Enter the code from your teacher. Everyone plays the same words.',
      enterCode: 'Enter the code',
      join: 'Start',
      wrongCode: "That code doesn't work. Check it and try again.",
      challengeBanner: 'Class challenge {code}',
      challengeOn: 'Challenge on! Now pick a game.',
      endChallenge: 'End the challenge',
      memory: 'Memory Pairs',
      memoryDesc: 'Turn over two cards at a time. Find each picture and its word!',
      memoryWon: 'You found all the pairs in {moves} moves!',
      moves: 'Moves: {n}',
      beatClock: 'Beat the Clock',
      beatClockDesc: 'Match as many words as you can in 60 seconds! Three in a row gives you extra time.',
      pointsText: 'You got {n} right!',
      oddOne: 'Odd One Out',
      oddOneDesc: "Three pictures belong together. Find the one that doesn't!",
      oddPrompt: 'Which one does not belong?',
      wordRain: 'Word Rain',
      wordRainDesc: 'Read the word and tap its picture before it lands!',
      caught: 'You caught {n} words!',
      balloon: 'Balloon Pop',
      balloonDesc: 'Guess the letters of the word before all the balloons pop!',
      wordSearch: 'Word Search',
      wordSearchDesc: 'Find the hidden words. Slide your finger across or down.',
      wordSearchWon: 'You found every word!',
      tug: 'Tug of War',
      tugDesc: 'Two players, one tablet. Sit opposite each other. Tap the right word first to pull the rope!',
      blueWins: 'Blue wins!',
      redWins: 'Red wins!',
      tugText: 'What a match! Play again?',
      bingo: 'Word Bingo',
      bingoDesc: 'A game for the whole class: the teacher calls the words, everyone has their own card.',
      bingoCaller: 'I call the words',
      bingoCallerDesc: 'For the teacher. Show it on the board.',
      bingoPlayer: 'I have a card',
      bingoPlayerDesc: 'For players. Enter the code from the board.',
      bingoCodeHelp: 'Players: enter this code',
      nextWord: 'Next word',
      startCalling: 'Start calling',
      calledWords: 'Words called so far',
      bingoShout: 'Bingo!',
      bingoShow: 'Show your card to your teacher!',
      bingoTap: 'Tap a picture when you hear or see its word.',
      newGame: 'New game',
      challengeHeading: 'Class challenge',
      challengeHelp: 'Make a code for the word topics chosen above. Every device that enters it (under "Class challenge" on the game list) plays the same words, so scores can be compared fairly.',
      makeCode: 'Make a code',
      challengeLink: 'Or share this link:',
      calmHeading: 'Calm mode',
      calmLabel: 'No countdowns, records or leaderboards',
      calmHelp: 'Hides the race games and scores, and removes the Picture Hunt timer. Good for children who find competition stressful.',
      playersHeading: 'Players on this device',
      noPlayers: 'No players yet. Children add themselves with the avatar button on the game list.',
      removePlayer: 'Remove',
      resetProgress: 'Delete all scores and stickers',
      resetConfirm: 'Delete all scores and stickers on this device?',
      showTeacher: 'Show this to your teacher!',
      scoreboard: 'Class Scoreboard',
      scoreboardDesc: "Run a class challenge, then collect everyone's scores by QR code.",
      chooseGame: '1. Choose a game',
      topicsUsed: 'Topics: {topics}',
      allTopicsLabel: 'all topics',
      changeTopics: 'Change topics in the teacher settings',
      makeChallenge: '2. Make the challenge',
      howToJoin: 'On each iPad: open the game list, tap Class Challenge, enter this code and play {game}. Or scan the QR code with the iPad camera.',
      collect: '3. Collect scores',
      scanHelp: 'When they finish, children hold their end screen up to this camera.',
      startCamera: 'Start the camera',
      added: 'Added: {name}',
      wrongChallenge: 'That score is from another challenge or game.',
      addByHand: 'Add by hand',
      nameLabel: 'Name',
      scoreLabel: 'Score',
      add: 'Add',
      showResults: 'Show the results',
      backToScan: 'Back to collecting',
      noCamera: 'No camera available. You can add scores by hand.',
      newChallenge: 'New challenge',
      entries: '{n} scores',
      results: 'Results',
      liveClassroom: 'Live Classroom',
      liveDesc: 'A live leaderboard over the classroom Wi-Fi.',
      liveNeedsServer: 'Live Classroom needs the classroom program running on this computer, and this page opened from it. See "Live Classroom" in the README for how to start it.',
      boardOnly: 'Open the board on the computer running the classroom program (localhost).',
      scanToJoin: 'Join on your iPad: scan this code, or type the address',
      startGame: 'Start the game',
      endGame: 'End the game',
      playersN: '{n} players',
      joinTitle: 'Join the class game',
      joinBtn: 'Join',
      waiting: "You're in! Wait for your teacher to start",
      lookAtBoard: 'Look at the board!',
      gameClosed: 'This game has finished. Ask your teacher.',
      noConnection: "Can't reach the teacher's computer. Check the Wi-Fi.",
      finishedMark: 'finished',
      teamBattle: 'Team Battle',
      teamBattleDesc: 'Split the class into teams and take turns on the board!',
      howManyTeams: 'How many teams?',
      questionsEach: 'Questions for each team',
      teamN: 'Team {n}',
      teamTurn: 'Team {n}, your turn!',
      teamSteal: 'Team {n}, can you get it?',
      teamWins: 'Team {n} wins!',
      teamTie: "It's a tie! Great playing, everyone.",
      teamPoints: 'First try: 2 points. Second chance for the next team: 1 point.',
      wordBook: 'Word Book',
      wordBookDesc: 'Look at all the pictures. Tap one to hear the word.',
    },
    sl: {
      appTitle: 'Jezikovne igre',
      hubSubtitle: 'Zabavne igre za učenje branja',
      play: 'Igraj',
      playAgain: 'Igraj znova',
      allGames: 'Vse igre',
      sound: 'Vklopi ali izklopi zvok',
      listen: 'Poslušaj',
      wellDone: 'Odlično!',
      finished: 'Vse naloge so rešene!',
      tryAgain: 'Poskusi znova.',
      praise: ['Bravo!', 'Super!', 'Odlično!', 'Tako je!', 'Čudovito!'],
      privacy: 'Brez oglasov. Brez sledenja. Samo učenje.',
      wordsCount: '{n} besed za odkrivanje',
      letterSounds: 'Prva črka',
      letterSoundsDesc: 'S katero črko se začne beseda?',
      letterPrompt: '{word}. S katero črko se začne beseda {word}?',
      letterCorrect: 'Beseda {word} se začne s črko {letter}.',
      pictureWord: 'Preberi in poveži',
      pictureWordDesc: 'Preberi besede in poišči tisto, ki sodi k sliki.',
      pictureWordPrompt: 'Katera beseda sodi k tej sliki?',
      buildWord: 'Sestavi besedo',
      buildWordDesc: 'Postavi črke v pravi vrstni red.',
      buildPrompt: 'Sestavi besedo {word}.',
      voiceMissing: 'Ta naprava nima slovenskega glasu, zato besede ne bodo prebrane na glas. Igraš lahko vseeno!',
      pictureHunt: 'Lov na slike',
      pictureHuntDesc: 'Preberi besede in poišči vse njihove slike, preden poteče čas.',
      huntPrompt: 'Poišči slike za vse besede!',
      timeUp: 'Čas je potekel!',
      huntFoundSome: 'Najdenih: {n} od {total}. Poskusi znova!',
      huntWon: 'Vse slike so najdene!',
      timeLeft: 'Preostali čas',
      teacherSettings: 'Nastavitve za učitelje',
      forTeachers: 'Za učitelje',
      gateTitle: 'Za odrasle',
      gateQuestion: 'Koliko je {a} + {b}?',
      gateOk: 'V redu',
      gateWrong: 'Ni čisto prav. Poskusite znova.',
      fontHeading: 'Pisava',
      fontHelp: 'Izberite pisavo, ki jo otroci vidijo v vseh igrah.',
      font_default: 'Običajna',
      fontDesc_default: 'Zaobljena pisava naprave.',
      fontDesc_andika: 'Narejena za otroke, ki se učijo brati, s preprostima a in g, kakršna se učijo pisati.',
      fontDesc_opendyslexic: 'Odebeljeni spodnji deli črk pomagajo, da se črke ne obračajo.',
      fontDesc_lexend: 'Oblikovana tako, da je branje lažje in hitrejše.',
      fontDesc_atkinson: 'Vsaka črka je oblikovana tako, da je čim bolj drugačna od ostalih.',
      colorsHeading: 'Barvne črke',
      colorsHelp: 'Črkam, ki jih otroci pogosto zamenjujejo, dodelite svojo barvo.',
      spacingHeading: 'Razmik med črkami',
      spacingLabel: 'Večji razmik med črkami',
      previewHeading: 'Predogled',
      linkHeading: 'Nastavitve za spletne strani',
      linkHelp: 'Nastavitve so shranjene na tej napravi. Če jih želite uporabiti na spletni strani, ki vključuje igre, dodajte to na konec povezave do vsake igre:',
      linkNone: 'Ničesar ni treba dodati: to so običajne nastavitve.',
      copy: 'Kopiraj',
      copied: 'Kopirano!',
      reset: 'Nazaj na običajne nastavitve',
      topicsHeading: 'Teme besed',
      topicsHelp: 'Izberite teme, ki jih vadite, in igre bodo uporabljale samo te besede. Če ni izbrana nobena tema, se uporabijo vse besede.',
      allTopics: 'Vse teme',
      topicsCount: 'Izbranih besed: {n}',
      topicsFew: 'Pri tako malo besedah nekatere igre uporabijo tudi besede iz drugih tem.',
      topic_farm: 'Domače živali',
      topic_wild: 'Divje živali',
      topic_water: 'Vodne živali',
      topic_bugs: 'Žuželke in male živali',
      topic_fruit: 'Sadje',
      topic_vegetables: 'Zelenjava',
      topic_food: 'Hrana in pijača',
      topic_clothes: 'Oblačila',
      topic_body: 'Telo',
      topic_home: 'Dom in pohištvo',
      topic_household: 'Predmeti v hiši',
      topic_toys: 'Igrače in igra',
      topic_school: 'Šola',
      topic_transport: 'Prevozna sredstva',
      topic_nature: 'Narava in rastline',
      topic_jobs: 'Poklici',
      topic_places: 'Kraji',
      topic_music: 'Glasba',
      topic_sky: 'Vreme in nebo',
      topic_family: 'Družina in ljudje',
      topic_colours: 'Barve',
      topic_numbers: 'Števila',
      topic_shapes: 'Oblike',
      topic_sports: 'Šport',
      topic_feelings: 'Čustva',
      topic_seasons: 'Letni časi in čas',
      sectionLearn: 'Učenje',
      sectionPlay: 'Igre',
      sectionRace: 'Tekma s časom',
      sectionTogether: 'Igrajmo skupaj',
      sectionMe: 'Moj napredek',
      whoPlays: 'Kdo igra?',
      newPlayer: 'Nov igralec',
      guest: 'Gost',
      playerName: 'Ime (ni obvezno)',
      save: 'Shrani',
      newSticker: 'Nova nalepka: {word}!',
      stickers: 'Album nalepk',
      stickersDesc: 'Zberi nalepko za vsako besedo, ki se jo naučiš.',
      stickerHelp: 'Besedo pravilno reši {n}-krat v kateri koli igri in dobiš njeno nalepko.',
      stickerCount: '{n} od {total}',
      scores: 'Rezultati',
      scoresDesc: 'Najboljši rezultati na tej napravi.',
      noScores: 'Še ni rezultatov. Igraj!',
      calmScores: 'V mirnem načinu so rezultati skriti.',
      newRecord: 'Nov rekord!',
      yourScore: 'Rezultat: {score}',
      yourBest: 'Tvoj najboljši: {score}',
      pointsN: '{n} točk',
      gameOver: 'Konec igre!',
      dailyChallenge: 'Dnevni izziv',
      dailyDesc: 'Današnje besede so enake za vse. Koliko jih poveži v 60 sekundah?',
      classChallenge: 'Razredni izziv',
      classChallengeDesc: 'Vpiši kodo, ki ti jo da učitelj. Vsi igrajo z enakimi besedami.',
      enterCode: 'Vpiši kodo',
      join: 'Začni',
      wrongCode: 'Ta koda ne deluje. Preveri jo in poskusi znova.',
      challengeBanner: 'Razredni izziv {code}',
      challengeOn: 'Izziv je vklopljen! Zdaj izberi igro.',
      endChallenge: 'Končaj izziv',
      memory: 'Spomin',
      memoryDesc: 'Obrni po dve karti. Poišči vsako sliko in njeno besedo!',
      memoryWon: 'Vsi pari so najdeni v {moves} potezah!',
      moves: 'Poteze: {n}',
      beatClock: 'Premagaj uro',
      beatClockDesc: 'V 60 sekundah poveži čim več besed! Tri zapored ti dajo dodaten čas.',
      pointsText: 'Pravilnih odgovorov: {n}!',
      oddOne: 'Kdo ne sodi zraven?',
      oddOneDesc: 'Tri slike sodijo skupaj. Poišči tisto, ki ne sodi zraven!',
      oddPrompt: 'Kaj ne sodi zraven?',
      wordRain: 'Dež besed',
      wordRainDesc: 'Preberi besedo in tapni njeno sliko, preden pade na tla!',
      caught: 'Ujete besede: {n}!',
      balloon: 'Baloni',
      balloonDesc: 'Ugani črke besede, preden počijo vsi baloni!',
      wordSearch: 'Iskanje besed',
      wordSearchDesc: 'Poišči skrite besede. S prstom podrsaj vodoravno ali navzdol.',
      wordSearchWon: 'Vse besede so najdene!',
      tug: 'Vlečenje vrvi',
      tugDesc: 'Dva igralca, ena tablica. Sedita drug nasproti drugemu. Kdor prvi tapne pravo besedo, potegne vrv!',
      blueWins: 'Zmaga modri!',
      redWins: 'Zmaga rdeči!',
      tugText: 'Kakšna tekma! Še enkrat?',
      bingo: 'Bingo besed',
      bingoDesc: 'Igra za ves razred: učitelj kliče besede, vsak ima svojo kartico.',
      bingoCaller: 'Kličem besede',
      bingoCallerDesc: 'Za učitelja. Prikaži na tabli.',
      bingoPlayer: 'Imam kartico',
      bingoPlayerDesc: 'Za igralce. Vpiši kodo s table.',
      bingoCodeHelp: 'Igralci: vpišite to kodo',
      nextWord: 'Naslednja beseda',
      startCalling: 'Začni klicati',
      calledWords: 'Že poklicane besede',
      bingoShout: 'Bingo!',
      bingoShow: 'Pokaži kartico učitelju!',
      bingoTap: 'Tapni sliko, ko slišiš ali vidiš njeno besedo.',
      newGame: 'Nova igra',
      challengeHeading: 'Razredni izziv',
      challengeHelp: 'Ustvarite kodo za zgoraj izbrane teme. Vse naprave, ki jo vpišejo (pod »Razredni izziv« na seznamu iger), igrajo z enakimi besedami, zato so rezultati primerljivi.',
      makeCode: 'Ustvari kodo',
      challengeLink: 'Ali delite to povezavo:',
      calmHeading: 'Miren način',
      calmLabel: 'Brez odštevanja, rekordov in lestvic',
      calmHelp: 'Skrije igre s časom in rezultate ter odstrani čas pri Lovu na slike. Primerno za otroke, ki jih tekmovanje obremenjuje.',
      playersHeading: 'Igralci na tej napravi',
      noPlayers: 'Še ni igralcev. Otroci se dodajo z gumbom z živalico na seznamu iger.',
      removePlayer: 'Odstrani',
      resetProgress: 'Izbriši vse rezultate in nalepke',
      resetConfirm: 'Izbrišem vse rezultate in nalepke na tej napravi?',
      showTeacher: 'Pokaži učitelju!',
      scoreboard: 'Razredna lestvica',
      scoreboardDesc: 'Izvedite razredni izziv in zberite rezultate vseh s QR-kodo.',
      chooseGame: '1. Izberite igro',
      topicsUsed: 'Teme: {topics}',
      allTopicsLabel: 'vse teme',
      changeTopics: 'Teme spremenite v nastavitvah za učitelje',
      makeChallenge: '2. Ustvarite izziv',
      howToJoin: 'Na vsaki tablici: odprite seznam iger, tapnite Razredni izziv, vpišite kodo in igrajte {game}. Ali pa QR-kodo skenirajte s kamero tablice.',
      collect: '3. Zberite rezultate',
      scanHelp: 'Ko otroci končajo, pokažejo zaključni zaslon tej kameri.',
      startCamera: 'Vklopi kamero',
      added: 'Dodano: {name}',
      wrongChallenge: 'Ta rezultat je iz drugega izziva ali igre.',
      addByHand: 'Dodaj ročno',
      nameLabel: 'Ime',
      scoreLabel: 'Rezultat',
      add: 'Dodaj',
      showResults: 'Pokaži rezultate',
      backToScan: 'Nazaj na zbiranje',
      noCamera: 'Kamera ni na voljo. Rezultate lahko dodate ročno.',
      newChallenge: 'Nov izziv',
      entries: 'Rezultatov: {n}',
      results: 'Rezultati',
      liveClassroom: 'Razred v živo',
      liveDesc: 'Lestvica v živo prek šolskega Wi-Fi omrežja.',
      liveNeedsServer: 'Razred v živo potrebuje razredni program, ki teče na tem računalniku, in to stran, odprto iz njega. Navodila so v README pod »Live Classroom«.',
      boardOnly: 'Tablo odprite na računalniku, na katerem teče razredni program (localhost).',
      scanToJoin: 'Pridruži se na tablici: skeniraj kodo ali vpiši naslov',
      startGame: 'Začni igro',
      endGame: 'Končaj igro',
      playersN: 'Igralcev: {n}',
      joinTitle: 'Pridruži se razredni igri',
      joinBtn: 'Pridruži se',
      waiting: 'Si notri! Počakaj, da učitelj začne',
      lookAtBoard: 'Poglej na tablo!',
      gameClosed: 'Ta igra je končana. Vprašaj učitelja.',
      noConnection: 'Učiteljevega računalnika ni mogoče doseči. Preveri Wi-Fi.',
      finishedMark: 'končano',
      teamBattle: 'Boj ekip',
      teamBattleDesc: 'Razdelite razred v ekipe in se izmenjujte pri tabli!',
      howManyTeams: 'Koliko ekip?',
      questionsEach: 'Vprašanj za vsako ekipo',
      teamN: 'Ekipa {n}',
      teamTurn: 'Ekipa {n}, na vrsti ste!',
      teamSteal: 'Ekipa {n}, znate vi?',
      teamWins: 'Zmaga ekipa {n}!',
      teamTie: 'Neodločeno! Vsi ste odlično igrali.',
      teamPoints: 'Prvi poskus: 2 točki. Druga priložnost za naslednjo ekipo: 1 točka.',
      wordBook: 'Slikovni slovar',
      wordBookDesc: 'Oglej si vse slike. Tapni sliko in poslušaj besedo.',
    },
    de: {
      appTitle: 'Sprachspiele',
      hubSubtitle: 'Lustige Spiele zum Lesenlernen',
      play: 'Spielen',
      playAgain: 'Nochmal spielen',
      allGames: 'Alle Spiele',
      sound: 'Ton an oder aus',
      listen: 'Anhören',
      wellDone: 'Super gemacht!',
      finished: 'Du hast alle Runden geschafft!',
      tryAgain: 'Versuch es nochmal.',
      praise: ['Toll!', 'Ja!', 'Super!', 'Prima!', 'Klasse!'],
      privacy: 'Keine Werbung. Kein Tracking. Nur Lernen.',
      wordsCount: '{n} Wörter zum Entdecken',
      letterSounds: 'Erster Buchstabe',
      letterSoundsDesc: 'Mit welchem Buchstaben beginnt das Wort?',
      letterPrompt: '{word}. Mit welchem Buchstaben beginnt {word}?',
      letterCorrect: '{word} beginnt mit {letter}.',
      pictureWord: 'Lesen und finden',
      pictureWordDesc: 'Lies die Wörter und finde das passende Wort zum Bild.',
      pictureWordPrompt: 'Welches Wort passt zu diesem Bild?',
      buildWord: 'Wort bauen',
      buildWordDesc: 'Bring die Buchstaben in die richtige Reihenfolge.',
      buildPrompt: 'Schreibe {word}.',
      voiceMissing: 'Dieses Gerät hat keine deutsche Stimme, deshalb werden die Wörter nicht vorgelesen. Du kannst trotzdem spielen!',
      pictureHunt: 'Bildersuche',
      pictureHuntDesc: 'Lies die Wörter und finde alle Bilder, bevor die Zeit abläuft.',
      huntPrompt: 'Finde die Bilder zu allen Wörtern!',
      timeUp: 'Die Zeit ist um!',
      huntFoundSome: 'Du hast {n} von {total} gefunden. Versuch es nochmal!',
      huntWon: 'Du hast alle Bilder gefunden!',
      timeLeft: 'Verbleibende Zeit',
      teacherSettings: 'Einstellungen für Lehrkräfte',
      forTeachers: 'Für Lehrkräfte',
      gateTitle: 'Für Erwachsene',
      gateQuestion: 'Wie viel ist {a} + {b}?',
      gateOk: 'OK',
      gateWrong: 'Nicht ganz. Versuchen Sie es noch einmal.',
      fontHeading: 'Schrift',
      fontHelp: 'Wählen Sie die Schrift, die Kinder in allen Spielen sehen.',
      font_default: 'Standard',
      fontDesc_default: 'Die runde Schrift des Geräts.',
      fontDesc_andika: 'Für Kinder, die lesen lernen, mit dem einfachen a und g, das sie schreiben lernen.',
      fontDesc_opendyslexic: 'Schwerere untere Buchstabenteile helfen, dass Buchstaben nicht kippen oder sich drehen.',
      fontDesc_lexend: 'Entwickelt, um das Lesen leichter und schneller zu machen.',
      fontDesc_atkinson: 'Jeder Buchstabe ist so gestaltet, dass er den anderen möglichst wenig ähnelt.',
      colorsHeading: 'Farbige Buchstaben',
      colorsHelp: 'Buchstaben, die Kinder oft verwechseln, bekommen eine eigene Farbe.',
      spacingHeading: 'Buchstabenabstand',
      spacingLabel: 'Größerer Abstand zwischen den Buchstaben',
      previewHeading: 'Vorschau',
      linkHeading: 'Einstellungen für Websites',
      linkHelp: 'Diese Einstellungen werden auf diesem Gerät gespeichert. Um sie auf einer Website zu nutzen, die die Spiele einbindet, hängen Sie dies an jeden Spiel-Link an:',
      linkNone: 'Nichts anzuhängen: Das sind die Standardeinstellungen.',
      copy: 'Kopieren',
      copied: 'Kopiert!',
      reset: 'Zurück zu den Standardeinstellungen',
      topicsHeading: 'Wortthemen',
      topicsHelp: 'Wählen Sie die Themen, die Sie gerade üben – die Spiele verwenden dann nur diese Wörter. Ohne Auswahl werden alle Wörter verwendet.',
      allTopics: 'Alle Themen',
      topicsCount: '{n} Wörter ausgewählt',
      topicsFew: 'Bei so wenigen Wörtern verwenden manche Spiele auch Wörter aus anderen Themen.',
      topic_farm: 'Haus- und Bauernhoftiere',
      topic_wild: 'Wilde Tiere',
      topic_water: 'Wassertiere',
      topic_bugs: 'Insekten und kleine Tiere',
      topic_fruit: 'Obst',
      topic_vegetables: 'Gemüse',
      topic_food: 'Essen und Trinken',
      topic_clothes: 'Kleidung',
      topic_body: 'Körper',
      topic_home: 'Zuhause und Möbel',
      topic_household: 'Dinge im Haus',
      topic_toys: 'Spielzeug und Spiel',
      topic_school: 'Schule',
      topic_transport: 'Fahrzeuge',
      topic_nature: 'Natur und Pflanzen',
      topic_jobs: 'Berufe',
      topic_places: 'Orte',
      topic_music: 'Musik',
      topic_sky: 'Wetter und Himmel',
      topic_family: 'Familie und Menschen',
      topic_colours: 'Farben',
      topic_numbers: 'Zahlen',
      topic_shapes: 'Formen',
      topic_sports: 'Sport',
      topic_feelings: 'Gefühle',
      topic_seasons: 'Jahreszeiten und Zeit',
      sectionLearn: 'Lernen',
      sectionPlay: 'Spielen',
      sectionRace: 'Gegen die Uhr',
      sectionTogether: 'Zusammen spielen',
      sectionMe: 'Mein Fortschritt',
      whoPlays: 'Wer spielt?',
      newPlayer: 'Neuer Spieler',
      guest: 'Gast',
      playerName: 'Name (freiwillig)',
      save: 'Speichern',
      newSticker: 'Neuer Sticker: {word}!',
      stickers: 'Stickeralbum',
      stickersDesc: 'Sammle einen Sticker für jedes Wort, das du lernst.',
      stickerHelp: 'Löse ein Wort {n}-mal richtig, dann bekommst du seinen Sticker.',
      stickerCount: '{n} von {total}',
      scores: 'Bestenliste',
      scoresDesc: 'Die besten Ergebnisse auf diesem Gerät.',
      noScores: 'Noch keine Ergebnisse. Spiel los!',
      calmScores: 'Im ruhigen Modus sind die Ergebnisse ausgeblendet.',
      newRecord: 'Neuer Rekord!',
      yourScore: 'Ergebnis: {score}',
      yourBest: 'Dein Rekord: {score}',
      pointsN: '{n} Punkte',
      gameOver: 'Spiel vorbei!',
      dailyChallenge: 'Tagesaufgabe',
      dailyDesc: 'Die Wörter von heute sind für alle gleich. Wie viele schaffst du in 60 Sekunden?',
      classChallenge: 'Klassen-Challenge',
      classChallengeDesc: 'Gib den Code deiner Lehrkraft ein. Alle spielen mit denselben Wörtern.',
      enterCode: 'Code eingeben',
      join: 'Los',
      wrongCode: 'Dieser Code passt nicht. Prüfe ihn und versuch es noch einmal.',
      challengeBanner: 'Klassen-Challenge {code}',
      challengeOn: 'Challenge läuft! Wähle jetzt ein Spiel.',
      endChallenge: 'Challenge beenden',
      memory: 'Memory',
      memoryDesc: 'Dreh immer zwei Karten um. Finde jedes Bild und sein Wort!',
      memoryWon: 'Du hast alle Paare in {moves} Zügen gefunden!',
      moves: 'Züge: {n}',
      beatClock: 'Wettlauf mit der Uhr',
      beatClockDesc: 'Finde in 60 Sekunden so viele Wörter wie möglich! Drei richtige hintereinander geben Extrazeit.',
      pointsText: 'Du hast {n} richtig!',
      oddOne: 'Was passt nicht?',
      oddOneDesc: 'Drei Bilder gehören zusammen. Finde das, das nicht passt!',
      oddPrompt: 'Was passt nicht dazu?',
      wordRain: 'Wörterregen',
      wordRainDesc: 'Lies das Wort und tippe auf sein Bild, bevor es landet!',
      caught: 'Du hast {n} Wörter gefangen!',
      balloon: 'Ballonplatzen',
      balloonDesc: 'Errate die Buchstaben, bevor alle Ballons platzen!',
      wordSearch: 'Wortsuche',
      wordSearchDesc: 'Finde die versteckten Wörter. Wisch nach rechts oder nach unten.',
      wordSearchWon: 'Du hast alle Wörter gefunden!',
      tug: 'Tauziehen',
      tugDesc: 'Zwei Spieler, ein Tablet. Setzt euch gegenüber. Wer zuerst das richtige Wort tippt, zieht am Seil!',
      blueWins: 'Blau gewinnt!',
      redWins: 'Rot gewinnt!',
      tugText: 'Was für ein Spiel! Noch einmal?',
      bingo: 'Wörter-Bingo',
      bingoDesc: 'Ein Spiel für die ganze Klasse: Die Lehrkraft ruft Wörter auf, alle haben eine eigene Karte.',
      bingoCaller: 'Ich rufe die Wörter auf',
      bingoCallerDesc: 'Für die Lehrkraft. An der Tafel zeigen.',
      bingoPlayer: 'Ich habe eine Karte',
      bingoPlayerDesc: 'Für Spieler. Gib den Code von der Tafel ein.',
      bingoCodeHelp: 'Spieler: Gebt diesen Code ein',
      nextWord: 'Nächstes Wort',
      startCalling: 'Aufrufen starten',
      calledWords: 'Bisher aufgerufen',
      bingoShout: 'Bingo!',
      bingoShow: 'Zeig deine Karte der Lehrkraft!',
      bingoTap: 'Tippe auf ein Bild, wenn du sein Wort hörst oder siehst.',
      newGame: 'Neues Spiel',
      challengeHeading: 'Klassen-Challenge',
      challengeHelp: 'Erstellen Sie einen Code für die oben gewählten Themen. Alle Geräte, die ihn eingeben (unter „Klassen-Challenge“ in der Spielübersicht), spielen dieselben Wörter – so lassen sich Ergebnisse fair vergleichen.',
      makeCode: 'Code erstellen',
      challengeLink: 'Oder teilen Sie diesen Link:',
      calmHeading: 'Ruhiger Modus',
      calmLabel: 'Keine Countdowns, Rekorde oder Bestenlisten',
      calmHelp: 'Blendet die Spiele gegen die Uhr und die Ergebnisse aus und entfernt den Timer der Bildersuche. Gut für Kinder, die Wettbewerb stresst.',
      playersHeading: 'Spieler auf diesem Gerät',
      noPlayers: 'Noch keine Spieler. Kinder legen sich über den Tier-Knopf in der Spielübersicht an.',
      removePlayer: 'Entfernen',
      resetProgress: 'Alle Ergebnisse und Sticker löschen',
      resetConfirm: 'Alle Ergebnisse und Sticker auf diesem Gerät löschen?',
      showTeacher: 'Zeig das deiner Lehrkraft!',
      scoreboard: 'Klassen-Bestenliste',
      scoreboardDesc: 'Starten Sie eine Klassen-Challenge und sammeln Sie alle Ergebnisse per QR-Code.',
      chooseGame: '1. Spiel wählen',
      topicsUsed: 'Themen: {topics}',
      allTopicsLabel: 'alle Themen',
      changeTopics: 'Themen in den Lehrkraft-Einstellungen ändern',
      makeChallenge: '2. Challenge erstellen',
      howToJoin: 'Auf jedem iPad: Spielübersicht öffnen, Klassen-Challenge antippen, diesen Code eingeben und {game} spielen. Oder den QR-Code mit der iPad-Kamera scannen.',
      collect: '3. Ergebnisse sammeln',
      scanHelp: 'Wenn die Kinder fertig sind, halten sie ihren Endbildschirm vor diese Kamera.',
      startCamera: 'Kamera starten',
      added: 'Hinzugefügt: {name}',
      wrongChallenge: 'Dieses Ergebnis gehört zu einer anderen Challenge oder einem anderen Spiel.',
      addByHand: 'Von Hand hinzufügen',
      nameLabel: 'Name',
      scoreLabel: 'Ergebnis',
      add: 'Hinzufügen',
      showResults: 'Ergebnisse zeigen',
      backToScan: 'Zurück zum Sammeln',
      noCamera: 'Keine Kamera verfügbar. Sie können Ergebnisse von Hand eintragen.',
      newChallenge: 'Neue Challenge',
      entries: '{n} Ergebnisse',
      results: 'Ergebnisse',
      liveClassroom: 'Live-Klassenzimmer',
      liveDesc: 'Eine Live-Bestenliste über das Schul-WLAN.',
      liveNeedsServer: 'Das Live-Klassenzimmer braucht das Klassenzimmer-Programm auf diesem Computer, und diese Seite muss darüber geöffnet sein. Anleitung im README unter „Live Classroom“.',
      boardOnly: 'Öffnen Sie die Tafel auf dem Computer mit dem Klassenzimmer-Programm (localhost).',
      scanToJoin: 'Mach mit auf dem iPad: Code scannen oder Adresse eintippen',
      startGame: 'Spiel starten',
      endGame: 'Spiel beenden',
      playersN: '{n} Spieler',
      joinTitle: 'Beim Klassenspiel mitmachen',
      joinBtn: 'Mitmachen',
      waiting: 'Du bist dabei! Warte, bis deine Lehrkraft startet',
      lookAtBoard: 'Schau an die Tafel!',
      gameClosed: 'Dieses Spiel ist vorbei. Frag deine Lehrkraft.',
      noConnection: 'Der Computer der Lehrkraft ist nicht erreichbar. Prüfe das WLAN.',
      finishedMark: 'fertig',
      teamBattle: 'Team-Duell',
      teamBattleDesc: 'Teilt die Klasse in Teams und wechselt euch an der Tafel ab!',
      howManyTeams: 'Wie viele Teams?',
      questionsEach: 'Fragen pro Team',
      teamN: 'Team {n}',
      teamTurn: 'Team {n}, ihr seid dran!',
      teamSteal: 'Team {n}, wisst ihr es?',
      teamWins: 'Team {n} gewinnt!',
      teamTie: 'Unentschieden! Ihr habt alle toll gespielt.',
      teamPoints: 'Erster Versuch: 2 Punkte. Zweite Chance für das nächste Team: 1 Punkt.',
      wordBook: 'Bildwörterbuch',
      wordBookDesc: 'Schau dir alle Bilder an. Tippe auf ein Bild, um das Wort zu hören.',
    },
    fr: {
      appTitle: 'Jeux de langue',
      hubSubtitle: 'Des jeux amusants pour apprendre à lire',
      play: 'Jouer',
      playAgain: 'Rejouer',
      allGames: 'Tous les jeux',
      sound: 'Activer ou couper le son',
      listen: 'Écouter',
      wellDone: 'Bravo\u00a0!',
      finished: 'Tu as terminé toutes les manches\u00a0!',
      tryAgain: 'Essaie encore.',
      praise: ['Super\u00a0!', 'Oui\u00a0!', 'Bravo\u00a0!', 'Génial\u00a0!', 'Très bien\u00a0!'],
      privacy: 'Pas de publicité. Pas de pistage. Juste apprendre.',
      wordsCount: '{n} mots à découvrir',
      letterSounds: 'Première lettre',
      letterSoundsDesc: 'Par quelle lettre commence le mot\u00a0?',
      letterPrompt: '{word}. Par quelle lettre commence {word}\u00a0?',
      letterCorrect: '{word} commence par {letter}.',
      pictureWord: 'Lis et trouve',
      pictureWordDesc: "Lis les mots et trouve celui qui va avec l'image.",
      pictureWordPrompt: 'Quel mot va avec cette image\u00a0?',
      buildWord: 'Construis le mot',
      buildWordDesc: 'Mets les lettres dans le bon ordre.',
      buildPrompt: 'Écris {word}.',
      voiceMissing: "Cet appareil n'a pas de voix française, donc les mots ne seront pas lus à voix haute. Tu peux quand même jouer\u00a0!",
      pictureHunt: 'Chasse aux images',
      pictureHuntDesc: 'Lis les mots et trouve toutes leurs images avant la fin du temps.',
      huntPrompt: 'Trouve les images de tous les mots\u00a0!',
      timeUp: 'Temps écoulé\u00a0!',
      huntFoundSome: 'Tu as trouvé {n} sur {total}. Essaie encore\u00a0!',
      huntWon: 'Tu as trouvé toutes les images\u00a0!',
      timeLeft: 'Temps restant',
      teacherSettings: 'Réglages pour les enseignants',
      forTeachers: 'Pour les enseignants',
      gateTitle: 'Pour les adultes',
      gateQuestion: 'Combien font {a} + {b}\u00a0?',
      gateOk: 'OK',
      gateWrong: 'Pas tout à fait. Réessayez.',
      fontHeading: 'Police',
      fontHelp: 'Choisissez la police que les enfants voient dans tous les jeux.',
      font_default: 'Standard',
      fontDesc_default: "La police arrondie de l'appareil.",
      fontDesc_andika: "Conçue pour les enfants qui apprennent à lire, avec les a et g simples qu'ils apprennent à écrire.",
      fontDesc_opendyslexic: 'Le bas des lettres, plus épais, aide à ne pas les retourner ni les inverser.',
      fontDesc_lexend: 'Conçue pour rendre la lecture plus facile et plus rapide.',
      fontDesc_atkinson: 'Chaque lettre est dessinée pour se distinguer le plus possible des autres.',
      colorsHeading: 'Lettres en couleur',
      colorsHelp: 'Donnez une couleur propre aux lettres que les enfants confondent souvent.',
      spacingHeading: 'Espacement des lettres',
      spacingLabel: "Plus d'espace entre les lettres",
      previewHeading: 'Aperçu',
      linkHeading: 'Réglages pour les sites web',
      linkHelp: 'Ces réglages sont enregistrés sur cet appareil. Pour les utiliser sur un site qui intègre les jeux, ajoutez ceci à la fin du lien de chaque jeu\u00a0:',
      linkNone: 'Rien à ajouter\u00a0: ce sont les réglages standard.',
      copy: 'Copier',
      copied: 'Copié\u00a0!',
      reset: 'Revenir aux réglages standard',
      topicsHeading: 'Thèmes de vocabulaire',
      topicsHelp: "Choisissez les thèmes que vous travaillez\u00a0: les jeux n'utilisent alors que ces mots. Sans thème choisi, tous les mots sont utilisés.",
      allTopics: 'Tous les thèmes',
      topicsCount: '{n} mots choisis',
      topicsFew: "Avec si peu de mots, certains jeux utilisent aussi des mots d'autres thèmes.",
      topic_farm: 'Animaux de la ferme',
      topic_wild: 'Animaux sauvages',
      topic_water: 'Animaux aquatiques',
      topic_bugs: 'Insectes et petites bêtes',
      topic_fruit: 'Fruits',
      topic_vegetables: 'Légumes',
      topic_food: 'Nourriture et boissons',
      topic_clothes: 'Vêtements',
      topic_body: 'Le corps',
      topic_home: 'La maison et les meubles',
      topic_household: 'Objets de la maison',
      topic_toys: 'Jouets et jeux',
      topic_school: "L'école",
      topic_transport: 'Transports',
      topic_nature: 'La nature et les plantes',
      topic_jobs: 'Les métiers',
      topic_places: 'Les lieux',
      topic_music: 'La musique',
      topic_sky: 'La météo et le ciel',
      topic_family: 'La famille et les gens',
      topic_colours: 'Couleurs',
      topic_numbers: 'Nombres',
      topic_shapes: 'Les formes',
      topic_sports: 'Les sports',
      topic_feelings: 'Les émotions',
      topic_seasons: 'Les saisons et le temps',
      sectionLearn: 'Apprendre',
      sectionPlay: 'Jouer',
      sectionRace: 'Course contre la montre',
      sectionTogether: 'Jouer ensemble',
      sectionMe: 'Mes progrès',
      whoPlays: 'Qui joue\u00a0?',
      newPlayer: 'Nouveau joueur',
      guest: 'Invité',
      playerName: 'Prénom (facultatif)',
      save: 'Enregistrer',
      newSticker: 'Nouvel autocollant\u00a0: {word}\u00a0!',
      stickers: "Album d'autocollants",
      stickersDesc: 'Gagne un autocollant pour chaque mot appris.',
      stickerHelp: "Trouve un mot {n} fois dans n'importe quel jeu pour gagner son autocollant.",
      stickerCount: '{n} sur {total}',
      scores: 'Scores',
      scoresDesc: 'Les meilleurs scores sur cet appareil.',
      noScores: 'Pas encore de score. À toi de jouer\u00a0!',
      calmScores: 'Les scores sont masqués en mode calme.',
      newRecord: 'Nouveau record\u00a0!',
      yourScore: 'Score\u00a0: {score}',
      yourBest: 'Ton record\u00a0: {score}',
      pointsN: '{n} points',
      gameOver: 'Partie terminée\u00a0!',
      dailyChallenge: 'Défi du jour',
      dailyDesc: 'Les mots du jour sont les mêmes pour tout le monde. Combien en trouveras-tu en 60 secondes\u00a0?',
      classChallenge: 'Défi de la classe',
      classChallengeDesc: 'Tape le code donné par ton enseignant. Tout le monde joue avec les mêmes mots.',
      enterCode: 'Tape le code',
      join: 'Commencer',
      wrongCode: 'Ce code ne marche pas. Vérifie-le et réessaie.',
      challengeBanner: 'Défi de la classe {code}',
      challengeOn: 'Défi lancé\u00a0! Choisis un jeu.',
      endChallenge: 'Terminer le défi',
      memory: 'Mémory',
      memoryDesc: 'Retourne deux cartes à la fois. Trouve chaque image et son mot\u00a0!',
      memoryWon: 'Tu as trouvé toutes les paires en {moves} coups\u00a0!',
      moves: 'Coups\u00a0: {n}',
      beatClock: 'Contre la montre',
      beatClockDesc: 'Trouve un maximum de mots en 60 secondes\u00a0! Trois de suite te donnent du temps en plus.',
      pointsText: 'Tu en as trouvé {n}\u00a0!',
      oddOne: "L'intrus",
      oddOneDesc: 'Trois images vont ensemble. Trouve celle qui ne va pas avec les autres\u00a0!',
      oddPrompt: "Lequel n'est pas comme les autres\u00a0?",
      wordRain: 'Pluie de mots',
      wordRainDesc: "Lis le mot et touche son image avant qu'elle tombe\u00a0!",
      caught: 'Tu as attrapé {n} mots\u00a0!',
      balloon: 'Ballons',
      balloonDesc: 'Devine les lettres du mot avant que tous les ballons éclatent\u00a0!',
      wordSearch: 'Mots cachés',
      wordSearchDesc: 'Trouve les mots cachés. Fais glisser ton doigt vers la droite ou vers le bas.',
      wordSearchWon: 'Tu as trouvé tous les mots\u00a0!',
      tug: 'Tir à la corde',
      tugDesc: 'Deux joueurs, une tablette. Asseyez-vous face à face. Le premier qui touche le bon mot tire la corde\u00a0!',
      blueWins: 'Les bleus gagnent\u00a0!',
      redWins: 'Les rouges gagnent\u00a0!',
      tugText: 'Quel match\u00a0! On rejoue\u00a0?',
      bingo: 'Loto des mots',
      bingoDesc: "Un jeu pour toute la classe\u00a0: l'enseignant annonce les mots, chacun a sa grille.",
      bingoCaller: "J'annonce les mots",
      bingoCallerDesc: "Pour l'enseignant. À afficher au tableau.",
      bingoPlayer: "J'ai une grille",
      bingoPlayerDesc: 'Pour les joueurs. Tape le code du tableau.',
      bingoCodeHelp: 'Joueurs\u00a0: tapez ce code',
      nextWord: 'Mot suivant',
      startCalling: 'Commencer',
      calledWords: 'Mots déjà annoncés',
      bingoShout: 'Bingo\u00a0!',
      bingoShow: 'Montre ta grille à ton enseignant\u00a0!',
      bingoTap: 'Touche une image quand tu entends ou vois son mot.',
      newGame: 'Nouvelle partie',
      challengeHeading: 'Défi de la classe',
      challengeHelp: 'Créez un code pour les thèmes choisis ci-dessus. Tous les appareils qui le saisissent (dans «\u00a0Défi de la classe\u00a0» sur la liste des jeux) jouent avec les mêmes mots\u00a0: les scores sont comparables.',
      makeCode: 'Créer un code',
      challengeLink: 'Ou partagez ce lien\u00a0:',
      calmHeading: 'Mode calme',
      calmLabel: 'Pas de compte à rebours, de records ni de classements',
      calmHelp: 'Masque les jeux chronométrés et les scores, et retire le minuteur de la Chasse aux images. Utile pour les enfants que la compétition stresse.',
      playersHeading: 'Joueurs sur cet appareil',
      noPlayers: "Pas encore de joueurs. Les enfants s'ajoutent avec le bouton animal sur la liste des jeux.",
      removePlayer: 'Supprimer',
      resetProgress: 'Effacer tous les scores et autocollants',
      resetConfirm: 'Effacer tous les scores et autocollants de cet appareil\u00a0?',
      showTeacher: 'Montre ceci à ton enseignant\u00a0!',
      scoreboard: 'Tableau de la classe',
      scoreboardDesc: 'Lancez un défi de classe, puis récupérez les scores de chacun par QR\u00a0code.',
      chooseGame: '1. Choisissez un jeu',
      topicsUsed: 'Thèmes\u00a0: {topics}',
      allTopicsLabel: 'tous les thèmes',
      changeTopics: 'Modifier les thèmes dans les réglages enseignants',
      makeChallenge: '2. Créer le défi',
      howToJoin: "Sur chaque iPad\u00a0: ouvrez la liste des jeux, touchez Défi de la classe, tapez ce code et jouez à {game}. Ou scannez le QR\u00a0code avec l'appareil photo.",
      collect: '3. Récupérer les scores',
      scanHelp: 'À la fin, les enfants montrent leur écran de fin à cette caméra.',
      startCamera: 'Allumer la caméra',
      added: 'Ajouté\u00a0: {name}',
      wrongChallenge: "Ce score vient d'un autre défi ou d'un autre jeu.",
      addByHand: 'Ajouter à la main',
      nameLabel: 'Prénom',
      scoreLabel: 'Score',
      add: 'Ajouter',
      showResults: 'Afficher les résultats',
      backToScan: 'Retour à la collecte',
      noCamera: 'Aucune caméra disponible. Vous pouvez ajouter les scores à la main.',
      newChallenge: 'Nouveau défi',
      entries: '{n} scores',
      results: 'Résultats',
      liveClassroom: 'Classe en direct',
      liveDesc: 'Un classement en direct sur le Wi-Fi de la classe.',
      liveNeedsServer: 'La classe en direct a besoin du programme de classe lancé sur cet ordinateur, et de cette page ouverte depuis celui-ci. Voir «\u00a0Live Classroom\u00a0» dans le README.',
      boardOnly: "Ouvrez le tableau sur l'ordinateur qui fait tourner le programme (localhost).",
      scanToJoin: "Rejoins sur ton iPad\u00a0: scanne ce code ou tape l'adresse",
      startGame: 'Lancer la partie',
      endGame: 'Terminer la partie',
      playersN: '{n} joueurs',
      joinTitle: 'Rejoindre le jeu de la classe',
      joinBtn: 'Rejoindre',
      waiting: "C'est bon\u00a0! Attends que ton enseignant lance la partie",
      lookAtBoard: 'Regarde le tableau\u00a0!',
      gameClosed: 'Cette partie est terminée. Demande à ton enseignant.',
      noConnection: "Impossible de joindre l'ordinateur de l'enseignant. Vérifie le Wi-Fi.",
      finishedMark: 'fini',
      teamBattle: "Bataille d'équipes",
      teamBattleDesc: 'Formez des équipes et jouez chacun votre tour au tableau\u00a0!',
      howManyTeams: "Combien d'équipes\u00a0?",
      questionsEach: 'Questions par équipe',
      teamN: 'Équipe {n}',
      teamTurn: 'Équipe {n}, à vous\u00a0!',
      teamSteal: 'Équipe {n}, vous savez\u00a0?',
      teamWins: "L'équipe {n} gagne\u00a0!",
      teamTie: 'Égalité\u00a0! Bravo à tous.',
      teamPoints: "Du premier coup\u00a0: 2 points. Deuxième chance pour l'équipe suivante\u00a0: 1 point.",
      wordBook: 'Imagier',
      wordBookDesc: 'Regarde toutes les images. Touche une image pour entendre le mot.',
    },
    es: {
      appTitle: 'Juegos de lenguaje',
      hubSubtitle: 'Juegos divertidos para aprender a leer',
      play: 'Jugar',
      playAgain: 'Jugar otra vez',
      allGames: 'Todos los juegos',
      sound: 'Activar o quitar el sonido',
      listen: 'Escuchar',
      wellDone: '¡Muy bien!',
      finished: '¡Terminaste todas las rondas!',
      tryAgain: 'Inténtalo otra vez.',
      praise: ['¡Genial!', '¡Sí!', '¡Súper!', '¡Muy bien!', '¡Bravo!'],
      privacy: 'Sin anuncios. Sin rastreo. Solo aprender.',
      wordsCount: '{n} palabras para descubrir',
      letterSounds: 'Primera letra',
      letterSoundsDesc: '¿Con qué letra empieza la palabra?',
      letterPrompt: '{word}. ¿Con qué letra empieza {word}?',
      letterCorrect: '{word} empieza con {letter}.',
      pictureWord: 'Lee y une',
      pictureWordDesc: 'Lee las palabras y encuentra la que va con la imagen.',
      pictureWordPrompt: '¿Qué palabra va con esta imagen?',
      buildWord: 'Forma la palabra',
      buildWordDesc: 'Pon las letras en el orden correcto.',
      buildPrompt: 'Escribe {word}.',
      voiceMissing: 'Este dispositivo no tiene voz en español, así que las palabras no se leerán en voz alta. ¡Puedes jugar igual!',
      pictureHunt: 'Busca las imágenes',
      pictureHuntDesc: 'Lee las palabras y encuentra todas sus imágenes antes de que se acabe el tiempo.',
      huntPrompt: '¡Encuentra las imágenes de todas las palabras!',
      timeUp: '¡Se acabó el tiempo!',
      huntFoundSome: 'Encontraste {n} de {total}. ¡Inténtalo otra vez!',
      huntWon: '¡Encontraste todas las imágenes!',
      timeLeft: 'Tiempo restante',
      teacherSettings: 'Ajustes para docentes',
      forTeachers: 'Para docentes',
      gateTitle: 'Para adultos',
      gateQuestion: '¿Cuánto es {a} + {b}?',
      gateOk: 'Aceptar',
      gateWrong: 'No es correcto. Inténtelo de nuevo.',
      fontHeading: 'Tipo de letra',
      fontHelp: 'Elija el tipo de letra que ven los niños en todos los juegos.',
      font_default: 'Estándar',
      fontDesc_default: 'La letra redondeada del dispositivo.',
      fontDesc_andika: 'Hecha para niños que aprenden a leer, con la a y la g sencillas que aprenden a escribir.',
      fontDesc_opendyslexic: 'La parte inferior más gruesa de las letras ayuda a que no se volteen ni se giren.',
      fontDesc_lexend: 'Diseñada para que leer sea más fácil y rápido.',
      fontDesc_atkinson: 'Cada letra está dibujada para parecerse lo menos posible a las demás.',
      colorsHeading: 'Letras de colores',
      colorsHelp: 'Dé un color propio a las letras que los niños suelen confundir.',
      spacingHeading: 'Espacio entre letras',
      spacingLabel: 'Más espacio entre las letras',
      previewHeading: 'Vista previa',
      linkHeading: 'Ajustes para sitios web',
      linkHelp: 'Estos ajustes se guardan en este dispositivo. Para usarlos en un sitio web que incluya los juegos, añada esto al final del enlace de cada juego:',
      linkNone: 'No hay nada que añadir: estos son los ajustes estándar.',
      copy: 'Copiar',
      copied: '¡Copiado!',
      reset: 'Volver a los ajustes estándar',
      topicsHeading: 'Temas de vocabulario',
      topicsHelp: 'Elija los temas que está practicando y los juegos usarán solo esas palabras. Si no elige ningún tema, se usan todas las palabras.',
      allTopics: 'Todos los temas',
      topicsCount: '{n} palabras elegidas',
      topicsFew: 'Con tan pocas palabras, algunos juegos también usan palabras de otros temas.',
      topic_farm: 'Mascotas y animales de granja',
      topic_wild: 'Animales salvajes',
      topic_water: 'Animales acuáticos',
      topic_bugs: 'Insectos y animales pequeños',
      topic_fruit: 'Frutas',
      topic_vegetables: 'Verduras',
      topic_food: 'Comida y bebida',
      topic_clothes: 'Ropa',
      topic_body: 'El cuerpo',
      topic_home: 'La casa y los muebles',
      topic_household: 'Objetos de casa',
      topic_toys: 'Juguetes y juegos',
      topic_school: 'La escuela',
      topic_transport: 'Transportes',
      topic_nature: 'La naturaleza y las plantas',
      topic_jobs: 'Los oficios',
      topic_places: 'Los lugares',
      topic_music: 'La música',
      topic_sky: 'El tiempo y el cielo',
      topic_family: 'La familia y las personas',
      topic_colours: 'Colores',
      topic_numbers: 'Números',
      topic_shapes: 'Las formas',
      topic_sports: 'Los deportes',
      topic_feelings: 'Los sentimientos',
      topic_seasons: 'Las estaciones y el tiempo',
      sectionLearn: 'Aprender',
      sectionPlay: 'Jugar',
      sectionRace: 'Contra el reloj',
      sectionTogether: 'Jugar juntos',
      sectionMe: 'Mi progreso',
      whoPlays: '¿Quién juega?',
      newPlayer: 'Nuevo jugador',
      guest: 'Invitado',
      playerName: 'Nombre (opcional)',
      save: 'Guardar',
      newSticker: '¡Nueva pegatina: {word}!',
      stickers: 'Álbum de pegatinas',
      stickersDesc: 'Consigue una pegatina por cada palabra que aprendas.',
      stickerHelp: 'Acierta una palabra {n} veces en cualquier juego y ganarás su pegatina.',
      stickerCount: '{n} de {total}',
      scores: 'Puntuaciones',
      scoresDesc: 'Las mejores puntuaciones de este dispositivo.',
      noScores: 'Todavía no hay puntuaciones. ¡A jugar!',
      calmScores: 'En el modo tranquilo, las puntuaciones están ocultas.',
      newRecord: '¡Nuevo récord!',
      yourScore: 'Puntuación: {score}',
      yourBest: 'Tu récord: {score}',
      pointsN: '{n} puntos',
      gameOver: '¡Fin del juego!',
      dailyChallenge: 'Reto del día',
      dailyDesc: 'Las palabras de hoy son iguales para todos. ¿Cuántas emparejas en 60 segundos?',
      classChallenge: 'Reto de la clase',
      classChallengeDesc: 'Escribe el código de tu docente. Todos juegan con las mismas palabras.',
      enterCode: 'Escribe el código',
      join: 'Empezar',
      wrongCode: 'Ese código no funciona. Revísalo e inténtalo otra vez.',
      challengeBanner: 'Reto de la clase {code}',
      challengeOn: '¡Reto activado! Ahora elige un juego.',
      endChallenge: 'Terminar el reto',
      memory: 'Memoria',
      memoryDesc: 'Da la vuelta a dos cartas cada vez. ¡Encuentra cada imagen y su palabra!',
      memoryWon: '¡Encontraste todas las parejas en {moves} jugadas!',
      moves: 'Jugadas: {n}',
      beatClock: 'Gana al reloj',
      beatClockDesc: '¡Empareja todas las palabras que puedas en 60 segundos! Tres seguidas te dan tiempo extra.',
      pointsText: '¡Acertaste {n}!',
      oddOne: '¿Cuál sobra?',
      oddOneDesc: 'Tres imágenes van juntas. ¡Encuentra la que no encaja!',
      oddPrompt: '¿Cuál no encaja?',
      wordRain: 'Lluvia de palabras',
      wordRainDesc: '¡Lee la palabra y toca su imagen antes de que caiga!',
      caught: '¡Atrapaste {n} palabras!',
      balloon: 'Globos',
      balloonDesc: '¡Adivina las letras antes de que exploten todos los globos!',
      wordSearch: 'Sopa de letras',
      wordSearchDesc: 'Encuentra las palabras escondidas. Desliza el dedo hacia la derecha o hacia abajo.',
      wordSearchWon: '¡Encontraste todas las palabras!',
      tug: 'Tira y afloja',
      tugDesc: 'Dos jugadores, una tableta. Sentaos uno frente al otro. ¡El primero que toque la palabra correcta tira de la cuerda!',
      blueWins: '¡Gana el azul!',
      redWins: '¡Gana el rojo!',
      tugText: '¡Qué partido! ¿Otra vez?',
      bingo: 'Bingo de palabras',
      bingoDesc: 'Un juego para toda la clase: el docente canta las palabras y cada uno tiene su cartón.',
      bingoCaller: 'Yo canto las palabras',
      bingoCallerDesc: 'Para el docente. Muéstralo en la pizarra.',
      bingoPlayer: 'Tengo un cartón',
      bingoPlayerDesc: 'Para jugadores. Escribe el código de la pizarra.',
      bingoCodeHelp: 'Jugadores: escribid este código',
      nextWord: 'Siguiente palabra',
      startCalling: 'Empezar a cantar',
      calledWords: 'Palabras ya cantadas',
      bingoShout: '¡Bingo!',
      bingoShow: '¡Enseña tu cartón a tu docente!',
      bingoTap: 'Toca una imagen cuando oigas o veas su palabra.',
      newGame: 'Nueva partida',
      challengeHeading: 'Reto de la clase',
      challengeHelp: 'Cree un código para los temas elegidos arriba. Todos los dispositivos que lo introduzcan (en «Reto de la clase» en la lista de juegos) juegan con las mismas palabras, así que las puntuaciones se pueden comparar.',
      makeCode: 'Crear un código',
      challengeLink: 'O comparta este enlace:',
      calmHeading: 'Modo tranquilo',
      calmLabel: 'Sin cuentas atrás, récords ni clasificaciones',
      calmHelp: 'Oculta los juegos contra el reloj y las puntuaciones, y quita el tiempo de Busca las imágenes. Útil para niños a quienes la competición estresa.',
      playersHeading: 'Jugadores en este dispositivo',
      noPlayers: 'Todavía no hay jugadores. Los niños se añaden con el botón del animal en la lista de juegos.',
      removePlayer: 'Quitar',
      resetProgress: 'Borrar todas las puntuaciones y pegatinas',
      resetConfirm: '¿Borrar todas las puntuaciones y pegatinas de este dispositivo?',
      showTeacher: '¡Enséñaselo a tu docente!',
      scoreboard: 'Marcador de la clase',
      scoreboardDesc: 'Organice un reto de clase y recoja las puntuaciones de todos con un código QR.',
      chooseGame: '1. Elija un juego',
      topicsUsed: 'Temas: {topics}',
      allTopicsLabel: 'todos los temas',
      changeTopics: 'Cambiar los temas en los ajustes para docentes',
      makeChallenge: '2. Crear el reto',
      howToJoin: 'En cada iPad: abra la lista de juegos, toque Reto de la clase, escriba este código y juegue a {game}. O escanee el código QR con la cámara del iPad.',
      collect: '3. Recoger puntuaciones',
      scanHelp: 'Al terminar, los niños muestran su pantalla final a esta cámara.',
      startCamera: 'Encender la cámara',
      added: 'Añadido: {name}',
      wrongChallenge: 'Esa puntuación es de otro reto u otro juego.',
      addByHand: 'Añadir a mano',
      nameLabel: 'Nombre',
      scoreLabel: 'Puntuación',
      add: 'Añadir',
      showResults: 'Mostrar resultados',
      backToScan: 'Volver a recoger',
      noCamera: 'No hay cámara disponible. Puede añadir las puntuaciones a mano.',
      newChallenge: 'Nuevo reto',
      entries: '{n} puntuaciones',
      results: 'Resultados',
      liveClassroom: 'Clase en directo',
      liveDesc: 'Una clasificación en directo por la wifi del aula.',
      liveNeedsServer: 'La clase en directo necesita el programa de clase en este ordenador y esta página abierta desde él. Consulte «Live Classroom» en el README.',
      boardOnly: 'Abra la pizarra en el ordenador que ejecuta el programa de clase (localhost).',
      scanToJoin: 'Únete con tu iPad: escanea este código o escribe la dirección',
      startGame: 'Empezar la partida',
      endGame: 'Terminar la partida',
      playersN: '{n} jugadores',
      joinTitle: 'Únete al juego de la clase',
      joinBtn: 'Unirme',
      waiting: '¡Ya estás dentro! Espera a que tu docente empiece',
      lookAtBoard: '¡Mira la pizarra!',
      gameClosed: 'Esta partida ha terminado. Pregunta a tu docente.',
      noConnection: 'No se puede conectar con el ordenador del docente. Revisa la wifi.',
      finishedMark: 'terminado',
      teamBattle: 'Batalla de equipos',
      teamBattleDesc: '¡Divide la clase en equipos y turnaos en la pizarra!',
      howManyTeams: '¿Cuántos equipos?',
      questionsEach: 'Preguntas por equipo',
      teamN: 'Equipo {n}',
      teamTurn: '¡Equipo {n}, os toca!',
      teamSteal: 'Equipo {n}, ¿lo sabéis?',
      teamWins: '¡Gana el equipo {n}!',
      teamTie: '¡Empate! Todos habéis jugado muy bien.',
      teamPoints: 'A la primera: 2 puntos. Segunda oportunidad para el siguiente equipo: 1 punto.',
      wordBook: 'Diccionario ilustrado',
      wordBookDesc: 'Mira todas las imágenes. Toca una para oír la palabra.',
    },
  };

  LG.t = function (key, vars) {
    let s = TEXT[LG.lang][key];
    if (s === undefined) s = TEXT.en[key];
    if (typeof s === 'string' && vars) {
      s = s.replace(/\{(\w+)\}/g, (m, k) => (vars[k] !== undefined ? vars[k] : m));
    }
    return s;
  };

  LG.praise = function () {
    return LG.pick(LG.t('praise'));
  };

  // ---------- Teacher settings ----------
  //
  // Font, coloured letters, letter spacing and word topics. Saved on the device by the
  // settings page; a site that embeds the games can also set them in the
  // URL (?font=andika&colors=bdpq&spacing=1&topics=fruit,food), which wins over the device.

  LG.FONTS = ['default', 'andika', 'opendyslexic', 'lexend', 'atkinson'];
  LG.COLOR_LETTERS = ['b', 'd', 'p', 'q', 'g'];
  const DEFAULT_SETTINGS = { font: 'default', colors: [], spacing: false, topics: [], calm: false };

  function cleanSettings(raw) {
    raw = raw || {};
    return {
      font: LG.FONTS.includes(raw.font) ? raw.font : 'default',
      colors: LG.COLOR_LETTERS.filter((l) => (raw.colors || []).includes(l)),
      spacing: raw.spacing === true,
      topics: LG.TOPICS.map((t) => t.id).filter((id) => (raw.topics || []).includes(id)),
      // Calm mode: no countdowns, records or leaderboards.
      calm: raw.calm === true,
    };
  }

  LG.savedSettings = function () {
    try {
      return cleanSettings(JSON.parse(store('lg-settings') || '{}'));
    } catch (e) {
      return cleanSettings(DEFAULT_SETTINGS);
    }
  };

  LG.settings = (function () {
    const s = LG.savedSettings();
    if (params.has('font')) s.font = cleanSettings({ font: params.get('font') }).font;
    if (params.has('colors')) s.colors = cleanSettings({ colors: Array.from(params.get('colors')) }).colors;
    if (params.has('spacing')) s.spacing = params.get('spacing') === '1';
    if (params.has('topics')) s.topics = cleanSettings({ topics: params.get('topics').split(',') }).topics;
    if (params.has('calm')) s.calm = params.get('calm') === '1';
    return s;
  })();

  LG.applySettings = function (s) {
    LG.settings = cleanSettings(s);
    document.documentElement.dataset.font = LG.settings.font;
    document.documentElement.classList.toggle('wide-spacing', LG.settings.spacing);
  };
  LG.applySettings(LG.settings);

  LG.saveSettings = function (s) {
    store('lg-settings', JSON.stringify(cleanSettings(s)));
    LG.applySettings(s);
  };

  // URL options that reproduce the given settings ('' when all standard).
  LG.settingsQuery = function (s) {
    const q = [];
    if (s.font !== 'default') q.push('font=' + s.font);
    if (s.colors.length) q.push('colors=' + s.colors.join(''));
    if (s.spacing) q.push('spacing=1');
    if (s.topics.length) q.push('topics=' + s.topics.join(','));
    if (s.calm) q.push('calm=1');
    return q.join('&');
  };

  // ---------- Challenges ----------
  //
  // A class challenge code (e.g. K7QM-2XAB) packs the chosen topics and a
  // random seed into 8 characters, so every device that enters it plays the
  // same words in the same order. The daily challenge (?daily=1) uses
  // today's date as the seed, with all topics.

  // A small, stable string hash (FNV-1a).
  LG.hash = function (text) {
    let h = 2166136261;
    for (const c of String(text)) {
      h ^= c.codePointAt(0);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  };

  // Never reorder: codes store topics by position. Append new topics at the end.
  const TOPIC_CODES = ['farm', 'wild', 'water', 'bugs', 'fruit', 'vegetables', 'food', 'clothes', 'body', 'family', 'jobs', 'home',
    'household', 'toys', 'music', 'school', 'transport', 'places', 'sky', 'nature', 'seasons', 'colours', 'numbers', 'shapes', 'sports', 'feelings'];
  const B32 = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';

  // 40 bits: 26 for the topics, 10 for the seed and a 4-bit check so most
  // typos are rejected. The bits are scrambled (multiplied by an odd
  // constant, mod 2^40) so codes look random instead of starting with zeros.
  const MOD = 2n ** 40n;
  const MIX = 0x7f4a7c15n * 2n + 1n;
  let UNMIX = 1n;
  for (let i = 0; i < 6; i++) UNMIX = (UNMIX * (2n - MIX * UNMIX)) % MOD; // inverse of MIX
  UNMIX = (UNMIX + MOD) % MOD;

  LG.makeCode = function (topics, seed) {
    let mask = 0n;
    topics.forEach((t) => {
      const i = TOPIC_CODES.indexOf(t);
      if (i >= 0) mask += 2n ** BigInt(i);
    });
    const body = mask * 1024n + BigInt(seed % 1024);
    let v = ((body * 16n + BigInt(LG.hash(String(body)) % 16)) * MIX) % MOD;
    let out = '';
    for (let i = 0; i < 8; i++) {
      out = B32[Number(v % 32n)] + out;
      v /= 32n;
    }
    return out.slice(0, 4) + '-' + out.slice(4);
  };

  LG.readCode = function (code) {
    const clean = String(code || '').toUpperCase().replace(/O/g, '0').replace(/[IL]/g, '1').replace(/[^0-9A-Z]/g, '');
    if (clean.length !== 8) return null;
    let v = 0n;
    for (const c of clean) {
      const i = B32.indexOf(c);
      if (i < 0) return null;
      v = v * 32n + BigInt(i);
    }
    v = (v * UNMIX) % MOD;
    const body = v / 16n;
    if (Number(v % 16n) !== LG.hash(String(body)) % 16) return null;
    const mask = Number(body / 1024n);
    if (mask >= 2 ** TOPIC_CODES.length) return null;
    return {
      code: clean.slice(0, 4) + '-' + clean.slice(4),
      seed: Number(body % 1024n),
      topics: TOPIC_CODES.filter((t, i) => Math.floor(mask / 2 ** i) % 2 === 1),
    };
  };

  function session(key, value) {
    try {
      if (value === undefined) return sessionStorage.getItem(key);
      if (value === null) sessionStorage.removeItem(key);
      else sessionStorage.setItem(key, value);
    } catch (e) {
      return null;
    }
  }

  LG.challenge = LG.readCode(params.get('challenge') || session('lg-challenge'));
  if (LG.challenge) {
    session('lg-challenge', LG.challenge.code);
    LG.settings.topics = LG.challenge.topics;
  }
  LG.startChallenge = function (code) {
    const c = LG.readCode(code);
    if (!c) return false;
    session('lg-challenge', c.code);
    LG.challenge = c;
    LG.settings.topics = c.topics;
    return true;
  };
  LG.endChallenge = function () {
    session('lg-challenge', null);
    params.delete('challenge');
    location.search = params.toString();
  };

  LG.daily = (function () {
    if (params.get('daily') !== '1') return null;
    const d = new Date();
    const day = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
    return { day: day, seed: day };
  })();
  if (LG.daily) LG.settings.topics = [];

  // HTML for a word or letter, with the chosen letters wrapped in colour.
  LG.fmt = function (text) {
    const colors = LG.settings.colors;
    return Array.from(String(text))
      .map((c) => {
        const safe = c === '<' ? '&lt;' : c === '>' ? '&gt;' : c === '&' ? '&amp;' : c;
        return colors.includes(c) ? '<span class="lc lc-' + c + '">' + safe + '</span>' : safe;
      })
      .join('');
  };

  // ---------- Helpers ----------

  // Random numbers for word choice. Challenges seed them so every device
  // picks the same words; everything else uses Math.random.
  let rand = Math.random;
  LG.random = () => rand();
  LG.seedRandom = function (seed) {
    if (seed === null || seed === undefined) {
      rand = Math.random;
      return;
    }
    let a = seed >>> 0;
    rand = function () {
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  };

  LG.shuffle = function (list) {
    const a = list.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(LG.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  LG.pick = (list) => list[Math.floor(LG.random() * list.length)];
  LG.sample = (list, n) => LG.shuffle(list).slice(0, n);

  LG.el = function (tag, className, html) {
    const e = document.createElement(tag);
    if (className) e.className = className;
    if (html !== undefined) e.innerHTML = html;
    return e;
  };

  LG.ICONS = {
    trophy: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h10v2h4v3a5 5 0 0 1-5 5h-.4A5 5 0 0 1 13 15.9V18h3v3H8v-3h3v-2.1A5 5 0 0 1 8.4 13H8a5 5 0 0 1-5-5V5h4zm0 4H5v1a3 3 0 0 0 2 2.8zm10 0v3.8A3 3 0 0 0 19 8V7z" fill="currentColor"/></svg>',
    flag: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 2h2v20H5zM8 3h11l-3 4.5L19 12H8z" fill="currentColor"/></svg>',
    close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>',
    heart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21C5 16 2 12.5 2 8.5 2 5.4 4.4 3 7.4 3c1.9 0 3.5 1 4.6 2.5C13.1 4 14.7 3 16.6 3 19.6 3 22 5.4 22 8.5c0 4-3 7.5-10 12.5z" fill="currentColor"/></svg>',
    clock: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="13" r="8.5" fill="#fff" stroke="currentColor" stroke-width="2.5"/><path d="M12 8.5V13l3 2M9.5 2.5h5" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>',
    gear: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10.3 2h3.4l.5 2.6 1.9.8 2.2-1.5 2.4 2.4-1.5 2.2.8 1.9 2.6.5v3.4l-2.6.5-.8 1.9 1.5 2.2-2.4 2.4-2.2-1.5-1.9.8-.5 2.6h-3.4l-.5-2.6-1.9-.8-2.2 1.5-2.4-2.4 1.5-2.2-.8-1.9L2 13.7v-3.4l2.6-.5.8-1.9-1.5-2.2 2.4-2.4 2.2 1.5 1.9-.8z" fill="currentColor"/><circle cx="12" cy="12" r="3.2" fill="#fff"/></svg>',
    globe: '<svg viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/></g></svg>',
    home: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 11 12 3l9 8v10h-6v-6H9v6H3z" fill="currentColor"/></svg>',
    soundOn: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9h4l5-4v14l-5-4H3z" fill="currentColor"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    soundOff: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9h4l5-4v14l-5-4H3z" fill="currentColor"/><path d="m16 9 6 6m0-6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4v16l13-8z" fill="currentColor"/></svg>',
    again: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v4h4" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    star: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 3 6.6 7.2.8-5.4 4.9 1.5 7.1L12 17.8 5.7 21.4l1.5-7.1L1.8 9.4 9 8.6z" fill="currentColor"/></svg>',
  };

  // ---------- Sound ----------

  LG.muted = store('lg-muted') === '1';
  LG.setMuted = function (m) {
    LG.muted = m;
    store('lg-muted', m ? '1' : '0');
    if (m && window.speechSynthesis) speechSynthesis.cancel();
  };

  const synth = window.speechSynthesis;
  const SPEECH_LANG = { en: 'en-US', sl: 'sl-SI', de: 'de-DE', fr: 'fr-FR', es: 'es-ES' };
  let voices = [];
  let voicesSettled = false;
  const voiceListeners = [];
  function loadVoices() {
    voices = synth ? synth.getVoices() : [];
    if (voices.length) voicesSettled = true;
    voiceListeners.forEach((cb) => cb());
  }
  if (synth) {
    loadVoices();
    synth.addEventListener && synth.addEventListener('voiceschanged', loadVoices);
  }
  // Some browsers never fire voiceschanged; after a moment, trust what we have.
  setTimeout(() => {
    voicesSettled = true;
    loadVoices();
  }, 2000);

  function findVoice() {
    const want = SPEECH_LANG[LG.lang].toLowerCase();
    const norm = (v) => v.lang.replace('_', '-').toLowerCase();
    return voices.find((v) => norm(v) === want) || voices.find((v) => norm(v).startsWith(LG.lang + '-') || norm(v) === LG.lang) || null;
  }

  // 'ok', 'missing' (no voice for this language), 'none' (no speech at all)
  // or 'unknown' (still loading).
  LG.voiceStatus = function () {
    if (!synth) return 'none';
    if (findVoice()) return 'ok';
    if (!voicesSettled) return 'unknown';
    return voices.length ? 'missing' : 'none';
  };
  LG.onVoices = (cb) => voiceListeners.push(cb);

  // Keeps utterances referenced until they finish; Chrome can otherwise
  // garbage-collect them mid-sentence and never fire onend.
  const speaking = new Set();

  // Speaks text in the current language. Resolves when finished (or at once
  // if speech is unavailable), so games never wait on audio to continue.
  // Call it straight from a tap handler: iOS and some Chrome versions only
  // allow speech that starts during a user gesture, so it must not be
  // delayed with setTimeout.
  LG.speak = function (text) {
    return new Promise((resolve) => {
      if (LG.muted || !synth || !text) return resolve();
      const voice = findVoice();
      // Voices are loaded but none speaks this language: stay silent rather
      // than read the words with the wrong accent.
      if (LG.voiceStatus() === 'missing') return resolve();
      if (synth.speaking || synth.pending) synth.cancel();
      synth.resume();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = SPEECH_LANG[LG.lang];
      if (voice) u.voice = voice;
      u.rate = 0.85;
      u.pitch = 1.05;
      let done = false;
      const finish = () => {
        speaking.delete(u);
        if (!done) {
          done = true;
          resolve();
        }
      };
      u.onend = finish;
      u.onerror = finish;
      speaking.add(u);
      setTimeout(finish, 1500 + text.length * 120);
      synth.speak(u);
    });
  };

  // A short note shown when this device can't read the current language aloud.
  LG.voiceNotice = function () {
    const note = LG.el('p', 'voice-note');
    note.setAttribute('role', 'status');
    const update = () => {
      const status = LG.voiceStatus();
      note.textContent = status === 'missing' || status === 'none' ? LG.t('voiceMissing') : '';
      note.hidden = !note.textContent;
    };
    update();
    LG.onVoices(update);
    return note;
  };

  LG.letterName = function (letter) {
    return (LG.LETTER_NAMES[LG.lang] || {})[letter.toLowerCase()] || letter.toUpperCase();
  };

  let audio = null;
  function tone(freq, start, dur, type, vol) {
    if (LG.muted) return;
    try {
      audio = audio || new (window.AudioContext || window.webkitAudioContext)();
      if (audio.state === 'suspended') audio.resume();
      const t0 = audio.currentTime + start;
      const osc = audio.createOscillator();
      const gain = audio.createGain();
      osc.type = type || 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.0001, t0);
      gain.gain.exponentialRampToValueAtTime(vol || 0.18, t0 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      osc.connect(gain).connect(audio.destination);
      osc.start(t0);
      osc.stop(t0 + dur + 0.05);
    } catch (e) {
      /* audio not available */
    }
  }
  LG.sfx = {
    tap: () => tone(520, 0, 0.08, 'triangle', 0.08),
    good: () => {
      tone(660, 0, 0.15);
      tone(880, 0.12, 0.25);
    },
    bad: () => tone(200, 0, 0.25, 'triangle', 0.15),
    win: () => [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.13, 0.3)),
  };

  // ---------- Effects ----------

  const reducedMotion = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const CONFETTI = ['#ff6b6b', '#ffd43b', '#51cf66', '#4dabf7', '#cc5de8', '#ff922b'];

  LG.confetti = function (count) {
    if (reducedMotion) return;
    const box = LG.el('div', 'confetti');
    for (let i = 0; i < (count || 40); i++) {
      const c = LG.el('i');
      c.style.left = Math.random() * 100 + '%';
      c.style.background = CONFETTI[Math.floor(Math.random() * CONFETTI.length)];
      c.style.animationDelay = Math.random() * 0.4 + 's';
      c.style.animationDuration = 1.2 + Math.random() * 1.2 + 's';
      c.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
      box.appendChild(c);
    }
    document.body.appendChild(box);
    setTimeout(() => box.remove(), 3000);
  };

  // Shrinks the text of every .fit element (inside root) just enough to fit
  // its box, so long words stay readable with wide fonts and spacing.
  LG.fit = function (root) {
    (root || document).querySelectorAll('.fit').forEach((el) => {
      el.style.fontSize = '';
      let size = parseFloat(getComputedStyle(el).fontSize);
      const min = size * 0.45;
      while (el.scrollWidth > el.clientWidth + 1 && size > min) {
        size -= 1;
        el.style.fontSize = size + 'px';
      }
    });
  };
  if (document.fonts) document.fonts.ready.then(() => LG.fit());
  addEventListener('resize', () => LG.fit());
  addEventListener('load', () => LG.fit());

  LG.shake = function (node) {
    node.classList.remove('shake');
    void node.offsetWidth;
    node.classList.add('shake');
  };

  // A picture card with a "listen" button.
  LG.pictureCard = function (pic, onListen) {
    const card = LG.el('div', 'pic-card');
    card.appendChild(LG.el('div', 'pic', LG.picture(pic)));
    if (onListen) {
      const b = LG.el('button', 'icon-btn listen-btn', LG.ICONS.soundOn);
      b.type = 'button';
      b.setAttribute('aria-label', LG.t('listen'));
      b.addEventListener('click', onListen);
      card.appendChild(b);
    }
    return card;
  };

  // ---------- Players, scores and stickers ----------
  //
  // Everything is kept on this device only (localStorage). A "player" is an
  // animal avatar with an optional name, so children never need to type.

  LG.AVATARS = ['cat', 'dog', 'lion', 'panda', 'fox', 'frog', 'owl', 'rabbit', 'bear', 'penguin', 'tiger', 'koala', 'monkey', 'pig', 'duck', 'elephant'];
  LG.STICKER_AT = 3; // correct answers that earn a word's sticker

  let prog;
  try {
    prog = JSON.parse(store('lg-progress') || '{}') || {};
  } catch (e) {
    prog = {};
  }
  prog.players = prog.players || [];
  prog.scores = prog.scores || {};
  prog.stickers = prog.stickers || {};
  const saveProgress = () => store('lg-progress', JSON.stringify(prog));
  const playerKey = () => (LG.currentPlayer() ? LG.currentPlayer().id : 'guest');

  LG.players = () => prog.players.slice();
  LG.currentPlayer = () => prog.players.find((p) => p.id === prog.current) || null;
  LG.setPlayer = function (id) {
    prog.current = id;
    saveProgress();
  };
  LG.addPlayer = function (avatar, name) {
    const id = 'p' + Date.now().toString(36) + Math.floor(Math.random() * 1000);
    prog.players.push({ id: id, avatar: avatar, name: (name || '').trim().slice(0, 20), num: 10 + Math.floor(Math.random() * 90) });
    LG.setPlayer(id);
    return id;
  };
  LG.removePlayer = function (id) {
    prog.players = prog.players.filter((p) => p.id !== id);
    Object.keys(prog.scores).forEach((g) => (prog.scores[g] = prog.scores[g].filter((e) => e.p !== id)));
    delete prog.stickers[id];
    if (prog.current === id) prog.current = null;
    saveProgress();
  };
  LG.resetProgress = function () {
    prog.scores = {};
    prog.stickers = {};
    saveProgress();
  };
  LG.playerById = (id) => prog.players.find((p) => p.id === id) || null;

  // Who this device is in a class game: the current player, or a guest
  // animal with a number ("Fox 37") that stays the same on this device.
  LG.identity = function () {
    const p = LG.currentPlayer();
    if (p) {
      if (!p.num) {
        p.num = 10 + Math.floor(Math.random() * 90);
        saveProgress();
      }
      return { avatar: p.avatar, num: p.num, name: p.name || '' };
    }
    if (!prog.guest) {
      prog.guest = { avatar: LG.AVATARS[Math.floor(Math.random() * LG.AVATARS.length)], num: 10 + Math.floor(Math.random() * 90) };
      saveProgress();
    }
    return { avatar: prog.guest.avatar, num: prog.guest.num, name: '' };
  };
  // "Mia", or the avatar's word and number ("Fuchs 37") in the current language.
  LG.displayName = function (who) {
    if (who.name) return who.name;
    const v = LG.VOCAB.find((x) => x.pic === who.avatar);
    const word = v ? v[LG.lang] : who.avatar;
    return word.charAt(0).toLocaleUpperCase(LG.lang) + word.slice(1) + ' ' + who.num;
  };

  // ---------- Score codes (Class Scoreboard) ----------
  //
  // At the end of a class challenge, scored games show a QR code holding the
  // challenge code, game, score and who played; the teacher's Class
  // Scoreboard scans them. A short check makes made-up codes unlikely to pass.

  LG.SCORE_GAMES = [
    { id: 'beat-clock', title: 'beatClock', pic: 'clock', better: 'high' },
    { id: 'word-rain', title: 'wordRain', pic: 'cloud', better: 'high' },
    { id: 'memory', title: 'memory', pic: 'cherry', better: 'low' },
    { id: 'word-search', title: 'wordSearch', pic: 'glasses', better: 'low' },
    { id: 'picture-hunt', title: 'pictureHunt', pic: 'map', better: 'low' },
  ];
  LG.formatScore = function (gameId, score) {
    const g = LG.SCORE_GAMES.find((x) => x.id === gameId);
    return g && g.better === 'low' ? LG.formatTime(score) : LG.t('pointsN', { n: score });
  };
  const scoreCheck = (body) => (LG.hash('lgs|' + body) % 46656).toString(36).padStart(3, '0');
  LG.scoreCode = function (challenge, gameId, score, who) {
    const body = [challenge.replace('-', ''), LG.SCORE_GAMES.findIndex((g) => g.id === gameId), score, LG.AVATARS.indexOf(who.avatar), who.num, encodeURIComponent(who.name || '')].join('.');
    return 'LGS1.' + body + '.' + scoreCheck(body);
  };
  LG.readScoreCode = function (text) {
    const m = /^LGS1\.(([0-9A-Z]{8})\.(\d+)\.(\d+)\.(\d+)\.(\d+)\.([^.]*))\.([0-9a-z]{3})$/.exec(String(text || '').trim());
    if (!m || scoreCheck(m[1]) !== m[8]) return null;
    const game = LG.SCORE_GAMES[+m[3]];
    const avatar = LG.AVATARS[+m[5]];
    if (!game || !avatar) return null;
    let name = '';
    try {
      name = decodeURIComponent(m[7]).slice(0, 20);
    } catch (e) {
      return null;
    }
    return { challenge: m[2].slice(0, 4) + '-' + m[2].slice(4), game: game.id, score: +m[4], avatar: avatar, num: +m[6], name: name };
  };

  // Loads one of the bundled libraries (shared/vendor/...) once.
  const loading = {};
  LG.loadScript = function (path) {
    if (!loading[path]) {
      loading[path] = new Promise((resolve, reject) => {
        const el = document.createElement('script');
        el.src = new URL(path, SHARED).href;
        el.onload = resolve;
        el.onerror = reject;
        document.head.appendChild(el);
      });
    }
    return loading[path];
  };
  LG.qrSvg = function (text, cell) {
    const qr = window.qrcode(0, 'M');
    qr.addData(text);
    qr.make();
    return qr.createSvgTag(cell || 4, 2);
  };

  // ---------- Live Classroom ----------
  //
  // When the games are opened from the classroom program on the teacher's
  // computer (?live=1), they report progress and the final score to it, and
  // the board shows a live leaderboard.

  LG.live = params.get('live') === '1' ? { pid: session('lg-live-pid') } : null;
  LG.api = function (path, body) {
    return fetch(new URL('../api/' + path, SHARED).href, body === undefined ? {} : {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).then((r) => (r.ok ? r.json() : Promise.reject(r.status)));
  };
  let lastReport = 0;
  let reportTimer = null;
  // progress: 0-1 of the game done; score: points or time so far.
  LG.liveReport = function (progress, score, done) {
    if (!LG.live || !LG.live.pid) return;
    const send = () => {
      lastReport = Date.now();
      LG.api('score', { pid: LG.live.pid, progress: progress, score: score, done: !!done }).catch(() => {});
    };
    clearTimeout(reportTimer);
    // At most two reports a second, but always send the last one.
    if (done || Date.now() - lastReport > 500) send();
    else reportTimer = setTimeout(send, 500);
  };

  // Saves a score; returns { best } when it beats this player's previous best.
  LG.recordScore = function (game, score, better) {
    const list = (prog.scores[game] = prog.scores[game] || []);
    const me = playerKey();
    const prev = LG.bestScore(game, better, me);
    list.push({ p: me, s: score, d: Date.now() });
    list.sort((a, b) => (better === 'low' ? a.s - b.s : b.s - a.s));
    list.splice(100);
    saveProgress();
    return { best: prev === null || (better === 'low' ? score < prev : score > prev) };
  };
  LG.bestScore = function (game, better, who) {
    who = who || playerKey();
    const mine = (prog.scores[game] || []).filter((e) => e.p === who).map((e) => e.s);
    if (!mine.length) return null;
    return better === 'low' ? Math.min(...mine) : Math.max(...mine);
  };
  // Each player's best score, best first.
  LG.topScores = function (game, better, n) {
    const seen = {};
    return (prog.scores[game] || []).filter((e) => (seen[e.p] ? false : (seen[e.p] = true))).slice(0, n || 10);
  };

  // Counts a correct answer for a word; at LG.STICKER_AT the word's sticker
  // is unlocked and announced.
  LG.markCorrect = function (pic) {
    const who = playerKey();
    const mine = (prog.stickers[who] = prog.stickers[who] || {});
    const book = (mine[LG.lang] = mine[LG.lang] || {});
    book[pic] = (book[pic] || 0) + 1;
    saveProgress();
    if (book[pic] !== LG.STICKER_AT) return false;
    const v = LG.VOCAB.find((x) => x.pic === pic);
    LG.toast('<div class="toast-pic">' + LG.picture(pic) + '</div><span>' + LG.t('newSticker', { word: LG.fmt(v ? v[LG.lang] : pic) }) + '</span>');
    return true;
  };
  LG.stickerCounts = function () {
    return (prog.stickers[playerKey()] || {})[LG.lang] || {};
  };

  LG.toast = function (html) {
    const t = LG.el('div', 'toast', html);
    t.setAttribute('role', 'status');
    document.body.appendChild(t);
    setTimeout(() => t.classList.add('out'), 2600);
    setTimeout(() => t.remove(), 3200);
  };

  LG.avatarHtml = (p) => '<span class="avatar">' + LG.picture(p ? p.avatar : 'star') + '</span>';
  LG.playerName = (p) => (p ? p.name || '' : LG.t('guest'));

  // "Who is playing?": pick a player, play as guest, or add a new player.
  LG.choosePlayer = function (onDone) {
    const o = LG.el('div', 'overlay');
    const panel = LG.el('div', 'panel player-panel');
    o.appendChild(panel);
    function done() {
      o.remove();
      if (onDone) onDone();
    }
    function list() {
      panel.innerHTML = '<h2>' + LG.t('whoPlays') + '</h2>';
      const grid = LG.el('div', 'player-grid');
      prog.players.forEach((p) => {
        const b = LG.el('button', 'player-btn' + (p.id === prog.current ? ' active' : ''), LG.avatarHtml(p) + '<span></span>');
        b.type = 'button';
        b.querySelector('span:last-child').textContent = p.name;
        b.addEventListener('click', () => {
          LG.setPlayer(p.id);
          done();
        });
        grid.appendChild(b);
      });
      const guest = LG.el('button', 'player-btn' + (!LG.currentPlayer() ? ' active' : ''), LG.avatarHtml(null) + '<span>' + LG.t('guest') + '</span>');
      guest.type = 'button';
      guest.addEventListener('click', () => {
        LG.setPlayer(null);
        done();
      });
      const add = LG.el('button', 'player-btn add', '<span class="avatar plus">+</span><span>' + LG.t('newPlayer') + '</span>');
      add.type = 'button';
      add.addEventListener('click', create);
      grid.append(guest, add);
      panel.appendChild(grid);
    }
    function create() {
      panel.innerHTML = '<h2>' + LG.t('newPlayer') + '</h2>';
      let avatar = LG.AVATARS[Math.floor(Math.random() * LG.AVATARS.length)];
      const grid = LG.el('div', 'avatar-grid');
      LG.AVATARS.forEach((a) => {
        const b = LG.el('button', 'avatar-btn' + (a === avatar ? ' active' : ''), LG.picture(a));
        b.type = 'button';
        b.setAttribute('aria-label', a);
        b.addEventListener('click', () => {
          avatar = a;
          grid.querySelectorAll('.avatar-btn').forEach((x) => x.classList.toggle('active', x === b));
        });
        grid.appendChild(b);
      });
      const name = LG.el('input', 'name-input');
      name.placeholder = LG.t('playerName');
      name.maxLength = 20;
      name.setAttribute('aria-label', LG.t('playerName'));
      const save = LG.el('button', 'big-btn', '<span>' + LG.t('save') + '</span>');
      save.type = 'button';
      save.addEventListener('click', () => {
        LG.addPlayer(avatar, name.value);
        done();
      });
      panel.append(grid, name, save);
    }
    list();
    document.body.appendChild(o);
  };

  // A button showing who is playing; tapping it opens the player picker.
  LG.playerChip = function (onChange) {
    const b = LG.el('button', 'player-chip');
    b.type = 'button';
    b.setAttribute('aria-label', LG.t('whoPlays'));
    const draw = () => {
      const p = LG.currentPlayer();
      b.innerHTML = LG.avatarHtml(p) + '<span></span>';
      b.querySelector('span:last-child').textContent = LG.playerName(p);
    };
    b.addEventListener('click', () => LG.choosePlayer(() => {
      draw();
      if (onChange) onChange();
    }));
    draw();
    return b;
  };

  // ---------- Timers ----------

  // A clock that counts up, or down from `seconds`, and pauses while the
  // page is hidden. onTick(ms) runs about five times a second.
  LG.clock = function (o) {
    let ms = o.seconds ? o.seconds * 1000 : 0;
    let last = performance.now();
    let stopped = false;
    const id = setInterval(() => {
      const now = performance.now();
      const dt = document.hidden ? 0 : now - last;
      last = now;
      ms = o.seconds ? Math.max(0, ms - dt) : ms + dt;
      if (o.onTick) o.onTick(ms);
      if (o.seconds && ms === 0) {
        stop();
        if (o.onEnd) o.onEnd();
      }
    }, 200);
    function stop() {
      stopped = true;
      clearInterval(id);
    }
    return {
      stop: stop,
      add: (sec) => (ms += sec * 1000),
      get ms() {
        return ms;
      },
      get stopped() {
        return stopped;
      },
    };
  };
  LG.formatTime = function (ms) {
    const secs = Math.ceil(ms / 1000);
    return Math.floor(secs / 60) + ':' + String(secs % 60).padStart(2, '0');
  };
  // A timer bar (fraction 0-1) or, for count-up clocks, just the time.
  LG.timerBar = function (withBar) {
    const el = LG.el('div', 'timer', LG.ICONS.clock);
    el.setAttribute('role', 'timer');
    let fill = null;
    if (withBar) fill = el.appendChild(LG.el('div', 'timer-bar')).appendChild(LG.el('div', 'timer-fill'));
    const text = el.appendChild(LG.el('span', 'timer-text'));
    return {
      el: el,
      set(ms, fraction) {
        text.textContent = LG.formatTime(ms);
        if (fill) {
          fill.style.width = fraction * 100 + '%';
          el.classList.toggle('low', fraction < 0.2);
        }
      },
    };
  };

  // ---------- Page parts ----------

  // The top bar used by every page: home link, title, language and sound.
  LG.topbar = function (title, homeHref) {
    const bar = LG.el('header', 'topbar');
    if (params.get('home') !== '0' && homeHref) {
      const home = LG.el('a', 'icon-btn', LG.ICONS.home);
      home.href = LG.link(homeHref);
      home.setAttribute('aria-label', LG.t('allGames'));
      bar.appendChild(home);
    }
    bar.appendChild(LG.el('h1', 'game-title', title));
    const tools = LG.el('div', 'tools');
    tools.append(LG.langSwitch(), LG.soundButton());
    bar.appendChild(tools);
    return bar;
  };

  // Shown under the top bar during a class or daily challenge.
  LG.challengeBanner = function () {
    if (!LG.challenge && !LG.daily) return null;
    const b = LG.el('div', 'challenge-banner', LG.ICONS.flag + '<span></span>');
    b.querySelector('span').textContent = LG.daily
      ? LG.t('dailyChallenge') + ' · ' + new Date().toLocaleDateString(LG.lang)
      : LG.t('challengeBanner', { code: LG.challenge.code });
    if (LG.challenge && !LG.daily) {
      const x = LG.el('button', 'banner-close', LG.ICONS.close);
      x.type = 'button';
      x.setAttribute('aria-label', LG.t('endChallenge'));
      x.addEventListener('click', LG.endChallenge);
      b.appendChild(x);
    }
    return b;
  };

  // ---------- Language switch (used by the hub and the games) ----------

  const LANG_NAMES = { en: 'English', sl: 'Slovenščina', de: 'Deutsch', fr: 'Français', es: 'Español' };

  // A compact button showing the current language code; tapping it opens a
  // menu with every language.
  LG.langSwitch = function () {
    const box = LG.el('div', 'lang-switch');
    const btn = LG.el('button', 'lang-btn', LG.ICONS.globe + '<span>' + LG.lang.toUpperCase() + '</span>');
    btn.type = 'button';
    btn.setAttribute('aria-haspopup', 'true');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Language: ' + LANG_NAMES[LG.lang]);
    const menu = LG.el('div', 'lang-menu');
    menu.hidden = true;
    LANGS.forEach((code) => {
      const item = LG.el('button', code === LG.lang ? 'active' : '', '<b>' + code.toUpperCase() + '</b> ' + LANG_NAMES[code]);
      item.type = 'button';
      item.lang = code;
      item.setAttribute('aria-current', code === LG.lang);
      item.addEventListener('click', () => {
        if (code === LG.lang) close();
        else LG.setLang(code);
      });
      menu.appendChild(item);
    });
    function close() {
      menu.hidden = true;
      btn.setAttribute('aria-expanded', 'false');
    }
    btn.addEventListener('click', () => {
      menu.hidden = !menu.hidden;
      btn.setAttribute('aria-expanded', String(!menu.hidden));
      if (!menu.hidden) menu.querySelector('.active').focus();
    });
    document.addEventListener('click', (e) => {
      if (!box.contains(e.target)) close();
    });
    box.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        close();
        btn.focus();
      }
    });
    box.append(btn, menu);
    return box;
  };

  LG.soundButton = function () {
    const b = LG.el('button', 'icon-btn');
    b.type = 'button';
    b.setAttribute('aria-label', LG.t('sound'));
    const draw = () => {
      b.innerHTML = LG.muted ? LG.ICONS.soundOff : LG.ICONS.soundOn;
      b.setAttribute('aria-pressed', !LG.muted);
    };
    b.addEventListener('click', () => {
      LG.setMuted(!LG.muted);
      draw();
    });
    draw();
    return b;
  };

  // ---------- Game shell ----------
  //
  // LG.createGame({ titleKey, descKey, pic, rounds, round(index, ctx), ... })
  // round() draws one round into ctx.stage and calls ctx.complete(promise)
  // when the child has solved it (or ctx.complete(promise, { missed: true })
  // when the round was given up). Games that aren't played in rounds pass
  // `progress: false` and call ctx.end(result) themselves.
  //   score: { id, better: 'high' | 'low', format(score) } records scores,
  //          personal bests and the device leaderboard.
  //   timed: true marks a game built around a countdown (hidden in calm mode).
  // Add ?home=0 to a game's URL to hide the link back to the game list.

  LG.createGame = function (opts) {
    const rounds = opts.rounds || 8;
    const showHome = params.get('home') !== '0';
    const calm = LG.settings.calm;
    const title = LG.daily && opts.daily ? LG.t('dailyChallenge') : LG.t(opts.titleKey);
    const scoreId = opts.score ? (LG.daily && opts.daily ? 'daily-' + LG.daily.day : opts.score.id) : null;
    document.title = title + ' · ' + LG.t('appTitle');

    const bar = LG.topbar(title, '../../index.html');
    const banner = LG.challengeBanner();

    const progress = LG.el('div', 'progress');
    progress.setAttribute('role', 'progressbar');
    progress.setAttribute('aria-valuemin', 0);
    progress.setAttribute('aria-valuemax', rounds);
    const dots = [];
    for (let i = 0; i < rounds; i++) dots.push(progress.appendChild(LG.el('span', 'dot', LG.ICONS.star)));

    const stage = LG.el('main', 'stage');
    stage.setAttribute('aria-live', 'polite');

    if (opts.progress === false) progress.hidden = true;
    document.body.append(bar);
    if (banner) document.body.append(banner);
    document.body.append(progress, stage);

    function overlay(inner) {
      const o = LG.el('div', 'overlay');
      const panel = LG.el('div', 'panel');
      panel.append(...inner);
      o.appendChild(panel);
      document.body.appendChild(o);
      const btn = panel.querySelector('button');
      if (btn) btn.focus();
      return o;
    }

    function bigButton(icon, label, onClick) {
      const b = LG.el('button', 'big-btn', icon + '<span>' + label + '</span>');
      b.type = 'button';
      b.addEventListener('click', onClick);
      return b;
    }

    let round = 0;
    let locked = false;
    let missed = 0;
    let cleanups = [];
    const cleanup = () => cleanups.splice(0).forEach((f) => f());

    function setProgress() {
      dots.forEach((d, i) => d.classList.toggle('done', i < round));
      progress.setAttribute('aria-valuenow', round);
    }

    function showRound() {
      cleanup();
      locked = false;
      stage.innerHTML = '';
      opts.round(round, ctx);
      LG.fit(stage);
    }

    const ctx = {
      stage: stage,
      rounds: rounds,
      calm: calm,
      // Call when the round is solved; waits for `wait` (e.g. speech) before moving on.
      complete(wait, how) {
        if (locked) return;
        locked = true;
        if (how && how.missed) {
          missed++;
          dots[round].classList.add('missed');
        } else {
          LG.sfx.good();
          LG.confetti(18);
          dots[round].classList.add('pop');
        }
        round++;
        setProgress();
        const minDelay = new Promise((r) => setTimeout(r, 1300));
        const maxDelay = new Promise((r) => setTimeout(r, 4500));
        Promise.race([Promise.all([minDelay, wait || Promise.resolve()]), maxDelay]).then(() => {
          if (round >= rounds) finish();
          else showRound();
        });
      },
      isLocked: () => locked,
      // End the game now. result: { won, stars (0-3), title, text, score }.
      end: (result) => finish(result),
      // Runs fn when the round ends or the game restarts (stop clocks etc.).
      onCleanup: (fn) => cleanups.push(fn),
      // Progress so far (0-1) and score, for the Live Classroom board.
      report: (progress, score) => LG.liveReport(progress, score, false),
    };

    function start() {
      cleanup();
      round = 0;
      missed = 0;
      // Challenges replay the same words on every device.
      const seed = LG.daily && opts.daily ? LG.daily.seed : LG.challenge ? LG.challenge.seed : null;
      LG.seedRandom(seed === null ? null : LG.hash(seed + ':' + opts.titleKey));
      setProgress();
      dots.forEach((d) => d.classList.remove('pop', 'missed'));
      if (opts.onStart) opts.onStart();
      showRound();
    }

    function finish(result) {
      cleanup();
      result = result || {};
      const won = result.won !== false;
      const heading = result.title || LG.t('wellDone');
      const text = result.text || LG.t('finished');
      const count = result.stars !== undefined ? result.stars : missed === 0 ? 3 : missed < 3 ? 2 : 1;
      stage.innerHTML = '';
      if (won) {
        LG.sfx.win();
        LG.confetti(70);
      }
      const parts = [];
      let starsHtml = '';
      for (let i = 0; i < 3; i++) starsHtml += i < count ? LG.ICONS.star : LG.ICONS.star.replace('<svg', '<svg class="empty"');
      parts.push(LG.el('div', 'big-stars', starsHtml));
      let record = false;
      if (scoreId && result.score !== undefined) {
        record = LG.recordScore(scoreId, result.score, opts.score.better).best;
        if (record && !calm) parts.push(LG.el('div', 'record', LG.ICONS.trophy + '<span>' + LG.t('newRecord') + '</span>'));
      }
      parts.push(LG.el('h2', '', heading), LG.el('p', '', text));
      if (scoreId && result.score !== undefined) parts.push(LG.el('p', 'score-line', LG.t('yourScore', { score: opts.score.format(result.score) })));
      // Live Classroom: send the final score; the board shows the results.
      if (LG.live) {
        LG.liveReport(1, result.score === undefined ? null : result.score, true);
        parts.push(LG.el('p', 'look-board', LG.t('lookAtBoard')));
      }
      // Class challenge: a QR code the teacher's Class Scoreboard can scan.
      if (LG.challenge && !LG.live && !LG.daily && !calm && opts.score && result.score !== undefined) {
        const box = LG.el('div', 'score-qr');
        const code = LG.scoreCode(LG.challenge.code, opts.score.id, result.score, LG.identity());
        LG.loadScript('vendor/qrcode.js').then(() => {
          box.innerHTML = LG.qrSvg(code, 5);
          box.appendChild(LG.el('span', '', LG.t('showTeacher')));
        }).catch(() => {});
        parts.push(box);
      }
      const buttons = LG.el('div', 'panel-buttons');
      parts.push(buttons);
      LG.speak(heading + ' ' + text + (record && !calm ? ' ' + LG.t('newRecord') : ''));
      const o = overlay(parts);
      // One go per live game: no "play again".
      if (!LG.live) buttons.appendChild(bigButton(LG.ICONS.again, LG.t('playAgain'), () => {
        o.remove();
        start();
      }));
      if (scoreId && showHome && !calm && !LG.live) {
        const a = LG.el('a', 'big-btn secondary', LG.ICONS.trophy + '<span>' + LG.t('scores') + '</span>');
        a.href = LG.link('../../scores.html') + '#' + scoreId;
        buttons.appendChild(a);
      }
      if (showHome) {
        const a = LG.el('a', 'big-btn secondary', LG.ICONS.home + '<span>' + LG.t('allGames') + '</span>');
        a.href = LG.link('../../index.html');
        buttons.appendChild(a);
      }
      const first = buttons.querySelector('button, a');
      if (first) first.focus();
    }

    // Start screen. The Play tap also unlocks speech and sound in browsers
    // that only allow audio after a user gesture.
    const best = LG.el('p', 'best-line');
    const showBest = () => {
      const b = scoreId && !calm ? LG.bestScore(scoreId, opts.score.better) : null;
      best.textContent = b === null ? '' : LG.t('yourBest', { score: opts.score.format(b) });
      best.hidden = b === null;
    };
    showBest();
    const startParts = [
      LG.el('div', 'panel-pic', LG.picture(opts.pic)),
      LG.el('h2', '', title),
      LG.el('p', '', LG.t(opts.daily && LG.daily ? 'dailyDesc' : opts.descKey)),
      LG.voiceNotice(),
    ];
    if (opts.score) startParts.push(LG.playerChip(showBest), best);
    startParts.push(bigButton(LG.ICONS.play, LG.t('play'), () => {
      startScreen.remove();
      LG.sfx.tap();
      start();
    }));
    const startScreen = overlay(startParts);
    setProgress();
  };
})();
