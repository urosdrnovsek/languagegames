// Read and Match: read three words and tap the one that names the picture.
(function () {
  const ROUNDS = 8;
  const words = LG.words(LG.lang, { min: 3 });
  let queue = [];

  // Early rounds use any other words; later rounds prefer words that start
  // with the same letter, so the child has to read past the first letter.
  function distractors(target, hard) {
    const others = words.filter((w) => w.word !== target.word);
    const similar = others.filter((w) => w.letters[0] === target.letters[0]);
    const picked = hard ? LG.sample(similar, 2) : [];
    const rest = others.filter((w) => !picked.includes(w));
    return picked.concat(LG.sample(rest, 2 - picked.length));
  }

  LG.createGame({
    titleKey: 'pictureWord',
    descKey: 'pictureWordDesc',
    pic: 'cat',
    rounds: ROUNDS,
    onStart() {
      queue = LG.deal(words, ROUNDS);
    },
    round(i, ctx) {
      const w = queue[i];
      const options = LG.shuffle([w].concat(distractors(w, i >= 3)));
      const prompt = () => LG.speak(LG.t('pictureWordPrompt'));

      const choices = LG.el('div', 'choices stacked');
      options.forEach((opt) => {
        const b = LG.el('button', 'word-btn fit', LG.fmt(opt.word));
        b.type = 'button';
        b.addEventListener('click', () => {
          if (ctx.isLocked() || b.disabled) return;
          if (opt === w) {
            b.classList.add('right');
            choices.querySelectorAll('button').forEach((x) => (x.disabled = true));
            ctx.complete(LG.speak(LG.praise() + ' ' + w.word + '.'));
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

      ctx.stage.append(LG.pictureCard(w.pic, prompt), choices);
      prompt();
    },
  });
})();
