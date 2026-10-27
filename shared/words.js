// Word bank. Each entry links a picture (shared/pictures.js) to its word in
// every language. `noFirstLetter` lists languages where the word's first
// letter doesn't match its first sound (owl, cheese...), so the First Letter
// game skips it there.
(function () {
  const LG = (window.LG = window.LG || {});

  LG.VOCAB = [
    // Animals
    { pic: 'cat', en: 'cat', sl: 'muca' },
    { pic: 'dog', en: 'dog', sl: 'pes' },
    { pic: 'pig', en: 'pig', sl: 'pujs' },
    { pic: 'bear', en: 'bear', sl: 'medved' },
    { pic: 'mouse', en: 'mouse', sl: 'miš' },
    { pic: 'lion', en: 'lion', sl: 'lev' },
    { pic: 'cow', en: 'cow', sl: 'krava' },
    { pic: 'sheep', en: 'sheep', sl: 'ovca', noFirstLetter: ['en'] },
    { pic: 'owl', en: 'owl', sl: 'sova', noFirstLetter: ['en'] },
    { pic: 'duck', en: 'duck', sl: 'raca' },
    { pic: 'frog', en: 'frog', sl: 'žaba' },
    { pic: 'fish', en: 'fish', sl: 'riba' },
    { pic: 'bee', en: 'bee', sl: 'čebela' },
    { pic: 'bird', en: 'bird', sl: 'ptič' },
    { pic: 'snake', en: 'snake', sl: 'kača' },
    { pic: 'snail', en: 'snail', sl: 'polž' },
    // Food
    { pic: 'apple', en: 'apple', sl: 'jabolko' },
    { pic: 'banana', en: 'banana', sl: 'banana' },
    { pic: 'pear', en: 'pear', sl: 'hruška' },
    { pic: 'carrot', en: 'carrot', sl: 'korenje' },
    { pic: 'cheese', en: 'cheese', sl: 'sir', noFirstLetter: ['en'] },
    { pic: 'bread', en: 'bread', sl: 'kruh' },
    { pic: 'egg', en: 'egg', sl: 'jajce' },
    { pic: 'milk', en: 'milk', sl: 'mleko' },
    { pic: 'cake', en: 'cake', sl: 'torta' },
    { pic: 'grapes', en: 'grapes', sl: 'grozdje' },
    { pic: 'lemon', en: 'lemon', sl: 'limona' },
    { pic: 'cherry', en: 'cherry', sl: 'češnja', noFirstLetter: ['en'] },
    // Things and toys
    { pic: 'hat', en: 'hat', sl: 'klobuk' },
    { pic: 'sock', en: 'sock', sl: 'nogavica' },
    { pic: 'cup', en: 'cup', sl: 'lonček' },
    { pic: 'ball', en: 'ball', sl: 'žoga' },
    { pic: 'balloon', en: 'balloon', sl: 'balon' },
    { pic: 'kite', en: 'kite', sl: 'zmaj' },
    { pic: 'drum', en: 'drum', sl: 'boben' },
    { pic: 'bell', en: 'bell', sl: 'zvonec' },
    { pic: 'book', en: 'book', sl: 'knjiga' },
    { pic: 'key', en: 'key', sl: 'ključ' },
    { pic: 'clock', en: 'clock', sl: 'ura' },
    { pic: 'umbrella', en: 'umbrella', sl: 'dežnik' },
    { pic: 'bed', en: 'bed', sl: 'postelja' },
    { pic: 'house', en: 'house', sl: 'hiša' },
    { pic: 'car', en: 'car', sl: 'avto' },
    { pic: 'bus', en: 'bus', sl: 'avtobus' },
    { pic: 'boat', en: 'boat', sl: 'ladja' },
    { pic: 'eye', en: 'eye', sl: 'oko', noFirstLetter: ['en'] },
    // Nature
    { pic: 'sun', en: 'sun', sl: 'sonce' },
    { pic: 'moon', en: 'moon', sl: 'luna' },
    { pic: 'star', en: 'star', sl: 'zvezda' },
    { pic: 'cloud', en: 'cloud', sl: 'oblak' },
    { pic: 'tree', en: 'tree', sl: 'drevo' },
    { pic: 'flower', en: 'flower', sl: 'roža' },
    { pic: 'leaf', en: 'leaf', sl: 'list' },
  ];

  LG.ALPHABET = {
    en: 'abcdefghijklmnoprstuvwyz'.split(''),
    sl: 'abcčdefghijklmnoprsštuvzž'.split(''),
  };

  // How the speech voice should say a single letter.
  LG.LETTER_NAMES = {
    en: {},
    sl: {
      a: 'a', b: 'be', c: 'ce', č: 'če', d: 'de', e: 'e', f: 'ef', g: 'ge', h: 'ha', i: 'i',
      j: 'je', k: 'ka', l: 'el', m: 'em', n: 'en', o: 'o', p: 'pe', r: 'er', s: 'es', š: 'še',
      t: 'te', u: 'u', v: 've', z: 'ze', ž: 'že',
    },
  };

  // Words for one language: [{ pic, word, letters }].
  LG.words = function (lang, opts) {
    opts = opts || {};
    return LG.VOCAB.filter((v) => v[lang] && LG.PICTURES[v.pic])
      .filter((v) => !(opts.firstLetter && v.noFirstLetter && v.noFirstLetter.includes(lang)))
      .map((v) => {
        const word = v[lang].normalize('NFC');
        return { pic: v.pic, word: word, letters: Array.from(word) };
      })
      .filter((w) => !opts.maxLength || w.letters.length <= opts.maxLength);
  };
})();
