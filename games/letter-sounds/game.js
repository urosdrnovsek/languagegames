// First Letter: see a picture, hear the word, tap the letter it starts with.
(function () {
  const ROUNDS = 8;
  const words = LG.words(LG.lang, { firstLetter: true, min: 3 });
  // Letters that start some word in the bank: familiar choices for distractors.
  const initials = Array.from(new Set(LG.words(LG.lang, { firstLetter: true, allTopics: true }).map((w) => w.letters[0])));
  let queue = [];

  LG.createGame({
    titleKey: 'letterSounds',
    descKey: 'letterSoundsDesc',
    pic: 'apple',
    rounds: ROUNDS,
    onStart() {
      queue = LG.deal(words, ROUNDS);
    },
    round(i, ctx) {
      const w = queue[i];
      const first = w.letters[0];
      const others = initials.filter((l) => l !== first);
      const options = LG.shuffle([first].concat(LG.sample(others, 2)));
      const prompt = () => LG.speak(LG.t('letterPrompt', { word: w.word }));

      const line = LG.el('div', 'word-line fit');
      const blank = LG.el('span', 'blank', '&nbsp;');
      line.append(blank, LG.el('span', '', LG.fmt(w.letters.slice(1).join(''))));

      const choices = LG.el('div', 'choices');
      options.forEach((letter) => {
        const b = LG.el('button', 'tile', LG.fmt(letter));
        b.type = 'button';
        b.addEventListener('click', () => {
          if (ctx.isLocked() || b.disabled) return;
          if (letter === first) {
            b.classList.add('right');
            blank.innerHTML = LG.fmt(first);
            choices.querySelectorAll('button').forEach((x) => (x.disabled = true));
            ctx.complete(LG.speak(LG.praise() + ' ' + LG.t('letterCorrect', { word: w.word, letter: LG.letterName(first) })));
          } else {
            b.classList.add('wrong');
            b.disabled = true;
            LG.shake(b);
            LG.sfx.bad();
            LG.speak(LG.t('tryAgain'));
          }
        });
        choices.appendChild(b);
      });

      ctx.stage.append(LG.pictureCard(w.pic, prompt), line, choices);
      prompt();
    },
  });
})();
