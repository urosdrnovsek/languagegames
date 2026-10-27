// Shared game engine: language, UI text, speech, sound effects and the game
// shell (top bar, progress, start and finish screens) used by every game.
(function () {
  const LG = (window.LG = window.LG || {});
  const LANGS = LG.LANGS;
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
      topic_toys: 'Toys & music',
      topic_school: 'School',
      topic_transport: 'Transport',
      topic_nature: 'Nature & weather',
      topic_other: 'Other words',
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
      topic_toys: 'Igrače in glasba',
      topic_school: 'Šola',
      topic_transport: 'Prevozna sredstva',
      topic_nature: 'Narava in vreme',
      topic_other: 'Druge besede',
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
      topic_toys: 'Spielzeug und Musik',
      topic_school: 'Schule',
      topic_transport: 'Fahrzeuge',
      topic_nature: 'Natur und Wetter',
      topic_other: 'Weitere Wörter',
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
      topic_toys: 'Jouets et musique',
      topic_school: "L'école",
      topic_transport: 'Transports',
      topic_nature: 'Nature et météo',
      topic_other: 'Autres mots',
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
      topic_toys: 'Juguetes y música',
      topic_school: 'La escuela',
      topic_transport: 'Transportes',
      topic_nature: 'Naturaleza y tiempo',
      topic_other: 'Otras palabras',
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
  const DEFAULT_SETTINGS = { font: 'default', colors: [], spacing: false, topics: [] };

  function cleanSettings(raw) {
    raw = raw || {};
    return {
      font: LG.FONTS.includes(raw.font) ? raw.font : 'default',
      colors: LG.COLOR_LETTERS.filter((l) => (raw.colors || []).includes(l)),
      spacing: raw.spacing === true,
      topics: LG.TOPICS.map((t) => t.id).filter((id) => (raw.topics || []).includes(id)),
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
    return q.join('&');
  };

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

  LG.shuffle = function (list) {
    const a = list.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  LG.pick = (list) => list[Math.floor(Math.random() * list.length)];
  LG.sample = (list, n) => LG.shuffle(list).slice(0, n);

  LG.el = function (tag, className, html) {
    const e = document.createElement(tag);
    if (className) e.className = className;
    if (html !== undefined) e.innerHTML = html;
    return e;
  };

  LG.ICONS = {
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
      c.style.background = LG.pick(CONFETTI);
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
  // LG.createGame({ titleKey, descKey, pic, rounds, round(index, ctx) })
  // round() draws one round into ctx.stage and calls ctx.complete(promise)
  // when the child has solved it. Games that aren't played in rounds pass
  // `progress: false` and call ctx.end(result) themselves. Add ?home=0 to a game's URL to hide the
  // link back to the game list (for sites that embed a single game).

  LG.createGame = function (opts) {
    const rounds = opts.rounds || 8;
    const showHome = params.get('home') !== '0';
    document.title = LG.t(opts.titleKey) + ' · ' + LG.t('appTitle');

    const bar = LG.el('header', 'topbar');
    if (showHome) {
      const home = LG.el('a', 'icon-btn', LG.ICONS.home);
      home.href = LG.link('../../index.html');
      home.setAttribute('aria-label', LG.t('allGames'));
      bar.appendChild(home);
    }
    bar.appendChild(LG.el('h1', 'game-title', LG.t(opts.titleKey)));
    const tools = LG.el('div', 'tools');
    tools.appendChild(LG.langSwitch());
    tools.appendChild(LG.soundButton());
    bar.appendChild(tools);

    const progress = LG.el('div', 'progress');
    progress.setAttribute('role', 'progressbar');
    progress.setAttribute('aria-valuemin', 0);
    progress.setAttribute('aria-valuemax', rounds);
    const dots = [];
    for (let i = 0; i < rounds; i++) dots.push(progress.appendChild(LG.el('span', 'dot', LG.ICONS.star)));

    const stage = LG.el('main', 'stage');
    stage.setAttribute('aria-live', 'polite');

    if (opts.progress === false) progress.hidden = true;
    document.body.append(bar, progress, stage);

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

    function setProgress() {
      dots.forEach((d, i) => d.classList.toggle('done', i < round));
      progress.setAttribute('aria-valuenow', round);
    }

    function showRound() {
      locked = false;
      stage.innerHTML = '';
      opts.round(round, ctx);
      LG.fit(stage);
    }

    const ctx = {
      stage: stage,
      rounds: rounds,
      // Call when the round is solved; waits for `wait` (e.g. speech) before moving on.
      complete(wait) {
        if (locked) return;
        locked = true;
        LG.sfx.good();
        LG.confetti(18);
        dots[round].classList.add('pop');
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
      // End the game now. result: { won, stars (0-3), title, text }.
      end: (result) => finish(result),
    };

    function start() {
      round = 0;
      setProgress();
      dots.forEach((d) => d.classList.remove('pop'));
      if (opts.onStart) opts.onStart();
      showRound();
    }

    function finish(result) {
      result = result || {};
      const won = result.won !== false;
      const title = result.title || LG.t('wellDone');
      const text = result.text || LG.t('finished');
      const count = result.stars === undefined ? 3 : result.stars;
      stage.innerHTML = '';
      if (won) {
        LG.sfx.win();
        LG.confetti(70);
      }
      LG.speak(title + ' ' + text);
      let starsHtml = '';
      for (let i = 0; i < 3; i++) starsHtml += i < count ? LG.ICONS.star : LG.ICONS.star.replace('<svg', '<svg class="empty"');
      const stars = LG.el('div', 'big-stars', starsHtml);
      const buttons = LG.el('div', 'panel-buttons');
      const o = overlay([stars, LG.el('h2', '', title), LG.el('p', '', text), buttons]);
      buttons.appendChild(bigButton(LG.ICONS.again, LG.t('playAgain'), () => {
        o.remove();
        start();
      }));
      if (showHome) {
        const a = LG.el('a', 'big-btn secondary', LG.ICONS.home + '<span>' + LG.t('allGames') + '</span>');
        a.href = LG.link('../../index.html');
        buttons.appendChild(a);
      }
      buttons.querySelector('button').focus();
    }

    // Start screen. The Play tap also unlocks speech and sound in browsers
    // that only allow audio after a user gesture.
    const startScreen = overlay([
      LG.el('div', 'panel-pic', LG.picture(opts.pic)),
      LG.el('h2', '', LG.t(opts.titleKey)),
      LG.el('p', '', LG.t(opts.descKey)),
      LG.voiceNotice(),
      bigButton(LG.ICONS.play, LG.t('play'), () => {
        startScreen.remove();
        LG.sfx.tap();
        start();
      }),
    ]);
    setProgress();
  };
})();
